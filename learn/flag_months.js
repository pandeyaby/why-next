/* Flagship – time units and calendar facts (ages 7–8; NC England Y3 measurement: seconds in a minute, days in each month,
   year and leap year). Stop a second hand at 60, count months on knuckles, sort months by days, spot leap years and build a
   365-day then a 366-day year. Every canvas action has a button too. */
(()=>{
 const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const DAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
 const GOALS=[[60,'1 minute'],[90,'1 minute 30 seconds'],[120,'2 minutes']];
 const SPOTS=[[0,'k',0],[0,'d',0],[0,'k',1],[0,'d',1],[0,'k',2],[0,'d',2],[0,'k',3],[1,'k',0],[1,'d',0],[1,'k',1],[1,'d',1],[1,'k',2]]; // hand, knuckle/dip, index
 const CARDS=[8,11,1,3,7,10];          // September, December, February, April, August, November
 const BINS=['31 days','30 days','28 or 29 days'];
 const binOf=m=>m===1?2:DAYS[m]===31?0:1;
 const YEARS=[2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
 VIS.reg('flagmonths',c=>{let A,pad,chal;c.fig.classList.add('young');
 const S={then:()=>{}};
 const stage=()=>['sec','knuck','sort','leap','year','chal'][A.step];
 const INK='#1e293b',SOFT='#475569',LINE='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',SUN='#fef3c7',PICK='#dcfce7',BLUE='#1d4ed8',GREY='#e2e8f0';
 const px=n=>Math.round(n*(A.narrow?1.05:1.2));
 function txt(g,s,x,y,n,col,al){g.font=`700 ${px(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function lines(g,s,max,n){g.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function banner(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};box(g,r,SUN,'#b45309',2);const L=lines(g,s,r.w-16,14);L.forEach((l,i)=>txt(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*px(18),14,col))}
 function feedback(g){if(!S.msg)return;const L=lines(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=px(13)+5,h=L.length*lh+10,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>txt(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
 const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 // grid of equal tiles in the lower part of the canvas (used by the sort bins, leap years and year builder)
 function grid(i,n,cols,top,bottom){const rowsN=Math.ceil(n/cols),gap=6,w=(A.W-20-(cols-1)*gap)/cols,h=Math.min(px(40),(bottom-top-(rowsN-1)*gap)/rowsN);return{x:10+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}}
 // ---- 1. seconds: the hand moves 10 seconds a tap; the learner says when one minute (60 s) and more is reached
 const dial=()=>A.narrow?{x:A.W/2,y:A.H*.38,r:Math.min(A.W*.3,A.H*.21)}:{x:A.W*.3,y:A.H*.53,r:Math.min(A.W*.2,A.H*.3)};
 function drawSec(g){const q=GOALS[S.gi],D=dial(),s=S.sec,turn=(s%60)/60;banner(g,q?`Stop the hand at ${q[1]}.`:'60 seconds make 1 minute!',q?INK:OK);
 g.fillStyle=CARD;g.beginPath();g.arc(D.x,D.y,D.r,0,7);g.fill();g.strokeStyle=LINE;g.lineWidth=3;g.stroke();
 if(turn>0){g.fillStyle=PICK;g.beginPath();g.moveTo(D.x,D.y);g.arc(D.x,D.y,D.r-3,-Math.PI/2,-Math.PI/2+turn*Math.PI*2);g.closePath();g.fill()}
 for(let k=1;k<=12;k++){const a=-Math.PI/2+k/12*Math.PI*2;txt(g,k*5,D.x+Math.cos(a)*D.r*.8,D.y+Math.sin(a)*D.r*.8,k%3?10:12,k%3?SOFT:INK)}
 const a=-Math.PI/2+turn*Math.PI*2;g.strokeStyle=NO;g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(D.x,D.y);g.lineTo(D.x+Math.cos(a)*D.r*.62,D.y+Math.sin(a)*D.r*.62);g.stroke();
 g.fillStyle=INK;g.beginPath();g.arc(D.x,D.y,5,0,7);g.fill();
 const m=Math.floor(s/60),r=s%60,tx=A.narrow?A.W/2:A.W*.7,ty=A.narrow?A.H*.66:A.H*.4;
 txt(g,`${s} seconds`,tx,ty,18,INK);txt(g,`= ${m} minute${m===1?'':'s'} ${r} seconds`,tx,ty+px(26),14,SOFT);
 for(let k=0;k<m;k++){g.fillStyle=OK;g.beginPath();g.arc(tx+(k-(m-1)/2)*px(26),ty+px(52),px(9),0,7);g.fill()}if(m)txt(g,'full turns',tx,ty+px(72),11,SOFT)}
 function tick10(){if(!GOALS[S.gi])return;S.sec+=10;S.msg='';A.sound.tick();update()}
 function stopHere(){const q=GOALS[S.gi];if(!q)return;const s=S.sec;
 if(s===q[0]){right(q[0]===60?'One full turn: 60 seconds = 1 minute.':q[0]===90?'1 minute 30 seconds = 60 + 30 = 90 seconds.':'Two full turns: 2 minutes = 120 seconds.');S.base=s;S.gi++;return update()}
 if(s<q[0])return wrong(`Only ${s} seconds. ${q[1]} is ${q[0]} seconds. Keep going round.`);
 S.sec=S.base;wrong(q[0]===60?`${s} seconds is past one turn. 1 minute is 60 seconds, not 100.`:q[0]===90?`You went to ${s}. 1 minute 30 seconds is 60 + 30 = 90, not 130.`:`You went to ${s}. 2 minutes is 60 + 60 = 120 seconds.`)}
 // ---- 2. knuckles: knuckle = 31 days, dip = 30 (February 28 or 29); July and August both land on knuckles
 function spotXY(i){const [h,kd,j]=SPOTS[i],w=A.narrow?A.W*.84:A.W*.42,x0=A.narrow?A.W*.08:(h?A.W*.54:A.W*.04),yTop=A.narrow?(h?A.H*.56:A.H*.25):A.H*.38;
 const step=w/4,x=x0+(kd==='k'?(j+.5)*step:(j+1)*step),y=yTop+(kd==='k'?0:px(16));return{x,y,x0,w,yTop}}
 function drawHand(g,h){const P=spotXY(h?7:0),bump=P.w/8;g.fillStyle='#fde7cf';g.strokeStyle='#9a3412';g.lineWidth=2.5;g.beginPath();g.moveTo(P.x0,P.yTop+px(70));g.lineTo(P.x0,P.yTop+px(16));
 for(let j=0;j<4;j++){const cx=P.x0+(j+.5)*P.w/4;g.quadraticCurveTo(cx-bump,P.yTop-px(10),cx,P.yTop-px(8));g.quadraticCurveTo(cx+bump,P.yTop-px(10),P.x0+(j+1)*P.w/4,P.yTop+px(16))}
 g.lineTo(P.x0+P.w,P.yTop+px(70));g.closePath();g.fill();g.stroke();txt(g,h?'right fist':'left fist',P.x0+P.w/2,P.yTop+px(58),11,SOFT)}
 function fists(g,m){drawHand(g,0);drawHand(g,1);
 SPOTS.forEach((sp,i)=>{const P=spotXY(i),knuckle=sp[1]==='k';if(i<m){g.fillStyle=knuckle?OK:BLUE;g.beginPath();g.arc(P.x,P.y,px(12),0,7);g.fill();txt(g,i===1?28:DAYS[i],P.x,P.y,10,CARD);txt(g,MON[i].slice(0,3),P.x,knuckle?P.y-px(22):P.y+px(22),10,INK)}
 else{g.strokeStyle=i===m?NO:LINE;g.lineWidth=i===m?3:1.5;g.beginPath();g.arc(P.x,P.y,px(10),0,7);g.stroke()}})}
 function drawKnuck(g){const m=S.k;banner(g,m<12?`Where does ${MON[m]} go? Tap the next knuckle or dip.`:'Knuckles: 31 days. Dips: 30. February: 28 or 29.',m<12?INK:OK);fists(g,m)}
 function placeMonth(kind){const m=S.k;if(m>=12)return;const want=SPOTS[m][1];
 if(kind!==want){if(m===7)return wrong('July was the last knuckle on the left fist. Start the right fist on a knuckle: August has 31 days too.');
 return wrong(want==='d'?'Knuckles and dips take turns. After a knuckle comes a dip.':'Knuckles and dips take turns. After a dip comes a knuckle.')}
 right(m===1?'February is a dip, and the short one: 28 days, 29 in a leap year.':`${MON[m]}: ${want==='k'?'knuckle, 31':'dip, 30'} days.`);S.k++;update()}
 // ---- 3. sort months by their number of days (drag the card into a box, or tap a box)
 const binR=i=>grid(i,3,3,A.H*.62,A.H*.8),cardHome=()=>({x:A.W/2-A.W*.2,y:A.H*.28,w:A.W*.4,h:px(46)});
 function drawSort(g){const m=CARDS[S.ci];banner(g,m!=null?`How many days has ${MON[m]}?`:'30 days: September, April, June, November.',m!=null?INK:OK);
 BINS.forEach((b,i)=>{const r=binR(i);box(g,r,S.drag&&inside(S.drag,r)?PICK:CARD,LINE,2.5);lines(g,b,r.w-8,12).forEach((l,j,a)=>txt(g,l,r.x+r.w/2,r.y+r.h/2+(j-(a.length-1)/2)*px(15),12));
 S.sorted.filter(x=>binOf(x)===i).forEach((x,k)=>txt(g,MON[x].slice(0,3),r.x+r.w/2,r.y+r.h+px(14)+k*px(16),11,OK))});
 if(m!=null){const h=cardHome(),r=S.drag?{...h,x:S.drag.x-h.w/2,y:S.drag.y-h.h/2}:h;box(g,r,'#ede9fe','#6d28d9',3);txt(g,MON[m],r.x+r.w/2,r.y+r.h/2,15)}}
 function sortInto(b){const m=CARDS[S.ci];if(m==null)return;const want=binOf(m),M=MON[m];
 if(b!==want){if(m===1)return wrong('February is the short month: 28 days, or 29 in a leap year.');
 if(want===1&&b===0)return wrong(`Thirty days has September, April, June and November. ${M} has 30.`);
 if(b===2)return wrong(`Only February has 28 or 29 days. ${M} has ${DAYS[m]}.`);
 return wrong(m===7?'July and August sit side by side on knuckles: both have 31 days.':`${M} lands on a knuckle: it has 31 days.`)}
 right(`${M} has ${m===1?'28 or 29':DAYS[m]} days.`);S.sorted.push(m);S.ci++;update()}
 // ---- 4. leap years: count on in 4s from 2024
 const yearR=i=>grid(i,12,A.narrow?3:4,A.H*.2,A.H*.78);
 function drawLeap(g){const left=3-S.found.length;banner(g,left?`Tap the leap years. ${left} to find.`:'2024, 2028, 2032: every 4 years.',left?INK:OK);
 YEARS.forEach((y,i)=>{const r=yearR(i),on=S.found.includes(y),no=S.nope.includes(y);box(g,r,on?PICK:no?GREY:CARD,on?OK:LINE,on?3.5:2);txt(g,y,r.x+r.w/2,r.y+r.h*.38,14,no?SOFT:INK);txt(g,on?'366 days':no?'365 days':'',r.x+r.w/2,r.y+r.h*.75,10,on?OK:SOFT)})}
 function pickYear(y){if(S.found.length>=3||S.found.includes(y))return;if(y%4){if(!S.nope.includes(y))S.nope.push(y);
 return wrong(y%2?`${y} is odd. Leap years go up in 4s: 2024, 2028, 2032.`:`${y} is even, but not every even year is a leap year. Count on in 4s from 2024: ${y} is not one.`)}
 S.found.push(y);right(`${y} is a leap year: February has 29 days, so the year has 366.`);update()}
 // ---- 5. build a year: tap all 12 months, then make it a leap year
 const monR=i=>grid(i,12,A.narrow?3:4,A.H*.36,A.H*.8),leapR=()=>({x:A.W*.2,y:A.H*.22,w:A.W*.6,h:px(30)});
 function drawYear(g){const tot=S.added.reduce((t,m)=>t+(m===1&&S.leap?29:DAYS[m]),0),all=S.added.length===12;
 banner(g,!all?'Tap every month to add its days.':!S.leap?'Now make it a leap year.':'A leap year has 366 days!',S.leap?OK:INK);
 const bar={x:10,y:A.H*.15,w:A.W-20,h:px(14)};box(g,bar,CARD,LINE,1.5);g.fillStyle=S.leap?OK:BLUE;A.paint.rrect(bar.x,bar.y,Math.max(6,bar.w*tot/366),bar.h,6);g.fill();
 if(all){const r=leapR();box(g,r,S.leap?PICK:'#ede9fe',S.leap?OK:'#6d28d9',3);txt(g,S.leap?`${tot} days ✓`:`${tot} days. Make it a leap year`,r.x+r.w/2,r.y+r.h/2,12)}else txt(g,`${tot} days so far`,A.W/2,A.H*.28,14);
 MON.forEach((n,i)=>{const r=monR(i),on=S.added.includes(i);box(g,r,on?PICK:CARD,on?OK:LINE,on?3:2);txt(g,n.slice(0,3),r.x+r.w/2,r.y+r.h*.36,13);txt(g,i===1&&S.leap?29:DAYS[i],r.x+r.w/2,r.y+r.h*.74,11,on?OK:SOFT)})}
 function addMonth(i){if(S.added.includes(i))return wrong(`${MON[i]} is in already. Each month counts once.`);S.added.push(i);S.msg='';A.sound.tick();
 if(S.added.length===12)right('12 months: 31 × 7 + 30 × 4 + 28 = 365 days.');update()}
 function makeLeap(){if(S.added.length<12)return wrong('Add all 12 months first.');if(S.leap)return;S.leap=true;right('The extra day is 29 February: 365 + 1 = 366.');update()}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=stage();if(v==='sec')drawSec(g);if(v==='knuck')drawKnuck(g);if(v==='sort')drawSort(g);if(v==='leap')drawLeap(g);if(v==='year')drawYear(g);
 if(v==='chal'){banner(g,'60 seconds = 1 minute. 365 days, or 366 in a leap year.');fists(g,12)}feedback(g);A.fx.draw(g)}
 function update(){const v=stage();let s='Challenge.';
 if(v==='sec')s=GOALS[S.gi]?`Goal: ${GOALS[S.gi][1]}. The hand shows ${S.sec} seconds.`:'All three times made.';
 if(v==='knuck')s=S.k<12?`Next month: ${MON[S.k]}. Knuckle or dip?`:'All 12 months counted on two fists.';
 if(v==='sort')s=CARDS[S.ci]!=null?`Card: ${MON[CARDS[S.ci]]}. Which box?`:'All 6 months sorted.';
 if(v==='leap')s=`Leap years found: ${S.found.join(', ')||'none'}.`;
 if(v==='year')s=`${S.added.length} of 12 months added${S.leap?'; leap year on':''}.`;
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
 function buttons(){if(!pad)return;pad.innerHTML='';const v=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(v==='sec'&&GOALS[S.gi]){b('+10 seconds',tick10,'Move the hand on 10 seconds');b("Stop: that's it",stopHere,'Stop the hand here');b('Start again',()=>{S.sec=S.base;S.msg='';update()},'Move the hand back')}
 if(v==='knuck'&&S.k<12){b('Next knuckle',()=>placeMonth('k'),`Put ${MON[S.k]} on the next knuckle`);b('Next dip',()=>placeMonth('d'),`Put ${MON[S.k]} in the next dip`)}
 if(v==='sort'&&CARDS[S.ci]!=null)BINS.forEach((t,i)=>b(t,()=>sortInto(i),`${MON[CARDS[S.ci]]} has ${t}`));
 if(v==='leap'&&S.found.length<3)YEARS.filter(y=>!S.found.includes(y)&&!S.nope.includes(y)).forEach(y=>b(String(y),()=>pickYear(y),`${y} is a leap year`));
 if(v==='year'){MON.forEach((n,i)=>{if(!S.added.includes(i))b(n.slice(0,3),()=>addMonth(i),`Add ${n}`)});if(S.added.length===12&&!S.leap)b('Make it a leap year',makeLeap)}A.redraw()}
 function down(p){const v=stage();
 if(v==='sec'){const D=dial();if(Math.hypot(p.x-D.x,p.y-D.y)<D.r){tick10();return true}return false}
 if(v==='knuck'){if(S.k>=12)return false;let best=-1,bd=px(30);SPOTS.forEach((_,i)=>{const P=spotXY(i),d=Math.hypot(p.x-P.x,p.y-P.y);if(d<bd){bd=d;best=i}});if(best<0)return false;
 if(best<S.k){wrong(`${MON[best]} is placed already. Tap the next empty bump.`);return true}if(best>S.k){wrong('Go in order: tap the very next bump, the one with the red ring.');return true}placeMonth(SPOTS[best][1]);return true}
 if(v==='sort'){if(CARDS[S.ci]==null)return false;if(inside(p,cardHome())){S.drag={x:p.x,y:p.y};return true}const i=[0,1,2].find(i=>inside(p,binR(i)));if(i!=null){sortInto(i);return true}return false}
 if(v==='leap'){const i=YEARS.findIndex((_,i)=>inside(p,yearR(i)));if(i>=0){pickYear(YEARS[i]);return true}return false}
 if(v==='year'){const i=MON.findIndex((_,i)=>inside(p,monR(i)));if(i>=0&&!S.added.includes(i)){addMonth(i);return true}if(S.added.length===12&&inside(p,leapR())){makeLeap();return true}return false}return false}
 function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){if(!S.drag)return;const i=[0,1,2].find(i=>inside(p||S.drag,binR(i)));S.drag=null;if(i!=null)sortInto(i);else A.redraw()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*(A.reduced()?30:gap)))};
 const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},sec:0,base:0,gi:0,k:0,ci:0,sorted:[],drag:null,found:[],nope:[],added:[],leap:false,msg:'',bad:false})};
 const steps=[
 {h:'One minute',p:'Each tap moves the second hand on 10 seconds. Press Stop when the hand shows the time asked for.',
 predict:{q:'How many seconds make 1 minute?',opts:['60','100','10'],ans:0},
 task:'Make 3 times',show:()=>{steps[0].go();const fs=[];[6,3,3].forEach(n=>{for(let k=0;k<n;k++)fs.push(tick10);fs.push(stopHere)});play(fs,180)},go:()=>{fresh();update();S.then=finish(0,()=>S.gi>=GOALS.length,'1 minute = 60 seconds, so 2 minutes = 120 seconds.')}},
 {h:'Knuckle months',p:'Make two fists. Say the months in order. Each month goes on the next knuckle or in the next dip.',
 predict:{q:'July has 31 days. How many days has August?',opts:['31','30','28'],ans:0},
 task:'Count 12 months',show:()=>{steps[1].go();play(SPOTS.map(sp=>()=>placeMonth(sp[1])),220)},go:()=>{fresh();update();S.then=finish(1,()=>S.k>=12,'Knuckles are 31 days, dips are 30, and February is 28 or 29.')}},
 {h:'Sort the months',p:'Drag each month card into the box with its number of days, or tap a box.',
 predict:{q:'Which month has 30 days?',opts:['September','December','August'],ans:0},
 task:'Sort 6 months',show:()=>{steps[2].go();play(CARDS.map(m=>()=>sortInto(binOf(m))),350)},go:()=>{fresh();update();S.then=finish(2,()=>S.ci>=CARDS.length,'Four months have 30 days, February has 28 or 29, and the other seven have 31.')}},
 {h:'Leap years',p:'A leap year has one extra day, 29 February. Tap the years that are leap years.',
 predict:{q:'How often does a leap year come?',opts:['every 4 years','every year','every 10 years'],ans:0},
 task:'Find 3 leap years',show:()=>{steps[3].go();play([2024,2028,2032].map(y=>()=>pickYear(y)),400)},go:()=>{fresh();update();S.then=finish(3,()=>S.found.length>=3,'Leap years go up in 4s: 2024, 2028, 2032.')}},
 {h:'Build a year',p:'Tap each month to add its days to the year. Then turn it into a leap year.',
 predict:{q:'How many days are in a year that is not a leap year?',opts:['365','360','366'],ans:0},
 task:'Build 2 years',show:()=>{steps[4].go();play(MON.map((_,i)=>()=>addMonth(i)).concat([makeLeap]),200)},go:()=>{fresh();update();S.then=finish(4,()=>S.leap,'A year has 365 days. A leap year has 366.')}},
 {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 // challenge: each wrong answer names the slip behind it
 const Q=[['How many seconds are in 2 minutes?','120',[['200','hundred'],['60','one']]],
 ['How many days has September?','30',[['31','sep'],['28','feb']]],
 ['Which month can have 29 days?','February',[['April','apr'],['December','dec']]],
 ['How many days are in a leap year?','366',[['365','norm'],['400','big']]],
 ['Is 2030 a leap year?','No: 2028 and 2032 are',[['Yes: it ends in 0','zero'],['Yes: every even year is','even']]],
 ['July has 31 days. How many has August?','31',[['30','alt'],['29','feb2']]]];
 function why(tag){let m='Check the hand, the knuckles or the 4s.';
 if(tag==='hundred')m='A minute is 60 seconds, not 100. 2 minutes is 60 + 60 = 120.';
 if(tag==='one')m='60 seconds is only 1 minute. 2 minutes is 120.';
 if(tag==='sep')m='Thirty days has September, April, June and November.';
 if(tag==='feb')m='Only February has 28 days. September has 30.';
 if(tag==='apr')m='April has 30 days. Only February can have 29.';
 if(tag==='dec')m='December is a knuckle month: 31 days. Only February can have 29.';
 if(tag==='norm')m='365 is a normal year. A leap year adds 29 February: 366.';
 if(tag==='big')m='A leap year has just 1 extra day: 365 + 1 = 366.';
 if(tag==='zero')m='Ending in 0 does not matter. Count on in 4s from 2028: 2032 is next.';
 if(tag==='even')m='Not every even year: 2026 and 2030 are even, but leap years go up in 4s.';
 if(tag==='alt')m='July ends the left fist and August starts the right one: both are knuckles, 31 days.';
 if(tag==='feb2')m='Only February can have 29 days. August has 31.';
 return m}
 let qn=-1,streak=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
 function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
