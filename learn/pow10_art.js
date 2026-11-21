/* Data for flagpow10 (Patterns with powers of ten, ages 10–11). Sources: Common Core State Standards for Mathematics,
   Grade 5 5.NBT.A.1 and 5.NBT.A.2 ("explain patterns in the number of zeros of the product when multiplying a number by
   powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a
   power of 10. Use whole-number exponents to denote powers of 10"); DfE (2013) National Curriculum mathematics, Year 5
   ("multiply and divide whole numbers and those involving decimals by 10, 100 and 1000"; cube notation ³); NCETM Year 5
   and 6 guidance on the "digits move, the point stays" model. Numbers are kept as a digit string d and a power k
   (value = d × 10^k) so every shift is exact. Slips it targets: 10³ read as 30 or 103, "add two zeros" giving
   3.4 × 100 = 3.400, counting zeros in the answer to find the power, and shifting the wrong way when dividing. */
const PTN=(()=>{
/* '3.4' -> {d:'34',k:-1}; '1200' -> {d:'12',k:2} */
function parse(s){let [a,b='']=s.split('.');let d=(a+b).replace(/^0+/,''),k=-b.length;while(d.length>1&&d.endsWith('0')){d=d.slice(0,-1);k++}return{d:d||'0',k}}
function commas(s){return s.replace(/\B(?=(\d{3})+(?!\d))/g,',')}
/* the usual way to write d × 10^k */
function show(n){const {d,k}=n;if(k>=0)return commas(d+'0'.repeat(k));const p=d.padStart(-k+1,'0'),i=p.length+k;return commas(p.slice(0,i))+'.'+p.slice(i)}
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';const pow=e=>'10'+String(e).split('').map(x=>SUP[+x]).join('');
/* place-value columns, biggest first: power of ten and short heading */
const COLS=[[6,'M'],[5,'HTh'],[4,'TTh'],[3,'Th'],[2,'H'],[1,'T'],[0,'O'],[-1,'t'],[-2,'h'],[-3,'th']];
const STACK=[2,4,6];
const TIMES=[{n:'3.4',e:2},{n:'47',e:3},{n:'2.56',e:3},{n:'0.8',e:1}];
const DIV=[{n:'560',e:2},{n:'7',e:3},{n:'45.2',e:1},{n:'1200',e:3}];
/* which power: from a to b by multiplying (m) or dividing (d) */
const WHICH=[{a:'3.7',b:'3700',op:'×',e:3},{a:'52',b:'0.52',op:'÷',e:2},{a:'0.06',b:'60',op:'×',e:3},{a:'1.25',b:'12500',op:'×',e:4}];
const ROBOT=[{s:'10⁴ = 40',ok:false,fix:'The small 4 counts tens multiplied together: 10 × 10 × 10 × 10 = 10,000.'},
 {s:'2.5 × 10² = 250',ok:true,fix:'× 10² moves each digit 2 places left: 2.5 becomes 250.'},
 {s:'4.6 × 10 = 4.60',ok:false,fix:'Adding a zero after the decimal does not change the value. The digits move 1 place left: 46.'},
 {s:'10⁵ = 100,000',ok:true,fix:'Five tens multiplied together: a 1 followed by 5 zeros.'},
 {s:'8 ÷ 10² = 800',ok:false,fix:'Dividing makes the number smaller. The digit moves 2 places right: 0.08.'},
 {s:'0.3 × 10³ = 300',ok:true,fix:'The 3 moves 3 places left, from tenths to hundreds: 300.'}];
const DESC=['A place-value chart with a 1 in the ones column. Tap × 10 or ÷ 10 to make the power of ten shown.',
 'A place-value chart with a number in it. Drag the digits left, or use the buttons, to multiply by the power of ten.',
 'A place-value chart with a number in it. Drag the digits right, or use the buttons, to divide by the power of ten.',
 'A start number and an end number. Tap the power of ten that turns one into the other.',
 'A robot says six facts about powers of ten. Buttons: Right or Slip.'];
const DONE=['10ⁿ is n tens multiplied together: a 1 followed by n zeros.',
 'Multiplying by 10ⁿ moves every digit n places left. The decimal point stays put.',
 'Dividing by 10ⁿ moves every digit n places right, so the number gets smaller.',
 'Count how many places the digits moved, not how many zeros the answer has.',
 'You caught the robot: 10⁴ is not 40, and adding a zero after a decimal changes nothing.'];
const QS=[{q:'What is 10³?',a:'1000',o:[['30','times'],['103','join']]},
 {q:'What is 3.4 × 10²?',a:'340',o:[['3.400','zeros'],['34','fewer']]},
 {q:'What is 56 ÷ 10²?',a:'0.56',o:[['5600','way'],['5.6','fewer']]},
 {q:'2.56 × 10ⁿ = 2560. What is n?',a:'n = 3',o:[['n = 1','count'],['n = 2','fewer']]},
 {q:'How many zeros does 10⁶ have when written out?',a:'6',o:[['7','extra'],['60','times']]},
 {q:'What is 7 ÷ 10³?',a:'0.007',o:[['7000','way'],['0.07','fewer']]}];
return{parse,show,commas,pow,COLS,STACK,TIMES,DIV,WHICH,ROBOT,DESC,DONE,QS}})();
