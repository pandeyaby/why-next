/* Flagship 35 – noble gases and stable outer shells. Three benches share one idea: a full outer shell is the stable
   state. (1) Safety bench: bring a flame to a hydrogen and a helium balloon, and switch on a filament lamp filled with air
   and with argon; each gas shows its electron arrangement beside it, so "does not react" is linked to "outer shell full".
   (2) Fullness meter: ten atoms show their outer shell as slots; the learner taps every atom whose outer shell has no gaps
   (sodium's full inner shell is the trap). (3) Electron mover: drag an electron out of the outer shell or in from the
   tray (or use the buttons). A meter counts moves and lights up when the arrangement matches a noble gas; a full shell
   reached the long way (sodium gaining 7) is accepted as full but not as the easy route. (4) Carbon is 4 moves either
   way, so the learner shares instead: each H brought to carbon adds a shared pair until C counts 8 and every H counts 2.
   Predictions target "helium is lighter than hydrogen", "a full inner shell makes sodium stable", "chlorine loses 7"
   and "carbon loses 4". Challenge: why noble gases do not react, the easy route for an atom, the balloon question, which
   arrangement is full, and why carbon shares; feedback names the slip. */
(()=>{const EL=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'],
 NAME=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'];
 const conf=e=>{const s=[];let r=e;for(const cap of[2,8,8,2]){if(r<=0)break;s.push(Math.min(cap,r));r-=cap}return s},CAP=[2,8,8,8];
 const full=e=>e===2||e===10||e===18,NOB={2:'helium',10:'neon',18:'argon'},near=z=>[2,10,18].map(n=>[n,Math.abs(n-z)]).sort((a,b)=>a[1]-b[1]);
 const outer=e=>{const s=conf(e);return{n:s.length?s[s.length-1]:0,cap:CAP[Math.max(0,s.length-1)]}},cs=e=>conf(e).join(',')||'0';
 const ct=q=>q?Math.abs(q)+(q>0?'+':'−'):'0',sup=t=>t.replace(/./g,ch=>({'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','+':'⁺','−':'⁻'})[ch]||ch),chg=q=>q===0?'':q>0?(q>1?q:'')+'+':(-q>1?-q:'')+'−';
 const CARDS=[1,2,3,10,11,12,8,17,18,9],MOV=[11,17,12,8],SAND=[3,11,19,12,20,13,8,16,7,9,17,6];
VIS.reg('flagnoble',c=>{let A,pad,chal,read;const hot=[];
 const W={z:11,e:11,tray:3,trials:new Set(),scene:'balloon',gas:'H',fx:null,marks:new Set(),reached:new Set(),hc:0,drag:null,shake:0,pop:0,glow:0,burnt:0,goal:()=>{},run:0,hide:false,last:''};
 const say=t=>{t=t.charAt(0).toUpperCase()+t.slice(1);c.say(t);if(read)read.textContent=t};
 const miss=()=>{A.sound.miss();W.shake=1;A.tween(W,{shake:0},500,'out')};
 // ---- 1: safety bench ----
 function trial(g){const sc=W.scene;W.gas=g;W.trials.add(sc+g);W.burnt=0;W.pop=0;W.glow=0;
  if(sc==='balloon'){if(g==='H'){W.pop=1;A.sound.pop();boom();say('Bang! Hydrogen (1 electron, its shell holds 2) reacts with oxygen in the air and burns. Hydrogen is lighter, but it is not safe.')}
   else{A.sound.tick();say('Nothing happens. Helium is 2: its only shell is full, so it has no reason to react. It just floats.')}}
  else{W.glow=1;if(g==='air'){A.tween(W,{burnt:1},1100,'io');A.sound.miss();say('The filament glows, then burns through. Oxygen (2,6) in the air reacts with the hot tungsten.')}
   else{A.sound.tick();say('The filament glows and stays whole. Argon is 2,8,8: its outer shell is full, so it does not react even with white-hot metal.')}}
  sync();W.goal()}
 function boom(){if(A.reduced())return;const x=A.W*.3,y=A.H*.32;A.fx.add(40,i=>({x,y,vx:(Math.random()-.5)*380,vy:(Math.random()-.6)*380,g:200,life:.7+Math.random()*.4,r:3+Math.random()*3,col:['#f59e0b','#ef4444','#fde047'][i%3],drag:.8}));A.kick()}
 // ---- 2: fullness meter ----
 function mark(z){const e=z,o=outer(e);if(W.marks.has(z)){W.marks.delete(z);A.sound.tick();say(`Unmarked ${NAME[z]}.`);sync();return}
  if(full(e)){W.marks.add(z);A.sound.pop();say(`${NAME[z]} is ${cs(e)}: the outer shell has ${o.n} of ${o.cap}, no gaps. A noble gas.`)}
  else{miss();say(z===1?'Hydrogen has 1 electron in a shell that holds 2. Half full.':o.n<=3&&conf(e).length>1?`${NAME[z]} is ${cs(e)}. The inner shells are full, but the outer shell has only ${o.n} of ${o.cap}. Only the outer shell counts.`:
   `${NAME[z]} is ${cs(e)}: ${o.n} of ${o.cap} in the outer shell. Close, but ${o.cap-o.n} gap${o.cap-o.n>1?'s':''} left.`)}sync();W.goal()}
 // ---- 3: electron mover ----
 function setZ(z){W.z=z;W.e=z;W.tray=3;W.last='';sync()}
 function move(d){const z=W.z;if(d<0&&W.e<=0||d>0&&W.e>=20){miss();say(d<0?'No electrons left to remove.':'This model stops at 20 electrons, calcium.');sync();return}if(d<0&&W.e-z<=-8||d>0&&W.e-z>=8){miss();say('That is already 8 moves. No atom gets that far.');sync();return}
  W.e+=d;W.tray-=d;A.sound.tick();const m=Math.abs(W.e-z),best=near(z);let t=`${NAME[z]}: ${cs(W.e)}, ${m} electron${m===1?'':'s'} ${W.e<z?'lost':'gained'}${W.e===z?'':`, charge ${ct(z-W.e)}`}.`;
  if(full(W.e)){const easy=m===best[0][1]&&best[0][1]!==best[1][1];if(easy){W.reached.add(z);A.sound.pop()}
   t+=easy?` Full outer shell, like ${NOB[W.e]}, in the fewest moves.`:best[0][1]===best[1][1]?` Full, like ${NOB[W.e]}, but it took ${m} moves either way. Atoms like this share instead.`:` Full, like ${NOB[W.e]}, but it took ${m} moves. ${best[0][1]} move${best[0][1]>1?'s':''} the other way would do it.`}
  else if(W.e===z)t=`${NAME[z]} again: ${cs(z)}.`;say(t);W.last=t;sync();W.goal()}
 // ---- 4: sharing ----
 function addH(){if(W.hc>=4){miss();say('Carbon now counts 8 in its outer shell. A fifth H would need a ninth: no room.');sync();return}
  W.hc++;A.sound.pop();say(W.hc<4?`H ${W.hc} shares a pair with carbon. Carbon counts ${4+W.hc} of 8; that H counts 2 of 2, like helium.`:'Four shared pairs: carbon counts 8, like neon, and each H counts 2, like helium. Methane, CH₄, and nobody lost or gained an electron.');sync();W.goal()}
 function play(list,ms=320){const tok=++W.run;let j=0;const go=()=>{if(tok!==W.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){const s=A.step;if(s===0)return `${W.scene==='balloon'?'Balloon':'Filament lamp'} test. Trials done: ${[...W.trials].join(', ')||'none'}.`+(W.scene==='balloon'?' Hydrogen 1, helium 2 (full).':' Air contains oxygen 2,6; argon 2,8,8 (full).');
  if(s===1)return 'Ten atoms with their outer-shell slots: '+CARDS.map(z=>`${NAME[z]} ${cs(z)}${W.marks.has(z)?' marked full':''}`).join('; ')+'.';
  if(s===3)return `Carbon 2,4 in the middle with ${W.hc} hydrogen${W.hc===1?'':'s'} sharing pairs. Carbon counts ${4+W.hc} of 8.`;
  if(s===5&&W.hide)return 'Challenge atom.';const z=W.z;return `${NAME[z].charAt(0).toUpperCase()+NAME[z].slice(1)} atom, ${z} protons, ${W.e} electrons: ${cs(W.e)}. Outer shell ${outer(W.e).n} of ${outer(W.e).cap}${full(W.e)?', full like '+NOB[W.e]:''}. Charge ${ct(z-W.e)}.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=f};
  if(s===5)return A.redraw();
  if(s===0){b('Balloons','Show the balloon test',()=>{W.scene='balloon';sync()});b('Lamp','Show the lamp test',()=>{W.scene='lamp';sync()});
   (W.scene==='balloon'?[['H','Flame to hydrogen balloon'],['He','Flame to helium balloon']]:[['air','Switch on lamp filled with air'],['Ar','Switch on lamp filled with argon']]).forEach(([g,l])=>b(l,l,()=>trial(g)))}
  if(s===1)CARDS.forEach(z=>b(`${W.marks.has(z)?'☑':'☐'} ${EL[z]}`,`${W.marks.has(z)?'Unmark':'Mark'} ${NAME[z]} as full`,()=>mark(z)));
  if(s===2||s===4){(s===2?MOV:SAND).forEach(z=>b(EL[z],`Show ${NAME[z]}`,()=>setZ(z),W.z===z));b('Remove e⁻','Remove an electron from the outer shell',()=>move(-1));b('Add e⁻','Add an electron to the outer shell',()=>move(1));b('Reset','Put the atom back to neutral',()=>setZ(W.z))}
  if(s===3){b('Bring an H','Bring a hydrogen atom to share a pair with carbon',addH);b('Start again','Remove all hydrogens',()=>{W.hc=0;sync()},!W.hc)}
  A.redraw()}
 // ---- drawing ----
 function atom(x,y,z,e,R,o={}){const{ctx,col:C,paint:P}=A,s=conf(e),sh=W.shake*Math.sin(W.shake*28)*5;x+=sh;P.ball(x,y,R*.22,'#7c3aed');ctx.fillStyle='#fff';ctx.font=`800 ${Math.round(R*.17)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.hide?'?':EL[z],x,y+.5);
  const n=Math.max(1,s.length),out=[];W.ring={x,y,r:R*(.38+.62*.95)};for(let k=0;k<n;k++){const r=R*(.38+.62*(k+1)/n*.95),cap=CAP[k],has=s[k]||0,isOut=k===n-1;ctx.strokeStyle=A.alpha(C.tx,isOut?.55:.3);ctx.lineWidth=isOut?2:1.2;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
   for(let j=0;j<cap;j++){const a=-Math.PI/2+j*2*Math.PI/cap+(cap===2?Math.PI/2:0),ex=x+r*Math.cos(a),ey=y+r*Math.sin(a);if(j<has){P.ball(ex,ey,R*.055+2,isOut?(full(e)?C.gr:C.cy):'#64748b');if(isOut&&j===has-1)out.push({x:ex,y:ey})}
    else if(isOut){ctx.setLineDash([2,3]);ctx.strokeStyle=A.alpha(C.am,.9);ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(ex,ey,R*.055+2,0,7);ctx.stroke();ctx.setLineDash([])}}}
  if(full(e)&&!o.hide){ctx.strokeStyle=A.alpha(C.gr,.5);ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,y,R+6,0,7);ctx.stroke()}return out[0]}
 function meter(x,y,w,e,label){const{ctx,col:C,paint:P}=A,o=outer(e),bw=Math.min(22,(w-2*(o.cap-1))/o.cap);for(let j=0;j<o.cap;j++){ctx.fillStyle=j<o.n?(full(e)?C.gr:C.cy):'transparent';P.rrect(x+j*(bw+2),y,bw,14,4);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.45);ctx.lineWidth=1;ctx.stroke()}
  if(label){ctx.fillStyle=C.tx;ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText(label,x,y+18)}}
 function draw(A){const{ctx,W:Wd,H,col:C,paint:P}=A,s=A.step,nar=A.narrow;hot.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,Wd,H);ctx.textAlign='left';ctx.textBaseline='top';
  if(s===0){const L=W.scene==='balloon'?[['H','hydrogen','1'],['He','helium','2']]:[['air','air (oxygen)','2,6'],['Ar','argon','2,8,8']];
   L.forEach(([g,nm,cf],i)=>{const cx=Wd*(i?.72:.28),cy=H*.36,done=W.trials.has(W.scene+g),act=W.gas===g;ctx.fillStyle=C.tx;ctx.font=`800 ${nar?13:15}px system-ui`;ctx.textAlign='center';ctx.fillText(`${nm}: ${cf}`,cx,10);
    meter(cx-(nar?50:70),32,nar?100:140,g==='H'?1:g==='He'?2:g==='air'?8:18);
    if(W.scene==='balloon'){const gone=act&&g==='H'&&W.pop;if(!gone){ctx.fillStyle=g==='H'?'#93c5fd':'#f9a8d4';ctx.beginPath();ctx.ellipse(cx,cy+20,nar?34:44,nar?44:56,0,0,7);ctx.fill();ctx.strokeStyle=C.tx;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy+(nar?64:76));ctx.quadraticCurveTo(cx+10,cy+110,cx,cy+140);ctx.stroke()}
     else{ctx.fillStyle=C.am;ctx.font='900 22px system-ui';ctx.fillText('POP!',cx,cy+10)}}
    else{const r=nar?40:52,lit=act&&W.glow,br=act&&g==='air'?W.burnt:0;ctx.fillStyle=lit?A.alpha('#fde047',.35*(1-br)+.05):A.alpha(C.tx,.06);ctx.beginPath();ctx.arc(cx,cy+20,r,0,7);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.5);ctx.lineWidth=1.5;ctx.stroke();
     ctx.fillStyle=A.alpha(C.tx,.4);ctx.fillRect(cx-14,cy+20+r-4,28,22);ctx.strokeStyle=lit&&br<.6?'#f59e0b':C.mu;ctx.lineWidth=lit?3:2;ctx.beginPath();ctx.moveTo(cx-14,cy+20+r-4);ctx.lineTo(cx-8,cy+6);
     if(br<.6){ctx.lineTo(cx,cy-4);ctx.lineTo(cx+8,cy+6)}else{ctx.lineTo(cx-4,cy);ctx.moveTo(cx+4,cy);ctx.lineTo(cx+8,cy+6)}ctx.lineTo(cx+14,cy+20+r-4);ctx.stroke()}
    ctx.fillStyle=done?C.gr:C.mu;ctx.font='700 12px system-ui';ctx.fillText(done?'✓ tested':'not tested',cx,cy+146);hot.push({k:'gas',g,x:cx-70,y:cy-60,w:140,h:200})});
   const fx=W.drag&&W.drag.k==='fl'?W.drag:{x:Wd/2,y:H-22};ctx.font='26px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(W.scene==='balloon'?'🔥':'⚡',fx.x,fx.y);hot.push({k:'fl',x:Wd/2-22,y:H-44,w:44,h:44});
   ctx.fillStyle=C.mu;ctx.font='600 11px system-ui';ctx.fillText(W.scene==='balloon'?'drag the flame to a balloon':'drag the switch to a lamp',Wd/2,H-50+(nar?-4:0));A.fx.draw(ctx);return}
  if(s===1){const cols=nar?3:5,cw=(Wd-16)/cols,rows=Math.ceil(CARDS.length/cols),ch=Math.min(100,(H-16)/rows);CARDS.forEach((z,i)=>{const x=8+(i%cols)*cw,y=8+Math.floor(i/cols)*ch,m=W.marks.has(z);
    ctx.fillStyle=m?A.mix(C.pn,C.gr,.22):C.pn;P.shadow(4,2,.15);P.rrect(x+3,y+3,cw-6,ch-6,10);ctx.fill();P.noShadow();ctx.strokeStyle=m?C.gr:A.alpha(C.tx,.3);ctx.lineWidth=m?2.5:1;ctx.stroke();
    ctx.fillStyle=C.tx;ctx.textAlign='left';ctx.font=`800 ${nar?15:17}px system-ui`;ctx.fillText(EL[z],x+10,y+9);ctx.font='600 11px system-ui';ctx.fillText(cs(z),x+(nar?40:44),y+12);meter(x+10,y+34,cw-20,z,'outer shell');hot.push({k:'card',z,x,y,w:cw,h:ch})});return}
  if(s===3){const cx=Wd/2,cy=H*.46,R=Math.min(Wd,H)*.2,pos=[[0,-1],[1,0],[0,1],[-1,0]];P.ball(cx,cy,R*.42,'#374151');ctx.fillStyle='#fff';ctx.font='800 18px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('C',cx,cy);
   pos.forEach(([dx,dy],i)=>{const hx=cx+dx*R*1.9,hy=cy+dy*R*1.6,on=i<W.hc;if(on){P.ball(hx,hy,R*.3,'#e5e7eb');ctx.fillStyle='#111';ctx.font='800 14px system-ui';ctx.fillText('H',hx,hy);
     [-1,1].forEach(k=>{const mx=(cx+hx)/2-dy*k*6,my=(cy+hy)/2+dx*k*6;P.ball(mx,my,5,k<0?C.cy:C.am)})}
    else{ctx.setLineDash([3,4]);ctx.strokeStyle=A.alpha(C.am,.8);ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(hx,hy,R*.3,0,7);ctx.stroke();ctx.setLineDash([]);
     P.ball(cx+dx*R*.62,cy+dy*R*.62,5,C.cy);hot.push({k:'hs',x:hx-R*.4,y:hy-R*.4,w:R*.8,h:R*.8})}});
   ctx.fillStyle=C.tx;ctx.font='700 12px system-ui';ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText(`carbon counts ${4+W.hc} of 8`,10,H-36);ctx.fillText(`each H counts ${W.hc?'2 of 2':'–'}`,10,H-18);
   ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.textAlign='right';ctx.fillText('cyan: carbon’s · amber: hydrogen’s',Wd-10,H-18);return}
  // mover (steps 2, 4, 5)
  if(s===5&&W.blank){ctx.fillStyle=C.mu;ctx.font='800 40px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',Wd/2,H/2);return}
  const z=W.z,R=Math.min(nar?Wd*.36:Wd*.22,H*.36),ax=nar?Wd/2:Wd*.32,ay=nar?R+14:H/2,hid=s===5&&W.hide,o=atom(ax,ay,z,W.e,R,{hide:hid});W.atomBox={x:ax-R,y:ay-R,w:2*R,h:2*R};if(s===5)return;
  const px=nar?12:Wd*.6,py=nar?ay+R+16:24,q=z-W.e,m=Math.abs(q);ctx.textAlign='left';ctx.textBaseline='top';ctx.fillStyle=C.tx;ctx.font=`800 ${nar?15:18}px system-ui`;ctx.fillText(`${NAME[z]} ${EL[z]}${chg(q)?'':''}${q?` → ${EL[z]}${sup(chg(q))}`:''}`,px,py);
  ctx.font='600 13px system-ui';ctx.fillText(`${cs(z)}${W.e!==z?` → ${cs(W.e)}`:''}`,px,py+(nar?20:26));meter(px,py+(nar?40:50),nar?160:200,W.e,full(W.e)?`full, like ${NOB[W.e]} · ${m} move${m===1?'':'s'}`:`outer shell ${outer(W.e).n} of ${outer(W.e).cap} · ${m} move${m===1?'':'s'}`);
  if(s===2){ctx.font='600 11px system-ui';ctx.fillStyle=C.mu;ctx.fillText('Easy route found: '+(MOV.filter(x=>W.reached.has(x)).map(x=>EL[x]).join(', ')||'none yet'),px,py+(nar?78:92))}
  const tx=nar?Wd-70:Wd-90,ty=nar?py+4:H-80;ctx.strokeStyle=A.alpha(C.tx,.4);ctx.lineWidth=1.2;P.rrect(tx,ty,nar?60:76,nar?56:64,10);ctx.stroke();ctx.fillStyle=C.mu;ctx.font='600 10.5px system-ui';ctx.fillText('tray',tx+6,ty+4);
  P.ball(tx+(nar?30:38),ty+(nar?32:38),7,C.cy);ctx.fillStyle=C.tx;ctx.font='700 11px system-ui';ctx.fillText('e⁻',tx+(nar?40:48),ty+(nar?26:32));W.trayBox={x:tx,y:ty,w:nar?60:76,h:nar?56:64};
  if(o&&W.e>0)hot.push({k:'eout',x:o.x-14,y:o.y-14,w:28,h:28});if(W.drag&&W.drag.k!=='fl'){P.ball(W.drag.x,W.drag.y,7,C.am)}}
 // ---- steps ----
 const fresh=()=>{W.run++;W.trials=new Set();W.marks=new Set();W.reached=new Set();W.hc=0;W.drag=null;W.pop=0;W.glow=0;W.burnt=0;W.hide=false;W.blank=false;W.goal=()=>{};c.say('');if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const route=z=>{const t=near(z)[0][0];return[()=>setZ(z),...Array(Math.abs(t-z)).fill(0).map(()=>()=>move(Math.sign(t-z)))]};
 const steps=[
  {h:'Safe gases',p:'Party balloons and old filament lamps both use a noble gas. Test each gas and look at its electrons.',
   predict:{q:'Hydrogen is lighter than helium. So why are party balloons filled with helium?',opts:['Helium is lighter','Helium does not burn: its shell is full','Helium is cheaper to make'],ans:1},
   task:'Test both balloons and both lamps',show:()=>play([()=>{W.scene='balloon';sync()},()=>trial('H'),()=>trial('He'),()=>{W.scene='lamp';sync()},()=>trial('air'),()=>trial('Ar')],420),
   go:()=>{fresh();W.scene='balloon';sync();W.goal=fin(0,()=>['balloonH','balloonHe','lampair','lampAr'].every(x=>W.trials.has(x)),'The gases that did nothing, helium and argon, both have a full outer shell.')}},
  {h:'Full outer shells',p:'Each card shows the outer shell as slots. Mark every atom whose outer shell has no gaps.',
   predict:{q:'Sodium is 2,8,1. Its second shell is full. Is sodium stable like neon?',opts:['Yes: it has a full shell','No: its outer shell has 1 of 8','Only when it is a gas'],ans:1},
   task:'Mark all the atoms with a full outer shell, and only those',show:()=>play([2,10,18].filter(z=>!W.marks.has(z)).map(z=>()=>mark(z))),
   go:()=>{fresh();sync();W.goal=fin(1,()=>W.marks.size===3&&[2,10,18].every(z=>W.marks.has(z)),'Helium 2, neon 2,8 and argon 2,8,8: the noble gases. The outer shell decides.')}},
  {h:'Lose or gain?',p:'Other atoms can reach a full outer shell too. Drag an electron out to the tray, or in from the tray. Find the shortest route.',
   predict:{q:'Chlorine is 2,8,7. What is the easiest way for it to get a full outer shell?',opts:['Lose 7 electrons','Gain 1 electron','Nothing: it is nearly full'],ans:1},
   task:'Find the easy route for Na, Cl, Mg and O',show:()=>play(MOV.filter(z=>!W.reached.has(z)).flatMap(route),260),
   go:()=>{fresh();setZ(11);W.goal=fin(2,()=>MOV.every(z=>W.reached.has(z)),'Metals near the start of a row lose electrons; non-metals near the end gain them. Each ends up like a noble gas.')}},
  {h:'Or share',p:'Carbon is 2,4: four moves either way. Bring hydrogen atoms to share pairs of electrons instead.',
   predict:{q:'Carbon is 2,4. How does it usually get a full outer shell?',opts:['It loses 4 electrons','It shares electrons with other atoms','It is already stable'],ans:1},
   task:'Share until every atom has a full outer shell',show:()=>play(Array(4-W.hc).fill(0).map(()=>addH)),
   go:()=>{fresh();sync();W.goal=fin(3,()=>W.hc===4,'Sharing lets carbon count 8 and each hydrogen count 2, with no ions at all.')}},
  {h:'Sandbox',p:'Pick any atom up to calcium. Move electrons and find its noble-gas route.',go:()=>{fresh();setZ(13)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>W.goal()});
 // ---- challenge ----
 const QS=[{t:'why'},{t:'route',z:12},{t:'balloon'},{t:'full'},{t:'route',z:8},{t:'share'},{t:'route',z:19},{t:'na'},{t:'route',z:16}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];let html,opts;W.z=q.z||18;W.e=W.z;W.hide=false;W.blank=q.t==='full';
  if(q.t==='why'){html='<p><b>Why does argon hardly react at all?</b></p>';opts=[{l:'Its outer shell is full',s:'ok'},{l:'It has no electrons to use',s:'noe'},{l:'It is a heavy gas',s:'mass'}]}
  else if(q.t==='route'){const t=near(q.z)[0][0],d=t-q.z,o=outer(q.z);W.hide=true;html=`<p><b>An atom is ${cs(q.z)}. What is its easiest route to a full outer shell?</b></p>`;
   opts=[{l:`${d<0?'Lose':'Gain'} ${Math.abs(d)} electron${Math.abs(d)>1?'s':''}`,s:'ok'},{l:`${d<0?'Gain':'Lose'} ${d<0?o.cap-o.n:o.n} electron${(d<0?o.cap-o.n:o.n)>1?'s':''}`,s:'long'},{l:`${d<0?'Gain':'Lose'} ${Math.abs(d)} electron${Math.abs(d)>1?'s':''}`,s:'dir'}];q.d=d;q.o=o}
  else if(q.t==='balloon'){W.z=2;W.e=2;html='<p><b>Hydrogen is lighter than helium. Why are balloons filled with helium instead?</b></p>';opts=[{l:'Helium has a full outer shell, so it does not burn',s:'ok'},{l:'Helium is lighter than hydrogen',s:'light'},{l:'Hydrogen has a full outer shell',s:'hfull'}]}
  else if(q.t==='full'){W.z=18;W.e=18;W.hide=true;html='<p><b>Which electron arrangement has a full outer shell?</b></p>';opts=[{l:'2,8,8',s:'ok'},{l:'2,8,1',s:'inner'},{l:'2,8,7',s:'close'}]}
  else if(q.t==='share'){W.z=6;W.e=6;html='<p><b>Why does carbon, 2,4, share electrons instead of forming an ion?</b></p>';opts=[{l:'Gaining or losing 4 is too many; sharing fills its shell',s:'ok'},{l:'Its outer shell is already full',s:'cfull'},{l:'It loses 4 electrons easily',s:'lose4'}]}
  else{W.z=11;W.e=11;html='<p><b>A sodium atom, 2,8,1, loses one electron. What arrangement does it end with?</b></p>';opts=[{l:'2,8, like neon',s:'ok'},{l:'2,8,2',s:'dir'},{l:'2,8,1, unchanged',s:'same'}]}
  const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const x=c.el('button',{type:'button',class:'lbtn sm'},row,o.l);x.onclick=()=>judge(q,o)});sync()}
 function judge(q,o){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb');let m;W.hide=false;W.blank=false;
  if(q.t==='route'||q.t==='na'){const t=q.t==='na'?10:near(q.z)[0][0];W.e=t}
  if(o.s==='ok')m=q.t==='route'?`${Math.abs(q.d)} move${Math.abs(q.d)>1?'s':''} reach ${cs(near(q.z)[0][0])}, like ${NOB[near(q.z)[0][0]]}. It is ${NAME[q.z]}.`:q.t==='share'?'Four electrons is a lot to move. Sharing four pairs gives carbon 8 without making an ion.':q.t==='na'?'The lost electron was the only one in shell 3, so shell 2 becomes the outer shell: 2,8, the same as neon. Na⁺.':q.t==='balloon'?'Helium, 2, has a full shell, so it does not burn. Hydrogen, 1, is lighter but burns in air.':q.t==='full'?'2,8,8 is argon: the outer shell has 8 of 8. The others have gaps.':'A full outer shell gives the atom no reason to lose, gain or share electrons.';
  else if(o.s==='long')m=`That reaches a full shell, but the long way: ${q.d<0?q.o.cap-q.o.n:q.o.n} moves instead of ${Math.abs(q.d)}. Atoms take the shorter route.`;
  else if(o.s==='dir')m=q.t==='na'?'Losing takes an electron away, it does not add one. 2,8,1 minus 1 leaves 2,8.':`Wrong direction. With ${q.o.n} outer electrons, ${q.d<0?'losing':'gaining'} is how to reach a full shell; ${q.d<0?'gaining':'losing'} ${Math.abs(q.d)} would give ${cs(q.z-q.d)}, which is not full.`;
  else if(o.s==='noe')m='Argon has 18 electrons, 2,8,8. It has plenty; they are just already in a full arrangement.';
  else if(o.s==='mass')m='Mass has nothing to do with it. Helium is very light and is just as unreactive. The full outer shell is what they share.';
  else if(o.s==='light')m='Hydrogen is the lighter gas. Helium is chosen because it does not burn: its only shell is full, 2.';
  else if(o.s==='hfull')m='Hydrogen has 1 electron in a shell that holds 2. That half-full shell is why it reacts, and burns in air.';
  else if(o.s==='inner')m='The full 8 in 2,8,1 is an inner shell. The outer shell holds just 1, so the atom is reactive (sodium).';
  else if(o.s==='close')m='7 of 8 is close but not full. One gap makes it very reactive (chlorine).';
  else if(o.s==='cfull')m='Carbon has 4 of 8 in its outer shell: half full. It needs 4 more.';
  else if(o.s==='lose4')m='Losing 4 electrons takes far too much energy. Carbon shares them instead, as in methane.';
  else m='Losing an electron changes the arrangement. The single outer electron is gone, leaving 2,8.';
  if(o.s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Run tests, mark atoms and move electrons'},box);chal=E('div',{class:'fl-chal'},A.below);
   const inB=(p,q)=>q&&p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y&&p.y<=q.y+q.h;
   A.gest({down:p=>{const s=A.step;if(s===5)return false;if((s===2||s===4)&&inB(p,W.trayBox)){W.drag={k:'in',x:p.x,y:p.y};return true}
     if((s===2||s===4)&&W.e>0&&W.ring&&Math.abs(Math.hypot(p.x-W.ring.x,p.y-W.ring.y)-W.ring.r)<18){W.drag={k:'out',x:p.x,y:p.y};return true}
     const t=hot.find(q=>inB(p,q));if(!t)return false;if(t.k==='fl'){W.drag={k:'fl',x:p.x,y:p.y};return true}if(t.k==='eout'){W.drag={k:'out',x:p.x,y:p.y};return true}
     if(t.k==='gas')trial(t.g);else if(t.k==='card')mark(t.z);else if(t.k==='hs')addH();return false},
    move:p=>{if(W.drag){W.drag.x=p.x;W.drag.y=p.y;A.redraw()}},
    up:p=>{const d=W.drag;if(!d)return;W.drag=null;if(!p){sync();return}
     if(d.k==='fl'){const t=hot.find(q=>q.k==='gas'&&inB(p,q));if(t)trial(t.g);else{say('Drop it on one of the two.');sync()}}
     else if(d.k==='in'){if(inB(p,W.atomBox))move(1);else sync()}
     else{if(!inB(p,W.atomBox))move(-1);else sync()}}});sync()}});
 A.start()})})();
