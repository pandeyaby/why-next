/* Flagship 56 – alkali metals (Group 1): cut a block and watch the shine tarnish; drop Li, Na and K into a trough
   (float, fizz, melt, lilac flame); test the water with indicator and the gas with a lit splint; tug the outer electron
   off each atom (the further out, the less pull); then predict rubidium. Challenge: reactivity, products, ions, formulae. */
(()=>{const M=[{s:'Li',n:'lithium',d:.53,mp:181,ie:520,sh:[2,1],sp:.25,tn:9,how:'fizzes steadily and floats; it does not melt'},
 {s:'Na',n:'sodium',d:.97,mp:98,ie:496,sh:[2,8,1],sp:.8,tn:4,how:'melts into a silvery ball and whizzes around on the surface'},
 {s:'K',n:'potassium',d:.86,mp:63,ie:419,sh:[2,8,8,1],sp:1.6,tn:1.5,how:'melts, whizzes and the hydrogen burns with a lilac flame'},
 {s:'Rb',n:'rubidium',d:1.53,mp:39,ie:403,sh:[2,8,18,8,1],sp:3,tn:.6,how:'sinks, because it is denser than water, and reacts explosively'},
 {s:'Cs',n:'caesium',d:1.93,mp:28,ie:376,sh:[2,8,18,18,8,1],sp:4,tn:.3,how:'sinks and explodes, shattering a glass trough'}],cap=s=>s[0].toUpperCase()+s.slice(1);
VIS.reg('flaggp1',c=>{let A,pad,chal,read;const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui`;x.textAlign=a||'center'};
 const G={m:1,cut:0,dull:0,inW:[],t:0,ind:0,pop:0,pull:[0,0,0],pk:0,dr:null,dp:null,d0:null,tok:0,flash:0,want:()=>{},Q:null,cq:'',said:''};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['cut','trough','test','atom','trough','trough','q'][A.step],nM=()=>A.step>=4&&A.step<6?5:3;
 function status(){const m=mode(),e=M[G.m];let t;
  if(m==='cut')t=G.cut?`${cap(e.n)}, freshly cut: ${G.dull<.5?'shiny silver':'already dull grey'}. The new surface reacts with oxygen in the air.`:`A block of ${e.n}, dull on the outside. Drag the knife down through it.`;
  else if(m==='trough')t=G.inW.length?G.inW.map(i=>`${cap(M[i].n)} ${M[i].how}.`).join(' '):`A trough of water. ${A.step===4?'Rubidium and caesium are now on the shelf.':'Drag a metal onto the water.'}`;
  else if(m==='test')t=`Sodium has reacted with the water. Indicator: ${G.ind?'purple, strongly alkaline (pH about 13)':'not added'}. Gas: ${G.pop?'squeaky pop, hydrogen':'not tested'}.`;
  else{const e2=M[G.pk];t=`${cap(e2.n)}, ${e2.sh.join(',')}. Outer electron ${G.pull[G.pk]?'removed: '+e2.ie+' kJ/mol needed':'in shell '+e2.sh.length}. ${G.pull.filter(x=>x).length} of 3 pulled off.`}
  tell(t);sync();G.want()}
 const top=()=>A.narrow?58:52;
 // ---- geometry ----
 const tg=()=>{const y=top()+(A.narrow?90:74),h=A.H-y-30;return{x:12,y,w:A.W-24,h,lane:i=>12+(A.W-24)*(i+.5)/nM()}};
 const sh=()=>{const k=nM(),s=Math.min(54,(A.W-24)/k-8);return{s,x:i=>12+i*(s+8),y:top()+4}};
 const bk=()=>{const w=Math.min(A.W*.6,260),h=w*.45;return{x:(A.W-w)/2,y:top()+(A.H-top()-h)/2,w,h}};
 const at=()=>{const cx=A.W/2,cy=top()+(A.H-top())*.5,r=Math.min(A.W*.3,(A.H-top())*.34);return{cx,cy,r}};
 // ---- drawing ----
 function head(ctx,a,b){const C=A.col;ft(ctx,700,A.narrow?15:18,'left');ctx.textBaseline='alphabetic';ctx.fillStyle=C.tx;ctx.fillText(a,12,22);ft(ctx,600,13,'left');ctx.fillStyle=C.mu;ctx.fillText(b,12,A.narrow?44:42)}
 function lump(ctx,x,y,r,i,shine){const g=A.paint;g.ball(x,y,r,shine?'#cbd5e1':'#6b7280');ctx.fillStyle='#0f172a';ft(ctx,700,Math.max(10,r*.8));ctx.textBaseline='middle';ctx.fillText(M[i].s,x,y+1)}
 function trough(ctx){const C=A.col,g=tg(),T=G.t;ctx.fillStyle=G.ind?A.alpha(G.inW.length?'#7c3aed':'#22c55e',.35):A.alpha('#38bdf8',.22);ctx.fillRect(g.x,g.y+g.h*.25,g.w,g.h*.75);
  ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(g.x,g.y);ctx.lineTo(g.x,g.y+g.h);ctx.lineTo(g.x+g.w,g.y+g.h);ctx.lineTo(g.x+g.w,g.y);ctx.stroke();
  G.inW.forEach(i=>{const e=M[i],sink=e.d>1,lx=g.lane(i)+(sink?0:Math.sin(T*e.sp*2+i)*Math.min(g.w/nM()*.35,40)*Math.min(1,e.sp)),ly=sink?g.y+g.h-12:g.y+g.h*.25-3,r=e.mp<100?12:14;
   for(let b=0;b<3+e.sp*3;b++){const u=(T*(1+e.sp)+b*.29)%1;ctx.fillStyle=A.alpha('#fff',.8*(1-u));ctx.beginPath();ctx.arc(lx+(b%3-1)*8,ly-u*(sink?g.h*.7:28),3.5,0,7);ctx.fill()}
   if(i===2){ctx.fillStyle=A.alpha('#c084fc',.55+.3*Math.sin(T*9));ctx.beginPath();ctx.moveTo(lx-13,ly-8);ctx.quadraticCurveTo(lx,ly-60-9*Math.sin(T*7),lx+13,ly-8);ctx.fill()}
   if(i>2){ctx.strokeStyle=A.alpha('#f59e0b',.5+.5*Math.sin(T*12));ctx.lineWidth=3;for(let k=0;k<8;k++){const a=k*.785;ctx.beginPath();ctx.moveTo(lx+Math.cos(a)*18,ly+Math.sin(a)*18);ctx.lineTo(lx+Math.cos(a)*32,ly+Math.sin(a)*32);ctx.stroke()}}
   lump(ctx,lx,ly,r,i,1)});
  if(mode()!=='trough')return;const s=sh();for(let i=0;i<nM();i++)if(!G.inW.includes(i)&&G.dr!==i){ctx.fillStyle=A.alpha(C.tx,.08);A.paint.rrect(s.x(i),s.y,s.s,s.s,8);ctx.fill();lump(ctx,s.x(i)+s.s/2,s.y+s.s/2,s.s*.3,i,0)}
  if(G.dr!=null&&G.dp)lump(ctx,G.dp.x,G.dp.y,s.s*.3,G.dr,0);
  ctx.fillStyle=C.mu;ft(ctx,600,11);ctx.textBaseline='alphabetic';for(const i of G.inW)ctx.fillText(`${M[i].d} g/cm³`,g.lane(i),g.y+g.h+16)}
 function draw(A){const{ctx,W,H,col:C}=A,m=mode(),e=M[G.m];ctx.fillStyle=A.mix(C.pn,C.am,.04);ctx.fillRect(0,0,W,H);
  if(m==='cut'){const b=bk(),o=G.cut*b.w*.18;head(ctx,`${cap(e.n)} under the knife`,G.cut?(G.dull<.5?'shiny… for now':'tarnished'):'soft enough to cut');
   const face=A.mix('#e2e8f0','#6b7280',G.dull);ctx.fillStyle='#6b7280';A.paint.rrect(b.x-o,b.y,b.w/2,b.h,6);ctx.fill();A.paint.rrect(b.x+b.w/2+o,b.y,b.w/2,b.h,6);ctx.fill();
   if(G.cut){ctx.fillStyle=face;ctx.fillRect(b.x+b.w/2-o-10,b.y+3,10,b.h-6);ctx.fillRect(b.x+b.w/2+o,b.y+3,10,b.h-6)}
   const ky=G.dr==='k'&&G.dp?Math.max(b.y-40,Math.min(b.y+b.h,G.dp.y)):G.cut?b.y+b.h:b.y-40;ctx.fillStyle='#94a3b8';ctx.beginPath();ctx.moveTo(W/2-2,ky-50);ctx.lineTo(W/2+10,ky-50);ctx.lineTo(W/2+2,ky+20);ctx.lineTo(W/2-2,ky+20);ctx.fill();ctx.fillStyle='#78350f';ctx.fillRect(W/2-5,ky-90,14,40);
   ctx.fillStyle=C.mu;ft(ctx,600,12);ctx.fillText('melting point '+e.mp+' °C · stored under oil',W/2,H-12)}
  else if(m==='trough'){head(ctx,A.step===4?'Further down: Rb and Cs':'Group 1 meets water','');trough(ctx)}
  else if(m==='test'){head(ctx,'What did sodium make?','');trough(ctx);const g=tg(),jx=g.x+g.w*.78,jw=34;ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2;ctx.strokeRect(jx,g.y-20,jw,g.h*.55);
   ctx.fillStyle=C.tx;ft(ctx,700,12);ctx.fillText(G.pop?'POP!':'gas',jx+jw/2,g.y-26);
   const tool=(x,y,k)=>{if(k==='i'){ctx.fillStyle='#16a34a';ctx.fillRect(x-5,y-26,10,30);ctx.fillStyle='#111827';ctx.fillRect(x-7,y-38,14,12)}else{ctx.fillStyle='#a16207';ctx.fillRect(x-3,y-34,6,38);ctx.fillStyle='#f97316';ctx.beginPath();ctx.ellipse(x,y-40,5,9,0,0,7);ctx.fill()}};
   const s=sh();if(!G.ind)tool(G.dr==='i'?G.dp.x:s.x(0)+20,G.dr==='i'?G.dp.y:s.y+44,'i');if(!G.pop)tool(G.dr==='s'?G.dp.x:s.x(0)+70,G.dr==='s'?G.dp.y:s.y+44,'s');
   ctx.fillStyle=C.mu;ft(ctx,600,11);ctx.fillText('indicator',s.x(0)+20,s.y+58);ctx.fillText('lit splint',s.x(0)+70,s.y+58)}
  else if(m==='atom'){const a=at(),el=M[G.pk],n=el.sh.length,rs=a.r/(n+.4);head(ctx,`${cap(el.n)}: ${el.sh.join(',')}`,G.pull[G.pk]?`${el.ie} kJ/mol to remove`:'drag the outer electron away');
   el.sh.forEach((k,j)=>{const r=rs*(j+1),outer=j===n-1;ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(a.cx,a.cy,r,0,7);ctx.stroke();
    if(!outer)for(let q=0;q<k;q++){const t=q*6.283/k;A.paint.ball(a.cx+r*Math.cos(t),a.cy+r*Math.sin(t),2.6,A.alpha(C.tx,.55))}});
   A.paint.ball(a.cx,a.cy,Math.max(10,rs*.5),'#be123c');ctx.fillStyle='#fff';ft(ctx,700,11);ctx.textBaseline='middle';ctx.fillText('+'+[3,11,19][G.pk],a.cx,a.cy);
   const ro=rs*n,home={x:a.cx+ro,y:a.cy},p=G.dr==='e'&&G.dp?G.dp:G.pull[G.pk]?{x:W-16,y:a.cy-a.r*.7}:home;
   if(G.dr==='e'){ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(home.x,home.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.setLineDash([])}
   A.paint.ball(p.x,p.y,7,C.cy);const bars=M.slice(0,3);bars.forEach((b,i)=>{const y=H-14-(2-i)*16,bw=(W*.3)*b.ie/520;ctx.fillStyle=G.pull[i]?C.am:A.alpha(C.tx,.12);ctx.fillRect(12,y-8,bw,10);ctx.fillStyle=C.tx;ft(ctx,600,11,'left');ctx.fillText(`${b.s} ${G.pull[i]?b.ie:'?'}`,16+bw,y)})}
  else if(G.Q){head(ctx,G.Q.t,'');ft(ctx,800,A.narrow?22:28);ctx.fillStyle=C.tx;ctx.fillText(G.Q.big,W/2,top()+(H-top())*.3);const n=5,w=Math.min(64,(W-24)/n-6),y=top()+(H-top())*.5;ft(ctx,700,13);M.forEach((e,i)=>{const x=W/2+(i-2)*(w+6),on=G.Q.hl.includes(i);ctx.fillStyle=on?A.alpha(C.am,.3):A.alpha(C.tx,.07);A.paint.rrect(x-w/2,y,w,w*1.2,8);ctx.fill();ctx.fillStyle=C.tx;ctx.fillText(e.s,x,y+w*.4);ft(ctx,500,10);ctx.fillText(e.sh.length+' shells',x,y+w*.9);ft(ctx,700,13)});ctx.fillStyle=C.mu;ft(ctx,600,11);ctx.fillText('Group 1, top to bottom →',W/2,y+w*1.2+18)}
  if(G.flash>0){ctx.strokeStyle=A.alpha(C.gr,G.flash);ctx.lineWidth=5;ctx.strokeRect(4,4,W-8,H-8)}A.fx.draw(ctx)}
 // ---- actions ----
 function cut(){if(G.cut)return;G.cut=1;G.dull=0;A.sound.pop();const k=G.m;A.tween(G,{dull:1},M[k].tn*1000,'io',status);setTimeout(()=>G.m===k&&G.cut&&status(),M[k].tn*520);status()}
 function drop(i){if(G.inW.includes(i))return;G.inW.push(i);A.sound.pop();G.flash=.5;A.tween(G,{flash:0},500,'out');status()}
 function ind(){G.ind=1;A.sound.tick();status()}function splint(){G.pop=1;A.sound.pop();G.flash=.8;A.tween(G,{flash:0},500,'out');status()}
 function pull(i){G.pk=i;if(!G.pull[i]){G.pull[i]=1;A.sound.pop()}status()}
 function sync(){if(!A)return;if(A.step!==6)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.disabled=!!dis;e.onclick=()=>{f();A.sound.tick()}};
  if(m==='cut'){M.slice(0,3).forEach((e,i)=>B(cap(e.n),()=>{G.m=i;G.cut=0;G.dull=0;status()},G.m===i));B('Cut it',cut,G.cut)}
  if(m==='trough'){for(let i=0;i<nM();i++)B('Drop in '+M[i].n,()=>drop(i),G.inW.includes(i));B('Empty the trough',()=>{G.inW=[];status()})}
  if(m==='test'){B('Add indicator',ind,G.ind);B('Hold a lit splint to the gas',splint,G.pop)}
  if(m==='atom'){M.slice(0,3).forEach((e,i)=>B(cap(e.n),()=>{G.pk=i;status()},G.pk===i));B('Pull the outer electron off',()=>pull(G.pk),G.pull[G.pk])}A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null},play=(fs,ms=500)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 const steps=[
  {h:'Cut it open',p:'Group 1 metals are kept under oil. Pick a metal, then drag the knife down through the block, or press Cut it.',
   predict:{q:'A fresh cut face of sodium is shiny. After a few minutes in air it will be…',opts:['still shiny, like most metals','dull and grey','on fire'],ans:1},task:'Cut the sodium and watch the new face',show:()=>play([()=>{G.m=1;G.cut=0;status()},cut]),
   go:()=>{fresh();G.m=1;G.cut=0;G.dull=0;status();G.want=fin(0,()=>G.cut&&G.m===1,()=>'Sodium is soft enough to cut, and the shiny face dulls as it reacts with oxygen: 4Na + O₂ → 2Na₂O. Try lithium and potassium too: the further down, the faster it tarnishes.')}},
  {h:'Into the water',p:'Drag each metal onto the water, or use the buttons. Watch where it sits and how fast it reacts.',
   predict:{q:'A lump of lithium dropped into water will be…',opts:['sunk at the bottom, like most metals','floating','dissolved without bubbles'],ans:1},task:'Drop all three metals into the water',show:()=>play([()=>drop(0),()=>drop(1),()=>drop(2)]),
   go:()=>{fresh();G.inW=[];G.ind=0;status();G.want=fin(1,()=>[0,1,2].every(i=>G.inW.includes(i)),()=>'All three float (densities under 1 g/cm³) and fizz. Lithium is steady, sodium melts into a ball and whizzes, potassium sets its hydrogen alight with a lilac flame. Reactivity rises down the group.')}},
  {h:'What formed?',p:'Sodium has already reacted. Drag the indicator into the water and the lit splint to the gas, or use the buttons.',
   predict:{q:'After the reaction the water is…',opts:['still neutral: it is just water','acidic','alkaline'],ans:2},task:'Test the water and the gas',show:()=>play([ind,splint]),
   go:()=>{fresh();G.inW=[1];G.ind=0;G.pop=0;status();G.want=fin(2,()=>G.ind&&G.pop,()=>'Purple means alkaline: sodium hydroxide. The squeaky pop means hydrogen. 2Na + 2H₂O → 2NaOH + H₂. Hydroxides like this are alkalis, which gives the group its name.')}},
  {h:'Why lower is faster',p:'Each atom has one outer electron. Pick an atom and drag its outer electron away. Too short a drag and the nucleus pulls it back. The bars show the energy needed.',
   predict:{q:'Which atom loses its outer electron most easily?',opts:['lithium: it has the fewest electrons','all the same: each has one outer electron','potassium'],ans:2},task:'Pull the outer electron off all three atoms',show:()=>play([()=>pull(0),()=>pull(1),()=>pull(2)]),
   go:()=>{fresh();G.pull=[0,0,0];G.pk=0;status();G.want=fin(3,()=>G.pull.every(x=>x),()=>'Potassium needs least: 419 kJ/mol against 520 for lithium. Its outer electron is in a shell further from the nucleus, with more inner shells shielding it, so it is held less strongly and lost more easily.')}},
  {h:'Predict rubidium',p:'Rubidium and caesium sit below potassium. Drop them in.',
   predict:{q:'Compared with potassium, rubidium in water will be…',opts:['gentler','more violent','not reacting: it is too heavy'],ans:1},task:'Drop rubidium into the water',show:()=>play([()=>drop(3)]),
   go:()=>{fresh();G.inW=[];G.ind=0;status();G.want=fin(4,()=>G.inW.includes(3),()=>'Explosive, as the trend predicts. Careful with the float rule: rubidium (1.53 g/cm³) and caesium are denser than water, so they sink.')}},
  {h:'Sandbox',p:'All five metals. Say what each will do before you drop it.',go:()=>{fresh();G.inW=[];G.ind=0;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const KS=['more','prod','ion','why','form','more','prod'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3,a=qn%3,b=a+1+qn%2,e=M[a+(qn%2)];let q,ops,t='',big='';
  if(k==='more'){t='More vigorous?';big=`${M[a].s}  vs  ${M[b].s}`;q=`Which reacts more vigorously with water, ${M[a].n} or ${M[b].n}?`;ops=[[M[b].n,'ok'],[M[a].n,'rev'],['the same: both have one outer electron','same']]}
  else if(k==='prod'){t='Products';big=`${e.s} + H₂O`;q=`What forms when ${e.n} reacts with water?`;ops=[[`${e.n} hydroxide + hydrogen`,'ok'],[`${e.n} oxide + hydrogen`,'ox'],[`${e.n} hydroxide + oxygen`,'o2']]}
  else if(k==='ion'){t='Ion charge';big=e.s+'?';q=`What ion does ${e.n} form?`;ops=[[e.s+'⁺','ok'],[e.s+'⁻','neg'],[e.s+'²⁺','two']]}
  else if(k==='why'){t='Why?';big='Na → K';q='Why is potassium more reactive than sodium?';ops=[['Its outer electron is further from the nucleus, so it is lost more easily','ok'],['It has more protons, so it pulls harder on electrons','prot'],['It gains electrons more easily','gain']]}
  else{t='Formula';big=`${e.s} + Cl₂`;q=`${cap(e.n)} burns in chlorine. What is the formula of the product?`;ops=[[e.s+'Cl','ok'],[e.s+'Cl₂','cl2'],[e.s+'₂Cl','two2']]}
  G.Q={k,t,big,e,hl:k==='more'?[a,b]:k==='why'?[1,2]:[M.indexOf(e)]};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j).concat(ops.slice(0,j)).forEach(([s,tag])=>{const x=c.el('button',{type:'button',class:'lbtn sm'},row,s);x.onclick=()=>judge(tag)});
  G.cq='Challenge: '+q;A.cv.setAttribute('aria-label',G.cq);c.say(G.cq);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Right.';
  else if(tag==='rev')m='Reactivity rises going down Group 1, the opposite of Group 7. The lower metal reacts faster.';
  else if(tag==='same')m='Same outer electron count, but not the same distance from the nucleus. Lower down it is lost more easily.';
  else if(tag==='ox')m='In water the product is a hydroxide, which is why the water turns alkaline. Oxides form when the metal reacts with oxygen.';
  else if(tag==='o2')m='The gas gives a squeaky pop: hydrogen. The oxygen stays in the hydroxide.';
  else if(tag==='neg')m='Group 1 atoms lose their one outer electron, so they are left with one more proton than electrons: 1+.';
  else if(tag==='two')m='Only one outer electron is lost. Losing a second would mean breaking into a full inner shell.';
  else if(tag==='prot')m='It does have more protons, but more inner shells shield the outer electron, and it is further away, so the pull is weaker.';
  else if(tag==='gain')m='Metals react by losing electrons. Gaining is the halogen story.';
  else if(tag==='cl2')m=`${G.Q.e.s}⁺ and Cl⁻ have equal and opposite charges, so one of each: ${G.Q.e.s}Cl.`;
  else m=`One ${G.Q.e.s}⁺ balances one Cl⁻; there is no need for two metal ions.`;
  if(tag==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;read.hidden=A.step===6;pad.hidden=A.step===6;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.every(dt=>{const m=mode();if(m==='trough'&&G.inW.length||m==='test'){G.t+=dt;return!A.reduced()}return false});
   const near=(p,x,y,r)=>Math.hypot(p.x-x,p.y-y)<r;
   A.gest({down:p=>{const m=mode();G.dp=p;
     if(m==='cut'){if(G.cut)return false;G.dr='k';return true}
     if(m==='trough'){const s=sh();for(let i=0;i<nM();i++)if(!G.inW.includes(i)&&p.x>s.x(i)-6&&p.x<s.x(i)+s.s+6&&p.y<s.y+s.s+10){G.dr=i;return true}return false}
     if(m==='test'){const s=sh();if(!G.ind&&near(p,s.x(0)+20,s.y+30,30)){G.dr='i';return true}if(!G.pop&&near(p,s.x(0)+70,s.y+30,30)){G.dr='s';return true}return false}
     if(m==='atom'){const a=at(),rs=a.r/(M[G.pk].sh.length+.4);if(!G.pull[G.pk]&&near(p,a.cx+rs*M[G.pk].sh.length,a.cy,30)){G.dr='e';return true}}return false},
    move:p=>{G.dp=p;if(G.dr==='k'){const b=bk();if(p.y>b.y+b.h*.85)cut()}A.redraw()},
    up:p=>{const d=G.dr,m=mode();G.dr=null;if(d==null)return;const g=tg();
     if(m==='trough'&&p.y>g.y-10)drop(d);else if(d==='i'&&p.y>g.y)ind();else if(d==='s'&&p.x>g.x+g.w*.7&&p.y<g.y+g.h*.6)splint();
     else if(d==='e'){const a=at(),e=M[G.pk],n=e.sh.length;if(Math.hypot(p.x-a.cx,p.y-a.cy)>a.r*(n/(n+.4)+.55*(e.ie-350)/170))pull(G.pk);else tell(`Not far enough: the nucleus pulled it back. Drag ${M[G.pk].n}'s electron further out.`)}
     A.redraw()}});
   sync()}});
 A.start()})})();
