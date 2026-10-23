/* Flagship 27 – molecular, structural and displayed formulae. One molecule, three ways of writing it, kept in step.
   The canvas shows the displayed formula (every atom, every bond). Tapping a carbon (or the O of an OH, or a Cl) draws a
   ring round that atom and the H atoms bonded to it and writes its group, such as CH₃ or CH₂, into the structural
   formula strip in chain order; branch groups go in brackets. Once every group is read, the molecular formula strip adds
   the atoms up (C first, then H, then the rest). A build step runs the other way: from CH₃CH₂CH₃ the learner adds H to
   each bare carbon until every carbon shows four bonds. Predictions target "the molecular formula is one group"
   (CH₃ for ethane), "the middle carbon of propane has 3 H", "same molecular formula means same structure", "forget the
   H on the O" and "a carbon in a displayed formula has as many lines as H". Challenge: read a displayed formula and type
   its molecular or structural formula; feedback names the slip. */
(()=>{const SUB='₀₁₂₃₄₅₆₇₈₉',dn=s=>String(s).replace(/\d/g,d=>SUB[d]),up=s=>String(s).replace(/[₀-₉]/g,ch=>SUB.indexOf(ch));
 // group grammar: "CH3", "CH2", "CH", "C", "OH", "Cl"; '=' before a group means a double bond to the previous one; br = groups on a branch
 const grp=t=>{const m=t.match(/^(=?)(C|O|Cl)(H(\d?))?$/);return{el:m[2],h:m[3]?+(m[4]||1):0,dbl:!!m[1]}};
 const make=(name,spec,branch)=>{const main=spec.split(' ').map(grp);if(branch)main[branch.at].br=grp(branch.g);return{name,main}};
 const MOLS={methane:make('Methane','CH4'),ethane:make('Ethane','CH3 CH3'),propane:make('Propane','CH3 CH2 CH3'),butane:make('Butane','CH3 CH2 CH2 CH3'),
  methylpropane:make('Methylpropane','CH3 CH CH3',{at:1,g:'CH3'}),ethanol:make('Ethanol','CH3 CH2 OH'),propene:make('Propene','CH2 =CH CH3'),
  chloroethane:make('Chloroethane','CH3 CH2 Cl'),propanol:make('Propan-1-ol','CH3 CH2 CH2 OH'),pentane:make('Pentane','CH3 CH2 CH2 CH2 CH3'),
  methylbutane:make('Methylbutane','CH3 CH CH2 CH3',{at:1,g:'CH3'})};
 const gtxt=g=>g.el+(g.h?'H'+(g.h>1?g.h:''):'');
 const structural=(m,sep='')=>m.main.map((g,i)=>(g.dbl&&i?'=':'')+gtxt(g)+(g.br?'('+gtxt(g.br)+')':'')).join(sep);
 function counts(m){const n={};const add=g=>{n[g.el]=(n[g.el]||0)+1;if(g.h)n.H=(n.H||0)+g.h};m.main.forEach(g=>{add(g);if(g.br)add(g.br)});return n}
 const hill=n=>['C','H',...Object.keys(n).filter(e=>e!=='C'&&e!=='H').sort()].filter(e=>n[e]).map(e=>e+(n[e]>1?n[e]:'')).join('');
 // parse what the learner typed: "C3H8", "CH3CH2CH3", "C₂H₆O"
 const tidy=s=>up(s).replace(/[\s\-–]/g,'');
 function tokens(s){const out=[];const re=/(Cl|C|H|O)(\d*)|([()=])/g;let m,used=0;while((m=re.exec(s))){if(m.index!==used)return null;used=re.lastIndex;if(m[1])out.push([m[1],m[2]?+m[2]:1])}return used===s.length?out:null}
 const tcount=t=>t.reduce((n,[e,k])=>(n[e]=(n[e]||0)+k,n),{});
 const same=(a,b)=>{const k=new Set([...Object.keys(a),...Object.keys(b)]);return[...k].every(e=>(a[e]||0)===(b[e]||0))};
VIS.reg('flagformula',c=>{let A,read,ctl,chal;const spots=[];
 const F={m:MOLS.ethane,got:new Set(),build:null,ask:null,pulse:0,hit:-1,chk:()=>{},run:0,pick:0,sand:0};
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 const keys=m=>{const k=[];m.main.forEach((g,i)=>{k.push(i+'');if(g.br)k.push(i+'b')});return k};
 const groupOf=(m,k)=>k.endsWith('b')?m.main[+k.slice(0,-1)].br:m.main[+k];
 const allRead=()=>keys(F.m).every(k=>F.got.has(k));
 function load(m){F.m=m;F.got=new Set();F.build=null;F.run++;F.pick=0;sync()}
 function readGroup(k){if(F.ask&&!F.ask.done){tell('In the challenge, read the drawing and type your answer.');return}if(F.build)return;
  const fresh=!F.got.has(k);F.got.add(k);F.hit=k;F.pulse=1;A.tween(F,{pulse:0},600,'out');A.sound.tick();const g=groupOf(F.m,k);
  const what=g.el==='C'?`carbon with ${g.h} H atom${g.h===1?'':'s'}`:g.el==='O'?'oxygen with 1 H atom':'chlorine atom';
  tell(`${what}: the group is ${dn(gtxt(g))}.${k.endsWith('b')?' It hangs off the chain, so it goes in brackets.':''}${allRead()?` Structural ${dn(structural(F.m))}, molecular ${dn(hill(counts(F.m)))}.`:''}`);
  if(fresh)F.chk();sync()}
 // build mode: bare carbons, learner adds H
 function startBuild(m){load(m);F.build=m.main.map(()=>0);F.pick=0;tell(`Three bare carbons joined in a chain. Tap a carbon, or use the buttons, to add H atoms.`);sync()}
 const bonds=i=>{const g=F.m.main[i];let b=(F.build?F.build[i]:g.h)+(i>0?(g.dbl?2:1):0)+(i<F.m.main.length-1?(F.m.main[i+1].dbl?2:1):0);if(g.br)b++;return b};
 function addH(i){if(!F.build)return;F.build[i]=F.build[i]>=3||bonds(i)>=4?0:F.build[i]+1;F.pick=i;A.sound.pop();
  const b=bonds(i);tell(`C${i+1} now has ${F.build[i]} H and ${b} bond${b===1?'':'s'}${b===4?': full.':b>4?': too many.':`: needs ${4-b} more.`} Its group should be ${dn(gtxt(F.m.main[i]))}.`);F.chk();sync()}
 const built=()=>F.build&&F.build.every((h,i)=>h===F.m.main[i].h);
 function play(list){const id=++F.run;let j=0;F.auto=true;const nx=()=>{if(id!==F.run)return;if(j>=list.length){F.auto=false;return}const o=list[j++];
   if(typeof o==='number'){while(F.build&&F.build[o]!==F.m.main[o].h)addH(o)}else readGroup(o);
   if(id!==F.run)return;A.tween({k:0},{k:1},450,'io',nx)};nx()}
 function describe(){const m=F.m;if(F.build)return `Building ${m.name} from ${structural(m)}. `+m.main.map((g,i)=>`C${i+1} has ${F.build[i]} H, ${bonds(i)} bonds`).join('; ')+'.';
  const hide=F.ask&&!F.ask.done;return `Displayed formula of ${hide?'a molecule':m.name}: `+m.main.map((g,i)=>`${g.el} with ${g.h} H${g.br?` and a branch ${gtxt(g.br)}`:''}`).join(', then ')+'.'+
   (hide?'':` Groups read: ${F.got.size} of ${keys(m).length}.`+(allRead()?` Structural ${structural(m)}, molecular ${hill(counts(m))}.`:''))}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(ctl){ctl.innerHTML='';const off=F.ask&&!F.ask.done;
   const b=(t,aria,f,dis)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},ctl,t);x.disabled=!!dis;x.onclick=f;return x};
   if(F.build)F.m.main.forEach((g,i)=>b(`+H on C${i+1}`,`Add a hydrogen to carbon ${i+1}`,()=>addH(i)));
   else if(!off){const ks=keys(F.m),nxt=ks.find(k=>!F.got.has(k));b('Read next group','Read the next group along the chain',()=>nxt&&readGroup(nxt),!nxt)}
   if(A.step===5){b('◀','Previous molecule',()=>flip(-1));b('▶','Next molecule',()=>flip(1))}}
  A.redraw()}
 function flip(d){const ks=Object.keys(MOLS);F.sand=(F.sand+d+ks.length)%ks.length;load(MOLS[ks[F.sand]]);tell(`${F.m.name}. Tap each group to write its formulae.`)}
 // ---- layout: main chain left to right, H atoms on free sides, branch below ----
 function layout(m){const pts=[],n=m.main.length,x0=-(n-1)/2;
  m.main.forEach((g,i)=>{const x=x0+i,me={k:i+'',el:g.el,x,y:0,hs:[]};pts.push(me);
   const free=[[0,-1],[0,1]];if(i===0)free.unshift([-1,0]);if(i===n-1)free.push([1,0]);if(g.br)free.splice(free.findIndex(f=>f[1]===1),1);
   const hn=F.build&&g.el==='C'?F.build[i]:g.h;
   const order=g.el==='C'?free:[[1,0],[0,-1],[0,1]].filter(f=>free.some(q=>q[0]===f[0]&&q[1]===f[1]));
   order.slice(0,hn).forEach(([dx,dy])=>me.hs.push({x:x+dx,y:dy}));
   if(g.br){const b={k:i+'b',el:g.br.el,x,y:2,hs:[],parent:i};[[-1,0],[1,0],[0,1]].slice(0,g.br.h).forEach(([dx,dy])=>b.hs.push({x:x+dx,y:2+dy}));pts.push(b)}});return pts}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;spots.length=0;ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.vi,.05)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  const m=F.m,pts=layout(m),all=pts.flatMap(p=>[p,...p.hs]),strip=A.narrow?92:84,xs=all.map(p=>p.x),ys=all.map(p=>p.y);
  const lo=Math.min(...xs),hi=Math.max(...xs),t=Math.min(...ys,-1),b=Math.max(...ys,1)+(F.build?.7:0),room=H-strip-34;
  const u=Math.min(A.narrow?50:66,(W-20)/(hi-lo+1),room/(b-t+1)),ox=W/2-(lo+hi)/2*u,oy=24+room/2-(t+b)/2*u,X=p=>ox+p.x*u,Y=p=>oy+p.y*u,R=Math.max(10,Math.min(17,u*.3));
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;ctx.fillText(F.build?`Build ${m.name} from its structural formula`:F.ask&&!F.ask.done?'Displayed formula: every atom and every bond':`${m.name}: displayed formula, every atom and bond`,W/2,14);
  // group halos for read groups
  pts.forEach(p=>{if(!F.got.has(p.k)||F.build)return;const ps=[p,...p.hs],x1=Math.min(...ps.map(X))-R-3,x2=Math.max(...ps.map(X))+R+3,y1=Math.min(...ps.map(Y))-R-3,y2=Math.max(...ps.map(Y))+R+3;
   const glow=F.hit===p.k?F.pulse:0;ctx.fillStyle=A.alpha(C.vi,.12+.18*glow);ctx.strokeStyle=A.alpha(C.vi,.75);ctx.lineWidth=1.5+2*glow;P.rrect(x1,y1,x2-x1,y2-y1,R);ctx.fill();ctx.stroke()});
  // bonds
  ctx.strokeStyle=C.tx;ctx.lineCap='round';const line=(a,q,o=1)=>{const dx=Y(q)-Y(a),dy=X(a)-X(q),L=Math.hypot(dx,dy)||1;ctx.lineWidth=o>1?2:2.6;(o>1?[-3.2,3.2]:[0]).forEach(s=>{ctx.beginPath();ctx.moveTo(X(a)+dx/L*s,Y(a)+dy/L*s);ctx.lineTo(X(q)+dx/L*s,Y(q)+dy/L*s);ctx.stroke()})};
  pts.forEach((p,j)=>{p.hs.forEach(h=>line(p,h));if(p.parent!=null)line(pts.find(q=>q.k===p.parent+''),p)});
  const chainPts=pts.filter(p=>p.parent==null);chainPts.forEach((p,i)=>{if(i)line(chainPts[i-1],p,m.main[i].dbl?2:1)});
  // atoms
  pts.forEach(p=>{p.hs.forEach(h=>{P.ball(X(h),Y(h),R*.72,A.mix(C.cy,'#ffffff',.6));ctx.fillStyle='#111';ctx.font=`700 ${Math.round(R*.8)}px system-ui`;ctx.fillText('H',X(h),Y(h)+.5)});
   const fill=p.el==='C'?'#3f3f46':p.el==='O'?'#dc2626':'#15803d';P.shadow(5,2,.22);P.ball(X(p),Y(p),R,fill);P.noShadow();ctx.fillStyle='#fff';ctx.font=`800 ${Math.round(R*(p.el==='Cl'?.78:.95))}px system-ui`;ctx.fillText(p.el,X(p),Y(p)+1);
   if(F.build&&p.parent==null&&p.el==='C'){const i=+p.k,bn=bonds(i);ctx.font='700 11px system-ui';ctx.fillStyle=bn===4?C.gr:bn>4?C.rd:C.am;ctx.fillText(`${bn} bond${bn===1?'':'s'}`,X(p),Y(p)+(p.hs.some(h=>h.y>0)?u+R*.72+10:R+12))}
   spots.push({x:X(p),y:Y(p),r:Math.max(R+6,18),k:p.k})});
  // formula strip
  const sy=H-strip,hide=F.ask&&!F.ask.done;ctx.fillStyle=A.alpha(C.tx,.05);P.rrect(8,sy,W-16,strip-8,12);ctx.fill();ctx.textAlign='left';
  const rowH=(strip-8)/2,big=A.narrow?16:19,lab=A.narrow?72:92;
  [['Structural',F.build?dn(structural(m)):hide?'?':m.main.map((g,i)=>{const k=i+'',sh=F.got.has(k)?(g.dbl&&i?'=':'')+dn(gtxt(g)):'··';return sh+(g.br?'('+(F.got.has(k+'b')?dn(gtxt(g.br)):'··')+')':'')}).join(allRead()?'':' ')],
   ['Molecular',hide?'?':F.build?(built()?dn(hill(counts(m))):'…'):allRead()?dn(hill(counts(m))):'read every group']].forEach(([k,v],r)=>{const y=sy+rowH*(r+.5);
   ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;ctx.fillText(k,18,y);const ph=v==='read every group'||v==='…'||v==='?';ctx.font=ph?'italic 600 13px system-ui':`800 ${v.length>18?big-3:big}px system-ui`;ctx.fillStyle=ph?C.mu:r?C.gr:C.vi;ctx.fillText(v,18+lab,y)});
  if(!F.build&&!hide&&F.got.size===0)P.label('tap a carbon to read its group',W/2,sy-14,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'})}
 // ---- steps ----
 const begin=m=>{F.chk=()=>{};F.ask=null;load(m);if(read)read.textContent=''};
 const goal=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Three ways to write it',p:'A displayed formula shows every atom and bond. A structural formula lists each carbon with its H atoms. A molecular formula just counts atoms.',
   predict:{q:'This is ethane: 2 C and 6 H. What is its molecular formula?',opts:['CH₃','C₂H₆','C₆H₂'],ans:1},
   task:'Tap each carbon to read its group',show:()=>play(['0','1']),
   go:()=>{begin(MOLS.ethane);F.chk=goal(0,allRead,'Structural CH₃CH₃: one CH₃ group per carbon. Molecular C₂H₆: add the atoms up. CH₃ is only half the molecule.')}},
  {h:'Group by group',p:'Read the chain from left to right. Each carbon and the H atoms bonded to it make one group.',
   predict:{q:'Propane is a chain of 3 carbons. How many H atoms are on the middle carbon?',opts:['3','2','4'],ans:1},
   task:'Read all three groups of propane',show:()=>play(['0','1','2']),
   go:()=>{begin(MOLS.propane);F.chk=goal(1,allRead,'CH₃CH₂CH₃. The middle carbon uses two bonds on its carbon neighbours, so only 2 are left for H. Molecular: C₃H₈.')}},
  {h:'Same count, new shape',p:'Butane and methylpropane have the same atoms. Read butane first; then methylpropane appears.',
   predict:{q:'Both are C₄H₁₀. Do they have the same structural formula?',opts:['Yes: same atoms, same formula','No: CH₃CH₂CH₂CH₃ and CH₃CH(CH₃)CH₃','Only the molecular formula differs'],ans:1},
   task:'Read every group in butane, then in methylpropane',show:()=>play(keys(F.m).filter(k=>!F.got.has(k))),
   go:()=>{begin(MOLS.butane);F.chk=()=>{if(F.m===MOLS.butane&&allRead()){const id=++F.run,auto=F.auto;F.auto=false;A.tween({k:0},{k:1},900,'io',()=>{if(id===F.run&&F.m===MOLS.butane){load(MOLS.methylpropane);tell('Now methylpropane. The carbon below the chain is a branch.');if(auto)play(keys(F.m))}})}
     if(F.m===MOLS.methylpropane&&allRead()&&A.extra.querySelector('.fl-task'))A.done('Same molecular formula, C₄H₁₀, but different structural formulae. The branch goes in brackets: CH₃CH(CH₃)CH₃.'+A.reveal(2))}}},
  {h:'Groups with other atoms',p:'Ethanol ends in an OH group: an oxygen atom with a hydrogen on it. That H counts too.',
   predict:{q:'Ethanol is CH₃CH₂OH. What is its molecular formula?',opts:['C₂H₅O','C₂H₆O','C₂H₆'],ans:1},
   task:'Read the CH₃, the CH₂ and the OH',show:()=>play(['0','1','2']),
   go:()=>{begin(MOLS.ethanol);F.chk=goal(3,allRead,'3 + 2 + 1 = 6 H, so C₂H₆O. The H in OH is easy to miss when you add up.')}},
  {h:'Back to a drawing',p:'Now go the other way. The structural formula is CH₃CH₂CH₃. Give each bare carbon the H atoms its group needs.',
   predict:{q:'In the displayed formula, how many bonds will the middle carbon have?',opts:['2, one for each H','4','3'],ans:1},
   task:'Add H until the drawing matches CH₃CH₂CH₃',show:()=>play([0,1,2]),
   go:()=>{begin(MOLS.propane);startBuild(MOLS.propane);F.chk=goal(4,built,'Every carbon now shows four bonds: CH₃ has 3 H + 1 C, CH₂ has 2 H + 2 C. That is the displayed formula of propane.')}},
  {h:'Sandbox',p:'Pick any of 11 molecules. Read the groups and watch both formulae fill in.',go:()=>{begin(MOLS.methane);F.sand=0}},
  {h:'Challenge',p:'',go:()=>{begin(MOLS.ethane);ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>F.chk()});
 // ---- challenge ----
 const QS=[['propane','s'],['butane','m'],['ethanol','m'],['methylpropane','s'],['chloroethane','m'],['propanol','s'],['methylbutane','m'],['propene','s']];let qi=-1;
 function ask(){qi=(qi+1)%QS.length;const[name,kind]=QS[qi];F.chk=()=>{};load(MOLS[name]);F.ask={kind,done:false};const what=kind==='m'?'molecular':'structural';
  chal.innerHTML=`<p><b>Write the ${what} formula of this molecule.</b> ${kind==='m'?'Count each element: C first, then H, then the rest.':'Write each group along the chain; put a branch in brackets.'} Plain digits are fine.</p><label>Formula <input type="text" class="fl-in" autocomplete="off" spellcheck="false" aria-label="${what} formula"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.fl-in').style.width='11em';chal.querySelector('.lbtn').onclick=mark;chal.querySelector('.fl-in').onkeydown=e=>{if(e.key==='Enter')mark()};sync()}
 function mark(){if(F.ask.done)return;const fb=chal.querySelector('.fl-fb'),raw=tidy(chal.querySelector('.fl-in').value),mo=F.m,want=counts(mo),mol=hill(want),str=structural(mo),tk=tokens(raw);let m;
  if(!raw||!tk){fb.textContent='Use element symbols C, H, O, Cl, digits and brackets, for example C2H6 or CH3CH3.';return}
  const n=tcount(tk),repeats=tk.length!==new Set(tk.map(t=>t[0])).size,win=F.ask.kind==='m'?raw===mol:(raw===str||raw===str.replace('=',''));
  if(win){F.ask.done=true;keys(mo).forEach(k=>F.got.add(k));sync();A.win();fb.innerHTML=`✓ ${dn(raw)}.${F.ask.kind==='s'&&str.includes('=')&&!raw.includes('=')?' Add = to show the double bond.':''} Structural ${dn(str)}, molecular ${dn(mol)}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask;return}
  A.sound.miss();const hO=mo.main.filter(g=>g.el==='O').length;
  if(F.ask.kind==='m'){
   if(same(n,want)&&repeats)m=`That has the right atoms but it is written group by group. A molecular formula gives each element once: ${dn(mol)}.`;
   else if(same(n,want))m=`Right atoms, wrong order. Write C first, then H, then other elements in A to Z order.`;
   else if(hO&&(n.C||0)===want.C&&(n.H||0)===want.H-hO)m=`You missed the H on the oxygen. The OH group has its own H atom, so add 1 more.`;
   else if((n.C||0)!==want.C)m=`Count the carbons again, including any carbon on a branch below the chain.`;
   else m=`The carbons are right. Count the H on each group in turn: ${mo.main.filter(g=>g.h).map(g=>g.h).concat(mo.main.filter(g=>g.br).map(g=>g.br.h)).join(' + ')}.${mo.main.some(g=>g.el==='Cl')?' The Cl has taken the place of one H.':''}`}
  else{
   if(same(n,want)&&!repeats)m=`That is the molecular formula. The structural formula writes each group along the chain, such as CH₃ then CH₂.`;
   else if(same(n,want)&&raw.replace(/[()]/g,'')===str.replace(/[()]/g,''))m=`The groups are right. Put the branch in brackets straight after the carbon it hangs from.`;
   else if(same(n,want))m=`The atoms add up, but the groups are not in chain order. Read the drawing from left to right.`;
   else m=`Go carbon by carbon. Each carbon's group is C plus the H atoms bonded to it: ${mo.main.map(g=>gtxt(g)).map(dn).join(', ')}.`}
  fb.innerHTML=m+' <button type="button" class="linkish fl-see">Show the answer</button>';fb.querySelector('.fl-see').onclick=()=>{F.ask.done=true;keys(mo).forEach(k=>F.got.add(k));sync();fb.innerHTML=`Structural ${dn(str)}, molecular ${dn(mol)}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;if(A.step!==6)F.ask=null;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Read or build the formula'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const s=spots.find(q=>Math.hypot(p.x-q.x,p.y-q.y)<=q.r);if(!s)return false;if(F.build){if(!s.k.endsWith('b')&&F.m.main[+s.k].el==='C')addH(+s.k)}else readGroup(s.k);return false}});sync()}});
 A.start()})})();
