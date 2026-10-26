/* Flagship 14 – current and voltage. Hook: one cell, one bulb and an ammeter. The learner predicts whether less current comes
   out of a bulb than goes in (misconception: "the bulb uses up current"), then moves the ammeter to the other side and sees the
   same reading. Steps: current is charge per second (add a cell, charges flow twice as fast), voltage is energy per charge (each
   charge's glow drops across each bulb; two bulbs share the voltage), meters (a voltmeter put in the loop stops the current),
   a sandbox, and a challenge: build a circuit with a target voltmeter and ammeter reading, with feedback for each slip. */
(()=>{const CELL=1.5,RB=3,r2=v=>(Math.round(v*100)/100).toString();
VIS.reg('flagcirc',c=>{let A,ctl,chal,bSer,onScreen=true;
 // state: cells, bulbs, ammeter side (0 = before the bulbs, 1 = after), voltmeter target ('bat', 0..bulbs-1) and whether it is wrongly in the loop
 const st={n:1,b:1,amm:0,vm:0,vmSeries:false,phase:0,seen:{},q:null,won:false,ammSeen:new Set(),vmSeen:new Set()};
 const V=()=>CELL*st.n,I=()=>st.vmSeries?0:V()/(RB*st.b),Vb=()=>st.vmSeries?0:I()*RB;
 const vmRead=()=>st.vmSeries?V():st.vm==='bat'?V():Vb();
 /* The circuit as a closed path (canvas units) with the components placed along it. */
 function layout(A){const{W,H}=A,n=A.narrow,l=n?W*.12:W*.12,r=n?W*.88:W*.8,t=n?H*.3:H*.34,b=n?H*.82:H*.86;return{l,r,t,b,per:2*(r-l)+2*(b-t)}}
 function at(L,s){s=((s%L.per)+L.per)%L.per;const w=L.r-L.l,h=L.b-L.t;if(s<w)return[L.l+s,L.t];s-=w;if(s<h)return[L.r,L.t+s];s-=h;if(s<w)return[L.r-s,L.b];s-=w;return[L.l,L.b-s]}
 /* Energy a charge carries at path position s: full after the battery, minus one share after each bulb. */
 function energyAt(L,s){const w=L.r-L.l;let k=0;for(let i=0;i<st.b;i++){const bx=bulbX(L,i)-L.l;if(s>bx)k++}return 1-k/st.b}
 const bulbX=(L,i)=>L.l+(L.r-L.l)*(i+1)/(st.b+1);
 const ammPos=L=>st.amm?[L.r,(L.t+L.b)/2]:[L.l+(L.r-L.l)*.5/(st.b+1),L.t];
 const say=()=>{const s=st.vmSeries?`The voltmeter is wrongly in the loop: no current flows and the bulbs are off. It reads the battery's ${r2(V())} V.`:`${st.n} cell${st.n>1?'s':''} (${r2(V())} V) and ${st.b} bulb${st.b>1?'s':''} in a loop. Ammeter ${st.amm?'after':'before'} the bulbs reads ${r2(I())} A. Voltmeter across ${st.vm==='bat'?'the battery':'bulb '+(st.vm+1)} reads ${r2(vmRead())} V.`;c.say(s);A&&A.cv.setAttribute('aria-label','A series circuit with a battery, bulbs, an ammeter and a voltmeter. '+s)};
 function draw(A,dt){const{ctx,W,H,paint:P,col:C}=A,L=layout(A);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.08)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // wires
  ctx.lineCap='round';ctx.strokeStyle=A.mix('#b45309','#fbbf24',.4);ctx.lineWidth=5;ctx.strokeRect(L.l,L.t,L.r-L.l,L.b-L.t);
  // flowing charges: spacing fixed, speed proportional to current; brightness = energy carried
  st.phase=(st.phase+(A.reduced()?0:I()*90*dt))%38;const N=Math.floor(L.per/38);
  for(let i=0;i<N;i++){const s=i*38+st.phase,[x,y]=at(L,s),ee=st.vmSeries?0:(s%L.per)<(L.r-L.l)?energyAt(L,s%L.per):0;ctx.fillStyle=A.mix('#64748b',C.am,ee);P.glow(A.alpha(C.am,.8*ee),8*ee);ctx.beginPath();ctx.arc(x,y,4.5,0,7);ctx.fill();P.noShadow()}
  // battery on the left side: cells as long (+) and short (−) plates
  const by=(L.t+L.b)/2,ch=st.n*18;ctx.fillStyle=C.pn;ctx.fillRect(L.l-16,by-ch/2-8,32,ch+16);for(let i=0;i<st.n;i++){const y=by-ch/2+i*18+4;ctx.strokeStyle=C.tx;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(L.l-16,y);ctx.lineTo(L.l+16,y);ctx.stroke();ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(L.l-8,y+8);ctx.lineTo(L.l+8,y+8);ctx.stroke()}
  P.label(`${r2(V())} V battery`,L.l+22,by+ch/2+22,{align:'left',font:'700 12px system-ui',bg:A.alpha('#0b1220',.75)});P.label('+',L.l-24,by-ch/2-2,{pill:false,col:C.rd,font:'800 14px system-ui'});
  // bulbs along the top; brightness follows power per bulb
  const pw=I()*Vb(),pmax=CELL*3*CELL*3/RB;for(let i=0;i<st.b;i++){const x=bulbX(L,i),y=L.t,k=Math.min(1,Math.sqrt(pw/(CELL*CELL/RB))*.75);
   if(k>.01){ctx.fillStyle=P.rad(x,y-14,2,60*k+10,[[0,A.alpha('#fff7c2',.9*k)],[1,A.alpha('#fde68a',0)]]);ctx.beginPath();ctx.arc(x,y-14,60*k+10,0,7);ctx.fill()}
   ctx.fillStyle=k>.01?A.mix('#fef3c7','#fde047',1-k):A.alpha(C.tx,.15);ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y-14,13,0,7);ctx.fill();ctx.stroke();
   ctx.beginPath();ctx.moveTo(x-9,y-23);ctx.lineTo(x+9,y-5);ctx.moveTo(x+9,y-23);ctx.lineTo(x-9,y-5);ctx.stroke();ctx.fillStyle=C.mu;ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(`bulb ${i+1}`,x,y+18)}
  // ammeter: in the loop
  const[ax,ay]=ammPos(L);ctx.fillStyle=C.pn;ctx.strokeStyle=C.cy;ctx.lineWidth=3;P.glow(A.alpha(C.cy,.7),12);ctx.beginPath();ctx.arc(ax,ay,17,0,7);ctx.fill();ctx.stroke();P.noShadow();ctx.fillStyle=C.cy;ctx.font='800 15px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('A',ax,ay+1);ctx.textBaseline='alphabetic';
  P.label(`${r2(I())} A`,ax+(st.amm?-48:0),ay+(st.amm?0:-36),{font:'800 13px system-ui',bg:A.alpha(C.cy,.95),col:'#04121a'});
  // voltmeter: across a component (parallel) or wrongly in the loop
  // voltmeter sits above a bulb (leads to both sides of it) or just inside the loop beside the battery
  let mx,my;ctx.strokeStyle=A.alpha(C.vi,.9);ctx.lineWidth=2;
  if(st.vmSeries){mx=(L.l+L.r)/2;my=L.b;P.label('voltmeter in the loop: no current!',mx,L.b-30,{font:'700 12px system-ui',bg:A.alpha(C.rd,.9)})}
  else if(st.vm==='bat'){mx=L.l+62;my=by;ctx.beginPath();ctx.moveTo(L.l+16,by-ch/2-4);ctx.lineTo(mx,by-ch/2-4);ctx.lineTo(mx,my-17);ctx.moveTo(L.l+16,by+ch/2+4);ctx.lineTo(mx,by+ch/2+4);ctx.lineTo(mx,my+17);ctx.stroke()}
  else{const vx=bulbX(L,st.vm),sp=26;mx=vx;my=L.t-(A.narrow?62:66);ctx.beginPath();ctx.moveTo(vx-sp,L.t);ctx.lineTo(vx-sp,my);ctx.lineTo(vx-17,my);ctx.moveTo(vx+sp,L.t);ctx.lineTo(vx+sp,my);ctx.lineTo(vx+17,my);ctx.stroke();[vx-sp,vx+sp].forEach(x=>{ctx.fillStyle=C.vi;ctx.beginPath();ctx.arc(x,L.t,4,0,7);ctx.fill()})}
  ctx.fillStyle=C.pn;ctx.strokeStyle=C.vi;ctx.lineWidth=3;P.glow(A.alpha(C.vi,.7),12);ctx.beginPath();ctx.arc(mx,my,17,0,7);ctx.fill();ctx.stroke();P.noShadow();ctx.fillStyle=C.vi;ctx.font='800 15px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('V',mx,my+1);ctx.textBaseline='alphabetic';st.vmAt=[mx,my];
  P.label(`${r2(vmRead())} V`,mx+44,my,{font:'800 13px system-ui',bg:A.alpha(C.vi,.95)});
  if(A.step===5&&st.q&&!st.won)P.label(`target: ${r2(st.q.v)} V battery, ${r2(st.q.i)} A`,W/2,H-12,{font:'700 12px system-ui',bg:A.alpha(C.am,.95),col:'#111'});
  return!A.reduced()&&I()>0}
 // ---------- controls ----------
 const btn=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab||t},ctl,t);b.onclick=()=>{f();A.sound.tick();sync();chk()};return b};
 const setN=n=>{st.n=Math.max(1,Math.min(3,n))},setB=b=>{st.b=Math.max(1,Math.min(3,b));if(st.vm!=='bat'&&st.vm>=st.b)st.vm=0};
 function moveAmm(){st.amm=st.amm?0:1;st.ammSeen.add(st.amm)}
 function cycleVm(){const opts=['bat',...Array.from({length:st.b},(_,i)=>i)];st.vm=opts[(opts.indexOf(st.vm)+1)%opts.length];st.vmSeries=false;st.vmSeen.add('ok')}
 function sync(){say();A.redraw()}
 let chk=()=>{};
 const steps=[
  {h:'Does a bulb use up current?',p:'One cell, one bulb. The ammeter (A) counts how much charge flows past it each second.',predict:{q:'Compared with the current going into the bulb, the current coming out is…',opts:['less: the bulb uses some up','the same','more'],ans:1},task:'Tap the ammeter (or “Move ammeter”) to put it on the other side of the bulb',show:()=>{moveAmm();sync();chk()},
   go:()=>{Object.assign(st,{n:1,b:1,amm:0,vm:0,vmSeries:false});st.ammSeen=new Set([0]);chk=()=>{if(st.ammSeen.size>1)A.done(`${r2(I())} A on both sides. Charge is not used up: every charge that goes in comes out. What the bulb takes is energy.`+A.reveal(0))}}},
  {h:'Current = charge per second',p:'Current is how fast charge flows round, measured in amps (A). Watch the dots: each is a little packet of charge.',predict:{q:'Add a second cell. The current…',opts:['halves','stays the same','doubles'],ans:2},task:'Add a second cell',show:()=>{setN(2);sync();chk()},
   go:()=>{Object.assign(st,{n:1,b:1,vm:0,vmSeries:false});chk=()=>{if(st.n===2&&st.b===1)A.done(`${r2(I())} A: twice the push, twice the flow. The dots now move twice as fast.`+A.reveal(1))}}},
  {h:'Voltage = energy per charge',p:'The voltmeter (V) measures how much energy each charge gives up across a part, in volts. The dots glow with the energy they carry.',predict:{q:'Add a second bulb. Each bulb now gets…',opts:['the same voltage as before','half the voltage, so both are dimmer','double the voltage'],ans:1},task:'Add a second bulb, then tap the voltmeter to check bulb 1 and bulb 2',show:()=>{setB(2);st.vm=0;st.vmSeen=new Set(['b0']);st.vm=1;st.vmSeen.add('b1');sync();chk()},
   go:()=>{Object.assign(st,{n:1,b:1,vm:0,vmSeries:false});st.vmSeen=new Set();chk=()=>{if(st.b===2&&st.vm!=='bat')st.vmSeen.add('b'+st.vm);if(st.b===2&&st.vmSeen.has('b0')&&st.vmSeen.has('b1'))A.done(`Each bulb gets ${r2(Vb())} V: the battery's ${r2(V())} V is shared. Each charge drops half its energy in each bulb, and the current falls to ${r2(I())} A, so both are dimmer.`+A.reveal(2))}}},
  {h:'Using the meters',p:'An ammeter goes in the loop (in series). A voltmeter goes across a part (in parallel), on its own side loop.',predict:{q:'What happens if you put the voltmeter in the loop instead?',opts:['It reads normally','The bulb goes out: a voltmeter hardly lets current through','The bulb gets brighter'],ans:1},task:'Put the voltmeter in the loop, then put it back across the bulb',show:()=>{st.vmSeries=true;sync();chk();st.vmSeries=false;st.vmSeen.add('ok');sync();chk()},
   go:()=>{Object.assign(st,{n:2,b:1,vm:0,vmSeries:false});st.vmSeen=new Set();let wrong=false;chk=()=>{if(st.vmSeries)wrong=true;if(wrong&&!st.vmSeries)A.done('In the loop the voltmeter blocked the current (0 A, bulb off) and just read the battery. Across the bulb it measures the energy each charge gives the bulb.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Change the cells and the bulbs, and move both meters. Which reading is the same everywhere in the loop? Which gets shared out?',go:()=>{Object.assign(st,{n:2,b:2,vm:0,vmSeries:false});chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;bSer.hidden=A.step!==3&&A.step!==4;sync()},
  init:A=>{ctl=c.el('div',{class:'fl-ctl'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   btn('Cells −',()=>setN(st.n-1),'Remove a cell');btn('Cells +',()=>setN(st.n+1),'Add a cell');btn('Bulbs −',()=>setB(st.b-1),'Remove a bulb');btn('Bulbs +',()=>setB(st.b+1),'Add a bulb');
   btn('Move ammeter',moveAmm,'Move the ammeter to the other side of the bulbs');btn('Move voltmeter',cycleVm,'Connect the voltmeter across the next part');
   bSer=btn('Voltmeter in the loop',()=>{st.vmSeries=!st.vmSeries},'Put the voltmeter in the loop (in series) or take it out');
   // keep animating only while charges flow and the lab is on screen (saves battery on phones)
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   A.every(()=>onScreen&&!A.reduced()&&I()>0);
   A.gest({down:p=>{const L=layout(A),[ax,ay]=ammPos(L);if(Math.hypot(p.x-ax,p.y-ay)<34){moveAmm();A.sound.tick();sync();chk();return false}
     const[vx,vy]=st.vmAt||[0,0];if(!st.vmSeries&&Math.hypot(p.x-vx,p.y-vy)<34){cycleVm();A.sound.tick();sync();chk()}return false}})}});
 // ---------- challenge ----------
 const Q=[[3,3],[2,1],[3,2],[1,2],[3,1],[2,2]];let qi=-1;
 function newChal(){qi=(qi+1)%Q.length;const[n,b]=Q[qi];st.q={n,b,v:CELL*n,i:CELL*n/(RB*b)};st.won=false;Object.assign(st,{n:1,b:1,vm:'bat',vmSeries:false});
  chal.innerHTML=`<p><b>Build a circuit where the voltmeter across the battery reads ${r2(st.q.v)} V and the ammeter reads ${r2(st.q.i)} A.</b> Each cell is 1.5 V; each bulb is the same. Then press Check.</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;
  chal.querySelector('.lbtn').onclick=judge;chk=()=>{};sync()}
 function judge(){const q=st.q,fb=chal.querySelector('.fl-fb');if(!q||st.won)return;
  if(st.n===q.n&&st.b===q.b&&!st.vmSeries){st.won=true;fb.innerHTML=`✓ ${st.n} cells give ${r2(V())} V; ${st.b} bulb${st.b>1?'s':''} share it, so ${r2(I())} A flows. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=st.vmSeries?'The voltmeter is in the loop, so no current can flow. Put it back across a part.'
   :st.n!==q.n?`The battery reads ${r2(V())} V. Each cell adds 1.5 V: you need ${r2(q.v)} ÷ 1.5 = ${q.n} cells.`
   :`Right voltage, but ${r2(I())} A. ${I()>q.i?'Too much current: more bulbs make it harder for charge to flow.':'Too little current: fewer bulbs let more charge flow.'}`;sync()}
 A.start()})})();
