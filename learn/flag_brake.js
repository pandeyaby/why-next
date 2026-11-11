/* Flagship – stopping distances (ages 14–16; GCSE Physics forces: stopping distance = thinking distance + braking
   distance, factors affecting each, braking distance rising with the square of speed). Time your own reaction and turn
   it into a thinking distance; read the Highway Code chart by speed; sort tiredness, phones, wet roads and worn tyres
   into thinking or braking; drive at the fastest speed that still stops before a hazard on dry, wet and tired runs; and
   see why doubling speed makes braking distance four times longer. Every canvas tap has a button twin; the canvas
   label always says what happened. Not flagkemv (kinetic energy and mass) or flagfrict (friction on surfaces, ages 7–8). */
(()=>{
const MPH=[20,30,40,50,60,70],TH=[6,9,12,15,18,21],BR=[6,14,24,38,55,75];
const HUNT=[['the speed with a 53 m stopping distance',3,i=>`At ${MPH[i]} mph the stopping distance is ${TH[i]+BR[i]} m. Add thinking and braking: 53 m is 15 + 38.`],
 ['the speed whose braking distance is about 4 times the 30 mph one',4,i=>i===2?'40 mph is only 4/3 of the speed, so braking is 24 m, under 2 times 14 m. Try double the speed.':`At ${MPH[i]} mph braking is ${BR[i]} m, ${(BR[i]/14).toFixed(1)} times 14 m. Doubling speed makes it about 4 times.`],
 ['the speed where thinking and braking distances are equal',0,i=>`At ${MPH[i]} mph thinking is ${TH[i]} m but braking is ${BR[i]} m. Braking grows faster, so go slower.`]];
const FAC=[['A tired driver',0,'Tiredness slows your reaction, so the car travels further before you brake: thinking distance.'],['A wet road',1,'Water cuts the grip between tyres and road, so braking takes longer: braking distance.'],
 ['Talking on a phone',0,'A distraction delays your reaction: thinking distance. It does not change the brakes.'],['Worn tyres',1,'Worn tread grips less, so the car slides further once braking starts: braking distance.'],
 ['Driving faster',2,'More speed means more metres each second you are reacting, and much more energy to remove: both.'],['A heavy load in the car',1,'More mass means more kinetic energy for the brakes to remove: braking distance.']];
const ROADS=[['Dry road, alert driver',1,1,2],['Wet road: braking ×2',1,2,1],['Dry road, tired driver: thinking ×2',2,1,1]],GAP=40;
const SQ=[['At 20 mph a car brakes in 6 m. At 40 mph?',[['24 m',1],['12 m','lin'],['18 m','add']],2],['At 20 mph a car brakes in 6 m. At 60 mph?',[['54 m',1],['18 m','lin'],['36 m','sq2']],3],
 ['60 → 30 mph: braking distance…',[['falls to ¼',1],['falls to ½','lin'],['is unchanged','same']],.5]];
const SWHY={lin:'Braking distance grows with speed squared, not in step with speed.',add:'Doubling speed does not just add a bit: 2² = 4, so 4 × 6 = 24 m.',sq2:'Three times the speed: 3² = 9, so 9 × 6 = 54 m.',same:'Less speed means less kinetic energy, so less braking distance: (½)² = ¼.'};
VIS.reg('flagbrake',c=>{let A,ctl,quiz,qk=-1,tok=0,timer=0;
const init0=()=>({want:()=>{},won:0,i:1,j:0,bad:-1,lock:0,phase:'idle',t0:0,times:[],car:0,res:''}),S=init0();
const stage=()=>['react','chart','sort','road','sq','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function lab(g,t,x,y,n,wt,al,col){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function tile(g,r,warn){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:C.tx;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* road strip shared by react and road steps */
const RX=m=>A.W*.08+m/60*A.W*.86;
function road(g,y,carM,stopAt){const C=A.col;g.fillStyle=C.dark?'#334155':'#cbd5e1';g.fillRect(0,y-24,A.W,48);g.strokeStyle=C.dark?'#f8fafc':'#1e293b';g.setLineDash([14,10]);g.lineWidth=2;g.beginPath();g.moveTo(0,y);g.lineTo(A.W,y);g.stroke();g.setLineDash([]);
 [0,10,20,30,40,50,60].forEach(m=>{g.fillStyle=C.tx;g.fillRect(RX(m)-1,y+24,2,6);lab(g,m+' m',RX(m),y+40,10,700)});
 if(stopAt!=null){g.fillStyle=C.rd;g.fillRect(RX(stopAt)-3,y-34,6,68);lab(g,'Hazard',RX(stopAt),y-46,11,900)}
 const x=RX(Math.min(62,carM));g.fillStyle=C.ac;A.paint.rrect(x-30,y-14,30,22,5);g.fill();g.fillStyle=C.tx;[x-24,x-7].forEach(w=>{g.beginPath();g.arc(w,y+9,4,0,7);g.fill()})}
/* 1 reaction test */
function startTest(){if(stage()!=='react'||S.won>=3||S.phase!=='idle')return;S.phase='wait';const d=S.demo?500:800+Math.random()*900;say('Wait for the red light, then tap Brake.');A.redraw();keys();
 clearTimeout(timer);timer=setTimeout(()=>{S.phase='red';S.t0=performance.now();A.sound.tick();say('RED! Brake now.');keys();A.redraw()},d)}
function brake(fake){if(stage()!=='react'||S.won>=3)return;if(fake){clearTimeout(timer);S.phase='red'}if(S.phase==='idle')return startTest();if(S.phase==='wait'){clearTimeout(timer);S.phase='idle';keys();return miss('Too soon: you braked before the light turned red. Tap Start and wait.',-1)}
 const t=fake||Math.min(2.5,(performance.now()-S.t0)/1000);S.times.push(t);S.won++;S.phase='idle';A.sound.pop();
 say(`Reaction time ${t.toFixed(2)} s. At 30 mph (13.4 m/s) the car travels ${(13.4*t).toFixed(1)} m before you even touch the brake.`);keys();A.redraw();S.want()}
function drawReact(g){const C=A.col,ph=S.phase,t=S.times[S.times.length-1];lab(g,`Tests done: ${S.times.length} of 3`,A.W/2,A.H*.07,13,900);
 const lx=A.W/2,ly=A.H*.25;g.fillStyle=C.dark?'#0f172a':'#1e293b';A.paint.rrect(lx-34,ly-50,68,100,12);g.fill();
 [['#dc2626',-25,ph==='red'],['#16a34a',25,ph==='wait']].forEach(([col,dy,on])=>{g.fillStyle=on?col:A.alpha(col,.25);g.beginPath();g.arc(lx,ly+dy,18,0,7);g.fill()});
 road(g,A.H*.62,t?13.4*t:0);if(t){g.fillStyle=A.alpha(C.cy,.35);g.fillRect(RX(0),A.H*.62-24,RX(13.4*t)-RX(0),48);lab(g,`Thinking distance at 30 mph: ${(13.4*t).toFixed(1)} m`,A.W/2,A.H*.86,13,900)}
 if(S.times.length)lab(g,'Your times: '+S.times.map(x=>x.toFixed(2)+' s').join(', '),A.W/2,A.H*.94,11,800)}
/* 2 chart */
function setI(i){if(stage()!=='chart')return;i=Math.max(0,Math.min(5,i));if(i===S.i)return;S.i=i;A.sound.tick();say(`${MPH[i]} mph: thinking ${TH[i]} m + braking ${BR[i]} m = ${TH[i]+BR[i]} m.`);keys();A.redraw()}
function checkI(){if(stage()!=='chart'||S.won>=3||S.lock)return;const[q,ans,bad]=HUNT[S.j];if(S.i!==ans)return miss(bad(S.i),-1);
 S.won++;A.sound.pop();say(`Yes: ${MPH[ans]} mph is ${q}.`);if(S.won<3){S.lock=1;later(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
const BX=m=>A.W*.2+m/100*A.W*.74,rowY=i=>A.H*.12+i*A.H*.11;
function drawChart(g){const C=A.col;MPH.forEach((v,i)=>{const y=rowY(i),h=A.H*.07,on=i===S.i;lab(g,v+' mph',A.W*.18,y+h/2,12,on?900:700,'right');
  g.fillStyle=A.alpha(C.cy,on?.9:.4);g.fillRect(BX(0),y,BX(TH[i])-BX(0),h);g.fillStyle=A.alpha(C.or,on?.9:.4);g.fillRect(BX(TH[i]),y,BX(TH[i]+BR[i])-BX(TH[i]),h);
  if(on){g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(BX(0),y,BX(TH[i]+BR[i])-BX(0),h)}lab(g,(TH[i]+BR[i])+' m',Math.min(A.W-22,BX(TH[i]+BR[i])+20),y+h/2,11,800)});
 lab(g,`${MPH[S.i]} mph: ${TH[S.i]} m thinking + ${BR[S.i]} m braking`,A.W/2,A.H*.8,13,900);lab(g,S.won<3?`Find ${HUNT[S.j][0]}`:'All three found.',A.W/2,A.H*.9,12,800);
 g.fillStyle=A.alpha(C.cy,.9);g.fillRect(A.W*.2,A.H*.03,12,12);lab(g,'thinking',A.W*.2+16,A.H*.03+6,10,800,'left');g.fillStyle=A.alpha(C.or,.9);g.fillRect(A.W*.5,A.H*.03,12,12);lab(g,'braking',A.W*.5+16,A.H*.03+6,10,800,'left')}
/* 3 sort factors */
const bin=k=>{const w=(A.W-36)/3;return{x:8+k*(w+10),y:A.H*.56,w,h:A.H*.3}},BINS=['Thinking','Braking','Both'];
function sortF(k){if(stage()!=='sort'||S.won>=6||S.lock)return;const[t,want,why]=FAC[S.j];if(k!==want)return miss(`${t}: ${why}`,k);
 S.won++;A.sound.pop();say(`Right. ${why}`);if(S.won<6){S.lock=1;later(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:450)}keys();A.redraw();S.want()}
function drawSort(g){const C=A.col,w=Math.min(A.W-30,440);tile(g,{x:(A.W-w)/2,y:A.H*.1,w,h:A.H*.28});lab(g,FAC[Math.min(S.j,5)][0],A.W/2,A.H*.24,20,900);lab(g,`${Math.min(S.won,6)} of 6`,A.W/2,A.H*.47,12,800);
 BINS.forEach((t,k)=>{const z=bin(k);g.fillStyle=A.alpha([C.cy,C.or,C.vi][k],.16);A.paint.rrect(z.x,z.y,z.w,z.h,10);g.fill();g.strokeStyle=S.bad===k?C.rd:C.tx;g.lineWidth=S.bad===k?5:2;g.stroke();lab(g,t,z.x+z.w/2,z.y+z.h/2,A.narrow?13:15,900)})}
/* 4 hazard runs */
const stopOf=i=>{const[,tm,bm]=ROADS[S.j];return TH[i]*tm+BR[i]*bm};
function setRoadI(i){if(stage()!=='road')return;S.i=Math.max(0,Math.min(5,i));S.car=0;S.res='';A.sound.tick();say(`${MPH[S.i]} mph chosen on: ${ROADS[S.j][0]}.`);keys();A.redraw()}
function drive(){if(stage()!=='road'||S.won>=3||S.lock)return;const i=S.i,d=stopOf(i),best=ROADS[S.j][3];S.car=0;A.tween(S,{car:Math.min(62,d)},700,'out');
 if(d>GAP){S.res=`Stopped at ${d} m: ${d-GAP} m past the hazard.`;return miss(`${MPH[i]} mph needs ${d} m on this road, more than the ${GAP} m gap. Go slower.`,-1)}
 if(i<best){S.res=`Stopped at ${d} m. Safe.`;return miss(`Safe at ${d} m, but ${MPH[i+1]} mph also stops in time here. Find the fastest safe speed.`,-1)}
 S.won++;S.res=`Stopped at ${d} m, before the hazard.`;A.sound.pop();say(`${MPH[i]} mph: ${d} m. The fastest safe speed on ${ROADS[S.j][0].toLowerCase()}.`);
 if(S.won<3){S.lock=1;later(()=>{S.lock=0;S.j++;S.i=1;S.car=0;S.res='';keys();A.redraw()},rm()?10:600)}keys();A.redraw();S.want()}
function drawRoad(g){const C=A.col,r=ROADS[Math.min(S.j,2)];lab(g,`Run ${Math.min(S.j+1,3)} of 3: ${r[0]}`,A.W/2,A.H*.08,13,900);lab(g,`Speed: ${MPH[S.i]} mph`,A.W/2,A.H*.2,18,900);
 road(g,A.H*.5,S.car,GAP);if(S.res)lab(g,S.res,A.W/2,A.H*.78,13,900);lab(g,`Stop within ${GAP} m`,A.W/2,A.H*.9,12,800)}
/* 5 speed squared */
const opt=k=>{const w=(A.W-36)/3;return{x:8+k*(w+10),y:A.H*.66,w,h:A.H*.2}};
function pickSq(k){if(stage()!=='sq'||S.won>=3||S.lock)return;const[q,ops,f]=SQ[S.j],o=ops[(k+S.j)%3];if(o[1]!==1)return miss(SWHY[o[1]],k);
 S.won++;A.sound.pop();say(`Yes: ${o[0]}. ${f}× the speed gives ${f*f}× the kinetic energy, so ${f*f}× the braking distance.`);if(S.won<3){S.lock=1;later(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:550)}keys();A.redraw();S.want()}
function drawSq(g){const C=A.col,[q,ops,f]=SQ[Math.min(S.j,2)],n=f<1?2:f,u=Math.min(A.H*.1,A.W*.1),ox=A.W/2-n*u/2;lab(g,q,A.W/2,A.H*.07,14,900);
 for(let a=0;a<n;a++)for(let b=0;b<n;b++){const sm=f<1?(a<1&&b<1):1;g.fillStyle=A.alpha(C.or,sm?.7:.12);g.fillRect(ox+a*u,A.H*.16+b*u,u-3,u-3)}
 lab(g,f<1?'Kinetic energy: 1 square of 4':`Kinetic energy: ${n*n} × the 20 mph energy`,A.W/2,A.H*.16+n*u+14,11,800);
 ops.forEach((o,k)=>{const z=opt(k),oo=ops[(k+S.j)%3];tile(g,z,S.bad===k);lab(g,oo[0],z.x+z.w/2,z.y+z.h/2,A.narrow?13:16,900)})}
/* shared */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.25);g.fillRect(0,0,W,H);
 if(v==='quiz'){lab(g,'Stopping = thinking + braking',W/2,H*.36,18,900);lab(g,'2 × speed → 4 × braking distance',W/2,H*.58,15,800);return}
 ({react:drawReact,chart:drawChart,sort:drawSort,road:drawRoad,sq:drawSq})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='react'&&S.won<3)B(S.phase==='idle'?'Start test':'Brake!',()=>brake());
 if(v==='chart'){B('◀ Slower',()=>setI(S.i-1),'Slower');B('Faster ▶',()=>setI(S.i+1),'Faster');if(S.won<3)B('Check this speed',checkI)}
 if(v==='sort'&&S.won<6)BINS.forEach((t,k)=>B(t,()=>sortF(k)));
 if(v==='road'&&S.won<3){B('◀ Slower',()=>setRoadI(S.i-1),'Slower');B('Faster ▶',()=>setRoadI(S.i+1),'Faster');B('Drive',drive)}
 if(v==='sq'&&S.won<3)[0,1,2].forEach(k=>B(SQ[S.j][1][(k+S.j)%3][0],()=>pickSq(k)))}
function down(p){const v=stage();if(v==='react'){brake();return false}
 if(v==='chart'){const i=MPH.findIndex((_,i)=>p.y>rowY(i)-4&&p.y<rowY(i)+A.H*.1);if(i>=0)setI(i);return false}
 if(v==='road'){if(p.y<A.H*.32)drive();else setRoadI(Math.round((p.x/A.W)*5));return false}
 if(v==='sort'){const k=[0,1,2].find(k=>inside(p,bin(k)));if(k!=null)sortF(k)}if(v==='sq'){const k=[0,1,2].find(k=>inside(p,opt(k)));if(k!=null)pickSq(k)}return false}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fn,ms)=>{const k=tok;setTimeout(()=>{if(k===tok)fn()},ms)};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;clearTimeout(timer);Object.assign(S,init0())};
const steps=[
{h:'Your reaction time',p:'Tap Start, wait for the red light, then tap Brake (or tap the picture) as fast as you can. While you react, the car keeps moving at full speed.',task:'Do 3 reaction tests',
 show:()=>{steps[0].go();S.demo=1;demo([()=>startTest(),()=>brake(.62),()=>startTest(),()=>brake(.71),()=>startTest(),()=>brake(.66)],560)},go:()=>{clear();say('Tap Start test.');keys();S.want=ready(0,()=>S.won>=3,'Thinking distance = speed × reaction time.')}},
{h:'Read the chart',p:'Stopping distance = thinking distance + braking distance. These are the Highway Code’s typical figures for a car. Pick a speed, then check it.',
 predict:{q:'Speed doubles from 30 mph to 60 mph. The braking distance…',opts:['doubles','becomes about 4 times longer','stays the same'],ans:1},task:'Find 3 speeds',
 show:()=>{steps[1].go();demo([()=>setI(3),checkI,()=>setI(4),checkI,()=>setI(0),checkI],420)},go:()=>{clear();say('30 mph: thinking 9 m + braking 14 m = 23 m.');keys();S.want=ready(1,()=>S.won>=3,'Thinking distance grows in step with speed; braking distance grows much faster.')}},
{h:'Thinking or braking?',p:'Some things slow the driver. Others make the car harder to stop. Tap where each one belongs.',
 predict:{q:'A driver is tired. Which part of the stopping distance gets longer?',opts:['Thinking distance','Braking distance','Neither'],ans:0},task:'Sort 6 factors',
 show:()=>{steps[2].go();demo(FAC.map(()=>()=>sortF(FAC[S.j][1])),560)},go:()=>{clear();say(FAC[0][0]+'. Thinking, braking or both?');keys();S.want=ready(2,()=>S.won>=6,'The driver affects thinking distance; the car and road affect braking distance.')}},
{h:'Stop in time',p:'A hazard is 40 m ahead. Choose the fastest speed that still stops in time, then tap Drive.',task:'Pass 3 runs',
 show:()=>{steps[3].go();demo([()=>setRoadI(2),drive,()=>setRoadI(1),drive,()=>setRoadI(1),drive],620)},go:()=>{clear();say('Dry road, alert driver. Choose a speed and drive.');keys();S.want=ready(3,()=>S.won>=3,'Wet roads stretch braking; tiredness stretches thinking.')}},
{h:'Why speed hurts most',p:'The brakes must remove all the kinetic energy, ½mv². Double the speed and there is 4 times the energy, so with the same braking force the car needs 4 times the distance.',
 predict:{q:'Same car, same brakes, twice the speed. The kinetic energy is…',opts:['twice as big','4 times as big','the same'],ans:1},task:'Answer 3 speed questions',
 show:()=>{steps[4].go();demo([0,1,2].map(()=>()=>pickSq([0,1,2].find(k=>SQ[S.j][1][(k+S.j)%3][1]===1))),650)},go:()=>{clear();say(SQ[0][0]);keys();S.want=ready(4,()=>S.won>=3,'Braking distance ∝ speed²: 2× speed, 4× distance; 3× speed, 9×.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['A driver has been drinking alcohol. Which distance gets longer?',[['Thinking distance','ok'],['Braking distance','brk'],['Neither, if they drive slowly','neither']]],
 ['A car’s braking distance at 30 mph is 14 m. Roughly what is it at 60 mph?',[['56 m','ok'],['28 m','lin'],['14 m','same']]],
 ['The road is icy. Which part of the stopping distance gets longer?',[['Braking distance','ok'],['Thinking distance','thk'],['Both equally','both']]],
 ['A car at 20 m/s has a driver with a 0.7 s reaction time. Thinking distance?',[['14 m','ok'],['28.6 m','div'],['20.7 m','addt']]],
 ['Why does braking distance rise faster than speed?',[['Kinetic energy depends on speed squared','ok'],['Brakes get weaker at speed','weak'],['The driver reacts more slowly','thk2']]]];
function why(t){let m='Stopping distance = thinking distance + braking distance.';
 if(t==='brk')m='Alcohol slows the driver’s reactions, so the car travels further before braking starts: thinking distance.';if(t==='neither')m='Slower speed shortens both parts, but alcohol still lengthens the reaction.';
 if(t==='lin')m='Braking distance goes with speed squared: 2× speed gives 4× distance, about 56 m.';if(t==='same')m='More speed means more kinetic energy to remove, so a longer braking distance.';
 if(t==='thk')m='Ice does not change how fast the driver reacts. It cuts friction, so braking distance grows.';if(t==='both')m='Thinking distance depends on the driver and speed, not the road surface.';
 if(t==='div')m='Thinking distance = speed × reaction time = 20 × 0.7 = 14 m, not 20 ÷ 0.7.';if(t==='addt')m='Multiply, do not add: 20 m/s for 0.7 s covers 14 m.';
 if(t==='weak')m='The braking force can stay the same; it is the ½mv² energy that grows with speed squared.';if(t==='thk2')m='Reaction time is about the same at any speed. The square comes from kinetic energy.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down});keys()}});
c.stops.push(()=>clearTimeout(timer));A.start()})})();
