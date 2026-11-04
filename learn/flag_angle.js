/* Flagship – types of angles and diagram marks (ages 8–12): turn an arm to see a right angle as a quarter turn and two
   right angles as a straight line; sort tilted and reflex angles into acute, right, obtuse and reflex; compare angles
   whose arms have different lengths; read the marks on a diagram (square = 90°, ticks = equal sides, arcs = equal
   angles, ∠ABC has its vertex in the middle); and use the marks to find a missing angle on a line, in a corner and
   round a point. The Challenge targets the usual slips: longer arms mean a bigger angle, a tilted right angle is not
   right, a tick means 1 cm, the first letter names the vertex, and using 360° on a straight line. Drag has button twins. */
(()=>{
const TURN=[90,180,270],SORT=[[50,0],[90,35],[125,200],[25,100],[90,180],[230,10]],TYPES=['Acute','Right','Obtuse','Reflex'];
const PAIRS=[[60,.5,40,1],[70,1,70,.5],[35,.5,55,1]];
const MARKS=[['AB has one tick. Which side is the same length?',['AC','BC','AD']],['Which angle has the same arc as ∠ABC?',['∠ACB','∠BAC','∠ADB']],
 ['What does the small square at D tell you?',['∠ADB = 90°','AD = DB','AD is 90 cm']],['BD and DC each have two ticks. So…',['BD = DC','BD is 2 cm','BD is twice AB']]];
const MISS=[[[0,50,180],['x',130],50,[130,50,230],'180 − 130 = 50. Angles on a straight line add up to 180°.',null],
 [[0,35,90],[35,'x'],55,[35,125,55],'90 − 35 = 55. The square says the whole corner is 90°.',0],
 [[0,150,270,360],[150,'x',90],120,[210,120,60],'360 − 150 − 90 = 120. Angles round a point add up to 360°.',270]];
const N={turn:3,arms:3,marks:4,miss:3},RD=Math.PI/180;
const typeOf=a=>a<90?0:a===90?1:a<180?2:3;
VIS.reg('flagangle',c=>{let A,pad,quiz,qNo=-1,streak=0;const M={};
const scene=()=>['turn','sort','arms','marks','miss','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const big=n=>Math.round(n*(A.narrow?1:1.15));
function text(g,t,x,y,n,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const pt=(v,t,L)=>({x:v.x+Math.cos(t*RD)*L,y:v.y-Math.sin(t*RD)*L});
const dir=(v,p)=>(Math.atan2(v.y-p.y,p.x-v.x)/RD+360)%360;
function seg(g,a,b,col,w){g.lineWidth=w||4;g.lineCap='round';g.strokeStyle=col||A.col.tx;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
function arc(g,v,t1,span,r,col,fill){g.beginPath();if(fill){g.moveTo(v.x,v.y)}g.arc(v.x,v.y,r,-t1*RD,-(t1+span)*RD,true);if(fill){g.closePath();g.fillStyle=fill;g.fill()}g.lineWidth=2.5;g.strokeStyle=col||A.col.tx;g.stroke()}
function square(g,v,t,s,col){const a=pt(v,t,s),b=pt(v,t+90,s),c2=pt(a,t+90,s);g.lineWidth=2.5;g.strokeStyle=col||A.col.tx;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(c2.x,c2.y);g.lineTo(b.x,b.y);g.stroke()}
/* an angle: fixed arm at t, second arm turned a degrees anticlockwise; square for 90, arc otherwise */
function angle(g,v,t,a,L,col,ar){const C=A.col;seg(g,v,pt(v,t,L),C.tx);seg(g,v,pt(v,t+a,L),col||C.cy);
 if(a===90)square(g,v,t,Math.min(L*.22,22),C.or);else if(a>0)arc(g,v,t,a,ar||Math.min(L*.28,30),C.or,A.alpha(C.or,.22));A.paint.ball(v.x,v.y,4,C.tx)}
function ticks(g,p,q,n){const m={x:(p.x+q.x)/2,y:(p.y+q.y)/2},d=Math.hypot(q.x-p.x,q.y-p.y),u={x:(q.x-p.x)/d,y:(q.y-p.y)/d};
 for(let k=0;k<n;k++){const o=(k-(n-1)/2)*7,c0={x:m.x+u.x*o,y:m.y+u.y*o};seg(g,{x:c0.x-u.y*8,y:c0.y+u.x*8},{x:c0.x+u.y*8,y:c0.y-u.x*8},A.col.vi,2.5)}}
/* ---- layout ---- */
const turnV=()=>({x:A.W/2,y:A.H*.56}),turnL=()=>Math.min(A.W*.36,A.H*.34);
const bin=i=>{const w=(A.W-30)/4;return{x:6+i*(w+6),y:A.H*.76,w,h:A.H*.2}};
function tri(){const W=A.W,H=A.H;return{A:{x:W*.5,y:H*.16},B:{x:W*.16,y:H*.74},C:{x:W*.84,y:H*.74},D:{x:W*.5,y:H*.74}}}
/* ---- drawing ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=scene();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){const s=Math.min(W*.16,H*.26);[[25,'acute'],[90,'right'],[130,'obtuse']].forEach(([a,n],i)=>{const p={x:W*(.12+i*.3),y:H*.62};angle(g,p,0,a,s);text(g,n,p.x+s*.4,H*.8,15)});text(g,'Angles measure turn.',W/2,H*.14,17);return}
 if(v==='turn')drawTurn(g,W,H,C);if(v==='sort')drawSort(g,W,H,C);if(v==='arms')drawArms(g,W,H,C);if(v==='marks')drawMarks(g,W,H,C);if(v==='miss')drawMiss(g,W,H,C);A.fx.draw(g)}
function drawTurn(g,W,H,C){const v=turnV(),L=turnL(),r=Math.min(M.r,2),k=M.a/90;
 text(g,M.r>=3?'1, 2, 3 right angles.':['Turn the arm a quarter turn.','Now make a half turn.','Now three quarter turns.'][r],W/2,H*.07,16);
 angle(g,v,0,M.a,L,C.cy);A.paint.ball(pt(v,M.a,L).x,pt(v,M.a,L).y,12,A.alpha(C.cy,.8));
 text(g,`${M.a}°  ${M.a===0?'':M.a===180?'Straight line':TYPES[typeOf(M.a)]}`,W/2,H*.9,18);if(M.a&&Number.isInteger(k))text(g,`${k} right angle${k>1?'s':''}`,W/2,H*.15,15,C.tx,700)}
function drawSort(g,W,H,C){const i=Math.min(M.r,5),[a,t]=SORT[i],v={x:W/2,y:H*.44},L=Math.min(W*.3,H*.26);
 text(g,M.r>=6?'All 6 sorted!':`Angle ${i+1} of 6. Which type?`,W/2,H*.06,16);if(M.r<6)angle(g,v,t,a,L,C.cy);
 TYPES.forEach((n,k)=>{const b=bin(k);g.fillStyle=M.bad===k?A.alpha(C.rd,.25):A.alpha(C.vi,.12);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();text(g,n,b.x+b.w/2,b.y+b.h*.3,14);text(g,String(M.sorted[k]),b.x+b.w/2,b.y+b.h*.7,18)})}
function drawArms(g,W,H,C){const r=Math.min(M.r,2),[a1,l1,a2,l2]=PAIRS[r],s=Math.min(W*.42,H*.62);
 text(g,M.r>=3?'Arm length does not change the angle.':'Which angle is bigger?',W/2,H*.07,16);
 [[a1,l1,W*.05,'Left'],[a2,l2,W*.53,'Right']].forEach(([a,l,x,n])=>{const v={x,y:H*.72};angle(g,v,0,a,s*l,C.cy,18);text(g,n,x+s*.2,H*.82,14);if(M.full)text(g,a+'°',x+s*.3,H*.9,16,C.tx)})}
function drawMarks(g,W,H,C){const T=tri(),r=Math.min(M.r,3);
 text(g,M.r>=4?'The marks tell you what is equal.':MARKS[r][0],W/2,H*.05,13);
 seg(g,T.A,T.B);seg(g,T.A,T.C);seg(g,T.B,T.C);seg(g,T.A,T.D,C.mu,2.5);ticks(g,T.A,T.B,1);ticks(g,T.A,T.C,1);ticks(g,T.B,T.D,2);ticks(g,T.D,T.C,2);
 arc(g,T.B,0,dir(T.B,T.A),22,C.or);arc(g,T.C,dir(T.C,T.A),180-dir(T.C,T.A),22,C.or);square(g,T.D,90,14,C.or);
 [['A',T.A,0,-14],['B',T.B,-14,10],['C',T.C,14,10],['D',T.D,0,18]].forEach(([n,p,dx,dy])=>text(g,n,p.x+dx,p.y+dy,16))}
function drawMiss(g,W,H,C){const r=Math.min(M.r,2),[rays,reg,ans,,,sq]=MISS[r],v={x:W/2,y:r===2?H*.5:H*.7},L=Math.min(W*.4,r===2?H*.34:H*.5);
 text(g,M.r>=3?'Line 180°, corner 90°, point 360°.':'Find x.',W/2,H*.06,16);rays.forEach(t=>seg(g,v,pt(v,t,L)));
 reg.forEach((q,i)=>{const t1=rays[i],sp=rays[i+1]-t1,m=pt(v,t1+sp/2,L*.42);if(q!==90)arc(g,v,t1,sp,q==='x'?L*.24:L*.18,q==='x'?C.vi:C.or);
  text(g,q==='x'?(M.full?ans+'°':'x'):q+'°',m.x,m.y,15,q==='x'?C.vi:C.tx)});if(sq!=null)square(g,v,sq,14,C.or);A.paint.ball(v.x,v.y,4,C.tx)}
/* ---- actions ---- */
function turn(d){if(scene()!=='turn'||M.full||M.r>=3)return;setA(Math.max(0,Math.min(345,M.a+d)))}
function setA(a){if(a===M.a)return;M.a=a;A.sound.tick();const want=TURN[M.r];
 if(a===want){M.full=1;A.sound.pop();tell(['A quarter turn makes a right angle, 90°. The little square marks it.','Two right angles make a half turn: a straight line, 180°.','Three right angles make 270°. More than a straight line is a reflex angle.'][M.r])}
 else tell(`${a}°. ${a===180?'A straight line':TYPES[typeOf(a)]}. ${a<want?'Keep turning.':'Too far, turn back.'}`);A.redraw();buttons()}
function classify(k){if(scene()!=='sort'||M.r>=6)return;const[a,t]=SORT[M.r],ok=typeOf(a);
 if(k!==ok){A.sound.miss();M.bad=k;let m=ok===1&&t?'It is tilted, but the corner is still square: a right angle.':ok===3?'Look at the arc: it goes the long way round, past a straight line. That is reflex.':k===1?'Not a square corner. Check it with the corner of a page.':ok===0?'It is smaller than a square corner, so it is acute.':'Wider than a square corner but less than a straight line: obtuse.';
  tell(m);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.sorted[k]++;M.r++;A.sound.pop();tell(`Yes, ${a}° is ${TYPES[k].toLowerCase()}.`+(M.r<6?' Next angle.':''));A.redraw();buttons();M.want()}
const armAns=([a1,,a2])=>a1>a2?0:a1<a2?1:2;
function pickArms(k){if(scene()!=='arms'||M.full||M.r>=3)return;const P=PAIRS[M.r],ok=armAns(P);
 if(k!==ok){A.sound.miss();const longer=P[1]>P[3]?0:1;tell(k===longer?'Those arms are longer, but that does not matter. Look at how wide the opening is.':'Look at the opening between the arms, not the arm length.');return}
 M.full=1;A.sound.pop();tell(ok===2?`Both are ${P[0]}°. Same opening, same angle, even with long arms.`:`Yes: ${P[0]}° and ${P[2]}°. The wider opening wins.`);A.redraw();buttons()}
function pickMark(k){if(scene()!=='marks'||M.full||M.r>=4)return;
 if(k!==0){A.sound.miss();const m=[['','BC has no tick. Only sides with the same marks are equal.','AD has no tick, so we do not know it matches AB.'],['','∠BAC has no arc. Look for the arc that matches.','∠ADB has a square, not an arc.'],['','The square is about the angle, not the sides.','The square means 90°, an angle, not a length.'],['','Ticks do not give a length. Two ticks only pair up sides.','Ticks only show which sides match.']][M.r][k];tell(m);return}
 M.full=1;A.sound.pop();tell(['Yes. Same number of ticks, same length: AB = AC.','Yes. Matching arcs mean equal angles: ∠ABC = ∠ACB. The middle letter is the vertex.','Yes. A small square means a right angle, 90°.','Yes. Matching double ticks mean BD = DC. D is halfway along BC.'][M.r]);A.redraw();buttons()}
function pickMiss(n){if(scene()!=='miss'||M.full||M.r>=3)return;const[,reg,ans,,msg]=MISS[M.r];
 if(n!==ans){A.sound.miss();tell(reg.includes(n)?'That is the angle you were given. x is the other part.':`Check: the angles must add up to ${M.r===0?180:M.r===1?90:360}°.`);return}
 M.full=1;A.sound.pop();tell(msg);A.redraw();buttons()}
function nextRound(){const v=scene(),n=N[v];if(!M.full||M.r>=n)return;if(M.r===n-1){M.r=n;A.redraw();buttons();return M.want()}M.r++;if(v!=='turn')M.full=0;else M.full=0;
 tell(v==='turn'?'Keep turning the same arm.':v==='marks'?MARKS[M.r][0]:v==='arms'?'Which angle is bigger?':'Find x.');A.redraw();buttons();M.want()}
const order=(L,r)=>L.map((x,i)=>i).slice(r%L.length).concat(L.map((x,i)=>i).slice(0,r%L.length));
function buttons(){if(!pad)return;pad.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(M.full&&M.r<N[v]){B(M.r<N[v]-1?'Next one':'Finish',nextRound);return}
 if(v==='turn'&&M.r<3){B('Turn 15° more',()=>turn(15),'Turn the arm 15 degrees more');B('Turn 15° back',()=>turn(-15),'Turn the arm 15 degrees back')}
 if(v==='sort'&&M.r<6)TYPES.forEach((n,k)=>B(n,()=>classify(k),`Sort as ${n}`));
 if(v==='arms'&&M.r<3)['Left is bigger','Right is bigger','Same size'].forEach((t,k)=>B(t,()=>pickArms(k)));
 if(v==='marks'&&M.r<4)order(MARKS[M.r][1],M.r).forEach(k=>B(MARKS[M.r][1][k],()=>pickMark(k)));
 if(v==='miss'&&M.r<3)MISS[M.r][3].forEach(n=>B(n+'°',()=>pickMiss(n),`x is ${n} degrees`))}
/* ---- pointer: drag the arm round, or tap a sorting bin ---- */
function down(p){const v=scene();if(M.full&&v!=='sort'){nextRound();return false}
 if(v==='turn'&&M.r<3){const q=pt(turnV(),M.a,turnL());if(Math.hypot(p.x-q.x,p.y-q.y)<44||Math.hypot(p.x-turnV().x,p.y-turnV().y)<turnL()){M.drag=1;move(p);return true}}
 if(v==='sort')TYPES.forEach((n,k)=>{if(inside(p,bin(k)))classify(k)});return false}
function move(p){if(!M.drag||M.full)return;const a=Math.round(dir(turnV(),p)/15)*15%360;if(a<=345)setA(a)}
function up(){M.drag=0}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function runList(fns,gap){const me=++M.ver;fns.forEach((f,j)=>setTimeout(()=>{if(me===M.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function reset(){const v=(M.ver||0)+1;Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,{ver:v,want:()=>{},r:0,a:0,full:0,bad:-1,sorted:[0,0,0,0],drag:0})}
const steps=[
{h:'An angle is a turn',p:'An angle measures how far something turns. Drag the blue arm round, or use the buttons.',predict:{q:'Two right angles together make…',opts:['a straight line','a full turn','a smaller angle'],ans:0},task:'Make 1, 2 and 3 right angles',
 show:()=>{steps[0].go();runList([0,1,2].flatMap(()=>[...Array(6).fill(()=>turn(15)),nextRound]),150)},
 go:()=>{reset();tell('The arm is at 0°. Turn it a quarter turn.');buttons();M.want=ready(0,()=>M.r>=3,'A right angle is a quarter turn, 90°. Two make a straight line, 180°.')}},
{h:'Sort the angles',p:'Acute is less than a right angle. Obtuse is between a right angle and a straight line. Reflex is more than a straight line.',task:'Sort all 6 angles',
 show:()=>{steps[1].go();runList(SORT.map(([a])=>()=>classify(typeOf(a))),450)},
 go:()=>{reset();tell('Is this angle acute, right, obtuse or reflex?');buttons();M.want=ready(1,()=>M.r>=6,'The type depends on the turn, not on which way the angle faces.')}},
{h:'Longer arms?',p:'An angle is the turn between two arms. Does making the arms longer make the angle bigger?',predict:{q:'Angle L has short arms and opens wider. Angle R has long arms. Which is bigger?',opts:['R, its arms are longer','L, it opens wider','You cannot tell'],ans:1},task:'Compare 3 pairs',
 show:()=>{steps[2].go();runList(PAIRS.flatMap(P=>[()=>pickArms(armAns(P)),nextRound]),550)},
 go:()=>{reset();tell('Which angle is bigger: left or right?');buttons();M.want=ready(2,()=>M.r>=3,'Only the opening counts. Arm length does not change an angle.')}},
{h:'Read the marks',p:'Diagrams use marks: a small square means 90°, matching ticks mean equal sides and matching arcs mean equal angles. ∠ABC is the angle at B.',predict:{q:'Two sides each have one tick. What does that tell you?',opts:['Each is 1 cm','They are the same length','They are parallel'],ans:1},task:'Answer 4 questions',
 show:()=>{steps[3].go();runList(MARKS.flatMap(()=>[()=>pickMark(0),nextRound]),550)},
 go:()=>{reset();tell(MARKS[0][0]);buttons();M.want=ready(3,()=>M.r>=4,'Marks give you facts without measuring.')}},
{h:'Find the missing angle',p:'Angles on a straight line add up to 180°. A right angle is 90°. Angles round a point add up to 360°.',predict:{q:'Angles on a straight line add up to…',opts:['90°','360°','180°'],ans:2},task:'Find x 3 times',
 show:()=>{steps[4].go();runList(MISS.flatMap(m=>[()=>pickMiss(m[2]),nextRound]),550)},
 go:()=>{reset();tell('Two angles on a straight line. One is 130°. Find x.');buttons();M.want=ready(4,()=>M.r>=3,'Subtract what you know from 180°, 90° or 360°.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.want()});
const QS=[['An angle is more than a right angle but less than a straight line. It is…',[['obtuse','ok'],['acute','acute'],['reflex','reflex']]],
 ['Two angles open the same amount. One has arms twice as long. Which is bigger?',[['They are equal','ok'],['The long one','arms'],['The short one','arms']]],
 ['Angles on a straight line are 110° and x. What is x?',[['70°','ok'],['250°','360'],['110°','copy']]],
 ['In ∠XYZ, which point is the vertex?',[['Y','ok'],['X','first'],['Z','first']]],
 ['Two sides each have one tick mark. What does that mean?',[['They are equal in length','ok'],['Each is 1 cm','tick'],['They are parallel','par']]],
 ['A right angle is turned so neither arm is flat. What is it now?',[['Still a right angle','ok'],['Acute','tilt'],['Obtuse','tilt']]]];
function slip(t){let m='Think about how far one arm turns from the other.';
 if(t==='acute')m='Acute is smaller than a right angle. Between a right angle and a straight line is obtuse.';
 if(t==='reflex')m='Reflex is more than a straight line. This one is less, so it is obtuse.';
 if(t==='arms')m='Arm length does not change an angle. The same opening is the same angle.';
 if(t==='360')m='That uses 360°. A straight line is a half turn: 180 − 110 = 70.';
 if(t==='copy')m='That is the angle you were given. The two parts make 180°, so x = 70°.';
 if(t==='first')m='The middle letter is the vertex. In ∠XYZ the corner is at Y.';
 if(t==='tick')m='Ticks are not lengths. Matching ticks just say the sides are equal.';
 if(t==='par')m='Parallel lines are marked with arrows. Ticks mean equal length.';
 if(t==='tilt')m='Turning the whole angle does not change it. The corner is still square: 90°.';
 return m}
function ask(){qNo++;const[q,ops]=QS[qNo%QS.length],r=qNo%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} right in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
