/* Flagship – active, dormant and extinct volcanoes (ages 7–9; KS2 Geography physical features, BBC Bitesize and USGS
   definitions). Scenes: sort clue cards into active, dormant and extinct; watch Mount Pinatubo wake in 1991 and log
   each warning sign; slide a plate over a hot spot so volcanoes lose their magma; judge a robot's claims; look under
   three hills that look the same. Data in learn/volcst_art.js. */
(()=>{const {CARDS,BINS,SIGNS,SIGNK,ROBOT,HILLS,DESC,DONE,QS}=VST;
VIS.reg('flagvolcst',c=>{let A,row,ask,qn=-1,epoch=0;const V={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',BAD='#b91c1c',EDGE='#475569',LAVA='#dc2626',ROCK='#78716c',GRASS='#4d7c0f',MAG='#f97316',F='px system-ui,sans-serif';
const TONE=['#fee2e2','#fef3c7','#dcfce7'];
const part=()=>['sort','wake','plate','robot','hills','quiz'][A.step];
const px=v=>A.narrow?v:Math.round(v*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function word(t,x,y,v,col,w){const g=A.ctx;g.font=`${w||800} ${px(v)}${F}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const L=String(t).split('\n');L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*px(v)*1.2))}
function note(t,y,o){o=o||{};const g=A.ctx;let v=px(o.v||13);g.font=`800 ${v}${F}`;let w=g.measureText(t).width+22;
 while(w>A.W-8&&v>10){v--;g.font=`800 ${v}${F}`;w=g.measureText(t).width+22}
 const h=v+14,x0=Math.max(4,(A.W-w)/2);g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?OK:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function slab(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||(o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#ede9fe':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?BAD:o.ok?OK:o.on?'#6d28d9':EDGE;g.stroke()}
/* a volcano drawn by state: 0 active (lava and smoke), 1 dormant (steep cone, quiet crater), 2 extinct (worn, grassy) */
function cone(x,base,w,h,k,extra){const g=A.ctx;h=k===2?h*.6:h;g.fillStyle=k===2?GRASS:ROCK;g.beginPath();g.moveTo(x-w/2,base);
 if(k===2){g.quadraticCurveTo(x-w*.2,base-h*1.1,x,base-h);g.quadraticCurveTo(x+w*.2,base-h*1.1,x+w/2,base)}else{g.lineTo(x-w*.1,base-h);g.lineTo(x+w*.1,base-h);g.lineTo(x+w/2,base)}
 g.closePath();g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 if(k===0){g.fillStyle=LAVA;g.beginPath();g.moveTo(x-w*.1,base-h);g.lineTo(x+w*.1,base-h);g.lineTo(x+w*.04,base-h*.45);g.lineTo(x-w*.06,base-h*.6);g.closePath();g.fill();
  g.fillStyle='#94a3b8';[0,1,2].forEach(i=>{g.beginPath();g.arc(x+(i-1)*w*.07,base-h-12-i*10,8+i*3,0,7);g.fill()})}
 if(extra==='quake'){g.strokeStyle=BAD;g.lineWidth=3;[-1,1].forEach(e=>{g.beginPath();for(let i=0;i<4;i++){g.lineTo(x+e*(w/2+8+(i%2)*8),base-h*.2-i*10)}g.stroke()})}
 if(extra==='gas'){g.fillStyle='#fde047';[0,1,2,3].forEach(i=>{g.beginPath();g.arc(x+(i-1.5)*14,base-h-14-(i%2)*10,10,0,7);g.fill();g.strokeStyle='#854d0e';g.lineWidth=1;g.stroke()})}
 if(extra==='dome'){g.fillStyle=LAVA;g.beginPath();g.arc(x,base-h,w*.09,Math.PI,0);g.fill();g.strokeStyle=INK;g.stroke()}}
/* ---- scene 1: sort clue cards ---- */
const cardR=()=>{const w=(A.W-24)/3,h=Math.min(A.H*.15,62);return CARDS.map((C,i)=>({i,x:6+(i%3)*(w+6),y:A.H*.1+Math.floor(i/3)*(h+8),w,h}))};
const binR=()=>{const w=(A.W-24)/3,h=Math.min(A.H*.3,120);return BINS.map((b,k)=>({k,x:6+k*(w+6),y:A.H*.62,w,h}))};
function drawSort(){const s=V.sort;sky();
 binR().forEach(r=>{slab(r,{fill:TONE[r.k],on:s.hot===r.k,no:s.bad===r.k});word(BINS[r.k],r.x+r.w/2,r.y+16,13,INK,900);
  const inside=CARDS.map((C,i)=>i).filter(i=>s.put[i]===r.k);word(inside.length?'✓ '+inside.length:'',r.x+r.w/2,r.y+r.h*.6,15,OK,900)});
 cardR().forEach(r=>{if(s.put[r.i]!=null)return;const d=s.drag&&s.drag.i===r.i,R=d?{...r,x:s.drag.x-r.w/2,y:s.drag.y-r.h/2}:r;
  slab(R,{on:s.pick===r.i||d});word(CARDS[r.i].t,R.x+R.w/2,R.y+R.h/2,10,INK,800)});
 if(Object.keys(s.put).length===CARDS.length)note('All 6 sorted',A.H*.5,{ok:1})}
function place(i,k){const s=V.sort;if(s.put[i]!=null)return;const C=CARDS[i];s.pick=null;
 if(k!==C.k){s.bad=k;A.sound.miss();return tell(k===2?'Extinct means no magma left. This clue still has magma or activity.':k===0&&C.k===1?'Active means erupting or showing signs now. This one is quiet, but it could wake.':'Look again: is there magma or activity right now?')}
 s.bad=-1;s.put[i]=k;A.sound.pop();tell(`${C.t.replace('\n',' ')}: ${BINS[k]}. `+(Object.keys(s.put).length<CARDS.length?`${CARDS.length-Object.keys(s.put).length} to go.`:''))}
/* ---- scene 2: Pinatubo wakes ---- */
const signR=()=>{const w=(A.W-24)/3,h=Math.min(A.H*.15,58);return SIGNK.map(([k,t],j)=>({k,t,x:6+j*(w+6),y:A.H*.82,w,h}))};
const nextR=()=>({x:A.W*.62,y:A.H*.3,w:Math.min(160,A.W*.34),h:Math.min(56,A.H*.14)});
function drawWake(){const s=V.wake,base=A.H*.7,x=A.W*.32;sky();
 if(s.m===0)note('Early 1991: quiet for about 500 years',A.H*.08);
 else if(s.m<=SIGNS.length)note(SIGNS[s.m-1].when+': what changed?',A.H*.08);else note('15 June 1991: a huge eruption',A.H*.08,{ok:1});
 cone(x,base,A.W*.5,A.H*.42,s.m>SIGNS.length?0:1,s.m>0&&s.m<=SIGNS.length?SIGNS[s.m-1].k:null);
 note(`Signs logged: ${s.log.length} of 3`,A.H*.19,{v:12});
 if(s.m<=SIGNS.length){const r=nextR();slab(r);word('Next month →',r.x+r.w/2,r.y+r.h/2+1,13,INK,900);signR().forEach(r=>{slab(r,{no:s.bad===r.k,ok:s.log.includes(r.k)});word(r.t,r.x+r.w/2,r.y+r.h/2+1,13,INK,900)})}
 else if(!s.named)['Dormant','Extinct'].forEach((t,j)=>{const w=(A.W-30)/2,r={x:10+j*(w+10),y:A.H*.82,w,h:Math.min(A.H*.15,58)};slab(r,{no:s.bad===t});word(`Before: ${t}`,r.x+r.w/2,r.y+r.h/2+1,13,INK,900)})}
function month(){const s=V.wake;if(s.m>SIGNS.length)return;if(s.m>0&&s.log.length<s.m){s.bad='';A.sound.miss();return tell('Tap the warning sign you can see first.')}
 s.m++;A.sound.tick();tell(s.m<=SIGNS.length?`${SIGNS[s.m-1].when}. ${SIGNS[s.m-1].say}`:'15 June 1991: Pinatubo erupts. Before this, was it dormant or extinct?')}
function sign(k){const s=V.wake;if(s.m===0||s.m>SIGNS.length)return tell('Tap Next month to watch.');const S=SIGNS[s.m-1];if(s.log.includes(k))return tell('Already logged.');
 if(s.log.length>=s.m)return tell('Logged. Tap Next month.');
 if(k!==S.k){s.bad=k;A.sound.miss();return tell(`Look again. ${S.say}`)}s.bad='';s.log.push(k);A.sound.pop();tell(`Logged: ${SIGNK.find(q=>q[0]===k)[1]}. Magma is on the move.`)}
function name(t){const s=V.wake;if(s.m<=SIGNS.length||s.named)return;
 if(t!=='Dormant'){s.bad=t;A.sound.miss();return tell('Extinct volcanoes never erupt again. Pinatubo did, so it was only asleep: dormant.')}
 s.named=true;A.sound.pop();tell('Yes: dormant. It slept about 500 years, then woke. Now it counts as active.')}
/* ---- scene 3: plate over a hot spot ---- */
const GAP=()=>Math.min(A.W*.22,100),SPOT=()=>A.W*.82;
function vx(i){const s=V.plate;return SPOT()-(s.step-i)*GAP()+(s.drag||0)}
const ageOf=i=>Math.min(2,V.plate.step-i);
function drawPlate(){const s=V.plate,g=A.ctx,base=A.H*.55;sky();
 note(s.step<3?`Drag the plate left (${s.step} of 3 moves)`:s.ask==='done'?'Active, dormant, extinct':`Tap the ${s.ask} volcano`,A.H*.07,{ok:s.ask==='done'});
 g.fillStyle='#a8a29e';g.fillRect(0,base,A.W,A.H*.14);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(-2,base,A.W+4,A.H*.14);word('← plate moves this way',A.W*.4,base+A.H*.07,11,INK,800);
 g.fillStyle=MAG;g.beginPath();g.ellipse(SPOT(),A.H*.88,A.W*.08,A.H*.06,0,0,7);g.fill();word('hot spot',SPOT(),A.H*.88,11,INK,900);
 g.strokeStyle=MAG;g.lineWidth=6;g.beginPath();g.moveTo(SPOT(),A.H*.82);g.lineTo(SPOT(),base+A.H*.14);g.stroke();
 for(let i=0;i<=s.step;i++){const x=vx(i),k=ageOf(i);if(x<-GAP())continue;cone(x,base,GAP()*.85,A.H*.28,k);
  word(BINS[k],Math.max(32,x),base-A.H*.36,12,k===0?(A.col.dark?'#fca5a5':BAD):A.col.tx,900);if(s.bad===i){g.strokeStyle=BAD;g.lineWidth=3;g.strokeRect(x-GAP()*.45,base-A.H*.42,GAP()*.9,A.H*.42)}}}
const coneAt=p=>{for(let i=0;i<=V.plate.step;i++){if(Math.abs(p.x-vx(i))<GAP()*.45&&p.y<A.H*.55&&p.y>A.H*.1)return i}return null};
function shove(){const s=V.plate;if(s.step>=3)return tell('That is enough moves. Now find the volcano asked for.');s.step++;s.drag=0;A.sound.tick();
 tell(s.step<3?'A new volcano grows on the hot spot. The old one is cut off from the magma.':'Three moves done. Tap the dormant volcano.');if(s.step>=3)s.ask='dormant'}
function pickCone(i){const s=V.plate;if(s.step<3||s.ask==='done')return;const k=ageOf(i),want=s.ask==='dormant'?1:2;
 if(k!==want){s.bad=i;A.sound.miss();return tell(k===0?'That one is on the hot spot: magma still flows in, so it is active.':k===1?'That one only just left the hot spot. It is quiet but still has magma: dormant.':'That one left the hot spot long ago. Its magma is gone: extinct.')}
 s.bad=-1;A.sound.pop();if(s.ask==='dormant'){s.ask='extinct';return tell('Yes, dormant: just off the hot spot. Now tap an extinct volcano.')}s.ask='done';tell('Yes, extinct: far from the hot spot, magma supply gone.')}
/* ---- scene 4: robot ---- */
const yesNo=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.76,w,h:Math.min(A.H*.17,62)}});
function drawRobot(){const s=V.robot,g=A.ctx;sky();if(s.i>=ROBOT.length){note('All 5 checked',A.H*.15,{ok:1});note('Quiet is not extinct. Dormant is not safe.',A.H*.35);return}
 const u=Math.min(A.W*.08,34),cx=A.W*.5,cy=A.H*.2;g.fillStyle='#cbd5e1';A.paint.rrect(cx-u,cy-u,u*2,u*1.8,9);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle='#0369a1';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.42,cy-u*.25,u*.2,0,7);g.fill()});
 const R=ROBOT[s.i],cut=R.s.lastIndexOf(' ',Math.ceil(R.s.length/2));note(R.s.slice(0,cut),A.H*.42,{v:12});note(R.s.slice(cut+1),A.H*.53,{v:12});
 note(`${s.i+1} of ${ROBOT.length}: right, or a slip?`,A.H*.65,{v:11});yesNo().forEach(r=>{slab(r,{no:s.bad===r.k});word(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,16,INK,900)})}
function judge(k){const s=V.robot;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Check again: ${R.fix}`:`Think again. ${R.fix}`)}s.bad=-1;s.i++;A.sound.pop();tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* ---- scene 5: look underneath ---- */
const hillX=i=>A.W*(.18+i*.32);
const sortR=()=>{const w=(A.W-24)/3,h=Math.min(A.H*.14,56);return BINS.map((b,k)=>({k,x:6+k*(w+6),y:A.H*.84,w,h}))};
function drawHills(){const s=V.hills,g=A.ctx,base=A.H*.45;sky();note(s.look==null?'Tap a hill to look underneath':`${HILLS[s.look].n}: what is it?`,A.H*.07);
 g.fillStyle='#d6d3d1';g.fillRect(0,base,A.W,A.H*.33);
 HILLS.forEach((H,i)=>{const x=hillX(i);cone(x,base,A.W*.28,A.H*.3,2);word(s.got[i]!=null?BINS[s.got[i]]:H.n,x,base-A.H*.06,11,'#ffffff',900);
  if(s.look===i||s.got[i]!=null){const col=H.k===2?'#57534e':MAG;g.fillStyle=col;g.beginPath();g.ellipse(x,base+A.H*.2,A.W*.1,A.H*.07,0,0,7);g.fill();
   if(H.k===0){g.strokeStyle=MAG;g.lineWidth=7;g.beginPath();g.moveTo(x,base+A.H*.14);g.lineTo(x,base);g.stroke()}}
  if(s.bad===i){g.strokeStyle=BAD;g.lineWidth=3;g.strokeRect(x-A.W*.15,base-A.H*.3,A.W*.3,A.H*.6)}});
 if(s.look!=null){word(HILLS[s.look].under.replace(/, (?=[a-z])/,',\n'),A.W/2,A.H*.72,10,INK,800);sortR().forEach(r=>{slab(r,{fill:TONE[r.k],no:s.bad===`b${r.k}`});word(BINS[r.k],r.x+r.w/2,r.y+r.h/2+1,13,INK,900)})}}
function peek(i){const s=V.hills;if(s.got[i]!=null)return tell(`${HILLS[i].n} is sorted: ${BINS[s.got[i]]}.`);s.look=i;s.bad=-1;A.sound.tick();tell(`Under ${HILLS[i].n}: ${HILLS[i].under}.`)}
function sortHill(k){const s=V.hills;if(s.look==null)return tell('Tap a hill to look underneath first.');const H=HILLS[s.look];
 if(k!==H.k){s.bad=`b${k}`;A.sound.miss();return tell(H.k===1?'There is still hot magma, so it could erupt again. Quiet but not dead: dormant.':H.k===2?'No magma at all and solid cold rock: it is not expected to erupt again. Extinct.':'Magma rising and gas leaking are signs of an eruption coming: active.')}
 s.got[s.look]=k;s.look=null;s.bad=-1;A.sound.pop();tell(`${H.n}: ${BINS[k]}. `+(Object.keys(s.got).length<HILLS.length?'Look under the next hill.':''))}
function draw(){const k=part();if(k==='quiz'){sky();note('Challenge',A.H*.2,{ok:1});note('Look for magma, signs and the record',A.H*.5);return}
 ({sort:drawSort,wake:drawWake,plate:drawPlate,robot:drawRobot,hills:drawHills})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part(),s=V[k];
 if(k==='sort'){const r=cardR().find(r=>s.put[r.i]==null&&hit(p,r));if(r){s.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=binR().find(r=>hit(p,r));if(b&&s.pick!=null)place(s.pick,b.k);return false}
 if(k==='wake'){if(hit(p,nextR())&&s.m<=SIGNS.length)return month(),false;const r=signR().find(r=>hit(p,r));if(r&&s.m<=SIGNS.length)sign(r.k);
  else if(s.m>SIGNS.length&&p.y>A.H*.8)name(p.x<A.W/2?'Dormant':'Extinct');return false}
 if(k==='plate'){if(s.step<3&&p.y>A.H*.5&&p.y<A.H*.72){s.x0=p.x;return true}const i=coneAt(p);if(i!=null)pickCone(i);return false}
 if(k==='robot'){const r=yesNo().find(r=>hit(p,r));if(r)judge(r.k);return false}
 if(k==='hills'){const b=s.look!=null&&sortR().find(r=>hit(p,r));if(b)return sortHill(b.k),false;const i=HILLS.findIndex((H,j)=>Math.abs(p.x-hillX(j))<A.W*.14&&p.y<A.H*.8);if(i>=0)peek(i);return false}
 return false}
function move(p){const k=part(),s=V[k];if(k==='sort'&&s.drag){s.drag.x=p.x;s.drag.y=p.y;const b=binR().find(r=>hit(p,r));s.hot=b?b.k:-1;A.redraw()}
 if(k==='plate'&&s.x0!=null){s.drag=Math.min(0,Math.max(-GAP(),p.x-s.x0));A.redraw()}}
function up(p){const k=part(),s=V[k];
 if(k==='sort'&&s.drag){const q=s.drag;s.drag=null;s.hot=-1;const b=binR().find(r=>hit(p,r));if(b)return place(q.i,b.k);if(Math.hypot(p.x-q.x0,p.y-q.y0)<10){s.pick=q.i;return tell('Card picked. Now tap a box.')}A.redraw()}
 if(k==='plate'&&s.x0!=null){const far=(s.drag||0)<-GAP()*.4;s.x0=null;s.drag=0;if(far)shove();else{A.redraw();tell('Drag further to the left to move the plate.')}}}
function reset(){epoch++;for(const k in V)delete V[k];Object.assign(V,{sort:{put:{},pick:null,drag:null,hot:-1,bad:-1},wake:{m:0,log:[],bad:'',named:false},plate:{step:0,drag:0,x0:null,ask:'',bad:-1},robot:{i:0,bad:-1},hills:{look:null,got:{},bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();V.check()}
const whenDone=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);V.check=whenDone(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function twins(){if(!row)return;row.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='sort'){const i=CARDS.findIndex((C,j)=>V.sort.put[j]==null);if(i>=0)BINS.forEach((b,kk)=>B(b,()=>place(i,kk),`Put "${CARDS[i].t.replace('\n',' ')}" in ${b}`))}
 if(k==='wake'){const s=V.wake;if(s.m<=SIGNS.length){B('Next month →',month);SIGNK.forEach(([kk,t])=>B(t,()=>sign(kk),`Log warning sign: ${t}`))}else if(!s.named)['Dormant','Extinct'].forEach(t=>B(`Before: ${t}`,()=>name(t)))}
 if(k==='plate'){const s=V.plate;if(s.step<3)B('← Move the plate',shove);else if(s.ask!=='done')for(let i=0;i<=s.step;i++)B(`Volcano ${i+1} (${['on the hot spot','1 move away','far away'][ageOf(i)]})`,()=>pickCone(i))}
 if(k==='robot'&&V.robot.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}
 if(k==='hills'){HILLS.forEach((H,i)=>{if(V.hills.got[i]==null)B(`Look under ${H.n}`,()=>peek(i))});if(V.hills.look!=null)BINS.forEach((b,kk)=>B(b,()=>sortHill(kk),`${HILLS[V.hills.look].n} is ${b}`))}}
const steps=[
{h:'Sort the clues',p:'Each card is a clue about a volcano. Is it active, dormant or extinct? Drag each card to a box.',
 predict:{q:'A volcano has not erupted for 500 years. Which box?',opts:['Extinct: it is dead','Dormant: it could wake'],ans:1},task:'Sort all 6 clue cards',
 show:()=>play(0,CARDS.map((C,i)=>()=>place(i,C.k)),380),go:()=>begin(0,()=>Object.keys(V.sort.put).length===CARDS.length)},
{h:'The sleeper wakes',p:'Mount Pinatubo in the Philippines was quiet for about 500 years. Step month by month and log each warning sign.',
 predict:{q:'Pinatubo had been quiet for about 500 years. Could it erupt?',opts:['No, it must be extinct','Yes, it was only asleep'],ans:1},task:'Log 3 signs and name what it was',
 show:()=>play(1,[...SIGNS.flatMap(S=>[month,()=>sign(S.k)]),month,()=>name('Dormant')],450),go:()=>begin(1,()=>V.wake.named)},
{h:'Hot spot',p:'Magma rises from a hot spot. The plate of rock above it slowly slides. Drag the plate left and watch each volcano change.',task:'Move the plate 3 times, then find dormant and extinct',
 show:()=>play(2,[shove,shove,shove,()=>pickCone(2),()=>pickCone(0)],500),go:()=>begin(2,()=>V.plate.ask==='done')},
{h:'Spot the slip',p:'The robot says things about volcanoes. Is each one right, or a slip?',task:'Check all 5 robot claims',
 show:()=>play(3,ROBOT.map(R=>()=>judge(R.ok?0:1)),520),go:()=>begin(3,()=>V.robot.i>=ROBOT.length)},
{h:'Look underneath',p:'Three green hills look the same. Tap each hill to see what is under it, then sort it.',
 predict:{q:'Can you tell which quiet hill is extinct just by looking at it?',opts:['Yes, by how it looks','No, you need to know what is below'],ans:1},task:'Sort all 3 hills',
 show:()=>play(4,HILLS.flatMap((H,i)=>[()=>peek(i),()=>sortHill(H.k)]),420),go:()=>begin(4,()=>Object.keys(V.hills.got).length===HILLS.length)},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
function why(t){let m='Check for magma below, warning signs and the eruption record.';
 if(t==='life')m='A long quiet time is not the same as extinct. Volcanoes can sleep for hundreds or thousands of years.';
 if(t==='safe')m='Dormant means asleep, not dead. A dormant volcano still has magma and can erupt.';
 if(t==='signs')m='Shaking and new gas are warning signs that magma is moving. Listen to the scientists.';
 if(t==='look')m='How a hill looks does not tell you. Scientists check what is underneath and when it last erupted.';
 return m}
function nextQ(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:st=>{ask.hidden=st.step!==5;row.hidden=st.step===5;twins()},
 init:st=>{A=st;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Volcano lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});twins()}}).start()})})();
