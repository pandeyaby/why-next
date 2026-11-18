/* Geometry and data for the quadrilateral family lab (flag_qhier.js; bundled in the main learn.js like quad4_art.js so the
   lab file stays under 20 KB). Shapes are four [x, y] grid corners in order. props(P) works only with whole-number
   coordinates, so every test is exact: parallel sides have a zero cross product, right angles a zero dot product, and
   equal sides equal squared lengths. name(P) gives the most exact name of the parallelogram family (inclusive
   definitions: a square is a rectangle and a rhombus; both are parallelograms). */
const QHART={
props(P){const v=i=>[P[(i+1)%4][0]-P[i][0],P[(i+1)%4][1]-P[i][1]],S=[0,1,2,3].map(v),cr=(a,b)=>a[0]*b[1]-a[1]*b[0],dt=(a,b)=>a[0]*b[0]+a[1]*b[1],L=S.map(s=>dt(s,s));
 const turns=[0,1,2,3].map(i=>cr(S[i],S[(i+1)%4])),simple=turns.every(t=>t>0)||turns.every(t=>t<0);
 const par=[cr(S[0],S[2])===0,cr(S[1],S[3])===0],right=[0,1,2,3].map(i=>dt(S[(i+3)%4],S[i])===0);
 return{S,L,simple,par,nPar:par.filter(Boolean).length,right,nRight:right.filter(Boolean).length,allEq:L.every(x=>x===L[0]),oppEq:L[0]===L[2]&&L[1]===L[3]}},
name(P){const q=QHART.props(P);if(!q.simple)return'not a simple quadrilateral';if(q.nPar===2){if(q.nRight===4)return q.allEq?'square':'rectangle';return q.allEq?'rhombus':'parallelogram'}
 return q.nPar===1?'trapezium':'quadrilateral'},
START:[[1,1],[6,1],[5,4],[2,5]],
BUILD:[{want:'parallelogram',ask:'Make a parallelogram: two pairs of parallel sides, no right angles.',P:[[1,1],[5,1],[6,4],[2,4]]},
 {want:'rectangle',ask:'Now make a rectangle: keep both pairs parallel and make every corner a right angle.',P:[[1,1],[5,1],[5,4],[1,4]]},
 {want:'rhombus',ask:'Now make a rhombus: four equal sides, but no right angles.',P:[[1,3],[4,1],[7,3],[4,5]]}],
TREE:[{id:'P',name:'parallelogram',lv:1},{id:'L',name:'rectangle|rhombus',lv:2},{id:'R',name:'rectangle|rhombus',lv:2},{id:'S',name:'square',lv:3}],
LEVEL:{parallelogram:1,rectangle:2,rhombus:2,square:3},
ASN:[{s:'A rectangle is a parallelogram.',a:'Always',hi:['rectangle','parallelogram'],why:{Sometimes:'subsetSome',Never:'subsetNever'}},
 {s:'A parallelogram is a rectangle.',a:'Sometimes',hi:['parallelogram','rectangle'],why:{Always:'upAlways',Never:'upNever'}},
 {s:'A square is a rhombus.',a:'Always',hi:['square','rhombus'],why:{Sometimes:'subsetSome',Never:'subsetNever'}},
 {s:'A rhombus has four right angles.',a:'Sometimes',hi:['rhombus','square'],why:{Always:'rhombAlways',Never:'rhombNever'}}],
CLUE:[{P:[[2,3],[4,1],[6,3],[4,5]],opts:[['Square','ok'],['Rhombus, but not a square','turned'],['Parallelogram, but not a rectangle','turned']]},
 {P:[[1,2],[7,2],[7,4],[1,4]],opts:[['Rectangle','ok'],['Square','sidesUneq'],['Not a parallelogram','rectNotPar']]},
 {P:[[0,5],[3,1],[8,1],[5,5]],opts:[['Rhombus','ok'],['Square','noRight'],['Trapezium, not a parallelogram','countPar']]}],
bank:[['Is every square a rectangle?','Yes: it has four right angles and two pairs of parallel sides',[['No: a square has equal sides, so it is not a rectangle','extraProp'],['Only when it sits flat on one side','turned']]],
['Is every rectangle a square?','No: its sides need not all be equal',[['Yes: both have four right angles','sameRight'],['Yes: both are parallelograms','sameFamily']]],
['A shape has four equal sides and four right angles, and it is turned on its corner. What is its most exact name?','Square',[['Rhombus','turned'],['Kite','turned']]],
['Which property do all parallelograms have?','Opposite sides are parallel and equal',[['Four right angles','rectOnly'],['Four equal sides','rhombOnly']]],
['Which shape is a rectangle and a rhombus at the same time?','Square',[['Parallelogram','tooWide'],['No shape can be both','bothNever']]],
['A rhombus has no right angles. Can it be a rectangle?','No: a rectangle needs four right angles',[['Yes: it has two pairs of parallel sides','sameFamily'],['Yes, if you turn it','turned']]],
['True or false: a parallelogram is always a rhombus.','False: only some parallelograms have four equal sides',[['True: they both lean','lookLike'],['True: both have parallel sides','sameFamily']]]],
WHY:{subsetSome:'Every rectangle has two pairs of parallel sides, so every rectangle is a parallelogram. That makes it always, not sometimes.',
 subsetNever:'A shape belongs to every family above it in the tree. It keeps all those properties, so the answer is always.',
 upAlways:'Going up the tree is not always true. A parallelogram with no right angles is not a rectangle, so it is only sometimes.',
 upNever:'A parallelogram with four right angles is a rectangle, so it can happen: sometimes.',
 rhombAlways:'Most rhombuses lean and have no right angles. Only a square, the special rhombus, has four right angles: sometimes.',
 rhombNever:'A square is a rhombus with four right angles, so it does happen: sometimes.',
 turned:'Turning a shape does not change its properties. Check the sides and corners: four equal sides and four right angles make a square, even on its corner.',
 sidesUneq:'All four angles are right angles, but the sides are not all equal (6 and 2), so this is a rectangle, not a square.',
 rectNotPar:'Opposite sides of a rectangle are parallel, so a rectangle is always a parallelogram.',
 noRight:'The four sides are equal, but the corners are not right angles, so this is a rhombus, not a square.',
 countPar:'Count the parallel pairs: both pairs of opposite sides are parallel, so this is a parallelogram, and its equal sides make it a rhombus.',
 extraProp:'A square has every property of a rectangle, plus equal sides. An extra property makes it a special rectangle, not something else.',
 sameRight:'Sharing four right angles is not enough. A square also needs four equal sides, and most rectangles do not have them.',
 sameFamily:'Being in the same family does not make shapes the same. Check the property that names the shape: right angles for a rectangle, equal sides for a rhombus.',
 rectOnly:'Only rectangles (and squares) have four right angles. Every parallelogram has opposite sides parallel and equal.',
 rhombOnly:'Only rhombuses (and squares) have four equal sides. Every parallelogram has opposite sides parallel and equal.',
 tooWide:'Parallelogram is the family above both. The shape with right angles and equal sides is the square.',
 bothNever:'A square has four right angles (a rectangle) and four equal sides (a rhombus), so it is both.',
 lookLike:'Looking alike is not a property. A rhombus needs four equal sides; a parallelogram may have two long and two short sides.'}};
