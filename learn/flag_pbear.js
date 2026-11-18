/* Flagship – polar bears (ages 5–7; NC Y1–Y2 animals, habitats): far north home, blubber glove, paw size on thin ice
   and in the sea, waiting at a breathing hole, months with no sea ice. Not flagpolaran or flagpengu. */
(()=>{const lo=Math.min,hi=Math.max;
const HOME=[['🐻‍❄️','polar bear',0,'No polar bears live in the Antarctic. They live only in the far north, the Arctic.'],['🐧','penguin',1,'Wild penguins live in the south, not in the Arctic.'],['🦊','Arctic fox',0,'The Arctic fox lives in the far north. Arctic is in its name.']];
const GLOVE=[['✋','bare hand',10,'Bare skin gets cold very fast in icy water.'],['🧤','wet fur',25,'Fur is warm on land, but wet fur keeps out much less cold.'],['🟨','blubber',150,'The fat layer kept the hand warm a long time, even in water.'],['🧤🟨','fur + blubber',160,'Both together are best, but most of the warmth in water is from the blubber.']];
const HOLE=[1,0,2];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],OPEN=[6,7,8,9];
VIS.reg('flagpbear',c=>{let A,box,quiz,qi=-1,tick=0;const P={};c.fig.classList.add('young');
const DARK='#0f172a',GOOD='#047857',BAD='#b91c1c',LINE='#475569',ICE='#e0f2fe',SEA='#1e3a8a',TAU=Math.PI*2;
const ft=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,big=n=>A.narrow?n:Math.round(n*1.2);
const now=()=>['home','glove','paw','hole','ice','chal'][A.step];
const ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.55);g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=ft(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=ft(n);w=g.measureText(t).width+22}
 const h=n+16,x0=hi(5,lo(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?GOOD:o.bad?BAD:LINE;g.stroke();ctr(g);g.fillStyle=DARK;g.fillText(t,x0+w/2,y+1)}
function tile(r,pic,name,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.on?4:2;g.strokeStyle=o.ok?GOOD:o.bad?BAD:o.on?'#7c3aed':LINE;g.stroke();ctr(g);
 if(pic){g.font=`${Math.round(lo(r.h*.42,r.w*.36))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(name?.38:.5))}
 if(name){let n=Math.round(hi(11,lo(big(15),r.h*.2)));g.font=ft(n);while(g.measureText(name).width>r.w-8&&n>9){n--;g.font=ft(n)}g.fillStyle=DARK;g.fillText(name,r.x+r.w/2,r.y+r.h*(pic?.82:.5))}}
const has=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. north or south */
const bands=()=>[{x:8,y:A.H*.1,w:A.W-16,h:A.H*.25},{x:8,y:A.H*.68,w:A.W-16,h:A.H*.28}];
const homeCards=()=>{const w=lo(130,(A.W-40)/3),h=lo(96,A.H*.2);return HOME.map((v,i)=>({i,x:A.W/2-1.5*w-10+i*(w+10),y:A.H*.41,w,h}))};
function drawHome(){const s=P.h,g=A.ctx,B=bands();sky();
 [['Arctic: the far north, a frozen sea','#bae6fd'],['Antarctic: the far south, icy land','#ddd6fe']].forEach(([t,col],j)=>{g.fillStyle=col;A.paint.rrect(B[j].x,B[j].y,B[j].w,B[j].h,14);g.fill();g.strokeStyle=LINE;g.lineWidth=2;g.stroke();
  g.fillStyle=DARK;g.font=ft(big(13));g.textAlign='left';g.textBaseline='top';g.fillText(t,B[j].x+10,B[j].y+8);s.at.forEach((b,i)=>{if(b===j){const n=s.at.slice(0,i).filter(x=>x===j).length;g.font=`${big(30)}px system-ui,sans-serif`;g.fillText(HOME[i][0],B[j].x+14+n*58,B[j].y+B[j].h*.42)}})});
 note(s.at.every(b=>b!=null)?'All 3 are home':'Drag each animal to its home',A.W/2,A.H*.05,{n:13,ok:s.at.every(b=>b!=null)});
 homeCards().forEach(r=>{if(s.at[r.i]!=null||(P.drag&&P.drag.i===r.i))return;tile(r,HOME[r.i][0],HOME[r.i][1],{bad:s.bad===r.i})});
 if(P.drag){const d=P.drag,r=homeCards()[d.i];tile({...r,x:d.x-r.w/2,y:d.y-r.h/2},HOME[d.i][0],HOME[d.i][1],{on:1})}}
function send(i,j){const s=P.h;if(s.at[i]!=null)return;const [,name,home,miss]=HOME[i];
 if(j!==home){s.bad=i;A.sound.miss();return say(miss)}s.at[i]=j;s.bad=null;A.sound.pop();say(`Yes, the ${name} lives in the far ${j?'south':'north'}.`+(s.at.every(b=>b!=null)?' Polar bears and penguins never meet in the wild.':''))}
/* 2. blubber glove */
const gloveCards=()=>{const w=lo(130,(A.W-50)/4),h=lo(84,A.H*.18);return GLOVE.map((v,i)=>({i,x:A.W/2-2*w-15+i*(w+10),y:A.H*.12,w,h}))};
const tank=()=>({x:A.W*.08,y:A.H*.5,w:A.W*.42,h:A.H*.44});
function drawGlove(){const s=P.g,g=A.ctx,T=tank();sky();
 gloveCards().forEach(r=>tile(r,GLOVE[r.i][0],GLOVE[r.i][1],{on:s.pick===r.i,ok:s.res[r.i]!=null}));
 g.fillStyle='#93c5fd';A.paint.rrect(T.x,T.y,T.w,T.h,12);g.fill();g.strokeStyle=SEA;g.lineWidth=2;g.stroke();g.font=`${big(18)}px system-ui,sans-serif`;ctr(g);g.fillText('🧊 🧊',T.x+T.w/2,T.y+18);
 g.fillStyle=DARK;g.font=ft(big(12));g.fillText('icy water',T.x+T.w/2,T.y+T.h-14);
 if(s.pick!=null){const y=s.dip?T.y+T.h*.45:(P.drag?P.drag.y:A.H*.38),x=P.drag?P.drag.x:T.x+T.w/2;g.font=`${big(34)}px system-ui,sans-serif`;g.fillText(GLOVE[s.pick][0],x,y)}
 const cx=A.W*.56,cw=A.W*.4,top=A.H*.52,rh=lo(34,A.H*.1);g.textAlign='left';g.font=ft(big(11));g.fillStyle=A.col.tx;g.fillText('seconds until too cold',cx,top-14);
 GLOVE.forEach((v,i)=>{const y=top+i*(rh+8),t=s.res[i];g.fillStyle=A.col.tx;g.font=ft(big(11));g.textBaseline='top';g.fillText(`${v[1]}${t!=null?': '+t:''}`,cx,y);
  g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(cx,y+15,cw,rh-15);if(t!=null){g.fillStyle=t>100?GOOD:'#d97706';g.fillRect(cx,y+15,cw*lo(1,t/160),rh-15)}})}
function pickGlove(i){const s=P.g;s.pick=i;s.dip=0;A.sound.tick();say(`${GLOVE[i][1]} chosen. Now drag the hand into the icy water.`)}
function dip(){const s=P.g;if(s.pick==null)return say('Choose a glove first.');const i=s.pick;s.dip=1;s.res[i]=GLOVE[i][2];A.sound.pop();
 say(`${GLOVE[i][1]}: ${GLOVE[i][2]} seconds. ${GLOVE[i][3]}`+(s.res.filter(x=>x!=null).length>=4?' Blubber is what keeps a polar bear warm when it swims.':''))}
/* 3. paw size */
const pawDots=()=>{const n=5,w=lo(70,(A.W-40)/5);return[...Array(n)].map((_,i)=>({i,x:A.W/2-2.5*w+i*w+4,y:A.H*.14,w:w-8,h:w-8}))};
const actBtns=()=>{const w=lo(170,(A.W-30)/2),h=lo(56,A.H*.12);return[{k:'walk',t:'Walk on thin ice',x:A.W/2-w-5,y:A.H*.84,w,h},{k:'swim',t:'Swim to the floe',x:A.W/2+5,y:A.H*.84,w,h}]};
function drawPaw(){const s=P.p,g=A.ctx;sky();note(`Paw size ${s.size+1} of 5`,A.W/2,A.H*.06,{n:13});
 pawDots().forEach(r=>{const rad=r.w*(.18+.08*r.i);g.fillStyle=r.i===s.size?'#7c3aed':'#64748b';g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,rad,0,TAU);g.fill();g.strokeStyle=r.i===s.size?'#7c3aed':LINE;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h)});
 const y0=A.H*.5;g.fillStyle=ICE;g.fillRect(0,y0,A.W*.55,A.H*.1);g.strokeStyle=LINE;g.lineWidth=1;g.strokeRect(0,y0,A.W*.55,A.H*.1);g.fillStyle=SEA;g.fillRect(A.W*.55,y0,A.W*.45,A.H*.28);
 g.fillStyle=ICE;g.fillRect(A.W*.88,y0-6,A.W*.12,A.H*.08);g.fillStyle=DARK;g.font=ft(big(11));ctr(g);g.fillText('thin ice',A.W*.27,y0+A.H*.05);
 if(s.crack){g.strokeStyle=BAD;g.lineWidth=3;g.beginPath();[[.18,0],[.22,.05],[.2,.1],[.27,.04],[.32,.1]].forEach(([x,y],j)=>j?g.lineTo(A.W*x,y0+A.H*y):g.moveTo(A.W*x,y0+A.H*y));g.stroke()}
 g.font=`${big(34)}px system-ui,sans-serif`;g.fillText('🐻‍❄️',A.W*s.x,y0-big(20));
 if(s.walked)note('✓ across the ice',A.W*.27,A.H*.7,{n:12,ok:1});if(s.swam)note('✓ reached the floe',A.W*.75,A.H*.7,{n:12,ok:1});
 actBtns().forEach(r=>tile(r,'',r.t,{ok:r.k==='walk'?s.walked:s.swam}))}
function setPaw(i){const s=P.p;i=hi(0,lo(4,i));if(i===s.size)return;s.size=i;s.crack=0;s.x=.1;A.sound.tick();say(`Paw size ${i+1}.`)}
function walk(){const s=P.p;if(s.size<3){s.crack=1;s.x=.2;A.sound.miss();return say('Crack! Small paws push all the weight onto a small spot. Try bigger paws.')}
 s.walked=1;s.crack=0;s.x=.45;A.sound.pop();say('Big, wide paws spread the bear\'s weight over more ice, so the thin ice holds.'+(s.swam?'':' Now swim.'))}
function swim(){const s=P.p;if(s.size<4){s.x=.7;A.sound.miss();return say(`Too slow. Paw size ${s.size+1} pushes only a little water. Bigger paws paddle more water.`)}
 s.swam=1;s.x=.92;A.sound.pop();say('The big front paws work like paddles and push lots of water, so the bear reaches the floe.'+(s.walked?'':' Now walk on the thin ice.'))}
/* 4. wait at the breathing hole */
const holes=()=>{const w=lo(110,(A.W-40)/3),h=lo(80,A.H*.16);return[0,1,2].map(i=>({i,x:A.W/2-1.5*w-10+i*(w+10),y:A.H*.42,w,h}))};
const choiceBtns=()=>{const w=lo(170,(A.W-30)/2),h=lo(56,A.H*.12);return[{k:'wait',t:'Wait quietly',x:A.W/2-w-5,y:A.H*.8,w,h},{k:'chase',t:'Jump in and chase',x:A.W/2+5,y:A.H*.8,w,h}]};
function drawHole(){const s=P.o,g=A.ctx;sky();if(s.k>=3){note('3 seals caught',A.W/2,A.H*.1,{ok:1});note('Polar bears wait. Seals swim faster.',A.W/2,A.H*.5,{n:14});return}
 note(`Seal ${s.k+1} of 3: ${s.at==null?'which hole is a seal using?':'now what?'}`,A.W/2,A.H*.06,{n:13});g.fillStyle=ICE;g.fillRect(0,A.H*.3,A.W,A.H*.4);
 holes().forEach(r=>{const cx=r.x+r.w/2,cy=r.y+r.h/2;g.fillStyle=SEA;g.beginPath();g.ellipse(cx,cy,r.w*.36,r.h*.3,0,0,TAU);g.fill();g.strokeStyle=s.bad===r.i?BAD:LINE;g.lineWidth=s.bad===r.i?4:2;g.stroke();
  if(r.i===HOLE[s.k]){g.fillStyle='#fff';[[-.1,-.05],[.06,.02],[0,-.12]].forEach(([dx,dy])=>{g.beginPath();g.arc(cx+dx*r.w,cy+dy*r.h,4,0,TAU);g.fill()})}
  if(s.at===r.i){g.font=`${big(30)}px system-ui,sans-serif`;ctr(g);g.fillText('🐻‍❄️',cx+r.w*.32,r.y-6);if(s.seal){g.fillText('🦭',cx,cy)}}});
 if(s.at!=null)choiceBtns().forEach(r=>tile(r,'',r.t,{}))}
function goHole(i){const s=P.o;if(s.k>=3)return;if(i!==HOLE[s.k]){s.bad=i;A.sound.miss();return say('No seal is using this hole. Look for the bubbles: a seal comes up there to breathe.')}s.at=i;s.bad=null;A.sound.tick();say('The bear is by the hole with bubbles. Wait quietly, or jump in and chase?')}
function act(k){const s=P.o;if(s.at==null||s.k>=3)return;if(k==='chase'){A.sound.miss();s.at=null;return say('Splash! Seals swim faster than polar bears. It got away. Pick the hole again.')}
 s.seal=1;A.sound.pop();const t0=tick;setTimeout(()=>{if(t0!==tick)return;s.k++;s.at=null;s.seal=0;say(`The seal came up to breathe, and the bear caught it.`+(s.k>=3?' 3 caught by waiting.':''))},500);A.redraw()}
/* 5. months with no sea ice */
const months=()=>{const cols=A.narrow?3:6,w=lo(110,(A.W-20-8*(cols-1))/cols),h=lo(70,(A.H*.72-8*(12/cols-1))/(12/cols));return MON.map((m,i)=>({i,x:(A.W-(w*cols+8*(cols-1)))/2+(i%cols)*(w+8),y:A.H*.14+Math.floor(i/cols)*(h+8),w,h}))};
function drawIce(){const s=P.m;sky();note(`No-ice months found: ${s.found.length} of 4`,A.W/2,A.H*.06,{n:13,ok:s.found.length>=4});
 months().forEach(r=>{const o=OPEN.includes(r.i),f=s.found.includes(r.i),seen=f||s.bad===r.i;tile(r,seen?(o?'🌊':'❄️'):'',MON[r.i],{ok:f,bad:s.bad===r.i,bg:seen?(o?'#bfdbfe':'#f0f9ff'):'#fff'})});
 if(s.found.length>=4)note('No ice: the bear waits on land, eating little',A.W/2,A.H*.93,{n:12})}
function month(i){const s=P.m;if(s.found.includes(i)||s.found.length>=4)return;if(!OPEN.includes(i)){s.bad=i;A.sound.miss();return say(`In ${MON[i]} the sea is frozen, so the bear can walk out on the ice and hunt seals.`)}
 s.found.push(i);s.bad=null;A.sound.pop();say(`${MON[i]}: no sea ice. The bear cannot reach the seals.`+(s.found.length>=4?' For about 4 months it waits on land and lives off its fat.':''))}
function draw(){const k=now();if(k==='chal'){sky();note('Challenge',A.W/2,A.H*.16,{ok:1});note('Far north, blubber, big paws, patience, sea ice',A.W/2,A.H*.5,{n:13});return}
 ({home:drawHome,glove:drawGlove,paw:drawPaw,hole:drawHole,ice:drawIce})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='home'){const r=homeCards().find(r=>has(p,r)&&P.h.at[r.i]==null);if(r){P.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='glove'){const r=gloveCards().find(r=>has(p,r));if(r){pickGlove(r.i);return false}if(P.g.pick!=null&&p.y<A.H*.5){P.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(has(p,tank()))dip();return false}
 if(k==='paw'){const r=pawDots().find(r=>has(p,r));if(r){setPaw(r.i);P.drag={paw:1};return true}const b=actBtns().find(r=>has(p,r));if(b)(b.k==='walk'?walk:swim)();return false}
 if(k==='hole'){const b=P.o.at!=null&&choiceBtns().find(r=>has(p,r));if(b){act(b.k);return false}const r=holes().find(r=>has(p,r));if(r)goHole(r.i);return false}
 if(k==='ice'){const r=months().find(r=>has(p,r));if(r)month(r.i)}return false}
function move(p){const d=P.drag;if(!d)return;if(d.paw){const r=pawDots().find(r=>p.x>=r.x-4&&p.x<=r.x+r.w+4);if(r)setPaw(r.i);return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=P.drag;if(!d)return;P.drag=null;if(d.paw)return;const k=now(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='home'){const j=bands().findIndex(b=>has(p,b));if(j>=0)send(d.i,j);else A.redraw();return}
 if(k==='glove'){if(has(p,tank()))dip();else A.redraw()}}
function fresh(){tick++;for(const k in P)delete P[k];Object.assign(P,{h:{at:[null,null,null],bad:null},g:{pick:null,dip:0,res:[null,null,null,null]},p:{size:0,crack:0,x:.1,walked:0,swam:0},o:{k:0,at:null,bad:null,seal:0},m:{found:[],bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();P.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);P.hook=watch(i,ok,msg)}
function run(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function pads(){if(!box)return;box.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},box,t).onclick=f};
 if(k==='home')HOME.forEach((v,i)=>{if(P.h.at[i]==null){B(`${v[0]} ${v[1]}: north`,()=>send(i,0),`${v[1]}: far north`);B(`${v[0]} ${v[1]}: south`,()=>send(i,1),`${v[1]}: far south`)}});
 if(k==='glove'){GLOVE.forEach((v,i)=>B(`${v[0]} ${v[1]}`,()=>pickGlove(i),`Choose ${v[1]}`));if(P.g.pick!=null)B('Dip in the icy water',dip)}
 if(k==='paw'){[0,1,2,3,4].forEach(i=>B(`Paw ${i+1}`,()=>setPaw(i),`Paw size ${i+1} of 5`));B('Walk on thin ice',walk);B('Swim to the floe',swim)}
 if(k==='hole'&&P.o.k<3){if(P.o.at==null)[0,1,2].forEach(i=>B(`Hole ${i+1}${i===HOLE[P.o.k]?' (bubbles)':''}`,()=>goHole(i)));else{B('Wait quietly',()=>act('wait'));B('Jump in and chase',()=>act('chase'))}}
 if(k==='ice'&&P.m.found.length<4)MON.forEach((m,i)=>{if(!P.m.found.includes(i))B(m,()=>month(i),`${m}: no sea ice?`)})}
const steps=[
{h:'Where do they live?',p:'The Arctic is the far north. The Antarctic is the far south. Drag each animal to its home.',
 predict:{q:'Do polar bears and penguins live in the same place?',opts:['Yes, both live where it is icy','No: bears in the north, penguins in the south'],ans:1},task:'Put all 3 animals in their homes',
 show:()=>run(0,[()=>send(0,0),()=>send(1,1),()=>send(2,0)],650),
 go:()=>open(0,'The Arctic at the top, the Antarctic at the bottom. Three animals: polar bear, penguin, Arctic fox.',()=>P.h.at.every(b=>b!=null),'Polar bears live only in the Arctic. Penguins live in the south.')},
{h:'The blubber glove',p:'Pick a glove. Drag the hand into the icy water and see how long it stays warm. Test all 4.',
 predict:{q:'Which keeps a hand warm longest in icy water?',opts:['Thick fur','A thick layer of fat'],ans:1},task:'Test all 4 gloves',
 show:()=>run(1,[0,1,2,3].flatMap(i=>[()=>pickGlove(i),()=>dip()]),450),
 go:()=>open(1,'Four gloves: bare hand, wet fur, blubber, fur plus blubber. A tank of icy water.',()=>P.g.res.every(x=>x!=null),'Blubber is a thick layer of fat under the skin. It keeps the bear warm in icy water.')},
{h:'Big paws',p:'Pick a paw size. Then walk on the thin ice and swim to the ice floe.',
 predict:{q:'Which feet are better on thin ice?',opts:['Small, light feet','Big, wide feet'],ans:1},task:'Cross the thin ice and reach the floe',
 show:()=>run(2,[()=>setPaw(4),()=>walk(),()=>swim()],700),
 go:()=>open(2,'A polar bear by thin ice, then open sea and an ice floe. Five paw sizes to choose from.',()=>P.p.walked&&P.p.swam,'Big paws spread the weight on thin ice and paddle in the sea.')},
{h:'Wait at the hole',p:'Seals come up to breathe at holes in the ice. Find the hole with bubbles.',
 predict:{q:'How does a polar bear catch most seals?',opts:['It chases them in the water','It waits by a hole in the ice'],ans:1},task:'Catch 3 seals',
 show:()=>run(3,HOLE.flatMap(h=>[()=>goHole(h),()=>act('wait')]),700),
 go:()=>open(3,'Sea ice with three holes. One hole has bubbles.',()=>P.o.k>=3,'Polar bears wait very still by a breathing hole. Seals are faster swimmers.')},
{h:'No ice, no seals',p:'Polar bears hunt on the sea ice. Tap the months when there is no sea ice on this bay.',task:'Find all 4 months with no ice',
 show:()=>run(4,OPEN.map(i=>()=>month(i)),600),
 go:()=>open(4,'Twelve months of the year on a bay in Canada. Tap the months with no sea ice.',()=>P.m.found.length>=4,'With no ice, the bear cannot reach seals, so it waits on land and lives off its fat.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.hook()});
const QS=[
 {q:'Where do polar bears live?',a:'In the Arctic, the far north',o:[['In the Antarctic, with penguins','south'],['In hot forests','any']]},
 {q:'What keeps a polar bear warm when it swims?',a:'A thick layer of fat called blubber',o:[['Its fur, even when wet','fur'],['Swimming very fast','any']]},
 {q:'How does a polar bear catch most seals?',a:'It waits by a breathing hole',o:[['It chases them under the water','chase'],['It digs in the snow','any']]},
 {q:'Why do big paws help on thin ice?',a:'They spread the bear\'s weight',o:[['They make the bear lighter','light'],['They are very sharp','any']]},
 {q:'What does a polar bear do when the sea ice melts?',a:'It waits on land and eats very little',o:[['It hunts seals in the open sea','ice'],['It swims to the South Pole','south']]},
 {q:'What colour is a polar bear\'s skin?',a:'Black',o:[['White','skin'],['Pink','skin']]}];
function why(t){let m='Think about where polar bears live and how they stay warm and find food.';
 if(t==='south')m='Polar bears live only in the far north, the Arctic. Penguins live in the south.';
 if(t==='fur')m='Wet fur keeps out much less cold. In the water, the thick fat layer, blubber, keeps the bear warm.';
 if(t==='chase')m='Seals swim faster than polar bears. The bear waits by a breathing hole until a seal comes up.';
 if(t==='light')m='Big paws do not make the bear lighter. They spread the same weight over more ice.';
 if(t==='ice')m='Polar bears catch seals from the sea ice. With no ice, they cannot reach them, so they wait on land.';
 if(t==='skin')m='The fur looks white, but the skin under it is black.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;box.hidden=B.step===5;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Polar bear buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
