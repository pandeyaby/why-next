/* Flagship – polar coordinates (16–18): turn from the initial line by θ (anticlockwise, radians), then walk r from the pole.
   Plot points in every quadrant, wind extra laps to find more names for one point, walk backwards for negative r,
   read off x = r cos θ and y = r sin θ, then plot and rename points in the challenge with feedback on each slip. */
(()=>{const M=Math,P=M.PI,F=(w,z)=>w+' '+z+'px system-ui',RMAX=4;
 const gcd=(a,b)=>b?gcd(b,a%b):M.abs(a);
 const th=k=>{if(!k)return'0';const g=gcd(M.abs(k),12),n=k/g,d=12/g;return(n<0?'−':'')+(M.abs(n)===1?'':M.abs(n))+'π'+(d===1?'':'/'+d)};
 const nm=(r,k)=>'('+(r<0?'−':'')+M.abs(r)+', '+th(k)+')';
 const pos=(r,k)=>[r*M.cos(k*P/12),r*M.sin(k*P/12)];
 const same=(a,b)=>{const p=pos(a[0],a[1]),q=pos(b[0],b[1]);return M.abs(p[0]-q[0])<1e-6&&M.abs(p[1]-q[1])<1e-6};
 const n1=v=>{v=M.round(v*100)/100;return(v<0?'−':'')+M.abs(v)};
 const T1=[[3,8],[2,14],[4,21]],NAMES=[[3,3],[3,27],[3,-21]];
 function slip(t,a){const[R,K]=t,[r,k]=a;let m;if(same(t,a))return'';const q=pos(r,k),d=M.hypot(q[0],q[1]),dir=d&&M.abs(M.atan2(M.sin(M.atan2(q[1],q[0])-K*P/12),M.cos(M.atan2(q[1],q[0])-K*P/12)))<1e-6;
  if(same([R,-K],a))m='You turned clockwise. θ is measured anticlockwise from the initial line, so turn the other way.';
  else if(same([R,6-K],a))m='You measured from straight up, like a bearing. θ starts on the initial line, pointing right, and turns anticlockwise.';
  else if(same([R,K+12],a))m='That is half a turn out: the opposite side of the pole. Face along θ = '+th(K)+' and walk forwards.';
  else if(dir)m='Right direction, but r is the distance from the pole. Walk out '+R+', not '+n1(d)+'.';
  else if(M.abs(d-R)<1e-6)m='r = '+R+' is right, but the turn is off. Turn anticlockwise from the initial line until θ = '+th(K)+'.';
  else m='Turn to '+th(K)+' first, then walk out '+R+' from the pole.';return m}
VIS.reg('flagpolar',c=>{let A,pad,chal,read;
 const G={r:3,k:0,neg:0,hit:[],nm:[],t3:0,tg:0,miss:'',gen:0,check:()=>{},drag:0,Q:null,trace:[]};
 const mode=()=>['line','plot','names','negr','xy','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?78:60,R=M.min(N?W/2-18:W*.36,(H-top-(N?64:20))/2),cx=N?W/2:W*.4,cy=top+R+4;return{W,H,N,R,cx,cy,u:R/RMAX}}
 const toS=(r,k,g)=>{const p=pos(r,k);return[g.cx+p[0]*g.u,g.cy-p[1]*g.u]};
 function grid(x,C,g){x.lineWidth=1;for(let i=1;i<=RMAX;i++){x.strokeStyle=A.alpha(C.mu,i===RMAX?.55:.3);x.beginPath();x.arc(g.cx,g.cy,i*g.u,0,7);x.stroke()}
  x.font=F(600,11);x.textAlign='center';for(let j=0;j<12;j++){const a=j*P/6,ex=g.cx+M.cos(a)*g.R,ey=g.cy-M.sin(a)*g.R;if(j){x.strokeStyle=A.alpha(C.mu,.22);x.setLineDash([3,4]);x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(ex,ey);x.stroke();x.setLineDash([])}
   x.fillStyle=C.mu;x.fillText(th(2*j),g.cx+M.cos(a)*(g.R+13),g.cy-M.sin(a)*(g.R+13)+4)}
  for(let i=1;i<=RMAX;i++){x.fillStyle=C.mu;x.fillText(i,g.cx+i*g.u-6,g.cy+13)}
  x.strokeStyle=C.cy;x.lineWidth=3;x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(g.cx+g.R,g.cy);x.stroke();x.fillStyle=C.cy;x.font=F(700,11);x.textAlign='right';x.fillText('initial line',g.cx+g.R,g.cy+28);
  A.paint.ball(g.cx,g.cy,6,C.tx);x.fillStyle=C.tx;x.textAlign='right';x.fillText('pole O',g.cx-16,g.cy-14)}
 function turnArc(x,C,g,k){if(!k)return;const n=M.abs(k),s=M.sign(k);x.strokeStyle=C.am;x.lineWidth=2.5;x.beginPath();for(let i=0;i<=n*4;i++){const a=s*i/4*P/12,rr=(16+i/48*10)*(g.N?.9:1);const X=g.cx+M.cos(a)*rr,Y=g.cy-M.sin(a)*rr;i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();
  const a=k*P/12,rr=16+n/12*10,X=g.cx+M.cos(a)*rr,Y=g.cy-M.sin(a)*rr;x.fillStyle=C.am;x.beginPath();x.arc(X,Y,4,0,7);x.fill();if(n>=24){x.font=F(800,12);x.textAlign='left';x.fillText('+'+M.floor(n/24)+' lap'+(n>=48?'s':''),g.cx+30,g.cy+28)}}
 function arm(x,C,g,r,k,col){const[px,py]=toS(r,k,g);if(r<0){const[qx,qy]=toS(-r,k,g);x.strokeStyle=A.alpha(C.vi,.5);x.setLineDash([5,5]);x.lineWidth=2;x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(qx,qy);x.stroke();x.setLineDash([]);
   x.fillStyle=C.mu;x.font=F(600,11);x.textAlign='center';x.fillText('facing θ',qx,qy-8)}x.strokeStyle=col;x.lineWidth=3;x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(px,py);x.stroke();A.paint.ball(px,py,11,col)}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.vi,.04);x.fillRect(0,0,g.W,g.H);grid(x,C,g);
  const LB=[];if(m==='plot')G.hit.forEach(i=>{const[px,py]=toS(T1[i][0],T1[i][1],g);A.paint.ball(px,py,7,C.gr);const dx=px-g.cx,dy=py-g.cy,d=M.hypot(dx,dy)||1;LB.push([nm(...T1[i]),px-dx/d*30,py-dy/d*30])});
  if(m==='names'){const[px,py]=toS(3,3,g);x.strokeStyle=C.pk;x.lineWidth=3;x.beginPath();x.arc(px,py,16,0,7);x.stroke()}
  if(m==='negr'&&G.t3){const[px,py]=toS(2,16,g);x.strokeStyle=C.gr;x.lineWidth=2.5;x.beginPath();x.arc(px,py,16,0,7);x.stroke()}
  if(m==='xy'){const[px,py]=toS(G.r,G.k,g);x.strokeStyle=C.pk;x.lineWidth=2;x.setLineDash([4,3]);x.beginPath();x.moveTo(px,py);x.lineTo(px,g.cy);x.moveTo(px,py);x.lineTo(g.cx,py);x.stroke();x.setLineDash([]);
   XY[G.tg]&&(()=>{const[tx,ty]=[g.cx+XY[G.tg][0]*g.u,g.cy-XY[G.tg][1]*g.u];x.strokeStyle=C.or;x.lineWidth=2.5;x.beginPath();x.moveTo(tx-9,ty-9);x.lineTo(tx+9,ty+9);x.moveTo(tx+9,ty-9);x.lineTo(tx-9,ty+9);x.stroke()})()}
  if(m==='quiz'&&G.Q&&G.Q.t&&G.Q.shown){const[px,py]=toS(G.Q.t[0],G.Q.t[1],g);x.strokeStyle=C.gr;x.lineWidth=3;x.beginPath();x.arc(px,py,16,0,7);x.stroke()}
  turnArc(x,C,g,G.k);arm(x,C,g,G.r,G.k,m==='quiz'&&!(G.Q&&G.Q.plot)?A.alpha(C.mu,.4):C.vi);
  LB.forEach(l=>A.paint.label(l[0],l[1],l[2],{bg:A.alpha(C.gr,.85)}));const[px,py]=toS(G.r,G.k,g);if(!(m==='plot'&&G.hit.some(i=>same(T1[i],[G.r,G.k]))))A.paint.label(nm(G.r,G.k),px,py+(py<g.cy?-24:24),{bg:A.alpha(C.tx,.8),col:C.pn});
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,g.N?44:44,g.W-24,15);
  if(m==='xy'||m==='free'){const p=pos(G.r,G.k),s=[`x = r cos θ = ${n1(p[0])}`,`y = r sin θ = ${n1(p[1])}`];x.font=F(700,13);x.fillStyle=C.pk;s.forEach((t,i)=>x.fillText(t,g.N?12:g.cx+g.R+24,g.N?g.H-40+i*17:g.cy-10+i*18))}
  A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 const XY=[[0,-2],[-3,0]];
 function head(){const m=mode();if(m==='line')return'Put the point at (3, π/2)';if(m==='plot')return G.hit.length<3?`Plot ${nm(...T1[G.hit.length])}: point ${G.hit.length+1} of 3`:'All three points plotted';
  if(m==='names')return`Names found for the ringed point: ${G.nm.length} of 3`;if(m==='negr')return G.t3>1?'(−2, π/3) and (2, 4π/3): one point':G.t3?'Now give the same point with r > 0':'Plot (−2, π/3)';
  if(m==='xy')return G.tg<2?`Move to the Cartesian point (${XY[G.tg].map(n1).join(', ')})`:'Both Cartesian points reached';if(m==='free')return'Point '+nm(G.r,G.k);return G.Q?G.Q.q:''}
 function sub(){const m=mode();if(m==='line')return'Turn from the initial line, then walk out from the pole. Drag the point or use the buttons.';if(m==='plot')return'Drag the point, then press Check.';
  if(m==='names')return'Keep turning past a full lap: the angle keeps counting. Press Check at the ring each time.';if(m==='negr')return'Walk backwards turns r negative. Press Check.';
  if(m==='xy')return'Find r and θ that land on the orange cross, then press Check.';if(m==='free')return'Drag round and round, or walk backwards. The orange arc counts the turn.';return G.Q&&G.Q.plot?'Drag the point, then press Check.':''}
 function tell(msg){const s=(msg?msg+' ':'')+head()+'. Point '+nm(G.r,G.k)+'. '+sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function set(r,k,quiet){G.r=M.max(-RMAX,M.min(RMAX,r));G.k=M.max(-72,M.min(72,k));G.miss='';if(quiet)A.redraw();else{A.sound.tick();tell('')}}
 function check(){const m=mode(),a=[G.r,G.k];let s;
  if(m==='line'){return}
  if(m==='plot'){const t=T1[G.hit.length];if(!t)return;s=slip(t,a);if(!s){G.hit.push(G.hit.length);A.sound.pop();return tell('Yes, '+nm(...t)+' is right.')}}
  if(m==='names'){if(!same([3,3],a)){s='That point is not on the ring. '+(slip([3,3],a)||'');}else if(G.nm.includes(G.k)||G.r!==3)s=G.r!==3?'Keep r = 3 here: find new angles.':'You have that name already. Turn a full lap (2π) more or less.';
   else{G.nm.push(G.k);A.sound.pop();return tell(nm(3,G.k)+' lands on the same point.')}}
  if(m==='negr'){if(!G.t3){if(G.r===-2&&same([-2,4],a)){G.t3=1;A.sound.pop();return tell('Facing π/3 and walking back 2 lands opposite, in the third quadrant.')}
    s=G.r>0?'r must be −2: press "Walk backwards" so the point goes behind the pole.':same([2,4],a)?'Same direction as π/3 but forwards. Walk backwards for r = −2.':'Face θ = π/3, then walk back 2.'}
   else{if(G.r>0&&same([-2,4],a)){G.t3=2;A.sound.pop();return tell(nm(G.r,G.k)+' is the same point as (−2, π/3).')}s=G.r<0?'Now use r = 2 (walk forwards) and find the angle that reaches the green ring.':'Not on the green ring. Half a turn from π/3 is π/3 + π.'}}
  if(m==='xy'){const t=XY[G.tg];if(!t)return;const p=pos(G.r,G.k);if(M.abs(p[0]-t[0])<1e-6&&M.abs(p[1]-t[1])<1e-6){A.sound.pop();G.tg++;return tell(`Yes: ${n1(p[0])} and ${n1(p[1])}.`)}
   s=`Your point is at x = ${n1(p[0])}, y = ${n1(p[1])}. `+(G.tg?'(−3, 0) is 3 units left of the pole: half a turn.':'(0, −2) is 2 units straight down: three quarters of a turn.')}
  if(m==='quiz'&&G.Q&&G.Q.plot){return judgePlot()}
  G.miss=s||'';A.sound.miss();tell(G.miss)}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(m==='quiz'&&!(G.Q&&G.Q.plot))return;const sg=G.r<0?-1:1;
  b('Turn −π/12',()=>set(G.r,G.k-1),'Turn clockwise by π/12');b('Turn +π/12',()=>set(G.r,G.k+1),'Turn anticlockwise by π/12');b('Turn +π/2',()=>set(G.r,G.k+6),'Turn anticlockwise by π/2');
  b('r −1',()=>set(sg*M.max(0,M.abs(G.r)-1),G.k),'Walk 1 unit nearer the pole');b('r +1',()=>set(sg*M.min(RMAX,M.abs(G.r)+1)||1,G.k),'Walk 1 unit further from the pole');
  if(m!=='line'&&m!=='plot'&&m!=='names')b(G.r<0?'Walk forwards':'Walk backwards',()=>set(-G.r,G.k),G.r<0?'Make r positive':'Make r negative');if(m!=='free'&&m!=='line')b('Check',check)}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{r:3,k:0,hit:[],nm:[],t3:0,tg:0,miss:'',drag:0},o||{})};
 const steps=[
  {h:'Turn, then walk',p:'A polar point (r, θ) starts at the pole O. Turn by θ from the initial line, then walk r units out. θ is in radians and counts anticlockwise.',
   predict:{q:'Which way does θ turn from the initial line?',opts:['Clockwise, like a bearing','Anticlockwise'],ans:1},
   task:'Put the point at (3, π/2)',show:()=>play([()=>set(3,3),()=>set(3,6)],400),go:()=>{reset();G.check=when(0,()=>G.r===3&&same([3,6],[G.r,G.k]),()=>'π/2 is a quarter turn anticlockwise: straight up from the pole.')}},
  {h:'Plot in every quadrant',p:'Each ray on the grid is π/6 more. A half turn is π and a full turn is 2π.',
   predict:{q:'Where is (3, 2π/3)?',opts:['Up and to the left of the pole','Up and to the right: 2π/3 is under a right angle','Down and to the left'],ans:0},
   task:'Plot all three points',show:()=>play(T1.flatMap(t=>[()=>set(...t),check]),350),go:()=>{reset();G.check=when(1,()=>G.hit.length>=3,()=>'2π/3 is past π/2, so up and left. 7π/6 is past π, and 7π/4 is nearly a full turn.')}},
  {h:'Many names, one point',p:'Turning a full lap, 2π, brings you back to the same ray. So adding or taking away 2π gives a new name for the same point.',
   predict:{q:'(3, π/4) and (3, 9π/4) are…',opts:['Different points: 9π/4 turns further','The same point'],ans:1},
   task:'Give the ringed point three names with r = 3',show:()=>play(NAMES.flatMap(t=>[()=>set(...t),check]),350),go:()=>{reset({k:3});G.check=when(2,()=>G.nm.length>=3,()=>'π/4, 9π/4 and −7π/4 all land on one point: they differ by 2π.')}},
  {h:'Negative r',p:'With r < 0, face along θ but walk backwards through the pole. Some courses only use r ≥ 0; the idea still helps with curves later.',
   predict:{q:'What is (−2, π/3)?',opts:['Impossible: a distance cannot be negative','The point 2 units opposite the π/3 ray','The same as (2, −π/3)'],ans:1},
   task:'Plot (−2, π/3), then name it with r > 0',show:()=>play([()=>set(-2,4),check,()=>set(2,16),check],450),go:()=>{reset({r:2,k:0});G.check=when(3,()=>G.t3>=2,()=>'(−2, π/3) is the same point as (2, 4π/3): walking back is the same as turning an extra π.')}},
  {h:'Polar to Cartesian',p:'The point’s x is r cos θ and its y is r sin θ. Watch both change as you move it.',
   predict:{q:'(4, π) in Cartesian coordinates is…',opts:['(4, π)','(−4, 0)','(0, 4)'],ans:1},
   task:'Reach both Cartesian points',show:()=>play([()=>set(2,18),check,()=>set(3,12),check],450),go:()=>{reset({r:1,k:0});G.check=when(4,()=>G.tg>=2,()=>'(2, 3π/2) gives x = 0, y = −2 and (3, π) gives x = −3, y = 0.')}},
  {h:'Sandbox',p:'Drag round more than once and watch the lap count. Walk backwards to flip r. The pole is (0, θ) for any θ.',go:()=>reset({r:2,k:2})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;const R=1+qi*7%4,ks=[8,3,10,14,9,20,16,4],K=ks[qi%8];chal.innerHTML='';G.miss='';
  if(qi%2===0){G.Q={plot:1,t:[R,K],q:'Plot '+nm(R,K),shown:0};G.r=1;G.k=0;chal.innerHTML=`<p><b>Plot ${nm(R,K)}, then press Check.</b></p><p class="fl-fb" role="status" aria-live="polite"></p>`;return tell('Challenge: plot '+nm(R,K))}
  const ok=[[R,K+24],[R,K-24],[-R,K+12]][qi%3],opts=[[nm(...ok),'ok'],[nm(R,K+12),'half'],[nm(-R,K),'neg'],[nm(R,-K),'mirror']],r=qi%4;
  G.Q={q:'Which is another name for '+nm(R,K)+'?'};const o2=opts.slice(r).concat(opts.slice(0,r));G.r=R;G.k=K;
  chal.innerHTML=`<p><b>${G.Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o2.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+G.Q.q)}
 function fin(ok,m){if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m;A.cv.setAttribute('aria-label',s);const fb=chal.querySelector('.fl-fb');
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function judgePlot(){const t=G.Q.t,s=slip(t,[G.r,G.k]);G.Q.shown=1;G.Q.plot=0;controls();A.redraw();fin(!s,s||'Right: turn '+th(t[1])+' anticlockwise, walk '+t[0]+'.')}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);let m;
  if(o[1]==='ok')m='Right: a full turn of 2π, or walking backwards after an extra π, lands on the same point.';
  else if(o[1]==='half')m='Adding π points the opposite way. Only a full turn, 2π, comes back to the same ray (unless r changes sign too).';
  else if(o[1]==='neg')m='Making r negative walks backwards, to the opposite side of the pole. You also need to add π.';
  else m='(r, −θ) turns clockwise instead: it is the mirror image in the initial line.';fin(o[1]==='ok',m)}
 function fromP(p,g){const dx=(p.x-g.cx)/g.u,dy=(g.cy-p.y)/g.u,d=M.min(RMAX,M.round(M.hypot(dx,dy)));if(!d)return set(0,G.k,1);let raw=M.atan2(dy,dx)/(P/12);if(G.r<0)raw+=12;let dl=raw-G.k;dl-=24*M.round(dl/24);set((G.r<0?-1:1)*d,M.round(G.k+dl),1)}
 function down(p){const m=mode(),g=geo();if(m==='quiz'&&!(G.Q&&G.Q.plot))return false;if(M.hypot(p.x-g.cx,p.y-g.cy)>g.R+24)return false;G.drag=1;fromP(p,g);return true}
 function mv(p){if(G.drag)fromP(p,geo())}
 function up(){G.drag=0;A.sound.tick();tell('')}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Polar point controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
