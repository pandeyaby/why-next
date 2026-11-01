/* Flagship – hyperbolic functions, definitions (ages 17–18): drag x and watch cosh x appear as the midpoint of eˣ and e⁻ˣ
   (so cosh 0 = 1, not 0 or 2); see sinh x as half the gap, odd where cosh is even; push x far out and watch
   tanh = sinh/cosh level off at ±1; trace (cosh t, sinh t) along the hyperbola x² − y² = 1 that names them; build sinh 1,
   cosh 2 and tanh 0.5 from tiles, where the slips are a lost ÷2, a swapped sign or the wrong denominator; then a challenge. */
(()=>{const ex=Math.exp,ab=Math.abs,ch=x=>(ex(x)+ex(-x))/2,sh=x=>(ex(x)-ex(-x))/2,th=x=>sh(x)/ch(x),
 n=(v,d)=>{const k=10**(d==null?3:d),r=Math.round(v*k)/k;return(r<0?'−':'')+Math.abs(r)};
const GOAL=[['sinh 1',1,'s'],['cosh 2',2,'c'],['tanh 0.5',.5,'t']];
const TOP=['eˣ − e⁻ˣ','eˣ + e⁻ˣ','e⁻ˣ − eˣ'],BOT=['2','1','eˣ + e⁻ˣ'];
const RIGHT={s:[0,0],c:[1,0],t:[0,2]};
VIS.reg('flaghyper',c=>{let A,pad,box,qi=-1,run=0;
const K={tok:0,cb:()=>{},x:.8,seen:{},gi:0,pk:[-1,-1],made:0,drag:0,slip:''};
const mode=()=>['cosh','sinh','tanh','hyp','eval','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1.05:1.2));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,s,col,w,al){g.font=`${w||700} ${z(s)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const plotR=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.6}:{x:6,y:6,w:A.W*.6,h:A.H-12};
const side=()=>A.narrow?{x:6,y:A.H*.62,w:A.W-12,h:A.H*.38-6}:{x:A.W*.62+4,y:6,w:A.W*.38-14,h:A.H-12};
const row=i=>side().y+z(13)+i*z(21);
const RANGE={cosh:[-2.6,2.6,-1.2,7],sinh:[-2.6,2.6,-5,5],tanh:[-4.5,4.5,-1.6,1.6],hyp:[-.6,4,-3.2,3.2]};
function M(){const r=plotR(),[x0,x1,y0,y1]=RANGE[mode()],L=r.x+20,B=r.y+r.h-14,W=r.w-26,H=r.h-22;
 return{X:x=>L+(x-x0)/(x1-x0)*W,Y:y=>B-(y-y0)/(y1-y0)*H,ix:p=>x0+(p-L)/W*(x1-x0),r,x0,x1,y0,y1}}
function grid(g,m){const C=A.col,r=m.r;g.fillStyle=A.alpha(C.mu,.08);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=1.3;g.beginPath();g.moveTo(r.x,m.Y(0));g.lineTo(r.x+r.w,m.Y(0));g.moveTo(m.X(0),r.y);g.lineTo(m.X(0),r.y+r.h);g.stroke();
 for(let v=Math.ceil(m.x0);v<=m.x1;v++)if(v)put(g,n(v,0),m.X(v),m.Y(0)+10,9,C.tx,600);for(let v=Math.ceil(m.y0);v<=m.y1;v++)if(v&&(m.y1-m.y0<4||v%2===0))put(g,n(v,0),m.X(0)-10,m.Y(v),9,C.tx,600)}
function curve(g,m,f,col,w,dash){const r=m.r;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;g.setLineDash(dash||[]);g.beginPath();
 for(let i=0;i<=240;i++){const x=m.x0+(m.x1-m.x0)*i/240;i?g.lineTo(m.X(x),m.Y(f(x))):g.moveTo(m.X(x),m.Y(f(x)))}g.stroke();g.restore()}
function dot(g,x,y,col,r){g.fillStyle=col;g.beginPath();g.arc(x,y,r||7,0,7);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.4;g.stroke()}
const tileR=(row,i)=>{const w=(A.W-24)/3;return{x:6+i*(w+6),y:A.H*(row?.66:.4),w,h:A.H*.14}};
function tile(g,r,t,on,bad){const C=A.col;g.fillStyle=A.alpha(on?C.gr:bad?C.rd:C.cy,on||bad?.32:.16);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=on?C.gr:bad?C.rd:C.tx;g.lineWidth=on||bad?3:1.4;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke();put(g,t,r.x+r.w/2,r.y+r.h/2,12,C.tx,800)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const sR=side(),mx=sR.x+sR.w/2;
 if(v==='quiz'){put(g,'cosh x = (eˣ + e⁻ˣ)/2   sinh x = (eˣ − e⁻ˣ)/2',W/2,H*.42,A.narrow?11:15,C.tx,800);put(g,'tanh x = sinh x / cosh x',W/2,H*.58,15,C.tx,800);return}
 if(v==='eval'){if(K.made>=3){put(g,'All three evaluated!',W/2,H*.4,17,C.gr,800);return}const[G,x,kind]=GOAL[K.gi],t=K.pk[0]>=0?TOP[K.pk[0]]:'□',b=K.pk[1]>=0?BOT[K.pk[1]]:'□';
  put(g,`${G} = ( ${t} ) ÷ ( ${b} )   at x = ${x}`,W/2,H*.08,A.narrow?12:15,C.tx,800);
  const val=K.pk[0]>=0&&K.pk[1]>=0?[ex(x)-ex(-x),ex(x)+ex(-x),ex(-x)-ex(x)][K.pk[0]]/[2,1,ex(x)+ex(-x)][K.pk[1]]:null;
  put(g,val==null?'Pick a top and a bottom':`= ${n(val,4)}`,W/2,H*.2,15,K.slip?C.rd:val==null?C.tx:C.gr,800);
  put(g,'Top',W/2,H*.35,11,C.tx,700);TOP.forEach((s,i)=>tile(g,tileR(0,i),s,K.pk[0]===i&&!K.slip,K.slip&&K.pk[0]===i));put(g,'Bottom',W/2,H*.61,11,C.tx,700);BOT.forEach((s,i)=>tile(g,tileR(1,i),s,K.pk[1]===i&&!K.slip,K.slip&&K.pk[1]===i));
  put(g,`${K.gi+1} of 3`,W/2,H*.9,11,C.tx,600);return}
 const m=M(),x=K.x;grid(g,m);
 if(v==='cosh'||v==='sinh'){curve(g,m,ex,C.cy,2.5);curve(g,m,x=>ex(-x),C.or,2.5);const a=ex(x),b=ex(-x),f=v==='cosh'?ch:sh;
  curve(g,m,f,C.gr,3.5);g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=1.5;g.setLineDash([5,4]);g.beginPath();g.moveTo(m.X(x),m.Y(a));g.lineTo(m.X(x),m.Y(v==='cosh'?b:0));g.stroke();g.setLineDash([]);
  dot(g,m.X(x),m.Y(a),C.cy,6);dot(g,m.X(x),m.Y(b),C.or,6);dot(g,m.X(x),m.Y(f(x)),C.gr,8);if(v==='sinh')dot(g,m.X(-x),m.Y(sh(-x)),C.vi,6);
  put(g,`x = ${n(x,2)}`,mx,row(0),13,C.tx,800);put(g,`eˣ = ${n(a)}   e⁻ˣ = ${n(b)}`,mx,row(1),11,C.tx,700);
  if(v==='cosh'){put(g,`cosh x = (${n(a,2)} + ${n(b,2)})/2`,mx,row(2),11,C.tx,700);put(g,`= ${n(ch(x))}`,mx,row(3),15,C.gr,800);put(g,'Midpoint of the two curves',mx,row(4),11,C.tx,600)}
  else{put(g,`sinh x = (${n(a,2)} − ${n(b,2)})/2 = ${n(sh(x))}`,mx,row(2),11,C.gr,800);put(g,`sinh(−x) = ${n(sh(-x))}`,mx,row(3),12,C.tx,700);put(g,'sinh is odd: sinh(−x) = −sinh x',mx,row(4),11,C.tx,600)}}
 if(v==='tanh'){curve(g,m,()=>1,A.alpha(C.tx,.4),1.5,[6,5]);curve(g,m,()=>-1,A.alpha(C.tx,.4),1.5,[6,5]);curve(g,m,th,C.gr,3.5);dot(g,m.X(x),m.Y(th(x)),C.gr,8);
  put(g,`x = ${n(x,2)}`,mx,row(0),13,C.tx,800);put(g,`sinh x = ${n(sh(x))}   cosh x = ${n(ch(x))}`,mx,row(1),10,C.tx,700);put(g,`tanh x = ${n(th(x),4)}`,mx,row(2),15,C.gr,800);
  put(g,'= (e²ˣ − 1)/(e²ˣ + 1)',mx,row(3),11,C.tx,600);put(g,'Asymptotes y = ±1',mx,row(4),11,C.tx,600)}
 if(v==='hyp'){const cv=m,hy=s=>{g.save();g.beginPath();g.rect(m.r.x,m.r.y,m.r.w,m.r.h);g.clip();g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();for(let i=0;i<=200;i++){const t=-2+4*i/200,X=s*ch(t),Y=sh(t);i?g.lineTo(cv.X(X),cv.Y(Y)):g.moveTo(cv.X(X),cv.Y(Y))}g.stroke();g.restore()};hy(1);
  const t=x,P=[ch(t),sh(t)];g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=1.5;g.setLineDash([5,4]);g.beginPath();g.moveTo(m.X(P[0]),m.Y(0));g.lineTo(m.X(P[0]),m.Y(P[1]));g.lineTo(m.X(0),m.Y(P[1]));g.stroke();g.setLineDash([]);dot(g,m.X(P[0]),m.Y(P[1]),C.or,8);
  put(g,`t = ${n(t,2)}`,mx,row(0),13,C.tx,800);put(g,`(cosh t, sinh t) = (${n(P[0],2)}, ${n(P[1],2)})`,mx,row(1),11,C.tx,700);put(g,`cosh²t − sinh²t = ${n(P[0]*P[0]-P[1]*P[1],4)}`,mx,row(2),13,C.gr,800);
  put(g,'On x² − y² = 1, a hyperbola',mx,row(3),11,C.tx,600);put(g,'(cos t, sin t) lives on x² + y² = 1',mx,row(4),10,C.tx,600)}
 A.fx.draw(g)}
const ok=t=>{A.sound.pop();tell(t);K.cb();A.redraw()};
function setX(v){const lim={cosh:2.4,sinh:2.4,tanh:4.4,hyp:1.8}[mode()]||2;v=Math.max(-lim,Math.min(lim,Math.round(v*10)/10));if(ab(v-Math.round(v))<.08)v=Math.round(v);K.x=v;const md=mode();
 if(md==='cosh'){K.seen[n(v,1)]=1;tell(`x = ${n(v,2)}: eˣ = ${n(ex(v))}, e⁻ˣ = ${n(ex(-v))}, cosh x = ${n(ch(v))}.`)}
 if(md==='sinh'){if(ab(ab(v)-1)<.01)K.seen[v>0?'p':'m']=1;tell(`sinh(${n(v,2)}) = ${n(sh(v))} and sinh(${n(-v,2)}) = ${n(sh(-v))}: opposite signs.`)}
 if(md==='tanh'){if(v>=3)K.seen.p=1;if(v<=-3)K.seen.m=1;tell(`tanh(${n(v,2)}) = ${n(th(v),4)}. ${ab(v)>=3?'Almost '+(v>0?'1':'−1')+': it never gets past.':''}`)}
 if(md==='hyp'){K.seen[v>=1?'p':v<=-1?'m':v===0?'z':'o']=1;tell(`t = ${n(v,2)}: (${n(ch(v),3)}, ${n(sh(v),3)}), and cosh² − sinh² = 1.`)}
 K.cb();A.redraw()}
function choose(r,i){if(K.made>=3)return;K.pk[r]=i;K.slip='';const[,x,kind]=GOAL[K.gi],[a,b]=K.pk;A.sound.tick();if(a<0||b<0){tell(`${r?'Bottom':'Top'}: ${r?BOT[i]:TOP[i]}.`);return A.redraw()}
 const[ra,rb]=RIGHT[kind];if(a===ra&&b===rb){K.made++;const said=`${GOAL[K.gi][0]} = ${n([sh,ch,th][['s','c','t'].indexOf(kind)](x),4)}. Correct.`;if(K.made<3){K.gi=K.made;K.pk=[-1,-1];keys()}ok(said+(K.made<3?` Next: ${GOAL[K.gi][0]}.`:''));return}
 K.slip=1;A.sound.miss();let m='Check the definition.';
 if(kind==='s'&&a===1)m='eˣ + e⁻ˣ is the cosh top. sinh takes the difference: eˣ − e⁻ˣ.';else if(kind==='c'&&a!==1)m='cosh adds: (eˣ + e⁻ˣ)/2. A difference gives sinh.';else if(a===2)m='e⁻ˣ − eˣ gives −sinh x: the order of the subtraction matters.';
 else if(kind!=='t'&&b===1)m='You lost the ÷2. Without it you get 2·'+GOAL[K.gi][0]+'.';else if(kind!=='t'&&b===2)m='Dividing by eˣ + e⁻ˣ gives tanh, not '+GOAL[K.gi][0].split(' ')[0]+'.';
 else if(kind==='t'&&a===1)m='tanh = sinh/cosh, so the top is the sinh part: eˣ − e⁻ˣ.';else if(kind==='t'&&b===0)m='÷2 gives sinh 0.5. tanh divides by the cosh part: the ½s cancel and leave eˣ + e⁻ˣ.';else if(kind==='t'&&b===1)m='tanh needs the cosh part underneath: eˣ + e⁻ˣ.';
 tell(m);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const md=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=f};
 if(md==='cosh')[-2,-1,0,1,2].forEach(v=>B('x = '+n(v,0),()=>setX(v)));
 if(md==='sinh')[-2,-1,1,2].forEach(v=>B('x = '+n(v,0),()=>setX(v)));
 if(md==='tanh')[-4,-3,-1,0,1,3,4].forEach(v=>B('x = '+n(v,0),()=>setX(v)));
 if(md==='hyp')[-1.5,-1,0,1,1.5].forEach(v=>B('t = '+n(v,1),()=>setX(v)));
 if(md==='eval'&&K.made<3){TOP.forEach((s,i)=>B('Top: '+s,()=>choose(0,i)));BOT.forEach((s,i)=>B('Bottom: '+s,()=>choose(1,i)))}}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const md=mode();if(md==='eval'){for(const r of[0,1])for(let i=0;i<3;i++)if(inR(p,tileR(r,i))){choose(r,i);return false}return false}
 if(md==='quiz'||!inR(p,plotR()))return false;K.drag=1;setX(M().ix(p.x));return true}
function move(p){if(K.drag)setX(M().ix(p.x))}
function up(){K.drag=0}
const finish=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const seq=(fs,ms)=>{const t=++K.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const clear=x=>{K.tok++;Object.assign(K,{cb:()=>{},x,seen:{},gi:0,pk:[-1,-1],made:0,drag:0,slip:''})};
const steps=[
{h:'cosh: the midpoint',p:'cosh x = (eˣ + e⁻ˣ)/2 is the average of eˣ (blue) and e⁻ˣ (orange): the point halfway between them. Drag across the graph.',
 predict:{q:'What is cosh 0?',opts:['0','1','2'],ans:1},task:'Try three x values, including x = 0',
 show:()=>{steps[0].go();seq([()=>setX(-1),()=>setX(0),()=>setX(1.5)],600)},go:()=>{clear(.8);tell('Drag across the graph to move x.');keys();K.cb=finish(0,()=>K.seen['0']&&Object.keys(K.seen).length>=3,'At x = 0 both curves are 1, so cosh 0 = (1 + 1)/2 = 1.')}},
{h:'sinh: half the gap',p:'sinh x = (eˣ − e⁻ˣ)/2 is half the gap between the curves, with a sign. The purple dot shows sinh at −x.',
 predict:{q:'sinh 1 ≈ 1.175. What is sinh(−1)?',opts:['1.175, like cosh','−1.175'],ans:1},task:'Compare x = 1 and x = −1',
 show:()=>{steps[1].go();seq([()=>setX(1),()=>setX(-1)],700)},go:()=>{clear(.5);tell('Drag x. Compare sinh x with sinh(−x).');keys();K.cb=finish(1,()=>K.seen.p&&K.seen.m,'sinh is odd: sinh(−x) = −sinh x. cosh is even: cosh(−x) = cosh x.')}},
{h:'tanh levels off',p:'tanh x = sinh x / cosh x. Drag x far to the right and far to the left.',
 predict:{q:'As x grows, what does tanh x do?',opts:['Grows without limit, like eˣ','Levels off towards 1'],ans:1},task:'Reach x ≥ 3 and x ≤ −3',
 show:()=>{steps[2].go();seq([()=>setX(3),()=>setX(-4)],700)},go:()=>{clear(.5);tell('Drag x far to each side.');keys();K.cb=finish(2,()=>K.seen.p&&K.seen.m,'For big x, sinh and cosh are both about eˣ/2, so tanh → 1. −1 < tanh x < 1.')}},
{h:'Why “hyperbolic”?',p:'The point (cosh t, sinh t) always lands on the hyperbola x² − y² = 1, as (cos t, sin t) lands on a circle. Drag t.',task:'Visit t ≥ 1, t ≤ −1 and t = 0',
 show:()=>{steps[3].go();seq([()=>setX(1),()=>setX(-1),()=>setX(0)],650)},go:()=>{clear(.5);tell('Drag to change t.');keys();K.cb=finish(3,()=>K.seen.p&&K.seen.m&&K.seen.z,'cosh²t − sinh²t = 1 for every t. At t = 0 the point is (1, 0), the vertex.')}},
{h:'Evaluate them',p:'Build each value from the definitions. Pick a top and a bottom, then check it with a calculator.',task:'Evaluate all three',
 show:()=>{steps[4].go();seq([()=>choose(0,0),()=>choose(1,0),()=>choose(0,1),()=>choose(1,0),()=>choose(0,0),()=>choose(1,2)],520)},go:()=>{clear(.5);tell('Build sinh 1. Pick a top and a bottom.');keys();K.cb=finish(4,()=>K.made>=3,'sinh 1 ≈ 1.1752, cosh 2 ≈ 3.7622, tanh 0.5 ≈ 0.4621.')}},
{h:'Challenge',p:'',go:()=>{clear(0);ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.cb()});
const QS=[['cosh 0 = ?',[['1','ok'],['0','zero'],['2','two']]],
 ['tanh x written in eˣ:',[['(eˣ − e⁻ˣ)/(eˣ + e⁻ˣ)','ok'],['(eˣ − e⁻ˣ)/2','half'],['(eˣ + e⁻ˣ)/(eˣ − e⁻ˣ)','flip']]],
 ['sinh(−2) = ?',[['−sinh 2','ok'],['sinh 2','even'],['cosh 2','swap']]],
 ['Which is true for every x?',[['cosh²x − sinh²x = 1','ok'],['cosh²x + sinh²x = 1','circ'],['cosh x ≤ 1','cap']]],
 ['sinh 1 to 4 s.f.:',[['1.175','ok'],['2.350','nohalf'],['1.543','swap2']]],
 ['The range of tanh x is…',[['−1 < y < 1','ok'],['all real y','grow'],['y ≥ 1','cap2']]]];
function why(t){let m='Go back to the definitions in eˣ.';
 if(t==='zero')m='e⁰ = 1 and e⁻⁰ = 1, so cosh 0 = (1 + 1)/2 = 1. It is sinh 0 that is 0.';
 if(t==='two')m='You forgot the ÷2: (1 + 1)/2 = 1.';
 if(t==='half')m='That is sinh x. tanh divides sinh by cosh, so the ½s cancel and leave eˣ + e⁻ˣ underneath.';
 if(t==='flip')m='That is cosh/sinh, which is coth x. tanh = sinh/cosh.';
 if(t==='even')m='sinh is odd, not even: swapping x for −x swaps eˣ and e⁻ˣ, so the sign flips.';
 if(t==='swap')m='cosh 2 uses a + sign. sinh(−2) = (e⁻² − e²)/2 = −sinh 2.';
 if(t==='circ')m='The + version is the circle identity cos² + sin² = 1. For cosh and sinh it is a minus: the hyperbola.';
 if(t==='cap')m='cosh x ≥ 1 for all x: its lowest point is cosh 0 = 1.';
 if(t==='nohalf')m='2.350 is e − e⁻¹ without the ÷2. Halve it: 1.175.';
 if(t==='swap2')m='1.543 is cosh 1, from the + sign. sinh uses eˣ − e⁻ˣ.';
 if(t==='grow')m='tanh never passes ±1: sinh and cosh grow together, so their ratio levels off.';
 if(t==='cap2')m='y ≥ 1 is the range of cosh. tanh stays between −1 and 1.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);A.redraw()}
function grade(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+why(t)}${good?` Run: ${run}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clear(.8);A.gest({down,move,up});keys()}});
A.start()})})();
