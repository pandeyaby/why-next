/* Flagship – estimating lengths (ages 7–8). Scenes: learn four benchmark lengths (1 cm fingertip, 30 cm ruler, 1 m up
   to a door handle, 2 m door), pick the estimate with a sensible unit, lay a known length again and again along a thing
   and turn the count into cm or m, drag a marker to estimate then measure and see how close you were, and check a
   robot. Data in learn/estlen_art.js. Distinct from flagunits (which unit fits) and flagscale (reading a scale):
   here the child builds a sense of size and judges how close an estimate is. */
(()=>{const E=ELN;
VIS.reg('flagestlen',c=>{let A,ctl,chq,qn=-1,run=0;const st={};c.fig.classList.add('young');
const TXT='#111827',OK='#15803d',NO='#b91c1c',RIM='#94a3b8',WALL='#fef3c7',FLOOR='#e7e5e4',WOOD='#b45309',TAPE='#facc15',FF='px system-ui,sans-serif';
const mode=()=>['bench','sense','lay','guess','robot','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.2);
const hit=(p,b)=>b&&p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function room(){const g=A.ctx;g.fillStyle=WALL;g.fillRect(0,0,A.W,A.H*.8);g.fillStyle=FLOOR;g.fillRect(0,A.H*.8,A.W,A.H*.2)}
/* a speech-bubble banner: white box, dark text, sized to its words */
function banner(words,cx,cy,opt){opt=opt||{};const g=A.ctx;let fs=big(opt.n||14);g.font=`800 ${fs}${FF}`;let tw=g.measureText(words).width;
 while(tw+28>A.W-8&&fs>10){fs--;g.font=`800 ${fs}${FF}`;tw=g.measureText(words).width}
 const bw=tw+28,bh=fs+18,bx=Math.min(Math.max(4,cx-bw/2),A.W-bw-4);g.fillStyle='#ffffff';A.paint.rrect(bx,cy-bh/2,bw,bh,8);g.fill();
 g.strokeStyle=opt.ok?OK:opt.no?NO:RIM;g.lineWidth=opt.ok||opt.no?3:1.5;g.stroke();g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(words,bx+bw/2,cy+1)}
/* a button drawn on the canvas, with words split over two lines if needed */
function key(b,opt){opt=opt||{};const g=A.ctx;g.fillStyle=opt.no?'#fee2e2':opt.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.strokeStyle=opt.no?NO:opt.ok?OK:RIM;g.lineWidth=opt.no||opt.ok?3.5:1.5;g.stroke();if(!b.t)return;
 let fs=big(opt.n||13);g.font=`800 ${fs}${FF}`;const lim=b.w-12,parts=b.t.split(' ');let lines=[b.t];
 if(g.measureText(b.t).width>lim&&parts.length>1){let best=1,gap=1e9;for(let k=1;k<parts.length;k++){const d=Math.abs(parts.slice(0,k).join(' ').length-parts.slice(k).join(' ').length);if(d<gap){gap=d;best=k}}lines=[parts.slice(0,best).join(' '),parts.slice(best).join(' ')]}
 while(fs>9&&lines.some(l=>g.measureText(l).width>lim)){fs--;g.font=`800 ${fs}${FF}`}
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,k)=>g.fillText(l,b.x+b.w/2,b.y+b.h/2+1+(k-(lines.length-1)/2)*(fs+3)))}
function keys(words,top,cols,hmax){const n=words.length,cl=cols||n,sp=8,w=(A.W-16-sp*(cl-1))/cl,h=Math.min(hmax,58);return words.map((t,i)=>({i,t,x:8+(i%cl)*(w+sp),y:top+Math.floor(i/cl)*(h+sp),w,h}))}
/* small pictures of the four benchmarks inside a box */
function icon(kind,b){const g=A.ctx,cx=b.x+b.w/2,top=b.y+8,h=b.h-34,u=Math.min(b.w*.5,h);g.save();
 if(kind==='tip'){g.fillStyle='#fca5a5';A.paint.rrect(cx-u*.18,top+h*.25,u*.36,h*.75,u*.18);g.fill();g.fillStyle='#fecaca';A.paint.rrect(cx-u*.12,top+h*.3,u*.24,h*.22,u*.08);g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.beginPath();g.moveTo(cx-u*.18,top+h*.15);g.lineTo(cx+u*.18,top+h*.15);g.stroke()}
 if(kind==='ruler'){g.fillStyle=TAPE;g.fillRect(b.x+10,top+h*.4,b.w-20,h*.25);g.strokeStyle=TXT;g.lineWidth=1;g.strokeRect(b.x+10,top+h*.4,b.w-20,h*.25);for(let k=0;k<=10;k++){const x=b.x+10+(b.w-20)*k/10;g.beginPath();g.moveTo(x,top+h*.4);g.lineTo(x,top+h*(k%5?.48:.55));g.stroke()}}
 if(kind==='handle'||kind==='door'){const dw=u*.55,dx=cx-dw/2;g.fillStyle=WOOD;g.fillRect(dx,top,dw,h);g.fillStyle='#fde68a';g.beginPath();g.arc(dx+dw*.8,top+h*.5,Math.max(3,u*.05),0,7);g.fill();
  g.strokeStyle=NO;g.lineWidth=3;g.beginPath();const y0=kind==='door'?top:top+h*.5;g.moveTo(dx-8,y0);g.lineTo(dx-8,top+h);g.stroke();[y0,top+h].forEach(y=>{g.beginPath();g.moveTo(dx-13,y);g.lineTo(dx-3,y);g.stroke()})}
 g.restore();g.fillStyle=TXT;g.font=`800 ${big(11)}${FF}`;g.textAlign='center';g.textBaseline='middle';const words=E.BENCH.find(q=>q.icon===kind).thing;
 let f=big(11);while(f>8&&g.measureText(words).width>b.w-6){f--;g.font=`800 ${f}${FF}`}g.fillText(words,cx,b.y+b.h-13)}
/* 1. benchmark lengths */
const benchOrder=()=>{const r=st.bench.i%4;return[0,1,2,3].slice(r).concat([0,1,2,3].slice(0,r))};
const benchBoxes=()=>{const ord=benchOrder(),cols=A.narrow?2:4,sp=8,w=(A.W-16-sp*(cols-1))/cols,h=A.narrow?A.H*.3:A.H*.52;return ord.map((k,j)=>({i:k,x:8+(j%cols)*(w+sp),y:A.H*.2+Math.floor(j/cols)*(h+sp),w,h}))};
function drawBench(){const s=st.bench;room();if(s.i>=E.ASK.length){banner('All 4 lengths matched',A.W/2,A.H*.16,{ok:1});banner('1 cm, 30 cm, 1 m and 2 m',A.W/2,A.H*.4);return}
 const B=E.BENCH[E.ASK[s.i]];banner(`Length ${s.i+1} of ${E.ASK.length}: what is about ${B.len}?`,A.W/2,A.H*.08,{n:13});
 benchBoxes().forEach(b=>{key(b,{no:s.miss===b.i});icon(E.BENCH[b.i].icon,b)})}
function benchTap(k){const s=st.bench;if(s.i>=E.ASK.length)return;const want=E.ASK[s.i],B=E.BENCH[want];
 if(k!==want){s.miss=k;A.sound.miss();return talk(`Not that one. ${E.BENCHWHY[E.BENCH[k].icon]} We want about ${B.len}.`)}
 s.miss=-1;s.i++;A.sound.pop();talk(`Yes: ${B.thing.toLowerCase()} is about ${B.len}.`+(s.i<E.ASK.length?' Next length.':''))}
/* 2. sensible estimates */
const senseKeys=()=>keys(E.SENSE[Math.min(st.sense.i,E.SENSE.length-1)].opts,A.H*.74,3,A.H*.18);
function drawSense(){const s=st.sense,g=A.ctx;room();if(s.i>=E.SENSE.length){banner('All 4 estimates make sense',A.W/2,A.H*.16,{ok:1});banner('Look at the unit: cm or m?',A.W/2,A.H*.4);return}
 const Q=E.SENSE[s.i];banner(`Thing ${s.i+1} of ${E.SENSE.length}: ${Q.obj}. About how long?`,A.W/2,A.H*.08,{n:13});
 const sc=Math.min(A.W*.8,560)/4,y=A.H*.5;g.fillStyle=TAPE;g.fillRect(A.W/2-sc*2,y,sc*4,14);g.strokeStyle=TXT;g.lineWidth=1;g.strokeRect(A.W/2-sc*2,y,sc*4,14);
 for(let k=0;k<=4;k++){const x=A.W/2-sc*2+k*sc;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+14);g.stroke();banner(`${k} m`,x,y+32,{n:10})}
 banner('A metre tape: each gap is 1 m',A.W/2,y-28,{n:11});senseKeys().forEach(b=>key(b,{no:s.miss===b.i,n:14}))}
function senseTap(k){const s=st.sense;if(s.i>=E.SENSE.length)return;const Q=E.SENSE[s.i];
 if(k!==Q.ans){s.miss=k;A.sound.miss();return talk(Q.why[k])}
 s.miss=-1;s.i++;A.sound.pop();talk(`Yes: ${Q.obj.toLowerCase()} is ${Q.opts[k].toLowerCase()}.`+(s.i<E.SENSE.length?' Next thing.':''))}
/* 3. lay a known length along the thing */
const thing=()=>{const L=E.LAY[Math.min(st.lay.i,E.LAY.length-1)],w=Math.min(A.W-40,520),u=w/L.count;return{x:(A.W-w)/2,y:A.H*.34,w,h:A.H*.14,u}};
const layKeys=()=>{const L=E.LAY[Math.min(st.lay.i,E.LAY.length-1)],o=E.LAYOPTS(L),r=st.lay.i%3,ord=o.slice(r).concat(o.slice(0,r));return keys(ord.map(x=>x[0]),A.H*.76,3,A.H*.18).map((b,j)=>({...b,tag:ord[j][1]}))};
function drawLay(){const s=st.lay,g=A.ctx;room();if(s.i>=E.LAY.length){banner('All 3 things estimated',A.W/2,A.H*.16,{ok:1});banner('Count the lengths, then times by their size',A.W/2,A.H*.4,{n:13});return}
 const L=E.LAY[s.i],T=thing();banner(`${L.obj}. One ${L.unit} is ${L.size>=100?'1 m':L.size+' cm'}.`,A.W/2,A.H*.08,{n:13});
 g.fillStyle=WOOD;A.paint.rrect(T.x,T.y,T.w,T.h,6);g.fill();g.fillStyle='#ffffff';g.font=`800 ${big(13)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(L.obj,T.x+T.w/2,T.y+T.h/2);
 for(let k=0;k<s.laid;k++){const x=T.x+k*T.u;g.fillStyle=k%2?'#fde047':'#facc15';g.fillRect(x+1,T.y+T.h+6,T.u-2,16);g.strokeStyle=TXT;g.lineWidth=1;g.strokeRect(x+1,T.y+T.h+6,T.u-2,16)}
 banner(s.laid<L.count?`${s.laid} laid. Tap the ${L.obj.toLowerCase().replace(/^a /,'')} to lay one more ${L.unit}.`:`${L.count} ${L.unit}s fit. About how long is it?`,A.W/2,A.H*.64,{n:12,ok:s.laid>=L.count});
 layKeys().forEach(b=>key(b,{no:s.miss===b.tag,n:13}))}
function layOne(){const s=st.lay;if(s.i>=E.LAY.length)return;const L=E.LAY[s.i];if(s.laid>=L.count)return;s.laid++;A.sound.tick();talk(`${s.laid} ${L.unit}${s.laid>1?'s':''} laid end to end.`+(s.laid>=L.count?' It is covered. Now pick the estimate.':''))}
function layPick(tag){const s=st.lay;if(s.i>=E.LAY.length)return;const L=E.LAY[s.i],tot=L.size*L.count;
 if(s.laid<L.count){A.sound.miss();return talk(`Lay the ${L.unit}s first: tap the ${L.obj.toLowerCase().replace(/^a /,'')} until it is covered.`)}
 if(tag!=='ok'){s.miss=tag;A.sound.miss();return talk(tag==='count'?`${L.count} is how many ${L.unit}s. Each one is ${L.size} cm, so count in ${L.size}s.`:`That is just one ${L.unit}. ${L.count} of them fit along it.`)}
 s.miss=null;s.laid=0;s.i++;A.sound.pop();talk(`Yes: ${L.count} × ${L.size} cm = ${tot} cm${tot>=100&&tot%100===0?` = ${tot/100} m`:''}.`+(s.i<E.LAY.length?' Next thing.':''))}
/* 4. estimate on a tape, then measure */
const MAXCM=200;
const tape=()=>({x:20,y:A.H*.62,w:A.W-40,h:22});
const cmX=cm=>tape().x+tape().w*cm/MAXCM;
const measureKey=()=>keys(['Measure'],A.H*.8,1,A.H*.16).map(b=>({...b,x:A.W/2-Math.min(110,A.W*.3),w:Math.min(220,A.W*.6)}))[0];
function drawGuess(){const s=st.guess,g=A.ctx;room();if(s.i>=E.GUESS.length){banner('All 3 estimates checked',A.W/2,A.H*.16,{ok:1});banner('Close is good. Measure to check.',A.W/2,A.H*.4);return}
 const Q=E.GUESS[s.i],T=tape(),y0=A.H*.24,ow=T.w*Q.cm/MAXCM,ox=(A.W-ow)/2,rw=T.w*30/MAXCM;banner(`${Q.obj}: estimate its length`,A.W/2,A.H*.08,{n:13});
 g.fillStyle=s.shown?'#7c2d12':'#9a3412';A.paint.rrect(ox,y0,ow,A.H*.12,8);g.fill();g.fillStyle='#ffffff';g.font=`800 ${big(12)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(Q.obj.split(',')[0],ox+ow/2,y0+A.H*.06);
 g.fillStyle=TAPE;g.fillRect(ox,y0+A.H*.12+8,rw,12);g.strokeStyle=TXT;g.lineWidth=1;g.strokeRect(ox,y0+A.H*.12+8,rw,12);banner('30 cm ruler',Math.min(A.W-50,ox+rw+50),y0+A.H*.12+14,{n:10});
 if(s.shown){g.strokeStyle='#2563eb';g.setLineDash([4,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(ox,y0);g.lineTo(T.x,T.y);g.moveTo(ox+ow,y0);g.lineTo(cmX(Q.cm),T.y);g.stroke();g.setLineDash([])}
 g.fillStyle='#ffffff';g.fillRect(T.x,T.y,T.w,T.h);g.strokeStyle=TXT;g.strokeRect(T.x,T.y,T.w,T.h);
 for(let cm=0;cm<=MAXCM;cm+=10){const x=cmX(cm);g.beginPath();g.moveTo(x,T.y);g.lineTo(x,T.y+(cm%50?7:13));g.stroke();if(s.shown&&cm%50===0){g.fillStyle=TXT;g.font=`700 ${big(10)}${FF}`;g.textAlign='center';g.fillText(String(cm),x,T.y+T.h+10)}}
 const mx=cmX(s.est);g.fillStyle='#2563eb';g.beginPath();g.moveTo(mx,T.y-2);g.lineTo(mx-11,T.y-20);g.lineTo(mx+11,T.y-20);g.closePath();g.fill();g.fillRect(mx-1.5,T.y-2,3,T.h+2);
 banner(s.shown?`Your estimate ${s.est} cm. It is ${Q.cm} cm: ${Math.abs(s.est-Q.cm)} cm off.`:`Your estimate: ${s.est} cm`,A.W/2,T.y-40,{n:12,ok:s.shown&&s.close,no:s.shown&&!s.close});
 key({...measureKey(),t:'Measure'},{n:15})}
function setEst(cm){const s=st.guess;if(s.i>=E.GUESS.length)return;s.est=Math.max(0,Math.min(MAXCM,Math.round(cm/10)*10));s.shown=false;A.redraw()}
function nudge(d){setEst(st.guess.est+d);talk(`Your estimate: ${st.guess.est} cm.`)}
function measure(){const s=st.guess;if(s.i>=E.GUESS.length)return;const Q=E.GUESS[s.i],off=Math.abs(s.est-Q.cm),tol=Math.max(20,Math.round(Q.cm*.2/10)*10);s.shown=true;s.close=off<=tol;
 if(!s.close){A.sound.miss();const n=Math.round(Q.cm/30);return talk(`It is ${Q.cm} cm, so ${s.est} cm is ${off} cm off. Picture the 30 cm ruler: about ${n} fit along it. Move the marker and try again.`)}
 A.sound.pop();const m=`Good estimate: ${s.est} cm, and it is really ${Q.cm} cm. Only ${off} cm off.`;s.i++;const e0=run;s.shown=false;s.est=100;if(s.i<E.GUESS.length)setTimeout(()=>{if(e0===run)A.redraw()},10);talk(m+(s.i<E.GUESS.length?' Next thing.':''))}
/* 5. robot */
const yesNo=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.17,60)}))};
function drawRobot(){const s=st.robot,g=A.ctx;room();if(s.i>=E.ROBOT.length){banner('All 5 robot sayings checked',A.W/2,A.H*.15,{ok:1});banner('Units matter, and close is good',A.W/2,A.H*.38,{n:13});return}
 const R=E.ROBOT[s.i],cx=A.W/2,cy=A.H*.22,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';g.beginPath();g.arc(cx,cy,u,0,7);g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.stroke();
 g.fillStyle=TXT;[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.4,cy-u*.1,u*.15,0,7);g.fill()});g.fillRect(cx-u*.35,cy+u*.4,u*.7,3);
 banner(R.say,A.W/2,A.H*.46,{n:12});banner(`Saying ${s.i+1} of ${E.ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.6,{n:12});yesNo().forEach(b=>key(b,{no:s.miss===b.i,n:16}))}
function judge(k){const s=st.robot;if(s.i>=E.ROBOT.length)return;const R=E.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return talk(R.ok?`Look again. ${R.fix}`:`Think about how a good estimate works. ${R.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();talk((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=mode();if(k==='quiz'){room();banner('Challenge',A.W/2,A.H*.2,{ok:1});banner('Estimate like a pro',A.W/2,A.H*.5,{n:13});return}
 ({bench:drawBench,sense:drawSense,lay:drawLay,guess:drawGuess,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='bench'){const b=benchBoxes().find(q=>hit(p,q));if(b)benchTap(b.i);return false}
 if(k==='sense'){const b=senseKeys().find(q=>hit(p,q));if(b)senseTap(b.i);return false}
 if(k==='lay'){if(hit(p,thing()))layOne();else{const b=layKeys().find(q=>hit(p,q));if(b)layPick(b.tag)}return false}
 if(k==='guess'){if(hit(p,measureKey())){measure();return false}const T=tape();if(p.y>T.y-34&&p.y<T.y+T.h+12){st.guess.drag=true;setEst((p.x-T.x)/T.w*MAXCM);return true}return false}
 if(k==='robot'){const b=yesNo().find(q=>hit(p,q));if(b)judge(b.i);return false}
 return false}
function move(p){if(mode()==='guess'&&st.guess.drag){const T=tape();setEst((p.x-T.x)/T.w*MAXCM)}}
function up(){if(st.guess&&st.guess.drag){st.guess.drag=false;talk(`Your estimate: ${st.guess.est} cm. Tap Measure to check.`)}}
function wipe(){run++;for(const k in st)delete st[k];Object.assign(st,{bench:{i:0,miss:-1},sense:{i:0,miss:-1},lay:{i:0,miss:null,laid:0},guess:{i:0,est:100,shown:false,close:false,drag:false},robot:{i:0,miss:-1},hook:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();st.hook()}
const complete=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){wipe();talk(E.DESC[i]);st.hook=complete(i,ok,E.DONE[i])}
function auto(i,acts,ms){steps[i].go();const e0=run;acts.forEach((f,j)=>setTimeout(()=>{if(e0===run)f()},ms*(j+1)))}
const steps=[
{h:'Lengths you know',p:'To estimate, start from lengths you already know. Tap the thing that is about each length.',task:'Match all 4 lengths',
 show:()=>auto(0,E.ASK.map(k=>()=>benchTap(k)),650),go:()=>enter(0,()=>st.bench.i>=E.ASK.length)},
{h:'Does it make sense?',p:'A good estimate has the right unit. Tap the estimate that makes sense.',
 predict:{q:'A pencil is about 15 long. 15 what?',opts:['15 m','15 cm'],ans:1},task:'Pick all 4 estimates',
 show:()=>auto(1,E.SENSE.map(Q=>()=>senseTap(Q.ans)),650),go:()=>enter(1,()=>st.sense.i>=E.SENSE.length)},
{h:'Lay it along',p:'Picture a length you know laid again and again along the thing. Tap to lay each one, then pick the estimate.',
 predict:{q:'A table is 4 rulers long. Each ruler is 30 cm. Is the table about 4 cm long?',opts:['Yes, about 4 cm','No, 4 lots of 30 cm'],ans:1},task:'Estimate all 3 things',
 show:()=>auto(2,E.LAY.flatMap(L=>[...Array(L.count)].map(()=>()=>layOne()).concat([()=>layPick('ok')])),240),go:()=>enter(2,()=>st.lay.i>=E.LAY.length)},
{h:'Estimate, then measure',p:'Drag the blue marker to your estimate. Use the 30 cm ruler to help. Then tap Measure.',
 predict:{q:'Is a good estimate always exactly right?',opts:['Yes, it must be exact','No, close is good'],ans:1},task:'Make 3 close estimates',
 show:()=>auto(3,E.GUESS.flatMap(Q=>[()=>setEst(Q.cm+10),()=>measure()]),550),go:()=>enter(3,()=>st.guess.i>=E.GUESS.length)},
{h:'Check the robot',p:'The robot says things about estimating. Right, or a slip?',task:'Check all 5 sayings',
 show:()=>auto(4,E.ROBOT.map(R=>()=>judge(R.ok?0:1)),600),go:()=>enter(4,()=>st.robot.i>=E.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});
function why(t){let m='Start from a length you know, picture it along the thing, and check the unit.';
 if(t==='unit')m='Check the unit. A door is about 2 m tall: 2 cm is two fingertips and 20 m is ten doors.';
 if(t==='count')m='That is how many there are, not how long. Times the count by the size of each one.';
 if(t==='one')m='That is only one of them. Count how many fit, then times by the size.';
 if(t==='exact')m='An estimate only needs to be close. 190 cm is just 10 cm from 2 m: a good estimate.';
 if(t==='guess')m='An estimate is not any number. Use a length you know, like a ruler, to get close.';
 if(t==='bench')m='A ruler is 30 cm and a door is about 2 m. A fingertip is about 1 cm wide.';
 return m}
function pose(){qn++;const Q=E.QS[qn%E.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(yes?'Yes.':why(t))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=mode(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='bench'&&st.bench.i<E.ASK.length)benchOrder().forEach(i=>add(E.BENCH[i].thing,()=>benchTap(i),`About ${E.BENCH[E.ASK[st.bench.i]].len}: ${E.BENCH[i].thing}`));
 if(k==='sense'&&st.sense.i<E.SENSE.length)E.SENSE[st.sense.i].opts.forEach((o,i)=>add(o,()=>senseTap(i),`${E.SENSE[st.sense.i].obj}: ${o}`));
 if(k==='lay'&&st.lay.i<E.LAY.length){const L=E.LAY[st.lay.i];add(`Lay one ${L.unit}`,()=>layOne());layKeys().forEach(b=>add(b.t,()=>layPick(b.tag),`${L.obj}: ${b.t}`))}
 if(k==='guess'&&st.guess.i<E.GUESS.length){add('− 10 cm',()=>nudge(-10),'Make the estimate 10 cm shorter');add('+ 10 cm',()=>nudge(10),'Make the estimate 10 cm longer');add('Measure',()=>measure(),'Measure and compare with your estimate')}
 if(k==='robot'&&st.robot.i<E.ROBOT.length){add('✓ Right',()=>judge(0),'The robot is right');add('✗ Slip',()=>judge(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{chq.hidden=x.step!==5;ctl.hidden=x.step===5;controls()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Estimating lengths lab buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
