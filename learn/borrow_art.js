/* Data for flagborrow (borrowing and looking after other people's things, ages 4–5; EYFS Development Matters 2021 PSED
   3 and 4 year olds: develop appropriate ways of being assertive, talk with others to solve conflicts, begin to
   understand how others might be feeling; ELG Building Relationships and Managing Self; PSHE Association KS1 R and H
   themes on respecting others' belongings and saying sorry). The routine taught: ask first and accept "no" or "not
   now"; look after it with gentle hands and away from spills; give it back when asked or when finished, to the right
   person; if it gets damaged, tell the owner, say sorry and help put it right. Slips it targets: taking without asking,
   thinking a polite ask means the owner must say yes, careless use, keeping it until you have finished even when asked,
   and hiding damage or saying nothing. */
const BRW=(()=>{
const PALS=[{n:'Mia',e:'🐰',c:'#db2777'},{n:'Sam',e:'🐶',c:'#2563eb'},{n:'Leo',e:'🦊',c:'#c2410c'}];
/* scene 1: three asks. yes=1 means the owner lends it; ok is the kind reply to a no */
const ASKS=[{p:0,toy:'scooter',e:'🛴',say:'Yes! Bring it back at tidy-up time.',yes:1},
 {p:1,toy:'bucket',e:'🪣',say:'Not now. I am using it. You can have it after me.',yes:0,ok:'⏳ OK, I will wait'},
 {p:2,toy:'teddy',e:'🧸',say:'No, sorry. Teddy is special to me.',yes:0,ok:'👍 OK, I will play with something else'}];
/* scene 2: carry Mia's book to the reading corner. x, y as fractions of the stage; hazards are circles. */
const START={x:.12,y:.86},GOAL={x:.86,y:.2},SAFE=[{x:.12,y:.2},{x:.86,y:.2}];
const HAZ=[{e:'🧃',t:'juice',x:.5,y:.52,why:'Juice would spill and make the pages sticky.'},
 {e:'🎨',t:'paint',x:.3,y:.62,why:'Paint would get on the book and not wash off.'},
 {e:'🐕',t:'puppy',x:.74,y:.46,why:'The puppy might chew the book.'},
 {e:'🏖️',t:'sand',x:.56,y:.8,why:'Sand would get stuck in the pages.'}];
/* scene 3: give each thing back to its owner. Sam asks first. */
const BACK=[{t:'car',e:'🚗',p:2},{t:'ball',e:'⚽',p:1},{t:'book',e:'📕',p:0}],FIRST=1;
/* scene 4: Ben's crayon snapped. Pick the three things to do. */
const OOPS=[{t:'Hide it',why:'Hiding it means Ben finds it broken later and does not know what happened.'},
 {t:'Tell Ben what happened',good:1},{t:'Put it back and say nothing',why:'Saying nothing is not telling. Ben should hear it from you.'},
 {t:'Say sorry',good:1},{t:'Say it was already broken',why:'That is not true. Tell Ben what really happened.'},{t:'Help fix it, or ask a grown-up',good:1}];
/* scene 5: you lend your truck to Pip. How would you feel? */
const LEND=[{t:'Pip gives it back',f:'😊',m:'Happy. Pip kept the promise.'},{t:'Pip says thank you',f:'😊',m:'Glad you shared it.'},
 {t:'Pip leaves it out in the rain',f:'😟',m:'Upset. It might go rusty.'},{t:'It breaks. Pip tells you and says sorry',f:'🙂',m:'Sad about the truck, but glad Pip told you.'}];
const DESC=[
 'Three friends, each with a toy. Two buttons: Grab it, and Ask.',
 'Mia lent you her book. Carry it to the reading corner. Juice, paint, a puppy and sand are in the way.',
 'Your friends Mia, Sam and Leo at the top. Their car, ball and book at the bottom, each with a name sticker.',
 'Ben lent you a crayon and it snapped. Six cards. Pick the three things to do.',
 'You lent your truck to Pip. Four cards. Tap one to see how you might feel.'];
const DONE=[
 'Ask first. The owner can say yes, not now, or no, and that is their choice. Say OK and wait, or find something else.',
 'You went the long way round, so the book stayed clean. Use gentle hands and keep borrowed things away from mess.',
 'Each thing went back to its owner, and Sam got his ball as soon as he asked. Give it back when asked, or when you finish.',
 'Tell, say sorry, and help put it right. Ben knows the truth, and you can both fix it.',
 ''];
const QS=[
 {q:'You want to play with Mia’s scooter. What do you do first?',a:'Ask Mia',o:[['Take it while she is not looking','grab'],['Just use it, she will not mind','grab']]},
 {q:'You asked nicely, but Sam says “not now”. What do you do?',a:'Say OK and wait',o:[['Take it, because I said please','nomeans'],['Keep asking until he says yes','nomeans']]},
 {q:'Leo asks for his car back. You have not finished. What do you do?',a:'Give it back now',o:[['Keep it until I finish','keep'],['Hide it so he forgets','keep']]},
 {q:'You borrowed a book. Where do you put your juice?',a:'Away from the book',o:[['Next to the book','care'],['On top of the book','care']]},
 {q:'The book you borrowed got a rip. What do you do?',a:'Tell the owner and say sorry',o:[['Put it back and say nothing','hide'],['Say it was like that before','hide']]},
 {q:'You borrowed Mia’s pencil and finished. What next?',a:'Give it back to Mia',o:[['Keep it in my bag','keep'],['Give it to someone else','care']]}];
return{PALS,ASKS,START,GOAL,SAFE,HAZ,BACK,FIRST,OOPS,LEND,DESC,DONE,QS}})();
