/* Data for flagsolidbuild (Building with 3-D shapes, ages 6–7). Sources: Common Core State Standards for Mathematics,
   Grade 1 1.G.A.2 ("compose two-dimensional shapes ... or three-dimensional shapes (cubes, right rectangular prisms, right
   circular cones, and right circular cylinders) to create a composite shape, and compose new shapes from the composite
   shape"); DfE (2013) National Curriculum mathematics, Year 1 and Year 2 geometry (recognise and name common 3-D shapes,
   including cuboids, cubes, cylinders and cones; identify 2-D shapes on the surface of 3-D shapes). NCETM Year 1 and
   Year 2 guidance: children call solids by flat names (a cone is a "triangle", a cylinder a "circle"), mix up cubes and
   cuboids, and count only the cubes they can see. Each shape: w and h in block units, a fill colour and a short "how
   to spot it" line that is said after a wrong tap. */
const SBLD=(()=>{
const SH={
 cube:{n:'cube',w:1,h:1,col:'#fca5a5',spot:'A cube has 6 flat faces, and every face is the same square.'},
 cuboid:{n:'cuboid',w:1.7,h:.75,col:'#93c5fd',spot:'A cuboid is a box shape. It has 6 flat faces, and some are long rectangles.'},
 cyl:{n:'cylinder',w:.85,h:1.05,col:'#86efac',spot:'A cylinder has a curved side and a flat circle at each end, like a tin.'},
 cone:{n:'cone',w:.95,h:.95,col:'#fde047',spot:'A cone has one flat circle at the bottom, a curved side and a point, like a party hat.'},
 circle:{n:'circle',flat:1,col:'#c4b5fd',spot:'A circle is flat, like a drawing. You cannot hold it or stack it.'},
 tri:{n:'triangle',flat:1,col:'#fdba74',spot:'A triangle is flat, like a drawing. You cannot hold it or stack it.'}};
const TRAY=['cube','cuboid','cyl','cone'];
/* scene 1: build the model on the plan card, bottom part first */
const PLANS=[
 {name:'rocket',parts:['cyl','cyl','cone']},
 {name:'lighthouse',parts:['cuboid','cyl','cone']},
 {name:'castle tower',parts:['cube','cube','cyl','cone']}];
/* scene 2: name each part of a model; the flat names are traps */
const NAMES=['cube','cuboid','cyl','cone','circle','tri'];
const MODELS=[
 {name:'pencil',parts:['cyl','cone']},
 {name:'toy robot',parts:['cuboid','cube','cyl']},
 {name:'tower block',parts:['cuboid','cuboid','cube']}];
/* scene 3: small cubes make a new shape. Cells are [x,y,z] = right, up, back; filled in this order */
const CUBES=[
 {make:'cuboid',say:'2 cubes in a row make a cuboid. It is longer than it is tall.',cells:[[0,0,0],[1,0,0]]},
 {make:'cuboid',say:'3 cubes in a row make a longer cuboid.',cells:[[0,0,0],[1,0,0],[2,0,0]]},
 {make:'cube',say:'8 small cubes make a bigger cube: 4 on the bottom and 4 on top. One cube at the back is hidden.',
  cells:[[0,0,1],[1,0,1],[0,0,0],[1,0,0],[0,1,1],[1,1,1],[0,1,0],[1,1,0]]}];
/* scene 4: is the robot right, or is it a slip? */
const ROBOT=[
 {say:'My rocket is 2 cylinders with a cone on top.',ok:true,fix:'Right. A model can be made of lots of shapes.'},
 {say:'The body of a tin is a circle.',ok:false,fix:'A circle is flat. A tin is a cylinder: a curved side and 2 flat circle faces.'},
 {say:'2 cubes side by side make a bigger cube.',ok:false,fix:'They make a cuboid. It is 2 cubes long but only 1 cube tall.'},
 {say:'I can stand a cube on the point of a cone.',ok:false,fix:'A point cannot hold a block. A cone goes on top.'},
 {say:'A cone has 1 flat face. It is a circle.',ok:true,fix:'Right. The flat face of a cone is a circle, and the rest is curved.'}];
const DESC=[
 'A plan card shows a model. Under it are 4 shapes. Tap or drag a shape to build the model from the bottom up.',
 'A model with one part shown in a box. Tap the name of that shape.',
 'A model made of small cubes, with dashed spaces. Tap Add a cube, or drag a cube in, to fill each space.',
 'A robot says something about 3-D shapes. Tap Right or Slip.',
 'Free build. Tap or drag shapes to make your own model. Take off the top part if you change your mind.'];
const DONE=[
 'All 3 models built. Each one is made of smaller 3-D shapes.',
 'You named every part with its 3-D name: cube, cuboid, cylinder or cone.',
 '2 or 3 cubes in a row make a cuboid. 8 cubes make a bigger cube.',
 'The robot slipped 3 times: flat names, 2 cubes and a cone point.',
 'Your own model is built. You can say what shapes it is made of.'];
const QS=[
 {q:'A pencil is a cylinder with a ... on the end.',a:'cone',o:[['triangle','flat'],['cube','look']]},
 {q:'Push 2 cubes together, end to end. What shape do you get?',a:'a cuboid',o:[['a bigger cube','two'],['a cylinder','look']]},
 {q:'A tower has a cone on top. Which shape can go at the bottom?',a:'a cube',o:[['a cone','point'],['a ball','roll']]},
 {q:'How many small cubes make a cube 2 cubes tall, 2 wide and 2 deep?',a:'8',o:[['4','hidden'],['6','hidden']]},
 {q:'Which shape has a curved side and 2 flat circle faces?',a:'a cylinder',o:[['a circle','flat'],['a cone','look']]},
 {q:'A lighthouse is a cuboid, a cylinder and a cone. How many shapes is that?',a:'3',o:[['1','one'],['2','one']]}];
return{SH,TRAY,PLANS,NAMES,MODELS,CUBES,ROBOT,DESC,DONE,QS}})();
