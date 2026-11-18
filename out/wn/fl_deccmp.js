/* Flagship – comparing decimals (ages 9–10; NC England Y4–Y5 number: fractions including decimals, compare numbers with up to
   three decimal places; Common Core 5.NBT.A.3b). Zoom a number line to place 0.45 and 0.405, find the first place where two
   decimals differ, add zeros so both have the same number of places, shade hundred squares, and put decimals in order. */
(()=>{
const LINE=['0.45','0.405','0.3','0.25'];
const PV=[['0.45','0.405'],['0.3','0.25'],['2.1','1.99'],['0.06','0.6'],['3.14','3.142']];
const PAD=[['0.7','0.70'],['0.4','0.38'],['0.06','0.1'],['0.5','0.500']];
const GRID=['0.3','0.25','0.06','0.6'];
const ORD=[['3.2','3.14','3.142','3.04'],['0.5','0.15','0.05','0.505']];
const PLACE=['ones','tenths','hundredths','thousandths'],HEAD=['ones','10ths','100ths','1000ths'];
const th=s=>Math.round(parseFloat(s)*1000),dig=(s,k)=>{const [w,f='']=s.split('.');return k?(f[k-1]||''):w},
 first=(a,b)=>[0,1,2,3].find(k=>(dig(a,k)||'0')!==(dig(b,k)||'0')),sign=(a,b)=>th(a)>th(b)?'>':th(a)<th(b)?'<':'=',
 dp=s=>(s.split('.')[1]||'').length,nice=v=>String(+v.toFixed(3));
VIS.reg('flagdeccmp',c=>{let A,X,ctl,quiz,qn=-1,gen=0;const G={};
const INK='#111827',TILE='#ffffff',RIM='#4b5563',GOOD='#15803d',WRONG='#b91c1c',FOCUS='#1d4ed8',TEN='#1e40af',HUN='#93c5fd';
const phase=()=>['line','pv','pad','grid','ord','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),font=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(t,x,y,n,col,w,al){X.font=font(n,w);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(t,x,y,A.W-24)}
function box(r,t,o){o=o||{};X.fillStyle=o.bg||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||RIM;X.stroke();if(t!=null&&t!=='')word(t,r.x+r.w/2,r.y+r.h/2+1,o.n||20,o.ink,o.w||800)}
function paper(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function head(t,won){X.font=font(15,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(15)+16;box({x:A.W/2-w/2,y:A.H*.025,w,h},t,{n:15,r:h/2,bg:won?'#dcfce7':TILE,edge:won?GOOD:null})}
/* ---- 1: a zooming number line; level 0 snaps to 0.05 on 0–1, level 1 snaps to 0.005 inside one tenth ---- */
const ends=()=>({x0:u(26),x1:A.W-u(26),y:A.H*.5});
function span(){const s=G.line;return s.zoom==null?[0,1]:[s.zoom,s.zoom+.1]}
function toX(v){const e=ends(),[lo,hi]=span();return e.x0+(v-lo)/(hi-lo)*(e.x1-e.x0)}
function drawLine(){const s=G.line,e=ends(),[lo,hi]=span(),done=s.i>=LINE.length,col=A.col.tx;paper();
 head(done?'0.25 < 0.3 < 0.405 < 0.45':`Put ${LINE[s.i]} on the line`+(s.zoom!=null?' (zoomed in)':''),done);
 X.strokeStyle=col;X.lineWidth=3;X.beginPath();X.moveTo(e.x0,e.y);X.lineTo(e.x1,e.y);X.stroke();
 for(let k=0;k<=20;k++){const v=lo+(hi-lo)*k/20,x=toX(v),big=k%2===0;X.lineWidth=big?2.5:1.2;X.beginPath();X.moveTo(x,e.y-(big?14:7));X.lineTo(x,e.y+(big?14:7));X.stroke();
  if(s.zoom==null?big:k%10===0||k===10)word(nice(v),x,e.y+u(30),13,col);else if(s.zoom!=null&&big)word(nice(v).slice(-1),x,e.y+u(30),11,A.col.mu)}
 if(s.zoom!=null)word('each small step is 0.005',A.W/2,e.y+u(56),13,A.col.mu,600);
 s.put.forEach((v,j)=>{const n=+v;if(n<lo-1e-9||n>hi+1e-9)return;const x=toX(n),y=e.y-u(36)-(j%2)*u(30);X.fillStyle=FOCUS;X.beginPath();X.moveTo(x,e.y-4);X.lineTo(x-7,y+12);X.lineTo(x+7,y+12);X.fill();box({x:x-u(28),y:y-u(14),w:u(56),h:u(26)},v,{n:14})});
 if(s.try!=null){const x=toX(s.try);X.fillStyle=WRONG;X.beginPath();X.arc(x,e.y,7,0,7);X.fill()}
 if(s.cur!=null&&!done){X.strokeStyle=FOCUS;X.lineWidth=3;X.beginPath();X.arc(toX(s.cur),e.y,11,0,7);X.stroke()}
 if(done)return;box(zoomBtn(),s.zoom==null?'Zoom in on a tenth':'Zoom out',{n:14,w:700})}
const zoomBtn=()=>({x:A.W/2-u(95),y:A.H*.8,w:u(190),h:u(46)});
function tapLine(x){const s=G.line;if(s.i>=LINE.length)return;const e=ends(),[lo,hi]=span(),step=s.zoom==null?.05:.005;
 let v=lo+(x-e.x0)/(e.x1-e.x0)*(hi-lo);v=Math.round(v/step)*step;v=Math.max(lo,Math.min(hi,v));const want=+LINE[s.i];
 if(Math.abs(v-want)<1e-9){s.put.push(LINE[s.i]);s.i++;s.try=null;A.sound.pop();return tell(`${LINE[s.i-1]} placed.`+(s.i>=LINE.length?' Look: 0.405 sits left of 0.45, so it is smaller.':''))}
 s.try=v;A.sound.miss();let m=`You tapped ${nice(v)}.`;
 if(dp(LINE[s.i])===3&&Math.abs(v-.45)<1e-9)m=`That is 0.45. 0.405 has 4 tenths, 0 hundredths and 5 thousandths: just past 0.4.`;
 else if(s.zoom==null&&Math.floor(want*10+1e-9)===Math.floor(v*10+1e-9)&&dp(LINE[s.i])>2)m+=` Close: ${LINE[s.i]} is between ${nice(Math.floor(want*10)/10)} and ${nice(Math.floor(want*10)/10+.05)}. Zoom in to see the small steps.`;
 else m+=` ${LINE[s.i]} has ${dig(LINE[s.i],1)} tenths and ${dig(LINE[s.i],2)||0} hundredths.`;tell(m)}
function zoom(){const s=G.line;if(s.i>=LINE.length)return;if(s.zoom!=null)s.zoom=null;else s.zoom=Math.floor(+LINE[s.i]*10+1e-9)/10;s.try=null;s.cur=span()[0];tell(s.zoom==null?'Whole line from 0 to 1.':`Zoomed in from ${nice(s.zoom)} to ${nice(s.zoom+.1)}.`)}
/* ---- 2: place value chart: tap the first place where the two numbers differ ---- */
function cols(){const w=Math.min(u(78),(A.W-u(40))/4.3),x0=A.W/2-w*2.15;return[0,1,2,3].map(k=>({k,x:x0+k*w+(k?w*.3:0),w:w-6}))}
function drawPV(){const s=G.pv,done=s.i>=PV.length;paper();head(done?'All 5 compared':`Pair ${s.i+1} of 5: where do they first differ?`,done);
 if(done){PV.forEach(([a,b],j)=>word(`${a} ${sign(a,b)} ${b}`,A.W/2,A.H*(.2+j*.13),20,A.col.tx,800));return}
 const [a,b]=PV[s.i],C=cols(),y=[A.H*.32,A.H*.52],h=u(56);
 C.forEach(q=>{word(HEAD[q.k],q.x+q.w/2,A.H*.22,12,A.col.tx,700);[a,b].forEach((n,r)=>box({x:q.x,y:y[r],w:q.w,h},dig(n,q.k),{n:28,bg:s.bad===q.k?'#fee2e2':s.hit===q.k?'#dbeafe':TILE,edge:s.bad===q.k?WRONG:null}))});
 X.fillStyle=A.col.tx;[0,1].forEach(r=>{X.beginPath();X.arc(C[1].x-C[1].w*.17,y[r]+h*.8,4,0,7);X.fill()})}
function pvTap(k){const s=G.pv;if(s.i>=PV.length)return;const [a,b]=PV[s.i],f=first(a,b);
 if(k===f){s.i++;s.bad=null;A.sound.pop();return tell(`The ${PLACE[k]} differ: ${dig(a,k)||0} and ${dig(b,k)||0}. So ${a} ${sign(a,b)} ${b}.`+(s.i>=PV.length?' All 5 compared.':''))}
 s.bad=k;A.sound.miss();let m;if(k<f)m=`Both have ${dig(a,k)||0} ${PLACE[k]}. Move one place right.`;
 else m=`Look left first: the ${PLACE[f]} already differ (${dig(a,f)||0} and ${dig(b,f)||0}), so they decide.`;tell(m)}
/* ---- 3: add zeros so both have the same number of places, then choose the sign ---- */
const signs=()=>['<','=','>'].map((t,j)=>({t,x:A.W/2+(j-1)*u(86)-u(36),y:A.H*.7,w:u(72),h:u(60)}));
const padBox=r=>({x:A.W/2+(r?u(12):-u(152)),y:A.H*.3,w:u(140),h:u(70)});
function drawPad(){const s=G.pad,done=s.i>=PAD.length;paper();head(done?'Zeros on the end change nothing':`Pair ${s.i+1} of 4: same length, then compare`,done);
 if(done){PAD.forEach(([a,b],j)=>word(`${a} ${sign(a,b)} ${b}`,A.W/2,A.H*(.22+j*.15),20,A.col.tx,800));return}
 const v=s.v,same=dp(v[0])===dp(v[1]);v.forEach((n,r)=>{box(padBox(r),n,{n:30,edge:!same&&dp(n)<dp(v[1-r])?FOCUS:null});if(!same&&dp(n)<dp(v[1-r]))word('tap to add a 0',padBox(r).x+u(70),A.H*.3+u(86),13,A.col.tx,600)});
 signs().forEach(q=>box(q,q.t,{n:30,bg:same?TILE:'#e5e7eb',edge:s.bad===q.t?WRONG:null}))}
function addZero(r){const s=G.pad;if(s.i>=PAD.length)return;const v=s.v;if(dp(v[r])>=dp(v[1-r]))return tell(`${v[r]} already has as many places as ${v[1-r]}.`);
 v[r]+='0';A.sound.tick();tell(`${PAD[s.i][r]} is the same as ${v[r]}: no extra tenths, hundredths or thousandths.`)}
function pick(t){const s=G.pad;if(s.i>=PAD.length)return;const [a,b]=s.v;if(dp(a)!==dp(b))return tell('Add zeros first, so both numbers have the same number of places.');
 const ok=sign(a,b);if(t===ok){s.i++;s.bad=null;A.sound.pop();const [p,q]=PAD[s.i-1];s.v=s.i<PAD.length?[...PAD[s.i]]:[];return tell(`${p} ${ok} ${q}.`+(s.i>=PAD.length?' All 4 done.':''))}
 s.bad=t;A.sound.miss();const m=ok==='='?`${a} and ${b} have the same digit in every place, so they are equal.`:`Same number of places, so compare them like whole numbers: ${+a.split('.')[1]} ${PLACE[dp(a)]} and ${+b.split('.')[1]} ${PLACE[dp(b)]}. Which is more?`;tell(m)}
/* ---- 4: shade a hundred square: tap a square to shade up to it, column by column ---- */
function sq(){const n=Math.min((A.W-u(40))/2,A.H*.6)/10,top=A.H*.18;return[0,1].map(j=>({x:A.W/2+(j?u(8):-u(8)-n*10),y:top,n}))}
function drawGrid(){const s=G.grid,done=s.i>=GRID.length,P=s.hold||done?s.i-2:Math.floor(s.i/2)*2,a=GRID[P],b=GRID[P+1];paper();
 head(done?`${a} ${sign(a,b)} ${b}: more shaded means bigger`:s.hold?`${a} ${sign(a,b)} ${b}. Next: shade ${GRID[s.i]}`:`Shade ${GRID[s.i]} (tap a square)`,done);
 sq().forEach((g,j)=>{const idx=P+j,val=GRID[idx],shown=idx<s.i?th(val)/10:idx===s.i?s.n:0;
  for(let cc=0;cc<10;cc++)for(let r=0;r<10;r++){const on=cc*10+r<shown;X.fillStyle=on?(cc*10+10<=shown?TEN:HUN):TILE;X.fillRect(g.x+cc*g.n,g.y+r*g.n,g.n-1,g.n-1)}
  X.strokeStyle='#9ca3af';X.lineWidth=1;X.beginPath();for(let q=1;q<10;q++){X.moveTo(g.x+q*g.n-.5,g.y);X.lineTo(g.x+q*g.n-.5,g.y+g.n*10);X.moveTo(g.x,g.y+q*g.n-.5);X.lineTo(g.x+g.n*10,g.y+q*g.n-.5)}X.stroke();
  X.strokeStyle=idx===s.i?FOCUS:RIM;X.lineWidth=idx===s.i?3:1.5;X.strokeRect(g.x-1,g.y-1,g.n*10+1,g.n*10+1);
  if(val)word(idx<s.i?`${val} = ${th(val)/10} hundredths`:val,g.x+g.n*5,g.y+g.n*10+u(18),14,A.col.tx,800)})}
function shade(n,build){const s=G.grid;if(s.i>=GRID.length)return;s.hold=0;const want=th(GRID[s.i])/10;s.n=n;if(build&&n<want){A.sound.tick();return tell(`${n} hundredths shaded so far.`)}
 if(n===want){s.i++;s.n=0;s.hold=s.i%2===0&&s.i<GRID.length;A.sound.pop();const p=s.i%2===0?GRID.slice(s.i-2,s.i):null;return tell(`${n} hundredths: ${GRID[s.i-1]}.`+(p?` ${p[0]} ${sign(p[0],p[1])} ${p[1]}: compare how much is shaded.`:''))}
 A.sound.miss();const t=Math.floor(want/10),h=want%10,m=`That shades ${n} hundredths (${nice(n/100)}). ${GRID[s.i]} is ${t} whole column${t===1?'':'s'} (tenths) and ${h} more square${h===1?'':'s'} (hundredths).`;tell(m)}
/* ---- 5: tap the smallest one left, until they are in order ---- */
function chips(){const L=ORD[G.ord.set]||[],w=Math.min(u(120),(A.W-u(30))/2);return L.map((v,j)=>({v,x:A.W/2+(j%2?u(6):-w-u(6)),y:A.H*.34+Math.floor(j/2)*u(78),w,h:u(64)}))}
function drawOrd(){const s=G.ord,done=s.set>=ORD.length;paper();head(done?'Both sets in order':`Set ${s.set+1} of 2: tap the smallest one left`,done);
 if(done){ORD.forEach((L,j)=>word([...L].sort((a,b)=>th(a)-th(b)).join(' < '),A.W/2,A.H*(.3+j*.18),17,A.col.tx,800));return}
 word(s.got.join('  <  ')||' ',A.W/2,A.H*.22,18,A.col.tx,800);chips().forEach(q=>{const got=s.got.includes(q.v);box(q,q.v,{n:26,bg:got?'#dcfce7':s.bad===q.v?'#fee2e2':TILE,edge:s.bad===q.v?WRONG:got?GOOD:null})})}
function ordTap(v){const s=G.ord;if(s.set>=ORD.length||s.got.includes(v))return;const left=ORD[s.set].filter(x=>!s.got.includes(x)),min=left.reduce((a,b)=>th(a)<=th(b)?a:b);
 if(v===min){s.got.push(v);s.bad=null;A.sound.pop();if(s.got.length===ORD[s.set].length){const t=s.got.join(' < ');s.set++;s.got=[];return tell(`${t}.`+(s.set>=ORD.length?' Both in order.':''))}return tell(`${v} is the smallest left.`)}
 s.bad=v;A.sound.miss();const f=first(v,min);let m=`${v} is bigger than ${min}: the ${PLACE[f]} are ${dig(v,f)||0} and ${dig(min,f)||0}.`;if(dp(v)>dp(min))m+=' More digits does not mean bigger.';tell(m)}
/* ---- input ---- */
function down(p){const k=phase();
 if(k==='line'){if(inside(p,zoomBtn())&&G.line.i<LINE.length)zoom();else if(Math.abs(p.y-ends().y)<u(40))tapLine(p.x)}
 if(k==='pv'&&G.pv.i<PV.length){const q=cols().find(q=>p.x>=q.x&&p.x<=q.x+q.w&&p.y>A.H*.28&&p.y<A.H*.52+u(60));if(q)pvTap(q.k)}
 if(k==='pad'&&G.pad.i<PAD.length){const r=[0,1].find(r=>inside(p,padBox(r)));if(r!=null)addZero(r);const q=signs().find(q=>inside(p,q));if(q)pick(q.t)}
 if(k==='grid'&&G.grid.i<GRID.length){const g=sq()[G.grid.i%2],cc=Math.floor((p.x-g.x)/g.n),r=Math.floor((p.y-g.y)/g.n);if(cc>=0&&cc<10&&r>=0&&r<10)shade(cc*10+r+1)}
 if(k==='ord'){const q=chips().find(q=>inside(p,q));if(q)ordTap(q.v)}return false}
function reset(){gen++;for(const q in G)delete G[q];G.line={i:0,put:[],zoom:null,cur:0};G.pv={i:0};G.pad={i:0,v:[...PAD[0]]};G.grid={i:0,n:0};G.ord={set:0,got:[]};G.cb=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.cb()}
function begin(i,first,ready,msg){reset();tell(first);G.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='line'&&G.line.i<LINE.length){const [lo,hi]=span(),st=G.line.zoom==null?.05:.005;b(G.line.zoom==null?'Zoom in':'Zoom out',zoom);
  const mv=d=>{const s=G.line;s.cur=Math.max(lo,Math.min(hi,Math.round(((s.cur??lo)+d*st)/st)*st));tell(`Pointer at ${nice(s.cur)}.`)};
  b('◀ Left',()=>mv(-1),`Move the pointer left by ${nice(st)}`);b('Right ▶',()=>mv(1),`Move the pointer right by ${nice(st)}`);b('Place it here',()=>tapLine(toX(G.line.cur??lo)),'Place the number at the pointer')}
 if(k==='pv'&&G.pv.i<PV.length)PLACE.forEach((n,j)=>b(n,()=>pvTap(j),`The ${n} differ first`));
 if(k==='pad'&&G.pad.i<PAD.length){G.pad.v.forEach((n,r)=>b(`Add a 0 to ${n}`,()=>addZero(r)));['<','=','>'].forEach(t=>b(t,()=>pick(t),{'<':'is less than','=':'is equal to','>':'is greater than'}[t]))}
 if(k==='grid'&&G.grid.i<GRID.length){const n=G.grid.n;b('Add a tenth (column)',()=>shade(Math.min(100,Math.floor(n/10)*10+10),1));b('Add a hundredth (square)',()=>shade(Math.min(100,n+1),1));b('Clear',()=>{G.grid.n=0;tell('Cleared.')})}
 if(k==='ord'&&G.ord.set<ORD.length)chips().forEach(q=>{if(!G.ord.got.includes(q.v))b(q.v,()=>ordTap(q.v),`${q.v} is the smallest left`)})}
const steps=[
{h:'Zoom in on the line',p:'Each tenth on the line splits into 10 hundredths, and each hundredth into 10 thousandths. Tap the line to place each number. Zoom in for the small steps.',
predict:{q:'Which is bigger, 0.45 or 0.405?',opts:['0.405: it has more digits','0.45'],ans:1},task:'Place all 4 numbers',
show:()=>auto(0,[()=>tapLine(toX(.45)),()=>zoom(),()=>tapLine(toX(.405)),()=>zoom(),()=>tapLine(toX(.3)),()=>tapLine(toX(.25))],600),go:()=>begin(0,'Put 0.45 on the line. Tap where it goes.',()=>G.line.i>=LINE.length,'Position on the line shows size, not the number of digits.')},
{h:'Line up the places',p:'Write the numbers in a place value chart, points lined up. Start at the left. The first place where the digits differ decides which is bigger. An empty place counts as 0.',task:'Compare all 5 pairs',
show:()=>auto(1,PV.map(([a,b])=>()=>pvTap(first(a,b))),650),go:()=>begin(1,'0.45 and 0.405. Tap the first place where they differ.',()=>G.pv.i>=PV.length,'Compare place by place from the left.')},
{h:'Fill the gaps with zeros',p:'A zero on the end of a decimal adds nothing: 0.7 and 0.70 are both 7 tenths. Add zeros until both numbers have the same number of places, then compare.',
predict:{q:'Is 0.7 less than 0.70?',opts:['Yes: 70 is more than 7','No: they are equal'],ans:1},task:'Compare all 4 pairs',
show:()=>auto(2,[()=>addZero(0),()=>pick('='),()=>addZero(0),()=>pick('>'),()=>addZero(1),()=>pick('<'),()=>addZero(0),()=>addZero(0),()=>pick('=')],500),go:()=>begin(2,'0.7 and 0.70. Tap 0.7 to add a zero.',()=>G.pad.i>=PAD.length,'Same number of places makes the comparison fair.')},
{h:'Shade the hundred square',p:'The square is 1 whole. A column is one tenth and one small square is one hundredth. Tap a square to shade up to it, column by column.',
predict:{q:'Which covers more of the square, 0.3 or 0.25?',opts:['0.25: 25 is more than 3','0.3'],ans:1},task:'Shade all 4 numbers',
show:()=>auto(3,GRID.map(v=>()=>shade(th(v)/10)),600),go:()=>begin(3,'Shade 0.3: tap a square.',()=>G.grid.i>=GRID.length,'0.3 is 30 hundredths, more than 25.')},
{h:'Put them in order',p:'Tap the smallest number left, again and again, until all four are in order.',task:'Order both sets',
show:()=>auto(4,ORD.flatMap(L=>[...L].sort((a,b)=>th(a)-th(b)).map(v=>()=>ordTap(v))),450),go:()=>begin(4,'3.2, 3.14, 3.142, 3.04. Tap the smallest.',()=>G.ord.set>=ORD.length,'Line up the places, then compare from the left.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[
{q:'Which is bigger: 0.45 or 0.405?',a:'0.45',o:[['0.405','More digits does not mean bigger. Both have 4 tenths; then 5 hundredths beats 0.'],['They are equal','They share 4 tenths, but 0.45 has 5 hundredths and 0.405 has 0.']]},
{q:'Which is bigger: 0.3 or 0.25?',a:'0.3',o:[['0.25','25 is more than 3, but these are not whole numbers. 3 tenths beats 2 tenths.'],['They are equal','0.3 is 30 hundredths and 0.25 is 25 hundredths.']]},
{q:'Which sign makes it true? 0.6 ? 0.60',a:'=',o:[['<','A zero on the end adds nothing: 0.60 is still 6 tenths.'],['>','0.6 and 0.60 are both 6 tenths. Neither is bigger.']]},
{q:'Which is bigger: 1.99 or 2.1?',a:'2.1',o:[['1.99','Compare the ones first: 2 beats 1, so 2.1 is bigger, whatever comes after.'],['They are equal','1.99 is less than 2, and 2.1 is more than 2.']]},
{q:'Which list goes from smallest to largest?',a:'0.05, 0.15, 0.5',o:[['0.5, 0.05, 0.15','Shorter is not smaller. 0.5 is 5 tenths, the biggest here.'],['0.15, 0.05, 0.5','Compare tenths: 0.05 has 0 tenths and 0.15 has 1, so 0.05 comes first.']]},
{q:'Which is smallest: 0.09, 0.1 or 0.089?',a:'0.089',o:[['0.1','0.1 is 10 hundredths, more than 9 hundredths. It is the biggest.'],['0.09','0.09 is 0.090, and 0.089 has only 8 hundredths, so 0.089 is smaller.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=phase();if(k==='quiz'){paper();head('Challenge',1);word('0.45 > 0.405   ·   0.3 > 0.25   ·   0.7 = 0.70',A.W/2,A.H*.5,16,A.col.tx,800);return}
 ({line:drawLine,pv:drawPV,pad:drawPad,grid:drawGrid,ord:drawOrd})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{quiz.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Decimal buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});controls()}}).start()})})();
