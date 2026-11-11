/* Flagship 53 – acids, alkalis and H⁺ as particles: dissolve HCl and NaOH into ions, drag H⁺ onto OH⁻ to make water
   (spectators refuse), balance to neutral, pH dots grow tenfold per step, tenfold dilution, weak acid molecules re-form. */
(()=>{const LB={H:'H⁺',OH:'OH⁻',Na:'Na⁺',Cl:'Cl⁻',W:'H₂O',HCl:'HCl',NaOH:'NaOH',HA:'CH₃COOH',Ac:'CH₃COO⁻'},
 CL={H:'#dc2626',OH:'#2563eb',Na:'#64748b',Cl:'#15803d',W:'#0e7490',HCl:'#9f1239',NaOH:'#1e40af',HA:'#7e22ce',Ac:'#6b21a8'},MOL={HCl:1,NaOH:1,HA:1};
 const SPLIT={HCl:['H','Cl'],NaOH:['Na','OH'],HA:['H','Ac']},TEN=n=>`${Math.pow(10,n).toLocaleString('en-GB')} times`;
VIS.reg('flaghion',c=>{let A,pad,chal,read;
 const G={P:[],sel:null,drag:null,dp:null,ph:6,dil:0,tries:0,want:()=>{},tok:0,flash:0,Q:null,cq:'',said:''};
 const tell=t=>{G.said=t;c.say(t);if(read)read.textContent=t};
 const n=k=>G.P.filter(p=>p.k===k&&!p.gone).length,live=()=>G.P.filter(p=>!p.gone);
 // place a particle at the free spot furthest from the others (box coordinates 0..1)
 function spot(box){let b=null,bd=-1;for(let t=0;t<40;t++){const x=.08+Math.random()*.84,y=.1+Math.random()*.8,d=Math.min(9,...live().filter(p=>p.b===box).map(p=>Math.hypot(p.x-x,(p.y-y)*.8)));if(d>bd){bd=d;b=[x,y]}}return b}
 function add(k,box=0){const[x,y]=spot(box);G.P.push({k,x,y,b:box,a:1});}
 function fill(spec,box=0){Object.entries(spec).forEach(([k,m])=>{for(let i=0;i<m;i++)add(k,box)})}
 function reset(spec,spec2){G.P=[];G.sel=null;G.tries=0;fill(spec);if(spec2)fill(spec2,1);status()}
 const state=()=>{const h=n('H'),o=n('OH');return!h&&!o&&n('HCl')+n('NaOH')?'not dissolved yet':h&&o?'still reacting':h?'acidic':o?'alkaline':'neutral'};
 function status(){let t;const s=A.step;
  if(s===4)t=G.ph===6?'pH 6: one dot of H⁺, the starting point.':`pH ${G.ph}: ${TEN(6-G.ph)} the H⁺ of pH 6.`;
  else if(s===5)t=`pH ${1+G.dil}. Volume ${[10,100,1000,10000][G.dil]} mL. H⁺ ions in one drop: ${Math.pow(10,3-G.dil)} shown.`;
  else if(s===6)t=`Left: hydrochloric acid, ${n('H')-n('Ac')} H⁺ free. Right: ethanoic acid, ${n('Ac')} of ${n('Ac')+n('HA')} molecules split.`;
  else t=`${n('H')} H⁺, ${n('OH')} OH⁻, ${n('Na')} Na⁺, ${n('Cl')} Cl⁻, ${n('W')} water made`+(n('HCl')+n('NaOH')?`, ${n('HCl')+n('NaOH')} still to dissolve`:'')+`: ${state()}.`;
  tell(t);sync();G.want()}
 // ---- actions ----
 function split(p){if(!p||!MOL[p.k])return;const[a,b]=SPLIT[p.k];p.gone=1;G.P.push({k:b,x:p.x,y:p.y,b:p.b,a:1});const h={k:a,x:Math.min(.92,p.x+.07),y:Math.max(.1,p.y-.07),b:p.b,a:1};G.P.push(h);A.sound.pop();
  if(p.k==='HA'){G.tries++;const k=G.tok;setTimeout(()=>{if(k!==G.tok)return;const ac=G.P.filter(q=>q.k==='Ac'&&!q.gone);if(ac.length>1){const q=ac[0],hh=G.P.find(z=>z.k==='H'&&z.b===1&&!z.gone);q.gone=1;if(hh)hh.gone=1;G.P.push({k:'HA',x:q.x,y:q.y,b:1,a:1});tell('That molecule snapped back together. Only a few are split at any moment.');A.redraw()}status()},A.reduced()?0:700)}
  status()}
 function pair(h,o){if(!h||!o||h.k!=='H'||o.k!=='OH'){if(h&&o)bad(h,o);return}h.gone=o.gone=1;G.P.push({k:'W',x:o.x,y:o.y,b:o.b,a:1});G.sel=null;G.flash=.8;A.tween(G,{flash:0},600,'out');A.sound.tick();status()}
 function bad(h,o){const x=[h.k,o.k].find(k=>k==='Na'||k==='Cl');G.sel=null;A.sound.miss();tell(x?`${LB[x]} does not react. It stays dissolved: a spectator ion.`:`${LB[h.k]} and ${LB[o.k]} do not react. Only H⁺ + OH⁻ → H₂O.`);sync()}
 const first=k=>live().find(p=>p.k===k&&(k!=='HA'||p.b===1));
 function autoPair(){pair(first('H'),first('OH'))}
 // ---- layout ----
 function box(k){const{W,H}=A,top=A.narrow?62:58,two=A.step===6||(A.step===8&&G.Q&&G.Q.kind==='sw'),m=10;
  if(G.Q&&A.step===8&&G.Q.kind==='sw'){const w=(W-m*4)/3;return{x:m+k*(w+m),y:top+16,w,h:H-top-26}}
  if(two){if(A.narrow)return{x:m,y:top+(k?(H-top)/2:0)+12,w:W-2*m,h:(H-top)/2-22};const w=(W-m*3)/2;return{x:m+k*(w+m),y:top+12,w,h:H-top-22}}
  return{x:m,y:top,w:W-2*m,h:H-top-m}}
 const R=()=>Math.max(13,Math.min(19,Math.min(A.W,A.H)*.045));
 const xy=p=>{const b=box(p.b);return[b.x+p.x*b.w,b.y+p.y*b.h]};
 function hit(q,f){let best=null,bd=R()*1.6;live().forEach(p=>{if(f&&!f(p))return;const[x,y]=xy(p),d=Math.hypot(q.x-x,q.y-y);if(d<bd){bd=d;best=p}});return best}
 function part(ctx,p,x,y,hl){const P=A.paint,r=R(),C=A.col;ctx.globalAlpha=p.k==='W'?.75:1;
  if(MOL[p.k]||p.k==='Ac'){ctx.font=`700 ${A.narrow?11:12}px system-ui`;const w=ctx.measureText(LB[p.k]).width+16;P.shadow(6,2,.25);ctx.fillStyle=CL[p.k];P.rrect(x-w/2,y-r*.8,w,r*1.6,r*.8);ctx.fill();P.noShadow()}
  else P.ball(x,y,p.k==='W'?r*.8:r,CL[p.k]);
  if(hl){ctx.strokeStyle=C.am;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r+5,0,7);ctx.stroke()}
  ctx.fillStyle='#fff';ctx.font=`700 ${A.narrow?11:12}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(LB[p.k],x,y+1);ctx.globalAlpha=1}
 function frame(ctx,b,t){const C=A.col;ctx.fillStyle=A.alpha(C.cy,.08);A.paint.rrect(b.x,b.y,b.w,b.h,12);ctx.fill();ctx.strokeStyle=A.alpha(C.cy,.5);ctx.lineWidth=2;ctx.stroke();
  if(t){ctx.fillStyle=C.tx;ctx.font='700 13px system-ui';ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillText(t,b.x+8,b.y-5)}}
 // dot grid: m dots of H⁺ packed into box b
 function dots(ctx,b,m){const cols=Math.ceil(Math.sqrt(m*b.w/b.h)),rows=Math.ceil(m/cols),s=Math.min(b.w/cols,b.h/rows),r=Math.max(1.2,Math.min(9,s*.38));ctx.fillStyle=CL.H;
  for(let i=0;i<m;i++){const x=b.x+(i%cols+.5)*s+(b.w-cols*s)/2,y=b.y+(Math.floor(i/cols)+.5)*s+(b.h-rows*s)/2;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}}
 function scale(ctx,noMk){const{W}=A,C=A.col,x0=24,x1=W-24,y=A.narrow?96:90,X=v=>x0+(v-2)/5*(x1-x0);G.sx=X;
  ctx.fillStyle=A.paint.lin(x0,0,x1,0,[[0,'#ef4444'],[.6,'#f59e0b'],[1,'#22c55e']]);A.paint.rrect(x0,y-6,x1-x0,12,6);ctx.fill();ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.fillStyle=C.tx;
  for(let v=2;v<=7;v++)ctx.fillText(v,X(v),y+24);if(noMk)return y+34;const mx=X(G.mk==null?G.ph:G.mk);A.paint.ball(mx,y,13,C.tx);ctx.fillStyle=C.bg;ctx.font='700 11px system-ui';ctx.fillText('pH',mx,y+4);return y+34}
 function draw(A){const{ctx,W,H,col:C}=A,s=A.step;ctx.fillStyle=A.mix(C.pn,C.cy,.04);ctx.fillRect(0,0,W,H);ctx.textAlign='left';ctx.textBaseline='alphabetic';
  const head=(a,b)=>{ctx.font=`700 ${A.narrow?15:18}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(a,12,24);ctx.font='600 13px system-ui';ctx.fillStyle=C.mu;ctx.fillText(b,12,A.narrow?46:44)};
  if(s===4){head(`pH ${G.ph}`,G.ph===6?'1 dot = the H⁺ at pH 6':`${TEN(6-G.ph)} the H⁺ at pH 6`);const y=scale(ctx);dots(ctx,{x:16,y,w:W-32,h:H-y-10},Math.pow(10,6-G.ph))}
  else if(s===5){head(`pH ${1+G.dil} · ${[10,100,1000,'10,000'][G.dil]} mL`,'Red dots: H⁺ ions in one drop');const jw=Math.min(70,W*.16),jx=G.jx??14,jy=G.jy??(H*.45);G.jug={x:jx,y:jy,w:jw,h:jw};
   ctx.fillStyle=A.alpha('#38bdf8',.85);A.paint.rrect(jx,jy,jw,jw,10);ctx.fill();ctx.fillStyle='#0c4a6e';ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.fillText('water',jx+jw/2,jy+jw/2+4);
   const b={x:jw+34,y:62,w:W-jw-46,h:H-72};G.bk=b;frame(ctx,b);dots(ctx,{x:b.x+8,y:b.y+8,w:b.w-16,h:b.h-16},Math.pow(10,3-G.dil))}
  else if(s===8&&G.Q&&G.Q.kind==='ratio'){const q=G.Q;head('Compare the two solutions','');const y=scale(ctx,1);[[q.a,'A'],[q.b,'B']].forEach(([v,t])=>{const x=G.sx(v);A.paint.ball(x,y-2,14,t==='A'?C.rd:C.ac);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='700 12px system-ui';ctx.fillText(t,x,y+2)})}
  else if(s===8&&G.Q&&G.Q.kind==='eq'){head('Neutralisation','Any acid + any alkali');live().forEach(p=>{const[x,y]=xy(p);part(ctx,p,x,y)})}
  else{if(s===6){frame(ctx,box(0),'Hydrochloric acid');frame(ctx,box(1),'Ethanoic acid')}else if(s===8&&G.Q&&G.Q.kind==='sw')['A','B','C'].forEach((t,k)=>frame(ctx,box(k),t));else frame(ctx,box(0));
   if(s!==8||!G.Q||G.Q.kind==='mix')head(s===8?'After mixing, which is left?':state()[0].toUpperCase()+state().slice(1),`${n('H')} H⁺ free · ${n('OH')} OH⁻ free · ${n('W')} H₂O made`);
   else head('Which beaker is which?','Same size beakers');
   live().filter(p=>p!==G.drag).forEach(p=>{const[x,y]=xy(p);part(ctx,p,x,y,p===G.sel)});if(G.drag&&G.dp)part(ctx,G.drag,G.dp.x,G.dp.y,1)}
  if(G.flash>0){ctx.strokeStyle=A.alpha(C.gr,G.flash);ctx.lineWidth=5;ctx.strokeRect(4,4,W-8,H-8)}A.fx.draw(ctx)}
 // ---- buttons (everything doable without dragging) ----
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',A.step===8?G.cq||'Challenge.':'Particles in water. '+G.said);if(!pad)return A.redraw();pad.innerHTML='';const s=A.step;
  const B=(t,f,dis)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost'},pad,t);e.disabled=!!dis;e.onclick=()=>{f();A.sound.tick()}};
  if(s<2)B('Dissolve a molecule',()=>split(first(s?'NaOH':'HCl')),!first(s?'NaOH':'HCl'));
  if(s>=2&&s<4||s===7)B('Pair H⁺ with OH⁻',autoPair,!(n('H')&&n('OH')));
  if(s===3||s===7){B('+ NaOH',()=>{add('Na');add('OH');status()});B('+ HCl',()=>{add('H');add('Cl');status()})}
  if(s===7)B('Start again',()=>reset({H:3,Cl:3}));
  if(s===4){B('◀ pH −1',()=>setPh(G.ph-1),G.ph<=3);B('pH +1 ▶',()=>setPh(G.ph+1),G.ph>=6)}
  if(s===5){B('Pour in water (10× volume)',pour,G.dil>=3);B('Start again',()=>{G.dil=0;status()})}
  if(s===6)B('Try to split ethanoic acid',()=>split(first('HA')),!first('HA'));A.redraw()}
 function setPh(v){G.ph=Math.max(3,Math.min(6,v));G.mk=null;A.sound.tick();status()}
 function pour(){if(G.dil>=3){tell('Even more water only brings it closer to pH 7. Water alone never makes it neutral or alkaline.');return}G.dil++;A.sound.whoosh();status()}
 // ---- steps ----
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&A.pred[st]!=null){G.flash=1;A.tween(G,{flash:0},1100,'out');A.done(msg()+A.reveal(st))}};
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.mk=null},play=(fs,ms=320)=>{const k=++G.tok;let i=0;const nx=()=>{if(k!==G.tok||i>=fs.length)return;fs[i++]();setTimeout(nx,A.reduced()?0:ms)};nx()};
 const rep=(f,m)=>Array(m).fill(f);
 const steps=[
  {h:'What makes an acid',p:'Hydrogen chloride gas dissolving in water. Tap a molecule, or drag it, to dissolve it.',
   predict:{q:'HCl dissolves in water. Which particle makes the solution acidic?',opts:['Cl⁻ ions','HCl molecules','H⁺ ions'],ans:2},task:'Dissolve all four HCl molecules',show:()=>play(rep(()=>split(first('HCl')),4)),
   go:()=>{fresh();reset({HCl:4});G.want=fin(0,()=>!n('HCl'),()=>'Each HCl splits into H⁺ and Cl⁻. An acid is a substance that releases H⁺ ions in water. H⁺ is what turns blue litmus red and makes lemon juice sour.')}},
  {h:'What makes an alkali',p:'Sodium hydroxide dissolving. Tap or drag each one.',
   predict:{q:'NaOH dissolves. Which ion makes it alkaline?',opts:['Na⁺ ions','OH⁻ ions','H⁺ ions'],ans:1},task:'Dissolve all four NaOH units',show:()=>play(rep(()=>split(first('NaOH')),4)),
   go:()=>{fresh();reset({NaOH:4});G.want=fin(1,()=>!n('NaOH'),()=>'Each NaOH gives Na⁺ and OH⁻. An alkali is a base that dissolves in water and releases OH⁻ ions.')}},
  {h:'Neutralisation',p:'Acid and alkali mixed. Drag an H⁺ onto an OH⁻, or tap one and then the other. Try Na⁺ or Cl⁻ too.',
   predict:{q:'Which ions actually react?',opts:['Na⁺ with Cl⁻','all four kinds','H⁺ with OH⁻'],ans:2},task:'Turn every H⁺ into water',show:()=>play(rep(autoPair,4)),
   go:()=>{fresh();reset({H:4,Cl:4,Na:4,OH:4});G.want=fin(2,()=>!n('H'),()=>'H⁺ + OH⁻ → H₂O. That is the ionic equation for every acid–alkali neutralisation. Na⁺ and Cl⁻ never changed: they are spectator ions, left as dissolved salt.')}},
  {h:'Exactly neutral',p:'This mixture has 6 H⁺ but only 3 OH⁻. Pair ions, and add NaOH or HCl if you need to.',
   predict:{q:'Pair all 3 OH⁻. The solution is then…',opts:['neutral','still acidic','alkaline'],ans:1},task:'Make it neutral: no H⁺ and no OH⁻ left',show:()=>play([...rep(()=>{add('Na');add('OH');status()},3),...rep(autoPair,6)]),
   go:()=>{fresh();reset({H:6,Cl:6,Na:3,OH:3});G.want=fin(3,()=>!n('H')&&!n('OH')&&n('W')>=6,()=>'One OH⁻ removes one H⁺. 6 H⁺ needed 6 OH⁻. Fewer leaves it acidic; more leaves spare OH⁻, so it turns alkaline.')}},
  {h:'Ten times per pH step',p:'One red dot is the H⁺ at pH 6. Drag the pH marker, or use the buttons. Count how the dots grow.',
   predict:{q:'Compare pH 4 with pH 6. How many times more H⁺ at pH 4?',opts:['2 times','20 times','100 times'],ans:2},task:'Find the pH with 1000 times the H⁺ of pH 6',show:()=>play([()=>setPh(5),()=>setPh(4),()=>setPh(3)],450),
   go:()=>{fresh();G.ph=6;status();G.want=fin(4,()=>G.ph===3,()=>'pH 3. Each step down the scale multiplies H⁺ by 10: 10 × 10 × 10 = 1000. So pH 2 lemon juice has 10 times the H⁺ of pH 3 vinegar.')}},
  {h:'Add water',p:'pH 1 hydrochloric acid. Drag the water jug onto the beaker, or press the button. Each pour makes the volume 10 times bigger.',
   predict:{q:'Make pH 1 acid ten times more dilute. The new pH is…',opts:['pH 7, neutral','pH 0.1','pH 2'],ans:2},task:'Dilute the acid until it is pH 4',show:()=>play([pour,pour,pour],450),
   go:()=>{fresh();G.dil=0;G.jx=G.jy=null;status();G.want=fin(5,()=>G.dil===3,()=>'Three pours: 1000 times the volume, so each drop holds 1000 times fewer H⁺, and the pH rose by 3. Water dilutes an acid but cannot neutralise it: the pH creeps towards 7, never past it.')}},
  {h:'Strong or weak',p:'Both acids are 0.1 mol/dm³. Every HCl has split. Tap the ethanoic acid molecules to try to split them.',
   predict:{q:'Same concentration. Which has the lower pH?',opts:['ethanoic acid','both the same','hydrochloric acid'],ans:2},task:'Try to split ethanoic acid molecules 4 times',show:()=>play(rep(()=>split(first('HA')),4),800),
   go:()=>{fresh();reset({H:5,Cl:5},{HA:5});G.want=fin(6,()=>G.tries>=4,()=>'Most snap back. Ethanoic acid is weak: only about 1 molecule in 100 is split at this strength, so 0.1 mol/dm³ has pH about 2.9. Hydrochloric acid is strong: every molecule splits, pH 1.')}},
  {h:'Sandbox',p:'Add acid or alkali, pair the ions and watch the label change. Can you make it neutral from any start?',go:()=>{fresh();reset({H:3,Cl:3})}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 // ---- challenge ----
 const KINDS=['ratio','mix','eq','sw','mix','ratio','sw','mix'];let qn=-1,run=0;
 function ask(){qn++;const kind=KINDS[qn%KINDS.length],j=qn%3,Q={kind};G.Q=Q;G.P=[];let q,ops;
  if(kind==='ratio'){const d=2+qn%2,a=2+qn%3;Q.a=a;Q.b=a+d;Q.d=d;q=`A is pH ${a}, B is pH ${a+d}. How many times more H⁺ does A have?`;ops=[[String(Math.pow(10,d)),'ok'],[String(d),'diff'],[String(10*d),'lin']]}
  else if(kind==='mix'){const h=[5,3,4][qn%3],o=[3,5,4][qn%3];fill({H:h,Cl:h,Na:o,OH:o});Q.h=h;Q.o=o;q=`${h} H⁺ meet ${o} OH⁻. When they have reacted, the solution is…`;
   const want=h>o?'acidic':o>h?'alkaline':'neutral';ops=['acidic','neutral','alkaline'].map(t=>[t,t===want?'ok':t])}
  else if(kind==='eq'){fill({H:2,Cl:2,Na:2,OH:2});q='Which equation shows the reaction in every acid–alkali neutralisation?';ops=[['H⁺ + OH⁻ → H₂O','ok'],['Na⁺ + Cl⁻ → NaCl','spect'],['HCl + NaOH → NaCl + H₂O','full']]}
  else{const order=[[0,1,2],[1,2,0],[2,0,1]][qn%3];Q.order=order;const BX=[{H:2,Cl:2},{HA:6,H:1,Ac:1},{H:7,Cl:7}];order.forEach((t,k)=>fill(BX[t],k));
   q='Which beaker is a dilute solution of a strong acid?';ops=order.map((t,k)=>[['A','B','C'][k],['ok','weak','conc'][t]])}
  Q.ops=ops;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick'),seq=kind==='sw'?ops:ops.slice(j).concat(ops.slice(0,j));seq.forEach(([t,tag])=>{const e=c.el('button',{type:'button',class:'lbtn sm'},row,t);e.onclick=()=>judge(tag)});
  G.cq='Challenge: '+q+(kind==='sw'?' '+Q.order.map((t,k)=>`${'ABC'[k]}: ${['2 HCl, all split','6 ethanoic acid molecules, 1 split','7 HCl, all split'][t]}`).join('. ')+'.':'');A.cv.setAttribute('aria-label',G.cq);c.say(G.cq);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),Q=G.Q;let m;
  if(tag==='ok')m='Right.';
  else if(tag==='diff')m=`pH is not a count of ions. ${Q.d} steps on the scale means multiply by 10 ${Q.d===2?'twice':'three times'}.`;
  else if(tag==='lin')m=`Each step multiplies by 10, so ${Q.d} steps is ${Array(Q.d).fill(10).join(' × ')}, not ${Array(Q.d).fill(10).join(' + ')}.`;
  else if(tag==='neutral')m=`Each OH⁻ removes just one H⁺. With ${Q.h} H⁺ and ${Q.o} OH⁻, ${Math.abs(Q.h-Q.o)} ${Q.h>Q.o?'H⁺':'OH⁻'} have no partner.`;
  else if(tag==='acidic'||tag==='alkaline')m=Q.h===Q.o?`Equal numbers: every H⁺ finds an OH⁻, so nothing is left over. Na⁺ and Cl⁻ do not change the pH.`:`Count the leftovers: the ion there was more of wins. ${Q.h>Q.o?'Spare H⁺ means acidic':'Spare OH⁻ means alkaline'}.`;
  else if(tag==='spect')m='Na⁺ and Cl⁻ are spectator ions: they stay dissolved and do not react.';
  else if(tag==='full')m='That is the full equation for one pair. The ionic equation drops the spectator ions, so it fits every acid and alkali.';
  else if(tag==='weak')m='Few split molecules makes an acid weak, not dilute. Strong means every molecule splits; dilute means few per beaker.';
  else m='Every molecule split, so it is strong, but it is crowded with them: that is concentrated, not dilute.';
  if(tag==='ok'){run++;A.win();fb.innerHTML=`✓ ${m} Streak: ${run}. <button type="button" class="linkish">Another →</button>`}
  else{run=0;A.sound.miss();fb.innerHTML=`✗ ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{chal.hidden=A.step!==8;read.hidden=A.step===8;pad.hidden=A.step===8;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const s=A.step;if(s===8)return false;
     if(s===4){if(Math.abs(p.y-(A.narrow?96:90))<30){G.mk=Math.max(3,Math.min(6,2+(p.x-24)/(A.W-48)*5));G.dragS=1;A.redraw();return true}return false}
     if(s===5){const j=G.jug;if(j&&p.x>=j.x-8&&p.x<=j.x+j.w+8&&p.y>=j.y-8&&p.y<=j.y+j.h+8){G.dragJ=[p.x-j.x,p.y-j.y];return true}return false}
     const q=hit(p);if(!q)return false;if(MOL[q.k]){if(s<2||s===6)split(q);return false}
     if(G.sel&&G.sel!==q){const h=G.sel;G.sel=null;h.k==='H'?pair(h,q):pair(q,h);return false}
     if(q.k==='H'||q.k==='OH'){G.sel=q;G.drag=q;G.dp=G.d0=p;sync();return true}if(q.k!=='W'){tell(`${LB[q.k]} is a spectator ion: it does not react.`);sync()}return false},
    move:p=>{if(G.dragS){G.mk=Math.max(3,Math.min(6,2+(p.x-24)/(A.W-48)*5));A.redraw();return}if(G.dragJ){G.jx=p.x-G.dragJ[0];G.jy=p.y-G.dragJ[1];A.redraw();return}if(G.drag){G.dp=p;A.redraw()}},
    up:p=>{if(G.dragS){G.dragS=0;setPh(Math.round(G.mk));return}if(G.dragJ){G.dragJ=null;const b=G.bk;G.jx=G.jy=null;if(b&&p.x>b.x&&p.y>b.y&&p.y<b.y+b.h)pour();else A.redraw();return}
     const d=G.drag;G.drag=null;if(!d)return;const q=Math.hypot(p.x-G.d0.x,p.y-G.d0.y)>10&&hit(p,z=>z!==d);if(q){G.sel=null;d.k==='H'?pair(d,q):pair(q,d)}else A.redraw()}});sync()}});
 A.start()})})();
