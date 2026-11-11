/* Flagship 39 – rewriting expressions to reveal meaning. A price bar model and a dot array. (1) Drag the new-price bar
   longer: a + 0.25a collapses to 1.25a, one multiplier (trap: "a + 0.25"). (2) Drag it shorter: a − 0.15a is 0.85a, what
   is left, not what is taken (trap: "× 0.15"). (3) Two changes in a row: 20% off, then 10% off the new price; drag a
   single-change bar until it matches. It lands on 28% off, 0.9 × 0.8 = 0.72 (trap: "30% off"). (4) Dots for 6n + 9: drag n,
   then tap the form 3(2n + 3) and the dots regroup into 3 equal rows, so the total is a multiple of 3 for every n.
   Challenge: pick the form that answers a question; feedback names the slip (part for whole, pounds for percent, wrong
   decimal, adding percentages, the unchanged form, a partial factor). */
(()=>{const num=x=>String(+x.toFixed(2)),mul=p=>num(1+p/100),dec=p=>num(Math.abs(p)/100),gbp=x=>'£'+(Math.abs(x-Math.round(x))<.001?String(Math.round(x)):x.toFixed(2));
const QS=[
 {q:'A £a coat goes up by 12%. Which expression gives the new price in one step?',p:12,o:[['1.12a','ok'],['0.12a','part'],['a + 12','abs'],['1.2a','dec','0.2']],h:'a + 0.12a = 1.12a.'},
 {q:'A price falls by 30%. Which multiplier gives the sale price?',p:-30,o:[['× 0.7','ok'],['× 0.3','part'],['× 1.3','dir']],h:'a − 0.3a = 0.7a: 70% is left.'},
 {q:'Which form shows that 4n + 8 is always a multiple of 4?',w:'4n + 8',o:[['4(n + 2)','ok'],['2(2n + 4)','half'],['4n + 8','same']],h:'4n + 8 = 4(n + 2): 4 lots of a whole number.'},
 {q:'A price goes up 10%, then the new price goes down 10%. Which gives the final price?',w:'a × 1.1 × 0.9',o:[['0.99a','ok'],['a, back to the start','sum'],['1.01a','mul']],h:'1.1 × 0.9 = 0.99, so the final price is 0.99a, 1% lower.'},
 {q:'Tickets cost £12 each plus a £3 fee on each ticket. Which form shows the cost of one ticket?',w:'12n + 3n',o:[['15n','ok'],['12n + 3n','same'],['12n + 3','once','charges the £3 fee once, not on every ticket']],h:'12n + 3n = 15n: £15 for each ticket.'},
 {q:'A sale takes 25% off. Which form shows the part of the price you still pay?',p:-25,o:[['0.75a','ok'],['a − 25','abs'],['a − 0.25a','same']],h:'a − 0.25a = 0.75a: you pay 75%.'},
 {q:'Prices rise by 5%. What single number do you multiply by?',p:5,o:[['1.05','ok'],['1.5','dec','0.5'],['0.05','part']],h:'5% is 0.05, so a + 0.05a = 1.05a.'},
 {q:'Which form shows the perimeter of an l by w rectangle is twice l + w?',w:'2l + 2w',o:[['2(l + w)','ok'],['2l + 2w','same'],['l + w + 2','once','adds 2 instead of doubling both lengths']],h:'2l + 2w = 2(l + w).'}];
VIS.reg('flagreveal',c=>{let A,pad,chal,read;
 const S={p:0,s1:-30,n:3,u:0,form:null,drag:null,shake:0,goal:()=>{},run:0,cq:null};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const miss=t=>{A.sound.miss();S.shake=1;A.tween(S,{shake:0},450,'out');if(t)say(t)};
 const B=80,LIM=[-60,60];
 const pctTxt=p=>p>0?`a + ${dec(p)}a = ${mul(p)}a`:p<0?`a − ${dec(p)}a = ${mul(p)}a`:'a, no change';
 function setP(v){S.p=Math.max(LIM[0],Math.min(LIM[1],Math.round(v)));const p=S.p;
  say(p===0?'No change yet: the new bar is the same as a.':`${p>0?'Up':'Down'} ${Math.abs(p)}%: ${pctTxt(p)}. ${gbp(B)} becomes ${gbp(B*(1+p/100))}.`);sync();S.goal()}
 function setS(v){S.s1=Math.max(-50,Math.min(0,Math.round(v)));const m=1+S.s1/100;
  say(S.s1===-28?'One change of 28% off, × 0.72, lands exactly on the two-step price, £57.60.':`One change of ${-S.s1}% off gives ${gbp(B*m)}. The two-step price is £57.60: ${B*m>57.6?'too high':'too low'}.`);sync();S.goal()}
 function setN(v){S.n=Math.max(1,Math.min(6,Math.round(v)));const n=S.n;
  say(`n = ${n}: 6n + 9 = ${6*n+9}.${S.form==='f'?` That is 3 rows of ${2*n+3}, so ${6*n+9} = 3 × ${2*n+3}.`:''}`);sync();S.goal()}
 function pickForm(k){S.form=k;if(k==='f'){A.sound.pop();A.tween(S,{u:1},800,'io');say(`3(2n + 3): the dots fall into 3 equal rows of 2n + 3. For n = ${S.n}: 3 × ${2*S.n+3} = ${6*S.n+9}, a multiple of 3.`)}
  else{A.tween(S,{u:0},500,'io');miss(k==='s'?'9 + 6n only swaps the order. No factor of 3 is on show.':'6n + 9 is the start form. It hides the pattern.')}sync();S.goal()}
 function play(list,ms=360){const tok=++S.run;let j=0;const go=()=>{if(tok!==S.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){const s=A.step,p=S.p;if(s===5)return S.cq||'Challenge.';
  if(s===2)return `Bars: a is £80. 20% off gives 0.8a, £64. Then 10% off that gives 0.72a, £57.60. A single-change bar at ${-S.s1}% off gives ${gbp(B*(1+S.s1/100))}${S.s1===-28?', a match':''}.`;
  if(s===3)return `Dots for 6n + 9 with n = ${S.n}: ${6*S.n+9} dots, ${S.form==='f'?`regrouped into 3 rows of ${2*S.n+3}`:`in ${S.n} blocks of 6 and one block of 9`}.`;
  return `Bar a is £80. New bar ${p===0?'is the same':`${p>0?'is longer by':'is shorter by'} ${Math.abs(p)}%`}: ${pctTxt(p)}, ${gbp(B*(1+p/100))}.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.onclick=()=>{f();A.sound.tick()}};
  if(s===5)return A.redraw();
  if(s<2||s===4){b('− 5%','Make the new bar 5 percent shorter',()=>setP(S.p-5));b('+ 5%','Make the new bar 5 percent longer',()=>setP(S.p+5))}
  if(s===2){b('− 1%','One percent more off in the single change',()=>setS(S.s1-1));b('+ 1%','One percent less off in the single change',()=>setS(S.s1+1))}
  if(s===3){b('n − 1','Make n one smaller',()=>setN(S.n-1));b('n + 1','Make n one bigger',()=>setN(S.n+1));
   [['6n + 9','o'],['9 + 6n','s'],['3(2n + 3)','f']].forEach(([t,k])=>b(t,'Rewrite as '+t,()=>pickForm(k)))}
  A.redraw()}
 // ---- drawing ----
 const geo=()=>{const x0=A.W*.07,u=A.W*.86/1.6;return{x0,u}};
 function bar(y,h,pct,col,lab){const{ctx,paint:P}=A,{x0,u}=geo(),w=u*pct/100;ctx.fillStyle=col;P.rrect(x0,y,Math.max(2,w),h,6);ctx.fill();
  if(lab)P.label(lab,x0+4,y-12,{align:'left',font:'700 12px system-ui',bg:A.alpha('#1e293b',.9)});return x0+w}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,s=A.step,{x0,u}=geo(),jit=S.shake*Math.sin(S.shake*30)*4;
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.am,.06)],[1,A.mix(C.pn,C.cy,.07)]]);ctx.fillRect(0,0,W,H);ctx.save();ctx.translate(jit,0);
  const bh=Math.max(20,H*.1);
  if(s<2||s===4||(s===5&&S.cQ&&S.cQ.p!=null)){const p=s===5?S.cQ.p:S.p,y1=H*.2,y2=H*.48;
   ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=1;for(let k=0;k<=160;k+=10){const x=x0+u*k/100;ctx.beginPath();ctx.moveTo(x,y1-4);ctx.lineTo(x,y2+bh+(k%50?4:10));ctx.stroke()}
   ctx.fillStyle=A.col.mu;ctx.font='600 11px system-ui';ctx.textAlign='center';[0,50,100,150].forEach(k=>ctx.fillText(k+'%',x0+u*k/100,y2+bh+22));
   bar(y1,bh,100,C.ac,'a = £80');const keep=Math.min(100,100+p),end=x0+u*(100+p)/100;
   ctx.fillStyle=C.ac;P.rrect(x0,y2,u*keep/100,bh,6);ctx.fill();
   if(p>0){ctx.fillStyle=C.am;P.rrect(x0+u,y2,u*p/100,bh,6);ctx.fill();P.label(s===5?`+ ${p}%`:`+ ${dec(p)}a`,x0+u+u*p/200,y2+bh+42,{font:'800 12px system-ui',bg:A.alpha('#92400e',.95)})}
   if(p<0){ctx.setLineDash([5,4]);ctx.strokeStyle=C.rd;ctx.lineWidth=2;P.rrect(end,y2,-u*p/100,bh,6);ctx.stroke();ctx.setLineDash([]);P.label(s===5?`− ${-p}%`:`− ${dec(p)}a`,end-u*p/200,y2+bh+42,{font:'800 12px system-ui',bg:A.alpha('#991b1b',.95)})}
   P.label(s===5?'new price = ? × a':`new = ${p?pctTxt(p):'a'}`,x0+4,y2-12,{align:'left',font:'700 12px system-ui',bg:A.alpha('#1e293b',.9)});
   if(s!==5){P.ball(end,y2+bh/2,11,C.pk);if(p)P.label(`${gbp(B)} × ${mul(p)} = ${gbp(B*(1+p/100))}`,W/2,H*.86,{font:'800 15px system-ui',bg:A.alpha('#065f46',.95)})}S.end=[end,y2,bh]}
  if(s===2){const ys=[.12,.32,.52,.74].map(k=>H*k),h=bh*.8;bar(ys[0],h,100,C.ac,'a = £80');bar(ys[1],h,80,C.ac,'20% off: 0.8a = £64');
   bar(ys[2],h,72,C.ac,'then 10% off: 0.9 × 0.8a = 0.72a');ctx.setLineDash([5,4]);ctx.strokeStyle=C.rd;ctx.lineWidth=2;P.rrect(x0+u*.72,ys[2],u*.08,h,5);ctx.stroke();ctx.setLineDash([]);
   const hit=S.s1===-28,e=bar(ys[3],h,100+S.s1,hit?C.gr:C.vi,`one change: ${-S.s1}% off = ${mul(S.s1)}a = ${gbp(B*(1+S.s1/100))}`);
   ctx.strokeStyle=A.alpha(C.tx,.6);ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(x0+u*.72,ys[2]);ctx.lineTo(x0+u*.72,ys[3]+h+6);ctx.stroke();ctx.setLineDash([]);
   P.ball(e,ys[3]+h/2,11,hit?C.gr:C.pk);S.end=[e,ys[3],h]}
  if(s===3){const n=S.n,per=A.narrow?3:7,lines=Math.ceil((n+1)/per),bc=Math.min(n+1,per)*4-1,ac=2*n+3,sp=Math.min(26,W*.88/Math.max(bc,ac),H*.48/(lines*3.4)),r=sp*.36,t=A.ease.io(S.u),oy=H*.1;
   const bx0=(W-sp*bc)/2+sp/2,ax0=(W-sp*ac)/2+sp/2,ay0=oy+(lines*3.4-3)*sp/2;
   const put=(j,k,ax,ay,col)=>{const bx=bx0+((j%per)*4+k%3)*sp,by=oy+(Math.floor(j/per)*3.4+Math.floor(k/3))*sp;P.ball(bx+(ax0+ax*sp-bx)*t,by+(ay0+ay*sp-by)*t,r,col)};
   for(let i=0;i<n;i++)for(let k=0;k<6;k++)put(i,k,2*i+Math.floor(k/3),k%3,C.ac);
   for(let k=0;k<9;k++)put(n,k,2*n+Math.floor(k/3),k%3,C.am);
   if(S.u>.95)P.label(`3 rows, each 2n + 3 = ${2*n+3}`,W/2,ay0+3*sp+8,{font:'700 12px system-ui',bg:A.alpha('#065f46',.92)});
   P.label(S.form==='f'?`3(2n + 3) = 3 × ${2*n+3} = ${6*n+9}`:`6n + 9 = ${6*n} + 9 = ${6*n+9}`,W/2,H*.68,{font:'800 14px system-ui',bg:A.alpha(S.form==='f'?'#065f46':'#1e293b',.95)});
   const tx0=W*.14,tx1=W*.86,ty=H*.84,hx=tx0+(tx1-tx0)*(n-1)/5;ctx.strokeStyle=A.alpha(C.tx,.4);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(tx0,ty);ctx.lineTo(tx1,ty);ctx.stroke();
   ctx.fillStyle=C.tx;ctx.font='600 12px system-ui';ctx.textAlign='center';for(let k=1;k<=6;k++)ctx.fillText(k,tx0+(tx1-tx0)*(k-1)/5,ty+22);P.ball(hx,ty,11,C.pk);P.label('n = '+n,hx,ty-22,{font:'700 12px system-ui'});S.trk=[tx0,tx1,ty]}
  if(s===5&&S.cQ&&S.cQ.p==null){ctx.fillStyle=C.tx;ctx.font='800 22px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(S.cQ.w,W/2,H*.4);ctx.font='600 14px system-ui';ctx.fillStyle=C.mu;ctx.fillText('Which form shows the answer?',W/2,H*.58)}
  ctx.restore();A.fx.draw(ctx)}
 // ---- steps ----
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const fresh=()=>{S.run++;S.form=null;S.u=0;S.goal=()=>{}};
 const slide=(k,to,set)=>{const t={v:S[k]};A.tween(t,{v:to},700,'io',()=>set(to))};
 const steps=[
  {h:'An increase as one multiplier',p:'The top bar is the price a = £80. Drag the pink handle to make the new price longer. Watch the two ways of writing it.',
   predict:{q:'a + 0.25a is the same as…',opts:['a + 0.25','1.25a','0.25a'],ans:1},
   task:'Drag the new price to a 25% increase',show:()=>slide('p',25,setP),
   go:()=>{fresh();setP(0);S.goal=fin(0,()=>S.p===25,()=>'a + 0.25a = 1.25a. The 1 is the whole price you keep; 0.25 is the part added. One multiplier, × 1.25, does both: £100.')}},
  {h:'A decrease as one multiplier',p:'Now drag the handle the other way. The dashed red part is taken off. Which number tells you what is left?',
   predict:{q:'Taking 15% off is the same as multiplying by…',opts:['0.15','0.85','1.15'],ans:1},
   task:'Drag the new price to a 15% decrease',show:()=>slide('p',-15,setP),
   go:()=>{fresh();setP(0);S.goal=fin(1,()=>S.p===-15,()=>'a − 0.15a = 0.85a: 85% is left, £68. × 0.15 would give only the part taken off, £12.')}},
  {h:'Two changes in a row',p:'£80 has 20% off, then 10% off the new price. Drag the purple bar to find one single change that ends at the same price.',
   predict:{q:'20% off, then 10% off, is the same as…',opts:['30% off','28% off','10% off'],ans:1},
   task:'Drag the single-change bar until it matches the two-step price',show:()=>slide('s1',-28,setS),
   go:()=>{fresh();setS(-30);S.goal=fin(2,()=>S.s1===-28,()=>'0.8a, then 0.9 × 0.8a = 0.72a: 28% off. The second 10% comes off £64, not £80, so it is only £6.40.')}},
  {h:'Factor to see a pattern',p:'6n + 9 dots, in blocks of 6 and a block of 9. Drag n. Then try the three forms below and see which one shows a pattern.',
   predict:{q:'Is 6n + 9 a multiple of 3 for every whole number n?',opts:['only when n is odd','yes, for every n','only when n is a multiple of 3'],ans:1},
   task:'Rewrite 6n + 9 in the form that shows it is a multiple of 3',show:()=>play([()=>setN(4),()=>pickForm('f')]),
   go:()=>{fresh();setN(3);S.goal=fin(3,()=>S.form==='f',()=>'6n + 9 = 3(2n + 3). Each row is 2n + 3 dots, and there are 3 rows, so the total is a multiple of 3 for every n.')}},
  {h:'Sandbox',p:'Make a 40% increase, then a 40% decrease. Which multipliers do you get? Try 50% off: what is left?',go:()=>{fresh();setP(10)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge ----
 let qi=-1,streak=0;
 function ask(){say('');qi=(qi+1)%QS.length;const Q=QS[qi];S.cQ=Q;let o=Q.o.map(x=>({l:x[0],k:x[1],z:x[2]}));const k=qi%o.length;o=o.slice(k).concat(o.slice(0,k));
  chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(x=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,x.l);b.onclick=()=>judge(Q,x)});
  S.cq='Challenge: '+Q.q+(Q.p!=null?` The bars show a and the new price, ${Q.p>0?'longer':'shorter'} by ${Math.abs(Q.p)}%.`:'');A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function judge(Q,x){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),pc=Math.abs(Q.p||0);let m;
  if(x.k==='ok')m=Q.h;
  else if(x.k==='part')m=`${x.l} is only the change, not the new amount. Keep the whole price: ${Q.h}`;
  else if(x.k==='abs')m=`${x.l} changes the price by a fixed number of pounds, not by ${pc}% of it. ${Q.h}`;
  else if(x.k==='dec')m=`${pc}% is ${dec(pc)} as a decimal, not ${x.z}. ${Q.h}`;
  else if(x.k==='dir')m=`A multiplier above 1 makes the amount grow. A decrease needs one below 1. ${Q.h}`;
  else if(x.k==='sum')m=`The second 10% is taken from the bigger price, so more comes off than went on. ${Q.h}`;
  else if(x.k==='mul')m=`Multiply the multipliers: the answer is below 1, not above. ${Q.h}`;
  else if(x.k==='half')m=`2 is a common factor, but the question asks about 4. Take out the whole factor. ${Q.h}`;
  else if(x.k==='once')m=`${x.l} ${x.z}. ${Q.h}`;
  else m=`That is the starting form. It is true, but it hides the answer. ${Q.h}`;
  if(x.k==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{chal.hidden=A.step!==5;if(A.step!==5)S.cQ=null;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the bars, n and the form'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const s=A.step;if(s===5)return false;
     if(s===3&&S.trk&&Math.abs(p.y-S.trk[2])<26){S.drag='n';return true}
     if(s!==3&&S.end&&p.y>S.end[1]-24&&p.y<S.end[1]+S.end[2]+24){S.drag='b';return true}return false},
    move:p=>{if(!S.drag)return;const{x0,u}=geo();
     if(S.drag==='n'){const[a,b]=S.trk;S.n=Math.max(1,Math.min(6,Math.round(1+5*(p.x-a)/(b-a))))}
     else if(A.step===2)S.s1=Math.max(-50,Math.min(0,2*Math.round(((p.x-x0)/u*100-100)/2)));
     else S.p=Math.max(LIM[0],Math.min(LIM[1],5*Math.round(((p.x-x0)/u*100-100)/5)));A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const d=S.drag;S.drag=null;if(!d)return;if(d==='n')setN(S.n);else if(A.step===2)setS(S.s1);else setP(S.p)}});sync()}});
 A.start()})})();
