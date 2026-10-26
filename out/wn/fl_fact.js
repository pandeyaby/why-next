/* Flagship 22 – factorising x² + bx + c. An algebra-tile rectangle: one x² tile in the corner, then the learner drags the
   far corner to choose how many x-strips run along the top (the first bracket number p) and down the side (the second
   bracket number q). The p × q block of unit tiles in the corner is the constant: only numbers that multiply to c fill it.
   The strips are the middle term: p + q of them, and a pink (negative) strip cancels a green one as a zero pair.
   Tap a bracket label on the canvas, or use the buttons, to make a number negative. Predictions target "(x + b)(x + c)",
   a factor pair with the wrong sum, swapped signs, and "x² − 9 cannot be factorised". Challenge: build the rectangle for a
   new quadratic and press Check; feedback names the slip (right product but wrong sum, sum right but wrong product,
   both signs flipped, b and c copied straight into the brackets, or a positive c built from opposite signs). */
(()=>{const MAX=8,SIDE=4,sgn=v=>v<0?-1:1,N=v=>v<0?'−'+(-v):String(v),Q=v=>v<0?'(−'+(-v)+')':String(v);
 const term=(k,v)=>k===0?'':(k<0?' − ':' + ')+(Math.abs(k)===1&&v?'':Math.abs(k))+v;
 const quad=(b,c)=>'x²'+term(b,'x')+term(c,'');
 const bracket=n=>n===0?'x':`(x ${n<0?'−':'+'} ${Math.abs(n)})`;
 const pair=(p,q)=>p===0&&q===0?'x × x':p===0?'x'+bracket(q):q===0?'x'+bracket(p):bracket(p)+bracket(q);
 const spoken=n=>n<0?'minus '+(-n):String(n);
VIS.reg('flagfact',c=>{let A,chal,sand,read,btns;const zones=[];
 const st={p:1,q:1,sp:1,sq:1,b:5,c:6,grab:false,glow:0,chk:()=>{},won:false,run:0,pulse:0};
 const sum=()=>st.p+st.q,prod=()=>st.p*st.q,match=()=>sum()===st.b&&prod()===st.c;
 function setPQ(p,q,quiet){st.p=Math.max(-MAX,Math.min(MAX,p));st.q=Math.max(-MAX,Math.min(MAX,q));if(st.p)st.sp=sgn(st.p);if(st.q)st.sq=sgn(st.q);
  if(!quiet)status();sync();st.chk()}
 // what the rectangle says right now, in words
 function status(){const s=sum(),k=prod(),okP=k===st.c,okS=s===st.b;let t=`${pair(st.p,st.q)} = ${quad(s,k)}. `;
  t+=okP?`The corner block has ${Math.abs(k)} unit tiles, matching ${N(st.c)} ✓. `:`The corner block makes ${N(k)}, but the target needs ${N(st.c)}. `;
  if(st.p*st.q<0||(st.p<0&&st.q<0))t+=`Strips: ${Math.abs(st.p)} ${st.p<0?'pink':'green'} and ${Math.abs(st.q)} ${st.q<0?'pink':'green'}, so ${N(s)}x after zero pairs cancel. `;
  t+=okS?`The strips make ${N(s)}x ✓.`:`The strips make ${N(s)}x, the target needs ${N(st.b)}x.`;tell(t)}
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 function describe(){return `Algebra tile rectangle for ${pair(st.p,st.q)}: one x² tile, ${Math.abs(st.p)} ${st.p<0?'negative':'positive'} x strips along the top, ${Math.abs(st.q)} ${st.q<0?'negative':'positive'} x strips down the side, and ${Math.abs(prod())} ${prod()<0?'negative':'positive'} unit tiles in the corner. It equals ${quad(sum(),prod())}. Target ${quad(st.b,st.c)}: ${match()?'matched':'not matched yet'}.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(btns)btns.querySelectorAll('button').forEach(b=>{const k=b.dataset.k;b.disabled=(k==='p-'&&st.p<=-MAX)||(k==='p+'&&st.p>=MAX)||(k==='q-'&&st.q<=-MAX)||(k==='q+'&&st.q>=MAX)});A.redraw()}
 // ---------- layout and drawing ----------
 function geo(A){const top=A.narrow?110:92,left=A.narrow?40:56,u=Math.floor(Math.min((A.W-left-18)/(SIDE+MAX),(A.H-top-30)/(SIDE+MAX)));return{top,left,u,X:SIDE*u}}
 function tile(A,x,y,w,h,col,neg){const{ctx,paint:P}=A;ctx.fillStyle=P.lin(x,y,x,y+h,[[0,A.mix(col,'#ffffff',.18)],[1,col]]);P.rrect(x+1,y+1,w-2,h-2,Math.min(5,w/4));ctx.fill();
  ctx.strokeStyle=A.alpha('#000000',.22);ctx.lineWidth=1;ctx.stroke();if(neg&&w>9&&h>9){ctx.strokeStyle='#fff';ctx.lineWidth=2;const m=Math.min(w,h)*.22;ctx.beginPath();ctx.moveTo(x+w/2-m,y+h/2);ctx.lineTo(x+w/2+m,y+h/2);ctx.stroke()}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A,g=geo(A),{top,left,u,X}=g,ap=Math.abs(st.p),aq=Math.abs(st.q);zones.length=0;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.gr,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  // header: target, then what the rectangle makes
  ctx.textAlign='left';ctx.textBaseline='alphabetic';const f1=A.narrow?17:20;ctx.font=`700 ${f1}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText('Target: '+quad(st.b,st.c),14,f1+10);
  const ok=match(),line=`${pair(st.p,st.q)} = ${quad(sum(),prod())}`;ctx.font=`600 ${A.narrow?15:17}px system-ui`;ctx.fillStyle=ok?C.gr:A.alpha(C.tx,.8);ctx.fillText(line+(ok?'  ✓':''),14,f1+36);
  const sx=W-14;ctx.textAlign='right';ctx.font='600 12px system-ui';ctx.fillStyle=prod()===st.c?C.gr:C.mu;ctx.fillText(`multiply: ${N(st.p)} × ${Q(st.q)} = ${N(prod())}${prod()===st.c?' ✓':''}`,sx,A.narrow?f1+56:18);
  ctx.fillStyle=sum()===st.b?C.gr:C.mu;ctx.fillText(`add: ${N(st.p)} + ${Q(st.q)} = ${N(sum())}${sum()===st.b?' ✓':''}`,sx,A.narrow?f1+72:36);
  // tiles: x² square, strips for p along the top, strips for q down the side, unit block in the corner
  const ox=left,oy=top,gl=st.glow;P.shadow(8,2,.18);tile(A,ox,oy,X,X,C.vi,false);P.noShadow();
  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${Math.max(14,u*.9)}px system-ui`;ctx.fillText('x²',ox+X/2,oy+X/2);
  const xc=v=>v<0?C.pk:C.gr,uc=prod()<0?C.rd:C.cy;
  for(let i=0;i<ap;i++)tile(A,ox+X+i*u,oy,u,X,xc(st.p),st.p<0);
  for(let j=0;j<aq;j++)tile(A,ox,oy+X+j*u,X,u,xc(st.q),st.q<0);
  for(let i=0;i<ap;i++)for(let j=0;j<aq;j++)tile(A,ox+X+i*u,oy+X+j*u,u,u,uc,prod()<0);
  if(gl>0){ctx.strokeStyle=A.alpha(C.gr,gl);ctx.lineWidth=4;P.rrect(ox-3,oy-3,X+ap*u+6,X+aq*u+6,8);ctx.stroke()}
  // edge labels: x and p along the top, x and q down the side; the number labels are tap targets that flip the sign
  ctx.font=`700 ${A.narrow?14:16}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText('x',ox+X/2,oy-12);ctx.fillText('x',ox-14,oy+X/2);
  const lab=(txt,x,y,which)=>{const b=P.label(txt,x,y,{font:'700 14px system-ui',bg:A.alpha(C.am,.95),col:'#111'});zones.push({x:b.x-8,y:b.y-8,w:b.w+16,h:b.h+16,which})};
  lab(st.p<0?`− ${ap}`:`+ ${ap}`,ox+X+Math.max(ap,1)*u/2+(ap?0:12),oy-12,'p');lab(st.q<0?`− ${aq}`:`+ ${aq}`,Math.max(26,ox-22),oy+X+Math.max(aq,1)*u/2+(aq?0:12),'q');
  // the corner handle
  const hx=ox+X+ap*u,hy=oy+X+aq*u,pu=st.grab?1:.5+.5*Math.sin(st.pulse);ctx.fillStyle=A.alpha(C.am,.25+.2*pu);ctx.beginPath();ctx.arc(hx,hy,16,0,7);ctx.fill();P.ball(hx,hy,9,C.am);st.hp={x:hx,y:hy};
  if(!st.won&&!st.grab&&A.step<5&&ap+aq<3)P.label('drag the corner',hx+14,hy+22,{align:'left',font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
 // ---------- Show me: walk the corner to the answer one tile at a time ----------
 function walkTo(tp,tq,fin){const id=++st.run;const next=()=>{if(id!==st.run)return;if(st.p===tp&&st.q===tq){fin&&fin();return}
   const np=st.p+Math.sign(tp-st.p),nq=st.p===tp?st.q+Math.sign(tq-st.q):st.q;setPQ(np,nq);A.sound.tick();A.tween({k:0},{k:1},140,'io',next)};next()}
 const target=(b,c0,ans,msg,i)=>()=>{st.chk=()=>{};st.b=b;st.c=c0;setPQ(1,1,true);st.won=false;tell(`Build a rectangle that equals ${quad(b,c0)}.`);
  st.chk=()=>{if(!A.extra.querySelector('.fl-task')||!match())return;st.glow=1;A.tween(st,{glow:0},1200,'out');A.done(msg+A.reveal(i))};st.ans=ans};
 const steps=[
  {h:'Tiles make a rectangle',p:'x² + 5x + 6 is one x² tile, 5 x-strips and 6 unit tiles. Factorising means fitting them into one rectangle; its sides are the two brackets.',
   predict:{q:'Which brackets give x² + 5x + 6?',opts:['(x + 5)(x + 6)','(x + 2)(x + 3)','(x + 1)(x + 6)'],ans:1},
   task:'Drag the corner until the rectangle uses 5 strips and 6 unit tiles',show:()=>walkTo(2,3),
   go:target(5,6,[2,3],'(x + 2)(x + 3): 2 × 3 = 6 unit tiles and 2 + 3 = 5 strips. The two numbers multiply to c and add to b.',0)},
  {h:'Product first, then sum',p:'Only some blocks of unit tiles make 12: 1 × 12, 2 × 6 and 3 × 4. List those pairs, then pick the pair whose sum is the middle number.',
   predict:{q:'Which pair factorises x² + 7x + 12?',opts:['2 and 6','3 and 4','1 and 12'],ans:1},
   task:'Build x² + 7x + 12',show:()=>walkTo(3,4),
   go:target(7,12,[3,4],'(x + 3)(x + 4). 2 and 6 also make 12, but they add to 8, so the rectangle would have 8 strips.',1)},
  {h:'A negative constant',p:'Tap a number on the edge to make it negative. Negative tiles are pink and carry a minus. A pink strip and a green strip cancel: that is a zero pair.',
   predict:{q:'Which brackets give x² + x − 6?',opts:['(x − 2)(x + 3)','(x + 2)(x − 3)','(x − 2)(x − 3)'],ans:0},
   task:'Build x² + x − 6 (tap a corner label to flip its sign)',show:()=>walkTo(-2,3),
   go:target(1,-6,[-2,3],'(x − 2)(x + 3): −2 × 3 = −6, and 3 green strips minus 2 pink strips leaves +1x. A negative c means the signs are different.',2)},
  {h:'Both negative',p:'When c is positive but b is negative, both numbers must be negative: a negative times a negative gives the positive corner, and the strips add to a negative.',
   predict:{q:'Which brackets give x² − 7x + 10?',opts:['(x + 2)(x + 5)','(x − 2)(x − 5)','(x + 2)(x − 5)'],ans:1},
   task:'Build x² − 7x + 10',show:()=>walkTo(-2,-5),
   go:target(-7,10,[-2,-5],'(x − 2)(x − 5): −2 × −5 = +10 and −2 + −5 = −7. Expand it to check: x² − 5x − 2x + 10.',3)},
  {h:'No middle term',p:'x² − 9 has no x term, so b = 0. The strips must cancel exactly: equal numbers of green and pink.',
   predict:{q:'Can x² − 9 be factorised?',opts:['No, there is no x term','Yes: (x − 3)(x − 3)','Yes: (x + 3)(x − 3)'],ans:2},
   task:'Build x² − 9',show:()=>walkTo(3,-3),
   go:target(0,-9,[3,-3],'(x + 3)(x − 3): 3 green strips and 3 pink strips cancel, and 3 × −3 = −9. This is a difference of two squares.',4)},
  {h:'Sandbox',p:'Build any rectangle and read off the quadratic, or press New target for one to factorise. Try making a corner of 12 in every way you can.',go:()=>{st.chk=()=>{};newTarget()}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 const POOL=[[2,3],[3,4],[-2,3],[-2,-5],[3,-3],[1,6],[-1,-4],[4,-2],[5,-3],[2,2],[-3,-3],[6,-1]];let pi=0;
 function newTarget(){st.chk=()=>{};pi=(pi+1)%POOL.length;const[a,b]=POOL[pi];st.b=a+b;st.c=a*b;st.won=false;setPQ(1,1,true);tell(`New target: ${quad(st.b,st.c)}. Build it.`)}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   btns=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the bracket numbers'},box);
   const mk=(label,aria,k,f)=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-label':aria,'data-k':k},btns,label);b.onclick=f};
   mk('Top −1','First bracket number down by 1','p-',()=>setPQ(st.p-1,st.q));mk('Top +1','First bracket number up by 1','p+',()=>setPQ(st.p+1,st.q));
   mk('Side −1','Second bracket number down by 1','q-',()=>setPQ(st.p,st.q-1));mk('Side +1','Second bracket number up by 1','q+',()=>setPQ(st.p,st.q+1));
   mk('Flip top sign','Make the first bracket number negative or positive','pf',()=>setPQ(-st.p,st.q));mk('Flip side sign','Make the second bracket number negative or positive','qf',()=>setPQ(st.p,-st.q));
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Sandbox'},box);const nb=E('button',{type:'button',class:'lbtn sm'},sand,'New target');nb.onclick=newTarget;
   chal=E('div',{class:'fl-chal'},A.below);
   A.every(dt=>{if(st.won||A.step>=5||Math.abs(st.p)+Math.abs(st.q)>=3||A.reduced())return false;st.pulse+=dt*3;return true});
   // drag the corner handle; tap a bracket label to flip its sign
   const near=(p,h)=>h&&Math.hypot(p.x-h.x,p.y-h.y)<28;
   A.gest({down:p=>{if(near(p,st.hp)){st.grab=true;A.redraw();return true}const z=zones.find(z=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h);
     if(z){A.sound.tick();if(z.which==='p')setPQ(st.p?-st.p:0,st.q);else setPQ(st.p,st.q?-st.q:0);if(z.which==='p'&&!st.p)st.sp=-st.sp;if(z.which==='q'&&!st.q)st.sq=-st.sq}return false},
    move:p=>{if(!st.grab)return;const g=geo(A),ap=Math.round((p.x-g.left-g.X)/g.u),aq=Math.round((p.y-g.top-g.X)/g.u);
     const np=st.sp*Math.max(0,Math.min(MAX,ap)),nq=st.sq*Math.max(0,Math.min(MAX,aq));if(np!==st.p||nq!==st.q){A.sound.tick();setPQ(np,nq)}},
    up:()=>{if(!st.grab)return;st.grab=false;status();A.redraw()}});
   sync()}});
 // ---------- challenge: build the rectangle, press Check, get the slip named ----------
 const CH=[[3,4],[-5,3],[4,-2],[-4,-5],[4,-4],[-3,4],[-2,-4],[2,8]];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;const[a,b]=CH[qi];st.b=a+b;st.c=a*b;st.won=false;st.chk=()=>{};setPQ(1,1,true);tell(`Challenge: factorise ${quad(st.b,st.c)}.`);
  chal.innerHTML=`<p><b>Factorise ${quad(st.b,st.c)}.</b> Build the rectangle with the corner, the labels or the buttons, then press Check.</p><button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge;sync()}
 function judge(){const fb=chal.querySelector('.fl-fb');if(st.won)return;const{p,q,b,c:k}=Object.assign({},st,{c:st.c}),s=p+q,m0=p*q;let m;
  if(s===b&&m0===k){st.won=true;st.glow=1;A.tween(st,{glow:0},1200,'out');fb.innerHTML=`✓ ${quad(b,k)} = ${pair(p,q)}. Check: ${N(p)} × ${Q(q)} = ${N(k)} and ${N(p)} + ${Q(q)} = ${N(b)}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();
  if((p===b&&q===k)||(p===k&&q===b))m=`Those are b and c copied into the brackets. Expand ${pair(p,q)}: it gives ${quad(s,m0)}. You need two numbers that multiply to ${N(k)} and add to ${N(b)}.`;
  else if(m0===k&&s===-b)m=`Both signs are flipped: ${pair(p,q)} gives ${quad(s,m0)}. The product is right, so change the sign of both numbers.`;
  else if(m0===k)m=`${N(p)} × ${Q(q)} = ${N(k)}, so the corner is right, but ${N(p)} + ${Q(q)} = ${N(s)}, not ${N(b)}. Try another pair that multiplies to ${N(k)}.`;
  else if(s===b)m=`${N(p)} + ${Q(q)} = ${N(b)}, so the strips are right, but ${N(p)} × ${Q(q)} = ${N(m0)}, not ${N(k)}. Find a pair that also multiplies to ${N(k)}.`;
  else if(m0===-k)m=`The corner makes ${N(m0)}, but you need ${N(k)}. ${k<0?'A negative c needs one negative number and one positive.':'A positive c needs both numbers the same sign.'}`;
  else m=`${pair(p,q)} = ${quad(s,m0)}. List the pairs that multiply to ${N(k)}, then pick the pair that adds to ${N(b)}.`;
  fb.innerHTML=m+' <button type="button" class="linkish fl-hint">Show me</button>';fb.querySelector('.fl-hint').onclick=()=>{const[a,bb]=CH[qi];walkTo(a,bb,()=>{st.won=true;fb.textContent=`${quad(b,k)} = ${pair(a,bb)}: ${N(a)} × ${Q(bb)} = ${N(k)} and ${N(a)} + ${Q(bb)} = ${N(b)}.`})}}
 A.start()})})();
