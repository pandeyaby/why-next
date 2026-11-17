/* Flagship: critical regions and critical values (ages 16–18; A level Mathematics statistics, binomial hypothesis tests).
   Under H₀, X ~ B(20, 0.3). Drag the boundary to build the biggest upper tail that stays within 5%, read the critical
   value from a cumulative table for an upper and a lower tail, split α between two tails, decide tests from observed
   values (including the critical value itself), and find the actual significance level. Buttons do every action too. */
(()=>{
const {N,ALPHA,PMF,le,ge,K,TABLE,DECIDE,ACTUAL,QS}=CRITRART;
const pc=v=>(100*v).toFixed(2)+'%',d4=v=>v.toFixed(4);
const XMAX=16;
VIS.reg('flagcritr',c=>{let A,Q,ctl,ask,qi=-1,seq=0;const T={after:()=>{}};
const s=n=>Math.round(n*Math.min(1.2,Math.max(1,A.W/380)));
const speak=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
const stage=()=>['up','table','two','decide','actual','quiz'][A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function f(n,w){Q.font=`${w||700} ${s(n)}px system-ui,sans-serif`}
function say(t,x,y,n,col,w,al){f(n,w);Q.fillStyle=col||K.ink;Q.textAlign=al||'center';Q.textBaseline='middle';Q.fillText(String(t),x,y)}
function split(t,maxW,n){f(n,700);const L=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&Q.measureText(nx).width>maxW){L.push(cur);cur=w}else cur=nx}L.push(cur);return L}
function rr(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,9);Q.fillStyle=fill;Q.fill();if(edge){Q.lineWidth=lw||2;Q.strokeStyle=edge;Q.stroke()}}
function title(t,won){const L=split(t,A.W-44,13),lh=s(13)+4,h=L.length*lh+12;rr(12,10,A.W-24,h,won?K.okBg:K.hint,won?K.ok:K.axis,2);L.forEach((r,i)=>say(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 10+h}
function verdict(){if(!T.msg)return;const L=split((T.bad?'✗ ':'✓ ')+T.msg,A.W-48,13),lh=s(13)+5,h=L.length*lh+12,y=A.H-h-8;rr(12,y,A.W-24,h,'#ffffff',T.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+6+lh*(i+.5),13,T.bad?K.no:K.ink))}
const boo=m=>{T.bad=true;T.msg=m;A.sound.miss();sync()};
const ok=m=>{T.bad=false;T.msg=m;A.sound.pop()};
/* bar chart of P(X = x) under H₀ with the critical region shaded; returns the plot frame for pointer mapping */
function chart(top,bot,lo,hi,obs){const L=s(30),R=A.W-s(14),B=bot-s(22),H=B-top-s(8),bw=(R-L)/(XMAX+1),mx=.2;
 Q.strokeStyle=K.axis;Q.lineWidth=1.5;Q.beginPath();Q.moveTo(L,top);Q.lineTo(L,B);Q.lineTo(R,B);Q.stroke();
 [0,.1,.2].forEach(v=>{const y=B-H*v/mx;say(v.toFixed(1),L-s(4),y,10,K.dim,600,'right')});
 for(let x=0;x<=XMAX;x++){const inCR=x<=lo||x>=hi,h=H*PMF[x]/mx,bx=L+x*bw+bw*.12;Q.fillStyle=inCR?K.hot:K.bar;Q.fillRect(bx,B-h,bw*.76,h);Q.strokeStyle=inCR?K.hot:K.barEdge;Q.lineWidth=1;Q.strokeRect(bx,B-h,bw*.76,h);
  if(x%2===0||A.W>420)say(x,L+x*bw+bw/2,B+s(10),10,x===obs?K.sel:K.dim,x===obs?900:600)}
 if(obs!=null){const ox=L+obs*bw+bw/2;Q.strokeStyle=K.sel;Q.lineWidth=3;Q.beginPath();Q.moveTo(ox,top);Q.lineTo(ox,B);Q.stroke();say('observed',Math.min(R-s(30),Math.max(L+s(30),ox)),top-s(6),11,K.sel,800)}
 return{L,R,B,bw,top}}
function handle(fr,x,label){const hx=fr.L+x*fr.bw;Q.strokeStyle=K.ink;Q.lineWidth=2.5;Q.setLineDash([5,4]);Q.beginPath();Q.moveTo(hx,fr.top);Q.lineTo(hx,fr.B);Q.stroke();Q.setLineDash([]);
 rr(hx-s(22),fr.B-s(4)-s(0)+s(18),s(44),s(24),K.selBg,K.sel,2);say(label,hx,fr.B+s(26),11,K.sel,900)}
function meter(y,label,v,lim){const w=A.W-s(40),x=s(20),full=Math.max(lim*2.2,v*1.05),fill=Math.min(1,v/full);rr(x,y,w,s(14),'#ffffff',K.axis,1.5);Q.fillStyle=v<=lim+1e-12?K.ok:K.no;Q.fillRect(x+2,y+2,(w-4)*fill,s(14)-4);
 const lx=x+w*lim/full;Q.strokeStyle=K.ink;Q.lineWidth=2;Q.beginPath();Q.moveTo(lx,y-4);Q.lineTo(lx,y+s(14)+4);Q.stroke();say(label+' = '+pc(v),x,y-s(9),12,v<=lim+1e-12?K.ok:K.no,800,'left');say(pc(lim),lx,y+s(24),10,K.ink,800)}
/* step 0: the biggest upper tail within α */
function setUp(c){if(T.won)return;T.c=Math.max(1,Math.min(XMAX,c));T.msg='';T.bad=false}
function lockUp(){if(T.won)return;const c=T.c,t=ge(c);if(t>ALPHA+1e-12)return boo(`P(X ≥ ${c}) = ${pc(t)} is more than 5%. Too much of the H₀ model is in the region: move the boundary right.`);
 if(ge(c-1)<=ALPHA+1e-12)return boo(`P(X ≥ ${c-1}) = ${pc(ge(c-1))} is still within 5%, so ${c-1} belongs in the region too. Move left.`);
 ok(`Critical region X ≥ ${c}; critical value ${c}. P(X ≥ ${c}) = ${pc(t)} ≤ 5%, but adding ${c-1} would give ${pc(ge(c-1))}.`);T.won=true;sync()}
/* step 1: read the table */
function pickRow(x){if(T.won)return;const tk=TABLE[T.i];if(tk[3]==='up'){if(x<tk[2])return boo(`Starting at ${x+1}: P(X ≥ ${x+1}) = 1 − ${d4(le(x))} = ${pc(ge(x+1))}, more than 5%.`);
  if(x>tk[2])return boo(`Starting at ${x+1} is within 5%, but X = ${x} could join: P(X ≥ ${x}) = ${pc(ge(x))} is still within 5%.`);ok(`1 − P(X ≤ 9) = 1 − 0.9520 = 4.80%. The region starts one above the row: X ≥ 10.`)}
 else{if(x>tk[2])return boo(`P(X ≤ ${x}) = ${d4(le(x))}, which is more than 0.05.`);if(x<tk[2])return boo(`P(X ≤ ${x+1}) = ${d4(le(x+1))} is still within 0.05, so ${x+1} joins the region.`);ok('P(X ≤ 2) = 0.0355 ≤ 0.05 and P(X ≤ 3) = 0.1071 is not. Lower region X ≤ 2: here the row is the critical value.')}
 T.i++;if(T.i===TABLE.length){T.won=true;T.msg='Upper tail: one above the row. Lower tail: the row itself.'}sync()}
/* step 2: two tails, α/2 each */
function setTwo(which,v){if(T.won)return;if(which)T.c=Math.max(T.l+2,Math.min(XMAX,v));else T.l=Math.max(-1,Math.min(T.c-2,v));T.msg='';T.bad=false}
function lockTwo(){if(T.won)return;const a=ALPHA/2,lo=le(T.l),hi=ge(T.c);
 if(lo>a+1e-12)return boo(`Lower tail P(X ≤ ${T.l}) = ${pc(lo)} is over 2.5%. Each tail gets half of 5%.`);if(hi>a+1e-12)return boo(`Upper tail P(X ≥ ${T.c}) = ${pc(hi)} is over 2.5%. Each tail gets half of 5%.`);
 if(le(T.l+1)<=a+1e-12)return boo(`The lower tail can grow: P(X ≤ ${T.l+1}) = ${pc(le(T.l+1))} is still within 2.5%.`);if(ge(T.c-1)<=a+1e-12)return boo(`The upper tail can grow: P(X ≥ ${T.c-1}) = ${pc(ge(T.c-1))} is still within 2.5%.`);
 ok(`X ≤ ${T.l} or X ≥ ${T.c}. Each tail is within 2.5%; together ${pc(lo+hi)}.`);T.won=true;sync()}
/* step 3: decide */
function decide(rej){if(T.won)return;const d=DECIDE[T.i],inCR=d[3]<=d[1]||d[3]>=d[2];if(rej!==inCR)return boo(inCR?`${d[3]} is in the critical region ${d[0]}${d[3]===d[1]||d[3]===d[2]?': the critical value itself is inside':''}, so reject H₀.`:`${d[3]} is not in ${d[0]}, so there is not enough evidence: do not reject H₀.`);
 ok(`X = ${d[3]}: ${inCR?'in the region, reject H₀':'outside the region, do not reject H₀'}.`);T.i++;if(T.i===DECIDE.length){T.won=true;T.msg='In the region, including the critical value: reject. Outside: do not reject.'}sync()}
/* step 4: actual significance level */
function actual(k){if(T.won)return;const a=ACTUAL[T.i];if(k)return boo(a[4][k-1]);ok(`${a[0]}: actual significance level ${a[3][0]}.`);T.i++;if(T.i===ACTUAL.length){T.won=true;T.msg='The actual level is the probability of the region under H₀, at or below α.'}sync()}
const rot=i=>[0,1,2].map(k=>(k+i)%3);
function drawUp(t,b){meter(t+s(26),`P(X ≥ ${T.c})`,ge(T.c),ALPHA);const fr=chart(t+s(64),b-s(18),-1,T.c);T.frame=fr;handle(fr,T.c,'X ≥ '+T.c)}
function drawTable(t,b){const tk=TABLE[Math.min(T.i,TABLE.length-1)];const L=split(tk[0],A.W-40,13);L.forEach((r,i)=>say(r,A.W/2,t+s(16)+i*s(17),13,K.dim,800));let y=t+s(16)+L.length*s(17)+s(4);
 const rh=Math.min(s(34),(b-y-s(8))/(tk[1].length+1)),w=Math.min(A.W-s(40),s(300)),x=(A.W-w)/2;rr(x,y,w,rh,K.selBg,K.sel,1.5);say('x',x+w*.25,y+rh/2,13,K.sel,900);say('P(X ≤ x)',x+w*.7,y+rh/2,13,K.sel,900);y+=rh;
 T.rows=tk[1].map(r=>{const done=T.won||(T.i>0&&tk===TABLE[0]),box={x,y,w,h:rh-2,r};rr(x,y,w,rh-2,'#ffffff',K.axis,1.2);say(r,x+w*.25,y+rh/2,14,K.ink,800);say(d4(le(r)),x+w*.7,y+rh/2,14,K.ink,800);y+=rh;return box})}
function drawTwo(t,b){meter(t+s(24),`P(X ≤ ${T.l})`,le(T.l),ALPHA/2);meter(t+s(68),`P(X ≥ ${T.c})`,ge(T.c),ALPHA/2);const fr=chart(t+s(104),b-s(18),T.l,T.c);T.frame=fr;handle(fr,T.l+1,'X ≤ '+T.l);handle(fr,T.c,'X ≥ '+T.c)}
function drawDecide(t,b){const d=DECIDE[Math.min(T.i,DECIDE.length-1)];say(`Critical region: ${d[0]}`,A.W/2,t+s(16),15,K.hot,900);say(T.won?'All six decided.':`Observed: X = ${d[3]}`,A.W/2,t+s(38),15,K.sel,900);
 const bh=s(52),fr=chart(t+s(66),b-bh-s(28),d[1],d[2],T.won?null:d[3]);const w=(A.W-s(48))/2,y=b-bh-s(4);
 T.tiles=T.won?[]:['Reject H₀','Do not reject H₀'].map((l,k)=>{const r={x:s(16)+k*(w+s(16)),y,w,h:bh,k};rr(r.x,y,w,bh,k?'#ffffff':K.hotBg,k?K.axis:K.hot,2.5);say(l,r.x+w/2,y+bh/2,16,K.ink,900);return r})}
function drawActual(t,b){const a=ACTUAL[Math.min(T.i,ACTUAL.length-1)];say(T.won?'All three found.':`Critical region: ${a[0]}`,A.W/2,t+s(16),15,K.hot,900);const bh=s(50),fr=chart(t+s(40),b-bh-s(30),a[1],a[2]);
 const w=(A.W-s(16)*4)/3,y=b-bh-s(4);T.tiles=T.won?[]:rot(T.i).map((k,j)=>{const r={x:s(16)+j*(w+s(16)),y,w,h:bh,k};rr(r.x,y,w,bh,'#ffffff',K.sel,2.5);say(a[3][k],r.x+w/2,y+bh/2,17,K.ink,900);return r})}
function draw(){Q.fillStyle=A.col.dark?'#0f172a':K.paper;Q.fillRect(0,0,A.W,A.H);Q.fillStyle=K.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);Q.fill();
 const g=stage(),H={up:['H₁: p > 0.3 at 5%. Drag the boundary, then Lock in.','Upper critical region found.'],table:['Use the cumulative table.','Table read both ways.'],two:['H₁: p ≠ 0.3 at 5%. Drag both boundaries, then Lock in.','Two-tailed region found.'],
  decide:['Is the observed value in the critical region?','All decided.'],actual:['What is the actual significance level?','Actual levels found.'],quiz:['Critical regions for X ~ B(20, 0.3).','']};
 const t=title(H[g][T.won?1:0]||H[g][0],T.won),b=A.H-(T.msg?s(74):s(10));
 if(g==='up')drawUp(t,b);if(g==='table')drawTable(t,b);if(g==='two')drawTwo(t,b);if(g==='decide')drawDecide(t,b);if(g==='actual')drawActual(t,b);
 if(g==='quiz')split('Upper: X ≥ 10 (4.80%). Lower: X ≤ 2 (3.55%). Two-tailed: X ≤ 1 or X ≥ 11 (2.48%).',A.W-40,15).forEach((r,i)=>say(r,A.W/2,t+s(30)+i*s(24),15,K.dim,700));verdict();A.fx.draw(Q)}
/* map a pointer to a boundary position on the chart */
const slot=p=>{const fr=T.frame;return fr?Math.round((p.x-fr.L)/fr.bw):null};
function down(p){const g=stage();if(T.won)return false;
 if((g==='up'||g==='two')&&T.frame&&p.y>T.frame.top-s(10)){const v=slot(p);if(g==='up'){T.grab='c';setUp(v)}else{T.grab=Math.abs(v-(T.l+1))<Math.abs(v-T.c)?'l':'c';T.grab==='l'?setTwo(0,v-1):setTwo(1,v)}sync();return true}
 if(g==='table'){const r=(T.rows||[]).find(q=>inside(p,q));if(r){pickRow(r.r);return true}}
 const r=(T.tiles||[]).find(q=>inside(p,q));if(!r)return false;if(g==='decide')decide(r.k===0);if(g==='actual')actual(r.k);return true}
function move(p){if(!T.grab)return;const v=slot(p);if(stage()==='up')setUp(v);else T.grab==='l'?setTwo(0,v-1):setTwo(1,v);sync()}
function up(){T.grab=null}
function sync(){const g=stage();let d='Challenge.';
 if(g==='up')d=T.won?`Critical region X ≥ ${T.c}.`:`Boundary at X ≥ ${T.c}. P(X ≥ ${T.c}) = ${pc(ge(T.c))}. Limit 5%.`;
 if(g==='table'){const tk=TABLE[Math.min(T.i,1)];d=T.won?'Both table tasks done.':`${tk[0]} Rows: ${tk[1].map(x=>`x = ${x}, P(X ≤ x) = ${d4(le(x))}`).join('; ')}.`}
 if(g==='two')d=T.won?`Region X ≤ ${T.l} or X ≥ ${T.c}.`:`Lower tail X ≤ ${T.l}: ${pc(le(T.l))}. Upper tail X ≥ ${T.c}: ${pc(ge(T.c))}. Limit 2.5% each.`;
 if(g==='decide')d=T.won?'All six decided.':`Critical region ${DECIDE[T.i][0]}. Observed X = ${DECIDE[T.i][3]}. Reject H₀ or not?`;
 if(g==='actual')d=T.won?'All three found.':`Critical region ${ACTUAL[T.i][0]}. Options: ${rot(T.i).map(k=>ACTUAL[T.i][3][k]).join(', ')}.`;
 speak((T.msg?T.msg+' ':'')+d);bar();T.after()}
function bar(){if(!ctl)return;ctl.innerHTML='';const g=stage(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=()=>{fn();sync()}};if(T.won)return A.redraw();
 if(g==='up'){b('◀ Boundary left',()=>setUp(T.c-1));b('Boundary right ▶',()=>setUp(T.c+1));b('Lock in',lockUp)}
 if(g==='table')TABLE[T.i][1].forEach(x=>b(`Row x = ${x}`,()=>pickRow(x)));
 if(g==='two'){b('Lower ◀',()=>setTwo(0,T.l-1));b('Lower ▶',()=>setTwo(0,T.l+1));b('Upper ◀',()=>setTwo(1,T.c-1));b('Upper ▶',()=>setTwo(1,T.c+1));b('Lock in',lockTwo)}
 if(g==='decide'){b('Reject H₀',()=>decide(true));b('Do not reject H₀',()=>decide(false))}
 if(g==='actual')rot(T.i).forEach(k=>b(ACTUAL[T.i][3][k],()=>actual(k)));A.redraw()}
const ready=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++seq;fns.forEach((fn,j)=>setTimeout(()=>{if(id===seq){fn();sync()}},(j+1)*(A.reduced()?60:ms)))};
function init0(c0,l0){seq++;Object.assign(T,{after:()=>{},won:false,msg:'',bad:false,i:0,c:c0||14,l:l0==null?-1:l0,grab:null,rows:[],tiles:[]})}
const steps=[
{h:'Build the critical region',p:'The critical region holds the results that lead you to reject H₀. For H₁: p > 0.3, it is an upper tail X ≥ c, as big as possible while P(X ≥ c) stays at or below α.',
predict:{q:'At 5%, P(X ≥ c) for the critical region should be…',opts:['As close to 5% as possible, either side','As big as possible but no more than 5%','Exactly 5%'],ans:1},
task:'Find the 5% upper critical region',show:()=>{steps[0].go();replay([15,14,13,12,11,10].map(v=>()=>setUp(v)).concat([lockUp]),330)},go:()=>{init0(14);sync();T.after=ready(0,()=>T.won,'Critical value 10.')}},
{h:'Read it from the table',p:'Tables give P(X ≤ x). For an upper tail, find the first row with P(X ≤ x) ≥ 0.95; the critical value is one above it. For a lower tail, the last row with P(X ≤ x) ≤ 0.05 is the critical value.',
predict:{q:'P(X ≤ 9) = 0.9520. What is the upper critical value at 5%?',opts:['9','10','0.9520'],ans:1},
task:'Read 2 critical values',show:()=>{steps[1].go();replay(TABLE.map(tk=>()=>pickRow(tk[2])),700)},go:()=>{init0(14);sync();T.after=ready(1,()=>T.won,'Upper X ≥ 10, lower X ≤ 2.')}},
{h:'Two tails share α',p:'For H₁: p ≠ 0.3, results far out on either side count. Split α in half: each tail may hold at most 2.5% at the 5% level.',
predict:{q:'Two-tailed test at 5%. Each tail may hold at most…',opts:['5%','2.5%','10%'],ans:1},
task:'Find the two-tailed region',show:()=>{steps[2].go();replay([()=>setTwo(0,3),()=>setTwo(0,2),()=>setTwo(0,1),()=>setTwo(1,13),()=>setTwo(1,12),()=>setTwo(1,11),lockTwo],330)},go:()=>{init0(14,3);sync();T.after=ready(2,()=>T.won,'X ≤ 1 or X ≥ 11.')}},
{h:'Reach a decision',p:'Compare the observed value with the region. If it is in the region, including the critical value itself, reject H₀. If not, there is not enough evidence to reject H₀.',
task:'Decide 6 tests',show:()=>{steps[3].go();replay(DECIDE.map(d=>()=>decide(d[3]<=d[1]||d[3]>=d[2])),420)},go:()=>{init0();sync();T.after=ready(3,()=>T.won,'Decisions made from the region.')}},
{h:'Actual significance level',p:'X only takes whole numbers, so the region rarely holds exactly α. The actual significance level is P(X in the region) when H₀ is true.',
task:'Find 3 actual levels',show:()=>{steps[4].go();replay(ACTUAL.map(()=>()=>actual(0)),600)},go:()=>{init0();sync();T.after=ready(4,()=>T.won,'Actual levels found.')}},
{h:'Challenge',p:'',go:()=>{init0();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.after()});
function next(){qi++;const [q,good,bad]=QS[qi%QS.length],all=[[good,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ask.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,good)});speak('Challenge: '+q);A.redraw()}
let chain=0;
function grade(tag,good){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),win=tag==='ok';let m='Check the tail probability against α.';
 if(tag==='big')m='That region holds more than 5% under H₀: P(X ≥ 9) = 11.33% and P(X ≤ 3) = 10.71%.';
 if(tag==='small')m='X ≥ 11 is within 5%, but 10 can join: P(X ≥ 10) = 4.80% is still within 5%.';
 if(tag==='off1')m='9 is the table row. P(X ≥ 10) = 1 − P(X ≤ 9), so the region starts at 10.';
 if(tag==='prob')m='0.952 is a probability, not a value of X. The critical value is a count: 10.';
 if(tag==='split')m='Two tails share the 5%: at most 2.5% in each.';
 if(tag==='exact')m='X is discrete, so a tail rarely holds exactly 2.5%. Each tail is at most 2.5%.';
 if(tag==='edge')m='The critical value is the first value inside the region, so X = 10 means reject H₀.';
 if(tag==='prove')m='A test never proves H₁. You reject H₀: there is evidence that p > 0.3.';
 if(tag==='alpha')m='5% is α, the limit. The region itself holds P(X ≥ 10) = 4.80%.';
 if(tag==='comp')m='95.2% is P(X ≤ 9), the part outside the region.';
 if(tag==='tail')m='H₁: p < 0.3 needs a lower tail, small values of X.';
 if(win){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+good+'. In a row: '+chain+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.64,tall:1.3,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;bar()},
 init:B=>{A=B;Q=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Critical region lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
