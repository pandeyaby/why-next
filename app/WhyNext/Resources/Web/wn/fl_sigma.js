/* Flagship – sigma and pi bonds (16–18): end-on overlap makes σ on the axis; sideways p overlap makes π above and below.
   Twisting ethene loses π overlap (ethane turns freely); count σ/π in propene; π ≈ 612 − 347 kJ/mol is weaker than σ. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',CC=347,CDC=612,PI=CDC-CC,rad=d=>d*M.PI/180;
 const OT={s:'s',px:'axial p',py:'sideways p'};
 const MOLS=[['ethene','CH₂=CH₂',5,1,1,1],['ethyne','HC≡CH',3,2,1,1],['propene','CH₂=CH–CH₃',8,1,2,1],['but-2-ene','CH₃–CH=CH–CH₃',11,1,3,1],['ethane','CH₃–CH₃',7,0,1,0],
  ['carbon dioxide','O=C=O',2,2,2,2],['nitrogen','N≡N',1,2,1,1]];
 const CQ=[['Which overlap makes a π bond?',[['Sideways overlap of parallel p orbitals','ok'],['End-on overlap along the axis','endon'],['Overlap of two s orbitals','s']]],
  ['Why can a C=C bond not rotate?',[['Turning it pulls the p orbitals out of line, breaking π','ok'],['Turning it would break the σ bond','sig'],['Carbon atoms are too heavy to turn','heavy']]],
  ['C=C is 612 kJ/mol and C–C is 347 kJ/mol. What does this show?',[['The π part (about 265) is weaker than the σ bond','ok'],['C=C is two σ bonds','dbl'],['The π bond is stronger than the σ bond','strong']]],
  ['Where is the electron density of a π bond?',[['Above and below the bond axis','ok'],['On the axis between the two nuclei','endon'],['Around one atom only','one']]],
  ['Why does ethene react with bromine, but ethane not?',[['Its π electrons sit off the axis, open to attack','ok'],['Its σ bond is weaker','sig'],['It has more electrons','more']]]];
 const FB={endon:'End-on overlap along the axis gives σ. π comes from p orbitals side by side, with density above and below the axis.',
  s:'s orbitals are spheres, so they can only overlap end-on: that is a σ bond.',sig:'σ is symmetric round the axis, so twisting leaves it whole. The π overlap is what changes.',
  heavy:'Ethane’s C–C turns freely, so mass is not it. The π overlap is the lock.',dbl:'Two σ bonds would be about 2 × 347 = 694 kJ/mol. C=C is only 612: the second bond is a weaker π.',
  strong:'612 − 347 = 265, less than 347: π is the weaker bond, and where alkenes react.',one:'Both atoms share it: π density is split above and below the axis.',
  more:'It is where the electrons are, not how many: π density lies off the axis, so electrophiles such as Br₂ reach it.'};
VIS.reg('flagsigma',c=>{let A,pad,chal,read;
 const G={xB:0,oa:'px',ob:'px',tw:0,mol:'ethene',seen:{},rev:[],pi:CC,drag:null,x0:0,t0:0,gen:0,check:()=>{},Q:null,note:''};
 const mode=()=>['sig','pi','twist','count','bar','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow;return{W,H,N,cy:H*(N?.56:.55),xA:W*(N?.3:.35),L:W*(N?.36:.24),R:M.min(W*(N?.13:.1),H*.15)}}
 const dist=()=>G.xB-geo().xA,near=()=>dist()<=geo().L*1.06,tight=()=>dist()<geo().L*.8;
 function kind(){if(!near())return'far';const a=G.oa,b=G.ob;if(a==='py'&&b==='py')return M.cos(rad(G.tw))>.05?'pi':'perp';if(a==='py'||b==='py')return'zero';return'sigma'}
 const piPct=()=>M.round(M.max(0,M.cos(rad(G.tw)))*100);
 function lobe(x,X,Y,ang,len,wid,col,al){x.save();x.translate(X,Y);x.rotate(ang);x.fillStyle=A.alpha(col,al);x.strokeStyle=col;x.lineWidth=1.4;x.beginPath();x.ellipse(len/2,0,len/2,wid,0,0,7);x.fill();x.stroke();x.restore()}
 function orb(x,X,Y,t,side,tw,C,g){const R=g.R;if(t==='s'){x.fillStyle=A.alpha(C.cy,.32);x.strokeStyle=C.cy;x.lineWidth=1.4;x.beginPath();x.arc(X,Y,R*.62,0,7);x.fill();x.stroke();return}
  if(t==='px'){lobe(x,X,Y,side>0?0:M.PI,R*1.15,R*.42,C.cy,.32);lobe(x,X,Y,side>0?M.PI:0,R*.8,R*.34,C.or,.25);return}
  const k=M.max(.14,M.cos(rad(tw)));lobe(x,X,Y,-M.PI/2,R*1.2*k,R*.36,C.cy,.32);lobe(x,X,Y,M.PI/2,R*1.2*k,R*.36,C.or,.25)}
 function hyd(x,X,Y,side,list,tw,C,g){list.forEach(a0=>{const a=rad(a0+tw),h=g.R*1.25,hx=X+side*h*.62,hy=Y-h*M.cos(a)-.3*h*M.sin(a),back=M.sin(a)>.2;
   x.strokeStyle=A.alpha(C.tx,back?.35:.8);x.lineWidth=2;x.beginPath();x.moveTo(X,Y);x.lineTo(hx,hy);x.stroke();A.paint.ball(hx,hy,back?5:7,back?A.mix(C.mu,C.pn,.4):C.mu)})}
 function nuc(x,X,Y,l,C){A.paint.ball(X,Y,9,C.tx);x.fillStyle=C.pn;x.font=F(800,10);x.textAlign='center';x.textBaseline='middle';x.fillText(l,X,Y+.5)}
 function bondView(x,g,C){const xA=g.xA,xB=G.xB,cy=g.cy,k=kind(),m=mode();
  x.strokeStyle=A.alpha(C.mu,.55);x.setLineDash([5,5]);x.lineWidth=1;x.beginPath();x.moveTo(10,cy);x.lineTo(g.W-10,cy);x.stroke();x.setLineDash([]);
  
  if(m==='twist'){hyd(x,xA,cy,-1,G.mol==='ethene'?[90,270]:[0,120,240],0,C,g);hyd(x,xB,cy,1,G.mol==='ethene'?[90,270]:[0,120,240],G.tw,C,g)}
  if(k==='sigma'||(m==='pi'||m==='twist'||k==='pi'||k==='perp')&&near()){x.fillStyle=A.alpha(C.gr,.5);x.beginPath();x.ellipse((xA+xB)/2,cy,(xB-xA)*.36,g.R*.24,0,0,7);x.fill()}
  if(k==='pi'||m==='twist'&&G.mol==='ethene'){const a=.6*M.pow(M.max(0,M.cos(rad(G.tw))),2);if(a>.01){x.fillStyle=A.alpha(C.vi,a);[-1,1].forEach(s=>{x.beginPath();x.ellipse((xA+xB)/2,cy+s*g.R*.62,(xB-xA)*.42,g.R*.26,0,0,7);x.fill()});if(a>.3)A.paint.label('π',(xA+xB)/2,cy-g.R*.62,{bg:A.alpha(C.vi,.9)})}}
  if(near()&&k!=='zero'&&k!=='far')A.paint.label('σ',(xA+xB)/2,cy+(m==='quiz'?0:g.R*1.3),{bg:A.alpha(C.gr,.9)});
  if(!(m==='twist'&&G.mol==='ethane')){orb(x,xA,cy,G.oa,1,0,C,g);orb(x,xB,cy,G.ob,-1,G.tw,C,g)}
  nuc(x,xA,cy,'C',C);nuc(x,xB,cy,'C',C);
  if(m==='sig'||m==='free'){x.strokeStyle=A.alpha(C.am,.9);x.lineWidth=2;x.beginPath();x.arc(xB,cy,g.R*.9,0,7);x.stroke()}
  if(G.ob==='py'&&near())dial(x,g,C)}
 function dial(x,g,C){const r=g.N?26:32,X=g.W-r-12,Y=g.N?88:78;x.strokeStyle=A.alpha(C.mu,.6);x.lineWidth=1;x.beginPath();x.arc(X,Y,r,0,7);x.stroke();
  x.strokeStyle=A.alpha(C.mu,.7);x.lineWidth=5;x.lineCap='round';x.beginPath();x.moveTo(X,Y-r*.8);x.lineTo(X,Y+r*.8);x.stroke();
  const a=rad(G.tw);x.strokeStyle=C.or;x.lineWidth=3;x.beginPath();x.moveTo(X-M.sin(a)*r*.8,Y-M.cos(a)*r*.8);x.lineTo(X+M.sin(a)*r*.8,Y+M.cos(a)*r*.8);x.stroke();x.lineCap='butt';
  x.fillStyle=C.tx;x.font=F(700,12);x.textAlign='center';x.fillText(`${M.round(G.tw)}°`,X,Y+r+14);x.fillStyle=C.mu;x.font=F(600,11);x.fillText('end-on view',X,Y-r-6)}
 // propene, displayed formula: atoms [x,y,label] in units, bonds [a,b,order]
 const PA=[[0,0,'C'],[1,0,'C'],[2,0,'C'],[-.6,-.75,'H'],[-.6,.75,'H'],[1,-.95,'H'],[2,-.95,'H'],[2,.95,'H'],[2.9,0,'H']];
 const PB=[[0,1,2],[1,2,1],[0,3,1],[0,4,1],[1,5,1],[2,6,1],[2,7,1],[2,8,1]];
 function pgeo(g){const u=g.N?g.W*.24:M.min(g.W*.16,g.H*.24);return{u,X:g.W/2-u*1.15,Y:g.H*.55}}
 const pxy=(g,i)=>{const p=pgeo(g);return[p.X+PA[i][0]*p.u,p.Y+PA[i][1]*p.u]};
 function molView(x,g,C){PB.forEach(([a,b,o],i)=>{const[x1,y1]=pxy(g,a),[x2,y2]=pxy(g,b),on=G.rev.includes(i);x.strokeStyle=on?C.gr:A.alpha(C.tx,.75);x.lineWidth=on?3.5:2.5;
   const off=o===2?[-4,4]:[0];off.forEach(d=>{x.beginPath();x.moveTo(x1,y1+d);x.lineTo(x2,y2+d);x.stroke()});
   if(on)A.paint.label(o===2?'σ + π':'σ',(x1+x2)/2,(y1+y2)/2-(o===2?16:0),{bg:o===2?A.alpha(C.vi,.9):A.alpha(C.gr,.92),font:F(700,13)})});
  PA.forEach(([,,l],i)=>{const[X,Y]=pxy(g,i);A.paint.ball(X,Y,l==='C'?13:9,l==='C'?C.tx:C.mu);x.fillStyle=C.pn;x.font=F(800,l==='C'?12:10);x.textAlign='center';x.textBaseline='middle';x.fillText(l,X,Y+.5)});
  x.textBaseline='alphabetic';const s=tally();x.fillStyle=C.tx;x.font=F(800,g.N?15:17);x.textAlign='center';x.fillText(`Tapped ${G.rev.length} of ${PB.length} bonds:  ${s[0]} σ,  ${s[1]} π`,g.W/2,g.H-18)}
 const tally=()=>G.rev.reduce((t,i)=>[t[0]+1,t[1]+(PB[i][2]-1)],[0,0]);
 function barGeo(g){const top=g.N?96:84,bot=g.H-34,sc=(bot-top)/720;return{top,bot,sc,w:g.N?g.W*.2:g.W*.12,x1:g.W*(g.N?.2:.3),x2:g.W*(g.N?.47:.62)}}
 function barView(x,g,C){const b=barGeo(g),y=v=>b.bot-v*b.sc;x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1.5;x.beginPath();x.moveTo(24,b.bot);x.lineTo(g.W-14,b.bot);x.stroke();
  const blk=(X,v0,v1,col,t)=>{x.fillStyle=A.alpha(col,.75);A.paint.rrect(X-b.w/2,y(v1),b.w,(v1-v0)*b.sc,6);x.fill();x.fillStyle=C.tx;x.font=F(800,14);x.textAlign='center';x.textBaseline='middle';if((v1-v0)*b.sc>18)x.fillText(t,X,(y(v0)+y(v1))/2)};
  blk(b.x1,0,CC,C.cy,'σ 347');blk(b.x2,0,CC,C.cy,'σ 347');blk(b.x2,CC,CC+G.pi,C.vi,'π '+M.round(G.pi));
  [[CDC,'C=C measured: 612',C.gr],[2*CC,'2 × C–C = 694',C.rd]].forEach(([v,t,col])=>{x.strokeStyle=col;x.setLineDash([6,4]);x.lineWidth=2;x.beginPath();x.moveTo(b.x2-b.w*.8,y(v));x.lineTo(g.W-12,y(v));x.stroke();x.setLineDash([]);
   x.fillStyle=col;x.font=F(700,12);x.textAlign='right';x.textBaseline='bottom';x.fillText(t,g.W-12,y(v)-(v===CDC?-15:3))});
  x.textBaseline='alphabetic';x.textAlign='center';x.fillStyle=C.tx;x.font=F(700,13);x.fillText('C–C',b.x1,b.bot+18);x.fillText('C=C',b.x2,b.bot+18);
  x.fillStyle=C.mu;x.font=F(600,12);x.textAlign='left';x.fillText('kJ/mol',24,b.top-8)}
 function head(){const m=mode(),k=kind();if(m==='count')return'Tap each bond in propene';if(m==='bar')return`C=C: σ 347 + π ${M.round(G.pi)} = ${M.round(CC+G.pi)} kJ/mol`;if(m==='quiz')return G.Q?G.Q.t:'';
  if(m==='twist')return G.mol==='ethane'?`Ethane, twisted ${M.round(G.tw)}°: σ intact, no π`:`Ethene, twisted ${M.round(G.tw)}°: σ 100%, π overlap ${piPct()}%`;
  return k==='far'?'Too far apart: no overlap':k==='sigma'?'σ bond: end-on overlap on the axis':k==='pi'?`σ + π: sideways overlap ${piPct()}%`:k==='perp'?'p orbitals at 90°: no π':'No bond: + and − overlaps cancel'}
 function sub(){const m=mode(),k=kind();if(m==='quiz')return'Pick your answer below.';if(m==='count')return'Tap each bond line to see what it is made of.';
  if(m==='bar')return'Drag on the chart to set the π block.';if(m==='twist')return'Drag sideways to twist the right carbon.';
  if(tight())return'Too close: the nuclei repel. Let go to settle at the bond length.';
  if(k==='zero')return'A sideways p meets s or an axial p: the same-phase and opposite-phase overlaps cancel.';
  if(m==='pi'||k==='pi'||k==='perp')return'Drag sideways to twist the right p orbital.';return m==='sig'?'Drag the right atom towards the left one.':'Pick orbitals, then drag the right atom.'}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.vi,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='count')molView(x,g,C);else if(m==='bar')barView(x,g,C);else if(m!=='quiz'||!(G.Q&&G.Q.n))bondView(x,g,C);else{x.fillStyle=C.tx;x.font=F(800,g.N?26:34);x.textAlign='center';x.fillText(G.Q.f,g.W/2,g.H*.55)}
  x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=F(800,g.N?14:17);wrap(x,head(),12,24,g.W-(g.N?84:110),g.N?18:21);
  x.font=F(600,g.N?12:13);x.fillStyle=tight()&&(m==='sig'||m==='free')||kind()==='zero'&&m==='free'?C.rd:C.mu;wrap(x,sub(),12,g.N?62:52,g.W-(g.N?84:110),16);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function tell(m){G.note=m||'';const k=mode();let s=(m?m+' ':'')+head()+'. ';
  if(k==='count')s+=`Revealed: ${G.rev.map(i=>PB[i][2]===2?'C=C is σ + π':'one σ').join(', ')||'none'}.`;
  else if(k!=='bar'&&k!=='quiz')s+=`Left: ${OT[G.oa]}. Right: ${OT[G.ob]}. Gap ${M.round(dist()/geo().L*100)}% of bond length.`;
  c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=G.note;controls();A.redraw();G.check()}
 function setX(v,snap){const g=geo();G.xB=M.max(g.xA+g.L*.7,M.min(g.W-g.R-10,v));if(snap&&tight())G.xB=g.xA+g.L;if(near()&&kind()==='sigma')G.seen.sig=1}
 function move(d){setX(G.xB+d*geo().L*.25,true);A.sound.tick();tell(near()?'':'Moved.')}
 function setTw(v){G.tw=M.max(0,M.min(90,v));if(G.tw>=(G.mol==='ethane'?60:85))G.seen[G.mol]=1}
 function twist(d){setTw(G.tw+d);A.sound.tick();tell('')}
 function reveal(i){if(i<0||G.rev.includes(i))return;G.rev.push(i);A.sound.pop();tell(PB[i][2]===2?'The C=C double bond is one σ plus one π.':'That bond is one σ.')}
 function setPi(v){G.pi=M.max(0,M.min(380,M.round(v)));tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='sig'||k==='free'){b('◀ Closer',()=>move(-1),'Move the right atom closer');b('Apart ▶',()=>move(1),'Move the right atom apart')}
  if(k==='free'){['oa','ob'].forEach((s,j)=>b(`${j?'Right':'Left'}: ${OT[G[s]]}`,()=>{const o=['s','px','py'];G[s]=o[(o.indexOf(G[s])+1)%3];G.tw=0;A.sound.tick();tell('')},`Change the ${j?'right':'left'} orbital`))}
  if(k==='pi'||k==='twist'||k==='free'&&G.ob==='py'){b('Twist −15°',()=>twist(-15));b('Twist +15°',()=>twist(15))}
  if(k==='twist')['ethane','ethene'].forEach(m=>b((G.mol===m?'● ':'')+m[0].toUpperCase()+m.slice(1),()=>{G.mol=m;G.tw=0;A.sound.tick();tell(`Showing ${m}.`)}));
  if(k==='count'){b('Tap next bond',()=>reveal(PB.findIndex((_,i)=>!G.rev.includes(i))))}
  if(k==='bar')[-25,-5,5,25].forEach(d=>b((d>0?'+':'−')+M.abs(d),()=>setPi(G.pi+d),`π block ${d>0?'up':'down'} ${M.abs(d)} kJ/mol`))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=(o)=>{const g=geo();G.gen++;G.check=()=>{};Object.assign(G,{oa:'px',ob:'px',tw:0,mol:'ethene',seen:{},rev:[],pi:CC,xB:g.xA+g.L*1.9},o||{});G.drag=null};
 const steps=[
  {h:'End-on overlap: σ',p:'Each carbon has a p orbital along the bond axis. Bring the atoms together.',
   predict:{q:'Where is the shared electron density in a σ bond?',opts:['Above and below the axis','On the axis, between the nuclei','Spread evenly round both atoms'],ans:1},
   task:'Make a σ bond by end-on overlap',show:()=>play([()=>move(-1),()=>move(-1),()=>move(-1),()=>move(-1)],450),
   go:()=>{reset();G.check=when(0,()=>G.seen.sig&&near(),()=>'The overlap sits on the line joining the nuclei: σ. Any end-on overlap (s–s, s–p, p–p) makes σ.')}},
  {h:'Sideways overlap: π',p:'A σ bond joins the carbons. Each also has a spare p orbital at right angles to the axis; the right one is twisted 90°.',
   predict:{q:'When the two sideways p orbitals line up, where does the new bond put its electrons?',opts:['On the axis, like σ','In two regions, above and below the axis','Inside the nuclei'],ans:1},
   task:'Twist the right p orbital into line to make the π bond',show:()=>play([0,0,0,0,0,0].map(()=>()=>twist(-15)),380),
   go:()=>{const g=geo();reset({oa:'py',ob:'py',tw:90,xB:g.xA+g.L});G.check=when(1,()=>G.tw<=10,()=>'Sideways overlap gives one π bond, split above and below the axis. So C=C is one σ + one π.')}},
  {h:'Why C=C cannot turn',p:'Twist the right-hand carbon of ethane, then of ethene. Watch the σ and π overlap.',
   predict:{q:'Twist one end of ethene by 90°. What happens?',opts:['It turns freely, like ethane','The π overlap falls to zero: the π bond breaks','The σ bond breaks first'],ans:1},
   task:'Twist ethane past 60°, then ethene to 90°',show:()=>play([()=>{G.mol='ethane';G.tw=0;tell('')},()=>twist(90),()=>{G.mol='ethene';G.tw=0;tell('')},()=>twist(45),()=>twist(45)],500),
   go:()=>{const g=geo();reset({oa:'py',ob:'py',mol:'ethane',xB:g.xA+g.L});G.check=when(2,()=>G.seen.ethane&&G.seen.ethene,()=>'The σ bond is symmetric round the axis, so ethane turns freely. In ethene, twisting pulls the p orbitals apart; at 90° there is no π overlap. Breaking it costs energy, so C=C is locked; hence E/Z isomers.')}},
  {h:'Count σ and π',p:'Every bond between two atoms has one σ. A double bond adds one π; a triple adds two.',
   predict:{q:'How many σ bonds does propene, CH₂=CH–CH₃, have?',opts:['2: one for each C–C link','9: the double bond counts as two σ','8: every bond line, including each C–H'],ans:2},
   task:'Tap all 8 bonds in propene',show:()=>play(PB.map((_,i)=>()=>reveal(i)),300),
   go:()=>{reset();G.check=when(3,()=>G.rev.length===PB.length,()=>'Propene: 8 σ (6 C–H, 1 C–C, 1 in C=C) and 1 π.')}},
  {h:'π is the weaker bond',p:'Mean bond enthalpies: C–C 347 and C=C 612 kJ/mol. Take the σ part of C=C as about the same as C–C.',
   predict:{q:'Is C=C twice as strong as C–C?',opts:['Yes: 2 × 347 = 694','No: less, so π is weaker than σ','No: more than twice'],ans:1},
   task:'Set the π block so the stack matches C=C',show:()=>play([0,0,0,0].map(()=>()=>setPi(G.pi-20.5)),300),
   go:()=>{reset();G.check=when(4,()=>M.abs(G.pi-PI)<=10,()=>'π ≈ 612 − 347 = 265 kJ/mol, less than σ. Sideways overlap is smaller and π electrons sit further out, exposed: so alkenes add across C=C.')}},
  {h:'Sandbox',p:'Choose each orbital, then drag or twist. Which pairs give σ, π or no bond?',go:()=>{reset({xB:geo().xA+geo().L*1.6})}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;let opts,t;if(qi%2===0){const[n,f,s,p,k,mm]=MOLS[(qi/2)%MOLS.length];t=`How many σ and π bonds in ${n}, ${f}?`;const L=(a,b)=>`${a} σ, ${b} π`;
   opts=[[L(s,p),'ok'],[L(s+p,0),'dbl2'],[L(k,p),'skel'],[L(s-mm,p+mm),'pi2'],[L(s-1,p+1),'pi2']].filter((o,i,a)=>a.findIndex(z=>z[0]===o[0])===i).slice(0,3);G.Q={t,n,f,s,p}}
  else{const q=CQ[((qi-1)/2)%CQ.length];t=q[0];opts=q[1].slice();G.Q={t};Object.assign(G,{oa:'py',ob:'py',tw:0,mol:'ethene',xB:geo().xA+geo().L})}
  const r=qi%opts.length;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const Q=G.Q,fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='dbl2')m='A multiple bond holds only one σ: the extra bonds are π, from sideways overlap.';
  else if(o[1]==='skel')m='Every single bond is σ, including each bond to hydrogen. Count the C–H bonds too.';
  else if(o[1]==='pi2')m='Each link between two atoms starts with one σ. Double = σ + π; triple = σ + 2π.';
  else if(!ok)m=FB[o[1]];
  const ans=Q.n?` ${Q.n}: ${Q.s} σ and ${Q.p} π.`:'';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
  A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m+ans);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ans}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();
  if(m==='count'){let best=-1,bd=26;PB.forEach(([a,b],i)=>{const[x1,y1]=pxy(g,a),[x2,y2]=pxy(g,b),d=M.hypot(p.x-(x1+x2)/2,p.y-(y1+y2)/2);if(d<bd){bd=d;best=i}});reveal(best);return false}
  if(m==='bar'){const b=barGeo(g);setPi((b.bot-p.y)/b.sc-CC);G.drag='bar';return true}
  if((m==='sig'||m==='free')&&M.hypot(p.x-G.xB,p.y-g.cy)<g.R*1.3){G.drag='atom';G.x0=p.x-G.xB;return true}
  if(m==='pi'||m==='twist'||m==='free'&&G.ob==='py'&&near()){G.drag='tw';G.x0=p.x;G.t0=G.tw;return true}return false}
 function mv(p){const g=geo();if(G.drag==='atom'){setX(p.x-G.x0);A.redraw()}else if(G.drag==='bar')setPi((barGeo(g).bot-p.y)/barGeo(g).sc-CC);
  else if(G.drag==='tw'){setTw(G.t0+(p.x-G.x0)*.6);A.redraw()}}
 function up(){if(!G.drag)return;const d=G.drag;G.drag=null;if(d==='atom'){setX(G.xB,true);A.sound.tick()}tell('')}
 A=FK.shell(c,{steps,ratio:.6,tall:.92,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Bond controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
