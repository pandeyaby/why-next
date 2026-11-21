/* Flagship – coin values (ages 5–6; NC 2013 Year 1 "recognise and know the value of different denominations of coins
   and notes"). Scenes: find each coin by its number, colour and shape; pick the coin worth more when the bigger coin is
   worth less; line coins up from least to most; swap one coin for small coins of the same value; check a robot.
   Coins are drawn at their real relative sizes. Data in learn/coinval_art.js. Distinct from flagcoin (totals and
   change, ages 7–8): here the child learns what each coin is worth and that size and number of coins can mislead. */
(()=>{const D=CNV;
VIS.reg('flagcoinval',c=>{let A,pad,quiz,turn=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#111827',GOOD='#15803d',BAD='#b91c1c',EDGE='#94a3b8',TABLE='#ecfccb',CLOTH='#d9f99d',FONT='px system-ui,sans-serif';
const scene=()=>['find','more','line','swap','robot','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.2);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function felt(){const g=A.ctx;g.fillStyle=TABLE;g.fillRect(0,0,A.W,A.H);g.fillStyle=CLOTH;g.fillRect(0,A.H*.86,A.W,A.H*.14)}
/* a white sign with dark words that shrinks to fit the canvas */
function sign(words,x,y,o){o=o||{};const g=A.ctx;let f=sz(o.n||14);g.font=`800 ${f}${FONT}`;while(g.measureText(words).width+26>A.W-8&&f>10){f--;g.font=`800 ${f}${FONT}`}
 const w=g.measureText(words).width+26,h=f+16,left=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(left,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?BAD:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(words,left+w/2,y+1)}
/* a big tap cell: a rounded box, red rim after a wrong tap, green when right */
function cell(b,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffffcc';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?BAD:o.ok?GOOD:EDGE;g.stroke()}
/* outline of a coin: a circle, or a polygon with flat sides (7 for 20p and 50p, 12 for £1) */
function outline(x,y,r,sides){const g=A.ctx;g.beginPath();if(!sides){g.arc(x,y,r,0,Math.PI*2);return}
 for(let k=0;k<sides;k++){const a=-Math.PI/2+k*2*Math.PI/sides,px=x+r*Math.cos(a),py=y+r*Math.sin(a);k?g.lineTo(px,py):g.moveTo(px,py)}g.closePath()}
/* draw one coin or note at its real relative size; r is the radius of a 28.4 mm £2 */
function money(v,x,y,r){const C=D.COIN[v],g=A.ctx;
 if(C.note){const w=r*3,h=r*1.55;g.fillStyle=C.col;A.paint.rrect(x-w/2,y-h/2,w,h,6);g.fill();g.strokeStyle='#334155';g.lineWidth=2;g.stroke();
  g.strokeStyle='#33415555';g.strokeRect(x-w/2+6,y-h/2+6,w-12,h-12);g.fillStyle=INK;g.font=`900 ${Math.round(r*.6)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(C.t,x,y+1);return}
 const rr=r*C.mm/28.4,face=C.metal==='copper'?'#e0a070':C.metal==='silver'?'#e5e7eb':'#facc15',rim=C.metal==='copper'?'#92400e':C.metal==='silver'?'#64748b':'#a16207';
 outline(x,y,rr,C.sides);g.fillStyle=face;g.fill();g.lineWidth=2.5;g.strokeStyle=rim;g.stroke();
 if(C.metal==='two'){outline(x,y,rr*.66,C.sides);g.fillStyle='#e5e7eb';g.fill();g.lineWidth=1.5;g.strokeStyle='#64748b';g.stroke()}
 else{outline(x,y,rr*.84,C.sides);g.lineWidth=1;g.strokeStyle=rim;g.stroke()}
 g.fillStyle=INK;g.font=`900 ${Math.max(11,Math.round(rr*.62))}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(C.t,x,y+1)}
/* n cells in a row (wide) or a 2-column grid (narrow) */
function grid(n,top,h){const cols=A.narrow&&n>2?2:n,gap=10,w=(A.W-16-gap*(cols-1))/cols;return[...Array(n)].map((_,i)=>({i,x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const coinR=b=>Math.min(b.w*.42,b.h*.42);
/* 1. find the coin */
const findCells=()=>grid(4,A.H*.2,A.narrow?A.H*.3:A.H*.5);
function drawFind(){const s=S.find;felt();if(s.i>=D.FIND.length){sign('All 5 coins found',A.W/2,A.H*.18,{ok:1});sign('Look at the number, colour and shape',A.W/2,A.H*.42,{n:13});return}
 const F=D.FIND[s.i];sign(`Coin ${s.i+1} of ${D.FIND.length}: find the ${D.COIN[F.want].t}`,A.W/2,A.H*.09,{n:15});
 findCells().forEach(b=>{cell(b,{no:s.miss===b.i});money(F.show[b.i],b.x+b.w/2,b.y+b.h/2,coinR(b))})}
function findTap(k){const s=S.find;if(s.i>=D.FIND.length)return;const F=D.FIND[s.i],got=F.show[k];
 if(got!==F.want){s.miss=k;A.sound.miss();return say(`That is the ${D.COIN[got].t}. ${D.LOOKS[F.want]}`)}
 s.miss=-1;s.i++;A.sound.pop();say(`Yes, that is the ${D.COIN[got].t}: ${D.COIN[got].say}.`+(s.i<D.FIND.length?' Find the next coin.':''))}
/* 2. which is worth more */
const moreCells=()=>grid(2,A.H*.22,A.H*.5);
function drawMore(){const s=S.more;felt();if(s.i>=D.PAIRS.length){sign('All 5 pairs done',A.W/2,A.H*.18,{ok:1});sign('Bigger does not mean worth more',A.W/2,A.H*.42,{n:13});return}
 const P=D.PAIRS[s.i],flip=s.i%2,two=flip?[P[1],P[0]]:P;sign(`Pair ${s.i+1} of ${D.PAIRS.length}: which is worth more?`,A.W/2,A.H*.09,{n:14});
 moreCells().forEach(b=>{cell(b,{no:s.miss===b.i});money(two[b.i],b.x+b.w/2,b.y+b.h/2,Math.min(b.w*.3,b.h*.45))});s.two=two}
function moreWhy(lo,hi){const L=D.COIN[lo],H=D.COIN[hi];if(H.note)return`The ${L.t} coin feels heavy, but the ${H.t} note is worth more: 5 pounds is more than 2 pounds.`;
 if(hi===100)return`The ${L.t} is bigger, but £1 is one pound: 100 pence. That is more than ${L.t}.`;
 return L.mm>H.mm?`The ${L.t} is bigger, but it is worth less. ${H.v} is more than ${L.v}, so the ${H.t} is worth more.`:`Look at the numbers: ${H.v} is more than ${L.v}.`}
function moreTap(k){const s=S.more;if(s.i>=D.PAIRS.length)return;const P=D.PAIRS[s.i],two=s.i%2?[P[1],P[0]]:P,hi=Math.max(...P),lo=Math.min(...P);
 if(two[k]!==hi){s.miss=k;A.sound.miss();return say(moreWhy(lo,hi))}
 s.miss=-1;s.i++;A.sound.pop();say(`Yes: the ${D.COIN[hi].t} is worth more than the ${D.COIN[lo].t}.`+(s.i<D.PAIRS.length?' Next pair.':''))}
/* 3. line up from least to most */
const lineTop=()=>grid(4,A.H*.17,A.narrow?A.H*.2:A.H*.3);
const slotRow=()=>{const n=4,gap=6,w=(A.W-16-gap*(n-1))/n,h=Math.min(w,A.H*.2);return[...Array(n)].map((_,i)=>({i,x:8+i*(w+gap),y:A.H*.7,w,h}))};
function drawLine(){const s=S.line,g=A.ctx;felt();if(s.r>=D.LINE.length){sign('Both rows lined up',A.W/2,A.H*.18,{ok:1});sign('1p, 2p, 5p, 10p, 20p, 50p, £1, £2',A.W/2,A.H*.42,{n:13});return}
 const row=D.LINE[s.r];sign(`Row ${s.r+1} of ${D.LINE.length}: tap from least money to most`,A.W/2,A.H*.07,{n:13});
 lineTop().forEach(b=>{if(s.placed.includes(row[b.i]))return;cell(b,{no:s.miss===b.i});money(row[b.i],b.x+b.w/2,b.y+b.h/2,coinR(b))});
 g.fillStyle=INK;g.font=`800 ${sz(12)}${FONT}`;g.textAlign='left';g.textBaseline='middle';
 slotRow().forEach((b,j)=>{cell(b,{ok:j<s.placed.length});if(j<s.placed.length)money(s.placed[j],b.x+b.w/2,b.y+b.h/2,coinR(b));else{g.fillStyle='#475569';g.textAlign='center';g.fillText(j===0?'least':j===3?'most':'',b.x+b.w/2,b.y+b.h/2)}})}
function lineTap(k){const s=S.line;if(s.r>=D.LINE.length)return;const row=D.LINE[s.r],v=row[k];if(s.placed.includes(v))return;
 const want=Math.min(...row.filter(x=>!s.placed.includes(x)));
 if(v!==want){s.miss=k;A.sound.miss();return say(`Not yet. The ${D.COIN[want].t} is worth less than the ${D.COIN[v].t}. Tap the coin worth the least first.`)}
 s.miss=-1;s.placed.push(v);A.sound.tick();
 if(s.placed.length<row.length)return say(`${D.COIN[v].t} goes next. Now the next smallest value.`);
 const done=s.placed.map(x=>D.COIN[x].t).join(', ');s.r++;s.placed=[];A.sound.pop();say(`Lined up: ${done}.`+(s.r<D.LINE.length?' Now the next row.':''))}
/* 4. swap one coin for small coins */
const trayBox=()=>({x:A.W*.4,y:A.H*.2,w:A.W*.58,h:A.H*.46});
const pileBox=()=>({x:A.W*.4,y:A.H*.71,w:A.W*.58,h:Math.min(A.H*.2,74)});
const traySpots=n=>{const T=trayBox(),cols=5,cw=T.w/cols,rh=T.h/2;return[...Array(n)].map((_,i)=>({x:T.x+cw*(i%cols)+cw/2,y:T.y+rh*Math.floor(i/cols)+rh/2,r:Math.min(cw,rh)*.44}))};
function drawSwap(){const s=S.swap,g=A.ctx;felt();if(s.i>=D.SWAP.length){sign('All 4 swaps made',A.W/2,A.H*.18,{ok:1});sign('One coin can be worth lots of small coins',A.W/2,A.H*.42,{n:13});return}
 const W=D.SWAP[s.i],B=D.COIN[W.big],sm=D.COIN[W.small],got=s.n*W.small,T=trayBox(),P=pileBox();
 sign(`Swap ${s.i+1} of ${D.SWAP.length}: make ${B.t} with ${sm.t} coins`,A.W/2,A.H*.08,{n:13});
 const L={x:8,y:T.y,w:A.W*.4-18,h:T.h};cell(L);money(W.big,L.x+L.w/2,L.y+L.h*.45,Math.min(L.w*.4,L.h*.36));sign(`worth ${B.t}`,L.x+L.w/2,L.y+L.h*.88,{n:11});
 cell(T,{ok:got===W.big,no:got>W.big});traySpots(s.n).forEach(q=>money(W.small,q.x,q.y,q.r*28.4/sm.mm));
 sign(`Tray: ${got}p`,T.x+T.w/2,T.y+T.h+0,{n:12,ok:got===W.big,no:got>W.big});
 cell(P);[0,1,2].forEach(k=>money(W.small,P.x+28+k*6,P.y+P.h/2-k*3,Math.min(P.h*.4,24)*28.4/sm.mm*.8));
 g.fillStyle=INK;g.font=`800 ${sz(13)}${FONT}`;g.textAlign='left';g.textBaseline='middle';g.fillText(`Tap to add a ${sm.t}`,P.x+64,P.y+P.h/2)}
function swapAdd(){const s=S.swap;if(s.i>=D.SWAP.length)return;const W=D.SWAP[s.i];if(s.n>=10)return say('The tray is full. Tap a coin in the tray to take one out.');
 s.n++;A.sound.tick();const got=s.n*W.small;
 if(got<W.big)return say(`${s.n} × ${D.COIN[W.small].t} = ${got}p. Keep going to ${D.COIN[W.big].t}.`);
 if(got>W.big){A.sound.miss();return say(`Too much: ${got}p is more than ${D.COIN[W.big].t}. Tap a coin in the tray to take one out.`)}
 const msg=`Same value: ${s.n} ${D.COIN[W.small].t} coins make ${D.COIN[W.big].t}, the same as one ${D.COIN[W.big].t} coin.`;s.i++;s.n=0;A.sound.pop();say(msg+(s.i<D.SWAP.length?' Next swap.':''))}
function swapTake(){const s=S.swap;if(s.i>=D.SWAP.length||!s.n)return;s.n--;A.sound.tick();say(`Took one out. Tray: ${s.n*D.SWAP[s.i].small}p.`)}
/* 5. robot */
const rightSlip=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.72,w,h:Math.min(A.H*.18,62)}))};
function drawRobot(){const s=S.robot,g=A.ctx;felt();if(s.i>=D.ROBOT.length){sign('All 5 sayings checked',A.W/2,A.H*.16,{ok:1});sign('Look at the number on each coin',A.W/2,A.H*.4,{n:13});return}
 const R=D.ROBOT[s.i],x=A.W/2,y=A.H*.2,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';A.paint.rrect(x-u,y-u,u*2,u*2,8);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.beginPath();g.arc(x-u*.4,y-u*.15,u*.16,0,7);g.arc(x+u*.4,y-u*.15,u*.16,0,7);g.fill();g.fillRect(x-u*.4,y+u*.42,u*.8,3);
 sign(R.say,A.W/2,A.H*.44,{n:12});sign(`Saying ${s.i+1} of ${D.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.58,{n:12});
 rightSlip().forEach(b=>{cell(b,{no:s.miss===b.i});g.fillStyle=INK;g.font=`800 ${sz(16)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function robotTap(k){const s=S.robot;if(s.i>=D.ROBOT.length)return;const R=D.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return say(R.ok?`Think again. ${R.fix}`:`Look closely at that saying. ${R.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=scene();if(k==='quiz'){felt();sign('Challenge',A.W/2,A.H*.22,{ok:1});sign('Coin expert time',A.W/2,A.H*.5,{n:13});return}
 ({find:drawFind,more:drawMore,line:drawLine,swap:drawSwap,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* every tap on the canvas goes to the scene that is showing */
function onDown(p){const k=scene();
 if(k==='find'){const b=findCells().find(q=>inside(p,q));if(b)findTap(b.i)}
 else if(k==='more'){const b=moreCells().find(q=>inside(p,q));if(b)moreTap(b.i)}
 else if(k==='line'){const b=lineTop().find(q=>inside(p,q));if(b)lineTap(b.i)}
 else if(k==='swap'){if(inside(p,pileBox()))swapAdd();else if(inside(p,trayBox()))swapTake()}
 else if(k==='robot'){const b=rightSlip().find(q=>inside(p,q));if(b)robotTap(b.i)}
 return false}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{find:{i:0,miss:-1},more:{i:0,miss:-1},line:{r:0,placed:[],miss:-1},swap:{i:0,n:0},robot:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
/* the buttons under the canvas mirror every canvas action */
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='find'&&S.find.i<D.FIND.length){const F=D.FIND[S.find.i];F.show.forEach((v,i)=>b(D.COIN[v].t,()=>findTap(i),`Find the ${D.COIN[F.want].t}: tap ${D.COIN[v].say}`))}
 if(k==='more'&&S.more.i<D.PAIRS.length){const P=D.PAIRS[S.more.i],two=S.more.i%2?[P[1],P[0]]:P;two.forEach((v,i)=>b(D.COIN[v].t,()=>moreTap(i),`${D.COIN[v].say} is worth more`))}
 if(k==='line'&&S.line.r<D.LINE.length){const row=D.LINE[S.line.r];row.forEach((v,i)=>{if(!S.line.placed.includes(v))b(D.COIN[v].t,()=>lineTap(i),`Put ${D.COIN[v].say} next`)})}
 if(k==='swap'&&S.swap.i<D.SWAP.length){const W=D.SWAP[S.swap.i];b(`Add a ${D.COIN[W.small].t}`,swapAdd);b('Take one out',swapTake,`Take a ${D.COIN[W.small].t} out of the tray`)}
 if(k==='robot'&&S.robot.i<D.ROBOT.length){b('✓ Right',()=>robotTap(0),'The robot is right');b('✗ Slip',()=>robotTap(1),'The robot made a slip')}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(D.DESC[i]);S.hook=finish(i,ok,D.DONE[i])}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Find the coin',p:'Every coin has a number on it. Look at the number, the colour and the shape. Tap the coin we ask for.',task:'Find all 5 coins',
 show:()=>play(0,D.FIND.map(F=>()=>findTap(F.show.indexOf(F.want))),600),go:()=>begin(0,()=>S.find.i>=D.FIND.length)},
{h:'Which is worth more?',p:'Tap the coin that is worth more money. Watch out: a big coin is not always worth more.',
 predict:{q:'Which is worth more: the big 2p or the small 5p?',opts:['The big 2p','The small 5p'],ans:1},task:'Do all 5 pairs',
 show:()=>play(1,D.PAIRS.map((P,i)=>()=>moreTap((i%2?[P[1],P[0]]:P).indexOf(Math.max(...P)))),600),go:()=>begin(1,()=>S.more.i>=D.PAIRS.length)},
{h:'Line them up',p:'Tap the coins in order, from the least money to the most.',task:'Line up both rows',
 show:()=>play(2,D.LINE.flatMap(row=>[...row].sort((a,b)=>a-b).map(v=>()=>lineTap(D.LINE[S.line.r]?D.LINE[S.line.r].indexOf(v):0))),380),go:()=>begin(2,()=>S.line.r>=D.LINE.length)},
{h:'Swap it',p:'One coin can be worth the same as lots of small coins. Tap the pile to put small coins in the tray until it matches.',
 predict:{q:'Which is more money: one 10p coin, or ten 1p coins?',opts:['Ten 1p coins','They are the same'],ans:1},task:'Make all 4 swaps',
 show:()=>play(3,D.SWAP.flatMap(W=>[...Array(W.big/W.small)].map(()=>swapAdd)),170),go:()=>begin(3,()=>S.swap.i>=D.SWAP.length)},
{h:'Check the robot',p:'The robot says things about coins. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>play(4,D.ROBOT.map(R=>()=>robotTap(R.ok?0:1)),600),go:()=>begin(4,()=>S.robot.i>=D.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function why(t){let m='Look at the number on the coin. That tells you what it is worth.';
 if(t==='size')m='Size does not tell you the value. Look at the number: a small 5p is worth more than a big 2p.';
 if(t==='same')m='They are not the same. Look at the numbers and see which one is more.';
 if(t==='count')m='Count in 1s: ten 1p coins make 10p. Each 1p is worth one penny.';
 if(t==='many')m='More coins is not always more money. One 20p is 20p, but three 1p coins are only 3p.';
 if(t==='look')m='The 20p and 50p have 7 flat sides. The 50p is the bigger one and worth more.';
 if(t==='pound')m='£1 means one pound, and one pound is 100 pence. So £1 is worth more than 50p.';
 return m}
function ask(){turn++;const Q=D.QS[turn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{quiz.hidden=x.step!==5;pad.hidden=x.step===5;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Coin values lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down:onDown});buttons()}}).start()})})();
