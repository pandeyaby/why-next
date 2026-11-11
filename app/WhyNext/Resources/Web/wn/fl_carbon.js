/* Flagship 25 – why carbon forms so many compounds. A carbon skeleton builder on a square grid, the way displayed formulae
   are drawn: every carbon has exactly four bond slots (up, down, left, right). Tap a ghost ＋ next to a carbon, or use the
   Attach buttons, to bond a new carbon there. Free slots show as dashed stubs; Fill with H puts a hydrogen on each one and
   the formula updates. The learner builds a chain, then a branch with the same formula (an isomer), closes a six-carbon
   ring (two fewer H) and compares neon, oxygen, nitrogen and carbon by their bond slots. A counter shows how many
   different alkanes share the formula. Predictions target "carbon makes 8 bonds", "3 carbons need 12 H", "C₄H₁₀ is one
   compound", "a ring has the same H count" and "neon can bond 8 times". Challenge: count the H atoms that complete a
   skeleton; feedback names the slip (4 H per carbon, 2 H per carbon, the open-chain count for a ring). */
(()=>{const DIRS=[[0,-1,'up'],[1,0,'right'],[0,1,'down'],[-1,0,'left']];
 const ISO=[0,1,1,1,2,3,5,9,18];   // structural isomers of the alkane CnH2n+2, n = 1..8 (OEIS A000602)
 const SUBS='₀₁₂₃₄₅₆₇₈₉',sub=n=>String(n).replace(/\d/g,d=>SUBS[d]);
 const ELEM={C:{outer:4,bonds:4,shells:'2,4'},N:{outer:5,bonds:3,shells:'2,5'},O:{outer:6,bonds:2,shells:'2,6'},Ne:{outer:8,bonds:0,shells:'2,8'}};
VIS.reg('flagcarbon',c=>{let A,ctl,read,sand,chal;const hit=[];
 // atoms: {x,y} grid cells (or ring angles); bonds: index pairs
 const st={el:'C',atoms:[{x:0,y:0}],bonds:[],ring:null,fill:false,pick:0,seen:{},lock:false,showing:false,chk:()=>{},won:false,run:0,glow:0,max:8,endTap:null};
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 const deg=i=>st.bonds.filter(b=>b[0]===i||b[1]===i).length;
 const nC=()=>st.el==='C'?st.atoms.length:0;
 const hCount=()=>st.el!=='C'?ELEM[st.el].bonds:st.atoms.reduce((s,_,i)=>s+4-deg(i),0);
 const formula=()=>st.el!=='C'?{O:'H₂O',N:'NH₃',Ne:'Ne'}[st.el]:'C'+(nC()>1?sub(nC()):'')+'H'+sub(hCount());
 const at=(x,y)=>st.atoms.findIndex(a=>a.x===x&&a.y===y);
 const branched=()=>st.atoms.some((_,i)=>deg(i)>=3);
 const isRing=()=>!!st.ring&&st.bonds.length===st.atoms.length;
 // a new carbon may go in an empty cell next to exactly one carbon, so unbonded carbons never touch
 function spots(){if(st.fill||st.ring||st.el!=='C'||st.atoms.length>=st.max)return[];const out=[];
  st.atoms.forEach((a,i)=>DIRS.forEach(([dx,dy,name])=>{const x=a.x+dx,y=a.y+dy;if(Math.abs(x)>3||Math.abs(y)>2||at(x,y)>=0)return;
   const touching=DIRS.filter(([ex,ey])=>at(x+ex,y+ey)>=0).length;if(touching===1)out.push({x,y,from:i,name})}));return out}
 function load(cfg){Object.assign(st,{el:cfg.el||'C',atoms:cfg.atoms.map(a=>({...a})),bonds:cfg.bonds.map(b=>[...b]),ring:cfg.ring||null,fill:!!cfg.fill,pick:0,won:false,endTap:null});st.run++;sync()}
 function attach(s){if(st.lock&&!st.showing){tell('In the challenge, count the H atoms in your head and type the number.');return}
  st.fill=false;st.atoms.push({x:s.x,y:s.y});st.bonds.push([s.from,st.atoms.length-1]);st.pick=st.atoms.length-1;A.sound.pop();st.glow=1;A.tween(st,{glow:0},700,'out');
  const d=deg(s.from);tell(`New carbon bonded to C${s.from+1}. C${s.from+1} now bonds to ${d} carbon${d>1?'s':''}, leaving ${4-d} free. Formula ${formula()}.${branched()?' A carbon bonded to three others is a branch.':''}`);sync();st.chk()}
 function fillH(on){if(st.lock&&!st.showing)return;st.fill=on==null?!st.fill:on;A.sound.tick();
  tell(st.fill?`${hCount()} hydrogens fill the free bonds: ${formula()}.${nC()?' Every carbon now has four bonds.':''}`:'Hydrogens removed. The dashed stubs are the free bonds.');sync();st.chk()}
 function closeRing(){if(!st.ring||isRing()||(st.lock&&!st.showing))return;st.bonds.push([0,st.atoms.length-1]);A.sound.pop();
  tell(`The ends are joined: a ring of ${nC()} carbons. The new C–C bond used one free bond on each end carbon, so 2 fewer H fit: ${formula()}.`);sync();st.chk()}
 function pickEl(e){st.seen[e]=1;st.max=1;load({el:e,atoms:[{x:0,y:0}],bonds:[],fill:true});const E=ELEM[e];
  tell(`${e==='Ne'?'Neon':e==='O'?'Oxygen':e==='N'?'Nitrogen':'Carbon'}: ${E.outer} outer electrons (${E.shells}). ${E.bonds?`It shares ${E.bonds} pair${E.bonds>1?'s':''} to reach 8, so it makes ${E.bonds} bond${E.bonds>1?'s':''}.`:'Its outer shell is already full, so it makes no bonds at all.'}`);st.chk()}
 function play(list,fin){st.showing=true;let id=++st.run;let j=0;const nx=()=>{if(id!==st.run)return;if(j>=list.length){st.showing=false;st.chk();fin&&fin();return}
   const o=list[j++];if(o==='fill')fillH(true);else if(o==='ring')closeRing();else if(typeof o==='string'){pickEl(o);id=st.run;st.showing=true}else{const s=spots().find(q=>q.x===o[0]&&q.y===o[1]);if(s)attach(s)}A.tween({k:0},{k:1},600,'io',nx)};nx()}
 function describe(){if(st.el!=='C')return `${st.el} atom with ${ELEM[st.el].outer} outer electrons and ${ELEM[st.el].bonds} bonds.`;
  const parts=st.atoms.map((_,i)=>`C${i+1} bonds to ${deg(i)} carbon${deg(i)===1?'':'s'}`);
  return `${nC()} carbon${nC()>1?'s':''}${isRing()?' in a ring':branched()?', branched':''}. ${parts.join(', ')}. ${st.fill?'Filled with hydrogen: '+formula():hCount()+' free bonds'}.`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!ctl){A.redraw();return}ctl.innerHTML='';const off=st.lock&&!st.showing;
  const btn=(t,aria,f,dis)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},ctl,t);b.disabled=!!dis||off;b.onclick=f;return b};
  if(st.el==='C'&&!st.ring&&st.atoms.length<st.max){const sp=spots(),i=Math.min(st.pick,st.atoms.length-1);
   btn('◀ C','Choose the previous carbon',()=>{st.pick=(i+st.atoms.length-1)%st.atoms.length;sync()},st.atoms.length<2);
   c.el('span',{class:'fl-tk'},ctl,'At C'+(i+1)+':');btn('▶ C','Choose the next carbon',()=>{st.pick=(i+1)%st.atoms.length;sync()},st.atoms.length<2);
   DIRS.forEach(([,,name])=>{const s=sp.find(q=>q.from===i&&q.name===name);btn('＋ '+name,`Attach a carbon to C${i+1}, ${name}`,()=>s&&attach(s),!s)})}
  if(st.ring&&!isRing())btn('Join the ends','Join the two end carbons into a ring',closeRing);
  if(st.el==='C'&&st.init&&!st.lock&&A.step!==5)btn('Start again','Start this step again',()=>{const k=st.max;load(st.init);st.max=k;tell('Back to the start of this step.')});
  if(st.el==='C')btn(st.fill?'Remove H':'Fill with H',st.fill?'Remove the hydrogens':'Put a hydrogen on every free bond',()=>fillH());
  A.redraw()}
 // ---------- drawing ----------
 function layout(A){const{W,H}=A,cell=Math.min(A.narrow?48:64,W/7.6,(H-70)/5.4),cx=W/2,cy=H*.52;
  if(st.ring){const n=st.atoms.length,R=cell*1.35;return{cell,pos:i=>{const t=-Math.PI/2+i*2*Math.PI/n;return{x:cx+R*Math.cos(t),y:cy+R*Math.sin(t),t}}}}
  return{cell,pos:i=>({x:cx+st.atoms[i].x*cell,y:cy+st.atoms[i].y*cell})}}
 function freeDirs(i,L){if(st.ring){const p=L.pos(i),k=4-deg(i),open=k>2;
   const base=p.t,sp=open?1.05:0.8;return Array.from({length:k},(_,j)=>base+(j-(k-1)/2)*sp).map(t=>[Math.cos(t),Math.sin(t)])}
  const a=st.atoms[i],nb=DIRS.filter(([dx,dy])=>{const j=at(a.x+dx,a.y+dy);return j>=0&&st.bonds.some(b=>(b[0]===i&&b[1]===j)||(b[1]===i&&b[0]===j))});
  return DIRS.filter(d=>!nb.includes(d)).map(([dx,dy])=>[dx,dy])}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;hit.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.gr,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  const L=layout(A),r=A.narrow?12:16;ctx.textAlign='center';ctx.textBaseline='middle';
  // C–C bonds
  ctx.strokeStyle=C.tx;ctx.lineWidth=3;st.bonds.forEach(([i,j])=>{const p=L.pos(i),q=L.pos(j);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()});
  // free bonds: dashed stubs, or C–H bonds with hydrogens
  st.atoms.forEach((_,i)=>{if(st.el!=='C'&&!ELEM[st.el].bonds)return;const p=L.pos(i);freeDirs(i,L).slice(0,st.el==='C'?4:ELEM[st.el].bonds).forEach(([dx,dy])=>{
   const len=(st.fill?.68:.6)*L.cell*(st.ring?1.12:1);ctx.strokeStyle=st.fill?A.alpha(C.tx,.85):C.am;ctx.lineWidth=st.fill?2:2.5;if(!st.fill)ctx.setLineDash([4,3]);
   ctx.beginPath();ctx.moveTo(p.x+dx*r,p.y+dy*r);ctx.lineTo(p.x+dx*len,p.y+dy*len);ctx.stroke();ctx.setLineDash([]);
   if(st.fill){P.ball(p.x+dx*len,p.y+dy*len,r*.62,A.mix(C.cy,'#ffffff',.55));ctx.fillStyle='#111';ctx.font=`700 ${A.narrow?11:13}px system-ui`;ctx.fillText('H',p.x+dx*len,p.y+dy*len+.5)}})});
  // ghost spots for new carbons
  spots().forEach(s=>{if(st.lock)return;const x=W/2+s.x*L.cell,y=H*.52+s.y*L.cell;ctx.strokeStyle=A.alpha(C.gr,.8);ctx.lineWidth=1.5;ctx.setLineDash([3,3]);ctx.beginPath();ctx.arc(x,y,r*.8,0,7);ctx.stroke();ctx.setLineDash([]);
   ctx.fillStyle=C.gr;ctx.font=`700 ${r}px system-ui`;ctx.fillText('+',x,y+1);hit.push({x,y,R:r+6,spot:s})});
  // atoms
  st.atoms.forEach((a,i)=>{const p=L.pos(i),col=st.el==='Ne'?C.pk:st.el==='O'?C.rd:st.el==='N'?C.ac:'#3f3f46';P.shadow(6,2,.25);P.ball(p.x,p.y,r,col);P.noShadow();
   if(i===st.pick&&ctl&&st.el==='C'&&!st.ring&&!st.lock){ctx.strokeStyle=C.am;ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,r+4,0,7);ctx.stroke()}
   ctx.fillStyle='#fff';ctx.font=`800 ${A.narrow?12:15}px system-ui`;ctx.fillText(st.el,p.x,p.y+1);hit.push({x:p.x,y:p.y,R:r+4,atom:i})});
  // header: formula, free bonds, isomer count
  ctx.textAlign='left';ctx.font=`800 ${A.narrow?20:26}px system-ui`;ctx.fillStyle=C.tx;ctx.fillText(st.lock&&!st.won?'C'+sub(nC())+'H?':formula(),14,24);
  ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;const free=hCount();
  ctx.fillText(st.el!=='C'?`${ELEM[st.el].outer} outer electrons → ${ELEM[st.el].bonds} bond${ELEM[st.el].bonds===1?'':'s'}`:st.fill?'every carbon: 4 bonds':`${free} free bond${free===1?'':'s'}`,14,46);
  if(st.el==='C'&&!st.ring&&!st.lock&&nC()>=4){ctx.textAlign='right';ctx.fillStyle=C.vi;ctx.font='700 12px system-ui';ctx.fillText(`${ISO[nC()]} different molecules are C${sub(nC())}H${sub(2*nC()+2)}`,W-12,24)}
  if(st.el==='Ne'){ctx.textAlign='center';ctx.fillStyle=C.pk;ctx.font='700 13px system-ui';ctx.fillText('full outer shell: no free bonds',W/2,H*.52+L.cell*1.1)}
  if(!st.lock&&spots().length&&st.atoms.length<3)P.label('tap a + to bond a new carbon',W/2,H-16,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
 // ---------- steps ----------
 const one={atoms:[{x:0,y:0}],bonds:[]};
 const chain=(n,y=0,x0)=>{x0=x0==null?-Math.floor((n-1)/2):x0;return{atoms:Array.from({length:n},(_,i)=>({x:x0+i,y})),bonds:Array.from({length:n-1},(_,i)=>[i,i+1])}};
 const fresh=(cfg,max=8)=>{st.init=cfg;st.max=max;st.chk=()=>{};st.lock=false;st.showing=false;load(cfg);if(read)read.textContent=''};
 const goal=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Four outer electrons, four bonds',p:'Carbon has 4 outer electrons. It shares each one with a partner to reach 8, so every carbon makes exactly four covalent bonds.',
   predict:{q:'How many covalent bonds does one carbon atom make?',opts:['2','4','8'],ans:1},
   task:'Fill the four free bonds with hydrogen',show:()=>play(['fill']),
   go:()=>{fresh(one);st.chk=goal(0,()=>st.fill,'CH₄, methane: four free bonds, four hydrogens. The 8 is the electrons around carbon once it shares, not the bonds.')}},
  {h:'Carbon bonds to carbon',p:'Carbon can use its bonds on other carbon atoms. Each C–C bond uses one bond on each of the two carbons.',
   predict:{q:'A chain of 3 carbons. How many hydrogens fit?',opts:['12','8','6'],ans:1},
   task:'Build a chain of 3 carbons, then fill with H',show:()=>play([[1,0],[2,0],'fill']),
   go:()=>{fresh({atoms:[{x:0,y:0}],bonds:[]},3);st.chk=goal(1,()=>nC()===3&&!branched()&&st.fill,'C₃H₈, propane. The end carbons have 3 H and the middle one has 2: 3 + 2 + 3 = 8, not 3 × 4 = 12.')}},
  {h:'Same atoms, new shape',p:'A fourth carbon can go on the end of the chain or on the middle carbon. Build the branched one.',
   predict:{q:'How many different molecules have the formula C₄H₁₀?',opts:['Just one','Two','Four'],ans:1},
   task:'Attach a carbon to the middle carbon, above or below',show:()=>play([[0,-1],'fill']),
   go:()=>{fresh(chain(3),4);st.pick=1;st.chk=goal(2,()=>nC()===4&&branched(),'Still C₄H₁₀, but a different shape and a different compound: methylpropane, not butane. Same formula, different structure: these are isomers.')}},
  {h:'Rings',p:'The two ends of a chain can bond to each other, closing a ring. Here are 6 carbons in a chain, C₆H₁₄.',
   predict:{q:'Join the ends into a ring. What is the formula now?',opts:['C₆H₁₄, no change','C₆H₁₂','C₆H₆'],ans:1},
   task:'Join the ends, then fill with H',show:()=>play(['ring','fill']),
   go:()=>{fresh({atoms:Array.from({length:6},()=>({})),bonds:[[0,1],[1,2],[2,3],[3,4],[4,5]],ring:6});st.chk=goal(3,()=>isRing()&&st.fill,'C₆H₁₂, cyclohexane. The ring bond used one free bond on each end carbon, so 2 hydrogens had to go.')}},
  {h:'Why not neon?',p:'Bonds come from outer electrons that still need partners. Compare four elements from period 2.',
   predict:{q:'Neon has 8 outer electrons. How many bonds does it make?',opts:['8','4','0'],ans:2},
   task:'Look at neon, oxygen, nitrogen and carbon',show:()=>play(['Ne','O','N','C'].filter(e=>!st.seen[e])),
   go:()=>{st.seen={};fresh({el:'Ne',...one,fill:true},1);st.seen.Ne=1;st.chk=goal(4,()=>['Ne','O','N','C'].every(e=>st.seen[e]),'Neon 0, oxygen 2, nitrogen 3, carbon 4. Only carbon has four bonds to spend and strong C–C bonds, so its chains can keep growing and branching.')}},
  {h:'Sandbox',p:'Build any skeleton of up to 8 carbons. Watch the count of different molecules with the same formula climb.',go:()=>fresh(one,8)},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==4&&A.step!==5;sand.querySelectorAll('[data-el]').forEach(b=>b.hidden=A.step!==4);
   sand.querySelector('.fl-clear').hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Build the carbon skeleton'},box);
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose an element or start again'},box);
   ['Ne','O','N','C'].forEach(e=>{const b=E('button',{type:'button',class:'lbtn sm ghost','data-el':e},sand,e==='Ne'?'Neon':e==='O'?'Oxygen':e==='N'?'Nitrogen':'Carbon');b.onclick=()=>pickEl(e)});
   const cl=E('button',{type:'button',class:'lbtn sm ghost fl-clear'},sand,'Start again');cl.onclick=()=>{st.max=8;load(one);tell('One carbon, four free bonds.')};
   chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const h=hit.find(q=>Math.hypot(p.x-q.x,p.y-q.y)<=q.R);if(!h)return false;
     if(h.spot)attach(h.spot);else if(h.atom!=null){if(st.ring&&!isRing()){const end=h.atom===0||h.atom===st.atoms.length-1;if(end&&st.endTap!=null&&st.endTap!==h.atom)closeRing();else if(end){st.endTap=h.atom;tell('Now tap the other end carbon.')}}
      else if(st.el==='Ne')tell('Neon has a full outer shell. Nothing can bond to it.');else{st.pick=h.atom;sync()}}return false}});
   sync()}});
 // ---------- challenge: how many H complete this skeleton? ----------
 const T=(name,cfg)=>({name,cfg});
 const CH=[T('butane',chain(4)),T('methylpropane',{atoms:[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:-1}],bonds:[[0,1],[1,2],[1,3]]}),T('a ring of 5',{atoms:Array.from({length:5},()=>({})),bonds:[[0,1],[1,2],[2,3],[3,4],[4,0]],ring:5}),
  T('pentane',chain(5)),T('dimethylpropane',{atoms:[{x:0,y:0},{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1}],bonds:[[0,1],[0,2],[0,3],[0,4]]}),T('a ring of 6',{atoms:Array.from({length:6},()=>({})),bonds:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],ring:6}),
  T('methylpentane',{atoms:[{x:-2,y:0},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:-1,y:1}],bonds:[[0,1],[1,2],[2,3],[3,4],[1,5]]})];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;st.chk=()=>{};st.lock=true;st.showing=false;load(CH[qi].cfg);if(read)read.textContent='';
  chal.innerHTML=`<p><b>How many hydrogen atoms complete this skeleton of ${nC()} carbons?</b> Every carbon needs four bonds.</p><label>Hydrogens <input type="text" inputmode="numeric" class="fl-in" autocomplete="off" aria-label="number of hydrogen atoms"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge;chal.querySelector('.fl-in').onkeydown=e=>{if(e.key==='Enter')judge()};sync()}
 function judge(){const fb=chal.querySelector('.fl-fb');if(st.won)return;const v=Number(chal.querySelector('.fl-in').value.trim()),n=nC(),want=hCount(),b=st.bonds.length;let m;
  if(!chal.querySelector('.fl-in').value.trim()||!Number.isInteger(v)){fb.textContent='Type a whole number of hydrogen atoms.';return}
  const reveal=()=>{st.showing=true;fillH(true);st.showing=false};
  if(v===want){st.won=true;reveal();fb.innerHTML=`✓ C${sub(n)}H${sub(want)}: ${4*n} bonds on ${n} carbons, minus 2 for each of the ${b} C–C bonds. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();
  if(v===4*n)m=`You gave every carbon four H. But each C–C bond uses up one bond on both its carbons, so take 2 away for each of the ${b} C–C bonds.`;
  else if(isRing()&&v===2*n+2)m=`That is the count for an open chain of ${n}. A ring has one extra C–C bond and no end carbons, so it carries 2 fewer H.`;
  else if(!isRing()&&v===2*n)m=`You gave every carbon 2 H. The end carbons have only one carbon neighbour, so each of them carries 3 H.`;
  else m=`Count each carbon's free bonds: 4 minus the number of carbons it touches. One carbon neighbour leaves 3 H, two leave 2, three leave 1.`;
  fb.innerHTML=m+' <button type="button" class="linkish fl-work">Fill to check</button>';fb.querySelector('.fl-work').onclick=()=>{st.won=true;reveal();fb.innerHTML=`Filled: C${sub(n)}H${sub(want)}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal}}
 A.start()})})();
