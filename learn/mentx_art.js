/* Data and screen-reader text for the mental multiplication and division lab (flag_mentx.js; bundled in learn.js).
   Maths (National Curriculum in England, Year 4 Multiplication and division: "use place value, known and derived facts
   to multiply and divide mentally, including: multiplying by 0 and 1; dividing by 1; multiplying together three
   numbers"; NCETM Year 4 spine 2, multiplication and division): 40 × 6 is 6 groups of 4 tens = 24 tens = 240, so a
   tens fact is ten times the known fact; any number × 0 = 0, × 1 or ÷ 1 leaves it the same; three numbers can be
   multiplied in any order (associative and commutative laws), so pick the pair that makes 10 or 20 first; 240 ÷ 6 is
   24 tens shared into 6 groups = 4 tens = 40. */
const MXART=(()=>{
/* tens rounds: [tens in each row, rows] -> 40 × 6, 30 × 7, 60 × 5 */
const TENS=[[4,6],[3,7],[6,5]];
/* sort cards: [card, bin (0: answer is 0, 1: answer is the number itself), value] */
const CARDS=[['9 × 0',0,0],['1 × 9',1,9],['9 ÷ 1',1,9],['0 × 6',0,0],['6 × 1',1,6],['7 ÷ 1',1,7]];
const BINS=['= 0','Stays the same'];
const CARDW={'9 × 0':'9 × 0 means 9 groups of nothing. That is 0, not 9.','1 × 9':'1 group of 9 is 9. Times 1 keeps the number the same.',
 '9 ÷ 1':'Share 9 into 1 group and that group gets all 9. So 9 ÷ 1 = 9, not 1 or 0.','0 × 6':'0 groups of 6 is nothing at all, so 0 × 6 = 0.',
 '6 × 1':'6 groups of 1 is 6. Times 1 keeps the number the same.','7 ÷ 1':'Share 7 into 1 group and it gets all 7. Dividing by 1 keeps the number.'};
/* three-number rounds: only one pair makes a multiple of 10 */
const TRI=[[2,7,5],[5,9,2],[4,3,5]];
/* sharing rounds: [tens to share, groups] -> 240 ÷ 6, 350 ÷ 7 */
const SHARE=[[24,6],[35,7]];
const KIDS=[['30 × 8 = ?',[['Ann','24, because 3 × 8 = 24.','Ann forgot the tens. 30 is 3 tens, so 30 × 8 = 24 tens = 240.'],['Ben','240.',''],['Col','2400. I put two zeros on.','Only 30 has a ten in it, so put one zero on 24: 240.']]],
 ['7 × 0 = ?',[['Dee','7. Times 0 changes nothing.','That is true for + 0, not × 0. 7 groups of nothing is 0.'],['Eve','0.',''],['Fin','70. I put a 0 on the end.','Putting a 0 on the end is × 10. 7 × 0 = 0.']]],
 ['5 × 9 × 2 = ?',[['Gia','90. 5 × 2 = 10, then 10 × 9.',''],['Hal','16. 5 + 9 + 2.','Hal added. The sign is ×, so multiply: 5 × 2 = 10, then 10 × 9 = 90.'],['Ida','10. 5 × 2 = 10.','Ida stopped too soon. She still has to multiply by 9: 10 × 9 = 90.']]]];
const QZ=[['50 × 3 = ?','150',[['15','tens'],['1500','zeros']]],['9 × 1 = ?','9',[['1','one'],['10','plus1']]],['6 × 0 = ?','0',[['6','plus0'],['60','tack']]],
 ['480 ÷ 6 = ?','80',[['8','tensd'],['800','zerosd']]],['4 × 7 × 5 = ?','140',[['16','addall'],['20','drop']]],['8 ÷ 1 = ?','8',[['1','div1'],['0','zero1']]]];
const WHY={tens:'That forgot the tens. 50 is 5 tens, so 50 × 3 = 15 tens = 150.',zeros:'Too many zeros. Only one number had a ten in it, so add one zero to 15.',
 one:'Times 1 keeps the number the same: 1 group of 9 is 9.',plus1:'That is 9 + 1. Times 1 keeps the number the same, so 9 × 1 = 9.',
 plus0:'That works for + 0, not × 0. 6 groups of nothing is 0.',tack:'Writing a 0 on the end is × 10, not × 0. Anything × 0 = 0.',
 tensd:'48 ÷ 6 = 8, but 480 is 48 tens, so the answer is 8 tens = 80.',zerosd:'Too big: 800 × 6 = 4800. 480 is 48 tens, and 48 tens ÷ 6 = 8 tens = 80.',
 addall:'That adds the numbers. Multiply: 4 × 5 = 20, then 20 × 7 = 140.',drop:'4 × 5 = 20 is the easy pair, but you still need × 7: 20 × 7 = 140.',
 div1:'Sharing 8 into 1 group puts all 8 in it, so 8 ÷ 1 = 8.',zero1:'Only × 0 makes 0. Dividing by 1 keeps the number: 8 ÷ 1 = 8.'};
const H={tens:['Drag the orange dot down to add rows of tens.','Tens facts done.'],zero:['Drag each card into a box, or tap a card then a box.','All 6 sorted.'],
 pair:['Drag one card onto another to multiply that pair first.','Easy pairs found.'],share:['Tap the pile to give each bowl one ten.','Shared fairly.'],
 kids:['Who is right? Tap them.','Facts checked.'],quiz:['Use tens, × 0, × 1 and easy pairs.','']};
function say(k,S){let d='Challenge.';
 if(k==='tens'){const [a,n]=TENS[Math.min(S.k,2)];d=S.won?'All three tens facts answered.':`Question ${a*10} × ${n}. ${S.rows} row${S.rows>1?'s':''} of ${a} tens counters, ${S.rows*a} tens in all.${S.rows===n?' Pick the answer.':''}`}
 if(k==='zero')d=S.won?'All six cards sorted.':'Boxes: = 0 and stays the same. Cards left: '+CARDS.filter((c,i)=>S.placed[i]==null).map(c=>c[0]).join(', ')+'.'+(S.sel!=null?' Holding '+CARDS[S.sel][0]+'.':'');
 if(k==='pair'){const t=TRI[Math.min(S.k,2)];d=S.won?'Three easy pairs found.':`Cards ${t.join(', ')}. Multiply all three. Pick a pair to do first.`+(S.sel!=null?' Picked '+t[S.sel]+'.':'')}
 if(k==='share'){const [t,n]=SHARE[Math.min(S.k,1)];d=S.won?'Both shared fairly.':`${t*10} ÷ ${n}: ${S.left} tens left in the pile, ${n} bowls with ${S.each} ten${S.each===1?'':'s'} each.`}
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {TENS,CARDS,BINS,CARDW,TRI,SHARE,KIDS,QZ,WHY,H,say}})();
