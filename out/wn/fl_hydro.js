/* Flagship 26 – hydrocarbons. An atom scanner and a two-bin sorter. Each molecule is drawn as a displayed formula with
   neutral grey atoms; tapping an atom (or "Scan next atom") reveals its element and adds it to a live element tally, so the
   learner discovers what a formula is made of before deciding. Two bins on the canvas, "Hydrocarbon" and "Not a
   hydrocarbon", take a tap (or the matching button) to sort the molecule. The rule the learner tests is the word "only":
   carbon and hydrogen and nothing else. Predictions target "has C and H so it counts" (ethanol), "big carbon molecules are
   hydrocarbons" (glucose), "a double bond or ring stops it being one" (propene, benzene) and "any carbon compound counts"
   (CO₂). Challenge: a formula only; sort it; feedback names the slip (an extra element, no hydrogen, no carbon, a double
   bond or ring wrongly ruled out). */
(()=>{const LOW='₀₁₂₃₄₅₆₇₈₉',low=n=>n>1?String(n).replace(/\d/g,d=>LOW[d]):'';
 const WORD={C:'carbon',H:'hydrogen',O:'oxygen',Cl:'chlorine'};
 const SIDE={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
 // ---- molecule library, each one a displayed formula on a unit grid ----
 function mol(name,f,note){const m={name,f,note,at:[],bd:[]};m.put=(e,x,y)=>m.at.push({e,x,y})-1;m.link=(i,j,o=1)=>m.bd.push([i,j,o]);return m}
 function hang(m,i,side,g){if(!g)return;const[dx,dy]=SIDE[side],p=m.at[i];
  if(g==='OH'){const o=m.put('O',p.x+dx,p.y+dy);m.link(i,o);m.link(o,m.put('H',p.x+2*dx,p.y+2*dy));return}
  if(g==='=O'){m.link(i,m.put('O',p.x+dx,p.y+dy),2);return}
  m.link(i,m.put(g,p.x+dx,p.y+dy))}
 function backbone(name,f,n,over={},dbl=[],note){const m=mol(name,f,note),x0=-(n-1)/2;
  for(let i=0;i<n;i++){m.put('C',x0+i,0);if(i)m.link(i-1,i,dbl.includes(i-1)?2:1)}
  for(let i=0;i<n;i++){const s={up:'H',down:'H'};if(!i)s.left='H';if(i===n-1)s.right='H';Object.assign(s,over[i]||{});for(const k in s)hang(m,i,k,s[k])}return m}
 function ring(name,f,double){const m=mol(name,f,double?'ring with double bonds':'ring'),R=1.15;
  for(let i=0;i<6;i++){const t=-Math.PI/2+i*Math.PI/3;m.put('C',R*Math.cos(t),R*Math.sin(t))}
  for(let i=0;i<6;i++)m.link(i,(i+1)%6,double&&i%2===0?2:1);
  for(let i=0;i<6;i++){const t=-Math.PI/2+i*Math.PI/3;(double?[0]:[-.38,.38]).forEach(d=>m.link(i,m.put('H',2.05*Math.cos(t+d),2.05*Math.sin(t+d))))}return m}
 const LIB={
  methane:backbone('Methane','CH₄',1),
  ethanol:backbone('Ethanol','C₂H₅OH',2,{1:{right:'OH'}}),
  glucose:backbone('Glucose','C₆H₁₂O₆',6,{0:{up:'=O',down:null},1:{down:'OH'},2:{up:'OH'},3:{down:'OH'},4:{down:'OH'},5:{right:'OH'}}),
  octane:backbone('Octane','C₈H₁₈',8),
  propene:backbone('Propene','C₃H₆',3,{0:{left:null},1:{down:null}},[0],'double bond'),
  benzene:ring('Benzene','C₆H₆',true),
  co2:(()=>{const m=mol('Carbon dioxide','CO₂');m.put('C',0,0);m.link(0,m.put('O',-1,0),2);m.link(0,m.put('O',1,0),2);return m})(),
  chloromethane:backbone('Chloromethane','CH₃Cl',1,{0:{right:'Cl'}}),
  hydrogen:(()=>{const m=mol('Hydrogen gas','H₂');m.put('H',-.5,0);m.put('H',.5,0);m.link(0,1);return m})(),
  ethene:backbone('Ethene','C₂H₄',2,{0:{left:null},1:{right:null}},[0],'double bond'),
  cyclohexane:ring('Cyclohexane','C₆H₁₂',false),
  butane:backbone('Butane','C₄H₁₀',4),
  methanol:backbone('Methanol','CH₃OH',1,{0:{right:'OH'}}),
  ethanoic:backbone('Ethanoic acid','CH₃COOH',2,{1:{up:'=O',down:null,right:'OH'}}),
  ccl4:backbone('Tetrachloromethane','CCl₄',1,{0:{up:'Cl',down:'Cl',left:'Cl',right:'Cl'}})};
 const kinds=m=>[...new Set(m.at.map(a=>a.e))];
 const isHC=m=>{const k=kinds(m);return k.includes('C')&&k.includes('H')&&k.every(e=>e==='C'||e==='H')};
 // feedback for a sort: names the slip, used in the teaching steps and in the challenge
 function verdict(mo,saidHC){const k=kinds(mo),extra=k.filter(e=>e!=='C'&&e!=='H').map(e=>WORD[e]),right=saidHC===isHC(mo);let m;
  if(right)return{right,m:isHC(mo)?`${mo.f} has carbon and hydrogen and nothing else, so it is a hydrocarbon${mo.note?`. The ${mo.note} does not change that`:''}.`:
   !k.includes('C')?`${mo.f} has no carbon, so it cannot be a hydrocarbon.`:!k.includes('H')?`${mo.f} has no hydrogen, so it is not a hydrocarbon.`:`${mo.f} also contains ${extra.join(' and ')}, so it is not a hydrocarbon.`};
  if(saidHC&&!k.includes('C'))m=`${mo.f} has hydrogen but no carbon at all. A hydrocarbon needs both elements, so this is not one.`;
  else if(saidHC&&!k.includes('H'))m=`Containing carbon is not enough. ${mo.f} has no hydrogen at all, so it is not a hydrocarbon.`;
  else if(saidHC)m=`It has carbon and hydrogen, but it also has ${extra.join(' and ')}. A hydrocarbon is carbon and hydrogen only.`;
  else if(mo.note)m=`Bonds and shape do not matter, only the kinds of atom. ${mo.f} has a ${mo.note} but only C and H atoms, so it is a hydrocarbon.`;
  else m=`Every atom in ${mo.f} is C or H, so it is a hydrocarbon however many atoms it has.`;
  return{right,m}}
VIS.reg('flaghydro',c=>{let A,read,pad,chal;const taps=[];
 const S={m:LIB.methane,seen:new Set(),line:[],pos:0,bin:null,lock:false,chalOn:false,pulse:0,flash:null,sb:0,chk:()=>{},run:0};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const tally=()=>{const n={};S.m.at.forEach((a,i)=>{if(S.seen.has(i))n[a.e]=(n[a.e]||0)+1});return n};
 const tallyText=()=>{const n=tally(),ks=Object.keys(n);return ks.length?ks.map(e=>`${n[e]} ${WORD[e]}`).join(', '):'nothing yet'};
 function show(m,keep){S.m=m;S.seen=new Set();S.bin=null;S.flash=null;if(!keep)S.run++;refresh()}
 function scan(i){if(S.chalOn&&!S.bin)return say('Sort it from the formula first. Then you can check the atoms.');if(S.seen.has(i))return;
  S.seen.add(i);S.pulse=1;A.tween(S,{pulse:0},500,'out');A.sound.tick();const a=S.m.at[i],left=S.m.at.length-S.seen.size;
  say(`That atom is ${WORD[a.e]}. Found so far: ${tallyText()}.${left?` ${left} left to scan.`:' Every atom scanned.'}`);refresh();S.chk()}
 const scanNext=()=>{const i=S.m.at.findIndex((_,j)=>!S.seen.has(j));if(i>=0)scan(i)};
 function sortAs(hc){const v=verdict(S.m,hc);if(S.chalOn){if(!S.bin)judge(hc,v);return}
  if(S.bin!=null&&S.bin.ok)return;
  S.bin={hc,ok:v.right};S.flash=hc?'hc':'not';say(v.m);
  if(v.right){A.sound.pop();S.m.at.forEach((_,i)=>S.seen.add(i));const id=S.run;refresh();
   if(S.line.length&&S.pos<S.line.length-1)A.tween({k:0},{k:1},1100,'io',()=>{if(id!==S.run)return;S.pos++;show(LIB[S.line[S.pos]],true);say(`Next: ${S.m.name}, ${S.m.f}. Scan it or sort it.`)});
   else{S.done=true;S.chk()}}
  else{A.sound.miss();const id=S.run;refresh();A.tween({k:0},{k:1},900,'io',()=>{if(id===S.run&&S.bin&&!S.bin.ok){S.bin=null;S.flash=null;refresh()}})}}
 // teaching-step helpers
 function lineup(names){S.line=names;S.pos=0;S.done=false;show(LIB[names[0]])}
 function auto(list){const id=++S.run;let j=0;const nx=()=>{if(id!==S.run)return;if(j>=list.length)return;const o=list[j++];
   if(o==='all'){for(let i=0;i<S.m.at.length;i++)if(!S.seen.has(i)){S.seen.add(i)}A.sound.tick();say(`Every atom scanned: ${tallyText()}.`);refresh();S.chk()}
   else sortAs(isHC(S.m));
   A.tween({k:0},{k:1},o==='all'?500:1250,'io',nx)};nx()}
 function describe(){const n=S.m.at.length,s=S.seen.size;return `${S.m.name}${S.chalOn&&!S.bin?'':', '+S.m.f}. ${n} atoms, ${s} scanned${s?': '+tallyText():''}.`+
   (S.bin?` Sorted as ${S.bin.hc?'a hydrocarbon':'not a hydrocarbon'}, ${S.bin.ok?'correct':'not right'}.`:' Not sorted yet.')}
 function refresh(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(pad){pad.innerHTML='';const step=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f;return x};
   if(step===5){b('◀','Previous molecule',()=>browse(-1));b('▶','Next molecule',()=>browse(1))}
   if(!S.chalOn||S.bin){b('Scan next atom','Scan the next unscanned atom',scanNext,S.seen.size>=S.m.at.length);b('Scan all','Scan every atom',()=>auto(['all']),S.seen.size>=S.m.at.length)}
   if(step>=1){const done=S.chalOn?!!S.bin:!!(S.bin&&S.bin.ok);b('Hydrocarbon','Sort into Hydrocarbon',()=>sortAs(true),done);b('Not a hydrocarbon','Sort into Not a hydrocarbon',()=>sortAs(false),done)}}
  A.redraw()}
 function browse(d){const keys=Object.keys(LIB);S.sb=(S.sb+d+keys.length)%keys.length;show(LIB[keys[S.sb]]);say(`${S.m.name}, ${S.m.f}. Scan its atoms, then sort it.`)}
 // ---- drawing ----
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;taps.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  const m=S.m,useBins=A.step>=1,top=A.narrow?62:58,binH=useBins?(A.narrow?54:60):0,xs=m.at.map(a=>a.x),ys=m.at.map(a=>a.y);
  const minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys),avail=H-top-binH-14;
  const u=Math.min(A.narrow?46:62,(W-24)/(maxx-minx+1),avail/(maxy-miny+1)),ox=W/2-(minx+maxx)/2*u,oy=top+avail/2-(miny+maxy)/2*u+4;
  const X=a=>ox+a.x*u,Y=a=>oy+a.y*u,rad=Math.max(9,Math.min(17,u*.32)),hidden=S.chalOn&&!S.bin;
  // header
  ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle=C.tx;ctx.font=`800 ${A.narrow?19:24}px system-ui`;const head=hidden?'Hydrocarbon or not?':m.f;ctx.fillText(head,12,28);
  const fw=ctx.measureText(head).width;ctx.font=`600 ${A.narrow?12:13}px system-ui`;ctx.fillStyle=C.mu;ctx.fillText(hidden?'formula only':m.name,20+fw,27);
  // tally chips
  const n=tally();let cx=12;ctx.font='700 12px system-ui';ctx.textBaseline='middle';
  const chip=(t,bg,fg)=>{const w=ctx.measureText(t).width+14;ctx.fillStyle=bg;P.rrect(cx,38,w,20,10);ctx.fill();ctx.fillStyle=fg;ctx.fillText(t,cx+7,48.5);cx+=w+6};
  ['C','H','O','Cl'].forEach(e=>{if(n[e])chip(`${WORD[e]} ×${n[e]}`,e==='C'?'#3f3f46':e==='H'?A.mix(C.cy,'#ffffff',.55):e==='O'?'#b91c1c':'#15803d',e==='H'?'#111':'#fff')});
  const left=m.at.length-S.seen.size;if(left&&!hidden)chip(`? ×${left}`,A.alpha(C.mu,.25),C.tx);
  // bonds
  if(!hidden){ctx.strokeStyle=C.tx;ctx.lineCap='round'}if(!hidden)m.bd.forEach(([i,j,o])=>{const p=m.at[i],q=m.at[j],dx=Y(q)-Y(p),dy=X(p)-X(q),L=Math.hypot(dx,dy)||1,gap=o===2?3.2:0;
   ctx.lineWidth=o===2?2:2.6;for(const s of o===2?[-1,1]:[0]){ctx.beginPath();ctx.moveTo(X(p)+dx/L*gap*s,Y(p)+dy/L*gap*s);ctx.lineTo(X(q)+dx/L*gap*s,Y(q)+dy/L*gap*s);ctx.stroke()}});
  // atoms: grey until scanned
  if(!hidden)m.at.forEach((a,i)=>{const x=X(a),y=Y(a),on=S.seen.has(i),r=a.e==='H'?rad*.78:rad;
   const fill=!on?A.mix(C.mu,C.pn,.35):a.e==='C'?'#3f3f46':a.e==='H'?A.mix(C.cy,'#ffffff',.55):a.e==='O'?'#dc2626':'#16a34a';
   P.shadow(5,2,.2);P.ball(x,y,r,fill);P.noShadow();
   if(on&&S.pulse>0&&i===[...S.seen].pop()){ctx.strokeStyle=A.alpha(C.am,S.pulse);ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r+3+8*(1-S.pulse),0,7);ctx.stroke()}
   ctx.fillStyle=on&&a.e==='H'?'#111':'#fff';ctx.textAlign='center';ctx.font=`800 ${Math.round(r*(a.e==='Cl'?.8:.95))}px system-ui`;ctx.fillText(on?a.e:'?',x,y+1);taps.push({x,y,R:Math.max(r+4,16),atom:i})});
  else{ctx.textAlign='center';ctx.fillStyle=C.tx;ctx.font=`800 ${A.narrow?34:44}px system-ui`;ctx.fillText(m.f,W/2,oy-8);ctx.fillStyle=C.mu;ctx.font='600 13px system-ui';ctx.fillText('Read every symbol. Which bin?',W/2,oy+(A.narrow?26:32))}
  // bins
  if(useBins){const g=10,bw=(W-3*g)/2,by=H-binH-8;[['Hydrocarbon',true,C.gr],['Not a hydrocarbon',false,C.rd]].forEach(([t,hc,cl],k)=>{const bx=g+k*(bw+g),hot=S.bin&&S.bin.hc===hc;
    ctx.fillStyle=hot?A.alpha(S.bin.ok?C.gr:C.rd,.28):A.alpha(cl,.1);P.rrect(bx,by,bw,binH,12);ctx.fill();ctx.strokeStyle=hot?(S.bin.ok?C.gr:C.rd):A.alpha(cl,.7);ctx.lineWidth=hot?3:1.5;ctx.setLineDash(hot?[]:[6,4]);P.rrect(bx,by,bw,binH,12);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.font=`700 ${A.narrow?13:15}px system-ui`;ctx.fillText(t,bx+bw/2,by+binH/2-(A.narrow?7:8));ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;
    ctx.fillText(hot?(S.bin.ok?'✓ right bin':'✗ look again'):hc?'C and H only':'anything else',bx+bw/2,by+binH/2+(A.narrow?9:10));taps.push({x:bx,y:by,w:bw,h:binH,hc})})}
  if(!useBins&&left)P.label('tap a grey atom to scan it',W/2,H-16,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
 // ---- steps ----
 const fresh=()=>{S.chk=()=>{};S.chalOn=false;S.line=[];S.done=false;if(read)read.textContent=''};
 const goal=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Hydrogen and carbon',p:'A hydrocarbon is a compound made of hydrogen and carbon atoms only. The formula tells you which elements are inside.',
   predict:{q:'Methane is CH₄. Which atoms will the scan find?',opts:['Carbon and hydrogen only','Carbon, hydrogen and oxygen','Carbon only'],ans:0},
   task:'Tap every grey atom to scan it',show:()=>auto(['all']),
   go:()=>{fresh();show(LIB.methane);S.chk=goal(0,()=>S.seen.size===S.m.at.length,'1 carbon and 4 hydrogen, nothing else: methane is a hydrocarbon.')}},
  {h:'The word “only”',p:'Ethanol is the alcohol in drinks. Its formula has C and H in it. Scan it before you sort it.',
   predict:{q:'Ethanol, C₂H₅OH, contains carbon and hydrogen. Is it a hydrocarbon?',opts:['Yes: it has C and H','No: it also has oxygen','Only when it burns'],ans:1},
   task:'Sort ethanol into the right bin',show:()=>auto(['all','sort']),
   go:()=>{fresh();lineup(['ethanol']);S.chk=goal(1,()=>S.done,'Ethanol has an O atom, so it is not a hydrocarbon. Carbon and hydrogen must be the only elements.')}},
  {h:'Size does not decide',p:'Glucose and octane are both big molecules full of C and H atoms. Look at what else is there.',
   predict:{q:'Which of these is a hydrocarbon?',opts:['Glucose: it has lots of C and H','Octane, C₈H₁₈','Both of them'],ans:1},
   task:'Sort glucose, then octane',show:()=>auto(['sort','sort']),
   go:()=>{fresh();lineup(['glucose','octane']);S.chk=goal(2,()=>S.done,'Glucose has 6 oxygen atoms, so it is not one. Octane, a petrol molecule, has only C and H, so it is.')}},
  {h:'Bonds and shape',p:'Some hydrocarbons have a double bond between two carbons. Some are rings. Does that change anything?',
   predict:{q:'Propene has a C=C double bond. Is it still a hydrocarbon?',opts:['No: hydrocarbons have single bonds only','Yes: its atoms are only C and H','Only if it is a straight chain'],ans:1},
   task:'Sort propene, then benzene',show:()=>auto(['sort','sort']),
   go:()=>{fresh();lineup(['propene','benzene']);S.chk=goal(3,()=>S.done,'Both are hydrocarbons. The test is which atoms are present, not how they are bonded.')}},
  {h:'Carbon is not enough',p:'Lots of compounds contain carbon. Lots contain hydrogen. A hydrocarbon needs both, and nothing else.',
   predict:{q:'Carbon dioxide, CO₂, contains carbon. Is it a hydrocarbon?',opts:['Yes: it contains carbon','No: it has no hydrogen, and it has oxygen','Yes: every carbon compound is'],ans:1},
   task:'Sort CO₂, chloromethane and hydrogen gas',show:()=>auto(['sort','sort','sort']),
   go:()=>{fresh();lineup(['co2','chloromethane','hydrogen']);S.chk=goal(4,()=>S.done,'None of the three is a hydrocarbon: CO₂ has no H, chloromethane has Cl, and H₂ has no C.')}},
  {h:'Sandbox',p:'Browse 15 molecules. Scan the atoms, sort each one, and see which rule decides.',go:()=>{fresh();S.sb=0;show(LIB.methane)}},
  {h:'Challenge',p:'',go:()=>{fresh();next()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.chk()});
 // ---- challenge: the formula only ----
 const POOL=['ethanoic','cyclohexane','ccl4','ethene','methanol','hydrogen','butane','co2','benzene','chloromethane'];let qi=-1,streak=0;
 function next(){qi=(qi+1)%POOL.length;S.chalOn=true;show(LIB[POOL[qi]]);
  chal.innerHTML=`<p><b>Is ${S.m.f} a hydrocarbon?</b> Decide from the formula, with the buttons or the bins.</p><p class="fl-fb" role="status" aria-live="polite"></p>`;refresh()}
 function judge(hc,v){const fb=chal.querySelector('.fl-fb');S.bin={hc,ok:v.right};S.m.at.forEach((_,i)=>S.seen.add(i));refresh();
  if(v.right){streak++;A.win();fb.innerHTML=`✓ ${v.m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next;return}
  streak=0;A.sound.miss();fb.innerHTML=`${v.m} The atoms are now shown. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;refresh()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Scan and sort the molecule'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const t=taps.find(q=>q.w?p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h:Math.hypot(p.x-q.x,p.y-q.y)<=q.R);if(!t)return false;
     if(t.atom!=null)scan(t.atom);else sortAs(t.hc);return false}});refresh()}});
 A.start()})})();
