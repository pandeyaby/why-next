/* Flagship 48 – why trigonometric ratios work. A right triangle with angle θ at A and a draggable top corner B.
   (1) Keep θ = 35° and drag B to double the size: opposite and hypotenuse both double, so opp ÷ hyp stays 0.574 (trap: the
   ratio doubles). (2) Slide an upright inside the big triangle: every cut-off triangle has angles 35°, 90° and 55°, so they
   are similar and a logged table shows the same ratio each time. (3) In a flipped, turned triangle, tap the opposite and then
   the adjacent side (trap: "adjacent is the bottom side"). (4) Keep the hypotenuse 10 and swing θ from 30° to 60°: sin 30° =
   0.5 but sin 60° = 0.866, not 1 (trap: the ratio is proportional to the angle). (5) Use the fixed ratio: hypotenuse 8 at
   35° gives opposite 8 × 0.574 = 4.59. Challenge: scale a similar triangle, name a ratio, double an angle, compare sizes. */
(()=>{const D=Math.PI/180,f2=x=>String(+x.toFixed(2)),f3=x=>(+x).toFixed(3),lim=(v,a,b)=>Math.max(a,Math.min(b,v));
const TRI=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]],NM={hyp:'p',adj:'q',opp:'r'};
VIS.reg('flagtrig',c=>{let A,ctl,chal,note,view;
 const T={th:35,h:5,up:4,seen:[],ph:0,wrong:null,drag:null,run:0,goal:()=>{},Q:null,cq:'',jolt:0};
 const tell=t=>{c.say(t);if(note)note.textContent=t};
 const kind=()=>A.step===6?'quiz':['size','nest','name','angle','size','free'][A.step];
 const sides=(th,h)=>({o:h*Math.sin(th*D),a:h*Math.cos(th*D),h});
 // ---- changes ----
 function setH(v){T.h=lim(Math.round(v*2)/2,2,10);const s=sides(T.th,T.h);tell(`Hypotenuse ${f2(s.h)}, opposite ${f2(s.o)}: opposite ÷ hypotenuse = ${f3(s.o/s.h)} at θ = ${T.th}°.`);paint();T.goal()}
 function setTh(v){T.th=lim(Math.round(v),10,80);const s=sides(T.th,T.h);tell(`θ = ${T.th}°: sin θ = ${f3(s.o/s.h)}, cos θ = ${f3(s.a/s.h)}, tan θ = ${f3(s.o/s.a)}.`);paint();T.goal()}
 function setUp(v){T.up=lim(Math.round(v*2)/2,1,8);if(!T.seen.includes(T.up))T.seen.push(T.up);const h=T.up/Math.cos(35*D),o=T.up*Math.tan(35*D);
  tell(`Cut-off triangle: angles 35°, 90°, 55°. Opposite ${f2(o)} ÷ hypotenuse ${f2(h)} = ${f3(o/h)}. Triangles tried: ${T.seen.length}.`);paint();T.goal()}
 function tap(sd){if(T.ph>1)return;const want=T.ph?'adj':'opp';
  if(sd===want){T.wrong=null;T.ph++;tell(T.ph===1?`Side ${NM.opp} does not touch θ, so it is the opposite side. Now find the adjacent side.`:`Side ${NM.adj} touches θ and is not the hypotenuse, so it is adjacent.`)}
  else{T.wrong=sd;T.jolt=1;A.tween(T,{jolt:0},420,'out');A.sound.miss();tell(sd==='hyp'?`Side ${NM.hyp} is opposite the right angle, so it is the hypotenuse, the longest side.`:sd==='adj'?`Side ${NM.adj} touches θ. The opposite side is the one that does not touch θ.`:`Side ${NM.opp} is the opposite side you already found. The adjacent side also touches θ.`)}
  paint();T.goal()}
 const ease=(k,to,set)=>{const o={v:T[k]};A.tween(o,{v:to},700,'io',()=>set(to))};
 function chain(fs){const id=++T.run;let i=0;const nx=()=>{if(id!==T.run||i>=fs.length)return;fs[i++]();A.tween({z:0},{z:1},450,'io',nx)};nx()}
 function words(){const k=kind(),s=sides(T.th,T.h);if(k==='quiz')return T.cq||'Challenge.';
  if(k==='nest')return `A right triangle with a 35° angle and an upright at ${T.up} cutting off a smaller right triangle. Every cut-off triangle has angles 35°, 90° and 55°. Opposite ÷ hypotenuse is ${f3(Math.sin(35*D))} each time.`;
  if(k==='name')return `A right triangle, flipped and turned, with angle θ marked. Its sides are labelled p, q and r. ${T.ph===0?'Find the opposite side.':T.ph===1?'Opposite found: r. Find the adjacent side.':'Opposite r, adjacent q, hypotenuse p.'}`;
  return `Right triangle with θ = ${T.th}°: opposite ${f2(s.o)}, adjacent ${f2(s.a)}, hypotenuse ${f2(s.h)}. sin θ = ${f3(s.o/s.h)}, cos θ = ${f3(s.a/s.h)}, tan θ = ${f3(s.o/s.a)}.`}
 function paint(){if(!A)return;A.cv.setAttribute('aria-label',words());if(!ctl)return;ctl.innerHTML='';const st=A.step,btn=(t,al,f)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':al},ctl,t);x.onclick=()=>{f();A.sound.tick()}};
  if(st===0||st===4||st===5){btn('Smaller','Make the triangle smaller',()=>setH(T.h-.5));btn('Bigger','Make the triangle bigger',()=>setH(T.h+.5))}
  if(st===1){btn('◀ Upright','Move the upright towards A',()=>setUp(T.up-.5));btn('Upright ▶','Move the upright away from A',()=>setUp(T.up+.5))}
  if(st===2)['hyp','adj','opp'].forEach(sd=>btn('Side '+NM[sd],'Pick side '+NM[sd],()=>tap(sd)));
  if(st===3||st===5){btn('θ − 5°','Make the angle 5 degrees smaller',()=>setTh(T.th-5));if(st===3)btn('θ − 1°','Make the angle 1 degree smaller',()=>setTh(T.th-1));
   if(st===3)btn('θ + 1°','Make the angle 1 degree bigger',()=>setTh(T.th+1));btn('θ + 5°','Make the angle 5 degrees bigger',()=>setTh(T.th+5))}
  A.redraw()}
 // ---- scene: every picture is a list of right triangles placed in world units ----
 const corners=(th,h,dx=0,dy=0,turn=0,flip=1)=>{const s=sides(th,h),q=[[0,0],[s.a,0],[s.a,s.o]].map(([x,y])=>{x*=flip;return[x*Math.cos(turn)-y*Math.sin(turn)+dx,x*Math.sin(turn)+y*Math.cos(turn)+dy]});return q};
 function frame(pts,f){const N=A.narrow,r=N?[26,50,A.W-44,f?A.H-30:A.H*.6]:[22,46,A.W*.6,A.H-24],xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const u=Math.min((r[2]-r[0])/(x1-x0||1),(r[3]-r[1])/(y1-y0||1)),ox=r[0]+((r[2]-r[0])-(x1-x0)*u)/2-x0*u,oy=r[1]+((r[3]-r[1])-(y1-y0)*u)/2+y1*u;
  return{u,at:([x,y])=>[ox+x*u,oy-y*u],back:p=>[(p.x-ox)/u,(oy-p.y)/u]}}
 function edge(p,q,col,w){const x=A.ctx;x.strokeStyle=col;x.lineWidth=w;x.beginPath();x.moveTo(...p);x.lineTo(...q);x.stroke()}
 function tag(p,q,mid,txt,bg){const m=[(p[0]+q[0])/2,(p[1]+q[1])/2],v=[m[0]-mid[0],m[1]-mid[1]],n=Math.hypot(...v)||1;A.paint.label(txt,m[0]+v[0]/n*16,m[1]+v[1]/n*16,{font:'700 12px system-ui',bg})}
 function rt(P,o){const{ctx:x,col:C}=A,[a,cc,b]=P,mid=[(a[0]+b[0]+cc[0])/3,(a[1]+b[1]+cc[1])/3],pk=A.alpha('#9d174d',.95),cy=A.alpha('#155e75',.95),am=A.alpha('#92400e',.95);
  x.beginPath();x.moveTo(...a);x.lineTo(...cc);x.lineTo(...b);x.closePath();x.fillStyle=A.alpha(o.fill||C.ac,o.ghost?.05:.18);x.fill();
  if(o.ghost){x.setLineDash([5,4]);x.strokeStyle=C.mu;x.lineWidth=1.5;x.stroke();x.setLineDash([]);return}
  const cols=o.plain?{opp:C.tx,adj:C.tx,hyp:C.tx}:{opp:C.pk,adj:C.cy,hyp:C.am};if(o.known)for(const k in o.known)cols[k]=o.known[k];
  edge(cc,b,cols.opp,3.5);edge(a,cc,cols.adj,3.5);edge(a,b,cols.hyp,3.5);
  const s=10,u1=[(a[0]-cc[0]),(a[1]-cc[1])],u2=[(b[0]-cc[0]),(b[1]-cc[1])],n1=Math.hypot(...u1),n2=Math.hypot(...u2),e1=[u1[0]/n1*s,u1[1]/n1*s],e2=[u2[0]/n2*s,u2[1]/n2*s];
  x.strokeStyle=C.tx;x.lineWidth=1.3;x.beginPath();x.moveTo(cc[0]+e1[0],cc[1]+e1[1]);x.lineTo(cc[0]+e1[0]+e2[0],cc[1]+e1[1]+e2[1]);x.lineTo(cc[0]+e2[0],cc[1]+e2[1]);x.stroke();
  const g1=Math.atan2(cc[1]-a[1],cc[0]-a[0]);let g=Math.atan2(b[1]-a[1],b[0]-a[0])-g1;while(g>Math.PI)g-=2*Math.PI;while(g<-Math.PI)g+=2*Math.PI;
  x.beginPath();x.arc(a[0],a[1],22,g1,g1+g,g<0);x.stroke();const gm=g1+g/2;A.paint.label(o.thl||'θ',a[0]+Math.cos(gm)*(g=Math.min(70,Math.max(40,12/Math.sin(Math.abs(g)/2)))),a[1]+Math.sin(gm)*g,{font:'800 12px system-ui',bg:A.alpha('#1e293b',.9)});
  if(o.top)A.paint.label(o.top,b[0]+Math.sign(b[0]-a[0]||1)*26,b[1]-6,{font:'700 11px system-ui',bg:A.alpha('#1e293b',.85)});
  const L=o.lab||{};if(L.opp!=null)tag(cc,b,mid,L.opp,pk);if(L.adj!=null)tag(a,cc,mid,L.adj,cy);if(L.hyp!=null)tag(a,b,mid,L.hyp,am)}
 function rows(list){const N=A.narrow,two=N&&list.length>3,cw=two?(A.W-30)/2:0,x0=N?14:A.W*.63,y0=N?A.H*.68:56;
  list.forEach(([t,bg],i)=>{const col=two?i%2:0,row=two?Math.floor(i/2):i;A.paint.label(t,x0+col*cw,y0+row*27,{align:'left',font:'700 12px system-ui',bg:bg||A.alpha('#334155',.92)})})}
 function draw(A){const{ctx:x,W,H,paint:P,col:C}=A,k=kind();x.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.am,.06)],[1,A.mix(C.pn,C.vi,.07)]]);x.fillRect(0,0,W,H);
  x.save();x.translate(T.jolt*Math.sin(T.jolt*28)*4,0);let head='',list=[];const pk=A.alpha('#9d174d',.95),cy=A.alpha('#155e75',.95),am=A.alpha('#92400e',.95);
  if(k==='size'||k==='angle'||k==='free'){const box=k==='size'?[[0,0],[8.2,5.74]]:[[0,0],[10,10]];view=frame(box);const s=sides(T.th,T.h),pts=corners(T.th,T.h).map(view.at);
   if(k==='size')rt(corners(35,A.step===4?4:5).map(view.at),{ghost:1});rt(pts,{lab:{opp:f2(s.o),adj:f2(s.a),hyp:f2(s.h)},thl:T.th+'°'});T.knob=pts[2];P.ball(pts[2][0],pts[2][1],11,C.gr);
   head=k==='angle'?`θ = ${T.th}°, hypotenuse 10`:k==='free'?`θ = ${T.th}°`:`θ = 35°, hypotenuse ${f2(s.h)}`;
   list=[[`opposite ${f2(s.o)}`,pk],[`adjacent ${f2(s.a)}`,cy],[`hypotenuse ${f2(s.h)}`,am],[`sin = opp/hyp = ${f3(s.o/s.h)}`],[`cos = adj/hyp = ${f3(s.a/s.h)}`],[`tan = opp/adj = ${f3(s.o/s.a)}`]]}
  else if(k==='nest'){view=frame([[0,0],[8.2,5.74]]);rt(corners(35,10).map(view.at),{ghost:1});const t=Math.tan(35*D);
   T.seen.forEach(u=>{if(u!==T.up)edge(view.at([u,0]),view.at([u,u*t]),A.alpha(C.vi,.45),2)});
   const h=T.up/Math.cos(35*D),pts=corners(35,h).map(view.at);rt(pts,{thl:'35°',top:'55°',lab:{opp:f2(T.up*t),hyp:f2(h)}});T.knob=pts[2];P.ball(pts[2][0],pts[2][1],11,C.gr);
   head='angles 35°, 90°, 55°: similar every time';list=T.seen.slice(-5).map(u=>[`${f2(u*t)} ÷ ${f2(u/Math.cos(35*D))} = ${f3(Math.sin(35*D))}`,A.alpha(u===T.up?'#5b21b6':'#334155',.92)])}
  else if(k==='name'){const raw=corners(35,8,0,0,140*D,-1);view=frame(raw);const pts=raw.map(view.at);T.tri=pts;const known={};
   if(T.ph>0)known.opp=C.pk;if(T.ph>1){known.adj=C.cy;known.hyp=C.am}if(T.wrong)known[T.wrong]=C.rd;
   rt(pts,{plain:1,known,lab:{opp:T.ph>0?NM.opp+' = opposite':NM.opp,adj:T.ph>1?NM.adj+' = adjacent':NM.adj,hyp:T.ph>1?NM.hyp+' = hypotenuse':NM.hyp}});
   head='the names depend on where θ is';list=[['hypotenuse: opposite the right angle'],['opposite: does not touch θ'],['adjacent: touches θ, not the hypotenuse']]}
  else if(T.Q){let sc=T.Q.sc;if(A.narrow&&sc[1]){const g=sides(sc[1].th,sc[1].h);sc=[{...sc[0],dx:0,dy:g.o+g.a*.15},{...sc[1],dx:0}]}const raw=sc.flatMap(t=>corners(t.th,t.h,t.dx,t.dy));view=frame(raw,1);sc.forEach(t=>rt(corners(t.th,t.h,t.dx,t.dy).map(view.at),t));head='not drawn to scale'}
  x.restore();if(head)P.label(head,12,20,{align:'left',font:'800 13px system-ui',bg:A.alpha('#334155',.92)});if(list.length)rows(list);A.fx.draw(x)}
 // ---- steps ----
 const ok=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const reset=(th,h)=>{T.run++;T.goal=()=>{};T.th=th;T.h=h;T.seen=[];T.ph=0;T.wrong=null};
 const steps=[
  {h:'Same angle, any size',p:'Every triangle here has a right angle and θ = 35°. Drag the green corner to resize it, or use the buttons. The dashed triangle is the starting size.',
   predict:{q:'Make the triangle twice as big, keeping θ = 35°. What happens to opposite ÷ hypotenuse?',opts:['It doubles','It stays the same','It halves'],ans:1},
   task:'Make the hypotenuse 10',show:()=>ease('h',10,setH),
   go:()=>{reset(35,5);setH(5);T.goal=ok(0,()=>T.h===10,()=>'Opposite 2.87 → 5.74 and hypotenuse 5 → 10. Both doubled, so 5.74 ÷ 10 = 2.87 ÷ 5 = 0.574.')}},
  {h:'Why: they are all similar',p:'The upright cuts a smaller right triangle off the big one. It keeps the 35° angle at A and the right angle, so its third angle is 55° too.',
   predict:{q:'Will the smaller triangles all have the same opposite ÷ hypotenuse?',opts:['No, small ones have smaller ratios','Yes, they are similar copies'],ans:1},
   task:'Slide the upright to 3 different places',show:()=>chain([()=>setUp(2),()=>setUp(5.5),()=>setUp(7.5)]),
   go:()=>{reset(35,10);T.up=4;paint();tell('Drag the green corner along, or use the upright buttons.');T.goal=ok(1,()=>T.seen.length>=3,()=>'Same angles means similar triangles, and similar triangles keep their side ratios. So opposite ÷ hypotenuse is 0.574 for every 35° right triangle. That fixed number is sin 35°.')}},
  {h:'Opposite, adjacent, hypotenuse',p:'The names come from θ, not from which way up the triangle is. Hypotenuse: opposite the right angle. Opposite: does not touch θ. Adjacent: touches θ.',
   predict:{q:'This triangle is flipped and turned. Which side is adjacent to θ?',opts:['The side along the bottom','The side touching θ that is not the hypotenuse','Any side touching the right angle'],ans:1},
   task:'Tap the opposite side, then the adjacent side',show:()=>chain([()=>tap('opp'),()=>tap('adj')]),
   go:()=>{reset(35,8);paint();tell('Find the side opposite θ first.');T.goal=ok(2,()=>T.ph===2,()=>'r does not touch θ, so it is opposite. q touches θ and is not the hypotenuse, so it is adjacent. sin θ = r ÷ p here.')}},
  {h:'The ratio depends on the angle',p:'Keep the hypotenuse at 10 and drag the green corner round to change θ. Watch opposite ÷ hypotenuse, which is sin θ.',
   predict:{q:'sin 30° = 0.5. Double the angle to 60°. What is sin 60°?',opts:['1','About 0.87','0.25'],ans:1},
   task:'Make θ = 60°',show:()=>ease('th',60,setTh),
   go:()=>{reset(30,10);setTh(30);T.goal=ok(3,()=>T.th===60,()=>'sin 60° = 8.66 ÷ 10 = 0.866, not 1. The ratio changes with the angle, but not in proportion to it.')}},
  {h:'Use the fixed ratio',p:'Every 35° right triangle has opposite ÷ hypotenuse = 0.574. So opposite = hypotenuse × 0.574, whatever the size.',
   predict:{q:'A 35° right triangle has hypotenuse 8. How long is the opposite side?',opts:['About 6.55','0.574','About 4.59'],ans:2},
   task:'Make the hypotenuse 8 and read the opposite side',show:()=>ease('h',8,setH),
   go:()=>{reset(35,4);setH(4);T.goal=ok(4,()=>T.h===8,()=>'Opposite = 8 × sin 35° = 8 × 0.574 = 4.59. 6.55 is the adjacent side, 8 × cos 35°. 0.574 is the ratio, not a length.')}},
  {h:'Sandbox',p:'Drag the corner anywhere. Change θ and the ratios change; change only the size and they stay put. At which angle is opposite = adjacent?',go:()=>{reset(40,7);setTh(40)}},
  {h:'Challenge',p:'',go:()=>{reset(35,5);quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>T.goal()});
 // ---- challenge ----
 const KINDS=['scale','ratio','double','same'];let n=-1,run=0;
 function build(){const kd=KINDS[n%4],pick=a=>a[(n*5+3)%a.length];
  if(kd==='scale'){const[o,a,h]=pick(TRI),m=pick([2,3,1.5,4,2.5]),th=Math.atan2(o,a)/D,H=h*m;
   return{kd,o,a,h,m,ans:o*m,txt:`A right triangle has opposite ${o}, adjacent ${a} and hypotenuse ${h} cm for angle θ. Another right triangle has the same θ and hypotenuse ${f2(H)} cm. How long is its opposite side?`,
    opts:[[f2(o*m)+' cm','ok'],[f2(o+H-h)+' cm','add'],[f2(a*m)+' cm','swap']],sc:[{th,h,dx:0,dy:0,lab:{opp:o,hyp:h}},{th,h:h*Math.min(m,2.2),dx:a*1.3+2,dy:0,lab:{hyp:f2(H),opp:'?'}}]}}
  if(kd==='ratio'){const[o,a,h]=pick(TRI),fn=pick(['sin','cos','tan']),th=Math.atan2(o,a)/D,F={sin:[o,h],cos:[a,h],tan:[o,a]}[fn],W=fn==='sin'?[a,h]:fn==='cos'?[o,h]:[o,h];
   return{kd,fn,F,txt:`The sides are opposite ${o}, adjacent ${a} and hypotenuse ${h}. What is ${fn} θ?`,opts:[[F.join('/'),'ok'],[W.join('/'),'name'],[F[1]+'/'+F[0],'flip']],sc:[{th,h,dx:0,dy:0,lab:{opp:o,adj:a,hyp:h}}]}}
  if(kd==='double'){const t=pick([15,20,25,30,35]),s1=Math.sin(t*D);
   return{kd,t,txt:`sin ${t}° ≈ ${f3(s1)}. What is sin ${2*t}°?`,opts:[[f3(Math.sin(2*t*D)),'ok'],[f3(2*s1),'linear'],[f3(s1),'fixed']],sc:[{th:t,h:10,dx:0,dy:0,thl:t+'°'},{th:2*t,h:10,dx:11,dy:0,thl:2*t+'°'}]}}
  const t=pick([25,40,50,65]),h1=pick([3,4,5]),r=pick([2,3,4]);
  return{kd,t,txt:`Two right triangles both have a ${t}° angle. One has hypotenuse ${h1} cm, the other ${h1*r} cm. Compare their opposite ÷ hypotenuse.`,
   opts:[['They are equal','ok'],[`The bigger one's ratio is ${r} times as big`,'grow'],[`The bigger one's ratio is smaller`,'shrink']],sc:[{th:t,h:h1*1.5,dx:0,dy:0,thl:t+'°',lab:{hyp:h1}},{th:t,h:h1*1.5*Math.min(r,2.2),dx:h1*1.5+2,dy:0,thl:t+'°',lab:{hyp:h1*r}}]}}
 function quiz(){n++;T.Q=build();tell('');const Q=T.Q,j=n%3,o=Q.opts.slice(j).concat(Q.opts.slice(0,j));
  chal.innerHTML=`<p><b>${Q.txt}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  o.forEach(([t,kd])=>{const b=c.el('button',{type:'button',class:'lbtn sm'},chal.querySelector('.fl-pick'),t);b.onclick=()=>mark(kd)});
  T.cq='Challenge: '+Q.txt+' The picture shows the triangles, not to scale.';A.cv.setAttribute('aria-label',T.cq);A.redraw()}
 function mark(kd){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const Q=T.Q,fb=chal.querySelector('.fl-fb');let m;
  const why=Q.kd==='scale'?`Scale factor ${f2(Q.h*Q.m)} ÷ ${Q.h} = ${Q.m}, so opposite = ${Q.o} × ${Q.m} = ${f2(Q.ans)} cm.`:Q.kd==='ratio'?`${Q.fn} θ = ${Q.fn==='sin'?'opposite/hypotenuse':Q.fn==='cos'?'adjacent/hypotenuse':'opposite/adjacent'} = ${Q.F.join('/')}.`
   :Q.kd==='double'?`sin ${2*Q.t}° ≈ ${f3(Math.sin(2*Q.t*D))}.`:`Same angle means similar triangles, so opposite ÷ hypotenuse = sin ${Q.t}° ≈ ${f3(Math.sin(Q.t*D))} for both.`;
  if(kd==='ok')m=why;
  else if(kd==='add')m=`Similar triangles multiply every side by the same factor. Adding the same amount changes the angle. ${why}`;
  else if(kd==='swap')m=`That scaled the adjacent side. The opposite side is the one across from θ. ${why}`;
  else if(kd==='name')m=`Wrong pair of sides: sin = opp/hyp, cos = adj/hyp, tan = opp/adj. ${why}`;
  else if(kd==='flip')m=`That fraction is upside down. ${Q.fn==='tan'?'tan puts the opposite on top.':'For sin and cos the hypotenuse goes on the bottom, so the answer is less than 1.'} ${why}`;
  else if(kd==='linear')m=`sin θ is not proportional to θ: doubling the angle does not double the ratio. ${why}`;
  else if(kd==='fixed')m=`Changing the angle changes the shape, so the ratio changes. Only the size does not matter. ${why}`;
  else if(kd==='grow')m=`Opposite and hypotenuse both grow by the same factor, so their ratio does not change. ${why}`;
  else m=`A bigger triangle has a longer opposite side and a longer hypotenuse in the same proportion. ${why}`;
  if(kd==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=quiz}
 A=FK.shell(c,{steps,ratio:.6,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)T.Q=null;paint()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);note=E('p',{class:'fl-read','aria-hidden':'true'},wrap);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the triangle'},wrap);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const k=kind();if(!view||k==='quiz')return false;
     if(k==='name'&&T.tri){const[a,cc,b]=T.tri,seg={opp:[cc,b],adj:[a,cc],hyp:[a,b]};let best=null,bd=24;
      for(const sd in seg){const[s0,s1]=seg[sd],vx=s1[0]-s0[0],vy=s1[1]-s0[1],t=lim(((p.x-s0[0])*vx+(p.y-s0[1])*vy)/(vx*vx+vy*vy),0,1),d=Math.hypot(p.x-s0[0]-t*vx,p.y-s0[1]-t*vy);if(d<bd){bd=d;best=sd}}
      if(best)tap(best);return false}
     if(T.knob&&Math.hypot(p.x-T.knob[0],p.y-T.knob[1])<32){T.drag=k;return true}return false},
    move:p=>{const k=T.drag,w=view.back(p);if(!k)return;
     if(k==='size')T.h=lim(Math.round((w[0]*Math.cos(35*D)+w[1]*Math.sin(35*D))*2)/2,2,10);
     else if(k==='angle')T.th=lim(Math.round(Math.atan2(w[1],w[0])/D),10,80);
     else if(k==='free'){T.th=lim(Math.round(Math.atan2(w[1],w[0])/D),10,80);T.h=lim(Math.round(Math.hypot(w[0],w[1])*2)/2,2,10)}
     else if(k==='nest')T.up=lim(Math.round(w[0]*2)/2,1,8);A.redraw();A.cv.setAttribute('aria-label',words())},
    up:()=>{const k=T.drag;T.drag=null;if(k==='size')setH(T.h);else if(k==='angle'||k==='free'){setTh(T.th);if(k==='free')setH(T.h)}else if(k==='nest')setUp(T.up)}});paint()}});
 A.start()})})();
