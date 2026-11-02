/* Flagship – shape of binomial distributions (ages 16–18): guess where B(n, p) peaks before the bars appear, slide p to see
   positive skew, symmetry and negative skew, mirror B(n, p) into B(n, 1 − p), grow n and watch mean np, spread √(np(1 − p))
   and skew change, then match unlabelled charts to their parameters. Every drag or tap has a button twin. */
(()=>{
const pmf=(n,p)=>{const r=[];let q=Math.pow(1-p,n);for(let k=0;k<=n;k++){r.push(q);q=p>=1?0:q*(n-k)/(k+1)*p/(1-p)}if(p>=1)r[n]=1;return r};
const mode=(n,p)=>{const P=pmf(n,p);return P.indexOf(Math.max(...P))};
const f2=x=>(Math.round(x*100)/100).toString(),sk=(n,p)=>(1-2*p)/Math.sqrt(n*p*(1-p));
const skewWord=p=>p<.5-1e-9?'positive skew: long tail to the right':p>.5+1e-9?'negative skew: long tail to the left':'symmetric about the mean';
const PEAK=[[10,.3],[20,.5],[8,.75]],MIR=[.3,.2,.6],MEAN=[2,6,10];
const MATCH=[[[15,.8],[15,.2],[15,.5]],[[6,.5],[6,.2],[30,.5]],[[40,.1],[10,.4],[40,.9]]];
VIS.reg('flagbshape',c=>{let A,pad,quiz,qn=-1,stars=0;
const fresh=()=>({k:0,n:10,p:.3,cur:5,hide:0,ghost:null,seen:[0,0,0],done:0,drag:0,shown:null,bad:-1,ord:[0,1,2],wait:0,hook:()=>{}}),S=fresh();
const kind=()=>['peak','skew','mirror','grow','match','quiz'][A.step];
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const slid=()=>({skew:'p',mirror:'p',grow:'n'})[kind()];
function txt(g,t,x,y,s,col,al,wt){g.font=`${wt||600} ${s}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y)}
const chart=()=>{const t=A.narrow?74:60,b=slid()?88:40;return{x:44,y:t,w:A.W-60,h:A.H-t-b}};
const track=()=>{const r=chart();return{x:r.x+16,y:A.H-30,w:r.w-32}};
const cur=()=>kind()==='match'?MATCH[Math.min(S.k,2)][0]:[S.n,S.p];
function draw(A){const g=A.ctx,C=A.col,v=kind();if(v==='quiz'){txt(g,'Peak near np, skew from p, spread √(np(1 − p)).',A.W/2,A.H/2,15,C.tx);return}
 const[n,p]=cur(),P=pmf(n,p),G=S.ghost!=null?pmf(n,S.ghost):null,r=chart(),top=Math.max(...P,...(G||[0]))*1.12,bw=r.w/(n+1),m=mode(n,p);
 g.strokeStyle=C.ln;g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
 g.save();g.translate(14,r.y+r.h/2);g.rotate(-Math.PI/2);txt(g,'P(X = x)',0,0,12,C.mu);g.restore();
 const lab=n>24?5:n>12?2:1;
 for(let k=0;k<=n;k++){const x=r.x+k*bw+bw*.12,w=bw*.76,cx=r.x+(k+.5)*bw;
  if(S.hide){g.strokeStyle=k===S.cur?C.am:C.mu;g.lineWidth=k===S.cur?3:1.2;g.setLineDash([4,4]);g.strokeRect(x,r.y+r.h*.15,w,r.h*.85);g.setLineDash([])}
  else{const h=P[k]/top*r.h;g.fillStyle=k===m&&v==='peak'?C.am:C.cy;g.fillRect(x,r.y+r.h-h,w,h);
   if(G){const h2=G[k]/top*r.h;g.strokeStyle=C.vi;g.lineWidth=2.5;g.strokeRect(x,r.y+r.h-h2,w,h2)}}
  if(k%lab===0)txt(g,String(k),cx,r.y+r.h+12,11,C.mu)}
 if(!S.hide&&v!=='match'){const mu=n*p,sd=Math.sqrt(n*p*(1-p)),X=t=>r.x+(t+.5)*bw;g.strokeStyle=C.rd;g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(X(mu),r.y);g.lineTo(X(mu),r.y+r.h);g.stroke();g.setLineDash([]);
  txt(g,'mean np = '+f2(mu),Math.min(Math.max(X(mu),r.x+60),r.x+r.w-60),r.y-8,12,C.tx,'center',700);
  if(v==='grow'){const y=r.y+14;g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(X(mu-sd),y);g.lineTo(X(mu+sd),y);g.stroke();txt(g,'±σ = '+f2(sd),X(mu+sd)+4,y,12,C.tx,'left',700)}}
 const hd=v==='match'?'Which B(n, p) is this?':S.hide?`B(${n}, ${f2(p)}): tap the bar you think is tallest`:`B(${n}, ${f2(p)})`+(v==='grow'&&!S.done?`: target mean ${MEAN[S.k]}`:'')+(G?`  vs  B(${n}, ${f2(S.ghost)}) outline`:'');
 txt(g,hd,A.W/2,16,A.narrow?13:15,C.tx,'center',800);
 if(v==='skew'||v==='grow')txt(g,v==='skew'?skewWord(p):`skew (1 − 2p)/σ = ${f2(sk(n,p))}`,A.W/2,34,12,C.tx,'center',600);
 if(slid()){const t=track(),lo=slid()==='p'?.05:5,hi=slid()==='p'?.95:50,val=slid()==='p'?p:n,x=t.x+(val-lo)/(hi-lo)*t.w;
  g.strokeStyle=C.ln;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(t.x,t.y);g.lineTo(t.x+t.w,t.y);g.stroke();
  g.fillStyle=C.am;g.beginPath();g.arc(x,t.y,13,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt(g,slid()+' = '+(slid()==='p'?f2(p):n),x,t.y-24,13,C.tx,'center',800)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();tell(t);A.redraw()};
function next(t,cnt){S.k++;A.sound.pop();if(S.k<cnt){tell(t+' Next one.');setup()}else{S.done=1;tell(t)}pads();A.redraw();S.hook()}
function setup(){const v=kind();S.ghost=null;S.hide=0;
 if(v==='peak'){[S.n,S.p]=PEAK[S.k];S.hide=1;S.cur=Math.round(S.n/2)}
 if(v==='skew'){S.n=12;S.p=.3}
 if(v==='mirror'){S.n=10;S.ghost=MIR[S.k];S.p=.5}
 if(v==='grow'){S.n=5;S.p=.2}
 if(v==='match')S.ord=[[0,1,2],[2,0,1],[1,2,0]][S.k];A.redraw()}
function choose(k){if(kind()!=='peak'||S.done)return;S.cur=k;const m=mode(S.n,S.p),np=f2(S.n*S.p);
 if(k!==m)return no(`Not bar ${k}. The mean is np = ${np}, and the peak sits at or next to the mean. Try again.`);
 S.hide=0;A.redraw();const t=`Yes: B(${S.n}, ${f2(S.p)}) peaks at ${m}, next to np = ${np}.`;S.wait=1;setTimeout(()=>{S.wait=0;next(t,3)},A.reduced()||S.q?5:1200);tell(t)}
function setv(v){if(S.done&&kind()!=='skew')return;if(slid()==='p')S.p=Math.round(Math.min(.95,Math.max(.05,v))*20)/20;else S.n=Math.round(Math.min(50,Math.max(5,v))/5)*5;A.redraw();check()}
function check(){const v=kind();
 if(v==='skew'){const z=S.p<.45?0:S.p>.55?2:1;if(!S.seen[z]){S.seen[z]=1;A.sound.pop()}tell(`p = ${f2(S.p)}: ${skewWord(S.p)}. Seen ${S.seen.reduce((a,b)=>a+b)} of 3 shapes.`);if(S.seen.every(x=>x)&&!S.done){S.done=1;pads();S.hook()}}
 if(v==='mirror'&&!S.done){const want=Math.round((1-S.ghost)*20)/20;tell(`p = ${f2(S.p)}. Make the bars the mirror image of the outline.`);if(Math.abs(S.p-want)<1e-9&&!S.wait){S.wait=1;const t=`B(10, ${f2(want)}) is B(10, ${f2(S.ghost)}) flipped: x successes match 10 − x failures.`;tell(t);setTimeout(()=>{S.wait=0;next(t,3)},A.reduced()||S.q?5:1200)}}
 if(v==='grow'&&!S.done){const want=MEAN[S.k],mu=S.n*S.p;tell(`n = ${S.n}: mean ${f2(mu)}, σ ${f2(Math.sqrt(mu*.8))}, skew ${f2(sk(S.n,S.p))}. Target mean ${want}.`);if(Math.abs(mu-want)<1e-9&&!S.wait){S.wait=1;const t=`n = ${S.n} gives mean ${want}. Bigger n: wider spread and less skew.`;tell(t);setTimeout(()=>{S.wait=0;next(t,3)},A.reduced()||S.q?5:1200)}}}
function pick(j){if(kind()!=='match'||S.done||S.wait)return;const o=MATCH[S.k][j],[n,p]=o;if(j){S.bad=j;
  const[N,P]=MATCH[S.k][0],why=p!==P&&n===N?`p = ${f2(p)} would put the peak near ${f2(n*p)}, not ${f2(N*P)}.`:n*p===N*P?`Same mean ${f2(n*p)}, but σ would be ${f2(Math.sqrt(n*p*(1-p)))}, not ${f2(Math.sqrt(N*P*(1-P)))}.`:`B(${n}, ${f2(p)}) has ${n+1} bars and its peak near ${f2(n*p)}.`;pads();return no(`Not B(${n}, ${f2(p)}). ${why}`)}
 S.bad=-1;next(`Yes, B(${n}, ${f2(p)}): mean ${f2(n*p)}, σ ${f2(Math.sqrt(n*p*(1-p)))}, ${skewWord(p)}.`,3)}
function pads(){if(!pad)return;pad.innerHTML='';const v=kind(),B=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'},pad,t);if(lab)b.setAttribute('aria-label',lab);b.onclick=f};if(v==='quiz')return;
 if(v==='peak'&&!S.done){B('◀',()=>{S.cur=Math.max(0,S.cur-1);tell('Bar '+S.cur);A.redraw()},'Previous bar');B('▶',()=>{S.cur=Math.min(S.n,S.cur+1);tell('Bar '+S.cur);A.redraw()},'Next bar');B('Choose this bar',()=>choose(S.cur))}
 if(slid()&&!(S.done&&v!=='skew')){const s=slid()==='p'?.05:5,val=()=>slid()==='p'?S.p:S.n;B(slid()+' −',()=>setv(val()-s),'Decrease '+slid());B(slid()+' +',()=>setv(val()+s),'Increase '+slid())}
 if(v==='match'&&!S.done)S.ord.forEach(j=>{const[n,p]=MATCH[S.k][j];B(`B(${n}, ${f2(p)})`,()=>pick(j))})}
const barAt=p=>{const r=chart();return Math.floor((p.x-r.x)/(r.w/(S.n+1)))};
function down(p){const v=kind();if(v==='peak'&&!S.done){const k=barAt(p);if(k>=0&&k<=S.n){choose(k);return true}return false}
 if(slid()){const t=track();if(Math.abs(p.y-t.y)<34){S.drag=1;move(p);return true}}return false}
function move(p){if(!S.drag)return;const t=track(),u=Math.min(1,Math.max(0,(p.x-t.x)/t.w)),lo=slid()==='p'?.05:5,hi=slid()==='p'?.95:50,o=slid()==='p'?S.p:S.n,nv=lo+u*(hi-lo);setv(nv);if((slid()==='p'?S.p:S.n)!==o)A.sound.tick()}
function up(){S.drag=0}
const fin=(i,msg)=>()=>{if(A.step===i&&S.done&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const reset=()=>{Object.assign(S,fresh())};
function auto(i){return()=>{steps[i].go();S.q=1;const v=kind(),k0=S.k,go=()=>{if(S.done||kind()!==v)return;
 if(v==='peak'&&!S.wait)choose(mode(S.n,S.p));if(v==='skew')setv([.2,.5,.8][S.seen.indexOf(0)]);if(v==='mirror'&&!S.wait)setv(1-S.ghost);if(v==='grow'&&!S.wait)setv(MEAN[S.k]/.2);if(v==='match')pick(0);setTimeout(go,40)};go()}}
const steps=[
{h:'Where is the peak?',p:'Every binomial has a most likely value, the mode. Before the bars appear, tap where you think B(n, p) is tallest.',predict:{q:'B(10, 0.3): where is the tallest bar?',opts:['At 0, the smallest value','Near 3, which is np','At 5, the middle'],ans:1},task:'Find 3 peaks',show:auto(0),
 go:()=>{reset();setup();tell('B(10, 0.3). Tap the bar you think is tallest.');S.hook=fin(0,'The peak sits at or next to np.')}},
{h:'p sets the skew',p:'Drag p. When p is small, most trials fail, so the bars pile up on the left with a tail to the right. Find all three shapes.',predict:{q:'B(12, 0.2): which side has the long tail?',opts:['The left','The right','Neither, it is symmetric'],ans:1},task:'See all 3 shapes',show:auto(1),
 go:()=>{reset();setup();check();S.hook=fin(1,'p < 0.5 gives positive skew, p = 0.5 symmetry, p > 0.5 negative skew.')}},
{h:'Mirror image',p:'The outline is B(10, p₀). Drag p until your bars are its exact mirror image.',task:'Make 3 mirrors',show:auto(2),
 go:()=>{reset();setup();check();S.hook=fin(2,'B(n, 1 − p) is B(n, p) reflected: swap successes and failures.')}},
{h:'Grow n',p:'Keep p = 0.2 and drag n. Set n so the mean hits each target. Watch σ and the skew.',predict:{q:'p stays 0.2 and n grows. What happens to the skew?',opts:['It gets stronger','It fades towards symmetric','It stays exactly the same'],ans:1},task:'Hit 3 mean targets',show:auto(3),
 go:()=>{reset();setup();check();S.hook=fin(3,'Mean np and spread √(np(1 − p)) grow with n, and the skew shrinks.')}},
{h:'Read the shape',p:'No labels now. Use the peak, the skew, the number of bars and the spread to name each chart.',task:'Name 3 charts',show:auto(4),
 go:()=>{reset();setup();tell('Which B(n, p) is this chart?');S.hook=fin(4,'Bars n + 1, peak near np, skew from p, spread from √(np(1 − p)).')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['X ~ B(20, 0.1). Which describes the shape?',[['Positive skew, peak at 2','ok'],['Negative skew, peak at 18','skewdir'],['Symmetric about 10','middle']]],
 ['X ~ B(9, 0.5). Which is true?',[['Symmetric about 4.5','ok'],['Positive skew','skewdir'],['Peak at 0','zero']]],
 ['B(10, 0.3) and B(10, 0.7) are related how?',[['Mirror images about 5','ok'],['The same distribution','mirror'],['B(10, 0.7) is just taller','mirror']]],
 ['p = 0.1 stays fixed and n goes from 10 to 100. The skew…',[['Gets weaker','ok'],['Gets stronger','grow'],['Flips to negative','skewdir']]],
 ['Which has the larger standard deviation?',[['B(40, 0.5)','ok'],['B(40, 0.1)','spread'],['They are equal, same n','spread']]],
 ['X ~ B(4, 0.1). Where is the mode?',[['0','ok'],['0.4, the mean','meanmode'],['2, the middle','middle']]]];
function why(t){let m='Use np for the peak, p for the skew and √(np(1 − p)) for the spread.';
 if(t==='skewdir')m='Small p means mostly failures, so values pile up low with a tail to the right: positive skew. Large p is the reverse.';
 if(t==='middle')m='The peak is near np, not at n/2, unless p = 0.5.';
 if(t==='zero')m='With p = 0.5 the bars are symmetric, so the peak is in the middle, not at 0.';
 if(t==='mirror')m='Swapping p for 1 − p swaps successes and failures, so P(X = x) becomes P(X = n − x): a reflection.';
 if(t==='grow')m='σ = √(np(1 − p)) grows with n, and the skew (1 − 2p)/σ shrinks.';
 if(t==='spread')m='σ = √(np(1 − p)) is largest when p = 0.5: √10 ≈ 3.16 against √3.6 ≈ 1.90.';
 if(t==='meanmode')m='X counts successes, so the mode is a whole number at or next to np = 0.4: here 0.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b0=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},b0,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
