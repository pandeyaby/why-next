/* Flagship – Pascal's triangle and binomial coefficients (ages 16–18): build rows by adding the two entries above;
   drag a route down the triangle to count paths to a cell; find nCr and its mirror nC(n−r); add up rows to see 2ⁿ;
   drag row 4 into the terms of (a + b)⁴. Tap, drag or use the buttons. */
(()=>{
const Bn=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return Math.round(v)};
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',SUB='₀₁₂₃₄₅₆₇₈₉',sup=n=>String(n).split('').map(d=>SUP[d]).join(''),sub=n=>String(n).split('').map(d=>SUB[d]).join('');
const nCr=(n,r)=>sup(n)+'C'+sub(r);
const FILL=[[5,1],[5,2],[5,3],[5,4],[6,1],[6,2],[6,3],[6,4],[6,5]];
const PT=[4,2],GOAL=Bn(4,2);
const HUNT=[{n:6,r:2,ask:'Tap '+nCr(6,2)},{n:6,r:4,twin:1,ask:'Tap the other cell equal to '+nCr(6,2)},{n:7,r:3,ask:'Tap '+nCr(7,3)},{n:7,r:4,twin:1,ask:'Tap the other cell equal to '+nCr(7,3)}];
const TERMS=['a⁴','a³b','a²b²','ab³','b⁴'],TILES=[6,1,4,1,4];
VIS.reg('flagpasc',c=>{let A,ctl,quiz,qi=-1,tok=0;
const st0=()=>({want:()=>{},won:0,f:0,flash:null,path:null,routes:[],h:0,found:[],sums:[],slots:[],used:[],grab:null}),S=st0();
const phase=()=>['build','paths','hunt','sums','expand','quiz'][A.step];
const px=n=>Math.round(n*(A.narrow?1:1.12)),RM=()=>A.reduced();
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function ink(g,t,x,y,n,col,w,al,mw){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-24)}
function para(g,t,x,y,w,n){g.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let line='';for(const z of t.split(' ')){const s=line?line+' '+z:z;if(g.measureText(s).width>w&&line){out.push(line);line=z}else line=s}out.push(line);
 out.forEach((s,i)=>ink(g,s,x,y+(i-(out.length-1)/2)*px(n)*1.25,n,null,700))}
function box(g,x,y,w,h,col,fill,ring){g.fillStyle=A.alpha(col,fill);A.paint.rrect(x,y,w,h,9);g.fill();g.lineWidth=ring?4:2;g.strokeStyle=ring?A.col.rd:col;A.paint.rrect(x,y,w,h,9);g.stroke()}
/* triangle geometry: R rows, centred at cx, top row at y0, bottom row at y1 */
function geo(R,cx,y0,y1){const{W}=A,span=cx===W/2?W-16:W*.72,dx=Math.min(span/(R+1),56),dy=(y1-y0)/Math.max(R,1);return{R,dx,dy,at:(n,r)=>({x:cx+(r-n/2)*dx,y:y0+n*dy})}}
function tri(g,G,label,mark){const C=A.col;for(let n=0;n<=G.R;n++)for(let r=0;r<=n;r++){const p=G.at(n,r),t=label(n,r);if(t==null)continue;const m=mark?mark(n,r):null;
 g.fillStyle=A.alpha(m||C.ac,m?.3:.12);g.beginPath();g.arc(p.x,p.y,G.dx*.44,0,7);g.fill();g.lineWidth=m?3:1.5;g.strokeStyle=m||A.alpha(C.ac,.6);g.stroke();
 ink(g,String(t),p.x,p.y,t>99?11:13,C.tx,800,'center',G.dx*.84)}}
function near(G,p){let best=null,d=G.dx*.5;for(let n=0;n<=G.R;n++)for(let r=0;r<=n;r++){const q=G.at(n,r),e=Math.hypot(q.x-p.x,q.y-p.y);if(e<d){d=e;best=[n,r]}}return best}
const G0=()=>geo(6,A.W/2,A.H*.08,A.H*.78),G1=()=>geo(4,A.W/2,A.H*.08,A.H*.7),G2=()=>geo(7,A.W/2,A.H*.06,A.H*.76),G3=()=>geo(6,A.W*.4,A.H*.07,A.H*.85);
/* step 0: build */
const known=(n,r)=>{if(n<5||r===0||r===n)return true;const i=FILL.findIndex(q=>q[0]===n&&q[1]===r);return i<S.f};
function drawBuild(g){const G=G0(),C=A.col,cur=FILL[S.f];tri(g,G,(n,r)=>known(n,r)?Bn(n,r):cur&&cur[0]===n&&cur[1]===r?'?':'',(n,r)=>{if(!cur)return null;if(n===cur[0]&&r===cur[1])return S.flash?C.rd:C.am;if(n===cur[0]-1&&(r===cur[1]-1||r===cur[1]))return C.cy;return null});
 ink(g,cur?`Row ${cur[0]}: which number goes in the ?`:'',A.W/2,A.H*.92,13,C.mu,600)}
function opts0(){const[n,r]=FILL[S.f],a=Bn(n-1,r-1),b=Bn(n-1,r),v=a+b,m=a*b===v?v+1:a*b;let d=2*Math.max(a,b);if(d===v||d===m)d=v+2;return[[v,'ok'],[m,'mul'],[d,'dbl']].sort((x,y)=>x[0]-y[0])}
function pick0(v,t){if(phase()!=='build'||S.f>=FILL.length)return;const[n,r]=FILL[S.f],a=Bn(n-1,r-1),b=Bn(n-1,r);
 if(t!=='ok')return nope(t==='mul'?`Not multiply: the two above are ${a} and ${b}. Add them.`:`Not double one of them: add both cells above, ${a} + ${b}.`);
 S.f++;A.sound.tick();if(S.f>=FILL.length)return score('Rows 5 and 6 built: 1 5 10 10 5 1 and 1 6 15 20 15 6.');voice(`${a} + ${b} = ${v}. Next cell.`);controls();A.redraw()}
/* step 1: routes */
function drawPaths(g){const G=G1(),C=A.col;tri(g,G,(n,r)=>Bn(n,r),(n,r)=>n===PT[0]&&r===PT[1]?C.am:null);
 const draw=(ks,col,w)=>{g.strokeStyle=col;g.lineWidth=w;g.beginPath();ks.forEach((k,i)=>{const p=G.at(i,k);i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)});g.stroke()};
 S.routes.forEach(s=>{let k=0;draw([0].concat(s.split('').map(ch=>k+=ch==='R'?1:0)),A.alpha(C.gr,.45),3)});
 if(S.path)draw(S.path,S.flash?C.rd:C.vi,6);
 ink(g,`Routes found: ${S.routes.length} of ${GOAL}`,A.W/2,A.H*.8,14,C.tx,800);ink(g,S.routes.join('  '),A.W/2,A.H*.9,12,C.mu,700)}
function stepPath(right){if(phase()!=='paths'||S.won)return;if(!S.path)S.path=[0];const k=S.path[S.path.length-1];S.path.push(k+(right?1:0));A.sound.tick();if(S.path.length===5)endPath();else{controls();A.redraw()}}
function endPath(){const p=S.path,s=p.slice(1).map((k,i)=>k>p[i]?'R':'L').join('');
 if(p[4]!==PT[1]){S.path=null;controls();return nope(`That route ends at position ${p[4]}. To end at position 2 you need exactly 2 R moves out of 4.`)}
 if(S.routes.includes(s)){S.path=null;controls();return nope(`You have ${s} already. Try a different order of L and R.`)}
 S.routes.push(s);S.path=null;if(S.routes.length>=GOAL)return score(`All ${GOAL} routes: choose which 2 of the 4 moves are R, so ${nCr(4,2)} = 6, the number in the cell.`);voice(`${s} is new. ${S.routes.length} of ${GOAL}.`);controls();A.redraw()}
/* step 2: hunt */
function drawHunt(g){const G=G2(),C=A.col,q=HUNT[S.h];tri(g,G,(n,r)=>Bn(n,r),(n,r)=>S.found.some(f=>f[0]===n&&f[1]===r)?C.gr:S.flash&&S.flash[0]===n&&S.flash[1]===r?C.rd:null);
 ink(g,q?q.ask:'',A.W/2,A.H*.84,15,C.tx,800);ink(g,'Rows and positions count from 0',A.W/2,A.H*.93,12,C.mu,600)}
function tapHunt(n,r){if(phase()!=='hunt'||S.won)return;const q=HUNT[S.h];if(n===q.n&&r===q.r){S.found.push([n,r]);S.h++;A.sound.tick();
  if(S.h>=HUNT.length)return score(`${nCr(6,2)} = ${nCr(6,4)} = 15 and ${nCr(7,3)} = ${nCr(7,4)} = 35. Choosing r to take is the same as choosing n − r to leave.`);
  voice(q.twin?`Yes: ${nCr(q.n,q.r)} = ${Bn(q.n,q.r)}, the mirror image.`:`Yes, ${nCr(n,r)} = ${Bn(n,r)}. ${HUNT[S.h].ask}.`);controls();return A.redraw()}
 const prev=HUNT[S.h-1];if(q.twin&&prev&&n===prev.n&&r===prev.r)return nope('That is the same cell. Look for its mirror image across the middle.',[n,r]);
 nope(n!==q.n?`That is in row ${n}. ${nCr(q.n,q.r)} is in row ${q.n}, the row that starts 1, ${q.n}.`:`That is ${nCr(n,r)} = ${Bn(n,r)}. Position 0 is the 1 at the left edge.`,[n,r])}
/* step 3: row sums */
function drawSums(g){const G=G3(),C=A.col;tri(g,G,(n,r)=>Bn(n,r),(n)=>S.sums.includes(n)?C.gr:null);
 for(let n=0;n<=6;n++){const y=G.at(n,0).y;ink(g,S.sums.includes(n)?`= ${2**n} = 2${sup(n)}`:'',A.W-8,y,13,C.tx,800,'right',A.W*.24)}}
function tapRow(n){if(phase()!=='sums'||S.won)return;if(S.sums.includes(n))return nope(`Row ${n} is done: it adds to ${2**n}.`);S.sums.push(n);A.sound.tick();
 if(S.sums.length>=7)return score('Every row doubles: row n adds to 2ⁿ. Each of the n moves is L or R, so there are 2ⁿ routes in total.');
 voice(`Row ${n}: ${Array.from({length:n+1},(_,r)=>Bn(n,r)).join(' + ')} = ${2**n}.`);controls();A.redraw()}
/* step 4: expand (a + b)⁴ */
const tileRect=j=>{const{W,H}=A,w=(W-24)/5;return{x:12+j*w+4,y:H*.1,w:w-8,h:H*.16}};
const slotRect=k=>{const{W,H}=A,w=(W-24)/5;return{x:12+k*w+4,y:H*.5,w:w-8,h:H*.18}};
function drawExpand(g){const C=A.col;ink(g,'(a + b)⁴ = (a + b)(a + b)(a + b)(a + b)',A.W/2,A.H*.38,13,C.mu,700);
 TERMS.forEach((t,k)=>{const b=slotRect(k),v=S.slots[k];box(g,b.x,b.y,b.w,b.h,v!=null?C.gr:C.mu,v!=null?.2:.06,S.flash===k);if(v!=null)ink(g,String(v),b.x+b.w/2,b.y+b.h/2,18);ink(g,t,b.x+b.w/2,b.y+b.h+px(16),14,C.tx,800)});
 TILES.forEach((v,j)=>{if(S.used.includes(j))return;const b=tileRect(j),q=S.grab&&S.grab.j===j,x=q?S.grab.x-b.w/2:b.x,y=q?S.grab.y-b.h/2:b.y;box(g,x,y,b.w,b.h,C.ac,.22);ink(g,String(v),x+b.w/2,y+b.h/2,18)});
 ink(g,S.slots.length<5?'Drag each number onto its term':'',A.W/2,A.H*.92,12,C.mu,600)}
function put(j,k){if(phase()!=='expand'||S.won)return;S.grab=null;if(k==null||S.slots[k]!=null){A.redraw();return}const v=TILES[j],want=Bn(4,k);
 if(v!==want)return nope(`${TERMS[k]} takes b from ${k} of the 4 brackets: ${nCr(4,k)} = ${want}, not ${v}.`,k);
 S.slots[k]=v;S.used.push(j);A.sound.tick();if(S.used.length>=5)return score('a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴: the coefficients are row 4.');voice(`Yes, ${v}${TERMS[k]}.`);controls();A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){ink(g,'ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ',W/2,H*.4,17);ink(g,'(a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ',W/2,H*.58,15,C.mu,700);return}
 if(S.won>=1){para(g,finale(),W/2,H/2,W-40,15);return A.fx.draw(g)}
 ({build:drawBuild,paths:drawPaths,hunt:drawHunt,sums:drawSums,expand:drawExpand})[v](g);A.fx.draw(g)}
function finale(){return{build:'Each entry is the sum of the two entries above it.',paths:`The entry counts the routes to it: ${nCr(4,2)} = 6.`,hunt:'Every row is symmetric: ⁿCᵣ = ⁿCₙ₋ᵣ.',
 sums:'Row n adds up to 2ⁿ.',expand:'Row n gives the coefficients of (a + b)ⁿ.'}[phase()]}
const nope=(t,f)=>{A.sound.miss();S.flash=f==null?1:f;voice(t);setTimeout(()=>{S.flash=null;A.redraw()},RM()?10:900);A.redraw()};
function score(t){S.won++;A.sound.pop();voice(t);controls();A.redraw();S.want()}
function controls(){if(!ctl)return;ctl.innerHTML='';const v=phase(),btn=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='quiz'||S.won)return;
 if(v==='build')opts0().forEach(([x,t])=>btn(String(x),()=>pick0(x,t),'The cell is '+x));
 if(v==='paths'){btn('↙ L',()=>stepPath(0),'Move down-left');btn('↘ R',()=>stepPath(1),'Move down-right');if(S.path)btn('Clear',()=>{S.path=null;controls();A.redraw()})}
 if(v==='hunt'){const q=HUNT[S.h];const o=[[q.n,q.r],[q.n,q.r-1],[q.r,2]];o.slice(S.h%3).concat(o.slice(0,S.h%3)).forEach(([n,r])=>btn(`Row ${n}, position ${r}`,()=>tapHunt(n,r)))}
 if(v==='sums')btn('Add up the next row',()=>tapRow([0,1,2,3,4,5,6].find(n=>!S.sums.includes(n))));
 if(v==='expand'){const k=TERMS.findIndex((t,i)=>S.slots[i]==null);[...new Set(TILES.filter((x,j)=>!S.used.includes(j)))].forEach(x=>btn(`${x} → ${TERMS[k]}`,()=>put(TILES.findIndex((y,j)=>y===x&&!S.used.includes(j)),k)))}}
const inside=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function down(p){const v=phase();if(v==='quiz'||S.won)return false;
 if(v==='paths'){const G=G1(),a=G.at(0,0);if(Math.hypot(p.x-a.x,p.y-a.y)<G.dx*.8){S.path=[0];A.redraw();return true}return false}
 if(v==='hunt'){const h=near(G2(),p);if(h)tapHunt(h[0],h[1]);return false}
 if(v==='sums'){const G=G3();for(let n=0;n<=6;n++)if(Math.abs(p.y-G.at(n,0).y)<G.dy*.5){tapRow(n);break}return false}
 if(v==='expand'){for(let j=0;j<5;j++)if(!S.used.includes(j)&&inside(p,tileRect(j))){S.grab={j,x:p.x,y:p.y};A.redraw();return true}return false}
 if(v==='build'){const h=near(G0(),p),cur=FILL[S.f];if(h&&cur&&h[0]===cur[0]&&h[1]===cur[1])voice('Add the two blue cells above it, then pick the answer below.');return false}return false}
function move(p){const v=phase();if(v==='expand'&&S.grab){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
 if(v==='paths'&&S.path&&S.path.length<5){const G=G1(),n=S.path.length-1,k=S.path[n];if(p.y>G.at(n,k).y+G.dy*.6){S.path.push(k+(p.x>G.at(n,k).x?1:0));A.sound.tick();if(S.path.length===5)endPath();else A.redraw()}}}
function up(p){const v=phase();if(v==='expand'&&S.grab){let k=null;for(let i=0;i<5;i++){const b=slotRect(i);if(p.x>b.x-4&&p.x<b.x+b.w+4&&p.y>b.y-A.H*.1)k=i}put(S.grab.j,k)}
 if(v==='paths')controls()}
const goalCheck=(n,msg)=>()=>{if(A.step===n&&S.won&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},RM()?j*40+30:(j+1)*(gap||250)))}
const reset=()=>{tok++;Object.assign(S,st0())};
const begin=(n,line,msg)=>()=>{reset();voice(line);controls();S.want=goalCheck(n,msg)};
const ROUTES=['LLRR','LRLR','LRRL','RLLR','RLRL','RRLL'];
const steps=[
{h:'Build the triangle',p:'Each row starts and ends with 1. Every other entry is made from the two entries just above it. Fill in rows 5 and 6.',
 predict:{q:'Row 4 is 1 4 6 4 1. How is each new entry made from the two above it?',opts:['Multiply them','Add them'],ans:1},task:'Fill the 9 missing entries',
 show:()=>{steps[0].go();auto(FILL.map(()=>()=>{const o=opts0().find(x=>x[1]==='ok');pick0(o[0],'ok')}),300)},go:begin(0,'Which number goes in the yellow cell?','Each entry is the sum of the two above: ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ.')},
{h:'Count the routes',p:'Start at the top 1. Each move goes down-left (L) or down-right (R). Drag a route from the top to the yellow 6, or use L and R.',
 predict:{q:'How many different routes reach the yellow cell in row 4, position 2?',opts:['4','6','8'],ans:1},task:'Find all 6 routes',
 show:()=>{steps[1].go();auto(ROUTES.flatMap(s=>s.split('').map(ch=>()=>stepPath(ch==='R'))),160)},go:begin(1,'Drag down from the top 1.','A route is 4 moves with 2 of them R. There are ⁴C₂ = 6 ways to choose which.')},
{h:'Find ⁿCᵣ',p:'Row n, position r holds ⁿCᵣ, the number of ways to choose r things from n. Count rows and positions from 0.',task:'Find 2 entries and their mirror twins',
 show:()=>{steps[2].go();auto(HUNT.map(q=>()=>tapHunt(q.n,q.r)),500)},go:begin(2,'Tap ⁶C₂.','The triangle is symmetric: ⁿCᵣ = ⁿCₙ₋ᵣ.')},
{h:'Add up each row',p:'Tap each row to add up its entries. Watch the totals.',
 predict:{q:'Rows 0 to 3 add up to 1, 2, 4, 8. What will row 10 add up to?',opts:['20','100','1024'],ans:2},task:'Add up rows 0 to 6',
 show:()=>{steps[3].go();auto([0,1,2,3,4,5,6].map(n=>()=>tapRow(n)),220)},go:begin(3,'Tap row 0 first.','Row n adds up to 2ⁿ: each route of n moves is L or R.')},
{h:'Expand (a + b)⁴',p:'Each term picks a or b from each of the 4 brackets. The coefficient of a⁴⁻ʳbʳ counts the ways to choose which r brackets give b.',
 predict:{q:'How many terms does (a + b)⁴ have once like terms are collected?',opts:['4','5','16'],ans:1},task:'Drag row 4 into the terms',
 show:()=>{steps[4].go();auto([1,0,2,3,4].map((j,i)=>()=>put(j,[0,2,1,4,3][i])),350)},go:begin(4,'Drag each number onto its term.','The binomial theorem: (a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[[`${nCr(8,3)} = ?`,[['56','ok'],['336','perm'],['24','mult']]],
 ['What do the entries of row 7 add up to?',[['128','ok'],['49','sq'],['14','dbl']]],
 ['What is the coefficient of x³ in (1 + x)⁶?',[['20','ok'],['15','off'],['6','n']]],
 [`Which is equal to ${nCr(10,7)}?`,[[nCr(10,3),'ok'],[nCr(7,3),'swap'],[nCr(10,8),'edge']]],
 ['How many routes from the top reach row 5, position 1?',[['5','ok'],['1','edge2'],['10','off2']]],
 ['What is the coefficient of a²b³ in (a + b)⁵?',[['10','ok'],['5','n'],['6','pow']]]];
function why(t){let m='Use the triangle: row n, position r.';
 if(t==='perm')m='336 is ⁸P₃, where order matters. Divide by 3! = 6: ⁸C₃ = 56.';
 if(t==='mult')m='8 × 3 is not ⁸C₃. Use 8 × 7 × 6 ÷ (3 × 2 × 1) = 56.';
 if(t==='sq')m='Row n adds to 2ⁿ, not n². 2⁷ = 128.';
 if(t==='dbl')m='The total doubles each row: 2⁷ = 128.';
 if(t==='off')m='15 is ⁶C₂ or ⁶C₄. x³ needs 3 x’s from 6 brackets: ⁶C₃ = 20.';
 if(t==='n')m='The middle of the row is not n. Count positions from 0 and read the entry.';
 if(t==='swap')m='Keep n = 10. Symmetry swaps r with n − r: ¹⁰C₇ = ¹⁰C₃.';
 if(t==='edge')m='The mirror of position 7 in row 10 is 10 − 7 = 3, not 8.';
 if(t==='edge2')m='Only the edge cells have 1 route. Position 1 needs one R among 5 moves: 5 ways.';
 if(t==='off2')m='10 is ⁵C₂. Position 1 is ⁵C₁ = 5.';
 if(t==='pow')m='Use row 5, not row 6. a²b³ is ⁵C₃ = 10.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.75,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
