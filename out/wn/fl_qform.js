/* Flagship – the quadratic formula (ages 15–17; GCSE Higher A18 / CCSS HSA-REI.B.4b). Read a, b, c from any layout,
   drag a parabola to see b² − 4ac decide 2, 1 or 0 roots, run x = (−b ± √(b² − 4ac)) / 2a stage by stage,
   find irrational roots on the graph, and catch the classic slips. Not flagcsq (completing the square). */
(()=>{const m=Math.min,X=Math.max,ab=Math.abs,f2=v=>(Math.round(v*100)/100).toString().replace('-','−');
const ABC=[{e:'2x² − 3x − 5 = 0',o:['a = 2, b = −3, c = −5','a = 2, b = 3, c = 5','a = 2, b = −3, c = 5'],a:0,w:['','Signs belong to the numbers: −3x means b = −3, and −5 means c = −5.','c keeps its sign: − 5 means c = −5.']},
{e:'x² + 7x + 10 = 0',o:['a = 0, b = 7, c = 10','a = 1, b = 7, c = 10','a = 1, b = 10, c = 7'],a:1,w:['x² means 1x², so a = 1, not 0.','','b goes with x and c is the number on its own.']},
{e:'3x² + 4 = 8x',o:['a = 3, b = 8, c = 4','a = 3, b = 4, c = 8','a = 3, b = −8, c = 4'],a:2,w:['Make one side 0 first: 3x² − 8x + 4 = 0, so b = −8.','Make one side 0 first. b goes with x: 3x² − 8x + 4 = 0.','']},
{e:'5 − x² + 2x = 0',o:['a = −1, b = 2, c = 5','a = 5, b = −1, c = 2','a = 1, b = 2, c = 5'],a:0,w:['','a is the number with x², not the first number written: −x² + 2x + 5.','−x² means a = −1. Keep the sign.']}];
const RUN=[{q:'−b',o:['5','−5','6'],a:0,w:['','b = −5, so −b = −(−5) = +5.','−b uses b, the x number, not c.']},{q:'b²',o:['−25','25','10'],a:1,w:['(−5)² = (−5) × (−5) = +25. A square is never negative.','','b² is b × b, not 2 × b.']},
{q:'4ac',o:['24','10','6'],a:0,w:['','4ac = 4 × 1 × 6. Multiply all three.','Do not forget the 4: 4 × 1 × 6 = 24.']},{q:'√(b² − 4ac)',o:['7','1','49'],a:1,w:['That used 25 + 24. It is b² minus 4ac: √(25 − 24) = 1.','','49 is 25 + 24 with no root. Subtract, then take the root: √1 = 1.']},
{q:'x',o:['5.5 or 4.5','−3 or −2','3 or 2'],a:2,w:['That divides only the root by 2. Divide the whole top: (5 ± 1) ÷ 2.','That starts from −5. −b is +5: (5 ± 1) ÷ 2.','']}];
const SLIP=[{e:'2x² + 5x − 3 = 0',l:['a = 2, b = 5, c = −3','b² − 4ac = 25 + 24 = 49','x = (5 ± 7) ÷ 4'],bad:2,w:'−b is −5, not 5: x = (−5 ± 7) ÷ 4 = 0.5 or −3.'},
{e:'x² − 6x + 5 = 0',l:['a = 1, b = −6, c = 5','b² − 4ac = −36 − 20','x = (6 ± 4) ÷ 2'],bad:1,w:'(−6)² is +36, so b² − 4ac = 36 − 20 = 16.'},
{e:'x² + 4x + 1 = 0',l:['a = 1, b = 4, c = 1','b² − 4ac = 16 − 4 = 12','x = −4 ± (√12 ÷ 2)'],bad:2,w:'2a divides the whole top: x = (−4 ± √12) ÷ 2 = −0.27 or −3.73.'},
{e:'x² − 2x − 8 = 0',l:['a = 1, b = −2, c = −8','b² − 4ac = 4 + 32 = 36','x = (2 + 6) ÷ 2 = 4 only'],bad:2,w:'± gives two answers: (2 + 6) ÷ 2 = 4 and (2 − 6) ÷ 2 = −2.'}];
const R4=[-1-Math.sqrt(5),-1+Math.sqrt(5)];
VIS.reg('flagqform',c=>{let A,box,chq,n=-1,era=0;const Z={};
const T='#0f172a',G='#047857',B='#b91c1c',E='#64748b',P='#7c3aed',C='#0e7490',FF='system-ui,sans-serif';
const fo=(s,w)=>`${w||700} ${s}px ${FF}`,k=s=>A.narrow?s:Math.round(s*1.15),at=()=>['abc','disc','run','root','slip','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const hit=()=>A.sound.pop(),boo=()=>A.sound.miss();
function base(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f0f9ff',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H)}
function chip(t,y,o){o=o||{};const g=A.ctx;let s=k(o.s||14);g.font=fo(s,800);let w=g.measureText(t).width+26;while(w>A.W-12&&s>10){s--;g.font=fo(s,800);w=g.measureText(t).width+26}
const h=s+16,x=X(6,m(A.W-w-6,(o.x||A.W/2)-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(x,y-h/2,w,h,8);g.fill();g.strokeStyle=o.ok?G:o.no?B:E;g.lineWidth=o.ok||o.no?3:1.5;g.stroke();g.fillStyle=T;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x+w/2,y+1);return{x,y:y-h/2,w,h}}
function rows(nr,y0,h){return[...Array(nr)].map((_,i)=>({x:12,y:y0+i*(h+8),w:A.W-24,h}))}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=o.ok?G:o.no?B:(o.edge||E);g.lineWidth=o.ok||o.no?4:2;g.stroke();
let s=k(o.s||16);g.font=fo(s,800);while(g.measureText(t).width>r.w-14&&s>10){s--;g.font=fo(s,800)}g.fillStyle=T;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
/* graph frame shared by the discriminant and root steps */
function frame(x0,x1,y0,y1){const L=14,R=A.W-14,Tp=A.H*.17,Bt=A.H*.8;return{px:x=>L+(x-x0)/(x1-x0)*(R-L),py:y=>Bt-(y-y0)/(y1-y0)*(Bt-Tp),xv:p=>x0+(p-L)/(R-L)*(x1-x0),L,R,Tp,Bt}}
function axes(F,x0,x1){const g=A.ctx;g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(F.L,F.py(0));g.lineTo(F.R,F.py(0));g.stroke();g.fillStyle=A.col.tx;g.font=fo(k(11),600);g.textAlign='center';g.textBaseline='top';
for(let x=Math.ceil(x0);x<=x1;x++){g.fillRect(F.px(x)-1,F.py(0)-4,2,8);g.fillText(String(x).replace('-','−'),F.px(x),F.py(0)+6)}}
function curve(F,fn,x0,x1,col){const g=A.ctx;g.strokeStyle=col;g.lineWidth=3.5;g.beginPath();for(let i=0;i<=120;i++){const x=x0+(x1-x0)*i/120,y=F.py(fn(x));i?g.lineTo(F.px(x),y):g.moveTo(F.px(x),y)}g.stroke()}
/* step 1: read a, b and c */
function drawAbc(){const s=Z.a;base();if(s.k>=4){chip('All 4 read',A.H*.08,{ok:1});ABC.forEach((q,i)=>chip(`${q.e}  →  ${q.o[q.a]}`,A.H*(.24+i*.17),{ok:1,s:13}));return}
const q=ABC[s.k];chip(`Equation ${s.k+1} of 4: tap the right a, b, c`,A.H*.08,{s:13});chip(q.e,A.H*.24,{s:22,bg:'#ecfeff'});rows(3,A.H*.4,k(50)).forEach((r,i)=>tile(r,q.o[i],{no:s.miss===i}))}
function pickAbc(i){const s=Z.a;if(s.k>=4)return;const q=ABC[s.k];if(i!==q.a){s.miss=i;boo();return tell(q.w[i])}s.k++;s.miss=null;hit();tell(`${q.e}: ${q.o[i]}.`+(s.k>=4?' All 4 read.':''))}
/* step 2: drag the parabola; the discriminant decides */
const D=c=>4-4*c,kind=c=>D(c)>0?2:D(c)===0?1:0;
function drawDisc(){const s=Z.d,g=A.ctx;base();const F=frame(-2,4,-4,6);axes(F,-2,4);curve(F,x=>x*x-2*x+s.c,-2,4,P);
const d=D(s.c),r=kind(s.c);chip(`y = x² − 2x ${s.c<0?'−':'+'} ${f2(ab(s.c))}`,A.H*.08,{s:14});chip(`b² − 4ac = 4 − 4 × ${s.c<0?'('+f2(s.c)+')':f2(s.c)} = ${f2(d)}`,A.H*.9,{s:13,ok:r===1,no:r===0});
if(r){const h=Math.sqrt(d)/2;[1-h,1+h].slice(0,r===1?1:2).forEach(x=>{g.fillStyle=G;g.beginPath();g.arc(F.px(x),F.py(0),k(8),0,7);g.fill()})}
chip(`${r} real root${r===1?'':'s'} · cases seen: ${[2,1,0].filter(v=>s.seen.has(v)).join(', ')}`,A.H*.17,{s:12})}
function setC(c){const s=Z.d;s.c=X(-3,m(3,Math.round(c*2)/2));const r=kind(s.c),fresh=!s.seen.has(r);s.seen.add(r);if(fresh)hit();
tell(`c = ${f2(s.c)}: b² − 4ac = ${f2(D(s.c))}. `+(r===2?'Positive: the curve cuts the x-axis twice, 2 roots.':r===1?'Zero: the curve just touches, 1 repeated root.':'Negative: no square root, the curve misses the axis, no real roots.')+(s.seen.size>=3?' All 3 cases seen.':''))}
/* step 3: run the formula on x² − 5x + 6 = 0 */
function drawRun(){const s=Z.r;base();chip('x² − 5x + 6 = 0   (a = 1, b = −5, c = 6)',A.H*.08,{s:13});
RUN.slice(0,s.k).forEach((q,i)=>chip(`${q.q} = ${q.o[q.a]}`,A.H*(.19+i*.075),{s:12,ok:1,x:A.W*(i%2?.72:.28)}));
if(s.k>=5){chip('x = (5 ± 1) ÷ 2 = 3 or 2',A.H*.62,{ok:1,s:18});return}chip(`Stage ${s.k+1} of 5: ${RUN[s.k].q} = ?`,A.H*.5,{s:16,bg:'#f5f3ff'});
const w=(A.W-40)/3;RUN[s.k].o.forEach((t,i)=>tile({x:10+i*(w+10),y:A.H*.64,w,h:k(56)},t,{no:s.miss===i,s:17}))}
function runPick(i){const s=Z.r;if(s.k>=5)return;const q=RUN[s.k];if(i!==q.a){s.miss=i;boo();return tell(q.w[i])}s.k++;s.miss=null;hit();tell(`${q.q} = ${q.o[i]}.`+(s.k>=5?' x = 3 or 2. Check: 9 − 15 + 6 = 0.':''))}
function runRects(){const w=(A.W-40)/3;return[0,1,2].map(i=>({x:10+i*(w+10),y:A.H*.64,w,h:k(56)}))}
/* step 4: find the roots of x² + 2x − 4 = 0 on the graph */
const f4=x=>x*x+2*x-4;
function drawRoot(){const s=Z.o,g=A.ctx;base();const F=frame(-5,3,-6,8);axes(F,-5,3);curve(F,f4,-5,3,C);
s.got.forEach(x=>{g.fillStyle=G;g.beginPath();g.arc(F.px(x),F.py(0),k(8),0,7);g.fill()});
const px=F.px(s.x);g.strokeStyle=P;g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.moveTo(px,F.Tp);g.lineTo(px,F.Bt);g.stroke();g.setLineDash([]);
g.fillStyle=P;g.beginPath();g.moveTo(px,F.py(0)-12);g.lineTo(px-11,F.py(0)-30);g.lineTo(px+11,F.py(0)-30);g.fill();
chip(`x² + 2x − 4 = 0 · roots found ${s.got.length} of 2`,A.H*.08,{s:13,ok:s.got.length>=2});chip(`x = ${f2(s.x)}   y = ${f2(f4(s.x))}`,A.H*.9,{s:13})}
function markX(x){Z.o.x=X(-5,m(3,Math.round(x*100)/100));A.redraw()}
function tryRoot(){const s=Z.o;if(s.got.length>=2)return;const r=R4.find(r=>ab(r-s.x)<.06&&!s.got.some(g=>ab(g-r)<.01));
if(!r){boo();return tell(`At x = ${f2(s.x)}, y = ${f2(f4(s.x))}, not 0. ${f4(s.x)>0?'The curve is above the axis here.':'The curve is below the axis here.'} Move to where it crosses.`)}
s.got.push(r);hit();tell(`Yes, near ${f2(r)}. The formula gives exactly −1 ${r>0?'+':'−'} √5 = ${f2(r)}: b² − 4ac = 20 is not a square, so the roots are irrational.`+(s.got.length>=2?' Both found.':''))}
/* step 5: find the slip */
function drawSlip(){const s=Z.s;base();if(s.k>=4){chip('All 4 slips caught',A.H*.08,{ok:1});['−b sign','b² is positive','÷ 2a under everything','± gives two roots'].forEach((t,i)=>chip(t,A.H*(.26+i*.16),{ok:1,s:15}));return}
const q=SLIP[s.k];chip(`Working ${s.k+1} of 4: tap the wrong line`,A.H*.08,{s:13});chip(q.e,A.H*.22,{s:18,bg:'#ecfeff'});rows(3,A.H*.36,k(52)).forEach((r,i)=>tile(r,q.l[i],{no:s.miss===i,edge:P,s:16}))}
function slipPick(i){const s=Z.s;if(s.k>=4)return;const q=SLIP[s.k];if(i!==q.bad){s.miss=i;boo();return tell(`Line ${i+1} is right. Check the signs, the square and what 2a divides.`)}s.k++;s.miss=null;hit();tell(q.w+(s.k>=4?' All 4 caught.':''))}
function draw(){const w=at();if(w==='quiz'){base();chip('Challenge',A.H*.2,{ok:1});chip('x = (−b ± √(b² − 4ac)) ÷ 2a',A.H*.5,{s:17});return}({abc:drawAbc,disc:drawDisc,run:drawRun,root:drawRoot,slip:drawSlip})[w]();A.fx.draw(A.ctx)}
function down(p){const w=at();
if(w==='abc'&&Z.a.k<4){const i=rows(3,A.H*.4,k(50)).findIndex(r=>on(p,r));if(i>=0)pickAbc(i);return false}
if(w==='disc'){Z.drag={y:p.y,c:Z.d.c};return true}
if(w==='run'&&Z.r.k<5){const i=runRects().findIndex(r=>on(p,r));if(i>=0)runPick(i);return false}
if(w==='root'&&Z.o.got.length<2){markX(frame(-5,3,-6,8).xv(p.x));Z.drag={root:1};return true}
if(w==='slip'&&Z.s.k<4){const i=rows(3,A.H*.36,k(52)).findIndex(r=>on(p,r));if(i>=0)slipPick(i)}return false}
function move(p){const d=Z.drag;if(!d)return;if(d.root)return markX(frame(-5,3,-6,8).xv(p.x));const F=frame(-2,4,-4,6),nc=d.c+(d.y-p.y)/(F.Bt-F.Tp)*10;if(Math.round(nc*2)/2!==Z.d.c)setC(nc)}
function up(){const d=Z.drag;Z.drag=null;if(d&&d.root)tryRoot()}
function wipe(){era++;for(const q in Z)delete Z[q];Object.assign(Z,{a:{k:0},d:{c:-2,seen:new Set([2])},r:{k:0},o:{x:0,got:[]},s:{k:0},drag:null,ok:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.ok()}
function into(i,desc,ok,msg){wipe();tell(desc);Z.ok=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=era;acts.forEach((f,j)=>setTimeout(()=>{if(me===era)f()},ms*(j+1)))}
function keys(){if(!box)return;box.innerHTML='';const w=at(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},box,t).onclick=f};
if(w==='abc'&&Z.a.k<4)ABC[Z.a.k].o.forEach((t,i)=>K(t,()=>pickAbc(i)));
if(w==='disc'){K('Curve down (c − 0.5)',()=>setC(Z.d.c-.5));K('Curve up (c + 0.5)',()=>setC(Z.d.c+.5))}
if(w==='run'&&Z.r.k<5)RUN[Z.r.k].o.forEach((t,i)=>K(t,()=>runPick(i),`${RUN[Z.r.k].q} = ${t}`));
if(w==='root'&&Z.o.got.length<2){[['◀ 0.5',-.5],['◀ 0.05',-.05],['0.05 ▶',.05],['0.5 ▶',.5]].forEach(([t,v])=>K(t,()=>markX(Z.o.x+v),`Move marker ${v<0?'left':'right'} ${ab(v)}`));K('Is this a root?',tryRoot)}
if(w==='slip'&&Z.s.k<4)SLIP[Z.s.k].l.forEach((t,i)=>K(`Line ${i+1}`,()=>slipPick(i),`Line ${i+1}: ${t}`))}
const steps=[
{h:'Read a, b and c',p:'The formula needs ax² + bx + c = 0. Make one side 0 first, then read each number with its sign.',
predict:{q:'In 2x² − 3x − 5 = 0, what is b?',opts:['3','−3'],ans:1},task:'Read all 4 equations',show:()=>auto(0,ABC.map(q=>()=>pickAbc(q.a)),650),
go:()=>into(0,'2x² − 3x − 5 = 0, with three choices for a, b and c.',()=>Z.a.k>=4,'Rearrange to = 0, then a, b and c keep their signs.')},
{h:'b² − 4ac decides',p:'Drag the curve up and down. b² − 4ac is the discriminant. Watch how many times the curve meets the x-axis.',
predict:{q:'If b² − 4ac is negative, how many real solutions are there?',opts:['One, and it is negative','None: the curve misses the axis'],ans:1},task:'See 2, 1 and 0 roots',
show:()=>auto(1,[()=>setC(1),()=>setC(2.5)],700),go:()=>into(1,'Graph of y = x² − 2x − 2 crossing the x-axis twice. Drag up or down.',()=>Z.d.seen.size>=3,'Positive: 2 roots. Zero: 1 repeated root. Negative: no real roots.')},
{h:'Run the formula',p:'x = (−b ± √(b² − 4ac)) ÷ 2a. Work it out one stage at a time for x² − 5x + 6 = 0.',
predict:{q:'Here b = −5. What is b²?',opts:['−25','25'],ans:1},task:'Finish all 5 stages',show:()=>auto(2,RUN.map(q=>()=>runPick(q.a)),600),
go:()=>into(2,'x² − 5x + 6 = 0. Stage 1: what is −b?',()=>Z.r.k>=5,'−b, then b², then 4ac, then the root, then divide the whole top by 2a.')},
{h:'Roots on the graph',p:'x² + 2x − 4 = 0 does not factorise. Drag the marker to where the curve crosses the x-axis, and compare with the formula.',task:'Find both roots',
show:()=>auto(3,R4.flatMap(r=>[()=>markX(r),()=>tryRoot()]),500),go:()=>into(3,'Graph of y = x² + 2x − 4 with a marker at x = 0. Drag it along the axis.',()=>Z.o.got.length>=2,'The formula gives −1 ± √5: about 1.24 and −3.24.')},
{h:'Catch the slip',p:'Each working has one wrong line. Tap it. Look at signs, squares, what 2a divides, and ±.',task:'Catch all 4 slips',
show:()=>auto(4,SLIP.map(q=>()=>slipPick(q.bad)),650),go:()=>into(4,'2x² + 5x − 3 = 0, three lines of working.',()=>Z.s.k>=4,'Most marks are lost on signs and on dividing only part of the top.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.ok()});
const QS=[{q:'In x² − 4x + 1 = 0, what is −b?',a:'4',o:[['−4','sign'],['1','coef']]},{q:'b = −3. What is b²?',a:'9',o:[['−9','sq'],['6','dbl']]},
{q:'b² − 4ac = −8. How many real solutions?',a:'None',o:[['Two','neg'],['One, x = −8','neg']]},{q:'x² + 6x + 9 = 0 has b² − 4ac = 0. How many solutions?',a:'One repeated root',o:[['Two','zero'],['None','zero']]},
{q:'3x² = 2x + 1. In ax² + bx + c = 0 form, what is c?',a:'−1',o:[['1','rearr'],['0','rearr']]},{q:'Which is the quadratic formula?',a:'x = (−b ± √(b² − 4ac)) ÷ 2a',o:[['x = −b ± (√(b² − 4ac) ÷ 2a)','half'],['x = (b ± √(b² − 4ac)) ÷ 2a','sign']]}];
function why(t){let m='Write it as ax² + bx + c = 0, then use x = (−b ± √(b² − 4ac)) ÷ 2a.';
if(t==='sign')m='−b flips the sign of b. b = −4, so −b = 4. The formula starts with −b.';
if(t==='coef')m='−b uses b, the number with x, not c.';
if(t==='sq')m='(−3)² = (−3) × (−3) = 9. A square is never negative.';
if(t==='dbl')m='b² means b × b, not 2 × b.';
if(t==='neg')m='A negative discriminant has no real square root, so there are no real solutions.';
if(t==='zero')m='b² − 4ac = 0 makes ± add and take away 0, so both answers are the same: one repeated root.';
if(t==='rearr')m='Make one side 0 first: 3x² − 2x − 1 = 0, so c = −1.';
if(t==='half')m='2a divides the whole top, −b as well as the root.';
return m}
function ask(){n++;const Q=QS[n%QS.length],all=[[Q.a,'ok'],...Q.o],r=n%3,ord=all.slice(r).concat(all.slice(0,r));
chq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=chq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else boo();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:S=>{chq.hidden=S.step!==5;box.hidden=S.step===5;keys()},
init:S=>{A=S;const bx=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Quadratic formula buttons'},bx);chq=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
