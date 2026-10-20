/* Why Next? visuals for integration: area under a curve with rectangles or trapezia (Riemann sums), signed area
   between two draggable limits, the fundamental theorem (area function and its gradient), families of antiderivatives
   (+C, and fixing C with a point), and displacement as area under a velocity-time graph. */
(()=>{const nf=VIS.nf;
const simpson=(f,a,b,n=400)=>{if(a===b)return 0;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return s*h/3};
VIS.reg('area',c=>{const o=c.opts,mode=o.mode||'riemann',f=o.f?VIS.safeFn(o.f):null,K=VIS.plotKit,uy=o.uy||'',ux=o.ux||'';
 if(mode==='ftc')return ftc(c,o,f,K);if(mode==='family')return family(c,o,K);
 const P=K.plot(c,o,mode==='velocity'?'Velocity–time graph':'Graph of y = f(x)');const sh=c.el('g',{},P.lay);P.curve(f,'vis-curve',P.lay);
 const ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),Z=P.sy(Math.max(P.y0,Math.min(P.y1,0)));
 let a=o.a??0,b=o.b??2,n=o.n??4,meth=o.method||'left';
 const poly=(pts,cls)=>c.el('polygon',{points:pts.map(([x,y])=>`${P.sx(x).toFixed(1)},${P.sy(y).toFixed(1)}`).join(' '),class:cls},sh);
 if(mode==='riemann'){const names={left:'left',right:'right',mid:'midpoint',trap:'trapezium'},bs={};
  const draw=()=>{sh.innerHTML='';const w=(b-a)/n;let s=0;for(let i=0;i<n;i++){const xl=a+i*w,xr=xl+w;
    if(meth==='trap'){const yl=f(xl),yr=f(xr);s+=(yl+yr)/2*w;poly([[xl,0],[xl,yl],[xr,yr],[xr,0]],'vis-strip')}
    else{const y=f(meth==='left'?xl:meth==='right'?xr:xl+w/2);s+=y*w;poly([[xl,0],[xl,y],[xr,y],[xr,0]],'vis-strip')}}
   const ex=simpson(f,a,b),err=s-ex;ro.textContent=`n = ${n}: ≈ ${nf(s,3)}  (exact ${nf(ex,3)})`;
   for(const k in bs)bs[k].setAttribute('aria-pressed',k===meth);
   c.say(`${n} ${meth==='trap'?'trapezia':'rectangles'} of width ${nf(w,3)} from x = ${nf(a)} to ${nf(b)}, using ${meth==='trap'?'both ends of each strip':'the '+names[meth]+' point for each height'}. Total area ≈ ${nf(s,3)}. The exact area is ${nf(ex,3)}, so the estimate is ${Math.abs(err)<5e-4?'spot on':Math.abs(err).toFixed(3).replace(/0+$/,'')+(err>0?' too big':' too small')}. More strips make it closer.`)};
  c.range('Strips n',1,40,1,n,v=>{n=v;draw()});for(const k of ['left','right','mid','trap'])bs[k]=c.btn(k==='mid'?'Midpoint':k==='trap'?'Trapezia':k[0].toUpperCase()+k.slice(1),()=>{meth=k;draw()},'ghost');
  c.cueEl=[sh];draw();return}
 /* definite / velocity: signed area between draggable limits */
 const A=c.el('circle',{r:9,class:'vis-handle'},P.s),B=c.el('circle',{r:9,class:'vis-handle b'},P.s);A.setAttribute('cy',Z);B.setAttribute('cy',Z);
 const st=o.step||.5,va=c.el('line',{class:'vis-guide'},P.lay),vb=c.el('line',{class:'vis-guide'},P.lay);
 const draw=()=>{sh.innerHTML='';const N=80,w=(b-a)/N;for(let i=0;i<N;i++){const x=a+i*w,y=f(x+w/2);poly([[x,0],[x,f(x)],[x+w,f(x+w)],[x+w,0]],y>=0?'vis-strip':'vis-strip neg')}
  for(const[h,x,l]of[[A,a,va],[B,b,vb]]){h.setAttribute('cx',P.sx(x));l.setAttribute('x1',P.sx(x));l.setAttribute('x2',P.sx(x));l.setAttribute('y1',10);l.setAttribute('y2',P.sy(P.y0))}
  const I=simpson(f,a,b),D=Math.abs(simpson(x=>Math.abs(f(x)),a,b,2000)),up=Math.abs(I+Math.sign(b-a)*D)/2,dn=Math.abs(D-Math.sign(b-a)*I)/2;
  if(mode==='velocity'){ro.textContent=`displacement = ${nf(I)} ${ux}`;c.say(`From t = ${nf(a)} to t = ${nf(b)} ${o.tu||'s'}: area above the axis ${nf(up)} ${ux}, below ${nf(dn)} ${ux}. Displacement = ${nf(up)} − ${nf(dn)} = ${nf(I)} ${ux}; total distance travelled = ${nf(up+dn)} ${ux}. Area below the axis means moving backwards.`)}
  else{ro.textContent=`∫ from ${nf(a)} to ${nf(b)} = ${nf(I)}`;c.say(`The definite integral from x = ${nf(a)} to x = ${nf(b)} is ${nf(I)}: area above the x-axis (${nf(up)}) counts as positive, area below (${nf(dn)}) as negative. ${b<a?'The limits are backwards, so the sign flips.':''}`.trim())}
  sa();sb()};
 const sa=c.kslider(A,'Lower limit',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`${nf(v)}`),sb=c.kslider(B,'Upper limit',()=>b,v=>{b=v;draw()},P.x0,P.x1,st,v=>`${nf(v)}`);
 const snap=X=>Math.max(P.x0,Math.min(P.x1,Math.round(P.ix(X)/st)*st));c.drag(A,P.s,X=>{a=snap(X);draw()});c.drag(B,P.s,X=>{b=snap(X);draw()});
 c.cueEl=[sh,A,B];draw()});
function ftc(c,o,f,K){const two=c.el('div',{class:'vis-two'},c.stage);let a=o.a??0,x=o.start??2;const st=o.step||.25;
 const P=K.plot(c,o,'y = f(x) with the area from a to x shaded',300,240),Q=K.plot(c,{xr:o.xr,yr:o.ar||o.yr},'Area function A(x)',300,240);two.append(P.s,Q.s);
 const sh=c.el('polygon',{class:'vis-strip'},P.lay);P.curve(f,'vis-curve',P.lay);const Af=t=>simpson(f,a,t,100);Q.curve(Af,'vis-curve b',Q.lay);
 const h=c.el('circle',{r:9,class:'vis-handle'},P.s),q=c.el('circle',{r:7,class:'vis-handle b'},Q.s),tn=c.el('line',{class:'vis-tan on'},Q.lay);
 const r1=c.el('text',{x:44,y:22,class:'vis-big'},P.s),r2=c.el('text',{x:44,y:22,class:'vis-big'},Q.s);
 const draw=()=>{const pts=[[a,0]];for(let i=0;i<=60;i++){const t=a+(x-a)*i/60;pts.push([t,f(t)])}pts.push([x,0]);sh.setAttribute('points',pts.map(([u,v])=>`${P.sx(u).toFixed(1)},${P.sy(v).toFixed(1)}`).join(' '));
  const y=f(x),A=Af(x);h.setAttribute('cx',P.sx(x));h.setAttribute('cy',P.sy(y));q.setAttribute('cx',Q.sx(x));q.setAttribute('cy',Q.sy(A));
  const L=(Q.x1-Q.x0)/5;tn.setAttribute('x1',Q.sx(x-L));tn.setAttribute('y1',Q.sy(A-y*L));tn.setAttribute('x2',Q.sx(x+L));tn.setAttribute('y2',Q.sy(A+y*L));
  r1.textContent=`f(${nf(x)}) = ${nf(y)}`;r2.textContent=`A(${nf(x)}) = ${nf(A)}`;
  c.say(`Shaded area from ${nf(a)} to x = ${nf(x)} is A(x) = ${nf(A)}. The gradient of the area graph at x = ${nf(x)} is ${nf(K.der(Af,x))}, the same as the height f(${nf(x)}) = ${nf(y)}. That is the fundamental theorem: the area function's derivative is f.`);sync()};
 c.drag(h,P.s,X=>{x=Math.max(a,Math.min(P.x1,Math.round(P.ix(X)/st)*st));draw()});const sync=c.kslider(h,'Right edge x',()=>x,v=>{x=v;draw()},a,P.x1,st,v=>`x = ${nf(v)}`);
 c.cueEl=[sh,tn];draw()}
function family(c,o,K){const F=VIS.safeFn(o.F),P=K.plot(c,o,'Antiderivatives y = F(x) + C'),lab=o.label||'F(x)';let C=o.c??0;const xs=o.at??1,pt=o.point;
 for(let k=-4;k<=4;k++)P.curve(x=>F(x)+k,'vis-curve faint',P.lay);let cv=null;
 const tg=c.el('g',{},P.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),g=K.der(F,xs);
 for(let k=-4;k<=4;k++){const y=F(xs)+k;c.el('line',{x1:P.sx(xs-.5),y1:P.sy(y-g*.5),x2:P.sx(xs+.5),y2:P.sy(y+g*.5),class:'vis-tan'},tg)}
 const P0=pt?c.el('circle',{r:6,cx:P.sx(pt[0]),cy:P.sy(pt[1]),class:'vis-target'},P.s):null;const c0=pt?pt[1]-F(pt[0]):null;
 const draw=()=>{if(cv)cv.remove();cv=P.curve(x=>F(x)+C,'vis-curve',P.lay);
  const cs=C<0?`− ${nf(-C)}`:C>0?`+ ${nf(C)}`:'';ro.textContent=`y = ${lab} ${cs}`;
  c.say(`y = ${lab} ${cs}. Every curve in the family has the same gradient ${nf(g)} at x = ${nf(xs)} (the short parallel lines), so they all have the same derivative. ${pt?(Math.abs(C-c0)<1e-9?`It passes through (${nf(pt[0])}, ${nf(pt[1])}), so C = ${nf(c0)}.`:`It misses the point (${nf(pt[0])}, ${nf(pt[1])}); change C until it passes through.`):'Changing C slides the curve up or down.'}`)};
 c.range('Constant C',-4,4,1,C,v=>{C=v;draw()});c.cueEl=P0?[tg,P0]:[tg];draw()}
})();
