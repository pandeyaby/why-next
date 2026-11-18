/* Flagship: Habitats & Basic Needs (ages 6–8; NC Year 2 living things and their habitats: "identify that most living
   things live in habitats to which they are suited and describe how different habitats provide for the basic needs of
   different kinds of animals and plants, and how they depend on each other"; NGSS K-ESS3-1, 2-LS4-1). Pond gives a frog
   each need; a needs checklist as animals move habitat; body parts that suit a habitat; helping pairs; build a garden.
   Not flaghome, flagneeds or flagmbhab. */
(()=>{const lo=Math.min,hi=Math.max;
const NEED=[['🍽️','food'],['💧','water'],['🛖','shelter'],['🌬️','air']];
const POND=[['🪰','flies to catch',0,'give'],['🪨','stones and reeds to hide in',2,'give'],['🌊','pond water',1,'gives'],['☁️','fresh air above the water',3,'gives']];
const HAB=[['🌳','woodland'],['🐸','pond'],['🏖️','seashore'],['🪵','under a log']];
const WHO=[['🐿️','squirrel',0],['🐟','fish',1],['🦀','crab',2],['🐛','woodlouse',3]];
/* which needs each habitat meets for each animal: [food, water, shelter, air] */
const FIT=[[[1,1,1,1],[0,1,0,1],[0,0,0,1],[0,1,0,1]],[[0,0,0,0],[1,1,1,1],[0,0,1,1],[0,0,0,0]],[[0,0,0,1],[0,0,1,1],[1,1,1,1],[0,0,1,1]],[[1,0,0,1],[0,0,0,0],[0,0,0,1],[1,1,1,1]]];
const WHY=[['Plenty here: nuts, water and trees to nest in.','No trees: nowhere to nest, and no nuts.','No trees, no nuts, no fresh water to drink.','A log is too small: no nest high up, and it needs trees for nuts.'],
 ['No water! A fish breathes the air in water, so out of water it cannot breathe.','Water, food and weeds to hide in.','Sea water is too salty for this pond fish.','No water! A fish cannot breathe out of water.'],
 ['No sea water: a crab needs to stay wet in salt water.','Pond water is not salty. This crab needs the sea.','Salt water, food and rocks to hide under.','No sea water, and no crab food here.'],
 ['Too dry and bright out in the open wood: a woodlouse dries out.','Too wet: a woodlouse would drown in a pond.','Too salty and dry in the sun for a woodlouse.','Damp, dark, and rotting wood to eat.']];
const BODY=[['🦆','webbed feet',1,'Webbed feet push water like paddles, so a duck can swim on the pond.'],['🦔','spines',0,'Spines protect a hedgehog from foxes among the woodland leaves.'],['🦀','a hard shell',2,'A hard shell protects a crab from waves and hungry birds on the rocky shore.'],['🐛','a body that needs damp',3,'A woodlouse dries out easily, so it suits the damp under a log.']];
const PAIR=[['🐝','bee','🌸','flower','The bee gets sweet nectar to eat. The flower gets pollen carried to another flower, so it can make seeds.'],
 ['🐿️','squirrel','🌳','oak tree','The squirrel gets acorns to eat and branches to nest in. Some acorns it buries and forgets grow into new oak trees.'],
 ['🐦','blackbird','🫐','berry bush','The blackbird eats the berries. It drops the seeds far away, so new bushes grow.']];
const BUILD=[['🌸','flowers'],['💧','a pond'],['🪵','a log pile'],['🌿','a hedge']];
const GUEST=[['🐝','bee',[0],'Bees need flowers for nectar.'],['🐸','frog',[1,2],'Frogs need a pond and a damp log pile to hide in.'],['🦔','hedgehog',[2,3],'Hedgehogs need a log pile to sleep in and a hedge to hide and hunt in.'],['🐦','blackbird',[3],'Blackbirds need a hedge to nest in.']];
VIS.reg('flaghabnd',c=>{let A,pad,quiz,qn=-1,gen=0;const H={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',SEL='#6d28d9',TINT=['#dcfce7','#bfdbfe','#fde68a','#e7e5e4'];
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2);
const part=()=>['pond','move','body','pair','yard','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.08:.5);g.fillRect(0,0,A.W,A.H)}
function label(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=font(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=font(n);w=g.measureText(t).width+22}
 const h=n+16,x0=hi(5,lo(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:RIM;g.stroke();mid(g);g.fillStyle=INK;g.fillText(t,x0+w/2,y+1)}
function box(r,pic,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.on?4:2;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:RIM;g.stroke();mid(g);
 if(pic){g.font=`${Math.round(lo(r.h*.4,r.w*.36))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(word?.36:.5))}
 if(word){let n=Math.round(hi(11,pic?lo(sz(16),r.h*.2):lo(sz(18),r.h*.34)));g.font=font(n);while(g.measureText(word).width>r.w-8&&n>9){n--;g.font=font(n)}g.fillStyle=INK;g.fillText(word,r.x+r.w/2,r.y+r.h*(pic?.8:.5))}}
const grid=(n,y,hh,cols)=>{cols=cols||n;const w=lo(150,(A.W-16-8*(cols-1))/cols),h=hh;return[...Array(n)].map((_,i)=>({i,x:(A.W-(w*cols+8*(cols-1)))/2+(i%cols)*(w+8),y:y+Math.floor(i/cols)*(h+8),w,h}))};
/* 1. what a pond gives a frog */
const needBoxes=()=>grid(4,A.H*.62,A.narrow?lo(70,A.H*.17):lo(110,A.H*.32),A.narrow?2:4);
const pondCards=()=>grid(4,A.H*.16,A.narrow?lo(64,A.H*.14):lo(96,A.H*.2),A.narrow?2:4);
function drawPond(){const s=H.p,g=A.ctx;ground();const n=s.at.filter(x=>x!=null).length;label(n>=4?'The pond meets every need':`🐸 A frog's pond: ${n} of 4 needs`,A.W/2,A.H*.07,{n:13,ok:n>=4});
 needBoxes().forEach(r=>{const k=s.at.indexOf(r.i);box(r,NEED[r.i][0],k>=0?`${NEED[r.i][1]}: ${POND[k][1]}`:NEED[r.i][1],{bg:k>=0?'#dcfce7':'#fff',ok:k>=0})});
 pondCards().forEach(r=>{if(s.at[r.i]!=null||(H.drag&&H.drag.i===r.i))return;box(r,POND[r.i][0],POND[r.i][1],{bad:s.bad===r.i,bg:'#e0f2fe'})});
 if(H.drag){const d=H.drag,r=pondCards()[d.i];box({...r,x:d.x-r.w/2,y:d.y-r.h/2},POND[d.i][0],POND[d.i][1],{on:1,bg:'#e0f2fe'})}}
function meet(i,j){const s=H.p;if(s.at[i]!=null)return;const right=POND[i][2];if(j!==right){s.bad=i;A.sound.miss();
 return say(`Not ${NEED[j][1]}. ${POND[i][1][0].toUpperCase()+POND[i][1].slice(1)} ${POND[i][3]} the frog ${NEED[right][1]}${right===2?': a safe place to hide from herons':''}.`)}
 s.at[i]=j;s.bad=null;A.sound.pop();say(`Yes: ${POND[i][1]} ${POND[i][3]} the frog ${NEED[j][1]}.`+(s.at.every(x=>x!=null)?' A habitat is more than a home: it gives food, water, shelter and air.':''))}
/* 2. move animals, check needs */
const habs=()=>grid(4,A.H*.14,A.narrow?lo(78,A.H*.18):lo(120,A.H*.3),A.narrow?2:4);
const pets=()=>grid(4,A.H*.74,lo(80,A.H*.18),4);
function drawMove(){const s=H.m,g=A.ctx;ground();const n=s.home.filter(x=>x!=null).length;label(n>=4?'Every animal is in a habitat that suits it':`Suited: ${n} of 4`,A.W/2,A.H*.06,{n:13,ok:n>=4});
 habs().forEach(r=>{box(r,HAB[r.i][0],HAB[r.i][1],{bg:TINT[r.i]});const here=s.home.map((h,i)=>h===r.i?i:-1).filter(i=>i>=0);g.font=`${sz(20)}px system-ui,sans-serif`;mid(g);here.forEach((i,k)=>g.fillText(WHO[i][0],r.x+16+k*24,r.y+16))});
 if(s.try){const [i,j]=s.try,f=FIT[i][j],y=A.H*(A.narrow?.62:.6);NEED.forEach((nd,k)=>{const x=A.W/2+(k-1.5)*lo(86,A.W*.23);label(`${f[k]?'✓':'✗'} ${nd[1]}`,x,y,{n:12,ok:f[k],bad:!f[k]})})}
 pets().forEach(r=>{if(s.home[r.i]!=null||(H.drag&&H.drag.i===r.i))return;box(r,WHO[r.i][0],WHO[r.i][1],{})});
 if(H.drag){const d=H.drag,r=pets()[d.i];box({...r,x:d.x-r.w/2,y:d.y-r.h/2},WHO[d.i][0],WHO[d.i][1],{on:1})}}
function settle(i,j){const s=H.m;if(s.home[i]!=null)return;s.try=[i,j];const ok=FIT[i][j].every(x=>x);if(!ok){A.sound.miss();return say(`${WHO[i][1]} in the ${HAB[j][1]}: ${WHY[i][j]} Try another habitat.`)}
 s.home[i]=j;A.sound.pop();say(`${WHO[i][1]} in the ${HAB[j][1]}: every need is met. ${WHY[i][j]}`+(s.home.every(x=>x!=null)?' Each animal lives where its needs are met.':''))}
/* 3. built for its home */
const parts=()=>grid(4,A.H*.62,A.narrow?lo(64,A.H*.15):lo(96,A.H*.22),A.narrow?2:4);
function drawBody(){const s=H.b,g=A.ctx;ground();const n=s.at.filter(x=>x!=null).length;label(n>=4?'Each body suits its habitat':`Matched: ${n} of 4`,A.W/2,A.H*.06,{n:13,ok:n>=4});
 habs().forEach(r=>{const k=s.at.indexOf(r.i);box(r,HAB[r.i][0],HAB[r.i][1],{bg:TINT[r.i],ok:k>=0});if(k>=0){g.font=`${sz(22)}px system-ui,sans-serif`;mid(g);g.fillText(BODY[k][0],r.x+18,r.y+18)}});
 parts().forEach(r=>{if(s.at[r.i]!=null||(H.drag&&H.drag.i===r.i))return;box(r,BODY[r.i][0],BODY[r.i][1],{bad:s.bad===r.i})});
 if(H.drag){const d=H.drag,r=parts()[d.i];box({...r,x:d.x-r.w/2,y:d.y-r.h/2},BODY[d.i][0],BODY[d.i][1],{on:1})}}
function suit(i,j){const s=H.b;if(s.at[i]!=null)return;if(j!==BODY[i][2]){s.bad=i;A.sound.miss();return say(`Think about what ${BODY[i][1]} help with. ${['Is there water to swim in?','Where are foxes and fallen leaves?','Where do waves crash on rocks?','Where is it damp and dark?'][i]}`)}
 s.at[i]=j;s.bad=null;A.sound.pop();say(BODY[i][3]+(s.at.every(x=>x!=null)?' Living things are suited to their habitats.':''))}
/* 4. help each other */
const beasts=()=>grid(3,A.H*.16,lo(96,A.H*.22));const greens=()=>grid(3,A.H*.62,lo(96,A.H*.22));
const PLANT_AT=[1,2,0];
function drawPair(){const s=H.d,g=A.ctx;ground();label(s.done.length>=3?'Animals and plants help each other':`Pairs found: ${s.done.length} of 3`,A.W/2,A.H*.07,{n:13,ok:s.done.length>=3});
 const B=beasts(),G=greens();s.done.forEach(i=>{const a=B[i],b=G[PLANT_AT.indexOf(i)];g.strokeStyle=OK;g.lineWidth=4;g.beginPath();g.moveTo(a.x+a.w/2,a.y+a.h);g.lineTo(b.x+b.w/2,b.y);g.stroke()});
 B.forEach(r=>{if(H.drag&&H.drag.i===r.i)return;box(r,PAIR[r.i][0],PAIR[r.i][1],{ok:s.done.includes(r.i)})});
 G.forEach((r,k)=>{const i=PLANT_AT[k];box(r,PAIR[i][2],PAIR[i][3],{ok:s.done.includes(i),bad:s.bad===k,bg:'#f0fdf4'})});
 if(H.drag){const d=H.drag,r=B[d.i];box({...r,x:d.x-r.w/2,y:d.y-r.h/2},PAIR[d.i][0],PAIR[d.i][1],{on:1})}}
function link(i,k){const s=H.d;if(s.done.includes(i))return;if(PLANT_AT[k]!==i){s.bad=k;A.sound.miss();return say(`The ${PAIR[i][1]} and the ${PAIR[PLANT_AT[k]][3]} do not help each other much. What does the ${PAIR[i][1]} eat?`)}
 s.done.push(i);s.bad=null;A.sound.pop();say(PAIR[i][4]+(s.done.length>=3?' Both sides get something: they depend on each other.':''))}
/* 5. build a garden */
const plot=()=>({x:8,y:A.H*.14,w:A.W-16,h:A.H*.5});const kit=()=>grid(4,A.H*.74,lo(80,A.H*.18),4);
const came=s=>GUEST.map(gu=>gu[2].every(k=>s.has[k]));
function drawYard(){const s=H.y,g=A.ctx,P=plot();ground();const v=came(s),n=v.filter(Boolean).length;label(n>=4?'All 4 animals moved in':`Animals moved in: ${n} of 4`,A.W/2,A.H*.07,{n:13,ok:n>=4});
 g.fillStyle='#bbf7d0';A.paint.rrect(P.x,P.y,P.w,P.h,14);g.fill();g.strokeStyle=RIM;g.lineWidth=2;g.stroke();g.font=`${sz(30)}px system-ui,sans-serif`;mid(g);
 BUILD.forEach((b,k)=>{if(s.has[k])g.fillText(b[0],P.x+P.w*(.14+.24*k),P.y+P.h*.68)});GUEST.forEach((gu,k)=>{if(v[k])g.fillText(gu[0],P.x+P.w*(.14+.24*k),P.y+P.h*.3)});
 if(!s.has.some(Boolean)){g.fillStyle=INK;g.font=font(sz(13));g.fillText('Short grass only. No one lives here yet.',A.W/2,P.y+P.h/2)}
 kit().forEach(r=>{if(s.has[r.i]||(H.drag&&H.drag.i===r.i))return;box(r,BUILD[r.i][0],BUILD[r.i][1],{})});
 if(H.drag){const d=H.drag,r=kit()[d.i];box({...r,x:d.x-r.w/2,y:d.y-r.h/2},BUILD[d.i][0],BUILD[d.i][1],{on:1})}}
function add(k){const s=H.y;if(s.has[k])return;const before=came(s);s.has[k]=1;const after=came(s),fresh=GUEST.filter((gu,i)=>after[i]&&!before[i]);A.sound.pop();
 const wait=GUEST.filter((gu,i)=>!after[i]&&gu[2].includes(k));let t=`You added ${BUILD[k][1]}.`;if(fresh.length)t+=' '+fresh.map(gu=>`A ${gu[1]} moved in! ${gu[3]}`).join(' ');
 if(wait.length)t+=' '+wait.map(gu=>`The ${gu[1]} is not here yet: ${gu[3]}`).join(' ');if(after.every(Boolean))t+=' Your garden meets every animal\'s needs.';say(t)}
function draw(){const k=part();if(k==='chal'){ground();label('Challenge',A.W/2,A.H*.16,{ok:1});label('food, water, shelter, air',A.W/2,A.H*.5,{n:14});return}
 ({pond:drawPond,move:drawMove,body:drawBody,pair:drawPair,yard:drawYard})[k]();A.fx.draw(A.ctx)}
const DRAG={pond:[pondCards,i=>H.p.at[i]!=null],move:[pets,i=>H.m.home[i]!=null],body:[parts,i=>H.b.at[i]!=null],pair:[beasts,i=>H.d.done.includes(i)],yard:[kit,i=>H.y.has[i]]};
function down(p){const D=DRAG[part()];if(!D)return false;const r=D[0]().find(r=>on(p,r));if(!r||D[1](r.i))return false;H.drag={i:r.i,x:p.x,y:p.y};return true}
function move(p){if(!H.drag)return;H.drag.x=p.x;H.drag.y=p.y;A.redraw()}
function up(p){const d=H.drag;if(!d)return;H.drag=null;const k=part(),find=L=>{const r=L.find(r=>on(p,r));return r?r.i:-1};let j;
 if(k==='pond'){j=find(needBoxes());if(j>=0)return meet(d.i,j)}
 if(k==='move'){j=find(habs());if(j>=0)return settle(d.i,j)}
 if(k==='body'){j=find(habs());if(j>=0)return suit(d.i,j)}
 if(k==='pair'){j=find(greens());if(j>=0)return link(d.i,j)}
 if(k==='yard'&&on(p,plot()))return add(d.i);A.redraw()}
function fresh(){gen++;for(const k in H)delete H[k];Object.assign(H,{p:{at:[null,null,null,null],bad:null},m:{home:[null,null,null,null],try:null},b:{at:[null,null,null,null],bad:null},d:{done:[],bad:null},y:{has:[0,0,0,0]},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();H.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);H.hook=watch(i,ok,msg)}
function act(i,list,ms){steps[i].go();const g0=gen;list.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='pond'){const i=H.p.at.findIndex(x=>x==null);if(i>=0)NEED.forEach((nd,j)=>B(`${POND[i][0]} ${POND[i][1]}: ${nd[1]}`,()=>meet(i,j)))}
 if(k==='move'){const i=H.m.home.findIndex(x=>x==null);if(i>=0)HAB.forEach((h,j)=>B(`${WHO[i][0]} ${WHO[i][1]} → ${h[1]}`,()=>settle(i,j)))}
 if(k==='body'){const i=H.b.at.findIndex(x=>x==null);if(i>=0)HAB.forEach((h,j)=>B(`${BODY[i][1]} → ${h[1]}`,()=>suit(i,j),`${BODY[i][0]} ${BODY[i][1]} suits the ${h[1]}`))}
 if(k==='pair'){const i=[0,1,2].find(x=>!H.d.done.includes(x));if(i!=null)PLANT_AT.forEach((pi,kk)=>B(`${PAIR[i][0]} ${PAIR[i][1]} + ${PAIR[pi][2]} ${PAIR[pi][3]}`,()=>link(i,kk)))}
 if(k==='yard')BUILD.forEach((b,i)=>{if(!H.y.has[i])B(`Add ${b[0]} ${b[1]}`,()=>add(i))})}
const steps=[
{h:'What a pond gives',p:'A pond is a frog\'s habitat. Drag each thing in the pond to the need it meets.',
 predict:{q:'What does a habitat give an animal?',opts:['Just a place to sleep','Food, water, shelter and air'],ans:1},task:'Match all 4 pond things to a need',
 show:()=>act(0,POND.map((v,i)=>()=>meet(i,v[2])),500),
 go:()=>open(0,'Four things in a pond: flies, stones and reeds, pond water, fresh air. Four needs: food, water, shelter, air.',()=>H.p.at.every(x=>x!=null),'A habitat is where a living thing lives and gets everything it needs.')},
{h:'The right habitat',p:'Drag each animal to a habitat. The checklist shows which needs are met. Find a habitat that meets them all.',
 predict:{q:'Could a fish live in a wood if you gave it lots of food?',opts:['Yes, food is all it needs','No, it needs water to breathe'],ans:1},task:'Find a suitable habitat for all 4 animals',
 show:()=>act(1,[()=>settle(1,0),()=>settle(1,1),()=>settle(0,0),()=>settle(2,2),()=>settle(3,3)],650),
 go:()=>open(1,'Four habitats: woodland, pond, seashore, under a log. Four animals: squirrel, fish, crab, woodlouse.',()=>H.m.home.every(x=>x!=null),'Most living things live in a habitat that meets all their needs.')},
{h:'Built for its home',p:'Animals have body parts that suit their habitat. Drag each one to the habitat it suits.',task:'Match all 4 body parts',
 show:()=>act(2,BODY.map((v,i)=>()=>suit(i,v[2])),550),
 go:()=>open(2,'Four habitats and four body parts: webbed feet, spines, a hard shell, a body that needs damp.',()=>H.b.at.every(x=>x!=null),'Living things are suited to their habitats.')},
{h:'Help each other',p:'In a habitat, living things depend on each other. Drag each animal to the plant it helps.',
 predict:{q:'When a bee visits a flower, who gets help?',opts:['Only the bee','The bee and the flower'],ans:1},task:'Find all 3 helping pairs',
 show:()=>act(3,[0,1,2].map(i=>()=>link(i,PLANT_AT.indexOf(i))),600),
 go:()=>open(3,'Animals on top: bee, squirrel, blackbird. Plants below: oak tree, berry bush, flower.',()=>H.d.done.length>=3,'Animals and plants in a habitat depend on each other.')},
{h:'Make a habitat',p:'This garden is just short grass. Drag things into it and see which animals move in.',task:'Get all 4 animals to move in',
 show:()=>act(4,[0,1,2,3].map(k=>()=>add(k)),650),
 go:()=>open(4,'An empty garden of short grass. Things to add: flowers, a pond, a log pile, a hedge.',()=>came(H.y).every(Boolean),'When a habitat meets their needs, animals come to live there.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>H.hook()});
const QS=[
 {q:'What is a habitat?',a:'A place where a living thing lives and gets what it needs',o:[['Just a place to sleep','home'],['Any place at all','any']]},
 {q:'Why can a fish not live in a wood?',a:'It needs water to breathe',o:[['There is no food for it','food'],['It is too dark','any']]},
 {q:'What do a duck\'s webbed feet help it do?',a:'Swim on the pond',o:[['Climb trees','suit'],['Dig in soil','suit']]},
 {q:'When a bee visits a flower, who gets help?',a:'The bee and the flower',o:[['Only the bee','one'],['Only the flower','one']]},
 {q:'A garden has a hedge but no pond. Will frogs live there?',a:'No, frogs need a pond',o:[['Yes, a hedge is enough','food'],['Yes, frogs live anywhere','any']]},
 {q:'Where does a woodlouse live best?',a:'Under a log, where it is damp and dark',o:[['In a pond','suit'],['On a sunny path','suit']]}];
function why(t){let m='A habitat must meet every need: food, water, shelter and air.';
 if(t==='home')m='A habitat is more than a bed. It gives food, water, shelter and air too.';
 if(t==='food')m='Food is not enough. Every need must be met: a fish needs water to breathe, and a frog needs a pond.';
 if(t==='suit')m='Look at the body: it suits one habitat best. Webbed feet are for water, a damp body is for under a log.';
 if(t==='one')m='Both get help. The bee gets nectar to eat, and the flower gets its pollen carried so it can make seeds.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Habitat buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
