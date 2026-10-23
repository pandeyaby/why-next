/* Flagship 31 – alkenes. A "finish the drawing" bench plus a bromine-water tube. The learner gets a bare carbon skeleton
   with its C=C already drawn and must add the hydrogens by tapping each carbon (or its Add H button). Nothing is filled
   automatically: a carbon that already has four bonds refuses another H and says why (the double bond counts as two), so
   the learner discovers that the two C=C carbons each hold one H fewer than in the alkane, and the formula settles on CₙH₂ₙ.
   A formula log fills in ethene, propene and butene as they are finished. In the bromine step the learner drags the Br₂
   chip onto the molecule: on an alkene the C=C opens, a Br lands on each carbon and the orange tube fades to colourless;
   on an alkane there is no free bond, the Br₂ bounces and the tube stays orange, which is what "unsaturated" means.
   A formula wall then tests six formulae against CₙH₂ₙ. Predictions target "each C=C carbon still holds 3 H", "the middle
   carbon of propene holds 2", "butene is C₄H₁₀", "both tubes go colourless" and "alkenes stop at butene". Challenge: the
   formula of an alkene, which formula is an alkene, what the bromine result shows, and H on a given carbon; feedback
   names the slip (used CₙH₂ₙ₊₂, removed only one H, counted the double bond as one bond, swapped the test result). */
(()=>{const SB='₀₁₂₃₄₅₆₇₈₉',lo=k=>k>1?String(k).replace(/\d/g,d=>SB[d]):'',STEM=['','meth','eth','prop','but','pent'];
 const fm=(n,h,br)=>`C${lo(n)}H${lo(h)}${br?`Br${lo(br)}`:''}`;
 const room=(m,i)=>4-((i>0)+(i<m.n-1))-(m.dbl!=null&&(i===m.dbl||i===m.dbl+1)?1:0)-m.h[i]-m.br[i];
 const totalH=m=>m.h.reduce((a,b)=>a+b,0),need=m=>m.h.map((_,i)=>room(m,i)).reduce((a,b)=>a+b,0);
 const name=m=>STEM[m.n]+(m.dbl!=null?'ene':m.br.some(x=>x)?'ane':'ane');
 const mk=(n,dbl,filled)=>{const m={n,dbl,h:Array(n).fill(0),br:Array(n).fill(0),orange:1};if(filled)for(let i=0;i<n;i++)m.h[i]=room(m,i);return m};
 const CHIPS=[[3,8],[3,6],[4,8],[2,6],[5,10],[4,10]];
VIS.reg('flagalkene',c=>{let A,pad,chal,read;const hot=[];
 const W={m:mk(2,0,false),log:new Map(),tested:new Set(),chips:new Set(),view:'mol',chip:null,drag:null,bounce:0,pop:{},goal:()=>{},run:0,mark:-1};
 const say=t=>{t=t.charAt(0).toUpperCase()+t.slice(1);c.say(t);if(read)read.textContent=t};
 const bondsOf=(m,i)=>((i>0)+(i<m.n-1))+(m.dbl!=null&&(i===m.dbl||i===m.dbl+1)?1:0)+m.h[i]+m.br[i];
 function addH(i){const m=W.m;if(i<0||i>=m.n)return;if(room(m,i)<=0){A.sound.miss();W.bounce=1;W.mark=i;A.tween(W,{bounce:0},500,'out');
   const d=m.dbl!=null&&(i===m.dbl||i===m.dbl+1);say(`Carbon ${i+1} already has 4 bonds: ${m.h[i]} H${d?' plus the double bond, which counts as 2':''}${(i>0)+(i<m.n-1)-(d?1:0)>0?` plus ${(i>0)+(i<m.n-1)-(d?1:0)} single C–C bond${(i>0)+(i<m.n-1)-(d?1:0)>1?'s':''}`:''}. No room for another H.`);sync();return}
  m.h[i]++;W.mark=i;W.pop[i]=1;A.tween(W.pop,{[i]:0},420,'out');A.sound.tick();const left=need(m);
  if(!left){const k=m.n;A.sound.pop();if(m.dbl!=null)W.log.set(k,totalH(m));say(`Done: ${name(m)}, ${fm(k,totalH(m))}. ${m.dbl!=null?`${totalH(m)} = 2 × ${k}, so it fits CₙH₂ₙ.`:`${totalH(m)} = 2 × ${k} + 2, an alkane.`}`)}
  else say(`Carbon ${i+1} now has ${bondsOf(m,i)} of 4 bonds. ${left} more H to place.`);sync();W.goal()}
 function delH(){const m=W.m;for(let i=m.n-1;i>=0;i--)if(m.h[i]){m.h[i]--;W.mark=i;A.sound.tick();say(`Took an H off carbon ${i+1}. ${need(m)} H to place.`);break}sync()}
 function setMol(n,dbl,filled){W.m=mk(n,dbl,filled);W.view='mol';W.mark=-1;sync()}
 function bromine(){const m=W.m;if(need(m)){say('Finish the hydrogens first, then test it.');return}
  if(m.dbl!=null){const a=m.dbl;W.tested.add('ene:'+m.n);m.dbl=null;m.br[a]++;m.br[a+1]++;A.sound.pop();A.tween(m,{orange:0},900,'out');
   say(`The C=C opens and one Br joins each carbon: ${fm(m.n,totalH(m),2)}. The tube turns from orange to colourless, so ${STEM[m.n]}ene was unsaturated.`)}
  else{W.tested.add((m.br.some(x=>x)?'used:':'ane:')+m.n);W.bounce=1;A.tween(W,{bounce:0},600,'out');A.sound.miss();
   say(m.br.some(x=>x)?'No C=C is left: the molecule is now saturated, so more Br₂ cannot add and the tube stays as it is.':`${STEM[m.n]}ane has only single bonds and every carbon has 4 already. The Br₂ cannot add, so the tube stays orange: saturated.`)}
  sync();W.goal()}
 function chip(k){const[n,h]=CHIPS[k];W.chips.add(k);W.chip=k;A.sound.tick();
  say(h===2*n?`${fm(n,h)}: 2 × ${n} = ${h}, so it fits CₙH₂ₙ. A chain with this formula is an alkene, ${STEM[n]}ene.`:
   h===2*n+2?`${fm(n,h)}: 2 × ${n} + 2 = ${h}. That is CₙH₂ₙ₊₂, an alkane, ${STEM[n]}ane: saturated.`:`${fm(n,h)} fits neither rule.`);sync();W.goal()}
 function play(list,ms=300){const tok=++W.run;let j=0;const go=()=>{if(tok!==W.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 const fillAll=()=>{const out=[];const m=W.m;for(let i=0;i<m.n;i++)for(let k=room(m,i);k>0;k--)out.push(()=>addH(i));return out};
 function describe(){if(W.view==='chips')return 'Formula wall: '+CHIPS.map(([n,h],k)=>fm(n,h)+(W.chips.has(k)?(h===2*n?' alkene':' alkane'):'')).join(', ')+'.';
  const m=W.m;return `Displayed formula of ${STEM[m.n]}${m.dbl!=null?'ene':'ane'} being drawn: ${m.n} carbons`+(m.dbl!=null?`, C=C between carbon ${m.dbl+1} and ${m.dbl+2}`:'')+'. '+
   m.h.map((h,i)=>`carbon ${i+1}: ${h} H${m.br[i]?`, ${m.br[i]} Br`:''}, ${bondsOf(m,i)} of 4 bonds`).join('; ')+`. Formula so far ${fm(m.n,totalH(m),m.br.reduce((a,b)=>a+b,0))}.`+
   (A.step===3||A.step===5?` Bromine water is ${m.orange>.5?'orange':'colourless'}.`:'')+(W.log.size?` Log: ${[...W.log].map(([n,h])=>fm(n,h)).join(', ')}.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===6)return A.redraw();const m=W.m;
  if(W.view==='mol'&&s!==3){for(let i=0;i<m.n;i++)b(`+H on C${i+1}`,`Add a hydrogen to carbon ${i+1}`,()=>addH(i));b('Undo H','Remove the last hydrogen',delH,!totalH(m))}
  if(s===2)[[2,0],[3,0],[4,0]].forEach(([n,d])=>b(`${STEM[n]}ene`,`Start drawing ${STEM[n]}ene`,()=>setMol(n,d,false),W.log.has(n)));
  if(s===3){b('Ethane','Show ethane',()=>setMol(2,null,true));b('Ethene','Show ethene',()=>setMol(2,0,true));b('Add bromine water','Shake the molecule with bromine water',bromine)}
  if(s===4)CHIPS.forEach(([n,h],k)=>b(fm(n,h),`Test ${fm(n,h)} against CₙH₂ₙ`,()=>chip(k)));
  if(s===5){[[2,0],[3,0],[4,0],[5,0],[2,null],[3,null]].forEach(([n,d])=>b(`${STEM[n]}${d==null?'ane':'ene'}`,`Draw ${STEM[n]}${d==null?'ane':'ene'}`,()=>setMol(n,d,false)));b('Add bromine water','Shake the molecule with bromine water',bromine,!!need(m))}
  A.redraw()}
 // ---- drawing ----
 function slots(m,i){const ends=[];if(i===0)ends.push([-1,0]);if(i===m.n-1)ends.push([1,0]);return ends.concat([[0,-1],[0,1]])}
 function drawMol(A){const{ctx,W:Wd,H,col:C,paint:P}=A,m=W.m,tubeH=(A.step===3||A.step===5)?1:0,top=10,mh=H*(A.narrow?.56:.6),cy=top+mh/2,
   gap=Math.min(A.narrow?72:96,(Wd-90)/Math.max(1,m.n-1+.6)),x0=Wd/2-gap*(m.n-1)/2,X=i=>x0+i*gap,L=Math.min(46,gap*.55),shake=W.bounce*Math.sin(W.bounce*30)*6;
  if(tubeH){ctx.fillStyle=A.alpha(A.mix('#f59e0b','#b45309',.3),.10+.32*m.orange);P.rrect(8,top,Wd-16,mh,16);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.3);ctx.lineWidth=1.2;P.rrect(8,top,Wd-16,mh,16);ctx.stroke();
   P.label(m.orange>.5?'bromine water: orange':'bromine water: colourless',Wd/2,top+14,{font:'700 11px system-ui',bg:A.alpha(C.tx,.75),col:C.pn})}
  ctx.lineCap='round';ctx.strokeStyle=C.tx;
  for(let i=0;i<m.n-1;i++){const a=X(i)+16+shake,b=X(i+1)-16+shake;ctx.lineWidth=3;if(m.dbl===i){ctx.strokeStyle=C.ac;ctx.beginPath();ctx.moveTo(a,cy-5);ctx.lineTo(b,cy-5);ctx.moveTo(a,cy+5);ctx.lineTo(b,cy+5);ctx.stroke();ctx.strokeStyle=C.tx}
   else{ctx.beginPath();ctx.moveTo(a,cy);ctx.lineTo(b,cy);ctx.stroke()}}
  for(let i=0;i<m.n;i++){const x=X(i)+shake,sl=slots(m,i),used=m.h[i]+m.br[i];
   sl.forEach(([dx,dy],k)=>{const free=k>=used&&k<used+room(m,i);if(k>=used&&!free)return;const tx=x+dx*L,ty=cy+dy*L,isBr=k>=m.h[i]&&k<used;
    if(free){ctx.setLineDash([3,4]);ctx.strokeStyle=A.alpha(C.mu,.7);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+dx*15,cy+dy*15);ctx.lineTo(tx-dx*10,ty-dy*10);ctx.stroke();ctx.setLineDash([]);return}
    ctx.strokeStyle=C.tx;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x+dx*16,cy+dy*16);ctx.lineTo(tx-dx*11,ty-dy*11);ctx.stroke();
    const r=(isBr?13:10)*(1+(k===used-1?(W.pop[i]||0)*.5:0));P.ball(tx,ty,r,isBr?'#b45309':'#e5e7eb');ctx.fillStyle=isBr?'#fff':'#111';ctx.font=`800 ${isBr?11:12}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(isBr?'Br':'H',tx,ty+.5)});
   const full=!room(m,i),bad=W.mark===i&&W.bounce>.05;P.ball(x,cy,16,bad?C.rd:'#374151');ctx.fillStyle='#fff';ctx.font='800 14px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('C',x,cy+.5);
   if(!W.hideF)P.label(`${bondsOf(m,i)}/4`,x,cy+L+(A.narrow?24:26),{font:'700 10.5px system-ui',bg:A.alpha(full?C.gr:C.am,.92),col:full?'#fff':'#111'});hot.push({k:'c',i,x:x-gap/2,y:top,w:gap,h:mh})}
  // footer: formula + log + Br2 chip
  const fy=top+mh+14,tot=m.br.reduce((a,b)=>a+b,0);if(W.hideF)return;ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.textBaseline='top';ctx.font=`800 ${A.narrow?16:19}px system-ui`;
  ctx.fillText(`${fm(m.n,totalH(m),tot)}${need(m)?'  …':''}`,14,fy);ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;
  ctx.fillText(need(m)?`${need(m)} H still to place`:(m.dbl!=null?`${name(m)} · CₙH₂ₙ: ${totalH(m)} = 2 × ${m.n}`:tot?`saturated now: no C=C left`:`${name(m)} · CₙH₂ₙ₊₂`),14,fy+(A.narrow?22:26));
  if(W.log.size){ctx.fillText('Log: '+[...W.log].sort((a,b)=>a[0]-b[0]).map(([n,h])=>`${STEM[n]}ene ${fm(n,h)}`).join(' · '),14,fy+(A.narrow?40:46))}
  if(tubeH){const bx=W.drag?W.drag.x-36:Wd-96,by=W.drag?W.drag.y-16:fy;P.shadow(6,2,.25);ctx.fillStyle='#b45309';P.rrect(bx,by,72,32,10);ctx.fill();P.noShadow();ctx.fillStyle='#fff';ctx.font='800 13px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Br₂ ⇢',bx+36,by+16.5);
   hot.push({k:'br',x:bx,y:by,w:72,h:32});W.molBox={x:8,y:top,w:Wd-16,h:mh};if(!W.drag)P.label('drag Br₂ onto the molecule',Wd/2,H-12,{font:'600 11px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}}
 function drawChips(A){const{ctx,W:Wd,H,col:C,paint:P}=A,cols=A.narrow?2:3,cw=(Wd-24)/cols,ch=Math.min(80,(H-50)/Math.ceil(CHIPS.length/cols));
  ctx.fillStyle=C.tx;ctx.font=`800 ${A.narrow?14:17}px system-ui`;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillText('Which ones fit CₙH₂ₙ?',12,24);
  CHIPS.forEach(([n,h],k)=>{const x=12+(k%cols)*cw,y=38+Math.floor(k/cols)*ch,seen=W.chips.has(k),ok=h===2*n,on=W.chip===k;
   ctx.fillStyle=seen?A.mix(C.pn,ok?C.gr:C.cy,.22):C.pn;P.shadow(5,2,.18);P.rrect(x+4,y+4,cw-8,ch-8,12);ctx.fill();P.noShadow();ctx.strokeStyle=on?C.am:A.alpha(C.tx,.3);ctx.lineWidth=on?3:1;P.rrect(x+4,y+4,cw-8,ch-8,12);ctx.stroke();
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${A.narrow?18:21}px system-ui`;ctx.fillText(fm(n,h),x+cw/2,y+ch/2-(seen?8:0));
   if(seen){ctx.font='700 11px system-ui';ctx.fillStyle=C.tx;ctx.fillText(ok?`2 × ${n} = ${h} → alkene`:`2 × ${n} + 2 = ${h} → alkane`,x+cw/2,y+ch/2+14)}hot.push({k:'chip',i:k,x,y,w:cw,h:ch})})}
 function draw(A){const{ctx,W:Wd,H,col:C,paint:P}=A;hot.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.ac,.05)],[1,C.pn]]);ctx.fillRect(0,0,Wd,H);W.view==='chips'?drawChips(A):drawMol(A)}
 // ---- steps ----
 const fresh=()=>{W.run++;W.log=new Map();W.tested=new Set();W.chips=new Set();W.chip=null;W.view='mol';W.drag=null;W.mark=-1;W.hideF=false;W.goal=()=>{};c.say('');if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Draw ethene',p:'Ethene has two carbons joined by a double bond, C=C. Every carbon must end up with exactly 4 bonds. Add the hydrogens.',
   predict:{q:'In ethane, each carbon holds 3 H. How many H does each carbon in ethene hold?',opts:['3, the same as ethane','2: the double bond uses two of its four bonds','4'],ans:1},
   task:'Tap each carbon (or +H) until both have 4 bonds',show:()=>play(fillAll()),
   go:()=>{fresh();setMol(2,0,false);W.goal=fin(0,()=>!need(W.m),'Each C=C carbon has 2 H. Ethene is C₂H₄, two H fewer than ethane.')}},
  {h:'Draw propene',p:'Propene has three carbons: C=C–C. Watch the middle carbon. It has a double bond on one side and a single bond on the other.',
   predict:{q:'How many hydrogens can the middle carbon of propene hold?',opts:['2, like the middle of propane','1','0'],ans:1},
   task:'Finish propene: give every carbon 4 bonds',show:()=>play(fillAll()),
   go:()=>{fresh();setMol(3,0,false);W.goal=fin(1,()=>!need(W.m),'The middle carbon has 3 bonds to carbon (2 in the C=C, 1 single), so it takes 1 H. Propene is C₃H₆: CH₂=CH–CH₃.')}},
  {h:'One rule for all',p:'Draw ethene, propene and butene. The log keeps each formula. Look for the pattern.',
   predict:{q:'Butene has 4 carbons and one C=C. What is its formula?',opts:['C₄H₁₀','C₄H₈','C₄H₉'],ans:1},
   task:'Finish all three alkenes: ethene, propene and butene',show:()=>{const ns=[2,3,4].filter(n=>!W.log.has(n));play(ns.flatMap(n=>[()=>setMol(n,0,false),...Array(2*n).fill(0).map(()=>()=>{const m=W.m;const i=m.h.findIndex((_,j)=>room(m,j)>0);if(i>=0)addH(i)})]),160)},
   go:()=>{fresh();setMol(2,0,false);W.goal=fin(2,()=>[2,3,4].every(n=>W.log.has(n)),'C₂H₄, C₃H₆, C₄H₈: the H count is always twice the C count. Alkenes fit CₙH₂ₙ.')}},
  {h:'Unsaturated',p:'Bromine water is orange. Shake it with each molecule by dragging the Br₂ onto it.',
   predict:{q:'Orange bromine water is shaken with ethane, then with ethene. Which turns colourless?',opts:['Both: they are both hydrocarbons','Only ethene','Only ethane'],ans:1},
   task:'Test both ethane and ethene with bromine water',show:()=>play([()=>setMol(2,null,true),bromine,()=>setMol(2,0,true),bromine],700),
   go:()=>{fresh();setMol(2,null,true);W.goal=fin(3,()=>W.tested.has('ane:2')&&W.tested.has('ene:2'),'Ethene is unsaturated: its C=C can open and take on more atoms. Ethane is saturated, so the bromine has nowhere to go.')}},
  {h:'Spot an alkene',p:'You only have a formula. Test each one against CₙH₂ₙ.',
   predict:{q:'Is C₅H₁₀ an alkene?',opts:['No: alkenes stop at butene','Yes: 10 = 2 × 5','No: it would need 12 H'],ans:1},
   task:'Tap every formula to test it',show:()=>play(CHIPS.map((_,k)=>()=>chip(k))),
   go:()=>{fresh();W.view='chips';sync();W.goal=fin(4,()=>W.chips.size===CHIPS.length,'H = 2 × C means an alkene; H = 2 × C + 2 means an alkane. The series goes on: pentene is C₅H₁₀.')}},
  {h:'Sandbox',p:'Draw any alkene or alkane up to five carbons, then shake it with bromine water.',go:()=>{fresh();setMol(3,0,false)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>W.goal()});
 // ---- challenge ----
 const QS=[{t:'f',n:3},{t:'which',n:4},{t:'brom'},{t:'hc',n:3,i:1},{t:'f',n:5},{t:'which',n:2},{t:'hc',n:2,i:0},{t:'brom2'},{t:'hc',n:4,i:2}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];let html,opts;
  if(q.t==='f'){html=`<p><b>What is the formula of the alkene with ${q.n} carbon atoms, ${STEM[q.n]}ene?</b></p>`;opts=[{l:fm(q.n,2*q.n),s:'ok'},{l:fm(q.n,2*q.n+2),s:'alkane'},{l:fm(q.n,2*q.n+1),s:'one'}];setMol(q.n,0,false)}
  else if(q.t==='which'){html=`<p><b>Which of these is an alkene?</b></p>`;opts=[{l:fm(q.n,2*q.n),s:'ok'},{l:fm(q.n,2*q.n+2),s:'alkane'},{l:fm(q.n,2*q.n-1),s:'one'}];setMol(q.n,0,false)}
  else if(q.t==='brom'||q.t==='brom2'){const ene=q.t==='brom';html=`<p><b>A hydrocarbon is shaken with orange bromine water. The mixture ${ene?'turns colourless':'stays orange'}. What does that show?</b></p>`;
   opts=[{l:ene?'It has a C=C: it is unsaturated':'It has only single bonds: it is saturated',s:'ok'},{l:ene?'It is saturated':'It has a C=C double bond',s:'flip'},{l:ene?'It must be an alkane':'It is not a hydrocarbon',s:ene?'flip':'nohc'}];setMol(2,ene?0:null,true);q.dbl=ene?0:null;q.n=2}
  else{const m=mk(q.n,0,true),ans=m.h[q.i];html=`<p><b>In ${STEM[q.n]}ene, the C=C joins carbons 1 and 2. How many H atoms are on carbon ${q.i+1}?</b></p>`;
   opts=[{l:String(ans),s:'ok'},{l:String(ans+1),s:'dblone'},{l:String(ans>0?ans-1:ans+2),s:'short'}];setMol(q.n,0,false);W.mark=q.i;q.ans=ans}
  W.hideF=true;const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));
  chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o.l);b.onclick=()=>judge(q,o)});sync()}
 function judge(q,o){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),n=q.n;let m;W.m=mk(n,q.t==='brom2'?null:0,true);W.hideF=false;
  if(o.s==='ok')m=q.t==='hc'?`Carbon ${q.i+1} has ${4-q.ans} bonds to carbon (the C=C counts as 2), so it takes ${q.ans} H.`:q.t.startsWith('brom')?`Bromine adds across a C=C, which takes the colour away. No C=C means no reaction, so it stays orange.`:`${fm(n,2*n)} fits CₙH₂ₙ: ${2*n} = 2 × ${n}.`;
  else if(o.s==='alkane')m=`That is CₙH₂ₙ₊₂, the alkane formula. The C=C takes one H from each of its two carbons, so an alkene has 2 H fewer: ${fm(n,2*n)}.`;
  else if(o.s==='one')m=`That removes only one H. Both carbons in the C=C give up one H each, so take away 2 from the alkane: ${fm(n,2*n)}.`;
  else if(o.s==='flip')m=`The result is the other way round. Alkenes decolourise bromine water because the C=C opens and takes the bromine; alkanes leave it orange.`;
  else if(o.s==='nohc')m=`Alkanes are hydrocarbons too. Staying orange only shows there is no C=C to react with: the compound is saturated.`;
  else if(o.s==='dblone')m=`That counts the double bond as one bond. C=C uses 2 of carbon's 4 bonds, so carbon ${q.i+1} has room for ${q.ans} H.`;
  else m=`Too few. Carbon always makes 4 bonds: count the bonds to carbon, then fill the rest with H to get ${q.ans}.`;
  if(o.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Build and test the molecule'},box);chal=E('div',{class:'fl-chal'},A.below);
   const inBox=(p,q)=>p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h;
   A.gest({down:p=>{if(A.step===6)return false;const t=hot.find(q=>q.k==='br'&&inBox(p,q))||hot.find(q=>inBox(p,q));if(!t)return false;
     if(t.k==='br'){W.drag={x:p.x,y:p.y};return true}if(t.k==='chip')chip(t.i);else if(t.k==='c'&&A.step!==3)addH(t.i);return false},
    move:p=>{if(W.drag){W.drag={x:p.x,y:p.y};A.redraw()}},
    up:p=>{if(!W.drag)return;W.drag=null;if(p&&W.molBox&&inBox(p,W.molBox))bromine();else{say('Drop the Br₂ on the molecule to shake it with bromine water.');sync()}}});sync()}});
 A.start()})})();
