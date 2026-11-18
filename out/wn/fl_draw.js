/* Flagship – Drawing 2-D shapes (ages 10–11; NC England Year 6 Geometry: "draw 2-D shapes using given dimensions and angles"). */
(()=>{
/* lines mm; angles; triangles [AB mm, angle A, AC mm]; rectangles [w, h mm]; polygons [sides, inside angle] */
const LINES=[70,45,83];
const ANG=[60,125,40];
const TRI=[[70,60,50],[60,40,50]];
const RECT=[[60,35],[45,25]];
const POLY=[[5,108],[6,120]];
const rad=d=>d*Math.PI/180,R=Math.round,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),cm=mm=>(mm/10).toFixed(1).replace('.0','');
VIS.reg('flagdraw',c=>{let A,g,pad,chal,qi=-1,ep=0;
const S={};
const INK='#0f172a',OK='#047857',NO='#be123c',WOOD='rgba(253,230,138,.55)',WOODL='#92400e',ARM='#4338ca',SHEET='#ffffff',SOFT='#64748b';
const z=v=>R(v*(A.narrow?.94:1.06)),font=(v,w)=>`${w||750} ${z(v)}px system-ui,sans-serif`;
const no=s=>{s.bad=1;A.sound.miss()},yes=s=>{s.n++;s.bad=0;A.sound.pop()},pill=(t,p)=>A.paint.label(t,p.x,p.y,{bg:'rgba(15,23,42,.82)',font:font(12,700)});
const D={line:LINES,ang:ANG,tri:TRI,rect:RECT,poly:POLY},end=k=>S[k].n>=D[k].length;
const hint=(t,col)=>note(t,A.W/2,paper().y+z(22),13,col||SOFT);
const kind=()=>['line','ang','tri','rect','poly','quiz'][A.step];
function sheet(){g.fillStyle=A.col.dark?'#0b1120':'#f1f5f9';g.fillRect(0,0,A.W,A.H);const P=paper();g.fillStyle=SHEET;A.paint.rrect(P.x,P.y,P.w,P.h,10);g.fill();g.strokeStyle=SOFT;g.lineWidth=1.2;g.stroke();return P}
function fin(t,L,n){const P=paper();title(t,1);L.forEach((x,i)=>note(x,A.W/2,P.y+P.h*(.22+i*.22),n||16))}
function paper(){return{x:8,y:A.H*.15,w:A.W-16,h:A.H*.83}}
function title(t,won){tf(14,800);const w=Math.min(A.W-8,g.measureText(t).width+24),h=z(14)+14,y=A.H*.025;g.fillStyle=won?'#d1fae5':SHEET;A.paint.rrect(A.W/2-w/2,y,w,h,10);g.fill();g.strokeStyle=won?OK:SOFT;g.lineWidth=won?3:1.2;g.stroke();
 g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-14)}
function tf(n,w,al,bl){g.font=font(n,w);g.textAlign=al||'center';g.textBaseline=bl||'middle'}
function note(t,x,y,n,col,al){g.fillStyle=col||INK;tf(n||13,700,al);g.fillText(t,x,y,A.W-20)}
function seg(a,b,col,w,dash){g.strokeStyle=col;g.lineWidth=w||3;g.setLineDash(dash||[]);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.setLineDash([])}
function knob(p,col){g.fillStyle=col||ARM;g.beginPath();g.arc(p.x,p.y,z(10),0,7);g.fill();g.strokeStyle=SHEET;g.lineWidth=2.5;g.stroke()}
/* ruler: 0 mark at o, along angle th, k px per cm, blank strip before 0 */
function ruler(o,th,k,cms){const lip=z(12),h=z(40);g.save();g.translate(o.x,o.y);g.rotate(-rad(th));
 g.fillStyle=WOOD;g.fillRect(-lip,3,cms*k+2*lip,h);g.strokeStyle=WOODL;g.lineWidth=1.2;g.strokeRect(-lip,3,cms*k+2*lip,h);
 for(let i=0;i<=cms*10;i++){const x=i*k/10,L=i%10?i%5?z(6):z(10):z(15);g.beginPath();g.moveTo(x,3);g.lineTo(x,3+L);g.stroke();
  if(i%10===0){g.fillStyle=WOODL;tf(10,700,0,'top');g.fillText(i/10,x,3+z(17))}}g.restore()}
/* protractor: outer numbers count from the right-hand 0, inner from the left-hand 0 */
function protractor(v,r){const every=A.narrow&&r<130?20:10;g.fillStyle=WOOD;g.beginPath();g.arc(v.x,v.y,r,Math.PI,0);g.closePath();g.fill();g.strokeStyle=WOODL;g.lineWidth=1.2;g.stroke();
 for(let d=0;d<=180;d+=5){const L=d%10?z(5):z(10),c=Math.cos(rad(d)),s=Math.sin(rad(d));g.beginPath();g.moveTo(v.x+c*r,v.y-s*r);g.lineTo(v.x+c*(r-L),v.y-s*(r-L));g.stroke();
  if(d%every===0){tf(9,700);g.fillStyle=WOODL;const q=d%180?d:d?176:4,C=Math.cos(rad(q)),Q=Math.sin(rad(q));g.fillText(d,v.x+C*(r-z(19)),v.y-Q*(r-z(19)));g.fillStyle='#6d28d9';g.fillText(180-d,v.x+C*(r-z(33)),v.y-Q*(r-z(33)))}}
 g.fillStyle=WOODL;g.beginPath();g.arc(v.x,v.y,3,0,7);g.fill()}
function arcMark(v,from,to,r,col,txt){g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.arc(v.x,v.y,r,-rad(to),-rad(from));g.stroke();
 if(txt){const m=rad((from+to)/2);note(txt,v.x+Math.cos(m)*(r+z(16)),v.y-Math.sin(m)*(r+z(16)),12,col)}}
const along=(o,th,len)=>({x:o.x+Math.cos(rad(th))*len,y:o.y-Math.sin(rad(th))*len});
function arm(v,a,len,bad){const t=along(v,a,len);seg(v,t,bad?NO:ARM,3.5);knob(t);pill(`crosses ${a} and ${180-a}`,along(v,a,len*.48))}
/* step 1: lines to the millimetre */
function lineGeo(){const P=paper(),k=(P.w-z(56))/10;return{P,k,o:{x:P.x+z(28),y:P.y+P.h*.38}}}
function drawLine(){const s=S.line,P=sheet();if(end('line')){return fin('All 3 lines drawn',LINES.map(t=>`${cm(t)} cm = ${t} mm`),18)}
 const T=LINES[s.n],{k,o}=lineGeo();title(`Line ${s.n+1} of 3: draw a line ${cm(T)} cm long`);ruler(o,0,k,10);
 if(s.n===0&&A.pred[0]!=null){const e={x:o.x-z(12),y:o.y-z(26)};seg(e,{x:o.x+7*k,y:e.y},NO,2,[6,5]);note('from the edge of the ruler: too long',o.x+3.5*k,e.y-z(13),12,NO)}
 const e2={x:o.x+s.mm*k/10,y:o.y};seg(o,e2,s.bad?NO:INK,3.5);knob(e2);hint('Drag the dot along the ruler')}
function setLine(mm){S.line.mm=clamp(R(mm),5,100);A.redraw()}
function checkLine(){const s=S.line;if(end('line'))return;const T=LINES[s.n],d=s.mm-T;let m;
 if(!d){yes(s);s.mm=30;return say(`${cm(T)} cm: ${Math.floor(T/10)} whole centimetres from the 0, then ${T%10} small marks.`)}
 no(s);
 if(d%10===0)m=`Your line is ${cm(s.mm)} cm. Count whole cm from 0: you need ${cm(T)} cm.`;
 else m=`Your line is ${cm(s.mm)} cm. You need ${cm(T)} cm: ${Math.abs(d)} ${d>0?'fewer':'more'} small marks (mm).`;say(m)}
/* step 2: angles and the two scales */
function angGeo(){const P=paper(),r=Math.min(P.w*.42,P.h*.66);return{P,r,v:{x:P.x+P.w/2,y:P.y+P.h*.86}}}
function drawAng(){const s=S.ang,P=sheet();if(end('ang')){return fin('All 3 angles drawn',ANG.map(t=>`${t}°: ${t<90?'acute':'obtuse'}`),18)}
 const T=ANG[s.n],{r,v}=angGeo();title(`Angle ${s.n+1} of 3: draw ${T}° from the base line`);protractor(v,r);seg(v,{x:v.x+r+z(14),y:v.y},INK,3.5);
 arm(v,s.a,r+z(16),s.bad);note('base line →',v.x+r*.62,v.y+z(14),12,SOFT)}
function setAng(a){S.ang.a=clamp(R(a),0,180);A.redraw()}
function angFrom(p,v){return clamp(R(Math.atan2(v.y-p.y,p.x-v.x)*180/Math.PI),0,180)}
function scaleSlip(a,T){return a===180-T&&a!==T?`You read ${T} on the other scale. This angle is ${a}°, ${a>90?'wider':'narrower'} than a right angle. Count up from the 0 on your base line.`:''}
function checkAng(){const s=S.ang;if(end('ang'))return;const T=ANG[s.n];let m;
 if(s.a===T){yes(s);s.a=90;return say(`${T}°, read on the scale that starts at 0 on the base line.`)}
 no(s);m=scaleSlip(s.a,T)||`That is ${s.a}°. ${T>s.a?'Open':'Close'} the arm by ${Math.abs(T-s.a)}° to make ${T}°.`;say(m)}
/* step 3: triangle from two sides and the angle between them */
function triGeo(){const P=paper(),k=Math.min((P.w-z(60))/8,(P.h-z(70))/5.2);return{P,k,a:{x:P.x+z(34),y:P.y+P.h-z(46)}}}
function drawTri(){const s=S.tri,P=sheet();if(end('tri')){return fin('Both triangles drawn',TRI.map(q=>`${cm(q[0])} cm, ${q[1]}°, ${cm(q[2])} cm → BC ≈ ${third(q)} cm`))}
 const q=TRI[s.n],{k,a}=triGeo(),B={x:a.x+s.ab*k/10,y:a.y};title(`Triangle ${s.n+1} of 2: AB ${cm(q[0])} cm, angle A ${q[1]}°, AC ${cm(q[2])} cm`,s.show);
 const want=['Drag B','Drag the arm','Drag C along the arm'][s.k];
 if(s.k===0)ruler(a,0,k,8);seg(a,B,s.k===0&&s.bad?NO:INK,3.5);note('A',a.x-z(14),a.y+z(2),14);note('B',B.x,B.y+z(16),14);
 if(s.k===0){knob(B);hint(want);return}
 if(s.k===1){protractor(a,Math.min(k*3.4,P.h*.7));arm(a,s.a,k*4.6,s.bad);hint(want);return}
 const C=along(a,q[1],s.ac*k/10);seg(a,along(a,q[1],k*5.6),SOFT,1.2,[4,4]);const mk=()=>arcMark(a,0,q[1],z(26),ARM,q[1]+'°');
 if(s.show){mk();seg(C,B,OK,3.5);seg(a,C,INK,3.5);note('C',C.x,C.y-z(14),14);const m={x:(B.x+C.x)/2,y:(B.y+C.y)/2};A.paint.label(`BC ≈ ${third(q)} cm`,m.x+z(30),m.y,{bg:OK,font:font(12,800)});return}
 ruler(a,q[1],k,6);mk();seg(a,C,s.bad?NO:INK,3.5);knob(C);hint(want)}
const third=q=>(Math.sqrt(q[0]*q[0]+q[2]*q[2]-2*q[0]*q[2]*Math.cos(rad(q[1])))/10).toFixed(1);
function nudgeTri(v){const s=S.tri;if(end('tri')||s.show)return;if(s.k===0)s.ab=clamp(s.ab+v,10,80);else if(s.k===1)s.a=clamp(s.a+v,0,180);else s.ac=clamp(s.ac+v,10,60);A.redraw()}
function checkTri(){const s=S.tri;if(end('tri')||s.show)return;const q=TRI[s.n];let m;
 if(s.k===0){if(s.ab===q[0]){s.k=1;s.bad=0;A.sound.pop();return say(`AB is ${cm(q[0])} cm. Now draw the ${q[1]}° angle at A.`)}
  no(s);m=`AB is ${cm(s.ab)} cm. Start at 0 and stop at ${cm(q[0])} cm.`;return say(m)}
 if(s.k===1){if(s.a===q[1]){s.k=2;s.bad=0;A.sound.pop();return say(`Angle A is ${q[1]}°. Now measure AC along that arm.`)}
  no(s);m=scaleSlip(s.a,q[1])||`That is ${s.a}°. The angle at A must be ${q[1]}°.`;return say(m)}
 if(s.ac===q[2]){s.show=1;s.bad=0;A.sound.pop();return say(`Join C to B: BC is about ${third(q)} cm. Three measurements fix the triangle.`)}
 no(s);m=s.ac===q[0]?`That is AB's length. AC is ${cm(q[2])} cm.`:`AC is ${cm(s.ac)} cm. Measure from A to ${cm(q[2])} cm.`;say(m)}
function nextTri(){const s=S.tri;if(!s.show)return;s.show=0;s.n++;s.k=0;s.ab=40;s.a=90;s.ac=30;say(end('tri')?'Both triangles drawn.':'Next triangle. Set AB first.')}
/* step 4: AB and AD are drawn with ruler and set square; the learner places corner C */
function rectGeo(){const P=paper(),k=Math.min((P.w-z(60))/7,(P.h-z(80))/4.4);return{P,k,a:{x:P.x+z(34),y:P.y+P.h-z(40)}}}
function drawRect(){const s=S.rect,P=sheet();if(end('rect'))return fin('Both rectangles drawn',RECT.map(q=>`${cm(q[0])} cm by ${cm(q[1])} cm: 4 right angles`));
 const q=RECT[s.n],{k,a}=rectGeo(),px=v=>v*k/10,B={x:a.x+px(q[0]),y:a.y},D={x:a.x,y:a.y-px(q[1])},C={x:a.x+px(s.cx),y:a.y-px(s.cy)};
 title(`Rectangle ${s.n+1} of 2: ${cm(q[0])} cm by ${cm(q[1])} cm`);hint('AB and AD are drawn. Drag corner C.');
 g.fillStyle=WOOD;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(a.x,a.y-px(48));g.lineTo(a.x+px(28),a.y);g.closePath();g.fill();g.strokeStyle=WOODL;g.stroke();
 g.strokeStyle=ARM;g.lineWidth=2;g.strokeRect(a.x,a.y-z(12),z(12),z(12));seg(a,B,INK,3.5);seg(a,D,INK,3.5);note('A',a.x-z(12),a.y,13);note('B',B.x,B.y+z(14),13);note('D',D.x-z(12),D.y,13);
 seg(D,C,s.bad?NO:SOFT,2.5,[6,4]);seg(B,C,s.bad?NO:SOFT,2.5,[6,4]);knob(C);const ang=R(Math.atan2(B.y-C.y,C.x-B.x)*180/Math.PI);
 pill(`DC ${cm(s.cx)} cm · BC ${cm(s.cy)} cm · angle B ${180-ang}°`,{x:A.W/2,y:P.y+z(48)})}
function nudgeRect(dx,dy){const s=S.rect;s.cx=clamp(s.cx+dx,5,70);s.cy=clamp(s.cy+dy,5,44);A.redraw()}
function checkRect(){const s=S.rect;if(end('rect'))return;const q=RECT[s.n];let m;
 if(s.cx===q[0]&&s.cy===q[1]){yes(s);s.cx=50;s.cy=40;return say(`Opposite sides match and every corner is 90°.`)}
 no(s);
 if(s.cx===q[0])m=`BC is ${cm(s.cy)} cm. Opposite sides are equal: BC must match AD, ${cm(q[1])} cm.`;
 else if(s.cy===q[1])m=`DC is ${cm(s.cx)} cm. It must match AB, ${cm(q[0])} cm, or corner B is not 90°.`;
 else m=`Put the set square at B and go straight up ${cm(q[1])} cm: C is above B, level with D.`;say(m)}
/* step 5: regular polygons close only with the right inside angle */
function polyTrack(){return{x:z(26),y:A.H*.88,w:A.W-z(52),h:z(26)}}
function drawPoly(){const s=S.poly,P=sheet();if(end('poly')){return fin('Both shapes closed',POLY.map(q=>`${q[0]} sides: inside ${q[1]}°, turn ${180-q[1]}°`))}
 const q=POLY[s.n],side=Math.min(P.w,P.h)*(q[0]>5?.24:.28);title(`Make a regular ${q[0]===5?'pentagon':'hexagon'}: ${q[0]} equal sides`);
 let p={x:A.W/2-side/2,y:P.y+P.h*.74},h=0;const pts=[p];for(let i=0;i<q[0];i++){p=along(p,h,side);pts.push(p);h+=180-s.ang}
 g.save();g.beginPath();g.rect(P.x,P.y,P.w,P.h*.82);g.clip();pts.slice(1).forEach((b,i)=>seg(pts[i],b,INK,3));
 const gap=Math.hypot(p.x-pts[0].x,p.y-pts[0].y);if(gap>2)seg(p,pts[0],NO,2,[5,5]);arcMark(pts[1],180-s.ang,180,z(22),ARM,s.ang+'°');g.restore();
 hint(gap>2?'The ends do not meet yet':'The shape closes',gap>2?NO:OK);
 const T=polyTrack();g.fillStyle='#e0e7ff';A.paint.rrect(T.x,T.y,T.w,T.h,12);g.fill();g.strokeStyle=s.bad?NO:SOFT;g.lineWidth=s.bad?3:1.2;g.stroke();
 const x=T.x+(s.ang-60)/90*T.w;knob({x,y:T.y+T.h/2});note('inside angle: drag',T.x,T.y-z(10),11,SOFT,'left')}
function setPoly(a){S.poly.ang=clamp(R(a),60,150);A.redraw()}
function checkPoly(){const s=S.poly;if(end('poly'))return;const [n,T]=POLY[s.n];let m;
 if(s.ang===T){yes(s);s.ang=90;return say(`${T}° closes it: ${n} turns of ${180-T}° make 360°.`)}
 no(s);
 if(s.ang===360/n)m=`${s.ang}° is the turn at each corner (exterior angle). The inside angle is 180 − ${s.ang} = ${T}°.`;
 else m=`At ${s.ang}° the ends miss. ${s.ang<T?'Open':'Close'} each corner: ${n} turns must make 360°.`;say(m)}
function down(p){const m=kind();if(m==='quiz')return false;S.hold=1;move(p);return true}
function move(p){if(!S.hold)return;const m=kind();
 if(m==='line'){const {k,o}=lineGeo();setLine((p.x-o.x)/k*10)}
 else if(m==='ang')setAng(angFrom(p,angGeo().v));
 else if(m==='tri'){const s=S.tri,{k,a}=triGeo();if(s.show||end('tri'))return;if(s.k===0)s.ab=clamp(R((p.x-a.x)/k*10),10,80);else if(s.k===1)s.a=angFrom(p,a);else{const q=TRI[s.n],d=(p.x-a.x)*Math.cos(rad(q[1]))+(a.y-p.y)*Math.sin(rad(q[1]));s.ac=clamp(R(d/k*10),10,60)}A.redraw()}
 else if(m==='rect'){const s=S.rect,{k,a}=rectGeo();s.cx=clamp(R((p.x-a.x)/k*10),5,70);s.cy=clamp(R((a.y-p.y)/k*10),5,44);A.redraw()}
 else if(m==='poly'){const T=polyTrack();setPoly(60+(p.x-T.x)/T.w*90)}}
function up(){if(!S.hold)return;S.hold=0;const m=kind();({line:checkLine,ang:checkAng,tri:checkTri,rect:checkRect,poly:checkPoly})[m]()}
function reset(){ep++;for(const k in S)delete S[k];Object.assign(S,{line:{n:0,mm:30},ang:{n:0,a:90},tri:{n:0,k:0,ab:40,a:90,ac:30},rect:{n:0,cx:50,cy:40},poly:{n:0,ang:90},hold:0,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,first,ok,msg){reset();say(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=ep;acts.forEach((f,j)=>setTimeout(()=>{if(me===ep)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const m=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 const mmRow=(f,ck)=>{[-10,-1,1,10].forEach(v=>b((v<0?'−':'+')+(Math.abs(v)>1?'1 cm':'1 mm'),()=>f(v)));b('Check',ck,'Check this length')};
 const degRow=(f,ck)=>{[-10,-1,1,10].forEach(v=>b((v<0?'−':'+')+Math.abs(v)+'°',()=>f(v)));b('Check',ck,'Check this angle')};
 if(m==='line'&&!end('line'))mmRow(v=>setLine(S.line.mm+v),checkLine);
 if(m==='ang'&&!end('ang'))degRow(v=>setAng(S.ang.a+v),checkAng);
 if(m==='tri'&&!end('tri')){if(S.tri.show)b('Next triangle →',nextTri);else(S.tri.k===1?degRow:mmRow)(nudgeTri,checkTri)}
 if(m==='rect'&&!end('rect')){[['←',-5,0,'left'],['→',5,0,'right'],['↑',0,5,'up'],['↓',0,-5,'down']].forEach(([t,x,y,w])=>b(t+' 5 mm',()=>nudgeRect(x,y),`Move C ${w} 5 millimetres`));b('Check',checkRect,'Check corner C')}
 if(m==='poly'&&!end('poly'))degRow(v=>setPoly(S.poly.ang+v),checkPoly)}
const steps=[
{h:'Start at 0, count the millimetres',p:'A ruler has a blank strip before the 0. Start your line on the 0 mark. Count whole centimetres, then small marks. Each small mark is 1 millimetre (mm).',
predict:{q:'Where must a 7 cm line start?',opts:['at the very end of the ruler','at the 0 mark'],ans:1},task:'Draw all 3 lines',
show:()=>play(0,LINES.map(t=>()=>{setLine(t);checkLine()}),700),
go:()=>begin(0,'Line 1: drag the dot to 7 cm, then let go.',()=>end('line'),'Start at 0, count centimetres, then millimetres.')},
{h:'Pick the right scale',p:'A protractor has two rows of numbers. Put its centre on the corner and its 0 line on your base line. Count up from the 0 on your base line.',
predict:{q:'The arm crosses 60 and 120. The base line points right and the angle is sharp. Which is it?',opts:['120°, the bigger number','60°, counted from the 0 on the base line'],ans:1},task:'Draw all 3 angles',
show:()=>play(1,ANG.map(t=>()=>{setAng(t);checkAng()}),700),
go:()=>begin(1,'Angle 1: drag the arm to 60 degrees.',()=>end('ang'),'Use the scale that starts at 0 on your base line.')},
{h:'Side, angle, side',p:'Two sides and the angle between them: draw one side, measure the angle at one end, then measure the other side along the arm. Join the ends.',
predict:{q:'Two friends both draw AB 7 cm, angle A 60° and AC 5 cm. Will their third sides match?',opts:['yes, same length','no, it depends on luck'],ans:0},task:'Draw both triangles',
show:()=>play(2,TRI.flatMap(q=>[()=>{S.tri.ab=q[0];checkTri()},()=>{S.tri.a=q[1];checkTri()},()=>{S.tri.ac=q[2];checkTri()},nextTri]),600),
go:()=>begin(2,'Triangle 1: drag B so AB is 7 cm.',()=>end('tri'),'Two sides and the angle between fix the triangle.')},
{h:'Right angles with a set square',p:'A rectangle has four right angles, and opposite sides are equal. Two sides are drawn with a ruler and set square. Find the last corner.',task:'Draw both rectangles',
show:()=>play(3,RECT.map(q=>()=>{S.rect.cx=q[0];S.rect.cy=q[1];checkRect()}),700),
go:()=>begin(3,'Rectangle 1: drag corner C into place.',()=>end('rect'),'Set square for corners, ruler for sides.')},
{h:'Regular shapes close up',p:'A regular shape has equal sides and equal angles. Draw a side, turn, draw the next. It only closes when every inside angle is right.',
predict:{q:'Each inside angle of a regular pentagon is…',opts:['72°','108°'],ans:1},task:'Close both shapes',
show:()=>play(4,POLY.map(q=>()=>{setPoly(q[1]);checkPoly()}),800),
go:()=>begin(4,'Drag the inside angle until the pentagon closes.',()=>end('poly'),'Inside angle + turn = 180°, and all the turns make 360°.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'A line is 6.4 cm long. Where does it end?',a:'4 small marks after 6',o:[['4 whole cm after 6','The 4 is millimetres: small marks.'],['at the 4','6.4 cm is 6 cm and 4 mm: stop just past the 6.']]},
{q:'Where does a 9 cm line start?',a:'at the 0 mark',o:[['at the end of the ruler','The blank strip before 0 adds length.'],['at the 1 mark','Starting at 1 makes the line 1 cm short.']]},
{q:'The arm crosses 50 and 130. The angle is sharp. What is it?',a:'50°',o:[['130°','130° is wider than a right angle. Count from the 0 on your base line.'],['90°','The arm crosses 50 and 130; a sharp angle is 50°.']]},
{q:'AB 6 cm, angle A 45°, AC 4 cm. Where does the 4 cm side go?',a:'from A, along the 45° arm',o:[['from B','The 45° angle is at A, so AC starts at A.'],['from B to C','That is BC. You get it by joining the ends.']]},
{q:'Each inside angle of a regular hexagon is…',a:'120°',o:[['60°','60° is the turn at each corner. Inside: 180 − 60 = 120°.'],['720°','720° is all six added. Each is 720 ÷ 6 = 120°.']]}];
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();const m=ok?'':t;
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const m=kind();if(m==='quiz'){const P=sheet();title('Challenge',1);note('ruler · protractor · set square',A.W/2,P.y+P.h*.45,15);return}
 ({line:drawLine,ang:drawAng,tri:drawTri,rect:drawRect,poly:drawPoly})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Drawing buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
