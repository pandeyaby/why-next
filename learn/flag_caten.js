/* Flagship – the catenary (ages 17–18): drag the lowest point of y = a cosh(x/a) to match three hanging chains and see
   that a is the height of the vertex and a bigger a means a flatter chain; scrub x to compare the chain with the parabola
   y = a + x²/(2a) (equal near the vertex, far apart in the arms); hang a 12 m chain and pull the sag down to watch the
   horizontal tension H = wa blow up (no chain can be pulled straight); find a from the span and sag of three cables and
   test the small-sag estimate a ≈ L²/(2s); sort real curves into catenary (load per unit length of cable) or parabola
   (load per horizontal length). Challenge on the vertex, the role of a, the series, the estimate and the physics. */
(()=>{const ch=Math.cosh,sh=Math.sinh,ash=Math.asinh;
const r=(v,d)=>{const s=(+v).toFixed(d==null?2:d);return s.replace('-','−')};
const TGT=[1,2,3.5],CHAIN=6,CAB=[[5,1],[5,2.5],[4,4]];
const solveA=(L,s)=>{let lo=.05,hi=1e4;for(let i=0;i<120;i++){const m=(lo+hi)/2;m*(ch(L/m)-1)>s?lo=m:hi=m}return(lo+hi)/2};
const CARDS=[['A chain hanging under its own weight',0],['A suspension bridge cable holding a flat, evenly loaded deck',1],['A power line sagging between two pylons',0],
 ['The path of a ball thrown through the air',1],['A free-standing stone arch carrying only its own weight (upside down)',0],['A jet of water from a hose (ignoring air resistance)',1]];
VIS.reg('flagcaten',c=>{let A,ctl,chal,qn=-1,streak=0;
const S={run:0,cb:()=>{},a:2.6,ti:0,hit:0,x:1,near:0,far:0,s:4,ci:0,a3:8,c3:0,wrong:-1,grab:0,y0:0,v0:0};
const kind=()=>['fit','para','hang','sag','sort','quiz'][A.step];
const sz=v=>Math.round(v*(A.narrow?1.04:1.18));
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function label(g,t,x,y,v,w,al){g.font=`${w||700} ${sz(v)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(t,x,y,A.W*.96)}
const WIN={fit:[-6,6,-.5,8],para:[-6,6,-.5,9],hang:[-6.6,6.6,-.3,7.2],sag:[-6,6,-.6,5]};
function frame(){const[a,b,lo,hi]=WIN[kind()]||WIN.fit,L=12,R=A.W-10,T=sz(28),B=A.H-sz(30);return{a,b,lo,hi,L,R,T,B,X:x=>L+(x-a)/(b-a)*(R-L),Y:y=>B-(y-lo)/(hi-lo)*(B-T),iy:py=>lo+(B-py)/(B-T)*(hi-lo),ix:px=>a+(px-L)/(R-L)*(b-a)}}
function axes(g,F){const C=A.col;g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=1.2;g.beginPath();g.moveTo(F.L,F.Y(0));g.lineTo(F.R,F.Y(0));g.moveTo(F.X(0),F.T);g.lineTo(F.X(0),F.B);g.stroke();
 for(let k=Math.ceil(F.a);k<=F.b;k+=2)if(k)label(g,r(k,0),F.X(k),F.Y(0)+10,9,600);for(let k=2;k<=F.hi;k+=2)label(g,r(k,0),F.X(0)-10,F.Y(k),9,600)}
function curve(g,F,f,col,lw,dash,x0,x1){g.save();g.beginPath();g.rect(F.L,F.T,F.R-F.L,F.B-F.T);g.clip();g.strokeStyle=col;g.lineWidth=lw||3;g.setLineDash(dash||[]);g.beginPath();
 const a=x0==null?F.a:x0,b=x1==null?F.b:x1;for(let i=0;i<=220;i++){const x=a+(b-a)*i/220,y=f(x);if(!isFinite(y)||y>F.hi*3)continue;i?g.lineTo(F.X(x),F.Y(y)):g.moveTo(F.X(x),F.Y(y))}g.stroke();g.restore()}
function dot(g,x,y,col,rad){g.beginPath();g.arc(x,y,rad||7,0,7);g.fillStyle=col;g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke()}
const hangA=s=>(CHAIN*CHAIN-s*s)/(2*s),hangL=s=>{const a=hangA(s);return a*ash(CHAIN/a)};
const bin=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.52,w,h:A.H*.4}};
const has=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.05:.3);g.fillRect(0,0,W,H);const foot=H-sz(12);
 if(k==='quiz'){label(g,'y = a cosh(x/a), vertex (0, a)',W/2,H*.3,15,800);label(g,'a = H / w: bigger a, flatter chain',W/2,H*.48,14);label(g,'≈ a + x²/(2a) near the vertex',W/2,H*.66,14);return}
 if(k==='sort'){if(S.ci<CARDS.length){const b={x:W*.05,y:H*.06,w:W*.9,h:H*.36};g.fillStyle=A.alpha(S.wrong>=0?C.rd:C.vi,.14);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=S.wrong>=0?C.rd:C.tx;g.lineWidth=2;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke();
   const words=CARDS[S.ci][0].split(' ');let line='',ls=[];g.font=`700 ${sz(14)}px system-ui,sans-serif`;words.forEach(w=>{const t=line?line+' '+w:w;if(g.measureText(t).width>b.w-20&&line){ls.push(line);line=w}else line=t});ls.push(line);
   ls.forEach((l,i)=>label(g,l,W/2,b.y+b.h/2+(i-(ls.length-1)/2)*sz(18),14,700))}else label(g,'All six sorted!',W/2,H*.24,16,800);
  ['Catenary','Parabola'].forEach((n,i)=>{const b=bin(i);g.fillStyle=A.alpha(C.cy,.1);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.stroke();label(g,n,b.x+b.w/2,b.y+sz(14),13,800);
   g.save();g.strokeStyle=i?C.or:C.gr;g.lineWidth=2.5;g.beginPath();for(let j=0;j<=40;j++){const u=-1+2*j/40,y=i?u*u:(ch(1.6*u)-1)/(ch(1.6)-1),px=b.x+12+(b.w-24)*j/40,py=b.y+b.h*.88-y*b.h*.5;j?g.lineTo(px,py):g.moveTo(px,py)}g.stroke();g.restore()});
  label(g,`Sorted: ${S.ci} of ${CARDS.length}`,W/2,foot,11,600);return}
 const F=frame();axes(g,F);
 if(k==='fit'){if(S.hit<3){const t=TGT[S.ti];curve(g,F,x=>t*ch(x/t),A.alpha(C.tx,.55),6,[3,6])}const a=S.a;curve(g,F,x=>a*ch(x/a),C.vi,3.2);dot(g,F.X(0),F.Y(a),C.or,9);
  label(g,S.hit<3?`Target ${S.ti+1} of 3   your a = ${r(a,1)}`:'All three chains matched!',W/2,sz(12),12,800);label(g,'Drag the orange lowest point up or down',W/2,foot,11,600)}
 if(k==='para'){const a=2,x=S.x;curve(g,F,z=>a+z*z/(2*a),C.or,2.4,[7,5]);curve(g,F,z=>a*ch(z/a),C.gr,3.2);const yc=a*ch(x/a),yp=a+x*x/(2*a);
  g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(F.X(x),F.Y(yp));g.lineTo(F.X(x),F.Y(Math.min(yc,F.hi)));g.stroke();dot(g,F.X(x),F.Y(Math.min(yc,F.hi)),C.gr,6);dot(g,F.X(x),F.Y(yp),C.or,6);
  label(g,`x = ${r(x,1)}: chain ${r(yc)}, parabola ${r(yp)}, gap ${r(yc-yp,3)}`,W/2,sz(12),12,800);label(g,'green: 2 cosh(x/2)   dashed: 2 + x²/4',W/2,foot,11,600)}
 if(k==='hang'){const s=S.s,a=hangA(s),L=hangL(s),top=6;curve(g,F,x=>top-s+a*(ch(x/a)-1),C.gr,3.6,null,-L,L);[-L,L].forEach(x=>{g.fillStyle=C.tx;g.fillRect(F.X(x)-8,F.Y(top)-14,16,12);dot(g,F.X(x),F.Y(top),C.cy,5)});
  dot(g,F.X(0),F.Y(top-s),C.or,9);g.setLineDash([4,4]);g.strokeStyle=C.tx;g.lineWidth=1.4;g.beginPath();g.moveTo(F.X(0)+14,F.Y(top));g.lineTo(F.X(0)+14,F.Y(top-s));g.stroke();g.setLineDash([]);
  label(g,`sag ${r(s,1)} m   span ${r(2*L,2)} m   H = ${r(a,1)}w   T(end) = ${r(a+s,1)}w`,W/2,sz(12),12,800);label(g,'Chain length always 12 m. Drag the lowest point up.',W/2,foot,11,600)}
 if(k==='sag'){if(S.c3<3){const[L,s]=CAB[S.c3],a=S.a3;curve(g,F,x=>a*(ch(x/a)-1),S.wrong>=0?C.rd:C.vi,3.2);[-L,L].forEach(x=>dot(g,F.X(x),F.Y(s),C.cy,8));
   label(g,`Cable ${S.c3+1} of 3: span ${2*L} m, sag ${s} m.  a = ${r(a,1)} gives sag ${r(a*(ch(L/a)-1))}`,W/2,sz(12),12,800)}else label(g,'All three cables solved!',W/2,sz(12),13,800);
  label(g,'Drag the curve up (bigger a) or down (smaller a)',W/2,foot,11,600)}
 A.fx&&A.fx.draw(g)}
const good=t=>{A.sound.pop();say(t);S.cb();A.redraw()};
function setA(a){if(kind()!=='fit'||S.hit>=3)return;S.a=Math.max(.5,Math.min(7,Math.round(a*10)/10));const t=TGT[S.ti];A.sound.tick();
 if(Math.abs(S.a-t)<.15){S.a=t;S.hit++;const msg=`a = ${t}: lowest point (0, ${t}). `+(S.hit===1?'Small a: a deep, steep chain.':S.hit===2?'Doubling a keeps the shape but scales it up: flatter at this zoom.':'Big a: a wide, flat chain.');if(S.hit<3){S.ti=S.hit;S.a=t>2?1.2:5}keyset();return good(msg)}
 say(`a = ${r(S.a,1)}: lowest point (0, ${r(S.a,1)}). Target is ${S.a<t?'higher and flatter':'lower and steeper'}.`);A.redraw()}
function scrub(x){if(kind()!=='para')return;x=Math.max(-6,Math.min(6,Math.round(x*10)/10));S.x=x;if(Math.abs(x)<=1)S.near=1;if(Math.abs(x)>=4)S.far=1;const yc=2*ch(x/2),yp=2+x*x/4;
 say(Math.abs(x)<=1?`x = ${r(x,1)}: gap only ${r(yc-yp,4)}. Near the vertex they match.`:Math.abs(x)>=4?`x = ${r(x,1)}: gap ${r(yc-yp)}. The chain climbs faster than the parabola.`:`x = ${r(x,1)}: gap ${r(yc-yp,3)}.`);S.cb();A.redraw()}
function setS(s){if(kind()!=='hang')return;S.s=Math.max(.5,Math.min(5.5,Math.round(s*10)/10));const a=hangA(S.s);A.sound.tick();
 say(`Sag ${r(S.s,1)} m: a = ${r(a,1)}, so the horizontal pull is ${r(a,1)} times the weight of a metre of chain.${S.s<=1?' Halve the sag again and the pull roughly doubles: it never reaches zero sag.':''}`);S.cb();A.redraw()}
function setA3(a){if(kind()!=='sag'||S.c3>=3)return;S.a3=Math.max(.5,Math.min(40,Math.round(a*10)/10));const[L,s]=CAB[S.c3],t=solveA(L,s);A.sound.tick();
 if(Math.abs(S.a3-t)<=.05){const est=L*L/(2*s);S.wrong=-1;S.c3++;const msg=`a ≈ ${r(t,2)}. Estimate L²/(2s) = ${r(est,2)}: ${Math.abs(est-t)/t<.03?'very close for a shallow cable.':'too small, by '+r(100*(t-est)/t,0)+'%: the deeper the sag, the worse the estimate.'}`;if(S.c3<3)S.a3=8;keyset();return good(msg)}
 S.wrong=-1;say(`a = ${r(S.a3,1)}: sag at the ends ${r(S.a3*(ch(L/S.a3)-1))} m, target ${s} m. ${S.a3*(ch(L/S.a3)-1)>s?'Too deep: increase a.':'Too shallow: decrease a.'}`);A.redraw()}
function binIt(k){if(S.ci>=CARDS.length)return;const[t,ans]=CARDS[S.ci];if(k===ans){S.ci++;S.wrong=-1;return good(ans?`${t}: parabola. The load is even per horizontal metre.`:`${t}: catenary. The load is even per metre along the curve.`)}
 S.wrong=k;A.sound.miss();say(k?`Not a parabola: here the weight is spread evenly along the curve itself, which gives a cosh curve.`:`Not a catenary: here the load is even per horizontal metre (or it is a projectile), which gives a parabola.`);A.redraw()}
function keyset(){if(!ctl)return;ctl.innerHTML='';const k=kind(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},ctl,t);b.onclick=f};
 if(k==='fit'&&S.hit<3){B('a − 1',()=>setA(S.a-1),'Lower the vertex by 1');B('a − 0.1',()=>setA(S.a-.1),'Lower the vertex by 0.1');B('a + 0.1',()=>setA(S.a+.1),'Raise the vertex by 0.1');B('a + 1',()=>setA(S.a+1),'Raise the vertex by 1')}
 if(k==='para')[-5,-4,-1,0,1,4,5].forEach(x=>B('x = '+r(x,0),()=>scrub(x),'Move to x = '+x));
 if(k==='hang')[5,4,3,2,1,.5].forEach(s=>B('sag '+s,()=>setS(s),'Set the sag to '+s+' metres'));
 if(k==='sag'&&S.c3<3){B('a − 1',()=>setA3(S.a3-1),'Decrease a by 1');B('a − 0.1',()=>setA3(S.a3-.1),'Decrease a by 0.1');B('a + 0.1',()=>setA3(S.a3+.1),'Increase a by 0.1');B('a + 1',()=>setA3(S.a3+1),'Increase a by 1')}
 if(k==='sort'&&S.ci<CARDS.length)['Catenary','Parabola'].forEach((n,i)=>B(n,()=>binIt(i),'Sort into '+n))}
function down(p){const k=kind();if(k==='sort'){for(let i=0;i<2;i++)if(has(p,bin(i))){binIt(i);return false}return false}if(k==='quiz')return false;const F=frame();
 if(k==='fit'){S.grab=1;setA(F.iy(p.y));return true}if(k==='para'){S.grab=1;scrub(F.ix(p.x));return true}if(k==='hang'){S.grab=1;setS(6-F.iy(p.y));return true}
 if(k==='sag'){S.grab=1;S.y0=p.y;S.v0=S.a3;return true}return false}
function move(p){if(!S.grab)return;const k=kind(),F=frame();if(k==='fit')setA(F.iy(p.y));if(k==='para')scrub(F.ix(p.x));if(k==='hang')setS(6-F.iy(p.y));if(k==='sag')setA3(S.v0*Math.exp((S.y0-p.y)*.006))}
function up(){S.grab=0}
const finish=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const play=fs=>{const t=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.run)f()},A.reduced()?j*20+20:(j+1)*480))};
const reset=()=>{S.run++;Object.assign(S,{cb:()=>{},a:2.6,ti:0,hit:0,x:1,near:0,far:0,s:4,ci:0,a3:8,c3:0,wrong:-1,grab:0})};
const steps=[
{h:'What a does',p:'A chain hangs in the shape y = a cosh(x/a). Its lowest point is (0, a). Drag that point, or use the buttons, to match each dashed chain.',
 predict:{q:'Make a bigger. The chain gets…',opts:['deeper and more curved','flatter'],ans:1},task:'Match all 3 chains',
 show:()=>{steps[0].go();play(TGT.map(t=>()=>setA(t)))},go:()=>{reset();say('Drag the lowest point.');keyset();S.cb=finish(0,()=>S.hit>=3,'a is the height of the vertex and sets the scale: the curvature at the bottom is 1/a, so bigger a means flatter.')}},
{h:'Chain or parabola?',p:'Near x = 0, cosh u ≈ 1 + u²/2, so a cosh(x/a) ≈ a + x²/(2a). Drag along the x-axis and watch the red gap.',
 predict:{q:'Near the lowest point, 2 cosh(x/2) and 2 + x²/4 are…',opts:['almost identical','very different'],ans:0},task:'Visit |x| ≤ 1 and |x| ≥ 4',
 show:()=>{steps[1].go();play([()=>scrub(.8),()=>scrub(4.5)])},go:()=>{reset();say('Drag across the graph.');keyset();S.cb=finish(1,()=>S.near&&S.far,'The next term is x⁴/(24a³): tiny near the vertex, large in the arms. A photo of a deep chain shows the difference.')}},
{h:'Pull it straight?',p:'This chain is 12 m long. Drag its lowest point up to pull the ends apart. H = wa is the horizontal pull, w the weight per metre.',
 predict:{q:'Can you pull a hanging chain perfectly straight?',opts:['Yes, with enough force','No, never'],ans:1},task:'Get the sag down to 1 m',
 show:()=>{steps[2].go();play([()=>setS(3),()=>setS(2),()=>setS(1)])},go:()=>{reset();say('Drag the lowest point up.');keyset();S.cb=finish(2,()=>S.s<=1,'With length 2ℓ and sag s, a = (ℓ² − s²)/(2s). As s → 0, a → ∞, so the pull H = wa is unbounded.')}},
{h:'Find a from the sag',p:'A cable spans 2L with sag s, so a(cosh(L/a) − 1) = s. Change a until the curve passes through both blue supports.',
 predict:{q:'For a deep sag, the shortcut a ≈ L²/(2s) is…',opts:['still accurate','too small','too big'],ans:1},task:'Solve all 3 cables',
 show:()=>{steps[3].go();play(CAB.map(([L,s])=>()=>setA3(solveA(L,s))))},go:()=>{reset();say('Cable 1: span 10 m, sag 1 m. Change a.');keyset();S.cb=finish(3,()=>S.c3>=3,'There is no closed form, so solve numerically. The estimate drops the x⁴ term, which always underestimates cosh, so it gives too small an a.')}},
{h:'Catenary or parabola?',p:'Self-weight spread along the curve gives a catenary. A load spread evenly across the horizontal gives a parabola. Tap a box.',
 predict:{q:'The main cable of a suspension bridge (holding a heavy flat deck) is closest to…',opts:['a catenary','a parabola'],ans:1},task:'Sort all 6 cards',
 show:()=>{steps[4].go();play(CARDS.map(cd=>()=>binIt(cd[1])))},go:()=>{reset();say('Card 1: '+CARDS[0][0]+'. Catenary or parabola?');keyset();S.cb=finish(4,()=>S.ci>=CARDS.length,'Hooke (1675): as hangs the flexible line, so but inverted will stand the rigid arch. An upside-down catenary arch is in pure compression.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['The lowest point of y = 3 cosh(x/3) is…',[['(0, 3)','ok'],['(0, 1)','one'],['(0, 0)','zero']]],
 ['Increasing a in y = a cosh(x/a) makes the chain…',[['flatter at the bottom','ok'],['steeper at the bottom','steep'],['move up but keep its shape','shift']]],
 ['Near x = 0, a cosh(x/a) is approximately…',[['a + x²/(2a)','ok'],['1 + x²/2','noa'],['a + x²/2','half']]],
 ['A cable spans 20 m with a sag of 0.5 m. Roughly, a is…',[['100 m','ok'],['400 m','span'],['10 m','nosq']]],
 ['Why can no hanging chain be pulled perfectly straight?',[['Zero sag needs a = H/w → ∞, an infinite pull','ok'],['The chain would get longer','stretch'],['Gravity is too strong for any chain','grav']]],
 ['Which of these is a parabola rather than a catenary?',[['A cable carrying an evenly loaded level deck','ok'],['A power line between pylons','line'],['An upside-down hanging-chain arch','arch']]]];
function why(t){let m='Go back to y = a cosh(x/a) and what a means.';
 if(t==='one')m='(0, 1) is the vertex of cosh x. Here cosh(0) = 1 is multiplied by a = 3.';
 if(t==='zero')m='cosh is never 0: at x = 0 it is 1, so the vertex is at height a.';
 if(t==='steep')m='The curvature at the vertex is 1/a, so larger a means less curved and flatter.';
 if(t==='shift')m='a scales the curve in both directions; adding a constant would shift it. The shape near the vertex flattens.';
 if(t==='noa')m='That is cosh x itself. Put u = x/a: a(1 + x²/(2a²)) = a + x²/(2a).';
 if(t==='half')m='The a inside cosh(x/a) matters: u² = x²/a², times a gives x²/(2a).';
 if(t==='span')m='L is the half-span: 10²/(2 × 0.5) = 100, not 20²/(2 × 0.5).';
 if(t==='nosq')m='The estimate is L²/(2s), with L squared: 100/1 = 100.';
 if(t==='stretch')m='Even an inextensible chain cannot be straight: the sag sets a = (ℓ² − s²)/(2s), which blows up as s → 0.';
 if(t==='grav')m='It is the other way: any weight at all needs some sag, because a straight cable has no vertical component of tension to hold it.';
 if(t==='line')m='A power line carries only its own weight spread along its length, so it is a catenary.';
 if(t==='arch')m='An inverted hanging chain is a catenary arch, the shape that stands in pure compression.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],k=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(k).concat(ops.slice(0,k)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct. Streak: ${streak}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keyset()},
 init:A=>{const el=c.el,w=el('div',{class:'fl-below'},A.below);ctl=el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keyset()}});
A.start()})})();
