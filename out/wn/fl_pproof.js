/* Flagship – proving Pythagoras' theorem and its converse (ages 14–16): slide four copies of one right triangle around
   inside the same (a + b) square so the uncovered c² becomes a² + b², put the lines of that area proof in order,
   sort real jobs into "theorem" or "converse", test side lists with the converse (longest side as c), then use
   c² against a² + b² to call a triangle acute, right or obtuse. Every canvas tap or drag has a button twin. */
(()=>{
const PA=3,PB=5,PS=PA+PB;
// each triangle: [right-angle corner R, end of leg a, end of leg b], picture 1 (c² hole) then picture 2 (a² and b² holes)
const T1=[[[0,0],[PA,0],[0,PB]],[[PS,0],[PS,PA],[PA,0]],[[PS,PS],[PB,PS],[PS,PA]],[[0,PS],[0,PB],[PB,PS]]];
const T2=[[[0,PA],[PA,PA],[0,PS]],[[PS,0],[PS,PA],[PA,0]],[[PA,PA],[PA,0],[PS,PA]],[[PA,PS],[0,PS],[PA,PA]]];
const LINES=['The big square has side a + b in both pictures, so its area is the same.','Both pictures use the same 4 right triangles, each with area ½ab.',
 'So the uncovered area is equal: big square minus the 4 triangles.','Picture 1 leaves c² uncovered and picture 2 leaves a² + b², so a² + b² = c².'];
const JOBS=[['A right-angled triangle has legs 6 cm and 8 cm. How long is the hypotenuse?',0],['A triangle has sides 9, 12 and 15. Is one angle exactly 90°?',1],
 ['A builder marks 3 m and 4 m along two walls and checks the gap is 5 m.',1],['A 5 m ladder leans on an upright wall, foot 3 m out. How high does it reach?',0]];
const TESTS=[[9,12,15],[13,5,12],[6,8,11],[8,15,16]],KINDS=[[4,5,6],[4,5,7],[5,12,13],[3,4,6]];
const sq=n=>n*n,ord=s=>[...s].sort((x,y)=>x-y),isRight=s=>{const[a,b,c]=ord(s);return sq(a)+sq(b)===sq(c)},kind=s=>{const[a,b,c]=ord(s),d=sq(a)+sq(b)-sq(c);return d>0?0:d===0?1:2};
const KN=['Acute','Right','Obtuse'];
VIS.reg('flagpproof',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,t:[0,1,0,0],moved:[0,1,0,0],seq:[],j:0,res:'',bad:-1,lock:0,grab:null}),S=init0();
const stage=()=>['move','order','job','test','kind','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function wrapText(g,t,x,y,w,n,lh){g.font=`700 ${fs(n)}px system-ui,sans-serif`;const out=[];let line='';t.split(' ').forEach(wd=>{const s=line?line+' '+wd:wd;if(g.measureText(s).width>w&&line){out.push(line);line=wd}else line=s});out.push(line);
 out.forEach((l,i)=>put(g,l,x,y+(i-(out.length-1)/2)*lh,n,A.col.tx,700));return out.length}
function box(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const on=()=>A.col.dark?'#1e3a5f':'#dbeafe',hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 slide the triangles ---- */
const unit=()=>Math.min(A.W*.9,A.H*.8)/PS,org=()=>({x:(A.W-unit()*PS)/2,y:A.H*.06});
function tri(i){const t=S.t[i],P=T1[i],Q=T2[i],cen=V=>[(V[0][0]+V[1][0]+V[2][0])/3,(V[0][1]+V[1][1]+V[2][1])/3],ci=cen(P),cf=cen(Q);
 const ang=V=>Math.atan2(V[1][1]-V[0][1],V[1][0]-V[0][0]);let th=ang(Q)-ang(P);while(th>Math.PI)th-=2*Math.PI;while(th<-Math.PI)th+=2*Math.PI;
 const k=th*t,cx=ci[0]+(cf[0]-ci[0])*t,cy=ci[1]+(cf[1]-ci[1])*t,u=unit(),o=org();
 return P.map(([x,y])=>{const dx=x-ci[0],dy=y-ci[1];return{x:o.x+u*(cx+dx*Math.cos(k)-dy*Math.sin(k)),y:o.y+u*(cy+dx*Math.sin(k)+dy*Math.cos(k))}})}
function inTri(p,v){const s=(a,b,q)=>(b.x-a.x)*(q.y-a.y)-(b.y-a.y)*(q.x-a.x),d1=s(v[0],v[1],p),d2=s(v[1],v[2],p),d3=s(v[2],v[0],p);return!((d1<0||d2<0||d3<0)&&(d1>0||d2>0||d3>0))}
function slide(i){if(stage()!=='move'||S.moved[i]||S.lock)return;S.moved[i]=1;S.lock=1;A.sound.whoosh();
 A.tween(S.t,{[i]:1},rm()?10:650,'io',()=>{S.lock=0;S.won++;const left=3-S.won;
  say(left?`Triangle ${i+1} moved. Same triangle, same big square. ${left} to go.`:'All four moved. The uncovered area is now a square a² and a square b². Before it was one tilted square c². Same area both times, so a² + b² = c².');keys();A.redraw();S.want()})}
function drawMove(g){const C=A.col,u=unit(),o=org();g.fillStyle=C.dark?'#0f172a':'#fff';g.fillRect(o.x,o.y,u*PS,u*PS);
 const all=S.t.every(t=>t>=1);
 if(S.won===0||!all){const h=[[PA,0],[PS,PA],[PB,PS],[0,PB]].map(([x,y])=>({x:o.x+u*x,y:o.y+u*y}));if(S.t.every((t,i)=>i===1||t===0)){g.fillStyle=A.alpha(C.vi,.18);g.beginPath();h.forEach((p,j)=>j?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fill();put(g,'c²',o.x+u*PS/2,o.y+u*PS/2,22,C.tx,900)}}
 if(all){g.fillStyle=A.alpha(C.cy,.2);g.fillRect(o.x,o.y,u*PA,u*PA);g.fillStyle=A.alpha(C.or,.2);g.fillRect(o.x+u*PA,o.y+u*PA,u*PB,u*PB);
  put(g,'a²',o.x+u*PA/2,o.y+u*PA/2,20,C.tx,900);put(g,'b²',o.x+u*(PA+PB/2),o.y+u*(PA+PB/2),22,C.tx,900)}
 for(let i=0;i<4;i++){const v=tri(i);g.fillStyle=S.moved[i]?A.alpha(C.gr,.55):A.alpha(C.ac,.55);g.beginPath();v.forEach((p,j)=>j?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  put(g,String(i+1),(v[0].x+v[1].x+v[2].x)/3,(v[0].y+v[1].y+v[2].y)/3,14,C.tx,900)}
 g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(o.x,o.y,u*PS,u*PS);put(g,'a + b',o.x+u*PS/2,o.y+u*PS+14,12,C.tx,800)}
/* ---- 2 put the proof in order ---- */
const DISP=[2,0,3,1];function lbox(k){k=DISP.indexOf(k);const h=A.H*.17,w=Math.min(A.W-20,560);return{x:(A.W-w)/2,y:A.H*.1+k*(h+8),w,h}}
function tapLine(k){if(stage()!=='order'||S.won>=4||S.seq.includes(k))return;const have=S.seq;
 if(k===3&&have.length<3)return miss('That line is the conclusion. You can only write a² + b² = c² after showing the two uncovered areas are equal.',k);
 if(k===2&&!(have.includes(0)&&have.includes(1)))return miss('Why are the uncovered areas equal? First say why: the same big square and the same 4 triangles in both pictures.',k);
 S.seq.push(k);S.won++;A.sound.pop();say(S.won>=4?'The argument is complete: equal totals minus equal pieces leave equal areas, so a² + b² = c² for every right triangle.':`Line ${S.won}: ${LINES[k]}`);keys();A.redraw();S.want()}
function drawOrder(g){const C=A.col;put(g,'Tap the lines in the order a proof needs them',A.W/2,A.H*.05,13,C.tx,800);
 LINES.forEach((t,k)=>{const r=lbox(k),n=S.seq.indexOf(k);box(g,r,n>=0?on():null,S.bad===k,n>=0?C.tx:null);if(n>=0)put(g,String(n+1),r.x+16,r.y+r.h/2,16,C.tx,900);wrapText(g,t,r.x+r.w/2+10,r.y+r.h/2,r.w-50,12,fs(15))})}
/* ---- 3 theorem or converse ---- */
const bin=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.62,w,h:A.H*.3}},card=()=>{const w=Math.min(A.W-20,560);return{x:(A.W-w)/2,y:A.H*.06,w,h:A.H*.4}};
function sortJob(k){if(stage()!=='job'||S.won>=4||S.lock)return;const[q,want]=JOBS[S.j];
 if(k!==want)return miss(want?'Here nobody has told you there is a right angle. You check whether a² + b² = c² to decide: that is the converse.':'Here the right angle is given, and you use it to work out a length: that is the theorem.',k);
 S.won++;A.sound.pop();say(want?'Converse: the side lengths come first, and a² + b² = c² proves the right angle.':'Theorem: the right angle comes first, and a² + b² = c² gives a length.');
 if(S.won<4){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
function drawJob(g){const C=A.col,r=card(),[q]=JOBS[Math.min(S.j,3)];box(g,r,null,false,C.tx);wrapText(g,q,r.x+r.w/2,r.y+r.h/2,r.w-30,14,fs(19));
 ['Theorem: right angle → find a side','Converse: sides → is it right-angled?'].forEach((t,k)=>{const b=bin(k);box(g,b,k?A.alpha(C.vi,.14):A.alpha(C.cy,.14),S.bad===k,C.tx);wrapText(g,t,b.x+b.w/2,b.y+b.h/2,b.w-20,13,fs(17))});
 if(S.grab&&S.grab.x!=null){g.fillStyle=A.alpha(C.ac,.35);A.paint.rrect(S.grab.x-50,S.grab.y-20,100,40,10);g.fill()}put(g,`${Math.min(S.won,4)} of 4 sorted`,A.W/2,A.H*.54,12,C.tx,800)}
/* ---- 4 test with the converse, 5 acute, right or obtuse ---- */
function drawTri(g,s,cx,cy,maxW,maxH){const C=A.col,[a,b,c]=ord(s),x=(sq(b)-sq(a)+sq(c))/(2*c),y=Math.sqrt(Math.max(0,sq(b)-x*x)),k=Math.min(maxW/c,maxH/Math.max(y,1));
 const P=[{x:cx-c*k/2,y:cy},{x:cx+c*k/2,y:cy},{x:cx-c*k/2+x*k,y:cy-y*k}];g.fillStyle=A.alpha(C.ac,.18);g.beginPath();P.forEach((p,j)=>j?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();
 put(g,String(c),cx,cy+14,13,C.tx,800);put(g,String(b),(P[0].x+P[2].x)/2-14,(P[0].y+P[2].y)/2,13,C.tx,800);put(g,String(a),(P[1].x+P[2].x)/2+14,(P[1].y+P[2].y)/2,13,C.tx,800);
 g.strokeStyle=C.rd;g.lineWidth=2;g.beginPath();const a0=Math.atan2(P[0].y-P[2].y,P[0].x-P[2].x),a1=Math.atan2(P[1].y-P[2].y,P[1].x-P[2].x);g.arc(P[2].x,P[2].y,14,Math.min(a0,a1),Math.max(a0,a1));g.stroke()}
const zone=(k,n)=>{const w=(A.W-10-n*8)/n;return{x:6+k*(w+8),y:A.H*.76,w,h:A.H*.2}};
function judge(k){const v=stage();if((v!=='test'&&v!=='kind')||S.won>=4||S.lock)return;const s=(v==='test'?TESTS:KINDS)[S.j],[a,b,c]=ord(s),L=sq(a)+sq(b),R=sq(c);
 const want=v==='test'?(isRight(s)?0:1):kind(s);
 if(k!==want){if(v==='test')return miss(want===0?`Use the longest side as c. ${a}² + ${b}² = ${L} and ${c}² = ${R}. They match, so it is right-angled.`:`${a}² + ${b}² = ${L} but ${c}² = ${R}. They are not equal, so the converse says the angle is not 90°.`,k);
  return miss(`${a}² + ${b}² = ${L} and ${c}² = ${R}. ${L>R?`c² is smaller, so the angle opposite ${c} is under 90°: acute.`:L<R?`c² is bigger, so the angle opposite ${c} is over 90°: obtuse.`:'They are equal: right-angled.'}`,k)}
 S.won++;A.sound.pop();S.res=`${a}² + ${b}² = ${L}, ${c}² = ${R}`;say(`${s.join(', ')}: ${S.res}. ${v==='test'?(want?'Not right-angled.':'Right-angled.'):KN[want]+'.'}`);
 if(S.won<4){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;S.res='';keys();A.redraw()},rm()?10:700)}keys();A.redraw();S.want()}
function drawTest(g){const C=A.col,v=stage(),list=v==='test'?TESTS:KINDS,s=list[Math.min(S.j,3)],names=v==='test'?['Right-angled','Not right-angled']:KN;
 put(g,`Sides ${s.join(', ')}`,A.W/2,A.H*.06,16,C.tx,900);drawTri(g,s,A.W/2,A.H*.52,A.W*.6,A.H*.36);if(S.res)put(g,S.res,A.W/2,A.H*.66,13,C.tx,800);
 names.forEach((t,k)=>{const r=zone(k,names.length);box(g,r,on(),S.bad===k,C.tx);put(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)});put(g,`${Math.min(S.won,4)} of 4`,A.W-30,A.H*.06,12,C.tx,800)}
/* ---- shared ---- */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'Theorem: right angle → a² + b² = c²',W/2,H*.38,16,C.tx,800);put(g,'Converse: a² + b² = c² → right angle',W/2,H*.58,16,C.tx,800);return}
 ({move:drawMove,order:drawOrder,job:drawJob,test:drawTest,kind:drawTest})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='move'&&S.won<3)[0,2,3].forEach(i=>{if(!S.moved[i])B(`Move triangle ${i+1}`,()=>slide(i))});
 if(v==='order'&&S.won<4)DISP.forEach(k=>{const t=LINES[k];if(!S.seq.includes(k))B(t.split(' ').slice(0,5).join(' ')+' …',()=>tapLine(k),`Next line: ${t}`)});
 if(v==='job'&&S.won<4){B('Theorem',()=>sortJob(0),'Sort as theorem');B('Converse',()=>sortJob(1),'Sort as converse')}
 if(v==='test'&&S.won<4)['Right-angled','Not right-angled'].forEach((t,k)=>B(t,()=>judge(k)));
 if(v==='kind'&&S.won<4)KN.forEach((t,k)=>B(t,()=>judge(k)))}
function down(p){const v=stage();
 if(v==='move'){const i=[0,2,3].find(i=>!S.moved[i]&&inTri(p,tri(i)));if(i!=null){S.grab={i,x0:p.x,y0:p.y};return true}return false}
 if(v==='order'){const k=[0,1,2,3].find(k=>hit(p,lbox(k)));if(k!=null)tapLine(k);return false}
 if(v==='job'){if(hit(p,card())){S.grab={job:1,x:null,x0:p.x,y0:p.y};return true}const k=[0,1].find(k=>hit(p,bin(k)));if(k!=null)sortJob(k);return false}
 if(v==='test'||v==='kind'){const n=v==='test'?2:3,k=[...Array(n).keys()].find(k=>hit(p,zone(k,n)));if(k!=null)judge(k)}return false}
function move(p){const gr=S.grab;if(!gr||!gr.job)return;if(gr.x!=null||Math.hypot(p.x-gr.x0,p.y-gr.y0)>8){gr.x=p.x;gr.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.i!=null)return slide(gr.i);if(gr.x!=null){const k=[0,1].find(k=>hit(p,bin(k)));if(k!=null)sortJob(k);else say('Drop the card on Theorem or Converse.')}A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const answerNow=()=>{const v=stage(),s=(v==='test'?TESTS:KINDS)[S.j];judge(v==='test'?(isRight(s)?0:1):kind(s))};
const steps=[
{h:'Same pieces, new places',p:`Four copies of one right triangle (legs a and b, hypotenuse c) sit inside a square of side a + b. The purple gap is a square on c. Tap or drag triangles 1, 3 and 4 to slide them.`,
 predict:{q:'After the triangles slide to new places in the same big square, the uncovered area will be…',opts:['bigger','the same','smaller'],ans:1},task:'Slide 3 triangles',
 show:()=>{steps[0].go();demo([0,2,3].map(i=>()=>slide(i)),800)},go:()=>{clear();say('Picture 1: four triangles leave a tilted square c² uncovered. Slide triangles 1, 3 and 4.');keys();S.want=ready(0,()=>S.won>=3,'The gap changed shape, not size: c² = a² + b².')}},
{h:'Build the argument',p:'A picture is not a proof until you say why the areas match. Tap the four lines in an order where each line only uses what came before.',task:'Order the 4 lines',
 show:()=>{steps[1].go();demo([0,1,2,3].map(k=>()=>tapLine(k)),500)},go:()=>{clear();say('Tap the first line of the proof.');keys();S.want=ready(1,()=>S.won>=4,'Nothing in the proof used a² + b² = c² before it was shown.')}},
{h:'Theorem or converse?',p:'"If it is a square, it has four right angles" is true. Flip it: "if it has four right angles, it is a square" is false (think of a rectangle). So a converse needs its own proof. Sort each job.',
 predict:{q:'Pythagoras\' theorem is true. Does that alone prove its converse?',opts:['Yes: flipping a true "if … then" is always true','No: the converse needs its own proof'],ans:1},task:'Sort 4 jobs',
 show:()=>{steps[2].go();demo([0,1,2,3].map(j=>()=>sortJob(JOBS[S.j][1])),650)},go:()=>{clear();say(JOBS[0][0]);keys();S.want=ready(2,()=>S.won>=4,'Theorem: angle given, find a side. Converse: sides given, decide the angle.')}},
{h:'Test with the converse',p:'Square the two shorter sides and add. Compare with the square of the longest side. Equal means a right angle, opposite the longest side.',
 predict:{q:'A triangle has sides 13, 5 and 12. Which side goes in the c² spot?',opts:['12, the last one listed','13, the longest'],ans:1},task:'Test 4 triangles',
 show:()=>{steps[3].go();demo([0,1,2,3].map(()=>answerNow),900)},go:()=>{clear();say('Sides 9, 12 and 15. Right-angled or not?');keys();S.want=ready(3,()=>S.won>=4,'Always use the longest side as c.')}},
{h:'Acute, right or obtuse',p:'If c² is not equal to a² + b², the size of the gap tells you more. Look at the red angle, opposite the longest side.',
 predict:{q:'If c² is bigger than a² + b², the angle opposite c is…',opts:['acute (under 90°)','obtuse (over 90°)'],ans:1},task:'Name 4 triangles',
 show:()=>{steps[4].go();demo([0,1,2,3].map(()=>answerNow),900)},go:()=>{clear();say('Sides 4, 5 and 6. Acute, right or obtuse?');keys();S.want=ready(4,()=>S.won>=4,'c² smaller: acute. Equal: right. Bigger: obtuse.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['Is a triangle with sides 7, 24 and 25 right-angled?',[['Yes: 49 + 576 = 625 = 25²','ok'],['No: 7 + 24 is not 25','add'],['Can\'t tell without measuring the angle','meas']]],
 ['Sides 10, 26 and 24. Which check is correct?',[['10² + 24² = 26²','ok'],['10² + 26² = 24²','long'],['10 + 24 = 26 + 8','add']]],
 ['Why are the uncovered areas equal in the two pictures?',[['Same big square, same 4 triangles','ok'],['Because a² + b² = c²','circ'],['They look the same size','look']]],
 ['You measure a corner with sides 6, 8 and 10. What have you used?',[['The converse','ok'],['The theorem','thm'],['Neither','none']]],
 ['Sides 5, 6 and 8. What kind of triangle is it?',[['Obtuse','ok'],['Right-angled','rt'],['Acute','acu']]]];
function why(t){let m='Theorem: right angle given. Converse: sides given, test a² + b² = c².';
 if(t==='add')m='Pythagoras uses squares of the sides, not the sides: 7² + 24² = 49 + 576 = 625 = 25².';if(t==='meas')m='The converse settles it from the lengths alone: 7² + 24² = 25², so the angle is exactly 90°.';
 if(t==='long')m='c must be the longest side, 26. Check 10² + 24² = 100 + 576 = 676 = 26².';if(t==='circ')m='That is circular: it uses the result you are trying to prove. The reason is the same square and the same 4 triangles.';
 if(t==='look')m='Looking is not proof. The areas match because both are the big square minus the same 4 triangles.';if(t==='thm')m='You started with lengths and decided the angle. That is the converse.';
 if(t==='none')m='Checking 6² + 8² = 10² to confirm a right angle is the converse of Pythagoras.';if(t==='rt')m='5² + 6² = 61 but 8² = 64. Not equal, so not right-angled.';if(t==='acu')m='c² = 64 is bigger than a² + b² = 61, so the angle opposite 8 is over 90°: obtuse.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
