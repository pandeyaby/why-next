/* Flagship 8 – probability as a fraction. Hook: a fairground spinner with red, blue and yellow; you win on red.
   The learner predicts P(red) (misconception: "red or not red, so 1/2"), then flicks the spinner and watches the tally.
   Then: drag the red edge to make equal parts (1/n), drag it again to make unequal parts (colours are not chances),
   fill a bag with counters (2/6 = 1/3), drag events onto the 0-to-1 scale, a sandbox with 100 quick spins,
   and a challenge: tap sectors to build a spinner with a given probability, with feedback for 1/n, the "denominator" slip and the complement. */
(()=>{const TAU=Math.PI*2,gcd=(a,b)=>b?gcd(b,a%b):a,fr=(k,n)=>{if(!k)return'0';if(k===n)return'1';const g=gcd(k,n);return`${k/g}/${n/g}`};
VIS.reg('flagprob',c=>{let A,chal;const st={n:3,red:[0],frac:1/3,phi:-Math.PI/2,w:0,spins:0,hits:0,sweep:0,la:null,drag:null,bag:[],cards:[],q:null,won:false,many:null,mode:'eq'};
 const geo=A=>{const{W,H}=A,narrow=A.narrow,R=Math.min(narrow?W*.34:W*.22,H*(narrow?.28:.36));const cx=A.step===3||A.step===4?0:narrow?W/2:W*.34,cy=narrow?H*.43:H*.5;return{cx,cy,R}};
 const secs=()=>{if(st.mode==='free')return[{a:0,b:st.frac,red:1},{a:st.frac,b:1,red:0,col:'cy'}];const out=[];for(let i=0;i<st.n;i++)out.push({a:i/st.n,b:(i+1)/st.n,red:st.red.includes(i),i,col:st.n===3?['rd','cy','am'][i]:null});return out};
 const pRed=()=>st.mode==='free'?st.frac:st.red.length/st.n;
 const under=()=>{const rel=(((-Math.PI/2-st.phi)%TAU)+TAU)%TAU/TAU;return secs().find(s=>rel>=s.a&&rel<s.b)};
 const upd=()=>{const s=A.step;c.say(s===0?`Spins: ${st.spins}, red: ${st.hits}.`:s===3?`Bag: ${st.bag.filter(x=>x).length} green and ${st.bag.filter(x=>!x).length} blue.`:s===4?'Drag each event card onto the probability line.':`Spinner with ${st.mode==='free'?'red covering '+Math.round(st.frac*100)+'% of the circle':st.n+' equal parts, '+st.red.length+' red'}: P(red) = ${st.mode==='free'?Math.round(st.frac*24)+'/24':fr(st.red.length,st.n)}.`);
  A.cv.setAttribute('aria-label',s===0?'Illustration: a fairground spinner with three equal parts: red, blue and yellow.':s===3?'A bag of counters and a tray of green and blue counters.':s===4?'A probability line from 0 (impossible) to 1 (certain) with event cards.':'A spinner divided into parts; red parts win.');A.redraw()};
 let chk=()=>{};
 const spin=w=>{st.w=w;A.sound.whoosh();if(A.reduced()){st.phi+=w*w/16;st.w=0;land()}A.redraw()};
 const land=()=>{const s=under();st.spins++;if(s&&s.red){st.hits++;A.sound.pop()}else A.sound.tick();upd();chk()};
 // ---------- drawing ----------
 const spinner=(A,g)=>{const{ctx,paint:P,col:C}=A,{cx,cy,R}=g;P.shadow(18,8,.4);ctx.fillStyle='#0f172a';ctx.beginPath();ctx.arc(cx,cy,R+8,0,TAU);ctx.fill();P.noShadow();
  secs().forEach(s=>{const col=s.red?C.rd:s.col?C[s.col]:(s.i%2?C.cy:A.mix(C.cy,C.vi,.5));ctx.fillStyle=P.rad(cx,cy,R*.1,R,[[0,A.mix(col,'#fff',.25)],[1,col]]);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,st.phi+s.a*TAU,st.phi+s.b*TAU);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=2;ctx.stroke();
   if(s.red&&(A.step===0||(s.b-s.a)>.05)){const m=st.phi+(s.a+s.b)/2*TAU;ctx.fillStyle='#fff';ctx.font=`${R*.18}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('★',cx+Math.cos(m)*R*.62,cy+Math.sin(m)*R*.62);ctx.textBaseline='alphabetic'}});
  for(let i=0;i<24;i++){const a=i/24*TAU;P.ball(cx+Math.cos(a)*(R+4),cy+Math.sin(a)*(R+4),2,i%2?'#fde68a':'#fff')}
  P.ball(cx,cy,R*.1,'#e2e8f0');ctx.fillStyle='#f8fafc';P.shadow(6,2,.4);ctx.beginPath();ctx.moveTo(cx-11,cy-R-16);ctx.lineTo(cx+11,cy-R-16);ctx.lineTo(cx,cy-R+8);ctx.closePath();ctx.fill();P.noShadow()};
 const handle=(A,g)=>{const{cx,cy,R}=g,a=st.phi+pRed()*TAU;return[cx+Math.cos(a)*R,cy+Math.sin(a)*R]};
 const tally=(A,x,y,w)=>{const{ctx,paint:P,col:C}=A,n=st.spins,k=st.hits,f=n?k/n:0;P.label(`★ red ${k} of ${n} spins${n?` = ${(f).toFixed(2)}`:''}`,x+w/2,y-14,{font:'700 13px system-ui'});ctx.fillStyle=A.alpha(C.tx,.15);P.rrect(x,y,w,16,8);ctx.fill();ctx.fillStyle=C.rd;P.rrect(x,y,Math.max(0,w*f),16,8);ctx.fill();
  const t=x+w*pRed();ctx.strokeStyle=C.tx;ctx.setLineDash([3,3]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(t,y-4);ctx.lineTo(t,y+20);ctx.stroke();ctx.setLineDash([]);if(A.step!==0||A.isDone)P.label(`theory ${st.mode==='free'?Math.round(st.frac*24)+'/24':fr(st.red.length,st.n)}`,t,y+32,{font:'600 11px system-ui',col:C.mu})};
 const bagG=A=>{const{W,H}=A;return{bx:A.narrow?W*.62:W*.66,by:H*.55,br:Math.min(W*(A.narrow?.3:.2),H*.32),tray:[[A.narrow?W*.14:W*.16,H*.3,1],[A.narrow?W*.14:W*.16,H*.62,0]]}};
 const bagSpots=(g,n)=>Array.from({length:n},(_,i)=>{const r=Math.min(3,Math.ceil(Math.sqrt(n))),cols=Math.max(2,Math.ceil(n/r)),cx=i%cols,ry=Math.floor(i/cols);return[g.bx+(cx-(cols-1)/2)*g.br*.42,g.by+g.br*.25-ry*g.br*.42]});
 const counter=(A,x,y,green,r=16)=>{const C=A.col;A.paint.shadow(6,3,.35);A.paint.ball(x,y,r,green?C.gr:C.cy);A.paint.noShadow()};
 const bag=A=>{const{ctx,W,H,paint:P,col:C}=A,g=bagG(A);ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.gr,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  P.shadow(16,6,.35);ctx.fillStyle=P.rad(g.bx-g.br*.3,g.by-g.br*.2,g.br*.1,g.br*1.3,[[0,'#d6b48a'],[1,'#8a5a2b']]);ctx.beginPath();ctx.moveTo(g.bx-g.br*.6,g.by-g.br*.55);ctx.quadraticCurveTo(g.bx-g.br*1.15,g.by+g.br*.8,g.bx,g.by+g.br*.75);ctx.quadraticCurveTo(g.bx+g.br*1.15,g.by+g.br*.8,g.bx+g.br*.6,g.by-g.br*.55);ctx.closePath();ctx.fill();P.noShadow();
  ctx.fillStyle='#5b3a1a';ctx.fillRect(g.bx-g.br*.62,g.by-g.br*.62,g.br*1.24,g.br*.1);
  bagSpots(g,st.bag.length).forEach(([x,y],i)=>counter(A,x,y,st.bag[i],A.narrow?14:16));
  g.tray.forEach(([x,y,gr])=>{ctx.fillStyle=A.alpha(C.tx,.08);P.rrect(x-34,y-34,68,68,14);ctx.fill();counter(A,x,y,gr,20);counter(A,x+8,y+8,gr,20);P.label(gr?'green':'blue',x,y+46,{font:'600 11px system-ui'})});
  const n=st.bag.length,gN=st.bag.filter(x=>x).length;P.label(`P(green) = ${n?gN+'/'+n:'?'}${n&&gcd(gN,n)>1&&gN?' = '+fr(gN,n):''}`,g.bx,H*.1,{font:`800 ${A.narrow?16:19}px system-ui`,pill:1,bg:A.alpha(C.gr,.92),col:'#04140a'});
  if(st.drag&&st.drag.k==='ctr')counter(A,st.drag.x,st.drag.y,st.drag.g,20);
  if(!A.isDone&&!st.drag&&A.pred[3]!=null){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag counters into the bag · tap one to take it out',W/2,H*.93,{pill:1,bg:A.alpha(C.am,.95),col:'#111',font:'600 12px system-ui'});ctx.globalAlpha=1}};
 const CARDS=[['🎲 roll a 6',1/6],['🪙 heads',1/2],['🎲 roll a 7',0],['🌅 sun rises',1],['spinner: 1 of 4 parts',1/4]];
 const lineG=A=>{const{W,H}=A;return{l:W*.08,r:W*.92,y:H*.72,X:v=>W*.08+v*W*.84,v:x=>(x-W*.08)/(W*.84)}};
 const cardXY=(A,i)=>{const c_=st.cards[i],g=lineG(A);if(c_.v!=null)return[g.X(c_.v),g.y-30-(i%3)*28];const cols=A.narrow?2:5,w=A.W/cols;return[w*(i%cols)+w/2,A.H*.12+Math.floor(i/cols)*36]};
 const scale=A=>{const{ctx,W,H,paint:P,col:C}=A,g=lineG(A);ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=P.lin(g.l,0,g.r,0,[[0,A.alpha(C.rd,.7)],[.5,A.alpha(C.am,.7)],[1,A.alpha(C.gr,.7)]]);P.rrect(g.l,g.y-5,g.r-g.l,10,5);ctx.fill();
  [[0,'0','impossible'],[.5,'1/2','even chance'],[1,'1','certain']].forEach(([v,t,w])=>{ctx.fillStyle=C.tx;ctx.fillRect(g.X(v)-1,g.y-12,2,24);ctx.font='700 13px system-ui';ctx.textAlign='center';ctx.fillText(t,g.X(v),g.y+30);ctx.font='11px system-ui';ctx.fillStyle=C.mu;ctx.fillText(w,g.X(v),g.y+46)});
  st.cards.forEach((c_,i)=>{const[x,y]=st.drag&&st.drag.k==='card'&&st.drag.i===i?[st.drag.x,st.drag.y]:cardXY(A,i);const ok=c_.v!=null&&Math.abs(c_.v-CARDS[i][1])<=.06;
   if(c_.v!=null){ctx.strokeStyle=A.alpha(ok?C.gr:C.tx,.6);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,y+10);ctx.lineTo(g.X(c_.v),g.y);ctx.stroke()}
   P.label(CARDS[i][0],x,y,{font:`700 ${A.narrow?12:13}px system-ui`,pill:1,bg:c_.v==null?A.alpha(C.am,.95):ok?A.alpha(C.gr,.95):A.alpha(C.rd,.9),col:'#111'})})};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A;A.pb={st,geo:()=>geo(A),handle:()=>handle(A,geo(A)),bagG:()=>bagG(A),bagSpots,lineG:()=>{const g=lineG(A);return{l:g.l,r:g.r,y:g.y}},cardXY:i=>cardXY(A,i)};
  if(st.w){const s=Math.sign(st.w);st.phi+=st.w*dt;st.w-=s*22*dt;if(Math.sign(st.w)!==s){st.w=0;land()}}
  if(A.step===3){bag(A);return}if(A.step===4){scale(A);return}
  if(A.step===0){ctx.fillStyle=P.lin(0,0,0,H,[[0,'#3b0764'],[1,'#1e1b4b']]);ctx.fillRect(0,0,W,H);for(let i=0;i<16;i++){const x=(i+.5)*W/16;P.glow(i%2?'#fde047':'#f472b6',10);P.ball(x,10,4,i%2?'#fde047':'#f472b6');P.noShadow()}
   ctx.fillStyle='#b91c1c';for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(i*W/8,18);ctx.lineTo((i+1)*W/8,18);ctx.lineTo((i+.5)*W/8,46);ctx.fill()}}
  else{ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.rd,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H)}
  const g=geo(A);spinner(A,g);
  if(A.step===1||A.step===2||A.step===5){const[hx,hy]=handle(A,g);P.glow(A.alpha(C.am,.9),14);P.ball(hx,hy,12,C.am);P.noShadow();
   if(!A.isDone&&!st.drag){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag the red edge',hx+(A.narrow?-10:16),hy+(A.narrow?30:0),{align:A.narrow?'center':'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}
  const big=A.step===0||A.step===5;if(big||A.step===6){const tx=A.narrow?W*.1:W*.62,tw=A.narrow?W*.8:W*.32,ty=A.narrow?H*.89:H*.46;if(big)tally(A,tx,ty,tw)}
  if(A.step)P.label(A.step===6?`P(red) = ${fr(st.red.length,st.n)}`:A.step===2?`red covers ${Math.round(st.frac*24)}/24${gcd(Math.round(st.frac*24),24)>1?' = '+fr(Math.round(st.frac*24),24):''} of the circle`:A.step===0?'':`P(red) = ${fr(st.red.length,st.n)}`,A.narrow?W/2:W*.78,A.narrow?H*.05:H*.2,{font:`800 ${A.narrow?15:18}px system-ui`,pill:1,bg:A.alpha(C.rd,.92),col:'#fff'});
  if(A.step===0&&A.pred[0]!=null&&!st.w&&st.spins<5){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 flick the wheel round',g.cx,g.cy+g.R+30,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  if(A.step===5||A.step===6){if(!st.drag&&st.spins===0){ctx.globalAlpha=.7;P.label('tap parts to colour them red',g.cx,g.cy+g.R+30,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}};
 const steps=[
  {h:'The fairground spinner',p:'Red, blue and yellow, all the same size. You win a prize on red.',predict:{q:'What fraction of spins should land on red?',opts:['1/2 (red or not red)','1/3','1/4'],ans:1},task:'Flick the wheel round 5 times',show:()=>{for(let i=st.spins;i<5;i++){st.phi+=Math.random()*TAU;land()}},go:()=>{st.mode='eq';st.n=3;st.red=[0];st.spins=st.hits=0;chk=()=>{if(st.spins>=5)A.done(`Red came up ${st.hits} of ${st.spins}. Five spins wobble, but 3 equal parts with 1 red means P(red) = 1/3 in the long run.`+A.reveal(0))}}},
  {h:'Equal parts',p:'Keep every part the same size. Drag the red edge to change how many parts there are.',task:'Make P(red) = 1/6, like rolling a 6 on a die',show:()=>{st.n=6;upd();chk()},go:()=>{st.mode='eq';st.n=3;st.red=[0];chk=()=>{if(st.n===6)A.done('6 equal parts, 1 red: P(red) = 1/6. More equal parts, smaller chance each.')}}},
  {h:'Colours are not chances',p:'Now the red part can be any size. Only two colours: red and blue.',predict:{q:'With two colours, is P(red) always 1/2?',opts:['Yes, there are 2 colours','Only if both parts are the same size','Never'],ans:1},task:'Drag the red edge until red is 1/4 of the circle',show:()=>{st.frac=6/24;upd();chk()},go:()=>{st.mode='free';st.frac=12/24;chk=()=>{if(Math.round(st.frac*24)===6)A.done('Two colours, but red is only 1/4 of the wheel, so P(red) = 1/4. Probability counts equal chances, not colours.'+A.reveal(2))}}},
  {h:'A bag of counters',p:'Pick one counter without looking. Every counter is equally likely.',predict:{q:'A bag holds 1 green and 2 blue. P(green) is…',opts:['1/2','1/3','2/3'],ans:1},task:'Fill the bag with 6 counters so that P(green) = 1/3',show:()=>{st.bag=[1,1,0,0,0,0];upd();chk()},go:()=>{st.bag=[];chk=()=>{const n=st.bag.length,gN=st.bag.filter(x=>x).length;if(n===6&&gN===2)A.done('2 green out of 6: 2/6 = 1/3. Same chance as 1 green in 3.'+A.reveal(3))}}},
  {h:'From impossible to certain',p:'Every probability sits between 0 (impossible) and 1 (certain).',task:'Drag every card to its place on the line',show:()=>{st.cards.forEach((c_,i)=>c_.v=CARDS[i][1]);upd();chk()},go:()=>{st.cards=CARDS.map(()=>({v:null}));chk=()=>{if(st.cards.every((c_,i)=>c_.v!=null&&Math.abs(c_.v-CARDS[i][1])<=.06))A.done('0 for a 7 on a die, 1/6 for a 6, 1/4, 1/2 for heads, 1 for sunrise. Unit fractions get smaller as the bottom number grows.')}}},
  {h:'Sandbox',p:'Tap parts to colour them red, drag the edge of part 1 to change the number of parts. Flick to spin, or press 100 quick spins and compare with theory.',go:()=>{st.mode='eq';st.n=8;st.red=[0,1];st.spins=st.hits=0;chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const ang=(p,g)=>Math.atan2(p.y-g.cy,p.x-g.cx);
 const setEdge=p=>{const g=geo(A);let rel=(((ang(p,g)-st.phi)%TAU)+TAU)%TAU/TAU;if(rel<.02)rel=1;
  if(st.mode==='free'){const v=Math.max(1,Math.min(23,Math.round(rel*24)))/24;if(v!==st.frac){st.frac=v;A.sound.tick();upd();chk()}}
  else{const n=Math.max(2,Math.min(12,Math.round(1/rel)));if(n!==st.n){st.n=n;st.red=st.red.filter(i=>i<n);if(!st.red.length)st.red=[0];A.sound.tick();upd();chk()}}};
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;quick.hidden=A.step!==5;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   quick=c.el('div',{class:'fl-kb'},A.extra.parentNode);A.extra.parentNode.insertBefore(quick,chal);quick.innerHTML='<button type="button" class="lbtn sm">⚡ 100 quick spins</button> <button type="button" class="lbtn sm ghost">Reset tally</button>';
   const[b1,b2]=quick.querySelectorAll('button');b1.onclick=()=>{const p=pRed();for(let i=0;i<100;i++){st.spins++;if(Math.random()<p)st.hits++}A.sound.pop();upd()};b2.onclick=()=>{st.spins=st.hits=0;upd()};
   A.every(()=>!!st.w||!A.isDone);
   A.gest({down:p=>{const s=A.step;
     if(s===3){const g=bagG(A);for(const[x,y,gr]of g.tray)if(Math.hypot(p.x-x,p.y-y)<38){st.drag={k:'ctr',g:gr,x:p.x,y:p.y};A.sound.pop();return true}
      const sp=bagSpots(g,st.bag.length);for(let i=sp.length-1;i>=0;i--)if(Math.hypot(p.x-sp[i][0],p.y-sp[i][1])<20){st.bag.splice(i,1);A.sound.tick();upd();chk();return false}return false}
     if(s===4){for(let i=st.cards.length-1;i>=0;i--){const[x,y]=cardXY(A,i);if(Math.abs(p.x-x)<70&&Math.abs(p.y-y)<18){st.drag={k:'card',i,x:p.x,y:p.y};return true}}return false}
     if(st.w)return false;const g=geo(A),d=Math.hypot(p.x-g.cx,p.y-g.cy);
     if(s===1||s===2||s===5){const[hx,hy]=handle(A,g);if(Math.hypot(p.x-hx,p.y-hy)<30&&(s!==5||true)){st.drag={k:'edge'};return true}}
     if(d>g.R+20)return false;if(s===6&&st.won)return false;
     st.drag={k:'spin',a:ang(p,g),sw:0,x0:p.x,y0:p.y,tap:s===5||s===6};return true},
    move:p=>mv(p),
    up:p=>{if(p&&st.drag)mv(p);const d=st.drag;st.drag=null;if(!d){A.redraw();return}
     if(d.k==='ctr'){const g=bagG(A);if(Math.hypot(p.x-g.bx,p.y-g.by)<g.br*1.1&&st.bag.length<9){st.bag.push(d.g);A.sound.pop();upd();chk()}else A.redraw()}
     else if(d.k==='card'){const g=lineG(A);if(Math.abs(p.y-g.y)<90){st.cards[d.i].v=Math.max(0,Math.min(1,g.v(p.x)));A.sound.tick();if(Math.abs(st.cards[d.i].v-CARDS[d.i][1])<=.06)A.sound.pop()}upd();chk()}
     else if(d.k==='spin'){const moved=Math.hypot(p.x-d.x0,p.y-d.y0);if(d.tap&&moved<8){tapSector(p)}else if(A.step===0||A.step===5){if(Math.abs(d.sw)>.4)spin(Math.sign(d.sw)*Math.min(26,Math.max(16,Math.abs(d.sw)*8)));else A.redraw()}}
     else A.redraw()}})}});
 let quick;
 const mv=p=>{const d=st.drag;if(!d)return;if(d.k==='ctr'||d.k==='card'){d.x=p.x;d.y=p.y;A.redraw();return}if(d.k==='edge'){setEdge(p);return}
  if(d.k==='spin'&&(A.step===0||A.step===5)){const g=geo(A),a=ang(p,g);let da=a-d.a;if(da>Math.PI)da-=TAU;if(da<-Math.PI)da+=TAU;d.sw+=da;d.a=a;st.phi+=da;A.redraw()}};
 const tapSector=p=>{const g=geo(A);if(Math.hypot(p.x-g.cx,p.y-g.cy)>g.R)return;const rel=(((ang(p,g)-st.phi)%TAU)+TAU)%TAU/TAU,i=Math.floor(rel*st.n);st.red=st.red.includes(i)?st.red.filter(x=>x!==i):[...st.red,i];A.sound.tick();if(A.step===5)st.spins=st.hits=0;upd()};
 const Q=[[8,1,4],[6,1,3],[12,1,4],[8,3,4],[6,2,3],[10,1,5],[12,5,6],[10,2,5],[6,1,2],[12,1,3]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[n,k,d]=Q[qi];Object.assign(st,{mode:'eq',n,red:[],phi:-Math.PI/2,won:false,spins:0,hits:0,q:{n,k,d,ans:n*k/d}});
  chal.innerHTML=`<p><b>The spinner has ${n} equal parts. Tap parts to colour them red so that P(red) = ${k}/${d}.</b></p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm" data-ok>Check</button> <button type="button" class="lbtn sm ghost" data-clr>Clear</button></span>`;
  chal.querySelector('[data-ok]').onclick=judge;chal.querySelector('[data-clr]').onclick=()=>{st.red=[];upd()};upd()};
 const judge=()=>{const q=st.q,fb=chal.querySelector('.fl-fb'),r=st.red.length;if(!q||st.won)return;
  if(r===q.ans){st.won=true;fb.innerHTML=`✓ ${r} of ${q.n} equal parts: ${r}/${q.n}${r/q.n!==q.k/q.d||gcd(r,q.n)>1?' = '+q.k+'/'+q.d:''}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=r===q.k&&q.k!==q.ans?`You coloured ${r} part${r>1?'s':''}, which is ${fr(r,q.n)} of this spinner. ${q.k}/${q.d} means ${q.k} out of every ${q.d} parts: with ${q.n} parts that is ${q.ans}.`
   :r===q.d?`You coloured ${q.d} parts (the bottom number). But there are ${q.n} parts here, so that makes ${fr(r,q.n)}.`
   :r===q.n-q.ans?`That is P(not red): ${fr(r,q.n)} is the blue part. Swap: colour ${q.ans}.`
   :r===0?'Tap some parts to colour them red first.':`${r} of ${q.n} is ${fr(r,q.n)}, not ${q.k}/${q.d}. How many parts out of ${q.n} make ${q.k}/${q.d}?`};
 A.start()})})();
