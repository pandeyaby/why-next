/* Flagship: judging binomial assumptions in context (16-18, A-level statistics). Seeds in trays, a tiring shooter, variance
   versus np(1-p), critique in context, refine. flagbfit lists the conditions; this lab shows what breaks when one fails. */
(()=>{
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r},bin=(n,p,k)=>C(n,k)*p**k*(1-p)**(n-k);
const TRAYP=[.45,.7,.95];
const VAR=[{ctx:'Cracked eggs in boxes of 12. Fault rate p = 0.05.',n:12,p:.05,m:.6,v:.58,ok:0,why:'0.58 is close to 0.57, so B(12, 0.05) fits.'},
{ctx:'Pupils off with flu in classes of 30. p = 0.2.',n:30,p:.2,m:6,v:21,ok:1,why:'Flu spreads within a class, so cases cluster: 21 is far above 4.8. Not independent.'},
{ctx:'Red counters when 10 are drawn without replacement from a bag of 20 (10 red).',n:10,p:.5,m:5,v:1.32,ok:2,why:'Without replacement from a small bag, each red drawn makes red less likely, so counts bunch near 5.'}];
const VLAB=['Fits','Too spread','Too tight'];
const CRIT=[{s:'X = number of the 10 seeds in one tray that germinate.',o:['Seeds in one tray share soil, water and warmth, so germination of one makes others more likely: not independent.','The trials are not independent.','The number of trials is not fixed.'],why:['','True, but not in context: say why the seeds affect each other.','n = 10 seeds is fixed; that condition holds.']},
{s:'X = number of 20 free throws a player scores in a row.',o:['As the player tires the chance of scoring falls, so p is not the same for every shot.','A throw can hit the rim, so there are more than two outcomes.','20 is too small for a binomial model.'],why:['','Rim or not, each throw is scored or missed: two outcomes.','Any fixed n works for a binomial; size is not a condition.']},
{s:'X = number of 15 people in a cinema queue who liked the film.',o:['People queue with the friends they saw it with, who may share a view: not independent.','There are only two answers, so it must be binomial.','p is unknown, so no model is possible.'],why:['','Two outcomes is only one condition; independence still needs checking.','An unknown p can be estimated; that is not a broken assumption.']},
{s:'X = number of heads in 10 flips of a fair coin.',o:['It fits: n = 10 is fixed, two outcomes, flips are independent and p = 0.5 each time.','The same coin is used, so the flips are not independent.','A coin could land on its edge, so it is not binomial.'],why:['','A coin has no memory, so reusing it does not link the flips.','Edge landings are so rare they are ignored.']}];
const FIX=[{s:'Seeds in trays germinate together.',o:['Model each tray with its own p, or take seeds from many trays at random','Use B(100, 0.7) for all 10 trays at once','Keep B(10, 0.7) but round the answers'],why:['','Pooling keeps the clustering; a bigger n hides it.','Rounding does not change the broken assumption.']},
{s:'A shooter tires over 20 throws.',o:['Use fresh and tired blocks of shots, each with its own p','Raise p to 0.9 to make up for it','Use more throws so it averages out'],why:['','A higher p fits early shots worse; p still is not constant.','More throws means more tiredness, so p drifts further.']},
{s:'Flu cases cluster within a class.',o:['Sample one pupil from each of many schools so cases are unlinked','Count each class twice','Use a smaller p'],why:['','Counting twice adds nothing and keeps the clustering.','A smaller p changes the mean; cases are still linked.']}];
VIS.reg('flagbcrit',c=>{let A,pad,quiz,qn=-1,gen=0;const Z={};
const INK='#0f172a',OKC='#047857',BAD='#b91c1c',LINE='#64748b',BLUE='#1d4ed8',ORG='#c2410c',SF='system-ui,sans-serif';
const ft=(n,w)=>`${w||700} ${n}px ${SF}`,z=n=>A.narrow?n:Math.round(n*1.15),ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const LS=k=>k==='crit'?[CRIT,Z.C]:[FIX,Z.F],key=()=>['seed','tire','var','crit','fix','chal'][A.step];
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e2e8f0',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=z(o.n||13);g.font=ft(n,800);let w=g.measureText(t).width+20;while(w>A.W-10&&n>9){n--;g.font=ft(n,800);w=g.measureText(t).width+20}
const h=n+14,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,7);g.fill();g.lineWidth=o.ok||o.bad?2.5:1.2;g.strokeStyle=o.ok?OKC:o.bad?BAD:LINE;g.stroke();g.fillStyle=INK;ctr(g);g.fillText(t,l+w/2,y+1)}
function para(t,r,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ok||o.bad||o.sel?3:1.5;g.strokeStyle=o.ok?OKC:o.bad?BAD:o.sel?BLUE:LINE;g.stroke();
let n=o.n||z(13);const wrap=()=>{g.font=ft(n,o.w||600);const out=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>r.w-16&&cur){out.push(cur);cur=w}else cur=tr});out.push(cur);return out};
let L=wrap();while(L.length*(n+4)>r.h-8&&n>9){n--;L=wrap()}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const y0=r.y+r.h/2-(L.length-1)*(n+4)/2;L.forEach((l,i)=>g.fillText(l,r.x+r.w/2,y0+i*(n+4)))}
function hist(r,counts,n,p,col){const g=A.ctx,tot=counts.reduce((a,b)=>a+b,0)||1,mx=Math.max(.42,...counts.map(c=>c/tot)),bw=r.w/(n+1);
g.strokeStyle=LINE;g.lineWidth=1;g.beginPath();g.moveTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
for(let k=0;k<=n;k++){const f=counts[k]/tot,h=f/mx*r.h;g.fillStyle=col;g.fillRect(r.x+k*bw+2,r.y+r.h-h,bw-4,h);
const e=bin(n,p,k)/mx*r.h;g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.strokeRect(r.x+k*bw+2,r.y+r.h-e,bw-4,0.01);
g.fillStyle=A.col.tx;g.font=ft(z(10));ctr(g);g.fillText(String(k),r.x+k*bw+bw/2,r.y+r.h+9)}}
function stats(a){const m=a.reduce((s,x)=>s+x,0)/a.length,v=a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1);return{m,v}}
function plant(mode){const R=rng(mode?77:41),xs=[];for(let t=0;t<120;t++){const p=mode?TRAYP[t%3]:.7;let x=0;for(let i=0;i<10;i++)if(R()<p)x++;xs.push(x)}return xs}
function sBtns(){const w=Math.min(200,(A.W-30)/2),h=z(40),y=A.H-h-8;return[{x:A.W/2-w-5,y,w,h},{x:A.W/2+5,y,w,h}]}
function drawSeed(){const s=Z.S,g=A.ctx;wash();chip('Bars: 120 trays. Outlines: B(10, 0.7)',A.W/2,A.H*.06,{n:12});
const r={x:20,y:A.H*.16,w:A.W-40,h:A.H*.5};if(s.xs){const cnt=Array(11).fill(0);s.xs.forEach(x=>cnt[x]++);hist(r,cnt,10,.7,s.mode?'#fdba74':'#93c5fd');const st=stats(s.xs);
chip(`${s.mode?'Trays differ':'Same conditions'}: mean ${st.m.toFixed(2)}, variance ${st.v.toFixed(2)}`,A.W/2,A.H*.74,{n:13,ok:!s.mode,bad:s.mode});chip('B(10, 0.7): mean 7, variance 2.10',A.W/2,A.H*.81,{n:12})}
else chip('Plant the trays below',A.W/2,A.H*.4,{n:13});
sBtns().forEach((b,j)=>para(j?'Trays differ (p 0.45, 0.7 or 0.95)':'Same conditions (p 0.7)',b,{sel:s.mode===j,ok:s.ran.includes(j),n:z(12),w:800}))}
function runS(mode){const s=Z.S;s.mode=mode;s.xs=plant(mode);if(!s.ran.includes(mode))s.ran.push(mode);A.sound.pop();const st=stats(s.xs);
say(mode?`Trays differ: mean ${st.m.toFixed(2)}, variance ${st.v.toFixed(2)}, far above np(1 − p) = 2.1. The spread exposes the broken independence.`:`Same conditions: mean ${st.m.toFixed(2)}, variance ${st.v.toFixed(2)}, close to 7 and 2.1. Bars sit on the outlines.`)}
const ps=d=>Array.from({length:20},(_,k)=>Math.max(.05,.8-k*d));
function pAtLeast(P,m){let f=[1];P.forEach(p=>{const nf=Array(f.length+1).fill(0);f.forEach((v,k)=>{nf[k]+=v*(1-p);nf[k+1]+=v*p});f=nf});return f.slice(m).reduce((a,b)=>a+b,0)}
function trk(){return{x:30,y:A.H*.8,w:A.W-60,h:28}}
function drawTire(){const s=Z.T,g=A.ctx;wash();const P=ps(s.d),E=P.reduce((a,b)=>a+b,0);chip(`Drop in p per shot: ${s.d.toFixed(3)}`,A.W/2,A.H*.06,{n:13,ok:E<=13});
const r={x:24,y:A.H*.14,w:A.W-48,h:A.H*.42},bw=r.w/20;g.strokeStyle=LINE;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);
P.forEach((p,k)=>{g.fillStyle=p<.5?'#fdba74':'#93c5fd';g.fillRect(r.x+k*bw+1,r.y+r.h*(1-p),bw-2,r.h*p)});
const y8=r.y+r.h*.2;g.strokeStyle=BLUE;g.setLineDash([6,4]);g.lineWidth=2;g.beginPath();g.moveTo(r.x,y8);g.lineTo(r.x+r.w,y8);g.stroke();g.setLineDash([]);
g.fillStyle=A.col.tx;g.font=ft(z(11));g.textAlign='left';g.textBaseline='bottom';g.fillText('p = 0.8 in B(20, 0.8)',r.x+4,y8-3);g.textAlign='center';g.textBaseline='top';g.fillText('shot 1 → shot 20',r.x+r.w/2,r.y+r.h+3);
chip(`Expected scored: ${E.toFixed(1)} vs 16 from B(20, 0.8)`,A.W/2,A.H*.65,{n:12,bad:E<=13});chip(`P(X ≥ 18): ${pAtLeast(P,18).toFixed(3)} vs ${pAtLeast(Array(20).fill(.8),18).toFixed(3)}`,A.W/2,A.H*.72,{n:12});
const t=trk();g.fillStyle='#cbd5e1';A.paint.rrect(t.x,t.y+t.h/2-4,t.w,8,4);g.fill();const hx=t.x+t.w*s.d/.03;g.fillStyle=ORG;g.beginPath();g.arc(hx,t.y+t.h/2,13,0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
g.fillStyle=A.col.tx;g.font=ft(z(10));g.textAlign='left';g.fillText('0',t.x,t.y+t.h+4);g.textAlign='right';g.fillText('0.03',t.x+t.w,t.y+t.h+4)}
function setD(d){const s=Z.T;s.d=Math.max(0,Math.min(.03,Math.round(d/.0025)*.0025));const P=ps(s.d),E=P.reduce((a,b)=>a+b,0);
say(s.d===0?'No tiring: p = 0.8 every shot, so B(20, 0.8) is exact.':`p falls from 0.8 to ${P[19].toFixed(2)} by the last shot. Expected ${E.toFixed(1)} scored, not 16. `+(E<=13?'B(20, 0.8) overstates it by 3 or more: p is not constant.':'Drag further.'))}
function vBtns(){const w=Math.min(140,(A.W-40)/3),h=z(44),x0=(A.W-(3*w+20))/2;return VLAB.map((l,i)=>({i,x:x0+i*(w+10),y:A.H*.8,w,h}))}
function drawVar(){const s=Z.V,g=A.ctx;wash();if(s.k>=3){chip('All 3 judged',A.W/2,A.H*.07,{ok:1});VAR.forEach((d,j)=>chip(`${['Eggs','Flu','Counters'][j]}: ${VLAB[d.ok]}`,A.W/2,A.H*(.3+j*.16),{n:15,ok:1}));return}
const d=VAR[s.k];chip(`Data set ${s.k+1} of 3: fits B(n, p)?`,A.W/2,A.H*.06,{n:13});para(d.ctx,{x:14,y:A.H*.13,w:A.W-28,h:A.H*.17},{n:z(14)});
const bv=d.n*d.p*(1-d.p);chip(`Observed: mean ${d.m}, variance ${d.v}`,A.W/2,A.H*.37,{n:13});chip(`Binomial: np = ${(d.n*d.p).toFixed(2)}, np(1 − p) = ${bv.toFixed(2)}`,A.W/2,A.H*.46,{n:12});
const r={x:30,y:A.H*.58,w:A.W-60,h:20},ratio=d.v/bv,lx=u=>r.x+r.w*Math.min(1,Math.log2(u*4)/4);g.fillStyle='#e2e8f0';g.fillRect(r.x,r.y,r.w,r.h);g.fillStyle='#bbf7d0';g.fillRect(lx(.75),r.y,lx(1.33)-lx(.75),r.h);
g.fillStyle=ORG;g.beginPath();g.arc(Math.max(r.x,lx(ratio)),r.y+r.h/2,9,0,7);g.fill();g.fillStyle=A.col.tx;g.font=ft(z(10));ctr(g);g.fillText('observed ÷ binomial variance: ¼ · 1 · 4',A.W/2,r.y+r.h+12);
vBtns().forEach(b=>para(VLAB[b.i],b,{bad:s.bad===b.i,w:800,n:z(14)}))}
function judge(i){const s=Z.V;if(s.k>=3)return;const d=VAR[s.k];
if(i!==d.ok){s.bad=i;A.sound.miss();return say(`Not ${VLAB[i].toLowerCase()}. ${d.why}`)}
s.k++;s.bad=null;A.sound.pop();say(`${VLAB[i]}. ${d.why}`+(s.k>=3?' All 3 judged.':''))}
function cards(n){const top=A.H*.27,gap=8,h=Math.min(z(64),(A.H*.7-gap*(n-1))/n);return Array.from({length:n},(_,i)=>({i,x:12,y:top+i*(h+gap),w:A.W-24,h}))}
function drawPick(L,s,title){wash();if(s.k>=L.length){chip(`All ${L.length} done`,A.W/2,A.H*.3,{ok:1,n:16});return}
const d=L[s.k];chip(`${title} ${s.k+1} of ${L.length}`,A.W/2,A.H*.06,{n:13});para(d.s,{x:12,y:A.H*.12,w:A.W-24,h:A.H*.12},{fill:'#f1f5f9',w:800,n:z(14)});
const ord=s.ord;cards(3).forEach(b=>para(d.o[ord[b.i]],b,{bad:s.bad===ord[b.i],n:z(13)}))}
function pick(L,s,j,done){if(s.k>=L.length)return;const d=L[s.k];
if(j){s.bad=j;A.sound.miss();return say(d.why[j])}s.k++;s.bad=null;s.ord=[[1,0,2],[2,1,0],[0,2,1],[1,2,0]][s.k%4];A.sound.pop();say(`Yes: ${d.o[0]}`+(s.k>=L.length?done:''))}
function draw(){const k=key();if(k==='chal'){wash();chip('Challenge',A.W/2,A.H*.16,{ok:1});chip('Check each condition in context',A.W/2,A.H*.5,{n:15});return}
if(k==='seed')drawSeed();if(k==='tire')drawTire();if(k==='var')drawVar();if(k==='crit')drawPick(CRIT,Z.C,'Model');if(k==='fix')drawPick(FIX,Z.F,'Refine');A.fx.draw(A.ctx)}
function down(p){const k=key();
if(k==='seed'){const j=sBtns().findIndex(b=>on(p,b));if(j>=0)runS(j);return false}
if(k==='tire'){const t=trk();if(p.y>t.y-24&&p.y<t.y+t.h+20){Z.drag=1;setD((p.x-t.x)/t.w*.03);return true}return false}
if(k==='var'){const b=vBtns().find(b=>on(p,b));if(b)judge(b.i);return false}
if(k==='crit'||k==='fix'){const [L,s]=LS(k);const b=cards(3).find(b=>on(p,b));if(b&&s.k<L.length)choose(k,s.ord[b.i])}return false}
function choose(k,j){if(k==='crit')pick(CRIT,Z.C,j,' Name the context, not just the condition.');else pick(FIX,Z.F,j,' Remove the cause.')}
function move(p){if(Z.drag&&key()==='tire'){const t=trk();setD((p.x-t.x)/t.w*.03)}}
function up(){Z.drag=0}
function fresh(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{S:{ran:[]},T:{d:0},V:{k:0},C:{k:0,ord:[1,0,2]},F:{k:0,ord:[2,0,1]},drag:0,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();Z.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();say(desc);Z.hook=watch(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=key(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='seed'){B('Plant: same conditions',()=>runS(0));B('Plant: trays differ',()=>runS(1))}
if(k==='tire'){B('Less tiring',()=>setD(Z.T.d-.0025));B('More tiring',()=>setD(Z.T.d+.0025))}
if(k==='var'&&Z.V.k<3)VLAB.forEach((l,i)=>B(l,()=>judge(i)));
if((k==='crit'||k==='fix')){const [L,s]=LS(k);if(s.k<L.length)s.ord.forEach((j,n)=>B(`Option ${n+1}`,()=>choose(k,j),`Option ${n+1}: `+L[s.k].o[j]))}}
const steps=[
{h:'Seeds in trays',p:'Plant 120 trays of 10 seeds, first with p = 0.7 for every seed, then with warm and cold trays averaging p = 0.7.',
predict:{q:'Trays differ but the average p is still 0.7. Compared with B(10, 0.7), the counts per tray will be…',opts:['About as spread out','Much more spread out'],ans:1},task:'Plant both kinds of tray',
show:()=>play(0,[()=>runS(0),()=>runS(1)],1200),
go:()=>begin(0,'Empty histogram of seeds germinated per tray, with B(10, 0.7) outlines.',()=>Z.S.ran.length>=2,'Same mean, bigger variance: seeds in a tray share conditions, so they are not independent.')},
{h:'The tiring shooter',p:'A player takes 20 free throws. Fresh, p = 0.8. Drag the slider so p falls a little with every shot.',
predict:{q:'If the player tires, is B(20, 0.8) still a fair model for the number scored?',opts:['Yes: n is fixed and each throw is score or miss','No: p is not the same for each throw'],ans:1},task:'Drag until B(20, 0.8) overstates the expected score by 3 or more',
show:()=>play(1,[.005,.01,.015,.02].map(d=>()=>setD(d)),700),
go:()=>begin(1,'Twenty bars, one per shot, at p = 0.8, and a slider for the drop in p per shot.',()=>ps(Z.T.d).reduce((a,b)=>a+b,0)<=13,'Fixed n and two outcomes are not enough: when p drifts, B(20, 0.8) overstates the mean and P(high score).')},
{h:'Check the variance',p:'If B(n, p) fits, the variance of the counts should be close to np(1 − p). Bigger means clustering; smaller means the trials hold each other back.',
task:'Judge all 3 data sets',show:()=>play(2,VAR.map(d=>()=>judge(d.ok)),900),
go:()=>begin(2,'A data set with its observed mean and variance, a ratio gauge and three verdicts.',()=>Z.V.k>=3,'A big gap between observed variance and np(1 − p) is evidence an assumption failed.')},
{h:'Critique in context',p:'An exam critique names the condition and says why it fails in this context. Choose the best critique, or say it fits.',
task:'Choose the best critique for all 4 models',show:()=>play(3,CRIT.map(()=>()=>choose('crit',0)),800),
go:()=>begin(3,'A model, X = seeds germinating in one tray, and three possible critiques.',()=>Z.C.k>=4,'Name the condition and the reason in context; and do not invent problems when the model fits.')},
{h:'Refine the model',p:'Once you know what breaks, change the plan so the condition holds again. Pick the refinement that removes the cause.',
task:'Choose a refinement for all 3',show:()=>play(4,FIX.map(()=>()=>choose('fix',0)),800),
go:()=>begin(4,'A broken model and three possible fixes.',()=>Z.F.k>=3,'A good refinement removes the cause: a separate p per tray or block, or units that cannot affect each other.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.hook()});
const QS=[{q:'Seeds share a tray. Which condition is most in doubt?',a:'Independence',o:[['Fixed n','n'],['Two outcomes','two']]},
{q:'Counts have mean 6 and variance 21; B(30, 0.2) has variance 4.8. What does this suggest?',a:'Trials are linked or p varies, so B(30, 0.2) is doubtful',o:[['B(30, 0.2) fits, because the means match','mean'],['n must be larger than 30','bign']]},
{q:'Which critique of B(20, 0.8) for free throws earns the mark?',a:'The player tires, so the chance of scoring falls during the 20 shots',o:[['The trials might not be independent','generic'],['The probability might not be 0.8','value']]},
{q:'10 counters drawn without replacement from a bag of 20. Why is B(10, 0.5) poor?',a:'Each draw changes the chance for the next, so p is not constant',o:[['There are more than two colours of counter','two'],['10 is too few draws','bign']]},
{q:'Heads in 10 flips of a fair coin. Best verdict?',a:'B(10, 0.5) is reasonable: all four conditions hold',o:[['Not binomial: the coin could land on its edge','pedant'],['Not binomial: the same coin is reused','memory']]},
{q:'Best refinement when trays differ in warmth?',a:'Model each tray with its own p',o:[['Pool all trays into one big B(n, 0.7)','pool'],['Round p to 1 decimal place','round']]}];
function why(t){let m='Check each condition against the context, with a reason from it.';
if(t==='n')m='Each tray holds a fixed 10 seeds, so n is fixed. The shared tray links the seeds.';
if(t==='two')m='Each trial is still success or failure. Two outcomes holds; look at independence or constant p.';
if(t==='mean')m='Matching means is not enough. A variance far above np(1 − p) points to clustering.';
if(t==='bign')m='Any fixed n is allowed in a binomial model. Size is not one of the conditions.';
if(t==='generic')m='This is true but not in context. Say why: the player tires, so p falls.';
if(t==='value')m='Doubting the value of p is not a broken assumption; the issue is that p changes.';
if(t==='pedant')m='Edge landings are so rare they are ignored. Do not invent problems when the model fits.';
if(t==='memory')m='A coin has no memory; flips stay independent even with the same coin.';
if(t==='pool')m='Pooling trays keeps the clustering. A bigger n hides it but does not fix it.';
if(t==='round')m='Rounding p changes nothing about the broken assumption.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Binomial model buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
