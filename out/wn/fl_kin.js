/* Flagship – velocity and acceleration by differentiation (ages 16–18): s = t³ − 6t² + 9t on a track with linked
   s, v and a graphs. Build v = ds/dt term by term, read direction from the sign of v (not s), pin the times the particle
   is momentarily at rest, build a = dv/dt, and decide speeding up or slowing down from the signs of v and a. */
(()=>{
const s=t=>t*t*t-6*t*t+9*t,v=t=>3*t*t-12*t+9,a=t=>6*t-12,f2=x=>(Math.abs(x)<.005?0:x).toFixed(2).replace('-','−');
const BUILD=[{from:'t³',to:'3t²',opts:[['3t²',''],['t²','Bring the power down as a multiplier: d/dt of t³ is 3t², not t².'],['3t³','Multiply by the power, then lower the power by one: 3t², not 3t³.']]},
 {from:'− 6t²',to:'− 12t',opts:[['− 6t','Multiply −6 by the power 2 as well: −12t.'],['− 12t',''],['− 12t²','Lower the power by one: t² becomes t, so −12t.']]},
 {from:'+ 9t',to:'+ 9',opts:[['+ 9t','d/dt of 9t is 9: the t goes, the 9 stays.'],['+ 0','Only a constant differentiates to 0. 9t has gradient 9.'],['+ 9','']]}];
const BUILD2=[{from:'3t²',to:'6t',opts:[['6t',''],['3t','Multiply 3 by the power 2: 6t.'],['6t²','Lower the power: t² becomes t, so 6t.']]},
 {from:'− 12t',to:'− 12',opts:[['− 12t','d/dt of −12t is −12: the t goes.'],['− 12',''],['+ 12','Keep the sign: the gradient of −12t is −12.']]},
 {from:'+ 9',to:'+ 0',opts:[['+ 9','A constant does not change, so its rate of change is 0.'],['+ 0',''],['+ 9t','That is integrating, not differentiating. A constant gives 0.']]}];
VIS.reg('flagkin',c=>{let A,keys,box;const K={};
const stage=()=>['build','dir','rest','acc','speed','quiz'][A.step];
const z=n=>A.narrow?n:Math.round(n*1.12),fnt=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function rbox(g,r,col,fa,lw){g.save();g.fillStyle=A.alpha(col,fa);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=lw||1.5;g.stroke();g.restore()}
function put(g,t,x,y,n,col,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
const chip=(t,x,y,bg)=>A.paint.label(t,x,y,{font:fnt(12,800),bg});
// ---------- layout ----------
function layout(){const m=stage(),parts=m==='build'?['eq','s','v']:m==='acc'?['eq','v','a']:m==='speed'?['track','v','a']:['track','s','v'];
 const H={eq:.3,track:.17},fixed=parts.reduce((u,p)=>u+(H[p]||0),0),gh=(1-fixed)/parts.filter(p=>!H[p]).length;let y=4;const L={};
 parts.forEach(p=>{const h=A.H*(H[p]||gh)-6;L[p]={x:8,y,w:A.W-16,h};y+=h+6});return L}
const RANGE={s:[-1,5,s,'s (m)'],v:[-4,10,v,'v (m/s)'],a:[-13,13,a,'a (m/s²)']};
const tx=(r,t)=>r.x+34+(r.w-44)*t/4,ty=(r,k,y)=>{const[lo,hi]=RANGE[k];return r.y+r.h-14-(r.h-30)*(y-lo)/(hi-lo)};
const built=k=>k==='s'||(k==='v'&&(stage()!=='build'||K.b>=3))||(k==='a'&&(stage()!=='acc'||K.b>=3));
function graph(g,r,k){const C=A.col,[lo,hi,fn,lab]=RANGE[k],col=k==='s'?C.ac:k==='v'?C.gr:C.or;rbox(g,r,C.mu,.05);
 g.strokeStyle=A.alpha(C.mu,.6);g.lineWidth=1;g.beginPath();const y0=ty(r,k,0);g.moveTo(tx(r,0),y0);g.lineTo(tx(r,4),y0);g.stroke();
 for(let t=0;t<=4;t++)put(g,String(t),tx(r,t),Math.min(r.y+r.h-6,y0+10),10,C.mu,600);put(g,lab,r.x+6,r.y+11,11,col,800,'left');
 if(stage()==='speed'&&k==='v')K.spans.forEach((ans,i)=>{if(ans<0)return;g.fillStyle=A.alpha(ans?C.gr:C.rd,.14);g.fillRect(tx(r,i),r.y+18,tx(r,i+1)-tx(r,i),r.h-30);put(g,ans?'faster':'slower',(tx(r,i)+tx(r,i+1))/2,r.y+26,10,C.tx,800)});
 if(!built(k)){put(g,`build ${k} first`,r.x+r.w/2,r.y+r.h/2,13,C.mu,700);return}
 g.strokeStyle=col;g.lineWidth=3;g.beginPath();for(let i=0;i<=80;i++){const t=i/20,y=Math.max(lo,Math.min(hi,fn(t)));i?g.lineTo(tx(r,t),ty(r,k,y)):g.moveTo(tx(r,t),ty(r,k,y))}g.stroke();
 const T=K.t,X=tx(r,T),Y=ty(r,k,fn(T));if(k==='s'){const m=v(T),d=.6;g.strokeStyle=C.gr;g.lineWidth=2;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.setLineDash([6,4]);g.beginPath();g.moveTo(tx(r,T-d),ty(r,k,fn(T)-m*d));g.lineTo(tx(r,T+d),ty(r,k,fn(T)+m*d));g.stroke();g.restore()}
 K.pins.filter(p=>p[0]===k).forEach(p=>{g.fillStyle=C.vi;g.beginPath();g.arc(tx(r,p[1]),ty(r,k,0),7,0,7);g.fill()});
 g.fillStyle=col;g.beginPath();g.arc(X,Y,6,0,7);g.fill();chip(`${k} = ${f2(fn(T))}`,Math.min(r.x+r.w-50,X+44),r.y+11,k==='s'?'#1e40af':k==='v'?'#047857':'#9a3412')}
function track(g,r){const C=A.col,px=x=>r.x+20+(r.w-40)*(x+.5)/5,y=r.y+r.h*.62;rbox(g,r,C.mu,.05);
 g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(px(-.5),y);g.lineTo(px(4.5),y);g.stroke();for(let x=0;x<=4;x++){g.beginPath();g.moveTo(px(x),y-5);g.lineTo(px(x),y+5);g.stroke();put(g,x+' m',px(x),y+16,10,C.mu,600)}
 const X=px(s(K.t)),k=(r.w-40)/50,arrow=(len,col,dy,lab)=>{if(Math.abs(len)<1)return;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;const yy=y+dy;g.beginPath();g.moveTo(X,yy);g.lineTo(X+len,yy);g.stroke();
  const sg=Math.sign(len);g.beginPath();g.moveTo(X+len,yy);g.lineTo(X+len-sg*8,yy-5);g.lineTo(X+len-sg*8,yy+5);g.fill();put(g,lab,X+len+sg*12,yy,11,col,800)};
 arrow(v(K.t)*k,C.gr,-14,'v');if(stage()==='speed')arrow(a(K.t)*k*.6,C.or,-26,'a');A.paint.ball(X,y,9,C.ac);put(g,`t = ${K.t.toFixed(2)} s`,r.x+8,r.y+11,11,C.tx,800,'left')}
function eqPanel(g,r){const C=A.col,acc=stage()==='acc',B=acc?BUILD2:BUILD,i=Math.min(K.b,2);rbox(g,r,C.vi,.07);
 put(g,acc?'v = 3t² − 12t + 9   →   a = dv/dt = ?':'s = t³ − 6t² + 9t   →   v = ds/dt = ?',r.x+r.w/2,r.y+14,13,C.tx,800);
 const ans=B.slice(0,K.b).map(x=>x.to).join(' ');put(g,(acc?'a = ':'v = ')+(ans||'…'),r.x+r.w/2,r.y+36,15,C.gr,800);
 K.cards=null;if(K.b>2)return put(g,acc?'a = 6t − 12':'v = 3t² − 12t + 9',r.x+r.w/2,r.y+r.h*.72,16,C.tx,800);
 put(g,`d/dt of ${B[i].from} = ?`,r.x+r.w/2,r.y+r.h*.48,13,C.tx,700);const gap=8,w=(r.w-20-gap*2)/3;K.cards=B[i].opts.map((o,j)=>({x:r.x+10+j*(w+gap),y:r.y+r.h*.6,w,h:r.h*.34}));
 K.cards.forEach((q,j)=>{const bad=K.miss===j;rbox(g,q,bad?C.rd:C.cy,.14,bad?3:1.5);put(g,B[i].opts[j][0],q.x+q.w/2,q.y+q.h/2,15,C.tx,800)})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.05:.3);g.fillRect(0,0,W,H);if(stage()==='quiz'){put(g,'s → v → a',W/2,H/2,24,C.tx,800);return}
 const L=layout();K.L=L;for(const k in L){if(k==='eq')eqPanel(g,L[k]);else if(k==='track')track(g,L[k]);else graph(g,L[k],k)}
 const gr=Object.keys(L).filter(k=>RANGE[k]);if(gr.length){const r0=L[gr[0]],r1=L[gr[gr.length-1]],X=tx(r0,K.t);g.strokeStyle=A.alpha(C.tx,.45);g.lineWidth=1.5;g.beginPath();g.moveTo(X,r0.y+16);g.lineTo(X,r1.y+r1.h-12);g.stroke()}A.fx.draw(g)}
// ---------- actions ----------
const snap=t=>Math.max(0,Math.min(4,Math.round(t*4)/4));
function setT(t){K.t=snap(t);if(stage()==='dir'&&s(K.t)>.001&&v(K.t)<0)K.found=1;A.redraw();say()}
function pick(j){const acc=stage()==='acc',B=acc?BUILD2:BUILD;if(K.b>2)return;const o=B[K.b].opts[j];
 if(!o[1]){K.b++;K.miss=-1;A.sound.pop();return say(K.b>2?(acc?'a = 6t − 12. The a graph is drawn.':'v = 3t² − 12t + 9. The v graph is drawn.'):`Yes: ${o[0]}.`)}K.miss=j;A.sound.miss();say(o[1])}
function pin(){const m=stage(),T=K.t;if(m==='acc'&&K.b<3)return say('Build a first.');
 const fn=m==='acc'?a:v,key=m==='acc'?'a':'v',want=m==='acc'?[2]:[1,3];
 if(Math.abs(fn(T))<1e-9){if(!K.pins.some(p=>p[0]===key&&p[1]===T)){K.pins.push([key,T]);A.sound.pop()}return say(m==='acc'?`a = 0 at t = 2: here v stops falling and starts rising.`:`v = 0 at t = ${T}: at rest for an instant.`+(K.pins.length<want.length?' Find the other time.':''))}
 A.sound.miss();say(m==='acc'?`a = ${f2(a(T))} here, not 0.`:Math.abs(s(T))<1e-9?`s = 0 here but v = ${f2(v(T))}: it is passing the start, not at rest.`:`v = ${f2(v(T))} m/s here, so it is moving. At rest needs v = 0.`)}
const span=()=>K.t%1===0?-1:Math.floor(K.t),FAST=[0,1,0,1];
function judge(fast){const i=span();if(i<0)return say('Move the time inside an interval, e.g. t = 0.5.');if(K.spans[i]>=0)return say('Done that one. Pick another interval.');
 const sv=Math.sign(v(K.t)),sa=Math.sign(a(K.t));if(fast===FAST[i]){K.spans[i]=fast;A.sound.pop();const nx=K.spans.indexOf(-1);if(nx>=0)K.t=nx+.5;
  return say(`Yes: v ${sv>0?'+':'−'} and a ${sa>0?'+':'−'} have ${sv===sa?'the same sign, so it speeds up':'opposite signs, so it slows down'} on ${i} < t < ${i+1}.`)}
 A.sound.miss();say(sa<0&&!fast?`a is negative, but v is negative too. Same signs mean speeding up.`:sa>0&&fast?`a is positive, but v is negative, so the push is against the motion: slowing down.`:`v is ${sv>0?'positive':'negative'} and a is ${sa>0?'positive':'negative'}: compare the signs, not a alone.`)}
// ---------- live text and buttons ----------
function say(msg){const m=stage();let t=`t = ${K.t.toFixed(2)} s, s = ${f2(s(K.t))} m, v = ${f2(v(K.t))} m/s.`;
 if(m==='build'||m==='acc')t=K.b<3?`Differentiate ${(m==='acc'?BUILD2:BUILD)[K.b].from}.`:t+(m==='acc'?` a = ${f2(a(K.t))}.`:'');if(m==='speed')t+=` a = ${f2(a(K.t))} m/s².`;
 speak((msg?msg+' ':'')+t);buttons();K.onChange()}
function buttons(){if(!A||!keys)return;keys.innerHTML='';const m=stage(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
 if((m==='build'||m==='acc')&&K.b<3)(m==='acc'?BUILD2:BUILD)[K.b].opts.forEach((o,j)=>add(o[0].trim(),()=>pick(j),`d/dt is ${o[0]}`));
 const timed=m==='dir'||m==='rest'||m==='speed'||(m==='acc'&&K.b>2);if(!timed)return A.redraw();
 add('◀ t − 0.25',()=>setT(K.t-.25),'Earlier time');add('t + 0.25 ▶',()=>setT(K.t+.25),'Later time');
 if(m==='rest')add('📍 At rest here',pin);if(m==='acc')add('📍 a = 0 here',pin);if(m==='speed'){add('⏩ Speeding up',()=>judge(1));add('⏪ Slowing down',()=>judge(0))}A.redraw()}
// ---------- canvas input ----------
function grab(p){const m=stage();if(K.cards){const j=K.cards.findIndex(q=>isIn(p,q));if(j>=0)pick(j);return false}
 const L=K.L||{},r=L.s||L.v||L.a;if(!r||m==='build'||(m==='acc'&&K.b<3))return false;const area=Object.keys(L).filter(k=>k!=='eq').map(k=>L[k]);if(!area.some(q=>isIn(p,q)))return false;
 K.drag=1;setT((p.x-r.x-34)/(r.w-44)*4);return true}
function slide(p){if(!K.drag)return;const L=K.L,r=L.s||L.v||L.a,T=snap((p.x-r.x-34)/(r.w-44)*4);if(T!==K.t)setT(T)}
// ---------- steps ----------
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=K.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===K.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=t=>{K.tok=(K.tok||0)+1;Object.assign(K,{onChange:()=>{},t:t||0,b:0,miss:-1,pins:[],spans:[-1,-1,-1,-1],found:0,drag:0,cards:null})};
const right=B=>B.map(x=>()=>pick(x.opts.findIndex(o=>!o[1])));
const steps=[
 {h:'Build v = ds/dt',p:'Velocity is the rate of change of displacement, so v = ds/dt. Differentiate s = t³ − 6t² + 9t one term at a time.',task:'Differentiate the 3 terms',
  show:()=>{steps[0].go();later(right(BUILD),450)},go:()=>{fresh();say();K.onChange=check(0,()=>K.b>2,'v = 3t² − 12t + 9 is the gradient of the s graph at every t.')}},
 {h:'Which way is it going?',p:'Drag along the graphs. The dashed line is the tangent to s; its gradient is v. The arrow on the track shows v.',
  predict:{q:'At t = 2, s = 2 m, which is positive. Is the particle moving in the positive direction?',opts:['Yes, s is positive','Not necessarily: check the sign of v'],ans:1},task:'Find a time when s > 0 but v < 0',
  show:()=>{steps[1].go();later([()=>setT(1),()=>setT(2)],600)},go:()=>{fresh(.5);say();K.onChange=check(1,()=>K.found,'Direction comes from the sign of v; s only says where it is.')}},
 {h:'Momentarily at rest',p:'At rest means v = 0. Move the time to each place where the v graph crosses zero and pin it.',
  predict:{q:'"Momentarily at rest" means…',opts:['s = 0','v = 0'],ans:1},task:'Pin both times when v = 0',
  show:()=>{steps[2].go();later([()=>setT(1),pin,()=>setT(3),pin],450)},go:()=>{fresh();say();K.onChange=check(2,()=>K.pins.length>=2,'Solve v = 0: 3(t − 1)(t − 3) = 0, so t = 1 and t = 3.')}},
 {h:'Build a = dv/dt',p:'Acceleration is the rate of change of velocity: a = dv/dt = d²s/dt². Build it, then find when a = 0.',
  predict:{q:'At t = 1 the particle is at rest. Is its acceleration zero too?',opts:['Yes, at rest means a = 0','No: a = 6(1) − 12 = −6'],ans:1},task:'Build a, then pin where a = 0',
  show:()=>{steps[3].go();later([...right(BUILD2),()=>setT(2),pin],450)},go:()=>{fresh(1);say();K.onChange=check(3,()=>K.pins.some(p=>p[0]==='a'),'a = 6t − 12, so a = 0 at t = 2, where v is lowest. At t = 1, v = 0 but a = −6.')}},
 {h:'Speeding up or slowing down?',p:'Look at the signs of v and a in each interval. Drag into an interval, then choose.',
  predict:{q:'On 1 < t < 2, a is negative. Is the particle slowing down?',opts:['Yes, negative a means slowing','No: v is negative too, so it speeds up'],ans:1},task:'Classify all 4 intervals',
  show:()=>{steps[4].go();later(FAST.map((f,i)=>()=>{K.t=i+.5;judge(f)}),500)},go:()=>{fresh(.5);say();K.onChange=check(4,()=>K.spans.every(x=>x>=0),'Same signs of v and a: speeding up. Opposite signs: slowing down.')}},
 {h:'Challenge',p:'',go:()=>{fresh(1);ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>K.onChange()});
// ---------- challenge: a fresh particle each time ----------
const PQ=[[1,3],[2,4],[1,5],[3,5],[2,6]];let qn=-1,run=0;
const poly=(p,q)=>`s = t³ − ${3*(p+q)/2}t² + ${3*p*q}t`;
function make(p,q,kind){const S=3*(p+q),h=(p+q)/2,T=p+.5;
 if(kind===0)return[`${poly(p,q)}. When is the particle momentarily at rest?`,[[`t = ${p} and t = ${q}`,'ok'],[`t = ${h} only`,'azero'],['t = 0, where s = 0','szero']]];
 if(kind===1)return[`${poly(p,q)}. Find the acceleration at t = ${q}.`,[[`${3*(q-p)} m/s²`,'ok'],['0 m/s²','vel'],[`${6*q} m/s²`,'drop']]];
 if(kind===2)return[`${poly(p,q)}. At t = ${T}, is it speeding up or slowing down?`,[[3*(T-p)*(T-q)<0&&6*T-S<0?'Speeding up':'Slowing down','ok'],[3*(T-p)*(T-q)<0&&6*T-S<0?'Slowing down':'Speeding up','asign'],['Neither: it is at rest','rest']]];
 return[`${poly(p,q)}. Find the velocity at t = 0.`,[[`${3*p*q} m/s`,'ok'],['0 m/s','s0'],[`${S} m/s`,'term']]]}
function slip(t){let m=`Differentiate, then substitute.`;
 if(t==='azero')m=`That is where a = 0. At rest needs v = 0: solve 3(t − p)(t − q) = 0.`;
 if(t==='szero')m=`s = 0 is the starting point, but v(0) is not 0, so it is moving there.`;
 if(t==='vel')m=`0 is the velocity at that time. Differentiate again for a.`;
 if(t==='drop')m=`You dropped the constant term of a = 6t − 3(p + q).`;
 if(t==='asign')m=`Do not read a alone. Same signs of v and a: speeding up; opposite: slowing down.`;
 if(t==='rest')m=`v is not 0 there: the time is between the two rest times.`;
 if(t==='s0')m=`s(0) = 0, but velocity is ds/dt: put t = 0 into v.`;
 if(t==='term')m=`That is the t² coefficient times 2. v(0) is just the constant term of v.`;return m}
function ask(){qn++;const[p,q]=PQ[qn%PQ.length],[text,ops]=make(p,q,qn%4),sh=qn%3;
 box.innerHTML=`<p><b>${text}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+text);A.redraw()}
function mark(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?`✓ Correct. Streak: ${run}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.35,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Controls'},w);box=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down:grab,move:slide,up:()=>{K.drag=0}});buttons()}});
A.start()})})();
