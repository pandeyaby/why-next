/* Flagship 47 – lengths in similar shapes. One canvas, four pictures. (1) A 4-5-6 cm triangle and a copy whose green corner
   the learner drags: every side is multiplied by the same k (trap: add 6 to each side). (2) The copy is flipped and turned;
   equal angles carry equal marks and the learner taps the side opposite the matching angle (trap: match by position on the
   page). (3) Overlapping triangles: DE ∥ BC, and the learner drags ADE out of ABC to see AD matches AB = AD + DB (trap: DB).
   (4) Slide D along AB until DE = 10 cm, a proportion AD/AB = DE/BC (trap: subtract the difference). (5) Shrink a 15 × 10
   photo to 6 cm wide: k = 0.4 (trap: take 9 off both). Challenge: sides, scale factors and overlapping triangles, with
   options built from the additive, inverse, part-side and upside-down-proportion slips. */
(()=>{const R=x=>String(+(+x).toFixed(2)),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const SM=[[0,0],[6,0],[2.25,3.307]],SL=[5,4,6],MK=[2,1,3],LET=['y','z','x'];   // side i is opposite corner i
const TA=[7.01,7.13],TB=[0,0],TC=[12.5,0],lerp=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
const turned=(()=>{const r=200*Math.PI/180,p=SM.map(([x,y])=>{x=-2*x;y=2*y;return[x*Math.cos(r)-y*Math.sin(r),x*Math.sin(r)+y*Math.cos(r)]});
 const mx=Math.min(...p.map(q=>q[0])),my=Math.min(...p.map(q=>q[1]));const q=p.map(([x,y])=>[x-mx,y-my]);return{p:q,w:Math.max(...q.map(z=>z[0])),h:Math.max(...q.map(z=>z[1]))}})();
VIS.reg('flagsim',c=>{let A,pad,chal,read,G;
 const S={k:1,kr:1,ad:4,off:0,pick:null,drag:null,shake:0,goal:()=>{},run:0,Q:null,cq:''};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const mode=()=>A.step===6?(S.Q?S.Q.fig:'pair'):['pair','match','apart','cut','rect','cut'][A.step];
 const bigAt=h=>A.narrow?[0,-1.8-h]:[7.5,0],copyAt=k=>A.narrow?[0,-3-10*k]:[16.5,0],V=()=>A.narrow?[0,-9.6]:[9.5,0];
 function box(){const N=A.narrow,m=mode(),T=turned;
  if(m==='pair')return N?[0,18,-1.8-9.93,3.31]:[0,25.5,0,9.93];
  if(m==='match')return N?[0,Math.max(6,T.w),-1.8-T.h,3.31]:[0,7.5+T.w,0,Math.max(3.31,T.h)];
  if(m==='apart')return N?[0,12.5,-5.4,7.13]:[0,18.8,0,7.13];
  if(m==='cut')return[0,12.5,0,7.13];return N?[0,18,-13,10]:[0,31.5,0,10]}
 function fit(){const[x0,x1,y0,y1]=box(),L=26,T=48,B=30,u=Math.min((A.W-2*L)/(x1-x0),(A.H-T-B)/(y1-y0));
  const ox=L+((A.W-2*L)-(x1-x0)*u)/2-x0*u,oy=T+((A.H-T-B)-(y1-y0)*u)/2+y1*u;return{u,P:([x,y])=>[ox+x*u,oy-y*u],I:p=>[(p.x-ox)/u,(oy-p.y)/u]}}
 // ---- state changes ----
 function setK(v){S.k=cl(Math.round(v*4)/4,.5,3);const k=S.k;say(`k = ${k}: the copy's sides are ${R(4*k)}, ${R(5*k)} and ${R(6*k)} cm. Each is the matching small side × ${k}.`);sync();S.goal()}
 function setAD(v){S.ad=cl(Math.round(v*2)/2,1,9.5);const t=S.ad/10;say(`AD = ${S.ad} cm, so ADE is ${R(t)} of the size of ABC. DE = 12.5 × ${R(t)} = ${+(12.5*t).toFixed(3)} cm. AD/AB = DE/BC = ${R(t)}.`);sync();S.goal()}
 function setOff(v){S.off=cl(v,0,1);if(S.off>.95)say('Apart: ADE has sides AD = 4 and DE = 5. Its partner sides in ABC are AB = 4 + 6 = 10 and BC.');sync();S.goal()}
 function setKr(v){S.kr=cl(Math.round(v*10)/10,.2,1);const k=S.kr;say(`Copy: ${R(15*k)} cm wide and ${R(10*k)} cm tall. k = ${k}, so both lengths are × ${k}.`);sync();S.goal()}
 function pickSide(i){S.pick=i;if(i===0)say(`Side ${LET[0]} is opposite the angle with two marks, like the 5 cm side. It is 10 cm long.`);
  else{S.shake=1;A.tween(S,{shake:0},450,'out');A.sound.miss();say(`Side ${LET[i]} is opposite the angle with ${MK[i]===1?'one mark':'three marks'}. It matches the ${SL[i]} cm side, not the 5 cm side.`)}sync();S.goal()}
 const slide=(k,to,set)=>{const o={v:S[k]};A.tween(o,{v:to},700,'io',()=>set(to))};
 function describe(){const m=mode();if(A.step===6)return S.cq||'Challenge.';
  if(m==='pair')return `A triangle with sides 4, 5 and 6 cm and a copy enlarged by scale factor ${S.k}, with sides ${R(4*S.k)}, ${R(5*S.k)} and ${R(6*S.k)} cm.`;
  if(m==='match')return `The 4, 5, 6 cm triangle and a copy twice as big, flipped and turned. Angles are marked with one, two or three arcs. The copy's sides are labelled x, y and z.${S.pick!=null?' Picked side '+LET[S.pick]+'.':''}`;
  if(m==='apart')return `Triangle ABC with D on AB and E on AC, DE parallel to BC. AD = 4, DB = 6, DE = 5, BC unknown. The small triangle ADE is ${S.off>.95?'pulled out beside ABC':'inside ABC'}.`;
  if(m==='rect')return `A 15 by 10 cm photo and a copy scaled by ${S.kr}: ${R(15*S.kr)} by ${R(10*S.kr)} cm.`;
  return `Triangle ABC with AB = 10 cm and BC = 12.5 cm. D is ${S.ad} cm from A on AB, and DE is parallel to BC, ${+(1.25*S.ad).toFixed(3)} cm long.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.onclick=()=>{f();A.sound.tick()}};
  if(s===0){b('k − 0.25','Make the scale factor 0.25 smaller',()=>setK(S.k-.25));b('k + 0.25','Make the scale factor 0.25 bigger',()=>setK(S.k+.25))}
  if(s===1)LET.map((l,i)=>[l,i]).sort().forEach(([l,i])=>b('Side '+l,'Pick side '+l+' of the copy',()=>pickSide(i)));
  if(s===2){b('Pull apart','Pull triangle ADE out of ABC',()=>slide('off',1,setOff));b('Put back','Put triangle ADE back inside ABC',()=>slide('off',0,setOff))}
  if(s===3||s===5){b('AD − 0.5','Move D 0.5 cm towards A',()=>setAD(S.ad-.5));b('AD + 0.5','Move D 0.5 cm towards B',()=>setAD(S.ad+.5))}
  if(s===4){b('k − 0.1','Shrink the copy',()=>setKr(S.kr-.1));b('k + 0.1','Grow the copy',()=>setKr(S.kr+.1))}
  A.redraw()}
 // ---- drawing ----
 function poly(ps,fill,stroke,lw=2){const x=A.ctx;x.beginPath();ps.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();if(fill){x.fillStyle=fill;x.fill()}if(stroke){x.strokeStyle=stroke;x.lineWidth=lw;x.stroke()}}
 function lab(a,b,away,txt,bg,d=15){const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;let vx=mx-away[0],vy=my-away[1];const n=Math.hypot(vx,vy)||1;
  return A.paint.label(txt,mx+vx/n*d,my+vy/n*d,{font:'700 12px system-ui',bg:bg||A.alpha('#1e293b',.9)})}
 function marks(ps){const x=A.ctx;x.strokeStyle=A.col.tx;x.lineWidth=1.4;ps.forEach((v,i)=>{const a=ps[(i+1)%3],b=ps[(i+2)%3],a1=Math.atan2(a[1]-v[1],a[0]-v[0]);let d=Math.atan2(b[1]-v[1],b[0]-v[0])-a1;
  while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;for(let j=0;j<MK[i];j++){x.beginPath();x.arc(v[0],v[1],12+4*j,a1,a1+d,d<0);x.stroke()}})}
 const cen=ps=>[(ps[0][0]+ps[1][0]+ps[2][0])/3,(ps[0][1]+ps[1][1]+ps[2][1])/3],side=(ps,i)=>[ps[(i+1)%3],ps[(i+2)%3]];
 function vtx(p,t,away){const d=Math.hypot(p[0]-away[0],p[1]-away[1])||1;A.ctx.fillStyle=A.col.tx;A.ctx.font='700 13px system-ui';A.ctx.textAlign='center';A.ctx.textBaseline='middle';A.ctx.fillText(t,p[0]+(p[0]-away[0])/d*20,p[1]+(p[1]-away[1])/d*20)}
 function drawPair(C,k,labs,bigLabs){const P=G.P,sm=SM.map(P),[dx,dy]=bigAt(3.307*k),bg=SM.map(([x,y])=>P([x*k+dx,y*k+dy]));
  poly(sm,A.alpha(C.ac,.22),C.ac);poly(bg,A.alpha(C.am,.25),C.am);marks(sm);marks(bg);
  const cs=cen(sm),cb=cen(bg);[0,1,2].forEach(i=>{if(labs[i]!=null)lab(...side(sm,i),cs,labs[i]);if(bigLabs[i]!=null)lab(...side(bg,i),cb,bigLabs[i],A.alpha('#92400e',.95))});return bg}
 function drawCut(C,t,ls,lit){const P=G.P,a=P(TA),b=P(TB),cc=P(TC),d=P(lerp(TA,TB,t)),e=P(lerp(TA,TC,t));
  poly([a,b,cc],A.alpha(C.tx,.06),A.alpha(C.tx,.7));poly([a,d,e],A.alpha(C.ac,lit?.35:.2),C.ac,2.5);
  [[a,'A',cc],[b,'B',a],[cc,'C',a],[d,'D',cc],[e,'E',b]].forEach(([p,s,w])=>vtx(p,s,w));
  if(ls.AD!=null)lab(a,d,cc,'AD = '+ls.AD);if(ls.DB!=null)lab(d,b,cc,'DB = '+ls.DB);if(ls.AB!=null)lab(P(lerp(TA,TB,.5)),b,cc,'AB = '+ls.AB,null,30);
  if(ls.DE!=null)lab(d,e,a,'DE = '+ls.DE,A.alpha('#1d4ed8',.95),12);if(ls.BC!=null)lab(b,cc,a,'BC = '+ls.BC,A.alpha('#92400e',.95));return d}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,s=A.step,m=mode(),Q=s===6&&S.Q;G=fit();
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.ac,.06)],[1,A.mix(C.pn,C.am,.07)]]);ctx.fillRect(0,0,W,H);ctx.save();ctx.translate(S.shake*Math.sin(S.shake*30)*4,0);let top='';
  if(Q){if(m==='pair'){const L=[null,null,null],B=[null,null,null];L[1]=Q.a+' cm';B[1]=R(Q.A)+' cm';if(Q.t==='side'){L[0]=Q.b+' cm';B[0]='?'}drawPair(C,cl(Q.k,.5,3),L,B)}
   else drawCut(C,Q.t==='cut'?Q.p/(Q.p+Q.q):Q.d/Q.Bc,Q.t==='cut'?{AD:Q.p,DB:Q.q,DE:Q.d,BC:'?'}:{AD:'?',AB:Q.L,DE:Q.d,BC:Q.Bc});top='Not drawn to scale'}
  else if(m==='pair'){const k=S.k,bg=drawPair(C,k,SL.map(x=>x+' cm'),SL.map(x=>R(x*k)));S.hd=bg[1];P.ball(bg[1][0],bg[1][1],11,C.gr);top=`scale factor k = ${k}`}
  else if(m==='match'){const sm=SM.map(G.P),[dx,dy]=bigAt(turned.h),bg=turned.p.map(([x,y])=>G.P([x+dx,y+dy]));S.big=bg;
   poly(sm,A.alpha(C.ac,.22),C.ac);poly(bg,A.alpha(C.am,.25),C.am);const[p0,p1]=side(sm,0);ctx.strokeStyle=C.pk;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(...p0);ctx.lineTo(...p1);ctx.stroke();
   if(S.pick!=null){const[q0,q1]=side(bg,S.pick);ctx.strokeStyle=S.pick===0?C.gr:C.rd;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(...q0);ctx.lineTo(...q1);ctx.stroke()}
   marks(sm);marks(bg);const cs=cen(sm),cb=cen(bg);[0,1,2].forEach(i=>{lab(...side(sm,i),cs,SL[i]+' cm',i===0?A.alpha('#9d174d',.95):null);lab(...side(bg,i),cb,S.pick===i?`${LET[i]} = ${2*SL[i]} cm`:LET[i],A.alpha('#92400e',.95))});top='same marks = equal angles'}
  else if(m==='apart'){const t=.4,v=V(),o=S.off,a=TA,d=lerp(TA,TB,t),e=lerp(TA,TC,t),sh=p=>G.P([p[0]+v[0]*o,p[1]+v[1]*o]);
   drawCut(C,t,o<.5?{AD:4,DB:6,DE:5,BC:'?'}:{AB:'4 + 6 = 10',BC:'?'},false);const tri=[sh(a),sh(d),sh(e)];S.cpy=cen(tri);
   if(o>.02){poly(tri,A.alpha(C.ac,.45),C.ac,2.5);[[tri[0],'A',tri[2]],[tri[1],'D',tri[2]],[tri[2],'E',tri[1]]].forEach(([p,l,w])=>vtx(p,l,w));if(o>.5){lab(tri[0],tri[1],tri[2],'AD = 4');lab(tri[1],tri[2],tri[0],'DE = 5',A.alpha('#1d4ed8',.95))}}
   top=o>.95?'k = AB ÷ AD = 10 ÷ 4 = 2.5':'DE ∥ BC'}
  else if(m==='cut'){const t=S.ad/10,d=drawCut(C,t,{AD:S.ad,DB:R(10-S.ad),DE:+(12.5*t).toFixed(3),BC:12.5},true);S.hd=d;P.ball(d[0],d[1],11,C.gr);top=`AD/AB = ${S.ad}/10 = ${R(t)}   DE/BC = ${+(12.5*t).toFixed(3)}/12.5 = ${R(t)}`}
  else{const k=S.kr,[dx,dy]=copyAt(k),o=G.P([0,10]),c2=G.P([dx,dy+10*k]),u=G.u;
   const photo=(x,y,w,h)=>{ctx.fillStyle=P.lin(x,y,x,y+h,[[0,A.mix(C.cy,'#ffffff',.35)],[1,A.mix(C.gr,'#000000',.1)]]);ctx.fillRect(x,y,w,h);ctx.fillStyle=A.alpha('#1e293b',.55);ctx.beginPath();ctx.moveTo(x,y+h);ctx.lineTo(x+w*.4,y+h*.35);ctx.lineTo(x+w*.7,y+h);ctx.fill();
    ctx.fillStyle='#fde047';ctx.beginPath();ctx.arc(x+w*.78,y+h*.25,h*.1,0,7);ctx.fill();ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.strokeRect(x,y,w,h)};
   photo(o[0],o[1],15*u,10*u);photo(c2[0],c2[1],15*k*u,10*k*u);
   P.label('15 cm',o[0]+7.5*u,o[1]+10*u+14,{font:'700 12px system-ui'});P.label('10 cm',o[0]+24,o[1]+5*u,{font:'700 12px system-ui'});
   P.label(R(15*k)+' cm',c2[0]+7.5*k*u,c2[1]+10*k*u+14,{font:'700 12px system-ui',bg:A.alpha('#92400e',.95)});P.label(R(10*k)+' cm',c2[0]+15*k*u+30,c2[1]+5*k*u,{font:'700 12px system-ui',bg:A.alpha('#92400e',.95)});
   S.hd=[c2[0]+15*k*u,c2[1]];P.ball(S.hd[0],S.hd[1],11,C.gr);top=`k = ${k}`}
  ctx.restore();if(top)P.label(top,12,20,{align:'left',font:'800 13px system-ui',bg:A.alpha('#334155',.92)});A.fx.draw(ctx)}
 // ---- steps ----
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const fresh=()=>{S.run++;S.goal=()=>{};S.pick=null;S.off=0};
 const steps=[
  {h:'Same shape, every length × k',p:'The blue triangle has sides 4, 5 and 6 cm. Drag the green corner of the copy, or use the buttons. Watch all three sides change together.',
   predict:{q:'In the copy, the 4 cm side becomes 10 cm. What does the 6 cm side become?',opts:['12 cm','15 cm','16 cm'],ans:1},
   task:'Make the 4 cm side 10 cm long',show:()=>slide('k',2.5,setK),
   go:()=>{fresh();setK(1);S.goal=fin(0,()=>S.k===2.5,()=>'k = 10 ÷ 4 = 2.5, so the 6 cm side becomes 6 × 2.5 = 15 cm. Adding 6 to every side (4 → 10, 6 → 12) would change the shape.')}},
  {h:'Match sides by their angles',p:'This copy is flipped and turned. Equal angles carry the same marks. A matching side sits opposite the same angle, wherever it is on the page.',
   task:'Tap the side of the copy that matches the pink 5 cm side',show:()=>pickSide(0),
   go:()=>{fresh();say('The 5 cm side is opposite the angle with two marks.');sync();S.goal=fin(1,()=>S.pick===0,()=>'Side y is opposite two marks, like the 5 cm side. It is 10 cm, so k = 10 ÷ 5 = 2.')}},
  {h:'Pull overlapping triangles apart',p:'DE is parallel to BC, so triangle ADE is a smaller copy of ABC. They share the angle at A. Drag ADE out to see the two triangles side by side.',
   predict:{q:'AD = 4, DB = 6 and DE = 5. How long is BC?',opts:['7.5 cm','11 cm','12.5 cm'],ans:2},
   task:'Drag the small triangle ADE out of the big one',show:()=>slide('off',1,setOff),
   go:()=>{fresh();sync();say('ADE sits inside ABC. They share the corner A.');S.goal=fin(2,()=>S.off>.95,()=>'AD matches the whole of AB = 4 + 6 = 10, not DB. k = 10 ÷ 4 = 2.5, so BC = 5 × 2.5 = 12.5 cm.')}},
  {h:'Set up a proportion',p:'Slide D along AB. DE stays parallel to BC. AB = 10 cm and BC = 12.5 cm, so AD/AB and DE/BC are always the same fraction.',
   predict:{q:'Where must D be for DE to be 10 cm?',opts:['AD = 8 cm','AD = 7.5 cm','AD = 2.5 cm'],ans:0},
   task:'Move D until DE = 10 cm',show:()=>slide('ad',8,setAD),
   go:()=>{fresh();setAD(3);S.goal=fin(3,()=>S.ad===8,()=>'AD/10 = 10/12.5, so AD = 10 × 10 ÷ 12.5 = 8 cm. 7.5 cm comes from taking 2.5 away, a difference, not a ratio.')}},
  {h:'Shrinking: k less than 1',p:'A photo is 15 cm wide and 10 cm tall. Drag the corner of the copy to shrink it. Shrinking still multiplies, by a k smaller than 1.',
   predict:{q:'Shrink the photo to 6 cm wide. How tall is it now?',opts:['1 cm','4 cm','25 cm'],ans:1},
   task:'Make the copy 6 cm wide',show:()=>slide('kr',.4,setKr),
   go:()=>{fresh();setKr(1);S.goal=fin(4,()=>S.kr===.4,()=>'k = 6 ÷ 15 = 0.4, so the height is 10 × 0.4 = 4 cm. Taking 9 off both sides leaves 1 cm and squashes the photo; 25 cm comes from dividing the wrong way.')}},
  {h:'Sandbox',p:'Slide D anywhere. Check that AD/AB and DE/BC always match. Where is ADE exactly half size? Where is DE = 5 cm?',go:()=>{fresh();setAD(5)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge: options built from real slips ----
 const TY=['side','cut','k','back'];let qi=-1,streak=0;
 function make(n){const t=TY[qi%4],pk=a=>a[(n*7+qi*3)%a.length];
  if(t==='side'||t==='k'){const[a,b]=pk([[4,6],[3,5],[6,9],[8,10],[5,7],[4,9]]),k=pk([1.5,2,2.5,3,.5,4]),A=a*k,ok=t==='side'?b*k:k;
   return{fig:'pair',t,a,b,k,A,ok,txt:t==='side'?`Triangle Q is similar to triangle P. A ${a} cm side of P matches a ${R(A)} cm side of Q. Find the side of Q that matches the ${b} cm side.`:`A ${a} cm side becomes ${R(A)} cm on a similar copy. What is the scale factor from the first shape to the copy?`,
    o:t==='side'?[[b*k,'ok'],[b+A-a,'add'],[b/k,'inv']]:[[k,'ok'],[a/A,'flip'],[A-a,'diff']]}}
  if(t==='cut'){const p=pk([2,3,4,5,6]),q=pk([3,4,6,9]),d=pk([3,4,5,6]),ok=d*(p+q)/p;
   return{fig:'cut',t,p,q,d,ok,txt:`DE is parallel to BC. AD = ${p} cm, DB = ${q} cm and DE = ${d} cm. Find BC.`,o:[[ok,'ok'],[d*q/p,'db'],[d+q,'add']]}}
  const L=pk([8,10,12,15]),Bc=pk([9,12,15,18]),d=pk([3,4,6,8,10]),ok=L*d/Bc;
  return{fig:'cut',t,L,Bc,d,ok,txt:`DE is parallel to BC. AB = ${L} cm, BC = ${Bc} cm and DE = ${d} cm. Find AD.`,o:[[ok,'ok'],[L*Bc/d,'upside'],[L-(Bc-d),'add']]}}
 function ask(){qi++;let Q;for(let n=0;n<40;n++){Q=make(n);const v=Q.o.map(x=>R(x[0]));if(new Set(v).size===3&&Q.o.every(x=>x[0]>0)&&Math.abs(Q.ok*10-Math.round(Q.ok*10))<1e-9&&(Q.t!=='back'||Q.d<Q.Bc&&Q.d!==Q.L)&&(Q.t!=='side'||Q.b!==Q.A))break}
  S.Q=Q;say('');const u=Q.t==='k'?'':' cm',j=qi%3,o=Q.o.slice(j).concat(Q.o.slice(0,j));
  chal.innerHTML=`<p><b>${Q.txt}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(x=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,R(x[0])+u);b.onclick=()=>judge(x[1])});
  S.cq='Challenge: '+Q.txt+' The picture shows the given lengths and is not drawn to scale.';A.cv.setAttribute('aria-label',S.cq);A.redraw()}
 function judge(kind){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=S.Q;let m;
  const fix=Q.t==='side'?`k = ${R(Q.A)} ÷ ${Q.a} = ${R(Q.k)}, so ${Q.b} × ${R(Q.k)} = ${R(Q.ok)} cm.`:Q.t==='k'?`k = new ÷ old = ${R(Q.A)} ÷ ${Q.a} = ${R(Q.k)}.`
   :Q.t==='cut'?`AB = ${Q.p} + ${Q.q} = ${Q.p+Q.q}, k = ${Q.p+Q.q} ÷ ${Q.p}, so BC = ${Q.d} × ${Q.p+Q.q} ÷ ${Q.p} = ${R(Q.ok)} cm.`:`AD/${Q.L} = ${Q.d}/${Q.Bc}, so AD = ${Q.L} × ${Q.d} ÷ ${Q.Bc} = ${R(Q.ok)} cm.`;
  if(kind==='ok')m=fix;
  else if(kind==='add')m=`Similar shapes multiply every length by the same k. Adding or taking away the same amount changes the shape. ${fix}`;
  else if(kind==='inv')m=`That divides by k. Going from P to Q multiplies by k = ${R(Q.k)}. ${fix}`;
  else if(kind==='flip')m=`That is old ÷ new, upside down. The scale factor to the copy is new length ÷ old length. ${fix}`;
  else if(kind==='diff')m=`A scale factor is a multiplier, not a difference: ${Q.a} × k must make ${R(Q.A)}. ${fix}`;
  else if(kind==='db')m=`DB is only part of the big side. AD matches the whole of AB = AD + DB. ${fix}`;
  else m=`One fraction is upside down. Keep the same order on both sides: small/big = small/big, AD/AB = DE/BC. ${fix}`;
  if(kind==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)S.Q=null;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the shapes'},box);chal=E('div',{class:'fl-chal'},A.below);
   const near=(p,q,r)=>q&&Math.hypot(p.x-q[0],p.y-q[1])<r;
   A.gest({down:p=>{const m=mode(),s=A.step;if(!G||s===6)return false;
     if(m==='match'&&S.big){let best=-1,bd=22;[0,1,2].forEach(i=>{const[a,b]=side(S.big,i),dx=b[0]-a[0],dy=b[1]-a[1],t=cl(((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy),0,1),d=Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy);if(d<bd){bd=d;best=i}});if(best>=0)pickSide(best);return false}
     if(m==='apart'&&near(p,S.cpy,60)){S.drag='off';S.o0=S.off;S.p0=G.I(p);return true}
     if((m==='pair'||m==='cut'||m==='rect')&&near(p,S.hd,30)){S.drag=m;return true}
     if(m==='cut'){const w=G.I(p),ab=[TB[0]-TA[0],TB[1]-TA[1]],t=((w[0]-TA[0])*ab[0]+(w[1]-TA[1])*ab[1])/100,f=lerp(TA,TB,t);if(Math.hypot(w[0]-f[0],w[1]-f[1])*G.u<26){S.drag='cut';return true}}return false},
    move:p=>{const w=G.I(p),m=S.drag;
     if(m==='pair')S.k=cl(Math.round((w[0]-bigAt(0)[0])/6*4)/4,.5,3);
     else if(m==='rect')S.kr=cl(Math.round((w[0]-copyAt(0)[0])/15*10)/10,.2,1);
     else if(m==='cut'){const ab=[TB[0]-TA[0],TB[1]-TA[1]];S.ad=cl(Math.round(((w[0]-TA[0])*ab[0]+(w[1]-TA[1])*ab[1])/100*20)/2,1,9.5)}
     else if(m==='off'){const v=V(),n=v[0]*v[0]+v[1]*v[1];S.off=cl(S.o0+((w[0]-S.p0[0])*v[0]+(w[1]-S.p0[1])*v[1])/n,0,1)}else return;A.redraw();A.cv.setAttribute('aria-label',describe())},
    up:()=>{const m=S.drag;S.drag=null;if(m==='pair')setK(S.k);else if(m==='rect')setKr(S.kr);else if(m==='cut')setAD(S.ad);else if(m==='off')setOff(S.off>.5?1:0)}});sync()}});
 A.start()})})();
