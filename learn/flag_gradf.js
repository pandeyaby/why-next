/* Flagship – sketching the gradient function (16–18): drag along f and watch each tangent gradient drop onto the f′ axes,
   turn turning points into zeros of f′, read uphill/downhill as the sign of f′ (not the sign of f), sketch f′ yourself with
   handles, then match graphs of f to graphs of f′. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',X0=-2.2,X1=2.2,HX=[-2,-1,0,1,2],fm=v=>{v=M.round(v*100)/100;return(v<0?'−':'')+M.abs(v)};
 const FN={cub:{n:'Hill and valley',f:x=>(x*x*x-3*x)/2,d:x=>1.5*x*x-1.5,fy:[-2.4,2.4],dy:[-2.5,6.5]},
  hill:{n:'One hill',f:x=>1-x*x/2,d:x=>-x,fy:[-1.8,1.4],dy:[-2.6,2.6]},
  w:{n:'W shape',f:x=>x**4/4-x*x,d:x=>x**3-2*x,fy:[-1.4,1.4],dy:[-7,7]},
  wave:{n:'Wave',f:x=>M.sin(1.5*x),d:x=>1.5*M.cos(1.5*x),fy:[-1.4,1.4],dy:[-2,2]}};
 const IV=[[X0,-1],[-1,1],[1,X1]],SG=[1,-1,1],RM=[['hill',['ok','flip','copy']],['cub',['copy','ok','flip']],['w',['flip','few','ok']]];
 const CAND={ok:K=>K.d,flip:K=>x=>-K.d(x),copy:K=>K.f,few:()=>x=>1.5*x*x-1.5};
 const MFB={flip:'Every sign is the wrong way round. Where f climbs, f′ must be above the axis.',copy:'That is f again. f′ shows the slope of f, not its shape.',few:'f has three turning points, so f′ needs three zeros. That curve has only two.'};
 const FBQ={pos:'At a maximum the tangent is flat, so the gradient is 0, not positive.',fneg:'The sign of f does not matter. Going down means a negative gradient wherever the curve is.',
  line:'A straight line has at most one zero, but f has two turning points, so f′ needs two zeros.',copy2:'f′ is not a copy of f. The slope of x² is 2x: a straight line.',
  fneg2:'x² is never negative, but its slope is: for x < 0 the curve goes down, so f′ < 0.',zero:'f′ = 0 only where f is flat. The steepest climb is where f′ is biggest.',
  neg:'f is climbing at x = 0, so f′ is positive there.',flip:'Positive gradient, then negative, is up then down: a hill, so a maximum.',
  height2:'f′ changing sign tells you about a turning point of f, not where f crosses the axis.',origin:'f′ = 0 wherever f is flat, at each turning point, not at the origin.'};
 const CQ=[['f has a maximum at x = 2. What is f′(2)?',[['0','ok'],['The maximum value of f','height'],['A positive number','pos']]],
  ['Where f is decreasing, the graph of f′ is…',[['below the x-axis','ok'],['sloping downwards','shape'],['below the axis only where f is negative','fneg']]],
  ['f is a cubic with a hill and a valley. f′ is…',[['a parabola that crosses the x-axis twice','ok'],['another cubic','copy'],['a straight line','line']]],
  ['f(x) = x². Which describes the graph of f′?',[['A straight line through the origin','ok'],['A U-shape, like f','copy2'],['Always above the x-axis, since x² ≥ 0','fneg2']]],
  ['f climbs most steeply at x = 0 and is not flat there. On the graph of f′, x = 0 is…',[['a maximum of f′','ok'],['a zero of f′','zero'],['where f′ is negative','neg']]],
  ['f′ is above the x-axis for x < 3 and below it for x > 3. What does f do at x = 3?',[['f has a maximum','ok'],['f has a minimum','flip'],['f crosses the x-axis','height2']]]];
VIS.reg('flaggradf',c=>{let A,pad,chal,read;
 const G={k:'cub',px:-2,seen:new Set(),trail:[],zs:[],bad:null,sg:[0,0,0],si:0,hv:[2,2,2,2,2],hi:0,sk:0,mr:0,mg:0,mp:-1,mok:0,cv:0,miss:'',gen:0,check:()=>{},drag:0,Q:null};
 const mode=()=>['trace','zero','sign','sketch','match','free','quiz'][A.step];
 const key=()=>{const m=mode();return m==='sketch'?'w':m==='match'?RM[G.mr%3][0]:m==='free'?G.k:'cub'};
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?70:58,gap=24,ph=(H-top-gap-22)/2;return{W,H,N,l:N?14:28,r:W-14,t1:top,b1:top+ph,t2:top+ph+gap,b2:top+2*ph+gap}}
 const sx=(x,g)=>g.l+(x-X0)/(X1-X0)*(g.r-g.l),ix=(p,g)=>X0+(p-g.l)/(g.r-g.l)*(X1-X0);
 const sy=(y,yr,t,b)=>b-(y-yr[0])/(yr[1]-yr[0])*(b-t),iy=(p,yr,t,b)=>yr[0]+(b-p)/(b-t)*(yr[1]-yr[0]);
 function box(x,C,g,t,b,yr,lab,l=g.l,r=g.r){x.fillStyle=A.alpha(C.tx,.04);x.fillRect(l,t,r-l,b-t);const y0=sy(0,yr,t,b),x0=l+(-X0)/(X1-X0)*(r-l);
  x.strokeStyle=A.alpha(C.mu,.6);x.lineWidth=1;x.beginPath();x.moveTo(l,y0);x.lineTo(r,y0);x.moveTo(x0,t);x.lineTo(x0,b);x.stroke();
  if(r-l>200){x.fillStyle=C.mu;x.font=F(600,11);x.textAlign='center';HX.forEach(v=>{const p=l+(v-X0)/(X1-X0)*(r-l);x.fillRect(p-.5,y0-3,1,6);if(v)x.fillText(fm(v),p,M.min(b-3,y0+14))})}
  if(lab){x.fillStyle=C.tx;x.font=F(800,13);x.textAlign='left';x.fillText(lab,l+5,t+15)}}
 function curve(x,fn,yr,t,b,l,r,col,lw,dash){x.save();x.beginPath();x.rect(l,t,r-l,b-t);x.clip();x.strokeStyle=col;x.lineWidth=lw||3;x.setLineDash(dash||[]);x.beginPath();
  for(let i=0;i<=96;i++){const u=X0+(X1-X0)*i/96,px=l+(u-X0)/(X1-X0)*(r-l),py=sy(fn(u),yr,t,b);i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.restore()}
 function top(x,C,g,K){box(x,C,g,g.t1,g.b1,K.fy,'f(x)');curve(x,K.f,K.fy,g.t1,g.b1,g.l,g.r,C.cy,3.2)}
 function bot(x,C,g,K,lab){box(x,C,g,g.t2,g.b2,K.dy,lab||'f′(x)')}
 function tangent(x,C,g,K,u){const y=K.f(u),d=K.d(u),px=sx(u,g),py=sy(y,K.fy,g.t1,g.b1);x.save();x.beginPath();x.rect(g.l,g.t1,g.r-g.l,g.b1-g.t1);x.clip();
  x.strokeStyle=d>.05?C.gr:d<-.05?C.or:C.vi;x.lineWidth=2.5;x.beginPath();x.moveTo(sx(u-.7,g),sy(y-.7*d,K.fy,g.t1,g.b1));x.lineTo(sx(u+.7,g),sy(y+.7*d,K.fy,g.t1,g.b1));x.stroke();x.restore();
  A.paint.ball(px,py,10,C.vi);const q=sy(d,K.dy,g.t2,g.b2);x.strokeStyle=A.alpha(C.mu,.7);x.setLineDash([4,4]);x.lineWidth=1;x.beginPath();x.moveTo(px,py);x.lineTo(px,M.max(g.t2,M.min(g.b2,q)));x.stroke();x.setLineDash([]);
  if(q>=g.t2&&q<=g.b2)A.paint.ball(px,q,8,C.pk);A.paint.label('gradient '+fm(d),px,g.t1+12>py-22?py+24:py-22,{bg:A.alpha(C.tx,.75),col:C.pn})}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode(),K=FN[key()];x.fillStyle=A.mix(C.pn,C.cy,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='match')return drawMatch(x,C,g,K);top(x,C,g,K);bot(x,C,g,K);
  if(m==='trace'||m==='free'||m==='quiz'){if(m==='free'&&G.cv||m==='quiz')curve(x,K.d,K.dy,g.t2,g.b2,g.l,g.r,C.pk,2.5,[6,4]);x.fillStyle=C.pk;G.trail.forEach(u=>{const q=sy(K.d(u),K.dy,g.t2,g.b2);if(q>=g.t2&&q<=g.b2){x.beginPath();x.arc(sx(u,g),q,3.5,0,7);x.fill()}});if(m!=='quiz')tangent(x,C,g,K,G.px)}
  if(m==='zero'){const y0=sy(0,K.dy,g.t2,g.b2);G.zs.forEach(u=>{const px=sx(u,g);x.strokeStyle=C.gr;x.setLineDash([4,4]);x.beginPath();x.moveTo(px,sy(K.f(u),K.fy,g.t1,g.b1));x.lineTo(px,y0);x.stroke();x.setLineDash([]);A.paint.ball(px,y0,9,C.gr)});
   if(G.bad!=null){x.strokeStyle=C.rd;x.lineWidth=3;x.beginPath();x.arc(sx(G.bad,g),y0,11,0,7);x.stroke()}}
  if(m==='sign'){const y0=sy(0,K.dy,g.t2,g.b2);IV.forEach((v,i)=>{const a=sx(v[0],g),b=sx(v[1],g),s=G.sg[i];if(s){x.fillStyle=A.alpha(s>0?C.gr:C.or,.25);x.fillRect(a,s>0?g.t2:y0,b-a,s>0?y0-g.t2:g.b2-y0)}
   if(i===G.si&&!s){x.strokeStyle=C.vi;x.lineWidth=2.5;x.strokeRect(a+2,g.t2+2,b-a-4,g.b2-g.t2-4)}x.fillStyle=C.tx;x.font=F(800,22);x.textAlign='center';x.fillText(s>0?'+':s<0?'−':'?',(a+b)/2,s<0?(y0+g.b2)/2+8:(g.t2+y0)/2+8)})}
  if(m==='sketch'){if(G.sk)curve(x,K.d,K.dy,g.t2,g.b2,g.l,g.r,C.pk,2.5,[6,4]);x.strokeStyle=C.vi;x.lineWidth=2;x.beginPath();HX.forEach((u,i)=>{const p=sx(u,g),q=sy(G.hv[i],K.dy,g.t2,g.b2);i?x.lineTo(p,q):x.moveTo(p,q)});x.stroke();
   HX.forEach((u,i)=>{const p=sx(u,g),q=sy(G.hv[i],K.dy,g.t2,g.b2);if(i===G.hi){x.strokeStyle=C.am;x.lineWidth=3;x.beginPath();x.arc(p,q,15,0,7);x.stroke()}A.paint.ball(p,q,10,G.sk?C.gr:C.vi)})}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,g.N?44:44,g.W-24,15);A.fx.draw(x)}
 function mini(i,g){const w=(g.r-g.l-16)/3,l=g.l+i*(w+8);return{l,r:l+w}}
 function drawMatch(x,C,g,K){top(x,C,g,K);const R=RM[G.mr%3];R[1].forEach((tg,i)=>{const fn=CAND[tg](K),{l,r}=mini(i,g);let lo=1e9,hi=-1e9;for(let j=0;j<=40;j++){const v=fn(X0+(X1-X0)*j/40);lo=M.min(lo,v);hi=M.max(hi,v)}
   const pd=(hi-lo)*.15+.2,yr=[M.min(lo-pd,-.5),M.max(hi+pd,.5)],on=G.mp===i;box(x,C,g,g.t2,g.b2,yr,'ABC'[i],l,r);curve(x,fn,yr,g.t2,g.b2,l,r,on?(G.mok?C.gr:C.rd):C.pk,on?3.5:2.5);
   if(on){x.strokeStyle=G.mok?C.gr:C.rd;x.lineWidth=3;x.strokeRect(l+1,g.t2+1,r-l-2,g.b2-g.t2-2)}});
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,44,g.W-24,15);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function head(){const m=mode(),K=FN[key()];if(m==='trace'||m==='free')return`x = ${fm(G.px)}: f is ${K.d(G.px)>.05?'going up':K.d(G.px)<-.05?'going down':'flat'}, gradient ${fm(K.d(G.px))}`;
  if(m==='zero')return`Zeros of f′ marked: ${G.zs.length} of 2`;if(m==='sign')return G.si<3?`Part ${G.si+1} of 3: is f′ above (+) or below (−) the axis?`:'All three parts signed';
  if(m==='sketch')return G.sk?'Your sketch of f′ matches':`Point at x = ${fm(HX[G.hi])}: f′ = ${fm(G.hv[G.hi])}`;if(m==='match')return G.mg>=3?'All three graphs matched':`Graph ${G.mr%3+1} of 3: which is f′?`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='trace')return`Bins visited: ${G.seen.size} of 12. Each pink dot is the gradient at that x.`;if(m==='zero')return'Tap the f′ axis where f is flat.';
  if(m==='sign')return'Tap above or below the axis in the boxed part.';if(m==='sketch')return'Drag each point to the gradient of f at that x, then Check.';if(m==='match')return'Tap A, B or C.';if(m==='free')return'Pick a graph. Drag along it.';return''}
 function tell(msg){const s=(msg?msg+' ':'')+head()+'. '+sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 const clampX=u=>M.max(X0,M.min(X1,u));
 function setPx(u,quiet){G.px=clampX(u);G.trail.push(G.px);if(G.trail.length>140)G.trail.shift();G.seen.add(M.min(11,M.floor((G.px-X0)/(X1-X0)*12)));if(quiet)A.redraw();else{A.sound.tick();tell('')}}
 function markZ(u){u=M.round(u);if(G.zs.includes(u))return;const d=FN.cub.d(u);if(M.abs(d)<1e-9){G.zs.push(u);G.bad=null;G.miss='';A.sound.pop();tell(`Yes: f is flat at x = ${u}, so f′(${u}) = 0.`)}
  else{G.bad=u;G.miss=`At x = ${fm(u)} f is going ${d>0?'up':'down'}, not flat, so f′ is ${d>0?'above':'below'} the axis there (${fm(d)}).`;A.sound.miss();tell(G.miss)}}
 function setSign(i,s){if(G.sg[i])return;G.si=i;if(s===SG[i]){G.sg[i]=s;G.miss='';G.si=G.sg.indexOf(0);if(G.si<0)G.si=3;A.sound.pop();tell(`Right: f goes ${s>0?'up':'down'} there, so f′ is ${s>0?'positive':'negative'}.`);return}
  let m;if(i===1)m='f goes down from x = −1 to x = 1, so f′ is below the axis, even where f is above it.';else if(i===0)m=`f is below the axis there, but it is climbing, so f′ is positive. f′ shows the slope, not the height.`;else m='f climbs after x = 1, so its gradient is positive.';
  G.miss=m;A.sound.miss();tell(m)}
 function nudge(dv){if(G.sk)return;G.hv[G.hi]=M.max(-6.5,M.min(6.5,G.hv[G.hi]+dv));G.miss='';A.sound.tick();tell('')}
 function pickH(di){G.hi=(G.hi+di+5)%5;tell('')}
 function checkSketch(){const K=FN.w,i=HX.findIndex((u,j)=>M.abs(G.hv[j]-K.d(u))>.3);let m;if(i<0){G.sk=1;G.miss='';A.sound.pop();return tell('Every point sits on f′. The dashed curve is the true f′(x) = x³ − 2x.')}
  const u=HX[i],t=K.d(u),v=G.hv[i];G.hi=i;if(t===0)m=`At x = ${fm(u)} f has a turning point. The tangent is flat, so f′ = 0 there.`;else if(M.sign(v)!==M.sign(t))m=`At x = ${fm(u)} f is going ${t>0?'up':'down'}, so f′ must be ${t>0?'above':'below'} the axis.`;
  else m=`Right side of the axis at x = ${fm(u)}, but f is ${M.abs(v)<M.abs(t)?'steeper':'less steep'} there. Its tangent gradient is ${fm(t)}.`;G.miss=m;A.sound.miss();tell(m)}
 function pickM(i){if(G.mok||G.mg>=3)return;const tg=RM[G.mr%3][1][i];G.mp=i;if(tg==='ok'){G.mok=1;G.mg++;G.miss='';A.sound.pop();tell(`Yes: ${'ABC'[i]} is above the axis where f climbs and zero at each turning point.`)}else{G.mok=0;G.miss=MFB[tg];A.sound.miss();tell(G.miss)}}
 function nextM(){G.mr++;G.mp=-1;G.mok=0;G.miss='';tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='trace'||k==='free'){b('◀ Left',()=>setPx(G.px-.4),'Move the point left');b('Right ▶',()=>setPx(G.px+.4),'Move the point right')}
  if(k==='free'){Object.keys(FN).forEach(n=>b(FN[n].n,()=>{G.k=n;G.trail=[];tell('')}));b(G.cv?'Hide f′':'Show f′',()=>{G.cv=!G.cv;tell('')})}
  if(k==='zero')HX.forEach(u=>b('x = '+fm(u),()=>markZ(u),'Mark f′ = 0 at x = '+fm(u)));
  if(k==='sign'&&G.si<3){b('+ above',()=>setSign(G.si,1),'Part '+(G.si+1)+': f′ above the axis');b('− below',()=>setSign(G.si,-1),'Part '+(G.si+1)+': f′ below the axis')}
  if(k==='sketch'&&!G.sk){b('◀ Point',()=>pickH(-1),'Previous point');b('Point ▶',()=>pickH(1),'Next point');b('Up',()=>nudge(.5),'Raise this point by 0.5');b('Down',()=>nudge(-.5),'Lower this point by 0.5');b('Check',checkSketch)}
  if(k==='match'&&G.mg<3){if(G.mok)b('Next graph',nextM);else[0,1,2].forEach(i=>b('ABC'[i],()=>pickM(i),'Graph '+'ABC'[i]))}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{px:-2,seen:new Set(),trail:[],zs:[],bad:null,sg:[0,0,0],si:0,hv:[2,2,2,2,2],hi:0,sk:0,mr:0,mg:0,mp:-1,mok:0,miss:'',drag:0},o||{})};
 const steps=[
  {h:'Gradient at every point',p:'The tangent shows the gradient of f at the purple point. Its value is plotted as a pink dot on the f′ axes below.',
   predict:{q:'At the top of a hill on the graph of f, what is the gradient?',opts:['As big as it gets','Zero','Negative'],ans:1},
   task:'Drag the point from one end of f to the other',show:()=>play(Array.from({length:12},(_,j)=>()=>setPx(X0+.2+j*.37)),160),
   go:()=>{reset();G.check=when(0,()=>G.seen.size>=10,()=>'The dots trace a U: f′ is positive while f climbs, 0 at the hill and the valley, negative in between.')}},
  {h:'Turning points become zeros',p:'Where f is flat, its gradient is 0. So each turning point of f gives a point where f′ meets the x-axis.',
   predict:{q:'f has a maximum at (−1, 1). Where does the graph of f′ meet the x-axis?',opts:['At x = −1','At height 1','At x = 0'],ans:0},
   task:'Mark both zeros of f′',show:()=>play([()=>markZ(-1),()=>markZ(1)],600),go:()=>{reset();G.check=when(1,()=>G.zs.length>=2,()=>'Same x as each turning point. The height of the turning point plays no part.')}},
  {h:'Up means positive',p:'Between the zeros, f′ keeps one sign. Uphill gives f′ > 0, downhill gives f′ < 0, wherever f itself is.',
   predict:{q:'Just right of x = −1, f is above the x-axis but going down. What sign is f′ there?',opts:['Positive: f is above the axis','Negative: f is going down'],ans:1},
   task:'Sign f′ in all three parts',show:()=>play([()=>setSign(0,1),()=>setSign(1,-1),()=>setSign(2,1)],600),go:()=>{reset();G.check=when(2,()=>G.sg.every(s=>s),()=>'+ then − then +. f′ copies the slope of f, never its height.')}},
  {h:'Sketch f′ yourself',p:'This W-shaped f has three turning points. Drag each point to the gradient of f at that x. Steeper means further from the axis.',
   task:'Get all five points onto f′',show:()=>{G.hv=HX.map(u=>FN.w.d(u));G.hi=4;checkSketch()},go:()=>{reset();G.check=when(3,()=>G.sk,()=>'Three turning points gave three zeros, and the steep ends gave large values.')}},
  {h:'Match f to f′',p:'For each f, pick the graph of its gradient. Check the zeros first, then the signs.',
   predict:{q:'f is a cubic with a hill and a valley. What shape is f′?',opts:['Another cubic','A U-shaped parabola','A straight line'],ans:1},
   task:'Match all three graphs',show:()=>play([()=>pickM(0),nextM,()=>pickM(1),nextM,()=>pickM(2)],500),go:()=>{reset();G.check=when(4,()=>G.mg>=3,()=>'One hill gave a line, a cubic gave a parabola and the W gave a cubic: one power lower each time.')}},
  {h:'Sandbox',p:'Pick any graph and drag along it. Show f′ to check your reading. The wave gives a curve shaped like cosine.',go:()=>reset({cv:0})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;let t,opts;if(qi%2===0){const a=-(qi/2%3)-1,b=a+2+qi/2%2;t=`f has turning points at x = ${a} and x = ${b}. Where is f′ = 0?`;opts=[[`x = ${a} and x = ${b}`,'ok'],['At the heights of the two turning points','height'],['Only at x = 0','origin']];G.Q={t,a:` f is flat at both turning points, so f′(${a}) = f′(${b}) = 0.`}}
  else{const Q=CQ[((qi-1)/2)%CQ.length];t=Q[0];opts=Q[1].slice();G.Q={t}}const r=qi%3;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});G.miss='';tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='height')m='f′ records the slope, not the height. At a turning point the slope is 0.';else if(o[1]==='shape')m=`f′ sloping down would mean f′ is decreasing. f decreasing means f′ is negative: below the axis.`;
  else if(o[1]==='copy')m='Differentiating lowers the power by one: a cubic gives a quadratic, not another cubic.';else if(!ok)m=FBQ[o[1]];
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m+(G.Q.a||'');A.cv.setAttribute('aria-label',s);
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();if(m==='trace'||m==='free'){if(p.y<g.b1+8){setPx(ix(p.x,g),1);return true}return false}
  if(m==='zero'&&p.y>g.t1){markZ(ix(p.x,g));return false}
  if(m==='sign'&&p.y>g.t2){const u=ix(p.x,g),i=u<-1?0:u<1?1:2,y0=sy(0,FN.cub.dy,g.t2,g.b2);setSign(i,p.y<y0?1:-1);return false}
  if(m==='sketch'&&p.y>g.t2-10&&!G.sk){let i=0;HX.forEach((u,j)=>{if(M.abs(sx(u,g)-p.x)<M.abs(sx(HX[i],g)-p.x))i=j});G.hi=i;G.drag=1;mv(p);return true}
  if(m==='match'&&p.y>g.t2){const i=[0,1,2].find(i=>{const q=mini(i,g);return p.x>=q.l&&p.x<=q.r});if(i!=null)pickM(i)}return false}
 function mv(p){const m=mode(),g=geo();if(m==='trace'||m==='free')setPx(ix(p.x,g),1);if(m==='sketch'&&G.drag){G.hv[G.hi]=M.max(-6.5,M.min(6.5,M.round(iy(p.y,FN.w.dy,g.t2,g.b2)*2)/2));G.miss='';A.redraw()}}
 function up(){const m=mode();G.drag=0;if(m==='trace'||m==='free'||m==='sketch')tell('')}
 A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Gradient controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
