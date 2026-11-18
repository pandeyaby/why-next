/* Flagship – solving quadratics by factorising (ages 14–16): slide x to make (x − 2)(x + 5) zero and see that a product
   is 0 only when a factor is 0, drag the two roots of y = (x − a)(x − b) onto a target equation (signs flip), solve
   x² + x = 12 and x² = 5x in order (rearrange to = 0, factorise, set each factor = 0; dividing by x is refused), test
   (x − 2)(x − 3) = 6 to see why the right side must be 0, and match factors like 2x − 1 to their roots. */
(()=>{const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),X0=-7,X1=8,Y0=-10,Y1=16;
const n=v=>String(v).replace('-','−'),br=r=>r===0?'x':`(x ${r>0?'−':'+'} ${Math.abs(r)})`;
const T2=[[-4,1],[3,-2]],T4=[0,5];
const EQ=[{l:['x² + x = 12','x² + x − 12 = 0','(x + 4)(x − 3) = 0','x = −4 or x = 3'],w:['','− 12 both sides','factorise','each factor = 0'],x:0},
 {l:['x² = 5x','x² − 5x = 0','x(x − 5) = 0','x = 0 or x = 5'],w:['','− 5x both sides','take out x','each factor = 0'],x:1}];
const FAC=[['x − 5',5],['x + 2',-2],['2x − 1',.5],['3x + 4',-4/3]],CH=[['5',5],['−2',-2],['½',.5],['−4/3',-4/3],['2',2],['−5',-5]];
VIS.reg('flagzprod',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;
const fresh=()=>({want:()=>{},won:0,x:3,a:0,b:0,i:0,st:0,seen:{},lines:[],put:{},pick:-1,drag:null,last:'',busy:0}),S=fresh();
const mode=()=>['zero','roots','method','why','match','quiz'][A.step],fast=()=>A.reduced();
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},need=()=>({zero:2,roots:2,method:2,why:2,match:4}[mode()]||9);
function label(g,t,x,y,s,col,wt,al,mw){g.font=`${wt||700} ${s}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function card(x,y,w,h,on){const C=A.col;g().fillStyle=on?A.alpha(C.gr,.28):(C.dark?'#1e293b':'#ffffff');A.paint.rrect(x,y,w,h,10);g().fill();g().strokeStyle=on?C.gr:A.mix(C.tx,C.pn,.5);g().lineWidth=on?2.5:1.5;g().stroke()}
const g=()=>A.ctx;
/* graph frame for roots and why */
const box=()=>({l:30,r:A.W-10,t:A.H*.05,b:A.H*.93});
const px=x=>{const b=box();return b.l+(x-X0)/(X1-X0)*(b.r-b.l)},py=y=>{const b=box();return b.b-(y-Y0)/(Y1-Y0)*(b.b-b.t)};
const ux=X=>{const b=box();return X0+(X-b.l)/(b.r-b.l)*(X1-X0)};
function graph(f){const C=A.col,b=box(),G=g(),grid=A.mix(C.tx,C.pn,.85);G.lineWidth=1;
 for(let x=X0;x<=X1;x++){G.strokeStyle=grid;G.beginPath();G.moveTo(px(x),b.t);G.lineTo(px(x),b.b);G.stroke();if(x%2===0&&x)label(G,n(x),px(x),py(0)+12,10,C.mu,600)}
 for(let y=Y0;y<=Y1;y+=2){G.strokeStyle=grid;G.beginPath();G.moveTo(b.l,py(y));G.lineTo(b.r,py(y));G.stroke();if(y%4===0&&y)label(G,n(y),b.l-4,py(y),10,C.mu,600,'right')}
 G.strokeStyle=A.mix(C.tx,C.pn,.35);G.lineWidth=1.8;G.beginPath();G.moveTo(b.l,py(0));G.lineTo(b.r,py(0));G.moveTo(px(0),b.t);G.lineTo(px(0),b.b);G.stroke();
 G.save();G.beginPath();G.rect(b.l,b.t,b.r-b.l,b.b-b.t);G.clip();G.strokeStyle=C.ac;G.lineWidth=3.5;G.beginPath();for(let i=0;i<=240;i++){const x=X0+(X1-X0)*i/240;i?G.lineTo(px(x),py(f(x))):G.moveTo(px(x),py(f(x)))}G.stroke();G.restore()}
function pill(t,x,y,s,col,al){const G=g();G.font=`800 ${s}px system-ui,sans-serif`;const w=G.measureText(t).width+16,bx=al==='left'?x:al==='right'?x-w:x-w/2;G.fillStyle=A.alpha(A.col.pn,.93);A.paint.rrect(bx,y-s*.9,w,s*1.8,8);G.fill();G.strokeStyle=col||A.mix(A.col.tx,A.col.pn,.5);G.lineWidth=1.5;G.stroke();label(G,t,bx+w/2,y,s,A.col.tx,800)}
/* step drawings */
const nl=()=>({l:24,r:A.W-24,y:A.H*.74}),nx=x=>{const L=nl();return L.l+(x+8)/16*(L.r-L.l)},xn=X=>{const L=nl();return -8+(X-L.l)/(L.r-L.l)*16};
function drawZero(){const C=A.col,G=g(),W=A.W,H=A.H,a=S.x-2,b=S.x+5,p=a*b;pill('(x − 2)(x + 5) = 0',W/2,H*.08,15,C.vi);
 const cw=W*.27,cy=H*.2,ch=H*.3;[[`x − 2`,a],[`x + 5`,b],['product',p]].forEach(([t,v],i)=>{const x=10+i*(cw+W*.08);card(x,cy,cw,ch,v===0);label(G,t,x+cw/2,cy+ch*.25,13,C.mu,700);label(G,n(v),x+cw/2,cy+ch*.65,A.narrow?26:30,C.tx,800)});
 label(G,'×',10+cw+W*.04,cy+ch/2,22,C.tx,800);label(G,'=',10+2*cw+W*.12,cy+ch/2,22,C.tx,800);
 const L=nl();G.strokeStyle=A.mix(C.tx,C.pn,.35);G.lineWidth=2;G.beginPath();G.moveTo(L.l,L.y);G.lineTo(L.r,L.y);G.stroke();
 for(let k=-8;k<=8;k++){G.beginPath();G.moveTo(nx(k),L.y-5);G.lineTo(nx(k),L.y+5);G.stroke();if(k%2===0)label(G,n(k),nx(k),L.y+18,11,C.mu,600)}
 Object.keys(S.seen).forEach(k=>A.paint.ball(nx(+k),L.y,9,C.gr));A.paint.ball(nx(S.x),L.y,13,C.vi);pill(`x = ${n(S.x)}`,nx(S.x),L.y-30,13,C.vi);label(G,`Found ${Object.keys(S.seen).length} of 2`,W/2,H*.94,12,C.mu)}
const f2=x=>(x-S.a)*(x-S.b);
function drawRoots(){const C=A.col,b=box();graph(f2);[S.a,S.b].forEach((r,i)=>{A.paint.ball(px(r),py(0),11,i?C.or:C.vi)});
 pill(`y = ${br(S.a)}${br(S.b)}`,b.l+8,b.t+16,13,null,'left');const t=T2[S.i];if(t)pill(`Solve ${eqT(t)} = 0`,b.r-6,b.b-18,13,C.vi,'right')}
const eqT=t=>br(t[0])+br(t[1]);
const tileR=i=>{const w=(A.W-20)/2,h=A.H*.12;return{x:10+(i%2)*w,y:A.H*.66+Math.floor(i/2)*(h+8),w:w-8,h}};
const OPS=[['rearr','Rearrange to = 0'],['fact','Factorise'],['zero','Set each factor = 0'],['div','Divide by x']];
function drawMethod(){const C=A.col,G=g();S.lines.forEach((l,j)=>{const y=A.H*.08+j*A.H*.13;label(G,l.t,A.W*.36,y,A.narrow?18:21,j===S.lines.length-1?C.tx:C.mu,800);if(l.w)label(G,l.w,A.W-8,y,11,C.mu,700,'right',A.W*.3)});
 OPS.forEach(([k,t],i)=>{const r=tileR(i);card(r.x,r.y,r.w,r.h,0);label(G,t,r.x+r.w/2,r.y+r.h/2,13,C.tx,700,'center',r.w-8)})}
const f4=x=>(x-2)*(x-3);
function drawWhy(){const C=A.col,b=box(),G=g();graph(f4);G.strokeStyle=C.or;G.lineWidth=3;G.setLineDash([9,5]);G.beginPath();G.moveTo(b.l,py(6));G.lineTo(b.r,py(6));G.stroke();G.setLineDash([]);
 Object.keys(S.seen).forEach(k=>A.paint.ball(px(+k),py(6),8,C.gr));const y=f4(S.x);if(y<=Y1)A.paint.ball(px(S.x),py(y),11,C.vi);
 pill('(x − 2)(x − 3) = 6',b.l+8,b.t+16,14,C.or,'left');pill(`x = ${n(S.x)}: (${n(S.x-2)})(${n(S.x-3)}) = ${n(y)}`,b.l+8,b.t+46,13,y===6?C.gr:null,'left');pill(`Found ${Object.keys(S.seen).length} of 2`,b.r-6,b.b-18,12,null,'right')}
const rowR=i=>({x:10,y:A.H*(.05+i*.135),w:A.W-20,h:A.H*.115}),chipR=i=>{const w=(A.W-20)/3;return{x:10+(i%3)*w,y:A.H*(.64+Math.floor(i/3)*.15),w:w-8,h:A.H*.12}};
function drawMatch(){const C=A.col,G=g();FAC.forEach(([t],i)=>{const r=rowR(i),k=S.put[i];card(r.x,r.y,r.w,r.h,k!=null);label(G,`${t} = 0`,r.x+16,r.y+r.h/2,16,C.tx,800,'left');label(G,k!=null?`x = ${CH[k][0]}`:'x = ?',r.x+r.w-16,r.y+r.h/2,16,k!=null?C.tx:C.mu,800,'right')});
 const used=Object.values(S.put);CH.forEach(([t],i)=>{if(used.includes(i))return;let r=chipR(i);if(S.drag&&S.drag.i===i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(r.x,r.y,r.w,r.h,0);if(S.pick===i){G.strokeStyle=C.vi;G.lineWidth=3;A.paint.rrect(r.x,r.y,r.w,r.h,10);G.stroke()}label(G,t,r.x+r.w/2,r.y+r.h/2,18,C.tx,800)})}
function draw(A){const{ctx:G,W,H,col:C}=A;G.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.03:.4);G.fillRect(0,0,W,H);const m=mode();
 if(m==='zero')drawZero();else if(m==='roots')drawRoots();else if(m==='method')drawMethod();else if(m==='why')drawWhy();else if(m==='match')drawMatch();
 else{label(G,'A × B = 0  ⇒  A = 0 or B = 0',W/2,H*.4,A.narrow?17:20,C.tx,800);label(G,'Rearrange to = 0, factorise, then set each factor = 0.',W/2,H*.55,13,C.mu,700)}A.fx.draw(G)}
function miss(t){A.sound.miss();say(t);A.redraw()}
function win(msg,nx){S.won++;A.sound.pop();say(msg+(S.won<need()?' Here is the next one.':''));if(S.won<need()&&nx){S.busy=1;S.drag=null;const v=ver;setTimeout(()=>{if(v===ver){S.busy=0;nx();keys();A.redraw()}},fast()?10:1300)}keys();A.redraw();S.want()}
/* step 1: slide x */
function setX(x){const m=mode();if(S.won>=need()||S.busy)return;S.x=cl(Math.round(x),m==='why'?-1:-8,m==='why'?7:8);m==='why'?reactWhy():reactZero()}
function reactZero(){const a=S.x-2,b=S.x+5,p=a*b;let msg=`x = ${n(S.x)}: ${n(a)} × ${n(b)} = ${n(p)}. Neither factor is 0, so the product is not 0.`;
 if(p===0){msg=`x = ${n(S.x)}: ${a===0?'x − 2':'x + 5'} = 0, so the product is 0 whatever the other factor is.`;if(!S.seen[S.x]){S.seen[S.x]=1;return win(msg+(S.won+1<need()?' Find the other value.':' Both found: x = 2 or x = −5.'))}}
 if(msg!==S.last){S.last=msg;say(msg)}A.redraw()}
/* step 2: drag roots */
function setR(w,v){if(S.won>=need()||S.busy)return;S[w]=cl(Math.round(v),-6,7);const t=T2[S.i],R=[S.a,S.b].sort((p,q)=>p-q),T=[...t].sort((p,q)=>p-q);
 let msg=`y = ${br(S.a)}${br(S.b)} is 0 at x = ${n(S.a)} and x = ${n(S.b)}.`;
 if(R[0]===-T[1]&&R[1]===-T[0]&&R.join()!==T.join())msg=`Signs flipped. ${br(t[0])} = 0 means x = ${n(t[0])}, not ${n(-t[0])}.`;
 if(R.join()===T.join())return win(`${eqT(t)} = 0 when ${br(t[0])} = 0 or ${br(t[1])} = 0, so x = ${n(t[0])} or x = ${n(t[1])}.`,()=>{S.i++;S.a=0;S.b=2});
 if(msg!==S.last){S.last=msg;say(msg)}A.redraw()}
/* step 3: method tiles */
function loadEq(i){S.i=i;S.st=0;S.lines=[{t:EQ[i].l[0],w:''}];keys();A.redraw()}
function op(k){if(mode()!=='method'||S.won>=need()||S.busy)return;const e=EQ[S.i],s=S.st;
 if(k==='div')return miss(e.x?'Dividing by x gives x = 5 but loses x = 0. Check: 0² = 5 × 0. Factorise instead of dividing.':'There is no x on both sides to divide by. Get 0 on one side first.');
 if(s===0){if(k==='fact')return miss(e.x?'Get everything on one side first, so the other side is 0.':'x(x + 1) = 12 does not help. Lots of pairs multiply to 12, like 3 × 4. Only a product of 0 forces a factor to be 0.');
  if(k==='zero')return miss('The right side is not 0 yet, so the zero rule does not apply.')}
 if(s===1){if(k==='rearr')return miss('It already equals 0. Now factorise.');if(k==='zero')return miss('Factorise first: you need brackets multiplied together, equal to 0.')}
 if(s===2){if(k==='rearr')return miss('It already equals 0.');if(k==='fact')return miss('Already factorised. Now set each factor equal to 0.')}
 if((s===0&&k==='rearr')||(s===1&&k==='fact')||(s===2&&k==='zero')){S.st++;S.lines.push({t:e.l[S.st],w:e.w[S.st]});A.sound.tick();
  if(S.st<3){say(`${e.l[S.st]}.`);keys();return A.redraw()}
  return win(`${e.l[3]}. Check: ${e.x?'0² = 5 × 0 and 5² = 5 × 5':'(−4)² − 4 = 12 and 3² + 3 = 12'}.`,()=>loadEq(S.i+1))}}
/* step 4: why = 0 */
function reactWhy(){const y=f4(S.x);let msg=`x = ${n(S.x)}: (${n(S.x-2)})(${n(S.x-3)}) = ${n(y)}, not 6.`;
 if(S.x===8||S.x===9)msg=`Setting a bracket to 6 fails: x = ${S.x} gives ${S.x-2} × ${S.x-3} = ${y}, not 6. The bracket trick only works with 0.`;
 if(y===6&&!S.seen[S.x]){S.seen[S.x]=1;return win(`x = ${n(S.x)} works: (${n(S.x-2)})(${n(S.x-3)}) = 6.`+(S.won+1<need()?' Find the other one.':' Rearranged: x² − 5x = 0, so x(x − 5) = 0 and x = 0 or 5.'))}
 if(msg!==S.last){S.last=msg;say(msg)}A.redraw()}
/* step 5: match roots */
function place(ch,row){if(S.won>=need()||S.put[row]!=null)return A.redraw();const[t,v]=FAC[row],[ct,cv]=CH[ch];S.pick=-1;
 if(Math.abs(v-cv)<1e-9){S.put[row]=ch;return win(`${t} = 0 gives x = ${ct}. Check: put it back in and you get 0.`)}
 if(Math.abs(v+cv)<1e-9)return miss(`Sign slip. ${t} = 0: move the number across and its sign flips, so x = ${CH.find(q=>Math.abs(q[1]-v)<1e-9)[0]}.`);
 miss(row>1?`${t} = 0: move the number first, then divide by ${t[0]}. ${n(cv)} does not make it 0.`:`Put x = ${ct} into ${t}: you do not get 0.`)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.won>=need())return;const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='method')return OPS.forEach(([k,t])=>B(t,t,()=>op(k)));
 if(m==='zero'||m==='why'){B('x − 1','Decrease x by 1',()=>setX(S.x-1));return B('x + 1','Increase x by 1',()=>setX(S.x+1))}
 if(m==='roots'){B('◀ Purple','Move the purple root left',()=>setR('a',S.a-1));B('Purple ▶','Move the purple root right',()=>setR('a',S.a+1));B('◀ Orange','Move the orange root left',()=>setR('b',S.b-1));return B('Orange ▶','Move the orange root right',()=>setR('b',S.b+1))}
 if(m==='match'){const used=Object.values(S.put);if(S.pick<0)CH.forEach(([t],i)=>{if(!used.includes(i))B(`Pick ${t}`,`Pick the root ${t}`,()=>{S.pick=i;keys();A.redraw()})});
  else FAC.forEach(([t],i)=>{if(S.put[i]==null)B(`Put in ${t} = 0`,`Put ${CH[S.pick][0]} in ${t} = 0`,()=>{place(S.pick,i);keys()})})}}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const m=mode();if(m==='quiz'||S.won>=need()||S.busy)return false;
 if(m==='method'){const i=OPS.findIndex((o,i)=>inR(p,tileR(i)));if(i>=0)op(OPS[i][0]);return false}
 if(m==='zero'){if(Math.abs(p.y-nl().y)<40){S.drag={w:'x'};setX(xn(p.x));return true}return false}
 if(m==='why'){S.drag={w:'x'};setX(ux(p.x));return true}
 if(m==='roots'){if(Math.abs(p.y-py(0))>40)return false;const w=Math.abs(p.x-px(S.a))<=Math.abs(p.x-px(S.b))?'a':'b';S.drag={w};return true}
 if(m==='match'){const used=Object.values(S.put),i=CH.findIndex((q,i)=>!used.includes(i)&&inR(p,chipR(i)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const r=FAC.findIndex((q,i)=>inR(p,rowR(i)));if(r>=0&&S.pick>=0){place(S.pick,r);keys()}return false}return false}
function move(p){const d=S.drag;if(!d)return;const m=mode();if(m==='zero')setX(xn(p.x));else if(m==='why')setX(ux(p.x));else if(m==='roots')setR(d.w,ux(p.x));else if(m==='match'){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(d&&mode()==='match'){const r=FAC.findIndex((q,i)=>inR(d,rowR(i)));if(r>=0)place(d.i,r);else if(Math.hypot(d.x-d.x0,d.y-d.y0)<10){S.pick=d.i;say(`Picked ${CH[d.i][0]}. Now tap the factor it solves.`)}keys()}A.redraw()}
const ready=(k,okf,msg)=>()=>{if(A.step===k&&okf()&&(!steps[k].predict||A.pred[k]!=null))A.done(msg+A.reveal(k))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=x=>{ver++;Object.assign(S,fresh(),x||{})};
const steps=[
{h:'Make it zero',p:'Drag the purple dot along the number line. When is the product of the two brackets 0?',predict:{q:'(x − 2)(x + 5) = 0. How many values of x work?',opts:['One','Two','None'],ans:1},task:'Find both values of x',
 show:()=>{steps[0].go();play([1,2,0,-3,-5].map(v=>()=>setX(v)),600)},go:()=>{wipe({x:3});say('x = 3: 1 × 8 = 8. Drag the dot.');keys();S.want=ready(0,()=>S.won>=2,'If A × B = 0, then A = 0 or B = 0. So (x − 2)(x + 5) = 0 gives x = 2 or x = −5.')}},
{h:'Roots on the graph',p:'Drag the two dots on the x-axis. The curve is 0 where it crosses the axis. Match each target equation.',predict:{q:'What are the solutions of (x + 4)(x − 1) = 0?',opts:['x = 4 and x = −1','x = −4 and x = 1'],ans:1},task:'Match 2 equations',
 show:()=>{steps[1].go();play([()=>setR('a',-2),()=>setR('a',-4),()=>setR('b',1),()=>{},()=>{},()=>{},()=>setR('a',3),()=>setR('b',-2)],400)},go:()=>{wipe({a:0,b:2});say('Solve (x + 4)(x − 1) = 0. Drag the dots.');keys();S.want=ready(1,()=>S.won>=2,'Each factor gives one root, with the sign flipped: (x + a) = 0 gives x = −a.')}},
{h:'Solve in order',p:'Tap a step on the picture or below. Get 0 on one side, factorise, then set each factor to 0.',predict:{q:'What is a good first step for x² + x = 12?',opts:['Factorise: x(x + 1) = 12','Rearrange to x² + x − 12 = 0'],ans:1},task:'Solve 2 equations',
 show:()=>{steps[2].go();play(['rearr','fact','zero',0,0,0,'rearr','fact','zero'].map(k=>()=>k&&op(k)),400)},go:()=>{wipe();loadEq(0);say('Solve x² + x = 12.');S.want=ready(2,()=>S.won>=2,'Rearrange to = 0, factorise, set each factor = 0. Never divide by x.')}},
{h:'Why it must be 0',p:'Drag across the graph to try values of x. Find where (x − 2)(x − 3) really equals 6, the orange line.',predict:{q:'Does x − 2 = 6 solve (x − 2)(x − 3) = 6?',opts:['Yes: x = 8','No: then it is 6 × 5 = 30'],ans:1},task:'Find both values of x',
 show:()=>{steps[3].go();play([8,6,5,3,1,0].map(v=>()=>setX(v)),600)},go:()=>{wipe({x:4});say('x = 4: 2 × 1 = 2. Drag across the graph.');keys();S.want=ready(3,()=>S.won>=2,'Only 0 forces a factor to be 0. For any other number, rearrange to = 0 first.')}},
{h:'Match the roots',p:'Drag each root onto the factor it makes 0, or tap a root and then a factor.',predict:{q:'What root does 2x − 1 = 0 give?',opts:['x = 1','x = ½','x = 2'],ans:1},task:'Match all 4 factors',
 show:()=>{steps[4].go();play([[0,0],[1,1],[2,2],[3,3]].map(([a,b])=>()=>place(a,b)),600)},go:()=>{wipe();say('Match each factor to its root.');keys();S.want=ready(4,()=>S.won>=4,'For 2x − 1 = 0, add 1 then divide by 2: x = ½. The coefficient matters.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Solve (x − 6)(x + 1) = 0.',[['x = 6 or x = −1','ok'],['x = −6 or x = 1','sign'],['x = 6 only','one']]],
 ['Solve x² = 7x.',[['x = 0 or x = 7','ok'],['x = 7','divide'],['x = ±√7','root']]],
 ['Solve x² − x − 6 = 0.',[['x = 3 or x = −2','ok'],['x = −3 or x = 2','sign'],['x = 6 or x = 1','factor']]],
 ['Solve x(x − 4) = 5.',[['x = 5 or x = −1','ok'],['x = 5 or x = 9','notzero'],['x = 0 or x = 4','notzero']]],
 ['Solve (2x − 3)(x + 5) = 0.',[['x = 3/2 or x = −5','ok'],['x = 3 or x = −5','coef'],['x = −3/2 or x = 5','sign']]]];
function hint(t){let m='Rearrange to = 0, factorise, then set each factor equal to 0.';
 if(t==='sign')m='Set each factor to 0 and solve: x + 1 = 0 gives x = −1. The sign flips.';
 if(t==='one')m='Either factor can be 0, so there are two solutions: x + 1 = 0 gives x = −1 too.';
 if(t==='divide')m='Dividing by x loses x = 0. Rearrange to x² − 7x = 0, then x(x − 7) = 0.';
 if(t==='root')m='x² = 7x is not x² = 7. Rearrange and factorise: x(x − 7) = 0.';
 if(t==='factor')m='Find two numbers that multiply to −6 and add to −1: −3 and 2. So (x − 3)(x + 2) = 0.';
 if(t==='notzero')m='The zero rule needs 0 on one side. Rearrange: x² − 4x − 5 = 0, so (x − 5)(x + 1) = 0.';
 if(t==='coef')m='2x − 3 = 0 gives 2x = 3, so x = 3/2. Divide by the 2.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Right: get 0 on one side, factorise, set each factor = 0.':'✗ '+hint(t)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
