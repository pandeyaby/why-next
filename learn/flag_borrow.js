/* Flagship – borrowing and looking after other people's things (ages 4–5; EYFS Development Matters 2021 PSED and the
   ELGs Building Relationships and Managing Self; PSHE Association KS1 respecting other people's belongings).
   Scenes: ask three friends (yes, not now, no) and answer kindly; carry a borrowed book round spills to the reading
   corner; give each thing back to the owner on its sticker, Sam first because he asked; pick what to do when a
   borrowed crayon snaps; and feel it from the lender's side. Data in learn/borrow_art.js. */
(()=>{const {PALS,ASKS,START,GOAL,SAFE,HAZ,BACK,FIRST,OOPS,LEND,DESC,DONE,QS}=BRW;
VIS.reg('flagborrow',c=>{let A,row,chal,qn=-1,epoch=0;const M={};c.fig.classList.add('young');
const DARK='#111827',OK='#047857',BAD='#b91c1c',EDGE='#6b7280',PICK='#6d28d9',WARM='#c2410c',SANS='px system-ui,sans-serif';
const sceneOf=()=>['ask','carry','back','oops','lend','chal'][A.step];
const big=n=>Math.round(A.narrow?n:n*1.15);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const centred=(x,y,w,h)=>({x:x-w/2,y:y-h/2,w,h});
const at=f=>({x:f.x*A.W,y:f.y*A.H});
/* playroom floor: warm, low-contrast so the white tiles stand out in both themes */
function floor(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function txt(s,x,y,n,o){o=o||{};const g=A.ctx;let k=big(n);const f=()=>g.font=`${o.wt||800} ${k}${SANS}`;f();while(o.fit&&k>9&&g.measureText(s).width>o.fit){k--;f()}
 g.fillStyle=o.col||DARK;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.ok?'#dcfce7':o.warm?'#ffedd5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();
 g.lineWidth=o.bad||o.ok||o.pick||o.warm?4:2;g.strokeStyle=o.bad?BAD:o.ok?OK:o.pick?PICK:o.warm?WARM:EDGE;g.stroke()}
/* wraps a short label onto at most two centred lines inside a tile */
function label2(s,r,n){const w=s.split(' ');if(w.length<3||A.ctx.measureText(s).width<r.w-12&&w.length<4)return txt(s,r.x+r.w/2,r.y+r.h/2,n,{fit:r.w-10});
 const h=Math.ceil(w.length/2);txt(w.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h*.34,n,{fit:r.w-10});txt(w.slice(h).join(' '),r.x+r.w/2,r.y+r.h*.7,n,{fit:r.w-10})}
function headline(s,good){const g=A.ctx;let k=big(14);g.font=`800 ${k}${SANS}`;let w=g.measureText(s).width+26;while(w>A.W-10&&k>10){k--;g.font=`800 ${k}${SANS}`;w=g.measureText(s).width+26}
 const r={x:(A.W-w)/2,y:A.H*.015,w,h:k+18};tile(r,{ok:good});txt(s,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.15))}
/* ---------- 1. ask first ---------- */
const askPads=()=>{const w=Math.min(A.W*.44,210),h=Math.max(62,A.H*.15),y=A.H*.84;return[centred(A.W*.27,y,w,h),centred(A.W*.73,y,w,h)]};
const replyOpts=()=>{const R=ASKS[M.a.r];return M.a.heard?[['😠 Take it anyway','take'],[R.ok,'ok']]:[['✋ Grab it','grab'],['💬 Ask: can I borrow it, please?','ask']]};
function drawAsk(){const s=M.a;floor();if(s.r>=ASKS.length){headline('3 friends asked kindly',1);txt('🛴 ✓   🪣 ⏳   🧸 👍',A.W/2,A.H*.45,26);return}
 const R=ASKS[s.r],P=PALS[R.p];headline(`Friend ${s.r+1} of 3`);txt(P.e,A.W*.3,A.H*.3,52);txt(P.n,A.W*.3,A.H*.43,17,{col:A.col.tx});
 txt(s.got.includes(s.r)?'':R.e,A.W*.62,A.H*.32,46);txt(R.toy,A.W*.62,A.H*.43,15,{col:A.col.tx});
 if(s.heard||s.lent){const b={x:A.W*.06,y:A.H*.52,w:A.W*.88,h:A.H*.13};tile(b,{warm:1});label2(`${P.n}: “${R.say}”`,b,13)}
 if(!s.lent)askPads().forEach((r,i)=>{const o=replyOpts()[i];tile(r,{bad:s.bad===o[1],pick:i===1});label2(o[0],r,15)})}
function act(kind){const s=M.a;if(s.r>=ASKS.length)return;const R=ASKS[s.r],P=PALS[R.p];
 if(kind==='grab'){s.bad='grab';A.sound.miss();return speak(`Stop! The ${R.toy} is ${P.n}’s. Ask first.`)}
 if(kind==='ask'){s.bad='';s.heard=!R.yes;if(R.yes){s.got.push(s.r);s.r++;A.sound.pop();return speak(`${P.n} said yes: “${R.say}” The ${R.toy} is yours to borrow.`)}A.sound.tick();return speak(`${P.n} says: “${R.say}”`)}
 if(kind==='take'){s.bad='take';A.sound.miss();return speak(`Saying please does not mean ${P.n} has to say yes. It is ${P.n}’s ${R.toy}, so it is ${P.n}’s choice.`)}
 s.bad='';s.heard=0;s.r++;A.sound.pop();speak('Kind answer. '+(s.r>=ASKS.length?'All 3 friends asked.':'Next friend.'))}
/* ---------- 2. carry it carefully ---------- */
const hazR=()=>Math.min(A.W,A.H)*.075;
const goalR=()=>{const g=at(GOAL);return centred(g.x,g.y,Math.min(A.W*.22,110),A.H*.15)};
function drawCarry(){const s=M.c,R=hazR(),G=goalR();floor();
 tile(G,{ok:s.home});txt('📚',G.x+G.w/2,G.y+G.h*.4,24);txt('reading corner',G.x+G.w/2,G.y+G.h*.8,11,{fit:G.w-6});
 HAZ.forEach((h,i)=>{const p=at(h),g=A.ctx;g.fillStyle=s.hitI===i?'#fecaca':'#fde68a';g.beginPath();g.arc(p.x,p.y,R,0,7);g.fill();g.lineWidth=s.hitI===i?4:2;g.strokeStyle=s.hitI===i?BAD:WARM;g.stroke();txt(h.e,p.x,p.y,24)});
 if(s.trail.length>1){const g=A.ctx;g.strokeStyle=PICK;g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();s.trail.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();g.setLineDash([])}
 const b=s.tok;tile(centred(b.x,b.y,50,50),{pick:1});txt('📕',b.x,b.y,24);
 headline(s.home?'Book safe in the reading corner':'Drag the book to the reading corner',s.home)}
function carryTo(p){const s=M.c;if(s.home)return;s.tok={x:p.x,y:p.y};s.trail.push({x:p.x,y:p.y});const R=hazR()+18;
 const i=HAZ.findIndex(h=>{const q=at(h);return Math.hypot(q.x-p.x,q.y-p.y)<R});
 if(i>=0){s.hitI=i;s.tok=at(START);s.trail=[];s.drag=false;A.sound.miss();return speak(`Oops! ${HAZ[i].why} Back to the start. Go round.`)}
 if(inside(p,goalR())){s.home=1;s.drag=false;A.sound.pop();return speak('Safe! The book is clean in the reading corner.')}A.redraw()}
/* the two button routes: round the edge (safe) or straight across (hits the juice) */
function route(safe){const s=M.c;if(s.home)return;s.hitI=-1;s.tok=at(START);s.trail=[at(START)];const pts=safe?SAFE:[{x:.31,y:.69},{x:.5,y:.53},{x:.86,y:.2}],e0=epoch;
 pts.forEach((q,j)=>setTimeout(()=>{if(e0===epoch&&!s.home&&s.hitI<0)carryTo(at(q))},A.reduced()?0:160*(j+1)))}
/* ---------- 3. give it back ---------- */
const owners=()=>{const w=Math.min((A.W-40)/3,150),h=A.H*.24;return PALS.map((_,i)=>({i,...centred(A.W*(i+.5)/3,A.H*.26,w,h)}))};
const things=()=>{const w=Math.min((A.W-40)/3,140),h=A.H*.2;return BACK.map((_,i)=>({i,...centred(A.W*(i+.5)/3,A.H*.7,w,h)}))};
function drawBack(){const s=M.b,g=A.ctx;floor();
 owners().forEach(r=>{const P=PALS[r.i];tile(r,{ok:s.home.some(i=>BACK[i].p===r.i),pick:s.hot===r.i});txt(P.e,r.x+r.w/2,r.y+r.h*.36,32);txt(P.n,r.x+r.w/2,r.y+r.h*.76,15)});
 things().forEach(r=>{if(s.home.includes(r.i)||(s.drag&&s.drag.i===r.i))return;thing(r,BACK[r.i],{bad:s.bad===r.i,pick:s.pick===r.i})});
 if(s.drag){const r=things()[s.drag.i];thing(centred(s.drag.x,s.drag.y,r.w,r.h),BACK[s.drag.i],{pick:1})}
 const ask=!s.home.includes(FIRST);headline(s.home.length>=BACK.length?'All given back. Thank you!':ask?'Sam: “Can I have my ball back, please?”':'Give each thing back to its owner',s.home.length>=BACK.length)}
function thing(r,T,o){tile(r,o);const P=PALS[T.p],g=A.ctx;txt(T.e,r.x+r.w/2,r.y+r.h*.36,28);g.fillStyle=P.c;A.paint.rrect(r.x+r.w*.18,r.y+r.h*.62,r.w*.64,r.h*.28,8);g.fill();txt(`${P.e} ${P.n}`,r.x+r.w/2,r.y+r.h*.76,12,{col:'#ffffff',fit:r.w*.6})}
function giveBack(i,to){const s=M.b,T=BACK[i];s.pick=null;s.drag=null;s.hot=-1;if(s.home.includes(i))return;
 if(T.p!==to){s.bad=i;A.sound.miss();return speak(`That ${T.t} has ${PALS[T.p].n}’s sticker. Give it back to ${PALS[T.p].n}.`)}
 if(i!==FIRST&&!s.home.includes(FIRST)){s.bad=i;A.sound.miss();return speak('Sam asked for his ball back. Give it to him now, even if you have not finished.')}
 s.home.push(i);s.bad=-1;A.sound.pop();speak(`${PALS[to].n}: “Thank you!”`+(s.home.length>=BACK.length?' Everything is back.':''))}
/* ---------- 4. oops, it snapped ---------- */
const oopsR=()=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*.13;return OOPS.map((_,i)=>({i,x:gap+(i%2)*(w+gap),y:A.H*.42+Math.floor(i/2)*(h+gap),w,h}))};
function drawOops(){const s=M.o;floor();txt('🖍️',A.W*.36,A.H*.2,40);txt('💥',A.W*.5,A.H*.2,26);txt('🖍️',A.W*.64,A.H*.2,40);txt(`Ben’s crayon snapped. I did: ${s.done.length} of 3`,A.W/2,A.H*.33,14,{col:A.col.tx,fit:A.W-20});
 oopsR().forEach(r=>{const O=OOPS[r.i];tile(r,{ok:s.done.includes(r.i),bad:s.bad===r.i});label2((s.done.includes(r.i)?'✓ ':'')+O.t,r,13)});
 headline(s.done.length>=3?'Told, sorry, fixed':'Tap the 3 things to do',s.done.length>=3)}
function choose(i){const s=M.o,O=OOPS[i];if(s.done.includes(i)||s.done.length>=3)return;
 if(!O.good){s.bad=i;A.sound.miss();return speak(O.why)}s.done.push(i);s.bad=-1;A.sound.pop();speak(`${O.t}. `+(s.done.length>=3?'Ben says: thank you for telling me.':`${s.done.length} of 3.`))}
/* ---------- 5. lending mine (free play) ---------- */
const lendR=()=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*.15;return LEND.map((_,i)=>({i,x:gap+(i%2)*(w+gap),y:A.H*.55+Math.floor(i/2)*(h+gap),w,h}))};
function drawLend(){const s=M.l;floor();headline('You lent your truck 🚚 to Pip');txt(s.pick==null?'🙂':LEND[s.pick].f,A.W/2,A.H*.24,56);
 txt(s.pick==null?'Tap a card. How would you feel?':LEND[s.pick].m,A.W/2,A.H*.42,14,{col:A.col.tx,fit:A.W-20});lendR().forEach(r=>{tile(r,{pick:s.pick===r.i});label2(LEND[r.i].t,r,13)})}
function feel(i){M.l.pick=i;A.sound.tick();speak(`${LEND[i].t}. You might feel: ${LEND[i].m}`)}
/* ---------- input ---------- */
function draw(){const k=sceneOf();if(k==='chal'){floor();headline('Challenge',1);txt('Ask · Care · Give back · Tell',A.W/2,A.H*.5,16,{col:A.col.tx,fit:A.W-20});return}
 ({ask:drawAsk,carry:drawCarry,back:drawBack,oops:drawOops,lend:drawLend})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sceneOf();
 if(k==='ask'){if(M.a.r>=ASKS.length)return false;const i=askPads().findIndex(r=>inside(p,r));if(i>=0)act(replyOpts()[i][1]);return false}
 if(k==='carry'){const b=M.c.tok;if(!M.c.home&&Math.hypot(p.x-b.x,p.y-b.y)<40){M.c.drag=true;M.c.hitI=-1;M.c.trail=[{x:b.x,y:b.y}];A.redraw();return true}return false}
 if(k==='back'){const t=things().find(r=>inside(p,r)&&!M.b.home.includes(r.i));if(t){M.b.drag={i:t.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const o=owners().find(r=>inside(p,r));if(o&&M.b.pick!=null)giveBack(M.b.pick,o.i);return false}
 if(k==='oops'){const r=oopsR().find(r=>inside(p,r));if(r)choose(r.i);return false}
 if(k==='lend'){const r=lendR().find(r=>inside(p,r));if(r)feel(r.i);return false}return false}
function move(p){const k=sceneOf();if(k==='carry'&&M.c.drag)return carryTo(p);
 if(k==='back'&&M.b.drag){M.b.drag.x=p.x;M.b.drag.y=p.y;const o=owners().find(r=>inside(p,r));M.b.hot=o?o.i:-1;A.redraw()}}
function up(p){const k=sceneOf();if(k==='carry'){M.c.drag=false;return}
 if(k==='back'&&M.b.drag){const d=M.b.drag,o=owners().find(r=>inside(p,r));if(o)return giveBack(d.i,o.i);M.b.drag=null;M.b.hot=-1;
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){M.b.pick=d.i;return speak(`${BACK[d.i].t[0].toUpperCase()+BACK[d.i].t.slice(1)} picked. Now tap its owner.`)}A.redraw()}}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{a:{r:0,heard:0,bad:'',got:[]},c:{tok:at(START),trail:[],hitI:-1,home:0,drag:false},b:{home:[],bad:-1,pick:null,drag:null,hot:-1},o:{done:[],bad:-1},l:{pick:null},watch:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();M.watch()}
const whenDone=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,ok){fresh();speak(DESC[i]);if(ok)M.watch=whenDone(i,ok)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
/* button twins: every canvas action can also be done with a labelled button */
function twins(){if(!row)return;row.innerHTML='';const k=sceneOf(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='ask'&&M.a.r<ASKS.length)replyOpts().forEach(([t,v])=>add(t,()=>act(v)));
 if(k==='carry'&&!M.c.home){add('🛤️ Go the long way round the edge',()=>route(1));add('➡️ Go straight across',()=>route(0))}
 if(k==='back'){if(M.b.pick==null)BACK.forEach((T,i)=>{if(!M.b.home.includes(i))add(`${T.e} Pick the ${T.t}`,()=>{M.b.pick=i;speak(`${T.t[0].toUpperCase()+T.t.slice(1)} picked. Now choose its owner.`)})});
  else PALS.forEach((P,j)=>add(`Give to ${P.e} ${P.n}`,()=>giveBack(M.b.pick,j),`Give the ${BACK[M.b.pick].t} to ${P.n}`))}
 if(k==='oops'&&M.o.done.length<3)OOPS.forEach((O,i)=>{if(!M.o.done.includes(i))add(O.t,()=>choose(i))});
 if(k==='lend')LEND.forEach((L,i)=>add(L.t,()=>feel(i)))}
const steps=[
{h:'Ask first',p:'Each friend has a toy you want to play with. Tap Ask, or Grab it. Listen to what your friend says, then answer.',
 predict:{q:'If you ask nicely, does your friend have to say yes?',opts:['Yes, because I said please','No, it is their choice'],ans:1},task:'Ask all 3 friends',
 show:()=>demo(0,[()=>act('ask'),()=>act('ask'),()=>act('ok'),()=>act('ask'),()=>act('ok')],520),go:()=>open(0,()=>M.a.r>=ASKS.length)},
{h:'Look after it',p:'Drag Mia’s book to the reading corner. Do not touch the juice, paint, puppy or sand.',
 predict:{q:'Is the quickest way always the best way to carry a borrowed book?',opts:['Yes, straight across is fine','No, go round the mess'],ans:1},task:'Get the book there clean',
 show:()=>{demo(1,[()=>route(1)],200)},go:()=>open(1,()=>M.c.home)},
{h:'Give it back',p:'Drag each thing to the friend whose name is on its sticker, or tap the thing and then the friend.',
 predict:{q:'Sam asks for his ball back, but you have not finished. What do you do?',opts:['Keep it until I finish','Give it back now'],ans:1},task:'Give all 3 things back',
 show:()=>demo(2,[FIRST,0,2].map(i=>()=>giveBack(i,BACK[i].p)),520),go:()=>open(2,()=>M.b.home.length>=BACK.length)},
{h:'Oops, it broke',p:'Ben lent you his crayon and it snapped. Tap the three things to do.',
 predict:{q:'Ben’s crayon snapped. What helps Ben most?',opts:['Put it back so he does not see','Tell Ben and say sorry'],ans:1},task:'Pick the 3 things to do',
 show:()=>demo(3,[1,3,5].map(i=>()=>choose(i)),480),go:()=>open(3,()=>M.o.done.length>=3)},
{h:'When I lend',p:'Now it is your truck. Tap each card. How would you feel if Pip did that?',go:()=>open(4)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.watch()});
/* the feedback names the slip, so the child knows what to change */
function why(t){let m='Think about how the owner would feel.';
 if(t==='grab')m='It belongs to someone else. Ask first, every time.';
 if(t==='nomeans')m='Asking nicely does not mean they must say yes. Say OK, and wait or find something else.';
 if(t==='keep')m='When the owner asks, give it back straight away, even if you have not finished.';
 if(t==='care')m='Look after borrowed things: keep them clean and safe, and give them back to the owner.';
 if(t==='hide')m='Hiding it or not telling is not fair. Tell the owner, say sorry and help put it right.';
 return m}
function next(){qn++;const Q=QS[qn%QS.length],opts=[[Q.a,'ok'],...Q.o],sh=qn%3,list=opts.slice(sh).concat(opts.slice(0,sh));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;row.hidden=X.step===5;twins()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Borrowing lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});twins()}}).start()})})();
