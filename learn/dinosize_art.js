/* Data for flagdinosize (dinosaur sizes, ages 5–7). Sizes are rounded "about" figures from the Natural History Museum
   Dino Directory and its size articles (Compsognathus 0.7 m long, 3 kg; Velociraptor about 2 m long with its tail,
   0.5 m tall at the hips, about 15 kg, "turkey-sized"; Triceratops about 9 m; Tyrannosaurus 12 m long, 3.5–4 m tall at
   the hips, about 7 t; Diplodocus 24–26 m long, about 15 t) and the Museum für Naturkunde Berlin Brachiosaurus
   (Giraffatitan) mount, 13.27 m tall and about 22 m long. Size estimates vary between fossils, so the lesson says
   "about". Familiar things: a double-decker bus is about 11 m long and 4.4 m tall; a big elephant is about 6 t; a
   4-floor block of flats is about 12 m tall. Slips it targets: all dinosaurs were huge; book pictures show real
   size; the longest dinosaur must be the tallest; film raptors are the real size; mixing up taller, longer and
   heavier. */
const DINOSZ=(()=>{
const D={compy:{n:'Compsognathus',k:'thero',L:.7,H:.35,c:'#65a30d'},raptor:{n:'Velociraptor',k:'thero',L:2,H:.7,c:'#b45309'},
 trike:{n:'Triceratops',k:'cera',L:9,H:3,c:'#0f766e'},rex:{n:'T. rex',k:'thero',L:12,H:4.5,c:'#b91c1c'},
 diplo:{n:'Diplodocus',k:'sauro',L:26,H:5,c:'#6d28d9'},brachio:{n:'Brachiosaurus',k:'brachio',L:22,H:12,c:'#1d4ed8'}};
const BUS={L:11,H:4.4};
const ROAD=[{d:'compy',ans:'short',why:'Compsognathus is tiny next to the bus: only about as long as a grown-up\u2019s arm.'},
 {d:'brachio',ans:'long',why:'Brachiosaurus stretches past the end of the bus: about 2 buses long.'},
 {d:'trike',ans:'short',why:'Triceratops is big, but it stops before the end of the bus.'},
 {d:'diplo',ans:'long',why:'Diplodocus is more than 2 buses long, mostly neck and tail.'}];
const PEOPLE={grown:{n:'Grown-up',H:1.7},child:{n:'Child',H:1.1},turkey:{n:'Turkey',H:.8},chicken:{n:'Chicken',H:.4},horse:{n:'Horse',H:1.6},cat:{n:'Cat',H:.25}};
const FILM=[{ok:'Yes: a real Velociraptor was about the size of a turkey, with feathers. Next one.',d:'raptor',opts:['grown','child','turkey'],ans:'turkey',film:1.8,
  bad:{grown:'That is the film raptor. A real Velociraptor came up to a grown-up\u2019s knee.',child:'Closer, but still too tall. A real Velociraptor was about the size of a turkey.'}},
 {ok:'Yes: Compsognathus was about the size of a chicken.',d:'compy',opts:['horse','cat','chicken'],ans:'chicken',
  bad:{horse:'Much too big. Compsognathus weighed about 3 kg, like a chicken.',cat:'Close in length, but look at the height: it stood about as tall as a chicken.'}}];
const SCALE=[{d:'rex',t:7,ans:1},{d:'diplo',t:15,ans:2}];
const ELE=6;
const WORDS=[{s:['Diplodocus was','a bus.'],ok:'longer than',o:['shorter than','as small as'],why:'Diplodocus was more than 2 buses long.'},
 {s:['Compsognathus was','a bus.'],ok:'shorter than',o:['longer than','as long as'],why:'Compsognathus was tiny: about as long as a grown-up\u2019s arm, much shorter than a bus.'},
 {s:['Brachiosaurus was','a house.'],ok:'taller than',o:['shorter than','as small as'],why:'Brachiosaurus could reach about 12 m up, higher than a house.'},
 {s:['T. rex was','an elephant.'],ok:'heavier than',o:['lighter than','as light as'],why:'On the see-saw T. rex went down: it was heavier than 1 big elephant.'}];
const DESC=['A picture book: a dinosaur card and a bus card, the same size. Tap to put them on the road.',
 'Diplodocus and Brachiosaurus at real size beside a block of flats. Tap each one to measure it.',
 'A real dinosaur at real size beside three other animals or people. Tap the closest in size.',
 'A see-saw scale. A dinosaur sits on one side. Add elephants to the other side.',
 'Sentences with a gap. Tap the right size words.'];
const DONE=['Two were shorter than a bus and two were longer. Pictures in books are not real size.',
 'Diplodocus is longer, but Brachiosaurus is taller. Longest is not the same as tallest.',
 'A real Velociraptor was turkey-sized, and Compsognathus was chicken-sized. Films make raptors too big.',
 'T. rex was heavier than 1 big elephant. Diplodocus was heavier than 2.',
 'Longer, shorter, taller and heavier each compare a different thing.'];
const TXT=['A book shows the dinosaur and the bus the same size. Tap to put them on the road at real size. Then say: longer or shorter than the bus?',
 'Tap each dinosaur to measure how long and how tall it is. Then answer the two questions.',
 'Here is the real dinosaur at real size. Tap the animal or person closest to its size.',
 'Tap Add an elephant until the elephants go down. That shows how heavy the dinosaur was.',
 'Pick the size words that make each sentence true.'];
const QS=[{q:'Were all dinosaurs bigger than a bus?',a:'No, some were chicken-sized',o:[['Yes, all were huge','allbig'],['Yes, but only the meat-eaters','allbig']]},
 {q:'In a book, T. rex and Compsognathus are the same size. Were they the same size in real life?',a:'No, T. rex was much longer',o:[['Yes, the book shows real size','book'],['No, Compsognathus was longer','book']]},
 {q:'Diplodocus was the longest. Was it the tallest too?',a:'No, Brachiosaurus was taller',o:[['Yes, longest means tallest','longtall'],['Yes, it stood on its tail','longtall']]},
 {q:'How big was a real Velociraptor?',a:'About as big as a turkey',o:[['Taller than a grown-up','film'],['As big as a bus','allbig']]},
 {q:'On a see-saw, T. rex goes down and 1 elephant goes up. "T. rex was ___ an elephant."',a:'heavier than',o:[['lighter than','word'],['shorter than','word']]},
 {q:'Which was taller than a house?',a:'Brachiosaurus',o:[['Compsognathus','allbig'],['Velociraptor','film']]}];
const TALL={long:'Look at the long lines: 26 m for Diplodocus, 22 m for Brachiosaurus. The neck and tail make Diplodocus longer.',tall:'Look at the tall lines: Brachiosaurus reaches about 12 m, as high as the flats. Being longest does not make Diplodocus tallest.'};
const END=['2 shorter, 2 longer than a bus','Pictures in books are not real size','Turkey-sized raptor, chicken-sized Compsognathus','Films make raptors much too big','T. rex: more than 1 elephant. Diplodocus: more than 2.','Real size: compare with a bus, a house or an elephant'];
return{END,TALL,D,BUS,ROAD,PEOPLE,FILM,SCALE,ELE,WORDS,DESC,DONE,TXT,QS}})();
