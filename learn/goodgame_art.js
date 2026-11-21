/* Data for the winning-and-losing-well flagship (flaggoodgame), ages 6–7. DfE Relationships and Health Education
   (2019): a normal range of emotions including anger, simple self-care techniques, courtesy and manners, fairness;
   EYFS ELGs Managing Self (resilience and perseverance) and Building Relationships (play cooperatively, take turns).
   Rolls are fixed so the learner loses the race and comes back from 0–2 in the card match. */
const GGM=(()=>{
const ME=[1,2,1],KAI=[3,2,3],END=8;
const MOODS=[['🌬️','Slow breaths','ok'],['👊','Hit the table','hit'],['🙈','Hide and sulk','sulk']];
const SAYS=[['Good game, Kai!','ok'],['You cheated!','blame'],['I quit!','quit']];
const WORDS=[['Good game!',0],['Ha, I\'m the best!',1],['Want another go?',0],['You\'re rubbish!',1],['Well played.',0],['I always win!',1]];
const BINS=[['🤝','Kind winner'],['📣','Boasting']];
const MOVES=[['🎲','Kai rolls 3 and moves 3.',1],['🎲','Zoe rolls 2 but moves 4.',0],['🔁','Sam is losing, so he makes a new rule.',0],['⏳','Ali waits for his turn.',1],['👀','Mo peeks at the cards.',0]];
const CARDS=[[2,7],[4,6],[9,3],[8,5],[6,1]];
const END_SAY=[['Good game, Kai!','ok'],['Ha! I won, you lost!','boast']];
const QS=[
 {q:'You lose a game. What do you say?',a:'Good game!',o:[['You cheated!','blame'],['I\'m never playing again!','quit']]},
 {q:'You win a game. What do you say?',a:'Well played. Want another go?',o:[['Ha, I\'m the best!','boast'],['You\'re rubbish!','boast']]},
 {q:'You are losing. Can you change the rules?',a:'No, the rules stay the same for everyone',o:[['Yes, when I am losing','rules'],['Yes, if nobody sees','rules']]},
 {q:'You lose and feel cross. Is that OK?',a:'Yes, and I can calm down with slow breaths',o:[['No, I must never feel cross','feel'],['Yes, so I can hit the table','hit']]},
 {q:'You are behind 0 to 2. What do you do?',a:'Keep playing to the end',o:[['Quit now','quit'],['Mess up the game','quit']]},
 {q:'Kai rolls a 6 and wins. Did he cheat?',a:'No, it was the dice',o:[['Yes, he must have','blame'],['Yes, winners always cheat','blame']]}];
return{ME,KAI,END,MOODS,SAYS,WORDS,BINS,MOVES,CARDS,END_SAY,QS}})();
