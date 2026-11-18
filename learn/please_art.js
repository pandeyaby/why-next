/* Data for the please-and-thank-you flagship (flagplease), ages 2–3. Asking moments get "please", getting or being
   helped gets "thank you". Friends' moods show how grabbing, shouting and kind asking feel to the other child. The
   thank-you hunt mixes presents with help (door, plaster, cereal) and two moments with nobody to thank. The last step
   shows that please is kind words, not a magic word: the answer can be yes, not now, or wait for your turn. */
const PLZ=(()=>{
const SORT=[['🥛','I want milk',0],['📖','Gran gives me a book',1],['🛝','I want a go on the slide',0],['👟','Dad helps with my shoes',1],['🖍️','I want the red crayon',0],['🚗','Sam gives me a car',1]];
const SAYS=[['🙏','Please','asking'],['💛','Thank you','getting']];
const WHY=['You are asking for milk, so you say please.','Gran gave you something, so you say thank you.','You are asking for a go, so you say please.',
 'Dad helped you, so you say thank you. Help counts too.','You are asking for the crayon, so you say please.','Sam gave you a car, so you say thank you.'];
const STORY=[[['🙋','Apple, please?'],['🍎','Mum gives it'],['😊','Thank you!']],[['🙋','Help, please?'],['🧥','Dad zips my coat'],['😊','Thank you!']]];
const SHOW=[2,0,1];
const PALS=[['🐻','Bear','⚽','the ball'],['🐱','Cat','🖍️','the crayon'],['🐶','Dog','🛝','a go on the slide']];
const WAYS=[['✋','Grab it','grab'],['📢','Shout: Mine!','shout'],['🙏','Ask: Can I have it, please?','kind']];
const MOOD={grab:'😢',shout:'😠',kind:'😊',wait:'🙂'};
const HUNT=[['🎁','Gran gives a present',1],['🚪','Dad holds the door',1],['🧸','I get my own teddy',0],['🩹','Nurse puts on a plaster',1],['🌧️','It starts to rain',0],['🥣','Grandad pours my cereal',1]];
const HNO={'I get my own teddy':'You got your own teddy. Nobody gave it or helped, so there is nobody to thank.','It starts to rain':'Rain just happens. Nobody did it for you, so there is nobody to thank.'};
const ASKS=[['🍪','Biscuit, please?','Not now. It is nearly dinner.','Okay.'],['🧱','Can I play, please?','Yes, you can!','Thank you!'],['🛝','Slide, please?','Wait. It is Sam\'s turn.','I will wait.']];
const ODD=[['PLEASE PLEASE!','magic'],['Cry and stamp','cross'],['Grab it anyway','grab']];
const QS=[
 {q:'You want a drink. What do you say?',a:'Drink, please',o:[['Thank you, drink','order'],['Drink! Now!','grab']]},
 {q:'Gran gives you a cake. What do you say?',a:'Thank you',o:[['Please','order'],['Nothing, just eat it','any']]},
 {q:'Dad helps you put on your shoes. Do you say thank you?',a:'Yes, thank you for helping',o:[['No, it is not a present','thing'],['No, shoes are not fun','any']]},
 {q:'You said please. Mum says not now. What next?',a:'Say okay and wait',o:[['Say please again, louder','magic'],['Grab it anyway','grab']]},
 {q:'Bear has the ball. You want a go. What do you do?',a:'Ask: Can I have a go, please?',o:[['Grab the ball','grab'],['Say thank you first','order']]},
 {q:'Sam gives you a car. When do you say thank you?',a:'When I get the car',o:[['Before Sam gives it','order'],['Only on my birthday','thing']]}];
return{SORT,SAYS,WHY,STORY,SHOW,PALS,WAYS,MOOD,HUNT,HNO,ASKS,ODD,QS}})();
