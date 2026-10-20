/* Flagship 3 – equivalent fractions. Hook: two pizzas cut differently – who ate more? Sim: a chocolate bar that can be re-sliced
   (every piece splits into k, so top and bottom both multiply by k) and re-merged (simplify), with a number line proving the point never moves.
   Sandbox with sliders, then a misconception-aware challenge (adding instead of multiplying, scaling only one part, "bigger denominator = bigger"). */
(()=>{const gcd=(a,b)=>b?gcd(b,a%b):a;
VIS.reg('flagfrac',c=>{let A,chal,ops;const f={n:1,d:2,k:1,kv:1,cut:1,mg:0},hk={t:0};
 const setF=(n,d,k)=>{f.n=n;f.d=d;f.k=k||1;f.kv=f.k;f.cut=1;A.redraw()};
 const split=k=>{f.k=k;f.cut=0;A.tween(f,{cut:1},900,'io');f.kv=k;A.sound.pop();upd()};
 const upd=()=>{const N=f.n*f.k,D=f.d*f.k;c.say(`${f.n}/${f.d} = ${N}/${D}`);A.cv.setAttribute('aria-label',A.step===0?'Illustration: two equal pizzas. Ada cut hers into 4 slices and ate 2; Ben cut his into 8 slices and ate 4.':`A bar cut into ${D} equal pieces with ${N} shaded, so ${N}/${D}, the same amount as ${f.n}/${f.d}. A number line below marks the same point.`);A.redraw()};
 const pizza=(A,x,y,r,d,eat,t,name)=>{const{ctx,paint:P}=A;P.shadow(18,8,.35);ctx.fillStyle=P.rad(x,y,r*.6,r,[[0,'#fde68a'],[.8,'#f59e0b'],[1,'#b45309']]);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();P.noShadow();
  ctx.fillStyle=P.rad(x,y,0,r*.86,[[0,'#ef4444'],[1,'#b91c1c']]);ctx.beginPath();ctx.arc(x,y,r*.86,0,7);ctx.fill();
  for(let i=0;i<9;i++){const a=i*2.4,rr=r*(.25+.5*((i*37)%10)/10);P.ball(x+Math.cos(a)*rr,y+Math.sin(a)*rr,r*.08,'#7f1d1d')}
  const ea=Math.min(eat,t*d)/d;ctx.fillStyle=A.col.panel;ctx.globalAlpha=.92;ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,r+2,-Math.PI/2,-Math.PI/2+ea*Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  ctx.strokeStyle='#fff7ed';ctx.lineWidth=2.5;for(let i=0;i<d;i++){const a=-Math.PI/2+i*Math.PI*2/d;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);ctx.stroke()}
  P.label(`${name}: ${eat} of ${d} slices`,x,y+r+22,{bg:'#0f172a'})};
 const hook=(A,dt)=>{const{ctx,W,H,paint:P}=A;hk.t=Math.min(1.2,hk.t+dt/2600);ctx.fillStyle=P.lin(0,0,0,H,[[0,'#3b0764'],[1,'#1e1b4b']]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=P.lin(0,H*.55,0,H,[[0,'#92400e'],[1,'#451a03']]);ctx.fillRect(0,H*.55,W,H*.45);for(let i=0;i<W;i+=40){ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(i,H*.55,2,H*.45)}
  ctx.fillStyle=P.rad(W/2,0,0,W*.6,[[0,'rgba(253,224,71,.25)'],[1,'rgba(253,224,71,0)']]);ctx.fillRect(0,0,W,H*.55);const r=Math.min(W*.2,H*.28);pizza(A,W*.28,H*.5,r,4,2,hk.t,'Ada');pizza(A,W*.72,H*.5,r,8,4,hk.t,'Ben');
  P.label('Who ate more?',W/2,H*.1,{font:'700 18px system-ui',bg:'#0f172a'});return hk.t<1.2};
 const sim=A=>{const{ctx,W,H,paint:P,col:C}=A,N=f.n*f.k,D=f.d*f.k,bx=W*.08,bw=W*.84,by=H*.12,bh=H*.4;
  P.shadow(20,10,.35);ctx.fillStyle=P.lin(0,by,0,by+bh,[[0,'#7c2d12'],[1,'#451a03']]);P.rrect(bx,by,bw,bh,10);ctx.fill();P.noShadow();
  const cw=bw/f.d;for(let i=0;i<f.d;i++){if(i<f.n){ctx.fillStyle=P.lin(0,by,0,by+bh,[[0,'#fbbf24'],[1,'#d97706']]);P.rrect(bx+i*cw+3,by+3,cw-6,bh-6,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(bx+i*cw+6,by+6,cw-12,bh*.12)}}
  ctx.strokeStyle=C.dark?'#fef3c7':'#fff';ctx.lineWidth=3;for(let i=1;i<f.d;i++){ctx.beginPath();ctx.moveTo(bx+i*cw,by);ctx.lineTo(bx+i*cw,by+bh);ctx.stroke()}
  ctx.lineWidth=1.5;ctx.setLineDash([6,4]);for(let j=1;j<f.k;j++){const yy=by+bh*j/f.k,len=bw*f.cut;ctx.globalAlpha=f.cut;ctx.beginPath();ctx.moveTo(bx,yy);ctx.lineTo(bx+len,yy);ctx.stroke()}ctx.setLineDash([]);ctx.globalAlpha=1;
  const big=A.narrow?30:36;P.label(`${f.n}/${f.d}`,W*.3,by+bh+H*.1,{font:`800 ${big}px system-ui`,col:C.am});P.label('=',W*.5,by+bh+H*.1,{font:`800 ${big}px system-ui`});P.label(`${N}/${D}`,W*.7,by+bh+H*.1,{font:`800 ${big}px system-ui`,col:C.gr});
  if(f.k>1)P.label(`both × ${f.k}`,W*.5,by+bh+H*.18,{pill:1,bg:A.alpha(C.vi,.85),col:'#fff'});
  const ly=H*.86,lx=bx,lw=bw;ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(lx+lw,ly);ctx.stroke();
  for(let i=0;i<=D;i++){const x=lx+lw*i/D,maj=i%f.k===0;ctx.lineWidth=maj?2.5:1;ctx.globalAlpha=maj?1:.6;ctx.beginPath();ctx.moveTo(x,ly-(maj?10:6));ctx.lineTo(x,ly+(maj?10:6));ctx.stroke()}ctx.globalAlpha=1;
  P.label('0',lx,ly+22,{});P.label('1',lx+lw,ly+22,{});const px=lx+lw*f.n/f.d;P.glow(A.alpha(C.gr,.8),18);P.ball(px,ly,8,C.gr);P.noShadow();
  ctx.strokeStyle=A.alpha(C.gr,.5);ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(px,by+bh);ctx.lineTo(px,ly-10);ctx.stroke();ctx.setLineDash([])};
 const steps=[
  {h:'Who ate more pizza?',p:'Ada cut her pizza into 4 slices and ate 2. Ben cut an identical pizza into 8 slices and ate 4. Ben ate more slices… but did he eat more pizza?',go:()=>{hk.t=0}},
  {h:'1 · Half a bar',p:'Here is a chocolate bar cut into 2 equal pieces. 1 piece is shaded: one half, 1/2. The green dot marks 1/2 on the number line.',go:()=>setF(1,2,1)},
  {h:'2 · Slice again',p:'Now cut across. Every piece splits in two, so there are twice as many pieces (4) and twice as many shaded (2). The chocolate didn’t change: 1/2 = 2/4.',go:()=>{setF(1,2,1);setTimeout(()=>split(2),400)}},
  {h:'3 · Slice into four',p:'Cut every piece into 4: 4 × as many pieces, 4 × as many shaded. 1/2 = 4/8. That is Ada and Ben: 2/4 = 4/8, the same amount of pizza.',go:()=>{setF(1,2,1);setTimeout(()=>split(4),400)}},
  {h:'4 · Run it backwards',p:'6/8 looks complicated. Group the eighths in twos and it becomes 3/4. Dividing top and bottom by the same number is simplifying; the dot does not move.',go:()=>{setF(3,4,2);f.cut=1;setTimeout(()=>{f.cut=1;A.tween(f,{cut:0},1000,'io');setTimeout(()=>{f.k=1;f.cut=1;A.sound.pop();upd()},1050)},700)}},
  {h:'Sandbox',p:'Choose a fraction, then slice each piece into k. Watch the dot on the number line: it never moves.',go:()=>{setF(2,3,1);syncS()}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const syncS=()=>{if(!ops)return;const g=k=>+ops.querySelector(k).value;let n=g('.fl-n'),d=g('.fl-d');if(n>d)n=d;f.n=n;f.d=d;const k=g('.fl-k');if(k!==f.k)split(k);ops.querySelector('output').textContent=`${n}/${d}, k = ${k}`;upd()};
 A=FK.shell(c,{steps,ratio:.56,tall:.9,draw:(A,dt)=>A.step===0?hook(A,dt):(sim(A),f.cut<1),onStep:A=>{ops.hidden=A.step!==5;chal.hidden=A.step!==6;upd()},
  init:A=>{const E=c.el;ops=E('div',{class:'fl-ctl'},A.below);ops.innerHTML='<label>Top <input type="range" class="fl-n" min="1" max="6" value="2"></label><label>Bottom <input type="range" class="fl-d" min="2" max="6" value="3"></label><label>Slice each piece into <input type="range" class="fl-k" min="1" max="4" value="1"></label> <output></output>';
   ops.querySelectorAll('input').forEach(i=>i.oninput=syncS);chal=E('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling)}});
 const Q=[[3,4,12],[2,3,9],[1,2,10],[5,6,12],[2,5,15],[3,8,16],[4,5,20]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[n,d,D]=Q[qi],k=D/d,ans=n*k;setF(n,d,1);
  chal.innerHTML=`<p><b>${n}/${d} = ?/${D}</b> How many of the ${D} pieces should be shaded?</p><label>Top number <input type="text" inputmode="numeric" class="fl-in" aria-label="missing top number"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const fb=chal.querySelector('.fl-fb'),ip=chal.querySelector('input');chal.querySelector('button').onclick=()=>{const v=parseInt(ip.value,10);if(!isFinite(v)){fb.textContent='Type a whole number first.';return}
   if(v===ans){split(k);fb.innerHTML=`✓ Each piece split into ${k}, so ${n} × ${k} = ${ans}: ${n}/${d} = ${ans}/${D}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   A.sound.miss();fb.textContent=v===n+(D-d)?`You added ${D-d} to the top because ${D-d} was added to the bottom. Adding changes the amount: the bottom was multiplied by ${k}, so the top must be too.`:
    v===n?`Keeping the top as ${n} means ${n}/${D}, which is smaller: the pieces got smaller but you kept the same number of them. Multiply the top by ${k} as well.`:
    v>D?`That’s more pieces than the bar has. ${n}/${d} is less than one whole.`:`Not quite. ${d} × ${k} = ${D}, so each piece split into ${k}. Multiply the top by ${k} too.`}};
 A.start()})})();
