/* Flagship 10 – acids, alkalis and pH. Hook: purple red-cabbage juice; the learner predicts what lemon juice does, then squeezes the lemon in.
   Then: drag household liquids onto the pH scale, neutralise an acid drop by drop with universal indicator (the steep jump at 7),
   pour water into acid (dilution raises pH a little but never neutralises), a sandbox, and a challenge: bring a mystery beaker to pH 7,
   with feedback for adding the same type again, using water to neutralise and overshooting. Strong acid/alkali model: pH from excess H+ or OH-.
   SCIENCE CONTENT: self-checked only, pending science review (see learn/REVIEW-reels.md). */
(()=>{const UNI=['#e11d48','#ef4444','#f97316','#fb923c','#f59e0b','#facc15','#a3e635','#22c55e','#14b8a6','#06b6d4','#3b82f6','#4f46e5','#7c3aed','#6d28d9','#581c87'],
 CAB=[[0,'#dc2626'],[3,'#e11d74'],[5,'#a21caf'],[7,'#7c3aed'],[8.5,'#2563eb'],[10.5,'#16a34a'],[13,'#eab308'],[14,'#ca8a04']];
VIS.reg('flagacid',c=>{let A,chal;const st={n:0,V:1,ind:'cab',drops:[],log:[],cards:[],drag:null,hist:[],won:false,used:{}};
 const pH=(n=st.n,V=st.V)=>{const cc=Math.abs(n)/V;if(cc<1e-7)return 7;const v=n>0?-Math.log10(cc):14+Math.log10(cc);return Math.max(0,Math.min(14,v))};
 const f1=v=>(Math.round(v*10)/10).toFixed(1),mix=(a,b,t)=>A.mix(a,b,t);
 const colour=p=>{if(st.ind==='uni'){const i=Math.min(13,Math.floor(p));return mix(UNI[i],UNI[i+1],p-i)}for(let i=0;i<CAB.length-1;i++)if(p<=CAB[i+1][0]){const[a,ca]=CAB[i],[b,cb]=CAB[i+1];return mix(ca,cb,(p-a)/(b-a))}return CAB[CAB.length-1][1]};
 const word=p=>p<6.95?'acidic':p>7.05?'alkaline':'neutral';
 const BOT={lemon:['🍋 lemon juice','#fde047',.003,.005],acid:['acid','#f87171',.01,.01],alkali:['alkali','#93c5fd',-.01,.01],water:['💧 water','#bae6fd',0,.5]};
 const shelf=()=>[[],[],['alkali'],['water'],['acid','alkali','water'],['acid','alkali','water']][A.step]||[];
 const geo=A=>{const{W,H}=A,n=A.narrow,bw=Math.min(W*(n?.42:.26),H*.36),bh=bw*1.05;return{bx:n?W*.4:W*.32,by:H*.88,bw,bh,sy:H*.1}};
 const botXY=(A,i,k)=>{const{W}=A,g=geo(A),m=shelf().length,sp=A.narrow?W*.66:W*.6;return[sp*(i+1)/(m+1),g.sy+14]};
 const upd=()=>{const p=pH();c.say(A.step===1?'Drag each card to its pH on the scale.':`pH ${f1(p)}: ${word(p)}. ${Math.round(st.V*1000)} mL in the beaker.`);
  A.cv.setAttribute('aria-label',A.step===1?'A pH scale from 0 to 14 with household liquids to place.':`A beaker of ${st.ind==='cab'?'red cabbage':'universal'} indicator, coloured for pH ${f1(p)} (${word(p)}).`);A.redraw()};
 let chk=()=>{};
 const add=k=>{const b=BOT[k],g=geo(A);st.used[k]=(st.used[k]||0)+1;if(A.reduced()){apply(k);return}st.drops.push({k,x:g.bx+(Math.random()-.5)*10,y:geo(A).by-g.bh-40,vy:0,col:b[1]});A.sound.pop();A.redraw()};
 const apply=k=>{const b=BOT[k],p0=pH();st.n+=b[2];st.V+=b[3];if(Math.abs(st.n)<1e-9)st.n=0;st.log.push(k);st.hist.push(pH());const p1=pH();if(Math.abs(p1-7)<.05&&Math.abs(p0-7)>.05)A.sound.pop();else A.sound.tick();upd();chk()};
 // ---------- drawing ----------
 const beaker=(A,g)=>{const{ctx,paint:P,col:C}=A,cap=st.ind==='uni'&&A.step===3?5:1.6,fill=Math.min(.92,.25+st.V/cap*.6),lc=colour(pH()),x0=g.bx-g.bw/2,top=g.by-g.bh,ly=g.by-g.bh*fill;
  P.shadow(18,8,.35);ctx.fillStyle=A.alpha('#e0f2fe',.1);ctx.fillRect(x0,top,g.bw,g.bh);P.noShadow();
  ctx.fillStyle=P.lin(0,ly,0,g.by,[[0,A.mix(lc,'#fff',.25)],[1,lc]]);ctx.fillRect(x0+3,ly,g.bw-6,g.by-ly-3);ctx.fillStyle=A.alpha('#fff',.35);ctx.fillRect(x0+3,ly,g.bw-6,3);
  ctx.strokeStyle=A.alpha('#e2e8f0',.9);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0-6,top);ctx.lineTo(x0,top+6);ctx.lineTo(x0,g.by);ctx.lineTo(x0+g.bw,g.by);ctx.lineTo(x0+g.bw,top+6);ctx.lineTo(x0+g.bw+6,top);ctx.stroke();
  ctx.fillStyle=A.alpha('#fff',.5);ctx.font='10px system-ui';ctx.textAlign='left';for(let i=1;i<5;i++){const y=g.by-g.bh*i/5;ctx.fillRect(x0,y,10,1.5)}
  ctx.fillStyle='rgba(255,255,255,.16)';ctx.fillRect(x0+8,top+10,5,g.bh-20);
  st.drops.forEach(d=>{P.ball(d.x,d.y,4,d.col)});return ly};
 const meter=(A,g)=>{const{ctx,W,H,paint:P,col:C}=A,p=pH(),x0=A.narrow?W*.72:g.bx+g.bw/2+40,w=A.narrow?W*.24:Math.min(220,W*.3),y=A.narrow?H*.44:H*.42;
  P.label(`pH ${f1(p)}`,x0+w/2,y-42,{font:`800 ${A.narrow?20:26}px system-ui`,pill:1,bg:colour(p),col:p>4&&p<10?'#111':'#fff'});P.label(word(p),x0+w/2,y-14,{font:'700 13px system-ui',col:C.tx});
  if(st.ind==='uni'||A.step>=4){const bh=A.narrow?H*.36:H*.34;for(let i=0;i<14;i++){ctx.fillStyle=UNI[i];ctx.fillRect(x0+w/2-10,y+bh-(i+1)*bh/14,20,bh/14+.5)}const my=y+bh-p/14*bh;ctx.fillStyle=C.tx;ctx.beginPath();ctx.moveTo(x0+w/2+14,my);ctx.lineTo(x0+w/2+24,my-6);ctx.lineTo(x0+w/2+24,my+6);ctx.fill();
   ctx.font='600 10px system-ui';ctx.fillStyle=C.mu;ctx.textAlign='right';[0,7,14].forEach(v=>ctx.fillText(v,x0+w/2-14,y+bh-v/14*bh+3))}};
 const bottles=(A,g)=>{const{ctx,paint:P,col:C}=A;shelf().forEach((k,i)=>{const[x,y]=st.drag&&st.drag.k===k?[st.drag.x,st.drag.y]:botXY(A,i,k),b=BOT[k];
  P.shadow(8,3,.35);ctx.fillStyle=A.alpha(b[1],.9);P.rrect(x-14,y-8,28,34,6);ctx.fill();ctx.fillStyle='#e2e8f0';ctx.fillRect(x-5,y-18,10,12);P.noShadow();P.label(b[0],x,y+40,{font:`700 ${A.narrow?11:12}px system-ui`,pill:1,bg:A.alpha(C.pn,.9)})})};
 const CARDS=[['lemon juice',2],['vinegar',3],['milk',6.5],['pure water',7],['toothpaste',9],['soap',10],['oven cleaner',13]];
 const scl=A=>{const{W,H}=A;return{l:W*.06,r:W*.94,y:H*.7,X:v=>W*.06+v/14*W*.88,v:x=>(x-W*.06)/(W*.88)*14}};
 const cardXY=(A,i)=>{const c_=st.cards[i],s=scl(A);if(c_.v!=null)return[s.X(c_.v),s.y-34-(i%3)*28];const cols=A.narrow?2:4,w=A.W/cols;return[w*(i%cols)+w/2,A.H*.1+Math.floor(i/cols)*34]};
 const scale=A=>{const{ctx,W,H,paint:P,col:C}=A,s=scl(A);for(let i=0;i<14;i++){ctx.fillStyle=UNI[i];ctx.fillRect(s.X(i),s.y-8,s.X(1)-s.X(0)+.5,16)}
  ctx.fillStyle=C.tx;ctx.font='700 12px system-ui';ctx.textAlign='center';for(let v=0;v<=14;v+=A.narrow?2:1)ctx.fillText(v,s.X(v),s.y+26);ctx.fillStyle=C.mu;ctx.font='11px system-ui';[[3,'acidic'],[7,'neutral'],[11,'alkaline']].forEach(([v,t])=>ctx.fillText(t,s.X(v),s.y+44));
  st.cards.forEach((c_,i)=>{const[x,y]=st.drag&&st.drag.k==='card'&&st.drag.i===i?[st.drag.x,st.drag.y]:cardXY(A,i),ok=c_.v!=null&&Math.abs(c_.v-CARDS[i][1])<=1.2;if(c_.v!=null){ctx.strokeStyle=A.alpha(C.tx,.5);ctx.beginPath();ctx.moveTo(x,y+10);ctx.lineTo(s.X(c_.v),s.y-8);ctx.stroke()}
   P.label(CARDS[i][0],x,y,{font:`700 ${A.narrow?12:13}px system-ui`,pill:1,bg:c_.v==null?A.alpha(C.am,.95):ok?A.alpha(C.gr,.95):A.alpha(C.rd,.9),col:'#111'})})};
 const curve=(A)=>{if(A.narrow||!st.hist.length||A.step!==2&&A.step<4)return;const{ctx,W,H,paint:P,col:C}=A,x0=W*.62,y0=H*.88,w=W*.32,h=H*.3,n=Math.max(12,st.hist.length);ctx.strokeStyle=A.alpha(C.tx,.3);ctx.strokeRect(x0,y0-h,w,h);
  ctx.strokeStyle=C.cy;ctx.lineWidth=2.5;ctx.beginPath();st.hist.forEach((p,i)=>{const x=x0+(i+1)/n*w,y=y0-p/14*h;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();ctx.fillStyle=C.mu;ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('pH after each drop',x0+4,y0-h+12)};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,g=geo(A);A.ac={st,pH,geo:()=>geo(A),bot:k=>botXY(A,shelf().indexOf(k),k),cardXY:i=>cardXY(A,i),scl:()=>{const s=scl(A);return{l:s.l,r:s.r,y:s.y}}};
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  if(A.step===1){scale(A);return}
  ctx.fillStyle=A.mix('#a8a29e',C.pn,.55);ctx.fillRect(0,g.by,W,H-g.by);ctx.fillStyle=A.alpha(C.tx,.08);ctx.fillRect(0,g.sy+28,W,4);
  const ly=beaker(A,g);for(let i=st.drops.length-1;i>=0;i--){const d=st.drops[i];d.vy+=1400*dt;d.y+=d.vy*dt;if(d.y>=ly){st.drops.splice(i,1);apply(d.k)}}
  if(A.step===0){const lx=st.drag&&st.drag.k==='lemon'?st.drag.x:g.bx+g.bw*.9,lyy=st.drag&&st.drag.k==='lemon'?st.drag.y:g.by-g.bh-40;P.label('🍋',lx,lyy,{font:`${A.narrow?40:48}px system-ui`});P.ball(lx,lyy,Math.min(26,A.W*.06),A.alpha('#fde047',.0001))}
  bottles(A,g);meter(A,g);curve(A);
  if(A.step===2||A.step>=5)P.label(`${st.log.filter(k=>k!=='water').length} drops`,g.bx,g.by-g.bh-22,{font:'700 12px system-ui',col:C.mu});
  if(!A.isDone&&!st.drag&&!st.drops.length&&A.step!==5){const t=A.step===0?(A.pred[0]!=null?'👆 drag the lemon over the beaker':''):'👆 tap a bottle, or drag it over the beaker';if(t){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label(t,A.narrow?W/2:W*.3,A.narrow?g.by+(A.H-g.by)/2:g.sy+70,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}
  return st.drops.length>0};
 const reset=(n,V,ind)=>{Object.assign(st,{n,V,ind,drops:[],log:[],hist:[],used:{}})};
 const steps=[
  {h:'Red cabbage juice',p:'Juice from boiled red cabbage is purple. It is an indicator: its colour shows how acidic or alkaline something is.',predict:{q:'Lemon juice is an acid. Squeeze some in and the juice turns…',opts:['red or pink','green','it stays purple'],ans:0},task:'Drag the lemon over the beaker and let go',show:()=>add('lemon'),go:()=>{reset(0,1,'cab');chk=()=>{if(pH()<4)A.done(`Pink-red: pH ${f1(pH())}, an acid. Alkalis such as soap would turn it green.`+A.reveal(0))}}},
  {h:'The pH scale',p:'pH runs from 0 to 14. Below 7 is acidic, 7 is neutral, above 7 is alkaline.',task:'Drag every card to its pH',show:()=>{st.cards.forEach((c_,i)=>c_.v=CARDS[i][1]);upd();chk()},go:()=>{st.cards=CARDS.map(()=>({v:null}));chk=()=>{if(st.cards.every((c_,i)=>c_.v!=null&&Math.abs(c_.v-CARDS[i][1])<=1.2))A.done('Lemon and vinegar are acidic, pure water is neutral, soap and oven cleaner are alkaline. Strong ones sit at the ends.')}}},
  {h:'Neutralise it',p:'This beaker has acid at pH 1 with universal indicator. Alkali cancels acid out: that is neutralisation.',predict:{q:'As you add alkali drop by drop, the pH…',opts:['rises towards 7','falls towards 0','stays at 1'],ans:0},task:'Add alkali until the indicator is green: pH 7',show:()=>{while(st.n>1e-9){st.n-=.01;st.V+=.01;st.log.push('alkali');st.hist.push(pH())}st.n=0;upd();chk()},go:()=>{reset(.1,1,'uni');chk=()=>{const p=pH();if(Math.abs(p-7)<.05)A.done('Green: neutral, exactly 10 drops. The pH barely moved for 9 drops, then jumped to 7: that last drop matters most.'+A.reveal(2))}}},
  {h:'Is water an alkali?',p:'Same acid, pH 1. This time pour in water instead of alkali.',predict:{q:'Fill the beaker with water. The pH…',opts:['goes to 7: water neutralises it','rises a little but it stays acidic','becomes alkaline'],ans:1},task:'Pour water until the beaker is nearly full',show:()=>{while(st.V<4){st.V+=.5;st.log.push('water');st.hist.push(pH())}upd();chk()},go:()=>{reset(.05,.5,'uni');chk=()=>{if(st.V>=4)A.done(`Nine times the volume, and pH is only ${f1(pH())}. Water dilutes an acid but cannot neutralise it.`+A.reveal(3))}}},
  {h:'Sandbox',p:'Acid, alkali and water. Tap the beaker to switch between universal indicator and red cabbage.',go:()=>{reset(0,1,'uni');chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);A.every(()=>st.drops.length>0||!A.isDone);
   A.gest({down:p=>{const s=A.step,g=geo(A);
     if(s===1){for(let i=st.cards.length-1;i>=0;i--){const[x,y]=cardXY(A,i);if(Math.abs(p.x-x)<60&&Math.abs(p.y-y)<17){st.drag={k:'card',i,x:p.x,y:p.y};return true}}return false}
     if(s===0){if(A.pred[0]==null)return false;const lx=g.bx+g.bw*.9,ly=g.by-g.bh-40;if(Math.hypot(p.x-lx,p.y-ly)<40){st.drag={k:'lemon',x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
     if(s===5&&st.won)return false;
     const sh=shelf();for(let i=0;i<sh.length;i++){const[x,y]=botXY(A,i,sh[i]);if(Math.abs(p.x-x)<30&&p.y>y-24&&p.y<y+50){st.drag={k:sh[i],x:p.x,y:p.y,x0:p.x,y0:p.y};A.sound.tick();return true}}
     if(s===4&&Math.abs(p.x-g.bx)<g.bw/2&&p.y>g.by-g.bh){st.ind=st.ind==='uni'?'cab':'uni';A.sound.pop();upd()}return false},
    move:p=>{if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}},
    up:p=>{if(p&&st.drag){st.drag.x=p.x;st.drag.y=p.y}const d=st.drag;st.drag=null;if(!d){A.redraw();return}const g=geo(A);
     if(d.k==='card'){const s=scl(A);if(Math.abs(d.y-s.y)<90){st.cards[d.i].v=Math.max(0,Math.min(14,s.v(d.x)));A.sound.tick()}upd();chk();return}
     const over=Math.abs(d.x-g.bx)<g.bw*.75&&d.y<g.by&&d.y>g.by-g.bh-120,tap=Math.hypot(d.x-d.x0,d.y-d.y0)<8;
     if(over||tap&&d.k!=='lemon'){if(d.k==='lemon')for(let i=0;i<2;i++)add('lemon');else add(d.k)}A.redraw()}})}});
 const Q=[.03,.05,.07,.09,-.03,-.05,-.07,-.04,.06,-.08];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;reset(Q[qi],1,'uni');st.won=false;st.q={n0:Q[qi]};
  chal.innerHTML=`<p><b>A mystery beaker is at pH ${f1(pH())}. Make it exactly neutral (pH 7)</b> using as few drops as you can, then press Check.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-k="acid">+ acid</button> <button type="button" class="lbtn sm ghost" data-k="alkali">+ alkali</button> <button type="button" class="lbtn sm ghost" data-k="water">+ water</button> <button type="button" class="lbtn sm" data-ok>Check</button> <button type="button" class="lbtn sm ghost" data-r>Start again</button></span>`;
  chal.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(!st.won)add(b.dataset.k)});chal.querySelector('[data-ok]').onclick=judge;chal.querySelector('[data-r]').onclick=()=>{reset(st.q.n0,1,'uni');chal.querySelector('.fl-fb').textContent='';upd()};upd()};
 const judge=()=>{const fb=chal.querySelector('.fl-fb'),p=pH(),acidStart=st.q.n0>0,need=acidStart?'alkali':'acid',wrongK=acidStart?'acid':'alkali';if(st.won||st.drops.length)return;
  if(Math.abs(p-7)<.05){st.won=true;const k=Math.round(Math.abs(st.q.n0)/.01);fb.innerHTML=`✓ Neutral. It started ${acidStart?'acidic':'alkaline'}, so ${k} drop${k>1?'s':''} of ${need} cancelled it out.${st.used.water?' (The water did nothing useful: it only dilutes.)':''} <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=st.used[wrongK]&&((acidStart&&p<7)||(!acidStart&&p>7))?`It started ${acidStart?'acidic':'alkaline'}: adding ${wrongK} pushes it further from 7. Neutralise it with ${need}.`
   :st.used.water&&!st.used[need]?'Water only dilutes: the pH creeps towards 7 but never gets there. You need the opposite type.'
   :(acidStart&&p>7)||(!acidStart&&p<7)?`Too far: one drop past neutral and it is pH ${f1(p)} (${word(p)}). Add one drop of ${acidStart?'acid':'alkali'} to come back.`
   :`Still ${word(p)} at pH ${f1(p)}. Keep adding ${need}, one drop at a time.`};
 A.start()})})();
