/* Flagship: Living, Dead & Never Alive (ages 6–7; NC Year 2 Living things and their habitats: explore and compare the
   differences between things that are living, dead, and things that have never been alive). Sort things into alive
   now, once alive (dead) and never alive; drag made things back to where they came from (tree, sheep, rock); wait and
   watch a tree grow, a log rot and a stone stay the same; sort resting things (seeds, a bare winter tree, a sleeping
   hedgehog) and parts of animals; and check the signs of life for things that move but never lived. Big buttons and
   few words. Distinct from flagalive (two groups, alive or not, for ages 3–4): here the new idea is the third group. */
(()=>{
const G=[['alive','🌱','alive now'],['once','🍂','once alive'],['never','🪨','never alive']];
const SORT0=[['🐈','cat','alive'],['🪨','stone','never'],['🍂','dry leaf','once'],['🌻','sunflower in soil','alive']];
const SORT3=[['🌰','seed','alive','A seed is resting. Plant it and it grows.'],['BARE','bare tree in winter','alive','It is resting. New leaves grow in spring.'],['🦔','sleeping hedgehog','alive','It is asleep for the winter, not dead.'],['🦴','bone','once','It was part of an animal.'],['🐚','empty shell','once','A snail or sea animal made it.'],['🪶','feather','once','It came off a bird.']];
const SORT4=[['🌊','river','never'],['☁️','cloud','never'],['🐸','tadpole','alive']];
const SIGNS=['eats or drinks','grows','has babies'];
const FROM=[['🪑','wooden chair','tree'],['🧶','wool','sheep'],['📄','paper','tree'],['🥄','metal spoon','rock']];
const SRC={tree:['🌳','a tree','once'],sheep:['🐑','a sheep','once'],rock:['⛰️','rocks','never']};
const BIG='min-height:56px;min-width:56px;font-size:1.1rem;padding:8px 16px;border-radius:14px';
VIS.reg('flagonce',c=>{let A,pad,qa,turn=-1;const S={};c.fig.classList.add('young');
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>['sort','from','rot','rest','signs','quiz'][A.step];
const list=()=>({sort:SORT0,rest:SORT3,signs:SORT4})[now()]||[];
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-10)}
function fresh(o){for(const k in S)delete S[k];Object.assign(S,{i:0,put:[],fi:0,linked:[],month:0,ask:0,checked:{},drag:null,note:'',after:()=>{}},o||{});A.redraw()}
// an emoji, or a leafless winter tree drawn by hand (no emoji shows a bare tree on every phone)
function pic(e,x,y,px){if(e!=='BARE')return word(e,x,y,px);const g=A.ctx,h=px*.9;g.strokeStyle='#7c4a1e';g.lineCap='round';g.lineWidth=Math.max(2,px/9);g.beginPath();g.moveTo(x,y+h/2);g.lineTo(x,y-h/6);
 [[-1,.45],[1,.4],[-.6,.2],[.7,.15]].forEach(([d,t])=>{g.moveTo(x,y+h*(.5-t-.2));g.lineTo(x+d*h*.38,y-h*(t+.05))});g.stroke();g.lineCap='butt'}
// ---------- layout ----------
const hoop=j=>{const w=(A.W-24)/3;return{x:8+j*(w+4),y:A.H*.62,w,h:A.H*.3}};
const srcAt=j=>({x:A.W*(.2+.3*j),y:A.H*.66,r:A.narrow?34:42});
const card=()=>({x:A.W/2,y:A.H*.27});
function drawHoops(g){const C=A.col;G.forEach(([k,e,name],j)=>{const h=hoop(j);g.fillStyle=A.mix(C.pn,[C.gr,C.am,C.mu][j],C.dark?.18:.14);A.paint.rrect(h.x,h.y,h.w,h.h,16);g.fill();g.strokeStyle=C.ln;g.lineWidth=2;g.stroke();
 word(e,h.x+h.w/2,h.y+20,A.narrow?20:24);word(name,h.x+h.w/2,h.y+46,A.narrow?13:16,{max:h.w-8});
 S.put.filter(p=>p.g===k).forEach((p,n)=>pic(p.e,h.x+16+(n%3)*((h.w-24)/3)+8,h.y+h.h-22-Math.floor(n/3)*26,A.narrow?18:22))})}
function drawCard(g,e,name,dx,dy){const C=A.col,p=card(),x=dx==null?p.x:dx,y=dy==null?p.y:dy;g.fillStyle=C.pn;A.paint.rrect(x-70,y-56,140,112,18);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 pic(e,x,y-10,A.narrow?44:52);word(name,x,y+38,A.narrow?13:15,{max:136})}
function drawRot(g){const C=A.col,m=S.month,base=A.H*.78,xs=[.2,.5,.8].map(f=>A.W*f);g.fillStyle=A.mix(C.pn,'#a16207',C.dark?.25:.2);g.fillRect(0,base,A.W,A.H-base);
 const th=A.H*(.22+.06*m);g.fillStyle='#7c4a1e';g.fillRect(xs[0]-6,base-th,12,th);g.fillStyle='#16a34a';g.beginPath();g.arc(xs[0],base-th,26+m*6,0,7);g.fill();if(m>=3)['🍎','🍎'].forEach((a,j)=>word(a,xs[0]-14+j*28,base-th+6,16));
 const lw=A.W*.18*(1-.18*Math.max(0,m-1));g.fillStyle=A.mix('#7c4a1e','#3f2a14',m/3);A.paint.rrect(xs[1]-lw/2,base-26,lw,24,10);g.fill();if(m>=1)word('🍄'.repeat(Math.min(3,m)),xs[1],base-38,18);
 g.fillStyle=A.mix(C.mu,C.tx,.2);g.beginPath();g.ellipse(xs[2],base-14,30,16,0,0,7);g.fill();
 ['tree','log','stone'].forEach((n,j)=>word(n,xs[j],base+18,A.narrow?14:16));word(`Month ${m} of 3`,A.W/2,A.H*.13,A.narrow?15:18,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=now();if(!S.put)return;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(k==='quiz'){word('Alive, once alive or never alive?',W/2,H*.42,A.narrow?16:20);word('Answer below',W/2,H*.56,14,{c:C.mu,w:500});A.fx.draw(g);return}
 const big=A.narrow?15:18;
 if(k==='sort'||k==='rest'||k==='signs'){drawHoops(g);const it=list()[S.i];
  if(it){const d=S.drag;drawCard(g,it[0],it[1],d&&d.x,d&&d.y);word('Which group?',W/2,H*.05,big)}else word('All sorted ✓',W/2,H*.27,big+4,{c:C.gr});
  if(k==='signs'&&it)SIGNS.forEach((s,j)=>{const x=W*(.18+.32*j),y=H*.5,v=S.checked[s];g.fillStyle=C.pn;A.paint.rrect(x-W*.15,y-18,W*.3,36,12);g.fill();g.strokeStyle=C.ln;g.stroke();
   word((v==null?'❔ ':v?'✓ ':'✗ ')+s,x,y,A.narrow?12:14,{c:v==null?C.tx:v?C.gr:C.rd,max:W*.29})})}
 if(k==='from'){const it=FROM[S.fi];Object.keys(SRC).forEach((s,j)=>{const p=srcAt(j);g.fillStyle=C.pn;g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();word(SRC[s][0],p.x,p.y-4,p.r*.9);word(SRC[s][1],p.x,p.y+p.r+14,A.narrow?13:15);
   S.linked.filter(l=>l[2]===s).forEach((l,n)=>word(l[0],p.x-24+n*24,p.y+p.r+38,18))});
  if(it){const d=S.drag;drawCard(g,it[0],it[1],d&&d.x,d&&d.y);word('Where did it come from?',W/2,H*.05,big)}else word('Everything is back home ✓',W/2,H*.27,big+2,{c:C.gr})}
 if(k==='rot'){drawRot(g);word(S.month<3?'Tap Wait to jump a month':S.ask===0?'Which one grew?':S.ask===1?'Which one rotted?':'Grew, rotted, stayed the same ✓',W/2,H*.05,big,{c:S.ask>1?C.gr:C.tx})}
 if(S.note)note(g,S.note,k==='rot'?H*.22:k==='signs'?H*.585:k==='from'?H*.47:H*.52);A.fx.draw(g)}
// the feedback line, wrapped onto two lines when it is too wide for a phone
function note(g,t,y){const px=A.narrow?13:15,ls=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=ls.length-1,l=(ls[n]+' '+w).trim();if(g.measureText(l).width>A.W-20&&ls[n])ls.push(w);else ls[n]=l});
 ls.slice(0,2).forEach((l,j)=>word(l,A.W/2,y+(j-(Math.min(2,ls.length)-1)/2)*(px+3),px,{c:A.col.tx,w:600}))}
// ---------- actions ----------
function say(t,good){S.note=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(t);pick();A.redraw();S.after()}
const why={alive:'It can eat or drink, grow and have babies.',once:'It was part of something alive.',never:'It never ate, grew or had babies.'};
// put the current card in group g, and say why if it is the wrong group
function sortTo(g){const it=list()[S.i];if(!it)return;const name=G.find(x=>x[0]===g)[2];
 if(g===it[2]){S.put.push({e:it[0],g});S.i++;S.checked={};return say(`${it[1]}: ${name}. ${it[3]||why[g]}`,true)}
 const tip=it[2]==='alive'?(g==='once'?'It is not dead. It is resting or growing.':'It is alive. It can grow.'):it[2]==='once'?(g==='never'?'It came from something that was alive.':'It cannot grow any more.'):(g==='alive'?'It may move, but it does not eat, grow or have babies.':'It never lived, so it cannot be dead.');
 say(`Not ${name}. ${tip}`,false)}
function link(s){const it=FROM[S.fi];if(!it)return;
 if(s!==it[2])return say(it[2]==='rock'?'Metal comes from rocks in the ground.':`No. ${it[1]} comes from ${SRC[it[2]][1]}.`,false);
 S.linked.push(it);S.fi++;const[e,who,g]=SRC[s];say(g==='once'?`Yes! ${it[1]} came from ${who}. ${who[0].toUpperCase()+who.slice(1)} was alive, so it is once alive.`:`Yes! The metal came from rocks. Rocks were never alive.`,true)}
function wait(){if(S.month>=3)return;S.month++;A.sound.tick();say(['','The log has mushrooms. The tree has new leaves.','The log is going soft. The tree is taller.','The log is crumbling into soil. The tree has apples. The stone? The same.'][S.month],true)}
function answer(n){if(S.month<3)return say('Wait first, to see what changes.');
 const want=['tree','log'][S.ask];if(!want)return;if(n===want){S.ask++;return say(n==='tree'?'Yes. Living things grow.':'Yes. Once-living things rot. The stone never rots.',true)}
 say(n==='stone'?'The stone did not change at all.':S.ask===0?'The log got smaller. It did not grow.':'The tree grew. It is alive.',false)}
function check(s){const it=list()[S.i];if(!it||now()!=='signs')return;S.checked[s]=it[2]==='alive';A.sound.tick();say(`${it[1]}: ${s}? ${it[2]==='alive'?'Yes.':'No.'}`)}
function pick(){if(!pad||!S.put)return;pad.innerHTML='';const k=now();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:BIG,'aria-label':lab||t},pad,t).onclick=f};
 if((k==='sort'||k==='rest'||k==='signs')&&list()[S.i]){const it=list()[S.i];if(k==='signs')SIGNS.forEach(s=>add('❔ '+s,()=>check(s),`Does the ${it[1]} ${s.replace('has','have').replace('eats or drinks','eat or drink').replace('grows','grow')}?`));
  G.forEach(([g,e,name])=>add(`${e} ${name}`,()=>sortTo(g),`The ${it[1]} is ${name}`))}
 if(k==='from'&&FROM[S.fi])Object.keys(SRC).forEach(s=>add(`${SRC[s][0]} ${SRC[s][1]}`,()=>link(s),`The ${FROM[S.fi][1]} came from ${SRC[s][1]}`));
 if(k==='rot'){if(S.month<3)add('⏩ Wait a month',wait);else if(S.ask<2)['tree','log','stone'].forEach(n=>add(n,()=>answer(n),`The ${n}`))}}
// ---------- canvas: drag the card to a group or a source; tap a sign or an object ----------
function down(p){const k=now();if(k==='quiz')return false;const cp=card();
 if((k==='sort'||k==='rest'||k==='signs'||k==='from')&&Math.abs(p.x-cp.x)<75&&Math.abs(p.y-cp.y)<60&&(k==='from'?FROM[S.fi]:list()[S.i])){S.drag={x:p.x,y:p.y};return true}
 if(k==='signs'){const j=SIGNS.findIndex((s,j)=>Math.abs(p.x-A.W*(.18+.32*j))<A.W*.15&&Math.abs(p.y-A.H*.5)<20);if(j>=0){check(SIGNS[j]);return true}}
 if((k==='sort'||k==='rest'||k==='signs')){const j=[0,1,2].find(j=>{const h=hoop(j);return p.x>h.x&&p.x<h.x+h.w&&p.y>h.y});if(j!=null){sortTo(G[j][0]);return true}}
 if(k==='rot'){const j=[.2,.5,.8].findIndex(f=>Math.abs(p.x-A.W*f)<A.W*.14&&p.y>A.H*.3);if(j>=0){S.month<3?wait():answer(['tree','log','stone'][j]);return true}}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;const k=now();A.redraw();if(!p)return;
 if(k==='from'){const j=Object.keys(SRC).findIndex((s,j)=>{const q=srcAt(j);return Math.hypot(p.x-q.x,p.y-q.y)<q.r+24});if(j>=0)link(Object.keys(SRC)[j]);return}
 const j=[0,1,2].find(j=>{const h=hoop(j);return p.x>h.x&&p.x<h.x+h.w&&p.y>h.y-20});if(j!=null)sortTo(G[j][0])}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*400))}
function begin(i,hint,ok,line){fresh();say(hint);S.after=when(i,ok,line)}
const steps=[
{h:'Three groups',p:'Some things are alive now. Some were alive once, but are dead now. Some were never alive at all.',
 predict:{q:'A brown leaf fell off a tree. It is…',opts:['alive now','once alive','never alive'],ans:1},
 task:'Put each thing in its group',show:()=>run(0,SORT0.map(t=>()=>sortTo(t[2]))),
 go:()=>begin(0,'Drag the card to a group, or tap a button.',()=>S.i>=SORT0.length,()=>'Cat and sunflower are alive. The leaf was alive once. The stone never was.')},
{h:'Where did it come from?',p:'Some things are made from something that was alive. Wood comes from trees. Wool comes from sheep.',
 predict:{q:'A wooden chair. Was it ever alive?',opts:['no, it is a chair','yes, the wood came from a tree','it is alive now'],ans:1},
 task:'Drag each thing to where it came from',show:()=>run(1,FROM.map(t=>()=>link(t[2]))),
 go:()=>begin(1,'Drag the card to a tree, a sheep or rocks.',()=>S.fi>=FROM.length,()=>'Chair, paper and wool were once alive. The metal spoon was never alive.')},
{h:'Rot or grow?',p:'Watch a tree, a log and a stone for three months. Living things grow. Dead things rot. Things that were never alive do neither.',
 predict:{q:'Which one will rot?',opts:['the stone','the log','the tree'],ans:1},
 task:'Wait three months, then find what grew and what rotted',show:()=>run(2,[wait,wait,wait,()=>answer('tree'),()=>answer('log')]),
 go:()=>begin(2,'Tap Wait to jump a month.',()=>S.ask>=2,()=>'The tree grew, the log rotted, and the stone stayed the same.')},
{h:'Resting, not dead',p:'Some living things rest. A seed waits to grow. A tree drops its leaves in winter. A hedgehog sleeps. They are still alive.',
 predict:{q:'A tree with no leaves in winter is…',opts:['dead','alive, resting','never alive'],ans:1},
 task:'Sort the tricky ones',show:()=>run(3,SORT3.map(t=>()=>sortTo(t[2]))),
 go:()=>begin(3,'Seed, bare tree, hedgehog, bone, shell, feather. Which group?',()=>S.i>=SORT3.length,()=>'Resting things are alive. Bones, shells and feathers come from animals, so they were once alive.')},
{h:'Moving is not living',p:'A river moves. A cloud moves. But do they eat, grow and have babies? Check the signs of life.',
 predict:{q:'A river moves and makes a noise. Is it alive?',opts:['yes, it moves','no, it was never alive','it was once alive'],ans:1},
 task:'Check the signs, then sort each one',show:()=>run(4,SORT4.flatMap(t=>[()=>check(SIGNS[0]),()=>sortTo(t[2])])),
 go:()=>begin(4,'Tap a sign to check it. Then pick a group.',()=>S.i>=SORT4.length,()=>'The river and the cloud move, but never lived. The tadpole eats, grows and will have babies.')},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['A wooden table is…',[['once alive','ok'],['never alive','made'],['alive now','now']]],
 ['A stone is…',[['never alive','ok'],['once alive','once'],['alive now','move']]],
 ['A seed in a packet is…',[['alive, resting','ok'],['never alive','still'],['dead','still']]],
 ['A wool hat came from a sheep. It is…',[['once alive','ok'],['never alive','made'],['alive now','now']]],
 ['A cloud moves in the sky. It is…',[['never alive','ok'],['alive now','move'],['once alive','once']]],
 ['A tree with no leaves in winter is…',[['alive','ok'],['dead','still'],['never alive','still']]],
 ['What happens to an old log over a long time?',[['it rots','ok'],['it grows leaves','now'],['nothing at all','rot']]]];
function tell(t){let m='Ask: is it alive now, was it alive once, or was it never alive?';
 if(t==='made')m='People made it, but from wood or wool. That came from something alive.';
 if(t==='now')m='It cannot grow or eat any more. It was alive once.';
 if(t==='once')m='It never came from a plant or an animal. It was never alive.';
 if(t==='move')m='Moving is not enough. It does not eat, grow or have babies.';
 if(t==='still')m='Being still is not being dead. It is resting and can grow again.';
 if(t==='rot')m='Dead things that were once alive rot away, slowly.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:BIG},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes!':'✗ '+tell(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;pick()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sorting buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pick()}});
A.start()})})();
