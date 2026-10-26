/* Flagship 51 – perfect squares and the difference of two squares, done with real squares. Grow a square of side x + b
   and see the two b·x strips and the b² corner; match x² + 10x + 25; square 21 in your head; cut a b × b corner out of x²
   and swing the loose strip round so the L becomes an (x + b) by (x − b) rectangle; 23 × 17 = 20² − 3²; 4x² − 25 needs
   side 2x. Challenge options are named slips (dropped middle term, (x − b)² for x² − b², n² left unrooted, x² + b²…). */
(()=>{const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),sg=n=>n<0?' − '+(-n):' + '+n,kx=k=>k===1?'x':k+'x',kx2=k=>k===1?'x²':k*k+'x²';
VIS.reg('flagsqr',c=>{let A,pad,chal,read;
 const S={m:'ps',X:null,xv:6,k:1,b:1,t:0,bmax:8,kmax:1,slide:0,drag:null,want:()=>{},tok:0,Q:null,said:''};
 const tell=t=>{S.said=t;c.say(t);if(read)read.textContent=t};
 const side=()=>S.X==null?S.k*S.xv:S.X,L=()=>S.X==null?kx(S.k):String(S.X);
 // ---- what the shape says, in symbols ----
 function lines(){const b=S.b,X=S.X;
  if(S.m==='ps'){if(X==null)return[`(x + ${b})² = x²${b?sg(2*b)+'x'+sg(b*b):''}`,`two strips of ${b}x, corner ${b}² = ${b*b}`];
   return[`(${X} + ${b})² = ${X*X} + ${2*X*b} + ${b*b}`,`${X+b}² = ${(X+b)**2}`]}
  const top=X==null?`${kx2(S.k)} − ${b}² = ${kx2(S.k)} − ${b*b}`:`${X}² − ${b}² = ${X*X} − ${b*b} = ${X*X-b*b}`;
  const r=X==null?`(${L()} + ${b})(${L()} − ${b})`:`${X+b} × ${X-b} = ${(X+b)*(X-b)}`;return[top,S.t>.99?'rectangle: '+r:S.slide?'swing the strip round':'L shape: square minus corner']}
 function say(){const[a,b]=lines();tell(a+'. '+b+'.');sync();S.want()}
 function setB(v){S.b=cl(Math.round(v),0,Math.min(S.bmax,S.m==='ds'?side()-1:99));say()}
 function setK(v){S.k=cl(Math.round(v),1,S.kmax);S.b=Math.min(S.b,side()-1);say()}
 function setT(v){S.t=cl(v,0,1);if(S.t>.93)S.t=1;if(S.t<.05)S.t=0;say()}
 // ---- geometry in shape units, y down ----
 function box(){if(S.m==='ps'){const a=S.X==null?S.xv:S.X;return[a+S.bmax,a+S.bmax]}const a=S.X==null?S.kmax*S.xv:S.X;return[a,a+(S.slide?S.bmax:0)]}
 function fit(){const N=A.narrow,top=N?84:74,[bw,bh]=box(),u=Math.min((A.W-(N?64:120))/bw,(A.H-top-40)/bh);return{u,ox:(A.W-u*bw)/2,oy:top+12}}
 function piece(ctx,F,x,y,w,h,col,rot,txt){const{u,ox,oy}=F,P=A.paint;ctx.save();ctx.translate(ox+(x+w/2)*u,oy+(y+h/2)*u);ctx.rotate(rot||0);
  ctx.fillStyle=P.lin(0,-h*u/2,0,h*u/2,[[0,A.mix(col,'#ffffff',.2)],[1,col]]);ctx.fillRect(-w*u/2,-h*u/2,w*u,h*u);ctx.strokeStyle=A.alpha('#000000',.3);ctx.lineWidth=1.5;ctx.strokeRect(-w*u/2,-h*u/2,w*u,h*u);
  if(txt&&w*u>26&&h*u>18){ctx.rotate(-(rot||0));ctx.fillStyle=A.col.dark?'#111':'#fff';ctx.font='700 13px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,0,0)}ctx.restore()}
 function strip(){const a=side(),b=S.b,t=S.t,c0=[a-b/2,b+(a-b)/2],c1=[(a-b)/2,a+b/2];return{w:b,h:a-b,cx:c0[0]+(c1[0]-c0[0])*t,cy:c0[1]+(c1[1]-c0[1])*t,rot:t*Math.PI/2,c0,c1}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A,F=fit(),{u,ox,oy}=F,Q=(x,y)=>[ox+x*u,oy+y*u],tag=(t,p,bg)=>P.label(t,p[0],p[1],{font:'800 12px system-ui',bg:bg||'#1e293b'});S.hd={};
  ctx.fillStyle=A.mix(C.pn,C.vi,.05);ctx.fillRect(0,0,W,H);const[l1,l2]=lines(),b=S.b,sym=S.X==null;
  ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font=`700 ${A.narrow?16:19}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(l1,14,28);ctx.font='600 14px system-ui';ctx.fillStyle=C.mu;ctx.fillText(l2,14,A.narrow?52:54);
  if(S.m==='ps'){const a=sym?S.xv:S.X;piece(ctx,F,0,0,a,a,C.vi,0,sym?'x²':a*a);if(b){piece(ctx,F,a,0,b,a,C.gr,0,sym?b+'x':a*b);piece(ctx,F,0,a,a,b,C.gr,0,sym?b+'x':a*b);piece(ctx,F,a,a,b,b,C.am,0,String(b*b))}
   tag(sym?'x':String(a),[ox+a*u/2,oy-10]);if(b)tag(String(b),[ox+(a+b/2)*u,oy-10],'#065f46');tag(sym?'x':String(a),[ox-16,oy+a*u/2]);
   const h=Q(a+b,a+b);P.ball(h[0],h[1],11,C.pk);S.hd.g=h}
  else{const a=side(),s=strip(),k=S.k;const done=S.t>.99;if(!done){ctx.setLineDash([6,5]);ctx.strokeStyle=A.alpha(C.tx,.35);ctx.lineWidth=1.5;ctx.strokeRect(ox+(a-b)*u,oy,b*u,b*u);ctx.setLineDash([]);
   if(b)tag(b+'²',[ox+(a-b/2)*u,oy+b*u/2],'#991b1b')}piece(ctx,F,0,0,a-b,a,C.vi,0,'');
   if(b)piece(ctx,F,s.cx-s.w/2,s.cy-s.h/2,s.w,s.h,C.cy,s.rot,'');
   if(!done){tag(sym?kx(k):String(a),[ox+a*u/2,oy-10]);tag(sym?kx(k):String(a),[ox-18,oy+a*u/2])}
   if(done){tag(sym?`${kx(k)} − ${b}`:String(a-b),[ox+(a-b)*u/2,oy+(a+b)*u+14],'#5b21b6');tag(sym?`${kx(k)} + ${b}`:String(a+b),[ox+(a-b)*u+(A.narrow?26:40),oy+(a+b)*u/2],'#5b21b6')}
   else if(b)tag(String(b),[ox+a*u+14,oy+b*u/2],'#991b1b');
   const g=S.t>.99?Q(a-b,a+b):Q(a-b,b);if(!S.slide||S.t>.99||A.step===6||A.step===7){P.ball(g[0],g[1],11,C.pk);S.hd.g=g}
   if(S.kmax>1&&!S.t){const kh=Q(a,a);P.ball(kh[0],kh[1],10,C.am);S.hd.k=kh}
   if(S.slide&&b&&S.t<.99){const p=Q(s.cx,s.cy);P.ball(p[0],p[1],12,C.cy);S.hd.s=p;tag('drag me',[p[0],p[1]+22],'#155e75')}}
  if(S.ok>0){ctx.strokeStyle=A.alpha(C.gr,S.ok);ctx.lineWidth=5;const[bw,bh]=S.m==='ps'?[(sym?S.xv:S.X)+b,(sym?S.xv:S.X)+b]:S.t>.99?[side()-b,side()+b]:[side(),side()];ctx.strokeRect(ox-4,oy-4,bw*u+8,bh*u+8)}A.fx.draw(ctx)}
 const describe=()=>A.step===8?S.cq||'Challenge.':(S.m==='ps'?`A square of side ${S.X==null?'x':S.X} + ${S.b}, cut into a square, two strips and a corner square. `:`A square of side ${L()} with a ${S.b} by ${S.b} corner cut away${S.t>.99?', its loose strip moved to make a rectangle':''}. `)+S.said;
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return A.redraw();pad.innerHTML='';const s=A.step;
  const btn=(t,f)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.onclick=()=>{f();A.sound.tick()}};
  if(s<8){if(s!==4){btn('b − 1',()=>setB(S.b-1));btn('b + 1',()=>setB(S.b+1))}if(S.kmax>1&&!S.t){btn('Side − x',()=>setK(S.k-1));btn('Side + x',()=>setK(S.k+1))}
   if(S.slide){btn('Swing strip ◀',()=>setT(S.t-.5));btn('Swing strip ▶',()=>setT(S.t+.5))}}A.redraw()}
 // ---- steps ----
 const fresh=()=>{S.tok++;S.want=()=>{}},cfg=o=>{fresh();Object.assign(S,{X:null,xv:6,k:1,kmax:1,t:0,slide:0,bmax:8},o);say()};
 const fin=(st,test,msg)=>()=>{if(A.step===st&&!S.drag&&test()&&A.pred[st]!=null){S.ok=1;A.tween(S,{ok:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const walk=(f,key,to,ms=260)=>{const k=++S.tok,nx=()=>{if(k!==S.tok||S[key]===to)return;f(S[key]+Math.sign(to-S[key]));A.tween({z:0},{z:1},ms,'io',nx)};nx()};
 const glideT=()=>{const o={v:S.t},k=++S.tok;A.tween(o,{v:1},1000,'io',()=>{if(k===S.tok)setT(1)});const tk=()=>{if(k!==S.tok||S.t===1)return;S.t=o.v;A.redraw();requestAnimationFrame(tk)};tk()};
 const steps=[
  {h:'Grow a square',p:'The violet square is x by x. Drag the pink corner to add b to both sides. The new square is (x + b)².',
   predict:{q:'(x + 3)² is…',opts:['x² + 9','x² + 6x + 9','x² + 3x + 9'],ans:1},task:'Make the square (x + 3)²',show:()=>walk(setB,'b',3),
   go:()=>{cfg({b:1});S.want=fin(0,()=>S.b===3,()=>'(x + 3)² = x² + 3x + 3x + 9 = x² + 6x + 9. The two green strips are the middle term; x² + 9 leaves them out.')}},
  {h:'Spot a perfect square',p:'x² + 10x + 25: the two strips share 10x, and the corner is 25.',
   predict:{q:'x² + 10x + 25 is the square of…',opts:['x + 10','x + 5','x + 25'],ans:1},task:'Build x² + 10x + 25',show:()=>walk(setB,'b',5),
   go:()=>{cfg({b:2});S.want=fin(1,()=>S.b===5,()=>'Each strip is 5x and the corner is 5 × 5 = 25, so x² + 10x + 25 = (x + 5)². Halve the middle number, then check it squares to the end number.')}},
  {h:'Square 21 in your head',p:'Now the violet side is 20, not x. The same strips and corner work for numbers.',
   predict:{q:'21² is…',opts:['401','441','421'],ans:1},task:'Make the square 21 by 21',show:()=>walk(setB,'b',1),
   go:()=>{cfg({X:20,b:4});S.want=fin(2,()=>S.b===1,()=>'21² = 400 + 20 + 20 + 1 = 441. 401 forgets both strips, 421 keeps only one.')}},
  {h:'Cut a corner off',p:'Start with x². Drag the pink point to cut a b by b square out of the corner. What is left is x² − b².',
   predict:{q:'x² − 9 factorises as…',opts:['(x − 3)²','(x + 3)(x − 3)','(x − 9)(x + 9)'],ans:1},task:'Cut away 9, a 3 by 3 corner',show:()=>walk(setB,'b',3),
   go:()=>{cfg({m:'ds',xv:8,b:1});S.want=fin(3,()=>S.b===3,()=>'The L shape is x² − 9. The cut side is 3, the square root of 9, not 9 itself. Next: turn the L into a rectangle.')}},
  {h:'Swing the strip',p:'The L is a tall piece plus a loose blue strip, 3 wide and x − 3 long. Drag the strip round to the bottom.',
   predict:{q:'The L becomes a rectangle. Its sides are…',opts:['x and 3','x + 3 and x − 3','x − 3 and x − 3'],ans:1},task:'Swing the blue strip to the bottom',show:glideT,
   go:()=>{cfg({m:'ds',xv:8,b:3,slide:1,bmax:3});S.want=fin(4,()=>S.t===1,()=>'Width x − 3, height x + 3: x² − 9 = (x + 3)(x − 3). The area never changed, only its shape. (x − 3)² would be a square, smaller still.')}},
  {h:'23 × 17 the easy way',p:'Side 20. 23 is 20 + 3 and 17 is 20 − 3, so 23 × 17 is 20² with a 3 by 3 corner gone.',
   predict:{q:'23 × 17 is…',opts:['400','391','409'],ans:1},task:'Make the rectangle 23 by 17',show:()=>walk(setB,'b',3),
   go:()=>{cfg({m:'ds',X:20,b:1,t:1,slide:1,bmax:10});S.want=fin(5,()=>S.b===3,()=>'23 × 17 = 20² − 3² = 400 − 9 = 391. 409 adds the corner instead of taking it away.')}},
  {h:'Find the square roots',p:'4x² − 25. Drag the amber corner to set the side as a number of x, and the pink point to cut the corner.',
   predict:{q:'4x² − 25 factorises as…',opts:['(4x + 5)(4x − 5)','(2x + 5)(2x − 5)','(2x − 5)²'],ans:1},task:'Build 4x² − 25',
   show:()=>{setK(2);walk(setB,'b',5)},go:()=>{cfg({m:'ds',xv:4,kmax:3,b:2});S.want=fin(6,()=>S.k===2&&S.b===5,()=>'4x² is a square of side 2x, and 25 is 5². So 4x² − 25 = (2x + 5)(2x − 5). Root the 4 as well as the 25.')}},
  {h:'Sandbox',p:'Change the side and the cut, then swing the strip. Try to make x² + 9: there is no corner to cut, so a sum of two squares will not factorise.',go:()=>cfg({m:'ds',xv:4,kmax:3,b:2,slide:1,bmax:11})},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 // ---- challenge: each wrong option is a named slip ----
 const KIND=['ep','fac','em','num','coef','tri','sum'];let qn=-1,run=0;
 function ask(){qn++;const ty=KIND[qn%7],k=2+qn%3,a=[20,30,40,50][qn%4],o=[];let q;const P=(l,w)=>o.push([l,w]);let n=3+(qn*3+(qn/7|0)*2)%7;while(ty==='coef'&&n%k===0||ty==='coef'&&k===4&&n%2===0)n++;let why;
  if(ty==='ep'){q=`Expand (x + ${n})².`;P(`x² + ${2*n}x + ${n*n}`,'ok');P(`x² + ${n*n}`,'drop');P(`x² + ${n}x + ${n*n}`,'half');P(`x² + ${2*n}x + ${2*n}`,'dbl');why=`(x + ${n})² = x² + ${n}x + ${n}x + ${n*n} = x² + ${2*n}x + ${n*n}.`}
  else if(ty==='em'){q=`Expand (x − ${n})².`;P(`x² − ${2*n}x + ${n*n}`,'ok');P(`x² − ${n*n}`,'diff');P(`x² − ${2*n}x − ${n*n}`,'sign');P(`x² + ${2*n}x + ${n*n}`,'mid');why=`(x − ${n})² = x² − ${n}x − ${n}x + ${n*n} = x² − ${2*n}x + ${n*n}.`}
  else if(ty==='fac'){q=`Factorise x² − ${n*n}.`;P(`(x + ${n})(x − ${n})`,'ok');P(`(x − ${n})²`,'sq');P(`(x + ${n*n})(x − ${n*n})`,'root');P('It cannot be factorised','cant');why=`x² − ${n}² = (x + ${n})(x − ${n}).`}
  else if(ty==='coef'){q=`Factorise ${k*k}x² − ${n*n}.`;P(`(${k}x + ${n})(${k}x − ${n})`,'ok');P(`(${k*k}x + ${n})(${k*k}x − ${n})`,'coef');P(`(${k}x − ${n})²`,'sq');why=`${k*k}x² − ${n*n} = (${k}x)² − ${n}² = (${k}x + ${n})(${k}x − ${n}).`}
  else if(ty==='num'){q=`Work out ${a+n} × ${a-n} without a calculator.`;P(String(a*a-n*n),'ok');P(String(a*a),'nosub');P(String(a*a+n*n),'add');P(String(a*a-2*n),'twice');why=`(${a} + ${n})(${a} − ${n}) = ${a}² − ${n}² = ${a*a} − ${n*n} = ${a*a-n*n}.`}
  else if(ty==='tri'){q=`Factorise x² + ${2*n}x + ${n*n}.`;P(`(x + ${n})²`,'ok');P(`(x + ${2*n})²`,'twon');P(`(x + ${n})(x − ${n})`,'dx');why=`${n*n} = ${n}² and ${2*n} = 2 × ${n}, so it is (x + ${n})².`}
  else{q=`Factorise x² + ${n*n}.`;P('It cannot be factorised with real numbers','ok');P(`(x + ${n})(x − ${n})`,'plus');P(`(x + ${n})²`,'sq2');why=`(x + ${n})(x − ${n}) = x² − ${n*n} and (x + ${n})² = x² + ${2*n}x + ${n*n}: neither is x² + ${n*n}.`}
  S.Q={ty,n,k,a,why};const j=qn%o.length,opts=o.slice(j).concat(o.slice(0,j));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(z=>{const e=c.el('button',{type:'button',class:'lbtn sm'},row,z[0]);e.onclick=()=>judge(z[1])});S.cq='Challenge: '+q;A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function judge(w){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),{n,k,a,why}=S.Q;let m;
  if(w==='ok')m='Right.';
  else if(w==='drop')m=`(x + ${n})² is (x + ${n})(x + ${n}). Squaring each part alone drops the two strips: the middle term ${2*n}x is missing.`;
  else if(w==='half')m=`There are two strips of ${n}x, one on each side, so the middle term is ${2*n}x, not ${n}x.`;
  else if(w==='dbl')m=`The corner is ${n} × ${n} = ${n*n}, not ${n} + ${n}.`;
  else if(w==='diff')m=`x² − ${n*n} is a difference of squares, (x + ${n})(x − ${n}). (x − ${n})² keeps its middle term −${2*n}x.`;
  else if(w==='sign')m=`The corner is (−${n}) × (−${n}) = +${n*n}: a negative times a negative is positive.`;
  else if(w==='mid')m=`The middle term takes the bracket's sign: 2 × x × (−${n}) = −${2*n}x.`;
  else if(w==='sq')m='That squared bracket has a middle term when expanded. A difference of squares needs one + bracket and one − bracket, so the strips cancel.';
  else if(w==='root')m=`The brackets hold the square roots: ${n*n} = ${n}², so the number in each bracket is ${n}.`;
  else if(w==='cant')m=`It is a difference of two squares: x² − ${n}² = (x + ${n})(x − ${n}).`;
  else if(w==='coef')m=`Root the coefficient too: ${k*k}x² = (${k}x)², so each bracket starts with ${k}x.`;
  else if(w==='nosub')m=`That is ${a}². The ${n} by ${n} corner is cut away, so take off ${n*n}.`;
  else if(w==='add')m=`The corner is removed, not added: ${a}² − ${n}² = ${a*a} − ${n*n}.`;
  else if(w==='twice')m=`Take away ${n}² = ${n*n}, not 2 × ${n}. The cut is a square.`;
  else if(w==='twon')m=`Each strip is half the middle term: ${2*n}x ÷ 2 = ${n}x, so the bracket is x + ${n}.`;
  else if(w==='dx')m=`(x + ${n})(x − ${n}) has no middle term: its strips cancel. Two + brackets give +${2*n}x.`;
  else if(w==='plus')m=`(x + ${n})(x − ${n}) expands to x² − ${n*n}, a minus. A sum of two squares has no real factors.`;
  else m=`x² + ${n*n} has no middle term, so it is not (x + ${n})², and no corner can be cut from a plus.`;
  m+=' '+why;if(w==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==8;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const near=(p,q,r=30)=>q&&Math.hypot(p.x-q[0],p.y-q[1])<r;
   A.gest({down:p=>{if(A.step===8||!S.hd)return false;for(const key of['s','g','k'])if(near(p,S.hd[key])){S.drag=key;return true}return false},
    move:p=>{if(!S.drag)return;const F=fit(),x=(p.x-F.ox)/F.u,y=(p.y-F.oy)/F.u,a=side();
     if(S.drag==='k'){const nk=cl(Math.round((x+y)/2/S.xv),1,S.kmax);if(nk!==S.k)setK(nk);return}
     if(S.drag==='s'){const s=strip(),dx=s.c1[0]-s.c0[0],dy=s.c1[1]-s.c0[1];S.t=cl(((x-s.c0[0])*dx+(y-s.c0[1])*dy)/(dx*dx+dy*dy),0,1);A.redraw();return}
     const nb=S.m==='ps'?Math.round((x+y)/2-(S.X==null?S.xv:S.X)):S.t>.99?Math.round((a-x+y-a)/2):Math.round((a-x+y)/2);if(nb!==S.b)setB(nb)},
    up:()=>{const d=S.drag;S.drag=null;if(d==='s')setT(S.t);else if(d)S.want()}});sync()}});
 A.start()})})();
