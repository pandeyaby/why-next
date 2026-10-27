/* Flagship – shapes of molecules (16–18): electron-pair regions round a central atom push apart in 3D. Squeeze a bond
   and it springs back, rotate the molecule, add bonds and lone pairs to build linear, trigonal planar, tetrahedral,
   pyramidal and bent shapes, watch lone pairs close the bond angle (109.5° → 107° → 104.5°), and count pairs from outer
   electrons. The challenge names shapes and angles with feedback on each slip. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',D=M.PI/180;
 const nz=v=>{const l=M.hypot(...v)||1;return v.map(a=>a/l)},dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
 const ang=(a,b)=>M.acos(M.max(-1,M.min(1,dot(nz(a),nz(b)))))/D;
 const ring=(n,al,lift)=>Array.from({length:n},(_,i)=>{const p=(90+i*360/n)*D;return[M.sin(al)*M.cos(p),-M.cos(al)*lift,M.sin(al)*M.sin(p)]});
 const cone=g=>M.acos(M.sqrt((2*M.cos(g*D)+1)/3));
 const SH={'2,0':['Linear',180,'BeCl₂','Be','Cl'],'3,0':['Trigonal planar',120,'BF₃','B','F'],'2,1':['Bent',119,'SO₂','S','O'],'4,0':['Tetrahedral',109.5,'CH₄','C','H'],'3,1':['Pyramidal',107,'NH₃','N','H'],'2,2':['Bent',104.5,'H₂O','O','H']};
 function geom(b,l){const k=b+','+l,h=g=>[[M.sin(g/2*D),-M.cos(g/2*D),0],[-M.sin(g/2*D),-M.cos(g/2*D),0]];
  if(k==='2,0')return[[1,0,0],[-1,0,0]];if(k==='3,0')return[0,1,2].map(i=>[M.cos((90+i*120)*D),M.sin((90+i*120)*D),0]);if(k==='2,1')return h(119).concat([[0,1,0]]);
  if(k==='4,0')return[[0,1,0]].concat(ring(3,cone(109.47),1));if(k==='3,1')return ring(3,cone(107),1).concat([[0,1,0]]);
  return h(104.5).concat([[0,M.cos(57.5*D),M.sin(57.5*D)],[0,M.cos(57.5*D),-M.sin(57.5*D)]])}
 const FLAT=[[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]],EL={P:[5,3],S:[6,2],Si:[4,4],Cl:[7,1]};
VIS.reg('flagvsepr',c=>{let A,pad,chal,read;
 const G={b:4,l:0,R:[],fr:null,to:null,tw:1,yaw:.55,pit:.3,spun:0,sq:0,held:-1,seen:{},tgt:null,okT:{},miss:'',ok:'',gen:0,check:()=>{},drag:0,Q:null};
 const mode=()=>['push','count','lone','squeeze','elec','free','quiz'][A.step];
 const key=()=>G.b+','+G.l,info=()=>SH[key()]||null;
 function setTo(list,from){G.fr=(from||G.R).map(v=>v.slice());while(G.fr.length<list.length)G.fr.push(nz([.2,-1,.3]));G.fr.length=list.length;G.to=list;G.tw=0;A.kick()}
 function reshape(b,l,quiet){const ob=G.b,old=G.R.slice(0,ob),ol=G.R.slice(ob);G.b=b;G.l=l;const fr=old.slice(0,b);while(fr.length<b)fr.push(nz([.3,-1,.2]));const fl=ol.slice(0,l);while(fl.length<l)fl.push(nz([-.2,1,.3]));
  setTo(geom(b,l),fr.concat(fl));const s=info();if(s){G.seen[key()]=1}G.miss='';G.ok='';if(!quiet){A.sound.pop();tell(s?s[0]+', '+s[1]+'°.':'')}}
 function proj(v,g){const cy=M.cos(G.yaw),sy=M.sin(G.yaw),cp=M.cos(G.pit),sp=M.sin(G.pit);let x=v[0]*cy+v[2]*sy,z=-v[0]*sy+v[2]*cy,y=v[1]*cp-z*sp;z=v[1]*sp+z*cp;const k=1+z*.12;return[g.cx+x*g.s*k,g.cy-y*g.s*k,z,k]}
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?96:76;return{W,H,N,cx:N?W/2:W*.42,cy:top+(H-top)/2,s:M.min(N?W*.34:W*.27,(H-top)/2-34)}}
 function bonds(){return G.R.slice(0,G.b)}
 function angNow(){const B=bonds();return B.length>1?ang(B[0],B[1]):0}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode(),s=info();x.fillStyle=A.mix(C.pn,C.vi,.05);x.fillRect(0,0,g.W,g.H);
  const it=G.R.map((v,i)=>({v,i,lp:i>=G.b,p:proj(v,g)})).sort((a,b)=>a.p[2]-b.p[2]),[cx,cy]=[g.cx,g.cy],cen=m==='quiz'?(G.lab||['?'])[0]:m==='elec'&&G.tgt?G.tgt[0]:s?s[3]:'X',out=m==='quiz'?(G.lab||[0,'?'])[1]:m==='elec'?'H':s?s[4]:'Y';
  const B=bonds();if(B.length>1&&m!=='elec'){const a=proj(B[0],g),b=proj(B[1],g),a1=M.atan2(a[1]-cy,a[0]-cx),a2=M.atan2(b[1]-cy,b[0]-cx);let d=a2-a1;d-=2*M.PI*M.round(d/(2*M.PI));x.strokeStyle=C.am;x.lineWidth=3;x.beginPath();x.arc(cx,cy,g.s*.42,a1,a1+d,d<0);x.stroke();
   const mid=a1+d/2;A.paint.label(r5(angNow())+'°',cx+M.cos(mid)*g.s*.62,cy+M.sin(mid)*g.s*.62,{bg:A.alpha(C.am,.92),col:'#111',font:F(800,13)})}
  const drawIt=o=>{const[px,py,z,k]=o.p,sel=o.i===G.held;if(o.lp){const L=g.s*.55*k,a=M.atan2(py-cy,px-cx),len=M.hypot(px-cx,py-cy)/g.s;x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=A.alpha(C.pk,.25+.15*(z+1)/2);x.strokeStyle=sel?C.tx:C.pk;x.lineWidth=2;x.beginPath();x.ellipse(L*.55*M.max(.35,len),0,L*.55*M.max(.35,len),15*k,0,0,7);x.fill();x.stroke();
    x.fillStyle=C.pk;[-5,5].forEach(d=>{x.beginPath();x.arc(L*.75*M.max(.35,len),d,3.5,0,7);x.fill()});x.restore()}
   else{x.strokeStyle=A.mix(C.mu,C.tx,.4);x.lineWidth=5*k;x.beginPath();x.moveTo(cx,cy);x.lineTo(px,py);x.stroke();A.paint.ball(px,py,15*k,sel?C.am:C.cy);x.fillStyle='#111';x.font=F(800,12);x.textAlign='center';x.fillText(out,px,py+4)}};
  it.filter(o=>o.p[2]<0).forEach(drawIt);A.paint.ball(cx,cy,21,C.vi);x.fillStyle='#fff';x.font=F(800,13);x.textAlign='center';x.fillText(cen,cx,cy+5);it.filter(o=>o.p[2]>=0).forEach(drawIt);
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:16);const hl=wrap(x,head(),12,22,g.W-24,g.N?18:20);x.font=F(600,12);x.fillStyle=G.miss?C.rd:G.ok?C.gr:C.mu;wrap(x,G.miss||G.ok||sub(),12,24+hl*(g.N?18:20)+3,g.W-24,15);
  const info2=[`${G.b} bonding pair${G.b>1?'s':''}, ${G.l} lone pair${G.l===1?'':'s'}`,s&&m!=='elec'?`${s[0]} · e.g. ${s[2]}`:''];x.font=F(700,13);x.fillStyle=C.vi;if(G.R.length)info2.forEach((t,i)=>t&&x.fillText(t,12,g.H-28+i*17));
  if(m==='squeeze'){const L=[['4,0','CH₄'],['3,1','NH₃'],['2,2','H₂O']];L.forEach(([k,n],i)=>{const on=G.seen[k];x.font=F(700,12);x.fillStyle=on?C.gr:A.alpha(C.mu,.7);x.textAlign='right';x.fillText(n+': '+(on?SH[k][1]+'°':'?'),g.W-12,(g.N?g.H-80:110)+i*17)});x.textAlign='left'}
  A.fx.draw(x)}
 const r5=a=>{const v=M.round(a*2)/2;return String(v)};
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh);return n+1}
 function head(){const m=mode(),s=info();if(m==='push')return'Methane, CH₄: four bonding pairs';if(m==='count')return'Build a linear and a trigonal planar shape';if(m==='lone')return'Build NH₃: 3 bonds and 1 lone pair';
  if(m==='squeeze')return'Compare CH₄, NH₃ and H₂O';if(m==='elec')return G.tgt?`Build ${G.tgt[1]}: ${G.tgt[0]} has ${EL[G.tgt[0]][0]} outer electrons`:'Both built';if(m==='free')return s?s[0]+', '+s[1]+'°':'Pick a shape';return G.Q?G.Q.q:''}
 function sub(){const m=mode();if(m==='push')return'Drag a bond towards another and let go. Drag empty space to turn the molecule.';if(m==='elec')return'Each bond uses 1 of its outer electrons. Pair up the rest as lone pairs, then press Check.';
  if(m==='quiz')return'';return'Add or remove bonding pairs and lone pairs with the buttons. Drag to turn.'}
 function tell(msg){const s=info(),t=mode()==='quiz'&&!G.R.length?'Challenge: '+G.Q.q:(msg?msg+' ':'')+head()+'. '+G.b+' bonding pair'+(G.b===1?'':'s')+' and '+G.l+' lone pair'+(G.l===1?'':'s')+(s&&mode()!=='elec'?': '+s[0]+', bond angle '+s[1]+' degrees':'')+'. '+sub();c.say(t);A.cv.setAttribute('aria-label',t);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function elecCheck(){const t=G.tgt;if(!t)return;const[e,b]=EL[t[0]],lp=(e-b)/2;let s;if(G.b===b&&G.l===lp){G.okT[t[1]]=1;A.sound.pop();const sh=SH[key()];G.ok=`✓ ${t[1]}: ${b} bonds + ${lp} lone pair${lp>1?'s':''} → ${sh[0].toLowerCase()} (measured angle about ${t[0]==='S'?92:93.5}°).`;G.tgt=nextT();return tell(G.ok)}
  if(G.b!==b)s=`${t[1]} has ${b} hydrogen atoms, so ${t[0]} makes ${b} bonds.`;else if(G.l===e-b)s=`You made one lone pair per electron. ${e} − ${b} = ${e-b} electrons left, which is ${lp} pair${lp>1?'s':''}.`;else s=`${t[0]} has ${e} outer electrons. ${b} go into bonds, so ${e-b} are left: ${lp} lone pair${lp>1?'s':''}.`;G.miss=s;A.sound.miss();tell(s)}
 const TG=[['P','PH₃'],['S','H₂S']],nextT=()=>TG.find(t=>!G.okT[t[1]])||null;
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};if(m==='quiz')return;
  const can=(nb,nl)=>nb>=2&&nb<=4&&nl>=0&&nl<=2&&nb+nl<=4&&nb+nl>=2;
  if(m!=='push'){b('+ bond',()=>can(G.b+1,G.l)?reshape(G.b+1,G.l):bump('Four regions is the most here (an octet).'),'Add a bonding pair');b('− bond',()=>can(G.b-1,G.l)?reshape(G.b-1,G.l):bump('Keep at least two bonds so there is an angle.'),'Remove a bonding pair');
   b('+ lone pair',()=>can(G.b,G.l+1)?reshape(G.b,G.l+1):bump('Four regions is the most here (an octet).'),'Add a lone pair');b('− lone pair',()=>can(G.b,G.l-1)?reshape(G.b,G.l-1):bump('There are no lone pairs to remove.'),'Remove a lone pair')}
  if(m==='push'){b('Squeeze a bond',squeezeOnce,'Push one bond towards another, then let go');}
  b('Turn ↻',()=>spin(.5),'Turn the molecule');if(m==='elec')b('Check',elecCheck)}
 function bump(s){G.miss=s;A.sound.miss();tell(s)}
 function spin(d){G.yaw+=d;G.spun+=M.abs(d);A.sound.tick();tell('')}
 function squeezeOnce(){const v=G.R[0].slice(),w=G.R[1];G.R[0]=nz(v.map((a,i)=>a+(w[i]-a)*.7));A.redraw();setTimeout(()=>{release(0)},A.reduced()?20:450)}
 function release(i){G.held=-1;G.sq++;setTo(geom(G.b,G.l));A.sound.pop();tell('The pairs push apart again: back to '+(info()||[0,0])[1]+'°.')}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=(b,l,o)=>{G.gen++;G.check=()=>{};Object.assign(G,{spun:0,sq:0,held:-1,seen:{},tgt:null,okT:{},miss:'',ok:'',drag:0},o||{});G.b=b;G.l=l;G.R=geom(b,l);G.tw=1;G.seen[b+','+l]=1};
 const steps=[
  {h:'Pairs push apart',p:'Each bond is a pair of electrons. Pairs repel, so they spread out as far apart as they can, in 3D.',
   predict:{q:'What is the H–C–H bond angle in methane, CH₄?',opts:['90°, a flat cross','109.5°','120°'],ans:1},
   task:'Squeeze a bond, then turn the molecule',show:()=>play([squeezeOnce,()=>spin(.6),()=>spin(.6)],700),
   onPredict:()=>{setTo(geom(4,0),FLAT);A.sound.whoosh();G.check()},
   go:()=>{reset(4,0);if(A.pred[0]==null)G.R=FLAT.map(v=>v.slice());G.check=when(0,()=>G.sq>=1&&G.spun>=1,()=>'Flat would put the pairs 90° apart. In 3D they reach 109.5°: a tetrahedron.')}},
  {h:'Count regions',p:'Count regions of electrons round the central atom. A double bond is one region: its electrons point the same way.',
   predict:{q:'CO₂ is O=C=O. How many regions push apart round C?',opts:['4: count every bonding pair','2: each double bond is one region'],ans:1},
   task:'Build a linear and a trigonal planar shape',show:()=>play([()=>reshape(3,0),()=>reshape(2,0),()=>reshape(3,0)],600),
   go:()=>{reset(4,0);G.check=when(1,()=>G.seen['2,0']&&G.seen['3,0'],()=>'Two regions sit 180° apart, as in CO₂ and BeCl₂. Three spread to 120°, as in BF₃.')}},
  {h:'Lone pairs count',p:'A lone pair is a pair of electrons not in a bond. It still takes up a region, but the shape is named from the atoms only.',
   predict:{q:'NH₃ has 3 bonds and 1 lone pair. What shape is it?',opts:['Trigonal planar, like BF₃','Pyramidal'],ans:1},
   task:'Build NH₃',show:()=>play([()=>reshape(3,0),()=>reshape(3,1)],600),go:()=>{reset(3,0);G.check=when(2,()=>G.b===3&&G.l===1,()=>'4 regions make a tetrahedron, but with only 3 atoms you see a pyramid.')}},
  {h:'Lone pairs push harder',p:'A lone pair is held by one nucleus, so it sits closer and spreads wider. It pushes bonds together a little.',
   predict:{q:'H₂O has 2 bonds and 2 lone pairs. What is its bond angle?',opts:['180°: the bonds spread as far as possible','104.5°','109.5°, like CH₄'],ans:1},
   task:'Build CH₄, NH₃ and H₂O',show:()=>play([()=>reshape(4,0),()=>reshape(3,1),()=>reshape(2,2)],700),
   go:()=>{reset(4,0);G.check=when(3,()=>G.seen['4,0']&&G.seen['3,1']&&G.seen['2,2'],()=>'Each lone pair takes about 2.5° off: 109.5° → 107° → 104.5°.')}},
  {h:'From electrons to shape',p:'Count the central atom’s outer electrons. Each bond to H uses one. Pair up the rest as lone pairs.',
   predict:{q:'S has 6 outer electrons. In H₂S, how many lone pairs are on S?',opts:['None: only bonds count','2','4'],ans:1},
   task:'Build PH₃ and H₂S, pressing Check for each',show:()=>play([()=>reshape(3,1),elecCheck,()=>reshape(2,1),elecCheck,()=>reshape(2,2),elecCheck],450),
   go:()=>{reset(4,0,{tgt:TG[0]});G.check=when(4,()=>G.okT['PH₃']&&G.okT['H₂S'],()=>'P: 5 − 3 = 2 electrons, 1 lone pair. S: 6 − 2 = 4 electrons, 2 lone pairs. (Their real angles are smaller still, about 93° and 92°.)')}},
  {h:'Sandbox',p:'Try every mix of bonds and lone pairs, up to four regions. Squeeze a pair by dragging it.',go:()=>reset(2,1)},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task&&!s.onPredict)s.onPredict=()=>G.check()});
 const QZ=[['CH₄','4,0','CH',[['Tetrahedral, 109.5°','ok'],['Square planar, 90°','flat'],['Pyramidal, 107°','lpadd']]],['NH₃','3,1','NH',[['Pyramidal, 107°','ok'],['Trigonal planar, 120°','lpign'],['Pyramidal, 109.5°','squeeze']]],
  ['H₂O','2,2','OH',[['Bent, 104.5°','ok'],['Linear, 180°','lpign'],['Bent, 109.5°','squeeze']]],['CO₂','2,0','CO',[['Linear, 180°','ok'],['Tetrahedral, 109.5°','double'],['Bent, 104.5°','lpadd']]],
  ['BF₃','3,0','BF',[['Trigonal planar, 120°','ok'],['Pyramidal, 107°','lpadd'],['Tetrahedral, 109.5°','double']]],['NH₄⁺','4,0','NH',[['Tetrahedral, 109.5°','ok'],['Pyramidal, 107°','ion'],['Square planar, 90°','flat']]]];
 let qi=-1,run=0;
 function ask(){qi++;const it=QZ[qi%QZ.length];G.Q={q:`What are the shape and bond angle of ${it[0]}?`,it};const r=qi%3,o2=it[3].slice(r).concat(it[3].slice(0,r));G.b=2;G.l=0;G.R=[];G.lab=null;G.miss=G.ok='';controls();
  chal.innerHTML=`<p><b>${G.Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o2.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});c.say('Challenge: '+G.Q.q);A.cv.setAttribute('aria-label','Challenge: '+G.Q.q);A.redraw()}
 function fin(ok,m){if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m;A.cv.setAttribute('aria-label',s);const fb=chal.querySelector('.fl-fb');
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const it=G.Q.it,[b,l]=it[1].split(',').map(Number),n=it[0];let m;G.lab=[it[2][0],it[2][1]];G.R=[];G.b=0;G.l=0;reshape(b,l,1);A.redraw();
  if(o[1]==='ok')m=`Right: ${n} has ${b} bonding pair${b>1?'s':''} and ${l} lone pair${l===1?'':'s'} on the central atom.`;else if(o[1]==='flat')m='That is the flat drawing on paper. In 3D, four pairs get further apart: 109.5°.';
  else if(o[1]==='lpadd')m=`There is no lone pair on the central atom of ${n}: all its outer electrons are in bonds.`;else if(o[1]==='lpign')m=`You left out the lone pair${l>1?'s':''}. ${l} lone pair${l>1?'s':''} still take${l>1?'':'s'} up space, giving ${b+l} regions.`;
  else if(o[1]==='squeeze')m=`Right shape, but lone pairs repel more than bonds and close the angle: ${SH[it[1]][1]}°.`;else if(o[1]==='double')m='Each double bond counts as one region, so CO₂ has 2 regions and BF₃ has 3.';
  else m='NH₄⁺ uses the lone pair of NH₃ to bond a fourth H⁺, so there are 4 bonding pairs and no lone pair.';fin(o[1]==='ok',m)}
 function down(p){const m=mode(),g=geo();if(m==='quiz')return false;let best=-1,bd=34;G.R.forEach((v,i)=>{const q=proj(v,g),d=M.hypot(p.x-q[0],p.y-q[1]);if(d<bd){bd=d;best=i}});
  if(best>=0){G.held=best;G.drag={i:best,z:G.R[best]};return true}G.drag={x:p.x,y:p.y,yaw:G.yaw,pit:G.pit};return true}
 function mv(p){const d=G.drag,g=geo();if(!d)return;if(d.i!=null){const cy=M.cos(G.yaw),sy=M.sin(G.yaw),cp=M.cos(G.pit),sp=M.sin(G.pit),X=(p.x-g.cx)/g.s,Y=-(p.y-g.cy)/g.s;
   const q=proj(d.z,g),Z=q[2];const y=Y*cp+Z*sp,z0=-Y*sp+Z*cp;G.R[d.i]=nz([X*cy-z0*sy,y,X*sy+z0*cy]);A.redraw()}
  else{G.yaw=d.yaw+(p.x-d.x)*.012;G.pit=M.max(-1.2,M.min(1.2,d.pit+(p.y-d.y)*.012));A.redraw()}}
 function up(){const d=G.drag;G.drag=0;if(!d)return;if(d.i!=null)return release(d.i);const t=M.abs(G.yaw-d.yaw)+M.abs(G.pit-d.pit);G.spun+=t;if(t>.05){A.sound.tick();tell('')}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Molecule controls'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.every(dt=>{if(G.tw>=1||!G.to)return false;G.tw=M.min(1,G.tw+dt/(A.reduced()?.01:.7));const e=A.ease.out(G.tw);G.R=G.to.map((v,i)=>nz(v.map((a,j)=>G.fr[i][j]+(a-G.fr[i][j])*e)));return G.tw<1});
   A.gest({down,move:mv,up});reset(4,0);controls()}});
 A.start()})})();
