/* Flagship 28 – alkanes. A carbon-chain builder. The learner drags the dashed "ghost" carbon at the end of the chain (or
   presses Add carbon / Remove carbon) to grow or shrink a straight chain from 1 to 8 carbons. Hydrogens fill every free
   bond automatically, so each carbon always has four bonds, and a small number under each carbon shows how many H it
   holds (3 at each end, 2 in the middle). The header keeps the formula, the name and a live check against CₙH₂ₙ₊₂.
   Tapping a carbon draws its four bonds and counts them; "Add a hydrogen" bounces off because no carbon has a free bond
   (saturated). Tapping a C–C bond makes it a double bond: two H atoms leave, the formula becomes CₙH₂ₙ and the badge
   says "not an alkane". Predictions target "4 H per carbon", "each carbon adds 4", "you can always add one more H" and
   "a C=C hydrocarbon is still an alkane". Challenge: from the number of carbons (or the name) pick the H count or the
   formula; feedback names the slip (2n, forgot the end H; 4n, ignored the C–C bonds; 2n+1, one end only). */
(()=>{const SUBS='₀₁₂₃₄₅₆₇₈₉',sub=k=>k>1?String(k).replace(/\d/g,d=>SUBS[d]):'';
 const STEM=['meth','eth','prop','but','pent','hex','hept','oct'],NMAX=8;
 const hOn=(n,i,dbl)=>{let h=(n===1?4:(i===0||i===n-1)?3:2);if(dbl!=null&&(i===dbl||i===dbl+1))h--;return h};
 const hTotal=(n,dbl)=>{let t=0;for(let i=0;i<n;i++)t+=hOn(n,i,dbl);return t};
 const fml=(n,dbl)=>`C${sub(n)}H${sub(hTotal(n,dbl))}`;
 const nameOf=(n,dbl)=>STEM[n-1]+(dbl==null?'ane':'ene');
VIS.reg('flagalk',c=>{let A,pad,chal,read;const hit=[];
 const K={n:1,dbl:null,checked:new Set(),tried:0,grow:1,ring:-1,ringA:0,bump:0,drag:false,hideH:false,hideAll:false,run:0,want:()=>{}};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const isAlk=()=>K.dbl==null;
 function setN(n,quiet){n=Math.max(1,Math.min(NMAX,n));if(n===K.n)return;const up=n>K.n;K.n=n;if(K.dbl!=null&&K.dbl>=n-1)K.dbl=null;K.checked=new Set();K.ring=-1;
  K.grow=0;A.tween(K,{grow:1},380,'back');A.sound[up?'pop':'tick']();
  if(!quiet)say(`${nameOf(K.n,K.dbl)}, ${fml(K.n,K.dbl)}: ${K.n} carbon${K.n>1?'s':''} and ${hTotal(K.n,K.dbl)} hydrogens.`);sync();K.want()}
 function inspect(i){if(i<0||i>=K.n)return;K.checked.add(i);K.ring=i;K.ringA=0;A.tween(K,{ringA:1},420,'out');A.sound.tick();
  const cc=(i>0?1:0)+(i<K.n-1?1:0)+((K.dbl!=null&&(i===K.dbl||i===K.dbl+1))?1:0),h=hOn(K.n,i,K.dbl);
  say(`Carbon ${i+1}: ${cc} bond${cc===1?'':'s'} to carbon and ${h} to hydrogen. ${cc+h} bonds in all, so it is full.`);sync();K.want()}
 function tryAddH(){K.tried++;K.bump=1;A.tween(K,{bump:0},520,'el');A.sound.miss();
  say(K.dbl==null?`No room. Every carbon in ${nameOf(K.n,null)} already has four bonds, so no more hydrogen can join. It is saturated.`:
   `The only way in is to open the C=C double bond. That is why a molecule with a C=C is called unsaturated.`);sync();K.want()}
 function toggleBond(j){if(K.n<2)return say('Methane has one carbon, so there is no C–C bond to change.');
  if(j==null)j=Math.floor((K.n-2)/2);K.dbl=K.dbl===j?null:j;K.checked=new Set();K.ring=-1;A.sound.pop();
  say(K.dbl==null?`Back to single bonds: ${fml(K.n,null)}, ${nameOf(K.n,null)}. It fits CₙH₂ₙ₊₂, so it is an alkane.`:
   `A C=C double bond takes two hydrogens away: ${fml(K.n,K.dbl)} has only ${hTotal(K.n,K.dbl)}, not ${2*K.n+2}. It is ${nameOf(K.n,K.dbl)}, not an alkane.`);sync();K.want()}
 function play(list){const tok=++K.run;let j=0;const go=()=>{if(tok!==K.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},420,'io',go)};go()}
 function describe(){const n=K.n,h=hTotal(n,K.dbl);if(K.hideAll)return `An alkane with ${2*n+2} hydrogen atoms. The chain is hidden until you answer.`;if(K.hideH)return `A chain of ${n} carbon atoms. Hydrogens hidden until you answer.`;
  return `${nameOf(n,K.dbl)}, ${fml(n,K.dbl)}: ${n} carbon${n>1?'s':''} in a chain, ${h} hydrogens, ${K.dbl==null?'all single bonds':'one C=C double bond'}. `+
   (isAlk()?`Fits CₙH₂ₙ₊₂: 2 × ${n} + 2 = ${2*n+2}, an alkane.`:`Does not fit CₙH₂ₙ₊₂, which needs ${2*n+2}: not an alkane.`)+(K.checked.size?` Carbons checked: ${K.checked.size} of ${n}.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(pad){pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
   if(s!==6){b('− Carbon','Remove a carbon from the chain',()=>setN(K.n-1),K.n<=1);b('+ Carbon','Add a carbon to the chain',()=>setN(K.n+1),K.n>=NMAX)}
   if(s===3||s===5){b('Check next carbon','Count the bonds on the next unchecked carbon',()=>{const i=[...Array(K.n).keys()].find(q=>!K.checked.has(q));inspect(i==null?0:i)});b('Add a hydrogen','Try to add one more hydrogen atom',tryAddH)}
   if(s>=4&&s!==6)b(K.dbl==null?'Make a C=C':'All single bonds',K.dbl==null?'Make one carbon to carbon bond double':'Make every bond single again',()=>toggleBond(K.dbl),K.n<2)}
  A.redraw()}
 // ---- drawing ----
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;hit.length=0;
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.gr,.05)],[1,A.mix(C.pn,C.cy,.07)]]);ctx.fillRect(0,0,W,H);
  const n=K.n,dbl=K.dbl,u=Math.min(A.narrow?56:74,(W-28)/(NMAX+.9)),x0=14+u*.62,yc=H*(A.narrow?.52:.55),arm=u*(A.narrow?.98:.9),rC=Math.max(10,u*.27),rH=Math.max(8,u*.2);
  const cx=i=>x0+i*u,shake=K.bump*Math.sin(K.bump*30)*5;
  // header: formula, name, badge
  const fz=A.narrow?22:28;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font=`800 ${fz}px system-ui`;ctx.fillStyle=C.tx;
  const head=K.hideAll?`C?H${sub(2*n+2)}`:K.hideH?`C${sub(n)}H?`:fml(n,dbl);ctx.fillText(head,12,fz+6);const hw=ctx.measureText(head).width;
  ctx.font=`600 ${A.narrow?13:15}px system-ui`;ctx.fillStyle=C.mu;ctx.fillText(K.hideAll?'how many C?':K.hideH?'how many H?':nameOf(n,dbl),20+hw,fz+5);
  if(!K.hideH&&A.step>=2){const ok=isAlk(),t=ok?`2 × ${n} + 2 = ${2*n+2} ✓ alkane`:`${hTotal(n,dbl)} ≠ 2 × ${n} + 2 ✗ not an alkane`;
   P.label(t,12,fz+28,{align:'left',font:'700 12px system-ui',bg:A.alpha(ok?C.gr:C.rd,.9),col:'#fff'})}
  if(K.hideAll){ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.mu;ctx.font=`700 ${A.narrow?14:16}px system-ui`;ctx.fillText('The chain appears when you answer.',W/2,yc);return}
  // bonds then atoms
  ctx.lineCap='round';const bond=(x1,y1,x2,y2,two,hot)=>{ctx.strokeStyle=hot?C.am:C.tx;ctx.lineWidth=hot?3.4:2.4;const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ox=-dy/L*3.4,oy=dx/L*3.4;
   for(const s of two?[-1,1]:[0]){ctx.beginPath();ctx.moveTo(x1+ox*s,y1+oy*s);ctx.lineTo(x2+ox*s,y2+oy*s);ctx.stroke()}};
  const g=K.grow;for(let i=0;i<n-1;i++){const last=i===n-2,xa=cx(i),xb=last?cx(i)+(cx(i+1)-cx(i))*g:cx(i+1);bond(xa,yc,xb,yc,dbl===i,K.ring===i||K.ring===i+1);
   hit.push({k:'bond',j:i,x:(cx(i)+cx(i+1))/2,y:yc,R:Math.max(14,u*.3)})}
  const Hs=[];for(let i=0;i<n;i++){const h=hOn(n,i,dbl),x=cx(i),dirs=[];if(n===1){dirs.push([0,-1],[0,1],[-1,0],[1,0])}else{
    if(i===0)dirs.push([-1,0]);if(i===n-1)dirs.push([1,0]);dirs.push([0,-1]);if(!(dbl!=null&&(i===dbl||i===dbl+1)))dirs.push([0,1])}
   dirs.slice(0,h).forEach(([dx,dy])=>Hs.push({i,x:x+dx*arm*(dx?.82:1),y:yc+dy*arm}))}
  const fade=i=>i===n-1?g:1;
  if(!K.hideH)Hs.forEach(q=>{ctx.globalAlpha=fade(q.i);bond(cx(q.i),yc,q.x,q.y,false,K.ring===q.i);ctx.globalAlpha=1});
  if(!K.hideH)Hs.forEach(q=>{ctx.globalAlpha=fade(q.i);P.ball(q.x+(q.y<yc?shake:0),q.y,rH,A.mix(C.cy,'#ffffff',.5));ctx.fillStyle='#111';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${Math.round(rH*1.05)}px system-ui`;ctx.fillText('H',q.x+(q.y<yc?shake:0),q.y+1);ctx.globalAlpha=1});
  for(let i=0;i<n;i++){const x=cx(i);ctx.globalAlpha=fade(i);P.shadow(6,2,.22);P.ball(x,yc,rC,'#3f3f46');P.noShadow();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${Math.round(rC*.95)}px system-ui`;ctx.fillText('C',x,yc+1);
   if(K.ring===i){ctx.strokeStyle=A.alpha(C.am,K.ringA);ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,yc,rC+5+6*(1-K.ringA),0,7);ctx.stroke();P.label('4 bonds ✓',x,yc-arm-rH-14,{font:'700 11px system-ui',bg:A.alpha(C.am,.95),col:'#111'})}
   else if(K.checked.has(i)){ctx.strokeStyle=C.gr;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,yc,rC+4,0,7);ctx.stroke()}
   if(A.step>=1&&!K.hideH){ctx.fillStyle=C.mu;ctx.font=`700 ${A.narrow?11:12}px system-ui`;ctx.fillText(`${hOn(n,i,dbl)}H`,x,yc+arm+rH+12)}
   ctx.globalAlpha=1;hit.push({k:'c',i,x,y:yc,R:rC+5})}
  // ghost carbon handle
  if(A.step!==6&&n<NMAX){const gx=K.drag?K.dx:cx(n-1)+u*1.55;ctx.setLineDash([5,4]);ctx.strokeStyle=A.alpha(C.ac,.85);ctx.lineWidth=2;ctx.beginPath();ctx.arc(gx,yc,rC,0,7);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.ac;ctx.font=`800 ${Math.round(rC)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('+',gx,yc+1);hit.push({k:'ghost',x:gx,y:yc,R:rC+8})}
  if(A.step<=1||A.step===4)P.label(A.step===4?'tap a C–C bond':A.narrow?'drag the + carbon':'drag the dashed + carbon to grow the chain',W/2,H-14,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
 // ---- steps ----
 const fresh=n=>{K.run=(K.run||0)+1;K.n=n;K.dbl=null;K.checked=new Set();K.tried=0;K.ring=-1;K.grow=1;K.hideH=false;K.hideAll=false;K.want=()=>{};if(read)read.textContent=''};
 const need=(i,test,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&test())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Four bonds each',p:'Methane, CH₄, is the smallest alkane. Its carbon makes four bonds, all to hydrogen. Add a second carbon and watch what happens.',
   predict:{q:'Ethane has 2 carbons joined by a single bond. How many hydrogens does it have?',opts:['8: four per carbon','6','4: two per carbon'],ans:1},
   task:'Drag the dashed + carbon (or press + Carbon) to make a chain of 2',show:()=>play([()=>setN(2)]),
   go:()=>{fresh(1);K.want=need(0,()=>K.n===2,'Ethane is C₂H₆. One bond on each carbon now joins the two carbons, so each has room for only 3 H.')}},
  {h:'Count up the chain',p:'Each carbon still makes four bonds. The small numbers show how many hydrogens sit on each carbon.',
   predict:{q:'Butane has 4 carbons in a chain. How many hydrogens?',opts:['8','10','16'],ans:1},
   task:'Grow the chain to 4 carbons and read the H numbers',show:()=>play([()=>setN(3),()=>setN(4)]),
   go:()=>{fresh(2);K.want=need(1,()=>K.n===4,'Butane is C₄H₁₀: 3 + 2 + 2 + 3. End carbons hold 3 H, middle carbons hold 2.')}},
  {h:'Find the pattern',p:'Alkanes share one general formula, CₙH₂ₙ₊₂. The green check tests it for every chain you build.',
   predict:{q:'Adding one more carbon to the chain adds how many hydrogens?',opts:['4: one for each bond','2: one above, one below','3: like an end carbon'],ans:1},
   task:'Build the alkane that has 14 hydrogen atoms',show:()=>play([()=>setN(5),()=>setN(6)]),
   go:()=>{fresh(4);K.want=need(2,()=>K.n===6,'Hexane, C₆H₁₄: 2 × 6 + 2 = 14. Each new carbon brings 2 H, and the 2 extra H cap the ends.')}},
  {h:'Saturated',p:'Propane is the gas in many camping stoves. Check its carbons one by one, then try to squeeze in one more hydrogen.',
   predict:{q:'Can propane, C₃H₈, take one more hydrogen atom?',opts:['Yes, on the middle carbon','No, every carbon already has four bonds','Yes, on an end carbon'],ans:1},
   task:'Tap each carbon to count its bonds, then press Add a hydrogen',show:()=>play([()=>inspect(0),()=>inspect(1),()=>inspect(2),tryAddH]),
   go:()=>{fresh(3);K.want=need(3,()=>K.checked.size===K.n&&K.tried>0,'Every carbon has four bonds and none is free. Alkanes hold as much hydrogen as they can: they are saturated.')}},
  {h:'Single bonds only',p:'Every bond in an alkane is a single bond. Tap the bond between two carbons to make it double.',
   predict:{q:'Make one C–C bond in propane double. Is it still an alkane?',opts:['Yes: it is still only C and H','No: a C=C means it is not saturated','Yes: it still has 3 carbons'],ans:1},
   task:'Tap a C–C bond (or press Make a C=C)',show:()=>play([()=>toggleBond(0)]),
   go:()=>{fresh(3);K.want=need(4,()=>K.dbl!=null,'Propene, C₃H₆, lost 2 H to the double bond. It is a hydrocarbon, but it is an alkene, not an alkane.')}},
  {h:'Sandbox',p:'Build any chain from methane to octane. Add a double bond, check carbons, try to add hydrogen. Watch the CₙH₂ₙ₊₂ check.',go:()=>{fresh(5)}},
  {h:'Challenge',p:'',go:()=>{fresh(3);ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>K.want()});
 // ---- challenge ----
 const KINDS=['h','f','c','h','f','h','c','f'];let qn=0,streak=0,Q=null;
 function ask(){const n=2+(qn*5+3)%7,kind=KINDS[qn%KINDS.length];qn++;K.n=Math.min(n,NMAX);K.dbl=null;K.hideH=true;
  K.hideAll=kind==='c';const right=kind==='c'?n:2*n+2,opts=kind==='c'?[{v:n,s:'ok'},{v:n+1,s:'half'},{v:n+2,s:'add'},{v:2*n,s:'nohalf'}]:[{v:2*n+2,s:'ok'},{v:2*n,s:'2n'},{v:4*n,s:'4n'},{v:2*n+1,s:'1end'}];
  const seen=new Set(),uniq=opts.filter(o=>!seen.has(o.v)&&seen.add(o.v));for(let i=uniq.length-1;i>0;i--){const j=(i*7+qn)%(i+1);[uniq[i],uniq[j]]=[uniq[j],uniq[i]]}
  const hN=2*n+2,q=kind==='h'?`An alkane has ${n} carbon atoms. How many hydrogen atoms does it have?`:kind==='f'?`What is the formula of ${nameOf(n,null)}?`:`An alkane has ${hN} hydrogen atoms. How many carbon atoms does it have?`;
  Q={n,kind,right};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');uniq.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,kind==='f'?`C${sub(n)}H${sub(o.v)}`:String(o.v));b.onclick=()=>judge(o)});sync()}
 function judge(o){const fb=chal.querySelector('.fl-fb'),{n,kind}=Q,h=2*n+2;let m;chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);K.hideH=false;K.hideAll=false;sync();
  if(o.s==='ok'){streak++;A.win();m=`Right: CₙH₂ₙ₊₂ gives ${kind==='c'?`(${h} − 2) ÷ 2 = ${n}`:`2 × ${n} + 2 = ${h}`}, so ${nameOf(n,null)} is C${sub(n)}H${sub(h)}. Streak: ${streak}.`}
  else{streak=0;A.sound.miss();
   if(o.s==='2n')m=`That is 2 × ${n}, which forgets the end hydrogens. The two end carbons each hold one extra H, so add 2: ${h}. (C${sub(n)}H${sub(2*n)} would be an alkene.)`;
   else if(o.s==='4n')m=`Four bonds per carbon gives ${4*n}, but the ${n-1} C–C bond${n>2?'s':''} use up ${2*(n-1)} of those bonds, so they cannot hold H. ${4*n} − ${2*(n-1)} = ${h}.`;
   else if(o.s==='1end')m=`2 × ${n} + 1 caps only one end of the chain. Both end carbons have one extra H, so it is 2 × ${n} + 2 = ${h}.`;
   else if(o.s==='half')m=`${h} ÷ 2 = ${n+1} skips a step: first take away the 2 end hydrogens, then halve. (${h} − 2) ÷ 2 = ${n}.`;
   else if(o.s==='add')m=`Working backwards means undoing + 2, so subtract 2, do not add it. (${h} − 2) ÷ 2 = ${n}, not ${n+2}.`;
   else m=`${h} − 2 = ${2*n} is the number of hydrogens on the 2-per-carbon part. Halve it to get the carbons: ${n}.`}
  fb.innerHTML=`${o.s==='ok'?'✓ ':'✗ Not quite. '}${m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)K.hideH=K.hideAll=false;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Build the carbon chain'},box);chal=E('div',{class:'fl-chal'},A.below);
   const unit=()=>Math.min(A.narrow?56:74,(A.W-28)/(NMAX+.9)),x0=()=>14+unit()*.62;
   A.gest({down:p=>{const t=hit.find(q=>Math.hypot(p.x-q.x,p.y-q.y)<=q.R);if(!t||A.step===6)return false;
     if(t.k==='ghost'){K.drag=true;K.dx=p.x;A.redraw();return true}if(t.k==='c'){inspect(t.i);return false}if(t.k==='bond'&&A.step>=4){toggleBond(t.j);return false}
     if(t.k==='bond')say('Bonds can be changed from step 5. For now, grow the chain with the + carbon.');return false},
    move:p=>{if(!K.drag)return;K.dx=p.x;const want=Math.round((p.x-x0())/unit()-.55);if(want!==K.n&&want>=1)setN(want);A.redraw()},
    up:()=>{K.drag=false;A.redraw()}});sync()}});
 A.start()})})();
