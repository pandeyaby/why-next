/* Data for flagwarmup (a quick look back at yesterday, ages 6–8; Rosenshine 2012 Principles of Instruction:
   "begin a lesson with a short review of previous learning"; retrieval practice / the testing effect, Roediger and
   Karpicke 2006; Dunlosky et al. 2013; EEF Cognitive science approaches in the classroom 2021). A practice session
   starts with two or three questions on yesterday's work, answered from memory first and then checked, before the
   new work. Slips it targets: thinking forgetting overnight means you are bad at it, starting with the new work,
   peeking at or rereading the answer instead of trying to remember, stopping after a wrong answer instead of
   checking and fixing it, and making the look back so long that there is no time left for new work. */
const WUP=(()=>{
/* yesterday's three things; after a night each is still there but harder to bring back */
const FACTS=[{k:'add',q:'7 + 3 = ?',a:'10',opts:['10','9','73'],e:'➕',fade:60,y:'7 + 3 = 10'},
 {k:'legs',q:'How many legs does a spider have?',a:'8',opts:['8','6','4'],e:'🕷️',fade:50,y:'A spider has 8 legs'},
 {k:'sides',q:'How many sides does a triangle have?',a:'3',opts:['3','4','5'],e:'🔺',fade:65,y:'A triangle has 3 sides'}];
const STRONG=80;                /* a memory bar at 80 or more counts as warmed up */
const GAIN={memory:35,fixed:25,peek:5};   /* recall from memory > a wrong try that is then checked > peeking */
/* today's session, in slots: the look back must come first and the finish last */
const BLOCKS=[{k:'back',e:'🔙',t:'Look back at yesterday'},{k:'new',e:'✨',t:'New work'},{k:'end',e:'🏁',t:'Finish and tidy up'}];
const ORDER=['back','new','end'];
/* how long the look back is: each question takes about 1 minute of a 15-minute practice */
const SESSION=15,MAXQ=10;
function sizeSays(n){if(n===0)return{ok:0,t:'No look back: yesterday stays cold, and today starts from nothing.'};
 if(n===1)return{ok:0,t:'One question is a start. Two or three wakes up more of yesterday.'};
 if(n<=3)return{ok:1,t:`${n} questions: a quick look back, then ${SESSION-n} minutes for new work.`};
 if(n<=5)return{ok:0,t:`${n} questions is getting long: only ${SESSION-n} minutes left for new work.`};
 return{ok:0,t:`${n} questions! The look back has eaten the new work. Keep it to 2 or 3.`}}
/* today's new work builds on yesterday's 7 + 3 = 10 */
const TODAY={q:'17 + 3 = ?',a:'20',opts:['20','110','19'],link:'Yesterday: 7 + 3 = 10, so 17 + 3 = 20.'};
const WHY=[{k:'wake',t:'It wakes up what I need today',good:1},{k:'waste',t:'It wastes time before the real work',why:'A short look back is part of the real work: today’s 17 + 3 uses yesterday’s 7 + 3.'},
 {k:'show',t:'It shows who is cleverest',why:'It is not a race or a test of who is best. It helps your own memory get ready.'}];
/* live descriptions of each scene for screen readers */
const DESC=['Yesterday’s three things, each with a memory bar. Drag the moon across the sky to pass the night and see what happens to the bars.',
 'Today’s practice has three slots. Drag the blocks into the slots so the session starts in the right way.',
 'Three look-back questions. For each, try from memory or peek at the answer. Get all three memory bars back to strong.',
 'A 15-minute practice bar. Drag the slider to choose how many look-back questions to do.',
 'Today’s new question uses yesterday’s fact. Answer it, then pick why the look back helped.',
 'Challenge.'];
const DONE=['Overnight the bars dropped, but nothing went to zero: yesterday is still in there.','Look back first, then new work, then finish.',
 'All three are strong again. Trying from memory first did that, not peeking.','2 or 3 questions: short, so most of the time is for new work.',
 '17 + 3 = 20 came fast, because the look back woke up 7 + 3 = 10.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'You start your maths practice. What do you do first?',a:'Two or three questions from yesterday',o:[['Jump straight into the new work','newfirst'],['Skip yesterday, it is done','none']]},
 {q:'A look-back question: 7 + 3. What is best?',a:'Try it from memory, then check',o:[['Look at the answer first','peek'],['Read yesterday’s page again','reread']]},
 {q:'You forgot part of yesterday’s work. What does that mean?',a:'That is normal: a look back brings it back',o:[['I am bad at this','forgot'],['It is gone for ever','forgot']]},
 {q:'You got a look-back question wrong. What now?',a:'Check the answer and fix it',o:[['Stop the look back','wrongstop'],['Hide it and move on','wrongstop']]},
 {q:'How long should the look back be?',a:'Short: 2 or 3 questions',o:[['All of yesterday again','long'],['None at all','none']]},
 {q:'Why look back before new work?',a:'New work builds on what I learned yesterday',o:[['To fill up time','long'],['There is no reason','none']]}];
return{FACTS,STRONG,GAIN,BLOCKS,ORDER,SESSION,MAXQ,sizeSays,TODAY,WHY,DESC,DONE,QS}})();
