/* Flagship 3 – equivalent fractions. Hook: two pizzas cut differently – who ate more? Sim: a chocolate bar that can be re-sliced
   (every piece splits into k, so top and bottom both multiply by k) and re-merged (simplify), with a number line proving the point never moves.
   Sandbox with sliders, then a misconception-aware challenge (adding instead of multiplying, scaling only one part, "bigger denominator = bigger"). */
(()=>{const gcd=(a,b)=>b?gcd(b,a%b):a;
VIS.reg('flagfrac',c=>{let A,chal,ops;const f={n:1,d:2,k:1,kv:1,cut:1,mg:0},hk={t:0};
 const setF=(n,d,k)=>{f.n=n;f.d=d;f.k=k||1;f.kv=f.k;f.cut=1;A.redraw()};
 const split=k=>{f.k=k;f.cut=0;A.tween(f,{cut:1},900,'io');f.kv=k;A.sound.pop();upd()};
 const upd=()=>{const N=f.n*f.k,D=f.d*f.k;c.say(f.k>1?`${f.n}/${f.d} = ${N}/${D}`:f.from?`${f.from.N}/${f.from.D} = ${f.n}/${f.d}`:`${f.n}/${f.d} of the bar`);A.cv.setAttribute('aria-label',A.step===0?'Illustration: two equal pizzas. Ada cut hers into 4 slices and ate 2; Ben cut his into 8 slices and ate 4.':`A bar cut into ${D} equal pieces with ${N} shaded, so ${N}/${D}, the same amount as ${f.n}/${f.d}. A number line below marks the same point.`);A.redraw()};
 const pizza=(A,x,y,r,d,eat,t,name)=>{const{ctx,paint:P}=A;P.shadow(18,8,.35);ctx.fillStyle=P.rad(x,y,r*.6,r,[[0,'#fde68a'],[.8,'#f59e0b'],[1,'#b45309']]);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();P.noShadow();
  ctx.fillStyle=P.rad(x,y,0,r*.86,[[0,'#ef4444'],[1,'#b91c1c']]);ctx.beginPath();ctx.arc(x,y,r*.86,0,7);ctx.fill();
  for(let i=0;i<9;i++){const a=i*2.4,rr=r*(.25+.5*((i*37)%10)/10);P.ball(x+Math.cos(a)*rr,y+Math.sin(a)*rr,r*.08,'#7f1d1d')}
  const ea=Math.min(eat,t*d)/d;ctx.fillStyle='rgba(30,14,6,.88)';ctx.globalAlpha=1;ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,r+2,-Math.PI/2,-Math.PI/2+ea*Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  ctx.strokeStyle='#fff7ed';ctx.lineWidth=2.5;for(let i=0;i<d;i++){const a=-Math.PI/2+i*Math.PI*2/d;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);ctx.stroke()}
  P.label(`${name}: ${eat} of ${d} slices`,x,y+r+22,{bg:'#0f172a'})};
 const hook=(A,dt)=>{const{ctx,W,H,paint:P}=A;hk.t=Math.min(1.2,hk.t+dt/2.2);ctx.fillStyle=P.lin(0,0,0,H,[[0,'#3b0764'],[1,'#1e1b4b']]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=P.lin(0,H*.55,0,H,[[0,'#92400e'],[1,'#451a03']]);ctx.fillRect(0,H*.55,W,H*.45);for(let i=0;i<W;i+=40){ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(i,H*.55,2,H*.45)}
  ctx.fillStyle=P.rad(W/2,0,0,W*.6,[[0,'rgba(253,224,71,.25)'],[1,'rgba(253,224,71,0)']]);ctx.fillRect(0,0,W,H*.55);const r=Math.min(W*.2,H*.28);pizza(A,W*.28,H*.5,r,4,2,hk.t,'Ada');pizza(A,W*.72,H*.5,r,8,4,hk.t,'Ben');
  P.label('Who ate more?',W/2,H*.1,{font:'700 18px system-ui',bg:'#0f172a'});return hk.t<1.2};
 const kn={on:false,pts:[]};
 const sim=A=>{const{ctx,W,H,paint:P,col:C}=A,N=f.n*f.k,D=f.d*f.k,bx=W*.08,bw=W*.84,by=H*.1,bh=H*.4;f.g={bx,bw,by,bh};A.g=f.g;A.f=f;
  ctx.fillStyle=P.rad(W/2,by,0,W*.7,[[0,A.alpha(C.am,C.dark?.10:.08)],[1,'rgba(0,0,0,0)']]);ctx.fillRect(0,0,W,H);
  const pop=f.pop||0,sc=1+pop*.03;ctx.save();ctx.translate(bx+bw/2,by+bh/2);ctx.scale(sc,sc);ctx.translate(-(bx+bw/2),-(by+bh/2));
  P.shadow(24,12,.4);ctx.fillStyle=P.lin(0,by,0,by+bh,[[0,'#2a1206'],[1,'#1a0b03']]);P.rrect(bx,by,bw,bh,12);ctx.fill();P.noShadow();
  ctx.save();P.rrect(bx,by,bw,bh,12);ctx.clip();
  const cw=bw/f.d,rh=bh/f.k;for(let i=0;i<f.d;i++)for(let j=0;j<f.k;j++){const x=bx+i*cw,y=by+j*rh,sh=i<f.n;
   const ix=x+3,iy=y+3,iw=cw-6,ih=rh-6,rr=Math.min(7,ih/4),c1=sh?'#a8622f':'#5a2e14',c2=sh?'#6e3712':'#3a1b0a';
   ctx.fillStyle=P.lin(ix,iy,ix,iy+ih,[[0,c1],[1,c2]]);P.rrect(ix,iy,iw,ih,rr);ctx.fill();
   const b=Math.max(3,Math.min(8,ih*.14));ctx.fillStyle=P.lin(ix,iy,ix+iw,iy+ih,[[0,sh?'rgba(255,214,170,.55)':'rgba(255,200,160,.18)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.45)']]);P.rrect(ix,iy,iw,ih,rr);ctx.fill();
   ctx.fillStyle=P.lin(ix,iy+b,ix,iy+ih-b,[[0,c1],[1,A.mix(c1,c2,.6)]]);P.rrect(ix+b,iy+b,iw-2*b,ih-2*b,Math.max(2,rr-2));ctx.fill();
   ctx.fillStyle=sh?'rgba(255,240,220,.28)':'rgba(255,240,220,.08)';ctx.beginPath();ctx.ellipse(ix+iw*.35,iy+b+ih*.12,iw*.25,Math.max(1.5,ih*.06),0,0,7);ctx.fill();
   if(sh){ctx.strokeStyle=A.alpha(C.am,.9);ctx.lineWidth=2;P.rrect(ix+1,iy+1,iw-2,ih-2,rr);ctx.stroke()}}
  ctx.restore();ctx.restore();
  if(kn.on&&kn.pts.length>1){ctx.strokeStyle=A.alpha('#e0f2fe',.85);ctx.lineWidth=3;P.glow('#bae6fd',12);ctx.beginPath();kn.pts.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.stroke();P.noShadow();
   const q=kn.pts[kn.pts.length-1];ctx.save();ctx.translate(q.x,q.y);ctx.rotate(-.5);P.shadow(10,5,.4);ctx.fillStyle=P.lin(0,-6,0,6,[[0,'#f8fafc'],[.5,'#94a3b8'],[1,'#e2e8f0']]);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(46,-7);ctx.lineTo(48,4);ctx.closePath();ctx.fill();ctx.fillStyle='#1f2937';P.rrect(46,-6,30,11,4);ctx.fill();P.noShadow();ctx.restore()}
  if(f.d<2)P.label('one whole bar',bx+bw/2,by+bh*.82,{pill:1,bg:'rgba(0,0,0,.45)',col:'#fff'});
  const big=A.narrow?28:36,fy=by+bh+H*.1;
  if(f.d>=2&&f.from&&f.k===1){P.label(`${f.from.N}/${f.from.D}`,W*.24,fy,{font:`700 ${big*.8}px system-ui`,col:C.mu});P.label(`÷ ${f.from.by} →`,W*.47,fy,{pill:1,bg:A.alpha(C.vi,.85),col:'#fff'});P.label(`${f.n}/${f.d}`,W*.72,fy,{font:`800 ${big}px system-ui`,col:C.gr});P.label('top and bottom both ÷ '+f.from.by+' (simplest form)',W*.5,fy+big*.95,{font:'600 12px system-ui'})}else if(f.d>=2){P.label(`${f.n}/${f.d}`,W*.3,fy,{font:`800 ${big}px system-ui`,col:C.am});if(f.k>1){P.label('=',W*.5,fy,{font:`800 ${big}px system-ui`});P.label(`${N}/${D}`,W*.7,fy,{font:`800 ${big}px system-ui`,col:C.gr});P.label(`top and bottom both × ${f.k}`,W*.5,fy+big*.95,{pill:1,bg:A.alpha(C.vi,.85),col:'#fff'})}}
  if(f.from&&f.k===1&&f.d>=2){const gy=by+bh/2;ctx.globalAlpha=.25+.6*(f.gh||0);ctx.strokeStyle=C.am;ctx.setLineDash([5,5]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx+6,gy);ctx.lineTo(bx+bw-6,gy);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
   for(let i=0;i<f.d;i++){const x=bx+i*bw/f.d;ctx.strokeStyle=A.alpha('#fff',.55);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+8,by-6);ctx.lineTo(x+8,by-11);ctx.lineTo(x+bw/f.d-8,by-11);ctx.lineTo(x+bw/f.d-8,by-6);ctx.stroke()}
   P.label(`each 1/${f.d} = ${f.from.by} pieces of 1/${f.from.D}`,bx+bw/2,by-22,{font:'600 12px system-ui'})}
  if(A.step===5){const kx=bx+bw*f.n/f.d,ky=by+bh+16;P.glow(A.alpha(C.or,.8),14);P.ball(kx,ky,11,C.or);P.noShadow();ctx.fillStyle='#111';ctx.font='700 11px system-ui';ctx.textAlign='center';ctx.fillText('⇔',kx,ky+4)}
  const ly=H*.88,lx=bx,lw=bw;ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(lx+lw,ly);ctx.stroke();
  for(let i=0;i<=D;i++){const x=lx+lw*i/D,maj=i%f.k===0;ctx.lineWidth=maj?2.5:1;ctx.globalAlpha=maj?1:.6;ctx.beginPath();ctx.moveTo(x,ly-(maj?10:6));ctx.lineTo(x,ly+(maj?10:6));ctx.stroke()}ctx.globalAlpha=1;
  P.label('0',lx,ly+22,{});P.label('1',lx+lw,ly+22,{});if(f.d>=2){const px=lx+lw*f.n/f.d;ctx.strokeStyle=A.alpha(C.gr,.55);ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(px,by+bh+6);ctx.lineTo(px,ly-10);ctx.stroke();ctx.setLineDash([]);P.glow(A.alpha(C.gr,.8),18);P.ball(px,ly,8,C.gr);P.noShadow()}
  const hint=!A.isDone&&A.step>=1&&A.step<=4&&!kn.on;if(hint){const u=A.reduced()?.5:(performance.now()%1800)/1800;ctx.globalAlpha=Math.sin(u*Math.PI)*.8+.2;
   if(A.step===1)P.label('👆 swipe down ↓',bx+bw/2,by+bh*(.15+.6*u),{pill:1,bg:A.alpha(C.am,.92),col:'#111'});
   else if(A.step===4){const y=by+bh/2;ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(bx+6,y);ctx.lineTo(bx+bw-6,y);ctx.stroke();ctx.setLineDash([]);P.label('👆 tap this cut',bx+bw/2,y-18,{pill:1,bg:A.alpha(C.am,.92),col:'#111'})}
   else P.label('👆 swipe across →',bx+bw*(.2+.6*u),by+bh*(.5/f.k),{pill:1,bg:A.alpha(C.am,.92),col:'#111'});ctx.globalAlpha=1}
  return hint};
 const addRow=()=>{f.from=null;if(f.k>=6){A.sound.miss();c.say('That is as thin as the chocolate goes.');return}f.k++;f.pop=1;A.tween(f,{pop:0},450,'back');A.sound.pop();const g=f.g;if(g)A.fx.add(10,i=>({x:g.bx+Math.random()*g.bw,y:g.by+g.bh*(f.k-1)/f.k,vx:(Math.random()-.5)*120,vy:-Math.random()*120,g:600,life:.7,r:2,col:'#92400e',drag:.4}));upd();chk()};
 const rmRow=()=>{if(f.k<=1)return;f.from={N:f.n*f.k,D:f.d*f.k,by:f.k/(f.k-1)};f.gh=1;A.tween(f,{gh:0},1600,'out');f.k--;f.pop=1;A.tween(f,{pop:0},450,'back');A.sound.whoosh();upd();chk()};
 const chk=()=>{const k=A.step;if(k===1&&f.d===2)A.done('Two equal pieces, one shaded: 1/2.');if(k===2&&f.k===2)A.done('Every piece split in two: 2 of 4 shaded. 1/2 = 2/4.'+A.reveal(2));if(k===3&&f.k===4)A.done('8 pieces, 4 shaded: 4/8 is the same amount as 1/2. Ada and Ben ate the same.');if(k===4&&f.k===1&&f.n===3)A.done('6/8 = 3/4. Fewer, bigger pieces; the dot didn’t move.'+A.reveal(4))};
 const addCol=()=>{if(f.d>=8){A.sound.miss();return}f.d++;f.from=null;f.pop=1;A.tween(f,{pop:0},450,'back');A.sound.pop();upd()};
 const rmCol=()=>{if(f.d<=2)return;f.d--;f.n=Math.min(f.n,f.d);f.from=null;f.pop=1;A.tween(f,{pop:0},450,'back');A.sound.whoosh();upd()};
 const cut2=()=>{setF(1,2,1);f.pop=1;A.tween(f,{pop:0},450,'back');A.sound.pop();upd();chk()};
 const steps=[
  {h:'Who ate more pizza?',p:'Ada cut her pizza into 4 slices and ate 2. Ben cut his into 8 and ate 4. Ben ate more slices. Did he eat more pizza?',go:()=>{hk.t=0}},
  {h:'Cut the bar',p:'Here is one whole chocolate bar. Half of it is yours.',task:'Swipe down the middle to cut it into 2 equal pieces',show:()=>cut2(),go:()=>setF(0,1,1)},
  {h:'Cut again',p:'Now slice across the bar.',predict:{q:'If every piece is cut in two, the shaded amount of chocolate will be…',opts:['more','the same','less'],ans:1},task:'Swipe across the bar to cut every piece in two',show:()=>addRow(),go:()=>setF(1,2,1)},
  {h:'Ada and Ben',p:'That’s Ada’s 2/4. Can you turn it into Ben’s 4/8?',task:'Keep slicing across until there are 8 pieces',show:()=>{while(f.k<4)addRow()},go:()=>setF(1,2,2)},
  {h:'Run it backwards',p:'This is 6/8 of the bar.',predict:{q:'6/8 is the same amount as…',opts:['3/4','2/3','3/8'],ans:0},task:'Tap the cut across the middle to remove it',show:()=>rmRow(),go:()=>setF(3,4,2)},
  {h:'Sandbox',p:'Drag the orange knob to change how much is shaded. Swipe down to add a column, across to slice, tap a cut to remove it. Which moves the dot, and which doesn’t?',go:()=>{setF(2,3,1);f.from=null}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const syncIn=()=>{if(!ops)return;ops.querySelector('.fl-n').value=f.n;ops.querySelector('.fl-d').value=f.d;ops.querySelector('.fl-k').value=f.k};
 const syncS=()=>{if(!ops||A.step!==5)return;const g=k=>+ops.querySelector(k).value;let n=g('.fl-n'),d=g('.fl-d');if(n>d)n=d;f.n=n;f.d=d;const k=g('.fl-k');if(k!==f.k){f.k=k;f.pop=1;A.tween(f,{pop:0},450,'back')}ops.querySelector('output').textContent=`${n}/${d}, k = ${k}`;upd()};
 A=FK.shell(c,{steps,ratio:.56,tall:.9,draw:(A,dt)=>A.step===0?hook(A,dt):sim(A),onStep:A=>{ops.hidden=A.step!==5;if(A.step===5)syncIn();chal.hidden=A.step!==6;upd()},
  init:A=>{const E=c.el;ops=E('div',{class:'fl-ctl'},A.below);ops.innerHTML='<details class="fl-kbd"><summary>Keyboard controls</summary><label>Top <input type="range" class="fl-n" min="1" max="6" value="2"></label><label>Bottom <input type="range" class="fl-d" min="2" max="8" value="3"></label><label>Slice each piece into <input type="range" class="fl-k" min="1" max="4" value="1"></label> <output></output></details>';
   ops.querySelectorAll('input').forEach(i=>i.oninput=syncS);A.every(()=>A.step===0&&hk.t<1.2||!A.isDone&&A.step>=1&&A.step<=4);
   A.gest({down:p=>{if(A.step<1||A.step===6||!f.g)return false;const g=f.g;if(A.step===5&&Math.hypot(p.x-(g.bx+g.bw*f.n/f.d),p.y-(g.by+g.bh+16))<30){kn.knob=1;A.sound.tick();return true}kn.on=true;kn.pts=[p];return true},move:p=>{if(kn.knob){const g=f.g,n=Math.max(0,Math.min(f.d,Math.round((p.x-g.bx)/(g.bw/f.d))));if(n!==f.n){f.n=n;A.sound.tick();upd()}return}kn.pts.push(p);if(kn.pts.length>40)kn.pts.shift();A.redraw()},
    up:p=>{if(kn.knob){kn.knob=0;return}const g=f.g,a=kn.pts[0],b=p||kn.pts[kn.pts.length-1];kn.on=false;A.redraw();if(!a||!b)return;const dx=Math.abs(b.x-a.x),dy=Math.abs(b.y-a.y),tap=dx<12&&dy<12,inBar=y=>y>g.by-30&&y<g.by+g.bh+30;
     if(tap){if(A.step===5){const i=Math.round((b.x-g.bx)/(g.bw/f.d));if(i>0&&i<f.d&&Math.abs(b.x-(g.bx+i*g.bw/f.d))<16&&inBar(b.y)){rmCol();return}}if(f.k>1&&A.step>=4){const j=Math.round((b.y-g.by)/(g.bh/f.k));if(j>0&&j<f.k&&Math.abs(b.y-(g.by+j*g.bh/f.k))<24)rmRow()}return}
     if(A.step===1&&dy>g.bh*.5){if(Math.abs((a.x+b.x)/2-(g.bx+g.bw/2))<g.bw*.15)cut2();else{A.sound.miss();c.say('Those pieces would not be equal. Cut down the middle.')}return}
     if(A.step===5&&dy>g.bh*.6&&dx<g.bw*.25){addCol();return}if(A.step>=2&&f.d>=2&&dx>g.bw*.5&&inBar((a.y+b.y)/2))addRow()}});
chal=E('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling)}});
 const Q=[[3,4,12],[2,3,9],[1,2,10],[5,6,12],[2,5,15],[3,8,16],[4,5,20]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[n,d,D]=Q[qi],k=D/d,ans=n*k;setF(n,d,1);
  chal.innerHTML=`<p><b>${n}/${d} = ?/${D}</b> How many of the ${D} pieces should be shaded?</p><label>Top number <input type="text" inputmode="numeric" class="fl-in" aria-label="missing top number"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const fb=chal.querySelector('.fl-fb'),ip=chal.querySelector('input');chal.querySelector('button').onclick=()=>{const v=parseInt(ip.value,10);if(!isFinite(v)){fb.textContent='Type a whole number first.';return}
   if(v===ans){f.k=k;f.pop=1;A.tween(f,{pop:0},450,'back');upd();fb.innerHTML=`✓ Each piece split into ${k}, so ${n} × ${k} = ${ans}: ${n}/${d} = ${ans}/${D}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   A.sound.miss();fb.textContent=v===n+(D-d)?`You added ${D-d} to the top because ${D-d} was added to the bottom. Adding changes the amount: the bottom was multiplied by ${k}, so the top must be too.`:
    v===n?`Keeping the top as ${n} means ${n}/${D}, which is smaller: the pieces got smaller but you kept the same number of them. Multiply the top by ${k} as well.`:
    v>D?`That’s more pieces than the bar has. ${n}/${d} is less than one whole.`:`Not quite. ${d} × ${k} = ${D}, so each piece split into ${k}. Multiply the top by ${k} too.`}};
 A.start()})})();
