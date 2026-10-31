/* Flagship – binomial probabilities (ages 16–18): count the orders of exactly 2 hits in 4 shots, see that every order has
   the same chance p^r(1−p)^(n−r), build P(X = r) = nCr p^r (1−p)^(n−r) from tiles (with nPr and p×r traps), read the
   whole B(10, 0.25) distribution, and shade "at least" and "more than" events before choosing the cumulative sum.
   Every canvas tap or drag has a button twin, and the canvas label always says what just happened. */
(()=>{
VIS.reg('flagbinp',c=>{let A,keys,qa,qk=-1,tok=0;
const blank=()=>({want:()=>{},won:0,a:[0,0,0,0],found:[],seen:[],last:-1,slot:[null,null,null],grab:null,sel:-1,ask:0,sh:[],bad:-1,lock:0}),S=blank();
const phase=()=>['count','order','build','dist','cum','quiz'][A.step],rm=()=>A.reduced(),sz=n=>Math.round(n*(A.narrow?1:1.12));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const P=.7,N=10,Q=.25,C=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)},pmf=r=>C(N,r)*Q**r*(1-Q)**(N-r);
const f4=x=>x.toFixed(4),pat=a=>a.map(b=>b?'✓':'✗').join(''),words=a=>a.map(b=>b?'in':'miss').join(', ');
const IN=()=>A.col.dark?'#14532d':'#dcfce7',OUT=()=>A.col.dark?'#7f1d1d':'#fee2e2';
function say(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
function wrap(g,t,x,y,n,maxw,col){g.font=`700 ${sz(n)}px system-ui,sans-serif`;const ls=[''];t.split(' ').forEach(w=>{const k=ls.length-1,nx=ls[k]?ls[k]+' '+w:w;if(g.measureText(nx).width>maxw&&ls[k])ls.push(w);else ls[k]=nx});
 ls.forEach((l,i)=>say(g,l,x,y+(i-(ls.length-1)/2)*sz(n)*1.25,n,col))}
function box(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 count the orders: toggle four shots, every new order with exactly 2 in is collected ---- */
function shotBox(i){const w=Math.min((A.W-50)/4,110);return{x:(A.W-(w*4+30))/2+i*(w+10),y:A.H*.06,w,h:A.H*.2}}
function foundBox(j){const cols=A.narrow?2:3,w=(A.W-20-(cols-1)*8)/cols,h=A.H*(A.narrow?.11:.15);return{x:10+(j%cols)*(w+8),y:A.H*.42+Math.floor(j/cols)*(h+8),w,h}}
function toggle(i){if(phase()!=='count'||S.won>=6)return;S.a[i]=1-S.a[i];A.sound.tick();check(`Shot ${i+1} is now ${S.a[i]?'in':'a miss'}.`)}
function setArr(s){S.a=s.split('').map(Number);check('')}
function check(pre){const k=S.a.reduce((s,b)=>s+b,0),p=pat(S.a);
 if(k!==2){speak(`${pre} ${words(S.a)}: ${k} in. You need exactly 2 in.`);buttons();return A.redraw()}
 if(S.found.includes(p)){speak(`${pre} ${words(S.a)} is already on the list. Try another order.`);return A.redraw()}
 S.found.push(p);S.won++;A.sound.pop();speak(`${pre} New order: ${words(S.a)}. ${S.won} of 6 found.${S.won>=6?' That is all of them: 4C2 = 6.':''}`);buttons();A.redraw();S.want()}
function drawCount(g){const C=A.col,k=S.a.reduce((s,b)=>s+b,0);
 S.a.forEach((b,i)=>{const r=shotBox(i);box(g,r,b?IN():OUT());say(g,b?'✓':'✗',r.x+r.w/2,r.y+r.h*.42,26,C.tx,900);say(g,`Shot ${i+1}`,r.x+r.w/2,r.y+r.h*.8,12,C.tx)});
 say(g,`${k} in · orders found: ${S.found.length} of 6`,A.W/2,A.H*.34,14,C.tx,800);
 for(let j=0;j<6;j++){const r=foundBox(j),p=S.found[j];box(g,r,p?IN():null);say(g,p||'?',r.x+r.w/2,r.y+r.h/2,p?18:14,p?C.tx:C.mu,800)}}
/* ---- 2 every order has the same chance ---- */
const prod=p=>[...p].map(s=>s==='✓'?P:1-P);
function tapOrder(j){if(phase()!=='order'||S.won>=6)return;const p=S.found[j];S.last=j;
 if(!S.seen.includes(j)){S.seen.push(j);S.won++;A.sound.pop()}
 const f=prod(p),v=f.reduce((a,b)=>a*b,1);speak(`${words([...p].map(s=>s==='✓'?1:0))}: ${f.map(x=>x.toFixed(1)).join(' × ')} = ${f4(v)}.${S.won>=6?` All 6 orders give ${f4(v)}, so P(exactly 2) = 6 × ${f4(v)} = ${f4(6*v)}.`:` ${6-S.won} more to check.`}`);buttons();A.redraw();S.want()}
function drawOrder(g){const C=A.col;wrap(g,'She scores 70% of shots: P(in) = 0.7, P(miss) = 0.3',A.W/2,A.H*.05,13,A.W-30);
 for(let j=0;j<6;j++){const r=foundBox(j),y=r.y-A.H*.26,rr={...r,y},on=S.seen.includes(j);box(g,rr,on?IN():null,false,j===S.last?C.tx:null);say(g,S.found[j],rr.x+rr.w/2,rr.y+rr.h*(on?.32:.5),17,C.tx,800);
  if(on)say(g,f4(prod(S.found[j]).reduce((a,b)=>a*b,1)),rr.x+rr.w/2,rr.y+rr.h*.72,13,C.tx)}
 const y=A.H*(A.narrow?.84:.88);if(S.last>=0){const f=prod(S.found[S.last]);wrap(g,`${f.map(x=>x.toFixed(1)).join(' × ')} = 0.7² × 0.3² = ${f4(.0441)}`,A.W/2,y,14,A.W-30)}
 if(S.won>=6)wrap(g,`P(exactly 2 in) = 6 × 0.0441 = ${f4(.2646)}`,A.W/2,y+sz(14)*1.6,14,A.W-30,C.tx)}
/* ---- 3 build the formula from tiles ---- */
const TILES=[['¹⁰C₅',0],['0.25⁵',1],['0.75⁵',2],['¹⁰P₅',-1],['0.25 × 5',-2],['0.75¹⁰',-3]];
const WHY={'-1':'¹⁰P₅ counts ordered lists, so each set of 5 right questions is counted 120 times. Only which questions are right matters: ¹⁰C₅ = 252.','-2':'Probabilities of independent events multiply: 5 right in a row is 0.25 to the power 5, not 0.25 times 5.','-3':'Only the 5 wrong answers have chance 0.75. Use 0.75 to the power n − r = 5, not 10.'};
function tileBox(i){const cols=A.narrow?3:6,w=(A.W-20-(cols-1)*8)/cols,h=A.H*(A.narrow?.1:.15);return{x:10+(i%cols)*(w+8),y:A.H*(A.narrow?.66:.7)+Math.floor(i/cols)*(h+8),w,h}}
function slotBox(k){const w=Math.min((A.W-80)/3,150),x0=(A.W-(w*3+60))/2;return{x:x0+k*(w+30),y:A.H*.3,w,h:A.H*.16}}
function place(i){if(phase()!=='build'||S.won>=3)return;const[t,k]=TILES[i];
 if(k<0){let m=WHY[k];return miss(m,i)}if(S.slot[k]!=null)return speak(`${t} is already in place.`);
 S.slot[k]=i;S.won++;A.sound.pop();
 speak(S.won>=3?'P(X = 5) = ¹⁰C₅ × 0.25⁵ × 0.75⁵ = 252 × 0.000977 × 0.2373 = 0.0584. About 6 in 100.':`${t} = ${[252,'0.000977','0.2373'][k]}. ${['It counts the orders.','It is the chance of the 5 right answers.','It is the chance of the 5 wrong answers.'][k]}`);buttons();A.redraw();S.want()}
function drawBuild(g){const C=A.col;wrap(g,'Guess all 10 questions. Each has 4 options, so p = 0.25. Find P(exactly 5 right).',A.W/2,A.H*.1,14,A.W-30);
 [0,1,2].forEach(k=>{const r=slotBox(k),i=S.slot[k];box(g,r,i!=null?IN():null,false,C.tx);say(g,i!=null?TILES[i][0]:['count orders','5 right','5 wrong'][k],r.x+r.w/2,r.y+r.h*.42,i!=null?18:12,i!=null?C.tx:C.mu,800);
  if(i!=null)say(g,['252','0.000977','0.2373'][k],r.x+r.w/2,r.y+r.h*.78,12,C.tx);if(k<2)say(g,'×',r.x+r.w+15,r.y+r.h/2,20,C.tx)});
 say(g,S.won>=3?'= 0.0584':'P(X = 5) =',A.W/2,A.H*.56,16,C.tx,900);
 TILES.forEach((t,i)=>{if(S.slot.includes(i))return;const r=S.grab&&S.grab.i===i&&S.grab.x!=null?{...tileBox(i),x:S.grab.x-tileBox(i).w/2,y:S.grab.y-tileBox(i).h/2}:tileBox(i);
  box(g,r,C.dark?'#334155':'#fef9c3',S.bad===i);say(g,t[0],r.x+r.w/2,r.y+r.h/2,16,C.dark?'#f8fafc':'#111827',800)})}
/* ---- 4 and 5 bar chart of B(10, 0.25) ---- */
function barBox(r){const L=24,w=(A.W-L-14)/11,top=A.H*.24,bot=A.H*.84,h=(bot-top)*pmf(r)/.3;return{x:L+r*w+2,y:bot-h,w:w-4,h,col:{x:L+r*w,y:top,w,h:bot-top+A.H*.08}}}
const ASK=[['Tap the most likely number right.',2],['Tap the bar for exactly 5 right.',5],['Tap the bar for 0 right.',0]];
function tapBar(r){if(phase()==='cum')return shade(r);if(phase()!=='dist'||S.won>=3)return;const[q,want]=ASK[S.ask];S.sel=r;
 if(r!==want){A.redraw();return miss(want===2?`P(X = ${r}) = ${f4(pmf(r))}. Look for the tallest bar. It is below 2.5, the mean, because p is small.`:`That bar is r = ${r}. Count along from r = 0 on the left.`,-1)}
 S.won++;S.ask++;A.sound.pop();speak(`P(X = ${r}) = ¹⁰C${r} × 0.25^${r} × 0.75^${N-r} = ${f4(pmf(r))}.${S.won<3?' '+ASK[S.ask][0]:' Every bar comes from the same formula, and all 11 add to 1.'}`);buttons();A.redraw();S.want()}
const EV=[{q:'At least 3 right',lo:3,hi:10,how:'1 − P(X ≤ 2)'},{q:'At most 1 right',lo:0,hi:1,how:'P(X ≤ 1)'},{q:'More than 4 right',lo:5,hi:10,how:'1 − P(X ≤ 4)'}];
function shade(r){if(S.won>=3||S.lock)return;const i=S.sh.indexOf(r);if(i<0)S.sh.push(r);else S.sh.splice(i,1);A.sound.tick();speak(`Shaded: ${S.sh.length?S.sh.slice().sort((a,b)=>a-b).join(', '):'none'}.`);buttons();A.redraw()}
function checkSet(){if(phase()!=='cum'||S.won>=3||S.lock)return;const e=EV[S.ask],ok=[];for(let r=e.lo;r<=e.hi;r++)ok.push(r);const s=S.sh.slice().sort((a,b)=>a-b);
 if(s.join()!==ok.join()){let m=`"${e.q}" means r = ${e.lo} to ${e.hi}. Shade exactly those bars.`;
  if(e.lo===3&&!s.includes(3))m='"At least 3" includes 3 itself. Shade 3 up to 10.';if(e.lo===5&&s.includes(4))m='"More than 4" does not include 4. Start at 5.';return miss(m,-1)}
 let v=0;ok.forEach(r=>v+=pmf(r));S.won++;A.sound.pop();speak(`${e.q} = ${e.how} = ${f4(v)}.${e.lo>0?' The complement is quicker: fewer bars to add.':''}`);
 if(S.won<3){S.lock=1;setTimeout(()=>{if(phase()==='cum'&&S.lock){S.lock=0;S.ask++;S.sh=[];speak(`Now shade: ${EV[S.ask].q}.`);buttons();A.redraw()}},rm()?20:700)}buttons();A.redraw();S.want()}
function drawBars(g){const C=A.col,v=phase(),top=A.H*.24,bot=A.H*.84;g.strokeStyle=C.ln;g.lineWidth=1;g.beginPath();g.moveTo(20,bot);g.lineTo(A.W-10,bot);g.stroke();
 for(let r=0;r<=N;r++){const b=barBox(r),on=v==='cum'?S.sh.includes(r):r===S.sel;g.fillStyle=on?C.vi:A.alpha(C.ac,.75);g.fillRect(b.x,b.y,b.w,Math.max(b.h,1.5));
  if(on&&v==='cum'){g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,Math.max(b.h,1.5))}say(g,String(r),b.x+b.w/2,bot+A.H*.04,12,C.tx)}
 say(g,'r right',A.W-12,bot+A.H*.1,11,C.mu,700,'right');
 if(v==='dist'){say(g,S.won<3?ASK[S.ask][0]:'X ~ B(10, 0.25)',A.W/2,A.H*.07,15,C.tx,800);if(S.sel>=0)say(g,`P(X = ${S.sel}) = ${f4(pmf(S.sel))}`,A.W/2,A.H*.15,13,C.tx,800)}
 else{const e=EV[S.ask];say(g,S.won<3?`Shade: ${e.q}`:'Use the shorter side, then subtract from 1.',A.W/2,A.H*.07,15,C.tx,800);let t=0;S.sh.forEach(r=>t+=pmf(r));say(g,`Shaded total: ${f4(t)}`,A.W/2,A.H*.15,13,C.tx)}}
function miss(t,b){A.sound.miss();S.bad=b;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){wrap(g,'P(X = r) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ',W/2,H*.4,20,W-30);wrap(g,'Fixed n, two outcomes, same p, independent trials.',W/2,H*.62,13,W-30);return}
 if(v==='count')drawCount(g);else if(v==='order')drawOrder(g);else if(v==='build')drawBuild(g);else drawBars(g);A.fx.draw(g)}
function buttons(){if(!keys)return;keys.innerHTML='';const v=phase(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='count'&&S.won<6)S.a.forEach((b,i)=>B(`Shot ${i+1}: ${b?'in':'miss'}`,()=>toggle(i),`Switch shot ${i+1}, now ${b?'in':'miss'}`));
 if(v==='order'&&S.won<6)S.found.forEach((p,j)=>{if(!S.seen.includes(j))B(p,()=>tapOrder(j),`Find the chance of ${words([...p].map(s=>s==='✓'?1:0))}`)});
 if(v==='build'&&S.won<3)TILES.forEach((t,i)=>{if(!S.slot.includes(i))B(t[0],()=>place(i),`Place tile ${t[0]}`)});
 if(v==='dist'&&S.won<3)for(let r=0;r<=N;r++)B(`r = ${r}`,()=>tapBar(r),`Bar for ${r} right`);
 if(v==='cum'&&S.won<3){for(let r=0;r<=N;r++)B(`${S.sh.includes(r)?'☑':'☐'} ${r}`,()=>shade(r),`Shade ${r} right`);B('Check',checkSet,'Check the shaded bars')}}
function down(p){const v=phase();
 if(v==='count'){const i=[0,1,2,3].find(i=>hit(p,shotBox(i)));if(i!=null)toggle(i);return false}
 if(v==='order'){const j=[0,1,2,3,4,5].find(j=>{const r=foundBox(j);return hit(p,{...r,y:r.y-A.H*.26})});if(j!=null&&j<S.found.length)tapOrder(j);return false}
 if(v==='build'){const i=TILES.findIndex((t,i)=>!S.slot.includes(i)&&hit(p,tileBox(i)));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='dist'||v==='cum'){const r=[...Array(11).keys()].find(r=>hit(p,barBox(r).col));if(r!=null)tapBar(r)}return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.x!=null&&p.y>A.H*.6){speak('Drop the tile on the formula.');return A.redraw()}place(gr.i);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,blank())};
const ALL=['1100','1010','1001','0110','0101','0011'];
const steps=[
{h:'Count the orders',p:'A player takes 4 shots. Tap a shot to switch it between in and miss. Find every order with exactly 2 in.',predict:{q:'How many orders give exactly 2 in from 4 shots?',opts:['4 orders','6 orders','8 orders'],ans:1},task:'Find every order',
 show:()=>{steps[0].go();demo(ALL.map(s=>()=>setArr(s)),420)},go:()=>{clear();speak('Tap the shots to make exactly 2 in.');buttons();S.want=ready(0,()=>S.won>=6,'The orders are counted by 4C2 = 6.')}},
{h:'Same chance each way',p:'Each shot goes in with chance 0.7, on its own. Tap each order to multiply its chances.',predict:{q:'Which is more likely: in, in, miss, miss or in, miss, in, miss?',opts:['In, in, miss, miss','They are equal','In, miss, in, miss'],ans:1},task:'Check all 6 orders',
 show:()=>{steps[1].go();demo([0,1,2,3,4,5].map(j=>()=>tapOrder(j)),420)},go:()=>{clear();S.found=ALL.map(s=>pat(s.split('').map(Number)));speak('Tap an order to find its chance.');buttons();S.want=ready(1,()=>S.won>=6,'Every order has the same chance, pʳ(1 − p)ⁿ⁻ʳ.')}},
{h:'Build the formula',p:'Now 10 guessed questions. Drag or tap the three tiles that make P(exactly 5 right).',predict:{q:'Which counts the orders of 5 right out of 10?',opts:['¹⁰P₅ = 30240','¹⁰C₅ = 252'],ans:1},task:'Fill the 3 slots',
 show:()=>{steps[2].go();demo([0,1,2].map(i=>()=>place(i)),600)},go:()=>{clear();speak('Pick a tile for each slot.');buttons();S.want=ready(2,()=>S.won>=3,'P(X = r) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ.')}},
{h:'The whole distribution',p:'Each bar is P(X = r) for r = 0 to 10. Tap the bars to read them.',predict:{q:'Guessing 10 questions with 4 options each, which score is most likely?',opts:['5 right, half of them','2 right','0 right'],ans:1},task:'Answer 3 bar questions',
 show:()=>{steps[3].go();demo([2,5,0].map(r=>()=>tapBar(r)),600)},go:()=>{clear();speak(ASK[0][0]);buttons();S.want=ready(3,()=>S.won>=3,'The most likely value is near np = 2.5.')}},
{h:'At least, at most',p:'Shade the bars for each event, then check. Watch whether the end value is included.',predict:{q:'"At least 3 right" equals 1 minus which?',opts:['1 − P(X ≤ 3)','1 − P(X ≤ 2)'],ans:1},task:'Shade 3 events',
 show:()=>{steps[4].go();const sets=[[3,4,5,6,7,8,9,10],[0,1],[5,6,7,8,9,10]],fns=[];sets.forEach(s=>{s.forEach(r=>fns.push(()=>shade(r)));fns.push(checkSet,...Array(8).fill(()=>{}))});demo(fns,110)},
 go:()=>{clear();speak('Shade the bars for at least 3 right.');buttons();S.want=ready(4,()=>S.won>=3,'At least k is 1 − P(X ≤ k − 1).')}},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
const QS=[['A fair coin is flipped 6 times. What is P(exactly 2 heads)?',[['⁶C₂ × 0.5⁶ ≈ 0.234','ok'],['0.5² = 0.25','noC'],['2/6 ≈ 0.333','ratio']]],
 ['Which of these is NOT a binomial setting?',[['Drawing 3 cards without replacement, counting hearts','ok'],['Rolling a die 5 times, counting sixes','dice'],['10 free throws at 70%, counting hits','shots']]],
 ['X ~ B(8, 0.3). What is P(X ≥ 1)?',[['1 − 0.7⁸','ok'],['1 − 0.3⁸','q'],['8 × 0.3','times']]],
 ['X ~ B(20, 0.1). What is P(X ≥ 4)?',[['1 − P(X ≤ 3)','ok'],['1 − P(X ≤ 4)','edge'],['P(X ≤ 3)','flip']]],
 ['X ~ B(5, 0.6). Which is P(X = 2)?',[['⁵C₂ × 0.6² × 0.4³','ok'],['⁵C₂ × 0.6³ × 0.4²','swap'],['0.6² × 0.4³','noC']]]];
function why(t){return{noC:'That is one order only. There are many orders of 2 heads in 6, so multiply by ⁶C₂ = 15.',ratio:'2/6 is a proportion, not a probability. Use ⁶C₂ × 0.5² × 0.5⁴.',
 dice:'Die rolls are binomial: 5 fixed trials, independent, P(six) = 1/6 each time.',shots:'Free throws at a steady 70% are binomial: fixed n, same p, independent.',
 q:'P(X = 0) is the chance all 8 fail: 0.7⁸. So P(X ≥ 1) = 1 − 0.7⁸.',times:'8 × 0.3 = 2.4 is the mean, np, not a probability.',
 edge:'1 − P(X ≤ 4) is P(X ≥ 5). It leaves out X = 4.',flip:'P(X ≤ 3) is the other side. P(X ≥ 4) is 1 minus it.',swap:'The power on p is the number of successes, r = 2. The failures get n − r = 3.'}[t]||'Check n, p and r.'}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
