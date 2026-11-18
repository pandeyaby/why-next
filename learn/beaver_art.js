/* Data for flagbeaver (how plants and animals change their surroundings to meet their needs, ages 5–6). Sources:
   NGSS K-ESS2-2 (construct an argument supported by evidence for how plants and animals, including humans, can change
   the environment to meet their needs; clarification: a squirrel digs in the ground to hide its food, tree roots can
   break concrete); NGSS K-LS1-1 and K-ESS3-1 (needs of living things); RSPB, The Wildlife Trusts and the Beaver Trust on
   beaver dams, ponds and lodges; Natural History Museum and the Earthworm Society of Britain on worm burrows and casts;
   Royal Horticultural Society on tree roots lifting paving; Ramey et al. (2013, Journal of Zoology) on elephants
   digging for water in dry riverbeds. Slips it targets: only animals change places (plants are too soft), a dam stops
   the water so the stream dries up everywhere, animals change places for no reason or to be naughty, and guessing who
   made a change without looking at the clues. */
const BVR=(()=>{
const SPOTS=[{k:'stream',n:'Stream',made:'a dam'},{k:'field',n:'Field',made:'a burrow'},{k:'tree',n:'Tree',made:'a nest'},{k:'soil',n:'Soil',made:'tunnels'}];
const ANIMALS=[{n:'Beaver',to:'stream'},{n:'Rabbit',to:'field'},{n:'Bird',to:'tree'},{n:'Worm',to:'soil'}];
const MISS={Beaver:'A beaver builds in water. It piles sticks and mud across a stream.',Rabbit:'A rabbit digs. It makes a burrow under a field.',
 Bird:'A bird builds a nest up high, in a tree or a bush.',Worm:'A worm wriggles through soil and makes tunnels.'};
const NEEDS=['Safe home','Food','Water'];
const JOBS=[{n:'Bird builds a nest',s:'Nest',to:0,why:'A nest keeps the eggs and chicks safe. It is a home.'},
 {n:'Squirrel hides nuts in the ground',s:'Hidden nuts',to:1,why:'The squirrel digs them up to eat in winter. That is food.'},
 {n:'Elephant digs in a dry river',s:'Water hole',to:2,why:'The elephant digs a hole until water comes up to drink.'},
 {n:'Rabbit digs a burrow',s:'Burrow',to:0,why:'The burrow hides the rabbit from foxes. It is a safe home.'},
 {n:'People plant a vegetable patch',s:'Vegetables',to:1,why:'People grow carrots and beans to eat. That is food.'},
 {n:'People dig a well',s:'Well',to:2,why:'A well reaches water under the ground for people to drink.'}];
const WHO=['Beaver','Rabbit','Worm','Tree roots'];
const CLUES=[{k:'stump',n:'A tree stump chewed to a point, with wood chips',who:0,why:'Big front teeth chew trees down. That is a beaver.'},
 {k:'hole',n:'A round hole in a field with a heap of soil',who:1,why:'A rabbit digs a hole and kicks the soil out into a heap.'},
 {k:'cast',n:'Little curly piles of soil on the grass',who:2,why:'Worms push soil up out of their tunnels. The curly piles are worm casts.'},
 {k:'path',n:'A path lifted up and cracked next to a tree',who:3,why:'Growing roots get thicker and push the path up until it cracks.'}];
const DESC=[
 'A stream flows across. A beaver has 4 sticks to pile across it. Drag each stick onto the dam spot, or tap a stick and then the spot.',
 'Four places: stream, field, tree and soil. Four animals to drag to the place each one changes.',
 'A tree grows next to a hard path. Its roots are under the path. Tap Grow to add a year.',
 'Six changes. Three boxes: safe home, food and water. Which need does each change meet?',
 'A clue picture. Who made this change? Four answers: beaver, rabbit, worm or tree roots.'];
const DONE=[
 'The dam held the water back, so a deep pond filled up behind it. The beaver changed the stream to make a safe home.',
 'Each animal changed a place: a dam in the stream, a burrow in the field, a nest in the tree and tunnels in the soil.',
 'Roots grow thicker every year and push hard. Plants change places too, even hard paths.',
 'Every change met a need: a safe home, food or water. Animals and people change places to get what they need.',
 'You used clues to say who made each change: chewed wood, a heap of soil, worm casts and a cracked path.'];
const QS=[
 {q:'A beaver builds a dam across a stream. What happens behind the dam?',a:'The water backs up into a pond',o:[['The stream dries up','dam'],['Nothing changes','dam']]},
 {q:'Can a plant change a place?',a:'Yes, tree roots can crack a path',o:[['No, plants are too soft','plant'],['No, only animals can','plant']]},
 {q:'Why does a squirrel bury nuts?',a:'To eat them later, in winter',o:[['To be naughty','need'],['For no reason','need']]},
 {q:'You see a tree chewed to a point by a stream. Who did it?',a:'A beaver',o:[['A rabbit','clue'],['The wind','clue']]},
 {q:'Why do people dig a well?',a:'To get water to drink',o:[['To make a home','need'],['To grow food','need']]},
 {q:'Little curly piles of soil are on the grass. Who made them?',a:'Worms, pushing soil up from their tunnels',o:[['A bird','clue'],['Tree roots','clue']]}];
return{SPOTS,ANIMALS,MISS,NEEDS,JOBS,WHO,CLUES,DESC,DONE,QS}})();
