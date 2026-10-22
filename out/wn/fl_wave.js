/* Flagship 15 – wave properties and types. Hook: a rope tied to a wall. The learner predicts whether the rope itself travels to
   the far end (misconception: "the rope / the air moves along with the wave"), then wiggles the end by hand and follows the
   red bead: it only goes up and down. Steps: amplitude and wavelength (a slower wiggle gives longer waves), measure a
   wavelength with a ruler and get v = f × λ, transverse vs longitudinal (a slinky, like sound), a sandbox, and a challenge:
   set the frequency for a target wavelength, with feedback for "f = λ", "f = v × λ" and too high / too low. */
(()=>{const LEN=4,V=2,TAU=Math.PI*2,r2=v=>(Math.round(v*100)/100).toString(),RATE=120,NBUF=RATE*3;
VIS.reg('flagwave',c=>{let A,ctl,chal,fIn,aIn,onScreen=true;
 // the hand's height history drives the whole rope: y(x, t) = hand(t − x / v); so any wiggle, by hand or by motor, travels at v
 const st={mode:'motor',kind:'trans',f:2,amp:.5,t:0,buf:new Float32Array(NBUF),head:0,filled:0,hand:0,drag:false,frozen:false,ru:[.5,1.5],rdrag:null,beadMax:0,q:null,won:false};
 const lambda=()=>V/st.f;
 /* Push the hand position for one tick of the history buffer. */
 function sample(y){st.buf[st.head]=y;st.head=(st.head+1)%NBUF;st.filled=Math.min(NBUF,st.filled+1)}
 /* Displacement at distance x along the rope, from the hand's history. */
 function disp(x){const back=Math.round(x/V*RATE);if(back>=st.filled)return 0;return st.buf[(st.head-1-back+NBUF*2)%NBUF]}
 function reset(){st.buf.fill(0);st.head=0;st.filled=0;st.t=0;st.beadMax=0}
 /* Pre-fill the buffer with a steady motor wave so a frozen or reduced-motion picture shows a full wave at once. */
 function settle(){reset();for(let i=0;i<NBUF;i++){st.t+=1/RATE;sample(st.amp*Math.sin(TAU*st.f*st.t))}}
 let acc=0;function advance(dt){acc+=dt;while(acc>=1/RATE){acc-=1/RATE;st.t+=1/RATE;sample(st.mode==='motor'?st.amp*Math.sin(TAU*st.f*st.t):st.hand)}const b=Math.abs(disp(BEAD));st.beadMax=Math.max(st.beadMax,b)}
 const BEAD=2.5;
 const geo=A=>{const{W,H}=A,l=A.narrow?46:70,r=14,mid=H*(A.narrow?.42:.45),sx=(W-l-r)/LEN,sy=Math.min(H*.32,110);return{l,r,mid,X:x=>l+x*sx,x:px=>(px-l)/sx,Y:y=>mid-y*sy,y:py=>(mid-py)/sy,sx,sy}};
 const say=()=>{const s=st.mode==='hand'?'You are moving the end of the rope by hand.':`Motor at ${r2(st.f)} Hz, amplitude ${r2(st.amp)} m, so the wavelength is ${r2(V)} ÷ ${r2(st.f)} = ${r2(lambda())} m.`;c.say(`${st.kind==='trans'?'Transverse wave on a rope':'Longitudinal wave on a slinky'}, speed ${V} m/s. ${s}`);A&&A.cv.setAttribute('aria-label',(st.kind==='trans'?'A rope with a wave moving along it. ':'A slinky with squashed and stretched coils moving along it. ')+s)};
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.1)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // metre scale along the bottom
  ctx.font='11px system-ui';ctx.textAlign='center';for(let x=0;x<=LEN+1e-9;x+=.5){ctx.strokeStyle=A.alpha(C.tx,x%1?.06:.14);ctx.beginPath();ctx.moveTo(G.X(x),G.mid-G.sy*1.15);ctx.lineTo(G.X(x),G.mid+G.sy*1.15);ctx.stroke();if(x%1===0){ctx.fillStyle=C.mu;ctx.fillText(x+' m',G.X(x),G.mid+G.sy*1.15+14)}}
  ctx.strokeStyle=A.alpha(C.tx,.2);ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(G.X(0),G.mid);ctx.lineTo(G.X(LEN),G.mid);ctx.stroke();ctx.setLineDash([]);
  if(st.kind==='trans'){P.glow(A.alpha(C.cy,.6),10);ctx.strokeStyle=C.cy;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();for(let i=0;i<=160;i++){const x=LEN*i/160,y=disp(x);i?ctx.lineTo(G.X(x),G.Y(y)):ctx.moveTo(G.X(x),G.Y(y))}ctx.stroke();P.noShadow();
   for(let x=.25;x<LEN;x+=.25)P.ball(G.X(x),G.Y(disp(x)),3.2,A.mix(C.cy,'#fff',.3));
   P.glow(A.alpha(C.rd,.9),12);P.ball(G.X(BEAD),G.Y(disp(BEAD)),8,C.rd);P.noShadow();ctx.strokeStyle=A.alpha(C.rd,.5);ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(G.X(BEAD),G.mid-G.sy*1.1);ctx.lineTo(G.X(BEAD),G.mid+G.sy*1.1);ctx.stroke();ctx.setLineDash([])}
  else{// slinky: each coil shifted along the rope by the same signal, so compressions and rarefactions travel; the red coil only jiggles
   const k=.22;const gap=A.narrow?.1:.05;for(let x=0;x<=LEN+1e-9;x+=gap){const dx=disp(x)*k,px=G.X(x+dx),red=Math.abs(x-BEAD)<gap/2+1e-6;ctx.strokeStyle=red?C.rd:A.mix(C.vi,C.cy,x/LEN);ctx.lineWidth=red?4:2.2;ctx.beginPath();ctx.ellipse(px,G.mid,4,G.sy*.55,0,0,TAU);ctx.stroke()}
   P.label('squashed = compression · stretched = rarefaction',W/2,G.mid-G.sy*.85,{font:'600 11px system-ui',bg:A.alpha('#0b1220',.7)})}
  // the hand / motor at the left end
  const hy=G.Y(st.kind==='trans'?disp(0):0),hx=st.kind==='trans'?G.X(0):G.X(disp(0)*.22);ctx.font=`${A.narrow?26:30}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(st.mode==='hand'?'✊':'⚙️',hx-(A.narrow?20:28),hy);ctx.textBaseline='alphabetic';
  if(st.mode==='hand'&&!st.drag&&!A.isDone){ctx.globalAlpha=.6+.4*Math.sin(performance.now()/260);P.label(st.kind==='trans'?'👆 drag the fist up and down':'👆 drag the fist left and right',W/2,H-12,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  // ruler for measuring a wavelength
  if(A.step===2||A.step===4&&st.frozen){const[a,b]=st.ru,y=G.mid-G.sy*1.02;ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(G.X(a),y);ctx.lineTo(G.X(b),y);ctx.stroke();[a,b].forEach(x=>{ctx.beginPath();ctx.moveTo(G.X(x),y-10);ctx.lineTo(G.X(x),G.mid+G.sy*1.02);ctx.stroke();P.glow(A.alpha(C.am,.9),12);P.ball(G.X(x),y,9,C.am);P.noShadow()});P.label(`${r2(Math.abs(b-a))} m`,G.X((a+b)/2),y-18,{font:'800 12px system-ui',bg:A.alpha(C.am,.95),col:'#111'})}
  if(st.mode==='motor')P.label(`f = ${r2(st.f)} Hz   v = ${V} m/s${A.step===5&&!st.won?'':'   λ = '+r2(lambda())+' m'}`,W-12,18,{align:'right',font:'700 12px system-ui',bg:A.alpha('#0b1220',.75)})}
 // ---------- controls ----------
 const row=()=>c.el('div',{class:'fl-ctl'},ctl);
 function slider(label,min,max,step,get,set){const w=c.el('label',{},row(),label+' ');const r=c.el('input',{type:'range',min,max,step,value:get()},w);const o=c.el('output',{},w,'');const show=()=>{o.textContent=label.startsWith('Freq')?r2(get())+' Hz':r2(get())+' m'};r.oninput=()=>{set(+r.value);show();if(A.reduced()||st.frozen)settle();say();A.redraw();chk()};show();return{r,sync:()=>{r.value=get();show()}}}
 let bFreeze,bKind,bMode;
 function syncUi(){fIn.sync();aIn.sync();bFreeze.textContent=st.frozen?'▶ Play':'⏸ Freeze';bKind.textContent=st.kind==='trans'?'Switch to slinky (longitudinal)':'Switch to rope (transverse)';bMode.textContent=st.mode==='motor'?'Wiggle by hand':'Use the motor';say();A.redraw()}
 let chk=()=>{};
 const setup=(o)=>{Object.assign(st,{frozen:false,drag:false},o);if(st.mode==='motor'&&A.reduced())settle();else reset();syncUi();A.kick()};
 const steps=[
  {h:'Wiggle the rope',p:'One end of a long rope is in your hand. The red bead is painted on the rope, halfway along.',predict:{q:'When a wave runs along the rope, the red bead…',opts:['travels along with the wave','moves up and down, but stays in its place','does not move at all'],ans:1},task:'Drag the fist up and down to send a wave past the red bead',show:()=>{st.mode='motor';st.amp=.6;settle();syncUi();chk()},
   go:()=>{setup({mode:'hand',kind:'trans',hand:0,amp:.5,f:2});chk=()=>{if(st.beadMax>.15)A.done('The bead went up and down but stayed at 2.5 m. The wave carries energy along the rope; the rope itself does not travel.'+A.reveal(0))}}},
  {h:'Amplitude and wavelength',p:'A motor now wiggles the rope steadily. Amplitude is how far the rope moves from the middle. Wavelength (λ) is the length of one full wave.',predict:{q:'To make the wavelength longer, you should…',opts:['wiggle faster (higher frequency)','wiggle slower (lower frequency)','wiggle bigger (higher amplitude)'],ans:1},task:'Make the wavelength twice as long',show:()=>{st.f=1;settle();syncUi();chk()},
   go:()=>{setup({mode:'motor',kind:'trans',f:2,amp:.5});settle();chk=()=>{if(st.f<=1&&st.mode==='motor')A.done(`At ${r2(st.f)} Hz each wave is ${r2(lambda())} m long. The speed stays ${V} m/s, so fewer waves per second must each be longer. Amplitude changes the height, not the length.`+A.reveal(1))}}},
  {h:'Measure: v = f × λ',p:'The wave is frozen. Drag the two yellow markers onto two crests next to each other.',task:'Measure one wavelength with the ruler',show:()=>{const c0=crest(.2);st.ru=[c0,c0+lambda()];A.redraw();chk()},
   go:()=>{setup({mode:'motor',kind:'trans',f:2.5,amp:.5});settle();st.frozen=true;st.ru=[.3,1.3];syncUi();chk=()=>{const d=Math.abs(st.ru[1]-st.ru[0]);if(Math.abs(d-lambda())<.06&&nearCrest(st.ru[0])&&nearCrest(st.ru[1]))A.done(`λ = ${r2(lambda())} m, and the motor makes ${r2(st.f)} waves each second. So the wave travels ${r2(st.f)} × ${r2(lambda())} = ${V} m every second: v = f × λ.`)}}},
  {h:'Two kinds of wave',p:'On a rope, the rope moves at right angles to the wave: transverse. On a slinky you can push and pull along its length instead.',predict:{q:'In a sound wave, the air particles…',opts:['move up and down','move back and forth along the direction the sound travels','travel all the way to your ear'],ans:1},task:'Switch to the slinky and watch the red coil',show:()=>{st.kind='long';syncUi();chk()},
   go:()=>{setup({mode:'motor',kind:'trans',f:1.5,amp:.5});chk=()=>{if(st.kind==='long')A.done('The red coil only jiggles back and forth, along the direction the wave travels: a longitudinal wave, like sound in air. Light and water ripples are transverse.'+A.reveal(3))}}},
  {h:'Sandbox',p:'Rope or slinky, motor or hand. Change frequency and amplitude, freeze the wave and measure it. Which change never alters the speed?',go:()=>{setup({mode:'motor',kind:'trans',f:2,amp:.5});chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const crest=x0=>{const L=lambda();for(let x=x0;x<LEN;x+=.005)if(disp(x)>st.amp*.995&&disp(x)>=disp(x-.005)&&disp(x)>=disp(x+.005))return x;return x0};
 const nearCrest=x=>disp(x)>st.amp*.9;
 A=FK.shell(c,{steps,ratio:.58,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;bFreeze.hidden=A.step<2;bKind.hidden=A.step<3;bMode.hidden=A.step!==4;syncUi()},
  init:A=>{ctl=c.el('div',{class:'fl-below'},A.below);chal=c.el('div',{class:'fl-chal'},A.below);
   fIn=slider('Frequency',.5,4,.25,()=>st.f,v=>{st.f=v});aIn=slider('Amplitude',.1,.8,.05,()=>st.amp,v=>{st.amp=v});
   const r=row(),b=(t,f)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost'},r,t);x.onclick=()=>{f();A.sound.tick();syncUi();chk();A.kick()};return x};
   bFreeze=b('⏸ Freeze',()=>{st.frozen=!st.frozen});bKind=b('Switch',()=>{st.kind=st.kind==='trans'?'long':'trans'});bMode=b('Wiggle by hand',()=>{st.mode=st.mode==='motor'?'hand':'motor';st.hand=0;if(st.mode==='motor'&&A.reduced())settle()});
   b('↑ / → hand',()=>{if(st.mode==='hand'){st.hand=Math.min(.7,st.hand+.35);if(A.reduced()){advance(.1)}}}).setAttribute('aria-label','Move the hand one way (when wiggling by hand)');
   b('↓ / ← hand',()=>{if(st.mode==='hand'){st.hand=Math.max(-.7,st.hand-.35);if(A.reduced()){advance(.1)}}}).setAttribute('aria-label','Move the hand the other way (when wiggling by hand)');
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   // animate while on screen, not frozen, and motion is allowed (hand mode always runs so the learner's own wiggle travels)
   A.every(dt=>{if(!onScreen||st.frozen||A.reduced()&&st.mode!=='hand')return false;advance(dt);if(st.mode==='hand'&&!st.drag)st.hand*=Math.pow(.02,dt);chk();return true});
   A.gest({down:p=>{const G=geo(A);if(A.step===2||st.frozen){const i=[0,1].find(k=>Math.abs(p.x-G.X(st.ru[k]))<28);if(i!=null){st.rdrag=i;return true}}
     if(st.mode!=='hand'||p.x>G.X(.6))return false;st.drag=true;A.kick();return true},
    move:p=>{const G=geo(A);if(st.rdrag!=null){st.ru[st.rdrag]=Math.max(0,Math.min(LEN,Math.round(G.x(p.x)*100)/100));A.redraw();chk();return}if(!st.drag)return;
     st.hand=Math.max(-.7,Math.min(.7,st.kind==='trans'?G.y(p.y):(p.x-G.X(0))/G.sx/.22*.25));A.kick()},
    up:()=>{st.rdrag=null;st.drag=false}})}});
 // ---------- challenge: frequency for a target wavelength ----------
 const TARGETS=[1,.5,2,.8,1.6];let qi=-1;
 function newChal(){qi=(qi+1)%TARGETS.length;const L=TARGETS[qi];st.q={L,f:V/L};st.won=false;setup({mode:'motor',kind:'trans',f:1.5,amp:.5});
  chal.innerHTML=`<p><b>The rope carries waves at ${V} m/s. Set the frequency so each wave is ${r2(L)} m long,</b> then press Check. (The λ readout is hidden.)</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;chal.querySelector('.lbtn').onclick=judge;chk=()=>{};syncUi()}
 function judge(){const q=st.q,fb=chal.querySelector('.fl-fb');if(!q||st.won)return;
  if(Math.abs(st.f-q.f)<.13){st.won=true;fb.innerHTML=`✓ f = v ÷ λ = ${V} ÷ ${r2(q.L)} = ${r2(q.f)} Hz. Each wave is ${r2(lambda())} m. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;syncUi();return}
  A.sound.miss();fb.textContent=Math.abs(st.f-q.L)<.13?`You set f to ${r2(st.f)}, the same number as the wavelength. Use v = f × λ: f = ${V} ÷ ${r2(q.L)}.`
   :Math.abs(st.f-V*q.L)<.13?`That is v × λ. Rearrange v = f × λ for f: divide, f = v ÷ λ.`
   :`At ${r2(st.f)} Hz each wave is ${r2(lambda())} m: ${lambda()>q.L?'too long, so wiggle faster':'too short, so wiggle slower'}.`}
 A.start()})})();
