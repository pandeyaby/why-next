/* Data for flagorrule (mutually exclusive events and the OR rule; ages 13-15): twenty counters and eight events, six
   pairs of events to sort, the Venn counters, step text and the challenge. Sources: DfE KS3 programme of study 2013
   (probability); DfE GCSE mathematics subject content 2013 (addition rule, Venn diagrams); AQA 8300 and Edexcel 1MA1. */
const ORR=(()=>{
const N=20,ALL=Array.from({length:N},(_,i)=>i+1);
const prime=n=>n>1&&[2,3,5,7,11,13,17,19].includes(n);
const EV={even:['Even',n=>n%2===0],odd:['Odd',n=>n%2===1],m5:['Multiple of 5',n=>n%5===0],lt4:['Less than 4',n=>n<4],m3:['Multiple of 3',n=>n%3===0],
 gt15:['More than 15',n=>n>15],prime:['Prime',prime],sq:['Square number',n=>[1,4,9,16].includes(n)]};
const KEYS=Object.keys(EV);
/* step 1: pairs. me = 1 mutually exclusive; why = the outcome both share, or why none */
const PAIRS=[{t:'Dice: roll a 2 / roll a 5',me:1,why:'One roll shows one number, so a 2 and a 5 cannot both happen.'},
 {t:'Dice: roll an even number / roll a 6',me:0,why:'A 6 is even, so rolling a 6 makes both happen at once.'},
 {t:'Card: a king / a heart',me:0,why:'The king of hearts is both a king and a heart.'},
 {t:'Card: a red card / a club',me:1,why:'Clubs are black, so no card is red and a club.'},
 {t:'Tomorrow: rain / sunshine',me:0,why:'One day can have rain and sunshine, so both can happen.'},
 {t:'Spinner: lands on red / lands on blue',me:1,why:'The arrow stops on one colour, so not both.'}];
/* step 4: Venn counters, with even (A) and multiple of 5 (B) */
const VENN=[10,15,8,7,20,5];
const zone=n=>(EV.even[1](n)?1:0)+(EV.m5[1](n)?2:0);/* 0 neither, 1 A only, 2 B only, 3 both */
const ZN=['Neither','Even only','Multiple of 5 only','Both'];
const DESC=['One pair of events at a time and two boxes: Mutually exclusive, and Can happen together. Drag the card to a box, or use the buttons.',
 'Twenty counters numbered 1 to 20. Blue rings mark multiples of 5, orange rings mark numbers less than 4. Tap every counter that is one or the other.',
 'Twenty counters. Blue rings mark even numbers, orange rings mark multiples of 5. Tap every counter that is even or a multiple of 5.',
 'A Venn diagram: a box with an Even circle and a Multiple of 5 circle that overlap. Drag each counter into the right part, or use the buttons.',
 'Twenty counters and a list of events. Choose event A and event B to see their probabilities.'];
const TXT=['Mutually exclusive means the two events cannot happen at the same time.','No counter is in both events. Count the OR.','Now some counters are in both. Count the OR.','Find the overlap with a Venn diagram.','Try any two events.'];
const DONE=['Mutually exclusive: no single outcome is in both events. A shared outcome (the 6, the king of hearts) means they are not.',
 'P(multiple of 5 or less than 4) = 7/20 = 4/20 + 3/20. With no overlap, add.',
 'P(even or multiple of 5) = 12/20, not 10/20 + 4/20 = 14/20. 10 and 20 were counted twice.',
 'P(A or B) = P(A) + P(B) − P(A and B) = 10/20 + 4/20 − 2/20 = 12/20. Take the overlap off once.',
 'Adding P(A) + P(B) works only when P(A and B) = 0, that is, when A and B are mutually exclusive.'];
const QS=[{q:'One card from a pack of 52. P(king or heart)?',a:'16/52',o:[['17/52','twice'],['4/52 × 13/52','mult']]},
 {q:'One fair dice. P(1 or 6)?',a:'2/6',o:[['1/36','mult'],['1/6','one']]},
 {q:'One fair dice. Are "even" and "a 3" mutually exclusive?',a:'Yes: 3 is not even',o:[['No: they are on the same dice','same'],['No: both are numbers under 6','same']]},
 {q:'Counters 1 to 20. P(even or more than 15)?',a:'12/20',o:[['15/20','twice'],['50/400','mult']]},
 {q:'A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.5. P(A or B)?',a:'0.8',o:[['0.15','mult'],['0.2','sub']]},
 {q:'Spinner: P(red) = 0.25, P(blue) = 0.35, the rest is green. P(red or blue)?',a:'0.6',o:[['0.4','comp'],['0.0875','mult']]},
 {q:'Counters 1 to 20. Are "prime" and "even" mutually exclusive?',a:'No: 2 is prime and even',o:[['Yes: primes are odd','same'],['Yes: they are different events','same']]}];
return{N,ALL,EV,KEYS,PAIRS,VENN,zone,ZN,DESC,TXT,DONE,QS}})();
