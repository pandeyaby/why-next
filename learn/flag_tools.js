/* Flagship: hands-on problem solving with maths tools (ages 5–6; EYFS ELG Number, NC England Y1 "solve one-step problems using
   concrete objects and pictorial representations", CCSS K.OA.A.2 "use objects or drawings to represent the problem").
   Show small sums on fingers, find where fingers run out and move to a ten frame, snap spread-out rows into cube towers to
   compare, pick the right tool for three problems, and check a friend's answer by taking counters away. Tap, drag or use the buttons. */
(()=>{
const {K,SUMS,ROWS,TOOLS,JOBS,CHECKS,BANK,WHY}=TOOLART;
VIS.reg('flagtools',c=>{let A,X,pad,quiz,qi=-1,streak=0,job=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
function speak(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function txt(s,x,y,n,col,w,al){X.font=`${w||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function wrapT(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||12);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(s,won){const L=wrapT(s,A.W-44,15),lh=z(15)+4,h=Math.max(z(38),L.length*lh+14);box(12,10,A.W-24,h,won?K.winBg:K.hint,won?K.win:K.line,2);L.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,15,won?K.win:K.ink));return 10+h}
function note(){if(!G.msg)return 0;const L=wrapT((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,14),lh=z(14)+5,h=L.length*lh+12,y=A.H-h-10;box(12,y,A.W-24,h,'#ffffff',G.bad?K.no:K.win,3);L.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),14,G.bad?K.no:K.ink));return h+14}
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const hit=s=>{G.bad=false;G.msg=s;A.sound.pop()};
const part=()=>['fing','frame','tower','pick','check','quiz'][A.step];
/* ---------- fingers: G.up = how many raised; first a in red, then b in blue ---------- */
function fingerTap(i){if(G.won||G.busy)return;const lim=10;
 if(i!=null&&i<G.up){G.up=i;hit(`${G.up} fingers up.`);return sync()}
 if(G.up>=lim){if(part()==='frame'){G.out=true;return miss('All 10 fingers are up, but 8 + 5 needs 3 more. Fingers ran out! Use the ten frame.')}return}
 G.up++;A.sound.tick();
 if(part()==='fing'){const [a,b]=SUMS[G.round],need=a+b;
  if(G.up<a)hit(`${G.up}…`);else if(G.up===a)hit(`That shows ${a}. Now ${b} more.`);else if(G.up<need)hit(`${a} and ${G.up-a} more…`);
  else if(G.up===need){hit(`${a} and ${b} more is ${need}.`);G.busy=true;setTimeout(()=>{G.busy=false;if(part()!=='fing')return;G.round++;if(G.round>=SUMS.length){G.won=true;G.msg='Fingers are quick for small sums.'}else G.up=0;sync()},A.reduced()?40:800)}
  else{G.up=need;return miss(`That is too many. ${a} and ${b} more is ${need}. Tap a finger to put it down.`)}}
 if(part()==='frame'){if(G.up<10)hit(`${G.up} fingers up.`);else{G.out=true;hit('All 10 fingers are up. 8 + 5 needs 3 more. Fingers ran out! Now fill the ten frame.')}}
 sync()}
/* ---------- ten frame: counters fill cells in order; red first, then blue ---------- */
function addCounter(col){if(G.won||part()!=='frame')return;if(!G.out)return miss('First try 8 + 5 on your fingers. Tap the fingers.');
 const reds=G.cells.filter(q=>q==='r').length,blues=G.cells.length-reds;
 if(col==='r'&&reds>=8)return miss('That is 8 red counters already. Now add the 5 blue ones.');
 if(col==='b'&&reds<8)return miss(`Put in all 8 red counters first. You have ${reds}.`);
 if(col==='b'&&blues>=5)return;G.cells.push(col);A.sound.tick();const n=G.cells.length;
 if(n<10)hit(`${n} counters.`);else if(n===10)hit('The first frame is full: that is 10! Keep going.');else if(n<13)hit(`10 and ${n-10} more.`);
 if(n===13){G.won=true;G.msg='One full ten and 3 more: 13. The ten frame held them all.'}
 sync()}
/* ---------- towers ---------- */
function snap(k){if(G.won||G.tower[k])return;G.tower[k]=true;A.sound.tick();hit(`Row ${k?'B':'A'} is now a tower of ${ROWS[k]}.`);if(G.tower[0]&&G.tower[1])G.msg='Both towers built. Which is taller? Tap it.';sync()}
function pickTall(k){if(G.won)return;if(!(G.tower[0]&&G.tower[1]))return miss('Snap both rows into towers first. Then they stand side by side.');
 if(G.tallOK){return}if(ROWS[k]<ROWS[1-k])return miss(`Row ${k?'B':'A'} looked long, but its tower has only ${ROWS[k]} cubes. Look at the tops.`);
 G.tallOK=true;hit(`Row B has more: 9 is taller than 6. Now: how many more?`);sync()}
function howMany(v){if(G.won)return;if(!G.tallOK)return miss('First tap the taller tower.');
 if(v===15)return miss('15 is 6 + 9 added. "How many more" means the extra cubes on top.');if(v!==3)return miss(`Count only the cubes higher than the short tower. It is 3, not ${v}.`);
 G.won=true;G.msg='9 is 3 more than 6. Towers make comparing easy.';sync()}
/* ---------- choose a tool ---------- */
function choose(t){if(G.won)return;const J=JOBS[G.round];if(t!==J[1])return miss(J[2][t]);
 const why={fingers:'Fingers: quick, and always with you.',frame:'Ten frame: fill the 10, then 3 more. 9 + 4 = 13.',towers:'Towers side by side: 7 is taller. Mia has 3 more.'}[t];
 hit(why);G.round++;if(G.round>=JOBS.length){G.won=true;G.msg='The best tool depends on the problem.'}sync()}
/* ---------- check a friend: take counters away ---------- */
function takeOne(i){if(G.won||part()!=='check')return;const [n,t]=CHECKS[G.round];if(G.gone.length>=t)return miss(`You took away ${t} already. Count what is left.`);
 if(i==null)i=[...Array(n).keys()].reverse().find(j=>!G.gone.includes(j));if(i==null||i>=n||G.gone.includes(i))return;G.gone.push(i);A.sound.tick();
 hit(G.gone.length<t?`Took away ${G.gone.length}.`:`Took away ${t}. Count what is left.`);sync()}
function verdict(ok){if(G.won)return;const [n,t,said]=CHECKS[G.round],left=n-t,who=['Sam','Ava'][G.round];if(G.gone.length<t)return miss(`Take away all ${t} counters first.`);
 if(ok&&said!==left)return miss(`Count the counters left: there are ${left}, not ${said}. So ${who} is not right.`);
 hit(`${n} take away ${t} leaves ${left}. ${who} said ${said}, so the counters show ${who} slipped.`);G.round++;if(G.round>=CHECKS.length){G.won=true;G.msg='Counters let you check an answer yourself.'}else G.gone=[];sync()}
/* ---------- drawing ---------- */
function drawHands(t0,b0,n){const w=A.W-z(40),fw=Math.min(z(46),w/12.5),gap=fw*.25,handW=5*fw+4*gap,mid=z(28),x0=(A.W-(2*handW+mid))/2,palmH=Math.min(z(60),(b0-t0)*.3),py=b0-palmH-z(28),tall=Math.min(z(150),py-t0-z(10));G.fRects=[];
 const sum=part()==='fing'?SUMS[Math.min(G.round,SUMS.length-1)]:[8,5];
 for(let h=0;h<2;h++){const hx=x0+h*(handW+mid);box(hx-z(4),py,handW+z(8),palmH,K.skin,K.skinE,2,z(18));
  for(let f=0;f<5;f++){const i=h*5+f,up=i<G.up,x=hx+f*(fw+gap),fh=up?tall:Math.max(fw*1.6,tall*.35),y=py-fh+z(8);box(x,y,fw,fh,up?(i<sum[0]?'#fca5a5':'#93c5fd'):K.down,up?(i<sum[0]?K.red:K.blue):K.skinE,up?3:1.5,fw/2);
   if(up)txt(i+1,x+fw/2,y+z(16),13,K.ink,900);G.fRects.push({x,y:py-tall,w:fw,h:tall+palmH,i})}}
 txt(`Fingers up: ${G.up}`,A.W/2,py+palmH+z(14),15,K.ink,900)}
function cellRects(x,y,w,h){const nf=2,gap=z(14),cs=Math.min((w-gap)/10,(h)/2,z(48)),fw=5*cs,tot=nf*fw+gap,x1=x+(w-tot)/2,out=[];
 for(let f=0;f<nf;f++)for(let r=0;r<2;r++)for(let q=0;q<5;q++)out.push({x:x1+f*(fw+gap)+q*cs,y:y+r*cs,w:cs,h:cs});return out}
function drawFrame(t0,b0){const handsB=t0+(b0-t0)*.48;drawHands(t0,handsB,10);const fy=handsB+z(14),cells=cellRects(z(16),fy,A.W-z(32),Math.min(z(100),(b0-fy)*.55));G.cellR=cells;
 cells.forEach((r,i)=>{X.fillStyle=K.cell;X.fillRect(r.x,r.y,r.w,r.h);X.strokeStyle=K.dim;X.lineWidth=2;X.strokeRect(r.x,r.y,r.w,r.h);const v=G.cells[i];if(v){X.fillStyle=v==='r'?K.red:K.blue;X.beginPath();X.arc(r.x+r.w/2,r.y+r.h/2,r.w*.36,0,7);X.fill()}});
 const ty=cells[0].y+2*cells[0].h+z(14),tw=(A.W-z(48))/2,th=Math.max(z(44),Math.min(z(56),b0-ty));const reds=G.cells.filter(q=>q==='r').length;
 G.trays=[{x:z(16),y:ty,w:tw,h:th,col:'r'},{x:z(32)+tw,y:ty,w:tw,h:th,col:'b'}];G.trays.forEach(T=>{const left=T.col==='r'?8-reds:5-(G.cells.length-reds);box(T.x,T.y,T.w,T.h,'#ffffff',T.col==='r'?K.red:K.blue,2.5);txt(`${T.col==='r'?'Red':'Blue'}: ${left} left`,T.x+T.w/2,T.y+T.h/2,15,K.ink,800)})}
function drawRows(t0,b0){const cs=Math.min(z(30),(b0-t0)/11),colW=A.W/2;G.rowR=[];G.towR=[];
 ROWS.forEach((n,k)=>{const cx=colW*k+colW/2;txt(k?'Row B':'Row A',cx,t0+z(14),15,K.ink,900);
  if(!G.tower[k]){const lenA=colW-z(30),step=k?lenA*.55/(n-1):lenA/(n-1),rad=Math.min(cs*.42,k?step*1.1:cs*.42),y=t0+z(44),x0=cx-step*(n-1)/2;for(let i=0;i<n;i++){X.fillStyle=k?K.cubeB:K.cubeA;X.beginPath();X.arc(x0+i*step,y+(i%2)*cs*.9,rad,0,7);X.fill()}
   const r={x:cx-colW/2+z(6),y:t0+z(24),w:colW-z(12),h:cs*2.6,k};G.rowR.push(r);txt('Tap to snap into a tower',cx,y+cs*2.1,12,K.dim,700)}
  else{const base=b0-z(8);for(let i=0;i<n;i++){const y=base-(i+1)*cs,extra=i>=ROWS[0]&&k===1&&G.tallOK;box(cx-cs/2,y,cs,cs-2,extra?'#fde68a':(k?K.cubeB:K.cubeA),K.line,extra?3:1.5,4)}
   G.towR.push({x:cx-colW/2+z(6),y:base-n*cs-z(10),w:colW-z(12),h:n*cs+z(10),k});txt(n+' cubes',cx,base-n*cs-z(14),14,K.ink,900)}})
 if(G.tower[0]&&G.tower[1]){X.setLineDash([6,5]);X.strokeStyle=K.dim;X.lineWidth=2;const y=b0-z(8)-ROWS[0]*cs;X.beginPath();X.moveTo(z(16),y);X.lineTo(A.W-z(16),y);X.stroke();X.setLineDash([])}}
function drawTools(t0,b0){const J=JOBS[Math.min(G.round,JOBS.length-1)],L=wrapT(J[0],A.W-z(60),17);L.forEach((r,i)=>txt(r,A.W/2,t0+z(20)+i*(z(17)+6),17,K.ink,900));
 const y=t0+z(30)+L.length*(z(17)+6),w=(A.W-z(48))/3,h=Math.min(z(120),b0-y-z(6));G.toolR=TOOLS.map(([id,name],i)=>{const r={x:z(16)+i*(w+z(8)),y,w,h,id};box(r.x,r.y,w,h,'#ffffff',K.line,2.5);icon(id,r.x+w/2,r.y+h*.42,Math.min(w,h)*.3);txt(name,r.x+w/2,r.y+h-z(16),14,K.ink,900);return r})}
function icon(id,x,y,s){if(id==='fingers'){for(let f=0;f<5;f++){box(x-s+f*s*.42,y-s*.6,s*.3,s*1.1,K.skin,K.skinE,1.5,s*.15)}box(x-s*1.05,y+s*.3,s*2,s*.6,K.skin,K.skinE,1.5,s*.2)}
 if(id==='frame'){const q=s*.38;for(let r=0;r<2;r++)for(let k=0;k<5;k++){X.strokeStyle=K.dim;X.lineWidth=1.5;X.strokeRect(x-2.5*q+k*q,y-q+r*q,q,q);if(r===0||k<3){X.fillStyle=K.red;X.beginPath();X.arc(x-2*q+k*q,y-q/2+r*q,q*.33,0,7);X.fill()}}}
 if(id==='towers'){const q=s*.3;[5,3].forEach((n,k)=>{for(let i=0;i<n;i++)box(x-q*1.4+k*q*1.6,y+s*.8-(i+1)*q,q,q-1,k?K.cubeB:K.cubeA,K.line,1,2)})}}
function drawCheck(t0,b0){const [n,t,said]=CHECKS[Math.min(G.round,CHECKS.length-1)],who=['Sam','Ava'][Math.min(G.round,1)];txt(`${who} says ${n} take away ${t} is ${said}.`,A.W/2,t0+z(18),17,K.ink,900);
 const cs=Math.min(z(56),(A.W-z(40))/5,(b0-t0-z(90))/2),x0=(A.W-5*cs)/2,y0=t0+z(40);G.chkR=[];
 for(let i=0;i<10;i++){const r={x:x0+(i%5)*cs,y:y0+Math.floor(i/5)*cs,w:cs,h:cs,i};X.fillStyle=K.cell;X.fillRect(r.x,r.y,cs,cs);X.strokeStyle=K.dim;X.lineWidth=2;X.strokeRect(r.x,r.y,cs,cs);
  if(i<n){const gone=G.gone.includes(i);X.fillStyle=gone?'#e5e7eb':K.red;X.beginPath();X.arc(r.x+cs/2,r.y+cs/2,cs*.36,0,7);X.fill();if(gone){X.strokeStyle=K.no;X.lineWidth=3;X.beginPath();X.moveTo(r.x+cs*.25,r.y+cs*.25);X.lineTo(r.x+cs*.75,r.y+cs*.75);X.stroke()}G.chkR.push(r)}}
 txt(`Left: ${n-G.gone.length}`,A.W/2,y0+2*cs+z(24),18,K.ink,900)}
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=part(),say={fing:[`Show ${SUMS[Math.min(G.round,1)].join(' + ')} on the fingers. Tap one finger at a time.`,'Fingers: quick for small sums.'],frame:['8 + 5. Try fingers first. Then fill the ten frame.','Ten and 3 more is 13.'],
  tower:['Which row has more? Snap each row into a tower.','Towers make comparing fair.'],pick:['Pick the best tool.','The best tool fits the job.'],check:['Is the friend right? Take away counters to check.','Check with a tool.'],quiz:['Pick a tool that fits the problem.','']};
 const t=banner(G.won?say[k][1]:say[k][0],G.won),b=A.H-note()-z(6);
 if(k==='fing')drawHands(t+z(8),b,10);if(k==='frame')drawFrame(t+z(6),b);if(k==='tower')drawRows(t+z(6),b);if(k==='pick')drawTools(t+z(6),b);if(k==='check')drawCheck(t+z(4),b);
 if(k==='quiz'){icon('fingers',A.W*.2,A.H*.5,z(40));icon('frame',A.W*.5,A.H*.5,z(40));icon('towers',A.W*.8,A.H*.5,z(40))}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let drag=null;
function down(p){const k=part();if(G.busy)return false;
 if(k==='fing'||(k==='frame'&&!G.out)){const r=(G.fRects||[]).find(q=>within(p,q));if(r){fingerTap(r.i);return true}}
 if(k==='frame'){const r=(G.trays||[]).find(q=>within(p,q));if(r){drag={col:r.col,x:p.x,y:p.y,p0:p};return true}if((G.fRects||[]).some(q=>within(p,q))){fingerTap(null);return true}}
 if(k==='tower'){const r=(G.rowR||[]).find(q=>within(p,q));if(r){snap(r.k);return true}const t=(G.towR||[]).find(q=>within(p,q));if(t){pickTall(t.k);return true}}
 if(k==='pick'){const r=(G.toolR||[]).find(q=>within(p,q));if(r){choose(r.id);return true}}
 if(k==='check'){const r=(G.chkR||[]).find(q=>within(p,q));if(r){takeOne(r.i);return true}}
 return false}
function move(p){if(!drag)return;drag.x=p.x;drag.y=p.y;A.redraw()}
function up(p){const d=drag;drag=null;if(!d)return;const tap=Math.hypot(p.x-d.p0.x,p.y-d.p0.y)<10,onFrame=(G.cellR||[]).some(q=>within(p,q));if(tap||onFrame)addCounter(d.col);else A.redraw()}
/* ---------- live text and buttons ---------- */
function sync(){const k=part();let d='Challenge.';
 if(k==='fing')d=G.won?'Both sums shown.':`Sum ${G.round+1} of 2: ${SUMS[G.round].join(' + ')}. Fingers up: ${G.up}.`;
 if(k==='frame')d=`Fingers up: ${G.up} of 10. Ten frame counters: ${G.cells.length} (${G.cells.filter(q=>q==='r').length} red, ${G.cells.filter(q=>q==='b').length} blue).`;
 if(k==='tower')d=`Row A: 6 counters ${G.tower[0]?'in a tower':'spread out'}. Row B: 9 counters ${G.tower[1]?'in a tower':'close together'}.`;
 if(k==='pick')d=G.won?'All three problems matched.':`Problem ${G.round+1} of 3: ${JOBS[G.round][0]} Tools: fingers, ten frame, cube towers.`;
 if(k==='check')d=G.won?'Both answers checked.':`${CHECKS[G.round][0]} counters, ${G.gone.length} taken away, ${CHECKS[G.round][0]-G.gone.length} left.`;
 speak((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(!G.won){if(k==='fing'||(k==='frame'&&!G.out)){b('Put up a finger',()=>fingerTap(null));if(G.up)b('Put one down',()=>fingerTap(G.up-1))}
  if(k==='frame'&&G.out){b('Add a red counter',()=>addCounter('r'));b('Add a blue counter',()=>addCounter('b'))}
  if(k==='tower'){if(!G.tower[0])b('Snap row A',()=>snap(0));if(!G.tower[1])b('Snap row B',()=>snap(1));if(G.tower[0]&&G.tower[1]&&!G.tallOK){b('Row A is taller',()=>pickTall(0));b('Row B is taller',()=>pickTall(1))}
   if(G.tallOK)[3,15,9].forEach(v=>b(v+' more',()=>howMany(v)))}
  if(k==='pick')TOOLS.forEach(([id,name])=>b(name,()=>choose(id)));
  if(k==='check'){const [n,t,said]=CHECKS[G.round],who=['Sam','Ava'][G.round];if(G.gone.length<t)b('Take one away',()=>takeOne(null));else{b(`${who} is right: ${said}`,()=>verdict(true));b(`${who} slipped: it is ${n-t}`,()=>verdict(false))}}}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){job++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,busy:false,round:0,up:0,out:false,cells:[],tower:[false,false],tallOK:false,gone:[]})}
const rep=(n,f)=>Array.from({length:n},()=>f);
const steps=[
{h:'Fingers for small sums',p:'Fingers are a maths tool you always have. Show the first number, then put up more fingers for the second number.',
task:'Show 4 + 3, then 5 + 2, on the fingers',show:()=>{steps[0].go();play([...rep(7,()=>fingerTap(null)),...rep(5,()=>{}),...rep(7,()=>fingerTap(null))],170)},go:()=>{reset();sync();G.after=finish(0,()=>G.won,'7, then 7 again.')}},
{h:'When fingers run out',p:'You have 10 fingers. Some sums need more than 10. A ten frame has 10 boxes, and you can use two.',
predict:{q:'Can you show 8 + 5 on your fingers?',opts:['Yes, easily','No, I only have 10 fingers','Yes, on one hand'],ans:1},
task:'Try 8 + 5 on fingers, then fill the ten frames',show:()=>{steps[1].go();play([...rep(10,()=>fingerTap(null)),()=>fingerTap(null),...rep(8,()=>addCounter('r')),...rep(5,()=>addCounter("b"))],130)},go:()=>{reset();sync();G.after=finish(1,()=>G.won,'13: a full ten and 3 more.')}},
{h:'Towers to compare',p:'Counters spread out can trick your eyes. Snap them into cube towers and stand them side by side.',
predict:{q:'Row A has 6 counters spread out. Row B has 9 close together. Which has more?',opts:['Row A, it is longer','Row B','They are the same'],ans:1},
task:'Snap both rows, then find how many more',show:()=>{steps[2].go();play([()=>snap(0),()=>snap(1),()=>pickTall(1),()=>howMany(3)],600)},go:()=>{reset();sync();G.after=finish(2,()=>G.won,'Row B has 3 more.')}},
{h:'Pick the best tool',p:'Fingers, a ten frame or cube towers? Think about the job, then pick.',
predict:{q:'9 + 4. Which tool is best?',opts:['Fingers','A ten frame','Cube towers'],ans:1},
task:'Pick the best tool for 3 problems',show:()=>{steps[3].go();play(JOBS.map(J=>()=>choose(J[1])),700)},go:()=>{reset();sync();G.after=finish(3,()=>G.won,'Right tool, right job.')}},
{h:'Check with counters',p:'A tool can check an answer. Take away the counters, then count what is left.',
task:'Check Sam and Ava with counters',show:()=>{steps[4].go();play([...rep(3,()=>takeOne(null)),()=>verdict(false),...rep(4,()=>takeOne(null)),()=>verdict(false)],380)},go:()=>{reset();sync();G.after=finish(4,()=>G.won,'Both checked with counters.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,right,wrong]=BANK[qi%BANK.length],all=[[right,'ok'],...wrong],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});speak('Challenge: '+q);A.redraw()}
function mark(tag,right){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';let m=WHY[tag]||'Think about what the tool can hold.';
 if(tag==='fingers')m='Count your fingers: 10. 8 + 4 is 12, so you run out. Use a ten frame.';
 if(tag==='longer')m='A longer row is not always more. Snap the counters into towers to compare.';
 if(tag==='add')m='15 is 6 + 9 put together. "How many more" means the difference: 9 is 3 more than 6.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Maths tools lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
