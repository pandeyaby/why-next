/* Flagship – electron sub-shells and orbitals (16–18). An energy-ordered box diagram (1s, 2s, 2p, 3s, 3p, 4s, 3d) where every
   box is one orbital. Tap a box to drop in a spin-up, then a spin-down electron (a third tap empties it). The lab never blocks a
   bad fill: it flags an Aufbau slip (a higher sub-shell used while a lower one has room) or a Hund slip (pairing in p while a
   p box is empty), writes the configuration live (1s² 2s² 2p²) and names the element. An inset draws the orbital shape:
   s is a sphere, each p is a dumbbell along x, y or z. Then 4s fills before 3d, and the shells 2, 8, 8 split into sub-shells. */
(()=>{const SS=[['1s',1],['2s',1],['2p',3],['3s',1],['3p',3],['4s',1],['3d',5]],BOX=[];SS.forEach(([n,k],s)=>{for(let j=0;j<k;j++)BOX.push({s,j})});
 const EL=['','hydrogen','helium','lithium','beryllium','boron','carbon','nitrogen','oxygen','fluorine','neon','sodium','magnesium','aluminium','silicon','phosphorus','sulfur','chlorine','argon','potassium','calcium'];
 const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=n=>String(n).split('').map(d=>SUP[d]).join(''),cap=s=>SS[s][1]*2;
 const fill=(Z,o={})=>{const e=BOX.map(()=>0),ord=o.d?[0,1,2,3,4,6,5]:[0,1,2,3,4,5,6];let left=Z;
  for(const s of ord){const ix=BOX.map((b,i)=>b.s===s?i:-1).filter(i=>i>=0),c=Math.min(left,o.p2&&SS[s][0][1]==='p'?2:cap(s));left-=c;
   for(let k=0;k<c;k++)e[ix[k%ix.length]]++}return e};
 const inS=(e,s)=>BOX.reduce((t,b,i)=>t+(b.s===s?e[i]:0),0),tot=e=>e.reduce((a,b)=>a+b,0);
 const cfg=(e,o)=>{const ord=o&&o.d?[0,1,2,3,4,6,5]:[0,1,2,3,4,5,6];return ord.filter(s=>inS(e,s)).map(s=>SS[s][0]+sup(inS(e,s))).join(' ')||'(empty)'};
 const unp=e=>e.filter(x=>x===1).length;
 function rules(e){for(let s=1;s<SS.length;s++)if(inS(e,s))for(let r=0;r<s;r++)if(inS(e,r)<cap(r))return{k:'aufbau',s,r,t:`Aufbau slip: ${SS[s][0]} is in use while ${SS[r][0]}, lower in energy, still has room.`};
  for(let s=0;s<SS.length;s++){const v=BOX.map((b,i)=>b.s===s?e[i]:-1).filter(x=>x>=0);if(v.includes(2)&&v.includes(0))return{k:'hund',s,t:`Hund slip: an electron is paired in ${SS[s][0]} while a ${SS[s][0]} orbital is empty. Spread out first.`}}
  return null}
VIS.reg('flagorb',c=>{let A,pad,chal,read;
 const G={e:BOX.map(()=>0),view:-1,sel:0,seen:{s:0,p:0},check:()=>{},gen:0,Q:null,lock:0};
 const mode=()=>['view','build','build','build','build','build','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?78:70,rh=(H-top-14)/7,b=Math.min(rh-8,N?30:36,W/13);return{W,H,N,top,rh,b,x0:N?62:74,sx:N?W*.75:W*.76,sy:top+(H-top)*.32,R:Math.min(W*(N?.17:.16),(H-top)*.26)}}
 function boxR(i){const g=geo(),{s,j}=BOX[i];return{x:g.x0+j*(g.b+5),y:g.H-14-(s+1)*g.rh+(g.rh-g.b)/2,w:g.b,h:g.b}}
 const hitBox=p=>BOX.findIndex((_,i)=>{const r=boxR(i);return p.x>r.x-3&&p.x<r.x+r.w+3&&p.y>r.y-3&&p.y<r.y+r.h+3});
 function name(e){const z=tot(e),g=fill(z),gs=g.every((x,i)=>x===e[i]);return z===0?'No electrons yet':`${z} electron${z>1?'s':''}: ${z<=20?EL[z]:'beyond calcium'}${gs?' (ground state)':', not its ground state'}`}
 function arrow(x,X,Y,h,up,col){x.strokeStyle=col;x.fillStyle=col;x.lineWidth=2.4;x.beginPath();x.moveTo(X,Y+h/2);x.lineTo(X,Y-h/2);x.stroke();x.beginPath();
  const t=up?Y-h/2:Y+h/2,d=up?1:-1;x.moveTo(X,t-d*1);x.lineTo(X-5,t+d*7);x.lineTo(X+5,t+d*7);x.closePath();x.fill()}
 function shape(x,g,C){if(G.view<0)return;const{s,j}=BOX[G.view],nm=SS[s][0],n=+nm[0],t=nm[1],R=g.R*(.62+n*.13),X=g.sx,Y=g.sy;
  x.save();x.translate(X,Y);x.strokeStyle=A.alpha(C.mu,.5);x.lineWidth=1;x.beginPath();x.moveTo(-g.R*1.2,0);x.lineTo(g.R*1.2,0);x.moveTo(0,-g.R*1.2);x.lineTo(0,g.R*1.2);x.stroke();
  if(t==='s'){x.fillStyle=A.paint.rad(-R*.3,-R*.3,R*.1,R,[[0,A.alpha(C.cy,.85)],[1,A.alpha(C.cy,.25)]]);x.beginPath();x.arc(0,0,R*.8,0,7);x.fill()}
  else{const ax=t==='p'?3:5;for(let k=0;k<ax;k++){const a=t==='p'?[0,Math.PI/2,Math.PI/4][k]:k*Math.PI/5,on=k===j,cl=on?C.or:A.alpha(C.mu,.35);x.save();x.rotate(a);if(t==='p'&&k===2)x.scale(1,.55);
   x.fillStyle=on?A.alpha(C.or,.8):A.alpha(C.mu,.18);[-1,1].forEach(q=>{x.beginPath();x.ellipse(q*R*.45,0,R*.45,R*.22,0,0,7);x.fill()});x.strokeStyle=cl;x.lineWidth=on?2:1;[-1,1].forEach(q=>{x.beginPath();x.ellipse(q*R*.45,0,R*.45,R*.22,0,0,7);x.stroke()});x.restore()}}
  A.paint.ball(0,0,4,C.tx);x.restore();x.font=`700 ${g.N?13:14}px system-ui`;x.textAlign='center';x.fillStyle=C.tx;
  x.fillText(t==='s'?`${nm}: a sphere`:t==='p'?`${nm}${'xyz'[j]}: a dumbbell`:`${nm}: one of five`,X,Y+g.R*1.35);x.fillStyle=C.mu;x.font=`600 ${g.N?12:13}px system-ui`;
  x.fillText(t==='s'?'holds 2':t==='p'?'3 of these: 6 in all':'5 of these: 10',X,Y+g.R*1.35+17)}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),e=G.e,bad=mode()==='quiz'?null:rules(e);x.fillStyle=A.mix(C.pn,C.cy,.05);x.fillRect(0,0,g.W,g.H);
  x.strokeStyle=A.alpha(C.mu,.7);x.lineWidth=2;x.beginPath();x.moveTo(22,g.H-16);x.lineTo(22,g.top+6);x.stroke();x.beginPath();x.moveTo(22,g.top);x.lineTo(17,g.top+10);x.lineTo(27,g.top+10);x.closePath();x.fillStyle=x.strokeStyle;x.fill();
  x.save();x.translate(9,g.top+48);x.rotate(-Math.PI/2);x.font='600 12px system-ui';x.fillStyle=C.mu;x.textAlign='right';x.textBaseline='top';x.fillText('Energy',0,0);x.restore();
  SS.forEach(([nm],s)=>{const r=boxR(BOX.findIndex(b=>b.s===s)),full=inS(e,s)===cap(s);x.font=`700 ${g.N?14:15}px system-ui`;x.textAlign='right';x.textBaseline='middle';
   x.fillStyle=bad&&(bad.s===s||bad.r===s)?C.rd:full?C.gr:C.tx;x.fillText(nm,g.x0-8,r.y+r.h/2)});
  BOX.forEach((b,i)=>{const r=boxR(i),n=e[i],hb=bad&&bad.k==='hund'&&bad.s===b.s&&n!==1;x.fillStyle=n?A.mix(C.pn,C.cy,.18):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,6);x.fill();
   x.lineWidth=hb?3:i===G.sel&&mode()==='build'?3:1.5;x.strokeStyle=hb?C.rd:i===G.sel&&mode()==='build'?C.am:i===G.view?C.or:A.alpha(C.tx,.55);x.stroke();
   if(n>0)arrow(x,r.x+r.w*(n>1?.32:.5),r.y+r.h/2,r.h*.62,1,C.tx);if(n>1)arrow(x,r.x+r.w*.68,r.y+r.h/2,r.h*.62,0,C.tx)});
  shape(x,g,C);x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=`800 ${g.N?15:18}px system-ui`;
  x.fillText(mode()==='quiz'?(G.Q?G.Q.title:''):cfg(e),12,24);x.font=`600 ${g.N?13:14}px system-ui`;x.fillStyle=bad?C.rd:C.mu;
  wrap(x,mode()==='quiz'?'Pick your answer below.':bad?bad.t:mode()==='view'?'Tap any box to see that orbital’s shape.':name(e),12,46,g.W-24,17);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 const bn=i=>{const{s,j}=BOX[i];return SS[s][0]+(SS[s][1]>1?' box '+(j+1):'')};
 function tell(m){const e=G.e,b=rules(e),s=(m?m+' ':'')+(mode()==='quiz'?'':`Configuration ${cfg(e)}. ${name(e)}. ${unp(e)} unpaired. ${b?b.t:''}`);
  c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function view(i){G.view=i;const t=SS[BOX[i].s][0][1];if(t==='s')G.seen.s=1;if(t==='p')G.seen.p=1;A.sound.tick();tell(`Showing ${bn(i)}.`)}
 function tap(i){if(G.lock)return;G.sel=i;G.e[i]=(G.e[i]+1)%3;G.view=i;const n=G.e[i];n?A.sound.pop():A.sound.tick();
  tell(n===1?`Spin-up electron in ${bn(i)}.`:n===2?`${bn(i)} now holds a pair, opposite spins. It is full: an orbital holds two.`:`${bn(i)} emptied.`)}
 function next(){const z=tot(G.e);if(z>=20)return tell('Calcium is the last element here.');G.e=fill(z+1);G.view=G.e.findIndex((x,i)=>x!==fill(z)[i]);A.sound.pop();tell(`Electron ${z+1} added at the lowest free energy.`)}
 function back(){const z=tot(G.e);if(!z)return;G.e=fill(z-1);A.sound.tick();tell(`Back to ${z-1} electrons.`)}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t);x.onclick=f};
  if(k==='view')[0,1,2,3,4].forEach(i=>b('Show '+bn(i),()=>view(i)));
  if(k==='build'){b('◀',()=>{G.sel=(G.sel+BOX.length-1)%BOX.length;tell('Selected '+bn(G.sel)+'.')},'Previous box');b('Box: '+bn(G.sel),()=>tap(G.sel),'Add an electron to '+bn(G.sel)+' (third press empties it)');
   b('▶',()=>{G.sel=(G.sel+1)%BOX.length;tell('Selected '+bn(G.sel)+'.')},'Next box');b('Empty all',()=>{G.e=BOX.map(()=>0);tell('All boxes empty.')});
   if(A.step>=3){b('+1 electron by the rules',next);b('−1 electron',back)}}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const same=Z=>tot(G.e)===Z&&fill(Z).every((x,i)=>x===G.e[i]);
 const reset=(Z,sel)=>{G.gen++;G.check=()=>{};G.e=fill(Z);G.sel=sel||0;G.view=-1;G.lock=0};
 const tapTo=Z=>{const tg=fill(Z),fs=[];BOX.forEach((_,i)=>{for(let k=G.e[i];k<tg[i];k++)fs.push(()=>tap(i))});return fs};
 const steps=[
  {h:'Orbitals have shapes',p:'Each box is one orbital: a region where an electron is likely to be found. Tap boxes, or use the buttons, to see their shapes.',
   predict:{q:'How many electrons can one orbital hold?',opts:['8, like a shell','2, with opposite spins','Any number'],ans:1},
   task:'Look at an s orbital and a p orbital',show:()=>play([()=>view(1),()=>view(3)],700),
   go:()=>{reset(0);G.seen={s:0,p:0};G.check=when(0,()=>G.seen.s&&G.seen.p,()=>'An s orbital is a sphere. A p sub-shell has three dumbbells at right angles. Any one orbital holds at most 2 electrons.')}},
  {h:'Build carbon',p:'Fill from the bottom: the lowest energy first. Carbon has 6 electrons. Tap boxes to place them; tapping a box twice makes a pair.',
   predict:{q:'Where do carbon’s last two electrons go?',opts:['Paired in one 2p box','One each in two 2p boxes','Into 3s'],ans:1},
   task:'Build the ground state of carbon',show:()=>play(tapTo(6),260),
   go:()=>{reset(0);G.check=when(1,()=>same(6),()=>'1s² 2s² 2p²: two 2p electrons in separate boxes with parallel spins. Electrons repel, so they spread out before they pair (Hund’s rule).')}},
  {h:'Nitrogen and oxygen',p:'Add the 7th electron for nitrogen, then the 8th for oxygen. Watch the unpaired count in the description.',
   predict:{q:'How many unpaired electrons does nitrogen have?',opts:['1','3','5'],ans:1},
   task:'Build nitrogen, then oxygen',show:()=>play([()=>tap(4),()=>tap(2)],700),
   go:()=>{reset(6,4);G.n7=0;G.check=when(2,()=>{if(same(7))G.n7=1;return G.n7&&same(8)},()=>'Nitrogen 2p³ has three unpaired electrons, one per box. Oxygen 2p⁴ must pair one, leaving two unpaired.')}},
  {h:'4s before 3d',p:'Argon is loaded: 1s² 2s² 2p⁶ 3s² 3p⁶. Potassium has one more electron. Place it.',
   predict:{q:'Where does potassium’s 19th electron go?',opts:['3d: shell 3 still has room','4s: it is lower in energy than 3d','3p'],ans:1},
   task:'Build potassium',show:()=>play([()=>tap(9)],300),
   go:()=>{reset(18,9);G.check=when(3,()=>same(19),()=>'4s fills before 3d for potassium and calcium, so their outer electrons are in shell 4. That is why shell 3 stops at 8 here.')}},
  {h:'Shells split into sub-shells',p:'The shell model gave 2, 8, 7 for chlorine. Neon is loaded. Build chlorine and match each shell to its sub-shells.',
   predict:{q:'Shell 2 holds 8 electrons. Which sub-shells make it up?',opts:['2s² 2p⁶','2s⁸','2p⁸'],ans:0},
   task:'Build chlorine',show:()=>play([0,0,0,0,0,0,0].map(()=>next),220),
   go:()=>{reset(10,7);G.check=when(4,()=>same(17),()=>'Chlorine is 1s² 2s² 2p⁶ 3s² 3p⁵. Shell 1 = 1s² (2). Shell 2 = 2s² 2p⁶ (8). Shell 3 = 3s² 3p⁵ (7). Sub-shells refine the 2, 8, 7 picture.')}},
  {h:'Sandbox',p:'Build any of the first 20 elements. The lab writes the configuration, names the element and flags Aufbau and Hund slips.',go:()=>{reset(0)}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 const QS=[[7,'c'],[16,'u'],[19,'c'],[7,'u'],[13,'c'],[8,'u'],[20,'c'],[15,'u'],[17,'c'],[14,'u'],[11,'c'],[6,'u']];
 let qi=-1,run=0;
 function ask(){qi++;const[Z,k]=QS[qi%QS.length];G.e=BOX.map(()=>0);G.view=-1;G.lock=1;let opts;
  if(k==='c'){const good=cfg(fill(Z)),ds=[];if(Z>=19)ds.push([cfg(fill(Z,{d:1}),{d:1}),'d']);ds.push([cfg(fill(Z,{p2:1})),'p2']);ds.push([cfg(fill(Z-1)),'n']);
   opts=[[good,'ok']].concat(ds.slice(0,2));G.Q={Z,k,title:`Ground state of ${EL[Z]} (Z = ${Z})?`}}
  else{const u=unp(fill(Z)),sh=Z>10?'3p':'2p',n=inS(fill(Z),Z>10?4:2),pf=Math.max(0,n%2);opts=[[String(u),'ok'],[String(pf),'pair'],[String(n),'all']].filter((o,i,a)=>a.findIndex(z=>z[0]===o[0])===i);
   for(const v of ['0','1','2','3'])if(opts.length<3&&!opts.some(z=>z[0]===v))opts.push([v,'pair']);G.Q={Z,k,sh,n,title:`Unpaired electrons in ${EL[Z]} (${sh}${sup(n)})?`}}
  const r=qi%opts.length;opts=opts.slice(r).concat(opts.slice(0,r));G.Q.opts=opts;
  chal.innerHTML=`<p><b>${G.Q.title}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+G.Q.title)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const Q=G.Q,fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='d')m='3d is higher in energy than 4s, so for potassium and calcium 4s fills first.';
  else if(o[1]==='p2')m='A p sub-shell has three orbitals, so it holds 6, not 2. Only s stops at 2.';
  else if(o[1]==='n')m=`Count the superscripts: they must add up to the atomic number, ${Q.Z}.`;
  else if(o[1]==='pair')m=`Hund’s rule: in ${Q.sh}, electrons take one box each, with parallel spins, before any pair forms.`;
  else if(o[1]==='all')m=`Not every electron is unpaired: ${Q.sh} has three boxes, so beyond 3 they must pair.`;
  G.e=fill(Q.Z);G.view=-1;const ans=Q.k==='c'?`Answer: ${cfg(G.e)}.`:`${Q.sh}${sup(Q.n)} spreads out one per box first: ${unp(G.e)} unpaired.`;
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.redraw();A.cv.setAttribute('aria-label',`${EL[Q.Z]}: ${cfg(G.e)}, ${unp(G.e)} unpaired.`);
  fb.innerHTML=`${ok?'✓':'✗'} ${ok?m:m+' '+ans}${ok?` ${ans} Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const i=hitBox(p);if(i<0)return false;if(mode()==='view')view(i);else if(mode()==='build')tap(i);return false}
 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;controls()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Orbital controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down});controls()}});
 A.start()})})();
