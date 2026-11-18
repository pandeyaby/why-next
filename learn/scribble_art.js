/* Data for the giving-meaning-to-marks flagship (flagscribble), ages 3–4. Follows Development Matters (2021) Literacy:
   birth–3 "add some marks to their drawings, which they give meaning to"; 3–4 "use some of their print and letter
   knowledge in their early writing, for example writing a pretend shopping list that starts at the top of the page;
   writing 'm' for mummy", "write some or all of their name", and the five concepts about print (print has meaning,
   print has different purposes, English is read left to right and top to bottom). */
const SCRB=(()=>{
const MEAN=[['🎂','a card for Nana','Card'],['🛒','a shopping list','List'],['🚪','a Keep out sign','Sign']];
const SQUIG=[[.12,.5],[.18,.32],[.24,.62],[.3,.36],[.36,.6],[.44,.4],[.5,.58],[.58,.34],[.64,.6],[.72,.38],[.8,.56],[.88,.42]];
const CARDS=[['☀️','',0],['','m a m',1],['🏠','',0],['','l o l o',1],['🐱','',0],['','S a m',1]];
const BINS=[['🖍️','Picture'],['✍️','Writing']];
const JOBS=[['🛒','the shop','list'],['🎂','Nana','card'],['🎒','Sam\'s bag','label'],['🚪','the bedroom door','sign']];
const PAPER={list:['— — —','— —','— — —'],card:['♥','x x'],label:['Sam'],sign:['! ! !']};
const NAME='SAM',LETTERS=['T','S','O','A','Z','M'];
const LIST=[['🥛','milk'],['🥚','eggs'],['🍞','bread']];
const CARD=[['','To'],['','Nana'],['♥','love Mia']];
const NEXT=[['milk, eggs, bread','ok'],['cake, cake, cake','same'],['bread, eggs, milk','dir']];
const QS=[
 {q:'Mia draws some squiggles. She says: This says Mummy. Is that writing?',a:'Yes, her marks mean something',o:[['No, it is just a mess','blank'],['No, only grown-ups can write','blank']]},
 {q:'Which one is writing?',a:'Little marks in a line',o:[['A big round sun','pic'],['A house with a door','pic']]},
 {q:'What job does a shopping list do?',a:'It says what to buy',o:[['It says happy birthday','job'],['It keeps people out','job']]},
 {q:'Where do you start reading a list?',a:'At the top',o:[['At the bottom','dir'],['Anywhere','dir']]},
 {q:'Mia reads her list again the next day. What does it say?',a:'The same words as before',o:[['New words each time','same'],['Nothing now','same']]},
 {q:'Sam writes S on his picture. What might it say?',a:'Sam',o:[['Nothing, it is just a line','blank'],['Dog, because it is a dog picture','name']]}];
return{MEAN,SQUIG,CARDS,BINS,JOBS,PAPER,NAME,LETTERS,LIST,CARD,NEXT,QS}})();
