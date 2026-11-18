/* Flagship – significance level (ages 16–18; A level Mathematics statistics, binomial hypothesis tests). Put the test
   steps in order with α set before the data, find critical regions for 10%, 5% and 1%, simulate Type I errors when H₀
   is true, compare 5% and 1% on a coin that really is biased, then decide reject or not. Every action has a button. */
(()=>{
const ORDER=[['Write H₀ and H₁','hyp'],['Choose the significance level α','alpha'],['Collect the data','data'],['Find P(result this extreme) under H₀','prob'],['Compare with α, conclude in context','end']];
const ALPHAS=[.10,.05,.01];
/* [α, text, observed X or null, p-value or null, reject?] for B(20, 0.5), H₁: p > 0.5 */
const CASES=[[.05,'p-value = 3.2%',null,.032,true],[.01,'p-value = 3.2%',null,.032,false],[.05,'15 heads in 20 tosses',15,null,true],[.05,'14 heads in 20 tosses',14,null,false],[.10,'p-value = 6%',null,.06,true]];
VIS.reg('flagsiglev',c=>{let A,Z,dock,qz,qi=-1,gen=0,grip=null;const M={};
const NAVY='#0f172a',CARD='#ffffff',EDGE='#475569',GD='#15803d',BAD='#b91c1c',PICK='#1d4ed8',BAR='#93c5fd',HOT='#ea580c',SOFT='#475569';
const q=n=>Math.round(n*(A.narrow?1:1.1)),ft=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const STEPS=['order','crit','false','power','judge','chal'],at=()=>STEPS[A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const no=()=>A.sound.miss(),yes=()=>A.sound.pop();
function pmf(n,p){const o=[Math.pow(1-p,n)];for(let k=0;k<n;k++)o.push(o[k]*(n-k)/(k+1)*p/(1-p));return o}
const P5=pmf(20,.5),up=(P,x)=>P.slice(x).reduce((a,b)=>a+b,0),pc=v=>(100*v).toFixed(2)+'%',pc0=v=>(100*v).toFixed(0)+'%',pv=v=>(Math.round(v*1000)/10)+'%';
const crit=a=>{for(let c=0;c<=21;c++)if(up(P5,c)<=a+1e-12)return c;return 21};
function bg(){Z.fillStyle=A.col.dark?'#0b1220':'#f8fafc';Z.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,w,col,al){Z.fillStyle=col||NAVY;Z.font=ft(n,w);Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(t,x,y,A.W-14)}
function card(r,t,o){o=o||{};Z.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);Z.fill();Z.lineWidth=o.rim?3.5:1.5;Z.strokeStyle=o.rim||EDGE;Z.stroke();if(t!=null)txt(t,r.x+r.w/2,r.y+r.h/2+1,o.n||15,o.w,o.ink)}
function badge(t,ok){Z.font=ft(15,800);const w=Math.min(A.W-12,Z.measureText(t).width+30),h=q(15)+16,y=A.H*.03;card({x:A.W/2-w/2,y,w,h},null,{bg:ok?'#dcfce7':CARD,rim:ok?GD:null,rad:h/2});txt(t,A.W/2,y+h/2+1,15,800)}
function para(m,y,n){if(!m)return;n=n||14;Z.font=ft(n);const L=[];let ln='';m.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(Z.measureText(t).width>A.W-26&&ln){L.push(ln);ln=w}else ln=t});L.push(ln);
 L.forEach((t,j)=>txt(t,A.W/2,A.H*y+(j-(L.length-1)/2)*q(n+4),n,700,A.col.tx))}
function hist(b,P,o){o=o||{};const n=P.length-1,top=Math.max(...P)*1.12,w=b.w/(n+1),ink=A.col.tx;
 Z.strokeStyle=A.col.dark?'#64748b':'#94a3b8';Z.lineWidth=1;Z.beginPath();Z.moveTo(b.x,b.y+b.h);Z.lineTo(b.x+b.w,b.y+b.h);Z.stroke();
 P.forEach((v,k)=>{const h=v/top*b.h;Z.fillStyle=o.from!=null&&k>=o.from?HOT:BAR;Z.fillRect(b.x+k*w+.5,b.y+b.h-h,Math.max(1,w-1),h)});
 for(let k=0;k<=n;k+=5)txt(String(k),b.x+(k+.5)*w,b.y+b.h+q(10),11,600,ink);
 if(o.from!=null&&o.from<=n){const x=b.x+o.from*w;Z.strokeStyle=HOT;Z.lineWidth=2;Z.setLineDash([5,4]);Z.beginPath();Z.moveTo(x,b.y-6);Z.lineTo(x,b.y+b.h);Z.stroke();Z.setLineDash([])}
 if(o.obs!=null){const x=b.x+(o.obs+.5)*w;Z.strokeStyle=PICK;Z.lineWidth=3;Z.beginPath();Z.moveTo(x,b.y-4);Z.lineTo(x,b.y+b.h);Z.stroke();txt('X = '+o.obs,Math.min(A.W-40,Math.max(40,x)),b.y-q(12),12,800,ink)}}
/* 1: order the steps */
function deck(){const s=M.order;return[2,0,4,1,3].filter(i=>!s.got.includes(i))}
function rows1(){const d=deck(),h=q(40),g=6;return d.map((i,j)=>({i,x:12,y:A.H*.42+j*(h+g),w:A.W-24,h}))}
function drawOrder(){const s=M.order,done=s.got.length>=5;bg();badge(done?'α is fixed before the data':`Step ${s.got.length+1} of 5: which comes next?`,done);
 s.got.forEach((i,j)=>txt(`✓ ${j+1}. ${ORDER[i][0]}`,16,A.H*.14+j*q(19),13,700,A.col.tx,'left'));
 if(!done)rows1().forEach(r=>card(r,ORDER[r.i][0],{n:13,rim:s.bad===r.i?BAD:null}));para(s.m,.93,13)}
function pick1(i){const s=M.order;if(s.got.length>=5)return;const want=s.got.length;if(i===want){s.got.push(i);s.bad=null;s.m='';yes();return say(`Step ${want+1}: ${ORDER[i][0]}.`+(s.got.length>=5?' All 5 in order.':''))}
 s.bad=i;no();const tag=ORDER[i][1];
 if(want<=1&&(tag==='data'||tag==='prob'))s.m='Not yet. Choose α before you see any data, or the result could tempt you to move the line.';
 else if(tag==='alpha'&&want>1)s.m='Too late for α now. It must be fixed before the data are collected.';
 else if(tag==='end')s.m='You can only conclude after comparing the probability with α.';
 else if(tag==='hyp')s.m='H₀ and H₁ came first. Pick what follows.';
 else s.m='Think about what the test needs before this step can happen.';say(s.m)}
/* 2: critical regions */
const plot=()=>({x:16,y:A.H*.38,w:A.W-32,h:A.H*.34});
function drawCrit(){const s=M.crit,a=ALPHAS[s.i];if(s.i>=3){bg();badge('Smaller α, smaller critical region',1);ALPHAS.forEach((a,j)=>{const c=crit(a);txt(`α = ${pc0(a)}: X ≥ ${c}, actual level ${pc(up(P5,c))}`,A.W/2,A.H*(.2+j*.12),15,700,A.col.tx)});hist({x:16,y:A.H*.58,w:A.W-32,h:A.H*.25},P5,{from:16});return}
 bg();badge(`α = ${pc0(a)}: set the critical region`);para('X ~ B(20, 0.5) if H₀ is true. H₁: p > 0.5. Drag the orange line.',.16,13);
 txt(`X ≥ ${s.c}:  P(X ≥ ${s.c}) = ${pc(up(P5,s.c))}`,A.W/2,A.H*.28,15,800,up(P5,s.c)<=a?(A.col.dark?'#4ade80':GD):(A.col.dark?'#f87171':BAD));hist(plot(),P5,{from:s.c});para(s.m,.92,13)}
function setC(c,final){const s=M.crit;if(s.i>=3)return;s.c=Math.max(8,Math.min(20,c));if(!final){s.m='';return say(`X ≥ ${s.c}: P(X ≥ ${s.c}) = ${pc(up(P5,s.c))}.`)}lockC()}
function lockC(){const s=M.crit;if(s.i>=3)return;const a=ALPHAS[s.i],want=crit(a),v=up(P5,s.c);
 if(s.c===want){s.i++;s.m='';yes();const t=`Critical region X ≥ ${want}. Actual significance level ${pc(v)}, just under ${pc0(a)}.`;if(s.i<3)s.c=12;return say(t+(s.i>=3?' All 3 found.':''))}
 no();if(v>a)s.m=`P(X ≥ ${s.c}) = ${pc(v)} is more than ${pc0(a)}. Move the line right.`;else s.m=`P(X ≥ ${s.c}) = ${pc(v)} fits, but X ≥ ${s.c-1} fits too (${pc(up(P5,s.c-1))}). Take the biggest region at or below ${pc0(a)}.`;say(s.m)}
/* 3: Type I errors, H₀ true */
function sim(p,c,times,o){for(let t=0;t<times;t++){let h=0;for(let j=0;j<20;j++)if(Math.random()<p)h++;o.runs++;if(h>=c)o.rej++}}
function rate(o){return o.runs?o.rej/o.runs:0}
function meter(y,o,lab,line){const x=20,w=A.W-40,h=q(26);card({x,y,w,h},null,{bg:A.col.dark?'#1e293b':'#f1f5f9'});Z.fillStyle=HOT;Z.fillRect(x+1,y+1,Math.max(0,(w-2)*rate(o)),h-2);
 if(line!=null){const lx=x+w*line;Z.strokeStyle=BAD;Z.lineWidth=2;Z.beginPath();Z.moveTo(lx,y-6);Z.lineTo(lx,y+h+6);Z.stroke();txt(pc0(line),lx,y-q(12),11,800,A.col.tx)}
 txt(`${lab}: rejected ${o.rej} of ${o.runs} (${o.runs?pc(rate(o)):'–'})`,A.W/2,y+h+q(16),13,800,A.col.tx)}
function drawFalse(){const o=M.fls,done=o.runs>=500;bg();badge(done?'Type I error rate stays under α':`Tests run: ${o.runs} of 500`,done);
 para('The coin is fair, so H₀: p = 0.5 is true. Each test: 20 tosses, reject if X ≥ 15 (α = 5%).',.17,13);
 hist({x:16,y:A.H*.3,w:A.W-32,h:A.H*.22},P5,{from:15});meter(A.H*.68,o,'H₀ true',.05)}
function runF(n){const o=M.fls;if(o.runs>=500)return;sim(.5,15,n,o);A.sound.tick();say(`${o.runs} tests of a fair coin; H₀ wrongly rejected ${o.rej} times, ${pc(rate(o))}.`+(o.runs>=500?' Every one of those rejections is a Type I error.':''))}
/* 4: power at 5% and 1% */
function drawPower(){const a=M.p5,b=M.p1,done=a.runs>=200&&b.runs>=200;bg();badge(done?'1% catches the bias less often':'The coin is really biased: p = 0.7',done);
 para('Run tests at α = 5% (reject if X ≥ 15) and at α = 1% (reject if X ≥ 16).',.16,13);hist({x:16,y:A.H*.27,w:A.W-32,h:A.H*.2},pmf(20,.7),{from:15});
 meter(A.H*.6,a,'5%');meter(A.H*.78,b,'1%')}
function runP(lvl){const o=lvl===5?M.p5:M.p1;if(o.runs>=200)return say(`Done at ${lvl}%. Now run the other level.`);sim(.7,lvl===5?15:16,100,o);A.sound.tick();
 say(`At ${lvl}%: real bias found in ${o.rej} of ${o.runs} tests.`+(M.p5.runs>=200&&M.p1.runs>=200?' A smaller α misses a real effect more often.':''))}
/* 5: reject or not */
function drawJudge(){const s=M.judge,K=CASES[s.i];if(!K){bg();badge('All 5 decisions made',1);CASES.forEach((k,j)=>txt(`α ${pc0(k[0])}, ${k[1]}: ${k[4]?'reject H₀':'do not reject H₀'}`,A.W/2,A.H*(.2+j*.11),14,700,A.col.tx));return}
 bg();badge(`Case ${s.i+1} of 5: α = ${pc0(K[0])}`);para(`H₀: p = 0.5, H₁: p > 0.5. ${K[1]}.`,.16,14);
 if(K[2]!=null)hist({x:16,y:A.H*.3,w:A.W-32,h:A.H*.3},P5,{from:crit(K[0]),obs:K[2]});
 else{const y=A.H*.38,x=20,w=A.W-40,sc=v=>x+w*Math.min(1,v/.12);card({x,y,w,h:q(26)},null,{bg:A.col.dark?'#1e293b':'#f1f5f9'});Z.fillStyle=PICK;Z.fillRect(x+1,y+1,sc(K[3])-x,q(26)-2);
  const lx=sc(K[0]);Z.strokeStyle=BAD;Z.lineWidth=3;Z.beginPath();Z.moveTo(lx,y-8);Z.lineTo(lx,y+q(34));Z.stroke();txt(`α = ${pc0(K[0])}`,lx,y-q(14),12,800,A.col.tx);txt(`p-value ${pv(K[3])}`,A.W/2,y+q(48),13,800,A.col.tx)}
 const B=bins5();B.forEach(b=>card(b,b.t,{n:15,w:800,rim:s.bad===b.j?BAD:null}));para(s.m,.93,13)}
function bins5(){const g=10,w=(A.W-3*g)/2;return[{j:1,t:'Reject H₀',x:g,y:A.H*.7,w,h:q(46)},{j:0,t:'Do not reject H₀',x:2*g+w,y:A.H*.7,w,h:q(46)}]}
function judge(rej){const s=M.judge,K=CASES[s.i];if(!K)return;if(rej===K[4]){s.i++;s.bad=null;s.m='';yes();return say((rej?'Reject H₀: ':'Do not reject H₀: ')+(K[2]!=null?`${K[2]} is ${rej?'in':'outside'} the critical region X ≥ ${crit(K[0])}.`:`${pv(K[3])} is ${rej?'below':'above'} α = ${pc0(K[0])}.`)+(s.i>=5?' All 5 decided.':''))}
 s.bad=rej?1:0;no();
 if(K[2]===14)s.m=`P(X ≥ 14) = ${pc(up(P5,14))}, more than 5%. 14 is not in the critical region X ≥ 15.`;
 else if(K[2]===15)s.m=`15 is in the critical region X ≥ 15: P(X ≥ 15) = ${pc(up(P5,15))} is under 5%.`;
 else if(!K[4])s.m=`3.2% is under 5% but not under ${pc0(K[0])}. At this level the evidence is not strong enough.`;
 else s.m=`The p-value is ${pv(K[3])}, below α = ${pc0(K[0])}, so the result is significant: reject H₀.`;say(s.m)}
/* ---- pointer ---- */
function kAt(px){const b=plot();return Math.floor((px-b.x)/(b.w/21))}
function down(p){const s=at();if(s==='chal')return false;
 if(s==='order'){const r=rows1().find(r=>inR(p,r));if(r){pick1(r.i);return true}return false}
 if(s==='crit'){if(M.crit.i>=3)return false;if(p.y>A.H*.3&&p.y<A.H*.82){grip={c:1};setC(kAt(p.x));return true}return false}
 if(s==='false'){if(p.y>A.H*.25){runF(50);return true}return false}
 if(s==='power'){if(p.y>A.H*.55&&p.y<A.H*.72){runP(5);return true}if(p.y>=A.H*.72){runP(1);return true}return false}
 if(s==='judge'){const b=bins5().find(r=>inR(p,r));if(b){judge(!!b.j);return true}return false}return false}
function move(p){if(grip&&grip.c)setC(kAt(p.x))}
function upP(p){if(!grip)return;const g=grip;grip=null;if(g.c)setC(kAt(p.x),1)}
function fresh(){gen++;grip=null;for(const k in M)delete M[k];M.order={got:[]};M.crit={i:0,c:12};M.fls={runs:0,rej:0};M.p5={runs:0,rej:0};M.p1={runs:0,rej:0};M.judge={i:0};M.ping=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();M.ping()}
function start(i,first,ready,line){fresh();say(first);M.ping=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(line+A.reveal(i))}}
function film(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function btns(){if(!dock)return;dock.innerHTML='';const s=at(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};if(s==='chal')return;
 if(s==='order'&&M.order.got.length<5)deck().forEach(i=>B(ORDER[i][0],()=>pick1(i)));
 if(s==='crit'&&M.crit.i<3){B('◀ line left',()=>setC(M.crit.c-1),'Move the critical value one left');B('line right ▶',()=>setC(M.crit.c+1),'Move the critical value one right');B(`Lock X ≥ ${M.crit.c}`,lockC,`Lock the critical region X ≥ ${M.crit.c}`)}
 if(s==='false'&&M.fls.runs<500){B('Run 50 tests',()=>runF(50));B('Run 200 tests',()=>runF(200))}
 if(s==='power'){B('Run 100 at 5%',()=>runP(5),'Run 100 tests at the 5% level');B('Run 100 at 1%',()=>runP(1),'Run 100 tests at the 1% level')}
 if(s==='judge'&&CASES[M.judge.i]){B('Reject H₀',()=>judge(true));B('Do not reject H₀',()=>judge(false))}}
const steps=[
{h:'Set α first',p:'The significance level α is the threshold for rejecting H₀. It is fixed before any data are seen. Tap the steps of a test in order.',
predict:{q:'When should the significance level be chosen?',opts:['Before collecting the data','After working out the p-value','Only if the result is close'],ans:0},task:'Order all 5 steps',
show:()=>film(0,[0,1,2,3,4].map(i=>()=>pick1(i)),420),go:()=>start(0,'Tap the first step.',()=>M.order.got.length>=5,'Hypotheses, then α, then data.')},
{h:'The critical region',p:'The critical region is the set of results that lead you to reject H₀. Find the biggest upper tail with probability at or below α.',
predict:{q:'Lower α from 5% to 1%. What happens to the critical region?',opts:['It gets smaller','It gets bigger','It stays the same'],ans:0},task:'Find all 3 regions',
show:()=>film(1,ALPHAS.map(a=>()=>setC(crit(a),1)),500),go:()=>start(1,'Drag the orange line, then lock it.',()=>M.crit.i>=3,'A smaller α needs more extreme results.')},
{h:'What 5% means',p:'If H₀ is true but you reject it, that is a Type I error. Run many tests on a fair coin and count the false rejections.',
predict:{q:'H₀ is true and α = 5%. In many tests, how often is H₀ wrongly rejected?',opts:['At most about 5% of the time','Never, because H₀ is true','About half the time'],ans:0},task:'Run 500 tests',
show:()=>film(2,[()=>runF(200),()=>runF(200),()=>runF(100)],400),go:()=>start(2,'Tap Run, or tap the chart.',()=>M.fls.runs>=500,'α caps the chance of a Type I error.')},
{h:'The cost of 1%',p:'Now the coin really is biased. A test that rejects H₀ has found it. Run tests at 5% and at 1% and compare.',
predict:{q:'The coin is biased. Switching from 5% to 1% makes the bias…',opts:['Harder to detect','Easier to detect','No different to detect'],ans:0},task:'Run 200 at each level',
show:()=>film(3,[()=>runP(5),()=>runP(5),()=>runP(1),()=>runP(1)],350),go:()=>start(3,'Tap a Run button, or tap a bar.',()=>M.p5.runs>=200&&M.p1.runs>=200,'Fewer false alarms, but more real effects missed.')},
{h:'Reject or not?',p:'Compare the p-value with α, or check if X is in the critical region. Not rejecting H₀ does not prove it true.',task:'Decide all 5 cases',
show:()=>film(4,CASES.map(k=>()=>judge(k[4])),420),go:()=>start(4,'Tap Reject H₀ or Do not reject H₀.',()=>M.judge.i>=5,'Below α: reject. Otherwise: not enough evidence.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
const QS=[
{q:'What does a 5% significance level mean?',a:'If H₀ is true, there is at most a 5% chance of rejecting it',o:[['There is a 5% chance that H₀ is true','ptrue'],['5% of the data are wrong','data']]},
{q:'Why is α chosen before the data are collected?',a:'So the result cannot sway where the line is drawn',o:[['Because the p-value cannot be found without it','calc'],['So that the test always rejects H₀','always']]},
{q:'What does using 1% instead of 5% do?',a:'Fewer false rejections, but real effects are missed more often',o:[['It makes every test more accurate','better'],['It makes H₀ easier to reject','easier']]},
{q:'The p-value is 3% and α = 1%. What do you conclude?',a:'Do not reject H₀',o:[['Reject H₀','rej'],['H₀ is proved true','accept']]},
{q:'X ~ B(20, 0.5), H₁: p > 0.5, α = 5%. Critical region?',a:'X ≥ 15',o:[['X ≥ 14','over'],['X ≥ 16','under']]},
{q:'Actual significance level of X ≥ 15 for B(20, 0.5)?',a:'2.07%',o:[['5%','nominal'],['5.77%','next']]}];
function why(t){let m='α is the largest chance you accept of rejecting a true H₀.';
 switch(t){case 'ptrue':m='α is not the chance H₀ is true. It is the chance of rejecting H₀ if it is true.';break;case 'data':m='α says nothing about data errors. It is a threshold for rejecting H₀.';break;
 case 'calc':m='A p-value can be found without α. Fixing α first stops the result from moving the line.';break;case 'always':m='No: fixing α first keeps the test fair, so it rejects only when the evidence is strong.';break;
 case 'better':m='Not more accurate overall: false rejections fall, but real effects are missed more often.';break;case 'easier':m='A smaller α makes H₀ harder to reject: you need a more extreme result.';break;
 case 'rej':m='3% is not below 1%, so the result is not significant at the 1% level.';break;case 'accept':m='Not rejecting H₀ is not proof. There is just not enough evidence against it.';break;
 case 'over':m='P(X ≥ 14) = 5.77%, which is over 5%. So 14 is not in the critical region.';break;case 'under':m='X ≥ 16 fits, but X ≥ 15 (2.07%) also fits. Use the biggest region at or below 5%.';break;
 case 'nominal':m='5% is the chosen level. The actual level is P(X ≥ 15) = 2.07%, because X is discrete.';break;case 'next':m='5.77% is P(X ≥ 14), which is over 5%. For X ≥ 15 it is 2.07%.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
function draw(){const s=at();if(s==='chal'){bg();badge('Challenge',1);hist({x:16,y:A.H*.3,w:A.W-32,h:A.H*.45},P5,{from:15});txt('reject H₀ if X ≥ 15 (α = 5%)',A.W/2,A.H*.2,13,700,A.col.tx);return}
 ({order:drawOrder,crit:drawCrit,false:drawFalse,power:drawPower,judge:drawJudge})[s]();A.fx.draw(Z)}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{qz.hidden=B.step!==5;dock.hidden=B.step===5;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Significance level buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up:upP});btns()}}).start()})})();
