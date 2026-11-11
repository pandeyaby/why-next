/* Flagship 50 – exact trig values from two special triangles. Fold an equilateral triangle (side 2) in half, find the
   height √3, tap corners and sides for sin 60°, cos 30°, tan 30°; cut a unit square for 45°; swing to 90°; a 6 m ladder at
   60° reaches 3√3 m. Challenge options are named slips. */
(()=>{const R3=Math.sqrt(3),DG=Math.PI/180,r2=x=>String(+x.toFixed(2)),cl=(v,a,b)=>Math.max(a,Math.min(b,v)),c2=x=>Math.round(x*100)/100;
 const EX={0:['0','1','0'],30:['1/2','√3/2','√3/3'],45:['√2/2','√2/2','1'],60:['√3/2','1/2','√3'],90:['1','0',null]},FN=['sin','cos','tan'];
 const ex=(f,t)=>{const v=(EX[t]||[])[FN.indexOf(f)];return v===undefined?null:v};
 const surd=(k,n)=>n===1?String(k):(k===1?'':k)+'√'+n;
VIS.reg('flagexact',c=>{let A,pad,chal,read;
 const G={f:.4,h:1,x:.3,th:30,L:1,seq:[],got:0,bad:'',tok:0,want:()=>{},Q:null,cq:'',drag:null,shk:0,M:null};
 const V=()=>A.step===9?'sw':['eq','half','half','half','half','sq','sw','sw','sw'][A.step];
 const tell=t=>{G.said=t;c.say(t);if(read)read.textContent=t};
 // ---- the three models ----
 const footAng=f=>{const ax=1-f,ay=R3;return Math.acos(-ax/Math.hypot(ax,ay))/DG};
 function setF(v){G.f=cl(v,.2,1.8);if(Math.abs(G.f-1)<.05)G.f=1;G.f=c2(G.f);const a=footAng(G.f),b=180-60-a;
  tell(G.f===1?'Midpoint: the halves match, angles 60°, 90°, 30°, base 1, hypotenuse 2.':`Fold foot at ${r2(G.f)}. Left piece: 60°, ${Math.round(a)}°, ${Math.round(b)}°. The pieces do not match.`);sync();G.want()}
 function setH(v){G.h=cl(v,.4,2.4);if(Math.abs(G.h-R3)<.04)G.h=R3;else G.h=c2(G.h);const hy=Math.hypot(1,G.h);
  tell(G.h===R3?'1² + h² = 1 + 3 = 4 = 2², so h = √3 ≈ 1.73 and the hypotenuse is 2.':`1² + ${r2(G.h)}² = ${r2(1+G.h*G.h)}: hypotenuse ${r2(hy)}. For 2, 1 + h² must be 4.`);sync();G.want()}
 function setX(v){G.x=cl(v,.1,1.6);if(Math.abs(G.x-1)<.04)G.x=1;G.x=c2(G.x);const a=Math.atan2(1,G.x)/DG;
  tell(G.x===1?'Corner to corner: legs 1 and 1, angles 45° and 45°, diagonal √(1² + 1²) = √2 ≈ 1.41.':`Legs 1 and ${r2(G.x)}, angles ${Math.round(90-a)}° and ${Math.round(a)}°, cut ${r2(Math.hypot(1,G.x))} long.`);sync();G.want()}
 function setT(v){let t=cl(Math.round(v),0,90);for(const k of[0,30,45,60,90])if(Math.abs(t-k)<=2)t=k;G.th=t;tell(swLine());sync();G.want()}
 function swLine(){const t=G.th,L=G.L,s=Math.sin(t*DG),k=Math.cos(t*DG),e=EX[t];
  if(e)return`θ = ${t}°: sin = ${e[0]}, cos = ${e[1]}, tan = ${e[2]||'no value (adjacent is 0)'}. Height ${L} × sin ${t}° = ${hgt(t,L)}.`;
  return`θ = ${t}°: sin ≈ ${s.toFixed(3)}, cos ≈ ${k.toFixed(3)}. Not a special angle.`}
 const hgt=(t,L)=>{const n={30:1,45:2,60:3}[t];if(!n)return t===90?String(L):t===0?'0':r2(L*Math.sin(t*DG));const x=L%2?(L===1&&n>1?'':L)+(n>1?'√'+n:'')+'/2':surd(L/2,n);return n===1?x:x+' ≈ '+r2(L*Math.sqrt(n)/2)};
 // ---- tapping corners and sides of the 30-60-90 half ----
 const NAMES={c30:'the 30° corner',c60:'the 60° corner',c90:'the right angle',sb:'side 1',sv:'side √3',sh:'side 2'};
 const TOUCH={c30:['sv','sh'],c60:['sb','sh'],c90:['sb','sv']},OPP={c30:'sb',c60:'sv',c90:'sh'};
 function tap(k){if(!G.seq.length||G.got>=G.seq.length)return;const want=G.seq[G.got],corner=G.seq[0];
  if(k===want){G.bad='';G.got++;A.sound.tick();tell(G.got===1?`${NAMES[k].replace('the','The')} picked. Now the side${G.seq.length>2?'s':''}.`:`✓ ${NAMES[k]}`);sync();G.want();return}
  G.bad=k;G.shk=1;A.tween(G,{shk:0},420,'out');A.sound.miss();let m;
  if(want[0]==='c')m=`That is ${NAMES[k]||'a side'}. Start with ${NAMES[want]}: its angle decides which side is opposite.`;
  else if(k==='sh')m='Side 2 is opposite the right angle, so it is the hypotenuse.';
  else if(k[0]==='c')m='A corner is picked already. Now tap a side.';
  else if(k===OPP[corner])m=`${NAMES[k]} does not touch ${NAMES[corner]}, so it is the opposite side, not the adjacent one.`;
  else m=`${NAMES[k]} touches ${NAMES[corner]}, so it is adjacent, not opposite.`;
  tell(m[0].toUpperCase()+m.slice(1));sync()}
 // ---- layout ----
 function fit(b){const N=A.narrow,W=A.W,H=A.H,rx=N?W*.12:W*.07,ry=N?H*.07:H*.1,rw=N?W*.76:W*.5,rh=N?H*.58:H*.78,u=Math.min(rw/(b[1]-b[0]),rh/(b[3]-b[2]));
  const ox=rx+(rw-u*(b[1]-b[0]))/2-b[0]*u,oy=ry+rh-(rh-u*(b[3]-b[2]))/2+b[2]*u;return{u,P:(x,y)=>[ox+x*u,oy-y*u],I:(sx,sy)=>[(sx-ox)/u,(oy-sy)/u]}}
 const box=v=>v==='eq'?[0,2,0,R3]:v==='half'?[-.5,1.1,0,2.1]:v==='sq'?[0,1.7,0,1.1]:[-.05,G.L*1.05,0,G.L*1.02];
 function shape(ctx,pts,fill,line,w=2.5){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(line){ctx.strokeStyle=line;ctx.lineWidth=w;ctx.stroke()}}
 function seg(ctx,a,b,col,w=3,dash){ctx.setLineDash(dash||[]);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();ctx.setLineDash([])}
 const mid=(a,b,dx=0,dy=0)=>[(a[0]+b[0])/2+dx,(a[1]+b[1])/2+dy];
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,PK='#9d174d',v=V(),Q=A.step===9&&G.Q,M=fit(box(v)),T=(x,y)=>M.P(x,y),tag=(t,p,bg)=>P.label(t,p[0],p[1],{font:'800 12px system-ui',bg:bg||'#1e293b'});G.M=M;G.hd={};
  ctx.fillStyle=A.mix(C.pn,C.am,.05);ctx.fillRect(0,0,W,H);ctx.save();ctx.translate(G.shk*Math.sin(G.shk*30)*5,0);
  if(v==='eq'){const a=T(0,0),b=T(2,0),p=T(1,R3),f=T(G.f,0);shape(ctx,[a,f,p],A.alpha(C.am,.3));shape(ctx,[f,b,p],A.alpha(C.cy,.22));shape(ctx,[a,b,p],null,C.tx);
   seg(ctx,p,f,C.pk,3,[7,5]);[[a,p],[p,b],[a,b]].forEach(([x,y],i)=>tag('2',mid(x,y,i===0?-16:i===1?16:0,i===2?16:0)));
   tag('60°',[a[0]+30,a[1]-14]);tag('60°',[b[0]-30,b[1]-14]);const fa=Math.round(footAng(G.f));tag(fa+'°',[f[0]-18,f[1]-16],PK);tag((120-fa)+'°',[p[0]-14,p[1]+40],PK);
   if(G.f===1)tag('1',[mid(a,f)[0],a[1]+16]);P.ball(f[0],f[1],11,C.pk);G.hd.foot=f}
  else if(v==='half'){const o=T(0,0),b=T(1,0),h=A.step===1?G.h:R3,p=T(0,h),hy=Math.hypot(1,h);
   if(A.step===1){const c0=T(1,0);ctx.strokeStyle=A.alpha(C.pk,.55);ctx.lineWidth=2;ctx.setLineDash([4,5]);ctx.beginPath();ctx.arc(c0[0],c0[1],2*M.u,-140*DG,-100*DG);ctx.stroke();ctx.setLineDash([]);tag('hyp = 2 here',T(-.15,2.05),PK)}
   shape(ctx,[o,b,p],A.alpha(C.am,.28));const S={sb:[o,b],sv:[o,p],sh:[p,b]},on=k=>G.seq.slice(0,G.got).includes(k);
   for(const k in S)seg(ctx,S[k][0],S[k][1],on(k)?C.gr:G.bad===k?C.rd:C.tx,on(k)?6:3);G.hd.sides=S;
   const s=M.u*.18;ctx.strokeStyle=C.tx;ctx.lineWidth=1.5;ctx.strokeRect(o[0],o[1]-s,s,s);
   tag('1',mid(o,b,0,16));tag(A.step===1?(G.h===R3?'√3':r2(h)):'√3',mid(o,p,-22,0));tag(A.step===1?r2(hy):'2',mid(p,b,18,-8));
   const cn={c30:[p,[p[0]+16,p[1]+44]],c60:[b,[b[0]-36,b[1]-14]],c90:[o,[o[0]+26,o[1]-26]]};G.hd.corners={};
   for(const k in cn){const[q,lp]=cn[k];G.hd.corners[k]=q;if(A.step>1){const pick=G.seq[0]===k&&G.got>0;tag(k.slice(1)+'°',lp,pick?'#065f46':G.bad===k?'#991b1b':0);if(pick)P.ball(q[0],q[1],9,C.gr)}}
   if(A.step===1){P.ball(p[0],p[1],11,C.pk);G.hd.top=p}}
  else if(v==='sq'){const o=T(0,0),q=T(1,0),r=T(1,1),s=T(0,1),e=T(G.x,1);shape(ctx,[o,q,r,s],A.alpha(C.cy,.14),C.tx,2);shape(ctx,[o,s,e],A.alpha(C.am,.32));seg(ctx,o,e,C.pk,4,[8,5]);
   tag('1',mid(o,s,-16,0));tag(r2(G.x),mid(s,e,0,-14));tag(G.x===1?'√2':r2(Math.hypot(1,G.x)),mid(o,e,18,10),PK);const a=Math.round(Math.atan2(1,G.x)/DG);
   tag((90-a)+'°',[o[0]+12,o[1]-44]);tag(a+'°',[e[0]-22,e[1]+18]);P.ball(e[0],e[1],11,C.pk);G.hd.cut=e}
  else{const t=Q?Q.t:G.th,L=Q?Q.L:G.L,M2=Q?fit([-.05,L*1.05,0,L*1.02]):M,U=(x,y)=>M2.P(x,y),o=U(0,0),tp=U(L*Math.cos(t*DG),L*Math.sin(t*DG)),ft=U(L*Math.cos(t*DG),0);
   ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(o[0],o[1],L*M2.u,-Math.PI/2,0);ctx.stroke();
   shape(ctx,[o,ft,tp],A.alpha(C.gr,.22));seg(ctx,o,tp,C.tx,3);seg(ctx,ft,tp,C.pk,4);seg(ctx,o,ft,C.cy,4);
   tag(Q&&Q.k!=='len'?'hyp':'hyp '+L,mid(o,tp,-18,-12));tag(t+'°',[o[0]+40,o[1]-14]);
   if(!Q){tag('opp '+hgt(t,L).split(' ≈')[0],[tp[0]+(A.narrow?-20:40),(tp[1]+ft[1])/2],PK);tag('adj',mid(o,ft,0,16),'#155e75');P.ball(tp[0],tp[1],11,C.pk);G.hd.tip=tp}}
  ctx.restore();
  const N=A.narrow,px=N?W*.06:W*.6,py=N?H*.76:H*.2,lh=N?21:27,al={align:'left',font:'700 12px system-ui',bg:'#334155'};
  const lines=Q?[Q.k==='val'?'exact value, no calculator':Q.k==='edge'?'the edge angles 0° and 90°':'exact length in surd form']:panel(v);
  lines.forEach((t,i)=>P.label(t,px,py+i*lh,i?al:{...al,font:'800 13px system-ui',bg:'#5b21b6'}));A.fx.draw(ctx)}
 function panel(v){const s=A.step;if(v==='eq')return['equilateral: sides 2, angles 60°','fold from the top'];
  if(s===1)return['base 1, hypotenuse 2',`1² + h² = ${G.h===R3?'4':r2(1+G.h*G.h)}`];
  if(v==='half')return[['','','sin 60° = opp ÷ hyp','cos 30° = adj ÷ hyp','tan 30° = opp ÷ adj'][s],'sides 1, √3, 2'];
  if(v==='sq')return['unit square, sides 1',G.x===1?'sin 45° = cos 45° = √2/2, tan 45° = 1':'cut to the far corner'];
  const e=EX[G.th];return[e?`sin ${G.th}° = ${e[0]}, cos ${G.th}° = ${e[1]}`:`θ = ${G.th}°`,e?`tan ${G.th}° = ${e[2]||'no value'}`:'special: 0, 30, 45, 60, 90']}
 const VD={eq:'Equilateral triangle, side 2, with a fold.',half:'Right triangle, base 1: 60° at the base, 30° at the top.',sq:'Unit square with a cut.',sw:'Right triangle on the ground.'};
 const describe=()=>A.step===9?G.cq||'Challenge.':VD[V()]+' '+(G.said||'');
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return A.redraw();pad.innerHTML='';const v=V(),s=A.step;
  const btn=(t,f)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);b.onclick=()=>{f();A.sound.tick()}},two=(a,b,set,val,d)=>{btn(a,()=>set(val()-d));btn(b,()=>set(val()+d))};
  if(s===9)return A.redraw();
  if(v==='eq')two('◀ Fold left','Fold right ▶',setF,()=>G.f,.1);
  else if(s===1)two('Height − 0.1','Height + 0.1',setH,()=>G.h,.1);
  else if(v==='half')['c30','c60','c90','sb','sv','sh'].forEach(k=>btn(NAMES[k].replace(/^the /,''),()=>tap(k)));
  else if(v==='sq')two('◀ Cut left','Cut right ▶',setX,()=>G.x,.1);
  else{two('−15°','+15°',setT,()=>G.th,15);two('−5°','+5°',setT,()=>G.th,5)}
  A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const fresh=()=>{G.tok++;G.want=()=>{};G.seq=[];G.got=0;G.bad=''};
 const glide=(key,to,set,ms=900)=>{const o={v:G[key]},k=++G.tok;A.tween(o,{v:to},ms,'io',()=>{if(k===G.tok)set(to)})};
 const taps=list=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=list.length)return;tap(list[i++]);A.tween({u:0},{u:1},380,'io',nx)};nx()};
 const tapStep=(st,seq,msg)=>()=>{fresh();G.seq=seq;tell('Tap a corner, then a side.');G.want=fin(st,()=>G.got===seq.length,msg)};
 const steps=[
  {h:'Fold the triangle',p:'Every side is 2 and every angle is 60°. Drag the pink foot of the fold along the base.',
   predict:{q:'Fold it exactly in half. Each half has angles…',opts:['60°, 60°, 60°','30°, 60°, 90°','45°, 45°, 90°'],ans:1},
   task:'Move the fold until the two halves match',show:()=>glide('f',1,setF),
   go:()=>{fresh();setF(.4);G.want=fin(0,()=>G.f===1,()=>'The fold meets the base at 90° and splits the top 60° into two 30°s: each half is 30°, 60°, 90°, base 1, hypotenuse 2.')}},
  {h:'How tall is the half?',p:'Keep the base 1. Drag the top corner up until the hypotenuse reaches the dashed arc, where it is 2.',
   predict:{q:'The height of the half triangle is…',opts:['1, because 2 − 1 = 1','√3, about 1.73','1.5, halfway'],ans:1},
   task:'Make the hypotenuse exactly 2',show:()=>glide('h',R3,setH),
   go:()=>{fresh();setH(1);G.want=fin(1,()=>G.h===R3,()=>'Pythagoras: h² = 2² − 1² = 3, so h = √3. Subtracting the lengths, 2 − 1, skips the squares.')}},
  {h:'sin 60°',p:'Sides 1, √3, 2. sin = opposite ÷ hypotenuse. The opposite side is the one that does not touch the angle.',
   predict:{q:'sin 30° = 1/2. So sin 60° is…',opts:['1, double sin 30°','√3/2, about 0.87','2/3, because 60 ÷ 90'],ans:1},
   task:'Tap the 60° corner, then the side opposite it',show:()=>taps(['c60','sv']),
   go:tapStep(2,['c60','sv'],()=>'Opposite 60° is √3 and the hypotenuse is 2: sin 60° = √3/2 ≈ 0.866. Doubling the angle did not double the sine.')},
  {h:'cos 30°',p:'cos = adjacent ÷ hypotenuse. The adjacent side touches the angle but is not the hypotenuse.',
   predict:{q:'cos 30° is…',opts:['1/2, the same as sin 30°','√3/2, the same as sin 60°','2/√3'],ans:1},
   task:'Tap the 30° corner, then the side adjacent to it',show:()=>taps(['c30','sv']),
   go:tapStep(3,['c30','sv'],()=>'The same √3 side: cos 30° = √3/2 = sin 60°. The two acute angles swap opposite and adjacent, so cos 60° = sin 30° = 1/2 too.')},
  {h:'tan 30°',p:'tan = opposite ÷ adjacent, no hypotenuse at all.',
   predict:{q:'tan 30° is…',opts:['√3','1/√3, which is √3/3, about 0.58','1/2'],ans:1},
   task:'Tap the 30° corner, then its opposite side, then its adjacent side',show:()=>taps(['c30','sb','sv']),
   go:tapStep(4,['c30','sb','sv'],()=>'tan 30° = 1 ÷ √3 = √3/3 ≈ 0.577. Upside down, √3 ÷ 1, is tan 60°.')},
  {h:'Half a square',p:'A unit square. Drag the pink end of the cut along the top edge.',
   predict:{q:'The diagonal of a 1 by 1 square is…',opts:['2, one plus one','√2, about 1.41','1'],ans:1},
   task:'Cut from corner to corner',show:()=>glide('x',1,setX),
   go:()=>{fresh();setX(.3);G.want=fin(5,()=>G.x===1,()=>'Legs 1 and 1, so the diagonal is √2 and both angles are 45°. sin 45° = cos 45° = 1/√2 = √2/2 ≈ 0.707, and tan 45° = 1 ÷ 1 = 1.')}},
  {h:'All the way to 90°',p:'The hypotenuse is 1, so the pink height is sin θ and the blue base is cos θ. Drag the tip round.',
   predict:{q:'At 90°, tan 90° is…',opts:['1','0','no value: it divides by 0'],ans:2},
   task:'Swing the angle up to 90°',show:()=>glide('th',90,setT,1100),
   go:()=>{fresh();G.L=1;setT(30);G.want=fin(6,()=>G.th===90,()=>'At 90° the height is the whole hypotenuse and the base is 0: sin 90° = 1, cos 90° = 0, tan 90° = 1 ÷ 0, no value. At 0°: sin 0, cos 1, tan 0.')}},
  {h:'Exact lengths',p:'Now the hypotenuse is a 6 m ladder. An exact value keeps the answer exact.',
   predict:{q:'A 6 m ladder leans at 60° to the ground. The top is how high?',opts:['3 m','3√3 m, about 5.20 m','6√3 m'],ans:1},
   task:'Set the ladder to 60°',show:()=>glide('th',60,setT),
   go:()=>{fresh();G.L=6;setT(20);G.want=fin(7,()=>G.th===60,()=>'Height = 6 × sin 60° = 6 × √3/2 = 3√3 ≈ 5.20 m. 3 m is the base, 6 × cos 60°.')}},
  {h:'Sandbox',p:'Hypotenuse 2. Visit 0°, 30°, 45°, 60°, 90°. The sines are √0/2, √1/2, √2/2, √3/2, √4/2, and the cosines run the same list backwards.',go:()=>{fresh();G.L=2;setT(45)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge: every wrong option is a known slip ----
 let n=-1,run=0;const TS=[30,45,60],KS=['val','edge','len','val'],CN={val:0,edge:0,len:0};
 function ask(){tell('');n++;const k=KS[n%4],i=CN[k]++;let q,o,t,f,L=1,sd;
  if(k==='val'){t=TS[i%3];f=FN[(i+(i/3|0))%3];const j=FN.indexOf(f),e=EX[t];q=`What is the exact value of ${f} ${t}°?`;
   o=[[e[j],'ok']];if(f!=='tan'){o.push([e[1-j],'swap'],[e[j].replace('/2',''),'nohalf'],[{30:'1/3',45:'1/2',60:'2/3'}[f==='sin'?t:90-t],'lin'])}
   else o.push([EX[90-t][2],'flip'],[e[0],'sin'],[{30:'2√3/3',45:'√2',60:'2'}[t],'hyp'])}
  else if(k==='edge'){t=[90,0][i%2];f=FN[(i>>1)%3];const v=ex(f,t)||'no value';q=`What is ${f} ${t}°?`;o=['0','1','no value'].map(x=>[x,x===v?'ok':'edge'])}
  else{t=TS[i%3];L=[4,6,8,10,12][i%5];sd=i%2?'adj':'opp';f=sd==='opp'?'sin':'cos';const e=EX[t][FN.indexOf(f)],g=EX[t][f==='sin'?1:0],h=L/2;
   const mk=x=>x==='1/2'?String(h):surd(h,+x[1]);q=`The hypotenuse is ${L} cm and the angle is ${t}°. Find the exact ${sd==='opp'?'opposite':'adjacent'} side.`;
   o=[[mk(e),'ok'],[mk(g),'swap'],[e==='1/2'?String(L):surd(L,+e[1]),'nohalf'],[e==='1/2'?String(2*L):e[1]==='2'?surd(L,2):surd(2*L,3)+'/3','div'],[String(h),'lin']]}
  G.Q={k,t,f,L,sd};const seen=new Set();o=o.filter(z=>z[0]&&!seen.has(z[0])&&seen.add(z[0])).map(z=>({l:z[0]+(k==='len'?' cm':''),k:z[1]}));const j=n%o.length;o=o.slice(j).concat(o.slice(0,j));
  chal.innerHTML=`<p><b>${q}</b> No calculator.</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(z=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,z.l);b.onclick=()=>mark(z)});
  G.cq='Challenge: '+q;A.cv.setAttribute('aria-label',G.cq);A.redraw()}
 function mark(z){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),{k,t,f,L,sd}=G.Q;let m;
  const e=k!=='edge'?EX[t][FN.indexOf(f)]:null,right=k==='val'?`${f} ${t}° = ${e}.`:k==='edge'?`At ${t}°, sin = ${EX[t][0]}, cos = ${EX[t][1]}, tan = ${EX[t][2]||'no value (adjacent is 0)'}.`:`${sd==='opp'?'opposite = hyp × sin':'adjacent = hyp × cos'} ${t}° = ${L} × ${e} = ${hgt(sd==='opp'?t:90-t,L).split(' ≈')[0]} cm.`;
  if(z.k==='ok')m=`Right. ${right}`;
  else if(z.k==='swap')m=`That is the ${f==='sin'||sd==='opp'?'cosine':'sine'} value: opposite and adjacent got swapped. ${right}`;
  else if(z.k==='nohalf')m=`The ÷ 2 went missing: the special triangle's hypotenuse belongs in the denominator. ${right}`;
  else if(z.k==='lin')m=`sin and cos are not proportional to the angle: sin 30° = 1/2, but sin 60° = √3/2, not 2/3, and sin 45° is not 1/2. ${right}`;
  else if(z.k==='flip')m=`That is upside down: adjacent ÷ opposite. It is tan ${90-t}°, not tan ${t}°. ${right}`;
  else if(z.k==='sin')m=`That is sin ${t}°, opposite ÷ hypotenuse. tan has no hypotenuse in it: opposite ÷ adjacent. ${right}`;
  else if(z.k==='hyp')m=`That is hypotenuse ÷ leg. tan uses the two shorter sides, opposite ÷ adjacent. ${right}`;
  else if(z.k==='div')m=`That divided by the ratio. A leg is shorter than the hypotenuse, so multiply: side = hyp × ratio. ${right}`;
  else m=`Picture a hypotenuse of 1 ${t===90?'standing up: height 1, base 0':'lying flat: height 0, base 1'}. sin = height, cos = base, tan = height ÷ base. ${right}`;
  if(z.k==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();G.shk=1;A.tween(G,{shk:0},450,'out');fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.08,draw,onStep:A=>{chal.hidden=A.step!==9;if(A.step!==9)G.Q=null;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const near=(p,q,r=26)=>q&&Math.hypot(p.x-q[0],p.y-q[1])<r,dSeg=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],u=cl(((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy),0,1);return Math.hypot(p.x-a[0]-u*dx,p.y-a[1]-u*dy)};
   A.gest({down:p=>{const s=A.step,v=V(),H=G.hd||{};if(s===9)return false;
     if(v==='half'&&s>1){for(const k in H.corners)if(near(p,H.corners[k],24)){tap(k);return false}for(const k in H.sides)if(dSeg(p,...H.sides[k])<16){tap(k);return false}return false}
     const key=v==='eq'?'foot':v==='half'?'top':v==='sq'?'cut':'tip';if(near(p,H[key],32)){G.drag=key;return true}return false},
    move:p=>{if(!G.drag||!G.M)return;const[x,y]=G.M.I(p.x,p.y);
     if(G.drag==='foot')G.f=cl(c2(x),.2,1.8);else if(G.drag==='top')G.h=cl(c2(y),.4,2.4);else if(G.drag==='cut')G.x=cl(c2(x),.1,1.6);else G.th=cl(Math.round(Math.atan2(Math.max(0,y),x)/DG),0,90);A.redraw()},
    up:()=>{const d=G.drag;G.drag=null;if(d==='foot')setF(G.f);else if(d==='top')setH(G.h);else if(d==='cut')setX(G.x);else if(d==='tip')setT(G.th)}});sync()}});
 A.start()})})();
