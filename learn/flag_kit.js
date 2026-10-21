/* Flagship rendering kit: shared, high-fidelity building blocks so every flagship looks premium and behaves alike.
   FK.shell(c, cfg)  – story panel (step dots, heading, text, back/next) + stage + crisp HiDPI canvas + sound toggle
   FK.loop           – rAF loop that only runs while something animates; tweens with easing; reduced-motion aware
   FK.paint helpers  – theme colours, gradients, soft shadows, glow, rounded shapes, labels that avoid collisions
   FK.particles      – lightweight particle system (bubbles, sparks, confetti, steam)
   FK.sound          – tiny WebAudio blips/chimes, OFF by default, remembered per device */
const FK=(()=>{const ease={io:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,out:x=>1-Math.pow(1-x,3),back:x=>{const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)},el:x=>x===0||x===1?x:Math.pow(2,-10*x)*Math.sin((x*10-.75)*2.094)+1};
 let AC=null,SND=false;try{SND=localStorage.getItem('wn_sound')==='1'}catch(e){}
 const tone=(f,d=.12,type='sine',vol=.06,glide)=>{if(!SND)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=type;o.frequency.setValueAtTime(f,t);if(glide)o.frequency.exponentialRampToValueAtTime(glide,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02)}catch(e){}};
 const sound={on:()=>SND,set:v=>{SND=v;try{localStorage.setItem('wn_sound',v?'1':'0')}catch(e){}},tick:()=>tone(880,.05,'triangle',.035),step:()=>tone(520,.09,'sine',.05,660),
  win:()=>{tone(523,.16);setTimeout(()=>tone(659,.16),110);setTimeout(()=>tone(784,.28),220)},miss:()=>tone(220,.18,'sine',.05,180),pop:()=>tone(300,.07,'triangle',.05,900),whoosh:()=>tone(900,.35,'sawtooth',.012,120)};
 const theme=el=>{const cs=getComputedStyle(el),v=(n,d)=>(cs.getPropertyValue(n)||'').trim()||d;return{tx:v('--tx','#111'),mu:v('--mu','#666'),ln:v('--line','#ccc'),bg:v('--bg','#fff'),pn:v('--panel','#fff'),ac:v('--new','#2563eb'),cy:v('--cy','#0891b2'),or:v('--am','#d97706'),gr:v('--gr','#059669'),rd:v('--rd','#dc2626'),vi:v('--vi','#7c3aed'),pk:v('--pk','#db2777'),dark:(()=>{const b=rgb(v('--bg','#fff'));return b[0]*.3+b[1]*.59+b[2]*.11<110})()}};
 const cx0=document.createElement('canvas').getContext('2d'),rgb=c=>{cx0.fillStyle='#000';cx0.fillStyle=c;const v=cx0.fillStyle;if(v[0]==='#')return[1,3,5].map(i=>parseInt(v.slice(i,i+2),16)).concat(1);const m=v.match(/[\d.]+/g)||[0,0,0,1];return[+m[0],+m[1],+m[2],m[3]==null?1:+m[3]]};
 const mix=(a,b,t)=>{const A=rgb(a),B=rgb(b);return`rgb(${A.slice(0,3).map((x,i)=>Math.round(x+(B[i]-x)*t)).join(',')})`},alpha=(c,a)=>{const A=rgb(c);return`rgba(${A[0]},${A[1]},${A[2]},${a})`};
 const paint=ctx=>({
  rrect(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()},
  shadow(blur=12,dy=4,a=.28){ctx.shadowColor=`rgba(0,0,0,${a})`;ctx.shadowBlur=blur;ctx.shadowOffsetY=dy;ctx.shadowOffsetX=0},
  noShadow(){ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0},
  glow(col,blur=14){ctx.shadowColor=col;ctx.shadowBlur=blur;ctx.shadowOffsetY=0},
  lin(x0,y0,x1,y1,stops){const g=ctx.createLinearGradient(x0,y0,x1,y1);stops.forEach(([o,c])=>g.addColorStop(o,c));return g},
  rad(x,y,r0,r1,stops){const g=ctx.createRadialGradient(x,y,r0,x,y,r1);stops.forEach(([o,c])=>g.addColorStop(o,c));return g},
  ball(x,y,r,col,hi='#fff'){ctx.fillStyle=this.rad(x-r*.35,y-r*.4,r*.1,r*1.1,[[0,mix(col,hi,.65)],[.45,col],[1,mix(col,'#000000',.35)]]);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()},
  label(txt,x,y,opt={}){ctx.save();ctx.font=opt.font||'600 13px system-ui,sans-serif';const w=ctx.measureText(txt).width+12,h=20;let bx=x-(opt.align==='left'?0:opt.align==='right'?w:w/2),by=y-h/2;
   const CW=ctx.canvas.width/(ctx.getTransform().a||1);bx=Math.max(4,Math.min(CW-w-4,bx));if(opt.avoid)for(const r of opt.avoid){if(bx<r.x+r.w&&bx+w>r.x&&by<r.y+r.h&&by+h>r.y)by=r.y+r.h+3}
   if(opt.pill!==false){ctx.fillStyle=opt.bg||'rgba(0,0,0,.55)';this.rrect(bx,by,w,h,10);ctx.fill()}ctx.fillStyle=opt.col||'#fff';ctx.textBaseline='middle';ctx.textAlign='left';ctx.fillText(txt,bx+6,by+h/2+.5);ctx.restore();return{x:bx,y:by,w,h}}});
 function particles(){const P=[];return{P,add(n,f){for(let i=0;i<n;i++)P.push(Object.assign({x:0,y:0,vx:0,vy:0,life:1,age:0,r:3,g:0,col:'#fff',drag:0},f(i)))},
  step(dt){for(let i=P.length-1;i>=0;i--){const p=P[i];p.age+=dt;p.vx*=1-p.drag*dt;p.vy=(p.vy+p.g*dt)*(1-p.drag*dt);p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.age>=p.life)P.splice(i,1)}return P.length>0},
  draw(ctx){for(const p of P){const a=1-p.age/p.life;ctx.globalAlpha=Math.max(0,a);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r*(p.shrink?a:1),0,7);ctx.fill()}ctx.globalAlpha=1}}}
 function shell(c,cfg){const fig=c.fig,st=c.stage,E=c.el;fig.classList.add('flag');const reduced=()=>!!(c.reduced&&c.reduced());
  const wrap=E('div',{class:'fl-wrap'},st),story=E('div',{class:'fl-story'},wrap),top=E('div',{class:'fl-top'},story),dots=E('div',{class:'fl-dots',role:'tablist','aria-label':'Steps'},top);
  const sb=E('button',{type:'button',class:'fl-snd','aria-pressed':String(sound.on()),'aria-label':'Sound effects'},top,sound.on()?'🔊':'🔈');sb.onclick=()=>{sound.set(!sound.on());sb.textContent=sound.on()?'🔊':'🔈';sb.setAttribute('aria-pressed',String(sound.on()));sound.step()};
  const H=E('h4',{class:'fl-h'},story,''),Pp=E('p',{class:'fl-p'},story,''),extra=E('div',{class:'fl-extra'},story),nav=E('div',{class:'fl-nav'},story);
  const bp=E('button',{type:'button',class:'lbtn ghost sm'},nav,'← Back'),bn=E('button',{type:'button',class:'lbtn sm'},nav,'Next →');
  const stage=E('div',{class:'fl-stage'},wrap),cv=E('canvas',{class:'fl-cv',role:'img'},stage),below=E('div',{class:'fl-below'},stage);
  const ctx=cv.getContext('2d'),api={fig,stage,below,extra,cv,ctx,paint:paint(ctx),col:theme(fig),W:640,H:400,dpr:1,step:0,reduced,sound,ease,particles,mix,alpha};
  let raf=0,last=0,dirty=true;const tws=[],tick=[];
  api.redraw=()=>{dirty=true;kick()};api.every=f=>tick.push(f);
  api.tween=(obj,to,ms=900,e='io',done)=>{if(reduced()){Object.assign(obj,to);api.redraw();done&&done();return}const from={};for(const k in to)from[k]=obj[k];tws.push({obj,from,to,ms,e:ease[e]||ease.io,log:e==='log',t:performance.now(),done});kick()};
  const frame=now=>{raf=0;const dt=Math.min(.05,(now-(last||now))/1000);last=now;let more=false;
   for(let i=tws.length-1;i>=0;i--){const w=tws[i],u=Math.min(1,(now-w.t)/w.ms),k=w.e(u);for(const p in w.to){const a=w.from[p],b=w.to[p];w.obj[p]=w.log?Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*k):a+(b-a)*k}if(u>=1){tws.splice(i,1);w.done&&w.done()}else more=true;dirty=true}
   for(const f of tick)if(f(dt,now))more=dirty=true;
   if(dirty){dirty=false;ctx.setTransform(api.dpr,0,0,api.dpr,0,0);ctx.clearRect(0,0,api.W,api.H);cfg.draw(api,dt)}if(more)kick();else last=0};
  const kick=()=>{if(!raf)raf=requestAnimationFrame(frame)};api.kick=kick;
  const size=()=>{const w=Math.max(280,Math.min(stage.clientWidth-2||640,820)),narrow=w<520;api.W=w;api.H=Math.round(w*(narrow?(cfg.tall||.9):(cfg.ratio||.6)));api.dpr=Math.min(2.5,window.devicePixelRatio||1);cv.width=Math.round(api.W*api.dpr);cv.height=Math.round(api.H*api.dpr);cv.style.width=api.W+'px';cv.style.height=api.H+'px';api.col=theme(fig);api.narrow=narrow;api.redraw()};
  const go=i=>{api.step=Math.max(0,Math.min(cfg.steps.length-1,i));const x=cfg.steps[api.step];H.textContent=x.h;Pp.textContent=x.p||'';Pp.style.animation='none';void Pp.offsetWidth;Pp.style.animation='';extra.innerHTML='';
   [...dots.children].forEach((d,j)=>{d.setAttribute('aria-selected',String(j===api.step));d.classList.toggle('done',j<api.step)});bp.disabled=api.step===0;bn.textContent=api.step===cfg.steps.length-1?'Restart':api.step===0?'Start →':'Next →';
   fig.classList.remove('lab-won');api.isDone=!x.task;if(x.task){const t=E('div',{class:'fl-task',role:'status','aria-live':'polite'},extra);t.innerHTML=`<span class="fl-tk">👉 ${x.task}</span>`+(x.show?' <button type="button" class="linkish fl-show">Show me</button>':'');const sb=t.querySelector('.fl-show');if(sb)sb.onclick=()=>{x.show(api)};bn.disabled=true;bn.classList.remove('pulse')}else bn.disabled=false;x.go&&x.go(api);cfg.onStep&&cfg.onStep(api,x);api.redraw()};
  cfg.steps.forEach((x,i)=>{const d=E('button',{type:'button',role:'tab',class:'fl-dot','aria-label':`Step ${i+1}: ${x.h}`},dots);d.onclick=()=>{sound.step();go(i)}});
  bp.onclick=()=>{sound.step();go(api.step-1)};bn.onclick=()=>{sound.step();go(api.step===cfg.steps.length-1?0:api.step+1)};api.go=go;
  api.win=(msg)=>{fig.classList.add('lab-won');sound.win();try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}if(cfg.confetti!==false&&!reduced()){const C=api.col,cols=[C.or,C.cy,C.gr,C.pk,C.vi];api.fx.add(46,i=>({x:api.W/2,y:api.H*.35,vx:(Math.random()-.5)*520,vy:-Math.random()*420-80,g:700,life:1.4+Math.random()*.6,r:3+Math.random()*3,col:cols[i%5],drag:.6}));api.kick()}};
  api.done=(msg)=>{if(api.isDone)return;api.isDone=true;bn.disabled=false;bn.classList.add('pulse');sound.pop();const t=extra.querySelector('.fl-task');if(t){t.classList.add('ok');t.innerHTML=`<span class="fl-tk">✓ ${msg||'Nice.'}</span>`}api.fx.add(14,i=>({x:api.W*.5,y:api.H*.2,vx:(Math.random()-.5)*260,vy:-Math.random()*200,g:500,life:.9,r:2.5,col:[api.col.gr,api.col.cy,api.col.am][i%3],drag:.5}));api.kick()};
  api.gest=h=>{const pts=new Map();let pd0=0,mode=null;const dist=()=>{const v=[...pts.values()];return Math.hypot(v[0].x-v[1].x,v[0].y-v[1].y)};
   cv.addEventListener('pointerdown',e=>{const p=api.toT(e);pts.set(e.pointerId,p);try{cv.setPointerCapture(e.pointerId)}catch(_){ }if(pts.size===2&&h.pinch){mode='pinch';pd0=dist();h.up&&h.up();return}mode=h.down&&h.down(p,e)?'drag':null;if(mode)e.preventDefault()});
   cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const p=api.toT(e);pts.set(e.pointerId,p);if(mode==='pinch'&&pts.size===2){const d=dist();if(pd0>0)h.pinch(d/pd0);pd0=d}else if(mode==='drag')h.move&&h.move(p,e)});
   const end=e=>{pts.delete(e.pointerId);if(mode==='drag')h.up&&h.up(api.toT(e));if(!pts.size)mode=null};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
   if(h.pinch)cv.addEventListener('wheel',e=>{e.preventDefault();h.pinch(Math.exp(-e.deltaY*.002))},{passive:false})};
  cv.__A=api;api.fx=particles();api.every(dt=>api.fx.step(dt));
  api.toT=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*api.W/r.width,y:(e.clientY-r.top)*api.H/r.height}};cv.style.touchAction='none';
  const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(size):null;if(ro)ro.observe(stage);c.stops.push(()=>{if(raf)cancelAnimationFrame(raf);if(ro)ro.disconnect()});
  api.start=()=>{size();cfg.init&&cfg.init(api);go(c.opts.step||0)};return api}
 return{shell,ease,sound,theme,mix,alpha,particles}})();
