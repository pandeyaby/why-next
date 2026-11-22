/* Flagship – animal record-holders (ages 5–7): a race on land, a falcon dive against a cheetah, a blue whale measured in
   cars, a tape up a giraffe and an elephant, and birds put in size order. Data in learn/animrec_art.js. */
(()=>{const {RUN,RUNQ,DIVE,DIVEQ,WHALE,CAR,CARS,TALL,GROWN,TOL,TAPE,TALLQ,BIRDS,SHUF,DESC,DONE,TXT,QS,END}=ANIMREC;
VIS.reg('flaganimrec',c=>{let A,pad,box,qi=-1,run=0;const Z={};c.fig.classList.add('young');
const DARK='#0f172a',GOOD='#047857',WRONG='#b91c1c',EDGE='#64748b',FONT='px system-ui,sans-serif';
const scene=()=>['race','dive','whale','tall','birds','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(top){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.55);g.fillRect(0,0,A.W,A.H);
 if(top!=null){g.fillStyle=A.mix(A.col.pn,'#bbf7d0',A.col.dark?.1:.6);g.fillRect(0,top,A.W,A.H-top)}}
function write(t,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${fs(n)}${FONT}`;g.fillStyle=o.col||A.col.tx;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
function banner(t,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+26;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+26}
 const h=n+16;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?WRONG:EDGE;g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,13);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.6;g.strokeStyle=o.no?WRONG:o.ok?GOOD:EDGE;g.stroke();let n=fs(o.n||15);g.font=`800 ${n}${FONT}`;
 while(g.measureText(t).width>r.w-12&&n>9){n--;g.font=`800 ${n}${FONT}`}g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function chips(names,y){const k=names.length,gap=8,w=Math.min(210,(A.W-16-gap*(k-1))/k),h=Math.min(A.H*.13,54),x0=(A.W-(w*k+gap*(k-1)))/2;
 return names.map((t,i)=>({i,t,x:x0+i*(w+gap),y:y==null?A.H-h-8:y,w,h}))}
let quad,runner,falcon,whale,car,grown,giraffe,elephant,bird;
/* ---------- 1. a race on land ---------- */
const lanes=()=>RUN.map((R,i)=>{const top=A.H*.15,hh=(A.H*.84-top)/RUN.length;return{R,i,y:top+hh*i,h:hh,gy:top+hh*(i+1)-6}});
const trackX=()=>({x0:16,x1:A.W-34});
function drawRace(){const s=Z.a,g=A.ctx,T=trackX();ground();
 banner(s.run<2?(s.run?'Go!':'Who will win? Tap Go'):s.q<RUNQ.length?RUNQ[s.q].q:'Cheetah first. Elephant last.',A.H*.07,{n:13,no:!!s.bad,ok:s.q>=RUNQ.length});
 lanes().forEach(L=>{g.fillStyle=L.i%2?A.mix(A.col.pn,'#fde68a',A.col.dark?.1:.45):A.mix(A.col.pn,'#fef3c7',A.col.dark?.08:.6);g.fillRect(0,L.y,A.W,L.h);
  if(s.bad===L.R.k){g.strokeStyle=WRONG;g.lineWidth=3;g.strokeRect(2,L.y+2,A.W-4,L.h-4)}
  const x=T.x0+(T.x1-T.x0)*Math.min(1,s.t*L.R.v/100),hh=Math.min(L.h*.78,60)*({cheetah:.62,horse:.85,person:.8,ele:1}[L.R.k]);runner(L.R.k,Math.max(T.x0+hh*.7,x-hh*.5),L.gy,hh);
  write(L.R.n+(s.run===2?` · about ${L.R.v} km/h`:''),T.x0+4,L.y+fs(9),10,{al:'left',w:700})});
 g.fillStyle='#dc2626';g.fillRect(T.x1+4,A.H*.15,4,A.H*.58);g.beginPath();g.moveTo(T.x1+8,A.H*.15);g.lineTo(T.x1+28,A.H*.19);g.lineTo(T.x1+8,A.H*.23);g.closePath();g.fill();
 if(s.run===2&&s.q<RUNQ.length)chips(RUN.map(R=>R.n)).forEach(r=>pill(r,r.t,{no:s.bad===RUN[r.i].k,n:13}))}
function startRace(){const s=Z.a;if(s.run)return tell(s.run===1?'The race is on.':'The race is over. '+(s.q<RUNQ.length?RUNQ[s.q].q:''));s.run=1;A.sound.whoosh();tell('Go! Watch the flag.');
 const e=run;A.tween(s,{t:1},1800,'io',()=>{if(e!==run)return;s.run=2;tell('Finished. '+RUNQ[0].q)})}
function pickRunner(k){const s=Z.a;if(s.run<2)return tell('Tap Go first, then see who wins.');if(s.q>=RUNQ.length)return;const Q=RUNQ[s.q];
 if(k!==Q.ans){s.bad=k;A.sound.miss();return tell(Q.bad[k])}s.bad=null;s.q++;A.sound.pop();tell(s.q===1?'Yes, the cheetah won: it can run about 100 km/h. Now, who came last?':'Yes: the elephant came last. The biggest animal here was the slowest.')}
/* ---------- 2. the falcon's dive ---------- */
function diveLay(){return{sx:A.W*.08,sy:A.H*.22,ex:A.W*.92,ey:A.H*.58,gy:A.H*.76,cx0:A.W*.08,cx1:A.W*.92}}
function drawDive(){const s=Z.b,L=diveLay(),g=A.ctx;ground(L.gy);
 banner(s.run<2?(s.run?'Dive!':'Falcon dive or cheetah run? Tap Race'):s.q<DIVEQ.length?DIVEQ[s.q].q:'Fastest of all: the falcon',A.H*.06,{n:13,no:s.bad>=0,ok:s.q>=DIVEQ.length});
 g.setLineDash([5,5]);g.strokeStyle=A.col.tx;g.globalAlpha=.4;g.lineWidth=1.5;g.beginPath();g.moveTo(L.sx,L.sy);g.lineTo(L.ex,L.ey);g.moveTo(L.cx0,L.gy);g.lineTo(L.cx1,L.gy);g.stroke();g.setLineDash([]);g.globalAlpha=1;
 const f=Math.min(1,s.t),fx=L.sx+(L.ex-L.sx)*f,fy=L.sy+(L.ey-L.sy)*f;falcon(fx,fy,Math.min(A.W*.05,24));
 {const t=s.run===2?'Falcon dive: more than 300 km/h':'Peregrine falcon';A.ctx.font=`800 ${fs(11)}${FONT}`;const hw=A.ctx.measureText(t).width/2+6;write(t,Math.max(hw,Math.min(A.W-hw,fx)),fy-fs(20),11)}
 const cf=Math.min(1,s.t*DIVE.cheetah/DIVE.falcon),cx=L.cx0+(L.cx1-L.cx0)*cf;runner('cheetah',Math.max(L.cx0+20,cx-16),L.gy,Math.min(A.H*.12,44));
 write(s.run===2?'Cheetah: about 100 km/h':'Cheetah',Math.max(70,Math.min(A.W-80,cx)),L.gy+fs(14),11);
 if(s.run===2&&s.q<DIVEQ.length)chips(DIVEQ[s.q].opts).forEach(r=>pill(r,r.t,{no:s.bad===r.i}))}
function startDive(){const s=Z.b;if(s.run)return tell(s.run===1?'They are racing.':'Done. '+(s.q<DIVEQ.length?DIVEQ[s.q].q:''));s.run=1;A.sound.whoosh();tell('Race! The falcon dives and the cheetah runs, for the same time.');
 const e=run;A.tween(s,{t:1},1500,'io',()=>{if(e!==run)return;s.run=2;tell('Same time, but the falcon went about 3 times as far. '+DIVEQ[0].q)})}
function pickDive(i){const s=Z.b;if(s.run<2)return tell('Tap Race first.');if(s.q>=DIVEQ.length)return;const Q=DIVEQ[s.q];
 if(i!==Q.ans){s.bad=i;A.sound.miss();return tell(Q.bad)}s.bad=-1;s.q++;A.sound.pop();tell(s.q===1?'Yes, the falcon was faster. Now finish the sentence: the cheetah is the fastest animal ...':'Yes: the cheetah is the fastest on land. The falcon is the fastest of all.')}
/* ---------- 3. a blue whale in cars ---------- */
const whaleM=()=>(A.W-28)/(WHALE+2);
function drawWhale(){const s=Z.c,m=whaleM(),g=A.ctx,wy=A.H*.42,ry=A.H*.74;ground(A.H*.58);
 banner(s.n>=CARS?'About 5 cars long!':`Cars in a line: ${s.n}. Is it as long as the whale?`,A.H*.07,{n:13,ok:s.n>=CARS,no:s.bad});
 whale(14,wy,WHALE*m,Math.max(26,WHALE*m*.14));write('Blue whale: about 25 m',A.W/2,wy+Math.max(26,WHALE*m*.14)*.5+fs(12),12);
 g.strokeStyle=A.col.tx;g.globalAlpha=.35;g.setLineDash([4,4]);g.beginPath();g.moveTo(14+WHALE*m,A.H*.16);g.lineTo(14+WHALE*m,ry+6);g.stroke();g.setLineDash([]);g.globalAlpha=1;
 g.fillStyle='#57534e';g.fillRect(0,ry,A.W,5);const cols=['#dc2626','#2563eb','#ca8a04','#7c3aed','#0f766e','#db2777'];
 for(let i=0;i<s.n;i++){car(14+i*CAR*m,ry,CAR*m,cols[i%cols.length]);write(String(i+1),14+(i+.5)*CAR*m,ry+fs(16),13)}
 grown(A.W-14-6,ry,GROWN*m*1.0,A.col.tx);write('you',A.W-20,ry-GROWN*m-fs(8),10,{w:700})}
function addCar(){const s=Z.c;if(s.n>=CARS)return tell('The cars already reach the whale\u2019s tail: about 5 cars.');s.n++;s.bad=false;A.sound.tick();
 tell(s.n>=CARS?'5 cars reach the tail. A blue whale is about as long as 5 cars: the biggest animal that has ever lived.':`${s.n} car${s.n>1?'s':''}. The whale is still longer. Add another?`)}
function takeCar(){const s=Z.c;if(s.n>=CARS)return tell('Done: about 5 cars long.');if(!s.n){s.bad=true;A.sound.miss();return tell('There are no cars yet. Add one.')}s.n--;A.sound.tick();tell(`${s.n} car${s.n===1?'':'s'} in the line.`)}
/* ---------- 4. a tape up the tallest ---------- */
const tallM=()=>A.H*.6/6.4,tallGY=()=>A.H*.82;
const cols4=()=>TALL.map((T,i)=>{const w=A.W/2;return{T,i,x:w*i,w,cx:w*i+w*(i?.45:.52),tx:w*i+w*.93}});
function drawTall(){const s=Z.d,m=tallM(),gy=tallGY(),g=A.ctx;ground(gy);
 banner(s.q?'Tallest: the giraffe, about 3 grown-ups':s.m.every(Boolean)?TALLQ.q:`Drag the tape to the top of the ${TALL[cur()].n.toLowerCase()}`,A.H*.06,{n:12,ok:s.q,no:s.bad!=null});
 cols4().forEach(C=>{const T=C.T,h=T.h*m;if(T.k==='giraffe')giraffe(C.cx,gy,h,T.c);else elephant(Math.min(C.cx,C.tx-h*.85),gy,h,T.c);
  write(T.n,C.cx,gy+fs(13),12);const th=s.h[C.i]*m;g.fillStyle='#fef08a';g.fillRect(C.tx-5,gy-th,10,th);g.strokeStyle=DARK;g.lineWidth=1.2;g.strokeRect(C.tx-5,gy-th,10,th);
  g.fillStyle=s.m[C.i]?GOOD:'#2563eb';g.beginPath();g.arc(C.tx,gy-th,9,0,7);g.fill();write(`${s.h[C.i].toFixed(1)} m`,C.tx-8,gy-th-fs(16),11,{al:'right'});
  if(s.m[C.i]&&T.k==='giraffe')for(let j=0;j<3;j++)grown(C.x+C.w*.1,gy-j*GROWN*m,GROWN*m,'#0e7490')});
 if(s.m.every(Boolean)&&!s.q)chips(TALLQ.opts).forEach(r=>pill(r,r.t,{no:s.bad===r.i}))}
const cur=()=>{const i=Z.d.m.findIndex(v=>!v);return i<0?TALL.length-1:i};
function tapeCheck(i){const s=Z.d,T=TALL[i];if(s.m[i])return;if(Math.abs(s.h[i]-T.h)<=TOL){s.h[i]=T.h;s.m[i]=1;A.sound.pop();
  return tell(s.m.every(Boolean)?`Both measured: giraffe ${TALL[0].h} m, elephant ${TALL[1].h} m. ${TALLQ.q}`:`${T.n}: about ${T.h} m tall. Now the ${TALL[1-i].n.toLowerCase()}.`)}
 tell(s.h[i]<T.h?`${s.h[i].toFixed(1)} m: the tape is below the top of the ${T.n.toLowerCase()}. Go higher.`:`${s.h[i].toFixed(1)} m: too high, above the ${T.n.toLowerCase()}\u2019s head. Go lower.`)}
function tape(d){const i=cur(),s=Z.d;if(s.m.every(Boolean))return tell('Both are measured.');s.h[i]=Math.max(0,Math.min(6.5,Math.round((s.h[i]+d)*2)/2));A.sound.tick();tapeCheck(i)}
function pickTall(i){const s=Z.d;if(!s.m.every(Boolean))return tell('Measure both first.');if(s.q)return;if(i!==TALLQ.ans){s.bad=i;A.sound.miss();return tell(TALLQ.bad[i])}
 s.q=1;s.bad=null;A.sound.pop();tell('Yes: about 3 grown-ups tall. The elephant is heavier, but the giraffe is much taller.')}
/* ---------- 5. birds in size order ---------- */
function cards(){const n=SHUF.length,two=A.narrow,cw=two?(A.W-30)/2:(A.W-50)/4,ch=two?A.H*.27:A.H*.4,top=A.H*.16;
 return SHUF.map((k,i)=>({k,x:two?10+(i%2)*(cw+10):10+i*(cw+10),y:two?top+Math.floor(i/2)*(ch+10):top,w:cw,h:ch}))}
function drawBirds(){const s=Z.e,g=A.ctx;ground();const all=s.got.length>=BIRDS.length;
 banner(all?'Smallest to biggest: done':`Tap the ${s.got.length?'next smallest':'smallest'} bird`,A.H*.07,{n:13,ok:all,no:!!s.bad});
 if(all){const base=A.H*.8,m=A.H*.56/250;g.fillStyle='#ffffff';A.paint.rrect(6,A.H*.13,A.W-12,A.H*.85,12);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();write('Real size, side by side',A.W/2,A.H*.19,12,{col:DARK});BIRDS.forEach((B,i)=>{const x=A.W*[.12,.32,.52,.74][i],h=Math.max(3,B.cm*m);
   bird(x,base,Math.max(h,6),B.c,{legs:B.k==='ostrich'||B.k==='hen',beak:B.k==='bee'?.7:.44});write(i?B.n:'Bee humming-',Math.max(x,30),base+fs(13),11,{col:DARK});if(!i)write('bird',x,base+fs(25),11,{col:DARK});write(B.cm<100?`about ${B.cm} cm`:'about 2.5 m',Math.max(x,30),base+fs(i?28:38),10,{w:700,col:DARK})});return}
 cards().forEach(C=>{const B=BIRDS.find(b=>b.k===C.k),n=s.got.indexOf(C.k);g.fillStyle=n>=0?'#dcfce7':s.bad===C.k?'#fee2e2':'#ffffff';A.paint.rrect(C.x,C.y,C.w,C.h,12);g.fill();
  g.lineWidth=n>=0||s.bad===C.k?3:1.5;g.strokeStyle=n>=0?GOOD:s.bad===C.k?WRONG:EDGE;g.stroke();bird(C.x+C.w/2,C.y+C.h*.74,C.h*.58,B.c,{legs:B.k==='ostrich'||B.k==='hen',beak:B.k==='bee'?.7:.44});
  write(B.n,C.x+C.w/2,C.y+C.h*.88,11,{col:DARK});if(n>=0)write(String(n+1),C.x+18,C.y+18,15,{col:GOOD})})}
function pickBird(k){const s=Z.e;if(s.got.length>=BIRDS.length||s.got.includes(k))return tell(s.got.includes(k)?'That one is in order already.':'All in order.');
 const want=BIRDS[s.got.length],B=BIRDS.find(b=>b.k===k);if(k!==want.k){s.bad=k;A.sound.miss();
  return tell(`Not yet. ${/^[aeiou]/i.test(B.n)?'An':'A'} ${B.n.toLowerCase()} is about ${B.cm<100?B.cm+' cm':'2.5 m'}, but the ${want.n.toLowerCase()} is smaller: about ${want.cm} cm. The cards make them look the same size.`)}
 s.got.push(k);s.bad=null;A.sound.pop();tell(s.got.length>=BIRDS.length?'Yes! Bee hummingbird, robin, chicken, ostrich. The bee hummingbird is the smallest bird: shorter than your thumb.':`Yes: ${B.n}, about ${B.cm} cm. Which bird is next smallest?`)}
/* ---------- wiring ---------- */
function draw(){const k=scene();if(k==='quiz'){ground();banner('Challenge',A.H*.14,{ok:1});END.forEach((t,i)=>banner(t,A.H*(.3+i*.13),{n:12}));return}
 ({race:drawRace,dive:drawDive,whale:drawWhale,tall:drawTall,birds:drawBirds})[k]();A.fx.draw(A.ctx)}
let dragI=-1;
function down(p){const k=scene();
 if(k==='race'){if(Z.a.run<2)startRace();else{const r=chips(RUN.map(R=>R.n)).find(q=>hit(p,q));if(r)pickRunner(RUN[r.i].k);else{const L=lanes().find(l=>p.y>=l.y&&p.y<=l.y+l.h);if(L&&Z.a.q<RUNQ.length)pickRunner(L.R.k)}}return false}
 if(k==='dive'){if(Z.b.run<2)startDive();else if(Z.b.q<DIVEQ.length){const r=chips(DIVEQ[Z.b.q].opts).find(q=>hit(p,q));if(r)pickDive(r.i)}return false}
 if(k==='whale'){if(p.x>A.W*.25)addCar();else takeCar();return false}
 if(k==='tall'){const s=Z.d;if(s.m.every(Boolean)){const r=!s.q&&chips(TALLQ.opts).find(q=>hit(p,q));if(r)pickTall(r.i);return false}
  const C=cols4().find(q=>p.x>=q.x&&p.x<=q.x+q.w);if(!C||s.m[C.i])return false;if(C.i!==cur()){tell(`Measure the ${TALL[cur()].n.toLowerCase()} first.`);return false}
  dragI=C.i;move(p);return true}
 if(k==='birds'){const C=cards().find(q=>hit(p,q));if(C)pickBird(C.k);return false}
 return false}
function move(p){if(dragI<0)return;const s=Z.d;s.h[dragI]=Math.max(0,Math.min(6.5,Math.round((tallGY()-p.y)/tallM()*10)/10));c.say(`Tape at ${s.h[dragI].toFixed(1)} m`);A.redraw()}
function up(){if(dragI<0)return;const i=dragI;dragI=-1;tapeCheck(i)}
function reset(){run++;dragI=-1;for(const k in Z)delete Z[k];Object.assign(Z,{a:{t:0,run:0,q:0,bad:null},b:{t:0,run:0,q:0,bad:-1},c:{n:0,bad:false},d:{h:[0,0],m:[0,0],q:0,bad:null},e:{got:[],bad:null},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctrls();Z.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);Z.check=finish(i,ok,DONE[i])}
function auto(i,plan){steps[i].go();const e=run;plan.forEach(([ms,f])=>setTimeout(()=>{if(e===run)f()},ms))}
function ctrls(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='race'){if(Z.a.run<2)B('Go!',startRace,'Go! Start the race');else if(Z.a.q<RUNQ.length)RUN.forEach(R=>B(R.n,()=>pickRunner(R.k),`${RUNQ[Z.a.q].q} ${R.n}`))}
 if(k==='dive'){if(Z.b.run<2)B('Race!',startDive,'Race! Falcon dive against cheetah');else if(Z.b.q<DIVEQ.length)DIVEQ[Z.b.q].opts.forEach((o,i)=>B(o,()=>pickDive(i)))}
 if(k==='whale'&&Z.c.n<CARS){B('Add a car',addCar);B('Take a car away',takeCar)}
 if(k==='tall'){const s=Z.d;if(!s.m.every(Boolean)){const n=TALL[cur()].n.toLowerCase();B('Tape up',()=>tape(TAPE),`Tape up beside the ${n}`);B('Tape down',()=>tape(-TAPE),`Tape down beside the ${n}`)}else if(!s.q)TALLQ.opts.forEach((o,i)=>B(o+' grown-up'+(o==='1'?'':'s'),()=>pickTall(i)))}
 if(k==='birds'&&Z.e.got.length<BIRDS.length)SHUF.forEach(b=>{const n=BIRDS.find(x=>x.k===b).n;B(n,()=>pickBird(b),`Next smallest: ${n}`)})}
const steps=[
{h:'Race on land',p:TXT[0],predict:{q:'Who will win a race on land?',opts:['The elephant: it is the biggest','The cheetah'],ans:1},task:'Race them, then pick the winner and the last',
 show:()=>auto(0,[[200,startRace],[2300,()=>pickRunner('cheetah')],[2700,()=>pickRunner('ele')]]),go:()=>begin(0,()=>Z.a.q>=RUNQ.length)},
{h:'Fastest of all',p:TXT[1],predict:{q:'Is the cheetah the fastest animal of all?',opts:['Yes, nothing is faster','No, a bird is faster'],ans:1},task:'Race the dive and finish the sentence',
 show:()=>auto(1,[[200,startDive],[2000,()=>pickDive(0)],[2400,()=>pickDive(0)]]),go:()=>begin(1,()=>Z.b.q>=DIVEQ.length)},
{h:'Biggest ever',p:TXT[2],predict:{q:'What is the biggest animal that has ever lived?',opts:['A giant dinosaur','The blue whale, alive today'],ans:1},task:'Line up cars to the whale\u2019s tail',
 show:()=>auto(2,[...Array(CARS)].map((_,j)=>[300*(j+1),addCar])),go:()=>begin(2,()=>Z.c.n>=CARS)},
{h:'Tallest',p:TXT[3],task:'Measure both, then count grown-ups',
 show:()=>auto(3,[[300,()=>{Z.d.h[0]=TALL[0].h;tapeCheck(0)}],[800,()=>{Z.d.h[1]=TALL[1].h;tapeCheck(1)}],[1300,()=>pickTall(0)]]),go:()=>begin(3,()=>!!Z.d.q)},
{h:'Smallest bird',p:TXT[4],task:'Put all 4 birds in order',show:()=>auto(4,BIRDS.map((b,j)=>[350*(j+1),()=>pickBird(b.k)])),go:()=>begin(4,()=>Z.e.got.length>=BIRDS.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
function why(t){let m='Think about the record: fastest, biggest, tallest or smallest each beat all the others at one thing.';
 if(t==='bigfast')m='Big does not mean fast. The elephant is big but came last; the cheetah is the fastest on land.';
 if(t==='cheetah')m='The cheetah is the fastest on land. The peregrine falcon is faster still when it dives: more than 300 km/h.';
 if(t==='dino')m='No dinosaur was as heavy as a blue whale. A big blue whale is about 25 m long: about 5 cars in a line.';
 if(t==='heavytall')m='Heaviest is not tallest. The giraffe is the tallest animal, about 3 grown-ups high.';
 if(t==='book')m='Book pictures are not real size. The bee hummingbird is about 5 cm long, shorter than your thumb.';
 if(t==='land')m='Close, but not the record. The record-holder beats every other animal at that one thing.';
 if(t==='word')m='"-est" words like fastest, biggest and tallest mean more than all the others.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge. Records: '+END.join('. ')+'.');A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;ctrls()},
 init:X=>{A=X;({quad,runner,falcon,whale,car,grown,giraffe,elephant,bird}=ANIMREC_SHAPES(A));const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Animal records lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrls()}}).start()})})();
