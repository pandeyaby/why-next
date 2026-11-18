/* Flagship: patterns in the times tables (ages 8–9; CCSS 3.OA.D.9 identify arithmetic patterns in the multiplication
   table and explain them using properties of operations; NC England Year 3–4 multiplication facts). On a 10 × 10
   multiplication square: sort products as even or odd and watch the odd cells appear only where both factors are odd,
   fold the square along its diagonal to find turnaround facts, build a row from two smaller rows, fill the 9s with the
   digit pattern, and test claims about the 3s, 4s, 5s and 10s against the square. Every tap also has a button. */
(()=>{
const SORT=[[3,5],[4,7],[6,9],[7,7],[8,3],[5,9]];
const FOLD=[[3,8],[2,9],[4,6],[7,5]];
const ROWS=[[6,7],[7,4],[9,6]];
const NINE=[4,5,6,7,8,9];
const CLAIM=[['Every answer in the 5s ends in 0 or 5.',true,[5],'5, 10, 15, 20, 25: each answer is 5 more, so the ones digit goes 5, 0, 5, 0.'],
 ['Every answer in the 4s is even.',true,[4],'4 is 2 × 2, so every 4s answer is a double: 4, 8, 12, 16, all even.'],
 ['Every answer in the 3s is odd.',false,[3],'3 × 2 = 6 is even. The 3s go odd, even, odd, even: 3, 6, 9, 12.'],
 ['The 10s answers are double the 5s answers.',true,[5,10],'10 = 5 + 5, so 10 × 7 = 35 + 35 = 70. Each 10s answer is two 5s answers.'],
 ['Odd × odd can give an even answer.',false,[1,3,5,7,9],'Odd × odd is always odd: 3 × 5 = 15, 7 × 9 = 63. An even answer needs an even factor.']];
const odd=n=>n%2===1;
VIS.reg('flagttpat',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',BLUE='#1d4ed8',PALE='#e0f2fe',HOT='#dcfce7',EVEN='#dbeafe',ODD='#ffedd5',PICK='#fde68a';
const MODE=['sort','fold','rows','nine','claim','chal'],mode=()=>MODE[A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.12)),fnt=(n,w)=>`${w||700} ${fs(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function write(s,x,y,n,col,al,w){Z.font=fnt(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function split(s,max,n){Z.font=fnt(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function tile(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?10:rad);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function strip(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*(A.narrow?.09:.12)};tile(r,done?HOT:PALE,done?OK:BLUE,2);const L=split(s,r.w-16,13);L.forEach((l,i)=>write(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*fs(16),13,done?OK:INK))}
function foot(){if(!S.msg)return;const L=split((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=fs(13)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>write(l,A.W/2,y+5+lh*(i+.5),13))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const slip=s=>{S.bad=true;S.msg=s;A.sound.miss();voice(s);A.redraw()};
const yes=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* ---- the multiplication square ---- */
function G(){const top=A.H*(A.narrow?.12:.16),avail=A.narrow?A.H*.56:A.H*.76,cw=A.narrow?(A.W-20)/10.6:A.W*.5/10.6,c0=Math.min(cw,avail/10.6),hd=c0*.6,w=hd+10*c0,x=A.narrow?(A.W-w)/2:14;return{x,y:top,c:c0,hd,w,h:w}}
const cellR=(r,col)=>{const g=G();return{x:g.x+g.hd+(col-1)*g.c,y:g.y+g.hd+(r-1)*g.c,w:g.c,h:g.c}};
const cellAt=p=>{const g=G(),col=Math.floor((p.x-g.x-g.hd)/g.c)+1,r=Math.floor((p.y-g.y-g.hd)/g.c)+1;return r>=1&&r<=10&&col>=1&&col<=10?[r,col]:null};
const rowAt=p=>{const g=G();if(p.x<g.x||p.x>g.x+g.hd+2)return null;const r=Math.floor((p.y-g.y-g.hd)/g.c)+1;return r>=1&&r<=10?r:null};
function square(){const g=G(),m=mode();write('×',g.x+g.hd/2,g.y+g.hd/2,11,SOFT);
 for(let i=1;i<=10;i++){const a=cellR(1,i),b=cellR(i,1),rowOn=S.rowsLit&&S.rowsLit.includes(i);write(i,a.x+a.w/2,g.y+g.hd/2,10,SOFT,'center',800);
  if(rowOn)tile({x:g.x,y:b.y+1,w:g.hd-2,h:b.h-2},PICK,GOLD,1.5,4);write(i,g.x+g.hd/2,b.y+b.h/2,10,rowOn?INK:SOFT,'center',800)}
 for(let r=1;r<=10;r++)for(let col=1;col<=10;col++){const q=cellR(r,col),v=r*col,key=r+','+col;let fill=CARD;
  if(S.par==='all'||(S.par&&S.par.has(key)))fill=odd(v)?ODD:EVEN;
  if(S.rowsLit&&S.rowsLit.includes(r))fill=PICK;
  if(S.lit&&S.lit[key])fill=S.lit[key];
  Z.fillStyle=fill;Z.fillRect(q.x+.5,q.y+.5,q.w-1,q.h-1);
  const hide=m==='nine'&&r===9&&NINE.includes(col)&&NINE.indexOf(col)>=S.i;
  write(hide?'?':v,q.x+q.w/2,q.y+q.h/2+.5,g.c>26?11:9.5,hide?BLUE:INK,'center',hide?800:600)}
 Z.strokeStyle=RIM;Z.lineWidth=1;for(let i=0;i<=10;i++){const x=g.x+g.hd+i*g.c,y=g.y+g.hd+i*g.c;Z.beginPath();Z.moveTo(x,g.y+g.hd);Z.lineTo(x,g.y+g.hd+10*g.c);Z.moveTo(g.x+g.hd,y);Z.lineTo(g.x+g.hd+10*g.c,y);Z.stroke()}
 if(S.ring){const q=cellR(...S.ring);Z.strokeStyle=GOLD;Z.lineWidth=3;Z.strokeRect(q.x+1.5,q.y+1.5,q.w-3,q.h-3)}
 if(S.cross){const q=cellR(...S.cross);Z.strokeStyle=NO;Z.lineWidth=3;Z.strokeRect(q.x+1.5,q.y+1.5,q.w-3,q.h-3)}
 if(m==='fold'||(m==='chal')){Z.strokeStyle=BLUE;Z.setLineDash([5,4]);Z.lineWidth=2;Z.beginPath();Z.moveTo(g.x+g.hd,g.y+g.hd);Z.lineTo(g.x+g.hd+10*g.c,g.y+g.hd+10*g.c);Z.stroke();Z.setLineDash([])}}
function side(){const g=G();if(A.narrow){const y=g.y+g.h+8;return{x:10,y,w:A.W-20,h:Math.max(60,A.H-y-fs(84))}}const x=g.x+g.w+16;return{x,y:A.H*.16,w:A.W-x-10,h:A.H*.62}}
function twoBoxes(lab){const P=side(),g=8,w=(P.w-g)/2,h=Math.min(P.h*.6,fs(56));return lab.map((t,j)=>({x:P.x+j*(w+g),y:P.y+P.h-h,w,h,t}))}
function drawBoxes(lab,miss){twoBoxes(lab).forEach((b,j)=>{tile(b,CARD,miss===j?NO:BLUE,miss===j?3.5:2);write(b.t,b.x+b.w/2,b.y+b.h/2,15,INK,'center',800)})}
function sideText(s,n,col){const P=side(),L=split(s,P.w-8,n||14);L.forEach((l,i)=>write(l,P.x+P.w/2,P.y+fs(12)+i*fs((n||14)+5),n||14,col||INK,'center',700))}
/* step 1: even or odd */
function sortPick(j){const f=SORT[S.i];if(!f)return;const [a,b]=f,p=a*b,isOdd=odd(p)?1:0,key=a+','+b;S.ring=[a,b];
 if(j===isOdd){S.par.add(key);S.i++;S.miss=null;S.ring=SORT[S.i]||null;yes(isOdd?`Yes: ${a} × ${b} = ${p}, odd. Both factors are odd.`:`Yes: ${a} × ${b} = ${p}, even. ${odd(a)?b:a} is even, so the answer is even.`);if(S.i>=SORT.length)S.par='all';return update()}
 S.miss=j;if(isOdd)return slip(`${a} and ${b} are both odd, and odd × odd is always odd: ${a} × ${b} = ${p}.`);
 const e=odd(a)?b:a,o=e===a?b:a;slip(`${e} is even. ${o} lots of an even number is always even: ${a} × ${b} = ${p}.`)}
/* step 2: fold on the diagonal */
function foldOpts(){const f=FOLD[S.i];if(!f)return[];const [r,col]=f,v=r*col,o=[[col,r]];let same=null;for(let a=1;a<=10&&!same;a++)for(let b=1;b<=10;b++)if(a*b===v&&!(a===r&&b===col)&&!(a===col&&b===r)){same=[a,b];break}
 o.push(same||[col,r===10?r-1:r+1]);o.push([r,col===10?col-1:col+1]);const k=S.i%3;return o.slice(k).concat(o.slice(0,k))}
function foldPick(cell){const f=FOLD[S.i];if(!f)return;const [r,col]=f,[a,b]=cell,v=r*col;S.cross=null;
 if(a===col&&b===r){S.lit[a+','+b]=HOT;S.lit[r+','+col]=HOT;S.i++;yes(`Yes: ${r} × ${col} and ${col} × ${r} both make ${v}. They sit opposite each other across the fold.`);const nx=FOLD[S.i];S.ring=nx?[nx[0],nx[1]]:null;return update()}
 if(a===r&&b===col)return slip(`That is the cell you started on. Its mirror swaps the row and the column: row ${col}, column ${r}.`);
 S.cross=[a,b];if(a*b===v)return slip(`That ${v} is ${a} × ${b}, a different fact with the same answer. The mirror of ${r} × ${col} is ${col} × ${r}.`);
 slip(`That cell is ${a} × ${b} = ${a*b}. Fold along the dashed line: row ${r}, column ${col} lands on row ${col}, column ${r}.`)}
/* step 3: a row from two rows */
function rowPick(n){const R=ROWS[S.i];if(!R)return;const [t,col]=R;
 if(S.pick==null){if(n>=t)return slip(`Row ${n} is ${n>t?'more than':'all of'} row ${t} already. Pick a smaller row first.`);S.pick=n;S.rowsLit=[n];S.msg='';return update()}
 const a=S.pick,b=n;S.rowsLit=[a,b];
 if(a+b===t){S.i++;S.pick=null;S.lit[t+','+col]=HOT;yes(`Yes: row ${a} + row ${b} = row ${t}. ${a} × ${col} + ${b} × ${col} = ${a*col} + ${b*col} = ${t*col}, and ${t} × ${col} = ${t*col}.`);S.rowsLit=null;return update()}
 S.pick=null;slip(`Row ${a} + row ${b} makes row ${a+b}, not row ${t}: ${a} × ${col} + ${b} × ${col} = ${(a+b)*col}, but ${t} × ${col} = ${t*col}. Pick two rows that add to ${t}.`);S.rowsLit=null;update()}
/* step 4: the 9s */
function nineOpts(){const k=NINE[S.i];if(k==null)return[];const o=[9*k,9*k+1,10*k],r=S.i%3;return o.slice(r).concat(o.slice(0,r))}
const dsum=n=>String(n).split('').reduce((s,d)=>s+ +d,0);
function ninePick(v){const k=NINE[S.i];if(k==null)return;S.ring=[9,k];
 if(v===9*k){S.i++;yes(`Yes: 9 × ${k} = ${v}. ${Math.floor(v/10)} + ${v%10} = 9, and the tens digit is one less than ${k}.`);S.ring=NINE[S.i]!=null?[9,NINE[S.i]]:null;return update()}
 if(v===10*k)return slip(`${v} is 10 × ${k}. 9 × ${k} is one ${k} less: ${v} − ${k} = ${9*k}.`);
 slip(`The digits of ${v} add to ${dsum(v)}, not 9. Every 9s answer up to 9 × 10 has digits that add to 9.`)}
/* step 5: test a claim */
function claimPick(j){const C=CLAIM[S.i];if(!C)return;const said=j===0;
 if(said===C[1]){S.i++;S.miss=null;yes((C[1]?'True. ':'False. ')+C[3]);S.rowsLit=CLAIM[S.i]?CLAIM[S.i][2]:null;return update()}
 S.miss=j;slip(C[1]?`Look again at row ${C[2].join(' and row ')}: it is true. ${C[3]}`:`Look for one answer that breaks it. ${C[3]}`)}
/* ---- pointer ---- */
function down(p){const m=mode();
 if(m==='sort'){if(!SORT[S.i])return false;const j=twoBoxes(['Even','Odd']).findIndex(b=>inside(p,b));if(j>=0){sortPick(j);return true}const q=cellAt(p);if(q){const f=SORT[S.i];if(q[0]===f[0]&&q[1]===f[1])return true;slip(`Find ${f[0]} × ${f[1]}: row ${f[0]}, column ${f[1]}. Then tap Even or Odd.`);return true}return false}
 if(m==='fold'){if(!FOLD[S.i])return false;const q=cellAt(p);if(q){foldPick(q);return true}return false}
 if(m==='rows'){if(!ROWS[S.i])return false;const r=rowAt(p)||(cellAt(p)||[])[0];if(r){rowPick(r);return true}return false}
 if(m==='nine'){if(NINE[S.i]==null)return false;const P=side(),o=nineOpts(),j=nineBoxes().findIndex(b=>inside(p,b));if(j>=0){ninePick(o[j]);return true}return false}
 if(m==='claim'){if(!CLAIM[S.i])return false;const j=twoBoxes(['True','False']).findIndex(b=>inside(p,b));if(j>=0){claimPick(j);return true}return false}return false}
function nineBoxes(){const P=side(),g=8,w=(P.w-2*g)/3,h=Math.min(P.h*.55,fs(50));return[0,1,2].map(j=>({x:P.x+j*(w+g),y:P.y+P.h-h,w,h}))}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();square();
 if(m==='sort'){const f=SORT[S.i];strip(f?`Is ${f[0]} × ${f[1]} even or odd? Tap a box.`:'Odd answers only where both factors are odd.',!f);if(f){sideText(`${f[0]} × ${f[1]}: is either factor even?`,15);drawBoxes(['Even','Odd'],S.miss)}else sideText('Blue: even. Orange: odd. Odd × odd is the only way to get odd.',13,OK)}
 if(m==='fold'){const f=FOLD[S.i];strip(f?`Fold on the dashed line. Tap the mirror of ${f[0]} × ${f[1]}.`:'Each fact matches its turnaround across the fold.',!f);sideText(f?`${f[0]} × ${f[1]} = ${f[0]*f[1]}. Row ${f[0]}, column ${f[1]}. Where does it land?`:'a × b = b × a',f?14:18,f?INK:OK)}
 if(m==='rows'){const R=ROWS[S.i];strip(R?`Make row ${R[0]} from two smaller rows. Tap two row numbers.`:'Two rows that add up make a new row.',!R);
  if(R)sideText(S.pick==null?`Row ${R[0]} = row ? + row ?`:`Row ${R[0]} = row ${S.pick} + row ?`,17);else sideText('6 × 7 = 2 × 7 + 4 × 7',17,OK)}
 if(m==='nine'){const k=NINE[S.i];strip(k!=null?`What is 9 × ${k}? The digits of a 9s answer add to 9.`:'9s: the tens go up, the ones go down.',k==null);
  if(k!=null){sideText(`9 × ${k} = ?`,18);nineBoxes().forEach((b,j)=>{tile(b,CARD,BLUE,2);write(nineOpts()[j],b.x+b.w/2,b.y+b.h/2,16,INK,'center',800)})}else sideText('09, 18, 27, 36, 45, 54, 63, 72, 81, 90',13,OK)}
 if(m==='claim'){const C=CLAIM[S.i];strip(C?'True or false? Check the gold rows on the square.':'A claim is true only if no answer breaks it.',!C);if(C){sideText(C[0],14);drawBoxes(['True','False'],S.miss)}}
 if(m==='chal'){strip('Even and odd, turnarounds, rows that add, and the 9s.');}
 foot();A.fx.draw(Z)}
function update(){const m=mode();let s='Challenge.';
 if(m==='sort'){const f=SORT[S.i];s=f?`${f[0]} × ${f[1]} = ${f[0]*f[1]}. Even or odd? Sorted ${S.i} of ${SORT.length}.`:'All six sorted. Odd answers appear only where row and column are both odd.'}
 if(m==='fold'){const f=FOLD[S.i];s=f?`Find the mirror of ${f[0]} × ${f[1]} across the diagonal. Options: ${foldOpts().map(([a,b])=>`${a} × ${b}`).join(', ')}.`:'All four mirror pairs found.'}
 if(m==='rows'){const R=ROWS[S.i];s=R?`Build row ${R[0]} from two rows. ${S.pick==null?'Pick the first row.':'First row: '+S.pick+'. Pick the second row.'}`:'All three rows built.'}
 if(m==='nine'){const k=NINE[S.i];s=k!=null?`9 × ${k} = ? Options ${nineOpts().join(', ')}.`:'The 9s are filled.'}
 if(m==='claim'){const C=CLAIM[S.i];s=C?`Claim: ${C[0]} True or false?`:'All five claims tested.'}
 voice((S.msg?S.msg+' ':'')+s);keys();S.then()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='sort'&&SORT[S.i])['Even','Odd'].forEach((t,j)=>b(t,()=>sortPick(j),`${SORT[S.i][0]} times ${SORT[S.i][1]} is ${t.toLowerCase()}`));
 if(m==='fold'&&FOLD[S.i])foldOpts().forEach(q=>b(`${q[0]} × ${q[1]}`,()=>foldPick(q),`Row ${q[0]}, column ${q[1]}`));
 if(m==='rows'&&ROWS[S.i])for(let r=1;r<ROWS[S.i][0];r++)b(`Row ${r}`,()=>rowPick(r),`Pick row ${r}`);
 if(m==='nine'&&NINE[S.i]!=null)nineOpts().forEach(v=>b(String(v),()=>ninePick(v),`9 times ${NINE[S.i]} is ${v}`));
 if(m==='claim'&&CLAIM[S.i])['True','False'].forEach((t,j)=>b(t,()=>claimPick(j),`The claim is ${t.toLowerCase()}`));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,par:new Set(),lit:{},ring:null,cross:null,rowsLit:null,pick:null,miss:null,msg:'',bad:false})};
const steps=[
{h:'Even or odd?',p:'Each answer on the square is a row number times a column number. Sort the answers as even or odd, and watch the colours.',
predict:{q:'Is 7 × 6 even or odd?',opts:['Even','Odd','You have to work it out to know'],ans:0},
task:'Sort 6 answers',show:()=>{steps[0].go();play(SORT.map(([a,b])=>()=>sortPick(odd(a*b)?1:0)),420)},go:()=>{fresh();S.ring=SORT[0];update();S.then=finish(0,()=>S.i>=SORT.length,'An even factor makes an even answer.')}},
{h:'Fold the square',p:'Imagine folding the square along the dashed line from 1 × 1 to 10 × 10. Tap the cell that each fact lands on.',
predict:{q:'When you fold the square on that line, what happens?',opts:['Equal answers land on each other','Bigger answers land on smaller ones','Nothing matches'],ans:0},
task:'Find 4 mirror pairs',show:()=>{steps[1].go();play(FOLD.map(([r,col])=>()=>foldPick([col,r])),450)},go:()=>{fresh();S.ring=FOLD[0];update();S.then=finish(1,()=>S.i>=FOLD.length,'Swap the factors, same answer.')}},
{h:'Rows that add',p:'Row 2 and row 4 added together make row 6, because 2 lots and 4 lots make 6 lots. Tap two row numbers to build each row.',
task:'Build 3 rows',show:()=>{steps[2].go();const acts=[];ROWS.forEach(([t])=>{const a=Math.floor(t/2);acts.push(()=>rowPick(a),()=>rowPick(t-a))});play(acts,450)},go:()=>{fresh();update();S.then=finish(2,()=>S.i>=ROWS.length,'Split a row into two easier rows.')}},
{h:'The 9s pattern',p:'9 × 3 = 27 and 2 + 7 = 9. Each 9s answer is 10 lots take away 1 lot. Fill in the hidden 9s.',
predict:{q:'Which of these is in the 9 times table?',opts:['63','56','64'],ans:0},
task:'Fill 6 answers',show:()=>{steps[3].go();play(NINE.map(k=>()=>ninePick(9*k)),400)},go:()=>{fresh();S.ring=[9,NINE[0]];update();S.then=finish(3,()=>S.i>=NINE.length,'The digits always add to 9.')}},
{h:'True or false?',p:'People say things about the times tables. Test each claim against the square: one answer that breaks it makes it false.',
task:'Test 5 claims',show:()=>{steps[4].go();play(CLAIM.map(C=>()=>claimPick(C[1]?0:1)),450)},go:()=>{fresh();S.rowsLit=CLAIM[0][2];update();S.then=finish(4,()=>S.i>=CLAIM.length,'Check the whole row before you agree.')}},
{h:'Challenge',p:'',go:()=>{fresh();S.par='all';ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Is 7 × 9 even or odd?','Odd',[['Even','oddodd'],['It depends','depends']]],
['Which fact has the same answer as 6 × 8 because of the fold?','8 × 6',[['6 × 9','neigh'],['9 × 6','swapone']]],
['Row 7 = row 3 + which row?','Row 4',[['Row 10','addrow'],['Row 21','multrow']]],
['Which number is in the 9 times table?','72',[['74','digsum'],['80','tenk']]],
['Which answer must be even?','6 × 7',[['5 × 9','oddodd'],['3 × 7','oddodd']]],
['9 × 6 = 54. What is 9 × 7?','63',[['56','other'],['64','plusten']]]];
function why(tag){let m='Look at the square and check one row.';
 if(tag==='oddodd')m='Both factors are odd, and odd × odd is always odd. Only an even factor gives an even answer.';
 if(tag==='depends')m='It does not depend: 7 and 9 are both odd, so 7 × 9 = 63 is odd every time.';
 if(tag==='neigh')m='6 × 9 is the next cell along the row: 54, not 48. The fold swaps the factors: 8 × 6.';
 if(tag==='swapone')m='9 × 6 changes the 8 into a 9. Swap the order without changing the numbers: 8 × 6 = 48.';
 if(tag==='addrow')m='Row 3 + row 10 makes row 13. You need 3 + 4 = 7, so row 4.';
 if(tag==='multrow')m='Rows add, they do not multiply. 3 lots + 4 lots = 7 lots, so row 4.';
 if(tag==='digsum')m='7 + 4 = 11, not 9, so 74 is not in the 9s. 72 is 9 × 8, and 7 + 2 = 9.';
 if(tag==='tenk')m='80 is 10 × 8. 9 × 8 is one 8 less: 80 − 8 = 72.';
 if(tag==='other')m='56 is 7 × 8. One more 9 than 54 is 54 + 9 = 63.';
 if(tag==='plusten')m='64 adds 10. Each step in the 9s adds 9, so 54 + 9 = 63.';
 return m}
function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});voice('Challenge: '+q);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.7,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;Z=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Times table square buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
