/* Flagship: the derivative as the slope you get by zooming in. A phone falls from a tower (s = 4.9t² m).
   Guided discovery (hook → average speed → shrink the gap → zoom → limit), then a free sandbox and a challenge.
   Canvas with devicePixelRatio, rAF animation with easing, pointer + keyboard control, reduced-motion aware. */
(()=>{const g=9.8,S=t=>g/2*t*t,V=t=>g*t,T=3,SM=S(T);
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,f2=v=>(Math.round(v*100)/100).toFixed(2),f3=v=>(Math.round(v*1000)/1000).toString();
const STEPS=[
 {k:'hook',h:'A phone slips from a 44 m tower',p:'Its height drops slowly at first, then faster and faster. A speed camera flashes at exactly t = 2 s. What speed does it record? Speed is distance ÷ time, but at one instant no time passes. Let’s find out what “speed at an instant” can mean.',go:s=>{s.to({t0:2,h:1,z:1});s.play=true}},
 {k:'avg',h:'Step 1 · Average speed over one second',p:'From 2 s to 3 s the phone falls Δs metres in Δt = 1 s. The slope of the line through P and Q, Δs ÷ Δt, is the average speed. Drag the hollow point Q to change the gap.',go:s=>{s.play=false;s.to({t0:2,h:1,z:1})}},
 {k:'shrink',h:'Step 2 · Shrink the gap',p:'Watch the table: as Q slides towards P, the average speed settles down. Which number is it closing in on?',go:s=>{s.to({h:.05},2400)}},
 {k:'zoom',h:'Step 3 · Zoom in on P',p:'Magnify the curve around t = 2 s. The closer you look, the straighter it gets: up close, a smooth curve looks like a line. The slope of that line is the speed at that instant.',go:s=>{s.to({h:.05,z:30},2200)}},
 {k:'limit',h:'Step 4 · Let the gap go to zero',p:'With Δt = 0.001 s the average is 19.60 m/s. The secant (the line through P and Q) has become the tangent. This limit is the derivative: ds/dt = 9.8t, so at t = 2 s the speed is 19.6 m/s.',go:s=>{s.to({h:.001,z:1},1800)}},
 {k:'free',h:'Sandbox',p:'Drag P and Q, zoom in and out, and try other times. Is the speed ever the same at two different times?',go:s=>{}},
 {k:'chal',h:'Challenge',p:'',go:s=>s.newChal()}];
VIS.reg('flagderiv',c=>{const st=c.stage,fig=c.fig;fig.classList.add('flag');
 const wrap=c.el('div',{class:'fl-wrap'},st);
 const story=c.el('div',{class:'fl-story'},wrap),dots=c.el('div',{class:'fl-dots',role:'tablist','aria-label':'Steps'},story),H=c.el('h4',{class:'fl-h'},story,''),P=c.el('p',{class:'fl-p'},story,''),chal=c.el('div',{class:'fl-chal',hidden:''},story);
 const nav=c.el('div',{class:'fl-nav'},story),bp=c.el('button',{type:'button',class:'lbtn ghost sm'},nav,'← Back'),bn=c.el('button',{type:'button',class:'lbtn sm'},nav,'Next →');
 const stage=c.el('div',{class:'fl-stage'},wrap),cv=c.el('canvas',{class:'fl-cv',role:'img'},stage);
 const read=c.el('div',{class:'fl-read'},stage),tbl=c.el('table',{class:'fl-tbl'},stage);
 const ctl=c.el('div',{class:'fl-ctl'},stage),r1=c.el('label',{},ctl),r1s=c.el('span',{},r1,'P at t = '),i1=c.el('input',{type:'range',min:.2,max:2.6,step:.01,value:2},r1),r2=c.el('label',{},ctl),r2s=c.el('span',{},r2,'gap Δt = '),i2=c.el('input',{type:'range',min:-3,max:0,step:.01,value:0,'aria-label':'gap Δt (log scale)'},r2);
 const bz=c.el('button',{type:'button',class:'lbtn ghost sm','aria-pressed':'false'},ctl,'🔍 Zoom in');
 i1.setAttribute('aria-label','time of point P in seconds');
 const s={t0:2,h:1,z:1,play:false,ph:0,anim:null,seen:new Map(),won:false,ct:0};let step=0,raf=0,dirty=true,lastT=0;
 const lim=()=>Math.min(T-s.t0,1);
 s.to=(tg,ms=1200)=>{const from={t0:s.t0,h:s.h,z:s.z};if(c.reduced&&c.reduced()){Object.assign(s,tg);sync();dirty=true;return}
  s.anim={from,tg,t:performance.now(),ms};kick()};
 const sync=()=>{bz.textContent=s.z>2?'🔍 Zoom out':'🔍 Zoom in';bz.setAttribute('aria-pressed',String(s.z>2));s.h=Math.max(.001,Math.min(s.h,lim()));i1.value=s.t0;i2.value=Math.log10(s.h);r1s.textContent=`P at t = ${f2(s.t0)} s `;r2s.textContent=`gap Δt = ${f3(s.h)} s `;
  const k=f3(s.h);if(step>=1&&!s.seen.has(k)&&s.seen.size<40){s.seen.set(k,(S(s.t0+s.h)-S(s.t0))/s.h)}
  const avg=(S(s.t0+s.h)-S(s.t0))/s.h;
  read.innerHTML=`<span><b>Δs</b> = ${f2(S(s.t0+s.h)-S(s.t0))} m</span><span><b>Δt</b> = ${f3(s.h)} s</span><span class="fl-big">average speed = <b>${f2(avg)}</b> m/s</span>`;
  const rows=[...s.seen.entries()].sort((a,b)=>b[0]-a[0]),byDec=new Map();rows.forEach(r=>{const k=Math.floor(Math.log10(+r[0])*2);if(!byDec.has(k))byDec.set(k,r)});const pick=[...byDec.values()].slice(0,6);
  tbl.innerHTML=step>=2?`<caption>Average speed from t = ${f2(s.t0)} s</caption><tr><th scope="col">Δt (s)</th><th scope="col">Δs ÷ Δt (m/s)</th></tr>`+pick.map(([h,v])=>`<tr><td>${h}</td><td>${f2(v)}</td></tr>`).join(''):'';
  cv.setAttribute('aria-label',`Graph of distance fallen s = 4.9t² metres against time t seconds. P at ${f2(s.t0)} s, Q at ${f2(s.t0+s.h)} s. Average speed between them ${f2(avg)} m/s${s.h<.01?', which is the instantaneous speed '+f2(V(s.t0))+' m/s':''}.`);
  c.say(`Average speed ${f2(avg)} m/s over ${f3(s.h)} s from t = ${f2(s.t0)} s.`)};
 // drawing
 let W=640,Hh=360,dpr=1,col={};const ctx=cv.getContext('2d');
 const size=()=>{const w=Math.max(280,Math.min(stage.clientWidth||640,760));W=w;Hh=Math.round(w*.56);dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=Hh*dpr;cv.style.width=W+'px';cv.style.height=Hh+'px';
  const cs=getComputedStyle(fig);const v=(n,d)=>(cs.getPropertyValue(n)||'').trim()||d;col={tx:v('--tx','#111'),mu:v('--mu','#666'),ln:v('--line','#ccc'),bg:v('--panel','#fff'),ac:v('--cy','#0891b2'),or:v('--am','#d97706'),gr:v('--gr','#059669')};dirty=true};
 const pad={l:52,r:56,t:16,b:40};
 const view=()=>{const z=s.z,cx=s.t0,cy=S(s.t0),wx=T/z,wy=SM/z;let x0=cx-wx*(z>1?.5:cx/T),y0=cy-wy*(z>1?.5:cy/SM);if(z<=1){x0=0;y0=0}return{x0,x1:x0+wx,y0,y1:y0+wy}};
 const draw=()=>{const vw=view(),X=t=>pad.l+(t-vw.x0)/(vw.x1-vw.x0)*(W-pad.l-pad.r),Y=v=>Hh-pad.b-(v-vw.y0)/(vw.y1-vw.y0)*(Hh-pad.t-pad.b);
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,Hh);ctx.font='12px system-ui,sans-serif';ctx.lineCap='round';
  // grid with nice ticks
  const tick=(a,b)=>{const r=(b-a)/5,p=Math.pow(10,Math.floor(Math.log10(r))),m=r/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p};
  const tx=tick(vw.x0,vw.x1),ty=tick(vw.y0,vw.y1);ctx.strokeStyle=col.ln;ctx.lineWidth=1;ctx.fillStyle=col.mu;
  for(let t=Math.ceil(vw.x0/tx)*tx;t<=vw.x1+1e-9;t+=tx){const x=X(t);ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(x,pad.t);ctx.lineTo(x,Hh-pad.b);ctx.stroke();ctx.globalAlpha=1;ctx.textAlign='center';ctx.fillText(+t.toFixed(4)+'',x,Hh-pad.b+16)}
  for(let v=Math.ceil(vw.y0/ty)*ty;v<=vw.y1+1e-9;v+=ty){const y=Y(v);ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();ctx.globalAlpha=1;ctx.textAlign='right';ctx.fillText(+v.toFixed(3)+'',pad.l-6,y+4)}
  ctx.fillStyle=col.tx;ctx.textAlign='center';ctx.fillText('time t (s)',(pad.l+W-pad.r)/2,Hh-6);ctx.save();ctx.translate(13,(pad.t+Hh-pad.b)/2);ctx.rotate(-Math.PI/2);ctx.fillText('distance fallen s (m)',0,0);ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(pad.l,pad.t,W-pad.l-pad.r,Hh-pad.t-pad.b);ctx.clip();
  // curve
  ctx.strokeStyle=col.ac;ctx.lineWidth=4;ctx.globalAlpha=.9;ctx.beginPath();for(let i=0;i<=240;i++){const t=vw.x0+(vw.x1-vw.x0)*i/240;i?ctx.lineTo(X(t),Y(S(t))):ctx.moveTo(X(t),Y(S(t)))}ctx.stroke();ctx.globalAlpha=1;ctx.globalAlpha=1;
  const a=s.t0,b=s.t0+s.h,m=(S(b)-S(a))/(b-a),lx=t=>S(a)+m*(t-a);
  // tangent fades in as the gap closes
  const tg=Math.max(0,Math.min(1,(Math.log10(.05)-Math.log10(s.h))/1.3));if(tg>0){ctx.globalAlpha=tg;ctx.strokeStyle=col.gr;ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(X(vw.x0),Y(S(a)+V(a)*(vw.x0-a)));ctx.lineTo(X(vw.x1),Y(S(a)+V(a)*(vw.x1-a)));ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1}
  // secant + rise/run
  ctx.strokeStyle=col.or;ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(X(vw.x0),Y(lx(vw.x0)));ctx.lineTo(X(vw.x1),Y(lx(vw.x1)));ctx.stroke();
  if(X(b)-X(a)>18){ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(X(a),Y(S(a)));ctx.lineTo(X(b),Y(S(a)));ctx.lineTo(X(b),Y(S(b)));ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=col.or;ctx.textAlign='center';ctx.fillText('Δt',(X(a)+X(b))/2,Y(S(a))+15);ctx.textAlign='left';ctx.fillText('Δs',X(b)+6,(Y(S(a))+Y(S(b)))/2)}
  const dot=(t,fill,lab)=>{const x=X(t),y=Y(S(t));ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fillStyle=fill?col.or:col.bg;ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle=col.or;ctx.stroke();ctx.fillStyle=col.tx;ctx.font='bold 13px system-ui,sans-serif';ctx.textAlign='right';ctx.fillText(lab,x-10,y-9);ctx.font='12px system-ui,sans-serif'};
  const near=Math.abs(X(b)-X(a))<16;if(!near)dot(b,false,'Q');dot(a,true,near?'P, Q':'P');ctx.restore();
  // tower strip: the phone at its current height while playing
  if(step===0){const fx=W-pad.r+14,top=pad.t,bot=Hh-pad.b,tt=(s.ph%3.6);const tf=Math.min(T,tt);ctx.fillStyle=col.ln;ctx.fillRect(fx,top,10,bot-top);ctx.fillStyle=col.or;const y=top+(bot-top)*S(tf)/SM;ctx.beginPath();ctx.roundRect?ctx.roundRect(fx+14,y-9,12,18,3):ctx.rect(fx+14,y-9,12,18);ctx.fill();ctx.fillStyle=col.mu;ctx.textAlign='left';ctx.fillText(f2(tf)+' s',fx-2,bot+16)}
  if(s.z>1.05){ctx.fillStyle=col.mu;ctx.textAlign='right';ctx.fillText('×'+Math.round(s.z)+' zoom',W-pad.r,pad.t+12)}};
 const frame=now=>{raf=0;const dt=Math.min(.05,(now-(lastT||now))/1000);lastT=now;let more=false;
  if(s.anim){const A=s.anim,u=Math.min(1,(now-A.t)/A.ms),e=ease(u);for(const k in A.tg){const f=A.from[k],t=A.tg[k];s[k]=k==='h'||k==='z'?Math.exp(Math.log(f)+(Math.log(t)-Math.log(f))*e):f+(t-f)*e}sync();dirty=true;if(u>=1)s.anim=null;else more=true}
  if(s.play&&!(c.reduced&&c.reduced())){s.ph+=dt;dirty=true;more=true}
  if(dirty){draw();dirty=false}if(more)kick();else lastT=0};
 const kick=()=>{if(!raf)raf=requestAnimationFrame(frame)};
 // pointer dragging of P or Q
 let drag=null;const toT=e=>{const r=cv.getBoundingClientRect(),vw=view();return vw.x0+(e.clientX-r.left-pad.l)/(W-pad.l-pad.r)*(vw.x1-vw.x0)};
 cv.addEventListener('pointerdown',e=>{if(step===0)return;const t=toT(e),vw=view(),tol=(vw.x1-vw.x0)*.06;drag=Math.abs(t-(s.t0+s.h))<tol?'Q':Math.abs(t-s.t0)<tol?'P':'Q';cv.setPointerCapture(e.pointerId);move(e)});
 const move=e=>{if(!drag)return;const t=toT(e);s.anim=null;if(drag==='P')s.t0=Math.max(.2,Math.min(2.6,t));else s.h=t-s.t0;sync();dirty=true;kick()};
 cv.addEventListener('pointermove',move);cv.addEventListener('pointerup',()=>{drag=null});cv.style.touchAction='none';
 i1.oninput=()=>{s.anim=null;s.t0=+i1.value;sync();dirty=true;kick()};i2.oninput=()=>{s.anim=null;s.h=Math.pow(10,+i2.value);sync();dirty=true;kick()};
 bz.onclick=()=>{const zin=s.z<2;s.to({z:zin?30:1},1600)};
 // challenge
 s.newChal=()=>{const opts=[.5,1,1.5,2.5].filter(x=>x!==s.ct);s.ct=opts[Math.floor(Math.random()*opts.length)];s.won=false;s.to({t0:s.ct,h:.5,z:1});
  chal.hidden=false;chal.innerHTML=`<p><b>Speed camera at t = ${s.ct} s.</b> Use the graph to find the phone’s speed at that instant (to 1 decimal place).</p><label>Speed <input type="number" step="0.1" inputmode="decimal" class="fl-in" aria-label="speed in metres per second"> m/s</label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const inp=chal.querySelector('input'),fb=chal.querySelector('.fl-fb');chal.querySelector('button').onclick=()=>{const v=parseFloat(inp.value),want=V(s.ct);
   if(!isFinite(v)){fb.textContent='Type a number first.';return}
   if(Math.abs(v-want)<=.15){fb.innerHTML=`✓ Yes: ${f2(want)} m/s. ${s.won?'':'Shrinking the gap to zero gave you the derivative.'} <button type="button" class="linkish">Another time →</button>`;s.won=true;fig.classList.add('lab-won');try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}fb.querySelector('button').onclick=()=>{fig.classList.remove('lab-won');s.newChal()}}
   else if(Math.abs(v-(S(s.ct+.5)-S(s.ct))/.5)<.2)fb.textContent='That is the average over half a second. Shrink Δt until the number stops changing.';
   else if(Math.abs(v-S(s.ct)/s.ct)<.2)fb.textContent='That is distance ÷ time since the start (the average from 0 s). You need the slope at P itself.';
   else if(Math.abs(v-S(s.ct))<.2)fb.textContent='That is the distance fallen, in metres, not the speed.';
   else fb.textContent='Not quite. Drag Q very close to P and read the average speed.'}};
 // steps
 STEPS.forEach((x,i)=>{const d=c.el('button',{type:'button',role:'tab',class:'fl-dot','aria-label':`Step ${i+1}: ${x.h}`},dots);d.onclick=()=>go(i)});
 const go=i=>{step=Math.max(0,Math.min(STEPS.length-1,i));const x=STEPS[step];H.textContent=x.h;P.textContent=x.p;chal.hidden=x.k!=='chal';
  [...dots.children].forEach((d,j)=>{d.setAttribute('aria-selected',String(j===step));d.classList.toggle('done',j<step)});
  bp.disabled=step===0;bn.textContent=step===STEPS.length-1?'Restart':step===0?'Start →':'Next →';ctl.hidden=step===0;read.hidden=step===0;s.seen.clear();x.go(s);sync();dirty=true;kick()};
 bp.onclick=()=>go(step-1);bn.onclick=()=>go(step===STEPS.length-1?0:step+1);
 const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{size();kick()}):null;if(ro)ro.observe(stage);
 c.stops.push(()=>{if(raf)cancelAnimationFrame(raf);if(ro)ro.disconnect()});
 size();go(c.opts.step||0)})})();
