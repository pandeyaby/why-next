/* Data for flagnonex (testing an idea with examples and non-examples, ages 7–9). Sources: EEF (2021) Metacognition
   and self-regulated learning guidance report; Frayer, Frederick and Klausmeier (1969) concept-attainment model;
   Tennyson and Park (1980) on matched examples and non-examples; Winston (1970) 'near miss' learning; Hershkowitz
   (1989) prototype triangles; DfE NC 2013 Year 3-4 geometry and Year 2 animals. Slips it targets: judging by the
   typical picture (an upside-down or thin triangle is 'not a triangle'), judging by surface looks (a whale is a fish,
   a bat is a bird), counting a near miss as an example, trusting one example, and keeping a definition that lets a
   non-example in or shuts an example out. */
const NEX=(()=>{
const SHAPES=[
 {d:'tri',p:[[.5,.12],[.88,.86],[.12,.86]],ok:1,n:'a triangle pointing up'},
 {d:'tri',p:[[.12,.14],[.88,.14],[.5,.88]],ok:1,n:'an upside-down triangle'},
 {d:'open',p:[[.5,.12],[.88,.86],[.12,.86]],ok:0,n:'3 sides with a gap',miss:'closed'},
 {d:'tri',p:[[.14,.1],[.86,.9],[.14,.9]],ok:1,n:'a tall thin triangle with a square corner'},
 {d:'curve',p:[[.5,.12],[.88,.86],[.12,.86]],ok:0,n:'3 sides, one of them curved',miss:'straight'},
 {d:'quad',p:[[.14,.2],[.86,.2],[.86,.84],[.14,.84]],ok:0,n:'a square, 4 sides',miss:'three'}];
const FEATS=[['3 sides','three',1],['Sides are straight','straight',1],['Closed, no gaps','closed',1],['Points upwards','up',0],['Sides the same length','equal',0],['Big','big',0]];
const ANIMALS=[{n:'Dog',ok:1},{n:'Shark',ok:0,why:'A shark is a fish. Its babies do not drink milk.'},{n:'Whale',ok:1,near:1,why:'A whale lives in the sea, but it breathes air and feeds its baby milk.'},
 {n:'Bat',ok:1,near:1,why:'A bat flies, but it has fur and feeds its babies milk.'},{n:'Penguin',ok:0,near:1,why:'A penguin is a bird. It has feathers and lays eggs; its chicks do not drink milk.'},{n:'Frog',ok:0,why:'A frog is an amphibian. Its tadpoles do not drink milk.'}];
const BIRDS=[{n:'Robin',flies:1,feathers:1},{n:'Bat',flies:1,feathers:0},{n:'Penguin',flies:0,feathers:1},{n:'Eagle',flies:1,feathers:1}];
const FIXES=[['A bird is an animal with feathers',1],['A bird is an animal that flies',0],['A bird is an animal with wings',0]];
const DESC=[
 'Six shapes. Two boxes: Triangle, and Not a triangle.',
 'Three near misses: shapes that are nearly triangles. Buttons for the feature each one is missing.',
 'Six features of triangles. Two boxes: Must have, and Does not matter.',
 'Six animals. Two boxes: Mammal, and Not a mammal. Mammals feed their babies milk.',
 'The rule says a bird is an animal that flies. Four animal cards to test it.'];
const DONE=[
 'Turned, thin or with a square corner, a triangle is still a triangle. The near misses were not: a gap, a curve, a 4th side.',
 'Each near miss broke one must-have: closed, straight sides, exactly 3 sides. Near misses show you what matters.',
 'Must have: 3 straight sides, closed. Which way it points, its size and equal sides do not matter.',
 'Whale and bat are mammals even though they swim or fly. Penguin is not, even though it looks a bit like a whale swimming.',
 'Bat flies but is not a bird, and penguin is a bird that cannot fly. Feathers is the must-have that fits every bird.'];
const QS=[
 {q:'A triangle is turned so it points down. Is it still a triangle?',a:'Yes, which way it points does not matter',o:[['No, triangles point up','proto'],['Only if its sides are equal','proto']]},
 {q:'A shape has 3 straight sides but a gap at one corner. Is it a triangle?',a:'No, it is a near miss: not closed',o:[['Yes, it has 3 sides','nearmiss'],['Yes, it nearly is','nearmiss']]},
 {q:'A whale lives in the sea. Is it a fish?',a:'No, it is a mammal: it feeds its baby milk',o:[['Yes, it swims','surface'],['Yes, it lives in water','surface']]},
 {q:'Sam says: "A dog has fur, so everything with fur is a dog." What is wrong?',a:'One example is not enough; a cat has fur too',o:[['Nothing, he is right','one'],['Dogs do not have fur','one']]},
 {q:'"A bird is an animal that flies." Which card breaks this rule?',a:'A bat: it flies but is not a bird',o:[['A robin','loose'],['An eagle','loose']]},
 {q:'Why look at non-examples when learning a new word?',a:'They show where the idea stops',o:[['They are not useful','nonex'],['They are just wrong answers','nonex']]}];
return{SHAPES,FEATS,ANIMALS,BIRDS,FIXES,DESC,DONE,QS}})();
