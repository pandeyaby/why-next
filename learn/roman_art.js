/* Data for the Roman numerals lab (flag_roman.js; bundled in learn.js so the lab file stays small).
   Rules (National Curriculum in England, Year 4: read Roman numerals to 100, I to C): I = 1, V = 5, X = 10, L = 50, C = 100.
   Symbols are added from the biggest down. A smaller symbol just before a bigger one is taken away, but only in six pairs
   used today (IV 4, IX 9, XL 40, XC 90, CD 400, CM 900); to 100 that means IV, IX, XL and XC. The same symbol is not
   written more than three times in a row, and V and L are never doubled. There is no symbol for zero. */
const ROMANART=(()=>{
const SYM=[['I',1,'#dbeafe'],['V',5,'#dcfce7'],['X',10,'#fef3c7'],['L',50,'#fce7f3'],['C',100,'#ede9fe']];
/* builder targets per step: [targets] */
const ADD=[7,15,32],SUB=[4,9,40],TWO=[49,64,99];
/* reading rounds: [numeral, right value, [wrong value, tag]...] */
const READ=[['XIV',14,[[16,'add'],[114,'digits']]],['XLIX',49,[[71,'add'],[51,'order']]],['XCIV',94,[[116,'add'],[96,'flip']]]];
const KIDS=[['To write 40…',[['Ada','writes XXXX.','Only three of the same symbol go in a row. 40 is 10 less than 50: XL.'],['Ben','writes XL.',''],['Cy','writes LX.','LX is 50 + 10 = 60. For 40 the small X goes before the L.']]],
 ['To write 99…',[['Dee','writes IC.','I can only go before V and X. 99 is 90 + 9: XC then IX, so XCIX.'],['Eve','writes XCIX.',''],['Finn','writes LXXXXVIIII.','That adds up to 99, but it breaks the three-in-a-row rule twice. Use XC and IX.']]],
 ['To read XIX…',[['Gil','says 21.','The I is before the X, so it is taken away: X + IX = 10 + 9 = 19.'],['Hal','says 19.',''],['Ivy','says 12.','XIX is not X, I, X added as 10, 1 and 1. It is X then IX: 19.']]]];
const QZ=[['What is XVI?','16',[['14','sub'],['61','digits']]],
 ['What is XL?','40',[['60','add'],['30','sub3']]],
 ['How do you write 9?','IX',[['VIIII','four'],['XI','flip']]],
 ['How do you write 50?','L',[['VX','pair'],['XXXXX','four']]],
 ['What is LXXIV?','74',[['76','add'],['66','sub']]],
 ['How do you write 45?','XLV',[['VL','pair'],['XXXXV','four']]],
 ['How do you write 90?','XC',[['LXXXX','four'],['CX','flip']]],
 ['How do you write 0?','There is no Roman numeral for 0',[['O','zero'],['N','zero']]]];
const WHY={add:'A small symbol before a bigger one is taken away, not added: IV is 4, XL is 40.',
 digits:'Roman numerals are not digits in columns. Add the values of the symbols from left to right.',
 sub:'Small after big means add: VI is 6, XV is 15. Only small before big is taken away.',
 sub3:'XL is one X taken from L: 50 − 10 = 40.',
 four:'The same symbol only goes three times in a row. Use the pair: 4 is IV, 9 is IX, 40 is XL.',
 flip:'Order matters. The smaller symbol goes first only when it is taken away: IX is 9, XI is 11.',
 pair:'Only I goes before V or X, and only X goes before L or C. A V is never taken away.',
 zero:'The Romans had no symbol for zero. They did not need one, because they did not use place value.',
 order:'Read XLIX as XL then IX: 40 + 9 = 49.'};
return {SYM,ADD,SUB,TWO,READ,KIDS,QZ,WHY}})();
