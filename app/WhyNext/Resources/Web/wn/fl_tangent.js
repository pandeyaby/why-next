/* Flagship 33 – instantaneous speed from a curved distance–time graph. A ruler pivots on a point P on the curve. The
   learner drags P along the curve (or uses Earlier / Later) and drags the ruler's handle to turn it (or Steeper /
   Shallower). A ruler that is not a tangent cuts the curve a second time, and that crossing is marked in red, so the
   learner turns it until the crossing closes in on P and the ruler only touches. A gradient triangle hangs off the
   ruler: drag its corner to change the run and see rise ÷ run stay the same. A dashed chord from the origin shows the
   average speed since the start, so the learner sees it differ from the speed at P. Curves: a runner speeding up, a car
   braking to a stop (the tangent sits above the curve and ends flat), and a cyclist. Predictions target "speed = d ÷ t",
   "a bigger triangle gives a bigger speed", where the tangent sits, and "flat means fast". Challenge: find the speed
   at a given time and type it; feedback names the slip (average since the start, the height of the graph, a one-second
   chord, the rise without dividing by the run, or a ruler that is too steep or too shallow). */
(()=>{const f1=v=>(Math.round(v*10)/10).toFixed(1).replace('-','−'),g1=v=>String(Math.round(v*100)/100).replace('-','−');
 const CURVES={
  runner:{who:'the runner',name:'a runner speeding up',T:6,Y:40,dy:5,d:t=>t*t,v:t=>2*t},
  car:{who:'the car',name:'a car braking to a stop',T:6,Y:60,dy:10,d:t=>t<5?20*t-2*t*t:50,v:t=>t<5?20-4*t:0},
  cyclist:{who:'the cyclist',name:'a cyclist pulling away',T:4,Y:20,dy:2,d:t=>.25*t*t*t,v:t=>.75*t*t}};
 const FIT=.3;
VIS.reg('flagtan',c=>{let A,chal,sand,read,btns;
 const st={k:'runner',t:3,m:2,run:2,tri:false,chord:false,auto:false,lockP:false,grab:null,run_id:0,glow:0,chk:()=>{},won:false};
 const cur=()=>CURVES[st.k],d0=()=>cur().d(st.t),v0=()=>cur().v(st.t),fits=()=>Math.abs(st.m-v0())<=FIT;
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 // the ruler cuts the curve again where d(t) − line(t) changes sign away from P; return the nearest such t
 function crossing(){const C=cur(),L=t=>d0()+st.m*(t-st.t),n=240;let best=null,prev=null;
  for(let i=0;i<=n;i++){const t=C.T*i/n,g=C.d(t)-L(t);if(Math.abs(t-st.t)<.15){prev=null;continue}
   if(prev&&Math.sign(prev.g)!==Math.sign(g)&&g!==0){const tc=(prev.t+t)/2;if(best==null||Math.abs(tc-st.t)<Math.abs(best-st.t))best=tc}prev={t,g}}return best}
 // a line through P that is not a tangent crosses the curve at P: the curve is above it on one side and below on the other
 function throughP(){const C=cur(),L=t=>d0()+st.m*(t-st.t),h=.25,a=st.t-h,b=st.t+h;if(a<0||b>C.T)return false;
  return Math.sign(C.d(a)-L(a))*Math.sign(C.d(b)-L(b))<0}
 function fitText(){if(fits())return'the ruler touches the curve only at P: it is a tangent';const x=crossing(),parts=[];
  if(throughP())parts.push('it cuts through the curve at P instead of just touching it');if(x!=null)parts.push(`it cuts the curve again at t = ${f1(x)} s`);
  return 'not a tangent yet: '+(parts.join(', and ')||'it misses the curve’s direction at P')}
 function status(){let t=`P: t = ${g1(st.t)} s, d = ${g1(d0())} m. Ruler gradient ${f1(st.m)} m/s; ${fitText()}.`;
  if(st.tri)t+=` Triangle: rise ${g1(st.m*st.run)} m ÷ run ${g1(st.run)} s = ${f1(st.m)} m/s.`;
  if(st.chord&&st.t>0)t+=` Average speed since the start: ${g1(d0())} ÷ ${g1(st.t)} = ${f1(d0()/st.t)} m/s.`;tell(t)}
 function describe(){return `Distance–time graph for ${cur().name}. Point P at t = ${g1(st.t)} s, d = ${g1(d0())} m. Ruler through P with gradient ${f1(st.m)} m/s: ${fitText()}.`+
  (st.tri?` Gradient triangle with run ${g1(st.run)} s and rise ${g1(st.m*st.run)} m.`:'')+(st.chord&&st.t>0?` Dashed chord from the origin: average ${f1(d0()/st.t)} m/s.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(btns)btns.querySelectorAll('[data-p]').forEach(b=>b.disabled=st.lockP);A.redraw()}
 function setT(t,quiet){const C=cur();st.t=Math.max(.5,Math.min(C.T-.5,Math.round(t*2)/2));if(st.auto)st.m=v0();if(!quiet)status();sync();st.chk()}
 function setM(m,quiet){st.m=Math.max(-10,Math.min(30,Math.round(m*10)/10));if(!quiet)status();sync();st.chk()}
 function setRun(r){st.run=Math.max(.5,Math.min(4,Math.round(r*2)/2));status();sync();st.chk()}
 function setCurve(k,t,m){st.k=k;st.t=t;st.m=m;st.run=Math.min(2,CURVES[k].T-t);if(st.run<.5)st.run=.5;sync()}
 // ---------- layout and drawing ----------
 function geo(A){const nar=A.narrow,l=nar?40:52,r=A.W-(nar?14:20),top=nar?92:74,b=A.H-(nar?40:38),C=cur();
  return{l,r,top,b,X:t=>l+t*(r-l)/C.T,Y:d=>b-d*(b-top)/C.Y,T:x=>(x-l)*C.T/(r-l),D:y=>(b-y)*C.Y/(b-top)}}
 function draw(A){const{ctx,W,H,col:Cl,paint:P}=A,g=geo(A),C=cur();
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(Cl.pn,Cl.cy,.05)],[1,Cl.pn]]);ctx.fillRect(0,0,W,H);
  // header: what we are looking at and the live gradient
  ctx.textAlign='left';ctx.textBaseline='alphabetic';const fh=A.narrow?15:18;ctx.font=`700 ${fh}px system-ui`;ctx.fillStyle=Cl.tx;ctx.fillText(C.name[0].toUpperCase()+C.name.slice(1),14,fh+10);
  const ok=fits();ctx.font=`600 ${A.narrow?13:15}px system-ui`;ctx.fillStyle=ok?Cl.gr:A.alpha(Cl.tx,.85);
  const line2=`ruler gradient ${f1(st.m)} m/s`+(ok?'  ✓ tangent':'');if(A.narrow)ctx.fillText(line2,14,fh+32);else{ctx.textAlign='right';ctx.fillText(line2,W-16,fh+10);ctx.textAlign='left'}
  // grid and axes
  ctx.font='600 11px system-ui';ctx.lineWidth=1;for(let t=0;t<=C.T;t++){ctx.strokeStyle=A.alpha(Cl.tx,t?.08:.5);ctx.beginPath();ctx.moveTo(g.X(t),g.top);ctx.lineTo(g.X(t),g.b);ctx.stroke();ctx.fillStyle=Cl.mu;ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText(String(t),g.X(t),g.b+5)}
  for(let d=0;d<=C.Y;d+=C.dy){ctx.strokeStyle=A.alpha(Cl.tx,d?.08:.5);ctx.beginPath();ctx.moveTo(g.l,g.Y(d));ctx.lineTo(g.r,g.Y(d));ctx.stroke();ctx.fillStyle=Cl.mu;ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText(String(d),g.l-5,g.Y(d))}
  ctx.fillStyle=Cl.mu;ctx.textAlign='right';ctx.textBaseline='top';ctx.fillText('time (s)',g.r,g.b+18);ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillText('distance (m)',g.l+4,g.top-4);
  ctx.save();ctx.beginPath();ctx.rect(g.l,g.top,g.r-g.l,g.b-g.top);ctx.clip();
  // the curve
  ctx.strokeStyle=Cl.cy;ctx.lineWidth=3.5;ctx.beginPath();for(let i=0;i<=200;i++){const t=C.T*i/200;const x=g.X(t),y=g.Y(C.d(t));i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();
  // average-speed chord from the origin
  if(st.chord){ctx.strokeStyle=Cl.vi;ctx.setLineDash([7,5]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(g.X(0),g.Y(0));ctx.lineTo(g.X(st.t),g.Y(d0()));ctx.stroke();ctx.setLineDash([])}
  // the ruler: a long line through P
  const px=g.X(st.t),py=g.Y(d0()),L=t=>d0()+st.m*(t-st.t);ctx.strokeStyle=A.alpha(ok?Cl.gr:Cl.am,.95);ctx.lineWidth=ok?4:3;ctx.beginPath();ctx.moveTo(g.X(-1),g.Y(L(-1)));ctx.lineTo(g.X(C.T+1),g.Y(L(C.T+1)));ctx.stroke();
  if(st.glow>0){ctx.strokeStyle=A.alpha(Cl.gr,st.glow*.5);ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(g.X(-1),g.Y(L(-1)));ctx.lineTo(g.X(C.T+1),g.Y(L(C.T+1)));ctx.stroke()}
  // gradient triangle on the ruler
  let tri=null;if(st.tri){const t2=st.t+st.run,x2=g.X(t2),y2=g.Y(L(t2));ctx.fillStyle=A.alpha(Cl.or,.16);ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x2,py);ctx.lineTo(x2,y2);ctx.closePath();ctx.fill();
   ctx.strokeStyle=Cl.or;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x2,py);ctx.lineTo(x2,y2);ctx.stroke();tri={x:x2,y:py,x2,y2}}
  // where a non-tangent ruler cuts the curve again
  const cx=ok?null:crossing();if(cx!=null){const x=g.X(cx),y=g.Y(C.d(cx));ctx.strokeStyle=Cl.rd;ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,8,0,7);ctx.stroke()}
  if(!ok&&throughP()){ctx.strokeStyle=Cl.rd;ctx.setLineDash([4,3]);ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(px,py,15,0,7);ctx.stroke();ctx.setLineDash([])}
  ctx.restore();
  if(tri){P.label(`run ${g1(st.run)} s`,(px+tri.x)/2,py+(st.m>=0?14:-14),{font:'600 12px system-ui',bg:A.alpha(Cl.pn,.9),col:Cl.tx});
   P.label(`rise ${g1(st.m*st.run)} m`,Math.min(W-50,tri.x+8),(py+tri.y2)/2,{align:'left',font:'600 12px system-ui',bg:A.alpha(Cl.pn,.9),col:Cl.tx});P.ball(tri.x,py,8,Cl.or);st.tc={x:tri.x,y:py}}else st.tc=null;
  if(cx!=null){const x=g.X(cx),y=g.Y(C.d(cx));if(y>g.top&&y<g.b)P.label('cuts again',Math.max(g.l+40,Math.min(g.r-40,x)),y-18,{font:'700 11px system-ui',bg:A.alpha(Cl.rd,.92),col:'#fff'})}
  // ruler handle: a point on the ruler about 80 px from P, on whichever side stays in the plot
  const ux=1/Math.hypot(1,(g.Y(L(st.t+1))-py)/(g.X(st.t+1)-px)),uy=ux*(g.Y(L(st.t+1))-py)/(g.X(st.t+1)-px);const inb=(x,y)=>x>g.l+8&&x<g.r-8&&y>g.top+8&&y<g.b-8,first=st.tri||st.t>C.T*.6?-1:1;let hx,hy,cands=[[first,first>0&&tri?'far':80],[-first,-first>0&&tri?'far':80],[1,80],[-1,80],[-1,50],[1,50]];
  for(const[sg,dd]of cands){const dist=dd==='far'?Math.max(80,Math.hypot(tri.x2-px,tri.y2-py)+36):dd;const x=px+sg*dist*ux,y=py+sg*dist*uy;if(inb(x,y)){hx=x;hy=y;break}}
  if(hx==null){hx=px-50*ux;hy=py-50*uy}st.hh={x:hx,y:hy};P.ball(hx,hy,9,Cl.am);ctx.fillStyle=A.alpha(Cl.am,.25);ctx.beginPath();ctx.arc(hx,hy,16,0,7);ctx.fill();
  // P itself
  P.ball(px,py,9,Cl.pk);st.ph={x:px,y:py};P.label('P',px-14,py-16,{font:'700 12px system-ui',bg:A.alpha(Cl.pk,.95),col:'#fff'});
  if(st.chord&&st.t>0)P.label(`dashed line: average ${f1(d0()/st.t)} m/s`,g.l+8,g.top+14,{align:'left',font:'600 12px system-ui',bg:A.alpha(Cl.vi,.92),col:'#fff'})}
 // ---------- gestures: drag P along the curve, the ruler handle to turn it, the triangle corner to change the run ----------
 const near=(p,h,r=26)=>h&&Math.hypot(p.x-h.x,p.y-h.y)<r;
 function grabAt(p){if(near(p,st.hh))return'm';if(near(p,st.tc))return'run';if(near(p,st.ph)&&!st.lockP)return'p';
  const g=geo(A),t=g.T(p.x),L=d0()+st.m*(t-st.t);if(Math.abs(g.Y(L)-p.y)<18&&Math.abs(t-st.t)>.3)return'm';return null}
 function dragTo(p){const g=geo(A),t=g.T(p.x),d=g.D(p.y);if(st.grab==='p')setT(t,true);else if(st.grab==='run')setRun(t-st.t);
  else if(st.grab==='m'&&Math.abs(t-st.t)>.08)setM((d-d0())/(t-st.t),true)}
 // ---------- Show me helpers ----------
 function walkP(to,fin){const id=++st.run_id;const next=()=>{if(id!==st.run_id)return;if(Math.abs(st.t-to)<1e-9){fin&&fin();return}setT(st.t+.5*Math.sign(to-st.t));A.sound.tick();A.tween({k:0},{k:1},160,'io',next)};next()}
 function turnTo(fin){const id=++st.run_id,to=v0();A.tween(st,{m:to},800,'io',()=>{if(id!==st.run_id)return;setM(to);st.glow=1;A.tween(st,{glow:0},900,'out');fin&&fin()})}
 const goal=(test,msg,i)=>{st.chk=()=>{if(!A.extra.querySelector('.fl-task')||st.won)return;if(test()){st.won=true;A.done(msg+A.reveal(i))}}};
 const setup=(k,t,m,o={})=>{st.run_id++;st.won=false;st.chk=()=>{};Object.assign(st,{tri:false,chord:false,auto:false,lockP:false},o);setCurve(k,t,m);status()};
 const steps=[
  {h:'Speed is steepness',p:'On a distance–time graph the gradient is the speed. On a curve the gradient keeps changing, so the speed at one moment is the gradient of the tangent there: a straight line that just touches the curve at that point.',
   predict:{q:'At t = 3 s the runner has gone 9 m. How fast is she going at that moment?',opts:['3 m/s, because 9 ÷ 3 = 3','6 m/s','9 m/s'],ans:1},
   task:'Turn the ruler until it touches the curve at P and does not cut it anywhere else',show:()=>turnTo(),
   go:()=>{setup('runner',3,1.5,{lockP:true});goal(fits,'The tangent at P climbs 6 m every second: 6 m/s. 9 ÷ 3 = 3 m/s is her average speed since the start, and she was slower earlier.',0)}},
  {h:'Average is not instant',p:'The dashed line from the origin to P shows the average speed since the start: distance ÷ time. When the runner is speeding up, the tangent at P is steeper than that line.',
   predict:{q:'At t = 5 s, how does her speed at that moment compare with her average since the start?',opts:['Bigger: she is speeding up','The same','Smaller'],ans:0},
   task:'Move P to t = 5 s, then turn the ruler into the tangent there',show:()=>walkP(5,()=>turnTo()),
   go:()=>{setup('runner',2,1,{chord:true});goal(()=>st.t===5&&fits(),'At 5 s the tangent gives 10 m/s, but 25 m ÷ 5 s = 5 m/s average. The two are different questions.',1)}},
  {h:'Measure it with a triangle',p:'To find a tangent’s gradient, draw a right-angled triangle on it and work out rise ÷ run, reading both from the axes with their units. Any size of triangle on the same line gives the same gradient.',
   predict:{q:'If you draw a bigger triangle on the same tangent, the gradient…',opts:['gets bigger','stays the same','gets smaller'],ans:1},
   task:'Drag the triangle’s corner to make the run at least 3 s',show:()=>{const id=++st.run_id;A.tween(st,{run:4},700,'io',()=>{if(id===st.run_id)setRun(4)})},
   go:()=>{setup('runner',2,4,{tri:true,lockP:true});st.run=1;status();goal(()=>st.run>=3,'Run 1 s, rise 4 m; run 4 s, rise 16 m. Both give 4 m/s. A big triangle is just easier to read accurately.',2)}},
  {h:'Slowing down',p:'This car brakes, so its graph bends the other way and gets flatter. Its tangents sit above the curve. The gradient still gives the speed at that moment.',
   predict:{q:'Where does a tangent sit on a curve that is getting flatter?',opts:['Below the curve','Above the curve','It must cut through it'],ans:1},
   task:'Make the ruler a tangent at t = 2 s',show:()=>turnTo(),
   go:()=>{setup('car',2,4,{lockP:true});goal(fits,'The tangent at 2 s rises 12 m per second: 12 m/s. It sits just above the curve, touching it only at P.',3)}},
  {h:'A flat tangent',p:'Now the ruler follows P and stays a tangent. Slide P along and watch the gradient fall as the car slows.',
   predict:{q:'When the distance–time graph is flat, the speed is…',opts:['zero','at its highest','equal to the distance'],ans:0},
   task:'Slide P to the moment the car stops',show:()=>walkP(5),
   go:()=>{setup('car',1,16,{auto:true});goal(()=>v0()===0,'From t = 5 s the tangent is flat: 0 m/s. The car has stopped 50 m from where it started braking, even though the graph is at its highest.',4)}},
  {h:'Sandbox',p:'Pick a graph. Drag P, turn the ruler, stretch the triangle, and compare the tangent with the dashed average line.',go:()=>{st.chk=()=>{};setup('cyclist',2,2,{tri:true,chord:true})}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   btns=E('div',{class:'fl-ctl',role:'group','aria-label':'Move P and the ruler'},box);
   const mk=(label,aria,f,p)=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},btns,label);if(p)b.dataset.p='1';b.onclick=f};
   mk('Earlier','Move P half a second earlier',()=>setT(st.t-.5),1);mk('Later','Move P half a second later',()=>setT(st.t+.5),1);
   mk('Shallower','Turn the ruler: gradient down by 0.5',()=>{st.auto=false;setM(st.m-.5)});mk('Steeper','Turn the ruler: gradient up by 0.5',()=>{st.auto=false;setM(st.m+.5)});
   mk('Run −','Make the triangle’s run half a second shorter',()=>{st.tri=true;setRun(st.run-.5)});mk('Run +','Make the triangle’s run half a second longer',()=>{st.tri=true;setRun(st.run+.5)});
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose a graph'},box);
   [['runner','Runner'],['car','Braking car'],['cyclist','Cyclist']].forEach(([k,l])=>{const b=E('button',{type:'button',class:'lbtn sm'},sand,l);b.onclick=()=>{setup(k,2,1,{tri:true,chord:true});tell(`${CURVES[k].name}: make the ruler a tangent at P.`)}});
   chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{st.grab=grabAt(p);if(!st.grab)return false;if(st.grab==='m')st.auto=false;st.run_id++;A.redraw();return true},move:p=>{if(st.grab){dragTo(p)}},
    up:()=>{if(!st.grab)return;st.grab=null;status();st.chk();A.redraw()}});
   sync()}});
 // ---------- challenge: type the speed at a given moment; a wrong value is matched to the slip that makes it ----------
 const CH=[['runner',4],['car',3],['cyclist',2],['runner',5],['car',4],['car',2]];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;const[k,t]=CH[qi];setup(k,t,1,{tri:true,lockP:true});status();
  chal.innerHTML=`<p><b>How fast is ${CURVES[k].who} going at t = ${t} s?</b> Make the ruler a tangent at P, read rise ÷ run, then type the speed.</p>`+
   `<div class="fl-ctl"><label>Speed <input type="number" step="0.1" inputmode="decimal" class="fl-in" style="width:6em"> m/s</label><button type="button" class="lbtn sm">Check</button></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge;chal.querySelector('.fl-in').onkeydown=e=>{if(e.key==='Enter')judge()};sync()}
 function judge(){const fb=chal.querySelector('.fl-fb'),raw=chal.querySelector('.fl-in').value.replace('−','-'),x=parseFloat(raw);if(st.won)return;
  if(!isFinite(x)){fb.textContent='Type a number of metres per second first.';return}
  const C=cur(),t=st.t,v=C.v(t),d=C.d(t),tol=Math.max(.4,.08*v),near=(a,b)=>Math.abs(a-b)<=Math.max(.15,.03*Math.abs(b));let m;
  if(Math.abs(x-v)<=tol){st.won=true;st.auto=false;setM(v);A.win();fb.innerHTML=`✓ About ${g1(v)} m/s: the tangent at t = ${t} s rises ${g1(v)} m for every second of run. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();
  if(near(x,d/t))m=`${g1(x)} m/s is ${g1(d)} m ÷ ${t} s: the average speed since the start. That is the gradient of a line from the origin, not of the tangent at P.`;
  else if(near(x,d))m=`${g1(x)} is how far it has gone, the height of the graph at P. Speed is how steep the graph is there, not how high.`;
  else if(near(x,C.d(t+1)-d))m=`${g1(x)} m/s is the gradient of a chord from ${t} s to ${t+1} s: the average over that second. A tangent touches at P only.`;
  else if(near(x,C.d(t)-C.d(t-1)))m=`${g1(x)} m/s is the chord from ${t-1} s to ${t} s: the average over the second before. Use the tangent at P itself.`;
  else if(st.run!==1&&near(x,st.m*st.run))m=`${g1(x)} is the rise of your triangle in metres. Divide it by the run, ${g1(st.run)} s, to get metres per second.`;
  else if(x<0)m=`The distance is not going down, so the speed cannot be negative here. Check how you read the rise.`;
  else m=`${g1(x)} m/s would be a ruler that is too ${x>v?'steep':'shallow'}. Turn the ruler until it stops cutting the curve, then read rise ÷ run from the triangle.`;
  fb.innerHTML=m+' <button type="button" class="linkish fl-hint">Show me</button>';fb.querySelector('.fl-hint').onclick=()=>{st.auto=false;turnTo(()=>{const id=st.run_id;const r=Math.min(2,C.T-t);A.tween(st,{run:r},500,'io',()=>{if(id!==st.run_id)return;setRun(r);st.won=true;fb.innerHTML=`The tangent at ${t} s has rise ${g1(r*v)} m over run ${g1(r)} s: ${g1(v)} m/s. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal})})}}
 A.start()})})();
