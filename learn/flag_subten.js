/* Flagship: subtracting multiples of 10 (ages 6–7; CCSS 1.NBT.C.6). Take bundles of ten away, turn 7 − 3 = 4 into
   7 tens − 3 tens = 4 tens, jump back in tens, find missing tens, check answers. Tap, drag or use the buttons. */
(()=>{
const K={ink:'#111827',soft:'#374151',paper:'#fefcf7',rim:'#1f2937',wood:'#b45309',woodDk:'#78350f',band:'#1d4ed8',gone:'#f3f4f6',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',note:'#fff7ed',pick:'#dbeafe'};
const {TAKE,LEAVE,FACTS,HOPS,KIDS,QZ,WHY}=SUBTENART;
VIS.reg('flagsubten',c=>{let A,X,pad,box,qn=-1,job=0;const S={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const speak=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function txt(t,x,y,n,col,wt,al){X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function lines(t,w,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const wd of String(t).split(' ')){const nx=cur?cur+' '+wd:wd;if(cur&&X.measureText(nx).width>w){out.push(cur);cur=wd}else cur=nx}out.push(cur);return out}
function card(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(t,won){const L=lines(t,A.W-44,14),lh=z(14)+4,h=Math.max(z(36),L.length*lh+14);card(12,10,A.W-24,h,won?K.okBg:K.note,won?K.ok:K.rim,2);L.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?K.ok:K.ink));return 10+h}
function footer(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=z(13)+5,h=L.length*lh+12,y=A.H-h-10;card(12,y,A.W-24,h,'#ffffff',S.bad?K.no:K.ok,3);L.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),13,S.bad?K.no:K.ink))}
const oops=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const nice=m=>{S.bad=false;S.msg=m;A.sound.pop()};
const mode=()=>['take','fact','hop','leave','kids','quiz'][A.step];
/* ---- bundles of ten ---- */
function sticks(x,y,w,h,faded){const n=10,gap=w/(n+1);X.lineCap='round';X.lineWidth=Math.max(2,gap*.55);
 for(let i=0;i<n;i++){const sx=x+gap*(i+1);X.strokeStyle=faded?'#d1d5db':(i%2?K.wood:K.woodDk);X.beginPath();X.moveTo(sx,y+5);X.lineTo(sx,y+h-5);X.stroke()}
 const bh=Math.max(12,h*.18);X.fillStyle=faded?'#9ca3af':K.band;X.fillRect(x+2,y+h/2-bh/2,w-4,bh);txt('10',x+w/2,y+h/2,Math.min(12,bh*.8),'#ffffff',900)}
function round(){const R=mode()==='take'?TAKE:LEAVE;return R[Math.min(S.round,R.length-1)]}
function drawBundles(t0,b0){const [a]=round(),n=a/10,cols=Math.min(n,5),rows=Math.ceil(n/5),tilesH=S.phase==='ans'?z(58):0,trayH=z(70),gap=z(8);
 const areaH=b0-t0-trayH-tilesH-gap*3,bw=Math.min(z(64),(A.W-z(32)-gap*(cols-1))/cols),bh=Math.min(z(110),(areaH-gap*(rows-1))/rows),x0=(A.W-(cols*bw+(cols-1)*gap))/2;S.rects=[];
 for(let i=0;i<n;i++){const r={x:x0+(i%5)*(bw+gap),y:t0+gap+Math.floor(i/5)*(bh+gap),w:bw,h:bh,i};S.rects.push(r);const d=S.drag&&S.drag.i===i;
  if(!S.have[i]){card(r.x,r.y,bw,bh,K.gone,'#9ca3af',1.5);continue}
  const px=d?S.drag.x-bw/2:r.x,py=d?S.drag.y-bh/2:r.y;card(px,py,bw,bh,'#ffffff',d?K.band:K.rim,d?3.5:2);sticks(px,py,bw,bh)}
 const ty=t0+gap*2+rows*bh+(rows-1)*gap;S.tray={x:z(14),y:ty,w:A.W-z(28),h:trayH};card(S.tray.x,ty,S.tray.w,trayH,'#ffffff',K.no,2.5);
 const gone=S.have.filter(v=>!v).length;txt('Take away here',S.tray.x+z(10),ty+z(14),12,K.no,800,'left');
 const sw=Math.min(z(26),(S.tray.w-z(20))/9);for(let j=0;j<gone;j++)sticks(S.tray.x+z(10)+j*(sw+3),ty+z(26),sw,trayH-z(32),true);
 txt(`${S.have.filter(v=>v).length} tens left`,S.tray.x+S.tray.w-z(10),ty+z(14),12,K.ink,900,'right');
 if(S.phase==='ans')drawTiles(ty+trayH+gap,tilesH)}
const rot=v=>v.slice(S.round%3).concat(v.slice(0,S.round%3));
function choices(){const [a,b]=round();return rot([a-b,(a-b)/10,a+b])}
function drawTiles(y,h){const v=S.tiles||[],w=(A.W-z(16)*2-z(8)*(v.length-1))/v.length;S.tileR=v.map((val,i)=>{const r={x:z(16)+i*(w+z(8)),y,w,h:h-z(6),v:val};card(r.x,r.y,r.w,r.h,'#ffffff',K.rim,2);txt(val,r.x+w/2,r.y+r.h/2,20,K.ink,900);return r})}
function take(i){if(S.won||S.phase!=='move')return;const [a,b]=round(),k=mode();if(i==null)i=S.have.lastIndexOf(true);if(i<0||!S.have[i])return;
 if(k==='take'&&S.have.filter(v=>!v).length>=b/10)return oops(`You only take away ${b}. ${b} is ${b/10} tens, so take ${b/10} bundles.`);
 if(k==='leave'&&S.have.filter(v=>v).length<=b/10)return oops(`Stop at ${b}: that is ${b/10} bundles left.`);
 S.have[i]=false;A.sound.tick();S.msg='';S.bad=false;const gone=S.have.filter(v=>!v).length,left=n=>S.have.filter(v=>v).length;
 if(k==='take'&&gone===b/10){S.phase='ans';S.tiles=choices();nice(`You took away ${gone} tens. ${left()} tens are left. What is ${a} − ${b}?`)}
 if(k==='leave'&&left()===b/10){S.phase='ans';S.tiles=choices();nice(`${gone} tens taken away. ${a} − ? = ${b}. What number did you take away?`)}
 sync()}
function putBack(){if(S.won||S.phase!=='move')return;const i=S.have.indexOf(false);if(i<0)return;S.have[i]=true;A.sound.tick();S.msg='';sync()}
function answer(v){if(S.won||S.phase!=='ans')return;const [a,b]=round(),k=mode(),R=k==='take'?TAKE:LEAVE,right=a-b;
 if(v!==right){if(v===right/10)return oops(`${right/10} tens is ${right}, not ${v}. The bundles are tens.`);return oops(`${v} is ${a} + ${b}. Taking away makes the number smaller.`)}
 nice(k==='take'?`Yes: ${a} − ${b} = ${right}. ${a/10} tens − ${b/10} tens = ${right/10} tens.`:`Yes: ${a} − ${right} = ${b}. You took away ${right/10} tens.`);S.round++;
 if(S.round===R.length){S.won=true;S.msg=k==='take'?'Take away the tens. The tens left tell you the answer.':'Count the tens you took away. That is the missing number.'}else{S.have=Array(R[S.round][0]/10).fill(true);S.phase='move'}sync()}
/* ---- known fact ---- */
function drawFacts(t0,b0){const F=FACTS[Math.min(S.round,2)],[a,b,cards]=F;txt(`${a} − ${b} = ?`,A.W/2,t0+z(26),26,K.ink,900);
 txt(`${a/10} tens − ${b/10} tens`,A.W/2,t0+z(54),13,K.soft,700);
 if(S.won){txt(cards.find(q=>q[1]==='ok')[0]+', so '+a+' − '+b+' = '+(a-b)+'.',A.W/2,t0+z(90),15,K.ok,800);S.factR=[];S.tileR=[];return}
 if(S.phase==='ans'){S.tiles=rot([a-b,(a-b)/10,a+b]);txt('Use the fact: '+cards.find(q=>q[1]==='ok')[0],A.W/2,t0+z(84),14,K.ok,800);drawTiles(t0+z(104),z(60));S.factR=[];return}
 const h=Math.min(z(54),(b0-t0-z(86))/3-z(8));S.factR=cards.map((q,i)=>{const r={x:z(30),y:t0+z(76)+i*(h+z(8)),w:A.W-z(60),h,i};card(r.x,r.y,r.w,h,S.sel===i?K.pick:'#ffffff',K.rim,2);txt(q[0],A.W/2,r.y+h/2,18,K.ink,800);return r})}
function pickFact(i){if(S.won||S.phase!=='fact')return;const [a,b,cards]=FACTS[S.round],q=cards[i];
 if(q[1]==='add')return oops(`${q[0]} is adding. ${a} − ${b} takes away, so use a take-away fact.`);
 if(q[1]==='ones')return oops(`${q[0]} takes away ${b/10} ones. You need to take away ${b/10} tens: use ${cards.find(x=>x[1]==='ok')[0]}.`);
 S.phase='ans';nice(`${q[0]}, so ${a/10} tens − ${b/10} tens = ${(a-b)/10} tens. What is ${a} − ${b}?`);sync()}
function factAns(v){if(S.won||S.phase!=='ans')return;const [a,b]=FACTS[S.round],r=a-b;
 if(v!==r)return oops(v===r/10?`${v} is the ones fact. These are tens: ${r/10} tens is ${r}.`:`${v} is ${a} + ${b}. Take away, do not add.`);
 nice(`${a} − ${b} = ${r}.`);S.round++;if(S.round===FACTS.length){S.won=true;S.msg='Know 9 − 4 = 5? Then you know 90 − 40 = 50.'}else S.phase='fact';sync()}
/* ---- number line ---- */
function drawLine(t0,b0){const [a,b]=HOPS[Math.min(S.round,2)],x0=z(24),x1=A.W-z(24),y=t0+(b0-t0)*.58,px=v=>x0+(x1-x0)*v/100;S.lineY=y;S.px=px;
 txt(`${a} − ${b} = ?   Jump back in tens.`,A.W/2,t0+z(24),A.narrow?15:18,K.ink,900);
 X.strokeStyle=K.rim;X.lineWidth=3;X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke();
 for(let v=0;v<=100;v+=10){X.lineWidth=2;X.beginPath();X.moveTo(px(v),y-8);X.lineTo(px(v),y+8);X.stroke();txt(v,px(v),y+z(22),A.narrow?11:13,K.ink,800)}
 for(let j=0;j<S.jumps;j++){const from=a-10*j,to=from-10,mx=(px(from)+px(to))/2,r=(px(from)-px(to))/2;X.strokeStyle=K.band;X.lineWidth=2.5;X.beginPath();X.arc(mx,y-2,r,Math.PI,0);X.stroke();txt('−10',mx,y-r-z(10),A.narrow?11:13,K.band,900)}
 const fx=px(S.pos),fy=y-z(16);X.fillStyle='#15803d';X.beginPath();X.arc(fx,fy,z(13),0,7);X.fill();X.fillStyle='#ffffff';X.beginPath();X.arc(fx-z(5),fy-z(5),z(4),0,7);X.arc(fx+z(5),fy-z(5),z(4),0,7);X.fill();X.fillStyle=K.ink;X.beginPath();X.arc(fx-z(5),fy-z(5),z(2),0,7);X.arc(fx+z(5),fy-z(5),z(2),0,7);X.fill();
 S.frog={x:fx-z(22),y:fy-z(22),w:z(44),h:z(44)};txt(`Jumps: ${S.jumps}`,A.W/2,t0+z(50),13,K.soft,800);
 const w=Math.min(z(160),A.W*.42);S.stopR={x:A.W/2-w/2,y:b0-z(52),w,h:z(46)};card(S.stopR.x,S.stopR.y,w,z(46),'#ffffff',K.ok,2.5);txt('Stop here',A.W/2,S.stopR.y+z(23),15,K.ok,900)}
function hop(){if(S.won)return;const [a,b]=HOPS[S.round];if(S.pos<=0)return oops('You are at 0. You cannot jump back any more.');S.jumps++;S.pos-=10;S.msg='';S.bad=false;A.sound.tick();sync()}
function stop(){if(S.won)return;const [a,b]=HOPS[S.round],need=b/10;
 if(S.jumps<need)return oops(`You jumped back ${S.jumps} tens, that is ${S.jumps*10}. ${b} is ${need} tens: jump ${need-S.jumps} more.`);
 if(S.jumps>need){const made=S.jumps;S.pos=a;S.jumps=0;return oops(`${made} jumps is too many. ${b} is ${need} tens, so ${need} jumps. Start again from ${a}.`)}
 nice(`${need} jumps of ten back from ${a} lands on ${a-b}. ${a} − ${b} = ${a-b}.`);S.round++;
 if(S.round===HOPS.length){S.won=true;S.msg='One jump back is one ten. The tens digit tells you how many jumps.'}else{S.pos=HOPS[S.round][0];S.jumps=0}sync()}
/* ---- children ---- */
function drawKids(t0,b0){const [nums,kids]=KIDS[Math.min(S.round,2)],w=(A.W-z(48))/3,h=Math.min(z(130),b0-t0-z(70));txt(`${nums[0]} − ${nums[1]} = ?`,A.W/2,t0+z(24),24,K.ink,900);
 S.kidR=kids.map((k,i)=>{const r={x:z(16)+i*(w+z(8)),y:t0+z(52),w,h,i};card(r.x,r.y,w,h,'#ffffff',K.rim,2);X.fillStyle=['#fecaca','#c7d2fe','#fde68a'][i];X.beginPath();X.arc(r.x+w/2,r.y+z(28),z(18),0,7);X.fill();X.strokeStyle=K.rim;X.lineWidth=1.5;X.stroke();
  txt(k[0],r.x+w/2,r.y+z(62),13,K.ink,800);txt('says '+k[1],r.x+w/2,r.y+z(88),17,K.ink,900);return r})}
function judge(i){if(S.won)return;const [nums,kids]=KIDS[S.round],k=kids[i];if(k[1]!==nums[0]-nums[1])return oops(k[2]);nice(`${k[0]} is right: ${nums[0]} − ${nums[1]} = ${k[1]}.`);S.round++;if(S.round===KIDS.length){S.won=true;S.msg='Take away tens, keep the answer in tens.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=mode(),[a,b]=k==='take'||k==='leave'?round():[0,0];
 const H={take:[`${a} − ${b}. Take away ${b/10} bundles of ten.`,'Take away tens, count the tens left.'],fact:['Pick the fact that helps.','A small fact gives a tens fact.'],hop:['Tap the frog to jump back 10. Then tap Stop here.','Jump back in tens.'],
  leave:[`${a} − ? = ${b}. Take away bundles until ${b/10} are left.`,'Missing tens found.'],kids:['Who is right? Tap the right answer.','Tens stay tens.'],quiz:['Take away tens. Use a fact you know.','']};
 const t=banner(S.won?H[k][1]:H[k][0],S.won),bot=A.H-(S.msg?z(66):z(12));
 if(k==='take'||k==='leave')drawBundles(t,bot);if(k==='fact')drawFacts(t,bot);if(k==='hop')drawLine(t,bot);if(k==='kids')drawKids(t+z(6),bot);
 if(k==='quiz'){const L=lines('70 − 30: 7 tens take away 3 tens leaves 4 tens. 4 tens is 40.',A.W-z(60),16);L.forEach((r,i)=>txt(r,A.W/2,t+z(60)+i*z(24),16,K.soft,700))}
 footer();A.fx.draw(X)}
let p0=null;
function down(p){const k=mode();p0=p;
 if((k==='take'||k==='leave')&&!S.won){if(S.phase==='move'){const r=(S.rects||[]).find(q=>S.have[q.i]&&hit(p,q));if(r){S.drag={i:r.i,x:p.x,y:p.y};A.redraw();return true}if(hit(p,S.tray)&&k==='leave'){putBack();return true}}
  else{const r=(S.tileR||[]).find(q=>hit(p,q));if(r){answer(r.v);return true}}}
 if(k==='fact'&&!S.won){if(S.phase==='fact'){const r=(S.factR||[]).find(q=>hit(p,q));if(r){pickFact(r.i);return true}}else{const r=(S.tileR||[]).find(q=>hit(p,q));if(r){factAns(r.v);return true}}}
 if(k==='hop'&&!S.won){if(hit(p,S.frog)){hop();return true}if(hit(p,S.stopR)){stop();return true}}
 if(k==='kids'){const r=(S.kidR||[]).find(q=>hit(p,q));if(r){judge(r.i);return true}}
 return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const tap=p0&&Math.hypot(p.x-p0.x,p.y-p0.y)<10;if(tap||hit(p,S.tray))take(d.i);else A.redraw()}
function sync(){const k=mode();let d='Challenge.';const left=()=>S.have.filter(v=>v).length;
 if(k==='take'||k==='leave'){const [a,b]=round();d=S.won?'All three done.':`Sum ${S.round+1} of 3: ${k==='take'?a+' − '+b:a+' − ? = '+b}. ${left()} bundles of ten left, ${S.have.length-left()} taken away.`+(S.phase==='ans'?' Answers: '+S.tiles.join(', ')+'.':'')}
 if(k==='fact'){const [a,b,cards]=FACTS[Math.min(S.round,2)];d=S.won?'All three facts used.':`Sum ${S.round+1} of 3: ${a} − ${b}. `+(S.phase==='fact'?'Facts: '+cards.map(q=>q[0]).join(', ')+'.':'Answers: '+[a-b,(a-b)/10,a+b].join(', ')+'.')}
 if(k==='hop'){const [a,b]=HOPS[Math.min(S.round,2)];d=S.won?'All three jumps done.':`Sum ${S.round+1} of 3: ${a} − ${b}. Frog at ${S.pos} after ${S.jumps} jumps of ten back.`}
 if(k==='kids')d=S.won?'All three checked.':`Sum ${S.round+1} of 3: ${KIDS[S.round][0].join(' − ')}. ${KIDS[S.round][1].map(q=>q[0]+' says '+q[1]).join(', ')}.`;
 speak((S.msg?S.msg+' ':'')+d);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if((k==='take'||k==='leave')&&!S.won){if(S.phase==='move'){b('Take away one ten',()=>take());if(k==='leave')b('Put one ten back',putBack)}else S.tiles.forEach(v=>b('Answer: '+v,()=>answer(v)))}
 if(k==='fact'&&!S.won){const [a,bb,cards]=FACTS[S.round];if(S.phase==='fact')cards.forEach((q,i)=>b('Fact: '+q[0],()=>pickFact(i)));else[a-bb,(a-bb)/10,a+bb].forEach(v=>b('Answer: '+v,()=>factAns(v)))}
 if(k==='hop'&&!S.won){b('Jump back 10',hop);b('Stop here',stop)}
 if(k==='kids'&&!S.won)KIDS[S.round][1].forEach((q,i)=>b(`${q[0]} says ${q[1]}`,()=>judge(i)));
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){job++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,sel:null,drag:null,round:0,phase:'move',tiles:[],jumps:0,pos:0,have:[]})}
const seqBundles=(R,leave)=>{const out=[];R.forEach(([a,b])=>{const n=leave?(a-b)/10:b/10;for(let j=0;j<n;j++)out.push(()=>take());out.push(()=>answer(a-b))});return out};
const steps=[
{h:'Take away tens',p:'Each bundle is ten sticks. 70 is 7 bundles. To work out 70 − 30, take away 3 bundles and count the tens left.',
predict:{q:'70 − 30 = ?',opts:['4','40','100'],ans:1},
task:'Take away the tens in 3 sums',show:()=>{steps[0].go();play(seqBundles(TAKE,false),200)},go:()=>{reset();S.have=Array(TAKE[0][0]/10).fill(true);sync();S.after=ready(0,()=>S.won,'Tens taken away three times.')}},
{h:'Use a fact you know',p:'7 − 3 = 4. So 7 tens − 3 tens = 4 tens, and 4 tens is 40. A small take-away fact gives you the tens answer.',
predict:{q:'8 − 3 = 5. So 80 − 30 = ?',opts:['5','50','110'],ans:1},
task:'Pick the fact, then the answer, 3 times',show:()=>{steps[1].go();const f=[];FACTS.forEach(([a,b,cards])=>{f.push(()=>pickFact(cards.findIndex(q=>q[1]==='ok')));f.push(()=>factAns(a-b))});play(f,260)},go:()=>{reset();S.phase='fact';sync();S.after=ready(1,()=>S.won,'Facts turned into tens.')}},
{h:'Jump back in tens',p:'On a number line, each jump back is one ten. 90 − 60 is 6 jumps back from 90.',
predict:{q:'90 − 60. How many jumps of ten back?',opts:['60','6','3'],ans:1},
task:'Jump back in tens for 3 sums',show:()=>{steps[2].go();const f=[];HOPS.forEach(([a,b])=>{for(let j=0;j<b/10;j++)f.push(hop);f.push(stop)});play(f,180)},go:()=>{reset();S.pos=HOPS[0][0];sync();S.after=ready(2,()=>S.won,'You landed on every answer.')}},
{h:'Find the missing tens',p:'80 − ? = 30. Take away bundles until 3 are left. The bundles you took away are the missing number.',
predict:{q:'50 − ? = 20',opts:['3','30','70'],ans:1},
task:'Find the missing number in 3 sums',show:()=>{steps[3].go();play(seqBundles(LEAVE,true),200)},go:()=>{reset();S.have=Array(LEAVE[0][0]/10).fill(true);sync();S.after=ready(3,()=>S.won,'Missing tens found.')}},
{h:'Check the answer',p:'Three children worked out the same sum. Only one is right. Find the slips.',
predict:{q:'Ali says 70 − 30 = 4. What went wrong?',opts:['Nothing, he is right','He forgot they are tens','He added'],ans:1},
task:'Find who is right in 3 sums',show:()=>{steps[4].go();play([0,1,2].map(r=>()=>{const [n,k]=KIDS[S.round];judge(k.findIndex(q=>q[1]===n[0]-n[1]))}),500)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Slips spotted.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
let run=0;
function ask(){qn++;const [q,right,wrong]=QZ[qn%QZ.length],all=[[right,'ok']].concat(wrong),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});speak('Challenge: '+q);A.redraw()}
function mark(tag,right){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=tag==='ok';let m=WHY[tag]||'Take away the tens and count the tens left.';
 if(tag==='tensdrop')m='That is the small fact. The numbers are tens, so the answer is tens too: put the 0 back.';
 if(tag==='added')m='That answer adds the numbers. Taking away makes the number smaller.';
 if(tag==='onesonly')m='That takes away ones. The number taken away is a multiple of 10, so take away tens.';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Subtracting tens lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
