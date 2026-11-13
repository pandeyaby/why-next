/* Flagship – test statistics and their null distribution (ages 16–18; A level binomial hypothesis tests). */
(()=>{
/* 1: first option right */
const STAT=[['A dice is rolled 60 times to test if it shows six too often.',[['X = number of sixes in the 60 rolls','ok'],['p = probability of a six','param'],['X = 60, the number of rolls','trials']]],
 ['A coin is tossed 20 times to test whether it is biased.',[['X = number of heads in 20 tosses','ok'],['X = 0.5, the chance of heads','param'],['X = 20, the number of tosses','trials']]],
 ['30 seeds are planted to test a claim that 80% grow.',[['X = seeds out of 30 that grow','ok'],['p = 0.8','param'],['X = 30, the seeds planted','trials']]],
 ['50 bolts are checked to test if over 2% are faulty.',[['X = number of faulty bolts in the 50','ok'],['p = 0.02','param'],['X = time until a faulty bolt','notcount']]]];
const WHY={param:'That is the parameter, a property of the population. The statistic comes from the sample.',trials:'n is fixed before the test. The statistic is the count of successes.', notcount:'A binomial test counts successes in fixed trials, not a waiting time.'};
/* 2: [context, n, p₀ label, p₀, observed, sample proportion] */
const BUILD=[['60 rolls, 15 sixes. H₀: p = 1/6',60,'1/6',1/6,15,'1/4'],['20 tosses, 14 heads. H₀: p = 0.5',20,'0.5',.5,14,'0.7'],['30 seeds, 21 grow. H₀: p = 0.8',30,'0.8',.8,21,'0.7']];

const FIT=[['Sixes in 30 rolls of a dice',1,'Fixed n = 30, independent rolls, six or not, p = 1/6.'],['Rolls until the first six',0,'The number of trials is not fixed.'],
 ['Hearts in 5 cards, no replacement',0,'Without replacement p changes: trials are not independent.'],['Heads in 50 coin tosses',1,'Fixed n = 50, independent, two outcomes, constant p.'],
 ['Total score on 10 dice',0,'A total score is not a count of successes.'],['Recoveries in 40 patients, p = 0.7',1,'Fixed n, two outcomes, constant p; patients independent.']];

const CLAIM=[.5,.25,.7];
/* 6: heads in 20, H₀: p = 0.5, H₁: p > 0.5 */
const TAIL=[13,15,17];
VIS.reg('flagtstat',c=>{let A,Z,dock,qz,qi=-1,gen=0,grip=null;const M={};
const NAVY='#0f172a',CARD='#ffffff',EDGE='#475569',GD='#15803d',BAD='#b91c1c',PICK='#1d4ed8',BAR='#60a5fa',HOT='#f97316',PALE='#e2e8f0';
const q=n=>Math.round(n*(A.narrow?1:1.1)),ft=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const STEPS=['stat','build','sim','fit','shift','tail','chal'],at=()=>STEPS[A.step],DATA={stat:STAT,build:BUILD,fit:FIT,shift:CLAIM,tail:TAIL},
 done=s=>s==='sim'?M.sim.runs>=300:M[s].i>=DATA[s].length;
const no=()=>A.sound.miss(),yes=()=>A.sound.pop();
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* P(X = k), k = 0..n, by the ratio P(k+1)/P(k) */
function pmf(n,p){const o=[Math.pow(1-p,n)];for(let k=0;k<n;k++)o.push(o[k]*(n-k)/(k+1)*p/(1-p));return o}
const tailUp=(n,p,x)=>pmf(n,p).slice(x).reduce((a,b)=>a+b,0),pct=v=>(100*v).toFixed(1)+'%';
function bg(){Z.fillStyle=A.col.dark?'#0b1220':'#f8fafc';Z.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,w,col,al){Z.fillStyle=col||NAVY;Z.font=ft(n,w);Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(t,x,y,A.W-14)}
function card(r,t,o){o=o||{};Z.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);Z.fill();Z.lineWidth=o.rim?3.5:1.5;Z.strokeStyle=o.rim||EDGE;Z.stroke();if(t!=null)txt(t,r.x+r.w/2,r.y+r.h/2+1,o.n||16,o.w,o.ink)}
function badge(t,ok){Z.font=ft(15,800);const w=Math.min(A.W-12,Z.measureText(t).width+30),h=q(15)+16,y=A.H*.03;card({x:A.W/2-w/2,y,w,h},null,{bg:ok?'#dcfce7':CARD,rim:ok?GD:null,rad:h/2});txt(t,A.W/2,y+h/2+1,15,800)}
function para(m,y,n){if(!m)return;n=n||14;Z.font=ft(n);const L=[];let ln='';m.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(Z.measureText(t).width>A.W-26&&ln){L.push(ln);ln=w}else ln=t});L.push(ln);
 L.forEach((t,j)=>txt(t,A.W/2,A.H*y+(j-(L.length-1)/2)*q(n+4),n,700,A.col.tx))}
function recap(t,L){bg();badge(t,1);L.forEach((s,j)=>txt(s,A.W/2,A.H*(.18+j*.12),15,700,A.col.tx))}
/* bars of P(X = k) in box b; o.obs marks a value, o.from shades the upper tail, o.sim overlays simulated shares */
function hist(b,n,p,o){o=o||{};const P=pmf(n,p),top=Math.max(...P,...(o.sim||[]))*1.1,w=b.w/(n+1),ink=A.col.tx;
 Z.strokeStyle=A.col.dark?'#64748b':'#94a3b8';Z.lineWidth=1;Z.beginPath();Z.moveTo(b.x,b.y+b.h);Z.lineTo(b.x+b.w,b.y+b.h);Z.stroke();
 P.forEach((v,k)=>{const h=v/top*b.h;Z.fillStyle=o.from!=null&&k>=o.from?HOT:o.sim?'rgba(96,165,250,.35)':BAR;Z.fillRect(b.x+k*w+.5,b.y+b.h-h,Math.max(1,w-1),h)});
 if(o.sim){Z.fillStyle=A.col.dark?'#e2e8f0':NAVY;o.sim.forEach((v,k)=>{const h=v/top*b.h;Z.fillRect(b.x+k*w+w*.3,b.y+b.h-h,Math.max(1,w*.4),h)})}
 const step=n>30?10:5;for(let k=0;k<=n;k+=step)txt(String(k),b.x+(k+.5)*w,b.y+b.h+q(10),11,600,ink);
 if(o.obs!=null){const x=b.x+(o.obs+.5)*w;Z.strokeStyle=BAD;Z.lineWidth=3;Z.beginPath();Z.moveTo(x,b.y-4);Z.lineTo(x,b.y+b.h);Z.stroke();txt(o.lab||'observed '+o.obs,Math.min(A.W-50,Math.max(50,x)),b.y-q(10),12,800,ink)}}
const plot=()=>({x:16,y:A.H*.5,w:A.W-32,h:A.H*.3});
/* 1 */
function opts1(){const [,O]=STAT[M.stat.i],r=M.stat.i%3;return O.slice(r).concat(O.slice(0,r))}
function rows1(){const h=q(46),g=8;return opts1().map(([t,tag],j)=>({t,tag,x:12,y:A.H*.36+j*(h+g),w:A.W-24,h}))}
function drawStat(){const s=M.stat;if(done('stat'))return recap('All 4 statistics named',STAT.map(([,O])=>O[0][0]));
 bg();badge(`Test ${s.i+1} of 4: what is the test statistic?`);para(STAT[s.i][0],.23,15);rows1().forEach(r=>card(r,r.t,{n:14,rim:s.bad===r.tag?BAD:null}));para(s.m,.9,13)}
function pickStat(tag){const s=M.stat;if(done('stat'))return;if(tag!=='ok'){s.bad=tag;no();s.m=WHY[tag];return say(s.m)}
 const t=STAT[s.i][1][0][0];s.i++;s.bad=null;s.m='';yes();say(`Yes: ${t}.`+(done('stat')?' All 4 named.':''))}
/* 2 */
function chips2(){const [,n,pl,,x,sl]=BUILD[M.build.i],g=8,w=(A.W-3*g-20)/2,h=q(44);
 return[{k:'n',v:x,t:`n = ${x}`,x:10,y:A.H*.22,w,h},{k:'n',v:n,t:`n = ${n}`,x:10+w+g,y:A.H*.22,w,h},{k:'p',v:sl,t:`p = ${sl}`,x:10,y:A.H*.22+h+g,w,h},{k:'p',v:pl,t:`p = ${pl}`,x:10+w+g,y:A.H*.22+h+g,w,h}]}
function drawBuild(){const s=M.build;if(done('build'))return recap('All 3 null distributions',BUILD.map(([,n,pl])=>`X ~ B(${n}, ${pl})`));
 const ctx=BUILD[s.i][0];bg();badge(`Test ${s.i+1} of 3: build X ~ B(n, p)`);para(ctx,.165,13);
 chips2().forEach(r=>card(r,r.t,{n:15,bg:s[r.k]===r.v?'#dcfce7':CARD,rim:s.bad===r.v?BAD:s[r.k]===r.v?GD:null}));
 txt(`X ~ B(${s.n||'?'}, ${s.p||'?'})`,A.W/2,A.H*.53,18,800,A.col.tx);if(s.last){const L=s.last;hist({x:16,y:A.H*.65,w:A.W-32,h:A.H*.18},L[1],L[3],{obs:L[4],lab:`last: B(${L[1]}, ${L[2]})`})}para(s.m,.93,13)}
function pick2(r){const s=M.build;if(done('build'))return;const [,n,pl,,x,sl]=BUILD[s.i];if(s[r.k]===r.v)return;
 if(r.v===x){s.bad=x;no();s.m=`${x} is the observed count. n is the number of trials: ${n}.`;return say(s.m)}
 if(r.v===sl){s.bad=sl;no();s.m=`${sl} is the sample proportion. The null distribution assumes H₀, so p = ${pl}.`;return say(s.m)}
 s[r.k]=r.v;s.bad=null;s.m='';yes();if(!(s.n&&s.p))return say(`${r.t}. Now the other one.`);
 s.last=BUILD[s.i];s.i++;s.n=s.p=null;say(`X ~ B(${n}, ${pl}) under H₀.`+(done('build')?' All 3 built.':''))}
/* 3: simulate a fair coin */
function toss(times){const s=M.sim;for(let t=0;t<times;t++){let h=0;for(let j=0;j<20;j++)if(Math.random()<.5)h++;s.c[h]++}s.runs+=times;A.sound.tick();
 say(`${s.runs} runs of 20 fair tosses. Most land near 10.`+(done('sim')?' It matches B(20, 0.5).':''))}
function drawSim(){const s=M.sim;bg();badge(done('sim')?'It matches B(20, 0.5)':`Runs: ${s.runs} of 300`,done('sim'));para('If H₀ (fair coin) holds, how many heads in 20?',.165,13);
 txt('pale: B(20, 0.5)   dark: simulated',A.W/2,A.H*.25,12,700,A.col.tx);hist({x:16,y:A.H*.34,w:A.W-32,h:A.H*.44},20,.5,{obs:15,sim:s.runs?s.c.map(v=>v/s.runs):null});para(s.m,.9,13)}
/* 4 */
function bins4(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.5,w,h:A.H*.46}))}
function card4(){return{x:14,y:A.H*.14,w:A.W-28,h:q(54)}}
const SIDE=['Does not fit','Binomial fits'];
function drawFit(){const s=M.fit;bg();badge(done('fit')?'All 6 sorted':`Case ${s.i+1} of 6: binomial or not?`,done('fit'));
 bins4().forEach(b=>{card(b,null,{bg:b.j?'#dcfce7':'#fee2e2',rim:s.bad===b.j?BAD:EDGE});txt(SIDE[b.j],b.x+b.w/2,b.y+q(14),14,800);
  FIT.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>txt(x[0],b.x+b.w/2,b.y+q(36)+m*q(20),11,600,NAVY))});
 if(!done('fit')){const r=card4();Z.font=ft(14);card(grip&&grip.c4?{...r,x:grip.x-r.w/2,y:grip.y-r.h/2}:r,FIT[s.i][0],{n:14,rim:grip?PICK:null})}para(s.m,.4,13)}
function sort4(j){const s=M.fit;if(done('fit'))return;const [,k,why]=FIT[s.i];if(j!==k){s.bad=j;no();s.m=why;return say(why)}
 s.i++;s.bad=null;s.m='';yes();say(`${SIDE[k]}: ${why}`+(done('fit')?' All 6 sorted.':''))}
/* 5 */
const track=()=>({x:30,y:A.H*.86,w:A.W-60,h:q(30)}),pFromX=x=>{const t=track();return Math.round(Math.min(.95,Math.max(.05,.05+(x-t.x)/t.w*.9))*20)/20};
function drawShift(){const s=M.shift;if(done('shift'))return recap('H₀ moved, data stayed',CLAIM.map(p=>`H₀: p = ${p} → X ~ B(20, ${p})`));
 bg();badge(`Claim ${s.i+1} of 3: set H₀ to p = ${CLAIM[s.i]}`);para('14 successes in 20 trials. Drag to the claimed p.',.165,13);
 hist({x:16,y:A.H*.3,w:A.W-32,h:A.H*.38},20,s.p,{obs:14,lab:'data: 14'});const t=track(),x=t.x+(s.p-.05)/.9*t.w;
 Z.fillStyle=A.col.dark?'#334155':PALE;A.paint.rrect(t.x,t.y+t.h/2-4,t.w,8,4);Z.fill();Z.fillStyle=PICK;Z.beginPath();Z.arc(x,t.y+t.h/2,q(14),0,7);Z.fill();
 txt(`H₀: p = ${s.p.toFixed(2)}   mean np = ${(20*s.p).toFixed(1)}`,A.W/2,A.H*.76,14,800,A.col.tx);para(s.m,.95,12)}
function setP(p,final){const s=M.shift;if(done('shift'))return;s.p=p;if(!final)return A.redraw();
 if(Math.abs(p-CLAIM[s.i])>.001){no();s.m=`That is p = ${p.toFixed(2)}. The claim says ${CLAIM[s.i]}.`;return say(s.m)}
 s.i++;s.m='';yes();say(`X ~ B(20, ${p}). The bars moved; the data did not.`+(done('shift')?' All 3 set.':''))}
/* 6 */
function drawTail(){const s=M.tail;if(done('tail'))return recap('Tail probabilities under H₀: p = 0.5',TAIL.map(x=>`P(X ≥ ${x}) = ${pct(tailUp(20,.5,x))}`));
 const x=TAIL[s.i];bg();badge(`Result ${s.i+1} of 3: ${x} heads in 20`);para(s.placed?'Under 5% counts as unusual. Judge it.':`Drag the marker to ${x}.`,.165,13);
 hist(plot(),20,.5,{obs:s.x,lab:`X ≥ ${s.x}`,from:s.x});txt(`P(X ≥ ${s.x}) = ${pct(tailUp(20,.5,s.x))} if H₀ is true`,A.W/2,A.H*.3,15,800,A.col.tx);para(s.m,.93,13)}
function slide6(k,final){const s=M.tail;if(done('tail')||s.placed)return;s.x=Math.max(0,Math.min(20,k));if(!final)return A.redraw();
 if(s.x!==TAIL[s.i]){s.m=`That is ${s.x}, not ${TAIL[s.i]}.`;no();return say(s.m)}s.placed=1;s.m='';yes();say(`P(X ≥ ${s.x}) = ${pct(tailUp(20,.5,s.x))}. Common or unusual if H₀ is true?`)}
function judge6(rare){const s=M.tail;if(done('tail')||!s.placed)return;const v=tailUp(20,.5,s.x),is=v<.05;
 if(rare!==is){no();s.m=is?`${pct(v)} is under 5%: rare if the coin were fair.`:`${pct(v)} is not under 5%: a fair coin does this often.`;return say(s.m)}
 s.i++;s.placed=0;s.x=10;s.m='';yes();say(`${is?'Unusual':'Common'} under H₀: ${pct(v)}.`+(done('tail')?' All 3 judged.':''))}
/* ---- pointer ---- */
function kAt(px){const b=plot();return Math.floor((px-b.x)/(b.w/21))}
function down(p){const s=at();if(s==='chal'||done(s))return false;
 if(s==='stat'){const r=rows1().find(r=>inR(p,r));if(r)pickStat(r.tag)}
 if(s==='build'){const r=chips2().find(r=>inR(p,r));if(r)pick2(r)}
 if(s==='sim'&&p.y>A.H*.3)toss(10);
 if(s==='fit'){if(inR(p,card4())){grip={c4:1,x:p.x,y:p.y};return true}const b=bins4().find(r=>inR(p,r));if(b)sort4(b.j)}
 if(s==='shift'){const t=track();if(inR(p,{x:t.x-20,y:t.y-20,w:t.w+40,h:t.h+40})){grip={sl:1};setP(pFromX(p.x));return true}}
 if(s==='tail'&&!M.tail.placed&&p.y>A.H*.4){grip={tl:1};slide6(kAt(p.x));return true}return false}
function move(p){if(!grip)return;if(grip.sl)return setP(pFromX(p.x));if(grip.tl)return slide6(kAt(p.x));grip.x=p.x;grip.y=p.y;A.redraw()}
function up(p){if(!grip)return;const g=grip;grip=null;if(g.sl)return setP(pFromX(p.x),1);if(g.tl)return slide6(kAt(p.x),1);
 const b=bins4().find(r=>inR(p,r));if(b)sort4(b.j);else A.redraw()}
function fresh(){gen++;grip=null;for(const k in M)delete M[k];['stat','build','fit','shift','tail'].forEach(k=>M[k]={i:0});M.sim={runs:0,c:Array(21).fill(0)};M.shift.p=.5;M.tail.x=10;M.ping=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();M.ping()}
function start(i,first,ready,line){fresh();say(first);M.ping=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(line+A.reveal(i))}}
function film(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function btns(){if(!dock)return;dock.innerHTML='';const s=at(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};if(s==='chal'||done(s))return;
 if(s==='stat')opts1().forEach(([t,tag])=>B(t,()=>pickStat(tag)));
 if(s==='build')chips2().forEach(r=>B(r.t,()=>pick2(r),`Choose ${r.t}`));
 if(s==='sim'){B('Run 10 more',()=>toss(10));B('Run 100 more',()=>toss(100))}
 if(s==='fit')SIDE.forEach((t,j)=>B(t,()=>sort4(j),`${FIT[M.fit.i][0]}: ${t}`));
 if(s==='shift'){const nd=d=>()=>setP(Math.min(.95,Math.max(.05,Math.round(M.shift.p*20+d)/20)),1);B('p − 0.05',nd(-1),'Lower p by 0.05');B('p + 0.05',nd(1),'Raise p by 0.05')}
 if(s==='tail'){if(!M.tail.placed){B('◀',()=>slide6(M.tail.x-1,1),'Move marker left');B('▶',()=>slide6(M.tail.x+1,1),'Move marker right')}else{B('Common if H₀ is true',()=>judge6(false));B('Unusual if H₀ is true',()=>judge6(true))}}}
const steps=[
{h:'The test statistic',p:'A test statistic is worked out from the sample to test H₀. In a binomial test it is the count of successes, X. The parameter p belongs to the population.',task:'Name all 4 statistics',
show:()=>film(0,STAT.map(()=>()=>pickStat('ok')),450),go:()=>start(0,'Tap the test statistic.',()=>done('stat'),'The statistic is the count X.')},
{h:'X ~ B(n, p₀)',p:'Write the distribution X would have if H₀ were true: n trials, and p is the value H₀ claims, not the sample proportion.',
predict:{q:'60 rolls give 15 sixes. H₀: p = 1/6. Which p goes in the null distribution?',opts:['1/4, the sample proportion','1/6, the value in H₀'],ans:1},task:'Build all 3',
show:()=>film(1,[0,1,2].flatMap(()=>[()=>pick2(chips2()[1]),()=>pick2(chips2()[3])]),400),go:()=>start(1,'Tap the right n and the right p.',()=>done('build'),'n trials, p from H₀.')},
{h:'Why assume H₀?',p:'Pretend H₀ is true and simulate. The pile of results is the null distribution: it shows which counts are ordinary if H₀ holds.',
predict:{q:'Many runs of 20 fair tosses: where do most head counts land?',opts:['Near 15, the observed count','Near 10, which is np'],ans:1},task:'Run 300 simulations',
show:()=>film(2,[()=>toss(100),()=>toss(100),()=>toss(100)],400),go:()=>start(2,'Tap the chart or Run to simulate.',()=>done('sim'),'Simulated results pile up like B(20, 0.5).')},
{h:'Does binomial fit?',p:'B(n, p) needs a fixed number of trials, two outcomes, independent trials and the same p each time.',task:'Sort all 6 cases',
show:()=>film(3,FIT.map(x=>()=>sort4(x[1])),400),go:()=>start(3,'Drag the case to a box.',()=>done('fit'),'Fixed n, two outcomes, independent, constant p.')},
{h:'Move H₀',p:'The null distribution comes from H₀ and n only. Change the claim and it moves; your data stay put.',
predict:{q:'Does collecting the data change the null distribution?',opts:['Yes, the data set p','No, only H₀ and n set it'],ans:1},task:'Set all 3 claims',
show:()=>film(4,[()=>setP(.5,1),()=>setP(.25,1),()=>setP(.7,1)],500),go:()=>start(4,'Drag the slider to p = 0.5.',()=>done('shift'),'H₀ sets the distribution; data do not.')},
{h:'How unusual?',p:'Shade P(X ≥ x) under H₀. A small tail means the result would be rare if H₀ were true: evidence against it.',task:'Judge all 3 results',
show:()=>film(5,TAIL.flatMap(x=>[()=>slide6(x,1),()=>judge6(tailUp(20,.5,x)<.05)]),450),go:()=>start(5,'Drag the marker to 13.',()=>done('tail'),'Tails come from the null distribution.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
const QS=[
{q:'Red comes up 9 times in 40 spins. H₀: p = 0.3. X under H₀?',a:'X ~ B(40, 0.3)',o:[['X ~ B(40, 0.225)','sample'],['X ~ B(9, 0.3)','nswap']]},
{q:'Testing a coin for bias, what is the test statistic?',a:'The number of heads, X',o:[['The probability of heads, p','param'],['The significance level, 5%','alpha']]},
{q:'Why does the null distribution use p from H₀?',a:'To see how likely results are if H₀ is true',o:[['Because H₀ is known to be true','true'],['Because the sample proportion is unknown','unknown']]},
{q:'Why is rolls-until-a-six not binomial?',a:'The number of trials is not fixed',o:[['The dice may not be fair','fair'],['A six has probability 1/6','sixp']]},
{q:'Same data, H₀: p = 0.3 instead of 0.5. What changes?',a:'The null distribution',o:[['The observed value of X','obs'],['The number of trials','ntr']]},
{q:'Under H₀, X ~ B(20, 0.5). Its mean?',a:'10',o:[['15, the observed count','meanobs'],['0.5','meanp']]}];
function why(t){let m='The null distribution is B(n, p₀): n trials, p from H₀.';
 switch(t){case 'sample':m='0.225 = 9/40 is the sample proportion. Under H₀, p = 0.3.';break;case 'nswap':m='9 is the observed count. n is the 40 spins.';break;
 case 'param':m='p is the parameter. The statistic is counted from the sample.';break;case 'alpha':m='The significance level is a threshold, not a statistic.';break;
 case 'true':m='H₀ is not known to be true. We assume it to judge the data.';break;case 'unknown':m='The sample proportion is known. H₀ models results if the claim held.';break;
 case 'fair':m='Fairness is about p. The problem is that n is not fixed.';break;case 'sixp':m='A constant p is fine. The number of trials is what is not fixed.';break;
 case 'obs':m='The data do not change. Only the null distribution moves.';break;case 'ntr':m='n is set by the experiment, not by H₀.';break;
 case 'meanobs':m='The mean under H₀ is np = 20 × 0.5 = 10, not the observed count.';break;case 'meanp':m='0.5 is p. The mean count is np = 10.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
function draw(){const s=at();if(s==='chal'){bg();badge('Challenge',1);hist({x:16,y:A.H*.3,w:A.W-32,h:A.H*.45},20,.5,{from:15,obs:15,lab:'X ~ B(20, 0.5) under H₀'});return}
 ({stat:drawStat,build:drawBuild,sim:drawSim,fit:drawFit,shift:drawShift,tail:drawTail})[s]();A.fx.draw(Z)}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{qz.hidden=B.step!==6;dock.hidden=B.step===6;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Test statistic buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
