/* Flagship – getting dressed by myself (ages 3–4; EYFS Development Matters 2021 PSED Managing Self: manage own needs,
   including dressing; ELG Managing Self). Scenes: dress a child inside layers first, spot tops with the label at the
   front, swap shoes until the sticker halves make a smiley, button a coat from the bottom, and order the coat flip.
   Data and drawings in learn/dress_art.js. */
(()=>{const {KIT,TOPS,BINS,PAIRS,FLIP,DESC,DONE,QS}=DRS;
VIS.reg('flagdress',c=>{let A,keysEl,qz,qk=-1,era=0;const S={};c.fig.classList.add('young');
const NAVY='#1e293b',GOOD='#047857',OOPS='#b91c1c',GREY='#64748b',SEL='#7c3aed',PX='px system-ui,sans-serif';
const now=()=>['dress','tops','shoes','buttons','flip','quiz'][A.step];
const em=n=>A.narrow?n:Math.round(n*1.15);
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const rect=(x,y,w,h)=>({x:x-w/2,y:y-h/2,w,h});
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fce7f3',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function say(t,x,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=`800 ${em(n)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=em(o.n||13);g.font=`800 ${n}${PX}`;let w=g.measureText(t).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${PX}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?OOPS:GREY;g.stroke();g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function pad(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.no||o.ok||o.on?4:2;g.strokeStyle=o.no?OOPS:o.ok?GOOD:o.on?SEL:GREY;g.stroke()}
function two(t,r,n){const ws=t.split(' '),h=Math.ceil(ws.length/2),a=ws.slice(0,h).join(' '),b=ws.slice(h).join(' '),cx=r.x+r.w/2;if(!b)return say(a,cx,r.y+r.h/2,n,NAVY);say(a,cx,r.y+r.h*.36,n,NAVY);say(b,cx,r.y+r.h*.68,n,NAVY)}
/* 1. inside layers first */
const body=()=>({x:A.W*.3,y:A.H*.16,u:Math.min(A.W*.16,A.H*.13)});
const kitR=()=>KIT.map((_,i)=>rect(A.W*.76,A.H*(.13+i*.18),Math.min(A.W*.38,160),A.H*.15));
const onBody=p=>{const K=body();return Math.abs(p.x-K.x)<K.u*1.1&&p.y>K.y-K.u*.6&&p.y<K.y+K.u*4.2};
function drawDress(){const s=S.a;paper();const on={};KIT.forEach(k=>on[k.k]=s.worn.includes(k.k));DRS.kid(A,body(),on);
 kitR().forEach((r,i)=>{if(s.worn.includes(KIT[i].k)||(S.drag&&S.drag.i===i))return;pad(r,{no:s.bad===i,on:s.pick===i});say(KIT[i].e+' '+KIT[i].t,r.x+r.w/2,r.y+r.h/2,15,NAVY)});
 if(S.drag){const r=kitR()[S.drag.i],q=rect(S.drag.x,S.drag.y,r.w,r.h);pad(q,{on:1});say(KIT[S.drag.i].e+' '+KIT[S.drag.i].t,S.drag.x,S.drag.y,15,NAVY)}
 tag(s.worn.length>=KIT.length?'All dressed!':'Drag the clothes onto the child',A.W/2,A.H*.05,{ok:s.worn.length>=KIT.length})}
function wear(i){const s=S.a,k=KIT[i];s.pick=null;if(s.worn.includes(k.k))return;const miss=k.need.find(n=>!s.worn.includes(n));
 if(miss){s.bad=i;A.sound.miss();const m=KIT.find(x=>x.k===miss);return tell(k.k==='coat'?`The coat goes on last. Put the ${m.t.toLowerCase()} on first.`:`${k.t} go over ${m.t.toLowerCase()}. Put the ${m.t.toLowerCase()} on first.`)}
 s.worn.push(k.k);s.bad=-1;A.sound.pop();tell(`${k.t} on.`+(s.worn.length>=KIT.length?' All dressed!':''))}
/* 2. label at the back */
function shelf(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.26}}
function topR(){const gap=10,w=Math.min(130,(A.W-gap*5)/4),h=Math.min(w*1.15,A.H*.34),x0=(A.W-(4*w+3*gap))/2;return TOPS.map((_,i)=>({i,x:x0+i*(w+gap),y:A.H*.5,w,h}))}
function drawTops(){const s=S.b,g=A.ctx;paper();
 BINS.forEach((t,k)=>{const r=shelf(k);g.fillStyle=k?(A.col.dark?'#7c2d12':'#fed7aa'):(A.col.dark?'#064e3b':'#bbf7d0');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?SEL:GREY;g.stroke();
  say((k?'🔄 ':'✅ ')+t,r.x+r.w/2,r.y+r.h*.22,14,A.col.dark?'#f8fafc':NAVY);say(String(s.put.filter(i=>TOPS[i].lab===k).length),r.x+r.w/2,r.y+r.h*.65,20,A.col.dark?'#f8fafc':NAVY)});
 topR().forEach(r=>{if(s.put.includes(r.i)||(S.drag&&S.drag.i===r.i))return;pad(r,{no:s.bad===r.i,on:s.pick===r.i});DRS.top(A,r,TOPS[r.i])});
 if(S.drag){const r=topR()[S.drag.i],q=rect(S.drag.x,S.drag.y,r.w,r.h);pad(q,{on:1});DRS.top(A,q,TOPS[S.drag.i])}
 tag(s.put.length>=TOPS.length?'All 4 checked':'Can you see the label? Then turn it round.',A.W/2,A.H*.045,{ok:s.put.length>=TOPS.length})}
function sortTop(i,k){const s=S.b;if(s.put.includes(i))return;s.pick=null;const lab=TOPS[i].lab;
 if(lab!==k){s.bad=i;A.sound.miss();return tell(lab?'Look at the neck: the label is at the front. This top is on back to front. Turn it round.':'No label at the front, and the star is on the front. This top is ready to go.')}
 s.put.push(i);s.bad=-1;A.sound.pop();tell((lab?'Label at the front: turn it round.':'Star at the front: ready to go.')+` ${s.put.length} of 4.`)}
/* 3. shoes on the right feet */
const feet=()=>{const u=Math.min(A.W*.16,A.H*.17);return{u,y:A.H*.45,l:A.W*.5-u*.55,r:A.W*.5+u*.55}};
const okKey=()=>rect(A.W/2,A.H*.86,Math.min(240,A.W*.62),A.H*.12);
function drawShoes(){const s=S.c,F=feet();paper();
 if(s.r>=PAIRS.length){tag('3 pairs on the right feet',A.W/2,A.H*.12,{ok:1});say('😊',A.W/2,A.H*.45,40);return}
 const sw=s.sw;tag(`Pair ${s.r+1} of 3: tap a shoe to swap them`,A.W/2,A.H*.07,{no:s.bad});
 DRS.shoe(A,F.l,F.y,F.u,sw,'#0ea5e9');DRS.shoe(A,F.r,F.y,F.u,!sw,'#0ea5e9');
 say(sw?'the halves face out':'the halves make a smiley',A.W/2,F.y+F.u*1.35,13,A.col.tx);const r=okKey();pad(r,{on:1});say('👟 Put them on',r.x+r.w/2,r.y+r.h/2,15,NAVY)}
function swap(){const s=S.c;if(s.r>=PAIRS.length)return;s.sw=!s.sw;s.bad=0;A.sound.tick();tell(s.sw?'Swapped. The sticker halves are apart now.':'Swapped. The two halves meet in the middle.')}
function putOn(){const s=S.c;if(s.r>=PAIRS.length)return;
 if(s.sw){s.bad=1;A.sound.miss();return tell('Not yet: the sticker halves are apart, so the shoes are on the wrong feet. Swap them.')}
 s.r++;s.bad=0;s.sw=!!PAIRS[s.r];A.sound.pop();tell(s.r>=PAIRS.length?'All 3 pairs on the right feet.':'Yes, a whole smiley: right feet. Next pair.')}
/* 4. buttons from the bottom */
const coat=()=>{const w=Math.min(A.W*.5,240),h=A.H*.62;return{x:A.W/2-w/2,y:A.H*.16,w,h}};
const btn=i=>{const C=coat();return{x:C.x+C.w*.38,y:C.y+C.h*(.85-i*.22),r:Math.min(C.w*.08,18)}};
const hole=i=>{const C=coat(),b=btn(i);return rect(C.x+C.w*.66,b.y,b.r*2.4,b.r*1.3)};
function drawButtons(){const s=S.d,g=A.ctx,C=coat();paper();g.fillStyle='#dc2626';A.paint.rrect(C.x,C.y,C.w,C.h,18);g.fill();g.strokeStyle='#7f1d1d';g.lineWidth=3;g.stroke();
 g.beginPath();g.moveTo(C.x+C.w*.52,C.y+8);g.lineTo(C.x+C.w*.52,C.y+C.h-8);g.stroke();
 for(let i=0;i<4;i++){const b=btn(i),h=hole(i),done=s.done.includes(i);g.fillStyle='#450a0a';A.paint.rrect(h.x,h.y,h.w,h.h,h.h/2);g.fill();
  const x=done?h.x+h.w/2:b.x;g.fillStyle=s.pick===i?'#c4b5fd':'#fde047';g.beginPath();g.arc(x,b.y,b.r,0,7);g.fill();g.lineWidth=s.bad===i?4:2;g.strokeStyle=s.bad===i?OOPS:'#713f12';g.stroke();say(String(i+1),x,b.y+1,12,NAVY)}
 tag(s.done.length>=4?'All buttoned, nothing wonky':s.pick!=null?'Now tap the hole next to it':'Tap a button, then the hole next to it',A.W/2,A.H*.07,{ok:s.done.length>=4})}
function pickBtn(i){const s=S.d;if(s.done.includes(i))return;const low=[0,1,2,3].find(j=>!s.done.includes(j));
 if(i!==low){s.bad=i;A.sound.miss();return tell(`Start at the bottom. Do button ${low+1} first, then go up one at a time.`)}
 s.pick=i;s.bad=-1;tell(`Button ${i+1} picked. Tap the hole next to it.`)}
function intoHole(j){const s=S.d;if(s.pick==null)return tell('Tap a button first.');const i=s.pick;
 if(j!==i){s.bad=i;s.pick=null;A.sound.miss();return tell(`That hole is ${j>i?'higher':'lower'} than button ${i+1}. The coat would be wonky. Use the hole right next to it.`)}
 s.done.push(i);s.pick=null;s.bad=-1;A.sound.pop();tell(`Button ${i+1} done.`+(s.done.length>=4?' All 4, nothing wonky.':''))}
/* 5. coat flip order */
const slotR=()=>FLIP.map((_,i)=>rect(A.W/2,A.H*(.14+i*.12),Math.min(A.W*.9,420),A.H*.1));
const deckR=()=>{const gap=8,w=Math.min(150,(A.W-gap*3-12)/2),h=A.H*.12;return FLIP.map((_,i)=>({i,x:(A.W-(2*w+gap))/2+(i%2)*(w+gap),y:A.H*.66+Math.floor(i/2)*(h+gap),w,h}))};
const SHUF=[2,0,3,1];
function drawFlip(){const s=S.e;paper();
 slotR().forEach((r,j)=>{const got=s.done.includes(j);pad(r,{ok:got,on:s.hot===j});say(got?`${j+1}. ${FLIP[j].e} ${FLIP[j].t}`:`${j+1}.  ?`,r.x+r.w/2,r.y+r.h/2,12,got?GOOD:NAVY)});
 deckR().forEach((r,k)=>{const i=SHUF[k];if(s.done.includes(i)||(S.drag&&S.drag.i===k))return;pad(r,{no:s.bad===i,on:s.pick===k});two(FLIP[i].e+' '+FLIP[i].t,r,12)});
 if(S.drag){const r=deckR()[S.drag.i],q=rect(S.drag.x,S.drag.y,r.w,r.h);pad(q,{on:1});two(FLIP[SHUF[S.drag.i]].e+' '+FLIP[SHUF[S.drag.i]].t,q,12)}
 tag(s.done.length>=4?'Coat flip ready':'Put the coat flip in order',A.W/2,A.H*.05,{ok:s.done.length>=4})}
function place(i,j){const s=S.e;if(s.done.includes(i))return;s.pick=null;
 if(i!==j){s.bad=i;A.sound.miss();return tell(i>j?`Not yet. First: ${FLIP[j].t.toLowerCase()}.`:`That comes earlier, before ${FLIP[i+1].t.toLowerCase()}.`)}
 s.done.push(i);s.bad=-1;A.sound.pop();tell(`${j+1}: ${FLIP[i].t}.`+(s.done.length>=4?' Now flip!':''))}
function draw(){const k=now();if(k==='quiz'){paper();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('I can get dressed by myself',A.W/2,A.H*.5,{n:14});return}
 ({dress:drawDress,tops:drawTops,shoes:drawShoes,buttons:drawButtons,flip:drawFlip})[k]();A.fx.draw(A.ctx)}
function hold(i,p){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
function down(p){const k=now();
 if(k==='dress'){const i=kitR().findIndex((r,i)=>isIn(p,r)&&!S.a.worn.includes(KIT[i].k));if(i>=0)return hold(i,p);if(S.a.pick!=null&&onBody(p))wear(S.a.pick);return false}
 if(k==='tops'){const r=topR().find(r=>isIn(p,r)&&!S.b.put.includes(r.i));if(r)return hold(r.i,p);const b=[0,1].find(j=>isIn(p,shelf(j)));if(b!=null&&S.b.pick!=null)sortTop(S.b.pick,b);return false}
 if(k==='shoes'){if(isIn(p,okKey()))return putOn(),false;const F=feet();if(Math.abs(p.y-F.y)<F.u*1.2&&Math.abs(p.x-A.W/2)<F.u*1.8)swap();return false}
 if(k==='buttons'){for(let i=0;i<4;i++){const b=btn(i);if(Math.hypot(p.x-b.x,p.y-b.y)<b.r*1.5)return pickBtn(i),false;if(isIn(p,rect(hole(i).x+hole(i).w/2,hole(i).y+hole(i).h/2,hole(i).w+16,hole(i).h+20)))return intoHole(i),false}return false}
 if(k==='flip'){const r=deckR().find(r=>isIn(p,r)&&!S.e.done.includes(SHUF[r.i]));if(r)return hold(r.i,p);const j=slotR().findIndex(r=>isIn(p,r));if(j>=0&&S.e.pick!=null)place(SHUF[S.e.pick],j);return false}
 return false}
function move(p){const d=S.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=now();
 if(k==='tops'){const h=[0,1].find(j=>isIn(p,shelf(j)));S.b.hot=h==null?-1:h}
 if(k==='flip')S.e.hot=slotR().findIndex(r=>isIn(p,r));A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=now();
 if(k==='dress'){if(onBody(p))return wear(d.i);if(tap){S.a.pick=d.i;return tell(`${KIT[d.i].t} picked. Now tap the child.`)}}
 if(k==='tops'){S.b.hot=-1;const b=[0,1].find(j=>isIn(p,shelf(j)));if(b!=null)return sortTop(d.i,b);if(tap){S.b.pick=d.i;return tell('Top picked. Now tap a box.')}}
 if(k==='flip'){S.e.hot=-1;const j=slotR().findIndex(r=>isIn(p,r));if(j>=0)return place(SHUF[d.i],j);if(tap){S.e.pick=d.i;return tell('Card picked. Now tap a numbered space.')}}A.redraw()}
function clear(){era++;for(const k in S)delete S[k];Object.assign(S,{a:{worn:[],bad:-1,pick:null},b:{put:[],bad:-1,hot:-1,pick:null},c:{r:0,sw:!!PAIRS[0],bad:0},d:{done:[],pick:null,bad:-1},e:{done:[],bad:-1,hot:-1,pick:null},drag:null,watch:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.watch()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){clear();tell(DESC[i]);S.watch=finish(i,ok)}
function auto(i,acts,ms){steps[i].go();const e0=era;acts.forEach((f,j)=>setTimeout(()=>{if(e0===era)f()},ms*(j+1)))}
function keys(){if(!keysEl)return;keysEl.innerHTML='';const k=now(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keysEl,t).onclick=f};
 if(k==='dress')KIT.forEach((it,i)=>{if(!S.a.worn.includes(it.k))K(`${it.e} Put on ${it.t.toLowerCase()}`,()=>wear(i))});
 if(k==='tops')TOPS.forEach((t,i)=>{if(!S.b.put.includes(i)){K(`Top ${i+1} → Ready`,()=>sortTop(i,0),`Top ${i+1}: ready to go`);K(`Top ${i+1} → Turn round`,()=>sortTop(i,1),`Top ${i+1}: turn it round`)}});
 if(k==='shoes'&&S.c.r<PAIRS.length){K('🔄 Swap the shoes',swap);K('👟 Put them on',putOn)}
 if(k==='buttons')[0,1,2,3].forEach(i=>{if(S.d.done.includes(i))return;if(S.d.pick==null)K(`Button ${i+1}`,()=>pickBtn(i),`Pick button ${i+1}`);else K(`Hole ${i+1}`,()=>intoHole(i),`Hole ${i+1}, next to button ${i+1}`)});
 if(k==='flip')FLIP.forEach((f,i)=>{if(!S.e.done.includes(i))[0,1,2,3].forEach(j=>{if(!S.e.done.includes(j)&&Math.abs(i-j)<=1)K(`${f.t} → ${j+1}`,()=>place(i,j),`${f.t}: step ${j+1}`)})})}
const steps=[
{h:'Inside first',p:'Drag each thing onto the child, or tap it and then tap the child. What goes next to the skin goes on first.',
 predict:{q:'Socks or shoes: which go on first?',opts:['Shoes','Socks'],ans:1},task:'Dress the child',
 show:()=>auto(0,[0,1,2,3,4].map(i=>()=>wear(i)),500),go:()=>enter(0,()=>S.a.worn.length>=KIT.length)},
{h:'Label at the back',p:'Look at each top. Can you see the label at the front? Then it needs turning round.',
 predict:{q:'Where does the label on a top go?',opts:['At the front, so I can see it','At the back'],ans:1},task:'Check all 4 tops',
 show:()=>auto(1,TOPS.map((t,i)=>()=>sortTop(i,t.lab)),550),go:()=>enter(1,()=>S.b.put.length>=TOPS.length)},
{h:'Right feet',p:'Each shoe has half a smiley inside. Tap a shoe to swap them. When the smiley is whole, tap Put them on.',
 task:'Get 3 pairs on the right feet',show:()=>auto(2,PAIRS.flatMap(sw=>sw?[swap,putOn]:[putOn]),600),go:()=>enter(2,()=>S.c.r>=PAIRS.length)},
{h:'Button up',p:'Tap a button, then tap the hole next to it. Start at the bottom.',
 predict:{q:'Which button is best to start with?',opts:['The bottom one','Any one'],ans:0},task:'Do up all 4 buttons',
 show:()=>auto(3,[0,1,2,3].flatMap(i=>[()=>pickBtn(i),()=>intoHole(i)]),420),go:()=>enter(3,()=>S.d.done.length>=4)},
{h:'Coat flip',p:'Drag each card into its numbered space, or tap a card and then a space.',
 predict:{q:'For the coat flip, where do you stand?',opts:['By the bottom of the coat','By the hood'],ans:1},task:'Put the coat flip in order',
 show:()=>auto(4,[0,1,2,3].map(i=>()=>place(i,i)),600),go:()=>enter(4,()=>S.e.done.length>=4)},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.watch()});
function hint(t){let m='Take it one step at a time, and ask for help with the tricky bit.';
 if(t==='order')m='What goes next to your skin goes on first: pants before trousers, socks before shoes.';
 if(t==='label')m='The label goes at the back. If you can see it at the front, turn the top round.';
 if(t==='feet')m='Swap the shoes until the sticker halves make a whole smiley.';
 if(t==='button')m='Start with the bottom button and use the hole next to it each time.';
 if(t==='help')m='Have a go first. Then ask a grown-up to help with just the tricky bit.';
 return m}
function pose(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{qz.hidden=X.step!==5;keysEl.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);keysEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dressing lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
