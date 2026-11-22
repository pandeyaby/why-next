/* Flagship – crossing the road: stop, look, listen (ages 6–7; UK DfT THINK! Green Cross Code; RoSPA; WHO 2008).
   Find safer places to cross, put the code in order, look both ways before deciding, step out from behind a parked
   van until the driver can see you, and race a far fast car against a near slow one. Data: learn/road_art.js. */
(()=>{const {SPOTS,CODE,SHUF,FRAMES,VAN,DRIVER,RACE,DESC,DONE,TXT,QS}=ROAD;
VIS.reg('flagroad',c=>{let A,ctl,chal,art,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',LINE='#64748b',TAR='#475569',F='px system-ui,sans-serif';
const Y={top:.26,l1:.37,l0:.55,bot:.66,kerb:.75};
const which=()=>['spot','code','look','van','race','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function after(ms,f){const e=epoch;setTimeout(()=>{if(e===epoch)f()},ms)}
function street(o){o=o||{};const g=A.ctx,W=A.W,H=A.H;g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(0,0,W,H);
 g.fillStyle=TAR;g.fillRect(0,H*Y.top,W,H*(Y.bot-Y.top));g.fillStyle='#94a3b8';g.fillRect(0,H*Y.bot,W,4);g.fillRect(0,H*Y.top-4,W,4);
 g.strokeStyle='#f8fafc';g.lineWidth=3;g.setLineDash([16,12]);g.beginPath();g.moveTo(0,H*(Y.top+Y.bot)/2);g.lineTo(W,H*(Y.top+Y.bot)/2);g.stroke();g.setLineDash([]);
 if(o.zebra!=null){const x=W*o.zebra,w=Math.min(W*.09,44),n=7,h=H*(Y.bot-Y.top)/n;g.fillStyle='#ffffff';for(let i=0;i<n;i+=2)g.fillRect(x-w/2,H*Y.top+i*h,w,h)}}
function tag(t,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}const h=n+15;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?OK:o.no?NO:LINE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
/* a tile with text that wraps onto two lines if it must */
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.6;g.strokeStyle=o.no?NO:o.ok?OK:LINE;g.stroke();let n=fs(o.n||15);g.font=`800 ${n}${F}`;g.fillStyle=o.dim?'#475569':INK;g.textAlign='center';g.textBaseline='middle';
 const words=t.split(' ');let lines=[t];if(g.measureText(t).width>r.w-12&&words.length>1){let best=null;for(let k=1;k<words.length;k++){const a=words.slice(0,k).join(' '),b=words.slice(k).join(' '),m=Math.max(g.measureText(a).width,g.measureText(b).width);if(!best||m<best[0])best=[m,a,b]}lines=[best[1],best[2]]}
 while(lines.some(l=>g.measureText(l).width>r.w-10)&&n>9){n--;g.font=`800 ${n}${F}`}
 lines.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(lines.length-1)/2)*(n+3)+1))}
const pair=()=>[0,1].map(k=>{const w=Math.min(180,(A.W-36)/2),h=Math.min(A.H*.12,50);return{k,x:A.W/2+(k?6:-w-6),y:A.H-h-6,w,h}});
/* ---------- 1. find a safer place to cross ---------- */
const spotR=i=>{const r=Math.min(A.W*.06,26);return{x:A.W*SPOTS[i].x-r,y:A.H*Y.kerb-r,w:2*r,h:2*r,r}};
function drawSpot(){const s=S.a,g=A.ctx,W=A.W,H=A.H,cw=Math.min(W*.13,64);street({zebra:SPOTS[1].x});
 const lx=W*SPOTS[2].x;g.strokeStyle='#f8fafc';g.lineWidth=2;g.setLineDash([6,5]);[-1,1].forEach(e=>{g.beginPath();g.moveTo(lx+e*cw*.35,H*Y.top);g.lineTo(lx+e*cw*.35,H*Y.bot);g.stroke()});g.setLineDash([]);
 art.figure(lx+cw*.55,H*.86,Math.min(W*.03,13),true);
 art.car(W*.11,H*.6,cw,'#0f766e',0);art.car(W*.29,H*.6,cw,'#9333ea',0);
 g.fillStyle='#15803d';A.paint.rrect(W*.78,H*.67,W*.2,H*.06,6);g.fill();{const sx=W*.86,sy=H*.15,u=Math.min(W*.07,28);g.fillStyle='#ffffff';g.beginPath();g.moveTo(sx,sy-u);g.lineTo(sx+u,sy+u*.75);g.lineTo(sx-u,sy+u*.75);g.closePath();g.fill();g.strokeStyle='#dc2626';g.lineWidth=3;g.stroke();g.strokeStyle=INK;g.lineWidth=2.5;g.beginPath();g.moveTo(sx-u*.25,sy+u*.5);g.quadraticCurveTo(sx-u*.2,sy-u*.1,sx+u*.3,sy-u*.15);g.stroke()}g.fillStyle='#166534';g.beginPath();g.moveTo(W*.94,H*.3);g.quadraticCurveTo(W*.8,H*.46,W*.94,H*.62);g.lineTo(W,H*.62);g.lineTo(W,H*.3);g.fill();
 tag(s.found.length<2?'Where is it safer to cross? Tap a place':'Two safer places found',H*.08,{n:13,ok:s.found.length>=2,no:!!s.bad});
 SPOTS.forEach((P,i)=>{const r=spotR(i),got=s.found.includes(i),bad=s.bad===P.k;g.fillStyle=got?'#dcfce7':bad?'#fee2e2':'#ffffff';g.beginPath();g.arc(r.x+r.r,r.y+r.r,r.r,0,7);g.fill();
  g.lineWidth=3;g.strokeStyle=got?OK:bad?NO:INK;g.stroke();g.font=`900 ${fs(15)}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(got?'✓':bad?'✗':String.fromCharCode(65+i),r.x+r.r,r.y+r.r+1);
  g.font=`700 ${fs(11)}${F}`;g.fillStyle=A.col.dark?'#f1f5f9':INK;g.fillText(P.t,r.x+r.r,H*.93)})}
function pickSpot(i){const s=S.a,P=SPOTS[i];if(s.found.length>=2)return;if(!P.ok){s.bad=P.k;A.sound.miss();return say(P.why)}
 if(!s.found.includes(i))s.found.push(i);s.bad='';A.sound.pop();say(P.k==='zebra'?'Yes: a zebra crossing. Wait until cars have stopped, then cross.':'Yes: a crossing with a green figure. Wait for the green figure and for cars to stop.')}
/* ---------- 2. the code in order ---------- */
const rowR=(col,i)=>{const w=(A.W-24)/2,h=Math.min(A.H*.14,58),y0=A.H*.15;return{x:col?A.W/2+4:8,y:y0+i*(h+6),w,h}};
function drawCode(){const s=S.b,g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.5);g.fillRect(0,0,A.W,A.H);
 tag(s.got.length<CODE.length?`Tap step ${s.got.length+1} of the Green Cross Code`:'The Green Cross Code, in order',A.H*.07,{n:13,ok:s.got.length>=CODE.length,no:s.bad>=0});
 SHUF.forEach((k,i)=>tile(rowR(0,i),CODE[k],{dim:s.got.includes(k),no:s.bad===k,n:13}));
 for(let i=0;i<CODE.length;i++)tile(rowR(1,i),i<s.got.length?`${i+1}. ${CODE[s.got[i]]}`:`${i+1}.`,{ok:i<s.got.length,n:13})}
function pickStep(k){const s=S.b;if(s.got.length>=CODE.length||s.got.includes(k))return;const want=s.got.length;
 if(k!==want){s.bad=k;A.sound.miss();return say(k===4?'Not yet. You only walk once you have stopped, looked, listened and waited.':k>want?`"${CODE[k]}" comes later. What do you do before that?`:'That one is done.')}
 s.got.push(k);s.bad=-1;A.sound.pop();say(`${want+1}. ${CODE[k]}.`+(s.got.length<CODE.length?' What comes next?':' That is the whole code.'))}
/* ---------- 3. look both ways, then decide ---------- */
function drawLook(){const s=S.c,g=A.ctx,W=A.W,H=A.H,cw=Math.min(W*.13,64);street();
 if(s.f>=FRAMES.length){tag('Safe every time',H*.08,{ok:1});art.kid(W/2,H*.18,Math.min(W*.07,28));return}
 const Fr=FRAMES[s.f];if(!s.walk)Fr.cars.forEach(C=>art.car(W*C.x,H*(C.side?Y.l1:Y.l0),cw,C.side?'#dc2626':'#2563eb',C.side));
 [0,1].forEach(k=>{if(!s.seen[k]){g.fillStyle='#cbd5e1';g.fillRect(k?W*.56:0,H*Y.top-4,W*.44,H*(Y.bot-Y.top)+8);g.font=`800 ${fs(13)}${F}`;g.fillStyle=INK;g.textAlign='center';g.fillText(k?'Tap to look right ▶':'◀ Tap to look left',k?W*.78:W*.22,H*.46)}});
 art.kid(W/2,s.walk?H*.2:H*Y.kerb,Math.min(W*.07,28));
 tag(`Road ${s.f+1} of ${FRAMES.length}: look both ways, then Wait or Cross`,H*.08,{n:12,no:!!s.bad});pair().forEach(r=>tile(r,r.k?'🚶 Cross':'✋ Wait',{no:s.bad===(r.k?'cross':'wait'),n:16}))}
function look(k){const s=S.c;if(s.f>=FRAMES.length||s.walk)return;s.seen[k]=1;s.bad='';A.sound.tick();const C=FRAMES[s.f].cars.find(q=>q.side===k);
 say(C?`Looking ${k?'right':'left'}: a car is coming!`:`Looking ${k?'right':'left'}: nothing coming that way.`)}
function listen(){const s=S.c;if(s.f>=FRAMES.length)return;say(FRAMES[s.f].cars.length?'You can hear an engine. Something is coming.':'All quiet. Still look both ways: some cars are very quiet.')}
function decide(d){const s=S.c;if(s.f>=FRAMES.length||s.walk)return;const Fr=FRAMES[s.f],miss=[0,1].filter(k=>!s.seen[k]);
 if(miss.length){s.bad=d;A.sound.miss();return say(`Look all around first. You have not looked ${miss.map(k=>k?'right':'left').join(' or ')} yet.`)}
 if(d==='cross'&&Fr.cars.length){s.bad=d;A.sound.miss();const k=Fr.cars[0].side;return say(`Stop! A car is coming from the ${k?'right':'left'}. Clear on one side is not enough. Let it pass.`)}
 if(d==='wait'&&!Fr.cars.length){s.bad=d;A.sound.miss();return say('Nothing is coming either way. Now it is safe: walk straight across, and keep looking.')}
 s.bad='';A.sound.pop();
 if(d==='wait'){say('Good waiting. The car went past.');s.f++;s.seen=[0,0];return say(s.f<FRAMES.length?'Next road. Look both ways again.':DONE[2])}
 s.walk=1;say('Walking straight across, still looking and listening.');after(S.slow?700:250,()=>{s.walk=0;s.f++;s.seen=[0,0];say(s.f<FRAMES.length?'Next road. Look both ways again.':'You crossed safely.')})}
/* ---------- 4. step out from behind the van ---------- */
const vanR=()=>({x:A.W*VAN.x0,y:A.H*.5,w:A.W*(VAN.x1-VAN.x0),h:A.H*(Y.bot-.5)-2});
const eye=()=>({x:A.W*DRIVER,y:A.H*Y.l1});
function seen(xc){const v=vanR(),e=eye(),k={x:A.W*xc,y:A.H*Y.kerb};for(let t=0;t<=1;t+=.02){const x=e.x+(k.x-e.x)*t,y=e.y+(k.y-e.y)*t;if(within({x,y},v))return false}return true}
function drawVan(){const s=S.d,g=A.ctx,W=A.W,H=A.H,v=vanR(),e=eye(),ok=seen(s.x);street();
 art.car(e.x+W*.04,e.y,Math.min(W*.13,64),'#dc2626',0);g.fillStyle='#f8fafc';A.paint.rrect(v.x,v.y,v.w,v.h,8);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle='#bae6fd';g.fillRect(v.x+v.w*.84,v.y+v.h*.15,v.w*.12,v.h*.7);g.strokeRect(v.x+v.w*.84,v.y+v.h*.15,v.w*.12,v.h*.7);
 g.font=`800 ${fs(13)}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText('parked van',v.x+v.w/2,v.y+v.h/2);
 g.strokeStyle=ok?'#22c55e':'#ef4444';g.lineWidth=4;g.setLineDash(ok?[]:[8,6]);g.beginPath();g.moveTo(e.x+W*.08,e.y);g.lineTo(W*s.x,H*Y.kerb-H*.04);g.stroke();g.setLineDash([]);
 art.kid(W*s.x,H*Y.kerb,Math.min(W*.07,28));
 tag(s.won?'The driver can see you now':ok?'The driver can see you. Let go here':'Hidden: the driver cannot see you. Drag the child',H*.08,{n:12,ok:s.won,no:!ok&&s.moved});
 tag(ok?'✓ Driver can see you':'✗ Van in the way',H*.93,{n:12,ok,no:!ok})}
function nudge(d){const s=S.d;if(s.won)return;s.x=Math.max(.1,Math.min(.92,s.x+d));s.moved=1;settle()}
function settle(){const s=S.d;if(s.won)return;if(seen(s.x)){s.won=1;A.sound.pop();say('Yes: out from behind the van, the driver can see you, and you can see the car.')}
 else say(S.d.x>VAN.x0-.04?'Still hidden. The van is between you and the driver. Move away from the parked van.':'Still hidden. Keep moving until the line is green.')}
/* ---------- 5. far and fast against near and slow ---------- */
const GOAL=.86;
function drawRace(){const s=S.e,g=A.ctx,W=A.W,H=A.H,cw=Math.min(W*.13,64);street({zebra:GOAL});
 if(s.r>=RACE.length){tag('Both races checked',H*.08,{ok:1});tag('Far and fast can beat near and slow',H*.9,{n:12});return}
 const R=RACE[s.r];[R.a,R.b].forEach((C,j)=>{const y=H*(j?Y.l0:Y.l1),x=W*(s.pos?s.pos[j]:C.x)+cw/2;art.car(x,y,cw,C.c,0);
  const lb=`${C.n}: ${C.far?'far':'near'}, ${C.fast?'fast':'slow'}`;g.font=`800 ${fs(12)}${F}`;const tw=g.measureText(lb).width+12,lx=Math.max(4,Math.min(W*.62-tw,x-tw/2)),ly=y-cw*.25-fs(12)-8;g.fillStyle='#0f172a';A.paint.rrect(lx,ly,tw,fs(12)+8,6);g.fill();g.fillStyle='#ffffff';g.textAlign='left';g.textBaseline='middle';g.fillText(lb,lx+6,ly+(fs(12)+8)/2+1)});
 art.kid(W*GOAL,H*Y.kerb,Math.min(W*.07,28));tag(s.run?'Watch…':'Which car gets to the crossing first?',H*.08,{n:13,no:!!s.bad});
 if(!s.run)pair().forEach(r=>tile(r,r.k?'Car B first':'Car A first',{no:s.bad===(r.k?'b':'a'),n:15}))}
function race(k){const s=S.e;if(s.r>=RACE.length||s.run)return;const R=RACE[s.r];s.run=1;s.bad='';s.pos=[R.a.x,R.b.x];say(`You picked car ${k.toUpperCase()}. Watch.`);
 const dt=.05,speed=S.slow?1:3;(function tick(){s.pos[0]+=R.a.v*dt*speed;s.pos[1]+=R.b.v*dt*speed;A.redraw();
  const hit=[0,1].filter(j=>s.pos[j]+.065>=GOAL);if(!hit.length)return after(50,tick);
  const first=hit.length===2?(s.pos[0]>=s.pos[1]?'a':'b'):hit[0]?'b':'a';s.run=0;s.pos=null;
  if(first!==k){s.bad=k;A.sound.miss();return say(R.bad+' Try again.')}
  s.r++;A.sound.pop();say(`Yes: car ${first.toUpperCase()} got there first.`+(s.r<RACE.length?' Next race.':''))})()}
/* ---------- wiring ---------- */
function draw(){const k=which();if(k==='quiz'){street();tag('Challenge',A.H*.12,{ok:1});tag('Stop, look, listen, wait, then walk',A.H*.9,{n:13});return}
 ({spot:drawSpot,code:drawCode,look:drawLook,van:drawVan,race:drawRace})[k]();A.fx.draw(A.ctx)}
function down(p){const k=which();
 if(k==='spot'){const i=SPOTS.findIndex((_,i)=>{const r=spotR(i);return Math.hypot(p.x-r.x-r.r,p.y-r.y-r.r)<=r.r*1.4});if(i>=0)pickSpot(i);return false}
 if(k==='code'){const i=SHUF.findIndex((_,i)=>within(p,rowR(0,i)));if(i>=0)pickStep(SHUF[i]);return false}
 if(k==='look'){const b=pair().find(r=>within(p,r));if(b)decide(b.k?'cross':'wait');else if(p.y>A.H*Y.top&&p.y<A.H*Y.bot)look(p.x>A.W/2?1:0);else if(p.y>A.H*Y.bot)listen();return false}
 if(k==='van'){if(Math.abs(p.x-A.W*S.d.x)<A.W*.09&&p.y>A.H*.6){S.d.drag=1;return true}return false}
 if(k==='race'){const b=pair().find(r=>within(p,r));if(b)race(b.k?'b':'a')}return false}
function move(p){if(which()==='van'&&S.d.drag&&!S.d.won){S.d.x=Math.max(.1,Math.min(.92,p.x/A.W));S.d.moved=1;A.cv.setAttribute('aria-label',seen(S.d.x)?'The driver can see the child here.':'The van hides the child from the driver.');A.redraw()}}
function up(){if(which()==='van'&&S.d.drag){S.d.drag=0;settle()}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{slow:1,a:{found:[],bad:''},b:{got:[],bad:-1},c:{f:0,seen:[0,0],bad:'',walk:0},d:{x:.55,won:0,moved:0,drag:0},e:{r:0,run:0,pos:null,bad:''},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
/* Show me: a list of [wait ms, action] steps, quick, dropped if the scene restarts */
function demo(i,list){steps[i].go();S.slow=0;const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='spot'&&S.a.found.length<2)SPOTS.forEach((P,i)=>B(`${String.fromCharCode(65+i)}: ${P.t}`,()=>pickSpot(i),`Cross ${P.t==='zebra'?'at the zebra crossing':P.t==='green figure'?'at the green figure crossing':P.t}`));
 if(k==='code'&&S.b.got.length<CODE.length)SHUF.forEach(j=>{if(!S.b.got.includes(j))B(CODE[j],()=>pickStep(j))});
 if(k==='look'&&S.c.f<FRAMES.length){B('◀ Look left',()=>look(0));B('Look right ▶',()=>look(1));B('👂 Listen',listen);B('✋ Wait',()=>decide('wait'));B('🚶 Cross',()=>decide('cross'))}
 if(k==='van'&&!S.d.won){B('◀ Move left',()=>nudge(-.08),'Move the child left');B('Move right ▶',()=>nudge(.08),'Move the child right')}
 if(k==='race'&&S.e.r<RACE.length&&!S.e.run){B('Car A first',()=>race('a'));B('Car B first',()=>race('b'))}}
const steps=[
{h:'A safer place',p:TXT[0],predict:{q:'Is a gap between two parked cars a good place to cross?',opts:['Yes, it is close by','No, drivers cannot see me there'],ans:1},task:'Find the 2 safer places',
 show:()=>demo(0,[[300,()=>pickSpot(1)],[400,()=>pickSpot(2)]]),go:()=>enter(0,()=>S.a.found.length>=2)},
{h:'The code in order',p:TXT[1],task:'Put all 5 steps in order',show:()=>demo(1,CODE.map((_,k)=>[260,()=>pickStep(k)])),go:()=>enter(1,()=>S.b.got.length>=CODE.length)},
{h:'Look both ways',p:TXT[2],predict:{q:'The road is clear on your left. Can you cross now?',opts:['Yes, it is clear','Not yet, look right too'],ans:1},task:'Get across all 3 roads safely',
 show:()=>demo(2,FRAMES.flatMap(Fr=>[[200,()=>look(0)],[200,()=>look(1)],[220,()=>decide(Fr.ans)],[380,()=>{}]])),go:()=>enter(2,()=>S.c.f>=FRAMES.length)},
{h:'Behind the van',p:TXT[3],predict:{q:'You are small and behind a big parked van. Can the car driver see you?',opts:['Yes, if I can hear the car','No, the van hides me'],ans:1},task:'Move to where the driver can see you',
 show:()=>demo(3,[[250,()=>nudge(-.08)],[250,()=>nudge(-.08)],[250,()=>nudge(-.08)]]),go:()=>enter(3,()=>S.d.won)},
{h:'Far but fast',p:TXT[4],predict:{q:'Car A is far away but fast. Car B is near but slow. Which gets to you first?',opts:['Car B, it is nearer','Car A, it is much faster'],ans:1},task:'Check both races',
 show:()=>demo(4,[[200,()=>race('a')],[2000,()=>race('b')]]),go:()=>enter(4,()=>S.e.r>=RACE.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Stop at the kerb, look all around and listen, wait until nothing is coming, then walk straight across.';
 if(t==='run')m='Do not run: you could trip, and drivers expect you to walk. Walk straight across and keep looking.';
 if(t==='oneway')m='Clear on one side is not enough. Look all around and listen, and wait until nothing is coming either way.';
 if(t==='parked')m='Parked cars hide you, so drivers cannot see you step out. Cross at a crossing, away from parked cars.';
 if(t==='bend')m='On a bend you cannot see cars coming, and drivers cannot see you. Pick a straight road or a crossing.';
 if(t==='see')m='A driver sits higher, but a big van still hides a small child. Step out from behind it to a clear place.';
 if(t==='speed')m='A far car that is going fast can reach you sooner than you think. Speed is hard to judge, so cross with a grown-up.';
 if(t==='keep')m='Keep looking and listening all the way across, in case a car comes.';
 if(t==='why')m='Children find car speed hard to judge, and drivers may not see small children. So hold a grown-up\u2019s hand to cross.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;art=ROAD.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Road crossing lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
