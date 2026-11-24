/* Data and pictures for flagyanomami (Indigenous rainforest peoples, the Yanomami; ages 5-7). Sources: Survival
   International, 'The Yanomami' (about 45,000 people in the rainforests and mountains of northern Brazil and southern
   Venezuela; large round shared houses called yanos or shabonos, some for up to 400 people; gardens of around 60 crops
   give about 80% of their food, and hunting only about 10%; they gather nuts, shellfish, larvae and 15 kinds of wild
   honey; men hunt peccary, tapir, deer and monkey; no hunter eats the meat he has killed, he shares it out; a new garden
   is cleared every two or three years because Amazon soil is not very fertile; about 500 plants used for food,
   medicine and building); Survival International pages on the Baka (Congo Basin rainforest) and the Penan (Sarawak,
   Borneo). Slips it targets: thinking forest homes are built from shop materials; thinking rainforest peoples live
   only by hunting; thinking they clear the whole forest; thinking they lived only long ago; thinking there is just one
   rainforest people; thinking a hunter keeps his own catch. */
const YANO=(()=>{
/* step 1: build the round house in order. n = build order (-1 = not from the forest) */
const PARTS=[{k:'poles',n:0,t:'Tree poles'},{k:'bricks',n:-1,t:'Bricks',why:'Bricks are made in a factory. The house is built from things that grow in the forest.'},
 {k:'vines',n:1,t:'Vines'},{k:'glass',n:-1,t:'Glass windows',why:'Glass comes from a factory far away. The forest gives poles, vines and leaves.'},{k:'leaves',n:2,t:'Palm leaves'}];
const PART_DO=['Poles stand up to make the frame.','Vines tie the poles together.','Palm leaves make the roof.'];
/* step 2: where does the food come from? z: 0 grow in a garden, 1 gather in the forest, 2 hunt or fish */
const BINS=['Grow in a garden','Gather in the forest','Hunt or fish'];
const FOOD=[{k:'plantain',z:0,t:'Plantains'},{k:'honey',z:1,t:'Wild honey'},{k:'fish',z:2,t:'Fish'},{k:'cassava',z:0,t:'Cassava'},{k:'nuts',z:1,t:'Forest nuts'},{k:'pig',z:2,t:'Wild pig'}];
const FOOD_NO=['Plantains grow in the family garden. Most food comes from the garden.','Nobody plants wild honey. People find it and gather it in the forest.',
 'Fish are caught in the river.','Cassava is a root. It grows in the family garden.','Nobody plants these nuts. People gather them from forest trees.','A wild pig is hunted in the forest.'];
/* step 4: rainforest peoples today */
const ZONES=['Amazon rainforest, South America','Congo rainforest, Africa','Borneo rainforest, Asia'],SHORT=['Amazon','Congo','Borneo'];
const PEOPLE=[{t:'Yanomami',z:0},{t:'Baka',z:1},{t:'Penan',z:2}];
const DESC=['A round house with no parts yet, and five cards. Drag or tap the cards to build the house in order.',
 'One food at a time, and three boxes: grow in a garden, gather in the forest, hunt or fish. Drag the food to a box, or use the buttons.',
 'A forest with six patches and a year counter. Tap a patch to make a garden, then tap Next year.',
 'Three rainforests, and three peoples who live in them today. Drag each name to its rainforest, or use the buttons.',
 'A hunter with six pieces of meat, and three families around the house. Drag or tap each piece to a family.'];
const TXT=['The Yanomami live in the Amazon rainforest. They build a big round house that many families share. Build it.',
 'Where does the food come from? Sort it.','Grow food, then let the forest grow back.','Many peoples live in rainforests today.','A hunter shares his catch.'];
const DONE=['The forest gave everything: poles for the frame, vines to tie, and palm leaves for the roof.',
 'Most food is grown in gardens. People also gather, hunt and fish.',
 'Each small garden is used for about 3 years. Then a new one is made, and the old one grows back into forest.',
 'The Yanomami, the Baka and the Penan all live in rainforests today.',
 'All 6 pieces shared: 2 for each family. The hunter gave it all away, and other hunters share with him.'];
const QS=[{q:'What do the Yanomami build their house from?',a:'Poles, vines and palm leaves',o:[['Bricks and glass','shop'],['Metal from a shop','shop']]},
 {q:'Where does most Yanomami food come from?',a:'Their gardens',o:[['Only from hunting','hunt'],['From a shop','shop']]},
 {q:'The garden soil is tired. What do they do?',a:'Make a new small garden',o:[['Cut down all the forest','cut'],['Stop eating','cut']]},
 {q:'Do people live in rainforests today?',a:'Yes, lots of peoples do',o:[['No, only long ago','past'],['Only the Yanomami','one']]},
 {q:'A hunter brings home meat. What does he do?',a:'Shares it with others',o:[['Eats it all himself','keep'],['Throws it away','keep']]},
 {q:'Who knows which forest plants are food and medicine?',a:'The people who live there',o:[['Nobody knows','past'],['Only visitors from cities','shop']]}];
/* ---------- pictures: always drawn on a white card ---------- */
const INKP='#1e293b',WOOD='#92400e',LEAF='#15803d';
function leaf(g,u,x,y,a,c){g.save();g.translate(x,y);g.rotate(a);g.fillStyle=c||LEAF;g.beginPath();g.ellipse(0,-u*.3,u*.12,u*.32,0,0,7);g.fill();g.strokeStyle='#14532d';g.lineWidth=Math.max(1,u*.02);g.beginPath();g.moveTo(0,0);g.lineTo(0,-u*.6);g.stroke();g.restore()}
function tree(g,u,x,y,s,c){g.fillStyle=WOOD;g.fillRect(x-u*.07*s,y-u*.5*s,u*.14*s,u*.5*s);g.fillStyle=c||LEAF;[[0,-.8,.38],[-.28,-.6,.3],[.28,-.6,.3]].forEach(([a,b,r])=>{g.beginPath();g.arc(x+u*a*s,y+u*b*s,u*r*s,0,7);g.fill()})}
function person(g,u,x,y,h,col,arm){const r=h*.17;g.fillStyle='#a16207';g.beginPath();g.arc(x,y-h+r,r,0,7);g.fill();g.strokeStyle=INKP;g.lineWidth=Math.max(1.5,u*.04);g.stroke();
 g.fillStyle=col;g.fillRect(x-h*.16,y-h+2*r+2,h*.32,h*.42);g.strokeStyle='#78350f';g.lineWidth=Math.max(2,u*.07);g.beginPath();g.moveTo(x-h*.09,y-h*.26);g.lineTo(x-h*.09,y);g.moveTo(x+h*.09,y-h*.26);g.lineTo(x+h*.09,y);
 if(arm){g.moveTo(x+h*.16,y-h+2*r+h*.06);g.lineTo(x+h*.38,y-h*.5)}g.stroke()}
function house(g,u,st){/* the round shared house, built up in 3 stages; centre stays open to the sky */
 const W=u*1.7,H=u*.9,y=u*.55;g.fillStyle='#d6d3d1';g.beginPath();g.ellipse(0,y,W*.55,H*.22,0,0,7);g.fill();
 if(st>=1){g.strokeStyle=WOOD;g.lineWidth=Math.max(2,u*.05);for(let i=0;i<9;i++){const x=-W*.5+i*W/8;g.beginPath();g.moveTo(x,y);g.lineTo(x*.8,y-H*.75);g.stroke()}}
 if(st>=2){g.strokeStyle='#4d7c0f';g.lineWidth=Math.max(1.5,u*.035);[.25,.5].forEach(f=>{g.beginPath();g.moveTo(-W*.5*(1-f*.2),y-H*.75*f);g.quadraticCurveTo(0,y-H*.75*f+u*.06,W*.5*(1-f*.2),y-H*.75*f);g.stroke()})}
 if(st>=3){g.fillStyle='#65a30d';g.strokeStyle='#365314';g.lineWidth=Math.max(1.5,u*.04);g.beginPath();g.moveTo(-W*.56,y-H*.45);g.lineTo(-W*.3,y-H*1.0);g.lineTo(W*.3,y-H*1.0);g.lineTo(W*.56,y-H*.45);g.closePath();g.fill();g.stroke();
  g.fillStyle='#bae6fd';g.beginPath();g.ellipse(0,y-H*1.0,W*.3,H*.12,0,0,7);g.fill();g.stroke();g.strokeStyle='#365314';for(let i=0;i<7;i++){const x=-W*.45+i*W*.15;g.beginPath();g.moveTo(x,y-H*.5);g.lineTo(x*.65,y-H*.95);g.stroke()}}}
function icon(g,n,x,y,s){const u=s/2;g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';
 switch(n){
 case'poles':g.fillStyle=WOOD;[-.45,-.15,.15,.45].forEach(a=>{g.fillRect(u*a-u*.06,-u*.8,u*.12,u*1.6)});g.strokeStyle='#451a03';g.lineWidth=u*.03;[-.45,-.15,.15,.45].forEach(a=>g.strokeRect(u*a-u*.06,-u*.8,u*.12,u*1.6));break;
 case'vines':g.strokeStyle='#4d7c0f';g.lineWidth=u*.08;g.beginPath();g.moveTo(-u*.8,-u*.6);g.bezierCurveTo(-u*.2,-u*.9,0,u*.2,u*.8,-u*.1);g.moveTo(-u*.8,u*.2);g.bezierCurveTo(-u*.3,-u*.1,u*.2,u*.9,u*.8,u*.5);g.stroke();[[-.4,-.62],[.3,-.1],[-.3,.25],[.4,.55]].forEach(([a,b])=>leaf(g,u*.5,u*a,u*b,.8));break;
 case'leaves':for(let i=-3;i<=3;i++)leaf(g,u*1.4,0,u*.75,i*.32,i%2?'#16a34a':LEAF);break;
 case'bricks':g.fillStyle='#b91c1c';g.strokeStyle='#fef2f2';g.lineWidth=u*.05;for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=-u*.8+c*u*.53+(r%2?u*.26:0)-(r%2&&c===2?u*.26:0);g.fillRect(x,-u*.5+r*u*.36,u*.5,u*.33);g.strokeRect(x,-u*.5+r*u*.36,u*.5,u*.33)}break;
 case'glass':g.fillStyle='#e0f2fe';g.fillRect(-u*.7,-u*.7,u*1.4,u*1.4);g.strokeStyle='#475569';g.lineWidth=u*.08;g.strokeRect(-u*.7,-u*.7,u*1.4,u*1.4);g.beginPath();g.moveTo(0,-u*.7);g.lineTo(0,u*.7);g.moveTo(-u*.7,0);g.lineTo(u*.7,0);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=u*.06;g.beginPath();g.moveTo(-u*.5,-u*.2);g.lineTo(-u*.2,-u*.5);g.stroke();break;
 case'plantain':g.fillStyle='#65a30d';g.strokeStyle='#365314';g.lineWidth=u*.04;[-.35,0,.35].forEach(a=>{g.save();g.rotate(a);g.beginPath();g.moveTo(-u*.1,u*.6);g.quadraticCurveTo(-u*.35,-u*.1,0,-u*.75);g.quadraticCurveTo(-u*.05,-u*.1,u*.12,u*.6);g.closePath();g.fill();g.stroke();g.restore()});break;
 case'cassava':g.fillStyle='#a16207';g.strokeStyle='#451a03';g.lineWidth=u*.04;[[-.3,.2,.5],[.25,.3,-.4],[0,-.1,.1]].forEach(([a,b,r])=>{g.save();g.translate(u*a,u*b);g.rotate(r);g.beginPath();g.ellipse(0,0,u*.16,u*.6,0,0,7);g.fill();g.stroke();g.restore()});g.fillStyle='#fef3c7';g.beginPath();g.arc(0,-u*.68,u*.12,0,7);g.fill();g.stroke();break;
 case'honey':g.fillStyle='#f59e0b';g.strokeStyle='#78350f';g.lineWidth=u*.04;for(let i=0;i<7;i++){const a=i?i*Math.PI/3:0,r=i?u*.42:0,cx=Math.cos(a)*r,cy=Math.sin(a)*r;g.beginPath();for(let k=0;k<6;k++){const b=k*Math.PI/3+Math.PI/6;g.lineTo(cx+Math.cos(b)*u*.24,cy+Math.sin(b)*u*.24)}g.closePath();g.fill();g.stroke()}break;
 case'nuts':g.fillStyle='#78350f';g.strokeStyle='#451a03';g.lineWidth=u*.04;[[-.4,.2],[.15,.35],[-.1,-.25],[.45,-.15]].forEach(([a,b],i)=>{g.save();g.translate(u*a,u*b);g.rotate(i*.7);g.beginPath();g.moveTo(0,-u*.32);g.lineTo(u*.22,u*.12);g.lineTo(-u*.22,u*.12);g.closePath();g.fill();g.stroke();g.restore()});break;
 case'fish':g.fillStyle='#0ea5e9';g.strokeStyle='#075985';g.lineWidth=u*.05;g.beginPath();g.ellipse(-u*.1,0,u*.6,u*.32,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(u*.45,0);g.lineTo(u*.85,-u*.3);g.lineTo(u*.85,u*.3);g.closePath();g.fill();g.stroke();g.fillStyle=INKP;g.beginPath();g.arc(-u*.42,-u*.06,u*.06,0,7);g.fill();break;
 case'pig':g.fillStyle='#57534e';g.beginPath();g.ellipse(0,0,u*.65,u*.4,0,0,7);g.fill();g.beginPath();g.ellipse(-u*.62,-u*.05,u*.25,u*.2,0,0,7);g.fill();g.strokeStyle='#57534e';g.lineWidth=u*.12;[-.35,-.1,.2,.45].forEach(a=>{g.beginPath();g.moveTo(u*a,u*.25);g.lineTo(u*a,u*.65);g.stroke()});g.fillStyle='#e7e5e4';g.beginPath();g.arc(-u*.72,-u*.12,u*.05,0,7);g.fill();g.fillStyle='#a8a29e';g.beginPath();g.ellipse(-u*.85,0,u*.07,u*.09,0,0,7);g.fill();break;
 case'meat':g.fillStyle='#b91c1c';g.strokeStyle='#7f1d1d';g.lineWidth=u*.06;g.beginPath();g.ellipse(-u*.1,0,u*.55,u*.4,-.3,0,7);g.fill();g.stroke();g.fillStyle='#fafaf9';g.fillRect(u*.35,-u*.08,u*.45,u*.16);g.beginPath();g.arc(u*.82,-u*.1,u*.1,0,7);g.arc(u*.82,u*.1,u*.1,0,7);g.fill();break;
 case'house':house(g,u,3);break;
 case'hunter':person(g,u,0,u*.85,u*1.6,'#dc2626',1);g.strokeStyle=WOOD;g.lineWidth=u*.05;g.beginPath();g.moveTo(u*.55,-u*.9);g.lineTo(u*.55,u*.8);g.stroke();break;
 case'family':person(g,u,-u*.45,u*.85,u*1.4,'#7c3aed');person(g,u,u*.1,u*.85,u*1.3,'#0891b2');person(g,u,u*.55,u*.85,u*.85,'#f97316');break;
 case'forest':tree(g,u,-u*.4,u*.8,1.2);tree(g,u,u*.4,u*.8,1.1,'#166534');tree(g,u,0,u*.7,1.35,'#16a34a');break;
 case'garden':g.fillStyle='#a16207';g.fillRect(-u*.85,u*.35,u*1.7,u*.45);[-.55,0,.55].forEach(a=>{g.strokeStyle='#166534';g.lineWidth=u*.08;g.beginPath();g.moveTo(u*a,u*.4);g.lineTo(u*a,-u*.2);g.stroke();[-1,1].forEach(d=>leaf(g,u*1.1,u*a,-u*.05,d*.9,'#22c55e'));leaf(g,u*.9,u*a,-u*.15,0,LEAF)});break;
 case'tired':g.fillStyle='#d6d3d1';g.fillRect(-u*.85,u*.35,u*1.7,u*.45);g.strokeStyle='#a16207';g.lineWidth=u*.05;[-.5,0,.5].forEach(a=>{g.beginPath();g.moveTo(u*a,u*.35);g.lineTo(u*a+u*.1,-u*.05);g.stroke()});break;
 case'young':g.fillStyle='#bef264';g.fillRect(-u*.85,u*.35,u*1.7,u*.45);[-.5,0,.5].forEach(a=>tree(g,u,u*a,u*.45,.55));break;
 default:break}
 g.restore()}
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=wrap(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();
  if(o.pic){const th=word?Math.min(r.h*.34,sz(o.n||15)*2.6):0,s=Math.min(r.w*.78,r.h-th-8);icon(c,o.pic,r.x+r.w/2,r.y+5+s/2,s);if(!word)return;r={x:r.x,y:r.y+r.h-th-2,w:r.w,h:th}}
  if(!word)return;let n=sz(o.n||16),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.18<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.18))}
 return{wrap,strip,card,sz,fg,dk,INK,OK,NO,RIM,F}}
return{PARTS,PART_DO,BINS,FOOD,FOOD_NO,ZONES,SHORT,PEOPLE,DESC,TXT,DONE,QS,icon,house,PEN}})();
