/* Flagship: Approximating with binomial expansions (ages 16–18; AQA/Edexcel A-level Maths "binomial expansion of (1 + x)ⁿ"
   and "use expansions to approximate"). See later terms shrink on a log scale as x gets small; add terms one at a time to
   reach 1.02¹⁰ to 4 d.p.; fix the alternating signs of (1 − 0.02)⁶; choose the right (1 + x)ⁿ form for 0.997⁸, 1.05⁷ and
   2.01⁵; drag x along a graph of (1 + x)¹⁰ against 1 + 10x + 45x² to find where a 3-term approximation stops being within 1%.
   Not flagbexp (building expansions and coefficients) or pascal/permutation labs. */
(()=>{
VIS.reg('flagbapx',c=>{let A,pad,quizBox,item=-1,run=0;const S={};
const part=()=>['shrink','build','neg','pick','fail','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||650} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const f1=()=>A.narrow?13:16,f2=()=>A.narrow?15:19;
const nCr=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return v},term=(n,x,k)=>nCr(n,k)*Math.pow(x,k);
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=k=>String(k).split('').map(d=>SUP[d]).join(''),num=v=>Math.abs(v)>=1e-6?String(+v.toPrecision(3)):v.toExponential(2).replace('e-',' × 10⁻').replace(/⁻(\d+)/,(_,d)=>'⁻'+sup(d));
function chip(x,y,w,h,label,on,col,sub){const g=A.ctx,C=A.col;g.fillStyle=on?A.alpha(col||C.ac,.2):A.alpha(C.tx,.05);A.paint.rrect(x,y,w,h,8);g.fill();g.strokeStyle=on?(col||C.ac):C.ln;g.lineWidth=2;g.stroke();
 txt(label,x+w/2,y+h*(sub?.38:.5),f1(),{w:700});if(sub)txt(sub,x+w/2,y+h*.75,A.narrow?10:12,{ink:C.mu})}
/* 2 rows of 3 chips: room for long decimals on a phone */
const cell=k=>({x:A.W*(.03+(k%3)*.33),y:A.H*(.12+(k>2)*.14),w:A.W*.28,h:A.H*.12}),cellAt=p=>{for(let k=0;k<6;k++){const b=cell(k);if(p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h)return k}return -1};
const SUB=['','₁','₂','₃','₄','₅','₆'],lab=(n,k,x)=>k?`${n}C${SUB[k]}·${x}${k>1?sup(k):''}`:'1';
/* ---------- 1: term sizes on a log scale ---------- */
const XS=[.01,.02,.05,.1,.2,.5],trackY=()=>A.H*.92,trackX=i=>A.W*(.1+i*.16);
const L0=-10,lx=v=>A.W*.3+(A.W*.62)*Math.max(0,(Math.log10(v)-L0)/(-L0+1.5));
function drawShrink(){const C=A.col,x=XS[S.xi],g=A.ctx;txt(`(1 + x)¹⁰ with x = ${x}`,A.W/2,A.H*.06,f2(),{w:800});
 for(let k=0;k<=6;k++){const v=term(10,x,k),y=A.H*(.17+k*.09),small=k>=3&&v<.001,inside=lx(v)>A.W*.72;txt(k?`¹⁰C${SUB[k]}x${k>1?sup(k):''}`:'1',A.W*.13,y,f1(),{w:700});
  g.fillStyle=k<3?C.ac:small?C.gr:C.rd;g.fillRect(A.W*.3,y-8,lx(v)-A.W*.3,16);txt(num(v),inside?lx(v)-6:lx(v)+6,y,A.narrow?11:13,{al:inside?'right':'left',ink:inside?(C.dark?'#0f172a':'#fff'):C.tx,w:700})}
 const tx=lx(.001);g.setLineDash([5,5]);g.strokeStyle=C.or;g.lineWidth=2;g.beginPath();g.moveTo(tx,A.H*.13);g.lineTo(tx,A.H*.75);g.stroke();g.setLineDash([]);txt('0.001',tx,A.H*.78,A.narrow?11:13,{ink:C.or,w:800});
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(trackX(0),trackY());g.lineTo(trackX(5),trackY());g.stroke();
 XS.forEach((v,i)=>{g.fillStyle=i===S.xi?C.ac:C.pn;g.beginPath();g.arc(trackX(i),trackY(),A.narrow?11:13,0,7);g.fill();g.stroke();txt(v,trackX(i),trackY()-22,A.narrow?11:13,{w:700})});
 txt('bar length: log scale',A.W-6,A.H*.12,A.narrow?10:12,{al:'right',ink:C.mu})}
const tailOk=x=>{for(let k=3;k<=10;k++)if(term(10,x,k)>=.001)return false;return true};
function setX(i){S.xi=Math.max(0,Math.min(5,i));const x=XS[S.xi],ok=tailOk(x);if(!ok)S.sawBad=true;A.sound.tick();
 const r=term(10,x,3)/term(10,x,2);after(`x = ${x}. The x³ term is ${num(term(10,x,3))}. ${ok?'Every term after x² is under 0.001.':'Some terms after x² are 0.001 or more.'} Each term is the one before times (n − k)x/(k + 1): here the x³ term is 8x/3 = ${num(r)} times the x² term.`)}
/* ---------- 2: build 1.02¹⁰ term by term ---------- */
const TRUE1=Math.pow(1.02,10),sumTo=(n,x,m,sg)=>{let s=0;for(let k=0;k<m;k++)s+=(sg?sg[k]:1)*Math.abs(term(n,x,k));return s};
function drawBuild(){const C=A.col;txt('1.02¹⁰ = (1 + 0.02)¹⁰',A.W/2,A.H*.06,f2(),{w:800});
 for(let k=0;k<6;k++){const b=cell(k);chip(b.x,b.y,b.w,b.h,num(term(10,.02,k)),k<S.used,0,lab('¹⁰',k,'0.02'))}
 const s=sumTo(10,.02,S.used),e=TRUE1-s;txt(`Sum of ${S.used} term${S.used===1?'':'s'}: ${s.toFixed(7)}`,A.W/2,A.H*.47,f2(),{w:800});
 txt(`Calculator: ${TRUE1.toFixed(7)}`,A.W/2,A.H*.57,f1());txt(`Error: ${e.toExponential(2)}`,A.W/2,A.H*.66,f1(),{ink:Math.abs(e)<5e-5?C.gr:C.rd,w:800});
 txt(`To 4 d.p.: ${s.toFixed(4)} vs ${TRUE1.toFixed(4)} ${s.toFixed(4)===TRUE1.toFixed(4)?'✓':'✗'}`,A.W/2,A.H*.76,f1(),{w:700});txt('Tap the next term to add it',A.W/2,A.H*.9,f1(),{ink:C.mu})}
function addTerm(){if(S.used>=6)return;S.used++;A.sound.pop();const s=sumTo(10,.02,S.used),e=TRUE1-s;
 after(S.used===1?'Just 1: far too small.':Math.abs(e)<5e-5?`${S.used} terms give ${s.toFixed(5)}, within 0.00005 of the true value, so it is right to 4 d.p. The next term, ${num(term(10,.02,S.used))}, is too small to change the 4th decimal place.`:`${S.used} terms: ${s.toFixed(6)}. Still ${e.toExponential(1)} short. Every term is positive, so the sum only grows.`)}
/* ---------- 3: signs of (1 − 0.02)⁶ ---------- */
const TRUE2=Math.pow(.98,6);
function drawNeg(){const C=A.col;txt('0.98⁶ = (1 + (−0.02))⁶',A.W/2,A.H*.06,f2(),{w:800});
 for(let k=0;k<5;k++){const v=Math.abs(term(6,.02,k)),b=cell(k);chip(b.x,b.y,b.w,b.h,(S.sg[k]<0?'− ':'+ ')+num(v),true,S.sg[k]<0?C.rd:C.gr,lab('⁶',k,'(−0.02)'))}
 const s=sumTo(6,.02,4,S.sg),e=TRUE2-s;txt(`First 4 terms: ${s.toFixed(6)}`,A.W/2,A.H*.5,f2(),{w:800});txt(`Calculator: ${TRUE2.toFixed(6)}`,A.W/2,A.H*.61,f1());
 txt(`Error: ${Math.abs(e).toExponential(2)}`,A.W/2,A.H*.71,f1(),{ink:Math.abs(e)<5e-5?C.gr:C.rd,w:800});txt('Tap a term to flip its sign',A.W/2,A.H*.88,f1(),{ink:C.mu})}
function flip(k){if(k<1||k>4)return;S.sg[k]*=-1;A.sound.tick();const right=(k%2?-1:1)===S.sg[k];
 after(`${k%2?'Odd':'Even'} power: (−0.02)${sup(k)} is ${k%2?'negative':'positive'}, so the x${sup(k)} term should be ${k%2?'−':'+'}. ${right?'Now it is.':'That sign is wrong now.'} Sum of 4 terms: ${sumTo(6,.02,4,S.sg).toFixed(6)}.`)}
const negOk=()=>Math.abs(TRUE2-sumTo(6,.02,4,S.sg))<5e-5;
/* ---------- 4: pick the right (1 + x)ⁿ ---------- */
const R=[['0.997⁸',[['(1 − 0.003)⁸','ok'],['(1 + 0.997)⁸','xval'],['(1 − 0.03)⁸','dec'],['(1 − 0.997)⁸','xval']],()=>[8,-.003,1]],
 ['1.05⁷',[['(1 + 0.05)⁷','ok'],['(1 + 0.5)⁷','dec'],['(1 + 1.05)⁷','xval'],['(1 + 0.05)⁶','power']],()=>[7,.05,1]],
 ['2.01⁵',[['2⁵(1 + 0.005)⁵','ok'],['2(1 + 0.005)⁵','factor'],['2⁵(1 + 0.01)⁵','half'],['(1 + 1.01)⁵','xval']],()=>[5,.005,32]]];
const tile=i=>({x:A.W*(.04+(i%2)*.48),y:A.H*(.3+(i>1)*.22),w:A.W*.44,h:A.H*.17});
function drawPick(){const r=R[Math.min(S.round,2)];txt(S.round>2?'All three done':`Which expansion should you use for ${r[0]}?`,A.W/2,A.H*.08,f2(),{w:800});
 txt(`Rounds right: ${Math.min(S.round,3)} of 3`,A.W/2,A.H*.18,f1(),{ink:A.col.mu});
 if(S.round<=2)S.opts.forEach((o,i)=>{const b=tile(i);chip(b.x,b.y,b.w,b.h,o[0],S.bad===i,A.col.rd)});
 if(S.last)txt(S.last,A.W/2,A.H*.86,A.narrow?11:14,{w:700,ink:A.col.gr})}
function shuffle(r){const o=R[r][1].slice(),k=(r*3+1)%4;return o.slice(k).concat(o.slice(0,k))}
function choose(i){if(S.round>2)return;const [label,tag]=S.opts[i],r=R[S.round];
 if(tag!=='ok'){S.bad=i;A.sound.miss();return after(why(tag))}
 const [n,x,a]=r[2](),est=a*(1+n*x+nCr(n,2)*x*x),tr=a*Math.pow(1+x,n);A.sound.pop();S.last=`${r[0]} ≈ ${a>1?a+'(':''}1 ${x<0?'−':'+'} ${num(Math.abs(n*x))} + ${num(nCr(n,2)*x*x)}${a>1?')':''} = ${est.toFixed(5)} (true ${tr.toFixed(5)})`;
 S.round++;S.bad=-1;if(S.round<=2)S.opts=shuffle(S.round);after(`Yes, ${label}. ${S.last}.`)}
/* ---------- 5: where 3 terms stop being good enough ---------- */
const f=x=>Math.pow(1+x,10),q=x=>1+10*x+45*x*x,pct=x=>(f(x)-q(x))/f(x)*100,GX=()=>A.W*.12,GW=()=>A.W*.82,GY=()=>A.H*.78,GH=()=>A.H*.62,XM=.3,YM=14;
const px=x=>GX()+x/XM*GW(),py=y=>GY()-(y-1)/(YM-1)*GH();
function drawFail(){const C=A.col,g=A.ctx;g.strokeStyle=C.ln;g.lineWidth=1;g.beginPath();g.moveTo(GX(),GY()-GH());g.lineTo(GX(),GY());g.lineTo(GX()+GW(),GY());g.stroke();
 [0,.1,.2,.3].forEach(v=>txt(v,px(v),GY()+14,A.narrow?11:13));[1,5,10].forEach(v=>txt(v,GX()-12,py(v),A.narrow?11:13,{al:'right'}));
 [[f,C.ac,'(1 + x)¹⁰'],[q,C.or,'1 + 10x + 45x²']].forEach(([h,col,lab],j)=>{g.strokeStyle=col;g.lineWidth=3;g.beginPath();for(let i=0;i<=60;i++){const x=XM*i/60;i?g.lineTo(px(x),py(h(x))):g.moveTo(px(x),py(h(x)))}g.stroke();txt(lab,px(.12),A.H*(.12+j*.07),f1(),{al:'left',ink:col,w:800})});
 const x=S.gx;g.setLineDash([4,4]);g.strokeStyle=C.tx;g.beginPath();g.moveTo(px(x),GY());g.lineTo(px(x),GY()-GH());g.stroke();g.setLineDash([]);
 txt(`x = ${x.toFixed(2)}   error = ${pct(x).toFixed(2)}%   next term 120x³ = ${num(120*x**3)}`,A.W/2,A.H*.9,A.narrow?11:14,{w:800,ink:pct(x)<1?C.gr:C.rd});txt('Drag along the graph',A.W*.98,A.H*.97,A.narrow?10:12,{al:'right',ink:C.mu})}
function setG(x){S.gx=Math.max(.01,Math.min(XM,Math.round(x*100)/100));if(pct(S.gx)>=1)S.sawBad=true;
 after(`x = ${S.gx.toFixed(2)}: 3 terms give ${q(S.gx).toFixed(4)}, true value ${f(S.gx).toFixed(4)}, error ${pct(S.gx).toFixed(2)}%. ${pct(S.gx)<1?'Within 1%.':'Not within 1%: the left-out terms are no longer small.'}`)}
const failOk=()=>Math.abs(S.gx-.04)<1e-9&&S.sawBad;
/* ---------- shared ---------- */
function draw(){const k=part();if(k==='shrink')drawShrink();if(k==='build')drawBuild();if(k==='neg')drawNeg();if(k==='pick')drawPick();if(k==='fail'||k==='chal')drawFail()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{xi:4,sawBad:false,used:1,sg:[1,1,1,1,1],round:0,opts:shuffle(0),bad:-1,last:'',gx:.2,ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=run;acts.forEach((fn,j)=>setTimeout(()=>{if(t===run)fn()},A.reduced()?25*(j+1):(gap||450)*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},pad,t).onclick=fn};
 if(k==='shrink'){b('Smaller x',()=>setX(S.xi-1));b('Bigger x',()=>setX(S.xi+1))}
 if(k==='build'&&S.used<6)b('Add the next term',addTerm);
 if(k==='neg')[1,2,3,4].forEach(j=>b(`Flip x${sup(j)} sign`,()=>flip(j),`Flip the sign of the x to the ${j} term`));
 if(k==='pick'&&S.round<=2)S.opts.forEach((o,i)=>b(o[0],()=>choose(i),'Choose '+o[0]));
 if(k==='fail'){b('x − 0.01',()=>setG(S.gx-.01),'Decrease x by 0.01');b('x + 0.01',()=>setG(S.gx+.01),'Increase x by 0.01')}}
const inB=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function down(p){const k=part();
 if(k==='shrink'){if(p.y<trackY()-34)return false;let best=0;XS.forEach((_,i)=>{if(Math.abs(p.x-trackX(i))<Math.abs(p.x-trackX(best)))best=i});setX(best);return true}
 if(k==='build'){if(cellAt(p)<0)return false;addTerm();return true}
 if(k==='neg'){const j=cellAt(p);if(j<1||j>4)return false;flip(j);return true}
 if(k==='pick'){for(let i=0;i<4;i++)if(inB(p,tile(i))){choose(i);return true}return false}
 if(k==='fail'){if(p.x<GX()||p.y>GY()+20)return false;setG((p.x-GX())/GW()*XM);return true}return false}
function move(p){if(part()==='fail')setG((p.x-GX())/GW()*XM);if(part()==='shrink')down(p)}
function up(){}
const steps=[
{h:'Why later terms are small',p:'(1 + x)¹⁰ = 1 + 10x + 45x² + 120x³ + … The bars show each term’s size on a log scale. Change x and watch the terms after x².',
 predict:{q:'With x = 0.02, how big is the x³ term compared with the x term?',opts:['About the same size','About 1/200 of it','Bigger, because 120 > 10'],ans:1},
 task:'Find the biggest x where every term after x² is under 0.001',show:()=>auto(0,[()=>setX(2),()=>setX(1)]),
 go:()=>{fresh();tell('Term sizes of (1 + x)¹⁰ with x = 0.2.');keys();S.ok=finishIf(0,()=>S.xi===1&&S.sawBad,'Powers of a small x shrink fast, faster than the coefficients grow, so a few terms carry almost all the value.')}},
{h:'Build 1.02¹⁰',p:'Write 1.02¹⁰ as (1 + 0.02)¹⁰ and add terms until the sum is right to 4 decimal places.',
 predict:{q:'1 + 10(0.02) = 1.2. Is 1.02¹⁰ bigger or smaller than 1.2?',opts:['Smaller','Bigger','Exactly 1.2'],ans:1},
 task:'Reach 1.02¹⁰ to 4 d.p.',show:()=>auto(1,[addTerm,addTerm,addTerm]),
 go:()=>{fresh();tell('Only the first term, 1, is in the sum.');keys();S.ok=finishIf(1,()=>Math.abs(TRUE1-sumTo(10,.02,S.used))<5e-5,'Four terms give 1.2190 to 4 d.p. Stop when the next term cannot change the decimal place you need.')}},
{h:'Negative x',p:'0.98⁶ = (1 − 0.02)⁶, so x = −0.02. Every term starts with a + sign. Fix the signs.',
 predict:{q:'What is the sign of the x² term, ⁶C₂(−0.02)²?',opts:['Negative, because of the minus','Positive, because a negative squared is positive','It depends on n'],ans:1},
 task:'Get 0.98⁶ to 4 d.p. from 4 terms',show:()=>auto(2,[()=>flip(1),()=>flip(3)]),
 go:()=>{fresh();tell('All terms of (1 − 0.02)⁶ shown with + signs.');keys();S.ok=finishIf(2,negOk,'The signs alternate: 1 − 0.12 + 0.006 − 0.00016 = 0.88584, so 0.98⁶ ≈ 0.8858.')}},
{h:'Choose the expansion',p:'To use (1 + x)ⁿ, x must be small. Choose the form to use for each number.',
 task:'Choose correctly for all 3 numbers',show:()=>auto(3,[0,1,2].map(r=>()=>choose(S.opts.findIndex(o=>o[1]==='ok'))),600),
 go:()=>{fresh();tell('Which expansion gives 0.997⁸?');keys();S.ok=finishIf(3,()=>S.round>2,'Rewrite as a(1 + x)ⁿ with x small: factor out the a, and raise it to the power n.')}},
{h:'When it breaks',p:'The graph compares (1 + x)¹⁰ with the 3-term approximation 1 + 10x + 45x². Drag along x.',
 predict:{q:'Using 3 terms for 1.3¹⁰, how big will the error be?',opts:['Under 1%','About 5%','Over 20%'],ans:2},
 task:'Find the largest x (2 d.p.) where 3 terms are within 1%',show:()=>auto(4,[()=>setG(.1),()=>setG(.05),()=>setG(.04)]),
 go:()=>{fresh();tell('Graph at x = 0.2: the two curves have pulled apart.');keys();S.ok=finishIf(4,failOk,'Up to x = 0.04 the error is under 1%; at 0.05 it is just over. Judge accuracy by the size of the first term you leave out.')}},
{h:'Challenge',p:'',go:()=>{fresh({gx:.05});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['To estimate 0.996⁵ with (1 + x)⁵, what is x?','−0.004',[['0.996','xval'],['−0.04','dec']]],
 ['In (1 − 0.03)⁸, what is the sign of the x³ term?','Negative',[['Positive','sign'],['It has no x³ term','sign']]],
 ['Why can you stop after a few terms when x = 0.01?','Each term is a small fraction of the one before',[['The coefficients get smaller','coef'],['Later terms are always zero','coef']]],
 ['3.03⁴ = 3⁴(1 + x)⁴. What is x?','0.01',[['0.03','half'],['1.01','xval']]],
 ['1 + 10x + 45x² is used for (1 + x)¹⁰ with x = 0.5. Is it a good estimate?','No, x is too big',[['Yes, 3 terms is always enough','big'],['Yes, if you round at the end','big']]],
 ['You use 2 terms, 1 + 10x, for 1.01¹⁰. How big is the error, roughly?','About 45 × 0.01² = 0.0045',[['Zero, 2 terms are exact','stop'],['About 0.1, the size of 10x','stop']]]];
function why(tag){let m='Look at how big x is and how fast the terms shrink.';
 if(tag==='xval')m='x is the small part added to 1, not the whole number. 0.997 = 1 − 0.003, so x = −0.003.';
 if(tag==='dec')m='Check the decimal place: 0.997 = 1 − 0.003 and 1.05 = 1 + 0.05. A slip of one place makes x ten times too big.';
 if(tag==='power')m='The power stays the same: 1.05⁷ is (1 + 0.05)⁷, not ⁶.';
 if(tag==='factor')m='2.01 = 2(1 + 0.005), so 2.01⁵ = 2⁵(1 + 0.005)⁵. The factor 2 is raised to the 5th power too.';
 if(tag==='half')m='Divide the small part by the factor too: 2.01 = 2 × 1.005, so x = 0.01 ÷ 2 = 0.005.';
 if(tag==='sign')m='With x negative, odd powers are negative and even powers positive, so the signs alternate.';
 if(tag==='coef')m='The coefficients grow at first. The terms shrink because each extra power of a small x multiplies by about nx/k.';
 if(tag==='big')m='The approximation only works when x is small. At x = 0.5 the left-out terms are bigger than the ones kept.';
 if(tag==='stop')m='The error is about the first term left out: 45x² = 45 × 0.0001 = 0.0045.';
 return m}
function ask(){item++;const[qq,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));
 quizBox.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Approximation controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
