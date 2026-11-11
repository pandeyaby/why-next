/* Flagship: number of minutes in an hour and hours in a day (ages 6-7; NC Year 2 Measurement "know the number of
   minutes in an hour and the number of hours in a day"; supports CCSS 2.MD.7 telling time to five minutes). Wind the
   long hand once round while a bead frame fills to 60, count round the numbers in fives, run the short hand twice
   round for a 24-hour day with the sun and moon, lay 1-hour bars on a minute line to find 120 minutes in 2 hours, and
   sort durations as less than, exactly or more than an hour. Distinct from flagclock / flagmins / flagtomin (reading
   a time on a face) and flagdur (comparing how long jobs take): here the learner builds the 60 and 24 facts. */
(()=>{const TAU=Math.PI*2;
VIS.reg('flaghr60',c=>{let A,row,quiz,qi=-1,epoch=0;const K={};c.fig.classList.add('young');
const INK='#0f172a',FACE='#ffffff',MINH='#1d4ed8',HRH='#b91c1c',BEAD='#2563eb',BEAD2='#f59e0b',GOOD='#047857',NIGHT='#1e3a8a',DAYC='#fde68a';
const CARDS=[['70 minutes',70],['half an hour',30],['60 minutes',60],['100 minutes',100],['45 minutes',45],['2 hours',120]];
const part=()=>['wind','fives','day','bars','sort','quiz'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v;
function label(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,x0=lim(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?GOOD:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.1:.6);g.fillRect(0,0,A.W,A.H)}
function geo(){const r=Math.min(A.W*.22,A.H*.34);return{x:A.W*.27,y:A.H*.56,r}}
/* clock face with both hands; minutes drive the long hand, hours (can pass 12) drive the short hand */
function face(mins,hrs,o){o=o||{};const g=A.ctx,G=geo();g.fillStyle=FACE;g.beginPath();g.arc(G.x,G.y,G.r,0,TAU);g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
 for(let i=0;i<60;i++){const a=i/60*TAU-Math.PI/2,big=i%5===0;g.lineWidth=big?2.5:1;g.beginPath();g.moveTo(G.x+Math.cos(a)*G.r*(big?.86:.92),G.y+Math.sin(a)*G.r*(big?.86:.92));g.lineTo(G.x+Math.cos(a)*G.r*.97,G.y+Math.sin(a)*G.r*.97);g.stroke()}
 g.font=`800 ${Math.round(G.r*.17)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';
 for(let n=1;n<=12;n++){const a=n/12*TAU-Math.PI/2,x=G.x+Math.cos(a)*G.r*.72,y=G.y+Math.sin(a)*G.r*.72;if(o.lit&&o.lit[n]){g.fillStyle='#bbf7d0';g.beginPath();g.arc(x,y,G.r*.13,0,TAU);g.fill()}
  g.fillStyle=INK;g.fillText(String(n),x,y+1);if(o.lit&&o.lit[n]){label(String(n*5),G.x+Math.cos(a)*G.r*1.2,G.y+Math.sin(a)*G.r*1.18,{f:11})}}
 const hand=(a,len,w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(G.x,G.y);g.lineTo(G.x+Math.cos(a)*len,G.y+Math.sin(a)*len);g.stroke()};
 if(o.hour!==false)hand(hrs/12*TAU-Math.PI/2,G.r*.48,7,HRH);if(o.min!==false)hand(mins/60*TAU-Math.PI/2,G.r*.8,4,MINH);g.fillStyle=INK;g.beginPath();g.arc(G.x,G.y,5,0,TAU);g.fill()}
/* 0: wind the long hand once round; a bead frame fills */
function drawWind(){bg();const W=K.wind,g=A.ctx;face(W.m,3+W.m/60);const x0=A.W*.56,y0=A.H*.24,cw=Math.min(A.W*.4/10,A.H*.6/6);
 for(let i=0;i<60;i++){const cx=x0+(i%10+.5)*cw,cy=y0+(Math.floor(i/10)+.5)*cw;g.beginPath();g.arc(cx,cy,cw*.36,0,TAU);
  if(i<W.m){g.fillStyle=Math.floor(i/5)%2?BEAD2:BEAD;g.fill()}else{g.strokeStyle=A.col.tx;g.lineWidth=1.2;g.stroke()}}
 label(`${W.m} minute${W.m===1?'':'s'}`,x0+cw*5,y0+cw*6+18,{f:13});
 label(W.m>=60?'60 minutes = 1 hour. The short hand moved from 3 to 4.':'Turn the long hand once round',A.W/2,A.H*.07,{ok:W.m>=60})}
function addMins(n){const W=K.wind;if(W.m>=60)return tell('One whole hour is done: 60 minutes.');W.m=Math.min(60,W.m+n);A.sound.tick();
 tell(W.m>=60?'Once round! That is 60 minutes, one hour. The short hand moved on one number.':`${W.m} minutes. The long hand has ${60-W.m} minutes to go.`)}
function handAngle(p){const G=geo();let a=Math.atan2(p.y-G.y,p.x-G.x)+Math.PI/2;if(a<0)a+=TAU;return a/TAU*60}
/* 1: count round in fives */
function drawFives(){bg();const F=K.fives;face(F.n*5%60,3+F.n*5/60,{lit:F.lit,hour:false});
 label(F.n>=12?'12 jumps of 5: 60 minutes':F.n?`${F.n} jump${F.n>1?'s':''} of 5: ${F.n*5} minutes`:'Tap 1, then 2, then 3 … round the clock',A.W/2,A.H*.07,{ok:F.n>=12});
 const x=A.W*.78;label('Count in fives',x,A.H*.3,{f:12});label(F.n?String(F.n*5):'0',x,A.H*.45,{f:22});label('minutes past',x,A.H*.58,{f:12})}
function tapNum(k){const F=K.fives;if(F.n>=12)return tell('Round the whole clock: 60 minutes.');if(k!==F.n+1){A.sound.miss();return tell(`Go round in order. The next number is ${F.n+1}.`)}
 F.n=k;F.lit[k]=1;A.sound.pop();tell(k===3?'At 3 the long hand shows 15 minutes past, not 3 minutes.':k===6?'At 6 it shows 30 minutes past: half an hour.':k===12?'Back to 12: 60 minutes, one hour.':`${k} jumps of 5: ${k*5} minutes.`)}
/* 2: a whole day on the short hand */
function drawDay(){bg();const D=K.day,g=A.ctx;face(0,D.h);const sun=D.h%24>=7&&D.h%24<19,G=geo();
 g.fillStyle=sun?'#f59e0b':'#e2e8f0';g.beginPath();g.arc(G.x+G.r*.9,G.y-G.r*.95,G.r*.16,0,TAU);g.fill();if(!sun){g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.1:.6);g.beginPath();g.arc(G.x+G.r*.98,G.y-G.r*1,G.r*.13,0,TAU);g.fill()}
 const x0=A.W*.55,w=A.W*.41,cw=w/6,y0=A.H*.2;for(let i=0;i<24;i++){const cx=x0+(i%6)*cw,cy=y0+Math.floor(i/6)*cw*.95,day=i>=7&&i<19;
  g.fillStyle=i<D.h?(day?DAYC:NIGHT):'rgba(0,0,0,0)';g.fillRect(cx+2,cy+2,cw-4,cw*.95-4);g.strokeStyle=A.col.tx;g.lineWidth=1.2;g.strokeRect(cx+2,cy+2,cw-4,cw*.95-4)}
 label(`${D.h} hour${D.h===1?'':'s'}`,x0+w/2,y0+cw*3.8+14,{f:13});label(`short hand: round ${D.h>12?2:D.h?1:0} time${D.h>12||!D.h?'s':''}`,x0+w/2,y0+cw*3.8+44,{f:11});
 label(D.h>=24?'24 hours = 1 day: the short hand went round twice':D.h===12?'12 hours: round once. Not a whole day yet!':'Move the short hand on, hour by hour',A.W/2,A.H*.07,{ok:D.h>=24})}
function addHrs(n){const D=K.day;if(D.h>=24)return tell('That was one whole day and night: 24 hours.');D.h=Math.min(24,D.h+n);A.sound.tick();
 tell(D.h>=24?'24 hours: the short hand went round twice. One day has 24 hours.':D.h===12?'12 hours. The short hand went round once, but it is night now. A day is not over yet.':`${D.h} hours so far.`)}
/* 3: hour bars on a minute line */
function line(){return{x:A.W*.06,w:A.W*.88,y:A.H*.64,max:180}}
function drawBars(){bg();const B=K.bars,g=A.ctx,L=line(),u=L.w/L.max;g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(L.x,L.y);g.lineTo(L.x+L.w,L.y);g.stroke();
 for(let m=0;m<=180;m+=10){const x=L.x+m*u,big=m%60===0;g.beginPath();g.moveTo(x,L.y);g.lineTo(x,L.y+(big?16:8));g.stroke();if(big)label(String(m),x,L.y+32,{f:11})}
 label('minutes',L.x+L.w/2,L.y+58,{f:11});
 for(let i=0;i<B.n;i++){g.fillStyle=i%2?'#fb923c':'#60a5fa';g.fillRect(L.x+i*60*u,L.y-A.H*.12,60*u,A.H*.11);g.strokeStyle=INK;g.strokeRect(L.x+i*60*u,L.y-A.H*.12,60*u,A.H*.11);label('1 hour',L.x+(i*60+30)*u,L.y-A.H*.065,{f:11})}
 const tx=A.W*.2,ty=A.H*.24;g.fillStyle='#60a5fa';g.fillRect(B.dx+tx-30*u,B.dy+ty-A.H*.055,60*u,A.H*.11);g.strokeStyle=INK;g.strokeRect(B.dx+tx-30*u,B.dy+ty-A.H*.055,60*u,A.H*.11);label('1 hour',B.dx+tx,B.dy+ty,{f:11});
 label(B.n===2?'2 hours = 60 + 60 = 120 minutes':B.n===3?'3 hours = 180 minutes':`${B.n} hour${B.n===1?'':'s'} = ${B.n*60} minutes`,A.W/2,A.H*.07,{ok:B.n>=2})}
function addBar(){const B=K.bars;if(B.n>=3)return tell('The line is full: 3 hours is 180 minutes.');B.n++;A.sound.pop();
 tell(B.n===1?'One hour reaches 60 on the minute line.':B.n===2?'Two hours reach 120. 60 and 60 more makes 120 minutes.':'Three hours reach 180 minutes.')}
function takeBar(){const B=K.bars;if(!B.n)return tell('No hour bars on the line yet.');B.n--;A.sound.tick();tell(`${B.n} hour${B.n===1?'':'s'}: ${B.n*60} minutes.`)}
/* 4: less, exactly or more than 1 hour */
function bins(){return[['Less than 1 hour',-1],['Exactly 1 hour',0],['More than 1 hour',1]].map(([t,v],i)=>({t,v,x:A.W*(.03+i*.325),y:A.H*.66,w:A.W*.3,h:A.H*.24}))}
function drawSort(){bg();const S=K.sort,g=A.ctx,x0=A.W*.08,w=A.W*.84,u=w/120;
 if(S.k<CARDS.length){const [t,m]=CARDS[S.k];label(t,A.W/2,A.H*.24,{f:18});if(S.peek){g.fillStyle='#a78bfa';g.fillRect(x0,A.H*.36,m*u,A.H*.08)}
  g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x0,A.H*.36,w,A.H*.08);g.setLineDash([5,4]);g.beginPath();g.moveTo(x0+60*u,A.H*.33);g.lineTo(x0+60*u,A.H*.47);g.stroke();g.setLineDash([]);label('1 hour = 60 minutes',x0+60*u,A.H*.52,{f:11})}
 bins().forEach(b=>{g.fillStyle=A.alpha(b.v<0?'#2563eb':b.v?'#c2410c':GOOD,.15);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=b.v<0?'#2563eb':b.v?'#c2410c':GOOD;g.lineWidth=2.5;g.stroke();label(b.t,b.x+b.w/2,b.y+b.h/2,{f:11})});
 label(S.k>=CARDS.length?'All sorted: compare with 60 minutes':`Card ${S.k+1} of ${CARDS.length}`,A.W/2,A.H*.08,{ok:S.k>=CARDS.length})}
function sortTo(v){const S=K.sort;if(S.k>=CARDS.length)return;const [t,m]=CARDS[S.k],want=Math.sign(m-60);S.peek=1;
 if(v!==want){A.sound.miss();return tell(m===100?'100 minutes is more than 60 minutes, so it is more than 1 hour. An hour is 60 minutes, not 100.':m===30?'Half an hour is 30 minutes: less than 60.':m===120?'2 hours is 60 + 60 = 120 minutes: more than 1 hour.':`${t} is ${m<60?'less':m>60?'more':'exactly'} than 60 minutes. Look at the bar and the 1-hour line.`)}
 S.k++;S.peek=0;A.sound.pop();tell(`${t}: ${m} minutes, ${want<0?'less than':want?'more than':'exactly'} 1 hour.`)}
function draw(){const k=part();if(k==='quiz'){bg();face(0,3);label('Challenge',A.W/2,A.H*.1,{ok:1});return}({wind:drawWind,fives:drawFives,day:drawDay,bars:drawBars,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part(),G=geo(),near=Math.hypot(p.x-G.x,p.y-G.y)<G.r*1.1;
 if(k==='wind'&&near){K.drag={last:handAngle(p)};return true}
 if(k==='fives'&&near){let best=0,d=1e9;for(let n=1;n<=12;n++){const a=n/12*TAU-Math.PI/2,e=Math.hypot(p.x-G.x-Math.cos(a)*G.r*.72,p.y-G.y-Math.sin(a)*G.r*.72);if(e<d){d=e;best=n}}if(d<G.r*.3)tapNum(best);return false}
 if(k==='day'){addHrs(1);return false}
 if(k==='bars'){const tx=A.W*.2,ty=A.H*.24;if(Math.abs(p.x-tx)<A.W*.18&&Math.abs(p.y-ty)<A.H*.1){K.drag={bar:1,x0:p.x,y0:p.y};return true}if(p.y>A.H*.45)addBar();return false}
 if(k==='sort'){const b=bins().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)sortTo(b.v);return false}return false}
function move(p){const D=K.drag;if(!D)return;if(D.bar){K.bars.dx=p.x-D.x0;K.bars.dy=p.y-D.y0;return A.redraw()}
 const m=handAngle(p);let d=m-D.last;if(d<-30)d+=60;if(d>30)d-=60;D.last=m;if(d>0&&K.wind.m<60){K.wind.acc=(K.wind.acc||0)+d;const whole=Math.floor(K.wind.acc);if(whole>=1){K.wind.acc-=whole;addMins(whole)}}}
function up(){const D=K.drag;K.drag=null;if(D&&D.bar){const drop=K.bars.dy>A.H*.25;K.bars.dx=K.bars.dy=0;if(drop)addBar();else{A.redraw();tell('Drag the hour bar down onto the minute line.')}}}
function fresh(){epoch++;for(const k in K)delete K[k];Object.assign(K,{wind:{m:0,acc:0},fives:{n:0,lit:{}},day:{h:0},bars:{n:0,dx:0,dy:0},sort:{k:0,peek:0},drag:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();K.check()}
const met=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();c.say(desc);A.cv.setAttribute('aria-label',desc);keys();K.check=met(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
function keys(){if(!row)return;row.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='wind'){B('+1 minute',()=>addMins(1),'Move the long hand on 1 minute');B('+5 minutes',()=>addMins(5),'Move the long hand on 5 minutes')}
 if(k==='fives')B('Next five',()=>tapNum(K.fives.n+1),'Count on to the next number');
 if(k==='day'){B('+1 hour',()=>addHrs(1),'Move the short hand on 1 hour');B('+6 hours',()=>addHrs(6),'Move the short hand on 6 hours')}
 if(k==='bars'){B('Add 1 hour',addBar,'Put a 1-hour bar on the minute line');B('Take 1 away',takeBar,'Take a 1-hour bar off the line')}
 if(k==='sort'){B('Less',()=>sortTo(-1),'Less than 1 hour');B('Exactly 1 hour',()=>sortTo(0));B('More',()=>sortTo(1),'More than 1 hour')}}
const steps=[
{h:'Once round',p:'Drag the long blue hand round the clock, or tap +5 minutes. Each bead is one minute.',
 predict:{q:'How many minutes does the long hand take to go once round?',opts:['12','60','100'],ans:1},task:'Turn the long hand once round',
 show:()=>play(0,Array(12).fill(()=>addMins(5)),260),
 go:()=>open(0,'A clock at 3 o\'clock and an empty frame of 60 beads.',()=>K.wind.m>=60,'Once round is 60 minutes: one hour.')},
{h:'Count in fives',p:'Each number on the clock is 5 more minutes. Tap the numbers in order and count in fives.',
 predict:{q:'The long hand points at 3. How many minutes past the hour?',opts:['3','15','30'],ans:1},task:'Count round all 12 numbers',
 show:()=>play(1,Array(12).fill(0).map((_,j)=>()=>tapNum(j+1)),260),
 go:()=>open(1,'A clock face with the numbers 1 to 12.',()=>K.fives.n>=12,'12 jumps of 5 make 60.')},
{h:'A whole day',p:'Now watch the short red hand. Move it on, hour by hour, through a day and a night.',
 predict:{q:'How many hours are in one whole day and night?',opts:['12','24','60'],ans:1},task:'Move the short hand through one whole day',
 show:()=>play(2,Array(4).fill(()=>addHrs(6)),400),
 go:()=>open(2,'A clock at midnight and an empty chart of 24 hours.',()=>K.day.h>=24,'The short hand goes round twice in a day.')},
{h:'Hours into minutes',p:'Each bar is 1 hour long. Drag bars down onto the minute line, or tap Add 1 hour.',task:'Show 2 hours on the minute line',
 show:()=>play(3,[addBar,addBar],500),
 go:()=>open(3,'A minute line from 0 to 180 and a 1-hour bar above it.',()=>K.bars.n>=2,'2 hours is 120 minutes.')},
{h:'Less or more?',p:'Is each time less than 1 hour, exactly 1 hour or more? Tap a box.',task:'Sort all 6 times',
 show:()=>play(4,CARDS.map(([,m])=>()=>sortTo(Math.sign(m-60))),420),
 go:()=>open(4,'A time card and three boxes: less than, exactly, or more than 1 hour.',()=>K.sort.k>=CARDS.length,'Compare each time with 60 minutes.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.check()});
const QS=[
 {q:'How many minutes are in 1 hour?',a:'60',o:[['12','twelve'],['100','hundred']]},
 {q:'How many hours are in 1 day?',a:'24',o:[['12','clock12'],['60','mix']]},
 {q:'How many minutes are in 2 hours?',a:'120',o:[['62','add'],['200','hundred']]},
 {q:'The long hand points at 6. How many minutes past the hour?',a:'30',o:[['6','count1'],['60','count1']]},
 {q:'Is 90 minutes more or less than 1 hour?',a:'More than 1 hour',o:[['Less than 1 hour','over'],['Exactly 1 hour','hundred']]},
 {q:'The short hand goes once round the clock. How long is that?',a:'12 hours',o:[['1 whole day','clock12'],['60 minutes','mix']]}];
function why(t){let m='An hour is 60 minutes, and a day is 24 hours.';
 if(t==='twelve')m='There are 12 numbers on the clock, but 60 minutes. Each number is 5 minutes.';
 if(t==='hundred')m='Time does not go in hundreds. 1 hour is 60 minutes, not 100.';
 if(t==='clock12')m='The short hand goes round twice in a day: 12 hours and 12 more makes 24.';
 if(t==='add')m='2 hours is 60 minutes and 60 more minutes: 120 minutes.';
 if(t==='count1')m='Count in fives from 12: at 1 it is 5 minutes, at 3 it is 15, at 6 it is 30.';
 if(t==='over')m='90 is more than 60, so 90 minutes is more than 1 hour.';
 if(t==='mix')m='Minutes and hours are different. 60 minutes make an hour; 24 hours make a day.';
 return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{quiz.hidden=B.step!==5;row.hidden=B.step===5;keys()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Clock controls'},box);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
