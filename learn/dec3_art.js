/* Data and screen-reader text for the three-decimal-place lab (flag_dec3.js; bundled in learn.js).
   Mathematics (National Curriculum in England, Year 5 number and place value / fractions including decimals: "solve
   problems involving number up to three decimal places"; Year 6 "solve problems which require answers to be rounded to
   specified degrees of accuracy"; NCETM Year 5 ready-to-progress 5NPV-1 and spine 2 "decimal place value"; CCSS 5.NBT.A.3
   and 5.NBT.B.7). One thousandth is 0.001 = 1/1000; 1 litre = 1,000 ml, so 0.375 l = 375 ml; 1 m = 1,000 mm. To add or
   subtract decimals, line up the decimal points so each digit sits in its own column (empty places count as 0), then work
   from the smallest place, exchanging ten of one place for one of the next. Pairs that make 1 have thousandths summing to
   10 and hundredths and tenths summing to 9 (0.375 + 0.625). Every amount below is stored in thousandths (whole numbers)
   so no rounding error can creep in. */
const D3ART=(()=>{
const f3=t=>(t/1000).toFixed(3);
/* jug rounds: target in thousandths of a litre, and the slip a child may build instead with what it says */
const JUG=[[375,{735:'That is 735 ml. Read 0.375 left to right: 3 tenths, 7 hundredths, 5 thousandths.',37:'That is only 37 ml, which is 0.037 l. You need 3 tenths, not 3 hundredths.'}],
 [208,{280:'That is 0.280 l = 280 ml. 0.208 has 0 hundredths: 2 tenths, 0 hundredths, 8 thousandths.',28:'That is 0.028 l = 28 ml. 0.208 starts with 2 tenths.'}]];
/* line-up rounds: [top, bottom] as strings */
const LINE=[['1.375','2.4'],['5.06','0.917']];
/* column sum: the three addends in thousandths and, for each column from the right, [choices, why each wrong choice is wrong] */
const SUM=[1234,567,2199];
const COLS=['thousandths','hundredths','tenths','ones'];
const PICK=[[['0','20','9'],{20:'You cannot write 20 in one column. 20 thousandths = 2 hundredths and 0 thousandths: write 0, exchange 2.',9:'4 + 7 + 9 = 20, not 9. Add the thousandths again.'}],
 [['0','8','2'],{8:'3 + 6 + 9 = 18, but you forgot the 2 hundredths exchanged from the thousandths: 18 + 2 = 20, so write 0 and exchange 2.',2:'That is the exchange, not the digit. 3 + 6 + 9 + 2 = 20: write 0, exchange 2 to the tenths.'}],
 [['0','8','10'],{8:'2 + 5 + 1 = 8, but add the 2 tenths you exchanged: 8 + 2 = 10, so write 0 and exchange 1.',10:'Only one digit fits in a column. 10 tenths = 1 one: write 0, exchange 1.'}],
 [['4','3','5'],{3:'1 + 0 + 2 = 3, but there is 1 one exchanged from the tenths: 3 + 1 = 4.',5:'1 + 0 + 2 + 1 = 4. Count the ones again.'}]];
/* tank: holds 5.000 l, has 2.375 l; jumps in thousandths */
const TANK={full:5000,has:2375},JUMPS=[1000,100,10,1];
/* pairs to 1: values in thousandths; partner of each */
const CARDS=[375,735,481,625,90,519,529,910],PAIRS=[[375,625],[481,519],[90,910]];
function pairWhy(a,b){const s=a+b,lo=Math.min(a,b),hi=Math.max(a,b);
 if(lo===375&&hi===735)return`0.375 + 0.735 = ${f3(s)}, not 1. The thousandths must make 10, but the tenths and hundredths only make 9, because the 1 you exchange fills them up.`;
 if(lo===481&&hi===529)return`0.481 + 0.529 = ${f3(s)}, a little over 1. Every pair of digits made 10, but only the thousandths should; the others need to make 9.`;
 if(hi===910&&lo!==90||lo===90&&hi!==910)return`${f3(a)} + ${f3(b)} = ${f3(s)}. Line up the points: 0.09 is 9 hundredths and 0 thousandths.`;
 return`${f3(a)} + ${f3(b)} = ${f3(s)}, ${s>1000?'more':'less'} than 1. Look for thousandths that make 10.`}
const QZ=[['What is 2.4 + 1.375?','3.775',[['1.399','right'],['3.715','carry']]],
 ['A bottle holds 1.5 l. 0.375 l is poured out. How much is left?','1.125 l',[['1.275 l','swap'],['1.875 l','addit']]],
 ['How many millilitres is 0.208 l?','208 ml',[['28 ml','zero'],['2,080 ml','times']]],
 ['Which number adds to 0.452 to make 1?','0.548',[['0.658','tens'],['0.547','nine']]],
 ['What is 4 − 1.625?','2.375',[['3.625','big'],['3.375','swap2']]],
 ['Which is the best estimate of 3.987 + 2.104?','6',[['5','est'],['60','est10']]]];
const WHY={right:'That lines the numbers up on the right, so 2.4 is treated as 0.024. Line up the points: 2.400 + 1.375.',carry:'3.715 mixes up the hundredths. In 2.400 + 1.375: 0 + 7 = 7 hundredths and 4 + 3 = 7 tenths, so 3.775.',
 swap:'Take away the smaller digit from the bigger in each column and you get the wrong answer. Write 1.500 − 0.375 and exchange: 1.125.',addit:'Poured out means take away, not add. 1.500 − 0.375 = 1.125.',
 zero:'0.208 has 2 tenths = 200 ml, then 0 hundredths and 8 thousandths: 208 ml.',times:'2,080 ml would be 2.08 l. There are 1,000 ml in a litre, so 0.208 l = 208 ml.',
 tens:'Every pair of digits making 10 overshoots. Thousandths make 10 (2 + 8), then hundredths and tenths make 9: 0.548.',nine:'0.452 + 0.547 = 0.999, one thousandth short. The thousandths must make 10, not 9: 2 + 8 = 10, so the last digit is 8.',
 big:'4 − 1.625 cannot be bigger than 4 − 1. Write 4.000 − 1.625 and exchange: 2.375.',swap2:'That takes away only 0.625 and forgets the 1 one. 4.000 − 1.625 = 2.375.',
 est:'3.987 is nearly 4 and 2.104 is about 2, so the total is about 6.',est10:'Both numbers are less than 5, so the total must be less than 10. About 4 + 2 = 6.'};
const H={jug:['Tap ▲ or ▼ in each column to pour the amount.','Poured exactly!'],line:['Drag the bottom number left or right to line up the points.','Points lined up!'],
 sum:['Add each column from the right. Tap the digit to write.','4.000 exactly!'],tank:['Tap jumps to count on from 2.375 to 5.','The tank is full!'],
 pairs:['Tap two cards that add to exactly 1.','3 pairs found!'],quiz:['Line up the points, fill gaps with 0, exchange tens.','']};
function say(k,S){let d='Challenge.';
 if(k==='jug'){const [t]=JUG[Math.min(S.r,1)];d=`Jug holds ${f3(S.v)} litres, which is ${S.v} millilitres. Target ${f3(t)} litres.`}
 if(k==='line'){const [a,b]=LINE[Math.min(S.r,1)];d=S.off===0?`${b} is lined up under ${a} with the points in one column.`:`${b} is shifted ${Math.abs(S.off)} place${Math.abs(S.off)>1?'s':''} to the ${S.off>0?'right':'left'}, so the points are not lined up.`}
 if(k==='sum')d=`Adding 1.234 + 0.567 + 2.199. Done ${S.col} of 4 columns. Answer so far: ${S.dig.length?S.dig.slice().reverse().join(' '):'none'}. Exchanged into the next column: ${S.carry}.`;
 if(k==='tank')d=`Tank holds 5 litres and has ${f3(TANK.has+S.add)} litres. Counted on ${f3(S.add)} litres so far.`;
 if(k==='pairs')d=`Cards: ${CARDS.filter(x=>!S.got.includes(x)).map(f3).join(', ')}. ${S.pick!=null?'Picked '+f3(S.pick)+'. ':''}${S.got.length/2} of 3 pairs found.`;
 return d}
return {f3,JUG,LINE,SUM,COLS,PICK,TANK,JUMPS,CARDS,PAIRS,pairWhy,QZ,WHY,H,say}})();
