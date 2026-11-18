/* Flagship: Minibeast Habitats (ages 5-7; NC Y2 habitats incl. micro-habitats). Woodlouse choice trays (damp v dry,
   dark v light), match minibeasts to homes, a drying-out meter, slugs as the weather changes. Not flagbug/flaganwhere. */
(()=>{
VIS.reg('flagmbhab',c=>{let A,G,ctl,chal,qi=-1,ver=0;const M={};c.fig.classList.add('young');
const INK='#1f2937',OK='#047857',HINT='#1d4ed8',BAD='#b91c1c',DAMP='#bfdbfe',DRY='#fde68a',BARK='#92400e',SOIL='#d6b48a',LEAF='#bbf7d0',POND='#93c5fd';
const BEASTS=[['worm','Worm','soil'],['louse','Woodlouse','log'],['fly','Butterfly','flower'],['snail','Pond snail','pond']];
const HOMES=[['soil','In the soil',SOIL],['log','Under a log',BARK],['flower','On a sunny flower','#fbcfe8'],['pond','In pond water',POND]];
const ROUNDS=[['A hot, sunny afternoon. Where are the slugs?','stone'],['A rainy evening. Where are the slugs now?','lawn'],['A sunny morning. Where are the bees?','flowers'],['Where does a pond skater walk?','pond']];
const SPOTS=[['stone','Under a stone'],['lawn','On the lawn'],['flowers','In the flowers'],['pond','On the pond']];
const now=()=>['wet','dark','match','dry','hunt','chal'][A.step];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const fnt=(a,b)=>`700 ${A.narrow?a:b}px system-ui`,pop=()=>A.sound.pop(),miss=()=>A.sound.miss(),rr=(...a)=>A.paint.rrect(...a),N=()=>A.narrow;
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(N()?16:19);g.font=`700 ${f}px system-ui`;const max=(o.w||A.W)-20;while(f>12&&g.measureText(t).width>max){f--;g.font=`700 ${f}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+24),h=o.h||f*2.2,L=clamp(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||'#fffbeb';rr(L,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.edge?3:1.5;g.strokeStyle=o.edge||'#78716c';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,L+w/2,y+1);return{x:L,y:y-h/2,w,h}}
function louse(x,y,s,dry,pale){const g=A.ctx;g.save();g.translate(x,y);g.fillStyle=pale?'#e7e5e4':dry?'#a8a29e':'#57534e';g.beginPath();g.ellipse(0,0,s,s*.62,0,0,7);g.fill();g.strokeStyle=pale?'#44403c':'#e7e5e4';g.lineWidth=1.2;
 for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*s*.32,-s*.55);g.lineTo(k*s*.32,s*.55);g.stroke()}g.restore()}
function worm(x,y,s){const g=A.ctx;g.strokeStyle='#db2777';g.lineWidth=s*.5;g.lineCap='round';g.beginPath();g.moveTo(x-s*1.4,y);g.quadraticCurveTo(x-s*.5,y-s,x,y);g.quadraticCurveTo(x+s*.6,y+s,x+s*1.4,y);g.stroke()}
function fly(x,y,s){const g=A.ctx;g.fillStyle='#f97316';[[-1,-1],[1,-1],[-1,.6],[1,.6]].forEach(([a,b])=>{g.beginPath();g.ellipse(x+a*s*.6,y+b*s*.45,s*.6,s*.45,0,0,7);g.fill()});g.fillStyle=INK;g.fillRect(x-s*.1,y-s*.8,s*.2,s*1.5)}
function snail(x,y,s){const g=A.ctx;g.fillStyle='#a3e635';g.fillRect(x-s*1.2,y+s*.2,s*2.2,s*.45);g.fillStyle='#a16207';g.beginPath();g.arc(x,y,s*.7,0,7);g.fill();g.strokeStyle='#fef3c7';g.lineWidth=2;g.beginPath();g.arc(x,y,s*.35,0,5);g.stroke()}
const DRAWS={worm,louse,fly,snail};
/* ---- 1 and 2: the choice chamber ---- */
const tray=()=>({x:A.W*.06,y:A.H*.2,w:A.W*.88,h:A.H*.46});
const halfOf=x=>x<A.W/2?0:1;
function startTray(){M.bugs=[];for(let i=0;i<8;i++)M.bugs.push({x:.38+.24*(i%2)+.04*((i*3)%3-1),y:.14+.24*Math.floor(i/2)})}
function drawTray(kind){const T=tray(),g=A.ctx,half=T.w/2,mark=kind==='wet'?M.wetSide:M.coverSide;
 for(let s=0;s<2;s++){g.fillStyle=kind==='wet'?(mark===s?DAMP:DRY):(mark===s?'#44403c':'#fef9c3');g.fillRect(T.x+s*half,T.y,half,T.h)}
 g.strokeStyle=INK;g.lineWidth=3;g.strokeRect(T.x,T.y,T.w,T.h);g.setLineDash([8,6]);g.beginPath();g.moveTo(T.x+half,T.y);g.lineTo(T.x+half,T.y+T.h);g.stroke();g.setLineDash([]);
 if(kind==='wet'&&mark!=null){g.fillStyle='#2563eb';for(let i=0;i<14;i++){g.beginPath();g.arc(T.x+mark*half+half*(.1+.8*((i*29)%14)/14),T.y+T.h*(.1+.8*((i*17)%14)/14),3,0,7);g.fill()}}
 M.bugs.forEach(b=>louse(T.x+b.x*T.w,T.y+b.y*T.h,N()?11:14,false,kind==='dark'&&mark!=null&&halfOf(T.x+b.x*T.w)===mark));
 tag(mark==null?(kind==='wet'?'Tap one side to make it damp':'Tap one side to put bark on'):M.waited?(kind==='wet'?'7 of 8 went to the damp side':'7 of 8 went under the bark'):'Now tap Wait and watch',A.W/2,A.H*.08,{edge:M.waited?OK:HINT})}
function place(kind,s){if(kind==='wet'){if(M.wetSide!=null)return say('That side is already damp. Tap Wait.');M.wetSide=s}else{if(M.coverSide!=null)return say('The bark is on. Tap Wait.');M.coverSide=s}
 pop();say(kind==='wet'?`The ${s?'right':'left'} side is damp now. The other side is dry.`:`The ${s?'right':'left'} side is dark under the bark. The other side is light.`)}
function wait(kind){const s=kind==='wet'?M.wetSide:M.coverSide;if(s==null)return say(kind==='wet'?'First make one side damp.':'First put the bark on one side.');if(M.waited)return say('They have found their spot.');
 const v=ver,goal=M.bugs.map((b,i)=>i===7?{x:s?.2:.8,y:b.y}:{x:s?.6+.3*((i*41)%7)/7:.1+.3*((i*41)%7)/7,y:b.y}),from=M.bugs.map(b=>({...b})),n=A.reduced()?1:12;
 for(let k=1;k<=n;k++)setTimeout(()=>{if(v!==ver)return;const t=k/n;M.bugs.forEach((b,i)=>{b.x=from[i].x+(goal[i].x-from[i].x)*t;b.y=from[i].y+(goal[i].y-from[i].y)*t});
  if(k===n){M.waited=true;pop();say(kind==='wet'?'7 of the 8 woodlice moved to the damp side. One stayed dry: animals do not all do the same, so look at most of them.':'7 of the 8 woodlice crawled under the dark bark. Woodlice like dark places as well as damp ones.')}else A.redraw()},(A.reduced()?20:90)*k)}
/* ---- 3: who lives where ---- */
const beastCards=()=>{const w=N()?A.W*.22:A.W*.2,gap=(A.W-4*w)/5;return BEASTS.map((_,i)=>({x:gap+i*(w+gap),y:A.H*.05,w,h:A.H*.22}))};
const homeBoxes=()=>{const w=A.W*.44,h=A.H*.27;return HOMES.map((_,i)=>({x:A.W*.04+(i%2)*(w+A.W*.04),y:A.H*.34+Math.floor(i/2)*(h+A.H*.04),w,h}))};
function drawMatch(){const g=A.ctx,B=beastCards(),H=homeBoxes();
 HOMES.forEach((h,i)=>{const r=H[i];g.fillStyle=h[2];rr(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=M.hMiss===i?BAD:INK;g.lineWidth=M.hMiss===i?4:2;g.stroke();
  tag(h[1],r.x+r.w/2,r.y+r.h*.22,{f:N()?13:16,bg:'#ffffff'});
  BEASTS.forEach((b,j)=>{if(M.placed[j]===h[0])DRAWS[b[0]](r.x+r.w/2,r.y+r.h*.68,N()?15:19)})});
 BEASTS.forEach((b,j)=>{if(M.placed[j])return;const r=B[j],dx=M.drag&&M.drag.j===j?M.drag.dx:0,dy=M.drag&&M.drag.j===j?M.drag.dy:0;
  g.fillStyle=M.pick===j?'#dbeafe':'#ffffff';rr(r.x+dx,r.y+dy,r.w,r.h,12);g.fill();g.strokeStyle=M.pick===j?HINT:'#78716c';g.lineWidth=M.pick===j?4:1.5;g.stroke();
  DRAWS[b[0]](r.x+r.w/2+dx,r.y+r.h*.4+dy,N()?15:19);g.fillStyle=INK;g.font=fnt(11,14);g.textAlign='center';g.fillText(b[1],r.x+r.w/2+dx,r.y+r.h*.82+dy)})}
const WHY={worm:'Worms dig in damp soil.',louse:'Woodlice hide in the damp dark so they do not dry out.',fly:'Butterflies need sun and flowers.',snail:'Pond snails feed in the water.'};
function drop(j,home){if(M.placed[j])return;const b=BEASTS[j],hi=HOMES.findIndex(h=>h[0]===home);
 if(b[2]===home){M.placed[j]=home;M.pick=null;M.hMiss=null;pop();const left=BEASTS.filter((_,k)=>!M.placed[k]).length;return say(`Yes. ${WHY[b[0]]}`+(left?` ${left} to go.`:' All four are home.'))}
 M.hMiss=hi;miss();const m={
  'worm|log':'Worms visit logs, but they live mostly deep in the soil.','worm|flower':'Too dry for a worm. Its skin must stay damp.','worm|pond':'Earthworms live in damp soil, not under water.',
  'louse|soil':'Woodlice live on the ground, under damp, dark cover.','louse|flower':'Sun dries a woodlouse out. It needs damp and dark.','louse|pond':'Woodlice are land animals. Water drowns them.',
  'fly|soil':'Butterflies fly in the sun. They do not dig.','fly|log':'Under a log is dark. A butterfly needs sun and flowers.','fly|pond':'A butterfly visits flowers for nectar, not the water.',
  'snail|soil':'A pond snail lives in water. Its name is a clue.','snail|log':'Garden snails hide under logs. A pond snail lives in the pond.','snail|flower':'A pond snail would dry out there. It needs the pond.'}[b[0]+'|'+home];say(m)}
/* ---- 4: drying out ---- */
const logArea=()=>({x:A.W*.05,y:A.H*.3,w:A.W*.36,h:A.H*.36}),pathArea=()=>({x:A.W*.55,y:A.H*.3,w:A.W*.4,h:A.H*.36});
function drawDry(){const g=A.ctx,L=logArea(),P=pathArea();g.fillStyle='#e7e5e4';g.fillRect(L.x,L.y,L.w,L.h);g.fillStyle=BARK;rr(L.x,L.y,L.w,L.h*.3,10);g.fill();
 g.fillStyle='#fef08a';g.fillRect(P.x,P.y,P.w,P.h);g.fillStyle='#f59e0b';g.beginPath();g.arc(P.x+P.w*.85,P.y-A.H*.06,A.H*.06,0,7);g.fill();
 g.fillStyle=A.col.tx;g.font=fnt(13,16);g.textAlign='center';g.fillText('Damp log',L.x+L.w/2,L.y+L.h+18);g.fillText('Sunny path',P.x+P.w/2,P.y+P.h+18);
 const at=M.where==='path'?P:L,x=M.drag&&M.drag.j==='bug'?M.drag.x:at.x+at.w/2,y=M.drag&&M.drag.j==='bug'?M.drag.y:at.y+at.h*.62;louse(x,y,N()?16:20,M.water<60);
 const bw=A.W*.5,bx=A.W*.25,by=A.H*.82;g.fillStyle='#e5e7eb';g.fillRect(bx,by,bw,A.H*.06);g.fillStyle=M.water<50?BAD:'#2563eb';g.fillRect(bx,by,bw*M.water/100,A.H*.06);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(bx,by,bw,A.H*.06);
 tag(`Water in its body: ${Math.round(M.water)}%`,A.W/2,A.H*.12,{f:N()?14:17,edge:M.water<50?BAD:M.saved?OK:HINT})}
function moveBug(where){if(M.where===where)return say(where==='path'?'It is already on the path.':'It is already under the log.');M.where=where;pop();const v=++M.tick;
 if(where==='path'){say('Out on the sunny path. Watch its water.');const n=A.reduced()?1:8;for(let k=1;k<=n;k++)setTimeout(()=>{if(v!==M.tick||M.where!=='path')return;M.water=Math.max(35,100-65*k/n);
   if(k===n){M.baked=true;say('Its water fell to 35%. Sun and wind dry a woodlouse fast. Take it back to the log.')}else A.redraw()},(A.reduced()?20:160)*k);return}
 M.water=100;if(M.baked){M.saved=true;return say('Back in the damp, its water is 100% again. That is why woodlice hide in damp places.')}say('It is safe and damp under the log.')}
/* ---- 5: changing weather ---- */
const spotBoxes=()=>{const w=A.W*.44,h=A.H*.25;return SPOTS.map((_,i)=>({x:A.W*.04+(i%2)*(w+A.W*.04),y:A.H*.28+Math.floor(i/2)*(h+A.H*.04),w,h}))};
function drawHunt(){const R=ROUNDS[M.ri],g=A.ctx,S=spotBoxes(),col={stone:'#a8a29e',lawn:'#86efac',flowers:'#f9a8d4',pond:POND};
 tag(R?R[0]:'All four found!',A.W/2,A.H*.1,{w:A.W*.94,f:N()?14:17,edge:R?HINT:OK});
 SPOTS.forEach((s,i)=>{const r=S[i];g.fillStyle=col[s[0]];rr(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=M.sMiss===i?BAD:INK;g.lineWidth=M.sMiss===i?4:2;g.stroke();tag(s[1],r.x+r.w/2,r.y+r.h/2,{f:N()?14:17,bg:'#ffffff'})})}
function pickSpot(id){const R=ROUNDS[M.ri];if(!R)return say('You found them all.');const i=SPOTS.findIndex(s=>s[0]===id);
 if(R[1]===id){M.ri++;M.sMiss=null;pop();return say(['Yes. On a hot day slugs hide where it stays damp.','Yes. When it is wet, slugs come out to eat.','Yes. Bees visit sunny flowers for food.','Yes. A pond skater walks on the water.'][M.ri-1]+(M.ri>3?' Minibeasts move when the weather changes.':''))}
 M.sMiss=i;miss();say(M.ri===0?(id==='lawn'?'The sunny lawn is hot and dry. A slug would dry out. Look somewhere shady.':'Slugs need damp. Where is it shady and cool?'):M.ri===1?(id==='stone'?'In the rain it is damp everywhere, so slugs come out to eat the lawn.':'Rain makes it damp. Where are the plants to munch?'):M.ri===2?'Bees need flowers for food.':'Pond skaters are water minibeasts.')}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){tag('Challenge',A.W/2,A.H*.15,{edge:HINT});const Q=QS[qi%QS.length];if(Q)tag(Q.pic,A.W/2,A.H*.5,{f:N()?17:21});return}
 if(k==='wet'||k==='dark')return drawTray(k);({match:drawMatch,dry:drawDry,hunt:drawHunt})[k]()}
function clear(){ver++;for(const k in M)delete M[k];Object.assign(M,{wetSide:null,coverSide:null,waited:false,bugs:[],placed:{},pick:null,hMiss:null,water:100,where:'log',baked:false,saved:false,tick:0,ri:0,sMiss:null,drag:null,after:()=>{}});startTray()}
function say(t){tell(t);A.redraw();controls();M.after()}
const when=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setup(i,intro,test,msg){clear();tell(intro);controls();M.after=when(i,test,msg)}
function replay(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},A.reduced()?40*(j+1):(ms||600)*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='wet'){if(M.wetSide==null){B('Wet the left',()=>place('wet',0),'Make the left side damp');B('Wet the right',()=>place('wet',1),'Make the right side damp')}else B('Wait',()=>wait('wet'),'Wait and watch the woodlice')}
 if(k==='dark'){if(M.coverSide==null){B('Bark on the left',()=>place('dark',0),'Cover the left side with bark');B('Bark on the right',()=>place('dark',1),'Cover the right side with bark')}else B('Wait',()=>wait('dark'),'Wait and watch the woodlice')}
 if(k==='match'){const j=BEASTS.findIndex((_,q)=>!M.placed[q]);if(j>=0)HOMES.forEach(h=>B(`${BEASTS[j][1]}: ${h[1].toLowerCase()}`,()=>drop(j,h[0]),`Put the ${BEASTS[j][1].toLowerCase()} ${h[1].toLowerCase()}`))}
 if(k==='dry'){B('To the sunny path',()=>moveBug('path'),'Move the woodlouse to the sunny path');B('Back to the log',()=>moveBug('log'),'Move the woodlouse back under the damp log')}
 if(k==='hunt'&&ROUNDS[M.ri])SPOTS.forEach(s=>B(s[1],()=>pickSpot(s[0]),'Look '+s[1].toLowerCase()))}
function down(p){const k=now();
 if(k==='wet'||k==='dark'){if(!hit(p,tray()))return false;if((k==='wet'?M.wetSide:M.coverSide)!=null)wait(k);else place(k,halfOf(p.x));return false}
 if(k==='match'){const j=beastCards().findIndex((r,q)=>!M.placed[q]&&hit(p,r));if(j>=0){M.pick=j;M.drag={j,x0:p.x,y0:p.y,dx:0,dy:0};A.redraw();return true}
  const h=homeBoxes().findIndex(r=>hit(p,r));if(h>=0&&M.pick!=null)drop(M.pick,HOMES[h][0]);return false}
 if(k==='dry'){const at=M.where==='path'?pathArea():logArea();if(hit(p,at)){M.drag={j:'bug',x:p.x,y:p.y};return true}if(hit(p,pathArea()))moveBug('path');else if(hit(p,logArea()))moveBug('log');return false}
 if(k==='hunt'){const i=spotBoxes().findIndex(r=>hit(p,r));if(i>=0)pickSpot(SPOTS[i][0])}return false}
function move(p){const d=M.drag;if(!d)return;if(d.j==='bug'){d.x=p.x;d.y=p.y}else{d.dx=p.x-d.x0;d.dy=p.y-d.y0}A.redraw()}
function up(p){const d=M.drag;M.drag=null;if(!d)return;const k=now();
 if(k==='match'&&d.j!=null&&d.j!=='bug'){const pt={x:d.x0+d.dx,y:d.y0+d.dy},h=homeBoxes().findIndex(r=>hit(pt,r));if(h>=0)drop(d.j,HOMES[h][0]);else A.redraw();return}
 if(d.j==='bug'){if(hit({x:d.x,y:d.y},pathArea()))moveBug('path');else if(hit({x:d.x,y:d.y},logArea()))moveBug('log');else A.redraw()}}
const steps=[
{h:'Damp or dry?',p:'Woodlice are in a tray. Tap one side to make it damp. Then wait and see where they go.',
 predict:{q:'One side is damp. One side is dry. Where will most woodlice go?',opts:['the dry side','the damp side','half and half'],ans:1},task:'Wet one side, then wait',
 show:()=>replay(0,[()=>place('wet',0),()=>wait('wet')],700),
 go:()=>setup(0,'A tray with 8 woodlice. Both sides are dry.',()=>M.waited,'Woodlice choose damp places.')},
{h:'Dark or light?',p:'Now both sides are dry. Tap one side to cover it with bark. Where do they go now?',
 predict:{q:'One side is dark under bark. Where will most woodlice go?',opts:['the light side, so they can see','the dark side','they do not mind'],ans:1},task:'Cover one side, then wait',
 show:()=>replay(1,[()=>place('dark',1),()=>wait('dark')],700),
 go:()=>setup(1,'A dry tray with 8 woodlice. Both sides are light.',()=>M.waited,'Woodlice choose dark places too.')},
{h:'Who lives where?',p:'Each minibeast needs its own kind of place. Drag each one to the home that suits it, or tap it and then a home.',task:'Put all 4 minibeasts in their homes',
 show:()=>replay(2,[()=>drop(0,'soil'),()=>drop(1,'log'),()=>drop(2,'flower'),()=>drop(3,'pond')],500),
 go:()=>setup(2,'Four minibeasts and four homes.',()=>BEASTS.every((_,j)=>M.placed[j]),'Each minibeast lives where the place suits it.')},
{h:'Why hide?',p:'Drag the woodlouse out onto the sunny path. Watch the water in its body. Then take it home.',
 predict:{q:'Why do woodlice hide in damp, dark places?',opts:['they like to swim','sun and wind dry them out','they are scared of birds only'],ans:1},task:'Take it out, then bring it back',
 show:()=>replay(3,[()=>moveBug('path'),()=>moveBug('log')],A.reduced()?60:1700),
 go:()=>setup(3,'A woodlouse under a damp log, next to a sunny path. Its water is 100%.',()=>M.saved,'A damp place stops a woodlouse drying out.')},
{h:'Weather detective',p:'Minibeasts move when the weather changes. Tap where you would look for each one.',task:'Find all 4',
 show:()=>replay(4,[()=>pickSpot('stone'),()=>pickSpot('lawn'),()=>pickSpot('flowers'),()=>pickSpot('pond')],500),
 go:()=>setup(4,'Four places in a garden.',()=>M.ri>3,'Look for minibeasts where the place suits them right now.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.after()});
const QS=[
 {pic:'damp | dry',q:'A tray of woodlice. One side is damp, one is dry. Where do most go?',ans:'The damp side',bad:[['The dry side','dry'],['Half on each side','even']]},
 {pic:'worm',q:'Where would you look for a worm?',ans:'In the soil',bad:[['On a sunny leaf','sunny'],['Under the pond water','water']]},
 {pic:'log',q:'Why do woodlice live under logs?',ans:'It is damp and dark there',bad:[['It is hot and sunny there','sunny'],['They cannot walk on grass','myth']]},
 {pic:'butterfly',q:'Where will you see a butterfly?',ans:'On a sunny flower',bad:[['Under a stone','dark'],['Deep in the soil','under']]},
 {pic:'hot day',q:'It is a hot, dry day. Where are the slugs?',ans:'Under a shady stone',bad:[['On the hot path','sunny'],['On the dry lawn','dry']]},
 {pic:'pond',q:'Where does a pond snail live?',ans:'In the pond water',bad:[['Under a dry log','land'],['On a sunny flower','sunny']]}];
function slip(t){let m='Think about what the minibeast needs: damp or dry, dark or light, land or water.';
 if(t==='dry')m='Woodlice dry out in dry places. Most of them crawl to the damp side.';
 if(t==='even')m='They do not spread out. In the tray, 7 of 8 went to the damp side.';
 if(t==='sunny')m='Sun dries the ground. Damp-loving minibeasts hide from it.';
 if(t==='water')m='Earthworms live in damp soil, not under water.';
 if(t==='myth')m='Woodlice can walk on grass. They hide under logs to stay damp and dark.';
 if(t==='dark')m='Butterflies need sun and flowers. Dark places are for woodlice and beetles.';
 if(t==='under')m='Butterflies fly. They do not dig in the soil.';
 if(t==='land')m='A pond snail is a water minibeast. Its name tells you its home.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],list=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=list.slice(r).concat(list.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else miss();tell(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
G=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:Q=>{chal.hidden=Q.step!==5;ctl.hidden=Q.step===5;controls()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Minibeast habitat controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);clear();A.gest({down,move,up});controls()}});
G.start()})})();
