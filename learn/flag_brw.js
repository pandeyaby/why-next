/* Flagship 38 – testing for alkenes with bromine water. A bench of test tubes and a dropper bottle. The learner drags the
   dropper onto a tube to add one drop of orange bromine water (it sits as an unmixed layer), then drags the tube side to side
   to shake it. Each C=C in the sample uses up one drop's worth of bromine, so the orange fades until the C=C bonds run out;
   after that the orange stays. Steps: hexene decolourises; hexane (control) stays orange; cyclohexane has the same formula
   as hexene (C₆H₁₂) but no C=C, so it stays orange; a diene uses twice as many drops as hexene; sunflower oil, olive oil and
   butter are ranked by drops used. Sandbox: any two samples. Challenge: reading results, with feedback on the slips
   (positive and negative swapped, "clear" for colourless, formula taken as proof, more drops read as less unsaturated,
   colour loss put down to dilution, "alkanes react the same way"). */
(()=>{const S={hexene:['hex-1-ene','C₆H₁₂',4],hexane:['hexane','C₆H₁₄',0],cyclohexane:['cyclohexane','C₆H₁₂',0],cyclohexene:['cyclohexene','C₆H₁₀',4],
  diene:['hexa-1,5-diene','C₆H₁₀',8],sunflower:['sunflower oil','',5],olive:['olive oil','',3],butter:['butter (melted)','',1]};
 const ORG='#ea580c';
VIS.reg('flagbrw',c=>{let A,chal,kb,shelf;const st={T:[],drag:null,dp:{x:0,y:0},fall:[],ok:null};
 const tube=k=>({k,n:S[k][0],f:S[k][1],cap:S[k][2],br:0,used:0,pend:0,shook:false,off:0});
 const free=t=>t.br-t.used-t.pend,state=t=>!t.br?'no bromine water yet':t.pend?`${t.pend} drop${t.pend>1?'s':''} sitting on top, not shaken`:free(t)>0?'orange: the colour stays':'colourless: the bromine was used up';
 const geo=()=>{const{W,H}=A,n=st.T.length,gap=W/(n+1),top=H*.42,bot=H*.78;return{n,top,bot,w:A.narrow?38:46,x:i=>gap*(i+1)+(A.narrow&&n>2?gap*.12:0),bx:A.narrow?30:52,by:A.narrow?36:46}};
 const desc=()=>`Bench with ${st.T.length} test tube${st.T.length>1?'s':''}. `+st.T.map((t,i)=>`Tube ${'ABC'[i]}, ${t.n}: ${t.br} drop${t.br===1?'':'s'} added, ${state(t)}.`).join(' ');
 const upd=()=>{A.cv.setAttribute('aria-label',desc());c.say(st.T.map((t,i)=>`${'ABC'[i]} ${t.n}: ${state(t)}`).join(' · '));A.kick()};
 let chk=()=>{};
 const drop=i=>{const t=st.T[i];if(!t)return;t.br++;t.pend++;t.shook=false;A.sound.pop();const g=geo();st.fall.push({x:g.x(i),y:g.top-30,v:0,i});upd();chk()};
 const shake=i=>{const t=st.T[i];if(!t)return;if(!t.pend&&!t.br){A.sound.miss();c.say('Add bromine water first, then shake.');return}const r=Math.min(t.pend,t.cap-t.used);t.used+=r;t.pend=0;t.shook=true;A.sound.whoosh();
  t.off=14;A.tween(t,{off:0},500,'el');upd();chk()};
 const set=ks=>{st.T=ks.map(tube);st.fall=[];st.drag=null;chk=()=>{}};
 const tested=t=>t.shook&&!t.pend&&t.br>0,ended=t=>tested(t)&&free(t)>0;
 const draw=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,g=geo();let more=false;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.07)],[1,A.mix(C.pn,C.tx,.06)]]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=A.alpha(C.tx,.18);ctx.fillRect(0,g.bot+18,W,6);ctx.fillStyle=A.mix(C.pn,'#8b5a2b',.55);P.rrect(g.x(0)-g.w,g.top+30,g.x(g.n-1)-g.x(0)+g.w*2,10,4);ctx.fill();
  st.T.forEach((t,i)=>{const x=g.x(i)+t.off*Math.sin(performance.now()/40),w=g.w,top=g.top,bot=g.bot,liq=top+(bot-top)*.38;if(t.off>.5)more=true;
   const fr=free(t),org=fr>0?Math.min(.95,.45+.12*fr):0;
   ctx.fillStyle=org?A.alpha(ORG,org):A.alpha(C.cy,.10);ctx.beginPath();ctx.moveTo(x-w/2,liq);ctx.lineTo(x-w/2,bot-w/2);ctx.arc(x,bot-w/2,w/2,Math.PI,0,true);ctx.lineTo(x+w/2,liq);ctx.fill();
   if(t.pend){const h=Math.min(40,8+t.pend*6);ctx.fillStyle=A.alpha(ORG,.9);ctx.fillRect(x-w/2+1,liq-h,w-2,h)}
   ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-w/2,top);ctx.lineTo(x-w/2,bot-w/2);ctx.arc(x,bot-w/2,w/2,Math.PI,0,true);ctx.lineTo(x+w/2,top);ctx.stroke();
   ctx.fillStyle=A.alpha('#fff',.25);ctx.fillRect(x-w/2+5,top+8,4,bot-top-w);
   ctx.textAlign='center';ctx.fillStyle=C.tx;ctx.font=`700 ${A.narrow?11:13}px system-ui`;ctx.fillText(t.n,x,bot+(A.narrow?36:40));ctx.font=`${A.narrow?10:12}px system-ui`;ctx.fillStyle=C.mu;
   ctx.fillText(`${'ABC'[i]}${t.f&&g.n<3?' · '+t.f:''} · ${t.br} drop${t.br===1?'':'s'}${tested(t)&&free(t)>0&&t.used&&g.n<3?`, ${t.used} used`:''}`,x,bot+(A.narrow?50:56));if(g.n>2&&tested(t)&&free(t)>0&&t.used)ctx.fillText(`${t.used} used up`,x,bot+(A.narrow?63:71));
   if(t.br)P.label(t.pend?'shake me ↔':fr>0?'stays orange':'colourless',x,top-12,{font:`600 ${A.narrow?10:11}px system-ui`,pill:1,bg:t.pend?A.alpha(C.am,.95):fr>0?ORG:A.alpha(C.gr,.95),col:fr>0&&!t.pend?'#fff':'#111'})});
  for(let j=st.fall.length-1;j>=0;j--){const d=st.fall[j];d.v+=900*dt;d.y+=d.v*dt;more=true;ctx.fillStyle=ORG;ctx.beginPath();ctx.arc(d.x,d.y,4,0,7);ctx.fill();if(d.y>g.top+(g.bot-g.top)*.38)st.fall.splice(j,1)}
  const bx=st.drag==='dp'?st.dp.x:g.bx,by=st.drag==='dp'?st.dp.y:g.by;P.shadow(10,4,.3);ctx.fillStyle=A.alpha(ORG,.85);P.rrect(bx-13,by-6,26,34,6);ctx.fill();P.noShadow();ctx.fillStyle='#1f2937';P.rrect(bx-6,by-22,12,18,4);ctx.fill();ctx.fillRect(bx-1.5,by-30,3,10);
  P.label('bromine water',bx-14,by+40,{align:'left',font:'600 10px system-ui',pill:1,bg:A.alpha(C.pn,.92),col:C.tx});
  if(!A.isDone&&!st.drag&&A.step<5&&!st.T.some(t=>t.br)){ctx.globalAlpha=.55+.45*Math.sin(performance.now()/230);P.label('👆 drag onto a tube',bx+22,by+8,{align:'left',pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1;more=true}
  return more};
 const hitTube=p=>{const g=geo();return st.T.findIndex((t,i)=>Math.abs(p.x-g.x(i))<g.w*.9&&p.y>g.top-40&&p.y<g.bot+20)};
 const gate=()=>A.pred[A.step]==null&&steps[A.step].predict;
 const steps=[
  {h:'The test',p:'Bromine water is orange. To test a liquid, add a few drops, shake, and watch the colour.',predict:{q:'What happens when bromine water is shaken with hexene, an alkene?',opts:['It stays orange','Orange to colourless','Colourless to orange'],ans:1},task:'Drag the dropper onto the tube, then drag the tube side to side to shake it',show:()=>{drop(0);drop(0);shake(0)},
   go:()=>{set(['hexene']);chk=()=>{const t=st.T[0];if(tested(t)&&!free(t))A.done('Orange to colourless. The C=C in hexene opened and took the bromine, so the colour went.'+A.reveal(0))}}},
  {h:'The control',p:'Hexane is an alkane: only single bonds. Testing it next to hexene shows the colour change is caused by the C=C.',predict:{q:'What will bromine water do with hexane?',opts:['Turn colourless too','Stay orange','Go cloudy white'],ans:1},task:'Test the hexane: add bromine water and shake',show:()=>{drop(1);drop(1);shake(1)},
   go:()=>{set(['hexene','hexane']);Object.assign(st.T[0],{br:2,used:2,shook:true});chk=()=>{if(tested(st.T[1]))A.done('It stays orange. Hexane has no C=C, so the bromine has nowhere to add on.'+A.reveal(1))}}},
  {h:'Same formula, different result',p:'Cyclohexane is a ring of six carbons with only single bonds. Its formula, C₆H₁₂, is the same as hexene’s.',predict:{q:'What will bromine water do with cyclohexane?',opts:['Turn colourless, like hexene','Stay orange','Half the colour goes'],ans:1},task:'Test the cyclohexane',show:()=>{drop(1);drop(1);shake(1)},
   go:()=>{set(['hexene','cyclohexane']);Object.assign(st.T[0],{br:2,used:2,shook:true});chk=()=>{if(tested(st.T[1]))A.done('Stays orange. The test finds a C=C bond, not a formula. C₆H₁₂ can be an alkene or a ring with no C=C.'+A.reveal(2))}}},
  {h:'Count the drops',p:'Same-sized samples. Each C=C uses up one drop of this bromine water. Hexene kept the 5th drop orange, so it used 4. Hexa-1,5-diene has two C=C in each molecule.',predict:{q:'How many drops will the diene use up?',opts:['4, the same','8','2'],ans:1},task:'Add drops to the diene, shaking each time, until the orange stays',show:()=>{for(let k=0;k<9;k++)drop(1);shake(1)},
   go:()=>{set(['hexene','diene']);Object.assign(st.T[0],{br:5,used:4,shook:true});chk=()=>{if(ended(st.T[1]))A.done(`It used ${st.T[1].used} drops, twice as many as hexene: two C=C per molecule take twice the bromine.`+A.reveal(3))}}},
  {h:'Oils and fats',p:'Vegetable oils and butter both contain C=C bonds, but not the same number. Equal amounts are tested, each dissolved in a solvent.',predict:{q:'Which will use the most drops?',opts:['Butter','Sunflower oil','All the same'],ans:1},task:'Take all three to the point where the orange stays',show:()=>{[6,4,2].forEach((n,i)=>{for(let k=0;k<n;k++)drop(i);shake(i)})},
   go:()=>{set(['sunflower','olive','butter']);chk=()=>{if(st.T.every(ended))A.done(`Sunflower oil used ${st.T[0].used}, olive oil ${st.T[1].used}, butter ${st.T[2].used}. More drops means more C=C: sunflower oil is the most unsaturated.`+A.reveal(4))}}},
  {h:'Sandbox',p:'Choose what goes in each tube, then test. Try cyclohexene against cyclohexane.',go:()=>{set(['cyclohexene','cyclohexane'])}},
  {h:'Challenge',p:'',go:()=>{set(['hexene','hexane']);newChal()}}];
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;kb.hidden=A.step===6;shelf.hidden=A.step!==5;mkKb();upd()},
  init:A=>{kb=c.el('div',{class:'fl-kb'},A.below);shelf=c.el('div',{class:'fl-ctl'},A.below);chal=c.el('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   shelf.innerHTML=[0,1].map(i=>`<label>Tube ${'AB'[i]} <select data-t="${i}">${Object.keys(S).map(k=>`<option value="${k}">${S[k][0]}</option>`).join('')}</select></label>`).join(' ');
   shelf.querySelectorAll('select').forEach(s=>s.onchange=()=>{const i=+s.dataset.t;st.T[i]=tube(s.value);mkKb();upd()});
   A.gest({down:p=>{if(gate()||A.step===6)return false;const g=geo();if(Math.hypot(p.x-g.bx,p.y-g.by)<34){st.drag='dp';st.dp={x:p.x,y:p.y};return true}const i=hitTube(p);if(i>=0){st.drag={i,x:p.x,run:0};return true}return false},
    move:p=>{if(st.drag==='dp'){st.dp={x:p.x,y:p.y};A.kick()}else if(st.drag){const d=st.drag,t=st.T[d.i];d.run+=Math.abs(p.x-d.x);d.x=p.x;t.off=Math.min(14,d.run/10);A.kick();if(d.run>140){st.drag=null;shake(d.i)}}},
    up:p=>{const d=st.drag;st.drag=null;if(d==='dp'&&p){const i=hitTube(p);if(i>=0)drop(i)}else if(d&&d.run>50)shake(d.i);else if(d)A.tween(st.T[d.i],{off:0},300,'out');A.kick()}})}});
 const mkKb=()=>{kb.innerHTML=st.T.map((t,i)=>`<button type="button" class="lbtn sm ghost" data-a="d${i}">Drop into ${'ABC'[i]}</button><button type="button" class="lbtn sm ghost" data-a="s${i}">Shake ${'ABC'[i]}</button>`).join(' ');
  kb.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(gate())return;const i=+b.dataset.a.slice(1);b.dataset.a[0]==='d'?drop(i):shake(i)});if(shelf)shelf.querySelectorAll('select').forEach((s,i)=>{if(st.T[i])s.value=st.T[i].k})};
 const Q=[{q:'Liquid X turns bromine water from orange to colourless. What does this show?',o:[['X has a C=C bond: it is unsaturated','ok'],['X is saturated','swap'],['X must be ethene','which'],['X is an alkane','alkane']]},
  {q:'Liquid Y has the formula C₅H₁₀ but leaves bromine water orange. What is Y most likely to be?',o:[['A ring compound with no C=C (cyclopentane)','ok'],['An alkene, because of its formula','formula'],['An alkene; the test must have failed','fail']]},
  {q:'Which is the correct way to describe a positive bromine water test?',o:[['Orange to colourless','ok'],['Orange to clear','clear'],['Colourless to orange','swap']]},
  {q:'Equal amounts of two oils are tested. Oil P uses 6 drops of bromine water before the orange stays; oil Q uses 3. Which is true?',o:[['P has more C=C bonds: it is more unsaturated','ok'],['Q is more unsaturated, because it needed fewer drops','reverse'],['P is saturated','swap']]},
  {q:'Why does bromine water lose its colour when shaken with an alkene?',o:[['Bromine adds across the C=C and is used up','ok'],['The alkene dilutes the orange until you cannot see it','dilute'],['Bromine swaps places with hydrogen atoms, as with any hydrocarbon','alkane']]},
  {q:'Hexane and hex-1-ene are tested side by side. Hex-1-ene decolourises bromine water. What does hexane do, and why?',o:[['Stays orange: no C=C for bromine to add to','ok'],['Decolourises too: all hydrocarbons react the same','alkane'],['Stays orange: hexane is not a hydrocarbon','hc']]}];
 let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*2))%Q.length;const q=Q[qi],o=q.o.slice().sort(()=>Math.random()-.5);
  chal.innerHTML=`<p><b>${q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers">${o.map((x,i)=>`<button type="button" class="lbtn sm ghost" data-i="${i}">${x[0]}</button>`).join(' ')}</div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  A.cv.setAttribute('aria-label',`Challenge question: ${q.q} Tube A, hex-1-ene, and tube B, hexane, are on the bench. Use the buttons to answer.`);
  chal.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const k=o[+b.dataset.i][1],fb=chal.querySelector('.fl-fb');let m='';
   if(k==='ok'){fb.innerHTML=`✓ ${o[+b.dataset.i][0]}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   if(k==='swap')m='That is the wrong way round. Losing the orange colour is the positive result: a C=C is there, so the compound is unsaturated.';
   else if(k==='clear')m='Careful: "clear" means see-through, and bromine water is already clear. The right word is colourless.';
   else if(k==='formula')m='A formula like CₙH₂ₙ fits alkenes and ring compounds alike. The test answers the real question: is there a C=C?';
   else if(k==='fail')m='The test worked. Some CₙH₂ₙ compounds are rings with only single bonds, and they leave bromine water orange.';
   else if(k==='which')m='The test only shows whether a C=C is present. Every alkene gives the same result, so it cannot tell you which alkene X is.';
   else if(k==='hc')m='Hexane is a hydrocarbon: only carbon and hydrogen. It stays orange because it has no C=C, only single bonds.';
   else if(k==='reverse')m='More drops used up means more C=C bonds to react with. The oil that took 6 drops is the more unsaturated one.';
   else if(k==='dilute')m='A few drops of liquid cannot dilute the colour away; hexane added the same way stays orange. The bromine reacts and is used up.';
   else m='Alkanes have no C=C, so nothing adds on and the orange stays. (In bright sunlight alkanes react very slowly by swapping H for Br, which is a different reaction.)';
   A.sound.miss();fb.textContent=m})};
 A.start()})})();
