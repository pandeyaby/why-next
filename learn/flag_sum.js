/* Flagship – sum of an arithmetic series (ages 16–18): flip and slide a copy of the staircase onto itself so every
   column holds first + last (Gauss's pairing, Sₙ = n/2 (a + l)), find the last term a + (n − 1)d, count terms as gaps + 1,
   hunt for the smallest n with Sₙ ≥ T, then build series to hit goals. Drag on the canvas or use the buttons. */
(()=>{
const PAIR=[[1,1,10],[2,3,6],[5,4,5]],LAST=[[3,4,10],[7,-2,8],[-5,6,12]],COUNT=[[5,5,50],[3,4,43],[-7,3,20]],REACH=[[1,2,200],[5,3,500],[40,-3,250]];
const AIMS=[['Make Sₙ = 0 with n > 1',(a,d,n,s)=>n>1&&s===0],['Make S₁₀ = 100',(a,d,n,s)=>n===10&&s===100],['A falling series with Sₙ > 0 but last term < 0',(a,d,n,s,l)=>d<0&&s>0&&l<0]];
const DEMO=[[-5,2,6],[1,2,10],[10,-3,7]],MI='−';
const neg=v=>v<0?MI+(-v):''+v,tm=(a,d,k)=>a+(k-1)*d,sum=(a,d,n)=>n*(2*a+(n-1)*d)/2;
VIS.reg('flagsum',c=>{let A,bar,box,qi=-1,ver=0;
const init0=()=>({want:()=>{},won:0,r:0,flip:false,dx:2,hold:null,bad:-1,n:1,a:2,d:3,hit:{},pick:-1}),S=init0();
const phase=()=>['pair','last','count','reach','free','quiz'][A.step],instant=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const target=()=>({pair:3,last:3,count:3,reach:3,free:3}[phase()]||9);
function label(g,t,x,y,n,col,al,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
/* ---- 1. Gauss pairing: original staircase from the floor, copy hanging from the ceiling ---- */
function pairGeom(){const[a,d,n]=PAIR[Math.min(S.r,2)],l=tm(a,d,n),x0=A.W*.08,w=A.W*.84/n,top=A.H*.12,base=A.H*.78,u=(base-top)/(a+l);return{a,d,n,l,x0,w,top,base,u}}
function drawPair(g){const C=A.col,G=pairGeom(),{a,d,n,l,x0,w,top,base,u}=G,off=S.hold&&S.hold.live!=null?S.hold.live:S.dx;
 g.strokeStyle=A.alpha(C.mu,.6);g.lineWidth=1;g.strokeRect(x0,top,n*w,base-top);
 for(let k=1;k<=n;k++){const v=tm(a,d,k),x=x0+(k-1)*w;g.fillStyle=A.alpha(C.cy,.85);g.fillRect(x+2,base-v*u,w-4,v*u);label(g,neg(v),x+w/2,base-v*u/2,11,'#fff')}
 const full=[];for(let k=1;k<=n;k++){const j=S.flip?n+1-k:k,v=tm(a,d,j),x=x0+(k-1+off)*w;g.fillStyle=A.alpha(C.am,.55);g.fillRect(x+2,top,w-4,v*u);g.strokeStyle=C.am;g.lineWidth=2;g.strokeRect(x+2,top,w-4,v*u);label(g,neg(v),x+w/2,top+v*u/2,11,C.tx);full.push(Math.abs(off)<.01?tm(a,d,k)+v:null)}
 if(Math.abs(off)<.01)full.forEach((t,k)=>{const x=x0+k*w;if(t!==a+l){g.fillStyle=A.alpha(C.rd,.35);const v=tm(a,d,k+1),cv=t-v;if(t>a+l)g.fillRect(x+2,base-v*u,w-4,(t-a-l)*u);else g.fillRect(x+2,top+cv*u,w-4,(a+l-t)*u)}});
 const ok=S.flip&&Math.abs(off)<.01;label(g,`${a} + ${neg(tm(a,d,2))} + … + ${neg(l)}   (n = ${n})`,A.W/2,A.H*.05,13);
 label(g,ok?`every column = a + l = ${a+l} · ${n} columns · Sₙ = ${n}×${a+l} ÷ 2 = ${sum(a,d,n)}`:S.flip?'Slide the copy until every column is full':'Copy runs the same way: columns are uneven',A.W/2,A.H*.88,12,ok?C.gr:C.mu)}
function slide(by){if(phase()!=='pair'||S.won>=target())return;S.dx=Math.max(-3,Math.min(3,S.dx+by));A.sound.tick();judgePair()}
function flipIt(){if(phase()!=='pair'||S.won>=target())return;S.flip=!S.flip;A.sound.tick();judgePair()}
function judgePair(){const{a,d,n,l}=pairGeom();if(S.dx===0&&S.flip)return win(`Each column is ${a} + ${neg(l)} = ${a+l}. ${n} columns make ${n*(a+l)}, two copies, so Sₙ = ${n}(${a+l})/2 = ${sum(a,d,n)}.`);
 say(S.dx===0?`Lined up, but not flipped: column sums go ${2*a}, ${2*tm(a,d,2)}, … and are not equal. Reverse the copy so last pairs with first.`:`Copy shifted ${Math.abs(S.dx)} column${Math.abs(S.dx)>1?'s':''} ${S.dx>0?'right':'left'}.${S.flip?'':' It also runs the same way as the original.'}`);A.redraw()}
/* ---- 2. last term ---- */
function opts3(){const[a,d,n]=LAST[Math.min(S.r,2)];return[[a+(n-1)*d,'ok'],[a+n*d,'nd'],[n*d,'noa']].sort((p,q)=>(p[0]*7+n)%5-(q[0]*7+n)%5)}
function tiles(k){const gap=10,w=Math.min((A.W-20-gap*(k-1))/k,170),x0=(A.W-k*w-gap*(k-1))/2;return Array.from({length:k},(_,i)=>({x:x0+i*(w+gap),y:A.H*.64,w,h:Math.min(A.H*.2,70)}))}
function card(g,r,hot,on){const C=A.col;g.fillStyle=on?A.alpha(C.gr,.2):(C.dark?'#1e293b':'#f8fafc');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=hot?C.rd:on?C.gr:C.tx;g.lineWidth=hot||on?4:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
function drawLast(g){const C=A.col,[a,d,n]=LAST[Math.min(S.r,2)],k=Math.min(n,8),w=(A.W-20)/k;label(g,`a = ${neg(a)}, d = ${neg(d)}, n = ${n}: what is the last term l?`,A.W/2,A.H*.07,13);
 for(let i=1;i<=k;i++){const x=10+(i-1)*w,last=i===k;card(g,{x:x+2,y:A.H*.16,w:w-4,h:A.H*.16},false,false);label(g,last?'l = ?':neg(tm(a,d,i)),x+w/2,A.H*.24,12,last?C.vi:C.tx,800);label(g,last?`term ${n}`:`term ${i}`,x+w/2,A.H*.36,10,C.mu);
  if(i<k&&i<3){g.strokeStyle=C.am;g.lineWidth=2;g.beginPath();g.arc(x+w,A.H*.15,w*.35,Math.PI*1.1,Math.PI*1.9);g.stroke();label(g,(d<0?'':'+')+neg(d),x+w,A.H*.1,10,C.am)}}
 label(g,`from term 1 to term ${n} there are ${n-1} jumps of d`,A.W/2,A.H*.5,12,C.mu);tiles(3).forEach((r,i)=>{card(g,r,S.bad===i);label(g,neg(opts3()[i][0]),r.x+r.w/2,r.y+r.h/2,18,C.tx,800)})}
function pickLast(i){if(phase()!=='last'||S.won>=target())return;const[a,d,n]=LAST[Math.min(S.r,2)],[v,t]=opts3()[i];
 if(t==='nd')return miss(`${neg(v)} is a + nd: that adds d ${n} times, but term 1 already is a, so there are only ${n-1} jumps.`,i);
 if(t==='noa')return miss(`${neg(v)} is n × d: it forgets the first term a = ${neg(a)} you start from.`,i);
 win(`l = a + (n − 1)d = ${neg(a)} + ${n-1}×${neg(d)} = ${neg(v)}.`)}
/* ---- 3. count terms on a number line ---- */
function lineGeom(){const[a,d,l]=COUNT[Math.min(S.r,2)],lo=Math.min(0,a)-d,hi=l+2.5*d,x0=A.W*.06,x1=A.W*.94,X=v=>x0+(v-lo)/(hi-lo)*(x1-x0);return{a,d,l,lo,hi,x0,x1,X,need:(l-a)/d+1,max:(l-a)/d+3}}
function drawCount(g){const C=A.col,G=lineGeom(),{a,d,l,X,x0,x1,need}=G,y=A.H*.45;label(g,`${neg(a)} + ${neg(a+d)} + ${neg(a+2*d)} + … + ${neg(l)}: how many terms?`,A.W/2,A.H*.08,13);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(X(l),y-34);g.lineTo(X(l),y+34);g.stroke();label(g,`l = ${neg(l)}`,X(l),y-44,11,C.vi);
 for(let k=1;k<=G.max;k++){const v=tm(a,d,k),on=k<=S.n;g.beginPath();g.arc(X(v),y,on?8:5,0,7);g.fillStyle=on?C.cy:A.alpha(C.mu,.5);g.fill();if(on&&(k===1||k===S.n||G.max<12))label(g,neg(v),X(v),y+22,10,C.tx)}
 for(let k=1;k<S.n;k++){const p=X(tm(a,d,k)),q=X(tm(a,d,k+1));g.strokeStyle=A.alpha(C.am,.8);g.lineWidth=2;g.beginPath();g.arc((p+q)/2,y-4,(q-p)/2,Math.PI,0);g.stroke()}
 label(g,`n = ${S.n} terms · ${S.n-1} gaps of ${neg(d)} · last lit term ${neg(tm(a,d,S.n))}`,A.W/2,A.H*.72,13,S.n===need?C.gr:C.tx);label(g,'drag across the line to set n',A.W/2,A.H*.84,11,C.mu)}
function setN(n){if(phase()!=='count'||S.won>=target())return;const G=lineGeom();n=Math.max(1,Math.min(G.max,n));if(n===S.n)return;S.n=n;A.sound.tick();const last=tm(G.a,G.d,n);
 if(n===G.need)return win(`n = ${n}: (l − a)/d = ${(G.l-G.a)/G.d} gaps, plus 1 for the first term, gives ${n} terms.`);
 say(n===G.need-1?`n = ${n} reaches only ${neg(last)}. ${n} is the number of gaps (l − a)/d; the terms are one more.`:`n = ${n}: last lit term ${neg(last)}, target ${neg(G.l)}.`);A.redraw()}
/* ---- 4. smallest n with Sn >= T ---- */
function reachGeom(){const[a,d,T]=REACH[Math.min(S.r,2)],N=20,vals=Array.from({length:N},(_,i)=>sum(a,d,i+1)),top=Math.max(T,...vals)*1.08,x0=A.W*.1,w=A.W*.86/N,base=A.H*.8,ht=A.H*.62;return{a,d,T,N,vals,x0,w,base,Y:v=>base-v/top*ht,first:vals.findIndex(v=>v>=T)+1}}
function drawReach(g){const C=A.col,G=reachGeom(),{a,d,T,vals,x0,w,base,Y}=G;label(g,`${a} + ${neg(a+d)} + ${neg(a+2*d)} + …: smallest n with Sₙ ≥ ${T}?`,A.W/2,A.H*.06,13);
 vals.forEach((v,i)=>{const x=x0+i*w;g.fillStyle=i+1===S.pick?C.vi:v>=T?A.alpha(C.gr,.75):A.alpha(C.cy,.7);g.fillRect(x+1,Y(v),w-2,base-Y(v));if(S.bad===i)g.strokeStyle=C.rd,g.lineWidth=3,g.strokeRect(x+1,Y(v),w-2,base-Y(v));if((i+1)%5===0)label(g,''+(i+1),x+w/2,base+12,10,C.mu)});
 g.strokeStyle=C.rd;g.setLineDash([8,6]);g.lineWidth=2;g.beginPath();g.moveTo(x0,Y(T));g.lineTo(x0+20*w,Y(T));g.stroke();g.setLineDash([]);label(g,`T = ${T}`,x0+2,Y(T)-10,11,C.rd,'left');
 if(S.pick>0)label(g,`S${S.pick} = ${S.pick}/2 × (${2*a} + ${S.pick-1}×${neg(d)}) = ${vals[S.pick-1]}`,A.W/2,A.H*.92,12,C.tx);else label(g,'tap a bar (or use the buttons)',A.W/2,A.H*.92,11,C.mu)}
function pickN(n){if(phase()!=='reach'||S.won>=target())return;const G=reachGeom();n=Math.max(1,Math.min(G.N,n));S.pick=n;A.sound.tick();const v=G.vals[n-1];
 if(n===G.first)return win(`n = ${n}: S${n} = ${v} ≥ ${G.T}, and S${n-1} = ${G.vals[n-2]} is still short. Round the root up, never down.`);
 if(v<G.T)return miss(`S${n} = ${v} is below ${G.T}. ${G.d<0?'':'Rounding the root down lands here; '}you need a bigger n.`,n-1);
 miss(`S${n} = ${v} reaches ${G.T}, but S${n-1} = ${G.vals[n-2]} already does too. Look for the first n.${G.d<0?' With d < 0, Sₙ rises then falls, so the quadratic has two roots; take the smaller.':''}`,n-1)}
/* ---- 5. free build ---- */
function drawFree(g){const C=A.col,{a,d,n}=S,l=tm(a,d,n),s=sum(a,d,n),k=Math.min(n,20),w=A.W*.84/20,x0=A.W*.08,mid=A.H*.5,big=Math.max(5,...Array.from({length:k},(_,i)=>Math.abs(tm(a,d,i+1)))),u=A.H*.25/big;
 g.strokeStyle=A.alpha(C.mu,.7);g.lineWidth=1;g.beginPath();g.moveTo(x0,mid);g.lineTo(x0+20*w,mid);g.stroke();
 for(let i=1;i<=k;i++){const v=tm(a,d,i),x=x0+(i-1)*w;g.fillStyle=v<0?A.alpha(C.rd,.75):A.alpha(C.cy,.8);g.fillRect(x+1,v<0?mid:mid-v*u,w-2,Math.max(1,Math.abs(v)*u))}
 label(g,`a = ${neg(a)}   d = ${neg(d)}   n = ${n}   l = ${neg(l)}`,A.W/2,A.H*.07,14);label(g,`Sₙ = n/2 (a + l) = ${n}/2 × (${neg(a+l)}) = ${neg(s)}`,A.W/2,A.H*.82,12,C.tx);
 label(g,`Sₙ = n/2 (2a + (n − 1)d) = ${n}/2 × (${neg(2*a)} + ${n-1}×${neg(d)}) = ${neg(s)}`,A.W/2,A.H*.9,11,C.mu);
 const left=AIMS.filter((_,i)=>!S.hit[i]);label(g,left.length?`Goal: ${left[0][0]}`:'All goals hit',A.W/2,A.H*.15,12,C.vi)}
function tweak(key,by){if(phase()!=='free'||S.won>=target())return;const lim={a:[-10,20],d:[-5,5],n:[1,20]}[key];S[key]=Math.max(lim[0],Math.min(lim[1],S[key]+by));A.sound.tick();check()}
function check(){const{a,d,n}=S,l=tm(a,d,n),s=sum(a,d,n);say(`a ${neg(a)}, d ${neg(d)}, n ${n}: S = ${neg(s)}.`);
 AIMS.forEach(([t,f],i)=>{if(!S.hit[i]&&f(a,d,n,s,l)){S.hit[i]=true;S.won++;A.sound.pop();say(`Goal hit: ${t}. S = ${neg(s)}.`)}});buttons();A.redraw();if(S.won>=target())S.want()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){label(g,'Sₙ = n/2 (a + l)',W/2,H*.4,24,C.tx,800);label(g,'l = a + (n − 1)d',W/2,H*.6,16);return}
 if(v!=='free'&&S.won>=target()){label(g,outro(),W/2,H/2,15);return A.fx.draw(g)}({pair:drawPair,last:drawLast,count:drawCount,reach:drawReach,free:drawFree})[v](g);A.fx.draw(g)}
const outro=()=>({pair:'Pair first with last: Sₙ = n(a + l)/2.',last:'n terms, n − 1 jumps: l = a + (n − 1)d.',count:'Terms = gaps + 1 = (l − a)/d + 1.',reach:'Smallest n: round the root up and check.'}[phase()]);
function miss(t,b){A.sound.miss();S.bad=b==null?-1:b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},instant()?10:1100);A.redraw()}
function fresh(){S.flip=false;S.dx=2;S.n=1;S.pick=-1;S.hold=null}
function win(t){S.won++;S.r++;A.sound.pop();fresh();say(S.won<target()?t+' Next one.':t);buttons();A.redraw();S.want()}
function buttons(){if(!bar)return;bar.innerHTML='';const v=phase(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);b.onclick=fn};if(v==='quiz'||(v!=='free'&&S.won>=target()))return;
 if(v==='pair'){B('Flip copy ⇄',flipIt,'Reverse the copy');B('◀ Slide',()=>slide(-1),'Slide the copy left');B('Slide ▶',()=>slide(1),'Slide the copy right')}
 if(v==='last')opts3().forEach(([x],i)=>B(neg(x),()=>pickLast(i),`Last term ${neg(x)}`));
 if(v==='count'){B('n − 1',()=>setN(S.n-1),'One fewer term');B('n + 1',()=>setN(S.n+1),'One more term')}
 if(v==='reach'){B('n − 1',()=>pickN((S.pick>0?S.pick:1)-1),'Pick one smaller n');B('n + 1',()=>pickN((S.pick>0?S.pick:0)+1),'Pick one bigger n')}
 if(v==='free')['a','d','n'].forEach(k=>{B(`${k} −`,()=>tweak(k,-1),`Decrease ${k}`);B(`${k} +`,()=>tweak(k,1),`Increase ${k}`)})}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=phase();if(v!=='free'&&S.won>=target())return false;
 if(v==='pair'){S.hold={x0:p.x,dx0:S.dx,live:null};return true}
 if(v==='last'){const i=tiles(3).findIndex(r=>inR(p,r));if(i>=0)pickLast(i);return false}
 if(v==='count'){S.hold={};move(p);return true}
 if(v==='reach'){const G=reachGeom(),i=Math.floor((p.x-G.x0)/G.w);if(i>=0&&i<G.N)pickN(i+1);return false}
 if(v==='free'){S.hold={x0:p.x,n0:S.n};return true}return false}
function move(p){if(!S.hold)return;const v=phase();
 if(v==='pair'){const{w}=pairGeom();if(Math.abs(p.x-S.hold.x0)>6)S.hold.live=Math.max(-3,Math.min(3,S.hold.dx0+(p.x-S.hold.x0)/w));A.redraw()}
 if(v==='count'){const G=lineGeom(),val=G.lo+(p.x-G.x0)/(G.x1-G.x0)*(G.hi-G.lo);setN(Math.floor((val-G.a)/G.d+1.5))}
 if(v==='free'){const n=Math.max(1,Math.min(20,S.hold.n0+Math.round((p.x-S.hold.x0)/(A.W*.042))));if(n!==S.n){S.n=n;check()}}}
function up(p){const h=S.hold;S.hold=null;if(!h)return;if(phase()==='pair'){if(h.live==null){flipIt();return}S.dx=Math.round(h.live);A.sound.tick();judgePair()}A.redraw()}
const okWhen=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function script(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},instant()?j*40+30:(j+1)*(gap||260)))}
const clear=()=>{ver++;Object.assign(S,init0());fresh()};
const steps=[
{h:'Gauss pairing',p:'Below is a staircase of terms. Above hangs a copy. Flip the copy so it runs backwards (tap the canvas or the button), then drag or slide it until every column is full.',predict:{q:'1 + 2 + … + 100: pair first with last (1 + 100, 2 + 99, …). How many pairs of 101?',opts:['100 pairs','50 pairs'],ans:1},task:'Pair up 3 series',
 show:()=>{steps[0].go();script([0,1,2].flatMap(()=>[flipIt,()=>slide(-1),()=>slide(-1)]),300)},go:()=>{clear();say('Flip the copy, then slide it into place.');buttons();S.want=okWhen(0,()=>S.won>=3,'Two copies make n columns of a + l, so Sₙ = n(a + l)/2.')}},
{h:'The last term',p:'Sₙ = n/2 (a + l) needs l. Count the jumps: from term 1 to term n is n − 1 jumps of d.',predict:{q:'a = 3, d = 4, n = 10. What is the 10th term?',opts:['3 + 10×4 = 43','3 + 9×4 = 39'],ans:1},task:'Find 3 last terms',
 show:()=>{steps[1].go();script([0,1,2].map(()=>()=>pickLast(opts3().findIndex(o=>o[1]==='ok'))),500)},go:()=>{clear();say('Pick the last term.');buttons();S.want=okWhen(1,()=>S.won>=3,'l = a + (n − 1)d, so Sₙ = n/2 (2a + (n − 1)d).')}},
{h:'Counting terms',p:'Before summing, count the terms. Drag along the line (or use n ± 1) until the last lit term is l.',predict:{q:'How many terms in 5 + 10 + 15 + … + 50?',opts:['9, as (50 − 5) ÷ 5 = 9','10'],ans:1},task:'Count 3 series',
 show:()=>{steps[2].go();script([...Array(9)].map(()=>()=>setN(S.n+1)).concat([...Array(10)].map(()=>()=>setN(S.n+1)),[...Array(9)].map(()=>()=>setN(S.n+1))),110)},go:()=>{clear();say('Set n so the last lit term is l.');buttons();S.want=okWhen(2,()=>S.won>=3,'n = (l − a)/d + 1: gaps plus one.')}},
{h:'Reaching a total',p:'Bars show Sₙ for n = 1 to 20. Tap the smallest n whose sum reaches the dashed target.',predict:{q:'Sₙ = n² here. Solving n² = 200 gives n ≈ 14.1. Smallest whole n with Sₙ ≥ 200?',opts:['14','15'],ans:1},task:'Find 3 smallest n',
 show:()=>{steps[3].go();script([15,18,9].map(n=>()=>pickN(n)),500)},go:()=>{clear();say('Tap a bar to try n.');buttons();S.want=okWhen(3,()=>S.won>=3,'Solve the quadratic, then take the next whole n up.')}},
{h:'Build your own',p:'Change a, d and n (buttons, or drag sideways for n). Both forms of Sₙ always agree. Hit all three goals.',task:'Hit 3 goals',
 show:()=>{steps[4].go();script(DEMO.map(([a,d,n])=>()=>{S.a=a;S.d=d;S.n=n;check()}),500)},go:()=>{clear();say('Change a, d or n.');buttons();A.redraw();S.want=okWhen(4,()=>S.won>=3,'n/2 (a + l) = n/2 (2a + (n − 1)d) every time.')}},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What is 1 + 2 + 3 + … + 100?',[['5050','ok'],['10100','nohalf'],['5000','pairs']]],
 ['a = 3, d = 4. What is the 10th term?',[['39','ok'],['43','nd'],['40','noa']]],
 ['How many terms are in 7 + 11 + 15 + … + 87?',[['21','ok'],['20','gaps'],['22','extra']]],
 ['Find S₁₀ for a = 2, d = 3.',[['155','ok'],['170','nd2'],['310','nohalf2']]],
 ['1 + 3 + 5 + … has Sₙ = n². Smallest n with Sₙ ≥ 150?',[['13','ok'],['12','down'],['n = ±12.2, so −13 or 13','neg']]]];
function slipNote(t){let m='Write l = a + (n − 1)d and Sₙ = n/2 (a + l), then substitute carefully.';
 if(t==='nohalf')m='100 × 101 = 10100 counts both copies of the staircase. Halve it: 5050.';if(t==='pairs')m='There are 50 pairs, each 101, not 100: 50 × 101 = 5050.';
 if(t==='nd')m='43 = 3 + 10×4 adds d ten times. Term 1 is already 3, so there are only 9 jumps: 3 + 9×4 = 39.';if(t==='noa')m='40 is 10 × 4 and forgets the start a = 3. Use a + (n − 1)d.';
 if(t==='gaps')m='(87 − 7) ÷ 4 = 20 counts the gaps. There is one more term than gaps: 21.';if(t==='extra')m='Gaps plus one, not plus two: (87 − 7) ÷ 4 + 1 = 21.';
 if(t==='nd2')m='170 uses 2a + nd. The formula is 2a + (n − 1)d: 5 × (4 + 27) = 155.';if(t==='nohalf2')m='310 forgot the n/2. S₁₀ = 10/2 × (4 + 27) = 155.';
 if(t==='down')m='12² = 144 < 150. Round the root up: 13² = 169 ≥ 150.';if(t==='neg')m='n counts terms, so it must be a positive whole number. Reject the negative root: 13.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});say('Challenge: '+q);A.redraw()}
let chain=0;
function score(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+slipNote(t)}${ok?` Streak: ${chain}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
