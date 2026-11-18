/* Flagship: factorising ax² + bx + c, a ≠ 1 (ages 15–16; GCSE Maths higher A4; CCSS HSA-SSE.A.2). Product a × c and
   sum b, split the middle in a 2 × 2 grid, bracket placement, negative a × c, common factor first, roots on the graph. */
(()=>{
const T={ink:'#101828',dim:'#475467',rim:'#1d2939',bg:'#fff',pass:'#05603a',passBg:'#d1fadf',fail:'#b42318',hint:'#eef4ff',xx:'#1849a9',x1:'#6927da',k1:'#b54708',cell:'#f2f4f7',axis:'#344054',sel:'#ebe9fe'};
const fmt=(n,v)=>{if(n===0)return'';const s=n<0?'− ':'+ ',a=Math.abs(n);return s+(v?(a===1?'':a)+v:a)};
const term=(n,v)=>(n<0?'−':'')+(Math.abs(n)===1&&v?'':Math.abs(n))+(v||'');
const PAIRS={0:{a:2,b:7,c:3,list:[[1,6],[2,3],[-1,-6],[-2,-3]]},3:{a:2,b:-1,c:-6,list:[[1,-12],[-1,12],[2,-6],[-2,6],[3,-4],[-3,4]]}};
const CHIPS=[1,6,2,3];
VIS.reg('flagacfac',c=>{let A,X,ui,qz,qi=-1,tok=0,run=0;const M={after:()=>{}};
const u=v=>Math.round(v*(A.narrow?1:1.1));
const put=(s,x,y,sz,col,al)=>{X.font=`700 ${u(sz)}px system-ui,sans-serif`;X.fillStyle=col||T.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-12)};
const flow=(s,w,sz)=>{X.font=`700 ${u(sz)}px system-ui,sans-serif`;const L=[];let line='';for(const wd of String(s).split(' ')){const t=line?line+' '+wd:wd;if(line&&X.measureText(t).width>w){L.push(line);line=wd}else line=t}L.push(line);return L};
const tile=(r,f,s,lw)=>{A.paint.rrect(r.x,r.y,r.w,r.h,7);X.fillStyle=f;X.fill();if(s){X.strokeStyle=s;X.lineWidth=lw||2;X.stroke()}};
function head(s,ok){const L=flow(s,A.W-34,13),lh=u(13)+4,h=Math.max(u(40),L.length*lh+12);tile({x:10,y:8,w:A.W-20,h},ok?T.passBg:T.hint,ok?T.pass:T.rim);L.forEach((l,i)=>put(l,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,ok?T.pass:T.ink));return 8+h}
const msgH=()=>M.msg?flow('✓ '+M.msg,A.W-40,12).length*(u(12)+5)+22:u(10);
function foot(){if(!M.msg)return;const L=flow((M.bad?'✗ ':'✓ ')+M.msg,A.W-40,12),lh=u(12)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},T.bg,M.bad?T.fail:T.pass,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),12,M.bad?T.fail:T.ink))}
const aria=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const no=s=>{M.bad=true;M.msg=s;A.sound.miss();sync()};
const ya=s=>{M.bad=false;M.msg=s;A.sound.pop();sync()};
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const Q=()=>PAIRS[A.step];
/* ---- steps 0 and 3: product a×c, sum b ---- */
function tryPair(i){if(M.ok)return;const q=Q(),[m,n]=q.list[i],ac=q.a*q.c;M.pick=i;A.sound.tick();
 if(m+n!==q.b)return no(`${m} × ${n} = ${m*n}, good, but ${m} + ${n} = ${m+n}, not ${q.b}.${m+n===-q.b?' Right size, wrong signs: swap them.':''}`);
 M.ok=true;
 ya(q.b===7?'2x² + 7x + 3 = 2x² + x + 6x + 3 = x(2x + 1) + 3(2x + 1) = (2x + 1)(x + 3).':`2x² − x − 6 = 2x² + 3x − 4x − 6 = x(2x + 3) − 2(2x + 3) = (2x + 3)(x − 2). The product ${ac} is negative, so the signs differ.`)}
function drawPairs(){const q=Q(),ac=q.a*q.c,top=head(M.ok?'Two numbers: product a × c, sum b. They split the middle term.':`${term(q.a,'x²')} ${fmt(q.b,'x')} ${fmt(q.c)}. Tap the pair that multiplies to a × c = ${ac} and adds to b = ${q.b}.`,M.ok);
 const n=q.list.length,cols=2,w=(A.W-30)/cols,h=u(46);M.boxes=[];
 q.list.forEach(([m,k],i)=>{const r={x:10+(i%cols)*(w+10),y:top+u(12)+Math.floor(i/cols)*(h+u(8)),w,h},chosen=M.pick===i,good=chosen&&M.ok;
  tile(r,good?T.passBg:chosen?'#fee4e2':T.bg,good?T.pass:chosen?T.fail:T.rim,chosen?3:1.5);put(`${m} and ${k}`,r.x+r.w/2,r.y+u(15),14,T.ink);
  put(chosen||M.ok?`product ${m*k}, sum ${m+k}`:'tap',r.x+r.w/2,r.y+r.h-u(12),11,chosen?(good?T.pass:T.fail):T.dim);M.boxes.push(r)})}
/* ---- step 1: split 7x into the grid ---- */
function chip(i){if(M.ok||M.used.includes(i))return;M.hold=i;A.sound.tick();M.bad=false;M.msg=`${term(CHIPS[i],'x')} picked. Tap an empty cell.`;sync()}
function cellTap(j){if(M.ok)return;if(M.hold==null)return no('Pick an x-term.');if(M.cell[j]!=null)M.used=M.used.filter(v=>v!==M.cell[j]);M.cell[j]=M.hold;M.used.push(M.hold);M.hold=null;A.sound.tick();
 if(M.cell.some(v=>v==null)){M.bad=false;M.msg='One more cell.';return sync()}
 const s=CHIPS[M.cell[0]]+CHIPS[M.cell[1]],pr=CHIPS[M.cell[0]]*CHIPS[M.cell[1]];
 if(s!==7){const msg=pr===6?`Those multiply to 6x², like 2x² × 3, but ${s}x is not 7x. The two terms must add back to the middle term.`:`${term(CHIPS[M.cell[0]],'x')} + ${term(CHIPS[M.cell[1]],'x')} = ${s}x, not 7x, and their product is not 2x² × 3 = 6x².`;M.cell=[null,null];M.used=[];return no(msg)}
 M.ok=true;ya(M.cell[0]===0?'Rows share x and 3; columns share 2x and 1: (x + 3)(2x + 1).':'Rows share 2x and 1; columns share x and 3: (2x + 1)(x + 3). Either order works.')}
function drawGrid(){const top=head(M.ok?'Each row and column has a common factor: the edges are the brackets.':'Split 7x into two x-terms: tap a chip, then an empty cell. The grid must still make 2x² + 7x + 3.',M.ok);
 const g=Math.min(u(92),(A.W-120)/2),gx=A.W/2-g+u(14),gy=top+u(40);M.cells=[];
 const cellTxt=[['2x²',T.xx],[M.cell[0]!=null?term(CHIPS[M.cell[0]],'x'):'?',T.x1],[M.cell[1]!=null?term(CHIPS[M.cell[1]],'x'):'?',T.x1],['3',T.k1]];
 for(let r=0;r<2;r++)for(let k=0;k<2;k++){const i=r*2+k,rc={x:gx+k*g,y:gy+r*g,w:g,h:g};tile(rc,i===1||i===2?(M.hold!=null&&cellTxt[i][0]==='?'?T.sel:T.cell):T.cell,T.rim,2);put(cellTxt[i][0],rc.x+g/2,rc.y+g/2,18,cellTxt[i][1]);if(i===1)M.cells[0]=rc;if(i===2)M.cells[1]=rc}
 if(M.ok){const tr=M.cell[0]===0;const rows=tr?['x','3']:['2x','1'],cols=tr?['2x','1']:['x','3'];rows.forEach((t,r)=>put(t,gx-u(18),gy+r*g+g/2,16,T.pass));cols.forEach((t,k)=>put(t,gx+k*g+g/2,gy-u(14),16,T.pass))}
 const cy=gy+2*g+u(16),cw=(A.W-50)/4;M.chips=[];CHIPS.forEach((v,i)=>{const r={x:10+i*(cw+10),y:cy,w:cw,h:u(38)};if(M.used.includes(i)){M.chips.push(null);return}tile(r,M.hold===i?T.sel:T.bg,M.hold===i?T.x1:T.rim,M.hold===i?3:1.5);put(term(v,'x'),r.x+r.w/2,r.y+r.h/2,15,T.x1);M.chips.push(r)})}
/* ---- step 2: bracket placement for 3x² + 10x + 8 ---- */
const PS=[1,2,4,8];
function cyc(){if(M.ok)return;M.pi=(M.pi+1)%4;A.sound.tick();M.bad=false;M.msg='';sync()}
function expand(){if(M.ok)return;const p=PS[M.pi],q=8/p,mid=3*q+p;
 if(mid!==10)return no(`(3x + ${p})(x + ${q}) = 3x² + ${3*q}x + ${p}x + 8 = 3x² + ${mid}x + 8. The 3x multiplies the ${q}, so ${q} counts three times.`);
 M.ok=true;ya('(3x + 4)(x + 2) = 3x² + 6x + 4x + 8 = 3x² + 10x + 8. Done.')}
function drawTry(){const p=PS[M.pi],q=8/p,top=head(M.ok?'With a ≠ 1, where a number sits matters: the 3x multiplies only the other bracket\'s number.':'Factorise 3x² + 10x + 8 = (3x + ?)(x + ?). Tap the brackets to try another pair, then Expand.',M.ok);
 const y=top+u(52);M.brk={x:20,y:y-u(28),w:A.W-40,h:u(56)};tile(M.brk,M.ok?T.passBg:T.bg,M.ok?T.pass:T.rim,2);
 put(`(3x + ${p})(x + ${q})`,A.W/2,y,22,M.ok?T.pass:T.ink);
 const y2=y+u(58);put('outer: 3x × '+q+' = '+3*q+'x',A.W/2,y2,13,T.x1);put('inner: '+p+' × x = '+p+'x',A.W/2,y2+u(22),13,T.x1);put(`middle: ${3*q+p}x ${3*q+p===10?'✓':'(need 10x)'}`,A.W/2,y2+u(48),15,3*q+p===10?T.pass:T.fail);
 put('8 = 1×8 = 2×4 = 4×2 = 8×1',A.W/2,y2+u(76),11,T.dim)}
/* ---- step 4: common factor first ---- */
const DIV=[2,3,5,6];
function divide(d){if(M.ok||M.hcf)return;A.sound.tick();if(d!==3)return no(d===2||d===6?`15 is odd, so ${d} does not divide 6, 15 and 6 all.`:'5 divides 15 but not 6.');M.hcf=3;M.bad=false;M.msg='6x² + 15x + 6 = 3(2x² + 5x + 2). Now pick the full answer.';sync()}
const ENDS=[['3(2x + 1)(x + 2)',0],['(2x + 1)(x + 2)','lost'],['(6x + 3)(x + 2)','part']];
function finalPick(i){if(M.ok)return;if(!M.hcf)return no('Take out the common factor first.');const t=ENDS[i][1];
 if(t==='lost')return no('That is 2x² + 5x + 2, a third of the original. The 3 you took out must stay in front.');
 if(t==='part')return no('(6x + 3)(x + 2) expands correctly, but 6x + 3 still has a factor 3. Fully factorised means none is left.');
 M.ok=true;ya('3(2x + 1)(x + 2) expands to 3(2x² + 5x + 2) = 6x² + 15x + 6, with nothing left to take out.')}
function drawHcf(){const top=head(M.ok?'Take out a common factor first, and keep it in front.':'Factorise 6x² + 15x + 6 fully. Tap a number that divides 6, 15 and 6, then the full answer.',M.ok);
 put(M.hcf?'3(2x² + 5x + 2)':'6x² + 15x + 6',A.W/2,top+u(30),20,M.hcf?T.pass:T.ink);const w=(A.W-50)/4;M.divs=DIV.map((d,i)=>{const r={x:10+i*(w+10),y:top+u(56),w,h:u(38)};tile(r,M.hcf===d?T.passBg:T.bg,M.hcf===d?T.pass:T.rim,1.5);put('÷ '+d,r.x+w/2,r.y+r.h/2,15,T.ink);return r});
 M.ends=ENDS.map(([s],i)=>{const r={x:20,y:top+u(108)+i*u(46),w:A.W-40,h:u(38)};tile(r,M.ok&&i===0?T.passBg:T.bg,M.ok&&i===0?T.pass:T.rim,1.5);put(s,A.W/2,r.y+r.h/2,15,M.hcf?T.ink:T.dim);return r})}
/* ---- step 5: roots on the graph ---- */
const f=x=>2*x*x+7*x+3,X0=-4,X1=1,Y0=-4,Y1=8;
const plotBox=()=>{const top=M.top||70;return{x:u(28),y:top+u(10),w:A.W-u(44),h:A.H-top-u(20)-msgH()}};
const px=x=>{const b=plotBox();return b.x+(x-X0)/(X1-X0)*b.w},py=y=>{const b=plotBox();return b.y+(Y1-y)/(Y1-Y0)*b.h};
function slide(x){if(M.ok)return;M.x=Math.max(X0,Math.min(X1,Math.round(x*2)/2));M.bad=false;M.msg='';sync()}
function testRoot(){if(M.ok)return;const x=M.x,y=f(x);
 if(y!==0)return no(x===.5?'At x = 1/2, 2x + 1 = 2, not 0. Solve 2x + 1 = 0: x = −1/2.':x===-1?'At x = −1, (2x + 1)(x + 3) = (−1)(2) = −2. Setting 2x + 1 = 0 gives −1/2, not −1: divide by the 2.':`At x = ${x}, y = ${y}. A root is where one bracket is zero.`);
 if(!M.found.includes(x))M.found.push(x);A.sound.pop();if(M.found.length===2){M.ok=true;return ya('Both roots: x = −3 (x + 3 = 0) and x = −1/2 (2x + 1 = 0).')}M.bad=false;M.msg=`y = 0 at x = ${x===-.5?'−1/2':x}. Find the other root.`;sync()}
function drawRoots(){M.top=head(M.ok?'(2x + 1)(x + 3) = 0 when x = −1/2 or x = −3.':'y = 2x² + 7x + 3 = (2x + 1)(x + 3). Drag the marker along the x-axis, then Check. Find both roots.',M.ok);const b=plotBox();
 X.strokeStyle='#d0d5dd';X.lineWidth=1;for(let x=X0;x<=X1;x++){X.beginPath();X.moveTo(px(x),b.y);X.lineTo(px(x),b.y+b.h);X.stroke()}
 X.strokeStyle=T.axis;X.lineWidth=2;X.beginPath();X.moveTo(b.x,py(0));X.lineTo(b.x+b.w,py(0));X.moveTo(px(0),b.y);X.lineTo(px(0),b.y+b.h);X.stroke();for(let x=X0+1;x<=X1;x++)put(x,px(x)-u(6),py(0)+u(13),11,T.dim);
 X.save();X.beginPath();X.rect(b.x,b.y,b.w,b.h);X.clip();X.strokeStyle=T.xx;X.lineWidth=3;X.beginPath();for(let i=0;i<=120;i++){const x=X0+(X1-X0)*i/120,y=Math.max(Y0-1,Math.min(Y1+1,f(x)));i?X.lineTo(px(x),py(y)):X.moveTo(px(x),py(y))}X.stroke();X.restore();
 M.found.forEach(x=>{X.fillStyle=T.pass;X.beginPath();X.arc(px(x),py(0),u(7),0,7);X.fill()});
 const mx=px(M.x);X.fillStyle=T.x1;X.beginPath();X.moveTo(mx,py(0)-u(4));X.lineTo(mx-u(11),py(0)-u(24));X.lineTo(mx+u(11),py(0)-u(24));X.fill();put('x = '+(M.x===-.5?'−1/2':M.x),mx,py(0)-u(34),12,T.x1)}
/* ---- frame ---- */
const which=()=>['pairs','grid','try','pairs','hcf','roots','quiz'][A.step];
function down(p){const w=which();
 if(w==='pairs'){const i=(M.boxes||[]).findIndex(r=>on(p,r));if(i>=0){tryPair(i);return true}}
 if(w==='grid'){const i=(M.chips||[]).findIndex(r=>on(p,r));if(i>=0){chip(i);return true}const j=(M.cells||[]).findIndex(r=>on(p,r));if(j>=0){cellTap(j);return true}}
 if(w==='try'&&on(p,M.brk)){cyc();return true}
 if(w==='hcf'){const i=(M.divs||[]).findIndex(r=>on(p,r));if(i>=0){divide(DIV[i]);return true}const j=(M.ends||[]).findIndex(r=>on(p,r));if(j>=0){finalPick(j);return true}}
 if(w==='roots'&&!M.ok&&Math.abs(p.y-py(0))<u(50)){M.drag=true;slide(X0+(p.x-plotBox().x)/plotBox().w*(X1-X0));return true}return false}
function move(p){if(M.drag)slide(X0+(p.x-plotBox().x)/plotBox().w*(X1-X0))}
function up(){M.drag=false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const w=which();if(w==='pairs')drawPairs();if(w==='grid')drawGrid();if(w==='try')drawTry();if(w==='hcf')drawHcf();if(w==='roots')drawRoots();
 if(w==='quiz'){head('Common factor first. Then two numbers with product a × c and sum b: split the middle and group.');put('ax² + bx + c',A.W/2,A.H*.42,22,T.xx);put('→ (px + q)(rx + s)',A.W/2,A.H*.42+u(34),18,T.pass)}
 foot();A.fx.draw(X)}
function sync(){const w=which();let d='Challenge.';
 if(w==='pairs'){const q=Q();d=`Find two numbers with product ${q.a*q.c} and sum ${q.b}. Pairs: ${q.list.map(v=>v.join(' and ')).join('; ')}.`}
 if(w==='grid')d=`Grid: 2x², ${M.cell[0]!=null?term(CHIPS[M.cell[0]],'x'):'empty'}, ${M.cell[1]!=null?term(CHIPS[M.cell[1]],'x'):'empty'}, 3.`;
 if(w==='try'){const p=PS[M.pi];d=`Trying (3x + ${p})(x + ${8/p}), middle term ${3*(8/p)+p}x.`}
 if(w==='hcf')d=M.hcf?'Now 3(2x² + 5x + 2). Choose the full answer.':'6x² + 15x + 6. Choose a common factor.';
 if(w==='roots')d=`Graph of y = 2x² + 7x + 3. Marker at x = ${M.x}, y = ${f(M.x)}. Roots found: ${M.found.length}.`;
 aria((M.msg?M.msg+' ':'')+d);keys();M.after()}
function keys(){if(!ui)return;ui.innerHTML='';const w=which(),b=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ui,t).onclick=fn};
 if(w==='pairs'&&!M.ok)Q().list.forEach(([m,n],i)=>b(`${m}, ${n}`,()=>tryPair(i),`Test ${m} and ${n}`));
 if(w==='grid'&&!M.ok){CHIPS.forEach((v,i)=>{if(!M.used.includes(i))b(term(v,'x'),()=>chip(i),'Pick '+term(v,'x'))});b('Top-right cell',()=>cellTap(0));b('Bottom-left cell',()=>cellTap(1))}
 if(w==='try'&&!M.ok){b('Next pair',cyc,'Try the next pair');b('Expand',expand,'Expand the brackets')}
 if(w==='hcf'&&!M.ok){DIV.forEach(d=>b('÷ '+d,()=>divide(d),'Divide every term by '+d));ENDS.forEach(([s],i)=>b(s,()=>finalPick(i),'Answer '+s))}
 if(w==='roots'&&!M.ok){b('← ½',()=>slide(M.x-.5),'Marker left a half');b('½ →',()=>slide(M.x+.5),'Marker right a half');b('Check',testRoot,'Is y zero here?')}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const seq=(fs,ms)=>{const id=++run;fs.forEach((g,j)=>setTimeout(()=>{if(id===run)g()},(j+1)*(A.reduced()?30:ms)))};
function wipe(){run++;Object.assign(M,{after:()=>{},ok:false,msg:'',bad:false,pick:null,hold:null,cell:[null,null],used:[],pi:0,hcf:0,x:0,found:[],drag:false})}
const steps=[
{h:'Product a × c, sum b',p:'For x² + bx + c the two numbers multiply to c. When a is not 1, they multiply to a × c.',
predict:{q:'For 2x² + 7x + 3, the two numbers multiply to…',opts:['6, which is a × c','3, the last number','7, the middle number'],ans:0},
task:'Find the pair for 2x² + 7x + 3',show:()=>{steps[0].go();seq([()=>tryPair(1),()=>tryPair(0)],700)},go:()=>{wipe();sync();M.after=ready(0,()=>M.ok,'1 and 6.')}},
{h:'Split the middle',p:'Use the pair to split 7x into x + 6x. In a 2 × 2 grid, every row and column then has a common factor.',
task:'Build the grid for 2x² + 7x + 3',show:()=>{steps[1].go();seq([()=>chip(2),()=>cellTap(0),()=>chip(3),()=>cellTap(1),()=>chip(0),()=>cellTap(0),()=>chip(1),()=>cellTap(1)],420)},go:()=>{wipe();sync();M.after=ready(1,()=>M.ok,'(2x + 1)(x + 3).')}},
{h:'Where the numbers go',p:'You can also try brackets directly. With 3x in one bracket, swapping the numbers changes the middle term.',
predict:{q:'Do (3x + 2)(x + 4) and (3x + 4)(x + 2) give the same middle term?',opts:['No: the 3x multiplies only the number in the other bracket','Yes: same numbers, same answer','Only when x is positive'],ans:0},
task:'Find the brackets for 3x² + 10x + 8',show:()=>{steps[2].go();seq([expand,cyc,expand,cyc,expand],600)},go:()=>{wipe();sync();M.after=ready(2,()=>M.ok,'(3x + 4)(x + 2).')}},
{h:'Negative terms',p:'If a × c is negative, one number is negative and one is positive. The bigger one takes the sign of b.',
predict:{q:'For 2x² − x − 6, the two numbers have…',opts:['Opposite signs, because a × c = −12 is negative','Both negative, because the middle is negative','Both positive'],ans:0},
task:'Find the pair for 2x² − x − 6',show:()=>{steps[3].go();seq([()=>tryPair(5),()=>tryPair(4)],700)},go:()=>{wipe();sync();M.after=ready(3,()=>M.ok,'3 and −4.')}},
{h:'Common factor first',p:'If every term shares a factor, take it out first. Then the answer is fully factorised.',
task:'Factorise 6x² + 15x + 6 fully',show:()=>{steps[4].go();seq([()=>divide(2),()=>divide(3),()=>finalPick(2),()=>finalPick(0)],600)},go:()=>{wipe();sync();M.after=ready(4,()=>M.ok,'3(2x + 1)(x + 2).')}},
{h:'Roots from factors',p:'If two brackets multiply to 0, one of them is 0. Each bracket gives one root of the graph.',
predict:{q:'(2x + 1)(x + 3) = 0. Which is a solution?',opts:['x = −1/2','x = −1','x = 1/2'],ans:0},
task:'Find both roots on the graph',show:()=>{steps[5].go();seq([...Array(6).fill(()=>slide(M.x-.5)),testRoot,...Array(5).fill(()=>slide(M.x+.5)),testRoot],160)},go:()=>{wipe();sync();M.after=ready(5,()=>M.ok,'x = −3 and x = −1/2.')}},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.after()});
const BANK=[['Factorise 2x² + 5x + 3.','(2x + 3)(x + 1)',[['(2x + 1)(x + 3)','swap'],['(x + 3)(x + 1)','dropA']]],
['Factorise 3x² + 7x + 2.','(3x + 1)(x + 2)',[['(3x + 2)(x + 1)','swap'],['(x + 1)(x + 2)','dropA']]],
['For 4x² + 4x − 3, which two numbers split the middle term?','6 and −2',[['−3 and 1','cOnly'],['−6 and 2','signs']]],
['Factorise 4x² + 10x + 4 fully.','2(2x + 1)(x + 2)',[['(4x + 2)(x + 2)','notFully'],['(2x + 1)(x + 2)','lostHcf']]],
['Solve (3x − 2)(x + 4) = 0.','x = 2/3 or x = −4',[['x = 2 or x = −4','forgotA'],['x = −2/3 or x = 4','rootSign']]],
['Factorise 2x² − 7x + 3.','(2x − 1)(x − 3)',[['(2x + 1)(x − 3)','oneSign'],['(2x − 3)(x − 1)','swap']]]];
function why(tag){let m='Expand to check: outer plus inner must give the middle term.';
 if(tag==='swap')m='Swapped places. The x-coefficient multiplies the number in the other bracket, so (2x + 1)(x + 3) gives 6x + x = 7x, not 5x.';
 if(tag==='dropA')m='That expands to x² + …: the a has gone. The x-terms must multiply to ax².';
 if(tag==='cOnly')m='Those multiply to c = −3. With a ≠ 1 you need product a × c = −12 and sum 4: 6 and −2.';
 if(tag==='signs')m='−6 × 2 = −12, but −6 + 2 = −4. The sum must be +4, so the bigger number is positive.';
 if(tag==='notFully')m='(4x + 2)(x + 2) is equal, but 4x + 2 still has a factor 2. Take out the 2 to factorise fully.';
 if(tag==='lostHcf')m='That is 2x² + 5x + 2, half of the original. Keep the common factor 2 in front.';
 if(tag==='forgotA')m='3x − 2 = 0 gives 3x = 2, so x = 2/3. Divide by the 3 as well as changing the sign.';
 if(tag==='rootSign')m='Set each bracket to zero: x + 4 = 0 gives x = −4, and 3x − 2 = 0 gives x = +2/3. The signs flip.';
 if(tag==='oneSign')m='(2x + 1)(x − 3) = 2x² − 5x − 3. With c positive and b negative, both brackets need minus signs.';
 return m}
function pose(){qi++;const [qq,ans,bad]=BANK[qi%BANK.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,ans)});aria('Challenge: '+qq);A.redraw()}
function score(tag,ans){qz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=qz.querySelector('.fl-fb');
 if(ok){tok++;A.win()}else{tok=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+tok+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
FK.shell(c,{steps,ratio:.66,tall:1.22,draw,onStep:B=>{qz.hidden=B.step!==6;ui.hidden=B.step===6;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ui=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Factorising lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
