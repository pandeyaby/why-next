/* Flagship – writing my name (ages 4–5; EYFS Development Matters 2021 and ELG Writing; DfE Writing framework 2025).
   Scenes: pick your name card out of near misses (same first letter, same letters in another order, one extra letter),
   build Leo from big and small letter tiles (a capital first, then small letters, left to right), swap mixed-up letters
   back into the name's order, trace Leo from each letter's start dot, and make your own name card. Every drag or tap
   has a labelled button twin. Data, glyph paths and drawings in learn/myname_art.js. */
(()=>{const {box,inside,kit,ROUNDS,TILES,NAME,MIXED,glyph,START,DESC,DONE,QS,face,peg,lines}=MYN;
VIS.reg('flagmyname',c=>{let A,T,pad,chal,qi=-1,gen=0;c.fig.classList.add('young');
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',wall:'#fef3c7',desk:'#ecfccb',pen:'#1d4ed8',go:'#16a34a',dots:'#64748b'};
const st={};const sc=()=>['find','build','order','trace','mine','quiz'][A.step];
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r,big=ch=>ch!==ch.toLowerCase(),say1=ch=>(big(ch)?'big ':'small ')+ch;
/* ---------- 1: find the name card ---------- */
const cardB=i=>{const cw=A.W*.29,ch=A.H*.17,col=i%3,row=Math.floor(i/3);return box(A.W*(.035+col*.325),A.H*(.36+row*.3),cw,ch)};
function drawFind(){const g=A.ctx,R=ROUNDS[Math.min(st.round,1)];g.fillStyle=K.wall;g.fillRect(0,0,A.W,A.H);
 face(g,A.W*.14,A.H*.14,A.H*.08,R.face==='#a16207'?'#d6a77a':'#fde3c8',R.face);T.words(`This is ${R.who}.`,A.W*.56,A.H*.08,15);
 const m=box(A.W*.38,A.H*.13,A.W*.36,A.H*.1);T.card(m,'#ffffff','');T.words(R.who,m.x+m.w/2,m.y+m.h/2,20);
 if(st.round>1){T.words('✓ Both name cards found',A.W/2,A.H*.6,16,{c:K.ok});return}
 R.cards.forEach(([t],i)=>{const b=cardB(i),bad=st.bad===i;peg(g,b.x+b.w/2,b.y-A.H*.035,A.H*.018);T.card(b,'#ffffff',bad?'ko':'');T.words((bad?'✗ ':'')+t,b.x+b.w/2,b.y+b.h/2,20)});
 T.words(`Found: ${st.round} of 2`,A.W/2,A.H*.95,13,{b:700})}
function pickCard(i){if(st.round>1)return;const R=ROUNDS[st.round],[t,s]=R.cards[i];
 if(s){st.bad=i;A.sound.miss();return say(slip(s,t,R.who))}st.bad=-1;st.round++;A.sound.pop();
 say(`Yes! That card says ${R.who}: ${R.who.split('').join(', ')}. Every letter matches.`+(st.round<2?' Now find Ava’s card.':''))}
/* ---------- 2: build Leo from tiles ---------- */
const slotB=i=>{const w=A.W*.25;return box(A.W/2-w*1.58+i*w*1.08,A.H*.17,w,A.H*.3)},tileB=i=>{const w=A.W*.24,col=i%3,row=Math.floor(i/3);return box(A.W*(.07+col*.31),A.H*(.62+row*.18),w,A.H*.14)};
function drawBuild(){const g=A.ctx;g.fillStyle=K.desk;g.fillRect(0,0,A.W,A.H);T.tag('Card: Leo',A.W*.5,A.H*.08,13);
 for(let i=0;i<3;i++){const b=slotB(i),ch=st.slots[i];T.card(b,'#ffffff',st.badSlot===i?'ko':i===st.slots.length?'sel':'');const lh=b.h*.6,ly=b.y+b.h*.22;lines(g,b.x+6,ly,b.w-12,lh);if(ch){g.font=`600 ${Math.round(lh/.72)}px system-ui,sans-serif`;g.fillStyle=K.pen;g.textAlign='center';g.textBaseline='alphabetic';g.fillText(ch,b.x+b.w/2,ly+lh)}}
 TILES.forEach((ch,i)=>{if(st.used.includes(i))return;let b=tileB(i);if(st.drag&&st.drag.i===i)b=box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h);
  T.card(b,'#ffffff',st.drag&&st.drag.i===i||st.selT===i?'sel':st.badT===i?'ko':'');T.words(ch,b.x+b.w/2,b.y+b.h*.45,26);T.words(big(ch)?'big':'small',b.x+b.w/2,b.y+b.h*.84,9,{b:700})});
 T.words(st.slots.length===3?'✓ That says Leo!':`Letters: ${st.slots.length} of 3`,A.W/2,A.H*.56,13,{b:700,c:st.slots.length===3?K.ok:K.ink})}
function place(i,slot){if(st.slots.length>=3)return;const k=st.slots.length,ch=TILES[i],want=NAME[k];if(slot==null)slot=k;st.badSlot=-1;st.badT=-1;
 if(slot>k){st.badSlot=slot;A.sound.miss();return say(slip('left'))}if(slot<k)return say('That box is full. Put the next letter in the next box.');
 if(ch!==want){st.badT=i;A.sound.miss();if(ch.toLowerCase()===want.toLowerCase())return say(slip(k?'capmid':'small1',want));return say(slip('next',want,k?NAME[k-1]:''))}
 st.slots.push(ch);st.used.push(i);st.selT=-1;A.sound.pop();say(st.slots.length===3?'L, e, o. That says Leo! A big L first, then small letters.':`Yes: ${say1(ch)}. What comes next on the card?`)}
/* ---------- 3: letters in order ---------- */
const mixB=i=>{const w=A.W*.24;return box(A.W/2-w*1.62+i*w*1.12,A.H*.4,w,A.H*.24)};
function drawOrder(){const g=A.ctx;g.fillStyle=K.wall;g.fillRect(0,0,A.W,A.H);if(st.r>=MIXED.length){T.words('✓ All 3 names fixed',A.W/2,A.H*.5,16,{c:K.ok});return}
 const M=MIXED[st.r];T.words('The name card says:',A.W/2,A.H*.08,13,{b:700});const m=box(A.W*.32,A.H*.14,A.W*.36,A.H*.13);T.card(m,'#ffffff','');T.words(M.n,m.x+m.w/2,m.y+m.h/2,22);
 st.t.forEach((ch,i)=>{let b=mixB(i);if(st.drag&&st.drag.i===i)b=box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h);T.card(b,'#ffffff',st.sel===i||(st.drag&&st.drag.i===i)?'sel':ch===M.n[i]?'ok':'');T.words(ch,b.x+b.w/2,b.y+b.h/2,30,{c:K.pen})});
 T.words(`Says: ${st.t.join('')}`,A.W/2,A.H*.74,15);T.words(`Names fixed: ${st.r} of ${MIXED.length}`,A.W/2,A.H*.93,13,{b:700})}
function loadMix(){const M=MIXED[st.r];st.t=M?M.t.slice():[];st.sel=-1}
function swap(i,j){if(st.r>=MIXED.length||i===j)return;const t=st.t;[t[i],t[j]]=[t[j],t[i]];st.sel=-1;st.swaps++;A.sound.tick();const M=MIXED[st.r];
 if(t.join('')===M.n){st.r++;A.sound.pop();loadMix();return say(`Now it says ${M.n}: ${M.n.split('').join(', ')}, in order.`+(st.r<MIXED.length?' Fix the next name.':''))}
 say(`It says ${t.join('')}. That is not ${M.n} yet: the letters are not in the card’s order.`)}
function tapMix(i){if(st.sel<0){st.sel=i;A.sound.tick();return say(`${say1(st.t[i])} picked. Tap where it should go.`)}swap(st.sel,i)}
/* ---------- 4: trace Leo ---------- */
function layout(){const h=Math.min(A.H*.5,A.W*.4),ws=[.62,.66,.66].map(k=>k*h),gap=h*.12,tot=ws.reduce((a,b)=>a+b)+gap*2;let x=(A.W-tot)/2;const y=A.H*.24;
 return NAME.split('').map((ch,i)=>{const b=box(x,y,ws[i],h);x+=ws[i]+gap;const P=glyph(ch).map(([u,v])=>({x:b.x+u*b.w,y:b.y+v*b.h}));return{ch,b,P}})}
function drawTrace(){const g=A.ctx,L=layout(),h=L[0].b.h;g.fillStyle=K.desk;g.fillRect(0,0,A.W,A.H);lines(g,A.W*.05,L[0].b.y,A.W*.9,h);
 L.forEach((Lt,i)=>{const done=i<st.tr,P=Lt.P,upto=done?P.length-1:i===st.tr?Math.floor(st.prog):-1;g.lineCap='round';g.lineJoin='round';
  g.setLineDash([2,9]);g.strokeStyle=K.dots;g.lineWidth=5;g.beginPath();P.forEach((p,k)=>k?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke();g.setLineDash([]);
  if(upto>0){g.strokeStyle=done?K.ok:K.pen;g.lineWidth=9;g.beginPath();for(let k=0;k<=upto;k++)k?g.lineTo(P[k].x,P[k].y):g.moveTo(P[k].x,P[k].y);g.stroke()}
  if(!done){g.fillStyle=K.go;g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.arc(P[0].x,P[0].y,A.W*.022+4,0,7);g.fill();g.stroke();
   const a=Math.atan2(P[2].y-P[0].y,P[2].x-P[0].x);g.strokeStyle=K.go;g.lineWidth=3;g.beginPath();g.moveTo(P[0].x+Math.cos(a)*14,P[0].y+Math.sin(a)*14);g.lineTo(P[0].x+Math.cos(a)*30,P[0].y+Math.sin(a)*30);g.stroke()}
  T.words(done?'✓':String(i+1),Lt.b.x+Lt.b.w/2,Lt.b.y-A.H*.07,13,{c:done?K.ok:K.ink})});
 T.words(st.tr>=3?'✓ You traced Leo, left to right':`Trace ${NAME[st.tr]}: start ${START[NAME[st.tr]]}, at the green dot`,A.W/2,A.H*.9,13,{w:A.W-20,b:700,c:st.tr>=3?K.ok:K.ink})}
function finishLetter(){const ch=NAME[st.tr];st.tr++;st.prog=0;st.drag=null;A.sound.pop();say(st.tr>=3?'L, e, o: you traced Leo from left to right. Each letter began at its start dot.':`${say1(ch)} done. Next: ${say1(NAME[st.tr])}. It starts ${START[NAME[st.tr]]}.`)}
function autoTrace(){if(st.tr>=3||st.anim)return;const n=layout()[st.tr].P.length-1;st.anim=true;st.prog=0;A.tween(st,{prog:n},450,'io',()=>{st.anim=false;finishLetter()})}
/* ---------- 5: my own name card ---------- */
const nameB=()=>box(A.W*.08,A.H*.2,A.W*.84,A.H*.42);
function drawMine(){const g=A.ctx,b=nameB();g.fillStyle=K.wall;g.fillRect(0,0,A.W,A.H);T.words('My name card',A.W/2,A.H*.1,15);T.card(b,'#ffffff',st.ok?'ok':st.badM?'ko':'');
 lines(g,b.x+12,b.y+b.h*.2,b.w-24,b.h*.6);const s=st.mine||'';T.words(s||'…',b.x+b.w/2,b.y+b.h*.58,s.length>7?26:34,{c:K.pen});
 T.tag(st.capsOn?'Letters: BIG':'Letters: small',A.W/2,A.H*.72,12,'');T.words(st.ok?`✓ That says ${s}!`:'Tap the card to rub out a letter',A.W/2,A.H*.86,12,{b:700,c:st.ok?K.ok:K.ink,w:A.W-20})}
function key(ch){if(st.ok)return;st.badM=false;const s=st.mine,first=!s||s.endsWith('-');
 if(ch==='-'){if(!s||s.endsWith('-'))return;st.mine+='-';return say(`It says ${st.mine}`)}
 if(first&&!big(ch)){st.badM=true;A.sound.miss();return say(slip('small1',ch.toUpperCase()))}
 if(!first&&big(ch)){st.badM=true;A.sound.miss();return say(slip('capmid',ch.toLowerCase()))}
 if(s.length>=12)return;st.mine+=ch;A.sound.tick();if(first&&st.capsOn){st.capsOn=false}say(`It says ${st.mine}`+(first?'. Now small letters.':''))}
function rub(){if(st.ok||!st.mine)return;st.mine=st.mine.slice(0,-1);if(!st.mine||st.mine.endsWith('-'))st.capsOn=true;say(st.mine?`It says ${st.mine}`:'The card is empty. Start with a big letter.')}
function finish(){const s=st.mine;if(s.replace('-','').length<2){A.sound.miss();return say('Write every letter of your name first. Look at your name card if you have one.')}
 if(s.endsWith('-'))return say('Finish the name after the dash.');st.ok=true;A.sound.pop();say(`That says ${s}. You wrote your name!`)}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Look at the name card again, letter by letter.';
 if(t==='same1')m=`${a} starts like ${b}, but look at every letter. ${a} is not ${b}.`;
 if(t==='order')m=`${a||'It'} has the same letters, but in a different order. A name keeps its letters in one order.`;
 if(t==='extra')m=`${a||'It'} has one letter too many. ${b||'Leo'} has ${(b||'Leo').length} letters.`;
 if(t==='other')m=`${a||'It'} starts with a different letter. ${b||'Leo'} starts with ${(b||'Leo')[0]}.`;
 if(t==='first')m='Leo starts with L. Look at the first letter on his card.';
 if(t==='small1')m=`A name starts with a big letter, a capital. Use big ${a||'L'}.`;
 if(t==='capmid')m=`Only the first letter is big. After it, use small letters, like small ${a||'e'}.`;
 if(t==='next')m=b?`Look at the card: after ${b} comes ${a}.`:`Leo starts with ${a}. Look at the first letter on the card.`;
 if(t==='left')m='Write from left to right. Fill the first empty box, on the left.';
 if(t==='right')m='We write from left to right. Start on the left of the line.';
 if(t==='lefttrace')m=`Trace from left to right. ${NAME[st.tr]||'L'} comes first.`;
 if(t==='start')m=`Start at the green dot. ${a} starts ${START[a]}.`;
 if(t==='bottom')m='o starts at the top. Go round the way of a c, back to the top.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=sc();if(k==='quiz'){const g=A.ctx;g.fillStyle=K.wall;g.fillRect(0,0,A.W,A.H);T.words('Challenge',A.W/2,A.H*.4,22);T.words('Find · Capital · Order · Trace',A.W/2,A.H*.55,13,{w:A.W-20});return}
 ({find:drawFind,build:drawBuild,order:drawOrder,trace:drawTrace,mine:drawMine})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sc();
 if(k==='find'){if(st.round>1)return false;for(let i=0;i<6;i++)if(inside(p,cardB(i)))pickCard(i);return false}
 if(k==='build'){const i=TILES.findIndex((_,n)=>!st.used.includes(n)&&inside(p,tileB(n)));if(i>=0){st.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const s=[0,1,2].find(n=>inside(p,slotB(n)));if(s!=null&&st.selT>=0)place(st.selT,s);return false}
 if(k==='order'){if(st.r>=MIXED.length)return false;const i=[0,1,2].find(n=>inside(p,mixB(n)));if(i==null)return false;st.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(k==='trace'){if(st.tr>=3||st.anim)return false;const L=layout(),R=Math.max(22,A.W*.05),cur=L[st.tr];if(near(p,cur.P[0],R)){st.drag={};st.prog=0;return true}
  if(L.some((o,i)=>i>st.tr&&inside(p,o.b))){A.sound.miss();say(slip('lefttrace'));return false}
  if(inside(p,box(cur.b.x-R,cur.b.y-R,cur.b.w+2*R,cur.b.h+2*R))){A.sound.miss();say(slip('start',cur.ch))}return false}
 if(k==='mine'){if(inside(p,nameB()))rub();return false}return false}
function move(p){const d=st.drag;if(!d)return;const k=sc();
 if(k==='trace'){const P=layout()[st.tr].P,R=Math.max(22,A.W*.05);for(let j=1;j<=4;j++){const n=Math.floor(st.prog)+j;if(n<P.length&&near(p,P[n],R)){st.prog=n;break}}if(st.prog>=P.length-1)return finishLetter();return A.redraw()}
 d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=sc();
 if(k==='trace'){if(st.tr<3&&st.prog>0){st.prog=0;say(`Keep going to the end of ${NAME[st.tr]}. Start again at the green dot.`)}return A.redraw()}
 const moved=Math.hypot(p.x-d.x0,p.y-d.y0)>12;
 if(k==='build'){if(!moved){st.selT=d.i;A.sound.tick();say(`${say1(TILES[d.i])} picked. Tap a box, or use the buttons.`);return}const s=[0,1,2].find(n=>inside(p,slotB(n)));if(s!=null)return place(d.i,s);return A.redraw()}
 if(k==='order'){if(!moved)return tapMix(d.i);const j=[0,1,2].find(n=>inside(p,mixB(n)));if(j!=null&&j!==d.i)return swap(d.i,j);return A.redraw()}A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=sc(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='find'&&st.round<2)ROUNDS[st.round].cards.forEach(([t],i)=>b(t,()=>pickCard(i),`Card that says ${t}`));
 if(k==='build'&&st.slots.length<3)TILES.forEach((ch,i)=>{if(!st.used.includes(i))b(ch,()=>place(i),`Put ${say1(ch)} in the next box`)});
 if(k==='order'&&st.r<MIXED.length)[[0,1],[1,2],[0,2]].forEach(([i,j])=>b(`Swap ${st.t[i]} and ${st.t[j]}`,()=>swap(i,j)));
 if(k==='trace'&&st.tr<3)b(`Trace ${NAME[st.tr]}`,autoTrace,`Trace ${say1(NAME[st.tr])}, starting ${START[NAME[st.tr]]}`);
 if(k==='mine'&&!st.ok){b(st.capsOn?'Use small letters':'Use BIG letters',()=>{st.capsOn=!st.capsOn;say(st.capsOn?'Big letters on.':'Small letters on.')});
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(ch=>{const L=st.capsOn?ch.toUpperCase():ch;b(L,()=>key(L),say1(L))});b('-',()=>key('-'),'Dash, for names like Mary-Jane');b('Rub out',rub,'Rub out the last letter');b('Finished',finish,'Finished my name card')}}
function reset(){gen++;for(const x in st)delete st[x];Object.assign(st,{round:0,bad:-1,slots:[],used:[],selT:-1,badT:-1,badSlot:-1,r:0,t:[],sel:-1,swaps:0,tr:0,prog:0,anim:false,mine:'',capsOn:false,ok:false,badM:false,drag:null,hook:()=>{}});loadMix()}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();say(DESC[i]);st.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function fixAll(){const out=[];MIXED.forEach((M,r)=>{const t=M.t.slice();for(let i=0;i<t.length;i++){const j=t.indexOf(M.n[i],i);if(j!==i){out.push(()=>swap(i,j));[t[i],t[j]]=[t[j],t[i]]}}});return out}
const steps=[
{h:'Find my name card',p:'Leo’s card says Leo. Some cards look a bit like it. Tap the card that says Leo. Then find Ava’s card.',
 predict:{q:'Lee starts with L, like Leo. Is it Leo’s card?',opts:['Yes, it starts with L','No, check every letter'],ans:1},task:'Find 2 name cards',
 show:()=>demo(0,[()=>pickCard(2),()=>pickCard(2)],500),go:()=>begin(0,()=>st.round>=2)},
{h:'A big letter first',p:'Make Leo’s name. Drag a letter into the first empty box. Start on the left.',
 predict:{q:'Which letter starts Leo’s name?',opts:['Big L','Small l'],ans:0},task:'Build Leo',
 show:()=>demo(1,[()=>place(0),()=>place(2),()=>place(4)],500),go:()=>begin(1,()=>st.slots.length>=3)},
{h:'Letters in order',p:'These letters are mixed up. Tap two letters to swap them, or drag one onto another, until it says the name.',
 predict:{q:'e, L, o has all of Leo’s letters. Does it say Leo?',opts:['Yes, the letters are all there','No, the order is wrong'],ans:1},task:'Fix 3 names',
 show:()=>demo(2,fixAll(),420),go:()=>begin(2,()=>st.r>=MIXED.length)},
{h:'Trace my name',p:'Drag from each green dot along the dots. L, then e, then o: left to right.',
 predict:{q:'Where does the letter o start?',opts:['At the bottom','At the top'],ans:1},task:'Trace L, e and o',
 show:()=>demo(3,[0,1,2].map(()=>autoTrace),700),go:()=>begin(3,()=>st.tr>=3)},
{h:'My own name card',p:'Now write your own name. Start with a big letter, then small letters. Ask a grown-up if you need your name card.',task:'Write your name',
 show:()=>demo(4,[()=>{st.capsOn=true;buttons()},()=>key('A'),()=>key('v'),()=>key('a'),finish],350),go:()=>begin(4,()=>st.ok)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s,x,y])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,x,y,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,x,y,Q){chal.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s,x,y):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=kit(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Name writing lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
