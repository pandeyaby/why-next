/* Flagship – first, second, third: ordinal numbers (ages 4–5; NC Y1 Number and place value "read and write numbers
   from 1 to 20 in numerals and words" with ordinal language in Y1 position and direction; EYFS Development Matters
   reception "count objects, actions and sounds" and positional language; CCSS K.CC.4 counting order). A bead string
   (the third bead vs three beads), a race where lane number is not place, a bus queue whose front flips when the bus
   moves, a train counted from the engine, and ten ducklings behind mother duck (do not count the leader). Not flagorder
   (ordering events in time) or flagrepnum (showing how many with objects). Data in learn/ordn_art.js. */
(()=>{const {WORD,SHORT,cap,RACE,PLACE,KIDS,KN,QTASK,TRAIN,DUCKS,QS}=ORDN;
VIS.reg('flagordn',c=>{let A,row,cq,qi=-1,ver=0;const M={};c.fig.classList.add('young');
const INK='#111827',YES='#047857',NOPE='#b91c1c',RIM='#6b7280',HI='#7c3aed',PX='px system-ui,sans-serif';
const now=()=>['beads','race','queue','train','ducks','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.2);
function back(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.55);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${PX}`;let w=g.measureText(t).width+22;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${PX}`;w=g.measureText(t).width+22}
 const h=n+15,l=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle=o.fill||'#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?NOPE:RIM;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function emo(e,x,y,s){const g=A.ctx;g.font=`${Math.round(s)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ring(x,y,r,col){const g=A.ctx;g.lineWidth=4;g.strokeStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.stroke()}
/* 1. beads: the third bead vs three beads */
const NB=7;
function beadXY(i){const x0=A.W*.13,dx=(A.W*.85)/NB;return{x:x0+dx*(i+.5),y:A.H*.46,r:Math.min(dx*.46,A.H*.1)}}
function drawBeads(){const s=M.b,g=A.ctx;back();const a=beadXY(0),z=beadXY(NB-1);
 tag(s.red==null?'Tap the THIRD bead':s.blue.length<3?`Now tap THREE beads: ${s.blue.length} of 3`:'Third bead: 1 bead. Three beads: 3 beads',A.W/2,A.H*.1,{n:13,ok:s.blue.length>=3});
 g.strokeStyle=A.col.dark?'#e5e7eb':'#374151';g.lineWidth=3;g.beginPath();g.moveTo(A.W*.06,a.y);g.lineTo(z.x+z.r+10,a.y);g.stroke();
 emo('🪢',A.W*.07,a.y,a.r*1.4);tag('start',A.W*.07,a.y+a.r+26,{n:11});
 for(let i=0;i<NB;i++){const b=beadXY(i),red=s.red===i,blue=s.blue.includes(i);g.fillStyle=red?'#dc2626':blue?'#2563eb':'#fbbf24';g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.fill();
  g.lineWidth=2;g.strokeStyle=INK;g.stroke();if(s.bad===i)ring(b.x,b.y,b.r+6,NOPE);if(M.cur===i)ring(b.x,b.y,b.r+10,HI);
  if(s.red!=null&&i<=s.red&&s.blue.length<3)tag(SHORT[i],b.x,b.y+b.r+24,{n:11,ok:red})}}
function bead(i){const s=M.b;if(s.red==null){if(i!==2){s.bad=i;A.sound.miss();return say(i<2?`That is the ${WORD[i]} bead. Keep counting from the start: first, second, third.`:`That is the ${WORD[i]} bead, too far. Count from the knot: first, second, third.`)}
  s.red=2;s.bad=null;A.sound.pop();return say('Yes! The third bead is ONE bead, in place 3. Now tap three beads, any three.')}
 if(s.blue.length>=3||s.blue.includes(i)||i===2)return say(i===2?'That is the third bead, already red. Pick other beads.':'');
 s.blue.push(i);A.sound.tick();say(s.blue.length>=3?'Three beads! Three tells you how many. Third tells you which place.':`${s.blue.length} of 3 beads.`)}
function beadAt(p){for(let i=0;i<NB;i++){const b=beadXY(i);if(Math.hypot(p.x-b.x,p.y-b.y)<b.r+8)return i}return -1}
/* 2. race: who is ahead? */
const laneY=i=>A.H*(.2+i*.15),fin=()=>A.W*.9;
function racer(i){const r=RACE[i],x0=A.W*.17;return{x:x0+(fin()-x0-24)*r[2],y:laneY(i),s:Math.min(A.H*.11,34)}}
function drawRace(){const s=M.r,g=A.ctx;back();tag(s.k>=3?'1st rabbit · 2nd cat · 3rd dog':`Give the ${SHORT[s.k]} ribbon: who is ${WORD[s.k]}?`,A.W/2,A.H*.07,{n:13,ok:s.k>=3});
 for(let i=0;i<5;i++){const y=laneY(i);g.fillStyle=i%2?(A.col.dark?'#1f2937':'#ecfccb'):(A.col.dark?'#111827':'#d9f99d');g.fillRect(A.W*.02,y-A.H*.07,A.W*.96,A.H*.14);
  g.font=`800 ${fs(11)}${PX}`;g.fillStyle=A.col.tx;g.textAlign='left';g.textBaseline='middle';g.fillText(`Lane ${i+1}`,A.W*.03,y)}
 g.fillStyle=A.col.dark?'#f9fafb':INK;g.fillRect(fin(),A.H*.12,5,A.H*.76);emo('🏁',fin()+12,A.H*.1,20);
 for(let i=0;i<5;i++){const p=racer(i);emo(RACE[i][1],p.x,p.y,p.s);if(s.bad===i)ring(p.x,p.y,p.s*.7,NOPE);
  const k=s.given.indexOf(i);if(k>=0)tag(SHORT[k],p.x-p.s*1.1,p.y,{n:11,ok:1,fill:['#fde68a','#e5e7eb','#fed7aa'][k]})}}
function ribbon(i){const s=M.r;if(s.k>=3||s.given.includes(i))return;const want=PLACE[s.k],name=RACE[i][0];
 if(i!==want){s.bad=i;A.sound.miss();const pl=PLACE.indexOf(i);
  return say(i===s.k?`The ${name} is in lane ${i+1}, but the lane number is not its place. It is ${WORD[pl]}. Who is closest to the flag?`:`The ${name} is ${WORD[pl]}. ${pl>s.k?'Some animals are ahead of it.':'It already has a ribbon.'} Look for who is closest to the flag.`)}
 s.given.push(i);s.k++;s.bad=null;A.sound.pop();say(`The ${name} is ${WORD[s.k-1]}.`+(s.k>=3?' The frog is in lane 1 but came fourth: place is about who is ahead.':` Now the ${SHORT[s.k]} ribbon.`))}
function racerAt(p){for(let i=0;i<5;i++){const r=racer(i);if(Math.abs(p.x-r.x)<r.s*.8&&Math.abs(p.y-r.y)<A.H*.07)return i}return -1}
/* 3. the bus queue */
const side=()=>QTASK[Math.min(M.q.k,3)][0];
function kidXY(i){const w=A.W*.66,x0=A.W*.17;return{x:x0+w*(i+.5)/6,y:A.H*.58,s:Math.min(w/6*.95,A.H*.17)}}
function drawQueue(){const s=M.q,g=A.ctx;back();const sd=side(),done=s.k>=4;
 tag(done?'The front is the end next to the bus':`Bus on the ${sd==='L'?'left':'right'}: tap the ${WORD[QTASK[s.k][1]]} person`,A.W/2,A.H*.08,{n:13,ok:done});
 emo('🚌',sd==='L'?A.W*.08:A.W*.92,A.H*.56,Math.min(A.W*.12,A.H*.2));
 g.fillStyle=A.col.dark?'#4b5563':'#cbd5e1';g.fillRect(A.W*.16,A.H*.7,A.W*.68,6);
 for(let i=0;i<6;i++){const k=kidXY(i);emo(KIDS[i],k.x,k.y,k.s);if(s.bad===i)ring(k.x,k.y,k.s*.62,NOPE);
  g.font=`800 ${fs(11)}${PX}`;g.fillStyle=A.col.tx;g.textAlign='center';g.fillText(KN[i],k.x,A.H*.78);
  const pos=sd==='L'?i:5-i;if(s.show)g.fillText(SHORT[pos],k.x,A.H*.86)}}
function kid(i){const s=M.q;if(s.k>=4)return;const [sd,o]=QTASK[s.k],want=sd==='L'?o:5-o,mir=sd==='L'?5-o:o;
 if(i!==want){s.bad=i;A.sound.miss();return say(i===mir?`${KN[i]} is ${WORD[o]} from the other end. The front of the queue is next to the bus, so count from there.`:`${KN[i]} is ${WORD[sd==='L'?i:5-i]} in the queue. Start at the bus: first, second, third…`)}
 s.bad=null;s.k++;A.sound.pop();if(s.k===2){s.show=0;return say(`Yes, ${KN[i]} is ${WORD[o]}. Oh! The bus has moved to the other end. Who is first now?`)}
 s.show=s.k>=4;say(`Yes, ${KN[i]} is ${WORD[o]}.`+(s.k===3?` ${KN[5]} was last, now first: the front is where the bus is.`:'')+(s.k>=4?' The order flips when you count from the other end.':''))}
function kidAt(p){for(let i=0;i<6;i++){const k=kidXY(i);if(Math.abs(p.x-k.x)<k.s*.55&&Math.abs(p.y-k.y)<k.s*.7)return i}return -1}
/* 4. the train */
function carR(j){const x0=A.W*.2,w=(A.W*.77)/5;return{x:x0+j*w+3,y:A.H*.32,w:w-6,h:A.H*.24}}
function drawTrain(){const s=M.t,g=A.ctx,cur=TRAIN[Math.min(s.k,3)];back();
 tag(s.k>=4?'Counted from the engine':`Put the ${cur[0]} in the ${WORD[cur[2]]} carriage`,A.W/2,A.H*.08,{n:13,ok:s.k>=4});
 emo('🚂',A.W*.1,A.H*.44,Math.min(A.W*.14,A.H*.22));
 for(let j=0;j<5;j++){const r=carR(j);g.fillStyle=A.col.dark?'#7f1d1d':'#fecaca';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=s.bad===j?4:2;g.strokeStyle=s.bad===j?NOPE:RIM;g.stroke();
  if(M.cur===j){g.lineWidth=4;g.strokeStyle=HI;A.paint.rrect(r.x-4,r.y-4,r.w+8,r.h+8,12);g.stroke()}const who=s.seat[j];if(who)emo(who,r.x+r.w/2,r.y+r.h*.5,Math.min(r.w*.6,r.h*.6));tag(SHORT[j],r.x+r.w/2,r.y+r.h+18,{n:11})}
 if(s.k<4){const d=M.drag,c0=chipR();emo(cur[1],d?d.x:c0.x+c0.w/2,d?d.y:c0.y+c0.h/2,Math.min(56,A.H*.15));if(!d)tag('drag me',c0.x+c0.w/2,c0.y+c0.h+14,{n:11})}}
const chipR=()=>{const s=Math.min(70,A.H*.18);return{x:A.W/2-s/2,y:A.H*.68,w:s,h:s}};
function seat(j){const s=M.t;if(s.k>=4)return;const [name,e,want]=TRAIN[s.k];
 if(j!==want){s.bad=j;A.sound.miss();return say(j===4-want?`That is the ${WORD[want]} carriage counting from the back. Count from the engine: the first carriage is next to it.`:`That is the ${WORD[j]} carriage. Count from the engine: first, second, third…`)}
 s.seat[j]=e;s.k++;s.bad=null;M.cur=-1;A.sound.pop();say(`The ${name} is in the ${WORD[want]} carriage.`+(s.k>=4?' All aboard!':''))}
const carAt=p=>[0,1,2,3,4].find(j=>inside(p,carR(j)));
/* 5. ducklings */
function duckXY(i){const x0=A.W*.15,w=A.W*.84;return{x:x0+w*(i+.5)/10,y:A.H*.5,s:Math.min(w/10*.98,A.H*.14)}}
function drawDucks(){const s=M.d,g=A.ctx;back();const t=DUCKS[Math.min(s.k,2)];
 tag(s.k>=3?'Sixth, ninth and tenth found':`Tap the ${WORD[t]} duckling`,A.W/2,A.H*.08,{n:13,ok:s.k>=3});emo('🦆',A.W*.08,A.H*.48,Math.min(A.W*.1,A.H*.2));tag('mum',A.W*.08,A.H*.66,{n:11});
 for(let i=0;i<10;i++){const d=duckXY(i);emo('🐥',d.x,d.y,d.s);if(s.bad===i)ring(d.x,d.y,d.s*.62,NOPE);if(M.cur===i)ring(d.x,d.y,d.s*.7,HI);
  if(s.got.includes(i))tag(SHORT[i],d.x,d.y+d.s*(i%2?1.75:1),{n:10,ok:1})}}
function duck(i){const s=M.d;if(s.k>=3)return;const t=DUCKS[s.k];
 if(i!==t){s.bad=i;A.sound.miss();return say(i===t-1?'So close! Did you count mother duck? She leads, but she is not a duckling. Start at the duckling just behind her.':`That is the ${WORD[i]} duckling. Count again from the duckling behind mum: first, second, third…`)}
 s.got.push(i);s.k++;s.bad=null;M.cur=-1;A.sound.pop();say(`Yes, the ${WORD[t]} duckling.`+(t===9?' The tenth is also the last.':''))}
function duckAt(p){for(let i=0;i<10;i++){const d=duckXY(i);if(Math.abs(p.x-d.x)<d.s*.55&&Math.abs(p.y-d.y)<d.s*.8)return i}return -1}
function draw(){const k=now();if(k==='quiz'){back();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('first, second, third, fourth, fifth',A.W/2,A.H*.5,{n:14});return}
 ({beads:drawBeads,race:drawRace,queue:drawQueue,train:drawTrain,ducks:drawDucks})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='beads'){const i=beadAt(p);if(i>=0)bead(i);return false}
 if(k==='race'){const i=racerAt(p);if(i>=0)ribbon(i);return false}
 if(k==='queue'){const i=kidAt(p);if(i>=0)kid(i);return false}
 if(k==='ducks'){const i=duckAt(p);if(i>=0)duck(i);return false}
 if(k==='train'&&M.t.k<4){if(inside(p,chipR())){M.drag={x:p.x,y:p.y};A.redraw();return true}const j=carAt(p);if(j!=null)seat(j)}return false}
function move(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;A.redraw()}
function up(p){if(!M.drag)return;M.drag=null;const j=carAt(p);if(j!=null)seat(j);else A.redraw()}
function fresh(){ver++;for(const k in M)delete M[k];Object.assign(M,{b:{red:null,blue:[],bad:null},r:{k:0,given:[],bad:null},q:{k:0,bad:null,show:0},t:{k:0,seat:[],bad:null},d:{k:0,got:[],bad:null},drag:null,cur:-1,hook:()=>{}})}
function say(t){if(t)c.say(t);if(t)A.cv.setAttribute('aria-label',t);A.redraw();btns();M.hook()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);M.hook=when(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},ms*(j+1)))}
function btns(){if(!row)return;row.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='beads'&&M.b.blue.length<3)walk(NB,'bead',bead,B);
 if(k==='race'&&M.r.k<3)RACE.forEach((r,i)=>{if(!M.r.given.includes(i))B(`${r[1]} ${r[0]}`,()=>ribbon(i),`Give the ${SHORT[M.r.k]} ribbon to the ${r[0]} in lane ${i+1}`)});
 if(k==='queue'&&M.q.k<4)KN.forEach((n,i)=>B(`${KIDS[i]} ${n}`,()=>kid(i),`${n}, number ${i+1} from the left`));
 if(k==='train'&&M.t.k<4)walk(5,'carriage',seat,B);
 if(k==='ducks'&&M.d.k<3)walk(10,'duckling',duck,B)}
/* button twin for counting along a line: move a highlight from the start, saying each place, then pick */
function walk(n,noun,pick,B){const at=()=>say(`${cap(WORD[M.cur])} ${noun}.`);
 B('◀ Back',()=>{if(M.cur>0){M.cur--;at()}},`Move the highlight back one ${noun}`);B('Move along ▶',()=>{if(M.cur<n-1){M.cur++;at()}},`Move the highlight to the next ${noun}`);
 B(`✓ Pick this ${noun}`,()=>{if(M.cur<0)return say(`Press Move along to start at the first ${noun}.`);pick(M.cur)},`Pick the highlighted ${noun}`)}
const steps=[
{h:'Third or three?',p:'Count the beads from the knot. Tap the third bead. Then tap three beads.',
 predict:{q:'Is "the third bead" the same as "three beads"?',opts:['Yes, both mean 3','No, third is one bead in place 3'],ans:1},task:'Tap the third bead, then three beads',
 show:()=>demo(0,[2,4,5,6].map(i=>()=>bead(i)),700),
 go:()=>open(0,'A string of 7 yellow beads with a knot at the start, on the left.',()=>M.b.blue.length>=3,'The third bead is one bead, in place 3. Three beads is how many. Third says which one.')},
{h:'Who is winning?',p:'The flag is the finish. Give the 1st, 2nd and 3rd ribbons. Tap an animal to give it the ribbon.',
 predict:{q:'The frog is in lane 1. Is the frog first?',opts:['Yes, it is in lane 1','Not if others are ahead of it'],ans:1},task:'Give out the 1st, 2nd and 3rd ribbons',
 show:()=>demo(1,PLACE.slice(0,3).map(i=>()=>ribbon(i)),750),
 go:()=>open(1,'Five animals racing to a flag on the right: frog in lane 1, rabbit, tortoise, dog and cat.',()=>M.r.k>=3,'Rabbit first, cat second, dog third. The frog was in lane 1 but came fourth.')},
{h:'Front of the queue',p:'The front of a queue is next to the bus. Tap the person the question asks for.',
 predict:{q:'If the bus moves to the other end, is the first person still the same?',opts:['Yes, first is always first','No, first is now at the other end'],ans:1},task:'Answer all 4 queue questions',
 show:()=>demo(2,QTASK.map(([sd,o])=>()=>kid(sd==='L'?o:5-o)),800),
 go:()=>open(2,'Six children in a queue. The bus is on the left.',()=>M.q.k>=4,'When the bus moved, Fay was first and Ava was last. Where you start counting changes the order.')},
{h:'All aboard',p:'Count the carriages from the engine. Drag each animal to its carriage, or tap the carriage.',task:'Put all 4 animals in the right carriages',
 show:()=>demo(3,TRAIN.map(t=>()=>seat(t[2])),750),
 go:()=>open(3,'A train: an engine on the left and 5 carriages.',()=>M.t.k>=4,'Pig first, dog second, cow third, duck fifth. The first carriage is the one next to the engine.')},
{h:'Ten ducklings',p:'Mother duck leads. Count the ducklings behind her. Tap the one the question asks for.',task:'Find the 6th, 9th and 10th ducklings',
 show:()=>demo(4,DUCKS.map(t=>()=>duck(t)),750),
 go:()=>open(4,'Mother duck on the left, then 10 ducklings in a line.',()=>M.d.k>=3,'Sixth, ninth, tenth. Mother duck is not counted: the first duckling is the one just behind her.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hook()});
function fix(t){let m='Say the order words as you point: first, second, third, fourth, fifth.';
 if(t==='card')m='Third is not three. Three says how many; third says which place. The third bead is one bead.';
 if(t==='dir')m='Check where to start counting. The front is next to the bus, the engine, or the start of the string.';
 if(t==='label')m='A lane number is a name, not a place. The winner is whoever is ahead.';
 if(t==='word')m='The first three order words are special: first, second, third. Then it goes fourth, fifth, sixth.';
 if(t==='start')m='The leader is not part of the count. Start at the first one behind her.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+fix(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':fix(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{cq.hidden=B.step!==5;row.hidden=B.step===5;btns()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Position buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
