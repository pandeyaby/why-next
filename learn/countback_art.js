/* Data for flagcountback (counting back to subtract, ages 4–5). Sources: DfE National Curriculum 2013 Year 1
   ("subtract one-digit numbers to 20, including zero"; "represent and use number bonds and related subtraction facts");
   Development Matters 2021 Reception ("one more than / one less than"); NCETM Mastering Number; Carpenter and Moser
   1984 and Fuson 1992 on count-back strategies. Slips it targets: saying the start number as the first count back
   (7 − 3: "7, 6, 5", answer 5), counting on instead of back, starting on the part taken away instead of the whole,
   recounting from 1, and checking a take-away by counting back again instead of counting on. */
const CBK=(()=>{
const HOPS=[[7,3],[9,2]];
const STORIES=[{whole:10,take:2,t:'10 birds sit on a wire. 2 fly away.',who:'birds'},{whole:6,take:3,t:'6 bees sit on a flower. 3 buzz off.',who:'bees'}];
const BOX={whole:8,take:3};
const ROBOT=[{s:'8 − 3',said:[8,7,6],ok:false,fix:'It said 8 as a hop. Start on 8, then hop: 7, 6, 5. The answer is 5.'},
 {s:'6 − 2',said:[5,4],ok:true,fix:'6 … 5, 4. Two hops back, so 6 − 2 = 4.'},
 {s:'9 − 1',said:[10],ok:false,fix:'It counted on. Take away goes back: 9 … 8. The answer is 8.'},
 {s:'5 − 3',said:[4,3,2],ok:true,fix:'5 … 4, 3, 2. Three hops back, so 5 − 3 = 2.'}];
const CHECKS=[{whole:9,take:3,claim:6},{whole:7,take:2,claim:6},{whole:10,take:3,claim:8}];
const DESC=[
 'A number track from 1 to 10. A frog sits on 7. Take away 3 by hopping back.',
 'A number track from 1 to 10 and a story: 10 birds sit on a wire, 2 fly away.',
 'A closed box with 8 cakes inside. Number keys 4 to 8 below.',
 'A robot counts back to work out 8 take away 3. Buttons: Right or Slip.',
 'A number track from 1 to 12. Check 9 take away 3 equals 6 by counting on from 6.'];
const DONE=[
 '7 … 6, 5, 4 and 9 … 8, 7. Start on the big number, then say one number for each hop back.',
 'Start on the whole: 10 … 9, 8 and 6 … 5, 4, 3. The number taken away tells you how many hops.',
 'The lid stayed shut: 8 … 7, 6, 5. You did not need to count all the cakes from 1.',
 'The robot slipped twice: once it said the start number as a hop, once it counted on.',
 'Counting on from the answer should land on the start number. 6 checks, but the two 6 and 8 answers were start-number slips.'];
const QS=[
 {q:'9 take away 2. Which numbers do you say as you count back?',a:'8, 7',o:[['9, 8','start'],['10, 11','on']]},
 {q:'7 − 3 = ?',a:'4',o:[['5','start'],['10','on']]},
 {q:'There are 10 apples. You eat 3. Where do you start counting back?',a:'On 10',o:[['On 3','part'],['On 1','one']]},
 {q:'Mia works out 6 − 2 by saying "6, 5. So 5." Is she right?',a:'No, she said 6 as a hop',o:[['Yes, 5 is right','start'],['No, she should count on','on']]},
 {q:'8 − 2 = 6. How can you check it?',a:'Count on 2 from 6',o:[['Count back 2 from 6','checkback'],['Count all 8 from 1','one']]},
 {q:'5 − 1 = ?',a:'4',o:[['5','start'],['6','on']]}];
return{HOPS,STORIES,BOX,ROBOT,CHECKS,DESC,DONE,QS}})();
