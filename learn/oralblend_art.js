/* Data for flagoralblend (oral blending, ages 3–4; Letters and Sounds Phase One, Aspect 7 "Oral blending and
   segmenting": "robot talk", sound-talk I spy, blending with body actions; Development Matters 2021 Literacy 3–4
   "develop their phonological awareness, so that they can count or clap syllables in a word"; Reception "blend sounds
   into words, so that they can read short words"). Order follows the larger-to-smaller units children hear first
   (Anthony and Lonigan 2004; Goswami and Bryant 1990): two words joined, then beats (syllables), then onset and rime,
   then single sounds. No letters are needed: a grown-up says the sounds and the child listens and finds the picture.
   Slips it targets: sounds left apart, choosing by the first part only, missing the middle or last sound, mixing up the
   order, blending before all the sounds are said, and thinking you need to read letters to blend. */
const OBL=(()=>{
/* 1. two whole words pushed together make one new word */
const JOIN=[{a:'rain',b:'bow',w:'rainbow',e:'🌈'},{a:'cup',b:'cake',w:'cupcake',e:'🧁'},{a:'sun',b:'flower',w:'sunflower',e:'🌻'}];
/* 2. beats (syllables): robot claps each beat; pick the picture. o = [emoji, word, slip] */
const BEAT=[{say:['ba','na','na'],w:'banana',e:'🍌',o:[['🎈','balloon','first'],['🧺','basket','first']]},
 {say:['rab','bit'],w:'rabbit',e:'🐰',o:[['🌈','rainbow','first'],['🤖','robot','first']]},
 {say:['el','e','phant'],w:'elephant',e:'🐘',o:[['🥚','egg','short'],['✉️','envelope','first']]}];
/* 3. robot talk: onset and rime first (c … at), then one sound at a time */
const TALK=[{say:['c','at'],w:'cat',e:'🐱',o:[['🎩','hat','first'],['🐄','cow','last']]},
 {say:['h','e','n'],w:'hen',e:'🐔',o:[['🖊️','pen','first'],['🎩','hat','middle']]},
 {say:['s','u','n'],w:'sun',e:'☀️',o:[['🧦','sock','middle'],['🚌','bus','order']]}];
/* 4. head, tummy, toes: one sound on each, then clap to blend. fish has 4 letters but 3 sounds */
const BODY=[{s:['d','o','g'],w:'dog',e:'🐶',guess:'duck or dig'},{s:['f','i','sh'],w:'fish',e:'🐟',guess:'fan or fig'}];
const PARTS=[{k:'head',n:'head',e:'🙂'},{k:'tummy',n:'tummy',e:'👕'},{k:'toes',n:'toes',e:'🦶'}];
/* 5. I spy in robot talk: a room with six things; each round has a near miss */
const ROOM=[['bed','🛏️'],['bag','👜'],['cup','☕'],['cap','🧢'],['duck','🦆'],['sock','🧦']];
const SPY=[{say:['b','a','g'],w:'bag',near:{bed:'middle'}},{say:['c','u','p'],w:'cup',near:{cap:'middle'}},{say:['d','u','ck'],w:'duck',near:{cup:'first',sock:'first'}}];
/* live descriptions of each scene for screen readers */
const DESC=['Robot says two words with a gap. Push the second word along until it touches the first, and hear the new word.',
 'Robot claps a word in beats. Give Robot the picture that matches all the beats.',
 'Robot talks in sounds. Give Robot the toy that matches all the sounds.',
 'A child with a head, tummy and toes. Tap one sound onto each, in order, then clap to blend the word.',
 'A room with six things in it. Robot spies one in robot talk. Tap the thing Robot means.',
 'Challenge.'];
const DONE=['Two words pushed together, no gap: rainbow, cupcake, sunflower!','You put all the beats together to find each word.',
 'You heard every sound, right to the end, and found each toy.','Head, tummy, toes, clap: dog and fish. You blended the sounds!',
 'You found all three things in robot talk.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{say:['c','a','t'],q:'Robot says c-a-t. Which is it?',a:'🐱 cat',o:[['🧢 cap','last'],['🎩 hat','first']]},
 {say:['p','ig'],q:'Robot says p … ig. What is it?',a:'🐷 pig',o:[['🖊️ pen','first'],['p and ig, two things','apart']]},
 {say:['d'],q:'Robot says d … Can you say the word yet?',a:'No, wait for all the sounds',o:[['Yes, it is dog','early'],['Yes, it is duck','early']]},
 {say:['b','e','d'],q:'Robot says b-e-d. Which is it?',a:'🛏️ bed',o:[['👜 bag','middle'],['🔔 bell','last']]},
 {say:['ba','na','na'],q:'Robot says ba-na-na. Which is it?',a:'🍌 banana',o:[['🎈 balloon','first'],['🐻 bear','short']]},
 {q:'Do you need to read letters to do robot talk?',a:'No, just listen with your ears',o:[['Yes, look at the letters','letters'],['Yes, say see-ay-tee','names']]},
 {say:['n','u','s'],q:'Robot says n-u-s. Is that bus?',a:'No, bus is b-u-s',o:[['Yes, it has the same sounds','order'],['Yes, it sounds like bus','order']]}];
return{JOIN,BEAT,TALK,BODY,PARTS,ROOM,SPY,DESC,DONE,QS}})();
