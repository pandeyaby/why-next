/* Flagship – partial fractions (16–18): add two fractions to see where the split comes from, tune A and B until
   A/(x − 1) + B/(x + 2) lies on the target curve, find constants by cover-up, choose the form for a repeated factor,
   and see from the graph why an improper fraction needs dividing first. */
(()=>{const M=Math,neg=v=>(v<0?'−':'')+M.abs(v);
const N0=[['5x − 1','ok'],['5','add'],['5x + 1','sign']];
const CV=[{L:'A',f:'(x − 1)',opts:[['x = 1','ok'],['x = −1','sign']],v:2,work:'(3·1 + 1) ÷ (1 + 1) = 2'},{L:'B',f:'(x + 1)',opts:[['x = −1','ok'],['x = 1','sign']],v:1,work:'(3·(−1) + 1) ÷ (−1 − 1) = 1'}];
const FORMS=[['A/(x−1) + B/(x−1)² + C/(x+1)','ok'],['A/(x−1)² + C/(x+1)','repeat'],['A/(x−1) + B/(x−1) + C/(x+1)','same']];
const RQ=[['Put x = 1:  4 = 2B','B',[['2','ok'],['4','coef'],['1','coef']]],['Put x = −1:  4 = 4C','C',[['1','ok'],['−1','sign'],['4','coef']]],['x² terms:  0 = A + C','A',[['−1','ok'],['1','sign'],['0','coef']]]];
const IQ=[['Is it proper? Top degree 2, bottom degree 2.',[['Divide first','ok'],['Split now: A/x + B/(x+1)','improper']]],
 ['x² + x + 1 = 1·(x² + x) + ?',[['1','ok'],['x + 1','coef'],['0','coef']]],
 ['1/(x(x + 1)) = A/x + B/(x + 1)',[['A = 1, B = −1','ok'],['A = 1, B = 1','sign'],['A = −1, B = 1','swap']]]];
VIS.reg('flagpfrac',c=>{let A,pad,quiz;const G={};
const mode=()=>['add','match','cover','rep','imp','quiz'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const F=(w,n)=>`${w} ${A.narrow?n:M.round(n*1.2)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tile(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick?3:1.5;g.stroke()}
function txt(g,t,x,y,n,col,wt,al){g.font=F(wt||600,n);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-24)}
function frac(g,a,b,x,y,n,col){g.font=F(700,n);const w=M.max(g.measureText(a).width,g.measureText(b).width)+8;txt(g,a,x,y-n*.75,n,col,700);txt(g,b,x,y+n*.85,n,col,700);
 g.strokeStyle=col||A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x+w/2,y);g.stroke();return w}
function row(g,parts,y,n){g.font=F(700,n);const ws=parts.map(p=>typeof p==='string'?g.measureText(p).width+8:M.max(g.measureText(p[0]).width,g.measureText(p[1]).width)+12);
 let x=A.W/2-ws.reduce((s,w)=>s+w,0)/2;parts.forEach((p,i)=>{const cx=x+ws[i]/2;if(typeof p==='string')txt(g,p,cx,y,n,A.col.tx,700);else frac(g,p[0],p[1],cx,y,n,p[2]);x+=ws[i]})}
function graph(g,r,fns,Y){const C=A.col,X0=-4,X1=4,sx=x=>r.x+(x-X0)/(X1-X0)*r.w,sy=y=>r.y+r.h/2-y/Y*r.h/2;
 g.save();tile(g,r,C.mu,.05);g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=C.mu;g.lineWidth=1.2;g.beginPath();g.moveTo(r.x,sy(0));g.lineTo(r.x+r.w,sy(0));g.moveTo(sx(0),r.y);g.lineTo(sx(0),r.y+r.h);g.stroke();
 fns.forEach(([f,col,dash,w])=>{g.strokeStyle=col;g.lineWidth=w||3;g.setLineDash(dash?[7,6]:[]);g.beginPath();let on=0,py=0;
  for(let i=0;i<=320;i++){const x=X0+(X1-X0)*i/320,y=f(x),ok=isFinite(y)&&M.abs(y)<3*Y&&(!on||M.abs(y-py)<Y);if(ok){on?g.lineTo(sx(x),sy(y)):g.moveTo(sx(x),sy(y));py=y}on=ok}g.stroke()});g.setLineDash([]);g.restore()}
function slider(g,r,v,lab,key){const C=A.col,sx=t=>r.x+14+(t+4)/8*(r.w-28);G.sl[key]=r;g.fillStyle=A.alpha(C.mu,.3);A.paint.rrect(r.x+14,r.y+r.h/2-3,r.w-28,6,3);g.fill();
 for(let t=-4;t<=4;t++){g.fillStyle=C.mu;g.fillRect(sx(t)-1,r.y+r.h/2+6,2,6)}g.fillStyle=C.vi;g.beginPath();g.arc(sx(v),r.y+r.h/2,13,0,7);g.fill();txt(g,lab,r.x+r.w/2,r.y+8,12,C.tx,700)}
function cards(n,y,h){const gap=8,w=(A.W-20-gap*(n-1))/n;return[...Array(n)].map((_,i)=>({x:10+i*(w+gap),y,w,h}))}
function opts(g,list,y,h,miss,label){const L=o=>label?label(o):o,n=list.length,v=list.some(o=>L(o[0]).length>14);G.cards=v?list.map((_,i)=>({x:10,y:y+i*h/n,w:A.W-20,h:h/n-6})):cards(n,y,h);G.cards.forEach((q,i)=>{const bad=miss===list[i][1]+i;tile(g,q,bad?A.col.rd:A.col.cy,.12,bad);g.font=F(700,13);txt(g,label?label(list[i][0]):list[i][0],q.x+q.w/2,q.y+q.h/2,13,A.col.tx,700)})}
const tgt=x=>(x+5)/((x-1)*(x+2)),sum=x=>G.A/(x-1)+G.B/(x+2);
// ---------- drawing ----------
function drawAdd(g){const C=A.col;row(g,[['2','x + 1'],'+',['3','x − 2'],'=',[G.n0!=null?N0[G.n0][0]:'?','(x + 1)(x − 2)',G.n0!=null?(N0[G.n0][1]==='ok'?C.gr:C.rd):C.or]],54,16);
 if(G.n0!=null){const t=N0[G.n0][1],v=t==='ok'?.5:t==='add'?-5:-.5;txt(g,t==='add'?'Adding tops and bottoms gives 5/(2x − 1)':'2(x − 2) + 3(x + 1) = 5x − 1',A.W/2,A.H*.3,13,C.tx);
  txt(g,`Check x = 0:  left side = 2 − 1.5 = 0.5,  yours = ${v}`,A.W/2,A.H*.38,12,t==='ok'?C.gr:C.rd,700)}
 else txt(g,'Common denominator first. Then what goes on top?',A.W/2,A.H*.32,13,C.mu);
 graph(g,{x:10,y:A.H*.44,w:A.W-20,h:A.H*.3},[[x=>2/(x+1)+3/(x-2),C.cy]],8);if(!G.ok0)opts(g,N0,A.H*.79,A.H*.17,G.miss,s=>'top = '+s);else G.cards=null}
function drawMatch(g){const C=A.col,W=A.W,hit=G.A===2&&G.B===-1;row(g,[['x + 5','(x − 1)(x + 2)'],'=',[neg(G.A),'x − 1',C.vi],'+',[neg(G.B),'x + 2',C.vi]],42,14);
 graph(g,{x:10,y:84,w:W-20,h:A.H*.6-100},[[tgt,C.or,1,4],[sum,hit?C.gr:C.cy]],8);
 const a=G.A+G.B,b=2*G.A-G.B;txt(g,`Top: A(x + 2) + B(x − 1) = ${neg(a)}x ${b<0?'−':'+'} ${M.abs(b)}   (want x + 5)`,W/2,A.H*.62,12,hit?C.gr:C.tx,700);
 slider(g,{x:10,y:A.H*.67,w:W-20,h:A.H*.14},G.A,'A = '+neg(G.A),'A');slider(g,{x:10,y:A.H*.83,w:W-20,h:A.H*.14},G.B,'B = '+neg(G.B),'B')}
function drawCover(g){const C=A.col,k=M.min(G.cv,1),R=CV[k];row(g,[['3x + 1','(x − 1)(x + 1)'],'=',[G.val[0]!=null?'2':'A','x − 1',G.val[0]!=null?C.gr:C.vi],'+',[G.val[1]!=null?'1':'B','x + 1',G.val[1]!=null?C.gr:C.vi]],48,15);
 const y=A.H*.42;txt(g,`Find ${R.L}: cover ${R.f}`,A.W/2,A.H*.22,14,C.tx,800);frac(g,'3x + 1','(x − 1)(x + 1)',A.W/2,y,18,C.tx);
 g.font=F(700,18);const off=g.measureText('(x − 1)').width/2+3;tile(g,{x:A.W/2+(k?off:-off)-off,y:y+6,w:off*2,h:30},C.or,1,true);txt(g,'covered',A.W/2+(k?off:-off),y+21,11,'#1f2937',800);
 if(G.xs!=null)txt(g,G.xs?R.work:`x = ${k?'1':'−1'} makes the other factor zero, not ${R.f}`,A.W/2,A.H*.6,13,G.xs?C.gr:C.rd,700);
 if(G.cv<2&&!G.xs)opts(g,R.opts,A.H*.74,A.H*.2,G.miss,s=>'Put '+s);else G.cards=null}
function drawRep(g){const C=A.col;row(g,[['4','(x − 1)²(x + 1)']],40,16);
 if(G.form==null){txt(g,'Which form?',A.W/2,A.H*.26,13,C.mu,700);opts(g,FORMS.map(f=>[f[0],f[1]]),A.H*.32,A.H*.62,G.miss);G.cards.forEach((q,i)=>{if(G.miss===FORMS[i][1]+i)txt(g,'✗',q.x+q.w/2,q.y+20,16,C.rd,800)});return}
 txt(g,FORMS[0][0].replace(/A|B|C/g,L=>G.v[L]!=null?`(${neg(G.v[L])})`:L),A.W/2,A.H*.22,13,C.vi,700);txt(g,'4 = A(x − 1)(x + 1) + B(x + 1) + C(x − 1)²',A.W/2,A.H*.32,12,C.tx,700);
 if(G.rq<3){txt(g,RQ[G.rq][0]+`, so ${RQ[G.rq][1]} = ?`,A.W/2,A.H*.46,15,C.tx,800);opts(g,RQ[G.rq][2],A.H*.58,A.H*.2,G.miss,s=>RQ[G.rq][1]+' = '+s)}
 else{G.cards=null;graph(g,{x:10,y:A.H*.42,w:A.W-20,h:A.H*.54},[[x=>4/((x-1)**2*(x+1)),C.or,1,4],[x=>-1/(x-1)+2/(x-1)**2+1/(x+1),C.gr]],8)}}
function drawImp(g){const C=A.col,f=x=>(x*x+x+1)/(x*(x+1));row(g,[['x² + x + 1','x(x + 1)']],40,16);const fns=[[f,C.or,1,4],[()=>1,C.mu,1,1]];
 if(G.bad)fns.push([x=>1/x-1/(x+1),C.rd]);if(G.iq>2)fns.push([x=>1+1/x-1/(x+1),C.gr]);graph(g,{x:10,y:84,w:A.W-20,h:A.H*.6-100},fns,6);
 txt(g,G.iq>2?'1 + 1/x − 1/(x + 1) sits on the curve':G.bad?'A/x + B/(x+1) → 0 far out, but this curve → 1':'Dashed grey line: y = 1',A.W/2,A.H*.62,12,G.iq>2?C.gr:G.bad?C.rd:C.mu,700);
 if(G.iq<3){txt(g,IQ[G.iq][0],A.W/2,A.H*.7,13,C.tx,800);opts(g,IQ[G.iq][1],A.H*.76,A.H*.2,G.miss)}else G.cards=null}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=C.pn;g.fillRect(0,0,W,H);G.sl={};const m=mode();
 if(m==='add')drawAdd(g);if(m==='match')drawMatch(g);if(m==='cover')drawCover(g);if(m==='rep')drawRep(g);if(m==='imp')drawImp(g);if(m==='quiz')row(g,[['A','x − a'],'+',['B','x − b']],H/2,22);A.fx.draw(g)}
// ---------- actions ----------
function pickN(i){if(G.ok0)return;G.n0=i;const t=N0[i][1];if(t==='ok'){G.ok0=1;G.miss='';A.sound.pop();return report('Yes. Over a common denominator the top is 2(x − 2) + 3(x + 1) = 5x − 1. Partial fractions runs this backwards.')}
 G.miss=t+i;A.sound.miss();report(t==='add'?'You cannot add tops and bottoms: the x = 0 check fails. Use (x + 1)(x − 2) as the denominator.':'Sign slip: 2(x − 2) = 2x − 4, and 3(x + 1) = 3x + 3, so the constant is −1.')}
function setAB(k,v){v=M.max(-4,M.min(4,M.round(v)));if(G[k]===v)return;G[k]=v;const a=G.A+G.B,b=2*G.A-G.B;let m;
 if(G.A===2&&G.B===-1){A.sound.pop();m='The curves match: A + B = 1 and 2A − B = 5 give A = 2, B = −1.'}else if(a===1)m='The x term matches (A + B = 1). Now fix the constant.';else if(b===5)m='The constant matches (2A − B = 5). Now fix the x term.';else m='Not yet. Compare the top with x + 5.';report(m)}
function cover(i){if(G.cv>1||G.xs)return;const R=CV[G.cv];if(R.opts[i][1]==='ok'){G.xs=1;G.val[G.cv]=R.v;G.miss='';A.sound.pop();const k=G.cv;report(`Cover ${R.f}, put ${R.opts[i][0]}: ${R.work}, so ${R.L} = ${R.v}.`);later([()=>{if(G.cv===k){G.cv++;G.xs=null;report()}}],1200);return}
 G.xs=0;G.miss='sign'+i;A.sound.miss();report(`Put the value that makes ${R.f} zero. ${R.opts[i][0]} makes the other factor zero.`);later([()=>{if(G.xs===0){G.xs=null;A.redraw()}}],1600)}
function form(i){if(G.form!=null)return;const t=FORMS[i][1];if(t==='ok'){G.form=i;G.miss='';A.sound.pop();return report('Yes. A repeated factor (x − 1)² needs both A/(x − 1) and B/(x − 1)².')}
 G.miss=t+i;A.sound.miss();report(t==='repeat'?'Leaving out A/(x − 1) means some fractions can never be matched. A repeated factor needs one term for each power.':'A/(x − 1) + B/(x − 1) is just one term in disguise. Use (x − 1) and (x − 1)².')}
function rep(i){if(G.form==null||G.rq>2)return;const[q,L,o]=RQ[G.rq];if(o[i][1]==='ok'){G.v[L]=+o[i][0].replace('−','-');G.rq++;G.miss='';A.sound.pop();
  return report(G.rq>2?'So 4/((x − 1)²(x + 1)) = −1/(x − 1) + 2/(x − 1)² + 1/(x + 1). The green curve sits on the target.':`${L} = ${o[i][0]}.`)}
 G.miss=o[i][1]+i;A.sound.miss();report(L==='A'?'Compare the x² terms: A(x − 1)(x + 1) gives Ax² and C(x − 1)² gives Cx². The left has no x², so A + C = 0.':`Solve ${q.split(':')[1].trim()} for ${L}.`)}
function imp(i){if(G.iq>2)return;const o=IQ[G.iq][1][i];if(o[1]==='ok'){G.iq++;G.miss='';A.sound.pop();
  return report(['Yes. Top degree 2 is not less than bottom degree 2, so divide first.','So the fraction is 1 + 1/(x(x + 1)).','So it is 1 + 1/x − 1/(x + 1).'][G.iq-1])}
 G.miss=o[1]+i;A.sound.miss();if(o[1]==='improper')G.bad=1;
 report({improper:'Look at the red curve: A/x + B/(x + 1) shrinks to 0 far out, but the fraction tends to 1. Divide first.',coef:'Expand 1·(x² + x) and take it away from x² + x + 1.',sign:'Cover x and put x = 0 for A; cover (x + 1) and put x = −1 for B.',swap:'Check: 1/x − 1/(x + 1) = 1/(x(x + 1)). Which letter goes with which factor?'}[o[1]])}
function report(msg){const m=mode();let t='';
 if(m==='add')t=G.ok0?'':'Pick the top.';if(m==='match')t=`A = ${neg(G.A)}, B = ${neg(G.B)}.`;if(m==='cover'&&G.cv<2)t=`Find ${CV[G.cv].L}.`;
 if(m==='rep')t=G.form==null?'Pick the form.':G.rq<3?RQ[G.rq][0]:'';if(m==='imp'&&G.iq<3)t=IQ[G.iq][0];
 speak((msg?msg+' ':'')+t);buttons();G.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(m==='add'&&!G.ok0)N0.forEach((o,i)=>b('Top = '+o[0],()=>pickN(i)));
 if(m==='match')['A','B'].forEach(k=>{b(k+' −1',()=>setAB(k,G[k]-1),`Decrease ${k}`);b(k+' +1',()=>setAB(k,G[k]+1),`Increase ${k}`)});
 if(m==='cover'&&G.cv<2&&!G.xs)CV[G.cv].opts.forEach((o,i)=>b('Put '+o[0],()=>cover(i)));
 if(m==='rep'){if(G.form==null)FORMS.forEach((f,i)=>b(f[0],()=>form(i)));else if(G.rq<3)RQ[G.rq][2].forEach((o,i)=>b(RQ[G.rq][1]+' = '+o[0],()=>rep(i)))}
 if(m==='imp'&&G.iq<3)IQ[G.iq][1].forEach((o,i)=>b(o[0],()=>imp(i)));A.redraw()}
// ---------- canvas input ----------
function slide(p){const k=G.drag,r=G.sl[k];if(r)setAB(k,(p.x-r.x-14)/(r.w-28)*8-4)}
function down(p){const m=mode();if(m==='match'){const k=['A','B'].find(k=>inside(p,G.sl[k]));if(k){G.drag=k;slide(p);return true}return false}
 const i=(G.cards||[]).findIndex(q=>inside(p,q));if(i<0)return false;({add:pickN,cover,rep:G.form==null?form:rep,imp})[m](i);return false}
// ---------- steps ----------
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{G.tok=(G.tok||0)+1;Object.assign(G,{onChange:()=>{},miss:'',n0:null,ok0:0,A:0,B:0,drag:0,cv:0,xs:null,val:[null,null],form:null,rq:0,v:{},iq:0,bad:0,cards:null})};
const steps=[
 {h:'Adding fractions',p:'Partial fractions undoes this. Add the two fractions over a common denominator.',
  predict:{q:'Is 2/(x + 1) + 3/(x − 2) equal to 5/(2x − 1)?',opts:['Yes, add tops and bottoms','No, use a common denominator'],ans:1},task:'Pick the numerator',
  show:()=>{steps[0].go();later([()=>pickN(0)],700)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.ok0,'Splitting reverses adding.')}},
 {h:'Match the curve',p:'Drag A and B until A/(x − 1) + B/(x + 2) lies on the dashed target curve.',task:'Make the curves match',
  show:()=>{steps[1].go();later([()=>setAB('A',1),()=>setAB('A',2),()=>setAB('B',-1)],600)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.A===2&&G.B===-1,'Equal tops: A + B = 1 and 2A − B = 5.')}},
 {h:'Cover-up',p:'Cover one factor, then put in the x that makes it zero. What is left gives the constant.',
  predict:{q:'To find A in A/(x − 1), which x do you put in?',opts:['x = −1','x = 1'],ans:1},task:'Find A and B',
  show:()=>{steps[2].go();later([()=>cover(0),()=>{G.cv=1;G.xs=null;cover(0)}],1300)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>G.val[0]!=null&&G.val[1]!=null,'Cover-up: A = 2, B = 1.')}},
 {h:'Repeated factor',p:'(x − 1)² is repeated. Choose the form, then find A, B and C.',
  predict:{q:'For (x − 1)², how many fractions do you need?',opts:['One: A/(x − 1)²','Two: A/(x − 1) and B/(x − 1)²'],ans:1},task:'Choose the form and find A, B, C',
  show:()=>{steps[3].go();later([()=>form(0),()=>rep(0),()=>rep(0),()=>rep(0)],700)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>G.rq>2,'One term for each power of the repeated factor.')}},
 {h:'Improper first',p:'The top has the same degree as the bottom. What does the graph say?',task:'Split the improper fraction',
  show:()=>{steps[4].go();later([0,0,0].map(()=>()=>imp(0)),700)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.iq>2,'Divide first when the top degree is at least the bottom.')}},
 {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});
// ---------- challenge ----------
const QS=[['(5x + 1)/((x + 1)(x − 1)) = A/(x + 1) + B/(x − 1). Find A.',[['A = 2','ok'],['A = 3','swap'],['A = −2','sign']]],
 ['Which form fits (2x + 3)/(x + 2)²?',[['A/(x + 2) + B/(x + 2)²','ok'],['A/(x + 2)²','repeat'],['A/(x + 2) + B/(x + 2)','repeat']]],
 ['Before splitting (x³ + 1)/(x(x − 1)) you should…',[['Divide, as the top degree is higher','ok'],['Use cover-up straight away','improper'],['Factorise the top only','improper']]],
 ['1/(x − 3) + 1/(x + 3) = ?',[['2x/(x² − 9)','ok'],['2/(2x)','add'],['2/(x² − 9)','coef']]],
 ['(x + 7)/((x − 1)(x + 3)) = A/(x − 1) + B/(x + 3). Find B.',[['B = −1','ok'],['B = 1','sign'],['B = 2','swap']]],
 ['3/(x(x + 3)) = A/x + B/(x + 3). Find A.',[['A = 1','ok'],['A = 3','cover'],['A = −1','swap']]]];
function slip(tag){let m='Check by adding your fractions back together.';
 if(tag==='sign')m='Sign slip: for (x − a) put x = a; for (x + a) put x = −a.';
 if(tag==='swap')m='That is the other constant. Pair each letter with its own factor.';
 if(tag==='repeat')m='A repeated factor (x − a)² needs both A/(x − a) and B/(x − a)².';
 if(tag==='improper')m='The top degree is not lower than the bottom, so divide first.';
 if(tag==='add')m='You cannot add tops and bottoms. Use a common denominator.';
 if(tag==='coef')m='Expand the numerator again and collect like terms.';
 if(tag==='cover')m='After covering, divide by what is left: 3 ÷ (0 + 3) = 1.';return m}
let qk=-1,stars=0;
function pose(){qk++;const[q,ops]=QS[qk%QS.length],turn=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
 if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+slip(tag)}${good?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.72,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move:p=>{if(G.drag)slide(p)},up:()=>{G.drag=0}});buttons()}});
A.start()})})();
