/* Flagship – stationary points (16–18). Probe y = x³ − 3x² + 2 for flat tangents, solve f′(x) = 0 line by line and substitute
   into f (not f′), build a sign table either side to classify maximum and minimum, meet stationary points of inflection on
   y = x³, and use f″ as a shortcut that fails when f″ = 0. Every canvas action has a twin button. */
(()=>{const M=Math,f=x=>x*x*x-3*x*x+2,d=x=>3*x*x-6*x,fm=v=>{v=M.round(v*100)/100;return(v<0?'−':'')+M.abs(v).toFixed(2)};
const LINES=[['f′(x) =',['3x² − 6x','x³ − 3x²','3x² − 6x + 2'],{1:'That is not differentiated. Bring each power down and reduce it by 1.',2:'The constant 2 differentiates to 0, so it disappears.'}],
 ['f′(x) = 0 gives',['3x(x − 2) = 0, so x = 0 or x = 2','x = 1 ± √3','x = 3 or x = 6'],{1:'Those solve f(x) = 0: where the curve crosses the x-axis, not where it is flat.',2:'Factorise: 3x² − 6x = 3x(x − 2). Each factor gives a solution.'}],
 ['At x = 0, y =',['2','0','−2'],{1:'0 is f′(0). You know the gradient is 0. For the point, substitute into f.',2:'Check the arithmetic: f(0) = 0 − 0 + 2.'}],
 ['At x = 2, y =',['−2','0','2'],{1:'0 is f′(2). Substitute into f: 8 − 12 + 2.',2:'f(2) = 8 − 12 + 2. Keep the minus sign.'}]];
/* sign table cells: [x, kind 's' sign | 'n' nature, answer] */
const TAB=[[-1,'s','+'],[1,'s','−'],[0,'n','max'],[3,'s','+'],[2,'n','min']];
const CUR=[['y = x³',x=>x*x*x,x=>3*x*x,'infl'],['y = −x³',x=>-x*x*x,x=>-3*x*x,'infl'],['y = x⁴',x=>x**4,x=>4*x*x*x,'min']];
const F2=[['y = x³ − 3x² + 2, at x = 0','f″(x) = 6x − 6','f″(0) = −6',-6,'max'],['y = x³ − 3x² + 2, at x = 2','f″(x) = 6x − 6','f″(2) = 6',6,'min'],['y = x⁴, at x = 0','f″(x) = 12x²','f″(0) = 0',0,'none']];
const NAT={max:'Maximum',min:'Minimum',infl:'Point of inflection',none:'f″ = 0: test fails, use signs'};
VIS.reg('flagstatpt',c=>{let A,ctl,qbox,qi=-1,gen=0,inRow=0;
const empty=()=>({cb:()=>{},hits:0,px:0.6,marks:[],flash:-1,drag:false}),Z=empty();
const phase=()=>['probe','solve','table','infl','f2','quiz'][A.step],instant=()=>A.reduced();
const need=()=>({probe:2,solve:4,table:5,infl:3,f2:3}[phase()]||99);
function sayIt(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(g,t,x,y,n,col,al){g.font=`700 ${M.round(n*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
/* plot frame: box r, x-range, y-range */
function frame(r,xr,yr){return{r,X:x=>r.x+(x-xr[0])/(xr[1]-xr[0])*r.w,Y:y=>r.y+r.h-(y-yr[0])/(yr[1]-yr[0])*r.h,ix:px=>xr[0]+(px-r.x)/r.w*(xr[1]-xr[0]),xr,yr}}
function axes(g,P){const C=A.col;g.strokeStyle=A.mix(C.tx,C.pn,.55);g.lineWidth=1.5;g.beginPath();g.moveTo(P.r.x,P.Y(0));g.lineTo(P.r.x+P.r.w,P.Y(0));g.moveTo(P.X(0),P.r.y);g.lineTo(P.X(0),P.r.y+P.r.h);g.stroke()}
function curve(g,P,fn,col,lw){g.save();g.beginPath();g.rect(P.r.x,P.r.y,P.r.w,P.r.h);g.clip();g.strokeStyle=col;g.lineWidth=lw||3;g.beginPath();for(let i=0;i<=120;i++){const x=P.xr[0]+i/120*(P.xr[1]-P.xr[0]);i?g.lineTo(P.X(x),P.Y(fn(x))):g.moveTo(P.X(x),P.Y(fn(x)))}g.stroke();g.restore()}
function tangent(g,P,x,fn,dn,col){const s=0.55;g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(P.X(x-s),P.Y(fn(x)-s*dn(x)));g.lineTo(P.X(x+s),P.Y(fn(x)+s*dn(x)));g.stroke()}
function dot(g,P,x,y,col,r){g.fillStyle=col;g.beginPath();g.arc(P.X(x),P.Y(y),r||7,0,7);g.fill()}
const main=()=>frame({x:16,y:A.H*.12,w:A.W-32,h:A.H*.6},[-1.2,3.2],[-3,3.2]);
function drawProbe(g){const C=A.col,P=main();axes(g,P);curve(g,P,f,C.cy);const x=Z.px,flat=M.abs(d(x))<0.01;tangent(g,P,x,f,d,flat?C.gr:C.am);dot(g,P,x,f(x),flat?C.gr:C.am,9);
 Z.marks.forEach(m=>{dot(g,P,m,f(m),C.vi,8);ink(g,`(${m}, ${f(m)})`,P.X(m),P.Y(f(m))+(m?24:-22),13,C.vi)});
 [1-M.sqrt(3),1,1+M.sqrt(3)].forEach(r=>{g.strokeStyle=C.rd;g.lineWidth=2;g.strokeRect(P.X(r)-4,P.Y(0)-4,8,8)});
 ink(g,`x = ${fm(x)}   gradient f′(x) = ${fm(d(x))}`,A.W/2,A.H*.06,15,flat?C.gr:C.tx);ink(g,`Flat spots marked: ${Z.marks.length} of 2   (red squares: y = 0)`,A.W/2,A.H*.82,12)}
function drawSolve(g){const C=A.col,P=frame({x:16,y:A.H*.04,w:A.W-32,h:A.H*.42},[-1.2,3.2],[-3,3.2]);axes(g,P);curve(g,P,f,C.cy);
 if(Z.hits>=2)[0,2].forEach(x=>{g.strokeStyle=C.vi;g.setLineDash([5,5]);g.lineWidth=2;g.beginPath();g.moveTo(P.X(x),P.r.y);g.lineTo(P.X(x),P.r.y+P.r.h);g.stroke();g.setLineDash([])});
 if(Z.hits>=3)dot(g,P,0,2,C.gr);if(Z.hits>=4)dot(g,P,2,-2,C.gr);
 ink(g,'f(x) = x³ − 3x² + 2',A.W/2,A.H*.52,15,C.cy);LINES.forEach((L,i)=>{if(i>Z.hits)return;ink(g,L[0]+' '+(i<Z.hits?L[1][0]:'?'),A.W/2,A.H*(.61+i*.09),15,i<Z.hits?C.gr:C.tx)})}
function drawTable(g){const C=A.col,xs=[-1,0,1,2,3],cw=(A.W-90)/5,y0=A.H*.16,rh=A.H*.15;
 ['x','f′(x)','shape'].forEach((t,r)=>{ink(g,t,44,y0+r*rh,15,C.tx);xs.forEach((x,k)=>{const cx=80+cw*(k+.5),cy=y0+r*rh;g.strokeStyle=A.mix(C.tx,C.pn,.6);g.lineWidth=1.5;g.strokeRect(cx-cw/2,cy-rh/2,cw,rh);
  if(r===0)ink(g,String(x).replace('-','−'),cx,cy,16);
  const j=TAB.findIndex(T=>T[0]===x&&T[1]==='s'),known=x===0||x===2||(j>=0&&j<Z.hits);
  const sg=x===0||x===2?'0':d(x)>0?'+':'−';if(r===1&&known)ink(g,sg,cx,cy,20,sg==='+'?C.gr:sg==='−'?C.rd:C.tx);
  if(r===2&&known){g.strokeStyle=C.cy;g.lineWidth=4;g.beginPath();const s=sg==='0'?0:sg==='+'?1:-1;g.moveTo(cx-cw*.3,cy+s*rh*.25);g.lineTo(cx+cw*.3,cy-s*rh*.25);g.stroke()}
  if(Z.flash===k&&r===1){g.strokeStyle=C.rd;g.lineWidth=4;g.strokeRect(cx-cw/2+2,cy-rh/2+2,cw-4,rh-4)}})});
 [[0,2],[2,4]].forEach(([x,i])=>{if(Z.hits>i)ink(g,`x = ${x}: ${NAT[TAB[i][2]]}`,A.W/2,A.H*(.66+(x/2)*.1),16,C.vi)});
 if(Z.hits<5){const T=TAB[Z.hits];ink(g,T[1]==='s'?`f′(x) = 3x² − 6x. Sign of f′(${String(T[0]).replace('-','−')})?`:`So what is at x = ${T[0]}?`,A.W/2,A.H*.88,15,C.am)}}
function drawInfl(g){const C=A.col,K=CUR[M.min(Z.hits,2)],P=frame({x:16,y:A.H*.1,w:A.W-32,h:A.H*.62},[-1.5,1.5],[-1.6,1.8]);axes(g,P);curve(g,P,K[1],C.cy);
 [-.7,0,.7].forEach(x=>tangent(g,P,x,K[1],K[2],x?C.am:C.gr));dot(g,P,0,0,C.vi,8);ink(g,K[0],A.W/2,A.H*.05,17,C.cy);
 ink(g,`f′(−0.5) = ${fm(K[2](-.5))}    f′(0) = 0    f′(0.5) = ${fm(K[2](.5))}`,A.W/2,A.H*.8,13);ink(g,`Classified: ${Z.hits} of 3`,A.W/2,A.H*.9,12)}
function drawF2(g){const C=A.col,R=F2[M.min(Z.hits,2)];ink(g,R[0],A.W/2,A.H*.08,16,C.cy);ink(g,R[1],A.W/2,A.H*.2,16);ink(g,R[2],A.W/2,A.H*.3,18,R[3]<0?C.rd:R[3]>0?C.gr:C.am);
 const cx=A.W/2,cy=A.H*.56,w=A.W*.28;g.strokeStyle=C.vi;g.lineWidth=5;g.beginPath();const u=R[3]>0?1:-1;if(R[3])g.moveTo(cx-w,cy-u*w*.4),g.quadraticCurveTo(cx,cy+u*w*.8,cx+w,cy-u*w*.4);else g.moveTo(cx-w,cy),g.lineTo(cx+w,cy);g.stroke();
 ink(g,R[3]<0?'f″ < 0: gradient falling, curve is concave (∩)':R[3]>0?'f″ > 0: gradient rising, curve is convex (∪)':'f″ = 0: no shape information',A.W/2,A.H*.8,13);ink(g,`Done: ${Z.hits} of 3`,A.W/2,A.H*.9,12)}
function drawQuiz(g){const C=A.col,P=main();axes(g,P);curve(g,P,f,C.cy);dot(g,P,0,2,C.gr);dot(g,P,2,-2,C.gr)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.25);g.fillRect(0,0,A.W,A.H);({probe:drawProbe,solve:drawSolve,table:drawTable,infl:drawInfl,f2:drawF2,quiz:drawQuiz}[phase()])(g);A.fx.draw(g)}
function miss(t,i){A.sound.miss();Z.flash=i==null?-1:i;sayIt(t);const v=gen;setTimeout(()=>{if(v===gen){Z.flash=-1;A.redraw()}},instant()?10:900);A.redraw()}
function hit(t){Z.hits++;A.sound.pop();sayIt(t);keys();A.redraw();Z.cb()}
function setX(x){x=M.max(-1.1,M.min(3.1,x));[0,2].forEach(s=>{if(M.abs(x-s)<0.09)x=s});Z.px=M.round(x*100)/100;A.sound.tick();sayIt(`x = ${fm(Z.px)}, gradient ${fm(d(Z.px))}`);A.redraw()}
function mark(){const x=Z.px;if(Z.marks.length>=2)return;if(M.abs(d(x))>0.01)return miss(M.abs(f(x))<0.15?`y is 0 here, but the gradient is ${fm(d(x))}. Crossing the axis is not the same as being flat.`:`The gradient here is ${fm(d(x))}, not 0. Slide until the tangent is flat.`);
 if(Z.marks.includes(x))return miss('You have marked that one. There is another flat spot.');Z.marks.push(x);hit(`Flat tangent at (${x}, ${f(x)}): a stationary point.`)}
function pickLine(i){if(Z.hits>=4)return;const L=LINES[Z.hits];if(i)return miss(L[2][i],i);hit(`${L[0]} ${L[1][0]}`)}
function pickTab(v){if(Z.hits>=5)return;const T=TAB[Z.hits];if(v!==T[2]){const k=[-1,0,1,2,3].indexOf(T[0]);
 return miss(T[1]==='s'?`f′(${T[0]}) = ${d(T[0])}, so the sign is ${d(T[0])>0?'+':'−'}.`:v==='infl'?'The sign changes, so it is not an inflection.':`${T[2]==='max'?'+ then −: going up then down is a hill':'− then +: going down then up is a valley'}, so it is a ${NAT[T[2]].toLowerCase()}.`,k)}
 hit(T[1]==='s'?`f′(${T[0]}) is ${v}.`:`x = ${T[0]}: ${NAT[v].toLowerCase()}.`)}
function pickInfl(v){if(Z.hits>=3)return;const K=CUR[Z.hits];if(v!==K[3])return miss(K[3]==='infl'?'The gradient has the same sign on both sides, so the curve keeps going the same way. That is a point of inflection.':'The gradient goes − then +: down then up. That is a minimum, even though the curve is very flat.');
 hit(`${K[0]}: ${NAT[v].toLowerCase()}.`)}
function pickF2(v){if(Z.hits>=3)return;const R=F2[Z.hits];if(v!==R[4])return miss(R[4]==='none'?'f″ = 0 does not prove an inflection: y = x⁴ is a minimum. The test fails, so use the signs.':`${R[2]}, so ${R[3]<0?'the gradient is falling: maximum':'the gradient is rising: minimum'}.`);hit(`${R[2]}: ${NAT[v]}.`)}
function keys(){if(!ctl)return;ctl.innerHTML='';const m=phase();if(m==='quiz'||Z.hits>=need())return;const K=(t,l,fn)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=fn};
 if(m==='probe'){K('◀ x − 0.1','Move left',()=>setX(Z.px-.1));K('x + 0.1 ▶','Move right',()=>setX(Z.px+.1));K('📍 Mark flat spot','Mark a stationary point here',mark)}
 if(m==='solve')LINES[Z.hits][1].map((o,i)=>[o,i]).sort((a,b)=>(a[1]+Z.hits+1)%3-(b[1]+Z.hits+1)%3).forEach(([o,i])=>K(o,LINES[Z.hits][0]+' '+o,()=>pickLine(i)));
 if(m==='table')(TAB[Z.hits][1]==='s'?['+','−']:['max','min','infl']).forEach(v=>K(NAT[v]||(v==='+'?'+ positive':'− negative'),NAT[v]||'sign '+v,()=>pickTab(v)));
 if(m==='infl')['max','min','infl'].forEach(v=>K(NAT[v],NAT[v],()=>pickInfl(v)));
 if(m==='f2')['max','min','infl','none'].forEach(v=>K(NAT[v],NAT[v],()=>pickF2(v)))}
function down(p){if(phase()!=='probe'||Z.marks.length>=2)return false;const P=main();if(p.y<P.r.y-20||p.y>P.r.y+P.r.h+20)return false;Z.drag=true;setX(P.ix(p.x));return true}
function move(p){if(Z.drag)setX(main().ix(p.x))}
function up(){Z.drag=false}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,ms){const k=++gen;list.forEach((fn,j)=>setTimeout(()=>{if(k===gen)fn()},instant()?j*40+30:(j+1)*(ms||600)))}
const begin=()=>{gen++;Object.assign(Z,empty());keys()};
const steps=[
{h:'Find the flat spots',p:'Drag along y = x³ − 3x² + 2, or use the buttons. Where the tangent is flat, the gradient is 0. Mark both flat spots.',predict:{q:'Where are the stationary points of this curve?',opts:['Where it crosses the x-axis (y = 0)','Where the gradient is 0 (flat tangent)'],ans:1},task:'Mark 2 stationary points',
 show:()=>{steps[0].go();auto([()=>setX(0),mark,()=>setX(2),mark],600)},go:()=>{begin();sayIt('Slide along the curve and watch the gradient.');Z.cb=ready(0,()=>Z.hits>=2,'Stationary means f′(x) = 0. The red y = 0 points are not stationary.')}},
{h:'Solve f′(x) = 0',p:'Find the stationary points with algebra. Pick each line of working.',predict:{q:'To find the y-coordinate at x = 2, substitute x = 2 into…',opts:['f′(x), because that is where we found x','f(x), the curve itself'],ans:1},task:'Complete 4 lines of working',
 show:()=>{steps[1].go();auto([0,1,2,3].map(()=>()=>pickLine(0)),700)},go:()=>{begin();sayIt('Differentiate first. What is f′(x)?');Z.cb=ready(1,()=>Z.hits>=4,'Solve f′(x) = 0 for x, then substitute into f for y: (0, 2) and (2, −2).')}},
{h:'Sign either side',p:'Check the sign of f′ just either side of each stationary point. + 0 − is a maximum. − 0 + is a minimum.',task:'Fill the sign table',
 show:()=>{steps[2].go();auto(TAB.map(T=>()=>pickTab(T[2])),650)},go:()=>{begin();sayIt('Is f′(−1) positive or negative?');Z.cb=ready(2,()=>Z.hits>=5,'Up, flat, down is a maximum; down, flat, up is a minimum.')}},
{h:'Inflection',p:'Not every stationary point is a turn. Look at the gradient either side, then classify.',predict:{q:'y = x³ has f′(0) = 0. What is at the origin?',opts:['A minimum, because f′ = 0 there','A point of inflection: f′ is + on both sides'],ans:1},task:'Classify 3 curves',
 show:()=>{steps[3].go();auto(CUR.map(K=>()=>pickInfl(K[3])),800)},go:()=>{begin();sayIt('y = x³. Classify the stationary point at the origin.');Z.cb=ready(3,()=>Z.hits>=3,'Same sign both sides: a stationary point of inflection.')}},
{h:'Use f″',p:'f″ is the rate of change of the gradient. f″ < 0 means a maximum, f″ > 0 a minimum. If f″ = 0 the test tells you nothing.',task:'Use f″ 3 times',
 show:()=>{steps[4].go();auto(F2.map(R=>()=>pickF2(R[4])),800)},go:()=>{begin();sayIt('Use the second derivative to classify.');Z.cb=ready(4,()=>Z.hits>=3,'If f″ = 0, go back to the sign test.')}},
{h:'Challenge',p:'',go:()=>{begin();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.cb()});
const BANK=[['Find the x-coordinates of the stationary points of y = x³ − 12x.',[['x = 2 and x = −2','ok'],['x = 0 and x = ±√12','cross'],['x = 12','diff']]],
 ['y = x² − 6x + 5 has a stationary point at x = 3. What is its y-coordinate?',[['−4','ok'],['0','fprime'],['5','sub']]],
 ['f′ is − just left of x = 1 and + just right. What is at x = 1?',[['A minimum','ok'],['A maximum','flip'],['A point of inflection','inflect']]],
 ['f′(x) = 3(x − 4)². What is at x = 4?',[['A point of inflection','ok'],['A minimum','inflect'],['A maximum','inflect']]],
 ['At a stationary point, f″(a) = 0. What can you conclude?',[['Nothing yet: use the sign test','ok'],['It is a point of inflection','f2zero'],['It is a maximum','f2zero']]],
 ['f″(a) = −5 at a stationary point x = a. What is it?',[['A maximum','ok'],['A minimum','flip'],['A point of inflection','inflect']]]];
function why(t){let m='Stationary points are where f′(x) = 0. Then use f for y and signs or f″ for the nature.';
 if(t==='cross')m='x = 0 and ±√12 solve y = 0. Stationary points solve f′(x) = 3x² − 12 = 0.';
 if(t==='diff')m='Differentiate first: f′(x) = 3x² − 12. Then set it equal to 0.';
 if(t==='fprime')m='0 is the gradient there. Put x = 3 into y itself: 9 − 18 + 5 = −4.';
 if(t==='sub')m='Substitute carefully: 3² − 6×3 + 5 = −4.';
 if(t==='flip')m='Down then up (− then +, or f″ > 0) is a minimum; up then down (+ then −, or f″ < 0) is a maximum.';
 if(t==='inflect')m='Check the sign either side. A change of sign means a turn; the same sign both sides means inflection.';
 if(t==='f2zero')m='f″ = 0 is not enough. y = x⁴ has f″(0) = 0 and is a minimum. Use the sign test.';return m}
function pose(){qi++;const[q,ops]=BANK[qi%BANK.length],r=qi%3;qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});sayIt('Challenge: '+q);A.redraw()}
function grade(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),right=t==='ok';if(right){inRow++;A.win()}else{inRow=0;A.sound.miss()}
 fb.innerHTML=`${right?`✓ Correct. Streak: ${inRow}.`:'✗ '+why(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw,onStep:A=>{qbox.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
