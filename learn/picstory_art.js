/* Data for the telling-a-story-from-picture-cards flagship (flagpicstory), ages 3–4. Development Matters (2021)
   Communication and Language 3–4: "use a wider range of vocabulary", "tell a long story"; Reception: "describe events in
   some detail", "retell the story, once they have developed a deep familiarity with the text"; Literacy Reception:
   "anticipate, where appropriate, key events in stories". Each card is [picture, short caption]. */
const PICS=(()=>{
const BALLOON=[['🎈','Ben gets a balloon','Ben needs the balloon before the wind can blow it.'],['💨','The wind blows it','The wind blows it after Ben gets it, and before he is sad.'],['😢','Ben is sad','Ben is sad at the end, when the balloon has gone.']];
const PUDDLE=[['☁️','Grey clouds come'],['🌧️','It rains'],['💧','Big puddles'],['🥾','Kim jumps in']];
const TIMEW=['First','Next','Then','Last'];
const EGG=[['🥚','An egg'],['🐣','It cracks'],['🐥','A chick!']];
const MIXUPS=[{cards:[['🧦','Socks on'],['👟','Shoes on'],['🚪','Go out']],shown:[1,0,2],why:'Socks go on before shoes.'},
 {cards:[['🧱','Build a tower'],['💥','It falls'],['🧹','Tidy up']],shown:[0,2,1],why:'The tower falls before you tidy up.'},
 {cards:[['🥣','Mix the cake'],['🔥','Bake it'],['🎂','Eat it']],shown:[2,1,0],why:'You mix first and eat last.'}];
const ENDS=[{cards:[['🌱','Ana waters a plant'],['🌤️','The sun comes out'],['📏','It grows tall']],opts:[['🌻','A big flower','ok'],['🌱','Ana waters a plant','again'],['🚗','A red car','off']]},
 {cards:[['🐶','Pip finds mud'],['🟫','Pip rolls in it'],['🛁','Bath time']],opts:[['✨','Pip is clean','ok'],['🐶','Pip finds mud','again'],['🚀','A rocket','off']]}];
const QS=[
 {q:'Which card comes first: the chick or the egg cracking?',a:'The egg cracking',o:[['The chick','swap'],['It does not matter','same']]},
 {q:'Which word starts a story?',a:'First',o:[['Last','end'],['Then','mid']]},
 {q:'Socks on, shoes on, go out. Which word goes with go out?',a:'Last',o:[['First','end'],['Next','mid']]},
 {q:'You swap two cards. Is it the same story?',a:'No, the order changes what happens',o:[['Yes, same pictures, same story','same'],['Yes, if the pictures are nice','same']]},
 {q:'Mix the cake, bake it, ... What comes last?',a:'Eat the cake',o:[['Mix the cake','again'],['Go to the moon','off']]},
 {q:'Build a tower, tidy up, it falls. What is wrong?',a:'It falls before you tidy up',o:[['Nothing is wrong','same'],['Build it last','swap']]}];
return{BALLOON,PUDDLE,TIMEW,EGG,MIXUPS,ENDS,QS}})();
