/* Flagship: Adding within 100 (ages 6–7; CCSS 1.NBT.4, NC Year 2 add a two-digit number and ones, and a two-digit
   number and tens, using place value). Cut the ones to bridge to the next ten on a number line, add ten rods to see
   only the tens digit change, find the jump to the next ten, sort sums by which digit changes, then write the
   bridging steps as an equation. Not flagtenjump (10 more/less) or flagregroup (column method within 1000). */
(()=>{
VIS.reg('flagadd100',c=>{
let Q,bar,chal,cq=-1;const z={};c.fig.classList.add('young');
const MODES=['split','tens','gap','sort','write','chal'];
const mode=()=>MODES[Q.step];
const SPLITS=[[46,7],[38,5]],GAPS=[57,82,26];
const CARDS=[['52 + 30','t'],['52 + 3','o'],['47 + 8','b'],['61 + 20','t'],['75 + 4','o'],['38 + 5','b']];
const BINS=[['t','Only the tens digit changes','Tens change'],['o','Only the ones digit changes','Ones change'],['b','Both digits change','Both change']];
const SLOTS=[2,4,60,4,64],TILES=[2,4,60,4,64,6,50,14];
function speak(t){c.say(t);if(Q)Q.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=Q.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||Q.col.tx;g.fillText(String(s),x,y,o.max||Q.W-12)}
const soft=(k,a)=>Q.mix(Q.col.pn,Q.col[k],Q.col.dark?a*.8:a);
function box(r,k,a,rad){const g=Q.ctx;g.fillStyle=soft(k,a);Q.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.fill();g.strokeStyle=Q.col.tx;g.lineWidth=1.5;g.stroke()}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function note(t){const g=Q.ctx,px=Q.narrow?15:16,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const k=rows.length-1,cand=(rows[k]+' '+w).trim();if(g.measureText(cand).width>Q.W-24&&rows[k])rows.push(w);else rows[k]=cand}
 const n=Math.min(4,rows.length),lh=px+5,top=Q.H-n*lh-12;g.fillStyle=Q.alpha(Q.col.pn,.95);g.fillRect(0,top,Q.W,Q.H-top);rows.slice(0,4).forEach((r,j)=>txt(r,Q.W/2,top+6+lh*j+lh/2,px,{w:600}))}
/* number line from lo to hi: x position of a value */
const NL=(lo,hi,y)=>{const m=Q.narrow?18:34;return{lo,hi,y,x:v=>m+(v-lo)*(Q.W-2*m)/(hi-lo),v:x=>lo+(x-m)*(hi-lo)/(Q.W-2*m)}};
function drawLine(L,mark){const g=Q.ctx,C=Q.col;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(L.x(L.lo),L.y);g.lineTo(L.x(L.hi),L.y);g.stroke();
 const every=L.hi-L.lo>30?5:1;for(let v=L.lo;v<=L.hi;v+=every){const ten=v%10===0;g.lineWidth=ten?2.5:1;g.beginPath();g.moveTo(L.x(v),L.y-(ten?11:6));g.lineTo(L.x(v),L.y+(ten?11:6));g.stroke();
  if(ten)txt(v,L.x(v),L.y+24,Q.narrow?15:17,{w:800,ink:C.vi})}
 if(mark!=null){g.fillStyle=C.tx;g.beginPath();g.arc(L.x(mark),L.y,5,0,7);g.fill()}}
function hop(L,a,b,lab,k){const g=Q.ctx,x0=L.x(a),x1=L.x(b),h=Math.min(70,Math.max(24,Math.abs(x1-x0)*.6));g.strokeStyle=Q.col[k||'am'];g.lineWidth=3;
 g.beginPath();g.moveTo(x0,L.y);g.quadraticCurveTo((x0+x1)/2,L.y-h*1.6,x1,L.y);g.stroke();g.fillStyle=Q.col[k||'am'];g.beginPath();g.arc(x1,L.y,5,0,7);g.fill();
 txt(lab,(x0+x1)/2,L.y-h*.8-12,Q.narrow?14:16,{w:800})}
/* ---- split: cut the ones to land on a whole ten ---- */
const cubeR=()=>{const n=SPLITS[z.si]?SPLITS[z.si][1]:7,s=Math.min(Q.narrow?38:48,(Q.W-60)/n);return{s,x0:(Q.W-s*n)/2,y:Q.H*.56,n}};
function drawSplit(){const cur=SPLITS[z.si]||z.last,C=Q.col,g=Q.ctx;if(!SPLITS[z.si])z.tried=z.last[2];
 const [a,b]=cur,lo=Math.floor(a/10)*10,L=NL(lo,lo+20,Q.H*.36);z.line=L;txt(`${a} + ${b}`,Q.W/2,22,Q.narrow?24:28,{w:800});drawLine(L,a);
 if(z.tried!=null){const m=a+z.tried;hop(L,a,m,'+'+z.tried,m%10===0?'gr':'am');hop(L,m,a+b,'+'+(b-z.tried),m%10===0?'gr':'am')}
 if(!SPLITS[z.si]){txt('Both sums bridged a ten ✓',Q.W/2,Q.H*.6,Q.narrow?17:19,{ink:C.gr});return}
 const R=cubeR();for(let i=0;i<R.n;i++){const r={x:R.x0+i*R.s+(i>=z.cut?8:0),y:R.y,w:R.s-4,h:R.s-4};box(r,i<z.cut?'cy':'pk',.45,6)}
 const cx=R.x0+z.cut*R.s+2;z.cutX=cx;g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(cx,R.y-14);g.lineTo(cx,R.y+R.s+10);g.stroke();
 txt('✂',cx,R.y-26,20);txt(`${z.cut} + ${b-z.cut}`,Q.W/2,R.y+R.s+28,Q.narrow?17:19,{w:800})}
function setCut(k){const n=SPLITS[z.si][1];z.cut=Math.max(1,Math.min(n-1,k));z.tried=null;Q.redraw()}
function jumpNow(){const cur=SPLITS[z.si];if(!cur)return;const [a,b]=cur,m=a+z.cut;z.tried=z.cut;
 if(m%10){return say(`${a} + ${z.cut} = ${m}. That is not a whole ten. Move the cut so the first jump lands on ${Math.ceil(a/10)*10}.`,false)}
 const line=`${a} + ${z.cut} = ${m}, then ${m} + ${b-z.cut} = ${a+b}.`;z.si++;
 if(z.si>=SPLITS.length){z.splitOk=true;z.last=[a,b,m-a];return say(line+' Jump to the next ten, then add what is left.',true)}
 z.cut=1;z.tried=null;z.last=[a,b,m-a];say(line+' Now try '+SPLITS[z.si].join(' + ')+'.',true)}
/* ---- tens: add ten rods to 38 ---- */
const tray=()=>Q.narrow?{rod:{x:Q.W*.08,y:Q.H*.66,w:Q.W*.38,h:56},ones:{x:Q.W*.54,y:Q.H*.66,w:Q.W*.38,h:56}}:{rod:{x:Q.W*.12,y:Q.H*.68,w:Q.W*.32,h:56},ones:{x:Q.W*.56,y:Q.H*.68,w:Q.W*.32,h:56}};
function drawTens(){const C=Q.col,g=Q.ctx,v=38+10*z.rods,L=NL(30,80,Q.H*.25);z.line=L;drawLine(L,38);
 for(let k=0;k<z.rods;k++)hop(L,38+10*k,48+10*k,'+10','gr');
 const t=Math.floor(v/10),o=v%10,s=Q.narrow?9:12,y0=Q.H*.37,area=z.build={x:12,y:y0-8,w:Q.W-24,h:s*10+18};
 g.setLineDash([6,5]);g.strokeStyle=Q.alpha(C.tx,.4);g.strokeRect(area.x,area.y,area.w,area.h);g.setLineDash([]);
 for(let i=0;i<t;i++)for(let j=0;j<10;j++){g.fillStyle=i>=3?C.gr:C.cy;g.fillRect(24+i*(s+6),y0+j*s,s,s-1)}
 for(let j=0;j<o;j++){g.fillStyle=C.pk;g.fillRect(24+t*(s+6)+12+(j%2)*(s+2),y0+Math.floor(j/2)*(s+2),s,s)}
 txt(`${Math.floor(v/10)}`,Q.W-(Q.narrow?78:110),y0+s*4,Q.narrow?40:48,{w:800,ink:C.gr});txt(`${o}`,Q.W-(Q.narrow?46:70),y0+s*4,Q.narrow?40:48,{w:800,ink:C.pk});
 txt('tens  ones',Q.W-(Q.narrow?62:90),y0+s*4+34,13,{w:600});
 const T=tray();if(z.rods<4){box(T.rod,'gr',.25);txt(`ten rods (${4-z.rods} left)`,T.rod.x+T.rod.w/2,T.rod.y+T.rod.h/2,Q.narrow?14:16,{max:T.rod.w-8})}
 box(T.ones,'pk',.2);txt('4 ones',T.ones.x+T.ones.w/2,T.ones.y+T.ones.h/2,Q.narrow?14:16);
 if(z.lift){box({x:z.lift.x-40,y:z.lift.y-22,w:80,h:44},z.lift.k==='rod'?'gr':'pk',.5);txt(z.lift.k==='rod'?'+10':'+4',z.lift.x,z.lift.y,18)}
 txt(`38 + ${10*z.rods} = ${v}`,Q.W/2,Q.H*.05,Q.narrow?20:24,{w:800})}
function addRod(){if(z.rods>=4)return;z.rods++;if(z.rods===4){z.tensOk=true;return say('38 + 40 = 78. Only the tens digit changed: 3 tens became 7 tens. The 8 ones stayed.',true)}say(`38 + ${10*z.rods} = ${38+10*z.rods}. The tens digit went up by one.`,true)}
function addOnes(){say('38 + 4 = 42. But 40 is 4 tens, not 4 ones. Add ten rods instead.',false)}
/* ---- gap: jump to the next ten ---- */
function drawGap(){const C=Q.col,n=GAPS[z.gi]??GAPS[GAPS.length-1];if(GAPS[z.gi]==null)z.m=Math.floor(n/10)*10+10;
 const lo=Math.floor(n/10)*10,L=NL(lo,lo+20,Q.H*.42);z.line=L;txt(GAPS[z.gi]==null?'All three jumps found ✓':`From ${n}, how far to the next ten?`,Q.W/2,24,Q.narrow?17:20,{w:800});drawLine(L,n);
 if(z.m!==n)hop(L,n,z.m,'+'+(z.m-n),z.m===lo+10?'gr':'am');
 z.knob={x:L.x(z.m),y:L.y};Q.ctx.fillStyle=C.vi;Q.ctx.beginPath();Q.ctx.arc(z.knob.x,L.y,13,0,7);Q.ctx.fill();txt(z.m,z.knob.x,L.y+50,Q.narrow?18:20,{w:800})}
function setM(v){const n=GAPS[z.gi];if(n==null)return;z.m=Math.max(n,Math.min(Math.floor(n/10)*10+20,Math.round(v)));speak('At '+z.m);Q.redraw()}
function checkGap(){const n=GAPS[z.gi];if(n==null)return;const ten=Math.floor(n/10)*10+10,j=z.m-n,od=n%10;
 if(z.m===ten){z.gi++;z.m=GAPS[z.gi];if(z.gi>=GAPS.length){z.gapOk=true;return say(`${n} + ${j} = ${ten}. ${j} and ${od} make 10 every time.`,true)}return say(`Yes: ${n} + ${j} = ${ten}, because ${od} + ${j} = 10.`,true)}
 if(j===od)return say(`You jumped ${od}, the same as the ones digit. You need the number that makes 10 with ${od}.`,false);
 if(z.m>ten)return say(`${z.m} is past ${ten}. The next ten after ${n} is ${ten}.`,false);
 say(`${z.m} is not a whole ten yet. Keep going to ${ten}.`,false)}
/* ---- sort: which digit changes? ---- */
const binR=i=>{const w=(Q.W-24-20)/3;return{x:12+i*(w+10),y:Q.H*.48,w,h:Q.narrow?Q.H*.26:Q.H*.3}};
function drawSort(){const cur=CARDS[z.ci],C=Q.col;
 if(cur){z.card=Q.narrow?{x:Q.W/2-80,y:Q.H*.16,w:160,h:60}:{x:Q.W/2-100,y:Q.H*.14,w:200,h:64};const d=z.lift,r=z.card,b=d?{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h}:r;box(b,'vi',.22);txt(cur[0]+' = '+cur[0].split(' + ').reduce((x,y)=>x+ +y,0),b.x+b.w/2,b.y+b.h/2,Q.narrow?22:26,{w:800})}
 else txt('All six sorted',Q.W/2,Q.H*.25,Q.narrow?18:20,{ink:C.gr});
 BINS.forEach(([k,,sh],i)=>{const r=binR(i),w=sh.split(' ');box(r,k==='t'?'gr':k==='o'?'pk':'am',.14);txt(w[0],r.x+r.w/2,r.y+20,Q.narrow?15:17,{w:800,max:r.w-6});txt(w[1],r.x+r.w/2,r.y+40,Q.narrow?15:17,{w:800,max:r.w-6});
  z.sorted.filter(x=>x[1]===k).forEach((x,j)=>txt('✓ '+x[0],r.x+r.w/2,r.y+70+j*24,Q.narrow?15:17,{ink:C.tx,max:r.w-6}))})}
function drop(k){const cur=CARDS[z.ci];z.lift=null;if(!cur)return;const [a,b]=cur[0].split(' + ').map(Number),s=a+b;
 if(k!==cur[1]){const why=cur[1]==='t'?`${b} is ${b/10} tens, so only the tens digit changes: ${a} → ${s}.`:cur[1]==='o'?`${a%10} + ${b} is less than 10, so the tens stay at ${Math.floor(a/10)}: ${a} → ${s}.`:`${a%10} + ${b} is more than 10, so it crosses into the next ten: ${a} → ${s}.`;return say(why,false)}
 z.sorted.push(cur);z.ci++;if(z.ci>=CARDS.length){z.sortOk=true;return say('Adding tens changes the tens digit. Adding ones changes the ones, and can push the tens up one.',true)}say(`Yes: ${a} → ${s}.`,true)}
/* ---- write: the bridging steps as an equation ---- */
const tileR=i=>{const cols=Q.narrow?4:7,w=Q.narrow?(Q.W-24-30)/4:Math.min(80,(Q.W-24-60)/7);return{x:12+(i%cols)*(w+10)+(Q.narrow?0:(Q.W-24-cols*(w+10)+10)/2),y:Q.H*(Q.narrow?.58:.6)+Math.floor(i/cols)*56,w,h:48}};
function drawWrite(){const C=Q.col,px=Q.narrow?20:24;
 const f=k=>z.fill[k]!=null?String(z.fill[k]):k===z.fill.length?'?':'□';
 const rows=Q.narrow?[`58 + 6 = 58 + ${f(0)} + ${f(1)}`,`= ${f(2)} + ${f(3)}`,`= ${f(4)}`]:[`58 + 6 = 58 + ${f(0)} + ${f(1)} = ${f(2)} + ${f(3)} = ${f(4)}`];
 rows.forEach((r,i)=>txt(r,Q.W/2,Q.H*(Q.narrow?.1:.16)+i*36,px,{w:800}));
 const L=NL(50,70,Q.H*(Q.narrow?.44:.4));drawLine(L,58);if(z.fill.length>=1)hop(L,58,60,'+2','gr');if(z.fill.length>=2)hop(L,60,64,'+4','gr');
 TILES.forEach((t,i)=>{if(z.used.includes(i))return;const r=tileR(i);box(r,'cy',.2,10);txt(t,r.x+r.w/2,r.y+r.h/2,22,{w:800})})}
function place(i){const t=TILES[i],k=z.fill.length,want=SLOTS[k];if(want==null)return;
 if(t!==want){const tip=[`58 needs 2 more to make 60, so the first part is 2${t===6?', not all 6 at once':''}.`,`6 was split into 2 and something. 2 + ? = 6.`,`58 + 2 makes ${60}${t===50?', not 50':''}.`,`The 4 left over from the 6 goes here.`,`60 + 4 = 64${t===14?'. 14 forgets the 50':''}.`][k];return say(tip,false)}
 z.fill.push(t);z.used.push(i);if(z.fill.length===SLOTS.length){z.writeOk=true;return say('58 + 6 = 58 + 2 + 4 = 60 + 4 = 64. The equation shows the two jumps.',true)}say('Yes. Next box.',true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=Q,m=mode();g.fillStyle=Q.mix(C.pn,C.vi,C.dark?.04:.04);g.fillRect(0,0,W,H);
 if(m==='chal'){txt('➕ Adding within 100',W/2,H*.42,Q.narrow?20:24);txt('Answer below',W/2,H*.56,15,{ink:C.mu,w:500});Q.fx.draw(g);return}
 ({split:drawSplit,tens:drawTens,gap:drawGap,sort:drawSort,write:drawWrite})[m]();if(z.msg)note(z.msg);Q.fx.draw(g)}
function say(t,good){z.msg=t;if(good)Q.sound.pop();else if(good===false)Q.sound.miss();speak(t);pads();Q.redraw();z.check&&z.check()}
function clear(){for(const k in z)delete z[k];Object.assign(z,{si:0,cut:1,tried:null,rods:0,gi:0,m:GAPS[0],ci:0,sorted:[],fill:[],used:[],msg:'',check:()=>{}});if(Q)Q.redraw()}
function pads(){if(!bar)return;bar.innerHTML='';const m=mode();if(m==='chal')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='split'&&SPLITS[z.si]){add('◀ Cut left',()=>setCut(z.cut-1),'Move the cut left');add('Cut right ▶',()=>setCut(z.cut+1),'Move the cut right');add('Make the jumps',jumpNow)}
 if(m==='tens'&&!z.tensOk){add('Add a ten rod',addRod);add('Add 4 ones',addOnes)}
 if(m==='gap'&&GAPS[z.gi]!=null){add('◀ One less',()=>setM(z.m-1));add('One more ▶',()=>setM(z.m+1));add('Check the jump',checkGap)}
 if(m==='sort'&&CARDS[z.ci])BINS.forEach(([k,l])=>add(l,()=>drop(k),`${CARDS[z.ci][0]}: ${l}`));
 if(m==='write'&&!z.writeOk)TILES.forEach((t,i)=>{if(!z.used.includes(i))add(String(t),()=>place(i),`Put ${t} in the next box`)})}
function down(p){const m=mode();if(m==='chal')return false;
 if(m==='split'&&SPLITS[z.si]){const R=cubeR();if(p.y>R.y-40&&p.y<R.y+R.s+20){z.grab='cut';setCut(Math.round((p.x-R.x0)/R.s));return true}return false}
 if(m==='tens'&&!z.tensOk){const T=tray();if(hit(p,T.rod)&&z.rods<4){z.lift={k:'rod',x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(hit(p,T.ones)){z.lift={k:'ones',x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(m==='gap'&&GAPS[z.gi]!=null){if(z.knob&&Math.abs(p.y-z.knob.y)<40){z.grab='knob';setM(z.line.v(p.x));return true}return false}
 if(m==='sort'&&CARDS[z.ci]){if(hit(p,z.card)){z.lift={x:p.x,y:p.y};return true}for(let i=0;i<3;i++)if(hit(p,binR(i))){drop(BINS[i][0]);return true}return false}
 if(m==='write'&&!z.writeOk){for(let i=0;i<TILES.length;i++)if(!z.used.includes(i)&&hit(p,tileR(i))){z.lift={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}
 return false}
function move(p){if(z.grab==='cut'){const R=cubeR();return setCut(Math.round((p.x-R.x0)/R.s))}if(z.grab==='knob')return setM(z.line.v(p.x));if(z.lift){z.lift.x=p.x;z.lift.y=p.y;Q.redraw()}}
function up(){const g=z.grab,d=z.lift,m=mode();z.grab=null;if(g==='cut')return jumpNow();if(g==='knob')return checkGap();if(!d)return;z.lift=null;
 if(m==='tens'){if(hit(d,z.build)||Math.hypot(d.x-d.x0,d.y-d.y0)<10){return d.k==='rod'?addRod():addOnes()}return Q.redraw()}
 if(m==='sort'){const i=[0,1,2].find(j=>hit(d,binR(j)));return i!=null?drop(BINS[i][0]):Q.redraw()}
 if(m==='write')return place(d.i)}
const ready=(i,ok,line)=>()=>{if(Q.step===i&&!Q.isDone&&(Q.pred[i]!=null||!steps[i].predict)&&ok())Q.done(line()+Q.reveal(i))};
function act(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(Q.step===i)f()},Q.reduced()?30*(j+1):(j+1)*360))}
function start(i,hint,ok,line){clear();say(hint);z.check=ready(i,ok,line)}
const steps=[
{h:'Bridge to the next ten',p:'To add 7 to 46, split the 7. Jump 4 to reach 50, a whole ten. Then jump the other 3: 46 + 7 = 53.',
 predict:{q:'46 + 7: is the answer in the forties or the fifties?',opts:['still in the forties','in the fifties'],ans:1},
 task:'Bridge both sums through a ten',show:()=>act(0,[()=>setCut(4),jumpNow,()=>setCut(2),jumpNow]),
 go:()=>start(0,'Drag the scissors to split the ones. The first jump should land on a whole ten.',()=>z.splitOk,()=>'You bridged through a ten.')},
{h:'Adding tens',p:'40 is 4 tens. Adding tens is like jumping down a hundred square: only the tens digit changes.',
 predict:{q:'38 + 40: which digit changes?',opts:['both digits','only the tens digit','only the ones digit'],ans:1},
 task:'Make 38 + 40',show:()=>act(1,[addRod,addRod,addRod,addRod]),
 go:()=>start(1,'Drag ten rods into the box. What happens to the 8 ones?',()=>z.tensOk,()=>'3 tens + 4 tens = 7 tens.')},
{h:'How far to the next ten?',p:'From 57, the next ten is 60. The jump is 3, because 7 + 3 = 10. Number bonds to 10 tell you the jump.',
 task:'Find the jump for 57, 82 and 26',show:()=>act(2,[()=>setM(60),checkGap,()=>setM(90),checkGap,()=>setM(30),checkGap]),
 go:()=>start(2,'Drag the purple dot along the line to the next ten.',()=>z.gapOk,()=>'Bonds to 10 give the jump.')},
{h:'Which digit changes?',p:'Adding tens changes the tens digit. Adding ones changes the ones digit, unless the ones go past 10.',
 predict:{q:'Do 52 + 3 and 52 + 30 give the same answer?',opts:['yes, both add three','no, 30 is three tens'],ans:1},
 task:'Sort all six sums',show:()=>act(3,CARDS.map(x=>()=>drop(x[1]))),
 go:()=>start(3,'Drag the sum to a box, or tap a box.',()=>z.sortOk,()=>'Tens, ones, or both.')},
{h:'Write it down',p:'An equation can show the jumps. 58 + 6 = 58 + 2 + 4 = 60 + 4 = 64.',
 task:'Fill all five boxes',show:()=>act(4,SLOTS.map((v,k)=>()=>place(TILES.findIndex((t,i)=>t===v&&!z.used.includes(i))))),
 go:()=>start(4,'Tap or drag a number into the box with the question mark.',()=>z.writeOk,()=>'The equation matches the jumps.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>z.check()});
const QS=[
 ['46 + 7 = ?',[['53','ok'],['43','stay'],['413','join']]],
 ['38 + 40 = ?',[['78','ok'],['42','ones'],['68','tens']]],
 ['How far is it from 57 to the next ten?',[['3','ok'],['7','digit'],['13','past']]],
 ['52 + 30: which digit changes?',[['only the tens digit','ok'],['only the ones digit','ones'],['both digits','both']]],
 ['58 + 6 = 58 + 2 + 4. Why split 6 into 2 and 4?',[['58 + 2 makes the whole ten 60','ok'],['2 and 4 are even numbers','split'],['to make the answer smaller','split']]],
 ['29 + 5 = ?',[['34','ok'],['24','stay'],['295','join']]],
 ['64 + 30 = ?',[['94','ok'],['67','ones'],['84','tens']]]];
function hint(t){let m='Split to make a whole ten, or add the tens to the tens digit.';
 if(t==='stay')m='The answer crosses into the next ten. Jump to the whole ten first, then add what is left.';
 if(t==='join')m='Do not write the digits side by side. Adding a few ones gives a number just a little bigger.';
 if(t==='ones')m='That added ones. 40 or 30 means tens, so add to the tens digit.';
 if(t==='tens')m='Count the tens again: add the tens digits, and keep the ones the same.';
 if(t==='digit')m='7 is the ones digit. The jump is the number that makes 10 with 7, which is 3.';
 if(t==='past')m='13 jumps past 60 to 70. The next ten after 57 is 60.';
 if(t==='both')m='Adding tens only changes the tens digit. The ones stay the same.';
 if(t==='split')m='We split to land on a whole ten first. Then the rest is easy to add.';
 return m}
function ask(){cq++;const q=QS[cq%QS.length],r=cq%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 chal.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});speak('Challenge: '+q[0]);Q.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)Q.win();else Q.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
Q=FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:A=>{chal.hidden=A.step!==5;bar.hidden=A.step===5;pads()},
 init:A=>{Q=A;clear();const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Adding buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
Q.start()})})();
