/* Flagship 4 – negative numbers on a thermometer. Hook: a mountain hut at sunset, 3 °C, frost coming.
   Learner predicts, then drags the liquid; every degree crossed is counted as a hop, zero is a landmark. Scene colour, frost and snow follow the temperature.
   Sandbox: two markers (start/end) with a signed change arrow. Challenge: drag to the answer; feedback targets wrong direction, "−7 is warmer than −2", sign flips and counting the start. */
(()=>{const MIN=-15,MAX=15;
VIS.reg('flagneg',c=>{let A,ops,chal;const st={t:3,a:3,b:3,from:3,hops:0,drag:null,snow:[],won:false};
 const fmt=v=>(v<0?'−':'')+Math.abs(v)+' °C',sg=v=>(v>0?'+':v<0?'−':'')+Math.abs(v);
 const geo=A=>{const{W,H}=A,top=H*.08,bot=H*.86,x=A.narrow?W*.24:W*.2;return{x,top,bot,y:v=>bot-(v-MIN)/(MAX-MIN)*(bot-top),v:y=>Math.round(MIN+(bot-y)/(bot-top)*(MAX-MIN))}};
 const set=v=>{v=Math.max(MIN,Math.min(MAX,v));if(v!==st.t){const d=Math.sign(v-st.t);while(st.t!==v){st.t+=d;st.hops+=d;if(st.t===0)A.sound.pop();else A.sound.tick()}upd();chk()}};
 const upd=()=>{c.say(`Thermometer reads ${fmt(st.t)}`+(st.hops?`, changed by ${sg(st.hops)} degrees.`:'.'));A.cv.setAttribute('aria-label',A.step===0?'Illustration: a mountain hut at sunset, thermometer on the wall reads 3 °C.':`Thermometer from −15 to 15 °C reading ${fmt(st.t)}.`+(A.step===4?` Start marker ${fmt(st.a)}, end marker ${fmt(st.b)}, change ${sg(st.b-st.a)}.`:''));A.redraw()};
 const goal=(v,msg)=>()=>{if(st.t===v)A.done(msg)};let chk=()=>{};
 // ---------- scene ----------
 const scene=(A,dt,t)=>{const{ctx,W,H,paint:P,col:C}=A,k=Math.max(0,Math.min(1,(t-MIN)/(MAX-MIN)));
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix('#0b1a3a','#f59e0b',k*.9)],[.7,A.mix('#1e3a8a','#fde68a',k)],[1,A.mix('#c7d2fe','#fef3c7',k)]]);ctx.fillRect(0,0,W,H);
  const sx=W*.78,sy=H*(.55-k*.35);ctx.fillStyle=P.rad(sx,sy,0,W*.25,[[0,A.alpha(k>.5?'#fde047':'#e0e7ff',.9)],[1,'rgba(0,0,0,0)']]);ctx.fillRect(0,0,W,H);P.ball(sx,sy,W*.035,k>.5?'#fde047':'#f1f5f9');
  ctx.fillStyle=A.mix('#1e293b','#475569',k);ctx.beginPath();ctx.moveTo(0,H*.78);[[.15,.45],[.3,.6],[.48,.32],[.66,.58],[.82,.42],[1,.62],[1,.78]].forEach(([x,y])=>ctx.lineTo(W*x,H*y));ctx.fill();
  const ice=1-Math.min(1,Math.max(0,(t+1)/4));if(ice>0){ctx.fillStyle=A.alpha('#f8fafc',.85*ice);ctx.beginPath();ctx.moveTo(W*.38,H*.42);ctx.lineTo(W*.48,H*.32);ctx.lineTo(W*.57,H*.43);ctx.quadraticCurveTo(W*.48,H*.4,W*.38,H*.42);ctx.fill()}
  ctx.fillStyle=P.lin(0,H*.75,0,H,[[0,A.mix('#e2e8f0','#65a30d',Math.min(1,Math.max(0,t/6)))],[1,A.mix('#94a3b8','#3f6212',Math.min(1,Math.max(0,t/6)))]]);ctx.fillRect(0,H*.78,W,H*.22);
  // hut
  const hx=W*.58,hy=H*.78,hw=W*.2;P.shadow(14,6,.35);ctx.fillStyle='#7c2d12';ctx.fillRect(hx,hy-hw*.55,hw,hw*.55);ctx.fillStyle='#451a03';ctx.beginPath();ctx.moveTo(hx-8,hy-hw*.55);ctx.lineTo(hx+hw/2,hy-hw*.95);ctx.lineTo(hx+hw+8,hy-hw*.55);ctx.fill();P.noShadow();
  if(ice>0){ctx.fillStyle=A.alpha('#f8fafc',ice);ctx.beginPath();ctx.moveTo(hx-8,hy-hw*.55);ctx.lineTo(hx+hw/2,hy-hw*.95);ctx.lineTo(hx+hw+8,hy-hw*.55);ctx.lineTo(hx+hw/2,hy-hw*.85);ctx.fill()}
  P.glow('#fbbf24',20);ctx.fillStyle=t<5?'#fde68a':'#78350f';ctx.fillRect(hx+hw*.6,hy-hw*.4,hw*.22,hw*.2);P.noShadow();
  {const tr=(x,h)=>{ctx.fillStyle='#3f2a14';ctx.fillRect(x-2,hy-h*.25,4,h*.25);ctx.fillStyle=A.mix('#14532d','#1e3a2f',ice);for(let i=0;i<3;i++){const y=hy-h*.2-i*h*.24,wd=h*(.36-i*.08);ctx.beginPath();ctx.moveTo(x-wd,y);ctx.lineTo(x,y-h*.34);ctx.lineTo(x+wd,y);ctx.fill();if(ice>0){ctx.fillStyle=A.alpha('#f8fafc',.8*ice);ctx.beginPath();ctx.moveTo(x-wd*.45,y-h*.18);ctx.lineTo(x,y-h*.34);ctx.lineTo(x+wd*.45,y-h*.18);ctx.fill();ctx.fillStyle=A.mix('#14532d','#1e3a2f',ice)}}};tr(hx-hw*.35,hw*.9);tr(hx+hw*1.3,hw*.7);tr(W*.12,hw*.8)}
  ctx.fillStyle='#3b1406';ctx.fillRect(hx+hw*.16,hy-hw*.34,hw*.2,hw*.34);ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(hx+hw*.32,hy-hw*.17,1.6,0,7);ctx.fill();
  ctx.strokeStyle='#3b1406';ctx.lineWidth=1.5;ctx.strokeRect(hx+hw*.6,hy-hw*.4,hw*.22,hw*.2);ctx.beginPath();ctx.moveTo(hx+hw*.71,hy-hw*.4);ctx.lineTo(hx+hw*.71,hy-hw*.2);ctx.stroke();
  if(t<0){const fr=Math.min(1,-t/10);ctx.fillStyle=A.alpha('#e0f2fe',.75*fr);[[hx+hw*.6,hy-hw*.4,1,1],[hx+hw*.82,hy-hw*.4,-1,1],[hx+hw*.6,hy-hw*.2,1,-1],[hx+hw*.82,hy-hw*.2,-1,-1]].forEach(([cx,cy,sx,sy])=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+sx*hw*.09*fr,cy);ctx.quadraticCurveTo(cx+sx*hw*.03,cy+sy*hw*.03,cx,cy+sy*hw*.08*fr);ctx.fill()})}
  {const cx=hx+hw*.78,cy=hy-hw*.8;ctx.fillStyle='#57534e';ctx.fillRect(cx-hw*.05,cy-hw*.1,hw*.1,hw*.16);if(!A.reduced()){st.smoke=st.smoke||[];if(t<12&&Math.random()<dt*(3+Math.max(0,-t)*.25))st.smoke.push({x:cx,y:cy-hw*.1,a:1,r:3});st.smoke=st.smoke.filter(q=>(q.a-=dt*.35)>0);for(const q of st.smoke){q.y-=dt*18;q.x+=dt*(6+Math.sin(q.y/12)*4);q.r+=dt*5;ctx.fillStyle=A.alpha('#cbd5e1',q.a*.45);ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill()}}}
  // snow
  if(t<0&&!A.reduced()){const n=Math.min(80,(-t)*6);while(st.snow.length<n)st.snow.push({x:Math.random()*W,y:Math.random()*H,v:20+Math.random()*30,r:1+Math.random()*2});st.snow.length=n;ctx.fillStyle='rgba(255,255,255,.85)';for(const f of st.snow){f.y+=f.v*dt;f.x+=Math.sin(f.y/30)*.3;if(f.y>H){f.y=-4;f.x=Math.random()*W}ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,7);ctx.fill()}}else st.snow.length=0;
  return t<0};
 const thermo=A=>{const{ctx,W,H,paint:P,col:C}=A,g=geo(A);A.ng={g,st};const tw=A.narrow?18:22,x=g.x;
  {const px=x-tw*2.6,py=g.top-18,pw=tw*5.6+(A.narrow?34:44),ph=g.bot-g.top+tw*2.6+30;P.shadow(18,6,.3);ctx.fillStyle=P.lin(px,py,px+pw,py+ph,[[0,A.alpha(C.dark?'#1e293b':'#ffffff',.55)],[1,A.alpha(C.dark?'#0b1222':'#e2e8f0',.4)]]);P.rrect(px,py,pw,ph,16);ctx.fill();P.noShadow();ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.2;ctx.stroke();ctx.fillStyle='rgba(255,255,255,.06)';P.rrect(px+3,py+3,pw-6,ph*.35,13);ctx.fill()}
  // glass
  P.shadow(16,6,.35);ctx.fillStyle=P.lin(x-tw/2,0,x+tw/2,0,[[0,'rgba(255,255,255,.55)'],[.5,'rgba(255,255,255,.18)'],[1,'rgba(255,255,255,.45)']]);P.rrect(x-tw/2,g.top-8,tw,g.bot-g.top+16,tw/2);ctx.fill();P.noShadow();
  ctx.beginPath();ctx.arc(x,g.bot+tw*1.1,tw*1.05,0,7);ctx.fill();
  // liquid
  const ly=g.y(st.t),cold=st.t<0,lc=cold?C.cy:C.rd;P.glow(A.alpha(lc,.8),12);ctx.fillStyle=P.lin(x-tw/4,0,x+tw/4,0,[[0,A.mix(lc,'#000',.2)],[.4,A.mix(lc,'#fff',.35)],[1,lc]]);ctx.fillRect(x-tw*.22,ly,tw*.44,g.bot+tw-ly);P.ball(x,g.bot+tw*1.1,tw*.8,lc);P.noShadow();
  // ticks
  ctx.textAlign='left';ctx.textBaseline='middle';for(let v=MIN;v<=MAX;v++){const y=g.y(v),maj=v%5===0;ctx.strokeStyle=v===0?C.tx:A.alpha(C.tx,maj?.85:.4);ctx.lineWidth=v===0?2.5:maj?1.6:1;ctx.beginPath();ctx.moveTo(x+tw*.6,y);ctx.lineTo(x+tw*.6+(maj?14:7),y);ctx.stroke();if(maj){ctx.fillStyle=v===0?C.tx:A.alpha(C.tx,.85);ctx.font=`${v===0?800:600} ${A.narrow?12:13}px system-ui`;ctx.fillText((v<0?'−':'')+Math.abs(v),x+tw*.6+18,y)}}ctx.textBaseline='alphabetic';
  const zy=g.y(0);ctx.strokeStyle=A.alpha(C.cy,.5);ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(x-tw*2.2,zy);ctx.lineTo(x-tw*.7,zy);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=C.cy;ctx.font='700 10px system-ui';ctx.textAlign='right';ctx.fillText('freezing',x-tw*.8,zy-6);
  // hops from start
  if(st.hops&&A.step>=1&&A.step<4){const d=Math.sign(st.hops),xh=x-tw*1.5;ctx.strokeStyle=A.alpha(C.am,.85);ctx.lineWidth=1.6;for(let i=0;i<Math.abs(st.hops);i++){const y0=g.y(st.from+i*d),y1=g.y(st.from+(i+1)*d);ctx.beginPath();ctx.moveTo(xh,y0);ctx.quadraticCurveTo(xh-12,(y0+y1)/2,xh,y1);ctx.stroke()}
   P.label(`${sg(st.hops)}°`,xh-18,(m=>Math.abs(m-zy)<26?zy+(m<zy?-26:26):m)((g.y(st.from)+g.y(st.t))/2),{pill:1,bg:A.alpha(C.am,.95),col:'#111',align:'right'})}
  // markers in sandbox
  if(A.step===4){[['A',st.a,C.vi],['B',st.b,C.gr]].forEach(([n,v,cl])=>{const y=g.y(v);P.ball(x+tw*.6+40,y,9,cl);ctx.fillStyle='#fff';ctx.font='700 10px system-ui';ctx.textAlign='center';ctx.fillText(n,x+tw*.6+40,y+3.5)});
   const y0=g.y(st.a),y1=g.y(st.b);if(st.a!==st.b){const xa=x+tw*.6+62;ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(xa,y0);ctx.lineTo(xa,y1);ctx.stroke();ctx.beginPath();ctx.moveTo(xa-6,y1+(y1<y0?8:-8));ctx.lineTo(xa,y1);ctx.lineTo(xa+6,y1+(y1<y0?8:-8));ctx.stroke();P.label(`change ${sg(st.b-st.a)}°`,xa+10,(y0+y1)/2,{align:'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'})}}
  // readout
  const rx=A.narrow?W*.72:W*.7;P.label(fmt(st.t),rx,H*.14,{font:`800 ${A.narrow?28:36}px system-ui`,bg:A.alpha(st.t<0?C.cy:C.rd,.9),col:'#fff'});
  if(!A.isDone&&A.step>=1&&A.step<=3&&!st.drag){const u=(performance.now()%1600)/1600;ctx.globalAlpha=.5+.5*Math.sin(u*6.28);P.label('👆 drag the red line ↕',x+tw*2.4,g.y(st.t),{align:'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}};
 const draw=(A,dt)=>{const{ctx,W,H}=A;if(A.step===0){scene(A,dt,st.t);if(st.drop){st.k=(st.k||0)+dt;const nt=Math.round(3-Math.min(5,st.k*2.2));if(nt!==st.t){st.t=nt;A.sound.tick();upd()}if(nt===-2&&!A.isDone)A.done('Night fell: 3 °C dropped 5 degrees to −2 °C. Below zero is negative.'+A.reveal(0))}
   A.paint.label(fmt(st.t),W*.3,H*.3,{font:`800 ${A.narrow?26:34}px system-ui`,bg:A.alpha(st.t<0?A.col.cy:A.col.rd,.9),col:'#fff'});if(!st.drop&&A.pred[0]!=null)A.paint.label('👆 tap the sky to make the sun set',W/2,H*.08,{pill:1,bg:A.alpha(A.col.am,.95),col:'#111'});return}
  ctx.save();ctx.globalAlpha=.35;scene(A,dt,st.t);ctx.restore();thermo(A)};
 const steps=[
  {h:'Sunset at the mountain hut',p:'It is 3 °C as the sun sets. Overnight the temperature falls by 5 degrees.',predict:{q:'What will the thermometer read in the morning?',opts:['2 °C','−2 °C','8 °C'],ans:1},task:'Tap the sky to make the sun set',show:()=>{st.drop=1},go:()=>{st.t=3;st.drop=0;st.k=0}},
  {h:'Below zero',p:'Zero is not the bottom. Each step below zero is one more degree colder.',task:'Drag the liquid down from 3 °C to −2 °C',show:()=>set(-2),go:()=>{st.t=st.from=3;st.hops=0;chk=goal(-2,'5 hops down: 3 → 2 → 1 → 0 → −1 → −2. Counting to zero first, then on, is the trick.')}},
  {h:'Which is colder?',p:'In Moscow it is −7 °C. In London it is −2 °C.',predict:{q:'Which number is bigger: −7 or −2?',opts:['−7, because 7 > 2','−2, it is warmer','They are equal'],ans:1},task:'Drag to −7 °C and see where it sits',show:()=>set(-7),go:()=>{st.t=st.from=-2;st.hops=0;chk=goal(-7,'−7 is lower down, so it is colder and smaller: −7 < −2.')}},
  {h:'Warming up across zero',p:'From −4 °C at dawn to 3 °C at noon.',predict:{q:'How many degrees did it warm up?',opts:['1','7','−1'],ans:1},task:'Drag from −4 °C up to 3 °C and count the hops',show:()=>set(3),go:()=>{st.t=st.from=-4;st.hops=0;chk=goal(3,'+7: four hops up to zero, then three more. 3 − (−4) = 7.')}},
  {h:'Sandbox',p:'Drag marker A (start) and B (end). Is the change positive or negative? Try making a change of −10 that crosses zero.',go:()=>{st.a=-6;st.b=4;st.t=4;chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const mvN=p=>{const g=geo(A);if(st.drag==='t')set(g.v(p.y));else if(st.drag){const v=Math.max(MIN,Math.min(MAX,g.v(p.y)));if(v!==st[st.drag]){st[st.drag]=v;st.t=v;A.sound.tick();upd()}}};
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);A.every(()=>A.step===0||st.t<0||!A.isDone&&A.step>=1&&A.step<=3);
   A.gest({down:p=>{if(A.step===0){if(A.pred[0]!=null&&!st.drop){st.drop=1;A.sound.whoosh()}return false}if(A.step===5&&st.won)return false;const g=geo(A);if(A.step===4){const v=g.v(p.y);st.drag=Math.abs(v-st.a)<=Math.abs(v-st.b)?'a':'b';st[st.drag]=Math.max(MIN,Math.min(MAX,v));A.sound.tick();upd();return true}st.drag='t';set(g.v(p.y));return true},
    move:p=>mvN(p),
    _x:0,mv0:p=>{const g=geo(A);if(st.drag==='t')set(g.v(p.y));else if(st.drag){const v=Math.max(MIN,Math.min(MAX,g.v(p.y)));if(v!==st[st.drag]){st[st.drag]=v;st.t=v;A.sound.tick();upd()}}},
    up:p=>{if(p&&st.drag)mvN(p);const was=st.drag;st.drag=null;A.redraw();if(A.step===5&&was==='t')judge()}})}});
 const Q=[[3,-5],[-2,-6],[-8,5],[4,-9],[-6,10],[-1,-4],[5,-12],[-10,7]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[a,d]=Q[qi];st.c={a,d,ans:a+d};st.won=false;st.t=st.from=a;st.hops=0;chk=()=>{};
  chal.innerHTML=`<p><b>It is ${fmt(a)}. The temperature ${d<0?'falls':'rises'} by ${Math.abs(d)} degrees.</b> Drag the thermometer to the new temperature, then let go.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-m="1" aria-label="one degree warmer">▲ warmer</button> <button type="button" class="lbtn sm ghost" data-m="-1" aria-label="one degree colder">▼ colder</button> <button type="button" class="lbtn sm" data-ok>Check</button></span>`;
  chal.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(!st.won)set(st.t+ +b.dataset.m)});chal.querySelector('[data-ok]').onclick=judge;upd()};
 const judge=()=>{const q=st.c,fb=chal.querySelector('.fl-fb'),v=st.t;if(!q||st.won)return;
  if(v===q.ans){st.won=true;fb.innerHTML=`✓ ${fmt(q.a)} ${q.d<0?'−':'+'} ${Math.abs(q.d)} = ${fmt(q.ans)}.${q.a*q.ans<0?' You crossed zero: count to zero, then on.':''} <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=v===q.a-q.d?`That went the wrong way. ${q.d<0?'Falling':'Rising'} means ${q.d<0?'down':'up'} the thermometer.`:v===-q.ans&&q.ans!==0?`Right size, wrong side of zero: ${fmt(v)} is ${v>0?'above':'below'} freezing. Count the hops across zero again.`:Math.abs(v-q.ans)===1?'One hop out. Count the hops, not the marks: the starting mark is hop 0.':`Not quite. You moved ${sg(v-q.a)} degrees; it should be ${sg(q.d)}.`};
 A.start()})})();
