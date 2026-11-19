/* Flagship – Eruption types and volcano shape (ages 9–11; KS2 science rocks and Earth, NGSS 4-ESS2-2 and 4-ESS3-2, USGS
   volcano types). Scenes: pour runny, medium and sticky lava and see how far each flows; drag a knob to pick a magma and
   let its gas out (gentle fountain or trapped gas and a blast); stack layers to build a shield like Mauna Loa and a
   composite cone like Mount Fuji; sort six real eruptions into gentle (effusive) or explosive; catch a park guide's
   slips. Data in learn/erupt_art.js. Distinct from flagvolc (parts of a volcano) and flagvolcst (active, dormant,
   extinct): this lab is about why magma thickness and gas set the eruption style and the volcano's shape. */
(()=>{const E=ERP;
VIS.reg('flagerupt',c=>{let A,pad,chal,turn=-1,era=0;const M={};
const C={sky:'#eff6ff',soil:'#d6d3d1',rock:'#a8a29e',ink:'#111827',good:'#166534',bad:'#b91c1c',edge:'#57534e',ash:'#6b7280',gas:'#ffffff',hi:'#1d4ed8'};
const scene=()=>['pour','gas','build','sort','guide','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.12);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const base=()=>A.H*.82;
function backdrop(){const g=A.ctx;g.fillStyle=C.sky;g.fillRect(0,0,A.W,A.H);g.fillStyle=C.soil;g.fillRect(0,base(),A.W,A.H-base());g.strokeStyle=C.edge;g.lineWidth=1.5;g.beginPath();g.moveTo(0,base());g.lineTo(A.W,base());g.stroke()}
/* a white tag with dark writing that shrinks to fit the canvas */
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`700 ${n}px system-ui,sans-serif`;while(g.measureText(t).width+22>A.W-8&&n>10){n--;g.font=`700 ${n}px system-ui,sans-serif`}
 const w=g.measureText(t).width+22,h=n+14,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.2;g.strokeStyle=o.ok?C.good:o.no?C.bad:C.edge;g.stroke();g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
/* a tap target: rounded card with a label */
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3:1.4;g.strokeStyle=o.no?C.bad:o.ok?C.good:o.on?C.hi:C.edge;g.stroke();if(!t)return;
 let n=sz(o.n||15);g.font=`700 ${n}px system-ui,sans-serif`;while(g.measureText(t).width>r.w-12&&n>9){n--;g.font=`700 ${n}px system-ui,sans-serif`}
 g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+(o.top?r.h*.3:r.h/2)+1)}
/* centred text broken into lines that fit width mw */
function lines(t,x,y,n,mw){const g=A.ctx;g.font=`600 ${sz(n)}px system-ui,sans-serif`;const out=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>mw&&cur){out.push(cur);cur=w}else cur=tr});out.push(cur);
 const lh=sz(n)*1.3;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*lh))}
function words(t,x,y,n){const g=A.ctx;g.font=`600 ${sz(n)}px system-ui,sans-serif`;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y,A.W-10)}
/* a mound of lava: half-width rw and height ht, centred on x, rounder for runny lava */
function mound(x,rw,ht,col,peak){const g=A.ctx,y=base();g.fillStyle=col;g.beginPath();g.moveTo(x-rw,y);
 for(let i=0;i<=24;i++){const u=i/24*2-1,f=peak?1-Math.abs(u):Math.cos(u*Math.PI/2);g.lineTo(x+u*rw,y-ht*f)}g.lineTo(x+rw,y);g.closePath();g.fill();g.strokeStyle=C.ink;g.lineWidth=1.2;g.stroke()}
/* ---- 1. pour three lavas ---- */
const cups=()=>{const w=Math.min(150,(A.W-40)/3),h=Math.min(A.H*.2,74),x0=(A.W-(w*3+20))/2;return E.MAGMA.map((m,i)=>({i,x:x0+i*(w+10),y:A.H*.14,w,h}))};
function drawPour(){const s=M.pour;backdrop();tag(`Poured ${s.done.length} of 3`,A.W/2,A.H*.06,{n:13,ok:s.done.length===3});
 cups().forEach(b=>{const m=E.MAGMA[b.i];card(b,`${m.n} (${m.rock})`,{top:1,on:s.last===b.i,n:14});words(`silica ${m.si}`,b.x+b.w/2,b.y+b.h*.62,10);words(m.deg,b.x+b.w/2,b.y+b.h*.84,10)});
 if(s.last>=0){const m=E.MAGMA[s.last],x=A.W/2;[...s.done].sort((a,b)=>a-b).forEach(i=>{const q=E.MAGMA[i];mound(x,A.W*q.reach,A.H*q.lift,q.col,i===2)});const g=A.ctx;g.fillStyle=C.ink;g.fillRect(x-3,base()-A.H*m.lift-6,6,6);
  tag(`${m.n} lava: ${s.last===0?'spread far, stayed low':s.last===2?'stayed near the vent, piled up steep':'spread a little, piled up a little'}`,A.W/2,A.H*.5,{n:13})}
 else words('Tap a cup to pour it on the vent',A.W/2,A.H*.55,13);
 if(s.done.length)tag(s.done.map(i=>E.MAGMA[i].n).join(' · ')+' tried',A.W/2,A.H*.92,{n:12})}
function pour(i){const s=M.pour;s.last=i;A.sound.tick();if(!s.done.includes(i))s.done.push(i);const m=E.MAGMA[i];
 const msg=i===0?'Runny basalt lava spreads a long way before it cools and stops, so it makes a low, wide pile.':i===2?'Sticky rhyolite lava hardly moves. It cools and piles up right by the vent, tall and steep.':'Andesite lava flows a little way, then stacks up: in between.';
 tell(`${m.n} lava poured. ${msg}`+(s.done.length<3?` ${3-s.done.length} to go.`:''))}
/* ---- 2. gas in the vent ---- */
const track=()=>({x:A.W*.12,y:A.H*.9,w:A.W*.76});
const knobX=()=>{const t=track();return t.x+t.w*M.gas.pick/2};
const ventBtn=()=>({x:A.W*.62,y:A.H*.3,w:Math.min(A.W*.34,170),h:Math.min(A.H*.17,64)});
function drawGas(){const s=M.gas,g=A.ctx,m=E.MAGMA[s.pick];backdrop();const vx=A.W*.3,top=A.H*.18,bw=A.W*.12;
 g.fillStyle=C.rock;g.beginPath();g.moveTo(vx-A.W*.24,base());g.lineTo(vx-bw*.5,top+8);g.lineTo(vx+bw*.5,top+8);g.lineTo(vx+A.W*.24,base());g.closePath();g.fill();g.strokeStyle=C.edge;g.stroke();
 g.fillStyle=m.col;g.fillRect(vx-bw*.32,top+10,bw*.64,base()-top-10);
 const G=E.GAS[s.pick],out=s.tried[s.pick];
 for(let k=0;k<7;k++){const r=4+(k%3)*2,yy=base()-12-k*(base()-top-30)/7,stuck=G.style==='explosive'||(G.style==='mixed'&&k<3);
  if(out||k<3){g.fillStyle=C.gas;g.beginPath();g.arc(vx+((k%2)?-1:1)*bw*.13,out&&!stuck?yy:Math.max(yy,base()-60),r,0,7);g.fill();g.strokeStyle=C.ink;g.lineWidth=1;g.stroke()}}
 /* pressure gauge */
 const gx=A.W*.62,gy=A.H*.58,gw=Math.min(A.W*.34,170);g.fillStyle='#ffffff';A.paint.rrect(gx,gy,gw,18,9);g.fill();g.strokeStyle=C.edge;g.stroke();
 if(out){g.fillStyle=G.p>.8?C.bad:G.p>.4?'#b45309':C.good;A.paint.rrect(gx,gy,gw*G.p,18,9);g.fill()}words('Gas pressure',gx+gw/2,gy-12,11);
 if(out&&G.style==='explosive'){g.fillStyle=C.ash;for(let k=0;k<5;k++){g.beginPath();g.arc(vx+(k-2)*14,top-14-k*10,18+k*5,0,7);g.fill()}tag('Explosive: ash',vx,A.H*.08,{n:12,no:1})}
 if(out&&G.style==='gentle'){g.strokeStyle=m.col;g.lineWidth=6;g.beginPath();g.moveTo(vx,top+8);g.lineTo(vx,top-26);g.stroke();tag('Gentle: lava fountain',vx,A.H*.08,{n:12,ok:1})}
 if(out&&G.style==='mixed')tag('Bursts of lava bits',vx,A.H*.08,{n:12});
 card(ventBtn(),'Let the gas out',{n:15});
 const t=track();g.strokeStyle=C.edge;g.lineWidth=4;g.beginPath();g.moveTo(t.x,t.y);g.lineTo(t.x+t.w,t.y);g.stroke();
 E.MAGMA.forEach((q,i)=>{const x=t.x+t.w*i/2;words(q.n,x,t.y-16,11);if(s.tried[i]){g.fillStyle=C.good;g.beginPath();g.arc(x,t.y,5,0,7);g.fill()}});
 g.fillStyle=C.hi;g.beginPath();g.arc(knobX(),t.y,sz(13),0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();
 tag(`${s.tried.filter(Boolean).length} of 3 magmas tested`,A.W*.79,A.H*.72,{n:11})}
function choose(i){const s=M.gas;i=Math.max(0,Math.min(2,i));if(i===s.pick)return;s.pick=i;A.sound.tick();const m=E.MAGMA[i];tell(`${m.n} ${m.rock} magma in the vent: silica ${m.si}, ${m.deg}. Now let the gas out.`)}
function vent(){const s=M.gas,G=E.GAS[s.pick];s.tried[s.pick]=1;G.style==='explosive'?A.sound.miss():A.sound.pop();const left=s.tried.filter(x=>!x).length;
 tell(`${E.MAGMA[s.pick].n} magma: ${G.say}`+(left?` Try ${left} more.`:''))}
/* ---- 3. build a volcano from layers ---- */
const layerBtns=()=>{const w=Math.min(190,(A.W-36)/2),h=Math.min(A.H*.12,50);return['flow','ash'].map((k,i)=>({k,x:A.W/2+(i?6:-w-6),y:A.H*.14,w,h}))};
function heap(){const s=M.build;let rw=0,ht=0;s.stack.forEach(k=>{rw=Math.max(rw,E.LAYER[k].w);ht+=E.LAYER[k].t});return{rw,ht}}
function drawBuild(){const s=M.build,g=A.ctx;backdrop();if(s.i>=E.BUILD.length){tag('Both volcanoes built',A.W/2,A.H*.14,{ok:1});mound(A.W*.3,A.W*.24,A.H*.2,'#c2410c');mound(A.W*.76,A.W*.12,A.H*.38,'#78716c',1);
  words('shield',A.W*.3,base()+16,12);words('composite cone',A.W*.76,base()+16,12);return}
 const B=E.BUILD[s.i],L=E.LAYER[B.need],x=A.W/2;tag(`${s.i+1} of 2: build ${B.name}, ${B.tip}`,A.W/2,A.H*.07,{n:13});
 const tw=A.W*L.w,th=A.H*L.t*4;g.setLineDash([7,6]);g.strokeStyle=C.ink;g.lineWidth=2;g.beginPath();g.moveTo(x-tw,base());
 for(let i=0;i<=24;i++){const u=i/24*2-1,f=B.shape==='shield'?Math.cos(u*Math.PI/2):1-Math.abs(u);g.lineTo(x+u*tw,base()-th*f)}g.stroke();g.setLineDash([]);
 layerBtns().forEach(b=>card(b,E.LAYER[b.k].label,{n:13}));
 for(let j=s.stack.length;j>0;j--){const part=s.stack.slice(0,j),rw=Math.max(...part.map(k=>E.LAYER[k].w)),ht=part.reduce((a,k)=>a+E.LAYER[k].t,0);mound(x,A.W*rw,A.H*ht,j%2?'#c2410c':'#a16207',s.stack[j-1]==='ash')}
 const hp=heap();tag(`Layers ${s.stack.length} of 4`+(s.stack.length?` · ${hp.rw>.3?'wide':'narrow'}, ${hp.ht/hp.rw>.6?'steep':'gentle'} slopes`:''),A.W/2,A.H*.92,{n:12,no:s.bad})}
function layer(k){const s=M.build;if(s.i>=E.BUILD.length)return;const B=E.BUILD[s.i];
 if(k!==B.need){s.bad=1;A.sound.miss();return tell(k==='flow'?`A runny lava flow spreads wide and thin. ${B.name} is ${B.tip}: that needs ash and sticky lava that pile up near the vent.`:`Ash and sticky lava pile up steep near the vent. ${B.name} is ${B.tip}: that needs runny lava that flows far.`)}
 s.bad=0;s.stack.push(k);A.sound.tick();if(s.stack.length<4)return tell(`${E.LAYER[k].label} added. ${4-s.stack.length} more layers.`);
 const done=B.name;s.i++;s.stack=[];A.sound.pop();tell(`${done} is built: ${B.shape==='shield'?'many runny lava flows make a wide shield volcano with gentle slopes':'layers of ash and sticky lava make a steep composite cone (a stratovolcano)'}.`+(s.i<E.BUILD.length?' Next volcano.':''))}
/* ---- 4. sort real eruptions ---- */
const bins=()=>{const w=(A.W-36)/2,h=Math.min(A.H*.2,78);return E.BINS.map((t,i)=>({i,x:12+i*(w+12),y:A.H*.72,w,h}))};
function sketch(shape,x,y,s){const g=A.ctx;g.fillStyle='#a8a29e';g.strokeStyle=C.ink;g.lineWidth=1.2;g.beginPath();
 if(shape==='shield'){g.moveTo(x-s,y);g.quadraticCurveTo(x,y-s*.55,x+s,y)}else if(shape==='fissure'){g.moveTo(x-s,y);g.lineTo(x-s*.5,y-s*.2);g.lineTo(x+s*.5,y-s*.2);g.lineTo(x+s,y)}else{g.moveTo(x-s*.6,y);g.lineTo(x-s*.08,y-s*.9);g.lineTo(x+s*.08,y-s*.9);g.lineTo(x+s*.6,y)}g.closePath();g.fill();g.stroke()}
function drawSort(){const s=M.sort;backdrop();if(s.i>=E.CARDS.length){tag('All 6 eruptions sorted',A.W/2,A.H*.16,{ok:1});tag('Runny lava: gentle · Sticky magma: explosive',A.W/2,A.H*.36,{n:13});return}
 const K=E.CARDS[s.i],r={x:12,y:A.H*.1,w:A.W-24,h:A.H*.5};card(r,'',{});tag(`${s.i+1} of 6: ${K.v}`,A.W/2,r.y+r.h*.16,{n:14});
 sketch(K.shape,A.W/2,r.y+r.h*.62,Math.min(A.W*.16,70));lines(K.clue,A.W/2,r.y+r.h*.86,12,r.w-24);
 bins().forEach(b=>card(b,E.BINS[b.i],{no:s.miss===b.i,n:15}))}
function file(j){const s=M.sort;if(s.i>=E.CARDS.length)return;const K=E.CARDS[s.i];
 if(j!==K.s){s.miss=j;A.sound.miss();return tell(K.s?`Look at the clue: "${K.clue}" Ash high in the sky means trapped gas blasted out. That is explosive.`:`Look at the clue: "${K.clue}" Lava that flows in rivers lets its gas out. That is gentle (effusive).`)}
 s.miss=-1;s.i++;A.sound.pop();tell(`Yes: ${K.v} was ${K.s?'explosive':'gentle (effusive)'}.`+(s.i<E.CARDS.length?' Next eruption.':''))}
/* ---- 5. the park guide ---- */
const verdict=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(i=>({i,x:A.W/2+(i?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.17,62)}))};
function drawGuide(){const s=M.guide,g=A.ctx;backdrop();if(s.i>=E.GUIDE.length){tag('All 6 sayings checked',A.W/2,A.H*.16,{ok:1});tag('Thick magma traps gas · runny lava spreads wide',A.W/2,A.H*.36,{n:13});return}
 const G=E.GUIDE[s.i],x=A.W/2,y=A.H*.16,u=Math.min(A.W*.055,22);g.fillStyle='#d1d5db';A.paint.rrect(x-u,y-u,u*2,u*2,6);g.fill();g.strokeStyle=C.ink;g.lineWidth=2;g.stroke();
 g.fillStyle='#b45309';g.fillRect(x-u,y-u-5,u*2,6);g.fillStyle=C.ink;g.beginPath();g.arc(x-u*.4,y-u*.15,u*.16,0,7);g.arc(x+u*.4,y-u*.15,u*.16,0,7);g.fill();g.fillRect(x-u*.45,y+u*.42,u*.9,3);
 const q={x:12,y:A.H*.3,w:A.W-24,h:A.H*.2};card(q,'',{});lines(`“${G.s}”`,A.W/2,q.y+q.h/2,15,q.w-24);tag(`${s.i+1} of 6: right, or a slip?`,A.W/2,A.H*.56,{n:12});verdict().forEach(b=>card(b,b.i?'✗ Slip':'✓ Right',{no:s.miss===b.i,n:16}))}
function judgeGuide(j){const s=M.guide;if(s.i>=E.GUIDE.length)return;const G=E.GUIDE[s.i];
 if((j===0)!==G.ok){s.miss=j;A.sound.miss();return tell(G.ok?`Look again: the guide is right. ${G.fix}`:`Look again: that is a slip. ${G.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();tell((G.ok?'Yes, right. ':'Yes, a slip. ')+G.fix)}
function draw(){const v=scene();if(v==='quiz'){backdrop();mound(A.W/2,A.W*.14,A.H*.36,'#78716c',1);tag('Challenge',A.W/2,A.H*.2,{ok:1});return}
 ({pour:drawPour,gas:drawGas,build:drawBuild,sort:drawSort,guide:drawGuide})[v]();A.fx.draw(A.ctx)}
/* canvas: taps everywhere, plus dragging the magma knob */
let dragging=false;
function down(p){const v=scene();
 if(v==='pour'){const b=cups().find(q=>inside(p,q));if(b)pour(b.i)}
 if(v==='gas'){const t=track();if(Math.abs(p.y-t.y)<28&&p.x>t.x-24&&p.x<t.x+t.w+24){dragging=true;choose(Math.round((p.x-t.x)/t.w*2));return true}if(inside(p,ventBtn()))vent()}
 if(v==='build'&&M.build.i<E.BUILD.length){const b=layerBtns().find(q=>inside(p,q));if(b)layer(b.k)}
 if(v==='sort'){const b=bins().find(q=>inside(p,q));if(b)file(b.i)}
 if(v==='guide'){const b=verdict().find(q=>inside(p,q));if(b)judgeGuide(b.i)}
 return false}
function move(p){if(!dragging||scene()!=='gas')return;const t=track();choose(Math.round((p.x-t.x)/t.w*2))}
function up(){dragging=false}
function wipe(){era++;dragging=false;for(const k in M)delete M[k];Object.assign(M,{pour:{last:-1,done:[]},gas:{pick:0,tried:[0,0,0]},build:{i:0,stack:[],bad:0},sort:{i:0,miss:-1},guide:{i:0,miss:-1},after:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.after()}
/* a button for every canvas action */
function twins(){if(!pad)return;pad.innerHTML='';const v=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(v==='pour')E.MAGMA.forEach((m,i)=>b(`Pour ${m.n.toLowerCase()}`,()=>pour(i),`Pour the ${m.n.toLowerCase()} ${m.rock} lava`));
 if(v==='gas'){E.MAGMA.forEach((m,i)=>b(m.n,()=>choose(i),`Put ${m.n.toLowerCase()} magma in the vent`));b('Let the gas out',vent)}
 if(v==='build'&&M.build.i<E.BUILD.length){b('Runny lava flow',()=>layer('flow'),'Add a runny lava flow layer');b('Ash + sticky lava',()=>layer('ash'),'Add a layer of ash and sticky lava')}
 if(v==='sort'&&M.sort.i<E.CARDS.length)E.BINS.forEach((t,i)=>b(t,()=>file(i),`This eruption was ${t.toLowerCase()}`));
 if(v==='guide'&&M.guide.i<E.GUIDE.length){b('✓ Right',()=>judgeGuide(0),'The guide is right');b('✗ Slip',()=>judgeGuide(1),'The guide made a slip')}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){wipe();tell(E.DESC[i]);M.after=finish(i,ok,E.DONE[i])}
function play(i,acts,ms){steps[i].go();const e0=era;acts.forEach((f,j)=>setTimeout(()=>{if(e0===era)f()},ms*(j+1)))}
const steps=[
{h:'Runny or sticky?',p:'Magma with more silica, and cooler magma, is thicker. Pour each lava on the vent and watch how far it gets before it cools.',
 predict:{q:'Which lava flows farthest from the vent?',opts:['Sticky lava','Runny lava'],ans:1},task:'Pour all 3 lavas',
 show:()=>play(0,[0,1,2].map(i=>()=>pour(i)),500),go:()=>begin(0,()=>M.pour.done.length===3)},
{h:'Where does the gas go?',p:'Magma holds gas, like a fizzy drink. Drag the knob to pick a magma, then let the gas out.',
 predict:{q:'In thick, sticky magma, the gas bubbles…',opts:['escape easily','get trapped and build pressure'],ans:1},task:'Test all 3 magmas',
 show:()=>play(1,[()=>vent(),()=>choose(1),()=>vent(),()=>choose(2),()=>vent()],420),go:()=>begin(1,()=>M.gas.tried.every(Boolean))},
{h:'Build the shape',p:'A volcano grows one eruption at a time. Pick the layer that builds each outline.',
 predict:{q:'Which layers build a tall, steep cone?',opts:['Runny lava flows','Ash and sticky lava'],ans:1},task:'Build both volcanoes',
 show:()=>play(2,[...Array(4)].map(()=>()=>layer('flow')).concat([...Array(4)].map(()=>()=>layer('ash'))),300),go:()=>begin(2,()=>M.build.i>=E.BUILD.length)},
{h:'Real eruptions',p:'Read each clue. Was the eruption gentle (effusive) or explosive?',task:'Sort all 6 eruptions',
 show:()=>play(3,E.CARDS.map(K=>()=>file(K.s)),450),go:()=>begin(3,()=>M.sort.i>=E.CARDS.length)},
{h:'Check the guide',p:'A robot guide talks about volcanoes. Is each saying right, or a slip?',task:'Check all 6',
 show:()=>play(4,E.GUIDE.map(G=>()=>judgeGuide(G.ok?0:1)),450),go:()=>begin(4,()=>M.guide.i>=E.GUIDE.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.after()});
function slipMsg(t){let m='Think about how thick the magma is and whether its gas can escape.';
 if(t==='runny')m='Runny magma lets gas bubble out, so it erupts gently. Thick, sticky magma traps gas and explodes.';
 if(t==='nogas')m='All magma holds some gas. Explosions need gas that is trapped, and thick magma traps it.';
 if(t==='steep')m='Runny lava spreads far and builds wide, gentle shields. Sticky lava and ash pile up into steep cones.';
 if(t==='ashonly')m='Mauna Loa erupts lava flows, not ash. Runny lava flowing far made its wide shape.';
 if(t==='hot')m='Sticky magma is cooler, not hotter. Cooler magma with more silica is thicker, so gas gets trapped.';
 if(t==='flat')m='Layers of ash and sticky lava stack up near the vent, so they build a tall cone, not a flat plain.';
 if(t==='all')m='Not all volcanoes explode. Runny basalt magma, as in Hawaiʻi and Iceland, mostly erupts gently.';
 if(t==='size')m='Shape shows lava type, not size. Mauna Loa is low and wide, but it is the largest active volcano on Earth.';
 return m}
function ask(){turn++;const Q=E.QS[turn%E.QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=t==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`✓ Yes: ${a}.`:'✗ '+slipMsg(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask;c.say(good?'Yes.':slipMsg(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:x=>{chal.hidden=x.step!==5;pad.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Eruption types lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});twins()}}).start()})})();
