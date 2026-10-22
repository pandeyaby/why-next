/* Reel slot: a short vertical explainer per flagship topic, lazy (poster only until tapped), captions on, never autoplays. */
/* Reel catalogue: learn/reels/manifest.json maps topic id -> list of reels. Each visit shows one reel the learner has not seen yet
   (random among unseen, remembered in localStorage "wn_reels_seen"); once all are seen the rotation starts again. */
/* Seen-reel memory: {topicId:[file,...]}. Any other shape (null, array, string, junk entries) is treated as empty so the picker never throws; see docs/STATECHART.md and verify/. */
const reelSeen=()=>{let s;try{s=JSON.parse(localStorage.getItem('wn_reels_seen')||'{}')}catch(e){s=null}if(!s||typeof s!=='object'||Array.isArray(s))return{};for(const k in s)if(!Array.isArray(s[k]))delete s[k];else s[k]=s[k].filter(x=>typeof x==='string');return s},reelMark=(tid,f)=>{try{const s=reelSeen(),l=s[tid]||[];if(!l.includes(f))l.push(f);s[tid]=l;localStorage.setItem('wn_reels_seen',JSON.stringify(s))}catch(e){}};
const reelPick=(tid,R,skip)=>{const seen=reelSeen()[tid]||[];let pool=R.filter(r=>!seen.includes(r.f)&&r.f!==skip);if(!pool.length){try{const s=reelSeen();s[tid]=[];localStorage.setItem('wn_reels_seen',JSON.stringify(s))}catch(e){}pool=R.filter(r=>r.f!==skip);if(!pool.length)pool=R}return pool[Math.floor(Math.random()*pool.length)]};
const reelFig=(tid,R,r)=>{const B=(r.x&&(window.WN_RPARTS||{})[r.x])||(window.WN_BASE||'')+'reels/',i=R.indexOf(r);return `<figure class="reel" data-tid="${tid}" data-f="${r.f}"><button type="button" class="reel-play" data-reel="${B}${r.f}" aria-label="Play video: ${r.t} (${r.d} seconds, with captions)"><img src="${B}${r.f}.jpg" alt="" loading="lazy" decoding="async" fetchpriority="low" width="180" height="320"><span class="reel-ico" aria-hidden="true">▶</span><span class="reel-d">${r.d}s</span></button><figcaption>${r.t}${r.review?' <span class="reel-rev">· science check pending</span>':''}${R.length>1?`<br><span class="reel-n">${i+1} of ${R.length}</span> <button type="button" class="linkish reel-next">Another reel ↻</button>`:''}</figcaption></figure>`};
let reelLd=null;const reelLoad=()=>reelLd||(reelLd=new Promise((ok,no)=>{const s=document.createElement('script');s.src=(window.WN_BASE||'')+'wn/'+window.WN_REELS_LAZY.u;s.onload=ok;s.onerror=()=>{reelLd=null;no()};document.head.appendChild(s)}));
const reelSlot=tid=>{if(!window.WN_REELS&&window.WN_REELS_LAZY){if(!window.WN_REELS_LAZY.ids.includes(tid))return '';reelLoad().then(()=>{const el=document.querySelector(`.reel-wait[data-tid="${tid}"]`);if(el)el.outerHTML=reelSlot(tid)},()=>{});return `<div class="reel-wait" data-tid="${tid}" aria-hidden="true"></div>`}
 const R=(window.WN_REELS||{})[tid];if(!R||!R.length)return '';const r=reelPick(tid,R);reelMark(tid,r.f);return `<h3 class="lsub">🎬 Watch a quick explainer</h3><div class="reels">${reelFig(tid,R,r)}</div>`};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.reel-next');if(!b)return;const fig=b.closest('.reel'),tid=fig.dataset.tid,R=(window.WN_REELS||{})[tid];if(!R)return;const r=reelPick(tid,R,fig.dataset.f);reelMark(tid,r.f);fig.outerHTML=reelFig(tid,R,r)});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.reel-play');if(!b)return;const u=b.dataset.reel,v=document.createElement('video');v.className='reel-v';v.controls=true;v.playsInline=true;v.preload='metadata';if(/^https?:/.test(u))v.crossOrigin='anonymous';v.poster=u+'.jpg';v.setAttribute('aria-label',b.getAttribute('aria-label').replace('Play video: ',''));
 v.innerHTML=`<source src="${u}.mp4" type="video/mp4"><track kind="captions" srclang="en" label="English" src="${u}.vtt" default>`;b.replaceWith(v);const p=v.play();if(p&&p.catch)p.catch(()=>{})});
/* Why Next? Learn panel: explanation, practice with instant feedback and hints, mastery check, spaced review. */
const LEARN_PANEL=(()=>{
/* plain-words glossary for curriculum terms in topic descriptions (shown as a tooltip and on focus) */
const GLOSS={'one-to-one correspondence':'matching each thing with exactly one number','correspondence':'matching one thing with another','numerator':'the top number of a fraction','denominator':'the bottom number of a fraction','equivalent':'worth the same','interpret':'work out what it means','coefficient':'the number in front of a letter','polynomial':'terms like 3x² + 2x − 1 added together','irrational':'a number whose decimals never end or repeat','integral':'the area under a graph, added up','derivative':'how fast something is changing','quantity':'an amount','cardinality':'how many there are','reversible':'can be undone','properties':'what something is like'};
const GRX=new RegExp('\\b('+Object.keys(GLOSS).sort((a,b)=>b.length-a.length).join('|')+')\\b','gi');
const gloss=(t,lv)=>{const seen=new Set();if(lv==='adult'&&!lv)return esc(t);return esc(t).replace(GRX,m=>{const k=m.toLowerCase();if(seen.has(k))return m;seen.add(k);return `<dfn class="gl" tabindex="0" title="${GLOSS[k]}">${m}<span class="sr"> (${GLOSS[k]})</span></dfn>`})};

let CUR={p:[],m:[],r:[]};
/* Tell listeners (the guide) what the learner just did; kinds: open, hint, right, wrong, mastered. */
const emit=(kind,d)=>{try{document.dispatchEvent(new CustomEvent('wn:learn',{detail:Object.assign({kind},d)}))}catch(x){}};
const parseNum=s=>{s=String(s).trim().replace(/\s+/g,'').replace('−','-').replace(',','.');const f=s.match(/^(-?\d+)\/(\d+)$/);
 if(f)return +f[2]?+f[1]/+f[2]:NaN;return s===''?NaN:Number(s)};
/* shuffle an order item, never showing it already solved */
function scramble(a){let b=LEARN_GEN.shuffle(a);if(b.every((x,i)=>x===a[i]))b=a.slice(1).concat(a[0]);return b}
function itemHtml(it,pre,i){const id=`${pre}-${it.id}`,lab=`${id}-q`;let body='';
 if(it.type==='mc')body=`<div class="choices" role="group" aria-labelledby="${lab}">${it.choices.map((c,k)=>`<button type="button" class="lbtn choice" data-k="${k}">${esc(c)}</button>`).join('')}</div>`;
 else if(it.type==='numeric')body=`<div class="numrow"><label class="sr" for="${id}-in">Your answer</label><input id="${id}-in" class="numin" inputmode="decimal" autocomplete="off" placeholder="Your answer"><button type="button" class="lbtn" data-act="check">Check</button></div>`;
 else body=`<p class="muted small">Drag the cards (mouse or finger), or use the ↑ ↓ buttons.</p><ol class="ord" aria-labelledby="${lab}">${scramble(it.items).map(x=>`<li data-v="${esc(x)}"><span class="grip" aria-hidden="true">⠿</span><span class="ov">${esc(x)}</span><button type="button" class="mv" data-mv="-1" aria-label="Move ${esc(x)} up">↑</button><button type="button" class="mv" data-mv="1" aria-label="Move ${esc(x)} down">↓</button></li>`).join('')}</ol><button type="button" class="lbtn" data-act="check">Check order</button>`;
 return `<div class="qi" id="${id}" data-pre="${pre}" data-i="${i}"><p class="qp" id="${lab}"><b>${i+1}.</b> ${esc(it.prompt)}</p>${body}
 <div class="qfoot">${pre==='p'?'<button type="button" class="linkish" data-act="hint">Show a hint</button>':''}</div><p class="fb" role="status" aria-live="polite"></p></div>`}
const list=(pre)=>CUR[pre].map((it,i)=>itemHtml(it,pre,i)).join('');
function comingSoon(id){const n=N.get(id),r=LEARN.resource(id),k=LEARN.known(id);
 const pre=(typeof PRE!=='undefined'&&PRE.get(id)||[]).map(e=>N.get(e.p)).filter(Boolean).sort((x,y)=>(LEARN.has(y.id)?1:0)-(LEARN.has(x.id)?1:0)).slice(0,5);
 const goal=n.desc?String(n.desc).split(/(?<=\.)\s/)[0]:'';
 return `<section class="card learn soon" id="learn" tabindex="-1" aria-labelledby="learnH"><p class="eyebrow">Coming soon</p><h2 id="learnH" class="lh">${esc(n.n)}</h2>
 ${goal?`<div class="soon-block"><h3>What you will learn</h3><p>${esc(goal)}</p></div>`:''}
 ${pre.length?`<div class="soon-block"><h3>Learn these first</h3><ol class="soon-pre">${pre.map(p=>`<li><button type="button" class="linkish" data-go="${p.id}">${esc(p.n)}</button>${LEARN.has(p.id)?' <span class="tag new">lesson ready</span>':''}</li>`).join('')}</ol></div>`:'<p class="muted">A starting point: nothing needs to come first.</p>'}
 ${r?`<p>Meanwhile, a free resource: <a href="${r.url}" target="_blank" rel="noopener">${esc(r.label)}</a></p>`:''}
 <button type="button" class="lbtn ghost" data-act="known">${k?'✓ Marked as known (undo)':'I already know this'}</button></section>`}
function panel(id){const les=LEARN.L[id];if(!les)return(typeof WN!=='undefined'&&WN.flag(id))?'<section class="learn card" id="learn" aria-busy="true"><p class="muted">Loading the lesson and lab…</p></section>':comingSoon(id);
 const lv=LEARN.level(),pr=LEARN.prog(id),st=pr.status,due=LEARN.reviewDue(id),fam=les.audience!=='learner';
 CUR={p:les.practice.map(LEARN_GEN.make),m:LEARN_GEN.drawSet(les.mastery.pool,les.mastery.draw),r:due?LEARN_GEN.drawSet(les.mastery.pool,2):[]};
 return `<section class="card learn" id="learn" tabindex="-1" aria-labelledby="learnH">
 <div class="lhead"><h2 id="learnH" class="lh">Learn: ${esc(les.title)}</h2>${LEARN_FX.ring(id,24)}${st==='mastered'?'<span class="lb lb-m">✓ Mastered</span>':LEARN.isNext(id)?'<span class="lb lb-n">★ Learn next</span>':''}
 <div class="lvl" role="group" aria-label="Reading level"><button type="button" class="lbtn sm${lv==='kid'?' on':''}" aria-pressed="${lv==='kid'}" data-lv="kid">${fam?'Kid':'Simpler'}</button><button type="button" class="lbtn sm${lv==='adult'?' on':''}" aria-pressed="${lv==='adult'}" data-lv="adult">${fam?'Grown-up':'Teen / adult'}</button></div></div>
 ${due?`<div class="review" id="rbox"><h3 class="lsub">🔁 Quick review</h3><p class="small">You mastered this a while ago. Two quick questions keep it fresh.</p>${list('r')}<p id="rres" role="status" aria-live="polite"></p></div>`:''}
 ${LEARN.isNext(id)?`<p class="why">${esc(LEARN.why(id))}</p>`:''}${st!=='mastered'&&LEARN.known(id)?`<p class="why">✓ ${LEARN.assumed(id)?'You probably know this already (from your age band)':'You marked this as known'}. Use it as a refresher, or <button type="button" class="linkish" data-act="known">mark it as not known</button>.</p>`:''}
 <h3 class="lsub">1 · Understand it</h3><p class="key">💡 ${gloss(les.keyIdea)}</p>${les.explain[lv].map(p=>`<p>${gloss(p)}</p>`).join('')}${les.worked?`<div class="worked"><h3 class="lsub">Worked example: ${esc(les.worked.title)}</h3><ol>${les.worked.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}
 ${les.lab&&/^flag/.test(les.lab.type)?'<div id="lbox" class="vbox flagbox"></div>'+reelSlot(les.topicId||id)+(les.visual?'<h3 class="lsub">Another way to see it</h3><div id="vbox" class="vbox"></div>':''):reelSlot(les.topicId||id)+(les.visual?'<div id="vbox" class="vbox"></div>':'')+(les.lab?'<h3 class="lsub">🧪 Lab: explore and take the challenges</h3><div id="lbox" class="vbox"></div>':'')}
 ${les.familyTip?`<p class="tip"><b>${fam?'Try it at home':'Try this'}:</b> ${esc(les.familyTip)}</p>`:''}
 <h3 class="lsub">2 · Practise <span class="muted small" id="pScore"></span></h3><div id="pbox">${list('p')}</div>
 <button type="button" class="lbtn ghost" data-act="newp">New practice questions</button>
 <h3 class="lsub">3 · Mastery check</h3><p class="muted small">${les.mastery.draw} questions drawn from a pool of ${les.mastery.pool.length}, with fresh numbers each try. One try each; get ${les.mastery.passMark} right to master this topic.${pr.best!=null?` Your best: ${pr.best}/${les.mastery.draw}.`:''}</p>
 <div id="mbox">${list('m')}</div><p id="mres" class="mres" role="status" aria-live="polite"></p>
 <p class="muted small">${les.status==='auto-starter'?`Starter lesson: built automatically from this topic’s description and links, then checked (quality ${les.quality}/100). Not yet reviewed by a teacher.`:`Content status: ${esc(les.status)} (not yet reviewed by a teacher).`} <button type="button" class="linkish" data-act="reset">Reset this topic</button></p></section>`}
/* pointer-event drag for order items: works for mouse, pen and touch; the ↑ ↓ buttons remain the keyboard fallback */
function dragify(ol){let li=null;/* capture on the list: moving a captured <li> in the DOM would drop its capture */
 ol.onpointerdown=e=>{const t=e.target.closest('li');if(!t||e.target.closest('button')||ol.closest('.qi').dataset.done)return;
  e.preventDefault();li=t;ol.setPointerCapture(e.pointerId);li.classList.add('dragging')};
 ol.onpointermove=ev=>{if(!li)return;const p=li.previousElementSibling,n=li.nextElementSibling;
  if(p&&ev.clientY<p.getBoundingClientRect().top+p.offsetHeight/2)p.before(li);else if(n&&ev.clientY>n.getBoundingClientRect().top+n.offsetHeight/2)n.after(li)};
 ol.onpointerup=ol.onpointercancel=ev=>{if(!li)return;li.classList.remove('dragging');li=null;try{ol.releasePointerCapture(ev.pointerId)}catch(x){}}}
function wire(root){root.querySelectorAll('.numin').forEach(inp=>inp.onkeydown=e=>{if(e.key==='Enter')inp.nextElementSibling.click()});root.querySelectorAll('.ord').forEach(dragify)}
function mount(id){const root=document.getElementById('learn');const vb=document.getElementById('vbox'),les0=LEARN.L[id];VIS.show(vb,vb&&les0&&les0.visual||null);VIS.show2(document.getElementById('lbox'),les0&&les0.lab);emit('open',{id,ready:!!les0});if(!root)return;const les=LEARN.L[id];wire(root);
 root.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.lv){LEARN.setLevel(b.dataset.lv);select(id);document.getElementById('learn').focus();return}
  if(b.dataset.act==='known'){{const pr=LEARN.prog(id);LEARN.setProg(id,{status:LEARN.known(id)?(pr.practice&&Object.keys(pr.practice).length?'practising':'unknown'):'known'})};LEARN.update();select(id);return}
  if(b.dataset.act==='reset'){LEARN.clear(id);LEARN.update();select(id);return}
  if(b.dataset.act==='newp'){CUR.p=LEARN_GEN.shuffle(les.practice).map(LEARN_GEN.make);const box=document.getElementById('pbox');box.innerHTML=list('p');wire(box);
   const f=box.querySelector('button,input');if(f)f.focus();return}
  const q=b.closest('.qi');if(!q)return;const it=CUR[q.dataset.pre][+q.dataset.i];
  if(b.dataset.act==='hint'){emit('hint',{id,hint:it.hint,prompt:it.prompt});fb(q,'💡 '+it.hint+(VIS.current()?' Look at the highlighted part of the picture above.':''),'');VIS.cue();return}
  if(b.dataset.mv){const li=b.closest('li'),d=+b.dataset.mv,sib=d<0?li.previousElementSibling:li.nextElementSibling;if(sib){d<0?sib.before(li):sib.after(li);b.focus()}return}
  if(q.dataset.done)return;
  let ans;if(it.type==='mc'){ans=+b.dataset.k;if(isNaN(ans))return;q.querySelectorAll('.choice').forEach(c=>c.classList.toggle('picked',c===b))}
  else if(b.dataset.act==='check'){ans=it.type==='numeric'?q.querySelector('input').value:[...q.querySelectorAll('.ord li')].map(l=>l.dataset.v)}else return;
  grade(q,it,ans,id)}}
function fb(q,msg,kind){const p=q.querySelector('.fb');p.textContent=msg;p.className='fb '+kind}
function lockQ(q,ok){q.dataset.done=1;q.dataset.ok=ok?1:'';q.classList.add(ok?'ok':'no');q.querySelectorAll('button,input').forEach(x=>{if(!x.classList.contains('mv'))x.disabled=true})}
function grade(q,it,ans,id){const les=LEARN.L[id],pre=q.dataset.pre;let ok;
 if(it.type==='mc')ok=ans===it.answer;else if(it.type==='numeric'){const v=parseNum(ans);if(isNaN(v)){fb(q,'Please type a number (for example 7 or 3/4).','');return}ok=Math.abs(v-it.answer)<=(it.tolerance||1e-9)}
 else ok=ans.every((x,i)=>x===it.items[i]);
 const tries=(+q.dataset.tries||0)+1;q.dataset.tries=tries;
 const reveal=it.type==='mc'?` (Answer: ${it.choices[it.answer]})`:it.type==='numeric'?` (Answer: ${LEARN_GEN.fmt(it.answer)})`:` (Order: ${it.items.join(', ')})`;
 if(pre==='p'){if(ok){q.dataset.done=1;q.classList.add('ok');fb(q,'✓ Correct! '+it.explain,'good');emit('right',{id});
   const pr=LEARN.prog(id),pd=Object.assign({},pr.practice,{[it.id]:true});LEARN.setProg(id,{practice:pd,status:['known','practising','mastered'].includes(pr.status)?pr.status:'practising'});}
  else if(tries<2){fb(q,'Not quite. 💡 Hint: '+it.hint+' Have another go.','bad');VIS.cue();emit('wrong',{id,hint:it.hint,prompt:it.prompt})}
  else{fb(q,'Not quite. Here is how it works: '+it.explain+reveal,'bad');q.dataset.done=1}
  LEARN_FX.sync(id);const pd=LEARN.prog(id).practice||{};const s=document.getElementById('pScore');if(s)s.textContent=`(${Object.keys(pd).length}/${les.practice.length} correct)`;return}
 lockQ(q,ok);fb(q,(ok?'✓ Correct. ':'✗ Not this time. ')+it.explain+(ok?'':reveal),ok?'good':'bad');
 if(pre==='r'){const all=[...document.querySelectorAll('#rbox .qi')];if(!all.every(x=>x.dataset.done))return;
  const good=all.every(x=>x.dataset.ok);LEARN.reviewDone(id,good);LEARN.update();
  document.getElementById('rres').innerHTML=good?'✅ <b>Still got it.</b> Next review in a while longer.':'<b>A little rusty.</b> Have a look at the practice below; this topic will come back for review tomorrow.';return}
 const all=[...document.querySelectorAll('#mbox .qi')];if(!all.every(x=>x.dataset.done))return;
 const score=all.filter(x=>x.dataset.ok).length,pass=score>=les.mastery.passMark,pr=LEARN.prog(id),res=document.getElementById('mres'),was=pr.status==='mastered';
 LEARN.setProg(id,{best:Math.max(score,Number.isFinite(pr.best)?pr.best:0),status:pass||was?'mastered':'practising'});if(pass)LEARN.scheduleAfterMastery(id);LEARN.update();
 res.innerHTML=pass?`🎉 <b>${score}/${all.length}: mastered!</b> It's ticked on the map, and it will come back for a quick review in a few days. <button type="button" class="lbtn" id="goNext">What's next?</button>`
  :`<b>${score}/${all.length}.</b> Nearly there. Look back at the practice questions, then <button type="button" class="lbtn" id="retry">try the check again</button>`;
 if(pass)LEARN_FX.celebrate(res);emit(pass?'mastered':'wrong',{id});
 const g=document.getElementById('goNext');if(g)g.onclick=()=>{const nx=LEARN.nextList(1)[0];if(nx){select(nx.id);document.getElementById('learn').focus()}};
 const r=document.getElementById('retry');if(r)r.onclick=()=>{select(id);const m=document.getElementById('mbox');if(m)m.scrollIntoView()}}
return{panel,mount,parseNum,scramble,gloss,cur:()=>CUR}})();
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#learn.soon [data-go]');if(b){select(b.dataset.go);const l=document.getElementById('learn');if(l)l.focus()}});
