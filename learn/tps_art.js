/* Data for flagtps (think, pair, share, ages 6–7; Lyman 1981 introduced the routine; Rowe 1986 on wait time: when
   teachers wait 3 seconds or more after a question, more children answer and answers are longer; National Curriculum
   2014 KS1 spoken language: "listen and respond appropriately", "articulate and justify answers", "participate in
   discussions… taking turns"; EEF Toolkit, oral language approaches). The class in scene 1 is made up to show the
   idea: each child needs a different number of seconds before they have an idea. Slips it targets: answering at once
   so only the fastest think, copying instead of thinking, keeping the turn, not listening to the partner, sharing only
   your own idea, sharing with no reason, being unkind about a partner's idea, and doing the steps out of order. */
const TPS=(()=>{
/* 1. seconds each child in a made-up class of 12 needs before they have an idea */
const READY=[1,1,2,2,3,3,3,4,4,5,6,9],KIDS=['🧒','👧','👦','🧒🏽','👧🏾','👦🏻','🧒🏿','👧🏼','👦🏾','🧒🏻','👧🏽','👦🏼'],MAXT=10,GOAL=10;
const QUESTION='What would help a snowman last longer?';
/* 2. think: cards for my think bubble */
const THINK=[{k:'idea',t:'Build it in the shade',good:'idea'},{k:'why',t:'because the sun melts snow',good:'why'},
 {k:'shout',t:'Shout out now!',slip:'shout'},{k:'copy',t:'Wait and copy Mia',slip:'copy'}];
/* 3. pair: Mia's idea, and what you might say she said */
const MIA='Make it big, because big ones melt slower.';
const HEARD=[{k:'mia',t:'Make it big: big ones melt slower',good:1},{k:'mine',t:'Build it in the shade',slip:'mine'},{k:'none',t:'I was not listening',slip:'listen'}];
/* 4. share: one card from each row makes the sentence we tell the class */
const ROWS=[{n:'start',o:[['We think',''],['I think','me'],['Mia’s idea is silly, so','unkind']]},
 {n:'idea',o:[['build it in the shade and make it big',''],['build it in the shade','onlymine'],['it will melt','noidea']]},
 {n:'reason',o:[['because sun melts snow and big ones melt slower',''],['because I said so','noreason'],['and that’s it','noreason']]}];
/* 5. the three steps, to put in order */
const STEPS=[{k:'think',e:'🤔',n:'Think',d:'quiet, on my own'},{k:'pair',e:'👫',n:'Pair',d:'take turns with a partner'},{k:'share',e:'🙋',n:'Share',d:'tell the class what we think'}];
/* live descriptions of each scene for screen readers */
const DESC=['A class of 12 children. The teacher has asked a question. Drag the think timer to give more seconds and watch how many children have an idea.',
 'Your think bubble. Put in your own idea and a reason. Keep it quiet: it is think time.',
 'You and Mia at a table. You have the talk turn. Say your idea, pass the turn to Mia, then show what Mia said.',
 'Make the sentence you and Mia share with the class. Choose one card in each row, then share it.',
 'Three step cards: Think, Pair and Share. Put them in order, 1, 2, 3.',
 'Challenge.'];
const DONE=['With think time, nearly everyone had an idea, not just the fastest few.','Your own idea, with a reason. Ready to talk.',
 'You took turns and listened: you could say Mia’s idea back.','We think…, both ideas, because…: that is a good share.','Think, then pair, then share.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'The teacher asks a question. What do you do first?',a:'Think on my own, quietly',o:[['Shout the answer out','shout'],['Wait and copy a friend','copy']]},
 {q:'You said your idea to your partner. What next?',a:'Let them talk, and listen',o:[['Keep talking','hog'],['Think about my next idea','listen']]},
 {q:'Your partner says, "Make it big." What can you say back?',a:'"So you think make it big?"',o:[['"Build it in the shade."','mine'],['"That is silly."','unkind']]},
 {q:'How do you start your share?',a:'We think…',o:[['I think…','me'],['I don’t know','noidea']]},
 {q:'What makes a share strong?',a:'Our idea and a reason: because…',o:[['Just the idea, no reason','noreason'],['Saying it the loudest','shout']]},
 {q:'Which order is right?',a:'Think, pair, share',o:[['Share, think, pair','order'],['Pair, then think','order']]},
 {q:'Why wait a few seconds before hands go up?',a:'So everyone has time to think',o:[['So the fast ones can win','shout'],['There is no reason','time']]}];
return{READY,KIDS,MAXT,GOAL,QUESTION,THINK,MIA,HEARD,ROWS,STEPS,DESC,DONE,QS}})();
