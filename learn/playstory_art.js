/* Data for flagplaystory (making up a story in play, ages 3–4; Development Matters 2021: Communication and Language
   3–4 "use longer sentences", "tell a long story"; Expressive Arts and Design 3–4 "begin to develop complex stories
   using small-world equipment like animal sets, dolls and dolls houses"; Literacy 3–4 "engage in extended
   conversations about stories"; ELG Speaking "invent, adapt and recount narratives and stories with peers and their
   teacher"). Story shape for this age: a story opening, a character who speaks or acts, something that happens
   (a problem), and an ending. Slips it targets: ending words used as a start, play with no story words, a voice that
   does not fit the character, nothing happening, never stopping (and then… and then…), walking off mid-story,
   a fix the character could not do, and thinking there is only one right story. */
const PST=(()=>{
/* 1. story words that start a story; a wrong card names its slip */
const START=[{k:'once',t:'Once upon a time…',good:1},{k:'end',t:'The end.',slip:'order'},{k:'tidy',t:'Tidy up time!',slip:'nostart'}];
/* 2. the toys, and what each one would say; cue = why that voice fits that toy */
const CAST=[{k:'dragon',e:'🐉',n:'Dragon',cue:'big and loud, with wings'},{k:'mouse',e:'🐭',n:'Mouse',cue:'tiny and quiet'},{k:'teddy',e:'🧸',n:'Teddy',cue:'he has a picnic basket'}];
const LINES=[{k:'roar',t:'ROAR! I can fly!',who:'dragon'},{k:'squeak',t:'Squeak! I am so small.',who:'mouse'},{k:'picnic',t:'Let’s have a picnic!',who:'teddy'}];
/* 3. something happens in the middle, then someone fixes it */
const HAPPEN=[{k:'ohno',t:'Oh no! Wind blows Teddy’s hat up a tree!',good:1},{k:'same',t:'They sit. They sit. They sit.',slip:'nothing'},{k:'end',t:'The end.',slip:'soon'}];
const HELP=[{k:'dragon',e:'🐉',n:'Dragon',good:1,say:'Dragon flaps up and gets the hat. “Here you are, Teddy!”'},
 {k:'mouse',e:'🐭',n:'Mouse',say:'Mouse jumps and jumps, but the hat is much too high for a tiny mouse.'},
 {k:'teddy',e:'🧸',n:'Teddy',say:'Teddy cannot reach. That is why it is a problem! Who in the story can fly?'}];
/* 4. ways to finish */
const ENDS=[{k:'home',t:'They all go home for tea. The end.',good:1},{k:'andthen',t:'And then… and then… and then…',slip:'noend'},{k:'walk',t:'Walk off and leave the toys',slip:'stop'}];
/* 5. make up your own: one card from each row; every mix is a new story */
const ROWS=[{n:'who',o:[['🐱','a cat'],['🤖','a robot'],['👸','a princess']]},{n:'where',o:[['🌲','in the woods'],['🏖️','at the beach'],['🚀','in space']]},
 {n:'oh no',o:[['🌧️','it rains'],['👟','a shoe gets lost'],['🎈','a balloon flies off']]},{n:'end',o:[['🏠','home for tea'],['🛌','off to bed'],['🎉','a big party']]}];
const FIX={'it rains':'they find a big leaf for an umbrella','a shoe gets lost':'a friend finds it under a log','a balloon flies off':'a bird brings it back'};
/* live descriptions of each scene for screen readers */
const DESC=['A play mat and a talk bubble. Put story words in the bubble to start, then put Teddy on the mat.',
 'Dragon, Mouse and Teddy are on the mat. Give each toy the words it would say.',
 'The middle of the story. Make something happen, then choose who can fix it.',
 'The story needs an ending. Choose how it finishes.',
 'Make up your own story: choose who, where, an oh no and an end, then tell it. Make two different stories.',
 'Challenge.'];
const DONE=['Once upon a time… and Teddy is in the story. A story start!','Each toy talks like itself: a big roar, a tiny squeak, a picnic.',
 'Something happened, and Dragon fixed it. That is the middle of a story.','The end! Start, middle, end: a whole story.',
 'Two stories, and you made them both up. There is no one right story.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'How can a play story start?',a:'Once upon a time…',o:[['The end.','order'],['Tidy up time!','nostart']]},
 {q:'Mouse is tiny. What would Mouse say?',a:'Squeak! Help me!',o:[['ROAR! I am the biggest!','voice'],['Nothing, toys can’t talk','voice']]},
 {q:'Teddy sits and sits. What does the story need?',a:'Something to happen, like an oh no!',o:[['More sitting','nothing'],['The end, now','soon']]},
 {q:'The hat is up a tall tree. Who can get it?',a:'Dragon, who can fly',o:[['Tiny Mouse','fix'],['Nobody, ever','noend']]},
 {q:'How do we finish a story?',a:'They go home. The end.',o:[['And then… and then… for ever','noend'],['Walk off in the middle','stop']]},
 {q:'Your friend made a robot story. Yours is a cat story. Who is right?',a:'Both: we can make up lots of stories',o:[['Only one story can be right','one'],['Only the one in a book','one']]}];
return{START,CAST,LINES,HAPPEN,HELP,ENDS,ROWS,FIX,DESC,DONE,QS}})();
