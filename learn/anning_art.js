/* Data and pictures for flaganning (Mary Anning, fossil hunter; ages 7-9). Sources: Natural History Museum, London,
   'Mary Anning: the unsung hero of fossil hunting' and its ichthyosaur (Temnodontosaurus) specimen notes; Lyme Regis
   Museum, 'Mary Anning'; H. S. Torrens 1995, 'Mary Anning (1799-1847) of Lyme; the greatest fossilist the world ever
   knew', British Journal for the History of Science 28: 257-284; Royal Society 2010 list of influential British women
   in science; Owen 1842 (the name Dinosauria); Jurassic Coast Trust (Blue Lias cliffs, about 200 million years old,
   fossils exposed by winter storms and landslips). Slips it targets: fossils are found by digging anywhere, at any
   time; the 1811 skull was a crocodile; ichthyosaurs, plesiosaurs and pterosaurs were dinosaurs; Mary was a scientist
   of her day with a voice in the societies; a look-alike living today means the animal is not extinct. */
const ANN=(()=>{
/* step 1: stones on the beach after the storm. f = fossil */
const BEACH=[{k:'plain',f:0,t:'Plain stone'},{k:'ammo',f:1,t:'Ammonite'},{k:'plain',f:0,t:'Plain stone'},{k:'bele',f:1,t:'Belemnite'},{k:'plain',f:0,t:'Plain stone'},{k:'vert',f:1,t:'Backbone bone'}];
const FOUND={ammo:'An ammonite: a curled shell of a sea animal.',bele:'A belemnite: a bullet-shaped part of a squid-like animal.',vert:'A round bone from a backbone. It is part of an ichthyosaur!'};
/* step 2: build the ichthyosaur. ok = a real part; why = what is wrong */
const PARTS=[{k:'skull',ok:1,t:'Long skull with teeth',say:'The skull: long jaws and sharp teeth for catching fish. Joseph found it in 1811.'},
 {k:'legs',ok:0,t:'Legs with claws',why:'Not legs. An ichthyosaur lived in the sea. It had paddles, like flippers.'},
 {k:'spine',ok:1,t:'Backbone',say:'The backbone: lots of round bones in a long row. Mary dug it out in 1812.'},
 {k:'paddle',ok:1,t:'Paddles',say:'Paddles: four flippers for steering in the sea.'},
 {k:'wing',ok:0,t:'Wings',why:'Not wings. This animal swam. It did not fly.'},
 {k:'tail',ok:1,t:'Tail fin',say:'A tail fin, for pushing through the water fast.'}];
/* step 3: dinosaur or not? d = 1 dinosaur */
const DINO=[{k:'ichthy',d:0,t:'Ichthyosaur',why:'A sea reptile, not a dinosaur. Dinosaurs lived on land.'},{k:'iguan',d:1,t:'Iguanodon',why:'Iguanodon walked on land. It is a dinosaur.'},
 {k:'plesio',d:0,t:'Plesiosaur',why:'A sea reptile with a long neck, not a dinosaur.'},{k:'ptero',d:0,t:'Pterosaur',why:'A flying reptile, not a dinosaur. Its wings were skin.'},
 {k:'megalo',d:1,t:'Megalosaurus',why:'Megalosaurus walked on land on strong legs. It is a dinosaur.'},{k:'ammo',d:0,t:'Ammonite',why:'A sea animal with a shell. Not a reptile, and not a dinosaur.'}];
/* step 4: timeline */
const TIME=[{y:1799,t:'Mary is born in Lyme Regis'},{y:1811,t:'Joseph finds a long skull'},{y:1812,t:'Mary, about 12, digs out the body'},
 {y:1823,t:'Mary finds a whole plesiosaur'},{y:1828,t:'Mary finds a pterosaur'},{y:1842,t:'The word "dinosaur" is made up'}];
const SPOT=[3,0,5,1,4,2];/* where each card sits on the board, so the order is not given away */
/* step 5: fossil and look-alike living today */
const PAIRS=[['ichthy','dolphin','Ichthyosaur','Dolphin'],['plesio','turtle','Plesiosaur','Sea turtle'],['ptero','bat','Pterosaur','Bat'],['ammo','nautilus','Ammonite','Nautilus']];
const PAIRSAY=['An ichthyosaur looks like a dolphin, but it was a reptile. None is alive today.','A plesiosaur swam with four flippers, like a sea turtle. None is alive today.',
 'A pterosaur flew on wings of skin, like a bat. None is alive today.','An ammonite had a curled shell, like a nautilus. None is alive today.'];
const DESC=['A cliff by the sea and an empty beach. Tap Storm to bring rock down, then tap the stones that are fossils.',
 'The outline of an ichthyosaur, and six part cards. Drag or tap the four real parts into the outline.',
 'One animal card at a time, and two boxes: Dinosaur, and Not a dinosaur. Drag the card to a box, or use the buttons.',
 'Six cards with years. Tap them in order, earliest first, to build a line of time.',
 'Four fossils on the left and four animals alive today on the right. Tap a fossil, then the animal it looks like.'];
const TXT=['Fossils hide inside the cliff. When do you find them?','Joseph found a skull. Mary found the rest. Build it.','Were Mary\'s sea monsters dinosaurs?','When did it all happen?','Look-alikes are not the same animal.'];
const DONE=['A storm brings the cliff down and shows the fossils. Mary hunted after storms, but falling rock is dangerous.',
 'An ichthyosaur: a long skull, a backbone, four paddles and a tail fin. A sea reptile, not a crocodile.',
 'Only Iguanodon and Megalosaurus are dinosaurs. Mary\'s big finds were sea reptiles and a flying reptile.',
 'Mary found her ichthyosaur 30 years before the word "dinosaur" was made up.',
 'Each fossil looks like an animal alive today, but none of them lives now. They are extinct. Mary\'s fossils helped show this.'];
const QS=[{q:'Where did Mary Anning hunt for fossils?',a:'On the beach below the cliffs at Lyme Regis',o:[['In a big city museum','where'],['In the desert','where']]},
 {q:'Was Mary\'s ichthyosaur a dinosaur?',a:'No, it was a sea reptile',o:[['Yes, a swimming dinosaur','dino'],['Yes, all old bones are dinosaurs','dino']]},
 {q:'When is the best time to look for fossils at Lyme Regis?',a:'After a winter storm, with a grown-up, away from the cliff',o:[['On a calm day, digging into the cliff','storm'],['Any time, right under the cliff','storm']]},
 {q:'Joseph found a long skull with sharp teeth in 1811. What was it?',a:'The skull of an ichthyosaur',o:[['A crocodile skull','croc'],['A dinosaur skull','dino']]},
 {q:'Could Mary join the Geological Society, the club for rock and fossil scientists?',a:'No, women could not join then',o:[['Yes, she ran it','credit'],['Yes, and her name went on every paper','credit']]},
 {q:'An ichthyosaur looks like a dolphin. Does that mean ichthyosaurs are alive today?',a:'No, they are extinct',o:[['Yes, dolphins are ichthyosaurs','alive'],['Yes, some hide in the deep sea','alive']]},
 {q:'Why were Mary\'s finds important?',a:'They showed animals lived long ago that are now extinct',o:[['They proved dinosaurs swam','dino'],['They showed animals never change','alive']]}];
/* ---------- pictures (drawn on a light card) ---------- */
const INK='#1e293b',BONE='#e7d7b5',BONE2='#a8865a';
function ln(g,u,w){g.strokeStyle=INK;g.lineWidth=Math.max(1.4,u*w);g.lineCap='round';g.lineJoin='round'}
function ichthy(g,u,col){g.fillStyle=col;g.beginPath();g.moveTo(-u*.95,-u*.02);g.quadraticCurveTo(-u*.55,-u*.12,-u*.3,-u*.25);g.quadraticCurveTo(u*.2,-u*.42,u*.55,-u*.1);g.lineTo(u*.85,-u*.45);g.lineTo(u*.78,0);g.lineTo(u*.9,u*.38);g.lineTo(u*.55,u*.08);g.quadraticCurveTo(u*.1,u*.3,-u*.3,u*.12);g.quadraticCurveTo(-u*.6,u*.05,-u*.95,-u*.02);g.fill();ln(g,u,.035);g.stroke();
 g.beginPath();g.moveTo(-u*.15,-u*.3);g.lineTo(-u*.02,-u*.5);g.lineTo(u*.12,-u*.3);g.fill();g.stroke();[[-.25,.15,.35],[.25,.18,.25]].forEach(([a,b,s])=>{g.beginPath();g.ellipse(u*a,u*b+u*.05,u*s*.5,u*.07,.5,0,7);g.fill();g.stroke()});g.fillStyle=INK;g.beginPath();g.arc(-u*.55,-u*.1,u*.05,0,7);g.fill()}
function plesio(g,u,col){g.fillStyle=col;g.beginPath();g.ellipse(u*.2,u*.15,u*.45,u*.22,0,0,7);g.fill();ln(g,u,.035);g.stroke();g.strokeStyle=col;g.lineWidth=u*.13;g.beginPath();g.moveTo(-u*.15,u*.05);g.quadraticCurveTo(-u*.55,-u*.15,-u*.6,-u*.6);g.stroke();
 g.fillStyle=col;g.beginPath();g.ellipse(-u*.66,-u*.66,u*.14,u*.09,-.4,0,7);g.fill();ln(g,u,.03);g.stroke();[[-.05,.38,.6],[.45,.38,-.6],[-.05,-.05,-.6],[.45,-.05,.6]].forEach(([a,b,r])=>{g.fillStyle=col;g.beginPath();g.ellipse(u*a,u*b,u*.25,u*.07,r,0,7);g.fill();g.stroke()});
 g.beginPath();g.moveTo(u*.62,u*.15);g.lineTo(u*.95,u*.25);g.stroke()}
function ptero(g,u,col){g.fillStyle=col;g.beginPath();g.moveTo(0,-u*.05);g.lineTo(-u*.95,-u*.35);g.quadraticCurveTo(-u*.5,u*.05,-u*.1,u*.2);g.lineTo(u*.1,u*.2);g.quadraticCurveTo(u*.5,u*.05,u*.95,-u*.35);g.closePath();g.fill();ln(g,u,.035);g.stroke();
 g.beginPath();g.ellipse(0,u*.05,u*.1,u*.22,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(-u*.05,-u*.15);g.lineTo(u*.05,-u*.38);g.lineTo(u*.45,-u*.5);g.lineTo(u*.08,-u*.3);g.closePath();g.fill();g.stroke()}
function dino(g,u,col,horn){g.fillStyle=col;g.beginPath();g.moveTo(-u*.95,u*.05);g.quadraticCurveTo(-u*.4,-u*.25,-u*.05,-u*.25);g.quadraticCurveTo(u*.35,-u*.55,u*.55,-u*.6);g.lineTo(u*.9,-u*.55);g.lineTo(u*.85,-u*.38);g.lineTo(u*.5,-u*.35);g.quadraticCurveTo(u*.45,u*.15,u*.05,u*.25);g.quadraticCurveTo(-u*.5,u*.25,-u*.95,u*.05);g.fill();ln(g,u,.035);g.stroke();
 [[-.15,.2],[.25,.18]].forEach(([a,b])=>{g.fillRect(u*a,u*b,u*.14,u*.55);g.strokeRect(u*a,u*b,u*.14,u*.55)});if(horn){g.beginPath();g.moveTo(u*.4,-u*.3);g.lineTo(u*.3,-u*.05);g.lineTo(u*.47,-u*.18);g.fill();g.stroke()}
 g.fillStyle=INK;g.beginPath();g.arc(u*.62,-u*.5,u*.04,0,7);g.fill()}
function ammo(g,u,col){g.fillStyle=col;g.beginPath();g.arc(0,0,u*.75,0,7);g.fill();ln(g,u,.04);g.stroke();g.beginPath();for(let a=0;a<6*Math.PI;a+=.15){const r=u*.72*Math.exp(-a*.12);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke();
 g.lineWidth=Math.max(1,u*.02);for(let a=0;a<2*Math.PI;a+=.35){g.beginPath();g.moveTo(Math.cos(a)*u*.52,Math.sin(a)*u*.52);g.lineTo(Math.cos(a)*u*.74,Math.sin(a)*u*.74);g.stroke()}}
function icon(g,n,x,y,s){const u=s/2;g.save();g.translate(x,y);
 switch(n){
 case'plain':g.fillStyle='#94a3b8';g.beginPath();g.ellipse(0,u*.1,u*.75,u*.5,.2,0,7);g.fill();ln(g,u,.035);g.stroke();break;
 case'ammo':ammo(g,u,'#c9b48a');break;
 case'bele':g.fillStyle='#b08850';g.beginPath();g.moveTo(-u*.8,-u*.12);g.lineTo(u*.4,-u*.15);g.quadraticCurveTo(u*.9,0,u*.4,u*.15);g.lineTo(-u*.8,u*.12);g.closePath();g.fill();ln(g,u,.035);g.stroke();break;
 case'vert':g.fillStyle=BONE;g.beginPath();g.arc(0,0,u*.6,0,7);g.fill();ln(g,u,.04);g.stroke();g.fillStyle=BONE2;g.beginPath();g.arc(0,0,u*.22,0,7);g.fill();g.stroke();break;
 case'skull':g.fillStyle=BONE;g.beginPath();g.moveTo(-u*.9,0);g.lineTo(u*.3,-u*.3);g.quadraticCurveTo(u*.85,-u*.3,u*.85,u*.05);g.quadraticCurveTo(u*.8,u*.3,u*.3,u*.25);g.closePath();g.fill();ln(g,u,.035);g.stroke();g.beginPath();g.arc(u*.45,-u*.05,u*.17,0,7);g.stroke();
  for(let i=0;i<7;i++){const x=-u*.8+i*u*.15;g.beginPath();g.moveTo(x,u*.02);g.lineTo(x+u*.04,u*.12);g.stroke()}break;
 case'spine':g.fillStyle=BONE;for(let i=0;i<7;i++){g.beginPath();g.arc(-u*.78+i*u*.26,Math.sin(i*.7)*u*.08,u*.12,0,7);g.fill();ln(g,u,.03);g.stroke()}break;
 case'paddle':g.fillStyle=BONE;g.beginPath();g.ellipse(0,0,u*.75,u*.3,-.4,0,7);g.fill();ln(g,u,.035);g.stroke();g.fillStyle=BONE2;for(let i=0;i<4;i++)for(let j=0;j<2;j++){g.beginPath();g.arc(-u*.4+i*u*.25,-u*.03+j*u*.13-i*u*.1+u*.1,u*.06,0,7);g.fill()}break;
 case'tail':g.fillStyle=BONE;g.beginPath();g.moveTo(-u*.8,0);g.lineTo(u*.3,0);g.lineTo(u*.8,-u*.6);g.lineTo(u*.55,0);g.lineTo(u*.8,u*.6);g.lineTo(u*.3,u*.08);g.lineTo(-u*.8,u*.08);g.closePath();g.fill();ln(g,u,.035);g.stroke();break;
 case'legs':g.fillStyle='#d6d3d1';[-.35,.35].forEach(a=>{g.fillRect(u*a-u*.1,-u*.6,u*.2,u*1.0);ln(g,u,.035);g.strokeRect(u*a-u*.1,-u*.6,u*.2,u*1.0);[-1,0,1].forEach(d=>{g.beginPath();g.moveTo(u*a+d*u*.08,u*.4);g.lineTo(u*a+d*u*.14,u*.6);g.stroke()})});break;
 case'wing':g.fillStyle='#d6d3d1';g.beginPath();g.moveTo(-u*.8,u*.3);g.lineTo(0,-u*.6);g.lineTo(u*.8,u*.3);g.quadraticCurveTo(0,0,-u*.8,u*.3);g.fill();ln(g,u,.035);g.stroke();break;
 case'ichthy':ichthy(g,u,'#7dd3fc');break;
 case'plesio':plesio(g,u,'#86efac');break;
 case'ptero':ptero(g,u,'#fdba74');break;
 case'iguan':dino(g,u,'#a3e635',1);break;
 case'megalo':dino(g,u,'#fca5a5',0);break;
 case'dolphin':g.fillStyle='#93c5fd';g.beginPath();g.moveTo(-u*.95,0);g.quadraticCurveTo(-u*.4,-u*.35,u*.4,-u*.15);g.lineTo(u*.85,-u*.4);g.lineTo(u*.7,0);g.lineTo(u*.85,u*.35);g.lineTo(u*.4,u*.05);g.quadraticCurveTo(-u*.3,u*.25,-u*.95,0);g.fill();ln(g,u,.035);g.stroke();
  g.beginPath();g.moveTo(-u*.1,-u*.25);g.lineTo(u*.05,-u*.48);g.lineTo(u*.15,-u*.2);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(-u*.55,-u*.08,u*.05,0,7);g.fill();break;
 case'turtle':g.fillStyle='#4ade80';g.beginPath();g.ellipse(0,0,u*.55,u*.38,0,0,7);g.fill();ln(g,u,.035);g.stroke();g.fillStyle='#bbf7d0';[[-.55,-.4,-.7],[.55,-.4,.7],[-.5,.4,.6],[.5,.4,-.6]].forEach(([a,b,r])=>{g.beginPath();g.ellipse(u*a,u*b,u*.28,u*.09,r,0,7);g.fill();g.stroke()});g.beginPath();g.arc(-u*.72,0,u*.15,0,7);g.fill();g.stroke();break;
 case'bat':g.fillStyle='#475569';g.beginPath();g.moveTo(0,-u*.1);g.lineTo(-u*.9,-u*.35);g.lineTo(-u*.7,0);g.lineTo(-u*.5,-u*.05);g.lineTo(-u*.3,u*.15);g.lineTo(0,u*.2);g.lineTo(u*.3,u*.15);g.lineTo(u*.5,-u*.05);g.lineTo(u*.7,0);g.lineTo(u*.9,-u*.35);g.closePath();g.fill();ln(g,u,.03);g.stroke();
  g.beginPath();g.arc(0,-u*.12,u*.15,0,7);g.fill();g.stroke();break;
 case'nautilus':ammo(g,u*.85,'#fed7aa');g.strokeStyle='#9a3412';g.lineWidth=Math.max(1.4,u*.05);[-.2,0,.2].forEach(b=>{g.beginPath();g.moveTo(u*.55,u*b);g.lineTo(u*.95,u*b*1.8+u*.1);g.stroke()});break;
 default:break}
 g.restore()}
return{BEACH,FOUND,PARTS,DINO,TIME,SPOT,PAIRS,PAIRSAY,DESC,TXT,DONE,QS,icon,INK}})();
