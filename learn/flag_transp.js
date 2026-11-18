/* Flagship: the transpose of a matrix (ages 16-18; A-level Further Mathematics). Send each row of a 2 x 3 matrix to
   a column of its 3 x 2 transpose, place single entries (a_ij goes to row j, column i), find the leading diagonal that
   stays put, order a product so it equals (AB)^T, and complete a symmetric matrix. Every canvas tap has a button twin. */
(()=>{
const SUB=n=>String(n).split('').map(d=>'₀₁₂₃₄₅₆₇₈₉'[d]).join('');
const T=M=>M[0].map((_,j)=>M.map(r=>r[j]));
const MUL=(P,Q)=>P.map(r=>Q[0].map((_,j)=>r.reduce((s,v,k)=>s+v*Q[k][j],0)));
const A0=[[1,4,2],[3,0,5]],A3=[[2,8,6],[1,9,7],[4,3,5]],PA=[[1,2,0],[0,1,3]],PB=[[1,3],[2,0],[1,1]],SY=[[2,4,-1],[0,3,5],[0,0,0]];
const ROUNDS=[[1,2],[2,0],[0,1]],HOLES=[[1,0],[2,0],[2,1]];
VIS.reg('flagtransp',c=>{let A,keys,quiz,qk=-1,good=0;const Z={};
const stage=()=>['flip','entry','diag','prod','sym','chal'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const ink=()=>A.col.tx,dim=()=>A.col.mu,hot=()=>A.col.dark?'#fbbf24':'#b45309',ok=()=>A.col.dark?'#4ade80':'#15803d';
function put(t,x,y,px,o){const g=A.ctx;o=o||{};g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||ink();g.fillText(t,x,y,o.mx||A.W-8)}
function cellSize(cols,rows){return Math.max(28,Math.min(A.W*.8/cols,A.H*.6/rows,54))}
/* draw a bracketed matrix; returns the box of each entry so taps can find it */
function mat(M,x,y,s,o){const g=A.ctx,rows=M.length,cols=M[0].length,box=[];o=o||{};
 for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const cx=x+j*s,cy=y+i*s,v=M[i][j],f=o.fill&&o.fill(i,j);
  if(f){A.paint.rrect(cx+2,cy+2,s-4,s-4,6);g.fillStyle=f;g.fill()}if(o.line&&o.line(i,j)){A.paint.rrect(cx+2,cy+2,s-4,s-4,6);g.lineWidth=3;g.strokeStyle=hot();g.stroke()}
  put(v==null?'·':String(v).replace('-','−'),cx+s/2,cy+s/2,Math.min(s*.46,22),{c:v==null?dim():ink()});box.push({i,j,x:cx,y:cy,s})}
 g.lineWidth=2.5;g.strokeStyle=ink();const h=rows*s;[[x,1],[x+cols*s,-1]].forEach(([bx,d])=>{g.beginPath();g.moveTo(bx+d*7,y);g.lineTo(bx,y);g.lineTo(bx,y+h);g.lineTo(bx+d*7,y+h);g.stroke()});
 if(o.name)put(o.name,x+cols*s/2,y-16,14);if(o.size)put(o.size,x+cols*s/2,y+h+16,12,{c:dim(),w:700});return box}
const tint=(col,a)=>A.alpha(col,a);
function layout(L,R){const rows=Math.max(L.length,R.length),s=cellSize(L[0].length+R[0].length+1,rows),gap=s*1.1,w=(L[0].length+R[0].length)*s+gap,x0=(A.W-w)/2,y0=Math.max(A.H*.16,(A.H*.82-rows*s)/2);return{s,lx:x0,rx:x0+L[0].length*s+gap,y:y0}}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.32);g.fillRect(0,0,W,H);const k=stage();Z.hit=[];
 if(k==='flip'){const L=layout(A0,T(A0)),tgt=T(A0).map((r,i)=>r.map((v,j)=>Z.cols[j]?v:null));
  Z.hit.push(...mat(A0,L.lx,L.y,L.s,{name:'A',size:'2 × 3',fill:(i)=>Z.cols.indexOf(i)>=0?tint(ok(),.25):Z.sel===i?tint(hot(),.3):null}).map(b=>({...b,side:'L'})));
  Z.hit.push(...mat(tgt,L.rx,L.y,L.s,{name:'Aᵀ',size:'3 × 2',fill:(i,j)=>Z.cols[j]!=null?tint(ok(),.25):null}).map(b=>({...b,side:'R'})));
  put(Z.sel==null?'Tap a row of A':`Row ${Z.sel+1} picked: tap a column of Aᵀ`,W/2,H*.86,A.narrow?13:15)}
 if(k==='entry'){const L=layout(A3,A3),[r,q]=ROUNDS[Math.min(Z.round,2)],tgt=A3.map((row,i)=>row.map((v,j)=>Z.placed.some(([a,b])=>a===j&&b===i)||i===j?A3[j][i]:null));
  mat(A3,L.lx,L.y,L.s,{name:'A',fill:(i,j)=>Z.round<3&&i===r&&j===q?tint(hot(),.35):null});
  Z.hit.push(...mat(tgt,L.rx,L.y,L.s,{name:'Aᵀ',line:(i,j)=>Z.miss&&Z.miss[0]===i&&Z.miss[1]===j}).map(b=>({...b,side:'R'})));
  put(Z.round<3?`a${SUB(r+1)}${SUB(q+1)} = ${A3[r][q]}: where does it go in Aᵀ?`:'All three entries placed',W/2,H*.86,A.narrow?13:15)}
 if(k==='diag'){const L=layout(A3,A3);Z.hit.push(...mat(A3,L.lx,L.y,L.s,{name:'A',fill:(i,j)=>Z.found[i]&&i===j?tint(ok(),.3):null,line:(i,j)=>Z.miss&&Z.miss[0]===i&&Z.miss[1]===j}).map(b=>({...b,side:'L'})));
  mat(T(A3),L.rx,L.y,L.s,{name:'Aᵀ',fill:(i,j)=>i===j?tint(ok(),Z.found[i]?.3:.08):null});
  if(Z.found.every(Boolean)){g.setLineDash([6,5]);g.lineWidth=2;g.strokeStyle=hot();[L.lx,L.rx].forEach(x=>{g.beginPath();g.moveTo(x,L.y);g.lineTo(x+3*L.s,L.y+3*L.s);g.stroke()});g.setLineDash([])}
  put(`${Z.found.filter(Boolean).length} of 3 fixed entries found`,W/2,H*.86,A.narrow?13:15)}
 if(k==='prod'){const s=Math.max(26,Math.min(W*.085,H*.2,46)),AB=T(MUL(PA,PB));mat(AB,W*.05,H*.22,s,{name:'(AB)ᵀ',size:'2 × 2'});
  const sx=W*.05+3*s,slot=Math.min(W*.13,64);Z.slots=[0,1].map(n=>({x:sx+n*(slot+8),y:H*.22,w:slot,h:s*2}));
  Z.slots.forEach((b,n)=>{A.paint.rrect(b.x,b.y,b.w,b.h,10);g.lineWidth=2;g.setLineDash(Z.order[n]?[]:[5,4]);g.strokeStyle=ink();g.stroke();g.setLineDash([]);put(Z.order[n]||'?',b.x+b.w/2,b.y+b.h/2,18)});
  put('=',W*.05+2*s+s*.5,H*.22+s,20);const ty=H*.22+s*2+14;Z.tiles=['Aᵀ','Bᵀ'].map((n,q)=>({n,x:sx+q*(slot+8),y:ty,w:slot,h:Math.min(s*1.1,44)}));
  Z.tiles.forEach(b=>{if(Z.order.includes(b.n))return;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=tint(hot(),.25);g.fill();g.lineWidth=2;g.strokeStyle=hot();g.stroke();put(b.n,b.x+b.w/2,b.y+b.h/2,17)});
  put('A = (1 2 0 ; 0 1 3), 2 × 3     B = (1 3 ; 2 0 ; 1 1), 3 × 2',W/2,H*.72,A.narrow?12:14,{c:dim(),w:700});
  if(Z.order.length===2){const P={Aᵀ:T(PA),Bᵀ:T(PB)},R=MUL(P[Z.order[0]],P[Z.order[1]]),same=R.length===2&&R[0].length===2&&R.every((r,i)=>r.every((v,j)=>v===AB[i][j]));
   const rx=Z.slots[1].x+Z.slots[1].w+18,rs=Math.max(18,Math.min((W-rx-10)/R[0].length,H*.18,44));mat(R,rx,H*.22,rs,{name:Z.order.join(''),size:`${R.length} × ${R[0].length}`});put(same?'Equal to (AB)ᵀ':'Not equal to (AB)ᵀ',W/2,H*.86,A.narrow?13:15,{c:same?ok():C.rd})}
  else put('Fill both boxes with Aᵀ or Bᵀ',W/2,H*.86,A.narrow?13:15)}
 if(k==='sym'){const L=layout(SY,SY),M=SY.map((r,i)=>r.map((v,j)=>{const h=HOLES.findIndex(([a,b])=>a===i&&b===j);return h<0?v:Z.vals[h]}));
  Z.hit.push(...mat(M,L.lx,L.y,L.s,{name:'A',fill:(i,j)=>HOLES.some(([a,b])=>a===i&&b===j)?tint(M[i][j]===M[j][i]?ok():hot(),.3):null,line:(i,j)=>{const h=Z.pick;return h!=null&&HOLES[h][0]===i&&HOLES[h][1]===j}}).map(b=>({...b,side:'L'})));
  const MT=T(M);mat(MT,L.rx,L.y,L.s,{name:'Aᵀ',fill:(i,j)=>MT[i][j]!==M[i][j]?tint(C.rd,.22):null});const sy=M.every((r,i)=>r.every((v,j)=>v===MT[i][j]));
  put(sy?'Aᵀ = A: symmetric':'Aᵀ ≠ A yet: red entries differ',W/2,H*.86,A.narrow?13:15,{c:sy?ok():ink()})}
 if(k==='chal'){put('Transpose: rows become columns.',W/2,H*.36,16);put('(Aᵀ)ᵢⱼ = aⱼᵢ,  (AB)ᵀ = BᵀAᵀ',W/2,H*.52,15,{c:dim(),w:700});put('Symmetric means Aᵀ = A.',W/2,H*.66,14,{c:dim(),w:700})}
 A.fx.draw(g)}
function chooseRow(i){if(stage()!=='flip'||Z.cols.indexOf(i)>=0)return;Z.sel=i;A.sound.tick();speak(`Row ${i+1} of A is (${A0[i].join(', ')}). Which column of Aᵀ should it fill?`);refresh()}
function chooseCol(j){if(stage()!=='flip')return;if(Z.sel==null){speak('Pick a row of A first.');return}if(Z.cols[j]!=null)return;
 if(j!==Z.sel){A.sound.miss();speak(`Row ${Z.sel+1} goes to column ${Z.sel+1}, not column ${j+1}. The transpose keeps the order: row i becomes column i.`);refresh();return}
 Z.cols[j]=Z.sel;Z.sel=null;A.sound.pop();speak(`Row ${j+1} is now column ${j+1} of Aᵀ.`+(Z.cols.every(v=>v!=null)?' A was 2 × 3, so Aᵀ is 3 × 2.':''));refresh()}
function place(i,j){if(stage()!=='entry'||Z.round>2)return;const[r,q]=ROUNDS[Z.round];
 if(i===q&&j===r){Z.placed.push([r,q]);Z.round++;Z.miss=null;A.sound.pop();speak(`Yes: a${SUB(r+1)}${SUB(q+1)} moves to row ${q+1}, column ${r+1} of Aᵀ.`+(Z.round<3?' Next entry.':' The row and column numbers swap every time.'))}
 else{Z.miss=[i,j];A.sound.miss();speak(i===r&&j===q?'That is the same place it had in A. In the transpose the row number and column number swap.':`Row ${i+1}, column ${j+1} holds a${SUB(j+1)}${SUB(i+1)} of A. Swap the numbers of a${SUB(r+1)}${SUB(q+1)}.`)}refresh()}
function fixed(i,j){if(stage()!=='diag')return;if(i===j){if(Z.found[i])return;Z.found[i]=1;Z.miss=null;A.sound.pop();speak(`a${SUB(i+1)}${SUB(i+1)} stays put: swapping row ${i+1} and column ${i+1} changes nothing.`+(Z.found.every(Boolean)?' The leading diagonal is the mirror line.':''))}
 else{Z.miss=[i,j];A.sound.miss();speak(`a${SUB(i+1)}${SUB(j+1)} moves to row ${j+1}, column ${i+1}. Only entries with the same row and column number stay put.`)}refresh()}
function tile(n){if(stage()!=='prod')return;if(n==='clear'){Z.order=[];speak('Boxes cleared.');refresh();return}if(Z.order.length>1||Z.order.includes(n))return;Z.order.push(n);A.sound.tick();
 if(Z.order.length===2){const pass=Z.order[0]==='Bᵀ';speak(pass?'BᵀAᵀ is 2 × 3 times 3 × 2 = 2 × 2, and every entry matches (AB)ᵀ. Transposing a product reverses the order.':'AᵀBᵀ is 3 × 2 times 2 × 3 = 3 × 3, not even the right size. Clear and try the other order.')}refresh()}
function bump(h,d){if(stage()!=='sym')return;Z.pick=h;Z.vals[h]+=d;A.sound.tick();const[i,j]=HOLES[h],want=SY[j][i];
 speak(`a${SUB(i+1)}${SUB(j+1)} = ${Z.vals[h]}`.replace('-','−')+(Z.vals[h]===want?`: it matches a${SUB(j+1)}${SUB(i+1)}.`:`. Its mirror a${SUB(j+1)}${SUB(i+1)} is ${String(want).replace('-','−')}.`));refresh()}
function tap(p){const b=(Z.hit||[]).find(b=>p.x>=b.x&&p.x<=b.x+b.s&&p.y>=b.y&&p.y<=b.y+b.s),k=stage();
 if(k==='prod'){const tl=(Z.tiles||[]).find(s=>!Z.order.includes(s.n)&&p.x>=s.x&&p.x<=s.x+s.w&&p.y>=s.y&&p.y<=s.y+s.h);if(tl)tile(tl.n);else if((Z.slots||[]).some(s=>p.x>=s.x&&p.x<=s.x+s.w&&p.y>=s.y&&p.y<=s.y+s.h)&&Z.order.length)tile('clear');return false}
 if(!b)return false;if(k==='flip')b.side==='L'?chooseRow(b.i):chooseCol(b.j);if(k==='entry')place(b.i,b.j);if(k==='diag')fixed(b.i,b.j);
 if(k==='sym'){const h=HOLES.findIndex(([a,c2])=>a===b.i&&c2===b.j);if(h>=0)bump(h,1)}return false}
function pads(){if(!keys)return;keys.innerHTML='';const k=stage(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},keys,t).onclick=f};
 if(k==='flip'){[0,1].forEach(i=>{if(Z.cols.indexOf(i)<0)add(`Row ${i+1} of A`,()=>chooseRow(i))});[0,1].forEach(j=>{if(Z.cols[j]==null)add(`Column ${j+1} of Aᵀ`,()=>chooseCol(j))})}
 if(k==='entry'&&Z.round<3)for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(i!==j&&!Z.placed.some(([a,b])=>a===j&&b===i))add(`R${i+1} C${j+1}`,()=>place(i,j),`Aᵀ row ${i+1}, column ${j+1}`);
 if(k==='diag')for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(!(i===j&&Z.found[i]))add(`a${SUB(i+1)}${SUB(j+1)}`,()=>fixed(i,j),`Entry a ${i+1} ${j+1}: does it stay put?`);
 if(k==='prod'){['Aᵀ','Bᵀ'].forEach(n=>{if(!Z.order.includes(n)&&Z.order.length<2)add(n,()=>tile(n),`Put ${n} in the next box`)});if(Z.order.length)add('Clear',()=>tile('clear'))}
 if(k==='sym')HOLES.forEach(([i,j],h)=>{const nm=`a${SUB(i+1)}${SUB(j+1)}`;add(`${nm} +1`,()=>bump(h,1),`Raise ${nm} by 1`);add(`${nm} −1`,()=>bump(h,-1),`Lower ${nm} by 1`)})}
function refresh(){A.redraw();pads();Z.test()}
const gate=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function wipe(){Z.gen=(Z.gen||0)+1;const g=Z.gen;for(const x in Z)delete Z[x];Object.assign(Z,{gen:g,test:()=>{},sel:null,cols:[null,null],round:0,placed:[],miss:null,found:[0,0,0],order:[],vals:[0,0,0],pick:null,hit:[]})}
function demo(i,acts){steps[i].go();const g=Z.gen;acts.forEach((f,n)=>setTimeout(()=>{if(g===Z.gen)f()},A.reduced()?30*(n+1):(n+1)*420))}
const steps=[
{h:'Rows become columns',p:'The transpose of A, written Aᵀ, turns each row of A into a column. Row 1 becomes column 1, row 2 becomes column 2. An m × n matrix has an n × m transpose.',
 predict:{q:'A is a 2 × 3 matrix. What size is Aᵀ?',opts:['3 × 2','2 × 3','3 × 3'],ans:0},task:'Send each row of A to the right column of Aᵀ',
 show:()=>demo(0,[()=>chooseRow(0),()=>chooseCol(0),()=>chooseRow(1),()=>chooseCol(1)]),
 go:()=>{wipe();speak('Tap a row of A, then the column of Aᵀ it should fill.');pads();Z.test=gate(0,()=>Z.cols.every(v=>v!=null),'Every row of A is a column of Aᵀ.')}},
{h:'Entry by entry',p:'In symbols, (Aᵀ)ᵢⱼ = aⱼᵢ. The entry in row i, column j of A moves to row j, column i of Aᵀ: the two numbers swap.',
 predict:{q:'In A, the entry in row 2, column 3 is 7. Where is 7 in Aᵀ?',opts:['Row 3, column 2','Row 2, column 3','Row 3, column 3'],ans:0},task:'Place three entries of A in Aᵀ',
 show:()=>demo(1,ROUNDS.map(([r,q])=>()=>place(q,r))),
 go:()=>{wipe();speak('The bright entry of A needs a home in Aᵀ. Tap where it goes.');pads();Z.test=gate(1,()=>Z.round===3,'aᵢⱼ always lands at row j, column i.')}},
{h:'The mirror line',p:'For a square matrix, the transpose is a reflection in the leading diagonal, from top left to bottom right. Entries on that diagonal have equal row and column numbers, so they stay put.',
 predict:{q:'You transpose a 3 × 3 matrix. Which entries stay in the same place?',opts:['The leading diagonal','The first row','None of them'],ans:0},task:'Tap the three entries of A that stay put',
 show:()=>demo(2,[0,1,2].map(i=>()=>fixed(i,i))),
 go:()=>{wipe();speak('Tap each entry of A that is in the same place in Aᵀ.');pads();Z.test=gate(2,()=>Z.found.every(Boolean),'The leading diagonal is fixed; the rest reflect across it.')}},
{h:'Transpose of a product',p:'(AB)ᵀ = BᵀAᵀ: the transpose of a product is the product of the transposes in reverse order. With A 2 × 3 and B 3 × 2, AᵀBᵀ is 3 × 3, so the order is forced by the sizes.',
 predict:{q:'Which product equals (AB)ᵀ?',opts:['BᵀAᵀ','AᵀBᵀ','AB again'],ans:0},task:'Fill the boxes so the product equals (AB)ᵀ',
 show:()=>demo(3,[()=>tile('Bᵀ'),()=>tile('Aᵀ')]),
 go:()=>{wipe();speak('A is 2 × 3 and B is 3 × 2. Put Aᵀ and Bᵀ in the boxes in the order that gives (AB)ᵀ.');pads();Z.test=gate(3,()=>Z.order.join('')==='BᵀAᵀ','(AB)ᵀ = BᵀAᵀ: reverse the order.')}},
{h:'Symmetric matrices',p:'A square matrix is symmetric when Aᵀ = A, so aᵢⱼ = aⱼᵢ for every entry. Each entry below the diagonal mirrors one above it. For any matrix A, both AAᵀ and AᵀA are symmetric.',
 predict:{q:'A symmetric matrix has a₁₂ = 4. What is a₂₁?',opts:['4','−4','0'],ans:0},task:'Fill the three gaps so that A is symmetric',
 show:()=>demo(4,[...Array(4)].map(()=>()=>bump(0,1)).concat([()=>bump(1,-1)],[...Array(5)].map(()=>()=>bump(2,1)))),
 go:()=>{wipe();speak('Three entries below the diagonal are 0. Change them until Aᵀ = A.');pads();Z.test=gate(4,()=>HOLES.every(([i,j],h)=>Z.vals[h]===SY[j][i]),'Aᵀ = A: the matrix is symmetric.')}},
{h:'Challenge',p:'',go:()=>{wipe();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.test()});
const QS=[['A is a 4 × 2 matrix. What size is Aᵀ?',[['2 × 4','ok'],['4 × 2','same'],['4 × 4','square']]],
 ['In A, a₃₁ = 6. Which entry of Aᵀ equals 6?',[['(Aᵀ)₁₃','ok'],['(Aᵀ)₃₁','nosw'],['(Aᵀ)₃₃','diag']]],
 ['Which product equals (AB)ᵀ?',[['BᵀAᵀ','ok'],['AᵀBᵀ','order'],['BA','notr']]],
 ['What is (Aᵀ)ᵀ?',[['A','ok'],['Aᵀ','once'],['The identity I','ident']]],
 ['A square matrix is symmetric when...',[['Aᵀ = A','ok'],['Aᵀ = −A','skew'],['all its entries are equal','alleq']]],
 ['You transpose a 3 × 1 column vector. What do you get?',[['A 1 × 3 row vector','ok'],['A 3 × 1 column vector','same'],['A 3 × 3 matrix','square']]],
 ['Which of these is symmetric for every matrix A?',[['AAᵀ','ok'],['A + I','plusI'],['2A','scal']]]];
function why(t){let m='Rows become columns: the entry in row i, column j moves to row j, column i.';
 if(t==='same')m='Transposing swaps the number of rows and columns, so an m × n matrix becomes n × m.';
 if(t==='square')m='The transpose has the same entries, just rearranged. No entries are added, so it cannot grow to a square.';
 if(t==='nosw')m='That is the same position. The transpose swaps the indices: a₃₁ moves to row 1, column 3.';
 if(t==='diag')m='Only entries on the leading diagonal stay put. a₃₁ is off the diagonal, so it moves to (1, 3).';
 if(t==='order')m='Check the sizes: AᵀBᵀ often does not even exist. Transposing a product reverses the order, like taking off socks and shoes.';
 if(t==='notr')m='BA has no transposes in it. (AB)ᵀ = BᵀAᵀ, with each factor transposed and the order reversed.';
 if(t==='once')m='Transposing twice swaps rows and columns back again, so (Aᵀ)ᵀ = A.';
 if(t==='ident')m='Transposing only moves entries around. Doing it twice puts every entry back, giving A, not I.';
 if(t==='skew')m='Aᵀ = −A is called skew-symmetric. Symmetric means the transpose equals A itself.';
 if(t==='alleq')m='Equal entries are enough, but not needed. Symmetric only asks that aᵢⱼ = aⱼᵢ across the diagonal.';
 if(t==='plusI')m='Adding I only changes the diagonal, so A + I is symmetric only when A already is.';
 if(t==='scal')m='2A is symmetric only if A is. But (AAᵀ)ᵀ = (Aᵀ)ᵀAᵀ = AAᵀ for every A.';
 return m}
function nextQ(){qk++;const[q,ops]=QS[qk%QS.length],sh=qk%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>score(t)});speak('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),win=t==='ok';
 if(win){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(win?`✓ Right! ${good} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Matrix controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down:tap});pads()}});
A.start()})})();
