/* Data for the complex-roots lab (flag_cxroot.js; bundled in the main learn.js like teeth_art.js so the lab file stays small).
   ROOTS: [√(−n) to simplify, answer, wrongs [text, why]]. SOLVE: worked solutions, each stage [right line, wrong lines [text, why]].
   PAIRS: target quadratics x² + bx + c for the conjugate drag [b, c, root p, root q]. VERTEX: parabolas (x − p)² + k with root cards. */
const CXART={
ROOTS:[[9,'3i',[['−3','(−3)² = +9, not −9. No real number squares to a negative.'],['9i','Take the square root of the 9 as well: √9 = 3.']]],
 [16,'4i',[['−4i','√ means the principal root, 4i. The ± comes from the formula, not from √.'],['4','4² = 16, not −16. You need the i.']]],
 [36,'6i',[['6','6² = 36, not −36. You need the i.'],['18i','√36 = 6, not 36 ÷ 2.']]]],
SOLVE:[{eq:'x² + 2x + 5 = 0',st:[['b² − 4ac = 4 − 20 = −16',[['b² − 4ac = 4 + 20 = 24','4ac = 4 × 1 × 5 = 20, and you subtract it.'],['b² − 4ac = −4 − 20 = −24','b² = 2² = +4. A square is never negative.']]],
  ['√(−16) = 4i',[['√(−16) = −4','No real number squares to −16. Use i: √16 × √(−1).'],['√(−16) = 16i','√16 = 4.']]],
  ['x = (−2 ± 4i) ÷ 2',[['x = (2 ± 4i) ÷ 2','The formula starts with −b, and b = 2.'],['x = −2 ± 4i ÷ 2','Divide the whole top line by 2a, not just the i part.']]],
  ['x = −1 ± 2i',[['x = −1 ± 4i','Divide the imaginary part by 2 as well: 4i ÷ 2 = 2i.'],['x = −2 ± 2i','Divide the real part too: −2 ÷ 2 = −1.']]]]},
 {eq:'x² − 4x + 13 = 0',st:[['b² − 4ac = 16 − 52 = −36',[['b² − 4ac = −16 − 52 = −68','(−4)² = +16.'],['b² − 4ac = 16 + 52 = 68','Subtract 4ac: 16 − 52.']]],
  ['√(−36) = 6i',[['√(−36) = −6','No real square is negative. √(−36) = 6i.'],['√(−36) = 18i','√36 = 6.']]],
  ['x = (4 ± 6i) ÷ 2',[['x = (−4 ± 6i) ÷ 2','b = −4, so −b = +4.'],['x = (4 ± 6i) ÷ 1','2a = 2 × 1 = 2.']]],
  ['x = 2 ± 3i',[['x = 2 ± 6i','6i ÷ 2 = 3i.'],['x = 4 ± 3i','4 ÷ 2 = 2.']]]]}],
PAIRS:[[-6,13,3,2],[4,8,-2,2],[0,9,0,3]],
VERTEX:[{p:1,k:4,ans:'1 ± 2i',w:[['1 ± 4i','The 4 is the height of the vertex. The imaginary part is √4 = 2.'],['−1 ± 2i','The vertex is at x = 1, so the real part is +1.']]},
 {p:-2,k:1,ans:'−2 ± i',w:[['2 ± i','The vertex is at x = −2, so the real part is −2.'],['−2 ± 1','±1 would be real roots, and this curve never meets the x-axis.']]},
 {p:3,k:9,ans:'3 ± 3i',w:[['3 ± 9i','√9 = 3, not 9.'],['−3 ± 3i','The vertex is at x = +3.']]}],
bank:[['What is √(−25)?','5i',[['−5','real'],['25i','sqrt']]],
 ['One root of a quadratic with real coefficients is 4 − i. What is the other?','4 + i',[['−4 − i','negall'],['−4 + i','negre']]],
 ['What is i²?','−1',[['1','isq'],['i','isq']]],
 ['Solve x² + 9 = 0.','x = ±3i',[['x = ±3','real'],['No solutions at all','nosol']]],
 ['x² + 6x + 10 = 0 has roots −3 ± i. What is the sum of the roots?','−6',[['6','sign'],['−6 + 2i','sumi']]],
 ['b² − 4ac = −20. How many real roots?','None: two complex roots',[['Two real roots','disc'],['One repeated root','disc']]]],
WHYM:{real:'No real number squares to a negative. √(−n) = √n × i.',sqrt:'Take the square root of the number part too: √25 = 5.',negall:'Only the sign of the imaginary part flips: the conjugate of 4 − i is 4 + i.',
 negre:'The real part stays the same. Only the i part changes sign.',isq:'i is defined so that i² = −1.',nosol:'There are no real solutions, but there are two complex ones: ±3i.',
 sign:'The sum is −b/a = −6. The i parts cancel: (−3 + i) + (−3 − i) = −6.',sumi:'Conjugate i parts cancel when you add, so the sum is real: −6.',disc:'A negative discriminant means no real roots: there are two complex conjugate roots.'}};
