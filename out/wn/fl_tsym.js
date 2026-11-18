/* Flagship – symmetry and periodicity of trig functions (ages 16–18; CCSS F-TF.4): slide a graph copy to find the period,
   mirror points on the unit circle (−θ, π − θ), sort identities, solve with symmetry + period. Angles are k·π/6. */
(()=>{
const SIN=['0','1/2','√3/2','1','√3/2','1/2','0','−1/2','−√3/2','−1','−√3/2','−1/2'],NUM={'0':0,'1/2':.5,'√3/2':.866,'1':1,'−1/2':-.5,'−√3/2':-.866,'−1':-1};
const sv=k=>SIN[((k%12)+12)%12],cv=k=>sv(k+3);
/* [name, f, period in units of π/2] */
const PER=[['sin x',Math.sin,4],['cos x',Math.cos,4],['tan x',Math.tan,2]];
const NEG=[1,2,4,7];
const SUPP=[1,2,7,8];
/* identities: [card, true?, why] */
const IDS=[['sin(θ + 2π) = sin θ',1,'A full turn lands on the same point.'],['cos(−θ) = −cos θ',0,'Mirroring in the x-axis keeps x, so cos(−θ) = cos θ: cosine is even.'],
 ['sin(π − θ) = sin θ',1,'Mirroring in the y-axis keeps the height y.'],['cos(π − θ) = cos θ',0,'Mirroring in the y-axis flips x, so cos(π − θ) = −cos θ.'],
 ['tan(θ + π) = tan θ',1,'A half-turn flips both x and y, so y/x stays the same.'],['sin(−θ) = sin θ',0,'Mirroring in the x-axis flips y, so sin(−θ) = −sin θ: sine is odd.'],
 ['cos(θ + π) = −cos θ',1,'A half-turn flips x, so the cosine changes sign.']];
/* [fn, value, range end, solutions] in sixths of π */
const SOLVE=[['sin','1/2',12,[1,5]],['cos','−1/2',12,[4,8]],['sin','−√3/2',12,[8,10]],['sin','1/2',24,[1,5,13,17]]];
VIS.reg('flagtsym',c=>{let A,G,pad,chal,qq=-1,epoch=0;const W={};
const PK='#ffe4e6',INK='#0f172a',CARD='#ffffff',RULE='#64748b',RIGHT='#047857',WRONG='#be123c',PCOL='#1d4ed8',QCOL='#b45309',CURVE='#7c3aed',GHOST='#0891b2';
const fs=n=>Math.round(n*(A.narrow?.92:1.06)),fo=(n,w)=>`${w||700} ${fs(n)}px system-ui,sans-serif`,within=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
function ang(k){if(!k)return'0';const d=gcd(k,6),n=k/d,m=6/d,s=n<0?'−':'',a=Math.abs(n);return s+(a===1?'':a)+'π'+(m===1?'':'/'+m)}
const STEPS=['per','neg','supp','ids','solve','quiz'],now=()=>STEPS[A.step],SETS={per:PER,neg:NEG,supp:SUPP,ids:IDS,solve:SOLVE},ov=k=>W[k].i>=SETS[k].length;
const warn=()=>A.col.dark?'#fda4af':WRONG,pc=()=>A.col.dark?'#93c5fd':PCOL,qc=()=>A.col.dark?'#fcd34d':QCOL,cc=()=>A.col.dark?'#c4b5fd':CURVE,gc=()=>A.col.dark?'#67e8f9':GHOST;
function ground(){G.fillStyle=A.col.dark?'#0b1120':'#f8fafc';G.fillRect(0,0,A.W,A.H)}
function set(n,w,al){G.font=fo(n,w);G.textAlign=al||'center';G.textBaseline='middle'}
function wrapT(t,x,y,w,n){const out=[];let r='';String(t).split(' ').forEach(q=>{const k=r?r+' '+q:q;if(G.measureText(k).width>w&&r){out.push(r);r=q}else r=k});out.push(r);
 const lh=fs(n)*1.25;out.forEach((s,i)=>G.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function pl(r,t,o){o=o||{};G.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,9);G.fill();G.lineWidth=o.ring?3.4:1.3;G.strokeStyle=o.ring||RULE;G.stroke();
 if(t!=null){G.fillStyle=o.fg||INK;set(o.n||17,o.w||700);wrapT(t,r.x+r.w/2,r.y+r.h/2,r.w-12,o.n||17)}}
function cap(t,won){set(14,800);const w=Math.min(A.W-8,G.measureText(t).width+26),h=fs(14)+14,y=A.H*.02;pl({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':CARD,ring:won?RIGHT:null});G.fillStyle=INK;G.fillText(t,A.W/2,y+h/2+1,w-12)}
function tx(t,y,n,col){G.fillStyle=col||A.col.tx;set(n||15,650);wrapT(t,A.W/2,y,A.W-26,n||15)}
function cls(t,L){ground();cap(t,1);L.forEach((s,i)=>pl({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:17,bg:'#ecfdf5'}))}
/* ---- graph frame: x from 0 to X radians, y from −Y to Y ---- */
function frame(X,Y,top,bot){const L=24,R=A.W-14;return{X,Y,L,R,top,bot,sx:x=>L+(x/X)*(R-L),sy:y=>(top+bot)/2-(y/Y)*(bot-top)/2,ix:px=>(px-L)/(R-L)*X}}
function axes(F,step){G.strokeStyle=A.col.dark?'#475569':'#94a3b8';G.lineWidth=1;const y0=F.sy(0);G.beginPath();G.moveTo(F.L,y0);G.lineTo(F.R,y0);G.moveTo(F.L,F.top);G.lineTo(F.L,F.bot);G.stroke();
 set(11,700);G.fillStyle=A.col.tx;for(let k=step;k*Math.PI/6<=F.X+1e-9;k+=step){const x=F.sx(k*Math.PI/6);G.beginPath();G.moveTo(x,y0-4);G.lineTo(x,y0+4);G.stroke();G.fillText(ang(k),x,y0+14)}}
function curve(F,f,col,shift,from,to,dash){G.strokeStyle=col;G.lineWidth=dash?3.5:2.5;G.setLineDash(dash?[7,5]:[]);G.beginPath();let pen=false,prev=null;
 for(let x=from;x<=to;x+=F.X/400){const y=f(x),X=x+(shift||0);if(X>F.X+1e-6)break;const ok=Math.abs(y)<=F.Y*1.15&&!(prev!=null&&Math.abs(y-prev)>F.Y);prev=y;
  if(!ok){pen=false;continue}const px=F.sx(X),py=F.sy(Math.max(-F.Y*1.1,Math.min(F.Y*1.1,y)));if(pen)G.lineTo(px,py);else{G.moveTo(px,py);pen=true}}G.stroke();G.setLineDash([])}
/* ---- 1: period ---- */
function perFrame(){return frame(4*Math.PI,PER[W.per.i][0]==='tan x'?3:1.4,A.H*.2,A.H*.62)}
function drawPer(){const s=W.per;ground();if(ov('per'))return cls('All 3 periods found',['sin, cos: period 2π (a full turn)','tan: period π (a half-turn)']);
 const [name,f]=PER[s.i],F=perFrame();cap(`Graph ${s.i+1} of 3: slide the copy until it fits y = ${name}`);axes(F,A.narrow?6:3);curve(F,f,cc(),0,0,F.X);
 const sh=s.drag!=null?s.drag:s.shift||0;curve(F,f,gc(),sh,0,2*Math.PI,1);set(13,750);G.fillStyle=gc();G.fillText(`copy of 0 to 2π, shifted by ${ang(Math.round(sh/(Math.PI/6)))}`,A.W/2,A.H*.68);
 if(s.msg)tx(s.msg,A.H*.8,13,warn());else tx('Drag sideways on the graph to slide the dashed copy.',A.H*.8,13)}
function perShift(q){const s=W.per;if(ov('per'))return;const [name,f,p]=PER[s.i],k=q*3;let m;s.shift=q*Math.PI/2;s.drag=null;
 if(q===p){s.i++;s.msg='';s.shift=0;A.sound.pop();return say(`It fits: ${name.split(' ')[0]}(x + ${ang(k)}) = ${name}. The period is ${ang(k)}.`)}
 A.sound.miss();
 if(name==='tan x'&&q===4)m='2π fits too, but it is not the smallest shift. A half-turn already repeats tan, so look smaller.';
 else if(q*2===p)m=`Shifted by π the copy is upside down: ${name.split(' ')[0]}(x + π) = −${name}. Keep sliding.`;
 else m=`Shifted by ${ang(k)} the copy does not sit on the curve. Only a whole period fits everywhere.`;s.msg=m;say(m)}
/* ---- unit circle ---- */
function ring(){const r=Math.min(A.W*.3,A.H*.27);return{x:A.W/2,y:A.H*.42,r}}
const at=(O,k)=>({x:O.x+O.r*Math.cos(k*Math.PI/6),y:O.y-O.r*Math.sin(k*Math.PI/6)});
function circle(O,P,Q){G.strokeStyle=A.col.dark?'#475569':'#94a3b8';G.lineWidth=1;G.beginPath();G.moveTo(O.x-O.r-14,O.y);G.lineTo(O.x+O.r+14,O.y);G.moveTo(O.x,O.y-O.r-14);G.lineTo(O.x,O.y+O.r+14);G.stroke();
 G.strokeStyle=A.col.tx;G.lineWidth=2;G.beginPath();G.arc(O.x,O.y,O.r,0,7);G.stroke();

 for(let k=0;k<12;k++){const d=at(O,k);G.fillStyle=A.col.dark?'#334155':'#e2e8f0';G.beginPath();G.arc(d.x,d.y,7,0,7);G.fill();G.strokeStyle=RULE;G.lineWidth=1;G.stroke()}
 const dot=(k,col,lab)=>{const d=at(O,k);G.strokeStyle=col;G.lineWidth=2.5;G.beginPath();G.moveTo(O.x,O.y);G.lineTo(d.x,d.y);G.stroke();G.fillStyle=col;G.beginPath();G.arc(d.x,d.y,10,0,7);G.fill();
  set(13,800);G.fillStyle=col;const ox=(d.x-O.x)/O.r,oy=(d.y-O.y)/O.r;G.fillText(lab,d.x+ox*30,d.y+oy*22)};
 if(P!=null)dot(P,pc(),'P');if(Q!=null)dot(Q,qc(),'Q')}
function nearestK(O,p){const a=Math.atan2(O.y-p.y,p.x-O.x);return((Math.round(a/(Math.PI/6))%12)+12)%12}
function onRing(O,p){const d=Math.hypot(p.x-O.x,p.y-O.y);return d>O.r*.55&&d<O.r+34}
/* ---- 2, 3: −θ and π − θ ---- */
const CIR={neg:[NEG,'put Q at −θ',k=>`P is at θ = ${ang(k)}: (cos θ, sin θ) = (${cv(k)}, ${sv(k)})`,'Tap a dot, or drag Q round the circle.','All 4 mirrored',['cos(−θ) = cos θ: cosine is even','sin(−θ) = −sin θ: sine is odd']],
 supp:[SUPP,'put Q at the other angle with the same sine',k=>`P is at θ = ${ang(k)}, so sin θ = ${sv(k)}. Angles from 0 to 2π.`,'Same sine = same height. Tap or drag Q.','All 4 partners found',['sin(π − θ) = sin θ: mirror in the y-axis','sin(π/6) = sin(5π/6) = 1/2']]};
function drawCirc(key){const s=W[key],C=CIR[key];ground();if(ov(key))return cls(C[4],C[5]);const k=C[0][s.i],O=ring();cap(`Angle ${s.i+1} of 4: ${C[1]}`);circle(O,k,s.q);
 tx(C[2](k),A.H*.79,14);if(s.msg)tx(s.msg,A.H*.9,13,warn());else tx(C[3],A.H*.9,13)}
function negPick(q){const s=W.neg;if(ov('neg'))return;const k=NEG[s.i],want=(12-k)%12;let m;s.q=q;
 if(q===want){s.i++;s.q=null;s.msg='';A.sound.pop();return say(`Yes: −${ang(k)} lands at ${ang(want)}. cos(−θ) = ${cv(want)} = cos θ, and sin(−θ) = ${sv(want)} = −sin θ.`)}
 A.sound.miss();if(q===k)m='That is θ itself. −θ turns the same amount the other way: clockwise.';
 else if(q===(6-k+12)%12)m='That is π − θ, the mirror in the y-axis. −θ turns clockwise, so it is the mirror in the x-axis.';
 else if(q===(6+k)%12)m='That is π + θ, a half-turn. −θ only mirrors in the x-axis: x stays the same.';
 else m=`−θ turns ${ang(k)} clockwise: same x as P, y flipped.`;s.msg=m;say(m)}
function suppPick(q){const s=W.supp;if(ov('supp'))return;const k=SUPP[s.i],want=(18-k)%12;let m;s.q=q;
 if(q===want){s.i++;s.q=null;s.msg='';A.sound.pop();return say(`Yes: π − ${ang(k)} = ${ang(want)} (or the same point a full turn on). Same height, so sin = ${sv(k)} for both.`)}
 A.sound.miss();if(q===k)m='That is P. Find the other point at the same height.';
 else if(q===(12-k)%12)m='That point has the same cosine (x), not the same sine (height).';
 else if(q===(6+k)%12)m='A half-turn flips the height, so its sine is the negative of sin θ.';
 else m=`sin there is ${sv(q)}, not ${sv(k)}. Mirror P in the y-axis.`;s.msg=m;say(m)}
/* ---- 4: identities ---- */
function idBins(){const y=A.H*.6,h=A.H*.28,w=(A.W-36)/2;return[{v:1,t:'always true',x:12,y,w,h},{v:0,t:'not true',x:24+w,y,w,h}]}
function idCard(){const w=Math.min(A.W-24,fs(300)),h=fs(62);return W.hold?{x:W.hold.x-w/2,y:W.hold.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawIds(){const s=W.ids;ground();if(ov('ids'))return cls('All 7 identities sorted',['cos(−θ) = cos θ, sin(−θ) = −sin θ','sin(π − θ) = sin θ, cos(π − θ) = −cos θ']);
 cap(`Card ${s.i+1} of 7: is it true for every θ?`);idBins().forEach(r=>pl(r,r.t,{n:17,bg:r.v?'#dcfce7':PK,ring:s.bad===r.v?WRONG:null}));
 pl(idCard(),IDS[s.i][0],{n:20,w:800,ring:W.hold?PCOL:null});if(s.msg)tx(s.msg,A.H*.44,13,warn())}
function idSort(v){const s=W.ids;if(ov('ids'))return;const [t,ok,why]=IDS[s.i];let m;
 if(v===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`${t}: ${ok?'always true':'not true'}. ${why}`)}
 s.bad=v;A.sound.miss();m=`Test it on the circle: ${why}`;s.msg=m;say(m)}
/* ---- 5: solve with symmetry and period ---- */
function solFrame(){const R=SOLVE[W.solve.i];return frame(R[2]*Math.PI/6,1.3,A.H*.2,A.H*.64)}
function drawSolve(){const s=W.solve;ground();if(ov('solve'))return cls('All 4 equations solved',['sin x = 1/2: x = π/6 and 5π/6 (π − θ)','then add 2π for the next turn']);
 const [fn,val,end,sols]=SOLVE[s.i],F=solFrame(),f=fn==='sin'?Math.sin:Math.cos;cap(`Equation ${s.i+1} of 4: tap every solution`);
 tx(`${fn} x = ${val} for 0 ≤ x ≤ ${ang(end)}   (found ${s.got.length} of ${sols.length})`,A.H*.13,14);axes(F,end>12?(A.narrow?6:3):2);curve(F,f,cc(),0,0,F.X);
 G.setLineDash([6,5]);G.strokeStyle=gc();G.lineWidth=2;G.beginPath();G.moveTo(F.L,F.sy(NUM[val]));G.lineTo(F.R,F.sy(NUM[val]));G.stroke();G.setLineDash([]);
 s.got.forEach(k=>{const x=F.sx(k*Math.PI/6),y=F.sy(NUM[val]);G.fillStyle=RIGHT;G.beginPath();G.arc(x,y,9,0,7);G.fill();set(12,800);G.fillStyle=A.col.tx;G.fillText(ang(k),x,y-18)});
 if(s.bad!=null){const x=F.sx(s.bad*Math.PI/6),y=F.sy(f(s.bad*Math.PI/6));G.strokeStyle=warn();G.lineWidth=3;G.beginPath();G.arc(x,y,10,0,7);G.stroke()}
 if(s.msg)tx(s.msg,A.H*.82,13,warn());else tx('Tap where the curve meets the dashed line.',A.H*.82,13)}
function solveTap(k){const s=W.solve;if(ov('solve'))return;const [fn,val,end,sols]=SOLVE[s.i];let m;if(s.got.includes(k))return;
 if(sols.includes(k)){s.got.push(k);s.bad=null;s.msg='';A.sound.pop();if(s.got.length===sols.length){s.i++;s.got=[];return say(`All found: x = ${sols.map(ang).join(', ')}.`)}
  return say(`x = ${ang(k)} works. ${s.got.length===1&&sols.length>1?'Use symmetry for the next one.':'Now use the period for the rest.'}`)}
 s.bad=k;A.sound.miss();const got=fn==='sin'?sv(k):cv(k);
 if(got.replace('−','')===val.replace('−',''))m=`${fn} ${ang(k)} = ${got}: right size, wrong sign. Check which quadrants give ${val}.`;
 else m=`${fn} ${ang(k)} = ${got}, not ${val}. Look where the curve crosses the dashed line.`;s.msg=m;say(m)}
/* ---- pointer ---- */
function down(p){const k=now();
 if(k==='per'&&!ov('per')&&p.y>A.H*.15&&p.y<A.H*.72){W.per.x0=p.x;W.per.s0=W.per.shift||0;W.per.drag=W.per.s0;W.hold={per:1};A.redraw();return true}
 if((k==='neg'||k==='supp')&&!ov(k)){const O=ring();if(onRing(O,p)){W.hold={ring:k};W[k].q=nearestK(O,p);A.redraw();return true}}
 if(k==='ids'&&!ov('ids')&&within(p,idCard())){W.hold={x:p.x,y:p.y};A.redraw();return true}
 if(k==='solve'&&!ov('solve')){const F=solFrame(),x=F.ix(p.x),kk=Math.round(x/(Math.PI/6));if(p.y>F.top-10&&p.y<F.bot+20&&kk>0&&kk<=SOLVE[W.solve.i][2])solveTap(kk)}return false}
function move(p){const h=W.hold;if(!h)return;const k=now();
 if(h.per){const F=perFrame();W.per.drag=Math.max(0,Math.min(2*Math.PI,W.per.s0+(p.x-W.per.x0)/(F.R-F.L)*F.X))}
 else if(h.ring)W[h.ring].q=nearestK(ring(),p);else{h.x=p.x;h.y=p.y}A.redraw()}
function up(p){const h=W.hold;if(!h)return;W.hold=null;const k=now();
 if(h.per){const q=Math.round(W.per.drag/(Math.PI/2));W.per.drag=null;if(q>0)return perShift(q);W.per.shift=0;return A.redraw()}
 if(h.ring==='neg')return negPick(W.neg.q);if(h.ring==='supp')return suppPick(W.supp.q);
 if(k==='ids'){const b=idBins().find(r=>within(p,r));if(b)return idSort(b.v)}A.redraw()}
function wipe(){epoch++;for(const k in W)delete W[k];Object.assign(W,{per:{i:0,shift:0,drag:null},neg:{i:0,q:null},supp:{i:0,q:null},ids:{i:0},solve:{i:0,got:[]},hold:null,probe:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();W.probe()}
function arm(i,first,ok,msg){wipe();say(first);W.probe=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function btns(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='per'&&!ov('per'))[1,2,3,4].forEach(q=>b(`+${ang(q*3)}`,()=>perShift(q),`Slide the copy by ${ang(q*3)}`));
 if(k==='neg'&&!ov('neg'))for(let q=0;q<12;q++)b(ang(q),()=>negPick(q),`Put Q at ${ang(q)}`);
 if(k==='supp'&&!ov('supp'))for(let q=0;q<12;q++)b(ang(q),()=>suppPick(q),`Put Q at ${ang(q)}`);
 if(k==='ids'&&!ov('ids')){b('Always true',()=>idSort(1),'The identity is always true');b('Not true',()=>idSort(0),'The identity is not true')}
 if(k==='solve'&&!ov('solve')){const end=SOLVE[W.solve.i][2];for(let q=1;q<=end;q++)if(!W.solve.got.includes(q))b(ang(q),()=>solveTap(q),`x = ${ang(q)} is a solution`)}}
const steps=[
{h:'It repeats',p:'f is periodic if sliding its graph sideways by p gives the same graph: f(x + p) = f(x). The smallest such p is the period.',
predict:{q:'What is the period of tan x?',opts:['2π, like sin and cos','π'],ans:1},task:'Find all 3 periods',
show:()=>demo(0,PER.map(q=>()=>perShift(q[2])),700),go:()=>arm(0,'Drag sideways on the graph to slide the copy.',()=>ov('per'),'A full turn repeats sin and cos; a half-turn repeats tan.')},
{h:'Mirror in the x-axis',p:'Turning by −θ goes the same amount clockwise. The point is the mirror image of P in the x-axis: x stays, y flips.',
predict:{q:'How does cos(−θ) compare with cos θ?',opts:['it is −cos θ','it is the same'],ans:1},task:'Mirror all 4 angles',
show:()=>demo(1,NEG.map(k=>()=>negPick((12-k)%12)),650),go:()=>arm(1,'Put Q at −θ.',()=>ov('neg'),'cos(−θ) = cos θ (even); sin(−θ) = −sin θ (odd).')},
{h:'Same height, other side',p:'Sine is the height of the point. Mirror P in the y-axis and the height stays the same, at angle π − θ.',
predict:{q:'sin(π/6) = 1/2. What is sin(5π/6)?',opts:['−1/2','1/2'],ans:1},task:'Find all 4 partners',
show:()=>demo(2,SUPP.map(k=>()=>suppPick((18-k)%12)),650),go:()=>arm(2,'Put Q at the other angle with the same sine.',()=>ov('supp'),'sin(π − θ) = sin θ.')},
{h:'True for every θ?',p:'Each identity is a picture on the circle: a full turn, a mirror or a half-turn.',task:'Sort all 7 identities',
show:()=>demo(3,IDS.map(q=>()=>idSort(q[1])),600),go:()=>arm(3,'Drag the card to always true or not true.',()=>ov('ids'),'Mirror, half-turn or full turn: each one decides the signs.')},
{h:'Every solution',p:'Your calculator gives one solution. Symmetry gives the partner in the same turn, and the period gives the rest.',
predict:{q:'How many solutions has sin x = 1/2 for 0 ≤ x ≤ 4π?',opts:['2','4'],ans:1},task:'Solve all 4 equations',
show:()=>demo(4,SOLVE.flatMap(q=>q[3].map(k=>()=>solveTap(k))),400),go:()=>arm(4,'Tap every solution on the graph.',()=>ov('solve'),'Symmetry for the partner, the period for the next turn.')},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.probe()});
const QS=[
{q:'sin(π/6) = 1/2. What is sin(5π/6)?',a:'1/2',o:[['−1/2','5π/6 = π − π/6: the mirror in the y-axis keeps the height, so the sign stays +.'],['√3/2','Symmetry keeps the size 1/2; √3/2 is sin(π/3).']]},
{q:'What is cos(−π/3)?',a:'1/2',o:[['−1/2','Cosine is even: the mirror in the x-axis keeps x, so cos(−π/3) = cos(π/3).'],['−√3/2','That mixes up sine and cosine as well as the sign.']]},
{q:'What is the period of tan x?',a:'π',o:[['2π','2π works, but a half-turn already repeats tan, so the period is π.'],['π/2','tan(x + π/2) is not tan x: tan 0 = 0 but tan(π/2) is undefined.']]},
{q:'Which is true for every θ?',a:'sin(−θ) = −sin θ',o:[['sin(−θ) = sin θ','The mirror in the x-axis flips the height, so sine is odd.'],['cos(−θ) = −cos θ','The mirror in the x-axis keeps x, so cosine is even.']]},
{q:'sin(θ + 2π) is equal to',a:'sin θ',o:[['sin θ + 2π','The 2π is inside the bracket: a full turn, not an added number.'],['−sin θ','A full turn lands on the same point, so nothing flips.']]},
{q:'cos(π − θ) is equal to',a:'−cos θ',o:[['cos θ','The mirror in the y-axis flips x, so the sign changes.'],['sin θ','That mixes it up with sin(π − θ) = sin θ.']]}];
function pose(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,''],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why)}
function draw(){const k=now();if(k==='quiz'){ground();cap('Challenge',1);const O=ring();circle(O,1,5);tx('sin(π − θ) = sin θ   cos(−θ) = cos θ',A.H*.8,15);tx('period 2π for sin, cos; π for tan',A.H*.89,15);return}
 ({per:drawPer,neg:()=>drawCirc('neg'),supp:()=>drawCirc('supp'),ids:drawIds,solve:drawSolve})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;G=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Angle buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});btns()}}).start()})})();
