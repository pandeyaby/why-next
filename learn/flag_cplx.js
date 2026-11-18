/* Flagship: the complex number system (ages 16–18; CCSS N-CN.1, A-level Further Maths: a complex number is a + bi with real
   part a and imaginary part b; the reals and the purely imaginary numbers sit inside the complex numbers; two complex numbers
   are equal only when both parts are equal). Drag a point on the complex plane to build a + bi, sort numbers into regions of
   the set diagram, step x and y until both parts of an equation match, rewrite expressions in a + bi form, and judge equal or
   not. Every drag and tap has a button. */
(()=>{
const {PLOT,SETS,SETBOX,SOLVE,FORM,SAME,BANK,WHY}=CPLXART;
const Z={ink:'#111827',sub:'#374151',bg:'#fffdf8',rule:'#1f2937',cue:'#eef2ff',ok:'#166534',okBg:'#dcfce7',err:'#9f1239',errBg:'#ffe4e6',
 re:'#1d4ed8',reBg:'#dbeafe',im:'#a21caf',imBg:'#fae8ff',cx:'#fef3c7',grid:'#d6d3d1',dot:'#c2410c'};
const SIDES=[(x,y)=>[[3,y],[x,-2]],(x,y)=>[[2*x,y-1],[8,5]],(x,y)=>[[x+y,x-y],[6,2]]];
const neg=n=>n<0?'−'+Math.abs(n):String(n);
function form(a,b){if(!b)return neg(a);const im=(Math.abs(b)===1?'':Math.abs(b))+'i';if(!a)return(b<0?'−':'')+im;return`${neg(a)} ${b<0?'−':'+'} ${im}`}
VIS.reg('flagcplx',c=>{let A,X,pad,cq,qk=-1,run=0,cnt=0;const W={after:()=>{}};
const em=n=>Math.round(n*(A.narrow?1.03:1.1));
function tell(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function put(s,x,y,n,col,wt,al){X.font=`${wt||800} ${em(n)}px system-ui,sans-serif`;X.fillStyle=col||Z.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function brk(s,w,n,wt){X.font=`${wt||800} ${em(n)}px system-ui,sans-serif`;const o=[];let cur='';String(s).split(' ').forEach(t=>{const nx=cur?cur+' '+t:t;if(cur&&X.measureText(nx).width>w){o.push(cur);cur=t}else cur=nx});o.push(cur);return o}
function rr(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function mid(s,R,n,col,wt){const o=brk(s,R.w-em(12),n,wt),lh=em(n)+4;o.forEach((t,i)=>put(t,R.x+R.w/2,R.y+R.h/2+(i-(o.length-1)/2)*lh,n,col,wt))}
const isIn=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
const part=()=>['plot','sets','solve','form','same','quiz'][A.step];
const fail=s=>{W.bad=true;W.msg=s;A.sound.miss();talk()};
const pass=s=>{W.bad=false;W.msg=s;A.sound.pop()};
function top(s,won){const o=brk(s,A.W-44,15),lh=em(15)+4,h=Math.max(em(38),o.length*lh+12);rr(12,10,A.W-24,h,won?Z.okBg:Z.cue,won?Z.ok:Z.rule,2,12);o.forEach((t,i)=>put(t,A.W/2,10+h/2+(i-(o.length-1)/2)*lh,15,won?Z.ok:Z.ink));return 10+h}
function bottom(){if(!W.msg)return 0;const o=brk((W.bad?'✗ ':'✓ ')+W.msg,A.W-44,13),lh=em(13)+5,h=o.length*lh+12,y=A.H-h-10;rr(12,y,A.W-24,h,'#ffffff',W.bad?Z.err:Z.ok,3,12);o.forEach((t,i)=>put(t,A.W/2,y+6+lh*(i+.5),13,W.bad?Z.err:Z.ink));return h+14}
/* ---------- step 0: the complex plane ---------- */
function nudge(da,db){if(W.won)return;W.a=Math.max(-5,Math.min(5,W.a+da));W.b=Math.max(-5,Math.min(5,W.b+db));talk()}
function check(){if(W.won)return;const [lab,ta,tb]=PLOT[W.t],{a,b}=W;
 if(a===ta&&b===tb){pass(`z = ${lab}: Re(z) = ${neg(ta)}, Im(z) = ${neg(tb)}.`);W.t++;if(W.t>=PLOT.length){W.won=true;W.msg='Real part across, imaginary part up. Real numbers lie on the horizontal axis, purely imaginary ones on the vertical axis.'}return talk()}
 if(a===tb&&b===ta)return fail(`That is ${form(a,b)}: you swapped the parts. The real part ${neg(ta)} goes across; the imaginary part ${neg(tb)} goes up.`);
 if(a===-ta&&b===tb||a===ta&&b===-tb)return fail(`That is ${form(a,b)}. Check the signs: ${lab} has real part ${neg(ta)} and imaginary part ${neg(tb)}.`);
 fail(`That is ${form(a,b)}. ${lab} needs real part ${neg(ta)} across and imaginary part ${neg(tb)} up.`)}
function plane(t0,b0){const side=Math.min(A.W-28,b0-t0-em(60)),G={x:(A.W-side)/2,y:t0+em(36),s:side},u=side/10,cx=G.x+side/2,cy=G.y+side/2;W.G=G;
 const goal=W.t<PLOT.length?PLOT[W.t][0]:'done';put(W.won?'All 4 points placed.':`Target ${W.t+1} of 4: z = ${goal}`,A.W/2,t0+em(12),15,Z.ink,900);
 rr(G.x,G.y,side,side,'#ffffff',Z.rule,1.5,6);X.strokeStyle=Z.grid;X.lineWidth=1;for(let i=1;i<10;i++){X.beginPath();X.moveTo(G.x+i*u,G.y);X.lineTo(G.x+i*u,G.y+side);X.moveTo(G.x,G.y+i*u);X.lineTo(G.x+side,G.y+i*u);X.stroke()}
 X.lineWidth=3;X.strokeStyle=Z.re;X.beginPath();X.moveTo(G.x,cy);X.lineTo(G.x+side,cy);X.stroke();X.strokeStyle=Z.im;X.beginPath();X.moveTo(cx,G.y);X.lineTo(cx,G.y+side);X.stroke();
 put('Re',G.x+side-em(14),cy-em(11),12,Z.re,900);put('Im',cx+em(16),G.y+em(11),12,Z.im,900);
 for(let k=-4;k<=4;k+=2){if(!k)continue;put(neg(k),cx+k*u,cy+em(11),10,Z.re,800);put(neg(k)+'i',cx-em(14),cy-k*u,10,Z.im,800)}
 const px=W.drag?W.drag.x:cx+W.a*u,py=W.drag?W.drag.y:cy-W.b*u;X.setLineDash([5,4]);X.lineWidth=2;X.strokeStyle=Z.re;X.beginPath();X.moveTo(cx,py);X.lineTo(px,py);X.stroke();X.strokeStyle=Z.im;X.beginPath();X.moveTo(px,cy);X.lineTo(px,py);X.stroke();X.setLineDash([]);
 X.fillStyle=Z.dot;X.beginPath();X.arc(px,py,em(11),0,7);X.fill();X.strokeStyle=Z.rule;X.lineWidth=2;X.stroke();W.knob={x:px-em(24),y:py-em(24),w:em(48),h:em(48)};
 const ry=G.y+side+em(14);put(`z = ${form(W.a,W.b)}`,A.W/2,ry,15,Z.ink,900);put(`Re(z) = ${neg(W.a)}    Im(z) = ${neg(W.b)}`,A.W/2,ry+em(20),13,Z.sub,800)}
/* ---------- steps 1 and 4: sort cards ---------- */
const cards=()=>part()==='sets'?SETS:SAME;
const bins=()=>part()==='sets'?SETBOX:['Not equal','Equal'];
function drop(i){if(W.won)return;const D=cards(),it=D[W.at],want=it[part()==='sets'?1:2],why=it[part()==='sets'?2:3];if(i!==want)return fail(why);pass(why);W.at++;
 if(W.at>=D.length){W.won=true;W.msg=part()==='sets'?'Every number here is complex. Reals have b = 0, purely imaginary numbers have a = 0, and the rest have both parts.':'Equal means equal real parts and equal imaginary parts. One match is not enough.'}talk()}
function sorter(t0,b0){const D=cards(),L=bins(),g=em(8),sets=part()==='sets';let by,bh;
 if(sets){const outer={x:14,y:b0-em(150),w:A.W-28,h:em(150)};rr(outer.x,outer.y,outer.w,outer.h,Z.cx,Z.rule,2.5,14);put('ℂ  complex numbers: a + bi',outer.x+em(10),outer.y+em(14),12,Z.ink,900,'left');
  const iw=(outer.w-em(20)-g*2)/3;by=outer.y+em(30);bh=outer.h-em(40);W.bins=L.map((s,i)=>{const R={x:outer.x+em(10)+i*(iw+g),y:by,w:iw,h:bh,i};if(i<2){rr(R.x,R.y,R.w,R.h,i?Z.imBg:Z.reBg,i?Z.im:Z.re,2.5,40)}else{X.setLineDash([6,4]);rr(R.x,R.y,R.w,R.h,'#fffbeb','#92400e',2,10);X.setLineDash([])}mid(s,R,12,Z.ink,800);return R})}
 else{bh=em(58);by=b0-bh;const bw=(A.W-28-g)/2;W.bins=L.map((s,i)=>{const R={x:14+i*(bw+g),y:by,w:bw,h:bh,i};rr(R.x,R.y,R.w,R.h,i?Z.okBg:Z.errBg,Z.rule,2.5);mid(s,R,15,Z.ink);return R})}
 if(W.at<D.length){const it=D[W.at],txt=sets?it[0]:`${it[0]}   vs   ${it[1]}`,cw=Math.min(A.W-36,em(sets?220:380)),ch=em(58),home={x:(A.W-cw)/2,y:t0+(by-(sets?em(30):0)-t0-ch)/2,w:cw,h:ch},d=W.drag;W.card=home;
  const R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:home;rr(R.x,R.y,R.w,R.h,'#ffffff',d?Z.im:Z.rule,3,12);mid(txt,R,20,Z.ink,900);put(`Card ${W.at+1} of ${D.length}`,A.W/2,Math.max(t0+em(4),home.y-em(12)),12,Z.sub,800)}}
/* ---------- step 2: equate real and imaginary parts ---------- */
function step(v,d){if(W.won)return;W[v]=Math.max(-9,Math.min(9,W[v]+d));const s=SOLVE[W.p],[[lr,li],[rr2,ri]]=SIDES[W.p](W.x,W.y);
 if(lr===rr2&&li===ri){pass(`x = ${neg(W.x)}, y = ${neg(W.y)}: real parts ${neg(lr)} = ${neg(rr2)} and imaginary parts ${neg(li)} = ${neg(ri)}. From ${s[4]} and ${s[5]}.`);W.p++;W.x=0;W.y=0;
  if(W.p>=SOLVE.length){W.won=true;W.msg='One complex equation is really two real equations: real parts equal, imaginary parts equal.'}}else{W.msg='';W.bad=false}talk()}
function solver(t0,b0){if(W.p>=SOLVE.length){put('All 3 equations solved.',A.W/2,t0+em(40),16,Z.ok,900);W.steps=[];return}const s=SOLVE[W.p],[[lr,li],[rr2,ri]]=SIDES[W.p](W.x,W.y);
 put(`Equation ${W.p+1} of 3`,A.W/2,t0+em(8),12,Z.sub,800);put(`${s[0]} = ${s[1]}`,A.W/2,t0+em(34),A.narrow?17:20,Z.ink,900);
 const rows=[['Real parts',lr,rr2,Z.re,Z.reBg],['Imaginary parts',li,ri,Z.im,Z.imBg]];rows.forEach(([n,l,r,col,bg],k)=>{const R={x:14,y:t0+em(58)+k*em(46),w:A.W-28,h:em(40)},m=l===r;rr(R.x,R.y,R.w,R.h,bg,col,2,10);
  put(`${n}:  ${neg(l)} ${m?'=':'≠'} ${neg(r)}  ${m?'✓':'✗'}`,A.W/2,R.y+R.h/2,14,m?Z.ok:Z.err,900)});
 const g=em(8),y0=t0+em(160),bw=(A.W-28-g)/2,bh=Math.min(em(96),b0-y0-4);W.steps=[];['x','y'].forEach((v,k)=>{const R={x:14+k*(bw+g),y:y0,w:bw,h:bh};rr(R.x,R.y,R.w,R.h,'#ffffff',Z.rule,2,12);put(`${v} = ${neg(W[v])}`,R.x+bw/2,R.y+em(18),18,Z.ink,900);
  const tw=(bw-em(24))/2,th=Math.max(em(40),bh-em(46));[[-1,'−'],[1,'+']].forEach(([d,l],j)=>{const T={x:R.x+em(8)+j*(tw+em(8)),y:R.y+em(38),w:tw,h:th,v,d};rr(T.x,T.y,T.w,T.h,j?Z.okBg:Z.errBg,Z.rule,2,10);put(l,T.x+tw/2,T.y+th/2,22,Z.ink,900);W.steps.push(T)})})}
/* ---------- step 3: write it as a + bi ---------- */
function pickForm(k){if(W.won)return;const [e,ans,bad]=FORM[W.f],opts=W.opts;const choice=opts[k];if(choice[1]!=='ok')return fail(`${choice[0]} is not right. ${WHY[choice[1]]}`);
 pass(`${e} = ${ans}.`);W.f++;if(W.f>=FORM.length){W.won=true;W.msg='Collect real parts together, imaginary parts together, and replace i² with −1.'}talk()}
function former(t0,b0){if(W.f>=FORM.length){W.optR=[];return}const [e,ans,bad]=FORM[W.f],all=[[ans,'ok'],...bad],r=W.f%3;W.opts=all.slice(r).concat(all.slice(0,r));
 put(`Expression ${W.f+1} of ${FORM.length}`,A.W/2,t0+em(8),12,Z.sub,800);const E={x:(A.W-Math.min(A.W-36,em(300)))/2,y:t0+em(24),w:Math.min(A.W-36,em(300)),h:em(64)};rr(E.x,E.y,E.w,E.h,Z.cx,Z.rule,2.5,12);mid(e,E,22,Z.ink,900);
 put('In a + bi form, this is…',A.W/2,E.y+E.h+em(18),13,Z.sub,800);const g=em(8),oy=E.y+E.h+em(36),ow=(A.W-28-g*2)/3,oh=Math.min(em(70),b0-oy-4);
 W.optR=W.opts.map(([w],k)=>{const R={x:14+k*(ow+g),y:oy,w:ow,h:oh,k};rr(R.x,R.y,R.w,R.h,'#ffffff',Z.rule,2.5,12);mid(w,R,18,Z.ink,900);return R})}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':Z.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=Z.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=part(),H={plot:['Drag the point to make each number a + bi.','You can place a + bi.'],sets:['Where does each number belong? Drag it into a region.','Every number sorted.'],
  solve:['Step x and y until both parts match.','Both parts matched, every time.'],form:['Pick the a + bi form of each expression.','All in a + bi form.'],
  same:['Equal or not? Drag each pair to a box.','You can test equality.'],quiz:['z = a + bi: Re(z) = a, Im(z) = b, both real.','']};
 const t=top(W.won?H[k][1]:H[k][0],W.won),b=A.H-bottom()-em(6);
 if(k==='plot')plane(t+em(8),b);if(k==='sets'||k==='same')sorter(t+em(10),b);if(k==='solve')solver(t+em(10),b);if(k==='form')former(t+em(10),b);
 if(k==='quiz'){const R={x:em(28),y:t+em(26),w:A.W-em(56),h:Math.min(em(150),b-t-em(50))};rr(R.x,R.y,R.w,R.h,Z.imBg,Z.rule,2,12);mid('Every complex number is a + bi. Two are equal only when their real parts match and their imaginary parts match.',R,16,Z.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let hold=null;
function snap(p){const G=W.G,u=G.s/10;W.a=Math.max(-5,Math.min(5,Math.round((p.x-G.x-G.s/2)/u)));W.b=Math.max(-5,Math.min(5,Math.round((G.y+G.s/2-p.y)/u)))}
function down(p){const k=part();if(W.won)return false;
 if(k==='plot'&&W.G&&isIn(p,{x:W.G.x,y:W.G.y,w:W.G.s,h:W.G.s})){hold='pt';W.drag={x:p.x,y:p.y};snap(p);A.redraw();return true}
 if(k==='sets'||k==='same'){if(isIn(p,W.card)){hold='card';W.drag={x:p.x,y:p.y};A.redraw();return true}const R=(W.bins||[]).find(q=>isIn(p,q));if(R){drop(R.i);return true}}
 if(k==='solve'){const T=(W.steps||[]).find(q=>isIn(p,q));if(T){step(T.v,T.d);return true}}
 if(k==='form'){const R=(W.optR||[]).find(q=>isIn(p,q));if(R){pickForm(R.k);return true}}
 return false}
function move(p){if(!hold)return;W.drag={x:p.x,y:p.y};if(hold==='pt')snap(p);A.redraw()}
function up(p){const h=hold;hold=null;W.drag=null;if(h==='pt'){snap(p);check()}else if(h==='card'){const R=(W.bins||[]).find(q=>isIn(p,q));if(R)drop(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function talk(){const k=part();let d='Challenge.';
 if(k==='plot')d=W.won?'All points placed.':`Target: ${PLOT[W.t][0]}. Point at ${form(W.a,W.b)}, real part ${neg(W.a)}, imaginary part ${neg(W.b)}.`;
 if(k==='sets'||k==='same'){const it=cards()[W.at];d=W.won?'All cards sorted.':`Card ${W.at+1} of ${cards().length}: ${k==='sets'?it[0]:it[0]+' and '+it[1]}. Boxes: ${bins().join(', ')}.`}
 if(k==='solve'&&W.p<SOLVE.length){const [[lr,li],[rr2,ri]]=SIDES[W.p](W.x,W.y);d=`Equation: ${SOLVE[W.p][0]} = ${SOLVE[W.p][1]}. x = ${neg(W.x)}, y = ${neg(W.y)}. Real parts ${neg(lr)} and ${neg(rr2)}; imaginary parts ${neg(li)} and ${neg(ri)}.`}
 if(k==='form'&&W.f<FORM.length)d=`Expression: ${FORM[W.f][0]}.`;
 tell((W.msg?W.msg+' ':'')+d);controls();W.after()}
function controls(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();talk()}};
 if(!W.won){if(k==='plot'){b('Real part −1',()=>nudge(-1,0));b('Real part +1',()=>nudge(1,0));b('Imaginary part −1',()=>nudge(0,-1));b('Imaginary part +1',()=>nudge(0,1));b('Check this point',check)}
  if(k==='sets'||k==='same')bins().forEach((n,i)=>b(n,()=>drop(i)));
  if(k==='solve'){b('x − 1',()=>step('x',-1));b('x + 1',()=>step('x',1));b('y − 1',()=>step('y',-1));b('y + 1',()=>step('y',1))}
  if(k==='form'&&W.f<FORM.length){const [e,ans,bad]=FORM[W.f],all=[[ans,'ok'],...bad],r=W.f%3;W.opts=all.slice(r).concat(all.slice(0,r));W.opts.forEach(([w],i)=>b(w,()=>pickForm(i)))}}
 A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++cnt;fns.forEach((f,j)=>setTimeout(()=>{if(id===cnt){f();talk()}},(j+1)*(A.reduced()?40:ms)))};
function clear(){cnt++;Object.assign(W,{after:()=>{},won:false,msg:'',bad:false,a:0,b:0,t:0,at:0,drag:null,p:0,x:0,y:0,f:0,opts:[]})}
const goTo=(ta,tb)=>()=>{W.a=ta;W.b=tb;check()};
const walk=()=>{const out=[];SOLVE.forEach(([,,tx,ty],i)=>{const sx=Math.sign(tx),sy=Math.sign(ty);for(let n=0;n<Math.abs(tx);n++)out.push(()=>step('x',sx));for(let n=0;n<Math.abs(ty);n++)out.push(()=>step('y',sy))});return out};
const steps=[
{h:'Build a + bi',p:'A complex number is z = a + bi, where a and b are real and i² = −1. a is the real part, Re(z). b is the imaginary part, Im(z). On the complex plane, a goes across and b goes up.',
predict:{q:'What is the imaginary part of 4 − 7i?',opts:['−7i','−7'],ans:1},
task:'Place all 4 numbers',show:()=>{steps[0].go();replay(PLOT.map(([,a,b])=>goTo(a,b)),520)},go:()=>{clear();talk();W.after=ok(0,()=>W.won,'Points placed.')}},
{h:'Real, imaginary or neither?',p:'The real numbers are the complex numbers with b = 0. The purely imaginary numbers have a = 0 and b ≠ 0. Everything sits inside ℂ.',
predict:{q:'Is 5 a complex number?',opts:['No, it has no i','Yes, it is 5 + 0i'],ans:1},
task:'Sort all 8 numbers',show:()=>{steps[1].go();replay(SETS.map(s=>()=>drop(s[1])),360)},go:()=>{clear();talk();W.after=ok(1,()=>W.won,'Numbers placed in ℂ.')}},
{h:'Equal means both parts',p:'Two complex numbers are equal only if their real parts are equal and their imaginary parts are equal. So one complex equation gives two real equations.',
predict:{q:'3 + yi = x − 2i, with x and y real. Can you find both x and y?',opts:['No: one equation, two unknowns','Yes: equate real parts and imaginary parts'],ans:1},
task:'Solve all 3 equations',show:()=>{steps[2].go();replay(walk(),160)},go:()=>{clear();talk();W.after=ok(2,()=>W.won,'Parts equated.')}},
{h:'Write it as a + bi',p:'Standard form puts the real part first and the imaginary part second. Replace i² with −1 and √(−n) with √n i, then collect like parts.',
task:'Rewrite all 4 expressions',show:()=>{steps[3].go();replay(FORM.map(()=>()=>pickForm(W.opts.findIndex(o=>o[1]==='ok'))),520)},go:()=>{clear();talk();W.after=ok(3,()=>W.won,'Standard form mastered.')}},
{h:'Equal or not?',p:'Write both numbers as a + bi first. Then compare the real parts and the imaginary parts.',
task:'Judge all 6 pairs',show:()=>{steps[4].go();replay(SAME.map(s=>()=>drop(s[2])),380)},go:()=>{clear();talk();W.after=ok(4,()=>W.won,'Equality tested.')}},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>W.after()});
function quiz(){qk++;const [q,good,bad]=BANK[qk%BANK.length],all=[[good,'ok'],...bad],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,good)});tell('Challenge: '+q);A.redraw()}
function grade(tag,good){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Write it as a + bi, then compare the parts.';
 if(tag==='imi')m=`Im(z) is a real number. ${WHY.imi}`;
 if(tag==='swap')m=`Real part first, imaginary part is the coefficient of i. ${WHY.swap}`;
 if(tag==='half')m=`Equal complex numbers need equal real parts and equal imaginary parts. ${WHY.half}`;
 if(yes){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.8,tall:1.6,draw,onStep:B=>{cq.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Complex number lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
