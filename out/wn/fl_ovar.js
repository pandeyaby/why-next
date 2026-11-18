/* Flagship: Ocean Animal Variety (ages 5–7; NC Year 1 animals: identify and compare fish, mammals and other common
   animals; Year 2 habitats). The ocean holds many kinds of animal, from a hand-sized clownfish to the blue whale, in
   many shapes, and not all of them are fish. Order sizes, match body shapes, sort fish / not a fish, match ways of
   moving, count kinds on a reef. Not flagocean, flagseaneed or flagwhale. */
(()=>{
VIS.reg('flagovar',c=>{
let G,ctl,qa,qx=-1;const v={};c.fig.classList.add('young');
const PH=['size','shape','fish','move','reef','chal'];
const ph=()=>PH[G.step];
const SIZES=[['clownfish','🐠','about as long as your hand'],['sea turtle','🐢','about as long as you are tall'],['great white shark','🦈','about as long as a car'],['blue whale','🐋','longer than two buses']];
const SHAPES=[['star','sea star'],['long','eel'],['flat','stingray'],['spiky','pufferfish'],['arms','octopus']];
const SHAPE_W={star:'a star with 5 arms',long:'long and thin',flat:'flat, like a pancake',spiky:'round and spiky',arms:'8 long arms'};
const FISH=[['clownfish',1],['seahorse',1],['sea star',0],['shark',1],['jellyfish',0],['whale',0],['crab',0]];
const MOVES=[['clownfish','fins','swims with fins and a tail'],['crab','legs','walks sideways on its legs'],['octopus','jet','squirts water to shoot along'],['sea turtle','flip','flaps big flippers']];
const MOVE_W={fins:'fins and tail',legs:'walking legs',jet:'water jet',flip:'flippers'};
const REEF=[['🐠','clownfish'],['🦀','crab'],['🐠','clownfish'],['🐙','octopus'],['🐡','pufferfish'],['🐠','clownfish'],['🦈','shark'],['🦀','crab'],['🐢','sea turtle']];
const REEF_POS=[[.18,.2],[.5,.62],[.78,.22],[.3,.44],[.7,.44],[.5,.2],[.22,.66],[.84,.64],[.5,.42]];
function note(t){c.say(t);if(G)G.cv.setAttribute('aria-label',t)}
function w(t,x,y,px,o){o=o||{};const g=G.ctx;g.font=`${o.b||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=o.ink||G.col.tx;g.fillText(String(t),x,y,o.max||G.W-10)}
const K=()=>G.col,water=()=>G.mix(K().pn,K().cy,K().dark?.36:.3),card=()=>G.mix(K().pn,K().am,K().dark?.22:.18);
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tile(r,f){const g=G.ctx;g.fillStyle=f;G.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=K().tx;g.lineWidth=1.5;g.stroke()}
function msgBar(t){const g=G.ctx,px=G.narrow?15:16,ls=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(x=>{const j=ls.length-1,n=(ls[j]+' '+x).trim();if(g.measureText(n).width>G.W-26&&ls[j])ls.push(x);else ls[j]=n});
 const k=Math.min(4,ls.length),lh=px+5,t0=G.H-k*lh-12;g.fillStyle=G.alpha(K().pn,.95);g.fillRect(0,t0,G.W,G.H-t0);ls.slice(0,4).forEach((l,j)=>w(l,G.W/2,t0+6+lh*j+lh/2,px,{b:600}))}
/* held card: one at a time, drag or tap a target */
const held=()=>G.narrow?{x:G.W/2-85,y:G.H*.05,w:170,h:52}:{x:G.W/2-105,y:G.H*.05,w:210,h:54};
function heldCard(label){const b=v.card=held(),h=v.hold,r=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b;tile(r,card());w(label,r.x+r.w/2,r.y+r.h/2,G.narrow?16:18,{max:r.w-8})}
/* ---- size line ---- */
const slot=i=>{const gp=8,sw=(G.W-24-gp*3)/4;return{x:12+i*(sw+gp),y:G.H*.42,w:sw,h:G.H*.3}};
const pool=i=>{const gp=8,sw=(G.W-24-gp*3)/4;return{x:12+i*(sw+gp),y:G.H*.06,w:sw,h:G.H*.2}};
function drawSize(){const g=G.ctx;
 v.left.forEach((a,i)=>{if(a==null)return;const s=SIZES[a],h=v.hold&&v.hold.a===a?v.hold:null,r=pool(i),q=h?{x:h.x-r.w/2,y:h.y-r.h/2,w:r.w,h:r.h}:r;tile(q,card());w(s[1],q.x+q.w/2,q.y+q.h*.38,G.narrow?26:34);w(s[0].split(' ').pop(),q.x+q.w/2,q.y+q.h*.78,G.narrow?13:15,{max:q.w-4})});
 g.strokeStyle=K().tx;g.lineWidth=2;g.beginPath();g.moveTo(14,G.H*.36);g.lineTo(G.W-14,G.H*.36);g.lineTo(G.W-24,G.H*.33);g.stroke();
 w('smallest',40,G.H*.32,G.narrow?12:14,{b:600});w('biggest',G.W-48,G.H*.3,G.narrow?12:14,{b:600});
 for(let i=0;i<4;i++){const r=slot(i),a=v.line[i];g.setLineDash(a==null?[6,5]:[]);tile(r,a==null?K().pn:water());g.setLineDash([]);
  if(a!=null){const s=SIZES[a],px=(G.narrow?16:20)+i*(G.narrow?6:8);w(s[1],r.x+r.w/2,r.y+r.h*.32,px);w(s[0].split(' ').pop(),r.x+r.w/2,r.y+r.h*.62,G.narrow?13:15,{max:r.w-4})}}
 if(v.sizeOk)SIZES.forEach((s,i)=>w(`${s[1]} ${s[0]}: ${s[2]}`,G.W/2,G.H*(.07+i*.055),G.narrow?13:15,{b:600}))}
function addSize(a){const n=v.line.indexOf(null);if(n<0)return;const want=n;v.hold=null;
 if(a!==want){const s=SIZES[a],sm=SIZES[want];return tell(`Not yet. The ${sm[0]} is smaller than the ${s[0]}. Put the smallest one in first.`,false)}
 v.line[n]=a;v.left[v.left.indexOf(a)]=null;
 if(n===3){v.sizeOk=true;return tell('A clownfish is about as long as your hand. A blue whale is longer than two buses. It is the biggest animal that has ever lived.',true)}
 tell(`Yes, the ${SIZES[a][0]}. Now find the next smallest.`,true)}
/* ---- shapes ---- */
const shapeBox=i=>{const cols=G.narrow?2:3,gp=8,bw=(G.W-24-gp*(cols-1))/cols,bh=G.H*(G.narrow?.17:.25);return{x:12+(i%cols)*(bw+gp),y:G.H*.2+Math.floor(i/cols)*(bh+gp),w:bw,h:bh}};
const ORDER=['spiky','star','arms','flat','long'];
function sil(k,cx,cy,R){const g=G.ctx;g.fillStyle=G.mix(K().vi,K().pn,K().dark?.15:.25);g.beginPath();
 if(k==='star'){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?R*.42:R;g.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a))}}
 else if(k==='long'){g.lineWidth=R*.32;g.strokeStyle=g.fillStyle;g.beginPath();for(let x=-R*1.4;x<=R*1.4;x+=4)g.lineTo(cx+x,cy+Math.sin(x/R*3)*R*.3);g.stroke();return}
 else if(k==='flat'){g.moveTo(cx,cy-R*.6);g.lineTo(cx+R*1.2,cy);g.lineTo(cx,cy+R*.6);g.lineTo(cx-R*1.2,cy);g.closePath();g.fill();g.lineWidth=3;g.strokeStyle=g.fillStyle;g.beginPath();g.moveTo(cx,cy+R*.5);g.lineTo(cx+R*.2,cy+R*1.1);g.stroke();return}
 else if(k==='spiky'){for(let i=0;i<24;i++){const a=i*Math.PI/12,r=i%2?R*.7:R;g.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a))}}
 else{g.arc(cx,cy-R*.35,R*.6,0,7);g.fill();g.lineWidth=Math.max(3,R*.2);g.lineCap='round';g.strokeStyle=g.fillStyle;for(let i=0;i<8;i++){const f=(i-3.5)/3.5;g.beginPath();g.moveTo(cx+f*R*.45,cy);g.quadraticCurveTo(cx+f*R*1.1,cy+R*.5,cx+f*R*1.4,cy+R*.9);g.stroke()}g.lineCap='butt';return}
 g.closePath();g.fill()}
function drawShape(){ORDER.forEach((k,i)=>{const r=shapeBox(i),got=v.shp[k];tile(r,got?water():K().pn);const R=Math.min(r.w,r.h)*.24;sil(k,r.x+r.w/2,r.y+r.h*.42,R);
  w(got?got:SHAPE_W[k],r.x+r.w/2,r.y+r.h*.86,G.narrow?12:14,{b:got?800:600,max:r.w-6})});
 const cur=SHAPES[v.si];if(cur)heldCard(cur[1]);else w('Five animals, five shapes',G.W/2,G.H*.1,G.narrow?16:18,{ink:K().gr})}
function fitShape(k){const cur=SHAPES[v.si];v.hold=null;if(!cur)return G.redraw();
 if(k!==cur[0])return tell(`Not that one. A${/^[aeiou]/.test(cur[1])?'n':''} ${cur[1]} is ${SHAPE_W[cur[0]]}.`,false);
 v.shp[k]=cur[1];v.si++;if(v.si>=SHAPES.length){v.shapeOk=true;return tell('Ocean animals come in many shapes: stars, ropes, pancakes, spiky balls and animals with eight arms.',true)}
 tell(`Yes! The ${cur[1]} is ${SHAPE_W[k]}.`,true)}
/* ---- fish or not ---- */
const bin=i=>{const gp=10,bw=(G.W-24-gp)/2;return{x:12+i*(bw+gp),y:G.H*.24,w:bw,h:G.H*.5}};
function drawFish(){['Fish','Not a fish'].forEach((nm,i)=>{const r=bin(i);tile(r,i?G.mix(K().pn,K().gr,K().dark?.2:.14):water());w(nm,r.x+r.w/2,r.y+20,G.narrow?16:18,{b:800});
  v.fsorted.filter(f=>f[1]===(i?0:1)).forEach((f,j)=>w(f[0],r.x+r.w/2,r.y+52+j*(G.narrow?24:28),G.narrow?14:16,{b:600,max:r.w-8}))});
 const cur=FISH[v.fi];if(cur)heldCard(cur[0]);else w('All seven sorted',G.W/2,G.H*.1,G.narrow?16:18,{ink:K().gr})}
function sortFish(isFish){const cur=FISH[v.fi];v.hold=null;if(!cur)return G.redraw();
 if(isFish!==cur[1]){const tip={seahorse:'Surprise! A seahorse is a fish. It has gills and fins, even though its head looks like a horse.','sea star':'A sea star is not a fish, even though some people call it a starfish. It has no fins and no gills like a fish.',jellyfish:'A jellyfish is not a fish. It has no bones, no fins and no brain.',whale:'A whale is not a fish. It breathes air and feeds its baby milk: it is a mammal.',crab:'A crab is not a fish. It has a hard shell and walking legs.'}[cur[0]]||`A ${cur[0]} is a fish: it has gills and fins.`;return tell(tip,false)}
 v.fsorted.push(cur);v.fi++;if(v.fi>=FISH.length){v.fishOk=true;return tell('Not everything in the sea is a fish. The sea is full of different kinds of animal.',true)}
 tell(cur[0]==='seahorse'?'Yes! A seahorse really is a fish.':'Yes!',true)}
/* ---- ways to move ---- */
const lane=i=>({x:12,y:G.H*(.2+i*.135),w:G.W-24,h:G.H*.12});
function drawMove(){const g=G.ctx;['fins','legs','jet','flip'].forEach((k,i)=>{const r=lane(i),got=v.mv[k];tile(r,got?water():K().pn);w(MOVE_W[k],r.x+(G.narrow?62:90),r.y+r.h/2,G.narrow?14:16,{b:700,max:G.narrow?110:170});
  if(got){const t=v.anim[k]||0,x=r.x+(G.narrow?150:220)+t*(r.w-(G.narrow?225:300)),y=r.y+r.h/2+(k==='jet'?Math.sin(t*12)*4:0);w(got,x,y,G.narrow?13:15,{b:800,max:110})}});
 const cur=MOVES[v.mi];if(cur)heldCard(cur[0]);else w('Four ways to move',G.W/2,G.H*.1,G.narrow?16:18,{ink:K().gr})}
function moveAs(k){const cur=MOVES[v.mi];v.hold=null;if(!cur)return G.redraw();
 if(k!==cur[1])return tell(`Not quite. A ${cur[0]} ${cur[2]}.`,false);
 v.mv[k]=cur[0];v.anim[k]=0;G.tween(v.anim,{[k]:1},900,'io');v.mi++;
 if(v.mi>=MOVES.length){v.moveOk=true;return tell('Different animals move in different ways: fins, legs, water jets and flippers.',true)}
 tell(`Yes! A ${cur[0]} ${cur[2]}.`,true)}
/* ---- reef: count kinds ---- */
const reefAt=i=>({x:G.W*REEF_POS[i][0],y:G.H*(.08+REEF_POS[i][1]*.92),R:G.narrow?24:30});
function drawReef(){const g=G.ctx;g.fillStyle=water();g.fillRect(0,G.H*.06,G.W,G.H*.72);
 REEF.forEach((a,i)=>{const p=reefAt(i);if(v.kinds.has(a[1])){g.strokeStyle=K().gr;g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,p.R,0,7);g.stroke()}w(a[0],p.x,p.y,G.narrow?32:40)});
 w(`animals: ${REEF.length}   kinds found: ${v.kinds.size} of 6`,G.W/2,G.H*.04,G.narrow?14:16,{b:700})}
function spotKind(i){const a=REEF[i];if(v.kinds.has(a[1]))return tell(`You already found a ${a[1]}. Another ${a[1]} is the same kind, so the count of kinds stays at ${v.kinds.size}.`,false);
 v.kinds.add(a[1]);if(v.kinds.size===6){v.reefOk=true;return tell('9 animals, but only 6 kinds. Variety means how many different kinds there are.',true)}
 tell(`A ${a[1]}! That is ${v.kinds.size} kind${v.kinds.size>1?'s':''}.`,true)}
/* ---- frame ---- */
function draw(){const g=G.ctx,k=ph();g.fillStyle=G.mix(K().pn,K().cy,K().dark?.05:.06);g.fillRect(0,0,G.W,G.H);
 if(k==='chal'){w('🐠 Ocean check',G.W/2,G.H*.42,G.narrow?20:24);w('Answer below',G.W/2,G.H*.56,15,{ink:K().mu,b:500});G.fx.draw(g);return}
 ({size:drawSize,shape:drawShape,fish:drawFish,move:drawMove,reef:drawReef})[k]();if(v.msg)msgBar(v.msg);G.fx.draw(g)}
function tell(t,good){v.msg=t;if(good)G.sound.pop();else if(good===false)G.sound.miss();note(t);pad();G.redraw();v.check&&v.check()}
function clear(){for(const k in v)delete v[k];Object.assign(v,{left:[2,0,3,1],line:[null,null,null,null],shp:{},si:0,fsorted:[],fi:0,mv:{},anim:{},mi:0,kinds:new Set(),msg:'',check:null});if(G)G.redraw()}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=ph();if(k==='chal')return;
 const B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='size'&&!v.sizeOk)v.left.forEach(a=>{if(a!=null)B(`${SIZES[a][1]} ${SIZES[a][0]}`,()=>addSize(a),`Put the ${SIZES[a][0]} next on the size line`)});
 if(k==='shape'&&SHAPES[v.si])ORDER.forEach(s=>{if(!v.shp[s])B(SHAPE_W[s],()=>fitShape(s),`${SHAPES[v.si][1]}: ${SHAPE_W[s]}`)});
 if(k==='fish'&&FISH[v.fi]){B('Fish',()=>sortFish(1),`${FISH[v.fi][0]}: fish`);B('Not a fish',()=>sortFish(0),`${FISH[v.fi][0]}: not a fish`)}
 if(k==='move'&&MOVES[v.mi])['fins','legs','jet','flip'].forEach(m=>{if(!v.mv[m])B(MOVE_W[m],()=>moveAs(m),`${MOVES[v.mi][0]}: ${MOVE_W[m]}`)});
 if(k==='reef'&&!v.reefOk)REEF.forEach((a,i)=>B(`${a[0]} ${i+1}`,()=>spotKind(i),`Animal ${i+1}: ${a[1]}`))}
function targetAt(p){const k=ph();
 if(k==='size')return isIn(p,{x:0,y:G.H*.4,w:G.W,h:G.H*.34})?'line':null;
 if(k==='shape')return ORDER.find((s,i)=>isIn(p,shapeBox(i)));
 if(k==='fish'){const i=[0,1].find(i=>isIn(p,bin(i)));return i==null?null:i===0?1:0}
 if(k==='move')return ['fins','legs','jet','flip'].find((m,i)=>isIn(p,lane(i)));return null}
function act(t){const k=ph();if(t==null)return;if(k==='size')return addSize(v.hold?v.hold.a:v.left.find(a=>a!=null));if(k==='shape')return fitShape(t);if(k==='fish')return sortFish(t);if(k==='move')return moveAs(t)}
function down(p){const k=ph();if(k==='chal')return false;
 if(k==='reef'){if(v.reefOk)return false;const i=REEF.findIndex((a,j)=>{const q=reefAt(j);return Math.hypot(p.x-q.x,p.y-q.y)<q.R+6});if(i>=0){spotKind(i);return true}return false}
 if(k==='size'){const i=v.left.findIndex((a,j)=>a!=null&&isIn(p,pool(j)));if(i>=0){v.hold={a:v.left[i],x:p.x,y:p.y};return true}return false}
 const done=(k==='shape'&&!SHAPES[v.si])||(k==='fish'&&!FISH[v.fi])||(k==='move'&&!MOVES[v.mi]);if(done)return false;
 if(isIn(p,v.card)){v.hold={x:p.x,y:p.y};return true}const t=targetAt(p);if(t!=null){act(t);return true}return false}
function move(p){if(v.hold){v.hold.x=p.x;v.hold.y=p.y;G.redraw()}}
function up(){if(!v.hold)return;const h=v.hold,t=targetAt(h);if(t!=null){act(t);v.hold=null;return}v.hold=null;G.redraw()}
const ready=(i,ok,line)=>()=>{if(G.step===i&&!G.isDone&&(G.pred[i]!=null||!steps[i].predict)&&ok())G.done(line()+G.reveal(i))};
function play(i,fs){steps[i].go();fs.forEach((f,j)=>setTimeout(()=>{if(G.step===i)f()},G.reduced()?30*(j+1):(j+1)*330))}
function enter(i,hint,ok,line){clear();v.check=ready(i,ok,line);tell(hint)}
const steps=[
{h:'Tiny to huge',p:'Ocean animals come in every size. Some fit in your hand. One is longer than two buses.',
 predict:{q:'What is the biggest animal that has ever lived?',opts:['a dinosaur','the blue whale'],ans:1},
 task:'Put the four animals in order of size',show:()=>play(0,[0,1,2,3].map(a=>()=>addSize(a))),
 go:()=>enter(0,'Drag the smallest animal onto the size line first, or press its button.',()=>v.sizeOk,()=>'Smallest to biggest.')},
{h:'Many shapes',p:'Not every sea animal is shaped like a fish. Look at the shapes and find the animal for each one.',
 predict:{q:'Are all sea animals shaped like a fish, with fins and a tail?',opts:['yes, they all look like fish','no, they come in many shapes'],ans:1},
 task:'Match all five animals to their shapes',show:()=>play(1,SHAPES.map(s=>()=>fitShape(s[0]))),
 go:()=>enter(1,'Drag the animal card onto its shape, or press a shape button.',()=>v.shapeOk,()=>'Five different shapes.')},
{h:'Fish or not a fish?',p:'A fish has gills to breathe under water and fins to swim. Many sea animals are not fish at all.',
 predict:{q:'Is a seahorse a fish?',opts:['no, it is a kind of horse','yes, it is a fish'],ans:1},
 task:'Sort all seven animals',show:()=>play(2,FISH.map(f=>()=>sortFish(f[1]))),
 go:()=>enter(2,'Drag each card to Fish or Not a fish, or press a button.',()=>v.fishOk,()=>'Fish and not fish.')},
{h:'Ways to move',p:'Sea animals move in different ways. Some swim, some walk, some squirt water.',
 task:'Match all four animals to how they move',show:()=>play(3,MOVES.map(m=>()=>moveAs(m[1]))),
 go:()=>enter(3,'Drag the animal card onto the way it moves, or press a button.',()=>v.moveOk,()=>'Four ways to move.')},
{h:'Count the kinds',p:'Variety means how many different kinds of animal there are, not how many animals.',
 predict:{q:'A reef has 3 clownfish and 1 crab. How many kinds of animal is that?',opts:['4 kinds','2 kinds'],ans:1},
 task:'Find all six kinds on the reef',show:()=>play(4,[0,1,3,4,6,8].map(i=>()=>spotKind(i))),
 go:()=>enter(4,'Tap each different kind of animal on the reef.',()=>v.reefOk,()=>'Six kinds on one reef.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>v.check&&v.check()});
const QS=[
 ['Which is the biggest animal that has ever lived?',[['the blue whale','ok'],['a dinosaur','dino'],['the great white shark','dino']]],
 ['Is a seahorse a fish?',[['yes, it has gills and fins','ok'],['no, it is a kind of horse','horse'],['no, it is a mammal','horse']]],
 ['Is a sea star (starfish) a fish?',[['no, it has no fins or gills like a fish','ok'],['yes, it is called starfish','star'],['yes, all sea animals are fish','all']]],
 ['How does an octopus shoot along fast?',[['it squirts out a jet of water','ok'],['it flaps flippers','move'],['it walks on legs','move']]],
 ['A reef has 2 crabs, 2 crabs and 1 turtle. How many kinds?',[['2 kinds','ok'],['5 kinds','count'],['4 kinds','count']]],
 ['Which ocean animal is about as long as your hand?',[['a clownfish','ok'],['a blue whale','size'],['a great white shark','size']]],
 ['Are all sea animals shaped like fish?',[['no, there are stars, ropes, flat and spiky shapes','ok'],['yes, all have fins and a tail','all'],['yes, except whales','all']]]];
function explainSlip(t){let m='Think about size, shape, how it breathes and how it moves.';
 if(t==='dino')m='The blue whale is bigger than any dinosaur and much bigger than a shark. It is longer than two buses.';
 if(t==='horse')m='A seahorse is a fish. It breathes with gills and swims with small fins.';
 if(t==='star')m='Its old name says fish, but a sea star has no fins and no gills like a fish, so it is not one.';
 if(t==='all')m='Many sea animals are not fish, and they come in many shapes: sea stars, eels, rays, jellyfish.';
 if(t==='move')m='An octopus squirts water out of its body to shoot along. Turtles flap flippers; crabs walk.';
 if(t==='count')m='Count kinds, not animals: crabs are one kind and the turtle is another, so 2 kinds.';
 if(t==='size')m='A clownfish is small, about hand-sized. Whales and sharks are far bigger.';
 return m}
function ask(){qx++;const q=QS[qx%QS.length],r=qx%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>grade(t)});note('Challenge: '+q[0]);G.redraw()}
function grade(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const out=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)G.win();else G.sound.miss();out.innerHTML=(ok?'✓ Yes! ':'✗ '+explainSlip(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=ask}
G=FK.shell(c,{steps,ratio:.68,tall:1.3,draw,onStep:A=>{qa.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{G=A;clear();const wr=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ocean animal buttons'},wr);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pad()}});
G.start()})})();
