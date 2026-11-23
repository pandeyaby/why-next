/* Data and scenery for flagrockcyc (the rock cycle, ages 9–11). Sources: BGS "The rock cycle" (British Geological
   Survey, bgs.ac.uk) and Geological Society "The Rock Cycle" (geolsoc.org.uk/ks3): igneous rock forms when magma or lava
   cools (slowly underground: large crystals; quickly at the surface: small crystals); weathering breaks rock down in
   place and erosion carries the pieces away; sediment is deposited in layers and turned into sedimentary rock by
   compaction and cementation; heat and pressure change rock into metamorphic rock without melting it; melting makes
   magma; any rock can take a short cut (for example metamorphic rock uplifted and weathered into sediment); most changes
   take thousands to millions of years. Slips it targets: thinking the cycle has a fixed start or a fixed order, mixing
   up metamorphism with melting, mixing up weathering with erosion, calling magma igneous rock before it cools, and
   thinking new rock forms in a few years. */
const ROCKCYC=(()=>{
const NODES={ign:{t:'Igneous rock',x:.16,y:.42},sed:{t:'Sediment',x:.5,y:.08},sdr:{t:'Sedimentary rock',x:.84,y:.42},met:{t:'Metamorphic rock',x:.72,y:.9},mag:{t:'Magma (melted rock)',x:.28,y:.9}};
const PROC={wea:'Weathering and erosion',com:'Compaction and cementation',hp:'Heat and pressure',mel:'Melting',coo:'Cooling'};
const SHORT={wea:'weathering, erosion',com:'compaction, cementation',hp:'heat + pressure',mel:'melting',coo:'cooling'};
const LOOP=[['ign','sed','wea'],['sed','sdr','com'],['sdr','met','hp'],['met','mag','mel'],['mag','ign','coo']];
/* what each process needs, used to explain a wrong choice */
const NEEDS={wea:'Weathering and erosion happen at the surface, where rain, ice, wind and rivers reach the rock.',
 com:'Compaction and cementation work on loose sediment: layers pile up and squeeze it, and minerals in the water glue the grains.',
 hp:'Heat and pressure change solid rock that is buried deep, without melting it.',
 mel:'Melting needs rock to get hot enough deep underground to turn into a liquid.',
 coo:'Cooling turns liquid magma or lava into solid rock, and there is no liquid rock here.'};
const GRAIN=[{at:'ign',p:'wea',t:'A grain of quartz is part of granite at the top of a mountain. Rain, ice and wind attack the rock. What happens next?',
  yes:'Weathering breaks the grain out of the granite, and a river carries it to the sea. It is now sediment.'},
 {at:'sed',p:'com',t:'The grain is sand on the sea floor. More layers of sand and mud pile on top of it for millions of years. What happens next?',
  yes:'The weight of the layers squeezes the sand, and minerals glue the grains together. It is now sandstone, a sedimentary rock.'},
 {at:'sdr',p:'hp',t:'Moving plates push the sandstone deep underground. It gets very hot and squeezed, but it does not melt. What happens next?',
  yes:'Heat and pressure change the sandstone into quartzite, a metamorphic rock.'},
 {at:'met',p:'mel',t:'The quartzite is pushed even deeper, close to hot magma. Now it gets hot enough to melt. What happens next?',
  yes:'The rock melts into magma.'},
 {at:'mag',p:'coo',t:'The magma rises and cools slowly, deep underground. What happens next?',
  yes:'Slow cooling grows big crystals: the grain is part of new granite, an igneous rock, back where it started.'}];
const CUTS=[{from:'met',to:'sed',p:'wea',lp:.45,cl:'weathering',t:'Marble is metamorphic rock. It is pushed up to the surface, where rain and ice wear it away. Tap where it goes next.',
  no:{sdr:'Not straight to sedimentary rock: first it must break into loose sediment, which is then pressed and glued.',mag:'Rain and ice do not melt rock. They break it into small bits.',ign:'Igneous rock comes from melted rock that cools. Nothing melted here.'},
  yes:'Yes: any rock at the surface can be weathered into sediment, even metamorphic rock. It skipped melting.'},
 {from:'ign',to:'met',p:'hp',lp:.3,cl:'heat + pressure',t:'Granite is igneous rock. It is buried deep, heated and squeezed, but it does not melt. Tap what it becomes.',
  no:{mag:'It did not melt, so it is not magma. Heat and squeezing without melting make metamorphic rock.',sdr:'Sedimentary rock is made from layers of sediment pressed together, not by heating.',sed:'Sediment is loose bits worn off at the surface. This rock is deep underground.'},
  yes:'Yes: igneous rock can become metamorphic rock without ever being sediment.'},
 {from:'sdr',to:'mag',p:'mel',lp:.5,cl:'melting',t:'Sandstone is sedimentary rock. It is dragged so deep that it gets hot enough to melt. Tap what it becomes.',
  no:{met:'Metamorphic rock forms when rock is heated without melting. This rock melted.',ign:'It has not cooled yet. Melted rock underground is magma. It becomes igneous rock only when it cools.',sed:'Sediment is loose bits at the surface. This rock is deep and melting.'},
  yes:'Yes: sedimentary rock can melt straight into magma, without being metamorphic first.'}];
/* zones on the cross-section, as fractions of the scene box */
const PLACES={mountain:{x:0,y:.04,w:.3,h:.36,t:'mountain top'},volcano:{x:.4,y:.06,w:.24,h:.32,t:'volcano'},sea:{x:.7,y:.42,w:.3,h:.2,t:'sea floor'},deep:{x:0,y:.74,w:1,h:.26,t:'deep underground'}};
const WHERE=[{k:'Ice cracks the rock apart',z:'mountain',tag:'ice cracking',yes:'Ice and rain break up rock where they can reach it: at the surface, on mountains and cliffs.'},
 {k:'Sand settles in layers',z:'sea',tag:'sand layers',yes:'Rivers carry sediment to the sea, where it settles on the sea floor in layers.'},
 {k:'Lava cools fast: tiny crystals',z:'volcano',tag:'lava cooling',yes:'Lava pours out of a volcano and cools quickly in the air, so the crystals are tiny.'},
 {k:'Magma cools slowly: big crystals',z:'deep',tag:'magma cooling',yes:'Magma trapped deep underground cools slowly, so the crystals have time to grow big.'},
 {k:'Heat and squeezing change rock',z:'deep',tag:'heat, squeezing',yes:'Deep underground, rock is hot and squeezed, so it changes into metamorphic rock.'}];
const WHERE_NO={mountain:'The mountain top is at the surface, where weather breaks rock down.',volcano:'The volcano is where lava comes out at the surface and cools quickly.',
 sea:'The sea floor is where sediment settles in layers.',deep:'Deep underground it is hot and squeezed, and nothing there is weathered or laid down by water.'};
const ROCKS=[{k:'granite',type:'igneous',x:.08,y:.24,c:'#e7c9c3'},{k:'sandstone',type:'sedimentary',x:.16,y:.15,c:'#e8b86d'},{k:'marble',type:'metamorphic',x:.24,y:.26,c:'#f1f5f9'}];
const RIVER={x:.3,y:.26,w:.26,h:.22};
const SPEED={bins:['Fast: minutes to years','Slow: thousands to millions of years'],
 cards:[['A rockfall breaks a cliff',0],['Sand turns into sandstone',1],['Lava cools into basalt',0],['Limestone turns into marble',1],['A flood leaves a layer of mud',0],['A mountain wears down flat',1]],
 why:{0:'That one happens fast: you could watch it happen.',1:'That takes thousands to millions of years: far longer than a life.'}};
const TXT=['Rock at the surface does not last for ever. Weathering breaks it into bits where it stands. Erosion is when water, ice or wind carry the bits away.',
 'Follow one grain of quartz. Each kind of rock can change into another kind. Choose the process that happens next, and watch where the grain goes.',
 'Rock does not have to go round the loop in order. It can take short cuts. Read what happens to each rock, then tap the box it ends up in.',
 'Each process happens in its own place: at the surface, on the sea floor, or deep underground. Put each change where it happens.',
 'Some changes are fast, but most of the rock cycle is very slow. Sort the changes by how long they take.'];
const DESC=['A mountain with granite, sandstone and marble, a river and the sea. Tap a rock to weather it, then drag the bits into the river.',
 'The rock cycle: igneous rock, sediment, sedimentary rock, metamorphic rock and magma, joined in a loop. A grain starts in igneous rock. Choose the next process.',
 'The rock cycle loop. Short cut 1: marble at the surface is worn away. Tap the box it goes to next.',
 'A slice through the ground: mountain, volcano, sea floor and deep underground. Put each change where it happens.',
 'Two boxes: fast and slow. Drag each change into a box, or tap it and then tap a box.'];
const DONE=['Every rock at the surface, igneous, sedimentary or metamorphic, can be weathered into bits and carried away. The bits settle in layers as sediment.',
 'The grain went all the way round and ended up in granite again. The rock cycle is a loop with no start and no end.',
 'Any kind of rock can become any other kind. Rocks take short cuts, so the cycle has no fixed order.',
 'Weathering happens at the surface, sediment settles on the sea floor, and heat, squeezing and slow cooling happen deep underground.',
 'A rockfall takes seconds, but making new rock takes thousands to millions of years. Most of the rock cycle is far too slow to watch.'];
const QS=[{q:'Marble is metamorphic rock. Can it ever become sedimentary rock?',a:'Yes: weathered into sediment, then pressed and glued',o:[['No: it must melt first','order'],['No: metamorphic rock cannot change','stuck']]},
 {q:'Rock is heated and squeezed deep underground, but it does not melt. What forms?',a:'Metamorphic rock',o:[['Magma','melt'],['Igneous rock','cool']]},
 {q:'Where does the rock cycle start?',a:'Nowhere: it is a loop, and rock can join it anywhere',o:[['Always with magma','start'],['Always with sediment','start']]},
 {q:'Sand on the sea floor becomes sandstone in about…',a:'thousands to millions of years',o:[['a few years','fast'],['a few weeks','fast']]},
 {q:'Which process carries bits of broken rock away?',a:'Erosion',o:[['Weathering','erode'],['Compaction','sed']]},
 {q:'Magma cools slowly deep underground. What forms?',a:'Igneous rock with big crystals',o:[['Igneous rock with tiny crystals','crys'],['Sedimentary rock','sed']]},
 {q:'Molten rock is still hot and liquid deep underground. What is it called?',a:'Magma',o:[['Igneous rock','cool'],['Metamorphic rock','melt']]}];
/* the scene: a slice through the ground, from a mountain to the sea */
function SHAPES(A){const g=A.ctx,P=A.paint;
 function land(R,o){o=o||{};const d=A.col.dark,X=f=>R.x+R.w*f,Y=f=>R.y+R.h*f;
  g.fillStyle=d?'#0c4a6e':'#e0f2fe';g.fillRect(R.x,R.y,R.w,R.h);
  g.fillStyle=d?'#57534e':'#d6c7a1';g.beginPath();g.moveTo(X(0),Y(.42));g.lineTo(X(.04),Y(.2));g.lineTo(X(.15),Y(.06));g.lineTo(X(.27),Y(.24));g.lineTo(X(.33),Y(.4));
  g.lineTo(X(.44),Y(.42));g.lineTo(X(.5),Y(.16));g.lineTo(X(.54),Y(.16));g.lineTo(X(.6),Y(.42));g.lineTo(X(.7),Y(.42));g.lineTo(X(.7),Y(.62));g.lineTo(X(1),Y(.62));g.lineTo(X(1),Y(1));g.lineTo(X(0),Y(1));g.closePath();g.fill();
  g.fillStyle=d?'#0369a1':'#7dd3fc';g.fillRect(X(.7),Y(.36),R.w*.3,R.h*.26);
  g.fillStyle=d?'#44403c':'#b8a98a';g.fillRect(R.x,Y(.62),R.w,R.h*.12);
  g.fillStyle=d?'#7c2d12':'#fed7aa';g.fillRect(R.x,Y(.74),R.w,R.h*.26);
  g.fillStyle=d?'#dc2626':'#f87171';g.beginPath();g.ellipse(X(.52),Y(.88),R.w*.12,R.h*.07,0,0,7);g.fill();
  g.strokeStyle=d?'#dc2626':'#f87171';g.lineWidth=Math.max(3,R.w*.012);g.beginPath();g.moveTo(X(.52),Y(.82));g.lineTo(X(.52),Y(.17));g.stroke();
  g.strokeStyle=d?'#38bdf8':'#0284c7';g.lineWidth=Math.max(4,R.w*.014);g.beginPath();g.moveTo(X(.27),Y(.25));g.quadraticCurveTo(X(.36),Y(.44),X(.44),Y(.415));g.lineTo(X(.62),Y(.415));g.lineTo(X(.7),Y(.4));g.stroke();
  (o.layers||[]).forEach((c,i)=>{g.fillStyle=c;g.fillRect(X(.7),Y(.62)-(i+1)*R.h*.035,R.w*.3,R.h*.035);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;g.strokeRect(X(.7),Y(.62)-(i+1)*R.h*.035,R.w*.3,R.h*.035)})}
 return{land}}
return{NODES,PROC,SHORT,LOOP,NEEDS,GRAIN,CUTS,PLACES,WHERE,WHERE_NO,ROCKS,RIVER,SPEED,TXT,DESC,DONE,QS,SHAPES}})();
