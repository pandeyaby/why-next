/* Flagship 69 – trends across a period and down a group (16–18). Tap through period 3 and watch the atom shrink as the
   core charge rises over the same inner shells; pull the outer electron off each Group 1 atom and each period 3 atom
   (the meter fills to the real first ionisation energy) to build both trends; explain the Mg/Al and P/S dips with
   sub-shell boxes; judge which of two atoms reacts more. Challenge: radius, down a group, two dips, shielding, reactivity. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot,PI=Math.PI;
 // [Z, shells, radius nm (metallic for metals, covalent otherwise; Chemguide), first ionisation energy kJ/mol (NIST)]
 const E={Li:[3,[2,1],.152,520],Na:[11,[2,8,1],.186,496],Mg:[12,[2,8,2],.16,738],Al:[13,[2,8,3],.143,578],Si:[14,[2,8,4],.117,787],
  P:[15,[2,8,5],.11,1012],S:[16,[2,8,6],.104,1000],Cl:[17,[2,8,7],.099,1251],Ar:[18,[2,8,8],0,1521],K:[19,[2,8,8,1],.231,419],
  Br:[35,[2,8,18,7],.114,1140],Rb:[37,[2,8,18,8,1],.244,403],Cs:[55,[2,8,18,18,8,1],.262,376]};
 const NM={Li:'lithium',Na:'sodium',Mg:'magnesium',Al:'aluminium',Si:'silicon',P:'phosphorus',S:'sulfur',Cl:'chlorine',Ar:'argon',K:'potassium',Br:'bromine',Rb:'rubidium',Cs:'caesium'};
 const P3=['Na','Mg','Al','Si','P','S','Cl','Ar'],G1=['Li','Na','K','Rb','Cs'];
 const DIP=[['Mg','Al','3s² → 3s² 3p¹',[["Al's new electron is in 3p: higher in energy and partly shielded by the 3s pair",1],['Al has fewer protons than Mg',0,'Al has 13 protons, Mg 12. More, not fewer.'],['Al starts a new shell',0,'Both have their outer electrons in shell 3.']]],
  ['P','S','3p³ → 3p⁴',[['S has more shielding from an extra inner shell',0,'P and S have the same inner shells (2, 8).'],['In S two 3p electrons share an orbital and repel, so one is easier to remove',1],['S has a smaller nuclear charge than P',0,'S has 16 protons, P 15.']]]];
 const PAIR=[['Na','K','reacts faster with water',1,'Na has fewer protons, but K\'s outer electron is a shell further out and more shielded, so K loses it more easily and reacts faster.'],
  ['Mg','Na','loses its outer electron more easily',1,'Mg has core charge +2 against Na\'s +1 and is smaller, so it holds its electrons more tightly.'],
  ['S','Cl','attracts an extra electron more strongly',1,'S has core charge +6 against Cl\'s +7 and is larger, so it pulls an incoming electron less.'],
  ['Cl','Br','is the more reactive non-metal',0,'Br\'s outer shell is further out and more shielded, so it pulls an incoming electron less strongly. Non-metal reactivity falls down a group.']];
VIS.reg('flagtrend',c=>{let A,pad,chal,read;
 const S={set:P3,cur:0,seen:new Set(),rm:{},drag:null,dp:null,p0:null,fly:0,dk:0,dok:[],pk:0,pok:0,bad:null,want:()=>{},run:0,last:'',Q:null,glow:0};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['rad','down','ie','dip','pair','quiz'][A.step];
 const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a);
 const font=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const wrap=(x,t,X,Y,w,lh)=>{const L=[];let cur='';t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(x.measureText(k).width>w&&cur){L.push(cur);cur=s}else cur=k});L.push(cur);L.forEach((l,j)=>x.fillText(l,X,Y+(j-(L.length-1)/2)*lh))};
 const dot=(x,X,Y,r)=>{x.beginPath();x.arc(X,Y,r,0,7);x.fill()},ring=(x,X,Y,r)=>{x.beginPath();x.arc(X,Y,r,0,7);x.stroke()};
 const box=(x,R,c,a,lw)=>{x.fillStyle=al(c,a);rr(R.x,R.y,R.w,R.h,10);x.fill();x.strokeStyle=c;x.lineWidth=lw;x.stroke()};
 const el=()=>S.set[S.cur],core=s=>E[s][1].slice(-1)[0],inner=s=>E[s][0]-core(s);
 const tile=i=>{const n=S.set.length,g=6,w=(A.W-12-(n-1)*g)/n,h=mn(46,A.H*.11);return{x:6+i*(w+g),y:A.H-h-6,w,h}};
 const atom=()=>({x:A.narrow?A.W*.3:A.W*.25,y:A.H*.33,R:mn(A.H*.28,A.W*(A.narrow?.27:.2))});
 const outR=s=>{const a=atom();return a.R*(E[s][2]||E.Cl[2])/.262};
 const eHome=()=>{const a=atom();return{x:a.x+outR(el()),y:a.y}};
 const card=i=>{const y0=A.H*.5,h=(A.H-y0-8)/3-6;return{x:8,y:y0+i*(h+6),w:A.W-16,h}};
 const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 // ---- drawing ----
 function drawAtom(x,s,X,Y,R,dragE){const C=A.col,sh=E[s][1],n=sh.length;
  sh.forEach((k,j)=>{const r=R*(j+1)/n,outer=j===n-1;x.strokeStyle=al(outer?C.cy:C.mu,outer?.9:.45);x.lineWidth=outer?2:1;if(outer&&!E[s][2])x.setLineDash([5,4]);ring(x,X,Y,r);x.setLineDash([]);
   for(let e=0;e<k;e++){if(outer&&e===0&&(dragE||S.rm[s]))continue;const a=-PI/2+e*2*PI/k+j*.3;x.fillStyle=outer?C.am:al(C.mu,.8);dot(x,X+r*Math.cos(a)+(outer&&e===0?0:0),Y+r*Math.sin(a),outer?mx(4,R*.05):mx(2,R*.025))}});
  x.fillStyle=C.rd;dot(x,X,Y,mx(12,R*.13));font(x,800,mx(10,R*.1));x.fillStyle='#fff';x.fillText('+'+E[s][0],X,Y+1)}
 function chart(x,key){const C=A.col,top=A.H*.62,bot=A.H*.84,n=S.set.length,bw=(A.W-24)/n,max=key===2?.27:1600;
  font(x,600,10,'left');x.fillStyle=C.mu;x.fillText(key===2?'atomic radius / nm':'1st ionisation energy / kJ mol⁻¹',8,top-10);
  S.set.forEach((s,i)=>{const v=E[s][key],have=key===2?S.seen.has(s):S.rm[s],X=12+i*bw;x.strokeStyle=al(C.mu,.3);x.lineWidth=1;x.strokeRect(X+3,top,bw-6,bot-top);
   if(have&&v){const h=(bot-top)*v/max;x.fillStyle=i===S.cur?C.am:C.cy;x.fillRect(X+3,bot-h,bw-6,h);font(x,700,A.narrow?9:11);x.fillStyle=C.tx;x.fillText(key===2?v.toFixed(3):v,X+bw/2,bot-h-8)}
   else if(have){font(x,700,9);x.fillStyle=C.mu;x.fillText('n/a',X+bw/2,bot-8)}})}
 function tiles(x){const C=A.col;S.set.forEach((s,i)=>{const t=tile(i),on=i===S.cur;box(x,t,on?C.am:C.cy,on?.3:.1,on?3:1.5);font(x,800,A.narrow?14:17);x.fillStyle=C.tx;x.fillText(s,t.x+t.w/2,t.y+t.h/2)})}
 function info(x,lines){const C=A.col,a=atom(),X=a.x+a.R+16,w=A.W-X-8;font(x,600,A.narrow?12:14,'left');lines.forEach((l,i)=>{x.fillStyle=i?C.tx:C.am;if(!i)font(x,800,A.narrow?15:18,'left');else font(x,600,A.narrow?12:14,'left');x.fillText(l,X,A.H*.08+i*(A.narrow?18:22),w)})}
 function atomView(x,key){const C=A.col,s=el(),a=atom(),d=E[s];
  if(S.drag&&S.dp){const h=eHome(),pull=mn(1,hy(S.dp.x-a.x,S.dp.y-a.y)/(outR(s)+a.R*.6));x.strokeStyle=al(C.rd,.7);x.lineWidth=1+5*d[3]/1521;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(S.dp.x,S.dp.y);x.stroke();
   x.fillStyle=C.am;dot(x,S.dp.x,S.dp.y,6);const m={x:a.x-a.R,y:a.y+a.R+8,w:a.R*2,h:8};box(x,m,C.rd,.1,1);x.fillStyle=C.rd;x.fillRect(m.x,m.y,m.w*pull,m.h)}
  drawAtom(x,s,a.x,a.y,outR(s),!!S.drag);
  if(S.fly>0){x.fillStyle=al(C.am,S.fly);dot(x,a.x+outR(s)+(1-S.fly)*a.R*1.2,a.y-(1-S.fly)*40,6)}
  info(x,[`${NM[s]} (${s})`,`protons: ${d[0]}`,`shells: ${d[1].join(', ')}`,`inner (shielding) e⁻: ${inner(s)}`,`core charge ≈ +${core(s)}`,key===2?`radius: ${d[2]?d[2]+' nm':'no comparable value'}`:`1st IE: ${S.rm[s]?d[3]+' kJ/mol':'pull the electron off'}`]);
  chart(x,key);tiles(x)}
 function dipView(x){const C=A.col,D=DIP[mn(S.dk,1)];if(S.dok.length>=2){font(x,800,A.narrow?16:20);x.fillStyle=C.gr;wrap(x,'Both dips explained: a new, higher sub-shell (Al) and paired-electron repulsion (S).',A.W/2,A.H/2,A.W-40,26);return}
  const bw=mn(30,A.W*.07);[D[0],D[1]].forEach((s,j)=>{const X=A.W*(j?.72:.28),Y=A.H*.12;font(x,800,A.narrow?15:18);x.fillStyle=C.tx;x.fillText(`${s}: ${E[s][3]} kJ/mol`,X,Y);
   const o=core(s),sE=mn(2,o),pE=o-2;font(x,600,11);x.fillStyle=C.mu;x.fillText('3s',X-bw*2.1,Y+40);x.fillText('3p',X+bw*.5,Y+18);
   x.strokeStyle=C.tx;x.lineWidth=1.5;x.strokeRect(X-bw*2.6,Y+48,bw,bw);for(let k=0;k<3;k++)x.strokeRect(X-bw+k*bw,Y+26,bw,bw);
   const arrow=(cx,cy,up)=>{x.strokeStyle=C.am;x.lineWidth=2.5;x.beginPath();x.moveTo(cx,cy+bw*.35*(up?1:-1));x.lineTo(cx,cy-bw*.35*(up?1:-1));x.stroke();x.beginPath();x.moveTo(cx-4,cy-bw*.35*(up?1:-1)+(up?5:-5));x.lineTo(cx,cy-bw*.35*(up?1:-1));x.lineTo(cx+4,cy-bw*.35*(up?1:-1)+(up?5:-5));x.stroke()};
   for(let k=0;k<sE;k++)arrow(X-bw*2.1+(k?6:-6),Y+48+bw/2,!k);
   for(let k=0;k<pE;k++){const b=k%3,up=k<3;arrow(X-bw/2+b*bw+(pE>3?(up?-6:6):0),Y+26+bw/2,up)}
   if(pE===4){x.strokeStyle=C.rd;x.lineWidth=2;ring(x,X-bw/2,Y+26+bw/2,bw*.62)}});
  font(x,700,A.narrow?13:15);x.fillStyle=C.tx;wrap(x,`Why is ${D[1]}'s first ionisation energy lower than ${D[0]}'s?`,A.W/2,A.H*.43,A.W-30,18);
  D[3].forEach((o,i)=>{const R=card(i),b=S.bad===i;box(x,R,b?C.rd:C.vi,b?.18:.1,2);font(x,600,A.narrow?12:14);x.fillStyle=C.tx;wrap(x,o[0],A.W/2,R.y+R.h/2,R.w-20,16)})}
 function pairView(x){const C=A.col;if(S.pok>=4){font(x,800,A.narrow?16:20);x.fillStyle=C.gr;wrap(x,'Metals react by losing electrons, non-metals by gaining them. Same pull, opposite trends.',A.W/2,A.H/2,A.W-40,26);return}
  const P=PAIR[S.pk],R=mn(A.H*.3,A.W*.2);font(x,700,A.narrow?14:16);x.fillStyle=C.tx;wrap(x,`Which ${P[2]}?`,A.W/2,A.H*.07,A.W-20,18);
  [P[0],P[1]].forEach((s,j)=>{const X=A.W*(j?.75:.25),Y=A.H*.5,b=S.bad===j;x.fillStyle=al(b?C.rd:C.cy,b?.15:.06);rr(X-A.W*.23,A.H*.14,A.W*.46,A.H*.84,14);x.fill();
   drawAtom(x,s,X,Y,R*E[s][2]/.262);font(x,800,A.narrow?14:17);x.fillStyle=C.tx;x.fillText(`${NM[s]}`,X,A.H*.2);font(x,600,A.narrow?11:13);x.fillStyle=C.mu;x.fillText(`core +${core(s)}, ${E[s][1].length} shells, ${E[s][2]} nm`,X,A.H*.92)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);x.fillRect(0,0,W,H);
  if(v==='rad')atomView(x,2);else if(v==='down'||v==='ie')atomView(x,3);else if(v==='dip')dipView(x);else if(v==='pair')pairView(x);
  else{font(x,900,mn(W,H)*.12);x.fillStyle=al(C.vi,.5);x.fillText(S.Q?S.Q.big:'?',W/2,H/2)}
  if(S.glow>0){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.drag=null;S.bad=null};
 const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
 const miss=t=>{A.sound.miss();say(t);A.redraw()};
 function pick(i){S.cur=i;const s=el();A.sound.tick();if(view()==='rad'){S.seen.add(s);if(S.seen.size===8)glow()}status()}
 function remove(){const s=el();if(S.rm[s])return status();S.rm[s]=1;S.fly=1;A.tween(S,{fly:0},600,'out');A.sound.pop();if(S.set.every(e=>S.rm[e]))glow();status()}
 function dip(i){if(S.dok.length>=2)return;const o=DIP[S.dk][3][i];if(!o[1]){S.bad=i;return miss(o[2])}S.bad=null;S.dok.push(S.dk);S.dk=mn(1,S.dok.length);A.sound.pop();if(S.dok.length===2)glow();status()}
 function pair(j){if(S.pok>=4)return;const P=PAIR[S.pk];if(j!==P[3]){S.bad=j;return miss(P[4])}S.bad=null;S.pok++;S.pk=mn(3,S.pok);A.sound.pop();if(S.pok===4)glow();status()}
 function status(){const v=view(),s=el(),d=E[s];let t;
  if(v==='rad')t=`${NM[s]}: ${d[0]} protons, shells ${d[1].join(',')}, core charge +${core(s)}, radius ${d[2]?d[2]+' nm':'not comparable (argon forms no bonds)'}. Seen ${S.seen.size} of 8.`;
  else if(v==='down'||v==='ie'){const done=S.set.filter(e=>S.rm[e]);t=`${NM[s]}: ${d[1].length} shells, core charge +${core(s)}. `+(S.rm[s]?`First ionisation energy ${d[3]} kJ/mol.`:'Drag its outer electron away.')+` Done: ${done.map(e=>e+' '+E[e][3]).join(', ')||'none'}.`}
  else if(v==='dip')t=S.dok.length<2?`${DIP[S.dk][0]} ${E[DIP[S.dk][0]][3]}, ${DIP[S.dk][1]} ${E[DIP[S.dk][1]][3]} kJ/mol, ${DIP[S.dk][2]}. Why the dip?`:'Both dips explained.';
  else if(v==='pair')t=S.pok<4?`Which ${PAIR[S.pk][2]}: ${NM[PAIR[S.pk][0]]} or ${NM[PAIR[S.pk][1]]}?`:'All four pairs judged.';
  else t='Challenge time.';say(t);sync();S.want()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const v=view();
  const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='rad'||v==='down'||v==='ie')S.set.forEach((s,i)=>B(s,()=>pick(i),0,`Show ${NM[s]}`));
  if(v==='down'||v==='ie')B('Remove outer electron',remove,S.rm[el()]);
  if(v==='dip'&&S.dok.length<2)DIP[S.dk][3].forEach((o,i)=>B(`Reason ${i+1}`,()=>dip(i),0,o[0]));
  if(v==='pair'&&S.pok<4)[0,1].forEach(j=>B(NM[PAIR[S.pk][j]],()=>pair(j)));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const setUp=(set,i)=>{fresh();S.set=set;S.cur=i||0;S.seen=new Set();S.rm={}};
 const steps=[
  {h:'Across period 3',p:'Tap each element from Na to Ar. Watch the protons, the inner shells and the size of the atom.',
   predict:{q:'Chlorine has 17 electrons, sodium 11. Which atom is smaller?',opts:['Sodium: fewer electrons','Chlorine'],ans:1},task:'Look at all eight period 3 elements',
   show:()=>{steps[0].go();seq(P3.map((s,i)=>()=>pick(i)),180)},go:()=>{setUp(P3);pick(0);S.want=fin(0,()=>S.seen.size===8,()=>'Same inner shells, more protons each time: the core charge rises from +1 to +7, so the outer shell is pulled in from 0.186 to 0.099 nm.')}},
  {h:'Down Group 1',p:'Drag the outer electron off each atom, or press Remove. The bar shows the energy it takes.',
   predict:{q:'Caesium has 55 protons, lithium 3. Which loses its outer electron more easily?',opts:['Lithium','Caesium'],ans:1},task:'Remove the outer electron from all five',
   show:()=>{steps[1].go();seq(G1.flatMap((s,i)=>[()=>pick(i),remove]),160)},go:()=>{setUp(G1);status();S.want=fin(1,()=>G1.every(e=>S.rm[e]),()=>'Core charge stays +1, but each new shell puts the electron further out behind more shielding: 520 down to 376 kJ/mol.')}},
  {h:'Ionisation energy across',p:'Now pull the outer electron off every period 3 atom and watch the bars.',
   predict:{q:'Will each period 3 element need more energy than the one before it?',opts:['Yes, every time','No, there are dips'],ans:1},task:'Remove the outer electron from all eight',
   show:()=>{steps[2].go();seq(P3.flatMap((s,i)=>[()=>pick(i),remove]),130)},go:()=>{setUp(P3);status();S.want=fin(2,()=>P3.every(e=>S.rm[e]),()=>'The trend rises from 496 to 1521 kJ/mol as core charge rises, with dips at Al and S.')}},
  {h:'Explain the dips',p:'Compare the sub-shell boxes. Tap the reason that explains each dip.',task:'Explain both dips',
   show:()=>{steps[3].go();seq([0,1].map(()=>()=>dip(DIP[S.dk][3].findIndex(o=>o[1]))),400)},go:()=>{fresh();S.dk=0;S.dok=[];status();S.want=fin(3,()=>S.dok.length>=2,()=>'Dips come from sub-shells, not from fewer protons: both breaks sit inside one shell.')}},
  {h:'Which reacts more?',p:'Tap the atom that fits the question. Use core charge, shells and size.',
   predict:{q:'Potassium has more protons than sodium. Does it react with water more or less vigorously?',opts:['Less: more protons hold tighter','More'],ans:1},task:'Judge four pairs',
   show:()=>{steps[4].go();seq([0,1,2,3].map(()=>()=>pair(PAIR[S.pk][3])),350)},go:()=>{fresh();S.pk=0;S.pok=0;status();S.want=fin(4,()=>S.pok>=4,()=>'Easier electron loss means a more reactive metal; stronger pull on an incoming electron means a more reactive non-metal.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={rad:['Why is a chlorine atom smaller than a sodium atom?','Cl<Na',[['More protons pull the same shells in','ok'],['Its extra electrons pack tighter','elec'],['It has fewer shells','shell']]],
  down:['Why does first ionisation energy fall from Na to K?','Na>K',[['The outer electron is further out and more shielded','ok'],['K has more protons','proton'],['K has a smaller core charge','core']]],
  al:['Why is the first ionisation energy of Al lower than Mg?','Al<Mg',[["Al's electron is in 3p, above 3s",'ok'],['Al starts a new shell','newshell'],['Al has fewer protons','fewer']]],
  s:['Why is the first ionisation energy of S lower than P?','S<P',[['Paired 3p electrons repel','ok'],['S has an extra inner shell','newshell'],['S has fewer protons','fewer']]],
  shield:['Across period 3, what happens to shielding by inner electrons?','2,8',[['It stays about the same','ok'],['It rises a lot each step','rise'],['It falls to zero','rise']]],
  react:['Which atom loses an electron most easily?','Cs',[['Cs','ok'],['Li','li'],['Cl','cl']]],
  hal:['How does reactivity change down Group 7?','F→I',[['It falls','ok'],['It rises, like Group 1','g1'],['It stays the same','same']]]};
 let qi=-1,run=0;
 function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct.';break;
   case 'elec':m='Electrons in the same shell barely shield each other. It is the rising proton count that pulls the shell in.';break;
   case 'shell':m='Na and Cl both have three shells. The difference is nuclear charge.';break;
   case 'proton':m='More protons would raise the energy. The extra shell and shielding win: core charge is still +1.';break;
   case 'core':m='Core charge is +1 for every Group 1 atom. Distance and shielding make the difference.';break;
   case 'newshell':m='All period 3 atoms use shell 3. The dip comes from a sub-shell effect.';break;
   case 'fewer':m='Proton number rises by one every step across a period.';break;
   case 'rise':m='Every period 3 atom has the same inner shells (2, 8), so shielding stays about the same.';break;
   case 'li':m='Li holds its electron tightest in Group 1: only two shells.';break;
   case 'cl':m='Cl has core charge +7 and a small radius: it gains electrons, it does not lose them easily.';break;
   case 'g1':m='Halogens react by gaining an electron. Further out means a weaker pull, so reactivity falls.';break;
   default:m='Atomic radius rises down the group, so the pull on an incoming electron changes.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E2=c.el,bx=E2('div',{class:'fl-below'},A.below);read=E2('p',{class:'fl-read','aria-hidden':'true'});
   pad=E2('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E2('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const v=view();S.dp=null;S.p0=p;
     if(v==='rad'||v==='down'||v==='ie'){const i=S.set.findIndex((s,i)=>inR(p,tile(i)));if(i>=0){pick(i);return false}
      if(v!=='rad'&&!S.rm[el()]){const h=eHome();if(hy(p.x-h.x,p.y-h.y)<22){S.drag=1;S.dp=p;return true}}return false}
     if(v==='dip'&&S.dok.length<2){const i=[0,1,2].find(i=>inR(p,card(i)));if(i!=null)dip(i);return false}
     if(v==='pair'&&S.pok<4)pair(p.x<A.W/2?0:1);return false},
    move:p=>{S.dp=p;A.redraw()},
    up:p=>{const a=atom();S.drag=null;S.dp=null;if(hy(p.x-a.x,p.y-a.y)>outR(el())+a.R*.6)remove();else{say('Not far enough: pull the electron right out of the atom.');A.redraw()}}});
   sync()}});
 A.start()})})();
