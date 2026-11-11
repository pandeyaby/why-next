/* Flagship – dividing polynomials and the remainder theorem (16–18): build x³ − 4x² + x + 6 ÷ (x − 2) term by term,
   slide a to see the remainder of p(x) ÷ (x − a) equal p(a), hunt factors among ±1, ±2, ±3, ±6, divide by inspection
   with live coefficient matching, and tune k so a factor or remainder condition holds. */
(()=>{const M=Math,P=[1,-4,1,6],Q=[1,-2,-5,6];
 const ev=(c,x)=>c.reduce((s,k)=>s*x+k,0),neg=v=>(v<0?'−':'')+M.abs(v),SUP=['','','²','³'];
 function fmt(c){const n=c.length-1;let s='';c.forEach((k,i)=>{if(!k)return;const p=n-i,a=M.abs(k),t=(a===1&&p?'':a)+(p?'x'+SUP[p]:'');s+=s?(k<0?' − ':' + ')+t:(k<0?'−':'')+t});return s||'0'}
 const ST0=[{lead:'x³',opts:[['x²','ok'],['x³','deg'],['2x²','coef']],sub:'x³ − 2x²',left:'−2x² + x + 6'},
  {lead:'−2x²',opts:[['−2x','ok'],['2x','sign'],['−2x²','deg']],sub:'−2x² + 4x',left:'−3x + 6'},
  {lead:'−3x',opts:[['−3','ok'],['3','sign'],['−3x','deg']],sub:'−3x + 6',left:'0'}];
 const CAND=[1,-1,2,-2,3,-3,6,-6];
 const K=[{f:k=>[2,k,-5,2],a:2,want:0,ans:-2,lab:'(x − 2) is a factor',eq:k=>`f(2) = 8 + 4k = ${8+4*k}`},
  {f:k=>[2,k,-5,2],a:-1,want:6,ans:1,lab:'remainder 6 on ÷ (x + 1)',eq:k=>`f(−1) = k + 5 = ${k+5}`}];
VIS.reg('flagremth',c=>{let A,pad,quiz;
 const G={qi:0,qs:[],miss:'',a:0,zeros:[],tried:[],abc:[1,0,0],k:0,kr:0,kok:[0,0],drag:0,tok:0,onChange:()=>{}};
 const mode=()=>['div','rem','hunt','insp','k','quiz'][A.step];
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const F=(w,n)=>`${w} ${A.narrow?n:M.round(n*1.2)}px system-ui,sans-serif`;
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function tile(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick?3:1.5;g.stroke()}
 function txt(g,t,x,y,n,col,wt,al){g.font=F(wt||600,n);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-24)}

 // ---------- graph + slider ----------
 function graph(g,r,fn,mark,want){const C=A.col,X0=-3,X1=4,Y=14,sx=x=>r.x+(x-X0)/(X1-X0)*r.w,sy=y=>r.y+r.h/2-y/Y*r.h/2;
  g.save();tile(g,r,C.mu,.05);g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=A.alpha(C.mu,.35);g.lineWidth=1;
  for(let x=X0;x<=X1;x++){g.beginPath();g.moveTo(sx(x),r.y);g.lineTo(sx(x),r.y+r.h);g.stroke()}
  g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,sy(0));g.lineTo(r.x+r.w,sy(0));g.moveTo(sx(0),r.y);g.lineTo(sx(0),r.y+r.h);g.stroke();
  if(want!=null){g.setLineDash([6,5]);g.strokeStyle=C.or;g.beginPath();g.moveTo(r.x,sy(want));g.lineTo(r.x+r.w,sy(want));g.stroke();g.setLineDash([])}
  g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();for(let i=0;i<=200;i++){const x=X0+(X1-X0)*i/200,y=M.max(-3*Y,M.min(3*Y,fn(x)));i?g.lineTo(sx(x),sy(y)):g.moveTo(sx(x),sy(y))}g.stroke();
  g.fillStyle=C.mu;g.font=F(600,10);g.textAlign='center';g.textBaseline='top';for(let x=X0;x<=X1;x++)if(x)g.fillText(neg(x),sx(x),sy(0)+3);
  if(mark!=null){const y=fn(mark),py=M.max(r.y+6,M.min(r.y+r.h-6,sy(y))),hit=want!=null?y===want:y===0;g.strokeStyle=hit?C.gr:C.vi;g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(sx(mark),sy(0));g.lineTo(sx(mark),py);g.stroke();g.setLineDash([]);
   g.fillStyle=hit?C.gr:C.vi;g.beginPath();g.arc(sx(mark),py,7,0,7);g.fill()}g.restore()}
 function slider(g,r,lo,hi,v,lab){const C=A.col,sx=t=>r.x+12+(t-lo)/(hi-lo)*(r.w-24);G.sl={...r,lo,hi};g.fillStyle=A.alpha(C.mu,.3);A.paint.rrect(r.x+12,r.y+r.h/2-3,r.w-24,6,3);g.fill();
  g.fillStyle=C.mu;g.font=F(600,10);g.textAlign='center';g.textBaseline='top';for(let t=lo;t<=hi;t++)g.fillText(neg(t),sx(t),r.y+r.h/2+10);
  g.fillStyle=C.vi;g.beginPath();g.arc(sx(v),r.y+r.h/2,13,0,7);g.fill();txt(g,lab,sx(v),r.y+r.h/2-22,12,C.tx,800)}
 const slv=p=>{const s=G.sl;return M.round(s.lo+M.max(0,M.min(1,(p.x-s.x-12)/(s.w-24)))*(s.hi-s.lo))};

 // ---------- scenes ----------
 function drawDiv(g){const C=A.col,W=A.W,n=A.narrow,lh=n?26:32,x0=n?W*.18:W*.3;let y=22;
  txt(g,'(x³ − 4x² + x + 6) ÷ (x − 2)',W/2,y,15,C.tx,800);y+=lh;
  const qt=G.qs.map((t,i)=>i?(t[0]==='−'?' − '+t.slice(1):' + '+t):t).join('')||'?';txt(g,'Quotient: '+qt+(G.qs.length===3?'   remainder 0':''),W/2,y,14,G.qs.length===3?C.gr:C.vi,800);y+=lh*1.2;
  txt(g,'x³ − 4x² + x + 6',x0,y,14,C.tx,700,'left');y+=lh;
  G.qs.forEach((_,i)=>{const s=ST0[i];txt(g,`− (${s.sub})   ← ${G.qs[i]} × (x − 2)`,x0,y,13,C.or,600,'left');y+=lh;txt(g,s.left,x0,y,14,i===2?C.gr:C.tx,800,'left');y+=lh});
  if(G.qs.length<3){const s=ST0[G.qs.length];tile(g,{x:12,y:A.H-56,w:W-24,h:44},C.vi,.1);txt(g,`What times x gives ${s.lead}?`,W/2,A.H-34,14,C.tx,800)}}
 function drawRem(g){const C=A.col,W=A.W,r={x:12,y:66,w:W-24,h:A.H-150},v=ev(P,G.a);
  txt(g,'p(x) = x³ − 4x² + x + 6',W/2,16,14,C.tx,800);
  txt(g,`p(x) ÷ (x − ${G.a<0?'('+neg(G.a)+')':G.a}): remainder = p(${neg(G.a)}) = ${neg(v)}`,W/2,44,14,v===0?C.gr:C.vi,800);
  graph(g,r,x=>ev(P,x),G.a);slider(g,{x:12,y:A.H-74,w:W-24,h:64},-3,4,G.a,'a = '+neg(G.a));
  if(v===0)A.paint.label(`(x − ${G.a<0?'('+neg(G.a)+')':G.a}) is a factor`,W/2,r.y+16,{font:F(800,11),bg:'#047857'})}
 function huntR(){const n=A.narrow,cols=n?4:8,w=(A.W-24-(cols-1)*8)/cols,h=n?54:60,y0=A.H-(n?2:1)*(h+8)-6;return CAND.map((_,i)=>({x:12+(i%cols)*(w+8),y:y0+M.floor(i/cols)*(h+8),w,h}))}
 function drawHunt(g){const C=A.col,W=A.W;txt(g,'q(x) = x³ − 2x² − 5x + 6',W/2,18,15,C.tx,800);
  txt(g,`Factors found: ${G.zeros.length} of 3`,W/2,46,13,C.tx,700);
  const fs=G.zeros.slice().sort((a,b)=>b-a).map(a=>a<0?`(x + ${-a})`:`(x − ${a})`).join('');
  txt(g,G.zeros.length===3?'q(x) = '+fs:fs?'So far: '+fs+' …':'Tap a value a to work out q(a)',W/2,76,14,G.zeros.length===3?C.gr:C.vi,800);
  const r={x:12,y:96,w:W-24,h:huntR()[0].y-108};graph(g,r,x=>ev(Q,x),G.tried.length?G.tried[G.tried.length-1]:null);
  huntR().forEach((q,i)=>{const a=CAND[i],t=G.tried.includes(a),z=G.zeros.includes(a);tile(g,q,z?C.gr:t?C.rd:C.cy,.12,z);txt(g,'a = '+neg(a),q.x+q.w/2,q.y+q.h*.34,13,C.tx,800);if(t)txt(g,'q = '+neg(ev(Q,a)),q.x+q.w/2,q.y+q.h*.72,11,C.tx,600)})}
 const prod=()=>{const[a,b,cc]=G.abc;return[a,a+b,b+cc,cc]};
 function inspR(){const w=(A.W-24-16)/3;return[0,1,2].map(i=>({x:12+i*(w+8),y:110,w,h:A.narrow?110:120}))}
 function drawInsp(g){const C=A.col,W=A.W,[a,b,cc]=G.abc,pr=prod();txt(g,'x³ − 4x² + x + 6 = (x + 1)(ax² + bx + c)',W/2,18,14,C.tx,800);
  txt(g,`(x + 1)(${fmt(G.abc)})`,W/2,50,14,C.vi,800);txt(g,'= '+fmt(pr),W/2,80,14,pr.every((v,i)=>v===P[i])?C.gr:C.tx,800);
  inspR().forEach((r,i)=>{tile(g,r,C.cy,.1);txt(g,'abc'[i]+' = '+neg(G.abc[i]),r.x+r.w/2,r.y+r.h/2,17,C.tx,800);txt(g,'▲',r.x+r.w/2,r.y+16,14,C.mu);txt(g,'▼',r.x+r.w/2,r.y+r.h-16,14,C.mu)});
  const y=110+(A.narrow?110:120)+18,cw=(W-24)/4,lab=['x³','x²','x','1'],how=['a','a + b','b + c','c'];
  lab.forEach((l,i)=>{const ok=pr[i]===P[i],r={x:12+i*cw+3,y,w:cw-6,h:A.H-y-12};tile(g,r,ok?C.gr:C.or,.1,ok);txt(g,l,r.x+r.w/2,r.y+16,13,C.tx,800);txt(g,how[i],r.x+r.w/2,r.y+r.h*.42,12,C.tx,600);txt(g,`${neg(pr[i])} ${ok?'=':'≠'} ${neg(P[i])}`,r.x+r.w/2,r.y+r.h*.74,13,C.tx,800)})}
 function drawK(g){const C=A.col,W=A.W,R=K[G.kr],f=R.f(G.k),v=ev(f,R.a);txt(g,'f(x) = 2x³ + kx² − 5x + 2',W/2,16,14,C.tx,800);
  txt(g,`Goal: ${R.lab}.  ${R.eq(G.k)}`,W/2,44,13,v===R.want?C.gr:C.vi,800);
  graph(g,{x:12,y:66,w:W-24,h:A.H-150},x=>ev(f,x),R.a,R.want);slider(g,{x:12,y:A.H-74,w:W-24,h:64},-6,6,G.k,'k = '+neg(G.k))}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.25);g.fillRect(0,0,W,H);const m=mode();
  if(m==='div')drawDiv(g);if(m==='rem')drawRem(g);if(m==='hunt')drawHunt(g);if(m==='insp')drawInsp(g);if(m==='k')drawK(g);if(m==='quiz')txt(g,'p(a) = remainder',W/2,H/2,22,C.vi,800);A.fx.draw(g)}

 // ---------- actions ----------
 function term(i){if(G.qs.length>=3)return;const s=ST0[G.qs.length],[t,tag]=s.opts[i];
  if(tag==='ok'){G.qs.push(t);G.miss='';A.sound.pop();return report(`${t} × (x − 2) = ${s.sub}. Subtract to leave ${s.left}.`+(G.qs.length===3?' Remainder 0, so (x − 2) is a factor.':''))}
  A.sound.miss();let m=`${t} × x is not ${s.lead}. Divide the leading term by x.`;
  if(tag==='deg')m=`${t} × x has the wrong power. You need ${s.lead}, so lower the power by one.`;
  if(tag==='sign')m=`Careful with the sign: ${t} × x gives the opposite sign to ${s.lead}.`;
  if(tag==='coef')m='2x² × x = 2x³, but the leading term is x³. Match the coefficient too.';report(m)}
 function setA(v){v=M.max(-3,M.min(4,v));if(v===G.a&&G.zeros.includes(v))return;G.a=v;const r=ev(P,v);if(!r&&!G.zeros.includes(v)){G.zeros.push(v);A.sound.pop()}
  report(r?`Remainder p(${neg(v)}) = ${neg(r)}, not zero.`:`p(${neg(v)}) = 0: zero remainder, so (x − ${v<0?'('+neg(v)+')':v}) is a factor.`)}
 function test(a){if(G.tried.includes(a))return;G.tried.push(a);const v=ev(Q,a);
  if(!v){G.zeros.push(a);A.sound.pop();return report(`q(${neg(a)}) = 0, so ${a<0?`(x + ${-a})`:`(x − ${a})`} is a factor.`)}
  A.sound.miss();report(`q(${neg(a)}) = ${neg(v)}, not zero, so it is not a factor.`)}
 function nudge(i,d){const v=G.abc[i]+d;if(v<-9||v>9)return;G.abc[i]=v;const ok=prod().every((v,j)=>v===P[j]);if(ok)A.sound.pop();
  report(ok?'All four coefficients match: x³ − 4x² + x + 6 = (x + 1)(x² − 5x + 6).':`Now ${fmt(prod())}.`)}
 function setK(v){v=M.max(-6,M.min(6,v));const R=K[G.kr];G.k=v;const y=ev(R.f(v),R.a);
  if(y===R.want&&!G.kok[G.kr]){G.kok[G.kr]=1;A.sound.pop();report(`k = ${neg(v)} works: ${R.eq(v)}.`);if(G.kr===0)later([()=>{G.kr=1;G.k=0;report('Next condition.')}],1300);return}report()}

 function report(msg){const m=mode();let t='';
  if(m==='div')t=G.qs.length<3?`What times x gives ${ST0[G.qs.length].lead}?`:'';
  if(m==='rem')t=`a = ${neg(G.a)}. Zero remainders found: ${G.zeros.length} of 3.`;
  if(m==='hunt')t=`Factors found: ${G.zeros.length} of 3.`;
  if(m==='insp')t=`a = ${neg(G.abc[0])}, b = ${neg(G.abc[1])}, c = ${neg(G.abc[2])}.`;
  if(m==='k')t=`Condition ${G.kr+1} of 2: ${K[G.kr].lab}. k = ${neg(G.k)}.`;
  speak((msg?msg+' ':'')+t);buttons();G.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if(m==='div'&&G.qs.length<3)ST0[G.qs.length].opts.forEach((o,i)=>b(o[0],()=>term(i),'Next quotient term '+o[0]));
  if(m==='rem'){b('a − 1',()=>setA(G.a-1),'Decrease a');b('a + 1',()=>setA(G.a+1),'Increase a')}
  if(m==='hunt'&&G.zeros.length<3)CAND.forEach(a=>{if(!G.tried.includes(a))b('a = '+neg(a),()=>test(a),'Test q('+neg(a)+')')});
  if(m==='insp')[0,1,2].forEach(i=>{b('abc'[i]+' −',()=>nudge(i,-1),'Decrease '+'abc'[i]);b('abc'[i]+' +',()=>nudge(i,1),'Increase '+'abc'[i])});
  if(m==='k'&&!G.kok[1]){b('k − 1',()=>setK(G.k-1),'Decrease k');b('k + 1',()=>setK(G.k+1),'Increase k')}A.redraw()}

 // ---------- canvas input ----------
 function down(p){const m=mode();
  if((m==='rem'||m==='k')&&G.sl&&p.y>G.sl.y-20){G.drag=1;(m==='rem'?setA:setK)(slv(p));return true}
  if(m==='hunt'){const i=huntR().findIndex(r=>inside(p,r));if(i>=0)test(CAND[i])}
  if(m==='insp'){const i=inspR().findIndex(r=>inside(p,r));if(i>=0){const r=inspR()[i];nudge(i,p.y<r.y+r.h/2?1:-1)}}
  if(m==='div'&&G.qs.length<3&&p.y>A.H-60)report('Pick the next quotient term from the buttons below.');return false}
 function move(p){if(!G.drag)return;const m=mode(),v=slv(p);if(m==='rem'&&v!==G.a)setA(v);if(m==='k'&&v!==G.k)setK(v)}
 function up(){G.drag=0}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{G.tok++;G.onChange=()=>{};Object.assign(G,{qs:[],miss:'',a:0,zeros:[],tried:[],abc:[1,0,0],k:0,kr:0,kok:[0,0],drag:0})};
 const steps=[
  {h:'Long division',p:'Divide x³ − 4x² + x + 6 by (x − 2). Each time, divide the leading term by x, multiply back and subtract.',
   predict:{q:'What will the remainder be?',opts:['0','6, the constant term'],ans:0},task:'Find all 3 quotient terms',
   show:()=>{steps[0].go();later([()=>term(1),()=>term(0),()=>term(0),()=>term(0)],800)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.qs.length===3,'x³ − 4x² + x + 6 = (x − 2)(x² − 2x − 3), remainder 0.')}},
  {h:'Remainder = p(a)',p:'Drag a. The remainder of p(x) ÷ (x − a) is p(a), the height of the graph at x = a.',
   predict:{q:'p(x) is divided by (x − 1). What is the remainder?',opts:['p(1) = 4','p(−1) = 0'],ans:0},task:'Find all 3 values of a with remainder 0',
   show:()=>{steps[1].go();later([()=>setA(1),()=>setA(-1),()=>setA(2),()=>setA(3)],800)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.zeros.length===3,'Remainder 0 exactly where the graph crosses the x-axis: p(a) = 0 means (x − a) is a factor.')}},
  {h:'Factor hunt',p:'A factor (x − a) of a monic cubic needs a to divide the constant 6. Test values until you have all three.',
   predict:{q:'Which values are worth testing for x³ − 2x² − 5x + 6?',opts:['Any whole number from 1 to 10','Factors of 6: ±1, ±2, ±3, ±6'],ans:1},task:'Find all 3 factors',
   show:()=>{steps[2].go();later([()=>test(1),()=>test(-1),()=>test(-2),()=>test(3)],700)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>G.zeros.length===3,'q(x) = (x − 1)(x + 2)(x − 3).')}},
  {h:'Divide by inspection',p:'(x + 1) is a factor because p(−1) = 0. Adjust a, b and c until every coefficient matches.',task:'Match all 4 coefficients',
   show:()=>{steps[3].go();later([()=>nudge(1,-1),()=>nudge(1,-1),()=>nudge(1,-1),()=>nudge(1,-1),()=>nudge(1,-1),()=>nudge(2,6)],450)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>prod().every((v,j)=>v===P[j]),'So p(x) = (x + 1)(x² − 5x + 6) = (x + 1)(x − 2)(x − 3).')}},
  {h:'Find k',p:'Slide k until the condition holds. Watch the point at x = a meet the target line.',
   predict:{q:'(x − 2) is a factor of f(x). Which equation do you solve?',opts:['f(−2) = 0','f(2) = 0'],ans:1},task:'Meet both conditions',
   show:()=>{steps[4].go();later([()=>setK(-2),()=>{G.kr=1;G.k=0;setK(1)}],1500)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.kok[0]&&G.kok[1],'Set f(a) equal to the remainder you need and solve for k.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});

 // ---------- challenge ----------
 const QS=[['What is the remainder when x³ + 2x − 5 is divided by (x − 1)?',[['−2','ok'],['−8','sign'],['−5','const']]],
  ['(x + 3) is a factor of p(x) exactly when…',[['p(−3) = 0','ok'],['p(3) = 0','sign'],['the constant term is 3','const']]],
  ['A cubic is divided by (x − a). What is the degree of the quotient?',[['2','ok'],['3','deg'],['1','deg']]],
  ['p(2) = 5. What does that tell you?',[['p(x) ÷ (x − 2) leaves remainder 5','ok'],['(x − 2) is a factor','notfactor'],['(x − 5) is a factor','swap']]],
  ['Which is a factor of x³ − 7x + 6?',[['(x − 1)','ok'],['(x + 1)','sign'],['(x − 6)','const']]],
  ['2x³ + kx² + 3 has a factor (x + 1). Find k.',[['−1','ok'],['−5','sign'],['−3','const']]]];
 function slip(tag){let m='Substitute the value into the whole polynomial and check.';
  if(tag==='sign')m='Sign slip: (x − a) goes with p(a), so for (x + 1) substitute x = −1.';
  if(tag==='const')m='The remainder is not just the constant term. Substitute into every term.';
  if(tag==='deg')m='Dividing by a linear factor lowers the degree by exactly one.';
  if(tag==='notfactor')m='Only a remainder of 0 makes (x − a) a factor. Here the remainder is 5.';
  if(tag==='swap')m='p(2) = 5 is about dividing by (x − 2); 5 is the remainder, not a root.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Correct.':'✗ '+slip(tag)}${good?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move,up});buttons()}});
 A.start()})})();
