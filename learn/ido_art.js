/* Data for flagido (I do, we do, you do, ages 6–8; the gradual release of responsibility, Pearson and Gallagher 1983;
   Rosenshine 2012 Principles of Instruction: provide models, guide practice, then independent practice; Fisher and
   Frey's "I do it, we do it, you do it"; EEF 2018 metacognition guidance on modelling; scaffolding, Wood, Bruner and
   Ross 1976). The skill is drawing a cat from four shapes in a fixed order. Slips it targets: thinking one watch is
   enough to do it alone, letting the grown-up do every step in "we do", asking for help before having a go (or never
   asking when truly stuck), mixing up the three rounds, and skipping or reversing a round. */
const IDO=(()=>{
/* the four steps of the skill, in order; say = what the grown-up says while modelling it */
const PARTS=[{k:'head',n:'head',say:'First I draw a big circle for the head.'},{k:'ears',n:'ears',say:'Next I put two pointy triangles on top for ears.'},
 {k:'eyes',n:'eyes',say:'Then I add two eyes in the middle of the circle.'},{k:'whisk',n:'nose and whiskers',say:'Last I add a nose and three whiskers on each side.'}];
/* we do: whose turn each step is (g = grown-up, y = you) */
const TURN=['g','y','g','y'];
/* which round is it? r: 0 = I do, 1 = we do, 2 = you do */
const ROUND=['I do','We do','You do'];
const SCENES=[{t:'Mum ties her lace slowly and says each step',r:0},{t:'You make the loop, Mum pulls it tight',r:1},
 {t:'You tie your lace and Mum stays near',r:2},{t:'The teacher does a sum on the board and talks it through',r:0},
 {t:'You and the teacher do a sum, a step each',r:1},{t:'You do the next sum on your own, then check it',r:2}];
const RJOB=['The grown-up does it and says each step. You watch.','You do it together and take turns on the steps.','You do it alone. The grown-up is near if you get stuck.'];
const DESC=['A grown-up is drawing a cat, one step at a time. Tap Next step to watch each step.',
 'A cat to draw together. On the grown-up\'s turn they draw. On your turn, drag the next shape onto the cat.',
 'Draw a cat on your own. Drag each shape onto the paper in order. A grown-up is near: there is a hint button.',
 'Six picture cards and three boxes: I do, We do, You do. Drag each card to its round, or tap a box.',
 'Three round cards and three spaces. Put the rounds in the order you learn a new skill.',
 'Challenge.'];
const DONE=['You watched every step and remembered what came after the head.','You did your share of the steps on your turns.',
 'You drew the whole cat alone, and had a go before any hint.','Watching is I do, sharing the steps is we do, alone is you do.',
 'I do, then we do, then you do: watch, share, then try alone.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'You watched Dad fold a paper plane once. What comes next?',a:'Fold one together with Dad',o:[['Fold one alone straight away','skip'],['Watch him fold ten more','stuck']]},
 {q:'In "we do", who does the steps?',a:'We take turns',o:[['The grown-up does them all','passive'],['I do them all alone','skip']]},
 {q:'You are drawing alone and a step looks hard. What first?',a:'Have a go, then ask for a hint',o:[['Ask for help before trying','tryfirst'],['Give up','giveup']]},
 {q:'Mum shows how to brush teeth and says each step. Which round is that?',a:'I do',o:[['We do','round'],['You do','round']]},
 {q:'Which order helps you learn a new skill?',a:'I do, we do, you do',o:[['You do, we do, I do','skip'],['We do, I do, you do','nowatch']]},
 {q:'You tried hard and are still stuck. What now?',a:'Ask the grown-up for a hint',o:[['Keep quiet and guess','neverask'],['Rub it all out','giveup']]}];
/* the cat, piece by piece; ghost = a dashed outline used for hints */
function cat(g,k,x,y,s,ghost){g.save();g.translate(x,y);g.lineWidth=Math.max(2,s*.035);g.strokeStyle=ghost?'#64748b':'#1f2937';if(ghost)g.setLineDash([s*.05,s*.04]);
 const fill=c=>{if(!ghost){g.fillStyle=c;g.fill()}g.stroke()};
 if(k==='head'){g.beginPath();g.arc(0,0,s*.36,0,7);fill('#fdba74')}
 if(k==='ears'){[-1,1].forEach(d=>{g.beginPath();g.moveTo(d*s*.34,-s*.12);g.lineTo(d*s*.3,-s*.5);g.lineTo(d*s*.08,-s*.33);g.closePath();fill('#fb923c')})}
 if(k==='eyes'){[-1,1].forEach(d=>{g.beginPath();g.ellipse(d*s*.13,-s*.06,s*.06,s*.08,0,0,7);fill('#14532d')})}
 if(k==='whisk'){g.beginPath();g.moveTo(-s*.05,s*.07);g.lineTo(s*.05,s*.07);g.lineTo(0,s*.13);g.closePath();fill('#be185d');
  g.beginPath();[-1,1].forEach(d=>[-.06,0,.06].forEach(t=>{g.moveTo(d*s*.1,s*.12);g.lineTo(d*s*.42,s*(.12+t*1.6))}));g.stroke()}
 g.restore()}
function person(g,x,y,s,big){g.save();g.translate(x,y);g.strokeStyle='#1f2937';g.lineWidth=Math.max(2,s*.05);g.fillStyle=big?'#c4b5fd':'#fde68a';
 g.beginPath();g.arc(0,-s*.25,s*.2,0,7);g.fill();g.stroke();g.fillStyle=big?'#7c3aed':'#0ea5e9';g.beginPath();g.moveTo(-s*.28,s*.4);g.quadraticCurveTo(0,-s*.12,s*.28,s*.4);g.closePath();g.fill();g.stroke();g.restore()}
return{cat,person,PARTS,TURN,ROUND,SCENES,RJOB,DESC,DONE,QS}})();
