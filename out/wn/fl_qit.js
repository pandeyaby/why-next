/* Flagship – current as rate of flow of charge, Q = I t (ages 14–16; AQA 8463 4.2.1.3). Scenes: set a current so 6 C
   passes a counting gate in 3 s; find the currents that move 12 C in 4 s and 8 s; unit traps with minutes and mA; drag a
   charge–time line until its slope is 2 A and 3.5 A; move a counting ring round a series loop. Data in learn/qit_art.js.
   Distinct from flagcirc (current and voltage), flagcurdir (direction) and flagacdc: this lab is about charge per second. */
(()=>{const Q=QIT,PI2=Math.PI*2;
VIS.reg('flagqit',c=>{let A,keys,quiz,qk=-1,gen=0;const st={};
const TXT='#111827',DIM='#374151',GOOD='#047857',WRONG='#b91c1c',LINE='#6b7280',BG='#f8fafc',COPPER='#b45309',DOT='#1d4ed8',KNOB='#4338ca',SANS='px system-ui,sans-serif';
const mode=()=>['count','timed','units','graph','loop','quiz'][A.step];
const sz=v=>A.narrow?v:Math.round(v*1.12);
const within=(p,r)=>!!r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const n1=v=>(Math.round(v*10)/10).toString();
function box(msg,cx,cy,o){o=o||{};const g=A.ctx,f=sz(o.f||13),lim=A.W-30;g.font=`700 ${f}${SANS}`;const lines=[];let cur='';
 for(const word of msg.split(' ')){const tryLine=cur?cur+' '+word:word;if(cur&&g.measureText(tryLine).width>lim){lines.push(cur);cur=word}else cur=tryLine}lines.push(cur);
 const w=Math.max(...lines.map(l=>g.measureText(l).width))+20,lh=f+4,h=lines.length*lh+8,x=Math.min(Math.max(4,cx-w/2),A.W-w-4);g.fillStyle='#fff';A.paint.rrect(x,cy-h/2,w,h,7);g.fill();
 g.strokeStyle=o.good?GOOD:o.bad?WRONG:LINE;g.lineWidth=o.good||o.bad?2.8:1.2;g.stroke();g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,x+w/2,cy-h/2+4+lh*(i+.5)+1))}
function tile(r,msg,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=o.bad?WRONG:o.good?GOOD:LINE;g.lineWidth=o.bad||o.good?3:1.4;g.stroke();
 let f=sz(14);g.font=`800 ${f}${SANS}`;while(f>9&&g.measureText(msg).width>r.w-8){f--;g.font=`800 ${f}${SANS}`}g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(msg,r.x+r.w/2,r.y+r.h/2)}
const row3=()=>{const gap=8,w=(A.W-16-2*gap)/3,h=Math.min(56,A.H*.13);return[0,1,2].map(i=>({i,x:8+i*(w+gap),y:A.H-h-8,w,h}))};
/* ---------- the current handle (scenes 1 and 2) ---------- */
const rail=()=>({a:40,b:A.W-40,y:A.H*.74});
const knobX=()=>{const R=rail();return R.a+(st.I-Q.IMIN)/(Q.IMAX-Q.IMIN)*(R.b-R.a)};
function setI(v){if(st.run)return;st.I=Math.max(Q.IMIN,Math.min(Q.IMAX,Math.round(v/Q.ISTEP)*Q.ISTEP));st.t=0;st.q=0;A.redraw()}
function drawRail(){const g=A.ctx,R=rail();g.strokeStyle='#9ca3af';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(R.a,R.y);g.lineTo(R.b,R.y);g.stroke();g.lineCap='butt';
 g.fillStyle=KNOB;g.beginPath();g.arc(knobX(),R.y,sz(15),0,PI2);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();
 g.fillStyle=DIM;g.font=`600 ${sz(11)}${SANS}`;g.textBaseline='top';g.textAlign='left';g.fillText(Q.IMIN+' A',R.a-14,R.y+sz(18));g.textAlign='right';g.fillText(Q.IMAX+' A',R.b+14,R.y+sz(18))}
/* ---------- the wire with charge dots and a counting gate ---------- */
const gateX=()=>A.W*.58;
function drawWire(){const g=A.ctx,y=A.H*.4,gap=26;g.fillStyle=COPPER;g.fillRect(0,y-17,A.W,34);
 const shift=(st.t*st.I/Q.COUL_PER_DOT*gap)%gap;g.fillStyle='#fff';for(let x=-gap+shift;x<A.W+gap;x+=gap){g.beginPath();g.arc(x,y,6.5,0,PI2);g.fill()}
 g.fillStyle=DOT;for(let x=-gap+shift;x<A.W+gap;x+=gap){g.beginPath();g.arc(x,y,4.5,0,PI2);g.fill()}
 const gx=gateX();g.strokeStyle=TXT;g.lineWidth=2;g.setLineDash([5,4]);g.beginPath();g.moveTo(gx,y-34);g.lineTo(gx,y+34);g.stroke();g.setLineDash([]);
 box(`Current I = ${n1(st.I)} A`,A.W*.25,A.H*.1,{f:12});box(`Time t = ${n1(st.t)} s`,A.W*.75,A.H*.1,{f:12});
 box(`Charge through the gate Q = ${n1(st.q)} C`,A.W/2,A.H*.4+sz(52),{f:13,good:st.flash==='good',bad:st.flash==='bad'})}
function runFor(limit){if(st.run)return;Object.assign(st,{t:0,q:0,run:true,flash:'',limit});A.kick();say(limit.q?`Running at ${n1(st.I)} A until ${limit.q} C has passed.`:`Running at ${n1(st.I)} A for ${limit.t} s.`)}
function tickRun(dt){if(!st.run)return false;st.t+=dt*(st.fast?6:1.5);st.q=st.I*st.t;const L=st.limit;
 if(L.t&&st.t>=L.t){st.t=L.t;st.q=st.I*L.t;st.run=false;finish()}
 if(L.q&&st.q>=L.q){st.q=L.q;st.t=L.q/st.I;st.run=false;finish()}return st.run}
function finish(){const k=mode();
 if(k==='count'){const ok=Math.abs(st.q-Q.COUNT.q)<1e-9;st.flash=ok?'good':'bad';if(ok){st.won=true;A.sound.pop();return say(`${n1(st.I)} A × ${Q.COUNT.t} s = ${n1(st.q)} C. Each second ${n1(st.I)} C passes the gate.`)}
  A.sound.miss();return say(`${n1(st.I)} A × ${Q.COUNT.t} s = ${n1(st.q)} C, not ${Q.COUNT.q} C. ${st.q<Q.COUNT.q?'More':'Less'} charge each second means ${st.q<Q.COUNT.q?'more':'less'} current.`)}
 const hit=Q.TIMED.want.find(w=>Math.abs(st.t-w)<1e-9);if(hit){st.got[hit]=true;st.flash='good';A.sound.pop()}else st.flash='';
 say(`${Q.TIMED.q} C at ${n1(st.I)} A took ${n1(st.t)} s, because t = Q ÷ I = ${Q.TIMED.q} ÷ ${n1(st.I)}.`+(hit?'':' Try another current.'))}
/* ---------- unit traps ---------- */
function drawUnits(){const u=st.u;if(u.i>=Q.UNITS.length){box('All 3 answered',A.W/2,A.H*.4,{good:1});return}const U=Q.UNITS[u.i];
 box(`Question ${u.i+1} of 3`,A.W/2,A.H*.1,{f:12});box(U.q,A.W/2,A.H*.3,{f:14});box('Q = I × t  ·  1 minute = 60 s  ·  1 A = 1000 mA',A.W/2,A.H*.52,{f:12});
 row3().forEach(r=>tile(r,U.o[r.i],{bad:u.miss===r.i}))}
function answerUnit(i){const u=st.u;if(u.i>=Q.UNITS.length)return;const U=Q.UNITS[u.i],v=U.o[i];
 if(v!==U.a){u.miss=i;A.sound.miss();return say(`Not ${v}. ${U.why[v]}`)}u.miss=-1;u.i++;A.sound.pop();say(`Yes, ${v}.`+(u.i<Q.UNITS.length?' Next question.':''))}
/* ---------- charge–time graph ---------- */
const axes=()=>({x:sz(46),y:A.H*.14,w:A.W-sz(46)-18,h:A.H*.58});
const toPx=(t,q)=>{const R=axes();return{x:R.x+t/Q.GRAPH.tMax*R.w,y:R.y+R.h-q/Q.GRAPH.qMax*R.h}};
function drawGraph(){const g=A.ctx,R=axes(),G=st.g;g.fillStyle='#fff';g.fillRect(R.x,R.y,R.w,R.h);g.strokeStyle='#e5e7eb';g.lineWidth=1;
 for(let q=0;q<=Q.GRAPH.qMax;q+=10){const p=toPx(0,q);g.beginPath();g.moveTo(R.x,p.y);g.lineTo(R.x+R.w,p.y);g.stroke();g.fillStyle=DIM;g.font=`600 ${sz(11)}${SANS}`;g.textAlign='right';g.textBaseline='middle';g.fillText(q,R.x-5,p.y)}
 for(let t=0;t<=Q.GRAPH.tMax;t+=2){const p=toPx(t,0);g.fillStyle=DIM;g.textAlign='center';g.textBaseline='top';g.fillText(t,p.x,R.y+R.h+4)}
 g.strokeStyle=TXT;g.lineWidth=1.6;g.strokeRect(R.x,R.y,R.w,R.h);g.fillStyle=TXT;g.textAlign='left';g.textBaseline='bottom';g.fillText('charge Q (C)',R.x+4,R.y-3);g.textAlign='right';g.textBaseline='top';g.fillText('time t (s)',R.x+R.w,R.y+R.h+sz(18));
 G.kept.forEach(v=>{const e=toPx(10,v);g.strokeStyle=GOOD;g.lineWidth=2.5;g.beginPath();const o=toPx(0,0);g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke()});
 const o=toPx(0,0),e=toPx(10,G.end);g.strokeStyle=KNOB;g.lineWidth=3;g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.fillStyle=KNOB;g.beginPath();g.arc(e.x,e.y,sz(13),0,PI2);g.fill();
 const want=Q.GRAPH.want[G.i];box(want==null?'Both lines drawn':`Make the line for I = ${want} A`,A.W/2,A.H*.05,{f:12,good:want==null});
 box(`Slope = ${G.end} C ÷ 10 s = ${n1(G.end/10)} A`,A.W/2,A.H-sz(26),{f:12})}
function setEnd(v){const G=st.g;G.end=Math.max(0,Math.min(Q.GRAPH.qMax,Math.round(v)));A.redraw()}
function judgeLine(){const G=st.g,want=Q.GRAPH.want[G.i];if(want==null)return;const I=G.end/10;
 if(Math.abs(I-want)>1e-9){A.sound.miss();return say(`That slope is ${G.end} C in 10 s, a current of ${n1(I)} A. ${I<want?'Steeper':'Less steep'} for ${want} A: ${want*10} C in 10 s.`)}
 G.kept.push(G.end);G.i++;A.sound.pop();say(`Yes: ${G.end} C in 10 s is ${n1(I)} A.`+(G.i<Q.GRAPH.want.length?` Now ${Q.GRAPH.want[G.i]} A.`:' The steeper line is the bigger current.'))}
/* ---------- series loop ---------- */
const frame=()=>({x:A.W*.12,y:A.H*.16,w:A.W*.76,h:A.H*.5});
function along(f){const R=frame(),per=2*(R.w+R.h);let d=((f%1)+1)%1*per;
 if(d<R.h)return{x:R.x,y:R.y+R.h-d};d-=R.h;if(d<R.w)return{x:R.x+d,y:R.y};d-=R.w;if(d<R.h)return{x:R.x+R.w,y:R.y+d};d-=R.h;return{x:R.x+R.w-d,y:R.y+R.h}}
function nearest(p){let best=null,bd=1e9;for(let f=0;f<1;f+=.005){const q=along(f),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best=f}}return{f:best,d:bd}}
function drawLoop(){const g=A.ctx,R=frame(),L=st.loop;g.strokeStyle=COPPER;g.lineWidth=6;g.strokeRect(R.x,R.y,R.w,R.h);
 const cell=along(.13);g.fillStyle=BG;g.fillRect(cell.x-14,cell.y-12,28,24);g.fillStyle=TXT;g.fillRect(cell.x-12,cell.y-6,24,3);g.fillRect(cell.x-7,cell.y+4,14,5);box('cell',cell.x+40,cell.y,{f:11});
 const lamp=along(.375);g.fillStyle='#fef3c7';g.beginPath();g.arc(lamp.x,lamp.y,16,0,PI2);g.fill();g.strokeStyle=TXT;g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(lamp.x-11,lamp.y-11);g.lineTo(lamp.x+11,lamp.y+11);g.moveTo(lamp.x+11,lamp.y-11);g.lineTo(lamp.x-11,lamp.y+11);g.stroke();box('lamp',lamp.x,lamp.y+34,{f:11});
 g.fillStyle=DOT;for(let k=0;k<24;k++){const q=along(k/24+L.phase);g.beginPath();g.arc(q.x,q.y,4,0,PI2);g.fill()}
 Q.LOOP.spots.forEach(s=>{const q=along(s.f);box(s.n+(L.read[s.n]?' ✓':''),q.x+(q.x>A.W/2?24:-24),q.y+(q.y<A.H*.3?-22:22),{f:11,good:L.read[s.n]})});
 const ring=along(L.f);g.strokeStyle=KNOB;g.lineWidth=4;g.beginPath();g.arc(ring.x,ring.y,sz(16),0,PI2);g.stroke();
 box(`Ring reads: ${Q.LOOP.amps*Q.LOOP.secs} C in ${Q.LOOP.secs} s = ${Q.LOOP.amps} A`,A.W/2,A.H*.8,{f:12});
 box(`Points read: ${Object.keys(L.read).length} of 4`,A.W/2,A.H*.8+sz(30),{f:12,good:Object.keys(L.read).length>=4})}
function readAt(f){const L=st.loop,s=Q.LOOP.spots.find(s=>Math.abs(s.f-f)<.05);if(!s){A.redraw();return say('Move the ring onto a lettered point.')}
 L.f=s.f;L.read[s.n]=true;A.sound.pop();const n=Object.keys(L.read).length;say(`Point ${s.n}: ${Q.LOOP.amps*Q.LOOP.secs} C passes in ${Q.LOOP.secs} s, so ${Q.LOOP.amps} A.`+(n<4?` ${4-n} more to check.`:' The same at every point.'))}
/* ---------- draw and pointer ---------- */
function draw(){const g=A.ctx,k=mode();g.fillStyle=BG;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){box('Challenge',A.W/2,A.H*.32,{good:1});box('Q = I t',A.W/2,A.H*.52);return}
 if(k==='count'||k==='timed'){drawWire();drawRail()}else({units:drawUnits,graph:drawGraph,loop:drawLoop})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='count'||k==='timed'){const R=rail();if(Math.abs(p.y-R.y)<sz(30)&&!st.run){st.drag='rail';setI(Q.IMIN+(p.x-R.a)/(R.b-R.a)*(Q.IMAX-Q.IMIN));return true}return false}
 if(k==='units'){const r=row3().find(q=>within(p,q));if(r)answerUnit(r.i);return false}
 if(k==='graph'){const R=axes();if(p.x>R.x+R.w*.6){st.drag='line';setEnd((R.y+R.h-p.y)/R.h*Q.GRAPH.qMax);return true}return false}
 if(k==='loop'){const n=nearest(p);if(n.d<sz(36)){st.drag='ring';st.loop.f=n.f;A.redraw();return true}}return false}
function move(p){if(st.drag==='rail'){const R=rail();setI(Q.IMIN+(p.x-R.a)/(R.b-R.a)*(Q.IMAX-Q.IMIN))}
 if(st.drag==='line'){const R=axes();setEnd((R.y+R.h-p.y)/R.h*Q.GRAPH.qMax)}
 if(st.drag==='ring'){st.loop.f=nearest(p).f;A.redraw()}}
function up(){const d=st.drag;st.drag=null;if(d==='rail')say(`Current set to ${n1(st.I)} A.`);if(d==='line')judgeLine();if(d==='ring')readAt(st.loop.f)}
function clear(){gen++;for(const k in st)delete st[k];Object.assign(st,{I:1,t:0,q:0,run:false,flash:'',won:false,got:{},u:{i:0,miss:-1},g:{end:10,i:0,kept:[]},loop:{f:.9,phase:0,read:{}},drag:null,fast:false,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();st.hook()}
/* every canvas action also has a button */
function twins(){if(!keys)return;keys.innerHTML='';const k=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='count'||k==='timed'){b('Less current',()=>{setI(st.I-Q.ISTEP);say(`Current ${n1(st.I)} A.`)},'Lower the current by 0.5 A');b('More current',()=>{setI(st.I+Q.ISTEP);say(`Current ${n1(st.I)} A.`)},'Raise the current by 0.5 A');
  b(k==='count'?`Run ${Q.COUNT.t} s`:`Run ${Q.TIMED.q} C`,()=>runFor(k==='count'?{t:Q.COUNT.t}:{q:Q.TIMED.q}))}
 if(k==='units'&&st.u.i<Q.UNITS.length)Q.UNITS[st.u.i].o.forEach((v,i)=>b(v,()=>answerUnit(i)));
 if(k==='graph'&&st.g.i<Q.GRAPH.want.length){b('Less steep',()=>{setEnd(st.g.end-1);say(`Slope ${n1(st.g.end/10)} A.`)},'Lower the end of the line by 1 C');b('Steeper',()=>{setEnd(st.g.end+1);say(`Slope ${n1(st.g.end/10)} A.`)},'Raise the end of the line by 1 C');b('Check line',judgeLine)}
 if(k==='loop')Q.LOOP.spots.forEach(s=>b('Point '+s.n,()=>readAt(s.f),`Move the ring to point ${s.n}`))}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){clear();say(Q.DESC[i]);st.hook=ready(i,ok,Q.DONE[i])}
function demo(i,acts,ms){steps[i].go();st.fast=true;const e=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e===gen)f()},ms*j+200))}
const steps=[
{h:'Count the charge',p:'Current is the rate of flow of charge: how many coulombs pass a point each second. Set the current, run for 3 seconds and read the counter.',
 predict:{q:'A current of 2 A flows for 3 s. How much charge passes the gate?',opts:['1.5 C','5 C','6 C'],ans:2},task:'Make exactly 6 C pass in 3 s',
 show:()=>demo(0,[()=>setI(2),()=>runFor({t:Q.COUNT.t})],400),go:()=>open(0,()=>st.won)},
{h:'Same charge, different time',p:'Now the charge is fixed at 12 C. Rearrange Q = I t to t = Q ÷ I and test it.',
 predict:{q:'You halve the current. The time for the same 12 C to pass…',opts:['halves','doubles','stays the same'],ans:1},task:'Make 12 C take 4 s, then 8 s',
 show:()=>demo(1,[()=>setI(3),()=>runFor({q:Q.TIMED.q}),()=>setI(1.5),()=>runFor({q:Q.TIMED.q})],900),go:()=>open(1,()=>st.got[4]&&st.got[8])},
{h:'Watch the units',p:'Q = I t only works in coulombs, amps and seconds. Convert minutes and milliamps first.',task:'Answer all 3',
 show:()=>demo(2,Q.UNITS.map(U=>()=>answerUnit(U.o.indexOf(U.a))),500),go:()=>open(2,()=>st.u.i>=Q.UNITS.length)},
{h:'Charge–time graph',p:'Plot charge against time. A steady current gives a straight line through the origin, and its slope is the current.',
 predict:{q:'On a charge–time graph, a steeper line shows…',opts:['a smaller current','a bigger current','a longer time'],ans:1},task:'Draw the 2 A and 3.5 A lines',
 show:()=>demo(3,[()=>{setEnd(20);judgeLine()},()=>{setEnd(35);judgeLine()}],700),go:()=>open(3,()=>st.g.i>=Q.GRAPH.want.length)},
{h:'Round the loop',p:'The ring counts the charge that passes it in 5 seconds. Check the current before the lamp, after it and next to the cell.',
 predict:{q:'Is the current after the lamp smaller than before it?',opts:['Yes, the lamp uses some up','No, it is the same','It is bigger'],ans:1},task:'Read the current at A, B, C and D',
 show:()=>demo(4,Q.LOOP.spots.map(s=>()=>readAt(s.f)),400),go:()=>open(4,()=>Object.keys(st.loop.read).length>=4)},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});
function why(t){let m='Use Q = I t with charge in C, current in A and time in s.';
 if(t==='times')m='You multiplied. Current is charge ÷ time: I = 30 ÷ 15 = 2 A.';
 if(t==='flip')m='The division is the wrong way up. Check the units: amps are coulombs per second.';
 if(t==='mins')m='Change minutes to seconds first: 2 minutes = 120 s, so Q = 0.4 × 120 = 48 C.';
 if(t==='used')m='Charge is not used up. The same coulombs pass every point in a series loop each second; the lamp takes energy, not charge.';
 return Q.WHY[t]||m}
function ask(){qk++;const T=Q.QS[qk%Q.QS.length],all=[[T.a,'ok'],...T.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,T.a)});c.say('Challenge: '+T.q);A.redraw()}
function verdict(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quiz.hidden=x.step!==5;keys.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Charge flow lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clear();
  A.every(dt=>{if(mode()==='loop'&&!A.reduced()){st.loop.phase+=dt*.04;return true}return tickRun(dt)});A.gest({down,move,up});twins()}}).start()})})();
