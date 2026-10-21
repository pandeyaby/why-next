/* Flagship 9 – solids, liquids and gases as particles. Hook: an ice block in a jar over a flame.
   The learner predicts what melting does to the particles, then drags the flame up and watches the lattice break into a flowing liquid.
   Then: tilt the jar with a solid (keeps its shape), with a liquid (flows to the bottom), heat to a gas and lift the lid (it fills any space),
   sort everyday things (sand and honey are the traps), a sandbox, and a challenge with mystery substances:
   set the temperature for a given state, with feedback for "above melting means gas", "below melting is still solid" and boiling-point slips. */
(()=>{const N=48,COLS=6;
VIS.reg('flagstate',c=>{let A,chal,sfb;const st={T:-10,th:0,jh:1,ps:[],blk:{x:0,y:0,vx:0,vy:0},drag:null,cards:[],q:null,won:false,shown:false,sub:{n:'water',m:0,b:100},rng:[-20,130]};
 const state=(T=st.T,s=st.sub)=>T<s.m?0:T<s.b?1:2,NAMES=['solid','liquid','gas'];
 const geo=A=>{const{W,H}=A,n=A.narrow,jw=Math.min(W*(n?.5:.3),H*.4),jh0=jw*1.1;return{cx:n?W*.42:W*.4,cy:H*.86,jw,jh0,jh:jh0*st.jh,r:jw/22,tx:W-(n?34:48),t0:H*.1,t1:H*.84}};
 const tY=(g,T)=>g.t1-(T-st.rng[0])/(st.rng[1]-st.rng[0])*(g.t1-g.t0),yT=(g,y)=>st.rng[0]+(g.t1-y)/(g.t1-g.t0)*(st.rng[1]-st.rng[0]);
 const snapT=v=>{const sp=st.rng[1]-st.rng[0],k=sp>600?10:sp>200?5:1;return Math.round(v/k)*k};
 const init=()=>{const g=geo(A),s=g.r*2.1;st.ps=Array.from({length:N},(_,i)=>({x:-g.jw/2+g.r+((i*37)%100)/100*(g.jw-2*g.r),y:-g.r-((i*53)%100)/100*g.jh*.5,vx:0,vy:0}));st.blk={x:-COLS*s/2,y:0,vx:0,vy:0}};
 const upd=()=>{const s=state();c.say(A.step===4?'Drag each card into Solid, Liquid or Gas.':A.step===6?`Thermometer set to ${st.T} °C.`:`${st.T} °C: the water is a ${NAMES[s]}. Jar tilted ${Math.round(st.th)}°.`);
  A.cv.setAttribute('aria-label',A.step===4?'Three bins labelled solid, liquid and gas with cards to sort.':A.step===6?`Mystery substance jar; thermometer at ${st.T} °C.`:`A jar of water particles at ${st.T} °C, tilted ${Math.round(st.th)} degrees. The particles are a ${NAMES[s]}: ${['packed in a fixed pattern, jiggling on the spot','touching but sliding past each other','far apart and flying in all directions'][s]}.`);A.redraw()};
 let chk=()=>{};
 // ---------- physics in jar-local coords (x right, y up is negative, bottom = 0) ----------
 const physics=(A,dt)=>{const g=geo(A),r=g.r,s=r*2.1,S=state(),th=st.th*Math.PI/180,gx=Math.sin(th)*900,gy=Math.cos(th)*900,heat=Math.max(0,st.T-st.rng[0])/(st.rng[1]-st.rng[0]),L=-g.jw/2+r,R=g.jw/2-r,TOP=-g.jh+r;
  if(A.step===6&&!st.shown)return;
  if(S===0){const b=st.blk,bw=COLS*s,bh=Math.ceil(N/COLS)*s;b.vx+=gx*dt;b.vy+=gy*dt;b.vx*=.9;b.vy*=.9;b.x+=b.vx*dt;b.y+=b.vy*dt;
   if(b.x<-g.jw/2){b.x=-g.jw/2;b.vx=0}if(b.x+bw>g.jw/2){b.x=g.jw/2-bw;b.vx=0}if(b.y>0){b.y=0;b.vy=0}if(b.y-bh<-g.jh){b.y=-g.jh+bh;b.vy=0}
   const j=r*.12*(1+heat*2);st.ps.forEach((p,i)=>{const tx=b.x+(i%COLS+.5)*s,ty=b.y-(Math.floor(i/COLS)+.5)*s,k=Math.min(1,dt*8);p.x+=(tx-p.x)*k+(Math.random()-.5)*j;p.y+=(ty-p.y)*k+(Math.random()-.5)*j;p.vx=p.vy=0});return}
  const sub=2,h=dt/sub;for(let it=0;it<sub;it++){const gas=S===2,G=gas?.04:1,v0=gas?160+heat*260:0;
   st.ps.forEach(p=>{p.vx+=gx*G*h;p.vy+=gy*G*h;if(!gas){p.vx*=.985;p.vy*=.985;p.vx+=(Math.random()-.5)*heat*60;p.vy+=(Math.random()-.5)*heat*60}else{const sp=Math.hypot(p.vx,p.vy)||1;if(sp<v0*.7){p.vx+=(Math.random()-.5)*v0;p.vy+=(Math.random()-.5)*v0}else{p.vx*=v0/sp*.02+.98;p.vy*=v0/sp*.02+.98}}});
   if(!gas)for(let i=0;i<N;i++)for(let k=i+1;k<N;k++){const a=st.ps[i],b=st.ps[k],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<2*r&&d>.01){const o=(2*r-d)/2,ux=dx/d,uy=dy/d;a.x-=ux*o;a.y-=uy*o;b.x+=ux*o;b.y+=uy*o;const rv=(b.vx-a.vx)*ux+(b.vy-a.vy)*uy;if(rv<0){a.vx+=rv*ux*.5;a.vy+=rv*uy*.5;b.vx-=rv*ux*.5;b.vy-=rv*uy*.5}}}
   st.ps.forEach(p=>{p.x+=p.vx*h;p.y+=p.vy*h;const e=gas?1:.3;if(p.x<L){p.x=L;p.vx=Math.abs(p.vx)*e}if(p.x>R){p.x=R;p.vx=-Math.abs(p.vx)*e}if(p.y>-r){p.y=-r;p.vy=-Math.abs(p.vy)*e}if(p.y<TOP){p.y=TOP;p.vy=Math.abs(p.vy)*e}})}};
 const toW=(g,x,y)=>{const th=st.th*Math.PI/180;return[g.cx+x*Math.cos(th)-y*Math.sin(th),g.cy+x*Math.sin(th)+y*Math.cos(th)]};
 // ---------- drawing ----------
 const jar=(A,g,hide)=>{const{ctx,paint:P,col:C}=A,S=state();ctx.save();ctx.translate(g.cx,g.cy);ctx.rotate(st.th*Math.PI/180);
  ctx.fillStyle=A.alpha('#e0f2fe',.08);ctx.fillRect(-g.jw/2,-g.jh,g.jw,g.jh);
  if(!hide){if(S===0){ctx.strokeStyle=A.alpha('#bae6fd',.5);ctx.lineWidth=1.2;st.ps.forEach((p,i)=>{[[1,i%COLS<COLS-1],[COLS,1]].forEach(([d,ok])=>{const q=st.ps[i+d];if(ok&&q){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}})})}
   const col=S===0?'#7dd3fc':S===1?'#3b82f6':'#c4b5fd';st.ps.forEach(p=>{if(S===2){ctx.strokeStyle=A.alpha(col,.18);ctx.lineWidth=g.r*1.4;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*.05,p.y-p.vy*.05);ctx.stroke()}P.ball(p.x,p.y,g.r*.92,col)})}
  else{ctx.fillStyle=C.mu;ctx.font=`800 ${g.jw*.3}px system-ui`;ctx.textAlign='center';ctx.fillText('?',0,-g.jh*.4)}
  ctx.strokeStyle=A.alpha('#e2e8f0',.9);ctx.lineWidth=4;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(-g.jw/2,-g.jh-6);ctx.lineTo(-g.jw/2,0);ctx.lineTo(g.jw/2,0);ctx.lineTo(g.jw/2,-g.jh-6);ctx.stroke();
  if(A.step===3||A.step===5){ctx.fillStyle='#94a3b8';P.rrect(-g.jw/2-8,-g.jh-12,g.jw+16,10,4);ctx.fill();P.ball(0,-g.jh-12,8,C.am)}
  ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(-g.jw/2+6,-g.jh+6,5,g.jh-12);ctx.restore()};
 const thermo=(A,g)=>{const{ctx,paint:P,col:C}=A,x=g.tx,y=tY(g,st.T),cold=state()===0;ctx.fillStyle=A.alpha(C.tx,.12);P.rrect(x-7,g.t0-6,14,g.t1-g.t0+12,7);ctx.fill();
  ctx.fillStyle=P.lin(0,g.t1,0,g.t0,[[0,'#38bdf8'],[.5,'#f59e0b'],[1,'#ef4444']]);P.rrect(x-4,y,8,g.t1-y+4,4);ctx.fill();
  const marks=A.step===6&&!st.shown?[]:[[st.sub.m,'melts'],[st.sub.b,'boils']];ctx.font='600 10px system-ui';ctx.textAlign='right';marks.forEach(([v,t])=>{const yy=tY(g,v);ctx.fillStyle=C.mu;ctx.fillRect(x-14,yy,8,1.5);ctx.fillText(`${t} ${v}°`,x-16,yy+3)});
  if(A.step===6){ctx.fillStyle=C.mu;ctx.textAlign='right';[st.rng[0],st.rng[1]].forEach(v=>ctx.fillText(v+'°',x-12,tY(g,v)+3))}
  P.glow(A.alpha(cold?C.cy:C.rd,.9),14);P.ball(x,y,12,cold?C.cy:C.rd);P.noShadow();P.label(`${st.T} °C`,x-18,y-20,{align:'right',font:'800 14px system-ui',pill:1,bg:A.alpha(cold?C.cy:C.rd,.92),col:'#fff'});
  // flame
  const f=Math.max(0,(st.T-st.rng[0])/(st.rng[1]-st.rng[0])),fx=g.cx,fy=g.cy+(A.H-g.cy)*.55;if(A.step!==6&&f>.05&&st.th===0){P.glow('#f97316',16);ctx.fillStyle='#fb923c';for(let i=-2;i<=2;i++){const h=(6+f*16)*(1-Math.abs(i)*.2)*(1+.15*Math.sin(performance.now()/90+i));ctx.beginPath();ctx.moveTo(fx+i*9-5,fy);ctx.quadraticCurveTo(fx+i*9,fy-h*2,fx+i*9+5,fy);ctx.fill()}P.noShadow()}};
 const BINS=['Solid','Liquid','Gas'],CARDS=[['🧊 ice',0],['🥛 milk',1],['💨 air',2],['🪵 wooden block',0],['🍯 honey',1,'Honey is slow, but it flows and takes the shape of its jar: a liquid.'],['⏳ sand',0,'Sand pours, but each grain is a tiny solid that keeps its own shape.'],['♨️ steam',2,'Steam is water as a gas. The white cloud you see is tiny droplets forming as it cools.']];
 const binR=(A,i)=>{const{W,H}=A,w=W/3;return{x:w*i+6,y:H*.62,w:w-12,h:H*.34}};
 const cardXY=(A,i)=>{const c_=st.cards[i];if(c_.bin!=null){const b=binR(A,c_.bin),k=st.cards.slice(0,i).filter(x=>x.bin===c_.bin).length;return[b.x+b.w/2,b.y+40+k*28]}const cols=A.narrow?2:4,w=A.W/cols;return[w*(i%cols)+w/2,A.H*.1+Math.floor(i/cols)*36]};
 const sorter=A=>{const{ctx,W,H,paint:P,col:C}=A;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  BINS.forEach((n,i)=>{const b=binR(A,i),col=[C.cy,C.vi,C.pk][i];ctx.fillStyle=A.alpha(col,.14);P.rrect(b.x,b.y,b.w,b.h,14);ctx.fill();ctx.strokeStyle=A.alpha(col,.7);ctx.lineWidth=2;ctx.stroke();P.label(n,b.x+b.w/2,b.y+16,{font:'800 14px system-ui',col})});
  st.cards.forEach((c_,i)=>{const[x,y]=st.drag&&st.drag.k==='card'&&st.drag.i===i?[st.drag.x,st.drag.y]:cardXY(A,i);P.label(CARDS[i][0],x,y,{font:`700 ${A.narrow?12:13}px system-ui`,pill:1,bg:c_.bin!=null?A.alpha(C.gr,.95):A.alpha(C.am,.95),col:'#111'})})};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A;A.sm={st,geo:()=>geo(A),tY:T=>tY(geo(A),T),cardXY:i=>cardXY(A,i),binR:i=>binR(A,i)};
  if(A.step===4){sorter(A);return}
  ctx.fillStyle=P.lin(0,0,0,H,A.step===0?[[0,'#1e293b'],[1,'#334155']]:[[0,A.mix(C.pn,C.cy,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  const g=geo(A);ctx.fillStyle=A.mix('#78716c',C.pn,.4);ctx.fillRect(0,g.cy+2,W,H-g.cy);physics(A,Math.min(dt,.033));jar(A,g,A.step===6&&!st.shown);thermo(A,g);
  const S=state();if(A.step!==6||st.shown)P.label(A.step===6?`${st.sub.n}: ${NAMES[S]}`:NAMES[S],g.cx,g.cy-g.jh-34,{font:`800 ${A.narrow?15:18}px system-ui`,pill:1,bg:A.alpha([C.cy,C.vi,C.pk][S],.92),col:'#fff'});
  if(!A.isDone&&!st.drag&&A.step<4){const hint=A.step===1||A.step===2?'👆 drag the jar sideways to tilt it':A.step===3&&S===2?'👆 drag the lid up':'👆 drag the thermometer';ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label(hint,W/2,H*.05,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}};
 const water=()=>{st.sub={n:'water',m:0,b:100};st.rng=[-20,130]};
 const setT=v=>{v=Math.max(st.rng[0],Math.min(st.rng[1],snapT(v)));if(v===st.T)return;const s0=state();st.T=v;const s1=state();if(s1!==s0){A.sound.pop();if(s1===0){const g=geo(A),s=g.r*2.1;st.blk={x:-COLS*s/2,y:0,vx:0,vy:0}}}else A.sound.tick();upd();chk()};
 const steps=[
  {h:'Ice in a jar',p:'A block of ice sits in a jar at −10 °C. Water is made of tiny particles, far too small to see.',predict:{q:'When the ice melts, the particles…',opts:['get bigger','stay the same but start sliding past each other','disappear'],ans:1},task:'Drag the thermometer up past 0 °C to melt the ice',show:()=>setT(20),go:()=>{water();st.T=-10;st.th=0;st.jh=1;init();chk=()=>{if(st.T>0)A.done('Same 48 particles, same size. Melting only frees them to slide past each other, so the water can flow.'+A.reveal(0))}}},
  {h:'A solid keeps its shape',p:'Freeze it again. In a solid the particles are packed in a fixed pattern and only jiggle on the spot.',predict:{q:'If you tilt the jar, the block of ice…',opts:['keeps its shape','flows to the low side','fills the jar'],ans:0},task:'Tilt the jar at least 30°',show:()=>{st.th=35;upd();chk()},go:()=>{water();st.T=-10;st.th=0;st.jh=1;init();chk=()=>{if(Math.abs(st.th)>=30&&state()===0)A.done('The whole block slides as one piece and keeps its shape: the particles are locked together.'+A.reveal(1))}}},
  {h:'A liquid flows',p:'Now it is water at 40 °C. The particles still touch, but they can move past each other.',predict:{q:'If you tilt the jar, the water…',opts:['keeps its shape','flows and takes the shape of the bottom of the jar','fills the whole jar'],ans:1},task:'Tilt the jar at least 30°',show:()=>{st.th=35;upd();chk()},go:()=>{water();st.T=40;st.th=0;st.jh=1;init();chk=()=>{if(Math.abs(st.th)>=30&&state()===1)A.done('The water flows into the low corner and its surface stays level: a liquid takes the shape of its container, but keeps its volume.'+A.reveal(2))}}},
  {h:'A gas fills any space',p:'Heat it past 100 °C. Then make the jar taller by pulling the lid up.',predict:{q:'When the jar gets taller, the gas…',opts:['stays at the bottom','spreads out to fill all of it','gets squashed'],ans:1},task:'Boil it into a gas, then drag the lid up',show:()=>{setT(120);st.jh=1.7;upd();chk()},go:()=>{water();st.T=60;st.th=0;st.jh=1;init();chk=()=>{if(state()===2&&st.jh>=1.5)A.done('The particles fly apart and fill the whole jar, however big it is. A gas has no fixed shape and no fixed volume.'+A.reveal(3))}}},
  {h:'Sort it',p:'Is each one a solid, a liquid or a gas? Two of them are tricky.',task:'Drag every card into the right box',show:()=>{st.cards.forEach((c_,i)=>c_.bin=CARDS[i][1]);upd();chk()},go:()=>{st.cards=CARDS.map(()=>({bin:null}));sfb.textContent='';chk=()=>{if(st.cards.every(c_=>c_.bin!=null))A.done('Sorted! Sand is a solid (each grain keeps its shape) and honey is a liquid (it flows, just slowly).')}}},
  {h:'Sandbox',p:'Heat, cool, tilt and pull the lid. Can you make a liquid fill the tall jar? (You cannot: only a gas does that.)',go:()=>{water();st.T=20;st.th=0;st.jh=1;init();chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;sfb.hidden=A.step!==4;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);sfb=c.el('p',{class:'fl-fb',role:'status','aria-live':'polite'},A.extra.parentNode);A.extra.parentNode.insertBefore(sfb,chal);
   A.every(()=>A.step!==4);
   A.gest({down:p=>{const s=A.step,g=geo(A);
     if(s===4){for(let i=st.cards.length-1;i>=0;i--){const[x,y]=cardXY(A,i);if(Math.abs(p.x-x)<64&&Math.abs(p.y-y)<18){st.drag={k:'card',i,x:p.x,y:p.y};A.sound.pop();return true}}return false}
     if(Math.abs(p.x-g.tx)<34){if(s===6&&st.won)return false;st.drag={k:'T'};setT(yT(g,p.y));return true}
     if((s===3||s===5)&&Math.abs(p.y-(g.cy-g.jh-12))<26&&Math.abs(p.x-g.cx)<g.jw/2+20){st.drag={k:'lid'};return true}
     if((s===1||s===2||s===5)&&Math.abs(p.x-g.cx)<g.jw/2+30&&p.y>g.cy-g.jh-20&&p.y<g.cy+10){st.drag={k:'tilt',x0:p.x,th0:st.th};return true}return false},
    move:p=>mv(p),up:p=>{if(p&&st.drag)mv(p);const d=st.drag;st.drag=null;
     if(d&&d.k==='card'){const i=d.i,bi=[0,1,2].find(b=>{const r=binR(A,b);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y-20});if(bi!=null){if(bi===CARDS[i][1]){st.cards[i].bin=bi;A.sound.pop();sfb.textContent=`✓ ${CARDS[i][0].split(' ').slice(1).join(' ')}: ${BINS[bi].toLowerCase()}.`+(CARDS[i][2]?' '+CARDS[i][2]:'')}else{A.sound.miss();sfb.textContent=CARDS[i][2]||`Not ${BINS[bi].toLowerCase()}. Does it keep its shape, flow, or spread out to fill the room?`}}upd();chk()}
     if(d&&d.k==='T'&&A.step===6)judge();A.redraw()}})}});
 const mv=p=>{const d=st.drag;if(!d)return;const g=geo(A);if(d.k==='card'){d.x=p.x;d.y=p.y;A.redraw();return}if(d.k==='T'){setT(yT(g,p.y));return}
  if(d.k==='lid'){const jh=Math.max(1,Math.min((g.cy-A.H*.12)/g.jh0,(g.cy-p.y-12)/g.jh0));if(Math.abs(jh-st.jh)>.01){st.jh=jh;A.sound.tick();upd();chk()}return}
  if(d.k==='tilt'){const th=Math.max(-45,Math.min(45,Math.round(d.th0+(p.x-d.x0)/(A.W*.4)*45)));if(th!==st.th){st.th=th;if(th%5===0)A.sound.tick();upd();chk()}}};
 const SUBS=[['water',0,100],['ethanol',-114,78],['mercury',-39,357],['oxygen',-218,-183],['iron',1538,2862],['salt (sodium chloride)',801,1413],['nitrogen',-210,-196],['wax',60,370]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%SUBS.length;const[n,m,b]=SUBS[qi],sp=b-m,want=Math.floor(Math.random()*3);st.sub={n,m,b};const pad=Math.max(20,sp*.5),k=sp>600?10:sp>200?5:1;st.rng=[Math.floor((m-pad)/k)*k,Math.ceil((b+pad)/k)*k];
  Object.assign(st,{T:Math.round((st.rng[0]+st.rng[1])/2/k)*k,th:0,jh:1,won:false,shown:false,q:{want}});init();
  chal.innerHTML=`<p><b>${n[0].toUpperCase()+n.slice(1)} melts at ${m} °C and boils at ${b} °C. Drag the thermometer so it is a ${NAMES[want]}, then let go.</b></p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-m="-1" aria-label="colder">▼ colder</button> <button type="button" class="lbtn sm ghost" data-m="1" aria-label="warmer">▲ warmer</button> <button type="button" class="lbtn sm" data-ok>Check</button></span>`;
  chal.querySelectorAll('[data-m]').forEach(b_=>b_.onclick=()=>{if(!st.won){st.shown=false;setT(st.T+ +b_.dataset.m*k)}});chal.querySelector('[data-ok]').onclick=judge;upd()};
 const judge=()=>{const q=st.q,fb=chal.querySelector('.fl-fb'),{n,m,b}=st.sub,T=st.T,S=state();if(!q||st.won)return;st.shown=true;init();A.redraw();
  if(S===q.want){st.won=true;fb.innerHTML=`✓ At ${T} °C ${n} is a ${NAMES[S]}: ${['below its melting point','between melting and boiling','above its boiling point'][S]} (${m} °C, ${b} °C). <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=q.want===0?(S===1?`Above ${m} °C ${n} has melted: it is a liquid. A solid needs to be colder than its melting point.`:`At ${T} °C it is even past boiling: a gas. Go below ${m} °C for a solid.`)
   :q.want===1?(S===0?`Still frozen: below ${m} °C ${n} is a solid. Warm it past its melting point, but not as far as ${b} °C.`:`Past its boiling point (${b} °C) ${n} is a gas. A liquid lives between ${m} °C and ${b} °C.`)
   :(S===1?`Melted is not the same as boiled: between ${m} °C and ${b} °C it is only a liquid. A gas needs more than ${b} °C.`:`Below ${m} °C it is a solid. To be a gas it must be hotter than its boiling point, ${b} °C.`)};
 A.start()})})();
