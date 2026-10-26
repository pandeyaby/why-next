/* Flagship 40 – arc length and sector area. A circle with a draggable sector angle θ and radius r, and an "unrolled" strip
   under it: the whole strip is the full edge 2πr (or the whole area πr²) and the lit part is θ/360 of it. (1) Drag θ to 72°
   and read the fraction 72/360 = 1/5 (trap: 72/100). (2) Arc length: drag until the arc is 9.4 cm on r = 6 (trap: using
   πr² for a length). (3) Sector area: ghost copies of the sector tile the circle; at 60° exactly 6 fit, so the area is ⅙ of
   πr² (trap: ⅙ of 2πr). (4) Drag r from 3 to 6: arc × 2, area × 4 (trap: area doubles). (5) Work backwards from an arc of
   15.7 cm to θ = 150°. Challenge: arc, area, sector perimeter and angle questions with options built from real slips. */
(()=>{const PI=Math.PI,R1=x=>(Math.round(x*10)/10).toFixed(1).replace(/\.0$/,''),arcL=(t,r)=>t/360*2*PI*r,secA=(t,r)=>t/360*PI*r*r;
VIS.reg('flagarc',c=>{let A,pad,chal,read;
 const S={t:30,r:6,r0:null,drag:null,shake:0,goal:()=>{},run:0,Q:null,cq:''};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const miss=t=>{A.sound.miss();S.shake=1;A.tween(S,{shake:0},450,'out');if(t)say(t)};
 const gcd=(a,b)=>b?gcd(b,a%b):a,frac=t=>{const g=gcd(t,360);return `${t/g}/${360/g}`};
 const mode=()=>[2,3].includes(A.step)?'area':'arc';
 function report(){const t=S.t,r=S.r;return mode()==='area'?`θ = ${t}°, r = ${r} cm: sector area = ${t}/360 × π × ${r}² = ${R1(secA(t,r))} cm².`:`θ = ${t}°, r = ${r} cm: arc = ${t}/360 × 2π × ${r} = ${R1(arcL(t,r))} cm.`}
 function setT(v){S.t=Math.max(10,Math.min(350,2*Math.round(v/2)));let x=report();
  if(A.step===2){const n=360/S.t;x+=Number.isInteger(n)?` Exactly ${n} copies fill the circle, so it is 1/${n} of π${S.r}².`:` ${Math.floor(n)} copies fit with a gap left.`}
  if(A.step===0)x=`θ = ${S.t}°: ${S.t}/360 = ${frac(S.t)} of the circle.`;say(x);sync();S.goal()}
 function setR(v){S.r=Math.max(2,Math.min(8,Math.round(v)));let x=report();
  if(S.r0&&A.step===3){const k=S.r/S.r0;x+=` Radius × ${R1(k)}: arc × ${R1(k)}, area × ${R1(k*k)}.`}say(x);sync();S.goal()}
 function play(list,ms=320){const tok=++S.run;let j=0;const go=()=>{if(tok!==S.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 const slide=(k,to,set)=>{const o={v:S[k]};A.tween(o,{v:to},700,'io',()=>set(to))};
 function describe(){if(A.step===6)return S.cq||'Challenge.';const t=S.t,r=S.r;return `Circle of radius ${r} cm with a sector of ${t}°, ${frac(t)} of the circle. Arc ${R1(arcL(t,r))} cm of ${R1(2*PI*r)} cm; area ${R1(secA(t,r))} cm² of ${R1(PI*r*r)} cm².`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.onclick=()=>{f();A.sound.tick()}};
  if(s===6)return A.redraw();
  b('θ − 10°','Make the angle 10 degrees smaller',()=>setT(S.t-10));b('θ − 2°','Make the angle 2 degrees smaller',()=>setT(S.t-2));b('θ + 2°','Make the angle 2 degrees bigger',()=>setT(S.t+2));b('θ + 10°','Make the angle 10 degrees bigger',()=>setT(S.t+10));
  if(s===3||s===5){b('r − 1','Make the radius 1 cm smaller',()=>setR(S.r-1));b('r + 1','Make the radius 1 cm bigger',()=>setR(S.r+1))}
  A.redraw()}
 // ---- drawing ----
 const geo=()=>{const N=A.narrow,big=Math.min(N?A.W*.4:A.W*.26,A.H*.33);return{cx:N?A.W*.5:A.W*.3,cy:A.H*(N?.38:.45),k:big/8}};
 const at=(G,th,rr)=>[G.cx+rr*Math.cos(th*PI/180),G.cy-rr*Math.sin(th*PI/180)];
 function wedge(G,f,t,rr){const ctx=A.ctx;ctx.beginPath();ctx.moveTo(G.cx,G.cy);ctx.arc(G.cx,G.cy,rr,-f*PI/180,-(f+t)*PI/180,true);ctx.closePath()}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,s=A.step,G=geo(),jit=S.shake*Math.sin(S.shake*30)*4,ch=s===6&&S.Q;G.cx+=jit;S.G=G;
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.gr,.06)],[1,A.mix(C.pn,C.ac,.07)]]);ctx.fillRect(0,0,W,H);
  const t=ch?S.Q.t:S.t,r=ch?S.Q.r:S.r,rr=r*G.k,area=ch?S.Q.k==='area':mode()==='area';
  ctx.fillStyle=A.alpha(C.tx,.05);ctx.beginPath();ctx.arc(G.cx,G.cy,rr,0,7);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.5);ctx.lineWidth=2;ctx.stroke();
  if(!ch)for(let d=0;d<360;d+=30){const[a,b]=at(G,d,rr),[e,f]=at(G,d,rr+7);ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(e,f);ctx.stroke()}
  if(s===3&&S.r0&&S.r0!==S.r){ctx.setLineDash([5,4]);ctx.strokeStyle=C.mu;wedge(G,0,t,S.r0*G.k);ctx.stroke();ctx.setLineDash([])}
  if(s===2){const n=Math.floor(360/t+1e-9);for(let i=1;i<n;i++){ctx.fillStyle=A.alpha(i%2?C.cy:C.vi,.28);wedge(G,i*t,t,rr);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.35);ctx.lineWidth=1;ctx.stroke()}}
  ctx.fillStyle=A.alpha(area?C.am:C.ac,area?.6:.16);wedge(G,0,t,rr);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.7);ctx.lineWidth=2;ctx.stroke();
  if(!area){ctx.strokeStyle=C.ac;ctx.lineWidth=7;P.glow(A.alpha(C.ac,.7),10);ctx.beginPath();ctx.arc(G.cx,G.cy,rr,0,-t*PI/180,true);ctx.stroke();P.noShadow()}
  ctx.strokeStyle=C.tx;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(G.cx,G.cy,Math.min(26,rr*.3),0,-t*PI/180,true);ctx.stroke();
  const[lx,ly]=at(G,t/2,Math.min(26,rr*.3)+16);P.label(ch&&S.Q.k==='angle'?'θ = ?':`${t}°`,lx,ly,{font:'700 12px system-ui',bg:A.alpha('#1e293b',.9)});
  const[rx,ry]=at(G,0,rr*.55);P.label(`r = ${r}`,rx,ry+12,{font:'700 12px system-ui',bg:A.alpha('#1e293b',.9)});
  const[hx,hy]=at(G,t,rr);if(!ch){P.ball(hx,hy,11,C.pk);if(s===3||s===5)P.ball(G.cx+rr,G.cy,9,C.gr)}S.ht=[hx,hy];
  if(ch){const[ax,ay]=at(G,t/2,rr+24);P.label(S.Q.k==='angle'?`arc = ${R1(arcL(t,r))} cm`:'?',ax,ay,{font:'800 13px system-ui',bg:A.alpha('#065f46',.95)})}
  // the unrolled strip: whole = 2πr (or πr²); lit part = θ/360 of it
  const N=A.narrow,sx=N?W*.08:W*.6,sw=N?W*.84:W*.34,sy=N?H*.8:H*.3,sh=N?16:22;
  if(!ch){ctx.fillStyle=A.alpha(C.tx,.12);P.rrect(sx,sy,sw,sh,6);ctx.fill();ctx.fillStyle=area?C.am:C.ac;P.rrect(sx,sy,Math.max(3,sw*t/360),sh,6);ctx.fill();
   for(let i=1;i<12;i++){const x=sx+sw*i/12;ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,sy);ctx.lineTo(x,sy+sh);ctx.stroke()}
   const whole=area?`whole area πr² = ${R1(PI*r*r)} cm²`:`whole edge 2πr = ${R1(2*PI*r)} cm`;
   P.label(whole,sx,sy-14,{align:'left',font:'600 12px system-ui',bg:A.alpha('#334155',.92)});
   P.label(`${frac(t)} of it = ${area?R1(secA(t,r))+' cm²':R1(arcL(t,r))+' cm'}`,sx,sy+sh+16,{align:'left',font:'800 13px system-ui',bg:A.alpha(area?'#92400e':'#1d4ed8',.95)})}
  A.fx.draw(ctx)}
 // ---- steps ----
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const fresh=(t,r)=>{S.run++;S.r0=null;S.goal=()=>{};S.t=t;S.r=r};
 const steps=[
  {h:'A sector is a fraction of the circle',p:'Drag the pink dot round the edge. The strip below is the whole circle laid flat; the lit part is θ out of 360.',
   predict:{q:'A 72° sector is what fraction of the whole circle?',opts:['1/5','72/100','1/72'],ans:0},
   task:'Drag the angle to 72°',show:()=>slide('t',72,setT),
   go:()=>{fresh(30,6);setT(30);S.goal=fin(0,()=>S.t===72,()=>'72/360 = 1/5. A full turn is 360°, not 100, so the sector is one fifth of the circle.')}},
  {h:'Arc length',p:'The arc is part of the edge, so it is a fraction of the circumference 2πr. Here r = 6 cm, so the whole edge is 37.7 cm.',
   predict:{q:'How long is a 90° arc when r = 6 cm?',opts:['¼ of 2π × 6, about 9.4 cm','¼ of π × 6², about 28.3 cm','90 cm'],ans:0},
   task:'Drag the angle until the arc is 9.4 cm long',show:()=>slide('t',90,setT),
   go:()=>{fresh(40,6);setT(40);S.goal=fin(1,()=>S.t===90,()=>'90/360 × 2π × 6 = 9.4 cm. A length uses 2πr; πr² gives an area in cm², not a length.')}},
  {h:'Sector area',p:'Now the sector is shaded. Ghost copies of it go round the circle. Change θ until the copies fit with no gap.',
   predict:{q:'When r = 6 cm, the area of a 60° sector is…',opts:['⅙ of π × 6², about 18.8 cm²','⅙ of 2π × 6, about 6.3 cm²','60 × 6 = 360 cm²'],ans:0},
   task:'Find the angle where exactly 6 copies fill the circle',show:()=>slide('t',60,setT),
   go:()=>{fresh(50,6);setT(50);S.goal=fin(2,()=>S.t===60,()=>'6 copies of 60° make 360°, so one sector is ⅙ of πr²: 113.1 ÷ 6 = 18.8 cm².')}},
  {h:'Double the radius',p:'The angle stays at 90°. Drag the green dot outward, or use r + 1, from r = 3 to r = 6. The dashed outline is the old sector.',
   predict:{q:'Double the radius. The sector area becomes…',opts:['twice as big','4 times as big','the same as before'],ans:1},
   task:'Make the radius 6 cm',show:()=>play([()=>setR(4),()=>setR(5),()=>setR(6)]),
   go:()=>{fresh(90,3);S.r0=3;setR(3);S.goal=fin(3,()=>S.r===6,()=>'Arc: 4.7 → 9.4 cm, × 2. Area: 7.1 → 28.3 cm², × 4, because r is squared in πr².')}},
  {h:'Work backwards',p:'An arc on r = 6 cm is 15.7 cm long. The whole edge is 37.7 cm. Find the angle.',
   predict:{q:'15.7 is about 0.42 of 37.7. The angle is about…',opts:['150°','15.7°','42°'],ans:0},
   task:'Drag the angle until the arc is 15.7 cm',show:()=>slide('t',150,setT),
   go:()=>{fresh(100,6);setT(100);S.goal=fin(4,()=>S.t===150,()=>'θ = 15.7 ÷ 37.7 × 360 = 150°. Divide the arc by the whole edge to get the fraction, then times 360.')}},
  {h:'Sandbox',p:'Change θ and r. Can you make an arc of about 10 cm two different ways? Which sector has area 50 cm²?',go:()=>{fresh(120,5);setR(5)}},
  {h:'Challenge',p:'',go:()=>{fresh(S.t,S.r);ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge: options come from real slips ----
 const TS=[40,72,80,120,135,150,210,240,270,300],RS=[3,4,5,6,8,10],KS=['arc','area','perim','angle'];let qi=-1,streak=0;
 function ask(){say('');qi++;const k=KS[qi%4],t=TS[(qi*7+3)%TS.length],r=RS[(qi*5+1)%RS.length],L=arcL(t,r);S.Q={k,t,r};let o,q;
  if(k==='arc'){q=`Find the arc length of a ${t}° sector with radius ${r} cm.`;o=[[L,'ok'],[secA(t,r),'area'],[t/360*PI*r,'half'],[t/100*2*PI*r,'pct']]}
  else if(k==='area'){q=`Find the area of a ${t}° sector with radius ${r} cm.`;o=[[secA(t,r),'ok'],[L,'circ'],[t/360*PI*r,'nosq'],[PI*r*r,'whole']]}
  else if(k==='perim'){q=`Find the perimeter of a ${t}° sector with radius ${r} cm.`;o=[[L+2*r,'ok'],[L,'noR'],[L+r,'oneR'],[secA(t,r)+2*r,'area']]}
  else{q=`A sector of radius ${r} cm has an arc of ${R1(L)} cm. Find the angle θ.`;o=[[t,'ok'],[L/r,'rad'],[L/(2*PI*r)*100,'pct'],[L/(PI*r)*360,'half']]}
  const u=k==='angle'?'°':k==='area'?' cm²':' cm',seen=new Set();o=o.filter(x=>{const z=R1(x[0]);if(seen.has(z))return false;seen.add(z);return true}).map(x=>({l:R1(x[0])+u,k:x[1]}));
  const j=qi%o.length;o=o.slice(j).concat(o.slice(0,j));
  chal.innerHTML=`<p><b>${q}</b> Give your answer to 1 decimal place.</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(x=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,x.l);b.onclick=()=>judge(x)});
  S.cq='Challenge: '+q+` The circle shows a ${k==='angle'?'sector with an unknown angle':t+'° sector'} and radius ${r} cm.`;A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function judge(x){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),{k,t,r}=S.Q,L=arcL(t,r);let m;
  const fix=k==='angle'?`θ = ${R1(L)} ÷ (2π × ${r}) × 360 = ${t}°.`:k==='area'?`${t}/360 × π × ${r}² = ${R1(secA(t,r))} cm².`:k==='perim'?`arc ${R1(L)} + 2 × ${r} = ${R1(L+2*r)} cm.`:`${t}/360 × 2π × ${r} = ${R1(L)} cm.`;
  if(x.k==='ok')m=fix;
  else if(x.k==='area')m=`That used πr², the area formula. ${k==='perim'?'A perimeter':'An arc'} is a length, so use 2πr. ${fix}`;
  else if(x.k==='circ')m=`That used 2πr, the circumference. An area needs πr². ${fix}`;
  else if(x.k==='half')m=`That used πr, only half the circumference. The whole edge is 2πr. ${fix}`;
  else if(x.k==='nosq')m=`The radius was not squared. Area uses r², ${r}² = ${r*r}. ${fix}`;
  else if(x.k==='pct')m=`A full turn is 360°, not 100. The fraction is θ/360. ${fix}`;
  else if(x.k==='whole')m=`That is the whole circle. Multiply by ${t}/360 to get the sector. ${fix}`;
  else if(x.k==='noR')m=`That is only the curved edge. A sector also has two straight edges, the radii. ${fix}`;
  else if(x.k==='oneR')m=`A sector has two radii as edges, not one. ${fix}`;
  else m=`Arc ÷ r gives the angle in radians, not degrees. ${fix}`;
  if(x.k==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)S.Q=null;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the angle and the radius'},box);chal=E('div',{class:'fl-chal'},A.below);
   const ang=p=>{const G=S.G;let a=Math.atan2(G.cy-p.y,p.x-G.cx)*180/PI;return a<0?a+360:a};
   A.gest({down:p=>{const s=A.step,G=S.G;if(!G||s===6)return false;
     if((s===3||s===5)&&Math.hypot(p.x-G.cx-S.r*G.k,p.y-G.cy)<24){S.drag='r';return true}
     const d=Math.hypot(p.x-G.cx,p.y-G.cy);if(Math.hypot(p.x-S.ht[0],p.y-S.ht[1])<28||Math.abs(d-S.r*G.k)<28){S.drag='t';return true}return false},
    move:p=>{const G=S.G;if(S.drag==='r')S.r=Math.max(2,Math.min(8,Math.round((p.x-G.cx)/G.k)));else if(S.drag==='t'){const a=ang(p);S.t=Math.max(10,Math.min(350,2*Math.round(a/2)))}else return;A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const d=S.drag;S.drag=null;if(d==='r')setR(S.r);else if(d==='t')setT(S.t)}});sync()}});
 A.start()})})();
