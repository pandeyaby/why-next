/* Data for the ice and snow lab (flag_berg.js; bundled in learn.js so the lab file stays small).
   Facts: snow is ice crystals and a snow crystal has six arms (hexagonal ice); ice is about 0.92 times as dense as fresh
   water and about 0.9 times as dense as sea water, so floating ice has roughly nine tenths of its volume under water. */
const BERGART=(()=>{
/* each round: three flakes [arms, branch style]; the six-armed one is right */
const FLAKES=[[[6,1],[4,1],[8,0]],[[5,2],[6,2],[3,1]],[[8,1],[7,0],[6,0]]];
const SORT=[['Snow',0],['Rain',1],['An icicle',0],['A puddle',1],['A pebble',2],['An iceberg',0],['The sea',1],['A hailstone',0],['A glass marble',2]];
const BINS=['Solid water (ice)','Liquid water','Not water'];
/* things to drop: [name, floats?, size] */
const DROP=[['Ice cube',1,.5],['Pebble',0,.45],['Big ice block',1,1],['Coin',0,.3]];
/* each round: icebergs [tip x (0–1), how far the hidden part reaches left, and right]; ship lanes at .15, .5 and .85 */
const LANES=[.15,.5,.85];
const BERGS=[[[.5,.42,.2]],[[.3,.05,.55]],[[.15,.13,.18],[.85,.2,.13]]];
const KIDS=[['Ice is…',[['Ali','Ice is not water.','Ice is water. It is frozen, so it is solid.'],['Bea','Ice is frozen water.',''],['Cal','Ice is a kind of glass.','Glass is not water. Ice melts back into water; glass does not.']]],
 ['A big iceberg…',[['Dev','sinks, because it is so big.','Big ice floats too. Size does not make ice sink.'],['Eli','floats with most of it under the water.',''],['Fay','floats on top, all of it dry.','Only the tip is above the water. Most of it is hidden.']]],
 ['When snow melts…',[['Gus','it turns into water.',''],['Hana','it is gone, there is nothing left.','The snow is still there as water. Look for the puddle.'],['Ivy','it turns into ice.','Snow is already ice. When it melts it turns into water.']]]];
const QZ=[['What is snow made of?','Tiny bits of ice',[['White powder','powder'],['Bits of cloud','cloud']]],
 ['How many arms does a snowflake have?','6',[['4','arms'],['8','arms']]],
 ['You drop an ice cube in a glass of water. What happens?','It floats',[['It sinks','sink'],['It sits on top, all dry','dry']]],
 ['How much of an iceberg is under the water?','Most of it',[['A tiny bit','tip'],['None of it','dry']]],
 ['Is an icicle made of water?','Yes, frozen water',[['No, it is glass','glass'],['No, it is plastic','glass']]],
 ['A ship sees the top of an iceberg. Where is the danger?','Under the water, all around it',[['Only the top it can see','tip'],['Nowhere, ice is soft','soft']]]];
const WHY={powder:'Snow looks like powder, but each bit is a tiny ice crystal. Snow is frozen water.',cloud:'Snow falls from clouds, but it is made of ice crystals, not cloud.',arms:'Look closely: every snow crystal has six arms.',
 sink:'Ice floats. It is lighter than the same amount of water.',dry:'Ice floats low in the water. Most of it is under the water.',tip:'Only the tip shows. Most of the iceberg is hidden under the water.',glass:'An icicle is frozen water. In the sun it drips and melts.',soft:'Ice is hard. A ship that hits the hidden part can be badly hurt.'};
return{FLAKES,SORT,BINS,DROP,LANES,BERGS,KIDS,QZ,WHY}})();
