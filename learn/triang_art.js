/* Data and geometry for the angles-in-triangles lab (flag_triang.js; bundled in the main learn.js like decdiv_art.js so the
   lab file stays under 20 KB). tri(a, b, box) builds a triangle with angle a at the left end of the base and b at the right,
   scaled to fit box; ang(P, Q, R) is the angle at P in degrees; rnd(list, total) rounds angles so they still add to total. */
const TRART={
ang(P,Q,R){const a=Math.atan2(Q.y-P.y,Q.x-P.x),b=Math.atan2(R.y-P.y,R.x-P.x);let d=Math.abs(a-b);if(d>Math.PI)d=2*Math.PI-d;return d*180/Math.PI},
rnd(list,total){const r=list.map(Math.round);r[r.length-1]=total-r.slice(0,-1).reduce((s,v)=>s+v,0);return r},
tri(a,b,box){const ra=a*Math.PI/180,rb=b*Math.PI/180,t=Math.sin(rb)/Math.sin(ra+rb),u=[{x:0,y:0},{x:1,y:0},{x:t*Math.cos(ra),y:t*Math.sin(ra)}];
 const x0=Math.min(...u.map(p=>p.x)),x1=Math.max(...u.map(p=>p.x)),y1=Math.max(...u.map(p=>p.y)),s=Math.min(box.w/(x1-x0),box.h/y1);
 const ox=box.x+(box.w-(x1-x0)*s)/2-x0*s,oy=box.y+(box.h+y1*s)/2;return u.map(p=>({x:ox+p.x*s,y:oy-p.y*s}))},
COL:['#b91c1c','#1d4ed8','#a16207','#047857'],
FIND:[{a:50,b:60,q:'Two angles are 50° and 60°.',opts:[['70°','ok'],['110°','added'],['250°','used360']]},
 {a:110,b:25,q:'Two angles are 110° and 25°.',opts:[['45°','ok'],['135°','added'],['225°','used360']]},
 {a:24,b:121,q:'Two angles are 24° and 121°.',opts:[['35°','ok'],['145°','added'],['215°','used360']]}],
SPECIAL:[{a:70,b:70,show:[null,null,'40°'],ask:0,q:'Isosceles: the two sloping sides are equal. The top angle is 40°. What is each base angle?',opts:[['70°','ok'],['140°','isoSub'],['40°','isoCopy']]},
 {a:90,b:35,show:['90°','35°',null],ask:2,q:'Right-angled triangle. One angle is 35°. What is the third angle?',opts:[['55°','ok'],['145°','rightForgot'],['35°','copyAngle']]},
 {a:65,b:65,show:['65°',null,null],ask:2,q:'Isosceles: the base angles are equal. One base angle is 65°. What is the top angle?',opts:[['50°','ok'],['115°','baseOnce'],['65°','allSame']]}],
POLY:[{n:5,name:'pentagon',opts:[['108°','ok'],['180°','nTri'],['72°','extAngle']]},
 {n:6,name:'hexagon',opts:[['120°','ok'],['60°','extAngle'],['180°','nTri']]},
 {n:8,name:'octagon',opts:[['135°','ok'],['1080°','sumNotEach'],['45°','extAngle']]}],
bank:[['Two angles of a triangle are 45° and 75°. What is the third angle?','60°',[['120°','added'],['240°','used360']]],
['An isosceles triangle has a top angle of 100°. What is each base angle?','40°',[['80°','isoSub'],['100°','isoCopy']]],
['What do the four angles of any quadrilateral add up to?','360°',[['180°','quad180'],['It depends on the shape','dependsShape']]],
['A right-angled triangle has an angle of 28°. What is the third angle?','62°',[['152°','rightForgot'],['28°','copyAngle']]],
['What is each angle of a regular hexagon?','120°',[['60°','extAngle'],['180°','nTri']]],
['A huge triangle and a tiny triangle: whose angles add up to more?','Both add up to 180°',[['The huge one','sizeMatters'],['The tiny one','sizeMatters']]],
['What do the angles of a pentagon add up to?','540°',[['900°','nTri'],['360°','quad180']]]],
WHY:{"isoSub": "180° minus the top angle is what the two base angles share. Halve it: each base angle gets half.", "isoCopy": "The equal angles are the two base angles, at the ends of the equal sides, not the top angle.", "rightForgot": "Do not forget the right angle: it uses 90° of the 180°. The other two angles make 90° together.", "copyAngle": "The two smaller angles are only equal when the triangle is isosceles. Work it out: 90° − the angle you know.", "baseOnce": "There are two equal base angles. Take both away: 180° − 65° − 65° = 50°.", "allSame": "Only an equilateral triangle has three equal angles. Here two angles are 65°, so the third is 180° − 130°.", "quad180": "Split the shape into triangles from one corner. 4 sides make 2 triangles, so 360°. 5 sides make 3 triangles, so 540°.", "dependsShape": "The angles change when the shape changes, but their total does not: two triangles always make 360°.", "extAngle": "That is the turn at each corner (360° ÷ n), the outside angle. The inside angle is 180° minus it.", "sumNotEach": "That is the total of all the angles. Share it between the equal angles: divide by the number of sides.", "sizeMatters": "Size does not change the angles. Torn-off corners of any triangle make a straight line: 180°."}};
