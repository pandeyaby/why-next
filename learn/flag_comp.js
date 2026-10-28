/* Flagship – compound and double angles (17–18): sin(A+B) myth on a unit circle, stack the height, fix signs, exact values, forms of cos 2A. */
(()=>{const RD=Math.PI/180,sn=d=>Math.sin(d*RD),cs=d=>Math.cos(d*RD),ab=Math.abs,lim=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
 const f3=v=>{const r=Math.round(v*1000)/1000;return(r<0?'−':'')+ab(r).toFixed(3)};
 const deg=d=>((d%360)+360)%360;
 const PT=[['sin A cos B',(a,b)=>sn(a)*cs(b)],['cos A sin B',(a,b)=>cs(a)*sn(b)],['sin A sin B',(a,b)=>sn(a)*sn(b)],['cos A cos B',(a,b)=>cs(a)*cs(b)]];
 const SG=[['sin(A − B)','sin A cos B','cos A sin B',-1,(a,b)=>sn(a-b),(a,b)=>sn(a)*cs(b),(a,b)=>cs(a)*sn(b)],
  ['cos(A + B)','cos A cos B','sin A sin B',-1,(a,b)=>cs(a+b),(a,b)=>cs(a)*cs(b),(a,b)=>sn(a)*sn(b)],
  ['cos(A − B)','cos A cos B','sin A sin B',1,(a,b)=>cs(a-b),(a,b)=>cs(a)*cs(b),(a,b)=>sn(a)*sn(b)]];
 const SPEC=[30,45,60,90,120];
 const TGT=[[75,'sin','sin 75° = (√6 + √2)/4 ≈ 0.966'],[15,'sin','sin 15° = (√6 − √2)/4 ≈ 0.259'],[105,'cos','cos 105° = (√2 − √6)/4 ≈ −0.259']];
 const C2=[['cos²A − sin²A',1],['2cos²A − 1',1],['1 − 2sin²A',1],['2cos A',0,'2cos A is the doubling myth: at A = 60°, cos 120° = −0.5 but 2cos 60° = 1.'],['cos²A + sin²A',0,'cos²A + sin²A is always 1, the Pythagorean identity, not cos 2A.']];
VIS.reg('flagcomp',c=>{let A,pad,cq;
 const Z={gen:0,ok:()=>{},Q:'θ'};
 const stage=()=>['myth','stack','sign','exact','dbl','quiz'][A.step];
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const fs=n=>A.narrow?n:n+2;
 function txt(g,s,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y,A.W-14)}
 function pane(g,r,col,thick,fill){g.fillStyle=A.alpha(col,fill||.12);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const wrong=t=>{A.sound.miss();tell(t);A.redraw()};
 // unit circle geometry
 const ring=()=>{const r=Math.min(A.W*.3,A.H*.24);return{x:A.W*.34,y:A.H*.06+r+8,r}};
 const at=(o,d,k)=>({x:o.x+o.r*(k==null?1:k)*cs(d),y:o.y-o.r*(k==null?1:k)*sn(d)});
 function circle(g,a,b){const C=A.col,o=ring();g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=1.5;g.beginPath();g.moveTo(o.x-o.r-8,o.y);g.lineTo(o.x+o.r+8,o.y);g.moveTo(o.x,o.y-o.r-8);g.lineTo(o.x,o.y+o.r+8);g.stroke();
  g.strokeStyle=C.ln;g.lineWidth=2;g.beginPath();g.arc(o.x,o.y,o.r,0,7);g.stroke();
  const pa=at(o,a),pb=at(o,a+b);g.lineWidth=3;g.strokeStyle=C.cy;g.beginPath();g.moveTo(o.x,o.y);g.lineTo(pa.x,pa.y);g.stroke();g.strokeStyle=C.vi;g.beginPath();g.moveTo(o.x,o.y);g.lineTo(pb.x,pb.y);g.stroke();
  g.lineWidth=2;g.strokeStyle=C.cy;g.beginPath();g.arc(o.x,o.y,o.r*.22,0,-a*RD,a>0);g.stroke();g.strokeStyle=C.vi;g.beginPath();g.arc(o.x,o.y,o.r*.32,-a*RD,-(a+b)*RD,b>0);g.stroke();
  A.paint.ball(pa.x,pa.y,9,C.cy);A.paint.ball(pb.x,pb.y,9,C.vi);txt(g,'A',at(o,a/2,.42).x,at(o,a/2,.42).y,10,C.tx,800);txt(g,'B',at(o,a+b/2,.5).x,at(o,a+b/2,.5).y,10,C.tx,800);return{o,pa,pb}}
 function bar(g,x,base,h,scale,col,lab){const y0=base,y1=base-h*scale;g.fillStyle=A.alpha(col,.55);g.fillRect(x-14,Math.min(y0,y1),28,ab(y1-y0));g.strokeStyle=col;g.lineWidth=2;g.strokeRect(x-14,Math.min(y0,y1),28,ab(y1-y0));if(lab)txt(g,lab,x,base+14,10,A.col.tx,800)}
 // ---- 0: the myth ----
 function mythV(g){const C=A.col,{o}=circle(g,Z.a,Z.b),base=o.y+o.r*.2,sc=o.r*.55,s1=sn(Z.a+Z.b),s2=sn(Z.a)+sn(Z.b);
  g.strokeStyle=A.alpha(C.tx,.35);g.beginPath();g.moveTo(A.W*.66,base);g.lineTo(A.W*.96,base);g.stroke();
  bar(g,A.W*.74,base,s1,sc,C.vi,'sin(A+B)');bar(g,A.W*.9,base,s2,sc,C.am,'sinA+sinB');
  txt(g,`A = ${Z.a}°   B = ${Z.b}°   A + B = ${Z.a+Z.b}°`,A.W/2,A.H*.74,12,C.tx,800);
  txt(g,`sin(A + B) = ${f3(s1)}`,A.W/2,A.H*.81,12,C.tx,700);txt(g,`sin A + sin B = ${f3(s2)}`,A.W/2,A.H*.87,12,ab(s1-s2)<.005?C.gr:C.tx,700);
  txt(g,'Drag either dot round the circle',A.W/2,A.H*.94,10,C.tx,600)}
 function setAB(a,b){Z.a=lim(a,0,180);Z.b=lim(b,0,180);A.sound.tick();
  if(stage()==='myth'&&Z.a>0&&Z.b>0&&Z.a+Z.b===90&&!Z.won){Z.won=1;A.sound.pop();return speak(`sin 90° = 1, but sin ${Z.a}° + sin ${Z.b}° = ${f3(sn(Z.a)+sn(Z.b))}.`)}speak()}
 // ---- 1: stack the height ----
 const slot=i=>{const w=A.W*.36,h=A.H*.075;return{x:i?A.W*.56:A.W*.08,y:A.H*.72,w,h}};
 const tileB=k=>{const w=(A.W-30)/2,h=A.H*.07;return{x:10+(k%2)*(w+10),y:A.H*.82+Math.floor(k/2)*(h+6),w,h}};
 const placed=()=>Z.sl.every(s=>s>=0);
 const solved=()=>Z.sl.slice().sort().join()==='0,1';
 function stackV(g){const C=A.col,{o,pb}=circle(g,Z.a,Z.b);
  if(solved()){const h1=PT[0][1](Z.a,Z.b),h2=PT[1][1](Z.a,Z.b),x=A.W*.8,y1=o.y-o.r*h1,y2=y1-o.r*h2;
   g.lineWidth=7;g.strokeStyle=C.cy;g.beginPath();g.moveTo(x,o.y);g.lineTo(x,y1);g.stroke();g.strokeStyle=C.vi;g.beginPath();g.moveTo(x,y1);g.lineTo(x,y2);g.stroke();
   g.setLineDash([4,4]);g.lineWidth=1.5;g.strokeStyle=C.tx;g.beginPath();g.moveTo(pb.x,pb.y);g.lineTo(x,y2);g.stroke();g.setLineDash([]);
   txt(g,'sinA cosB',x+8,(o.y+y1)/2,9,C.tx,800,'left');txt(g,'cosA sinB',x+8,(y1+y2)/2,9,C.tx,800,'left')}
  const tv=sn(Z.a+Z.b),cv=placed()?PT[Z.sl[0]][1](Z.a,Z.b)+PT[Z.sl[1]][1](Z.a,Z.b):null;
  txt(g,`sin(${Z.a+Z.b}°) = ${f3(tv)}    your sum = ${cv==null?'?':f3(cv)}`,A.W/2,A.H*.66,11,cv!=null&&ab(cv-tv)<.001?C.gr:C.tx,800);
  txt(g,'+',A.W/2,slot(0).y+slot(0).h/2,18,C.tx,800);
  Z.sl.forEach((s,i)=>{const r=slot(i);pane(g,r,s<0?C.ln:solved()?C.gr:C.cy,s>=0);txt(g,s<0?'?':PT[s][0],r.x+r.w/2,r.y+r.h/2,12,C.tx,800)});
  PT.forEach(([t],k)=>{const r=tileB(k),u=Z.sl.includes(k);pane(g,r,u?C.ln:C.vi,0,u?.03:.16);txt(g,t,r.x+r.w/2,r.y+r.h/2,12,u?A.alpha(C.tx,.5):C.tx,800)})}
 function put(k){if(solved())return;const i=Z.sl.indexOf(-1);if(i<0||Z.sl.includes(k))return;Z.sl[i]=k;A.sound.tick();if(!placed())return speak();
  if(solved()){A.sound.pop();return speak('The two pieces stack exactly to the height of the A + B point.')}
  const both=Z.sl.filter(s=>s>1).length;wrong(both===2?'Those two products build cos(A + B), the x-coordinate, not the height.':'Each term of sin(A + B) pairs one sine with one cosine. Swap the tile that has two of the same.')}
 function pull(i){if(solved()||Z.sl[i]<0)return;Z.sl[i]=-1;A.sound.tick();speak()}
 // ---- 2: signs ----
 const row=i=>({x:A.W*.04,y:A.H*(.1+i*.22),w:A.W*.92,h:A.H*.17});
 const sgnR=i=>{const r=row(i);return{x:r.x+r.w*.62,y:r.y+r.h*.42,w:r.w*.14,h:r.h*.5}};
 function signV(g){const C=A.col;txt(g,`Live check at A = ${Z.a}°, B = ${Z.b}°`,A.W/2,A.H*.04,11,C.tx,800);
  SG.forEach(([l,t1,t2,ans,f,g1,g2],i)=>{const r=row(i),s=Z.sg[i],lhs=f(Z.a,Z.b),rhs=g1(Z.a,Z.b)+s*g2(Z.a,Z.b),ok=ab(lhs-rhs)<1e-6;pane(g,r,ok?C.gr:C.ln,ok,.06);
   txt(g,`${l} = ${t1}`,r.x+10,r.y+r.h*.22,11,C.tx,800,'left');const b=sgnR(i);pane(g,b,C.vi,1,.18);txt(g,s>0?'+':'−',b.x+b.w/2,b.y+b.h/2,18,C.tx,800);
   txt(g,t2,b.x+b.w+6,b.y+b.h/2,11,C.tx,800,'left');txt(g,`${f3(lhs)} ${ok?'=':'≠'} ${f3(rhs)}`,r.x+10,b.y+b.h/2,11,ok?C.gr:C.rd,800,'left')});
  txt(g,'Tap a sign to flip it',A.W/2,A.H*.8,10,C.tx,600)}
 const signsOK=()=>Z.sg.every((s,i)=>s===SG[i][3]);
 function flip(i){if(signsOK())return;Z.sg[i]*=-1;A.sound.tick();if(signsOK()){A.sound.pop();return speak('All three rows balance. Cosine flips the sign; sine keeps it.')}
  speak(Z.sg[i]===SG[i][3]?`${SG[i][0]} balances now.`:i===2&&Z.sg[2]<0?'cos(A − B) with a minus does not match: the minus inside becomes a plus.':'')}
 // ---- 3: exact values ----
 const angB=k=>{const w=(A.W-36)/5;return{x:8+k*(w+5),y:A.H*.8,w,h:A.H*.1}};
 const pmB=()=>({x:A.W*.42,y:A.H*.42,w:A.W*.16,h:A.H*.1});
 const pickS=i=>({x:i?A.W*.62:A.W*.12,y:A.H*.42,w:A.W*.26,h:A.H*.1});
 function exactV(g){const C=A.col,t=TGT[Math.min(Z.ti,2)];txt(g,Z.ti>2?'All three exact values found':`Target: ${t[1]} ${t[0]}°`,A.W/2,A.H*.08,15,C.tx,800);
  txt(g,'Build it from two special angles',A.W/2,A.H*.17,11,C.tx,600);
  Z.got.forEach((s,i)=>txt(g,'✓ '+s,A.W/2,A.H*(.25+i*.05),10,C.gr,800));
  [0,1].forEach(i=>{const r=pickS(i),v=Z.pk[i];pane(g,r,v==null?C.ln:C.cy,v!=null);txt(g,v==null?'?':v+'°',r.x+r.w/2,r.y+r.h/2,15,C.tx,800)});
  const p=pmB();pane(g,p,C.vi,1,.18);txt(g,Z.pm>0?'+':'−',p.x+p.w/2,p.y+p.h/2,20,C.tx,800);
  txt(g,'sin 30° = ½, sin 45° = √2/2, sin 60° = √3/2',A.W/2,A.H*.62,10,C.tx,700);txt(g,'cos 30° = √3/2, cos 45° = √2/2, cos 60° = ½',A.W/2,A.H*.68,10,C.tx,700);
  SPEC.forEach((d,k)=>{const r=angB(k);pane(g,r,C.am,0,.16);txt(g,d+'°',r.x+r.w/2,r.y+r.h/2,14,C.tx,800)})}
 function ang(d){if(Z.ti>2)return;const i=Z.pk[0]==null?0:1;Z.pk[i]=d;A.sound.tick();if(i===0)return speak();
  const v=Z.pk[0]+Z.pm*Z.pk[1],t=TGT[Z.ti];if(v===t[0]){Z.got.push(`${t[2]} from ${Z.pk[0]}° ${Z.pm>0?'+':'−'} ${Z.pk[1]}°`);Z.ti++;Z.pk=[null,null];A.sound.pop();
   return speak(Z.ti>2?'Three exact values, each from a compound-angle formula.':`Yes. Next target: ${TGT[Z.ti][1]} ${TGT[Z.ti][0]}°.`)}
  const msg=`${Z.pk[0]}° ${Z.pm>0?'+':'−'} ${Z.pk[1]}° = ${v}°, not ${t[0]}°.${v===-t[0]?' Swap the order: A − B is not B − A.':''}`;Z.pk=[null,null];wrong(msg)}
 function pmF(){if(Z.ti>2)return;Z.pm*=-1;A.sound.tick();speak()}
 // ---- 4: double angle ----
 const grR=()=>({x:A.W*.08,y:A.H*.04,w:A.W*.86,h:A.H*.38});
 const c2B=k=>{const w=(A.W-30)/2,h=A.H*.075;return k<4?{x:10+(k%2)*(w+10),y:A.H*.62+Math.floor(k/2)*(h+6),w,h}:{x:A.W/2-w/2,y:A.H*.62+2*(h+6),w,h}};
 function dblV(g){const C=A.col,r=grR(),X=d=>r.x+d/180*r.w,Y=v=>r.y+r.h/2-v*r.h/4.4;pane(g,r,C.ln,0,.04);
  g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=1;g.beginPath();g.moveTo(r.x,Y(0));g.lineTo(r.x+r.w,Y(0));g.stroke();
  [[d=>sn(2*d),C.gr,[]],[d=>2*sn(d),C.am,[7,5]]].forEach(([f,col,ds])=>{g.strokeStyle=col;g.lineWidth=3;g.setLineDash(ds);g.beginPath();for(let d=0;d<=180;d+=3)d?g.lineTo(X(d),Y(f(d))):g.moveTo(X(d),Y(f(d)));g.stroke()});g.setLineDash([]);
  A.paint.ball(X(Z.d),Y(sn(2*Z.d)),8,C.gr);A.paint.ball(X(Z.d),Y(2*sn(Z.d)),8,C.am);
  txt(g,'— sin 2A',r.x+8,r.y+12,10,C.tx,800,'left');txt(g,'- - 2 sin A',r.x+8,r.y+28,10,C.tx,800,'left');
  txt(g,`A = ${Z.d}°: sin 2A = ${f3(sn(2*Z.d))}, 2 sin A cos A = ${f3(2*sn(Z.d)*cs(Z.d))}`,A.W/2,A.H*.47,11,C.tx,800);
  txt(g,`Pick every form of cos 2A (${Z.c2.length} of 3)`,A.W/2,A.H*.56,11,Z.c2.length>2?C.gr:C.tx,800);
  C2.forEach(([t],k)=>{const b=c2B(k),on=Z.c2.includes(k);pane(g,b,on?C.gr:C.vi,on,on?.2:.12);txt(g,t,b.x+b.w/2,b.y+b.h/2,12,C.tx,800)})}
 function c2(k){if(Z.c2.length>2||Z.c2.includes(k))return;if(!C2[k][1])return wrong(C2[k][2]);Z.c2.push(k);A.sound.pop();
  speak(Z.c2.length>2?'All three: use sin²A + cos²A = 1 to move between them.':'Yes, that is a form of cos 2A.')}
 function setD(d){Z.d=lim(Math.round(d/5)*5,0,180);speak()}
 function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.04:.3);g.fillRect(0,0,W,H);
  const f={myth:mythV,stack:stackV,sign:signV,exact:exactV,dbl:dblV}[v];if(f)f(g);else txt(g,Z.Q,W/2,H/2,64,C.tx,400);A.fx.draw(g)}
 function speak(pre){const v=stage();let t;
  if(v==='myth')t=`A = ${Z.a}°, B = ${Z.b}°. sin(A + B) = ${f3(sn(Z.a+Z.b))}, sin A + sin B = ${f3(sn(Z.a)+sn(Z.b))}.`;
  else if(v==='stack')t=`A = ${Z.a}°, B = ${Z.b}°. Slots: `+Z.sl.map(s=>s<0?'empty':PT[s][0]).join(' plus ')+'.';
  else if(v==='sign')t='Signs: '+SG.map((r,i)=>`${r[0]} = ${r[1]} ${Z.sg[i]>0?'plus':'minus'} ${r[2]}`).join('; ')+'.';
  else if(v==='exact')t=Z.ti>2?'All targets done.':`Target ${TGT[Z.ti][1]} ${TGT[Z.ti][0]}°. Picked ${Z.pk.filter(x=>x!=null).join(' and ')||'nothing'}, sign ${Z.pm>0?'plus':'minus'}.`;
  else if(v==='dbl')t=`A = ${Z.d}°. Forms of cos 2A found: ${Z.c2.length} of 3.`;else t='Challenge time.';
  tell((pre?pre+' ':'')+t);buttons();Z.ok()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=stage(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='myth'||v==='stack'){B('A − 15°',()=>setAB(Z.a-15,Z.b),'Decrease A');B('A + 15°',()=>setAB(Z.a+15,Z.b),'Increase A');B('B − 15°',()=>setAB(Z.a,Z.b-15),'Decrease B');B('B + 15°',()=>setAB(Z.a,Z.b+15),'Increase B')}
  if(v==='stack'&&!solved()){PT.forEach(([t],k)=>{if(!Z.sl.includes(k))B(t,()=>put(k),'Place '+t)});Z.sl.forEach((s,i)=>{if(s>=0)B('✕ '+PT[s][0],()=>pull(i),'Remove '+PT[s][0])})}
  if(v==='sign'&&!signsOK())SG.forEach((r,i)=>B('Flip sign in '+r[0],()=>flip(i)));
  if(v==='exact'&&Z.ti<3){SPEC.forEach(d=>B(d+'°',()=>ang(d),'Pick '+d+' degrees'));B('Flip + / −',pmF,'Flip the sign between the angles')}
  if(v==='dbl'){B('A − 15°',()=>setD(Z.d-15),'Decrease A');B('A + 15°',()=>setD(Z.d+15),'Increase A');if(Z.c2.length<3)C2.forEach(([t],k)=>{if(!Z.c2.includes(k))B(t,()=>c2(k),'Choose '+t)})}A.redraw()}
 const fin=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(list,gap)=>{const g=Z.gen;list.forEach((f,j)=>setTimeout(()=>{if(g===Z.gen)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{Z.gen++;Z.ok=()=>{};Z.drag=0};
 const steps=[
  {h:'Test the tempting rule',p:'Cyan ray: angle A. Violet ray: a further B, so its dot\u2019s height is sin(A + B). Compare with sin A + sin B.',
   predict:{q:'Is sin(A + B) equal to sin A + sin B?',opts:['Yes, sine shares out over addition','No, not in general'],ans:1},task:'Make A + B = 90° with neither angle 0°',
   show:()=>{steps[0].go();play([()=>setAB(30,15),()=>setAB(30,30),()=>setAB(30,45),()=>setAB(30,60)],420)},go:()=>{reset();Z.a=45;Z.b=30;Z.won=0;speak();Z.ok=fin(0,()=>Z.won,()=>'sin A + sin B can even exceed 1, which no sine can. Sine is not linear.')}},
  {h:'Stack the height',p:'Project the A + B point onto the A ray: its height splits into two pieces. Fill the slots so the sum matches.',
   task:'Build sin(A + B)',show:()=>{steps[1].go();play([()=>put(0),()=>put(1)],480)},
   go:()=>{reset();Z.a=45;Z.b=30;Z.sl=[-1,-1];speak();Z.ok=fin(1,solved,()=>'sin(A + B) = sin A cos B + cos A sin B. Change A and B: the stack still lands on the dot.')}},
  {h:'Fix the signs',p:'Swapping B for −B uses cos(−B) = cos B and sin(−B) = −sin B. Each row shows a live numeric check. Flip any wrong sign.',
   predict:{q:'Is cos(A + B) = cos A cos B + sin A sin B?',opts:['Yes, same pattern as sine','No, the sign is minus'],ans:1},task:'Make all three rows balance',
   show:()=>{steps[2].go();play([()=>flip(0),()=>flip(1),()=>flip(2)],450)},go:()=>{reset();Z.a=50;Z.b=20;Z.sg=[1,1,-1];speak();Z.ok=fin(2,signsOK,()=>'cos(A ± B) = cos A cos B ∓ sin A sin B: the cosine sign flips; sin(A ± B) keeps it.')}},
  {h:'Exact values',p:'15°, 75° and 105° are sums or differences of special angles. Pick two angles and a sign for each target.',
   task:'Build all three targets',show:()=>{steps[3].go();play([()=>ang(45),()=>ang(30),()=>pmF(),()=>ang(45),()=>ang(30),()=>pmF(),()=>ang(60),()=>ang(45)],400)},
   go:()=>{reset();Z.ti=0;Z.pk=[null,null];Z.pm=1;Z.got=[];speak();Z.ok=fin(3,()=>Z.ti>2,()=>'Exact values keep the surds: give (√6 + √2)/4, not 0.966, when asked for an exact answer.')}},
  {h:'Double angles',p:'Put B = A. Then sin 2A = 2 sin A cos A and cos 2A = cos²A − sin²A. Use sin²A + cos²A = 1 to get the other two forms of cos 2A.',
   predict:{q:'Is sin 2A = 2 sin A?',opts:['Yes, double the angle, double the sine','No, sin 2A = 2 sin A cos A'],ans:1},task:'Pick all three forms of cos 2A',
   show:()=>{steps[4].go();play([()=>setD(60),()=>c2(0),()=>c2(1),()=>c2(2)],450)},go:()=>{reset();Z.d=30;Z.c2=[];speak();Z.ok=fin(4,()=>Z.c2.length>2,()=>'Choose the cos 2A form that matches the equation: 1 − 2sin²A if only sines appear, 2cos²A − 1 if only cosines.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.ok()});
 const QZ=[['Expand cos(x − 60°).','∠',[['½cos x + (√3/2)sin x','ok'],['½cos x − (√3/2)sin x','csign'],['cos x − ½','lin']]],
  ['Exact value of cos 75°?','√',[['(√6 − √2)/4','ok'],['(√6 + √2)/4','sinval'],['cos 45° + cos 30°','lin']]],
  ['sin 2x = sin x for 0 < x < 180°. Solve.','∿',[['x = 60°','ok'],['x = 0° only','div'],['x = 30°','x30']]],
  ['Simplify 1 − 2sin²(15°).','2',[['√3/2','ok'],['½','half'],['1 − ½ = ½','lin']]],
  ['tan(A + B) = ?','t',[['(tan A + tan B)/(1 − tan A tan B)','ok'],['(tan A + tan B)/(1 + tan A tan B)','tsign'],['tan A + tan B','lin']]],
  ['Write cos 2x in terms of sin x only.','s',[['1 − 2sin²x','ok'],['2sin²x − 1','flip'],['1 − sin²x','pyth']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],sh=qn%3;Z.Q=pic;
  cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=cq.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
 function mark(tag){cq.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=cq.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct, straight from the compound-angle and double-angle formulae.';break;
   case 'csign':m='cos(A − B) has a plus: cos A cos B + sin A sin B. The sign flips for cosine.';break;
   case 'lin':m='Trig functions do not split over + or −. Use the compound-angle formula.';break;
   case 'sinval':m='(√6 + √2)/4 is sin 75°. cos 75° = cos 45° cos 30° − sin 45° sin 30° = (√6 − √2)/4.';break;
   case 'div':m='Never divide by sin x: 2 sin x cos x − sin x = sin x(2cos x − 1) = 0, and cos x = ½ gives 60°.';break;
   case 'half':m='1 − 2sin²A is cos 2A, so this is cos 30° = √3/2, not a halved value.';break;
   case 'x30':m='sin 60° ≈ 0.866 but sin 30° = 0.5. Factor: sin x(2cos x − 1) = 0.';break;
   case 'pyth':m='1 − sin²x is cos²x, not cos 2x. Use 1 − 2sin²x.';break;
   case 'tsign':m='Divide sin(A + B) by cos(A + B): the cos sign is minus, so the bottom is 1 − tan A tan B.';break;
   default:m='Sign slip: cos 2x = 1 − 2sin²x. Test at x = 0: cos 0 = 1.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=stage();Z.drag=0;
  if(v==='myth'||v==='stack'){const o=ring(),dx=p.x-o.x,dy=o.y-p.y,rr=Math.hypot(dx,dy);if(rr<o.r*.5||rr>o.r*1.4){if(v==='stack'){const k=[0,1,2,3].find(k=>hit(p,tileB(k)));if(k!=null)put(k);const i=[0,1].find(i=>hit(p,slot(i)));if(i!=null)pull(i)}return false}
   const d=deg(Math.atan2(dy,dx)/RD),da=ab(deg(d-Z.a+180)-180),db=ab(deg(d-Z.a-Z.b+180)-180);Z.drag=da<=db?1:2;aim(p);return true}
  if(v==='sign'){const i=[0,1,2].find(i=>hit(p,sgnR(i)));if(i!=null)flip(i);return false}
  if(v==='exact'){const k=SPEC.findIndex((d,k)=>hit(p,angB(k)));if(k>=0)ang(SPEC[k]);if(hit(p,pmB()))pmF();return false}
  if(v==='dbl'){const k=[0,1,2,3,4].find(k=>hit(p,c2B(k)));if(k!=null){c2(k);return false}const r=grR();if(hit(p,r)){Z.drag=3;setD((p.x-r.x)/r.w*180);return true}return false}return false}
 function aim(p){const o=ring(),d=Math.round(deg(Math.atan2(o.y-p.y,p.x-o.x)/RD)/15)*15;if(Z.drag===1){if(d<=180&&d!==Z.a)setAB(d,Z.b)}else{const b=deg(d-Z.a);if(b<=180&&b!==Z.b)setAB(Z.a,b)}}
 function move(p){if(Z.drag===1||Z.drag===2)aim(p);if(Z.drag===3){const r=grR();setD((p.x-r.x)/r.w*180)}}
 function up(){Z.drag=0}
 A=FK.shell(c,{steps,ratio:.7,tall:1.35,draw,onStep:A=>{const q=A.step===5;cq.hidden=!q;pad.hidden=q;buttons()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);cq=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
 A.start()})})();
