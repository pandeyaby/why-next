/* Data for flagtree (Tree diagrams, ages 12–14; KS3 Maths Probability 4, CCSS 7.SP.8). Checked against the AQA GCSE
   Maths specification (P8, tree diagrams for independent and dependent events), BBC Bitesize KS3 "Probability: tree
   diagrams", the Corbettmaths tree-diagram video and worksheet, and Nuffield/NCETM work on probability misconceptions
   (adding along branches, thinking two outcomes are always 50:50, forgetting a path). Rules: the branches from one point
   add up to 1; multiply along a path for "this and then that"; add the end results of every path that fits; without
   replacement the second-pick fractions change because one item is gone. Slips it targets: 2 + 3 outcomes instead of
   2 × 3; adding along a path; the red-to-blue ratio used as a probability; missing the second path for "one of each";
   keeping the old denominator after not replacing; and "two colours means 50:50". */
const TREE=(()=>{
/* seeded random so the 200-pick test gives the same counts every time the scene opens */
const rng=s=>()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};
function simulate(n,pRed,seed){const r=rng(seed);let rr=0,mix=0;for(let i=0;i<n;i++){const a=r()<pRed,b=r()<pRed;if(a&&b)rr++;else if(a!==b)mix++}return{rr,mix}}
/* the coin-then-spinner tree */
const COIN=['H','T'],SPIN=[{k:'R',n:'red',c:'#dc2626'},{k:'G',n:'green',c:'#16a34a'},{k:'B',n:'blue',c:'#2563eb'}];
/* bag of 3 red and 2 blue: the 6 branch slots of a 2-pick tree (slot 0,1 first pick; 2,3 after red; 4,5 after blue) */
const COL=[{k:'R',n:'red',c:'#dc2626'},{k:'B',n:'blue',c:'#2563eb'}];
const WITH=['3/5','2/5','3/5','2/5','3/5','2/5'],WITHOUT=['3/5','2/5','2/4','2/4','3/4','1/4'];
const TILES1=['3/5','2/5','3/2'],TILES2=['2/4','3/4','1/4','3/5','2/5'];
const LEAF=['red, red','red, blue','blue, red','blue, blue'],LEAFP=['9/25','6/25','6/25','4/25'];
const DESC=['A tree for flipping a coin and then spinning a spinner with three equal colours. Tap the start to flip the coin, then tap H and T to spin.',
 'A bag of 3 red and 2 blue counters. Pick one, put it back, pick again. Drag a fraction onto each of the 6 branches.',
 'The finished tree for picking twice with the counter put back. Find the chance of red then red, then test it with 200 picks.',
 'Each path end shows its chance. Tap every path that gives one red and one blue, in either order.',
 'Now 3 red and 2 blue sweets, and you eat the first one, so it is not put back. Drag a fraction onto each second-pick branch.',
 'Challenge.'];
const DONE=['A coin then a 3-colour spinner gives 2 × 3 = 6 outcomes, not 2 + 3.',
 'Each pair of branches from one point adds up to 1, and the second pick is the same because the counter went back.',
 'Multiply along the path: 3/5 × 3/5 = 9/25 = 0.36, and about 36% of the 200 picks were red, red.',
 'Two paths give one of each, so add them: 6/25 + 6/25 = 12/25.',
 'Without putting back, the second pick has 4 left: P(red, red) = 3/5 × 2/4 = 6/20 = 3/10.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'You flip a coin and roll a dice. How many outcomes are there?',a:'12',o:[['8','count'],['6','count']]},
 {q:'P(heads) = 1/2 and P(six) = 1/6. What is P(heads and six)?',a:'1/12',o:[['2/3','add'],['1/8','add']]},
 {q:'A bag has 4 red and 1 blue. Pick, put back, pick again. What is P(red, red)?',a:'16/25',o:[['8/5','add'],['8/10','add']]},
 {q:'Each day P(rain) = 0.3. What goes on the "no rain" branch?',a:'0.7',o:[['0.3','sumone'],['1.3','sumone']]},
 {q:'3 red and 2 blue sweets. You eat a red one. What is P(red) for the next sweet?',a:'2/4',o:[['3/5','replace'],['2/5','replace']]},
 {q:'3 red and 2 blue. Pick, put back, pick again. What is P(one red and one blue)?',a:'12/25',o:[['6/25','onepath'],['1/2','guess']]}];
return{simulate,COIN,SPIN,COL,WITH,WITHOUT,TILES1,TILES2,LEAF,LEAFP,DESC,DONE,QS}})();
