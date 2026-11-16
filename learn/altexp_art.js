/* Data for the "another explanation" lab (flag_altexp.js; bundled in the main learn.js like mil_art.js so the lab file
   stays under 20 KB). IDEAS: cards for the wet-grass brainstorm ([text, could it make grass wet?, why not]).
   CASES: idea cards and clues; each clue lists the ideas it rules out and why. FAIR: the plant test rows. */
const ALTART={
SEE:'The grass is wet this morning.',FIRST:'It rained in the night.',
IDEAS:[['A sprinkler was on',1],['Dew formed in the cold night',1],['The grass is green',0,'Grass is green when it is dry too, so green cannot make it wet.'],
 ['A dog knocked over its water bowl',1],['The sun came up',0,'The sun dries grass. It does not make it wet.'],['Someone washed a car next to it',1],
 ['It is a Monday',0,'The day of the week cannot make grass wet.'],['Birds are singing',0,'Birds singing is true, but it does not explain wet grass.']],
CASES:[
 {see:'The grass is wet this morning.',ideas:['Rain in the night','A sprinkler','Dew from the cold night','A spilled dog bowl','Car washing'],keep:2,
  clues:[['Is the path wet too?','The path next to the grass is dry.',[0],'Rain would wet the path as well as the grass.'],
   ['Is it one patch or all of it?','All of the grass is wet, front and back.',[3,4],'A bowl or a car wash only wets one patch.'],
   ['Was the sprinkler on?','The sprinkler is broken. Nobody used it.',[1],'A broken sprinkler cannot wet the grass.']]},
 {see:'The puddle in the playground is much smaller by the afternoon.',ideas:['The water evaporated in the sun','It soaked into the ground','A dog drank it','Someone swept it away'],keep:0,
  clues:[['What is the ground made of?','The playground is concrete. Water cannot soak through it.',[1],'Water cannot soak into concrete.'],
   ['Any footprints or paw prints?','There are no footprints, paw prints or broom marks.',[2,3],'A dog or a broom would leave marks.'],
   ['What was the weather?','It was hot and sunny, and puddles on the roof shrank too.',[],'']]}],
FAIR:[['Light','window','cupboard',1],['Water each day','a big cup','a small cup',0],['Warmth','warm room','cold room',0],['Pot size','small pot','small pot',0],['Seeds','same packet','an old packet',0]],
CHECK:[
 {say:'Mia: “My cress grew tall because I sang to it.” What is the best way to check?',
  opts:[['Grow more cress in the same place, but do not sing to it',1],['Sing to it louder next time',0,'Louder singing still gives nothing to compare with. Cress grows anyway.'],['Ask friends if they think singing helps',0,'What people think is not a test. You need cress that was not sung to.'],['Sing again and watch it grow',0,'Cress grows even with no singing. Without cress you do not sing to, you cannot tell.']]},
 {say:'Leo: “My ice lolly melted fast because it was in a metal cup.” What is the best way to check?',
  opts:[['Put the same kind of lolly in a plastic cup, in the same place, at the same time',1],['Put a lolly in a metal cup in the fridge',0,'Now the place has changed too. The fridge, not the cup, could explain any difference.'],['Melt a lolly in a metal cup again',0,'Doing the same thing again gives nothing to compare with.'],['Use a bigger lolly in a plastic cup in the sun',0,'The lolly and the place both changed, so you cannot tell what made the difference.']]}],
bank:[
 ['The milk smells bad. Tom says the fridge is broken. Which is another explanation?','The milk is past its use-by date',[['The fridge is white','notExplain'],['There is no other explanation','firstIdea']]],
 ['Sam says his lucky socks made his team win. How could you check?','Compare lots of games with and without the socks',[['Wear the socks again and see if they win','noCompare'],['Ask the team if they like the socks','opinion']]],
 ['Jo thinks the warm kitchen made her bread go mouldy fast. Which test is fair?','Keep two of the same loaf, one somewhere warm and one somewhere cool',[['Keep one loaf warm and a different kind of loaf cool','unfair'],['Keep one loaf warm and look at it once','noCompare']]],
 ['A scientist has one idea that fits what she saw. What should she do next?','Ask what else could explain it, and look for a clue',[['Stop looking: the first idea must be right','firstIdea'],['Choose the idea she likes best','opinion']]],
 ['A bike tyre is flat. A hole is one idea. Which is another?','The valve is loose and lets air out',[['The bike is blue','notExplain'],['It must be a hole: tyres only go flat that way','firstIdea']]],
 ['The classroom plant leans towards the window. Which clue would help most?','Turn it round and see if it leans to the window again',[['Count its leaves','notExplain'],['Decide it was planted crooked','firstIdea']]]],
WHY:{notExplain:'That is true, but it would not cause what was seen. An explanation has to be able to make it happen.',
 firstIdea:'The first idea that fits is not always right. Think of other ideas, then look for a clue that tells them apart.',
 noCompare:'Doing it again gives nothing to compare with. You need the same thing without the cause you are testing.',
 opinion:'Liking an idea, or a vote, is not evidence. A test or a clue is.',
 unfair:'Two things changed at once, so either one could explain the result. Change only one thing.'}};
