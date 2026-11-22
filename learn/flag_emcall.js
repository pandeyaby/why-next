/* Flagship – calling 999 or getting a grown-up (ages 8–10; DfE Health Education 2019 basic first aid: make a clear and
   efficient call to the emergency services; PSHE Association KS2). Scenes: sort emergencies from things that can wait;
   pick who to go to first (fetch the grown-up, call 999 yourself, or get out of a fire and then call); unlock nothing,
   tap Emergency and dial 9 9 9 on a locked phone; send each problem to Ambulance, Fire or Police; answer the call
   handler's questions and stay on the line. Every drag or tap has a labelled button twin. Data in learn/emcall_art.js. */
(()=>{const {box,inside,brush,CASE,WAY,SCENE,KEYS,SERV,JOB,ASK,SAYS,INTRO,WELL,QS,kid,sign,handset,van,handler,A0}=EMC;
VIS.reg('flagemcall',c=>{let A,P,dock,quiz,nq=-1,run=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',sky:'#f1f5f9',now:'#ffedd5',wait:'#e0f2fe',head:'#7c2d12'};
const S={};const scene=()=>['sort','who','dial','send','talk','quiz'][A.step];
const part=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
const heading=t=>P.say(t,A.W/2,A.H*.035,12,{c:K.head,w:A.W-20});
const status=(t,ok)=>P.say(t,A.W/2,A.H*.95,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20});
const held=(i,b)=>S.grip&&S.grip.i===i?box(S.grip.x-b.w/2,S.grip.y-b.h/2,b.w,b.h):b;
/* ---------- 1: help now, or can it wait? ---------- */
const caseCard=j=>P.grid(CASE.length,A.narrow?2:4,part(.03,.08,.94,.52))[j],bin=k=>part(.03+k*.485,.65,.455,.24);
function drawSort(){const n=Object.keys(S.put).length;heading('Help now, or can it wait?');
 [0,1].forEach(k=>{const b=bin(k);P.tile(b,k?K.wait:K.now,S.near===k?'sel':'');P.say(k?'Not an emergency':'Help now: 999 or a grown-up',b.x+b.w/2,b.y+b.h*.22,11,{w:b.w-12});
  const got=CASE.map((o,i)=>S.put[i]===k?o.sh:null).filter(Boolean);P.say(got.length?got.join(', '):'…',b.x+b.w/2,b.y+b.h*.66,10,{b:700,w:b.w-12})});
 CASE.forEach((o,i)=>{if(i in S.put)return;const q=held(i,caseCard(i));P.tile(q,'#ffffff',S.bad===i?'ko':(S.aim===i||(S.grip&&S.grip.i===i))?'sel':'');P.say(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 status(n>=8?'✓ All 8 sorted':`Sorted: ${n} of 8`,n>=8)}
function file(i,k){if(i in S.put)return;S.aim=-1;const o=CASE[i],want=o.e?0:1;
 if(k!==want){S.bad=i;A.sound.miss();return tell(o.e?oops('real'):oops(o.s))}
 S.bad=-1;S.put[i]=k;A.sound.pop();tell(o.e?`${o.sh}: someone could be badly hurt or in danger. Get help now.`:`${o.sh}: not an emergency. A grown-up can help with this later.`)}
/* ---------- 2: who do I go to first? ---------- */
const story=()=>part(.03,.08,.94,.24),post=k=>P.grid(3,3,part(.03,.58,.94,.25),8)[k],me=()=>({x:A.W*.5,y:A.H*.46});
function drawWho(){const g=A.ctx,i=S.si;heading(i<SCENE.length?`Story ${i+1} of ${SCENE.length}: who first?`:'All 4 stories done');
 const b=story();P.tile(b,'#ffffff','');P.say(i<SCENE.length?SCENE[i].t:'You picked the right first step every time.',b.x+b.w/2,b.y+b.h/2,12,{w:b.w-20});
 WAY.forEach((t,k)=>{const q=post(k);sign(g,q,t,[K.sel,'#b91c1c','#7c2d12'][k],P.say);if(S.near===k||S.bad===k){g.save();g.lineWidth=3;g.strokeStyle=S.bad===k?K.ko:K.sel;A0(g,box(q.x-3,q.y-3,q.w+6,q.h*.58+6));g.stroke();g.restore()}});
 if(i<SCENE.length){const p=S.grip||me(),s=Math.min(A.W*.14,A.H*.12);kid(g,p.x,p.y,s,'#be185d');P.say('You',p.x,p.y+s*.6,10)}
 P.say(S.done.map(k=>'✓ '+SCENE[k].sh).join('  '),A.W/2,A.H*.875,9,{b:700,c:K.ok,w:A.W-20});status(S.si>=4?'✓ 4 of 4 stories':`Stories done: ${S.si} of 4`,S.si>=4)}
function choose(k){const i=S.si;if(i>=SCENE.length)return;const o=SCENE[i];S.near=-1;
 if(k!==o.a){S.bad=k;A.sound.miss();return tell(oops([[0,'skipadult','nofire'],['alone',0,'nofire2'],['firefetch','stayin',0]][o.a][k]))}
 S.bad=-1;S.done.push(i);S.si++;A.sound.pop();tell(`${WAY[k]}: yes. `+[`A grown-up is near, so fetch them fast.`,`No grown-up can help, so you call 999 yourself.`,`Get out, stay out, then call 999 from outside.`][k]+(S.si<SCENE.length?' Next story.':''))}
/* ---------- 3: dial 999 on a locked phone ---------- */
function phone(){const w=Math.min(A.W*.62,A.H*.48);return box(A.W/2-w/2,A.H*.07,w,A.H*.84)}
const sosBtn=()=>{const b=phone();return box(b.x+b.w*.14,b.y+b.h*.78,b.w*.72,b.h*.1)};
const key=j=>{const b=phone();return P.grid(12,3,box(b.x+b.w*.12,b.y+b.h*.27,b.w*.76,b.h*.52),6)[j]};
const green=()=>{const b=phone(),r=b.h*.05;return {x:b.x+b.w/2,y:b.y+b.h*.86,r}};
function drawDial(){const g=A.ctx,b=phone();heading(S.call?'Calling 999':S.open?'Dial 9 9 9':'The phone is locked');handset(g,b);
 if(!S.open){P.say('21:04',b.x+b.w/2,b.y+b.h*.18,22,{c:K.ink});P.say('Enter passcode',b.x+b.w/2,b.y+b.h*.3,11,{b:600});
  for(let k=0;k<4;k++){g.beginPath();g.arc(b.x+b.w*(.32+k*.12),b.y+b.h*.38,5,0,7);g.strokeStyle=K.rim;g.lineWidth=1.5;g.stroke()}
  P.say('🔒',b.x+b.w/2,b.y+b.h*.55,24);const e=sosBtn();P.tile(e,'#fee2e2',S.bad==='sos'?'ko':'');P.say('Emergency',e.x+e.w/2,e.y+e.h/2,12,{c:K.ko})}
 else{P.say(S.num||'…',b.x+b.w/2,b.y+b.h*.16,24,{c:K.ink});P.say(S.call?'Connecting… stay calm':'Emergency call',b.x+b.w/2,b.y+b.h*.23,10,{b:600,c:K.ko});
  if(!S.call){KEYS.forEach((t,j)=>{const q=key(j);g.fillStyle=S.bad===j?'#fee2e2':'#e2e8f0';g.beginPath();g.arc(q.x+q.w/2,q.y+q.h/2,Math.min(q.w,q.h)*.46,0,7);g.fill();P.say(t,q.x+q.w/2,q.y+q.h/2,15)});
   const r=green();g.fillStyle='#047857';g.beginPath();g.arc(r.x,r.y,r.r,0,7);g.fill();P.say('Call',r.x,r.y,10,{c:'#ffffff'})}
  else{handler(g,b.x+b.w/2,b.y+b.h*.55,b.w*.4);P.say('“Emergency, which service?”',b.x+b.w/2,b.y+b.h*.82,11,{w:b.w*.86})}}
 status(S.call?'✓ Your call is going through':S.open?`Dialled: ${S.num.length} of 3`:'Find the way to call without the code',S.call)}
function sos(){if(S.open)return;S.open=1;S.bad=-1;A.sound.pop();tell('Emergency call is open. No passcode or credit needed. Now tap 9, 9, 9.')}
function press(j){if(S.call)return;if(!S.open){S.bad='sos';A.sound.miss();return tell(oops('locked'))}const d=KEYS[j];
 if(S.num.length>=3){A.sound.miss();return tell('You have 3 numbers. Tap the green Call button.')}
 if(d!=='9'){S.bad=j;S.num='';A.sound.miss();return tell(oops(d==='1'?'one':'digit'))}S.bad=-1;S.num+='9';A.sound.tick();tell(`${S.num.split('').join(' ')}`+(S.num.length<3?' Keep going.':' Now tap Call.'))}
function ring(){if(S.call||!S.open)return;if(S.num!=='999'){A.sound.miss();return tell(oops('short'))}S.call=1;A.sound.pop();tell('Calling 999. A call handler answers: “Emergency, which service?”')}
/* ---------- 4: which service? ---------- */
const jobCard=j=>P.grid(JOB.length,2,part(.03,.08,.94,.34))[j],garage=k=>P.grid(3,3,part(.03,.5,.94,.38),8)[k];
function drawSend(){const g=A.ctx,n=Object.keys(S.sent).length;heading('“Emergency, which service?”');
 SERV.forEach((o,k)=>{const b=garage(k);P.tile(b,'#ffffff',S.near===k?'sel':'');van(g,b.x+b.w/2,b.y+b.h*.3,Math.min(b.w*.7,b.h*.6),k);P.say(o.n,b.x+b.w/2,b.y+b.h*.6,12,{c:o.c});
  const got=JOB.map((x,i)=>S.sent[i]===k?'✓':null).filter(Boolean);P.say(got.join(' ')||o.w,b.x+b.w/2,b.y+b.h*.83,9,{b:600,w:b.w-8})});
 JOB.forEach((o,i)=>{if(i in S.sent)return;const q=held(i,jobCard(i));P.tile(q,'#fff7ed',S.bad===i?'ko':(S.aim===i||(S.grip&&S.grip.i===i))?'sel':'');P.say(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 status(n>=4?'✓ All 4 sent':`Sent: ${n} of 4`,n>=4)}
function send(i,k){if(i in S.sent)return;S.aim=-1;const o=JOB[i];if(o.v!==k){S.bad=i;A.sound.miss();return tell(oops(['amb','fire','pol'][o.v]))}
 S.bad=-1;S.sent[i]=k;A.sound.pop();tell(`${o.t}: ${SERV[k].n}, ${SERV[k].w}.`)}
/* ---------- 5: what do I say? ---------- */
const qRow=k=>part(.2,.07+k*.12,.77,.105),chip=j=>P.grid(SAYS.length,A.narrow?2:4,part(.03,.58,.94,.31),6)[j];
function drawTalk(){const g=A.ctx,n=S.ans.filter(v=>v!=null).length;heading('Answer the call handler');handler(g,A.W*.1,A.H*.2,Math.min(A.W*.14,A.H*.14));
 ASK.forEach((t,k)=>{const b=qRow(k),v=S.ans[k];P.tile(b,v!=null?'#ccfbf1':'#ffffff',S.near===k?'sel':v!=null?'ok':'');P.say(t+(v!=null?' → '+SAYS[v].t:''),b.x+b.w/2,b.y+b.h/2,11,{w:b.w-14})});
 SAYS.forEach((o,j)=>{if(S.ans.includes(j))return;const q=held(j,chip(j));P.tile(q,'#e0e7ff',S.bad===j?'ko':(S.aim===j||(S.grip&&S.grip.i===j))?'sel':'');P.say(o.t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-8})});
 status(n>=4?'✓ A clear call':`Answers: ${n} of 4`,n>=4)}
function reply(j,k){if(S.ans.includes(j))return;const o=SAYS[j];S.aim=-1;if(o.s){S.bad=j;A.sound.miss();return tell(oops(o.s))}
 if(k==null)k=o.q;if(k!==o.q){S.bad=j;A.sound.miss();return tell(`“${o.t}” answers “${ASK[o.q]}”`)}
 S.bad=-1;S.ans[k]=j;A.sound.pop();tell(`${ASK[k]} “${o.t}.”`+(S.ans.filter(v=>v!=null).length>=4?' Help is on the way.':''))}
/* ---------- each slip, named ---------- */
function oops(t){let m='Think: is someone badly hurt, not breathing, in a fire or in danger?';
 if(t==='real')m='This is serious. Someone could be badly hurt or in danger. It needs help now.';
 if(t==='graze')m='A graze or small cut is not an emergency. Tell a grown-up and use a plaster.';
 if(t==='lost')m='A lost thing is sad, but no one is hurt. It is not an emergency.';
 if(t==='test')m='999 is never for testing or a joke. It can stop a real emergency getting through.';
 if(t==='sweets')m='A squabble is not an emergency. Tell a grown-up at home.';
 if(t==='skipadult')m='A grown-up is close by. Fetch them fast; they will decide if 999 is needed.';
 if(t==='alone')m='No grown-up can help here, and Gran will not wake up. You call 999 yourself.';
 if(t==='stayin')m='Never stay in a smoky house to call. Get out first, stay out, then call 999.';
 if(t==='nofire')m='There is no fire here. A grown-up is close by, so fetch them fast.';
 if(t==='nofire2')m='There is no fire. Gran needs help now and no grown-up is home, so call 999 yourself.';
 if(t==='firefetch')m='Do not search the house. Shout “Fire!” to warn everyone, get out, then call 999.';
 if(t==='locked')m='You do not need the passcode. Tap Emergency at the bottom of the lock screen.';
 if(t==='one')m='In the UK the number is 9 9 9 (112 works too). Start again with 9.';
 if(t==='digit')m='That is not a 9. The emergency number in the UK is 9 9 9. Start again.';
 if(t==='short')m='Dial all three 9s first, then tap Call.';
 if(t==='amb')m='Someone badly hurt or ill needs an Ambulance. If you are not sure, just say what happened.';
 if(t==='fire')m='Fire and smoke need the Fire service. They put fires out and rescue people.';
 if(t==='pol')m='Someone breaking in is danger from a person. That is the Police.';
 if(t==='where')m='Look for clues: a street sign, a shop, a school or a big building. Say what you can see.';
 if(t==='hang')m='Do not hang up. Stay on the line until the call handler says you can go.';
 if(t==='fast')m='Speak slowly and clearly so the call handler hears every word.';
 if(t==='free')m='999 is free, but a joke call can block a real emergency. And stay on until they say you can go.';
 if(t==='toys')m='Never go back in for toys or pets. Get out, stay out, call 999.';
 if(t==='wait')m='A leg that looks wrong needs a grown-up now. Do not wait and see.';
 if(t==='credit')m='You do not need credit. 999 calls are free from any phone.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=scene(),g=A.ctx;g.fillStyle=K.sky;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){van(g,A.W*.5,A.H*.38,A.H*.3,0);P.say('Challenge',A.W/2,A.H*.72,20);return}
 ({sort:drawSort,who:drawWho,dial:drawDial,send:drawSend,talk:drawTalk})[k]();A.fx.draw(g)}
function down(p){const k=scene(),lift=i=>{S.grip={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='sort'){const i=CASE.findIndex((_,x)=>!(x in S.put)&&inside(p,caseCard(x)));if(i>=0)return lift(i);const z=[0,1].find(x=>inside(p,bin(x)));if(z!=null&&S.aim>=0)file(S.aim,z)}
 if(k==='who'&&S.si<SCENE.length){const m=me();if(Math.hypot(p.x-m.x,p.y-m.y)<Math.min(A.W*.12,A.H*.1))return lift(-1);const z=[0,1,2].find(x=>inside(p,post(x)));if(z!=null)choose(z)}
 if(k==='dial'){if(!S.open&&inside(p,sosBtn()))return sos(),false;const j=KEYS.findIndex((_,x)=>inside(p,key(x)));if(S.open&&j>=0)return press(j),false;const r=green();if(S.open&&Math.hypot(p.x-r.x,p.y-r.y)<r.r*1.3)return ring(),false;if(!S.open&&inside(p,phone()))press(0)}
 if(k==='send'){const i=JOB.findIndex((_,x)=>!(x in S.sent)&&inside(p,jobCard(x)));if(i>=0)return lift(i);const z=[0,1,2].find(x=>inside(p,garage(x)));if(z!=null&&S.aim>=0)send(S.aim,z)}
 if(k==='talk'){const j=SAYS.findIndex((_,x)=>!S.ans.includes(x)&&inside(p,chip(x)));if(j>=0)return lift(j);const z=[0,1,2,3].find(x=>inside(p,qRow(x)));if(z!=null&&S.aim>=0)reply(S.aim,z)}
 return false}
function move(p){const h=S.grip;if(!h)return;h.x=p.x;h.y=p.y;const k=scene();
 S.near=k==='sort'?[0,1].find(j=>inside(p,bin(j))):k==='who'?[0,1,2].find(j=>inside(p,post(j))):k==='send'?[0,1,2].find(j=>inside(p,garage(j))):k==='talk'?[0,1,2,3].find(j=>inside(p,qRow(j))):undefined;A.redraw()}
function up(p){const h=S.grip;if(!h)return;S.grip=null;S.near=undefined;const k=scene(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='sort'){const z=[0,1].find(j=>inside(p,bin(j)));if(z!=null)return file(h.i,z);if(tap){S.aim=h.i;return tell(`“${CASE[h.i].t}” picked. Now tap a tray.`)}}
 if(k==='who'){const z=[0,1,2].find(j=>inside(p,post(j)));if(z!=null)return choose(z);if(tap)return tell('Drag yourself to a sign, or tap a sign.')}
 if(k==='send'){const z=[0,1,2].find(j=>inside(p,garage(j)));if(z!=null)return send(h.i,z);if(tap){S.aim=h.i;return tell(`“${JOB[h.i].t}” picked. Now tap a service.`)}}
 if(k==='talk'){const z=[0,1,2,3].find(j=>inside(p,qRow(j)));if(z!=null)return reply(h.i,z);if(tap)return reply(h.i)}
 A.redraw()}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function buttons(){if(!dock)return;dock.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='sort')CASE.forEach((o,i)=>{if(i in S.put)return;add(`Help now: ${o.sh}`,()=>file(i,0),`“${o.t}”: help now`);add(`Can wait: ${o.sh}`,()=>file(i,1),`“${o.t}”: not an emergency`)});
 if(k==='who'&&S.si<SCENE.length)WAY.forEach((t,j)=>add(t,()=>choose(j),`${SCENE[S.si].sh}: ${t}`));
 if(k==='dial'&&!S.call){if(!S.open)add('Emergency',sos,'Tap Emergency on the lock screen');else{add('9',()=>press(8),'Dial 9');add('1',()=>press(0),'Dial 1');add('Call',ring,'Tap the green Call button')}}
 if(k==='send')JOB.forEach((o,i)=>{if(i in S.sent)return;SERV.forEach((v,j)=>add(`${v.n}: ${o.t}`,()=>send(i,j),`Send ${v.n} for: ${o.t}`))});
 if(k==='talk'&&S.ans.filter(v=>v!=null).length<4)SAYS.forEach((o,j)=>{if(!S.ans.includes(j))add(o.t,()=>reply(j),`Say: ${o.t}`)})}
function fresh(){run++;for(const x in S)delete S[x];Object.assign(S,{put:{},si:0,done:[],open:0,num:'',call:0,sent:{},ans:[null,null,null,null],bad:-1,aim:-1,grip:null,check:()=>{}})}
const met=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(WELL[i]+A.reveal(i))};
function open(i,ok){fresh();tell(INTRO[i]);S.check=met(i,ok)}
function play(i,acts,ms){steps[i].go();const e=run;acts.forEach((f,j)=>setTimeout(()=>{if(e===run)f()},ms*(j+1)))}
const steps=[
{h:'Help now, or can it wait?',p:'999 is the UK number for the police, fire service and ambulance. It is only for real emergencies, when someone is badly hurt, cannot breathe, there is a fire, or someone is in danger.',
 predict:{q:'Kai wants to call 999 just to see if it works. Is that OK?',opts:['Yes, if he hangs up fast','No: 999 is only for real emergencies'],ans:1},task:'Sort all 8 cards',
 show:()=>play(0,CASE.map((o,i)=>()=>file(i,o.e?0:1)),450),go:()=>open(0,()=>Object.keys(S.put).length>=8)},
{h:'Who first?',p:'If a grown-up is near, fetch them fast. If no grown-up can help, you can call 999 yourself. In a fire, get out first.',
 predict:{q:'There is smoke in the house. Should you stay inside to call 999?',opts:['Yes, call first','No: get out first, then call'],ans:1},task:'Pick the first step for all 4 stories',
 show:()=>play(1,SCENE.map(o=>()=>choose(o.a)),800),go:()=>open(1,()=>S.si>=4)},
{h:'Dial 999',p:'Phones let anyone make an emergency call, even when the phone is locked or has no credit. The call is free.',
 predict:{q:'The phone is locked and has no credit. Can you still call 999?',opts:['No, you need the code and credit','Yes, 999 still works'],ans:1},task:'Open Emergency, dial 9 9 9 and call',
 show:()=>play(2,[sos,()=>press(8),()=>press(8),()=>press(8),ring],600),go:()=>open(2,()=>!!S.call)},
{h:'Which service?',p:'The call handler asks which service you need. Pick the one that fits. If you are not sure, just say what has happened.',task:'Send all 4 problems',
 show:()=>play(3,JOB.map((o,i)=>()=>send(i,o.v)),650),go:()=>open(3,()=>Object.keys(S.sent).length>=4)},
{h:'What to say',p:'Say where you are, what has happened and your name. Speak slowly. Answer every question, and stay on the line until they say you can go.',
 predict:{q:'You have said what happened. Can you hang up now?',opts:['Yes, they know now','No: stay on until they say you can go'],ans:1},task:'Answer all 4 questions',
 show:()=>play(4,[0,1,2,3].map(j=>()=>reply(j)),700),go:()=>open(4,()=>S.ans.every(v=>v!=null))},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function next(){nq++;const Q=QS[nq%QS.length],all=[[Q.a,''],...Q.o],r=nq%3,order=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(s,Q){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),m=s?oops(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;dock.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=brush(A,K);const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Emergency call lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
