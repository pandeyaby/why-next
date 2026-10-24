/* Flagship 37 – building a linear model from a context. A candle burns at a steady rate; the learner only gets two readings
   (2 h → 18 cm, 5 h → 12 cm). Dragging the clock between them grows a change bracket (3 h, −6 cm) so the rate comes from
   change ÷ change; dragging back to 0 h finds the start value; three pickers build h = 22 − 2t and a wrong pick draws a line
   that visibly misses a reading; dragging forward finds where the model stops making sense (11 h). A gym-cost context then
   repeats the build with different units. Sandbox: drag either reading and watch rate, start and equation update.
   Challenge: pick the model for a new context; feedback names the slip (first reading used as the start, value ÷ time,
   total change not divided, sign of the rate, change in x ÷ change in y). */
(()=>{const f=v=>{v=Math.round(v*100)/100;return(v<0?'−':'')+Math.abs(v)},
 CTX={candle:{x:'t',y:'h',xn:'time',yn:'height',xu:'h',yu:'cm',a:[2,18],b:[5,12],X:12,Y0:-4,Y1:24,dy:4},
  gym:{x:'m',y:'C',xn:'months',yn:'total cost',xu:'months',yu:'£',a:[3,95],b:[7,175],X:10,Y0:0,Y1:240,dy:40}},
 Q=[['A tank drains at a steady rate. After 3 min it holds 340 L. After 8 min it holds 240 L.','V','t','L','min',[3,340],[8,240]],
  ['A plumber charges a call-out fee plus a fixed rate per hour. A 2-hour job costs £110. A 5-hour job costs £215.','C','h','£','hours',[2,110],[5,215]],
  ['A spring stretches steadily. With 2 kg hanging it is 19 cm long. With 5 kg it is 28 cm long.','L','m','cm','kg',[2,19],[5,28]],
  ['On one day the air is 9 °C at 1 km up and −4 °C at 3 km up, falling steadily.','T','h','°C','km',[1,9],[3,-4]],
  ['A phone plays video. After 2 h it has 76% battery. After 5 h it has 52%.','B','t','%','hours',[2,76],[5,52]],
  ['Ana saves the same amount each week. After 3 weeks she has £47. After 8 weeks she has £87.','S','w','£','weeks',[3,47],[8,87]]];
 const val=(u,v)=>u==='£'?(v<0?'−£':'£')+f(Math.abs(v)):f(v)+(u==='%'||u==='°C'?'':' ')+u,
  fit=(a,b)=>{const r=(b[1]-a[1])/(b[0]-a[0]);return{r,s:a[1]-r*a[0]}},
  eqn=(y,x,s,r)=>`${y} = ${s?f(s)+(r<0?' − ':' + '):r<0?'−':''}${Math.abs(r)===1?'':f(Math.abs(r))}${x}`;
VIS.reg('flaglmod',c=>{let A,chal,kb,pk;const st={k:'candle',x:2,lo:2,hi:5,pts:null,drag:null,pick:null,line:null,stop:false,ok:null};
 const K=()=>CTX[st.k],P=()=>st.pts||[K().a,K().b];
 const geo=()=>{const{W,H}=A,l=A.narrow?44:56,r=A.narrow?14:20,t=16,b=42,k=K();return{l,r,t,b,X:x=>l+x/k.X*(W-l-r),Y:y=>H-b-(y-k.Y0)/(k.Y1-k.Y0)*(H-t-b),x:px=>(px-l)/(W-l-r)*k.X,y:py=>k.Y0+(H-b-py)/(H-t-b)*(k.Y1-k.Y0)}};
 const model=()=>{const[a,b]=P();return fit(a,b)};
 const desc=()=>{const k=K(),[a,b]=P(),m=model();let t=`Graph of ${k.yn} against ${k.xn}. Readings: ${val(k.xu,a[0])} gives ${val(k.yu,a[1])}, ${val(k.xu,b[0])} gives ${val(k.yu,b[1])}.`;
  if(A.step<=3&&A.step!==2)t+=` Clock at ${val(k.xu,st.x)}: model gives ${val(k.yu,m.s+m.r*st.x)}.`;if(st.line)t+=` Line drawn: ${eqn(k.y,k.x,st.line.s,st.line.r)}.`;
  if(A.step===5)t+=` Rate ${f(m.r)} per ${k.xu.replace(/s$/,'')}, start ${val(k.yu,m.s)}.`;return t};
 const upd=()=>{A.cv.setAttribute('aria-label',desc());const k=K(),m=model();c.say(A.step===6?'':A.step===5?`${eqn(k.y,k.x,m.s,m.r)}  (rate ${f(m.r)} cm per h, start ${f(m.s)} cm)`:A.step===2||A.step===4?(st.line?eqn(k.y,k.x,st.line.s,st.line.r):'Pick all three parts'):`At ${val(k.xu,st.x)}: ${val(k.yu,m.s+m.r*st.x)}`);A.kick()};
 let chk=()=>{};
 const draw=A=>{const{ctx,W,H,paint:Pn,col:C}=A,g=geo(),k=K(),[a,b]=P(),m=model();
  ctx.fillStyle=Pn.lin(0,0,0,H,[[0,A.mix(C.pn,C.am,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  ctx.font='11px system-ui';ctx.lineWidth=1;for(let y=k.Y0;y<=k.Y1;y+=k.dy){ctx.strokeStyle=A.alpha(C.tx,y?.08:.45);ctx.beginPath();ctx.moveTo(g.X(0),g.Y(y));ctx.lineTo(g.X(k.X),g.Y(y));ctx.stroke();ctx.fillStyle=C.mu;ctx.textAlign='right';ctx.fillText(f(y),g.l-6,g.Y(y)+4)}
  for(let x=0;x<=k.X;x++){ctx.strokeStyle=A.alpha(C.tx,x?.06:.45);ctx.beginPath();ctx.moveTo(g.X(x),g.Y(k.Y0));ctx.lineTo(g.X(x),g.Y(k.Y1));ctx.stroke();if(!A.narrow||x%2===0){ctx.fillStyle=C.mu;ctx.textAlign='center';ctx.fillText(x,g.X(x),H-g.b+20)}}
  ctx.fillStyle=C.tx;ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.fillText(`${k.y} (${k.yu})`,g.l+4,g.t+10);ctx.textAlign='right';ctx.fillText(`${k.x} (${k.xu})`,W-g.r,H-6);
  if(st.stop){ctx.fillStyle=A.alpha(C.gr,.12);ctx.fillRect(g.X(0),g.Y(k.Y1),g.X(11)-g.X(0),g.Y(0)-g.Y(k.Y1));ctx.fillStyle=C.gr;ctx.textAlign='center';ctx.fillText('model makes sense: 0 ≤ t ≤ 11',g.X(5.5),g.Y(k.Y1)+26)}
  const seg=(x0,x1,s,r,col,w,dash)=>{ctx.save();ctx.beginPath();ctx.rect(g.l,g.t,W-g.l-g.r,H-g.t-g.b);ctx.clip();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.setLineDash(dash||[]);ctx.beginPath();ctx.moveTo(g.X(x0),g.Y(s+r*x0));ctx.lineTo(g.X(x1),g.Y(s+r*x1));ctx.stroke();ctx.restore()};
  if(A.step===0)seg(a[0],st.x,m.s,m.r,C.cy,4);
  if(A.step===1){seg(a[0],b[0],m.s,m.r,C.cy,4);seg(st.x,a[0],m.s,m.r,C.cy,3,[7,5])}
  if(A.step===3||A.step===5)seg(0,k.X,m.s,m.r,C.cy,4);
  if(A.step===5){ctx.strokeStyle=C.or;ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(g.X(a[0]),g.Y(a[1]));ctx.lineTo(g.X(b[0]),g.Y(a[1]));ctx.lineTo(g.X(b[0]),g.Y(b[1]));ctx.stroke();ctx.setLineDash([]);
   Pn.label(`change in t: ${f(b[0]-a[0])}`,g.X((a[0]+b[0])/2),g.Y(a[1])+(b[1]>a[1]?16:-16),{pill:1,font:'600 10px system-ui',bg:A.alpha(C.or,.92),col:'#1a0d00'});Pn.label(`change in h: ${f(b[1]-a[1])}`,g.X(b[0])+(b[0]>a[0]?8:-8),g.Y((a[1]+b[1])/2),{align:b[0]>a[0]?'left':'right',pill:1,font:'600 10px system-ui',bg:A.alpha(C.or,.92),col:'#1a0d00'});
   if(m.s>=k.Y0&&m.s<=k.Y1){Pn.ball(g.X(0),g.Y(m.s),7,C.gr);Pn.label(`start ${f(m.s)}`,g.X(0)+12,g.Y(m.s),{align:'left',pill:1,font:'600 10px system-ui',bg:C.gr,col:'#04120a'})}}
  if(st.line){const hit=[a,b].every(p=>Math.abs(st.line.s+st.line.r*p[0]-p[1])<1e-6);seg(0,k.X,st.line.s,st.line.r,hit?C.gr:C.rd,4)}
  if(A.step===0&&st.x>a[0]){const y1=m.s+m.r*st.x;ctx.strokeStyle=C.or;ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(g.X(a[0]),g.Y(a[1]));ctx.lineTo(g.X(st.x),g.Y(a[1]));ctx.lineTo(g.X(st.x),g.Y(y1));ctx.stroke();ctx.setLineDash([]);
   Pn.label(`+${f(st.x-a[0])} h`,g.X((a[0]+st.x)/2),g.Y(a[1])-14,{pill:1,bg:A.alpha(C.or,.92),col:'#1a0d00'});Pn.label(`${f(y1-a[1])} cm`,g.X(st.x)+8,g.Y((a[1]+y1)/2),{align:'left',pill:1,bg:A.alpha(C.or,.92),col:'#1a0d00'})}
  [a,b].forEach((p,i)=>{Pn.glow(A.alpha(C.pk,.7),10);Pn.ball(g.X(p[0]),g.Y(p[1]),A.step===5?11:7,C.pk);Pn.noShadow();if(!(A.step<=3&&A.step!==2&&p[0]===st.x))Pn.label(`${A.step===5?'AB'[i]+' ':''}(${f(p[0])}, ${f(p[1])})`,g.X(p[0])+(A.step===5?0:i?10:-10),g.Y(p[1])+(A.step===5?24:-16),{align:A.step===5?'center':i?'left':'right',font:'600 11px system-ui',pill:1,bg:A.alpha(C.pn,.9),col:C.tx})});
  if(A.step<=3&&A.step!==2){const y=m.s+m.r*st.x,X=g.X(st.x);ctx.strokeStyle=A.alpha(C.vi,.7);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(X,g.Y(k.Y0));ctx.lineTo(X,g.t);ctx.stroke();Pn.glow(A.alpha(C.vi,.9),12);Pn.ball(X,g.Y(k.Y0),9,C.vi);Pn.noShadow();
   if(y>=k.Y0)Pn.ball(X,g.Y(y),6,y<0?C.rd:C.vi);Pn.label(y<0?`${f(y)} cm?`:`${f(y)} cm`,X+(st.x>k.X-3?-12:12),g.Y(Math.max(y,k.Y0))-14,{align:st.x>k.X-3?'right':'left',pill:1,bg:y<0?C.rd:A.alpha(C.vi,.92),col:'#fff'});candle(A,Math.max(0,y))}};
 const candle=(A,h)=>{const{ctx,W,paint:Pn,col:C}=A,s=A.narrow?2.6:3.4,x=W-(A.narrow?44:64),base=A.narrow?118:150,top=base-h*s;ctx.fillStyle=A.alpha(C.tx,.15);Pn.rrect(x-22,base,44,8,3);ctx.fill();
  if(h>0){ctx.fillStyle=Pn.lin(x-12,0,x+12,0,[[0,'#fde68a'],[.5,'#fffbeb'],[1,'#f59e0b']]);Pn.rrect(x-11,top,22,base-top,3);ctx.fill();ctx.strokeStyle='#44403c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,top-6);ctx.stroke();
   const fl=1+.08*Math.sin(performance.now()/120);Pn.glow('#fbbf24',18);ctx.fillStyle='#f97316';ctx.beginPath();ctx.ellipse(x,top-14,5,10*fl,0,0,7);ctx.fill();ctx.fillStyle='#fde047';ctx.beginPath();ctx.ellipse(x,top-12,2.5,5*fl,0,0,7);ctx.fill();Pn.noShadow()}
  else{Pn.label('used up',x,base-10,{pill:1,bg:C.rd,col:'#fff',font:'600 10px system-ui'})}};
 const setX=v=>{v=Math.max(st.lo,Math.min(st.hi,Math.round(v*2)/2));if(v===st.x)return;st.x=v;A.sound.tick();upd();chk()};
 const picker=(rows,ans)=>{pk=c.el('div',{class:'fl-pk'},A.extra);st.pick={};rows.forEach(([lab,key,opts])=>{const g=c.el('div',{class:'fl-pick',role:'group','aria-label':lab},pk);c.el('span',{},g,lab+': ');opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-pressed':'false'},g,String(o));b.onclick=()=>{st.pick[key]=o;g.querySelectorAll('button').forEach(z=>z.setAttribute('aria-pressed',String(z===b)));A.sound.tick();build(ans)}})})};
 const build=ans=>{const p=st.pick;if(p.s==null||p.sg==null||p.r==null){st.line=null;upd();return}const r=(p.sg==='−'?-1:1)*parseFloat(p.r);st.line={s:+p.s,r};upd();if(st.line.s===ans.s&&r===ans.r){const k=K();A.done(`${eqn(k.y,k.x,ans.s,ans.r)}: the line runs through both readings.`+A.reveal(A.step))}};
 const showPick=ans=>{st.pick={s:ans.s,sg:ans.r<0?'−':'+',r:String(Math.abs(ans.r))};pk&&pk.querySelectorAll('.fl-pick').forEach(g=>{const key=['s','sg','r'][[...pk.children].indexOf(g)];g.querySelectorAll('button').forEach(z=>z.setAttribute('aria-pressed',String(z.textContent===String(st.pick[key]))))});build(ans)};
 const gymPick=()=>picker([['Start (£)','s',[95,35,0]],['Sign','sg',['+','−']],['Rate (£ per month)','r',['20','80','31.67']]],{s:35,r:20});
 const base=(k,x,lo,hi)=>{st.k=k;st.pts=null;st.x=x;st.lo=lo;st.hi=hi;st.line=null;st.stop=false;pk=null;chk=()=>{}};
 const steps=[
  {h:'Two readings',p:'A candle burns down at a steady rate. You only know two things: after 2 hours it is 18 cm tall, and after 5 hours it is 12 cm tall.',predict:{q:'How many cm does it lose each hour?',opts:['6 cm','2 cm','9 cm'],ans:1},task:'Drag the purple clock from 2 h to 5 h',show:()=>setX(5),
   go:()=>{base('candle',2,2,5);chk=()=>{if(st.x===5)A.done('In 3 hours it lost 6 cm. Rate = change in height ÷ change in time = −6 ÷ 3 = −2 cm per hour.'+A.reveal(0))}}},
  {h:'Back to the start',p:'The start value is the height at 0 hours, when the candle was lit. It is not the first reading you were given.',predict:{q:'How tall was the candle when it was lit?',opts:['18 cm','22 cm','24 cm'],ans:1},task:'Drag the clock back to 0 h',show:()=>setX(0),
   go:()=>{base('candle',2,0,5);chk=()=>{if(st.x===0)A.done('Going back 2 hours adds 2 × 2 = 4 cm: 18 + 4 = 22 cm.'+A.reveal(1))}}},
  {h:'Write the model',p:'A linear model is start value + rate × input. Build it. A wrong part draws a red line that misses a reading.',task:'Build the model h = 22 − 2t',show:()=>showPick({s:22,r:-2}),
   go:()=>{base('candle',0,0,0);picker([['Start (cm)','s',[18,22,24]],['Sign','sg',['+','−']],['Rate (cm per h)','r',['2','6','3']]],{s:22,r:-2})}},
  {h:'Where it stops',p:'h = 22 − 2t is the candle only while there is candle left. A model has a range where it makes sense.',predict:{q:'When does the candle run out?',opts:['After 22 h','After 11 h','It never does'],ans:1},task:'Drag the clock to where the height reaches 0',show:()=>setX(11),
   go:()=>{base('candle',5,0,12);chk=()=>{if(st.x===11){st.stop=true;A.done('22 − 2 × 11 = 0. After 11 h the model gives negative heights, which make no sense. Use it for 0 ≤ t ≤ 11.'+A.reveal(3))}}}},
  {h:'Same method, new context',p:'A gym charges a joining fee plus a monthly fee. 3 months cost £95 in total. 7 months cost £175.',predict:{q:'What is the joining fee?',opts:['£95','£35','£31.67'],ans:1},task:'Build the cost model C = 35 + 20m',show:()=>showPick({s:35,r:20}),
   onPredict:()=>gymPick(),go:()=>{base('gym',0,0,0);if(A.pred[4]!=null)gymPick()}},
  {h:'Sandbox',p:'Drag reading A or B (or use the buttons). The rate is always change ÷ change, and the start is where the line meets the y-axis.',go:()=>{base('candle',0,0,0);st.pts=[[2,18],[5,12]]}},
  {h:'Challenge',p:'',go:()=>{base('candle',0,0,0);newChal()}}];
 const grab=p=>{const g=geo();return P().findIndex(q=>Math.hypot(g.X(q[0])-p.x,g.Y(q[1])-p.y)<30)};
 const movePt=(i,x,y)=>{const o=st.pts[1-i];x=Math.max(0,Math.min(12,Math.round(x)));y=Math.max(0,Math.min(24,Math.round(y)));if(x===o[0])return;const q=st.pts[i];if(q[0]===x&&q[1]===y)return;st.pts[i]=[x,y];A.sound.tick();upd()};
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw:A=>{draw(A);return A.step<=3&&A.step!==2},onStep:A=>{chal.hidden=A.step!==6;kb.hidden=A.step===2||A.step===4||A.step===6;
   kb.innerHTML=A.step===5?['A','B'].map((n,i)=>`<button type="button" class="lbtn sm ghost" data-p="${i},0,1">${n} ↑</button><button type="button" class="lbtn sm ghost" data-p="${i},0,-1">${n} ↓</button><button type="button" class="lbtn sm ghost" data-p="${i},1,0">${n} →</button><button type="button" class="lbtn sm ghost" data-p="${i},-1,0">${n} ←</button>`).join(' '):'<button type="button" class="lbtn sm ghost" data-d="-.5">◀ clock −½ h</button> <button type="button" class="lbtn sm ghost" data-d=".5">clock +½ h ▶</button>';
   kb.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>setX(st.x+ +b.dataset.d));kb.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const[i,dx,dy]=b.dataset.p.split(',').map(Number),q=st.pts[i];movePt(i,q[0]+dx,q[1]+dy)});upd()},
  init:A=>{kb=c.el('div',{class:'fl-kb'},A.below);chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   A.gest({down:p=>{if(A.step===5){const i=grab(p);if(i<0)return false;st.drag=i;return true}if(A.step<=3&&A.step!==2){if(A.pred[A.step]==null&&steps[A.step].predict)return false;st.drag='x';setX(geo().x(p.x));return true}return false},
    move:p=>{const g=geo();if(st.drag==='x')setX(g.x(p.x));else if(st.drag!=null)movePt(st.drag,g.x(p.x),g.y(p.y))},up:()=>{st.drag=null;A.kick()}})}});
 let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[txt,y,x,yu,xu,a,b]=Q[qi],dx=b[0]-a[0],dy=b[1]-a[1],r=dy/dx,s=a[1]-r*a[0];
  {const X=b[0]*2,ys=[0,s,s+r*X,a[1],b[1]],span=Math.max(...ys)-Math.min(...ys),dv=[2,4,5,10,20,40,50,100].find(d=>span/d<=7)||100;CTX.q={x,y,xn:xu,yn:y,xu,yu,a,b,X,Y0:Math.floor(Math.min(...ys)/dv)*dv,Y1:Math.ceil(Math.max(...ys)/dv)*dv,dy:dv};st.k='q';st.line=null;upd()}
  const all=[['ok',s,r],['first',a[1],r],['ratio',0,a[1]/a[0]],['nodiv',a[1]-dy*a[0],dy],['sign',a[1]+r*a[0],-r],['flip',a[1]-dx/dy*a[0],dx/dy]],seen=new Set([`${s},${r}`]),opts=[all[0]];
  for(const o of all.slice(1).sort(()=>Math.random()-.5)){const key=`${Math.round(o[1]*100)},${Math.round(o[2]*100)}`;if(!seen.has(key)&&opts.length<4&&[o[1],o[2]].every(v=>Math.abs(v*100-Math.round(v*100))<1e-6)){seen.add(key);opts.push(o)}}
  opts.sort(()=>Math.random()-.5);
  chal.innerHTML=`<p><b>Pick the model.</b> ${txt}</p><div class="fl-pick" role="group" aria-label="Models">${opts.map((o,i)=>`<button type="button" class="lbtn sm ghost" data-i="${i}">${eqn(y,x,o[1],o[2])}</button>`).join(' ')}</div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  A.cv.setAttribute('aria-label',`Challenge: ${txt} Choose the linear model.`);
  chal.querySelectorAll('[data-i]').forEach(btn=>btn.onclick=()=>{const[k,s0,r0]=opts[+btn.dataset.i];st.line={s:s0,r:r0};A.kick();const fb=chal.querySelector('.fl-fb'),work=`Rate = ${f(dy)} ÷ ${f(dx)} = ${f(r)} per ${xu.replace(/s$/,'')}; start = ${f(a[1])} ${r<0?'+':'−'} ${f(Math.abs(r))} × ${f(a[0])} = ${f(s)}.`;let m='';
   if(k==='ok'){fb.innerHTML=`✓ ${eqn(y,x,s,r)}. ${work} <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   if(k==='first')m=`That uses the first reading, ${f(a[1])}, as the start. The start is the value at ${x} = 0, so work back from the reading.`;
   else if(k==='ratio')m=`That divides one reading by its ${x}, as if the value were 0 at the start. Use change ÷ change between the two readings.`;
   else if(k==='nodiv')m=`The change of ${f(dy)} happened over ${f(dx)} ${xu}, not over 1. Divide by the change in ${x}.`;
   else if(k==='sign')m=`Check the direction: the value goes ${dy<0?'down, so the rate is negative':'up, so the rate is positive'}.`;
   else m=`That is change in ${x} ÷ change in ${y}. The rate is change in ${y} ÷ change in ${x}.`;
   A.sound.miss();fb.textContent=m+' '+work})};
 A.start()})})();
