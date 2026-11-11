/* Flagship – adding matrices and scalar multiples (ages 16–18, A level Further Maths; Common Core N-VM.7, N-VM.8):
   fill in A + B one entry at a time (with the multiply and subtract slips as decoys), judge which pairs of orders are
   conformable for addition, drag a scalar k until kA hits a target, fill A − B where the reversed B − A is the trap,
   and set two dials k and m so that kA + mB equals a given matrix. Canvas taps and drags all have button twins. */
(()=>{
const MI='−',fmt=v=>{const a=Math.abs(v),s=v<0?MI:'',w=Math.floor(a+1e-9),h=a-w>.25;return s+(h?(w?w+'½':'½'):String(w))};
const eq=(P,Q)=>P.every((r,i)=>r.every((v,j)=>Math.abs(v-Q[i][j])<1e-9));
const map2=(P,f)=>P.map((r,i)=>r.map((v,j)=>f(v,i,j)));
const ADD={A:[[3,-1],[2,4]],B:[[5,2],[-3,1]]},SUB={A:[[7,2],[1,-3]],B:[[4,5],[6,-1]]};
const ORDERS=[[[2,3],[2,3],1,'Both are 2 × 3, so they are conformable: add the six matching entries.'],
 [[2,3],[3,2],0,'2 × 3 and 3 × 2 both have six entries, but the shapes differ, so there is no matching entry for every position.'],
 [[1,3],[1,3],1,'Two 1 × 3 row matrices have the same order, so their sum is another 1 × 3 row matrix.'],
 [[2,2],[2,3],0,'2 × 2 and 2 × 3 have different numbers of columns. Matrices of different orders cannot be added.']];
const SC={A:[[2,-1],[0,4]],K:[-2,-1,-.5,0,.5,1,2,3],goal:[3,-1,.5]};
const MIX={A:[[1,2],[0,-1]],B:[[3,0],[1,2]],D:[-2,-1,0,1,2,3],goal:[[2,1],[1,-1]]};
VIS.reg('flagmadd',c=>{let A,bar,quizBox,qn=-1,tick=0,streak=0;
const blank=()=>({after:()=>{},n:0,cell:0,R:[[null,null],[null,null]],ok:0,k:1,km:1,mm:1,drag:null,wrong:null,flash:null,hold:0}),S=blank();
const part=()=>['add','conf','scal','sub','mix','quiz'][A.step],quick=()=>A.reduced(),px=n=>Math.round(n*(A.narrow?1:1.15));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function label(g,t,x,y,n,col,w,al){g.font=`${w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function tile(g,r,bg,edge,lw){g.fillStyle=bg;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const inside=(p,r)=>r&&p.x>=r.x-4&&p.x<=r.x+r.w+4&&p.y>=r.y-4&&p.y<=r.y+r.h+4;
const card=()=>A.col.dark?'#0f172a':'#ffffff',soft=h=>A.mix(A.col.pn,h,A.col.dark?.2:.55),edge=()=>A.mix(A.col.tx,A.col.pn,.45);
/* draw a bracketed 2-row matrix M at (x,y) with cell size s; hi(i,j) may return a fill colour */
function matrix(g,M,x,y,s,hi,sz){const R=M.length,K=M[0].length,C=A.col;g.strokeStyle=C.tx;g.lineWidth=2.5;const w=K*s,h=R*s;
 g.beginPath();g.moveTo(x+7,y);g.lineTo(x,y);g.lineTo(x,y+h);g.lineTo(x+7,y+h);g.moveTo(x+w-7,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h);g.lineTo(x+w-7,y+h);g.stroke();
 for(let i=0;i<R;i++)for(let j=0;j<K;j++){const f=hi&&hi(i,j);if(f){g.fillStyle=f;A.paint.rrect(x+j*s+4,y+i*s+4,s-8,s-8,6);g.fill()}const v=M[i][j];label(g,v==null?'?':typeof v==='string'?v:fmt(v),x+(j+.5)*s,y+(i+.5)*s,sz||15,v==null?C.mu:C.tx,800)}}
/* layout for the three-matrix sum rows */
function trio(){const s=Math.min((A.W-70)/6.6,A.H*.15),gap=s*.55,x0=(A.W-(6*s+2*gap))/2;return{s,y:A.H*.16,x:[x0,x0+2*s+gap,x0+4*s+2*gap],gap}}
function chips(n){const w=Math.min((A.W-30)/n,130),h=Math.max(46,A.H*.13),x0=(A.W-n*w)/2;return[...Array(n)].map((_,i)=>({x:x0+i*w+5,y:A.H*.76,w:w-10,h}))}
function options(src,i,j,op){const a=src.A[i][j],b=src.B[i][j],good=op==='+'?a+b:a-b,set=op==='+'?[good,a*b,a-b]:[good,b-a,a+b];
 const out=[...new Set(set)];while(out.length<3)out.push(good+out.length+1);const r=(i*2+j)%3;return out.slice(r).concat(out.slice(0,r)).map(v=>[v,v===good])}
function drawFill(g,src,op){const C=A.col,L=trio(),ci=Math.floor(S.cell/2),cj=S.cell%2,live=S.n<4,mark=(i,j)=>live&&i===ci&&j===cj?A.alpha(C.ac,.35):null;
 label(g,op==='+'?'A + B: add matching entries':'A − B: subtract B from A, entry by entry',A.W/2,A.H*.06,15,C.tx,900);
 matrix(g,src.A,L.x[0],L.y,L.s,mark);matrix(g,src.B,L.x[1],L.y,L.s,mark);
 matrix(g,S.R,L.x[2],L.y,L.s,(i,j)=>S.flash&&S.flash[0]===i&&S.flash[1]===j?A.alpha(C.rd,.3):mark(i,j));
 label(g,op==='+'?'+':MI,L.x[1]-L.gap/2,L.y+L.s,24,C.tx,900);label(g,'=',L.x[2]-L.gap/2,L.y+L.s,24,C.tx,900);
 label(g,'A',L.x[0]+L.s,L.y-14,13,C.mu);label(g,'B',L.x[1]+L.s,L.y-14,13,C.mu);label(g,op==='+'?'A + B':'A − B',L.x[2]+L.s,L.y-14,13,C.mu);
 if(live){const nm=`row ${ci+1}, column ${cj+1}`;label(g,`Entry in ${nm}: ${fmt(src.A[ci][cj])} ${op==='+'?'+':MI} ${fmt(src.B[ci][cj])} = ?`,A.W/2,A.H*.64,14,C.tx,700);
  chips(3).forEach((r,k)=>{const o=options(src,ci,cj,op)[k];tile(g,r,soft('#fde68a'),S.wrong===k?C.rd:edge(),S.wrong===k?4:2);label(g,fmt(o[0]),r.x+r.w/2,r.y+r.h/2,18,C.tx,900)})}
 else label(g,'Done: every entry found.',A.W/2,A.H*.7,15,C.gr,800)}
function fill(k){const m=part(),src=m==='add'?ADD:SUB,op=m==='add'?'+':'-';if(S.n>=4||S.hold)return;const i=Math.floor(S.cell/2),j=S.cell%2,o=options(src,i,j,op)[k],a=src.A[i][j],b=src.B[i][j];
 if(!o[1]){S.wrong=k;S.flash=[i,j];A.sound.miss();let t=`Not ${fmt(o[0])}. `;
  if(o[0]===a*b)t+=`That multiplies ${fmt(a)} by ${fmt(b)}. Matrix addition adds matching entries.`;
  else if(op==='-'&&o[0]===b-a)t+=`That is ${fmt(b)} ${MI} ${fmt(a)}, which is B − A. Keep the order: A's entry first.`;
  else if(op==='-'&&o[0]===a+b)t+=`That adds the entries. Here we subtract: ${fmt(a)} ${MI} ${fmt(b)}.`;
  else t+=`That is ${fmt(a)} ${MI} ${fmt(b)}. For A + B, add the matching entries.`;speak(t);return A.redraw()}
 S.R[i][j]=o[0];S.n++;S.cell++;S.wrong=null;S.flash=null;A.sound.pop();speak(`Yes: ${fmt(a)} ${op==='+'?'+':MI} ${fmt(b)} = ${fmt(o[0])}.${S.n<4?' Next entry.':' Matrix complete.'}`);twins();A.redraw();S.after()}
function drawConf(g){const C=A.col,P=ORDERS[Math.min(S.n,3)];label(g,S.n<4?`Pair ${S.n+1} of 4: can these be added?`:'All four pairs judged.',A.W/2,A.H*.06,15,C.tx,900);
 const s=Math.min(A.W/9,A.H*.1),shape=(o,cx)=>{const[r,k]=o,w=k*s,h=r*s,x=cx-w/2,y=A.H*.36-h/2;matrix(g,[...Array(r)].map(()=>Array(k).fill('•')),x,y,s,null,13);label(g,`${r} × ${k}`,cx,y+h+18,14,C.tx,800)};
 if(S.n<4){shape(P[0],A.W*.27);shape(P[1],A.W*.73);label(g,'+',A.W/2,A.H*.36,26,C.tx,900);
  verdict().forEach((r,k)=>{tile(g,r,soft(k?'#fecaca':'#bbf7d0'),S.wrong===k?C.rd:edge(),S.wrong===k?4:2);label(g,k?'✗ Cannot add':'✓ Can add',r.x+r.w/2,r.y+r.h/2,15,C.tx,800)})}}
const verdict=()=>{const w=Math.min(A.W*.42,190),h=Math.max(46,A.H*.13);return[{x:A.W/2-w-6,y:A.H*.76,w,h},{x:A.W/2+6,y:A.H*.76,w,h}]};
function judge(k){if(S.n>=4||S.hold)return;const P=ORDERS[S.n],yes=k===0;if(yes!==!!P[2]){S.wrong=k;A.sound.miss();speak((yes?'Not this time. ':'Look again. ')+P[3]);return A.redraw()}
 S.wrong=null;A.sound.pop();speak('Right. '+P[3]);S.hold=1;const v=tick;setTimeout(()=>{if(v!==tick)return;S.hold=0;S.n++;twins();A.redraw();S.after()},quick()?10:700);A.redraw()}
/* a slider track for a scalar; vals is the list of allowed values */
function track(row,of){const y=A.H*(of===1?.8:row?.84:.66),x0=A.W*.14,w=A.W*.72;return{x:x0,y:y-16,w,h:32}}
function spot(r,vals,v){return r.x+r.w*vals.indexOf(v)/(vals.length-1)}
function drawTrack(g,r,vals,v,name){const C=A.col;g.strokeStyle=edge();g.lineWidth=4;g.beginPath();g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke();
 vals.forEach(t=>{const x=spot(r,vals,t);label(g,fmt(t),x,r.y+r.h+10,11,C.mu,600)});const x=spot(r,vals,v);g.fillStyle=C.ac;g.beginPath();g.arc(x,r.y+r.h/2,15,0,7);g.fill();
 label(g,name,r.x-24,r.y+r.h/2,15,C.tx,900);label(g,fmt(v),x,r.y+r.h/2,11,'#fff',900)}
function drawScal(g){const C=A.col,s=Math.min(A.W/7,A.H*.14),t=SC.goal[Math.min(S.n,2)],T=map2(SC.A,v=>v*t),cur=map2(SC.A,v=>v*S.k);
 label(g,S.n<3?`Target ${S.n+1} of 3: make kA match`:'All three targets hit.',A.W/2,A.H*.06,15,C.tx,900);
 const y=A.H*.2;matrix(g,cur,A.W*.27-s,y,s,(i,j)=>eq([[cur[i][j]]],[[T[i][j]]])?A.alpha(C.gr,.3):null);label(g,`${fmt(S.k)}A`,A.W*.27,y-14,13,C.mu);
 label(g,'→',A.W/2,y+s,22,C.mu);matrix(g,T,A.W*.73-s,y,s);label(g,'target',A.W*.73,y-14,13,C.mu);
 label(g,`A = [${SC.A.map(r=>r.map(fmt).join(' ')).join('; ')}]`,A.W/2,A.H*.56,13,C.mu,600);drawTrack(g,track(0,1),SC.K,S.k,'k')}
function drawMix(g){const C=A.col,s=Math.min(A.W/9,A.H*.12),G=MIX.goal[Math.min(S.n,1)],T=map2(MIX.A,(v,i,j)=>G[0]*v+G[1]*MIX.B[i][j]),cur=map2(MIX.A,(v,i,j)=>S.km*v+S.mm*MIX.B[i][j]);
 label(g,S.n<2?`Target ${S.n+1} of 2: set k and m so kA + mB matches`:'Both targets hit.',A.W/2,A.H*.05,14,C.tx,900);const y=A.H*.17;
 matrix(g,MIX.A,A.W*.12,y,s,null,13);label(g,'A',A.W*.12+s,y-12,12,C.mu);matrix(g,MIX.B,A.W*.12+2.6*s,y,s,null,13);label(g,'B',A.W*.12+3.6*s,y-12,12,C.mu);
 matrix(g,cur,A.W*.12+5.4*s,y,s,(i,j)=>Math.abs(cur[i][j]-T[i][j])<1e-9?A.alpha(C.gr,.3):null,13);label(g,`${fmt(S.km)}A + ${fmt(S.mm)}B`,A.W*.12+6.4*s,y-12,12,C.mu);
 label(g,`Target: [${T.map(r=>r.map(fmt).join(' ')).join('; ')}]`,A.W/2,A.H*.5,15,C.tx,800);
 drawTrack(g,track(0),MIX.D,S.km,'k');drawTrack(g,track(1),MIX.D,S.mm,'m')}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,A.W,A.H);const m=part();
 if(m==='add')drawFill(g,ADD,'+');if(m==='sub')drawFill(g,SUB,'-');if(m==='conf')drawConf(g);if(m==='scal'||m==='quiz')drawScal(g);if(m==='mix')drawMix(g);A.fx.draw(g)}
function setK(v,which){if(S.hold)return;const m=part();if(m==='scal'&&S.n<3)S.k=v;else if(m==='mix'&&S.n<2){if(which)S.mm=v;else S.km=v}else return;A.sound.tick();
 speak(m==='scal'?`k = ${fmt(v)}: every entry of A is multiplied by ${fmt(v)}.`:`Now ${fmt(S.km)}A + ${fmt(S.mm)}B.`);twins();A.redraw()}
function nudge(d,which){const m=part(),vals=m==='scal'?SC.K:MIX.D,cur=m==='scal'?S.k:which?S.mm:S.km,i=vals.indexOf(cur)+d;if(i>=0&&i<vals.length)setK(vals[i],which)}
function test(){const m=part();if(S.hold)return;
 if(m==='scal'){if(S.n>=3)return;const t=SC.goal[S.n];if(S.k!==t){A.sound.miss();
   speak(S.k===-t?`Close: ${fmt(S.k)}A has every sign the wrong way round. Try the opposite sign of k.`:`Not yet. Compare one entry: ${fmt(SC.A[0][0])} × k must make ${fmt(SC.A[0][0]*t)}. The same k multiplies every entry.`);return A.redraw()}
  A.sound.pop();speak(`Yes: k = ${fmt(t)}. Every entry of A was multiplied by ${fmt(t)}${t<0?', so every sign flipped':''}.`);S.n++;if(S.n<3)S.k=1;twins();A.redraw();return S.after()}
 if(m==='mix'){if(S.n>=2)return;const G=MIX.goal[S.n];if(S.km!==G[0]||S.mm!==G[1]){A.sound.miss();
   speak(S.km!==G[0]?`Look at row 1, column 2: B has 0 there, so that entry is ${fmt(MIX.A[0][1])}k. Find k from it first.`:`k is right. Now use row 1, column 1: ${fmt(S.km)} × ${MIX.A[0][0]} + m × ${MIX.B[0][0]} must hit the target.`);return A.redraw()}
  A.sound.pop();speak(`Yes: ${fmt(G[0])}A + ${fmt(G[1])}B matches every entry.`);S.n++;if(S.n<2){S.km=1;S.mm=1}twins();A.redraw();return S.after()}}
function twins(){if(!bar)return;bar.innerHTML='';const m=part(),B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},bar,t);b.onclick=f};
 if(m==='add'||m==='sub'){if(S.n>=4)return;const src=m==='add'?ADD:SUB,i=Math.floor(S.cell/2),j=S.cell%2;options(src,i,j,m==='add'?'+':'-').forEach((o,k)=>B(fmt(o[0]),`Entry row ${i+1} column ${j+1} is ${fmt(o[0])}`,()=>fill(k)))}
 if(m==='conf'&&S.n<4){B('✓ Can add','These can be added',()=>judge(0));B('✗ Cannot add','These cannot be added',()=>judge(1))}
 if(m==='scal'&&S.n<3){B('k −','Decrease k',()=>nudge(-1));B('k +','Increase k',()=>nudge(1));B('Check kA','Check kA against the target',test)}
 if(m==='mix'&&S.n<2){B('k −','Decrease k',()=>nudge(-1,0));B('k +','Increase k',()=>nudge(1,0));B('m −','Decrease m',()=>nudge(-1,1));B('m +','Increase m',()=>nudge(1,1));B('Check','Check kA + mB against the target',test)}}
function pickTrack(p){const m=part();if(m==='scal')return inside(p,track(0,1))?0:null;if(m==='mix'){if(inside(p,track(0)))return 0;if(inside(p,track(1)))return 1}return null}
function slide(p,which){const m=part(),vals=m==='scal'?SC.K:MIX.D,r=m==='scal'?track(0,1):track(which),f=Math.max(0,Math.min(1,(p.x-r.x)/r.w)),v=vals[Math.round(f*(vals.length-1))],cur=m==='scal'?S.k:which?S.mm:S.km;if(v!==cur)setK(v,which)}
function down(p){const m=part();if(m==='quiz')return false;
 if(m==='add'||m==='sub'){const k=chips(3).findIndex(r=>inside(p,r));if(k>=0&&S.n<4)fill(k);return false}
 if(m==='conf'){const k=verdict().findIndex(r=>inside(p,r));if(k>=0)judge(k);return false}
 const w=pickTrack(p);if(w==null)return false;S.drag={w};slide(p,w);return true}
function move(p){if(S.drag)slide(p,S.drag.w)}
function up(){if(S.drag){S.drag=null;speak((part()==='scal'?'Released. ':'Set. ')+'Press Check when you think it matches.')}}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const v=++tick;list.forEach((f,j)=>setTimeout(()=>{if(v===tick)f()},quick()?j*40+30:(j+1)*(ms||500)))}
const start=more=>{tick++;Object.assign(S,blank(),more||{})};
const right=src=>()=>{const m=part(),i=Math.floor(S.cell/2),j=S.cell%2;fill(options(src,i,j,m==='add'?'+':'-').findIndex(o=>o[1]))};
const steps=[
{h:'Add matching entries',p:'A and B are both 2 × 2. Fill in A + B one entry at a time: each entry is the sum of the entries in the same position.',predict:{q:'How do you add two 2 × 2 matrices?',opts:['Add the entries in matching positions','Multiply rows by columns'],ans:0},task:'Fill all 4 entries of A + B',
 show:()=>{steps[0].go();play([0,1,2,3].map(()=>right(ADD)),700)},go:()=>{start();speak('Find the entry in row 1, column 1 of A + B.');twins();S.after=finish(0,()=>S.n>=4,'A + B is found entry by entry, and it has the same order as A and B.')}},
{h:'Same order only',p:'Matrices can only be added or subtracted when they have the same order. Then they are called conformable for addition.',predict:{q:'Can a 2 × 3 matrix be added to a 3 × 2 matrix?',opts:['Yes, both have 6 entries','No, the orders differ'],ans:1},task:'Judge 4 pairs',
 show:()=>{steps[1].go();play(ORDERS.map(P=>()=>judge(P[2]?0:1)),900)},go:()=>{start();speak('Pair 1: can a 2 × 3 be added to a 2 × 3?');twins();S.after=finish(1,()=>S.n>=4,'Same order means conformable for addition. A different order means no sum.')}},
{h:'Scalar multiples',p:'kA means multiply every entry of A by the number k (a scalar). Drag k along the track, then check against the target.',predict:{q:'What does 3A do to A?',opts:['Multiplies every entry by 3','Multiplies only row 1 by 3'],ans:0},task:'Hit 3 targets with kA',
 show:()=>{steps[2].go();play([()=>setK(3),test,()=>setK(-1),test,()=>setK(.5),test],500)},go:()=>{start();speak('Drag k until kA matches the target.');twins();S.after=finish(2,()=>S.n>=3,'kA multiplies every entry by k; −A flips every sign and ½A halves every entry.')}},
{h:'Order matters in A − B',p:'Subtract entry by entry, always A\'s entry minus B\'s entry. Watch out: B − A gives the negatives.',predict:{q:'Is A − B the same as B − A?',opts:['Yes, always','No: B − A = −(A − B)'],ans:1},task:'Fill all 4 entries of A − B',
 show:()=>{steps[3].go();play([0,1,2,3].map(()=>right(SUB)),700)},go:()=>{start();speak('Find the entry in row 1, column 1 of A − B.');twins();S.after=finish(3,()=>S.n>=4,'A − B = A + (−1)B. Addition is commutative, but subtraction is not: B − A = −(A − B).')}},
{h:'Combine kA + mB',p:'Set the two dials k and m so that kA + mB matches the target. Use an entry where B has a 0 to find k first.',task:'Hit 2 targets',
 show:()=>{steps[4].go();play([()=>setK(2,0),()=>setK(1,1),test,()=>setK(1,0),()=>setK(-1,1),test],500)},go:()=>{start();speak('Set k and m, then press Check.');twins();S.after=finish(4,()=>S.n>=2,'kA + mB combines both ideas: scale each matrix, then add matching entries.')}},
{h:'Challenge',p:'',go:()=>{start({k:2});ask()}}];
const QS=[['Can you add a 2 × 3 matrix to a 3 × 2 matrix?',[['No, the orders differ','ok'],['Yes, both have 6 entries','count'],['Yes, if you turn one round','turn']]],
 ['A = [1 4] and B = [2 −1]. What is A + B?',[['[3 3]','ok'],['[2 −4]','mult'],['[−1 5]','minus']]],
 ['What is 3[2 −1; 0 4]?',[['[6 −3; 0 12]','ok'],['[6 −1; 0 4]','first'],['[5 2; 3 7]','plus3']]],
 ['A − B = [2 −1; 3 0]. What is B − A?',[['[−2 1; −3 0]','ok'],['[2 −1; 3 0]','same'],['[−2 −1; 3 0]','part']]],
 ['For two 2 × 2 matrices A and B, which is always true?',[['A + B = B + A','ok'],['A − B = B − A','same2'],['A + B is 4 × 4','order']]]];
function hint(t){let m='Go back to the lab: same order, then work entry by entry.';
 if(t==='count')m='Six entries is not enough. The shapes must match, so every entry has a partner in the same row and column.';
 if(t==='turn')m='Turning a matrix round (transposing) makes a different matrix. A 2 × 3 plus a 3 × 2 is not defined.';
 if(t==='mult')m='That multiplied the entries. Matrix addition adds matching entries: 1 + 2 and 4 + (−1).';
 if(t==='minus')m='That subtracted. A + B adds matching entries, giving [3 3].';
 if(t==='first')m='A scalar multiplies every entry, not just the first one: 3 × −1 = −3 and 3 × 4 = 12.';
 if(t==='plus3')m='That added 3 to each entry. 3A means multiply each entry by 3.';
 if(t==='same'||t==='same2')m='Subtraction is not commutative. B − A = −(A − B), so every sign flips.';
 if(t==='part')m='Every entry flips sign, not only the first. B − A = −(A − B) = [−2 1; −3 0].';
 if(t==='order')m='The sum has the same order as A and B, so it is still 2 × 2.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});speak('Challenge: '+q);A.redraw()}
function score(t){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+hint(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quizBox.hidden=A.step!==5;bar.hidden=A.step===5;twins()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quizBox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});twins()}});
A.start()})})();
