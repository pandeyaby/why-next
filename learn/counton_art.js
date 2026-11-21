/* Data for the counting-on flagship (flagcounton), ages 4–5. Each pair is [first number, how many more]. Sums stay
   within 10 and the added part is 1 to 4, the range where counting on is a sensible strategy. The jar hides the first
   group so it cannot be counted again; the track counts jumps, not squares. */
const CTON=(()=>{
const TIN=[[5,2],[4,3],[6,1]];
const TRACK=[[4,3],[6,2],[3,4]];
const BIG=[[2,6],[1,5],[3,7]];
const BUS=[[7,2],[5,3],[8,1]];
const FING=[[8,2],[5,3],[6,4]];
const WORD=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
const QS=[
 {q:'5 cars are in the jar. 2 more come. You say five, then…',a:'six, seven',o:[['five, six','from'],['one, two','all']]},
 {q:'The frog is on 4. It jumps 3. Where does it land?',a:'7',o:[['6','jump'],['3','all']]},
 {q:'To add 2 and 7, which number do you start from?',a:'7, the bigger one',o:[['2, the first one','small'],['1, always','all']]},
 {q:'Is 3 and 6 the same as 6 and 3?',a:'Yes, both make 9',o:[['No, 3 and 6 is less','turn'],['No, 6 and 3 is less','turn']]},
 {q:'7 people are on a bus. 2 more get on. How many now?',a:'9',o:[['8','from'],['2','all']]},
 {q:'You hold 8 in your head and add 2. How many fingers do you put up?',a:'2',o:[['8','fingers'],['10','fingers']]}];
return{TIN,TRACK,BIG,BUS,FING,WORD,QS}})();
