/* Flagship: Area of Triangles & Parallelograms (ages 10–11; NC Y6 "calculate the area of parallelograms and triangles",
   "recognise when it is possible to use formulae for area"; CCSS 6.G.A.1 "find the area of right triangles, other
   triangles … by composing into rectangles"). Shapes sit on a 1 cm grid. Slide a cut-off triangle to make a rectangle;
   lean the top edge (area stays, slanted sides grow); pick the perpendicular height; join a turned copy of a triangle into
   a parallelogram; drag the top corner past the base; build a triangle of 18 cm².
   Not flagtiles (counting unit squares), flagcover (what area is) or flagarea (estimating curved areas). */
(()=>{
VIS.reg('flagtripar',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['cut','lean','height','twin','apex','build','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',BLUE='#2563eb',ORANGE='#ea580c',GREEN='#15803d',RED='#b91c1c';
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const big=()=>A.narrow?15:18,small=()=>A.narrow?13:15,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function pill(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';
 const w=g.measureText(s).width+16;x=clamp(x,w/2+4,A.W-w/2-4);g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.75,w,px*1.5,px*.6);g.fill();
 if(o.edge){g.strokeStyle=o.edge;g.lineWidth=2;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y)}
/* grid frame: grid units (1 unit = 1 cm, y up) to canvas pixels */
const F={u:20,ox:0,oy:0,x0:0,x1:10,y1:6};
function frame(x0,x1,y1){F.u=Math.min((A.W-30)/(x1-x0),(A.H*.72)/y1);F.ox=A.W/2-(x0+x1)/2*F.u;F.oy=Math.min(A.H*.9,A.H*.55+y1*F.u/2);Object.assign(F,{x0,x1,y1})}
const X=gx=>F.ox+gx*F.u,Y=gy=>F.oy-gy*F.u,toG=p=>({x:(p.x-F.ox)/F.u,y:(F.oy-p.y)/F.u});
function grid(){const g=A.ctx;g.strokeStyle=A.alpha(A.col.tx,.18);g.lineWidth=1;g.beginPath();
 for(let i=Math.ceil(F.x0);i<=F.x1;i++){g.moveTo(X(i),Y(0));g.lineTo(X(i),Y(F.y1))}for(let j=0;j<=F.y1;j++){g.moveTo(X(F.x0),Y(j));g.lineTo(X(F.x1),Y(j))}g.stroke()}
function poly(pts,col,o){o=o||{};const g=A.ctx;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(X(x),Y(y)):g.moveTo(X(x),Y(y)));g.closePath();
 g.fillStyle=A.alpha(col,o.a||.38);g.fill();g.strokeStyle=col;g.lineWidth=3;g.setLineDash(o.dash||[]);g.stroke();g.setLineDash([])}
function line(a,b,col,o){o=o||{};const g=A.ctx;g.strokeStyle=col;g.lineWidth=o.w||3;g.setLineDash(o.dash||[]);g.beginPath();g.moveTo(X(a[0]),Y(a[1]));g.lineTo(X(b[0]),Y(b[1]));g.stroke();g.setLineDash([])}
/* the height: a dashed line from the top straight down to the base line, with a right-angle mark */
function height(x,h,col){line([x,h],[x,0],col||GREEN,{dash:[7,5]});const g=A.ctx,k=Math.min(12,F.u*.4);g.strokeStyle=col||GREEN;g.lineWidth=2;g.strokeRect(X(x),Y(0)-k,k,k)}
function inPoly(p,pts){let ins=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const[xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>p.y)!==(yj>p.y)&&p.x<(xj-xi)*(p.y-yi)/(yj-yi)+xi)ins=!ins}return ins}
function nearSeg(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=clamp(((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy),0,1);return Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy)}
const cm=v=>(Math.round(v*10)/10)+' cm',half=v=>v%2?(v/2).toFixed(1):String(v/2);
/* ---------- 1. cut a triangle off one end and slide it to the other ---------- */
const cutTri=()=>[[S.slide,0],[2+S.slide,0],[2+S.slide,5]];
function drawCut(){frame(-.5,11,6);grid();poly([[2,0],[8,0],[10,5],[2,5]],BLUE);poly(cutTri(),ORANGE);line([2,5],[2,0],INK,{dash:[4,4],w:2});
 pill(S.slide>=8?'Rectangle: 8 × 5 = 40 cm²':'Parallelogram · squares covered: 40',A.W/2,A.H*.07,big());
 pill('base 8 cm',X(4),Y(0)+16,small());if(S.slide<8)pill('drag the orange triangle →',A.W/2,Y(5)-18,small())}
function slideTo(v){A.tween(S,{slide:v},A.reduced()?0:700,'io',()=>{S.slide=v;if(v===8)S.made=true;
 after(v===8?'The triangle fills the gap. The parallelogram is now a rectangle 8 cm long and 5 cm high: 8 × 5 = 40 cm². Nothing was added or lost.':'The triangle is back where it was. The shape is a parallelogram again, still covering 40 squares.')})}
/* ---------- 2. lean the top edge: base and height stay, the slanted side grows ---------- */
const leanPts=()=>[[0,0],[8,0],[8+S.s,5],[S.s,5]];
function drawLean(){frame(-3.5,14.5,6);grid();poly(leanPts(),BLUE);const xh=(Math.max(0,S.s)+Math.min(8,8+S.s))/2;height(xh,5);
 pill(`Area = 8 × 5 = 40 cm²`,A.W/2,A.H*.07,big());pill('height 5 cm',X(xh),Y(2.5),small(),{edge:GREEN});
 pill(`${S.s?'slanted ':''}side ${cm(Math.hypot(S.s,5))}`,X(S.s/2),Y(3.8),small(),{edge:ORANGE});pill('base 8 cm',X(4),Y(0)+16,small())}
function lean(v){S.s=clamp(Math.round(v),-3,6);S.most=Math.max(S.most,Math.abs(S.s));A.sound.tick();
 after(S.s?`The top edge has moved ${Math.abs(S.s)} squares. The slanted sides are now ${cm(Math.hypot(S.s,5))} long, but the base is still 8 cm and the height still 5 cm, so the area is still 40 cm².`:'A rectangle: 8 × 5 = 40 cm².')}
/* ---------- 3. which length is the height? ---------- */
const HSHAPE=[[0,0],[6,0],[9,4],[3,4]];
function drawHeight(){frame(-.8,10,5);grid();poly(HSHAPE,BLUE);line([0,0],[3,4],S.pick==='side'?RED:ORANGE,{w:6});height(3,4,S.pick==='perp'?GREEN:INK);
 pill('5 cm',X(1.5)-26,Y(2),small(),{edge:ORANGE});pill('4 cm',X(3)+28,Y(2),small(),{edge:GREEN});pill('base 6 cm',X(3),Y(0)+16,small());
 pill(S.pick==='perp'?'Area = 6 × 4 = 24 cm²':S.pick==='side'?'6 × 5 = 30? But it covers 24 squares':'Which length goes with the base?',A.W/2,A.H*.07,big())}
function pick(k){S.pick=k;k==='perp'?A.sound.pop():A.sound.miss();
 after(k==='perp'?'Yes. The height is the 4 cm dashed line: it meets the base at a right angle. Area = 6 × 4 = 24 cm², the same as the 24 squares it covers.':'The 5 cm side leans over, so it is longer than the height. 6 × 5 = 30 cm², but the shape covers only 24 squares. Use the height that meets the base at a right angle.')}
/* ---------- 4. a turned copy of the triangle joins on to make a parallelogram ---------- */
const TRI=[[0,0],[6,0],[2,4]],TC=[8/3,4/3];
function copyPts(){const j=S.join,a=j*Math.PI,cx=TC[0]+8+(16/3-TC[0]-8)*j,cy=TC[1]+(8/3-TC[1])*j,co=Math.cos(a),si=Math.sin(a);
 return TRI.map(([x,y])=>{const dx=x-TC[0],dy=y-TC[1];return[cx+dx*co-dy*si,cy+dx*si+dy*co]})}
function drawTwin(){frame(-.5,15,5);grid();poly(TRI,ORANGE);poly(copyPts(),BLUE,{a:.3,dash:S.join<1?[6,4]:[]});
 pill(S.join>=1?(A.narrow?'24 cm² ÷ 2 = 12 cm² each':'Parallelogram 6 × 4 = 24 cm², so one triangle = 12 cm²'):'Triangle: base 6 cm, height 4 cm',A.W/2,A.H*.07,big());
 if(S.join<1)pill('drag the copy ←',X(11),Y(4.6),small())}
function joinTo(v){A.tween(S,{join:v},A.reduced()?0:900,'io',()=>{S.join=v;
 after(v===1?'The turned copy fits exactly. Two equal triangles make a parallelogram 6 cm by 4 cm, which is 24 cm². So one triangle is half: 12 cm².':'The copy is back on its own. Turn it and join it to the triangle.')})}
/* ---------- 5. slide the top corner: same base, same height, same area ---------- */
function drawApex(){frame(-4.5,11.5,5);grid();const ax=S.ax;if(ax<0)line([ax,0],[0,0],INK,{dash:[3,4],w:2});if(ax>6)line([6,0],[ax,0],INK,{dash:[3,4],w:2});
 poly([[0,0],[6,0],[ax,4]],ORANGE);height(ax,4);const g=A.ctx;g.fillStyle=ORANGE;g.beginPath();g.arc(X(ax),Y(4),Math.max(9,F.u*.3),0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 pill('Area = ½ × 6 × 4 = 12 cm²',A.W/2,A.H*.07,big());pill('base 6 cm',X(3),Y(0)+16,small());pill('height 4 cm',X(ax)+(ax>3?-52:52),Y(2),small(),{edge:GREEN})}
function apex(v){S.ax=clamp(Math.round(v),-4,11);if(S.ax<0||S.ax>6)S.out=true;A.sound.tick();
 after(S.ax<0||S.ax>6?`The top corner is past the end of the base, so the height falls outside the triangle. It is still 4 cm, and the base is still 6 cm: area = ½ × 6 × 4 = 12 cm².`:`The top corner is ${S.ax} cm along. Base 6 cm, height 4 cm, area still 12 cm².`)}
/* ---------- 6. build a triangle with a target area ---------- */
const TARGET=18;
function drawBuild(){frame(-.8,12.8,9);grid();const b=Math.round(S.b),h=Math.round(S.h);poly([[0,0],[S.b,0],[2,S.h]],b*h===2*TARGET?GREEN:ORANGE);height(2,S.h);
 const g=A.ctx;[[S.b,0],[2,S.h]].forEach(([x,y])=>{g.fillStyle=BLUE;g.beginPath();g.arc(X(x),Y(y),Math.max(9,F.u*.32),0,7);g.fill()});
 pill(`½ × ${b} × ${h} = ${half(b*h)} cm²   (target ${TARGET} cm²)`,A.W/2,A.H*.07,big(),{edge:b*h===2*TARGET?GREEN:null})}
function setBH(b,h){S.b=clamp(Math.round(b),1,12);S.h=clamp(Math.round(h),1,8);A.sound.tick();const a=S.b*S.h/2;
 after(a===TARGET?`½ × ${S.b} × ${S.h} = ${TARGET} cm². Base × height had to make ${2*TARGET}, double the target.`:`½ × ${S.b} × ${S.h} = ${half(S.b*S.h)} cm². ${a<TARGET?'Too small':'Too big'}: base × height needs to make ${2*TARGET}.`)}
/* ---------- challenge figures ---------- */
function drawChal(){const q=QS[((qn%QS.length)+QS.length)%QS.length];if(!q)return;const f=q.fig,top=f.par?f.b+f.off:Math.max(f.b,f.off);
 frame(Math.min(0,f.off)-1.2,top+1.2,f.h+1.2);grid();if(f.both)poly([[0,0],[f.b,0],[f.b+f.off,f.h],[f.off,f.h]],BLUE,{a:.15});
 poly(f.par?[[0,0],[f.b,0],[f.b+f.off,f.h],[f.off,f.h]]:[[0,0],[f.b,0],[f.off,f.h]],f.par?BLUE:ORANGE);if(f.off>f.b&&!f.par)line([f.b,0],[f.off,0],INK,{dash:[3,4],w:2});
 height(f.off,f.h);pill(`base ${f.b} cm`,X(f.b/2),Y(0)+16,small());pill(f.hl||`height ${f.h} cm`,X(f.off)+48,Y(f.h/2),small(),{edge:GREEN});
 if(f.side)pill(`${f.side} cm`,X(f.off/2)-30,Y(f.h*.65),small(),{edge:ORANGE});pill('Challenge',A.W/2,A.H*.07,big())}
function draw(){const k=part();if(k==='cut')drawCut();if(k==='lean')drawLean();if(k==='height')drawHeight();if(k==='twin')drawTwin();if(k==='apex')drawApex();if(k==='build')drawBuild();if(k==='chal')drawChal()}
function fresh(o){gen++;for(const k in S)delete S[k];Object.assign(S,{slide:0,made:false,s:0,most:0,pick:null,join:0,ax:2,out:false,b:4,h:3,ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||500)*(j+1)))}
function after(m){speak(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='cut')S.slide<8?b('Slide the triangle across',()=>slideTo(8)):b('Slide it back',()=>slideTo(0));
 if(k==='lean'){b('← Lean left',()=>lean(S.s-1),'Lean the top edge one square left');b('Lean right →',()=>lean(S.s+1),'Lean the top edge one square right')}
 if(k==='height'){b('Use the 5 cm side',()=>pick('side'));b('Use the 4 cm dashed line',()=>pick('perp'))}
 if(k==='twin')S.join<1&&b('Turn the copy and join it',()=>joinTo(1));
 if(k==='apex'){b('← Move corner',()=>apex(S.ax-1),'Move the top corner one square left');b('Move corner →',()=>apex(S.ax+1),'Move the top corner one square right')}
 if(k==='build'){b('Base −1',()=>setBH(S.b-1,S.h),'Make the base 1 cm shorter');b('Base +1',()=>setBH(S.b+1,S.h),'Make the base 1 cm longer');
  b('Height −1',()=>setBH(S.b,S.h-1),'Make the height 1 cm lower');b('Height +1',()=>setBH(S.b,S.h+1),'Make the height 1 cm higher')}}
/* pointer input: each part decides what a press grabs */
function down(p){const k=part(),g=toG(p),grab=1.1;S.from=g;
 if(k==='cut'){if(!inPoly(g,cutTri()))return false;S.grab=g.x-S.slide;return true}
 if(k==='lean'){if(Math.abs(g.y-5)>grab)return false;S.grab=g.x-S.s;return true}
 if(k==='height'){const ds=nearSeg(g,[0,0],[3,4]),dp=nearSeg(g,[3,4],[3,0]);if(Math.min(ds,dp)>grab)return false;pick(ds<dp?'side':'perp');return false}
 if(k==='twin'){if(S.join>=1||!inPoly(g,copyPts()))return false;S.j0=S.join;return true}
 if(k==='apex'){if(Math.hypot(g.x-S.ax,g.y-4)>grab*1.4)return false;return true}
 if(k==='build'){if(Math.hypot(g.x-S.b,g.y)<grab*1.3){S.drag='b';return true}if(Math.hypot(g.x-2,g.y-S.h)<grab*1.3){S.drag='h';return true}return false}return false}
function move(p){const k=part(),g=toG(p);
 if(k==='cut'){S.slide=clamp(g.x-S.grab,0,8);A.redraw()}
 if(k==='lean'){const v=clamp(Math.round(g.x-S.grab),-3,6);if(v!==S.s)lean(v)}
 if(k==='twin'){S.join=clamp(S.j0+(S.from.x-g.x)/(16/3),0,.99);A.redraw()}
 if(k==='apex'){const v=clamp(Math.round(g.x),-4,11);if(v!==S.ax)apex(v)}
 if(k==='build'){if(S.drag==='b'){const v=clamp(Math.round(g.x),1,12);if(v!==S.b)setBH(v,S.h)}if(S.drag==='h'){const v=clamp(Math.round(g.y),1,8);if(v!==S.h)setBH(S.b,v)}}}
function up(){const k=part();if(k==='cut')slideTo(S.slide>4?8:0);if(k==='twin')joinTo(S.join>.55?1:0)}
const steps=[
{h:'Cut and slide',p:'A parallelogram has two pairs of parallel sides. Cut the orange triangle off one end and slide it to the other end. Drag it, or use the button.',
 predict:{q:'When the triangle moves to the other end, the area will…',opts:['get bigger','stay the same','get smaller'],ans:1},
 task:'Turn the parallelogram into a rectangle',show:()=>auto(0,[()=>slideTo(8)]),
 go:()=>{fresh();speak('A parallelogram on a centimetre grid, base 8 cm, height 5 cm. The orange end can be cut off and moved.');keys();S.ok=finishIf(0,()=>S.made,'Same squares, new shape: parallelogram area = base × height.')}},
{h:'Lean it over',p:'Start with an 8 by 5 rectangle. Drag the top edge sideways, or use the buttons. Watch the slanted sides and the area.',
 predict:{q:'You push the top edge over and the slanted sides get longer. The area…',opts:['grows, because the sides are longer','stays 40 cm²','shrinks, because it is squashed'],ans:1},
 task:'Lean the top edge at least 4 squares',show:()=>auto(1,[()=>lean(1),()=>lean(2),()=>lean(3),()=>lean(4)],350),
 go:()=>{fresh();speak('A rectangle 8 cm by 5 cm. Drag the top edge sideways.');keys();S.ok=finishIf(1,()=>S.most>=4,'The base and the height did not change, so neither did the area.')}},
{h:'Find the height',p:'The height is the distance straight up from the base, at a right angle (90°) to it. Tap the length that goes with the 6 cm base.',
 predict:{q:'To find the area, multiply the base by…',opts:['the slanted side','the perpendicular height','the top edge'],ans:1},
 task:'Pick the length that gives the true area',show:()=>auto(2,[()=>pick('side'),()=>pick('perp')],900),
 go:()=>{fresh();speak('A parallelogram with base 6 cm, a slanted side of 5 cm and a dashed height of 4 cm.');keys();S.ok=finishIf(2,()=>S.pick==='perp','The height is perpendicular to the base. The slanted side is longer.')}},
{h:'Two triangles',p:'Here is a triangle and an exact copy. Turn the copy upside down and join it on. Drag the copy, or use the button.',
 predict:{q:'Two copies of a triangle make a parallelogram. One triangle is…',opts:['half of it','a third of it','the same size as it'],ans:0},
 task:'Join the copy to make a parallelogram',show:()=>auto(3,[()=>joinTo(1)]),
 go:()=>{fresh();speak('An orange triangle, base 6 cm and height 4 cm, and a dashed copy on the right.');keys();S.ok=finishIf(3,()=>S.join>=1,'Triangle area = ½ × base × height.')}},
{h:'Move the top corner',p:'Drag the top corner along, staying 4 cm up. Take it past the end of the base too.',
 predict:{q:'The top corner moves far along, still 4 cm up. The area…',opts:['gets bigger','stays 12 cm²','gets smaller'],ans:1},
 task:'Move the top corner past the end of the base',show:()=>auto(4,[()=>apex(4),()=>apex(6),()=>apex(8),()=>apex(10)],350),
 go:()=>{fresh();speak('A triangle with base 6 cm and height 4 cm. Its top corner can slide left or right.');keys();S.ok=finishIf(4,()=>S.out,'Same base, same height, same area, even when the height falls outside the triangle.')}},
{h:'Build one',p:'Drag the blue dots, or use the buttons, to make a triangle with an area of 18 cm².',
 task:'Make a triangle of 18 cm²',show:()=>auto(5,[()=>setBH(9,3),()=>setBH(9,4)],700),
 go:()=>{fresh();speak('A triangle with base 4 cm and height 3 cm, area 6 cm². Target: 18 cm².');keys();S.ok=finishIf(5,()=>S.b*S.h===2*TARGET,'Base × height = 36, and half of 36 is 18.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
/* each question: text, right answer, two wrong answers tagged with the slip they come from, and its figure */
const QS=[
 {q:'A triangle has a base of 8 cm and a perpendicular height of 5 cm. What is its area?',ans:'20 cm²',bad:[['40 cm²','nohalf'],['13 cm²','add']],fig:{b:8,h:5,off:3}},
 {q:'A parallelogram has a base of 7 cm, a height of 4 cm and slanted sides 5 cm long. What is its area?',ans:'28 cm²',bad:[['35 cm²','slant'],['14 cm²','halfpg']],fig:{par:1,b:7,h:4,off:3,side:5}},
 {q:'A triangle has a base of 10 cm, a height of 4 cm and a slanted side of 5 cm. What is its area?',ans:'20 cm²',bad:[['25 cm²','slant'],['40 cm²','nohalf']],fig:{b:10,h:4,off:3,side:5}},
 {q:'A parallelogram has an area of 48 cm² and a base of 8 cm. What is its height?',ans:'6 cm',bad:[['40 cm','subtract'],['12 cm','tri']],fig:{par:1,b:8,h:6,off:2,hl:'height ?'}},
 {q:'This triangle stands on a 4 cm base. Its top corner is 6 cm up, out past the end of the base. What is its area?',ans:'12 cm²',bad:[['21 cm²','outside'],['24 cm²','nohalf']],fig:{b:4,h:6,off:7}},
 {q:'A triangle and a parallelogram have the same base and the same height. How do their areas compare?',ans:'The triangle is half the parallelogram',bad:[['They are equal','equal'],['The triangle is a third of it','third']],fig:{b:6,h:4,off:2,both:1}}];
function why(tag){let m='Look back at how the lab built each shape from a rectangle.';
 if(tag==='nohalf')m='That is base × height, the whole parallelogram. A triangle is half of it, so halve your answer.';
 if(tag==='add')m='Area multiplies: rows of squares times squares in each row. Adding the base and the height gives a length, not an area.';
 if(tag==='slant')m='That used the slanted side. The height must meet the base at a right angle, and the slanted side is longer, so the answer comes out too big.';
 if(tag==='halfpg')m='Only a triangle is halved. A parallelogram slides into a whole rectangle, so its area is base × height.';
 if(tag==='subtract')m='Base × height = area, so height = area ÷ base. Taking the base away mixes up cm² and cm.';
 if(tag==='tri')m='Doubling first is for a triangle. This is a parallelogram, so height = area ÷ base = 48 ÷ 8.';
 if(tag==='outside')m='The base is the side the triangle stands on, 4 cm. The gap out to the top corner is not part of the base.';
 if(tag==='equal')m='Two copies of the triangle fill the parallelogram, so one triangle is only half of it.';
 if(tag==='third')m='It takes two copies, not three, to fill the parallelogram, so the triangle is half.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();speak(ok?'Yes: '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:Q=>{quiz.hidden=Q.step!==6;pad.hidden=Q.step===6;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Shape controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
