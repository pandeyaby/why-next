/* Flagship 5 – solving linear equations on a real balance. Hook: a market scale, 2 mystery bags + 3 cubes balance 11 cubes.
   Learner drags cubes and bags into the bin; the beam tips with spring physics whenever the two sides stop weighing the same.
   A vertical swipe shares both pans into equal groups (division). Sandbox: drag from a supply tray. Challenge: solve by dragging,
   feedback on one-sided moves and on splitting before the loose cubes are cleared. */
(()=>{
VIS.reg('flageq',c=>{let A,chal;const st={L:{x:2,u:3},R:{x:0,u:11},X:4,th:0,vth:0,drag:null,split:0,won:false,warned:0,log:[]};
 const wt=s=>s.x*st.X+s.u,bal=()=>wt(st.L)===wt(st.R),term=s=>[s.x?(s.x===1?'x':s.x+'x'):'',s.u?String(s.u):''].filter(Boolean).join(' + ')||'0';
 const eqs=()=>`${term(st.L)} ${bal()?'=':'≠'} ${term(st.R)}`;
 const load=(L,R,X)=>{st.L={...L};st.R={...R};st.X=X;st.split=0;st.th=0;st.vth=0;st.warned=0;st.log=[];upd()};
 const upd=()=>{c.say(eqs());A.cv.setAttribute('aria-label',`Balance scale. Left pan: ${st.L.x} mystery bags and ${st.L.u} cubes. Right pan: ${st.R.x} bags and ${st.R.u} cubes. ${bal()?'Balanced':'Tipped'}: ${eqs()}.`);A.kick()};
 let chk=()=>{};
 // ---------- geometry ----------
 const G=A=>{const{W,H}=A,px=W/2,py=H*.2,arm=Math.min(W*(A.narrow?.29:.33),260),ang=st.th,pans=[-1,1].map(d=>({x:px+d*arm*Math.cos(ang),y:py+d*arm*Math.sin(ang)+H*.28,w:Math.min(arm*(A.narrow?1.1:.95),190)}));return{px,py,arm,pans,bin:{x:W/2,y:H*.9,r:Math.min(34,W*.07)},tray:{x:W*.5,y:H*.08}}};
 const slots=(s,pan)=>{const out=[],sz=Math.min(28,pan.w/6.8),bs=Math.max(sz*1.25,Math.min(38,pan.w/3.8)),x0=pan.x-pan.w/2+4,x1=pan.x+pan.w/2-4;let x=x0,y=pan.y,rh=0;
  const put=(k,i,w,h,sc)=>{if(x+w>x1&&x>x0){x=x0;y-=rh;rh=0}out.push({k,i,x:x+w/2,y:y-h/2-2,s:sc});x+=w;rh=Math.max(rh,h)};
  for(let k=0;k<s.x;k++)put('x',k,bs*1.02,bs*1.05,bs);for(let k=0;k<s.u;k++)put('u',k,sz*1.1,sz*1.08,sz*.95);return out};
 // ---------- drawing ----------
 const cube=(P,ctx,x,y,s,C)=>{P.shadow(5,2,.35);ctx.fillStyle=P.lin(x-s/2,y-s/2,x+s/2,y+s/2,[[0,'#93c5fd'],[1,'#2563eb']]);P.rrect(x-s/2,y-s/2,s,s,s*.18);ctx.fill();P.noShadow();ctx.fillStyle='rgba(255,255,255,.4)';ctx.fillRect(x-s/2+3,y-s/2+3,s-6,2)};
 const bag=(P,ctx,x,y,s,A)=>{P.shadow(8,3,.4);ctx.fillStyle=P.rad(x-s*.15,y-s*.1,s*.1,s*.75,[[0,'#e7c58f'],[1,'#a16207']]);ctx.beginPath();ctx.moveTo(x-s*.45,y+s*.45);ctx.quadraticCurveTo(x-s*.6,y-s*.1,x-s*.2,y-s*.35);ctx.lineTo(x+s*.2,y-s*.35);ctx.quadraticCurveTo(x+s*.6,y-s*.1,x+s*.45,y+s*.45);ctx.closePath();ctx.fill();P.noShadow();
  ctx.fillStyle='#78350f';ctx.fillRect(x-s*.22,y-s*.42,s*.44,s*.1);ctx.fillStyle='#451a03';ctx.font=`italic 800 ${s*.42}px Georgia,serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('x',x,y+s*.08);ctx.textBaseline='alphabetic'};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,g=G(A);A.eq={st,g,slots};
  // physics: target tilt from weight difference, damped spring
  const diff=wt(st.L)-wt(st.R),tgt=Math.max(-.32,Math.min(.32,diff*.05));if(A.reduced()){st.th=tgt;st.vth=0}else{st.vth+=((tgt-st.th)*40-st.vth*6)*dt;st.th+=st.vth*dt}
  ctx.fillStyle=P.lin(0,0,0,H,C.dark?[[0,'#1f2a44'],[1,'#0f172a']]:[[0,'#fff7ed'],[1,'#fde7c8']]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=P.rad(W/2,H*.15,0,W*.6,[[0,'rgba(255,220,160,.22)'],[1,'rgba(0,0,0,0)']]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=C.dark?'#3b2a1a':'#c08457';ctx.fillRect(0,H*.82,W,H*.18);ctx.fillStyle='rgba(0,0,0,.15)';for(let x=0;x<W;x+=44)ctx.fillRect(x,H*.82,2,H*.18);ctx.strokeStyle='rgba(255,220,180,.07)';ctx.lineWidth=1;for(let i=0;i<5;i++){const y=H*.84+i*H*.032;ctx.beginPath();ctx.moveTo(0,y);for(let x=0;x<=W;x+=24)ctx.lineTo(x,y+Math.sin(x*.03+i*1.7)*2.2);ctx.stroke()}ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(0,H*.82,W,2);
  // stand
  P.shadow(14,6,.4);ctx.fillStyle=P.lin(g.px-8,0,g.px+8,0,[[0,'#78350f'],[.45,'#fcd34d'],[1,'#92400e']]);ctx.fillRect(g.px-6,g.py,12,H*.82-g.py);[[.1,.035,.79],[.07,.03,.765]].forEach(([w,h,y])=>{ctx.fillStyle=P.lin(0,H*y,0,H*(y+h),[[0,'#fbbf24'],[1,'#78350f']]);P.rrect(g.px-W*w,H*y,W*w*2,H*h,5);ctx.fill()});P.noShadow();
  // beam
  ctx.save();ctx.translate(g.px,g.py);ctx.rotate(st.th);P.shadow(10,4,.35);ctx.fillStyle=P.lin(0,-6,0,6,[[0,'#fde68a'],[.5,'#d97706'],[1,'#78350f']]);P.rrect(-g.arm-6,-5,g.arm*2+12,10,5);ctx.fill();P.noShadow();ctx.restore();P.ball(g.px,g.py,9,'#f59e0b');
  // dial: tick arc with a green balanced zone
  {const R=44;ctx.save();ctx.translate(g.px,g.py);ctx.fillStyle=A.alpha(C.dark?'#0f172a':'#f8fafc',.85);ctx.beginPath();ctx.arc(0,0,R+6,Math.PI*1.15,Math.PI*1.85);ctx.lineTo(0,0);ctx.fill();ctx.lineWidth=4;ctx.strokeStyle=A.alpha(C.rd,.6);ctx.beginPath();ctx.arc(0,0,R,Math.PI*1.2,Math.PI*1.8);ctx.stroke();ctx.strokeStyle=C.gr;ctx.beginPath();ctx.arc(0,0,R,Math.PI*1.47,Math.PI*1.53);ctx.stroke();ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=1.2;for(let i=-4;i<=4;i++){const a=-Math.PI/2+i*Math.PI*.075;ctx.beginPath();ctx.moveTo(Math.cos(a)*(R-8),Math.sin(a)*(R-8));ctx.lineTo(Math.cos(a)*(R-3),Math.sin(a)*(R-3));ctx.stroke()}ctx.restore()}
  // needle
  ctx.save();ctx.translate(g.px,g.py);ctx.rotate(st.th);ctx.strokeStyle=bal()?C.gr:C.rd;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-40);ctx.stroke();ctx.restore();P.ball(g.px,g.py,9,'#f59e0b');
  // pans + items
  g.pans.forEach((pan,i)=>{const s=i?st.R:st.L,top=i?g.py+g.arm*Math.sin(st.th):g.py-g.arm*Math.sin(st.th),ex=i?g.px+g.arm*Math.cos(st.th):g.px-g.arm*Math.cos(st.th);
   [-.45,.45].forEach(o=>{const x2=pan.x+o*pan.w,L=Math.hypot(x2-ex,pan.y-top),n=Math.max(4,Math.floor(L/7));for(let j=0;j<n;j++){const t=(j+.5)/n,cx=ex+(x2-ex)*t,cy=top+(pan.y-top)*t;ctx.strokeStyle=j%2?'#b45309':'#fcd34d';ctx.lineWidth=1.6;ctx.beginPath();j%2?ctx.ellipse(cx,cy,1.5,3.5,Math.atan2(pan.y-top,x2-ex)+Math.PI/2,0,7):ctx.ellipse(cx,cy,3.5,1.8,Math.atan2(pan.y-top,x2-ex),0,7);ctx.stroke()}});
   P.shadow(12,6,.4);ctx.fillStyle=P.lin(0,pan.y-6,0,pan.y+14,[[0,'#fde68a'],[.5,'#d97706'],[1,'#78350f']]);ctx.beginPath();ctx.ellipse(pan.x,pan.y+4,pan.w/2,10,0,0,7);ctx.fill();P.noShadow();ctx.fillStyle=A.alpha('#451a03',.35);ctx.beginPath();ctx.ellipse(pan.x,pan.y+2,pan.w/2-6,6,0,0,7);ctx.fill();ctx.strokeStyle='rgba(255,248,220,.6)';ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(pan.x,pan.y+3,pan.w/2-1,9,0,Math.PI*1.05,Math.PI*1.95);ctx.stroke();
   const sp=slots(s,pan),grp=st.split>1?st.split:0;sp.forEach(o=>{if(st.drag&&st.drag.side===i&&st.drag.k===o.k&&st.drag.i===o.i)return;
    const fade=grp&&((o.k==='x'&&o.i>=s.x/grp)||(o.k==='u'&&o.i>=s.u/grp));ctx.globalAlpha=fade?.22:1;o.k==='x'?bag(P,ctx,o.x,o.y,o.s,A):cube(P,ctx,o.x,o.y,o.s,C);ctx.globalAlpha=1})});
  // split line
  if(st.split>1){ctx.strokeStyle=A.alpha(C.vi,.8);ctx.setLineDash([6,5]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(g.px,g.py+20);ctx.lineTo(g.px,H*.8);ctx.stroke();ctx.setLineDash([]);P.label(`each side ÷ ${st.split}`,g.px,H*.76,{pill:1,bg:A.alpha(C.vi,.9),col:'#fff'})}
  // bin
  const b=g.bin;ctx.fillStyle=A.alpha(C.rd,st.drag&&Math.hypot(st.drag.px-b.x,st.drag.py-b.y)<b.r*1.6?.45:.18);ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,7);ctx.fill();ctx.fillStyle=C.tx;ctx.font=`${b.r*.8}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🗑',b.x,b.y+1);ctx.textBaseline='alphabetic';
  // tray (sandbox)
  if(A.step===4){P.label('drag in →',W*.16,g.tray.y,{});bag(P,ctx,W*.3,g.tray.y,28,A);cube(P,ctx,W*.4,g.tray.y,20,C)}
  // dragged item
  if(st.drag){const d=st.drag;d.k==='x'?bag(P,ctx,d.px,d.py,30,A):cube(P,ctx,d.px,d.py,22,C)}
  // equation
  P.label(eqs(),W/2,A.step===4?H*.16:H*.08,{font:`800 ${A.narrow?20:26}px system-ui`,bg:A.alpha(bal()?C.gr:C.rd,.9),col:'#fff'});
  if(!A.isDone&&st.hint&&!st.drag){const a=.55+.45*Math.sin(performance.now()/230);ctx.globalAlpha=a;P.label(st.hint,W/2,H*.68,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  return Math.abs(st.vth)>.002||Math.abs(tgt-st.th)>.002||!A.isDone};
 // ---------- interaction ----------
 const hit=(A,p)=>{const g=G(A);for(let i=0;i<2;i++){const s=i?st.R:st.L;for(const o of slots(s,g.pans[i]))if(Math.abs(p.x-o.x)<o.s*.6&&Math.abs(p.y-o.y)<o.s*.6)return{side:i,k:o.k,i:o.i}}
  if(A.step===4){if(Math.hypot(p.x-A.W*.3,p.y-g.tray.y)<22)return{side:-1,k:'x',i:-1};if(Math.hypot(p.x-A.W*.4,p.y-g.tray.y)<18)return{side:-1,k:'u',i:-1}}return null};
 const remove=(side,k)=>{const s=side?st.R:st.L;if(s[k]<=0)return;s[k]--;st.split=0;A.sound.whoosh();const was=st.lastSide;st.log.push([side,k]);
  const b=bal();if(!b){st.warned++;c.say(`Tipped! ${eqs()}. Take the same from the other side.`)}upd();chk()};
 const add=(side,k)=>{const s=side?st.R:st.L;if(s.x+s.u>=14){A.sound.miss();return}s[k]++;st.split=0;A.sound.pop();upd();chk()};
 const share=()=>{const L=st.L,R=st.R;const xs=L.x&&!R.x?L:R.x&&!L.x?R:null,other=xs===L?R:L;
  if(!xs){A.sound.miss();msg('Get all the bags on one side first, then share.');return}
  if(xs.u){A.sound.miss();msg(`Clear the loose cubes beside the bags first: sharing ${term(xs)} into ${xs.x} groups would split the cubes too.`);return}
  if(xs.x<2){msg('Only one bag left: it is already solved!');return}
  if(other.x||other.u%xs.x){A.sound.miss();msg('Those don’t share out equally yet.');return}
  const k=xs.x;st.split=k;A.sound.pop();setTimeout(()=>{xs.x=1;other.u/=k;st.split=0;upd();chk();A.fx.add(18,i=>({x:A.W/2,y:A.H*.5,vx:(Math.random()-.5)*300,vy:-Math.random()*240,g:500,life:.8,r:2.5,col:[A.col.vi,A.col.gr][i%2],drag:.5}))},900);upd()};
 const msg=t=>{c.say(t);const f=(chal&&!chal.hidden&&chal.querySelector('.fl-fb'))||null;if(f)f.textContent=t;else{let w=A.extra.querySelector('.fl-why')||c.el('p',{class:'fl-why'},A.extra);w.textContent=t}};
 const solved=()=>bal()&&((st.L.x===1&&!st.L.u&&!st.R.x)||(st.R.x===1&&!st.R.u&&!st.L.x));
 const steps=[
  {h:'The market scale',p:'Two mystery bags and 3 cubes balance 11 cubes. Every bag weighs the same.',predict:{q:'How many cubes does one bag weigh?',opts:['3','4','7'],ans:1},task:'Drag one cube off the left pan into the bin',show:()=>remove(0,'u'),go:()=>{load({x:2,u:3},{x:0,u:11},4);st.hint='👆 drag a cube to the bin';chk=()=>{if(!bal())A.done('It tipped! Change one side and the scale is no longer balanced.')}}},
  {h:'Keep it balanced',p:'2x + 3 = 11. Get the bags on their own, but the scale must end up level.',task:'Remove 3 cubes from each side',show:()=>{load({x:2,u:0},{x:0,u:8},4)},go:()=>{load({x:2,u:3},{x:0,u:11},4);st.hint='👆 drag cubes to the bin, both sides';chk=()=>{if(!st.L.u&&st.R.u===8&&bal())A.done('2x = 8. Same change to both sides, so it stayed level.')}}},
  {h:'Share it out',p:'2 bags balance 8 cubes.',task:'Swipe down through the middle to split each side into 2 groups',show:()=>share(),go:()=>{load({x:2,u:0},{x:0,u:8},4);st.hint='👆 swipe down the middle ↓';chk=()=>{if(solved())A.done('x = 4: one bag balances 4 cubes. Check: 2 × 4 + 3 = 11 ✓'+A.reveal(0))}}},
  {h:'Bags on both sides',p:'3x + 1 = x + 9. There are bags on both pans this time.',predict:{q:'What should you take off first?',opts:['1 cube from each side','1 bag from each side','Either works'],ans:2},task:'Solve it: get one bag alone, keep the scale level',show:()=>load({x:1,u:0},{x:0,u:4},4),go:()=>{load({x:3,u:1},{x:1,u:9},4);st.hint='👆 drag a bag or cubes to the bin';chk=()=>{if(solved())A.done('x = 4. Either order works, as long as each move is done to both sides.'+A.reveal(3))}}},
  {h:'Sandbox: build your own',p:'Drag bags and cubes from the tray onto a pan, or into the bin. The mystery bag weighs 3 here. Build an equation that balances, then solve it.',go:()=>{load({x:0,u:0},{x:0,u:0},3);st.hint='';chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.02,draw,onStep:A=>{chal.hidden=A.step!==5;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   A.gest({down:p=>{if(A.step===5&&st.won)return false;const h=hit(A,p);if(h){st.drag={...h,px:p.x,py:p.y};A.sound.tick();A.kick();return true}st.sw={x:p.x,y:p.y};return true},
    move:p=>{if(st.drag){st.drag.px=p.x;st.drag.py=p.y;A.kick()}},
    up:p=>{const g=G(A);if(st.drag){const d=st.drag;st.drag=null;if(p){d.px=p.x;d.py=p.y}
      if(Math.hypot(d.px-g.bin.x,d.py-g.bin.y)<g.bin.r*1.8){if(d.side>=0)remove(d.side,d.k)}
      else if(d.side===-1){const side=d.px>A.W/2?1:0;if(d.py>A.H*.3)add(side,d.k)}
      A.kick();return}
     if(st.sw&&p){const dy=p.y-st.sw.y,dx=Math.abs(p.x-st.sw.x);if(dy>A.H*.3&&dx<A.W*.15&&Math.abs(st.sw.x-A.W/2)<A.W*.2)share()}st.sw=null}})}});
 const Q=[[{x:3,u:2},{x:0,u:14},4],[{x:2,u:5},{x:0,u:11},3],[{x:4,u:1},{x:2,u:7},3],[{x:3,u:0},{x:1,u:8},4],[{x:2,u:4},{x:0,u:10},3],[{x:5,u:2},{x:3,u:6},2]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[L,R,X]=Q[qi];load(L,R,X);st.won=false;st.hint='';st.log=[];
  chal.innerHTML=`<p><b>Solve ${eqs()}</b> using the scale: drag to the bin, swipe down the middle to share. Finish with one bag alone.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-a="0u">−1 cube left</button> <button type="button" class="lbtn sm ghost" data-a="1u">−1 cube right</button> <button type="button" class="lbtn sm ghost" data-a="0x">−1 bag left</button> <button type="button" class="lbtn sm ghost" data-a="1x">−1 bag right</button> <button type="button" class="lbtn sm ghost" data-a="s">Share</button> <button type="button" class="lbtn sm ghost" data-a="r">Restart</button></span>`;
  chal.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(st.won)return;if(a==='s')share();else if(a==='r')load(L,R,X);else remove(+a[0],a[1])});
  const fb=chal.querySelector('.fl-fb');let tipped=0;
  chk=()=>{if(st.won)return;if(!bal()){tipped++;fb.textContent=tipped>2?'Still tipped. Undo with Restart, or take the same from the other side.':'Tipped: you changed only one side. Do the same to the other side and it levels again.';return}
   if(solved()){st.won=true;const x=st.L.x?st.R.u:st.L.u;fb.innerHTML=`✓ x = ${x}. Check: ${term(L).replace(/(\d*)x/,(m,n)=>(n||'')+'×'+x)} = ${wt(L)} and ${term(R).replace(/(\d*)x/,(m,n)=>(n||'')+'×'+x)} = ${wt(R)}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal}else fb.textContent=`Level: ${eqs()}. Keep going.`};upd()};
 A.start()})})();
