/* Flagship – arc length of a curve (ages 17–18): add chords along y = x² and watch the total settle on 1.479;
build δs = √(1 + (dy/dx)²) δx from a tiny right-angled triangle; drag the end of the catenary y = cosh x to ln 2
and read s = sinh b = 3/4; sweep a parametric circle where the integrand is the constant r; pick the arc-length
integral from area and slip look-alikes; then a challenge on the classic slips. */
(()=>{const PI=Math.PI,TAU=2*PI,LN2=Math.log(2),fm=(x,d)=>{const k=10**(d||2),r=Math.round(x*k)/k;return(r<0?'−':'')+Math.abs(r)};
const sq=x=>x*x,EXACT=(2*Math.sqrt(5)+Math.log(2+Math.sqrt(5)))/4;
const chordLen=n=>{let s=0;for(let i=0;i<n;i++){const a=i/n,b=(i+1)/n;s+=Math.hypot(b-a,b*b-a*a)}return s};
const TRI=[{q:'Sides δx and δy. So δs ≈ ?',o:[['√(δx² + δy²)',''],['δx + δy','Two sides of a triangle are longer than the third. Use Pythagoras: δs² = δx² + δy².'],['δx × δy','δx × δy is an area, not a length. Use Pythagoras.']]},
{q:'Take δx out of the root.',o:[['(1 + δy/δx) δx','The root of a sum is not the sum of roots. Keep the square root.'],['√(1 + δy/δx) δx','δy² ÷ δx² is (δy/δx)². The ratio must be squared.'],['√(1 + (δy/δx)²) δx','']]},
{q:'Let δx → 0 and add the pieces.',o:[['s = ∫ y dx','∫ y dx is the area under the curve, not its length.'],['s = ∫ √(1 + (dy/dx)²) dx',''],['s = ∫ (1 + dy/dx) dx','The square and the square root have gone. Keep √(1 + (dy/dx)²).']]}];
// [question, curve fx,fy over t0..t1, view, options [text, ok, why]]
const PICK=[['y = x²,  0 ≤ x ≤ 1',t=>t,t=>t*t,0,1,[-.3,1.3,-.2,1.3],[['∫₀¹ √(1 + x⁴) dx',0,'That squares y, not dy/dx. Here dy/dx = 2x, so (dy/dx)² = 4x².','y'],['∫₀¹ √(1 + 4x²) dx',1,''],['∫₀¹ x² dx',0,'∫ y dx is the shaded area under the curve, not the length.','area']]],
['y = cosh x,  0 ≤ x ≤ ln 2',t=>t,Math.cosh,0,LN2,[-.3,1.1,-.1,1.6],[['∫ (1 + sinh x) dx',0,'The square and root have gone. 1 + sinh²x = cosh²x, so the root is cosh x.'],['∫ √(1 + cosh²x) dx',0,'That uses y, not dy/dx. dy/dx = sinh x.','y'],['∫₀^ln2 cosh x dx',1,'']]],
['x = t², y = t³,  0 ≤ t ≤ 1',t=>t*t,t=>t**3,0,1,[-.3,1.3,-.2,1.3],[['∫₀¹ √(4t² + 9t⁴) dt',1,''],['∫₀¹ √(1 + 9t⁴) dt',0,'In t form there is no 1: use (dx/dt)² + (dy/dt)² = 4t² + 9t⁴.'],['∫₀¹ √(4t² + 9t⁴) dx',0,'The limits are values of t, so integrate with respect to t: dt.']]]];
const NP=PICK.length;
VIS.reg('flagarclen',c=>{let A,pad,quiz;
const K={n:1,seen:{},b:0,miss:-1,e:.2,r:1,th:0,round:0,shade:0,drag:null,tok:0,onChange:()=>{}};
const stage=()=>['chord','tri','cat','circ','pick','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1.05:1.2)),fnt=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,n,col,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const plotR=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.5}:{x:6,y:6,w:A.W*.56,h:A.H-12};
const panR=()=>A.narrow?{x:6,y:A.H*.52,w:A.W-12,h:A.H*.48-6}:{x:A.W*.58+4,y:6,w:A.W*.42-14,h:A.H-12};
const VIEW={chord:[-.2,1.2,-.2,1.2],tri:[.3,1,.05,.85],cat:[-.2,1.7,-.2,2.9],circ:[-4.6,4.6,-4.6,4.6]};
const view=()=>stage()==='pick'?PICK[Math.min(K.round,NP-1)][5]:VIEW[stage()]||[-1,1,-1,1];
function map(){const r=plotR(),[x0,x1,y0,y1]=view(),s=Math.min((r.w-20)/(x1-x0),(r.h-20)/(y1-y0)),cx=r.x+r.w/2-(x0+x1)/2*s,cy=r.y+r.h/2+(y0+y1)/2*s;
return{X:x=>cx+x*s,Y:y=>cy-y*s,ix:px=>(px-cx)/s,iy:py=>(cy-py)/s,s}}
function plane(g){const C=A.col,r=plotR(),M=map();g.save();g.fillStyle=A.alpha(C.mu,.06);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
g.strokeStyle=A.alpha(C.tx,.7);g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,M.Y(0));g.lineTo(r.x+r.w,M.Y(0));g.moveTo(M.X(0),r.y);g.lineTo(M.X(0),r.y+r.h);g.stroke();
put(g,'x',r.x+r.w-10,M.Y(0)-10,11,C.tx);put(g,'y',M.X(0)+10,r.y+12,11,C.tx);g.restore();return M}
function path(g,M,fx,fy,a,b,col,w,dash){g.save();const r=plotR();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;if(dash)g.setLineDash(dash);g.beginPath();
for(let i=0;i<=160;i++){const t=a+(b-a)*i/160,X=M.X(fx(t)),Y=M.Y(fy(t));i?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke();g.restore()}
function area(g,M,fx,fy,a,b,col){g.save();g.fillStyle=col;g.beginPath();g.moveTo(M.X(fx(a)),M.Y(0));for(let i=0;i<=80;i++){const t=a+(b-a)*i/80;g.lineTo(M.X(fx(t)),M.Y(fy(t)))}g.lineTo(M.X(fx(b)),M.Y(0));g.fill();g.restore()}
const dot=(g,X,Y,col,r)=>{g.fillStyle=col;g.beginPath();g.arc(X,Y,r||6,0,7);g.fill()};
const trackR=()=>{const p=panR();return{x:p.x+16,y:p.y+p.h-46,w:p.w-32,h:28}};
const ln=i=>panR().y+z(10)+i*z(19);
function track(g,lo,hi,val,lab,ticks){const C=A.col,r=trackR(),X=v=>r.x+(v-lo)/(hi-lo)*r.w;g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=3;g.beginPath();g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke();
(ticks||[]).forEach(([v,t])=>{g.lineWidth=1.5;g.beginPath();g.moveTo(X(v),r.y+r.h/2-6);g.lineTo(X(v),r.y+r.h/2+6);g.stroke();put(g,t,X(v),r.y+r.h+8,10,C.tx,600)});
A.paint.ball(X(val),r.y+r.h/2,11,C.or);put(g,lab,r.x,r.y-10,11,C.tx,800,'left')}
const trackVal=(p,lo,hi)=>{const r=trackR();return lo+Math.max(0,Math.min(1,(p.x-r.x)/r.w))*(hi-lo)};
const cardR=j=>{const p=panR(),y0=ln(2.6),h=Math.min(z(36),(p.y+p.h-y0)/3-6);return{x:p.x+8,y:y0+j*(h+6),w:p.w-16,h}};
function cards(g,q,opts){const C=A.col,p=panR();put(g,q,p.x+p.w/2,ln(1.8),12,C.tx,800);
opts.forEach((t,j)=>{const r=cardR(j),bad=K.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.cy,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=bad?3:1.5;g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,13,C.tx,800)})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const m=stage();if(m==='quiz'){put(g,'s = ∫ √(1 + (dy/dx)²) dx',W/2,H/2,20,C.tx,800);return}
const M=plane(g),p=panR(),mid=p.x+p.w/2;
if(m==='chord'){path(g,M,t=>t,sq,0,1,A.alpha(C.tx,.35),2,[6,5]);g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();for(let i=0;i<=K.n;i++){const x=i/K.n;i?g.lineTo(M.X(x),M.Y(x*x)):g.moveTo(M.X(x),M.Y(0))}g.stroke();
for(let i=0;i<=K.n;i++)dot(g,M.X(i/K.n),M.Y(sq(i/K.n)),C.or,K.n>8?3:5);put(g,'y = x²,  0 ≤ x ≤ 1',mid,ln(0),13,C.tx,800);
put(g,`${K.n} chord${K.n>1?'s':''}: total ${fm(chordLen(K.n),4)}`,mid,ln(1),14,C.gr,800);
put(g,[1,2,4,8,16].filter(n=>K.seen[n]).map(n=>`${n}→${fm(chordLen(n),3)}`).join('  '),mid,ln(2),10,C.tx,700);
if(K.n>=16)put(g,`Exact length: ${fm(EXACT,4)}`,mid,ln(3),12,C.tx,800);track(g,0,4,Math.log2(K.n),'chords n (drag)',[0,1,2,3,4].map(v=>[v,String(2**v)]))}
if(m==='tri'){path(g,M,t=>t,sq,0,1,C.ac,3);const a=.5,b=.75,X0=M.X(a),Y0=M.Y(a*a),X1=M.X(b),Y1=M.Y(b*b);g.strokeStyle=C.or;g.lineWidth=2.5;g.setLineDash([6,4]);g.beginPath();g.moveTo(X0,Y0);g.lineTo(X1,Y0);g.lineTo(X1,Y1);g.stroke();g.setLineDash([]);
g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(X0,Y0);g.lineTo(X1,Y1);g.stroke();put(g,'δx',(X0+X1)/2,Y0+14,13,C.tx,800);put(g,'δy',X1+18,(Y0+Y1)/2,13,C.tx,800);put(g,'δs',(X0+X1)/2-18,(Y0+Y1)/2-8,13,C.tx,800);
put(g,['Zoom in on one tiny piece','δs ≈ √(δx² + δy²)','δs ≈ √(1 + (δy/δx)²) δx','s = ∫ √(1 + (dy/dx)²) dx ✓'][K.b],mid,ln(0),13,C.gr,800);
if(K.b<3)cards(g,TRI[K.b].q,TRI[K.b].o.map(o=>o[0]));else{put(g,'Each piece is nearly straight,',mid,ln(1.5),12,C.tx,700);put(g,'so Pythagoras works.',mid,ln(2.5),12,C.tx,700)}}
if(m==='cat'){const e=K.e;path(g,M,t=>t,Math.cosh,-.2,1.6,A.alpha(C.tx,.35),2,[6,5]);path(g,M,t=>t,Math.cosh,0,e,C.ac,4);dot(g,M.X(e),M.Y(Math.cosh(e)),C.or,8);dot(g,M.X(0),M.Y(1),C.or,5);
put(g,'y = cosh x,  dy/dx = sinh x',mid,ln(0),12,C.tx,800);put(g,'1 + sinh²x = cosh²x',mid,ln(1),12,C.tx,700);
put(g,`s = ∫₀ᵇ cosh x dx = sinh b`,mid,ln(2),13,C.gr,800);put(g,`b = ${fm(e,3)}${Math.abs(e-LN2)<.001?' = ln 2':''}  →  s = ${fm(Math.sinh(e),3)}`,mid,ln(3),13,C.tx,800);
track(g,0,1.5,e,'end b (drag)',[[0,'0'],[LN2,'ln 2'],[1.5,'1.5']])}
if(m==='circ'){const r=K.r,th=K.th;path(g,M,t=>r*Math.cos(t),t=>r*Math.sin(t),0,TAU,A.alpha(C.tx,.3),1.5,[5,5]);if(th>0)path(g,M,t=>r*Math.cos(t),t=>r*Math.sin(t),0,th,C.ac,5);
dot(g,M.X(r*Math.cos(th)),M.Y(r*Math.sin(th)),C.or,8);put(g,`x = ${r} cos t,  y = ${r} sin t`,mid,ln(0),13,C.tx,800);
put(g,`(dx/dt)² + (dy/dt)² = ${r*r}`,mid,ln(1),12,C.tx,700);put(g,`s = ∫ ${r} dt, t from 0 to θ, = ${r}θ`,mid,ln(2),13,C.gr,800);
put(g,`θ = ${fm(th)}  →  s = ${fm(r*th)}`,mid,ln(3),13,C.tx,800);track(g,0,TAU,th,'θ (drag)',[[0,'0'],[PI/2,'π/2'],[PI,'π'],[TAU,'2π']])}
if(m==='pick'){const R=PICK[Math.min(K.round,NP-1)],[q,fx,fy,a,b]=R;if(K.shade)area(g,M,fx,fy,a,b,A.alpha(C.rd,.25));path(g,M,fx,fy,a,b,K.round>=NP?C.gr:C.ac,4);
if(K.round>=NP){put(g,'All three found',mid,ln(0),13,C.gr,800);put(g,'Square the derivatives, add,',mid,ln(1),12,C.tx,700);put(g,'take the root, integrate.',mid,ln(2),12,C.tx,700)}else{put(g,`Curve ${K.round+1} of ${NP}:  ${q}`,mid,ln(0),12,C.tx,800);cards(g,'Which integral is the length?',R[6].map(o=>o[0]))}}
A.fx.draw(g)}
function setN(k){k=Math.max(0,Math.min(4,Math.round(k)));const n=2**k;if(n===K.n&&K.seen[n])return;K.n=n;K.seen[n]=1;A.sound.pop();
report(`${n} chord${n>1?'s':''}: total length ${fm(chordLen(n),4)}.`)}
function pickTri(j){if(K.b>=3)return;const o=TRI[K.b].o[j];if(o[1]){K.miss=j;A.sound.miss();tell(o[1]);A.redraw();return}K.miss=-1;K.b++;A.sound.pop();report(o[0]+'.')}
function setE(e){e=Math.max(0,Math.min(1.5,e));if(Math.abs(e-LN2)<.04)e=LN2;else e=Math.round(e*20)/20;K.e=e;report(`b = ${fm(e,3)}, length sinh b = ${fm(Math.sinh(e),3)}.`)}
function setR(r){K.r=Math.max(1,Math.min(4,Math.round(r)));report(`Radius ${K.r}. Length = ${K.r} × θ = ${fm(K.r*K.th)}.`)}
function setTh(t){K.th=Math.max(0,Math.min(TAU,Math.round(t/(PI/12))*(PI/12)));report(`θ = ${fm(K.th)}, arc length ${fm(K.r*K.th)}.`)}
function pickInt(j){if(K.round>=NP)return;const o=PICK[K.round][6][j];if(!o[1]){K.miss=j;K.shade=o[3]==='area';A.sound.miss();tell(o[2]);A.redraw();return}
K.miss=-1;K.shade=0;K.round++;A.sound.pop();report('Yes, '+o[0]+'.')}
function report(msg){const m=stage();let t='';
if(m==='chord')t=K.n<16?'Add more chords: try 16.':'The totals settle on 1.479.';
else if(m==='tri')t=K.b<3?TRI[K.b].q:'Done: the arc length formula.';
else if(m==='cat')t=K.e!==LN2?'Drag the end b to ln 2.':'At b = ln 2 the length is exactly 3/4.';
else if(m==='circ')t=K.r!==2?'Set r to 2.':Math.abs(K.th-PI/2)>.01?'Sweep θ to π/2.':'Quarter-circle: s = 2 × π/2 = π.';
else if(m==='pick')t=K.round<NP?PICK[K.round][0]+'. Which integral is the length?':'All three done.';
tell((msg?msg+' ':'')+t);buttons();K.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f;return e};
if(m==='chord'){b('− Fewer chords',()=>setN(Math.log2(K.n)-1),'Halve the number of chords');b('More chords +',()=>setN(Math.log2(K.n)+1),'Double the number of chords')}
if(m==='tri'&&K.b<3)TRI[K.b].o.forEach(([t],j)=>b(t,()=>pickTri(j)));
if(m==='cat'){b('b − 0.05',()=>setE(K.e-.05),'Move the end left');b('b + 0.05',()=>setE(K.e+.05),'Move the end right');b('b = ln 2',()=>setE(LN2),'Jump to b equals ln 2')}
if(m==='circ'){b('r − 1',()=>setR(K.r-1),'Decrease radius');b('r + 1',()=>setR(K.r+1),'Increase radius');b('θ + π/12 ↺',()=>setTh(K.th+PI/12),'Increase theta by pi over 12')}
if(m==='pick'&&K.round<NP)PICK[K.round][6].forEach(([t],j)=>b(t,()=>pickInt(j)));
A.redraw()}
function down(p){const m=stage(),tr=trackR(),on=p.y>=tr.y-14&&p.y<=tr.y+tr.h+14&&p.x>=tr.x-14&&p.x<=tr.x+tr.w+14;
if(m==='chord'&&on){K.drag='n';setN(trackVal(p,0,4));return true}
if(m==='tri'&&K.b<3){[0,1,2].forEach(j=>{if(isIn(p,cardR(j)))pickTri(j)});return false}
if(m==='pick'&&K.round<NP){[0,1,2].forEach(j=>{if(isIn(p,cardR(j)))pickInt(j)});return false}
if(m==='cat'){if(on){K.drag='e';setE(trackVal(p,0,1.5));return true}if(isIn(p,plotR())){K.drag='ep';setE(map().ix(p.x));return true}}
if(m==='circ'){if(on){K.drag='t';setTh(trackVal(p,0,TAU));return true}if(isIn(p,plotR())){K.drag='a';const M=map();setTh((Math.atan2(M.iy(p.y),M.ix(p.x))+TAU)%TAU);return true}}
return false}
function move(p){if(K.drag==='n')setN(trackVal(p,0,4));if(K.drag==='e')setE(trackVal(p,0,1.5));if(K.drag==='ep')setE(map().ix(p.x));if(K.drag==='t')setTh(trackVal(p,0,TAU));
if(K.drag==='a'){const M=map();setTh((Math.atan2(M.iy(p.y),M.ix(p.x))+TAU)%TAU)}}
function up(){K.drag=null}
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=K.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok++;K.onChange=()=>{};Object.assign(K,{n:1,seen:{1:1},b:0,miss:-1,e:.2,r:1,th:0,round:0,shade:0,drag:null})};
const steps=[
{h:'Chords',p:'Approximate the curve y = x² from 0 to 1 by straight chords. Double the number of chords and watch the total length.',
predict:{q:'As you add more chords, what happens to the total length?',opts:['It settles on a fixed value','It grows without limit','It shrinks to the straight-line √2'],ans:0},task:'Go up to 16 chords',
show:()=>{steps[0].go();later([1,2,3,4].map(k=>()=>setN(k)),400)},go:()=>{fresh();report();K.onChange=whenDone(0,()=>K.n>=16,'1.414, 1.460, 1.474, 1.478, 1.479: the chords close in on the true arc length.')}},
{h:'Tiny triangle',p:'Zoom in. A tiny piece of curve is almost straight, the long side of a right-angled triangle with sides δx and δy.',
predict:{q:'Which expression gives the arc length of y = f(x)?',opts:['∫ √(1 + (dy/dx)²) dx','∫ (1 + dy/dx) dx','∫ y dx'],ans:0},task:'Build the formula card by card',
show:()=>{steps[1].go();later([0,2,1].map(j=>()=>pickTri(j)),500)},go:()=>{fresh();report();K.onChange=whenDone(1,()=>K.b>=3,'Pythagoras on each piece, then the limit as δx → 0.')}},
{h:'Catenary',p:'y = cosh x is the shape of a hanging chain. Drag the end b and read the arc length from x = 0.',
predict:{q:'y = cosh x, 0 ≤ x ≤ ln 2. What is the arc length?',opts:['3/4','5/4','ln 2'],ans:0},task:'Set b = ln 2',
show:()=>{steps[2].go();later([.4,.6,LN2].map(e=>()=>setE(e)),450)},go:()=>{fresh();report();K.onChange=whenDone(2,()=>K.e===LN2,'sinh(ln 2) = (2 − ½)/2 = 3/4. The 5/4 is the height cosh(ln 2), not the length.')}},
{h:'Parametric',p:'For x = x(t), y = y(t), use s = ∫ √((dx/dt)² + (dy/dt)²) dt with limits in t. Set r, then sweep θ.',
predict:{q:'x = 2 cos t, y = 2 sin t, 0 ≤ t ≤ π/2. How long is the arc?',opts:['π','2π','π/2'],ans:0},task:'Set r = 2 and sweep to π/2',
show:()=>{steps[3].go();later([()=>setR(2)].concat([1,2,3,4,5,6].map(k=>()=>setTh(k*PI/12))),300)},go:()=>{fresh();report();K.onChange=whenDone(3,()=>K.r===2&&Math.abs(K.th-PI/2)<.01,'The integrand is the constant r, so s = rθ: the arc length of a circle.')}},
{h:'Length or area?',p:'Each card is an integral that looks right. Pick the one that gives the arc length. A wrong area pick shades the area.',
predict:{q:'Which gives the length of y = x² from 0 to 1?',opts:['∫₀¹ √(1 + 4x²) dx','∫₀¹ x² dx'],ans:0},task:'Pick the right integral for 3 curves',
show:()=>{steps[4].go();later(PICK.map(R=>()=>pickInt(R[6].findIndex(o=>o[1]))),600)},go:()=>{fresh();report();K.onChange=whenDone(4,()=>K.round>=NP,'Arc length always has the square root of a sum of squared derivatives.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>K.onChange()});
const QS=[['y = x², 0 ≤ x ≤ 2. Which integral is the arc length?',[['∫₀² √(1 + 4x²) dx','ok'],['∫₀² √(1 + x⁴) dx','y'],['∫₀² x² dx','area']]],
['y = cosh x, 0 ≤ x ≤ 1. The arc length is…',[['sinh 1','ok'],['cosh 1','cosh'],['cosh 1 − 1','area']]],
['x = 3 cos t, y = 3 sin t, 0 ≤ t ≤ π. The arc length is…',[['3π','ok'],['9π','r2'],['π','r1']]],
['y = (2/3)x^(3/2). Then 1 + (dy/dx)² simplifies to…',[['1 + x','ok'],['1 + √x','nosq'],['1 + (4/9)x³','y']]],
['y = 4x + 1, 0 ≤ x ≤ 3. The arc length is…',[['3√17','ok'],['12','add'],['√17','lim']]],
['x = t², y = 2t, 0 ≤ t ≤ 1. The integrand is…',[['√(4t² + 4)','ok'],['√(1 + 4)','mix'],['√(t⁴ + 4t²)','y']]]];
function slip(tag){let m='Arc length: s = ∫ √(1 + (dy/dx)²) dx.';
if(tag==='y')m='Square the derivative, not the function itself.';
if(tag==='area')m='That is the area under the curve. Length needs the square root.';
if(tag==='cosh')m='cosh x is the integrand. Integrate it: ∫₀¹ cosh x dx = sinh 1.';
if(tag==='r2')m='(dx/dt)² + (dy/dt)² = 9, and √9 = 3, so s = 3π, not 9π.';
if(tag==='r1')m='The integrand is the radius 3, so s = 3 × π.';
if(tag==='nosq')m='dy/dx = √x, so (dy/dx)² = x.';
if(tag==='add')m='Not the change in y. Each unit of x gives √(1 + 16) = √17, so s = 3√17.';
if(tag==='lim')m='√17 is the length per unit of x. Multiply by the 3 units: 3√17.';
if(tag==='mix')m='In t form use (dx/dt)² + (dy/dt)² = (2t)² + 2², with no extra 1.';
return m}
let qk=-1,stars=0;
function pose(){qk++;const[q,ops]=QS[qk%QS.length],turn=qk%3;
quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+slip(tag)}${good?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
