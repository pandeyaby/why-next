/* Flagship: regular and irregular polygons (ages 9-10; NC Y5 Geometry "distinguish between regular and irregular
   polygons based on reasoning about equal sides and angles"). Drag a wonky corner home to make a regular pentagon,
   squash a rhombus (equal sides, unequal angles) until it is a square, stretch a rectangle (equal angles, unequal
   sides) until it is a square, sort eight shapes, then turn and grow a regular hexagon to see that position and size
   do not matter. Not flagshape (naming circles, squares, triangles), flagperim (perimeter) or flagsolid (3-D). */
(()=>{
VIS.reg('flagregpol',c=>{let A,row,quiz,qi=-1,gen=0;const S={};
const INK='#0f172a',PAPER='#fffbeb',OK='#047857',BAD='#c2410c',EDGE='#1e3a8a';
const mode=()=>['fix','rhom','rect','sort','turn','chal'][A.step];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),deg=r=>r*180/Math.PI,R=d=>d*Math.PI/180;
const U=()=>Math.min(A.W/8.5,A.H/6.6),C=()=>({x:A.W/2,y:A.H*.53});
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function tag(t,x,y,rim,fs){const g=A.ctx;fs=fs||(A.narrow?12:15);g.font=`700 ${fs}px system-ui`;let w=g.measureText(t).width+16;
 while(w>A.W-8&&fs>9){fs--;g.font=`700 ${fs}px system-ui`;w=g.measureText(t).width+16}
 const h=fs+12,x0=clamp(x-w/2,4,A.W-w-4);g.fillStyle=PAPER;A.paint.rrect(x0,y-h/2,w,h,8);g.fill();g.lineWidth=rim?2.5:1;g.strokeStyle=rim||'#78716c';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
/* measuring: side lengths in cm and inside angles in degrees, then the verdict */
const lens=P=>P.map((p,i)=>{const q=P[(i+1)%P.length];return Math.hypot(q.x-p.x,q.y-p.y)/U()});
const turns=P=>P.map((p,i)=>{const n=P.length,a=P[(i+n-1)%n],b=P[(i+1)%n],ux=a.x-p.x,uy=a.y-p.y,vx=b.x-p.x,vy=b.y-p.y;
 return deg(Math.acos(clamp((ux*vx+uy*vy)/Math.hypot(ux,uy)/Math.hypot(vx,vy),-1,1)))});
function judge(P){const s=lens(P),a=turns(P),n=P.length,avg=v=>v.reduce((x,y)=>x+y,0)/v.length,ms=avg(s),ma=avg(a);
 const es=s.every(v=>Math.abs(v-ms)/ms<.03),ea=a.every(v=>Math.abs(v-ma)<2)&&Math.abs(a.reduce((x,y)=>x+y,0)-(n-2)*180)<3;return{s,a,es,ea,reg:es&&ea,n}}
const ngon=(n,x,y,r,rot)=>Array.from({length:n},(_,i)=>{const t=R(rot-90+i*360/n);return{x:x+r*Math.cos(t),y:y+r*Math.sin(t)}});
const NAME={3:'triangle',4:'quadrilateral',5:'pentagon',6:'hexagon',8:'octagon'};
function verdict(J,what){const sw=J.es?`all ${J.n} sides equal`:'sides not all equal',aw=J.ea?`all ${J.n} angles equal`:'angles not all equal';
 return J.reg?`${sw[0].toUpperCase()+sw.slice(1)} (${J.s[0].toFixed(1)} cm) and ${aw} (${Math.round(J.a[0])}°): a regular ${what||NAME[J.n]}.`:`${sw[0].toUpperCase()+sw.slice(1)}, ${aw}: an irregular ${what||NAME[J.n]}.`}
function shape(P,small){const g=A.ctx,J=judge(P),n=P.length,o={x:P.reduce((s,p)=>s+p.x,0)/n,y:P.reduce((s,p)=>s+p.y,0)/n};
 g.beginPath();P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fillStyle=A.alpha(J.reg?'#10b981':'#f59e0b',A.col.dark?.3:.22);g.fill();
 g.lineWidth=3;g.lineJoin='round';g.strokeStyle=A.col.dark?'#93c5fd':EDGE;g.stroke();const fs=small||A.narrow?10:13;g.font=`700 ${fs}px system-ui`;g.textAlign='center';g.textBaseline='middle';
 P.forEach((p,i)=>{const q=P[(i+1)%n],mx=(p.x+q.x)/2,my=(p.y+q.y)/2,d=Math.hypot(mx-o.x,my-o.y)||1,lx=mx+(mx-o.x)/d*15,ly=my+(my-o.y)/d*15;
  g.fillStyle=A.col.dark?(J.es?'#6ee7b7':'#fdba74'):(J.es?OK:BAD);g.fillText(J.s[i].toFixed(1),lx,ly);
  const e=Math.hypot(p.x-o.x,p.y-o.y)||1,k=Math.min(26,e*.35);g.fillStyle=A.col.dark?(J.ea?'#6ee7b7':'#fdba74'):(J.ea?OK:BAD);g.fillText(Math.round(J.a[i])+'°',p.x+(o.x-p.x)/e*k,p.y+(o.y-p.y)/e*k)});
 return J}
function knob(p,on){const g=A.ctx;g.fillStyle=on?'#dc2626':'#2563eb';g.beginPath();g.arc(p.x,p.y,A.narrow?11:9,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke()}
/* ---- 0: drag the wonky corner home ---- */
const home=()=>ngon(5,C().x,C().y+U()*.2,U()*2.3,0);
function polyFix(){const P=home();P[0]={x:P[0].x+S.fx,y:P[0].y+S.fy};return P}
function drawFix(){const J=shape(polyFix());knob(polyFix()[0],!J.reg);tag(J.reg?'Regular pentagon':'Irregular pentagon',A.W/2,A.H*.07,J.reg?OK:BAD);tag('Numbers outside: sides (cm) · inside: angles',A.W/2,A.H*.95,0,A.narrow?10:12)}
function nudge(dx,dy,quiet){S.fx=dx;S.fy=dy;if(Math.hypot(dx,dy)<12){S.fx=0;S.fy=0}if(quiet)return A.redraw();A.sound.tick();const J=judge(polyFix());if(J.reg)S.fixed=1;report(verdict(J))}
function closer(){nudge(S.fx*.45,S.fy*.45)}
/* ---- 1: rhombus, equal sides ---- */
const rhomP=()=>{const s=U()*2.6,a=s*Math.cos(R(S.th/2)),b=s*Math.sin(R(S.th/2)),o=C();return[{x:o.x-a,y:o.y},{x:o.x,y:o.y-b},{x:o.x+a,y:o.y},{x:o.x,y:o.y+b}]};
function drawRhom(){const P=rhomP(),J=shape(P);knob(P[1]);tag(J.reg?'A square: regular':`Rhombus: ${Math.round(S.th)}° and ${180-Math.round(S.th)}°`,A.W/2,A.H*.07,J.reg?OK:BAD);tag(`Irregular rhombus seen: ${S.seen?'yes':'not yet'}`,A.W/2,A.H*.95,0,A.narrow?10:12)}
function bend(th,quiet){S.th=clamp(Math.round(th),30,150);if(Math.abs(S.th-90)<4)S.th=90;if(S.th!==90)S.seen=1;if(quiet)return A.redraw();A.sound.tick();
 report(S.th===90?'All 4 sides equal and all 4 angles 90°. Now it is a square, the regular quadrilateral.':`All 4 sides are still equal, but the angles are ${S.th}° and ${180-S.th}°. Equal sides are not enough: this rhombus is irregular.`)}
/* ---- 2: rectangle, equal angles ---- */
const rectP=()=>{const o=C(),u=U(),w=S.w*u/2,h=S.h*u/2;return[{x:o.x-w,y:o.y-h},{x:o.x+w,y:o.y-h},{x:o.x+w,y:o.y+h},{x:o.x-w,y:o.y+h}]};
function drawRect(){const P=rectP(),J=shape(P),g=A.ctx;const ky=C().y+U()*.8;knob({x:P[1].x,y:ky});g.fillStyle=A.col.tx;g.font=`700 ${A.narrow?10:12}px system-ui`;g.textAlign='left';g.fillText('drag',P[1].x+14,ky);
 tag(J.reg?'A square: regular':`Rectangle ${S.w} cm by ${S.h} cm`,A.W/2,A.H*.07,J.reg?OK:BAD)}
function stretch(w,quiet){S.w=clamp(Math.round(w*2)/2,1.5,7);if(quiet)return A.redraw();A.sound.tick();
 report(S.w===S.h?`Now every side is ${S.h} cm and every angle is 90°: a square, so regular.`:`All 4 angles are 90°, but the sides are ${S.w} cm and ${S.h} cm. Equal angles are not enough: this rectangle is irregular.`)}
/* ---- 3: sort eight shapes ---- */
const SH=[['stop sign',(x,y,r)=>ngon(8,x,y,r,22.5),1,'8 equal sides and 8 equal angles: a regular octagon.'],
 ['wonky octagon',(x,y,r)=>ngon(8,x,y,r,22.5).map((p,i)=>i%3?p:{x:x+(p.x-x)*.72,y:y+(p.y-y)*.72}),0,'It has 8 sides, but they are not all equal and the angles differ.'],
 ['equilateral triangle',(x,y,r)=>ngon(3,x,y+r*.15,r,0),1,'3 equal sides and 3 angles of 60°.'],
 ['right-angled triangle',(x,y,r)=>[{x:x-r,y:y+r*.7},{x:x+r,y:y+r*.7},{x:x-r,y:y-r*.7}],0,'One angle is 90° and the others are smaller; the sides differ too.'],
 ['tilted square',(x,y,r)=>ngon(4,x,y,r,0),1,'Standing on a corner does not matter: 4 equal sides, 4 right angles.'],
 ['rhombus',(x,y,r)=>[{x:x-r,y},{x,y:y-r*.55},{x:x+r,y},{x,y:y+r*.55}],0,'4 equal sides, but two angles are wide and two are narrow.'],
 ['rectangle',(x,y,r)=>[{x:x-r,y:y-r*.5},{x:x+r,y:y-r*.5},{x:x+r,y:y+r*.5},{x:x-r,y:y+r*.5}],0,'4 right angles, but the long and short sides differ.'],
 ['hexagon',(x,y,r)=>ngon(6,x,y,r,30),1,'6 equal sides and 6 angles of 120°.']];
function drawSort(){const k=SH[S.si%8],P=k[1](C().x,C().y,U()*2.1);shape(P,1);tag(`Shape ${S.si%8+1} of 8 · sorted right: ${S.right}`,A.W/2,A.H*.07,S.right>5?OK:0)}
function file(reg){const k=SH[S.si%8];if(!!k[2]===reg){S.right++;S.si++;A.sound.pop();return report(`Yes, ${reg?'regular':'irregular'}. ${k[3]}`+(S.right<6?' Next shape.':' Sorted.'))}
 A.sound.miss();report(reg?`Not regular. ${k[3]} Every side and every angle must match.`:`Look again: ${k[3]} That is regular.`)}
/* ---- 4: turn and grow ---- */
const hexP=()=>ngon(6,C().x,C().y,U()*S.r,S.rot);
function drawTurn(){const P=hexP();shape(P);knob(P[0]);tag(`Turned ${Math.round(((S.rot%360)+360)%360)}° · size ×${(S.r/2).toFixed(1)}`,A.W/2,A.H*.07,S.tw&&S.gw?OK:0);tag('Still regular? Check the numbers.',A.W/2,A.H*.95,0,A.narrow?10:12)}
function spin(rot,r,quiet){S.rot=rot;S.r=clamp(r,1.2,2.7);if(Math.abs(((rot%60)+60)%60-30)<=20)S.tw=1;if(Math.abs(S.r-2)>=.5)S.gw=1;if(quiet)return A.redraw();A.sound.tick();
 report(`Turned and ${S.r>2?'grown':'shrunk'}, the hexagon still has 6 equal sides of ${(S.r*U()/U()).toFixed(1)} cm and 6 angles of 120°. Where it sits and how big it is do not change regular.`)}
function draw(){const g=A.ctx,k=mode();g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){shape(ngon(8,C().x,C().y,U()*2,22.5));tag('Challenge',A.W/2,A.H*.07,EDGE);return}
 ({fix:drawFix,rhom:drawRhom,rect:drawRect,sort:drawSort,turn:drawTurn})[k]()}
/* pointer */
function down(p){const k=mode(),hit=(q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<(r||(A.narrow?30:24));
 if(k==='fix'&&hit(polyFix()[0],40)){S.grab=1;return true}
 if(k==='rhom'&&hit(rhomP()[1],40)){S.grab=1;return true}
 if(k==='rect'&&Math.abs(p.x-rectP()[1].x)<30){S.grab=1;return true}
 if(k==='turn'&&hexP().some(q=>hit(q,34))){S.grab=1;return true}return false}
function move(p){if(!S.grab)return;const k=mode(),o=C();
 if(k==='fix'){const h=home()[0];nudge(p.x-h.x,p.y-h.y,true)}
 if(k==='rhom')bend(2*deg(Math.asin(clamp((o.y-p.y)/(U()*2.6),.26,.97))),true);
 if(k==='rect')stretch((p.x-o.x)*2/U(),true);
 if(k==='turn')spin(deg(Math.atan2(p.y-o.y,p.x-o.x))+90,Math.hypot(p.x-o.x,p.y-o.y)/U(),true)}
function up(){if(!S.grab)return;S.grab=0;const k=mode();if(k==='fix')nudge(S.fx,S.fy);if(k==='rhom')bend(S.th);if(k==='rect')stretch(S.w);if(k==='turn')spin(S.rot,S.r)}
function wipe(){gen++;for(const k in S)delete S[k];Object.assign(S,{fx:U()*1.1,fy:-U()*.8,fixed:0,th:60,seen:1,w:6,h:3.5,si:0,right:0,rot:0,r:2,tw:0,gw:0,grab:0,test:()=>{}})}
function report(t){tell(t);A.redraw();buttons();S.test()}
const when=(i,f,msg)=>()=>{if(A.step===i&&f()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,intro,f,msg){wipe();tell(intro);buttons();S.test=when(i,f,msg)}
function play(i,acts,ms){steps[i].go();const v=gen;acts.forEach((f,j)=>setTimeout(()=>{if(v===gen)f()},(ms||500)*(j+1)))}
function buttons(){if(!row)return;row.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='fix'){B('Move the corner closer',closer,'Move the red corner closer to where it would make equal sides');B('Put it back home',()=>nudge(0,0))}
 if(k==='rhom'){B('Narrower −10°',()=>bend(S.th-10),'Make the left angle 10 degrees smaller');B('Wider +10°',()=>bend(S.th+10),'Make the left angle 10 degrees bigger')}
 if(k==='rect'){B('Shorter −½ cm',()=>stretch(S.w-.5),'Make the rectangle half a centimetre narrower');B('Longer +½ cm',()=>stretch(S.w+.5),'Make the rectangle half a centimetre wider')}
 if(k==='sort'){B('Regular',()=>file(true),'This shape is regular');B('Irregular',()=>file(false),'This shape is irregular')}
 if(k==='turn'){B('Turn it 20°',()=>spin(S.rot+20,S.r));B('Bigger',()=>spin(S.rot,S.r+.5),'Make the hexagon bigger');B('Smaller',()=>spin(S.rot,S.r-.5),'Make the hexagon smaller')}}
const steps=[
{h:'Fix the pentagon',p:'A polygon is regular when all its sides are equal AND all its angles are equal. Drag the red corner, or use the buttons, until the pentagon is regular.',
 predict:{q:'What makes a polygon regular?',opts:['all its sides are equal','all sides equal and all angles equal','it looks neat and tidy'],ans:1},task:'Make the pentagon regular',
 show:()=>play(0,[closer,closer,()=>nudge(0,0)],500),
 go:()=>begin(0,'A five-sided shape with one corner pulled out. Its side lengths and angles are not all equal.',()=>S.fixed,'Regular means equal sides and equal angles, both.')},
{h:'Equal sides are not enough',p:'This rhombus has 4 equal sides. Drag the top corner up or down, or use the buttons, and watch the angles.',
 predict:{q:'The rhombus has 4 equal sides. Is it regular?',opts:['yes, the sides all match','no, its angles are not all equal','only if it is big'],ans:1},task:'Turn the rhombus into a regular shape',
 show:()=>play(1,[()=>bend(70),()=>bend(80),()=>bend(90)],500),
 go:()=>begin(1,'A rhombus with 4 equal sides, two angles of 60° and two of 120°.',()=>S.th===90&&S.seen,'A rhombus is only regular when its angles are all 90°: then it is a square.')},
{h:'Equal angles are not enough',p:'This rectangle has 4 right angles. Drag its right side, or use the buttons, and watch the side lengths.',
 predict:{q:'A rectangle has 4 equal angles. Is it regular?',opts:['yes, always','only when it is a square','never'],ans:1},task:'Make the rectangle regular',
 show:()=>play(2,[()=>stretch(5),()=>stretch(4),()=>stretch(3.5)],500),
 go:()=>begin(2,'A rectangle 6 cm by 3.5 cm with four right angles.',()=>S.w===S.h,'A rectangle is only regular when it is a square.')},
{h:'Sort the shapes',p:'Is each shape regular or irregular? Check the side numbers outside and the angle numbers inside.',task:'Sort 6 shapes correctly',
 show:()=>play(3,SH.slice(0,6).map(k=>()=>file(!!k[2])),450),
 go:()=>begin(3,'A shape to sort, with its side lengths and angles shown.',()=>S.right>5,'Regular needs every side and every angle to match.')},
{h:'Turn it, grow it',p:'Drag a corner to turn the regular hexagon or change its size. Or use the buttons.',
 predict:{q:'Turn a regular hexagon onto its side. Is it still regular?',opts:['no, now it is tilted','yes, its sides and angles stay equal','only if it points up'],ans:1},task:'Turn the hexagon and change its size',
 show:()=>play(4,[()=>spin(20,2),()=>spin(20,2.6)],500),
 go:()=>begin(4,'A regular hexagon with 6 equal sides and 6 angles of 120°.',()=>S.tw&&S.gw,'Turning or resizing never changes whether a polygon is regular.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.test()});
const QS=[
 {q:'A rectangle has 4 right angles. Is it regular?',ans:'Only if it is a square',bad:[['Yes, its angles are equal','angles'],['Yes, it has 4 sides','count']]},
 {q:'A rhombus has 4 equal sides and angles of 70° and 110°. Is it regular?',ans:'No, its angles differ',bad:[['Yes, its sides are equal','sides'],['Yes, it has 4 corners','count']]},
 {q:'A square is standing on one corner. Is it regular?',ans:'Yes',bad:[['No, it is tilted','tilt'],['Only once you turn it back','tilt']]},
 {q:'A stop sign has 8 equal sides and 8 equal angles. What is it?',ans:'A regular octagon',bad:[['An irregular octagon','irr'],['A regular hexagon','name']]},
 {q:'A tiny and a huge equilateral triangle. Which is regular?',ans:'Both of them',bad:[['Only the huge one','size'],['Only the tiny one','size']]},
 {q:'A triangle has sides 5 cm, 5 cm and 3 cm. Is it regular?',ans:'No, one side differs',bad:[['Yes, two sides match','some'],['Yes, every triangle is','every']]},
 {q:'Is a circle a regular polygon?',ans:'No, it has no straight sides',bad:[['Yes, it is perfectly even','curve'],['Yes, with one equal side','curve']]}];
function why(t){let m='Check both: every side the same length, and every angle the same size.';
 if(t==='angles')m='Equal angles are only half of it. The long and short sides differ, so it is irregular unless it is a square.';
 if(t==='sides')m='Equal sides are only half of it. Its angles are 70° and 110°, so it is irregular.';
 if(t==='count')m='The number of sides tells you the name, not whether it is regular.';
 if(t==='tilt')m='Turning a shape does not change its sides or angles. A tilted square is still regular.';
 if(t==='irr')m='Irregular means some sides or angles differ. These are all equal.';
 if(t==='name')m='A hexagon has 6 sides. With 8 sides it is an octagon.';
 if(t==='size')m='Size does not matter. Both have 3 equal sides and 3 angles of 60°.';
 if(t==='some')m='Two equal sides is not enough. All three sides must match.';
 if(t==='every')m='Many triangles have unequal sides. Only an equilateral triangle is regular.';
 if(t==='curve')m='A polygon is made of straight sides. A circle has none, so it is not a polygon.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=l.slice(r).concat(l.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>mark(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();tell(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;row.hidden=Q.step===5;buttons()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Polygon controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);wipe();A.gest({down,move,up});buttons()}}).start()})})();
