/* Flagship – matrices: notation and order (ages 16–18): build matrices of a given order m × n by dragging a corner,
   find elements a_ij by row then column (with the swapped-index trap), copy a sales table into a matrix, judge whether
   pairs of matrices are equal (same order and every matching entry), and build the identity I₃ against the zero
   matrix and the anti-diagonal slip. Every canvas tap or drag has a button twin; the canvas label says what happened. */
(()=>{
const SUB='₀₁₂₃₄₅₆₇₈₉',sb=n=>String(n).split('').map(d=>SUB[+d]).join(''),el=(i,j)=>'a'+sb(i)+sb(j);
const ORD=[[2,3],[3,2],[1,4]];
const M1=[[4,7,1,9],[2,8,5,3],[6,0,12,10]],ASK=[[2,3],[3,1],[1,4]];
const DR=['Tea','Coffee','Juice'],DY=['Mon','Tue','Wed','Thu'],T=[[12,15,9,14],[20,18,22,25],[6,8,5,7]],GAP=[[0,2],[1,3],[2,1]];
const TL=[9,15,25,22,8,5];
const PAIRS=[[[['1','2'],['3','4']],[['1','2'],['3','4']],1,'Same order, 2 × 2, and every matching entry is equal, so the matrices are equal.'],
 [[['1','2','3']],[['1'],['2'],['3']],0,'The orders are 1 × 3 and 3 × 1. Matrices of different orders are never equal, even with the same numbers.'],
 [[['1','2'],['3','4']],[['1','3'],['2','4']],0,'Same order, but a₁₂ is 2 on the left and 3 on the right. Every matching entry must agree.'],
 [[['0.5','2'],['3','4']],[['½','2'],['3','4']],1,'a₁₁ is 0.5 on the left and ½ on the right, which is the same number. All other entries match, so they are equal.']];
VIS.reg('flagmtx',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,r:1,k:1,t:0,ask:0,gap:0,grab:null,pair:0,id:[[0,0,0],[0,0,0],[0,0,0]],bad:null,lock:0,last:''}),S=init0();
const stage=()=>['size','entry','table','equal','iden','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function box(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke()}
const lit=()=>A.col.dark?'#1e3a5f':'#dbeafe',hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function brackets(g,x,y,w,h){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x+8,y);g.lineTo(x,y);g.lineTo(x,y+h);g.lineTo(x+8,y+h);g.moveTo(x+w-8,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h);g.lineTo(x+w-8,y+h);g.stroke()}
function mat(g,M,x,y,cw,ch,fill,n){const R=M.length,K=M[0].length;brackets(g,x-4,y-4,K*cw+8,R*ch+8);
 for(let i=0;i<R;i++)for(let j=0;j<K;j++){const f=fill&&fill(i,j);if(f){g.fillStyle=f;A.paint.rrect(x+j*cw+3,y+i*ch+3,cw-6,ch-6,6);g.fill()}put(g,String(M[i][j]),x+(j+.5)*cw,y+(i+.5)*ch,n||16,A.col.tx,800)}}
/* ---- 1 order m × n ---- */
function gcell(i,j){const s=Math.min((A.W-90)/4,A.H*.13),x0=(A.W-4*s)/2;return{x:x0+j*s,y:A.H*.22+i*s,w:s,h:s}}
function size(r,k){if(stage()!=='size'||S.won>=3||S.lock)return;S.r=Math.max(1,Math.min(4,r));S.k=Math.max(1,Math.min(4,k));A.sound.tick();say(`Now ${S.r} × ${S.k}: ${S.r} row${S.r>1?'s':''} and ${S.k} column${S.k>1?'s':''}.`);keys();A.redraw()}
function checkSize(){if(stage()!=='size'||S.won>=3||S.lock)return;const[R,K]=ORD[S.t];
 if(S.r!==R||S.k!==K)return miss(S.r===K&&S.k===R?`That is ${S.r} × ${S.k}: ${S.r} rows and ${S.k} columns. Order is always rows first, so ${R} × ${K} needs ${R} row${R>1?'s':''}.`:`That is ${S.r} × ${S.k}. You need ${R} row${R>1?'s':''} going down and ${K} columns going across.`,'size');
 S.won++;A.sound.pop();say(`Yes: ${R} × ${K}, with ${R*K} entries.${R===1?' One row makes it a row matrix.':''}${S.won<3?' Next build '+ORD[S.t+1].join(' × ')+'.':''}`);
 if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.t++;S.r=1;S.k=1;keys();A.redraw()},rm()?10:400)}keys();A.redraw();S.want()}
function drawSize(g){const C=A.col,[R,K]=ORD[Math.min(S.t,2)];put(g,S.won<3?`Build a ${R} × ${K} matrix`:'All three built.',A.W/2,A.H*.06,17,C.tx,900);
 put(g,'Drag or tap the bottom-right corner cell',A.W/2,A.H*.14,12,C.mu);
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){const b=gcell(i,j),on=i<S.r&&j<S.k;g.fillStyle=on?A.alpha(C.ac,.55):(C.dark?'#1e293b':'#f1f5f9');A.paint.rrect(b.x+3,b.y+3,b.w-6,b.h-6,6);g.fill();g.strokeStyle=S.bad==='size'&&on?C.rd:C.ln;g.lineWidth=S.bad==='size'&&on?4:1.5;A.paint.rrect(b.x+3,b.y+3,b.w-6,b.h-6,6);g.stroke();if(on)put(g,'•',b.x+b.w/2,b.y+b.h/2,14,C.tx)}
 const a=gcell(0,0),z=gcell(S.r-1,S.k-1);brackets(g,a.x-4,a.y-2,z.x+z.w-a.x+8,z.y+z.h-a.y+4);
 for(let i=0;i<S.r;i++)put(g,'row '+(i+1),a.x-30,gcell(i,0).y+a.h/2,11,C.mu,600);for(let j=0;j<S.k;j++)put(g,'col '+(j+1),gcell(0,j).x+a.w/2,a.y-10,11,C.mu,600);
 put(g,`Order ${S.r} × ${S.k}  (rows × columns)`,A.W/2,gcell(3,0).y+a.h+22,15,C.tx,800)}
/* ---- 2 element a_ij ---- */
function ecell(i,j){const cw=Math.min((A.W-130)/4,90),ch=A.H*.11,x0=(A.W-4*cw)/2+30;return{x:x0+j*cw,y:A.H*.3+i*ch,w:cw,h:ch}}
function tap(i,j){if(stage()!=='entry'||S.won>=3||S.lock)return;const[I,J]=ASK[S.ask];S.last=i+','+j;
 if(i+1!==I||j+1!==J){A.redraw();return miss(i+1===J&&j+1===I?`That is ${el(i+1,j+1)} = ${M1[i][j]}: row ${i+1}, column ${j+1}. You swapped them. In ${el(I,J)} the first number, ${I}, is the row.`:`That is ${el(i+1,j+1)} = ${M1[i][j]}, in row ${i+1} and column ${j+1}. Count ${I} down for the row, then ${J} across.`,i+','+j)}
 S.won++;A.sound.pop();say(`Yes: ${el(I,J)} = ${M1[i][j]}, row ${I} then column ${J}.${S.won<3?' Now find '+el(...ASK[S.ask+1])+'.':''}`);
 if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.ask++;S.last='';keys();A.redraw()},rm()?10:400)}keys();A.redraw();S.want()}
function drawEntry(g){const C=A.col,[I,J]=ASK[Math.min(S.ask,2)],a=ecell(0,0);put(g,'A is a 3 × 4 matrix',A.W/2,A.H*.06,15,C.tx,800);put(g,S.won<3?`Tap ${el(I,J)}: row ${I}, column ${J}`:'All three found.',A.W/2,A.H*.15,16,C.tx,900);
 for(let j=0;j<4;j++)put(g,'col '+(j+1),a.x+(j+.5)*a.w,a.y-16,11,C.mu,600);for(let i=0;i<3;i++)put(g,'row '+(i+1),a.x-12,a.y+(i+.5)*a.h,11,C.mu,600,'right');
 mat(g,M1,a.x,a.y,a.w,a.h,(i,j)=>S.bad===i+','+j?A.alpha(C.rd,.3):(S.lock&&i+1===I&&j+1===J)?lit():null,18);
 put(g,'aᵢⱼ: i = row, j = column',A.W/2,a.y+3*a.h+30,13,C.tx,700)}
/* ---- 3 table to matrix ---- */
function tcell(i,j){const w=(A.W-20)/5,h=A.H*.06;return{x:10+j*w,y:A.H*.04+i*h,w,h}}
function scell(i,j){const cw=Math.min((A.W-90)/4,70),ch=A.H*.075,x0=(A.W-4*cw)/2+14;return{x:x0+j*cw,y:A.H*.38+i*ch,w:cw,h:ch}}
function tile(i){const cols=A.narrow?3:6,w=(A.W-20-(cols-1)*8)/cols,h=A.H*(A.narrow?.085:.11);return{x:10+(i%cols)*(w+8),y:A.H*(A.narrow?.73:.76)+Math.floor(i/cols)*(h+8),w,h}}
function where(v){for(let i=0;i<3;i++)for(let j=0;j<4;j++)if(T[i][j]===v)return[i,j]}
function place(t){if(stage()!=='table'||S.won>=3)return;const v=TL[t],[I,J]=GAP[S.gap];
 if(T[I][J]!==v){const[i,j]=where(v);return miss(`${v} is ${DR[i]} on ${DY[j]}: row ${i+1}, column ${j+1}. This gap is s${sb(I+1)}${sb(J+1)}, ${DR[I]} on ${DY[J]}.`,'t'+t)}
 S.won++;S.gap++;A.sound.pop();say(S.won>=3?'S is 3 × 4: each row is a drink, each column is a day. s₂₄ = 25 is Coffee on Thursday.':`s${sb(I+1)}${sb(J+1)} = ${v}, ${DR[I]} on ${DY[J]}. Next gap: s${sb(GAP[S.gap][0]+1)}${sb(GAP[S.gap][1]+1)}.`);keys();A.redraw();S.want()}
const filled=(i,j)=>{const k=GAP.findIndex(([a,b])=>a===i&&b===j);return k<0||k<S.gap};
function drawTable(g){const C=A.col;['Cups',...DY].forEach((d,j)=>{const r=tcell(0,j);put(g,d,r.x+r.w/2,r.y+r.h/2,11,C.mu,800)});
 DR.forEach((d,i)=>{put(g,d,tcell(i+1,0).x+tcell(0,0).w/2,tcell(i+1,0).y+tcell(0,0).h/2,12,C.tx,700);T[i].forEach((v,j)=>{const r=tcell(i+1,j+1);put(g,String(v),r.x+r.w/2,r.y+r.h/2,13,C.tx,700)})});
 g.strokeStyle=C.ln;g.lineWidth=1;g.beginPath();g.moveTo(10,tcell(1,0).y);g.lineTo(A.W-10,tcell(1,0).y);g.stroke();
 const a=scell(0,0),G=S.gap<3?GAP[S.gap]:null,M=T.map((r,i)=>r.map((v,j)=>filled(i,j)?v:'?'));put(g,'S =',a.x-30,a.y+1.5*a.h,16,C.tx,800);
 mat(g,M,a.x,a.y,a.w,a.h,(i,j)=>G&&G[0]===i&&G[1]===j?lit():null,15);
 put(g,G?`Fill s${sb(G[0]+1)}${sb(G[1]+1)}: ${DR[G[0]]} on ${DY[G[1]]}`:'Matrix complete',A.W/2,a.y+3*a.h+20,14,C.tx,800);
 TL.forEach((v,t)=>{if(GAP.some(([i,j],k)=>k<S.gap&&T[i][j]===v))return;let r=tile(t);if(S.grab&&S.grab.t===t&&S.grab.x!=null)r={...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2};box(g,r,C.dark?'#334155':'#fef9c3',S.bad==='t'+t);put(g,String(v),r.x+r.w/2,r.y+r.h/2,16,C.dark?'#f8fafc':'#111827',900)})}
/* ---- 4 equal matrices ---- */
function jbtn(k){const w=(A.W-40)/2;return{x:10+k*(w+20),y:A.H*.78,w,h:A.H*.13}}
function judge(eq){if(stage()!=='equal'||S.won>=4||S.lock)return;const[L,R,ans,why]=PAIRS[S.pair];
 if(eq!==ans)return miss(why,'j'+eq);S.won++;A.sound.pop();say(`${ans?'Equal':'Not equal'}. ${why}`);
 if(S.won<4){S.lock=1;setTimeout(()=>{S.lock=0;S.pair++;keys();A.redraw()},rm()?10:450)}keys();A.redraw();S.want()}
function drawEqual(g){const C=A.col,[L,R]=PAIRS[Math.min(S.pair,3)],cw=Math.min(A.W*.11,56),ch=A.H*.1;
 put(g,`Pair ${Math.min(S.pair+1,4)} of 4: equal or not?`,A.W/2,A.H*.07,15,C.tx,900);
 const lx=A.W*.27-L[0].length*cw/2,rx=A.W*.73-R[0].length*cw/2,ly=A.H*.42-L.length*ch/2,ry=A.H*.42-R.length*ch/2;
 mat(g,L,lx,ly,cw,ch,null,16);mat(g,R,rx,ry,cw,ch,null,16);put(g,'=?',A.W/2,A.H*.42,20,C.tx,900);
 put(g,`${L.length} × ${L[0].length}`,A.W*.27,A.H*.68,12,C.mu,700);put(g,`${R.length} × ${R[0].length}`,A.W*.73,A.H*.68,12,C.mu,700);
 ['Not equal','Equal'].forEach((t,k)=>{const b=jbtn(k);box(g,b,null,S.bad==='j'+k,C.tx);put(g,t,b.x+b.w/2,b.y+b.h/2,16,C.tx,900)})}
/* ---- 5 identity ---- */
function icell(i,j){const s=Math.min((A.W-80)/3,A.H*.17),x0=(A.W-3*s)/2;return{x:x0+j*s,y:A.H*.18+i*s,w:s,h:s}}
function flip(i,j){if(stage()!=='iden'||S.won>=1)return;S.id[i][j]=1-S.id[i][j];A.sound.tick();say(`${el(i+1,j+1)} is now ${S.id[i][j]}.`);keys();A.redraw()}
function checkId(){if(stage()!=='iden'||S.won>=1)return;const I=S.id,ones=I.flat().reduce((a,b)=>a+b,0),diag=I[0][0]&&I[1][1]&&I[2][2],anti=I[0][2]&&I[1][1]&&I[2][0]&&ones===3;
 let bad=null;for(let i=0;i<3&&!bad;i++)for(let j=0;j<3;j++)if(I[i][j]!==(i===j?1:0)){bad=i+','+j;break}
 if(bad)return miss(!ones?'That is the zero matrix O₃: every entry 0. The identity I₃ has 1s on the leading diagonal.':anti?'Those 1s run top right to bottom left. The identity uses the leading diagonal: a₁₁, a₂₂ and a₃₃.':diag?'The leading diagonal is right, but every other entry of I₃ must be 0.':'Put 1 at a₁₁, a₂₂ and a₃₃, where row number equals column number, and 0 everywhere else.',bad);
 S.won=1;A.sound.pop();say('That is I₃: square, 1 where i = j and 0 elsewhere. The zero matrix O has every entry 0.');keys();A.redraw();S.want()}
function drawIden(g){const C=A.col;put(g,'Build the identity matrix I₃: tap entries, then Check',A.W/2,A.H*.07,13,C.tx,800);const a=icell(0,0);brackets(g,a.x-4,a.y-4,3*a.w+8,3*a.h+8);
 for(let i=0;i<3;i++)for(let j=0;j<3;j++){const b=icell(i,j),v=S.id[i][j];box(g,{x:b.x+4,y:b.y+4,w:b.w-8,h:b.h-8},v?lit():null,S.bad===i+','+j,v?C.tx:null);put(g,String(v),b.x+b.w/2,b.y+b.h/2,22,C.tx,900);put(g,el(i+1,j+1),b.x+b.w-16,b.y+14,10,C.mu,600)}
 put(g,S.won?'I₃ built':'1 where i = j?',A.W/2,a.y+3*a.h+24,14,C.tx,800)}
/* ---- shared ---- */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=null;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'A = (aᵢⱼ), order m × n',W/2,H*.4,20,C.tx,800);put(g,'Rows first, then columns.',W/2,H*.6,13,C.tx);return}
 ({size:drawSize,entry:drawEntry,table:drawTable,equal:drawEqual,iden:drawIden})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='size'&&S.won<3){B('Add row',()=>size(S.r+1,S.k),'Add a row');B('Remove row',()=>size(S.r-1,S.k),'Remove a row');B('Add column',()=>size(S.r,S.k+1),'Add a column');B('Remove column',()=>size(S.r,S.k-1),'Remove a column');B('Check',checkSize,'Check the order')}
 if(v==='entry'&&S.won<3)for(let i=0;i<3;i++)for(let j=0;j<4;j++)B(el(i+1,j+1),()=>tap(i,j),`Entry in row ${i+1}, column ${j+1}`);
 if(v==='table'&&S.won<3)TL.forEach((n,t)=>{if(!GAP.some(([i,j],k)=>k<S.gap&&T[i][j]===n))B(String(n),()=>place(t),`Place ${n} in the gap`)});
 if(v==='equal'&&S.won<4){B('Equal',()=>judge(1),'The matrices are equal');B('Not equal',()=>judge(0),'The matrices are not equal')}
 if(v==='iden'&&S.won<1){for(let i=0;i<3;i++)for(let j=0;j<3;j++)B(`${el(i+1,j+1)}: ${S.id[i][j]}`,()=>flip(i,j),`Switch entry ${el(i+1,j+1)}, now ${S.id[i][j]}`);B('Check',checkId,'Check the identity matrix')}}
function down(p){const v=stage();
 if(v==='size'){for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(hit(p,gcell(i,j))){S.grab={size:1};size(i+1,j+1);return true}return false}
 if(v==='entry'){for(let i=0;i<3;i++)for(let j=0;j<4;j++)if(hit(p,ecell(i,j))){tap(i,j);return false}return false}
 if(v==='table'){const t=TL.findIndex((n,t)=>!GAP.some(([i,j],k)=>k<S.gap&&T[i][j]===n)&&hit(p,tile(t)));if(t>=0){S.grab={t,x:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='equal'){[0,1].forEach(k=>{if(hit(p,jbtn(k)))judge(k)});return false}
 if(v==='iden'){for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(hit(p,icell(i,j)))flip(i,j)}return false}
function move(p){const gr=S.grab;if(!gr)return;if(gr.size){for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(hit(p,gcell(i,j))&&(S.r!==i+1||S.k!==j+1))size(i+1,j+1);return}
 if(gr.x!=null||Math.hypot(p.x-gr.x0,p.y-gr.y0)>8){gr.x=p.x;gr.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.size)return checkSize();if(gr.x!=null&&p.y>A.H*.68){say('Drop the number on the matrix.');return A.redraw()}place(gr.t);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const steps=[
{h:'Rows by columns',p:'The order of a matrix is its number of rows, then its number of columns, written m × n. Drag the corner cell, or use the buttons, to build each order.',predict:{q:'A matrix has 2 rows and 3 columns. What is its order?',opts:['2 × 3','3 × 2','6'],ans:0},task:'Build 3 orders',
 show:()=>{steps[0].go();demo(ORD.map(([r,k])=>()=>{size(r,k);checkSize()}),650)},go:()=>{clear();say('Build a 2 × 3 matrix.');keys();S.want=ready(0,()=>S.won>=3,'Order m × n means m rows and n columns: 2 × 3 and 3 × 2 are different shapes.')}},
{h:'Find the element',p:'aᵢⱼ is the element in row i and column j of matrix A. Tap the element asked for.',predict:{q:'In a₂₃, which number gives the row?',opts:['The 2','The 3'],ans:0},task:'Find 3 elements',
 show:()=>{steps[1].go();demo(ASK.map(([i,j])=>()=>tap(i-1,j-1)),650)},go:()=>{clear();say('Tap a₂₃.');keys();S.want=ready(1,()=>S.won>=3,'aᵢⱼ: row i first, then column j.')}},
{h:'Table to matrix',p:'A café records cups sold. Matrix S keeps the same layout: rows are drinks, columns are days. Drag or tap the number for each gap.',task:'Fill 3 gaps',
 show:()=>{steps[2].go();demo(GAP.map(([i,j])=>()=>place(TL.indexOf(T[i][j]))),500)},go:()=>{clear();say('Fill s₁₃: Tea on Wed.');keys();S.want=ready(2,()=>S.won>=3,'The matrix keeps the table layout, so sᵢⱼ is drink i on day j.')}},
{h:'Equal or not',p:'Two matrices are equal only when they have the same order and every matching element is equal. Judge each pair.',predict:{q:'A row matrix (1 2 3) and a column matrix with 1, 2, 3 down. Are they equal?',opts:['Yes, same numbers','No, different orders'],ans:1},task:'Judge 4 pairs',
 show:()=>{steps[3].go();demo(PAIRS.map(p=>()=>judge(p[2])),650)},go:()=>{clear();say('Pair 1: equal or not?');keys();S.want=ready(3,()=>S.won>=4,'Same order and every matching element equal, or not equal at all.')}},
{h:'Identity and zero',p:'The identity matrix Iₙ is square, with 1 on the leading diagonal and 0 everywhere else. The zero matrix O has every element 0. Tap entries to build I₃, then check.',predict:{q:'Where do the 1s go in the identity matrix?',opts:['Top left to bottom right','Top right to bottom left','In every entry'],ans:0},task:'Build I₃',
 show:()=>{steps[4].go();demo([[0,0],[1,1],[2,2]].map(([i,j])=>()=>flip(i,j)).concat([checkId]),450)},go:()=>{clear();say('Every entry starts at 0. This is O₃. Build I₃.');keys();S.want=ready(4,()=>S.won>=1,'Iₙ has 1 where i = j and 0 elsewhere; O has 0 everywhere.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['A matrix has 4 rows and 2 columns. What is its order?',[['4 × 2','ok'],['2 × 4','swap'],['8','mult']]],
 ['B has rows (3, 8, 1) and (5, 2, 7). What is b₂₁?',[['5','ok'],['8','rc'],['2','diag']]],
 ['Which of these must be a square matrix?',[['An identity matrix','ok'],['A zero matrix','zero'],['A row matrix','row']]],
 ['How many elements does a 3 × 5 matrix have?',[['15','ok'],['8','add'],['35','join']]],
 ['Can a 2 × 3 matrix equal a 3 × 2 matrix?',[['No, the orders differ','ok'],['Yes, if the numbers are the same','same'],['Yes, always','alw']]]];
function why(t){let m='Order is rows × columns, and aᵢⱼ is row i, column j.';
 if(t==='swap')m='2 × 4 would be 2 rows and 4 columns. Rows come first: 4 rows and 2 columns is 4 × 2.';if(t==='mult')m='8 is the number of elements. The order is written as rows × columns: 4 × 2.';
 if(t==='rc')m='8 is b₁₂, row 1 and column 2. b₂₁ is row 2, column 1, which is 5.';if(t==='diag')m='2 is b₂₂. b₂₁ is in row 2 but column 1, which is 5.';
 if(t==='zero')m='A zero matrix can be any order, such as O of order 2 × 3. The identity must be square.';if(t==='row')m='A row matrix is 1 × n, so it is only square when n = 1. The identity must be square.';
 if(t==='add')m='3 + 5 = 8 adds the rows and columns. A 3 × 5 matrix has 3 rows of 5, which is 15 elements.';if(t==='join')m='3 × 5 is the order, not the number 35. It has 3 × 5 = 15 elements.';
 if(t==='same')m='Equal matrices need the same order first. A 2 × 3 and a 3 × 2 matrix can never be equal.';if(t==='alw')m='Matrices of different orders are never equal, whatever their elements.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':'Answer '+o},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.65,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
