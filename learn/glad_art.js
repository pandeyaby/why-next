/* Data for the noticing-good-things (gratitude) flagship (flagglad), ages 8–9. PSHE Association Programme of Study
   (2020) KS2 Health and Wellbeing, mental health: everyday things that affect feelings and simple strategies that
   help; DfE Relationships and Health Education (2019): "simple self-care techniques", "a varied range of
   emotions"; NHS Five Ways to Wellbeing ("take notice"); Emmons and McCullough (2003) counting-blessings studies. */
const GLAD=(()=>{
const DAY=[['🌞','Sunny walk',1],['✏️','Lost my pencil',0],['🍎','Dad packed lunch',1],['🌧️','Rain at break',0],
 ['🤝','Leo let me play',1],['🤕','Grazed my knee',0],['📚','Help with sums',1],['🐦','Saw a robin',1]];
const HELP=[['🍎','My packed lunch','Dad'],['🤝','Joining the game','Leo'],['📚','Getting my sums right','Ms Cole'],['🚌','Getting home safe','The bus driver']];
const PEOPLE=['Dad','Leo','Ms Cole','The bus driver'];
const SIZES=[['🎂','My birthday party',0],['🧦','Warm socks on a cold day',1],['🏆','Winning the class prize',0],['😊','A friend smiled at me',1],['👶','A new baby cousin',0],['🌈','Seeing a rainbow',1]];
const BINS2=[['⭐','Big good thing'],['✨','Small good thing']];
const BOTH=[{s:'⚽ We lost the football match.',opts:[['I am sad we lost, and glad Ava cheered me up.','ok'],['I am not sad at all. Everything is great!','fake'],['Nothing good ever happens to me.','none']]},
 {s:'🤒 I was ill and missed the trip.',opts:[['I feel left out. I am glad Gran read to me.','ok'],['Being ill was the best day ever!','fake'],['I should not feel sad if I am thankful.','ban']]},
 {s:'🐹 My hamster died.',opts:[['I miss him. I am glad we had him for two years.','ok'],['I must smile and be thankful, not cry.','ban'],['Nobody cares about me.','none']]}];
const THANKS=[{who:'Ms Cole',what:[['helped me with my sums','ok'],['is nice','vague'],['gave the class a test','off']],how:[['Now I can do column adding.','ok'],['Thanks for everything.','vague'],['You owe me.','rude']]},
 {who:'Leo',what:[['let me join your game','ok'],['is cool','vague'],['beat me at cards','off']],how:[['I felt happy, not left out.','ok'],['Thanks or whatever.','vague'],['Now do my homework.','rude']]}];
const QS=[
 {q:'Do small good things count?',a:'Yes, small things count too',o:[['No, only big things count','big'],['Only if they cost money','big']]},
 {q:'You lost the match and feel sad. What fits gratitude?',a:'Feel sad and notice one good thing too',o:[['Pretend you are not sad','fake'],['Say nothing good ever happens','none']]},
 {q:'Your lunch was in your bag. Who made that happen?',a:'Someone packed it, and others grew and sold the food',o:[['Nobody, it was just there','nobody'],['Only me','nobody']]},
 {q:'Which thank you is best?',a:'Thank you for helping me with my sums',o:[['Thanks for everything','vague'],['Thanks, I guess','vague']]},
 {q:'Is it wrong to feel sad if you are thankful?',a:'No, both feelings can be there',o:[['Yes, thankful people are never sad','ban'],['Yes, you must hide sad feelings','fake']]},
 {q:'Gran says: three good things a night for a week. How many is that?',a:'21',o:[['10','sum'],['3','sum']]}];
return{DAY,HELP,PEOPLE,SIZES,BINS2,BOTH,THANKS,QS}})();
