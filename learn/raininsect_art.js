/* Data and pictures for flagraininsect (rainforest insects, ages 5–7; KS1 science 'animals, including humans' and
   'living things and their habitats'). Sources: Smithsonian Tropical Research Institute and Hölldobler & Wilson,
   'The Leafcutter Ants' (2011): Atta and Acromyrmex workers cut leaves, carry the pieces home and chew them into a
   mulch that feeds a fungus garden; the ants eat the fungus, not the leaves; an Atta nest can hold millions of ants.
   Erwin 1982 (Coleopterists Bulletin): fogging 19 trees in Panama found about 1,200 beetle species; Fittkau & Klinge
   1973 (Biotropica): ants and termites make up about a third of the animal biomass in Amazon forest. Natural History
   Museum and Smithsonian 'Blue morpho' (Morpho peleides/menelaus): wings about 12 to 20 cm across, shining blue on
   top from tiny scales, brown with eyespots underneath; at rest the wings are closed and the butterfly is hard to
   see. Hercules beetle (Dynastes hercules, Central and South American rainforest): males up to about 17 cm long with
   the horn; its grubs feed on rotting wood. Orchid bees (Euglossini): shiny green bees that carry orchid and Brazil
   nut pollen. Slips it targets: the biggest animals are the most common; leaf-cutter ants eat leaves; a morpho is
   blue all over; all beetles are tiny; a spider is an insect. */
const RAININSECT=(()=>{
/* step 1: the creatures to count (k = picture, g = 0 insect, 1 other animal) */
const BEASTS=[{k:'ant',t:'Leaf-cutter ant',g:0},{k:'jaguar',t:'Jaguar',g:1},{k:'beetle',t:'Beetle',g:0},{k:'morpho',t:'Blue morpho',g:0},
 {k:'ant',t:'Leaf-cutter ant',g:0},{k:'toucan',t:'Toucan',g:1},{k:'bee',t:'Orchid bee',g:0},{k:'ant',t:'Leaf-cutter ant',g:0},
 {k:'spider',t:'Spider',g:1,why:'A spider has 8 legs, so it is not an insect. Insects have 6 legs.'},{k:'beetle',t:'Beetle',g:0},
 {k:'frog',t:'Tree frog',g:1},{k:'morpho',t:'Blue morpho',g:0},{k:'ant',t:'Leaf-cutter ant',g:0},{k:'bee',t:'Orchid bee',g:0},{k:'ant',t:'Leaf-cutter ant',g:0}];
/* step 4: real lengths in cm (morpho: wings open, side to side) */
const SIZES=[{k:'hercules',t:'Hercules beetle',cm:17,say:'A Hercules beetle can be 17 cm long. That is longer than your hand!'},
 {k:'ant',t:'Leaf-cutter ant',cm:1,say:'A leaf-cutter ant is about 1 cm long. Tiny!'},
 {k:'morpho',t:'Blue morpho',cm:15,say:'A blue morpho is about 15 cm from wing tip to wing tip. A bit wider than your hand.'},
 {k:'bee',t:'Orchid bee',cm:2,say:'An orchid bee is about 2 cm long, like the top of your thumb.'}];
const HAND=13;
/* step 5: jobs insects do in the rainforest */
const JOBS=[{t:'Carry pollen from flower to flower',a:2},{t:'Cut leaves to feed a fungus farm',a:0},{t:'Eat rotting wood and help make soil',a:1}];
const WORKERS=[{k:'ant',t:'Leaf-cutter ant'},{k:'hercules',t:'Hercules beetle grub'},{k:'bee',t:'Orchid bee'}];
const WWHY=['Leaf-cutter ants cut and carry leaves. They do not visit flowers for pollen, and they do not eat wood.',
 'Hercules beetle grubs live in fallen logs and eat the rotting wood. That helps turn old trees into soil.',
 'Orchid bees fly from flower to flower. Pollen sticks to them and helps new seeds grow.'];
const DESC=['Fifteen rainforest animals in a grid, with two tally bars: Insects and Other animals. Tap each animal to count it, or use the Count button.',
 'A tree on the left, an ant trail, and an ant nest on the right with a fungus garden inside. Drag a leaf piece from the tree to the nest, or use the Carry button. Do it three times.',
 'A blue morpho butterfly on a branch. Its wings are shut, so you see the brown side with eye spots. Tap the butterfly or use the buttons to open or shut its wings.',
 'A ruler from 0 to 20 centimetres with a child\'s hand drawn on it, 13 cm long. Four insect cards sit above. Drag a card to the ruler, or use the buttons, to see how long each one is.',
 'A job card at the top and three insects below: a leaf-cutter ant, a Hercules beetle grub and an orchid bee. Tap the insect that does the job.'];
const TXT=['Tap every animal to count it. Which group has the most?',
 'Help the ants. Drag 3 leaf pieces home to the nest.',
 'Fly to the flowers, then hide from the bird. Open or shut the wings.',
 'Put each insect on the ruler. Is it longer than a hand?',
 'Who does each job in the rainforest?'];
const DONE=['11 insects and only 4 other animals. Insects are the animals there are most of in a rainforest.',
 'The ants chew the leaves to feed the fungus. Then they eat the fungus. They are farmers!',
 'Open wings flash bright blue. Shut wings are brown with eye spots, so the bird flies past.',
 'Ants and bees are tiny, but a morpho is wider than a hand, and a Hercules beetle is longer than one.',
 'Ants farm, bees carry pollen, and beetle grubs turn old wood into soil. Every insect has a job.'];
const QS=[{q:'Which animals are there most of in a rainforest?',a:'Insects',o:[['Jaguars','big'],['Monkeys','big']]},
 {q:'What do leaf-cutter ants eat?',a:'A fungus they grow',o:[['The leaves they cut','leaf'],['Other ants','leaf']]},
 {q:'Why do leaf-cutter ants carry leaves home?',a:'To feed their fungus garden',o:[['To eat the leaves','leaf'],['To make a roof','roof']]},
 {q:'A blue morpho shuts its wings. What colour do you see?',a:'Brown, with eye spots',o:[['Bright blue','blue'],['White','blue']]},
 {q:'How long can a Hercules beetle be?',a:'Longer than your hand',o:[['As small as an ant','tiny'],['Smaller than your thumb','tiny']]},
 {q:'Is a spider an insect?',a:'No, it has 8 legs',o:[['Yes, it is a minibeast','spider'],['Yes, it has 6 legs','spider']]},
 {q:'There are 4 ants on a leaf and 3 more come. How many ants?',a:'7',o:[['6','add'],['43','add']]}];
/* canvas helpers: wrapped text, banner, cards, and simple pictures of rainforest animals */
function SHAPES(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const next=line?line+' '+w:w;if(line&&c.measureText(next).width>max){out.push(line);line=w}else line=next}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+6}return y}
 function card(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!t)return;let n=sz(o.n||14),L;
  for(;;){L=wrap(t,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=9)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  const y0=o.top?r.y+r.h-L.length*n*1.2/2-6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,y0+(i-(L.length-1)/2)*n*1.2))}
 function legs(c,n,u,col){c.strokeStyle=col;c.lineWidth=Math.max(1.5,u*.07);c.lineCap='round';const k=n/2;for(let i=0;i<k;i++){const x=-u*.12+i*u*.12,lean=(i-(k-1)/2)*.35;[-1,1].forEach(d=>{c.beginPath();c.moveTo(x,0);c.lineTo(x+lean*u*.4,d*u*.36);c.lineTo(x+lean*u*.7,d*u*.58);c.stroke()})}}
 /* an animal drawn in a box of size s centred on (x,y); open is for the morpho's wings */
 function beast(k,x,y,s,open){const c=g(),u=s/2;c.save();c.translate(x,y);c.lineJoin='round';
  if(k==='ant'){legs(c,6,u,'#7c2d12');c.fillStyle='#9a3412';[[-u*.45,u*.16],[0,u*.12],[u*.42,u*.22]].forEach(([a,r])=>{c.beginPath();c.ellipse(a,0,r*1.2,r,0,0,7);c.fill()});
   c.fillStyle='#16a34a';c.beginPath();c.moveTo(u*.35,-u*.15);c.quadraticCurveTo(u*.55,-u*.95,u*.95,-u*.7);c.quadraticCurveTo(u*.8,-u*.2,u*.35,-u*.15);c.fill()}
  else if(k==='beetle'||k==='hercules'){legs(c,6,u,'#1c1917');c.fillStyle=k==='hercules'?'#a16207':'#065f46';c.beginPath();c.ellipse(-u*.1,0,u*.5,u*.34,0,0,7);c.fill();c.strokeStyle='#1c1917';c.lineWidth=1.5;c.beginPath();c.moveTo(-u*.6,0);c.lineTo(u*.4,0);c.stroke();
   c.fillStyle='#1c1917';c.beginPath();c.arc(u*.48,0,u*.16,0,7);c.fill();if(k==='hercules'){c.lineWidth=Math.max(3,u*.1);c.lineCap='round';c.beginPath();c.moveTo(u*.45,-u*.05);c.quadraticCurveTo(u*.9,-u*.25,u*.98,u*.02);c.stroke();c.beginPath();c.moveTo(u*.55,u*.08);c.lineTo(u*.85,u*.12);c.stroke()}}
  else if(k==='morpho'){const w=open?1:.35;[-1,1].forEach(d=>{c.fillStyle=open?'#0284c7':'#78350f';c.beginPath();c.ellipse(d*u*.45*w,-u*.2,u*.48*w,u*.38,d*.3,0,7);c.fill();c.beginPath();c.ellipse(d*u*.32*w,u*.32,u*.32*w,u*.28,-d*.3,0,7);c.fill();
    if(!open){c.fillStyle='#fde68a';c.beginPath();c.arc(d*u*.42*w,-u*.25,u*.09,0,7);c.fill();c.fillStyle='#1c1917';c.beginPath();c.arc(d*u*.42*w,-u*.25,u*.045,0,7);c.fill()}else{c.strokeStyle='#0c4a6e';c.lineWidth=2;c.beginPath();c.ellipse(d*u*.45,-u*.2,u*.48,u*.38,d*.3,0,7);c.stroke()}});
   c.fillStyle='#1c1917';c.beginPath();c.ellipse(0,0,u*.07,u*.5,0,0,7);c.fill();c.strokeStyle='#1c1917';c.lineWidth=1.5;[-1,1].forEach(d=>{c.beginPath();c.moveTo(0,-u*.45);c.lineTo(d*u*.18,-u*.8);c.stroke()})}
  else if(k==='bee'){c.fillStyle='#bae6fd';[-1,1].forEach(d=>{c.beginPath();c.ellipse(d*u*.12,-u*.38,u*.16,u*.28,d*.5,0,7);c.fill()});c.fillStyle='#059669';c.beginPath();c.ellipse(0,u*.05,u*.55,u*.3,0,0,7);c.fill();
   c.strokeStyle='#064e3b';c.lineWidth=Math.max(2,u*.06);[-.2,.1].forEach(a=>{c.beginPath();c.moveTo(a*u,-u*.27);c.lineTo(a*u,u*.35);c.stroke()});c.fillStyle='#064e3b';c.beginPath();c.arc(u*.55,0,u*.18,0,7);c.fill()}
  else if(k==='spider'){legs(c,8,u,'#292524');c.fillStyle='#44403c';c.beginPath();c.ellipse(-u*.2,0,u*.32,u*.26,0,0,7);c.fill();c.beginPath();c.arc(u*.22,0,u*.18,0,7);c.fill()}
  else if(k==='jaguar'){c.fillStyle='#f59e0b';c.beginPath();c.ellipse(-u*.1,u*.1,u*.6,u*.32,0,0,7);c.fill();c.beginPath();c.arc(u*.55,-u*.15,u*.26,0,7);c.fill();c.fillRect(-u*.55,u*.2,u*.14,u*.5);c.fillRect(u*.2,u*.2,u*.14,u*.5);
   c.fillStyle='#451a03';[[-.4,0],[-.1,.15],[.2,0],[-.25,.25],[.05,-.05]].forEach(([a,b])=>{c.beginPath();c.arc(a*u,b*u,u*.06,0,7);c.fill()})}
  else if(k==='toucan'){c.fillStyle='#111827';c.beginPath();c.ellipse(-u*.1,u*.1,u*.32,u*.48,0,0,7);c.fill();c.fillStyle='#fef3c7';c.beginPath();c.arc(0,-u*.25,u*.18,0,7);c.fill();c.fillStyle='#f97316';c.beginPath();c.moveTo(u*.12,-u*.35);c.quadraticCurveTo(u*.9,-u*.4,u*.85,-u*.1);c.lineTo(u*.12,-u*.15);c.closePath();c.fill()}
  else if(k==='frog'){c.fillStyle='#22c55e';c.beginPath();c.ellipse(0,u*.1,u*.5,u*.35,0,0,7);c.fill();[-1,1].forEach(d=>{c.fillStyle='#dc2626';c.beginPath();c.arc(d*u*.25,-u*.22,u*.14,0,7);c.fill();c.fillStyle='#111827';c.beginPath();c.arc(d*u*.25,-u*.22,u*.06,0,7);c.fill()})}
  c.restore()}
 return{wrap,banner,card,beast,sz,fg,dk,INK,OK,NO,RIM,F}}
return{BEASTS,SIZES,HAND,JOBS,WORKERS,WWHY,DESC,TXT,DONE,QS,SHAPES}})();
