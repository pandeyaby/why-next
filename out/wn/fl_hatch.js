/* Flagship: How Animals Have Babies (ages 5–7; NC Year 2 Animals including humans: animals have offspring which grow
   into adults; Year 1–2 animal groups). Some animals lay eggs (birds, reptiles, fish, amphibians, insects) and most
   mammals give birth to live young. Sort animals onto an egg nest or a born-alive blanket, crack eggs to see what
   hatches, sort babies that look like their parents from ones that look very different (tadpole, caterpillar), and
   test two traps: living in water and being big. Big buttons, few words. Distinct from flagbaby (match a baby to its
   mother and name it) and flagcycle (order life-cycle stages): the new idea here is HOW the baby starts. */
(()=>{
const EGG='egg',LIVE='live';
const NEST={egg:['🥚','lays eggs'],live:['👶','born alive']};
const SORT_A=[['🐔','hen','egg'],['🐕','dog','live'],['🐊','crocodile','egg'],['🐄','cow','live']];
const SORT_W=[['🐋','whale','live'],['🐟','fish','egg'],['🐬','dolphin','live'],['🐧','penguin','egg']];
const SORT_B=[['🐘','elephant','live'],['🐞','ladybird','egg'],['🐁','mouse','live'],['🦢','swan','egg']];
const WHY={hen:'Hens are birds. All birds lay eggs.',dog:'Dogs are mammals. Puppies grow inside mum and are born.',crocodile:'Crocodiles are reptiles. They lay eggs in a nest.',cow:'Cows are mammals. A calf is born alive.',
 whale:'A whale is a mammal, not a fish. Its baby is born and drinks milk.',fish:'Most fish lay lots of eggs in the water.',dolphin:'A dolphin is a mammal. Its baby is born and drinks milk.',penguin:'A penguin is a bird. It lays an egg.',
 elephant:'Elephants are mammals. The baby is born alive.',ladybird:'Ladybirds are insects. They lay tiny eggs.',mouse:'Mice are mammals. Tiny babies are born alive.',swan:'Swans are birds, so they lay eggs.'};
// what hatches from each egg; ['emoji or TAD', name, looks like the parent?]
const EGGS=[['hen','🐥','chick'],['turtle','🐢','baby turtle'],['frog','TAD','tadpole'],['butterfly','🐛','caterpillar']];
const HATCH_OPTS=[['🐥','chick'],['🐢','baby turtle'],['TAD','tadpole'],['🐛','caterpillar']];
const LOOK=[['🐈','kitten','cat','like'],['TAD','tadpole','frog','diff'],['🐑','lamb','sheep','like'],['🐛','caterpillar','butterfly','diff']];
const BIG='min-height:56px;min-width:56px;font-size:1.1rem;padding:8px 16px;border-radius:14px';
VIS.reg('flaghatch',c=>{let A,pad,qa,turn=-1;const S={};c.fig.classList.add('young');
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['sort','hatch','look','water','size','quiz'][A.step];
const deck=()=>({sort:SORT_A,water:SORT_W,size:SORT_B})[mode()]||[];
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-10)}
// a tadpole drawn by hand: no emoji shows one
function tadpole(x,y,s){const g=A.ctx;g.fillStyle=A.col.dark?'#cbd5e1':'#1f2937';g.beginPath();g.ellipse(x-s*.15,y,s*.28,s*.22,0,0,7);g.fill();g.strokeStyle=g.fillStyle;g.lineWidth=Math.max(2,s*.08);g.beginPath();g.moveTo(x+s*.1,y);g.quadraticCurveTo(x+s*.35,y-s*.2,x+s*.55,y+s*.05);g.stroke()}
function pic(e,x,y,px){if(e==='TAD')return tadpole(x,y,px);txt(e,x,y,px)}
function reset(o){for(const k in S)delete S[k];Object.assign(S,{i:0,laid:[],e:0,cracked:false,got:[],look:0,lk:[],drag:null,msg:'',after:()=>{}},o||{});A.redraw()}
// ---------- layout ----------
const zone=k=>{const w=(A.W-30)/2;return{x:10+(k===EGG?0:w+10),y:A.H*.58,w,h:A.H*.36}};
const cardAt=()=>({x:A.W/2,y:A.H*.28});
const eggAt=()=>({x:A.W/2,y:A.H*.42});
function drawZones(g,keys,names,list){const C=A.col;keys.forEach((k,j)=>{const z=zone(j?LIVE:EGG);g.fillStyle=A.mix(C.pn,j?C.cy:C.am,C.dark?.2:.16);A.paint.rrect(z.x,z.y,z.w,z.h,18);g.fill();g.strokeStyle=C.ln;g.lineWidth=2;g.stroke();
 txt(names[j][0],z.x+z.w/2,z.y+24,A.narrow?22:26);txt(names[j][1],z.x+z.w/2,z.y+52,A.narrow?14:17,{max:z.w-8});
 list.filter(p=>p.k===k).forEach((p,n)=>pic(p.e,z.x+22+n*((z.w-30)/4),z.y+z.h-24,A.narrow?20:24))})}
function drawCard(g,e,name,d){const C=A.col,p=cardAt(),x=d?d.x:p.x,y=d?d.y:p.y;g.fillStyle=C.pn;A.paint.rrect(x-72,y-56,144,112,18);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();pic(e,x,y-10,A.narrow?44:52);txt(name,x,y+38,A.narrow?14:16,{max:138})}
function drawEgg(g){const C=A.col,p=eggAt(),r=A.narrow?46:56,it=EGGS[S.e];
S.got.forEach((h,n)=>{pic(h[1],A.W*(.14+n*.24),A.H*.84,A.narrow?26:30);txt(h[2],A.W*(.14+n*.24),A.H*.93,A.narrow?12:14,{max:A.W*.22})});if(!it)return txt('All hatched ✓',A.W/2,A.H*.42,22,{c:C.gr});
 txt(`A ${it[0]} egg`,A.W/2,A.H*.12,A.narrow?17:20);
 if(!S.cracked){g.fillStyle=it[0]==='frog'?A.mix(C.pn,'#94a3b8',.35):'#fde68a';g.beginPath();g.ellipse(p.x,p.y,r*.78,r,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  if(it[0]==='frog')for(let k=0;k<5;k++){g.fillStyle='#111827';g.beginPath();g.arc(p.x-r*.35+k*r*.18,p.y+(k%2?8:-8),4,0,7);g.fill()}
  txt('Tap the egg',p.x,p.y+r+22,A.narrow?14:16,{c:C.mu,w:600})}
 else{g.fillStyle='#fde68a';g.beginPath();g.ellipse(p.x,p.y+r*.45,r*.8,r*.5,0,0,Math.PI);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  txt('❓',p.x,p.y-6,A.narrow?40:48);txt('What came out?',p.x,p.y+r+22,A.narrow?14:16,{w:600})}}
function drawLook(g){const it=LOOK[S.look];drawZones(g,['like','diff'],[['👯','looks like mum'],['🔄','looks different']],S.lk);
 if(it){drawCard(g,it[0],it[1],S.drag);txt(`Grows into a ${it[2]}`,A.W/2,A.H*.06,A.narrow?16:19)}else txt('All sorted ✓',A.W/2,A.H*.28,22,{c:A.col.gr})}
function paint(A){const{ctx:g,W,H,col:C}=A,k=mode();if(!S.laid)return;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(k==='quiz'){txt('Eggs or born alive?',W/2,H*.42,A.narrow?18:22);txt('Answer below',W/2,H*.56,15,{c:C.mu,w:500});A.fx.draw(g);return}
 if(k==='hatch')drawEgg(g);else if(k==='look')drawLook(g);
 else{drawZones(g,[EGG,LIVE],[NEST.egg,NEST.live],S.laid);const it=deck()[S.i];if(it){drawCard(g,it[0],it[1],S.drag);txt('How does its baby start?',W/2,H*.05,A.narrow?16:19)}else txt('All sorted ✓',W/2,H*.28,22,{c:C.gr})}
 if(S.msg)line(g,S.msg,k==='hatch'?H*.7:H*.5);A.fx.draw(g)}
// feedback text, wrapped to two lines on a phone
function line(g,t,y){const px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-20&&rows[n])rows.push(w);else rows[n]=s});
 rows.slice(0,2).forEach((s,j)=>txt(s,A.W/2,y+(j-(Math.min(2,rows.length)-1)/2)*(px+3),px,{w:600}))}
// ---------- actions ----------
function feedback(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);buttons();A.redraw();S.after()}
// wrong-nest messages name the trap the child fell into
function slip(it,k){const n=it[1];
 if(it[2]===LIVE&&/whale|dolphin/.test(n))return`Not eggs. A ${n} lives in water, but it is a mammal. Its baby is born and drinks milk.`;
 if(it[2]===EGG&&n==='penguin')return'Not born alive. A penguin swims, but it is a bird. Birds lay eggs.';
 if(it[2]===EGG&&/crocodile|swan/.test(n))return`Big animals can lay eggs too. A ${n} lays eggs.`;
 if(it[2]===LIVE&&n==='mouse')return'Small animals can be born alive too. Mouse babies grow inside mum.';
 return k===EGG?`No eggs for a ${n}. Its baby grows inside mum and is born.`:`Not born alive. A ${n} lays eggs and the babies hatch.`}
function drop(k){const it=deck()[S.i];if(!it)return;
 if(k===it[2]){S.laid.push({e:it[0],k});S.i++;return feedback(`${it[1]}: ${NEST[k][1]}. ${WHY[it[1]]}`,true)}
 feedback(slip(it,k),false)}
function crack(){if(!EGGS[S.e]||S.cracked)return;S.cracked=true;A.sound.tick();feedback('Crack! What came out?')}
function guess(name){const it=EGGS[S.e];if(!it)return;if(!S.cracked)return feedback('Tap the egg first, to crack it.');
 if(name!==it[2])return feedback(it[0]==='frog'?'Not a tiny frog. A tadpole comes out first. It has a tail and no legs.':it[0]==='butterfly'?'Not a butterfly. A caterpillar comes out of a butterfly egg.':`No. A ${it[0]} egg makes a ${it[2]}.`,false);
 S.got.push(it);S.e++;S.cracked=false;feedback(it[0]==='frog'||it[0]==='butterfly'?`Yes, a ${it[2]}! It looks very different from its mum.`:`Yes, a ${it[2]}! It looks like a small ${it[0]==='hen'?'hen':'turtle'}.`,true)}
function judgeLook(k){const it=LOOK[S.look];if(!it)return;
 if(k!==it[3])return feedback(it[3]==='diff'?`Look again. A ${it[1]} has to change a lot to become a ${it[2]}.`:`A ${it[1]} looks like a small ${it[2]}. It just grows bigger.`,false);
 S.lk.push({e:it[0],k});S.look++;feedback(it[3]==='diff'?`Yes. A ${it[1]} changes into a ${it[2]}.`:`Yes. A ${it[1]} is a small ${it[2]}.`,true)}
function buttons(){if(!pad||!S.laid)return;pad.innerHTML='';const k=mode();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:BIG,'aria-label':lab||t},pad,t).onclick=f};
 if(k==='hatch'&&EGGS[S.e]){if(!S.cracked)add('🔨 Crack the egg',crack);else HATCH_OPTS.forEach(([e,n])=>add((e==='TAD'?'〰️':e)+' '+n,()=>guess(n),`A ${n} came out`))}
 if(k==='look'&&LOOK[S.look]){add('👯 looks like mum',()=>judgeLook('like'),`The ${LOOK[S.look][1]} looks like its mum`);add('🔄 looks different',()=>judgeLook('diff'),`The ${LOOK[S.look][1]} looks different from its mum`)}
 if(deck()[S.i]){const it=deck()[S.i];add('🥚 lays eggs',()=>drop(EGG),`A ${it[1]} lays eggs`);add('👶 born alive',()=>drop(LIVE),`A ${it[1]} baby is born alive`)}}
// ---------- canvas: drag the card onto a side, or tap the side; tap the egg to crack it ----------
const inZone=(p,k)=>{const z=zone(k);return p.x>z.x&&p.x<z.x+z.w&&p.y>z.y-20};
function down(p){const k=mode(),cp=cardAt();if(k==='quiz')return false;
 if(k==='hatch'){const e=eggAt();if(Math.hypot(p.x-e.x,p.y-e.y)<70){crack();return true}return false}
 const has=k==='look'?LOOK[S.look]:deck()[S.i];if(!has)return false;
 if(Math.abs(p.x-cp.x)<76&&Math.abs(p.y-cp.y)<60){S.drag={x:p.x,y:p.y};return true}
 for(const z of [EGG,LIVE])if(inZone(p,z)){k==='look'?judgeLook(z===EGG?'like':'diff'):drop(z);return true}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;A.redraw();if(!p)return;const k=mode();
 for(const z of [EGG,LIVE])if(inZone(p,z)){k==='look'?judgeLook(z===EGG?'like':'diff'):drop(z);return}}
const finish=(i,ok,say)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say()+A.reveal(i))};
function auto(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*400))}
function open(i,hint,ok,say){reset();feedback(hint);S.after=finish(i,ok,say)}
const steps=[
{h:'Eggs or born?',p:'Some baby animals hatch out of an egg. Some baby animals grow inside their mum and are born alive.',
 predict:{q:'A crocodile is big, with sharp teeth. Its babies…',opts:['are born alive','hatch from eggs','come from seeds'],ans:1},
 task:'Put each animal on the right side',show:()=>auto(0,SORT_A.map(t=>()=>drop(t[2]))),
 go:()=>open(0,'Drag the card to a side, or tap a button.',()=>S.i>=SORT_A.length,()=>'Hens and crocodiles lay eggs. Puppies and calves are born alive.')},
{h:'What hatches?',p:'Lots of animals lay eggs: birds, turtles, frogs, fish and insects. Crack each egg. What comes out?',
 predict:{q:'What comes out of a frog egg?',opts:['a tiny frog','a tadpole','a fish'],ans:1},
 task:'Crack each egg and pick the baby',show:()=>auto(1,EGGS.flatMap(t=>[crack,()=>guess(t[2])])),
 go:()=>open(1,'Tap the egg to crack it.',()=>S.e>=EGGS.length,()=>'A chick, a baby turtle, a tadpole and a caterpillar all hatched from eggs.')},
{h:'Like mum, or not?',p:'Some babies look like a small grown-up. Some look very different and change as they grow.',
 predict:{q:'A caterpillar grows up into…',opts:['a big caterpillar','a butterfly','a worm'],ans:1},
 task:'Sort the babies',show:()=>auto(2,LOOK.map(t=>()=>judgeLook(t[3]))),
 go:()=>open(2,'Does the baby look like its mum?',()=>S.look>=LOOK.length,()=>'Kittens and lambs look like small grown-ups. Tadpoles and caterpillars change a lot.')},
{h:'Water animals',p:'Living in water does not tell you. Fish lay eggs. Whales and dolphins are mammals: their babies are born and drink milk.',
 predict:{q:'A whale lives in the sea. Its baby…',opts:['hatches from an egg','is born alive','grows on a plant'],ans:1},
 task:'Sort the water animals',show:()=>auto(3,SORT_W.map(t=>()=>drop(t[2]))),
 go:()=>open(3,'Whale, fish, dolphin, penguin. Eggs or born?',()=>S.i>=SORT_W.length,()=>'Whales and dolphins are born alive. Fish and penguins come from eggs.')},
{h:'Big or small?',p:'Being big or small does not tell you either. Ask: is it a mammal, or a bird, reptile, fish or insect?',
 predict:{q:'A tiny mouse. Its babies…',opts:['hatch from tiny eggs','are born alive','are born as grown-ups'],ans:1},
 task:'Sort the big and small animals',show:()=>auto(4,SORT_B.map(t=>()=>drop(t[2]))),
 go:()=>open(4,'Elephant, ladybird, mouse, swan. Eggs or born?',()=>S.i>=SORT_B.length,()=>'Elephants and mice are born alive. Swans and ladybirds lay eggs.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['A duck. Its babies…',[['hatch from eggs','ok'],['are born alive','size'],['grow on trees','silly']]],
 ['A horse. Its baby…',[['is born alive','ok'],['hatches from an egg','egg'],['is a tadpole','look']]],
 ['A dolphin swims in the sea. Its baby…',[['is born alive','ok'],['hatches from an egg','water'],['is a fish','water']]],
 ['What comes out of a frog egg?',[['a tadpole','ok'],['a tiny frog','look'],['a chick','egg']]],
 ['A caterpillar grows into…',[['a butterfly','ok'],['a big caterpillar','look'],['a worm','look']]],
 ['A big ostrich. Its babies…',[['hatch from eggs','ok'],['are born alive','size'],['are born as grown-ups','look']]],
 ['A kitten looks…',[['like a small cat','ok'],['very different from a cat','look'],['like an egg','egg']]]];
function why(t){let m='Ask: is it a mammal? Mammal babies are born. Birds, reptiles, fish, frogs and insects lay eggs.';
 if(t==='size')m='Size does not tell you. Some big animals lay eggs, and birds always lay eggs.';
 if(t==='water')m='Living in water does not make it a fish. Dolphins and whales are mammals, so their babies are born.';
 if(t==='egg')m='Mammals do not lay eggs (only a very rare few do). Their babies grow inside mum and are born.';
 if(t==='look')m='Some babies look like their parents. Tadpoles and caterpillars look different, then change.';
 if(t==='silly')m='Only plants grow on trees. Animal babies come from eggs, or are born.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:BIG},row,v).onclick=()=>mark(t)});tell('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes!':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Answer buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
