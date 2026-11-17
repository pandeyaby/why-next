/* Data and screen-reader text for the compound-perimeter lab (flag_cper.js; bundled in learn.js).
   Maths (National Curriculum in England, Year 4 "measure and calculate the perimeter of a rectilinear figure (including
   squares) in centimetres and metres" and Year 5 "measure and calculate the perimeter of composite rectilinear shapes in
   centimetres and metres"; NCETM Year 5 Measures spine): the perimeter is the total length of every side. In a rectilinear
   shape the horizontal sides on the top add up to those on the bottom, and the vertical sides on the left add up to those
   on the right, so a missing side is found by subtracting. Cutting a rectangle from a corner leaves the perimeter the same
   (the two new sides replace two equal lengths); cutting a slot of depth d into the middle of a side adds 2d. */
const CPART=(()=>{
/* shapes: vertices in grid units, clockwise from top-left; side k joins vertex k to k+1 */
const LSH=[[0,0],[10,0],[10,4],[4,4],[4,8],[0,8]];
/* missing-side rounds: [unit, vertices, sides shown as "?", choices per hidden side [right, added, copied]] */
const MISS=[['cm',[[0,0],[12,0],[12,9],[7,9],[7,5],[0,5]],[2,3],{2:[5,19,7],3:[4,14,9]}],
 ['m',[[0,0],[4,0],[4,3],[11,3],[11,8],[0,8]],[2,3],{2:[7,15,4],3:[5,11,3]}]];
const KIDS=[['An L-shape has sides of 10, 4, 6, 4, 4 and 8 cm. Its perimeter is…',[['Ann','32 cm. I added the sides I saw.','Ann missed a side. Count all 6: 10 + 4 + 6 + 4 + 4 + 8 = 36 cm.'],['Ben','36 cm.',''],['Col','80 cm, the whole rectangle.','80 is the area of the 10 × 8 rectangle in cm². Perimeter is the distance round the edge.']]],
 ['A square is cut from the corner of a rectangle. The perimeter…',[['Dee','gets smaller, as the shape is smaller.','The area gets smaller, but the two new sides are as long as the two bits that were cut away.'],['Eve','stays the same.',''],['Fin','doubles.','Only two short sides are swapped for two equal sides. Nothing doubles.']]],
 ['The bottom is 12 cm. The top pieces are 7 cm and ?. The ? side is…',[['Gia','19 cm.','Gia added. The top pieces together equal the bottom: 12 − 7 = 5 cm.'],['Hal','5 cm.',''],['Ida','7 cm.','Ida copied the other piece. The ? side is 12 − 7 = 5 cm.']]]];
const QZ=[['An L-shape fits in a 9 cm by 6 cm rectangle, with one corner cut out. Its perimeter is…','30 cm',[['Less than 30 cm','smaller'],['54 cm','area']]],
 ['The top is 15 m. The bottom pieces are 9 m and ?. The ? side is…','6 m',[['24 m','add'],['9 m','copy']]],
 ['A 2 cm deep slot is cut into the middle of a side. The perimeter…','grows by 4 cm',[['grows by 2 cm','once'],['stays the same','corner']]],
 ['An L-shape has sides 8, 3, 5, 4, 3 and 7 cm. Its perimeter is…','30 cm',[['27 cm','missed'],['56 cm','area']]],
 ['The left side is 9 cm. The right side pieces are 4 cm and ?. The ? side is…','5 cm',[['13 cm','add'],['4 cm','copy']]],
 ['Which cut keeps a rectangle\'s perimeter the same?','A rectangle cut from a corner',[['A slot cut into a side','corner'],['Any cut makes it smaller','smaller']]]];
const WHY={smaller:'Cutting a corner swaps two lengths for two equal lengths, so the perimeter stays the same even though the area is smaller.',area:'That is an area in square units. Perimeter only adds the lengths round the edge.',
 add:'The pieces on one side add up to the whole opposite side, so subtract: whole − known piece.',copy:'The two pieces are not always equal. Subtract the known piece from the whole side.',
 once:'A slot has two new walls, one on each side, so the perimeter grows by 2 × the depth.',corner:'A corner cut keeps the perimeter; a slot in the middle of a side adds 2 × its depth.',missed:'Count all six sides of an L-shape, not just the five you see first.'};
const H={walk:['Tap each side to add it. Count each side once.','All 6 sides: 36 cm.'],miss:['Tap a ? side, then pick its length.','Subtract from the opposite side.'],corner:['Drag the corner dot to cut a different piece.','Perimeter stays 36 cm.'],
 slot:['Drag the slot deeper or shallower.','Each 1 cm deeper adds 2 cm.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Add every side once; subtract to find missing ones.','']};
const len=(V,k)=>{const a=V[k],b=V[(k+1)%V.length];return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])};
const per=V=>V.reduce((s,_,k)=>s+len(V,k),0);
const cornerShape=(cx,cy)=>[[0,0],[cx,0],[cx,cy],[10,cy],[10,8],[0,8]];
const slotShape=d=>d?[[0,0],[4,0],[4,d],[6,d],[6,0],[10,0],[10,8],[0,8]]:[[0,0],[10,0],[10,8],[0,8]];
function say(k,S){let d='Challenge.';
 if(k==='walk')d=S.won?'All six sides counted: 36 cm.':`L-shape with sides ${LSH.map((_,i)=>len(LSH,i)+' cm').join(', ')}. Counted: ${S.got.map(i=>len(LSH,i)).join(' + ')||'none'}${S.got.length?' = '+S.got.reduce((s,i)=>s+len(LSH,i),0)+' cm':''}.`;
 if(k==='miss'){const R=MISS[Math.min(S.k,1)],V=R[1];d=S.won?'All four missing sides found.':`Shape ${S.k+1}, in ${R[0]}. Sides going round: ${V.map((_,i)=>R[2].includes(i)&&S.found[i]==null?'?':len(V,i)).join(', ')}.${S.sel!=null?' Choosing side '+(S.sel+1)+'.':''}`}
 if(k==='corner'){const V=cornerShape(S.cx,S.cy);d=`Rectangle 10 by 8 cm with a ${10-S.cx} by ${S.cy} cm piece cut from the top right corner. Perimeter ${per(V)} cm, area ${80-(10-S.cx)*S.cy} square cm. Spots tried: ${S.tried.length}.`}
 if(k==='slot')d=`Rectangle 10 by 8 cm with a 2 cm wide slot ${S.d} cm deep in the top. Perimeter ${per(slotShape(S.d))} cm.`;
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {LSH,MISS,KIDS,QZ,WHY,H,len,per,cornerShape,slotShape,say}})();
