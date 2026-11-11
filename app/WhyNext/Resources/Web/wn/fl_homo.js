/* Flagship 29 – homologous series. A "family wall" and a boiling-point chart. The wall has four columns, one per series
   (alkanes, alkenes, alcohols, carboxylic acids), with members stacked by number of carbons. Tapping the gap between two
   neighbours reveals what changes (always +CH₂); tapping a family name tests its general formula against every member;
   in the sorting step the learner drops loose molecules into the family whose functional group they carry. The chart
   view plots boiling point against carbon number: the learner drags a marker to guess the next member's boiling point,
   then checks it, so the steady rise per CH₂ is discovered, not told. Predictions target "neighbours differ by CH₃",
   "the same number of carbons means the same series", "same family means identical properties" and "boiling point is
   random". Challenge: name the next member, or say whether two compounds share a series; feedback names the slip
   (+CH₃, +C only, dropped the functional group, carbons-not-groups, CH₂ multiples). */
(()=>{const DG='₀₁₂₃₄₅₆₇₈₉',lo=s=>String(s).replace(/\d/g,d=>DG[d]),cnt=k=>k>1?lo(k):'';
 const F={
  alk:{nm:'Alkanes',sh:'Alkanes',grp:'C–C only',rule:'CₙH₂ₙ₊₂',form:n=>`C${cnt(n)}H${cnt(2*n+2)}`,h:n=>2*n+2,o:0,mem:{1:['methane',-162],2:['ethane',-89],3:['propane',-42],4:['butane',-1],5:['pentane',36]}},
  ene:{nm:'Alkenes',sh:'Alkenes',grp:'C=C',rule:'CₙH₂ₙ',form:n=>`C${cnt(n)}H${cnt(2*n)}`,h:n=>2*n,o:0,mem:{2:['ethene',-104],3:['propene',-48],4:['butene',-6],5:['pentene',30]}},
  ol:{nm:'Alcohols',sh:'Alcohols',grp:'–OH',rule:'CₙH₂ₙ₊₁OH',form:n=>`${n>1?'C'+lo(n):'C'}H${cnt(2*n+1)}OH`,h:n=>2*n+2,o:1,mem:{1:['methanol',65],2:['ethanol',78],3:['propanol',97],4:['butanol',118],5:['pentanol',138]}},
  acid:{nm:'Carboxylic acids',sh:'Acids',grp:'–COOH',rule:'CₙH₂ₙO₂',form:n=>n===1?'HCOOH':`${n>2?'C'+lo(n-1):'C'}H${cnt(2*n-1)}COOH`,h:n=>2*n,o:2,mem:{1:['methanoic acid',101],2:['ethanoic acid',118],3:['propanoic acid',141],4:['butanoic acid',164]}}};
 const ORDER=['alk','ene','ol','acid'],ROWS=5,WORDGRP={alk:'only single C–C bonds',ene:'a C=C double bond',ol:'an –OH group',acid:'a –COOH group'};
 const has=(f,n)=>!!F[f].mem[n];
VIS.reg('flaghomo',c=>{let A,pad,chal,read;const hot=[];
 const W={view:'wall',gaps:new Set(),tested:new Set(),blank:new Set(),tray:[],pick:null,fam:'alk',hide:5,guess:0,shown:false,mk:0,drag:false,flash:null,glow:0,goal:()=>{},run:0,mark:null};
 const say=t=>{t=t.charAt(0).toUpperCase()+t.slice(1);c.say(t);if(read)read.textContent=t};
 const gapKey=(f,n)=>f+':'+n;
 function openGap(f,n){const k=gapKey(f,n);if(W.gaps.has(k))return;W.gaps.add(k);W.glow=1;A.tween(W,{glow:0},600,'out');A.sound.tick();
  say(`${F[f].form(n)} to ${F[f].form(n+1)}: one more C and two more H, so +CH₂. The ${F[f].grp} group stays the same.`);sync();W.goal()}
 function testRule(f){if(W.tested.has(f))return;W.tested.add(f);A.sound.pop();const ns=Object.keys(F[f].mem).map(Number);
  say(`${F[f].nm}: ${F[f].rule}. ${ns.map(n=>`n = ${n} gives ${F[f].form(n)}${f==='acid'?` (C${cnt(n)}H${cnt(2*n)}O₂)`:''}`).join('; ')}. Every member fits.`);sync();W.goal()}
 function place(f){const s=W.tray.find(t=>t.id===W.pick);if(!s)return say('Pick a loose molecule first.');
  if(s.f===f){W.tray=W.tray.filter(t=>t!==s);W.blank.delete(gapKey(f,s.n));W.pick=null;A.sound.pop();
   say(`${F[f].form(s.n)} has ${WORDGRP[f]}, so it joins the ${F[f].nm.toLowerCase()}.${W.tray.length?` ${W.tray.length} left.`:' All placed.'}`)}
  else{A.sound.miss();W.flash={f,t:1};A.tween(W.flash,{t:0},700,'out');
   say(sameC(s,f)?`Same number of carbons is not enough. ${F[s.f].form(s.n)} has ${WORDGRP[s.f]}, and the ${F[f].nm.toLowerCase()} all have ${WORDGRP[f]}.`:
    `${F[s.f].form(s.n)} has ${WORDGRP[s.f]}. The ${F[f].nm.toLowerCase()} column is for molecules with ${WORDGRP[f]}.`)}
  sync();W.goal()}
 const sameC=(s,f)=>has(f,s.n);
 function pickTray(id){W.pick=W.pick===id?null:id;const s=W.tray.find(t=>t.id===id);A.sound.tick();if(s&&W.pick)say(`Picked ${F[s.f].form(s.n)}. Look for its functional group, then tap its family.`);sync()}
 // chart
 const bpRange=f=>{const v=Object.values(F[f].mem).map(m=>m[1]);const a=Math.min(...v),b=Math.max(...v),p=(b-a)*.18+10;return[Math.floor((a-p)/20)*20,Math.ceil((b+p)/20)*20]};
 function setChart(f){W.view='chart';W.fam=f;const ns=Object.keys(F[f].mem).map(Number);W.hide=ns[ns.length-1];W.guess=F[f].mem[ns[ns.length-2]][1];W.shown=false;sync()}
 function nudge(d){if(W.shown)return;const[a,b]=bpRange(W.fam);W.guess=Math.max(a,Math.min(b,Math.round(W.guess+d)));say(`Guess for ${F[W.fam].mem[W.hide][0]}: ${fmtT(W.guess)}.`);sync()}
 const fmtT=t=>`${t<0?'−':''}${Math.abs(t)} °C`;
 function check(){if(W.shown)return;W.shown=true;const real=F[W.fam].mem[W.hide][1],prev=F[W.fam].mem[W.hide-1][1],off=Math.abs(W.guess-real);W.mk=0;A.tween(W,{mk:1},700,'back');
  off<=12?A.sound.win():A.sound.pop();
  say(`${F[W.fam].mem[W.hide][0]} boils at ${fmtT(real)}; your guess was ${fmtT(W.guess)}${off?`, ${off} °C away`:', spot on'}. One more CH₂ raised it by ${real-prev} °C: a steady climb.`);sync();W.goal()}
 function play(list,ms=380){const tok=++W.run;let j=0;const go=()=>{if(tok!==W.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){if(W.view==='chart'){const f=W.fam,ns=Object.keys(F[f].mem).map(Number);
   return `Boiling points of the ${F[f].nm.toLowerCase()}: `+ns.map(n=>n===W.hide&&!W.shown?`${F[f].mem[n][0]} hidden, guess ${fmtT(W.guess)}`:`${F[f].mem[n][0]} ${fmtT(F[f].mem[n][1])}`).join(', ')+'.'}
  const cols=ORDER.map(f=>`${F[f].nm} (${F[f].grp}): `+Object.keys(F[f].mem).map(Number).map(n=>W.blank.has(gapKey(f,n))?'gap':F[f].form(n)).join(', ')).join('. ');
  return `Family wall. ${cols}.`+(W.gaps.size?` Gaps opened: ${W.gaps.size}.`:'')+(W.tray.length?` Loose molecules: ${W.tray.map(t=>F[t.f].form(t.n)).join(', ')}.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===6)return A.redraw();
  if(W.view==='wall'&&(s===0||s===5)){const nx=()=>{for(const f of ORDER)for(let n=1;n<ROWS;n++)if(has(f,n)&&has(f,n+1)&&!W.gaps.has(gapKey(f,n))&&(s!==0||f==='ol'))return[f,n]};const g=nx();b('Open next gap','Reveal the difference between the next two neighbours',()=>g&&openGap(...g),!g)}
  if(W.view==='wall'&&(s===1||s===5))ORDER.forEach(f=>b(`Test ${F[f].sh}`,`Test the general formula of the ${F[f].nm}`,()=>testRule(f),W.tested.has(f)));
  if(W.view==='wall'&&s===2){W.tray.forEach(t=>b(`${W.pick===t.id?'▸ ':''}${F[t.f].form(t.n)}`,`Pick ${F[t.f].form(t.n)}`,()=>pickTray(t.id)));ORDER.forEach(f=>b(`→ ${F[f].sh}`,`Put the picked molecule in the ${F[f].nm}`,()=>place(f),!W.pick))}
  if(W.view==='chart'){b('▼ 10 °C','Lower the guess by 10 degrees',()=>nudge(-10),W.shown);b('▲ 10 °C','Raise the guess by 10 degrees',()=>nudge(10),W.shown);b('Check my guess','Reveal the real boiling point',check,W.shown)}
  if(s===5){b(W.view==='wall'?'Show boiling points':'Show family wall','Switch view',()=>{if(W.view==='wall')setChart(W.fam);else{W.view='wall';sync()}});
   if(W.view==='chart')ORDER.filter(f=>f!==W.fam).forEach(f=>b(F[f].sh,`Chart the ${F[f].nm}`,()=>setChart(f)))}
  A.redraw()}
 // ---- drawing ----
 function wallGeo(A){const{W:Wd,H}=A,tray=A.step===2&&W.tray.length?50:0,top=8,head=A.narrow?40:36,cw=(Wd-16)/4,rh=(H-top-head-tray-10)/ROWS;return{tray,top,head,cw,rh,x:i=>8+i*cw,y:n=>top+head+(n-1)*rh}}
 function drawWall(A){const{ctx,W:Wd,H,col:C,paint:P}=A,g=wallGeo(A),fs=A.narrow?11.5:13;
  ORDER.forEach((f,i)=>{const x=g.x(i),fam=F[f],bad=W.flash&&W.flash.f===f?W.flash.t:0,focus=A.step!==0||f==='ol';ctx.globalAlpha=focus?1:.45;
   ctx.fillStyle=A.alpha(bad?C.rd:C.cy,bad?.18*bad+.06:.07);P.rrect(x+2,g.top,g.cw-4,H-g.top-g.tray-6,10);ctx.fill();
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${A.narrow?12:14}px system-ui`;ctx.fillText(A.narrow?fam.sh:fam.nm,x+g.cw/2,g.top+12);
   ctx.font=`700 ${A.narrow?10.5:12}px system-ui`;ctx.fillStyle=W.tested.has(f)?C.gr:C.mu;ctx.fillText(W.tested.has(f)?fam.rule:fam.grp,x+g.cw/2,g.top+(A.narrow?29:27));
   hot.push({k:'head',f,x:x+2,y:g.top,w:g.cw-4,h:g.head});
   for(let n=1;n<=ROWS;n++){if(!has(f,n))continue;const y=g.y(n),ch=Math.min(34,g.rh*.6),cy=y+(g.rh-ch)/2,blank=W.blank.has(gapKey(f,n));
    if(blank){ctx.setLineDash([4,3]);ctx.strokeStyle=A.alpha(C.mu,.8);ctx.lineWidth=1.5;P.rrect(x+6,cy,g.cw-12,ch,8);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=C.mu;ctx.font=`700 ${fs}px system-ui`;ctx.fillText('?',x+g.cw/2,cy+ch/2+1)}
    else{P.shadow(5,2,.18);ctx.fillStyle=W.tested.has(f)?A.mix(C.pn,C.gr,.16):C.pn;P.rrect(x+6,cy,g.cw-12,ch,8);ctx.fill();P.noShadow();ctx.strokeStyle=A.alpha(C.tx,.25);ctx.lineWidth=1;P.rrect(x+6,cy,g.cw-12,ch,8);ctx.stroke();
     ctx.fillStyle=C.tx;ctx.font=`700 ${fs}px system-ui`;ctx.fillText(fam.form(n),x+g.cw/2,cy+ch/2+1);if(W.mark&&W.mark.f===f&&W.mark.n===n){ctx.strokeStyle=C.am;ctx.lineWidth=3;P.rrect(x+4,cy-2,g.cw-8,ch+4,9);ctx.stroke()}}
    hot.push({k:'cell',f,n,x:x+2,y,w:g.cw-4,h:g.rh});
    if(has(f,n+1)&&n<ROWS){const mx=x+g.cw/2,yy=cy+ch+(g.rh-ch)/2;const open=W.gaps.has(gapKey(f,n));
     if(open){P.label('+CH₂',mx,yy,{font:`800 ${A.narrow?10.5:12}px system-ui`,bg:A.alpha(C.am,.95),col:'#111'})}
     else if(A.step===0||A.step===5){ctx.fillStyle=A.alpha(C.ac,.9);ctx.beginPath();ctx.arc(mx,yy,7,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.font='800 10px system-ui';ctx.fillText('?',mx,yy+.5);hot.push({k:'gap',f,n,x:mx,y:yy,R:14})}}}
   ctx.globalAlpha=1});
  if(g.tray){const ty=H-g.tray,bw=Math.min(110,(Wd-16)/Math.max(4,W.tray.length)-6);ctx.fillStyle=C.mu;ctx.textAlign='left';ctx.font='700 11px system-ui';
   W.tray.forEach((t,i)=>{const bx=8+i*(bw+6),on=W.pick===t.id;P.shadow(6,2,.22);ctx.fillStyle=on?A.mix(C.pn,C.am,.35):C.pn;P.rrect(bx,ty+4,bw,36,9);ctx.fill();P.noShadow();ctx.strokeStyle=on?C.am:A.alpha(C.tx,.35);ctx.lineWidth=on?3:1.2;P.rrect(bx,ty+4,bw,36,9);ctx.stroke();
    ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.font=`800 ${A.narrow?12:13}px system-ui`;ctx.fillText(F[t.f].form(t.n),bx+bw/2,ty+23);hot.push({k:'tray',id:t.id,x:bx,y:ty+4,w:bw,h:36})})}}
 function drawChart(A){const{ctx,W:Wd,H,col:C,paint:P}=A,f=W.fam,fam=F[f],ns=Object.keys(fam.mem).map(Number),[a,b]=bpRange(f);
  const L=A.narrow?46:56,R=Wd-14,T=40,B=H-(A.narrow?56:46),X=n=>L+(n-ns[0]+.5)*(R-L)/ns.length,Y=t=>B-(t-a)/(b-a)*(B-T);
  ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font=`800 ${A.narrow?15:18}px system-ui`;ctx.fillText(`Boiling points: ${fam.nm.toLowerCase()}`,12,24);
  ctx.strokeStyle=A.alpha(C.mu,.35);ctx.lineWidth=1;ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.textAlign='right';ctx.textBaseline='middle';
  {const st=b-a>200?50:20;for(let t=Math.ceil(a/st)*st;t<=b;t+=st){const y=Y(t);ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillText(fmtT(t).replace(' °C','°'),L-5,y)}}
  if(a<0&&b>0){ctx.strokeStyle=A.alpha(C.tx,.6);ctx.beginPath();ctx.moveTo(L,Y(0));ctx.lineTo(R,Y(0));ctx.stroke()}
  ctx.textAlign='center';ctx.textBaseline='top';ns.forEach(n=>{ctx.fillStyle=C.tx;ctx.font=`700 ${A.narrow?10.5:12}px system-ui`;ctx.fillText(fam.form(n),X(n),B+6);ctx.fillStyle=C.mu;ctx.font='600 10px system-ui';ctx.fillText(`${n} C`,X(n),B+(A.narrow?22:21))});
  const pts=ns.filter(n=>n!==W.hide||W.shown).map(n=>[X(n),Y(n===W.hide?fam.mem[n][1]*W.mk+W.guess*(1-W.mk):fam.mem[n][1]),n]);
  ctx.strokeStyle=C.cy;ctx.lineWidth=2.5;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
  pts.forEach(([x,y,n],i)=>{P.ball(x,y,7,C.cy);ctx.fillStyle=C.tx;ctx.font='700 11px system-ui';ctx.textBaseline='middle';if(i){ctx.textAlign='right';ctx.fillText(fmtT(fam.mem[n][1]),x-11,y-6)}else{ctx.textAlign='left';ctx.fillText(fmtT(fam.mem[n][1]),x+11,y+9)}ctx.textAlign='center';
   if(i&&(A.step===3||A.step===4||A.step===5)&&(n!==W.hide||W.shown)){const[px,py]=pts[i-1];P.label(`+${fam.mem[n][1]-fam.mem[n-1][1]}`,(px+x)/2+14,(py+y)/2+16,{font:'700 10px system-ui',bg:A.alpha(C.gr,.9),col:'#fff'})}});
  if(!W.shown){const x=X(W.hide),y=Y(W.guess);ctx.setLineDash([5,4]);ctx.strokeStyle=C.am;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(x,y,11,0,7);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.am;ctx.textBaseline='middle';ctx.font='800 13px system-ui';ctx.fillText('?',x,y+.5);P.label(`guess ${fmtT(W.guess)}`,x,y-22,{font:'700 11px system-ui',bg:A.alpha(C.am,.95),col:'#111',align:'right'});
   hot.push({k:'marker',x,y,R:24});W.Y=Y;W.ab=[a,b];W.BT=[B,T];P.label('drag the ? up or down',(L+R)/2,H-12,{font:'600 11px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
  else{const real=fam.mem[W.hide][1];ctx.globalAlpha=.55;ctx.setLineDash([3,3]);ctx.strokeStyle=C.am;ctx.beginPath();ctx.arc(X(W.hide),Y(W.guess),9,0,7);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;void real}}
 function draw(A){const{ctx,W:Wd,H,col:C,paint:P}=A;hot.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,Wd,H);W.view==='chart'?drawChart(A):drawWall(A)}
 // ---- steps ----
 const fresh=()=>{W.run++;W.view='wall';W.gaps=new Set();W.tested=new Set();W.blank=new Set();W.tray=[];W.pick=null;W.flash=null;W.mark=null;W.goal=()=>{};if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const olGaps=()=>[1,2,3,4].filter(n=>W.gaps.has(gapKey('ol',n))).length;
 const steps=[
  {h:'One CH₂ apart',p:'A homologous series is a family of compounds. Each column is one family, with members stacked by number of carbons.',
   predict:{q:'Ethanol is C₂H₅OH and propanol is C₃H₇OH. What does propanol have that ethanol does not?',opts:['One extra CH₃','One extra CH₂','One extra carbon only'],ans:1},
   task:'Tap each ? between neighbours in the alcohols column',show:()=>play([1,2,3,4].map(n=>()=>openGap('ol',n))),
   go:()=>{fresh();W.goal=fin(0,()=>olGaps()===4,'Every step down the alcohols adds CH₂: one carbon and two hydrogens. The –OH group never changes.')}},
  {h:'One formula per family',p:'Because each member adds the same CH₂, a single general formula fits the whole family.',
   predict:{q:'Methanol is CH₃OH and ethanol is C₂H₅OH. What is butanol, the alcohol with 4 carbons?',opts:['C₄H₁₀OH','C₄H₉OH','C₄H₈OH'],ans:1},
   task:'Tap each family name (or its Test button) to test its general formula',show:()=>play(ORDER.map(f=>()=>testRule(f))),
   go:()=>{fresh();W.goal=fin(1,()=>W.tested.size===4,'Each family has its own general formula. Butanol fits CₙH₂ₙ₊₁OH: C₄H₉OH.')}},
  {h:'Same group, same family',p:'A family is decided by its functional group: the part that reacts, such as C=C or –OH. Four molecules have come loose.',
   predict:{q:'Ethane, C₂H₆, and ethanol, C₂H₅OH, both have 2 carbons. Are they in the same homologous series?',opts:['Yes: same number of carbons','No: ethanol has an –OH group','Yes: both contain C and H'],ans:1},
   task:'Pick each loose molecule, then tap the family it belongs to',show:()=>{const q=[...W.tray];play(q.flatMap(t=>[()=>pickTray(t.id),()=>place(t.f)]),300)},
   go:()=>{fresh();[['alk',2],['ol',2],['ene',3],['acid',2]].forEach(([f,n],i)=>{W.blank.add(gapKey(f,n));W.tray.push({id:i,f,n})});
    W.goal=fin(2,()=>!W.tray.length,'Members of a series share a functional group, so they react in similar ways. Carbon count alone does not decide the family.')}},
  {h:'A steady climb',p:'Physical properties change gradually along a series. Here are the boiling points of the first four alkanes.',
   predict:{q:'Pentane has one more CH₂ than butane. What happens to its boiling point?',opts:['It is the same: same family','It is higher','It is lower'],ans:1},
   task:'Drag the ? to your guess for pentane, then press Check my guess',show:()=>{const t=F.alk.mem[5][1];A.tween(W,{guess:t-4},700,'io',()=>{W.guess=Math.round(W.guess);check()})},
   go:()=>{fresh();setChart('alk');W.goal=fin(3,()=>W.shown,'Longer chains have stronger forces between molecules, so each CH₂ raises the boiling point. The rise is gradual, not a jump.')}},
  {h:'Similar, not identical',p:'The alcohols all have –OH, so they react alike: they all burn, and all react with sodium. Do they boil alike too?',
   predict:{q:'Butanol and propanol react in similar ways. Do they have the same boiling point?',opts:['Yes: same family, same properties','No: butanol boils higher','No: butanol boils lower'],ans:1},
   task:'Guess the boiling point of pentanol, then check it',show:()=>{const t=F.ol.mem[5][1];A.tween(W,{guess:t+6},700,'io',()=>{W.guess=Math.round(W.guess);check()})},
   go:()=>{fresh();setChart('ol');W.goal=fin(4,()=>W.shown,'Chemical properties are similar across a series. Physical properties, such as boiling point, show a trend with chain length.')}},
  {h:'Sandbox',p:'Open gaps, test each family rule, or switch to the boiling-point chart and guess the last member of any family.',go:()=>{fresh();sync()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>W.goal()});
 // ---- challenge ----
 const QS=[{t:'next',f:'ol',n:2},{t:'pair',a:['alk',2],b:['ol',2]},{t:'next',f:'alk',n:3},{t:'pair',a:['ol',1],b:['ol',3]},{t:'next',f:'ene',n:3},{t:'pair',a:['ene',3],b:['alk',3]},{t:'next',f:'acid',n:2},{t:'pair',a:['ene',2],b:['ene',4]}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];W.mark=null;let html,opts;
  if(q.t==='next'){const fam=F[q.f],n=q.n,h=fam.h(n+1),grp={ol:'OH',acid:'COOH'}[q.f]||'',base=n+1;
   const raw=k=>q.f==='ol'?`C${cnt(base)}H${cnt(k)}OH`:q.f==='acid'?`C${cnt(base-1)}H${cnt(k)}COOH`:`C${cnt(base)}H${cnt(k)}`,hc=q.f==='ol'?2*base+1:q.f==='acid'?2*base-1:h;
   opts=[{l:fam.form(n+1),s:'ok'},{l:raw(hc+1),s:'ch3'},{l:raw(hc-2),s:'conly'},{l:{alk:F.ol,ene:F.alk,ol:F.alk,acid:F.ol}[q.f].form(base),s:'grp'}];
   html=`<p><b>${fam.form(n)} is in the ${fam.nm.toLowerCase()}. What is the next member of its series?</b></p>`}
  else{const same=q.a[0]===q.b[0];opts=[{l:'Same series',s:same?'ok':'carbons'},{l:'Different series',s:same?'multi':'ok'}];
   html=`<p><b>Are ${F[q.a[0]].form(q.a[1])} and ${F[q.b[0]].form(q.b[1])} in the same homologous series?</b></p>`}
  const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));
  chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o.l);b.onclick=()=>judge(q,o)});sync()}
 function judge(q,o){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(q.t==='next'){const fam=F[q.f];W.mark={f:q.f,n:q.n+1};
   if(o.s==='ok')m=`${fam.form(q.n)} + CH₂ = ${fam.form(q.n+1)}, and it keeps ${WORDGRP[q.f]}.`;
   else if(o.s==='ch3')m=`That adds CH₃. Neighbours in a series differ by CH₂: one C and two H, so ${fam.form(q.n+1)}.`;
   else if(o.s==='conly')m=`That adds a carbon but no hydrogen. Each new carbon brings two H with it: ${fam.form(q.n+1)}.`;
   else m=`That is a different kind of molecule, so it belongs to another family. Keep ${WORDGRP[q.f]} and add CH₂: ${fam.form(q.n+1)}.`}
  else{W.mark={f:q.b[0],n:q.b[1]};const A1=F[q.a[0]].form(q.a[1]),B1=F[q.b[0]].form(q.b[1]);
   if(o.s==='ok')m=q.a[0]===q.b[0]?`Both have ${WORDGRP[q.a[0]]}; they differ by ${q.b[1]-q.a[1]} × CH₂, so same series.`:`${A1} has ${WORDGRP[q.a[0]]} and ${B1} has ${WORDGRP[q.b[0]]}: different functional groups, different series.`;
   else if(o.s==='carbons')m=`Same number of carbons is not the test. ${A1} has ${WORDGRP[q.a[0]]} but ${B1} has ${WORDGRP[q.b[0]]}, so they are in different series.`;
   else m=`They are not neighbours, but they differ by ${q.b[1]-q.a[1]} × CH₂ and share ${WORDGRP[q.a[0]]}. Members further apart are still in the same series.`}
  if(o.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.72,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==6;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Explore the families'},box);chal=E('div',{class:'fl-chal'},A.below);
   const inBox=(p,q)=>q.R?Math.hypot(p.x-q.x,p.y-q.y)<=q.R:p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h;
   A.gest({down:p=>{if(A.step===6)return false;const t=hot.find(q=>q.k==='marker'&&inBox(p,q))||hot.find(q=>q.k==='gap'&&inBox(p,q))||hot.find(q=>inBox(p,q));if(!t)return false;
     if(t.k==='marker'){W.drag=true;return true}
     if(t.k==='gap')openGap(t.f,t.n);else if(t.k==='tray')pickTray(t.id);
     else if((t.k==='head'||t.k==='cell')&&A.step===2&&W.pick!=null)place(t.f);
     else if(t.k==='head'&&(A.step===1||A.step===5))testRule(t.f);return false},
    move:p=>{if(!W.drag||W.shown)return;const[B,T]=W.BT,[a,b]=W.ab,t=a+(B-Math.max(T,Math.min(B,p.y)))/(B-T)*(b-a);W.guess=Math.round(t);A.redraw()},
    up:()=>{if(W.drag){W.drag=false;say(`Guess for ${F[W.fam].mem[W.hide][0]}: ${fmtT(W.guess)}. Press Check my guess.`);sync()}}});sync()}});
 A.start()})})();
