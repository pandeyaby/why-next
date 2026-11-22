/* Data, text helpers and drawings for flagtundra (the Arctic tundra, ages 7–9; NSIDC "All about frozen ground":
   permafrost is ground that stays at or below 0 °C for at least two years in a row, and the active layer above it
   thaws each summer; National Geographic and NASA Earth Observatory tundra biome pages: treeless, a growing season
   of about 50–60 days, mosses, lichens, sedges, cotton grass and dwarf shrubs; meltwater cannot drain through
   permafrost, so summer ground is boggy; US Fish & Wildlife Service and Arctic Council CAFF species notes on
   caribou, musk oxen, lemmings, snowy owls and Arctic foxes; DfE National Curriculum 2013 Year 4 living things and
   their habitats, Year 6 adaptation). Slips it targets: "the tundra is ice all year", "permafrost means the whole
   ground is frozen even in summer", "the meltwater soaks deep down", "no trees because there is no water",
   "penguins live on the Arctic tundra" and "nothing lives or grows there". */
const TUND=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function quill(A,K){const z=n=>Math.round(A.narrow?n:n*1.15);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${z(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const out=[];let line='';String(s).split(' ').forEach(w=>{const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){out.push(line);line=w}else line=t});out.push(line);
  out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*z(n)*1.2))}
 function card(b,fill,m){const g=A.ctx;g.fillStyle=m==='ok'?'#dcfce7':m==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(10,b.h/3));g.fill();
  g.lineWidth=m?3:1.5;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[m]||K.rim;g.stroke()}
 function strip(n,a,gap){gap=gap==null?8:gap;const w=(a.w-gap*(n-1))/n;return Array.from({length:n},(_,i)=>box(a.x+i*(w+gap),a.y,w,a.h))}
 function grid(n,cols,a,gap){gap=gap||8;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{z,say,card,strip,grid}}
/* 1. the pole: depths in cm; the top 50 cm thaws in summer, everything is frozen in winter */
const THAW=50,DEEP=150;
/* 3. what can grow: ok plants, and the tall tree that is refused */
const PLANTS=[{t:'Moss',f:'Moss grows low and soaks up water in the bog.'},{t:'Lichen',f:'Lichen grows on bare rock. It is a fungus and an alga living together. Caribou eat it.'},
 {t:'Arctic willow',f:'This willow grows flat along the ground, only a few cm tall, out of the wind.'},{t:'Arctic poppy',f:'Its cup-shaped flower turns to follow the sun and catch its warmth.'},
 {t:'Cotton grass',f:'Its fluffy white heads grow in wet, boggy ground.'},{t:'Tall pine tree',no:1}];
/* 4. who lives here: k 0 = tundra, 1 = somewhere else */
const BEASTS=[{t:'Caribou',k:0},{t:'Musk ox',k:0},{t:'Lemming',k:0},{t:'Snowy owl',k:0},{t:'Arctic fox',k:0},{t:'Penguin',k:1,s:'penguin'},{t:'Camel',k:1,s:'camel'},{t:'Monkey',k:1,s:'monkey'}];
/* 5. winter tricks: trick i belongs to animal i */
const KEEPERS=['Caribou','Lemming','Musk ox','Snowy owl'];
const TRICKS=['Digs through snow with big hooves to eat lichen','Lives in tunnels under the snow','Has a very long, thick coat','Hunts lemmings, with feathers even on its feet'];
const SAYS=['A tundra ground, cut open. Pick Summer or Winter, then drag the pole down into the ground until it stops.',
 'Three heaps of snow in early summer. Drag the sun onto each heap, or tap it, to melt it. Then tap the layer the water cannot get through.',
 'Bare summer tundra. Drag each plant onto the ground. Only plants that can live here will stay.',
 'Eight animals. Drag each one to Lives on the tundra, or to Lives somewhere else.',
 'Four tundra animals and four winter tricks. Drag each trick onto the animal that uses it.','Challenge.'];
const LEARNT=['Permafrost is ground that stays frozen all year, year after year. In summer only the top layer thaws.',
 'Meltwater cannot sink through the frozen permafrost, so in summer the tundra is full of ponds and bogs.',
 'Mosses, lichens, grasses, flowers and tiny shrubs grow low. Tall trees cannot: their roots hit frozen ground, and the summer is short and windy.',
 'Caribou, musk oxen, lemmings, snowy owls and Arctic foxes live on the tundra. Penguins live in the far south.',
 'Every tundra animal has a way to get through the long, freezing winter.'];
const QUIZ=[{q:'What is permafrost?',a:'Ground that stays frozen all year, year after year',o:[['Snow that falls in winter','snowonly'],['Ice on top of the sea','seaice']]},
 {q:'In summer, how much of the tundra ground thaws?',a:'Only the top layer',o:[['All of it, right down','allthaw'],['None of it','none']]},
 {q:'Why is the tundra boggy in summer?',a:'Meltwater cannot sink through the frozen ground below',o:[['It rains every day','rain'],['The sea floods it','seaice']]},
 {q:'Why are there no tall trees on the tundra?',a:'Frozen ground stops deep roots, and summers are short and windy',o:[['There is no water','water'],['Animals eat every tree','eaten']]},
 {q:'Which animal does NOT live on the Arctic tundra?',a:'Penguin',o:[['Caribou','belongs'],['Lemming','belongs']]},
 {q:'How do lemmings get through the winter?',a:'They live in tunnels under the snow',o:[['They fly south','fly'],['They sleep inside the permafrost','dig']]},
 {q:'What does the tundra look like in summer?',a:'Green and wet, with mosses and flowers',o:[['Covered in ice all year','iceyear'],['A tall, thick forest','water']]}];
/* ---------- drawings ---------- */
function ground(g,b,cut,winter,frozenTop){const top=b.y,act=cut*b.h;g.save();
 g.fillStyle=winter?'#cbd5e1':'#92400e';g.fillRect(b.x,top,b.w,act);g.fillStyle='#64748b';g.fillRect(b.x,top+act,b.w,b.h-act);
 g.fillStyle='#e0f2fe';for(let i=0;i<34;i++){const u=(i*37%100)/100,v=(i*53%100)/100;g.fillRect(b.x+u*b.w,top+act+6+v*(b.h-act-12),4,2)}
 if(winter||frozenTop){g.fillStyle='#e0f2fe';for(let i=0;i<14;i++){const u=(i*41%100)/100,v=(i*29%100)/100;g.fillRect(b.x+u*b.w,top+4+v*(act-8),4,2)}}
 g.strokeStyle='#1e293b';g.lineWidth=2;g.setLineDash([7,5]);g.beginPath();g.moveTo(b.x,top+act);g.lineTo(b.x+b.w,top+act);g.stroke();g.setLineDash([]);
 if(winter){g.fillStyle='#ffffff';g.fillRect(b.x,top-14,b.w,14);g.strokeStyle='#94a3b8';g.lineWidth=1;g.strokeRect(b.x,top-14,b.w,14)}
 else{g.fillStyle='#65a30d';g.fillRect(b.x,top-5,b.w,5)}g.restore()}
function sun(g,x,y,r){g.save();g.fillStyle='#facc15';g.strokeStyle='#a16207';g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();
 for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.25,y+Math.sin(a)*r*1.25);g.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);g.stroke()}g.restore()}
function heap(g,x,y,w,h){g.save();g.fillStyle='#ffffff';g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(x-w/2,y);g.quadraticCurveTo(x-w*.3,y-h,x,y-h);g.quadraticCurveTo(x+w*.3,y-h,x+w/2,y);g.closePath();g.fill();g.stroke();g.restore()}
function sprout(g,i,x,y,s){g.save();g.lineWidth=2;
 if(i===0){g.fillStyle='#4d7c0f';for(let k=-2;k<=2;k++){g.beginPath();g.arc(x+k*s*.18,y-s*.08,s*.14,Math.PI,0);g.fill()}}
 if(i===1){g.fillStyle='#a3a3a3';g.beginPath();g.ellipse(x,y-s*.08,s*.38,s*.12,0,0,7);g.fill();g.fillStyle='#ca8a04';[-.2,.05,.25].forEach(k=>{g.beginPath();g.arc(x+k*s,y-s*.12,s*.07,0,7);g.fill()})}
 if(i===2){g.strokeStyle='#713f12';g.beginPath();g.moveTo(x-s*.4,y-s*.04);g.lineTo(x+s*.4,y-s*.1);g.stroke();g.fillStyle='#16a34a';[-.3,-.1,.1,.3].forEach(k=>{g.beginPath();g.ellipse(x+k*s,y-s*.14,s*.08,s*.04,.4,0,7);g.fill()})}
 if(i===3){g.strokeStyle='#15803d';g.beginPath();g.moveTo(x,y);g.lineTo(x,y-s*.45);g.stroke();g.fillStyle='#facc15';g.beginPath();g.arc(x,y-s*.5,s*.13,0,7);g.fill();g.strokeStyle='#a16207';g.lineWidth=1;g.stroke()}
 if(i===4){g.strokeStyle='#15803d';[-.1,.1].forEach(k=>{g.beginPath();g.moveTo(x+k*s,y);g.lineTo(x+k*s*1.5,y-s*.5);g.stroke()});g.fillStyle='#ffffff';g.strokeStyle='#94a3b8';g.lineWidth=1;[-.15,.15].forEach(k=>{g.beginPath();g.arc(x+k*s*1.5,y-s*.55,s*.09,0,7);g.fill();g.stroke()})}
 if(i===5){g.fillStyle='#78350f';g.fillRect(x-s*.05,y-s*1.4,s*.1,s*1.4);g.fillStyle='#166534';g.beginPath();g.moveTo(x,y-s*1.9);g.lineTo(x+s*.4,y-s*.6);g.lineTo(x-s*.4,y-s*.6);g.closePath();g.fill();
  g.strokeStyle='#78350f';g.beginPath();g.moveTo(x,y);g.lineTo(x,y+s*.9);g.moveTo(x,y+s*.3);g.lineTo(x-s*.3,y+s*.7);g.moveTo(x,y+s*.3);g.lineTo(x+s*.3,y+s*.7);g.stroke()}
 g.restore()}
return{box,inside,quill,THAW,DEEP,PLANTS,BEASTS,KEEPERS,TRICKS,SAYS,LEARNT,QUIZ,ground,sun,heap,sprout}})();
