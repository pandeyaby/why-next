/* Flagship 7 – Pythagoras' theorem. Hook: a rectangular park, 40 m by 30 m; walk round the edge (70 m) or cut across?
   The learner predicts the shortcut, then drags the dog along the diagonal while a tape counts the metres.
   Then: drag the two small squares into the big square (9 + 16 tiles fill 25), drag the corners to build triangles,
   bend the right angle to see the rule break, slide a ladder to find a shorter side, sandbox, and a tape-measure challenge
   with feedback for adding the sides, subtracting lengths, adding squares for a short side and "the hypotenuse is shortest". */
(()=>{const f1=v=>(Math.round(v*10)/10).toString(),sq=v=>v*v;
VIS.reg('flagpyth',c=>{let A,chal;const st={fit:[3,4],a:3,b:4,th:90,dog:0,fa:0,fb:0,ghost:null,drag:null,lad:1.5,tape:0,won:false};
 // ---------- geometry (unit coords, y up; right angle at O) ----------
 const tri=()=>{const r=st.th*Math.PI/180;return{O:[0,0],P:[st.a,0],Q:[st.b*Math.cos(r),st.b*Math.sin(r)]}};
 const sqs=()=>{const{O,P,Q}=tri(),out=(u,v)=>{const d=[v[0]-u[0],v[1]-u[1]],n=[d[1],-d[0]];return[u,v,[v[0]+n[0],v[1]+n[1]],[u[0]+n[0],u[1]+n[1]]]};
  return{sa:out(O,P),sb:out(Q,O),sc:out(P,Q)}};
 const csq=()=>{const{P,Q}=tri();return sq(P[0]-Q[0])+sq(P[1]-Q[1])};
 const fitFor=(a,b,th=90)=>{const pts=[];const sv={a:st.a,b:st.b,th:st.th};st.a=a;st.b=b;st.th=th;const s=sqs();Object.values(s).forEach(p=>pts.push(...p));Object.assign(st,sv);return pts};
 const view=A=>{const{W,H}=A,top=A.narrow?46:40,pad=14,pts=A.step===2||A.step===5?fitFor(Math.max(3,st.fit[0]),Math.max(3,st.fit[1])):A.step===3?fitFor(3,4).concat(fitFor(3,4,135)):fitFor(3,4);
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const u=Math.min((W-2*pad)/(x1-x0),(H-top-pad)/(y1-y0),A.narrow?40:46),ox=(W-(x1-x0)*u)/2-x0*u,oy=top+(H-top-pad-(y1-y0)*u)/2+y1*u;
  return{u,X:x=>ox+x*u,Y:y=>oy-y*u,ix:px=>(px-ox)/u,iy:py=>(oy-py)/u}};
 const upd=()=>{const c2=csq();c.say(A.step===0?`The dog has walked ${f1(st.dog*50)} m of the 50 m diagonal.`:A.step===4?`Ladder 5 m, foot ${f1(st.lad)} m from the wall, top ${f1(Math.sqrt(25-sq(st.lad)))} m up.`:A.step===6?'Measure the missing side with the tape.':`a = ${st.a}, b = ${st.b}, angle ${st.th}°: a² + b² = ${sq(st.a)+sq(st.b)}, c² = ${f1(c2)}.`);
  A.cv.setAttribute('aria-label',A.step===0?'Illustration: a park 40 m by 30 m with a dog on the diagonal path.':A.step===4?'A 5 m ladder leaning on a wall.':`Right-angled triangle with squares on each side: ${sq(st.a)}, ${sq(st.b)} and ${f1(c2)} square units.`);A.redraw()};
 let chk=()=>{};
 // ---------- drawing helpers ----------
 const poly=(ctx,v,pts)=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(v.X(p[0]),v.Y(p[1])):ctx.moveTo(v.X(p[0]),v.Y(p[1])));ctx.closePath()};
 const grid=(ctx,v,s,n,col)=>{const[a,b,,d]=s;ctx.strokeStyle=col;ctx.lineWidth=1;for(let i=1;i<n;i++){const t=i/n;[[a,b,d],[a,d,b]].forEach(([o,p,q])=>{ctx.beginPath();ctx.moveTo(v.X(o[0]+(q[0]-o[0])*t),v.Y(o[1]+(q[1]-o[1])*t));ctx.lineTo(v.X(p[0]+(q[0]-o[0])*t),v.Y(p[1]+(q[1]-o[1])*t));ctx.stroke()})}};
 const tiles=(A,v,s,n,k,col)=>{const{ctx}=A,[a,b,,d]=s,e1=[(b[0]-a[0])/n,(b[1]-a[1])/n],e2=[(d[0]-a[0])/n,(d[1]-a[1])/n];
  for(let i=0;i<Math.min(k,n*n);i++){ctx.fillStyle=col(i);const r=Math.floor(i/n),q=i%n,o=[a[0]+e1[0]*q+e2[0]*r,a[1]+e1[1]*q+e2[1]*r];poly(ctx,v,[o,[o[0]+e1[0],o[1]+e1[1]],[o[0]+e1[0]+e2[0],o[1]+e1[1]+e2[1]],[o[0]+e2[0],o[1]+e2[1]]]);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.35)';ctx.stroke()}};
 const cen=s=>[s.reduce((t,p)=>t+p[0],0)/4,s.reduce((t,p)=>t+p[1],0)/4];
 const inPoly=(pt,s)=>{let ins=false;for(let i=0,j=3;i<4;j=i++){const[xi,yi]=s[i],[xj,yj]=s[j];if((yi>pt[1])!==(yj>pt[1])&&pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi)ins=!ins}return ins};
 const figure=(A,v)=>{const{ctx,paint:P,col:C}=A,s=sqs(),{O,P:Pp,Q}=tri(),c2=csq(),right=st.th===90;
  [[s.sa,C.or,sq(st.a),st.a],[s.sb,C.cy,sq(st.b),st.b]].forEach(([q,col,ar,n],i)=>{if(A.step===1&&(i?st.fb:st.fa))return;P.shadow(10,4,.3);ctx.fillStyle=A.alpha(col,.32);poly(ctx,v,q);ctx.fill();P.noShadow();ctx.strokeStyle=col;ctx.lineWidth=2;ctx.stroke();if(Number.isInteger(n)&&n<=9)grid(ctx,v,q,n,A.alpha(col,.45));
   const m=cen(q);P.label(ar+'',v.X(m[0]),v.Y(m[1]),{font:`800 ${A.narrow?14:16}px system-ui`,pill:1,bg:A.alpha(col,.95),col:'#111'})});
  ctx.fillStyle=A.alpha(C.vi,.16);poly(ctx,v,s.sc);ctx.fill();ctx.strokeStyle=C.vi;ctx.lineWidth=2;ctx.stroke();
  if(A.step===1){const k=(st.fa?9:0)+(st.fb?16:0),k2=Math.min(k,st.anim||0);const first=st.fa&&(st.ord||'fa')==='fa'?9:16,c1=first===9?C.or:C.cy,c2_=first===9?C.cy:C.or;tiles(A,v,s.sc,5,Math.floor(k2),i=>A.alpha(i<first?c1:c2_,.8))}
  else if(Number.isInteger(Math.round(Math.sqrt(c2)*1e6)/1e6)&&Math.sqrt(c2)<=10)grid(ctx,v,s.sc,Math.round(Math.sqrt(c2)),A.alpha(C.vi,.4));
  const mc=cen(s.sc);P.label(A.step===1?`${Math.floor(Math.min(st.anim||0,25))} / 25`:f1(c2),v.X(mc[0]),v.Y(mc[1]),{font:`800 ${A.narrow?14:16}px system-ui`,pill:1,bg:A.alpha(C.vi,.95),col:'#fff'});
  // triangle
  P.shadow(12,4,.35);ctx.fillStyle=A.alpha(C.tx,.12);poly(ctx,v,[O,Pp,Q]);ctx.fill();P.noShadow();ctx.strokeStyle=C.tx;ctx.lineWidth=3;ctx.lineJoin='round';ctx.stroke();
  if(right){const k=.45;ctx.strokeStyle=C.tx;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(v.X(k),v.Y(0));ctx.lineTo(v.X(k),v.Y(k));ctx.lineTo(v.X(0),v.Y(k));ctx.stroke()}
  else{ctx.strokeStyle=C.rd;ctx.lineWidth=2;ctx.beginPath();ctx.arc(v.X(0),v.Y(0),v.u*.7,-st.th*Math.PI/180,0);ctx.stroke();P.label(st.th+'°',v.X(.9),v.Y(.9),{align:'left',font:'700 12px system-ui',col:C.rd})}
  ctx.font='italic 700 15px Georgia,serif';ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.fillText('a',v.X(st.a/2),v.Y(0)-7);ctx.fillText('b',v.X(Q[0]/2)+9,v.Y(Q[1]/2));ctx.fillText('c',v.X((Pp[0]+Q[0])/2)-9,v.Y((Pp[1]+Q[1])/2)-7);
  // sum bar
  const L=`${sq(st.a)} + ${sq(st.b)} = ${sq(st.a)+sq(st.b)}`,ok=Math.abs(c2-sq(st.a)-sq(st.b))<.05;if(A.step!==1)P.label(`a² + b² = ${L}   c² = ${f1(c2)}  ${ok?'✓ equal':c2>sq(st.a)+sq(st.b)?'c² is bigger':'c² is smaller'}`,A.W/2,20,{font:`700 ${A.narrow?11:13}px system-ui`,pill:1,bg:A.alpha(ok?C.gr:C.rd,.92),col:'#04140a'});
  if(A.step===2||A.step===5||A.step===3){const hs=A.step===3?[Q]:[Pp,Q];hs.forEach((h,i)=>{P.glow(A.alpha(i||A.step===3?C.cy:C.or,.9),14);P.ball(v.X(h[0]),v.Y(h[1]),11,i||A.step===3?C.cy:C.or);P.noShadow()})}};
 const park=A=>{const{ctx,W,H,paint:P,col:C}=A,l=W*.12,r=W*.88,t=H*.2,b=H*.86,X=x=>l+x/40*(r-l),Y=y=>b-y/30*(b-t);
  ctx.fillStyle=P.lin(0,0,0,H,[[0,'#bae6fd'],[1,'#e0f2fe']]);ctx.fillRect(0,0,W,H);P.shadow(16,6,.3);ctx.fillStyle=P.lin(0,t,0,b,[[0,'#4ade80'],[1,'#15803d']]);P.rrect(l,t,r-l,b-t,10);ctx.fill();P.noShadow();
  for(let i=0;i<14;i++){const x=l+((i*97)%100)/100*(r-l),y=t+((i*61)%100)/100*(b-t);P.ball(x,y,6+(i%3)*3,'#166534')}
  ctx.strokeStyle='#fef3c7';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(40),Y(0));ctx.lineTo(X(40),Y(30));ctx.stroke();
  ctx.setLineDash([2,10]);ctx.strokeStyle='rgba(254,243,199,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(40),Y(30));ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle=C.am;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(X(0),Y(0));ctx.lineTo(X(40*st.dog),Y(30*st.dog));ctx.stroke();
  ctx.fillStyle='#111';ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.fillText('40 m',X(20),Y(0)+18);ctx.save();ctx.translate(X(40)+14,Y(15));ctx.rotate(Math.PI/2);ctx.fillText('30 m',0,0);ctx.restore();
  P.label('🏠',X(0)-4,Y(0)+2,{font:'22px system-ui'});P.label('🍦',X(40),Y(30)-4,{font:'22px system-ui'});
  const dx=X(40*st.dog),dy=Y(30*st.dog);P.label('🐕',dx,dy-6,{font:`${A.narrow?26:30}px system-ui`});
  P.label(`tape: ${f1(st.dog*50)} m`,W/2,H*.09,{font:`800 ${A.narrow?16:19}px system-ui`,pill:1,bg:'#0f172a',col:'#fde047'});
  if(A.pred[0]!=null&&!A.isDone){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag the dog to the ice cream ↗',W/2,H*.15+2,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  return{X,Y}};
 const ladder=A=>{const{ctx,W,H,paint:P,col:C}=A,g=H*.86,wx=W*.18,u=Math.min((W*.72)/5,(g-H*.1)/5.2),f=st.lad,h=Math.sqrt(25-f*f),fx=wx+f*u,ty=g-h*u;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.08)],[1,C.pn]]);ctx.fillRect(0,0,W,H);ctx.fillStyle=A.mix('#b45309',C.pn,.2);ctx.fillRect(wx-22,H*.04,22,g-H*.04);ctx.strokeStyle='rgba(0,0,0,.25)';for(let y=H*.04;y<g;y+=14){ctx.beginPath();ctx.moveTo(wx-22,y);ctx.lineTo(wx,y);ctx.stroke()}
  ctx.fillStyle=A.mix('#65a30d',C.pn,.3);ctx.fillRect(0,g,W,H-g);
  
  P.shadow(10,4,.4);ctx.strokeStyle='#a16207';ctx.lineWidth=6;ctx.lineCap='round';[-5,5].forEach(o=>{ctx.beginPath();ctx.moveTo(fx+o*.4,g);ctx.lineTo(wx+2,ty+o);ctx.stroke()});P.noShadow();
  ctx.lineWidth=3;for(let i=1;i<10;i++){const t=i/10,x=fx+(wx-fx)*t,y=g+(ty-g)*t;ctx.beginPath();ctx.moveTo(x-4,y-3);ctx.lineTo(x+4,y+3);ctx.stroke()}
  P.glow(A.alpha(C.or,.9),14);P.ball(fx,g,12,C.or);P.noShadow();
  P.label(`5 m`,(fx+wx)/2+18,(g+ty)/2,{align:'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'});P.label(`foot ${f1(f)} m`,(fx+wx)/2,g+18,{pill:1,bg:A.alpha(C.or,.95),col:'#111'});
  P.label(`height ${f1(h)} m`,wx+8,ty-14,{align:'left',pill:1,bg:A.alpha(C.cy,.95),col:'#04121a'});
  P.label(`h² = 5² − ${f1(f)}² = 25 − ${+(f*f).toFixed(2)} = ${+(25-f*f).toFixed(2)}`,W*.6,H*.1,{font:`700 ${A.narrow?11:13}px system-ui`,pill:1,bg:A.alpha(C.panel||C.pn,.95)});
  if(!A.isDone){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 slide the foot ↔',fx+16,g-22,{align:'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}
  return{g,wx,u}};
 const tape=A=>{const{ctx,W,H,paint:P,col:C}=A,l=24,r=W-24,y=H-34,X=v=>l+v/40*(r-l);ctx.fillStyle='#facc15';P.shadow(6,3,.3);P.rrect(l-8,y-14,r-l+16,30,6);ctx.fill();P.noShadow();
  ctx.fillStyle='#111';ctx.textAlign='center';ctx.font='10px system-ui';for(let v=0;v<=40;v++){const x=X(v),m=v%5===0;ctx.fillRect(x,y-14,1,m?11:6);if(m)ctx.fillText(v,x,y+10)}
  const x=X(st.tape);ctx.fillStyle=C.rd;ctx.fillRect(x-1.5,y-20,3,36);P.ball(x,y-22,10,C.rd);P.label(st.tape+'',x,y-42,{font:'800 15px system-ui',pill:1,bg:'#0f172a',col:'#fde047'});return{X,y,v:px=>Math.max(0,Math.min(40,Math.round((px-l)/(r-l)*40)))}};
 const chalFig=A=>{const{ctx,W,H,paint:P,col:C}=A,q=st.q;if(!q)return;const s=Math.min((W*.6)/q.a,(H*.55)/q.b),ox=W/2-q.a*s/2,oy=H*.12+q.b*s;
  ctx.fillStyle=A.alpha(C.tx,.1);ctx.strokeStyle=C.tx;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+q.a*s,oy);ctx.lineTo(ox,oy-q.b*s);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.lineWidth=1.5;ctx.strokeRect(ox,oy-12,12,12);const lab=(t,x,y,col)=>P.label(t,x,y,{font:'800 15px system-ui',pill:1,bg:A.alpha(col,.95),col:'#111'});
  lab(q.find==='a'?'?':q.a+' m',ox+q.a*s/2,oy+16,q.find==='a'?C.am:C.or);lab(q.find==='b'?'?':q.b+' m',ox-26,oy-q.b*s/2,q.find==='b'?C.am:C.cy);lab(q.find==='c'?'?':q.c+' m',ox+q.a*s/2+26,oy-q.b*s/2-8,q.find==='c'?C.am:C.vi)};
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A;if(st.drag==="a"||st.drag==="b"){const k=Math.min(1,(dt||.016)*4);st.fit[0]+=(st.a-st.fit[0])*k;st.fit[1]+=(st.b-st.fit[1])*k}A.py={st,sqs,tri,view:()=>{const v=view(A);return{u:v.u,o:[v.X(0),v.Y(0)]}}};if(st.anim!=null){const tg=(st.fa?9:0)+(st.fb?16:0);if(st.anim<tg){st.anim=Math.min(tg,st.anim+dt*14);if(Math.floor(st.anim)!==Math.floor(st.anim-dt*14))A.sound.tick()}}
  if(A.step===0){park(A);return}if(A.step===4){ladder(A);return}
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  if(A.step===6){chalFig(A);tape(A);return}
  const v=view(A);figure(A,v);
  if(A.step===1){if(st.ghost){const s=st.ghost.s,o=[st.ghost.dx,st.ghost.dy];ctx.save();ctx.globalAlpha=.8;ctx.fillStyle=A.alpha(st.ghost.col,.6);poly(ctx,v,s.map(p=>[p[0]+o[0],p[1]+o[1]]));ctx.fill();ctx.restore()}
   if(!A.isDone&&!st.ghost){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);const tgt=st.fa?sqs().sb:sqs().sa,m=cen(tgt);P.label('👆 drag me into the purple square',v.X(m[0]),v.Y(m[1])+26,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}};
 const steps=[
  {h:'The park shortcut',p:'Walking round the park is 40 m + 30 m = 70 m. The dog cuts straight across to the ice-cream van.',predict:{q:'How long is the shortcut?',opts:['70 m','50 m','60 m'],ans:1},task:'Drag the dog along the path to the ice cream',show:()=>{st.dog=1;upd();chk()},go:()=>{st.dog=0;chk=()=>{if(st.dog>=.99)A.done('50 m, not 70 m and not 60 m. Why exactly 50? The squares on the sides explain it.'+A.reveal(0))}}},
  {h:'Squares on the sides',p:'Shrink the park to a 3-4 triangle (units of 10 m). Each side has a square built on it: 9 tiles and 16 tiles. The purple square sits on the long side, the hypotenuse.',task:'Drag the orange square, then the blue one, into the purple square',show:()=>{st.fa=st.fb=1;upd();chk()},go:()=>{st.a=3;st.b=4;st.th=90;st.fa=st.fb=0;st.anim=0;st.ord=null;chk=()=>{if(st.fa&&st.fb)A.done('9 + 16 = 25 tiles exactly fill the big square, and 25 = 5 × 5. So c = 5: the shortcut is 5 × 10 = 50 m. That is a² + b² = c².')}}},
  {h:'Build your own',p:'Drag the orange corner to change a and the blue corner to change b. Watch the three squares.',predict:{q:'If you double both short sides to 6 and 8, the long side becomes…',opts:['10 (it doubles too)','20','14'],ans:0},task:'Make a triangle with a = 6 and b = 8',show:()=>{st.a=6;st.b=8;A.tween(st.fit,{0:6,1:8},500);upd();chk()},go:()=>{st.a=3;st.b=4;st.th=90;chk=()=>{if(st.a===6&&st.b===8)A.done('36 + 64 = 100 and √100 = 10. Doubling the sides doubles c, but the areas go up 4 times.'+A.reveal(2))}}},
  {h:'Bend the corner',p:'The rule needs a right angle. Drag the blue corner to open the angle beyond 90°.',predict:{q:'When the angle is wider than 90°, c² is…',opts:['bigger than a² + b²','smaller than a² + b²','still equal'],ans:0},task:'Open the angle to at least 110°',show:()=>{st.th=120;upd();chk()},go:()=>{st.a=3;st.b=4;st.th=90;chk=()=>{if(st.th>=110)A.done(`At ${st.th}° c² = ${f1(csq())}, more than 25. a² + b² = c² only works for a right angle.`+A.reveal(3))}}},
  {h:'Find a shorter side',p:'A 5 m ladder leans on a wall. Its foot is 3 m from the wall.',predict:{q:'How high up the wall does it reach?',opts:['2 m (5 − 3)','4 m','8 m'],ans:1},task:'Slide the foot of the ladder to 3 m from the wall',show:()=>{st.lad=3;upd();chk()},go:()=>{st.lad=1.5;chk=()=>{if(st.lad===3)A.done('h² = 25 − 9 = 16, so h = 4 m. For a shorter side, subtract the squares, never the lengths.'+A.reveal(4))}}},
  {h:'Sandbox',p:'Drag both corners. Hunt for whole-number triangles: 5-12-13 and 8-6-10 are hiding here. When is c a whole number?',go:()=>{st.a=5;st.b=5;st.th=90;chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 const near=(p,x,y,r=26)=>Math.hypot(p.x-x,p.y-y)<r;
 A=FK.shell(c,{steps,ratio:.66,tall:1.12,draw,onStep:A=>{st.fit[0]=st.a;st.fit[1]=st.b;chal.hidden=A.step!==6;upd()},
  init:A=>{chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);A.every(()=>!A.isDone||st.anim!=null&&st.anim<((st.fa?9:0)+(st.fb?16:0)));
   A.gest({down:p=>{const s=A.step;if(s===0){if(A.pred[0]==null)return false;st.drag='dog';return true}
     if(s===4){st.drag='lad';return true}if(s===6){if(st.won)return false;st.drag='tape';return true}
     const v=view(A),{P:Pp,Q}=tri(),pt=[v.ix(p.x),v.iy(p.y)];
     if(s===1){const sq_=sqs();for(const[k,q,col]of[['fa',sq_.sa,A.col.or],['fb',sq_.sb,A.col.cy]])if(!st[k]&&inPoly(pt,q)){st.drag=k;st.ghost={s:q,dx:0,dy:0,col,p0:pt};A.sound.pop();return true}return false}
     if(s===3){if(near(p,v.X(Q[0]),v.Y(Q[1]),34)){st.drag='th';return true}return false}
     if(near(p,v.X(Q[0]),v.Y(Q[1]),30)){st.drag='b';return true}if(near(p,v.X(Pp[0]),v.Y(Pp[1]),30)){st.drag='a';return true}return false},
    move:p=>mv(p),up:p=>{if(p&&st.drag)mv(p);const d=st.drag;st.drag=null;if(d==='a'||d==='b')A.tween(st.fit,{0:st.a,1:st.b},500);
     if(A.step===1&&st.ghost){const g=st.ghost,m=cen(sqs().sc),c0=cen(g.s);if(Math.hypot(c0[0]+g.dx-m[0],c0[1]+g.dy-m[1])<2.2){st[d]=1;A.sound.whoosh();if(!st.ord)st.ord=d}else A.sound.miss();st.ghost=null;upd();chk()}
     A.redraw();if(A.step===6&&d==='tape')judge()}})}});
 const mv=p=>{const s=A.step,d=st.drag;if(!d)return;
  if(d==='dog'){const W=A.W,H=A.H,l=W*.12,r=W*.88,t=H*.2,b=H*.86,dx=r-l,dy=t-b,k=((p.x-l)*dx+(p.y-b)*dy)/(dx*dx+dy*dy),n=Math.max(0,Math.min(1,k));const snap=n>.985?1:Math.round(n*50)/50;if(snap!==st.dog){st.dog=snap;A.sound.tick();upd();chk()}return}
  if(d==='lad'){const W=A.W,wx=W*.18,u=Math.min((W*.72)/5,(A.H*.86-A.H*.1)/5.2),f=Math.max(.5,Math.min(4.8,Math.round((p.x-wx)/u*2)/2));if(f!==st.lad){st.lad=f;A.sound.tick();upd();chk()}return}
  if(d==='tape'){const v=tape(A).v(p.x);if(v!==st.tape){st.tape=v;A.sound.tick();A.redraw()}return}
  const v=view(A);if(st.ghost){const pt=[v.ix(p.x),v.iy(p.y)];st.ghost.dx=pt[0]-st.ghost.p0[0];st.ghost.dy=pt[1]-st.ghost.p0[1];A.redraw();return}
  if(d==='th'){const ang=Math.round(Math.atan2(v.iy(p.y),v.ix(p.x))*180/Math.PI);const th=Math.max(60,Math.min(135,ang));if(th!==st.th){st.th=th;A.sound.tick();upd();chk()}return}
  const val=Math.max(1,Math.min(8,Math.round(d==='a'?v.ix(p.x):v.iy(p.y))));if(val!==st[d]){st[d]=val;A.sound.tick();const c=Math.sqrt(csq());if(Number.isInteger(c))A.sound.pop();upd();chk()}};
 const T=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25],[15,20,25],[10,24,26]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%T.length;const[a,b,cc]=T[qi],find=['c','a','c','b'][Math.floor(Math.random()*4)];st.q={a,b,c:cc,find,ans:find==='c'?cc:find==='a'?a:b};st.tape=0;st.won=false;
  const known=find==='c'?`the two shorter sides are ${a} m and ${b} m`:`the hypotenuse is ${cc} m and one short side is ${find==='a'?b:a} m`;
  chal.innerHTML=`<p><b>A right-angled triangle: ${known}.</b> Work out the missing side <b>?</b>, then drag the red tape marker to it and let go.</p><p class="fl-fb" role="status" aria-live="polite"></p><span class="fl-kb"><button type="button" class="lbtn sm ghost" data-m="-1" aria-label="tape one metre less">◀ −1</button> <button type="button" class="lbtn sm ghost" data-m="1" aria-label="tape one metre more">+1 ▶</button> <button type="button" class="lbtn sm" data-ok>Check</button></span>`;
  chal.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(!st.won){st.tape=Math.max(0,Math.min(40,st.tape+ +b.dataset.m));A.sound.tick();A.redraw()}});chal.querySelector('[data-ok]').onclick=judge;upd()};
 const judge=()=>{const q=st.q,fb=chal.querySelector('.fl-fb'),v=st.tape;if(!q||st.won)return;const k=q.find==='a'?q.b:q.a;
  if(v===q.ans){st.won=true;fb.innerHTML=(q.find==='c'?`✓ ${q.a}² + ${q.b}² = ${sq(q.a)} + ${sq(q.b)} = ${sq(q.c)}, and √${sq(q.c)} = ${q.c} m.`:`✓ ${q.c}² − ${k}² = ${sq(q.c)} − ${sq(k)} = ${sq(q.ans)}, and √${sq(q.ans)} = ${q.ans} m.`)+' <button type="button" class="linkish">Another →</button>';A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();fb.textContent=q.find==='c'?(v===q.a+q.b?`You added the lengths: ${q.a} + ${q.b}. Square them first, add the squares, then take the square root.`:v<=Math.max(q.a,q.b)?'The hypotenuse is the longest side: it must be longer than both short sides.':Math.abs(v-q.ans)===1?'Very close. Check your square root: which number squared gives exactly a² + b²?':`Not quite: ${v}² = ${sq(v)}, but a² + b² = ${sq(q.a)+sq(q.b)}.`)
   :(v===q.c-k?`Subtracting lengths (${q.c} − ${k}) does not work. Subtract the squares: ${q.c}² − ${k}².`:v===Math.round(Math.sqrt(sq(q.c)+sq(k)))?'You added the squares. For a shorter side, subtract: c² − a².':v>=q.c?`A short side must be shorter than the hypotenuse (${q.c} m).`:`Not quite: ${v}² + ${k}² = ${sq(v)+sq(k)}, but it should equal ${q.c}² = ${sq(q.c)}.`)};
 A.start()})})();
