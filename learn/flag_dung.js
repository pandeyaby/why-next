/* Flagship – fossilised dinosaur dung (ages 7–9; coprolites: Buckland 1829 and Mary Anning at Lyme Regis; Chin et
   al. 1998 Nature 393, the 44 cm bone-filled coprolite from Saskatchewan; Chin 2007 Palaios, wood-filled coprolites
   of duck-billed dinosaurs). Scenes: put the steps from fresh dung to stone in order (a card about drying in the sun
   is refused); drag across a coprolite to cut a slice, then name the bone, seed, wood and fish scale inside; sort
   five cut coprolites by diet from what is inside; measure the Canadian coprolite on a ruler and pick its likely
   maker from the dinosaurs living there; and sort claims into We can say or Too sure. Every drag or tap has a
   labelled button twin. Data and drawings in learn/dung_art.js. */
(()=>{const {box,inside,pen,FORM,BITS,DIETS,POOS,LEN,MAKERS,CLAIMS,DESC,DONE,QS,lump,slice}=DUNG;
VIS.reg('flagdung',c=>{let A,T,pad,chal,qi=-1,gen=0;
const K={ink:'#1c1917',ok:'#047857',ko:'#b91c1c',rim:'#78716c',sel:'#1d4ed8',bg:'#fefce8',sand:'#fef3c7',slot:'#f5f5f4',head:'#78350f'};
const st={};const sc=()=>['form','slice','diet','size','sure','quiz'][A.step];const RMAX=60;
/* ---------- layout ---------- */
const formCards=()=>T.cells(FORM.length,A.narrow?2:3,box(A.W*.03,A.H*.1,A.W*.94,A.H*.44)),slotB=k=>T.row(4,box(A.W*.03,A.H*.62,A.W*.94,A.H*.24))[k];
const lumpB=()=>box(A.W*.12,A.H*.12,A.W*.76,A.H*.3),sliceB=()=>A.narrow?box(A.W*.08,A.H*.1,A.W*.84,A.H*.5):box(A.W*.2,A.H*.1,A.W*.6,A.H*.52);
const nameB=k=>T.row(4,box(A.W*.03,A.H*.7,A.W*.94,A.H*.15))[k];
const bitAt=k=>{const b=sliceB(),o=BITS[k];return{x:b.x+b.w*o.u,y:b.y+b.h*o.v,r:Math.min(b.w,b.h)*.15}};
const pooB=k=>T.cells(POOS.length,A.narrow?2:3,box(A.W*.03,A.H*.09,A.W*.94,A.H*.5))[k],dietB=k=>T.row(3,box(A.W*.03,A.H*.65,A.W*.94,A.H*.22))[k];
const rul=()=>box(A.W*.06,A.H*.42,A.W*.88,A.H*.1),cmX=v=>rul().x+rul().w*v/RMAX,makerB=k=>T.row(3,box(A.W*.03,A.H*.64,A.W*.94,A.H*.22))[k];
const claimB=k=>T.cells(CLAIMS.length,A.narrow?2:3,box(A.W*.03,A.H*.09,A.W*.94,A.H*.5))[k],sureB=k=>T.row(2,box(A.W*.03,A.H*.65,A.W*.94,A.H*.22),12)[k];
function head(t){T.txt(t,A.W/2,A.H*.045,12,{c:K.head,w:A.W-20})}
function foot(t,ok){T.txt(t,A.W/2,A.H*.94,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20})}
const follow=(i,b)=>st.drag&&st.drag.i===i?box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h):b;
/* ---------- 1: from poo to stone ---------- */
function drawForm(){head('How does poo turn to stone?');const bs=formCards();
 [0,1,2,3].forEach(k=>{const b=slotB(k),i=st.order[k];T.pill(b,K.slot,i!=null?'ok':'');T.txt(String(k+1),b.x+12,b.y+12,11,{c:K.rim});if(i!=null)T.txt(FORM[i].t,b.x+b.w/2,b.y+b.h/2,10,{w:b.w-10,c:K.ok})});
 FORM.forEach((o,i)=>{if(st.order.includes(i)||(st.drag&&st.drag.i===i))return;T.pill(bs[i],K.sand,st.bad===i?'ko':'');T.txt(o.t,bs[i].x+bs[i].w/2,bs[i].y+bs[i].h/2,11,{w:bs[i].w-12})});
 if(st.drag){const b=follow(st.drag.i,bs[st.drag.i]);T.pill(b,K.sand,'sel');T.txt(FORM[st.drag.i].t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-12})}
 foot(st.order.length>=4?'✓ Poo, mud, minerals, stone':`Step ${st.order.length+1} of 4: which comes next?`,st.order.length>=4)}
function place(i){if(st.order.length>=4||st.order.includes(i))return;const o=FORM[i],n=st.order.length;
 if(o.s){st.bad=i;A.sound.miss();return say(slip('sun'))}if(o.o!==n){st.bad=i;A.sound.miss();return say(slip('order',FORM.find(f=>f.o===n).t))}
 st.bad=-1;st.order.push(i);A.sound.pop();say(`Step ${n+1}: ${o.t}.`+(n<3?' What happens next?':' It is now a coprolite: rock, not soft poo.'))}
/* ---------- 2: cut it open ---------- */
function drawSlice(){const g=A.ctx;if(!st.cut){head('Cut it open to look inside');const b=lumpB();lump(g,b.x,b.y,b.w,b.h);
  if(st.drag&&st.drag.knife){g.save();g.strokeStyle=K.sel;g.lineWidth=3;g.setLineDash([6,5]);g.beginPath();g.moveTo(st.drag.x0,st.drag.y0);g.lineTo(st.drag.x,st.drag.y);g.stroke();g.restore()}
  T.txt('Drag a line across it, from one side to the other',A.W/2,A.H*.55,12,{w:A.W-30});return foot('Not cut yet',false)}
 head('What is inside? Drag each name onto its bit');slice(g,sliceB(),st.named.map(()=>0).concat([]).length?BITS.map((_,k)=>st.named.includes(k)):null);
 if(st.badB>=0){const p=bitAt(st.badB);g.save();g.strokeStyle=K.ko;g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.stroke();g.restore()}
 BITS.forEach((o,k)=>{if(st.named.includes(k)||(st.drag&&st.drag.i===k))return;const b=nameB(k);T.pill(b,'#ffffff',st.sel===k?'sel':'');T.txt(o.n,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-8})});
 if(st.drag&&!st.drag.knife){const b=follow(st.drag.i,nameB(st.drag.i));T.pill(b,'#ffffff','sel');T.txt(BITS[st.drag.i].n,b.x+b.w/2,b.y+b.h/2,12)}
 foot(st.named.length>=4?'✓ Bone, seed, wood and a fish scale':`Named: ${st.named.length} of 4`,st.named.length>=4)}
function cut(){if(st.cut)return;st.cut=true;A.sound.pop();say('Cut! The slice shows bits inside the stone. Drag each name onto the bit it matches.')}
function nameBit(i,k){if(!st.cut||st.named.includes(i))return;st.sel=-1;if(i!==k){st.badB=k;A.sound.miss();return say(slip('look',BITS[i].n,k))}
 st.badB=-1;st.named.push(i);A.sound.pop();say(`Yes: that is ${BITS[i].n==='Bone'?'bone':'a '+BITS[i].n.toLowerCase()}.`+(st.named.length<4?' Name another bit.':' Now we know some of what was eaten.'))}
/* ---------- 3: who ate what ---------- */
function drawDiet(){const g=A.ctx;head('Who made each one?');
 DIETS.forEach((d,k)=>{const b=dietB(k),n=st.diet.filter(i=>POOS[i].d===k);T.pill(b,'#ffffff',st.hot===k?'sel':'');T.txt(d,b.x+b.w/2,b.y+b.h*.28,12,{w:b.w-8});
  T.txt(n.map(i=>POOS[i].sh).join(', ')||'…',b.x+b.w/2,b.y+b.h*.7,10,{b:700,c:K.ok,w:b.w-10})});
 POOS.forEach((o,i)=>{if(st.diet.includes(i))return;const b=follow(i,pooB(i));T.pill(b,K.sand,st.bad===i?'ko':st.sel===i||(st.drag&&st.drag.i===i)?'sel':'');
  lump(g,b.x+6,b.y+b.h*.2,b.w*.22,b.h*.6);T.txt(o.t,b.x+b.w*.62,b.y+b.h/2,11,{w:b.w*.68})});
 foot(st.diet.length>=5?'✓ All 5 sorted by what is inside':`Sorted: ${st.diet.length} of 5`,st.diet.length>=5)}
function eatTo(i,k){if(st.diet.includes(i))return;st.sel=-1;const o=POOS[i];if(o.d!==k){st.bad=i;A.sound.miss();return say(slip(o.d===1?'plantbig':o.d===2?'fish':'wood'))}
 st.bad=-1;st.diet.push(i);A.sound.pop();say(`${o.t}: a ${DIETS[k].toLowerCase()} made this.`)}
/* ---------- 4: measure it ---------- */
function drawSize(){const g=A.ctx,r=rul();head('How long is it? Who made it?');lump(g,cmX(0),A.H*.15,cmX(LEN)-cmX(0),A.H*.25);T.txt('Full of broken bone',(cmX(0)+cmX(LEN))/2,A.H*.12,11,{c:K.head});
 g.fillStyle='#fde68a';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#92400e';g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);
 for(let v=0;v<=RMAX;v++){const x=cmX(v);g.beginPath();g.moveTo(x,r.y);g.lineTo(x,r.y+r.h*(v%10?v%5?.25:.45:.65));g.stroke();if(v%10===0)T.txt(String(v),x,r.y+r.h*.82,9,{c:K.ink})}
 T.txt('cm',r.x+r.w+10,r.y+r.h*.82,9);const x=cmX(st.mk);g.fillStyle=st.measured?K.ok:K.sel;g.beginPath();g.moveTo(x,r.y-2);g.lineTo(x-9,r.y-16);g.lineTo(x+9,r.y-16);g.closePath();g.fill();
 g.strokeStyle=g.fillStyle;g.lineWidth=2;g.beginPath();g.moveTo(x,r.y);g.lineTo(x,r.y+r.h);g.stroke();T.txt(`${st.mk} cm`,x,r.y+r.h+14,11,{c:st.measured?K.ok:K.sel});
 if(st.measured)MAKERS.forEach((o,k)=>{const b=makerB(k);T.pill(b,'#ffffff',st.badM===k?'ko':st.who===k+1?'ok':'');T.txt(o.t,b.x+b.w/2,b.y+b.h*.33,12,{w:b.w-8});T.txt(o.d,b.x+b.w/2,b.y+b.h*.7,10,{b:700,w:b.w-8})});
 foot(st.who?'✓ 44 cm and full of bone: most likely T. rex':st.measured?'44 cm. Which dinosaur most likely made it?':'Drag the arrow to the end of the coprolite',!!st.who)}
function setMk(v){if(st.measured)return;st.mk=Math.max(0,Math.min(RMAX,Math.round(v)));if(Math.abs(st.mk-LEN)<=1){st.mk=LEN;st.measured=true;A.sound.pop();return say('It is 44 cm long: longer than your arm from elbow to fingertip. Now pick who most likely made it. All three lived there, about 66 million years ago.')}
 A.redraw();buttons()}
function release(){if(!st.measured)say(`The arrow is at ${st.mk} cm. ${st.mk<LEN?'Move it further':'Move it back'}, to the end of the coprolite.`)}
function pickMaker(k){if(!st.measured||st.who)return;const o=MAKERS[k];if(!o.ok){st.badM=k;A.sound.miss();return say(slip(o.s))}st.badM=-1;st.who=k+1;A.sound.pop();say('T. rex: a big meat-eater. Big poo, full of bone, from the only big meat-eater living there.')}
/* ---------- 5: how sure? ---------- */
function drawSure(){head('What can we say about the 44 cm coprolite?');
 ['We can say','Too sure'].forEach((t,k)=>{const b=sureB(k),n=st.sure.filter(i=>CLAIMS[i].k===k);T.pill(b,k?'#fee2e2':'#dcfce7',st.hot===k?'sel':'');T.txt(t,b.x+b.w/2,b.y+b.h*.25,12);
  T.txt(n.map(i=>CLAIMS[i].t).join(' · ')||'…',b.x+b.w/2,b.y+b.h*.65,10,{b:700,w:b.w-12})});
 CLAIMS.forEach((o,i)=>{if(st.sure.includes(i))return;const b=follow(i,claimB(i));T.pill(b,'#ffffff',st.bad===i?'ko':st.sel===i||(st.drag&&st.drag.i===i)?'sel':'');T.txt(o.t,b.x+b.w/2,b.y+b.h/2,11,{w:b.w-12})});
 foot(st.sure.length>=6?'✓ Clues give a best guess':`Sorted: ${st.sure.length} of 6`,st.sure.length>=6)}
function sureTo(i,k){if(st.sure.includes(i))return;st.sel=-1;const o=CLAIMS[i];if(o.k!==k){st.bad=i;A.sound.miss();return say(slip(k?'clue':o.s))}
 st.bad=-1;st.sure.push(i);A.sound.pop();say(k?`“${o.t}” is too sure. ${slip(o.s)}`:`“${o.t}”: the clues show this.`)}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Look at the clues again, then try.';
 if(t==='sun')m='Dung left in the sun dries out and crumbles, or gets eaten. To become a fossil it must be buried fast.';
 if(t==='order')m=`Not yet. First comes: “${a}”.`;
 if(t==='look')m=b===0?`That bit has tiny holes in it, like the inside of a bone. It is not the ${a.toLowerCase()}.`:b===1?`That bit is round with a line down the middle: a seed. It is not the ${a.toLowerCase()}.`:b===2?`That bit has stripes, like the grain in a plank: wood. It is not the ${a.toLowerCase()}.`:`That bit is a thin fan with rings: a fish scale. It is not the ${a.toLowerCase()}.`;
 if(t==='plantbig')m='Big does not mean plant-eater. Bone inside means the animal ate meat.';
 if(t==='fish')m='Fish scales and fish bones mean the animal ate fish.';
 if(t==='wood')m='Wood, seeds, leaves and pollen come from plants. A plant-eater made this.';
 if(t==='small')m='A small raptor could not make a poo 44 cm long. Look at the size.';
 if(t==='sure')m='Nobody saw it happen, and poo has no name on it. Say “most likely”, not “for sure”.';
 if(t==='nothing')m='A coprolite is a rock, but what is inside tells us what an animal ate.';
 if(t==='mood')m='Poo cannot show feelings. Only say what the clues show.';
 if(t==='clue')m='The clues do show this: the shape, the size or the bone inside.';
 if(t==='melt')m='Melting would destroy what is inside. Scientists cut thin slices or scan it.';
 if(t==='soft')m='A coprolite has turned to stone. It is hard, and it does not smell.';
 if(t==='egg')m='A coprolite is not an egg. It is dung that has turned to stone.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=sc(),g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){lump(g,A.W*.3,A.H*.25,A.W*.4,A.H*.22);T.txt('Challenge',A.W/2,A.H*.65,20);return}
 ({form:drawForm,slice:drawSlice,diet:drawDiet,size:drawSize,sure:drawSure})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sc(),grab=(i,x)=>{st.drag=Object.assign({i,x:p.x,y:p.y,x0:p.x,y0:p.y},x||{});A.redraw();return true};
 if(k==='form'){const i=formCards().findIndex((b,j)=>!st.order.includes(j)&&inside(p,b));if(i>=0)return grab(i)}
 if(k==='slice'){if(!st.cut)return grab(-1,{knife:true});const n=BITS.findIndex((_,j)=>!st.named.includes(j)&&inside(p,nameB(j)));if(n>=0)return grab(n);
  const t=BITS.findIndex((_,j)=>{const q=bitAt(j);return Math.hypot(p.x-q.x,p.y-q.y)<q.r});if(t>=0&&st.sel>=0)nameBit(st.sel,t)}
 if(k==='diet'){const i=POOS.findIndex((_,j)=>!st.diet.includes(j)&&inside(p,pooB(j)));if(i>=0)return grab(i);const n=[0,1,2].find(j=>inside(p,dietB(j)));if(n!=null&&st.sel>=0)eatTo(st.sel,n)}
 if(k==='size'){if(st.measured){const n=[0,1,2].find(j=>inside(p,makerB(j)));if(n!=null)pickMaker(n)}else if(Math.abs(p.x-cmX(st.mk))<24&&p.y>rul().y-30&&p.y<rul().y+rul().h+20)return grab(-1,{mk:true});else if(inside(p,rul())){setMk((p.x-rul().x)/rul().w*RMAX);release()}}
 if(k==='sure'){const i=CLAIMS.findIndex((_,j)=>!st.sure.includes(j)&&inside(p,claimB(j)));if(i>=0)return grab(i);const n=[0,1].find(j=>inside(p,sureB(j)));if(n!=null&&st.sel>=0)sureTo(st.sel,n)}
 return false}
function move(p){const d=st.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=sc();if(d.mk)return setMk((p.x-rul().x)/rul().w*RMAX);
 st.hot=k==='diet'?[0,1,2].find(j=>inside(p,dietB(j))):k==='sure'?[0,1].find(j=>inside(p,sureB(j))):undefined;A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;st.hot=undefined;const k=sc(),moved=Math.hypot(p.x-d.x0,p.y-d.y0)>12;
 if(d.mk)return release();
 if(d.knife){const b=lumpB();if(Math.abs(p.x-d.x0)>b.w*.5&&Math.min(p.y,d.y0)<b.y+b.h+20&&Math.max(p.y,d.y0)>b.y-20)return cut();return say(moved?'Drag the line all the way across the coprolite to cut it.':'Drag a line across the coprolite, from one side to the other.')}
 if(k==='form'){if(inside(p,box(A.W*.03,A.H*.6,A.W*.94,A.H*.28))||!moved)return place(d.i)}
 if(k==='slice'){const t=BITS.findIndex((_,j)=>{const q=bitAt(j);return Math.hypot(p.x-q.x,p.y-q.y)<q.r});if(t>=0)return nameBit(d.i,t);if(!moved){st.sel=d.i;return say(`“${BITS[d.i].n}” picked. Now tap its bit in the slice.`)}}
 if(k==='diet'){const n=[0,1,2].find(j=>inside(p,dietB(j)));if(n!=null)return eatTo(d.i,n);if(!moved){st.sel=d.i;return say(`“${POOS[d.i].t}” picked. Now tap who made it.`)}}
 if(k==='sure'){const n=[0,1].find(j=>inside(p,sureB(j)));if(n!=null)return sureTo(d.i,n);if(!moved){st.sel=d.i;return say(`“${CLAIMS[d.i].t}” picked. Now tap We can say or Too sure.`)}}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=sc(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='form'&&st.order.length<4)FORM.forEach((o,i)=>{if(!st.order.includes(i))b(`Next: ${o.t}`,()=>place(i),`Step ${st.order.length+1}: ${o.t}`)});
 if(k==='slice'){if(!st.cut)b('Cut a slice',cut);else if(st.named.length<4){const i=st.sel>=0&&!st.named.includes(st.sel)?st.sel:BITS.findIndex((_,j)=>!st.named.includes(j));
  ['Bit with tiny holes','Round bit with a line','Striped bit','Fan-shaped bit with rings'].forEach((d,j)=>b(`${BITS[i].n}: ${d}`,()=>nameBit(i,j),`Name the ${d.toLowerCase()} as ${BITS[i].n.toLowerCase()}`))}}
 if(k==='diet')POOS.forEach((o,i)=>{if(!st.diet.includes(i))DIETS.forEach((d,j)=>b(`${o.sh} → ${d}`,()=>eatTo(i,j),`${o.t}: made by a ${d.toLowerCase()}`))});
 if(k==='size'){if(!st.measured){[-5,-1,1,5].forEach(v=>b(`${v>0?'+':'−'}${Math.abs(v)} cm`,()=>{setMk(st.mk+v);release()},`Move the arrow ${Math.abs(v)} cm ${v>0?'right':'left'}, now at ${st.mk} cm`))}else if(!st.who)MAKERS.forEach((o,j)=>b(`${o.t} (${o.d})`,()=>pickMaker(j)))}
 if(k==='sure')CLAIMS.forEach((o,i)=>{if(!st.sure.includes(i)){b(`Can say: ${o.t}`,()=>sureTo(i,0));b(`Too sure: ${o.t}`,()=>sureTo(i,1))}})}
function reset(){gen++;for(const x in st)delete st[x];Object.assign(st,{order:[],bad:-1,sel:-1,cut:false,named:[],badB:-1,diet:[],mk:10,measured:false,who:0,badM:-1,sure:[],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();say(DESC[i]);st.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Poo to stone',p:'A coprolite is dinosaur poo that turned to stone. Drag the cards into the boxes in order, from fresh poo to stone.',
 predict:{q:'Is a coprolite still soft and smelly?',opts:['Yes, it is still poo','No, it has turned to stone'],ans:1},task:'Put the 4 steps in order',
 show:()=>demo(0,[0,1,2,3].map(i=>()=>place(i)),500),go:()=>begin(0,()=>st.order.length>=4)},
{h:'Cut it open',p:'Scientists cut a thin slice to see inside. Drag across the coprolite to cut it. Then name each bit.',task:'Cut it and name 4 bits',
 show:()=>demo(1,[cut,...[0,1,2,3].map(i=>()=>nameBit(i,i))],500),go:()=>begin(1,()=>st.named.length>=4)},
{h:'Who ate what?',p:'What is inside tells you what the animal ate. Drag each coprolite to the animal that made it.',
 predict:{q:'A coprolite is full of crushed bone. Who made it?',opts:['A plant-eater','A meat-eater'],ans:1},task:'Sort all 5 coprolites',
 show:()=>demo(2,POOS.map((o,i)=>()=>eatTo(i,o.d)),450),go:()=>begin(2,()=>st.diet.length>=5)},
{h:'Big poo, big animal',p:'This coprolite was found in Canada. Measure it with the ruler, then pick the dinosaur that most likely made it.',task:'Measure it and find the maker',
 show:()=>demo(3,[()=>setMk(30),()=>setMk(44),()=>pickMaker(1)],700),go:()=>begin(3,()=>!!st.who)},
{h:'How sure can we be?',p:'Clues tell us a lot, but not everything. Drag each card to We can say or Too sure.',
 predict:{q:'Can scientists be totally sure which dinosaur did a poo?',opts:['Yes, always','No, it is a best guess from clues'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(4,CLAIMS.map((o,i)=>()=>sureTo(i,o.k)),420),go:()=>begin(4,()=>st.sure.length>=6)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=pen(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Coprolite lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
