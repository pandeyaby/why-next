/* Flagship – I do, we do, you do (ages 6–8; the gradual release of responsibility, Pearson and Gallagher 1983;
   Rosenshine 2012). The learner meets the three rounds by living them on one skill, drawing a cat from four shapes:
   watch a grown-up model each step and name the step after the head (I do), share the steps turn by turn and find that
   "you do it for me" is refused (we do), then draw a whole cat alone with a hint that only opens after a real go
   (you do). Last they sort everyday scenes into the three rounds and put the rounds in order (skipping straight to
   "you do" is refused). Every drag or tap has a labelled button twin. Data and drawings in learn/ido_art.js. */
(()=>{const {cat,person,PARTS,TURN,ROUND,SCENES,RJOB,DESC,DONE,QS}=IDO;
VIS.reg('flagido',c=>{let A,row,quiz,ask=-1,epoch=0;c.fig.classList.add('young');
const C={ink:'#1f2937',good:'#047857',bad:'#b91c1c',line:'#94a3b8',hold:'#1d4ed8',paper:'#ffffff',lemon:'#fef9c3',mint:'#dcfce7',ice:'#e0f2fe',lilac:'#ede9fe',peach:'#ffedd5'};
const G={};const where=()=>['watch','share','solo','rounds','order','quiz'][A.step];
const sz=n=>Math.round(A.narrow?n:n*1.15);
const R=(x,y,w,h)=>({x,y,w,h}),hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* text centred on (x,y); breaks into lines no wider than o.w */
function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign='center';g.textBaseline='middle';
 const out=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&cur&&g.measureText(t).width>o.w){out.push(cur);cur=w}else cur=t});out.push(cur);
 const step=sz(n)*1.22;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*step))}
/* a rounded panel; good and bad also carry ✓ or ✗ in their words */
function panel(r,bg,tone){const g=A.ctx;g.fillStyle=tone==='good'?'#d1fae5':tone==='bad'?'#fee2e2':bg||C.paper;A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();
 g.lineWidth=tone?4:2;g.strokeStyle={good:C.good,bad:C.bad,hold:C.hold}[tone]||C.line;g.stroke()}
function backdrop(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function count(t,n,of){say(`${t}: ${n} of ${of}`,A.W/2,A.H*.955,13,{c:A.col.tx,b:700})}
/* ---------- the paper and the tray of shapes ---------- */
const paperR=()=>R(A.W*.3,A.H*.05,A.W*.66,A.H*.56),trayR=(i,n)=>{const w=(A.W-10*(n+1))/n;return R(10+i*(w+10),A.H*.7,w,A.H*.17)};
function drawPaper(upto,ghost){const p=paperR(),g=A.ctx;panel(p,C.paper,'');const s=Math.min(p.w,p.h)*.95,cx=p.x+p.w/2,cy=p.y+p.h*.56;
 for(let i=0;i<upto;i++)cat(g,PARTS[i].k,cx,cy,s,false);if(ghost&&upto<PARTS.length)cat(g,PARTS[upto].k,cx,cy,s,true)}
function drawTray(list){list.forEach((k,i)=>{let r=trayR(i,list.length);const held=G.drag&&G.drag.i===i;if(held)r=R(G.drag.x-r.w/2,G.drag.y-r.h/2,r.w,r.h);
 panel(r,C.lemon,G.bad===k?'bad':held?'hold':'');const s=Math.min(r.w,r.h*1.3)*.9,P=PARTS[k];
 cat(A.ctx,P.k,r.x+r.w/2,r.y+r.h*(P.k==='ears'?.75:P.k==='head'?.42:P.k==='whisk'?.36:.5),P.k==='head'?s*.7:s,false);
 say((G.bad===k?'✗ ':'')+P.n,r.x+r.w/2,r.y+r.h*.88,10,{w:r.w-6,b:700})})}
/* ---------- 1. I do: watch the model ---------- */
const quizR=i=>R(A.W*(.03+i*.325),A.H*.72,A.W*.3,A.H*.15);
function drawWatch(){backdrop(C.ice);const g=A.ctx;person(g,A.W*.14,A.H*.36,A.W*.22,true);say('Grown-up',A.W*.14,A.H*.53,11,{c:A.col.tx,b:700});
 drawPaper(G.seen,false);if(G.seen<PARTS.length){const b=R(A.W*.04,A.H*.66,A.W*.92,A.H*.2);panel(b,C.paper,'');say('Grown-up: '+(G.seen?PARTS[G.seen-1].say:'Watch me draw a cat.'),b.x+b.w/2,b.y+b.h/2,13,{w:b.w-16,b:700})}
 if(G.seen>=PARTS.length){say('What came after the head?',A.W/2,A.H*.66,13,{c:A.col.tx,w:A.W-20});[2,1,3].forEach((k,i)=>{const r=quizR(i);panel(r,C.lemon,G.named&&k===1?'good':G.bad===k?'bad':'');
  say((G.named&&k===1?'✓ ':G.bad===k?'✗ ':'')+PARTS[k].n,r.x+r.w/2,r.y+r.h/2,12,{w:r.w-8})})}
 count('Steps watched',G.seen,PARTS.length)}
function nextStep(){if(G.seen>=PARTS.length)return;G.seen++;A.sound.step();talk(`Step ${G.seen}: ${PARTS[G.seen-1].say}`+(G.seen<PARTS.length?'':' Now, what came after the head?'))}
function nameAfter(k){if(G.seen<PARTS.length||G.named)return;if(k!==1){G.bad=k;A.sound.miss();return talk(oops('order',PARTS[k].n,'ears'))}
 G.named=true;G.bad=-1;A.sound.pop();talk('Yes: after the head came the ears. You watched closely.')}
/* ---------- 2. we do: take turns ---------- */
function drawShare(){backdrop(C.mint);const g=A.ctx,mine=TURN[G.p]==='y';person(g,A.W*.14,A.H*.3,A.W*.2,true);person(g,A.W*.14,A.H*.52,A.W*.14,false);
 say(G.p>=PARTS.length?'✓ Done together':mine?'Your turn':'Grown-up\'s turn',A.W*.14,A.H*.08,12,{c:A.col.tx,w:A.W*.26});drawPaper(G.p,false);
 if(G.p<PARTS.length&&mine)drawTray(G.left);else if(G.p<PARTS.length)say('Tap the paper to let the grown-up draw',A.W/2,A.H*.78,12,{c:A.col.tx,w:A.W-24});count('Your turns done',G.mine,2)}
function grownTurn(){if(G.p>=PARTS.length)return;if(TURN[G.p]==='y'){G.bad=-1;A.sound.miss();return talk(oops('passive'))}
 G.left=G.left.filter(k=>k!==G.p);G.p++;A.sound.step();talk(`The grown-up drew the ${PARTS[G.p-1].n}.`+(G.p<PARTS.length?' Now it is your turn.':''))}
function myPiece(k){if(G.p>=PARTS.length)return;if(TURN[G.p]!=='y'){A.sound.tick();return talk('It is the grown-up\'s turn. Watch, then you go next.')}
 if(k!==G.p){G.bad=k;A.sound.miss();return talk(oops('order',PARTS[k].n,PARTS[G.p].n))}
 G.left=G.left.filter(x=>x!==k);G.p++;G.mine++;G.bad=-1;A.sound.pop();talk(`You drew the ${PARTS[k].n}.`+(G.p<PARTS.length?' Now the grown-up goes.':' The cat is done, together.'))}
/* ---------- 3. you do: alone, with a hint only after a go ---------- */
function drawSolo(){backdrop(C.peach);const g=A.ctx;person(g,A.W*.1,A.H*.5,A.W*.12,true);say('Near',A.W*.1,A.H*.62,10,{c:A.col.tx,b:700});
 person(g,A.W*.16,A.H*.22,A.W*.18,false);say('Me',A.W*.16,A.H*.38,11,{c:A.col.tx,b:700});drawPaper(G.p,G.ghost);
 if(G.p<PARTS.length)drawTray(G.left);else say('✓ I drew it on my own',A.W/2,A.H*.78,14,{c:A.col.tx});count('Shapes drawn',G.p,PARTS.length)}
function soloPiece(k){if(G.p>=PARTS.length)return;G.tried=true;if(k!==G.p){G.bad=k;A.sound.miss();return talk(oops('order',PARTS[k].n,PARTS[G.p].n))}
 G.left=G.left.filter(x=>x!==k);G.p++;G.bad=-1;G.ghost=false;G.tried=false;A.sound.pop();talk(`You drew the ${PARTS[k].n}.`+(G.p<PARTS.length?' What comes next?':' The whole cat, on your own!'))}
function hint(){if(G.p>=PARTS.length)return;if(!G.tried){A.sound.miss();return talk(oops('tryfirst'))}G.ghost=true;A.sound.tick();talk(`Hint: the dashed shape shows where the ${PARTS[G.p].n} go${G.p===0?'es':''}. Good: you had a go first.`)}
/* ---------- 4. which round? ---------- */
const sceneR=()=>R(A.W*.06,A.H*.05,A.W*.88,A.H*.22),binR=i=>R(A.W*(.02+i*.33),A.H*.36,A.W*.31,A.H*.52);
function drawRounds(){backdrop(C.lilac);const live=G.i<SCENES.length,S=SCENES[Math.min(G.i,SCENES.length-1)];let r=sceneR();if(G.drag)r=R(G.drag.x-r.w/2,G.drag.y-r.h/2,r.w,r.h);
 panel(r,C.lemon,G.drag?'hold':'');say(live?S.t:'✓ All sorted',r.x+r.w/2,r.y+r.h/2,13,{w:r.w-16});
 ROUND.forEach((t,i)=>{const b=binR(i),x=G.bad===i;panel(b,C.paper,x?'bad':'');say((x?'✗ ':'')+t,b.x+b.w/2,b.y+sz(16),13,{w:b.w-6});
  say(String(G.sorted.filter(s=>s.r===i).length?'✓ '+G.sorted.filter(s=>s.r===i).length+' card'+(G.sorted.filter(s=>s.r===i).length>1?'s':''):''),b.x+b.w/2,b.y+b.h*.55,12,{c:C.good,b:700})});count('Sorted',G.sorted.length,SCENES.length)}
function fileRound(i){const S=SCENES[G.i];if(!S)return;if(S.r!==i){G.bad=i;A.sound.miss();return talk(oops('round',ROUND[i],S.r))}
 G.sorted.push(S);G.i++;G.bad=-1;A.sound.pop();talk(`${ROUND[i]}: ${S.t}.`+(G.i<SCENES.length?' Next card.':''))}
/* ---------- 5. the rounds in order ---------- */
const MIX=[2,0,1],cardR=i=>R(A.W*(.03+i*.325),A.H*.06,A.W*.3,A.H*.2),slotR=i=>R(A.W*.08,A.H*(.4+i*.17),A.W*.84,A.H*.14);
function drawOrder(){backdrop(C.ice);MIX.forEach((v,i)=>{if(G.seq.includes(v))return;let r=cardR(i);if(G.drag&&G.drag.i===i)r=R(G.drag.x-r.w/2,G.drag.y-r.h/2,r.w,r.h);
  panel(r,C.paper,G.bad===v?'bad':G.drag&&G.drag.i===i?'hold':'');say((G.bad===v?'✗ ':'')+ROUND[v],r.x+r.w/2,r.y+r.h/2,14,{w:r.w-8})});
 ROUND.forEach((_,i)=>{const r=slotR(i),has=i<G.seq.length;panel(r,has?C.paper:C.lemon,has?'good':'');say(`${i+1}. `+(has?`✓ ${ROUND[G.seq[i]]}: ${RJOB[G.seq[i]]}`:''),r.x+r.w/2,r.y+r.h/2,11,{w:r.w-12,b:700})});count('In order',G.seq.length,3)}
function placeRound(v){if(G.seq.includes(v))return;const at=G.seq.length;if(v!==at){G.bad=v;A.sound.miss();return talk(oops(v===2?'skip':'nowatch',ROUND[v],ROUND[at]))}
 G.seq.push(v);G.bad=-1;A.sound.pop();talk(`${at+1}: ${ROUND[v]}. ${RJOB[v]}`)}
/* ---------- feedback that names the slip ---------- */
function oops(t,a,b){let m='Think about watch, share, then alone, and try again.';
 if(t==='order')m=`Not yet: the ${a} come${/s$/.test(a)?'':'s'} later. The ${b} come${/s$/.test(b)?'':'s'} next. ${b==='head'?'Everything sits on the head, so it goes first.':''}`.trim();
 if(t==='passive')m='In we do, you do your share. It is your turn: drag the next shape. Doing it is how your hands learn.';
 if(t==='tryfirst')m='Have a go first. Your try shows you what you remember. If you are still stuck after a go, tap Hint.';
 if(t==='round')m=`Not ${a}. This one is ${ROUND[b]}: ${RJOB[b]}`;
 if(t==='skip')m=`"${a}" cannot come yet. Trying alone before you have seen it and shared it means guessing. Next is "${b}".`;
 if(t==='nowatch')m=`"${a}" cannot come yet. You need to see how it is done first. Next is "${b}".`;
 if(t==='stuck')m='Watching more and more does not teach your hands. After one good watch, do one together.';
 if(t==='giveup')m='Stuck is normal when you learn. Have a go, then ask for a hint. Giving up stops the learning.';
 if(t==='neverask')m='If you tried and you are still stuck, ask. A hint now saves lots of guessing.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=where();if(k==='quiz'){backdrop(C.lemon);say('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});say('I do · We do · You do',A.W/2,A.H*.55,14,{c:A.col.tx,w:A.W-20});return}
 ({watch:drawWatch,share:drawShare,solo:drawSolo,rounds:drawRounds,order:drawOrder})[k]();A.fx.draw(A.ctx)}
function trayAt(p,list){return list.findIndex((_,i)=>hit(p,trayR(i,list.length)))}
function down(p){const k=where(),grab=o=>{G.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
 if(k==='watch'){if(G.seen<PARTS.length){if(hit(p,paperR()))nextStep();return false}const i=[0,1,2].find(j=>hit(p,quizR(j)));if(i!=null)nameAfter([2,1,3][i]);return false}
 if(k==='share'){if(G.p>=PARTS.length)return false;if(TURN[G.p]==='g'){if(hit(p,paperR()))grownTurn();return false}const i=trayAt(p,G.left);if(i>=0)return grab({i});return false}
 if(k==='solo'){if(G.p>=PARTS.length)return false;const i=trayAt(p,G.left);if(i>=0)return grab({i});return false}
 if(k==='rounds'){if(hit(p,sceneR())&&G.i<SCENES.length)return grab({});const i=[0,1,2].find(j=>hit(p,binR(j)));if(i!=null)fileRound(i);return false}
 if(k==='order'){const i=MIX.findIndex((v,j)=>!G.seq.includes(v)&&hit(p,cardR(j)));if(i>=0)return grab({i});return false}return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag;if(!d)return;G.drag=null;const k=where(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='share'||k==='solo'){const piece=G.left[d.i];if(tap||hit(p,paperR()))return k==='share'?myPiece(piece):soloPiece(piece);return A.redraw()}
 if(k==='rounds'){const i=[0,1,2].find(j=>hit(p,binR(j)));if(i!=null)return fileRound(i);return A.redraw()}
 if(k==='order'){if(tap||p.y>A.H*.36)return placeRound(MIX[d.i]);return A.redraw()}}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();G.hook()}
function keys(){if(!row)return;row.innerHTML='';const k=where(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='watch'){if(G.seen<PARTS.length)b('Next step',nextStep,'Watch the next step');else if(!G.named)[2,1,3].forEach(n=>b(PARTS[n].n,()=>nameAfter(n),`After the head came the ${PARTS[n].n}`))}
 if(k==='share'&&G.p<PARTS.length){b('Grown-up, you draw it',grownTurn,'Let the grown-up draw this step');if(TURN[G.p]==='y')G.left.forEach(n=>b(PARTS[n].n,()=>myPiece(n),`I draw the ${PARTS[n].n}`))}
 if(k==='solo'&&G.p<PARTS.length){G.left.forEach(n=>b(PARTS[n].n,()=>soloPiece(n),`Draw the ${PARTS[n].n}`));b('Hint',hint,'Ask the grown-up for a hint')}
 if(k==='rounds'&&G.i<SCENES.length)ROUND.forEach((t,i)=>b(t,()=>fileRound(i),`${t}: ${SCENES[G.i].t}`));
 if(k==='order')MIX.forEach(v=>{if(!G.seq.includes(v))b(ROUND[v],()=>placeRound(v),`Put next: ${ROUND[v]}`)})}
function clear(){epoch++;for(const x in G)delete G[x];Object.assign(G,{seen:0,named:false,p:0,mine:0,left:[2,0,3,1],ghost:false,tried:false,i:0,bad:-1,sorted:[],seq:[],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,test){clear();if(i===1)G.left=[3,1,2];talk(DESC[i]);G.hook=met(i,test)}
function play(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'I do: watch',p:'First the grown-up does it and says each step out loud. Your job is to watch and listen. Tap Next step.',
 task:'Watch 4 steps, then name one',show:()=>play(0,[...PARTS.map(()=>nextStep),()=>nameAfter(1)],380),go:()=>enter(0,()=>G.seen>=PARTS.length&&G.named)},
{h:'We do: together',p:'Now you share the job. The grown-up does a step, then you do the next step. Drag the right shape onto the cat on your turn.',
 predict:{q:'In "we do", who does the steps?',opts:['The grown-up does them all','We take turns'],ans:1},task:'Do your 2 turns',
 show:()=>play(1,[grownTurn,()=>myPiece(1),grownTurn,()=>myPiece(3)],420),go:()=>enter(1,()=>G.p>=PARTS.length&&G.mine>=2)},
{h:'You do: alone',p:'Now draw a cat on your own. The grown-up stays near. If you get stuck after a go, tap Hint.',
 predict:{q:'A step looks hard. What should you do first?',opts:['Ask for help straight away','Have a go first'],ans:1},task:'Draw a whole cat alone',
 show:()=>play(2,PARTS.map((_,n)=>()=>soloPiece(n)),400),go:()=>enter(2,()=>G.p>=PARTS.length)},
{h:'Which round?',p:'You can learn lots of things this way, not just drawing. Is each card I do, we do or you do? Drag it to a box.',
 task:'Sort 6 cards',show:()=>play(3,SCENES.map(()=>()=>fileRound(SCENES[G.i].r)),360),go:()=>enter(3,()=>G.sorted.length>=SCENES.length)},
{h:'In order',p:'Put the three rounds in the order that helps you learn something new.',
 predict:{q:'You watched once. Can you skip straight to "you do"?',opts:['Yes, one watch is enough','No, do it together first'],ans:1},task:'Put the 3 rounds in order',
 show:()=>play(4,[0,1,2].map(v=>()=>placeRound(v)),420),go:()=>enter(4,()=>G.seq.length>=3)},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.hook()});
function pose(){ask++;const Q=QS[ask%QS.length],all=[[Q.a,''],...Q.o],r=ask%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q,t)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q,t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb');
 const why=!s?'':s==='round'?`Not ${t}. The grown-up does it and says each step while you watch: that is I do.`:s==='skip'?'That skips a round. After watching, do it together before you try alone: I do, we do, you do.':s==='nowatch'?'You need to watch first. I do comes before we do.':oops(s);
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;row.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'I do, we do, you do lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
