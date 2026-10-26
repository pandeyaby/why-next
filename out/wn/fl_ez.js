/* Flagship – E/Z isomerism (16–18). A C=C sits on the canvas with four group slots. Twist the right-hand carbon: the
   C=C springs back because the sideways p-orbital (π) overlap would break, while a C–C spins freely. Swap groups to make
   both but-2-enes, find that but-1-ene has no pair, rank groups by Cahn–Ingold–Prelog priority (atomic number of the
   attached atom, then the next atoms on a tie), and fix a "cis means Z" slip. Sandbox: build any alkene from a palette. */
(()=>{const GR={H:['H',[1]],CH3:['CH₃',[6,1,1,1]],C2H5:['C₂H₅',[6,6,1,1]],CH2OH:['CH₂OH',[6,8,1,1]],OH:['OH',[8,1]],Cl:['Cl',[17]],Br:['Br',[35]]};
 const KEYS=Object.keys(GR),SYM={1:'H',6:'C',8:'O',17:'Cl',35:'Br'},COL={1:'#64748b',6:'#334155',8:'#b91c1c',17:'#15803d',35:'#92400e'};
 const lab=k=>GR[k][0],z=k=>GR[k][1][0],SIDE=['top left','bottom left','top right','bottom right'];
 const cmp=(a,b)=>{const x=GR[a][1],y=GR[b][1];for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return d}return 0};
 const nxt=k=>'('+GR[k][1].slice(1).map(n=>SYM[n]).join(', ')+')';
 const why=(a,b)=>z(a)!==z(b)?`${lab(a)} beats ${lab(b)}: ${SYM[z(a)]} has atomic number ${z(a)}, ${SYM[z(b)]} has ${z(b)}.`:`${lab(a)} beats ${lab(b)}: both join by C, so compare the next atoms, ${nxt(a)} against ${nxt(b)}.`;
 function verdict(M){for(const s of [0,2])if(M[s]===M[s+1])return{k:'none',t:`No E/Z: the ${s?'right':'left'} carbon has two ${lab(M[s])} groups, so swapping them gives the same molecule.`};
  const hl=cmp(M[0],M[1])>0?0:1,hr=cmp(M[2],M[3])>0?2:3,k=(hl===0)===(hr===2)?'Z':'E';
  return{k,hl,hr,t:`${k}: the higher-priority groups, ${lab(M[hl])} and ${lab(M[hr])}, are on ${k==='Z'?'the same side':'opposite sides'}.`}}
VIS.reg('flagez',c=>{let A,pad,chal,read;
 const G={M:['CH3','H','CH3','H'],bond:2,th:0,sel:null,pk:[],t1:0,t2:0,sw:[0,0],seen:new Set(),name:'',drag:null,dp:null,gen:0,check:()=>{},said:'',Q:null};
 const mode=()=>['twist','swap','swap','prio','prio','swap','build','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,u=Math.min(W,H*(N?.95:1.25));return{cx:W/2,cy:H*(mode()==='build'?(N?.47:.45):.52),d:u*.1,L:u*.2,N}}
 function pos(i){const{cx,cy,d,L}=geo(),s=i<2?-1:1,t=i%2?1:-1,k=i<2?1:Math.cos(G.th);return{x:cx+s*d+s*L*.5,y:cy+t*L*.866*k}}
 const palR=i=>{const N=A.narrow,per=N?4:7,g=6,w=(A.W-g*(per+1))/per,h=N?40:44;return{x:g+(i%per)*(w+g),y:A.H-(N?2:1)*(h+g)+Math.floor(i/per)*(h+g),w,h}};
 const hit=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 const grpAt=p=>{for(let i=0;i<4;i++){const q=pos(i);if(Math.hypot(p.x-q.x,p.y-q.y)<34)return i}return -1};
 function pill(x,X,Y,t,col,ring,badge){x.font=`700 ${A.narrow?15:17}px system-ui,sans-serif`;const w=x.measureText(t).width+20,h=32;
  x.fillStyle=col;A.paint.rrect(X-w/2,Y-h/2,w,h,14);x.fill();if(ring){x.lineWidth=4;x.strokeStyle=A.col.am;x.stroke()}
  x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.fillText(t,X,Y+1);
  if(badge){x.fillStyle=A.col.am;x.beginPath();x.arc(X+w/2,Y-h/2,11,0,7);x.fill();x.fillStyle='#000';x.font='800 13px system-ui';x.fillText('1',X+w/2,Y-h/2+1)}}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,C.vi,.05);x.fillRect(0,0,W,H);if(mode()==='quiz'&&G.Q)G.M=G.Q.M;
  const{cx,cy,d,L}=geo(),k=Math.cos(G.th),lob=L*.42;
  // p orbitals: the π bond is their sideways overlap
  if(G.bond===2)[[cx-d,1],[cx+d,k]].forEach(([X,s])=>{x.fillStyle=A.alpha(C.cy,.22);[-1,1].forEach(t=>{x.beginPath();x.ellipse(X,cy+t*lob*.6*Math.abs(s),lob*.28,lob*.6*Math.abs(s)+1,0,0,7);x.fill()})});
  x.strokeStyle=C.tx;x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(cx-d,cy);x.lineTo(cx+d,cy);x.stroke();
  if(G.bond===2){x.globalAlpha=Math.max(.08,Math.abs(k));x.beginPath();x.moveTo(cx-d*.7,cy-9);x.lineTo(cx+d*.7,cy-9);x.stroke();x.globalAlpha=1}
  for(let i=0;i<4;i++){const q=pos(i);x.lineWidth=3;x.strokeStyle=A.alpha(C.tx,.7);x.beginPath();x.moveTo(i<2?cx-d:cx+d,cy);x.lineTo(q.x,q.y);x.stroke()}
  [cx-d,cx+d].forEach(X=>A.paint.ball(X,cy,13,'#1f2937'));
  const v=verdict(G.M),showP=mode()==='prio'?G.pk:A.step===5||A.step===6?[v.hl,v.hr]:[];
  if(v.k!=='none'&&showP.length===2&&showP.every(i=>i!=null)&&Math.abs(G.th)<.05){const a=pos(showP[0]),b=pos(showP[1]);x.setLineDash([6,5]);x.strokeStyle=v.k==='Z'?C.gr:C.or;x.lineWidth=2.5;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();x.setLineDash([])}
  for(let i=0;i<4;i++){if(G.drag&&G.drag.i===i)continue;const q=pos(i);pill(x,q.x,q.y,lab(G.M[i]),COL[z(G.M[i])],G.sel===i,showP.includes(i))}
  x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=`800 ${A.narrow?15:18}px system-ui`;
  x.fillText(mode()==='quiz'?'E, Z or neither?':G.bond===1?'C–C single bond (as in butane)':G.name||'Your alkene',12,24);
  x.font=`600 ${A.narrow?13:14}px system-ui`;x.fillStyle=C.mu;
  const line=mode()==='quiz'?'Rank each carbon’s two groups, then compare sides.':G.bond===1?'Turns freely about the bond':Math.abs(G.th)>.05?`π overlap ${Math.round(Math.abs(k)*100)}%: the bond resists`:mode()==='prio'&&G.pk.filter(i=>i!=null).length<2?'Tap the higher-priority group on each carbon':A.step<3&&v.k!=='none'?`${v.k}: the matching groups are on ${v.k==='Z'?'the same side':'opposite sides'}.`:v.t;
  wrap(x,line,12,46,W-24,18);
  if(mode()==='build')KEYS.forEach((g,i)=>{const R=palR(i);x.fillStyle=A.mix(C.pn,COL[z(g)],.85);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.font='700 15px system-ui';x.fillText(lab(g),R.x+R.w/2,R.y+R.h/2+1)});
  if(G.drag&&G.dp)pill(x,G.dp.x,G.dp.y,lab(G.drag.g),COL[z(G.drag.g)],1);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function tell(m){const v=verdict(G.M),s=(m?m+' ':'')+`Left carbon: ${lab(G.M[0])} top, ${lab(G.M[1])} bottom. Right carbon: ${lab(G.M[2])} top, ${lab(G.M[3])} bottom. ${G.bond===2?'Double':'Single'} bond.${mode()==='quiz'?'':' '+v.t}`;
  G.said=s;c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function swap(s){const M=G.M;[M[s],M[s+1]]=[M[s+1],M[s]];G.sw[s/2]++;G.sel=null;A.sound.tick();const v=verdict(M);if(v.k!=='none')G.seen.add(v.k);
  tell(v.k==='none'?`Swapped: it is the same molecule turned over. ${v.t}`:`Swapped: now the ${v.k} isomer.`)}
 function setG(i,g){G.M[i]=g;G.sel=null;A.sound.pop();tell(`${lab(g)} placed ${SIDE[i]}.`)}
 function pick(i){if(mode()!=='prio')return;const s=i<2?0:2,o=s+(i===s?1:0),w=cmp(G.M[i],G.M[o])>0;
  if(!w){A.sound.miss();const m=G.M[i]==='CH3'&&z(G.M[o])>6?`Size does not decide it. ${why(G.M[o],G.M[i])}`:why(G.M[o],G.M[i]);return tell('Not that one. '+m)}
  G.pk[s/2]=i;A.sound.pop();tell(why(G.M[i],G.M[o]))}
 function twist(){if(G.busy)return;G.busy=1;if(G.bond===2){A.tween(G,{th:1.1},450,'out',()=>A.tween(G,{th:0},500,'back',()=>{G.busy=0;G.t2=1;tell('The C=C sprang back. Turning it would pull the p orbitals apart and break the π bond, about 270 kJ/mol, far more than the heat energy at room temperature.')}))}
  else A.tween(G,{th:Math.PI},700,'io',()=>{G.busy=0;G.th=0;const M=G.M;[M[2],M[3]]=[M[3],M[2]];G.t1=1;tell('The C–C turned right round: the groups swing between sides all the time, so there is only one butane.')});A.redraw()}
 function load(M,name){G.M=M.slice();G.name=name||'';G.bond=2;G.th=0;G.sel=null;G.pk=[null,null];G.sw=[0,0];G.seen=new Set();const v=verdict(G.M);if(v.k!=='none')G.seen.add(v.k);G.busy=0}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb,off)=>{const e=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(k==='twist'){b('Twist the right carbon ↻',twist);b(G.bond===2?'Switch to C–C':'Switch to C=C',()=>{G.bond=3-G.bond;G.th=0;tell(G.bond===2?'Back to a C=C double bond.':'Now a C–C single bond. Try twisting it.')})}
  if(k==='swap'||k==='build'){b('⇅ Swap left groups',()=>swap(0));b('⇅ Swap right groups',()=>swap(2))}
  if(k==='prio')[0,1,2,3].forEach(i=>b(`${i<2?'Left':'Right'}: ${lab(G.M[i])}`,()=>pick(i),`Pick ${lab(G.M[i])}, ${SIDE[i]}, as higher priority`,G.pk.includes(i)));
  if(k==='build'){b('Slot: '+(G.sel==null?'pick':SIDE[G.sel])+' ▶',()=>{G.sel=G.sel==null?0:(G.sel+1)%4;controls();A.redraw()});
   KEYS.forEach(g=>b(lab(g),()=>setG(G.sel==null?0:G.sel,g),`Put ${lab(g)} in the ${SIDE[G.sel==null?0:G.sel]} slot`))}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=(M,name)=>{G.gen++;G.check=()=>{};load(M,name)};
 const steps=[
  {h:'Try to twist it',p:'Drag the right-hand carbon up or down to twist it about the bond, or use the button. Then switch to a single bond and twist again.',
   predict:{q:'You twist one end of a C=C half a turn. What happens?',opts:['It turns freely, like C–C','It will not turn without breaking the π bond','It turns, but slowly'],ans:1},
   task:'Twist the C=C, then switch to C–C and twist that',show:()=>{G.bond=2;play([twist,()=>{G.bond=1;tell()},twist],1100)},
   go:()=>{reset(['CH3','H','CH3','H'],'But-2-ene');G.t1=G.t2=0;G.check=when(0,()=>G.t1&&G.t2,()=>'A single bond rotates freely. A C=C cannot, so groups are locked on one side or the other.')}},
  {h:'Two but-2-enes',p:'But-2-ene has a CH₃ and an H on each carbon. Swap the two groups on one carbon: drag one onto the other, tap both, or use a button.',
   predict:{q:'How many different but-2-enes are there?',opts:['1','2','4'],ans:1},task:'Make the other but-2-ene',show:()=>swap(2),
   go:()=>{reset(['CH3','H','CH3','H'],'(Z)-but-2-ene');G.check=when(1,()=>G.seen.size===2,()=>'Z (zusammen, together): CH₃ groups on the same side, boils at 4 °C. E (entgegen, opposite): boils at 1 °C. Same formula and same bonds, different shape: E/Z isomers.')}},
  {h:'But-1-ene has no pair',p:'In but-1-ene the double bond is at the end. Swap the groups on each carbon in turn.',
   predict:{q:'Swap the groups on one carbon of but-1-ene. Do you get a new isomer?',opts:['Yes, (E)-but-1-ene','No, the same molecule','Only if you twist it'],ans:1},
   task:'Swap the groups on both carbons',show:()=>play([()=>swap(0),()=>swap(2)],700),
   go:()=>{reset(['H','H','C2H5','H'],'But-1-ene');G.check=when(2,()=>G.sw[0]&&G.sw[1],()=>'Each swap gives but-1-ene again, just turned over. E/Z needs two different groups on each carbon of the C=C.')}},
  {h:'Rank by atomic number',p:'E/Z uses priority rules. On each carbon, the group whose first atom has the higher atomic number wins. Tap the winner on each carbon.',
   predict:{q:'On the right carbon, which wins: CH₃ or Br?',opts:['CH₃: it is the bigger group','Br: atomic number 35 beats C at 6','Neither: no rule'],ans:1},
   task:'Tap the higher-priority group on each carbon',show:()=>play([()=>pick(0),()=>pick(3)],700),
   go:()=>{reset(['Cl','H','CH3','Br'],'2-bromo-1-chloroprop-1-ene');G.check=when(3,()=>G.pk[0]!=null&&G.pk[1]!=null,()=>'Cl and Br win. They are on opposite sides, so this is (E)-2-bromo-1-chloroprop-1-ene.')}},
  {h:'Break a tie',p:'Both groups on the left join through a carbon. When the first atoms tie, list the atoms on the next carbon and compare from the highest.',
   predict:{q:'Left carbon: CH₃ or C₂H₅?',opts:['A tie, so no E/Z','C₂H₅: (C, H, H) beats (H, H, H)','CH₃: smaller is better'],ans:1},
   task:'Tap the higher-priority group on each carbon',show:()=>play([()=>pick(1),()=>pick(2)],700),
   go:()=>{reset(['CH3','C2H5','CH3','H'],'3-methylpent-2-ene');G.check=when(4,()=>G.pk[0]!=null&&G.pk[1]!=null,()=>'C₂H₅ wins on the left and CH₃ on the right. Opposite sides: (E)-3-methylpent-2-ene.')}},
  {h:'Z is not just cis',p:'2-bromobut-2-ene. The two CH₃ groups are on the same side. Work out the priorities and make the Z isomer.',
   predict:{q:'Both CH₃ groups are on the same side. Is this the Z isomer?',opts:['Yes: same groups on the same side','No: Br outranks CH₃, so it is E'],ans:1},
   task:'Make the Z isomer',show:()=>swap(2),
   go:()=>{reset(['CH3','Br','CH3','H'],'2-bromobut-2-ene');G.check=when(5,()=>verdict(G.M).k==='Z',()=>'Br and the right-hand CH₃ now share a side, so it is Z, even though the two CH₃ groups are now opposite. Cis/trans only works when both carbons carry the same pair.')}},
  {h:'Sandbox',p:'Build any alkene. Tap a slot then a group, or drag a group from the palette onto a slot. The lab ranks each carbon and names E, Z or neither.',go:()=>{reset(['CH2OH','H','Cl','CH3'],'')}},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 const QS=[[['CH3','H','CH3','H'],'but-2-ene'],[['CH3','H','H','CH3'],'but-2-ene'],[['H','H','C2H5','H'],'but-1-ene'],[['CH3','Br','CH3','H'],'2-bromobut-2-ene'],
  [['Cl','H','Cl','H'],'1,2-dichloroethene'],[['CH3','CH3','Cl','H'],'1-chloro-2-methylprop-1-ene'],[['CH3','C2H5','CH3','H'],'3-methylpent-2-ene'],
  [['Br','Cl','Cl','H'],'1-bromo-1,2-dichloroethene'],[['CH2OH','H','CH3','H'],'but-2-en-1-ol'],[['C2H5','H','H','CH3'],'pent-2-ene']];
 let qi=-1,run=0;const OPS=['E','Z','No E/Z isomers'];
 function ask(){qi++;const[M,nm]=QS[qi%QS.length];G.Q={M:M.slice(),nm,v:verdict(M)};G.M=G.Q.M;G.th=0;G.bond=2;
  chal.innerHTML=`<p><b>Is this ${nm} E, Z, or neither?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick'),r=qi%3;OPS.slice(r).concat(OPS.slice(0,r)).forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o).onclick=()=>judge(o)});tell('Challenge: '+nm+'.')}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const{M,v}=G.Q,fb=chal.querySelector('.fl-fb'),want=v.k==='none'?OPS[2]:v.k;let m='Right.';
  if(o!==want){const pr=[[0,2],[1,3],[0,3],[1,2]].find(([a,b])=>M[a]===M[b]),ct=pr&&(pr[0]===pr[1]-2?'Z':'E'),tie=v.k!=='none'&&(z(M[0])===z(M[1])||z(M[2])===z(M[3]));
   if(v.k==='none')m=`One carbon carries two identical groups. ${v.t}`;
   else if(o===OPS[2])m='Each carbon has two different groups, and the C=C cannot rotate, so there are two isomers.';
   else if(tie)m=`When both groups join by the same atom, go to the next atoms. ${why(M[v.hl],M[v.hl^1])}`;
   else if(ct&&o===ct)m=`Comparing the matching groups is cis/trans thinking. E/Z follows priority: ${why(M[v.hl],M[v.hl^1])}`;
   else m=`Rank by the atomic number of the attached atom, not the size of the group. ${why(M[v.hr],M[v.hr^1])}`}
  m+=` ${v.t}`;if(o===want){run++;A.win()}else{run=0;A.sound.miss()}G.Q.done=1;A.redraw();
  fb.innerHTML=`${o===want?'✓':'✗'} ${m}${o===want?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=mode();if(k==='quiz')return false;
  if(k==='twist'){if(p.x<A.W/2||G.busy)return false;G.drag={tw:1,y0:p.y};return true}
  if(k==='build'){const j=KEYS.findIndex((g,i)=>hit(p,palR(i)));if(j>=0){G.drag={g:KEYS[j]};G.dp=p;return true}}
  const i=grpAt(p);if(i<0)return false;
  if(k==='prio'){pick(i);return false}
  if(k==='build'&&G.sel==null){G.sel=i;controls();A.redraw();return false}
  if(G.sel!=null&&G.sel!==i&&(G.sel>>1)===(i>>1)){swap(i&2);return false}
  if(k==='build'&&G.sel===i){G.sel=null;controls();A.redraw();return false}
  G.sel=i;G.drag={i,g:G.M[i]};G.dp=p;A.redraw();return true}
 function move(p){const d=G.drag;if(!d)return;if(d.tw){const{L}=geo(),r=Math.abs(p.y-d.y0)/(L*1.4)*Math.PI;G.th=G.bond===2?Math.min(r,1.1):Math.min(r,Math.PI);A.redraw();return}G.dp=p;A.redraw()}
 function up(){const d=G.drag;G.drag=null;if(!d)return;
  if(d.tw){const t=G.th;if(G.bond===2){A.tween(G,{th:0},450,'back',()=>{if(t>.4){G.t2=1;tell('The C=C sprang back: twisting breaks the sideways π overlap.')}})}
   else if(t>Math.PI/2){G.th=0;const M=G.M;[M[2],M[3]]=[M[3],M[2]];G.t1=1;tell('The C–C turned: single bonds rotate freely.')}else A.tween(G,{th:0},300,'out');return}
  const j=grpAt(G.dp);if(d.i==null){if(j>=0)setG(j,d.g);else if(G.sel!=null&&G.dp.y>palR(0).y-8)setG(G.sel,d.g);A.redraw();return}
  if(j>=0&&j!==d.i&&(j>>1)===(d.i>>1))swap(d.i&2);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{const q=A.step===7;chal.hidden=!q;read.hidden=q;pad.hidden=q;controls()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Alkene controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
 A.start()})})();
