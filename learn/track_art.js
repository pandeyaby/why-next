/* Data for flagtrack (reading dinosaur trackways, ages 7–9). Sources: Alexander, R. McN. (1976) Estimates of speeds of
   dinosaurs, Nature 261, 129-130 (hip height about 4 x footprint length; longer steps for the animal's size mean faster);
   Thulborn, T. (1990) Dinosaur Tracks; Lockley, M. (1991) Tracking Dinosaurs (theropod prints narrow with sharp claw
   tips, ornithopod prints broad with blunt toes, sauropod prints large and round with a small front print); Henderson,
   D. M. (2003) Footprints, trackways and hip heights of bipedal dinosaurs, Journal of Paleontology 77, 133-146; Bird, R. T.
   (1944) and Lockley (1991) on the Davenport Ranch sauropod trackways, Texas (many parallel trackways = a group moving
   together). Slips it targets: prints far apart always mean running (big animals take big steps), any crowd of tracks
   is a herd (tracks can cross at different times), and footprints show colour or sound. */
const TRK=(()=>{
/* print makers: 0 sharp claws (meat-eater, theropod), 1 blunt toes (plant-eater on two legs), 2 big round prints (long-necked giant) */
const MAKERS=['Sharp claws','Blunt toes','Big and round'];
const MAKERWHO=['a meat-eater','a plant-eater on two legs','a long-necked giant'];
const PRINTS=[
 {kind:0,size:.8,why:{1:'Look at the toe tips. These toes are thin and end in sharp points: claw marks.',2:'This print has three thin toes, not one big round shape.'}},
 {kind:2,size:1.2,why:{0:'There are no thin toes or claw points here. It is one big round print with a small one in front.',1:'Blunt-toed prints still show three toes. This one is a big round blob.'}},
 {kind:1,size:.9,why:{0:'These toes are fat and rounded, with no sharp points at the ends.',2:'Count the toes: three wide ones. A long-necked giant leaves a round print.'}},
 {kind:0,size:1.1,why:{1:'The toes are long and thin, and each one ends in a point. That is a claw mark.',2:'This print shows three thin toes, so it is not a round giant\'s print.'}},
 {kind:1,size:1.15,why:{0:'Big is not the clue here. The toes are blunt and rounded, with no claw points.',2:'It has three wide toes. A long-necked giant\'s print is round with no toes to see.'}},
 {kind:2,size:.85,why:{0:'No claws here. A round print with a small half-moon print in front was made by a long-necked giant.',1:'There are no toes to count. Round prints come from a long-necked giant.'}}];
/* footprint length in 10 cm squares; hip height is about 4 footprints */
const SIZES=[{n:2,why:{0:'A leg is much longer than a foot. The hip is about 4 footprints high, not 1.',2:'10 footprints is far too tall. The hip is about 4 footprints high.'}},
 {n:3,why:{0:'That is just the footprint. The hip is about 4 footprints high: 4 lots of 30 cm.',2:'Too tall. Count 4 lots of 30 cm, not 10 lots.'}},
 {n:5,why:{0:'That is only the foot. 4 footprints of 50 cm stack up to the hip.',2:'10 footprints is too many. 4 lots of 50 cm reach the hip.'}}];
/* step gap measured in footprint lengths: about 2 to 4 = walking, 6 or more = running */
const GAITS=[{foot:30,gap:3,run:false,note:'Small prints, close together'},
 {foot:20,gap:8,run:true,note:'Small prints, far apart'},
 {foot:60,gap:3,run:false,note:'Giant prints, far apart in cm'}];
const GAITWHY=[{1:'Count footprints in the gap: only about 3 fit. That is a walking step.'},
 {0:'Count footprints in the gap: about 8 fit. Steps that long for such a small foot mean running.'},
 {1:'The gap is 180 cm, but the foot is 60 cm long. Only 3 footprints fit, so this giant was walking.'}];
/* groups of trackways seen from above: angle (degrees) and start for each trackway, plus whether the makers moved together */
const GROUPS=[{lines:[[0,.2],[0,.35],[0,.5],[0,.65],[0,.8]],big:[1,1,1,1,1],together:true,
  slip:'Five trackways side by side, all going the same way, evenly spaced: these dinosaurs moved together.',
  why:{1:'Look at the direction. All five go the same way, side by side, the same distance apart.'}},
 {lines:[[0,.3],[60,.5],[-50,.6],[120,.4]],big:[1,1,1,1],together:false,
  slip:'The trackways cross and point different ways. These dinosaurs probably walked by at different times.',
  why:{0:'Lots of tracks in one place is not enough. These go different ways and cross over, so they were not moving as a group.'}},
 {lines:[[0,.18],[0,.34],[0,.5],[0,.66],[0,.82]],big:[1,1,0,1,1],together:true,
  slip:'Big and small trackways run side by side the same way: grown-ups and young ones moved together as a herd.',
  why:{1:'All the trackways go the same way, side by side. Small prints mean young ones travelling with the group.'}}];
const ROBOT=[{say:'A bigger footprint usually means a bigger dinosaur.',ok:true,fix:'Yes. A dinosaur\'s hip is about 4 footprints high, so big feet go with tall legs.'},
 {say:'Prints far apart in cm always mean the dinosaur was running.',ok:false,fix:'Big dinosaurs take big steps even when walking. Count the gap in footprints, not in cm.'},
 {say:'Footprints can tell us what colour a dinosaur was.',ok:false,fix:'Prints show the shape of the feet, the size and how it moved. They do not show colour.'},
 {say:'Sharp claw marks in a print suggest a meat-eater made it.',ok:true,fix:'Yes. Meat-eaters like Allosaurus had thin toes with sharp claws, and the claws left marks.'}];
const DESC=[
 'A fossil footprint card and three boxes: sharp claws, blunt toes, big and round. Drag the print to its box, or tap a box.',
 'A footprint lies on a grid of 10 centimetre squares. Count the squares, then tap how high the dinosaur\'s hip was.',
 'A trackway seen from above. Tap the gap between two prints to fill it with footprints, then tap walking or running.',
 'Trackways seen from above. Tap whether these dinosaurs were moving together or not.',
 'A robot says facts about dinosaur tracks. Buttons: Right or Slip.'];
const DONE=[
 'Sharp claws: a meat-eater. Blunt toes: a plant-eater on two legs. Big and round: a long-necked giant.',
 'A dinosaur\'s hip is about 4 footprints high. Bigger feet mean a taller dinosaur.',
 'Count the gap in footprints: about 3 is walking, 6 or more is running, whatever the size.',
 'Trackways side by side, going the same way, mean a group. Crossing tracks do not.',
 'The robot slipped twice: count gaps in footprints, and prints do not show colour.'];
const QS=[
 {q:'A print shows three thin toes with sharp points. Who made it?',a:'A meat-eater',o:[['A long-necked giant','round'],['Nobody can tell','cannot']]},
 {q:'A footprint is 40 cm long. About how high was the hip?',a:'About 160 cm',o:[['About 40 cm','foot'],['About 400 cm','ten']]},
 {q:'A giant\'s prints are 2 m apart, but only 3 footprints fit in the gap. Was it running?',a:'No, it was walking',o:[['Yes, 2 m is a long way','cm'],['Yes, giants always run','cm']]},
 {q:'Ten trackways cross each other and point every way. What is the best idea?',a:'They walked by at different times',o:[['It was a herd moving together','herd'],['It was one dinosaur','herd']]},
 {q:'What can a trackway NOT tell us?',a:'The dinosaur\'s colour',o:[['How big it was','colour'],['If it walked or ran','colour']]},
 {q:'Small prints far apart: about 8 footprints fit in each gap. What was it doing?',a:'Running',o:[['Walking slowly','slow'],['Standing still','slow']]}];
return{MAKERS,MAKERWHO,PRINTS,SIZES,GAITS,GAITWHY,GROUPS,ROBOT,DESC,DONE,QS}})();
