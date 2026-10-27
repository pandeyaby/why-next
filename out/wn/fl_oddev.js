/* Flagship – odd and even functions (16–18): drag a point P and watch its partner at −x. Even graphs match their mirror
   image in the y-axis (f(−x) = f(x)); odd graphs land on themselves after a half turn about O (f(−x) = −f(x)).
   Turn a copy of the graph, sort six functions, build an odd graph from its right half, switch polynomial powers on and
   off, then classify functions and use f(−a) in the challenge with feedback on each slip. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',XR=4,YR=6;
 const r2=v=>{v=M.round(v*100)/100;return(v<0?'−':'')+M.abs(v)};
 const FN={sq:['x²',x=>x*x,'E'],cu:['x³',x=>x*x*x,'O'],a:['x³ + 1',x=>x*x*x+1,'N'],b:['(x − 1)²',x=>(x-1)*(x-1),'N'],c:['x⁴ − 4x²',x=>x**4-4*x*x,'E'],
  d:['x³ − 4x',x=>x**3-4*x,'O'],e:['3 cos x',x=>3*M.cos(x),'E'],f:['3 sin x',x=>3*M.sin(x),'O'],g:['x² + x',x=>x*x+x,'N'],h:['x sin x',x=>x*M.sin(x),'E']};
 const SORT=['a','b','c','d','e','f'],WORD={E:'even',O:'odd',N:'neither'},SUP=['','','²','³','⁴','⁵'];
 const TERMS=[0,1,2,3,4,5],tn=p=>p?'x'+SUP[p]:'2',pf=(ts,x)=>ts.reduce((s,p)=>s+(p?x**p:2),0);
 const parity=f=>{let e=1,o=1;for(const x of [.7,1.3,2.1]){const a=f(x),b=f(-x);if(M.abs(a-b)>1e-9)e=0;if(M.abs(a+b)>1e-9)o=0}return e?'E':o?'O':'N'};
 const cr=(p,t)=>{const[a,b,c,d]=p;return .5*(2*b+(c-a)*t+(2*a-5*b+4*c-d)*t*t+(3*b-a-3*c+d)*t*t*t)};
VIS.reg('flagoddev',c=>{let A,pad,chal,read;
 const G={f:'sq',a:2,mir:0,rot:0,seen:[],turned:{},sorted:{},h:{0:2,1:1,2:1,3:1},odd:1,terms:[2],pe:0,po:0,miss:'',gen:0,check:()=>{},drag:0,Q:null};
 const mode=()=>['mirror','turn','sort','build','poly','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?92:72,bot=N?40:14,ph=H-top-bot,pw=W-24;return{W,H,N,top,ph,pw,ox:12+pw/2,oy:top+ph/2,ux:pw/(2*XR),uy:ph/(2*YR)}}
 const S=(x,y,g)=>[g.ox+x*g.ux,g.oy-y*g.uy];
 const qf=()=>G.Q&&G.Q.shown&&G.Q.it&&G.Q.it[3];
 const fcur=()=>{const m=mode();if(m==='quiz')return qf()||(()=>NaN);if(m==='build')return bf;if(m==='poly')return x=>pf(G.terms,x);return FN[G.f][1]};
 const fname=()=>{const m=mode();if(m==='quiz')return qf()?G.Q.it[0]:'?';if(m==='build')return'your graph';if(m==='poly')return G.terms.length?G.terms.slice().sort((a,b)=>b-a).map(tn).join(' + '):'0';return FN[G.f][0]};
 function hv(x){const k=M.abs(x);if(!k)return G.odd?0:G.h[0];const v=G.h[k];return x<0&&G.odd?-v:v}
 function bf(x){x=M.max(-3,M.min(3,x));const i=M.min(2,M.floor(x)),t=x-i,p=[i-1,i,i+1,i+2].map(k=>hv(M.max(-3,M.min(3,k))));return cr(p,t)}
 function axes(x,C,g){x.lineWidth=1;x.strokeStyle=A.alpha(C.mu,.18);for(let i=-XR;i<=XR;i++){const[X]=S(i,0,g);x.beginPath();x.moveTo(X,g.top);x.lineTo(X,g.top+g.ph);x.stroke()}
  for(let j=-YR;j<=YR;j+=2){const[,Y]=S(0,j,g);x.beginPath();x.moveTo(12,Y);x.lineTo(12+g.pw,Y);x.stroke()}
  x.strokeStyle=C.mu;x.lineWidth=1.5;x.beginPath();x.moveTo(12,g.oy);x.lineTo(12+g.pw,g.oy);x.moveTo(g.ox,g.top);x.lineTo(g.ox,g.top+g.ph);x.stroke();
  x.fillStyle=C.mu;x.font=F(600,11);x.textAlign='center';for(let i=-XR;i<=XR;i++)if(i)x.fillText(String(i).replace('-','−'),S(i,0,g)[0],g.oy+13);x.textAlign='right';for(let j=-YR+2;j<YR;j+=2)if(j)x.fillText(String(j).replace('-','−'),g.ox-4,S(0,j,g)[1]+4)}
 function curve(x,g,fn,col,w,dash,tf){x.save();x.beginPath();x.rect(12,g.top,g.pw,g.ph);x.clip();x.strokeStyle=col;x.lineWidth=w;x.setLineDash(dash||[]);x.beginPath();let on=0;const lo=mode()==='build'?-3:-XR,hi=-lo;
  for(let i=0;i<=240;i++){const X=lo+(hi-lo)*i/240;let p=[X,fn(X)];if(tf)p=tf(p);if(!isFinite(p[1])||M.abs(p[1])>40){on=0;continue}const[sx,sy]=S(p[0],p[1],g);on?x.lineTo(sx,sy):x.moveTo(sx,sy);on=1}x.stroke();x.restore()}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode(),f=fcur();x.fillStyle=A.mix(C.pn,C.cy,.04);x.fillRect(0,0,g.W,g.H);axes(x,C,g);
  if(m==='build'){const tg=[[-2,-3],[3,-1]];tg.forEach(([a,b])=>{const[X,Y]=S(a,b,g);x.strokeStyle=C.or;x.lineWidth=3;x.beginPath();x.arc(X,Y,11,0,7);x.stroke()})}
  curve(x,g,f,C.vi,3);if(G.mir)curve(x,g,X=>f(-X),A.alpha(C.pk,.9),2.5,[7,6]);
  if(G.rot){const t=G.rot*M.PI/180,cs=M.cos(t),sn=M.sin(t);curve(x,g,f,A.alpha(C.gr,.95),2.5,[3,5],([X,Y])=>[X*cs-Y*sn,X*sn+Y*cs])}
  if(m==='build'){for(let k=-3;k<=3;k++){const[X,Y]=S(k,hv(k),g),own=k>0||(!G.odd&&!k);A.paint.ball(X,Y,own?12:6,own?C.vi:A.alpha(C.vi,.6))}}
  else if(m!=='quiz'){const a=G.a,[px,py]=S(a,f(a),g),[qx,qy]=S(-a,f(-a),g);if(G.mir){const[mx,my]=S(-a,f(a),g);x.strokeStyle=C.pk;x.lineWidth=2.5;x.beginPath();x.arc(mx,my,15,0,7);x.stroke()}
   if(G.rot===180){const[rx,ry]=S(-a,-f(a),g);x.strokeStyle=C.gr;x.lineWidth=2.5;x.beginPath();x.arc(rx,ry,15,0,7);x.stroke()}
   x.strokeStyle=A.alpha(C.tx,.35);x.lineWidth=1.5;x.setLineDash([4,4]);x.beginPath();x.moveTo(px,py);x.lineTo(qx,qy);x.stroke();x.setLineDash([]);
   const cl=(X,Y)=>[X,M.max(g.top+6,M.min(g.top+g.ph-6,Y))];A.paint.ball(...cl(px,py),11,C.or);A.paint.ball(...cl(qx,qy),8,C.cy);
   const t1=`f(${r2(a)}) = ${r2(f(a))}`,t2=`f(${r2(-a)}) = ${r2(f(-a))}`;x.font=F(700,13);x.textAlign='left';x.fillStyle=C.or;x.fillText('P: '+t1,14,g.H-(g.N?24:2)-(g.N?0:0));x.fillStyle=C.cy;x.fillText('Q: '+t2,g.N?14:g.W/2,g.H-(g.N?6:2))}
  x.fillStyle=C.vi;x.font=F(800,13);x.textAlign='right';x.fillText('y = '+fname(),g.W-14,g.top+16);if(G.rot){x.fillStyle=C.gr;x.fillText('copy turned '+G.rot+'°',g.W-14,g.top+34)}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);const hl=wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,24+hl*(g.N?18:20)+(g.N?2:4),g.W-24,15);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh);return n+1}
 function head(){const m=mode();if(m==='mirror')return`Mirror test on y = x²: ${M.min(3,G.seen.length)} of 3 places`;if(m==='turn')return G.turned.cu&&G.turned.sq?'x³ lands on itself; x² does not':'Turn the green copy a half turn';
  if(m==='sort'){const n=SORT.filter(k=>G.sorted[k]).length;return`Sorted ${n}/6. Now: y = ${FN[G.f][0]}`}
  if(m==='build')return G.odd?'Odd mode: hit both orange rings':'Even mode: the left half is a mirror image';if(m==='poly'){const p=parity(fcur());return`y = ${fname()} is ${WORD[p]}`}
  if(m==='free')return`y = ${fname()}`;return G.Q?G.Q.q:''}
 function sub(){const m=mode();if(m==='mirror')return'Drag P along the curve. The pink ring is P reflected in the y-axis. Does Q sit in it?';if(m==='turn')return'Drag across the graph, or use the buttons, to turn the copy about O.';
  if(m==='sort')return'Drag P, switch on Mirror or Half turn, then choose.';if(m==='build')return'Drag the big dots up and down. You set x = 1, 2, 3; the rule makes the left half.';
  if(m==='poly')return'Switch powers of x on and off. 2 is the constant term.';if(m==='free')return'Try any graph with both tests.';return''}
 function tell(msg){const f=fcur(),a=G.a,s=(msg?msg+' ':'')+head()+'. '+(mode()==='build'?'f(1) = '+G.h[1]+', f(2) = '+G.h[2]+', f(3) = '+G.h[3]+'. ':`f(${r2(a)}) = ${r2(f(a))}, f(${r2(-a)}) = ${r2(f(-a))}. `)+sub();
  c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function setA(a,quiet){G.a=M.max(-3.5,M.min(3.5,M.round(a*2)/2));G.miss='';if(quiet)return A.redraw();note();A.sound.tick();tell('')}
 function note(){if(mode()==='mirror'&&G.f==='sq'&&G.a&&!G.seen.includes(M.abs(G.a)))G.seen.push(M.abs(G.a))}
 function setRot(r){G.rot=M.max(0,M.min(180,r));if(G.rot===180)G.turned[G.f]=1;A.sound.tick();tell(G.rot===180?(parity(fcur())==='O'?'The copy lands exactly on the curve.':'The copy does not match the curve.'):'')}
 function pick(k){G.f=k;G.miss='';tell('')}
 function verdict(v){const k=G.f,ans=FN[k][2],f=FN[k][1];let s;if(v===ans){G.sorted[k]=1;A.sound.pop();const nx=SORT.find(z=>!G.sorted[z]);if(nx)G.f=nx;return tell('Yes, '+FN[k][0]+' is '+WORD[ans]+'.')}
  if(k==='a'&&v==='O')s='x³ is odd, but + 1 lifts the curve: f(1) = 2 and f(−1) = 0, so it is neither.';else if(k==='b'&&v==='E')s='It is a mirror shape, but about x = 1, not the y-axis: f(−1) = 4 and f(1) = 0.';
  else s=`Test it: f(1) = ${r2(f(1))} and f(−1) = ${r2(f(-1))}. `+(ans==='E'?'They are equal, so even.':ans==='O'?'They are opposites, so odd.':'Neither equal nor opposite.');G.miss=s;A.sound.miss();tell(s)}
 function setH(k,v){G.h[k]=M.max(-5,M.min(5,v));G.miss=G.odd&&G.h[2]===-3?'That puts (2, −3) on the right. A half turn sends it to (−2, 3), not to the ring.':'';A.sound.tick();tell(G.miss)}
 function tog(p){const i=G.terms.indexOf(p);i<0?G.terms.push(p):G.terms.splice(i,1);const q=parity(fcur());if(G.terms.length===3&&q==='E')G.pe=1;if(G.pe&&G.terms.length===2&&q==='O')G.po=1;A.sound.tick();tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,lb,on)=>{const e=c.el('button',{type:'button',class:'lbtn sm'+(on?'':' ghost'),'aria-label':lb||null,'aria-pressed':on==null?null:String(!!on)},pad,t);e.onclick=f};
  if(m==='quiz')return;if(m!=='build'&&m!=='turn'){b('P ←',()=>setA(G.a-.5),'Move P left');b('P →',()=>setA(G.a+.5),'Move P right')}
  if(m==='turn'){b('Turn +45°',()=>setRot(G.rot+45),'Turn the copy 45 degrees anticlockwise');b('Reset turn',()=>setRot(0));b(G.f==='cu'?'Try y = x²':'Back to y = x³',()=>{G.f=G.f==='cu'?'sq':'cu';G.rot=0;tell('')})}
  if(m==='sort'||m==='free'){(m==='sort'?SORT:Object.keys(FN)).forEach(k=>b(FN[k][0]+(G.sorted[k]?' ✓':''),()=>pick(k),'Graph y = '+FN[k][0],G.f===k));b('Mirror',()=>{G.mir^=1;tell('')},'Show the mirror image in the y-axis',G.mir);b('Half turn',()=>{G.rot=G.rot?0:180;tell('')},'Show the copy turned 180 degrees about O',G.rot===180)}
  if(m==='sort')['E','O','N'].forEach(v=>b(WORD[v][0].toUpperCase()+WORD[v].slice(1),()=>verdict(v),'Answer: '+WORD[v]));
  if(m==='build'){b(G.odd?'Switch to even':'Switch to odd',()=>{G.odd^=1;tell('')});(G.odd?[1,2,3]:[0,1,2,3]).forEach(k=>{b(`f(${k}) −1`,()=>setH(k,G.h[k]-1),`Lower f(${k}) by 1`);b(`f(${k}) +1`,()=>setH(k,G.h[k]+1),`Raise f(${k}) by 1`)})}
  if(m==='poly')TERMS.forEach(p=>b(tn(p),()=>tog(p),(p?'Term x to the power '+p:'Constant term 2'),G.terms.includes(p)))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{f:'sq',a:2,mir:0,rot:0,seen:[],turned:{},sorted:{},h:{0:2,1:1,2:1,3:1},odd:1,terms:[2],pe:0,po:0,miss:'',drag:0},o||{})};
 const steps=[
  {h:'The mirror test',p:'A function is even when f(−x) = f(x) for every x. Then its graph is its own mirror image in the y-axis.',
   predict:{q:'For f(x) = x², how does f(−3) compare with f(3)?',opts:['f(−3) = −9, the negative of f(3)','They are equal: both are 9','f(−3) cannot be worked out'],ans:1},
   task:'Drag P to three different places',show:()=>play([1,2.5,3].map(a=>()=>setA(a)),400),go:()=>{reset({mir:1});G.check=when(0,()=>G.seen.length>=3,()=>'Q always sits in the pink ring: (−x)² = x², so x² is even.')}},
  {h:'The half-turn test',p:'A function is odd when f(−x) = −f(x) for every x. Then a half turn about the origin O leaves its graph unchanged.',
   predict:{q:'Turn the graph of y = x³ through 180° about O. What do you get?',opts:['A new curve, y = −x³','The same curve again','The curve y = x²'],ans:1},
   task:'Half-turn y = x³, then try y = x²',show:()=>play([()=>setRot(90),()=>setRot(180),()=>{G.f='sq';G.rot=0;tell('')},()=>setRot(180)],400),
   go:()=>{reset({f:'cu',a:1.5});G.check=when(1,()=>G.turned.cu&&G.turned.sq,()=>'(−x)³ = −x³, so x³ is odd. The turned x² hangs below the x-axis: it fails this test.')}},
  {h:'Sort six graphs',p:'Use the tests on each graph. Many functions are neither even nor odd.',
   predict:{q:'x³ is odd. What is y = x³ + 1?',opts:['Odd, because x³ is odd','Neither','Even'],ans:1},
   task:'Sort all six functions',show:()=>play(SORT.flatMap(k=>[()=>pick(k),()=>verdict(FN[k][2])]),260),go:()=>{reset({f:'a',a:1});G.check=when(2,()=>SORT.every(k=>G.sorted[k]),()=>'3 cos x and x⁴ − 4x² are even, 3 sin x and x³ − 4x are odd, and the shifted ones are neither.')}},
  {h:'Build from half a graph',p:'You only need the right half of an odd or even graph. The rule makes the rest.',
   predict:{q:'An odd function is defined at x = 0. What must f(0) be?',opts:['Any number','0','The same as f(1)'],ans:1},
   task:'In odd mode, pass through both orange rings',show:()=>play([()=>setH(2,2),()=>setH(2,3),()=>setH(3,0),()=>setH(3,-1)],350),
   go:()=>{reset();G.check=when(3,()=>G.odd&&G.h[2]===3&&G.h[3]===-1,()=>'To reach (−2, −3) you set f(2) = 3. And f(0) = −f(0) forces f(0) = 0.')}},
  {h:'Powers decide',p:'For a polynomial, look at the powers. x², x⁴ and the constant keep their sign when x becomes −x. x, x³ and x⁵ flip.',
   predict:{q:'f(x) = x⁴ + x² + 2. What does the constant 2 do?',opts:['Makes it neither','Nothing: 2 = 2x⁰, an even power, so f is even','Makes it odd'],ans:1},
   task:'Make an even polynomial with 3 terms, then an odd one with 2',show:()=>play([()=>tog(0),()=>tog(4),()=>{G.terms=[];tog(1)},()=>tog(3)],400),
   go:()=>{reset({terms:[2],a:1});G.check=when(4,()=>G.pe&&G.po,()=>'Even powers only gives even; odd powers only gives odd. Mix them and it is neither.')}},
  {h:'Sandbox',p:'Pick any graph. x sin x is even: odd × odd = even. Try both tests on x² + x.',go:()=>reset({f:'h',a:1.5,mir:1})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 const Q=[['x⁵ − x³','O','both powers are odd, so every term changes sign',x=>x**5-x**3],['x⁶ + 2x² − 7','E','every power is even, and −7 is −7x⁰',x=>x**6+2*x*x-7],['x² + x','N','f(−x) = x² − x, which is neither f(x) nor −f(x)',x=>x*x+x],
  ['x sin x','E','(−x)sin(−x) = (−x)(−sin x) = x sin x, so odd × odd is even',x=>x*M.sin(x)],['x cos x','O','(−x)cos(−x) = −x cos x, so odd × even is odd',x=>x*M.cos(x)],['cos x + 1','E','cos(−x) = cos x and the 1 does not change',x=>M.cos(x)+1],
  ['sin x + 1','N','f(−x) = −sin x + 1, which is neither f(x) nor −f(x)',x=>M.sin(x)+1],['x³ + x','O','f(−x) = −x³ − x = −f(x)',x=>x**3+x]];
 let qi=-1,run=0;
 function ask(){qi++;chal.innerHTML='';let opts;
  if(qi%3===2){const odd=qi%2,v=[4,5,7,2,6][qi%5];G.Q={q:`f is ${odd?'odd':'even'} and f(3) = ${v}. What is f(−3)?`,odd,v};opts=odd?[['−'+v,'ok'],[String(v),'evrule'],['0','zero']]:[[String(v),'ok'],['−'+v,'oddrule'],['−3','input']]}
  else{const it=Q[(qi-M.floor(qi/3))%Q.length];G.Q={q:`Is f(x) = ${it[0]} even, odd or neither?`,it};opts=['E','O','N'].map(k=>[WORD[k][0].toUpperCase()+WORD[k].slice(1),k])}
  const r=qi%3,o2=opts.slice(r).concat(opts.slice(0,r));chal.innerHTML=`<p><b>${G.Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o2.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o[1])});G.mir=0;G.rot=0;controls();A.cv.setAttribute('aria-label','Challenge: '+G.Q.q);A.redraw()}
 function fin(ok,m){if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m;A.cv.setAttribute('aria-label',s);const fb=chal.querySelector('.fl-fb');
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function judge(k){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);let m;const q=G.Q;
  if(!q.it){const v=q.v;if(k==='ok')m=q.odd?`Right: odd means f(−3) = −f(3) = −${v}.`:`Right: even means f(−3) = f(3) = ${v}.`;
   else if(k==='evrule')m=`f(−3) = f(3) is the even rule. Odd means f(−3) = −f(3) = −${v}.`;else if(k==='zero')m=`Only f(0) has to be 0 for an odd function. f(−3) = −f(3) = −${v}.`;
   else if(k==='oddrule')m=`Flipping the sign is the odd rule. Even means f(−3) = f(3) = ${v}.`;else m=`−3 is the input, not the output. Even means f(−3) = f(3) = ${v}.`;return fin(k==='ok',m)}
  const[ex,ans,why]=q.it;q.shown=1;G.mir=ans!=='O'?1:0;G.rot=ans!=='E'?180:0;A.redraw();if(k===ans)m='Right: '+why+'.';else if(k==='E'&&ans==='O')m='You looked for a mirror image, but the sign flips: '+why+'.';
  else if(k==='O'&&ans==='E')m='Odd needs every value to flip sign. Here f(−x) = f(x): '+why+'.';else if(k==='N')m='It does pass a test: '+why+'.';
  else m='One part keeps its sign and another flips, so both tests fail: '+why+'.';fin(k===ans,m)}
 function down(p){const m=mode(),g=geo();if(m==='quiz')return false;
  if(m==='turn'){G.drag={x:p.x,r:G.rot};return true}
  if(m==='build'){let best=null,bd=40;(G.odd?[1,2,3]:[0,1,2,3]).forEach(k=>{const[X,Y]=S(k,hv(k),g),d=M.hypot(p.x-X,p.y-Y);if(d<bd){bd=d;best=k}});if(best==null)return false;G.drag={k:best};return true}
  G.drag={P:1};setA((p.x-g.ox)/g.ux,1);return true}
 function mv(p){const g=geo(),d=G.drag;if(!d)return;if(d.P)setA((p.x-g.ox)/g.ux,1);else if(d.k!=null){G.h[d.k]=M.max(-5,M.min(5,M.round((g.oy-p.y)/g.uy)));A.redraw()}
  else{G.rot=M.max(0,M.min(180,M.round((d.r+(p.x-d.x)/g.pw*360)/15)*15));A.redraw()}}
 function up(){const d=G.drag;G.drag=0;if(!d)return;if(d.P){note();A.sound.tick();tell('')}else if(d.k!=null)setH(d.k,G.h[d.k]);else setRot(G.rot)}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Graph controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
