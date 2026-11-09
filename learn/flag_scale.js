/* Flagship: Measuring accurately (ages 7-9; NC Y3/4 working scientifically, thermometers and data loggers). Ruler from 0;
   what a jug mark is worth (gaps, not marks); eye level (from above reads high); tare; wait for the logger, then repeat. */
(()=>{
VIS.reg('flagscale',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['ruler','jug','eye','tare','settle','chal'][A.step];
const INK='#0f172a',CARD='#f8fafc',WOOD='#fde68a',PENCIL='#facc15',WATER='#60a5fa',BOWL='#a78bfa';
const READ=[20,31,36,38,39,40,40,40,40,40]; // °C every 10 s
const JUG=500,TRUE_EYE=300,BOWL_G=150,APPLE_G=180,PEN=9;
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const ink=()=>A.col.dark?'#e2e8f0':INK,snd=k=>A.sound[k](),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),r1=v=>Math.round(v*10)/10;
const cm=v=>(Math.round(v*10)/10).toFixed(1).replace(/\.0$/,'').replace('-','−');
/* label on a light card, readable in both themes */
function pill(s,x,y,size,ring){const g=A.ctx,px=size||(A.narrow?14:16);g.font=`700 ${px}px system-ui`;mid(g);
 const w=g.measureText(s).width+18;x=clamp(x,w/2+4,A.W-w/2-4);g.fillStyle=CARD;A.paint.rrect(x-w/2,y-px*.8,w,px*1.6,px*.6);g.fill();
 g.lineWidth=ring?3:1.5;g.strokeStyle=ring||'#94a3b8';g.stroke();g.fillStyle=INK;g.fillText(s,x,y)}
const near=(p,r,d=0)=>p.x>=r.x-d&&p.x<=r.x+r.w+d&&p.y>=r.y-d&&p.y<=r.y+r.h+d;
const mid=g=>{g.textAlign='center';g.textBaseline='middle'},seg=(g,a,b,x,y)=>{g.beginPath();g.moveTo(a,b);g.lineTo(x,y);g.stroke()};

/* 1. ruler: 0 is a little in from the end */
function rulerGeom(){const u=(A.W-40)/16.4,x=v=>20+(v+.8)*u,top=A.H*.46,h=Math.max(46,A.H*.17);return{u,x,top,h}}
function drawRuler(){const g=A.ctx,R=rulerGeom();
 g.fillStyle=WOOD;A.paint.rrect(R.x(-.8),R.top,R.x(15.6)-R.x(-.8),R.h,6);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=`700 ${A.narrow?11:13}px system-ui`;
 const n=R.u>34?10:2;for(let i=0;i<=15*n;i++){const v=i/n,whole=i%n===0,half=(2*i)%n===0;
  g.lineWidth=whole?2:1;seg(g,R.x(v),R.top,R.x(v),R.top+R.h*(whole?.42:half?.28:.16));
  if(whole&&(R.u>22||v%2===0))g.fillText(v,R.x(v),R.top+R.h*.5)}
 g.textBaseline='middle';g.fillText('cm',R.x(15.2),R.top+R.h*.8);
 const a=R.x(S.start),b=R.x(S.start+PEN),py=R.top-28,ph=20;box({x:a,y:py,w:b-a-ph,h:ph},PENCIL,2);
 g.fillStyle='#fcd9b6';g.beginPath();g.moveTo(b-ph,py);g.lineTo(b,py+ph/2);g.lineTo(b-ph,py+ph);g.closePath();g.fill();g.stroke();
 g.setLineDash([5,4]);g.strokeStyle=INK;[a,b].forEach(x=>seg(g,x,R.top,x,R.top+R.h*.45));g.setLineDash([]);
 const zero=S.start===0;pill(zero?'End on 0 ✓':S.start<0?'End is before 0':'End is past 0',a,py-24,null,zero?'#15803d':'#b45309');
 pill(`Tip at ${cm(S.start+PEN)} cm`,b,R.top+R.h+26);pill('End on 0, then read the tip',A.W/2,A.H*.08)}
function slidePencil(v){v=clamp(Math.round(v*10)/10,-.8,4);if(Math.abs(v)<.15)v=0;if(v===S.start)return;S.start=v;snd('tick');
 after(v===0?`End on 0, tip at ${PEN} cm: the pencil is ${PEN} cm long.`:`The end is at ${cm(v)}, not 0. The tip says ${cm(v+PEN)} cm, which is not the length.`)}

/* 2. jug: numbers every 100 ml, 4 small marks between */
function cyl(w,x){const top=A.H*.1,bot=A.H*.9;return{w,x,top,bot,y:v=>bot-6-(v/JUG)*(bot-top-24),v:y=>(bot-6-y)/(bot-top-24)*JUG}}
const jugGeom=()=>{const w=Math.min(170,A.W*(A.narrow?.26:.32));return cyl(w,A.narrow?14:A.W*.36-w/2)};
function glass(C){const g=A.ctx;g.strokeStyle=ink();g.lineWidth=3;g.beginPath();g.moveTo(C.x,C.top);g.lineTo(C.x,C.bot);g.lineTo(C.x+C.w,C.bot);g.lineTo(C.x+C.w,C.top);g.stroke()}
function scaleMarks(x,y,dir){const g=A.ctx;g.strokeStyle=ink();g.fillStyle=ink();g.textBaseline='middle';g.textAlign=dir>0?'left':'right';
 g.font=`700 ${A.narrow?12:14}px system-ui`;for(let v=0;v<=JUG;v+=20){const big=v%100===0;g.lineWidth=big?2.5:1.5;seg(g,x,y(v),x+dir*(big?22:12),y(v));
  if(big)g.fillText(String(v),x+dir*26,y(v))}g.fillText('ml',x+dir*26,y(JUG)-18)}
function drawJug(){const g=A.ctx,J=jugGeom();g.fillStyle=WATER;g.fillRect(J.x,J.y(S.level),J.w,J.bot-J.y(S.level));
 glass(J);
 scaleMarks(J.x+J.w,J.y,1);const rx=A.narrow?A.W*.74:A.W*.75,f=A.narrow?13:16;pill('Pour 260 ml',rx,A.H*.14,f,'#1d4ed8');
 pill(S.level>=200&&S.level<300?`${(S.level-200)/20} marks above 200`:'Count the marks',rx,A.H*.28,f);if(S.level===260)pill('260 ml ✓',rx,A.H*.42,f,'#15803d')}
function markWords(v){const b=Math.floor(v/100)*100,k=(v-b)/20;return k?`${k} mark${k>1?'s':''} above ${b}`:`on ${b}`}
function pour(v){v=clamp(Math.round(v/20)*20,0,JUG);if(v===S.level)return;S.level=v;snd('tick');
 after(`The water is ${markWords(v)}.`+(v===260?' Each mark is 20 ml: 220, 240, 260.':''))}

/* 3. eye level: the sight line meets the scale at the reading you see */
function eyeGeom(){const C=cyl(Math.min(130,A.W*.26),A.W*(A.narrow?.56:.55));C.ex=C.x-Math.min(A.W*.4,230);return C}
const seen=e=>{const G=eyeGeom(),k=(G.x-G.ex)/(G.x+G.w/2-G.ex);return e+(TRUE_EYE-e)*k};   // where the sight line crosses the scale
function drawEye(){const g=A.ctx,G=eyeGeom(),ey=G.y(S.eye),wy=G.y(TRUE_EYE),cross=G.y(seen(S.eye));
 g.fillStyle=WATER;g.fillRect(G.x,wy,G.w,G.bot-wy);glass(G);
 scaleMarks(G.x,G.y,-1);
 const am=A.col.dark?'#fbbf24':'#b45309';g.strokeStyle=am;g.lineWidth=2.5;g.setLineDash([8,5]);seg(g,G.ex+16,ey,G.x+G.w/2,wy);g.setLineDash([]);
 g.fillStyle=am;g.beginPath();g.arc(G.x,cross,6,0,7);g.fill();
 g.fillStyle='#fff';g.strokeStyle=INK;g.beginPath();g.ellipse(G.ex,ey,22,13,0,0,7);g.fill();g.stroke();g.fillStyle='#1e3a8a';g.beginPath();g.arc(G.ex+6,ey,7,0,7);g.fill();
 const got=Math.round(seen(S.eye)/10)*10,level=S.eye===TRUE_EYE;
 pill(`You read ${got} ml`,G.x+G.w/2,A.H*.05+14,null,level?'#15803d':'#b45309');pill(level?'Eye level ✓':S.eye>TRUE_EYE?'Looking down':'Looking up',G.ex+10,Math.max(ey-34,A.H*.05+14))}
function moveEye(v){v=clamp(Math.round(v/20)*20,120,500);if(v===S.eye)return;S.eye=v;snd('tick');const got=Math.round(seen(v)/10)*10;
 after(v===TRUE_EYE?'Eye level with the water: 300 ml, the true amount.':v>TRUE_EYE?`From above you read ${got} ml. Too high.`:`From below you read ${got} ml. Too low.`)}

/* 4. scales: Zero (tare) with the empty bowl on */
function tareGeom(){const cx=A.W/2,b=A.H*.86,w=Math.min(240,A.W*.5),h=A.H*.12,y=b-A.H*.17,o=Math.min(100,A.W*.2);
 return{cx,b,w,pan:{x:cx-w/2,y:b-A.H*.26,w,h:10},screen:{x:cx-w*.42,y,w:w*.5,h},zero:{x:cx+w*.12,y,w:w*.3,h},bowlOff:{x:12,y:b-A.H*.2,w:o,h},appleOff:{x:A.W-o*.8-12,y:b-A.H*.2,w:o*.8,h}}}
const shown=()=>(S.bowl?BOWL_G:0)+(S.apple?APPLE_G:0)-S.tare,ctr=r=>[r.x+r.w/2,r.y+r.h/2];
function bowlAt(x,y,w){const g=A.ctx;g.fillStyle=BOWL;g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.ellipse(x,y,w/2,w*.28,0,0,Math.PI);g.closePath();g.fill();g.stroke()}
function appleAt(x,y,r){const g=A.ctx;g.fillStyle='#dc2626';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();g.strokeStyle='#14532d';g.lineWidth=3;seg(g,x,y-r,x+3,y-r-8)}
function box(r,fill,rad){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
function drawTare(){const g=A.ctx,T=tareGeom(),bw=Math.min(150,T.w*.7);box({x:T.pan.x,y:T.b-A.H*.22,w:T.w,h:A.H*.22},'#cbd5e1',12);box(T.pan,'#94a3b8',2);box(T.screen,'#0f172a',6);box(T.zero,'#fef3c7',8);
 mid(g);g.fillStyle='#86efac';g.font=`700 ${A.narrow?18:24}px ui-monospace,monospace`;g.fillText(`${shown()} g`.replace('-','−'),...ctr(T.screen));
 g.fillStyle=INK;g.font=`800 ${A.narrow?14:17}px system-ui`;g.fillText('ZERO',...ctr(T.zero));
 const [bx,by]=ctr(T.bowlOff),[ax,ay]=ctr(T.appleOff);
 if(S.bowl){bowlAt(T.cx,T.pan.y,bw);if(S.apple)appleAt(T.cx,T.pan.y-2,Math.min(26,bw*.18))}else{bowlAt(bx,by-T.bowlOff.h*.2,T.bowlOff.w);pill('bowl',bx,by+T.bowlOff.h*.75,13)}
 if(!S.apple){appleAt(ax,ay,Math.min(24,T.appleOff.w*.3));pill('apple',ax,ay+T.appleOff.h*.75,13)}
 pill('Mass of the apple on its own?',A.W/2,A.H*.07);if(S.tare)pill(`Zeroed with ${S.tare} g on`,A.W/2,A.H*.19,13)}
function toggleBowl(){if(S.bowl)S.apple=false;S.bowl=!S.bowl;snd('pop');after(`Bowl ${S.bowl?'on':'off'}. The scales show ${shown()} g.`)}
function toggleApple(){if(!S.bowl){snd('miss');return after('Put the bowl on first, or the apple rolls off.')}S.apple=!S.apple;snd('pop');
 const v=shown();after(!S.apple?`Apple out: ${v} g.`:S.tare===BOWL_G?`${v} g: the apple on its own.`:S.tare?`${v} g. Zero was pressed with the wrong things on.`:`${v} g: the bowl and the apple together.`)}
function pressZero(){S.tare+=shown();snd('tick');after(S.apple?'Now the apple counts as nothing! Zero with only the bowl on.':S.bowl?'Zeroed: now the bowl counts as nothing.':'Zeroed with nothing on.')}

/* 5. warm water: wait until the logger line is flat, then repeat */
function drawSettle(){const g=A.ctx,gx=A.narrow?44:56,gy=A.H*.16,gw=A.W*(A.narrow?.62:.6)-gx,gh=A.H*.62,X=t=>gx+(t/90)*gw,Y=v=>gy+gh-((v-15)/30)*gh,K=ink();
 g.strokeStyle=K;g.lineWidth=2;g.beginPath();g.moveTo(gx,gy);g.lineTo(gx,gy+gh);g.lineTo(gx+gw,gy+gh);g.stroke();g.fillStyle=K;g.font=`600 ${A.narrow?11:13}px system-ui`;
 g.textAlign='right';g.textBaseline='middle';[20,30,40].forEach(v=>{g.fillText(v+'°',gx-6,Y(v));g.strokeStyle=A.alpha(K,.25);seg(g,gx,Y(v),gx+gw,Y(v))});
 g.textAlign='center';g.textBaseline='top';[0,30,60,90].forEach(t=>g.fillText(t+' s',X(t),gy+gh+6));
 const n=S.t/10,rd=A.col.dark?'#f87171':'#dc2626';g.strokeStyle=g.fillStyle=rd;g.lineWidth=3;for(let i=0;i<=n;i++){if(i)seg(g,X(i*10-10),Y(READ[i-1]),X(i*10),Y(READ[i]));g.beginPath();g.arc(X(i*10),Y(READ[i]),4,0,7);g.fill()}
 pill('Data logger: °C every 10 s',gx+gw/2,A.H*.07,A.narrow?13:15);
 const tx=A.W*(A.narrow?.86:.82);pill(`${READ[n]} °C`,tx,A.H*.2,A.narrow?18:22,'#dc2626');pill(`time ${S.t} s`,tx,A.H*.34,13);
 S.log.slice(-4).forEach((r,i)=>pill(`${r.t} s: ${r.v} °C`,tx,A.H*.5+i*(A.narrow?26:30),13,r.ok?'#15803d':'#b45309'))}
const rising=()=>READ[Math.min(9,S.t/10+1)]!==READ[S.t/10];
function wait10(){if(S.t>=90)return;S.t+=10;snd('tick');after(`${S.t} seconds: ${READ[S.t/10]} °C.`+(rising()?' Still going up.':' Not going up now.'))}
function readNow(){const v=READ[S.t/10],dup=S.log.some(r=>r.t===S.t);if(dup){snd('miss');return after('Wait 10 seconds first.')}
 S.log.push({t:S.t,v,ok:!rising()});snd('pop');const L=S.log.slice(-3),same=S.settled=L.length===3&&L.every(r=>r.v===v&&r.ok);
 after(rising()?`${v} °C, but the line is still rising: too low.`:same?`Three in a row: ${v} °C each time. Record ${v} °C.`:`${v} °C. The line has stopped. Read again to check.`)}

function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H);const k=part();if(k==='chal'){const Q=QS[qn%QS.length];pill('Challenge',A.W/2,A.H*.1);if(Q)pill(Q.pic,A.W/2,A.H*.5,A.narrow?16:20);return}
 ({ruler:drawRuler,jug:drawJug,eye:drawEye,tare:drawTare,settle:drawSettle})[k]()}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{start:-.8,level:100,eye:420,tare:0,t:0,log:[],grab:null,ok:()=>{}})}
const doneIf=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function play(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||420)*(j+1)))}
function begin(i,say,test,msg){fresh();speak(say);buttons();S.ok=doneIf(i,test,msg)}
function after(m){speak(m);A.redraw();buttons();S.ok()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='ruler'){b('◀ Slide left',()=>slidePencil(S.start-.2),'Slide the pencil left');b('Slide right ▶',()=>slidePencil(S.start+.2),'Slide the pencil right')}
 if(k==='jug'){b('Pour in one mark',()=>pour(S.level+20));b('Pour out one mark',()=>pour(S.level-20))}
 if(k==='eye'){b('Eye up',()=>moveEye(S.eye+20));b('Eye down',()=>moveEye(S.eye-20))}
 if(k==='tare'){b(S.bowl?'Take bowl off':'Put bowl on',toggleBowl);b(S.apple?'Take apple out':'Put apple in',toggleApple);b('Press ZERO',pressZero)}
 if(k==='settle'){b('Wait 10 seconds',wait10);b('Read now',readNow)}}
/* drag pencil, water or eye; tap bowl, apple, ZERO; tap graph (wait) or readings (read) */
function down(p){const k=part();
 if(k==='ruler'){const R=rulerGeom();if(p.y>R.top-60&&p.y<R.top+R.h&&p.x>R.x(S.start)-20&&p.x<R.x(S.start+PEN)+20){S.grab=p.x-R.x(S.start);return true}return false}
 if(k==='jug'){const J=jugGeom();if(p.x>J.x-10&&p.x<J.x+J.w+10&&p.y>J.top-10&&p.y<J.bot+10){S.grab=1;pour(J.v(p.y));return true}return false}
 if(k==='eye'){const G=eyeGeom();return Math.abs(p.x-G.ex)<50&&Math.abs(p.y-G.y(S.eye))<44&&(S.grab=1)}
 if(k==='tare'){const T=tareGeom();if(near(p,T.zero,6))pressZero();else if(!S.apple&&near(p,T.appleOff,9))toggleApple();else if(!S.bowl&&near(p,T.bowlOff,9))toggleBowl();
  else if(near(p,{x:T.pan.x,y:T.pan.y-A.H*.14,w:T.pan.w,h:A.H*.16},0))S.apple?toggleApple():S.bowl&&toggleBowl();return false}
 if(k==='settle')p.x>A.W*(A.narrow?.72:.66)?readNow():wait10();return false}
function move(p){if(S.grab==null)return;const k=part();
 if(k==='ruler'){const R=rulerGeom();slidePencil((p.x-S.grab-20)/R.u-.8)}
 if(k==='jug'){const J=jugGeom();pour(J.v(p.y))}
 if(k==='eye'){const G=eyeGeom();moveEye(G.v(p.y))}}
function up(){S.grab=null}
const steps=[
{h:'Start at zero',p:'Most rulers have a gap before the 0. Drag the pencil, or use the buttons, so its end sits on 0. Then read its tip.',
 predict:{q:'The pencil starts at the end of the ruler, not at 0. The number at its tip is…',opts:['its true length','less than its length','more than its length'],ans:1},
 task:'Put the end of the pencil on 0',show:()=>play(0,[()=>slidePencil(-.6),()=>slidePencil(-.4),()=>slidePencil(-.2),()=>slidePencil(0)]),
 go:()=>begin(0,'A pencil above a ruler. Its end is at the edge, before the 0. The tip is at 8.2 cm.',()=>S.start===0,`End on 0, tip on ${PEN}: the pencil is ${PEN} cm long.`)},
{h:'What is one mark worth?',p:'Numbers every 100 ml, and 4 small marks between 200 and 300. Drag the water, or use the buttons, to pour exactly 260 ml.',
 predict:{q:'4 small marks between 200 and 300. Each mark is worth…',opts:['1 ml','20 ml','25 ml'],ans:1},
 task:'Pour exactly 260 ml',show:()=>play(1,[()=>pour(200),()=>pour(220),()=>pour(240),()=>pour(260)]),
 go:()=>begin(1,'A jug with 100 ml of water. Numbers every 100 ml, 4 small marks between.',()=>S.level===260,'4 marks make 5 gaps: 100 ÷ 5 = 20 ml each.')},
{h:'Eye level',p:'The jug holds 300 ml. You look down from above. The dotted line shows where you see the water on the scale. Drag the eye, or use the buttons.',
 predict:{q:'Reading the jug while looking down from above, you get…',opts:['the right amount','too much','too little'],ans:1},
 task:'Get your eye level with the water',show:()=>play(2,[()=>moveEye(380),()=>moveEye(340),()=>moveEye(300)]),
 go:()=>begin(2,'A jug with 300 ml of water, seen from the side. Your eye is above, looking down.',()=>S.eye===TRUE_EYE,'Eye level: 300 ml. From above it looked like more.')},
{h:'Zero the scales',p:'The apple sits in a bowl, and the bowl has a mass too. Use the bowl, the apple and ZERO so the scales show only the apple.',
 predict:{q:'The empty bowl shows 150 g. You put a 180 g apple in it. The scales now show…',opts:['180 g','330 g','30 g'],ans:1},
 task:'Make the scales show the apple on its own',show:()=>play(3,[toggleBowl,pressZero,toggleApple],600),
 go:()=>begin(3,'Scales showing 0 g. A bowl and an apple are on the table.',()=>S.apple&&S.bowl&&S.tare===BOWL_G,`Zero with the empty bowl, then add the apple: ${APPLE_G} g.`)},
{h:'Wait, then read again',p:'A thermometer just went into warm water. A data logger plots it every 10 s. Wait and read until three readings in a row match.',
 predict:{q:'You read the thermometer the moment it goes in. The reading is…',opts:['right','too low','too high'],ans:1},
 task:'Get three matching readings in a row',show:()=>play(4,[wait10,wait10,wait10,wait10,wait10,readNow,wait10,readNow,wait10,readNow],260),
 go:()=>begin(4,'A thermometer at 20 °C has just gone into warm water.',()=>S.settled,'It rose, then stopped at 40 °C. Matching repeats can be trusted.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
/* question, answer, two wrong answers tagged with their slip */
const QS=[
 {pic:'📏 2 cm ··· 9 cm',q:'A crayon starts at the 2 cm mark and ends at the 9 cm mark. How long is it?',ans:'7 cm',bad:[['9 cm','tip'],['11 cm','add']]},
 {pic:'🫙 300 · · · · 400',q:'A jug has numbers every 100 ml and 4 small marks between. The water is 2 marks above 300. How much?',ans:'340 ml',bad:[['302 ml','ones'],['350 ml','quarter']]},
 {pic:'👁️ ↘ 🫙',q:'Sam reads a jug while looking down at it from above. His reading is…',ans:'too high',bad:[['too low','low'],['right, if he reads it twice','twice']]},
 {pic:'⚖️ 150 g → 400 g',q:'The empty bowl shows 150 g. With flour in, it shows 400 g. How much flour?',ans:'250 g',bad:[['400 g','whole'],['550 g','plus']]},
 {pic:'🌡️ 31 36 38 39 40 40',q:'In warm water a thermometer reads 31, 36, 38, 39, 40, 40 °C, 10 s apart. What do you write down?',ans:'40 °C',bad:[['31 °C','first'],['37 °C','avg']]},
 {pic:'🌡️ 🫙 ⚖️ 📏',q:'Which tool and unit measure how warm water is?',ans:'thermometer, °C',bad:[['measuring jug, ml','jug'],['scales, g','scales']]}];
function why(t){let m='Check where the scale starts and what each mark is worth.';
 if(t==='tip')m='9 is where the tip is, but the crayon starts at 2, not 0: 9 − 2 = 7 cm.';
 if(t==='add')m='Do not add the marks. The crayon covers 2 to 9: 9 − 2 = 7 cm.';
 if(t==='ones')m='A mark is not 1 ml. 4 marks make 5 gaps: 100 ÷ 5 = 20 ml each. 300 + 40 = 340 ml.';
 if(t==='quarter')m='4 marks make 5 gaps, not 4, so each is 100 ÷ 5 = 20 ml, not 25. 340 ml.';
 if(t==='low')m='From above, the sight line meets the scale above the water: too high. From below is too low.';
 if(t==='twice')m='Reading twice from the same wrong place gives the same wrong number. Get level with the water.';
 if(t==='whole')m='400 g is the bowl and the flour together. Take the bowl away: 400 − 150 = 250 g.';
 if(t==='plus')m='Do not add the bowl again; 400 g already includes it. 400 − 150 = 250 g.';
 if(t==='first')m='31 °C was read while it was still rising. Wait until it stops: 40 and 40 match.';
 if(t==='avg')m='Do not average readings taken while it was still warming up. Use the matching ones at the end: 40 °C.';
 if(t==='jug')m='A jug measures how much liquid, in ml. Warmth is temperature: thermometer, °C.';
 if(t==='scales')m='Scales measure mass, in g. Warmth is temperature: thermometer, °C.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():snd('miss');speak(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Measuring controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
