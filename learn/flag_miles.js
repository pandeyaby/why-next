/* Flagship: miles and kilometres (ages 10–11; NC England Y6 measurement: convert between miles and kilometres; topic evidence:
   convert 40 miles to about 64 km, explain why the factor is about 1.6, and compare a 10 km race with a 6-mile run).
   Slide a marker along a double scale until a mile tick meets a km tick, stack 5-mile blocks to reach 40 miles, find where one
   mile ends on a km ruler, choose the right chain for km to miles, and put race distances in order. Buttons do everything. */
(()=>{
const {KM,TARGET,WAYS,CHAINS,RACES,BANK,WHY}=MILESART;
const C={ink:'#111827',dim:'#374151',page:'#fffdf8',rim:'#1f2937',tip:'#ecfeff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',
 mi:'#7c2d12',miBg:'#ffedd5',km:'#1e3a8a',kmBg:'#dbeafe',pin:'#be123c'};
VIS.reg('flagmiles',c=>{let A,X,ctl,quizBox,turn=-1,tick=0,inRow=0;const M={after:()=>{}};
const sz=n=>Math.round(n*(A.narrow?1.04:1.12));
const one=v=>(Math.round(v*10)/10).toFixed(1).replace(/\.0$/,'');
function announce(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function write(s,x,y,n,col,wt,al){X.font=`${wt||800} ${sz(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function fold(s,w,n){X.font=`800 ${sz(n)}px system-ui,sans-serif`;const r=[];let cur='';String(s).split(' ').forEach(t=>{const nx=cur?cur+' '+t:t;if(cur&&X.measureText(nx).width>w){r.push(cur);cur=t}else cur=nx});r.push(cur);return r}
function slab(x,y,w,h,fill,edge,lw,rad){A.paint.rrect(x,y,w,h,rad||12);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function centre(s,R,n,col){const r=fold(s,R.w-sz(14),n),lh=sz(n)+4;r.forEach((t,i)=>write(t,R.x+R.w/2,R.y+R.h/2+(i-(r.length-1)/2)*lh,n,col))}
const inside=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function top(s,won){const r=fold(s,A.W-44,15),lh=sz(15)+4,h=Math.max(sz(38),r.length*lh+12);slab(12,10,A.W-24,h,won?C.okBg:C.tip,won?C.ok:C.rim,2);r.forEach((t,i)=>write(t,A.W/2,10+h/2+(i-(r.length-1)/2)*lh,15,won?C.ok:C.ink));return 10+h}
function note(){if(!M.msg)return 0;const r=fold((M.bad?'✗ ':'✓ ')+M.msg,A.W-44,13),lh=sz(13)+5,h=r.length*lh+12,y=A.H-h-10;slab(12,y,A.W-24,h,'#ffffff',M.bad?C.no:C.ok,3);r.forEach((t,i)=>write(t,A.W/2,y+6+lh*(i+.5),13,M.bad?C.no:C.ink));return h+14}
const miss=s=>{M.bad=true;M.msg=s;A.sound.miss();say()};
const hitIt=s=>{M.bad=false;M.msg=s;A.sound.pop()};
const now=()=>['line','stack','onemile','ways','races','quiz'][A.step];
/* a shared drawing: a km scale with a mile scale on top, same length per km */
function scales(x0,x1,y,maxKm,step){const k=(x1-x0)/maxKm;X.lineWidth=2;X.strokeStyle=C.mi;X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke();X.strokeStyle=C.km;X.beginPath();X.moveTo(x0,y+sz(40));X.lineTo(x1,y+sz(40));X.stroke();
 for(let m=0;m*KM<=maxKm+1e-9;m+=step.mi){const x=x0+m*KM*k;X.strokeStyle=C.mi;X.beginPath();X.moveTo(x,y-sz(9));X.lineTo(x,y+sz(4));X.stroke();write(m,x,y-sz(18),11,C.mi,900)}
 for(let q=0;q<=maxKm+1e-9;q+=step.km){const x=x0+q*k;X.strokeStyle=C.km;X.beginPath();X.moveTo(x,y+sz(36));X.lineTo(x,y+sz(49));X.stroke();write(q,x,y+sz(60),11,C.km,900)}
 write('miles',x0-4,y-sz(34),12,C.mi,900,'left');write('km',x0-4,y+sz(78),12,C.km,900,'left');return k}
/* ---------- step 0: slide along the double scale ---------- */
function slide(mi){if(M.won)return;M.mi=Math.max(0,Math.min(10,Math.round(mi*10)/10));const km=M.mi*KM,close=Math.abs(km-Math.round(km))<.06&&M.mi>=1&&Math.abs(M.mi-Math.round(M.mi))<.01;
 M.bad=false;M.msg=`${one(M.mi)} miles is ${km.toFixed(2)} km.`;if(close){M.won=true;M.msg=`${M.mi} miles is ${km.toFixed(2)} km: almost exactly ${Math.round(km)} km. That is the rule: 5 miles ≈ 8 km.`;A.sound.pop()}say()}
function drawLine(t0,b0){const x0=sz(26),x1=A.W-sz(26),y=t0+(b0-t0)*.3,k=scales(x0,x1,y,16.5,{mi:1,km:1});M.lineR={x:x0-10,y:y-sz(40),w:x1-x0+20,h:sz(120),x0,k};
 const x=x0+M.mi*KM*k;X.strokeStyle=C.pin;X.lineWidth=3;X.beginPath();X.moveTo(x,y-sz(26));X.lineTo(x,y+sz(66));X.stroke();slab(x-sz(16),y+sz(70),sz(32),sz(30),C.pin,C.rim,2,8);write('drag',x,y+sz(85),10,'#ffffff',900);
 write(`${one(M.mi)} mi = ${(M.mi*KM).toFixed(2)} km`,A.W/2,y+sz(124),17,C.ink,900)}
/* ---------- step 1: stack 5-mile blocks ---------- */
function addBlock(){if(M.won)return;M.blocks++;const mi=M.blocks*5;if(mi>TARGET){M.blocks--;return miss(`That would be ${mi} miles. You only need ${TARGET}.`)}
 hitIt(`${M.blocks} × 5 miles = ${mi} miles, so ${M.blocks} × 8 km = ${M.blocks*8} km.`);if(mi===TARGET){M.won=true;M.msg=`40 miles is 8 lots of 5 miles, so it is about 8 × 8 = 64 km.`}say()}
function drawStack(t0,b0){const x0=sz(20),x1=A.W-sz(20),cell=(x1-x0)/8,bh=sz(36),y1=t0+sz(30),y2=y1+bh+sz(40);
 write('5-mile blocks',x0,y1-sz(14),12,C.mi,900,'left');write('8 km blocks',x0,y2-sz(14),12,C.km,900,'left');
 for(let i=0;i<8;i++){const on=i<M.blocks;slab(x0+i*cell+2,y1,cell-4,bh,on?C.miBg:'#ffffff',on?C.mi:'#9ca3af',2,6);if(on)write('5',x0+i*cell+cell/2,y1+bh/2,13,C.mi,900);
  slab(x0+i*cell+2,y2,cell-4,bh,on?C.kmBg:'#ffffff',on?C.km:'#9ca3af',2,6);if(on)write('8',x0+i*cell+cell/2,y2+bh/2,13,C.km,900)}
 M.stackR={x:x0,y:y1,w:x1-x0,h:y2+bh-y1};const tot=y2+bh+sz(34);write(`${M.blocks*5} miles ≈ ${M.blocks*8} km`,A.W/2,tot,18,C.ink,900);write('Target: 40 miles',A.W/2,tot+sz(26),13,C.dim,800)}
/* ---------- step 2: where does one mile end? ---------- */
function setPin(v){if(M.won)return;M.pin=Math.max(0,Math.min(2,Math.round(v*10)/10));M.bad=false;M.msg=`Pin at ${M.pin.toFixed(1)} km. Press Check, or let go, when it matches the end of the mile.`;say()}
function check(){if(M.won)return;const v=M.pin;if(Math.abs(v-1.6)<.05){M.won=true;hitIt('Yes: 1 mile ends at about 1.6 km. That is 8 ÷ 5 = 1.6, the 5 : 8 rule for one mile.');return say()}
 if(v<1)return miss(`${v.toFixed(1)} km is less than one kilometre. A mile is longer than a kilometre, so keep going.`);
 if(Math.abs(v-1)<.05)return miss('1 km stops short. A mile is longer than a kilometre.');miss(v<1.6?`${v.toFixed(1)} km is still short of the end of the mile.`:`${v.toFixed(1)} km goes past the end of the mile.`)}
function drawOne(t0,b0){const x0=sz(30),x1=A.W-sz(30),k=(x1-x0)/2,y=t0+(b0-t0)*.28;slab(x0,y,KM*k,sz(34),C.miBg,C.mi,2,6);write('1 mile',x0+KM*k/2,y+sz(17),14,C.mi,900);
 const ry=y+sz(70);X.strokeStyle=C.km;X.lineWidth=2;X.beginPath();X.moveTo(x0,ry);X.lineTo(x1,ry);X.stroke();for(let t=0;t<=20;t++){const x=x0+t/10*k,big=t%10===0,mid=t%5===0;X.beginPath();X.moveTo(x,ry);X.lineTo(x,ry+(big?sz(18):mid?sz(13):sz(8)));X.stroke();if(big||mid)write(one(t/10),x,ry+sz(30),11,C.km,900)}
 write('km',x1+sz(14),ry,12,C.km,900);const px=x0+M.pin*k;X.strokeStyle=C.pin;X.lineWidth=3;X.beginPath();X.moveTo(px,y-sz(8));X.lineTo(px,ry+sz(4));X.stroke();slab(px-sz(16),ry+sz(42),sz(32),sz(30),C.pin,C.rim,2,8);write('drag',px,ry+sz(57),10,'#ffffff',900);
 M.oneR={x:x0-14,y:y-sz(10),w:x1-x0+28,h:ry+sz(80)-y,x0,k};write(`Pin: ${M.pin.toFixed(1)} km`,A.W/2,ry+sz(98),17,C.ink,900)}
/* ---------- step 3: which way round? ---------- */
function chain(ch){if(M.won)return;const [n,from,ans]=WAYS[M.at],want=from==='km'?'down':'up',to=from==='km'?'miles':'km';
 const got=ch==='up'?n*8/5:n/8*5;if(ch!==want)return miss(from==='km'?`That makes ${n} km into ${one(got)} miles: more miles than km. A mile is longer, so the number of miles must be smaller.`:`That makes ${n} miles into only ${one(got)} km. A km is shorter, so you need more of them.`);
 hitIt(`${n} ${from==='km'?'km':'miles'} ${ch==='up'?'× 8 ÷ 5':'÷ 8 × 5'} = ${ans} ${to}.`);M.at++;if(M.at>=WAYS.length){M.won=true;M.msg='km to miles: ÷ 8 × 5, the number gets smaller. Miles to km: × 8 ÷ 5, the number gets bigger.'}say()}
function drawWays(t0,b0){const done=M.at>=WAYS.length,[n,from]=WAYS[Math.min(M.at,WAYS.length-1)],w=Math.min(A.W-sz(40),sz(380)),R={x:(A.W-w)/2,y:t0+sz(10),w,h:sz(64)};
 slab(R.x,R.y,R.w,R.h,from==='km'?C.kmBg:C.miBg,C.rim,2.5);centre(done?'All 3 done':`${n} ${from==='km'?'km → miles':'miles → km'}`,R,20,C.ink);write(`Problem ${Math.min(M.at+1,3)} of 3`,A.W/2,R.y+R.h+sz(14),12,C.dim,800);
 const cw=(A.W-sz(40))/2,cy=R.y+R.h+sz(40),ch=Math.min(sz(90),b0-cy-sz(6));M.chainR=CHAINS.map(([s,tag],i)=>{const Q={x:sz(14)+i*(cw+sz(12)),y:cy,w:cw,h:ch,tag};slab(Q.x,Q.y,Q.w,Q.h,'#ffffff',C.rim,2.5);centre(s,Q,17,C.ink);return Q})}
/* ---------- step 4: race distances in order ---------- */
const sorted=RACES.map((r,i)=>i).sort((a,b)=>RACES[a][1]-RACES[b][1]);
function pickRace(i){if(M.won||M.order.includes(i))return;const want=sorted[M.order.length];if(i!==want){const [s,km]=RACES[i],[ws,wkm]=RACES[want];return miss(`${s} is about ${one(km)} km, but ${ws} is shorter (about ${one(wkm)} km). Change miles into km to compare.`)}
 M.order.push(i);hitIt(`${RACES[i][0]} ≈ ${one(RACES[i][1])} km.`);if(M.order.length===RACES.length){M.won=true;M.msg='Shortest to longest. 15 miles (24 km) beats 20 km, and a 10 km race is longer than 6 miles.'}say()}
function drawRaces(t0,b0){const x0=sz(20),x1=A.W-sz(20),k=(x1-x0)/25,ty=t0+sz(26);X.strokeStyle=C.rim;X.lineWidth=2;X.beginPath();X.moveTo(x0,ty);X.lineTo(x1,ty);X.stroke();
 for(let q=0;q<=25;q+=5){const x=x0+q*k;X.beginPath();X.moveTo(x,ty-sz(6));X.lineTo(x,ty+sz(6));X.stroke();write(q+' km',x,ty+sz(18),10,C.dim,900)}
 M.order.forEach((i,j)=>{const x=x0+RACES[i][1]*k,yy=ty-sz(12)-(j%2)*sz(14);X.fillStyle=C.pin;X.beginPath();X.arc(x,ty,sz(5),0,7);X.fill();write(RACES[i][0],x,yy,10,C.ink,900)});
 const cols=A.narrow?2:3,g=sz(8),cw=(A.W-28-g*(cols-1))/cols,ch=sz(52),gy=ty+sz(46);M.raceR=[];RACES.forEach(([s],i)=>{const j=M.order.indexOf(i),Q={x:14+(i%cols)*(cw+g),y:gy+Math.floor(i/cols)*(ch+g),w:cw,h:ch,i};M.raceR.push(Q);
  slab(Q.x,Q.y,Q.w,Q.h,j>=0?C.okBg:s.includes('mile')?C.miBg:C.kmBg,j>=0?C.ok:C.rim,2,10);centre(j>=0?`${j+1}. ${s}`:s,Q,16,C.ink)})}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':C.page;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.page;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const K=now(),T={line:['Drag the red marker. Find a whole number of miles that lands on a whole km.','Found the 5 : 8 match.'],stack:['Tap to add 5-mile blocks until you reach 40 miles.','40 miles ≈ 64 km.'],
  onemile:['Drag the pin to where 1 mile ends on the km ruler.','1 mile ≈ 1.6 km.'],ways:['Which chain turns the distance into the new unit? Tap it.','Both ways sorted.'],races:['Tap the distances from shortest to longest.','In order.'],quiz:['Use the 5 : 8 rule.','']};
 const t=top(M.won?T[K][1]:T[K][0],M.won),b=A.H-note()-sz(6);
 if(K==='line')drawLine(t+sz(30),b);if(K==='stack')drawStack(t+sz(10),b);if(K==='onemile')drawOne(t+sz(10),b);if(K==='ways')drawWays(t+sz(8),b);if(K==='races')drawRaces(t+sz(10),b);
 if(K==='quiz'){const R={x:sz(28),y:t+sz(26),w:A.W-sz(56),h:Math.min(sz(150),b-t-sz(50))};slab(R.x,R.y,R.w,R.h,C.kmBg,C.rim,2);centre('5 miles ≈ 8 km. Miles to km: × 8 ÷ 5. Km to miles: ÷ 8 × 5.',R,17,C.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let grip=null;
const lineMi=p=>(p.x-M.lineR.x0)/M.lineR.k/KM,pinKm=p=>(p.x-M.oneR.x0)/M.oneR.k;
function down(p){const K=now();
 if(K==='line'&&inside(p,M.lineR)){grip='line';slide(lineMi(p));return true}
 if(K==='stack'&&inside(p,M.stackR)){addBlock();return true}
 if(K==='onemile'&&inside(p,M.oneR)){grip='pin';setPin(pinKm(p));return true}
 if(K==='ways'){const R=(M.chainR||[]).find(q=>inside(p,q));if(R){chain(R.tag);return true}}
 if(K==='races'){const R=(M.raceR||[]).find(q=>inside(p,q));if(R){pickRace(R.i);return true}}
 return false}
function move(p){if(grip==='line')slide(lineMi(p));if(grip==='pin')setPin(pinKm(p))}
function up(){const g=grip;grip=null;if(g==='pin')check()}
/* ---------- live description and buttons ---------- */
function say(){const K=now();let d='Challenge.';
 if(K==='line')d=`Marker at ${one(M.mi)} miles, which is ${(M.mi*KM).toFixed(2)} km.`;
 if(K==='stack')d=`${M.blocks} blocks: ${M.blocks*5} miles, about ${M.blocks*8} km. Target ${TARGET} miles.`;
 if(K==='onemile')d=`One mile bar. Pin at ${M.pin.toFixed(1)} km on the km ruler.`;
 if(K==='ways')d=M.won?'All 3 problems done.':`Problem ${M.at+1} of 3: ${WAYS[M.at][0]} ${WAYS[M.at][1]==='km'?'km to miles':'miles to km'}. Chains: ${CHAINS.map(x=>x[0]).join(' or ')}.`;
 if(K==='races')d=`Placed so far: ${M.order.map(i=>RACES[i][0]).join(', ')||'none'}. Distances: ${RACES.map(r=>r[0]).join(', ')}.`;
 announce((M.msg?M.msg+' ':'')+d);pad();M.after()}
function pad(){if(!ctl)return;ctl.innerHTML='';const K=now(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=()=>{fn();say()}};
 if(!M.won){if(K==='line'){b('− 0.5 mile',()=>slide(M.mi-.5));b('+ 0.5 mile',()=>slide(M.mi+.5))}
  if(K==='stack')b('Add a 5-mile block',addBlock);
  if(K==='onemile'){b('− 0.1 km',()=>setPin(M.pin-.1));b('+ 0.1 km',()=>setPin(M.pin+.1));b('Check',check)}
  if(K==='ways')CHAINS.forEach(([s,tag])=>b(s,()=>chain(tag)));
  if(K==='races')RACES.forEach((r,i)=>{if(!M.order.includes(i))b(r[0],()=>pickRace(i))})}
 A.redraw()}
const complete=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tick;fns.forEach((f,j)=>setTimeout(()=>{if(id===tick){f();say()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){tick++;Object.assign(M,{after:()=>{},won:false,msg:'',bad:false,mi:0,blocks:0,pin:.5,at:0,order:[]})}
const steps=[
{h:'Miles and kilometres',p:'Miles and kilometres both measure long distances. The UK and the USA use miles on road signs. Most other countries use kilometres (km).',
predict:{q:'Which is longer?',opts:['A kilometre','A mile'],ans:1},
task:'Find a whole mile that lands on a whole km',show:()=>{steps[0].go();replay([1,2,3,4,5].map(m=>()=>slide(m)),450)},go:()=>{clear();say();M.after=complete(0,()=>M.won,'5 miles ≈ 8 km.')}},
{h:'Scaling the 5 : 8 rule',p:'5 miles is about 8 km. So 10 miles is about 16 km, and 20 miles is about 32 km. Double one side, double the other.',
predict:{q:'About how many km is 40 miles?',opts:['About 25 km','About 64 km'],ans:1},
task:'Stack blocks to reach 40 miles',show:()=>{steps[1].go();replay(Array(8).fill(addBlock),330)},go:()=>{clear();say();M.after=complete(1,()=>M.won,'40 miles ≈ 64 km.')}},
{h:'Why 1.6?',p:'If 5 miles is about 8 km, how much of the 8 km belongs to each one of the 5 miles? Find out on the ruler.',
predict:{q:'One mile is about…',opts:['0.6 km','1.6 km'],ans:1},
task:'Put the pin where 1 mile ends',show:()=>{steps[2].go();replay([()=>setPin(1),()=>setPin(1.3),()=>setPin(1.6),check],450)},go:()=>{clear();say();M.after=complete(2,()=>M.won,'1 mile ≈ 1.6 km.')}},
{h:'Which way round?',p:'The 5 : 8 rule works both ways. For each distance, choose the chain that turns it into the other unit.',
predict:{q:'You change 24 km into miles. Will the number get bigger or smaller?',opts:['Bigger','Smaller'],ans:1},
task:'Choose the right chain 3 times',show:()=>{steps[3].go();replay(WAYS.map(w=>()=>chain(w[1]==='km'?'down':'up')),500)},go:()=>{clear();say();M.after=complete(3,()=>M.won,'Right chain every time.')}},
{h:'Race day',p:'Runners use both units. A 5 km park run is about 3 miles. To compare a mix of units, change them all into the same unit first.',
predict:{q:'Which is longer: a 10 km race or a 6-mile run?',opts:['The 6-mile run','The 10 km race'],ans:1},
task:'Tap all 6 from shortest to longest',show:()=>{steps[4].go();replay(sorted.map(i=>()=>pickRace(i)),400)},go:()=>{clear();say();M.after=complete(4,()=>M.won,'All in order.')}},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.after()});
function quiz(){turn++;const [q,good,bad]=BANK[turn%BANK.length],all=[[good,'ok'],...bad],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,good)});announce('Challenge: '+q);A.redraw()}
function grade(tag,good){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Go back to the 5 : 8 rule.';
 if(tag==='flip')m=`That is the rule the wrong way round. ${WHY.flip}`;
 if(tag==='sixmi')m=`6 miles is about 6 × 1.6 = 9.6 km, so the 10 km race is longer.`;
 if(tag==='addfive')m=`Adding 5 is not converting. Scale both sides of 5 miles ≈ 8 km by the same number.`;
 if(yes){inRow++;A.win()}else{inRow=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+inRow+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:B=>{quizBox.hidden=B.step!==5;ctl.hidden=B.step===5;pad()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Miles and kilometres lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
