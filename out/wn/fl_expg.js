/* Flagship 44 – graphs of y = a·bˣ. The curve has two handles: the purple dot on the y-axis is (0, a), and the pink dot
   above x = 1 is (1, a·b), so dragging it up or down changes the factor b. A cyan probe walks along the curve one whole
   step at a time, with a staircase showing each step right as × b.
   (1) The y-intercept is a (trap: (0, 2) for 3 × 2ˣ). (2) 0 < b < 1 decays towards 0 (trap: "goes below 0").
   (3) Equal steps in x multiply y: 8 → 16, not 12. (4) Going left halves y forever; a zoom box shows 3 × 2⁻⁶ ≈ 0.047 > 0,
   so y = 0 is an asymptote (trap: "reaches 0 near x = −5"). (5) y = 0.25ˣ mirrors y = 4ˣ in the y-axis (trap: −4ˣ).
   Challenge: intercept, growth or decay, asymptote, values at negative x, and finding a·bˣ from two points. */
(()=>{const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'},sup=n=>String(n).replace(/[-\d]/g,d=>SUP[d]),
 F=v=>String(Math.abs(v)<1&&v!==0?Math.round(v*1000)/1000:Math.round(v*100)/100).replace('-','−'),X0=-6,X1=4,Y0=-2,Y1=24;
VIS.reg('flagexpg',c=>{let A,pad,chal,read;
 const S={ah:2,bh:200,px:0,ed:'a',ghost:false,stair:false,zoom:false,probe:false,hold:null,check:()=>{},seq:0,Q:null,cq:''};
 const a=()=>S.ah/2,b=()=>S.bh/100,f=x=>a()*Math.pow(b(),x),eq=(A_=a(),B_=b())=>`y = ${F(A_)} × ${F(B_)}ˣ`;
 const say=x=>{c.say(x);if(read)read.textContent=x};
 const kind=()=>S.bh>100?'growth: y rises faster and faster':S.bh<100?'decay: y falls towards 0':'b = 1: a flat line';
 function words(){const k=kind();let w=`${eq()} crosses the y-axis at (0, ${F(a())}). ${k[0].toUpperCase()+k.slice(1)}. At x = 1, y = ${F(a())} × ${F(b())} = ${F(f(1))}.`;
  if(S.probe)w+=` Probe at x = ${F(S.px)}: y = ${F(a())} × ${F(b())}${sup(S.px)} = ${F(f(S.px))}.`;return w}
 function upd(){say(words());sync();S.check()}
 const capB=v=>Math.min(v,Math.floor((Y1-.5)/a()*100/5)*5);
 const setA=v=>{S.ah=Math.max(1,Math.min(20,Math.round(v)));S.bh=Math.max(10,capB(S.bh));upd()};
 const setB=v=>{S.bh=Math.max(10,Math.min(400,capB(Math.round(v/5)*5)));upd()};
 const setX=v=>{S.px=Math.max(X0,Math.min(X1,Math.round(v)));upd()};
 function steps_(g,list){const z=++S.seq;let i=0;const go=()=>{if(z!==S.seq||i>=list.length)return;g(list[i++]);A.tween({u:0},{u:1},320,'io',go)};go()}
 function describe(){if(A.step===6)return S.cq||'Challenge.';
  return `Graph from x = ${X0} to ${X1}. `+words()+(S.ghost?' A grey dashed curve shows y = 4ˣ.':'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';
  const B=(t,lab,g)=>{const q=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab},pad,t);q.onclick=()=>{g();A.sound.tick()}};
  if(A.step===6)return A.redraw();
  if(S.ed.includes('a')){B('a − 0.5','Move the y-intercept down 0.5',()=>setA(S.ah-1));B('a + 0.5','Move the y-intercept up 0.5',()=>setA(S.ah+1))}
  if(S.ed.includes('b')){B('b − 0.25','Factor 0.25 smaller',()=>setB(S.bh-25));B('b − 0.05','Factor 0.05 smaller',()=>setB(S.bh-5));B('b + 0.05','Factor 0.05 bigger',()=>setB(S.bh+5));B('b + 0.25','Factor 0.25 bigger',()=>setB(S.bh+25))}
  if(S.probe){B('x − 1','Move the probe one step left',()=>setX(S.px-1));B('x + 1','Move the probe one step right',()=>setX(S.px+1))}
  A.redraw()}
 // ---- drawing ----
 function lay(){const N=A.narrow,W=A.W,H=A.H;return N?{N,x0:W*.1,x1:W*.96,y0:H*.05,y1:H*.76}:{N,x0:W*.07,x1:W*.62,y0:H*.06,y1:H*.92}}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,L=lay(),Q=A.step===6&&S.Q;S.L=L;
  const sx=x=>L.x0+(L.x1-L.x0)*(x-X0)/(X1-X0),sy=y=>L.y1-(L.y1-L.y0)*(y-Y0)/(Y1-Y0);S.sx=sx;S.sy=sy;
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.vi,.06)],[1,A.mix(C.pn,C.cy,.06)]]);ctx.fillRect(0,0,W,H);
  const lbl=(t,x,y,o={})=>P.label(t,x,y,{font:'700 11px system-ui',bg:A.alpha('#1e293b',.92),...o});
  ctx.lineWidth=1;for(let x=X0;x<=X1;x++){ctx.strokeStyle=A.alpha(C.tx,x===0?.6:.1);ctx.beginPath();ctx.moveTo(sx(x),L.y0);ctx.lineTo(sx(x),L.y1);ctx.stroke()}
  for(let y=0;y<=Y1;y+=4){ctx.strokeStyle=A.alpha(C.tx,y===0?.6:.1);ctx.beginPath();ctx.moveTo(L.x0,sy(y));ctx.lineTo(L.x1,sy(y));ctx.stroke()}
  ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.textAlign='center';ctx.textBaseline='top';for(let x=X0;x<=X1;x+=2)ctx.fillText(F(x),sx(x),sy(0)+3);
  ctx.textAlign='right';ctx.textBaseline='middle';for(let y=4;y<=Y1;y+=8)ctx.fillText(String(y),sx(0)-4,sy(y));
  const curve=(fa,fb,col,dash,w)=>{ctx.save();ctx.beginPath();ctx.rect(L.x0,L.y0,L.x1-L.x0,L.y1-L.y0);ctx.clip();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.setLineDash(dash);ctx.beginPath();
   for(let i=0;i<=240;i++){const x=X0+(X1-X0)*i/240,y=fa*Math.pow(fb,x);i?ctx.lineTo(sx(x),sy(y)):ctx.moveTo(sx(x),sy(y))}ctx.stroke();ctx.restore()};
  const ca=Q?Q.a:a(),cb=Q?Q.b:b();
  if(S.ghost&&!Q){curve(1,4,A.alpha(C.tx,.55),[6,5],2);lbl('y = 4ˣ',sx(1.6),sy(Math.min(20,Math.pow(4,1.6)))+2,{bg:A.alpha('#475569',.95)})}
  if(S.zoom||Q&&Q.ty==='asym'){ctx.setLineDash([6,4]);ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(L.x0,sy(0));ctx.lineTo(L.x1,sy(0));ctx.stroke();ctx.setLineDash([])}
  curve(ca,cb,C.vi,[],3);
  if(Q&&Q.ty==='match'){P.ball(sx(0),sy(Q.a),8,C.vi);P.ball(sx(1),sy(Q.a*Q.b),8,C.pk);lbl(`(0, ${F(Q.a)})`,sx(0)-34,sy(Q.a)-14);lbl(`(1, ${F(Q.a*Q.b)})`,sx(1)+36,sy(Q.a*Q.b)-14)}
  if(Q){P.label(Q.show,L.N?W*.08:W*.66,L.N?H*.88:H*.3,{align:'left',font:'800 14px system-ui',bg:A.alpha('#5b21b6',.95)});A.fx.draw(ctx);return}
  // staircase from x = 0 to the probe: each step right is × b
  if(S.stair&&S.px>0)for(let k=0;k<S.px;k++){const ya=f(k),yb=f(k+1);ctx.strokeStyle=C.pk;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(sx(k),sy(ya));ctx.lineTo(sx(k+1),sy(ya));ctx.lineTo(sx(k+1),sy(Math.min(yb,Y1)));ctx.stroke();
   lbl(`× ${F(b())}`,sx(k+1)+(L.N?20:26),sy((ya+Math.min(yb,Y1))/2),{bg:A.alpha('#831843',.95),font:'700 10px system-ui'})}
  if(S.zoom){const zx=L.x0+6,zy=L.y0+4,zw=(L.x1-L.x0)*.46,zh=(L.y1-L.y0)*.34,ZX=x=>zx+zw*(x+6)/4,ZY=y=>zy+zh-zh*y/.5;
   ctx.fillStyle=A.alpha(C.pn,.96);ctx.fillRect(zx,zy,zw,zh);ctx.strokeStyle=C.am;ctx.lineWidth=1.5;ctx.strokeRect(zx,zy,zw,zh);
   ctx.save();ctx.beginPath();ctx.rect(zx,zy,zw,zh);ctx.clip();ctx.strokeStyle=C.vi;ctx.lineWidth=2.5;ctx.beginPath();for(let i=0;i<=80;i++){const x=-6+4*i/80;i?ctx.lineTo(ZX(x),ZY(f(x))):ctx.moveTo(ZX(x),ZY(f(x)))}ctx.stroke();
   ctx.setLineDash([4,3]);ctx.strokeStyle=C.am;ctx.beginPath();ctx.moveTo(zx,ZY(0)-1);ctx.lineTo(zx+zw,ZY(0)-1);ctx.stroke();ctx.setLineDash([]);
   if(S.px<=-2)P.ball(ZX(S.px),ZY(f(S.px)),6,C.cy);ctx.restore();
   ctx.fillStyle=C.tx;ctx.font='700 10px system-ui';ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText('zoom: x −6 to −2, y 0 to 0.5',zx+4,zy+zh+4);lbl('asymptote y = 0',zx+zw-56,ZY(0)-12,{bg:A.alpha('#92400e',.95),font:'700 10px system-ui'})}
  // handles
  P.ball(sx(0),sy(a()),10,C.vi);S.h0=[sx(0),sy(a())];P.ball(sx(1),sy(Math.min(f(1),Y1)),9,C.pk);S.h1=[sx(1),sy(Math.min(f(1),Y1))];
  if(S.ed.includes('a'))lbl(`(0, ${F(a())})`,sx(0)-36,sy(a())+(S.zoom?16:-14),{bg:A.alpha('#5b21b6',.95)});
  if(S.ed.includes('b'))lbl(`(1, ${F(f(1))})`,sx(1)+40,sy(Math.min(f(1),Y1))+14,{bg:A.alpha('#831843',.95)});
  if(S.probe){const y=f(S.px),X=sx(S.px),Y=sy(Math.min(y,Y1));ctx.setLineDash([3,3]);ctx.strokeStyle=C.cy;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(X,sy(0));ctx.lineTo(X,Y);ctx.stroke();ctx.setLineDash([]);
   P.ball(X,Y,10,C.cy);S.ph=[X,Y];lbl(`(${F(S.px)}, ${F(y)})`,X+(S.px<0?44:-44),Y-18,{bg:A.alpha('#155e75',.95)})}
  const px=L.N?W*.06:W*.66,py=L.N?H*.84:H*.12;
  P.label(eq(),px,py,{align:'left',font:'800 14px system-ui',bg:A.alpha('#5b21b6',.95)});
  P.label(kind(),px,py+26,{align:'left',font:'700 11px system-ui',bg:A.alpha(S.bh>100?'#065f46':S.bh<100?'#991b1b':'#334155',.95)});
  if(S.probe)P.label(`x = ${F(S.px)}: ${F(a())} × ${F(b())}${sup(S.px)} = ${F(f(S.px))}`,px,py+50,{align:'left',font:'700 11px system-ui',bg:A.alpha('#155e75',.95)});
  A.fx.draw(ctx)}
 // ---- steps ----
 const won=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const start=o=>{S.seq++;S.check=()=>{};Object.assign(S,{px:0,ghost:false,stair:false,zoom:false,probe:false},o)};
 const steps=[
  {h:'Where it crosses the y-axis',p:'The purple dot is where the curve meets the y-axis. Drag it, or use the a buttons.',
   predict:{q:'Where does y = 3 × 2ˣ cross the y-axis?',opts:['(0, 2)','(0, 3)','(0, 6)'],ans:1},
   task:'Make the curve y = 3 × 2ˣ',show:()=>steps_(setA,[3,4,5,6]),
   go:()=>{start({ah:2,bh:200,ed:'a'});upd();S.check=won(0,()=>S.ah===6&&S.bh===200,()=>'At x = 0, 2⁰ = 1, so y = 3 × 1 = 3. The y-intercept is the start value a, whatever b is.')}},
  {h:'Growth or decay',p:'The pink dot sits above x = 1, at height a × b. Drag it down and watch the whole curve turn.',
   predict:{q:'For y = 3 × 0.5ˣ, as x gets bigger, y…',opts:['grows faster and faster','falls below 0','falls towards 0'],ans:2},
   task:'Make the curve y = 3 × 0.5ˣ',show:()=>steps_(setB,[150,100,75,50]),
   go:()=>{start({ah:6,bh:200,ed:'b'});upd();S.check=won(1,()=>S.ah===6&&S.bh===50,()=>'At x = 1, y = 3 × 0.5 = 1.5: each step right halves y. b > 1 is growth, 0 < b < 1 is decay, and both curves pass through (0, 3).')}},
  {h:'Each step multiplies by b',p:'y = 2 × 2ˣ. Drag the cyan probe along the curve, or use x + 1. The pink steps show what happens to y.',
   predict:{q:'On y = 2 × 2ˣ, y is 8 at x = 2. At x = 3, y is…',opts:['10','12','16'],ans:2},
   task:'Move the probe to x = 3',show:()=>steps_(setX,[1,2,3]),
   go:()=>{start({ah:4,bh:200,ed:'',probe:true,stair:true});upd();S.check=won(2,()=>S.px===3,()=>'8 → 16 is × 2 again. Equal steps in x multiply y by b; they do not add the same amount. So the gaps grow (2, 4, 8) and the curve gets steeper.')}},
  {h:'The curve never reaches 0',p:'Back to y = 3 × 2ˣ. Walk the probe to the left. The zoom box blows up the part near y = 0.',
   predict:{q:'If you go far enough left, does y = 3 × 2ˣ reach 0?',opts:['Yes, near x = −5','No: it halves each step but stays above 0','Yes, and then it goes below 0'],ans:1},
   task:'Move the probe to x = −6',show:()=>steps_(setX,[-2,-4,-6]),
   go:()=>{start({ah:6,bh:200,ed:'',probe:true,zoom:true});upd();S.check=won(3,()=>S.px===-6,()=>'At x = −6, y = 3 × 2⁻⁶ = 3/64 ≈ 0.047. Each step left halves y, and half of a positive number is still positive. The line y = 0 is a horizontal asymptote.')}},
  {h:'A mirror image',p:'The grey dashed curve is y = 4ˣ (a = 1). Change a and b to draw its mirror image in the y-axis.',
   predict:{q:'y = 4ˣ reflected in the y-axis is…',opts:['y = −4ˣ','y = 0.25ˣ','y = 4ˣ − 1'],ans:1},
   task:'Draw the mirror image of y = 4ˣ',show:()=>steps_(v=>v>9?setB(v):setA(v),[3,2,75,50,25]),
   go:()=>{start({ah:4,bh:100,ed:'ab',ghost:true});upd();S.check=won(4,()=>S.ah===2&&S.bh===25,()=>'0.25ˣ = (1/4)ˣ = 4⁻ˣ, so y = 0.25ˣ is y = 4ˣ with x swapped for −x: a reflection in the y-axis. Both pass through (0, 1). y = −4ˣ would flip it below the x-axis instead.')}},
  {h:'Sandbox',p:'Change a, b and the probe. What does b = 1 draw? Can any a > 0 and b > 0 make the curve touch y = 0?',go:()=>{start({ah:4,bh:150,ed:'ab',probe:true});upd()}},
  {h:'Challenge',p:'',go:()=>{start({ed:''});ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
 // ---- challenge: wrong options are real graph-reading slips ----
 const IN=[[5,.8],[2,3],[7,.5],[4,1.5],[6,2]],KD=[[6,.7],[4,1.3],[2,.9],[5,2.5]],AS=[[2,3],[5,.5],[1,4],[8,.75]],
  VL=[[3,2,-1],[8,.5,2],[4,2,-2],[2,3,2],[9,3,-2]],MT=[[4,1.5],[2,3],[6,.5],[10,.2],[3,2]],TY=['int','kind','val','asym','match'];let qn=-1,run=0;
 function ask(){say('');qn++;const ty=TY[qn%5],i=Math.floor(qn/5);let q,o,Q;
  if(ty==='int'){const[A_,B_]=IN[i%5];Q={ty,a:A_,b:B_,show:eq(A_,B_)};q=`Where does ${eq(A_,B_)} cross the y-axis?`;o=[[`(0, ${F(A_)})`,'ok'],[`(0, ${F(B_)})`,'b'],[`(0, ${F(A_*B_)})`,'one'],[`(${F(A_)}, 0)`,'swap']]}
  else if(ty==='kind'){const[A_,B_]=KD[i%4];Q={ty,a:A_,b:B_,show:eq(A_,B_)};q=`Which describes the graph of ${eq(A_,B_)}?`;
   o=B_<1?[['Decay: it falls towards 0 but never reaches it','ok'],['Growth: b is positive','pos'],[`Decay: it reaches 0 at x = ${F(A_)}`,'hits'],['Decay: it goes below 0 for large x','neg']]
    :[['Growth: it rises faster and faster','ok'],[`Decay: ${F(B_)} is smaller than ${F(A_)}`,'small'],[`Growth: it rises by ${F(B_)} each step`,'line']]}
  else if(ty==='asym'){const[A_,B_]=AS[i%4],side=B_>1?'very negative':'very large';Q={ty,a:A_,b:B_,side,show:eq(A_,B_)};q=`As x gets ${side}, what does ${eq(A_,B_)} get close to?`;
   o=[['y = 0','ok'],[`y = ${F(A_)}`,'a'],['It goes below 0','neg'],['x = 0','axis']]}
  else if(ty==='val'){const[A_,B_,x]=VL[i%5],v=A_*Math.pow(B_,x);Q={ty,a:A_,b:B_,x,show:`${eq(A_,B_)}, x = ${F(x)}`};q=`Find y on ${eq(A_,B_)} when x = ${F(x)}.`;
   o=[[F(v),'ok'],[F(A_*B_*x),'times'],[x<0?`1/${F(Math.pow(A_*B_,-x))}`:F(Math.pow(A_*B_,x)),'bfirst'],[F(x<0?A_*Math.pow(B_,-x):A_+B_*x),x<0?'abs':'add']]}
  else{const[A_,B_]=MT[i%5],y1=A_*B_,d=y1-A_;Q={ty,a:A_,b:B_,show:'(0, '+F(A_)+') and (1, '+F(y1)+')'};q=`A curve y = a × bˣ passes through (0, ${F(A_)}) and (1, ${F(y1)}). Which is it?`;
   o=[[eq(A_,B_),'ok'],[eq(y1,B_),'a1'],[eq(A_,y1),'bval'],[`y = ${F(A_)} ${d<0?'−':'+'} ${F(Math.abs(d))}x`,'lin']]}
  S.Q=Q;const seen=new Set();o=o.filter(z=>!seen.has(z[0])&&seen.add(z[0]));const r=qn%o.length;o=o.slice(r).concat(o.slice(0,r));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(z=>{const q2=c.el('button',{type:'button',class:'lbtn sm'},row,z[0]);q2.onclick=()=>grade(z[1])});
  S.cq='Challenge: '+q+` The graph shows ${eq(Q.a,Q.b)}.`;if(ty==='match')S.cq='Challenge: '+q+' The graph marks both points.';A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function grade(key){chal.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=S.Q,a_=F(Q.a),b_=F(Q.b);let m,fix;
  if(Q.ty==='int')fix=`At x = 0, ${b_}⁰ = 1, so y = ${a_}: the curve crosses at (0, ${a_}).`;
  else if(Q.ty==='kind')fix=Q.b<1?`b = ${b_} is between 0 and 1, so each step right multiplies y by ${b_}: decay towards the asymptote y = 0.`:`b = ${b_} is above 1, so each step right multiplies y by ${b_}: growth that gets steeper.`;
  else if(Q.ty==='asym')fix=`Each step ${Q.b>1?'left divides':'right multiplies'} y by ${Q.b>1?b_:b_}, so y shrinks towards 0 but stays positive. y = 0 is the asymptote.`;
  else if(Q.ty==='val')fix=`${b_}${sup(Q.x)} = ${Q.x<0?'1/'+F(Math.pow(Q.b,-Q.x))+' = ':''}${F(Math.pow(Q.b,Q.x))}, then × ${a_} = ${F(Q.a*Math.pow(Q.b,Q.x))}.`;
  else fix=`(0, ${a_}) gives a = ${a_}. At x = 1, y = a × b, so b = ${F(Q.a*Q.b)} ÷ ${a_} = ${b_}.`;
  if(key==='ok')m=fix;
  else if(key==='b')m=`${b_} is the factor; it sets the shape, not where the curve crosses. ${fix}`;
  else if(key==='one')m=`${F(Q.a*Q.b)} is y at x = 1, not x = 0. ${fix}`;
  else if(key==='swap')m=`That point is on the x-axis. The y-axis is where x = 0. ${fix}`;
  else if(key==='pos')m=`b is positive for growth and decay alike. What matters is whether b is above or below 1. ${fix}`;
  else if(key==='hits'||key==='neg')m=`a × bˣ with a > 0 and b > 0 is always positive, so the curve never reaches or crosses y = 0. ${fix}`;
  else if(key==='small')m=`Compare b with 1, not with a. ${fix}`;
  else if(key==='line')m=`Rising by the same amount each step is a straight line. An exponential multiplies. ${fix}`;
  else if(key==='a')m=`y = ${a_} is the y-intercept, which the curve passes through, not a level it settles at. ${fix}`;
  else if(key==='axis')m=`x = 0 is the y-axis, which the curve crosses once. The asymptote is a horizontal line. ${fix}`;
  else if(key==='times')m=`bˣ means ${b_} multiplied ${Math.abs(Q.x)} times${Q.x<0?' and then 1 over it':''}, not ${b_} × ${F(Q.x)}. ${fix}`;
  else if(key==='bfirst')m=`The power belongs to ${b_} only, not to ${a_} × ${b_}. ${fix}`;
  else if(key==='abs')m=`A negative power means 1 over the positive power, so y gets smaller to the left, not bigger. ${fix}`;
  else if(key==='add')m=`That added ${b_} for each step. Each step multiplies by ${b_}. ${fix}`;
  else if(key==='a1')m=`a is the y-value at x = 0, so a = ${a_}, not ${F(Q.a*Q.b)}. ${fix}`;
  else if(key==='bval')m=`${F(Q.a*Q.b)} is y at x = 1; b is how many times bigger it is than y at x = 0. ${fix}`;
  else m=`A straight line also fits two points, but it is not of the form a × bˣ. ${fix}`;
  if(key==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)S.Q=null;sync()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},wrap);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change a, b or the probe'},wrap);chal=E('div',{class:'fl-chal'},A.below);
   const yOf=p=>Y0+(Y1-Y0)*(S.L.y1-p.y)/(S.L.y1-S.L.y0),xOf=p=>X0+(X1-X0)*(p.x-S.L.x0)/(S.L.x1-S.L.x0),near=(h,p)=>h&&Math.hypot(p.x-h[0],p.y-h[1])<28;
   A.gest({down:p=>{if(A.step===6||!S.L)return false;
     if(S.probe&&near(S.ph,p)){S.hold='x';return true}
     if(S.ed.includes('a')&&near(S.h0,p)){S.hold='a';return true}
     if(S.ed.includes('b')&&near(S.h1,p)){S.hold='b';return true}return false},
    move:p=>{if(!S.hold)return;if(S.hold==='a'){S.ah=Math.max(1,Math.min(20,Math.round(yOf(p)*2)));S.bh=Math.max(10,capB(S.bh))}
     else if(S.hold==='b')S.bh=Math.max(10,Math.min(400,capB(Math.round(yOf(p)/a()*20)*5)));else S.px=Math.max(X0,Math.min(X1,Math.round(xOf(p))));
     A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const h=S.hold;S.hold=null;if(h)upd()}});sync()}});
 A.start()})})();
