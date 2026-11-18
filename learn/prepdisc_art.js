/* Data for the preparing-for-and-explaining-in-discussions flagship (flagprepdisc), ages 8–11. CCSS ELA SL.4.1 and
   SL.5.1 ("come to discussions prepared, having read or studied required material; explicitly draw on that
   preparation"; "pose and respond to specific questions"; "review the key ideas expressed and explain their own
   ideas and understanding in light of the discussion"); National Curriculum England KS2 Spoken language. The fact
   sheet is a made-up class text, used the same way in every scene. */
const PREPD=(()=>{
const TOPIC='Should our school keep its vegetable garden?';
const SHEET=['1. The garden grew 40 kg of potatoes for school lunches last year.','2. The garden club meets for 1 hour every Friday.',
 '3. In the summer holiday the plants need watering 3 times a week.','4. 25 pupils are in the garden club.'];
const KINDS=[['📌','Fact'],['❓','Question'],['💬','My view + reason']];
const PACK={ask:'Pack 3 notes: a fact, a question and your view',slots:[{t:'🎒 My notes',cap:3}],items:[
 {t:'Fact 1: 40 kg of potatoes went to our lunches',to:0,kind:0},
 {t:'Copy out the whole fact sheet word for word',to:-1,why:'Copying everything is not preparing. Pick a few key points you can use.'},
 {t:'Who could water it in the summer holiday?',to:0,kind:1},
 {t:'What is your favourite food?',to:-1,why:'That question is off the topic. Ask about the garden.'},
 {t:'Keep it, because we eat what we grow',to:0,kind:2},
 {t:'The garden is good',to:-1,why:'A view needs a reason. Good how? Say because…'}]};
const BACK={ask:'Drag the evidence under the point it backs up',slots:[{t:'The garden helps our lunches'},{t:'It needs helpers in summer'},{t:'Lots of pupils enjoy it'}],items:[
 {t:'Fact 3: watering 3 times a week in the holiday',to:1,cite:2,about:'the summer holiday'},
 {t:'Everyone says so',to:-1,why:'Everyone says so is not evidence. Use a fact from the text.'},
 {t:'Fact 4: 25 pupils are in the garden club',to:2,cite:3,about:'how many pupils take part'},
 {t:'Fact 1: 40 kg of potatoes for lunches',to:0,cite:0,about:'food for our lunches'}]};
const CITE=[
 {who:'Mia',said:'The garden is a waste of time.',ask:'Reply to Mia using your notes',slots:[{t:'🗣️ Your reply'}],items:[
  {t:'No it isn’t!',to:-1,why:'That disagrees but gives no reason. Point to the text.'},
  {t:'Fact 1 says it grew 40 kg of potatoes for our lunches.',to:0,cite:0},
  {t:'I read something about gardens once.',to:-1,why:'Too vague. Say which fact, and where it came from.'}]},
 {who:'Leo',said:'Nobody would look after it in the holidays.',ask:'Reply to Leo using your notes',slots:[{t:'🗣️ Your reply'}],items:[
  {t:'That’s just not true.',to:-1,why:'Saying it is not true is not a reason. What does the text say?'},
  {t:'I don’t know.',to:-1,why:'You prepared for this. Your notes have a fact about the holidays.'},
  {t:'Fact 3 says it needs watering 3 times a week, so we could make a rota.',to:0,cite:2}]},
 {who:'Ana',said:'Hardly anyone uses it.',ask:'Reply to Ana using your notes',slots:[{t:'🗣️ Your reply'}],items:[
  {t:'The fact sheet says 25 pupils are in the garden club.',to:0,cite:3},
  {t:'Lots of people, probably.',to:-1,why:'Probably is a guess. A number from the text is stronger.'},
  {t:'I like the garden.',to:-1,why:'That is your feeling, not an answer to Ana. Use a fact.'}]}];
const ASK={ask:'Which questions open up the talk? Sort them',slots:[{t:'🔓 Open: gets people talking'},{t:'🔒 Closed: yes or no'}],items:[
 {t:'How could we water it in the holidays?',to:0},{t:'Do you like the garden?',to:1,why:'Do you like…? can be answered yes or no. That is a closed question.'},
 {t:'Why do you think the garden matters?',to:0},{t:'Is the garden big?',to:1,why:'Is it big? only needs yes or no. That is a closed question.'}]};
const CHANGE={ask:'Explain how your thinking changed. Build the sentence',stack:1,slots:[{t:'At first I thought…'},{t:'…but then Ana pointed out…'},{t:'Now I think…'},{t:'…because…'}],items:[
 {t:'we should keep it',to:2},{t:'lots of us use it and it feeds us',to:3},{t:'we should close the garden',to:0},{t:'25 pupils are in the garden club',to:1}]};
const QS=[
 {q:'What is the best way to prepare for a discussion?',a:'Read the text and note a fact, a question and your view',o:[['Copy out the whole text','copy'],['Do nothing, just say what you feel','none']]},
 {q:'Sam says the club is too short. Which reply uses the text?',a:'Fact 2 says it meets for 1 hour every Friday',o:[['No it isn’t','noreason'],['I think I heard it is longer','vague']]},
 {q:'Which question will open up the talk?',a:'What could we grow next year, and why?',o:[['Do you like carrots?','closed'],['Is it Friday?','closed']]},
 {q:'Ava changed her mind after hearing a fact. What should she do?',a:'Say what she thought, what changed it and what she thinks now',o:[['Keep quiet so nobody notices','stuck'],['Say she was right all along','stuck']]},
 {q:'Which note is a view with a reason?',a:'Keep it, because pupils learn to grow food',o:[['Keep it','noreason'],['Gardens','none']]},
 {q:'Ben says “It said somewhere that…”. What would make it stronger?',a:'Say which text and which fact',o:[['Say it louder','noreason'],['Say it more times','noreason']]}];
return{TOPIC,SHEET,KINDS,PACK,BACK,CITE,ASK,CHANGE,QS}})();
