/* Data for flagword100 (number words to 100, ages 6–7). Sources: DfE (2013) National Curriculum mathematics, Year 2
   number and place value ("read and write numbers to at least 100 in numerals and in words"; "recognise the place value
   of each digit in a two-digit number (tens, ones)"); DfE (2013) English Appendix 1 spelling; Oxford English Dictionary
   spellings forty, fifty, ninety; New Hart's Rules (OUP) for the hyphen in compound numbers twenty-one to ninety-nine.
   Slips it targets: teen words read as tens (fourteen for 40), spellings fourty, fivety and ninty, writing the tens
   word as a full number (sixty-two as 602), swapping the digits (62 as 26), a missing hyphen, and ordering words by
   length or first letter instead of by tens. */
const W100=(()=>{
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine'];
const TEENS=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
/* the standard written word for 0..100 */
function say(n){if(n===100)return'one hundred';if(n<10)return ONES[n];if(n<20)return TEENS[n-10];const t=Math.floor(n/10),o=n%10;return TENS[t]+(o?'-'+ONES[o]:'')}
/* scene 1: rods of ten, pick the tens word. Each round holds a teen trap and a spelling or ones trap */
const TENW=[{n:40,o:['fourteen','forty','fourty']},{n:20,o:['twelve','two','twenty']},{n:60,o:['sixty','sixteen','six']},
 {n:50,o:['fivety','fifty','fifteen']},{n:90,o:['nineteen','ninty','ninety']}];
/* why a wrong word card is wrong */
const FIX={fourteen:'Fourteen is 14: one ten and four ones. Whole tens end in -ty.',fourty:'Close! Forty has no u: f-o-r-t-y.',
 twelve:'Twelve is 12: one ten and two ones. Two tens is twenty.',two:'Two is just 2 ones. Two rods of ten make twenty.',
 sixteen:'Sixteen is 16: one ten and six ones. Six tens end in -ty: sixty.',six:'Six is just 6 ones. Six rods of ten make sixty.',
 fivety:'We say and write fifty, not fivety.',fifteen:'Fifteen is 15: one ten and five ones. Five tens is fifty.',
 nineteen:'Nineteen is 19: one ten and nine ones. Nine tens is ninety.',ninty:'Close! Ninety keeps the e from nine: n-i-n-e-t-y.'};
/* scene 2: join a tens word and a ones word with a hyphen */
const JOIN=[{n:57,t:['seventy','fifty','fifteen'],o:['seven','six','five']},{n:83,t:['eighty','thirty','eighteen'],o:['three','eight','two']},
 {n:24,t:['twelve','forty','twenty'],o:['two','four','five']},{n:61,t:['sixteen','ten','sixty'],o:['six','one','seven']}];
/* scene 3: read the word, build it with rods and cubes */
const BUILD=[62,45,70,38,100];
/* scene 4: tap the words from smallest to biggest */
const ORDER=[['forty-one','fourteen','fifty','forty'],['ninety','nineteen','sixty-nine','ninety-six']];
const VAL={'forty-one':41,fourteen:14,fifty:50,forty:40,ninety:90,nineteen:19,'sixty-nine':69,'ninety-six':96};
/* scene 5: a robot writes numbers in words */
const ROBOT=[{n:40,w:'fourty',ok:false,fix:'Forty has no u, even though four does: f-o-r-t-y.'},
 {n:73,w:'seventy-three',ok:true,fix:'Seventy is 7 tens, three is 3 ones, and a hyphen joins them.'},
 {n:80,w:'eighteen',ok:false,fix:'Eighteen is 18. 80 is eight tens: eighty.'},
 {n:64,w:'sixty four',ok:false,fix:'A hyphen joins the tens word and the ones word: sixty-four.'},
 {n:50,w:'fivety',ok:false,fix:'Five tens is fifty, not fivety.'},
 {n:100,w:'one hundred',ok:true,fix:'Ten tens make one hundred.'}];
const DESC=['Some rods of ten and three word cards. Tap the word for the number.',
 'A number made of rods and cubes. Tap a tens word, then a ones word.',
 'A number word at the top. Tap the tens pile to add a rod and the ones pile to add a cube.',
 'Four number words. Tap them from the smallest number to the biggest.',
 'A robot writes numbers in words. Buttons: Right or Slip.'];
const DONE=['Whole tens end in -ty: twenty, forty, fifty, sixty, ninety.',
 'Tens word, hyphen, ones word: fifty-seven.',
 'The tens word tells you the tens digit. The ones word tells you the ones digit.',
 'Look at the tens word first, not how long the word is.',
 'The robot slipped on spelling, a teen word and a hyphen.'];
const QS=[{q:'Which word is 40?',a:'forty',o:[['fourteen','teen'],['fourty','spell']]},
 {q:'How do you write sixty-two in numerals?',a:'62',o:[['602','place'],['26','swap']]},
 {q:'Which is 85 in words?',a:'eighty-five',o:[['fifty-eight','swap'],['eighty five','hyphen']]},
 {q:'Which number is seventeen?',a:'17',o:[['70','teen'],['71','swap']]},
 {q:'Which is more: nineteen or ninety?',a:'ninety',o:[['nineteen','teen'],['They are the same','same']]},
 {q:'How many tens are in fifty-three?',a:'5',o:[['3','swap'],['53','place']]}];
return{say,TENW,FIX,JOIN,BUILD,ORDER,VAL,ROBOT,DESC,DONE,QS}})();
