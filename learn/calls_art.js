/* Data for flagcalls (animal communication, ages 7–9). Sources: von Frisch (1967) The Dance Language and Orientation of
   Bees; Hölldobler and Wilson (1990) The Ants (trail pheromones); Lloyd (1966) Studies on the flash communication system
   in Photinus fireflies; Seyfarth, Cheney and Marler (1980) Science 210, 801-803 (vervet monkey alarm calls); Harrington
   and Mech (1979) Wolf howling and its role in territory maintenance; Payne and McVay (1971) Science 173, 585-597
   (humpback whale songs); Manser (2001) meerkat alarm calls. Slips it targets: a bee's buzz carries the food message (it
   is the dance), only animals with voices communicate, any flash attracts any firefly, one alarm call means any danger,
   and animal signals are random noise rather than messages with a job. */
const ACM=(()=>{
const WAYS=['Sound','Light','Movement','Smell'];
const SENDERS=[
 {who:'A robin sings',way:0,why:{1:'The robin\'s song is a sound you hear, not a light.',2:'The robin keeps still while it sings. The message is the sound.'}},
 {who:'A firefly flashes its tail',way:1,why:{2:'The firefly\'s message is the light from its tail, not how it flies.',0:'Fireflies make no call. You see their message as light.'}},
 {who:'A honeybee dances',way:2,why:{0:'The buzz is just its wings. The bee shows the way to food with a dance: a movement.',3:'Bees do smell flowers, but the way to the food is shown by a dance.'}},
 {who:'An ant leaves a trail',way:3,why:{2:'Walking is not the message. The ant leaves a smell on the ground for others to follow.',1:'There is nothing to see. The trail is a smell.'}},
 {who:'A wolf howls',way:0,why:{2:'The wolf points its nose up, but the message is the howl: a sound.'}},
 {who:'A cat arches its back',way:2,why:{0:'A hiss can come too, but the arched back and puffed fur are body movement.'}}];
const JOBS=['Find a mate','Warn of danger','Show where food is','Bring the group together'];
const WHY=[
 {msg:'A male firefly flashes at night',job:0,slip:'His flashes tell a female of his own kind where he is, so they can pair up.'},
 {msg:'A meerkat on guard gives a loud alarm call',job:1,slip:'The guard meerkat calls out when it sees a hawk or a jackal. The others dash to their burrows.'},
 {msg:'A honeybee does a waggle dance',job:2,slip:'The dance shows other bees which way the flowers are and how far.'},
 {msg:'Wolves howl after they get split up',job:3,slip:'Howls carry a long way, so wolves that are apart can find each other again.'}];
/* firefly flash codes: each kind's males flash their own pattern (1 = short flash, 2 = long flash) */
const KINDS=[{name:'Kind A',code:[2]},{name:'Kind B',code:[1,1]},{name:'Kind C',code:[1,1,1]}];
const FLASH=[1,2,0];
/* vervet monkey alarm calls and the escape that works for each predator */
const PLACES=['Climb a tree','Hide in a bush','Stand up, look at the ground'];
const ALARM=[{call:'Leopard call: loud barks',go:0,why:{1:'A leopard can push into a bush. Up a thin tree branch is safer.',2:'Standing still on the ground leaves you where a leopard can catch you. Climb a tree.'}},
 {call:'Eagle call: short coughs',go:1,why:{0:'An eagle can grab a monkey from the top of a tree. Hide under a bush.',2:'Looking down will not help: the eagle comes from the sky. Hide in a bush.'}},
 {call:'Snake call: a chatter',go:2,why:{0:'Snakes hide in grass and can climb. Stand up and look at the ground to find it.',1:'A snake could be in the bush. Stand tall and look at the ground to spot it.'}}];
const ROBOT=[{say:'A bee buzzes to tell other bees where the flowers are.',ok:false,fix:'The buzz is just its wings. Bees show the way to flowers with a dance.'},
 {say:'A whale\'s song can travel a long way through the sea.',ok:true,fix:'Sound travels well in water, so whale songs can be heard many kilometres away.'},
 {say:'Only animals with a voice can send messages.',ok:false,fix:'Fireflies use light, bees use dances and ants use smell. None of these need a voice.'},
 {say:'A cat that arches its back and puffs its fur is sending a warning.',ok:true,fix:'The cat makes itself look big to say: keep away.'}];
const DESC=[
 'Six animal cards and four boxes: sound, light, movement, smell. Drag each card to the way its message is sent.',
 'An animal message and four jobs. Tap the job the message does.',
 'A code card shows the flash pattern of three kinds of firefly. A male flashes. Tap his kind.',
 'A vervet monkey hears an alarm call. Tap where it should go: the tree, the bush, or stand up on the ground.',
 'A robot says facts about animal messages. Buttons: Right or Slip.'];
const DONE=[
 'Sound: robin, wolf. Light: firefly. Movement: bee dance, cat. Smell: ant trail.',
 'Messages have jobs: find a mate, warn of danger, show where food is, bring the group together.',
 'Each kind of firefly has its own flash code, so a female answers only her own kind.',
 'Vervets have a different call for each hunter, and a different escape for each one.',
 'The robot slipped twice: bees dance, not buzz, and many messages need no voice.'];
const QS=[
 {q:'How does a honeybee show other bees where food is?',a:'It dances',o:[['It buzzes','buzz'],['It sings','voice']]},
 {q:'An ant finds food. How do the others find it too?',a:'They follow its smell trail',o:[['They hear it call','voice'],['They find it by luck','random']]},
 {q:'Why does a female firefly flash back to one male but not another?',a:'Only his flashes match her kind\'s code',o:[['She answers any flash','any'],['She picks the brightest at random','random']]},
 {q:'A vervet hears the eagle call. What should it do?',a:'Hide in a bush',o:[['Climb a tree','one'],['Do nothing, calls are just noise','random']]},
 {q:'Which animal sends a message with no sound at all?',a:'A firefly',o:[['A wolf','voice'],['A robin','voice']]},
 {q:'Do all alarm calls mean the same thing?',a:'No, some animals have a call for each danger',o:[['Yes, an alarm just means run','one'],['Animals do not warn each other','random']]}];
return{WAYS,SENDERS,JOBS,WHY,KINDS,FLASH,PLACES,ALARM,ROBOT,DESC,DONE,QS}})();
