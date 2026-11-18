/* Flagship – zero means none (ages 4–5; Development Matters 2021 Reception Mathematics; White Rose Reception
   'introducing zero'; NCETM Mastering Number). Scenes: eat biscuits to an empty plate, sort bead boxes into none or
   some, count frogs back off a log to 0, put cards 0-3 on egg nests, fill a 0-5 track. Data in learn/zero_art.js. */
(()=>{const {PLATES,BOXES,FROGS,NESTS,TRACK,CARDS,QS,DESC,DONE}=ZRO;
VIS.reg('flagzero',c=>{let A,pad,quiz,qn=-1,gen=0;const Z={};c.fig.classList.add('young');
const INK='#1e293b',YES='#047857',NO='#b91c1c',RIM='#64748b',HOT='#7c3aed',FONT='px system-ui,sans-serif';
const LT=()=>A.col.dark?'#f8fafc':INK;
const scene=()=>['plate','boxes','frogs','nests','track','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.18);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.06:.55);g.fillRect(0,0,A.W,A.H)}
function word(t,x,y,n,col,wt){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=`${wt||800} ${sz(n)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function label(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+26;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+26}
 const h=n+16,left=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(left,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,left+w/2,y+1)}
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.no||o.ok||o.on?4:2;g.strokeStyle=o.no?NO:o.ok?YES:o.on?HOT:RIM;g.stroke()}
function row(n,y,h,maxW){const gap=8,w=Math.min(maxW||110,(A.W-20-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y,w,h}))}
const keyRow=()=>row(6,A.H*.8,A.H*.14,90);
function numKeys(bad){keyRow().forEach(r=>{tile(r,{no:bad===r.i});word(String(r.i),r.x+r.w/2,r.y+r.h/2+1,22,INK,900)})}
/* 1. biscuits on a plate */
function plateGeo(){const r=Math.min(A.W*.3,A.H*.25);return{x:A.W/2,y:A.H*.4,r}}
function biscuitSpots(){const P=plateGeo(),n=PLATES[Math.min(Z.a.r,PLATES.length-1)];return Array.from({length:n},(_,i)=>{const t=-Math.PI/2+i*2*Math.PI/n;return{i,x:P.x+Math.cos(t)*P.r*.5,y:P.y+Math.sin(t)*P.r*.5,r:P.r*.24}})}
function drawPlate(){const s=Z.a,g=A.ctx,P=plateGeo();wash();
 if(s.r>=PLATES.length){label('2 plates eaten up',A.W/2,A.H*.12,{ok:1});['3, 2, 1, 0','4, 3, 2, 1, 0'].forEach((t,j)=>label(t+': none left is zero',A.W/2,A.H*(.4+j*.18),{n:15}));return}
 const left=s.gone.filter(x=>!x).length;
 label(left?`Plate ${s.r+1} of 2: tap a biscuit to eat it`:'No biscuits left. Tap the number for none.',A.W/2,A.H*.07,{n:13,ok:s.won});
 g.fillStyle=A.col.dark?'#e2e8f0':'#ffffff';g.beginPath();g.ellipse(P.x,P.y,P.r,P.r*.92,0,0,7);g.fill();g.lineWidth=3;g.strokeStyle=RIM;g.stroke();
 g.beginPath();g.ellipse(P.x,P.y,P.r*.72,P.r*.66,0,0,7);g.strokeStyle='#cbd5e1';g.lineWidth=2;g.stroke();
 biscuitSpots().forEach(b=>{if(s.gone[b.i])return;g.fillStyle='#d97706';g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.fill();g.lineWidth=2;g.strokeStyle='#78350f';g.stroke();
  g.fillStyle='#78350f';[[-.35,-.3],[.3,-.2],[0,.35],[-.3,.25],[.35,.3]].forEach(([u,v])=>{g.beginPath();g.arc(b.x+u*b.r,b.y+v*b.r,b.r*.09,0,7);g.fill()})});
 word(String(left),P.x+P.r+Math.min(46,A.W*.1),P.y,30,left?A.col.tx:YES,900);numKeys(s.bad)}
function eat(i){const s=Z.a;if(s.r>=PLATES.length||s.won)return;if(i==null)i=s.gone.indexOf(false);if(i<0||s.gone[i])return;
 s.gone[i]=true;s.bad=-1;A.sound.pop();const left=s.gone.filter(x=>!x).length;
 say(left?`Yum. ${left} biscuit${left>1?'s':''} left on the plate.`:'The plate is empty. How many biscuits now?')}
function plateAnswer(v){const s=Z.a;if(s.r>=PLATES.length)return;const left=s.gone.filter(x=>!x).length;
 if(left){A.sound.miss();return say(`There are still ${left} on the plate. Eat them all first, then tap the number for none.`)}
 if(v!==0){s.bad=v;A.sound.miss();return say(v===1?'1 is the plate. Count the biscuits on it: there are none, so the number is 0.':`There are no biscuits, not ${v}. None is the number 0.`)}
 s.r++;s.bad=-1;A.sound.pop();if(s.r<PLATES.length)s.gone=Array(PLATES[s.r]).fill(false);
 say(s.r>=PLATES.length?'Both plates are empty. Zero means none.':'Yes: 0 biscuits. Zero means none. Here is a new plate.')}
/* 2. bead boxes: none or some */
function bin(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.3}}
function boxR(){const gap=10,w=Math.min(140,(A.W-gap*4)/3),h=Math.min(w*.62,A.H*.19),x0=(A.W-(3*w+2*gap))/2;return BOXES.map((_,i)=>({i,x:x0+(i%3)*(w+gap),y:A.H*.5+Math.floor(i/3)*(h+gap*2),w,h}))}
function beadBox(r,n,o){const g=A.ctx;tile(r,o);g.fillStyle='#7c3aed';for(let k=0;k<n;k++){g.beginPath();g.arc(r.x+r.w*(n===1?.5:.25+k*.5/(n-1)),r.y+r.h*.55,Math.min(r.w,r.h)*.12,0,7);g.fill()}
 if(!n)word('empty',r.x+r.w/2,r.y+r.h*.55,11,'#475569',700)}
function drawBoxes(){const s=Z.b,g=A.ctx;wash();
 [['0','None'],['1+','Some']].forEach(([n,t],k)=>{const r=bin(k);g.fillStyle=k?(A.col.dark?'#4c1d95':'#ede9fe'):(A.col.dark?'#064e3b':'#d1fae5');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?HOT:RIM;g.stroke();word(k?'Some beads':'0: none',r.x+r.w/2,r.y+r.h*.18,15,LT());
  s.put.filter(i=>(BOXES[i]?1:0)===k).forEach((i,j)=>word(String(BOXES[i]),r.x+r.w*(.17+j*.22),r.y+r.h*.66,18,LT(),900))});
 boxR().forEach(r=>{if(s.put.includes(r.i)||(Z.drag&&Z.drag.i===r.i))return;beadBox(r,BOXES[r.i],{no:s.bad===r.i,on:s.pick===r.i})});
 if(Z.drag){const d=Z.drag,r=boxR()[d.i];beadBox({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},BOXES[d.i],{on:1})}
 label(s.put.length>=BOXES.length?'All 6 boxes sorted':'Is the box empty (0) or does it have some?',A.W/2,A.H*.045,{n:13,ok:s.put.length>=BOXES.length})}
function sortBox(i,k){const s=Z.b;if(s.put.includes(i))return;s.pick=null;const n=BOXES[i],want=n?1:0;
 if(want!==k){s.bad=i;A.sound.miss();return say(n?`This box has ${n} bead${n>1?'s':''}. ${n===1?'Just 1 is still some: ':''}zero means no beads at all.`:'This box is empty. No beads is none, and none is 0.')}
 s.put.push(i);s.bad=-1;A.sound.pop();say((n?`${n} bead${n>1?'s':''}: some.`:'Empty: 0 beads, none.')+(s.put.length>=BOXES.length?' All sorted.':` ${s.put.length} of 6.`))}
/* 3. frogs jump off a log, counting back */
function frogSeat(i){const w=Math.min(A.W*.16,74),gap=(A.W-FROGS*w)/(FROGS+1);return{x:gap+i*(w+gap),y:A.H*.2,w,h:w*.8}}
function drawFrogs(){const s=Z.c,g=A.ctx;wash();const onLog=FROGS-s.jumped;
 g.fillStyle=A.col.dark?'#1e3a8a':'#bfdbfe';A.paint.rrect(10,A.H*.5,A.W-20,A.H*.2,24);g.fill();
 g.fillStyle='#92400e';A.paint.rrect(12,A.H*.2+frogSeat(0).h*.78,A.W-24,A.H*.07,12);g.fill();
 for(let i=0;i<FROGS;i++){const f=frogSeat(i),inPond=i>=onLog,cx=f.x+f.w/2,cy=inPond?A.H*.6:f.y+f.h/2;
  g.fillStyle=inPond?'#15803d':'#22c55e';g.beginPath();g.ellipse(cx,cy,f.w*.42,f.h*.4,0,0,7);g.fill();g.lineWidth=2;g.strokeStyle='#14532d';g.stroke();
  [-1,1].forEach(e=>{g.fillStyle='#ffffff';g.beginPath();g.arc(cx+e*f.w*.17,cy-f.h*.32,f.w*.1,0,7);g.fill();g.stroke();g.fillStyle='#111827';g.beginPath();g.arc(cx+e*f.w*.17,cy-f.h*.32,f.w*.045,0,7);g.fill()})}
 const trail=[FROGS].concat(s.said).join(', ');label(s.need?`A frog jumped. How many are on the log now?`:onLog?`Tap a frog on the log to make it jump  ·  ${trail}`:`${trail}: zero frogs on the log`,A.W/2,A.H*.06,{n:13,ok:!onLog&&!s.need});
 numKeys(s.bad)}
function jump(){const s=Z.c;if(s.need)return say('First tap how many frogs are on the log now.');if(s.jumped>=FROGS)return;s.jumped++;s.need=true;s.bad=-1;A.sound.pop();say('Splash! A frog jumped into the pond. How many are left on the log?')}
function frogAnswer(v){const s=Z.c,left=FROGS-s.jumped;if(!s.need)return say(left?'Tap a frog to make it jump first.':'All the frogs are in the pond.');
 if(v!==left){s.bad=v;A.sound.miss();return say(v===left+1?`${v} is how many there were. One jumped off, so count back one.`:left===0&&v===1?'Look at the log: no frogs. Counting back goes 2, 1, 0. None is 0.':`Count the frogs still on the log: there are ${left}.`)}
 s.need=false;s.bad=-1;s.said.push(v);A.sound.pop();say(left?`Yes, ${left} on the log.`:'Yes: 0 frogs on the log. After 1 comes 0 when we count back.')}
/* 4. numeral cards on nests */
const nestR=()=>row(NESTS.length,A.H*.16,A.H*.3,140),cardR=()=>row(4,A.H*.68,A.H*.2,90);
function nest(r,n,o){const g=A.ctx;tile(r,o);const cx=r.x+r.w/2,cy=r.y+r.h*.62;g.fillStyle='#92400e';g.beginPath();g.ellipse(cx,cy,r.w*.4,r.h*.22,0,0,Math.PI);g.fill();
 g.strokeStyle='#78350f';g.lineWidth=3;g.beginPath();g.ellipse(cx,cy,r.w*.4,r.h*.12,0,0,7);g.stroke();
 for(let k=0;k<n;k++){g.fillStyle='#fef3c7';g.beginPath();g.ellipse(cx+(k-(n-1)/2)*r.w*.23,cy-r.h*.08,r.w*.075,r.h*.11,0,0,7);g.fill();g.lineWidth=1.5;g.strokeStyle='#92400e';g.stroke()}}
function drawNests(){const s=Z.d;wash();label(s.got.length>=4?'Every nest has its number':'Drag each number card to the nest it matches',A.W/2,A.H*.06,{n:13,ok:s.got.length>=4});
 nestR().forEach(r=>{const n=NESTS[r.i],hit=s.got.includes(n);nest(r,n,{ok:hit,on:s.hot===r.i});if(hit)word(String(n),r.x+r.w/2,r.y+r.h*.2,22,YES,900)});
 cardR().forEach(r=>{if(s.got.includes(r.i)||(Z.drag&&Z.drag.i===r.i))return;tile(r,{no:s.bad===r.i,on:s.pick===r.i});word(String(r.i),r.x+r.w/2,r.y+r.h/2+1,26,INK,900)});
 if(Z.drag){const d=Z.drag,r=cardR()[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},{on:1});word(String(d.i),d.x,d.y+1,26,INK,900)}}
function placeCard(v,j){const s=Z.d;if(s.got.includes(v))return;s.pick=null;const n=NESTS[j];
 if(n!==v){s.bad=v;A.sound.miss();return say(v===0?`This nest has ${n} egg${n>1?'s':''}. The 0 card is for the nest with none.`:n===0?'This nest is empty. Count the eggs, not the nest: no eggs is 0.':`Count the eggs in this nest: there are ${n}, not ${v}.`)}
 s.got.push(v);s.bad=-1;A.sound.pop();say((v?`${v} egg${v>1?'s':''}: card ${v}.`:'No eggs: card 0. Zero means none.')+(s.got.length>=4?' All 4 nests done.':''))}
/* 5. a 0-5 number track with gaps */
const cellR=()=>row(TRACK.length,A.H*.22,A.H*.2,90),trackCards=()=>row(CARDS.length,A.H*.66,A.H*.2,100);
function drawTrack(){const s=Z.e;wash();label(s.got.length>=CARDS.length?'0, 1, 2, 3, 4, 5: zero comes first':'Drag each card into its gap on the number track',A.W/2,A.H*.07,{n:13,ok:s.got.length>=CARDS.length});
 cellR().forEach(r=>{const fixed=TRACK[r.i],filled=CARDS.find(k=>k.slot===r.i&&s.got.includes(k.v));tile(r,{ok:!!filled,on:s.hot===r.i});
  if(fixed!=null||filled)word(String(fixed!=null?fixed:filled.v),r.x+r.w/2,r.y+r.h/2+1,24,filled?YES:INK,900);else word('?',r.x+r.w/2,r.y+r.h/2+1,20,'#64748b',700)});
 word('fewer ← → more',A.W/2,A.H*.5,12,A.col.tx,700);
 trackCards().forEach(r=>{const k=CARDS[r.i];if(s.got.includes(k.v)||(Z.drag&&Z.drag.i===r.i))return;tile(r,{no:s.bad===k.v,on:s.pick===r.i});word(String(k.v),r.x+r.w/2,r.y+r.h/2+1,26,INK,900)});
 if(Z.drag){const d=Z.drag,r=trackCards()[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},{on:1});word(String(CARDS[d.i].v),d.x,d.y+1,26,INK,900)}}
function slotCard(ci,slot){const s=Z.e,k=CARDS[ci];if(s.got.includes(k.v))return;s.pick=null;
 if(TRACK[slot]!=null){A.sound.miss();return say(`That place already has ${TRACK[slot]}. Pick a gap marked ?.`)}
 if(slot!==k.slot){s.bad=k.v;A.sound.miss();return say(k.v===0&&slot===5?'0 does not go at the end. Count back: 2, 1, 0. Zero comes just before 1.':slot===0?`The first gap is just before 1, so it is for 0, not ${k.v}.`:`That gap comes after ${slot-1}, so it is for ${slot}, not ${k.v}.`)}
 s.got.push(k.v);s.bad=-1;A.sound.pop();say(`${k.v} fits.`+(s.got.length>=CARDS.length?' The track reads 0, 1, 2, 3, 4, 5.':''))}
function draw(){const k=scene();if(k==='quiz'){wash();label('Challenge',A.W/2,A.H*.16,{ok:1});label('Zero (0) means none',A.W/2,A.H*.5,{n:15});return}
 ({plate:drawPlate,boxes:drawBoxes,frogs:drawFrogs,nests:drawNests,track:drawTrack})[k]();A.fx.draw(A.ctx)}
/* tap to act; boxes and cards drag, or tap one then tap where it goes */
function grab(list,p,used){const r=list.find(r=>within(p,r)&&!used(r.i));if(!r)return false;Z.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
function down(p){const k=scene(),key=keyRow().find(r=>within(p,r));
 if(k==='plate'){if(key)return plateAnswer(key.i),false;const b=biscuitSpots().find(b=>!Z.a.gone[b.i]&&Math.hypot(p.x-b.x,p.y-b.y)<=b.r*1.2);if(b)eat(b.i);return false}
 if(k==='frogs'){if(key)return frogAnswer(key.i),false;const onLog=FROGS-Z.c.jumped;for(let i=0;i<onLog;i++)if(within(p,frogSeat(i)))return jump(),false;return false}
 if(k==='boxes'){if(grab(boxR(),p,i=>Z.b.put.includes(i)))return true;const b=[0,1].find(j=>within(p,bin(j)));if(b!=null&&Z.b.pick!=null)sortBox(Z.b.pick,b);return false}
 if(k==='nests'){if(grab(cardR(),p,i=>Z.d.got.includes(i)))return true;const n=nestR().find(r=>within(p,r));if(n&&Z.d.pick!=null)placeCard(Z.d.pick,n.i);return false}
 if(k==='track'){if(grab(trackCards(),p,i=>Z.e.got.includes(CARDS[i].v)))return true;const t=cellR().find(r=>within(p,r));if(t&&Z.e.pick!=null)slotCard(Z.e.pick,t.i);return false}
 return false}
function move(p){const d=Z.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=scene();
 if(k==='boxes'){const h=[0,1].find(j=>within(p,bin(j)));Z.b.hot=h==null?-1:h}
 if(k==='nests'){const n=nestR().find(r=>within(p,r));Z.d.hot=n?n.i:-1}
 if(k==='track'){const t=cellR().find(r=>within(p,r));Z.e.hot=t?t.i:-1}A.redraw()}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=scene();
 if(k==='boxes'){Z.b.hot=-1;const b=[0,1].find(j=>within(p,bin(j)));if(b!=null)return sortBox(d.i,b);if(tap){Z.b.pick=d.i;return say('Box picked. Now tap None or Some.')}}
 if(k==='nests'){Z.d.hot=-1;const n=nestR().find(r=>within(p,r));if(n)return placeCard(d.i,n.i);if(tap){Z.d.pick=d.i;return say(`Card ${d.i} picked. Now tap a nest.`)}}
 if(k==='track'){Z.e.hot=-1;const t=cellR().find(r=>within(p,r));if(t)return slotCard(d.i,t.i);if(tap){Z.e.pick=d.i;return say(`Card ${CARDS[d.i].v} picked. Now tap a gap on the track.`)}}A.redraw()}
function fresh(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{a:{r:0,gone:Array(PLATES[0]).fill(false),bad:-1,won:0},b:{put:[],bad:-1,hot:-1,pick:null},c:{jumped:0,need:false,said:[],bad:-1},d:{got:[],bad:-1,hot:-1,pick:null},e:{got:[],bad:-1,hot:-1,pick:null},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();Z.check()}
const whenDone=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){fresh();say(DESC[i]);Z.check=whenDone(i,ok,DONE[i])}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 const nums=(f,what)=>{for(let v=0;v<=5;v++)B(String(v),()=>f(v),`${v} ${what}`)};
 if(k==='plate'&&Z.a.r<PLATES.length){if(Z.a.gone.includes(false))B('🍪 Eat a biscuit',()=>eat(),'Eat one biscuit');nums(plateAnswer,'biscuits left')}
 if(k==='boxes')BOXES.forEach((n,i)=>{if(!Z.b.put.includes(i)){B(`Box ${i+1} (${n} bead${n===1?'':'s'}) → None`,()=>sortBox(i,0));B(`Box ${i+1} → Some`,()=>sortBox(i,1),`Box ${i+1}: some beads`)}});
 if(k==='frogs'){if(Z.c.jumped<FROGS)B('🐸 A frog jumps',jump,'Make a frog jump off the log');nums(frogAnswer,'frogs on the log')}
 if(k==='nests'){[0,1,2,3].forEach(v=>{if(!Z.d.got.includes(v))B(`Pick card ${v}`,()=>{Z.d.pick=v;say(`Card ${v} picked. Now choose a nest.`)})});
  if(Z.d.pick!=null)NESTS.forEach((n,j)=>{if(!Z.d.got.includes(n))B(`Put it on nest ${j+1} (${n} egg${n===1?'':'s'})`,()=>placeCard(Z.d.pick,j))})}
 if(k==='track'){CARDS.forEach((cd,i)=>{if(!Z.e.got.includes(cd.v))B(`Pick card ${cd.v}`,()=>{Z.e.pick=i;say(`Card ${cd.v} picked. Now choose a gap.`)})});
  if(Z.e.pick!=null)TRACK.forEach((f,j)=>{if(f==null&&!CARDS.some(cd=>cd.slot===j&&Z.e.got.includes(cd.v)))B(j===0?'Put it in the gap before 1':`Put it in the gap after ${j-1}`,()=>slotCard(Z.e.pick,j))})}}
const steps=[
{h:'Eat the biscuits',p:'Tap a biscuit to eat it. Watch the number go down. When the plate is empty, tap the number for none.',
 task:'Empty 2 plates and tap the number for none',show:()=>demo(0,PLATES.flatMap(n=>[...Array(n)].map(()=>()=>eat()).concat([()=>plateAnswer(0)])),330),
 go:()=>begin(0,()=>Z.a.r>=PLATES.length)},
{h:'Empty or some?',p:'Drag each box to 0: none or Some beads, or tap a box and then tap where it goes.',
 predict:{q:'A box has just 1 bead in it. Is that zero?',opts:['Yes, it is nearly empty','No, 1 bead is not none'],ans:1},task:'Sort all 6 boxes',
 show:()=>demo(1,BOXES.map((n,i)=>()=>sortBox(i,n?1:0)),520),
 go:()=>begin(1,()=>Z.b.put.length>=BOXES.length)},
{h:'Frogs count back',p:'Tap a frog to make it jump into the pond. Then tap how many frogs are still on the log.',
 predict:{q:'Count back: 3, 2, 1 … what comes next?',opts:['0, when no frogs are left','Nothing, counting stops at 1'],ans:0},task:'Count every frog back to 0',
 show:()=>demo(2,[...Array(FROGS)].flatMap((_,j)=>[()=>jump(),()=>frogAnswer(FROGS-j-1)]),520),
 go:()=>begin(2,()=>Z.c.jumped>=FROGS&&!Z.c.need)},
{h:'Egg nests',p:'Drag each number card to the nest with that many eggs, or tap a card and then a nest. One nest is empty.',
 predict:{q:'Which card goes on the empty nest?',opts:['No card, it is empty','The 0 card'],ans:1},task:'Match all 4 cards',
 show:()=>demo(3,[0,1,2,3].map(v=>()=>placeCard(v,NESTS.indexOf(v))),600),
 go:()=>begin(3,()=>Z.d.got.length>=4)},
{h:'Number track',p:'Drag each card into its gap on the track, or tap a card and then a gap.',
 predict:{q:'Where does 0 go on the number track?',opts:['Just before 1','After 5, at the end'],ans:0},task:'Fill the 3 gaps',
 show:()=>demo(4,CARDS.map((k,i)=>()=>slotCard(i,k.slot)),650),
 go:()=>begin(4,()=>Z.e.got.length>=CARDS.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
function slip(t){let m='Count what is there. When there are none, the number is 0.';
 if(t==='plate')m='Count the things on it or in it, not the plate, box or nest. None is 0.';
 if(t==='nothing')m='Zero is a real number. We say it and write it: 0 means none.';
 if(t==='one')m='1 is still some. Zero means not even one.';
 if(t==='back')m='Counting back goes down: 3, 2, 1, then 0.';
 if(t==='end')m='0 comes just before 1, not at the end. It is the smallest.';
 return m}
function next(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:S=>{quiz.hidden=S.step!==5;pad.hidden=S.step===5;buttons()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Zero lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
