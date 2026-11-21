/* Data for the personal-space flagship (flagbubble), ages 4–5. Everyone has an invisible bubble of space around them.
   Too close is nose to nose or leaning on someone; just right is about an arm away. Signs a friend wants space: stepping
   back, saying stop, turning away. Ask before a hug, and a no means stop. Bubbles change size: family may hug if both
   want to, a new child or a person you do not know gets a wave or a hello. */
const BUB=(()=>{
const NEAR=[['👃','Talking nose to nose',0],['↔️','An arm away in the line',1],['🎒','Leaning on a back in the line',0],['🧘','A gap on the carpet',1],['😝','Face right in a face',0],['👋','Waving from a step away',1]];
const BINS=[['✋','Too close'],['👍','Just right']];
const WHYN=['Nose to nose is inside the bubble. Step back to about an arm away.','An arm away is just right. Nobody is squashed.','Leaning on a back pushes into a bubble. Stand on your own feet.',
 'A gap on the carpet gives everyone room to sit and wiggle.','A face right in a face is too close. Friends need room too.','A wave from a step away says hi and keeps the bubble safe.'];
const KIDS=[['🧒','Ali'],['👧','Bea'],['👦','Cal'],['🧒','Dot']];
const START=[.25,.35,.45,.55],GOOD=[.12,.37,.63,.88];
const SIGNS=[['🔙','Steps back',1],['✋','Says: Stop!',1],['🙈','Turns away',1],['🤗','Says: Hug?',0],['😄','Smiles, waves you in',0],['🖐️','Holds up a high five',0]];
const SNO={'Says: Hug?':'Your friend is asking for a hug. That is not asking for space.','Smiles, waves you in':'A smile and a wave in mean come and play. That is not asking for space.','Holds up a high five':'A high five hand says come and slap it. That is not asking for space.'};
const ASKS=[['🐻','Bear','Yes, hug!','hug','🤗 Hug Bear'],['🐱','Cat','No, thank you.','stop','🙂 Say okay and step back'],['🐶','Dog','A high five instead?','five','🖐️ Give a high five']];
const ODD=[['🤗 Hug anyway','push'],['🔁 Ask again and again','nag'],['✊ Grab a hand','grab']];
const PEOPLE=[['👩','Mum at home',0],['🧑‍🦱','A new child at the park',1],['👴','Grandad, if we both want',0],['🧑‍💼','A person in the shop',1],['👧','My sister, if she says yes',0],['🧔','A man at the bus stop',1]];
const WAYS=[['🤗','Hug if we both want'],['👋','Wave or say hi']];
const WHYP=['Mum is family. A hug is fine if you both want it.','You do not know the new child yet. Wave and say hi first.','Grandad is family. Ask, and hug if you both want to.',
 'You do not know the shop person. A wave or a hello is kind.','Your sister said yes, so a hug is fine.','You do not know the man at the bus stop. Keep a big bubble. Wave or say hi.'];
const QS=[
 {q:'You are in the line. How close do you stand?',a:'About an arm away',o:[['Right up on their back','close'],['Leaning on them','close']]},
 {q:'Your friend steps back from you. What does it mean?',a:'They want more space',o:[['Nothing, step closer','sign'],['They want a hug','sign']]},
 {q:'You want to hug your friend. What do you do first?',a:'Ask: Can I have a hug?',o:[['Just hug them','push'],['Hug, then ask','push']]},
 {q:'Your friend says no to a hug. What now?',a:'Say okay and stop',o:[['Hug anyway, we are friends','push'],['Ask again and again','nag']]},
 {q:'Someone stands too close to you. What can you say?',a:'Please give me some space',o:[['Nothing, I must not say','mine'],['Push them hard','grab']]},
 {q:'A new child at the park. How do you say hello?',a:'Wave and say hi',o:[['Hug them tight','size'],['Stand nose to nose','close']]}];
return{NEAR,BINS,WHYN,KIDS,START,GOOD,SIGNS,SNO,ASKS,ODD,PEOPLE,WAYS,WHYP,QS}})();
