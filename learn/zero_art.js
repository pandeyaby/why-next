/* Data for the zero-means-none flagship (flagzero), ages 4–5. Zero (0) is the number for none: an empty plate,
   the last frog jumping off the log, an empty nest, and the place just before 1 on a number track.
   Slips it targets: counting the plate or the box instead of what is in it, thinking 0 is 'no number' or that
   counting back stops at 1, calling 1 tiny thing 'none', and putting 0 after 5 (or 9) as on a phone keypad
   (Anthony and Walshaw 2004, 'Zero: a none number?'). */
const ZRO=(()=>{
const PLATES=[3,4];
const BOXES=[0,1,0,3,0,2];
const FROGS=4;
const NESTS=[2,0,3,1];
const TRACK=[null,1,2,null,4,null];
const CARDS=[{v:0,slot:0},{v:3,slot:3},{v:5,slot:5}];
const DESC=[
 'A plate with 3 biscuits. Number keys 0 to 5 below.',
 'Six boxes with 0, 1, 2 or 3 beads. Two places: 0 none, and Some.',
 '4 frogs sit on a log over a pond. Number keys 0 to 5 below.',
 'Four nests with 2, 0, 3 and 1 eggs. Cards 0, 1, 2 and 3.',
 'A track 0 to 5 with gaps where 0, 3 and 5 go. Cards 0, 3 and 5.'];
const DONE=[
 '3, 2, 1, 0 and 4, 3, 2, 1, 0. An empty plate has 0 biscuits: zero means none.',
 'Only the empty boxes are 0. Even 1 bead is some, not none.',
 '4, 3, 2, 1, 0. Counting back does not stop at 1: when no frogs are left, the number is 0.',
 'The empty nest gets 0. Zero is a number we can write, just like 1, 2 and 3.',
 '0 comes just before 1. It is the smallest number on the track, not the last one like on a phone.'];
const QS=[
 {q:'The plate is empty. How many biscuits are on it?',a:'0',o:[['1','plate'],['No number','nothing']]},
 {q:'You have 1 sweet and you eat it. How many are left?',a:'0',o:[['1','one'],['No number','nothing']]},
 {q:'Count back: 3, 2, 1, …',a:'0',o:[['4','back'],['Stop, there are no more numbers','nothing']]},
 {q:'Which number comes just before 1?',a:'0',o:[['2','back'],['10','end']]},
 {q:'A nest has no eggs. Which card goes on it?',a:'0',o:[['1','plate'],['No card','nothing']]},
 {q:'Which box has zero beads?',a:'The empty box',o:[['The box with 1 bead','one'],['The box with 2 beads','one']]}];
return{PLATES,BOXES,FROGS,NESTS,TRACK,CARDS,QS,DESC,DONE}})();
