/* Flagship – space robots and rovers (ages 7–9). Why robots go to Mars, the radio delay, planning a drive, rover
   tools, rocks made by water, a robot check. Data in learn/rover_art.js. Distinct from flagastro and flagsolscale. */
(()=>{const R=ROV;
VIS.reg('flagrover',c=>{let A,btns,chal,qn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#111827',GOOD='#15803d',BAD='#b91c1c',EDGE='#94a3b8',DUST='#fde7d4',NIGHT='#0f172a',FONT='px system-ui,sans-serif';
const scene=()=>['needs','radio','drive','tools','rocks','robot','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* split words into lines that fit a width */
function lines(s,w){const g=A.ctx,out=[];let cur='';s.split(' ').forEach(t=>{const nx=cur?cur+' '+t:t;if(g.measureText(nx).width>w&&cur){out.push(cur);cur=t}else cur=nx});if(cur)out.push(cur);return out}
/* a white card with dark text, centred on x, top at y; returns its height */
function card(s,x,y,o){o=o||{};const g=A.ctx,f=fs(o.n||13),w=Math.min(o.w||A.W-12,A.W-8);g.font=`700 ${f}${FONT}`;const L=lines(s,w-20),h=L.length*(f+4)+12,l=Math.max(4,Math.min(A.W-w-4,x-w/2));
 g.fillStyle='#ffffff';A.paint.rrect(l,y,w,h,9);g.fill();g.lineWidth=o.good||o.bad?3:1.5;g.strokeStyle=o.good?GOOD:o.bad?BAD:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';L.forEach((t,i)=>g.fillText(t,l+w/2,y+7+i*(f+4)));return h}
/* a large tap target */
function pad(b,s,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,11);g.fill();g.lineWidth=o.bad||o.good?3.5:1.5;g.strokeStyle=o.bad?BAD:o.good?GOOD:EDGE;g.stroke();
 let f=fs(o.n||13);g.font=`800 ${f}${FONT}`;let L=lines(s,b.w-10);while(f>9&&(L.length>2||L.some(t=>g.measureText(t).width>b.w-8))){f--;g.font=`800 ${f}${FONT}`;L=lines(s,b.w-10)}
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';L.forEach((t,i)=>g.fillText(t,b.x+b.w/2,b.y+b.h/2+(i-(L.length-1)/2)*(f+3)))}
const ground=()=>{const g=A.ctx;g.fillStyle=DUST;g.fillRect(0,0,A.W,A.H)};
/* 1. what Mars means for a person and for a rover */
const panels=()=>{const n=R.NEEDS.length,gap=8,w=(A.W-16-gap*(n-1))/n;return R.NEEDS.map((N,i)=>({i,x:8+i*(w+gap),y:A.H*.13,w,h:Math.min(64,A.H*.15)}))};
function drawNeeds(){const s=S.needs,g=A.ctx;ground();card(`Tap each Mars panel: ${s.seen.length} of 4 opened`,A.W/2,A.H*.02,{n:12,good:s.seen.length>=4});
 panels().forEach(b=>pad(b,R.NEEDS[b.i].t,{good:s.seen.includes(b.i),n:14}));
 if(s.open<0){R.paintPlanet(g,'mars',A.W/2,A.H*.6,Math.min(A.W,A.H)*.18);return}
 const N=R.NEEDS[s.open];let y=A.H*.34;y+=card(N.fact,A.W/2,y,{n:13})+8;y+=card('Person: '+N.person,A.W/2,y,{n:13,bad:1})+8;card('Rover: '+N.robot,A.W/2,y,{n:13,good:1})}
function openPanel(i){const s=S.needs;s.open=i;if(!s.seen.includes(i))s.seen.push(i);A.sound.pop();const N=R.NEEDS[i];
 say(`${N.t}. ${N.fact} ${N.person} ${N.robot}`+(s.seen.length<4?` ${4-s.seen.length} panels left.`:' All 4 opened.'))}
/* 2. a radio message from Earth to Mars */
const STEPS=[55,100,150,200,250,300,350,400];
const marsX=d=>A.W*.3+(A.W*.6)*(d-R.NEAR)/(R.FAR-R.NEAR);
const sendKey=()=>({x:A.W/2-Math.min(90,A.W*.22),y:A.H*.8,w:Math.min(180,A.W*.44),h:Math.min(56,A.H*.13)});
function drawRadio(){const s=S.radio,g=A.ctx,y=A.H*.42,r=Math.min(A.W*.08,34);g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H);
 card(s.sent==null?'Drag Mars, then tap Send':`Mars ${s.sent} million km away: about ${Math.round(R.mins(s.sent))} minutes`,A.W/2,A.H*.03,{n:12,good:s.sent!=null&&s.t>=1});
 const mx=marsX(s.d);g.strokeStyle='#64748b';g.setLineDash([5,6]);g.lineWidth=2;g.beginPath();g.moveTo(A.W*.1,y);g.lineTo(mx,y);g.stroke();g.setLineDash([]);
 R.paintPlanet(g,'earth',A.W*.1,y,r);R.paintPlanet(g,'mars',mx,y,r*.55);
 card('Earth',A.W*.1+20,y-r-40,{n:11,w:80});card(`Mars: ${s.d} million km`,Math.min(A.W-70,mx),y+r+10,{n:11,w:Math.min(170,A.W*.45)});
 if(s.sent!=null&&s.t<1){const px=A.W*.1+(marsX(s.sent)-A.W*.1)*s.t;g.fillStyle='#fde047';g.beginPath();g.arc(px,y,7,0,7);g.fill()}
 card(`Near tried: ${s.near?'yes':'not yet'}   Far tried: ${s.far?'yes':'not yet'}`,A.W/2,A.H*.66,{n:11,w:Math.min(320,A.W-16)});
 pad(sendKey(),'Send',{n:15})}
function setDist(v){const s=S.radio;if(s.busy)return;let best=STEPS[0];STEPS.forEach(d=>{if(Math.abs(d-v)<Math.abs(best-v))best=d});s.d=best;A.redraw()}
function nudge(k){const i=STEPS.indexOf(S.radio.d);setDist(STEPS[Math.max(0,Math.min(STEPS.length-1,i+k))]);say(`Mars is ${S.radio.d} million km away. Tap Send.`)}
function send(){const s=S.radio;if(s.busy)return;s.busy=true;s.sent=s.d;s.t=0;A.sound.whoosh();
 A.tween(s,{t:1},700,'io',()=>{s.busy=false;const m=Math.round(R.mins(s.sent));if(s.sent===R.NEAR)s.near=true;if(s.sent===R.FAR)s.far=true;
  const more=!s.near?' Now try Mars at its nearest.':!s.far?' Now try Mars at its furthest.':' Both done.';say(`The message took about ${m} minutes to cross ${s.sent} million km.`+more)})}
/* 3. plan a drive round the craters */
const grid=()=>{const G=R.GRID,top=A.H*.14,bot=A.H*.76,side=Math.min((A.W-16)/G.c,(bot-top)/G.r);return{x:(A.W-side*G.c)/2,y:top,side}};
const cellAt=p=>{const q=grid(),cx=Math.floor((p.x-q.x)/q.side),cy=Math.floor((p.y-q.y)/q.side);return cx>=0&&cy>=0&&cx<R.GRID.c&&cy<R.GRID.r?[cx,cy]:null};
const same=(a,b)=>a[0]===b[0]&&a[1]===b[1],isHole=a=>R.GRID.holes.some(h=>same(h,a));
const planKey=()=>({x:A.W/2-Math.min(100,A.W*.26),y:A.H*.82,w:Math.min(200,A.W*.52),h:Math.min(54,A.H*.12)});
function drawDrive(){const s=S.drive,g=A.ctx,q=grid(),G=R.GRID;ground();
 card(s.arrived?'The rover reached the rock':s.going?'Plan sent: the rover follows it':`Plan: ${s.path.length-1} squares. Tap squares next to the rover`,A.W/2,A.H*.02,{n:12,good:s.arrived,bad:s.warn});
 for(let y=0;y<G.r;y++)for(let x=0;x<G.c;x++){const X=q.x+x*q.side,Y=q.y+y*q.side;g.fillStyle=(x+y)%2?'#fdba74':'#fed7aa';g.fillRect(X,Y,q.side,q.side);g.strokeStyle='#9a3412';g.lineWidth=1;g.strokeRect(X,Y,q.side,q.side);
  if(isHole([x,y])){g.fillStyle='#7c2d12';g.beginPath();g.ellipse(X+q.side/2,Y+q.side/2,q.side*.36,q.side*.26,0,0,7);g.fill();if(s.bump&&same(s.bump,[x,y])){g.strokeStyle=BAD;g.lineWidth=4;g.strokeRect(X+2,Y+2,q.side-4,q.side-4)}}}
 const mid=a=>[q.x+(a[0]+.5)*q.side,q.y+(a[1]+.5)*q.side];
 g.strokeStyle='#1d4ed8';g.lineWidth=Math.max(4,q.side*.12);g.lineCap='round';g.beginPath();s.path.forEach((a,i)=>{const[m,n]=mid(a);i?g.lineTo(m,n):g.moveTo(m,n)});g.stroke();
 const[gx,gy]=mid(G.goal);R.paintRock(g,'vein',gx,gy,q.side*.6);
 const at=Math.min(s.path.length-1,Math.floor(s.pos)),nx=Math.min(s.path.length-1,at+1),f=s.pos-at,[ax,ay]=mid(s.path[at]),[bx,by]=mid(s.path[nx]);
 R.paintRover(g,ax+(bx-ax)*f,ay+(by-ay)*f-q.side*.1,q.side*.36);
 if(!s.arrived)pad(planKey(),'Send plan',{n:14})}
function step(a){const s=S.drive;if(s.going||s.arrived)return;const last=s.path[s.path.length-1];
 const k=s.path.findIndex(b=>same(a,b));if(k>=0){s.path=s.path.slice(0,Math.max(1,k+(k===s.path.length-1&&k>0?0:1)));s.warn=false;s.bump=null;return say(`Plan shortened to ${s.path.length-1} squares.`)}
 if(Math.abs(a[0]-last[0])+Math.abs(a[1]-last[1])!==1){s.warn=true;A.sound.miss();return say('A rover drives one square at a time. Pick a square right next to the end of the path.')}
 if(isHole(a)){s.warn=true;s.bump=a;A.sound.miss();return say('Crater! A rover could tip over or get stuck in it. Plan a path round it.')}
 s.warn=false;s.bump=null;s.path.push(a);A.sound.tick();say(same(a,R.GRID.goal)?'The path reaches the rock. Tap Send plan.':`Path ${s.path.length-1} squares long.`)}
function move(dx,dy){const s=S.drive,l=s.path[s.path.length-1];step([l[0]+dx,l[1]+dy])}
function undo(){const s=S.drive;if(s.going||s.arrived||s.path.length<2)return;s.path.pop();s.warn=false;say(`Plan shortened to ${s.path.length-1} squares.`)}
function sendPlan(){const s=S.drive;if(s.going||s.arrived)return;
 if(!same(s.path[s.path.length-1],R.GRID.goal)){s.warn=true;A.sound.miss();return say('The plan stops before the rock. The rover would stop and wait about 20 minutes for the next message. Plan the whole path first.')}
 s.going=true;s.warn=false;A.sound.whoosh();A.tween(s,{pos:s.path.length-1},Math.min(1600,150*s.path.length),'io',()=>{s.going=false;s.arrived=true;say('The rover followed the whole plan and reached the rock, with no live steering.')})}
/* 4. match each job to a tool */
const toolPads=()=>{const per=A.narrow?3:5,gap=6,w=(A.W-16-gap*(per-1))/per,h=Math.min(52,A.H*.11);return R.TOOLS.map((T,i)=>({i,x:8+(i%per)*(w+gap),y:A.H*.68+Math.floor(i/per)*(h+gap),w,h}))};
const roverAt=()=>({x:A.W/2,y:A.H*.5,u:Math.min(A.W*.3,A.H*.28)});
function drawTools(){const s=S.tools,g=A.ctx,V=roverAt();ground();
 if(s.i>=R.JOBS.length){card('All 5 jobs matched to tools',A.W/2,A.H*.04,{n:13,good:1})}else card(`Job ${s.i+1} of 5: ${R.TOOLS[R.JOBS[s.i]].job}`,A.W/2,A.H*.03,{n:13,bad:s.miss>=0});
 g.fillStyle='#fed7aa';g.fillRect(0,V.y+V.u*.55,A.W,A.H*.06);R.paintRover(g,V.x,V.y,V.u,s.ring,s.miss<0);
 toolPads().forEach(b=>pad(b,R.TOOLS[b.i].t,{bad:s.miss===b.i,good:s.got.includes(b.i),n:12}))}
function pickTool(i){const s=S.tools;if(s.i>=R.JOBS.length)return;const want=R.JOBS[s.i],T=R.TOOLS[i];s.ring=T.k;
 if(i!==want){s.miss=i;A.sound.miss();return say(`The ${T.t.toLowerCase()} cannot do that job. ${R.TOOLS[want].hint}`)}
 s.miss=-1;s.got.push(i);s.i++;A.sound.pop();say(`Yes: the ${T.t.toLowerCase()}.`+(s.i<R.JOBS.length?' Next job.':' All tools used.'))}
function toolAtPic(p){const V=roverAt();let best=-1,d0=V.u*.28;R.TOOLS.forEach((T,i)=>{const d=Math.hypot(p.x-(V.x+T.x*V.u),p.y-(V.y+T.y*V.u));if(d<d0){d0=d;best=i}});return best}
/* 5. which rocks show water long ago */
const rockPads=()=>{const per=A.narrow?2:3,rows=Math.ceil(R.ROCKS.length/per),gap=8,w=(A.W-16-gap*(per-1))/per,h=(A.H*.8-gap*(rows-1))/rows;return R.ROCKS.map((K,i)=>({i,x:8+(i%per)*(w+gap),y:A.H*.17+Math.floor(i/per)*(h+gap),w,h}))};
function drawRocks(){const s=S.rocks,g=A.ctx;ground();card(`Tap the rocks made by water: ${s.found.length} of 3`,A.W/2,A.H*.02,{n:12,good:s.found.length>=3});
 rockPads().forEach(b=>{const K=R.ROCKS[b.i],ok=s.found.includes(b.i),no=s.miss===b.i;g.fillStyle=no?'#fee2e2':ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,11);g.fill();g.lineWidth=ok||no?3.5:1.5;g.strokeStyle=no?BAD:ok?GOOD:EDGE;g.stroke();
  R.paintRock(g,K.k,b.x+b.w/2,b.y+b.h*.42,Math.min(b.w*.45,b.h*.5));g.font=`800 ${fs(12)}${FONT}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const L=lines(K.t,b.w-10);L.forEach((t,j)=>g.fillText(t,b.x+b.w/2,b.y+b.h*.82+(j-(L.length-1)/2)*15))})}
function pickRock(i){const s=S.rocks,K=R.ROCKS[i];if(s.found.length>=3||s.found.includes(i))return;
 if(!K.water){s.miss=i;A.sound.miss();return say(`Not a water clue. ${K.why}`)}
 s.miss=-1;s.found.push(i);A.sound.pop();say(`Yes, a water clue. ${K.why}`+(s.found.length<3?` ${3-s.found.length} more.`:' Mars had water long ago.'))}
/* 6. check the robot */
const verdict=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.16,60)}))};
function drawRobot(){const s=S.robot,g=A.ctx;ground();if(s.i>=R.ROBOT.length){card('All 5 sayings checked',A.W/2,A.H*.2,{n:13,good:1});return}
 R.paintRover(g,A.W/2,A.H*.22,Math.min(A.W*.16,60));const Q=R.ROBOT[s.i];card(`“${Q.say}”`,A.W/2,A.H*.38,{n:13});card(`Saying ${s.i+1} of ${R.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.56,{n:12,w:Math.min(330,A.W-16)});
 verdict().forEach(b=>pad(b,b.t,{bad:s.miss===b.i,n:16}))}
function judge(k){const s=S.robot;if(s.i>=R.ROBOT.length)return;const Q=R.ROBOT[s.i];
 if((k===0)!==Q.ok){s.miss=k;A.sound.miss();return say((Q.ok?'Look again: it is right. ':'Careful, that is a slip. ')+Q.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=scene();if(k==='quiz'){ground();card('Challenge',A.W/2,A.H*.2,{n:14,good:1});R.paintRover(A.ctx,A.W/2,A.H*.6,Math.min(A.W*.2,70));return}
 ({needs:drawNeeds,radio:drawRadio,drive:drawDrive,tools:drawTools,rocks:drawRocks,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='needs'){const b=panels().find(q=>hit(p,q));if(b)openPanel(b.i)}
 else if(k==='radio'){if(hit(p,sendKey())){send();return false}if(Math.abs(p.y-A.H*.45)<A.H*.18&&p.x>A.W*.2){S.radio.drag=true;setDist(R.NEAR+(p.x-A.W*.3)/(A.W*.6)*(R.FAR-R.NEAR));return true}}
 else if(k==='drive'){if(hit(p,planKey())){sendPlan();return false}const a=cellAt(p);if(a){step(a);S.drive.drag=true;return true}}
 else if(k==='tools'){const b=toolPads().find(q=>hit(p,q));if(b)pickTool(b.i);else{const t=toolAtPic(p);if(t>=0)pickTool(t)}}
 else if(k==='rocks'){const b=rockPads().find(q=>hit(p,q));if(b)pickRock(b.i)}
 else if(k==='robot'){const b=verdict().find(q=>hit(p,q));if(b)judge(b.i)}
 return false}
function drag(p){const k=scene();if(k==='radio'&&S.radio.drag)setDist(R.NEAR+(p.x-A.W*.3)/(A.W*.6)*(R.FAR-R.NEAR));
 if(k==='drive'&&S.drive.drag){const a=cellAt(p),s=S.drive,l=s.path[s.path.length-1];if(a&&!same(a,l)&&!s.path.some(b=>same(a,b))&&Math.abs(a[0]-l[0])+Math.abs(a[1]-l[1])===1)step(a)}}
function up(){if(S.radio&&S.radio.drag){S.radio.drag=false;say(`Mars is ${S.radio.d} million km away. Tap Send.`)}if(S.drive)S.drive.drag=false}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{needs:{seen:[],open:-1},radio:{d:200,sent:null,t:0,near:false,far:false,busy:false,drag:false},
 drive:{path:[R.GRID.start.slice()],pos:0,going:false,arrived:false,warn:false,bump:null,drag:false},tools:{i:0,miss:-1,got:[],ring:null},rocks:{found:[],miss:-1},robot:{i:0,miss:-1},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();mirror();S.check()}
/* button twins under the canvas for every canvas action */
function mirror(){if(!btns)return;btns.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(k==='needs')R.NEEDS.forEach((N,i)=>b(N.t,()=>openPanel(i),`Open the ${N.t} panel`));
 if(k==='radio'){b('Nearer',()=>nudge(-1),'Move Mars nearer to Earth');b('Further',()=>nudge(1),'Move Mars further from Earth');b('Send',send,'Send a radio message to Mars')}
 if(k==='drive'&&!S.drive.arrived){b('Up',()=>move(0,-1),'Add the square above to the plan');b('Down',()=>move(0,1),'Add the square below to the plan');b('Left',()=>move(-1,0),'Add the square to the left');b('Right',()=>move(1,0),'Add the square to the right');b('Undo',undo,'Remove the last square from the plan');b('Send plan',sendPlan)}
 if(k==='tools'&&S.tools.i<R.JOBS.length)R.TOOLS.forEach((T,i)=>b(T.t,()=>pickTool(i),`Use the ${T.t}`));
 if(k==='rocks'&&S.rocks.found.length<3)R.ROCKS.forEach((K,i)=>b(K.t,()=>pickRock(i),`Pick: ${K.t}`));
 if(k==='robot'&&S.robot.i<R.ROBOT.length){b('✓ Right',()=>judge(0),'The robot is right');b('✗ Slip',()=>judge(1),'The robot made a slip')}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){reset();say(R.DESC[i]);S.check=finish(i,ok,R.DONE[i])}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Why send a robot?',p:'People have never been to Mars, but rovers have. Open each Mars panel to see why.',
 predict:{q:'Why do we send rovers to Mars instead of people?',opts:['People are not allowed to go','It is too far, cold and airless for people'],ans:1},task:'Open all 4 Mars panels',
 show:()=>play(0,R.NEEDS.map((N,i)=>()=>openPanel(i)),500),go:()=>enter(0,()=>S.needs.seen.length>=4)},
{h:'Talking to Mars',p:'Engineers talk to rovers by radio. Radio is fast, but Mars is very far away. Time a message when Mars is near and when it is far.',
 predict:{q:'Engineers send the message "Stop!" to a rover on Mars. When does it arrive?',opts:['At the same moment','Some minutes later'],ans:1},task:'Send a message with Mars nearest and furthest',
 show:()=>play(1,[()=>{setDist(R.NEAR)},()=>send(),()=>{setDist(R.FAR)},()=>send()],900),go:()=>enter(1,()=>S.radio.near&&S.radio.far)},
{h:'Plan the drive',p:'The rover must reach the rock with white veins. Messages take minutes, so plan every square first, then send the plan.',
 predict:{q:'Can engineers steer the rover round each crater live, like a toy car?',opts:['Yes, they steer it as it goes','No, they plan the path first'],ans:1},task:'Plan a safe path to the rock and send it',
 show:()=>play(2,R.ROUTE.slice(1).map(a=>()=>step(a)).concat([()=>sendPlan()]),220),go:()=>enter(2,()=>S.drive.arrived)},
{h:'Rover tools',p:'A rover is a science lab on wheels. Read each job and tap the tool that does it.',task:'Match all 5 jobs to tools',
 show:()=>play(3,R.JOBS.map(i=>()=>pickTool(i)),550),go:()=>enter(3,()=>S.tools.i>=R.JOBS.length)},
{h:'Clues of water',p:'Mars is a dry desert today. Rovers look for rocks that show water was there long ago. Tap the 3 water clues.',
 predict:{q:'Mars is dry now. Did it ever have rivers and lakes?',opts:['No, it was always dry','Yes, long ago'],ans:1},task:'Find the 3 rocks made by water',
 show:()=>play(4,R.ROCKS.map((K,i)=>i).filter(i=>R.ROCKS[i].water).map(i=>()=>pickRock(i)),600),go:()=>enter(4,()=>S.rocks.found.length>=3)},
{h:'Check the robot',p:'The robot says things about space rovers. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>play(5,R.ROBOT.map(Q=>()=>judge(Q.ok?0:1)),550),go:()=>enter(5,()=>S.robot.i>=R.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
/* feedback for each wrong challenge answer, by the slip it shows */
function slip(t){let m='Rovers explore Mars for us because it is far, cold and has no air to breathe.';
 if(t==='people')m='Nothing forbids people. Mars has no air to breathe, is about −60 °C and takes about 7 months to reach, so robots go first.';
 if(t==='delay')m='Radio is very fast but Mars is very far, so a message takes about 3 to 22 minutes. Months is how long a rocket takes.';
 if(t==='live')m='No one can steer live: each message takes minutes. Engineers send a whole planned path, and no people are on Mars.';
 if(t==='tool')m='Each tool has one job: cameras look, the laser tests from far away, the drill gets inside, tubes keep the cores.';
 if(t==='water')m='Sharp rock and dunes need no water. Round pebbles, flat mud layers and white veins were made by water.';
 if(t==='today')m='Mars is a dry desert today, but its rocks show rivers and a lake long ago.';
 return m}
function ask(){qn++;const Q=R.QS[qn%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qn*2)%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:x=>{chal.hidden=x.step!==6;btns.hidden=x.step===6;mirror()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rover lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move:drag,up});mirror()}}).start()})})();
