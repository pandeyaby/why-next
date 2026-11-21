/* Data for flagsharebook (sharing a book with a grown-up, ages 2–3; Development Matters 2021, Literacy birth to three:
   "enjoy sharing books with an adult", "pay attention and respond to the pictures or the words", "have favourite books
   and seek them out, to share with an adult", "repeat words and phrases from familiar stories"; 3–4: names of the
   parts of a book and page sequencing). Dialogic reading (Whitehurst et al. 1988; PEER: prompt, evaluate, expand,
   repeat). Slips it targets: starting from the back cover, holding the book upside down, flicking many pages at once,
   thinking a page with no words cannot be shared, thinking a book read once is finished with, rough hands on pages. */
const SHB=(()=>{
/* the book on the grown-up's lap: one page per scene of Duck's day */
const TITLE="Duck's Day";
const PAGES=[{e:'🌅🦆',t:'Duck wakes up.'},{e:'🛁🦆',t:'Duck has a bath.'},{e:'🦆🐱',t:'Duck sees a cat.'},{e:'🌙🦆',t:'Duck goes to sleep.'}];
const CAT=2;                     /* the page the grown-up asks for (0-based): Duck sees a cat */
/* a page with no words: things to find when the grown-up asks "Where is the …?" (x, y as parts of the canvas) */
const FIND=[{k:'dog',e:'🐶',n:'dog',x:.2,y:.62,clue:'it says woof'},{k:'ball',e:'⚽',n:'ball',x:.42,y:.8,clue:'it is round and you kick it'},
 {k:'duck',e:'🦆',n:'duck',x:.66,y:.66,clue:'it says quack'},{k:'tree',e:'🌳',n:'tree',x:.84,y:.42,clue:'it is tall and green'}];
const ASKS=['dog','duck','ball'];
/* doing words: drag each one to the animal that is doing it */
const DOERS=[{k:'dog',e:'🐕',n:'dog',does:'run'},{k:'cat',e:'🐈',n:'cat',does:'sleep'},{k:'duck',e:'🦆',n:'duck',does:'splash'}];
const DOING=[{k:'run',e:'💨',t:'running',see:'its legs go fast'},{k:'sleep',e:'💤',t:'sleeping',see:'its eyes are shut'},{k:'splash',e:'💦',t:'splashing',see:'the water jumps up'}];
/* the grown-up adds a few more words to what the child says (expand) */
const MORE={run:'Yes! The dog is running fast.',sleep:'Yes! The cat is sleeping. Shh!',splash:'Yes! The duck is splashing in the pond.'};
/* asking for the book again; each read lets the child say more of it */
const ASK=[{k:'again',t:'Again, please!',good:1},{k:'rough',t:'Grab it and pull the page',why:'Gentle hands. Pages can tear. Ask with words: “Again, please!”'},
 {k:'done',t:'Put it away for good',why:'You love this book! It is fine to read it again and again. Ask: “Again, please!”'}];
const SAYS=[0,2,4,6];            /* words the child joins in with on read 1, 2, 3, 4 (Quack! Splash! Shh! …) */
const JOIN=['Quack!','Splash!','Meow!','Shh!','Night night!','Wake up!'];
/* live descriptions of each scene for screen readers */
const DESC=['A picture book on a grown-up’s lap. It shows the back, and it is upside down. Turn it so the front is up the right way, then open it.',
 'The open book. Turn one page at a time to find the page where Duck sees a cat.',
 'A park picture with no words: a dog, a ball, a duck and a tree. The grown-up asks where things are. Tap them.',
 'A pond picture: a dog, a cat and a duck. Drag each doing word to the animal doing it.',
 'The end of the book. Ask the grown-up to read it again, and join in more each time.',
 'Challenge.'];
const DONE=['Front cover up the right way: now we can start.','The cat page! One page at a time, so we saw every page.',
 'You found them all. Pictures are for talking about, even with no words.','Running, sleeping, splashing: you said what they do.',
 'Read again and again: each time you said more.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Which side of the book do we start with?',a:'The front, with the big picture',o:[['The back','back'],['The middle','fast']]},
 {q:'The duck on the cover is on its head. What now?',a:'Turn the book round',o:[['Read it like that','upside'],['Turn it over to the back','back']]},
 {q:'How do we turn the pages?',a:'One page at a time',o:[['Flick lots at once','fast'],['Pull them hard','rough']]},
 {q:'This page has no words. What can we do?',a:'Point and talk about the pictures',o:[['Skip it','words'],['Shut the book','words']]},
 {q:'You loved this book. What can you say?',a:'Again, please!',o:[['We read it, so it is finished','again'],['Grab it and pull','rough']]},
 {q:'Your grown-up says “Where is the dog?” What do you do?',a:'Point to the dog',o:[['Turn the page','point'],['Point to the ball','point']]}];
return{TITLE,PAGES,CAT,FIND,ASKS,DOERS,DOING,MORE,ASK,SAYS,JOIN,DESC,DONE,QS}})();
