/* Why Next? Guide, part 3: the opt-in "Live AI Guide". When the learner turns it on, questions typed or spoken to the
   Guide go to our server (/api/guide), which asks Google's Gemini and replies. Off by default. It is never offered in
   the offline Mac app or any file:// copy, and on any error, timeout or lost connection the built-in offline Guide
   answers instead. Only the question, the open lesson's text and the learner's coarse state and stated profile are
   sent; the raw behaviour signals never leave the device. The choice is saved in localStorage 'wn_guide_live'. */
const GUIDE_LIVE=(()=>{const KEY='wn_guide_live',ENDPOINT='/api/guide',TIMEOUT=9000;
/* Live AI needs our web server: never on file:// (the Mac app and offline copies) or when the page says it is the app. */
const available=()=>/^https?:$/.test(location.protocol)&&!window.WN_APP&&!window.WN_OFFLINE;
let on=false;try{on=localStorage.getItem(KEY)==='1'}catch(x){}
let lastFallback=0,lastSource='offline';
/* What we send: lesson text and the learner's coarse state only. */
function payload(c,text){const L=c.lesson||{},lv=c.level==='kid'?'kid':'adult',ex=L.explain&&(L.explain[lv]||L.explain.adult||L.explain.kid)||[];
 const m=c.learner||{},p=m.profile||{},item=document.querySelector('#pbox .qi:not([data-done]) .qp');
 return{q:String(text).slice(0,400),tone:c.tone,level:lv,lesson:{title:L.title||'',keyIdea:L.keyIdea||'',explain:ex.slice(0,6),prompt:item?item.textContent.slice(0,300):''},
  learner:{state:m.state,why:m.why,profile:{style:p.style,exam:p.exam,goal:p.goal,time:p.time}},related:relatedLessons(text,L)}}
/* Up to two other Why Next lessons that fit the question (guide_kb.js), so the answer can come from the site and name a lesson. */
function relatedLessons(text,L){try{return typeof GUIDE_KB==='undefined'||typeof LEARN==='undefined'?[]:GUIDE_KB.related(text,LEARN.L,L.topicId,2).map(r=>({title:r.title,keyIdea:r.keyIdea}))}catch(x){return[]}}
/* Ask the server; any failure falls back to the offline brain so the learner always gets an answer. */
const liveBrain={name:'Live AI Guide (Gemini, via Why Next server)',async reply(c,text){const local=()=>GUIDE.localBrain.reply(c,text);
 if(!navigator.onLine)return fallback(local(),'You’re offline, so I’m using the built-in guide.');
 const ac=new AbortController(),t=setTimeout(()=>ac.abort(),TIMEOUT);
 try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload(c,text)),signal:ac.signal});
  if(!r.ok)return fallback(local(),r.status===429?'Lots of questions! I’ll use the built-in guide for a minute.':null);
  const d=await r.json();if(!d||typeof d.reply!=='string'||!d.reply.trim())return fallback(local(),null);lastSource='live';return d.reply.trim().slice(0,900)}
 catch(x){return fallback(local(),null)}finally{clearTimeout(t)}}};
function fallback(answer,note){lastSource='offline';const show=note||(Date.now()-lastFallback>5*60e3?'(Live AI isn’t reachable, so this is the built-in guide.)':'');lastFallback=Date.now();
 return show?answer+' '+show:answer}
function set(v){on=!!v&&available();try{localStorage.setItem(KEY,on?'1':'0')}catch(x){}GUIDE.useBrain(on?liveBrain:null);
 const g=GUIDE.el();if(g){g.dataset.live=on?'1':'0';const b=g.querySelector('.gl-badge');if(b)b.hidden=!on}}
function mount(root){if(!available()||root.querySelector('.gl-row'))return;const grid=root.querySelector('.gd-set .gd-grid');if(!grid)return;
 const row=document.createElement('div');row.className='gl-row';
 row.innerHTML=`<label class="gd-chk"><input type="checkbox" name="live"${on?' checked':''}> Live AI Guide</label><p class="gl-note" id="glNote">When on, your questions and this lesson’s text go to Google’s Gemini through our server to write smarter answers. Don’t type personal details. Off means everything stays on this device.</p>`;
 row.querySelector('input').setAttribute('aria-describedby','glNote');row.querySelector('input').onchange=e=>{e.stopPropagation();set(e.target.checked);GUIDE.say(on?'Live AI is on. Ask me anything about this lesson.':'Live AI is off. I’m using the built-in guide, so nothing leaves this device.')};
 grid.append(row);const nm=root.querySelector('.gd-name');if(nm&&!root.querySelector('.gl-badge')){const b=document.createElement('span');b.className='gl-badge';b.textContent='Live AI';b.hidden=!on;nm.after(b)}set(on)}
document.addEventListener('wn:guide',e=>{const d=e.detail||{};if(d.kind==='built')mount(d.root)});
if(on&&available())GUIDE.useBrain(liveBrain);
/* The Guide may already be open (it reopens on load), so mount now as well as on later builds. */
if(GUIDE.el())mount(GUIDE.el());
return{available,isOn:()=>on,set,payload,brain:liveBrain,source:()=>lastSource}})();
