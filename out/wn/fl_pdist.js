/* Flagship – probability distributions (16–18): tap the 36 outcomes of two dice to build the distribution of the
   total X; slide k in P(X = x) = kx until the probabilities sum to 1; drag a cut to shade P(X ≤ c), P(X < c), P(X ≥ c);
   roll 10, 100, 1000 times and watch relative frequencies settle near the model; build the distribution of the larger score. */
(()=>{
const TOT=[2,3,4,5,6,7,8,9,10,11,12],MAXV=[1,2,3,4,5,6];
const ways=t=>6-Math.abs(t-7),waysMax=m=>2*m-1;
const SHADE=[{op:'≤',c:4},{op:'<',c:4},{op:'≥',c:10}];
const inSet=(op,c,v)=>op==='≤'?v<=c:op==='<'?v<c:op==='≥'?v>=c:v>c;
VIS.reg('flagpdist',c=>{let A,pad,quiz,qi=-1,seq=0;
const zero=()=>({cb:()=>{},built:{},bmax:{},hl:null,k:.05,kok:0,cut:4,op:'≤',sh:0,shTry:0,counts:Array(11).fill(0),n:0,bad:-1,drag:null,z:[]}),S=zero();
const part=()=>['total','k','cum','data','max','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?.95:1.05)),now=()=>A.reduced();
const live=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function lay(){const{W,H}=A;if(A.narrow)return{g:{x:W*.2,y:H*.05,s:Math.min(W*.6,H*.4)},ch:{x:34,y:H*.52,w:W-46,h:H*.36}};const s=Math.min(W*.36,H*.78);return{g:{x:16,y:H*.1,s},ch:{x:s+60,y:H*.1,w:W-s-76,h:H*.72}}}
function t(g,s,x,y,px,col,al,w){g.font=`${w||600} ${f(px)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
function grid(g,pick){const{g:G}=lay(),C=A.col,u=G.s/6;S.z=S.z.filter(z=>!z.cell);
 for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){const x=G.x+(b-1)*u,y=G.y+(a-1)*u,on=pick(a,b);g.fillStyle=on===2?A.alpha(C.or,.75):on?A.alpha(C.cy,.45):A.alpha(C.ln,.25);A.paint.rrect(x+1.5,y+1.5,u-3,u-3,5);g.fill();
  t(g,part()==='max'?String(Math.max(a,b)):String(a+b),x+u/2,y+u/2,Math.min(13,u*.38),C.tx,'center',700);S.z.push({cell:1,a,b,x,y,w:u,h:u})}
 t(g,'die 2 →',G.x+G.s/2,G.y-f(9),10,C.mu);g.save();g.translate(G.x-f(9),G.y+G.s/2);g.rotate(-Math.PI/2);t(g,'die 1 →',0,0,10,C.mu);g.restore()}
function chart(g,vals,p,opt={}){const{ch}=lay(),C=A.col,n=vals.length,bw=ch.w/n,top=opt.top||.25,base=ch.y+ch.h;S.z=S.z.filter(z=>!z.bar);
 g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(ch.x,ch.y);g.lineTo(ch.x,base);g.lineTo(ch.x+ch.w,base);g.stroke();
 [0,top/2,top].forEach(v=>{const y=base-v/top*ch.h;t(g,v.toFixed(v<.1&&v>0?3:2).replace(/0+$/,'').replace(/\.$/,''),ch.x-4,y,9,C.mu,'right');g.strokeStyle=A.alpha(C.ln,.5);g.beginPath();g.moveTo(ch.x,y);g.lineTo(ch.x+ch.w,y);g.stroke()});
 vals.forEach((v,i)=>{const x=ch.x+i*bw,pv=p[i];if(opt.ghost){const gh=opt.ghost[i]/top*ch.h;g.strokeStyle=C.vi;g.lineWidth=2;g.setLineDash([4,3]);g.strokeRect(x+bw*.18,base-gh,bw*.64,gh);g.setLineDash([])}
  if(pv!=null){const h=Math.min(1,pv/top)*ch.h;g.fillStyle=opt.shade&&opt.shade(v)?C.or:opt.col||C.cy;A.paint.rrect(x+bw*.18,base-h,bw*.64,h,3);g.fill();if(opt.lab)t(g,opt.lab(i),x+bw/2,base-h-f(8),9,C.tx,'center',700)}
  t(g,String(v),x+bw/2,base+f(10),11,C.tx,'center',700);S.z.push({bar:1,i,v,x,y:ch.y,w:bw,h:ch.h+f(20)})});
 t(g,opt.xl||'x',ch.x+ch.w/2,base+f(26),11,C.mu);t(g,'P(X = x)',ch.x+4,ch.y-f(10),10,C.mu,'left')}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();S.z=[];g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){chart(g,TOT,TOT.map(x=>ways(x)/36),{top:.2,lab:i=>ways(TOT[i])+'/36',xl:'total of two dice'});return}
 if(v==='total'){grid(g,(a,b)=>S.hl===a+b?2:S.built[a+b]?1:0);chart(g,TOT,TOT.map(x=>S.built[x]?ways(x)/36:null),{top:.2,lab:i=>ways(TOT[i])+'/36',xl:'x = total'});
  const sum=TOT.reduce((s,x)=>s+(S.built[x]?ways(x):0),0);t(g,`Σ P(X = x) so far = ${sum}/36`,W/2,H*.96,12,C.tx,'center',700)}
 if(v==='k'){const xs=[1,2,3,4];chart(g,xs,xs.map(x=>S.k*x),{top:.5,lab:i=>(S.k*xs[i]).toFixed(2),col:S.kok?C.gr:C.cy});const L=lay().g,sum=10*S.k;
  t(g,'P(X = x) = kx',A.narrow?W/2:L.x+L.s/2,A.narrow?H*.12:H*.2,16,C.tx,'center',800);t(g,`k = ${S.k.toFixed(2)}`,A.narrow?W/2:L.x+L.s/2,A.narrow?H*.22:H*.32,16,C.tx,'center',800);
  t(g,`Σ = k + 2k + 3k + 4k = 10k = ${sum.toFixed(2)}`,A.narrow?W/2:L.x+L.s/2,A.narrow?H*.32:H*.44,12,Math.abs(sum-1)<1e-9?C.gr:sum>1?C.rd:C.tx,'center',700);
  const y=H*.95,x0=W*.12,x1=W*.88,hx=x0+S.k/.3*(x1-x0);g.strokeStyle=C.ln;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();A.paint.ball(hx,y,f(11),C.vi);S.z.push({slider:1,x:x0-14,y:y-24,w:x1-x0+28,h:48})}
 if(v==='cum'){const want=SHADE[Math.min(S.sh,SHADE.length-1)],shaded=TOT.filter(x=>inSet(S.op,S.cut,x)),num=shaded.reduce((s,x)=>s+ways(x),0);
  chart(g,TOT,TOT.map(x=>ways(x)/36),{top:.2,shade:x=>inSet(S.op,S.cut,x),lab:i=>ways(TOT[i])+'',xl:'x = total'});const{ch}=lay(),bw=ch.w/11,cx=ch.x+(S.cut-2+.5)*bw;
  g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(cx,ch.y-6);g.lineTo(cx,ch.y+ch.h);g.stroke();A.paint.ball(cx,ch.y-6,f(10),C.vi);S.z.push({cut:1,x:ch.x,y:ch.y-24,w:ch.w,h:ch.h+24});
  const L=lay().g,mx=A.narrow?W/2:L.x+L.s/2;t(g,S.sh>=SHADE.length?'All three shaded':`Shade P(X ${want.op} ${want.c})`,mx,A.narrow?H*.12:H*.25,16,C.tx,'center',800);
  t(g,`You shaded P(X ${S.op} ${S.cut}) = ${num}/36`,mx,A.narrow?H*.24:H*.38,13,C.tx,'center',700);t(g,'Drag the cut. Change the sign with the buttons.',mx,A.narrow?H*.34:H*.5,11,C.mu)}
 if(v==='data'){const fr=S.counts.map(n=>S.n?n/S.n:0);chart(g,TOT,fr,{top:.2,ghost:TOT.map(x=>ways(x)/36),xl:'x = total (dashes = model)'});const L=lay().g,mx=A.narrow?W/2:L.x+L.s/2;
  t(g,`${S.n} rolls of two dice`,mx,A.narrow?H*.14:H*.25,16,C.tx,'center',800);const gap=S.n?Math.max(...S.counts.map((n,i)=>Math.abs(n/S.n-ways(TOT[i])/36))):0;
  t(g,S.n?`largest gap from the model: ${gap.toFixed(3)}`:'Roll to collect data',mx,A.narrow?H*.26:H*.38,13,C.tx,'center',700);t(g,S.n?`relative frequency of 7: ${(S.counts[5]/S.n).toFixed(3)} (model 0.167)`:'',mx,A.narrow?H*.36:H*.5,11,C.mu)}
 if(v==='max'){grid(g,(a,b)=>S.hl===Math.max(a,b)?2:S.bmax[Math.max(a,b)]?1:0);chart(g,MAXV,MAXV.map(m=>S.bmax[m]?waysMax(m)/36:null),{top:.35,lab:i=>waysMax(MAXV[i])+'/36',xl:'y = larger score'});
  const sum=MAXV.reduce((s,m)=>s+(S.bmax[m]?waysMax(m):0),0);t(g,`Σ so far = ${sum}/36`,W/2,H*.96,12,C.tx,'center',700)}
 A.fx.draw(g)}
const flag=(m,i)=>{A.sound.miss();S.bad=i==null?-1:i;live(m);setTimeout(()=>{S.bad=-1;A.redraw()},now()?10:800);A.redraw()};
function buildTotal(x){if(part()!=='total')return;S.hl=x;if(S.built[x]){live(`P(X = ${x}) = ${ways(x)}/36 is already built.`);return A.redraw()}S.built[x]=1;A.sound.tick();
 const n=Object.keys(S.built).length;live(`Total ${x}: ${ways(x)} of the 36 equally likely outcomes, so P(X = ${x}) = ${ways(x)}/36. ${n} of 11 values built.`);controls();A.redraw();S.cb()}
function setK(k){if(part()!=='k')return;S.k=Math.max(0,Math.min(.3,Math.round(k*100)/100));S.kok=0;A.sound.tick();live(`k = ${S.k.toFixed(2)}, sum 10k = ${(10*S.k).toFixed(2)}.`);A.redraw()}
function checkK(){if(part()!=='k')return;const s=Math.round(1000*S.k)/100;
 if(Math.abs(s-1)<1e-9){S.kok=1;A.sound.pop();live('10k = 1, so k = 0.1. P(X = 1..4) = 0.1, 0.2, 0.3, 0.4: a valid distribution.');A.redraw();return S.cb()}
 if(Math.abs(S.k-.25)<1e-9)return flag('k = 1/4 would be right if every value had the same probability. Here P(X = x) = kx, so the sum is k + 2k + 3k + 4k = 10k = 2.5, not 1.');
 flag(s>1?`The probabilities add to ${s.toFixed(2)}, more than 1. Make k smaller.`:`The probabilities add to only ${s.toFixed(2)}. Some probability is missing: make k bigger.`)}
function setCut(cv){if(part()!=='cum')return;S.cut=Math.max(2,Math.min(12,cv));A.redraw()}
function setOp(op){if(part()!=='cum')return;S.op=op;A.sound.tick();live(`Shading P(X ${op} ${S.cut}).`);A.redraw()}
function checkShade(){if(part()!=='cum'||S.sh>=SHADE.length)return;const w=SHADE[S.sh],mine=TOT.filter(x=>inSet(S.op,S.cut,x)).join(),need=TOT.filter(x=>inSet(w.op,w.c,x)).join();
 if(mine===need){const num=TOT.filter(x=>inSet(w.op,w.c,x)).reduce((s,x)=>s+ways(x),0);S.sh++;A.sound.tick();live(`P(X ${w.op} ${w.c}) = ${num}/36.`+(S.sh<SHADE.length?` Next: P(X ${SHADE[S.sh].op} ${SHADE[S.sh].c}).`:''));controls();A.redraw();return S.cb()}
 const hasC=inSet(S.op,S.cut,w.c);flag(w.op==='<'&&hasC?`“<” is strict: X < ${w.c} leaves out ${w.c} itself. Shade only the totals below ${w.c}.`:w.op==='≤'&&!hasC?`“≤” includes ${w.c}. Shade ${w.c} as well as the totals below it.`:`Shade the totals that make X ${w.op} ${w.c} true, and only those.`)}
function roll(k){if(part()!=='data')return;for(let i=0;i<k;i++){const s=1+(Math.random()*6|0)+1+(Math.random()*6|0);S.counts[s-2]++}S.n+=k;A.sound.tick();
 live(`${S.n} rolls. Relative frequency of a total of 7 is ${(S.counts[5]/S.n).toFixed(3)}; the model says 6/36 = 0.167.`);A.redraw();S.cb()}
function buildMax(m){if(part()!=='max')return;S.hl=m;if(S.bmax[m]){live(`P(Y = ${m}) = ${waysMax(m)}/36 is already built.`);return A.redraw()}S.bmax[m]=1;A.sound.tick();
 live(`Larger score ${m}: ${waysMax(m)} outcomes, so P(Y = ${m}) = ${waysMax(m)}/36.`);controls();A.redraw();S.cb()}
function controls(){if(!pad)return;pad.innerHTML='';const v=part(),B=(s,fn,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,s);e.onclick=fn};
 if(v==='total'){const nx=TOT.find(x=>!S.built[x]);if(nx)B(`Build P(X = ${nx})`,()=>buildTotal(nx))}
 if(v==='k'){B('k − 0.01',()=>setK(S.k-.01),'Decrease k by 0.01');B('k + 0.01',()=>setK(S.k+.01),'Increase k by 0.01');B('Check Σ = 1',checkK,'Check whether the probabilities sum to 1')}
 if(v==='cum'){['≤','<','≥','>'].forEach(o=>B(`X ${o}`,()=>setOp(o),`Use the sign ${o}`));B('Cut ←',()=>{setCut(S.cut-1);live(`Cut at ${S.cut}.`)},'Move the cut one total left');B('Cut →',()=>{setCut(S.cut+1);live(`Cut at ${S.cut}.`)},'Move the cut one total right');B('Check',checkShade,'Check the shaded probability')}
 if(v==='data'){B('Roll 10',()=>roll(10));B('Roll 100',()=>roll(100));B('Roll 1000',()=>roll(1000));B('Reset',()=>{S.counts=Array(11).fill(0);S.n=0;live('Data cleared.');A.redraw()},'Clear the rolls')}
 if(v==='max'){const nx=MAXV.find(m=>!S.bmax[m]);if(nx)B(`Build P(Y = ${nx})`,()=>buildMax(nx))}A.redraw()}
const inZ=(p,z)=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h;
const kFrom=p=>{const x0=A.W*.12,x1=A.W*.88;setK((p.x-x0)/(x1-x0)*.3)};
const cutFrom=p=>{const{ch}=lay();setCut(2+Math.floor((p.x-ch.x)/(ch.w/11)))};
function down(p){const v=part(),z=S.z.find(q=>inZ(p,q));if(!z)return false;
 if(v==='total'){if(z.cell)buildTotal(z.a+z.b);else if(z.bar)buildTotal(z.v);return false}
 if(v==='max'){if(z.cell)buildMax(Math.max(z.a,z.b));else if(z.bar)buildMax(z.v);return false}
 if(v==='k'&&z.slider){S.drag='k';kFrom(p);return true}if(v==='cum'&&(z.cut||z.bar)){S.drag='cut';cutFrom(p);return true}return false}
function move(p){if(S.drag==='k')kFrom(p);if(S.drag==='cut')cutFrom(p)}
function up(){if(S.drag==='cut')live(`Cut at ${S.cut}: shading P(X ${S.op} ${S.cut}).`);S.drag=null}
const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fs){const id=++seq;fs.forEach((fn,j)=>setTimeout(()=>{if(id===seq)fn()},now()?j*30+20:(j+1)*260))}
const wipe=()=>{seq++;Object.assign(S,zero())};
const steps=[
{h:'A random variable',p:'X is the total of two fair dice. Tap a total in the grid, or a bar, to see which of the 36 equally likely outcomes give it.',
 predict:{q:'Which total of two dice is most likely?',opts:['All 11 totals are equally likely','7','12'],ans:1},task:'Build P(X = x) for all 11 totals',
 show:()=>{steps[0].go();auto(TOT.map(x=>()=>buildTotal(x)))},go:()=>{wipe();live('Two dice give 36 equally likely outcomes. Tap a total.');controls();S.cb=when(0,()=>TOT.every(x=>S.built[x]),'Seven has 6 of the 36 outcomes; the table sums to 36/36 = 1.')}},
{h:'They must sum to 1',p:'P(X = x) = kx for x = 1, 2, 3, 4. Drag the slider or use the buttons to set k, then check.',
 predict:{q:'What is k?',opts:['1/4, one share per value','0.1','1'],ans:1},task:'Find the k that makes a valid distribution',
 show:()=>{steps[1].go();auto([()=>setK(.25),checkK,()=>setK(.1),checkK])},go:()=>{wipe();live('Set k so the four probabilities sum to 1.');controls();S.cb=when(1,()=>S.kok,'Every probability is between 0 and 1 and they sum to 1.')}},
{h:'At most, less than',p:'Drag the purple cut and pick the sign. The orange bars are the outcomes you are adding.',task:'Shade P(X ≤ 4), P(X < 4) and P(X ≥ 10)',
 show:()=>{steps[2].go();auto([()=>setOp('≤'),()=>setCut(4),checkShade,()=>setOp('<'),checkShade,()=>setOp('≥'),()=>setCut(10),checkShade])},go:()=>{wipe();live('Shade P(X ≤ 4).');controls();S.cb=when(2,()=>S.sh>=3,'≤ includes the cut value; < leaves it out.')}},
{h:'From data',p:'Roll two dice many times. The bars are relative frequencies; the dashed boxes are the model.',
 predict:{q:'After 1000 rolls, the relative frequencies will be…',opts:['Exactly 1/36, 2/36, … 6/36, …','Close to the model, but not exact'],ans:1},task:'Roll at least 1000 times and compare with the model',
 show:()=>{steps[3].go();auto([()=>roll(10),()=>roll(100),()=>roll(1000)])},go:()=>{wipe();live('No rolls yet.');controls();S.cb=when(3,()=>S.n>=1000,'Observed relative frequencies estimate the probabilities and settle near the model as n grows.')}},
{h:'A new variable',p:'Now Y is the larger of the two scores. Each cell shows its Y. Tap to build the distribution of Y.',
 predict:{q:'What is P(Y = 6)?',opts:['1/36','6/36','11/36'],ans:2},task:'Build P(Y = y) for y = 1 to 6',
 show:()=>{steps[4].go();auto(MAXV.map(m=>()=>buildMax(m)))},go:()=>{wipe();live('Y is the larger score. Tap a value.');controls();S.cb=when(4,()=>MAXV.every(m=>S.bmax[m]),'P(Y = y) = (2y − 1)/36: same outcomes, a different random variable, a different distribution.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['P(X = x) = kx for x = 1, 2, 3. Find k.',[['1/6','ok'],['1/3','share'],['6','flip']]],
 ['X is the total of two fair dice. Find P(X = 7).',[['6/36','ok'],['1/11','equal'],['7/36','value']]],
 ['Which list could be the probabilities of a distribution?',[['0.2, 0.5, 0.3','ok'],['0.4, 0.4, 0.4','over'],['0.6, 0.5, −0.1','neg']]],
 ['X is the total of two fair dice. Find P(X < 4).',[['3/36','ok'],['6/36','incl'],['2/36','single']]],
 ['A fair die is rolled 600 times and shows 94 sixes. Which is best?',[['94/600 ≈ 0.157 estimates P(6); it is close to 1/6','ok'],['The die is biased, since 94 is not 100','exact'],['P(6) is exactly 94/600','est']]]];
function why(t){let m='Use the two rules: each P(X = x) is between 0 and 1, and they sum to 1.';
 if(t==='share')m='1/3 gives each value the same probability. Here P(X = x) = kx, so k + 2k + 3k = 6k = 1 and k = 1/6.';
 if(t==='flip')m='6k = 1 gives k = 1/6, not 6. A probability can never be more than 1.';
 if(t==='equal')m='The 11 totals are not equally likely. Count outcomes: 7 comes from 6 of the 36 equally likely pairs, so 6/36.';
 if(t==='value')m='The probability is not the total over 36. Count the pairs that give 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), so 6/36.';
 if(t==='over')m='0.4 + 0.4 + 0.4 = 1.2. Probabilities in a distribution must sum to exactly 1.';
 if(t==='neg')m='A probability cannot be negative, even if the list sums to 1.';
 if(t==='incl')m='6/36 is P(X ≤ 4). “<” is strict, so leave out 4: P(2) + P(3) = 1/36 + 2/36 = 3/36.';
 if(t==='single')m='2/36 is only P(X = 3). X < 4 also includes X = 2: 1/36 + 2/36 = 3/36.';
 if(t==='exact')m='Random data vary. 94 sixes in 600 is close to the expected 100, so it gives no strong evidence of bias.';
 if(t==='est')m='94/600 is a relative frequency: an estimate from data, not the exact probability.';
 return m}
function ask(){qi++;const[q,os]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');os.slice(r).concat(os.slice(0,r)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,o);e.onclick=()=>score(tag)});live('Challenge: '+q);A.redraw()}
let chain=0;
function score(tag){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(tag)}${ok?` Run of ${chain}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}});
A.start()})})();
