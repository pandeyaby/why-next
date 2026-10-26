/* Flagship 45 – alcohols. A bench with a displayed formula, two test tubes and a burner. Grow methanol → butanol
   (CₙH₂ₙ₊₁OH); drag indicator, sodium or an oxidiser onto tubes (neutral pH 7 beside NaOH, gentle H₂ fizz beside water,
   alcohol → carboxylic acid at pH 3); drag O₂ into the burner until an atom tally balances (the alcohol's own O counts;
   odd chains need the alcohol doubled). Traps are the real slips. */
(()=>{const SB='₀₁₂₃₄₅₆₇₈₉',sb=k=>k>1?String(k).replace(/\d/g,d=>SB[d]):'',ST=['','meth','eth','prop','but'];
 const fo=n=>n===1?'CH₃OH':`C${sb(n)}H${sb(2*n+1)}OH`,ac=n=>n===1?'HCOOH':n===2?'CH₃COOH':`C${sb(n-1)}H${sb(2*n-1)}COOH`;
 const HC='#e5e7eb',W0='#fff',PH={7:'#22c55e',13:'#7c3aed',3:'#f97316'},frac=x=>x%1?`${Math.floor(x)||''}½`:String(x);
VIS.reg('flagalc',c=>{let A,pad,chal,read;const hot=[];
 const B={n:2,view:'mol',tubes:[],chip:null,drag:null,k:1,m:0,ok:new Set(),seen:new Set(),done:new Set(),goal:()=>{},run:0,jolt:0,acid:false};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const T=(kind,n,o={})=>Object.assign({kind,n,ph:null,na:0,ox:false},o),tn=t=>t.kind==='alc'?(t.ox?`${ST[t.n]}anoic acid`:`${ST[t.n]}anol`):t.kind==='naoh'?'sodium hydroxide':'water';
 function setN(n){B.n=Math.max(1,Math.min(4,n));B.seen.add(B.n);A.sound.tick();const n2=B.n;
  say(`${ST[n2]}anol, ${fo(n2)}: ${n2} carbon${n2>1?'s':''}, ${2*n2+1} H on the chain and 1 on the O. ${2*n2+1} = 2 × ${n2} + 1, so it fits CₙH₂ₙ₊₁OH.`);sync();B.goal()}
 function apply(chip,i){const t=B.tubes[i];if(!t)return;A.sound.pop();const nm=tn(t);
  if(chip==='ind'){if(t.ph!=null){say(`The ${nm} already has indicator in it.`);return}t.ph=t.kind==='naoh'||t.na?13:t.ox?3:7;
   say(t.ph>7?`Purple, about pH 13: the ${nm} ${t.na?'now holds the alkali sodium made':'releases OH⁻ ions, so it is alkaline'}.`:t.ox?`The ${nm} turns the indicator orange, about pH 3: it is a weak acid.`:`The ${nm} solution stays green, pH 7: neutral. Its –OH is bonded to carbon and does not come off as an OH⁻ ion.`)}
  else if(chip==='na'){t.na=performance.now();if(t.ph)t.ph=13;
   say(t.kind==='water'?'Sodium fizzes fast in water and gives hydrogen: 2Na + 2H₂O → 2NaOH + H₂.':`Sodium fizzes gently in ${nm}: the H on the O is replaced by Na, and hydrogen gas bubbles off. 2${fo(t.n)} + 2Na → 2${fo(t.n).replace(/OH$/,'ONa')} + H₂.`)}
  else if(chip==='ox'){if(t.kind!=='alc'||t.ox){say('Only alcohols oxidise here.');return}t.ox=true;if(t.ph==7)t.ph=3;
   say(`The oxidising agent turns ${ST[t.n]}anol into ${ST[t.n]}anoic acid, ${ac(t.n)}. The –CH₂OH end becomes –COOH${t.ph==3?', and the indicator drops to orange, about pH 3':''}.`)}
  B.done.add(chip+i);sync();B.goal()}
 const need=()=>B.k*(3*B.n+1),oL=()=>B.k+2*B.m;
 function setM(m,k){B.m=Math.max(0,Math.min(14,m));if(k)B.k=k;const L=oL(),R=need();
  if(L===R){B.ok.add(B.n);A.sound.pop();const k2=B.k;say(`Balanced: ${k2>1?k2:''}${fo(B.n)} + ${B.m}O₂ → ${k2*B.n>1?k2*B.n:''}CO₂ + ${k2*(B.n+1)}H₂O. O: ${k2} in the alcohol + ${2*B.m} in O₂ = ${R} in the products.`)}
  else if(L>R){B.jolt=1;A.tween(B,{jolt:0},500,'out');A.sound.miss();say(`Too much oxygen: ${L} O on the left, ${R} on the right.${(R-B.k)%2?' O₂ adds 2 O at a time, so this cannot balance: double the alcohol.':''}`)}
  else{A.sound.tick();say(`O on the left: ${B.k} from the alcohol + ${2*B.m} from O₂ = ${L}. The products need ${R}.`)}sync();B.goal()}
 function play(list,ms=380){const tok=++B.run;let j=0;const go=()=>{if(tok!==B.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){if(A.step===7)return 'Challenge: '+((chal.querySelector('b')||{}).textContent||'');
  if(B.view==='mol')return `Displayed formula of ${ST[B.n]}anol, ${fo(B.n)}: a chain of ${B.n} carbons with an O–H on the end carbon.`;
  if(B.view==='burn')return `Burner: ${B.k} ${fo(B.n)} and ${B.m} O₂ on the left; ${B.k*B.n} CO₂ and ${B.k*(B.n+1)} H₂O on the right. Oxygen atoms: ${oL()} left, ${need()} right${oL()===need()?', balanced':''}.`;
  return 'Two tubes: '+B.tubes.map((t,i)=>`tube ${i+1} ${tn(t)}${t.ph!=null?`, indicator ${t.ph===7?'green pH 7':t.ph===13?'purple pH 13':'orange pH 3'}`:''}${t.na?', fizzing with sodium':''}`).join('; ')+'.'}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';if(A.step===7)return A.redraw();
  const b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(B.view==='mol')[1,2,3,4].forEach(n=>b(`${ST[n]}anol`,`Show ${ST[n]}anol`,()=>setN(n)));
  if(B.view==='burn'){b('+ O₂','Add one oxygen molecule',()=>setM(B.m+1));b('− O₂','Take away one oxygen molecule',()=>setM(B.m-1),!B.m);b(B.k>1?'× 1 alcohol':'× 2 alcohol',B.k>1?'Use one alcohol molecule':'Double the alcohol molecules',()=>setM(0,B.k>1?1:2));
   if(A.step===4)[1,3].forEach(n=>b(`${ST[n]}anol`,`Burn ${ST[n]}anol`,()=>{B.n=n;setM(0,1)}))}
  if(B.view==='tubes'){const ch=CH.filter(x=>B.chips.includes(x[0]));B.tubes.forEach((t,i)=>ch.forEach(([k,l])=>b(`${l} → ${i+1}`,`Add ${l} to tube ${i+1}, ${tn(t)}`,()=>apply(k,i))));
   if(A.step===6)[1,2,3,4].forEach(n=>b(`${ST[n]}anol`,`Fill tube 1 with ${ST[n]}anol`,()=>{B.tubes[0]=T('alc',n);sync()}))}
  A.redraw()}
 const CH=[['ind','Indicator'],['na','Sodium'],['ox','Oxidiser']];
 // ---- drawing ----
 function atom(x,y,r,t,col,fg){A.paint.ball(x,y,r,col);const ctx=A.ctx;ctx.fillStyle=fg||'#111';ctx.font=`800 ${Math.round(r*1.05)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t,x,y+.5)}
 function mol(n,cx,cy,s){const ctx=A.ctx,C=A.col,g=46*s,x0=cx-g*n/2;ctx.lineWidth=2.2;ctx.strokeStyle=C.tx;const ln=(a,b,c2,d)=>{ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c2,d);ctx.stroke()};
  for(let i=0;i<n;i++){const x=x0+i*g,last=i===n-1;ln(x,cy,x+g,cy);if(i===0)ln(x,cy,x-g*.62,cy),atom(x-g*.62,cy,8*s,'H',HC);
   for(const d of[-1,1])ln(x,cy,x,cy+d*g*.62),atom(x,cy+d*g*.62,8*s,'H',HC);atom(x,cy,11*s,'C','#374151','#fff')}
  const ox2=x0+n*g;ctx.strokeStyle=C.gr;ctx.lineWidth=3.5;ctx.beginPath();ctx.arc(ox2+g*.31,cy,g*.62,0,7);ctx.stroke();ctx.lineWidth=2.2;ctx.strokeStyle=C.tx;
  atom(ox2,cy,10*s,'O','#ef4444',W0);ln(ox2,cy,ox2+g*.62,cy);atom(ox2+g*.62,cy,8*s,'H',HC)}
 function drawMol(){const{ctx,W,H,col:C}=A,n=B.n,s=A.narrow?Math.min(1,(W-40)/(46*(n+2.3))):1.15;mol(n,W/2-23*s*.6,H*.42,s);
  hot.push({k:'mol',x:0,y:0,w:W,h:H*.7});if(B.hide)return;ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.font=`800 ${A.narrow?20:24}px system-ui`;ctx.fillText(`${ST[n]}anol  ${fo(n)}`,W/2,H*.75);ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;
  ctx.fillText(`H on the chain: ${2*n+1} = 2 × ${n} + 1 · green ring: the –OH`,W/2,H*.75+24)}
 function drawTubes(){const{ctx,W,H,col:C,paint:P}=A,nT=B.tubes.length,tw=Math.min(70,W*.16),th=H*.5,ty=H*.12;
  B.tubes.forEach((t,i)=>{const x=W*(i+1)/(nT+1)-tw/2,lv=ty+th*.35,col=t.ph!=null?PH[t.ph]:A.alpha(C.cy,.18);ctx.fillStyle=col;P.rrect(x+3,lv,tw-6,th-(lv-ty)-3,tw/2-4);ctx.fill();
   ctx.strokeStyle=C.tx;ctx.lineWidth=2;P.rrect(x,ty,tw,th,tw/2);ctx.stroke();if(t.na&&!A.reduced()&&performance.now()-t.na<5e3&&Math.random()<(t.kind==='water'?.9:.35))B.fx.add(1,()=>({x:x+tw*(.25+Math.random()*.5),y:ty+th-12,vy:-(t.kind==='water'?120:50),life:1.2,r:2.5,col:A.alpha(C.tx,.6)}));
   if(t.na){ctx.fillStyle='#9ca3af';P.rrect(x+tw/2-8,lv-8,16,10,3);ctx.fill();P.label('H₂ ↑',x+tw/2,ty-12,{font:'700 11px system-ui',bg:A.alpha(C.tx,.75),col:C.pn})}
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='top';ctx.font=`700 ${A.narrow?11:13}px system-ui`;ctx.fillText(`${i+1}. ${tn(t)}`,x+tw/2,ty+th+8);
   if(t.ph!=null){ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.fillText(`pH ${t.ph}`,x+tw/2,ty+th+26)}hot.push({k:'tube',i,x:x-14,y:ty-10,w:tw+28,h:th+30})});
  B.fx.draw(ctx);const ch=CH.filter(x=>B.chips.includes(x[0])),cw=Math.min(110,(W-20)/ch.length-8);
  ch.forEach(([k,l],j)=>{const d=B.drag&&B.drag.k===k,x=d?B.drag.x-cw/2:10+j*(cw+8),y=d?B.drag.y-15:H-44,on=B.chip===k;P.shadow(5,2,.2);ctx.fillStyle=k==='ind'?'#16a34a':k==='na'?'#6b7280':'#c2410c';P.rrect(x,y,cw,30,9);ctx.fill();P.noShadow();
   if(on){ctx.strokeStyle=C.am;ctx.lineWidth=3;P.rrect(x,y,cw,30,9);ctx.stroke()}ctx.fillStyle='#fff';ctx.font='800 12px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l,x+cw/2,y+15.5);if(!d)hot.push({k:'chip',c:k,x,y,w:cw,h:30})})}
 function drawBurn(){const{ctx,W,H,col:C,paint:P}=A,R=need(),L=oL(),j=B.jolt*Math.sin(B.jolt*28)*5,cols=A.narrow?4:5,zw=W*.5-16,cs=Math.min(40,zw/cols);
  ctx.fillStyle=A.alpha(C.or,.12);P.rrect(8+j,8,zw,H*.5,14);ctx.fill();ctx.strokeStyle=A.alpha(C.or,.6);ctx.setLineDash([5,4]);P.rrect(8+j,8,zw,H*.5,14);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=C.tx;ctx.font=`800 ${A.narrow?12:14}px system-ui`;ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText(`${B.k>1?B.k+' × ':''}${fo(B.n)}  +  ${B.m} O₂`,16+j,14);
  for(let q=0;q<B.m;q++){const x=24+j+(q%cols)*cs,y=44+Math.floor(q/cols)*cs*.85;atom(x,y,8,'O','#ef4444',W0);atom(x+13,y,8,'O','#ef4444',W0);hot.push({k:'o2',x:x-10,y:y-10,w:33,h:20})}
  ctx.textAlign='left';ctx.fillStyle=C.tx;ctx.fillText(`→ ${B.k*B.n} CO₂ + ${B.k*(B.n+1)} H₂O`,W*.5+8,14);
  const fx=W*.75,fy=H*.42;ctx.fillStyle=P.rad(fx,fy,4,40,[[0,'#fde68a'],[.5,'#f59e0b'],[1,A.alpha('#ef4444',0)]]);ctx.beginPath();ctx.ellipse(fx,fy,22,40,0,0,7);ctx.fill();
  const rows=[['C',B.k*B.n,B.k*B.n],['H',B.k*(2*B.n+2),B.k*(2*B.n+2)],['O',L,R]],y0=H*.66,bw=W-150;
  rows.forEach(([e,l,r],i)=>{const y=y0+i*(A.narrow?22:24),sc=bw/Math.max(R,L,B.k*(2*B.n+2),1),ok=l===r;ctx.fillStyle=C.tx;ctx.font='800 12px system-ui';ctx.textBaseline='middle';ctx.fillText(e,10,y);
   ctx.fillStyle=A.alpha(C.cy,.85);ctx.fillRect(28,y-8,l*sc,7);ctx.fillStyle=A.alpha(C.vi,.85);ctx.fillRect(28,y+1,r*sc,7);ctx.fillStyle=ok?C.gr:C.rd;ctx.fillText(`${l} | ${r} ${ok?'✓':'✗'}`,W-112,y)});
  ctx.fillStyle=C.mu;ctx.font='600 11px system-ui';ctx.fillText('left (cyan) | right (purple) atom counts',28,y0-20);
  const ox=B.drag?B.drag.x-22:W-58,oy=B.drag?B.drag.y-14:H*.55;P.shadow(5,2,.2);ctx.fillStyle='#ef4444';P.rrect(ox,oy,44,28,9);ctx.fill();P.noShadow();ctx.fillStyle='#fff';ctx.font='800 13px system-ui';ctx.textAlign='center';ctx.fillText('O₂',ox+22,oy+14.5);
  if(!B.drag)hot.push({k:'src',x:ox,y:oy,w:44,h:28});B.zone={x:8,y:8,w:zw,h:H*.5}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;hot.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.gr,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  B.view==='mol'?drawMol():B.view==='burn'?drawBurn():drawTubes()}
 // ---- steps ----
 const fresh=(view,tubes,chips)=>{B.run++;B.view=view;B.tubes=tubes||[];B.chips=chips||[];B.chip=null;B.drag=null;B.ok=new Set();B.seen=new Set();B.done=new Set();B.goal=()=>{};B.hide=false;c.say('');if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'The alcohol family',p:'An alcohol is a carbon chain with an –OH group, ringed in green. Tap the molecule to add a carbon, or use the buttons.',
   predict:{q:'Butanol has 4 carbons. What is its formula?',opts:['C₄H₁₀OH, like butane plus OH','C₄H₉OH','C₄H₈OH'],ans:1},
   task:'Show all four, methanol to butanol',show:()=>play([1,2,3,4].map(n=>()=>setN(n))),
   go:()=>{fresh('mol');B.n=1;B.seen=new Set([1]);sync();B.goal=fin(0,()=>B.seen.size===4,'CH₃OH, C₂H₅OH, C₃H₇OH, C₄H₉OH: CₙH₂ₙ₊₁OH. The –OH takes the place of one H from the alkane.')}},
  {h:'Neutral, not alkaline',p:'Tube 1 is ethanol in water, tube 2 sodium hydroxide. Drag the indicator onto each.',
   predict:{q:'Ethanol has an –OH group. What colour does universal indicator turn in ethanol solution?',opts:['Purple: –OH makes it alkaline','Green: neutral, pH 7','Red: acidic'],ans:1},
   task:'Add indicator to both tubes',show:()=>play([()=>apply('ind',0),()=>apply('ind',1)],700),
   go:()=>{fresh('tubes',[T('alc',2),T('naoh',0)],['ind']);sync();B.goal=fin(1,()=>B.done.has('ind0')&&B.done.has('ind1'),'Green beside purple. The O–H in ethanol is a covalent bond to carbon, so no OH⁻ ions form. Alcohol solutions are neutral.')}},
  {h:'Sodium fizz',p:'Drop a piece of sodium into ethanol and into water. Watch the bubbles.',
   predict:{q:'How does sodium behave in ethanol compared with water?',opts:['No reaction: only acids fizz with metals','It fizzes, but more gently than in water','It fizzes faster than in water'],ans:1},
   task:'Add sodium to both tubes',show:()=>play([()=>apply('na',0),()=>apply('na',1)],700),
   go:()=>{fresh('tubes',[T('alc',2),T('water',0)],['na']);sync();B.goal=fin(2,()=>B.done.has('na0')&&B.done.has('na1'),'Both give hydrogen. In ethanol, sodium swaps for the H on the O, making sodium ethoxide, more gently.')}},
  {h:'Burning ethanol',p:'Alcohols burn to carbon dioxide and water. Drag O₂ into the orange box until the O atoms balance.',
   predict:{q:'How many O₂ molecules does one C₂H₅OH need? The products are 2 CO₂ and 3 H₂O.',opts:['3½: the products hold 7 O','3','4'],ans:1},
   task:'Balance the burning of ethanol',show:()=>play([0,1,2,3].map(m=>()=>setM(m))),
   go:()=>{fresh('burn');B.n=2;B.k=1;B.m=0;sync();B.goal=fin(3,()=>B.ok.has(2),'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. The products hold 7 O, but ethanol brings 1 itself, so only 6 come from O₂.')}},
  {h:'Odd chains',p:'Methanol and propanol would need half an O₂ each. Doubling the alcohol fixes that.',
   predict:{q:'CH₃OH burns to CO₂ + 2H₂O. How many O₂ per molecule of methanol?',opts:['1','1½','2'],ans:1},
   task:'Balance methanol and propanol (double the alcohol when you need to)',show:()=>play([()=>{B.n=1;setM(0,2)},()=>setM(3),()=>{B.n=3;setM(0,2)},()=>setM(9)],600),
   go:()=>{fresh('burn');B.n=1;B.k=1;B.m=0;sync();B.goal=fin(4,()=>B.ok.has(1)&&B.ok.has(3),'2CH₃OH + 3O₂ → 2CO₂ + 4H₂O and 2C₃H₇OH + 9O₂ → 6CO₂ + 8H₂O.')}},
  {h:'Oxidised to an acid',p:'An oxidising agent turns the –CH₂OH end into –COOH. Both tubes already hold indicator.',
   predict:{q:'Ethanol is oxidised. What does it become?',opts:['Ethene','Ethanoic acid','Only carbon dioxide and water'],ans:1},
   task:'Oxidise both alcohols',show:()=>play([()=>apply('ox',0),()=>apply('ox',1)],700),
   go:()=>{fresh('tubes',[T('alc',2,{ph:7}),T('alc',3,{ph:7})],['ox']);sync();B.goal=fin(5,()=>B.done.has('ox0')&&B.done.has('ox1'),'Ethanol → ethanoic acid (vinegar), propanol → propanoic acid. Green turns orange: acids formed.')}},
  {h:'Sandbox',p:'Pick an alcohol for tube 1 and try every reagent on it and on water.',go:()=>{fresh('tubes',[T('alc',1),T('water',0)],['ind','na','ox']);sync()}},
  {h:'Challenge',p:'',go:()=>{fresh('mol');B.n=2;ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>B.goal()});
 // ---- challenge ----
 const QS=[{q:'What is the formula of propanol?',o:[['C₃H₇OH','ok'],['C₃H₈OH','alkH'],['C₃H₆OH','short']],n:3},
  {q:'How many O₂ molecules does one butanol, C₄H₉OH, need to burn completely?',o:[['6','ok'],['6½','ownO'],['13','atoms']],n:4,v:'burn'},
  {q:'Universal indicator is added to ethanol solution. What pH does it show?',o:[['7','ok'],['13','oh'],['3','acid']],n:2},
  {q:'Sodium is dropped into propanol. Which gas bubbles off?',o:[['Hydrogen','ok'],['Carbon dioxide','co2'],['Oxygen','co2']],n:3},
  {q:'Butanol is oxidised by an oxidising agent. What forms?',o:[['Butanoic acid','ok'],['Butene','ene'],['Butane','ane']],n:4},
  {q:'What are the products when ethanol burns completely?',o:[['Carbon dioxide and water','ok'],['Carbon dioxide and hydrogen','h2'],['Ethanoic acid','oxid']],n:2,v:'burn'},
  {q:'What is the formula of methanol?',o:[['CH₃OH','ok'],['CH₄OH','alkH'],['C₂H₅OH','stem']],n:1},
  {q:'How many O₂ molecules does one ethanol molecule need to burn completely?',o:[['3','ok'],['3½','ownO'],['7','atoms']],n:2,v:'burn'}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];B.view='mol';B.n=q.n;B.hide=true;const k=qi%3,o=q.o.slice(k).concat(q.o.slice(0,k));
  chal.innerHTML=`<p><b>${q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(([l,s])=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,l);b.onclick=()=>judge(q,s)});sync()}
 function judge(q,s){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),n=q.n,o2=3*n/2;let m;B.hide=false;
  if(q.v==='burn'){B.view='burn';B.k=1;B.m=Math.floor(o2)}
  if(s==='ok')m=`Right: ${q.o[0][0]}.`+(q.v?` ${fo(n)} + ${frac(o2)}O₂ → ${n>1?n:''}CO₂ + ${n+1}H₂O.`:'');
  else if(s==='alkH')m=`That keeps all the alkane’s H. The –OH replaces one H, so the chain has 2 × ${n} + 1 = ${2*n+1}: ${fo(n)}.`;
  else if(s==='short')m=`One H too few. The chain carries 2n + 1 = ${2*n+1} H, then the –OH adds one more: ${fo(n)}.`;
  else if(s==='stem')m=`Meth- means one carbon, so methanol is CH₃OH. C₂H₅OH is ethanol.`;
  else if(s==='ownO')m=`You forgot the O inside the alcohol. The products need ${3*n+1} O; the alcohol gives 1, so O₂ gives ${3*n}, which is ${frac(o2)} O₂.`;
  else if(s==='atoms')m=`${3*n+1} is the O atoms in the products. The alcohol brings 1, so O₂ gives ${3*n} O: ${frac(o2)} O₂.`;
  else if(s==='oh')m=`The –OH in an alcohol is bonded to carbon and does not form OH⁻ ions, so the solution is neutral, pH 7, not alkaline.`;
  else if(s==='acid')m=`Alcohols are neutral, pH 7. It is the carboxylic acid made by oxidising them that is acidic.`;
  else if(s==='co2')m=`Sodium swaps for the H of the O–H, and that H leaves as hydrogen gas. No carbon dioxide or oxygen is made.`;
   else if(s==='ene'||s==='ane')m=`Oxidation adds oxygen to the –CH₂OH end, making –COOH, so a carboxylic acid forms: ${ST[n]}anoic acid.`;
  else if(s==='h2')m=`The H atoms end up in water, not as hydrogen gas. Complete combustion gives carbon dioxide and water.`;
  else m=`Burning is complete oxidation all the way to carbon dioxide and water. An oxidising agent, not a flame, makes ethanoic acid.`;
  if(s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==7;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);B.fx=A.fx;
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Alcohol, reagent and oxygen controls'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.every(()=>B.view==='tubes'&&B.tubes.some(t=>t.na&&performance.now()-t.na<5e3));
   const inn=(p,q)=>q&&p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h,at=p=>hot.find(q=>inn(p,q));
   A.gest({down:p=>{if(A.step===7)return false;const t=at(p);if(!t)return false;
     if(t.k==='mol'){setN(B.n%4+1);return false}if(t.k==='o2'){setM(B.m-1);return false}if(t.k==='src'){B.drag={k:'o2',x:p.x,y:p.y};return true}
     if(t.k==='chip'){B.chip=t.c;B.drag={k:t.c,x:p.x,y:p.y};A.redraw();return true}if(t.k==='tube'){if(B.chip)apply(B.chip,t.i);else say('Pick a reagent first.');}return false},
    move:p=>{if(B.drag){B.drag.x=p.x;B.drag.y=p.y;A.redraw()}},
    up:p=>{const d=B.drag;B.drag=null;if(!d)return;if(d.k==='o2'){if(inn(p,B.zone))setM(B.m+1);else{say('Drop O₂ inside the orange box.');A.redraw()}return}
     const t=hot.find(q=>q.k==='tube'&&inn(p,q));if(t)apply(d.k,t.i);else{say(`${CH.find(x=>x[0]===d.k)[1]} selected: tap a tube, or drag it onto one.`);A.redraw()}}});sync()}});
 A.start()})})();
