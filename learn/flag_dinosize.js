/* Flagship – dinosaur sizes (ages 5–7): book versus real size, longest versus tallest, film versus real raptor,
   a see-saw with elephants, size words. Data in learn/dinosize_art.js. */
(()=>{const {D,BUS,ROAD,PEOPLE,FILM,SCALE,ELE,WORDS,DESC,DONE,TXT,QS,TALL,END}=DINOSZ;
VIS.reg('flagdinosize',c=>{let A,pad,box,qi=-1,epoch=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',BAD='#b91c1c',RIM='#64748b',SUN='#fde68a',FF='px system-ui,sans-serif';
const now=()=>['road','tall','film','scale','words','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.15);
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dbeafe',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function say(t,x,y,n,col,wt,al){const g=A.ctx;g.font=`${wt||700} ${big(n)}${FF}`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
function head(t,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${FF}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FF}`;w=g.measureText(t).width+24}
 const h=n+15,x0=(A.W-w)/2;g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,11);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?BAD:RIM;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function chip(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.6;g.strokeStyle=o.no?BAD:o.ok?OK:RIM;g.stroke();let n=big(o.n||15);g.font=`800 ${n}${FF}`;
 while(g.measureText(t).width>r.w-10&&n>9){n--;g.font=`800 ${n}${FF}`}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function row(labels,y,h){const n=labels.length,gap=8,w=Math.min(200,(A.W-16-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;h=h||Math.min(A.H*.14,56);
 return labels.map((t,i)=>({i,t,x:x0+i*(w+gap),y:y==null?A.H-h-8:y,w,h}))}
/* a dinosaur facing left: x = nose end, gy = ground, m = pixels per metre */
function dino(id,x,gy,m,o){o=o||{};const d=D[id],g=A.ctx,L=d.L*m,H=d.H*m,lw=Math.max(1.5,Math.min(L,H)*.02);
 g.save();g.fillStyle=o.ghost?'rgba(0,0,0,0)':d.c;g.strokeStyle=o.ghost?A.col.tx:INK;g.lineWidth=lw;if(o.ghost)g.setLineDash([6,5]);
 const body=(cx,cy,rx,ry)=>{g.beginPath();g.ellipse(cx,cy,Math.max(rx,1),Math.max(ry,1),0,0,7);g.fill();g.stroke()};
 const leg=(lx,top,w)=>{g.fillRect(lx-w/2,top,w,gy-top);g.strokeRect(lx-w/2,top,w,gy-top)};
 const tail=(x0,y0,x1,y1,th)=>{g.beginPath();g.moveTo(x0,y0-th);g.quadraticCurveTo((x0+x1)/2,y0-th*.4,x1,y1);g.quadraticCurveTo((x0+x1)/2,y0+th*.6,x0,y0+th);g.closePath();g.fill();g.stroke()};
 if(d.k==='thero'){const by=gy-H*.58;leg(x+L*.36,by,L*.05);leg(x+L*.46,by,L*.05);tail(x+L*.5,by,x+L,by-H*.05,H*.14);body(x+L*.42,by,L*.15,H*.2);
  g.beginPath();g.moveTo(x+L*.3,by-H*.12);g.lineTo(x+L*.16,gy-H*.86);g.lineTo(x+L*.24,gy-H*.78);g.closePath();g.fill();g.stroke();body(x+L*.1,gy-H*.86,L*.1,H*.11)}
 if(d.k==='cera'){const by=gy-H*.55;[.3,.4,.62,.72].forEach(f=>leg(x+L*f,by,L*.06));tail(x+L*.7,by,x+L,by+H*.1,H*.16);body(x+L*.52,by,L*.27,H*.3);
  body(x+L*.2,by-H*.15,L*.08,H*.3);body(x+L*.1,by,L*.09,H*.14);g.beginPath();g.moveTo(x+L*.08,by-H*.12);g.lineTo(x,by-H*.32);g.stroke()}
 if(d.k==='sauro'){const by=gy-H*.6;[.36,.44,.58,.66].forEach(f=>leg(x+L*f,by,L*.03));tail(x+L*.6,by,x+L,by-H*.2,H*.16);body(x+L*.5,by,L*.15,H*.28);
  tail(x+L*.38,by-H*.05,x+L*.04,gy-H*.92,H*.1);body(x+L*.035,gy-H*.92,L*.035,H*.08)}
 if(d.k==='brachio'){const by=gy-H*.42;leg(x+L*.32,by,L*.05);leg(x+L*.4,by,L*.05);leg(x+L*.6,by+H*.05,L*.045);leg(x+L*.68,by+H*.05,L*.045);
  tail(x+L*.6,by,x+L,by+H*.02,H*.06);body(x+L*.5,by,L*.2,H*.12);tail(x+L*.36,by-H*.06,x+L*.12,gy-H*.96,H*.05);body(x+L*.12,gy-H*.96,L*.05,H*.04)}
 g.restore();if(o.name){g.font=`800 ${big(11)}${FF}`;say(d.n,Math.max(x+L/2,g.measureText(d.n).width/2+4),gy+big(12),11,A.col.tx,800)}}
function bus(x,gy,m){const g=A.ctx,L=BUS.L*m,H=BUS.H*m;g.fillStyle='#dc2626';A.paint.rrect(x,gy-H,L,H*.92,Math.min(8,H*.15));g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();
 g.fillStyle='#e0f2fe';for(let r=0;r<2;r++)for(let i=0;i<5;i++)g.fillRect(x+L*(.06+i*.19),gy-H*(.86-r*.42),L*.14,H*.22);
 g.fillStyle='#111827';[.18,.8].forEach(f=>{g.beginPath();g.arc(x+L*f,gy-H*.06,Math.max(2,H*.1),0,7);g.fill()})}
function flats(x,gy,m){const g=A.ctx,H=12*m,W=Math.max(22,5*m);g.fillStyle='#a8a29e';g.fillRect(x,gy-H,W,H);g.strokeStyle=INK;g.lineWidth=1.5;g.strokeRect(x,gy-H,W,H);
 g.fillStyle='#fef9c3';for(let f=0;f<4;f++)g.fillRect(x+W*.25,gy-H*(f+.7)/4,W*.5,H*.12);say('4 floors',x+W/2,gy+big(12),10,A.col.tx,700)}
function person(x,gy,h,col){const g=A.ctx;g.strokeStyle=col||INK;g.fillStyle=col||INK;g.lineWidth=Math.max(2,h*.06);g.lineCap='round';
 g.beginPath();g.arc(x,gy-h*.9,h*.09,0,7);g.fill();g.beginPath();g.moveTo(x,gy-h*.8);g.lineTo(x,gy-h*.45);g.moveTo(x-h*.14,gy);g.lineTo(x,gy-h*.45);g.lineTo(x+h*.14,gy);g.moveTo(x-h*.16,gy-h*.62);g.lineTo(x+h*.16,gy-h*.62);g.stroke()}
function bird(x,gy,h,col){const g=A.ctx;g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=1.5;g.beginPath();g.ellipse(x,gy-h*.5,h*.32,h*.24,0,0,7);g.fill();g.stroke();
 g.beginPath();g.arc(x-h*.22,gy-h*.82,h*.12,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(x-h*.05,gy-h*.28);g.lineTo(x-h*.05,gy);g.moveTo(x+h*.07,gy-h*.28);g.lineTo(x+h*.07,gy);g.stroke()}
function beast(x,gy,h,col,len){const g=A.ctx,l=h*(len||1.2);g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=1.5;[-.32,-.18,.2,.32].forEach(f=>{g.fillRect(x+l*f-1.5,gy-h*.55,3.5,h*.55)});
 g.beginPath();g.ellipse(x,gy-h*.62,l*.42,h*.2,0,0,7);g.fill();g.stroke();g.lineWidth=Math.max(2,h*.1);g.strokeStyle=col;g.beginPath();g.moveTo(x-l*.3,gy-h*.7);g.lineTo(x-l*.42,gy-h*.86);g.moveTo(x+l*.4,gy-h*.66);g.lineTo(x+l*.52,gy-h*.4);g.stroke();g.lineWidth=1.5;g.strokeStyle=INK;g.beginPath();g.ellipse(x-l*.46,gy-h*.9,l*.12,h*.11,0,0,7);g.fill();g.stroke()}
function other(k,x,gy,m){const P=PEOPLE[k],h=P.H*m;if(k==='grown'||k==='child')person(x,gy,h,k==='grown'?'#334155':'#0e7490');else if(k==='turkey'||k==='chicken')bird(x,gy,h,k==='turkey'?'#92400e':'#f59e0b');else beast(x,gy,h,k==='horse'?'#78350f':'#57534e',k==='cat'?1.6:1.3);
 say(P.n,x,gy+big(12),11,A.col.tx,800)}
/* ---------- 1. book size versus real size ---------- */
const roadM=()=>Math.min((A.W-24)/27,A.H*.38/12.5);
function drawRoad(){const s=Z.a;sky();if(s.i>=ROAD.length){head(END[0],A.H*.12,{ok:1});head(END[1],A.H*.3,{n:13});bus(12,A.H*.62,roadM());return}
 const R=ROAD[s.i],d=D[R.d];
 if(s.phase==='book'){head(`In the book: ${d.n} and a bus, same size`,A.H*.08,{n:13});const w=Math.min(A.W*.42,260),h=A.H*.42,y=A.H*.2;
  [[A.W/2-w-8,'d'],[A.W/2+8,'b']].forEach(([x,k])=>{const g=A.ctx;g.fillStyle='#ffffff';A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();
   if(k==='d'){const m=Math.min((w-20)/d.L,(h-36)/d.H);dino(R.d,x+(w-d.L*m)/2,y+h-26,m)}else{const m=(w-20)/BUS.L;bus(x+10,y+h-26,m)}});
  head('Tap to put them on the road',A.H*.75,{n:13});return}
 const m=roadM(),gy=A.H*.58,by=A.H*.74,g=A.ctx;head(`Real size: is ${d.n} longer or shorter than the bus?`,A.H*.07,{n:12,no:s.bad>=0});
 g.strokeStyle=A.col.tx;g.globalAlpha=.35;g.setLineDash([4,4]);g.beginPath();g.moveTo(12+BUS.L*m,A.H*.12);g.lineTo(12+BUS.L*m,by);g.stroke();g.setLineDash([]);g.globalAlpha=1;
 dino(R.d,12,gy,m);bus(12,by,m);say(`${d.n}: about ${d.L} m`,A.W-8,gy+big(10),11,A.col.tx,800,'right');say('Bus: about 11 m',A.W-8,by+big(10),11,A.col.tx,800,'right');
 row(['Longer than the bus','Shorter than the bus']).forEach(r=>chip(r,r.t,{no:s.bad===r.i,n:13}))}
function onRoad(){const s=Z.a;if(s.i>=ROAD.length||s.phase!=='book')return;s.phase='road';s.bad=-1;A.sound.whoosh();tell(`On the road at real size. Is ${D[ROAD[s.i].d].n} longer or shorter than the bus?`)}
function pickRoad(k){const s=Z.a;if(s.i>=ROAD.length)return;if(s.phase!=='road')return tell('Put them on the road first, to see real size.');const R=ROAD[s.i],ans=R.ans==='long'?0:1;
 if(k!==ans){s.bad=k;A.sound.miss();return tell((k===0?'Look at the dashed line at the end of the bus. ':'Look past the end of the bus. ')+R.why)}
 s.i++;s.phase='book';s.bad=-1;A.sound.pop();tell('Yes. '+R.why+(s.i<ROAD.length?' Next dinosaur.':''))}
/* ---------- 2. longest is not tallest ---------- */
const tallM=()=>Math.min((A.W-70)/27,A.H*.3/12.5);
const tallY=k=>A.H*(k?.78:.48);
function drawTall(){const s=Z.b,m=tallM(),g=A.ctx;sky();
 head(s.q>=2?'Diplodocus is longer. Brachiosaurus is taller.':s.q===1?'Which dinosaur is taller?':s.q===0?'Which dinosaur is longer?':'Tap each dinosaur to measure it',A.H*.06,{n:13,no:s.bad>=0,ok:s.q>=2});
 [['brachio',0],['diplo',1]].forEach(([id,k])=>{const gy=tallY(k),d=D[id];g.strokeStyle=A.col.tx;g.lineWidth=1;g.beginPath();g.moveTo(8,gy);g.lineTo(A.W-8,gy);g.stroke();dino(id,12,gy,m);
  if(s.meas[id]){g.strokeStyle=d.c;g.lineWidth=3;g.beginPath();g.moveTo(12,gy+6);g.lineTo(12+d.L*m,gy+6);g.stroke();say(`about ${d.L} m long`,12+d.L*m/2,gy+big(16),11,A.col.tx,800);
   const tx=12+d.L*m+8,far=tx>A.W*.7;g.beginPath();g.moveTo(tx,gy);g.lineTo(tx,gy-d.H*m);g.stroke();say(`about ${Math.round(d.H)} m tall`,far?tx-4:tx+4,gy-d.H*m-big(7),11,A.col.tx,800,far?'right':'left')}
  else say(`Tap to measure ${d.n}`,12+d.L*m/2,gy-d.H*m/2,12,A.col.tx,800)});
 flats(A.W-12-Math.max(22,5*m),tallY(0),m);
 if(s.q===0||s.q===1)row(['Diplodocus','Brachiosaurus'],A.H*.86,Math.min(A.H*.12,50)).forEach(r=>chip(r,r.t,{no:s.bad===r.i}))}
function measure(id){const s=Z.b;if(s.meas[id])return tell(`${D[id].n} is measured already.`);s.meas[id]=1;A.sound.pop();
 if(s.meas.diplo&&s.meas.brachio){s.q=0;return tell('Both measured. Which dinosaur is longer?')}tell(`${D[id].n}: about ${D[id].L} m long and ${Math.round(D[id].H)} m tall. Now measure the other one.`)}
function answerTall(k){const s=Z.b;if(s.q<0)return tell('Measure both dinosaurs first.');if(s.q>1)return;const right=s.q===0?0:1;
 if(k!==right){s.bad=k;A.sound.miss();return tell(s.q===0?TALL.long:TALL.tall)}
 s.bad=-1;s.q++;A.sound.pop();tell(s.q===1?'Yes, Diplodocus is longer. Now: which is taller?':'Yes: Brachiosaurus is taller, with long front legs and its neck up. Longest is not tallest.')}
/* ---------- 3. film raptor versus the real thing ---------- */
function filmLay(){const F=FILM[Math.min(Z.c.r,FILM.length-1)],d=D[F.d],m=Math.min((A.W-40)/(d.L+4.4),A.H*.48/1.9),gy=A.H*.7,x0=12+d.L*m+16,step=(A.W-x0-8)/3;
 return{F,d,m,gy,spots:F.opts.map((k,i)=>({k,i,cx:x0+step*(i+.5),x:x0+step*i,y:gy-Math.max(PEOPLE[k].H*m,30),w:step,h:Math.max(PEOPLE[k].H*m,30)+20}))}}
function drawFilm(){const s=Z.c;sky();if(s.r>=FILM.length){head(END[2],A.H*.14,{ok:1,n:12});head(END[3],A.H*.34,{n:13});return}
 const L=filmLay(),g=A.ctx;head(`Real size: which is closest in size to ${L.d.n}?`,A.H*.07,{n:12,no:!!s.bad});
 g.strokeStyle=A.col.tx;g.lineWidth=1;g.beginPath();g.moveTo(6,L.gy);g.lineTo(A.W-6,L.gy);g.stroke();
 if(L.F.film){const ghostM=L.F.film/D.raptor.H*L.m;dino(L.F.d,12,L.gy,ghostM,{ghost:1});say('film raptor',12+D.raptor.L*ghostM*.3,L.gy-L.F.film*L.m-big(8),10,A.col.tx,700)}
 dino(L.F.d,12,L.gy,L.m,{name:1});L.spots.forEach(p=>other(p.k,p.cx,L.gy,L.m));
 row(L.F.opts.map(k=>PEOPLE[k].n)).forEach(r=>chip(r,r.t,{no:s.bad===L.F.opts[r.i]}))}
function pickFilm(k){const s=Z.c;if(s.r>=FILM.length)return;const F=FILM[s.r];if(k!==F.ans){s.bad=k;A.sound.miss();return tell(F.bad[k])}
 s.bad=0;s.r++;A.sound.pop();tell(F.ok)}
/* ---------- 4. see-saw with elephants ---------- */
function drawScale(){const s=Z.d,g=A.ctx;sky();if(s.r>=SCALE.length){head(END[4],A.H*.14,{ok:1,n:12});return}
 const S=SCALE[s.r],d=D[S.d],diff=S.t-s.ele*ELE,tilt=Math.max(-.22,Math.min(.22,diff*.03)),cx=A.W/2,cy=A.H*.6,arm=A.W*.4;
 head(`How heavy was ${d.n}? Add elephants`,A.H*.07,{n:13,no:!!s.bad});
 g.fillStyle='#78716c';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx-22,cy+A.H*.2);g.lineTo(cx+22,cy+A.H*.2);g.closePath();g.fill();
 g.save();g.translate(cx,cy);g.rotate(-tilt);g.fillStyle='#a16207';g.fillRect(-arm,-6,arm*2,12);g.strokeStyle=INK;g.lineWidth=1.5;g.strokeRect(-arm,-6,arm*2,12);
 const dm=Math.min(arm*.85/d.L,A.H*.2/d.H);dino(S.d,-arm+4,-6,dm);
 for(let i=0;i<s.ele;i++){const e=Math.min(arm*.27,A.H*.17);beast(arm*.18+i*e*1.08+e*.5,-6,e,'#6b7280',1.05)}g.restore();
 say(`${s.ele} elephant${s.ele===1?'':'s'}`,cx+arm*.55,cy+A.H*.28,12,A.col.tx,800);say(diff>0?`${d.n} side is down: heavier`:'Elephant side is down',cx,cy+A.H*.36,12,A.col.tx,800)}
function addEle(){const s=Z.d;if(s.r>=SCALE.length)return;const S=SCALE[s.r];s.ele++;s.bad=0;A.sound.tick();
 if(s.ele*ELE>S.t){const n=s.ele-1,msg=`The elephants went down at ${s.ele}. ${D[S.d].n} was heavier than ${n} big elephant${n>1?'s':''}, but lighter than ${s.ele}.`;s.r++;s.ele=0;A.sound.pop();return tell(msg+(s.r<SCALE.length?' Next dinosaur.':''))}
 tell(`${s.ele} elephant${s.ele>1?'s':''}: ${D[S.d].n} is still heavier. Add another?`)}
function takeEle(){const s=Z.d;if(s.r>=SCALE.length)return;if(!s.ele){s.bad=1;A.sound.miss();return tell('There are no elephants to take off. Add one to see which side goes down.')}s.ele--;A.sound.tick();tell(`${s.ele} elephant${s.ele===1?'':'s'} on the see-saw.`)}
/* ---------- 5. size words ---------- */
function wordOpts(){const W=WORDS[Math.min(Z.e.i,WORDS.length-1)],all=[W.ok,...W.o],r=Z.e.i%3;return all.slice(r).concat(all.slice(0,r))}
function drawWords(){const s=Z.e;sky();if(s.i>=WORDS.length){head('All 4 sentences true',A.H*.14,{ok:1});head('longer, shorter, taller, heavier',A.H*.34,{n:13});return}
 const W=WORDS[s.i];head(`Sentence ${s.i+1} of ${WORDS.length}: fill the gap`,A.H*.07,{n:12,no:!!s.bad});
 head(`${W.s[0]} ____ ${W.s[1]}`,A.H*.32,{n:17});const id=Object.keys(D).find(k=>D[k].n===W.s[0].replace(' was',''));if(id){const d=D[id],m=Math.min(A.W*.5/d.L,A.H*.2/d.H);dino(id,(A.W-d.L*m)/2,A.H*.66,m)}
 row(wordOpts()).forEach(r=>chip(r,r.t,{no:s.bad===r.t,n:14}))}
function pickWord(t){const s=Z.e;if(s.i>=WORDS.length)return;const W=WORDS[s.i];if(t!==W.ok){s.bad=t;A.sound.miss();return tell(`Not "${t}". ${W.why}`)}
 s.bad=0;s.i++;A.sound.pop();tell(`Yes: ${W.s[0]} ${W.ok} ${W.s[1]}`)}
/* ---------- wiring ---------- */
function draw(){const k=now();if(k==='quiz'){sky();head('Challenge',A.H*.2,{ok:1});head(END[5],A.H*.5,{n:12});return}
 ({road:drawRoad,tall:drawTall,film:drawFilm,scale:drawScale,words:drawWords})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='road'){if(Z.a.phase==='book')onRoad();else{const r=row(['a','b']).find(q=>inR(p,q));if(r)pickRoad(r.i)}return false}
 if(k==='tall'){const r=(Z.b.q===0||Z.b.q===1)&&row(['a','b'],A.H*.86,Math.min(A.H*.12,50)).find(q=>inR(p,q));if(r)return answerTall(r.i),false;measure(p.y<(tallY(0)+tallY(1))/2?'brachio':'diplo');return false}
 if(k==='film'&&Z.c.r<FILM.length){const L=filmLay(),r=row(L.F.opts).find(q=>inR(p,q)),sp=L.spots.find(q=>inR(p,q));if(r)pickFilm(L.F.opts[r.i]);else if(sp)pickFilm(sp.k);return false}
 if(k==='scale'){if(p.x>A.W/2)addEle();else takeEle();return false}
 if(k==='words'&&Z.e.i<WORDS.length){const r=row(wordOpts()).find(q=>inR(p,q));if(r)pickWord(r.t);return false}
 return false}
function reset(){epoch++;for(const k in Z)delete Z[k];Object.assign(Z,{a:{i:0,phase:'book',bad:-1},b:{meas:{},q:-1,bad:-1},c:{r:0,bad:0},d:{r:0,ele:0,bad:0},e:{i:0,bad:0},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctrls();Z.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);Z.check=finish(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
function ctrls(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='road'&&Z.a.i<ROAD.length){if(Z.a.phase==='book')B('🛣️ Put them on the road',onRoad);else{B('Longer than the bus',()=>pickRoad(0));B('Shorter than the bus',()=>pickRoad(1))}}
 if(k==='tall'){if(Z.b.q<0){B('📏 Measure Brachiosaurus',()=>measure('brachio'));B('📏 Measure Diplodocus',()=>measure('diplo'))}else if(Z.b.q<2){B('Diplodocus',()=>answerTall(0));B('Brachiosaurus',()=>answerTall(1))}}
 if(k==='film'&&Z.c.r<FILM.length)FILM[Z.c.r].opts.forEach(o=>B(PEOPLE[o].n,()=>pickFilm(o),`Closest in size: ${PEOPLE[o].n}`));
 if(k==='scale'&&Z.d.r<SCALE.length){B('🐘 Add an elephant',addEle);B('Take one off',takeEle,'Take an elephant off')}
 if(k==='words'&&Z.e.i<WORDS.length)wordOpts().forEach(t=>B(t,()=>pickWord(t)))}
const steps=[
{h:'Book size, real size',p:TXT[0],predict:{q:'Were all dinosaurs bigger than a bus?',opts:['Yes, they were all huge','No, some were tiny'],ans:1},task:'Check all 4 dinosaurs',
 show:()=>auto(0,ROAD.flatMap(R=>[onRoad,()=>pickRoad(R.ans==='long'?0:1)]),360),go:()=>begin(0,()=>Z.a.i>=ROAD.length)},
{h:'Longest or tallest?',p:TXT[1],predict:{q:'Diplodocus is the longest here. Is it the tallest too?',opts:['Yes, longest means tallest','No, another can be taller'],ans:1},task:'Measure both and answer',
 show:()=>auto(1,[()=>measure('brachio'),()=>measure('diplo'),()=>answerTall(0),()=>answerTall(1)],420),go:()=>begin(1,()=>Z.b.q>=2)},
{h:'Film or fossil?',p:TXT[2],predict:{q:'In films, raptors are as tall as a grown-up. Was a real Velociraptor that big?',opts:['Yes, films show real size','No, it was much smaller'],ans:1},task:'Size up both dinosaurs',
 show:()=>auto(2,FILM.map(F=>()=>pickFilm(F.ans)),500),go:()=>begin(2,()=>Z.c.r>=FILM.length)},
{h:'Heavier than',p:TXT[3],task:'Weigh T. rex and Diplodocus',
 show:()=>auto(3,SCALE.flatMap(S=>[...Array(S.ans+1)].map(()=>addEle)),300),go:()=>begin(3,()=>Z.d.r>=SCALE.length)},
{h:'Size words',p:TXT[4],task:'Fill all 4 gaps',show:()=>auto(4,WORDS.map(W=>()=>pickWord(W.ok)),420),go:()=>begin(4,()=>Z.e.i>=WORDS.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
function why(t){let m='Compare with something you know, like a bus, a house or an elephant.';
 if(t==='allbig')m='Not all dinosaurs were huge. Compsognathus was about the size of a chicken.';
 if(t==='book')m='Pictures in books are drawn to fit the page, not at real size. Put them side by side at real size.';
 if(t==='longtall')m='Longest is not tallest. Diplodocus was longer, but Brachiosaurus held its head much higher.';
 if(t==='film')m='Film raptors are too big. A real Velociraptor was about the size of a turkey.';
 if(t==='word')m='Pick the word for what is being compared: heavier for weight, longer for length, taller for height.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;ctrls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dinosaur size lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});ctrls()}}).start()})})();
