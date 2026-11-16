/* Data for the maths tools lab (flag_tools.js; bundled in the main learn.js so the lab file stays small).
   K: canvas colours (dark ink on a paper card in both themes). SUMS: finger sums. ROWS: counters in rows A and B.
   JOBS: [problem, best tool, feedback for each other tool]. CHECKS: [start, take away, friend's answer]. BANK/WHY: challenge. */
const TOOLART=(()=>{
const K={ink:'#111827',dim:'#374151',paper:'#fffdf8',line:'#1f2937',hint:'#fff7ed',win:'#166534',winBg:'#dcfce7',no:'#9f1239',sel:'#1d4ed8',selBg:'#dbeafe',
 skin:'#f2c49b',skinE:'#7c4a2d',down:'#d6c2ae',red:'#b91c1c',blue:'#1d4ed8',cubeA:'#c2410c',cubeB:'#047857',cell:'#ffffff'};
const SUMS=[[4,3],[5,2]];
const ROWS=[6,9];
const TOOLS=[['fingers','Fingers'],['frame','Ten frame'],['towers','Cube towers']];
const JOBS=[['2 + 3. You are in the car, with no toys.','fingers',{frame:'A ten frame would work, but you do not have one in the car. Fingers are always with you.',towers:'You have no cubes in the car. Use your fingers: 2 and 3 more.'}],
 ['9 + 4. What is the total?','frame',{fingers:'9 + 4 is more than 10. You run out of fingers.',towers:'Cubes work, but counting 13 one by one is slow. A ten frame shows the full 10 at once.'}],
 ['Mia has 7 shells. Leo has 4. Who has more?','towers',{fingers:'Fingers can show one number at a time. To compare two, build two towers side by side.',frame:'A ten frame is for filling to 10. To compare, stand two towers side by side.'}]];
const CHECKS=[[7,3,5],[10,4,7]];
const BANK=[['8 + 4. Can you show it on your fingers?','No, it needs 12 fingers',[['Yes, easily','fingers'],['Yes, on one hand','hand']]],
 ['Which tool shows 10 at a glance?','A full ten frame',[['A pile of cubes','pile'],['One hand','hand']]],
 ['Row A: 5 counters spread out. Row B: 7 close together. Which has more?','Row B',[['Row A, it is longer','longer'],['They are the same','same']]],
 ['A ten frame has 8 counters. How many empty boxes?','2',[['8','frame8'],['10','frame10']]],
 ['Why use a ten frame for 9 + 4?','Fill the 10, then see 3 more',[['It looks nice','looks'],['Fingers are not allowed','allowed']]],
 ['Tom has 6 cubes. Kim has 9. How many more does Kim have?','3',[['15','add'],['9','more']]]];
const WHY={fingers:'You have 10 fingers. 8 + 4 is 12, so fingers run out.',pile:'A pile is messy to count. A full ten frame is 10 at a glance.',longer:'Spread out is not more. Snap them into towers to see which is taller.',
 same:'Line them up one to one. Row B has 2 left over.',frame8:'8 boxes are full. 10 − 8 = 2 are empty.',frame10:'A ten frame has 10 boxes. 8 are full, so 2 are empty.',looks:'Pick a tool because it helps. A ten frame shows 10 fast.',
 allowed:'Fingers are a fine tool. They just stop at 10.',add:'That adds them. "How many more" compares: 9 is 3 more than 6.',more:'9 is how many Kim has. She has 3 more than Tom.',hand:'One hand has only 5 fingers.'};
return{K,SUMS,ROWS,TOOLS,JOBS,CHECKS,BANK,WHY}})();
