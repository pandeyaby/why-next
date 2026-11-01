/* Flagship: multiplying matrices (ages 16-18, A level Further Maths; CCSS N-VM.8, N-VM.9). Button twins for every gesture. */
(()=>{
const NEG='−',nf=v=>v<0?NEG+(-v):String(v);
const mul=(P,Q)=>P.map(r=>Q[0].map((_,j)=>r.reduce((s,v,k)=>s+v*Q[k][j],0)));
const same=(P,Q)=>JSON.stringify(P)===JSON.stringify(Q);
const MA=[[2,1],[3,-1]],MB=[[4,0],[1,5]];
const PAIRS=[[[2,3],[3,1],[['2 × 1',1,'Inner numbers 3 and 3 match, so AB is defined. The outer numbers give the order: 2 × 1.'],['3 × 3',0,'3 × 3 uses the inner numbers. The outer numbers, 2 and 1, give the order of AB.'],['Not defined',0,'The columns of A (3) match the rows of B (3), so AB is defined.']]],
 [[3,2],[3,2],[['3 × 2',0,'A has 2 columns but B has 3 rows. Equal orders are needed for adding, not multiplying.'],['2 × 3',0,'Inner numbers 2 and 3 differ, so there is no product to have an order.'],['Not defined',1,'Columns of A (2) and rows of B (3) differ, so AB is not defined.']]],
 [[1,3],[3,2],[['3 × 3',0,'Those are the inner numbers. Use the outer ones: 1 and 2.'],['Not defined',0,'A has 3 columns and B has 3 rows, so AB is defined.'],['1 × 2',1,'1 × 3 times 3 × 2: inner 3s match, outer numbers give 1 × 2.']]],
 [[2,2],[2,3],[['2 × 2',0,'The product takes its columns from B, which has 3.'],['2 × 3',1,'2 × 2 times 2 × 3 gives 2 × 3: rows from A, columns from B.'],['Not defined',0,'A has 2 columns and B has 2 rows, so AB is defined.']]]];
const SWAP=[[[[1,2],[0,1]],[[1,0],[1,1]]],[[[2,1],[1,3]],[[1,0],[0,1]]],[[[1,2],[0,1]],[[1,3],[0,1]]]];
const ID=[[[3,-1],[2,5]],[[1,2,0],[3,1,4],[2,0,1]]];
const Q=[[2,1,3],[0,4,1]],PR=[[30],[50],[20]],WHO=['Ali','Bea'],ITEM=['🍎','🍞','🥛'];
const TOT=[[['170p',1,'2 × 30 + 1 × 50 + 3 × 20 = 170p.'],['100p',0,'100p adds the prices but ignores how many of each Ali buys.'],['60p',0,'60p is only the apples. Multiply along the whole row and add.']],
 [['220p',1,'0 × 30 + 4 × 50 + 1 × 20 = 220p.'],['200p',0,'200p is only the bread. Add the milk too: 1 × 20.'],['5p',0,'5 counts the items. Each count must be multiplied by its price.']]];
VIS.reg('flagmmul',c=>{let A,dock,qz,qi=-1,ver=0,run=0;
const reset=()=>({after:()=>{},n:0,row:-1,R:[[null,null],[null,null]],work:'',bad:null,flip:0,seen:0,X:null,ph:0}),S=reset();
const stage=()=>['rc','ord','swap','id','shop','quiz'][A.step],fast=()=>A.reduced(),sz=n=>Math.round(n*(A.narrow?1:1.12));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,col,w){g.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function pill(g,r,bg,ln,lw){g.fillStyle=bg;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=ln;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>r&&p.x>=r.x-4&&p.x<=r.x+r.w+4&&p.y>=r.y-4&&p.y<=r.y+r.h+4;
const tint=h=>A.mix(A.col.pn,h,A.col.dark?.22:.55),line=()=>A.mix(A.col.tx,A.col.pn,.45);
function mat(g,M,x,y,s,fill,n){const C=A.col,h=M.length*s,w=M[0].length*s;g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();
 for(const[e,d]of[[x,1],[x+w,-1]]){g.moveTo(e+8*d,y);g.lineTo(e,y);g.lineTo(e,y+h);g.lineTo(e+8*d,y+h)}g.stroke();
 M.forEach((r,i)=>r.forEach((v,j)=>{const f=fill&&fill(i,j);if(f){g.fillStyle=f;A.paint.rrect(x+j*s+3,y+i*s+3,s-6,s-6,7);g.fill()}txt(g,v==null?'?':nf(v),x+(j+.5)*s,y+(i+.5)*s,n||15,v==null?C.mu:C.tx,800)}))}
const row3=n=>{const w=Math.min((A.W-24)/n,150),h=Math.max(46,A.H*.12),x0=(A.W-n*w)/2;return[...Array(n)].map((_,k)=>({x:x0+k*w+5,y:A.H*.82,w:w-10,h}))};
/* step 1: row of A times column of B */
const geo=()=>{const s=Math.min(A.W/5.6,A.H*.12);return{s,ax:A.W*.27-s,bx:A.W*.73-s,y:A.H*.1,rx:A.W/2-s,ry:A.H*.42}};
const rowR=i=>{const G=geo();return{x:G.ax-6,y:G.y+i*G.s,w:2*G.s+12,h:G.s}},colR=j=>{const G=geo();return{x:G.bx+j*G.s,y:G.y-6,w:G.s,h:2*G.s+12}};
function drawRC(g){const C=A.col,G=geo(),ci=S.n>>1,cj=S.n&1,on=S.n<4;
 mat(g,MA,G.ax,G.y,G.s,i=>on&&(S.row===i||S.bad==='r'+i)?A.alpha(S.bad==='r'+i?C.rd:C.ac,.35):null);
 mat(g,MB,G.bx,G.y,G.s,(i,j)=>on&&(S.bad==='c'+j)?A.alpha(C.rd,.35):on&&S.row>=0&&j===cj?A.alpha(C.ac,.18):null);
 txt(g,'A',G.ax+G.s,G.y-14,13,C.mu);txt(g,'B',G.bx+G.s,G.y-14,13,C.mu);txt(g,'×',A.W/2,G.y+G.s,22,C.tx,900);
 txt(g,'AB',A.W/2,G.ry-14,13,C.mu);mat(g,S.R,G.rx,G.ry,G.s,(i,j)=>on&&i===ci&&j===cj?A.alpha(C.vi,.35):null);
 txt(g,on?`Entry: row ${ci+1}, column ${cj+1} of AB`:'AB complete: each entry is a row of A times a column of B.',A.W/2,A.H*.7,14,on?C.tx:C.gr,800);
 if(S.work)txt(g,S.work,A.W/2,A.H*.79,15,C.tx,800);if(on)txt(g,S.row<0?'Tap the row of A it needs':'Now tap the column of B',A.W/2,A.H*.88,13,C.ac,700)}
function pickRow(i){if(S.n>=4)return;const ci=S.n>>1;if(i!==ci){S.bad='r'+i;A.sound.miss();tell(`Not row ${i+1}. Entry (${ci+1}, ${(S.n&1)+1}) sits in row ${ci+1} of AB, so it uses row ${ci+1} of A.`);return A.redraw()}
 S.row=i;S.bad=null;A.sound.tick();tell(`Row ${i+1} of A chosen. Now the column of B.`);dockUp();A.redraw()}
function pickCol(j){if(S.n>=4)return;if(S.row<0){tell('Choose the row of A first, then the column of B.');return}const ci=S.n>>1,cj=S.n&1;
 if(j!==cj){S.bad='c'+j;A.sound.miss();tell(`Not column ${j+1}. The column of B matches the column of the entry: column ${cj+1}.`);return A.redraw()}
 const v=MA[ci][0]*MB[0][cj]+MA[ci][1]*MB[1][cj];S.work=`${nf(MA[ci][0])} × ${nf(MB[0][cj])} + ${nf(MA[ci][1])} × ${nf(MB[1][cj])} = ${nf(v)}`;
 S.R[ci][cj]=v;S.n++;S.row=-1;S.bad=null;A.sound.pop();tell(`Yes: ${S.work}.${S.n<4?' Next entry.':' AB is complete.'}`);dockUp();A.redraw();S.after()}
/* step 2: order of a product */
function block(g,o,cx,y,s,lab,inn,ok){const[r,k]=o,w=k*s,h=r*s,x=cx-w/2,C=A.col;g.strokeStyle=line();g.lineWidth=1.5;
 for(let i=0;i<r;i++)for(let j=0;j<k;j++){g.fillStyle=tint('#c7d2fe');g.fillRect(x+j*s+1,y+i*s+1,s-2,s-2)}g.strokeRect(x,y,w,h);
 txt(g,lab,cx,y-12,12,C.mu);txt(g,`${r} × ${k}`,cx,y+h+16,15,C.tx,900);if(inn!=null)txt(g,'▲',cx+(inn?-1:1)*sz(15)*.9,y+h+34,12,ok?C.gr:C.rd,900)}
function drawOrd(g){const C=A.col,P=PAIRS[Math.min(S.n,3)],s=Math.min(A.W/12,A.H*.08);
 txt(g,S.n<4?`Pair ${S.n+1} of 4: what is the order of AB?`:'All four orders found.',A.W/2,A.H*.05,15,C.tx,900);if(S.n>=4)return;
 const ok=P[0][1]===P[1][0],sh=S.bad!=null;block(g,P[0],A.W*.28,A.H*.16,s,'A',sh?0:null,ok);txt(g,'×',A.W/2,A.H*.3,22,C.tx,900);block(g,P[1],A.W*.72,A.H*.16,s,'B',sh?1:null,ok);
 txt(g,'Columns of A must equal rows of B',A.W/2,A.H*.72,12,C.mu,600);
 row3(3).forEach((r,k)=>{pill(g,r,tint('#fde68a'),S.bad===k?C.rd:line(),S.bad===k?4:2);txt(g,P[2][k][0],r.x+r.w/2,r.y+r.h/2,A.narrow?13:15,C.tx,800)})}
function order(k){if(S.n>=4||S.ph)return;const o=PAIRS[S.n][2][k];if(!o[1]){S.bad=k;A.sound.miss();tell(o[2]);return A.redraw()}
 S.bad=null;S.ph=1;A.sound.pop();tell('Right. '+o[2]);const v=run;setTimeout(()=>{if(v!==run)return;S.ph=0;S.n++;dockUp();A.redraw();S.after()},fast()?10:700);A.redraw()}
/* step 3: AB against BA */
function drawSwap(g){const C=A.col,P=SWAP[Math.min(S.n,2)],s=Math.min(A.W/7.5,A.H*.1);
 txt(g,S.n<3?`Pair ${S.n+1} of 3: does AB equal BA?`:'Three pairs tested.',A.W/2,A.H*.05,15,C.tx,900);if(S.n>=3)return;
 const L=S.flip?[P[1],P[0]]:P,nm=S.flip?['B','A']:['A','B'],y=A.H*.16;
 L.forEach((M,k)=>{const x=A.W*(k?.62:.12);mat(g,M,x,y,s);txt(g,nm[k],x+s,y-12,13,C.mu)});
 pill(g,swapR(),tint('#bae6fd'),C.ac,2);txt(g,'⇄ swap',A.W/2,y+s,13,C.tx,800);
 const R=mul(L[0],L[1]),x=A.W/2-s;txt(g,nm.join(''),A.W/2,A.H*.43-12,13,C.mu);mat(g,R,x,A.H*.43,s);
 txt(g,S.seen===3?'You have seen both orders. Judge:':'Tap swap to see the other order',A.W/2,A.H*.73,13,S.seen===3?C.tx:C.ac,700);
 row3(2).forEach((r,k)=>{pill(g,r,tint(k?'#fecaca':'#bbf7d0'),S.bad===k?C.rd:line(),S.bad===k?4:2);txt(g,k?'AB ≠ BA':'AB = BA',r.x+r.w/2,r.y+r.h/2,16,C.tx,800)})}
const swapR=()=>{const s=Math.min(A.W/7.5,A.H*.1);return{x:A.W/2-30,y:A.H*.16+s-20,w:60,h:40}};
function flip(){if(S.n>=3)return;S.flip^=1;S.seen|=S.flip?2:1;A.sound.tick();const P=SWAP[S.n],L=S.flip?[P[1],P[0]]:P;tell(`Showing ${S.flip?'BA':'AB'}: [${mul(L[0],L[1]).map(r=>r.map(nf).join(' ')).join('; ')}].`);A.redraw()}
function judge(k){if(S.n>=3)return;if(S.seen!==3){tell('Swap the order first, so you have seen both AB and BA.');return}
 const P=SWAP[S.n],eq=same(mul(P[0],P[1]),mul(P[1],P[0]));if((k===0)!==eq){S.bad=k;A.sound.miss();tell(eq?'Compare entry by entry: every entry of AB matches BA here.':'Look at row 1, column 1: the two products differ, so AB ≠ BA.');return A.redraw()}
 A.sound.pop();tell(eq?(S.n===1?'Equal: multiplying by the identity in either order gives A.':'Equal this time, but only because of these two matrices. That is the exception.'):'Right: AB ≠ BA. Matrix multiplication is not commutative.');
 S.n++;S.flip=0;S.seen=1;S.bad=null;dockUp();A.redraw();S.after()}
/* step 4: build the identity */
const idM=()=>ID[Math.min(S.n,1)],xs=()=>S.X||(S.X=idM().map(r=>r.map(()=>0))),cellS=()=>Math.min(A.W/(A.narrow?6.2:7),A.H*.12);
const xR=(i,j)=>{const s=cellS(),N=idM().length;return{x:A.W/2-N*s/2+j*s,y:A.H*.1+i*s,w:s,h:s}};
function drawId(g){const C=A.col,M=idM(),N=M.length,s=cellS();xs();
 txt(g,S.n<2?`Build X so that AX = A (${N} × ${N})`:'I₂ and I₃ built.',A.W/2,A.H*.04,14,C.tx,900);if(S.n>=2)return;
 const r0=xR(0,0);mat(g,S.X,r0.x,r0.y,s,(i,j)=>S.X[i][j]?A.alpha(C.ac,.3):null,17);txt(g,'X: tap an entry to switch 0 ↔ 1',A.W/2,r0.y+N*s+14,12,C.mu,600);
 const t=Math.min(A.W/(N*2.6+1.6),A.H*.09),y=A.H*.1+N*s+46,P=mul(M,S.X);mat(g,M,A.W*.06,y,t,null,13);txt(g,'A',A.W*.06+N*t/2,y-10,12,C.mu);
 mat(g,P,A.W*.94-N*t,y,t,(i,j)=>P[i][j]===M[i][j]?A.alpha(C.gr,.3):A.alpha(C.rd,.15),13);txt(g,'AX',A.W*.94-N*t/2,y-10,12,C.mu);txt(g,'→',A.W/2,y+N*t/2,20,C.mu)}
function tog(i,j){if(S.n>=2)return;xs()[i][j]^=1;A.sound.tick();tell(`Entry (${i+1}, ${j+1}) of X is now ${S.X[i][j]}.`);A.redraw()}
function test(){if(S.n>=2)return;xs();const N=S.X.length,off=S.X.some((r,i)=>r.some((v,j)=>i!==j&&v)),gap=S.X.some((r,i)=>!r[i]);
 if(off||gap){A.sound.miss();tell(off?'A 1 off the leading diagonal mixes columns of A, so AX changes. The identity has 1s only on the diagonal.':'A 0 on the leading diagonal turns a column of AX into zeros. Put a 1 there.');return A.redraw()}
 A.sound.pop();tell(`Yes: X = I${N===2?'₂':'₃'}, so AX = A. The identity matrix acts like the number 1.`);S.n++;S.X=null;dockUp();A.redraw();S.after()}
/* step 5: shopping totals */
function drawShop(g){const C=A.col,s=Math.min(A.W/8,A.H*.1),y=A.H*.15,x=A.W*.2;
 txt(g,S.n?'QP = totals for each shopper':'Quantities Q (2 × 3) and prices P (3 × 1, pence)',A.W/2,A.H*.04,14,C.tx,900);
 ITEM.forEach((e,j)=>txt(g,e,x+(j+.5)*s,y-14,16,C.tx));WHO.forEach((w,i)=>txt(g,w,x-26,y+(i+.5)*s,12,C.mu,700));mat(g,Q,x,y,s);
 const px=x+3*s+s*.7;mat(g,PR,px,y,s,null,14);txt(g,'P',px+s/2,y-14,12,C.mu);
 if(S.n){const T=[[S.n>1?170:null],[S.n>2?220:null]];mat(g,T,A.W*.86-s/2,y,s*1.1,(i)=>i===S.n-1?A.alpha(C.vi,.3):null,14);txt(g,'QP',A.W*.86,y-14,12,C.mu)}
 const L=S.n?S.n<3?TOT[S.n-1].map(o=>o[0]):null:['QP','PQ'];if(!L){txt(g,'Both totals found: one row of Q times the column P.',A.W/2,A.H*.7,13,C.gr,800);return}
 txt(g,S.n?`${WHO[S.n-1]}'s total: row ${S.n} of Q times P`:'Which product gives the totals?',A.W/2,A.H*.72,13,C.tx,700);
 row3(L.length).forEach((r,k)=>{pill(g,r,tint('#fde68a'),S.bad===k?C.rd:line(),S.bad===k?4:2);txt(g,L[k],r.x+r.w/2,r.y+r.h/2,16,C.tx,800)})}
function shop(k){if(S.n>=3)return;if(!S.n){if(k){S.bad=1;A.sound.miss();tell('PQ is 3 × 1 times 2 × 3: inner numbers 1 and 2 differ, so it is not defined.');return A.redraw()}
  S.n=1;S.bad=null;A.sound.pop();tell('Yes: Q is 2 × 3 and P is 3 × 1, so QP is defined and is 2 × 1, one total per shopper.')}
 else{const o=TOT[S.n-1][k];if(!o[1]){S.bad=k;A.sound.miss();tell(o[2]);return A.redraw()}S.n++;S.bad=null;A.sound.pop();tell('Right: '+o[2])}dockUp();A.redraw();S.after()}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.3);g.fillRect(0,0,A.W,A.H);const m=stage();
 if(m==='rc')drawRC(g);if(m==='ord')drawOrd(g);if(m==='swap'||m==='quiz')drawSwap(g);if(m==='id')drawId(g);if(m==='shop')drawShop(g);A.fx.draw(g)}
function dockUp(){if(!dock)return;dock.innerHTML='';const m=stage(),B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},dock,t);b.onclick=f};
 if(m==='rc'&&S.n<4){[0,1].forEach(i=>B(`Row ${i+1} of A`,`Choose row ${i+1} of A`,()=>pickRow(i)));[0,1].forEach(j=>B(`Column ${j+1} of B`,`Choose column ${j+1} of B`,()=>pickCol(j)))}
 if(m==='ord'&&S.n<4)PAIRS[S.n][2].forEach((o,k)=>B(o[0],`AB is ${o[0]}`,()=>order(k)));
 if(m==='swap'&&S.n<3){B('⇄ Swap order','Swap A and B',flip);B('AB = BA','AB equals BA',()=>judge(0));B('AB ≠ BA','AB does not equal BA',()=>judge(1))}
 if(m==='id'&&S.n<2){const N=idM().length;for(let i=0;i<N;i++)for(let j=0;j<N;j++)B(`(${i+1},${j+1})`,`Switch entry row ${i+1} column ${j+1} of X`,()=>tog(i,j));B('Check AX','Check whether AX equals A',test)}
 if(m==='shop'&&S.n<3)(S.n?TOT[S.n-1].map(o=>o[0]):['QP','PQ']).forEach((t,k)=>B(t,S.n?`Total ${t}`:`Use ${t}`,()=>shop(k)))}
function down(p){const m=stage();if(m==='quiz')return false;
 if(m==='rc'){const i=[0,1].findIndex(k=>hit(p,rowR(k)));if(i>=0){pickRow(i);S.drag=S.row===i;return true}const j=[0,1].findIndex(k=>hit(p,colR(k)));if(j>=0)pickCol(j);return false}
 if(m==='ord'){const k=row3(3).findIndex(r=>hit(p,r));if(k>=0)order(k);return false}
 if(m==='swap'){if(hit(p,swapR()))flip();else{const k=row3(2).findIndex(r=>hit(p,r));if(k>=0)judge(k)}return false}
 if(m==='id'&&S.n<2){xs().forEach((r,i)=>r.forEach((_,j)=>{if(hit(p,xR(i,j)))tog(i,j)}));return false}
 if(m==='shop'){const n=S.n?3:2,k=row3(n).findIndex(r=>hit(p,r));if(k>=0)shop(k)}return false}
function move(p){if(S.drag)S.lp=p}
function up(){if(S.drag&&S.lp){const j=[0,1].findIndex(k=>hit(S.lp,colR(k)));if(j>=0)pickCol(j)}S.drag=false;S.lp=null}
const goal=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function seq(fs,ms){const v=++run;fs.forEach((f,k)=>setTimeout(()=>{if(v===run)f()},fast()?k*40+30:(k+1)*(ms||500)))}
const fresh=x=>{run++;Object.assign(S,reset(),x||{})};
const steps=[
{h:'Row times column',p:'Each entry of AB comes from one row of A and one column of B: multiply matching pairs and add. Tap (or drag) a row of A, then a column of B.',predict:{q:'Which parts of A and B make the entry in row 2, column 1 of AB?',opts:['Row 2 of A and column 1 of B','The entries in position (2, 1) of A and B'],ans:0},task:'Build all 4 entries of AB',
 show:()=>{steps[0].go();seq([0,1,2,3].flatMap(n=>[()=>pickRow(n>>1),()=>pickCol(n&1)]),450)},go:()=>{fresh();tell('Entry row 1, column 1 of AB. Tap the row of A it needs.');dockUp();S.after=goal(0,()=>S.n>=4,'Entry (i, j) of AB is row i of A times column j of B, multiplied pair by pair and added.')}},
{h:'When is AB defined?',p:'A product AB exists only when the columns of A equal the rows of B. Then an m × n times an n × p matrix gives an m × p matrix.',predict:{q:'Can a 3 × 2 matrix be multiplied by another 3 × 2 matrix?',opts:['Yes, the orders are equal','No, 2 columns do not meet 3 rows'],ans:1},task:'Find the order of 4 products',
 show:()=>{steps[1].go();seq(PAIRS.map(P=>()=>order(P[2].findIndex(o=>o[1]))),900)},go:()=>{fresh();tell('Pair 1: A is 2 × 3 and B is 3 × 1. What is the order of AB?');dockUp();S.after=goal(1,()=>S.n>=4,'Inner numbers must match; outer numbers give the order of the product.')}},
{h:'Is AB the same as BA?',p:'Multiply in both orders. Tap swap to see BA, then judge whether the two products are equal.',predict:{q:'For 2 × 2 matrices, is AB always equal to BA?',opts:['Yes, like 3 × 4 = 4 × 3','No, the order usually changes the answer'],ans:1},task:'Judge 3 pairs',
 show:()=>{steps[2].go();seq([flip,()=>judge(1),flip,()=>judge(0),flip,()=>judge(0)],600)},go:()=>{fresh({seen:1});tell('Pair 1: tap swap to compare AB with BA.');dockUp();S.after=goal(2,()=>S.n>=3,'Matrix multiplication is not commutative: AB and BA usually differ, though some pairs, like A and I, do commute.')}},
{h:'The identity matrix',p:'Find the matrix X that leaves A unchanged: AX = A. Tap entries of X to switch them between 0 and 1, then check.',task:'Build I₂ and I₃',
 show:()=>{steps[3].go();seq([()=>tog(0,0),()=>tog(1,1),test,()=>tog(0,0),()=>tog(1,1),()=>tog(2,2),test],450)},go:()=>{fresh();tell('Build X so that AX = A.');dockUp();S.after=goal(3,()=>S.n>=2,'The identity I has 1s on the leading diagonal and 0s elsewhere, so AI = IA = A.')}},
{h:'Matrices at the shop',p:'Q holds how many apples, loaves and milks Ali and Bea buy. P holds the prices. Choose the product that gives the totals, then find each total.',task:'Find both totals',
 show:()=>{steps[4].go();seq([()=>shop(0),()=>shop(0),()=>shop(0)],700)},go:()=>{fresh();tell('Which product gives each shopper\'s total: QP or PQ?');dockUp();S.after=goal(4,()=>S.n>=3,'Row of quantities times column of prices gives a total: QP is 2 × 1.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
const QS=[['A is 2 × 3 and B is 3 × 4. What is the order of AB?',[['2 × 4','ok'],['3 × 3','inner'],['Not defined','undef']]],
 ['What is [1 2][3; 4] (a 1 × 2 times a 2 × 1)?',[['[11]','ok'],['[3 8]','pairs'],['[4 6]','add']]],
 ['A is 3 × 2. Which product is defined?',[['A times a 2 × 5 matrix','ok'],['A times a 3 × 2 matrix','sameord'],['A times a 3 × 3 matrix','rows']]],
 ['For square matrices A and B, which is always true?',[['(AB)C = A(BC)','ok'],['AB = BA','comm'],['AB = 0 means A = 0 or B = 0','zero']]],
 ['What is I₂ times [5 −1; 2 3]?',[['[5 −1; 2 3]','ok'],['[5 0; 0 3]','diag'],['[1 0; 0 1]','iself']]]];
function hint(t){let m='Use the lab rule: row of the first times column of the second, and inner orders must match.';
 if(t==='inner')m='3 × 3 uses the inner numbers. The outer numbers give the order: 2 × 4.';
 if(t==='undef'||t==='rows')m='Check columns of the first against rows of the second; only those must match.';
 if(t==='pairs')m='That multiplied matching positions. Row times column: 1 × 3 + 2 × 4 = 11, a 1 × 1 matrix.';
 if(t==='add')m='That added entries. Multiply the row by the column and add: 1 × 3 + 2 × 4 = 11.';
 if(t==='sameord')m='Equal orders let you add, not multiply. A has 2 columns, so B needs 2 rows.';
 if(t==='comm')m='Matrix multiplication is not commutative, but it is associative: (AB)C = A(BC).';
 if(t==='zero')m='Two non-zero matrices can multiply to the zero matrix, unlike numbers.';
 if(t==='diag'||t==='iself')m='The identity leaves a matrix unchanged: IA = A.';return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);A.redraw()}
function grade(t){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok){ver++;A.win()}else{ver=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct. Streak: '+ver+'.':'✗ '+hint(t)} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
A=FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:A=>{qz.hidden=A.step!==5;dock.hidden=A.step===5;dockUp()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);dock=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});dockUp()}});
A.start()})})();
