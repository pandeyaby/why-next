/* Flagship: cumulative binomial probabilities (ages 16–18; A level Mathematics Statistics: binomial probabilities including
   cumulative probabilities). Turn "at least", "fewer than", "more than" and "inclusive" into the exact set of whole-number
   values, find upper tails as 1 − P(X ≤ k) from a live cumulative chart, build ranges as P(X ≤ b) − P(X ≤ a − 1), drag p to see
   the tail move, and pick the right cumulative expression for real situations. Tap, drag or use the buttons. */
(()=>{
const {N,pmf,cdf,f4,WORDS,TAILS,RANGES,CONTEXT,BANK,WHY}=BCUMART;
const H={ink:'#111827',sub:'#374151',sheet:'#fffdf8',edge:'#1f2937',lead:'#f0fdfa',okc:'#166534',okBg:'#dcfce7',err:'#9f1239',
 bar:'#93c5fd',barE:'#1d4ed8',keep:'#fcd34d',keepE:'#92400e',cut:'#fecaca',cutE:'#9f1239',axis:'#4b5563',white:'#ffffff'};
VIS.reg('flagbcum',c=>{let A,X,ctl,probe,pick=-1,streak=0,tok=0;const B={after:()=>{}};
const s=n=>Math.round(n*(A.narrow?1:1.08));
function narrate(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function lab(t,x,y,n,col,w,al){X.font=`${w||700} ${s(n)}px system-ui,sans-serif`;X.fillStyle=col||H.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function split(t,maxW,n){X.font=`700 ${s(n)}px system-ui,sans-serif`;const L=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&X.measureText(nx).width>maxW){L.push(cur);cur=w}else cur=nx}L.push(cur);return L}
function plate(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function inPlate(t,R,n,col){const L=split(t,R.w-s(12),n),lh=s(n)+4;L.forEach((r,i)=>lab(r,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,n,col))}
const within=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function head(t,won){const L=split(t,A.W-44,14),lh=s(14)+4,h=Math.max(s(36),L.length*lh+14);plate(12,10,A.W-24,h,won?H.okBg:H.lead,won?H.okc:H.edge,2,12);L.forEach((r,i)=>lab(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?H.okc:H.ink));return 10+h}
function foot(){if(!B.msg)return 0;const L=split((B.bad?'✗ ':'✓ ')+B.msg,A.W-48,13),lh=s(13)+5,h=L.length*lh+12,y=A.H-h-10;plate(12,y,A.W-24,h,H.white,B.bad?H.err:H.okc,3,12);L.forEach((r,i)=>lab(r,A.W/2,y+6+lh*(i+.5),13,B.bad?H.err:H.ink));return h+14}
const fail=t=>{B.bad=true;B.msg=t;A.sound.miss();sync()};
const pass=t=>{B.bad=false;B.msg=t;A.sound.pop()};
const which=()=>['words','tail','range','pdrag','ctx','quiz'][A.step];
const P=()=>B.p||.3;
/* ---------- a shared bar chart: pmf or cdf for k = 0…N ---------- */
function chart(t0,b0,kind,tone){const x0=s(34),x1=A.W-s(14),w=(x1-x0)/(N+1),top=t0+s(6),base=b0-s(22),vals=[];for(let k=0;k<=N;k++)vals.push(kind==='cdf'?cdf(k,P()):pmf(k,P()));
 const mx=kind==='cdf'?1:Math.max(.3,...vals);X.strokeStyle=H.axis;X.lineWidth=1.5;X.beginPath();X.moveTo(x0,top);X.lineTo(x0,base);X.lineTo(x1,base);X.stroke();
 [0,.5,1].forEach(v=>{const y=base-v*(base-top);lab(kind==='cdf'?v.toFixed(1):(v*mx).toFixed(2),x0-s(4),y,10,H.sub,700,'right')});
 const cols=[];for(let k=0;k<=N;k++){const h=vals[k]/mx*(base-top),R={x:x0+k*w+2,y:base-h,w:w-4,h,k},t=tone(k);cols.push({x:R.x,y:top,w:R.w,h:base-top+s(22),k});
  X.fillStyle=t==='keep'?H.keep:t==='cut'?H.cut:H.bar;X.fillRect(R.x,R.y,R.w,R.h);X.strokeStyle=t==='keep'?H.keepE:t==='cut'?H.cutE:H.barE;X.lineWidth=t?2:1;X.strokeRect(R.x,R.y,R.w,R.h);lab(k,R.x+R.w/2,base+s(11),11,H.ink,800)}
 return cols}
/* ---------- step 0: words to a set of values ---------- */
function toggle(k,on){if(B.won)return;if(on==null)on=!B.sel.has(k);on?B.sel.add(k):B.sel.delete(k);B.bad=false;B.msg=`Kept: ${[...B.sel].sort((a,b)=>a-b).join(', ')||'none'}.`;A.sound.tick()}
function checkSet(){if(B.won)return;const W=WORDS[B.r],want=new Set();for(let k=W[1];k<=W[2];k++)want.add(k);const got=[...B.sel].sort((a,b)=>a-b);
 if(got.length===want.size&&got.every(k=>want.has(k))){pass(`"${W[0]}" is X from ${W[1]} to ${W[2]}${W[2]===N?' (N = 12)':''}.`);B.r++;B.sel=new Set();if(B.r>=WORDS.length){B.won=true;B.msg='The words decide whether the end value is kept. On a whole-number variable, < 6 is the same as ≤ 5.'}sync();return}
 const lo=Math.min(...got),hi=Math.max(...got),run=got.length===hi-lo+1;if(run&&Math.abs(lo-W[1])+Math.abs(hi-W[2])===1)return fail(W[3]);fail(`Keep every whole number that "${W[0]}" allows, and only those.`)}
function drawWords(t0,b0){const W=WORDS[Math.min(B.r,WORDS.length-1)],R={x:s(14),y:t0,w:A.W-s(28),h:s(52)};plate(R.x,R.y,R.w,R.h,H.white,H.edge,2);inPlate(`X ~ B(12, 0.3). Keep the values for: ${W[0]}`,R,15,H.ink);
 const y=R.y+R.h+s(46),x0=s(26),gap=(A.W-2*x0)/N,r=Math.min(s(15),gap*.44);B.dotR=[];X.strokeStyle=H.axis;X.lineWidth=2;X.beginPath();X.moveTo(x0,y);X.lineTo(A.W-x0,y);X.stroke();
 for(let k=0;k<=N;k++){const x=x0+k*gap,on=B.sel.has(k);B.dotR.push({x:x-gap/2,y:y-s(26),w:gap,h:s(52),k});X.beginPath();X.arc(x,y,r,0,7);X.fillStyle=on?H.keep:H.white;X.fill();X.strokeStyle=on?H.keepE:H.axis;X.lineWidth=on?3:1.5;X.stroke();lab(k,x,y+s(28),12,H.ink,800)}
 lab(`Phrase ${Math.min(B.r+1,WORDS.length)} of ${WORDS.length}. Tap or drag across dots, then press Check.`,A.W/2,y+s(54),12,H.sub,700)}
/* ---------- step 1: upper tails from the cumulative chart ---------- */
function useTail(k){if(B.won)return;const T=TAILS[B.r];if(k===T[1]){pass(`${T[0]} = 1 − P(X ≤ ${k}) = 1 − ${f4(cdf(k,P()))} = ${f4(1-cdf(k,P()))}.`);B.r++;if(B.r>=TAILS.length){B.won=true;B.msg='Upper tail = 1 − P(X ≤ the last value you do not want).'}sync();return}
 if(k===T[1]+1)return fail(T[2]);fail(`1 − P(X ≤ ${k}) is P(X ≥ ${k+1}), not ${T[0]}.`)}
function drawTail(t0,b0){const T=TAILS[Math.min(B.r,TAILS.length-1)],R={x:s(14),y:t0,w:A.W-s(28),h:s(44)};plate(R.x,R.y,R.w,R.h,H.white,H.edge,2);inPlate(`Find ${T[0]}: tap the bar P(X ≤ k) to subtract from 1`,R,14,H.ink);
 lab('Cumulative P(X ≤ k), X ~ B(12, 0.3)',A.W/2,R.y+R.h+s(14),12,H.sub,800);B.colR=chart(R.y+R.h+s(26),b0,'cdf',k=>B.won?'':B.hover===k?'cut':'')}
/* ---------- step 2: a range from two cumulative values ---------- */
function useRange(k){if(B.won)return;const G=RANGES[B.r];if(B.phase==='top'){if(k!==G[1])return fail(`The top of ${G[0]} is the largest value kept: P(X ≤ ${G[1]}).`);B.phase='bottom';pass(`Top: P(X ≤ ${k}) = ${f4(cdf(k,P()))}. Now tap what to take away.`);sync();return}
 if(k!==G[2])return fail(k===G[2]+1?G[3]:`Take away the values below the range: everything up to ${G[2]}.`);
 pass(`${G[0]} = P(X ≤ ${G[1]}) − P(X ≤ ${G[2]}) = ${f4(cdf(G[1],P()))} − ${f4(cdf(G[2],P()))} = ${f4(cdf(G[1],P())-cdf(G[2],P()))}.`);B.r++;B.phase='top';if(B.r>=RANGES.length){B.won=true;B.msg='P(a ≤ X ≤ b) = P(X ≤ b) − P(X ≤ a − 1). Read the inequalities first.'}sync()}
function drawRange(t0,b0){const G=RANGES[Math.min(B.r,RANGES.length-1)],R={x:s(14),y:t0,w:A.W-s(28),h:s(44)};plate(R.x,R.y,R.w,R.h,H.white,H.edge,2);inPlate(`${G[0]}: tap the ${B.phase==='top'?'top bar P(X ≤ b)':'bar to take away'}`,R,14,H.ink);
 lab('Cumulative P(X ≤ k), X ~ B(12, 0.3)',A.W/2,R.y+R.h+s(14),12,H.sub,800);B.colR=chart(R.y+R.h+s(26),b0,'cdf',k=>B.phase==='bottom'&&k===G[1]&&!B.won?'keep':'')}
/* ---------- step 3: drag p and watch the lower tail ---------- */
function setP(v){if(B.won)return;B.p=Math.max(.05,Math.min(.95,Math.round(v*20)/20));const t=cdf(2,B.p);B.bad=false;B.msg=`p = ${B.p.toFixed(2)}: P(X ≤ 2) = ${f4(t)}.`;
 if(t<.1){B.won=true;B.msg=`p = ${B.p.toFixed(2)}: P(X ≤ 2) = ${f4(t)}, under 0.1. A bigger p moves the bars right and shrinks the lower tail.`;A.sound.pop()}sync()}
function drawPdrag(t0,b0){const tr={x:s(30),y:t0+s(18),w:A.W-s(60),h:s(10)};B.trackR={x:tr.x-s(10),y:tr.y-s(22),w:tr.w+s(20),h:s(54)};plate(tr.x,tr.y,tr.w,tr.h,'#e5e7eb',H.axis,1,5);
 const hx=tr.x+(P()-.05)/.9*tr.w;plate(hx-s(16),tr.y-s(14),s(32),s(38),H.keep,H.keepE,2.5,10);lab('p',hx,tr.y+s(5),13,H.ink,900);lab(`p = ${P().toFixed(2)}`,A.W/2,tr.y+s(42),14,H.ink,900);
 B.colR=chart(tr.y+s(58),b0-s(26),'pmf',k=>k<=2?'keep':'');lab(`Shaded: P(X ≤ 2) = ${f4(cdf(2,P()))}   target: under 0.1`,A.W/2,b0-s(10),13,H.ink,800)}
/* ---------- step 4: the right expression for a situation ---------- */
function pickCtx(i){if(B.won)return;const Q=CONTEXT[B.r],T=Q[1][(i+B.r)%3];if(!T[1])return fail(T[2]);pass(`${T[0]}: ${T[2]}`);B.r++;if(B.r>=CONTEXT.length){B.won=true;B.msg='Translate the words, then pick the tail: lower = P(X ≤ k), upper = 1 − P(X ≤ k), range = a difference.'}sync()}
const tilesOf=r=>[0,1,2].map(i=>CONTEXT[r][1][(i+r)%3][0]);
function drawCtx(t0,b0){const r=Math.min(B.r,CONTEXT.length-1),R={x:s(14),y:t0,w:A.W-s(28),h:s(70)};plate(R.x,R.y,R.w,R.h,H.white,H.edge,2);inPlate(CONTEXT[r][0],R,15,H.ink);
 const tl=tilesOf(r),th=s(52),gy=R.y+R.h+s(22);B.tileR=tl.map((t,i)=>{const T={x:s(14),y:gy+i*(th+s(10)),w:A.W-s(28),h:th,i};plate(T.x,T.y,T.w,T.h,'#eff6ff',H.barE,2.5,12);inPlate(t,T,17,H.ink);return T});
 lab(`Situation ${r+1} of ${CONTEXT.length}`,A.W/2,Math.min(b0-s(8),gy+3*(th+s(10))+s(8)),12,H.sub,800)}
function draw(){X.fillStyle=A.col.dark?'#1f2937':H.sheet;X.fillRect(0,0,A.W,A.H);X.fillStyle=H.sheet;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const M=which(),T={words:['Which whole numbers do the words keep?','Words turned into values.'],tail:['Upper tails: 1 − P(X ≤ k). Which k?','Upper tails found.'],range:['A range is a difference of two cumulative values.','Ranges found.'],
  pdrag:['Drag p until P(X ≤ 2) is under 0.1.','The tail moved.'],ctx:['Which expression answers the question?','Situations translated.'],quiz:['Cumulative probabilities: mind the ends.','']};
 const t=head(B.won?T[M][1]:T[M][0],B.won),b=A.H-foot()-s(6);
 if(M==='words')drawWords(t+s(10),b);if(M==='tail')drawTail(t+s(10),b);if(M==='range')drawRange(t+s(10),b);if(M==='pdrag')drawPdrag(t+s(8),b);if(M==='ctx')drawCtx(t+s(10),b);
 if(M==='quiz'){const R={x:s(30),y:t+s(30),w:A.W-s(60),h:Math.min(s(140),b-t-s(60))};plate(R.x,R.y,R.w,R.h,H.lead,H.edge,2);inPlate('P(X ≥ k) = 1 − P(X ≤ k − 1).   P(a ≤ X ≤ b) = P(X ≤ b) − P(X ≤ a − 1).',R,15,H.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let act=null;
const colAt=p=>(B.colR||[]).find(q=>within(p,q));
function down(p){const M=which();
 if(M==='words'&&!B.won){const R=(B.dotR||[]).find(q=>within(p,q));if(R){act={t:'paint',on:!B.sel.has(R.k),last:R.k};toggle(R.k,act.on);sync();return true}}
 if((M==='tail'||M==='range')&&!B.won){const R=colAt(p);if(R){B.hover=R.k;(M==='tail'?useTail:useRange)(R.k);return true}}
 if(M==='pdrag'&&within(p,B.trackR)){act={t:'p'};setPx(p);return true}
 if(M==='ctx'){const R=(B.tileR||[]).find(q=>within(p,q));if(R){pickCtx(R.i);return true}}
 return false}
function setPx(p){const tr=B.trackR;setP(.05+(p.x-tr.x-s(10))/(tr.w-s(20))*.9)}
function move(p){if(!act)return;if(act.t==='paint'){const R=(B.dotR||[]).find(q=>within(p,q));if(R&&R.k!==act.last){act.last=R.k;toggle(R.k,act.on);sync()}}if(act.t==='p')setPx(p)}
function up(){act=null}
/* ---------- live description and buttons ---------- */
function sync(){const M=which();let d='Challenge.';
 if(M==='words')d=B.won?'All phrases done.':`Phrase: ${WORDS[B.r][0]}. Kept so far: ${[...B.sel].sort((a,b)=>a-b).join(', ')||'none'}.`;
 if(M==='tail')d=B.won?'All tails done.':`Find ${TAILS[B.r][0]}. Cumulative values: ${[0,1,2,3,4,5,6].map(k=>`P(X ≤ ${k}) = ${f4(cdf(k,P()))}`).join('; ')}.`;
 if(M==='range')d=B.won?'All ranges done.':`Find ${RANGES[B.r][0]}. Choose the ${B.phase==='top'?'top':'bottom'} cumulative value.`;
 if(M==='pdrag')d=`p = ${P().toFixed(2)}, P(X ≤ 2) = ${f4(cdf(2,P()))}.`;
 if(M==='ctx')d=B.won?'All situations done.':`${CONTEXT[B.r][0]} Options: ${tilesOf(B.r).join('; ')}.`;
 narrate((B.msg?B.msg+' ':'')+d);knobs();B.after()}
function knobs(){if(!ctl)return;ctl.innerHTML='';const M=which(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=()=>{fn();sync()}};
 if(!B.won){if(M==='words'){b('Check',checkSet);b('Clear',()=>{B.sel=new Set();B.msg=''});b('Keep next value',()=>{const W=WORDS[B.r];for(let k=0;k<=N;k++)if(!B.sel.has(k)){toggle(k,true);break}})}
  if(M==='tail'||M==='range')for(let k=0;k<=8;k++)b(`P(X ≤ ${k})`,()=>(M==='tail'?useTail:useRange)(k));
  if(M==='pdrag'){b('p − 0.05',()=>setP(P()-.05));b('p + 0.05',()=>setP(P()+.05))}
  if(M==='ctx')tilesOf(B.r).forEach((t,i)=>b(t,()=>pickCtx(i)))}
 A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function blank(){tok++;Object.assign(B,{after:()=>{},won:false,msg:'',bad:false,r:0,sel:new Set(),phase:'top',p:.3,hover:null})}
const fillSet=W=>()=>{B.sel=new Set();for(let k=W[1];k<=W[2];k++)B.sel.add(k)};
const steps=[
{h:'Words into values',p:'X counts successes, so it only takes whole numbers 0 to n. "At least", "more than", "fewer than" and "inclusive" decide whether the end value is kept.',
predict:{q:'X ~ B(12, 0.3). Which values make "fewer than 6"?',opts:['0 to 6','0 to 5'],ans:1},
task:'Turn all 5 phrases into values',show:()=>{steps[0].go();seq(WORDS.flatMap(W=>[fillSet(W),checkSet]),300)},go:()=>{blank();sync();B.after=ok(0,()=>B.won,'Every end value placed.')}},
{h:'Upper tails',p:'Tables and calculators give P(X ≤ k). For an upper tail, take the complement: everything minus the values you do not want.',
predict:{q:'P(X ≥ 4) = 1 − ?',opts:['P(X ≤ 4)','P(X ≤ 3)'],ans:1},
task:'Find all 3 upper tails',show:()=>{steps[1].go();seq(TAILS.map(T=>()=>useTail(T[1])),600)},go:()=>{blank();sync();B.after=ok(1,()=>B.won,'Tails done.')}},
{h:'A range between two values',p:'P(a ≤ X ≤ b) is the cumulative value at the top minus the cumulative value just below the range.',
task:'Find all 3 ranges',show:()=>{steps[2].go();seq(RANGES.flatMap(G=>[()=>useRange(G[1]),()=>useRange(G[2])]),500)},go:()=>{blank();sync();B.after=ok(2,()=>B.won,'Ranges done.')}},
{h:'When p changes',p:'n = 12. The shaded bars are P(X ≤ 2). Change p and watch the whole distribution slide.',
predict:{q:'If p rises from 0.3 to 0.5, P(X ≤ 3)…',opts:['goes up','goes down'],ans:1},
task:'Make P(X ≤ 2) less than 0.1',show:()=>{steps[3].go();seq([.35,.4].map(v=>()=>setP(v)),700)},go:()=>{blank();sync();B.after=ok(3,()=>B.won,'p = 0.40 or more does it.')}},
{h:'In context',p:'Real questions arrive in words. Decide the values first, then pick the cumulative expression.',
task:'Choose the expression for all 4 situations',show:()=>{steps[4].go();seq(CONTEXT.map((Q,r)=>()=>pickCtx([0,1,2].find(i=>Q[1][(i+r)%3][1]))),500)},go:()=>{blank();sync();B.after=ok(4,()=>B.won,'All four translated.')}},
{h:'Challenge',p:'',go:()=>{blank();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>B.after()});
function ask(){pick++;const [q,good,bad]=BANK[pick%BANK.length],all=[[good,'ok'],...bad],r=pick%3,ord=all.slice(r).concat(all.slice(0,r));
 probe.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=probe.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,good)});narrate('Challenge: '+q);A.redraw()}
function score(tag,good){probe.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=probe.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'List the values the words allow, then pick the tail.';
 if(tag==='tail7')m='"At least 7" keeps 7. Subtract only P(X ≤ 6): 1 − P(X ≤ 6).';
 if(tag==='drop5')m='Subtract P(X ≤ 4), the values below the range. P(X ≤ 5) would remove 5, which is kept.';
 if(tag==='same')m='0.4925 is the lower tail P(X ≤ 3). P(X ≥ 4) is its complement: 1 − 0.4925 = 0.5075.';
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:Q=>{probe.hidden=Q.step!==5;ctl.hidden=Q.step===5;knobs()},
 init:Q=>{A=Q;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Cumulative binomial lab buttons'},w);probe=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
