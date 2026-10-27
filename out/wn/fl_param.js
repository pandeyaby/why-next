/* Flagship – parametric equations of curves (ages 17–18): step t along a track to plot x = 2t, y = t² point by point;
eliminate t card by card to reach y = x²/4 and watch it lie on the plotted points; drag r and sweep t to trace
x = r cos t, y = r sin t; use cos²t + sin²t = 1 to turn x = 3 cos t, y = 2 sin t into an ellipse; then sweep restricted
curves and say which part of the Cartesian graph they really cover. */
(()=>{const PI=Math.PI,TAU=2*PI,fm=x=>{const r=Math.round(x*100)/100;return(r<0?'−':'')+Math.abs(r)};
const ELIM=[{q:'x = 2t. Make t the subject.',o:[['t = x/2',''],['t = 2x','Undo × 2 by dividing by 2, not multiplying: t = x/2.'],['t = x − 2','x = 2t is a product, so divide by 2. Subtracting undoes adding.']]},
{q:'Put t = x/2 into y = t².',o:[['y = (2x)²','That puts 2x in place of t, but t = x/2.'],['y = (x/2)²',''],['y = x/2²','Brackets matter: the whole of t = x/2 gets squared.']]},
{q:'Simplify y = (x/2)².',o:[['y = x²/2','Square the 2 as well: (x/2)² = x²/2² = x²/4.'],['y = 2x²','(x/2)² divides by 4. It does not multiply by 2.'],['y = x²/4','']]}];
const ELL=[{q:'x = 3 cos t. So cos t = ?',o:[['cos t = x/3',''],['cos t = 3x','Divide both sides by 3: cos t = x/3.'],['cos t = x − 3','3 cos t is 3 times cos t, so divide by 3.']]},
{q:'y = 2 sin t. So sin t = ?',o:[['sin t = 2y','Divide by 2: sin t = y/2.'],['sin t = y/2',''],['sin t = y','You still need to divide by 2.']]},
{q:'Which identity removes t?',o:[['cos t + sin t = 1','cos t + sin t is not always 1. At t = π/4 it is about 1.41. Use squares.'],['cos²t + sin²t = 1',''],['cos t × sin t = 1','No such identity: at t = 0 the product is 0.']]},
{q:'So the Cartesian equation is…',o:[['x/3 + y/2 = 1','That is a straight line. The identity needs the squares: (x/3)² + (y/2)² = 1.'],['x² + y² = 1','You dropped the 3 and the 2. Use cos t = x/3 and sin t = y/2.'],['(x/3)² + (y/2)² = 1','']]}];
// [label,fx,fy,t0,t1,view,answers]
const PART=[['x = t², y = t⁴,  −1.5 ≤ t ≤ 1.5',t=>t*t,t=>t**4,-1.5,1.5,[-3,3,-.5,5],[['The whole parabola y = x²',0,'x = t² is never negative, so the left half (x < 0) is never reached.'],['Only the right half, x ≥ 0',1,''],['Only the left half, x ≤ 0',0,'x = t² ≥ 0 for every t, so it is the right half.']]],
['x = cos t, y = sin t,  0 ≤ t ≤ π',Math.cos,Math.sin,0,PI,[-2,2,-1.6,1.6],[['The whole circle x² + y² = 1',0,'t only runs to π, half a turn, so only half the circle is drawn.'],['The bottom half, y ≤ 0',0,'For 0 ≤ t ≤ π, sin t ≥ 0, so y is never negative.'],['The top half, y ≥ 0',1,'']]]];
VIS.reg('flagparam',c=>{let A,pad,quiz;
const K={t:0,pts:[],b:0,miss:-1,r:1,ang:0,sec:{},round:0,lo:0,hi:0,ans:[],drag:null,tok:0,onChange:()=>{}};
const stage=()=>['plot','elim','circle','ellipse','part','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1.05:1.2)),fnt=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,n,col,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const NP=PART.length;
// layout
const plotR=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.56}:{x:6,y:6,w:A.W*.56,h:A.H-12};
const panR=()=>A.narrow?{x:6,y:A.H*.58,w:A.W-12,h:A.H*.42-6}:{x:A.W*.58+4,y:6,w:A.W*.42-14,h:A.H-12};
const VIEW={plot:[-5,5,-1,5],elim:[-5,5,-1,5],circle:[-5,5,-5,5],ellipse:[-4,4,-3,3]};
const view=()=>stage()==='part'?PART[Math.min(K.round,1)][5]:VIEW[stage()]||[-5,5,-5,5];
function map(){const r=plotR(),[x0,x1,y0,y1]=view(),s=Math.min((r.w-20)/(x1-x0),(r.h-20)/(y1-y0)),cx=r.x+r.w/2-(x0+x1)/2*s,cy=r.y+r.h/2+(y0+y1)/2*s;
return{X:x=>cx+x*s,Y:y=>cy-y*s,ix:px=>(px-cx)/s,iy:py=>(cy-py)/s,s}}
function plane(g){const C=A.col,r=plotR(),M=map(),[x0,x1,y0,y1]=view();g.save();g.fillStyle=A.alpha(C.mu,.06);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
g.strokeStyle=A.alpha(C.mu,.25);g.lineWidth=1;for(let x=Math.ceil(x0);x<=x1;x++){g.beginPath();g.moveTo(M.X(x),M.Y(y0)-20);g.lineTo(M.X(x),M.Y(y1)+20);g.stroke()}
for(let y=Math.ceil(y0);y<=y1;y++){g.beginPath();g.moveTo(M.X(x0)-20,M.Y(y));g.lineTo(M.X(x1)+20,M.Y(y));g.stroke()}
g.strokeStyle=A.alpha(C.tx,.7);g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,M.Y(0));g.lineTo(r.x+r.w,M.Y(0));g.moveTo(M.X(0),r.y);g.lineTo(M.X(0),r.y+r.h);g.stroke();
put(g,'x',r.x+r.w-10,M.Y(0)-10,11,C.tx);put(g,'y',M.X(0)+10,r.y+12,11,C.tx);g.restore();return M}
function path(g,M,fx,fy,a,b,col,w,dash){g.save();const r=plotR();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;if(dash)g.setLineDash(dash);g.beginPath();
for(let i=0;i<=160;i++){const t=a+(b-a)*i/160,X=M.X(fx(t)),Y=M.Y(fy(t));i?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke();g.restore()}
const dot=(g,X,Y,col,r)=>{g.fillStyle=col;g.beginPath();g.arc(X,Y,r||6,0,7);g.fill()};
// panel pieces
const trackR=()=>{const p=panR();return{x:p.x+16,y:p.y+p.h*.72,w:p.w-32,h:28}};
function track(g,lo,hi,val,lab,ticks){const C=A.col,r=trackR(),X=v=>r.x+(v-lo)/(hi-lo)*r.w;g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=3;g.beginPath();g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke();
(ticks||[]).forEach(([v,t])=>{g.lineWidth=1.5;g.beginPath();g.moveTo(X(v),r.y+r.h/2-6);g.lineTo(X(v),r.y+r.h/2+6);g.stroke();put(g,t,X(v),r.y+r.h+8,10,C.tx,600)});
A.paint.ball(X(val),r.y+r.h/2,11,C.or);put(g,lab,r.x,r.y-10,11,C.tx,800,'left')}
const trackVal=(p,lo,hi)=>{const r=trackR();return lo+Math.max(0,Math.min(1,(p.x-r.x)/r.w))*(hi-lo)};
const cardR=j=>{const p=panR(),h=Math.min(z(40),p.h*.17);return{x:p.x+8,y:p.y+p.h*.36+j*(h+8),w:p.w-16,h}};
function cards(g,set){const C=A.col,p=panR(),i=Math.min(K.b,set.length-1);if(K.b>=set.length)return;put(g,set[i].q,p.x+p.w/2,p.y+p.h*.28,12,C.tx,800);
set[i].o.forEach(([t],j)=>{const r=cardR(j),bad=K.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.cy,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=bad?3:1.5;g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)})}
// drawing
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const m=stage();if(m==='quiz'){put(g,'x = f(t),  y = g(t)',W/2,H/2,22,C.tx,800);return}
const M=plane(g),p=panR();
if(m==='plot'||m==='elim'){if(m==='elim'&&K.b>=3)path(g,M,x=>x,x=>x*x/4,-5,5,C.gr,3,[8,5]);
if(m==='elim')path(g,M,t=>2*t,t=>t*t,-2.2,2.2,A.alpha(C.ac,.5),2);
K.pts.forEach(t=>{dot(g,M.X(2*t),M.Y(t*t),C.ac,6);put(g,`t=${fm(t)}`,M.X(2*t),M.Y(t*t)-14,10,C.tx,700)});
if(m==='plot'){dot(g,M.X(2*K.t),M.Y(K.t*K.t),C.or,8);put(g,'x = 2t,  y = t²',p.x+p.w/2,p.y+16,13,C.tx,800);
put(g,`t = ${fm(K.t)}  →  (${fm(2*K.t)}, ${fm(K.t*K.t)})`,p.x+p.w/2,p.y+p.h*.3,13,C.tx,800);put(g,`plotted ${K.pts.length} of 5`,p.x+p.w/2,p.y+p.h*.48,11,C.tx,700);
track(g,-2,2,K.t,'t (drag)',[-2,-1,0,1,2].map(v=>[v,fm(v)]))}
else{put(g,'Eliminate t',p.x+p.w/2,p.y+16,13,C.tx,800);put(g,['y = ?','t = x/2','y = (x/2)²','y = x²/4 ✓'][K.b],p.x+p.w/2,p.y+p.h*.15,15,C.gr,800);cards(g,ELIM);
if(K.b>=3)put(g,'Dashed y = x²/4 runs through every point',p.x+p.w/2,p.y+p.h*.5,11,C.tx,700)}}
if(m==='circle'){const r=K.r;for(let i=0;i<12;i++)if(K.sec[i]){g.strokeStyle=C.ac;g.lineWidth=4;g.beginPath();g.arc(M.X(0),M.Y(0),3*M.s,-(i+1)*TAU/12,-i*TAU/12);g.stroke()}
path(g,M,t=>r*Math.cos(t),t=>r*Math.sin(t),0,TAU,A.alpha(C.tx,.25),1.5,[5,5]);const X=M.X(r*Math.cos(K.ang)),Y=M.Y(r*Math.sin(K.ang));
g.strokeStyle=C.or;g.lineWidth=2;g.beginPath();g.moveTo(M.X(0),M.Y(0));g.lineTo(X,Y);g.stroke();dot(g,X,Y,C.or,9);
put(g,`x = ${r} cos t,  y = ${r} sin t`,p.x+p.w/2,p.y+16,13,C.tx,800);const a=K.ang,x=r*Math.cos(a),y=r*Math.sin(a);
put(g,`t = ${fm(a)}  (${fm(x)}, ${fm(y)})`,p.x+p.w/2,p.y+p.h*.22,12,C.tx,700);put(g,`x² + y² = ${fm(x*x+y*y)}`,p.x+p.w/2,p.y+p.h*.36,14,C.gr,800);
put(g,`swept ${Object.keys(K.sec).length} of 12 at r = 3`,p.x+p.w/2,p.y+p.h*.5,11,C.tx,700);track(g,1,5,r,'r (drag)',[1,2,3,4,5].map(v=>[v,String(v)]))}
if(m==='ellipse'){path(g,M,t=>3*Math.cos(t),t=>2*Math.sin(t),0,TAU,K.b>=4?C.gr:A.alpha(C.ac,.6),3);if(K.b<4)path(g,M,t=>3*Math.cos(t),t=>3*Math.sin(t),0,TAU,A.alpha(C.tx,.3),1.5,[5,5]);
put(g,'x = 3 cos t,  y = 2 sin t',p.x+p.w/2,p.y+16,13,C.tx,800);put(g,['','cos t = x/3','… sin t = y/2','… cos²t + sin²t = 1','(x/3)² + (y/2)² = 1 ✓'][K.b],p.x+p.w/2,p.y+p.h*.15,14,C.gr,800);cards(g,ELL);
if(K.b>=4)put(g,'An ellipse: 6 wide, 4 tall',p.x+p.w/2,p.y+p.h*.5,12,C.tx,700)}
if(m==='part'){if(K.round>=NP){const[,fx,fy,a,b]=PART[1];path(g,M,Math.cos,Math.sin,0,TAU,A.alpha(C.tx,.3),1.5,[5,5]);path(g,M,fx,fy,a,b,C.gr,4);put(g,'Both parts found: only the top half of x² + y² = 1',p.x+p.w/2,p.y+16,12,C.gr,800);put(g,'y = sin t ≥ 0 for 0 ≤ t ≤ π',p.x+p.w/2,p.y+p.h*.18,11,C.tx,700);A.fx.draw(g);return}const[lab,fx,fy,a,b]=PART[K.round];
if(K.round===0)path(g,M,x=>x,x=>x*x,-3,3,A.alpha(C.tx,.3),1.5,[5,5]);else path(g,M,Math.cos,Math.sin,0,TAU,A.alpha(C.tx,.3),1.5,[5,5]);
if(K.hi>K.lo)path(g,M,fx,fy,K.lo,K.hi,C.ac,4);dot(g,M.X(fx(K.t)),M.Y(fy(K.t)),C.or,8);put(g,lab,p.x+p.w/2,p.y+16,12,C.tx,800);
put(g,K.round?'Dashed: x² + y² = 1':'Dashed: y = x²',p.x+p.w/2,p.y+p.h*.18,11,C.tx,700);put(g,`t = ${fm(K.t)}  (${fm(fx(K.t))}, ${fm(fy(K.t))})`,p.x+p.w/2,p.y+p.h*.32,12,C.tx,700);
track(g,a,b,K.t,'t (drag to sweep)',K.round?[[0,'0'],[PI/2,'π/2'],[PI,'π']]:[[-1.5,'−1.5'],[0,'0'],[1.5,'1.5']])}
A.fx.draw(g)}
// actions
function setT(t){t=Math.round(Math.max(-2,Math.min(2,t))*4)/4;K.t=t;tell(`t = ${fm(t)}, point (${fm(2*t)}, ${fm(t*t)}).`);A.redraw()}
function plotNow(){const t=K.t;if(t!==Math.round(t)){tell(`Plot the whole-number values of t. t = ${fm(t)} is between them.`);return}if(K.pts.includes(t)){tell(`t = ${t} is already plotted.`);return}
K.pts.push(t);K.pts.sort((a,b)=>a-b);A.sound.pop();report(`t = ${fm(t)}: x = 2 × ${fm(t)} = ${fm(2*t)}, y = ${fm(t)}² = ${fm(t*t)}.`)}
function pick(set,j){if(K.b>=set.length)return;const o=set[K.b].o[j];if(o[1]){K.miss=j;A.sound.miss();tell(o[1]);A.redraw();return}K.miss=-1;K.b++;A.sound.pop();report(o[0]+'.')}
function setR(r){K.r=Math.max(1,Math.min(5,Math.round(r)));K.sec={};report(`Radius ${K.r}.`)}
function setAng(a){a=((a%TAU)+TAU)%TAU;K.ang=a;if(K.r===3){const i=Math.floor(a/(TAU/12))%12;if(!K.sec[i]){K.sec[i]=1;if(Object.keys(K.sec).length===12)return report('Full turn at r = 3: a circle, and x² + y² stays 9.')}}
const x=K.r*Math.cos(a),y=K.r*Math.sin(a);tell(`t = ${fm(a)}, point (${fm(x)}, ${fm(y)}), x² + y² = ${fm(x*x+y*y)}.`);A.redraw()}
function sweepTo(t){const[,,,a,b]=PART[K.round];K.t=Math.max(a,Math.min(b,t));K.lo=Math.min(K.lo,K.t);K.hi=Math.max(K.hi,K.t);A.redraw();report()}
const swept=()=>{if(K.round>=NP)return false;const[,,,a,b]=PART[K.round];return K.lo<=a+.01&&K.hi>=b-.01};
function answer(j){if(K.round>=NP)return;if(!swept()){tell('Sweep t across its whole range first, then decide.');return}const o=PART[K.round][6][j];
if(!o[1]){K.miss=j;A.sound.miss();tell(o[2]);return}A.sound.pop();K.ans.push(K.round);K.round++;K.miss=-1;startRound();report('Yes. '+(K.round===1?'x = t² ≥ 0 keeps it on the right.':'sin t ≥ 0 keeps it on top.'))}
function startRound(){if(K.round<NP){const[,,,a]=PART[K.round];K.t=a;K.lo=a;K.hi=a}}
function report(msg){const m=stage();let t='';
if(m==='plot')t=K.pts.length<5?'Plot t = −2, −1, 0, 1 and 2.':'All 5 points plotted.';
else if(m==='elim')t=K.b<3?ELIM[K.b].q:'Done: y = x²/4.';
else if(m==='circle')t=K.r!==3?'Set r to 3.':Object.keys(K.sec).length<12?'Now sweep t all the way round.':'';
else if(m==='ellipse')t=K.b<4?ELL[K.b].q:'Done: (x/3)² + (y/2)² = 1.';
else if(m==='part')t=K.round>=NP?'Both done.':swept()?'Which part of the dashed graph is traced?':`Sweep t for ${PART[K.round][0]}.`;
tell((msg?msg+' ':'')+t);buttons();K.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f;return e};
if(m==='plot'){b('◀ t − 1',()=>setT(Math.round(K.t)-1),'Decrease t by 1');b('t + 1 ▶',()=>setT(Math.round(K.t)+1),'Increase t by 1');b('📍 Plot point',plotNow)}
if(m==='elim'&&K.b<3)ELIM[K.b].o.forEach(([t],j)=>b(t,()=>pick(ELIM,j)));
if(m==='ellipse'&&K.b<4)ELL[K.b].o.forEach(([t],j)=>b(t,()=>pick(ELL,j)));
if(m==='circle'){b('r − 1',()=>setR(K.r-1),'Decrease radius');b('r + 1',()=>setR(K.r+1),'Increase radius');b('t + π/6 ↺',()=>setAng(K.ang+TAU/12+1e-9),'Increase t by pi over 6')}
if(m==='part'&&K.round<NP){const[,,,a,bb]=PART[K.round];if(!swept())b('▶ Sweep t',()=>{const n=8;for(let i=0;i<=n;i++)sweepTo(a+(bb-a)*i/n)});else PART[K.round][6].forEach(([t],j)=>b(t,()=>answer(j)))}
A.redraw()}
// canvas input
function down(p){const m=stage(),tr=trackR(),onTrack=p.y>=tr.y-14&&p.y<=tr.y+tr.h+14&&p.x>=tr.x-14&&p.x<=tr.x+tr.w+14;
if(m==='plot'){if(onTrack){K.drag='t';setT(trackVal(p,-2,2));return true}const M=map(),hitPt=[-2,-1,0,1,2].find(t=>Math.hypot(p.x-M.X(2*t),p.y-M.Y(t*t))<18);if(hitPt!=null){setT(hitPt);plotNow()}return false}
if(m==='elim'||m==='ellipse'){const set=m==='elim'?ELIM:ELL;[0,1,2].forEach(j=>{if(isIn(p,cardR(j)))pick(set,j)});return false}
if(m==='circle'){if(onTrack){K.drag='r';setR(trackVal(p,1,5));return true}if(isIn(p,plotR())){K.drag='a';const M=map();setAng(Math.atan2(M.iy(p.y),M.ix(p.x)));return true}return false}
if(m==='part'&&K.round<NP){const[,,,a,b]=PART[K.round];if(onTrack){K.drag='s';sweepTo(trackVal(p,a,b));return true}}
return false}
function move(p){const m=stage();if(K.drag==='t')setT(trackVal(p,-2,2));if(K.drag==='r'&&Math.round(trackVal(p,1,5))!==K.r)setR(trackVal(p,1,5));
if(K.drag==='a'){const M=map(),a=Math.atan2(M.iy(p.y),M.ix(p.x)),prev=K.ang,d=((a-prev)%TAU+TAU+PI)%TAU-PI;for(let k=1;k<=4;k++)setAng(prev+d*k/4)}
if(K.drag==='s'&&m==='part'&&K.round<NP){const[,,,a,b]=PART[K.round];sweepTo(trackVal(p,a,b))}}
function up(){if(K.drag==='t'&&stage()==='plot'&&K.t===Math.round(K.t)&&!K.pts.includes(K.t))plotNow();K.drag=null}
// steps
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=K.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok++;K.onChange=()=>{};Object.assign(K,{t:0,pts:[],b:0,miss:-1,r:1,ang:0,sec:{},round:0,lo:0,hi:0,ans:[],drag:null});startRound()};
const right=set=>set.map(x=>x.o.findIndex(o=>!o[1]));
const steps=[
{h:'Plot from t',p:'Each value of the parameter t gives one point (x, y). Drag t along the track and plot the whole-number values.',
predict:{q:'x = 2t, y = t². Where is the point at t = −1?',opts:['(−2, 1)','(1, −2)','(−2, −1)'],ans:0},task:'Plot t = −2 to 2',
show:()=>{steps[0].go();later([-2,-1,0,1,2].flatMap(t=>[()=>setT(t),plotNow]),250)},go:()=>{fresh();report();K.onChange=whenDone(0,()=>K.pts.length>=5,'Five points, one for each t. Joined in order of t they make a parabola.')}},
{h:'Eliminate t',p:'To get a Cartesian equation, get rid of t: make t the subject of one equation and substitute into the other.',
predict:{q:'Eliminate t from x = 2t, y = t². Which equation do you get?',opts:['y = x²/2','y = x²/4','y = 2x²'],ans:1},task:'Build the Cartesian equation',
show:()=>{steps[1].go();K.pts=[-2,-1,0,1,2];later(right(ELIM).map(j=>()=>pick(ELIM,j)),500)},go:()=>{fresh();K.pts=[-2,-1,0,1,2];report();K.onChange=whenDone(1,()=>K.b>=3,'y = x²/4 passes through every plotted point.')}},
{h:'Circles',p:'x = r cos t, y = r sin t. Drag r on the track, then drag the point round to sweep t.',
predict:{q:'x = 3 cos t, y = 3 sin t for 0 ≤ t < 2π. What does it trace?',opts:['A circle of radius 3','A circle of radius 9','A straight line'],ans:0},task:'Set r = 3 and sweep a full turn',
show:()=>{steps[2].go();later([()=>setR(2),()=>setR(3)].concat(Array.from({length:12},(x,i)=>()=>setAng(i*TAU/12+.1))),160)},go:()=>{fresh();report();K.onChange=whenDone(2,()=>K.r===3&&Object.keys(K.sec).length>=12,'x² + y² = 9 cos²t + 9 sin²t = 9: a circle of radius 3, centre O.')}},
{h:'Use an identity',p:'When t sits inside cos and sin, eliminate it with cos²t + sin²t = 1. Build the equation card by card.',
predict:{q:'x = 3 cos t, y = 2 sin t. What shape is it?',opts:['A circle of radius 3','An ellipse 6 wide and 4 tall'],ans:1},task:'Build the Cartesian equation',
show:()=>{steps[3].go();later(right(ELL).map(j=>()=>pick(ELL,j)),450)},go:()=>{fresh();report();K.onChange=whenDone(3,()=>K.b>=4,'(x/3)² + (y/2)² = 1: an ellipse.')}},
{h:'Which part?',p:'The Cartesian equation can describe more than the parametric curve covers. Sweep t, then say which part is really traced.',
predict:{q:'x = t², y = t⁴. Does it trace the whole parabola y = x²?',opts:['Yes, all of it','No, only x ≥ 0'],ans:1},task:'Sweep and decide for 2 curves',
show:()=>{steps[4].go();const go=r=>[()=>{const[,,,a,b]=PART[r];for(let i=0;i<=8;i++)sweepTo(a+(b-a)*i/8)},()=>answer(PART[r][6].findIndex(o=>o[1]))];later(go(0).concat(go(1)),400)},
go:()=>{fresh();report();K.onChange=whenDone(4,()=>K.round>=NP,'Always check the range of x and y the parameter allows.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>K.onChange()});
// challenge
const QS=[['x = 3t, y = t². Find the Cartesian equation.',[['y = x²/9','ok'],['y = x²/3','sq'],['y = 9x²','mult']]],
['x = 5 cos t, y = 5 sin t. Find the Cartesian equation.',[['x² + y² = 25','ok'],['x² + y² = 5','r'],['x + y = 5','add']]],
['x = t + 1, y = 2t. At t = 3, what is the point?',[['(4, 6)','ok'],['(6, 4)','swap'],['(3, 6)','plus']]],
['x = 4 cos t, y = sin t. Find the Cartesian equation.',[['x²/16 + y² = 1','ok'],['x/4 + y = 1','add'],['x² + y² = 4','r']]],
['x = t², y = 2t². Which describes the curve?',[['Half-line y = 2x, x ≥ 0','ok'],['The whole line y = 2x','whole'],['y = 2x²','sq']]],
['x = t − 2, y = t². Find the Cartesian equation.',[['y = (x + 2)²','ok'],['y = (x − 2)²','sub'],['y = x² + 2','sq']]]];
function slip(tag){let m='Make t the subject, substitute, then simplify.';
if(tag==='sq')m='Square the whole of t, including the number: (x/3)² = x²/9.';
if(tag==='mult')m='Undo multiplying by dividing: t = x/3, not 3x.';
if(tag==='r')m='x² + y² = r²cos²t + r²sin²t = r², so square the radius.';
if(tag==='add')m='cos t + sin t is not 1. Square them: cos²t + sin²t = 1.';
if(tag==='swap')m='x comes first: put t into x = t + 1 first, then into y.';
if(tag==='plus')m='x = t + 1, so add the 1: x = 3 + 1 = 4, and y = 2 × 3 = 6.';
if(tag==='sub')m='Undo the −2 by adding 2: t = x + 2.';
if(tag==='whole')m='x = t² is never negative, so only the part with x ≥ 0 is traced.';
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
