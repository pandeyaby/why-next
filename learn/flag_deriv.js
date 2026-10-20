/* Flagship 1 – the derivative as the slope you see when you zoom in. A phone falls from a 44 m tower (s = 4.9t² m).
   Hook scene (illustrated), then average speed → shrink the gap → zoom → limit → sandbox → misconception-aware challenge. */
(()=>{const g=9.8,S=t=>g/2*t*t,V=t=>g*t,T=3,SM=S(T),f2=v=>(Math.round(v*100)/100).toFixed(2),f3=v=>String(Math.round(v*1000)/1000);
VIS.reg('flagderiv',c=>{const s={t0:2,h:1,z:1,ph:0,ct:0,won:false,seen:new Map()};let A,drag=null,read,tbl,ctl,i1,i2,bz,chal;
 const lim=()=>Math.min(T-s.t0,1),fix=()=>{s.h=Math.max(.001,Math.min(s.h,lim()))};
 const to=(tg,ms=1400)=>{if('h'in tg||'z'in tg){const L={};if('h'in tg)L.h=tg.h;if('z'in tg)L.z=tg.z;A.tween(s,L,ms,'log',sync)}if('t0'in tg)A.tween(s,{t0:tg.t0},ms,'io')};
 const steps=[
  {h:'A phone slips from a 44 m tower',p:'It falls slowly at first, then faster and faster. A speed camera halfway down flashes at exactly t = 2 s. What speed does it record? Speed is distance ÷ time, but at a single instant no time passes at all…',go:()=>{s.ph=0;A.sound.whoosh()}},
  {h:'1 · Average speed over one second',p:'From 2 s to 3 s the phone falls Δs metres in Δt = 1 s. The slope of the line through P and Q, Δs ÷ Δt, is the average speed. Drag Q (hollow) to change the gap.',go:()=>to({t0:2,h:1,z:1},700)},
  {h:'2 · Shrink the gap',p:'Watch the table as Q slides towards P: the average speed settles. Which number is it closing in on?',go:()=>to({h:.02},2600)},
  {h:'3 · Zoom in on P',p:'Magnify the curve around t = 2 s. The closer you look, the straighter it gets: up close, a smooth curve looks like a line. Its slope is the speed at that instant.',go:()=>to({h:.02,z:30},2200)},
  {h:'4 · Let the gap go to zero',p:'At Δt = 0.001 s the average is 19.60 m/s. The line through P and Q has become the tangent. This limit is the derivative: ds/dt = 9.8t, so at 2 s the speed is 19.6 m/s.',go:()=>to({h:.001,z:1},1800)},
  {h:'Sandbox',p:'Drag P and Q, zoom in and out, try other times. Does the speed ever stay the same?'},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const sync=()=>{fix();if(!read)return;const avg=(S(s.t0+s.h)-S(s.t0))/s.h,k=f3(s.h);if(A.step>=1&&s.seen.size<60&&!s.seen.has(k))s.seen.set(k,avg);
  i1.value=s.t0;i2.value=Math.log10(s.h);i1.previousSibling.textContent=`P at t = ${f2(s.t0)} s `;i2.previousSibling.textContent=`gap Δt = ${f3(s.h)} s `;bz.textContent=s.z>2?'🔍 Zoom out':'🔍 Zoom in';bz.setAttribute('aria-pressed',String(s.z>2));
  read.innerHTML=`<span><b>Δs</b> = ${f2(S(s.t0+s.h)-S(s.t0))} m</span><span><b>Δt</b> = ${f3(s.h)} s</span><span class="fl-big">average speed = <b>${f2(avg)}</b> m/s</span>`;
  const byDec=new Map();[...s.seen.entries()].sort((a,b)=>b[0]-a[0]).forEach(r=>{const d=Math.floor(Math.log10(+r[0])*2);if(!byDec.has(d))byDec.set(d,r)});
  tbl.innerHTML=A.step>=2?`<caption>Average speed from t = ${f2(s.t0)} s</caption><tr><th scope="col">Δt (s)</th><th scope="col">Δs ÷ Δt (m/s)</th></tr>`+[...byDec.values()].slice(0,6).map(([h,v])=>`<tr><td>${h}</td><td>${f2(v)}</td></tr>`).join(''):'';
  A.cv.setAttribute('aria-label',A.step===0?'Illustration: a phone falling past a speed camera beside a tall tower.':`Graph of distance fallen s = 4.9t² m against time t s. P at ${f2(s.t0)} s, Q at ${f2(s.t0+s.h)} s; average speed ${f2(avg)} m/s.`);
  c.say(A.step===0?'A phone falls from a 44 metre tower past a speed camera.':`Average speed ${f2(avg)} m/s over ${f3(s.h)} s from t = ${f2(s.t0)} s.`);A.redraw()};
 // ---------- hook scene ----------
 const scene=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,dk=C.dark;const sky=P.lin(0,0,0,H,dk?[[0,'#0b1430'],[.6,'#1d2b5a'],[1,'#3a3f6e']]:[[0,'#7cc4ff'],[.65,'#cfe9ff'],[1,'#fde7c8']]);ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=P.rad(W*.82,H*.18,4,H*.35,dk?[[0,'rgba(255,240,200,.9)'],[.08,'rgba(255,240,200,.35)'],[1,'rgba(255,240,200,0)']]:[[0,'rgba(255,255,230,1)'],[.1,'rgba(255,240,180,.6)'],[1,'rgba(255,240,180,0)']]);ctx.fillRect(0,0,W,H);
  for(let i=0;i<9;i++){const x=(i*97)%W,hh=H*(.12+((i*37)%30)/160);ctx.fillStyle=dk?'#141b38':'#9cb6d6';ctx.fillRect(x-30,H*.86-hh,60+(i%3)*14,hh)}// far city
  const gy=H*.86;ctx.fillStyle=P.lin(0,gy,0,H,dk?[[0,'#1f2a33'],[1,'#0d1318']]:[[0,'#7fb069'],[1,'#557a44']]);ctx.fillRect(0,gy,W,H-gy);
  const tx=W*.18,tw=Math.max(64,W*.14),top=H*.08;P.shadow(18,8,.35);ctx.fillStyle=P.lin(tx,0,tx+tw,0,dk?[[0,'#2c3550'],[1,'#454f73']]:[[0,'#8a94a8'],[1,'#c3cad6']]);ctx.fillRect(tx,top,tw,gy-top);P.noShadow();
  for(let y=top+10;y<gy-14;y+=16)for(let x=tx+8;x<tx+tw-10;x+=14){ctx.fillStyle=((x*7+y*3)%5<2)?(dk?'#ffd77a':'#eaf6ff'):(dk?'#1b2238':'#6f7a90');ctx.fillRect(x,y,8,9)}
  const yOf=t=>top+(gy-top-12)*S(t)/SM,cy=yOf(2),camx=tx+tw+W*.12;// camera on a pole at the 2 s height
  ctx.strokeStyle=dk?'#8892b0':'#4b5563';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(camx+14,cy);ctx.lineTo(camx+14,gy);ctx.stroke();P.shadow(8,3,.3);ctx.fillStyle=dk?'#cbd5e1':'#374151';P.rrect(camx,cy-12,30,22,5);ctx.fill();P.noShadow();ctx.fillStyle='#111827';ctx.beginPath();ctx.arc(camx,cy-1,6,0,7);ctx.fill();
  s.ph+=A.reduced()?0:dt;const t=Math.min(T,(s.ph%4.2)),py=yOf(t),px=tx+tw+18;
  for(let k=1;k<=6;k++){const tt=Math.max(0,t-k*.035);ctx.globalAlpha=.14*(7-k)/6;ctx.fillStyle=C.cy;P.rrect(px-7,yOf(tt)-12,14,24,4);ctx.fill()}ctx.globalAlpha=1;
  ctx.save();ctx.translate(px,py);ctx.rotate(t*2.2);P.shadow(10,4,.35);ctx.fillStyle='#111827';P.rrect(-8,-13,16,26,4);ctx.fill();P.noShadow();ctx.fillStyle=P.lin(-6,-11,6,11,[[0,'#60a5fa'],[1,'#a78bfa']]);P.rrect(-6,-10,12,20,3);ctx.fill();ctx.restore();
  if(Math.abs(t-2)<.06){ctx.fillStyle=P.rad(camx,cy,2,90,[[0,'rgba(255,255,255,.95)'],[1,'rgba(255,255,255,0)']]);ctx.fillRect(camx-90,cy-90,180,180);if(!s.fl){s.fl=1;A.sound.pop()}}else s.fl=0;
  P.label(`t = ${t.toFixed(2)} s`,px+20,py,{align:'left'});P.label('speed camera · t = 2 s',camx+40,cy-26,{align:'left',bg:'rgba(17,24,39,.75)'});
  P.label(`fallen ${S(t).toFixed(1)} m`,tx+tw/2,gy+16,{bg:'rgba(17,24,39,.75)'});return true};
 // ---------- graph ----------
 const pad=A0=>({l:A0.narrow?44:56,r:A0.narrow?14:24,t:18,b:42});
 const view=()=>{const z=s.z;if(z<=1.001)return{x0:0,x1:T*1.07,y0:0,y1:SM*1.08};const wx=T/z,wy=SM/z;return{x0:s.t0-wx/2,x1:s.t0+wx/2,y0:S(s.t0)-wy/2,y1:S(s.t0)+wy/2}};
 const graph=(A)=>{const{ctx,W,H,paint:P,col:C}=A,pd=pad(A),vw=view(),X=t=>pd.l+(t-vw.x0)/(vw.x1-vw.x0)*(W-pd.l-pd.r),Y=v=>H-pd.b-(v-vw.y0)/(vw.y1-vw.y0)*(H-pd.t-pd.b);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);P.rrect(0,0,W,H,12);ctx.fill();
  const tick=(a,b)=>{const r=(b-a)/(A.narrow?4:6),p=Math.pow(10,Math.floor(Math.log10(r))),m=r/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p},tx=tick(vw.x0,vw.x1),ty=tick(vw.y0,vw.y1);
  ctx.font='12px system-ui,sans-serif';ctx.lineWidth=1;
  for(let t=Math.ceil(vw.x0/tx)*tx;t<=vw.x1+1e-9;t+=tx){const x=X(t);ctx.strokeStyle=C.ln;ctx.globalAlpha=.5;ctx.beginPath();ctx.moveTo(x,pd.t);ctx.lineTo(x,H-pd.b);ctx.stroke();ctx.globalAlpha=1;ctx.fillStyle=C.mu;ctx.textAlign='center';ctx.fillText(String(+t.toFixed(4)),x,H-pd.b+16)}
  for(let v=Math.ceil(vw.y0/ty)*ty;v<=vw.y1+1e-9;v+=ty){const y=Y(v);ctx.strokeStyle=C.ln;ctx.globalAlpha=.5;ctx.beginPath();ctx.moveTo(pd.l,y);ctx.lineTo(W-pd.r,y);ctx.stroke();ctx.globalAlpha=1;ctx.fillStyle=C.mu;ctx.textAlign='right';ctx.fillText(String(+v.toFixed(3)),pd.l-6,y+4)}
  ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.font='600 12px system-ui,sans-serif';ctx.fillText('time t (s)',(pd.l+W-pd.r)/2,H-8);ctx.save();ctx.translate(13,(pd.t+H-pd.b)/2);ctx.rotate(-Math.PI/2);ctx.fillText('distance fallen s (m)',0,0);ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(pd.l,pd.t,W-pd.l-pd.r,H-pd.t-pd.b);ctx.clip();
  const a=s.t0,b=s.t0+s.h,m=(S(b)-S(a))/(b-a),pts=[];for(let i=0;i<=260;i++){const t=vw.x0+(vw.x1-vw.x0)*i/260;pts.push([X(t),Y(S(t))])}
  ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.lineTo(X(vw.x1),H-pd.b);ctx.lineTo(X(vw.x0),H-pd.b);ctx.closePath();ctx.fillStyle=P.lin(0,pd.t,0,H-pd.b,[[0,A.alpha(A.mix(C.cy,C.pn,.6),.55)],[1,A.alpha(C.pn,0)]]);ctx.fill();
  P.glow(C.cy,10);ctx.strokeStyle=C.cy;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();P.noShadow();
  const tg=Math.max(0,Math.min(1,(Math.log10(.05)-Math.log10(s.h))/1.3));if(tg>0){ctx.globalAlpha=tg;ctx.strokeStyle=C.gr;ctx.lineWidth=2.5;ctx.setLineDash([8,6]);ctx.beginPath();ctx.moveTo(X(vw.x0),Y(S(a)+V(a)*(vw.x0-a)));ctx.lineTo(X(vw.x1),Y(S(a)+V(a)*(vw.x1-a)));ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1}
  ctx.strokeStyle=C.or;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(vw.x0),Y(S(a)+m*(vw.x0-a)));ctx.lineTo(X(vw.x1),Y(S(a)+m*(vw.x1-a)));ctx.stroke();
  const used=[],xa=X(a),xb=X(b),ya=Y(S(a)),yb=Y(S(b)),wide=xb-xa;
  if(wide>26){ctx.fillStyle=A.alpha(A.mix(C.or,C.pn,.6),.45);ctx.beginPath();ctx.moveTo(xa,ya);ctx.lineTo(xb,ya);ctx.lineTo(xb,yb);ctx.closePath();ctx.fill();ctx.strokeStyle=C.or;ctx.lineWidth=1.6;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(xa,ya);ctx.lineTo(xb,ya);ctx.lineTo(xb,yb);ctx.stroke();ctx.setLineDash([]);
   if(wide>58)used.push(P.label('Δt '+f3(s.h)+' s',(xa+xb)/2,ya+16,{bg:C.or,col:'#111'}));if(ya-yb>30)used.push(P.label('Δs',xb+8,(ya+yb)/2,{align:'left',bg:C.or,col:'#111',avoid:used}))}
  const dot=(x,y,fill)=>{P.shadow(8,2,.35);ctx.beginPath();ctx.arc(x,y,8,0,7);ctx.fillStyle=fill?C.or:C.pn;ctx.fill();P.noShadow();ctx.lineWidth=3;ctx.strokeStyle=C.or;ctx.stroke()};
  const near=wide<20;if(!near){dot(xb,yb,false);used.push(P.label('Q',xb-14,yb-16,{avoid:used}))}dot(xa,ya,true);P.label(near?'P, Q':'P',xa-16,ya-18,{avoid:used});ctx.restore();
  if(s.z>1.05)P.label('×'+Math.round(s.z)+' zoom',W-pd.r-6,pd.t+12,{align:'right'})};
 A=FK.shell(c,{steps,ratio:.58,tall:1.05,draw:(A,dt)=>A.step===0?scene(A,dt):graph(A),onStep:A=>{const hook=A.step===0;ctl.hidden=read.hidden=hook;tbl.hidden=A.step<2;chal.hidden=A.step!==steps.length-1;s.seen.clear();sync()},
  init:A=>{const E=c.el,B=A.below;read=E('div',{class:'fl-read'},B);ctl=E('div',{class:'fl-ctl'},B);tbl=E('table',{class:'fl-tbl'},B);chal=E('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   const r1=E('label',{},ctl);E('span',{},r1,'');i1=E('input',{type:'range',min:.2,max:2.6,step:.01,value:2,'aria-label':'time of point P in seconds'},r1);
   const r2=E('label',{},ctl);E('span',{},r2,'');i2=E('input',{type:'range',min:-3,max:0,step:.01,value:0,'aria-label':'gap Δt, log scale'},r2);bz=E('button',{type:'button',class:'lbtn ghost sm','aria-pressed':'false'},ctl,'🔍 Zoom in');
   i1.oninput=()=>{s.t0=+i1.value;sync()};i2.oninput=()=>{s.h=Math.pow(10,+i2.value);A.sound.tick();sync()};bz.onclick=()=>to({z:s.z<2?30:1},1500);
   A.every(()=>{if(s.h!==s._lh||s.t0!==s._lt||s.z!==s._lz){s._lh=s.h;s._lt=s.t0;s._lz=s.z;sync()}return false});
   A.cv.addEventListener('pointerdown',e=>{if(A.step===0)return;const p=A.toT(e),pd=pad(A),vw=view(),t=vw.x0+(p.x-pd.l)/(A.W-pd.l-pd.r)*(vw.x1-vw.x0),tol=(vw.x1-vw.x0)*.07;drag=Math.abs(t-(s.t0+s.h))<tol?'Q':Math.abs(t-s.t0)<tol?'P':'Q';A.cv.setPointerCapture(e.pointerId);mv(e)});
   const mv=e=>{if(!drag)return;const p=A.toT(e),pd=pad(A),vw=view(),t=vw.x0+(p.x-pd.l)/(A.W-pd.l-pd.r)*(vw.x1-vw.x0);if(drag==='P')s.t0=Math.max(.2,Math.min(2.6,t));else s.h=t-s.t0;sync()};
   A.cv.addEventListener('pointermove',mv);A.cv.addEventListener('pointerup',()=>{drag=null})}});
 const newChal=()=>{const o=[.5,1,1.5,2.5].filter(x=>x!==s.ct);s.ct=o[Math.floor(Math.random()*o.length)];s.won=false;to({t0:s.ct,h:.5,z:1},800);
  chal.innerHTML=`<p><b>Speed camera at t = ${s.ct} s.</b> Use the graph to find the phone’s speed at that instant (1 decimal place).</p><label>Speed <input type="number" step="0.1" inputmode="decimal" class="fl-in" aria-label="speed in metres per second"> m/s</label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const inp=chal.querySelector('input'),fb=chal.querySelector('.fl-fb');chal.querySelector('button').onclick=()=>{const v=parseFloat(inp.value),want=V(s.ct);if(!isFinite(v)){fb.textContent='Type a number first.';return}
   if(Math.abs(v-want)<=.15){fb.innerHTML=`✓ Yes: ${f2(want)} m/s. Shrinking the gap to zero gave you the derivative. <button type="button" class="linkish">Another time →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   A.sound.miss();fb.textContent=Math.abs(v-(S(s.ct+.5)-S(s.ct))/.5)<.2?'That is the average over half a second. Shrink Δt until the number stops changing.':Math.abs(v-S(s.ct)/s.ct)<.2?'That is distance ÷ time since the start (the average from 0 s). You need the slope at P itself.':Math.abs(v-S(s.ct))<.2?'That is the distance fallen, in metres, not the speed.':'Not quite. Drag Q very close to P and read the average speed.'}};
 A.every(()=>A.step===0&&!A.reduced());A.start()})})();
