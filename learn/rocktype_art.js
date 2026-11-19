/* Data for flagrocktype (types of rock, ages 7–9). Sources: DfE (2013) National Curriculum science, Year 3 rocks
   ("compare and group together different kinds of rocks on the basis of their appearance and simple physical
   properties"; "describe in simple terms how fossils are formed when things that have lived are trapped within rock");
   British Geological Survey, "Rocks" and "How rocks form" (igneous from cooled magma or lava, sedimentary from layers
   of sediment compacted and cemented, metamorphic from rock changed by heat and pressure without melting);
   Geological Society, "The rock cycle" (granite: large crystals, slow cooling at depth; basalt: small crystals, fast
   cooling at the surface; pumice: gas bubbles; chalk: coccolith remains; mudstone to slate, limestone to marble,
   sandstone to quartzite). Slips it targets: all rocks are the same, fossils are found in any rock, the top layer is
   the oldest, and metamorphic rock is melted rock. */
const RKT=(()=>{
/* how each rock looks: base colour, speckle colours, speckle size, and pattern */
const LOOK={
 granite:{base:'#e7d3cf',dots:['#1f2937','#f8fafc','#f9a8d4'],size:5,name:'Granite'},
 basalt:{base:'#4b5563',dots:['#374151','#6b7280'],size:1.2,name:'Basalt'},
 pumice:{base:'#d6d3d1',dots:['#78716c'],size:3,holes:1,name:'Pumice'},
 sandstone:{base:'#e9c58f',dots:['#b45309','#fde68a'],size:1.4,bands:1,name:'Sandstone'},
 mudstone:{base:'#a8a29e',dots:['#78716c'],size:1,bands:1,name:'Mudstone'},
 limestone:{base:'#e5e7eb',dots:['#9ca3af'],size:1.2,shells:1,name:'Limestone'},
 chalk:{base:'#fafaf9',dots:['#d6d3d1'],size:1,name:'Chalk'},
 marble:{base:'#f8fafc',dots:['#e2e8f0'],size:1,veins:1,name:'Marble'},
 slate:{base:'#475569',dots:['#334155'],size:1,lines:1,name:'Slate'},
 quartzite:{base:'#fef2f2',dots:['#fecaca','#ffffff'],size:2,name:'Quartzite'}};
/* scene 1: sediments to drop into the sea */
const SED=[{k:'sand',col:'#e9c58f',dot:'#b45309',name:'Sand'},{k:'mud',col:'#a8a29e',dot:'#57534e',name:'Mud'},{k:'shells',col:'#f1f5f9',dot:'#64748b',name:'Shells'}];
/* scene 2: igneous rocks and where the molten rock cooled (0 surface, 1 underground) */
const IGN=[{rock:'granite',where:1,clue:'Big crystals you can see',yes:'Granite has big crystals because magma cooled slowly, deep underground.',no:'Big crystals need a long, slow cool. On the surface lava cools too fast for big crystals.'},
 {rock:'basalt',where:0,clue:'Dark, with tiny crystals',yes:'Basalt has tiny crystals because lava cooled fast on the surface.',no:'Tiny crystals mean a fast cool. Deep underground, magma cools slowly and grows big crystals.'},
 {rock:'pumice',where:0,clue:'Full of holes, light enough to float',yes:'Pumice is frothy lava full of gas bubbles that cooled fast on the surface.',no:'The holes are gas bubbles caught as frothy lava cooled fast in the air.'}];
/* scene 3: heat and squeeze a rock into a metamorphic rock */
const META=[{from:'limestone',to:'marble'},{from:'mudstone',to:'slate'},{from:'sandstone',to:'quartzite'}];
const ZONE=[35,75];
/* scene 4: sort rocks by how they formed (0 igneous, 1 sedimentary, 2 metamorphic) */
const BINS=['Igneous','Sedimentary','Metamorphic'];
const SORT=[{rock:'granite',bin:0,clue:'Big crystals from cooled magma'},{rock:'sandstone',bin:1,clue:'Grains of sand stuck together in layers'},
 {rock:'marble',bin:2,clue:'Limestone changed by heat and squeezing'},{rock:'basalt',bin:0,clue:'Tiny crystals from cooled lava'},
 {rock:'chalk',bin:1,clue:'Made of tiny sea shells, pressed together'},{rock:'slate',bin:2,clue:'Mudstone squeezed flat into thin sheets'}];
const SORTWHY=['Igneous rock forms when hot melted rock (magma or lava) cools and hardens. It has crystals and no layers.',
 'Sedimentary rock forms from layers of sand, mud or shells pressed together. Look for grains, layers or fossils.',
 'Metamorphic rock was another rock first, changed by heat and squeezing deep underground, without melting.'];
const ROBOT=[{say:'Fossils are found in sedimentary rock.',ok:true,fix:'Yes. Shells and bones get buried in layers of mud or sand, which slowly turn to rock.'},
 {say:'Igneous rock is made from layers of sand.',ok:false,fix:'Layers of sand make sedimentary rock. Igneous rock comes from melted rock that cooled.'},
 {say:'The top layer of rock is the oldest.',ok:false,fix:'New layers settle on top of old ones, so the bottom layer is usually the oldest.'},
 {say:'Metamorphic rock is made by melting rock.',ok:false,fix:'It is heated and squeezed, but it does not melt. Melted rock cools into igneous rock.'},
 {say:'Granite has big crystals because it cooled slowly underground.',ok:true,fix:'Yes. Slow cooling deep underground gives crystals time to grow big.'}];
const DESC=[
 'A sea with three buckets: sand, mud and shells. Tap a bucket to drop a layer. Then drag the weight down, and tap the oldest layer.',
 'A rock sample and two places it could have cooled. Tap where the melted rock cooled.',
 'A rock, a heat bar and a squeeze button. Drag the heat marker, then tap Heat and squeeze.',
 'A rock card and three boxes: igneous, sedimentary, metamorphic. Tap the right box.',
 'A robot says things about rocks. Buttons: Right or Slip.'];
const DONE=[
 'Sedimentary rock: layers settle, get pressed into rock, and the bottom layer is the oldest.',
 'Igneous rock: melted rock cools. Slow cooling underground gives big crystals.',
 'Metamorphic rock: heat and squeezing change a rock, without melting it.',
 'Igneous from cooled melted rock, sedimentary from layers, metamorphic from changed rock.',
 'The robot slipped three times: layers, oldest at the bottom, and metamorphic is not melted.'];
const QS=[
 {q:'Where are you most likely to find a fossil?',a:'In sedimentary rock',o:[['In igneous rock','fossil'],['In any rock at all','fossil']]},
 {q:'Granite formed when magma cooled underground. What type of rock is it?',a:'Igneous',o:[['Sedimentary','ign'],['Metamorphic','melt']]},
 {q:'Layers of rock are stacked in a cliff. Which layer is usually the oldest?',a:'The bottom layer',o:[['The top layer','old'],['The middle layer','old']]},
 {q:'Marble was limestone, changed by heat and squeezing. What type of rock is marble?',a:'Metamorphic',o:[['Igneous','melt'],['Sedimentary','met']]},
 {q:'Sandstone is made of sand grains stuck together in layers. What type is it?',a:'Sedimentary',o:[['Igneous','sed'],['Metamorphic','sed']]},
 {q:'To make metamorphic rock, what happens to the rock?',a:'It is heated and squeezed, but not melted',o:[['It melts and cools','melt'],['It is broken into sand','sed']]}];
/* drawing helpers shared by the lab (kept here so flag_rocktype.js stays small) */
/* seeded speckles so a rock looks the same every frame */
function seeded(n){let s=n*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}}
/* paint a rock sample with its own texture: crystals, grains, layers, shells, veins, holes or thin sheets */
function paintRock(g,rr,kind,x,y,w,h){const L=LOOK[kind],rnd=seeded(kind.length*7+kind.charCodeAt(0));g.save();rr(x,y,w,h,Math.min(w,h)*.22);g.clip();g.fillStyle=L.base;g.fillRect(x,y,w,h);
 const n=Math.round(w*h/(L.size*L.size*14));for(let k=0;k<Math.min(n,900);k++){g.fillStyle=L.dots[k%L.dots.length];const px=x+rnd()*w,py=y+rnd()*h,s=L.size*(.6+rnd()*.8);L.size>3?g.fillRect(px,py,s*1.4,s):g.fillRect(px,py,s,s)}
 if(L.bands)for(let k=1;k<5;k++){g.fillStyle='#00000018';g.fillRect(x,y+h*k/5-2,w,3)}
 if(L.lines){g.strokeStyle='#94a3b8';g.lineWidth=1;for(let k=1;k<9;k++){g.beginPath();g.moveTo(x,y+h*k/9);g.lineTo(x+w,y+h*k/9-6);g.stroke()}}
 if(L.veins){g.strokeStyle='#94a3b8';g.lineWidth=1.5;for(let k=0;k<3;k++){g.beginPath();g.moveTo(x+w*rnd(),y);g.bezierCurveTo(x+w*rnd(),y+h*.3,x+w*rnd(),y+h*.6,x+w*rnd(),y+h);g.stroke()}}
 if(L.shells){g.strokeStyle='#6b7280';g.lineWidth=1.5;for(let k=0;k<4;k++){const sx=x+w*(.15+rnd()*.7),sy=y+h*(.2+rnd()*.6),r=Math.min(w,h)*.08;g.beginPath();g.arc(sx,sy,r,Math.PI,0);g.closePath();g.stroke()}}
 if(L.holes){g.fillStyle='#78716c';for(let k=0;k<14;k++){g.beginPath();g.arc(x+rnd()*w,y+rnd()*h,1.5+rnd()*3.5,0,7);g.fill()}}
 g.restore();rr(x,y,w,h,Math.min(w,h)*.22);g.strokeStyle='#334155';g.lineWidth=2;g.stroke()}
/* scene 2 pictures: a volcano with lava (surface) or a magma pocket under the ground */
function paintPlace(g,i,b){const top=b.y+b.h*.4,hh=b.y+b.h-8-top,cx=b.x+b.w/2,u=Math.min(b.w*.4,hh*.95);
 if(i===0){const base=top+hh;g.fillStyle='#78716c';g.beginPath();g.moveTo(cx-u,base);g.lineTo(cx-u*.2,base-u*.9);g.lineTo(cx+u*.2,base-u*.9);g.lineTo(cx+u,base);g.closePath();g.fill();g.fillStyle='#dc2626';g.beginPath();g.moveTo(cx-u*.2,base-u*.9);g.lineTo(cx+u*.2,base-u*.9);g.lineTo(cx+u*.5,base-u*.2);g.lineTo(cx+u*.3,base-u*.2);g.closePath();g.fill()}
 else{g.fillStyle='#65a30d';g.fillRect(b.x+8,top,b.w-16,6);g.fillStyle='#a8a29e';g.fillRect(b.x+8,top+6,b.w-16,hh-6);g.fillStyle='#ea580c';g.beginPath();g.ellipse(cx,top+hh*.62,Math.min(u*.8,b.w*.32),hh*.22,0,0,7);g.fill()}}
return{paintPlace,seeded,paintRock,LOOK,SED,IGN,META,ZONE,BINS,SORT,SORTWHY,ROBOT,DESC,DONE,QS}})();
