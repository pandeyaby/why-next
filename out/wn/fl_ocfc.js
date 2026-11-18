/* Flagship: Ocean Food Chains (ages 5–7; NC Year 2 animals and habitats: "describe how animals obtain their food from
   plants and other animals, using the idea of a simple food chain"; NGSS 5-LS2-1 foundations). Spot the tiny plant-like
   phytoplankton in a drop of sea water, build phytoplankton → krill → fish → shark with "is eaten by" arrows, feed a shark
   and a fish to see that it takes many small ones to feed one big one, fill a blue whale with krill, and take away one
   link to find the one every animal depends on. Not flagchain (land chains), flagfoodweb or flagseaneed. */
(()=>{const lo=Math.min,hi=Math.max;
const DROP=[[.3,.32,1],[.62,.26,1],[.5,.55,0],[.25,.66,1],[.72,.6,1],[.45,.3,0],[.58,.78,1],[.36,.48,0]];
const LINKS=[['🌿','tiny plants','The chain starts with tiny plants. They make their own food from sunlight, so nothing comes before them.'],
 ['🦐','krill','Krill are tiny animals that eat the tiny plants, so they come next.'],
 ['🐟','small fish','Small fish eat krill, so they come after the krill.'],
 ['🦈','shark','A shark eats the small fish, so it goes last, at the top of the chain.']];
const DEAL=[2,0,3,1];
const MEAL=[{to:'🦈',name:'shark',need:4,food:['🐟','small fish'],odd:['🌿','tiny plants','A shark is a hunter. It does not eat tiny plants. It eats fish.']},
 {to:'🐟',name:'small fish',need:5,food:['🦐','krill'],odd:['🦈','shark','A small fish cannot eat a shark. It is far too big! Small fish eat tiny krill.']}];
const GULP=[['🦐','krill',1],['🦈','shark',0],['🐟','big fish',0],['🦭','seal',0]];
VIS.reg('flagocfc',c=>{let A,pad,quiz,qn=-1,gen=0;const W={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',DEEP='#1e3a8a',SEL='#6d28d9';
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2);
const stage=()=>['drop','chain','meal','whale','gone','chal'][A.step];
const centre=g=>{g.textAlign='center';g.textBaseline='middle'};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sea(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#bae6fd',A.col.dark?.1:.5);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=font(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=font(n);w=g.measureText(t).width+22}
 const h=n+16,x0=hi(5,lo(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:RIM;g.stroke();centre(g);g.fillStyle=INK;g.fillText(t,x0+w/2,y+1)}
function chip(r,pic,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.on?4:2;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:RIM;g.stroke();centre(g);
 if(pic){g.font=`${Math.round(lo(r.h*.42,r.w*.38))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(word?.38:.5))}
 if(word){let n=Math.round(hi(11,pic?lo(sz(16),r.h*.21):lo(sz(19),r.h*.36)));g.font=font(n);while(g.measureText(word).width>r.w-8&&n>9){n--;g.font=font(n)}g.fillStyle=INK;g.fillText(word,r.x+r.w/2,r.y+r.h*(pic?.8:.5))}}
function arrow(x0,y,x1,col){const g=A.ctx;g.strokeStyle=col||A.col.tx;g.fillStyle=col||A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1-8,y);g.stroke();g.beginPath();g.moveTo(x1,y);g.lineTo(x1-10,y-7);g.lineTo(x1-10,y+7);g.closePath();g.fill()}
/* 1. a drop of sea water */
const lens=()=>({x:A.W/2,y:A.H*.55,r:lo(A.W*.4,A.H*.4)});
const bits=()=>{const L=lens();return DROP.map(([u,v,pl],i)=>({i,pl,x:L.x-L.r+u*2*L.r,y:L.y-L.r+v*2*L.r,r:lo(30,L.r*.15)}))};
function drawDrop(){const s=W.d,g=A.ctx,L=lens();sea();const n=s.got.length;tag(n>=5?'5 tiny plants found':`Tiny plants found: ${n} of 5`,A.W/2,A.H*.08,{ok:n>=5});
 g.fillStyle='#f0f9ff';g.beginPath();g.arc(L.x,L.y,L.r,0,7);g.fill();g.strokeStyle=RIM;g.lineWidth=6;g.stroke();
 bits().forEach(b=>{const on=s.got.includes(b.i),bad=s.bad===b.i;if(b.pl){g.fillStyle=on?'#15803d':'#22c55e';g.beginPath();g.ellipse(b.x,b.y,b.r,b.r*.55,b.i,0,7);g.fill();g.strokeStyle='#14532d';g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(b.x-b.r*.7,b.y);g.lineTo(b.x+b.r*.7,b.y);g.stroke()}
  else{g.font=`${Math.round(b.r*1.4)}px system-ui,sans-serif`;centre(g);g.fillText('🦐',b.x,b.y)}
  if(on||bad){g.strokeStyle=on?OK:NO;g.lineWidth=4;g.beginPath();g.arc(b.x,b.y,b.r+7,0,7);g.stroke()}})}
function look(i){const s=W.d;if(s.got.includes(i)||s.got.length>=5)return;if(!DROP[i][2]){s.bad=i;A.sound.miss();return say('That one is a tiny animal, not a plant. It eats the tiny plants. Look for the green ones.')}
 s.got.push(i);s.bad=null;A.sound.pop();say(s.got.length>=5?'All 5 found! Tiny green plants float near the top of the sea. They use sunlight to make food. Ocean food chains start with them.':`Yes, a tiny green plant. ${5-s.got.length} more.`)}
/* 2. build the chain */
const slots=()=>{const w=lo(130,(A.W-16-3*22)/4),h=lo(100,A.H*.24);return[0,1,2,3].map(j=>({j,x:8+j*(w+22)+(A.W-16-4*w-66)/2,y:A.H*.2,w,h}))};
const deck=()=>{const w=lo(130,(A.W-50)/4),h=lo(90,A.H*.2);return DEAL.map((k,i)=>({k,x:A.W/2-2*w-15+i*(w+10),y:A.H*.68,w,h}))};
function drawChain(){const s=W.c,g=A.ctx,S=slots();sea();tag(s.fill.every(x=>x!=null)?'Each arrow means "is eaten by"':'Build the chain from the start',A.W/2,A.H*.08,{n:13,ok:s.fill.every(x=>x!=null)});
 S.forEach(r=>{const k=s.fill[r.j];if(k!=null)chip(r,LINKS[k][0],LINKS[k][1],{ok:1});else{g.setLineDash([6,5]);g.strokeStyle=A.col.tx;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.setLineDash([]);g.fillStyle=A.col.tx;g.font=font(sz(14));centre(g);g.fillText(String(r.j+1),r.x+r.w/2,r.y+r.h/2)}
  if(r.j<3&&s.fill[r.j]!=null&&s.fill[r.j+1]!=null)arrow(r.x+r.w+2,r.y+r.h/2,r.x+r.w+20)});
 deck().forEach(r=>{if(s.fill.includes(r.k)||(W.drag&&W.drag.k===r.k))return;chip(r,LINKS[r.k][0],LINKS[r.k][1],{bad:s.bad===r.k})});
 if(W.drag){const d=W.drag,r=deck().find(r=>r.k===d.k);chip({...r,x:d.x-r.w/2,y:d.y-r.h/2},LINKS[d.k][0],LINKS[d.k][1],{on:1})}}
function place(k){const s=W.c;if(s.fill.includes(k))return;const j=s.fill.indexOf(null);if(j<0)return;
 if(k!==j){s.bad=k;A.sound.miss();return say(j===0?`Not the ${LINKS[k][1]}. ${LINKS[k][1]==='shark'?'A shark cannot make its own food.':'Animals cannot make their own food.'} The chain starts with what makes food from sunlight.`:`Not yet. The ${LINKS[k][1]} does not eat the ${LINKS[j-1][1]}. Who eats the ${LINKS[j-1][1]}?`)}
 s.fill[j]=k;s.bad=null;A.sound.pop();say(LINKS[k][2]+(j===3?' Tiny plants → krill → small fish → shark. Each arrow points from the food to the eater.':''))}
/* 3. it takes lots of little ones */
const eater=()=>({x:A.W*.5,y:A.H*.32,r:lo(A.W*.16,A.H*.16)});
const plate=()=>{const m=MEAL[W.m.ph]||MEAL[1],n=m.need+2,cols=A.narrow?4:7,w=lo(80,(A.W-20-8*(cols-1))/cols),h=lo(70,A.H*.14);
 return[...Array(n)].map((_,i)=>({i,odd:i===2,x:(A.W-(w*cols+8*(cols-1)))/2+(i%cols)*(w+8),y:A.H*.6+Math.floor(i/cols)*(h+8),w,h}))};
function drawMeal(){const s=W.m,g=A.ctx;sea();if(s.ph>=2){tag('1 shark ate 4 fish. Each fish ate 5 krill.',A.W/2,A.H*.2,{n:13,ok:1});tag('That is 20 krill for 1 shark!',A.W/2,A.H*.4,{n:14});
  tag('Many little ones feed one big one.',A.W/2,A.H*.6,{n:13});return}
 const m=MEAL[s.ph],E=eater();tag(`Feed the ${m.name}: ${s.fed} of ${m.need}`,A.W/2,A.H*.07,{n:13});g.font=`${Math.round(E.r*1.3)}px system-ui,sans-serif`;centre(g);g.fillText(m.to,E.x,E.y);
 const bw=A.W*.5,bx=A.W/2-bw/2,by=E.y+E.r+6;g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(bx,by,bw,12);g.fillStyle=OK;g.fillRect(bx,by,bw*s.fed/m.need,12);
 plate().forEach(r=>{if(s.used.includes(r.i)||(W.drag&&W.drag.i===r.i))return;const f=r.odd?m.odd:m.food;chip(r,f[0],f[1],{bad:s.bad===r.i})});
 if(W.drag){const d=W.drag,r=plate()[d.i],f=r.odd?m.odd:m.food;chip({...r,x:d.x-r.w/2,y:d.y-r.h/2},f[0],f[1],{on:1})}}
function feed(i){const s=W.m;if(s.ph>=2||s.used.includes(i))return;const m=MEAL[s.ph];if(i===2){s.bad=i;A.sound.miss();return say(m.odd[2])}
 s.used.push(i);s.fed++;s.bad=null;A.sound.pop();if(s.fed<m.need)return say(`Gulp! The ${m.name} ate ${s.fed}. Still hungry.`);
 s.ph++;s.fed=0;s.used=[];say(s.ph===1?'The shark is full: it ate 4 fish. Now feed one small fish with krill.':'The fish is full: it ate 5 krill. So 1 shark needs lots of fish, and lots and lots of krill.')}
/* 4. the blue whale */
const mouth=()=>({x:A.W*.06,y:A.H*.16,w:A.W*.88,h:A.H*.4});
const food=()=>{const w=lo(130,(A.W-50)/4),h=lo(90,A.H*.2);return GULP.map((v,i)=>({i,x:A.W/2-2*w-15+i*(w+10),y:A.H*.68,w,h}))};
function drawWhale(){const s=W.w,g=A.ctx,M=mouth();sea();tag(s.n>=3?'Full of krill!':`Gulps of krill: ${s.n} of 3`,A.W/2,A.H*.07,{n:13,ok:s.n>=3});
 g.fillStyle='#64748b';A.paint.rrect(M.x,M.y,M.w,M.h,M.h/2);g.fill();g.fillStyle='#fff';g.font=font(sz(13));centre(g);g.fillText('Blue whale: the biggest animal ever',M.x+M.w/2,M.y+M.h*.25);
 g.fillStyle=DEEP;g.beginPath();g.ellipse(M.x+M.w*.22,M.y+M.h*.64,M.w*.14,M.h*.2,0,0,7);g.fill();g.fillStyle='#fff';g.fillText('mouth',M.x+M.w*.22,M.y+M.h*.64);
 g.font=`${sz(24)}px system-ui,sans-serif`;for(let k=0;k<s.n*4;k++)g.fillText('🦐',M.x+M.w*.45+(k%6)*sz(24),M.y+M.h*.52+Math.floor(k/6)*sz(26));
 food().forEach(r=>{if(W.drag&&W.drag.i===r.i)return;chip(r,GULP[r.i][0],GULP[r.i][1],{bad:s.bad===r.i,ok:r.i===0&&s.n>=3})});
 if(W.drag){const d=W.drag,r=food()[d.i];chip({...r,x:d.x-r.w/2,y:d.y-r.h/2},GULP[d.i][0],GULP[d.i][1],{on:1})}}
function gulp(i){const s=W.w;if(s.n>=3)return;if(!GULP[i][2]){s.bad=i;A.sound.miss();return say(`No ${GULP[i][1]}! The blue whale does not hunt big animals. It gulps huge mouthfuls of tiny krill.`)}
 s.n++;s.bad=null;A.sound.pop();say(s.n>=3?'The biggest animal eats some of the smallest animals! Its chain is short: tiny plants → krill → blue whale.':`Gulp! A huge mouthful of krill. ${3-s.n} more.`)}
/* 5. take one away */
const row=()=>{const w=lo(130,(A.W-16-3*22)/4),h=lo(100,A.H*.24);return[0,1,2,3].map(j=>({j,x:8+j*(w+22)+(A.W-16-4*w-66)/2,y:A.H*.3,w,h}))};
const FALL=['Every animal goes hungry: the krill have no tiny plants, so the fish have no krill, and the shark has no fish.','The small fish go hungry, and then so does the shark. But the tiny plants are fine. Try another.','The shark goes hungry. The tiny plants and the krill are fine. Try another.','The small fish are fine. In fact more of them live. Nobody else goes hungry. Try another.'];
function drawGone(){const s=W.g,g=A.ctx,R=row();sea();tag(s.found?'Everything needs the tiny plants':'Tap one to take it away',A.W/2,A.H*.1,{n:13,ok:s.found});
 R.forEach(r=>{const gone=s.out===r.j,sad=s.out!=null&&r.j>s.out&&s.out<3;chip(r,gone?'':LINKS[r.j][0],gone?'gone':LINKS[r.j][1],{bad:sad,bg:gone?(A.col.dark?'#94a3b8':'#e2e8f0'):'#fff'});
  if(sad){g.font=`${sz(18)}px system-ui,sans-serif`;centre(g);g.fillText('😟',r.x+r.w-14,r.y+14)}if(r.j<3)arrow(r.x+r.w+2,r.y+r.h/2,r.x+r.w+20)});
 g.font=`${sz(30)}px system-ui,sans-serif`;centre(g);g.fillText('☀️',R[0].x+R[0].w/2,A.H*.2);if(s.found)tag('Tiny plants need sunlight. All the rest need them.',A.W/2,A.H*.8,{n:12})}
function remove(j){const s=W.g;if(s.found)return;s.out=j;if(j>0){A.sound.miss();return say(FALL[j])}s.found=1;A.sound.pop();say(FALL[0]+' Every ocean animal depends on the tiny plants.')}
function draw(){const k=stage();if(k==='chal'){sea();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('tiny plants → krill → fish → shark',A.W/2,A.H*.5,{n:13});return}
 ({drop:drawDrop,chain:drawChain,meal:drawMeal,whale:drawWhale,gone:drawGone})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='drop'){const b=bits().find(b=>Math.hypot(p.x-b.x,p.y-b.y)<b.r+10);if(b)look(b.i);return false}
 if(k==='chain'){const r=deck().find(r=>hit(p,r)&&!W.c.fill.includes(r.k));if(r){W.drag={k:r.k,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='meal'){if(W.m.ph>=2)return false;const r=plate().find(r=>hit(p,r)&&!W.m.used.includes(r.i));if(r){W.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='whale'){const r=food().find(r=>hit(p,r));if(r){W.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='gone'){const r=row().find(r=>hit(p,r));if(r)remove(r.j)}return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;const k=stage(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='chain'){if(tap||slots().some(r=>hit(p,r)))place(d.k);else A.redraw();return}
 if(k==='meal'){const E=eater();if(tap||Math.hypot(p.x-E.x,p.y-E.y)<E.r*1.4)feed(d.i);else A.redraw();return}
 if(k==='whale'){if(tap||hit(p,mouth()))gulp(d.i);else A.redraw()}}
function fresh(){gen++;for(const k in W)delete W[k];Object.assign(W,{d:{got:[],bad:null},c:{fill:[null,null,null,null],bad:null},m:{ph:0,fed:0,used:[],bad:null},w:{n:0,bad:null},g:{out:null,found:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();W.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);W.hook=watch(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='drop'&&W.d.got.length<5)DROP.forEach((v,i)=>{if(!W.d.got.includes(i))B(`Spot ${i+1}`,()=>look(i),`Spot ${i+1}: ${v[2]?'green and leafy':'has legs'}`)});
 if(k==='chain'&&W.c.fill.includes(null))DEAL.forEach(k2=>{if(!W.c.fill.includes(k2))B(`${LINKS[k2][0]} ${LINKS[k2][1]}`,()=>place(k2),`Put ${LINKS[k2][1]} in the next box`)});
 if(k==='meal'&&W.m.ph<2){const m=MEAL[W.m.ph];B(`${m.food[0]} Feed ${m.food[1]}`,()=>feed(plate().find(r=>!r.odd&&!W.m.used.includes(r.i)).i),`Feed ${m.food[1]} to the ${m.name}`);B(`${m.odd[0]} Feed ${m.odd[1]}`,()=>feed(2),`Feed ${m.odd[1]} to the ${m.name}`)}
 if(k==='whale'&&W.w.n<3)GULP.forEach((v,i)=>B(`${v[0]} ${v[1]}`,()=>gulp(i),`Feed ${v[1]} to the blue whale`));
 if(k==='gone'&&!W.g.found)LINKS.forEach((v,j)=>B(`Take away ${v[1]}`,()=>remove(j)))}
const steps=[
{h:'A drop of sea water',p:'Look at a drop of sea water up close. Tap the tiny green plants.',
 predict:{q:'What does an ocean food chain start with?',opts:['A big shark','Tiny plants in the water'],ans:1},task:'Find all 5 tiny plants',
 show:()=>demo(0,DROP.map((v,i)=>v[2]?i:-1).filter(i=>i>=0).map(i=>()=>look(i)),450),
 go:()=>open(0,'A round lens over a drop of sea water. Some tiny green plants and some tiny animals with legs.',()=>W.d.got.length>=5,'Tiny plants, called phytoplankton, make food from sunlight.')},
{h:'Build the chain',p:'Drag each living thing into the boxes, starting with box 1. Who eats who?',
 predict:{q:'In a food chain, the arrow means …',opts:['"eats"','"is eaten by"'],ans:1},task:'Build the chain in order',
 show:()=>demo(1,[0,1,2,3].map(k=>()=>place(k)),500),
 go:()=>open(1,'Four empty boxes in a row. Cards: small fish, tiny plants, shark, krill.',()=>W.c.fill.every(x=>x!=null),'Tiny plants are eaten by krill, krill by small fish, small fish by the shark.')},
{h:'Lots of little ones',p:'Feed the shark until it is full. Then feed a small fish. Count how many each needs.',
 predict:{q:'Are there more sharks or more small fish in the sea?',opts:['More sharks','More small fish'],ans:1},task:'Fill up the shark and a fish',
 show:()=>demo(2,[...Array(9)].map(()=>()=>{const r=plate().find(r=>!r.odd&&!W.m.used.includes(r.i));if(r)feed(r.i)}),380),
 go:()=>open(2,'A hungry shark and a plate of small fish below it.',()=>W.m.ph>=2,'One big animal needs lots of smaller ones, so there are many more small fish than sharks.')},
{h:'The blue whale',p:'The blue whale is the biggest animal ever. Drag its real food into its mouth.',
 predict:{q:'What does the blue whale mostly eat?',opts:['Sharks and big fish','Tiny krill'],ans:1},task:'Fill the whale with its real food',
 show:()=>demo(3,[0,0,0].map(i=>()=>gulp(i)),500),
 go:()=>open(3,'A blue whale with its mouth open. Food cards: krill, shark, big fish, seal.',()=>W.w.n>=3,'The blue whale eats tiny krill, so its chain is tiny plants, krill, whale.')},
{h:'Take one away',p:'What if one living thing was gone? Tap one to take it away and see who goes hungry.',task:'Find the one every animal needs',
 show:()=>demo(4,[()=>remove(3),()=>remove(0)],900),
 go:()=>open(4,'The chain: tiny plants, krill, small fish, shark, with the Sun above the tiny plants.',()=>W.g.found,'Every animal in the chain depends on the tiny plants.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.hook()});
const QS=[
 {q:'What does an ocean food chain start with?',a:'Tiny plants in the water',o:[['A shark','top'],['Krill','animalfirst']]},
 {q:'What eats the tiny plants?',a:'Krill and other tiny animals',o:[['Sharks','size'],['Nothing eats them','none']]},
 {q:'In tiny plants → krill, what does the arrow mean?',a:'Tiny plants are eaten by krill',o:[['Tiny plants eat krill','arrow'],['Krill make tiny plants','arrow']]},
 {q:'What does the blue whale mostly eat?',a:'Tiny krill',o:[['Sharks','whale'],['Seals','whale']]},
 {q:'If all the tiny plants were gone, who would go hungry?',a:'Every animal in the chain',o:[['Only the krill','one'],['Nobody','none']]},
 {q:'Are there more sharks or more small fish?',a:'More small fish',o:[['More sharks','count'],['The same number','count']]}];
function why(t){let m='Think of the chain: tiny plants → krill → small fish → shark.';
 if(t==='top')m='A shark is at the end of the chain. The chain starts with tiny plants, which make food from sunlight.';
 if(t==='animalfirst')m='Krill are animals, so they must eat something. They eat the tiny plants, which come first.';
 if(t==='size')m='Sharks eat bigger food, like fish. Tiny animals such as krill eat the tiny plants.';
 if(t==='arrow')m='The arrow points from the food to the eater. It means "is eaten by".';
 if(t==='whale')m='The blue whale does not hunt big animals. It gulps huge mouthfuls of tiny krill.';
 if(t==='one')m='The krill would go hungry first, then the fish that eat krill, then the shark. All of them depend on the tiny plants.';
 if(t==='none')m='Every animal depends on the tiny plants, even if it does not eat them itself.';
 if(t==='count')m='One shark needs lots of fish to eat, so there are many more small fish than sharks.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean food chain buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
