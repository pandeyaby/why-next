/* Flagship 12 – area under a curve / the definite integral. Hook: a car on cruise control at 10 m/s; the learner predicts the distance
   after 6 s, then drags time along and watches the shaded rectangle grow with the odometer. Then: speeding up (area of a triangle, not
   height × width), strips that settle on the exact area as they get thinner, area below the axis counts negative, a sandbox, and a
   challenge: drag the upper limit so the area equals a target, with feedback for using the height, forgetting the half, and sign. */
(()=>{const f1=v=>(Math.round(v*100)/100).toString(),FN={c10:[x=>10,'v = 10'],t2:[x=>2*x,'v = 2t'],q:[x=>x*x/4+1,'y = x²/4 + 1'],l2:[x=>x-2,'y = x − 2'],d:[x=>2-x,'y = 2 − x'],s:[x=>1.5*Math.sin(x)+.5,'y = 1.5 sin x + 0.5'],k3:[x=>3,'y = 3'],x2:[x=>2*x,'y = 2x'],x1:[x=>x,'y = x']};
VIS.reg('flagarea',c=>{let A,chal,chips;const st={fn:'c10',a:0,b:0,n:0,xr:[0,8],yr:[0,14],drag:null,q:null,won:false};
 const F=x=>FN[st.fn][0](x),integ=(a,b,N=400)=>{let s=0;const h=(b-a)/N;for(let i=0;i<N;i++)s+=F(a+(i+.5)*h)*h;return s},strips=(a,b,n)=>{let s=0;const h=(b-a)/n;for(let i=0;i<n;i++)s+=F(a+i*h)*h;return s};
 const geo=A=>{const{W,H}=A,top=A.step===0||A.step===1?H*.22:H*.1,l=A.narrow?40:52,r=18,b=A.narrow?40:44,[x0,x1]=st.xr,[y0,y1]=st.yr;return{l,r,t:top,b,X:x=>l+(x-x0)/(x1-x0)*(W-l-r),Y:y=>H-b-(y-y0)/(y1-y0)*(H-top-b),x:px=>x0+(px-l)/(W-l-r)*(x1-x0)}};
 const upd=()=>{const I=integ(st.a,st.b);c.say(A.step<2?`After ${f1(st.b)} s the car has gone ${f1(I)} m.`:`${FN[st.fn][1]} from ${f1(st.a)} to ${f1(st.b)}: signed area ${f1(I)}`+(st.n?`, ${st.n} strips give ${f1(strips(st.a,st.b,st.n))}.`:'.'));A.cv.setAttribute('aria-label',`Graph of ${FN[st.fn][1]} with the area from ${f1(st.a)} to ${f1(st.b)} shaded: ${f1(I)}.`);A.redraw()};
 let chk=()=>{};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,g=geo(A),[x0,x1]=st.xr,[y0,y1]=st.yr;A.ar={st,geo:()=>{const g=geo(A);return{X0:g.X(0),Y0:g.Y(0),sx:g.X(1)-g.X(0),sy:g.Y(0)-g.Y(1),Xa:g.X(st.a),Xb:g.X(st.b)}},integ:()=>integ(st.a,st.b)};
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // grid
  const sx=Math.max(1,Math.round((x1-x0)/8)),sy=Math.max(1,Math.round((y1-y0)/7));ctx.lineWidth=1;for(let x=Math.ceil(x0);x<=x1;x+=1){ctx.strokeStyle=A.alpha(C.tx,x?.07:.5);ctx.beginPath();ctx.moveTo(g.X(x),g.Y(y0));ctx.lineTo(g.X(x),g.Y(y1));ctx.stroke()}
  for(let y=Math.ceil(y0);y<=y1;y+=sy){ctx.strokeStyle=A.alpha(C.tx,y?.07:.5);ctx.beginPath();ctx.moveTo(g.X(x0),g.Y(y));ctx.lineTo(g.X(x1),g.Y(y));ctx.stroke()}
  ctx.fillStyle=C.mu;ctx.font='11px system-ui';ctx.textAlign='center';for(let x=Math.ceil(x0);x<=x1;x+=sx)if(x)ctx.fillText(x,g.X(x),g.Y(Math.max(y0,0))+14);ctx.textAlign='right';for(let y=Math.ceil(y0);y<=y1;y+=sy)ctx.fillText(y,g.X(Math.max(x0,0))-6,g.Y(y)+4);
  if(A.step<2){ctx.textAlign='left';ctx.fillText('speed (m/s)',g.X(0)+6,g.t+34);ctx.textAlign='right';ctx.fillText('time (s)',W-g.r,g.Y(0)-6)}
  // shaded area / strips
  const lo=Math.min(st.a,st.b),hi=Math.max(st.a,st.b);if(st.n){const h=(st.b-st.a)/st.n;for(let i=0;i<st.n;i++){const xa=st.a+i*h,v=F(xa);ctx.fillStyle=A.alpha(v>=0?C.cy:C.rd,.35);ctx.strokeStyle=A.alpha(v>=0?C.cy:C.rd,.9);ctx.lineWidth=1;ctx.beginPath();ctx.rect(g.X(xa),g.Y(Math.max(v,0)),g.X(xa+h)-g.X(xa),Math.abs(g.Y(v)-g.Y(0)));ctx.fill();if(st.n<=40)ctx.stroke()}}
  else if(hi>lo){[[1,C.cy],[-1,C.rd]].forEach(([sg,col])=>{ctx.fillStyle=A.alpha(col,.38);ctx.beginPath();ctx.moveTo(g.X(lo),g.Y(0));for(let i=0;i<=120;i++){const x=lo+(hi-lo)*i/120,v=F(x);ctx.lineTo(g.X(x),g.Y(sg>0?Math.max(0,v):Math.min(0,v)))}ctx.lineTo(g.X(hi),g.Y(0));ctx.closePath();ctx.fill()})}
  // curve
  P.glow(A.alpha(C.pk,.6),10);ctx.strokeStyle=C.pk;ctx.lineWidth=3.5;ctx.beginPath();for(let i=0;i<=200;i++){const x=x0+(x1-x0)*i/200,y=Math.max(y0-1,Math.min(y1+1,F(x)));i?ctx.lineTo(g.X(x),g.Y(y)):ctx.moveTo(g.X(x),g.Y(y))}ctx.stroke();P.noShadow();
  P.label(FN[st.fn][1],W-g.r-6,g.t+12,{align:'right',font:'700 13px system-ui',pill:1,bg:A.alpha(C.pk,.95),col:'#111'});
  // handles
  const hb=g.X(st.b),ya=g.Y(Math.max(y0,0));ctx.strokeStyle=A.alpha(C.am,.8);ctx.setLineDash([5,4]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hb,g.t);ctx.lineTo(hb,ya);ctx.stroke();ctx.setLineDash([]);P.glow(A.alpha(C.am,.9),14);P.ball(hb,ya,11,C.am);P.noShadow();
  if(A.step===4){const ha=g.X(st.a);P.glow(A.alpha(C.vi,.9),14);P.ball(ha,ya,11,C.vi);P.noShadow();P.label('a',ha,ya+24,{font:'700 12px system-ui',col:C.vi})}P.label(A.step<2?`t = ${f1(st.b)}`:'b',hb,ya+24,{font:'700 12px system-ui',col:C.am});
  // readouts
  const I=integ(st.a,st.b),sv=st.n?strips(st.a,st.b,st.n):null;
  P.label(A.step<2?`distance = area = ${f1(I)} m`:sv!=null?`${st.n} strips: ${f1(sv)}   exact: ${f1(I)}`:A.step===5&&!st.won?`area = ?`:`signed area = ${f1(I)}`,A.step<2?W*.42:A.narrow?W/2+10:W/2,A.step<2?g.t+14:g.t+12+(A.narrow?22:0),{font:`800 ${A.narrow?13:15}px system-ui`,pill:1,bg:A.alpha(C.panel||C.pn,.95)});
  if(A.step<2){const road=H*.08;ctx.fillStyle='#1f2937';ctx.fillRect(0,road-14,W,28);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.setLineDash([12,10]);ctx.beginPath();ctx.moveTo(0,road);ctx.lineTo(W,road);ctx.stroke();ctx.setLineDash([]);
   const maxD=A.step?64:80,cx=g.l+I/maxD*(W-g.l-g.r-30);ctx.font=`${A.narrow?24:28}px system-ui`;ctx.textAlign='center';ctx.save();ctx.translate(cx,road+8);ctx.scale(-1,1);ctx.fillText('🚗',0,0);ctx.restore();ctx.fillStyle='#e2e8f0';ctx.font='10px system-ui';for(let d=0;d<=maxD;d+=A.step?16:20)ctx.fillText(d+' m',g.l+d/maxD*(W-g.l-g.r-30),road+26)}
  if(st.n&&A.step===2){const tx=g.l+10,tw=W-g.l-g.r-20,ty=g.t+40+(A.narrow?20:0),k=(st.n-1)/49;ctx.fillStyle=A.alpha(C.tx,.15);P.rrect(tx,ty-4,tw,8,4);ctx.fill();P.glow(A.alpha(C.vi,.9),12);P.ball(tx+k*tw,ty,11,C.vi);P.noShadow();P.label(`strips: ${st.n}`,tx+k*tw,ty-20,{font:'700 12px system-ui',col:C.vi})}
  if(!A.isDone&&!st.drag&&A.step<4&&(A.step!==0&&A.step!==1||A.pred[A.step]!=null)){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label(A.step===2?'👆 drag the purple slider →':'👆 drag the yellow handle along the axis',W/2,H-10,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}};
 const set=(fn,xr,yr,a,b,n)=>{Object.assign(st,{fn,xr,yr,a,b,n})};
 const steps=[
  {h:'Cruise control',p:'A car drives at a steady 10 m/s. The graph shows its speed over time.',predict:{q:'How far does it go in 6 seconds?',opts:['16 m','60 m','10 m'],ans:1},task:'Drag the yellow handle to t = 6',show:()=>{st.b=6;upd();chk()},go:()=>{set('c10',[0,8],[0,14],0,0,0);chk=()=>{if(st.b===6)A.done('10 m/s × 6 s = 60 m: the distance is the area of the shaded rectangle under the speed graph.'+A.reveal(0))}}},
  {h:'Speeding up',p:'Now the car starts from rest and speeds up: v = 2t. After 6 s it is doing 12 m/s.',predict:{q:'How far does it go in those 6 seconds?',opts:['72 m (12 × 6)','36 m','12 m'],ans:1},task:'Drag the handle to t = 6',show:()=>{st.b=6;upd();chk()},go:()=>{set('t2',[0,8],[0,16],0,0,0);chk=()=>{if(st.b===6)A.done('The area is a triangle: ½ × 6 × 12 = 36 m. 12 × 6 would be true only if it had done 12 m/s the whole time.'+A.reveal(1))}}},
  {h:'Thinner strips',p:'For a curve there is no simple shape. Cover the area with rectangle strips and add them up.',predict:{q:'As the strips get thinner, the total…',opts:['settles on the exact area','keeps growing for ever','stays the same'],ans:0},task:'Use enough strips to get within 5% of the exact area',show:()=>{st.n=30;upd();chk()},go:()=>{set('q',[0,4.5],[0,6],0,4,2);chk=()=>{const e=Math.abs(strips(0,4,st.n)-integ(0,4))/integ(0,4);if(e<.05)A.done(`${st.n} strips: ${f1(strips(0,4,st.n))}, exact ${f1(integ(0,4))}. The definite integral ∫₀⁴ is the number the strips settle on.`+A.reveal(2))}}},
  {h:'Below the axis',p:'y = x − 2 dips below the x-axis before x = 2. Area below the axis counts as negative.',predict:{q:'What is the signed area from 0 to 4?',opts:['0','4','−4'],ans:0},task:'Drag b from 2 to 4',show:()=>{st.b=4;upd();chk()},go:()=>{set('l2',[-.5,4.5],[-3,3],0,2,0);chk=()=>{if(st.b===4)A.done('−2 below the axis and +2 above cancel: ∫₀⁴ (x − 2) dx = 0. The shaded area is 4, but the signed area is 0.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Pick a curve, drag a (purple) and b (yellow). Tap the graph to switch strips on or off. What happens if b is less than a?',go:()=>{set('s',[-.5,7],[-1.5,2.5],0,Math.PI,0);chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const snap=v=>A.step===2?v:Math.round(v*2)/2;
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;chips.hidden=A.step!==4;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);chips=c.el('div',{class:'fl-kb'},A.extra.parentNode);A.extra.parentNode.insertBefore(chips,chal);
   [['s','sin'],['q','x²/4 + 1'],['d','2 − x'],['k3','3']].forEach(([k,t])=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost'},chips,'y = '+t);b.onclick=()=>{st.fn=k;upd()}});
   A.gest({down:p=>{const s=A.step,g=geo(A),ya=g.Y(Math.max(st.yr[0],0));if(s===5&&st.won)return false;
     if(s===2){st.drag='n';mv(p);return true}
     if(s===4&&Math.hypot(p.x-g.X(st.a),p.y-ya)<30){st.drag='a';return true}
     if(Math.abs(p.x-g.X(st.b))<30&&Math.abs(p.y-ya)<40||s!==4&&p.y>g.t){st.drag='b';mv(p);return true}
     if(s===4){st.n=st.n?0:12;A.sound.pop();upd()}return false},
    move:p=>mv(p),up:p=>{if(p&&st.drag)mv(p);const d=st.drag;st.drag=null;A.redraw();if(A.step===5&&d==='b')judge()}})}});
 const mv=p=>{const d=st.drag;if(!d)return;const g=geo(A);if(d==='n'){const tx=g.l+10,tw=A.W-g.l-g.r-20,n=Math.max(1,Math.min(50,Math.round(1+(p.x-tx)/tw*49)));if(n!==st.n){st.n=n;A.sound.tick();upd();chk()}return}
  const v=Math.max(st.xr[0],Math.min(st.xr[1],snap(g.x(p.x))));if(v!==st[d]){st[d]=v;A.sound.tick();upd();chk()}};
 const Q=[['x2',9],['x2',16],['k3',12],['x1',8],['x2',4],['k3',9],['x1',4.5],['x2',25]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[fn,K]=Q[qi],ans=fn==='x2'?Math.sqrt(K):fn==='k3'?K/3:Math.sqrt(2*K);set(fn,[0,8],[0,fn==='x2'?16:fn==='k3'?5:8],0,0,0);st.q={fn,K,ans};st.won=false;
  chal.innerHTML=`<p><b>Drag b so that the area under ${FN[fn][1]} from 0 to b is exactly ${K}.</b> The readout stays hidden: work it out, then let go.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-m="-0.5" aria-label="b down 0.5">◀ b − 0.5</button> <button type="button" class="lbtn sm ghost" data-m="0.5" aria-label="b up 0.5">b + 0.5 ▶</button> <button type="button" class="lbtn sm" data-ok>Check</button></span>`;
  chal.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(!st.won){st.b=Math.max(0,Math.min(8,st.b+ +b.dataset.m));A.sound.tick();upd()}});chal.querySelector('[data-ok]').onclick=judge;upd()};
 const judge=()=>{const q=st.q,fb=chal.querySelector('.fl-fb'),b=st.b,I=integ(0,b);if(!q||st.won)return;
  if(Math.abs(I-q.K)<1e-6){st.won=true;fb.innerHTML=`✓ ${q.fn==='k3'?`3 × ${f1(b)}`:q.fn==='x2'?`½ × ${f1(b)} × ${f1(2*b)}`:`½ × ${f1(b)} × ${f1(b)}`} = ${q.K}. The area under the graph from 0 to ${f1(b)} is ${q.K}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();const fb_=F(b);fb.textContent=Math.abs(fb_-q.K)<1e-6?`At b = ${f1(b)} the height is ${q.K}, but the area is ${f1(I)}. Area, not height.`
   :q.fn!=='k3'&&Math.abs(b*fb_-q.K)<1e-6?`That is the rectangle b × height = ${q.K}. Under a sloping line the shape is a triangle: halve it.`
   :`Area from 0 to ${f1(b)} is ${f1(I)}: ${I<q.K?'too small, move b right':'too big, move b left'}.`};
 A.start()})})();
