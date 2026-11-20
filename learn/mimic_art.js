/* Data for flagmimic (camouflage, warning colours and mimicry in insects, ages 7–9). Sources: Natural History Museum
   "Hoverflies" and "Stick and leaf insects" pages; Royal Entomological Society insect fact sheets (true flies have one
   pair of wings, wasps and bees two; hoverflies cannot sting; only female wasps and bees have a sting); Butterfly
   Conservation "Cinnabar" (caterpillars store poisons from ragwort and carry warning stripes); Wildlife Trusts "Wasp beetle"
   (harmless beetle mimic of a wasp); Bates (1862) and Müller (1879) on mimicry; Ruxton, Sherratt & Speed (2004)
   "Avoiding Attack" (predators learn warning colours by tasting a few prey). */
const MIM=(()=>{
/* scene 1: hide each insect on the plant part it looks like (masquerade) */
const BUGS=[{t:'Stick insect',k:'stick',home:0},{t:'Leaf insect',k:'leafbug',home:1},{t:'Thorn bug',k:'thornbug',home:2},{t:'Peppered moth',k:'moth',home:3}];
const SPOTS=[{t:'Twig',k:'twig'},{t:'Leaf',k:'leaf'},{t:'Thorny stem',k:'thorn'},{t:'Speckled bark',k:'bark'}];
const HIDEWHY=['A stick insect is long and thin and brown like a twig.','A leaf insect is flat and green, with veins like a leaf.','A thorn bug has a pointed back like a thorn.','A peppered moth is pale with dark speckles, like bark with lichen.'];
/* scene 2: the learner is a young bird; 4 tasty green caterpillars and 4 stinging wasps (k:'wasp') */
const TRAY=['cater','wasp','cater','wasp','wasp','cater','wasp','cater'],LEARN=2;
/* scene 3: can it sting, or is it a harmless copycat? clues a child can see */
const CARDS=[{t:'Common wasp',k:'wasp',sting:true,clue:'4 wings, thin waist, long feelers'},
 {t:'Hoverfly',k:'hover',sting:false,clue:'2 wings, big eyes, no thin waist'},
 {t:'Honeybee',k:'bee',sting:true,clue:'4 wings, hairy body'},
 {t:'Drone fly',k:'drone',sting:false,clue:'2 wings, big eyes: a fly dressed as a bee'},
 {t:'Hornet',k:'hornet',sting:true,clue:'4 wings, thin waist, big and brown-orange'},
 {t:'Wasp beetle',k:'wbeetle',sting:false,clue:'hard wing cases: a beetle dressed as a wasp'}];
/* scene 4: hide, warn or copy? */
const BINS=['Hide','Warn','Copy'];
const SORT=[{t:'Stick insect',k:'stick',bin:0,why:'It hides by looking like a twig.'},{t:'Ladybird',k:'lady',bin:1,why:'Red and black warns: I taste bitter.'},
 {t:'Hoverfly',k:'hover',bin:2,why:'It copies a wasp but cannot sting.'},{t:'Cinnabar caterpillar',k:'cinna',bin:1,why:'Yellow and black stripes warn: I am poisonous.'},
 {t:'Peppered moth',k:'moth',bin:0,why:'It hides by matching speckled bark.'},{t:'Wasp beetle',k:'wbeetle',bin:2,why:'A harmless beetle that copies a wasp.'}];
const ROBOT=[{say:'Bright colours always make an insect easy food.',ok:false,fix:'Bright warning colours tell birds: I sting or taste bad. Birds learn to leave them alone.'},
 {say:'A hoverfly can sting, because it has wasp stripes.',ok:false,fix:'A hoverfly is a fly with no sting. Its stripes only copy a wasp.'},
 {say:'A stick insect stays very still so birds think it is a twig.',ok:true,fix:'Yes. Moving would give it away, so it keeps still or sways like a twig in the wind.'},
 {say:'A young bird has to learn that yellow and black means sting.',ok:true,fix:'Yes. After a nasty taste or two, the bird remembers and leaves stripy insects alone.'},
 {say:'Insects choose to change their shape to trick birds.',ok:false,fix:'They do not choose. They are born looking like this, because their parents looked like this.'}];
const DESC=[
 'Four insects and four plant parts. Tap an insect, then tap where it hides best. You can also drag it.',
 'You are a young bird. Tap an insect to peck it. Green caterpillars are tasty. Find out about the stripy ones.',
 'An insect card with clues. Can it really sting, or is it a harmless copycat? Buttons: Can sting or Copycat.',
 'Six insects and three boxes: Hide, Warn and Copy. Tap an insect, then tap its box.',
 'A robot says things about insect tricks. Buttons: Right or Slip.'];
const DONE=[
 'Each insect hides where its shape and colour match, and it keeps still.',
 'After two stings the bird learned: yellow and black means leave it alone. Two wasps were never pecked.',
 'Wasps, bees and hornets have 4 wings and can sting. Copycats look the same but cannot sting.',
 'Hide: look like the background. Warn: bright colours say I sting or taste bad. Copy: a safe insect looks like a nasty one.',
 'The robot slipped three times: bright is a warning, hoverflies cannot sting, and insects do not choose their looks.'];
const QS=[
 {q:'Why is a wasp yellow and black?',a:'To warn birds that it stings',o:[['So it is easy to see and eat','bright'],['To hide in yellow flowers','bright']]},
 {q:'A hoverfly has yellow and black stripes. Can it sting?',a:'No, it is a harmless copycat',o:[['Yes, all stripy insects sting','sting'],['Yes, but only a little','sting']]},
 {q:'How does a stick insect stay safe?',a:'It looks like a twig and keeps still',o:[['It runs away very fast','still'],['It has bright warning colours','still']]},
 {q:'How does a bird learn to leave wasps alone?',a:'It gets stung or tastes one, then remembers',o:[['It is born knowing','learn'],['Its mother tells it in words','learn']]},
 {q:'Why does a hoverfly copying a wasp help the hoverfly?',a:'Birds that learned wasps sting leave it alone',o:[['It can sting like a wasp','sting'],['It tastes bad like a wasp','sting']]},
 {q:'Which clue shows a hoverfly is a fly, not a wasp?',a:'It has only 2 wings',o:[['It has stripes','clue'],['It visits flowers','clue']]},
 {q:'A ladybird is red and black. What is it saying to birds?',a:'I taste bitter, leave me alone',o:[['Come and eat me','bright'],['I am hiding','bright']]}];
/* insects and plant parts drawn on the lab canvas; u is about half the picture's width */
function paint(g,k,x,y,u){g.save();g.lineCap='round';g.lineJoin='round';const P='#111827';
 const ell=(cx,cy,rx,ry,f,a)=>{g.beginPath();g.ellipse(cx,cy,rx,ry,a||0,0,7);g.fillStyle=f;g.fill()};
 const legs=(cx,cy,w,col)=>{g.strokeStyle=col||P;g.lineWidth=Math.max(1.5,u*.05);[-1,1].forEach(s=>[-.3,0,.3].forEach(d=>{g.beginPath();g.moveTo(cx+d*w,cy);g.lineTo(cx+d*w*1.4,cy+s*w*.6);g.stroke()}))};
 const feel=(cx,cy,len,col)=>{g.strokeStyle=col||P;g.lineWidth=Math.max(1.2,u*.04);[-1,1].forEach(s=>{g.beginPath();g.moveTo(cx,cy);g.quadraticCurveTo(cx-len*.6,cy+s*len*.2,cx-len,cy+s*len*.45);g.stroke()})};
 const wings=(cx,cy,n,len)=>{for(let j=0;j<n;j++){const s=j%2?1:-1,off=j>1?.25:0;ell(cx+len*off,cy+s*len*.45,len*.55,len*.22,'rgba(186,230,253,.85)',s*.5);g.strokeStyle='#64748b';g.lineWidth=1;g.stroke()}};
 const stripes=(cx,cy,rx,ry,n,a,b)=>{ell(cx,cy,rx,ry,a);g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.clip();g.fillStyle=b;for(let j=0;j<n;j++){g.fillRect(cx-rx+(2*j+1)*rx/n*.9,cy-ry,rx/n*.8,ry*2)}g.restore()};
 if(k==='twig'||k==='stick'){g.strokeStyle=k==='twig'?'#78350f':'#92400e';g.lineWidth=u*(k==='twig'?.14:.1);g.beginPath();g.moveTo(x-u,y+u*.1);g.lineTo(x+u,y-u*.1);g.stroke();if(k==='twig'){g.beginPath();g.moveTo(x+u*.2,y);g.lineTo(x+u*.5,y-u*.4);g.stroke()}else legs(x,y,u*.45,'#92400e')}
 if(k==='leaf'||k==='leafbug'){ell(x,y,u*.85,u*.45,k==='leaf'?'#15803d':'#22c55e');g.strokeStyle='#14532d';g.lineWidth=1.5;g.beginPath();g.moveTo(x-u*.8,y);g.lineTo(x+u*.8,y);[-.4,0,.4].forEach(d=>{g.moveTo(x+d*u,y);g.lineTo(x+d*u+u*.2,y-u*.3);g.moveTo(x+d*u,y);g.lineTo(x+d*u+u*.2,y+u*.3)});g.stroke();if(k==='leafbug'){legs(x,y,u*.35,'#14532d');feel(x-u*.8,y,u*.3,'#14532d')}}
 if(k==='thorn'||k==='thornbug'){g.fillStyle='#4d7c0f';g.fillRect(x-u,y-u*.07,u*2,u*.14);if(k==='thorn')[-.6,0,.6].forEach(d=>{g.beginPath();g.moveTo(x+d*u-u*.15,y-u*.07);g.lineTo(x+d*u,y-u*.5);g.lineTo(x+d*u+u*.15,y-u*.07);g.fill()});
  else{g.fillStyle='#65a30d';g.beginPath();g.moveTo(x-u*.35,y-u*.05);g.lineTo(x,y-u*.6);g.lineTo(x+u*.35,y-u*.05);g.fill();g.strokeStyle=P;g.lineWidth=1.5;g.stroke()}}
 if(k==='bark'||k==='moth'){if(k==='bark'){g.fillStyle='#d6d3d1';g.fillRect(x-u*.8,y-u*.6,u*1.6,u*1.2)}else{ell(x-u*.35,y,u*.4,u*.3,'#e7e5e4',-.3);ell(x+u*.35,y,u*.4,u*.3,'#e7e5e4',.3);ell(x,y,u*.08,u*.32,'#57534e')}
  g.fillStyle='#44403c';[[-.5,-.3],[.2,-.2],[-.1,.25],[.5,.3],[-.4,.1],[.35,-.05]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*u*(k==='moth'?.8:1),y+b*u,u*.05,0,7);g.fill()})}
 if(k==='cater'){[-.6,-.3,0,.3,.6].forEach((d,j)=>{g.beginPath();g.arc(x+d*u,y,u*.2,0,7);g.fillStyle=j===0?'#15803d':'#4ade80';g.fill()})}
 if(k==='cinna'){[-.6,-.3,0,.3,.6].forEach(d=>{g.beginPath();g.arc(x+d*u,y,u*.2,0,7);g.fillStyle='#facc15';g.fill();g.fillStyle=P;g.fillRect(x+d*u-u*.05,y-u*.2,u*.1,u*.4)})}
 if(k==='wasp'||k==='hornet'){wings(x,y-u*.1,4,u*.6);stripes(x+u*.35,y,u*.4,u*.22,3,k==='hornet'?'#f59e0b':'#facc15',k==='hornet'?'#7c2d12':P);ell(x-u*.15,y,u*.18,u*.15,k==='hornet'?'#9a3412':P);ell(x-u*.45,y,u*.18,u*.17,k==='hornet'?'#f59e0b':'#facc15');feel(x-u*.55,y,u*.45)}
 if(k==='hover'||k==='drone'){wings(x,y-u*.1,2,u*.6);stripes(x+u*.15,y,u*.42,u*.27,k==='drone'?2:4,k==='drone'?'#b45309':'#facc15',P);ell(x-u*.4,y,u*.22,u*.22,'#7f1d1d');feel(x-u*.55,y,u*.15)}
 if(k==='bee'){wings(x,y-u*.1,4,u*.55);stripes(x+u*.25,y,u*.42,u*.27,3,'#f59e0b',P);ell(x-u*.3,y,u*.2,u*.18,'#78350f');feel(x-u*.45,y,u*.3)}
 if(k==='wbeetle'){ell(x+u*.15,y,u*.5,u*.25,'#facc15');g.fillStyle=P;[-.15,.15,.45].forEach(d=>g.fillRect(x+d*u,y-u*.25,u*.08,u*.5));g.strokeStyle=P;g.lineWidth=1.5;g.beginPath();g.moveTo(x-u*.35,y);g.lineTo(x+u*.65,y);g.stroke();ell(x-u*.45,y,u*.15,u*.14,P);feel(x-u*.55,y,u*.5)}
 if(k==='lady'){ell(x,y,u*.5,u*.4,'#dc2626');g.strokeStyle=P;g.lineWidth=2;g.beginPath();g.moveTo(x,y-u*.4);g.lineTo(x,y+u*.4);g.stroke();ell(x-u*.55,y,u*.18,u*.2,P);g.fillStyle=P;[[-.25,-.15],[.25,-.15],[-.2,.2],[.2,.2]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*u,y+b*u,u*.08,0,7);g.fill()})}
 g.restore()}
return{paint,BUGS,SPOTS,HIDEWHY,TRAY,LEARN,CARDS,BINS,SORT,ROBOT,DESC,DONE,QS}})();
