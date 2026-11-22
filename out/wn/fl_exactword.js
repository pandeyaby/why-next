/* Flagship – words for things I see (ages 3–4; Development Matters 2021 Communication and Language; EYFS ELG
   Speaking). The child names clothes (sock and shoe are near words with their own names), says whether each
   four-legged animal is a dog (overextension: a cat is not a dog; underextension: a small dog still is), finds the
   group word that covers three things (food, toys, animals, clothes), takes a more exact word a grown-up offers
   ("Look! A robin." - and a robin is still a bird), then uses exact words to find things in a park. Every drag or tap
   has a labelled button twin. Data, pictures and text helpers in learn/exactword_art.js. */
(()=>{const {box,inside,kit,pic,name,CLO,ORDER,DOGS,SETS,GROUPS,EXACT,PARK,FIND,DESC,DONE,QS}=EXW;
VIS.reg('flagexactword',c=>{let A,T,pad,chal,qi=-1,gen=0;c.fig.classList.add('young');
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',sun:'#fef9c3',leaf:'#dcfce7',sky:'#dbeafe',rose:'#fce7f3',sand:'#ffedd5'};
const S={};const scene=()=>['clothes','dog','group','exact','park','quiz'][A.step];
const lifted=b=>S.drag?box(S.drag.x-b.w/2,S.drag.y-b.h/2,b.w,b.h):b;
/* ---------- 1: name the clothes ---------- */
const wordB=()=>box(A.W*.3,A.H*.03,A.W*.4,A.H*.12),picB=i=>box(A.W*(.05+(i%2)*.47),A.H*(.2+Math.floor(i/2)*.36),A.W*.43,A.H*.32);
function drawClothes(){T.ground(K.sand);const want=ORDER[S.i];
 if(want){const b=lifted(wordB());T.card(b,K.sun,S.drag?'sel':'');T.words(want,b.x+b.w/2,b.y+b.h/2,20,{w:b.w-10})}
 else T.words('✓ All named',A.W/2,A.H*.09,16,{c:A.col.tx});
 CLO.forEach((o,i)=>{const b=picB(i),got=S.done.includes(i),bad=S.bad===i;T.card(b,K.card,got?'ok':bad?'ko':'');
  pic(A.ctx,o.k,b.x+b.w/2,b.y+b.h*.44,Math.min(b.w,b.h)*.72);if(got||bad)T.words((got?'✓ ':'✗ ')+o.k,b.x+b.w/2,b.y+b.h*.9,12,{b:800})});
 T.tally('Named',S.done.length,CLO.length)}
function nameIt(i){const want=ORDER[S.i];if(!want||S.done.includes(i))return;const o=CLO[i];
 if(o.k!==want){S.bad=i;A.sound.miss();return tell(slip('near',o.k,want))}
 S.done.push(i);S.i++;S.bad=-1;A.sound.pop();tell(`Yes: that is a ${want}.`+(S.i<ORDER.length?` Now find the ${ORDER[S.i]}.`:''))}
/* ---------- 2: is it a dog? ---------- */
const beastB=()=>box(A.W*.26,A.H*.03,A.W*.48,A.H*.36),penB=i=>box(A.W*(.04+i*.48),A.H*.47,A.W*.44,A.H*.42);
function drawDog(){T.ground(K.leaf);const it=DOGS[S.i];
 if(it){const b=lifted(beastB());T.card(b,K.card,S.drag?'sel':'');pic(A.ctx,it.k,b.x+b.w/2,b.y+b.h*.44,Math.min(b.w,b.h)*.8);T.words(`It says "${it.say}"`,b.x+b.w/2,b.y+b.h*.9,11,{b:700})}
 else T.words('✓ All sorted',A.W/2,A.H*.2,16,{c:A.col.tx});
 ['Dog','Not a dog'].forEach((t,i)=>{const B=penB(i),bad=S.bad===i;T.card(B,K.sun,bad?'ko':'');T.words((bad?'✗ ':'')+t,B.x+B.w/2,B.y+T.px(18),14,{w:B.w-10});
  S.done.filter(d=>d.y===(i===0)).forEach((d,j)=>T.words('✓ '+d.t,B.x+B.w/2,B.y+B.h*(.28+j*.15),12,{w:B.w-12,b:700,c:i?K.ink:K.ok}))});
 T.tally('Sorted',S.done.length,DOGS.length)}
function penIt(yes){const it=DOGS[S.i];if(!it)return;
 if(it.y!==yes){S.bad=yes?0:1;A.sound.miss();return tell(slip(yes?'over':'under',it))}
 S.done.push(it);S.i++;S.bad=-1;A.sound.pop();tell(yes?`Yes, a ${it.t} is a dog.`:`Right: a ${it.t} is not a dog. It says ${it.say}.`)}
/* ---------- 3: the group word ---------- */
const trayB=()=>box(A.W*.04,A.H*.03,A.W*.92,A.H*.36),tagB=j=>box(A.W*(.06+(j%2)*.46),A.H*(.5+Math.floor(j/2)*.19),A.W*.42,A.H*.15);
function drawGroup(){T.ground(K.sky);const set=SETS[S.i],tb=trayB();T.card(tb,K.card,S.ok?'ok':'');
 if(set)set.ks.forEach((k,n)=>pic(A.ctx,k,tb.x+tb.w*(.18+n*.32),tb.y+tb.h*.45,Math.min(tb.w*.28,tb.h*.7)));
 else T.words('✓ 4 group words found',tb.x+tb.w/2,tb.y+tb.h/2,16,{c:K.ok});
 if(S.ok)T.words('✓ '+S.ok,tb.x+tb.w/2,tb.y+tb.h*.9,12,{w:tb.w-10,c:K.ok});
 GROUPS.forEach((w,j)=>{let b=tagB(j);if(S.drag&&S.drag.j===j)b=lifted(b);T.card(b,K.sun,S.bad===j?'ko':S.drag&&S.drag.j===j?'sel':'');T.words((S.bad===j?'✗ ':'')+w,b.x+b.w/2,b.y+b.h/2,17)});
 T.tally('Group words',S.i,SETS.length)}
function groupIt(j){const set=SETS[S.i];if(!set)return;const w=GROUPS[j];
 if(w!==set.w){S.bad=j;S.ok='';A.sound.miss();return tell(slip('group',w,set))}
 S.ok=`${set.ks.map(name).join(', ')}: ${set.w}. ${set.why}`;S.i++;S.bad=-1;A.sound.pop();tell(S.ok)}
/* ---------- 4: the more exact word ---------- */
const tagX=()=>box(A.W*.3,A.H*.22,A.W*.4,A.H*.11),optB=i=>box(A.W*(.03+i*.325),A.H*.4,A.W*.3,A.H*.36);
function drawExact(){T.ground(K.rose);const R=EXACT[S.i],g=A.ctx;pic(g,'gran',A.W*.12,A.H*.1,A.W*.17);
 const bub=box(A.W*.25,A.H*.03,A.W*.71,A.H*.14);T.card(bub,K.card,'');T.words(R?`"${R.say}"`:'✓ You learned 3 exact words.',bub.x+bub.w/2,bub.y+bub.h/2,14,{w:bub.w-12});
 if(!R)return T.tally('Exact words',S.i,EXACT.length);
 const tb=lifted(tagX());T.card(tb,K.sun,S.drag?'sel':'');T.words(R.want,tb.x+tb.w/2,tb.y+tb.h/2,17);
 R.ks.forEach((k,i)=>{const b=optB(i),bad=S.bad===i;T.card(b,K.card,bad?'ko':'');pic(g,k,b.x+b.w/2,b.y+b.h*.45,Math.min(b.w,b.h)*.82);if(bad)T.words('✗ '+name(k),b.x+b.w/2,b.y+b.h*.9,11)});
 if(S.ok)T.words('✓ '+S.ok,A.W/2,A.H*.85,12,{w:A.W-20,c:A.col.tx});T.tally('Exact words',S.i,EXACT.length)}
function exactIt(i){const R=EXACT[S.i];if(!R)return;const k=R.ks[i];
 if(k!==R.want){S.bad=i;S.ok='';A.sound.miss();return tell(slip('kind',name(k),R))}
 S.ok=`A ${R.want}. A ${R.want} is a ${R.kind} too.`;S.i++;S.bad=-1;A.sound.pop();tell(S.ok+(S.i<EXACT.length?' Listen for the next word.':''))}
/* ---------- 5: find it in the park ---------- */
const spot=k=>({x:A.W*PARK[k][0],y:A.H*PARK[k][1]}),rad=()=>A.W*.1;
function drawPark(){const g=A.ctx,W=A.W,H=A.H;g.fillStyle='#bfdbfe';g.fillRect(0,0,W,H*.38);g.fillStyle='#bbf7d0';g.fillRect(0,H*.38,W,H*.62);
 g.fillStyle='#93c5fd';g.beginPath();g.ellipse(W*.74,H*.55,W*.2,H*.06,0,0,7);g.fill();g.fillStyle='#d6d3d1';g.fillRect(0,H*.7,W,H*.2);
 g.fillStyle='#78350f';g.fillRect(W*.13,H*.24,W*.06,H*.2);g.fillStyle='#15803d';g.beginPath();g.arc(W*.16,H*.2,W*.13,0,7);g.fill();
 const want=FIND[S.i],pb=box(W*.05,H*.015,W*.9,H*.08);T.card(pb,K.card,S.bad&&S.bad!==-1?'ko':'');T.words(want?`Find the ${name(want)}`:'✓ You found them all',pb.x+pb.w/2,pb.y+pb.h/2,15);
 Object.keys(PARK).forEach(k=>{const p=spot(k),got=S.done.includes(k);pic(g,k,p.x,p.y,W*.19);
  if(got||S.bad===k){g.lineWidth=4;g.strokeStyle=got?K.ok:K.ko;g.beginPath();g.arc(p.x,p.y,rad(),0,7);g.stroke();const lb=box(p.x-W*.11,p.y+rad()-T.px(2),W*.22,T.px(20));T.card(lb,K.card,'');T.words((got?'✓ ':'✗ ')+name(k),p.x,lb.y+lb.h/2,11,{c:K.ink})}});
 T.words(`Found: ${S.done.length} of ${FIND.length}`,W/2,H*.955,13,{c:K.ink,b:700})}
function findIt(k){const want=FIND[S.i];if(!want||S.done.includes(k))return;
 if(k!==want){S.bad=k;A.sound.miss();return tell(slip('wrongone',name(k),want))}
 S.done.push(k);S.i++;S.bad='';A.sound.pop();tell(`Yes: the ${name(k)}.`+(S.i<FIND.length?` Now find the ${name(FIND[S.i])}.`:''))}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Look again at the picture, then try again.';
 if(t==='near')m=b?`That is a ${a}, not a ${b}. ${CLO.find(o=>o.k===b).clue}`:'A shoe and a hat are clothes too. A sock is soft and goes on your foot first.';
 if(t==='over')m=a&&a.t?`It has four legs, but it is a ${a.t}, not a dog. It says ${a.say}. Each animal has its own name.`:'Lots of animals have four legs. A cat says miaow and a dog says woof: each has its own name.';
 if(t==='under')m=`That is a dog too. It says ${a&&a.say||'woof'}. A small dog is still a dog.`;
 if(t==='group')m=b?`"${a}" does not fit all three. ${b.why} They are ${b.w}.`:'That is a word for other things. Apple, banana and bread: we eat them, so they are food.';
 if(t==='one')m=`"${a}" is only one of them. Say the one word that covers all three: food.`;
 if(t==='only')m='A robin is a bird. One thing can have two names: the group word, bird, and the exact word, robin.';
 if(t==='kind')m=`That is a ${a}. It is a ${b.kind} too, but it is not a ${b.want}. ${b.clue}`;
 if(t==='wrongone')m=b==='robin'&&/duck|owl/.test(a)?`That is a ${a}. It is a bird, but not a robin. A robin is small, with a red front.`:`That is the ${a}. Look for the ${name(b)}.`;
 if(t==='vague')m=`"${a}" could mean either one. Say the exact word, robin, so Dad finds the right bird.`;
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=scene();if(k==='quiz'){T.ground(K.sun);T.words('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});T.words('Name it · Is it a dog? · Group word · Exact word',A.W/2,A.H*.55,13,{c:A.col.tx,w:A.W-20});return}
 if(k==='clothes')drawClothes();if(k==='dog')drawDog();if(k==='group')drawGroup();if(k==='exact')drawExact();if(k==='park')drawPark();A.fx.draw(A.ctx)}
function down(p){const k=scene(),hold=o=>{S.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
 if(k==='clothes'){if(ORDER[S.i]&&inside(p,wordB()))return hold({});const i=CLO.findIndex((_,n)=>inside(p,picB(n)));if(i>=0)nameIt(i);return false}
 if(k==='dog'){if(DOGS[S.i]&&inside(p,beastB()))return hold({});for(let i=0;i<2;i++)if(inside(p,penB(i)))penIt(i===0);return false}
 if(k==='group'&&SETS[S.i]){const j=GROUPS.findIndex((_,n)=>inside(p,tagB(n)));if(j>=0)return hold({j});return false}
 if(k==='exact'&&EXACT[S.i]){if(inside(p,tagX()))return hold({});const i=[0,1,2].find(n=>inside(p,optB(n)));if(i!=null)exactIt(i);return false}
 if(k==='park'){const hit=Object.keys(PARK).find(n=>{const s=spot(n);return Math.hypot(p.x-s.x,p.y-s.y)<rad()});if(hit)findIt(hit);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=scene(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='clothes'){const i=CLO.findIndex((_,n)=>inside(p,picB(n)));return i>=0?nameIt(i):A.redraw()}
 if(k==='dog'){for(let i=0;i<2;i++)if(inside(p,penB(i)))return penIt(i===0);return A.redraw()}
 if(k==='group'){if(tap||inside(p,trayB()))return groupIt(d.j);return A.redraw()}
 if(k==='exact'){const i=[0,1,2].find(n=>inside(p,optB(n)));return i!=null?exactIt(i):A.redraw()}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='clothes'&&ORDER[S.i])CLO.forEach((o,i)=>{if(!S.done.includes(i))b(o.k,()=>nameIt(i),`Is this the ${ORDER[S.i]}? Picture of a ${o.k}`)});
 if(k==='dog'&&DOGS[S.i]){b('Dog',()=>penIt(true),`Dog: the animal that says ${DOGS[S.i].say}`);b('Not a dog',()=>penIt(false),`Not a dog: the animal that says ${DOGS[S.i].say}`)}
 if(k==='group'&&SETS[S.i])GROUPS.forEach((w,j)=>b(w,()=>groupIt(j),`Group word for ${SETS[S.i].ks.map(name).join(', ')}: ${w}`));
 if(k==='exact'&&EXACT[S.i])EXACT[S.i].ks.forEach((n,i)=>b(name(n),()=>exactIt(i),`Is this the ${EXACT[S.i].want}? Picture of a ${name(n)}`));
 if(k==='park'&&FIND[S.i])Object.keys(PARK).forEach(n=>{if(!S.done.includes(n))b(name(n),()=>findIt(n),`Tap the ${name(n)} in the park`)})}
function reset(){gen++;for(const x in S)delete S[x];Object.assign(S,{i:0,bad:-1,done:[],ok:'',drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();tell(DESC[i]);S.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Name it',p:'Getting dressed! Read the word card. Drag it onto the picture it names.',task:'Name 4 clothes',
 show:()=>demo(0,ORDER.map(w=>()=>nameIt(CLO.findIndex(o=>o.k===w))),380),go:()=>begin(0,()=>S.done.length>=CLO.length)},
{h:'Is it a dog?',p:'All of these have four legs. Which ones are dogs? Drag each animal to Dog or Not a dog.',
 predict:{q:'A cat has four legs and a tail. Is a cat a dog?',opts:['Yes, it has four legs','No, it is a cat'],ans:1},task:'Sort 6 animals',
 show:()=>demo(1,DOGS.map(()=>()=>penIt(DOGS[S.i].y)),360),go:()=>begin(1,()=>S.done.length>=DOGS.length)},
{h:'The group word',p:'One word can cover a whole group. Drag the word that fits all three pictures.',
 predict:{q:'Sock, hat, coat. Which word goes with all three?',opts:['Sock','Clothes','Food'],ans:1},task:'Find 4 group words',
 show:()=>demo(2,SETS.map(()=>()=>groupIt(GROUPS.indexOf(SETS[S.i].w))),420),go:()=>begin(2,()=>S.i>=SETS.length)},
{h:'A more exact word',p:'Gran tells you a new word. Drag it onto the picture it names.',
 predict:{q:'Gran says, "Look! A robin." Is a robin still a bird?',opts:['No, it is a robin, not a bird','Yes, a robin is a kind of bird'],ans:1},task:'Learn 3 exact words',
 show:()=>demo(3,EXACT.map(()=>()=>exactIt(EXACT[S.i].ks.indexOf(EXACT[S.i].want))),450),go:()=>begin(3,()=>S.i>=EXACT.length)},
{h:'Find it in the park',p:'There are three birds. The exact word tells you which one. Tap the thing the card names.',task:'Find 5 things',
 show:()=>demo(4,FIND.map(()=>()=>findIt(FIND[S.i])),380),go:()=>begin(4,()=>S.i>=FIND.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,list=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>check(s,t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(s,t,ans){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s,t,null):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ Yes: '+ans)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=kit(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
