/* Flagship: Human impact on environments (ages 8–11; KS2 habitats; WWF Living Planet Report; UK DESNZ 2023 travel factors). Count kinds in a wood and a wheat field (biodiversity); cut and
   replant trees (deforestation, conservation); clear litter before rain (pollution); sort renewable and non-renewable
   sources (fossil fuels); plan school trips to shrink a carbon footprint. Not ecolab, flagdesert/flagsavanna or flagburn. */
(()=>{
VIS.reg('flagenvimp',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const part=()=>['bio','cut','river','energy','foot','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';
 if(o.pill){const w=g.measureText(String(s)).width+16,x0=o.al==='left'?x-8:o.al==='right'?x-w+8:x-w/2;g.fillStyle=o.pill;A.paint.rrect(x0,y-px*.75,w,px*1.5,px*.6);g.fill()}
 g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const fs=()=>A.narrow?15:18,em=()=>A.narrow?26:32,INK='#0f172a',PILL='#f8fafc',sm=()=>A.narrow?13:15,GR=()=>A.col.dark?'#14532d':'#bbf7d0',LB={ink:INK,pill:PILL,w:800},LP={ink:INK,pill:PILL};
function ground(top,col){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.1:.6);g.fillRect(0,0,A.W,top);g.fillStyle=col;g.fillRect(0,top,A.W,A.H-top)}
function box(b,f){const g=A.ctx;g.fillStyle=f;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
const hit=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<(r||A.W*.07);
/* ---------- 1: biodiversity = how many different kinds ---------- */
const WOOD=['🌳','🦉','🐿️','🦔','🐝','🦋','🍄','🌸'],WN=['oak tree','owl','squirrel','hedgehog','bee','butterfly','toadstool','bluebell'];
function bioSpots(){const L=[];for(let i=0;i<8;i++)L.push({x:A.W*(.07+(i%4)*.12),y:A.H*(.42+Math.floor(i/4)*.22),e:WOOD[i],k:i,wood:true});
 for(let i=0;i<8;i++)L.push({x:A.W*(.58+(i%4)*.12),y:A.H*(.42+Math.floor(i/4)*.22),e:'🌾',k:8,wood:false});return L}
function drawBio(){ground(A.H*.25,GR());const g=A.ctx;g.fillStyle=A.col.dark?'#713f12':'#fde68a';g.fillRect(A.W*.52,A.H*.25,A.W*.48,A.H*.75);
 txt('Wood',A.W*.25,A.H*.3,fs(),LB);txt('Wheat field',A.W*.76,A.H*.3,fs(),LB);
 for(const s of bioSpots()){txt(s.e,s.x,s.y,em());const seen=s.wood?S.kinds.has(s.k):S.field.size;if(seen)txt('✓',s.x+em()*.6,s.y-em()*.5,A.narrow?14:16,{ink:'#166534',pill:PILL,w:900})}
 txt(`Kinds found: wood ${S.kinds.size} · field ${S.field.size}`,A.W/2,A.H*.08,fs(),LB);txt('Tap each living thing',A.W/2,A.H*.94,sm(),LP)}
function tapBio(s){if(s.wood){if(S.kinds.has(s.k)){A.sound.tick();return after(`You already counted the ${WN[s.k]}.`)}S.kinds.add(s.k);A.sound.pop();after(`A ${WN[s.k]}: ${S.kinds.size} kind${S.kinds.size>1?'s':''} in the wood.`)}
 else{const n=S.field.size;S.field.add(s.x);A.sound.tick();after(n?'Another wheat plant. More plants, but still only 1 kind.':'Wheat: 1 kind. Every plant here is the same kind.')}}
const bioDone=()=>S.kinds.size>=8&&S.field.size>=1;
function bioNext(){const s=bioSpots().find(s=>s.wood?!S.kinds.has(s.k):!S.field.size);if(s)tapBio(s)}
/* ---------- 2: cut down and replant the wood ---------- */
const TREES=6,NEED=[['🦉','owl',4],['🐿️','squirrel',3],['🐦','woodpecker',5]],STAY=[['🦔','hedgehog'],['🐝','bee']];
const treeAt=i=>({x:A.W*(.1+i*.16),y:A.H*.5});
function drawCut(){ground(A.H*.6,GR());for(let i=0;i<TREES;i++){const p=treeAt(i);txt(S.trees[i]?'🌳':'🪵',p.x,p.y,A.narrow?40:52)}
 const left=S.trees.filter(Boolean).length,here=[...NEED.filter(n=>left>=n[2]),...STAY];
 here.forEach((n,i)=>{const x=A.W*(.1+i*.2);txt(n[0],x,A.H*.75,em());txt(n[1],x,A.H*.75+em()*.9,A.narrow?11:13,{ink:INK,pill:PILL,w:600})});
 txt(`Trees: ${left} of ${TREES} · Kinds of animal: ${here.length}`,A.W/2,A.H*.08,fs(),LB);
 txt('Tap a tree to cut, a stump to plant',A.W/2,A.H*.93,sm(),LP)}
function chop(i){const before=S.trees.filter(Boolean).length;if(S.trees[i]){S.trees[i]=false;S.cut++;A.sound.miss()}else{S.trees[i]=true;A.sound.pop()}
 const left=S.trees.filter(Boolean).length,gone=NEED.filter(n=>before>=n[2]&&left<n[2]).map(n=>n[1]),back=NEED.filter(n=>before<n[2]&&left>=n[2]).map(n=>n[1]);
 after(gone.length?`The ${gone.join(' and ')} lost its home and left. Cutting trees destroys habitats, so biodiversity falls.`:back.length?`The ${back.join(' and ')} came home. Protecting and replanting habitats is conservation.`:
  left<before?`${left} trees left. Tree animals are running out of space.`:`A new tree. Trees take many years to grow back.`)}
const cutDone=()=>S.cut>=4&&S.trees.every(Boolean);
function cutNext(){const i=S.cut<4?S.trees.findIndex(Boolean):S.trees.findIndex(t=>!t);if(i>=0)chop(i)}
/* ---------- 3: litter washed into a river ---------- */
const riverY=()=>A.H*.62,binP=()=>({x:A.W*.88,y:A.H*.42});
function drawRiver(){ground(A.H*.25,GR());const g=A.ctx;g.fillStyle='#38bdf8';g.fillRect(0,riverY(),A.W,A.H*.26);
 txt('🗑️',binP().x,binP().y,A.narrow?34:42);txt('bin',binP().x,binP().y+(A.narrow?26:30),A.narrow?13:14,LP);
 for(const l of S.litter)if(!l.binned&&l!==S.held)txt(l.e,l.x,l.y,em());if(S.held&&S.drag)txt(S.held.e,S.drag.x,S.drag.y,em());
 const fish=fishOk();for(let i=0;i<6;i++)txt(i<fish?'🐟':'',A.W*(.1+i*.14),riverY()+A.H*.13,A.narrow?24:30);
 if(S.rain){g.strokeStyle='#1d4ed8';g.lineWidth=2;for(let i=0;i<20;i++){const x=(i*53)%A.W,y=A.H*.12+(i*37)%(A.H*.12);g.beginPath();g.moveTo(x,y);g.lineTo(x-4,y+12);g.stroke()}}
 txt(`Healthy fish: ${fish} of 6`,A.W/2,A.H*.08,fs(),LB)}
const fishOk=()=>Math.max(0,6-2*S.litter.filter(l=>l.inRiver).length);
function bin(l){l.binned=true;l.inRiver=false;S.held=null;S.drag=null;A.sound.pop();const left=S.litter.filter(x=>!x.binned).length;
 after(left?`In the bin. ${left} piece${left>1?'s':''} of litter left.`:S.rain?'The river is clean again. The fish can recover.':'All in the bin. Now make it rain.')}
function rain(){S.rain=true;A.sound.whoosh();const lost=S.litter.filter(l=>!l.binned&&!l.inRiver);lost.forEach(l=>{l.inRiver=true;A.tween(l,{y:riverY()+A.H*.05},A.reduced()?0:800,'io')});
 setTimeout(()=>after(lost.length?`The rain washed ${lost.length} piece${lost.length>1?'s':''} of litter into the river. Rubbish in water harms the fish: that is pollution.`:'Heavy rain, but nothing washed into the river. Clearing litter stops pollution.'),A.reduced()?0:850)}
const riverDone=()=>S.rain&&S.litter.every(l=>l.binned);
function riverNext(){const l=S.litter.find(l=>!l.binned);if(l)bin(l);else if(!S.rain)rain()}
/* ---------- 4: renewable or non-renewable ---------- */
const SRC=[['☀️','sunlight',0],['💨','wind',0],['🌊','moving water',0],['⛏️','coal',1],['🛢️','oil',1],['🔥','natural gas',1]];
const binBox=k=>({x:A.W*(k?.52:.04),y:A.H*.55,w:A.W*.44,h:A.H*.38}),cardAt=i=>({x:A.W*(.17+i%3*.33),y:A.H*(.2+(i>2)*.17)});
function drawEnergy(){ground(A.H,A.col.pn);['Renewable: will not run out','Non-renewable: will run out'].forEach((t,k)=>{const b=binBox(k);box(b,k?'#fee2e2':'#dcfce7');
  txt(t.split(':')[0],b.x+b.w/2,b.y+18,A.narrow?14:16,{ink:INK,w:800});txt(t.split(': ')[1],b.x+b.w/2,b.y+38,A.narrow?12:14,{ink:INK,w:600})});
 SRC.forEach((s,i)=>{const at=S.sorted[i];if(S.held===i&&S.drag)return;if(at!=null){const b=binBox(at),y=b.y+58+S.slot[i]*30;txt(s[0],b.x+20,y,22);return txt(s[1],b.x+36,y,A.narrow?12:13,{al:'left',ink:INK,w:700})}
  const p=cardAt(i);txt(s[0],p.x,p.y-6,em());txt(s[1],p.x,p.y+em()*.6,A.narrow?11:13,{ink:INK,pill:S.held===i?'#fde68a':PILL,w:700})});
 if(S.held!=null&&S.drag)txt(SRC[S.held][0],S.drag.x,S.drag.y,em());
 txt(`Sorted: ${S.sorted.filter(x=>x!=null).length} of 6`,A.W/2,A.H*.08,fs(),LB)}
function drop(i,k){S.held=null;S.drag=null;const s=SRC[i];
 const C=s[1][0].toUpperCase()+s[1].slice(1);if(k!==s[2]){A.sound.miss();return after(s[2]?`${C} is a fossil fuel, formed from things that lived millions of years ago. Once burned, it is gone: non-renewable.`:`${C} comes back every day, however much we use. It is renewable.`)}
 S.slot[i]=S.sorted.filter(x=>x===k).length;S.sorted[i]=k;A.sound.pop();const n=S.sorted.filter(x=>x!=null).length;
 after(n===6?'Sun, wind and water are renewable. Coal, oil and gas are fossil fuels: non-renewable, and burning them adds carbon dioxide to the air.':`Yes: ${s[1]} is ${k?'non-renewable':'renewable'}.`)}
function energyNext(){const i=S.sorted.findIndex(x=>x==null);if(i>=0)drop(i,SRC[i][2])}
/* ---------- 5: carbon footprint of a week of school trips (4 km a day) ---------- */
const WAY=[['🚗','car',0.7],['🚌','bus',0.4],['🚶','walk or cycle',0]],DAYS=['Mon','Tue','Wed','Thu','Fri'];
const ALLCAR=5*0.7,kg=()=>S.week.reduce((t,w)=>t+WAY[w][2],0),dayBox=d=>({x:A.W*(.04+d*.19),y:A.H*.2,w:A.W*.16,h:A.H*.3});
function foot(x,y,s,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.ellipse(x,y,s*.45,s*.75,0,0,7);g.fill();[[-.35,-1],[-.1,-1.15],[.15,-1.1],[.35,-.95]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*s,y+b*s,s*.13,0,7);g.fill()})}
function drawFoot(){ground(A.H,A.col.pn);DAYS.forEach((d,i)=>{const b=dayBox(i);box(b,PILL);
  txt(d,b.x+b.w/2,b.y+16,sm(),{ink:INK,w:800});txt(WAY[S.week[i]][0],b.x+b.w/2,b.y+b.h*.55,em());txt(WAY[S.week[i]][2]+' kg',b.x+b.w/2,b.y+b.h-14,A.narrow?12:14,{ink:INK})});
 const k=kg(),s=A.H*.11*(.45+k/ALLCAR);foot(A.W*.15,A.H*.8,s,k<=ALLCAR/2?'#16a34a':'#b45309');
 txt(`Week: ${k.toFixed(1)} kg carbon dioxide`,A.W*.6,A.H*.72,fs(),LB);txt(`All by car: ${ALLCAR.toFixed(1)} kg`,A.W*.6,A.H*.84,sm(),LP);
 txt('Tap a day to change how you travel',A.W/2,A.H*.08,sm(),LP)}
function setDay(d,w){S.week[d]=w;A.sound.tick();const k=kg();
 after(`${DAYS[d]}: ${WAY[w][1]}. The week's footprint is ${k.toFixed(1)} kg${k<=ALLCAR/2?', less than half of going by car every day.':'.'}${w===0?' A car burns petrol or diesel, so it adds the most carbon dioxide.':w===1?' A bus shares its fuel among many people.':' Walking and cycling add almost none.'}`)}
const footDone=()=>kg()<=ALLCAR/2;
function footNext(){const d=S.week.findIndex(w=>w===0);if(d>=0)setDay(d,d%2?1:2)}
/* ---------- drawing, steps, input ---------- */
function draw(Q){const k=part();if(k==='bio')drawBio();if(k==='cut')drawCut();if(k==='river')drawRiver();if(k==='energy')drawEnergy();if(k==='foot')drawFoot();
 if(k==='chal'){ground(A.H*.6,GR());txt('🌳 🦉 🐝 ☀️ 💨 🐟',Q.W/2,Q.H*.45,em());txt('Challenge',Q.W/2,Q.H*.1,fs(),LB)}}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{kinds:new Set(),field:new Set(),trees:Array(TREES).fill(true),cut:0,
 litter:[['🥤',.15],['🛍️',.35],['🥫',.55],['🍫',.72]].map(([e,x])=>({e,x:A.W*x,y:A.H*.45,binned:false,inRiver:false})),rain:false,held:null,drag:null,
 sorted:Array(6).fill(null),slot:Array(6).fill(0),week:[0,0,0,0,0],ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):(gap||300)*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='bio'){WN.forEach((n,i)=>{if(!S.kinds.has(i))b(n,()=>tapBio(bioSpots()[i]),'Count the '+n)});if(!S.field.size)b('wheat',()=>tapBio(bioSpots()[8]),'Count the wheat')}
 if(k==='cut'){const i=S.trees.findIndex(Boolean),j=S.trees.findIndex(t=>!t);if(i>=0)b('Cut a tree',()=>chop(i));if(j>=0)b('Plant a tree',()=>chop(j))}
 if(k==='river'){S.litter.forEach(l=>{if(!l.binned)b(`${l.e} → bin`,()=>bin(l),'Put the litter in the bin')});if(!S.rain)b('Make it rain',rain)}
 if(k==='energy'){if(S.held==null)SRC.forEach((s,i)=>{if(S.sorted[i]==null)b(s[1],()=>{S.held=i;A.redraw();keys();tell(`Holding ${s[1]}. Choose a box.`)},'Pick '+s[1])});
  else{b('→ Renewable',()=>drop(S.held,0),`Put ${SRC[S.held][1]} in renewable`);b('→ Non-renewable',()=>drop(S.held,1),`Put ${SRC[S.held][1]} in non-renewable`)}}
 if(k==='foot')DAYS.forEach((d,i)=>b(`${d}: ${WAY[S.week[i]][0]}`,()=>setDay(i,(S.week[i]+1)%3),`${d}: now ${WAY[S.week[i]][1]}. Change it`))}
const inBox=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function down(p){const k=part();
 if(k==='bio'){const s=bioSpots().find(s=>hit(p,s,A.W*.06));if(!s)return false;tapBio(s);return true}
 if(k==='cut'){for(let i=0;i<TREES;i++)if(hit(p,treeAt(i),A.W*.08)){chop(i);return true}return false}
 if(k==='river'){const l=S.litter.find(l=>!l.binned&&hit(p,l));if(!l)return false;S.held=l;S.drag=p;A.redraw();return true}
 if(k==='energy'){for(let i=0;i<6;i++)if(S.sorted[i]==null&&hit(p,cardAt(i),A.W*.07)){S.held=i;S.drag=null;A.redraw();keys();tell(`Holding ${SRC[i][1]}. Drag or tap a box.`);return true}
  if(S.held!=null){for(const k2 of [0,1])if(inBox(p,binBox(k2))){drop(S.held,k2);return true}}return false}
 if(k==='foot'){for(let d=0;d<5;d++)if(inBox(p,dayBox(d))){setDay(d,(S.week[d]+1)%3);return true}return false}return false}
function move(p){const k=part();if((k==='river'&&S.held)||(k==='energy'&&S.held!=null)){S.drag=p;A.redraw()}}
function up(p){const k=part();if(k==='river'&&S.held){if(p&&hit(p,binP(),A.W*.1))bin(S.held);else{S.held=null;S.drag=null;A.redraw()}}
 if(k==='energy'&&S.held!=null&&S.drag&&p){const k2=[0,1].find(j=>inBox(p,binBox(j)));if(k2!=null)drop(S.held,k2);else{S.drag=null;A.redraw()}}}
const steps=[
{h:'Biodiversity',p:'Biodiversity means how many different kinds of living thing live in a place. Tap each living thing.',
 predict:{q:'A wheat field has 1,000 wheat plants. A wood has 8 kinds of plant and animal. Which has more biodiversity?',opts:['The field: it has more plants','The wood: it has more kinds','They are the same'],ans:1},
 task:'Count the kinds in both places',show:()=>auto(0,Array.from({length:9},()=>bioNext)),
 go:()=>{fresh();tell('A wood full of life, and a field of wheat.');keys();S.ok=finishIf(0,bioDone,'The wood has 8 kinds, the field has 1. Biodiversity counts kinds, not how many.')}},
{h:'Cutting down a wood',p:'Cutting down forests is called deforestation. Cut some trees, then plant them back, and watch who lives here.',
 predict:{q:'If we cut down most of the trees, what happens to the animals that live in them?',opts:['They move into the trees that are left','Some kinds lose their home and leave','More animals come'],ans:1},
 task:'Cut 4 trees, then plant the wood back',show:()=>auto(1,Array.from({length:8},()=>cutNext),350),
 go:()=>{fresh();tell('A wood with 6 trees, home to an owl, a squirrel and a woodpecker.');keys();S.ok=finishIf(1,cutDone,'Losing trees means losing homes. Conservation protects and restores habitats.')}},
{h:'Pollution',p:'Litter lies on the grass near a river. Drag it to the bin, then make it rain.',
 predict:{q:'Litter is dropped on grass, away from the river. What can happen to it?',opts:['It stays where it was dropped','Rain or wind can carry it into the river','It rots away in a day'],ans:1},
 task:'Keep the river clean through the rain',show:()=>auto(2,[riverNext,riverNext,riverNext,riverNext,riverNext],350),
 go:()=>{fresh();tell('A river with 6 healthy fish. Litter lies on the grass.');keys();S.ok=finishIf(2,riverDone,'Litter on land ends up in rivers and the sea. Clearing it keeps water clean.')}},
{h:'Renewable or not?',p:'We make electricity from these. Renewable sources never run out; non-renewable ones will run out one day.',
 predict:{q:'Coal is made from plants that lived long ago. Is coal renewable?',opts:['Yes, plants grow back','No, it took millions of years to form','Only if we plant trees'],ans:1},
 task:'Sort all 6 energy sources',show:()=>auto(3,Array.from({length:6},()=>energyNext)),
 go:()=>{fresh();tell('Six energy sources to sort.');keys();S.ok=finishIf(3,()=>S.sorted.every(x=>x!=null),'Fossil fuels, coal, oil and gas, are non-renewable. Sun, wind and water are renewable.')}},
{h:'Carbon footprint',p:'A carbon footprint is how much carbon dioxide gas is added to the air because of the things you do. Plan a week of 4 km school trips.',
 predict:{q:'What does a carbon footprint measure?',opts:['How far you walk','The carbon dioxide your choices add to the air','How much rubbish you throw away'],ans:1},
 task:'Make the week less than half the car footprint',show:()=>auto(4,[footNext,footNext,footNext,footNext,footNext],350),
 go:()=>{fresh();tell('Monday to Friday, all by car: 3.5 kg of carbon dioxide.');keys();S.ok=finishIf(4,footDone,'Walking, cycling and sharing a bus shrink your carbon footprint.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['What does biodiversity mean?','How many different kinds of living thing live in a place',[['How many plants there are in a place','many'],['How big the animals are','many']]],
 ['Why does cutting down a forest harm animals?','They lose their habitat, their home and food',[['It does not, they just move next door','move'],['Trees are not homes for animals','move']]],
 ['Which of these is a renewable energy source?','Wind',[['Coal','coal'],['Natural gas','coal']]],
 ['What does a carbon footprint measure?','The carbon dioxide added to the air by what you do',[['The size of your shoes','literal'],['How much rubbish you make','rubbish']]],
 ['The last dodo died over 300 years ago. What word describes the dodo?','Extinct',[['Endangered','endang'],['Renewable','endang']]],
 ['Which choice is the most sustainable way to get to school 1 km away?','Walking',[['Being driven in a car','car'],['Taking a taxi','car']]]];
function why(tag){let m='Think about what you saw in the lab.';
 if(tag==='many')m='Biodiversity is about different kinds. A field of 1,000 wheat plants has lots of plants but only 1 kind.';
 if(tag==='move')m='The trees left are already full, and some animals need lots of trees. When their habitat goes, they leave or die.';
 if(tag==='coal')m='Coal, oil and gas are fossil fuels. They took millions of years to form and will run out, so they are non-renewable.';
 if(tag==='literal')m='It is not a real footprint. It is the carbon dioxide gas that is added to the air because of your choices.';
 if(tag==='rubbish')m='A carbon footprint counts carbon dioxide gas, not rubbish.';
 if(tag==='endang')m='Endangered means only a few are left. Extinct means none are left anywhere, so it can never come back. The dodo is extinct.';
 if(tag==='car')m='A car burns fuel and adds carbon dioxide. Walking adds almost none, so it can go on for ever without harm: that is sustainable.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Environment controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
