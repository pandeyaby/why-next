/* Data for flagcxdiv (complex conjugates and division, ages 16–18). Sources: Edexcel A level Further Mathematics 9FM0
   Core Pure 2.1–2.3 (conjugate z*, zz* = |z|², division by multiplying by the conjugate of the denominator, modulus and
   argument of a quotient); AQA 7367 Further Maths B1–B3; OCR Y540 1.04; MEI Further Pure with Technology notes on the
   Argand diagram. Slips it targets: taking the conjugate as −a − bi, losing the sign through i² = −1 so zz* comes out as
   a² − b², multiplying by the conjugate of the numerator or by the denominator itself, forgetting to divide by the new
   real denominator, and adding the arguments when dividing. */
const CXD=(()=>{
const T0={a:2,b:-3},T1={sum:6,dif:4};
const K25=[[5,0],[4,3],[3,4],[0,5],[-3,4],[-4,3],[-5,0],[-4,-3],[-3,-4],[0,-5],[3,-4],[4,-3]];
const STAGES=[
 {q:'Multiply top and bottom by…',opts:[['1 − 2i',1,'1 − 2i is the conjugate of the denominator 1 + 2i.'],['1 + 2i',0,'(1 + 2i)² = −3 + 4i: the bottom is still complex.'],['5 − 5i',0,'That is the conjugate of the top. Use the conjugate of the bottom.'],['i',0,'i(1 + 2i) = −2 + i: still complex. You need the conjugate of the bottom.']]},
 {q:'New denominator (1 + 2i)(1 − 2i) =',opts:[['5',1,'1 − 4i² = 1 + 4 = 5, a real number.'],['−3',0,'That treats i² as +1. With i² = −1, 1 − 4i² = 1 + 4.'],['1 − 4i',0,'The middle terms −2i and +2i cancel and i² = −1 is real, so no i is left.']]},
 {q:'New numerator (5 + 5i)(1 − 2i) =',opts:[['15 − 5i',1,'5 − 10i + 5i − 10i² = 5 − 5i + 10 = 15 − 5i.'],['−5 − 5i',0,'That uses i² = +1. −10i² = +10, not −10.'],['5 − 10i',0,'Expand all four products: 5, −10i, +5i and −10i².']]},
 {q:'So (5 + 5i) ÷ (1 + 2i) =',opts:[['3 − i',1,'(15 − 5i) ÷ 5 = 3 − i. Check: (3 − i)(1 + 2i) = 5 + 5i.'],['15 − 5i',0,'Divide the numerator by the new denominator, 5.'],['3 − 5i',0,'Divide both parts by 5: 15 ÷ 5 = 3 and −5 ÷ 5 = −1.']]}];
const ZQ={a:2,b:4},WANT={a:4,b:-2};
const DESC=[
 'Argand diagram. Drag z; its conjugate z* is drawn as its mirror image in the real axis. Target: make z* = 2 − 3i.',
 'Argand diagram with z, z*, z + z* on the real axis and z − z* on the imaginary axis. Target: z + z* = 6 and z − z* = 4i.',
 'Argand diagram with z and a circle of radius |z|. zz* = a² + b² is shown. Target: find 3 lattice points with zz* = 25.',
 'Divide (5 + 5i) by (1 + 2i) in four taps: choose the multiplier, the new denominator, the new numerator and the answer.',
 'Argand diagram with z = 2 + 4i fixed. Drag w. The quotient z ÷ w is drawn live. Target: make z ÷ w = i.'];
const DONE=[
 'The conjugate flips only the sign of the imaginary part: z* = a − bi. On the Argand diagram it is the reflection of z in the real axis.',
 'z + z* = 2a is real and z − z* = 2bi is imaginary, so z = 3 + 2i.',
 'zz* = (a + bi)(a − bi) = a² + b² = |z|², always real and never negative. Every point on the circle of radius 5 gives 25.',
 'Multiply top and bottom by the conjugate of the denominator: the bottom becomes c² + d², a real number, and you divide both parts by it.',
 'z ÷ w = i when w = 4 − 2i: the moduli divide (|z| ÷ |w| = 1) and the arguments subtract (arg z − arg w = 90°).'];
const QS=[
 {q:'What is the conjugate of −3 + 7i?',a:'−3 − 7i',o:[['3 − 7i','neg'],['3 + 7i','neg']]},
 {q:'If z = 5 − 2i, what is zz*?',a:'29',o:[['21','sq'],['25 + 4i','sq']]},
 {q:'To work out (4 + i) ÷ (2 − 3i), multiply top and bottom by…',a:'2 + 3i',o:[['4 − i','num'],['2 − 3i','num']]},
 {q:'(10 − 5i) ÷ (2 + i) = ?',a:'3 − 4i',o:[['15 − 20i','den'],['5 − 5i','den']]},
 {q:'arg z = 100° and arg w = 30°. What is arg(z ÷ w)?',a:'70°',o:[['130°','arg'],['3⅓°','arg']]},
 {q:'Which is always real for any complex z?',a:'z + z*',o:[['z − z*','neg'],['z²','sq']]}];
return{T0,T1,K25,STAGES,ZQ,WANT,DESC,DONE,QS}})();
