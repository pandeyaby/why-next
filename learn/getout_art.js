/* Data for flaggetout (fire safety: get out and stay out, ages 4–5; PSHE Association Programme of Study 2020, KS1 H
   "how to keep safe at home" and "what to do in an emergency, including calling 999"; UK fire and rescue service advice
   for families (GOV.UK Fire Kills / London Fire Brigade): a smoke alarm means get out now, never hide, get down low
   under smoke where the air is cleaner, do not stop for toys or pets, go to the family meeting place, never go back
   inside, and call 999 once you are out. Slips it targets: hiding under a bed or in a cupboard, stopping for things,
   standing tall in smoke, waiting next to the house, going back in for a pet or toy, and not knowing the number. */
const GTO=(()=>{
/* scene 1: the alarm beeps; three first moves, one right */
const FIRSTS=[{t:'🏃 Shout “Fire!” and get out',k:'out'},{t:'🛏️ Hide under the bed',k:'hide'},{t:'🧸 Find my toys first',k:'toys'},{t:'🔍 Go and look for the fire',k:'look'}];
/* scene 2: x, y as fractions of the stage. Smoke fills everything above SMOKE. Toys sit on the floor path. */
const SMOKE=.56,KID0={x:.1,y:.84},DOOR={x:.9,y:.78};
const TOYS=[{e:'🧸',t:'teddy',x:.42,y:.66},{e:'📱',t:'tablet',x:.66,y:.68}];
const LOW=[{x:.3,y:.88},{x:.55,y:.88},{x:.8,y:.86},{x:.9,y:.8}],TALL=[{x:.2,y:.6},{x:.35,y:.4}],STOP=[{x:.28,y:.76},{x:.42,y:.66}];
/* scene 3: the family and the places outside. good=1 is the meeting place everyone agreed. */
const FAM=[{e:'🧒',n:'Me'},{e:'👨',n:'Dad'},{e:'👵',n:'Gran'}];
const SPOTS=[{e:'🌳',t:'Big tree: our meeting place',x:.8,y:.3,good:1},
 {e:'🪟',t:'Next to the window',x:.42,y:.3,why:'Too close. Heat and smoke come out of the house. Go to the meeting place.'},
 {e:'🛖',t:'Hide in the shed',x:.8,y:.74,why:'Nobody will know you are safe in the shed. Go to the meeting place where everyone looks.'}];
/* scene 4: Kitty is still inside. Pick the two safe things. */
const STAY=[{t:'Run back in for Kitty',why:'Never go back in. Fire grows very fast. Firefighters will look for Kitty.'},
 {t:'Tell a firefighter Kitty is inside',good:1},
 {t:'Open the door and call Kitty',why:'Do not go back to the house. An open door lets the fire grow. Stay out.'},
 {t:'Stay at the meeting place',good:1}];
/* scene 5: the 999 call (UK). Keys, then the two questions the operator asks. */
const KEYS=['1','2','3','4','5','6','7','8','9','*','0','#'],NUM='999';
const SERVICE=[{t:'🚒 Fire',good:1},{t:'🚓 Police',why:'Police help when someone is hurting people or taking things. For a fire, ask for Fire.'},{t:'🚑 Ambulance',why:'An ambulance helps someone who is hurt or poorly. For a fire, ask for Fire.'}];
const WHERE=[{t:'🏠 12 Oak Road',good:1},{t:'🤷 I do not know',why:'Firefighters need to know where to come. Say your road and door number. Practise it with a grown-up.'}];
/* live descriptions of each scene for screen readers */
const DESC=['Bedroom at night. A smoke alarm on the ceiling. Tap it to hear it, then choose what to do.',
 'A hall full of grey smoke up high. Clean air is near the floor. Drag the child to the door.',
 'Outside the house. A big tree is the meeting place. Drag each person there.',
 'At the meeting place. Kitty the cat is still inside. Tap the two safe things.',
 'Outside, a grown-up’s phone. Tap 9, 9, 9, then answer the questions.',
 'Challenge.'];
const DONE=['Yes: the beep means get out now. Never hide.','Out! You stayed low under the smoke and left the toys.',
 'Everyone is at the meeting place, so we know they are safe.','Stay out. Firefighters go in, you never do.','999, Fire, and where you live. Help is coming.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'The smoke alarm beeps at night. What do you do?',a:'Shout “Fire!” and get out',o:[['Hide under the duvet','hide'],['Get my toys first','toys']]},
 {q:'There is smoke in the hall. How do you go?',a:'Down low, under the smoke',o:[['Stand up tall and run','tall'],['Go back to bed','hide']]},
 {q:'You are outside. Teddy is still inside. What now?',a:'Stay out and tell a grown-up',o:[['Run in and get Teddy','back'],['Open the door to look','back']]},
 {q:'Where do you go when you are out?',a:'Our meeting place',o:[['Next to the front door','close'],['Hide in the shed','shed']]},
 {q:'Which number do you call for a fire in the UK?',a:'999',o:[['123','number'],['111','number']]},
 {q:'What does the smoke alarm’s loud beep mean?',a:'Get out now',o:[['Time to wake up and play','meaning'],['Go and find the fire','look']]}];
return{FIRSTS,SMOKE,KID0,DOOR,TOYS,LOW,TALL,STOP,FAM,SPOTS,STAY,KEYS,NUM,SERVICE,WHERE,DESC,DONE,QS}})();
