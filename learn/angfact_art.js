/* Data, words and drawing helpers for flagangfact (angles on a straight line, round a point and vertically opposite,
   ages 10–11). Basis: National Curriculum in England, Year 6 geometry (recognise angles where they meet at a point, are
   on a straight line, or are vertically opposite, and find missing angles); NCETM Year 6 ready-to-progress guidance;
   Euclid, Elements I.13 (angles on a line make two right angles) and I.15 (vertically opposite angles are equal).
   Slips it targets: using 360° on a straight line or 180° round a point; copying the angle next door as if equal;
   taking away from 90° instead of 180°; giving the total of the known angles as the answer; trusting how a diagram
   looks instead of a fact (diagrams are not drawn to scale); using "round a point" before enough angles are known. */
const ANGF=(()=>{
const R=(x,y,w,h)=>({x,y,w,h}),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const rad=d=>d*Math.PI/180,norm=d=>((d%360)+360)%360,snap=(d,s)=>Math.round(d/(s||5))*(s||5);
/* direction (degrees, anticlockwise from east) of point p seen from centre o */
const dirOf=(o,p)=>norm(Math.atan2(o.y-p.y,p.x-o.x)*180/Math.PI);
const tip=(o,d,r)=>({x:o.x+r*Math.cos(rad(d)),y:o.y-r*Math.sin(rad(d))});
function pen(A,C){const fs=n=>Math.round(A.narrow?n:n*1.3);
 function text(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const rows=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){rows.push(cur);cur=w}else cur=t});rows.push(cur);
  const lh=fs(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(r,fill,how){const g=A.ctx;g.fillStyle=how==='ok'?'#d1fae5':how==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(9,r.h/3));g.fill();
  g.lineWidth=how?3:1.5;g.strokeStyle={ok:C.ok,ko:C.ko,sel:C.sel,hot:C.warm}[how]||C.rim;g.stroke()}
 function grid(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>R(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 /* a ray from o in direction d */
 function ray(o,d,r,col,wid){const g=A.ctx,e=tip(o,d,r);g.strokeStyle=col||C.ink;g.lineWidth=wid||3;g.lineCap='round';g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();return e}
 /* a filled wedge for the angle swept anticlockwise from d1 to d2, with its label outside the arc */
 function wedge(o,d1,d2,r,fill,label,lc){const g=A.ctx,sweep=norm(d2-d1)||360;g.fillStyle=fill;g.beginPath();g.moveTo(o.x,o.y);g.arc(o.x,o.y,r,-rad(d1),-rad(d1+sweep),true);g.closePath();g.fill();
  g.strokeStyle=lc||C.ink;g.lineWidth=1.5;g.beginPath();g.arc(o.x,o.y,r,-rad(d1),-rad(d1+sweep),true);g.stroke();
  if(label!=null){const m=tip(o,d1+sweep/2,r+fs(15)+(sweep<60?fs(14):0));text(label,m.x,m.y,12,{b:800,c:lc||C.ink})}
  return sweep}
 function knob(p,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,A.narrow?13:11,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2.5;g.stroke()}
 function square(o,d,s){const g=A.ctx,a=tip(o,d,s),b=tip(o,d+90,s),c=tip(a,d+90,s);g.strokeStyle=C.ink;g.lineWidth=1.5;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(c.x,c.y);g.lineTo(b.x,b.y);g.stroke()}
 return{text,card,grid,ray,wedge,knob,square,fs}}
/* scene 2: missing angle on a straight line. known: angles from the east end, in order; chips: [value, slip] */
const LINE=[{known:[40,75],chips:[[65,''],[245,'full'],[115,'add'],[75,'same']]},
 {known:[90,35],chips:[[55,''],[235,'full'],[35,'same'],[125,'add']]},
 {known:[128],chips:[[52,''],[232,'full'],[128,'same'],[38,'ninety']]}];
/* scene 4: crossing lines, the angle that is highlighted each round (a, b, c, d) and where the line turns to */
const CROSS=[{phi:55,ask:0},{phi:120,ask:1},{phi:70,ask:3}];
const NAMES=['a','b','c','d'];
/* scene 5: one angle given; each unknown needs a reason. ok: reasons that work at that moment */
const GIVEN=48;
const CHAIN=[{k:1,ok:['line']},{k:2,ok:['opp','line']},{k:3,ok:['opp','line','point']}];
const REASONS=[{id:'line',t:'Angles on a straight line add to 180°'},{id:'opp',t:'Vertically opposite angles are equal'},
 {id:'point',t:'Angles round a point add to 360°'},{id:'look',t:'It looks about the same size'}];
const START=['Drag the blue dot to turn the ray. Watch a and b.',
 'Pick the missing angle. Drag a number onto ?, or tap it.',
 'Drag any dot to turn that ray. Make the three angles equal.',
 'Find the angle that is equal to the highlighted one. Tap it.',
 'Drag a reason onto the yellow angle, or tap it.'];
const LEARNT=['Wherever the ray points, a + b = 180°. Angles on a straight line add to 180°.',
 'Missing angle on a line = 180° − the angles you know.',
 'Three equal angles round a point: 360° ÷ 3 = 120° each. Angles round a point add to 360°.',
 'Where two straight lines cross, vertically opposite angles are equal. Angles next to each other add to 180°.',
 'Every angle found with a reason, not by eye. The four angles add to 360°.'];
const QUIZ=[
 {q:'Two angles sit on a straight line. One is 65°. What is the other?',a:'115°',o:[['295°','full'],['65°','same'],['25°','ninety']]},
 {q:'Angles round a point are 95°, 110°, 85° and x. What is x?',a:'70°',o:[['290°','add'],['−110°','line']]},
 {q:'Two straight lines cross. One angle is 38°. What is the angle opposite it?',a:'38°',o:[['142°','adjopp'],['322°','full']]},
 {q:'Two straight lines cross. One angle is 38°. What is the angle next to it?',a:'142°',o:[['38°','oppnext'],['52°','ninety']]},
 {q:'Three angles on a straight line are 45°, 45° and x. What is x?',a:'90°',o:[['270°','full'],['45°','same']]},
 {q:'Three equal angles meet round a point. How big is each one?',a:'120°',o:[['60°','line'],['90°','quarter']]},
 {q:'An angle in a diagram looks like 50°. Can you write 50° without working it out?',a:'No: work it out with an angle fact',o:[['Yes, if it looks right','look'],['Yes, it is drawn exactly','look2']]}];
return{R,on,rad,norm,snap,dirOf,tip,pen,LINE,CROSS,NAMES,GIVEN,CHAIN,REASONS,START,LEARNT,QUIZ}})();
