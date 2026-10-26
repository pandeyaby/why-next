/* UX: welcome questions, "continue where you left off", a progress map, a jump-to-lab button, "predict then reveal"
   for lessons without a lab, and search shortcuts. Everything stays in localStorage on this device and is validated on read.
   Uses globals: LEARN, LEARN_DATA, LEARN_GEN, N, select, esc, GUIDE_MOOD (optional). */
const UX=(()=>{
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LAST='wn_last',ONB='wn_onboard',PRED='wn_pred';
const get=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(x){return null}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(x){}};
/* last opened lesson: {id, t}; dropped if the lesson no longer exists */
function last(){const r=get(LAST);return r&&typeof r.id==='string'&&LEARN.L[r.id]&&Number.isFinite(r.t)?r:null}
const onboarded=()=>{const v=get(ONB);return v==='done'||v==='skip'};
function predicted(){const r=get(PRED);return Array.isArray(r)?r.filter(x=>typeof x==='string').slice(-500):[]}
const title=id=>(LEARN.L[id]&&LEARN.L[id].title)||(N.get(id)||{}).n||id;
function practiceDone(id){const pr=LEARN.prog(id)||{},les=LEARN.L[id];return{n:Object.keys(pr.practice||{}).length,of:les&&(les.np||(les.practice||[]).length)||0,st:pr.status||'unknown'}}
function open(id){select(id,true);requestAnimationFrame(()=>{const l=document.getElementById('learn')||document.getElementById('detail');if(l){l.scrollIntoView({block:'start'});if(l.focus)l.focus({preventScroll:true})}})}

// ---------- welcome: two questions that set the age band and goal (and the Guide's "About me") ----------
function welcome(){const G=LEARN_DATA.goals;
 return `<section class="card ux-welcome" aria-labelledby="uxwH"><h2 id="uxwH" class="lh">👋 Welcome! Two quick questions</h2>
 <p class="muted small">So we can suggest where to start. Saved only on this device; change it any time under “Make it yours”.</p>
 <fieldset class="ux-q"><legend>How old are you?</legend><div class="ux-chips">${G.bands.map(b=>`<button type="button" class="lbtn sm" data-band="${esc(b.id)}" aria-pressed="false">${esc(b.label)}</button>`).join('')}</div></fieldset>
 <fieldset class="ux-q"><legend>What would you like to work on?</legend><div class="ux-chips">${G.goals.map(g=>`<button type="button" class="lbtn sm" data-goal="${esc(g.id)}" aria-pressed="false">${esc(g.label)}</button>`).join('')}</div></fieldset>
 <p><button type="button" class="lbtn" data-ux="start" disabled>Show me where to start</button> <button type="button" class="linkish" data-ux="skip">Skip for now</button></p></section>`}
const pick={band:'',goal:''};
function setSel(id,v){const s=document.getElementById(id);if(s&&v){s.value=v;s.dispatchEvent(new Event('change'))}}
function finish(){const G=LEARN_DATA.goals,g=G.goals.find(x=>x.id===pick.goal);put(ONB,'done');
 setSel('pAge',pick.band);setSel('pGoal',pick.goal);
 if(typeof GUIDE_MOOD!=='undefined'&&GUIDE_MOOD.setProfile)GUIDE_MOOD.setProfile({goal:g&&g.id!=='explore'?g.label:'',level:pick.band==='u10'||pick.band==='10-12'?'kid':'auto'});
 render();requestAnimationFrame(()=>{const h=document.getElementById('lnH');if(h){h.scrollIntoView({block:'start'});h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}})}

// ---------- continue + progress map ----------
function subjects(){const by={};for(const id of Object.keys(LEARN.L)){const n=N.get(LEARN.L[id].topicId||id)||N.get(id);if(!n)continue;
 const s=by[n.s]||(by[n.s]={s:n.s,all:0,m:0,p:0,next:null});const st=(LEARN.prog(id)||{}).status;s.all++;
 if(st==='mastered')s.m++;else{if(st==='practising')s.p++;if(!s.next||n.a[0]<s.nextAge){s.next=id;s.nextAge=n.a[0]}}}
 return Object.values(by).sort((a,b)=>b.all-a.all)}
function progress(){const subs=subjects();if(!subs.length)return'';
 return `<div class="ux-prog"><h2 class="lh ux-ph">Your progress map</h2><ul class="ux-subs">${subs.map(s=>{const pm=Math.round(100*s.m/s.all),pp=Math.round(100*s.p/s.all);
  return `<li><span class="ux-sn">${esc(s.s)}</span><span class="ux-bar" role="img" aria-label="${s.m} of ${s.all} mastered, ${s.p} in progress"><i class="m" style="width:${pm}%"></i><i class="p" style="width:${pp}%"></i></span><span class="ux-n">${s.m}/${s.all}</span>${s.next?`<button type="button" class="lbtn sm" data-ux-go="${esc(s.next)}" aria-label="Start next ${esc(s.s)} lesson: ${esc(title(s.next))}">Next</button>`:'<span class="ux-done">✓ all done</span>'}</li>`}).join('')}</ul>
 <p class="muted small"><i class="ux-key m"></i> mastered <i class="ux-key p"></i> in progress</p></div>`}
function resume(){const r=last();if(!r)return'';const d=practiceDone(r.id);
 const state=d.st==='mastered'?'✓ Mastered: a quick look keeps it fresh':d.n?`${d.n} of ${d.of} practice questions right so far`:'You opened this lesson; carry on from the start';
 return `<div class="ux-resume"><div><span class="muted small">Continue where you left off</span><div class="ux-rt">${esc(title(r.id))}</div><div class="muted small">${esc(state)}</div></div><button type="button" class="lbtn" data-ux-go="${esc(r.id)}">Continue ▶</button></div>`}
function top(){if(!onboarded()&&!(LEARN_DATA&&document.getElementById('pAge')&&document.getElementById('pAge').value))return welcome();
 const body=resume()+progress();return body?`<section class="card ux-top" aria-label="Your learning">${body}</section>`:''}
let busy=false;
/* #uxTop sits first in <main>, above the how-to card, so "continue" is the first thing a returning learner sees */
function render(){const m=document.getElementById('main');if(!m||busy)return;busy=true;let el=document.getElementById('uxTop');
 if(!el){el=document.createElement('div');el.id='uxTop';m.prepend(el)}el.innerHTML=top();busy=false}
function onClick(e){const b=e.target.closest('button');if(!b||!b.closest('#uxTop'))return;
 if(b.dataset.uxGo){open(b.dataset.uxGo);return}
 if(b.dataset.band||b.dataset.goal){const k=b.dataset.band?'band':'goal';pick[k]=b.dataset[k];
  b.parentNode.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
  const s=document.querySelector('#uxTop [data-ux="start"]');if(s)s.disabled=!(pick.band&&pick.goal);return}
 if(b.dataset.ux==='start'){finish();return}
 if(b.dataset.ux==='skip'){put(ONB,'skip');render()}}

// ---------- in a lesson: jump to the lab, and predict-then-reveal when there is no lab ----------
function labJump(root){const lb=document.getElementById('lbox'),hd=root.querySelector('.lhead');if(!lb||!hd||hd.querySelector('.ux-lab'))return;
 const b=document.createElement('button');b.type='button';b.className='lbtn sm ux-lab';b.textContent='🧪 Jump to the lab';
 b.onclick=()=>{lb.scrollIntoView({block:'start'});const f=lb.querySelector('button,input,select,[tabindex]');(f||lb).focus({preventScroll:true})};hd.appendChild(b)}
function predict(root,id){const les=LEARN.L[id];if(!les||les.lab||!Array.isArray(les.practice)||root.querySelector('.ux-pred'))return;
 if(predicted().includes(id))return;const src=les.practice.find(x=>x&&x.type==='mc');if(!src)return;
 const key=root.querySelector('p.key');if(!key)return;let it;try{it=LEARN_GEN.make(src)}catch(x){return}if(!it||!Array.isArray(it.choices))return;
 const hid=[];for(let n=key.nextElementSibling;n&&n.tagName==='P';n=n.nextElementSibling)hid.push(n);
 const box=document.createElement('div');box.className='ux-pred';box.setAttribute('role','group');box.setAttribute('aria-labelledby','uxpQ');
 box.innerHTML=`<p class="ux-pt">🤔 <b>Predict first.</b> Have a guess before you read on; it’s fine to be wrong.</p><p id="uxpQ">${esc(it.prompt)}</p><div class="ux-chips">${it.choices.map((c,i)=>`<button type="button" class="lbtn sm" data-i="${i}">${esc(c)}</button>`).join('')}</div>
 <p class="ux-pf" role="status" aria-live="polite"></p><button type="button" class="linkish ux-skip">Skip and show the explanation</button>`;
 key.before(box);hid.concat(key).forEach(p=>p.hidden=true);
 const reveal=msg=>{box.querySelector('.ux-pf').textContent=msg;box.querySelector('.ux-skip').remove();hid.concat(key).forEach(p=>p.hidden=false);
  put(PRED,predicted().concat(id));key.setAttribute('tabindex','-1');key.focus({preventScroll:true})};
 box.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.classList.contains('ux-skip')){reveal('');return}
  const i=+b.dataset.i,ok=i===it.answer;box.querySelectorAll('[data-i]').forEach(x=>{x.disabled=true;if(+x.dataset.i===it.answer)x.classList.add('ux-right');else if(x===b)x.classList.add('ux-wrong')});
  reveal(ok?'✓ Good prediction! Read on to see why it works.':`Interesting guess. The answer is “${it.choices[it.answer]}”. Read on to see why.`)}}
function onLearn(e){const d=e.detail||{};if(d.kind!=='open'||!d.id||!LEARN.L[d.id])return;put(LAST,{id:d.id,t:Date.now()});
 const root=document.getElementById('learn');if(!root)return;labJump(root);predict(root,d.id)}

// ---------- keyboard: "/" focuses search, Escape clears it ----------
function onKey(e){const q=document.getElementById('q');if(!q)return;const t=e.target,typing=t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
 if(e.key==='/'&&!typing&&!e.metaKey&&!e.ctrlKey&&!e.altKey){e.preventDefault();q.focus();q.select()}
 else if(e.key==='Escape'&&t===q&&q.value){q.value='';q.dispatchEvent(new Event('input'))}}
function start(){const h=document.getElementById('learnHome');document.addEventListener('wn:learn',onLearn);document.addEventListener('keydown',onKey);document.addEventListener('click',onClick);
 if(h)new MutationObserver(()=>{if(!busy)render()}).observe(h,{childList:true});render()
 document.addEventListener('wn:learn',e=>{const k=(e.detail||{}).kind;if(k==='right'||k==='mastered')setTimeout(render,0)})}
/* the viewer's select() and N arrive in a later script, so wait for them */
let tries=0;function boot(){if(typeof select!=='function'||typeof N==='undefined'){if(++tries<400)setTimeout(boot,25);return}start()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
return{last,onboarded,subjects,render,_reset:()=>[LAST,ONB,PRED].forEach(k=>{try{localStorage.removeItem(k)}catch(x){}})}})();
