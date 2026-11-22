/* Data, text helpers and drawings for flagemcall (calling 999 or getting a grown-up, ages 8–10; DfE Health Education
   statutory guidance (2019), basic first aid: how to make a clear and efficient call to emergency services; PSHE
   Association Programme of Study (2020) KS2: when and how to contact the emergency services; NHS "When to call 999";
   UK fire and rescue advice "Get out, stay out, call 999"; Ofcom: 999 and 112 are free and work from a locked phone).
   Slips it targets: 999 used for a small cut, a lost toy or "to see if it works"; ringing 999 when a grown-up is right
   there to fetch; staying in a smoky house to make the call; thinking a locked phone or no credit stops a 999 call;
   not knowing where you are; talking too fast; and hanging up before the call handler says so. */
const EMC=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function brush(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){rows.push(cur);cur=w}else cur=t});rows.push(cur);
  const lh=px(n)*1.2;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function tile(b,fill,mark){const g=A.ctx;g.fillStyle=mark==='ok'?'#d1fae5':mark==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(12,b.h/3));g.fill();
  g.lineWidth=mark?3:1.6;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[mark]||K.rim;g.stroke()}
 function grid(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{say,tile,grid}}
/* 1. emergency or not? e = 1 needs help now (999 or a grown-up at once); s = the slip if it is dropped on the wrong tray */
const CASE=[{t:'Grandad cannot breathe properly',sh:'Cannot breathe',e:1},{t:'I grazed my knee',sh:'Grazed knee',e:0,s:'graze'},
 {t:'Smoke is coming from the kitchen',sh:'Smoke',e:1},{t:'My tablet is lost',sh:'Lost tablet',e:0,s:'lost'},
 {t:'Mum fell and will not wake up',sh:'Will not wake up',e:1},{t:'I want to see if 999 works',sh:'Testing 999',e:0,s:'test'},
 {t:'A man is breaking in',sh:'Breaking in',e:1},{t:'My brother took my sweets',sh:'Sweets',e:0,s:'sweets'}];
/* 2. who do I go to first? a = 0 fetch the grown-up, 1 call 999 yourself, 2 get out, then call 999 */
const WAY=['Fetch the grown-up','Call 999 myself','Get out, then call 999'];
const SCENE=[{t:'Your sister fell off the climbing frame. Her arm hurts. Dad is in the garden.',sh:'Sister’s arm, Dad in garden',a:0},
 {t:'You are home with Gran. She fell and will not wake up. No one else is home.',sh:'Gran alone with you',a:1},
 {t:'There is smoke and flames in the kitchen.',sh:'Kitchen fire',a:2},
 {t:'Your friend has a small cut from paper. A teacher is near.',sh:'Paper cut, teacher near',a:0}];
/* 3. the phone: tap Emergency on the lock screen, then 9 9 9, then the green button */
const KEYS=['1','2','3','4','5','6','7','8','9','*','0','#'];
/* 4. which service? */
const SERV=[{n:'Ambulance',c:'#047857',w:'for someone badly hurt or ill'},{n:'Fire',c:'#b91c1c',w:'for fire or smoke'},{n:'Police',c:'#1d4ed8',w:'for danger from a person or a crime'}];
const JOB=[{t:'Gran will not wake up',v:0},{t:'The shed is on fire',v:1},{t:'Someone is breaking in',v:2},{t:'A boy is choking and cannot breathe',v:0}];
/* 5. what to say: q = the call handler question it answers; s = slip */
const ASK=['Where are you?','What has happened?','What is your name?','Stay on the line, please.'];
const SAYS=[{t:'12 Oak Road, Leeds',q:0},{t:'My gran fell and will not wake up',q:1},{t:'Sam Patel',q:2},{t:'I stay on and listen',q:3},
 {t:'I don’t know where',s:'where'},{t:'Hang up now',s:'hang'},{t:'Talk very fast',s:'fast'}];
const INTRO=['Some things need help now. Some can wait. Drag each card to the right tray, or tap a card then a tray.',
 'Who do you go to first? Drag the child to a sign, or tap a sign, for each story.',
 'The phone is locked. Tap Emergency, then tap 9, 9, 9, then the green call button.',
 '“Emergency, which service?” Drag each problem to Ambulance, Fire or Police.',
 'The call handler asks questions. Drag each answer to its question, or tap an answer.','Challenge.'];
const WELL=['999 is for real emergencies: someone badly hurt, not breathing, fire, or a person in danger. Small cuts and lost things are not.',
 'If a grown-up is near, fetch them fast. If no grown-up can help, call 999 yourself. In a fire, get out first, then call.',
 'You do not need the passcode or credit. Tap Emergency on the lock screen and dial 9 9 9.',
 'Ambulance for someone hurt or ill, Fire for fire and smoke, Police for danger from a person.',
 'Say where you are, what happened and your name. Speak slowly. Stay on the line until they say you can go.'];
const QS=[{q:'Zara cut her finger on paper. Should she call 999?',a:'No, tell a grown-up and use a plaster',o:[['Yes, any cut needs 999','graze'],['Yes, to be safe','test']]},
 {q:'Kai wants to call 999 to see if it works. Is that OK?',a:'No, 999 is only for real emergencies',o:[['Yes, if he hangs up fast','test'],['Yes, it is free','free']]},
 {q:'There is smoke in the hall. What first?',a:'Get out, then call 999',o:[['Stay in and call 999','stayin'],['Go back for my toys','toys']]},
 {q:'Mum is upstairs. Your brother fell and his leg looks wrong. What first?',a:'Run and get Mum',o:[['Call 999 without telling Mum','skipadult'],['Wait and see','wait']]},
 {q:'The call handler asks, “Where are you?” Ana is not at home. What can she do?',a:'Say a street sign, shop or building she can see',o:[['Say “I don’t know” and stop','where'],['Hang up and walk home','hang']]},
 {q:'Ben has told them what happened. Can he hang up now?',a:'No, stay on until they say he can go',o:[['Yes, they know now','hang'],['Yes, to keep the line free','free']]},
 {q:'The phone is locked and Ali does not know the code. What can he do?',a:'Tap Emergency and dial 999',o:[['Nothing, he needs the code','locked'],['Find someone with credit','credit']]}];
/* ---------- drawings ---------- */
function kid(g,x,y,s,col){g.save();g.fillStyle=col;g.beginPath();g.arc(x,y-s*.3,s*.18,0,7);g.fill();g.beginPath();g.moveTo(x-s*.28,y+s*.42);g.quadraticCurveTo(x,y-s*.16,x+s*.28,y+s*.42);g.closePath();g.fill();
 g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.06,y-s*.33,s*.024,0,7);g.fill()});g.restore()}
function sign(g,b,txt,col,say){g.save();g.fillStyle='#78350f';g.fillRect(b.x+b.w/2-3,b.y+b.h*.55,6,b.h*.45);g.restore();
 const t=box(b.x,b.y,b.w,b.h*.58);g.save();g.fillStyle=col;A0(g,t);g.fill();g.restore();say(txt,t.x+t.w/2,t.y+t.h/2,11,{c:'#ffffff',w:t.w-10})}
function A0(g,b){const r=Math.min(10,b.h/3);g.beginPath();g.moveTo(b.x+r,b.y);g.arcTo(b.x+b.w,b.y,b.x+b.w,b.y+b.h,r);g.arcTo(b.x+b.w,b.y+b.h,b.x,b.y+b.h,r);g.arcTo(b.x,b.y+b.h,b.x,b.y,r);g.arcTo(b.x,b.y,b.x+b.w,b.y,r);g.closePath()}
function handset(g,b){g.save();g.fillStyle='#111827';A0(g,b);g.fill();g.fillStyle='#f8fafc';A0(g,box(b.x+b.w*.06,b.y+b.h*.05,b.w*.88,b.h*.9));g.fill();g.restore()}
function van(g,x,y,s,kind){g.save();const c=['#ffffff','#b91c1c','#ffffff'][kind];g.fillStyle=c;g.strokeStyle='#334155';g.lineWidth=1.5;
 g.fillRect(x-s*.5,y-s*.22,s*.72,s*.36);g.strokeRect(x-s*.5,y-s*.22,s*.72,s*.36);g.fillRect(x+s*.22,y-s*.08,s*.26,s*.22);g.strokeRect(x+s*.22,y-s*.08,s*.26,s*.22);
 g.fillStyle=['#16a34a','#fde047','#1d4ed8'][kind];g.fillRect(x-s*.5,y,s*.98,s*.06);g.fillStyle='#1f2937';[-.3,.3].forEach(k=>{g.beginPath();g.arc(x+k*s,y+s*.16,s*.08,0,7);g.fill()});
 g.fillStyle=kind===1?'#fde047':'#2563eb';g.fillRect(x-s*.1,y-s*.32,s*.16,s*.1);g.restore()}
function handler(g,x,y,s){g.save();g.fillStyle='#0f766e';g.beginPath();g.arc(x,y-s*.3,s*.18,0,7);g.fill();g.fillRect(x-s*.22,y-s*.1,s*.44,s*.5);
 g.strokeStyle='#1f2937';g.lineWidth=2;g.beginPath();g.arc(x,y-s*.3,s*.23,3.4,6.0);g.stroke();g.fillStyle='#1f2937';g.fillRect(x+s*.18,y-s*.32,s*.08,s*.12);g.restore()}
return{box,inside,brush,CASE,WAY,SCENE,KEYS,SERV,JOB,ASK,SAYS,INTRO,WELL,QS,kid,sign,handset,van,handler,A0}})();
