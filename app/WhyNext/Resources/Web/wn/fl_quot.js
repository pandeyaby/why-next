/* Flagship – the quotient rule (ages 17–18): match candidate slope curves for x/(x+1) to the true slope, assemble
   (u′v − uv′)/v² from tiles with a live check, tune the numerator of d/dx (x+1)/(x−2), slide along tan x to see
   sec²x ≥ 1, and flag the stationary points of x²/(x+1) beside its asymptote. Buttons for every move. */
(()=>{const mn=Math.min,mx=Math.max,ab=Math.abs,cl=(v,a,b)=>mx(a,mn(b,v));
 const n2=x=>{const r=Math.round(x*100)/100;return(r<0?'−':'')+ab(r)};
 const dnum=(f,x)=>(f(x+1e-4)-f(x-1e-4))/2e-4;
 // step 0: three candidate derivatives of x/(x+1)
 const CAND=[['u′/v′ = 1',x=>1,'u′/v′ is a flat line at 1, but the true slopes fall as x grows. A quotient does not differentiate part by part.'],
  ['(u′v − uv′)/v²',x=>1/(x+1)**2,''],
  ['(uv′ − u′v)/v²',x=>-1/(x+1)**2,'Right size, wrong sign: this curve is below the axis, yet x/(x+1) is rising. Swap the order: u′v first.']];
 const F0=x=>x/(x+1);
 // step 1: tiles for f = x/(x²+1), u = x, v = x²+1
 const TILE=[['u′v',x=>x*x+1],['uv′',x=>2*x*x],['v²',x=>(x*x+1)**2],['u′v′',x=>2*x],['v',x=>x*x+1]];
 const F1=x=>x/(x*x+1);
 const F2=x=>(x+1)/(x-2),F4=x=>x*x/(x+1);
VIS.reg('flagquot',c=>{let A,ctl,qb;
 const Z={gen:0,ok:()=>{},Q:'∂'};
 const where=()=>['match','build','tune','tan','flat','quiz'][A.step];
 const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const sz=n=>A.narrow?n:n+2;
 function T(g,t,X,Y,n,col,w,al){g.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,X,Y,A.W-12)}
 function box(g,R,col,bold,a){g.fillStyle=A.alpha(col,a||.12);A.paint.rrect(R.x,R.y,R.w,R.h,10);g.fill();g.strokeStyle=col;g.lineWidth=bold?4:2;g.stroke()}
 const over=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
 const nope=t=>{A.sound.miss();speak(t);A.redraw()};
 // a plot window: maths coords to canvas
 const win=(x0,x1,y0,y1,top,ht)=>{const R={x:A.W*.08,y:A.H*(top||.05),w:A.W*.88,h:A.H*(ht||.58)};
  return{R,x0,x1,y0,y1,X:x=>R.x+(x-x0)/(x1-x0)*R.w,Y:y=>R.y+R.h-(y-y0)/(y1-y0)*R.h,ix:px=>x0+(px-R.x)/R.w*(x1-x0),iy:py=>y0+(R.y+R.h-py)/R.h*(y1-y0)}};
 function axes(g,V){const C=A.col;box(g,V.R,C.ln,0,.04);g.strokeStyle=A.alpha(C.tx,.45);g.lineWidth=1.5;g.beginPath();
  if(V.y0<0&&V.y1>0){g.moveTo(V.R.x,V.Y(0));g.lineTo(V.R.x+V.R.w,V.Y(0))}if(V.x0<0&&V.x1>0){g.moveTo(V.X(0),V.R.y);g.lineTo(V.X(0),V.R.y+V.R.h)}g.stroke()}
 function curve(g,V,f,col,w,dash){g.save();g.beginPath();g.rect(V.R.x,V.R.y,V.R.w,V.R.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;g.setLineDash(dash||[]);g.beginPath();
  let on=0,py=0;for(let i=0;i<=260;i++){const x=V.x0+(V.x1-V.x0)*i/260,y=f(x);if(!isFinite(y)||ab(y)>1e4||(on&&ab(y-py)>(V.y1-V.y0))){on=0;continue}
   on?g.lineTo(V.X(x),V.Y(y)):g.moveTo(V.X(x),V.Y(y));on=1;py=y}g.stroke();g.restore()}
 function dots(g,V,f,col){for(let i=0;i<=16;i++){const x=V.x0+(V.x1-V.x0)*(i+.5)/17,y=dnum(f,x);if(ab(y)<1e3&&y>V.y0&&y<V.y1)A.paint.ball(V.X(x),V.Y(y),4.5,col)}}
 // ---- 0: match the slope curve ----
 const V0=()=>win(0,4,-1.3,1.3);
 function matchV(g){const C=A.col,V=V0(),cols=[C.am,C.gr,C.rd];axes(g,V);
  CAND.forEach(([t,f],k)=>curve(g,V,f,cols[k],Z.bad===k||Z.pick===k?5:2.5,Z.pick===k||Z.bad===k?[]:[7,5]));dots(g,V,F0,C.tx);
  const x=Z.a,s=dnum(F0,x),px=V.X(x);g.strokeStyle=C.vi;g.lineWidth=2;g.beginPath();g.moveTo(px,V.R.y);g.lineTo(px,V.R.y+V.R.h);g.stroke();
  T(g,'● true slope of x/(x+1)',V.R.x+8,V.R.y+14,10,C.tx,800,'left');
  T(g,`At x = ${n2(x)}: true slope ${n2(s)}`,A.W/2,A.H*.68,12,C.tx,800);
  CAND.forEach(([t,f],k)=>T(g,`${t} → ${n2(f(x))}`,A.W/2,A.H*(.75+k*.065),11,cols[k],800))}
 function pick(k){if(Z.pick===1)return;if(CAND[k][2]){Z.bad=k;return nope(CAND[k][2])}Z.bad=-1;Z.pick=k;A.sound.pop();say('This curve sits on every true slope.')}
 function setA(x){Z.a=cl(x,0,4);say()}
 // ---- 1: assemble the rule ----
 const V1=()=>win(-3,3,-.7,1.2,.36,.4);
 const slotR=i=>{const w=A.W*.24,h=A.H*.085;return[{x:A.W*.14,y:A.H*.05,w,h},{x:A.W*.62,y:A.H*.05,w,h},{x:A.W*.38,y:A.H*.17,w,h}][i]};
 const tileR=k=>{const w=(A.W-36)/5;return{x:8+k*(w+5),y:A.H*.82,w,h:A.H*.11}};
 const built=()=>Z.sl.every(s=>s>=0);
 const cand=()=>x=>(TILE[Z.sl[0]][1](x)-TILE[Z.sl[1]][1](x))/TILE[Z.sl[2]][1](x);
 const right=()=>Z.sl.join()==='0,1,2';
 function buildV(g){const C=A.col;Z.sl.forEach((s,i)=>{const R=slotR(i);box(g,R,s<0?C.ln:right()?C.gr:C.cy,s>=0);T(g,s<0?'?':TILE[s][0],R.x+R.w/2,R.y+R.h/2,15,C.tx,800)});
  T(g,'−',A.W/2,A.H*.09,20,C.tx,800);g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(A.W*.1,A.H*.155);g.lineTo(A.W*.9,A.H*.155);g.stroke();
  T(g,'f(x) = x/(x² + 1): u = x, v = x² + 1',A.W/2,A.H*.3,10,C.tx,700);
  const V=V1();axes(g,V);dots(g,V,F1,C.tx);if(built())curve(g,V,cand(),right()?C.gr:C.rd,3);
  TILE.forEach(([t],k)=>{const R=tileR(k),used=Z.sl.includes(k);box(g,R,used?C.ln:C.vi,0,used?.03:.16);T(g,t,R.x+R.w/2,R.y+R.h/2,13,used?A.alpha(C.tx,.5):C.tx,800)})}
 function tile(k){if(right())return;const i=Z.sl.indexOf(-1);if(i<0||Z.sl.includes(k))return;Z.sl[i]=k;A.sound.tick();
  if(!built())return say();if(right()){A.sound.pop();return say('The live curve lands on every dot.')}
  const[a,b,d]=Z.sl;nope(a===1&&b===0?'Order flipped: the curve is the mirror image. The top starts with u′v.':a===3||b===3?'u′v′ is the product-rule trap: the top uses u′v and uv′.':d!==2?'Wrong denominator: the curve is the wrong height. The bottom is v².':'Check each slot: top u′v − uv′, bottom v².')}
 function clear(i){if(right()||Z.sl[i]<0)return;Z.sl[i]=-1;A.sound.tick();say()}
 // ---- 2: tune the numerator ----
 const V2=()=>win(-2,6,-6,6,.05,.6);
 function tuneV(g){const C=A.col,V=V2(),k=Z.k;axes(g,V);g.strokeStyle=A.alpha(C.pk,.7);g.setLineDash([5,5]);g.beginPath();g.moveTo(V.X(2),V.R.y);g.lineTo(V.X(2),V.R.y+V.R.h);g.stroke();g.setLineDash([]);
  dots(g,V,F2,C.tx);curve(g,V,x=>k/(x-2)**2,k===-3?C.gr:C.am,3);
  T(g,`d/dx [(x + 1)/(x − 2)] = ${n2(k)} / (x − 2)²`,A.W/2,A.H*.71,13,C.tx,800);
  T(g,'top: (1)(x − 2) − (x + 1)(1)',A.W/2,A.H*.78,11,C.tx,700);
  [['− 1',-1],['+ 1',1]].forEach(([t],j)=>{const R=padR(j);box(g,R,C.vi,0,.15);T(g,t,R.x+R.w/2,R.y+R.h/2,16,C.tx,800)})}
 const padR=j=>{const w=(A.W-30)/2;return{x:10+j*(w+10),y:A.H*.84,w,h:A.H*.13}};
 function nudge(d){if(Z.k===-3)return;Z.k=cl(Z.k+d,-6,6);A.sound.tick();
  if(Z.k===-3){A.sound.pop();return say('Every dot is on the curve. The top is −3 for all x, so the curve falls on both sides of x = 2.')}
  say(Z.k===3?'k = 3 is the uv′ − u′v order: right shape, wrong side of the axis.':'Expand (x − 2) − (x + 1): the x terms cancel. What is left?')}
 // ---- 3: tan x ----
 const V3=()=>win(-1.5,1.5,-4,4,.05,.6);
 function tanV(g){const C=A.col,V=V3(),a=Z.t,s=1/Math.cos(a)**2,y=Math.tan(a);axes(g,V);curve(g,V,Math.tan,C.cy,3.5);
  curve(g,V,x=>y+s*(x-a),s>1.92&&s<2.08?C.gr:C.am,2.5,[6,4]);A.paint.ball(V.X(a),V.Y(y),9,C.vi);
  T(g,`x = ${n2(a)}   slope = 1/cos²x = sec²x = ${n2(s)}`,A.W/2,A.H*.71,12,C.tx,800);
  const R={x:A.W*.1,y:A.H*.78,w:A.W*.8,h:A.H*.05};box(g,R,C.ln,0,.05);const bw=R.w*mn(1,(s-1)/4);g.fillStyle=A.alpha(C.am,.6);g.fillRect(R.x,R.y,bw,R.h);
  T(g,'slope above 1',A.W/2,A.H*.87,10,C.tx,700);T(g,'Drag the dot along tan x',A.W/2,A.H*.93,10,C.tx,600)}
 function setT(x){if(Z.won)return;Z.t=cl(x,-1.35,1.35);const s=1/Math.cos(Z.t)**2;if(s>1.92&&s<2.08){Z.won=1;A.sound.pop();return say('Slope 2 at x = ±π/4, where cos²x = ½.')}say(ab(Z.t)<.12?'Near x = 0 the slope is 1: the smallest it ever gets.':'')}
 // ---- 4: stationary points ----
 const V4=()=>win(-4.5,2,-10,5,.05,.62);
 function flatV(g){const C=A.col,V=V4();axes(g,V);g.strokeStyle=A.alpha(C.pk,.7);g.setLineDash([5,5]);g.beginPath();g.moveTo(V.X(-1),V.R.y);g.lineTo(V.X(-1),V.R.y+V.R.h);g.stroke();g.setLineDash([]);
  curve(g,V,F4,C.cy,3.5);T(g,'x = −1',V.X(-1)+6,V.R.y+14,10,C.tx,800,'left');
  Z.fl.forEach(x=>{const y=F4(x);A.paint.ball(V.X(x),V.Y(y),9,C.gr);T(g,x?'max (−2, −4)':'min (0, 0)',V.X(x),V.Y(y)+(x?-18:18),11,C.tx,800)});
  if(Z.miss!=null)A.paint.ball(V.X(Z.miss),V.Y(cl(F4(Z.miss),-9.6,4.6)),7,C.rd);
  T(g,'f′(x) = x(x + 2)/(x + 1)²',A.W/2,A.H*.74,13,C.tx,800);T(g,`Flagged ${Z.fl.length} of 2 stationary points`,A.W/2,A.H*.82,11,Z.fl.length>1?C.gr:C.tx,700);
  T(g,'Tap the curve where it is flat',A.W/2,A.H*.9,10,C.tx,600)}
 function flag(x){if(Z.fl.length>1)return;const near=[0,-2].find(r=>ab(x-r)<.22);
  if(ab(x+1)<.25){Z.miss=null;return nope('x = −1 makes the denominator zero: a vertical asymptote, not a stationary point.')}
  if(near==null){Z.miss=x;const d=x*(x+2)/(x+1)**2;return nope(`f′(${n2(x)}) = ${n2(d)}: not zero, so the curve is ${d>0?'rising':'falling'} there.`)}
  Z.miss=null;if(Z.fl.includes(near))return say('Already flagged. Find the other one.');Z.fl.push(near);A.sound.pop();say(near?'x = −2: the top is zero, f = −4, a local max.':'x = 0: the top is zero, f = 0, a local min.')}
 function draw(A){const{ctx:g,W,H,col:C}=A,v=where();g.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.04:.3);g.fillRect(0,0,W,H);
  const f={match:matchV,build:buildV,tune:tuneV,tan:tanV,flat:flatV}[v];if(f)f(g);else T(g,Z.Q,W/2,H/2,64,C.tx,400);A.fx.draw(g)}
 function say(pre){const v=where();let t;
  if(v==='match')t=`At x = ${n2(Z.a)} the true slope is ${n2(dnum(F0,Z.a))}. `+CAND.map(([n,f])=>`${n} gives ${n2(f(Z.a))}.`).join(' ');
  else if(v==='build')t='Top: '+[0,1].map(i=>Z.sl[i]<0?'empty':TILE[Z.sl[i]][0]).join(' minus ')+'. Bottom: '+(Z.sl[2]<0?'empty':TILE[Z.sl[2]][0])+'.';
  else if(v==='tune')t=`Numerator k = ${Z.k}.`;else if(v==='tan')t=`x = ${n2(Z.t)}, slope ${n2(1/Math.cos(Z.t)**2)}.`;
  else if(v==='flat')t=`Stationary points flagged: ${Z.fl.length} of 2.`;else t='Challenge time.';
  speak((pre?pre+' ':'')+t);keys();Z.ok()}
 function keys(){if(!A||!ctl)return;ctl.innerHTML='';const v=where(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},ctl,t);e.onclick=f};
  if(v==='match'){B('◀ x',()=>setA(Z.a-.5),'Move x left');B('x ▶',()=>setA(Z.a+.5),'Move x right');if(Z.pick!==1)CAND.forEach(([t],k)=>B(t,()=>pick(k),'This matches: '+t))}
  if(v==='build'&&!right()){TILE.forEach(([t],k)=>{if(!Z.sl.includes(k))B(t,()=>tile(k),'Place tile '+t)});Z.sl.forEach((s,i)=>{if(s>=0)B('✕ '+TILE[s][0],()=>clear(i),'Remove '+TILE[s][0])})}
  if(v==='tune'&&Z.k!==-3){B('− 1',()=>nudge(-1),'Numerator down one');B('+ 1',()=>nudge(1),'Numerator up one')}
  if(v==='tan'&&!Z.won){B('◀ x',()=>setT(Z.t-.05),'Move x left');B('x ▶',()=>setT(Z.t+.05),'Move x right')}
  if(v==='flat'&&Z.fl.length<2)[-3,-2,-1,0,1].forEach(x=>B('Flag x = '+n2(x),()=>flag(x)));A.redraw()}
 const end=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const run=(fs,gap)=>{const g=Z.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===Z.gen)f()},A.reduced()?j*20:j*gap))};
 const fresh=()=>{Z.gen++;Z.ok=()=>{};Z.drag=0;Z.bad=-1};
 const steps=[
  {h:'Test the tempting rule',p:'For f = x/(x + 1), u = x and v = x + 1. Dots show the true slope. Which formula\u2019s curve sits on them? Drag the line to compare values.',
   predict:{q:'Is the derivative of x/(x + 1) just u′/v′ = 1/1?',opts:['Yes, slope 1 everywhere','No, the slope changes with x'],ans:1},task:'Tap the curve that matches the true slopes',
   show:()=>{steps[0].go();run([()=>pick(0),()=>setA(1),()=>pick(2),()=>setA(3),()=>pick(1)],420)},go:()=>{fresh();Z.a=.5;Z.pick=-1;say();Z.ok=end(0,()=>Z.pick===1,()=>'d/dx (u/v) = (u′v − uv′)/v². Order matters because of the minus.')}},
  {h:'Assemble the rule',p:'Fill the top and bottom with tiles. The live curve for f = x/(x² + 1) must land on the true-slope dots.',task:'Build the quotient rule',
   show:()=>{steps[1].go();run([()=>tile(0),()=>tile(1),()=>tile(2)],450)},go:()=>{fresh();Z.sl=[-1,-1,-1];say();Z.ok=end(1,right,()=>'So d/dx [x/(x² + 1)] = (1 − x²)/(x² + 1)².')}},
  {h:'Tune the numerator',p:'For (x + 1)/(x − 2), u′ = v′ = 1. The top u′v − uv′ simplifies to a single number k. Nudge k until the curve fits the dots.',
   predict:{q:'Will the slope of (x + 1)/(x − 2) ever be positive?',opts:['Yes, on one side of x = 2','No, it is always falling'],ans:1},task:'Find k',
   show:()=>{steps[2].go();run([1,2,3,4,5,6].map(()=>()=>nudge(-1)),300)},go:()=>{fresh();Z.k=3;say();Z.ok=end(2,()=>Z.k===-3,()=>'−3/(x − 2)² is negative for every x ≠ 2.')}},
  {h:'Slide along tan x',p:'tan x = sin x / cos x. The quotient rule gives (cos²x + sin²x)/cos²x = 1/cos²x = sec²x. Drag along the curve.',
   predict:{q:'Can tan x ever have a slope less than 1?',opts:['Yes, near 0 it is flatter','No, the slope is always at least 1'],ans:1},task:'Find a point where the slope is 2',
   show:()=>{steps[3].go();run([()=>setT(.3),()=>setT(.6),()=>setT(Math.PI/4)],380)},go:()=>{fresh();Z.t=0;Z.won=0;say();Z.ok=end(3,()=>Z.won,()=>'sec²x = 1/cos²x and cos²x ≤ 1, so the slope is never below 1.')}},
  {h:'Find the stationary points',p:'For x²/(x + 1), f′ = x(x + 2)/(x + 1)². Stationary points are where the top is zero. Tap them on the curve.',
   predict:{q:'How many stationary points does x²/(x + 1) have?',opts:['One','Two','Three'],ans:1},task:'Flag both stationary points',
   show:()=>{steps[4].go();run([()=>flag(-1),()=>flag(-2),()=>flag(0)],500)},go:()=>{fresh();Z.fl=[];Z.miss=null;say();Z.ok=end(4,()=>Z.fl.length>1,()=>'Set the numerator to zero; the denominator only tells you where f is undefined.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.ok()});
 const QZ=[['d/dx (sin x / x) = ?','∿',[['(x cos x − sin x)/x²','ok'],['(sin x − x cos x)/x²','order'],['cos x','split']]],
  ['d/dx [1/(x² + 1)] = ?','⅟',[['−2x/(x² + 1)²','ok'],['1/(2x)','split'],['2x/(x² + 1)²','sign']]],
  ['Why is the bottom of the quotient rule v²?','✎',[['d/dx (v⁻¹) = −v′/v² by the chain rule','ok'],['You square the top as well','top'],['It is just a convention','conv']]],
  ['d/dx (eˣ / x) = ?','e',[['eˣ(x − 1)/x²','ok'],['eˣ','split'],['eˣ(1 − x)/x²','order']]],
  ['Where is x/(x² + 1) stationary?','⛰',[['x = ±1','ok'],['x = 0','zero'],['Nowhere','none']]],
  ['d/dx (tan x) = ?','∠',[['sec²x','ok'],['sec x tan x','sec'],['−sec²x','sign']]]];
 let qi=-1,str=0;
 function ask(){qi++;const[q,pic,ops]=QZ[qi%QZ.length],r=qi%3;Z.Q=pic;
  qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});speak('Challenge: '+q);A.redraw()}
 function grade(tag){qb.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=qb.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct: u′v − uv′ over v².';break;
   case 'order':m='The terms are the wrong way round, which flips the sign. Start the top with u′v.';break;
   case 'split':m='A quotient does not differentiate top and bottom separately. Use (u′v − uv′)/v².';break;
   case 'sign':m='Check the sign: with u = 1, u′v − uv′ = 0 − v′, which is negative.';break;
   case 'top':m='Only the bottom is squared. It comes from differentiating v⁻¹.';break;
   case 'conv':m='It is not a convention: write u/v = u·v⁻¹ and use the product and chain rules.';break;
   case 'zero':m='That is where f = 0. Stationary means f′ = 0: (1 − x²)/(x² + 1)² = 0 gives x = ±1.';break;
   case 'none':m='Set the top of f′ to zero: 1 − x² = 0, so x = ±1.';break;
   default:m='sec x tan x is the derivative of sec x. For tan x, (cos²x + sin²x)/cos²x = sec²x.'}
  const good=tag==='ok';if(good){str++;A.win()}else{str=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${str}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=where();Z.drag=0;
  if(v==='match'){const V=V0();if(over(p,V.R)){const x=V.ix(p.x),y=V.iy(p.y),k=[0,1,2].map(k=>ab(CAND[k][1](x)-y)).reduce((b,d,k,a)=>d<a[b]?k:b,0);
    if(ab(CAND[k][1](x)-y)<.15){pick(k);return false}Z.drag=1;setA(x);return true}return false}
  if(v==='build'){const k=[0,1,2,3,4].find(k=>over(p,tileR(k)));if(k!=null)tile(k);const i=[0,1,2].find(i=>over(p,slotR(i)));if(i!=null)clear(i);return false}
  if(v==='tune'){const j=[0,1].find(j=>over(p,padR(j)));if(j!=null)nudge(j?1:-1);return false}
  if(v==='tan'){const V=V3();if(over(p,V.R)){Z.drag=1;setT(V.ix(p.x));return true}return false}
  if(v==='flat'){const V=V4();if(over(p,V.R))flag(V.ix(p.x));return false}return false}
 function move(p){if(!Z.drag)return;const v=where();if(v==='match')setA(V0().ix(p.x));if(v==='tan')setT(V3().ix(p.x))}
 function up(){Z.drag=0}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{const q=A.step===5;qb.hidden=!q;ctl.hidden=q;keys()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
 A.start()})})();
