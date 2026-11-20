/* Data for flagfplot (measurement line plots with fractions, ages 9–10). Standards: Common Core 4.MD.B.4 "Make a line
   plot to display a data set of measurements in fractions of a unit (1/2, 1/4, 1/8). Solve problems involving addition
   and subtraction of fractions by using information presented in line plots" and 5.MD.B.2; England Year 4/5
   statistics (interpret data) and fractions (equivalent fractions, add and subtract fractions with the same
   denominator and denominators that are multiples of the same number). An inch ruler is marked in halves, quarters
   and eighths, so measuring "to the nearest 1/8 inch" is the usual US classroom task. */
const FPL=(()=>{
/* every value is stored in eighths above 1 inch, so 4 means 1 4/8 = 1 1/2 inches */
const NAME=['1','1⅛','1¼','1⅜','1½','1⅝','1¾','1⅞','2'];
const SAY=['1','1 and 1 eighth','1 and 1 quarter','1 and 3 eighths','1 and a half','1 and 5 eighths','1 and 3 quarters','1 and 7 eighths','2'];
/* scene 1: find these marks on a scale that shows only 1, 1½ and 2 */
const FIND=[{e:2,t:'1¼'},{e:6,t:'1¾'},{e:3,t:'1⅜'},{e:7,t:'1⅞'}];
/* scene 2: eight bean seedlings, heights to the nearest ⅛ inch, written the way a pupil might record them */
const DATA=[{t:'1½',e:4},{t:'1¾',e:6},{t:'1⅝',e:5},{t:'1¼',e:2},{t:'1 4/8',e:4},{t:'1 6/8',e:6},{t:'1⅞',e:7},{t:'1 2/4',e:4}];
/* scene 3: read the finished plot */
const MODE=4,TALLER={ask:'How many seedlings are taller than 1½ in?',keys:[4,7,3],ans:4};
/* scene 4: tallest minus shortest */
const DIFF={keys:['⅝','6/8','6/4'],ans:0,slip:['','You counted the marks from 1¼ to 1⅞ (6 marks). Count the jumps between them: 5 eighths.','You took away the tops and the bottoms. Write 1¼ as 1 2/8 first: 1 7/8 − 1 2/8 = 5/8.']};
/* scene 5: the three 1½ in seedlings laid end to end */
const ENDS={n:3,keys:['4½','3 3/6','3½'],ans:0,slip:['','Halves stay halves: ½ + ½ + ½ is 3 halves, not 3/6. Three halves make 1½.','You added the wholes (3) but only one half. There are 3 halves: 3 + 1½ = 4½.']};
const DESC=[
 'An inch scale from 1 to 2 split into 8 equal jumps, with only 1, 1½ and 2 named. Tap the mark that is asked for.',
 'A line plot from 1 to 2 inches in eighths, and a card with a seedling height. Drag or tap to place an X above that height.',
 'The finished line plot of 8 seedlings. Tap the height most seedlings have, then choose how many are taller than 1½ inches.',
 'The line plot. Tap the tallest seedling, then the shortest, then choose the difference.',
 'An inch ruler from 0 to 5 and three seedling bars each 1½ inches long. Drag or tap each bar onto the ruler, then choose the total.'];
const DONE=[
 'An inch has 8 eighths. A quarter is 2 eighths, so 1¼ is 2 jumps past 1 and 1¾ is 6 jumps.',
 'All 8 plotted. 1½, 1 2/4 and 1 4/8 are the same length, so they share one stack.',
 'Most seedlings are 1½ in. Four are taller: “taller than” leaves out the 1½ stack itself.',
 'Tallest 1⅞ in, shortest 1¼ in = 1 2/8 in. The difference is 5 jumps of ⅛: ⅝ in.',
 'Three halves make 1½, so 1½ + 1½ + 1½ = 3 + 1½ = 4½ inches.'];
const QS=[
 {q:'Which is longer: ⅛ inch or ¼ inch?',a:'¼ inch',o:[['⅛ inch, because 8 is bigger than 4','big8'],['They are the same','big8']]},
 {q:'A seedling is 1 4/8 in. Which X stack on the plot does it join?',a:'The 1½ stack',o:[['A new stack, 4 marks past 1½','equiv'],['The 1¼ stack','equiv']]},
 {q:'On the plot, how far is it from 1⅜ to 1⅞?',a:'4/8 in, which is ½ in',o:[['5/8 in, counting the 5 marks','marks'],['1 4/8 in','marks']]},
 {q:'What is 1¾ − 1¼?',a:'½ in (2 quarters)',o:[['2/0 in, taking away tops and bottoms','tops'],['3 in, adding the two lengths','add']]},
 {q:'Three Xs sit above 1¼. How many seedlings are taller than 1¼ if there are 8 in all and 1 is shorter?',a:'4',o:[['7, every seedling except the shortest','incl'],['8','incl']]},
 {q:'Two seedlings are 1¾ in. Laid end to end, how long are they?',a:'3½ in',o:[['2 6/8 in, adding tops and bottoms','tops'],['2¾ in, forgetting one ¾','whole']]}];
/* a bean seedling of height h (pixels) standing on (x,y) */
function paintSeedling(g,x,y,h,u){g.save();g.strokeStyle='#166534';g.lineWidth=Math.max(2,u*.12);g.lineCap='round';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+u*.2,y-h*.5,x,y-h);g.stroke();
 g.fillStyle='#22c55e';[[-1,.55],[1,.8]].forEach(([s,f])=>{g.beginPath();g.ellipse(x+s*u*.35,y-h*f,u*.38,u*.17,s*.5,0,7);g.fill()});
 g.fillStyle='#92400e';g.beginPath();g.ellipse(x,y+u*.12,u*.5,u*.14,0,0,7);g.fill();g.restore()}
return{NAME,SAY,FIND,DATA,MODE,TALLER,DIFF,ENDS,DESC,DONE,QS,paintSeedling}})();
