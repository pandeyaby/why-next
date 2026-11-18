/* Flagship – keeping things warm or cold by wrapping them (ages 4–5; Development Matters 2021 Understanding the World:
   explore materials and talk about changes; the start of thermal insulation). Scenes: race a bare ice cube against one
   in a sock, test three wrappers on warm cocoa, add layers until cocoa stays warm until playtime, sort wraps that keep
   things warm or cold, and dress a child in the snow (not the snowman). Data in learn/wrap_art.js. */
(()=>{const {MELT,WRAPS,LAYER,BELL,USES,BINS,KIT,ZONES,DESC,DONE,QS}=WRP;
VIS.reg('flagwrap',c=>{let A,bar,chal,qi=-1,run=0;const W={};c.fig.classList.add('young');
const INK='#1e293b',OK='#047857',BAD='#b91c1c',EDGE='#64748b',PICK='#7c3aed',ICE='#7dd3fc',HOTC='#ea580c',F='px system-ui,sans-serif';
const part=()=>['ice','cups','layers','sort','dress','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const box=(x,y,w,h)=>({x:x-w/2,y:y-h/2,w,h});
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.55);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,col,wt){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=`${wt||800} ${fs(n)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||13);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?BAD:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.no||o.ok||o.on?4:2;g.strokeStyle=o.no?BAD:o.ok?OK:o.on?PICK:EDGE;g.stroke()}
/* two-line text inside a card */
function lines(t,r,n){const ws=t.split(' '),h=Math.ceil(ws.length/2),a=ws.slice(0,h).join(' '),b=ws.slice(h).join(' ');
 if(!b)return txt(a,r.x+r.w/2,r.y+r.h/2,n,INK);txt(a,r.x+r.w/2,r.y+r.h*.36,n,INK);txt(b,r.x+r.w/2,r.y+r.h*.66,n,INK)}
const waitKey=()=>box(A.W/2,A.H*.9,Math.min(200,A.W*.5),A.H*.11);
function waitTile(t){const r=waitKey();card(r,{on:1});txt(t,r.x+r.w/2,r.y+r.h/2+1,15,INK)}
/* 1. ice cube race */
const cube=i=>({x:A.W*(i?.7:.3),y:A.H*.42,u:Math.min(A.W*.2,A.H*.26)});
const sockHome=()=>box(A.W/2,A.H*.72,Math.min(110,A.W*.28),A.H*.12);
function size(i){const s=W.a,k=s.sock===i?'sock':'bare';return Math.max(0,1-s.t*MELT[k])}
function drawIce(){const s=W.a,g=A.ctx;ground();
 pill(s.sock<0?'Drag the sock onto one ice cube':s.t<4?'Tap Wait and watch the ice':'Which ice cube melted first? Tap it.',A.W/2,A.H*.07,{ok:s.won});
 [0,1].forEach(i=>{const C=cube(i),k=size(i),side=C.u*k;g.fillStyle=A.col.dark?'#334155':'#f1f5f9';g.beginPath();g.ellipse(C.x,C.y+C.u*.55,C.u*.9,C.u*.22,0,0,7);g.fill();g.lineWidth=2;g.strokeStyle=EDGE;g.stroke();
  g.fillStyle='rgba(56,189,248,.45)';g.beginPath();g.ellipse(C.x,C.y+C.u*.55,C.u*.2+C.u*.65*(1-k),C.u*.06+C.u*.13*(1-k),0,0,7);g.fill();
  if(side>1){g.fillStyle=ICE;A.paint.rrect(C.x-side/2,C.y+C.u*.5-side,side,side,side*.15);g.fill();g.strokeStyle='#0369a1';g.lineWidth=2;g.stroke()}
  if(s.sock===i){g.fillStyle='rgba(168,85,247,.55)';A.paint.rrect(C.x-C.u*.6,C.y-C.u*.6,C.u*1.2,C.u*1.1,C.u*.3);g.fill();g.strokeStyle='#6b21a8';g.lineWidth=3;g.stroke()}
  txt(`cube ${i+1}${s.sock===i?' in a sock':''}`,C.x,C.y+C.u*.95,12,A.col.tx);if(s.bad===i)pill('not this one',C.x,C.y-C.u*.8,{no:1,n:11})});
 if(s.sock<0){const r=W.drag?box(W.drag.x,W.drag.y,sockHome().w,sockHome().h):sockHome();g.fillStyle='#a855f7';A.paint.rrect(r.x,r.y,r.w,r.h,r.h*.4);g.fill();txt('🧦 sock',r.x+r.w/2,r.y+r.h/2,13,'#ffffff')}
 else if(s.t<4)waitTile('⏱ Wait');}
function wrapCube(i){const s=W.a;if(s.sock>=0)return;s.sock=i;A.sound.pop();tell(`Cube ${i+1} is in the sock. Cube ${2-i} is bare. Tap Wait.`)}
function tick(){const s=W.a;if(s.sock<0)return tell('Put the sock on one cube first.');if(s.t>=4)return;s.t++;A.sound.tick();
 tell(s.t>=4?'Cube '+(2-s.sock)+' is all water now. Which melted first?':`Time passes. The bare cube is ${Math.round(size(1-s.sock)*100)}% left; the cube in the sock is ${Math.round(size(s.sock)*100)}% left.`)}
function firstMelt(i){const s=W.a;if(s.t<4)return tell('Keep waiting until one cube is all water.');
 if(i===s.sock){s.bad=i;A.sound.miss();return tell('That one is still ice. The sock did not warm it: it kept the warm air out, so it melted more slowly.')}
 s.won=1;s.bad=-1;A.sound.pop();tell('Yes, the bare cube melted first. The sock kept the warmth of the room away from the ice.')}
/* 2. three wrappers */
const cup=i=>{const w=Math.min(A.W*.17,90);return{x:A.W*(.2+i*.3),y:A.H*.36,w,h:w*1.05}};
const wrapR=()=>WRAPS.map((_,i)=>box(A.W*(.2+i*.3),A.H*.72,Math.min(A.W*.28,130),A.H*.13));
function drawCups(){const s=W.b,g=A.ctx;ground();const all=s.on.every(x=>x>=0);
 pill(!all?'Drag a wrapper onto each cup':!s.waited?'Tap Wait to see which cup stays warm':'Tap the cup that stayed warmest',A.W/2,A.H*.07,{ok:s.won});
 [0,1,2].forEach(i=>{const C=cup(i),k=s.on[i]>=0?WRAPS[s.on[i]]:null;WRP.mug(A,C,k&&k.k,s.waited&&k?k.w:null,{on:s.hot===i,no:s.bad===i});if(k)txt(k.t,C.x,C.y+C.h*.75,11,A.col.tx)});
 wrapR().forEach((r,j)=>{if(s.on.includes(j)||(W.drag&&W.drag.i===j))return;card(r,{on:s.pick===j});lines(WRAPS[j].t,r,12)});
 if(W.drag){const r=wrapR()[W.drag.i];const q=box(W.drag.x,W.drag.y,r.w,r.h);card(q,{on:1});lines(WRAPS[W.drag.i].t,q,12)}
 if(all&&!s.waited)waitTile('⏱ Wait')}
function wrapCup(j,i){const s=W.b;s.pick=null;if(s.on[i]>=0)return tell('That cup is already wrapped. Pick an empty cup.');s.on[i]=j;A.sound.pop();tell(`${WRAPS[j].t} on cup ${i+1}.`)}
function cupWait(){const s=W.b;if(!s.on.every(x=>x>=0))return tell('Wrap all three cups first.');s.waited=1;A.sound.tick();tell('Time passes. Look at each thermometer. Which cup stayed warmest?')}
function warmest(i){const s=W.b;if(!s.waited)return;const k=WRAPS[s.on[i]].k;
 if(k!=='scarf'){s.bad=i;A.sound.miss();return tell(k==='net'?'The net has big holes, so the warm air got out. It cooled fastest.':'Thin tissue let the warmth out quite fast. Look for the thick, fluffy wrapper.')}
 s.won=1;s.bad=-1;A.sound.pop();tell('Yes: the thick woolly scarf traps air, so the warmth gets out slowly.')}
/* 3. layers until playtime */
const big=()=>{const w=Math.min(A.W*.3,140);return{x:A.W*.42,y:A.H*.42,w,h:w*1.05}};
function drawLayers(){const s=W.c;ground();const C=big(),v=s.waited?LAYER(s.L):1;
 pill(s.waited?(v>=BELL?'Still warm at playtime!':'Brr, cold before playtime'):`Layers: ${s.L}. Tap the cup to add one, then wait.`,A.W/2,A.H*.07,{ok:s.waited&&v>=BELL,no:s.waited&&v<BELL});
 WRP.mug(A,C,s.L,null,{});WRP.thermo(A,A.W*.8,A.H*.2,A.H*.5,v,BELL);txt('warm enough',A.W*.8,A.H*.75,11,A.col.tx);txt('for playtime',A.W*.8,A.H*.8,11,A.col.tx);waitTile('🔔 Wait for playtime')}
function layer(d){const s=W.c,L=Math.max(0,Math.min(3,s.L+d));if(L===s.L)return tell(d>0?'3 layers is the most for this cup.':'There are no layers to take off.');s.L=L;s.waited=0;A.sound.pop();tell(`${L} layer${L===1?'':'s'} round a fresh cup of warm cocoa.`)}
function bell(){const s=W.c;s.waited=1;const v=LAYER(s.L);
 if(v<BELL){s.won=0;A.sound.miss();return tell(s.L?`With ${s.L} layer the cocoa cooled too much. Add another layer.`:'No wrapping, so the warmth got out fast. Add a layer.')}
 s.won=1;A.sound.pop();tell(`With ${s.L} layers it cooled a little but stayed warm. It never got hotter than when it was poured.`)}
/* 4. keeps it warm or keeps it cold */
function sideBox(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.3}}
function useR(){const gap=10,w=Math.min(150,(A.W-gap*4)/3),h=Math.min(w*.6,A.H*.18),x0=(A.W-(3*w+2*gap))/2;return USES.map((_,i)=>({i,x:x0+(i%3)*(w+gap),y:A.H*.52+Math.floor(i/3)*(h+gap*2),w,h}))}
function drawSort(){const s=W.d,g=A.ctx;ground();
 BINS.forEach((t,k)=>{const r=sideBox(k);g.fillStyle=k?(A.col.dark?'#0c4a6e':'#bae6fd'):(A.col.dark?'#7c2d12':'#fed7aa');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?PICK:EDGE;g.stroke();
  txt((k?'❄️ ':'🔥 ')+t,r.x+r.w/2,r.y+r.h*.2,14,A.col.dark?'#f8fafc':INK);txt(`${s.done.filter(i=>USES[i][1]===k).length} cards`,r.x+r.w/2,r.y+r.h*.62,13,A.col.dark?'#f8fafc':INK)});
 useR().forEach(r=>{if(s.done.includes(r.i)||(W.drag&&W.drag.i===r.i))return;card(r,{no:s.bad===r.i,on:s.pick===r.i});lines(USES[r.i][0],r,12)});
 if(W.drag){const r=useR()[W.drag.i],q=box(W.drag.x,W.drag.y,r.w,r.h);card(q,{on:1});lines(USES[W.drag.i][0],q,12)}
 pill(s.done.length>=USES.length?'All 6 sorted':'Does the wrapping keep it warm or cold?',A.W/2,A.H*.045,{ok:s.done.length>=USES.length})}
function sortUse(i,k){const s=W.d;if(s.done.includes(i))return;s.pick=null;const [t,want]=USES[i];
 if(want!==k){s.bad=i;A.sound.miss();return tell(want?`${t}: the wrapping keeps warmth out, so it stays cold. Wrapping works for cold things too.`:`${t}: the wrapping keeps the warmth in, so it stays warm.`)}
 s.done.push(i);s.bad=-1;A.sound.pop();tell(`${t}: ${BINS[k].toLowerCase()}. ${s.done.length} of 6.`)}
/* 5. dress for the snow */
const kid=()=>{const x=A.W*.22,u=Math.min(A.W*.13,A.H*.12);return{x,u,head:{x,y:A.H*.25,r:u*.55},neck:box(x,A.H*.25+u*.75,u*.6,u*.3),body:box(x,A.H*.25+u*1.75,u*1.3,u*1.7)}};
const kitR=()=>KIT.map((_,i)=>box(A.W*.8,A.H*(.22+i*.2),Math.min(A.W*.34,140),A.H*.14));
const snowman=()=>({x:A.W*.52,y:A.H*.62,r:Math.min(A.W*.08,A.H*.08)});
function drawDress(){const s=W.e,g=A.ctx,K=kid(),S=snowman();ground();
 WRP.scene(A,K,S,s.on,ZONES);if(s.bad===9)pill('not the snowman',S.x,S.y-S.r*2.8,{no:1,n:11});
 kitR().forEach((r,i)=>{if(s.on[i]||(W.drag&&W.drag.i===i))return;card(r,{on:s.pick===i});lines(KIT[i].t,r,13)});
 if(W.drag){const r=kitR()[W.drag.i],q=box(W.drag.x,W.drag.y,r.w,r.h);card(q,{on:1});lines(KIT[W.drag.i].t,q,13)}
 const left=s.on.filter(x=>!x).length;pill(left?`Warmth is escaping from ${left} place${left>1?'s':''}. Dress the child.`:'Warm and cosy: the warmth stays in',A.W/2,A.H*.06,{ok:!left})}
const onKid=p=>{const K=kid();return p.x<K.x+K.u*1.2&&p.x>K.x-K.u*1.2&&p.y<A.H*.8&&p.y>K.head.y-K.head.r*1.4};
const onSnow=p=>{const S=snowman();return Math.hypot(p.x-S.x,p.y-S.y+S.r*.6)<S.r*2};
function wear(i,where){const s=W.e;s.pick=null;if(s.on[i])return;
 if(where==='snow'){s.bad=9;A.sound.miss();return tell(`A ${KIT[i].t.toLowerCase()} will not warm the snowman. It has no warmth of its own to keep in, so a coat would make it melt more slowly. Put it on the child.`)}
 s.on[i]=1;s.bad=-1;A.sound.pop();tell(`${KIT[i].t} on. Warmth stops escaping from the ${ZONES[KIT[i].z]}.`)}
function draw(){const k=part();if(k==='quiz'){ground();pill('Challenge',A.W/2,A.H*.16,{ok:1});pill('Wrapping slows heat moving in or out',A.W/2,A.H*.5,{n:14});return}
 ({ice:drawIce,cups:drawCups,layers:drawLayers,sort:drawSort,dress:drawDress})[k]();A.fx.draw(A.ctx)}
function lift(i,p){W.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
function down(p){const k=part(),wk=hit(p,waitKey());
 if(k==='ice'){const s=W.a;if(s.sock<0&&hit(p,sockHome()))return lift(0,p);if(s.sock>=0&&s.t<4&&wk)return tick(),false;const i=[0,1].find(i=>{const C=cube(i);return Math.abs(p.x-C.x)<C.u*.7&&Math.abs(p.y-C.y)<C.u*.8});if(i!=null&&s.t>=4)firstMelt(i);return false}
 if(k==='cups'){const s=W.b;if(s.waited){const i=[0,1,2].find(i=>hit(p,box(cup(i).x,cup(i).y,cup(i).w+24,cup(i).h+24)));if(i!=null)warmest(i);return false}
  if(wk&&s.on.every(x=>x>=0))return cupWait(),false;const j=wrapR().findIndex((r,j)=>hit(p,r)&&!s.on.includes(j));if(j>=0)return lift(j,p);
  const i=[0,1,2].find(i=>hit(p,box(cup(i).x,cup(i).y,cup(i).w+24,cup(i).h+24)));if(i!=null&&s.pick!=null)wrapCup(s.pick,i);return false}
 if(k==='layers'){if(wk)return bell(),false;const C=big();if(hit(p,box(C.x,C.y,C.w+40,C.h+40)))layer(1);return false}
 if(k==='sort'){const s=W.d,r=useR().find(r=>hit(p,r)&&!s.done.includes(r.i));if(r)return lift(r.i,p);const b=[0,1].find(j=>hit(p,sideBox(j)));if(b!=null&&s.pick!=null)sortUse(s.pick,b);return false}
 if(k==='dress'){const s=W.e,r=kitR().findIndex((r,i)=>hit(p,r)&&!s.on[i]);if(r>=0)return lift(r,p);if(s.pick!=null){if(onKid(p))wear(s.pick,'kid');else if(onSnow(p))wear(s.pick,'snow')}return false}
 return false}
function move(p){const d=W.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=part();
 if(k==='cups')W.b.hot=[0,1,2].find(i=>hit(p,box(cup(i).x,cup(i).y,cup(i).w+24,cup(i).h+24)))??-1;
 if(k==='sort'){const h=[0,1].find(j=>hit(p,sideBox(j)));W.d.hot=h==null?-1:h}A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=part();
 if(k==='ice'){const i=[0,1].find(i=>{const C=cube(i);return Math.abs(p.x-C.x)<C.u*.8&&Math.abs(p.y-C.y)<C.u});if(i!=null)return wrapCube(i);if(tap)return tell('Drag the sock onto a cube, or use the buttons.')}
 if(k==='cups'){W.b.hot=-1;const i=[0,1,2].find(i=>hit(p,box(cup(i).x,cup(i).y,cup(i).w+24,cup(i).h+24)));if(i!=null)return wrapCup(d.i,i);if(tap){W.b.pick=d.i;return tell(`${WRAPS[d.i].t} picked. Now tap a cup.`)}}
 if(k==='sort'){W.d.hot=-1;const b=[0,1].find(j=>hit(p,sideBox(j)));if(b!=null)return sortUse(d.i,b);if(tap){W.d.pick=d.i;return tell('Card picked. Now tap Stays warm or Stays cold.')}}
 if(k==='dress'){if(onKid(p))return wear(d.i,'kid');if(onSnow(p))return wear(d.i,'snow');if(tap){W.e.pick=d.i;return tell(`${KIT[d.i].t} picked. Now tap the child.`)}}A.redraw()}
function reset(){run++;for(const k in W)delete W[k];Object.assign(W,{a:{sock:-1,t:0,won:0,bad:-1},b:{on:[-1,-1,-1],waited:0,won:0,bad:-1,hot:-1,pick:null},c:{L:0,waited:0,won:0},d:{done:[],bad:-1,hot:-1,pick:null},e:{on:[0,0,0],bad:-1,pick:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.hook()}
const ready=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,ok){reset();tell(DESC[i]);W.hook=ready(i,ok)}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function keys(){if(!bar)return;bar.innerHTML='';const k=part(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='ice'){const s=W.a;if(s.sock<0)[0,1].forEach(i=>K(`🧦 Sock on cube ${i+1}`,()=>wrapCube(i)));else if(s.t<4)K('⏱ Wait',tick,'Wait a bit');else if(!s.won)[0,1].forEach(i=>K(`Cube ${i+1} melted first`,()=>firstMelt(i)))}
 if(k==='cups'){const s=W.b;if(!s.on.every(x=>x>=0))WRAPS.forEach((w,j)=>{if(!s.on.includes(j))[0,1,2].forEach(i=>{if(s.on[i]<0)K(`${w.t} → cup ${i+1}`,()=>wrapCup(j,i))})});else if(!s.waited)K('⏱ Wait',cupWait,'Wait a bit');else if(!s.won)[0,1,2].forEach(i=>K(`Cup ${i+1} (${WRAPS[s.on[i]].t}) is warmest`,()=>warmest(i)))}
 if(k==='layers'){K('➕ Add a layer',()=>layer(1));K('➖ Take a layer off',()=>layer(-1));K('🔔 Wait for playtime',bell)}
 if(k==='sort')USES.forEach(([t],i)=>{if(!W.d.done.includes(i)){K(`${t} → warm`,()=>sortUse(i,0),`${t}: stays warm`);K(`${t} → cold`,()=>sortUse(i,1),`${t}: stays cold`)}});
 if(k==='dress')KIT.forEach((it,i)=>{if(!W.e.on[i]){K(`${it.t} → child`,()=>wear(i,'kid'),`Put the ${it.t.toLowerCase()} on the child`);K(`${it.t} → snowman`,()=>wear(i,'snow'),`Put the ${it.t.toLowerCase()} on the snowman`)}})}
const steps=[
{h:'Ice cube race',p:'Drag the sock onto one ice cube. Then tap Wait a few times and watch.',
 predict:{q:'One ice cube is in a woolly sock. Which melts first?',opts:['The one in the sock','The bare one'],ans:1},task:'Find out which cube melts first',
 show:()=>play(0,[()=>wrapCube(0),tick,tick,tick,tick,()=>firstMelt(1)],500),go:()=>open(0,()=>W.a.won)},
{h:'Best wrapper',p:'Wrap each cup of warm cocoa in a different wrapper, tap Wait, then tap the warmest cup.',
 task:'Test 3 wrappers',show:()=>play(1,[()=>wrapCup(0,0),()=>wrapCup(1,1),()=>wrapCup(2,2),cupWait,()=>warmest(0)],550),go:()=>open(1,()=>W.b.won)},
{h:'Warm till playtime',p:'Tap the cup to add a layer. Then tap Wait for playtime. Keep it above the dashed line.',
 predict:{q:'Can wrapping make the cocoa hotter than when it was poured?',opts:['Yes, wrapping adds heat','No, it only slows the cooling'],ans:1},task:'Keep the cocoa warm until playtime',
 show:()=>play(2,[bell,()=>layer(1),bell,()=>layer(1),bell],650),go:()=>open(2,()=>W.c.won)},
{h:'Warm or cold?',p:'Drag each card to Stays warm or Stays cold, or tap a card and then a box.',
 predict:{q:'You wrap an ice lolly in a towel. What happens?',opts:['It melts faster, towels are warm','It stays frozen for longer'],ans:1},task:'Sort all 6 cards',
 show:()=>play(3,USES.map(([,k],i)=>()=>sortUse(i,k)),500),go:()=>open(3,()=>W.d.done.length>=USES.length)},
{h:'Snow day',p:'Drag the hat, scarf and coat onto the child, or tap one and then tap the child.',
 predict:{q:'Where does the warmth inside your coat come from?',opts:['The coat makes it','Your body makes it'],ans:1},task:'Dress the child for the snow',
 show:()=>play(4,KIT.map((_,i)=>()=>wear(i,'kid')),550),go:()=>open(4,()=>W.e.on.every(Boolean))},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.hook()});
function why(t){let m='Wrapping slows heat moving in or out. It does not make heat.';
 if(t==='woolhot')m='Wool and coats do not make heat. They keep warmth in, or keep it out, so ice melts more slowly.';
 if(t==='onlywarm')m='Wrapping keeps cold things cold too: it keeps the warmth out.';
 if(t==='thin')m='Thick, fluffy wrapping traps air and works best. Thin or holey wrapping lets heat through.';
 if(t==='hotter')m='Wrapping cannot make things hotter than they started. It only slows the cooling.';
 if(t==='cloth')m='Not only clothes: bubble wrap and foam trap air too, so they slow heat.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:S=>{chal.hidden=S.step!==5;bar.hidden=S.step===5;keys()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Wrapping lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
