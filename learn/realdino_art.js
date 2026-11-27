/* Data and drawings for flagrealdino (real dinosaurs or not? Science, Dinosaurs and palaeontology, ages 5-7).
   Sources: Natural History Museum, London, 'Pterosaurs: flying reptiles', 'Were plesiosaurs dinosaurs?' and 'What is a
   dinosaur?' (dinosaurs lived on land and held their legs straight under the body; pterosaurs and marine reptiles were
   close relatives, not dinosaurs); American Museum of Natural History, 'What makes a dinosaur a dinosaur?' and
   'Dimetrodon is not a dinosaur' (it lived about 295-272 million years ago, before dinosaurs, and is closer to mammals);
   Turner, Makovicky and Norell (2007) Science 317: 1721, quill knobs on Velociraptor (feathered, about turkey-sized);
   non-bird dinosaurs died out 66 million years ago; Homo sapiens about 300,000 years ago; woolly mammoths lived alongside
   people until about 4,000 years ago. Slips it targets: every big or old animal is a dinosaur; flying and swimming
   reptiles are dinosaurs; people and dinosaurs lived together; films and cartoons show dinosaurs as they really were. */
const RDN=(()=>{
/* step 1: the scene. z: 1 = a dinosaur, 0 = not; where: sky, land or sea */
const SCENE=[{id:'rex',name:'T. rex',z:1,where:'land',yes:'T. rex is a real dinosaur. It walked on land.'},
 {id:'diplo',name:'Diplodocus',z:1,where:'land',yes:'Diplodocus is a real dinosaur. It walked on land on four big legs.'},
 {id:'ptero',name:'Pteranodon',z:0,where:'sky',not:'Pteranodon flew, but it was a flying reptile, not a dinosaur.'},
 {id:'plesio',name:'Plesiosaurus',z:0,where:'sea',not:'Plesiosaurus swam in the sea. It was a sea reptile, not a dinosaur.'},
 {id:'mammoth',name:'Woolly mammoth',z:0,where:'land',not:'A woolly mammoth had fur. It was a mammal, like an elephant, not a dinosaur.'}];
/* step 3: who came first? order 0 = longest ago */
const TIME=[{id:'dimetro',name:'Dimetrodon',ord:0},{id:'rex',name:'T. rex',ord:1},{id:'mammoth',name:'Woolly mammoth',ord:2},{id:'people',name:'People',ord:3}];
const TIMENO={dimetro:'Dimetrodon came first, even before the dinosaurs.',rex:'T. rex lived after Dimetrodon and long before mammoths.',
 mammoth:'Mammoths came long after the dinosaurs died out, but before people.',people:'People came last of all. No person ever saw a living T. rex.'};
const SLOTLAB=['1st: longest ago','2nd','3rd','4th: nearest now'];
/* step 4: real or only in films? z: 1 = real, 0 = only in films */
const FACTS=[{t:'Velociraptor was as tall as a man',z:0,no:'That is only in films. The real Velociraptor was about the size of a turkey.'},
 {t:'Some dinosaurs had feathers',z:1,no:'This is real. Fossils show feathers on many small dinosaurs, like Velociraptor.'},
 {t:'People rode on dinosaurs',z:0,no:'That is only in cartoons. People came millions of years after the dinosaurs.'},
 {t:'T. rex had tiny arms',z:1,no:'This is real. T. rex fossils have short arms with two fingers.'},
 {t:'Dinosaurs swam in the sea with flippers',z:0,no:'That is made up. Sea reptiles with flippers, like Plesiosaurus, were not dinosaurs.'},
 {t:'Velociraptor was the size of a turkey',z:1,no:'This is real. Its fossils show it was about as big as a turkey.'}];
const BINS=['Only in films','Real'];
/* step 5: the dinosaur check. a: answers to the three checks (1 = yes) */
const CHECKS=['Did it walk on land?','Were its legs straight under its body?','Did it live in dinosaur times?'];
const BEASTS=[{id:'stego',name:'Stegosaurus',a:[1,1,1],why:['Yes, Stegosaurus walked on land.','Yes, its legs went straight down, like pillars.','Yes, it lived about 150 million years ago, in dinosaur times.']},
 {id:'dimetro',name:'Dimetrodon',a:[1,0,0],why:['Yes, it walked on land.','No, its legs stuck out to the side, like a lizard.','No, it lived before the first dinosaurs.']},
 {id:'ichthy',name:'Ichthyosaurus',a:[0,0,1],why:['No, it lived in the sea.','No, it had flippers, not legs.','Yes, it lived in dinosaur times.']}];
const DESC=['A picture with sky, land and sea. Five animals from long ago. Tap each one that is not a dinosaur.',
 'A dinosaur seen from the front with its legs sticking out to the side. Drag each foot under its body, or tap a leg.',
 'Four cards and a time line from long ago to now. Drag each card to its place, or tap a card and then a place.',
 'Six cards about dinosaurs. Drag each one into Real or Only in films.',
 'Three animals from long ago. For each one, answer three checks with Yes or No.'];
const TXT=['Dinosaurs lived on land. Flying reptiles and sea reptiles lived at the same time, but they were not dinosaurs.',
 'A lizard\u2019s legs stick out to the side. A dinosaur\u2019s legs went straight down under its body.',
 'The dinosaurs died out long, long ago. People came much later, so no person ever saw a living dinosaur.',
 'Films and cartoons are made up. Fossils tell us what dinosaurs were really like.',
 'To be a dinosaur, it must pass every check. If it fails one, it is not a dinosaur.'];
const DONE=['Pteranodon, Plesiosaurus and the mammoth are not dinosaurs. T. rex and Diplodocus are.','Legs straight under the body hold a dinosaur up high, like table legs.',
 'Dimetrodon, then T. rex, then mammoths, then people. People never met a dinosaur.','Feathers, tiny T. rex arms and a turkey-sized Velociraptor are real. The rest is only in films.',
 'Stegosaurus passes every check. Dimetrodon and Ichthyosaurus fail a check, so they are not dinosaurs.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Pteranodon flew in the sky. Was it a dinosaur?',a:'No, it was a flying reptile',o:[['Yes, a flying dinosaur','fly'],['Yes, it lived long ago','old']]},
 {q:'Plesiosaurus swam in the sea. Was it a dinosaur?',a:'No, it was a sea reptile',o:[['Yes, a sea dinosaur','sea'],['Yes, because it was big','big']]},
 {q:'Did people ever see a living T. rex?',a:'No, people came much later',o:[['Yes, people in caves did','time'],['Yes, I saw one in a film','film']]},
 {q:'How did a dinosaur stand?',a:'Legs straight under its body',o:[['Legs out to the side, like a lizard','legs'],['On flippers','sea']]},
 {q:'A woolly mammoth had fur. Was it a dinosaur?',a:'No, it was a mammal',o:[['Yes, it lived long ago','old'],['Yes, it was huge','big']]},
 {q:'A film shows Velociraptor as tall as a man. How big was it really?',a:'About as big as a turkey',o:[['As tall as a man','film'],['As big as a bus','big']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function round(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fit(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';round(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:1.8;g.stroke();
 let n=size||17,rows;do{rows=fit(g,label,r.w-14,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-8)break;n--}while(n>11);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=fit(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=fit(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
function emoji(g,ch,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
const ell=(g,x,y,rx,ry,a)=>{g.beginPath();g.ellipse(x,y,rx,ry,a||0,0,7);g.fill()};
/* simple side-view silhouettes, about s px wide, centred on x, y */
function ptero(g,x,y,s){g.fillStyle='#b45309';g.beginPath();g.moveTo(x-s*.5,y-s*.05);g.lineTo(x,y+s*.04);g.lineTo(x+s*.5,y-s*.05);g.lineTo(x+s*.08,y+s*.14);g.lineTo(x-s*.08,y+s*.14);g.closePath();g.fill();
 g.fillStyle='#78350f';ell(g,x,y+s*.08,s*.09,s*.05);g.beginPath();g.moveTo(x+s*.06,y+s*.04);g.lineTo(x+s*.32,y+s*.1);g.lineTo(x+s*.06,y+s*.1);g.fill();g.beginPath();g.moveTo(x+s*.04,y+s*.05);g.lineTo(x-s*.14,y-s*.08);g.lineTo(x+s*.02,y+s*.09);g.fill()}
function plesio(g,x,y,s){g.fillStyle='#14532d';ell(g,x-s*.05,y+s*.08,s*.26,s*.12);g.lineWidth=s*.07;g.strokeStyle='#14532d';g.lineCap='round';g.beginPath();g.moveTo(x+s*.15,y+s*.02);g.quadraticCurveTo(x+s*.36,y-s*.1,x+s*.36,y-s*.3);g.stroke();
 ell(g,x+s*.4,y-s*.32,s*.07,s*.045);g.beginPath();g.moveTo(x-s*.28,y+s*.08);g.lineTo(x-s*.5,y+s*.14);g.lineTo(x-s*.28,y+s*.14);g.fill();
 g.fillStyle='#052e16';ell(g,x+s*.08,y+s*.22,s*.12,s*.035,.5);ell(g,x-s*.2,y+s*.22,s*.12,s*.035,.5)}
function dimetro(g,x,y,s){g.fillStyle='#9a3412';g.beginPath();g.moveTo(x-s*.2,y);g.quadraticCurveTo(x,y-s*.5,x+s*.2,y);g.closePath();g.fill();g.strokeStyle='#fdba74';g.lineWidth=1.5;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(x+k*s*.055,y);g.lineTo(x+k*s*.055,y-s*.36*(1-Math.abs(k)/4.2));g.stroke()}
 g.fillStyle='#7c2d12';ell(g,x,y+s*.04,s*.28,s*.07);ell(g,x+s*.32,y+s*.02,s*.08,s*.05);g.beginPath();g.moveTo(x-s*.26,y+s*.02);g.lineTo(x-s*.55,y+s*.08);g.lineTo(x-s*.26,y+s*.08);g.fill();
 g.strokeStyle='#7c2d12';g.lineWidth=s*.04;g.lineCap='round';[[-.18,-1],[.16,1]].forEach(([dx,d])=>{g.beginPath();g.moveTo(x+dx*s,y+s*.08);g.lineTo(x+dx*s+d*s*.1,y+s*.12);g.lineTo(x+dx*s+d*s*.1,y+s*.18);g.stroke()})}
function ichthy(g,x,y,s){g.fillStyle='#1d4ed8';ell(g,x,y,s*.3,s*.1);g.beginPath();g.moveTo(x+s*.28,y-s*.02);g.lineTo(x+s*.5,y+s*.01);g.lineTo(x+s*.28,y+s*.04);g.fill();
 g.beginPath();g.moveTo(x-s*.26,y);g.lineTo(x-s*.46,y-s*.16);g.lineTo(x-s*.4,y);g.lineTo(x-s*.46,y+s*.14);g.closePath();g.fill();g.beginPath();g.moveTo(x-s*.04,y-s*.09);g.lineTo(x+s*.04,y-s*.22);g.lineTo(x+s*.1,y-s*.08);g.fill();
 g.fillStyle='#1e3a8a';ell(g,x+s*.1,y+s*.11,s*.08,s*.025,.6);g.fillStyle='#fff';ell(g,x+s*.24,y-s*.03,s*.02,s*.02)}
function stego(g,x,y,s){g.fillStyle='#ca8a04';for(let k=-3;k<=3;k++){const px=x+k*s*.08,h=s*(.16-Math.abs(k)*.025);g.beginPath();g.moveTo(px-s*.04,y-s*.1+Math.abs(k)*s*.02);g.lineTo(px,y-s*.1-h+Math.abs(k)*s*.02);g.lineTo(px+s*.04,y-s*.1+Math.abs(k)*s*.02);g.fill()}
 g.fillStyle='#4d7c0f';g.beginPath();g.moveTo(x-s*.32,y);g.quadraticCurveTo(x,y-s*.26,x+s*.3,y+s*.02);g.closePath();g.fill();ell(g,x+s*.36,y+s*.04,s*.07,s*.04);g.beginPath();g.moveTo(x-s*.3,y-s*.02);g.lineTo(x-s*.52,y+s*.02);g.lineTo(x-s*.3,y+s*.04);g.fill();
 g.fillRect(x-s*.22,y,s*.06,s*.18);g.fillRect(x-s*.08,y,s*.06,s*.18);g.fillRect(x+s*.1,y,s*.06,s*.18);g.fillRect(x+s*.2,y,s*.05,s*.16)}
/* one animal by id: emoji where there is one, a drawing where there is not */
function beast(g,id,x,y,s){if(id==='rex')return emoji(g,'\u{1F996}',x,y,s*.8);if(id==='diplo')return emoji(g,'\u{1F995}',x,y,s*.8);if(id==='mammoth')return emoji(g,'\u{1F9A3}',x,y,s*.8);if(id==='people')return emoji(g,'\u{1F9D1}',x,y,s*.7);
 ({ptero,plesio,dimetro,ichthy,stego})[id](g,x,y,s)}
/* a creature seen from the front: body, head, and two legs; lx/rx = 0 legs out to the side .. 1 straight under */
function front(g,cx,gy,s,l,r,dk,lab){const lift=s*.18*Math.min(l,r),by=gy-s*.42-lift,hip=s*.2;g.fillStyle=dk?'#86efac':'#15803d';ell(g,cx,by,s*.3,s*.2);ell(g,cx,by-s*.26,s*.12,s*.11);
 g.fillStyle=dk?'#0f172a':'#fff';ell(g,cx-s*.045,by-s*.28,s*.025,s*.025);ell(g,cx+s*.045,by-s*.28,s*.025,s*.025);
 g.strokeStyle=dk?'#86efac':'#166534';g.lineWidth=s*.08;g.lineCap='round';g.lineJoin='round';const leg=(side,t)=>{const hx=cx+side*hip,hy=by+s*.1,fx=hx+side*s*.34*(1-t),kx=hx+side*s*.3*(1-t),ky=hy+(gy-hy)*(t*.5+(1-t)*.1);
  g.beginPath();g.moveTo(hx,hy);g.lineTo(kx,ky);g.lineTo(fx,gy);g.stroke();return{x:fx,y:gy}};const L=leg(-1,l),R=leg(1,r);
 g.strokeStyle=dk?'#94a3b8':EDGE;g.lineWidth=2;g.beginPath();g.moveTo(cx-s*.7,gy+s*.04);g.lineTo(cx+s*.7,gy+s*.04);g.stroke();
 if(lab){g.font=`800 15${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='top';g.fillText(lab,cx,gy+s*.08)}return{L,R,by}}
return{SCENE,TIME,TIMENO,SLOTLAB,FACTS,BINS,CHECKS,BEASTS,DESC,TXT,DONE,QS,round,fit,card,top,emoji,beast,front,ptero,plesio,dimetro,ichthy,stego,INK,LIGHT,OK,NO,EDGE,SEL}})();
