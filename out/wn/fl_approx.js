/* Flagship – small changes and linear approximation (ages 17–18): zoom in on y = √x at x = 4 until the curve and its
   tangent merge; build √4.1 ≈ f(4) + f′(4)δx card by card; drag δx and watch the error fall by about 4 each time δx
   halves (error ∝ δx²); decide whether the tangent over- or under-estimates on concave and convex curves; then grow a
   circle by δr and compare the ring's true area with δA ≈ 2πr δr. */
(()=>{const sq=Math.sqrt,ab=Math.abs,cap=(v,a,b)=>Math.max(a,Math.min(b,v)),r4=v=>{const s=(Math.round(v*1e4)/1e4).toString();return v<0?'−'+s.slice(1):s};
 const CARD=[{q:'f(4) = √4 = ?',o:[['2',''],['4','√4 is the number that squares to 4, so f(4) = 2.'],['16','16 is 4 squared. The root of 4 is 2.']]},
  {q:'f′(x) = 1/(2√x), so f′(4) = ?',o:[['1/(2√4.1)','Use the slope at a = 4, where you know √ exactly. Needing √4.1 to find the slope defeats the point.'],['1/4',''],['1/2','1/(2√4) = 1/(2 × 2) = 1/4. You dropped the √4.']]},
  {q:'δx = ?',o:[['4.1','δx is the small step, not the new x: 4.1 − 4.'],['4','δx is the step from 4 to 4.1.'],['0.1','']]},
  {q:'√4.1 ≈ f(4) + f′(4)·δx = ?',o:[['0.025','That is δy alone. Add it to f(4) = 2.'],['2.025',''],['2.25','f′(4)·δx = 0.25 × 0.1 = 0.025, not 0.25.']]}];
 const BEND=[{n:'y = √x at x = 4',f:sq,d:x=>.5/sq(x),a:4,v:[0,8,-.5,3.2],k:0,why:'√x bends down (f″ < 0), so the tangent lies above it: an over-estimate.'},
  {n:'y = eˣ at x = 0',f:Math.exp,d:Math.exp,a:0,v:[-2,2,-.5,5],k:1,why:'eˣ bends up (f″ > 0), so the tangent lies below it: an under-estimate.'},
  {n:'y = ln x at x = 1',f:Math.log,d:x=>1/x,a:1,v:[.2,3,-1.6,1.4],k:0,why:'ln x bends down (f″ = −1/x² < 0), so the tangent lies above: an over-estimate.'}];
 const RING=[['2π·5·0.1 = π ≈ 3.14 cm²',''],['π·0.1² ≈ 0.031 cm²','That is the area of a circle of radius δr. The change is a thin ring all round: 2πr·δr.'],['π·5.1² ≈ 81.7 cm²','That is the new area. δA is the change: about 81.7 − 78.5.']];
VIS.reg('flagapprox',c=>{let A,pad,qb;
 const Z={w:3,dx:1,seen:{},ci:0,miss:-1,bi:0,ans:[],dr:.5,ring:0,hold:null,gen:0,want:()=>{}};
 const pane=()=>['zoom','build','err','bend','ring','quiz'][A.step];
 const F=(n,w)=>`${w||700} ${Math.round(n*(A.narrow?1:1.12))}px system-ui,sans-serif`;
 const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const put=(g,t,x,y,n,k,w,al)=>{g.font=F(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y,A.W-10)};
 const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const plotR=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.54}:{x:6,y:6,w:A.W*.57,h:A.H-12};
 const sideR=()=>A.narrow?{x:6,y:A.H*.56,w:A.W-12,h:A.H*.44-6}:{x:A.W*.59+2,y:6,w:A.W*.41-10,h:A.H-12};
 function frame(v){const R=plotR(),[x0,x1,y0,y1]=v,kx=(R.w-20)/(x1-x0),ky=(R.h-20)/(y1-y0);return{px:x=>R.x+10+(x-x0)*kx,py:y=>R.y+R.h-10-(y-y0)*ky,ux:p=>x0+(p-R.x-10)/kx,v}}
 function grid(g,m){const C=A.col,R=plotR(),[x0,x1,y0,y1]=m.v;g.fillStyle=A.alpha(C.mu,.08);A.paint.rrect(R.x,R.y,R.w,R.h,10);g.fill();g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.2;g.beginPath();
  if(y0<=0&&y1>=0){g.moveTo(R.x,m.py(0));g.lineTo(R.x+R.w,m.py(0))}if(x0<=0&&x1>=0){g.moveTo(m.px(0),R.y);g.lineTo(m.px(0),R.y+R.h)}g.stroke()}
 function trace(g,m,f,col,lw,dash){const R=plotR(),[x0,x1]=m.v;g.save();g.beginPath();g.rect(R.x,R.y,R.w,R.h);g.clip();g.strokeStyle=col;g.lineWidth=lw||3;if(dash)g.setLineDash(dash);g.beginPath();let pen=0;
  for(let i=0;i<=220;i++){const x=x0+(x1-x0)*i/220,y=f(x);if(!isFinite(y)){pen=0;continue}pen?g.lineTo(m.px(x),m.py(y)):g.moveTo(m.px(x),m.py(y));pen=1}g.stroke();g.restore()}
 const T4=x=>2+(x-4)/4;
 const L=i=>{const s=sideR();return s.y+14+i*(A.narrow?19:Math.max(24,s.h*.12))};const barR=()=>{const s=sideR();return{x:s.x+20,y:s.y+s.h-44,w:s.w-40,h:28}};
 function bar(g,v,a,b,label,ticks,log){const C=A.col,r=barR(),pos=t=>r.x+(log?(Math.log(t/a)/Math.log(b/a)):(t-a)/(b-a))*r.w,y=r.y+r.h/2;g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=3;g.beginPath();g.moveTo(r.x,y);g.lineTo(r.x+r.w,y);g.stroke();
  ticks.forEach(([t,l])=>{g.lineWidth=1.5;g.beginPath();g.moveTo(pos(t),y-6);g.lineTo(pos(t),y+6);g.stroke();put(g,l,pos(t),y+16,10,C.tx,600)});A.paint.ball(pos(v),y,11,C.or);put(g,label,r.x,r.y-8,11,C.tx,800,'left')}
 const fromBar=(p,a,b,log)=>{const r=barR(),u=cap((p.x-r.x)/r.w,0,1);return log?a*Math.pow(b/a,u):a+u*(b-a)};
 const nearBar=p=>{const r=barR();return p.y>r.y-14&&p.y<r.y+r.h+14&&p.x>r.x-16&&p.x<r.x+r.w+16};
 // ---- zoom ----
 const gap=w=>ab(sq(4+w)-T4(4+w));
 function zoomV(g){const C=A.col,s=sideR(),w=Z.w,m=frame([4-w,4+w,T4(4-w)-w*.12,T4(4+w)+w*.12]);grid(g,m);trace(g,m,sq,C.ac,3.5);trace(g,m,T4,C.gr,2,[7,5]);A.paint.ball(m.px(4),m.py(2),7,C.or);
  put(g,'√x (blue) and tangent y = 2 + (x − 4)/4 (green)',s.x+s.w/2,L(0),11,C.tx,800);put(g,`window: x = 4 ± ${r4(w)}`,s.x+s.w/2,L(1),13,C.tx,700);
  put(g,`gap at the edge = ${gap(w).toExponential(1)}`,s.x+s.w/2,L(2),13,w<=.15?C.gr:C.rd,800);put(g,w<=.15?'They look the same: locally straight':'Zoom in more',s.x+s.w/2,L(3),12,C.tx,700);
  bar(g,w,.05,4,'zoom half-width (drag or pinch)',[[.1,'0.1'],[.5,'0.5'],[2,'2']],1)}
 function setW(w){Z.w=cap(w,.05,4);say()}
 // ---- build √4.1 ----
 const optR=j=>{const s=sideR(),h=A.narrow?30:Math.min(40,s.h*.17);return{x:s.x+8,y:L(2)-4+j*(h+7),w:s.w-16,h}};
 function buildV(g){const C=A.col,s=sideR(),m=frame([3.4,4.5,1.8,2.15]);grid(g,m);trace(g,m,sq,C.ac,3.5);trace(g,m,T4,C.gr,2,[7,5]);
  const X=m.px(4),X1=m.px(4.1),Y=m.py(2),Y1=m.py(2.025);A.paint.ball(X,Y,6,C.or);g.strokeStyle=C.tx;g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(X,Y);g.lineTo(X1,Y);g.lineTo(X1,Y1);g.stroke();g.setLineDash([]);
  put(g,'δx',(X+X1)/2,Y+14,11,C.tx,800);put(g,'δy',X1+14,(Y+Y1)/2,11,C.tx,800);
  put(g,['','f(4) = 2','f′(4) = 1/4','δx = 0.1','√4.1 ≈ 2.025 (true 2.02485)'][Z.bi],s.x+s.w/2,L(0),13,C.gr,800);
  if(Z.bi>=4){put(g,'error ≈ 0.00015',s.x+s.w/2,L(1),12,C.tx,700);return}
  const q=CARD[Z.bi];put(g,q.q,s.x+s.w/2,L(1),12,C.tx,800);q.o.forEach(([t],j)=>{const r=optR(j),bad=Z.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.cy,.14);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=bad?3:1.5;g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)})}
 function choose(j){if(Z.bi>=4)return;const o=CARD[Z.bi].o[j];if(o[1]){Z.miss=j;A.sound.miss();note(o[1]);A.redraw();return}Z.miss=-1;Z.bi++;A.sound.pop();say(o[0]+' ✓')}
 // ---- error vs dx ----
 function errV(g){const C=A.col,s=sideR(),h=Z.dx,m=frame([3.5,6.2,1.8,2.65]);grid(g,m);trace(g,m,sq,C.ac,3.5);trace(g,m,T4,C.gr,2,[7,5]);
  const X=m.px(4+h);g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(X,m.py(sq(4+h)));g.lineTo(X,m.py(T4(4+h)));g.stroke();A.paint.ball(m.px(4),m.py(2),6,C.or);
  const e=T4(4+h)-sq(4+h);put(g,`δx = ${r4(h)}`,s.x+s.w/2,L(0),13,C.tx,800);put(g,`tangent ${r4(T4(4+h))}   true ${r4(sq(4+h))}`,s.x+s.w/2,L(1),12,C.tx,700);
  put(g,`error = ${r4(e)}`,s.x+s.w/2,L(2),14,C.rd,800);put(g,`error ÷ δx² = ${r4(e/(h*h))}`,s.x+s.w/2,L(3),12,C.tx,700);
  put(g,`tried δx = 1, 0.5, 0.25: ${Object.keys(Z.seen).length} of 3`,s.x+s.w/2,L(4),11,C.tx,700);bar(g,h,.05,2,'δx (drag)',[[.25,'.25'],[.5,'.5'],[1,'1'],[2,'2']])}
 function setDx(h){Z.dx=cap(h,.05,2);for(const k of[1,.5,.25])if(ab(Z.dx-k)<.03){Z.dx=k;if(!Z.seen[k]){Z.seen[k]=1;A.sound.pop()}}say()}
 // ---- over or under ----
 const half=j=>{const s=sideR(),y=L(3);return{x:s.x+8+j*(s.w/2-4),y,w:s.w/2-12,h:Math.min(64,s.y+s.h-y-6)}};
 function bendV(g){const C=A.col,s=sideR();if(Z.ci>=3){put(g,'Concave: over. Convex: under.',A.W/2,A.H/2,16,C.gr,800);return}const B=BEND[Z.ci],m=frame(B.v),tl=x=>B.f(B.a)+B.d(B.a)*(x-B.a);grid(g,m);trace(g,m,B.f,C.ac,3.5);trace(g,m,tl,C.gr,2.5,[7,5]);A.paint.ball(m.px(B.a),m.py(B.f(B.a)),7,C.or);
  put(g,B.n,s.x+s.w/2,L(0),13,C.tx,800);put(g,`curve ${Z.ci+1} of 3: does the tangent estimate`,s.x+s.w/2,L(1),11,C.tx,700);put(g,'come out too big or too small?',s.x+s.w/2,L(2),11,C.tx,700);
  ['Over (too big)','Under (too small)'].forEach((t,j)=>{const r=half(j),bad=Z.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.vi,.14);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=bad?C.rd:C.vi;g.lineWidth=bad?3:1.5;g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,12,C.tx,800)})}
 function judge(j){if(Z.ci>=3)return;const B=BEND[Z.ci];if(j!==B.k){Z.miss=j;A.sound.miss();note('Look at which side the green tangent is on. '+B.why);A.redraw();return}Z.miss=-1;Z.ci++;A.sound.pop();say(B.why)}
 // ---- ring ----
 function ringV(g){const C=A.col,s=sideR(),R=plotR(),cx=R.x+R.w/2,cy=R.y+R.h/2,u=Math.min(R.w,R.h)*.42/6.2,r=5,d=Z.dr;
  g.fillStyle=A.alpha(C.cy,.25);g.beginPath();g.arc(cx,cy,r*u,0,2*Math.PI);g.fill();g.fillStyle=A.alpha(C.rd,.55);g.beginPath();g.arc(cx,cy,(r+d)*u,0,2*Math.PI);g.moveTo(cx+r*u,cy);g.arc(cx,cy,r*u,2*Math.PI,0,true);g.fill();
  g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+r*u,cy);g.stroke();put(g,'r = 5',cx+r*u/2,cy-10,12,C.tx,800);
  const ex=Math.PI*((r+d)**2-r*r),ap=2*Math.PI*r*d;put(g,`δr = ${r4(d)} cm`,s.x+s.w/2,L(0),13,C.tx,800);put(g,`ring, exact: ${r4(ex)} cm²`,s.x+s.w/2,L(1),12,C.tx,700);
  put(g,`2πr·δr: ${r4(ap)} cm²  (${(100*ab(ex-ap)/ex).toFixed(1)}% off)`,s.x+s.w/2,L(2),12,C.gr,800);
  if(ab(d-.1)>1e-9){put(g,'Set δr to 0.1, then pick δA',s.x+s.w/2,L(3),11,C.tx,700)}else if(!Z.ring){put(g,A.narrow?'δA ≈ (dA/dr)·δr = ? Pick below.':'δA ≈ (dA/dr)·δr = ?',s.x+s.w/2,L(3),11,C.tx,800);
   if(!A.narrow)RING.forEach(([t],j)=>{const q=ringOpt(j),bad=Z.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.cy,.14);A.paint.rrect(q.x,q.y,q.w,q.h,8);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=bad?3:1.5;g.stroke();put(g,t,q.x+q.w/2,q.y+q.h/2,11,C.tx,800)})}
  else put(g,'δA ≈ π cm² ✓',s.x+s.w/2,L(3),13,C.gr,800);bar(g,d,.02,1,'δr (drag)',[[.1,'0.1'],[.5,'0.5'],[1,'1']])}
 const ringOpt=j=>{const s=sideR(),h=Math.min(30,s.h*.11);return A.narrow?null:{x:s.x+8,y:L(4)-6+j*(h+5),w:s.w-16,h}};
 function setDr(d){Z.dr=cap(d,.02,1);if(ab(Z.dr-.1)<.02)Z.dr=.1;say()}
 function ringPick(j){if(Z.ring||ab(Z.dr-.1)>1e-9)return;const o=RING[j];if(o[1]){Z.miss=j;A.sound.miss();note(o[1]);A.redraw();return}Z.miss=-1;Z.ring=1;A.sound.pop();say('δA ≈ 2πr·δr = π.')}
 function draw(A){const{ctx:g,W,H,col:C}=A,s=pane();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.3);g.fillRect(0,0,W,H);
  if(s==='quiz'){put(g,'f(a + δx) ≈ f(a) + f′(a)·δx',W/2,H/2,20,C.tx,800);return}({zoom:zoomV,build:buildV,err:errV,bend:bendV,ring:ringV})[s](g);A.fx.draw(g)}
 function say(pre){const s=pane();let t='';
  if(s==='zoom')t=`Window x = 4 plus or minus ${r4(Z.w)}. Gap between curve and tangent ${gap(Z.w).toExponential(1)}.`;
  if(s==='build')t=Z.bi<4?CARD[Z.bi].q:'√4.1 ≈ 2.025; true value 2.02485.';
  if(s==='err'){const e=T4(4+Z.dx)-sq(4+Z.dx);t=`δx = ${r4(Z.dx)}, error ${r4(e)}. Tried ${Object.keys(Z.seen).length} of 3.`}
  if(s==='bend')t=Z.ci<3?BEND[Z.ci].n+': over or under?':'All three curves judged.';
  if(s==='ring')t=`δr = ${r4(Z.dr)}. Exact ring ${r4(Math.PI*((5+Z.dr)**2-25))}, estimate ${r4(10*Math.PI*Z.dr)}.`+(Z.ring?' δA ≈ π.':'');
  note((pre?pre+' ':'')+t);pads();Z.want()}
 function pads(){if(!A||!pad)return;pad.innerHTML='';const s=pane(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':al||null},pad,t);e.onclick=f};
  if(s==='zoom'){B('Zoom in ×2',()=>setW(Z.w/2));B('Zoom out ×2',()=>setW(Z.w*2))}
  if(s==='build'&&Z.bi<4)CARD[Z.bi].o.forEach((o,j)=>B(o[0],()=>choose(j)));
  if(s==='err')[1,.5,.25].forEach(k=>B(`δx = ${k}`,()=>setDx(k)));
  if(s==='bend'&&Z.ci<3){B('Over (too big)',()=>judge(0));B('Under (too small)',()=>judge(1))}
  if(s==='ring'){B('δr = 0.1',()=>setDr(.1));B('δr = 0.5',()=>setDr(.5));if(!Z.ring&&ab(Z.dr-.1)<1e-9)RING.forEach((o,j)=>B(o[0],()=>ringPick(j)))}A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gp)=>{const g=Z.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===Z.gen)f()},A.reduced()?j*20:j*gp))};
 const fresh=()=>{Z.gen++;Z.want=()=>{};Z.miss=-1;Z.hold=null};
 const steps=[
  {h:'Zoom in on a tangent',p:'Here is y = √x and its tangent at x = 4. Drag the bar (or pinch the graph) to zoom in on the point.',
   predict:{q:'Zoom right in on √x at x = 4. What will you see?',opts:['Still a clear curve','Almost a straight line: the tangent'],ans:1},task:'Zoom in until the window is x = 4 ± 0.15 or less',
   show:()=>{steps[0].go();seq([1.5,.75,.38,.19,.1].map(w=>()=>setW(w)),350)},go:()=>{fresh();Z.w=3;say();Z.want=ok(0,()=>Z.w<=.15,()=>'Close to x = 4 the curve is almost its tangent, so the tangent can stand in for it.')}},
  {h:'Estimate √4.1',p:'Use what you know at x = 4 to step a small δx along the tangent: f(4 + δx) ≈ f(4) + f′(4)·δx.',
   predict:{q:'To estimate √4.1, which slope do you use?',opts:['The slope at 4.1','The slope at 4, where √ is known'],ans:1},task:'Pick all four cards',
   show:()=>{steps[1].go();seq([0,1,2,1].map(j=>()=>choose(j)),400)},go:()=>{fresh();Z.bi=0;say();Z.want=ok(1,()=>Z.bi>=4,()=>'√4.1 ≈ 2 + ¼ × 0.1 = 2.025, against a true 2.02485.')}},
  {h:'How good is it?',p:'The red bar is the error: tangent minus true value. Drag δx and read error ÷ δx².',
   predict:{q:'If you halve δx, what happens to the error?',opts:['It halves','It falls to about a quarter'],ans:1},task:'Try δx = 1, 0.5 and 0.25',
   show:()=>{steps[2].go();seq([1,.5,.25].map(k=>()=>setDx(k)),400)},go:()=>{fresh();Z.dx=1.5;Z.seen={};say();Z.want=ok(2,()=>Object.keys(Z.seen).length>=3,()=>'error ÷ δx² stays near 1/64, so the error shrinks like δx²: small δx, tiny error.')}},
  {h:'Over or under?',p:'The tangent is a straight line; the curve bends away from it. Which way it bends decides the sign of the error.',task:'Judge all three curves',
   show:()=>{steps[3].go();seq(BEND.map(b=>()=>judge(b.k)),450)},go:()=>{fresh();Z.ci=0;say();Z.want=ok(3,()=>Z.ci>=3,()=>'f″ < 0 (concave): over-estimate. f″ > 0 (convex): under-estimate.')}},
  {h:'A small change in area',p:'A circle of radius 5 cm grows by δr. The red ring is δA. Since A = πr², dA/dr = 2πr.',
   predict:{q:'r goes from 5 cm to 5.1 cm. Roughly how much does the area grow?',opts:['About 0.03 cm²','About 3 cm²'],ans:1},task:'Set δr = 0.1 and pick δA',
   show:()=>{steps[4].go();seq([()=>setDr(.1),()=>ringPick(0)],450)},go:()=>{fresh();Z.dr=.5;Z.ring=0;say();Z.want=ok(4,()=>Z.ring,()=>'δA ≈ 2πr·δr = π ≈ 3.14 cm²; the exact ring is 3.17 cm².')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz.next()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
 const QZ=[['Use the tangent to y = √x at x = 25 to estimate √26.',[['5.1','ok'],['5.01','dx'],['26.1','base']]],
  ['y = x³. Estimate δy when x goes from 2 to 2.01.',[['0.12','ok'],['8.12','new'],['0.04','slope']]],
  ['Estimate (1.02)⁵ using y = x⁵ at x = 1.',[['1.1','ok'],['1.02','slope'],['0.1','delta']]],
  ['A circle of radius 10 cm grows by 0.2 cm. Estimate δA.',[['4π cm²','ok'],['0.04π cm²','tiny'],['0.4π cm²','nor']]],
  ['Why is the tangent estimate of √4.1 slightly too big?',[['√x is concave, so the tangent lies above it','ok'],['Rounding in the calculator','round'],['Because δx is positive','sign']]],
  ['When is δy ≈ (dy/dx)·δx a good estimate?',[['When δx is small','ok'],['When δx is large','big'],['It is always exact','exact']]]];
 const quiz=(()=>{let n=-1,run=0,box;const next=()=>{n++;const[q,ops]=QZ[n%QZ.length],r=n%3;box.hidden=false;
   box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tg)});note('Challenge: '+q)};
  const grade=tg=>{box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=box.querySelector('.fl-fb');let m;
   switch(tg){case 'ok':m='Correct.';break;
    case 'dx':m='δx is 26 − 25 = 1, not 0.1. f′(25) = 1/10, so √26 ≈ 5 + 1/10 = 5.1.';break;
    case 'base':m='Start from f(25) = 5, not from 26. Then add f′(25)·δx = 0.1.';break;
    case 'new':m='8.12 is the new y. δy is the change: (dy/dx)·δx = 12 × 0.01 = 0.12.';break;
    case 'slope':m='Use dy/dx at the known point and multiply by δx: δy ≈ f′(a)·δx.';break;
    case 'delta':m='0.1 is only δy. Add it to f(1) = 1: 1.1.';break;
    case 'tiny':m='0.04π is π·δr², a tiny circle. The ring is about 2πr·δr = 2π × 10 × 0.2.';break;
    case 'nor':m='You left out r: dA/dr = 2πr, so δA ≈ 2π × 10 × 0.2 = 4π.';break;
    case 'round':m='The error is real, not rounding: √x bends below its tangent, so the line overshoots.';break;
    case 'sign':m='The sign of δx does not decide it; the bend does. √x is concave, so the tangent is above on both sides.';break;
    case 'big':m='The error grows like δx², so large steps give large errors.';break;
    default:m='It is an approximation. The error is about ½f″(a)·δx², zero only for straight lines.'}
   const good=tg==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next};
  return{set:b=>box=b,next}})();
 function down(p){const s=pane();
  if(s==='zoom'&&(nearBar(p)||on(p,plotR()))){Z.hold=nearBar(p)?'w':'pan';if(Z.hold==='w')setW(fromBar(p,.05,4,1));return true}
  if(s==='err'&&nearBar(p)){Z.hold='dx';setDx(fromBar(p,.05,2));return true}
  if(s==='err'&&on(p,plotR())){Z.hold='px';setDx(frame([3.5,6.2,0,1]).ux(p.x)-4);return true}
  if(s==='ring'&&nearBar(p)){Z.hold='dr';setDr(fromBar(p,.02,1));return true}
  if(s==='ring'){for(let j=0;j<3;j++)if(on(p,ringOpt(j))){ringPick(j);break}return false}
  if(s==='build')for(let j=0;j<3;j++)if(on(p,optR(j))){choose(j);break}
  if(s==='bend')for(let j=0;j<2;j++)if(on(p,half(j))){judge(j);break}return false}
 function move(p){const h=Z.hold;if(h==='w')setW(fromBar(p,.05,4,1));else if(h==='dx')setDx(fromBar(p,.05,2));else if(h==='px')setDx(frame([3.5,6.2,0,1]).ux(p.x)-4);else if(h==='dr')setDr(fromBar(p,.02,1))}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{const q=A.step===5;qb.hidden=!q;pad.hidden=q;pads()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);qb=c.el('div',{class:'fl-chal'},A.below);quiz.set(qb);
   A.gest({down,move,up:()=>{Z.hold=null},pinch:k=>{if(pane()==='zoom')setW(Z.w/k)}});pads()}});
 A.start()})})();
