/* Flagship: Factor pairs and commutativity in mental calculation (ages 8-9; National Curriculum in England Year 4:
   recognise and use factor pairs and commutativity in mental calculations, e.g. 2 x 6 x 5 = 10 x 6). Split 15 into
   5 x 3 to turn 4 x 15 into 20 x 3, find every factor pair of 24 and see where they meet, reorder 5 x 7 x 2 so a ten
   comes first, pick the friendliest split for three products, and halve-and-double 16 x 5. Not flagfpair or flagcommul. */
(()=>{
VIS.reg('flagfsplit',c=>{let A,pad,quizBox,qi=-1,epoch=0;const M={};
const INK='#0f172a',YES='#047857',NO='#b91c1c',DOT='#2563eb',DOT2='#ea580c',BAD='#dc2626',CARD='#1e293b',TAU=Math.PI*2;
const PROB=[{a:5,b:18,pairs:[[2,9],[3,6]],best:0},{a:25,b:12,pairs:[[2,6],[4,3]],best:1},{a:5,b:14,pairs:[[2,7],[1,14]],best:0}];
const now=()=>['split','pairs','order','best','half','chal'][A.step];
const lim=(v,a,b)=>v<a?a:v>b?b:v;
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=lim(x-w/2,4,A.W-w-4);
 g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eef2ff',A.col.dark?.08:.7);g.fillRect(0,0,A.W,A.H)}
/* step 0: 4 rows of 15, cut into equal column groups of size s */
function drawSplit(){const S=M.s,g=A.ctx;bg();const cols=15,rows=4,gaps=S.s?Math.ceil(cols/S.s)-1:0,cell=Math.min((A.W-24-gaps*8)/cols,A.H*.42/rows),x0=(A.W-(cell*cols+gaps*8))/2,y0=A.H*.3;
 for(let i=0;i<cols;i++){const gi=S.s?Math.floor(i/S.s):0,left=S.s&&cols%S.s&&gi===Math.floor((cols-1)/S.s),x=x0+i*cell+gi*8;
  for(let r=0;r<rows;r++){g.fillStyle=left?BAD:gi%2?DOT2:DOT;g.beginPath();g.arc(x+cell/2,y0+r*cell+cell/2,cell*.34,0,TAU);g.fill()}}
 if(S.s){const n=Math.ceil(cols/S.s);for(let k=0;k<n;k++){const w=Math.min(S.s,cols-k*S.s),x=x0+k*(S.s*cell+8);g.strokeStyle=cols%S.s&&k===n-1?BAD:A.col.tx;g.lineWidth=2;A.paint.rrect(x-2,y0-4,w*cell+4,rows*cell+8,8);g.stroke()}}
 pill(S.s?(15%S.s?`Groups of ${S.s}: ${15%S.s} left over`:`4 × 15 = 4 × ${S.s} × ${15/S.s} = ${4*S.s} × ${15/S.s} = 60`):'4 × 15: 4 rows of 15 dots',A.W/2,A.H*.12,{ok:S.done,no:S.s&&15%S.s});
 pill('Drag along the dots to set the group size',A.W/2,A.H*.9,{f:12})}
function group(s,quiet){const S=M.s;s=lim(Math.round(s),1,15);if(s===S.s&&quiet)return;S.s=s;if(s===5)S.done=1;A.sound.tick();if(quiet)return A.redraw();splitMsg()}
function splitMsg(){const s=M.s.s;say(15%s?`${s} is not a factor of 15. Groups of ${s} leave ${15%s} columns over, shown in red.`:s===5?'15 = 5 × 3. Each group is 4 × 5 = 20 dots, and there are 3 groups: 20 × 3 = 60. So 4 × 15 = 60.':
 s===15||s===1?`One way to see it: 15 = ${s} × ${15/s}, but that does not make the sum any easier.`:`15 = ${s} × ${15/s}. Each group is 4 × ${s} = ${4*s}, and ${4*s} × ${15/s} = 60. True, but is there a split that makes a 20?`)}
/* step 1: factor pairs of 24 on a number line */
function lineX(n){return 14+(n-1)*(A.W-28)/23}
function drawPairs(){const P=M.p,g=A.ctx;bg();const y=A.H*.72;g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(10,y);g.lineTo(A.W-10,y);g.stroke();
 P.found.forEach(([a,b],k)=>{const x1=lineX(a),x2=lineX(b);g.strokeStyle=[DOT,DOT2,YES,'#7c3aed'][k%4];g.lineWidth=3;g.beginPath();g.ellipse((x1+x2)/2,y,(x2-x1)/2,Math.min(A.H*.5,(x2-x1)/2),0,Math.PI,TAU);g.stroke()});
 g.font=`700 ${A.narrow?10:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';
 for(let n=1;n<=24;n++){const x=lineX(n),f=P.found.some(([a,b])=>a===n||b===n),no=P.no.has(n);g.fillStyle=f?YES:no?'#94a3b8':A.col.tx;g.beginPath();g.arc(x,y,f?5:3,0,TAU);g.fill();
  if(A.narrow?(n<=8||n%4===0):1){g.fillStyle=A.col.tx;g.fillText(String(n),x,y+8)}}
 pill(P.found.map(([a,b])=>`${a}×${b}`).join('  ')||'Factor pairs of 24',A.W/2,A.H*.08,{ok:P.done,f:A.narrow?13:16});
 pill(P.done?'They met in the middle: all 4 pairs found':`Next to try: ${P.n}`,A.W/2,A.H*.9,{f:12,ok:P.done})}
function tryN(n){const P=M.p;if(P.done)return;n=n||P.n;if(n!==P.n){A.sound.miss();return say(`Try the numbers in order, so none is missed. Next is ${P.n}.`)}
 P.n++;if(24%n){P.no.add(n);A.sound.tick();return say(`24 ÷ ${n} leaves a remainder, so ${n} is not a factor of 24.`)}
 const m=24/n;if(m<n){P.done=1;A.sound.pop();return say(`${n} × ${m} = 24, but that is ${m} × ${n} turned round. The pairs have met in the middle, so all 4 pairs are found: 1×24, 2×12, 3×8, 4×6.`)}
 P.found.push([n,m]);A.sound.pop();say(`${n} × ${m} = 24. ${n} and ${m} are a factor pair of 24.`)}
/* step 2: reorder three cards */
function slots(){const w=Math.min(110,A.W*.24),gap=(A.W-w*3)/4;return[0,1,2].map(i=>({i,x:gap+i*(w+gap),y:A.H*.32,w,h:w*.8}))}
function drawOrder(){const O=M.o,g=A.ctx;bg();const S=slots(),[a,b,c3]=O.c;
 g.strokeStyle=YES;g.lineWidth=3;A.paint.rrect(S[0].x-8,S[0].y-8,S[1].x+S[1].w-S[0].x+16,S[0].h+16,14);g.stroke();
 S.forEach((s,i)=>{g.fillStyle=O.sel===i?'#7c3aed':CARD;A.paint.rrect(s.x,s.y,s.w,s.h,12);g.fill();g.fillStyle='#ffffff';g.font=`800 ${A.narrow?28:36}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(O.c[i]),s.x+s.w/2,s.y+s.h/2);
  if(i<2){g.fillStyle=A.col.tx;g.font=`800 ${A.narrow?20:26}px system-ui,sans-serif`;g.fillText('×',(s.x+s.w+S[i+1].x)/2,s.y+s.h/2)}});
 pill('Do this pair first',(S[0].x+S[1].x+S[1].w)/2,S[0].y-22,{f:11});pill(`(${a} × ${b}) × ${c3} = ${a*b} × ${c3} = ${a*b*c3}`,A.W/2,A.H*.72,{ok:O.done,f:A.narrow?15:18});
 pill('Tap two cards to swap them',A.W/2,A.H*.9,{f:12})}
function swap(i,j){const O=M.o;[O.c[i],O.c[j]]=[O.c[j],O.c[i]];O.sel=-1;O.moves++;const p=O.c[0]*O.c[1];if(p%10===0)O.done=1;A.sound.pop();
 say(`(${O.c[0]} × ${O.c[1]}) × ${O.c[2]} = ${p} × ${O.c[2]} = ${p*O.c[2]}.`+(O.done?' 5 × 2 makes 10 first, so the rest is easy. The answer did not change.':' Same answer, 70. Can you make a 10 first?'))}
function pickCard(i){const O=M.o;if(O.sel<0){O.sel=i;A.sound.tick();return say(`${O.c[i]} picked. Tap another card to swap with it.`)}if(O.sel===i){O.sel=-1;return say('Card put back.')}swap(O.sel,i)}
/* step 3: pick the friendly split */
function drawBest(){const B=M.b,g=A.ctx;bg();const P=PROB[Math.min(B.k,2)];
 pill(B.k>=3?'All 3 worked out':`${B.k+1} of 3: ${P.a} × ${P.b}`,A.W/2,A.H*.1,{ok:B.k>=3,f:A.narrow?16:20});
 if(B.k<3){pill(`Split ${P.b} into a factor pair:`,A.W/2,A.H*.28,{f:13});chips().forEach(ch=>{g.fillStyle=B.bad===ch.j?'#7f1d1d':CARD;A.paint.rrect(ch.x,ch.y,ch.w,ch.h,12);g.fill();g.fillStyle='#ffffff';g.font=`800 ${A.narrow?18:22}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(`${P.b} = ${ch.p[0]} × ${ch.p[1]}`,ch.x+ch.w/2,ch.y+ch.h/2)})}
 if(B.k>=3)B.log.forEach((t,j)=>pill(t,A.W/2,A.H*(.32+j*.18),{f:A.narrow?14:18,ok:1}));else if(B.last)pill(B.last,A.W/2,A.H*.86,{f:A.narrow?12:15,ok:B.lastOk})}
function chips(){const P=PROB[Math.min(M.b.k,2)],w=Math.min(190,A.W*.42),gap=(A.W-2*w)/3;return P.pairs.map((p,j)=>({j,p,x:gap+j*(w+gap),y:A.H*.42,w,h:A.H*.22}))}
function choose(j){const B=M.b;if(B.k>=3)return;const P=PROB[B.k],[x,y]=P.pairs[j],f=P.a*x;
 if(j!==P.best){B.bad=j;A.sound.miss();B.last=`${P.a} × ${x} = ${f}: true, but not a 10 or 100`;B.lastOk=0;return say(`That split is true: ${P.a} × ${x} × ${y} = ${f} × ${y}. But ${f} is not a 10 or a 100. Find the pair that makes one.`)}
 B.bad=-1;B.k++;B.lastOk=1;B.last=`${P.a} × ${x} × ${y} = ${f} × ${y} = ${f*y}`;B.log.push(`${P.a} × ${P.b} = ${f} × ${y} = ${f*y}`);A.sound.pop();say(`${P.a} × ${P.b} = ${P.a} × ${x} × ${y} = ${f} × ${y} = ${f*y}.`)}
/* step 4: halve one factor, double the other */
function drawHalf(){const H=M.h,g=A.ctx;bg();const [r,cl]=[H.r,H.c],cell=Math.min((A.W-30)/Math.max(cl,10),A.H*.5/Math.max(r,5)),x0=(A.W-cell*cl)/2,y0=A.H*.22;
 for(let i=0;i<cl;i++)for(let j=0;j<r;j++){g.fillStyle=j>=r/2&&H.n?DOT2:DOT;g.beginPath();g.arc(x0+i*cell+cell/2,y0+j*cell+cell/2,cell*.34,0,TAU);g.fill()}
 pill(`${cl} × ${r} = ${cl*r}`,A.W/2,A.H*.1,{ok:H.done,f:A.narrow?16:20});pill(H.done?'Same dots, easier sum':'Drag down to halve and double',A.W/2,A.H*.9,{f:12,ok:H.done})}
function halve(){const H=M.h;if(H.c%2){A.sound.miss();return say(`${H.c} is odd, so it cannot be halved into whole columns. Stop here.`)}H.c/=2;H.r*=2;H.n++;if(H.r%10===0)H.done=1;A.sound.pop();
 say(`Cut the ${H.c*2} columns in half and stack the halves: ${H.c} × ${H.r}. Still ${H.c*H.r} dots.`+(H.done?` ${H.c} × 10 is easy: ${H.c*10}.`:''))}
function undoHalf(){const H=M.h;if(!H.n)return;H.c*=2;H.r/=2;H.n--;H.done=0;A.sound.tick();say(`Back to ${H.c} × ${H.r}.`)}
function draw(){const k=now();if(k==='chal'){bg();pill('Challenge',A.W/2,A.H*.12,{ok:1});pill('4 × 15 = 4 × 5 × 3 = 20 × 3',A.W/2,A.H*.5,{f:A.narrow?16:22});return}
 ({split:drawSplit,pairs:drawPairs,order:drawOrder,best:drawBest,half:drawHalf})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();if(k==='split'){M.drag=1;move(p);return true}if(k==='half'){M.drag=1;M.y0=p.y;return true}
 if(k==='pairs'){let n=Math.round((p.x-14)/((A.W-28)/23))+1;tryN(lim(n,1,24));return false}
 if(k==='order'){const s=slots().find(s=>p.x>s.x&&p.x<s.x+s.w&&p.y>s.y&&p.y<s.y+s.h);if(s)pickCard(s.i);return false}
 if(k==='best'){const ch=chips().find(s=>p.x>s.x&&p.x<s.x+s.w&&p.y>s.y&&p.y<s.y+s.h);if(ch)choose(ch.j);return false}return false}
function move(p){if(!M.drag)return;const k=now();if(k==='split'){const cell=(A.W-24)/15;group(Math.floor((p.x-12)/cell)+1,1)}}
function up(p){if(!M.drag)return;M.drag=0;const k=now();if(k==='split'&&M.s.s)splitMsg();if(k==='half'&&p&&p.y-M.y0>A.H*.12)halve()}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{s:{s:0,done:0},p:{n:1,found:[],no:new Set(),done:0},o:{c:[5,7,2],sel:-1,moves:0,done:0},b:{k:0,bad:-1,last:'',lastOk:0,log:[]},h:{c:16,r:5,n:0,done:0},drag:0,hit:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.hit()}
const goal=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){fresh();say(desc);M.hit=goal(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='split')[3,4,5].forEach(s=>B(`Groups of ${s}`,()=>group(s),`Split the 15 columns into groups of ${s}`));
 if(k==='pairs'&&!M.p.done){B(`Try ${M.p.n}`,()=>tryN(),`Test whether ${M.p.n} is a factor of 24`)}
 if(k==='order'){B('Swap 1st and 2nd',()=>swap(0,1));B('Swap 2nd and 3rd',()=>swap(1,2));B('Swap 1st and 3rd',()=>swap(0,2))}
 if(k==='best'&&M.b.k<3)PROB[M.b.k].pairs.forEach((p,j)=>B(`${PROB[M.b.k].b} = ${p[0]} × ${p[1]}`,()=>choose(j),`Split ${PROB[M.b.k].b} into ${p[0]} times ${p[1]}`));
 if(k==='half'){B('Halve and double',halve,'Halve the columns and double the rows');B('Undo',undoHalf)}}
const steps=[
{h:'Split a factor',p:'4 × 15 is 4 rows of 15 dots. Drag across the dots, or tap a button, to cut the 15 columns into equal groups.',
 predict:{q:'Is 4 × 15 the same as 4 × 5 × 3?',opts:['Yes, because 5 × 3 = 15','No, it is 4 × 5 + 3','No, it is smaller'],ans:0},task:'Find the groups that make 4 × 15 easy',
 show:()=>demo(0,[()=>group(4),()=>group(3),()=>group(5)],750),
 go:()=>enter(0,'An array of 4 rows of 15 dots.',()=>M.s.done,'Split 15 into the factor pair 5 × 3. Then 4 × 5 = 20, and 20 × 3 = 60.')},
{h:'Every factor pair of 24',p:'Test 1, 2, 3 and on. Each number that divides 24 exactly gets an arc to its partner. Tap the line, or tap Try.',
 predict:{q:'You found 4 × 6 = 24. Is 6 × 4 a new factor pair?',opts:['Yes, it is a new pair','No, it is the same pair turned round'],ans:1},task:'Find every factor pair of 24',
 show:()=>demo(1,[1,2,3,4,5,6].map(()=>()=>tryN()),450),
 go:()=>enter(1,'A number line from 1 to 24.',()=>M.p.done,'24 has 4 factor pairs: 1 × 24, 2 × 12, 3 × 8 and 4 × 6. Stop when the pairs meet in the middle.')},
{h:'Change the order',p:'The green box is worked out first. Tap two cards to swap them, or use the buttons.',
 predict:{q:'Does changing the order of 5 × 7 × 2 change the answer?',opts:['No, it is still 70','Yes, it gets bigger','Yes, it gets smaller'],ans:0},task:'Put the pair that makes 10 first',
 show:()=>demo(2,[()=>swap(1,2)],700),
 go:()=>enter(2,'Three cards: 5, 7 and 2, with a box round the first two.',()=>M.o.done,'Multiplication is commutative, so you can change the order. Make a 10 first: 5 × 2 × 7 = 10 × 7 = 70.')},
{h:'Pick the best split',p:'Split the second number into a factor pair that makes a 10 or 100 with the first.',task:'Work out all 3 with a friendly split',
 show:()=>demo(3,PROB.map(P=>()=>choose(P.best)),650),
 go:()=>enter(3,'A multiplication and two ways to split its second number.',()=>M.b.k>=3,'Look for a factor that makes 10 or 100 with the other number: 5 and 2, or 25 and 4.')},
{h:'Halve and double',p:'16 × 5. Drag down on the dots, or tap Halve and double: cut the columns in half and stack them.',
 predict:{q:'Is 16 × 5 the same as 8 × 10?',opts:['Yes: 16 = 8 × 2, and 2 × 5 = 10','No, 8 × 10 is bigger','No, you must take 8 off both'],ans:0},task:'Turn 16 × 5 into a times-10 fact',
 show:()=>demo(4,[()=>halve()],700),
 go:()=>enter(4,'An array of 5 rows of 16 dots.',()=>M.h.done,'Halving one factor and doubling the other keeps the product the same: 16 × 5 = 8 × 10 = 80.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hit()});
const QS=[
 {q:'4 × 15 is the same as…',a:'4 × 5 × 3',o:[['4 × 5 + 3','add'],['4 × 10 × 5','notf']]},
 {q:'Which is a factor pair of 24?',a:'3 and 8',o:[['5 and 19','sum'],['4 and 5','notf']]},
 {q:'How many factor pairs does 24 have?',a:'4',o:[['8','dup'],['3','one']]},
 {q:'Is 7 × 2 × 5 the same as 2 × 5 × 7?',a:'Yes, both are 70',o:[['No, the order changes it','order'],['Only if you add them','order']]},
 {q:'Is 12 ÷ 3 the same as 3 ÷ 12?',a:'No, division has no swap rule',o:[['Yes, order never matters','div'],['Yes, both are 4','div']]},
 {q:'16 × 5 is the same as…',a:'8 × 10',o:[['15 × 6','comp'],['16 × 10','half']]}];
function why(t){let m='Check that the factors still multiply to the same product.';
 if(t==='add')m='4 × 5 + 3 is only 23. The 3 must be multiplied: 4 × 5 × 3 = 20 × 3 = 60.';
 if(t==='notf')m='Those numbers do not multiply to the one you split. A factor pair must multiply back to it exactly.';
 if(t==='sum')m='5 + 19 = 24, but a factor pair multiplies: 5 × 19 = 95. Try 3 × 8.';
 if(t==='dup')m='6 × 4 is 4 × 6 turned round, so it is the same pair. 24 has 4 pairs.';
 if(t==='one')m='Do not forget 1 × 24. Every number has 1 and itself as a factor pair.';
 if(t==='order')m='Multiplication is commutative: you can change the order of the factors and the product stays the same.';
 if(t==='div')m='12 ÷ 3 = 4, but 3 ÷ 12 is less than 1. Only multiplication and addition let you swap the order.';
 if(t==='comp')m='Taking 1 from one factor and giving it to the other changes the product: 15 × 6 = 90, not 80.';
 if(t==='half')m='If you double 5 to 10, you must halve 16 to 8. 16 × 10 is twice as much.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:B=>{quizBox.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Multiplication controls'},wrap);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
