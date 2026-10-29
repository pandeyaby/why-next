/* Flagship – average value of a function (ages 17–18): level a line across y = x² on [0, 3] until the hill above
   it fills the gaps below (height 3 = 9 ÷ 3); take more and more equally spaced samples and watch their mean settle on
   the same 3; slide a day window over a temperature model and read its average; find the point c where f(c) equals the
   average (√3, not the midpoint); see positive and negative area cancel for sin x; then a challenge on the classic slips. */
(()=>{const PI=Math.PI,fm=(x,d)=>{const k=10**(d==null?2:d),r=Math.round(x*k)/k;return(r<0?'−':'')+Math.abs(r)};
const sq=x=>x*x,R3=Math.sqrt(3),temp=t=>14-6*Math.cos(PI*t/12),TF=t=>14*t-72/PI*Math.sin(PI*t/12);
const avgT=(a,b)=>b>a?(TF(b)-TF(a))/(b-a):temp(a),midMean=n=>{let s=0;for(let i=0;i<n;i++)s+=sq(3*(i+.5)/n);return s/n};
const hr=t=>{t=Math.round(t)%24;return t===0?'midnight':t===12?'noon':t<12?t+' am':(t-12)+' pm'};
const SINB=[[PI/2,'π/2'],[PI,'π'],[2*PI,'2π']];
VIS.reg('flagavgval',c=>{let A,pad,quiz;
const K={h:1,n:1,seen:{},a:0,b:24,cx:.5,bi:-1,seenB:{},drag:null,tok:0,onChange:()=>{}};
const stage=()=>['level','samp','temp','mvt','sign','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1.05:1.2)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(g,t,x,y,n,col,w,al){g.font=font(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const box=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.54}:{x:6,y:6,w:A.W*.58,h:A.H-12};
const side=()=>A.narrow?{x:6,y:A.H*.56,w:A.W-12,h:A.H*.44-6}:{x:A.W*.6+4,y:6,w:A.W*.4-14,h:A.H-12};
const row=i=>side().y+z(12)+i*z(20);
const SPEC={level:[sq,-.25,3.25,-1,10,0,3],samp:[sq,-.25,3.25,-1,10,0,3],mvt:[sq,-.25,3.25,-1,10,0,3],temp:[temp,-1,25,-2,22],sign:[Math.sin,-.3,6.6,-1.3,1.3]};
function axes(){const r=box(),s=SPEC[stage()]||SPEC.level,[,x0,x1,y0,y1]=s,L=r.x+28,B=r.y+r.h-22,W=r.w-36,H=r.h-34;
 return{X:x=>L+(x-x0)/(x1-x0)*W,Y:y=>B-(y-y0)/(y1-y0)*H,ix:px=>x0+(px-L)/W*(x1-x0),iy:py=>y0+(B-py)/H*(y1-y0),f:s[0],r}}
function grid(g,M,xt,yt){const C=A.col,r=M.r;g.fillStyle=A.alpha(C.mu,.07);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=A.alpha(C.tx,.7);g.lineWidth=1.5;g.beginPath();g.moveTo(r.x+4,M.Y(0));g.lineTo(r.x+r.w-4,M.Y(0));g.moveTo(M.X(0),r.y+4);g.lineTo(M.X(0),r.y+r.h-4);g.stroke();
 xt.forEach(([v,t])=>write(g,t,M.X(v),M.Y(0)+12,10,C.tx,600));yt.forEach(([v,t])=>write(g,t,M.X(0)-12,M.Y(v),10,C.tx,600,'right'))}
function curve(g,M,a,b,col,w){g.strokeStyle=col;g.lineWidth=w||3;g.beginPath();for(let i=0;i<=200;i++){const x=a+(b-a)*i/200;i?g.lineTo(M.X(x),M.Y(M.f(x))):g.moveTo(M.X(x),M.Y(M.f(x)))}g.stroke()}
function under(g,M,a,b,col,lo){g.fillStyle=col;g.beginPath();g.moveTo(M.X(a),M.Y(lo||0));for(let i=0;i<=120;i++){const x=a+(b-a)*i/120;g.lineTo(M.X(x),M.Y(M.f(x)))}g.lineTo(M.X(b),M.Y(lo||0));g.closePath();g.fill()}
// region between the curve and a level line h: parts of the curve above h (hill) and below h (gaps)
function between(g,M,a,b,h,above,col){g.fillStyle=col;g.beginPath();g.moveTo(M.X(a),M.Y(h));for(let i=0;i<=160;i++){const x=a+(b-a)*i/160,y=M.f(x);g.lineTo(M.X(x),M.Y(above?Math.max(y,h):Math.min(y,h)))}g.lineTo(M.X(b),M.Y(h));g.closePath();g.fill()}
const hill=h=>{if(h<=0)return 9-3*h;if(h>=9)return 0;const s=Math.sqrt(h);return(9-s**3/3)-h*(3-s)},gap=h=>hill(h)-(9-3*h);
const pin=(g,X,Y,col,r)=>{g.fillStyle=col;g.beginPath();g.arc(X,Y,r||7,0,7);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()};
function hline(g,M,y,a,b,col,lab){g.strokeStyle=col;g.lineWidth=3;g.setLineDash([8,5]);g.beginPath();g.moveTo(M.X(a),M.Y(y));g.lineTo(M.X(b),M.Y(y));g.stroke();g.setLineDash([]);if(lab)A.paint.label(lab,M.X(b),M.Y(y)-14,{align:'right',bg:A.alpha(A.col.pn,.9),col:A.col.tx})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const m=stage(),p=side(),mx=p.x+p.w/2;
 if(m==='quiz'){write(g,'f̄ = (1 / (b − a)) ∫ₐᵇ f(x) dx',W/2,H/2,19,C.tx,800);return}
 const M=axes();
 if(m==='level'||m==='samp'||m==='mvt')grid(g,M,[[1,'1'],[2,'2'],[3,'3']],[[3,'3'],[6,'6'],[9,'9']]);
 if(m==='level'){const h=K.h;between(g,M,0,3,h,1,A.alpha(C.or,.45));between(g,M,0,3,h,0,A.alpha(C.cy,.35));curve(g,M,0,3,C.ac,3.5);hline(g,M,h,0,3,C.vi,'h = '+fm(h));
  pin(g,M.X(3)+12,M.Y(h),C.or,9);
  write(g,'y = x²,  0 ≤ x ≤ 3',mx,row(0),13,C.tx,800);write(g,'Area under curve = ∫₀³ x² dx = 9',mx,row(1),12,C.tx,700);
  write(g,`Hill above line: ${fm(hill(h))}`,mx,row(2),12,C.tx,700);write(g,`Gaps below line: ${fm(gap(h))}`,mx,row(3),12,C.tx,700);
  const ok=Math.abs(h-3)<1e-9;write(g,ok?'Level! h × 3 = 9, so h = 9 ÷ 3 = 3':`Rectangle h × 3 = ${fm(3*h)}`,mx,row(4.2),13,ok?C.gr:C.tx,800)}
 if(m==='samp'){const n=K.n;under(g,M,0,3,A.alpha(C.ac,.12));curve(g,M,0,3,C.ac,3);for(let i=0;i<n;i++){const x=3*(i+.5)/n;g.strokeStyle=A.alpha(C.or,.8);g.lineWidth=n>16?1.5:2.5;g.beginPath();g.moveTo(M.X(x),M.Y(0));g.lineTo(M.X(x),M.Y(sq(x)));g.stroke();pin(g,M.X(x),M.Y(sq(x)),C.or,n>16?3:5)}
  hline(g,M,midMean(n),0,3,C.vi,'mean '+fm(midMean(n),3));write(g,`${n} equally spaced sample${n>1?'s':''}`,mx,row(0),13,C.tx,800);
  write(g,`Mean of samples = ${fm(midMean(n),4)}`,mx,row(1),13,C.gr,800);write(g,[1,2,4,8,16,32].filter(k=>K.seen[k]).map(k=>`${k}→${fm(midMean(k),3)}`).join('  '),mx,row(2),10,C.tx,700);
  write(g,'Endpoints only: (0 + 9) ÷ 2 = 4.5',mx,row(3),11,C.tx,600);if(n>=32)write(g,'The sample mean settles on ∫ ÷ width = 3',mx,row(4),12,C.gr,800)}
 if(m==='temp'){grid(g,M,[[6,'6'],[12,'12'],[18,'18'],[24,'24']],[[8,'8'],[14,'14'],[20,'20']]);const a=K.a,b=K.b;if(b>a)under(g,M,a,b,A.alpha(C.or,.22));curve(g,M,0,24,C.rd,3);
  const v=avgT(a,b);hline(g,M,v,a,b,C.vi,fm(v,1)+' °C');[a,b].forEach(t=>{g.strokeStyle=C.cy;g.lineWidth=2;g.beginPath();g.moveTo(M.X(t),M.Y(0));g.lineTo(M.X(t),M.Y(temp(t)));g.stroke();pin(g,M.X(t),M.Y(temp(t)),C.cy,9)});write(g,'hours after midnight',M.X(12),M.Y(0)+24,10,C.tx,600);
  write(g,'T = 14 − 6 cos(πt / 12)  °C',mx,row(0),12,C.tx,800);write(g,`From ${hr(a)} to ${hr(b)}  (${b-a} h)`,mx,row(1),12,C.tx,700);
  write(g,`Average = (1 / ${b-a}) ∫ T dt = ${fm(v,2)} °C`,mx,row(2),12,C.gr,800);write(g,`At the two ends: ${fm(temp(a),1)} and ${fm(temp(b),1)} °C`,mx,row(3),11,C.tx,600);
  if(a===6&&b===18)write(g,'Exact: 14 + 12/π ≈ 17.82 °C',mx,row(4.2),12,C.gr,800)}
 if(m==='mvt'){const x=K.cx,y=sq(x);under(g,M,0,3,A.alpha(C.ac,.12));curve(g,M,0,3,C.ac,3);hline(g,M,3,0,3,C.vi,'f̄ = 3');g.strokeStyle=C.or;g.lineWidth=2;g.beginPath();g.moveTo(M.X(x),M.Y(0));g.lineTo(M.X(x),M.Y(y));g.stroke();pin(g,M.X(x),M.Y(y),C.or,9);
  const hit=Math.abs(x-R3)<.006;write(g,'Find c with f(c) = f̄ = 3',mx,row(0),13,C.tx,800);write(g,`c = ${fm(x,3)}${hit?' = √3':''}`,mx,row(1),13,C.tx,800);
  write(g,`f(c) = ${fm(y,3)}`,mx,row(2),13,hit?C.gr:C.tx,800);write(g,hit?'c = √3 ≈ 1.73, not the midpoint 1.5':'Midpoint 1.5 gives f = 2.25',mx,row(3),11,hit?C.gr:C.tx,700)}
 if(m==='sign'){grid(g,M,[[PI/2,'π/2'],[PI,'π'],[2*PI,'2π']],[[1,'1'],[-1,'−1']]);curve(g,M,0,2*PI,A.alpha(C.tx,.35),2);if(K.bi>=0){const b=SINB[K.bi][0];
   under(g,M,0,Math.min(b,PI),A.alpha(C.gr,.35));if(b>PI)under(g,M,PI,b,A.alpha(C.rd,.35));curve(g,M,0,b,C.ac,3.5);const v=(1-Math.cos(b))/b;hline(g,M,v,0,b,C.vi,'f̄ = '+fm(v,3));
   write(g,`Average of sin x on [0, ${SINB[K.bi][1]}]`,mx,row(0),13,C.tx,800);write(g,`∫ = 1 − cos b = ${fm(1-Math.cos(b),3)}`,mx,row(1),12,C.tx,700);write(g,`f̄ = ${fm(1-Math.cos(b),3)} ÷ ${SINB[K.bi][1]} = ${fm(v,3)}`,mx,row(2),13,C.gr,800);
   if(b>PI)write(g,'Area below the axis counts as negative',mx,row(3),11,C.rd,700)}else write(g,'Pick an end point b',mx,row(0),13,C.tx,800)}
 A.fx.draw(g)}
function setH(h){h=Math.max(0,Math.min(9,h));h=Math.abs(h-3)<.12?3:Math.round(h*20)/20;if(h===K.h)return;K.h=h;A.sound.tick();report(`h = ${fm(h)}. Hill ${fm(hill(h))}, gaps ${fm(gap(h))}.`)}
function setN(k){k=Math.max(0,Math.min(5,Math.round(k)));const n=2**k;if(n===K.n&&K.seen[n])return;K.n=n;K.seen[n]=1;A.sound.pop();report(`${n} samples, mean ${fm(midMean(n),4)}.`)}
function setEnd(w,t){t=Math.max(0,Math.min(24,Math.round(t)));if(w==='a')K.a=Math.min(t,K.b-1);else K.b=Math.max(t,K.a+1);A.sound.tick();report(`${hr(K.a)} to ${hr(K.b)}: average ${fm(avgT(K.a,K.b),2)} °C.`)}
function setC(x){x=Math.max(0,Math.min(3,x));x=Math.abs(x-R3)<.04?R3:Math.round(x*100)/100;K.cx=x;report(`c = ${fm(x,3)}, f(c) = ${fm(sq(x),3)}.`)}
function setB(i){K.bi=i;K.seenB[i]=1;A.sound.pop();const b=SINB[i][0];report(`b = ${SINB[i][1]}: average ${fm((1-Math.cos(b))/b,3)}.`)}
function report(msg){const m=stage();let t='';
 if(m==='level')t=K.h!==3?'Move the line until hill and gaps are equal.':'Level at 3: the average value.';
 else if(m==='samp')t=K.n<32?'Double the samples up to 32.':'The mean of samples is 3, the same as the integral ÷ width.';
 else if(m==='temp')t=K.a===6&&K.b===18?'That is the daytime window.':'Set the window to 6 am – 6 pm.';
 else if(m==='mvt')t=K.cx===R3?'Found it: c = √3.':'Slide c until f(c) = 3.';
 else if(m==='sign')t=Object.keys(K.seenB).length<3?'Try all three end points.':'Over a full turn the + and − areas cancel: average 0.';
 tell((msg?msg+' ':'')+t);controls();K.onChange()}
function controls(){if(!A||!pad)return;pad.innerHTML='';const m=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(m==='level'){b('Line down −0.5',()=>setH(K.h-.5),'Lower the line by 0.5');b('Line up +0.5',()=>setH(K.h+.5),'Raise the line by 0.5')}
 if(m==='samp'){b('− Fewer samples',()=>setN(Math.log2(K.n)-1),'Halve the samples');b('More samples +',()=>setN(Math.log2(K.n)+1),'Double the samples')}
 if(m==='temp'){b('Start −1 h',()=>setEnd('a',K.a-1));b('Start +1 h',()=>setEnd('a',K.a+1));b('End −1 h',()=>setEnd('b',K.b-1));b('End +1 h',()=>setEnd('b',K.b+1))}
 if(m==='mvt'){b('c − 0.05',()=>setC(K.cx-.05),'Move c left');b('c + 0.05',()=>setC(K.cx+.05),'Move c right')}
 if(m==='sign')SINB.forEach(([,l],i)=>b('b = '+l,()=>setB(i),'End point b equals '+l.replace('π',' pi')));
 A.redraw()}
const inBox=p=>{const r=box();return p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h};
function down(p){const m=stage();if(!inBox(p))return false;const M=axes();
 if(m==='level'){K.drag='h';setH(M.iy(p.y));return true}
 if(m==='samp'){setN(Math.log2(K.n)+1);return false}
 if(m==='temp'){const t=M.ix(p.x);K.drag=Math.abs(t-K.a)<Math.abs(t-K.b)?'a':'b';setEnd(K.drag,t);return true}
 if(m==='mvt'){K.drag='c';setC(M.ix(p.x));return true}
 if(m==='sign'){const t=M.ix(p.x),i=SINB.reduce((k,s,j)=>Math.abs(s[0]-t)<Math.abs(SINB[k][0]-t)?j:k,0);setB(i);return false}return false}
function move(p){const M=axes();if(K.drag==='h')setH(M.iy(p.y));if(K.drag==='a'||K.drag==='b')setEnd(K.drag,M.ix(p.x));if(K.drag==='c')setC(M.ix(p.x))}
function up(){K.drag=null}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=K.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok++;K.onChange=()=>{};Object.assign(K,{h:1,n:1,seen:{1:1},a:0,b:24,cx:.5,bi:-1,seenB:{},drag:null})};
const steps=[
{h:'Level the line',p:'Think of the area under y = x² as sand. Drag the line until the hill above it would exactly fill the gaps below it.',
 predict:{q:'What is the average value of x² on [0, 3]?',opts:['3','4.5, halfway between 0 and 9','2.25, the value at x = 1.5'],ans:0},task:'Make the hill equal the gaps',
 show:()=>{steps[0].go();later([1.5,2,2.5,3].map(h=>()=>setH(h)),400)},go:()=>{fresh();report();K.onChange=finish(0,()=>K.h===3,'A rectangle of height 3 over width 3 has the same area, 9, as the curve. So f̄ = 9 ÷ 3 = 3.')}},
{h:'Mean of samples',p:'Take equally spaced samples of x² across [0, 3] and find their mean. Double the samples and watch.',
 predict:{q:'As the samples get closer together, their mean…',opts:['settles on 3','settles on 4.5','keeps growing'],ans:0},task:'Go up to 32 samples',
 show:()=>{steps[1].go();later([1,2,3,4,5].map(k=>()=>setN(k)),400)},go:()=>{fresh();report();K.onChange=finish(1,()=>K.n>=32,'The mean of n samples is a Riemann sum ÷ (b − a). As n grows it becomes (1/(b − a)) ∫ f dx.')}},
{h:'Average temperature',p:'A model for a spring day: T = 14 − 6 cos(πt / 12) °C, t in hours after midnight. Drag the two ends of the window.',
 predict:{q:'What is the average temperature from 6 am to 6 pm?',opts:['About 17.8 °C','14 °C, the mean of the two end values','20 °C, the warmest'],ans:0},task:'Set the window to 6 am – 6 pm',
 show:()=>{steps[2].go();later([()=>setEnd('a',3),()=>setEnd('a',6),()=>setEnd('b',20),()=>setEnd('b',18)],450)},go:()=>{fresh();report();K.onChange=finish(2,()=>K.a===6&&K.b===18,'(1/12) ∫₆¹⁸ T dt = 14 + 12/π ≈ 17.82 °C. The ends are both 14 °C, but the warm middle of the day pulls the average up.')}},
{h:'Where f hits f̄',p:'A continuous function takes its average value somewhere in the interval. Slide c to find where x² = 3.',task:'Find c with f(c) = 3',
 show:()=>{steps[3].go();later([1,1.5,1.7,R3].map(x=>()=>setC(x)),400)},go:()=>{fresh();report();K.onChange=finish(3,()=>K.cx===R3,'c² = 3, so c = √3 ≈ 1.73. Only for a straight line is c always the midpoint.')}},
{h:'Negative area',p:'Area below the x-axis counts as negative. Find the average of sin x on [0, b] for each end point.',
 predict:{q:'What is the average value of sin x on [0, 2π]?',opts:['0','2/π','1'],ans:0},task:'Try all three end points',
 show:()=>{steps[4].go();later([0,1,2].map(i=>()=>setB(i)),550)},go:()=>{fresh();report();K.onChange=finish(4,()=>Object.keys(K.seenB).length>=3,'On [0, π] the average is 2/π ≈ 0.637. Over a full period the areas cancel, so the average is 0.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.onChange()});
const QS=[['Average value of x² on [0, 3]?',[['3','ok'],['9','nodiv'],['4.5','ends']]],
 ['Average value of 2x + 1 on [1, 3]?',[['5','ok'],['10','nodiv'],['10/3','width']]],
 ['Average value of eˣ on [0, 1]?',[['e − 1','ok'],['(1 + e) / 2','ends'],['e','nodiv1']]],
 ['Average value of sin x on [0, π]?',[['2/π','ok'],['2','nodiv'],['0','period']]],
 ['Average value of x² on [0, 2]?',[['4/3','ok'],['1','mid'],['8/3','nodiv']]],
 ['A car has velocity v(t) for 0 ≤ t ≤ 10 s and travels 150 m. Its average velocity is…',[['15 m/s','ok'],['150 m/s','nodiv'],['v(5)','mid']]]];
function slip(tag){let m='f̄ = (1/(b − a)) ∫ₐᵇ f(x) dx.';
 if(tag==='nodiv')m='That is the integral itself. Divide by the width b − a to get the average height.';
 if(tag==='nodiv1')m='e is the value at the right end. The integral is e − 1, and the width is 1.';
 if(tag==='ends')m='Averaging the two end values only works for straight lines. Use the integral.';
 if(tag==='width')m='∫₁³ (2x + 1) dx = 10, but divide by the width b − a = 2, not by b = 3. So f̄ = 5.';
 if(tag==='period')m='0 is the average over a full period [0, 2π]. On [0, π] sin x stays positive.';
 if(tag==='mid')m='That is f at the midpoint. For a curve, f(midpoint) is usually not the average.';
 return m}
let qi=-1,run=0;
function pose(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+slip(tag)}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move,up});controls()}});
A.start()})})();
