/* Flagship – solving quadratics by square roots (ages 14–16): drag the line y = k across y = x² and watch the two
   solutions ±√k appear, find where one solution or none happens, undo 3x² − 12 = 36 step by step (and see why rooting
   too early or forgetting ± fails), slide the parabola to solve (x − p)² = q as x = p ± √q, then build an equation
   for given solutions. Drag the line or the vertex on the graph, or use the buttons. */
(()=>{const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),X0=-8,X1=10,Y0=-10,Y1=40;
const f2=v=>Math.abs(v-Math.round(v))<1e-9?String(Math.round(v)).replace('-','−'):v.toFixed(2).replace(/0+$/,'').replace('-','−');
const sq=(p)=>p===0?'x²':`(x ${p>0?'−':'+'} ${Math.abs(p)})²`,num=v=>f2(v);
const rootTxt=k=>{const r=Math.sqrt(k);return Number.isInteger(r)?String(r):`√${k} ≈ ${r.toFixed(2)}`};
const EQS=[{a:3,b:-12,c:36},{a:2,b:5,c:55}],SHIFT=[{p:2,q:25},{p:-1,q:16}],BUILD=[[1,9],[-2,4]];
VIS.reg('flagsqroot',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;
const fresh=()=>({want:()=>{},won:0,k:9,p:0,i:0,seen:{},lines:[],eq:null,drag:null,lastMsg:'',busy:0}),S=fresh();
const mode=()=>['two','none','undo','shift','build','quiz'][A.step],fast=()=>A.reduced();
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},need=()=>({two:2,none:3,undo:2,shift:2,build:2}[mode()]||9);
function label(g,t,x,y,n,col,wt,al,mw){g.font=`${wt||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function pill(g,t,x,y,n,col,al){g.font=`800 ${n}px system-ui,sans-serif`;const w=g.measureText(t).width+16,bx=al==='left'?x:x-w/2;g.fillStyle=A.alpha(A.col.pn,.92);A.paint.rrect(bx,y-n*.9,w,n*1.8,8);g.fill();g.strokeStyle=col||A.mix(A.col.tx,A.col.pn,.5);g.lineWidth=1.5;g.stroke();label(g,t,bx+w/2,y,n,A.col.tx,800)}
/* the graph frame */
const box=()=>({l:30,r:A.W-10,t:A.H*.05,b:A.H*.93});
const px=x=>{const b=box();return b.l+(x-X0)/(X1-X0)*(b.r-b.l)},py=y=>{const b=box();return b.b-(y-Y0)/(Y1-Y0)*(b.b-b.t)};
const ux=X=>{const b=box();return X0+(X-b.l)/(b.r-b.l)*(X1-X0)},uy=Y=>{const b=box();return Y0+(b.b-Y)/(b.b-b.t)*(Y1-Y0)};
const roots=()=>S.k<0?[]:S.k===0?[S.p]:[S.p-Math.sqrt(S.k),S.p+Math.sqrt(S.k)];
function drawGraph(g){const C=A.col,b=box(),grid=A.mix(C.tx,C.pn,.85),ax=A.mix(C.tx,C.pn,.35);g.lineWidth=1;
 for(let x=X0;x<=X1;x++){g.strokeStyle=grid;g.beginPath();g.moveTo(px(x),b.t);g.lineTo(px(x),b.b);g.stroke();if(x%2===0&&x)label(g,num(x),px(x),py(0)+11,10,C.mu,600)}
 for(let y=Y0;y<=Y1;y+=5){g.strokeStyle=grid;g.beginPath();g.moveTo(b.l,py(y));g.lineTo(b.r,py(y));g.stroke();if(y%10===0&&y)label(g,num(y),b.l-4,py(y),10,C.mu,600,'right')}
 g.strokeStyle=ax;g.lineWidth=1.8;g.beginPath();g.moveTo(b.l,py(0));g.lineTo(b.r,py(0));g.moveTo(px(0),b.t);g.lineTo(px(0),b.b);g.stroke();
 g.save();g.beginPath();g.rect(b.l,b.t,b.r-b.l,b.b-b.t);g.clip();g.strokeStyle=C.ac;g.lineWidth=3.5;g.beginPath();for(let i=0;i<=240;i++){const x=X0+(X1-X0)*i/240,y=(x-S.p)**2;i?g.lineTo(px(x),py(y)):g.moveTo(px(x),py(y))}g.stroke();
 const ky=py(S.k);g.strokeStyle=C.or;g.lineWidth=3;g.setLineDash(S.drag&&S.drag.what==='k'?[]:[9,5]);g.beginPath();g.moveTo(b.l,ky);g.lineTo(b.r,ky);g.stroke();g.setLineDash([]);
 roots().forEach(r=>{g.strokeStyle=A.alpha(C.vi,.6);g.lineWidth=1.5;g.beginPath();g.moveTo(px(r),ky);g.lineTo(px(r),py(0));g.stroke();A.paint.ball(px(r),ky,7,C.vi)});
 if(mode()==='shift'||mode()==='build'){A.paint.ball(px(S.p),py(0),9,C.ac)}g.restore();
 pill(g,`y = ${num(S.k)}`,b.r-6-36,ky-14,12,C.or);const R=roots();
 pill(g,`${sq(S.p)} = ${num(S.k)}`,b.l+8,b.t+16,14,null,'left');
 const ans=!R.length?'no real solutions':R.length===1?`one solution: x = ${num(R[0])}`:S.p===0?`x = ±${rootTxt(S.k)}`:`x = ${num(S.p)} ± ${rootTxt(S.k)}`;
 pill(g,ans,b.l+8,b.t+46,13,null,'left');if(R.length===2&&S.p!==0)pill(g,`x = ${num(R[0])} or x = ${num(R[1])}`,b.l+8,b.t+76,13,null,'left');
 if(mode()==='shift'){pill(g,`Solve ${sq(SHIFT[S.i].p)} = ${SHIFT[S.i].q}`,b.r-6,b.b-18,13,C.vi,'right')}
 if(mode()==='build'){const[r1,r2]=BUILD[S.i];pill(g,`Target: x = ${num(r1)} and x = ${num(r2)}`,b.r-6,b.b-18,13,C.vi,'right');[r1,r2].forEach(r=>{g.strokeStyle=C.vi;g.lineWidth=2;g.beginPath();g.moveTo(px(r)-6,py(0)-6);g.lineTo(px(r)+6,py(0)+6);g.moveTo(px(r)+6,py(0)-6);g.lineTo(px(r)-6,py(0)+6);g.stroke()})}}
/* right-align pills that ask for it */
const _pill=pill;pill=function(g,t,x,y,n,col,al){if(al==='right'){g.font=`800 ${n}px system-ui,sans-serif`;return _pill(g,t,x-g.measureText(t).width-16,y,n,col,'left')}return _pill(g,t,x,y,n,col,al)};
/* ---- undo the equation ---- */
const OPS=[['const','Undo the constant'],['div','÷ the coefficient'],['pm','Square root, ±'],['plus','Square root, + only']];
const eqTxt=e=>e.done?e.done:`${e.a===1?'':num(e.a)}x²${e.b?(e.b<0?' − ':' + ')+num(Math.abs(e.b)):''} = ${num(e.c)}`;
const tileR=i=>{const w=(A.W-20)/2,h=A.H*.12;return{x:10+(i%2)*w,y:A.H*.66+Math.floor(i/2)*(h+8),w:w-8,h}};
function drawUndo(g){const C=A.col;S.lines.forEach((l,j)=>{const y=A.H*.08+j*A.H*.13;label(g,l.t,A.W*.36,y,A.narrow?19:21,j===S.lines.length-1?C.tx:C.mu,800);if(l.why)label(g,l.why,A.W-8,y,11,C.mu,700,'right',A.W*.3)});
 OPS.forEach(([k,t],i)=>{const r=tileR(i);g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=A.mix(C.tx,C.pn,.45);g.lineWidth=1.5;g.stroke();label(g,t,r.x+r.w/2,r.y+r.h/2,13,C.tx,700,'center',r.w-8)})}
function op(k){if(mode()!=='undo'||S.won>=need()||!S.eq||S.eq.done||S.busy)return;const e=S.eq,o=e.b?num(Math.abs(e.b)):'';
 if(k==='const'){if(!e.b)return miss('There is no constant left to undo: x² already has the number side to itself.');const c2=e.c-e.b;push({a:e.a,b:0,c:c2},`${e.b<0?'+':'−'} ${o} both sides`);return say(`${e.b<0?'Added':'Subtracted'} ${o} on both sides: ${eqTxt(S.eq)}.`)}
 if(k==='div'){if(e.a===1)return miss('x² already has coefficient 1. Nothing to divide by.');push({a:1,b:e.b/e.a,c:e.c/e.a},`÷ ${num(e.a)} both sides`);return say(`Divided every term by ${num(e.a)}: ${eqTxt(S.eq)}.`)}
 if(e.b)return miss(`Too early. √(${eqTxt(e).split(' = ')[0]}) is not ${e.a===1?'':'√'+num(e.a)+'·'}x ${e.b<0?'−':'+'} √${o}: a root does not split over + or −. Get x² on its own first.`);
 if(e.a!==1)return miss(`Divide by ${num(e.a)} first, so x² is on its own. √(${num(e.a)}x²) would give √${num(e.a)}·x, which is messier.`);
 if(e.c<0)return miss('x² cannot equal a negative number, so there are no real solutions.');
 const r=Math.sqrt(e.c);if(k==='plus')return miss(`x = ${f2(r)} is only half the answer. (−${f2(r)})² = ${num(e.c)} too, so you need ±.`);
 S.eq={...e,done:`x = ±${f2(r)}`};S.lines.push({t:S.eq.done,why:'√ both sides, ±'});S.won++;A.sound.pop();
 say(`x = ${f2(r)} or x = −${f2(r)}. Check: ${num(EQS[S.i].a)} × ${f2(r)}² ${EQS[S.i].b<0?'−':'+'} ${Math.abs(EQS[S.i].b)} = ${EQS[S.i].c}.${S.won<need()?' Next equation.':''}`);
 if(S.won<need()){S.busy=1;const v=ver;setTimeout(()=>{if(v===ver){S.busy=0;loadEq(S.i+1)}},fast()?10:1300)}keys();A.redraw();S.want()}
function push(e,why){S.eq=e;S.lines.push({t:eqTxt(e),why});A.sound.tick();keys();A.redraw()}
function loadEq(i){S.i=i;S.eq={...EQS[i]};S.lines=[{t:eqTxt(S.eq),why:''}];keys();A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.03:.4);g.fillRect(0,0,W,H);const m=mode();
 if(m==='undo')drawUndo(g);else if(m==='quiz'){label(g,'(x − p)² = q  ⇒  x = p ± √q',W/2,H*.4,A.narrow?17:20,C.tx,800);label(g,'Isolate the square, then root with ±.',W/2,H*.55,14,C.mu,700)}else drawGraph(g);A.fx.draw(g)}
function miss(t){A.sound.miss();say(t);A.redraw()}
/* graph changes: set the line and the vertex, then react */
function setK(k){S.k=cl(Math.round(k),Y0,Y1-2);react()}
function setP(p){if(!['shift','build'].includes(mode()))return;S.p=cl(Math.round(p),-6,8);react()}
function react(){const m=mode(),R=roots();if(S.won>=need()||S.busy)return A.redraw();let msg='';
 if(m==='two'){const T=[16,36][S.won];msg=R.length===2?`x² = ${S.k}, so x = ±${rootTxt(S.k)}. Two solutions, one each side of the y-axis.`:R.length?'x² = 0: the line just touches the curve.':`x² = ${S.k}: the line misses the curve.`;
  if(S.k===T)return win(`x² = ${T} gives x = ${Math.sqrt(T)} and x = −${Math.sqrt(T)}. (−${Math.sqrt(T)})² = ${T} too.`,()=>{});}
 if(m==='none'){const c3=S.k>0?'pos':S.k===0?'zero':'neg';msg={pos:`x² = ${S.k}: two solutions, ±${rootTxt(S.k)}.`,zero:'x² = 0: one solution, x = 0. The line only touches the curve at its lowest point.',neg:`x² = ${num(S.k)}: no real solutions. Every real number squared is 0 or more, so the line misses the curve.`}[c3];
  if(!S.seen[c3]){S.seen[c3]=1;S.won++;A.sound.pop();if(S.won>=need()){say(msg+' You have found all three cases.');A.redraw();return S.want()}}}
 if(m==='shift'){const t=SHIFT[S.i];msg=`${sq(S.p)} = ${num(S.k)}: ${R.length?R.map(r=>'x = '+num(+r.toFixed(2))).join(' or '):'no real solutions'}.`+(S.k===t.q&&S.p!==t.p?` The line is right. Move the vertex to where ${sq(t.p).slice(1,-2)} = 0.`:S.p===t.p&&S.k!==t.q?` The vertex is right. Now set the line to y = ${t.q}.`:'');if(S.k===t.q&&S.p===-t.p&&t.p!==0)msg=`Check the sign: ${sq(t.p)} is zero when x = ${num(t.p)}, so the vertex sits at x = ${num(t.p)}.`;
  if(S.p===t.p&&S.k===t.q)return win(`x ${t.p>0?'−':'+'} ${Math.abs(t.p)} = ±${Math.sqrt(t.q)}, so x = ${num(t.p)} ± ${Math.sqrt(t.q)}: x = ${num(t.p-Math.sqrt(t.q))} or x = ${num(t.p+Math.sqrt(t.q))}.`,()=>{S.i++;S.p=0;S.k=9})}
 if(m==='build'){const[a,b]=BUILD[S.i],mid=(a+b)/2,h=(b-a)/2;msg=`Solutions now: ${R.length?R.map(num).join(' and '):'none'}.`;
  if(S.p===mid&&S.k!==h*h)msg+=` The middle is right. The solutions sit √k either side of it, and you need them ${h} away.`;else if(S.k===h*h&&S.p!==mid)msg+=` The gap is right. Now move the vertex halfway between ${num(a)} and ${num(b)}.`;
  if(S.p===mid&&S.k===h*h)return win(`${sq(mid)} = ${h*h} has solutions ${num(mid)} ± ${h}: x = ${num(a)} and x = ${num(b)}.`,()=>{S.i++;S.p=-3;S.k=4})}
 if(msg&&msg!==S.lastMsg){S.lastMsg=msg;say(msg)}A.redraw()}
function win(msg,nx){S.won++;A.sound.pop();say(msg+(S.won<need()?' Here is the next one.':''));if(S.won<need()){S.busy=1;const v=ver;S.drag=null;setTimeout(()=>{if(v===ver){S.busy=0;nx();A.redraw()}},fast()?10:1300)}keys();A.redraw();S.want()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.won>=need())return;const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='undo')return OPS.forEach(([k,t])=>B(t,t,()=>op(k)));
 B('Line −5','Move the line y = k down by 5',()=>setK(S.k-5));B('Line −1','Move the line y = k down by 1',()=>setK(S.k-1));B('Line +1','Move the line y = k up by 1',()=>setK(S.k+1));B('Line +5','Move the line y = k up by 5',()=>setK(S.k+5));
 if(m==='shift'||m==='build'){B('◀ Vertex','Move the parabola left by 1',()=>setP(S.p-1));B('Vertex ▶','Move the parabola right by 1',()=>setP(S.p+1))}}
function down(p){const m=mode();if(m==='quiz'||S.won>=need())return false;
 if(m==='undo'){const i=OPS.findIndex((o,i)=>{const r=tileR(i);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(i>=0)op(OPS[i][0]);return false}
 if((m==='shift'||m==='build')&&Math.hypot(p.x-px(S.p),p.y-py(0))<30){S.drag={what:'p'};return true}
 if(Math.abs(p.y-py(S.k))<26){S.drag={what:'k'};A.redraw();return true}return false}
function move(p){const d=S.drag;if(!d)return;if(d.what==='k')setK(uy(p.y));else setP(ux(p.x))}
function up(){S.drag=null;A.redraw()}
const ready=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=(x)=>{ver++;Object.assign(S,fresh(),x||{})};
const slide=(to,f)=>()=>f(to);
const steps=[
{h:'Two square roots',p:'The orange line is y = k, so where it meets y = x² you have x² = k. Drag the line. Make x = ±4, then x = ±6.',predict:{q:'How many solutions does x² = 25 have?',opts:['One: x = 5','Two: x = 5 and x = −5'],ans:1},task:'Make x = ±4, then x = ±6',
 show:()=>{steps[0].go();play([12,16,20,28,36].map(k=>slide(k,setK)),600)},go:()=>{wipe({k:9});say('x² = 9: x = 3 or x = −3. Drag the orange line.');keys();S.want=ready(0,()=>S.won>=2,'A positive number has two square roots, so x² = k gives x = ±√k.')}},
{h:'One solution or none',p:'Drag the line down to 0 and below. Find every case: two solutions, one, and none.',predict:{q:'How many real solutions does x² = −9 have?',opts:['One: x = −3','Two: x = 3 and x = −3','None'],ans:2},task:'Find all three cases',
 show:()=>{steps[1].go();play([4,0,-4].map(k=>slide(k,setK)),700)},go:()=>{wipe({k:9,seen:{pos:1},won:1});say('x² = 9 has two solutions. Now move the line down.');keys();S.want=ready(1,()=>S.won>=3,'k > 0: two solutions. k = 0: one. k < 0: none, because no real square is negative.')}},
{h:'Undo in order',p:'Get x² on its own, then take the square root with ±. Tap a step on the picture or below.',predict:{q:'What is a good first step for 3x² − 12 = 36?',opts:['Square-root both sides','Add 12 to both sides'],ans:1},task:'Solve 2 equations',
 show:()=>{steps[2].go();play([()=>op('const'),()=>op('div'),()=>op('pm'),()=>{},()=>{},()=>{},()=>op('const'),()=>op('div'),()=>op('pm')],400)},go:()=>{wipe();loadEq(0);say('Solve 3x² − 12 = 36.');S.want=ready(2,()=>S.won>=2,'Isolate x² first, then root both sides and keep both signs.')}},
{h:'Slide the square',p:'Drag the blue vertex dot to move the parabola, and drag the line. Solve each equation on the graph.',predict:{q:'What are the solutions of (x − 2)² = 25?',opts:['x = 7 and x = −3','x = 5 and x = −5','x = 7 and x = 3'],ans:0},task:'Solve 2 equations',
 show:()=>{steps[3].go();play([()=>setP(1),()=>setP(2),()=>setK(25),()=>{},()=>{},()=>{},()=>setP(-1),()=>setK(16)],400)},go:()=>{wipe({k:9});say('Solve (x − 2)² = 25. Move the vertex and the line.');keys();S.want=ready(3,()=>S.won>=2,'(x − p)² = q gives x − p = ±√q, so x = p ± √q.')}},
{h:'Build the equation',p:'Work backwards. Move the vertex and the line until the solutions are the two crosses.',task:'Hit 2 targets',
 show:()=>{steps[4].go();play([()=>setP(5),()=>setK(16),()=>{},()=>{},()=>{},()=>setP(1),()=>setK(9)],450)},go:()=>{wipe({k:9});say('Target: x = 1 and x = 9. Move the vertex and the line.');keys();S.want=ready(4,()=>S.won>=2,'The vertex is halfway between the solutions, and q is half the gap, squared.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Solve x² = 49.',[['x = 7 or x = −7','ok'],['x = 7','plus'],['x = 24.5','half']]],
 ['Solve 2x² = 50.',[['x = 5 or x = −5','ok'],['x = ±10','sqrtfirst'],['x = ±25','noroot']]],
 ['Solve (x − 3)² = 16.',[['x = 7 or x = −1','ok'],['x = 4 or x = −4','noshift'],['x = −7 or x = 1','sign']]],
 ['How many real solutions does x² + 9 = 0 have?',[['None','ok'],['Two: x = ±3','neg'],['One: x = −3','neg']]],
 ['Solve x² − 5 = 20.',[['x = 5 or x = −5','ok'],['x = ±√20 + 5','order'],['x = ±15','order']]]];
function hint(t){let m='Isolate the square, then take the square root of both sides with ±.';
 if(t==='plus')m='(−7)² = 49 too. A positive number has two square roots, so write x = ±7.';
 if(t==='half')m='x² means x × x, not 2 × x. Undo a square with a square root, not by halving.';
 if(t==='sqrtfirst')m='Divide by 2 first: x² = 25. Rooting 50 gives about 7.07, and ±10 is the root of 100.';
 if(t==='noroot')m='x² = 25 is not the end. Take the square root: x = ±5.';
 if(t==='noshift')m='Those solve x − 3 = ±4. Now add 3: x = 3 + 4 = 7 or x = 3 − 4 = −1.';
 if(t==='sign')m='Check the sign: x − 3 = ±4 means x = 3 ± 4. Try x = 7: (7 − 3)² = 16 ✓.';
 if(t==='neg')m='x² = −9, and no real number squared is negative. (−3)² = +9, so there are no real solutions.';
 if(t==='order')m='Undo the − 5 first: x² = 25, then x = ±5. Rooting before isolating x² breaks the equation.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Right: isolate the square, then ±√.':'✗ '+hint(t)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
