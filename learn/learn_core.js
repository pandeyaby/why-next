/* Why Next? Learn: profile, progress and "learn next" logic. Bundled into out/viewer.html by ext/make_viewer.py.
   Uses globals from the viewer: DATA, N, PRE, esc, select, renderList. Everything is stored locally in localStorage. */
const LEARN=(()=>{
const KEY='whynext.learn.v1',L=LEARN_DATA.lessons,GOALS=LEARN_DATA.goals,RES=LEARN_DATA.resources;
const BANDS=[['u10','Under 10'],['10-12','10–12'],['13-15','13–15'],['16-18','16–18'],['adult','Adult'],['grand','Grandparent']];
const blank=()=>({name:'',age:'',goal:'explore',knownUpTo:0,level:'auto',progress:{}});
let P=blank(),mem=false,formOpen=null;
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&typeof s==='object')P=Object.assign(blank(),s)}catch(e){mem=true}
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){mem=true}}
const has=id=>!!L[id];
const prog=id=>P.progress[id]||{};
function setProg(id,patch){P.progress[id]=Object.assign({},prog(id),patch,{at:new Date().toISOString().slice(0,10)});save()}
const mastered=id=>prog(id).status==='mastered';
const known=id=>prog(id).status==='known'||(P.knownUpTo>0&&N.get(id)&&N.get(id).a[1]<=P.knownUpTo&&!has(id));
const done=id=>mastered(id)||known(id);
const level=()=>P.level!=='auto'?P.level:(['u10','10-12'].includes(P.age)?'kid':P.age?'adult':'kid');
const goal=()=>GOALS.find(g=>g.id===P.goal)||GOALS[GOALS.length-1];
let goalSet=null,goalFor=null;
function onGoalPath(id){const g=goal();if(!g.target)return false;if(goalFor!==g.target){goalFor=g.target;goalSet=ancestors(g.target,false)}return goalSet.has(id)}
const hard=id=>(PRE.get(id)||[]).filter(e=>e.h);
/* A topic is "next" when it isn't done and every hard prerequisite is mastered or known. */
function nextList(limit){const g=goal(),out=[];
 for(const n of DATA.nodes){if(done(n.id))continue;const hs=hard(n.id);if(!hs.every(e=>done(e.p)))continue;
  if(g.target&&!onGoalPath(n.id))continue;out.push(n)}
 out.sort((a,b)=>(has(b.id)-has(a.id))||(a.a[0]-b.a[0])||(b.c-a.c)||a.n.localeCompare(b.n));
 return limit?out.slice(0,limit):out}
let nextIds=new Set();
function refreshNext(){nextIds=new Set(nextList(0).map(n=>n.id))}
const isNext=id=>nextIds.has(id);
function why(id){const hs=hard(id),g=goal(),n=N.get(id);let r;
 if(!hs.length)r='A starting point: it has no required prerequisites.';
 else{const m=hs.map(e=>`${mastered(e.p)?'you mastered':'you know'} “${N.get(e.p).n}”: ${e.r}`);r='Ready because '+m.slice(0,2).join('; ')+(m.length>2?` (+${m.length-2} more)`:'')+'.'}
 if(g.target&&id!==g.target)r+=` On your way to “${N.get(g.target).n}”.`;else if(g.target)r+=' This is your goal topic!';
 return r}
function badge(id){if(mastered(id))return'<span class="lb lb-m" title="Mastered">✓<span class="sr"> mastered</span></span>';
 if(known(id))return'<span class="lb lb-k" title="Already known">✓<span class="sr"> known</span></span>';
 if(isNext(id))return'<span class="lb lb-n" title="Recommended next">★<span class="sr"> learn next</span></span>';
 return has(id)?'<span class="lb lb-l" title="Has a lesson">◆<span class="sr"> lesson</span></span>':''}
const cls=id=>mastered(id)||known(id)?'g-done':isNext(id)?'g-next':'';
function resource(id){const n=N.get(id);if(!n)return null;const subj=n.s==='Mathematics'?'Mathematics':n.s==='Science'?'Science':null;
 return subj&&RES.find(r=>r.subject===subj&&n.a[0]<=r.maxAge)}
function home(){refreshNext();const el=document.getElementById('learnHome');if(!el)return;const g=goal(),nx=nextList(6),
 opt=(arr,v)=>arr.map(([k,l])=>`<option value="${k}"${k===v?' selected':''}>${l}</option>`).join(''),
 nM=Object.values(P.progress).filter(p=>p.status==='mastered').length,nL=Object.keys(L).length;
 el.innerHTML=`<div class="card lhome"><details id="pDet"${(formOpen??!P.name)?' open':''}><summary><b>${P.name?'Hi '+esc(P.name)+' 👋':'Make it yours: set up a profile'}</b> <span class="muted">· ${nM} of ${nL} lessons mastered · saved only on this device</span></summary>
 <form class="pform" onsubmit="return false"><label>Name <input id="pName" maxlength="40" value="${esc(P.name)}" autocomplete="nickname"></label>
 <label>Age band <select id="pAge"><option value="">Choose…</option>${opt(BANDS,P.age)}</select></label>
 <label>Goal <select id="pGoal">${opt(GOALS.map(x=>[x.id,x.label]),P.goal)}</select></label>
 <label>Reading level <select id="pLevel">${opt([['auto','Match my age'],['kid','Kid-friendly'],['adult','Grown-up']],P.level)}</select></label>
 <label>I'm comfortable with topics up to age <select id="pKnown">${opt([[0,'none'],[6,'6'],[8,'8'],[10,'10'],[12,'12'],[14,'14'],[16,'16']].map(([a,b])=>[String(a),b]),String(P.knownUpTo))}</select></label>
 <button type="button" id="pReset" class="lbtn ghost">Clear my data</button></form>${mem?'<p class="muted">Storage is blocked in this browser, so progress lasts only until you close the page.</p>':''}</details>
 <h3 class="lh">Learn next${g.target?` <span class="muted">towards ${esc(N.get(g.target).n)}</span>`:''}</h3>
 ${nx.length?`<ol class="nextl">${nx.map(n=>`<li><button type="button" class="linkish" data-go="${n.id}">${esc(n.n)}</button> ${has(n.id)?'<span class="tag new">lesson</span>':'<span class="tag">lessons coming</span>'} <span class="age">ages ${n.a[0]}–${n.a[1]}</span><div class="why">${esc(why(n.id))}</div></li>`).join('')}</ol>`:'<p class="muted">Nothing left on this path. Try another goal.</p>'}
 <p class="muted lkey"><span class="lb lb-m">✓</span> mastered <span class="lb lb-k">✓</span> already known <span class="lb lb-n">★</span> learn next <span class="lb lb-l">◆</span> has a lesson</p></div>`;
 document.getElementById('pDet').ontoggle=e=>{formOpen=e.target.open};
 const on=(i,f)=>{const x=document.getElementById(i);x.onchange=f};
 on('pName',e=>{P.name=e.target.value.trim();save();home()});on('pAge',e=>{P.age=e.target.value;save();home();if(sel)select(sel)});
 on('pGoal',e=>{P.goal=e.target.value;save();update()});on('pLevel',e=>{P.level=e.target.value;save();if(sel)select(sel)});
 on('pKnown',e=>{P.knownUpTo=+e.target.value;save();update()});
 document.getElementById('pReset').onclick=()=>{if(confirm('Clear your name and all progress on this device?')){P=blank();save();update()}};
 el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{select(b.dataset.go);const l=document.getElementById('learn');if(l)l.focus()})}
function update(){home();renderList();document.querySelectorAll('.gn').forEach(g=>{const c=g.querySelector('circle');c.setAttribute('class',cls(g.dataset.id))})}
function clear(id){delete P.progress[id];save()}
function setLevel(v){P.level=v;save()}
return{clear,setLevel,L,has,prog,setProg,mastered,known,done,level,why,badge,cls,isNext,resource,home,update,refreshNext,nextList,P:()=>P}})();
