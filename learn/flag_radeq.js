/* Flagship – radical and rational equations (16–18). Test candidate roots on the graphs of y = √(x + a) and y = x − b, see that
   squaring also solves the mirror branch −√(x + a), isolate the root before squaring, reject values that make a denominator 0,
   then practise on generated equations. Every canvas action has a twin button. */
(()=>{const M=Math,sg=v=>(v<0?'−':'')+M.abs(v),pm=(v,s)=>v===0?'':(v<0?' − ':' + ')+M.abs(v)+(s||''),sq=v=>v<0?NaN:M.sqrt(v);
const ex=(a,b)=>{const p=2*b+1,q=b*b-a,D=M.sqrt(p*p-4*q);return[(p-D)/2,(p+D)/2]};
const eqT=(a,b)=>`√(x${pm(a)}) = x${pm(-b)}`;
const EQ=[[3,3],[0,2],[7,5]];
const ISO=[['Isolate the root:',['√(x + 1) = x − 1','x + 1 + 1 = x²','√(x + 1) = x + 1'],{1:'Squaring now needs (√(x + 1) + 1)², which is x + 2√(x + 1) + 2, not x + 1 + 1. Get the root alone first.',2:'Take 1 from both sides: the right side becomes x − 1.'}],
 ['Square both sides:',['x + 1 = x² − 2x + 1','x + 1 = x² + 1','x + 1 = x² − 1'],{1:'(x − 1)² is not x² + 1. Expand the bracket: x² − 2x + 1.',2:'(x − 1)(x − 1) = x² − 2x + 1, not x² − 1.'}],
 ['Solve:',['x² − 3x = 0, so x = 0 or x = 3','x² = 3x, so x = 3 only','x = 3 only, by inspection'],{1:'Dividing by x throws away the candidate x = 0. Factorise: x(x − 3) = 0.',2:'Rearrange to x² − 3x = 0 and factorise. There are two candidates to check.'}],
 ['Check in the original:',['x = 3 works; x = 0 is extraneous','Both work','x = 0 works; x = 3 is extraneous'],{1:'x = 0: √1 + 1 = 2, not 0. Always substitute into the original equation.',2:'x = 3: √4 + 1 = 3 ✓. x = 0: √1 + 1 = 2 ≠ 0, so x = 0 fails.'}]];
/* rational: [equation, excluded, candidates, valid list, options with tags] */
const RAT=[['6/x = x − 1',[0],[3,-2],[3,-2],[['x = 3 or x = −2','ok'],['x = 3 only','drop'],['No solution','none']]],
 ['x/(x − 3) = 3/(x − 3) + 2',[3],[3],[],[['No solution','ok'],['x = 3','keep'],['x = 0','guess']]],
 ['x²/(x − 2) = 4/(x − 2)',[2],[2,-2],[-2],[['x = −2 only','ok'],['x = 2 or x = −2','keep'],['x = 2 only','keep']]]];
VIS.reg('flagradeq',c=>{let A,pad,cq,qn=-1,tok=0,streak=0;
const fresh=()=>({cb:()=>{},hits:0,px:2,drag:false,bad:null,got:[],gq:null}),S=fresh();
const mode=()=>['test','mirror','iso','rat','gen','chal'][A.step],quick=()=>A.reduced();
const goal=()=>({test:2,mirror:3,iso:4,rat:3,gen:3}[mode()]||99);
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,col,al){g.font=`700 ${M.round(n*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
const box=()=>({L:14,T:A.H*.13,R:A.W-14,B:A.H*.74,x0:-3.5,x1:10,y0:-5,y1:5});
const toX=(F,x)=>F.L+(x-F.x0)/(F.x1-F.x0)*(F.R-F.L),toY=(F,y)=>F.B-(y-F.y0)/(F.y1-F.y0)*(F.B-F.T),fromX=(F,p)=>F.x0+(p-F.L)/(F.R-F.L)*(F.x1-F.x0);
function grid(g,F){const C=A.col;g.strokeStyle=A.mix(C.tx,C.pn,.85);g.lineWidth=1;for(let x=M.ceil(F.x0);x<=F.x1;x++){g.beginPath();g.moveTo(toX(F,x),F.T);g.lineTo(toX(F,x),F.B);g.stroke()}
 g.strokeStyle=A.mix(C.tx,C.pn,.5);g.lineWidth=1.6;g.beginPath();g.moveTo(F.L,toY(F,0));g.lineTo(F.R,toY(F,0));g.moveTo(toX(F,0),F.T);g.lineTo(toX(F,0),F.B);g.stroke()}
function plot(g,F,fn,col,dash){g.save();g.beginPath();g.rect(F.L,F.T,F.R-F.L,F.B-F.T);g.clip();g.setLineDash(dash?[7,6]:[]);g.strokeStyle=col;g.lineWidth=3.2;g.beginPath();let on=false;
 for(let i=0;i<=300;i++){const x=F.x0+i/300*(F.x1-F.x0),y=fn(x);if(isNaN(y)){on=false;continue}on?g.lineTo(toX(F,x),toY(F,y)):g.moveTo(toX(F,x),toY(F,y));on=true}g.stroke();g.restore()}
function pt(g,F,x,y,col,r,ring){g.beginPath();g.arc(toX(F,x),toY(F,y),r||7,0,7);if(ring){g.strokeStyle=col;g.lineWidth=3;g.stroke()}else{g.fillStyle=col;g.fill()}}
function scene(g,a,b,mirror){const C=A.col,F=box();grid(g,F);plot(g,F,x=>sq(x+a),C.cy);plot(g,F,x=>x-b,C.am);if(mirror)plot(g,F,x=>-sq(x+a),C.vi,1);return F}
function drawTest(g){const C=A.col,F=scene(g,3,3,false),x=S.px,l=sq(x+3),r=x-3;g.strokeStyle=C.mu||C.tx;g.lineWidth=1.5;g.setLineDash([4,4]);g.beginPath();g.moveTo(toX(F,x),F.T);g.lineTo(toX(F,x),F.B);g.stroke();g.setLineDash([]);
 if(!isNaN(l))pt(g,F,x,l,C.cy,7);pt(g,F,x,r,C.am,7);S.got.forEach(([v,ok])=>pt(g,F,v,v-3,ok?C.gr:C.rd,11,1));
 txt(g,'√(x + 3) = x − 3',A.W/2,A.H*.05,16,C.tx);txt(g,`x = ${x}:  √(x + 3) = ${isNaN(l)?'undefined':+l.toFixed(2)}   x − 3 = ${sg(r)}`,A.W/2,A.H*.81,13,M.abs(l-r)<1e-9?C.gr:C.tx);
 txt(g,S.hits<2?`Candidate from squaring: x = ${[1,6][S.hits]}. Does it work?`:'x = 6 works. x = 1 is extraneous.',A.W/2,A.H*.9,13,C.vi)}
function drawMirror(g){const C=A.col,[a,b]=EQ[M.min(S.hits,2)],F=scene(g,a,b,true),[u,v]=ex(a,b);[u,v].forEach(x=>pt(g,F,x,x-b,S.bad===x?C.rd:C.tx,8,1));
 if(S.hits>2)return;txt(g,eqT(a,b),A.W/2,A.H*.05,16,C.tx);txt(g,`Squaring gives x = ${u} or x = ${v}. Tap the false root.`,A.W/2,A.H*.81,13,C.tx);txt(g,`Dashed: y = −√(x${pm(a)}), the mirror branch`,A.W/2,A.H*.9,12,C.vi)}
function drawIso(g){const C=A.col;txt(g,'√(x + 1) + 1 = x',A.W/2,A.H*.08,19,C.cy);ISO.forEach((L,i)=>{if(i>S.hits)return;const done=i<S.hits;txt(g,L[0],A.W/2,A.H*(.2+i*.19),13,C.vi);txt(g,done?L[1][0]:'?',A.W/2,A.H*(.28+i*.19),16,done?C.gr:C.tx)})}
function drawRat(g){const C=A.col,R=RAT[M.min(S.hits,2)],y=A.H*.5,x0=A.W*.08,x1=A.W*.92,X=v=>x0+(v+4)/8*(x1-x0);txt(g,R[0],A.W/2,A.H*.1,18,C.cy);txt(g,`Excluded: x ≠ ${R[1].map(sg).join(', ')} (denominator would be 0)`,A.W/2,A.H*.22,13,C.rd);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();for(let v=-4;v<=4;v++){g.beginPath();g.moveTo(X(v),y-6);g.lineTo(X(v),y+6);g.stroke();txt(g,sg(v),X(v),y+22,12)}
 R[1].forEach(v=>{g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(X(v),y,10,0,7);g.stroke();g.beginPath();g.moveTo(X(v)-6,y-24);g.lineTo(X(v)+6,y-12);g.moveTo(X(v)+6,y-24);g.lineTo(X(v)-6,y-12);g.stroke()});
 R[2].forEach(v=>{g.fillStyle=C.vi;g.beginPath();g.arc(X(v),y,6,0,7);g.fill()});txt(g,`Candidates after clearing fractions: x = ${R[2].map(sg).join(', ')}`,A.W/2,A.H*.72,13,C.tx);txt(g,'Which values survive?',A.W/2,A.H*.84,13,C.vi)}
function drawGen(g){const C=A.col;if(!S.gq)return;const[a,b,r,f]=S.gq,F=scene(g,a,b,S.hits>0&&S.bad!=null);[r,f].forEach(x=>pt(g,F,x,x-b,C.tx,7,1));txt(g,eqT(a,b),A.W/2,A.H*.05,17,C.tx);txt(g,`Round ${M.min(S.hits+1,3)} of 3: which x solve it?`,A.W/2,A.H*.84,13,C.vi)}
function drawChal(g){const C=A.col;scene(g,3,3,true);txt(g,'Check every candidate in the original.',A.W/2,A.H*.86,13,C.vi)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);({test:drawTest,mirror:drawMirror,iso:drawIso,rat:drawRat,gen:drawGen,chal:drawChal}[mode()])(g);A.fx.draw(g)}
function nope(t,x){A.sound.miss();S.bad=x==null?null:x;tell(t);A.redraw()}
function yes(t){S.hits++;S.bad=null;A.sound.pop();tell(t);pads();A.redraw();S.cb()}
function probe(x){x=M.max(-3,M.min(9.5,M.round(x*2)/2));S.px=x;A.sound.tick();const l=sq(x+3);tell(`x = ${x}: left ${isNaN(l)?'undefined':+l.toFixed(2)}, right ${x-3}`);A.redraw()}
function verdict(works){if(S.hits>=2)return;const x=[1,6][S.hits];probe(x);const real=x===6;if(works!==real)return nope(real?'√9 = 3 and 6 − 3 = 3. Both sides match, so x = 6 is a real solution.':'√(1 + 3) = 2 but 1 − 3 = −2. 2 ≠ −2: a square root is never negative, so x = 1 is extraneous.');S.got.push([x,real]);yes(real?'x = 6: 3 = 3, a real solution.':'x = 1: 2 ≠ −2, extraneous. Reject it.')}
function falseRoot(x){if(S.hits>=3)return;const[a,b]=EQ[S.hits],[u,v]=ex(a,b),bad=u-b<0?u:v;if(x!==bad)return nope(`x = ${x} works: √(${x}${pm(a)}) = ${x-b}. It is the other one that lands on the dashed mirror branch.`,x);yes(`x = ${bad} solves −√(x${pm(a)}) = x${pm(-b)}, not the original. Squaring hid the minus sign.`)}
function line(i){if(S.hits>=4)return;const L=ISO[S.hits];if(i)return nope(L[2][i]);yes(`${L[0]} ${L[1][0]}`)}
function ratPick(t){if(S.hits>=3)return;const R=RAT[S.hits];if(t!=='ok')return nope({drop:'x = −2 is fine too: 6/(−2) = −3 and −2 − 1 = −3. Only x = 0 is excluded.',none:'Neither candidate is 0, so both are allowed. Check: 6/3 = 2 = 3 − 1.',keep:`x = ${R[1][0]} makes a denominator 0, so it is excluded even though the algebra produced it.`,guess:'Clearing fractions gives x = 2x − 3, so x = 3, which is excluded. No value works.'}[t]);
 yes(R[3].length?`Solution: x = ${R[3].map(sg).join(' or x = ')}.`:'x = 3 is excluded, so there is no solution.')}
function roll(){const s=2+M.floor(M.random()*3),b=1+M.floor(M.random()*4),r=s+b,a=s*s-r,f=2*b+1-r;S.gq=[a,b,r,f]}
function genPick(t){if(S.hits>=3||!S.gq)return;const[a,b,r,f]=S.gq;if(t!=='ok'){S.bad=f;return nope(t==='both'?`x = ${f} came from squaring but ${f}${pm(-b)} = ${f-b} is negative, and √ is never negative. Reject it.`:`x = ${f} is the extraneous one: √(${f}${pm(a)}) = ${M.sqrt(f+a)} but ${f}${pm(-b)} = ${f-b}.`)}
 S.hits++;S.bad=null;A.sound.pop();tell(`x = ${r}: √(${r+a}) = ${r-b} ✓. x = ${f} is extraneous.`);if(S.hits<3)roll();pads();A.redraw();S.cb()}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='chal'||S.hits>=goal())return;const B=(t,l,fn)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);e.onclick=fn};
 if(m==='test'){B('◀ x − 0.5','Move probe left',()=>probe(S.px-.5));B('x + 0.5 ▶','Move probe right',()=>probe(S.px+.5));B('✓ It works','Candidate is a solution',()=>verdict(true));B('✗ Extraneous','Candidate is extraneous',()=>verdict(false))}
 if(m==='mirror'){const[a,b]=EQ[S.hits];ex(a,b).forEach(x=>B(`x = ${x}`,`False root is x = ${x}`,()=>falseRoot(x)))}
 if(m==='iso'){const o=ISO[S.hits][1].map((t,i)=>[t,i]),k=S.hits%3;o.slice(k).concat(o.slice(0,k)).forEach(([t,i])=>B(t,ISO[S.hits][0]+' '+t,()=>line(i)))}
 if(m==='rat'){const o=RAT[S.hits][4],k=(S.hits+1)%3;o.slice(k).concat(o.slice(0,k)).forEach(([t,g])=>B(t,'Solution: '+t,()=>ratPick(g)))}
 if(m==='gen'&&S.gq){const[,,r,f]=S.gq,o=[[`x = ${r} only`,'ok'],[`x = ${r} or x = ${f}`,'both'],[`x = ${f} only`,'wrong']],k=S.hits%3;o.slice(k).concat(o.slice(0,k)).forEach(([t,g])=>B(t,t,()=>genPick(g)))}}
function down(p){const m=mode(),F=box();if(m==='test'){if(p.y<F.T-20||p.y>F.B+20)return false;S.drag=true;probe(fromX(F,p.x));return true}
 if(m==='mirror'&&S.hits<3){const[a,b]=EQ[S.hits],h=ex(a,b).find(x=>M.hypot(toX(F,x)-p.x,toY(F,x-b)-p.y)<34);if(h!=null){falseRoot(h);return true}}return false}
function move(p){if(S.drag)probe(fromX(box(),p.x))}
function up(){S.drag=false}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(fs,ms){const k=++tok;fs.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},quick()?j*40+30:(j+1)*(ms||650)))}
const reset=()=>{tok++;Object.assign(S,fresh());pads()};
const steps=[
{h:'Test the candidates',p:'Squaring √(x + 3) = x − 3 gives two candidates, x = 1 and x = 6. Slide the probe to compare both sides, then judge each candidate.',predict:{q:'Squaring gave x = 1 and x = 6. Which are solutions?',opts:['Both: the algebra produced them','Only x = 6: x = 1 fails the check'],ans:1},task:'Judge 2 candidates',
 show:()=>{steps[0].go();play([()=>verdict(false),()=>verdict(true)],900)},go:()=>{reset();tell('Slide the probe. Where do the two graphs meet?');S.cb=fin(0,()=>S.hits>=2,'The graphs meet only at x = 6. A candidate is only a solution if it works in the original.')}},
{h:'Where false roots come from',p:'Squaring also solves −√(…) = x − b, because (−√)² = (√)². The dashed curve is that mirror branch. Tap the root that sits on it.',predict:{q:'Why does squaring add an extra root?',opts:['An arithmetic slip somewhere','The squared equation is also true for −√(x + a) = x − b'],ans:1},task:'Spot 3 false roots',
 show:()=>{steps[1].go();play(EQ.map(([a,b])=>()=>{const[u,v]=ex(a,b);falseRoot(u-b<0?u:v)}),900)},go:()=>{reset();tell('Tap the root that lands on the dashed mirror branch.');S.cb=fin(1,()=>S.hits>=3,'Each false root solves the mirror equation, where x − b is negative.')}},
{h:'Isolate, then square',p:'Solve √(x + 1) + 1 = x. Pick each line of working.',predict:{q:'What should you do before squaring?',opts:['Square straight away: (√(x + 1) + 1)² = x + 2','Get the root alone on one side'],ans:1},task:'Complete 4 lines',
 show:()=>{steps[2].go();play(ISO.map(()=>()=>line(0)),750)},go:()=>{reset();tell('First move the + 1 across.');S.cb=fin(2,()=>S.hits>=4,'Isolate, square, solve, then check every candidate in the original.')}},
{h:'Rational equations',p:'Multiply through by the denominators to clear the fractions. First note the excluded values that make a denominator 0, and reject any candidate that equals one.',predict:{q:'x/(x − 3) = 3/(x − 3) + 2 leads to x = 3. Is that the answer?',opts:['Yes: the algebra gave it','No: x = 3 makes a denominator 0'],ans:1},task:'Solve 3 equations',
 show:()=>{steps[3].go();play(RAT.map(()=>()=>ratPick('ok')),900)},go:()=>{reset();tell('6/x = x − 1. Excluded value x = 0.');S.cb=fin(3,()=>S.hits>=3,'State the excluded values first; then a candidate equal to one is rejected.')}},
{h:'Your turn',p:'New equations of the form √(x + a) = x − b. The graph shows both candidates. Choose the full solution.',task:'Solve 3 equations',
 show:()=>{steps[4].go();play([0,1,2].map(()=>()=>genPick('ok')),800)},go:()=>{reset();roll();pads();tell('Which candidates really solve it?');S.cb=fin(4,()=>S.hits>=3,'Squaring gives two candidates; the one that makes x − b negative is extraneous.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const BANK=[['Solve √(x + 6) = x.',[['x = 3','ok'],['x = 3 or x = −2','nocheck'],['x = −2','sign']]],
 ['To solve √(2x − 1) + 2 = x, the first step is…',[['Subtract 2: √(2x − 1) = x − 2','ok'],['Square: 2x − 1 + 4 = x²','early'],['Divide by 2','random']]],
 ['Solve 4/x = x.',[['x = 2 or x = −2','ok'],['x = 2 only','posonly'],['x = 0, 2 or −2','zero']]],
 ['Solve (x + 1)/(x − 1) = 2/(x − 1).',[['No solution','ok'],['x = 1','keepx'],['x = −1','guess']]],
 ['After squaring, x = 7 and x = 2 are candidates for √(x + 2) = x − 4. Which are solutions?',[['x = 7 only','ok'],['Both','nocheck'],['x = 2 only','sign']]],
 ['Why must you check answers after squaring?',[['Squaring can add roots that solve −√(…) instead','ok'],['To catch arithmetic slips only','slip'],['You do not need to','nocheck']]]];
function why(t){let m='Isolate the root, square, solve, then substitute every candidate into the original.';
 if(t==='nocheck')m='Check each candidate in the original. A square root is never negative, so a value that makes the other side negative is extraneous.';
 if(t==='sign')m='That is the extraneous one: it makes the right-hand side negative, but √ is never negative.';
 if(t==='early')m='(√(2x − 1) + 2)² is not 2x − 1 + 4: it has a middle term 4√(2x − 1). Isolate the root first.';
 if(t==='random')m='Dividing by 2 does not remove the root. Get √ alone, then square.';
 if(t==='posonly')m='x² = 4 has two roots. x = −2 works: 4/(−2) = −2. Only x = 0 is excluded.';
 if(t==='zero')m='x = 0 makes the denominator 0, so it is excluded.';
 if(t==='keepx')m='x = 1 makes x − 1 equal 0, so it is excluded. Nothing is left: no solution.';
 if(t==='guess')m='Clearing fractions gives x + 1 = 2, so x = 1, and x = 1 is excluded.';
 if(t==='slip')m='Even with perfect arithmetic, squaring adds the roots of −√(…) = x − b. That is why the check is needed.';return m}
function ask(){qn++;const[q,o]=BANK[qn%BANK.length],k=qn%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');o.slice(k).concat(o.slice(0,k)).forEach(([t,g])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,t);e.onclick=()=>mark(g)});tell('Challenge: '+q);A.redraw()}
function mark(t){cq.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?`✓ Correct. Streak: ${streak}.`:'✗ '+why(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw,onStep:A=>{cq.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
