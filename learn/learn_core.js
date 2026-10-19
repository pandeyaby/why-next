/* Why Next? Learn: profile, progress and "learn next" logic. Bundled into out/viewer.html by ext/make_viewer.py.
   Uses globals from the viewer: DATA, N, PRE, esc, select, renderList, sel. Everything is stored locally in localStorage. */
const LEARN=(()=>{
const KEY='whynext.learn.v1',L=LEARN_DATA.lessons,G=LEARN_DATA.goals,GOALS=G.goals,BANDS=G.bands,SKIP=G.skipFromBand10,RES=LEARN_DATA.resources;
const blank=()=>({name:'',age:'',goal:'explore',knownUpTo:'auto',level:'auto',progress:{}});
let P=blank(),mem=false,formOpen=null;
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&typeof s==='object')P=Object.assign(blank(),s)}catch(e){mem=true}
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){mem=true}}
const has=id=>!!L[id],band=()=>BANDS.find(b=>b.id===P.age);
const prog=id=>P.progress[id]||{};
function setProg(id,patch){P.progress[id]=Object.assign({},prog(id),patch,{at:new Date().toISOString().slice(0,10)});save()}
const assumeAge=()=>P.knownUpTo==='auto'?(band()?band().assumeKnownUpTo:0):+P.knownUpTo||0;
const older=()=>!!band()&&band().id!=='u10';
const skipped=id=>{const n=N.get(id);return older()&&!!n&&(SKIP.subjects.includes(n.s)||SKIP.domains.includes(n.d))};
const mastered=id=>prog(id).status==='mastered';
const assumed=id=>{const n=N.get(id),s=prog(id).status;return !s&&!!n&&assumeAge()>0&&n.a[1]<=assumeAge()};
const known=id=>prog(id).status==='known'||assumed(id);
const done=id=>mastered(id)||known(id)||skipped(id);
const level=()=>P.level!=='auto'?P.level:(band()?band().reading:'kid');
const goal=()=>GOALS.find(g=>g.id===P.goal)||GOALS[GOALS.length-1];
/* distance (in prerequisite links) from every ancestor to the goal topic */
let distFor=null,dist=new Map();
function goalDist(){const g=goal();if(distFor!==g.target){distFor=g.target;dist=new Map();if(g.target){dist.set(g.target,0);const q=[g.target];
 while(q.length){const u=q.shift();for(const e of PRE.get(u)||[])if(!dist.has(e.p)){dist.set(e.p,dist.get(u)+1);q.push(e.p)}}}}return dist}
const hard=id=>(PRE.get(id)||[]).filter(e=>e.h);
/* "Next" = not done, not skipped, every hard prerequisite done, and (with a goal) on the way to it. */
function nextList(limit){const g=goal(),d=goalDist(),out=[],ag=assumeAge();
 for(const n of DATA.nodes){if(done(n.id))continue;if(g.target&&!d.has(n.id))continue;if(!hard(n.id).every(e=>done(e.p)))continue;out.push(n)}
 const key=n=>g.target?d.get(n.id):Math.abs(n.a[0]-ag);
 out.sort((a,b)=>(key(a)-key(b))||(has(b.id)-has(a.id))||(a.a[0]-b.a[0])||(b.c-a.c)||a.n.localeCompare(b.n));
 return limit?out.slice(0,limit):out}
let nextIds=new Set();
function refreshNext(){nextIds=new Set(nextList(0).map(n=>n.id))}
const isNext=id=>nextIds.has(id);
function why(id){const hs=hard(id).filter(e=>!skipped(e.p)),g=goal();let r;
 if(!hs.length)r='A starting point: it has no required prerequisites.';
 else{const m=hs.map(e=>`${mastered(e.p)?'you mastered':assumed(e.p)?'you likely know (from your age band)':'you know'} “${N.get(e.p).n}”: ${e.r}`);
  r='Ready because '+m.slice(0,2).join('; ')+(m.length>2?` (+${m.length-2} more)`:'')+'.'}
 if(g.target&&id!==g.target){const k=goalDist().get(id);r+=` ${k} step${k>1?'s':''} from your goal, “${N.get(g.target).n}”.`}else if(g.target)r+=' This is your goal topic!';
 return r}
function badge(id){if(mastered(id))return'<span class="lb lb-m" title="Mastered">✓<span class="sr"> mastered</span></span>';
 if(known(id))return'<span class="lb lb-k" title="Already known">✓<span class="sr"> known</span></span>';
 if(isNext(id))return'<span class="lb lb-n" title="Recommended next">★<span class="sr"> learn next</span></span>';
 return has(id)?'<span class="lb lb-l" title="Has a lesson">◆<span class="sr"> lesson</span></span>':''}
const cls=id=>mastered(id)||known(id)?'g-done':isNext(id)?'g-next':'';
function resource(id){const n=N.get(id);if(!n)return null;return RES.find(r=>r.subject===n.s&&n.a[0]<=r.maxAge)}
function home(){refreshNext();const el=document.getElementById('learnHome');if(!el)return;const g=goal(),nx=nextList(6),
 opt=(arr,v)=>arr.map(([k,l])=>`<option value="${k}"${String(k)===String(v)?' selected':''}>${l}</option>`).join(''),
 nM=Object.values(P.progress).filter(p=>p.status==='mastered').length,nL=Object.keys(L).length,b=band();
 el.innerHTML=`<section class="card lhome" aria-labelledby="lnH"><details id="pDet"${(formOpen??!P.name)?' open':''}><summary><b>${P.name?'Hi '+esc(P.name)+' 👋':'Make it yours: set up a profile'}</b> <span class="muted">· ${nM} of ${nL} lessons mastered · saved only on this device</span></summary>
 <form class="pform" onsubmit="return false"><label>Name <input id="pName" maxlength="40" value="${esc(P.name)}" autocomplete="nickname"></label>
 <label>Age band <select id="pAge"><option value="">Choose…</option>${opt(BANDS.map(x=>[x.id,x.label]),P.age)}</select></label>
 <label>Goal <select id="pGoal">${opt(GOALS.map(x=>[x.id,x.label]),P.goal)}</select></label>
 <label>Reading level <select id="pLevel">${opt([['auto','Match my age'],['kid','Kid-friendly'],['adult','Teen / grown-up']],P.level)}</select></label>
 <label>Assume I know topics up to age <select id="pKnown">${opt([['auto',`Auto${b?` (${b.assumeKnownUpTo||'none'})`:''}`],[0,'none'],[6,'6'],[8,'8'],[10,'10'],[12,'12'],[14,'14'],[16,'16']],P.knownUpTo)}</select></label>
 <button type="button" id="pReset" class="lbtn ghost">Clear my data</button></form>${mem?'<p class="muted">Storage is blocked in this browser, so progress lasts only until you close the page.</p>':''}</details>
 <h2 class="lh" id="lnH">Learn next${g.target?` <span class="muted">towards ${esc(N.get(g.target).n)}</span>`:''}</h2>
 ${nx.length?`<ol class="nextl">${nx.map(n=>`<li><button type="button" class="linkish" data-go="${n.id}">${esc(n.n)}</button> ${has(n.id)?'<span class="tag new">lesson</span>':'<span class="tag">lessons coming</span>'} <span class="age">ages ${n.a[0]}–${n.a[1]}</span><div class="why">${esc(why(n.id))}</div></li>`).join('')}</ol>`:`<p class="muted">${g.target&&done(g.target)?'You’ve reached this goal':'Nothing to suggest on this path yet'}. ${assumeAge()?`From your age band we assume you know topics up to age ${assumeAge()}: choose a harder goal, or set “Assume I know” lower to review.`:'Try another goal.'}</p>`}
 ${P.age?'':'<p class="muted small">Tip: choose an age band so we can skip topics you almost certainly know.</p>'}
 <p class="muted lkey"><span class="lb lb-m">✓</span> mastered <span class="lb lb-k">✓</span> already known <span class="lb lb-n">★</span> learn next <span class="lb lb-l">◆</span> has a lesson</p></section>`;
 document.getElementById('pDet').ontoggle=e=>{formOpen=e.target.open};
 const on=(i,f)=>{document.getElementById(i).onchange=f};
 on('pName',e=>{P.name=e.target.value.trim();save();home()});on('pAge',e=>{P.age=e.target.value;save();update();if(sel)select(sel)});
 on('pGoal',e=>{P.goal=e.target.value;save();update()});on('pLevel',e=>{P.level=e.target.value;save();if(sel)select(sel)});
 on('pKnown',e=>{P.knownUpTo=e.target.value==='auto'?'auto':+e.target.value;save();update()});
 document.getElementById('pReset').onclick=()=>{if(confirm('Clear your name and all progress on this device?')){P=blank();save();update()}};
 el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{select(b.dataset.go);const l=document.getElementById('learn');if(l)l.focus()})}
function update(){home();renderList();document.querySelectorAll('.gn').forEach(g=>{g.querySelector('circle').setAttribute('class',cls(g.dataset.id))})}
function clear(id){delete P.progress[id];save()}
function setLevel(v){P.level=v;save()}
return{clear,setLevel,L,has,prog,setProg,mastered,known,assumed,skipped,done,level,why,badge,cls,isNext,resource,home,update,refreshNext,nextList,goalDist}})();
