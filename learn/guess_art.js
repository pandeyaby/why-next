/* Data for the guessing-then-counting flagship (flagguess), ages 3–4. EYFS Development Matters 3–4: "fast recognition of
   up to 3 objects, without having to count them individually (subitising)", "recite numbers past 5", "say one number for
   each item in order: 1, 2, 3, 4, 5", "know that the last number reached when counting a small set of objects tells you
   how many there are in total (cardinal principle)", "compare quantities using language: more than, fewer than". The
   estimate-then-check routine follows NCETM early number guidance. All groups stay within 10. */
const GUESS=(()=>{
/* 1. touch and count: [emoji, name, how many] */
const TOUCH=[['🍓','strawberries',4],['🐞','ladybirds',7],['🔘','buttons',6]];
/* 2. guess, count, compare: [emoji, name, how many, the guess Show me picks] */
const JARS=[['🍬','sweets',5,4],['🐟','fish',8,8],['🌰','conkers',6,9]];
/* 3. sensible guesses: [emoji, name, how many, [choices], index of the sensible one] */
const SENSE=[['🍇','grapes',6,[1,5,100],1],['🐝','bees',9,[2,50,8],2],['🦆','ducks',3,[3,20,10],0],['⭐','stars',7,[70,6,1],1]];
/* 4. big things or small things: [left emoji, left count, left size, right emoji, right count, right size] */
const SIZE=[['🍎',4,1,'🫐',7,0],['🫐',6,0,'⚽',3,1],['🍉',5,1,'🍒',5,0]];
const SIZENAME={'🍎':'apples','🫐':'blueberries','⚽':'balls','🍉':'melons','🍒':'cherries'};
/* 5. bunched or spread: [top count bunched, bottom count spread out] */
const SPREAD=[[5,5],[6,4],[3,3]];
const QS=[
 {q:'You guess 5 sweets. You count 6. Was your guess good?',a:'Yes, it was close',o:[['No, it was wrong','exact'],['No, guesses must be big','big']]},
 {q:'A big jar has 3 balls. A small cup has 7 beads. Which has more?',a:'The cup of beads',o:[['The jar, it looks full','size'],['They are the same','any']]},
 {q:'Which is a sensible guess for these 6 grapes: 🍇🍇🍇🍇🍇🍇?',a:'5',o:[['100','big'],['1','any']]},
 {q:'You count 1, 2, 3, 4, 5. How many are there?',a:'5',o:[['4','last'],['1','last']]},
 {q:'4 cars in a row, then spread out wide. How many now?',a:'Still 4',o:[['More than 4, the row is longer','spread'],['Fewer than 4','spread']]},
 {q:'You touch the same bee twice when you count. What happens?',a:'Your number is too big',o:[['Nothing, it is fine','twice'],['Your number is too small','twice']]}];
/* scatter n spots in an area, the same every time for a given seed (layout for the lab) */
function spots(n,area,seed){const cols=Math.ceil(Math.sqrt(n*area.w/area.h)),rows=Math.ceil(n/cols),cw=area.w/cols,rh=area.h/rows;let s=seed*9301+49297;
 const rnd=()=>((s=(s*9301+49297)%233280)/233280);const order=Array.from({length:cols*rows},(_,i)=>i).sort((a,b)=>rnd()-.5).slice(0,n);
 return order.map(k=>({x:area.x+(k%cols+.5)*cw+(rnd()-.5)*cw*.3,y:area.y+(Math.floor(k/cols)+.5)*rh+(rnd()-.5)*rh*.3,r:Math.min(cw,rh)*.34}))}
return{TOUCH,JARS,SENSE,SIZE,SIZENAME,SPREAD,QS,spots}})();
