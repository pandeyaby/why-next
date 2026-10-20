/* Why Next? visuals for graphs and calculus: function plotter (evaluate, line gradient, secant → tangent, tangent/normal, limits),
   average rate of change, and the power-rule pattern. Functions are simple expressions in x, checked by learn/validate_lessons.py. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const SAFE=/^[x0-9+\-*/(). ]+$/;
function fn(src){if(!SAFE.test(src))throw new Error('unsafe f');return Function('x',`"use strict";return (${src});`)}
const der=(f,x)=>{const h=1e-4;return (f(x+h)-f(x-h))/(2*h)};
const sup=n=>String(n).split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]||d).join('');
const pw=(n,v='x')=>n===0?'1':n===1?v:v+sup(n);
function plot(c,o,label,W=440,H=300){const m=34,[x0,x1]=o.xr||[-1,5];let[y0,y1]=o.yr||[-2,20];if(o.equal){const sp=(x1-x0)*(H-m-10)/(W-m-10),mid=(y0+y1)/2;y0=mid-sp/2;y1=mid+sp/2}
 const sx=x=>m+(x-x0)/(x1-x0)*(W-m-10),sy=y=>H-m-(y-y0)/(y1-y0)*(H-m-10),ix=X=>x0+(X-m)/(W-m-10)*(x1-x0);
 const s=c.svg(W,H,label),ax=c.el('g',{class:'vis-axes'},s);
 const step=(a,b)=>{const r=b-a;return r>40?10:r>16?5:r>8?2:r>3?1:.5};
 for(let x=Math.ceil(x0/step(x0,x1))*step(x0,x1);x<=x1;x+=step(x0,x1)){c.el('line',{x1:sx(x),x2:sx(x),y1:m-24,y2:H-m,class:'vis-grid'},ax);c.el('text',{x:sx(x),y:H-m+14,'text-anchor':'middle',class:'vis-lab'},ax,nf(x))}
 for(let y=Math.ceil(y0/step(y0,y1))*step(y0,y1);y<=y1;y+=step(y0,y1)){c.el('line',{x1:m,x2:W-10,y1:sy(y),y2:sy(y),class:'vis-grid'},ax);c.el('text',{x:m-4,y:sy(y)+4,'text-anchor':'end',class:'vis-lab'},ax,nf(y))}
 if(y0<0&&y1>0)c.el('line',{x1:m,x2:W-10,y1:sy(0),y2:sy(0),class:'vis-axis'},ax);if(x0<0&&x1>0)c.el('line',{x1:sx(0),x2:sx(0),y1:10,y2:H-m,class:'vis-axis'},ax);
 const curve=(f,cls='vis-curve',par=s)=>{let d='',pen=false;for(let i=0;i<=240;i++){const x=x0+(x1-x0)*i/240,y=f(x);if(!isFinite(y)||y<y0-(y1-y0)||y>y1+(y1-y0)){pen=false;continue}d+=(pen?'L':'M')+sx(x).toFixed(1)+' '+sy(y).toFixed(1);pen=true}return c.el('path',{d,class:cls},par)};
 const seg=(x,y,k,cls,par=s)=>{const xa=x0,xb=x1;return c.el('line',{x1:sx(xa),y1:sy(y+k*(xa-x)),x2:sx(xb),y2:sy(y+k*(xb-x)),class:cls},par)};
 const clip='vc'+Math.random().toString(36).slice(2,7);const cp=c.el('clipPath',{id:clip},s);c.el('rect',{x:m,y:10,width:W-m-10,height:H-m-10},cp);
 const lay=c.el('g',{'clip-path':`url(#${clip})`},s);
 return{s,sx,sy,ix,curve,seg,lay,x0,x1,y0,y1}}
function handle(c,P,cls='vis-handle'){const h=c.el('circle',{r:9,class:cls},P.s);return h}
R('plot',c=>{const o=c.opts,mode=o.mode||'tangent',f=o.f?fn(o.f):null,P=plot(c,o,'Graph');const fx=o.label||'f(x)';
 if(f)P.curve(f,'vis-curve',P.lay);
 const ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);const at=(h,x,y)=>{h.setAttribute('cx',P.sx(x));h.setAttribute('cy',P.sy(y))};
 const lnA=(x1,y1,x2,y2,el)=>{el.setAttribute('x1',P.sx(x1));el.setAttribute('y1',P.sy(y1));el.setAttribute('x2',P.sx(x2));el.setAttribute('y2',P.sy(y2))};
 const st=o.step||.5;let a=o.a??1;
 if(mode==='eval'){const gx=c.el('line',{class:'vis-guide'},P.lay),gy=c.el('line',{class:'vis-guide'},P.lay),h=handle(c,P);
  const draw=()=>{const y=f(a);at(h,a,y);lnA(a,0,a,y,gx);lnA(P.x0,y,a,y,gy);ro.textContent=`${fx.replace('x',nf(a))} = ${nf(y)}`;c.say(`Input x = ${nf(a)} goes into the rule; the output is ${fx.replace('x',nf(a))} = ${nf(y)}. Drag the point to try other inputs.`);sync()};
  c.drag(h,P.s,X=>{a=Math.round(P.ix(X)/st)*st;a=Math.max(P.x0,Math.min(P.x1,a));draw()});const sync=c.kslider(h,'Input x',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`x = ${nf(v)}`);c.cueEl=[h,gx,gy];draw();return}
 if(mode==='line'){let p=o.p||[1,3],q=o.q||[3,7];const ln=c.el('line',{class:'vis-curve'},P.lay),run=c.el('line',{class:'vis-run'},P.s),rise=c.el('line',{class:'vis-rise'},P.s),hp=handle(c,P),hq=handle(c,P,'vis-handle b');
  const draw=()=>{const dx=q[0]-p[0],dy=q[1]-p[1];if(dx){const k=dy/dx;lnA(P.x0,p[1]+k*(P.x0-p[0]),P.x1,p[1]+k*(P.x1-p[0]),ln)}else lnA(p[0],P.y0,p[0],P.y1,ln);
   lnA(p[0],p[1],q[0],p[1],run);lnA(q[0],p[1],q[0],q[1],rise);at(hp,...p);at(hq,...q);
   const k=dx?dy/dx:null,cc=dx?p[1]-k*p[0]:null;ro.textContent=dx?`gradient = ${dy} ÷ ${dx} = ${nf(k)}`:'run = 0: vertical line';
   c.say(dx?`From (${p}) to (${q}): rise ${dy}, run ${dx}, gradient = rise ÷ run = ${nf(k)}. Equation: y = ${nf(k)}x ${cc<0?'−':'+'} ${nf(Math.abs(cc))}.`:'Both points have the same x, so the line is vertical and its gradient is undefined.');sp();sq()};
  const mv=(pt)=>(X,Y)=>{pt[0]=Math.round(P.ix(X));pt[1]=Math.round(P.y0+(P.sy(P.y0)-Y)/(P.sy(P.y0)-P.sy(P.y1))*(P.y1-P.y0));pt[0]=Math.max(P.x0,Math.min(P.x1,pt[0]));pt[1]=Math.max(P.y0,Math.min(P.y1,pt[1]));draw()};
  c.drag(hp,P.s,mv(p));c.drag(hq,P.s,mv(q));const sp=c.kslider(hp,'First point, x (up/down keys move it along x)',()=>p[0],v=>{p[0]=v;draw()},P.x0,P.x1,1),sq=c.kslider(hq,'Second point, y',()=>q[1],v=>{q[1]=v;draw()},P.y0,P.y1,1);
  c.cueEl=[run,rise];draw();return}
 if(mode==='secant'){let h=o.h??2;const A=handle(c,P),B=handle(c,P,'vis-handle b'),sec=c.el('line',{class:'vis-sec'},P.lay),tan=c.el('line',{class:'vis-tan'},P.lay);const T=der(f,a);
  const draw=()=>{const ya=f(a),yb=f(a+h),k=(yb-ya)/h;at(A,a,ya);at(B,a+h,yb);lnA(P.x0,ya+k*(P.x0-a),P.x1,ya+k*(P.x1-a),sec);lnA(P.x0,ya+T*(P.x0-a),P.x1,ya+T*(P.x1-a),tan);
   tan.style.opacity=Math.abs(h)<.3?1:.25;ro.textContent=`h = ${nf(h,3)}   gradient = ${nf(k,3)}`;sl.value=Math.round(Math.log10(Math.max(.01,Math.abs(h)))*100);
   c.say(`Chord from x = ${nf(a)} to x = ${nf(a+h,3)}: gradient = (f(${nf(a+h,3)}) − f(${nf(a)})) ÷ ${nf(h,3)} = ${nf(k,3)}. `+(Math.abs(h)<.02?`h is tiny, so the chord is almost the tangent: the gradient at x = ${nf(a)} is ${nf(T)}.`:`Make h smaller and the gradient closes in on ${nf(T)}.`));sb()};
  c.drag(B,P.s,X=>{let v=P.ix(X)-a;if(Math.abs(v)<.01)v=v<0?-.01:.01;h=Math.round(v*1000)/1000;draw()});
  const sb=c.kslider(B,'Second point: distance h from the first',()=>h,v=>{h=Math.abs(v)<.01?(v<h?-.01:.01):v;draw()},-2,2,.05,v=>`h = ${nf(v,3)}`);
  const sl=c.range('Shrink h',-200,30,1,Math.round(Math.log10(h)*100),v=>{h=Math.round(10**(v/100)*1000)/1000;draw()});
  c.btn('Animate h → 0',()=>{const h0=h;c.tween(2500,t=>{h=Math.max(.01,h0*Math.pow(.01/h0,t));h=Math.round(h*1000)/1000;draw()})});
  c.cueEl=[sec,B];draw();return}
 if(mode==='limit'){const L=(f(a-1e-6)+f(a+1e-6))/2;let x=o.start??(a-.5);const h=handle(c,P),hole=c.el('circle',{r:6,class:'vis-hole'},P.s);at(hole,a,L);
  const draw=()=>{const y=f(x);at(h,x,Number.isFinite(y)?y:L);ro.textContent=Math.abs(x-a)<1e-9?`x = ${nf(a)}: f is undefined (0 ÷ 0)`:`x = ${nf(x,3)}   f(x) = ${nf(y,3)}`;
   c.say(Math.abs(x-a)<1e-9?`At x = ${nf(a)} itself the formula gives 0 ÷ 0, so there is a hole in the graph. But the outputs nearby close in on ${nf(L)}: the limit is ${nf(L)}.`:`x = ${nf(x,3)} gives f(x) = ${nf(y,3)}. Move x closer to ${nf(a)} from either side and f(x) closes in on ${nf(L)}.`);sy_()};
  c.drag(h,P.s,X=>{x=Math.round(P.ix(X)*1000)/1000;draw()});const sy_=c.kslider(h,`x, approaching ${a}`,()=>x,v=>{x=v;draw()},P.x0,P.x1,.01,v=>`x = ${nf(v,3)}`);
  c.btn('Halve the distance to '+nf(a),()=>{x=Math.round((a+(x-a)/2)*10000)/10000;if(Math.abs(x-a)<1e-4)x=a;draw()});c.btn('Jump to the other side',()=>{x=a-(x-a);draw()},'ghost');
  c.cueEl=[hole,h];draw();return}
 /* tangent (default): drag a point; the tangent (and optional normal) follows, with live dy/dx */
 const tan=c.el('line',{class:'vis-tan on'},P.lay),nor=o.normal?c.el('line',{class:'vis-nor'},P.lay):null,h=handle(c,P);
 const draw=()=>{const y=f(a),k=der(f,a);at(h,a,y);lnA(P.x0,y+k*(P.x0-a),P.x1,y+k*(P.x1-a),tan);
  if(nor){if(Math.abs(k)>1e-9){const q=-1/k;lnA(P.x0,y+q*(P.x0-a),P.x1,y+q*(P.x1-a),nor)}else lnA(a,P.y0,a,P.y1,nor)}
  const cc=y-k*a;ro.textContent=`x = ${nf(a)}   dy/dx = ${nf(k)}`;
  c.say(`At x = ${nf(a)}, y = ${nf(y)} and the gradient dy/dx = ${nf(k)}. Tangent: y = ${nf(k)}x ${cc<0?'−':'+'} ${nf(Math.abs(cc))}.`+(nor?(Math.abs(k)>1e-9?` The normal is at right angles to it, with gradient −1 ÷ ${nf(k)} = ${nf(-1/k)}.`:' The tangent is flat, so the normal is vertical.'):'')+(Math.abs(k)<1e-9?' A gradient of 0 means a flat tangent.':''));sync()};
 c.drag(h,P.s,X=>{a=Math.round(P.ix(X)*10)/10;a=Math.max(P.x0,Math.min(P.x1,a));draw()});const sync=c.kslider(h,'Point on the curve, x',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`x = ${nf(v)}`);
 c.cueEl=[tan,h];draw()});
/* average rate of change between two draggable points */
R('rate',c=>{const o=c.opts,f=fn(o.f||'x*x'),P=plot(c,o,'Average rate of change');P.curve(f,'vis-curve',P.lay);let a=o.a??1,b=o.b??3;const ux=o.ux||'',uy=o.uy||'';
 const ch=c.el('line',{class:'vis-sec'},P.lay),run=c.el('line',{class:'vis-run'},P.s),rise=c.el('line',{class:'vis-rise'},P.s),A=c.el('circle',{r:9,class:'vis-handle'},P.s),B=c.el('circle',{r:9,class:'vis-handle b'},P.s),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);
 const L=(e,x1,y1,x2,y2)=>{e.setAttribute('x1',P.sx(x1));e.setAttribute('y1',P.sy(y1));e.setAttribute('x2',P.sx(x2));e.setAttribute('y2',P.sy(y2))};
 const draw=()=>{const fa=f(a),fb=f(b);A.setAttribute('cx',P.sx(a));A.setAttribute('cy',P.sy(fa));B.setAttribute('cx',P.sx(b));B.setAttribute('cy',P.sy(fb));
  if(a!==b){const k=(fb-fa)/(b-a);L(ch,P.x0,fa+k*(P.x0-a),P.x1,fa+k*(P.x1-a));L(run,a,fa,b,fa);L(rise,b,fa,b,fb);ro.textContent=`average rate = ${nf(fb-fa)} ÷ ${nf(b-a)} = ${nf(k)}`;
   c.say(`From ${ux?'':'x = '}${nf(a)}${ux} to ${nf(b)}${ux}: the output changes by ${nf(fb-fa)}${uy}, over ${nf(b-a)}${ux}. Average rate = ${nf(fb-fa)} ÷ ${nf(b-a)} = ${nf(k)}${uy&&ux?` ${uy.trim()} per ${ux.trim()}`:''}. It is the gradient of the straight line joining the two points.`)}
  else c.say('Both points are at the same place: move one to make a gap.');sa();sb()};
 const st=o.step||.5;c.drag(A,P.s,X=>{a=Math.round(P.ix(X)/st)*st;draw()});c.drag(B,P.s,X=>{b=Math.round(P.ix(X)/st)*st;draw()});
 const sa=c.kslider(A,'Start point',()=>a,v=>{a=v;draw()},P.x0,P.x1,st),sb=c.kslider(B,'End point',()=>b,v=>{b=v;draw()},P.x0,P.x1,st);c.cueEl=[ch,run,rise];draw()});
/* power rule: y = xⁿ beside its gradient function, with a draggable x */
R('power',c=>{const o=c.opts;let n=o.n||3,x=1;const row=c.el('div',{class:'vis-two'},c.stage);
 const host=(lab)=>{const d=c.el('div',{},row);return{stage:d,svg:(w,h)=>c.el('svg',{viewBox:`0 0 ${w} ${h}`,role:'group','aria-label':lab,class:'vis-svg'},d),el:c.el}};
 const yr=()=>[-Math.max(4,2**n),Math.max(4,2**n)],yr2=()=>[-Math.max(4,n*2**(n-1)),Math.max(4,n*2**(n-1))];
 let A,B,hA,hB,tn,ro;
 function build(){row.textContent='';A=plot(Object.assign({},c,host('y = x to the power n')),{xr:[-2,2],yr:yr()},'',300,240);B=plot(Object.assign({},c,host('Gradient function')),{xr:[-2,2],yr:yr2()},'',300,240);
  A.curve(x=>x**n,'vis-curve',A.lay);B.curve(x=>n*x**(n-1),'vis-curve b',B.lay);tn=c.el('line',{class:'vis-tan on'},A.lay);hA=c.el('circle',{r:8,class:'vis-handle'},A.s);hB=c.el('circle',{r:7,class:'vis-handle b'},B.s);
  c.el('text',{x:40,y:20,class:'vis-big'},A.s,`y = ${pw(n)}`);ro=c.el('text',{x:40,y:20,class:'vis-big'},B.s);
  c.drag(hA,A.s,X=>{x=Math.round(A.ix(X)*10)/10;draw()});sync=c.kslider(hA,'x',()=>x,v=>{x=v;draw()},-2,2,.1);c.cueEl=[tn,hB]}
 let sync=null;
 function draw(){const y=x**n,k=n*x**(n-1);hA.setAttribute('cx',A.sx(x));hA.setAttribute('cy',A.sy(y));hB.setAttribute('cx',B.sx(x));hB.setAttribute('cy',B.sy(k));
  tn.setAttribute('x1',A.sx(-2));tn.setAttribute('y1',A.sy(y+k*(-2-x)));tn.setAttribute('x2',A.sx(2));tn.setAttribute('y2',A.sy(y+k*(2-x)));ro.textContent=`dy/dx = ${n===1?'1':(n===2?'2x':n+pw(n-1))}`;
  tab.innerHTML=[1,2,3,4,5].map(m=>`<span class="${m===n?'vis-hl':''}">${pw(m)} → ${m===1?'1':m+(m-1===1?'x':pw(m-1))}</span>`).join(' ');
  c.say(`y = ${pw(n)}. At x = ${nf(x)} the tangent's gradient is ${nf(k)}, which equals ${n} × ${nf(x)}${n-1>1?sup(n-1):n-1===0?'⁰':''} = ${nf(k)}. Power rule: bring the power ${n} down in front and take one off the power.`);sync()}
 const tab=c.el('p',{class:'vis-pattern'},c.stage);c.range('Power n',1,5,1,n,v=>{n=v;build();draw()});build();draw()});
VIS.safeFn=fn;VIS.plotKit={plot,handle,der};
})();
