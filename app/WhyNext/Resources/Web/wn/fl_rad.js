/* Flagship 41 – radian measure. A circle whose edge is measured with "radius strings": every piece of arc as long as the
   radius is one radian, painted in its own colour, so the angle in radians is literally "how many radii fit along the arc".
   (1) Drag until the arc equals the radius: 1 rad ≈ 57.3° (trap: 1°). (2) Go all the way round: 6 strings and a bit, 2π
   (trap: 360 or 4). (3) A quarter turn is π/2 (trap: π/4). (4) 135° = 3π/4 (trap: 3/4, the π dropped). (5) s = rθ: an arc
   of 10 cm on r = 4 needs 2.5 rad (trap: 10 × 4). (6) Double r at a fixed angle: s doubles, θ = s/r does not.
   Challenge: degree↔radian conversions, s = rθ and θ = s/r with options built from real slips. */
(()=>{const PI=Math.PI,TAU=2*PI,D=t=>t*180/PI,R2=x=>(Math.round(x*100)/100).toString(),
 gcd=(a,b)=>b?gcd(b,a%b):a,piF=(p,q)=>{const g=gcd(p,q);p/=g;q/=g;return (p===1?'':p)+'π'+(q===1?'':'/'+q)},
 nice=t=>{const k=Math.round(t/(PI/12));return Math.abs(t-k*PI/12)<1e-6&&k?piF(k,12):R2(t)};
VIS.reg('flagrad',c=>{let A,pad,chal,read;
 const S={t:.5,r:5,r0:null,drag:null,wob:0,goal:()=>{},tok:0,Q:null,cq:''};
 const say=x=>{c.say(x);if(read)read.textContent=x};
 const near=x=>Math.abs(S.t-x)<.011;
 function snap(v){v=Math.max(.05,Math.min(TAU,v));const k=Math.round(v/(PI/12));if(Math.abs(v-k*PI/12)<.03)return k*PI/12;
  const n=Math.round(v*10)/10;return Math.abs(v-n)<.02?n:Math.round(v*100)/100}
 const line=()=>{const t=S.t,r=S.r,s=r*t;return `θ = ${nice(t)} rad = ${R2(D(t))}°. Arc s = r × θ = ${r} × ${R2(t)} = ${R2(s)} cm, which is ${R2(t)} × the radius.`};
 function setT(v){S.t=snap(v);let x=line();if(A.step===1){const n=Math.floor(S.t+1e-9);x+=` ${n} whole string${n===1?'':'s'} plus ${R2(S.t-n)} of another.`}say(x);sync();S.goal()}
 function setR(v){S.r=Math.max(2,Math.min(8,Math.round(v)));let x=line();if(A.step===5&&S.r0)x+=` Before: s = ${R2(S.r0*S.t)} cm on r = ${S.r0}. s ÷ r is still ${R2(S.t)}.`;say(x);sync();S.goal()}
 const glide=(to,set,ms=800)=>{const o={v:S.t},k=++S.tok;A.tween(o,{v:to},ms,'io',()=>{if(k===S.tok)set(to)})};
 function walkR(list){const k=++S.tok;let j=0;const nx=()=>{if(k!==S.tok||j>=list.length)return;setR(list[j++]);A.tween({u:0},{u:1},300,'io',nx)};nx()}
 function describe(){if(A.step===7)return S.cq||'Challenge.';const t=S.t,r=S.r;
  return `Circle of radius ${r} cm. The arc from the right-hand radius turns through θ = ${nice(t)} rad, ${R2(D(t))} degrees. The arc is ${R2(r*t)} cm long, ${R2(t)} times the radius.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step;
  const btn=(t,lab,f)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab},pad,t);b.onclick=()=>{f();A.sound.tick()}};
  if(s===7)return A.redraw();
  btn('−15°','Turn back by 15 degrees, π/12 radians',()=>setT(S.t-PI/12));btn('−0.1 rad','Turn back by 0.1 radians',()=>setT(S.t-.1));
  btn('+0.1 rad','Turn on by 0.1 radians',()=>setT(S.t+.1));btn('+15°','Turn on by 15 degrees, π/12 radians',()=>setT(S.t+PI/12));
  if(s>=4){btn('r − 1','Make the radius 1 cm shorter',()=>setR(S.r-1));btn('r + 1','Make the radius 1 cm longer',()=>setR(S.r+1))}
  A.redraw()}
 // ---- drawing ----
 const HUE=['ac','pk','am','gr','vi','cy','rd'];
 const lay=()=>{const N=A.narrow,u=Math.min(N?A.W*.4:A.W*.25,A.H*.36);return{x:N?A.W*.5:A.W*.32,y:A.H*(N?.42:.5),u:u/8}};
 const pt=(L,a,d)=>[L.x+d*Math.cos(a),L.y-d*Math.sin(a)];
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,s=A.step,L=lay(),Q=s===7&&S.Q;L.x+=S.wob*Math.sin(S.wob*28)*4;S.L=L;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.07)],[1,A.mix(C.pn,C.cy,.06)]]);ctx.fillRect(0,0,W,H);
  const t=Q?Q.t:S.t,r=Q?Q.r:S.r,rr=r*L.u;
  ctx.strokeStyle=A.alpha(C.tx,.45);ctx.lineWidth=2;ctx.beginPath();ctx.arc(L.x,L.y,rr,0,7);ctx.stroke();
  if(s===5&&S.r0&&S.r0!==S.r){ctx.setLineDash([5,5]);ctx.strokeStyle=C.mu;ctx.beginPath();ctx.arc(L.x,L.y,S.r0*L.u,0,-t,true);ctx.stroke();ctx.setLineDash([])}
  // radian marks round the whole edge: 1, 2, … 6
  if(!Q)for(let i=1;i<=6;i++){const[a,b]=pt(L,i,rr-6),[e,f]=pt(L,i,rr+6),[lx,ly]=pt(L,i,rr+18);ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(e,f);ctx.stroke();
   P.label(String(i),lx,ly,{font:'700 11px system-ui',bg:A.alpha('#334155',.9)})}
  // the arc, one colour per radius-length string
  for(let i=0;i<Math.ceil(t-1e-9);i++){const a0=i,a1=Math.min(t,i+1);ctx.strokeStyle=C[HUE[i%7]];ctx.lineWidth=8;ctx.lineCap='butt';ctx.beginPath();ctx.arc(L.x,L.y,rr,-a0,-a1,true);ctx.stroke()}
  // the radius itself is the first string, laid straight
  ctx.strokeStyle=C[HUE[0]];ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(L.x,L.y);ctx.lineTo(L.x+rr,L.y);ctx.stroke();
  const[hx,hy]=pt(L,t,rr);ctx.strokeStyle=A.alpha(C.tx,.75);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(L.x,L.y);ctx.lineTo(hx,hy);ctx.stroke();
  ctx.strokeStyle=C.tx;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(L.x,L.y,Math.min(22,rr*.25),0,-t,true);ctx.stroke();
  P.label(`r = ${r}`,L.x+rr/2,L.y+14,{font:'700 12px system-ui',bg:A.alpha('#1e293b',.9)});
  const[mx,my]=pt(L,t/2,Math.min(22,rr*.25)+18);
  P.label(Q?(Q.k==='ang'?'θ = ?':Q.k==='d2r'?`${R2(D(t))}°`:Q.k==='arc'?`${t} rad`:`${nice(t)}`):`${nice(t)} rad`,mx,my,{font:'800 12px system-ui',bg:A.alpha('#1e293b',.92)});
  if(!Q){P.ball(hx,hy,11,C.pk);if(s>=4)P.ball(L.x+rr,L.y,9,C.gr)}S.h=[hx,hy];
  // read-out panel
  const N=A.narrow,px=N?W*.06:W*.62,py=N?H*.84:H*.24,lh=N?20:26,F='700 12px system-ui',al={align:'left',font:F,bg:A.alpha('#334155',.92)};
  if(Q){P.label(Q.k==='arc'?'s = ?':Q.k==='ang'?`s = ${R2(Q.r*Q.t)} cm, r = ${Q.r} cm`:'degrees ↔ radians',px,py,al)}
  else{P.label(`${nice(t)} rad = ${R2(D(t))}°`,px,py,{...al,font:'800 13px system-ui',bg:A.alpha('#5b21b6',.95)});
   P.label(`s = r × θ = ${R2(r*t)} cm`,px,py+lh,{...al,bg:A.alpha('#065f46',.95)});
   if(!N)P.label(`π rad = 180°,  1 rad ≈ 57.3°`,px,py+2*lh,al)}
  A.fx.draw(ctx)}
 // ---- steps ----
 const ok=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const reset=(t,r)=>{S.tok++;S.r0=null;S.goal=()=>{};S.t=t;S.r=r};
 const steps=[
  {h:'One radian',p:'The thick bar along the radius is a string exactly r long. Bend it round the edge: the angle it makes at the centre is one radian.',
   predict:{q:'An arc as long as the radius makes an angle of about…',opts:['1°','57°','90°'],ans:1},
   task:'Drag the pink dot until the arc is exactly one radius long',show:()=>glide(1,setT),
   go:()=>{reset(.4,5);setT(.4);S.goal=ok(0,()=>near(1),()=>'θ = 1 rad ≈ 57.3°. A radian compares the arc with the radius, so it is much bigger than 1°.')}},
  {h:'Strings round the whole circle',p:'Each colour is one more radius-length string laid on the edge. The numbers mark 1, 2, 3 … radians.',
   predict:{q:'How many radius-lengths fit round the whole circle?',opts:['4','360','a bit more than 6'],ans:2},
   task:'Drag the dot all the way round to a full turn',show:()=>glide(TAU,setT,1400),
   go:()=>{reset(1,5);setT(1);S.goal=ok(1,()=>near(TAU),()=>'6 strings and 0.28 of another: 2π ≈ 6.28 rad, because the edge is 2πr long. So 360° = 2π rad and 180° = π rad.')}},
  {h:'A quarter turn',p:'Half a turn is π radians. Watch both read-outs as you turn.',
   predict:{q:'90° in radians is…',opts:['π/4','π/2','90π'],ans:1},
   task:'Make a quarter turn, 90°',show:()=>glide(PI/2,setT),
   go:()=>{reset(.3,5);setT(.3);S.goal=ok(2,()=>near(PI/2),()=>'90° is half of 180°, so it is half of π: π/2 ≈ 1.57 rad.')}},
  {h:'Degrees to radians',p:'To convert, divide by 180° and multiply by π, because 180° and π rad are the same turn.',
   predict:{q:'135° in radians is…',opts:['3π/4, about 2.36','3/4','135π'],ans:0},
   task:'Make 135°',show:()=>glide(3*PI/4,setT),
   go:()=>{reset(PI/6,5);setT(PI/6);S.goal=ok(3,()=>near(3*PI/4),()=>'135 ÷ 180 = 3/4, so 135° = 3π/4 ≈ 2.36 rad. Dropping the π gives 0.75 rad, only about 43°.')}},
  {h:'Arc length s = rθ',p:'Now r = 4 cm. With θ in radians, the arc is just θ radius-lengths: s = rθ.',
   predict:{q:'Which angle gives an arc of 10 cm on r = 4 cm?',opts:['40 rad (10 × 4)','10°','2.5 rad (10 ÷ 4)'],ans:2},
   task:'Drag until the arc is 10 cm long',show:()=>glide(2.5,setT),
   go:()=>{reset(1,4);setR(4);S.goal=ok(4,()=>S.r===4&&near(2.5),()=>'θ = s ÷ r = 10 ÷ 4 = 2.5 rad, and s = 4 × 2.5 = 10 cm. Two and a half radius strings.')}},
  {h:'Bigger circle, same angle',p:'θ stays at π/3. Drag the green dot, or use r + 1, from r = 3 to r = 6. The dashed arc is the old one.',
   predict:{q:'Double the radius at the same angle. The angle in radians is now…',opts:['the same','double','half'],ans:0},
   task:'Make the radius 6 cm',show:()=>walkR([4,5,6]),
   go:()=>{reset(PI/3,3);S.r0=3;setR(3);S.goal=ok(5,()=>S.r===6,()=>'The arc doubles, 3.14 → 6.28 cm, but s ÷ r = 1.05 both times. A radian is a ratio, so it does not depend on the size of the circle.')}},
  {h:'Sandbox',p:'Change θ and r. Make an arc of 6 cm in two ways. Which angle in radians is 300°?',go:()=>{reset(2,5);setR(5)}},
  {h:'Challenge',p:'',go:()=>{reset(S.t,S.r);ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge: each wrong option is a known slip ----
 const DG=[30,45,60,120,135,150,210,225,240,270,300,315],TH=[.8,1.2,1.5,2.4,2.5,3,.6,1.8],RR=[3,4,5,6,8,10],KS=['d2r','arc','r2d','ang'];let n=-1,streak=0;
 function ask(){say('');n++;const k=KS[n%4];let q,o,t,f='',r=RR[(n*5+2)%RR.length],u=' rad';
  if(k==='d2r'||k==='r2d'){const d=DG[(n*7+1)%DG.length],g=gcd(d,180),p=d/g,qq=180/g;t=d*PI/180;
   if(k==='d2r'){q=`Write ${d}° in radians.`;o=[[piF(p,qq),'ok'],[`${p}/${qq}`.replace(/\/1$/,''),'nopi'],[R2(d*180/PI),'flip'],[piF(p,2*qq),'turn']]}
   else{q=`Write ${piF(p,qq)} radians in degrees.`;u='°';f=`${p}/${qq}`.replace(/\/1$/,'');o=[[String(d),'ok'],[R2(p/qq*180/PI),'nopi'],[String(2*d),'turn'],[R2(t*PI/180),'flip']]}}
  else{t=TH[(n*3+1)%TH.length];const s=r*t;
   if(k==='arc'){q=`Find the arc length when r = ${r} cm and θ = ${t} rad.`;u=' cm';o=[[R2(s),'ok'],[R2(t/r),'div'],[R2(t/360*TAU*r),'deg'],[R2(r*r*t/2),'area']]}
   else{q=`An arc of ${R2(s)} cm lies on a circle of radius ${r} cm. Find θ in radians.`;o=[[R2(t),'ok'],[R2(r/s),'flip'],[R2(s*r),'times'],[R2(D(t)),'deg']]}}
  S.Q={k,t,r,f};const seen=new Set();o=o.filter(z=>!seen.has(z[0])&&seen.add(z[0])).map(z=>({l:z[0]+u,k:z[1]}));const j=n%o.length;o=o.slice(j).concat(o.slice(0,j));
  chal.innerHTML=`<p><b>${q}</b>${k==='arc'||k==='ang'||k==='r2d'?' Answers are to 2 decimal places where needed.':''}</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(z=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,z.l);b.onclick=()=>mark(z)});
  S.cq='Challenge: '+q+` The circle has radius ${r} cm${k==='ang'?' and an arc of unknown angle':` and an angle of ${nice(t)} radians`}.`;A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function mark(z){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),{k,t,r}=S.Q;let m;
  const right=k==='d2r'?`${R2(D(t))} ÷ 180 × π = ${nice(t)} rad.`:k==='r2d'?`${nice(t)} × 180/π = ${R2(D(t))}°.`:k==='arc'?`s = rθ = ${r} × ${t} = ${R2(r*t)} cm.`:`θ = s ÷ r = ${R2(r*t)} ÷ ${r} = ${R2(t)} rad.`;
  if(z.k==='ok')m=right;
  else if(z.k==='nopi')m=k==='d2r'?`The π went missing. ${R2(D(t))}/180 is how many half-turns; each half-turn is π rad. ${right}`:`That converted ${S.Q.f} rad and left the π out. π rad = 180°, so just replace π by 180°. ${right}`;
  else if(z.k==='flip')m=k==='d2r'||k==='r2d'?`The conversion factor is upside down. Degrees → radians is × π/180; radians → degrees is × 180/π. ${right}`:`That is r ÷ s. The angle is arc ÷ radius, how many radii fit along the arc. ${right}`;
  else if(z.k==='turn')m=`A full turn is 2π, so a half-turn, 180°, is π, not 2π or 360. ${right}`;
  else if(z.k==='div')m=`That divided θ by r. In radians the arc is θ radius-lengths, so multiply. ${right}`;
  else if(z.k==='deg')m=k==='arc'?`That treated ${t} as degrees. θ is already in radians, so s = rθ with no 360. ${right}`:`That is the angle in degrees. The question asks for radians: s ÷ r and stop. ${right}`;
  else if(z.k==='area')m=`½r²θ is the sector area, not the arc length. ${right}`;
  else m=`Multiplying s by r gives cm², not an angle. Divide instead. ${right}`;
  if(z.k==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();S.wob=1;A.tween(S,{wob:0},450,'out');fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==7;if(A.step!==7)S.Q=null;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Turn the angle and change the radius'},box);chal=E('div',{class:'fl-chal'},A.below);
   const turn=p=>{const L=S.L;let a=Math.atan2(L.y-p.y,p.x-L.x);if(a<0)a+=TAU;if(S.t>4.7&&a<1.6)a=TAU;return a};
   A.gest({down:p=>{const L=S.L,s=A.step;if(!L||s===7)return false;
     if(s>=4&&Math.hypot(p.x-L.x-S.r*L.u,p.y-L.y)<22){S.drag='r';return true}
     if(Math.hypot(p.x-S.h[0],p.y-S.h[1])<28||Math.abs(Math.hypot(p.x-L.x,p.y-L.y)-S.r*L.u)<26){S.drag='t';return true}return false},
    move:p=>{const L=S.L;if(S.drag==='r')S.r=Math.max(2,Math.min(8,Math.round((p.x-L.x)/L.u)));else if(S.drag==='t')S.t=snap(turn(p));else return;A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const d=S.drag;S.drag=null;if(d==='r')setR(S.r);else if(d==='t')setT(S.t)}});sync()}});
 A.start()})})();
