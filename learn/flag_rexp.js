/* Flagship – rewriting exponential expressions (ages 16–18): tune the monthly factor m so that m¹² = 1.15, compound 1% a
   month for 12 months, read the yearly factor from a doubling law 2^(t/3), sort equivalent forms of 1.15ᵗ, and convert a
   yearly rate to any period. Exponent laws, not dividing the percentage, give the rate for a new period. */
(()=>{
const f4=x=>x.toFixed(4),pc=x=>((x-1)*100).toFixed(2).replace('-','−')+'%';
const FORMS=[['(1.15^(1/12))^(12t)',1,'Power law: (1.15^(1/12))^(12t) = 1.15^(12t/12) = 1.15^t.'],
 ['1.0125^(12t)',0,'1.0125¹² ≈ 1.1608, so this is 16.1% a year. 15 ÷ 12 per month is too big.'],
 ['1.3225^(t/2)',1,'1.15² = 1.3225 and (1.15²)^(t/2) = 1.15^t: the rate per 2 years.'],
 ['1.15^(12t)',0,'This grows by 15% every month: 1.15¹² ≈ 5.35 a year.'],
 ['1.0117^(12t)',1,'1.15^(1/12) ≈ 1.0117, so 1.0117^(12t) ≈ 1.15^t: about 1.17% a month.'],
 ['1.30^(t/2)',0,'15% + 15% = 30% leaves out growth on growth. Over 2 years it is 1.15² = 1.3225.']];
const PER=[['2 years',2],['year',1],['quarter',.25],['month',1/12]];
VIS.reg('flagrexp',c=>{let A,keys,box;const K={};
const stage=()=>['tune','month','dbl','sort','any','quiz'][A.step];
const z=n=>A.narrow?n:Math.round(n*1.12),fnt=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function card(g,r,col,fa,lw){g.save();g.fillStyle=A.alpha(col,fa);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=lw||1.5;g.stroke();g.restore()}
function txt(g,t,x,y,n,col,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
// ---------- step 0: tune the monthly factor ----------
const M0=1,M1=1.02,mX=(r,m)=>r.x+16+(r.w-32)*(m-M0)/(M1-M0);
function drawTune(g,W,H,C){txt(g,'y = 1.15ᵗ  =  m^(12t) ?   Find m',W/2,18,14,C.tx,800);
 const r={x:10,y:36,w:W-20,h:H*.58},yr=(r.h-44)/.2,base=r.y+r.h-8,bw=(r.w-30)/12;card(g,r,C.mu,.05);
 const ty=base-yr*.15-2;g.strokeStyle=C.or;g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(r.x+6,ty);g.lineTo(r.x+r.w-6,ty);g.stroke();g.setLineDash([]);txt(g,'×1.15 target',r.x+10,ty-10,11,C.tx,800,'left');
 for(let i=0;i<12;i++){const v=Math.pow(K.m,i+1),h=Math.min(r.h-34,yr*(v-1)+2);g.fillStyle=A.alpha(i===11?C.ac:C.cy,i===11?.85:.45);g.fillRect(r.x+15+i*bw+2,base-h,bw-4,h)}
 const e=Math.pow(K.m,12);txt(g,`m¹² = ${f4(e)}  (${pc(e)} a year)`,W/2,r.y+16,13,C.tx,800);
 const s={x:10,y:r.y+r.h+10,w:W-20,h:H-r.y-r.h-16};K.track=s;card(g,s,C.vi,.07);const sy=s.y+s.h*.66;
 g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(mX(s,M0),sy);g.lineTo(mX(s,M1),sy);g.stroke();
 A.paint.ball(mX(s,K.m),sy,10,C.ac);txt(g,`m = ${f4(K.m)}  (${pc(K.m)} a month)`,W/2,s.y+14,13,C.tx,800)}
// ---------- step 1: compound 1% a month ----------
function cells(W,H){const cw=(W-20)/6,ch=Math.min(70,H*.2);return Array.from({length:12},(_,i)=>({x:10+(i%6)*cw+3,y:52+Math.floor(i/6)*(ch+8),w:cw-6,h:ch}))}
const ANN=[['1.12ᵗ',0,'12 × 1% = 12% adds the months. Each month also grows last month’s growth.'],['1.1268ᵗ',1,''],['1.01ᵗ',0,'1.01ᵗ is 1% a year. The 12 months must be multiplied together.']];
function drawMonth(g,W,H,C){txt(g,'y = 1.01^(12t) = (1.01¹²)ᵗ',W/2,18,14,C.tx,800);txt(g,`After ${K.n} month${K.n===1?'':'s'}: ×${f4(Math.pow(1.01,K.n))}`,W/2,38,13,C.tx,800);
 const L=cells(W,H);K.cells=L;L.forEach((q,i)=>{const on=i<K.n;card(g,q,on?C.gr:C.mu,on?.25:.06);txt(g,'×1.01',q.x+q.w/2,q.y+q.h*.38,12,C.tx,800);txt(g,'M'+(i+1),q.x+q.w/2,q.y+q.h*.72,10,C.tx,700)});
 K.ann=null;if(K.n<12)return;const y0=L[11].y+L[11].h+16;txt(g,'So y = ?',W/2,y0,13,C.tx,800);const w=(W-20-16)/3;
 K.ann=ANN.map((o,j)=>({x:10+j*(w+8),y:y0+14,w,h:Math.min(56,H-y0-20)}));K.ann.forEach((q,j)=>{const bad=K.miss===j,ok=K.got&&ANN[j][1];card(g,q,ok?C.gr:bad?C.rd:C.cy,.14,bad||ok?3:1.5);txt(g,ANN[j][0],q.x+q.w/2,q.y+q.h/2,15,C.tx,800)})}
// ---------- step 2: doubling law ----------
const gx=(r,t)=>r.x+30+(r.w-44)*t/9,gy=(r,y)=>r.y+r.h-20-(r.h-34)*y/8,dbl=t=>Math.pow(2,t/3);
function drawDbl(g,W,H,C){txt(g,'y = 2^(t/3)   doubles every 3 years',W/2,18,14,C.tx,800);const r={x:10,y:34,w:W-20,h:H-44};K.gr=r;card(g,r,C.mu,.05);
 g.strokeStyle=A.alpha(C.mu,.6);g.lineWidth=1;g.beginPath();g.moveTo(gx(r,0),gy(r,0));g.lineTo(gx(r,9),gy(r,0));g.stroke();
 for(let t=0;t<=9;t++)txt(g,String(t),gx(r,t),gy(r,0)+11,10,C.tx,600);[1,2,4,8].forEach(y=>txt(g,String(y),r.x+16,gy(r,y),10,C.tx,600));
 g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();for(let i=0;i<=90;i++){const t=i/10;i?g.lineTo(gx(r,t),gy(r,dbl(t))):g.moveTo(gx(r,t),gy(r,dbl(t)))}g.stroke();
 K.seen.forEach(t=>{g.fillStyle=C.vi;g.beginPath();g.arc(gx(r,t),gy(r,dbl(t)),6,0,7);g.fill()});
 const X=gx(r,K.t),Y=gy(r,dbl(K.t));g.strokeStyle=A.alpha(C.tx,.4);g.beginPath();g.moveTo(X,r.y+30);g.lineTo(X,gy(r,0));g.stroke();A.paint.ball(X,Y,9,C.or);
 A.paint.label(`t = ${K.t}: y = ${f4(dbl(K.t))}`,Math.min(r.x+r.w-80,Math.max(r.x+80,X)),r.y+16,{font:fnt(12,800),bg:'#1e40af'})}
// ---------- step 3: sort equivalent forms ----------
function sortLay(W,H){const bh=H*.3,bw=(W-28)/2,bins=[{x:10,y:H-bh-6,w:bw,h:bh},{x:18+bw,y:H-bh-6,w:bw,h:bh}],ch=Math.min(48,(H-bh-60)/3-8);
 return{bins,cards:FORMS.map((f,i)=>({x:10+(i%2)*(bw+8),y:34+Math.floor(i/2)*(ch+8),w:bw,h:ch}))}}
function drawSort(g,W,H,C){txt(g,'Which are the same function as 1.15ᵗ?',W/2,16,13,C.tx,800);const L=sortLay(W,H);K.L=L;
 ['Same as 1.15ᵗ','Not the same'].forEach((t,b)=>{const q=L.bins[b];card(g,q,b?C.rd:C.gr,.1);txt(g,t,q.x+q.w/2,q.y+14,12,C.tx,800);
  K.put.map((v,i)=>v===b?i:-1).filter(i=>i>=0).forEach((i,k)=>txt(g,FORMS[i][0],q.x+q.w/2,q.y+32+k*15,11,C.tx,700))});
 L.cards.forEach((q,i)=>{if(K.put[i]>=0)return;const d=K.drag===i+1?K.at:null,r=d?{...q,x:d.x-q.w/2,y:d.y-q.h/2}:q;card(g,r,K.sel===i?C.or:C.cy,.16,K.sel===i?3:1.5);txt(g,FORMS[i][0],r.x+r.w/2,r.y+r.h/2,12,C.tx,800)})}
// ---------- step 4: any period ----------
const fac=()=>Math.pow(1+K.R/100,PER[K.P][1]),per=()=>PER[K.P][1];
function expo(){const p=per();return p===1?'t':p>1?'t/'+p:Math.round(1/p)+'t'}
function drawAny(g,W,H,C){const a=1+K.R/100;txt(g,`${K.R}% a year:  y = ${a.toFixed(2)}ᵗ`,W/2,18,15,C.tx,800);
 const s={x:10,y:32,w:W-20,h:44};K.track=s;card(g,s,C.vi,.07);const rx=R=>s.x+16+(s.w-32)*(R+20)/60;g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(rx(-20),s.y+30);g.lineTo(rx(40),s.y+30);g.stroke();
 [-20,0,20,40].forEach(R=>txt(g,R+'%',rx(R),s.y+12,10,C.tx,700));A.paint.ball(rx(K.R),s.y+30,10,C.ac);
 const f=fac(),y0=s.y+s.h+30;txt(g,`= ${f4(f)}^(${expo()})`,W/2,y0,18,C.tx,800);txt(g,`${pc(f)} per ${PER[K.P][0]}`,W/2,y0+28,15,C.tx,800);
 const naive=K.R*per();txt(g,`Not ${naive.toFixed(2).replace('-','−')}%: that ${per()>1?'multiplies':'divides'} the rate, not the factor.`,W/2,y0+52,11,C.tx,700);
 const r={x:10,y:y0+70,w:W-20,h:H-y0-76};card(g,r,C.mu,.05);const e4=Math.pow(a,4),lo=Math.min(1,e4),hi=Math.max(1,e4)+.01,px=t=>r.x+12+(r.w-24)*t/4,py=y=>r.y+r.h-10-(r.h-34)*(y-lo)/(hi-lo);
 g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();for(let i=0;i<=80;i++){const t=i/20;i?g.lineTo(px(t),py(Math.pow(a,t))):g.moveTo(px(t),py(Math.pow(a,t)))}g.stroke();
 g.fillStyle=C.or;for(let k=0;k*per()<=4.0001;k++){g.beginPath();g.arc(px(k*per()),py(Math.pow(f,k)),4,0,7);g.fill()}txt(g,'same curve; dots every '+PER[K.P][0],r.x+r.w/2,r.y+12,11,C.tx,700)}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.3);g.fillRect(0,0,W,H);const m=stage();
 if(m==='quiz')return txt(g,'aᵗ = (a^(1/n))^(nt)',W/2,H/2,22,C.tx,800);({tune:drawTune,month:drawMonth,dbl:drawDbl,sort:drawSort,any:drawAny})[m](g,W,H,C);A.fx.draw(g)}
// ---------- actions ----------
function setM(m){K.m=Math.max(M0,Math.min(M1,Math.round(m*1e4)/1e4));const e=Math.pow(K.m,12);
 say(Math.abs(K.m-1.0125)<2e-4?'15 ÷ 12 = 1.25% a month overshoots: 1.0125¹² ≈ 1.1608, 16.1% a year.':Math.abs(e-1.15)<.004?`m¹² ≈ 1.15. So 1.15ᵗ ≈ ${f4(K.m)}^(12t).`:e<1.15?'Too small: the year ends below 1.15.':'Too big: the year ends above 1.15.')}
function month(){if(K.n>=12)return;K.n++;A.sound.pop();say(K.n===12?`12 months: 1.01¹² = ${f4(Math.pow(1.01,12))}. Pick the yearly form.`:'')}
function ann(j){if(K.got)return;if(ANN[j][1]){K.got=1;K.miss=-1;A.sound.pop();return say('Yes: 1.01^(12t) = 1.1268ᵗ, 12.68% a year, not 12%.')}K.miss=j;A.sound.miss();say(ANN[j][2])}
function setT(t){K.t=Math.max(0,Math.min(9,t));if([1,3,6].includes(K.t)&&!K.seen.includes(K.t)){K.seen.push(K.t);A.sound.pop()}
 say(K.t===1?'After 1 year: ×1.26. So 2^(t/3) = (2^(1/3))ᵗ ≈ 1.26ᵗ, 26% a year.':K.t===3?'After 3 years: ×2, as the law says.':K.t===6?'After 6 years: ×4, doubled twice.':'')}
function place(i,b){if(i==null||K.put[i]>=0)return;const ok=FORMS[i][1]===(b===0?1:0);K.sel=null;
 if(ok){K.put[i]=b;A.sound.pop();say(FORMS[i][2])}else{A.sound.miss();say((b===0?'Not the same. ':'Check again: it is the same. ')+FORMS[i][2])}}
function setR(R){K.R=Math.max(-20,Math.min(40,Math.round(R)));say()}
function setP(P){K.P=P;say()}
// ---------- live text and buttons ----------
function say(msg){const m=stage();let t='';
 if(m==='tune')t=`m = ${f4(K.m)}, m¹² = ${f4(Math.pow(K.m,12))}.`;if(m==='month')t=`${K.n} of 12 months.`;if(m==='dbl')t=`t = ${K.t}, y = ${f4(dbl(K.t))}.`;
 if(m==='sort'){const i=K.put.indexOf(-1);t=i<0?'All sorted.':`Next: ${FORMS[i][0]}.`}if(m==='any')t=`${K.R}% a year = ${pc(fac())} per ${PER[K.P][0]}.`;
 speak((msg?msg+' ':'')+t);buttons();K.onChange()}
function buttons(){if(!A||!keys)return;keys.innerHTML='';const m=stage(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
 if(m==='tune'){add('− 0.0005',()=>setM(K.m-.0005),'Smaller monthly factor');add('− 0.0001',()=>setM(K.m-.0001),'Slightly smaller');add('+ 0.0001',()=>setM(K.m+.0001),'Slightly bigger');add('+ 0.0005',()=>setM(K.m+.0005),'Bigger monthly factor')}
 if(m==='month'){if(K.n<12)add('Next month ×1.01',month);else if(!K.got)ANN.forEach((o,j)=>add(o[0],()=>ann(j),'y = '+o[0]))}
 if(m==='dbl'){add('◀ t − 1',()=>setT(K.t-1),'One year earlier');add('t + 1 ▶',()=>setT(K.t+1),'One year later')}
 if(m==='sort'){const i=K.put.indexOf(-1);if(i>=0){add('✓ Same',()=>place(i,0),`${FORMS[i][0]} is the same as 1.15 to the t`);add('✗ Not the same',()=>place(i,1),`${FORMS[i][0]} is not the same`)}}
 if(m==='any'){add('− 1%',()=>setR(K.R-1),'Lower yearly rate');add('+ 1%',()=>setR(K.R+1),'Higher yearly rate');PER.forEach((p,j)=>add('per '+p[0],()=>setP(j),'Rate per '+p[0]))}A.redraw()}
// ---------- canvas input ----------
function down(p){const m=stage();
 if(m==='tune'||m==='any'){if(!inR(p,K.track))return false;K.drag='t';move(p);return true}
 if(m==='month'){if(K.ann){const j=K.ann.findIndex(q=>inR(p,q));if(j>=0)ann(j);return false}const i=(K.cells||[]).findIndex(q=>inR(p,q));if(i>=K.n)month();if(i>=0){K.drag='m';return true}return false}
 if(m==='dbl'){if(!inR(p,K.gr))return false;K.drag='g';move(p);return true}
 if(m==='sort'){const L=K.L,i=L.cards.findIndex((q,i)=>K.put[i]<0&&inR(p,q));if(i>=0){K.drag=i+1;K.at=p;K.sel=i;A.redraw();return true}
  const b=L.bins.findIndex(q=>inR(p,q));if(b>=0&&K.sel!=null)place(K.sel,b);return false}return false}
function move(p){const m=stage(),s=K.track;if(K.drag==='t'&&m==='tune')setM(M0+(M1-M0)*(p.x-s.x-16)/(s.w-32));
 else if(K.drag==='t'&&m==='any')setR(-20+60*(p.x-s.x-16)/(s.w-32));
 else if(K.drag==='m'){const i=K.cells.findIndex(q=>inR(p,q));if(i===K.n)month()}
 else if(K.drag==='g'){const t=Math.round((p.x-K.gr.x-30)/(K.gr.w-44)*9);if(t!==K.t)setT(t)}
 else if(typeof K.drag==='number'&&K.drag>0){K.at=p;A.redraw()}}
function up(){if(typeof K.drag==='number'&&K.drag>0){const i=K.drag-1,b=K.L.bins.findIndex(q=>inR(K.at,q));K.drag=0;if(b>=0)place(i,b);else A.redraw()}K.drag=0}
// ---------- steps ----------
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=K.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok=(K.tok||0)+1;Object.assign(K,{onChange:()=>{},m:1.005,n:0,got:0,miss:-1,t:0,seen:[],put:FORMS.map(()=>-1),sel:null,drag:0,R:20,P:1,ann:null})};
const steps=[
 {h:'Annual to monthly',p:'1.15ᵗ grows 15% a year. Write it as m^(12t): a factor m used 12 times a year. Drag the slider until 12 months of m make ×1.15.',
  predict:{q:'15% a year. What is the monthly rate?',opts:['15 ÷ 12 = 1.25%','A bit less than 1.25%'],ans:1},task:'Make m¹² = 1.15',
  show:()=>{steps[0].go();later([()=>setM(1.0125),()=>setM(1.012),()=>setM(1.0117)],700)},go:()=>{fresh();say();K.onChange=check(0,()=>Math.abs(Math.pow(K.m,12)-1.15)<.004,'m = 1.15^(1/12) ≈ 1.0117, so 1.15ᵗ = (1.15^(1/12))^(12t) ≈ 1.0117^(12t): about 1.17% a month.')}},
 {h:'Monthly to annual',p:'Now go the other way. 1.01^(12t) grows 1% a month. Tap each month to multiply by 1.01, then choose the yearly form.',
  predict:{q:'1% a month for 12 months. The yearly growth is…',opts:['Exactly 12%','A bit more than 12%'],ans:1},task:'Compound 12 months, then pick the yearly form',
  show:()=>{steps[1].go();later([...Array(12).fill(month),()=>ann(1)],300)},go:()=>{fresh();say();K.onChange=check(1,()=>K.got,'(1.01¹²)ᵗ = 1.1268ᵗ: 12.68% a year. Growth on growth adds the extra 0.68%.')}},
 {h:'Doubling time',p:'y = 2^(t/3) doubles every 3 years. Drag along the curve to see the factor after 1, 3 and 6 years.',
  predict:{q:'y = 2^(t/3). What is the growth rate per year?',opts:['2 ÷ 3, about 67%','2^(1/3) ≈ 1.26, so 26%'],ans:1},task:'Visit t = 1, 3 and 6',
  show:()=>{steps[2].go();later([()=>setT(1),()=>setT(3),()=>setT(6)],600)},go:()=>{fresh();say();K.onChange=check(2,()=>K.seen.length>=3,'2^(t/3) = (2^(1/3))ᵗ ≈ 1.26ᵗ. The exponent law turns a doubling time into a yearly rate.')}},
 {h:'Same function?',p:'Drag each form into a box, or tap it then a box. A form only counts as the same if its graph is the same as 1.15ᵗ.',
  predict:{q:'Is 1.0125^(12t) the same as 1.15ᵗ?',opts:['Yes: 15% ÷ 12 a month','No: it is about 1.161ᵗ'],ans:1},task:'Sort all 6 forms',
  show:()=>{steps[3].go();later(FORMS.map((f,i)=>()=>place(i,f[1]?0:1)),450)},go:()=>{fresh();say();K.onChange=check(3,()=>K.put.every(x=>x>=0),'Rewrite with exponent laws: aᵗ = (a^(1/n))^(nt) = (aᵏ)^(t/k).')}},
 {h:'Any period',p:'Set a yearly rate and choose a period. The curve does not change; only the factor and the exponent do.',
  predict:{q:'20% a year. What is the growth over 2 years?',opts:['20% + 20% = 40%','1.2² = 1.44, so 44%'],ans:1},task:'Find the quarterly rate for 20% a year',
  show:()=>{steps[4].go();later([()=>setR(20),()=>setP(0),()=>setP(2)],600)},go:()=>{fresh();K.R=10;say();K.onChange=check(4,()=>K.R===20&&K.P===2,'1.2ᵗ = (1.2^(1/4))^(4t) ≈ 1.0466^(4t): 4.66% a quarter, not 5%.')}},
 {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>K.onChange()});
// ---------- challenge ----------
const RS=[15,8,20,12,6],MS=[1,2,.5,1.5],KS=[3,4,5,6,10];let qn=-1,run=0;
const p2=x=>(x*100).toFixed(2)+'%';
function make(i,kind){const R=RS[i%RS.length]/100,r=MS[i%MS.length]/100,k=KS[i%KS.length];
 if(kind===0)return[`y = ${(1+R).toFixed(2)}ᵗ, t in years. What is the monthly rate?`,[[p2(Math.pow(1+R,1/12)-1),'ok'],[p2(R/12),'div'],[p2(R),'same']]];
 if(kind===1)return[`y = ${(1+r).toFixed(3)}^(12t), t in years. What is the yearly rate?`,[[p2(Math.pow(1+r,12)-1),'ok'],[p2(12*r),'mul'],[p2(r),'same']]];
 if(kind===2)return[`y = 2^(t/${k}), t in years. What is the yearly rate?`,[[p2(Math.pow(2,1/k)-1),'ok'],[p2(1/k),'div'],['200%','exp']]];
 return[`y = ${(1+R).toFixed(2)}ᵗ. What is the rate over 2 years?`,[[p2(Math.pow(1+R,2)-1),'ok'],[p2(2*R),'add'],[p2(R*R),'sq']]]}
function slip(t){let m='Rewrite the exponent, then read the factor.';
 if(t==='div')m='Dividing the rate ignores compounding. Take the root of the factor: a^(1/n).';
 if(t==='mul')m='Multiplying the rate misses growth on growth. Raise the factor to the power: aⁿ.';
 if(t==='same')m='The period changed, so the rate must change too. Use the exponent law.';
 if(t==='exp')m='2 is the factor over the whole doubling time. Per year it is 2^(1/k).';
 if(t==='add')m='Adding the rate twice misses growth on growth. Square the factor: (1 + r)².';
 if(t==='sq')m='Square the factor 1 + r, not the rate r on its own.';return m}
function ask(){qn++;const[text,ops]=make(qn,qn%4),sh=qn%3;
 box.innerHTML=`<p><b>${text}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+text);A.redraw()}
function mark(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?`✓ Correct. Streak: ${run}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.35,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Controls'},w);box=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
