/* Flagship – sharing a book with a grown-up (ages 2–3; Development Matters 2021 Literacy birth to three; dialogic
   reading). Scenes: turn the book so the front cover is up the right way and open it; turn one page at a time to the
   cat page (a fast flick skips pages); find things on a page with no words when the grown-up asks; drag doing words
   to the animals; ask for the book again and join in with more words each read. Data in learn/sharebook_art.js. */
(()=>{const {TITLE,PAGES,CAT,FIND,ASKS,DOERS,DOING,MORE,ASK,SAYS,JOIN,DESC,DONE,QS}=SHB;
VIS.reg('flagsharebook',c=>{let A,ctl,chal,qn=-1,run=0;const B={};c.fig.classList.add('young');
const DARK='#1e293b',OK='#047857',NO='#b91c1c',EDGE='#64748b',PICK='#7c3aed',SANS='px system-ui,sans-serif';
const KEYS=['cover','pages','point','doing','again','quiz'],now=()=>KEYS[A.step];
const sz=n=>Math.round(A.narrow?n:n*1.15);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const rectAt=(cx,cy,w,h)=>({x:cx-w/2,y:cy-h/2,w,h});
/* text on one line that shrinks to fit */
function txt(s,x,y,n,o={}){const g=A.ctx;let k=sz(n);g.font=`${o.w||800} ${k}${SANS}`;while(o.fit&&k>9&&g.measureText(s).width>o.fit){k--;g.font=`${o.w||800} ${k}${SANS}`}
 g.fillStyle=o.c||DARK;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a tile whose fill, border and ✓ / ✗ text show right, wrong or picked, so colour is never the only cue */
function tile(r,how){const g=A.ctx,P={ok:['#d1fae5',OK],no:['#fee2e2',NO],pick:['#ede9fe',PICK]}[how]||['#ffffff',EDGE];
 g.fillStyle=P[0];A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();g.lineWidth=how?4:2;g.strokeStyle=P[1];g.stroke()}
function tileText(s,r,n){const w=s.split(' ');if(w.length<3)return txt(s,r.x+r.w/2,r.y+r.h/2,n,{fit:r.w-12});const h=Math.ceil(w.length/2);
 txt(w.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h*.34,n,{fit:r.w-12});txt(w.slice(h).join(' '),r.x+r.w/2,r.y+r.h*.7,n,{fit:r.w-12})}
function head(s,good){const g=A.ctx;let k=sz(15);g.font=`800 ${k}${SANS}`;while(g.measureText(s).width>A.W-40&&k>10){k--;g.font=`800 ${k}${SANS}`}
 const w=g.measureText(s).width+26,r={x:(A.W-w)/2,y:6,w,h:k+16};tile(r,good?'ok':'');txt(s,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.15))}
function room(tint,t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,tint,A.col.dark?.12:t);g.fillRect(0,0,A.W,A.H)}
/* the grown-up's words in a speech bubble */
function bubble(s,y){const g=A.ctx,r=rectAt(A.W/2,y,Math.min(A.W*.86,360),A.H*.11);tile(r,'pick');g.fillStyle='#ede9fe';g.beginPath();g.moveTo(r.x+24,r.y+r.h-2);g.lineTo(r.x+14,r.y+r.h+12);g.lineTo(r.x+40,r.y+r.h-2);g.fill();
 txt('🧑 '+s,r.x+r.w/2,r.y+r.h/2,14,{fit:r.w-14})}
/* ---------- 1. find the front, up the right way ---------- */
const bookR=()=>{const w=Math.min(A.W*.42,220),h=Math.min(w*1.2,A.H*.5);return rectAt(A.W*.42,A.H*.44,w,h)};
const spinR=()=>{const b=bookR(),r=Math.max(30,A.W*.06);return{x:Math.min(A.W-r-8,b.x+b.w+r+18),y:b.y+b.h*.5,r}};
const openR=()=>rectAt(A.W/2,A.H*.86,Math.min(A.W*.6,260),A.H*.13);
function drawCover(){const s=B.cv,g=A.ctx,b=bookR(),sp=spinR(),o=openR();room('#fde68a',.4);
 g.save();g.translate(b.x+b.w/2,b.y+b.h/2);if(s.upside)g.rotate(Math.PI);g.translate(-b.w/2,-b.h/2);
 if(s.back){g.fillStyle='#e2e8f0';A.paint.rrect(0,0,b.w,b.h,10);g.fill();g.lineWidth=3;g.strokeStyle=EDGE;g.stroke();g.fillStyle='#94a3b8';g.fillRect(b.w-14,0,14,b.h);
  for(let i=0;i<9;i++){g.fillStyle=DARK;g.fillRect(b.w*.52+i*5,b.h*.8,i%3?2:3,b.h*.1)}txt('back',b.w*.42,b.h*.45,13,{c:'#334155'})}
 else{g.fillStyle='#fef3c7';A.paint.rrect(0,0,b.w,b.h,10);g.fill();g.lineWidth=3;g.strokeStyle='#b45309';g.stroke();g.fillStyle='#b45309';g.fillRect(0,0,14,b.h);
  txt('🦆',b.w*.55,b.h*.48,Math.max(30,b.w*.22));txt(TITLE,b.w*.55,b.h*.16,15,{fit:b.w-30});txt('☀️',b.w*.82,b.h*.82,18)}
 g.restore();
 g.fillStyle='#ffffff';g.beginPath();g.arc(sp.x,sp.y,sp.r,0,7);g.fill();g.lineWidth=3;g.strokeStyle=PICK;g.stroke();txt('🔄',sp.x,sp.y-3,20);txt('turn round',sp.x,sp.y+sp.r+12,11,{c:A.col.tx,fit:sp.r*2.6});
 tile(o,s.bad?'no':s.open?'ok':'');txt((s.bad?'✗ ':'')+'👐 Open it',o.x+o.w/2,o.y+o.h/2,16,{fit:o.w-10});
 head(s.open?'Open! Let’s read':s.back?'Tap the book to turn it over':s.upside?'Duck is upside down':'Front, up the right way!',s.open||(!s.back&&!s.upside))}
function flipOver(){const s=B.cv;if(s.open)return;s.back=!s.back;s.bad=0;A.sound.tick();say(s.back?'This is the back. The back has no big picture.':s.upside?'The front! But Duck is on his head. Turn it round.':'The front cover, with the big picture and the name.')}
function turnRound(){const s=B.cv;if(s.open)return;s.upside=!s.upside;s.bad=0;A.sound.tick();say(s.upside?'Upside down now.':s.back?'Turned round, but it is still the back.':'Duck is the right way up.')}
function openIt(){const s=B.cv;if(s.open)return;if(s.back){s.bad=1;A.sound.miss();return say(slip('back'))}if(s.upside){s.bad=1;A.sound.miss();return say(slip('upside'))}
 s.open=1;s.bad=0;A.sound.pop();say('We start at the front, with the picture up the right way.')}
/* ---------- 2. one page at a time ---------- */
const spread=()=>{const w=Math.min(A.W*.92,520),h=Math.min(A.H*.56,w*.62);return rectAt(A.W/2,A.H*.48,w,h)};
function drawPages(){const s=B.pg,g=A.ctx,r=spread(),half=r.w/2;room('#bfdbfe',.4);
 g.fillStyle='#fffbeb';g.fillRect(r.x,r.y,r.w,r.h);g.lineWidth=2;g.strokeStyle=EDGE;g.strokeRect(r.x,r.y,r.w,r.h);g.beginPath();g.moveTo(r.x+half,r.y);g.lineTo(r.x+half,r.y+r.h);g.stroke();
 if(s.p>0){const L=PAGES[s.p-1];txt(L.e,r.x+half/2,r.y+r.h*.42,26);txt(L.t,r.x+half/2,r.y+r.h*.82,12,{fit:half-16,w:600})}else txt(TITLE,r.x+half/2,r.y+r.h*.45,14,{fit:half-16,c:'#475569'});
 const P=PAGES[s.p],lift=s.drag?Math.max(0,s.drag.x0-s.drag.x):0;
 txt(P.e,r.x+half*1.5,r.y+r.h*.42,30);txt(P.t,r.x+half*1.5,r.y+r.h*.82,13,{fit:half-16,w:600});
 if(lift>4){const x=Math.max(r.x,r.x+r.w-lift*1.4);g.fillStyle='rgba(254,243,199,.95)';g.beginPath();g.moveTo(x,r.y);g.lineTo(r.x+r.w,r.y);g.lineTo(r.x+r.w,r.y+r.h);g.lineTo(x,r.y+r.h);g.closePath();g.fill();g.strokeStyle='#b45309';g.stroke()}
 else if(s.p<PAGES.length-1){g.fillStyle='#fde68a';g.beginPath();g.moveTo(r.x+r.w,r.y+r.h-30);g.lineTo(r.x+r.w-30,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.fill();txt('↙',r.x+r.w-12,r.y+r.h-12,13)}
 PAGES.forEach((_,i)=>{g.fillStyle=i===s.p?PICK:'#ffffff';g.beginPath();g.arc(A.W/2+(i-1.5)*26,r.y+r.h+22,8,0,7);g.fill();g.lineWidth=2;g.strokeStyle=PICK;g.stroke()});
 txt('page '+(s.p+1)+' of '+PAGES.length,A.W/2,r.y+r.h+46,12,{c:A.col.tx});
 head(s.p===CAT&&!s.fast?'Duck sees a cat!':'Find the page with the cat 🐱',s.p===CAT&&!s.fast)}
function turn(d){const s=B.pg,n=s.p+d;s.drag=null;if(n<0||n>=PAGES.length){A.redraw();return say(n<0?'This is the first page.':'This is the last page.')}
 s.p=n;s.fast=0;A.sound.tick();say(`Page ${n+1}: ${PAGES[n].t}`+(n>CAT?' We went past the cat. Turn back one page.':''))}
function flick(){const s=B.pg;s.p=0;s.fast=1;A.sound.miss();say(slip('fast'))}
/* ---------- 3. point and say, on a page with no words ---------- */
const spotR=i=>{const F=FIND[i],r=Math.max(30,Math.min(A.W,A.H)*.09);return{x:F.x*A.W,y:F.y*A.H,r}};
function drawPoint(){const s=B.pt,g=A.ctx;room('#bbf7d0',.45);g.fillStyle=A.mix(A.col.pn,'#86efac',A.col.dark?.15:.55);g.fillRect(0,A.H*.5,A.W,A.H*.5);
 FIND.forEach((F,i)=>{const p=spotR(i),got=s.got.includes(F.k);g.fillStyle=got?'#d1fae5':s.bad===F.k?'#fee2e2':'#ffffff';g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill();g.lineWidth=got||s.bad===F.k?4:2;g.strokeStyle=got?OK:s.bad===F.k?NO:EDGE;g.stroke();
  txt(F.e,p.x,p.y,24);if(got)txt('✓',p.x+p.r*.8,p.y-p.r*.8,14,{c:OK})});
 txt('no words on this page',A.W/2,A.H*.97,11,{c:A.col.tx,fit:A.W-20});
 const k=ASKS[s.got.length];if(k)bubble(`Where is the ${k}?`,A.H*.25);head(k?'Point to it':'You found them all!',!k)}
function point(k){const s=B.pt,want=ASKS[s.got.length];if(!want)return;if(k!==want){s.bad=k;A.sound.miss();const W=FIND.find(F=>F.k===want),N=FIND.find(F=>F.k===k);
  return say(`That is the ${N.n}. Find the ${W.n}: ${W.clue}.`)}
 s.got.push(k);s.bad='';A.sound.pop();say(`Yes, the ${k}! `+(s.got.length<ASKS.length?`${s.got.length} of 3.`:'No words, and we still talked about every picture.'))}
/* ---------- 4. doing words ---------- */
const doerR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.24,w,h:A.H*.34}};
const wordR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.72,w,h:A.H*.18}};
function drawDoing(){const s=B.dw,g=A.ctx;room('#a5f3fc',.4);
 DOERS.forEach((D,i)=>{const r=doerR(i),m=s.done.includes(D.does);tile(r,m?'ok':s.bad===i?'no':s.hot===i?'pick':'');txt(D.e,r.x+r.w/2,r.y+r.h*.36,30);
  const W=DOING.find(w=>w.k===D.does);txt(W.e,r.x+r.w*.78,r.y+r.h*.16,16);txt(m?'✓ '+W.t:D.n,r.x+r.w/2,r.y+r.h*.8,13,{fit:r.w-10})});
 DOING.forEach((W,i)=>{if(s.done.includes(W.k))return;const r0=wordR(i),r=s.drag&&s.drag.i===i?rectAt(s.drag.x,s.drag.y,r0.w,r0.h):r0;tile(r,s.pick===i?'pick':'');txt(W.e,r.x+r.w/2,r.y+r.h*.34,18);txt(W.t,r.x+r.w/2,r.y+r.h*.74,13,{fit:r.w-8})});
 head(s.done.length>=3?'Running, sleeping, splashing!':'What is it doing? Drag the word',s.done.length>=3)}
function match(i,to){const s=B.dw,W=DOING[i],D=DOERS[to];s.drag=null;s.hot=-1;s.pick=null;if(s.done.includes(W.k))return A.redraw();
 if(D.does!==W.k){s.bad=to;A.sound.miss();const R=DOING.find(w=>w.k===D.does);return say(`The ${D.n} is not ${W.t}. Look: ${R.see}. It is ${R.t}.`)}
 s.done.push(W.k);s.bad=-1;A.sound.pop();say(MORE[W.k]+(s.done.length<3?` ${s.done.length} of 3.`:''))}
/* ---------- 5. again, please ---------- */
const askR=i=>({x:A.W*.06,y:A.H*(.6+i*.13),w:A.W*.88,h:A.H*.11});
function drawAgain(){const s=B.ag,g=A.ctx,n=SAYS[s.reads];room('#fbcfe8',.4);
 const bk=rectAt(A.W*.22,A.H*.3,Math.min(A.W*.3,150),A.H*.3);tile(bk,'');txt('🦆',bk.x+bk.w/2,bk.y+bk.h*.42,26);txt('The End',bk.x+bk.w/2,bk.y+bk.h*.82,12,{fit:bk.w-8});
 txt(`Read ${s.reads+1} time${s.reads?'s':''}`,A.W*.64,A.H*.2,14,{c:A.col.tx,fit:A.W*.6});
 const x0=A.W*.42,cw=(A.W*.54)/3;JOIN.forEach((w,i)=>{const r={x:x0+(i%3)*cw,y:A.H*.28+Math.floor(i/3)*A.H*.12,w:cw-6,h:A.H*.1};tile(r,i<n?'ok':'');txt(i<n?w:'…',r.x+r.w/2,r.y+r.h/2,12,{fit:r.w-6})});
 txt(`Words you say with it: ${n}`,A.W*.64,A.H*.53,12,{c:A.col.tx,fit:A.W*.6});
 ASK.forEach((Q,i)=>{const r=askR(i);tile(r,s.bad===Q.k?'no':'');txt((s.bad===Q.k?'✗ ':'')+Q.t,r.x+r.w/2,r.y+r.h/2,14,{fit:r.w-12})});
 head(s.reads>=3?'You know it by heart!':'Ask for it again',s.reads>=3)}
function ask(k){const s=B.ag,Q=ASK.find(q=>q.k===k);if(s.reads>=3)return;if(!Q.good){s.bad=k;A.sound.miss();return say(Q.why)}
 s.reads++;s.bad='';A.sound.pop();say(`Read again! This time you said ${SAYS[s.reads]} words with it: ${JOIN.slice(0,SAYS[s.reads]).join(' ')}`)}
/* ---------- input ---------- */
function draw(){const k=now();if(k==='quiz'){room('#fde68a',.35);head('Challenge',1);txt('Front · One page · Point · Again',A.W/2,A.H*.5,15,{c:A.col.tx,fit:A.W-20});return}
 ({cover:drawCover,pages:drawPages,point:drawPoint,doing:drawDoing,again:drawAgain})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='cover'){const sp=spinR();if(Math.hypot(p.x-sp.x,p.y-sp.y)<sp.r+10)turnRound();else if(inside(p,bookR()))flipOver();else if(inside(p,openR()))openIt();return false}
 if(k==='pages'){if(inside(p,spread())){B.pg.drag={x0:p.x,x:p.x,right:p.x>A.W/2};return true}return false}
 if(k==='point'){const i=FIND.findIndex((_,j)=>{const q=spotR(j);return Math.hypot(p.x-q.x,p.y-q.y)<q.r+8});if(i>=0)point(FIND[i].k);return false}
 if(k==='doing'){const i=DOING.findIndex((W,j)=>!B.dw.done.includes(W.k)&&inside(p,wordR(j)));if(i>=0){B.dw.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const t=DOERS.findIndex((_,j)=>inside(p,doerR(j)));if(t>=0&&B.dw.pick!=null)match(B.dw.pick,t);return false}
 if(k==='again'){const i=ASK.findIndex((_,j)=>inside(p,askR(j)));if(i>=0)ask(ASK[i].k);return false}return false}
function move(p){const k=now();if(k==='pages'&&B.pg.drag){B.pg.drag.x=p.x;A.redraw()}
 if(k==='doing'&&B.dw.drag){Object.assign(B.dw.drag,{x:p.x,y:p.y});B.dw.hot=DOERS.findIndex((_,j)=>inside(p,doerR(j)));A.redraw()}}
function up(p){const k=now();
 if(k==='pages'&&B.pg.drag){const d=B.pg.drag,dx=p.x-d.x0,far=A.W*.12;B.pg.drag=null;if(d.right&&dx<-far)return turn(1);if(!d.right&&dx>far)return turn(-1);
  if(Math.abs(dx)<10)return say(d.right?'Drag the corner of the page to the left to turn it.':'Drag this page to the right to go back.');A.redraw();return}
 if(k==='doing'&&B.dw.drag){const d=B.dw.drag,t=DOERS.findIndex((_,j)=>inside(p,doerR(j)));if(t>=0)return match(d.i,t);B.dw.drag=null;B.dw.hot=-1;
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){B.dw.pick=d.i;return say(`${DOING[d.i].t} picked. Now tap the animal.`)}A.redraw()}}
function reset(){run++;for(const k in B)delete B[k];Object.assign(B,{cv:{back:1,upside:1,open:0,bad:0},pg:{p:0,fast:0,drag:null},pt:{got:[],bad:''},dw:{done:[],bad:-1,hot:-1,pick:null,drag:null},ag:{reads:0,bad:''},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();B.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();say(DESC[i]);if(ok)B.check=finish(i,ok)}
function demo(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
/* every canvas action has a labelled button twin */
function controls(){if(!ctl)return;ctl.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='cover'&&!B.cv.open){add('📖 Turn it over',flipOver);add('🔄 Turn it round',turnRound);add('👐 Open it',openIt)}
 if(k==='pages'){add('➡️ Turn one page',()=>turn(1));add('⬅️ Go back one page',()=>turn(-1));add('💨 Flick lots of pages',flick)}
 if(k==='point'&&ASKS[B.pt.got.length])FIND.forEach(F=>add(`${F.e} ${F.n}`,()=>point(F.k),`Point to the ${F.n}`));
 if(k==='doing'){if(B.dw.pick==null)DOING.forEach((W,i)=>{if(!B.dw.done.includes(W.k))add(`${W.e} ${W.t}`,()=>{B.dw.pick=i;say(`${W.t} picked. Now choose the animal.`)})});
  else DOERS.forEach((D,j)=>add(`${D.e} ${D.n}`,()=>match(B.dw.pick,j),`Give ${DOING[B.dw.pick].t} to the ${D.n}`))}
 if(k==='again'&&B.ag.reads<3)ASK.forEach(Q=>add(Q.t,()=>ask(Q.k)))}
const steps=[
{h:'The front cover',p:'Here is a book on your grown-up’s lap. Make the front face you, up the right way. Then open it.',
 predict:{q:'Where do we start a book?',opts:['At the back','At the front, with the big picture'],ans:1},task:'Front up the right way, then open',
 show:()=>demo(0,[flipOver,turnRound,openIt],520),go:()=>enter(0,()=>B.cv.open)},
{h:'Turn the pages',p:'Drag the corner of the page to the left to turn it. Find the page with the cat.',task:'Turn to the cat page',
 show:()=>demo(1,[()=>turn(1),()=>turn(1)],520),go:()=>enter(1,()=>B.pg.p===CAT&&!B.pg.fast)},
{h:'Point and say',p:'This page has no words. Your grown-up asks, and you point.',
 predict:{q:'A page has no words. Can we still share it?',opts:['No, we need words','Yes, we talk about the pictures'],ans:1},task:'Find all 3 things',
 show:()=>demo(2,ASKS.map(k=>()=>point(k)),480),go:()=>enter(2,()=>B.pt.got.length>=ASKS.length)},
{h:'What is it doing?',p:'Drag each doing word to the animal that is doing it. Say it with your grown-up.',task:'Match all 3 doing words',
 show:()=>demo(3,DOERS.map((D,j)=>()=>match(DOING.findIndex(W=>W.k===D.does),j)),480),go:()=>enter(3,()=>B.dw.done.length>=3)},
{h:'Again, please!',p:'The end! You love this book. Ask to read it again, and join in.',
 predict:{q:'We just read this book. Can we read it again?',opts:['No, it is finished now','Yes, again and again'],ans:1},task:'Read it 3 more times',
 show:()=>demo(4,[0,1,2].map(()=>()=>ask('again')),480),go:()=>enter(4,()=>B.ag.reads>=3)},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.check()});
/* the feedback names the slip, so the child knows what to change */
function slip(t){let m='Front first, one page at a time, then point and talk.';
 if(t==='back')m='That is the back. Turn it over: the front has the big picture and the name.';
 if(t==='upside')m='Duck is upside down! Turn the book round so the picture is the right way up.';
 if(t==='fast')m='Whoosh! Too many pages at once, so we missed some. Turn one page at a time.';
 if(t==='words')m='No words is fine. Point to the pictures and talk about them.';
 if(t==='again')m='A book you love can be read again and again. Say: “Again, please!”';
 if(t==='rough')m='Gentle hands. Pages can tear. Turn them softly from the corner.';
 if(t==='point')m='Listen to the question, then point to that thing in the picture.';
 return m}
function quizNext(){qn++;const Q=QS[qn%QS.length],opts=[[Q.a,'ok'],...Q.o],r=qn%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizNext;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Book sharing lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
