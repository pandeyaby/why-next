/* Flagship – haloalkanes (16–18): build and name haloalkanes (lowest number, prefix), aim a nucleophile at the δ+ carbon to
   swap the halogen for OH or NH₂, rank chloro/bromo/iodo by C–X bond enthalpy and test with silver nitrate, let UV break the
   weaker C–Cl bond in a CFC, then chase one Cl• round the ozone cycle. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',SUB='₀₁₂₃₄';
 const STEM=['meth','eth','prop','but'],XS={Cl:['chloro','#22c55e',346,'white AgCl'],Br:['bromo','#b45309',290,'cream AgBr'],I:['iodo','#7c3aed',228,'yellow AgI'],F:['fluoro','#0ea5e9',467,'']};
 const TG=[[3,'Cl',1],[4,'Br',2],[3,'I',2]],TUBE=['Br','Cl','I'],FAST=['I','Br','Cl'],TT={I:.2,Br:.5,Cl:.9};
 const nm=(n,x,p)=>{const q=M.min(p,n+1-p);return(n>2?q+'-':'')+XS[x][0]+STEM[n-1]+'ane'};
 const cond=(n,x,p)=>{let s='';for(let i=1;i<=n;i++){const h=(n===1?4:i===1||i===n?3:2)-(i===p?1:0);s+='C'+(h?'H'+(h>1?SUB[h]:''):'')+(i===p?x:'')}return s};
 const NU=[['OH⁻','ethanol, CH₃CH₂OH','Br⁻','warm aqueous NaOH'],['NH₃','ethylamine, CH₃CH₂NH₂','HBr (excess NH₃ makes NH₄Br)','excess NH₃ in ethanol, heated in a sealed tube']];
 const CQ=[['Which reacts fastest with silver nitrate in aqueous ethanol?',[['1-iodobutane','ok'],['1-chlorobutane','polar'],['1-fluorobutane','polar']]],
  ['Warm aqueous OH⁻ reacts with bromoethane. What forms?',[['Ethanol and Br⁻','ok'],['Ethene, H₂O and Br⁻','elim'],['Bromoethanol','add']]],
  ['Why does a nucleophile attack the carbon in C–Br?',[['The carbon is δ+ because Br pulls the bond electrons','ok'],['The carbon is δ− and attracts it','sign'],['The bromine is δ+','sign']]],
  ['UV high in the atmosphere hits CCl₂F₂. Which bond breaks?',[['C–Cl','ok'],['C–F','cf'],['Both C–F bonds first','cf']]],
  ['Why can one CFC molecule destroy so much ozone?',[['Its Cl• is set free again after each cycle','ok'],['Each Cl atom destroys one O₃ and is used up','used'],['CFCs trap heat, and heat breaks ozone','warm']]],
  ['HFCs such as CH₂FCF₃ replaced CFCs. Why do they not deplete ozone?',[['They have no C–Cl bond to free Cl•','ok'],['They are too heavy to rise that high','heavy'],['They react with ozone harmlessly','react']]],
  ['CFCs were used in fridges and aerosols. Why?',[['They are unreactive, non-toxic and non-flammable','ok'],['They react quickly with air','react2'],['They absorb UV at ground level','react2']]]];
 const FB={polar:'C–F is the most polar, but polarity does not decide it. The C–X bond must break, and C–I (228 kJ/mol) is the weakest.',elim:'That is elimination, which needs hot OH⁻ in ethanol. Warm aqueous OH⁻ substitutes.',
  add:'The OH replaces the Br; it does not add to the molecule.',sign:'Halogens are more electronegative than carbon, so the carbon is δ+ and the halogen δ−.',cf:'C–F (467 kJ/mol) is much stronger than C–Cl (346), so UV breaks C–Cl.',
  used:'Cl• is regenerated: Cl• + O₃ → ClO• + O₂, then ClO• + O₃ → Cl• + 2O₂. It is a catalyst.',warm:'Ozone loss is a chain reaction of Cl• radicals, not a heating effect.',
  heavy:'CFCs are heavy too, yet winds mix them up. HFCs are harmless to ozone because they have no Cl.',react:'HFCs, like CFCs, are unreactive. They simply have no chlorine to release.',react2:'They were chosen because they are stable and safe at ground level.'};
VIS.reg('flaghalo',c=>{let A,pad,chal,read;
 const G={n:3,x:'Cl',p:1,ti:0,got:0,nu:0,done:[0,0],hit:null,rank:[],t:0,run:0,cfc:0,bad:null,o3:[],rad:'Cl•',kill:0,miss:'',gen:0,check:()=>{},drag:null,Q:null};
 const mode=()=>['name','sub','race','cfc','oz','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?78:62;return{W,H,N,top,cx:W/2,cy:top+(H-top)*.42,bot:H-14}}
 const cpos=(i,g)=>{const gap=M.min(90,(g.W-60)/M.max(G.n,2));return{x:g.cx+(i-(G.n+1)/2)*gap,y:g.cy+(i%2?10:-10)}};
 function atom(x,y,r,col,t,C){A.paint.ball(x,y,r,col);x0.fillStyle='#fff';x0.font=F(800,r>14?14:11);x0.textAlign='center';x0.textBaseline='middle';x0.fillText(t,x,y+1);x0.textBaseline='alphabetic'}
 let x0;
 function bond(a,b,C,w){x0.strokeStyle=C||A.alpha(A.col.tx,.6);x0.lineWidth=w||4;x0.beginPath();x0.moveTo(a.x,a.y);x0.lineTo(b.x,b.y);x0.stroke()}
 function chain(g,C,lab){for(let i=1;i<G.n;i++)bond(cpos(i,g),cpos(i+1,g));for(let i=1;i<=G.n;i++){const p=cpos(i,g);atom(p.x,p.y,17,'#475569','C');x0.fillStyle=C.mu;x0.font=F(700,11);x0.textAlign='center';x0.fillText(String(i),p.x,p.y+34)}
  if(G.p){const p=cpos(G.p,g),h={x:p.x,y:p.y-58};bond(p,h);atom(h.x,h.y,16,XS[G.x][1],G.x);if(lab){x0.font=F(800,13);x0.fillStyle=C.or;x0.fillText('δ+',p.x+24,p.y+4);x0.fillStyle=C.cy;x0.fillText('δ−',h.x+26,h.y)}}
  x0.font=F(800,g.N?16:19);x0.fillStyle=C.tx;x0.textAlign='center';x0.fillText(G.p?nm(G.n,G.x,G.p):STEM[G.n-1]+'ane',g.cx,g.bot-26);x0.font=F(600,13);x0.fillStyle=C.mu;x0.fillText(cond(G.n,G.x,G.p),g.cx,g.bot-6)}
 function subV(g,C){G.n=2;G.p=2;G.x='Br';const k=G.nu,d=G.done[k],cp=cpos(2,g);if(d){for(let i=1;i<2;i++)bond(cpos(1,g),cp);atom(cpos(1,g).x,cpos(1,g).y,17,'#475569','C');atom(cp.x,cp.y,17,'#475569','C');
   const h={x:cp.x,y:cp.y-58};bond(cp,h);atom(h.x,h.y,18,k?'#2563eb':'#dc2626',k?'NH₂':'OH');atom(g.W-50,g.cy-70,16,XS.Br[1],'Br⁻');A.paint.label(NU[k][1],g.cx,g.bot-26,{bg:A.alpha(C.gr,.9)});return}
  chain(g,C,1);const q=G.drag||{x:g.W*.15,y:g.cy+70};atom(q.x,q.y,20,k?'#2563eb':'#dc2626',NU[k][0]);x0.fillStyle=C.mu;x0.font=F(600,12);x0.textAlign='center';x0.fillText('nucleophile: drag me',q.x,q.y+34)}
 function raceV(g,C){const w=M.min(70,g.W/6);TUBE.forEach((x,i)=>{const tx=g.W*(i+1)/4,ty=g.top+40,h=(g.bot-ty)*.62,on=G.t>=TT[x],k=G.rank.indexOf(i);
   x0.strokeStyle=A.alpha(C.tx,.7);x0.lineWidth=2.5;A.paint.rrect(tx-w/2,ty,w,h,12);x0.stroke();x0.fillStyle=A.alpha(C.cy,.12);x0.fillRect(tx-w/2+3,ty+h*.35,w-6,h*.62);
   if(on){x0.fillStyle=x==='Cl'?'#f8fafc':x==='Br'?'#fde68a':'#facc15';x0.globalAlpha=M.min(1,(G.t-TT[x])*6);x0.fillRect(tx-w/2+4,ty+h*.72,w-8,h*.25);x0.globalAlpha=1}
   x0.fillStyle=C.tx;x0.font=F(800,13);x0.textAlign='center';x0.fillText(g.N?XS[x][0]:'1-'+XS[x][0]+'butane',tx,ty-10)
   x0.fillStyle=C.mu;x0.fillText(`C–${x} ${XS[x][2]}`,tx,ty+h+18);if(k>=0){A.paint.ball(tx,ty+h*.2,14,C.vi);x0.fillStyle='#fff';x0.font=F(800,13);x0.fillText(String(k+1),tx,ty+h*.2+5)}
   if(on&&G.t>=1){x0.fillStyle=C.mu;x0.font=F(600,11);x0.fillText(XS[x][3],tx,ty+h+34)}})}
 const ARM=[[-1,0,'Cl'],[1,0,'Cl'],[0,-1,'F'],[0,1,'F']];
 function cfcV(g,C){const R=M.min(80,g.W*.2),cx=g.cx,cy=g.cy;ARM.forEach(([a,b,x],i)=>{const gone=G.cfc===i+1,e={x:cx+a*R-(gone?50:0),y:cy+b*R-(gone?30:0)};if(!gone)bond({x:cx,y:cy},e,G.bad===i?C.rd:null,6);atom(e.x,e.y,18,XS[x][1],gone?'Cl•':x);
   x0.fillStyle=C.mu;x0.font=F(700,11);x0.textAlign='center';if(!gone)x0.fillText(String(XS[x][2]),cx+a*R*.5+(b?22:0),cy+b*R*.5+(a?-10:4))});atom(cx,cy,18,'#475569','C');
  x0.strokeStyle=C.am;x0.lineWidth=3;x0.setLineDash([8,6]);x0.beginPath();x0.moveTo(g.W-30,g.top+6);x0.lineTo(cx+R*.6,cy-R*.5);x0.stroke();x0.setLineDash([]);x0.fillStyle=C.am;x0.font=F(800,13);x0.fillText('UV',g.W-40,g.top+22)}
 const ozp=(i,g)=>{const cols=4,cw=(g.W-40)/cols;return{x:20+cw*(i%cols+.5),y:g.top+40+M.floor(i/cols)*((g.bot-g.top-110)/1.6)}};
 function ozV(g,C){G.o3.forEach((s,i)=>{const p=ozp(i,g);if(s){x0.fillStyle=C.mu;x0.font=F(700,14);x0.textAlign='center';x0.fillText('O₂ + O₂',p.x,p.y);return}
   [[-14,6],[0,-8],[14,6]].forEach(([a,b])=>A.paint.ball(p.x+a,p.y+b,9,'#ef4444'));x0.fillStyle=C.tx;x0.font=F(700,11);x0.fillText('O₃',p.x,p.y+28)});
  const q=G.drag||{x:g.cx,y:g.bot-50};atom(q.x,q.y,21,G.rad==='Cl•'?XS.Cl[1]:'#0d9488',G.rad);x0.fillStyle=C.tx;x0.font=F(800,13);x0.textAlign='center';x0.fillText(`O₃ destroyed: ${G.kill}`,g.cx,g.bot-12)}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x0=x;x.fillStyle=A.mix(C.pn,C.gr,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='name'||m==='free')chain(g,C);else if(m==='sub')subV(g,C);else if(m==='race')raceV(g,C);else if(m==='cfc')cfcV(g,C);else if(m==='oz')ozV(g,C);
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);const hl=wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:C.mu;wrap(x,G.miss||sub(),12,(g.N?46:44)+hl*18,g.W-24,15);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh);return n}
 function head(){const m=mode();if(m==='name')return G.ti<3?`Build: ${nm(...TG[G.ti])} (${G.ti+1} of 3)`:'All three built';if(m==='free')return G.p?nm(G.n,G.x,G.p):STEM[G.n-1]+'ane';
  if(m==='sub')return`Bromoethane + ${NU[G.nu][0]}`;if(m==='race')return'AgNO₃ in aqueous ethanol, 50 °C';if(m==='cfc')return'CCl₂F₂ (a CFC) in the stratosphere';
  if(m==='oz')return`One chlorine radical: now ${G.rad}`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='name'||m==='free')return'Pick a halogen and tap a carbon. Number from the end nearer the halogen.';if(m==='sub')return`Conditions: ${NU[G.nu][3]}. Drag the nucleophile to the atom it attacks.`;
  if(m==='race')return G.rank.length<3?`Tap the tubes from fastest to slowest precipitate: ${G.rank.length} of 3.`:G.t<1?'Warming…':'';if(m==='cfc')return'Tap the bond the UV breaks.';
  if(m==='oz')return'Drag the radical onto an O₃.';return''}
 function tell(msg){const s=(msg?msg+' ':'')+head()+'. '+sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function place(p){if(p<1||p>G.n)return;G.p=p;G.miss='';A.sound.tick();tell(`On carbon ${p}: ${nm(G.n,G.x,p)}, ${cond(G.n,G.x,p)}.`)}
 function setX(x){G.x=x;G.miss='';tell('')}
 function checkName(){const[n,x,p]=TG[G.ti];let m;if(!G.p)m='Put the halogen on a carbon first.';else if(G.x!==x)m=`That is ${XS[G.x][0]}-. The name starts ${XS[x][0]}-, so use ${x}.`;
  else if(nm(G.n,G.x,G.p)!==nm(n,x,p))m=`That gives ${nm(G.n,G.x,G.p)}. The number is the carbon the halogen is on, counted from the nearer end.`;
  if(m){G.miss=m;A.sound.miss();return tell(m)}G.got++;G.ti++;A.sound.pop();const t=TG[G.ti];if(t){G.n=t[0];G.p=0;G.x='Cl'}tell(`Yes: ${nm(n,x,p)}.`)}
 function attack(onC){if(G.done[G.nu])return;if(!onC){G.drag=null;G.miss=`${NU[G.nu][0]} is drawn to the δ+ carbon, not the δ− bromine.`;A.sound.miss();return tell(G.miss)}
  G.done[G.nu]=1;G.drag=null;G.miss='';A.sound.pop();tell(`${NU[G.nu][0]} replaced Br: ${NU[G.nu][1]} + ${NU[G.nu][2]}.`)}
 function swapNu(){G.nu=1-G.nu;G.miss='';tell('')}
 function tap(i){if(G.run||G.rank.includes(i)||G.rank.length>=3)return;G.rank.push(i);A.sound.tick();if(G.rank.length<3)return tell('');G.run=1;G.t=0;tell('');
  A.tween(G,{t:1},2400,'io',()=>{G.run=0;const mine=G.rank.map(j=>TUBE[j]),ok=mine.join()===FAST.join();if(ok){G.miss='';G.got=1;A.sound.pop();tell('Iodo first, then bromo, then chloro: weakest C–X bond breaks fastest.')}
   else{G.miss=`You ranked ${mine.join(', ')}. The precipitates came I, Br, Cl: the weakest C–X bond (C–I) breaks first, whatever the polarity. Try again.`;G.rank=[];G.t=0;A.sound.miss();tell(G.miss)}})}
 function hitBond(i){if(G.cfc)return;if(ARM[i][2]==='F'){G.bad=i;G.miss='C–F (467 kJ/mol) is too strong for this UV. Find the weaker bond.';A.sound.miss();return tell(G.miss)}G.bad=null;G.cfc=i+1;G.miss='';A.sound.pop();tell('UV broke C–Cl (346 kJ/mol): a Cl• radical is free.')}
 function zap(i){if(i<0||G.o3[i])return;G.drag=null;if(G.rad==='Cl•'){G.rad='ClO•';G.o3[i]=1;G.kill++;A.sound.pop();return tell('Cl• + O₃ → ClO• + O₂.')}G.rad='Cl•';G.o3[i]=1;G.kill++;A.sound.pop();tell('ClO• + O₃ → Cl• + 2O₂. The Cl• is free again.')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='name'&&G.ti<3||k==='free'){['Cl','Br','I'].forEach(x=>b(x,()=>setX(x),'Use '+XS[x][0]));for(let i=1;i<=G.n;i++)b('C'+i,()=>place(i),'Put it on carbon '+i);if(k==='name')b('Check',checkName)}
  if(k==='free'){b('Shorter',()=>{G.n=M.max(1,G.n-1);G.p=M.min(G.p,G.n);tell('')});b('Longer',()=>{G.n=M.min(4,G.n+1);tell('')})}
  if(k==='sub'){if(!G.done[G.nu]){b(NU[G.nu][0]+' → carbon',()=>attack(1));b(NU[G.nu][0]+' → bromine',()=>attack(0))}b('Swap nucleophile',swapNu)}
  if(k==='race'&&G.rank.length<3)TUBE.forEach((x,i)=>{if(!G.rank.includes(i))b('1-'+XS[x][0]+'butane',()=>tap(i))});
  if(k==='cfc'&&!G.cfc)ARM.forEach((a,i)=>b('Break C–'+a[2]+(i%2?' (2nd)':''),()=>hitBond(i)));if(k==='oz'&&G.o3.includes(0))b(G.rad+' hits next O₃',()=>zap(G.o3.indexOf(0)))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{n:3,x:'Cl',p:0,ti:0,got:0,nu:0,done:[0,0],rank:[],t:0,run:0,cfc:0,bad:null,o3:[0,0,0,0,0,0,0,0],rad:'Cl•',kill:0,miss:'',drag:null},o||{})};
 const steps=[
  {h:'Name a haloalkane',p:'A haloalkane is an alkane with a halogen in place of an H. The prefix names the halogen. The number is its carbon, counted from the nearer end.',
   predict:{q:'Br is on the 3rd carbon of a 4-carbon chain. What is its name?',opts:['3-bromobutane','2-bromobutane','bromobutane'],ans:1},
   task:'Build all three named molecules',show:()=>play([()=>setX('Cl'),()=>place(1),checkName,()=>setX('Br'),()=>place(3),checkName,()=>setX('I'),()=>place(2),checkName],300),
   go:()=>{reset();G.check=when(0,()=>G.ti>=3,()=>'Carbon 3 of butane is carbon 2 from the other end, so it is 2-bromobutane.')}},
  {h:'Swap the halogen',p:'The halogen pulls the C–X electrons towards itself, so the carbon is δ+. A nucleophile, which has a lone pair, attacks that carbon and the halide leaves.',
   predict:{q:'OH⁻ is negative. Which atom does it attack?',opts:['The δ− bromine','The δ+ carbon'],ans:1},
   task:'Swap Br for OH, then for NH₂',show:()=>play([()=>attack(1),swapNu,()=>attack(1)],600),go:()=>{reset();G.check=when(1,()=>G.done[0]&&G.done[1],()=>'Nucleophilic substitution: OH⁻ gives an alcohol and NH₃ gives an amine.')}},
  {h:'Which breaks fastest?',p:'Water in the tube is a weak nucleophile. When it frees X⁻, silver ions make a precipitate. Rank the tubes before you warm them.',
   predict:{q:'C–Cl is the most polar of these three bonds. Which reacts fastest?',opts:['1-chlorobutane','1-iodobutane'],ans:1},
   task:'Rank the tubes so the test confirms your order',show:()=>{G.rank=[];play([()=>tap(2),()=>tap(0),()=>tap(1)],300)},go:()=>{reset();G.check=when(2,()=>G.got,()=>'Bond enthalpy decides the rate: C–I 228 < C–Br 290 < C–Cl 346 kJ/mol.')}},
  {h:'CFCs in the sky',p:'CFCs like CCl₂F₂ cooled fridges because they are so unreactive. That let them drift up to the stratosphere, where strong UV can break a bond.',
   predict:{q:'Why do CFCs last long enough to reach the ozone layer?',opts:['They are very unreactive','They are lighter than air'],ans:0},
   task:'Let the UV break the right bond',show:()=>hitBond(0),go:()=>{reset();G.check=when(3,()=>G.cfc,()=>'C–Cl is weaker than C–F, so UV frees a Cl• radical.')}},
  {h:'One Cl•, many O₃',p:'Cl• takes an O from O₃. Then ClO• meets another O₃ and frees the Cl• again.',
   predict:{q:'Cl• has destroyed one O₃. What happens to the chlorine?',opts:['It is used up','It goes on to destroy more'],ans:1},
   task:'Destroy six O₃ with one chlorine',show:()=>play(Array.from({length:6},()=>()=>zap(G.o3.indexOf(0))),350),go:()=>{reset();G.check=when(4,()=>G.kill>=6,()=>'Overall 2O₃ → 3O₂ and Cl• comes out unchanged: a catalyst. One Cl• can destroy many thousands of O₃, so CFCs were banned.')}},
  {h:'Sandbox',p:'Make any haloalkane with up to 4 carbons. Try every carbon and watch the number.',go:()=>reset({p:1})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;let t,opts;if(qi%2===0){const n=3+qi/2%2,x=['Cl','Br','I'][qi/2%3],p=n===4?(qi/2%4<2?2:1):2;t=`Name ${cond(n,x,p)}.`;
   const ok=nm(n,x,p),q=M.min(p,n+1-p),far=n+1-q;opts=[[ok,'ok'],[(q===1?n:n===3?1:far)+'-'+XS[x][0]+STEM[n-1]+'ane','num'],[(n>2?q+'-':'')+XS[x][0]+STEM[n-2]+'ane','stem']];G.Q={t,a:` Count ${n} carbons (${STEM[n-1]}-) and number from the end nearer the ${x}.`}}
  else{const Q=CQ[((qi-1)/2)%CQ.length];t=Q[0];opts=Q[1].slice();G.Q={t}}const r=qi%3;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='num')m='Wrong number. Give the halogen the lowest number you can, and always number a chain of 3 or more.';else if(o[1]==='stem')m=`Count the carbons again: the stem gives the chain length.`;
  else if(o[1]==='polar')m='Polarity does not decide it. The C–X bond must break, and C–I is the weakest.';else if(!ok)m=FB[o[1]];
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m+(G.Q.a||'');A.cv.setAttribute('aria-label',s);
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();
  if(m==='name'||m==='free'){for(let i=1;i<=G.n;i++){const q=cpos(i,g);if(M.hypot(p.x-q.x,p.y-q.y)<36)place(i)}return false}
  if(m==='sub'&&!G.done[G.nu]){const q={x:g.W*.15,y:g.cy+70};if(M.hypot(p.x-q.x,p.y-q.y)<40){G.drag=p;return true}return false}
  if(m==='race'){const i=TUBE.findIndex((x,i)=>M.abs(p.x-g.W*(i+1)/4)<45&&p.y>g.top);if(i>=0)tap(i);return false}
  if(m==='cfc'){const R=M.min(80,g.W*.2);const i=ARM.findIndex(([a,b])=>M.hypot(p.x-(g.cx+a*R*.6),p.y-(g.cy+b*R*.6))<30);if(i>=0)hitBond(i);return false}
  if(m==='oz'){const q={x:g.cx,y:g.bot-50};if(M.hypot(p.x-q.x,p.y-q.y)<44){G.drag=p;return true}const i=G.o3.findIndex((s,i)=>!s&&M.hypot(p.x-ozp(i,g).x,p.y-ozp(i,g).y)<34);if(i>=0)zap(i)}return false}
 function mv(p){if(G.drag){G.drag=p;A.redraw()}}
 function up(p){const m=mode(),g=geo();if(!G.drag)return;G.drag=null;if(m==='sub'){const cp=cpos(2,g),bp={x:cp.x,y:cp.y-58};if(M.hypot(p.x-cp.x,p.y-cp.y)<44)return attack(1);if(M.hypot(p.x-bp.x,p.y-bp.y)<40)return attack(0)}
  if(m==='oz'){const i=G.o3.findIndex((s,i)=>!s&&M.hypot(p.x-ozp(i,g).x,p.y-ozp(i,g).y)<40);if(i>=0)return zap(i)}A.redraw()}
 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Haloalkane controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
