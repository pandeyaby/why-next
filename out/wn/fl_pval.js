/* Flagship – p-values (ages 16–18; A level binomial hypothesis tests). Shade the bars that make up "at least as extreme"
   for an upper-tail and a lower-tail test, compare p with α for four results, sort true and false readings of p = 0.03,
   simulate 1000 runs under H₀ to see what p measures, then slide X to find where p first drops to α (the critical
   value). Tap or drag on the chart; every move also has a button. Data and exact sums in learn/pval_art.js. */
(()=>{const V=PVAL,{DIE}=V;
VIS.reg('flagpval',c=>{let A,ctl,qz,qn=-1,ver=0,hold=null;const W={};
const INK='#111827',YES='#047857',NO='#be123c',EDGE='#6b7280',SEL='#4f46e5',TAILC='#ea580c',BASEC='#94a3b8',SOFT='#eef2ff',GOODF='#dcfce7',CARDF='#ffffff';
const PH=['shade','decide','mean','sim','crit','chal'],ph=()=>PH[A.step];
const u=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function brk(g,t,w){const L=[];let cur='';for(const word of t.split(' ')){const tryit=cur?cur+' '+word:word;if(cur&&g.measureText(tryit).width>w){L.push(cur);cur=word}else cur=tryit}L.push(cur);return L}
function pane(r,t,o){o=o||{};const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fillStyle=o.bg||CARDF;g.fill();g.lineWidth=o.ring?3:1.3;g.strokeStyle=o.ring==='y'?YES:o.ring==='n'?NO:o.ring==='s'?SEL:EDGE;
 if(o.dash)g.setLineDash([5,4]);g.stroke();g.setLineDash([]);if(!t)return;let n=u(o.n||13)+1,L;do{n--;g.font=`${o.wt||700} ${n}px system-ui,sans-serif`;L=brk(g,t,r.w-14)}while(L.length*(n+4)>r.h-6&&n>9);
 g.fillStyle=INK;g.textBaseline='middle';g.textAlign=o.left?'left':'center';const y0=r.y+r.h/2-(L.length-1)*(n+4)/2;L.forEach((s,i)=>g.fillText(s,o.left?r.x+8:r.x+r.w/2,y0+i*(n+4)))}
/* the chart: bars for k = 0..S.show, a colour per bar, an optional marker; returns geometry for hit tests */
function chart(r,S,paint,mark){const g=A.ctx,n=S.show,bw=r.w/(n+1),top=Math.max(...S.P.slice(0,n+1))||1,foot=u(18);pane(r,'',{});
 for(let k=0;k<=n;k++){const h=(r.h-foot-u(22))*S.P[k]/top,col=paint(k);g.fillStyle=col;g.fillRect(r.x+k*bw+1.5,r.y+r.h-foot-h,bw-3,h);if(col===TAILC)g.fillRect(r.x+k*bw,r.y+r.h-foot-5,bw,5)}
 g.fillStyle=INK;g.font=font(10);g.textAlign='center';g.textBaseline='top';const step=A.narrow&&n>12?2:1;for(let k=0;k<=n;k+=step)g.fillText(String(k),r.x+(k+.5)*bw,r.y+r.h-foot+3);
 if(mark!=null){const x=r.x+(mark+.5)*bw;g.strokeStyle=SEL;g.lineWidth=3;g.beginPath();g.moveTo(x,r.y+u(18));g.lineTo(x,r.y+r.h-foot);g.stroke();g.fillStyle=SEL;g.beginPath();g.arc(x,r.y+u(14),u(9),0,7);g.fill();
  g.fillStyle='#ffffff';g.font=font(10,800);g.textBaseline='middle';g.fillText(String(mark),x,r.y+u(14))}
 return{r,bw,k:p=>Math.max(0,Math.min(n,Math.floor((p.x-r.x)/bw)))}}
const tailOf=(S,side,cut)=>side==='up'?V.tailUp(S.P,cut):V.tailDn(S.P,cut);
const sym=side=>side==='up'?'≥':'≤';
function layout(){const k=ph(),Wd=A.W,H=A.H,o={top:{x:8,y:6,w:Wd-16,h:u(38)}};let y=o.top.y+o.top.h+8;
 if(k==='mean'){const zh=H*.4;o.zones=[0,1].map(j=>({x:8+j*((Wd-24)/2+8),y,w:(Wd-24)/2,h:zh}));y+=zh+10;const cols=A.narrow?1:2,gap=7,cw=(Wd-16-gap*(cols-1))/cols,rows=Math.ceil(6/cols),ch=Math.min(u(50),(H-y-6)/rows-gap);
  o.pool=[...Array(6)].map((_,i)=>({x:8+(i%cols)*(cw+gap),y:y+Math.floor(i/cols)*(ch+gap),w:cw,h:ch}));return o}
 o.story={x:8,y,w:Wd-16,h:u(A.narrow?62:48)};y+=o.story.h+8;o.chart={x:8,y,w:Wd-16,h:H*(A.narrow?.36:.42)};y+=o.chart.h+8;
 const bw=(Wd-24)/2,bh=u(44);o.left={x:8,y,w:bw,h:bh};o.right={x:16+bw,y,w:bw,h:bh};o.read={x:8,y:y+bh+8,w:Wd-16,h:Math.min(u(46),H-y-bh-14)};return o}
const story=()=>({shade:()=>V.SHADE[Math.min(W.shade.i,1)].S.story,decide:()=>`${DIE.story} Sam sees X = ${cur().x}. Significance level α = ${cur().a*100}%.`,
 sim:()=>'Pretend H₀ is true: a fair die, p = 1/6. Repeat Sam’s 30 rolls many times and count how often X ≥ 9.',crit:()=>`${DIE.story} α = 5%. Slide X: which is the smallest X with p ≤ 5%?`})[ph()]();
const cur=()=>{const k=ph(),s=W[k];return k==='shade'?V.SHADE[Math.min(s.i,1)]:k==='decide'?V.DECIDE[Math.min(s.i,3)]:null};
const ENDS={shade:'At least as extreme: the observed value and everything beyond it, in the direction of H₁',decide:'Reject H₀ only when p ≤ α',mean:'p is a probability about the data, assuming H₀',
 sim:'About 5% of runs under H₀ reach 9 or more: that is what p = 5.06% means',crit:'X = 10 is the critical value: p ≤ 5% exactly in the critical region X ≥ 10'};
function draw(){const g=A.ctx,k=ph();g.fillStyle=A.col.dark?'#0b1220':'#f8fafc';g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){pane({x:A.W*.1,y:A.H*.32,w:A.W*.8,h:A.H*.26},'p = P(result at least as extreme as observed | H₀). Compare it with α.',{bg:SOFT,n:15});return}
 const s=W[k],L=layout(),fin=s.done;pane(L.top,fin?ENDS[k]:{shade:'Shade the bars that make the p-value',decide:'Reject H₀ or not?',mean:V.MEAN.ask,sim:'Run the experiment under H₀',crit:'Find where p first drops to 5%'}[k],{bg:fin?GOODF:SOFT,ring:fin?'y':null,wt:800});
 if(k==='mean'){L.zones.forEach((z,j)=>{pane(z,'',{dash:1,ring:s.hov===j?'s':null});g.font=font(12,800);g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.fillText(V.MEAN.zones[j],z.x+z.w/2,z.y+6);
   const mine=V.MEAN.cards.filter((cd,i)=>s.put[i]===j),rh=Math.min(u(66),(z.h-u(26))/3-4);mine.forEach((cd,m)=>pane({x:z.x+5,y:z.y+u(24)+m*(rh+4),w:z.w-10,h:rh},cd.t,{bg:GOODF,n:12}))});
  V.MEAN.cards.forEach((cd,i)=>{if(s.put[i]!=null||(hold&&hold.i===i))return;pane(L.pool[i],cd.t,{ring:s.bad===i?'n':s.pick===i?'s':null,n:12})});
  if(hold){const b=L.pool[hold.i];pane({x:hold.x-b.w/2,y:hold.y-b.h/2,w:b.w,h:b.h},V.MEAN.cards[hold.i].t,{ring:'s',bg:SOFT,n:12})}A.fx.draw(g);return}
 pane(L.story,story(),{left:true,n:12,wt:600});
 if(k==='shade'){const R=cur(),S=R.S,on=kk=>s.side&&(s.side==='up'?kk>=s.cut:kk<=s.cut);s.geo=chart(L.chart,S,kk=>on(kk)?TAILC:BASEC,R.x);
  pane(L.left,`Shade X ≥ ${s.cut}`,{ring:s.side==='up'?'s':null,bg:s.side==='up'?SOFT:CARDF});pane(L.right,`Shade X ≤ ${s.cut}`,{ring:s.side==='dn'?'s':null,bg:s.side==='dn'?SOFT:CARDF});
  pane(L.read,s.side?`Shaded: P(X ${sym(s.side)} ${s.cut}) = ${V.pct(tailOf(S,s.side,s.cut))}`:'Pick a side, then tap or drag on the chart to move the edge.',{bg:s.ok?GOODF:CARDF,ring:s.ok?'y':null,n:13})}
 if(k==='decide'){const R=cur(),p=V.tailUp(DIE.P,R.x);s.geo=chart(L.chart,DIE,kk=>kk>=R.x?TAILC:BASEC,R.x);
  pane(L.left,'Reject H₀',{ring:s.bad==='rej'?'n':null});pane(L.right,'Do not reject H₀',{ring:s.bad==='keep'?'n':null});pane(L.read,`p = P(X ≥ ${R.x}) = ${V.pct(p)}   α = ${R.a*100}%`,{n:14})}
 if(k==='sim'){const top=Math.max(1,...s.hist);s.geo=chart(L.chart,Object.assign({},DIE,{P:s.hist.map(v=>v/top)}),kk=>kk>=9?TAILC:BASEC,null);
  pane(L.left,'Run 200 more',{bg:SOFT,ring:'s'});pane(L.right,'Start again',{});const hits=s.hist.slice(9).reduce((a,b)=>a+b,0);
  pane(L.read,s.runs?`${s.runs} runs. X ≥ 9 in ${hits} of them: ${(100*hits/s.runs).toFixed(1)}%. Exact p = ${V.pct(V.tailUp(DIE.P,9))}`:'No runs yet. Each run is 30 rolls of a fair die.',{bg:s.done?GOODF:CARDF,n:13})}
 if(k==='crit'){s.geo=chart(L.chart,DIE,kk=>kk>=s.x?(V.tailUp(DIE.P,s.x)<=.05?TAILC:'#f59e0b'):BASEC,s.x);const p=V.tailUp(DIE.P,s.x);
  pane(L.left,'◀ Smaller X',{});pane(L.right,'Bigger X ▶',{});pane(L.read,`X = ${s.x}: p = P(X ≥ ${s.x}) = ${V.pct(p)} ${p<=.05?'≤':'>'} 5%`,{bg:s.done?GOODF:CARDF,ring:s.done?'y':null,n:14})}
 A.fx.draw(g)}
/* answers */
function judgeShade(){const s=W.shade,R=cur(),S=R.S;if(s.done||s.wait)return;
 if(!s.side)return say('Choose a side first: shade X ≥ or X ≤.');
 if(s.side!==S.side){s.ok=0;A.sound.miss();return say(`H₁ says ${S.H1}, so the extreme results are the ${S.side==='up'?'large':'small'} ones. Shade X ${sym(S.side)} ${R.x}.`)}
 if(s.cut!==R.x){s.ok=0;A.sound.miss();const past=S.side==='up'?s.cut>R.x:s.cut<R.x;return say(past?`At least as extreme includes the observed ${R.x} itself. Move the edge back to ${R.x}.`:`That also shades results less extreme than ${R.x}. Move the edge to ${R.x}.`)}
 s.ok=1;A.sound.pop();const msg=`Yes: p = P(X ${sym(S.side)} ${R.x}) = ${V.pct(tailOf(S,S.side,R.x))}, not P(X = ${R.x}) = ${V.pct(S.P[R.x])}.`;
 if(s.i===0){s.wait=1;const v=ver;setTimeout(()=>{if(v!==ver)return;s.i=1;s.side=null;s.cut=4;s.ok=0;s.wait=0;say('Next: '+V.MACH.story)},900);return say(msg)}s.i=2;s.done=1;say(msg+' '+ENDS.shade+'.')}
function judgeDecide(rej){const s=W.decide,R=cur();if(s.done||s.wait)return;const p=V.tailUp(DIE.P,R.x),right=p<=R.a;
 if(rej!==right){s.bad=rej?'rej':'keep';A.sound.miss();return say(rej?(R.x===9?`P(X = 9) = 3.09% is below 5%, but the p-value is P(X ≥ 9) = ${V.pct(p)}, which is above 5%. Do not reject H₀.`:`p = ${V.pct(p)} is bigger than α = ${R.a*100}%. The result is not unusual enough under H₀: do not reject H₀.`):`p = ${V.pct(p)} is at most α = ${R.a*100}%, so reject H₀: there is evidence that p > 1/6.`)}
 s.bad=null;A.sound.pop();const msg=`${rej?'Reject H₀':'Do not reject H₀'}: p = ${V.pct(p)} ${right?'≤':'>'} α = ${R.a*100}%.`;
 if(s.i<3){s.wait=1;const v=ver;setTimeout(()=>{if(v!==ver)return;s.i++;s.wait=0;say(`Next: X = ${cur().x}, α = ${cur().a*100}%.`)},700);return say(msg)}s.i=4;s.done=1;say(msg+' '+ENDS.decide+'.')}
function sortCard(i,j){const s=W.mean;if(s.done||s.put[i]!=null)return;const cd=V.MEAN.cards[i];s.pick=null;s.hov=-1;
 if(cd.to!==j){s.bad=i;A.sound.miss();return say(cd.why||'This one is a correct reading: p is the chance, under H₀, of a result at least this extreme. Compare it with α to decide.')}
 s.put[i]=j;s.bad=null;A.sound.pop();const left=V.MEAN.cards.some((x,q)=>s.put[q]==null);if(!left)s.done=1;say(`${V.MEAN.zones[j]}: ${cd.t}.`+(left?'':' '+ENDS.mean+'.'))}
let seed=7;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
function runs(n){const s=W.sim;if(s.done)return;for(let r=0;r<n;r++){let x=0;for(let t=0;t<30;t++)if(rnd()<1/6)x++;s.hist[Math.min(16,x)]++;s.runs++}
 const hits=s.hist.slice(9).reduce((a,b)=>a+b,0);if(s.runs>=1000)s.done=1;A.sound.tick();say(`${s.runs} runs: X ≥ 9 in ${hits}, which is ${(100*hits/s.runs).toFixed(1)}%.`+(s.done?' '+ENDS.sim+'.':''))}
function setX(x){const s=W.crit;if(s.done)return;s.x=Math.max(0,Math.min(16,x));A.redraw();A.cv.setAttribute('aria-label',`X = ${s.x}, p = ${V.pct(V.tailUp(DIE.P,s.x))}`)}
function judgeCrit(){const s=W.crit,p=V.tailUp(DIE.P,s.x);if(s.done)return;
 if(s.x===10){s.done=1;A.sound.pop();return say(`X = 10: p = ${V.pct(p)} ≤ 5%, and X = 9 gives ${V.pct(V.tailUp(DIE.P,9))}. ${ENDS.crit}.`)}
 A.sound.miss();say(s.x===9?`X = 9: p = ${V.pct(p)}, just above 5%. Not significant, so 9 is outside the critical region.`:s.x>10?`X = ${s.x}: p = ${V.pct(p)} ≤ 5%, but a smaller X works too. The critical value is the first value inside the region.`:`X = ${s.x}: p = ${V.pct(p)} is far above 5%. Try a bigger X.`)}
/* pointer */
function down(p){const k=ph(),s=W[k];if(k==='chal'||s.done||s.wait)return false;const L=layout();
 if(k==='mean'){const i=L.pool.findIndex((b,q)=>inR(p,b)&&s.put[q]==null);if(i>=0){hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const j=L.zones.findIndex(z=>inR(p,z));if(j>=0&&s.pick!=null)sortCard(s.pick,j);return false}
 if(inR(p,L.left)){({shade:()=>{s.side='up';s.ok=0;say(`Shading X ≥ ${s.cut}.`)},decide:()=>judgeDecide(true),sim:()=>runs(200),crit:()=>{setX(s.x-1);judgeCrit()}})[k]();return false}
 if(inR(p,L.right)){({shade:()=>{s.side='dn';s.ok=0;say(`Shading X ≤ ${s.cut}.`)},decide:()=>judgeDecide(false),sim:()=>{fresh('sim');say('Cleared. No runs yet.')},crit:()=>{setX(s.x+1);judgeCrit()}})[k]();return false}
 if((k==='shade'||k==='crit')&&s.geo&&inR(p,s.geo.r)){hold={chart:1};move(p);return true}return false}
function move(p){if(!hold)return;const k=ph(),s=W[k];if(hold.chart){const v=s.geo.k(p);if(k==='shade'){s.cut=v;s.ok=0;A.redraw()}else setX(v);return}
 hold.x=p.x;hold.y=p.y;s.hov=layout().zones.findIndex(z=>inR(p,z));A.redraw()}
function up(p){const h=hold;if(!h)return;hold=null;const k=ph(),s=W[k];if(h.chart)return k==='shade'?judgeShade():judgeCrit();
 s.hov=-1;const j=layout().zones.findIndex(z=>inR(p,z));if(j>=0)return sortCard(h.i,j);if(Math.hypot(p.x-h.x0,p.y-h.y0)<10){s.pick=h.i;s.bad=null;return say(`Picked “${V.MEAN.cards[h.i].t}”. Now tap True or False.`)}A.redraw()}
function fresh(k){W[k]={i:0,side:null,cut:4,ok:0,wait:0,done:0,bad:null,put:{},pick:null,hov:-1,hist:Array(17).fill(0),runs:0,x:6}}
function wipeAll(){ver++;hold=null;seed=7;PH.slice(0,5).forEach(fresh);W.cb=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();W.cb()}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=ph();if(k==='chal')return;const s=W[k];if(s.done||s.wait)return;const B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='shade'){B('Side: X ≥',()=>{s.side='up';s.ok=0;say(`Shading X ≥ ${s.cut}.`)});B('Side: X ≤',()=>{s.side='dn';s.ok=0;say(`Shading X ≤ ${s.cut}.`)});
  B('◀ Edge',()=>{s.cut=Math.max(0,s.cut-1);s.ok=0;say(`Edge at ${s.cut}.`)},'Move the edge down by 1');B('Edge ▶',()=>{s.cut=Math.min(cur().S.show,s.cut+1);s.ok=0;say(`Edge at ${s.cut}.`)},'Move the edge up by 1');B('Check',judgeShade);return}
 if(k==='decide'){B('Reject H₀',()=>judgeDecide(true));B('Do not reject H₀',()=>judgeDecide(false));return}
 if(k==='sim'){B('Run 200 more',()=>runs(200));B('Start again',()=>{fresh('sim');say('Cleared. No runs yet.')});return}
 if(k==='crit'){B('◀ Smaller X',()=>{setX(s.x-1);judgeCrit()});B('Bigger X ▶',()=>{setX(s.x+1);judgeCrit()});return}
 if(s.pick==null){V.MEAN.cards.forEach((cd,i)=>{if(s.put[i]==null)B(`Pick: ${cd.t}`,()=>{s.pick=i;s.bad=null;say(`Picked “${cd.t}”. Now choose True or False.`)})});return}
 V.MEAN.zones.forEach((z,j)=>B(`→ ${z}`,()=>sortCard(s.pick,j),`Mark “${V.MEAN.cards[s.pick].t}” as ${z}`));B('Cancel',()=>{s.pick=null;say('Nothing picked.')})}
const fin=(i,msg)=>()=>{if(A.step===i&&W[PH[i]].done&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,line,msg){wipeAll();say(line);W.cb=fin(i,msg)}
function demo(i){steps[i].go();const v=ver,k=PH[i],todo=[];let t=0;const at=(ms,f)=>{t+=ms;todo.push([t,f])};
 if(k==='shade')V.SHADE.forEach((R,q)=>{if(q)t+=1000;at(300,()=>{W.shade.side=R.S.side;W.shade.cut=R.x;W.shade.ok=0;A.redraw()});at(500,judgeShade)});
 if(k==='decide')V.DECIDE.forEach(R=>at(800,()=>judgeDecide(V.tailUp(DIE.P,R.x)<=R.a)));
 if(k==='mean')V.MEAN.cards.forEach((cd,q)=>at(380,()=>sortCard(q,cd.to)));
 if(k==='sim')for(let r=0;r<5;r++)at(350,()=>runs(200));
 if(k==='crit')[7,8,9,10].forEach(x=>at(450,()=>{setX(x);judgeCrit()}));
 todo.forEach(([ms,f])=>setTimeout(()=>{if(v===ver)f()},ms))}
const steps=[
{h:'At least as extreme',p:'A p-value is the probability, assuming H₀ is true, of a result at least as extreme as the one you saw. Extreme means far out in the direction of H₁. Shade those bars.',
 predict:{q:'Sam sees 9 sixes in 30 rolls. Which probability is the p-value?',opts:['P(X = 9)','P(X ≥ 9)'],ans:1},task:'Shade the p-value for both tests',show:()=>demo(0),
 go:()=>enter(0,'Bar chart of X ~ B(30, 1/6) under H₀. Observed X = 10. Pick a side, then move the edge.','The p-value adds up the observed value and everything more extreme.')},
{h:'Compare p with α',p:'Fix α before the data. If p ≤ α, the result is unusual enough under H₀: reject H₀. If p > α, do not reject H₀. That is not proof that H₀ is true.',task:'Decide all 4 results',show:()=>demo(1),
 go:()=>enter(1,`Sam sees X = ${V.DECIDE[0].x}. α = 5%. Reject H₀ or not?`,'p ≤ α means reject; p > α means not enough evidence.')},
{h:'What p does not mean',p:'The p-value is worked out by assuming H₀ is true. So it cannot be the chance that H₀ is true, and it does not measure how big an effect is.',
 predict:{q:'p = 0.03. Is there a 3% chance that H₀ is true?',opts:['Yes','No'],ans:1},task:'Sort all 6 statements',show:()=>demo(2),
 go:()=>enter(2,'Two boxes, True and False. Six statements about p = 0.03.','p is about the data, given H₀, not about H₀ given the data.')},
{h:'See it by simulation',p:'Make H₀ true on purpose: roll a fair die 30 times, again and again. Count how often X ≥ 9. The share of runs is close to the p-value.',
 predict:{q:'Out of 1000 runs under H₀, about how many give 9 or more sixes?',opts:['About 31, as P(X = 9) = 3.09%','About 51','About 500'],ans:1},task:'Run 1000 experiments',show:()=>demo(3),
 go:()=>enter(3,'No runs yet. Each run is 30 rolls of a fair die.','A p-value is a long-run share of results under H₀.')},
{h:'p and the critical region',p:'p ≤ α happens exactly when X is in the critical region. Slide X along the chart and watch p. Find the smallest X that is significant at 5%.',task:'Find the critical value',show:()=>demo(4),
 go:()=>enter(4,'X = 6: p = 38.36%. Slide X or use the buttons.','The p-value method and the critical region method always agree.')},
{h:'Challenge',p:'',go:()=>{wipeAll();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>W.cb()});
function why(t){let m='Go back to the definition: the chance under H₀ of a result at least as extreme.';
 if(t==='equal')m='That is the chance of exactly the observed value. The p-value adds every result at least as extreme.';
 if(t==='side')m='That tail points the wrong way. H₁ decides the direction: p > p₀ uses X ≥ x; p < p₀ uses X ≤ x.';
 if(t==='close')m='Compare exactly: reject only if p ≤ α. 5.06% is more than 5%, and 11 lies inside X ≥ 10, so its p is at most 5%.';
 if(t==='prove')m='Not rejecting H₀ is not proof it is true. Say there is not enough evidence for H₁.';
 if(t==='prob')m='p is worked out assuming H₀ is true, so it is not the chance that H₀ (or H₁) is true.';
 if(t==='size')m='A small p shows the result is surprising under H₀, not that the effect is big. Large samples give small p for tiny effects.';
 return m}
function ask(){qn++;const Q=V.QS[qn%V.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function verdict(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;const said=ok?'Correct: '+a:why(t);c.say(said);A.cv.setAttribute('aria-label',said)}
FK.shell(c,{steps,ratio:.72,tall:1.75,draw,onStep:X=>{qz.hidden=X.step!==5;ctl.hidden=X.step===5;pad()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'p-value buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);wipeAll();A.gest({down,move,up});pad()}}).start()})})();
