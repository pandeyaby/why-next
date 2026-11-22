/* Flagship – when I feel left out (ages 6–7; PSHE Association KS1 relationships, DfE Relationships Education and
   Health Education 2019: friendships have ups and downs, loneliness is worth talking to an adult about). Scenes:
   name Mia's feeling in her thought cloud; pick the next steps that help (hurting back, mean words and hiding are
   refused with what would happen); find the children on their own on the playground map; sort what happened into
   just once or keeps happening (tell a grown-up); then build your own three-line plan. Every drag or tap has a
   labelled button twin. Data and drawings in learn/leftout_art.js. */
(()=>{const {box,inside,brush,FEEL,STEP,SPOT,TALE,LINE,CHIP,INTRO,WELL,QS,child,heart,cloud,bench,tree,grownup}=LOUT;
VIS.reg('flagleftout',c=>{let A,B,pad,chal,qi=-1,gen=0;
const C={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#eff6ff',once:'#fef9c3',tell:'#ccfbf1',chip:'#e0e7ff',head:'#1e3a8a',grass:'#dcfce7'};
const M={};const room=()=>['feel','next','look','tell','plan','quiz'][A.step];
const zone=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
/* ---------- where things sit ---------- */
const thought=()=>zone(.3,.07,.67,.31),wordCard=j=>B.grid(FEEL.length,A.narrow?2:3,zone(.03,.44,.94,.42))[j];
const helps=()=>zone(.3,.07,.67,.31),stepCard=j=>B.grid(STEP.length,A.narrow?2:3,zone(.03,.44,.94,.42))[j];
const map=()=>zone(.03,.08,.94,.8),spotBox=j=>{const s=SPOT[j],r=Math.min(A.W*.2,A.H*.16);return box(A.W*(.03+.94*s.x)-r,A.H*(.08+.8*s.y)-r*.8,r*2,r*1.6)};
const miaHome=()=>({x:A.W*.5,y:A.H*.8});
const taleCard=j=>B.grid(TALE.length,A.narrow?2:3,zone(.03,.08,.94,.5))[j],tray=k=>zone(.03+k*.485,.63,.455,.26);
const line=k=>zone(.03,.07+k*.12,.94,.105),chipBox=j=>B.grid(CHIP.length,A.narrow?2:5,zone(.03,.46,.94,.42),6)[j];
const title=t=>B.say(t,A.W/2,A.H*.035,12,{c:C.head,w:A.W-20});
const foot=(t,ok)=>B.say(t,A.W/2,A.H*.945,12,{b:700,c:ok?C.ok:C.ink,w:A.W-20});
const carry=(i,b)=>M.hold&&M.hold.i===i?box(M.hold.x-b.w/2,M.hold.y-b.h/2,b.w,b.h):b;
/* ---------- 1: name the feeling ---------- */
function drawFeel(){const g=A.ctx,n=M.words.length;title('How does Mia feel?');child(g,A.W*.15,A.H*.2,Math.min(A.W*.2,A.H*.24),'#be185d',n>=3?0:-1);B.say('Mia',A.W*.15,A.H*.36,11);
 const b=thought();cloud(g,b);B.tile(box(b.x+b.w*.12,b.y+b.h*.12,b.w*.76,b.h*.76),'#ffffff',M.over?'sel':'');
 B.say(n?M.words.map(j=>FEEL[j].t).join(' · '):'Mia feels …',b.x+b.w/2,b.y+b.h/2,13,{w:b.w*.7});
 FEEL.forEach((o,j)=>{if(M.words.includes(j))return;const q=carry(j,wordCard(j));B.tile(q,'#ffffff',M.bad===j?'ko':M.hold&&M.hold.i===j?'sel':'');B.say(o.t,q.x+q.w/2,q.y+q.h/2,13,{w:q.w-12})});
 foot(n>=3?'✓ Left out, lonely and sad':`Feeling words: ${n} of 3`,n>=3)}
function name(j){if(M.words.includes(j)||M.words.length>=3)return;const o=FEEL[j];if(!o.ok){M.bad=j;A.sound.miss();return note(slip(o.s))}
 M.bad=-1;M.words.push(j);A.sound.pop();note(`${o.t}: yes, that fits.`+(M.words.length<3?' Find another word.':' Naming the feeling is the first step.'))}
/* ---------- 2: what helps? ---------- */
function drawNext(){const g=A.ctx,n=M.tried.length;title('What can Mia do next?');child(g,A.W*.15,A.H*.17,Math.min(A.W*.2,A.H*.22),'#be185d',n>=3?1:-1);heart(g,A.W*.15,A.H*.33,Math.min(A.W*.05,A.H*.045),n/3);
 const b=helps();B.tile(b,C.grass,M.over?'sel':'');B.say('Helps',b.x+b.w/2,b.y+b.h*.16,12,{c:C.ok});
 M.tried.forEach((j,r)=>B.say('✓ '+STEP[j].sh,b.x+b.w/2,b.y+b.h*(.4+r*.2),11,{b:700,w:b.w-12}));
 STEP.forEach((o,j)=>{if(M.tried.includes(j))return;const q=carry(j,stepCard(j));B.tile(q,'#ffffff',M.bad===j?'ko':M.hold&&M.hold.i===j?'sel':'');B.say(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 foot(n>=3?'✓ 3 steps that help':`Steps that help: ${n} of 3`,n>=3)}
function tryStep(j){if(M.tried.includes(j)||M.tried.length>=3)return;const o=STEP[j];if(!o.ok){M.bad=j;A.sound.miss();return note(slip(o.s))}
 M.bad=-1;M.tried.push(j);A.sound.pop();note(`${o.sh}: that helps. Mia’s heart feels a bit better.`+(M.tried.length<3?' Find another.':''))}
/* ---------- 3: who is on their own? ---------- */
function drawLook(){const g=A.ctx,m=map(),n=M.met.length;title('Who is on their own?');B.tile(m,C.grass,'');
 SPOT.forEach((s,j)=>{const b=spotBox(j),cx=b.x+b.w/2,cy=b.y+b.h*.45,sz=Math.min(b.w*.4,b.h*.56),met=M.met.includes(j);
  if(j===2)bench(g,cx,cy,sz);if(j===3)tree(g,cx+sz*.45,cy,sz);
  for(let k=0;k<s.k;k++)child(g,cx+(k-(s.k-1)/2)*sz*.62,cy,sz,['#1d4ed8','#7c3aed','#c2410c'][k],s.ok?(met?1:-1):1);
  if(met)child(g,cx+sz*.62,cy,sz,'#be185d',1);
  B.tile(box(b.x+4,b.y+b.h*.78,b.w-8,b.h*.24),M.bad===j?'#fee2e2':'#ffffff',M.bad===j?'ko':met?'ok':M.aim===j?'sel':'');B.say(s.n,cx,b.y+b.h*.9,10,{w:b.w-12})});
 if(n<2){const p=M.hold?{x:M.hold.x,y:M.hold.y}:miaHome(),s=Math.min(A.W*.13,A.H*.1);child(g,p.x,p.y,s,'#be185d',-1);B.say('Mia',p.x,p.y+s*.62,10)}
 foot(n>=2?'✓ Mia found Ben and Lily':`Found: ${n} of 2`,n>=2)}
function visit(j){if(M.met.includes(j)||M.met.length>=2)return;const s=SPOT[j];if(!s.ok){M.bad=j;A.sound.miss();return note(slip(s.s))}
 M.bad=-1;M.met.push(j);A.sound.pop();note(`${s.n} is on ${s.w}. Mia asks, “Do you want to play?” ${s.n} says yes!`+(M.met.length<2?' Is anyone else alone?':''))}
/* ---------- 4: once, or keeps happening? ---------- */
function drawTell(){const g=A.ctx,n=Object.keys(M.sorted).length;title('Just once, or keeps happening?');
 [0,1].forEach(k=>{const b=tray(k);B.tile(b,k?C.tell:C.once,M.hot===k?'sel':'');if(k)grownup(g,b.x+b.w*.12,b.y+b.h*.42,Math.min(b.w*.2,b.h*.42));
  B.say(k?'Keeps happening: tell a grown-up':'Just once: try a step',b.x+b.w*(k?.58:.5),b.y+b.h*.24,11,{w:b.w*(k?.74:.9)});
  const got=TALE.map((o,i)=>M.sorted[i]===k?o.sh:null).filter(Boolean);B.say(got.length?got.join(', '):'…',b.x+b.w*(k?.58:.5),b.y+b.h*.7,10,{b:700,w:b.w*(k?.74:.9)})});
 TALE.forEach((o,i)=>{if(i in M.sorted)return;const q=carry(i,taleCard(i));B.tile(q,'#ffffff',M.bad===i?'ko':(M.aim===i||(M.hold&&M.hold.i===i))?'sel':'');B.say(o.t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-12})});
 foot(n>=6?'✓ All 6 sorted':`Sorted: ${n} of 6`,n>=6)}
function sortTale(i,k){if(i in M.sorted)return;M.aim=-1;if(TALE[i].k!==k){M.bad=i;A.sound.miss();return note(slip(k?'once':'again'))}
 M.bad=-1;M.sorted[i]=k;A.sound.pop();note(k?`${TALE[i].sh}: this keeps happening or is on purpose. Mia tells a grown-up.`:`${TALE[i].sh}: just once. Mia can try a step, like asking again later.`)}
/* ---------- 5: my plan ---------- */
function drawPlan(){const g=A.ctx,n=M.lines.filter(v=>v!=null).length;title(n>=3?'My plan':'Make your plan');
 LINE.forEach((t,k)=>{const b=line(k),v=M.lines[k];B.tile(b,v!=null?C.tell:'#ffffff',M.hot===k?'sel':v!=null?'ok':'');B.say(t.replace('…',v!=null?CHIP[v].t+'.':'…'),b.x+b.w/2,b.y+b.h/2,12,{w:b.w-16})});
 if(n>=3){heart(g,A.W*.5,A.H*.62,Math.min(A.W*.08,A.H*.07),1);B.say('You know what to do.',A.W/2,A.H*.76,14,{c:C.ok})}
 else CHIP.forEach((o,j)=>{if(M.lines.includes(j))return;const q=carry(j,chipBox(j));B.tile(q,C.chip,M.bad===j?'ko':(M.aim===j||(M.hold&&M.hold.i===j))?'sel':'');B.say(o.t,q.x+q.w/2,q.y+q.h/2,10,{w:q.w-8})});
 foot(n>=3?'✓ Your plan is ready':`Lines filled: ${n} of 3`,n>=3)}
function place(j,k){if(M.lines.includes(j))return;const o=CHIP[j];M.aim=-1;if(o.s){M.bad=j;A.sound.miss();return note(slip(o.s))}
 if(k==null)k=o.k;if(o.k!==k){M.bad=j;A.sound.miss();return note(`“${o.t}” goes on the line “${LINE[o.k]}”.`)}
 if(M.lines[k]!=null){A.sound.miss();return note('That line is done. Fill the next one.')}
 M.bad=-1;M.lines[k]=j;A.sound.pop();note(LINE[k].replace('…',o.t+'.')+(M.lines.filter(v=>v!=null).length>=3?' Your plan is ready.':''))}
/* ---------- each slip, named ---------- */
function slip(t){let m='Look at Mia again: head down, on her own. Which words fit?';
 if(t==='proud')m='Proud is for when you did something well. Mia is on her own and her head is down.';
 if(t==='excited')m='Excited is a happy, fizzy feeling. Mia is sitting alone, watching. That is not excited.';
 if(t==='sleepy')m='Mia is not tired. She feels this because her friends are playing without her.';
 if(t==='hurt')m='Hurting back makes them cross, and then Mia is in trouble too. It will not get her into the game.';
 if(t==='hide')m='Pretending you don’t care keeps the sore feeling inside. It is OK to show it and get help.';
 if(t==='mean')m='Mean words hurt them back. Then nobody feels good, and it is harder to play together later.';
 if(t==='full')m='Mia already asked, and this game is full today. Look for someone who is on their own.';
 if(t==='pair')m='Kai and Isla are playing a clapping game for two. Look for someone who is on their own.';
 if(t==='once')m='This happened just once. Mia can try a step first, like asking again later. She can still tell a grown-up how she feels.';
 if(t==='again')m='This keeps happening, or it is on purpose. That is when Mia should tell a grown-up.';
 if(t==='nobody')m='Telling nobody keeps it a secret. Pick a grown-up you can talk to.';
 if(t==='stare')m='Staring until they give in is not asking. If the game is full, find someone else.';
 if(t==='secret')m='When it happens every day, it is not a thing to keep secret. Tell a grown-up.';
 if(t==='baby')m='Everyone can feel sad when they are left out, even grown-ups. It is a real feeling.';
 if(t==='over')m='Friends can play with other people too. It does not mean the friendship is over.';
 if(t==='pass')m='Sam may feel left out too. Asking him to play can help you both.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=room(),g=A.ctx;g.fillStyle=C.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){heart(g,A.W*.5,A.H*.38,A.H*.13,1);B.say('Challenge',A.W/2,A.H*.72,20);return}
 ({feel:drawFeel,next:drawNext,look:drawLook,tell:drawTell,plan:drawPlan})[k]();A.fx.draw(g)}
function down(p){const k=room(),grab=i=>{M.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='feel'&&M.words.length<3){const j=FEEL.findIndex((_,x)=>!M.words.includes(x)&&inside(p,wordCard(x)));if(j>=0)return grab(j)}
 if(k==='next'&&M.tried.length<3){const j=STEP.findIndex((_,x)=>!M.tried.includes(x)&&inside(p,stepCard(x)));if(j>=0)return grab(j)}
 if(k==='look'&&M.met.length<2){const h=miaHome(),r=Math.min(A.W*.13,A.H*.1);if(Math.hypot(p.x-h.x,p.y-h.y)<r)return grab(-1);const j=SPOT.findIndex((_,x)=>inside(p,spotBox(x)));if(j>=0)visit(j)}
 if(k==='tell'){const i=TALE.findIndex((_,x)=>!(x in M.sorted)&&inside(p,taleCard(x)));if(i>=0)return grab(i);const z=[0,1].find(x=>inside(p,tray(x)));if(z!=null&&M.aim>=0)sortTale(M.aim,z)}
 if(k==='plan'&&M.lines.filter(v=>v!=null).length<3){const j=CHIP.findIndex((_,x)=>!M.lines.includes(x)&&inside(p,chipBox(x)));if(j>=0)return grab(j);const z=[0,1,2].find(x=>inside(p,line(x)));if(z!=null&&M.aim>=0)place(M.aim,z)}
 return false}
function move(p){const h=M.hold;if(!h)return;h.x=p.x;h.y=p.y;const k=room();
 if(k==='feel')M.over=inside(p,thought());if(k==='next')M.over=inside(p,helps());if(k==='tell')M.hot=[0,1].find(j=>inside(p,tray(j)));
 if(k==='look')M.aim=SPOT.findIndex((_,j)=>inside(p,spotBox(j)));if(k==='plan')M.hot=[0,1,2].find(j=>inside(p,line(j)));A.redraw()}
function up(p){const h=M.hold;if(!h)return;M.hold=null;M.hot=undefined;M.over=false;const k=room(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='feel'&&(tap||inside(p,thought())))return name(h.i);
 if(k==='next'&&(tap||inside(p,helps())))return tryStep(h.i);
 if(k==='look'){M.aim=-1;const j=SPOT.findIndex((_,x)=>inside(p,spotBox(x)));if(j>=0)return visit(j);if(tap)return note('Drag Mia to a child, or tap a child on the map.')}
 if(k==='tell'){const z=[0,1].find(j=>inside(p,tray(j)));if(z!=null)return sortTale(h.i,z);if(tap){M.aim=h.i;return note(`“${TALE[h.i].t}” picked. Now tap Just once or Keeps happening.`)}}
 if(k==='plan'){const z=[0,1,2].find(j=>inside(p,line(j)));if(z!=null)return place(h.i,z);if(tap)return place(h.i)}
 A.redraw()}
function note(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.check()}
function twins(){if(!pad)return;pad.innerHTML='';const k=room(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='feel'&&M.words.length<3)FEEL.forEach((o,j)=>{if(!M.words.includes(j))btn(o.t,()=>name(j),`Mia feels ${o.t.toLowerCase()}`)});
 if(k==='next'&&M.tried.length<3)STEP.forEach((o,j)=>{if(!M.tried.includes(j))btn(o.t,()=>tryStep(j),`Mia could: ${o.t}`)});
 if(k==='look'&&M.met.length<2)SPOT.forEach((s,j)=>{if(!M.met.includes(j))btn(`Go to ${s.n}`,()=>visit(j),`Take Mia to ${s.n}`)});
 if(k==='tell')TALE.forEach((o,i)=>{if(i in M.sorted)return;btn(`Once: ${o.sh}`,()=>sortTale(i,0),`“${o.t}”: just once`);btn(`Keeps happening: ${o.sh}`,()=>sortTale(i,1),`“${o.t}”: keeps happening, tell a grown-up`)});
 if(k==='plan'&&M.lines.filter(v=>v!=null).length<3)CHIP.forEach((o,j)=>{if(!M.lines.includes(j))btn(o.t,()=>place(j),`Add to my plan: ${o.t}`)})}
function reset(){gen++;for(const x in M)delete M[x];Object.assign(M,{words:[],tried:[],met:[],sorted:{},lines:[null,null,null],bad:-1,aim:-1,hold:null,over:false,check:()=>{}})}
const ready=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(WELL[i]+A.reveal(i))};
function begin(i,ok){reset();note(INTRO[i]);M.check=ready(i,ok)}
function demo(i,acts,ms){steps[i].go();const e=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e===gen)f()},ms*(j+1)))}
const steps=[
{h:'Name the feeling',p:'Mia’s friends are playing a game without her. She sits on her own with her head down. Which words fit how she feels?',
 predict:{q:'Mia says, “I don’t care.” Does that mean she feels fine?',opts:['Yes, she feels fine','Maybe not: she may be hiding a sore feeling'],ans:1},task:'Put 3 feeling words in Mia’s cloud',
 show:()=>demo(0,[0,2,4].map(j=>()=>name(j)),600),go:()=>begin(0,()=>M.words.length>=3)},
{h:'What helps?',p:'Mia feels left out. Some next steps help. Some make it worse. Drag the steps that help into the Helps box.',
 predict:{q:'If Mia knocks their tower down, will they want to play with her?',opts:['Yes, then they will see her','No, it will make it worse'],ans:1},task:'Find 3 steps that help',
 show:()=>demo(1,[0,2,4].map(j=>()=>tryStep(j)),700),go:()=>begin(1,()=>M.tried.length>=3)},
{h:'Look around',p:'Mia asked to join, but the game is full today. Is anyone else on their own? Drag Mia to them.',task:'Find the 2 children on their own',
 show:()=>demo(2,[()=>visit(2),()=>visit(3)],900),go:()=>begin(2,()=>M.met.length>=2)},
{h:'Tell a grown-up',p:'Once is a time to try a step. If it keeps happening, or someone does it on purpose, tell a grown-up. You can always tell a grown-up how you feel.',
 predict:{q:'Jo says “Nobody play with Mia” every day. Should Mia keep it to herself?',opts:['Yes, it is only a game','No, she should tell a grown-up'],ans:1},task:'Sort all 6',
 show:()=>demo(3,TALE.map((o,i)=>()=>sortTale(i,o.k)),500),go:()=>begin(3,()=>Object.keys(M.sorted).length>=6)},
{h:'My plan',p:'Your turn. What could you say and do next time you feel left out? Put a chip on each line.',task:'Fill all 3 lines of your plan',
 show:()=>demo(4,[0,1,2].map(j=>()=>place(j)),800),go:()=>begin(4,()=>M.lines.every(v=>v!=null))},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,order=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+Q.a+(/[.”!?]$/.test(Q.a)?'':'.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;twins()},
 init:X=>{A=X;B=brush(A,C);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Left out lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});twins()}}).start()})})();
