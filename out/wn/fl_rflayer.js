/* Flagship: Rainforest Layers (ages 5–7; KS1 Science, Living things and their habitats: identify that most living
   things live in habitats to which they are suited; NGSS K-ESS3-1 / 2-LS4-1 where plants and animals live).
   Stack the four layers from the ground up (forest floor, understory, canopy, emergent); drag a climber up and down
   to feel the light change from dark floor to bright emergent; move animals to their layer and count where most
   live; drop leaves to the floor and watch them rot into soil; and match plants to their layer. Big buttons and few
   words for young readers. Distinct from flagrfwhat (hot, wet climate near the Equator) and flaganwhere (habitats
   across the world): this lab is about the levels inside one forest. */
(()=>{
const LAY=['floor','under','canopy','emergent'];
const NAME={floor:'forest floor',under:'understory',canopy:'canopy',emergent:'emergent'};
const LIGHT={floor:'dark and damp',under:'shady',canopy:'bright on top',emergent:'very bright and windy'};
// animals and the layer each one is usually found in (KS1/KS2 rainforest teaching examples)
const ANIM=[['🐜','leafcutter ants','floor'],['🐸','tree frog','under'],['🦥','sloth','canopy'],['🐒','monkey','canopy'],['🦅','harpy eagle','emergent']];
const PLANT=[['🍄','ferns and mushrooms','floor'],['🌿','small trees and bushes','under'],['🌳','thick treetops and vines','canopy'],['🌲','giant trees above the rest','emergent']];
const BIG='min-height:56px;min-width:56px;font-size:1.1rem;padding:8px 16px;border-radius:14px';
VIS.reg('flagrflayer',c=>{let A,pad,qa,turn=-1;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>['build','light','animals','leaves','plants','quiz'][A.step];
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-10)}
function fresh(o){for(const k in S)delete S[k];Object.assign(S,{built:0,y:.85,seen:{},ai:0,placed:{},leaves:[],rotted:0,pi:0,pplaced:{},note:'',drag:null,after:()=>{}},o||{});A.redraw()}
// band for each layer, as fractions of the height: [top, bottom]
const BAND={emergent:[.1,.3],canopy:[.3,.54],under:[.54,.76],floor:[.76,.92]};
const layerAt=y=>LAY.find(k=>y>=BAND[k][0]*A.H&&y<BAND[k][1]*A.H);
const shown=k=>now()!=='build'||LAY.indexOf(k)<S.built;
// ---------- the forest picture ----------
function forest(g,dim){const{W,H,col:C}=A,lx=W*.04,rx=W*.7;
 LAY.forEach(k=>{const[t,b]=BAND[k],y0=t*H,y1=b*H;if(!shown(k)){g.strokeStyle=C.mu;g.setLineDash([6,6]);g.lineWidth=2;A.paint.rrect(lx,y0+3,rx-lx,y1-y0-6,10);g.stroke();g.setLineDash([]);word('?',(lx+rx)/2,(y0+y1)/2,22,{c:C.mu});return}
  const tint={floor:A.mix(C.pn,'#78350f',C.dark?.45:.35),under:A.mix(C.pn,'#166534',C.dark?.35:.25),canopy:A.mix(C.pn,'#15803d',C.dark?.45:.4),emergent:A.mix(C.pn,'#bae6fd',C.dark?.2:.5)}[k];
  g.fillStyle=tint;A.paint.rrect(lx,y0+2,rx-lx,y1-y0-4,10);g.fill();
  if(k==='emergent'){[.22,.55].forEach(f=>{const x=lx+(rx-lx)*f;g.fillStyle='#5b3716';g.fillRect(x-4,y0+18,8,y1-y0);g.fillStyle=A.mix('#15803d',C.pn,.1);g.beginPath();g.ellipse(x,y0+20,26,14,0,0,7);g.fill()})}
  if(k==='canopy'){for(let i=0;i<6;i++){g.fillStyle=A.mix('#166534','#22c55e',(i%3)/3);g.beginPath();g.arc(lx+(rx-lx)*(i+.5)/6,y0+(y1-y0)*(.45+.12*(i%2)),(rx-lx)/9,0,7);g.fill()}}
  if(k==='under'){[.15,.45,.8].forEach(f=>{const x=lx+(rx-lx)*f;g.fillStyle='#5b3716';g.fillRect(x-3,y0+(y1-y0)*.45,6,(y1-y0)*.55);g.fillStyle='#15803d';g.beginPath();g.arc(x,y0+(y1-y0)*.45,15,0,7);g.fill()})}
  if(k==='floor'){for(let i=0;i<9;i++){g.fillStyle=['#a16207','#92400e','#713f12'][i%3];g.beginPath();g.ellipse(lx+(rx-lx)*(i+.5)/9,y1-14,9,4,i,0,7);g.fill()}}
  // label pill on the right
  const ly=(y0+y1)/2;g.fillStyle=C.pn;A.paint.rrect(rx+6,ly-15,W-rx-10,30,10);g.fill();g.strokeStyle=C.ln;g.lineWidth=1;g.stroke();word(NAME[k],rx+6+(W-rx-10)/2,ly,A.narrow?12:15,{max:W-rx-16})});
 if(dim){LAY.forEach((k,i)=>{const[t,b]=BAND[k];g.fillStyle=`rgba(0,0,0,${[.62,.42,.14,0][i]})`;g.fillRect(lx,t*H+2,rx-lx,(b-t)*H-4)})}
 g.fillStyle='#facc15';g.beginPath();g.arc(rx-20,BAND.emergent[0]*H+20,A.narrow?10:13,0,7);g.fill()}
function badge(e,x,y){const g=A.ctx,r=A.narrow?16:20;g.fillStyle=A.col.pn;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();word(e,x,y+1,r*1.2)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=now();if(!S.seen)return;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(k==='quiz'){word('Which layer?',W/2,H*.42,A.narrow?18:22);word('Answer below',W/2,H*.56,14,{c:C.mu,w:500});A.fx.draw(g);return}
 forest(g,k==='light');const big=A.narrow?15:18;
 if(k==='build')word(S.built<4?`Tap the ${['first','second','third','top'][S.built]} layer, from the ground up`:'Four layers, ground to sky ✓',W/2,H*.03+8,big,{c:S.built<4?C.tx:C.gr});
 if(k==='light'){const y=S.y*H,x=A.W*.37,lay=layerAt(y)||'floor';g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x,H*.1);g.lineTo(x,H*.92);g.stroke();
  g.fillStyle=C.rd;g.beginPath();g.arc(x,y,16,0,7);g.fill();word('🧗',x,y,18);word(`${NAME[lay]}: ${LIGHT[lay]}`,W/2,H*.03+8,big)}
 if(k==='animals'){Object.entries(S.placed).forEach(([i,l])=>{const n=Object.entries(S.placed).filter(([j,m])=>m===l&&+j<+i).length,[t,b]=BAND[l];badge(ANIM[i][0],W*.1+n*(A.narrow?34:46),(t+b)/2*H)});
  const cur=ANIM[S.ai];word(cur?`Where does the ${cur[1]} live? ${cur[0]}`:`Most animals live in the canopy ✓`,W/2,H*.03+8,big,{c:cur?C.tx:C.gr})}
 if(k==='leaves'){S.leaves.forEach(L=>{g.fillStyle=L.rot?'#713f12':'#16a34a';g.beginPath();g.ellipse(L.x,L.y,L.rot?12:11,L.rot?5:6,L.x%3,0,7);g.fill()});
  word(S.rotted>=3?'The leaves rot into soil that feeds the roots ✓':`Drag a leaf down to the floor (${S.rotted} of 3)`,W/2,H*.03+8,big,{c:S.rotted>=3?C.gr:C.tx})}
 if(k==='plants'){Object.entries(S.pplaced).forEach(([i,l])=>{const[t,b]=BAND[l];badge(PLANT[i][0],W*.12,(t+b)/2*H)});
  const cur=PLANT[S.pi];word(cur?`Where do ${cur[1]} grow? ${cur[0]}`:'Every plant in its layer ✓',W/2,H*.03+8,big,{c:cur?C.tx:C.gr})}
 if(S.note&&k!=='light')word(S.note,W/2,H*.97,A.narrow?12:14,{c:C.tx,w:600});A.fx.draw(g)}
// ---------- actions ----------
function build(k){if(S.built>=4)return;const want=LAY[S.built];
 if(k===want){S.built++;A.sound.pop();S.note=`${NAME[k]} ✓`;say(`Yes: the ${NAME[k]} is layer ${S.built} from the ground.`+(S.built===4?' The emergent layer is the very top.':''))}
 else{A.sound.miss();S.note=k==='canopy'&&want==='emergent'?'The canopy is the roof, but giant trees poke above it.':k==='emergent'?'Emergent is the very top. Start lower down.':`Not yet. Next up from the ${S.built?NAME[LAY[S.built-1]]:'ground'}.`;say(S.note)}
 pick();A.redraw();S.after()}
function climb(y){S.y=Math.max(.12,Math.min(.9,y));const l=layerAt(S.y*A.H)||'floor';if(!S.seen[l])A.sound.tick();S.seen[l]=true;say(`You are in the ${NAME[l]}. It is ${LIGHT[l]}.`);A.redraw();S.after()}
function place(l){const cur=ANIM[S.ai];if(!cur)return;
 if(l===cur[2]){S.placed[S.ai]=l;S.ai++;A.sound.pop();S.note=`${cur[1]}: ${NAME[l]} ✓`}
 else{A.sound.miss();S.note={floor:`Too low. The ${cur[1]} lives higher up.`,under:cur[2]==='floor'?`A bit too high for ${cur[1]}.`:`The ${cur[1]} lives higher than the shady understory.`,canopy:cur[2]==='emergent'?'Higher still: above the canopy roof.':`Not the canopy. Look ${LAY.indexOf(cur[2])<2?'lower':'higher'}.`,emergent:`Too high. The ${cur[1]} lives lower down.`}[l]}
 say(S.note);pick();A.redraw();S.after()}
function dropLeaf(i,y){const L=S.leaves[i];if(!L||L.rot)return;L.y=y;if(y>=BAND.floor[0]*A.H){L.y=BAND.floor[1]*A.H-14;L.rot=true;S.rotted++;A.sound.pop();S.note='🍄 It rots into soil on the damp floor.';say(`Leaf ${S.rotted} fell to the forest floor. Fungi and minibeasts break it down into soil.`)}A.redraw();S.after()}
function plant(l){const cur=PLANT[S.pi];if(!cur)return;
 if(l===cur[2]){S.pplaced[S.pi]=l;S.pi++;A.sound.pop();S.note=`${cur[1]}: ${NAME[l]} ✓`}
 else{A.sound.miss();S.note=cur[2]==='under'&&l==='floor'?'They are taller than ferns. Look one layer up.':cur[2]==='emergent'?'The giant trees poke above the canopy.':cur[2]==='canopy'?'Treetops that touch make the roof: the canopy.':`They grow ${LAY.indexOf(cur[2])<LAY.indexOf(l)?'lower':'higher'} down in the shade.`}
 say(S.note);pick();A.redraw();S.after()}
function pick(){if(!pad||!S.seen)return;pad.innerHTML='';const k=now();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:BIG,'aria-label':lab||t},pad,t).onclick=f};
 if(k==='build'&&S.built<4)['canopy','floor','emergent','under'].forEach(l=>add(NAME[l],()=>build(l),`Add the ${NAME[l]} next`));
 if(k==='light'){add('⬆ Climb up',()=>climb(S.y-.12),'Climb up one step');add('⬇ Climb down',()=>climb(S.y+.12),'Climb down one step')}
 if(k==='animals'&&ANIM[S.ai])LAY.slice().reverse().forEach(l=>add(NAME[l],()=>place(l),`The ${ANIM[S.ai][1]} lives in the ${NAME[l]}`));
 if(k==='leaves'&&S.rotted<3)add('🍃 Drop a leaf',()=>{const i=S.leaves.findIndex(L=>!L.rot);if(i>=0)dropLeaf(i,BAND.floor[0]*A.H+5)},'Drop a leaf to the forest floor');
 if(k==='plants'&&PLANT[S.pi])LAY.slice().reverse().forEach(l=>add(NAME[l],()=>plant(l),`${PLANT[S.pi][1]} grow in the ${NAME[l]}`))}
// ---------- canvas: tap a layer; drag the climber; drag a leaf down ----------
function down(p){const k=now();if(k==='quiz')return false;const l=layerAt(p.y);
 if(k==='build'&&l){build(l);return true}
 if(k==='light'){S.drag='climb';climb(p.y/A.H);return true}
 if(k==='animals'&&l){place(l);return true}
 if(k==='plants'&&l){plant(l);return true}
 if(k==='leaves'){const i=S.leaves.findIndex(L=>!L.rot&&Math.hypot(L.x-p.x,L.y-p.y)<34);if(i>=0){S.drag=i;return true}}return false}
function move(p){if(S.drag==='climb')climb(p.y/A.H);else if(typeof S.drag==='number'){const L=S.leaves[S.drag];if(L&&!L.rot){L.x=p.x;L.y=p.y;A.redraw()}}}
function up(p){if(typeof S.drag==='number'&&p)dropLeaf(S.drag,p.y);S.drag=null}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*380))}
const leafSet=()=>[.2,.4,.6].map(f=>({x:A.W*.04+A.W*.66*f,y:A.H*.42,rot:false}));
const steps=[
{h:'Four layers',p:'A rainforest has four layers, like floors in a tall building. Build it from the ground up. Tap a layer name, or tap where it goes.',
 predict:{q:'Which layer is the very top?',opts:['the canopy','the emergent layer','the forest floor'],ans:1},
 task:'Build all four layers from the ground up',show:()=>run(0,LAY.map(l=>()=>build(l))),
 go:()=>{fresh();say('Four empty layers. Start at the ground.');pick();S.after=when(0,()=>S.built>=4,()=>'Floor, understory, canopy, then the emergent trees on top.')}},
{h:'Light and dark',p:'Drag the climber up and down the tree. The leaves at the top catch the sunlight, so less light gets down below.',
 predict:{q:'The forest floor is…',opts:['bright and sunny','dark and damp','the same as the top'],ans:1},
 task:'Climb to the floor and to the very top',show:()=>run(1,[()=>climb(.86),()=>climb(.65),()=>climb(.42),()=>climb(.18)]),
 go:()=>{fresh({built:4,y:.62});say('You are in the understory. Climb up or down.');pick();S.after=when(1,()=>S.seen.floor&&S.seen.emergent,()=>'Dark and damp at the bottom, bright at the top.')}},
{h:'Who lives where?',p:'Each animal lives in the layer that suits it. Tap the layer for each animal. Then look: which layer has the most?',
 predict:{q:'Where do most rainforest animals live?',opts:['on the forest floor','in the canopy','in the emergent layer'],ans:1},
 task:'Put all five animals in their layer',show:()=>run(2,ANIM.map(a=>()=>place(a[2]))),
 go:()=>{fresh({built:4});say('Where does the leafcutter ant live? Tap a layer.');pick();S.after=when(2,()=>S.ai>=ANIM.length,()=>'Two of the five live in the canopy, where there is light, fruit and leaves to eat.')}},
{h:'Leaves fall down',p:'Old leaves drop from the trees above. Drag a leaf down to the forest floor and see what happens to it.',
 predict:{q:'What happens to leaves on the forest floor?',opts:['they stay there for ever','they rot and turn into soil','they float back up'],ans:1},
 task:'Drop three leaves to the floor',show:()=>run(3,[0,1,2].map(i=>()=>dropLeaf(i,A.H*.86))),
 go:()=>{fresh({built:4});S.leaves=leafSet();say('Three leaves in the canopy. Drag one down.');pick();S.after=when(3,()=>S.rotted>=3,()=>'Fungi and minibeasts break the leaves down into soil.')}},
{h:'Plants in each layer',p:'Plants grow in every layer. Giant trees poke out of the top. Small trees and bushes grow in the shade. Tap the layer for each plant.',
 predict:{q:'Small trees and bushes in the shade grow in…',opts:['the understory','the emergent layer','the canopy roof'],ans:0},
 task:'Put all four plants in their layer',show:()=>run(4,PLANT.map(p=>()=>plant(p[2]))),
 go:()=>{fresh({built:4});say('Where do ferns and mushrooms grow? Tap a layer.');pick();S.after=when(4,()=>S.pi>=PLANT.length,()=>'Ferns low down, bushes in the shade, treetops make the roof, giants on top.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['Which layer is at the very top?',[['emergent','ok'],['canopy','top'],['forest floor','flip']]],
 ['Where do most rainforest animals live?',[['canopy','ok'],['forest floor','most'],['emergent','top']]],
 ['Which layer is dark and damp, with old leaves?',[['forest floor','ok'],['canopy','light'],['emergent','flip']]],
 ['A sloth hangs in the thick roof of treetops. Which layer?',[['canopy','ok'],['understory','roof'],['forest floor','flip']]],
 ['Small trees and bushes grow in the shade. Which layer?',[['understory','ok'],['canopy','roof'],['emergent','top']]],
 ['Which order goes from the ground up?',[['floor, understory, canopy, emergent','ok'],['floor, canopy, understory, emergent','order'],['emergent, canopy, understory, floor','flip']]]];
function why(t){let m='Ground up: forest floor, understory, canopy, emergent.';
 if(t==='top')m='The canopy is the roof of leaves. Giant emergent trees poke up above it, so emergent is the top.';
 if(t==='flip')m='That is the other end. The forest floor is at the bottom and the emergent layer is at the top.';
 if(t==='most')m='The floor is dark, with less food. Most animals live up in the canopy, where there is light, fruit and leaves.';
 if(t==='light')m='The canopy gets lots of sun. It is the forest floor that is dark and damp.';
 if(t==='roof')m='The thick roof of treetops is the canopy. The understory is lower down, in the shade.';
 if(t==='order')m='The understory is under the canopy roof, so it comes before the canopy.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:BIG},row,v).onclick=()=>judge(t)});say('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! Floor, understory, canopy, emergent.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;pick()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rainforest layer buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
A.start()})})();
