/* Why Next? labs (part 3): a gas box with colliding particles and a pressure meter, a reaction lab (mixing,
   indicator colour, temperature, gas bubbles and gas tests), a wave lab and a force-and-motion track. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const pal=fig=>{const d=document.documentElement.dataset.theme!=='classic'&&document.documentElement.dataset.theme;return d?{bg:'#0b1020',ink:'#e2e8f0',p:'#38bdf8',w:'#94a3b8'}:{bg:'#f8fafc',ink:'#111827',p:'#2563eb',w:'#475569'}};
/* gas lab: elastic collisions; pressure = momentum given to the walls per second */
R('gaslab',c=>{const o=c.opts,W=440,H=260,cv=c.el('canvas',{width:W*2,height:H*2,class:'vis-canvas',role:'img','aria-label':'Gas particles in a box with a movable wall'},c.stage);cv.style.width='100%';cv.style.maxWidth=W*1.35+'px';
 const g=cv.getContext('2d');g.scale(2,2);let n=o.n||30,T=o.temp||300,vol=o.vol||1,ps=[],imp=0,P=0,t0=performance.now(),run=!c.reduced(),raf=0,vis=true;
 const box=()=>({x0:10,y0:10,x1:10+(W-20)*(.4+.6*vol)/1,y1:H-10});const sp=()=>Math.sqrt(T/300)*90;
 const add=k=>{for(let i=0;i<k;i++){const b=box(),a=Math.random()*6.283;ps.push({x:b.x0+10+Math.random()*(b.x1-b.x0-20),y:b.y0+10+Math.random()*(b.y1-b.y0-20),vx:Math.cos(a),vy:Math.sin(a)})}};add(n);
 const step=dt=>{const b=box(),v=sp(),r=5;for(const q of ps){q.x+=q.vx*v*dt;q.y+=q.vy*v*dt;if(q.x<b.x0+r){q.x=b.x0+r;q.vx=Math.abs(q.vx);imp+=2*Math.abs(q.vx)*v}if(q.x>b.x1-r){q.x=b.x1-r;q.vx=-Math.abs(q.vx);imp+=2*Math.abs(q.vx)*v}
   if(q.y<b.y0+r){q.y=b.y0+r;q.vy=Math.abs(q.vy);imp+=2*Math.abs(q.vy)*v}if(q.y>b.y1-r){q.y=b.y1-r;q.vy=-Math.abs(q.vy);imp+=2*Math.abs(q.vy)*v}}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],d=ps[j],dx=d.x-a.x,dy=d.y-a.y,d2=dx*dx+dy*dy;if(d2<4*r*r&&d2>0){const L=Math.sqrt(d2),nx=dx/L,ny=dy/L,rv=(a.vx-d.vx)*nx+(a.vy-d.vy)*ny;if(rv>0){a.vx-=rv*nx;a.vy-=rv*ny;d.vx+=rv*nx;d.vy+=rv*ny}const ov=(2*r-L)/2;a.x-=nx*ov;a.y-=ny*ov;d.x+=nx*ov;d.y+=ny*ov}}};
 const theory=()=>ps.length*T/300/vol;/* relative pressure from pV = nRT, scaled so 30 particles, 300 K, full box = 30 */
 const paint=()=>{const C=pal(),b=box();g.fillStyle=C.bg;g.fillRect(0,0,W,H);g.strokeStyle=C.w;g.lineWidth=3;g.strokeRect(b.x0,b.y0,b.x1-b.x0,b.y1-b.y0);g.fillStyle=C.w;g.fillRect(b.x1,b.y0,8,b.y1-b.y0);
  g.fillStyle=C.p;for(const q of ps){g.beginPath();g.arc(q.x,q.y,5,0,6.283);g.fill()}g.fillStyle=C.ink;g.font='bold 14px system-ui';g.fillText(`pressure ≈ ${nf(theory(),0)}`,W-150,26);g.font='12px system-ui';g.fillText(`${ps.length} particles · ${T} K`,W-150,44)};
 const tell=()=>{c.say(`${ps.length} particles at ${T} K in a box ${Math.round(vol*100)}% full size. Pressure about ${nf(theory(),0)} (relative units). Hotter → faster particles hit the walls harder and more often; a smaller box or more particles → more hits each second, so higher pressure.`);L.check()};
 const loop=now=>{raf=0;if(!run||!vis)return;const dt=Math.min(.04,(now-(loop.l||now))/1000);loop.l=now;step(dt);if(now-t0>700){const b=box(),per=2*(b.x1-b.x0+b.y1-b.y0);P=.85*P+.15*(imp/((now-t0)/1000)/per*0.37);imp=0;t0=now}paint();raf=requestAnimationFrame(loop)};
 const go=()=>{if(run&&vis&&!raf){loop.l=0;raf=requestAnimationFrame(loop)}};
 const io=window.IntersectionObserver?new IntersectionObserver(e=>{vis=e[0].isIntersecting;go()}):null;io&&io.observe(cv);
 const th=()=>paint();document.addEventListener('wntheme',th);c.stops.push(()=>{run=false;cancelAnimationFrame(raf);io&&io.disconnect();document.removeEventListener('wntheme',th)});
 const base=theory();const L=VIS.lab(c,[{goal:'Double the pressure by changing ONLY the box size.',test:()=>Math.abs(theory()/(30*1)-2)<.08&&ps.length===30&&T===300,set:()=>{ps=[];add(30);T=300;vol=1;sync()},win:'Half the volume → twice the pressure (Boyle’s law).'},
  {goal:'Get the pressure above 60 using temperature only (box full size, 30 particles).',test:()=>theory()>60&&vol===1&&ps.length===30,set:()=>{ps=[];add(30);T=300;vol=1;sync()},win:'Pressure rises with temperature.'}]);
 const rT=c.range('Temperature (K)',100,900,50,T,v=>{T=v;tell();paint()}),rV=c.range('Box size %',40,100,5,100,v=>{vol=v/100;for(const q of ps)q.x=Math.min(q.x,box().x1-6);tell();paint()});
 const sync=()=>{rT.value=T;rV.value=vol*100;tell();paint()};
 c.btn('+5 particles',()=>{add(5);tell();paint()});c.btn('−5',()=>{ps.splice(0,Math.min(5,ps.length-1));tell();paint()},'ghost');
 const pb=c.btn(run?'Pause':'Play',()=>{run=!run;pb.textContent=run?'Pause':'Play';go();paint()},'ghost');c.cueEl=[cv];paint();tell();go()});

/* reaction lab: mix and observe */
R('reactlab',c=>{const o=c.opts;let ac=0,al=0,metal=0,carb=0,temp=20,gas=null,obs=[],ind=o.indicator!==false,bub=[];const W=420,H=280,s=c.svg(W,H,'Beaker');
 const UI=['#dc2626','#ea580c','#f59e0b','#eab308','#a3e635','#4ade80','#22c55e','#14b8a6','#0ea5e9','#3b82f6','#6366f1','#7c3aed','#9333ea','#a21caf'];
 c.el('rect',{x:120,y:60,width:160,height:190,rx:10,class:'lab-glass'},s);const liq=c.el('rect',{x:124,width:152,rx:8},s),gs=c.el('g',{},s);
 const th=c.el('rect',{x:320,y:60,width:14,height:190,rx:7,class:'lab-glass'},s),thf=c.el('rect',{x:323,width:8,rx:4,fill:'#ef4444'},s),tt=c.el('text',{x:327,y:50,'text-anchor':'middle',class:'vis-lab b'},s),pt=c.el('text',{x:200,y:40,'text-anchor':'middle',class:'vis-big'},s);
 const out=c.el('p',{class:'lab-out'},c.stage);
 const pH=()=>{const x=ac-al;if(Math.abs(x)<1e-9)return 7;return x>0?Math.max(1,7-1.6*Math.log2(1+x*2)):Math.min(13,7+1.6*Math.log2(1-x*2))};
 const draw=()=>{const vol=Math.min(180,60+(ac+al)*12),p=pH();liq.setAttribute('y',248-vol);liq.setAttribute('height',vol);liq.setAttribute('fill',ind?UI[Math.round(p)-1]||UI[6]:'#bae6fd');liq.setAttribute('opacity','.8');
  const tf=c.clamp((temp-0)/60,0,1)*180;thf.setAttribute('y',248-tf);thf.setAttribute('height',tf);tt.textContent=nf(temp,1)+' °C';pt.textContent=ind?'pH '+nf(p,1):'';
  out.textContent=obs.slice(-3).filter((x,i,a)=>x!==a[i-1]).join(' ');c.say(`Beaker: ${nf(ac)} acid, ${nf(al)} alkali added. ${ind?`Universal indicator shows pH ${nf(p,1)} (${p<6.5?'acidic':p>7.5?'alkaline':'neutral'}).`:''} Temperature ${nf(temp,1)} °C.${gas?` Bubbles of ${gas} are given off.`:''} ${obs.slice(-1)[0]||''}`);L.check()};
 const fizz=g2=>{gas=g2;if(c.reduced()){gs.innerHTML='';for(let i=0;i<10;i++)c.el('circle',{cx:135+Math.random()*130,cy:120+Math.random()*120,r:3+Math.random()*3,class:'lab-bub'},gs);return}
  for(let i=0;i<24;i++){const b=c.el('circle',{cx:135+Math.random()*130,cy:245,r:2+Math.random()*4,class:'lab-bub'},gs);const d=Math.random()*900;c.tween(1600+d,t=>b.setAttribute('cy',245-t*170),()=>b.remove())}};
 const react=()=>{const ex=Math.min(ac,al);if(ex>0){ac-=ex;al-=ex;temp+=2.5*ex;obs.push(`Neutralisation: acid + alkali → salt + water. It warms up (exothermic).`)}
  if(metal&&ac>0){const k=Math.min(metal,ac);metal-=k;ac-=k;temp+=3*k;fizz('hydrogen');obs.push('Magnesium fizzes in the acid: metal + acid → salt + hydrogen.')}
  if(carb&&ac>0){const k=Math.min(carb,ac);carb-=k;ac-=k;temp-=.5*k;fizz('carbon dioxide');obs.push('The carbonate fizzes: carbonate + acid → salt + water + carbon dioxide.')}};
 const L=VIS.lab(c,[{goal:'Neutralise the acid: get to pH 7 exactly.',test:()=>Math.abs(pH()-7)<1e-9&&made.n,set:()=>{reset();ac=3;obs.push('3 portions of acid are in the beaker.');draw()},win:'Equal acid and alkali → neutral (pH 7).'},
  {goal:'Make hydrogen, then test it with a lit splint.',test:()=>made.h,set:()=>{reset();draw()},win:'A squeaky pop means hydrogen.'},{goal:'Make carbon dioxide, then bubble it through limewater.',test:()=>made.c,set:()=>{reset();draw()},win:'Limewater turns milky with carbon dioxide.'}]);
 const made={n:0,h:0,c:0},reset=()=>{ac=al=metal=carb=0;temp=20;gas=null;obs=[];gs.innerHTML='';made.n=made.h=made.c=0};
 c.btn('Add acid',()=>{ac+=1;gas=null;react();draw()});c.btn('Add alkali',()=>{al+=1;gas=null;react();made.n=1;draw()});c.btn('Add magnesium',()=>{metal+=1;gas=null;react();draw()});c.btn('Add carbonate',()=>{carb+=1;gas=null;react();draw()});
 c.btn('Lit splint test',()=>{obs.push(gas==='hydrogen'?'Squeaky POP! The gas is hydrogen.':gas?'The splint just goes on burning or goes out: not hydrogen.':'No gas to test yet.');if(gas==='hydrogen')made.h=1;draw()},'ghost');
 c.btn('Limewater test',()=>{obs.push(gas==='carbon dioxide'?'The limewater turns milky: carbon dioxide!':gas?'Limewater stays clear: not carbon dioxide.':'No gas to test yet.');if(gas==='carbon dioxide')made.c=1;draw()},'ghost');
 c.btn('Empty beaker',()=>{reset();draw()},'ghost');ac=o.acid??1;c.cueEl=[liq];draw()});

/* wave lab */
R('wavelab',c=>{const o=c.opts;let A=o.a||1.5,f=o.f||1,v=o.v||4,ph=0,run=!c.reduced(),raf=0;const W=440,H=200,s=c.svg(W,H,'A wave'),mid=100,px=60;
 c.el('line',{x1:20,x2:W-10,y1:mid,y2:mid,class:'vis-axis'},s);const tg=o.target?c.el('path',{class:'vis-curve faint'},s):null,wv=c.el('path',{class:'vis-curve'},s),ro=c.el('text',{x:20,y:20,class:'vis-big'},s);
 const path=(A2,f2,p)=>{const lam=v/f2;let d='';for(let X=20;X<=W-10;X+=3){const x=(X-20)/px;d+=(X===20?'M':'L')+X+' '+(mid-A2*25*Math.sin(2*Math.PI*(x/lam)-p)).toFixed(1)}return d};
 const draw=()=>{wv.setAttribute('d',path(A,f,ph));if(tg)tg.setAttribute('d',path(o.target[0],o.target[1],0));const lam=v/f;ro.textContent=`λ = ${nf(lam)} m · f = ${nf(f)} Hz`;
  c.say(`Amplitude ${nf(A)} m, frequency ${nf(f)} Hz, wave speed ${nf(v)} m/s, so wavelength = speed ÷ frequency = ${nf(lam)} m. Higher frequency → shorter waves; bigger amplitude → taller waves (louder sound or brighter light).`);L.check()};
 const loop=now=>{raf=0;if(!run)return;ph=(now/1000)*2*Math.PI*f*.4;wv.setAttribute('d',path(A,f,ph));raf=requestAnimationFrame(loop)};c.stops.push(()=>{run=false;cancelAnimationFrame(raf)});
 const t=o.target||[1,2];const L=VIS.lab(c,[{goal:`Match the faint target wave (amplitude ${t[0]} m, frequency ${t[1]} Hz).`,test:()=>Math.abs(A-t[0])<1e-9&&Math.abs(f-t[1])<1e-9,win:'Frequency sets how squashed the wave is; amplitude sets its height.'},{goal:'Make the wavelength exactly 1 m.',test:()=>Math.abs(v/f-1)<1e-9,win:'λ = v ÷ f.'}]);
 c.range('Amplitude',.5,3,.5,A,x=>{A=x;draw()});c.range('Frequency (Hz)',.5,4,.5,f,x=>{f=x;draw()});c.range('Speed (m/s)',1,8,1,v,x=>{v=x;draw()});
 const pb=c.btn(run?'Pause':'Play',()=>{run=!run;pb.textContent=run?'Pause':'Play';if(run&&!raf)raf=requestAnimationFrame(loop)},'ghost');c.cueEl=[wv];draw();if(run)raf=requestAnimationFrame(loop)});

/* force lab: push a cart for 2 s, friction slows it; land in the green zone */
R('forcelab',c=>{const o=c.opts;let F=o.f||20,m=o.m||5,mu=o.mu??.2,res=null,raf=0;const W=440,H=150,s=c.svg(W,H,'Cart on a track'),X=d=>20+d*16;
 c.el('line',{x1:10,x2:W-10,y1:110,y2:110,class:'vis-axis'},s);const z0=o.zone||[15,18];c.el('rect',{x:X(z0[0]),y:96,width:(z0[1]-z0[0])*16,height:14,class:'lab-zone'},s);
 for(let d=0;d<=25;d+=5)c.el('text',{x:X(d),y:128,'text-anchor':'middle',class:'vis-lab'},s,d+' m');const cart=c.el('rect',{y:84,width:30,height:24,rx:4,class:'lab-cart'},s),ro=c.el('text',{x:20,y:22,class:'vis-big'},s);
 const sim=()=>{const g=9.8,fr=mu*m*g,tp=2;let x=0,v=0,t=0,dt=.01,tr=[];while(t<30){const push=t<tp?F:0,net=push-(v>0||push>fr?fr:push);const a=net/m;v=Math.max(0,v+a*dt);x+=v*dt;t+=dt;tr.push([t,x,v]);if(t>tp&&v<=0)break}return{x,tr,a0:(F-fr)/m,fr}};
 const show=d=>{cart.setAttribute('x',X(Math.min(d,26))-15)};
 const tell=r=>{const inz=r.x>=z0[0]&&r.x<=z0[1];c.say(`Push ${F} N for 2 s on a ${m} kg cart; friction ${nf(r.fr,1)} N. Net force while pushing ${nf(Math.max(0,F-r.fr),1)} N, so a = F ÷ m = ${nf(Math.max(0,r.a0),2)} m/s². It stops after ${nf(r.x,1)} m${inz?': in the green zone!':'.'}`);ro.textContent=`stopped at ${nf(r.x,1)} m`};
 const go=()=>{res=sim();cancelAnimationFrame(raf);if(c.reduced()){show(res.x);tell(res);L.check();return}let i=0;const tr=res.tr;const st=()=>{i=Math.min(tr.length-1,i+4);show(tr[i][1]);if(i<tr.length-1)raf=requestAnimationFrame(st);else{tell(res);L.check()}};st()};
 const L=VIS.lab(c,[{goal:`Make the cart stop in the green zone (${z0[0]}–${z0[1]} m).`,test:()=>res&&res.x>=z0[0]&&res.x<=z0[1],win:'More force or less mass → more acceleration (F = ma).'},{goal:'Use the heaviest cart (10 kg) and still reach the zone.',test:()=>res&&m===10&&res.x>=z0[0]&&res.x<=z0[1]}]);
 c.range('Push (N)',0,100,5,F,v=>{F=v});c.range('Mass (kg)',1,10,1,m,v=>{m=v});c.range('Friction',0,.5,.05,mu,v=>{mu=v});c.btn('▶ Push!',go);c.btn('Reset',()=>{cancelAnimationFrame(raf);res=null;show(0);ro.textContent='';c.say('Set the push, mass and friction, then press Push.')},'ghost');
 c.stops.push(()=>cancelAnimationFrame(raf));c.cueEl=[cart];show(0);c.say('Set the push, mass and friction, then press Push. The push lasts 2 seconds.')});
})();
