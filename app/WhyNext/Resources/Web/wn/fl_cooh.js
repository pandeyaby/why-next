/* Flagship 55 – carboxylic acids: stretch the chain to name the acid; tap the H that leaves; magnesium race in HCl vs
   ethanoic acid; reagents + limewater; drag an alcohol into an acid to make and name an ester. */
(()=>{const STEM=['','meth','eth','prop','but'],cap=s=>s[0].toUpperCase()+s.slice(1),
 R=n=>n===1?'H':'CH₃'+'CH₂'.repeat(n-2),Rp=m=>m===1?'CH₃':'CH₂'.repeat(m-1)+'CH₃',acid=n=>STEM[n]+'anoic acid',
 ester=(m,n)=>STEM[m]+'yl '+STEM[n]+'anoate',RG=[{n:'magnesium',c:'#9ca3af',g:'H₂'},{n:'sodium carbonate',c:'#f8fafc',g:'CO₂'},{n:'copper',c:'#b45309',g:''}];
VIS.reg('flagcooh',c=>{let A,pad,chal,read;const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui`;x.textAlign=a||'center'};
 const G={n:2,ion:0,mg:[0,0],v:[0,0],rg:-1,milk:0,alc:0,acid:2,cat:0,made:'',drag:null,dp:null,x0:0,n0:0,tok:0,flash:0,want:()=>{},Q:null,cq:'',said:'',bub:0};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['chain','ion','race','react','ester','ester','q'][A.step];
 const maxA=()=>A.step===5?4:3;
 function status(){const m=mode();let t;
  if(m==='chain')t=`${cap(acid(G.n))}, ${R(G.n)}COOH: ${G.n} carbon atom${G.n>1?'s':''}, counting the carbon in –COOH.`;
  else if(m==='ion')t=G.ion?'The O–H hydrogen has left as H⁺. What remains is the ethanoate ion, CH₃COO⁻.':'Ethanoic acid, CH₃COOH. Four hydrogens: three on carbon, one on oxygen. Tap the one that leaves in water.';
  else if(m==='race')t=['hydrochloric acid','ethanoic acid'].map((s,k)=>`${s}: ${G.mg[k]?Math.round(G.v[k])+' cm³ of hydrogen':'no magnesium yet'}`).join('; ')+'.';
  else if(m==='react')t=G.rg<0?'Ethanoic acid in a flask. Gas from the flask bubbles through limewater.':G.rg===2?'Copper: no bubbles. Copper is too unreactive to react with acids.':G.rg===0?'Magnesium fizzes: hydrogen. The limewater stays clear. Magnesium ethanoate forms.':'Fizzing: carbon dioxide turns the limewater milky. Sodium ethanoate and water form.';
  else{const a=acid(G.acid);t=G.made?`Made ${G.made}, ${R(G.acid)}COO${Rp(G.alc)}, and water. It smells fruity.`:G.alc?`${cap(STEM[G.alc])}anol in ${a}, no catalyst: almost nothing happens.`:`Flask: ${a}. Catalyst ${G.cat?'added and warmed':'not added'}. Drag in an alcohol.`}
  tell(t);sync();G.want()}
 // ---- geometry ----
 const top=()=>A.narrow?58:52;
 function atoms(n,ion){const L=[],B=[],cols=n+3,dx=Math.min(64,(A.W-30)/cols),x0=(A.W-dx*(cols-1))/2,y=top()+(A.H-top())*.55,X=i=>x0+i*dx,v=dx*.95;
  L.push({x:X(0),y,s:'H',k:'ch'});
  for(let i=1;i<=n;i++){L.push({x:X(i),y,s:'C'});B.push([X(i-1),y,X(i),y,1]);
   if(i<n){L.push({x:X(i),y:y-v,s:'H',k:'ch'},{x:X(i),y:y+v,s:'H',k:'ch'});B.push([X(i),y,X(i),y-v,1],[X(i),y,X(i),y+v,1])}}
  L.push({x:X(n),y:y-v,s:'O'},{x:X(n+1),y,s:ion?'O⁻':'O'});B.push([X(n),y,X(n),y-v,2],[X(n),y,X(n+1),y,1]);
  const h={x:X(n+2),y,s:'H',k:'oh'};if(ion){h.x+=dx*.4;h.y+=v*.9;h.s='H⁺'}else B.push([X(n+1),y,X(n+2),y,1]);L.push(h);return{L,B,v,r:Math.min(16,dx*.3)}}
 function fgeo(){const N=A.narrow,y=top()+(N?80:70),w=Math.min(N?A.W*.4:150,(A.H-y)*.8),h=Math.min(A.H-y-14,w*1.15);return{w,h,y,x:k=>A.W*(k?.73:.27)-w/2}}
 // ---- drawing ----
 function head(ctx,a,b){const C=A.col;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font=`700 ${A.narrow?15:18}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(a,12,22);ctx.font='600 13px system-ui';ctx.fillStyle=C.mu;ctx.fillText(b,12,A.narrow?44:42)}
 function mol(ctx,n,ion){const C=A.col,{L,B,r,v}=atoms(n,ion),y=L[0].y;ctx.strokeStyle=A.alpha(C.tx,.7);ctx.lineWidth=2.5;
  for(const[a,b,c2,d,k]of B){if(k===2){const o=r*.32;[-o,o].forEach(e=>{ctx.beginPath();ctx.moveTo(a+e,b);ctx.lineTo(c2+e,d);ctx.stroke()})}else{ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c2,d);ctx.stroke()}}
  for(const t of L){const col=t.s[0]==='C'?'#334155':t.s[0]==='O'?'#dc2626':t.k==='oh'?'#f59e0b':'#e2e8f0';A.paint.ball(t.x,t.y,t.s==='H'||t.s==='H⁺'?r*.8:r,col);
   ctx.fillStyle=t.s[0]==='H'&&t.k!=='oh'?'#0f172a':'#fff';ft(ctx,700,Math.round(r*.85));ctx.textBaseline='middle';ctx.fillText(t.s,t.x,t.y+1)}
  const cX=L.filter(t=>t.s==='C').pop().x;ctx.strokeStyle=C.am;ctx.setLineDash([4,4]);ctx.lineWidth=2;A.paint.rrect(cX-r*1.6,y-v-r-5,L.find(t=>t.s[0]==='O'&&t.y===y).x-cX+r*3.2,v+r*2+10,10);ctx.stroke();ctx.setLineDash([])}
 function flask(ctx,x,y,w,h,liq,lab){const C=A.col,nk=w*.3;ctx.beginPath();ctx.moveTo(x+w/2-nk/2,y);ctx.lineTo(x+w/2-nk/2,y+h*.32);ctx.lineTo(x,y+h);ctx.lineTo(x+w,y+h);ctx.lineTo(x+w/2+nk/2,y+h*.32);ctx.lineTo(x+w/2+nk/2,y);
  ctx.save();ctx.clip();ctx.fillStyle=liq;ctx.fillRect(x,y+h*.5,w,h*.5);ctx.restore();ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2.5;ctx.stroke();
  ctx.fillStyle=C.tx;ft(ctx,700,12);ctx.textBaseline='alphabetic';ctx.fillText(lab,x+w/2,y+h+16)}
 function dots(ctx,x,y,w,h,k){const n=12;for(let i=0;i<n;i++){const u=x+w*(.2+.6*((i*37)%n)/n),v=y+h*(.6+.32*((i*53)%n)/n),hp=k?i===5:i%2;
   A.paint.ball(u,v,hp?4:5.5,hp?'#dc2626':k?'#7e22ce':'#16a34a');if(G.mg[k])for(let b=0;b<(k?1:3);b++){const t=((G.bub*(k?.4:1.6)+i*.37+b*.3)%1);if(i<4){ctx.fillStyle=A.alpha('#fff',.8);ctx.beginPath();ctx.arc(u+b*6,y+h*(1-t*.5)-4,2.5,0,7);ctx.fill()}}}}
 function syringe(ctx,x,y,w,v){const C=A.col;ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2;ctx.strokeRect(x,y,w,16);ctx.fillStyle=A.alpha(C.cy,.35);ctx.fillRect(x,y,w*v/60,16);
  ctx.fillStyle=C.tx;ctx.fillRect(x+w*v/60-2,y-4,4,24);ft(ctx,600,12);ctx.fillText(Math.round(v)+' cm³',x+w/2,y-8)}
 function bottle(ctx,x,y,s,lab,col,on){const C=A.col;ctx.fillStyle=col;A.paint.rrect(x,y,s,s,9);ctx.fill();ctx.strokeStyle=on?C.am:A.alpha(C.tx,.4);ctx.lineWidth=on?3:1.5;ctx.stroke();
  ctx.fillStyle='#0f172a';ft(ctx,700,Math.min(12,s/6.6|0));ctx.textBaseline='middle';lab.split(' ').forEach((w,i,a)=>ctx.fillText(w,x+s/2,y+s/2+(i-(a.length-1)/2)*13))}
 const shelf=()=>{const m=mode(),k=m==='react'?3:maxA(),s=Math.min(64,(A.W-24)/k-10);return{k,s,x:i=>12+i*(s+10),y:top()+2}};
 function draw(A){const{ctx,W,H,col:C}=A,m=mode();ctx.fillStyle=A.mix(C.pn,C.cy,.04);ctx.fillRect(0,0,W,H);
  if(m==='chain'||m==='ion'){const n=m==='ion'?2:G.n;head(ctx,m==='ion'?'Ethanoic acid':cap(acid(n)),m==='ion'?(G.ion?'CH₃COO⁻ + H⁺':'Which H leaves?'):`${n} carbon${n>1?'s':''}: ${R(n)}COOH`);mol(ctx,n,m==='ion'&&G.ion);
   if(m==='chain'){ctx.fillStyle=C.mu;ft(ctx,600,12);ctx.fillText('◀ drag sideways to change the chain ▶',W/2,H-10)}}
  else if(m==='race'){const g=fgeo();head(ctx,'Same concentration, same magnesium','');['HCl','CH₃COOH'].forEach((s,k)=>{const x=g.x(k);flask(ctx,x,g.y,g.w,g.h,A.alpha(C.cy,.15),s);dots(ctx,x,g.y,g.w,g.h,k);syringe(ctx,x,g.y-34,g.w,G.v[k]);
    ctx.fillStyle=C.mu;ctx.font='600 11px system-ui';ctx.fillText(k?'1 in 100 ionised':'all ionised',x+g.w/2,g.y+g.h+30)});
   if(!(G.mg[0]&&G.mg[1])){const p=G.drag!=null?G.dp:{x:W/2,y:g.y+g.h*.3};ctx.strokeStyle='#9ca3af';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(p.x-14,p.y);ctx.lineTo(p.x+14,p.y);ctx.stroke();ctx.fillStyle=C.tx;ft(ctx,600,11);ctx.fillText('Mg',p.x,p.y-9)}}
  else if(m==='react'){const g=fgeo(),sh=shelf();head(ctx,'','');RG.forEach((r,i)=>bottle(ctx,sh.x(i),sh.y,sh.s,r.n,r.c,G.rg===i));flask(ctx,g.x(0),g.y+20,g.w,g.h-20,A.alpha('#a855f7',.15),'ethanoic acid');
   const tx=g.x(1)+g.w*.3,tw=g.w*.4;ctx.strokeStyle=A.alpha(C.tx,.6);ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(g.x(0)+g.w/2,g.y+20);ctx.lineTo(g.x(0)+g.w/2,g.y+6);ctx.lineTo(tx+tw/2,g.y+6);ctx.lineTo(tx+tw/2,g.y+g.h*.8);ctx.stroke();
   ctx.fillStyle=A.mix('#7dd3fc','#e2e8f0',G.milk);ctx.globalAlpha=.5+.5*G.milk;ctx.fillRect(tx,g.y+g.h*.45,tw,g.h*.5);ctx.globalAlpha=1;ctx.strokeRect(tx,g.y+30,tw,g.h-15);ctx.fillStyle=C.tx;ft(ctx,700,12);ctx.fillText('limewater: '+(G.milk>.5?'milky':'clear'),tx+tw/2,g.y+g.h+30);
   if(G.rg>=0&&G.rg<2)for(let i=0;i<8;i++){const t=(G.bub+i/8)%1;ctx.fillStyle=A.alpha('#fff',.85);ctx.beginPath();ctx.arc(g.x(0)+g.w*(.3+.4*((i*5)%8)/8),g.y+g.h-8-t*g.h*.4,3,0,7);ctx.fill()}
   if(G.drag!=null){ctx.globalAlpha=.8;bottle(ctx,G.dp.x-sh.s/2,G.dp.y-sh.s/2,sh.s,RG[G.drag].n,RG[G.drag].c,1);ctx.globalAlpha=1}}
  else if(m==='ester'){const g=fgeo(),sh=shelf();for(let i=0;i<sh.k;i++)bottle(ctx,sh.x(i),sh.y,sh.s,STEM[i+1]+'anol','#dbeafe',G.alc===i+1);
   const fx=W*.5-g.w/2;const fh=Math.min(g.h-10,H-g.y-72);flask(ctx,fx,g.y+10,g.w,fh,G.made?A.alpha('#fde68a',.6):A.alpha('#a855f7',.15),acid(G.acid));
   if(G.cat){ctx.fillStyle=C.rd;ft(ctx,700,12);ctx.fillText('+ H₂SO₄ catalyst, warmed',W/2,g.y+4)}
   if(G.made){ctx.fillStyle=C.tx;ft(ctx,800,A.narrow?15:18);ctx.fillText(G.made,W/2,H-24);ctx.font='600 13px system-ui';ctx.fillStyle=C.mu;ctx.fillText(`${R(G.acid)}COO${Rp(G.alc)} + H₂O`,W/2,H-6)}
   if(G.drag!=null){ctx.globalAlpha=.8;bottle(ctx,G.dp.x-sh.s/2,G.dp.y-sh.s/2,sh.s,STEM[G.drag+1]+'anol','#dbeafe',1);ctx.globalAlpha=1}}
  else if(G.Q&&G.Q.k==='name'){head(ctx,G.Q.t,'');mol(ctx,G.Q.n)}
  else if(G.Q){head(ctx,G.Q.t,'');ctx.fillStyle=C.tx;ft(ctx,800,A.narrow?20:26);ctx.fillText(G.Q.big,W/2,top()+(H-top())/2)}
  if(G.flash>0){ctx.strokeStyle=A.alpha(C.gr,G.flash);ctx.lineWidth=5;ctx.strokeRect(4,4,W-8,H-8)}A.fx.draw(ctx)}
 // ---- actions ----
 const setN=n=>{n=Math.max(1,Math.min(4,n));if(n!==G.n){G.n=n;A.sound.tick()}status()};
 function tapH(k){if(G.ion)return;if(k==='oh'){G.ion=1;A.sound.pop();status()}else{A.sound.miss();tell('That hydrogen stays put. C–H bonds do not break in water; only the H on the oxygen of –COOH can leave.')}}
 function addMg(k){if(G.mg[k])return;G.mg[k]=1;A.sound.pop();status()}
 function addR(i){G.rg=i;G.milk=0;if(i===1)A.tween(G,{milk:1},1400,'out');A.sound.pop();status()}
 function addAlc(m){G.alc=m;G.made=G.cat?ester(m,G.acid):'';if(G.made){A.sound.pop();G.flash=.7;A.tween(G,{flash:0},600,'out')}status()}
 // ---- buttons ----
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',A.step===6?G.cq||'Challenge.':G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.disabled=!!dis;e.onclick=()=>{f();A.sound.tick()}};
  if(m==='chain'){B('− carbon',()=>setN(G.n-1),G.n<2);B('+ carbon',()=>setN(G.n+1),G.n>3)}
  if(m==='ion'){B('Remove the O–H hydrogen',()=>tapH('oh'),G.ion);B('Remove a C–H hydrogen',()=>tapH('ch'),G.ion);B('Put it back',()=>{G.ion=0;status()},!G.ion)}
  if(m==='race'){B('Magnesium into HCl',()=>addMg(0),G.mg[0]);B('Magnesium into ethanoic acid',()=>addMg(1),G.mg[1]);B('Start again',()=>{G.mg=[0,0];G.v=[0,0];status()})}
  if(m==='react')RG.forEach((r,i)=>B('Add '+r.n,()=>addR(i)));
  if(m==='ester'){B('◀ Acid',()=>{G.acid=G.acid>1?G.acid-1:maxA();G.made='';G.alc=0;status()});B('Acid ▶',()=>{G.acid=G.acid%maxA()+1;G.made='';G.alc=0;status()});
   B(G.cat?'Catalyst added ✓':'Add catalyst and warm',()=>{G.cat=1;if(G.alc)addAlc(G.alc);else status()},G.cat);for(let i=1;i<=maxA();i++)B('Add '+STEM[i]+'anol',()=>addAlc(i))}
  A.redraw()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.drag=null},play=(fs,ms=500)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 const steps=[
  {h:'Count the carbons',p:'Every carboxylic acid ends in a –COOH group (dashed box). Drag sideways on the molecule, or use the buttons, to change the chain.',
   predict:{q:'Ethanoic acid is CH₃COOH. How many carbon atoms does it have?',opts:['1: the COOH is extra','2','3'],ans:1},task:'Build propanoic acid',show:()=>play([()=>setN(2),()=>setN(3)]),
   go:()=>{fresh();G.n=1;status();G.want=fin(0,()=>G.n===3,()=>'Propanoic acid, CH₃CH₂COOH: three carbons, including the one in –COOH. The stem counts every carbon, as in alkanes.')}},
  {h:'One hydrogen leaves',p:'An acid gives H⁺ ions in water. Tap the hydrogen you think leaves.',
   predict:{q:'Ethanoic acid has four hydrogens. How many can it give away as H⁺?',opts:['four','one','three'],ans:1},task:'Tap the hydrogen that leaves as H⁺',show:()=>play([()=>tapH('oh')]),
   go:()=>{fresh();G.ion=0;status();G.want=fin(1,()=>G.ion,()=>'Only the H on the oxygen. CH₃COOH ⇌ CH₃COO⁻ + H⁺. The ion left behind is ethanoate, which names the salts.')}},
  {h:'Strong or weak?',p:'Both flasks hold acid at the same concentration. Drag the magnesium ribbon into each flask, or use the buttons. The syringes collect hydrogen.',
   predict:{q:'Which flask fizzes faster?',opts:['both the same: both are acids','ethanoic acid: its molecules are bigger','hydrochloric acid'],ans:2},task:'Drop magnesium into both flasks',show:()=>play([()=>addMg(0),()=>addMg(1)]),
   go:()=>{fresh();G.mg=[0,0];G.v=[0,0];status();G.want=fin(2,()=>G.mg[0]&&G.mg[1],()=>'HCl fizzes much faster: it is fully ionised. Ethanoic acid is weak, about 1 in 100 molecules ionised at once, so fewer H⁺ ions. Watch: it still ends at 60 cm³, because more molecules ionise as H⁺ is used up.')}},
  {h:'What else reacts?',p:'Drag a reagent onto the flask, or use the buttons. The gas bubbles through limewater.',
   predict:{q:'Sodium carbonate goes into ethanoic acid. What makes the fizz?',opts:['hydrogen','carbon dioxide','oxygen'],ans:1},task:'Add sodium carbonate and watch the limewater',show:()=>play([()=>addR(1)]),
   go:()=>{fresh();G.rg=-1;G.milk=0;status();G.want=fin(3,()=>G.rg===1,()=>'Carbon dioxide: the limewater turns milky. 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂. Magnesium gives hydrogen instead.')}},
  {h:'Make an ester',p:'Alcohol + carboxylic acid → ester + water, with an acid catalyst and warming. Choose the acid, add the catalyst, then drag in an alcohol.',
   predict:{q:'Ethanol + ethanoic acid → ethyl ethanoate + …',opts:['hydrogen','carbon dioxide','water'],ans:2},task:'Make methyl propanoate',show:()=>play([()=>{G.acid=3;G.alc=0;G.made='';status()},()=>{G.cat=1;status()},()=>addAlc(1)]),
   go:()=>{fresh();G.acid=2;G.alc=0;G.cat=0;G.made='';status();G.want=()=>{if(A.step===4&&G.made==='propyl methanoate')tell('That is propyl methanoate. The alcohol gives the first word (methyl), the acid gives the second (propanoate).');fin(4,()=>G.made==='methyl propanoate',()=>'Methyl propanoate, CH₃CH₂COOCH₃. The alcohol gives the "-yl" word and the acid gives the "-oate" word. The O–H of the acid and the H of the alcohol leave as water.')()}}},
  {h:'Sandbox',p:'Any acid with any alcohol, up to four carbons. Say the ester name before you drop the bottle in.',go:()=>{fresh();G.alc=0;G.made='';G.cat=1;status()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const KS=['name','ester','gas','salt','ph','ester','name','gas'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3,n=2+qn%3,m=1+(qn+1)%3;let q,ops,t='',big='';
  if(k==='name'){t='Name this acid';big=R(n)+'COOH';q=`What is ${big} called?`;ops=[[acid(n),'ok'],[acid(n-1),'cnt'],[STEM[n]+'anol','ol']]}
  else if(k==='ester'){const mm=m===n?m%3+1:m;t='Name the ester';big=`${STEM[mm]}anol + ${acid(n)}`;q=`What ester forms from ${big}?`;ops=[[ester(mm,n),'ok'],[ester(n,mm),'swap'],[STEM[mm]+'anoyl '+STEM[n]+'anol','mix']]}
  else if(k==='gas'){const r=qn%2;t='Which gas?';big=(r?'Na₂CO₃':'Mg')+' + '+R(n)+'COOH';q=`${cap(RG[r].n)} is added to ${acid(n)}. Which gas forms?`;ops=[['hydrogen',r?'h2':'ok'],['carbon dioxide',r?'ok':'co2'],['oxygen','o2']]}
  else if(k==='salt'){t='Name the salt';big='NaOH + '+R(n)+'COOH';q=`Sodium hydroxide neutralises ${acid(n)}. Which salt forms?`;ops=[['sodium '+STEM[n]+'anoate','ok'],['sodium '+STEM[n]+'anol','ol'],['sodium '+STEM[n]+'anoic','ic']]}
  else{t='Same concentration';big='HCl  vs  CH₃COOH';q='Both acids are 0.1 mol/dm³. Which solution has the higher pH?';ops=[['ethanoic acid','ok'],['hydrochloric acid','rev'],['the same: same concentration','same']]}
  G.Q={k,t,big,n};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick'),seq=ops.slice(j).concat(ops.slice(0,j));seq.forEach(([s,tag])=>{const e=c.el('button',{type:'button',class:'lbtn sm'},row,s);e.onclick=()=>judge(tag)});
  G.cq='Challenge: '+q;A.cv.setAttribute('aria-label',G.cq);c.say(G.cq);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Right.';
  else if(tag==='cnt')m=`Count the carbon in –COOH too: ${G.Q.n} carbons in total.`;
  else if(tag==='ol')m='The "-ol" ending means an alcohol (–OH). Acids end in "-oic acid" and their salts in "-oate".';
  else if(tag==='swap')m='The order is swapped. The alcohol gives the first word ("-yl") and the acid gives the second ("-oate").';
  else if(tag==='mix')m='Those are just the two reactants run together. The ester is "alkyl alkanoate": the alcohol part, then the acid part.';
  else if(tag==='h2')m='Hydrogen comes from a metal and an acid. A carbonate gives carbon dioxide.';
  else if(tag==='co2')m='Carbon dioxide needs a carbonate. A metal and an acid give hydrogen.';
  else if(tag==='o2')m='Acids never release oxygen gas here. Metals give hydrogen and carbonates give carbon dioxide.';
  else if(tag==='ic')m='"-oic" names the acid itself. Once the H⁺ is gone, the ion is the "-oate" ion.';
  else if(tag==='rev')m='Hydrochloric acid is fully ionised, so it has more H⁺ and the lower pH (about 1 against about 2.9).';
  else m='Same concentration, but ethanoic acid is weak: only about 1 in 100 molecules ionise, so fewer H⁺ ions and a higher pH.';
  if(tag==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;read.hidden=A.step===6;pad.hidden=A.step===6;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.every(dt=>{let on=false;if(mode()==='race'){[30,3].forEach((r,k)=>{if(G.mg[k]&&G.v[k]<60){G.v[k]=Math.min(60,G.v[k]+r*dt);on=true;if(G.v[k]>=60)status()}})}
    if((mode()==='race'&&(G.mg[0]||G.mg[1]))||(mode()==='react'&&G.rg>=0&&G.rg<2)){G.bub+=dt*.8;on=!A.reduced()}return on});
   const inShelf=p=>{const s=shelf();if(p.y<s.y-6||p.y>s.y+s.s+6)return-1;for(let i=0;i<s.k;i++)if(p.x>s.x(i)-5&&p.x<s.x(i)+s.s+5)return i;return-1};
   const onFlask=(p,k)=>{const g=fgeo(),x=mode()==='ester'?A.W/2-g.w/2:g.x(k);return p.x>x-10&&p.x<x+g.w+10&&p.y>g.y-10&&p.y<g.y+g.h+10};
   A.gest({down:p=>{const m=mode();if(m==='q')return false;
     if(m==='chain'){G.x0=p.x;G.n0=G.n;return true}
     if(m==='ion'){const{L,r}=atoms(2,G.ion),h=L.find(t=>t.k&&Math.hypot(p.x-t.x,p.y-t.y)<r+14);if(h)tapH(h.k);return false}
     if(m==='race'){for(const k of[0,1])if(onFlask(p,k)){addMg(k);return false}const g=fgeo();if(G.mg[0]&&G.mg[1]||Math.hypot(p.x-A.W/2,p.y-g.y-g.h*.3)>40)return false;G.drag=0;G.dp=p;return true}
     const i=inShelf(p);if(i>=0){G.drag=i;G.dp=p;return true}return false},
    move:p=>{if(mode()==='chain'){const d=Math.min(64,(A.W-30)/(G.n+3));setN(G.n0+Math.round((p.x-G.x0)/d));return}if(G.drag!=null){G.dp=p;A.redraw()}},
    up:p=>{const d=G.drag,m=mode();G.drag=null;if(d==null)return;
     if(m==='race'){for(const k of[0,1])if(onFlask(p,k)){addMg(k);return}A.redraw();return}
     if(onFlask(p,0)){if(m==='react')addR(d);else addAlc(d+1)}else{tell('Drop it onto the flask.');A.redraw()}}});sync()}});
 A.start()})})();
