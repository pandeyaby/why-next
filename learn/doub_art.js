/* Data for the doubles-to-double-5 flagship (flagdoubles), ages 4–5. A double is two equal groups: the same number
   twice. Ladybird wings, a mirror, dominoes, two hands of fingers and the facts double 1 to double 5 (2, 4, 6, 8, 10).
   Slips it targets: adding 2 instead of doubling, adding 1, counting one group only, calling any two groups a double,
   and writing the digit twice (double 5 is not 55). */
const DUB=(()=>{
const WING=[3,5,2];
const SPOT=[[.5,-.42],[.58,.08],[.42,.5],[.22,-.12],[.24,.3],[.78,-.18]];
const MIR=[4,2,5];
const DOM=[[3,3],[4,1],[2,2],[5,4],[1,1],[3,2]];
const SIDES=[['🟰','Double'],['❌','Not a double']];
const HANDS=[2,4,5];
const FACTS=[1,2,3,4,5];
const QS=[
 {q:'Double 4. How many?',a:'8',o:[['6','plus2'],['44','digits']]},
 {q:'A ladybird has 3 spots on each wing. How many spots?',a:'6',o:[['3','side'],['4','one']]},
 {q:'Which one is a double?',a:'2 and 2',o:[['4 and 1','same'],['3 and 2','same']]},
 {q:'Double 5. How many?',a:'10',o:[['55','digits'],['7','plus2']]},
 {q:'You hold up 2 fingers on each hand. How many?',a:'4',o:[['2','side'],['3','one']]},
 {q:'Is 3 and 4 a double?',a:'No, the groups are not the same',o:[['Yes, there are two groups','same'],['Yes, 3 and 4 are close','same']]}];
return{WING,SPOT,MIR,DOM,SIDES,HANDS,FACTS,QS}})();
