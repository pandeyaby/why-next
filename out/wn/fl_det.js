/* Flagship – determinant of a 2×2 matrix (ages 16–18). Tap the leading diagonal then the other diagonal to build ad − bc,
   tune one entry to hit a target determinant, slide k until the matrix is singular, classify matrices, and find what
   scaling the whole matrix does to det. Every tap or slide has a button twin; the canvas label reads the working. */
(()=>{
const TAPS=[[3,1,2,4],[5,2,3,-1],[-2,3,4,1]];
const AIMS=[5,-1,9];
const KS=[[['k',3,2,6],k=>6*k-6,[1]],[['k',4,4,'k'],k=>k*k-16,[-4,4]]];
const SORTS=[[2,4,1,2],[1,2,3,4],[3,-1,6,-2],[0,0,5,7],[2,1,1,2],[4,6,2,3]];
const MULS=[2,3,-2],BASE=[2,1,1,3];
const fx=n=>n<0?`(${n})`:`${n}`,det=E=>E[0]*E[3]-E[1]*E[2],mu=n=>n<0?'−'+(-n):''+n;
VIS.reg('flagdet',c=>{let A,keys,box,qk=-1,ver=0,run=0;
const zero=()=>({fin:()=>{},hits:0,lap:0,tap:[],v:0,found:[],bad:-1,lit:-1,drag:false,pick:-1}),W=zero();
const stage=()=>['diag','aim','sing','sort','scale','quiz'][A.step],slow=()=>!A.reduced();
const quota=()=>({diag:3,aim:3,sing:3,sort:6,scale:3}[stage()]||99);
function note(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,n,col,al,mw){g.font=`700 ${Math.round(n*(A.narrow?1.05:1.15))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function slab(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;g.stroke()}
const inside=(p,r)=>r&&p.x>=r.x-6&&p.x<=r.x+r.w+6&&p.y>=r.y-6&&p.y<=r.y+r.h+6;
const line=()=>A.mix(A.col.tx,A.col.pn,.4),white=()=>A.col.dark?'#1e293b':'#ffffff',hue=h=>A.mix(A.col.pn,h,A.col.dark?.22:.55);
/* geometry: one big matrix centred at (cx,cy); cell i = a,b,c,d */
const size=()=>Math.min(A.W*.2,A.H*.2,84),ctr=()=>({x:A.W/2,y:A.H*.3});
const cell=i=>{const s=size(),o=ctr();return{x:o.x-s-6+(i%2)*(s+12),y:o.y-s-6+Math.floor(i/2)*(s+12),w:s,h:s}};
const track=()=>({x:24,y:A.H*.8,w:A.W-48,h:A.H*.1}),choice=i=>{const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.74,w,h:A.H*.18}};
const RANGE={aim:[-4,8],sing:[-6,6]};
function brackets(g,E,lab,x0,y0,s,ink){const C=A.col;g.strokeStyle=ink||C.tx;g.lineWidth=3;const h=2*s+12,l=x0-s-14,r=x0+s+14,t=y0-s-10;
 g.beginPath();g.moveTo(l+10,t);g.lineTo(l,t);g.lineTo(l,t+h+8);g.lineTo(l+10,t+h+8);g.moveTo(r-10,t);g.lineTo(r,t);g.lineTo(r,t+h+8);g.lineTo(r-10,t+h+8);g.stroke();
 if(lab)put(g,lab+' =',l-10,y0,16,C.tx,'right');E.forEach((e,i)=>put(g,typeof e==='number'?mu(e):e,x0+(i%2?1:-1)*(s/2+3),y0+(i>1?1:-1)*(s/2+3),20,C.tx))}
function grid(g,E,tint){const C=A.col;E.forEach((e,i)=>{const r=cell(i),on=W.tap.includes(i),bad=W.bad===i;slab(g,r,on?hue(i===0||i===3?'#bbf7d0':'#fecaca'):tint||white(),bad?C.rd:W.lit===i?C.vi:line(),bad||W.lit===i?4:2)});
 const o=ctr();brackets(g,E,'M',o.x,o.y,size())}
function drawDiag(g){const C=A.col,E=TAPS[W.lap%3],o=ctr(),s=size();grid(g,E);const has=i=>W.tap.includes(i);
 const join=(i,j,col)=>{const p=cell(i),q=cell(j);g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(p.x+p.w*.25,p.y+p.h*.25);g.lineTo(q.x+q.w*.75,q.y+q.h*.75);g.stroke()};
 if(has(0)&&has(3))join(0,3,C.gr);if(has(1)&&has(2)){const p=cell(1),q=cell(2);g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.moveTo(p.x+p.w*.75,p.y+p.h*.25);g.lineTo(q.x+q.w*.25,q.y+q.h*.75);g.stroke()}
 const y=o.y+s+40;if(has(0)&&has(3))put(g,`ad = ${mu(E[0])} × ${fx(E[3])} = ${mu(E[0]*E[3])}`,A.W/2,y,15);
 if(W.tap.length>=4){put(g,`bc = ${mu(E[1])} × ${fx(E[2])} = ${mu(E[1]*E[2])}`,A.W/2,y+28,15);put(g,`det M = ${mu(E[0]*E[3])} − ${fx(E[1]*E[2])} = ${mu(det(E))}`,A.W/2,y+58,17,C.tx)}
 else put(g,W.tap.length<2?'Tap a and d (leading diagonal) first':'Now tap b and c',A.W/2,y+40,13,C.tx)}
function slider(g,lo,hi,label){const C=A.col,t=track(),f=(W.v-lo)/(hi-lo);slab(g,t,white(),line());
 for(let k=lo;k<=hi;k++){const x=t.x+(k-lo)/(hi-lo)*t.w;g.fillStyle=line();g.fillRect(x-1,t.y+t.h-10,2,8);if(k%2===0)put(g,mu(k),x,t.y+t.h+12,10,C.tx)}
 const x=t.x+f*t.w;g.fillStyle=C.vi;g.beginPath();g.arc(x,t.y+t.h/2,Math.max(14,t.h*.4),0,7);g.fill();put(g,mu(W.v),x,t.y+t.h/2,13,'#ffffff');put(g,label,A.W/2,t.y-14,13,C.tx)}
function drawAim(g){const C=A.col,E=[2,3,1,W.v],o=ctr(),s=size(),D=det(E),hit=D===AIMS[W.lap%3];grid(g,E);
 put(g,`Target: det M = ${mu(AIMS[W.lap%3])}`,A.W/2,o.y+s+30,15,C.tx);put(g,`det M = 2 × ${fx(W.v)} − 3 × 1 = ${mu(D)}${hit?' ✓':''}`,A.W/2,o.y+s+58,15,C.tx);slider(g,-4,8,'Drag to set d')}
function drawSing(g){const C=A.col,R=KS[W.lap%2],E=R[0].map(e=>e==='k'?W.v:e),o=ctr(),s=size(),D=R[1](W.v);grid(g,E);
 put(g,`M = [${R[0].slice(0,2).join(' ')}; ${R[0].slice(2).join(' ')}]   det M = ${R[0][0]==='k'&&R[0][3]==='k'?'k² − 16':'6k − 6'}`,A.W/2,o.y+s+28,13,C.tx);
 put(g,`k = ${mu(W.v)}: det M = ${mu(D)}${D===0?'  → singular':''}`,A.W/2,o.y+s+56,15,C.tx);put(g,`Found: ${W.found.map(mu).join(', ')||'none yet'}`,A.W/2,o.y+s+82,12,C.tx);slider(g,-6,6,'Drag to set k')}
function drawSort(g){const C=A.col,k=W.lap;if(k>=SORTS.length){put(g,'All 6 sorted ✓',A.W/2,A.H*.4,17);return}const E=SORTS[k],o=ctr();grid(g,E);
 if(W.pick>=0)put(g,`det = ${mu(E[0])} × ${fx(E[3])} − ${mu(E[1])} × ${fx(E[2])} = ${mu(det(E))}`,A.W/2,o.y+size()+34,14,C.tx);
 ['Singular (det 0)','Non-singular'].forEach((t,i)=>{const r={...choice(i),w:(A.W-24)/2,x:8+i*((A.W-24)/2+8)};slab(g,r,white(),W.bad===i?C.rd:W.lit===i?C.vi:line(),W.bad===i?4:2);put(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,'center',r.w-8)})}
const opts=()=>{const k=MULS[W.lap%3],D=det(BASE);return[k*D,k*k*D,D]};
function drawScale(g){const C=A.col,k=MULS[W.lap%3],s=Math.min(A.W*.08,A.H*.09,40);brackets(g,BASE,'M',A.W*.3,A.H*.22,s);brackets(g,BASE.map(e=>k*e),k+'M',A.W*.76,A.H*.22,s);
 put(g,'det M = 2 × 3 − 1 × 1 = 5',A.W/2,A.H*.44,14,C.tx);put(g,`What is det(${k}M)?`,A.W/2,A.H*.56,16,C.tx);
 opts().forEach((v,i)=>{const r=choice(i),ok=W.hits>W.lap&&i===1;slab(g,r,ok?hue('#bbf7d0'):white(),ok?C.gr:W.bad===i?C.rd:W.lit===i?C.vi:line(),ok||W.bad===i?4:2);put(g,mu(v),r.x+r.w/2,r.y+r.h/2,20,C.tx)})}
function drawQuiz(g){brackets(g,['a','b','c','d'],'M',A.W/2,A.H*.32,Math.min(A.W*.14,60));put(g,'det M = ad − bc',A.W/2,A.H*.78,20)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);
 ({diag:drawDiag,aim:drawAim,sing:drawSing,sort:drawSort,scale:drawScale,quiz:drawQuiz}[stage()])(g);A.fx.draw(g)}
function glow(i){W.lit=i;const v=ver;setTimeout(()=>{if(v===ver){W.lit=-1;A.redraw()}},420)}
function nope(t){A.sound.miss();note(t);A.redraw()}
function good(t){W.hits++;W.bad=-1;A.sound.pop();note(t);pads();A.redraw();W.fin()}
const next=(f,ms)=>{const v=ver;setTimeout(()=>{if(v===ver){f();pads();A.redraw()}},slow()?(W.demo?250:ms):20)};
/* tap entry i: the leading diagonal (a, d) must come before b and c */
function tapCell(i){const E=TAPS[W.lap%3];if(W.tap.includes(i)||W.hits>W.lap||W.hits>=3)return;glow(i);const diag=W.tap.filter(j=>j===0||j===3).length;
 if((i===1||i===2)&&diag<2){W.bad=i;return nope('Start with the leading diagonal, a and d. Starting with b and c gives bc − ad, which has the wrong sign.')}
 W.tap.push(i);W.bad=-1;if(W.tap.length<4){A.sound.tick();note(diag+1>=2&&(i===0||i===3)?`ad = ${mu(E[0]*E[3])}. Now tap b and c.`:'Tapped '+'abcd'[i]+'.');return A.redraw()}
 good(`det M = ad − bc = ${mu(E[0]*E[3])} − ${fx(E[1]*E[2])} = ${mu(det(E))}.`);if(W.hits<3)next(()=>{W.lap++;W.tap=[];note('New matrix. Tap a and d first.')},1500)}
function setV(v,quiet){const R=RANGE[stage()];W.v=Math.max(R[0],Math.min(R[1],v));A.redraw();if(!quiet)judge()}
/* after each move of the slider, check the target (aim) or a new root (sing) */
function judge(){const m=stage();if(W.hits>=3)return;
 if(m==='aim'){const D=det([2,3,1,W.v]),T=AIMS[W.lap%3];if(W.hits>W.lap)return;if(D!==T){note(`d = ${mu(W.v)} gives det ${mu(D)}. ${D<T?'Too small: raise d.':'Too big: lower d.'}`);return}
  good(`d = ${mu(W.v)}: 2 × ${fx(W.v)} − 3 = ${mu(T)}. Hit!`);if(W.hits<3)next(()=>{W.lap++;note(`New target: ${mu(AIMS[W.lap])}.`)},1300);return}
 const R=KS[W.lap%2],D=R[1](W.v);if(D!==0||W.found.includes(W.v)){note(`k = ${mu(W.v)}: det M = ${mu(D)}.`);return}W.found.push(W.v);
 const left=R[2].filter(x=>!W.found.includes(x)).length;good(`k = ${mu(W.v)} makes det M = 0, so M is singular and has no inverse.`+(left?' There is another value. Keep looking.':''));
 if(!left&&W.hits<3)next(()=>{W.lap++;W.v=0;note('Now M = [k 4; 4 k]. det M = k² − 16. Find every k.')},1300)}
function classify(i){const E=SORTS[W.lap];if(!E)return;glow(i);W.pick=i;const D=det(E),s=D===0;
 if((i===0)!==s){W.bad=i;return nope(s?`det = ${mu(E[0]*E[3])} − ${fx(E[1]*E[2])} = 0, so it is singular. Look: one row is a multiple of the other.`:`det = ${mu(D)}, not 0, so it is non-singular and has an inverse.`)}
 W.lap++;W.pick=-1;good(s?'Singular: det = 0, so there is no inverse.':`Non-singular: det = ${mu(D)} ≠ 0.`)}
function scaleAns(i){const k=MULS[W.lap%3];if(W.hits>W.lap||W.hits>=3)return;glow(i);
 if(i!==1){W.bad=i;return nope(i===0?`Each of the 2 rows is multiplied by ${k}, so ad and bc are each multiplied by ${k} × ${fx(k)}. det(${k}M) = ${mu(k*k)} × 5.`:`Every entry changed, so det changes too: ad − bc for ${k}M is ${mu(k*k*5)}.`)}
 good(`det(${k}M) = ${fx(k)}² × 5 = ${mu(k*k*5)}. Scaling a 2×2 matrix by k multiplies det by k².`);if(W.hits<3)next(()=>{W.lap++;note(`Now k = ${MULS[W.lap]}.`)},1400)}
function pads(){if(!keys)return;keys.innerHTML='';const m=stage();if(m==='quiz'||W.hits>=quota())return;
 const K=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},keys,t);b.onclick=f};
 if(m==='diag'&&W.hits<=W.lap)[0,1,2,3].forEach(i=>{if(!W.tap.includes(i))K('abcd'[i]+' = '+mu(TAPS[W.lap%3][i]),'Tap entry '+'abcd'[i],()=>tapCell(i))});
 if(m==='aim'||m==='sing'){const n=m==='aim'?'d':'k';K('− 1',`Lower ${n} by 1`,()=>setV(W.v-1));K('+ 1',`Raise ${n} by 1`,()=>setV(W.v+1))}
 if(m==='sort'&&W.lap<6)['Singular (det 0)','Non-singular'].forEach((t,i)=>K(t,'This matrix is '+t,()=>classify(i)));
 if(m==='scale'&&W.hits<=W.lap)opts().forEach((v,i)=>K(mu(v),`det(${MULS[W.lap%3]}M) = ${mu(v)}`,()=>scaleAns(i)))}
function fromX(p){const t=track(),R=RANGE[stage()];return Math.round(R[0]+(p.x-t.x)/t.w*(R[1]-R[0]))}
function down(p){const m=stage();if(m==='quiz'||W.hits>=quota())return false;
 if(m==='diag'){const i=[0,1,2,3].find(j=>inside(p,cell(j)));if(i!=null)tapCell(i)}
 if((m==='aim'||m==='sing')&&inside(p,{...track(),y:track().y-20,h:track().h+40})){W.drag=true;setV(fromX(p),true);return true}
 if(m==='sort'){const i=[0,1].find(j=>inside(p,{...choice(j),w:(A.W-24)/2,x:8+j*((A.W-24)/2+8)}));if(i!=null)classify(i)}
 if(m==='scale'){const i=[0,1,2].find(j=>inside(p,choice(j)));if(i!=null)scaleAns(i)}return false}
function move(p){if(W.drag)setV(fromX(p),true)}
function up(p){if(!W.drag)return;W.drag=false;setV(fromX(p))}
const fire=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const k=++ver;list.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},slow()?(j+1)*(ms||650):j*40+30))}
const enter=x=>{ver++;Object.assign(W,zero(),x||{});pads()};
const walk=(from,to)=>{const out=[],s=to>from?1:-1;for(let v=from+s;s>0?v<=to:v>=to;v+=s)out.push(v);return out};
const steps=[
{h:'ad − bc',p:'For M = [a b; c d], det M = ad − bc. Tap a and d (the leading diagonal), then b and c.',predict:{q:'M = [3 1; 2 4]. What is det M?',opts:['1 × 2 − 3 × 4 = −10','3 × 4 − 1 × 2 = 10'],ans:1},task:'Find 3 determinants',
 show:()=>{steps[0].go();W.demo=1;play([0,3,1,2,'n','n',0,3,1,2,'n','n',0,3,1,2].map(i=>i==='n'?()=>{}:()=>tapCell(i)),220)},go:()=>{enter();note('Tap a and d first, then b and c.');W.fin=fire(0,()=>W.hits>=3,'det M = ad − bc: leading diagonal product minus the other diagonal product.')}},
{h:'Hit a target',p:'M = [2 3; 1 d]. Slide d until det M equals the target. Watch det change as d changes.',predict:{q:'Can a determinant be negative?',opts:['No, it is always positive','Yes, ad − bc can be any real number'],ans:1},task:'Hit 3 targets',
 show:()=>{steps[1].go();W.demo=1;play([...walk(0,4),'w','w',...walk(4,1),'w','w',...walk(1,6)].map(v=>v==='w'?()=>{}:()=>setV(v)),200)},go:()=>{enter();note('Target: det M = 5. Drag to set d.');W.fin=fire(1,()=>W.hits>=3,'det M can be positive, negative or zero; here det M = 2d − 3.')}},
{h:'Make it singular',p:'A matrix is singular when det M = 0, and then it has no inverse. Slide k to find every value that makes M singular.',predict:{q:'For M = [k 4; 4 k], how many values of k make M singular?',opts:['One','Two'],ans:1},task:'Find all 3 values of k',
 show:()=>{steps[2].go();W.demo=1;play([...walk(0,1),'w','w',...walk(0,4),...walk(4,-4)].map(v=>v==='w'?()=>{}:()=>setV(v)),200)},go:()=>{enter();note('M = [k 3; 2 6]. det M = 6k − 6. Find k.');W.fin=fire(2,()=>W.hits>=3,'Set ad − bc = 0 and solve for k; a quadratic can give two values.')}},
{h:'Singular or not?',p:'Work out det for each matrix. Is it singular (det 0) or non-singular?',task:'Classify 6 matrices',
 show:()=>{steps[3].go();W.demo=1;play(SORTS.map(E=>()=>classify(det(E)===0?0:1)),450)},go:()=>{enter();note('Is this matrix singular or non-singular?');W.fin=fire(3,()=>W.hits>=6,'A row that is a multiple of the other row, or a zero row, gives det 0.')}},
{h:'Scale the matrix',p:'Multiply every entry of M by k. What happens to det? Tap the right value.',predict:{q:'det M = 5. What is det(2M)?',opts:['10, twice as big','20, four times as big'],ans:1},task:'Answer 3 scalings',
 show:()=>{steps[4].go();W.demo=1;play([()=>scaleAns(1),()=>scaleAns(1),()=>scaleAns(1)],500)},go:()=>{enter();note('det M = 5. What is det(2M)?');W.fin=fire(4,()=>W.hits>=3,'det(kM) = k² det M for a 2×2 matrix.')}},
{h:'Challenge',p:'',go:()=>{enter();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.fin()});
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
/* build a fresh question: 0 compute det, 1 find k for singular, 2 scale */
function make(kind){if(kind===0){let E,D;do{E=[rnd(-4,6),rnd(-4,6),rnd(-4,6),rnd(-4,6)];D=det(E)}while(D===0||E[0]*E[3]+E[1]*E[2]===D||E[0]*E[1]-E[2]*E[3]===D||-D===E[0]*E[3]+E[1]*E[2]);
  return[`M = [${E.slice(0,2).map(mu).join(' ')}; ${E.slice(2).map(mu).join(' ')}]. What is det M?`,[[mu(D),'ok'],[mu(-D),'swap'],[mu(E[0]*E[3]+E[1]*E[2]),'plus']]]}
 if(kind===1){const r=rnd(2,3),q=rnd(1,4)*r,p=rnd(1,5);return[`M = [k ${p}; ${q} ${r}] is singular. What is k?`,[[mu(p*q/r),'ok'],[mu(-p*q/r),'sign'],[mu(p*q*r),'mult']]]}
 const n=rnd(2,4),D=rnd(2,7)*(Math.random()<.5?-1:1);return[`det M = ${mu(D)}. What is det(${n}M)?`,[[mu(n*n*D),'ok'],[mu(n*D),'once'],[mu(D),'same']]]}
function why(t){let m='Use det M = ad − bc.';
 if(t==='swap')m='That is bc − ad: the leading diagonal product comes first, so the sign is flipped.';
 if(t==='plus')m='The two diagonal products are subtracted, not added: ad − bc.';
 if(t==='sign')m='Check the sign: set k × r − p × q = 0, so k = pq ÷ r.';
 if(t==='mult')m='Solve kr − pq = 0 by dividing by r, not multiplying.';
 if(t==='once')m='Both rows are scaled, so det is multiplied by n twice: n².';
 if(t==='same')m='Scaling every entry changes the determinant: det(nM) = n² det M.';return m}
function quiz(){qk++;const[q,ops]=make(qk%3),r=rnd(0,2);
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});note('Challenge: '+q);A.redraw()}
function score(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Correct.':'✗ '+why(t)}${yes?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
