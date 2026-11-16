/* Data for the complex number system lab (flag_cplx.js; bundled in the main learn.js so the lab file stays small).
   CCSS N-CN.1 (know there is a complex number i such that i² = −1, and every complex number has the form a + bi with a and b
   real); AQA/Edexcel AS Further Maths: real and imaginary parts, Re(z) and Im(z), equating real and imaginary parts.
   PLOT: [label, a, b]. SETS: [number, 0 real / 1 purely imaginary / 2 neither, why]. SOLVE: [left, right, x, y, real-part
   equation, imaginary-part equation, f(x,y) left real, left imag, right real, right imag]. FORM: [expression, a + bi,
   [[wrong, tag]]]. SAME: [z, w, 1 equal / 0 not, why]. */
const CPLXART={
PLOT:[['3 + 2i',3,2],['−2 + 4i',-2,4],['5',5,0],['−3i',0,-3]],
SETS:[['7',0,'7 = 7 + 0i. The imaginary part is 0, so it is real.'],['−3i',1,'−3i = 0 − 3i. Real part 0, imaginary part −3: purely imaginary.'],
 ['2 + i',2,'Real part 2 and imaginary part 1 are both non-zero: neither real nor purely imaginary, but still complex.'],
 ['i²',0,'i² = −1, which is real. Squaring i takes you back to the real line.'],['√(−9)',1,'√(−9) = √9 × √(−1) = 3i: purely imaginary.'],
 ['π',0,'π is irrational, but it is still real: π + 0i.'],['4 − i',2,'Real part 4, imaginary part −1. Both non-zero.'],['(1 + i) − i',0,'The i terms cancel: (1 + i) − i = 1, a real number.']],
SETBOX:['Real (b = 0)','Purely imaginary (a = 0, b ≠ 0)','Neither (a ≠ 0, b ≠ 0)'],
SOLVE:[['3 + yi','x − 2i',3,-2,'x = 3','y = −2'],['2x + (y − 1)i','8 + 5i',4,6,'2x = 8','y − 1 = 5'],['(x + y) + (x − y)i','6 + 2i',4,2,'x + y = 6','x − y = 2']],
FORM:[['5i + 2','2 + 5i',[['5 + 2i','swap'],['7i','add']]],['3 + i²','2',[['3 + i','sq'],['4','sq']]],
 ['√(−16) − 1','−1 + 4i',[['−1 − 4i','root'],['15','root']]],['(4 + 3i) − 3i','4',[['4 + 6i','sub'],['1 + 3i','sub']]]],
SAME:[['2 + 3i','3 + 2i',0,'Real parts 2 and 3 differ, and imaginary parts 3 and 2 differ. Order matters.'],['4 + 0i','4',1,'4 + 0i is just 4: same real part, imaginary parts both 0.'],
 ['√(−25)','5i',1,'√(−25) = √25 × i = 5i. Same real part (0) and imaginary part (5).'],['i²','1',0,'i² = −1, not 1. Real parts −1 and 1 differ.'],
 ['(1 + i) + (1 − i)','2',1,'Real parts add to 2, imaginary parts cancel to 0: exactly 2.'],['3 − 2i','3 + 2i',0,'Real parts match, but imaginary parts −2 and 2 do not. Both must match.']],
BANK:[['What is Im(6 − 5i)?','−5',[['−5i','imi'],['6','swap']]],
 ['Is 8 a complex number?','Yes: 8 = 8 + 0i',[['No, it has no i','noi'],['Only if it is negative','neg']]],
 ['a + 3i = 7 + bi, with a and b real. Find a and b.','a = 7, b = 3',[['a = 3, b = 7','swap'],['a + b = 10, so not enough information','one']]],
 ['Which number is purely imaginary?','−4i',[['−4','real'],['1 − 4i','both']]],
 ['What is i²?','−1',[['1','sq'],['i','sq']]],
 ['2 + 5i = 2 + 3i?','Not equal: imaginary parts differ',[['Equal: real parts match','half'],['Equal: both are complex','half']]]],
WHY:{imi:'Im(z) is the real number b in a + bi. For 6 − 5i it is −5, without the i.',swap:'The real part comes first and has no i. The imaginary part is the number in front of i.',
 noi:'Every real number a is a + 0i, so the real numbers sit inside the complex numbers.',neg:'Sign does not matter. Any real number a is a + 0i.',
 one:'Equal complex numbers have equal real parts and equal imaginary parts. That gives two equations, so both unknowns.',
 real:'−4 has imaginary part 0, so it is real.',both:'1 − 4i has a non-zero real part, so it is not purely imaginary.',
 sq:'i² = −1 by definition. Replace i² with −1, then collect the real parts.',half:'Both parts must match. Matching only the real parts is not enough.',
 add:'2 and 5i cannot be combined into 7i: a real part and an imaginary part stay separate.',root:'√(−16) = √16 × √(−1) = 4i, a positive multiple of i.',
 sub:'Subtract imaginary parts from imaginary parts: 3i − 3i = 0, so only the real part 4 is left.'}};
