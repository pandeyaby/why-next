/* Flagship 13 – energy stores and transfers. Hook: a skater on a U-shaped ramp. The learner predicts how high she rises on the
   far side (misconception: "she loses some height even with no friction"), then drags her up the ramp and lets go while live
   bars show the gravitational, kinetic and thermal stores. Steps: the swap between stores, friction (energy goes to the thermal
   store, the total never changes), mass (a heavier skater is not faster at the bottom), a sandbox, and a challenge: choose the
   release height for a target speed at the bottom, with feedback for "height = speed", "mass matters" and "too high / too low". */
(()=>{const g=9.8,HALF=6,DEPTH=5,a=DEPTH/(HALF*HALF),hOf=X=>a*X*X,slope=X=>2*a*X,r1=v=>(Math.round(v*10)/10).toString(),r0=v=>Math.round(v).toString();
VIS.reg('flagenergy',c=>{let A,ctl,chal;
 // simulation state: X = position along the ground (m), u = speed along the track (m/s, signed), E0 = total energy (J)
 const st={m:40,X:-4,u:0,E0:0,Em:0,mu:0,run:false,drag:false,maxKE:0,passed:false,peak:0,released:false,q:null,won:false};
 const ke=()=>.5*st.m*st.u*st.u,gpe=()=>st.m*g*hOf(st.X),thermal=()=>Math.max(0,st.E0-ke()-gpe());
 /* Put the skater at rest at X and reset the energy books. */
 function place(X){st.X=Math.max(-HALF,Math.min(HALF,X));st.u=0;st.E0=st.Em=gpe();st.run=false;st.passed=false;st.peak=0;st.maxKE=0;st.released=false}
 /* One small physics step: tangential gravity plus optional friction; without friction the speed is re-derived from the
    energy so the books stay exact (no numerical drift). */
 function physics(dt){const k=slope(st.X),cs=1/Math.sqrt(1+k*k),sn=k*cs;
  st.u+=(-g*sn-st.mu*st.u*Math.abs(st.u)*.35-st.mu*Math.sign(st.u)*.6)*dt;const X1=st.X+st.u*cs*dt;
  if(Math.abs(X1)>HALF){st.X=Math.sign(X1)*HALF;st.u=0}else st.X=X1;
  if(!st.mu){const K=st.Em-gpe();if(K>0)st.u=Math.sign(st.u||-st.X)*Math.sqrt(2*K/st.m)}else st.Em=Math.min(st.Em,ke()+gpe());
  if(Math.abs(st.X)<.25)st.passed=true;st.maxKE=Math.max(st.maxKE,ke());if(st.passed)st.peak=Math.max(st.peak,hOf(st.X))}
 function advance(sec){const n=Math.ceil(sec*240);for(let i=0;i<n;i++)physics(sec/n);if(st.mu&&ke()+gpe()<st.E0*.004&&Math.abs(st.X)<.3){st.u=0;st.run=false}}
 const geo=A=>{const{W,H}=A,narrow=A.narrow,bw=narrow?0:Math.min(210,W*.3),tw=W-bw-(narrow?24:40),top=narrow?H*.1:H*.12,bot=narrow?H*.56:H*.86,sx=tw/(2*HALF),sy=(bot-top)/DEPTH,ox=12+tw/2;
  return{bw,ox,top,bot,X:x=>ox+x*sx,Y:h=>bot-h*sy,x:px=>(px-ox)/sx,bars:narrow?{x:16,y:H*.64,w:W-32,h:H*.32}:{x:W-bw-6,y:top,w:bw,h:bot-top+20}}};
 const say=()=>{const s=`Height ${r1(hOf(st.X))} m, speed ${r1(Math.abs(st.u))} m/s. Gravitational store ${r0(gpe())} J, kinetic ${r0(ke())} J, thermal ${r0(thermal())} J; total ${r0(st.E0)} J.`;c.say(s);A&&A.cv.setAttribute('aria-label','A skater on a U-shaped ramp with energy bars. '+s)};
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.12)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // height grid in metres
  ctx.font='11px system-ui';ctx.textAlign='left';for(let h=0;h<=DEPTH;h++){ctx.strokeStyle=A.alpha(C.tx,h?.08:.25);ctx.beginPath();ctx.moveTo(G.X(-HALF),G.Y(h));ctx.lineTo(G.X(HALF),G.Y(h));ctx.stroke();ctx.fillStyle=C.mu;ctx.fillText(h+' m',G.X(-HALF)-2,G.Y(h)-3)}
  // release-height marker and peak on the far side
  if(st.released){const h0=hOf(st.X0||st.X);ctx.setLineDash([6,5]);ctx.strokeStyle=A.alpha(C.am,.8);ctx.beginPath();ctx.moveTo(G.X(-HALF),G.Y(h0));ctx.lineTo(G.X(HALF),G.Y(h0));ctx.stroke();ctx.setLineDash([])}
  // ramp: a thick wooden U with a glow edge
  ctx.lineCap='round';ctx.strokeStyle=A.mix('#8b5e34',C.pn,.15);ctx.lineWidth=14;ctx.beginPath();for(let i=0;i<=120;i++){const x=-HALF+2*HALF*i/120;i?ctx.lineTo(G.X(x),G.Y(hOf(x))+7):ctx.moveTo(G.X(x),G.Y(hOf(x))+7)}ctx.stroke();
  P.glow(A.alpha(C.cy,.7),10);ctx.strokeStyle=C.cy;ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=120;i++){const x=-HALF+2*HALF*i/120;i?ctx.lineTo(G.X(x),G.Y(hOf(x))):ctx.moveTo(G.X(x),G.Y(hOf(x)))}ctx.stroke();P.noShadow();
  if(st.mu){const k=Math.min(1,thermal()/(st.E0||1));P.glow(A.alpha(C.or,.4+.5*k),8+16*k);ctx.strokeStyle=A.alpha(C.or,.25+.6*k);ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<=120;i++){const x=-HALF+2*HALF*i/120;i?ctx.lineTo(G.X(x),G.Y(hOf(x))+3):ctx.moveTo(G.X(x),G.Y(hOf(x))+3)}ctx.stroke();P.noShadow();
   if(k>.02)P.label('warm ramp, wheels and air',G.X(0),G.Y(0)+24,{font:'600 11px system-ui',bg:A.alpha(C.or,.85),col:'#111'})}
  // skater: board tangent to the track, body upright, size grows a little with mass
  const px=G.X(st.X),py=G.Y(hOf(st.X)),ang=Math.atan2(-(G.Y(hOf(st.X+.01))-py),G.X(st.X+.01)-px),s=st.m>60?1.18:1;
  ctx.save();ctx.translate(px,py);ctx.rotate(-ang);ctx.fillStyle='#111827';P.rrect(-16*s,-7,32*s,5,2.5);ctx.fill();ctx.fillStyle='#e5e7eb';[-10,10].forEach(w=>{ctx.beginPath();ctx.arc(w*s,0,3,0,7);ctx.fill()});ctx.restore();
  ctx.save();ctx.translate(px,py-6);ctx.strokeStyle=C.vi;ctx.lineWidth=5*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-5*s,0);ctx.lineTo(0,-16*s);ctx.lineTo(5*s,0);ctx.moveTo(0,-16*s);ctx.lineTo(0,-30*s);ctx.moveTo(-10*s,-24*s);ctx.lineTo(10*s,-24*s);ctx.stroke();P.ball(0,-36*s,6.5*s,C.am);ctx.restore();
  if(!st.run&&!A.isDone||A.step===4&&!st.run){P.glow(A.alpha(C.am,.9),14);ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py-22,30,0,7);ctx.stroke();P.noShadow()}
  P.label(`${r1(Math.abs(st.u))} m/s`,px,py-62*s,{font:'700 12px system-ui',bg:A.alpha('#0b1220',.75)});
  bars(A,G.bars);
  if(!st.run&&!st.released&&(A.step!==0&&A.step!==2&&A.step!==3||A.pred[A.step]!=null)&&A.step<5){ctx.globalAlpha=.6+.4*Math.sin(performance.now()/260);P.label('👆 drag the skater up the ramp, then let go',W/2-(G.bw/2),H-12,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}
 /* Energy bar chart: three stores plus the total as an outline that never changes. */
 function bars(A,B){const{ctx,paint:P,col:C}=A,T=Math.max(st.E0,1),vals=[['Gravitational',gpe(),C.cy],['Kinetic',ke(),C.gr],['Thermal',thermal(),C.or],['Total',st.E0,C.tx]];
  ctx.fillStyle=A.alpha(C.tx,.05);P.rrect(B.x,B.y,B.w,B.h,10);ctx.fill();const narrow=A.narrow,n=vals.length,gap=narrow?10:8,bw=(B.w-gap*(n+1))/n,base=B.y+B.h-30,hh=B.h-56;
  ctx.font='600 11px system-ui';ctx.textAlign='center';vals.forEach(([t,v,col],i)=>{const x=B.x+gap+i*(bw+gap),h=hh*v/T;
   if(t==='Total'){ctx.strokeStyle=col;ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.strokeRect(x+1,base-h,bw-2,h);ctx.setLineDash([])}else{ctx.fillStyle=P.lin(0,base-h,0,base,[[0,A.mix(col,'#fff',.25)],[1,col]]);P.rrect(x,base-h,bw,Math.max(h,1),4);ctx.fill()}
   ctx.fillStyle=C.tx;ctx.fillText(t==='Gravitational'?(narrow?'Gravity':'Gravity'):t,x+bw/2,base+14);ctx.fillStyle=C.mu;ctx.fillText(r0(v)+' J',x+bw/2,base-h-6)})}
 // ---------- controls ----------
 const btn=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab||t},ctl,t);b.onclick=f;return b};
 let bGo,bFr,bM;
 /* Let go: start the run from where the skater is now. */
 function release(){if(st.run)return;st.X0=st.X;st.E0=st.Em=gpe();st.released=true;st.passed=false;if(st.q)st.q.judged=false;st.peak=0;st.maxKE=0;st.run=true;A.sound.whoosh();if(A.reduced())advance(.5);A.kick()}
 /* Keyboard/button way to set the start: move away from (up) or towards (down) the bottom, while stopped. */
 function nudge(d){if(st.run)return;const side=st.X>0?1:-1;place(side*Math.max(0,Math.abs(st.X)+d));sync();A.redraw()}
 function sync(){bGo.textContent=st.run?'⏸ Pause':A.reduced()&&st.released?'Step ▶':'▶ Let go';bFr.textContent=st.mu?'Friction: on':'Friction: off';bFr.setAttribute('aria-pressed',String(!!st.mu));bM.textContent=`Mass: ${st.m} kg`;say()}
 const steps=[
  {h:'Let go',p:'The ramp has no friction. She starts still, high on the left side.',predict:{q:'How high does she get on the right side?',opts:['Lower than she started','The same height','Higher'],ans:1},task:'Drag her up the left side and let go',show:()=>{place(-5);release();sync()},
   go:()=>{st.mu=0;st.m=40;place(-4);sync()},check:()=>{if(st.passed&&st.peak>hOf(st.X0)*.97)A.done(`She rose back to ${r1(st.peak)} m, the height she started from. Nothing was lost: the energy just moved between stores.`+A.reveal(0))}},
  {h:'Two stores swap',p:'High up, energy sits in the gravitational store. Fast, it sits in the kinetic store. Watch the green bar.',task:'Pause her when the kinetic store is at its biggest',show:()=>{place(-5);release();advance(1.27);st.run=false;sync();chkNow()},
   go:()=>{st.mu=0;place(-5);sync()},check:()=>{if(!st.run&&st.released&&ke()>.93*st.E0)A.done(`At the bottom almost all ${r0(st.E0)} J is kinetic: ${r0(ke())} J. Low and fast = kinetic store full.`)}},
  {h:'Friction',p:'Real ramps rub. Turn friction on and watch every bar, including the dotted total.',predict:{q:'With friction, the energy she loses…',opts:['disappears','goes into a thermal store (warm wheels, air, ramp)','turns back into height'],ans:1},task:'Turn friction on, let her go and wait until most of the energy is thermal',show:()=>{st.mu=1;place(-5);release();advance(8);sync();chkNow()},
   go:()=>{st.mu=0;place(-5);sync()},check:()=>{if(st.mu&&thermal()>.5*st.E0)A.done(`Thermal store: ${r0(thermal())} J, and the total is still ${r0(st.E0)} J. Energy is never destroyed; it spreads out as heat.`+A.reveal(2))}},
  {h:'Heavier skater',p:'Swap to an 80 kg skater and let her go from the same height as before.',predict:{q:'Compared with the 40 kg skater, at the bottom she is…',opts:['twice as fast','just as fast','half as fast'],ans:1},task:'Set the mass to 80 kg and let go from about 4 m up',show:()=>{st.m=80;place(-HALF*Math.sqrt(4/DEPTH));release();sync()},
   go:()=>{st.mu=0;st.m=40;place(-HALF*Math.sqrt(4/DEPTH));sync()},check:()=>{if(st.m===80&&st.passed&&Math.abs(hOf(st.X0)-4)<.35)A.done(`Twice the mass gives twice the energy (${r0(st.E0)} J), but it has twice as much to move. Speed at the bottom is still √(2 × 9.8 × ${r1(hOf(st.X0))}) ≈ ${r1(Math.sqrt(2*g*hOf(st.X0)))} m/s.`+A.reveal(3))}},
  {h:'Sandbox',p:'Change the mass, switch friction on and off, and release from any height. What stays the same every time?',go:()=>{st.mu=0;place(-5);sync()}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 let chk=()=>{};const chkNow=()=>{const x=steps[A.step];if(x&&x.check&&!A.isDone)x.check()};
 A=FK.shell(c,{steps,ratio:.6,tall:1.25,draw:(A,dt)=>draw(A),onStep:A=>{ctl.hidden=A.step===5&&st.won;chal.hidden=A.step!==5;st.q=A.step===5?st.q:null;sync()},
  init:A=>{ctl=c.el('div',{class:'fl-ctl'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   bGo=btn('▶ Let go',()=>{if(st.run){st.run=false;sync();chkNow();return}if(A.reduced()&&st.released){advance(.4);sync();chkNow();return}release();sync()});
   btn('▲ Higher',()=>nudge(.4),'Move the skater higher up the ramp');btn('▼ Lower',()=>nudge(-.4),'Move the skater lower down the ramp');
   bFr=btn('Friction: off',()=>{st.mu=st.mu?0:1;if(!st.run)place(st.X);sync();chkNow()});bFr.setAttribute('aria-pressed','false');
   bM=btn('Mass: 40 kg',()=>{st.m=st.m===40?80:40;place(st.X);sync()});
   A.every(dt=>{if(!st.run||A.reduced())return false;advance(dt);sync();chkNow();if(A.step===5)judgeLive();return st.run});
   A.gest({down:p=>{const G=geo(A),px=G.X(st.X),py=G.Y(hOf(st.X));if(Math.hypot(p.x-px,p.y-py+20)>48)return false;st.run=false;st.drag=true;return true},
    move:p=>{const G=geo(A);place(G.x(p.x));sync();A.redraw()},up:()=>{if(!st.drag)return;st.drag=false;if(hOf(st.X)>.15)release();sync()}})}});
 // ---------- challenge: release height for a target speed at the bottom ----------
 const TARGET=[6,7,8,9,5];let qi=-1;
 function newChal(){qi=(qi+1)%TARGET.length;const v=TARGET[qi];st.mu=0;st.m=Math.random()<.5?40:80;place(-1.5);st.q={v,h:v*v/(2*g)};st.won=false;ctl.hidden=false;
  chal.innerHTML=`<p><b>Release her so she is doing ${v} m/s at the bottom.</b> No friction; she is ${st.m} kg. Use ½mv² = mgh, set the height, then let go.</p><p class="fl-fb" role="status" aria-live="polite"></p>`;sync()}
 function judgeLive(){const q=st.q,fb=chal.querySelector('.fl-fb');if(!q||st.won||!st.passed||q.judged)return;q.judged=true;const h=hOf(st.X0),v=Math.sqrt(2*g*h);
  if(Math.abs(v-q.v)<.35){st.won=true;fb.innerHTML=`✓ From ${r1(h)} m: v = √(2 × 9.8 × ${r1(h)}) = ${r1(v)} m/s. The mass cancels, so ${st.m} kg made no difference. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=Math.abs(h-q.v)<.4?`You set the height to ${r1(h)} m, the same number as the speed. Height isn't speed: solve 9.8 × h = ½ × ${q.v}², so h ≈ ${r1(q.h)} m.`
   :`${r1(v)} m/s from ${r1(h)} m: ${v<q.v?'too slow, start higher':'too fast, start lower'}. Hint: h = v² ÷ 19.6, whatever her mass.`}
 A.start()})})();
