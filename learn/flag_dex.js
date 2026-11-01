/* Flagship – the derivative of eˣ (ages 16–18): slide the base a of y = aˣ and watch gradient ÷ height (it is ln a)
   until it is exactly 1, at a = e ≈ 2.718; drag a point along y = eˣ and see the tangent's gradient equal the height
   everywhere; shrink h in (aʰ − 1)/h to see the limit 1 for e but 0.693 for 2; stretch e^(kx) and read gradient = k·e^(kx);
   build derivatives of c·e^(kx) from tiles; then a challenge on the classic slips (power rule on eˣ, forgetting k). */
(()=>{const E=Math.E,ln=Math.log,ex=Math.exp,fm=(x,d)=>{const k=10**(d==null?3:d),r=Math.round(x*k)/k;return(r<0?'−':'')+Math.abs(r)};
const BUILD=[['5e^(2x)',['10','5','2','7'],['e^(2x)','e^(2x − 1)','e^(x)'],0,0],['e^(−3x)',['−3','3','1','−1'],['e^(−3x)','e^(−3x − 1)','e^(−4x)'],0,0],['4e^(x/2)',['2','4','8','1/2'],['e^(x/2)','e^(x/2 − 1)','e^(x)'],0,0]];
const COEF_SLIP={'5':'That is just 5e^(2x) again. The chain rule brings down the k = 2: 5 × 2 = 10.','2':'You brought down k = 2 but lost the 5. Constants stay: 5 × 2 = 10.','7':'5 + 2 = 7 adds the numbers. Multiply them: 5 × 2 = 10.',
 '3':'The sign matters: k = −3, so the gradient is negative (the curve falls).','1':'e^(−3x) is not its own derivative: k = −3 comes down.','−1':'Only the sign came down. The whole k = −3 multiplies.',
 '4':'That forgets the k = 1/2 from inside. 4 × 1/2 = 2.','8':'Dividing by k is the integration move. Differentiating multiplies by k: 4 × 1/2 = 2.','1/2':'You brought down k but lost the 4. 4 × 1/2 = 2.'};
VIS.reg('flagdex',c=>{let A,pad,quiz,qi=-1,run=0;
const K={tok:0,cb:()=>{},a:2,x0:1,xs:{},h:1,k:1,bi:0,pick:[-1,-1],built:0,drag:null};
const mode=()=>['base','slide','limit','kx','build','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1.05:1.2)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,n,col,w,al){g.font=font(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const plot=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.56}:{x:6,y:6,w:A.W*.58,h:A.H-12};
const info=()=>A.narrow?{x:6,y:A.H*.58,w:A.W-12,h:A.H*.42-6}:{x:A.W*.6+4,y:6,w:A.W*.4-14,h:A.H-12};
const line=i=>info().y+z(12)+i*z(21);
function frame(){const r=plot(),[x0,x1,y0,y1]=mode()==='limit'?[-.05,1.05,.4,1.9]:[-2.2,2.2,-1,8],L=r.x+24,B=r.y+r.h-18,W=r.w-30,H=r.h-26;
 return{X:x=>L+(x-x0)/(x1-x0)*W,Y:y=>B-(y-y0)/(y1-y0)*H,ix:p=>x0+(p-L)/W*(x1-x0),r,x0,x1,y0,y1}}
function axes(g,M,xt,yt){const C=A.col,r=M.r;g.fillStyle=A.alpha(C.mu,.07);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
 g.strokeStyle=A.alpha(C.tx,.65);g.lineWidth=1.4;g.beginPath();g.moveTo(r.x,M.Y(0));g.lineTo(r.x+r.w,M.Y(0));g.moveTo(M.X(0),r.y);g.lineTo(M.X(0),r.y+r.h);g.stroke();
 xt.forEach(v=>put(g,fm(v,2),M.X(v),M.Y(M.y0>0?M.y0:0)+11,10,C.tx,600));yt.forEach(v=>put(g,fm(v,2),M.X(M.x0>0?M.x0:0)+(M.x0>0?14:-12),M.Y(v),10,C.tx,600));g.restore()}
function curve(g,M,f,col,w){const r=M.r;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;g.beginPath();for(let i=0;i<=220;i++){const x=M.x0+(M.x1-M.x0)*i/220;i?g.lineTo(M.X(x),M.Y(f(x))):g.moveTo(M.X(x),M.Y(f(x)))}g.stroke();g.restore()}
function tangent(g,M,x,y,m,col){const r=M.r;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=2.5;g.setLineDash([7,5]);g.beginPath();g.moveTo(M.X(x-3),M.Y(y-3*m));g.lineTo(M.X(x+3),M.Y(y+3*m));g.stroke();g.setLineDash([]);
 g.fillStyle=col;g.beginPath();g.arc(M.X(x),M.Y(y),8,0,7);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();g.restore()}
function tile(g,r,t,on,bad){const C=A.col;g.fillStyle=A.alpha(on?C.gr:bad?C.rd:C.or,on||bad?.35:.2);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=on?C.gr:C.tx;g.lineWidth=on?3:1.5;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,13,C.tx,800)}
const cT=i=>{const w=(A.W-30)/4;return{x:6+i*(w+6),y:A.H*.38,w,h:A.H*.13}},xT=i=>{const w=(A.W-24)/3;return{x:6+i*(w+6),y:A.H*.62,w,h:A.H*.13}};
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.3);g.fillRect(0,0,W,H);const p=info(),mx=p.x+p.w/2;
 if(m==='quiz'){put(g,'d/dx (c·e^(kx)) = ck·e^(kx)',W/2,H/2,19,C.tx,800);return}
 if(m==='build'){const b=BUILD[K.bi];if(K.built>=3){put(g,'Three derivatives built!',W/2,H*.4,17,C.gr,800);return}
  put(g,`d/dx ( ${b[0]} ) = ?`,W/2,H*.1,18,C.tx,800);put(g,`${K.pick[0]>=0?b[1][K.pick[0]]:'□'} · ${K.pick[1]>=0?b[2][K.pick[1]]:'□'}`,W/2,H*.23,18,C.vi,800);
  put(g,'Coefficient',W/2,H*.34,11,C.tx,700);b[1].forEach((t,i)=>tile(g,cT(i),t,K.pick[0]===i&&i===b[3],K.bad==='c'+i));put(g,'Exponential part',W/2,H*.58,11,C.tx,700);b[2].forEach((t,i)=>tile(g,xT(i),t,K.pick[1]===i&&i===b[4],K.bad==='x'+i));
  put(g,`Function ${K.bi+1} of 3`,W/2,H*.86,12,C.tx,600);return}
 const M=frame();
 if(m==='limit'){axes(g,M,[.25,.5,.75],[.5,1.5]);const q=a=>h=>h<1e-6?ln(a):(a**h-1)/h;curve(g,M,q(E),C.gr,3);curve(g,M,q(2),C.or,3);const h=K.h;
  [[E,C.gr],[2,C.or]].forEach(([a,k])=>{g.fillStyle=k;g.beginPath();g.arc(M.X(h),M.Y(q(a)(h)),7,0,7);g.fill()});g.strokeStyle=C.vi;g.lineWidth=2;g.beginPath();g.moveTo(M.X(h),M.r.y);g.lineTo(M.X(h),M.r.y+M.r.h);g.stroke();
  put(g,`h = ${fm(h,4)}`,mx,line(0),13,C.tx,800);put(g,`(eʰ − 1)/h = ${fm(q(E)(h),4)}`,mx,line(1),13,C.gr,800);put(g,`(2ʰ − 1)/h = ${fm(q(2)(h),4)}`,mx,line(2),13,C.tx,700);
  put(g,'d/dx(aˣ) = aˣ × lim (aʰ − 1)/h',mx,line(3),11,C.tx,600);if(h<=.001)put(g,'For e the limit is 1; for 2 it is ln 2 ≈ 0.693',mx,line(4),11,C.gr,800);return}
 axes(g,M,[-2,-1,1,2],[2,4,6,8]);
 if(m==='base'){const a=K.a,f=x=>a**x,y=f(1),gr=ln(a)*y;curve(g,M,ex,A.alpha(C.tx,.25),2);curve(g,M,f,C.cy,3.5);tangent(g,M,1,y,gr,C.or);
  put(g,`y = ${fm(a,3)}ˣ`,mx,line(0),14,C.tx,800);put(g,`At x = 1: height ${fm(y)}`,mx,line(1),12,C.tx,700);put(g,`gradient ${fm(gr)}`,mx,line(2),12,C.tx,700);
  const ok=Math.abs(a-E)<1e-9;put(g,`gradient ÷ height = ${fm(ln(a))}`,mx,line(3),13,ok?C.gr:C.tx,800);if(ok)put(g,'a = e ≈ 2.718: gradient = height',mx,line(4),12,C.gr,800)}
 if(m==='slide'){const x=K.x0,y=ex(x);curve(g,M,ex,C.cy,3.5);tangent(g,M,x,y,y,C.or);g.strokeStyle=C.vi;g.lineWidth=2;g.beginPath();g.moveTo(M.X(x),M.Y(0));g.lineTo(M.X(x),M.Y(y));g.stroke();
  put(g,'y = eˣ',mx,line(0),14,C.tx,800);put(g,`x = ${fm(x,2)}`,mx,line(1),12,C.tx,700);put(g,`height eˣ = ${fm(y)}`,mx,line(2),12,C.tx,700);put(g,`gradient = ${fm(y)}`,mx,line(3),13,C.gr,800);put(g,`Points checked: ${Object.keys(K.xs).length} of 3`,mx,line(4),11,C.tx,600)}
 if(m==='kx'){const k=K.k,f=x=>ex(k*x),y=f(K.x0),gr=k*y;curve(g,M,ex,A.alpha(C.tx,.25),2);curve(g,M,f,C.cy,3.5);tangent(g,M,K.x0,y,gr,C.or);
  put(g,`y = e^(${fm(k,1)}x)`,mx,line(0),14,C.tx,800);put(g,`At x = ${fm(K.x0,2)}: height ${fm(y)}`,mx,line(1),12,C.tx,700);put(g,`gradient ${fm(gr)}`,mx,line(2),12,C.tx,700);
  put(g,`gradient ÷ height = ${fm(k,1)} = k`,mx,line(3),13,k===2?C.gr:C.tx,800)}
 A.fx.draw(g)}
function setA(a){a=Math.max(1.5,Math.min(4,a));a=Math.abs(a-E)<.06?E:Math.round(a*20)/20;if(a===K.a)return;K.a=a;A.sound.tick();note(`Base ${fm(a,3)}: gradient ÷ height = ${fm(ln(a))}.`)}
function setX(x){x=Math.max(-2,Math.min(2,Math.round(x*4)/4));if(x===K.x0&&K.xs[x])return;K.x0=x;if(mode()==='slide')K.xs[x]=1;A.sound.tick();note(mode()==='kx'?`x = ${fm(x,2)}: height ${fm(ex(K.k*x))}, gradient ${fm(K.k*ex(K.k*x))}.`:`x = ${fm(x,2)}: height and gradient both ${fm(ex(x))}.`)}
function setH(e){e=Math.max(0,Math.min(3,e));K.he=e;K.h=[1,.1,.01,.001][Math.round(e)];A.sound.pop();note(`h = ${K.h}.`)}
function setK(k){k=Math.max(-2,Math.min(3,Math.round(k*2)/2));if(k===K.k)return;K.k=k;A.sound.tick();note(`k = ${fm(k,1)}: gradient = ${fm(k,1)} × height.`)}
function pick(kind,i){const b=BUILD[K.bi];if(K.built>=3)return;const slot=kind==='c'?0:1;K.pick[slot]=i;K.bad='';
 if(kind==='c'&&i!==b[3]){K.bad='c'+i;A.sound.miss();return note(COEF_SLIP[b[1][i]])}
 if(kind==='x'&&i!==b[4]){K.bad='x'+i;A.sound.miss();return note(b[2][i].includes('− 1')?'That is the power rule. eˣ is not xⁿ: the exponent stays the same, nothing is taken off.':'The exponential part keeps its own exponent. Only k comes down in front.')}
 A.sound.pop();if(K.pick[0]===b[3]&&K.pick[1]===b[4]){const t=`d/dx(${b[0]}) = ${b[1][b[3]]}${b[2][b[4]]}`;K.built++;K.bi=Math.min(2,K.bi+(K.built<3?1:0));K.pick=[-1,-1];return note(t+'.')}note('Good. Now the other part.')}
function note(msg){const m=mode();let t='';
 if(m==='base')t=K.a===E?'Found the base where gradient equals height.':'Slide the base until gradient ÷ height = 1.';
 if(m==='slide')t=Object.keys(K.xs).length<3?'Drag the point to three places.':'Everywhere on y = eˣ the gradient equals the height.';
 if(m==='limit')t=K.h>.001?'Shrink h to 0.001.':'The limit is 1 only for e.';
 if(m==='kx')t=K.k===2?'k = 2: gradient is twice the height.':'Set k to 2.';
 tell((msg?msg+' ':'')+t);controls();K.cb()}
function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(m==='base'){b('a − 0.1',()=>setA(K.a-.1),'Decrease the base');b('a + 0.1',()=>setA(K.a+.1),'Increase the base')}
 if(m==='slide'||m==='kx'){b('◀ x − 0.5',()=>setX(K.x0-.5),'Move the point left');b('x + 0.5 ▶',()=>setX(K.x0+.5),'Move the point right')}
 if(m==='kx'){b('k − 0.5',()=>setK(K.k-.5),'Decrease k');b('k + 0.5',()=>setK(K.k+.5),'Increase k')}
 if(m==='limit'){b('h ÷ 10',()=>setH((K.he||0)+1),'Make h ten times smaller');b('h × 10',()=>setH((K.he||0)-1),'Make h ten times bigger')}
 if(m==='build'&&K.built<3){const B=BUILD[K.bi];B[1].forEach((t,i)=>b(t,()=>pick('c',i),'Coefficient '+t));B[2].forEach((t,i)=>b(t,()=>pick('x',i),'Exponential part '+t))}
 A.redraw()}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const m=mode();if(m==='quiz')return false;
 if(m==='build'){const i=[0,1,2,3].find(i=>inR(p,cT(i)));if(i!=null)pick('c',i);const j=[0,1,2].find(j=>inR(p,xT(j)));if(j!=null)pick('x',j);return false}
 if(!inR(p,plot()))return false;K.drag=m;move(p);return true}
function move(p){if(!K.drag)return;const M=frame(),m=K.drag;if(m==='base')setA(1.5+2.5*Math.max(0,Math.min(1,(p.x-M.r.x)/M.r.w)));if(m==='slide'||m==='kx')setX(M.ix(p.x));if(m==='limit')setH(3*(1-Math.max(0,Math.min(1,(p.x-M.r.x)/M.r.w))))}
function up(){K.drag=null}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fs,ms)=>{const k=++K.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{K.tok++;Object.assign(K,{cb:()=>{},a:2,x0:1,xs:{},h:1,he:0,k:1,bi:0,pick:[-1,-1],built:0,drag:null,bad:''})};
const steps=[
{h:'Find the special base',p:'For y = aˣ the gradient is always a fixed multiple of the height. Drag across the graph to change the base a.',
 predict:{q:'For y = 2ˣ, the gradient at any point is…',opts:['equal to the height','smaller than the height','bigger than the height'],ans:1},task:'Make gradient ÷ height = 1',
 show:()=>{steps[0].go();later([2.3,2.5,2.7,E].map(a=>()=>setA(a)),420)},go:()=>{fresh();note();K.cb=finish(0,()=>K.a===E,'Gradient ÷ height is ln a, and ln a = 1 exactly when a = e. For 2ˣ it is ln 2 ≈ 0.693.')}},
{h:'Gradient = height',p:'On y = eˣ, drag the point along the curve. Compare the gradient of the tangent with the height.',task:'Check three different points',
 show:()=>{steps[1].go();later([-1,0,1.5].map(x=>()=>setX(x)),450)},go:()=>{fresh();K.xs={};note();K.cb=finish(1,()=>Object.keys(K.xs).length>=3,'d/dx(eˣ) = eˣ: at every point the gradient equals the height.')}},
{h:'From first principles',p:'d/dx(aˣ) = aˣ × lim (aʰ − 1)/h as h → 0. Make h smaller and watch both limits.',
 predict:{q:'As h → 0, (eʰ − 1)/h tends to…',opts:['0','1','e'],ans:1},task:'Shrink h to 0.001',
 show:()=>{steps[2].go();later([1,2,3].map(e=>()=>setH(e)),450)},go:()=>{fresh();note();K.cb=finish(2,()=>K.h<=.001,'The limit is 1 for e, so d/dx(eˣ) = eˣ × 1. For 2 it is ln 2, so d/dx(2ˣ) = 2ˣ ln 2.')}},
{h:'Stretching: e^(kx)',p:'Change k and drag the point. By the chain rule, the gradient of e^(kx) is k times its height.',
 predict:{q:'d/dx (e^(2x)) = ?',opts:['e^(2x)','2e^(2x)','2x·e^(2x − 1)'],ans:1},task:'Set k = 2 and read the gradient',
 show:()=>{steps[3].go();later([1.5,2].map(k=>()=>setK(k)),450)},go:()=>{fresh();note();K.cb=finish(3,()=>K.k===2,'d/dx(e^(kx)) = k·e^(kx). For k = 2 the gradient is always double the height.')}},
{h:'Build the derivative',p:'Pick a coefficient and an exponential part to build each derivative.',task:'Build all three derivatives',
 show:()=>{steps[4].go();later([0,1,2].flatMap(()=>[()=>pick('c',0),()=>pick('x',0)]),380)},go:()=>{fresh();note();K.cb=finish(4,()=>K.built>=3,'d/dx(c·e^(kx)) = ck·e^(kx): multiply by k, keep the exponent.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.cb()});
const QS=[['d/dx (eˣ) = ?',[['eˣ','ok'],['x·eˣ⁻¹','power'],['eˣ⁻¹','minus']]],['d/dx (3e^(4x)) = ?',[['12e^(4x)','ok'],['3e^(4x)','nok'],['4e^(4x)','lostc']]],
 ['d/dx (e^(−x)) = ?',[['−e^(−x)','ok'],['e^(−x)','sign'],['−x·e^(−x − 1)','power']]],['Why is e special?',[['d/dx(eˣ) = eˣ: gradient equals height','ok'],['It is about 2.7, the biggest base','big'],['eˣ grows faster than every other exponential','fast']]],
 ['P = 50e^(0.2t). The rate dP/dt when P = 50 is…',[['10','ok'],['50','nok2'],['0.2','lostc2']]],['d/dx (2ˣ) = ?',[['2ˣ ln 2','ok'],['2ˣ','not e'],['x·2ˣ⁻¹','power']]]];
function slip(tag){let m='d/dx(c·e^(kx)) = ck·e^(kx).';
 if(tag==='power')m='That is the power rule for xⁿ. In an exponential the variable is in the power, so the rule is different.';
 if(tag==='minus')m='Nothing is taken off the exponent. eˣ is its own derivative.';
 if(tag==='nok')m='That forgets the chain rule: the 4 inside comes down. 3 × 4 = 12.';
 if(tag==='lostc')m='You brought down the 4 but dropped the 3. Constants stay: 3 × 4 = 12.';
 if(tag==='sign')m='k = −1 comes down, so the gradient is negative: e^(−x) is a falling curve.';
 if(tag==='big')m='e is not the biggest base; 3ˣ and 10ˣ have bigger bases. e is special because its gradient equals its height.';
 if(tag==='fast')m='3ˣ grows faster than eˣ. What is special is that the gradient of eˣ equals its value.';
 if(tag==='nok2')m='50 is the size of P. The rate is k × P = 0.2 × 50 = 10.';
 if(tag==='lostc2')m='0.2 is k. Multiply by P: 0.2 × 50 = 10.';
 if(tag==='not e')m='Only base e is its own derivative. For base 2 multiply by ln 2 ≈ 0.693.';
 return m}
function pose(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+slip(tag)}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}});
A.start()})})();
