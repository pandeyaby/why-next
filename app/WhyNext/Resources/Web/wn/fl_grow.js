/* Flagship 43 – exponential expressions a·bᵗ. A bar chart of a·bᵗ for t = 0, 1, 2 … where every bar is the one before it
   times b. Drag the first bar to set the start value a and drag the factor slider to set b; a strip under the slider shows
   b as a percentage of the bar before (100% + 10% = 110%, so × 1.1; 100% − 15% = 85%, so × 0.85).
   (1) a is the t = 0 bar (trap: 520 for 500 × 1.04ᵗ). (2) +10% is × 1.1 (trap: × 0.1). (3) −15% is × 0.85 (trap: 0.15).
   (4) Repeated × 1.1 doubles 200 in 8 steps, not 10 like adding 20 a year (trap: "10 years"). (5) Build 800 × 0.75ᵗ from a
   story (trap: 775). Challenge: read a, % → factor both ways, evaluate a·bᵗ, describe a factor in words. */
(()=>{const R2=x=>String(Math.round(x*100)/100),SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=n=>String(n).replace(/\d/g,d=>SUP[d]),
 nice=v=>{const p=Math.pow(10,Math.floor(Math.log10(v))),f=v/p;return(f<=1?1:f<=2?2:f<=5?5:10)*p};
VIS.reg('flaggrow',c=>{let A,pad,chal,read;
 const S={a:100,bh:104,t:0,T:8,ymax:1000,ed:'a',cmp:false,hold:null,jolt:0,check:()=>{},seq:0,Q:null,cq:''};
 const b=()=>S.bh/100,val=t=>S.a*Math.pow(b(),t),expr=()=>`${S.a} × ${R2(b())}ᵗ`;
 const say=x=>{c.say(x);if(read)read.textContent=x};
 function pctWords(){const d=S.bh-100;return d===0?'factor 1: the value never changes':d>0?`100% + ${d}% = ${S.bh}%, so × ${R2(b())}`:`100% − ${-d}% = ${S.bh}%, so × ${R2(b())}`}
 function words(){const t=S.t,pw=pctWords();return `${expr()}. Start value ${S.a} (t = 0). ${pw[0].toUpperCase()+pw.slice(1)}. At t = ${t}: ${S.a} × ${R2(b())}${sup(t)} = ${R2(val(t))}.`+
  (S.cmp?` Adding ${R2(S.a*(b()-1))} each year instead gives ${R2(S.a+S.a*(b()-1)*t)}.`:'')}
 function upd(){say(words());sync();S.check()}
 const setA=v=>{S.a=Math.max(10,Math.min(1000,Math.round(v/10)*10));upd()};
 const setB=v=>{S.bh=Math.max(50,Math.min(150,Math.round(v)));upd()};
 const setT=v=>{S.t=Math.max(0,Math.min(S.T,Math.round(v)));upd()};
 function steps_(f,list){const z=++S.seq;let i=0;const go=()=>{if(z!==S.seq||i>=list.length)return;f(list[i++]);A.tween({u:0},{u:1},300,'io',go)};go()}
 function describe(){if(A.step===6)return S.cq||'Challenge.';
  return `Bar chart of ${expr()} for t = 0 to ${S.T}; each bar is ${R2(b())} times the bar before. `+words()}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';
  const B=(t,lab,f)=>{const q=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab},pad,t);q.onclick=()=>{f();A.sound.tick()}};
  if(A.step===6)return A.redraw();
  if(S.ed.includes('a')){B('a − 100','Start value 100 smaller',()=>setA(S.a-100));B('a − 10','Start value 10 smaller',()=>setA(S.a-10));B('a + 10','Start value 10 bigger',()=>setA(S.a+10));B('a + 100','Start value 100 bigger',()=>setA(S.a+100))}
  if(S.ed.includes('b')){B('b − 0.05','Factor 0.05 smaller',()=>setB(S.bh-5));B('b − 0.01','Factor 0.01 smaller',()=>setB(S.bh-1));B('b + 0.01','Factor 0.01 bigger',()=>setB(S.bh+1));B('b + 0.05','Factor 0.05 bigger',()=>setB(S.bh+5))}
  if(S.ed.includes('t')){B('t − 1','One step earlier',()=>setT(S.t-1));B('t + 1','One step later',()=>setT(S.t+1))}
  A.redraw()}
 // ---- layout and drawing ----
 function lay(){const N=A.narrow,W=A.W,H=A.H;return N?{N,x0:W*.12,x1:W*.96,y0:H*.08,y1:H*.52,sy:H*.66,s0:W*.1,s1:W*.9,py:H*.8}
  :{N,x0:W*.08,x1:W*.6,y0:H*.08,y1:H*.7,sy:H*.86,s0:W*.08,s1:W*.6,py:H*.3}}
 const bx=(L,t,T)=>L.x0+(L.x1-L.x0)*(t+.5)/(T+1);
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,L=lay(),Q=A.step===6&&S.Q;S.L=L;
  ctx.fillStyle=P.lin(0,H,W,0,[[0,A.mix(C.pn,C.gr,.06)],[1,A.mix(C.pn,C.cy,.07)]]);ctx.fillRect(0,0,W,H);
  const lbl=(t,X,Y,o={})=>P.label(t,X,Y,{font:'700 11px system-ui',bg:A.alpha('#1e293b',.92),...o});
  const a=Q?Q.a:S.a,bb=Q?Q.b:b(),T=Q?6:S.T,ymax=Q?nice(Math.max(a,a*Math.pow(bb,6))):S.ymax,yv=v=>L.y1-(L.y1-L.y0)*Math.min(1,v/ymax);
  ctx.strokeStyle=A.alpha(C.tx,.35);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(L.x0,L.y0);ctx.lineTo(L.x0,L.y1);ctx.lineTo(L.x1,L.y1);ctx.stroke();
  ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.textAlign='right';ctx.textBaseline='middle';
  [0,.5,1].forEach(f=>ctx.fillText(R2(ymax*f),L.x0-4,yv(ymax*f)));
  if(S.cmp&&!Q){const ty=yv(2*a);ctx.setLineDash([5,4]);ctx.strokeStyle=C.am;ctx.beginPath();ctx.moveTo(L.x0,ty);ctx.lineTo(L.x1,ty);ctx.stroke();ctx.setLineDash([]);lbl(`double = ${2*a}`,L.x0+44,ty-12,{bg:A.alpha('#92400e',.95)});lbl(`dots: + ${R2(a*(bb-1))} a year`,L.x0+60,L.y0+4,{bg:A.alpha('#334155',.95)})}
  const bw=(L.x1-L.x0)/(T+1)*.66;S.bars=[];
  for(let t=0;t<=T;t++){const v=a*Math.pow(bb,t),X=bx(L,t,T),Y=yv(v),hi=!Q&&t===S.t;
   ctx.fillStyle=A.alpha(t===0?C.vi:(bb>=1?C.gr:C.rd),hi?.85:.5);ctx.fillRect(X-bw/2,Y,bw,L.y1-Y);
   if(hi){ctx.strokeStyle=C.pk;ctx.lineWidth=3;ctx.strokeRect(X-bw/2,Y,bw,L.y1-Y)}
   if(v>ymax){ctx.fillStyle=C.tx;ctx.beginPath();ctx.moveTo(X-6,L.y0+8);ctx.lineTo(X+6,L.y0+8);ctx.lineTo(X,L.y0-2);ctx.fill()}
   ctx.fillStyle=C.tx;ctx.font='600 10px system-ui';ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText(String(t),X,L.y1+4);
   if(!Q&&(t===0||hi||(bw>30&&t%2===0)))lbl(R2(v),X,Math.max(L.y0+10,Y-12),{bg:A.alpha(t===0?'#5b21b6':'#334155',.92)});
   S.bars.push([X,Y])}
  ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.textAlign='right';ctx.fillText('t',L.x1,L.y1+16);
  if(S.cmp&&!Q){ctx.strokeStyle=A.alpha(C.tx,.6);ctx.setLineDash([3,3]);ctx.beginPath();for(let t=0;t<=T;t++){const X=bx(L,t,T),Y=yv(a+a*(bb-1)*t);t?ctx.lineTo(X,Y):ctx.moveTo(X,Y)}ctx.stroke();ctx.setLineDash([]);
   for(let t=0;t<=T;t++){ctx.fillStyle=C.tx;ctx.beginPath();ctx.arc(bx(L,t,T),yv(a+a*(bb-1)*t),3,0,7);ctx.fill()}}
  // ×b hops between the first bars
  {const[x1,y1]=S.bars[0],[x2,y2]=S.bars[1],my=Math.max(14,Math.min(y1,y2)-(Q?18:40));
   ctx.strokeStyle=C.pk;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1-(Q?4:24));ctx.quadraticCurveTo((x1+x2)/2,my,x2,y2-(Q?4:6));ctx.stroke();
   lbl(`each bar × ${R2(bb)}`,x2+40,my,{bg:A.alpha('#831843',.95)})}
  if(!Q&&S.ed.includes('a'))P.ball(S.bars[0][0],S.bars[0][1],10,C.vi);
  // factor slider and percentage strip
  const sx=v=>L.s0+(L.s1-L.s0)*(v-50)/100;
  ctx.strokeStyle=A.alpha(C.tx,.3);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(L.s0,L.sy);ctx.lineTo(L.s1,L.sy);ctx.stroke();
  [50,75,100,125,150].forEach(v=>{ctx.fillStyle=A.alpha(C.tx,v===100?.9:.45);ctx.fillRect(sx(v)-1,L.sy-(v===100?9:6),2,v===100?18:12);ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText(R2(v/100),sx(v),L.sy+10)});
  const bv=Q?Math.round(bb*100):S.bh;if(!Q)P.ball(sx(bv),L.sy,11,C.pk);S.sx=sx;
  lbl(Q?'b = ?':`b = ${R2(b())}`,sx(bv),L.sy-22,{font:'800 11px system-ui',bg:A.alpha('#831843',.95)});
  if(!Q){const px=L.N?W*.1:W*.66,pw=L.N?W*.55:W*.22,py=L.N?L.py:L.py+50,u=pw/1.5,k=S.bh/100;
   ctx.fillStyle=A.alpha(C.tx,.18);ctx.fillRect(px,py,u*Math.min(1,k),16);
   if(k>1){ctx.fillStyle=A.alpha(C.gr,.75);ctx.fillRect(px+u,py,u*(k-1),16)}
   if(k<1){ctx.strokeStyle=C.rd;ctx.lineWidth=1.5;ctx.strokeRect(px+u*k,py,u*(1-k),16);ctx.beginPath();ctx.moveTo(px+u*k,py);ctx.lineTo(px+u,py+16);ctx.stroke()}
   ctx.strokeStyle=C.tx;ctx.lineWidth=1;ctx.strokeRect(px,py,u,16);
   lbl(pctWords(),px,py+30,{align:'left',font:'700 11px system-ui',bg:A.alpha(k>1?'#065f46':k<1?'#991b1b':'#334155',.95)});
   if(!L.N){P.label(expr(),W*.66,L.py-40,{align:'left',font:'800 14px system-ui',bg:A.alpha('#5b21b6',.95)});
    P.label(`t = ${S.t}: ${S.a} × ${R2(b())}${sup(S.t)} = ${R2(val(S.t))}`,W*.66,L.py-8,{align:'left',font:'700 12px system-ui',bg:A.alpha('#334155',.92)})}
   else P.label(`${expr()}   t = ${S.t}: ${R2(val(S.t))}`,W*.1,py-22,{align:'left',font:'800 12px system-ui',bg:A.alpha('#5b21b6',.95)})}
  else P.label(Q.show,L.N?W*.1:W*.66,L.N?L.py:L.py,{align:'left',font:'800 14px system-ui',bg:A.alpha('#5b21b6',.95)});
  A.fx.draw(ctx)}
 // ---- steps ----
 const won=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const start=(o)=>{S.seq++;S.check=()=>{};Object.assign(S,{t:0,T:8,cmp:false},o)};
 const steps=[
  {h:'The start value',p:'The first bar is t = 0. Every bar after it is the one before × b. Drag the purple dot at the top of the first bar, or use the a buttons.',
   predict:{q:'In 500 × 1.04ᵗ, the 500 is…',opts:['the value after 1 year','the value at t = 0','the amount added each year'],ans:1},
   task:'Build 500 × 1.04ᵗ',show:()=>steps_(setA,[200,300,400,500]),
   go:()=>{start({a:100,bh:104,ymax:1000,ed:'a'});upd();S.check=won(0,()=>S.a===500,()=>'At t = 0, 1.04⁰ = 1, so the value is 500 × 1 = 500. That is the start value; each later bar is 4% taller than the one before.')}},
  {h:'A rise as a factor',p:'Start 200. Drag the pink slider to change b. The strip shows the new bar as a percentage of the old one.',
   predict:{q:'Growing by 10% each year means multiplying by…',opts:['0.1','10','1.1'],ans:2},
   task:'Make each bar 10% bigger than the one before',show:()=>steps_(setB,[105,110]),
   go:()=>{start({a:200,bh:100,ymax:500,ed:'b',t:2});upd();S.check=won(1,()=>S.bh===110,()=>'You keep 100% and add 10%: 110% = 1.1. After 2 years 200 × 1.1² = 242, not 240, because the second 10% is of 220.')}},
  {h:'A fall as a factor',p:'Now the value should go down by 15% every year. What is left after each fall?',
   predict:{q:'A 15% decrease each year is a factor of…',opts:['0.15','0.85','1.15'],ans:1},
   task:'Make each bar 15% smaller than the one before',show:()=>steps_(setB,[95,90,85]),
   go:()=>{start({a:200,bh:100,ymax:250,ed:'b',t:1});upd();S.check=won(2,()=>S.bh===85,()=>'Losing 15% leaves 85%, so b = 0.85. Multiplying by 0.15 would keep only the part that was lost. The bars shrink but never reach 0.')}},
  {h:'Multiply, don’t add',p:'200 × 1.1ᵗ against adding 20 a year (dots). Drag along the bars or use t + 1 to move through the years.',
   predict:{q:'With 10% growth a year, 200 first reaches 400 after…',opts:['10 years','8 years','20 years'],ans:1},
   task:'Find the first year the bar passes 400',show:()=>steps_(setT,[2,4,6,7,8]),
   go:()=>{start({a:200,bh:110,ymax:600,ed:'t',T:10,cmp:true});upd();S.check=won(3,()=>S.t===8,()=>'200 × 1.1⁸ ≈ 428.7 is the first bar over 400 (t = 7 gives 389.7). Adding 20 a year takes 10 years. Each 10% is of a bigger amount, so growth speeds up.')}},
  {h:'From a story to a·bᵗ',p:'A phone costs 800 and loses 25% of its value each year. Set a and b.',
   predict:{q:'After 1 year the phone is worth…',opts:['775','600','200'],ans:1},
   task:'Build the phone’s value as a·bᵗ',show:()=>steps_(v=>v>1?setA(v):setB(v*100),[700,800,.9,.8,.75]),
   go:()=>{start({a:500,bh:100,ymax:1000,ed:'ab',t:1});upd();S.check=won(4,()=>S.a===800&&S.bh===75,()=>'800 × 0.75ᵗ: start 800, factor 0.75. After 1 year 600, after 2 years 450. Each year it loses a quarter of what is left, so it loses less money each time.')}},
  {h:'Sandbox',p:'Change a, b and t. What happens when b = 1? Find a factor that roughly doubles the value in 5 steps.',go:()=>{start({a:100,bh:115,ymax:1000,ed:'abt',t:5});upd()}},
  {h:'Challenge',p:'',go:()=>{start({ed:''});ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
 // ---- challenge: every wrong option is a real a·bᵗ slip ----
 const ST=[[350,1.06],[1200,.9],[75,1.5],[40,2],[900,.8]],UP=[6,3,8,4,7],DN=[12,15,20,35,40],
  EV=[[200,1.5,2],[100,1.2,2],[400,.5,3],[1000,.9,2],[50,2,3]],RD=[[80,.95],[150,1.08],[60,.7],[500,1.25]],TY=['start','up','eval','down','read'];let qn=-1,run=0;
 function ask(){say('');qn++;const ty=TY[qn%5],i=Math.floor(qn/5);let q,o,Q={ty};
  if(ty==='start'){const[a,bb]=ST[i%5];Q={ty,a,b:bb,show:`${a} × ${R2(bb)}ᵗ`};q=`What is the value of ${a} × ${R2(bb)}ᵗ at t = 0?`;o=[[a,'ok'],[R2(a*bb),'one'],[R2(bb),'fac'],['0','zero']]}
  else if(ty==='up'){const r=UP[i%5];Q={ty,r,a:100,b:1+r/100,show:`+${r}% each year`};q=`A price rises by ${r}% each year. What is the factor b?`;o=[[R2(1+r/100),'ok'],[R2(r/100),'pct'],[R2(1+r/10),'dec'],[R2(1-r/100),'sign']]}
  else if(ty==='down'){const r=DN[i%5];Q={ty,r,a:100,b:1-r/100,show:`−${r}% each year`};q=`A population falls by ${r}% each year. What is the factor b?`;o=[[R2(1-r/100),'ok'],[R2(r/100),'left'],[R2(1+r/100),'sign'],[String(100-r),'whole']]}
  else if(ty==='eval'){const[a,bb,t]=EV[i%5];Q={ty,a,b:bb,t,show:`${a} × ${R2(bb)}${sup(t)} = ?`};q=`Work out ${a} × ${R2(bb)}${sup(t)}.`;o=[[R2(a*Math.pow(bb,t)),'ok'],[R2(a*bb*t),'times'],[R2(a+a*(bb-1)*t),'add'],[R2(Math.pow(a*bb,t)),'bfirst']]}
  else{const[a,bb]=RD[i%4],p=Math.round(Math.abs(bb-1)*100),up=bb>1,d=up?'rises':'falls';Q={ty,a,b:bb,p,show:`${a} × ${R2(bb)}ᵗ`};q=`What does the ${R2(bb)} in ${a} × ${R2(bb)}ᵗ tell you?`;
   o=[[`It ${d} by ${p}% each step`,'ok'],[`It ${d} by ${Math.round(bb*100)}% each step`,'whole'],[`It ${up?'falls':'rises'} by ${p}% each step`,'flip'],[`It goes ${up?'up':'down'} by ${R2(bb)} each step`,'sub']]}
  S.Q=Q;const seen=new Set();o=o.map(z=>[String(z[0]),z[1]]).filter(z=>!seen.has(z[0])&&seen.add(z[0]));const r=qn%o.length;o=o.slice(r).concat(o.slice(0,r));
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(z=>{const q2=c.el('button',{type:'button',class:'lbtn sm'},row,z[0]);q2.onclick=()=>grade(z[1])});
  S.cq='Challenge: '+q+' The chart shows bars that are each b times the one before.';A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function grade(key){chal.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=S.Q;let m,fix;
  if(Q.ty==='start')fix=`At t = 0, ${R2(Q.b)}⁰ = 1, so the value is ${Q.a}: the start value.`;
  else if(Q.ty==='up')fix=`100% + ${Q.r}% = ${100+Q.r}%, so b = ${R2(1+Q.r/100)}.`;
  else if(Q.ty==='down')fix=`100% − ${Q.r}% = ${100-Q.r}% is left, so b = ${R2(1-Q.r/100)}.`;
  else if(Q.ty==='eval')fix=`${R2(Q.b)}${sup(Q.t)} = ${R2(Math.pow(Q.b,Q.t))}, then × ${Q.a} = ${R2(Q.a*Math.pow(Q.b,Q.t))}. Do the power first.`;
  else fix=`b = ${R2(Q.b)} = ${Math.round(Q.b*100)}% of the step before, so it ${Q.b>1?'rises':'falls'} by ${Q.p}% each step.`;
  if(key==='ok')m=fix;
  else if(key==='one')m=`That is the value after one step, at t = 1. ${fix}`;
  else if(key==='fac')m=`${R2(Q.b)} is the factor, not the start. ${fix}`;
  else if(key==='zero')m=`Any number to the power 0 is 1, not 0. ${fix}`;
  else if(key==='pct')m=`${R2(Q.r/100)} is only the extra part. Multiplying by it would shrink the price. ${fix}`;
  else if(key==='dec')m=`${Q.r}% is ${Q.r} hundredths, ${R2(Q.r/100)}, not ${R2(Q.r/10)}. ${fix}`;
  else if(key==='sign')m=Q.ty==='up'?`That factor is below 1, so it would make the price fall. ${fix}`:`That factor is above 1, so it would make the population grow. ${fix}`;
  else if(key==='left')m=`${R2(Q.r/100)} keeps only the part that was lost. b is the part that is left. ${fix}`;
  else if(key==='whole')m=Q.ty==='down'?`${100-Q.r} is the percentage left; as a factor, divide by 100. ${fix}`:`${Math.round(Q.b*100)}% is how big each step is compared with the one before, not the change. ${fix}`;
  else if(key==='times')m=`That multiplied by ${R2(Q.b)} and then by ${Q.t}. The power means × ${R2(Q.b)}, ${Q.t} times. ${fix}`;
  else if(key==='add')m=`That added the first step’s change every time. Each step multiplies the new amount. ${fix}`;
  else if(key==='bfirst')m=`The power is only on ${R2(Q.b)}, not on ${Q.a} × ${R2(Q.b)}. ${fix}`;
  else if(key==='flip')m=`A factor ${Q.b>1?'above':'below'} 1 makes it ${Q.b>1?'grow':'shrink'}. ${fix}`;
  else m=`The factor multiplies, it is not added or taken away. ${fix}`;
  if(key==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)S.Q=null;sync()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},wrap);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the start value, the factor or the time'},wrap);chal=E('div',{class:'fl-chal'},A.below);
   const fromY=p=>{const L=S.L;return S.ymax*(L.y1-p.y)/(L.y1-L.y0)},fromS=p=>50+100*(p.x-S.L.s0)/(S.L.s1-S.L.s0),
    nearBar=p=>{let k=0,d=1e9;(S.bars||[]).forEach(([X],t)=>{if(Math.abs(p.x-X)<d){d=Math.abs(p.x-X);k=t}});return k};
   A.gest({down:p=>{if(A.step===6||!S.L)return false;const L=S.L;
     if(S.ed.includes('a')&&S.bars&&Math.hypot(p.x-S.bars[0][0],p.y-S.bars[0][1])<28){S.hold='a';return true}
     if(S.ed.includes('b')&&Math.abs(p.y-L.sy)<22&&p.x>L.s0-14&&p.x<L.s1+14){S.hold='b';S.bh=Math.max(50,Math.min(150,Math.round(fromS(p))));A.redraw();return true}
     if(S.ed.includes('t')&&p.y>L.y0&&p.y<L.y1+20&&p.x>L.x0&&p.x<L.x1){S.hold='t';S.t=nearBar(p);A.redraw();return true}return false},
    move:p=>{if(!S.hold)return;if(S.hold==='a')S.a=Math.max(10,Math.min(1000,Math.round(fromY(p)/10)*10));
     else if(S.hold==='b')S.bh=Math.max(50,Math.min(150,Math.round(fromS(p))));else S.t=nearBar(p);A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const h=S.hold;S.hold=null;if(h)upd()}});sync()}});
 A.start()})})();
