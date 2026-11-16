/* Flagship: complex solutions of quadratics (ages 16–18; A-level Further Maths complex numbers, AQA 7367 / Edexcel 9FM0 core pure,
   CCSS HSN-CN.C.7). Lift a parabola off the x-axis and watch its roots leave the real line as a conjugate pair, simplify √(−n) with i,
   solve two quadratics with the formula, drag a root on an Argand diagram to build real quadratics, and read roots from the vertex. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#fff7ed',edge:'#1e293b',sel:'#1d4ed8',grid:'#cbd5e1',ax:'#475569',cur:'#7c3aed',rt:'#b45309',rt2:'#0e7490'};
const Q=CXART,sg=n=>n<0?'− '+(-n):'+ '+n,num=n=>n<0?'−'+(-n):String(n);
const cx=(p,q)=>q===0?num(p):(p===0?'':num(p)+' ')+(q<0?(p===0?'−':'− '):(p===0?'':'+ '))+(Math.abs(q)===1?'':Math.abs(q))+'i';
VIS.reg('flagcxroot',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const tx=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function brk(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function pane(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function fit(s,x,y,w,h,n,col){const L=brk(s,w-10,n),lh=z(n)+3;L.forEach((r,i)=>tx(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
function heading(s,won){const L=brk(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(32),L.length*lh+12);pane(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>tx(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function footer(){if(!G.msg)return;const L=brk((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 pane(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>tx(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- a plotting pane: axes, unit grid and coordinate maps ---- */
function axes(r,xr,yr,lx,ly){pane(r.x,r.y,r.w,r.h,'#ffffff',K.edge,2,8);const X0=v=>r.x+(v-xr[0])/(xr[1]-xr[0])*r.w,Y0=v=>r.y+r.h-(v-yr[0])/(yr[1]-yr[0])*r.h;
 X.save();A.paint.rrect(r.x,r.y,r.w,r.h,8);X.clip();X.strokeStyle=K.grid;X.lineWidth=1;for(let v=Math.ceil(xr[0]);v<=xr[1];v++){X.beginPath();X.moveTo(X0(v),r.y);X.lineTo(X0(v),r.y+r.h);X.stroke()}
 for(let v=Math.ceil(yr[0]);v<=yr[1];v+=(yr[1]-yr[0]>12?2:1)){X.beginPath();X.moveTo(r.x,Y0(v));X.lineTo(r.x+r.w,Y0(v));X.stroke()}
 X.strokeStyle=K.ax;X.lineWidth=2;X.beginPath();X.moveTo(r.x,Y0(0));X.lineTo(r.x+r.w,Y0(0));X.moveTo(X0(0),r.y);X.lineTo(X0(0),r.y+r.h);X.stroke();X.restore();
 tx(lx,r.x+r.w-6,Y0(0)-z(9),11,K.dim,'right',800);tx(ly,X0(0)+5,r.y+z(9),11,K.dim,'left',800);return{X0,Y0}}
function dot(x,y,col,lab,dx){X.fillStyle=col;X.strokeStyle='#ffffff';X.lineWidth=2;X.beginPath();X.arc(x,y,z(7),0,7);X.fill();X.stroke();if(lab)tx(lab,x+(dx||10),y-z(12),12,col,dx<0?'right':'left',800)}
function parab(r,m,b,cc,xr,yr){X.save();A.paint.rrect(r.x,r.y,r.w,r.h,8);X.clip();X.strokeStyle=K.cur;X.lineWidth=3;X.beginPath();for(let i=0;i<=80;i++){const x=xr[0]+(xr[1]-xr[0])*i/80,y=x*x+b*x+cc;i?X.lineTo(m.X0(x),m.Y0(y)):X.moveTo(m.X0(x),m.Y0(y))}X.stroke();X.restore()}
/* ---- step 0: lift the curve y = x² + 2x + c ---- */
const kindOf=cc=>{const d=4-4*cc;return d>0?0:d===0?1:2};
function lift(cc){if(G.won)return;G.c=Math.max(-3,Math.min(8,cc));const k=kindOf(G.c);G.seen.add(k);const d=4-4*G.c;
 G.bad=false;G.msg=k===0?`b² − 4ac = ${num(d)} > 0: two real roots, where the curve cuts the x-axis.`:k===1?'b² − 4ac = 0: the curve touches the axis. One repeated root, x = −1.':`b² − 4ac = ${num(d)} < 0: no real roots. The roots are −1 ${'± '+(Math.sqrt(-d)/2===1?'':+(Math.sqrt(-d)/2).toFixed(2).replace(/\.?0+$/,''))}i, a conjugate pair.`;
 A.sound.tick();if(G.seen.size===3&&G.c===5){G.won=true;G.msg='Past the axis, the two roots leave the real line together as −1 ± 2i: same real part, opposite imaginary parts.'}sync()}
function drawLift(t,bot){const n=A.narrow,gap=z(8),w=n?A.W-28:(A.W-28-gap)/2,h=n?(bot-t-gap*2)/2:bot-t-gap,r1={x:14,y:t+gap,w,h},r2=n?{x:14,y:t+gap*2+h,w,h}:{x:14+w+gap,y:t+gap,w,h};
 const m=axes(r1,[-5,3],[-4,10],'x','y');parab(r1,m,2,G.c,[-5,3]);G.curve=r1;tx(`y = x² + 2x ${sg(G.c)}`,r1.x+8,r1.y+r1.h-z(12),12,K.cur,'left',800);
 const a=axes(r2,[-4,2],[-3.5,3.5],'Re','Im'),d=4-4*G.c;tx('Argand diagram: the roots',r2.x+8,r2.y+r2.h-z(12),11,K.dim,'left',700);
 if(d>=0){const s=Math.sqrt(d)/2;[-1-s,-1+s].forEach(v=>{dot(m.X0(v),m.Y0(0),K.rt);dot(a.X0(v),a.Y0(0),K.rt)})}else{const q=Math.sqrt(-d)/2;dot(a.X0(-1),a.Y0(q),K.rt,cx(-1,+q.toFixed(2)),-12);dot(a.X0(-1),a.Y0(-q),K.rt2,cx(-1,-q.toFixed(2)),-12)}}
/* ---- step 1: √(−n) with i ---- */
function simp(s){if(G.won)return;const R=Q.ROOTS[G.ri];if(s!==R[1]){const w=R[2].find(x=>x[0]===s);return miss(w?w[1]:'Write √(−n) as √n × √(−1) = √n i.')}
 A.sound.pop();G.bad=false;G.msg=`√(−${R[0]}) = √${R[0]} × √(−1) = ${R[1]}. Check: (${R[1]})² = ${R[0]} × i² = −${R[0]}.`;G.ri++;if(G.ri===Q.ROOTS.length){G.won=true;G.msg='√(−n) = √n i, because i² = −1.'}sync()}
function opts(list,top,cols,h){const gap=z(8),w=(A.W-28-gap*(cols-1))/cols;return list.map((s,i)=>({x:14+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h,s}))}
const mix3=(right,w,k)=>{const all=[right].concat(w.map(x=>x[0])),r=k%3;return all.slice(r).concat(all.slice(0,r))};
/* the answer choices on screen now (shared by the canvas tiles and the buttons) */
function choices(){const k=kind();if(G.won)return[];if(k==='simp'){const R=Q.ROOTS[G.ri];return mix3(R[1],R[2],G.ri)}
 if(k==='solve'){const st=Q.SOLVE[G.si].st[G.li];return mix3(st[0],st[1],G.li+G.si)}if(k==='vert'){const V=Q.VERTEX[G.vi];return mix3(V.ans,V.w,G.vi+1)}return[]}
function drawSimp(t,bot){const R=Q.ROOTS[Math.min(G.ri,2)],y=t+z(14);pane(14,y,A.W-28,z(64),'#f8fafc',K.edge,2);tx(G.won?'√(−n) = √n × i':`√(−${R[0]}) = ?`,A.W/2,y+z(32),26,K.ink,'center',800);
 G.tiles=opts(choices(),y+z(80),3,z(54));G.tiles.forEach(o=>{pane(o.x,o.y,o.w,o.h,K.card,K.sel,2);tx(o.s,o.x+o.w/2,o.y+o.h/2,20,K.sel,'center',800)});
 const r={x:14,y:y+z(146),w:A.W-28,h:bot-y-z(152)};if(r.h<z(80))return;const a=axes(r,[-2.2,2.2],[-1.6,1.6],'Re','Im'),turn=Math.min(G.ri,2);
 [[1,0,'1'],[0,1,'i'],[-1,0,'i² = −1']].slice(0,turn+1).forEach(([u,v,l],j)=>{X.strokeStyle=K.cur;X.lineWidth=3;X.beginPath();X.moveTo(a.X0(0),a.Y0(0));X.lineTo(a.X0(u),a.Y0(v));X.stroke();dot(a.X0(u),a.Y0(v),K.cur,l,u<0?-10:10)});
 tx('× i turns 90°',r.x+r.w-8,r.y+r.h-z(12),11,K.dim,'right',700)}
/* ---- step 2: the formula, one line at a time ---- */
function line(s){if(G.won)return;const S=Q.SOLVE[G.si],st=S.st[G.li];if(s!==st[0]){const w=st[1].find(x=>x[0]===s);return miss(w?w[1]:'Follow x = (−b ± √(b² − 4ac)) ÷ 2a.')}
 A.sound.pop();G.bad=false;G.lines.push(s);G.li++;G.msg=s;if(G.li===4){G.si++;G.li=0;G.lines=[];if(G.si===Q.SOLVE.length){G.won=true;G.msg='Negative discriminant → √ gives an imaginary part → roots p ± qi.'}else G.msg=`Done: ${S.st[3][0]}. Next equation.`}sync()}
function drawSolve(t,bot){const S=Q.SOLVE[Math.min(G.si,1)],y=t+z(10);pane(14,y,A.W-28,z(40),'#f8fafc',K.edge,2);tx(G.won?'x = −1 ± 2i and x = 2 ± 3i':S.eq,A.W/2,y+z(20),18,K.ink,'center',800);
 G.lines.forEach((s,i)=>tx(s,24,y+z(58)+i*z(24),14,K.ok,'left',700));if(G.won){G.tiles=[];return}
 G.tiles=opts(choices(),y+z(58)+4*z(24),1,Math.min(z(42),(bot-y-z(60)-4*z(24)-z(24))/3));G.tiles.forEach(o=>{pane(o.x,o.y,o.w,o.h,K.card,K.sel,2);tx(o.s,o.x+o.w/2,o.y+o.h/2,15,K.sel,'center',800)})}
/* ---- step 3: drag a root, its conjugate follows ---- */
function setRoot(p,q){if(G.won)return;G.p=Math.max(-5,Math.min(5,p));G.q=Math.max(-5,Math.min(5,q));const T=Q.PAIRS[G.ti],b=-2*G.p,cc=G.p*G.p+G.q*G.q;
 if(b===T[0]&&cc===T[1]&&G.q!==0){A.sound.pop();G.bad=false;G.msg=`Roots ${cx(G.p,Math.abs(G.q))} and ${cx(G.p,-Math.abs(G.q))}: sum ${num(-b)} = −b, product ${cc} = c.`;G.ti++;if(G.ti===Q.PAIRS.length){G.won=true;G.msg='The partner is always the conjugate, so the coefficients stay real.'}}else{G.bad=false;G.msg=''}sync()}
const target=T=>`x² ${T[0]?sg(T[0])+'x ':''}${sg(T[1])}`;
function drawPair(t,bot){const y=t+z(8),T=Q.PAIRS[Math.min(G.ti,2)],b=-2*G.p,cc=G.p*G.p+G.q*G.q;pane(14,y,A.W-28,z(54),'#f8fafc',K.edge,2);
 tx(G.won?'All 3 quadratics built.':'Target: '+target(T)+' = 0',A.W/2,y+z(16),14,K.ink,'center',800);tx(`Yours: ${target([b,cc])} = 0   (sum ${num(G.p*2)}, product ${cc})`,A.W/2,y+z(38),12,K.cur,'center',800);
 const s=Math.min(A.W-28,bot-y-z(64)),r={x:(A.W-s)/2,y:y+z(62),w:s,h:s};G.plane=r;const a=axes(r,[-5.5,5.5],[-5.5,5.5],'Re','Im');G.map=a;
 X.setLineDash([4,4]);X.strokeStyle=K.dim;X.lineWidth=1.5;X.beginPath();X.moveTo(a.X0(G.p),a.Y0(G.q));X.lineTo(a.X0(G.p),a.Y0(-G.q));X.stroke();X.setLineDash([]);
 dot(a.X0(G.p),a.Y0(-G.q),K.rt2,cx(G.p,-G.q),G.p>2?-12:12);X.fillStyle=K.rt;X.beginPath();X.arc(a.X0(G.p),a.Y0(G.q),z(11),0,7);X.fill();tx(cx(G.p,G.q)+' (drag)',a.X0(G.p)+(G.p>2?-14:14),a.Y0(G.q)-z(14),12,K.rt,G.p>2?'right':'left',800)}
/* ---- step 4: read roots from the vertex ---- */
function vert(s){if(G.won)return;const V=Q.VERTEX[G.vi];if(s!==V.ans){const w=V.w.find(x=>x[0]===s);return miss(w?w[1]:'Roots of (x − p)² + k are p ± √k i.')}
 A.sound.pop();G.bad=false;G.msg=`(x ${sg(-V.p)})² ${sg(V.k)} = 0 → (x ${sg(-V.p)})² = −${V.k} → x = ${V.ans}.`;G.vi++;if(G.vi===Q.VERTEX.length){G.won=true;G.msg='Vertex (p, k) with k > 0 gives roots p ± √k i.'}sync()}
function drawVert(t,bot){const V=Q.VERTEX[Math.min(G.vi,2)],y=t+z(8),h=bot-y-z(70),r={x:14,y,w:A.W-28,h};const m=axes(r,[-5,5],[-1,11],'x','y');parab(r,m,-2*V.p,V.p*V.p+V.k,[-5,5]);
 dot(m.X0(V.p),m.Y0(V.k),K.cur,`vertex (${num(V.p)}, ${V.k})`,V.p>1?-12:12);tx(`y = (x ${sg(-V.p)})² ${sg(V.k)}`,r.x+8,r.y+z(14),13,K.cur,'left',800);
 G.tiles=opts(choices(),y+h+z(10),3,z(50));G.tiles.forEach(o=>{pane(o.x,o.y,o.w,o.h,K.card,K.sel,2);tx(o.s,o.x+o.w/2,o.y+o.h/2,15,K.sel,'center',800)})}
const kind=()=>['lift','simp','solve','pair','vert','quiz'][A.step];
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind(),H={lift:['Drag the curve up and down (or use the buttons). Find two real roots, a repeated root, then stop at c = 5.','The roots became a conjugate pair.'],simp:['Tap the simplest form.','i² = −1.'],
  solve:['Pick the right next line of working.','Both solved.'],pair:['Drag the orange root. Its partner follows. Hit the target quadratic.','Conjugates give real coefficients.'],vert:['This curve never meets the x-axis. Tap its roots.','Roots from the vertex.'],quiz:['Negative discriminant → complex conjugate roots p ± qi.','']};
 const t=heading(H[k][G.won?1:0],G.won),bot=A.H-(G.msg?z(62):z(12));
 if(k==='lift'||k==='quiz'){if(k==='quiz')G.c=5;drawLift(t,bot)}if(k==='simp')drawSimp(t,bot);if(k==='solve')drawSolve(t,bot);if(k==='pair')drawPair(t,bot);if(k==='vert')drawVert(t,bot);footer();A.fx.draw(X)}
let start=null;
function down(p){const k=kind();start=p;const o=(G.tiles||[]).find(r=>hit(p,r));
 if(k==='lift'&&hit(p,G.curve)){G.drag={y:p.y,c:G.c};return true}
 if(o){if(k==='simp')simp(o.s);if(k==='solve')line(o.s);if(k==='vert')vert(o.s);return true}
 if(k==='pair'&&hit(p,G.plane)){G.drag={pair:1};move(p);return true}return false}
function move(p){const d=G.drag;if(!d)return;const k=kind();
 if(k==='lift'){const r=G.curve,step=r.h/14,cc=d.c+Math.round((d.y-p.y)/step);if(cc!==G.c)lift(cc);return}
 if(k==='pair'){const a=G.map,r=G.plane,u=Math.round(-5.5+(p.x-r.x)/r.w*11),v=Math.round(5.5-(p.y-r.y)/r.h*11);if(u!==G.p||v!==G.q){G.p=u;G.q=v;A.sound.tick();setRoot(u,v)}}}
function up(){G.drag=null;A.redraw()}
function sync(){const k=kind();let d='Challenge.';
 if(k==='lift')d=`Curve y = x² + 2x ${sg(G.c)}. ${['Two real roots','One repeated root','Complex roots'][kindOf(G.c)]}. Seen ${G.seen.size} of 3 kinds.`;
 if(k==='simp')d=G.won?'All simplified.':`Simplify √(−${Q.ROOTS[G.ri][0]}).`;
 if(k==='solve')d=G.won?'Both solved.':`Solving ${Q.SOLVE[G.si].eq}. Lines so far: ${G.lines.join('; ')||'none'}.`;
 if(k==='pair')d=`Root at ${cx(G.p,G.q)}, partner ${cx(G.p,-G.q)}. Quadratic ${target([-2*G.p,G.p*G.p+G.q*G.q])}.`+(G.won?'':` Target ${target(Q.PAIRS[G.ti])}.`);
 if(k==='vert')d=G.won?'All three read.':`Curve with vertex (${Q.VERTEX[G.vi].p}, ${Q.VERTEX[G.vi].k}).`;
 live((G.msg?G.msg+' ':'')+d);btns();G.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(k==='lift'&&!G.won){b('Lower the curve (c − 1)',()=>lift(G.c-1));b('Raise the curve (c + 1)',()=>lift(G.c+1))}
 if(!G.won&&(k==='simp'||k==='solve'||k==='vert'))choices().forEach(o=>b('Choose: '+o,()=>{if(k==='simp')simp(o);if(k==='solve')line(o);if(k==='vert')vert(o)}));
 if(k==='pair'&&!G.won){b('Root left',()=>setRoot(G.p-1,G.q));b('Root right',()=>setRoot(G.p+1,G.q));b('Root up',()=>setRoot(G.p,G.q+1));b('Root down',()=>setRoot(G.p,G.q-1))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,c:-3,seen:new Set([0]),ri:0,si:0,li:0,lines:[],p:1,q:1,ti:0,vi:0,drag:null,tiles:[]})}
const steps=[
{h:'When the curve lifts off',p:'The roots of x² + 2x + c = 0 are where y = x² + 2x + c meets the x-axis. Raise c and the curve lifts. What happens to the roots when it no longer touches?',
predict:{q:'When the curve no longer meets the x-axis, the equation has…',opts:['no solutions of any kind','one repeated root','two complex roots, a conjugate pair'],ans:2},
task:'See all 3 kinds of root, ending at c = 5',show:()=>{steps[0].go();play([1,5].map(v=>()=>lift(v)),500)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'−1 ± 2i.')}},
{h:'Meet i',p:'No real number squares to a negative. So we define a new number, i, with i² = −1. Then √(−9) = √9 × √(−1) = 3i. Multiplying by i turns a number 90° on the Argand diagram.',
predict:{q:'What is i²?',opts:['1','−1','i'],ans:1},
task:'Simplify all 3 square roots',show:()=>{steps[1].go();play(Q.ROOTS.map(R=>()=>simp(R[1])),400)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'√(−n) = √n i.')}},
{h:'Solve with the formula',p:'The quadratic formula still works. When b² − 4ac is negative, its square root is imaginary, and the two roots are p ± qi.',
predict:{q:'What are the solutions of x² + 4 = 0?',opts:['There are none','x = ±2i','x = ±2'],ans:1},
task:'Solve both quadratics, line by line',show:()=>{steps[2].go();const f=[];Q.SOLVE.forEach(S=>S.st.forEach(st=>f.push(()=>line(st[0]))));play(f,300)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'p ± qi.')}},
{h:'Conjugate pairs',p:'If a quadratic has real coefficients, its complex roots come as a conjugate pair p + qi and p − qi. Their sum 2p and product p² + q² are real.',
predict:{q:'One root of a real quadratic is 3 + 2i. What is the other?',opts:['−3 + 2i','3 − 2i','−3 − 2i'],ans:1},
task:'Build all 3 target quadratics',show:()=>{steps[3].go();play(Q.PAIRS.map(T=>()=>setRoot(T[2],T[3])),500)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Sum −b, product c.')}},
{h:'Roots from the vertex',p:'Complete the square: y = (x − p)² + k. If k > 0 the curve sits above the axis, and (x − p)² = −k gives x = p ± √k i.',
predict:{q:'y = (x − 1)² + 4 has its vertex at (1, 4). Its roots are…',opts:['1 ± 4i','1 ± 2i','−1 ± 2i'],ans:1},
task:'Read the roots of all 3 curves',show:()=>{steps[4].go();play(Q.VERTEX.map(V=>()=>vert(V.ans)),400)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'p ± √k i.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=Q.bank[qi%Q.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});live('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=Q.WHYM[tag]||'Use i² = −1 and the quadratic formula.';
 if(tag==='nosol')m='No real solutions, but two complex ones: x² = −9 gives x = ±3i.';
 if(tag==='negall')m='The conjugate keeps the real part and flips only the sign of the i part: 4 − i → 4 + i.';
 if(tag==='disc')m='b² − 4ac < 0 means no real roots: the two roots are complex conjugates.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Complex roots lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
