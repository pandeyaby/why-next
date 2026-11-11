/* Flagship 42 – simplifying surds. √n is the side of a square of area n. Slice that square into a k × k grid: if every
   cell has a whole-number area m = n/k², each cell has side √m and the big side is k lots of √m, so √n = k√m.
   (1) √12: a 2 × 2 grid of 3s gives 2√3 (trap: 6√2). (2) √50 = 5√2 (trap: 25√2, the square factor not rooted).
   (3) √72: 3 × 3 cells of 8 work but 8 still splits; the largest grid, 6 × 6 cells of 2, gives 6√2 (trap: stop at 3√8).
   (4) Back into one surd: 3√5 is a 3 × 3 grid of 5s, area 45 (trap: √15). (5) Rationalise: a √2-wide strip of area 1
   is exactly half the √2 square, so 1/√2 = √2/2 (trap: 1/2). Challenge: simplify, multiply, add like surds, rationalise. */
(()=>{const sd=(k,m)=>m===1?String(k):(k===1?'':k)+'√'+m,R2=x=>(Math.round(x*100)/100).toString(),SQ2=Math.SQRT2,
 sqf=m=>{let b=1;for(let d=2;d*d<=m;d++)if(m%(d*d)===0)b=d;return b};
VIS.reg('flagsurd',c=>{let A,pad,chal,read;
 const S={n:12,k:1,m:3,j:4,hold:null,jolt:0,check:()=>{},seq:0,Q:null,cq:''};
 const say=x=>{c.say(x);if(read)read.textContent=x};
 const mode=()=>A.step===3?'build':A.step===4?'cut':'split';
 const whole=()=>S.n%(S.k*S.k)===0;
 function words(){if(mode()==='cut'){const h=S.j*SQ2/20;return `Strip ${R2(SQ2)} wide and ${R2(h)} tall (${S.j}/20 of the √2 square). Area = √2 × ${R2(h)} = ${R2(S.j/10)}.`}
  const n=S.n,k=S.k;if(k===1)return `One cell of area ${n}: side √${n}.`;
  if(!whole())return `${k} × ${k} = ${k*k} cells, but ${n} ÷ ${k*k} = ${R2(n/(k*k))} is not whole, so this grid does not work.`;
  const m=n/(k*k),b=sqf(m);return `${k*k} cells of area ${m}, each side √${m}. Side = ${k} × √${m}, so √${n} = ${sd(k,m)}.`+(b>1?` But ${m} still holds the square ${b*b}: keep going.`:'')}
 function upd(){say(words());sync();S.check()}
 const setK=v=>{S.k=Math.max(1,Math.min(8,Math.round(v)));upd()};
 const setN=v=>{S.n=Math.max(2,Math.min(200,Math.round(v)));upd()};
 const setM=v=>{S.m=Math.max(1,Math.min(10,Math.round(v)));S.n=S.k*S.k*S.m;upd()};
 const setJ=v=>{S.j=Math.max(1,Math.min(20,Math.round(v)));upd()};
 function steps_(f,list){const z=++S.seq;let i=0;const go=()=>{if(z!==S.seq||i>=list.length)return;f(list[i++]);A.tween({u:0},{u:1},340,'io',go)};go()}
 function describe(){if(A.step===6)return S.cq||'Challenge.';
  if(mode()==='cut')return `A square of area 2, side √2, with a shaded strip across its full width: ${words()}`;
  return `A square of area ${S.n}, side √${S.n}, cut into a ${S.k} by ${S.k} grid. ${words()}`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step;
  const B=(t,lab,f)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lab},pad,t);b.onclick=()=>{f();A.sound.tick()}};
  if(s===6)return A.redraw();
  if(s===3){B('cell − 1','Make each cell area 1 smaller',()=>setM(S.m-1));B('cell + 1','Make each cell area 1 bigger',()=>setM(S.m+1))}
  else if(s===4){B('− 5','Make the strip 5 twentieths shorter',()=>setJ(S.j-5));B('− 1','Make the strip 1 twentieth shorter',()=>setJ(S.j-1));B('+ 1','Make the strip 1 twentieth taller',()=>setJ(S.j+1));B('+ 5','Make the strip 5 twentieths taller',()=>setJ(S.j+5))}
  else{B('grid − 1','Use one fewer cell along each side',()=>setK(S.k-1));B('grid + 1','Use one more cell along each side',()=>setK(S.k+1));
   if(s===5){B('n − 1','Make the number under the root 1 smaller',()=>setN(S.n-1));B('n + 1','Make the number under the root 1 bigger',()=>setN(S.n+1))}}
  A.redraw()}
 // ---- drawing ----
 const box=()=>{const N=A.narrow,Z=N?Math.min(A.W*.6,A.H*.52):Math.min(A.W*.42,A.H*.68);return{N,Z,x:N?(A.W-Z)/2:A.W*.07,y:A.H*(N?.07:.07)}};
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,s=A.step,b=box(),Q=s===6&&S.Q,md=Q?'split':mode();b.x+=S.jolt*Math.sin(S.jolt*30)*4;S.b=b;
  ctx.fillStyle=P.lin(0,H,W,0,[[0,A.mix(C.pn,C.am,.07)],[1,A.mix(C.pn,C.gr,.06)]]);ctx.fillRect(0,0,W,H);
  const{x,y,Z}=b,lbl=(t,X,Y,o={})=>P.label(t,X,Y,{font:'700 12px system-ui',bg:A.alpha('#1e293b',.92),...o});
  if(md==='cut'){const h=Z*S.j/20;ctx.fillStyle=A.alpha(C.tx,.07);ctx.fillRect(x,y,Z,Z);ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2;ctx.strokeRect(x,y,Z,Z);
   ctx.fillStyle=A.alpha(S.j===10?C.gr:C.cy,.55);ctx.fillRect(x,y+Z-h,Z,h);ctx.strokeRect(x,y+Z-h,Z,h);
   ctx.setLineDash([4,4]);ctx.strokeStyle=C.mu;ctx.beginPath();ctx.moveTo(x,y+Z/2);ctx.lineTo(x+Z,y+Z/2);ctx.stroke();ctx.setLineDash([]);
   lbl('√2',x+Z/2,y+Z+14);lbl('area 2',x+Z/2,y+16);lbl(`h = ${R2(S.j*SQ2/20)}`,x+Z+(b.N?-28:34),y+Z-h/2);lbl(`area ${R2(S.j/10)}`,x+Z/2,y+Z-h/2,{bg:A.alpha('#065f46',.95)});
   lbl(S.j===10?'h = 1/√2 = √2/2 ≈ 0.71':`h = ${S.j}/20 of √2`,x+Z/2,y+Z+44,{font:'800 12px system-ui',bg:A.alpha(S.j===10?'#065f46':'#334155',.95)});P.ball(x+Z/2,y+Z-h,10,C.pk);S.hand=[x+Z/2,y+Z-h]}
  else{const n=Q?Q.n:S.n,k=Q?1:S.k,ok=n%(k*k)===0,m=n/(k*k),cs=Z/k,rough=ok&&sqf(m)>1;
   for(let i=0;i<k;i++)for(let j=0;j<k;j++){ctx.fillStyle=!ok?A.alpha(C.rd,.16):A.alpha((i+j)%2?(rough?C.am:C.vi):(rough?C.or:C.ac),.42);ctx.fillRect(x+i*cs,y+j*cs,cs,cs)}
   ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=1;if(!ok)ctx.setLineDash([4,4]);
   for(let i=1;i<k;i++){ctx.beginPath();ctx.moveTo(x+i*cs,y);ctx.lineTo(x+i*cs,y+Z);ctx.moveTo(x,y+i*cs);ctx.lineTo(x+Z,y+i*cs);ctx.stroke()}ctx.setLineDash([]);
   ctx.lineWidth=2.5;ctx.strokeStyle=C.tx;ctx.strokeRect(x,y,Z,Z);
   if(ok&&cs>30&&!Q)for(let i=0;i<k;i++)for(let j=0;j<k;j++){ctx.fillStyle=C.tx;ctx.font=`700 ${cs>60?14:11}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(m),x+(i+.5)*cs,y+(j+.5)*cs)}
   if(ok&&k>1&&!Q){ctx.strokeStyle=C.pk;ctx.lineWidth=4;for(let i=0;i<k;i++){ctx.beginPath();ctx.moveTo(x+i*cs+3,y+Z+6);ctx.lineTo(x+(i+1)*cs-3,y+Z+6);ctx.stroke()}}
   lbl(Q?`√${n} = ?`:`side √${n}`,x+Z/2,y+Z+(Q?16:20),{bg:A.alpha('#831843',.92)});
   // grid track: drag the dot to choose how many cells per side
   if(!Q){const ty=y+Z+44,t0=x+8,t1=x+Z-8,K=s===3?10:8,v=s===3?S.m:S.k,tx=t0+(t1-t0)*(v-1)/(K-1);
    ctx.strokeStyle=A.alpha(C.tx,.3);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(t0,ty);ctx.lineTo(t1,ty);ctx.stroke();
    for(let i=1;i<=K;i++){const q=t0+(t1-t0)*(i-1)/(K-1);ctx.fillStyle=A.alpha(C.tx,.5);ctx.fillRect(q-1,ty-6,2,12)}
    P.ball(tx,ty,11,C.pk);S.hand=[tx,ty];S.track=[t0,t1,ty,K];lbl(s===3?`cell ${S.m}`:`${S.k} × ${S.k}`,tx,ty+22,{font:'800 11px system-ui'})}
   const px=b.N?W*.06:W*.56,py=b.N?H*.84:H*.2;
   if(!Q){const head=k===1?`√${n}`:ok?`√${n} = √(${k*k} × ${m}) = ${sd(k,m)}`:`${n} ÷ ${k*k} is not whole`;
    P.label(head,px,py,{align:'left',font:'800 13px system-ui',bg:A.alpha(ok?'#5b21b6':'#991b1b',.95)});
    if(!b.N)P.label(rough?`${m} = ${sqf(m)**2} × ${m/sqf(m)**2}: split more`:'square numbers: 4, 9, 16, 25, 36, 49',px,py+28,{align:'left',font:'600 12px system-ui',bg:A.alpha('#334155',.92)})}}
  A.fx.draw(ctx)}
 // ---- steps ----
 const won=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const start=(n,k)=>{S.seq++;S.check=()=>{};S.n=n;S.k=k};
 const steps=[
  {h:'A root is a side length',p:'√12 is the side of a square of area 12. Drag the dot, or use grid + 1, to slice the square into equal smaller squares.',
   predict:{q:'√12 can also be written as…',opts:['6√2','2√3','3√4'],ans:1},
   task:'Find a grid where every cell has a whole-number area',show:()=>steps_(setK,[2]),
   go:()=>{start(12,1);setK(1);S.check=won(0,()=>S.k===2,()=>'12 = 4 × 3: four cells of 3. Each cell has side √3 and two of them make the side, so √12 = 2√3.')}},
  {h:'The square factor comes out',p:'Now the square has area 50. Try grids until one works.',
   predict:{q:'√50 simplifies to…',opts:['25√2','10√5','5√2'],ans:2},
   task:'Find the grid that works for 50',show:()=>steps_(setK,[2,3,4,5]),
   go:()=>{start(50,1);setK(1);S.check=won(1,()=>S.k===5,()=>'50 = 25 × 2: a 5 × 5 grid of 2s. The 25 comes out as √25 = 5, so √50 = 5√2.')}},
  {h:'Use the biggest square',p:'Area 72. More than one grid works here. Look at what is left in each cell.',
   predict:{q:'√72 in simplest form is…',opts:['3√8','6√2','36√2'],ans:1},
   task:'Find the biggest grid that works for 72',show:()=>steps_(setK,[2,3,4,5,6]),
   go:()=>{start(72,1);setK(1);S.check=won(2,()=>S.k===6,()=>'72 = 36 × 2: a 6 × 6 grid of 2s, so √72 = 6√2. The 3 × 3 grid left 8 in each cell, and 8 = 4 × 2 still splits.')}},
  {h:'Back into one surd',p:'Now the grid stays 3 × 3 and you choose each cell’s area. The big square’s area is 9 × cell.',
   predict:{q:'3√5 written as one surd is…',opts:['√15','√45','√35'],ans:1},
   task:'Build a square with side 3√5',show:()=>steps_(setM,[3,4,5]),
   go:()=>{start(18,3);S.m=2;setM(2);S.check=won(3,()=>S.m===5,()=>'Nine cells of 5 make 45, so 3√5 = √45. The 3 goes back in as 3² = 9, not as 3.')}},
  {h:'Rationalising 1/√2',p:'The square has area 2 and side √2. Drag the top of the strip. Find the strip with area exactly 1.',
   predict:{q:'1/√2 is equal to…',opts:['√2/2, about 0.71','1/2','√2, about 1.41'],ans:0},
   task:'Make the strip’s area exactly 1',show:()=>steps_(setJ,[6,8,10]),
   go:()=>{start(2,1);S.j=4;setJ(4);S.check=won(4,()=>S.j===10,()=>'Area 1 with width √2 means height 1/√2. It is half the square, so the height is √2/2 ≈ 0.71. So 1/√2 = √2/2: multiply top and bottom by √2.')}},
  {h:'Sandbox',p:'Change n and the grid. Which numbers up to 50 have no grid except 1 × 1? Can you find the biggest grid for 98?',go:()=>{start(98,1);setK(1)}},
  {h:'Challenge',p:'',go:()=>{start(S.n,1);ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
 // ---- challenge: options are real surd slips ----
 const SP=[[2,3],[5,2],[6,2],[4,3],[3,5],[2,7],[3,6],[4,5],[7,2],[2,10],[5,3],[6,3]],MP=[[2,8],[3,12],[5,20],[2,18],[3,27],[6,24],[2,32],[5,45]],
  AP=[[2,3,3],[3,4,2],[1,2,7],[2,5,2],[1,3,3],[3,5,2],[1,4,2]],RP=[[2,3],[2,5],[2,2],[2,7],[4,3],[3,5],[4,2],[3,2]],TY=['simp','add','mul','rat'];let qn=-1,run=0;
 function ask(){say('');qn++;const ty=TY[qn%4];let q,o,why={},nn=2;
  if(ty==='simp'){const[k,m]=SP[(qn*5+1)%SP.length],n=k*k*m;nn=n;q=`Simplify √${n}.`;o=[[sd(k,m),'ok'],[sd(k*k,m),'nosq'],[sd(m,k),'swap']];
   const d=[...Array(k).keys()].find(d=>d>1&&k%d===0);if(d)o.push([sd(k/d,m*d*d),'part']);else if(n%2===0)o.push([sd(n/2,2),'half']);why={k,m,n,d}}
  else if(ty==='mul'){const[a,b]=MP[(qn*3)%MP.length],c2=Math.round(Math.sqrt(a*b));q=`Work out √${a} × √${b}.`;o=[[String(c2),'ok'],[String(a*b),'noroot'],['√'+(a+b),'plus'],[String(a*b/2),'halve']];why={a,b,c2};nn=a*b}
  else if(ty==='add'){const[k1,k2,m]=AP[(qn*3+2)%AP.length],a=k1*k1*m,b=k2*k2*m;q=`Simplify √${a} + √${b}.`;o=[[sd(k1+k2,m),'ok'],['√'+(a+b),'under'],[sd(k1+k2,2*m),'both'],[sd(k1*k2,m),'times']];why={k1,k2,m,a,b};nn=a}
  else{const[t,m]=RP[(qn*7)%RP.length],a=t*m;q=`Rationalise ${a}/√${m}.`;o=[[sd(t,m),'ok'],[sd(a,m),'nodiv'],[String(t),'drop'],[`√${m}/${a}`,'flip']];why={t,m,a};nn=m}
  S.Q={ty,n:nn,...why};const seen=new Set();o=o.filter(z=>!seen.has(z[0])&&seen.add(z[0]));const r=qn%o.length;o=o.slice(r).concat(o.slice(0,r));
  chal.innerHTML=`<p><b>${q}</b> Give the simplest form.</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(z=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,z[0]);b.onclick=()=>grade(z[1])});
  S.cq='Challenge: '+q+` The picture shows a square of area ${nn}.`;A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function grade(key){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=S.Q;let m,fix;
  if(Q.ty==='simp')fix=`${Q.n} = ${Q.k*Q.k} × ${Q.m} and √${Q.k*Q.k} = ${Q.k}, so √${Q.n} = ${sd(Q.k,Q.m)}.`;
  else if(Q.ty==='mul')fix=`√${Q.a} × √${Q.b} = √${Q.a*Q.b} = ${Q.c2}, because ${Q.c2}² = ${Q.a*Q.b}.`;
  else if(Q.ty==='add')fix=`√${Q.a} = ${sd(Q.k1,Q.m)} and √${Q.b} = ${sd(Q.k2,Q.m)}. Like surds add like x's: ${sd(Q.k1+Q.k2,Q.m)}.`;
  else fix=`Multiply top and bottom by √${Q.m}: ${Q.a}√${Q.m} ÷ ${Q.m} = ${sd(Q.t,Q.m)}.`;
  if(key==='ok')m=fix;
  else if(key==='nosq')m=`The square factor came out without its root: √${Q.k*Q.k} is ${Q.k}, not ${Q.k*Q.k}. ${fix}`;
  else if(key==='swap')m=`The numbers swapped places. The one outside is the root of the square factor. ${fix}`;
  else if(key==='part')m=`True, but not finished: the number left inside still has a square factor. Take out the biggest square, ${Q.k*Q.k}. ${fix}`;
  else if(key==='half')m=`${Q.n} = ${Q.n/2} × 2, but ${Q.n/2} is not a square number, so it cannot come out. ${fix}`;
  else if(key==='noroot')m=`The product is right but it is still under the root. ${fix}`;
  else if(key==='plus')m=`Roots multiply inside: √a × √b = √(a × b), not √(a + b). ${fix}`;
  else if(key==='halve')m=`Halving is not square-rooting. ${fix}`;
  else if(key==='under')m=`√a + √b is not √(a + b): √9 + √16 = 7 but √25 = 5. Simplify each, then add. ${fix}`;
  else if(key==='both')m=`Only the numbers in front add. √${Q.m} stays √${Q.m}, as x + x = 2x, not 2x². ${fix}`;
  else if(key==='times')m=`That multiplied the numbers in front. Adding like surds adds them. ${fix}`;
  else if(key==='nodiv')m=`The bottom became √${Q.m} × √${Q.m} = ${Q.m}; it still needs dividing. ${fix}`;
  else if(key==='drop')m=`The root cannot just vanish: ${Q.a}/√${Q.m} is not ${Q.a}/${Q.m}. ${fix}`;
  else m=`That turned the fraction upside down. ${fix}`;
  if(key==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();S.jolt=1;A.tween(S,{jolt:0},450,'out');fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)S.Q=null;sync()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},wrap);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the grid, the cell area or the strip'},wrap);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{if(A.step===6||!S.hand)return false;if(Math.hypot(p.x-S.hand[0],p.y-S.hand[1])<28){S.hold=mode()==='cut'?'j':'t';return true}
     if(S.track&&mode()!=='cut'&&Math.abs(p.y-S.track[2])<20&&p.x>S.track[0]-14&&p.x<S.track[1]+14){S.hold='t';return true}return false},
    move:p=>{if(!S.hold)return;const b=S.b;if(S.hold==='j')S.j=Math.max(1,Math.min(20,Math.round((b.y+b.Z-p.y)/b.Z*20)));
     else{const[t0,t1,,K]=S.track,v=Math.max(1,Math.min(K,Math.round(1+(p.x-t0)/(t1-t0)*(K-1))));if(A.step===3){S.m=v;S.n=S.k*S.k*v}else S.k=v}
     A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const h=S.hold;S.hold=null;if(h)upd()}});sync()}});
 A.start()})})();
