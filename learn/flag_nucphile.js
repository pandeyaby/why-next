/* Flagship – nucleophiles (ages 17–18): tap the atom whose lone pair does the attacking in OH⁻, NH₃, CN⁻, H₂O and H⁻;
   drag eight species into nucleophile, electrophile or neither; tap the δ+ atom a nucleophile attacks in bromoethane,
   ethanal and propanone; predict the product of five nucleophile + substrate pairs (CN⁻ adds a carbon, NaBH₄ gives an
   alcohol); then name each mechanism as nucleophilic substitution, nucleophilic addition or electrophilic addition. */
(()=>{const lo=Math.min,hi=Math.max;
 // atoms: [label, x, y, lone-pair angles (deg, canvas y down), charge]; bonds: [i, j, order]
 const SP=[{n:'hydroxide ion, OH⁻',a:[['O',0,0,[-90,180,90],'−'],['H',1.2,0,[],'']],b:[[0,1,1]],ans:0,why:['','H has no lone pair: its only pair is the O–H bond. The three lone pairs and the charge sit on O.']},
  {n:'ammonia, NH₃',a:[['N',0,0,[-90],''],['H',-1.1,.6,[],''],['H',1.1,.6,[],''],['H',0,1.25,[],'']],b:[[0,1,1],[0,2,1],[0,3,1]],ans:0,why:['','Each H is held by a bonding pair and has nothing spare. The lone pair is on N.']},
  {n:'cyanide ion, CN⁻',a:[['C',-.65,0,[180],'−'],['N',.65,0,[0],'']],b:[[0,1,3]],ans:0,why:['','N has a lone pair too, but cyanide attacks through C, which carries the charge, so a new C–C bond forms.']},
  {n:'water, H₂O',a:[['O',0,0,[-135,-45],''],['H',-1,.75,[],''],['H',1,.75,[],'']],b:[[0,1,1],[0,2,1]],ans:0,why:['','Water is neutral, but its O has two lone pairs. The δ+ H atoms cannot donate anything.']},
  {n:'hydride ion, H⁻ (from NaBH₄)',a:[['H',0,0,[0],'−']],b:[],ans:0,why:['']}];
 const BINS=['Nucleophile','Electrophile','Neither'];
 const CARDS=[['OH⁻',0,'OH⁻ has lone pairs on O and a negative charge: a donor.'],['NH₃',0,'NH₃ is neutral, but its N lone pair can still be donated.'],['CN⁻',0,'CN⁻ donates the lone pair on C.'],['H₂O',0,'The O in water has two lone pairs: a weak nucleophile.'],
  ['NO₂⁺',1,'NO₂⁺ is positive with no lone pair to give: it accepts a pair, so it is an electrophile.'],['H⁺',1,'H⁺ has no electrons at all; it can only accept a pair.'],
  ['Br₂',1,'Near a C=C the π electrons polarise Br–Br, making the near Br δ+: an electrophile.'],['CH₄',2,'CH₄ has no lone pair and no polar bond, so it neither donates nor attracts a pair.']];
 const MOL=[{n:'bromoethane',a:[['CH₃',-1.4,0],['CH₂',0,0,'δ+'],['Br',1.4,0,'δ−']],b:[[0,1,1],[1,2,1]],ans:1},
  {n:'ethanal',a:[['CH₃',-1.4,.3],['C',0,0,'δ+'],['H',1.3,.4],['O',0,-1.3,'δ−']],b:[[0,1,1],[1,2,1],[1,3,2]],ans:1},
  {n:'propanone',a:[['CH₃',-1.4,.4],['C',0,0,'δ+'],['CH₃',1.4,.4],['O',0,-1.3,'δ−']],b:[[0,1,1],[1,2,1],[1,3,2]],ans:1}];
 const PROD=[['OH⁻ (warm, aqueous) + CH₃CH₂Br',['CH₃CH₂OH, ethanol','CH₂=CH₂, ethene','CH₃OH, methanol'],['Warm aqueous OH⁻ substitutes; ethene needs hot ethanolic KOH (elimination).','The carbon chain does not change length: OH just replaces Br.']],
  ['CN⁻ (KCN in ethanol) + CH₃CH₂Br',['CH₃CH₂CN, propanenitrile','CH₃CN, ethanenitrile','CH₃CH₂NH₂, ethylamine'],['The C of CN⁻ is a new carbon: two from the chain plus one makes propanenitrile.','An amine needs NH₃ as the nucleophile, not CN⁻.']],
  ['NH₃ (excess, in ethanol) + CH₃CH₂Br',['CH₃CH₂NH₂, ethylamine','CH₃CH₂OH, ethanol','CH₃CH₂CN, propanenitrile'],['An alcohol needs OH⁻. Here the N lone pair attacks, so N joins the chain.','A nitrile needs CN⁻. NH₃ gives an amine.']],
  ['NaBH₄ (H⁻) + CH₃COCH₃',['CH₃CH(OH)CH₃, propan-2-ol','CH₃CH₂CHO, propanal','CH₃COOH, ethanoic acid'],['H⁻ adds to the δ+ carbon and O gains H: a ketone gives a secondary alcohol, not an aldehyde.','NaBH₄ is a reducing agent; it cannot make a carboxylic acid.']],
  ['CN⁻ / H⁺ + CH₃CHO',['CH₃CH(OH)CN, 2-hydroxypropanenitrile','CH₃CH₂CN, propanenitrile','CH₃COCN'],['C=O opens and keeps its oxygen as OH; nothing leaves in an addition.','CN⁻ adds to the carbonyl carbon and O picks up H⁺, so the O stays as OH.']]];
 const MECH=['Nucleophilic substitution','Nucleophilic addition','Electrophilic addition'];
 const RX=[['OH⁻ + bromoethane',0],['CN⁻ + ethanal',1],['Br₂ + ethene',2],['NH₃ + chloromethane',0],['NaBH₄ + propanal',1],['HBr + propene',2]];
 const MWHY=[['','Something leaves (the halide), so it is substitution, not addition.','The attacker gives a pair to a δ+ carbon, so it is nucleophilic.'],
  ['Nothing leaves: the C=O opens and both parts add on, so it is addition.','','The attacker donates a pair to the δ+ carbonyl carbon: nucleophilic.'],
  ['The alkene π pair attacks; the reagent accepts it, so it is electrophilic.','The reagent accepts a pair from the C=C, so it is electrophilic.','']];
VIS.reg('flagnucphile',c=>{let A,pad,chal,qi=-1,tok=0;
 const S={i:0,bad:-1,bin:[],cur:0,hold:null,mi:0,pi:0,ri:0,show:false,want:()=>{}};
 const desc=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const st=()=>['pair','sort','site','prod','mech','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,fs=z=>A.narrow?z:z+3,U=()=>lo(A.W,A.H)*.13;
 const tx=(x,s,px,py,z,k,w)=>{x.font=`${w||700} ${fs(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-12)};
 const pill=(x,r,k,thick,a)=>{x.fillStyle=A.alpha(k,a==null?.14:a);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=k;x.lineWidth=thick?4:1.5;x.stroke()};
 const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const miss=t=>{A.sound.miss();desc(t);A.redraw()};
 const hit=t=>{A.sound.pop();desc(t);ctl();A.redraw();S.want()};
 const P=(a,cx,cy)=>({x:cx+a[1]*U(),y:cy+a[2]*U()});
 function mol(x,m,cx,cy,mark,bad,deltas){const C=A.col,r=U()*.42;
  m.b.forEach(([i,j,o])=>{const p=P(m.a[i],cx,cy),q=P(m.a[j],cx,cy),dx=q.x-p.x,dy=q.y-p.y,L=Math.hypot(dx,dy),nx=-dy/L*5,ny=dx/L*5;x.strokeStyle=C.tx;x.lineWidth=2.5;
   for(let k=0;k<o;k++){const s=k-(o-1)/2;x.beginPath();x.moveTo(p.x+nx*s,p.y+ny*s);x.lineTo(q.x+nx*s,q.y+ny*s);x.stroke()}});
  m.a.forEach((a,i)=>{const p=P(a,cx,cy),k=i===mark?C.gr:i===bad?C.rd:C.cy;x.fillStyle=A.mix(C.pn,k,.25);x.beginPath();x.arc(p.x,p.y,r*(a[0].length>2?1.25:1),0,7);x.fill();x.strokeStyle=k;x.lineWidth=i===mark||i===bad?4:2;x.stroke();
   tx(x,a[0],p.x,p.y,15,C.tx,800);(Array.isArray(a[3])?a[3]:[]).forEach(d=>{const t=d*Math.PI/180;[-1,1].forEach(s=>{x.fillStyle=C.tx;x.beginPath();x.arc(p.x+Math.cos(t)*r*1.45-Math.sin(t)*s*5,p.y+Math.sin(t)*r*1.45+Math.cos(t)*s*5,2.8,0,7);x.fill()})});
   if(a[4])tx(x,a[4],p.x+r*.9,p.y-r*.95,15,C.tx,800);if(deltas&&typeof a[3]==='string')tx(x,a[3],p.x,p.y-r*1.7,14,a[3]==='δ+'?C.rd:C.ac,800)})}
 const atomAt=(m,p,cx,cy)=>m.a.findIndex(a=>{const q=P(a,cx,cy);return Math.hypot(p.x-q.x,p.y-q.y)<hi(26,U()*.6)});
 // ---- step 1: find the donating pair ----
 function pairV(x){const C=A.col;if(S.i>=5)return tx(x,'Every donor pair found: O, N, C, O, H.',A.W/2,Y(.45),16,C.gr);const s=SP[S.i];
  tx(x,`Tap the atom that donates the pair: ${s.n}`,A.W/2,Y(.08),14,C.tx);mol(x,s,A.W/2,Y(.5),-1,S.bad);tx(x,`${S.i+1} of 5`,A.W/2,Y(.92),13,C.tx,600)}
 function donor(k){if(S.i>=5)return;const s=SP[S.i];if(k!==s.ans){S.bad=k;return miss(s.why[k]||'Tap an atom that has a lone pair to give.')}
  S.bad=-1;S.i++;hit(`Yes: the ${s.a[k][0]} lone pair is the one donated.`)}
 // ---- step 2: sort ----
 const bin=i=>{const g=8,w=(A.W-4*g)/3;return{x:g+i*(w+g),y:Y(.5),w,h:Y(.47)}};
 const cardR=i=>{const g=8,w=(A.W-5*g)/4;return{x:g+(i%4)*(w+g),y:Y(.05)+Math.floor(i/4)*Y(.2),w,h:Y(.16)}};
 function sortV(x){const C=A.col;BINS.forEach((b,i)=>{const r=bin(i);pill(x,r,[C.gr,C.vi,C.ln][i],0,.1);tx(x,b,r.x+r.w/2,r.y+16,13,C.tx,800);
   S.bin.filter(j=>CARDS[j][1]===i).forEach((j,k)=>tx(x,CARDS[j][0],r.x+r.w/2,r.y+44+k*24,15,C.tx))});
  CARDS.forEach((cd,i)=>{if(S.bin.includes(i))return;let r=cardR(i);if(S.hold&&S.hold.i===i)r={...r,x:S.hold.x-r.w/2,y:S.hold.y-r.h/2};pill(x,r,i===S.cur?C.or:C.cy,i===S.cur,.2);tx(x,cd[0],r.x+r.w/2,r.y+r.h/2,18,C.tx,800)})}
 function drop(i,b){S.hold=null;if(S.bin.includes(i))return A.redraw();const cd=CARDS[i];if(b!==cd[1]){S.cur=i;return miss(cd[2])}
  S.bin.push(i);S.cur=CARDS.findIndex((_,j)=>!S.bin.includes(j));hit(`${cd[0]}: ${BINS[b].toLowerCase()}. ${cd[2]}`)}
 // ---- step 3: the δ+ target ----
 function siteV(x){const C=A.col;if(S.mi>=3)return tx(x,'The δ+ carbon every time.',A.W/2,Y(.45),17,C.gr);const m=MOL[S.mi];
  tx(x,`Where does a nucleophile attack ${m.n}?`,A.W/2,Y(.08),14,C.tx);mol(x,m,A.W/2,Y(.58),S.show?m.ans:-1,S.bad,S.show||S.bad>=0)}
 function aim(k){if(S.mi>=3)return;const m=MOL[S.mi],a=m.a[k];if(k!==m.ans){S.bad=k;return miss(a[3]==='δ−'?`${a[0]} is δ−: it already has extra electron density and repels the incoming pair. It is the atom that pulls electrons away from C.`:`That ${a[0]} has no polar bond, so it is not δ+. Look for the carbon joined to the electronegative atom.`)}
  S.bad=-1;S.mi++;hit(`Yes: the carbon bonded to ${m.a[m.a.length-1][0]} is δ+.`)}
 // ---- step 4: products ----
 const opt=i=>({x:X(.05),y:Y(.36+i*.2),w:X(.9),h:Y(.16)});
 function prodV(x){const C=A.col;if(S.pi>=5)return tx(x,'Five products predicted.',A.W/2,Y(.45),17,C.gr);const[q,o]=PROD[S.pi],r0=S.pi%3;
  tx(x,q+' →',A.W/2,Y(.15),15,C.tx,800);tx(x,'Which product?',A.W/2,Y(.25),13,C.tx,600);
  [0,1,2].forEach(k=>{const j=(k+r0)%3,r=opt(k);pill(x,r,S.bad===j?C.rd:C.cy,S.bad===j,.14);tx(x,o[j],r.x+r.w/2,r.y+r.h/2,15,C.tx)})}
 function product(j){if(S.pi>=5)return;const[q,o,w]=PROD[S.pi];if(j){S.bad=j;return miss(w[j-1])}S.bad=-1;S.pi++;hit(`${o[0]}.`)}
 // ---- step 5: mechanisms ----
 const lane=i=>({x:X(.04),y:Y(.38+i*.2),w:X(.92),h:Y(.16)});
 function mechV(x){const C=A.col;if(S.ri>=6)return tx(x,'Nucleophile attacks: nucleophilic. Something leaves: substitution.',A.W/2,Y(.45),13,C.gr);
  const r={x:X(.12),y:Y(.08),w:X(.76),h:Y(.18)};pill(x,r,C.or,1,.18);tx(x,RX[S.ri][0],r.x+r.w/2,r.y+r.h/2,17,C.tx,800);
  MECH.forEach((m,i)=>{const L=lane(i);pill(x,L,S.bad===i?C.rd:C.vi,S.bad===i,.12);tx(x,m,L.x+L.w/2,L.y+L.h/2,15,C.tx)})}
 function mech(i){if(S.ri>=6)return;const[n,ans]=RX[S.ri];if(i!==ans){S.bad=i;return miss(MWHY[ans][i])}S.bad=-1;S.ri++;hit(`${n}: ${MECH[ans].toLowerCase()}.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={pair:pairV,sort:sortV,site:siteV,prod:prodV,mech:mechV}[st()];if(f)f(x);else tx(x,S.qp||'Nu:⁻ → δ+',W/2,H/2,30,C.tx,800);A.fx.draw(x)}
 function ctl(){if(!pad)return;pad.innerHTML='';const v=st(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='pair'&&S.i<5)SP[S.i].a.forEach((a,k)=>B(a[0]+(SP[S.i].a.filter(z=>z[0]===a[0]).length>1?' '+(k):''),()=>donor(k),`Donor atom ${a[0]}`));
  if(v==='sort'&&S.cur>=0&&S.cur<8)BINS.forEach((b,i)=>B(CARDS[S.cur][0]+' → '+b,()=>drop(S.cur,i)));
  if(v==='site'&&S.mi<3)MOL[S.mi].a.forEach((a,k)=>B(a[0],()=>aim(k),`Attack ${a[0]}`));
  if(v==='prod'&&S.pi<5)[0,1,2].forEach(k=>{const j=(k+S.pi%3)%3;B(PROD[S.pi][1][j],()=>product(j))});
  if(v==='mech'&&S.ri<6)MECH.forEach((m,i)=>B(m,()=>mech(i)))}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const seq=(fs,ms)=>{const g=++tok;fs.forEach((f,j)=>setTimeout(()=>{if(g===tok)f()},j*ms))};
 const zero=()=>{tok++;S.want=()=>{};S.hold=null;S.bad=-1};
 const steps=[
  {h:'Find the pair',p:'A nucleophile donates a pair of electrons to form a new bond. Find the atom that holds the pair in each species.',
   predict:{q:'Which atom in CN⁻ attacks a δ+ carbon?',opts:['N, it is more electronegative','C, it carries the charge'],ans:1},task:'Find the donor atom in all five',
   show:()=>{steps[0].go();seq(SP.map(s=>()=>donor(s.ans)),450)},go:()=>{zero();S.i=0;desc('Tap the atom that donates the pair.');ctl();S.want=fin(0,()=>S.i>=5,'A lone pair (often with a − charge) is what a nucleophile gives.')}},
  {h:'Donor or acceptor?',p:'Nucleophiles donate an electron pair. Electrophiles accept one. Drag each species into a box.',
   predict:{q:'NH₃ has no charge. Can it be a nucleophile?',opts:['No, it must be negative','Yes, its lone pair is enough'],ans:1},task:'Sort all eight species',
   show:()=>{steps[1].go();seq(CARDS.map((cd,i)=>()=>drop(i,cd[1])),380)},go:()=>{zero();S.bin=[];S.cur=0;desc('Drag OH⁻ into a box.');ctl();S.want=fin(1,()=>S.bin.length>=8,'Donor: nucleophile. Acceptor: electrophile.')}},
  {h:'Aim at δ+',p:'An electronegative atom pulls electrons out of its bond and leaves the carbon δ+. That is where the pair goes.',
   predict:{q:'In C=O, which atom does a nucleophile attack?',opts:['O, it has the lone pairs','C, it is δ+'],ans:1},task:'Find the target in all three molecules',
   show:()=>{steps[2].go();seq(MOL.map(m=>()=>aim(m.ans)),450)},go:()=>{zero();S.mi=0;S.show=false;desc('Tap the atom a nucleophile attacks.');ctl();S.want=fin(2,()=>S.mi>=3,'The pair goes to the δ+ carbon, never the δ− atom.')}},
  {h:'What forms?',p:'The nucleophile bonds to the δ+ carbon. Predict each product before you check.',task:'Predict all five products',
   show:()=>{steps[3].go();seq(PROD.map(()=>()=>product(0)),420)},go:()=>{zero();S.pi=0;desc('Which product forms?');ctl();S.want=fin(3,()=>S.pi>=5,'OH⁻ gives alcohols, CN⁻ nitriles (one more C), NH₃ amines, H⁻ alcohols from C=O.')}},
  {h:'Name the mechanism',p:'Name it by the attacker, then by what happens: does something leave (substitution) or do both parts add on (addition)?',task:'Name all six mechanisms',
   show:()=>{steps[4].go();seq(RX.map(r=>()=>mech(r[1])),400)},go:()=>{zero();S.ri=0;desc('Which mechanism?');ctl();S.want=fin(4,()=>S.ri>=6,'Haloalkanes: nucleophilic substitution. Carbonyls: nucleophilic addition. Alkenes: electrophilic addition.')}},
  {h:'Challenge',p:'',go:()=>{zero();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
 const QZ=[['Which of these is a nucleophile?',[['NH₃','ok'],['NO₂⁺','plus'],['CH₄','none']]],['A nucleophile is ...',[['an electron-pair donor','ok'],['an electron-pair acceptor','acc'],['any ion with a negative charge','neg']]],
  ['In 1-chloropropane, OH⁻ attacks ...',[['the carbon bonded to Cl','ok'],['the Cl atom','cl'],['the carbon at the far end','end']]],['NaBH₄ reduces ethanal. The nucleophile is ...',[['the hydride ion, H⁻','ok'],['the Na⁺ ion','na'],['the C=O oxygen','oxy']]],
  ['KCN + 1-bromobutane gives ...',[['pentanenitrile','ok'],['butanenitrile','chain'],['butylamine','amine']]],['Why can H₂O act as a nucleophile?',[['O has lone pairs','ok'],['Its H atoms are δ+','hplus'],['It is neutral','neutral']]]];
 let run=0;
 function quiz(){qi++;const[q,o]=QZ[qi%QZ.length],r=qi%3;S.qp='Nu:';
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([s,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,s);b.onclick=()=>grade(tag)});desc('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct.';break;
   case 'plus':m='NO₂⁺ is positive with no lone pair: it accepts a pair, so it is an electrophile.';break;
   case 'none':m='CH₄ has no lone pair to donate. NH₃ has one on N.';break;
   case 'acc':m='That is an electrophile. A nucleophile gives the pair.';break;
   case 'neg':m='Charge is not required: NH₃ and H₂O are neutral nucleophiles. What matters is a lone pair.';break;
   case 'cl':m='Cl is δ−; the incoming pair would be repelled. Cl leaves as Cl⁻.';break;
   case 'end':m='Only the carbon joined to Cl is δ+; the far carbon has no polar bond.';break;
   case 'na':m='Na⁺ is a spectator ion. BH₄⁻ delivers H⁻ to the δ+ carbon.';break;
   case 'oxy':m='The oxygen is δ− and is the part that gets protonated, not the attacker.';break;
   case 'chain':m='CN⁻ brings its own carbon: four plus one is five, so pentanenitrile.';break;
   case 'amine':m='An amine needs NH₃ as the nucleophile. CN⁻ gives a nitrile.';break;
   case 'hplus':m='δ+ atoms attract pairs; they do not donate them. The O lone pairs do.';break;
   default:m='Being neutral is not a reason. The lone pairs on O are.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=st();S.hold=null;
  if(v==='pair'&&S.i<5){const k=atomAt(SP[S.i],p,A.W/2,Y(.5));if(k>=0)donor(k);return false}
  if(v==='sort'){const i=CARDS.findIndex((_,i)=>!S.bin.includes(i)&&inR(p,cardR(i)));if(i>=0){S.cur=i;ctl();S.hold={i,x:p.x,y:p.y};return true}return false}
  if(v==='site'&&S.mi<3){const k=atomAt(MOL[S.mi],p,A.W/2,Y(.58));if(k>=0)aim(k);return false}
  if(v==='prod'&&S.pi<5){const k=[0,1,2].findIndex(k=>inR(p,opt(k)));if(k>=0)product((k+S.pi%3)%3);return false}
  if(v==='mech'){const i=[0,1,2].findIndex(i=>inR(p,lane(i)));if(i>=0)mech(i)}return false}
 function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
 function up(p){if(!S.hold)return;const b=[0,1,2].findIndex(i=>inR(p,bin(i)));if(b<0){S.hold=null;return A.redraw()}drop(S.hold.i,b)}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});ctl()}});
 A.start()})})();
