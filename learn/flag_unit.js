/* Flagship 19 – the unit circle. Hook: a point on a circle of radius 1 turns anticlockwise from (1, 0) by an angle θ. The learner
   drags the point (or nudges it with ±1° / ±15° buttons) and watches the right triangle under it: the across leg is cos θ and the
   up leg is sin θ, because the hypotenuse is 1. A graph beside the circle traces sin θ and cos θ as the point turns, so the waves
   are drawn by the learner. Quadrants show their (cos, sin) signs once visited. The amber arc is the reference angle.
   Predictions target "cos is the y-coordinate", "cos 150° does not exist / equals cos 30°", "sin 210° = +1/2" and "−90° is at the top".
   Challenge: place the point for a given (cos θ, sin θ), with feedback for the wrong sign of x, the wrong sign of y, both signs
   (the opposite point), swapping sine and cosine, and a plain miss with a direction hint. */
(()=>{const R2=Math.SQRT2/2,R3=Math.sqrt(3)/2,TAU=Math.PI*2;
 /* Exact surds for the special angles; null when the value is not one of them. */
 const EXACT=[[0,'0'],[.5,'1/2'],[R2,'√2/2'],[R3,'√3/2'],[1,'1']];
 const exact=v=>{const e=EXACT.find(([x])=>Math.abs(Math.abs(v)-x)<1e-9);return e?(v<-1e-9?'−':'')+e[1]:null};
 const f3=v=>{const r=Math.round(v*1000)/1000;return (r<0?'−':'')+Math.abs(r).toFixed(3)};
 const sgn=v=>v>1e-9?'+':v<-1e-9?'−':'0';
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 const norm=d=>((d%360)+360)%360;
 const cosD=d=>Math.cos(d*Math.PI/180),sinD=d=>Math.sin(d*Math.PI/180);
 /* Radians as a multiple of π for whole multiples of 15°, else to 2 decimal places. */
 function radText(d){if(d%15)return (d*Math.PI/180).toFixed(2);let n=d/15,q=12;const g=gcd(n,q);n/=g;q/=g;if(!n)return '0';
  const top=(n<0?'−':'')+(Math.abs(n)===1?'':Math.abs(n))+'π';return q===1?top:top+'/'+q}
 /* Quadrant 1–4, or 0 when the point sits on an axis. */
 const quad=d=>{const m=norm(d);return m%90===0?0:Math.floor(m/90)+1};
 const refAngle=d=>{const m=norm(d);return m<=90?m:m<=180?180-m:m<=270?m-180:360-m};
 const ROMAN=['','I','II','III','IV'];
 const valText=v=>{const e=exact(v);return e&&e!=='0'&&e!=='1'&&e!=='−1'?`${e} ≈ ${f3(v)}`:f3(v)};
VIS.reg('flagunit',c=>{let A,chal,sand,read,onScreen=true;
 const st={deg:0,drag:false,raw:0,last:null,touched:false,visited:new Set(),trail:new Set(),lastT:null,rad:false,full:false,chk:()=>{},q:null,won:false};
 const D=()=>Math.round(st.deg);
 const dg=d=>(d<0?'−':'')+Math.abs(d)+'°';
 const angText=d=>st.rad?`${radText(d)} rad (${dg(d)})`:`${dg(d)} (${radText(d)} rad)`;
 /* Layout: circle left and graph right on wide screens; circle above graph on phones. */
 const geo=A=>{const{W,H}=A;if(A.narrow){const r=Math.min(W*.34,H*.24);return{cx:W/2,cy:r+40,r,gx:40,gy:2*r+110,gw:W-56,gh:Math.max(70,H-(2*r+110)-30)}}
  const r=Math.min(W*.19,H*.34);return{cx:r+52,cy:H/2+6,r,gx:2*r+128,gy:34,gw:W-(2*r+128)-22,gh:H-72}};
 function describe(){const d=D(),x=cosD(d),y=sinD(d),q=quad(d),m=norm(d);
  const where=q?`quadrant ${ROMAN[q]}, where cos is ${x>0?'positive':'negative'} and sin is ${y>0?'positive':'negative'}`:'on an axis';
  const lap=m!==d?` Same point as ${m}°.`:'';
  return `θ = ${angText(d)}. Point (${f3(x)}, ${f3(y)}): cos θ = ${valText(x)}, sin θ = ${valText(y)}. It is ${where}.${q&&q!==1?` Reference angle ${refAngle(d)}°.`:''}${lap}`}
 function updateRead(){if(!read)return;const d=D(),x=cosD(d),y=sinD(d),q=quad(d);
  read.innerHTML=`<span class="fl-chip"><b>θ</b> = ${angText(d)}</span> <span class="fl-chip"><b>cos θ</b> = x = ${valText(x)}</span> <span class="fl-chip"><b>sin θ</b> = y = ${valText(y)}</span> <span class="fl-chip">${q?'Quadrant '+ROMAN[q]:'On an axis'}</span> <span class="fl-chip">x² + y² = ${f3(x*x+y*y)}</span>`}
 const say=()=>{const d=describe();c.say(d);A&&A.cv.setAttribute('aria-label','Unit circle. '+d);updateRead()};
 /* Record every whole degree the point passes, so the graph shows the path the learner actually took. */
 function trace(){const d=D();if(st.lastT!==null&&Math.abs(d-st.lastT)<=180){const s=Math.sign(d-st.lastT);for(let k=st.lastT;k!==d;k+=s)st.trail.add(norm(k))}st.trail.add(norm(d));st.lastT=d;
  const q=quad(d);if(q)st.visited.add(q)}
 function setDeg(d,quiet){st.deg=d;trace();if(!quiet)say();A.redraw()}
 /* Drag snaps to whole degrees, and to a multiple of 15° within 2°, so special angles are easy to hit on a phone. */
 const snap=v=>{const r=Math.round(v),s=Math.round(v/15)*15;return Math.abs(v-s)<=2?s:r};
 function nudge(k){st.touched=true;setDeg(D()+k);st.chk()}
 function glide(to,done){st.touched=true;A.tween(st,{deg:to},Math.min(1600,300+Math.abs(to-st.deg)*6),'io',()=>{setDeg(to);done&&done()});}
 function resetTo(d){st.deg=d;st.lastT=null;trace();say();A.redraw()}
 // ---------- drawing ----------
 function arrow(ctx,x0,y0,x1,y1,col){ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();
  const a=Math.atan2(y1-y0,x1-x0);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1-8*Math.cos(a-.4),y1-8*Math.sin(a-.4));ctx.lineTo(x1-8*Math.cos(a+.4),y1-8*Math.sin(a+.4));ctx.closePath();ctx.fill()}
 function drawCircle(A,G){const{ctx,paint:P,col:C}=A,{cx,cy,r}=G,ink=C.dark?'#0b1220':'#fff',d=st.deg,dr=D(),x=cosD(d),y=sinD(d),px=cx+r*x,py=cy-r*y,q=quad(dr),COS=C.cy,SIN=C.pk;
  // quadrants: the current one is tinted; visited ones show their signs
  const qs=[[1,1,-1],[2,-1,-1],[3,-1,1],[4,1,1]];
  qs.forEach(([n,sx,sy])=>{ctx.fillStyle=A.alpha(n===q?C.vi:C.ln,n===q?.16:.06);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r*1.28,-(n-1)*Math.PI/2,-n*Math.PI/2,true);ctx.closePath();ctx.fill();
   const lx=cx+sx*r*.92,ly=cy+sy*r*.95;if(st.visited.has(n))P.label(`${ROMAN[n]}  (${sx>0?'+':'−'}, ${sy<0?'+':'−'})`,lx,ly,{font:'700 12px system-ui',bg:A.alpha(C.pn,.85),col:C.tx});
   else P.label(ROMAN[n],lx,ly,{font:'700 12px system-ui',bg:'transparent',col:A.alpha(C.tx,.55)})});
  arrow(ctx,cx-r*1.3,cy,cx+r*1.32,cy,A.alpha(C.tx,.7));arrow(ctx,cx,cy+r*1.3,cx,cy-r*1.32,A.alpha(C.tx,.7));
  ctx.fillStyle=A.alpha(C.tx,.8);ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.fillText('x',cx+r*1.32,cy+16);ctx.fillText('y',cx+12,cy-r*1.26);
  [[1,0,'1'],[-1,0,'−1'],[0,1,'1'],[0,-1,'−1']].forEach(([ux,uy,t])=>{ctx.fillText(t,cx+ux*r+(ux?0:-12)+(ux>0?8:ux<0?-10:0),cy-uy*r+(uy?0:15)+(uy>0?-4:uy<0?12:0))});
  ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke();
  for(let k=0;k<360;k+=15){const a=k*Math.PI/180,big=k%90===0?0:(k%30===0||k%45===0)?.06:.03;if(!big)continue;ctx.strokeStyle=A.alpha(C.tx,.35);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r*(1-big),cy-Math.sin(a)*r*(1-big));ctx.lineTo(cx+Math.cos(a)*r*(1+big),cy-Math.sin(a)*r*(1+big));ctx.stroke()}
  // the angle: a spiral arc so extra laps and clockwise turns stay visible
  const steps=Math.max(8,Math.ceil(Math.abs(d)/3));ctx.strokeStyle=C.vi;ctx.lineWidth=2.5;ctx.beginPath();
  for(let i=0;i<=steps;i++){const t=d*i/steps,rr=r*.2+Math.abs(t)/360*8;const ax=cx+rr*cosD(t),ay=cy-rr*sinD(t);i?ctx.lineTo(ax,ay):ctx.moveTo(ax,ay)}ctx.stroke();
  if(Math.abs(d)>4){const t=d,rr=r*.2+Math.abs(t)/360*8,ax=cx+rr*cosD(t),ay=cy-rr*sinD(t),dir=Math.sign(d);arrow(ctx,ax+dir*4*sinD(t),ay+dir*4*cosD(t),ax,ay,C.vi)}
  // reference angle between the radius and the x-axis
  if(q>1){const m=norm(dr),base=q===2||q===3?180:360;ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.beginPath();const a0=-m*Math.PI/180,a1=-base*Math.PI/180;ctx.arc(cx,cy,r*.36,Math.min(a0,a1),Math.max(a0,a1));ctx.stroke();
   const mid=(m+base)/2;P.label(`ref ${refAngle(dr)}°`,cx+r*.52*cosD(mid),cy-r*.52*sinD(mid),{font:'700 11px system-ui',bg:A.alpha(C.am,.95),col:'#111'})}
  // the triangle: across leg = cos, up leg = sin, radius = 1
  ctx.lineCap='round';ctx.strokeStyle=COS;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(px,cy);ctx.stroke();
  ctx.strokeStyle=SIN;ctx.beginPath();ctx.moveTo(px,cy);ctx.lineTo(px,py);ctx.stroke();ctx.lineCap='butt';
  if(Math.abs(x)>.08&&Math.abs(y)>.08){const s=Math.min(10,r*.08),ex=-Math.sign(x)*s,ey=-Math.sign(y)*s;ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(px+ex,cy);ctx.lineTo(px+ex,cy+ey);ctx.lineTo(px,cy+ey);ctx.stroke()}
  ctx.strokeStyle=C.tx;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(px,py);ctx.stroke();
  const side=x*y<-1e-9?-1:1,nx=-y*side,ny=x*side;// unit normal to the radius, on the side away from the triangle
  P.label('1',cx+r*.72*x+nx*14,cy-(r*.72*y+ny*14),{font:'700 12px system-ui',bg:A.alpha(C.pn,.85),col:C.tx});
  if(!st.touched&&!A.reduced()){ctx.strokeStyle=A.alpha(C.vi,.5+.4*Math.sin(performance.now()/260));ctx.lineWidth=3;ctx.beginPath();ctx.arc(px,py,r*.14+4*Math.sin(performance.now()/300),0,TAU);ctx.stroke()}
  P.shadow(10,3,.3);P.ball(px,py,Math.max(9,r*.08),C.vi);P.noShadow();
  const lp=P.label(`(${f3(x)}, ${f3(y)})`,px+(x>=0?1:-1)*44,py+(y>=0?-22:22),{font:'700 12px system-ui',bg:A.alpha(C.vi,.95)});
  const lc=P.label(`cos θ = ${f3(x)}`,(cx+px)/2,cy+(y>=0?16:-16),{font:'700 12px system-ui',bg:COS,col:ink});
  // the sin label sits beside the up leg, or under the axis when the leg is too short to label
  const flat=Math.abs(y)<.25;P.label(`sin θ = ${f3(y)}`,flat?px+(x>=0?-1:1)*20:px+(x>=0?1:-1)*(A.narrow?44:52),flat?cy+(y>=0?40:-40):(cy+py)/2,{font:'700 12px system-ui',bg:SIN,col:ink,avoid:[lc,lp]});
  if(!st.touched)P.label('👆 drag the point round the circle',cx,A.narrow?G.gy-18:A.H-14,{pill:1,bg:A.alpha(C.am,.95),col:'#111'})}
 function drawGraph(A,G){const{ctx,paint:P,col:C}=A,{gx,gy,gw,gh}=G,ink=C.dark?'#0b1220':'#fff',X=t=>gx+gw*t/360,Y=v=>gy+gh/2-v*gh*.42,COS=C.cy,SIN=C.pk,m=norm(D());
  ctx.fillStyle=A.alpha(C.ln,.08);P.rrect(gx-6,gy-6,gw+12,gh+12,10);ctx.fill();
  ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(gx,Y(0));ctx.lineTo(gx+gw,Y(0));ctx.moveTo(gx,gy);ctx.lineTo(gx,gy+gh);ctx.stroke();
  ctx.fillStyle=A.alpha(C.tx,.8);ctx.font='600 11px system-ui';ctx.textAlign='right';[[1,'1'],[0,'0'],[-1,'−1']].forEach(([v,t])=>{ctx.fillText(t,gx-5,Y(v)+4);ctx.strokeStyle=A.alpha(C.tx,.15);ctx.beginPath();ctx.moveTo(gx,Y(v));ctx.lineTo(gx+gw,Y(v));ctx.stroke()});
  ctx.textAlign='center';[90,180,270,360].forEach(t=>{ctx.fillText(st.rad?(t===360?'2π':t===180?'π':radText(t)):t+'°',X(t),Y(-1)+16);ctx.strokeStyle=A.alpha(C.tx,.15);ctx.beginPath();ctx.moveTo(X(t),gy);ctx.lineTo(X(t),gy+gh);ctx.stroke()});
  ctx.fillText('θ',gx+gw-6,Y(0)-6);
  const curve=(f,col,on)=>{ctx.strokeStyle=col;ctx.lineWidth=on?3:1.2;ctx.setLineDash(on?[]:[4,4]);let pen=false;ctx.beginPath();
   for(let t=0;t<=360;t++){const ok=on?st.trail.has(t):true;if(!ok){pen=false;continue}const xx=X(t),yy=Y(f(t));pen?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);pen=true}ctx.stroke();ctx.setLineDash([])};
  if(st.full){curve(cosD,A.alpha(COS,.6),false);curve(sinD,A.alpha(SIN,.6),false)}
  curve(cosD,COS,true);curve(sinD,SIN,true);
  ctx.strokeStyle=A.alpha(C.vi,.7);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(X(m),gy);ctx.lineTo(X(m),gy+gh);ctx.stroke();
  P.ball(X(m),Y(cosD(m)),5,COS);P.ball(X(m),Y(sinD(m)),5,SIN);
  P.label('cos θ (x)',gx+6,gy+8,{align:'left',font:'700 11px system-ui',bg:COS,col:ink});P.label('sin θ (y)',gx+80,gy+8,{align:'left',font:'700 11px system-ui',bg:SIN,col:ink})}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A);ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);drawCircle(A,G);drawGraph(A,G)}
 // ---------- steps ----------
 const at=d=>()=>norm(D())===norm(d);
 const steps=[
  {h:'Cosine and sine are coordinates',p:'The circle has radius 1 and its centre at the origin. The point starts at (1, 0) and turns anticlockwise through the angle θ. The radius is the hypotenuse of a right triangle.',
   predict:{q:'The hypotenuse is 1, and cos θ = adjacent ÷ hypotenuse. On this circle, cos θ is…',opts:['the y-coordinate of the point','the x-coordinate of the point','the angle divided by 90'],ans:1},
   task:'Drag the point to 30°',show:()=>glide(30,()=>st.chk()),
   go:()=>{resetTo(0);st.chk=()=>{if(D()===30)A.done('The point is at (0.866, 0.500). Adjacent ÷ 1 is just the across distance, so cos 30° = √3/2 ≈ 0.866 = x. Opposite ÷ 1 is the height, so sin 30° = 1/2 = y.'+A.reveal(0))}}},
  {h:'Angles past 90°',p:'No right triangle has a 150° angle, yet the point can turn 150°. The coordinates still exist, so cos and sin still have values.',
   predict:{q:'What is cos 150°?',opts:['+√3/2, the same as cos 30°','It has no value: there is no triangle','−√3/2 ≈ −0.866'],ans:2},
   task:'Drag the point to 150°',show:()=>glide(150,()=>st.chk()),
   go:()=>{resetTo(0);st.chk=()=>{if(at(150)())A.done('The point is at (−0.866, 0.500). It is left of the y-axis, so x is negative: cos 150° = −√3/2. It is as high as at 30°, so sin 150° = 1/2. The amber arc is the reference angle, 180° − 150° = 30°.'+A.reveal(1))}}},
  {h:'Signs in each quadrant',p:'The axes split the circle into four quadrants, numbered anticlockwise from the top right. Visit each one; its signs (cos, sin) appear when you do.',
   predict:{q:'In which quadrant are cos θ and sin θ both negative?',opts:['II, from 90° to 180°','IV, from 270° to 360°','III, from 180° to 270°'],ans:2},
   task:'Put the point in all four quadrants',show:()=>glide(45,()=>glide(135,()=>glide(225,()=>glide(315,()=>st.chk())))),
   go:()=>{resetTo(0);st.visited.clear();st.chk=()=>{if(st.visited.size===4)A.done('Right of the y-axis x > 0, so cos is positive in I and IV. Above the x-axis y > 0, so sin is positive in I and II. Only in III are both negative.'+A.reveal(2))}}},
  {h:'Below the axis',p:'210° is 30° past 180°. Before you drag, picture where that is.',
   predict:{q:'What is sin 210°?',opts:['+1/2, because sin 30° = 1/2','−√3/2','−1/2'],ans:2},
   task:'Drag the point to 210°',show:()=>glide(210,()=>st.chk()),
   go:()=>{resetTo(0);st.chk=()=>{if(at(210)())A.done('The point is at (−0.866, −0.500). Below the x-axis, so sin 210° = −1/2; left of the y-axis, so cos 210° = −√3/2. The reference angle (30°) gives the size; the quadrant gives the sign.'+A.reveal(3))}}},
  {h:'Clockwise and extra laps',p:'Turning clockwise gives a negative angle. Turning past 360° starts a second lap. Keep dragging, or use the turn buttons.',
   predict:{q:'Where is the point at −90°?',opts:['At the top, (0, 1), like 90°','At the bottom, (0, −1)','Nowhere: angles cannot be negative'],ans:1},
   task:'Turn the point clockwise to −90°',show:()=>glide(-90,()=>st.chk()),
   go:()=>{resetTo(0);st.chk=()=>{if(D()===-90)A.done('−90° ends at (0, −1), the same point as 270°: cos(−90°) = 0 and sin(−90°) = −1. Angles 360° apart share a point, so sine and cosine repeat every 360°, which is 2π radians.'+A.reveal(4));else if(D()===270)c.say('θ = 270° reaches the same point, but the task asks you to turn clockwise from 0° to make −90°.')}}},
  {h:'Sandbox',p:'Drag anywhere round the circle and watch the graph draw both waves. Switch to radians: a full turn is 2π, a half turn is π.',go:()=>{resetTo(0);st.trail.clear();st.lastT=null;trace();st.chk=()=>{}}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.56,tall:1.32,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;say()},
  init:A=>{const ctl=c.el('div',{class:'fl-below'},A.below);read=c.el('div',{class:'fl-read'},ctl);chal=c.el('div',{class:'fl-chal'},A.below);
   const r=c.el('div',{class:'fl-ctl fl-wrap',role:'group','aria-label':'Turn the point'},ctl);
   [[-15,'↻ −15°','Turn clockwise 15 degrees'],[-1,'−1°','Turn clockwise 1 degree'],[1,'+1°','Turn anticlockwise 1 degree'],[15,'↺ +15°','Turn anticlockwise 15 degrees']].forEach(([k,t,l])=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':l},r,t);b.onclick=()=>nudge(k)});
   const u=c.el('button',{type:'button',class:'lbtn sm ghost','aria-pressed':'false'},r,'Radians');u.onclick=()=>{st.rad=!st.rad;u.setAttribute('aria-pressed',String(st.rad));say();A.redraw()};
   sand=c.el('div',{class:'fl-ctl fl-wrap'},ctl);const full=c.el('button',{type:'button',class:'lbtn sm ghost','aria-pressed':'false'},sand,'Show whole curves');full.onclick=()=>{st.full=!st.full;full.setAttribute('aria-pressed',String(st.full));A.redraw()};
   const clr=c.el('button',{type:'button',class:'lbtn sm ghost'},sand,'Clear the trace');clr.onclick=()=>{st.trail.clear();st.lastT=null;trace();A.redraw()};
   [0,90,180,270].forEach(d=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost'},sand,`Go to ${d}°`);b.onclick=()=>{st.touched=true;glide(d)}});
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   A.every(()=>!!(onScreen&&!A.reduced()&&!st.touched));
   A.every(()=>{if(D()!==st.lastT)trace();return false});
   // drag the point: the angle follows the finger round the centre, unwrapped so laps and clockwise turns count
   const angleAt=p=>{const G=geo(A);return Math.atan2(-(p.y-G.cy),p.x-G.cx)*180/Math.PI};
   A.gest({down:p=>{const G=geo(A),dist=Math.hypot(p.x-G.cx,p.y-G.cy);if(dist<G.r*.3||dist>G.r*1.45)return false;
     const a=angleAt(p),cur=st.deg;let delta=a-norm(cur);delta=((delta+540)%360)-180;st.raw=cur+delta;st.last=a;st.drag=true;st.touched=true;setDeg(snap(st.raw),true);return true},
    move:p=>{if(!st.drag)return;const a=angleAt(p);let delta=a-st.last;delta=((delta+540)%360)-180;st.last=a;st.raw+=delta;const s=snap(st.raw);if(s!==D()){setDeg(s,true);updateRead()}},
    up:()=>{if(!st.drag)return;st.drag=false;say();st.chk()}});
   say()}});
 // ---------- challenge: place the point for given coordinates ----------
 const TARGETS=[[150,'cos θ = −√3/2 and sin θ = 1/2'],[240,'cos θ = −1/2 and sin θ = −√3/2'],[315,'cos θ = √2/2 and sin θ = −√2/2'],[120,'sin θ = √3/2 and cos θ is negative'],
  [330,'sin θ = −1/2 and cos θ is positive'],[180,'cos θ = −1 and sin θ = 0'],[300,'cos θ = 1/2 and sin θ = −√3/2'],[225,'cos θ and sin θ both equal −√2/2']];let qi=-1;
 function newChal(){qi=(qi+1)%TARGETS.length;st.q=TARGETS[qi];st.won=false;resetTo(0);st.chk=()=>{};
  chal.innerHTML=`<p><b>Place the point where ${st.q[1]}.</b> Then press Check. Any angle that lands on the right point counts.</p><p class="fl-fb" role="status" aria-live="polite"></p><button type="button" class="lbtn sm">Check</button>`;chal.querySelector('.lbtn').onclick=judge}
 const near=(a,b)=>Math.abs(a-b)<1e-6;
 function judge(){const fb=chal.querySelector('.fl-fb');if(!st.q||st.won)return;const d=D(),t=st.q[0],x=cosD(d),y=sinD(d),tx=cosD(t),ty=sinD(t);
  if(norm(d)===t){st.won=true;fb.innerHTML=`✓ θ = ${dg(d)}${norm(d)!==d?` (same point as ${t}°)`:''}: the point is (${exact(tx)}, ${exact(ty)}). Reference angle ${refAngle(t)}°, signs from quadrant ${ROMAN[quad(t)]||'on an axis'}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();let m;const sameSize=near(Math.abs(x),Math.abs(tx))&&near(Math.abs(y),Math.abs(ty)),xs=sgn(x)===sgn(tx),ys=sgn(y)===sgn(ty);
  if(sameSize&&!xs&&ys)m=`Right size, wrong side. Your cos θ = ${f3(x)}, but it should be ${sgn(tx)==='−'?'negative':'positive'}. cos θ is the x-coordinate: negative left of the y-axis, positive right of it.`;
  else if(sameSize&&xs&&!ys)m=`Right size, wrong height. Your sin θ = ${f3(y)}, but it should be ${sgn(ty)==='−'?'negative':'positive'}. sin θ is the y-coordinate: negative below the x-axis.`;
  else if(sameSize)m=`Both signs are flipped: your point is directly opposite the target, 180° away. Check which quadrant has cos ${sgn(tx)} and sin ${sgn(ty)}.`;
  else if(near(Math.abs(x),Math.abs(ty))&&near(Math.abs(y),Math.abs(tx)))m=`You swapped sine and cosine. cos θ is the across distance (x) and sin θ is the height (y). At ${dg(d)} the point is (${f3(x)}, ${f3(y)}).`;
  else m=`At ${dg(d)} the point is (${f3(x)}, ${f3(y)}). You need x = ${f3(tx)} and y = ${f3(ty)}: move ${Math.abs(x-tx)>.01?(x<tx?'right':'left'):''}${Math.abs(x-tx)>.01&&Math.abs(y-ty)>.01?' and ':''}${Math.abs(y-ty)>.01?(y<ty?'up':'down'):''}.`;
  fb.textContent=m}
 A.start()})})();
