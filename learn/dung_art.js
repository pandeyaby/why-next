/* Data, text helpers and drawings for flagdung (fossilised dinosaur dung, ages 7–9; Buckland 1829 named coprolites
   after Mary Anning found fish bones and scales inside "bezoar stones" from Lyme Regis ichthyosaurs; Chin et al.
   1998 Nature 393: a 44 cm theropod coprolite from Saskatchewan, 30–50% bone of a young plant-eating dinosaur,
   most likely from Tyrannosaurus rex; Chin 2007 Palaios: duck-billed dinosaur coprolites with rotted conifer wood;
   Natural History Museum London and Smithsonian guides to coprolites and thin sections; DfE National Curriculum 2013
   Year 3 rocks and fossils, Year 6 evolution and inheritance: fossils as evidence). Slips it targets: "it is still
   soft poo", "any dung left lying about turns to stone", "big poo always means a plant-eater", "the poo tells us the
   name of the dinosaur for sure" and "a coprolite is just a rock that tells us nothing". */
const DUNG=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function pen(A,K){const z=n=>Math.round(A.narrow?n:n*1.16);
 function txt(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${z(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const L=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){L.push(cur);cur=w}else cur=t}L.push(cur);
  L.forEach((t,i)=>g.fillText(t,x,y+(i-(L.length-1)/2)*z(n)*1.2))}
 function pill(b,fill,m){const g=A.ctx;g.fillStyle=m==='ok'?'#dcfce7':m==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(11,b.h/3));g.fill();
  g.lineWidth=m?3:1.5;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[m]||K.rim;g.stroke()}
 function row(n,a,gap){gap=gap==null?8:gap;const w=(a.w-gap*(n-1))/n;return Array.from({length:n},(_,i)=>box(a.x+i*(w+gap),a.y,w,a.h))}
 function cells(n,cols,a,gap){gap=gap||8;const r=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(r-1))/r;return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{z,txt,pill,row,cells}}
/* 1. how dung becomes a coprolite: order 0-3; the extra card is a slip */
const FORM=[{t:'A dinosaur does a poo',o:0},{t:'Mud covers it fast',o:1},{t:'Minerals soak in for a very long time',o:2},{t:'It turns to stone: a coprolite',o:3},{t:'It dries in the sun for a week',s:'sun'}];
/* 2. what is inside: bits drawn in the slice, matched to names */
const BITS=[{n:'Bone',u:.24,v:.42},{n:'Seed',u:.5,v:.68},{n:'Wood',u:.76,v:.42},{n:'Fish scale',u:.5,v:.22}];
/* 3. who ate what: diet 0 plant, 1 meat, 2 fish */
const DIETS=['Plant-eater','Meat-eater','Fish-eater'];
const POOS=[{t:'Broken bits of bone',d:1,sh:'bone'},{t:'Rotted wood and seeds',d:0,sh:'wood'},{t:'Fish scales and fish bones',d:2,sh:'fish'},
 {t:'Leaf bits and pollen',d:0,sh:'leaves'},{t:'Crushed bone and a tooth',d:1,sh:'tooth'}];
/* 4. measure, then who made it (all three are known from the Frenchman Formation, Saskatchewan, about 66 million years ago) */
const LEN=44,MAKERS=[{t:'Triceratops',d:'big plant-eater',s:'plantbig'},{t:'T. rex',d:'big meat-eater',ok:1},{t:'A small raptor',d:'small meat-eater',s:'small'}];
/* 5. what we can say */
const CLAIMS=[{t:'It is fossil dung',k:0},{t:'The animal ate bone',k:0},{t:'It was made by a big animal',k:0},
 {t:'It was T. rex, for sure',k:1,s:'sure'},{t:'It is just a rock, so it tells us nothing',k:1,s:'nothing'},{t:'The dinosaur was angry that day',k:1,s:'mood'}];
const DESC=['Five cards. Drag four of them into the boxes in order, to show how a poo becomes a coprolite.',
 'A coprolite, uncut. Drag across it to cut a slice. Then drag each name onto the bit it matches.',
 'Five coprolites, cut open. Drag each one to the animal that made it, using what is inside.',
 'A coprolite from Canada. Drag the arrow along the ruler to its end to measure it. Then pick who made it.',
 'What can a scientist say about the 44 cm coprolite? Drag each card to We can say, or Too sure.','Challenge.'];
const DONE=['Dung buried fast in mud slowly fills with minerals and turns to stone. That stone is a coprolite.',
 'Scientists cut thin slices to see inside. Bone, seeds, wood and fish scales show what the animal ate.',
 'Bone means a meat-eater, plants mean a plant-eater, and fish scales mean a fish-eater.',
 'A 44 cm coprolite full of bone came from a big meat-eater. T. rex was the big meat-eater living there.',
 'Clues give a best guess, not a sure answer. Scientists say “most likely” when nobody saw it happen.'];
const QS=[{q:'What is a coprolite?',a:'Fossil dung that has turned to stone',o:[['Soft, smelly old poo','soft'],['A dinosaur egg','egg']]},
 {q:'A coprolite has fish scales inside. What did the animal eat?',a:'Fish',o:[['Plants','fish'],['Rocks','fish']]},
 {q:'A big coprolite is full of broken bone. Who most likely made it?',a:'A big meat-eater',o:[['A big plant-eater','plantbig'],['A tiny insect','small']]},
 {q:'How do scientists see what is inside a coprolite?',a:'They cut thin slices or scan it',o:[['They smell it','soft'],['They melt it','melt']]},
 {q:'Why must dung be covered fast to become a fossil?',a:'So it does not rot or get eaten first',o:[['So it can dry in the sun','sun'],['So it stays soft','soft']]},
 {q:'Can scientists be sure which dinosaur did a poo?',a:'No, it is a best guess from clues',o:[['Yes, always','sure'],['Yes, the name is inside','sure']]},
 {q:'A coprolite has rotted wood in it. What does it tell us?',a:'The animal ate plants, even old wood',o:[['Nothing: it is just a rock','nothing'],['The animal ate meat','wood']]}];
/* ---------- drawings ---------- */
function lump(g,x,y,w,h,cut){g.save();g.fillStyle='#78350f';g.strokeStyle='#451a03';g.lineWidth=2;g.beginPath();
 const k=6;for(let i=0;i<=k;i++){const u=i/k,px=x+u*w,py=y+h*(.18+.1*Math.sin(u*9));i?g.lineTo(px,py):g.moveTo(px,py)}
 for(let i=k;i>=0;i--){const u=i/k,px=x+u*w,py=y+h*(.86-.08*Math.cos(u*7));g.lineTo(px,py)}g.closePath();g.fill();g.stroke();
 g.strokeStyle='#a16207';g.lineWidth=1.5;[.25,.5,.72].forEach(u=>{g.beginPath();g.arc(x+w*u,y+h*.52,h*.18,-.6,.6);g.stroke()});g.restore()}
function slice(g,b,found){g.save();g.fillStyle='#a8a29e';g.strokeStyle='#44403c';g.lineWidth=2.5;g.beginPath();g.ellipse(b.x+b.w/2,b.y+b.h/2,b.w/2,b.h/2,0,0,7);g.fill();g.stroke();
 const r=Math.min(b.w,b.h)*.1;BITS.forEach((o,i)=>{const x=b.x+b.w*o.u,y=b.y+b.h*o.v;g.save();
  if(i===0){g.fillStyle='#fef3c7';g.beginPath();g.ellipse(x,y,r*1.5,r*.8,.5,0,7);g.fill();g.fillStyle='#92400e';[[-.6,0],[0,-.2],[.6,.1],[.2,.4]].forEach(([a,c])=>{g.beginPath();g.arc(x+a*r,y+c*r,r*.15,0,7);g.fill()})}
  if(i===1){g.fillStyle='#365314';g.beginPath();g.ellipse(x,y,r*.75,r*1.05,0,0,7);g.fill();g.strokeStyle='#d9f99d';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y-r*.8);g.lineTo(x,y+r*.8);g.stroke()}
  if(i===2){g.fillStyle='#a16207';g.fillRect(x-r*1.3,y-r*.6,r*2.6,r*1.2);g.strokeStyle='#fde68a';g.lineWidth=1.2;[-.3,0,.3].forEach(c=>{g.beginPath();g.moveTo(x-r*1.2,y+c*r);g.lineTo(x+r*1.2,y+c*r);g.stroke()})}
  if(i===3){g.fillStyle='#bae6fd';g.strokeStyle='#075985';g.lineWidth=1.5;g.beginPath();g.arc(x,y,r,Math.PI,0);g.closePath();g.fill();g.stroke();[.4,.7].forEach(k=>{g.beginPath();g.arc(x,y,r*k,Math.PI,0);g.stroke()})}
  if(found&&found[i]){g.fillStyle='#ffffff';g.strokeStyle='#047857';g.lineWidth=2;const t=BITS[i].n;g.font='800 11px system-ui,sans-serif';const w=g.measureText(t).width+10;
   A0(g,x-w/2,y+r*1.2,w,16);g.fillStyle='#065f46';g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y+r*1.2+8)}g.restore()});g.restore()}
function A0(g,x,y,w,h){g.beginPath();g.rect(x,y,w,h);g.fill();g.stroke()}
return{box,inside,pen,FORM,BITS,DIETS,POOS,LEN,MAKERS,CLAIMS,DESC,DONE,QS,lump,slice}})();
