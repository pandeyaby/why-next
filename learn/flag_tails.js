/* Flagship – one-tailed and two-tailed tests (ages 16–18; A level binomial tests). Claim → H₁, split α over two tails
   of B(30, 0.5), test 20 heads both ways, simulate picking the tail after looking, pick tails for 3 claims. Every action
   has a button. Exact probabilities in learn/tails_art.js. */
(()=>{const T=TAILS,{N,PM,up,dn,pc,CLAIMS,BINS,WHICH,cutHi,cutLo,QS}=T;
VIS.reg('flagtails',c=>{let A,ctl,ch,qn=-1,run=0;const Z={};
const INK='#0f172a',YES='#047857',NO='#b91c1c',RIM='#475569',HOT='#c2410c',BAR='#93c5fd',BARD='#60a5fa',CUT='#f97316',PICK='#4338ca';
const PARTS=['claims','split','verdict','peek','which','quiz'],part=()=>PARTS[A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.1)),F=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`;
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function lines(g,t,w){const out=[''];t.split(' ').forEach(x=>{const k=out.length-1,s=out[k]?out[k]+' '+x:x;if(out[k]&&g.measureText(s).width>w)out.push(x);else out[k]=s});return out}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=o.mark?3.5:1.4;
 g.strokeStyle=o.mark==='y'?YES:o.mark==='n'?NO:o.mark==='p'?PICK:RIM;g.setLineDash(o.dash?[6,4]:[]);g.stroke();g.setLineDash([]);if(!t)return;
 let n=sz(o.n||12)+1,L;do{n--;g.font=`${o.w||700} ${n}px system-ui,sans-serif`;L=lines(g,t,r.w-12)}while(L.length*(n+4)>r.h-6&&n>9);
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const y0=(o.top?r.y+n:r.y+r.h/2-(L.length-1)*(n+4)/2);L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,y0+i*(n+4)))}
function banner(t,ok){tile({x:8,y:8,w:A.W-16,h:sz(30)},t,{fill:ok?'#d1fae5':'#e0e7ff',mark:ok?'y':null,n:13,w:800})}
function floor(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
/* bar chart of B(30, 0.5); colour(k) picks each bar's fill */
function plot(r,colour,mark){const g=A.ctx,top=Math.max(...PM),bw=r.w/(N+1);tile(r,'',{});
 for(let k=0;k<=N;k++){const h=(r.h-sz(26))*PM[k]/top,x=r.x+k*bw;g.fillStyle=colour(k);g.fillRect(x+1,r.y+r.h-sz(18)-h,bw-2,h)}
 g.font=F(10,700);g.fillStyle=INK;g.textBaseline='top';for(let k=0;k<=N;k+=5){g.textAlign=k?k===N?'right':'center':'left';g.fillText(k,Math.min(r.x+r.w-4,Math.max(r.x+4,r.x+(k+.5)*bw)),r.y+r.h-sz(16))}g.textAlign='center';
 if(mark!=null){const x=r.x+(mark+.5)*bw;g.strokeStyle=PICK;g.lineWidth=2.5;g.beginPath();g.moveTo(x,r.y+6);g.lineTo(x,r.y+r.h-sz(18));g.stroke();g.font=F(11,900);g.fillStyle=PICK;g.fillText(`X = ${mark}`,Math.min(r.x+r.w-26,x),r.y+4)}
 return k=>r.x+(k+.5)*bw}
const chartR=()=>({x:8,y:sz(30)+16,w:A.W-16,h:A.H*.42});
const shade=(lo,hi)=>k=>k<=lo||k>=hi?CUT:(A.col.dark?BARD:BAR);
/* 1. claims → H₁ */
const binsR=()=>BINS.map((_,j)=>A.narrow?{x:8,y:sz(30)+16+j*(A.H*.15+6),w:A.W-16,h:A.H*.15}:{x:8+j*((A.W-32)/3+8),y:sz(30)+16,w:(A.W-32)/3,h:A.H*.42});
const poolR=()=>{const b=binsR()[2],y=b.y+b.h+10,cols=A.narrow?2:3,w=(A.W-16-8*(cols-1))/cols,h=Math.min(sz(56),(A.H-y-6)/Math.ceil(CLAIMS.length/cols)-8);return CLAIMS.map((_,i)=>({x:8+(i%cols)*(w+8),y:y+Math.floor(i/cols)*(h+8),w,h}))};
function drawClaims(){const s=Z.claims,all=s.to.every(v=>v!=null);banner(all?'Each claim has its H₁':'Drag each claim to its alternative hypothesis',all);const g=A.ctx;
 binsR().forEach((b,j)=>{tile(b,'',{dash:1,mark:s.hot===j?'p':null});g.font=F(11,800);g.fillStyle=PICK;g.textAlign='left';g.textBaseline='top';g.fillText(BINS[j],b.x+8,b.y+5,b.w-14);
  const mine=CLAIMS.map((q,i)=>i).filter(i=>s.to[i]===j),w=A.narrow?(b.w-12)/2:b.w-12,h=A.narrow?b.h-sz(24):(b.h-sz(28))/2-4;
  mine.forEach((i,m)=>tile(A.narrow?{x:b.x+6+m*(w+2),y:b.y+sz(20),w:w-2,h}:{x:b.x+6,y:b.y+sz(22)+m*(h+4),w,h},CLAIMS[i][0],{fill:'#ecfdf5',n:10}))});
 poolR().forEach((r,i)=>{if(s.to[i]!=null||(Z.drag&&Z.drag.i===i))return;tile(r,CLAIMS[i][0],{mark:s.bad===i?'n':s.sel===i?'p':null,fill:'#fff7ed',n:11})});
 if(Z.drag){const r=poolR()[0];tile({x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2,w:r.w,h:r.h},CLAIMS[Z.drag.i][0],{mark:'p',fill:'#fff7ed',n:11})}}
function file(i,j){const s=Z.claims;if(s.to[i]!=null)return;s.sel=null;const want=CLAIMS[i][1];
 if(want!==j){s.bad=i;A.sound.miss();return tell(want===2?'The claim says changed or biased, with no direction. Either way counts, so both tails: H₁: p ≠ p₀.':j===2?`The claim has a direction (${want?'fewer, less':'more'}), so one tail: ${BINS[want]}.`:`Read the direction again: ${want?'fewer or less means p < p₀':'more means p > p₀'}.`)}
 s.to[i]=j;s.bad=null;A.sound.pop();tell(`“${CLAIMS[i][0]}” → ${BINS[j]}.`)}
/* 2. split α between the tails */
function drawSplit(){const s=Z.split,ok=s.lo===cutLo(.025)&&s.hi===cutHi(.025);banner(ok?'Two-tailed 5%: X ≤ 9 or X ≥ 21':'Drag the orange cut-offs: at most 2.5% in each tail',ok);
 const R=chartR(),at=plot(R,shade(s.lo,s.hi)),g=A.ctx,y=R.y+R.h+sz(14);Z.at=at;
 [['lo',s.lo],['hi',s.hi]].forEach(([k,v])=>{const x=at(k==='lo'?v+.5:v-.5);g.strokeStyle=CUT;g.lineWidth=3;g.beginPath();g.moveTo(x,R.y+10);g.lineTo(x,y);g.stroke();g.fillStyle=Z.grab===k?CUT:'#ffffff';g.beginPath();g.arc(x,y,sz(12),0,7);g.fill();g.stroke();g.fillStyle=Z.grab===k?'#fff':INK;g.font=F(10,900);g.textAlign='center';g.textBaseline='middle';g.fillText('⇔',x,y)});
 const pl=dn(s.lo),ph=up(s.hi),w=(A.W-24)/2,by=y+sz(22),h=A.H-by-8;
 tile({x:8,y:by,w,h},`P(X ≤ ${s.lo}) = ${pc(pl)} ${pl<=.025?'≤':'>'} 2.5%`,{mark:pl<=.025?'y':'n',n:12});tile({x:16+w,y:by,w,h},`P(X ≥ ${s.hi}) = ${pc(ph)} ${ph<=.025?'≤':'>'} 2.5%`,{mark:ph<=.025?'y':'n',n:12})}
function cut(k,v){const s=Z.split;v=Math.round(v);if(k==='lo')s.lo=Math.max(0,Math.min(v,14));else s.hi=Math.min(N,Math.max(v,16));A.sound.tick();
 const L=cutLo(.025),H=cutHi(.025),bits=[];
 const over=(v,t)=>`${t} = ${pc(v)} is over 2.5%: `+(v<=.05?'that spends the whole 5% in one tail, the one-tailed region.':'each tail only gets half of α.');
 if(dn(s.lo)>.025)bits.push(over(dn(s.lo),`P(X ≤ ${s.lo})`));else if(s.lo<L)bits.push(`P(X ≤ ${s.lo}) = ${pc(dn(s.lo))} is allowed, but X ≤ ${L} still fits under 2.5%.`);
 if(up(s.hi)>.025)bits.push(over(up(s.hi),`P(X ≥ ${s.hi})`));else if(s.hi>H)bits.push(`P(X ≥ ${s.hi}) = ${pc(up(s.hi))} is allowed, but X ≥ ${H} still fits under 2.5%.`);
 tell(bits.length?bits.join(' '):`Critical region X ≤ ${L} or X ≥ ${H}: ${pc(dn(L))} + ${pc(up(H))} = ${pc(dn(L)+up(H))}, the actual significance level.`)}
/* 3. same data, two verdicts */
const tabsR=()=>{const R=chartR(),y=R.y+R.h+8,w=(A.W-24)/2;return[{x:8,y,w,h:sz(40)},{x:16+w,y,w,h:sz(40)}]};
function drawVerdict(){const s=Z.verdict,both=s.seen.every(Boolean);banner(both?'Same 20 heads, two different verdicts':'Observed 20 heads in 30. Tap each test',both);
 const one=s.mode===0,two=s.mode===1;plot(chartR(),s.mode==null?(()=>A.col.dark?BARD:BAR):one?shade(-1,cutHi(.05)):shade(cutLo(.025),cutHi(.025)),20);
 tabsR().forEach((r,j)=>tile(r,j?'Two-tailed: H₁: p ≠ 0.5':'One-tailed: H₁: p > 0.5',{mark:s.mode===j?'p':null,fill:s.seen[j]?'#eef2ff':'#ffffff',n:12}));
 const b=tabsR()[0],y=b.y+b.h+8,r={x:8,y,w:A.W-16,h:A.H-y-8};
 if(one)tile(r,`p-value = P(X ≥ 20) = ${pc(up(20))} < 5%. Reject H₀: evidence of more heads.`,{mark:'y',fill:'#ecfdf5',n:13});
 else if(two)tile(r,`Compare P(X ≥ 20) = ${pc(up(20))} with 2.5%: it is bigger (same as 2 × ${pc(up(20))} = ${pc(2*up(20))} > 5%). Do not reject H₀.`,{mark:'n',fill:'#fef2f2',n:13});
 else tile(r,'Pick a test to see its critical region and verdict.',{dash:1,n:13})}
function judge(j){const s=Z.verdict;s.mode=j;s.seen[j]=true;A.sound.pop();
 tell(j?`Two-tailed at 5%: each tail gets 2.5%. Critical region X ≤ 9 or X ≥ 21, so 20 is not in it. Do not reject H₀.`:`One-tailed at 5%: critical region X ≥ 20, so 20 is in it. Reject H₀.`)}
/* 4. choosing the tail after looking: simulate H₀ true */
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
function flips(){let x=0;for(let i=0;i<N;i++)if(rnd()<.5)x++;return x}
const panesR=()=>{const y=sz(30)+16,w=(A.W-24)/2,h=A.H*.62;return[{x:8,y,w,h},{x:16+w,y,w,h}]};
function drawPeek(){const s=Z.peek,g=A.ctx,ok=s.n.every(v=>v>=300);banner(ok?'Peeking doubles the false alarms':'H₀ is true: the coin is fair. Tap a rule to run 100 tests',ok);
 panesR().forEach((r,j)=>{tile(r,'',{mark:s.hot===j?'p':null});g.font=F(11,800);g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';
  g.fillText(j?'Rule B: pick the tail':'Rule A: tail fixed first',r.x+r.w/2,r.y+6,r.w-8);g.font=F(10,600);g.fillText(j?'after seeing the data':'(H₁: p > 0.5, X ≥ 20)',r.x+r.w/2,r.y+sz(20),r.w-8);
  const cells=s.last[j],cs=Math.min((r.w-16)/10,(r.h-sz(90))/10);cells.forEach((bad,m)=>{g.fillStyle=bad?NO:(A.col.dark?'#94a3b8':'#cbd5e1');g.fillRect(r.x+(r.w-cs*10)/2+(m%10)*cs+1,r.y+sz(38)+Math.floor(m/10)*cs+1,cs-2,cs-2)});
  const rate=s.n[j]?s.bad[j]/s.n[j]:0;g.font=F(12,800);g.fillStyle=INK;g.textBaseline='bottom';g.fillText(`${s.bad[j]} false alarms in ${s.n[j]}`,r.x+r.w/2,r.y+r.h-sz(22),r.w-8);
  g.font=F(13,900);g.fillStyle=rate>.07?NO:YES;g.fillText(s.n[j]?`${(100*rate).toFixed(1)}%`:'–',r.x+r.w/2,r.y+r.h-6)});
 tile({x:8,y:A.H*.62+sz(30)+24,w:A.W-16,h:A.H-(A.H*.62+sz(30)+32)},`Long run: rule A ${pc(up(20))}, rule B ${pc(up(20)+dn(10))}`,{n:12,fill:'#fff7ed'})}
function trial(j){const s=Z.peek;s.last[j]=[];for(let t=0;t<100;t++){const x=flips(),bad=j?(x>=20||x<=10):x>=20;s.last[j].push(bad);if(bad)s.bad[j]++;s.n[j]++}A.sound.pop();
 const r=(100*s.bad[j]/s.n[j]).toFixed(1);tell(j?`Rule B: ${s.bad[j]} false alarms in ${s.n[j]} tests (${r}%). Looking first lets either tail count, so the real α is about ${pc(up(20)+dn(10))}.`:`Rule A: ${s.bad[j]} false alarms in ${s.n[j]} tests (${r}%). Close to P(X ≥ 20) = ${pc(up(20))}, under 5%.`)}
/* 5. which tail? */
function drawWhich(){const s=Z.which,g=A.ctx;if(s.k>=WHICH.length){banner('Three claims, three critical regions',true);WHICH.forEach((W,j)=>tile({x:8,y:sz(30)+20+j*(A.H*.27),w:A.W-16,h:A.H*.24},W.say+' Critical region: '+region(W).replace(/(X) ([≤≥]) /g,'$1\u00a0$2\u00a0'),{fill:'#ecfdf5',mark:'y',n:12}));return}
 const W=WHICH[s.k];banner(`${s.k+1} of 3. ${W.say} Tap where H₀ is rejected`);const lit=s.ok?W.side:null,R=chartR(),a=W.a;
 plot(R,k=>lit&&((lit!=='hi'&&k<=cutLo(lit==='both'?a/2:a))||(lit!=='lo'&&k>=cutHi(lit==='both'?a/2:a)))?CUT:(A.col.dark?BARD:BAR));
 zonesR().forEach((r,j)=>tile(r,['◀ Lower tail','Both tails','Upper tail ▶'][j],{mark:s.bad===j?'n':null,fill:'#ffffff',n:12}));const z=zonesR()[0],y=z.y+z.h+8;
 tile({x:8,y,w:A.W-16,h:A.H-y-8},s.ok?`Critical region ${region(W)}${W.side==='both'?`: α/2 = ${100*a/2}% in each tail`:`: all ${100*a}% in one tail`}.`:'Small X is the lower tail, large X the upper tail.',{mark:s.ok?'y':null,fill:s.ok?'#ecfdf5':'#ffffff',dash:!s.ok,n:13})}
const zonesR=()=>{const R=chartR(),y=R.y+R.h+8,w=(A.W-32)/3;return[0,1,2].map(j=>({x:8+j*(w+8),y,w,h:sz(44)}))};
const region=W=>W.side==='lo'?`X ≤ ${cutLo(W.a)}`:W.side==='hi'?`X ≥ ${cutHi(W.a)}`:`X ≤ ${cutLo(W.a/2)} or X ≥ ${cutHi(W.a/2)}`;
function side(j){const s=Z.which;if(s.k>=WHICH.length||s.wait)return;const W=WHICH[s.k],pick=['lo','both','hi'][j];
 if(pick!==W.side){s.bad=j;A.sound.miss();return tell(W.side==='both'?'Unfair means either way: too many or too few heads. Use both tails, α/2 in each.':pick==='both'?'The claim has a direction, so all of α goes in one tail.':'Wrong direction: check whether the claim says more or fewer.')}
 s.bad=null;s.ok=1;s.wait=1;A.sound.pop();const v=run;tell(`Critical region ${region(W)}.`);setTimeout(()=>{if(v!==run)return;s.k++;s.ok=0;s.wait=0;tell(s.k<WHICH.length?WHICH[s.k].say:'All three regions found.')},700)}
function draw(){floor();const k=part();if(k==='quiz'){banner('Challenge',true);tile({x:A.W*.12,y:A.H*.35,w:A.W*.76,h:A.H*.28},'H₁: p > p₀ · p < p₀ · p ≠ p₀ → α in one tail or α/2 in each',{fill:'#fff7ed',n:14});return}
 ({claims:drawClaims,split:drawSplit,verdict:drawVerdict,peek:drawPeek,which:drawWhich})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='claims'){const s=Z.claims,i=poolR().findIndex((r,q)=>isIn(p,r)&&s.to[q]==null);if(i>=0){Z.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const j=binsR().findIndex(r=>isIn(p,r));if(j>=0&&s.sel!=null)file(s.sel,j);return false}
 if(k==='split'&&Z.at){const s=Z.split,dl=Math.abs(p.x-Z.at(s.lo+.5)),dh=Math.abs(p.x-Z.at(s.hi-.5));Z.grab=dl<=dh?'lo':'hi';A.redraw();return true}
 if(k==='verdict'){const j=tabsR().findIndex(r=>isIn(p,r));if(j>=0)judge(j);return false}
 if(k==='peek'){const j=panesR().findIndex(r=>isIn(p,r));if(j>=0)trial(j);return false}
 if(k==='which'){const j=zonesR().findIndex(r=>isIn(p,r));if(j>=0)side(j);return false}return false}
function move(p){const k=part();if(k==='split'&&Z.grab){const s=Z.split,bw=(A.W-16)/(N+1),v=Math.round((p.x-8)/bw+(Z.grab==='lo'?-1:0));if(v!==s[Z.grab])cut(Z.grab,v);return}
 if(k==='claims'&&Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;Z.claims.hot=binsR().findIndex(r=>isIn(p,r));A.redraw()}}
function lift(p){const k=part();if(k==='split'){Z.grab=null;A.redraw();return}const d=Z.drag;if(!d)return;Z.drag=null;Z.claims.hot=-1;const j=binsR().findIndex(r=>isIn(p,r));
 if(j>=0)return file(d.i,j);if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){Z.claims.sel=d.i;Z.claims.bad=null;return tell(`Picked “${CLAIMS[d.i][0]}” Now tap its H₁.`)}A.redraw()}
function reset(){run++;seed=7;for(const k in Z)delete Z[k];Object.assign(Z,{claims:{to:CLAIMS.map(()=>null),sel:null,bad:null,hot:-1},split:{lo:12,hi:18},verdict:{mode:null,seen:[false,false]},
 peek:{n:[0,0],bad:[0,0],last:[[],[]]},which:{k:0,bad:null,ok:0,wait:0},drag:null,grab:null,at:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.hook()}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='claims'){const s=Z.claims;if(s.sel==null)CLAIMS.forEach((q,i)=>{if(s.to[i]==null)B(`Pick: ${q[0]}`,()=>{s.sel=i;s.bad=null;tell(`Picked “${q[0]}” Now choose its H₁.`)})});else BINS.forEach((b,j)=>B(`→ ${b}`,()=>file(s.sel,j)))}
 if(k==='split'){const s=Z.split;B('Lower cut −',()=>cut('lo',s.lo-1),'Move the lower cut-off down one');B('Lower cut +',()=>cut('lo',s.lo+1),'Move the lower cut-off up one');B('Upper cut −',()=>cut('hi',s.hi-1),'Move the upper cut-off down one');B('Upper cut +',()=>cut('hi',s.hi+1),'Move the upper cut-off up one')}
 if(k==='verdict'){B('One-tailed test',()=>judge(0),'Test 20 heads one-tailed, H1 p greater than 0.5');B('Two-tailed test',()=>judge(1),'Test 20 heads two-tailed, H1 p not equal to 0.5')}
 if(k==='peek'){B('Run 100: rule A',()=>trial(0),'Run 100 fair-coin tests with the tail fixed first');B('Run 100: rule B',()=>trial(1),'Run 100 fair-coin tests choosing the tail after looking')}
 if(k==='which'&&Z.which.k<WHICH.length)['Lower tail','Both tails','Upper tail'].forEach((t,j)=>B(t,()=>side(j)))}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,d,ok,msg){reset();tell(d);Z.hook=fin(i,ok,msg)}
function auto(i,fs,ms){steps[i].go();const v=run;fs.forEach((f,n)=>setTimeout(()=>{if(v===run)f()},ms*(n+1)))}
const steps=[
{h:'Read the claim',p:'The wording of the claim fixes H₁ before any data. More or fewer means one tail. Changed, biased or different means two tails. Drag each claim to its H₁.',
 predict:{q:'“The coin is biased.” Which alternative hypothesis?',opts:['H₁: p > 0.5','H₁: p ≠ 0.5'],ans:1},task:'Give all 6 claims an H₁',
 show:()=>auto(0,CLAIMS.map((q,i)=>()=>file(i,q[1])),600),go:()=>begin(0,'Six claims, three alternative hypotheses: p greater than, less than, or not equal to p₀.',()=>Z.claims.to.every(v=>v!=null),'A direction in the claim means one tail; no direction means two.')},
{h:'Split α between the tails',p:'X ~ B(30, 0.5), H₁: p ≠ 0.5, α = 5%. Each tail may hold at most 2.5%. Drag the two orange cut-offs to make each tail as big as it can be.',
 predict:{q:'Two-tailed at 5%: how much can each tail hold?',opts:['5% each','2.5% each'],ans:1},task:'Find the two-tailed 5% critical region',
 show:()=>auto(1,[()=>cut('lo',10),()=>cut('lo',9),()=>cut('hi',20),()=>cut('hi',21)],700),go:()=>begin(1,'Bars for X from 0 to 30. Cut-offs at 12 and 18: both tails hold far more than 2.5%.',()=>Z.split.lo===cutLo(.025)&&Z.split.hi===cutHi(.025),'Half of α in each tail: X ≤ 9 or X ≥ 21.')},
{h:'Same data, two verdicts',p:'You toss the coin 30 times and get 20 heads. Test it one-tailed (H₁: p > 0.5) and two-tailed (H₁: p ≠ 0.5), both at 5%.',
 predict:{q:'20 heads rejects H₀ one-tailed at 5%. Does it two-tailed?',opts:['Yes, same data, same verdict','No, it falls short'],ans:1},task:'Test 20 heads both ways',
 show:()=>auto(2,[()=>judge(0),()=>judge(1)],1000),go:()=>begin(2,'20 heads in 30 tosses. No test chosen yet.',()=>Z.verdict.seen.every(Boolean),'4.94% beats 5% but not 2.5%. The choice of tails changed the verdict.')},
{h:'Why choose first?',p:'H₀ is true here: every coin is fair. Rule A fixes the tail before the data. Rule B waits to see which way the data lean, then tests that tail. Run both.',
 predict:{q:'Rule B picks its tail after looking. Its false-alarm rate is about…',opts:['5%, like rule A','10%, about double'],ans:1},task:'Run 300 tests with each rule',
 show:()=>auto(3,[0,1,0,1,0,1].map(j=>()=>trial(j)),500),go:()=>begin(3,'Two rules, no tests run yet.',()=>Z.peek.n.every(v=>v>=300),'Looking first lets either tail count, so the real α doubles. Decide before the data.')},
{h:'Which tail?',p:'For each claim, tap where H₀ is rejected: the lower tail, both tails or the upper tail. The critical region then lights up.',task:'Find the region for all 3 claims',
 show:()=>auto(4,WHICH.map(W=>()=>side(['lo','both','hi'].indexOf(W.side))),900),go:()=>begin(4,WHICH[0].say,()=>Z.which.k>=WHICH.length,'Direction picks the tail; no direction splits α in two.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.hook()});
function why(t){let m='Check the claim’s wording and how α is shared.';
 if(t==='dir')m='The claim gives no direction, so either way counts: H₁: p ≠ p₀.';
 if(t==='both')m='The claim says fewer, a direction, so all of α goes in the lower tail.';
 if(t==='whole')m='In a two-tailed test each tail gets α/2. Compare with 2.5%, not 5%.';
 if(t==='eye')m='A big-looking count is not enough. Compare its tail probability with α/2.';
 if(t==='easy')m='It is about honesty, not sums: picking the tail after looking doubles the Type I error.';
 if(t==='peek')m='It matters: choosing after looking lets either tail count, so α is really about 10%.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 ch.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ch.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){ch.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ch.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{ch.hidden=X.step!==5;ctl.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Test buttons'},w);ch=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});keys()}}).start()})})();
