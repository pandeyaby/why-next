/* Flagship – substitution reactions of alkanes (16–18): UV splits Cl–Cl (242) not C–H (413) into Cl• radicals; Cl• takes an H
   (HCl + •CH₃), •CH₃ takes a Cl from Cl₂ and frees Cl• again (a chain); two radicals meeting end it. Every C–H can be hit, so a mixture forms. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',PR=['CH₄','CH₃Cl','CH₂Cl₂','CHCl₃','CCl₄'];
 const TP=[['Cl•','Cl•','Cl₂'],['•CH₃','Cl•','CH₃Cl'],['•CH₃','•CH₃','C₂H₆']];
 const CQ=[['Why does methane only react with chlorine in UV light?',[['UV splits Cl–Cl into Cl• radicals to start the chain','ok'],['UV splits the C–H bonds in methane','ch'],['UV heats the gas until it burns','burn']]],
  ['Which step is a propagation step?',[['CH₃• + Cl₂ → CH₃Cl + Cl•','ok'],['Cl₂ → 2Cl•','init'],['CH₃• + Cl• → CH₃Cl','term']]],
  ['Why does chlorinating methane give a mixture of products?',[['Cl• can also take H from CH₃Cl, CH₂Cl₂ and CHCl₃','ok'],['The UV light is not bright enough','uv'],['Chlorine has isotopes','iso']]],
  ['How can you make mostly CH₃Cl?',[['Use a large excess of methane','ok'],['Use a large excess of chlorine','xs'],['Do it in the dark','dark']]],
  ['Why is this reaction called substitution?',[['A Cl atom replaces an H atom on the carbon','ok'],['Cl₂ adds across a double bond','add'],['Methane breaks into smaller molecules','crack']]]];
 const FB={ch:'C–H is 413 kJ/mol; Cl–Cl is only 242. UV breaks the weaker Cl–Cl bond, making two Cl•.',burn:'It is not combustion: no O₂ and no CO₂. Light starts a radical chain.',
  init:'Cl₂ → 2Cl• makes radicals from none: that is initiation.',term:'Two radicals join and none are left: that is termination.',uv:'Brighter light makes more Cl•, but Cl• still hits any C–H, including those in CH₃Cl.',
  iso:'Isotopes do not change which products form. The radical can hit chloromethane as well as methane.',xs:'Excess chlorine pushes on to CH₂Cl₂, CHCl₃ and CCl₄.',dark:'No light, no Cl• radicals: nothing reacts at room temperature.',
  add:'Alkanes have no C=C to add across. One atom swaps for another.',crack:'That is cracking. Here the carbon keeps its place and a Cl swaps for an H.'};
VIS.reg('flagchlor',c=>{let A,pad,chal,read;
 const G={lamp:0,split:[],ph:0,loops:0,miss:'',tray:[],made:[],ratio:10,res:null,prog:0,gen:0,check:()=>{},Q:null};
 const mode=()=>['init','prop','term','mix','steer','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow;return{W,H,N,top:N?92:80}}
 let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 function simulate(cl){seed=11;const n=[100,0,0,0,0];for(let k=0;k<cl;k++){let tot=0;for(let i=0;i<4;i++)tot+=n[i]*(4-i);if(!tot)break;let r=rnd()*tot;for(let i=0;i<4;i++){r-=n[i]*(4-i);if(r<0){n[i]--;n[i+1]++;break}}}return n}
 const chl=n=>n[1]+n[2]+n[3]+n[4],monoPct=n=>chl(n)?M.round(n[1]/chl(n)*100):0,kinds=n=>[1,2,3,4].filter(i=>n[i]>0).length;
 function slots(g){const cols=4,w=(g.W-40)/cols;return[0,1,2,3,4,5,6,7].map(i=>({x:20+w*(i%cols)+w/2,y:g.top+30+(g.H-g.top-70)*(i<4?.25:.72),cl:i>=4}))}
 function ballC(x,X,Y,r,C,l){A.paint.ball(X,Y,r,l==='Cl'?C.gr:l==='C'?C.tx:C.mu);x.fillStyle=C.pn;x.font=F(800,r>12?11:9);x.textAlign='center';x.textBaseline='middle';x.fillText(l,X,Y+.5);x.textBaseline='alphabetic'}
 function methane(x,X,Y,C,cls){const s=['H','H','H','H'];for(let i=0;i<(cls||0);i++)s[i]='Cl';s.forEach((l,i)=>{const a=-M.PI/4+i*M.PI/2,R=24;x.strokeStyle=A.alpha(C.tx,.6);x.lineWidth=2;x.beginPath();x.moveTo(X,Y);x.lineTo(X+R*M.cos(a),Y+R*M.sin(a));x.stroke();ballC(x,X+R*M.cos(a),Y+R*M.sin(a),l==='Cl'?11:8,C,l)});ballC(x,X,Y,14,C,'C')}
 function initView(x,g,C){const L={x:g.W-34,y:4};x.fillStyle=G.lamp?A.alpha(C.vi,.18):A.alpha(C.tx,.06);A.paint.rrect(10,g.top+4,g.W-20,g.H-g.top-14,16);x.fill();
  A.paint.ball(L.x,L.y+30,16,G.lamp?C.vi:C.mu);x.fillStyle=C.tx;x.font=F(700,11);x.textAlign='center';x.fillText(G.lamp?'UV on':'dark',L.x,L.y+60);
  slots(g).forEach((s,i)=>{if(!s.cl){methane(x,s.x,s.y,C);return}const sp=G.split.includes(i),d=sp?15:11,e=sp?14:0;ballC(x,s.x-d,s.y-e,13,C,'Cl');ballC(x,s.x+d,s.y+e,13,C,'Cl');
   if(sp){x.fillStyle=C.am;[-1,1].forEach(k=>{x.beginPath();x.arc(s.x+k*(d+11),s.y+k*e-11,3.5,0,7);x.fill()})}else{x.strokeStyle=A.alpha(C.tx,.6);x.lineWidth=3;x.beginPath();x.moveTo(s.x-3,s.y);x.lineTo(s.x+3,s.y);x.stroke()}})}
 function propView(x,g,C){const y=g.top+(g.H-g.top)*.38,cx=g.W/2,a=G.ph===0;
  x.fillStyle=C.tx;x.font=F(800,g.N?15:18);x.textAlign='center';x.fillText(a?'Cl• + CH₄ → HCl + •CH₃':'•CH₃ + Cl₂ → CH₃Cl + Cl•',cx,g.H-58);
  const L=g.W*.25,R=g.W*.75;if(a){A.paint.ball(L,y,15,C.gr);x.fillStyle=C.am;x.beginPath();x.arc(L+20,y-12,4,0,7);x.fill();methane(x,R,y,C)}
  else{methane(x,L,y,C,0);x.fillStyle=C.am;x.beginPath();x.arc(L-20,y-14,4,0,7);x.fill();ballC(x,R-11,y,13,C,'Cl');ballC(x,R+11,y,13,C,'Cl')}
  A.paint.label(a?'tap the target: CH₄':'tap the target: Cl₂',R,y+48,{bg:A.alpha(C.cy,.9)});
  x.fillStyle=C.mu;x.font=F(700,13);x.fillText(`Chain cycles: ${G.loops}  ·  radicals still free: 1`,cx,g.H-30);if(G.miss){x.fillStyle=C.rd;x.fillText(G.miss,cx,g.H-10)}}
 function trayPos(g,i){const n=G.tray.length,w=(g.W-40)/n;return{x:20+w*i+w/2,y:g.top+(g.H-g.top)*.3}}
 function termView(x,g,C){G.tray.forEach((t,i)=>{const p=trayPos(g,i);if(t.used)return;x.fillStyle=t.sel?A.alpha(C.am,.35):A.alpha(C.mu,.12);x.beginPath();x.arc(p.x,p.y,30,0,7);x.fill();
   x.fillStyle=t.k==='Cl•'?C.gr:C.tx;x.font=F(800,16);x.textAlign='center';x.fillText(t.k,p.x,p.y+6)});
  TP.forEach((p,i)=>{const on=G.made.includes(i),y=g.H*.62+i*(g.N?30:26);x.fillStyle=on?C.gr:A.alpha(C.mu,.7);x.font=F(on?800:600,g.N?13:14);x.textAlign='center';x.fillText(`${on?'✓':'○'} ${p[0]} + ${p[1]} → ${p[2]}`,g.W/2,y)})}
 function bars(x,g,C,n,p){const b0=g.H-36,top=g.top+62,sc=(b0-top)/100,w=(g.W-40)/5;n.forEach((v,i)=>{const X=20+w*i+w/2,h=v*p*sc;x.fillStyle=A.alpha(i?C.gr:C.mu,.35+.12*i);A.paint.rrect(X-w*.32,b0-h,w*.64,h,5);x.fill();
   x.fillStyle=C.tx;x.font=F(700,g.N?11:13);x.textAlign='center';x.fillText(PR[i],X,b0+16);x.fillText(M.round(v*p),X,b0-h-6)})}
 function mixView(x,g,C){x.fillStyle=C.mu;x.font=F(600,12);x.textAlign='left';x.fillText(`Start: 100 CH₄ and ${G.ratio*10} Cl₂`,12,g.top+18);if(G.res){bars(x,g,C,G.res,G.prog);if(G.prog>.99)A.paint.label(`CH₃Cl is ${monoPct(G.res)}% of the chlorinated products`,g.W/2,g.top+40,{bg:A.alpha(C.vi,.9)})}
  else{x.fillStyle=C.mu;x.font=F(700,14);x.textAlign='center';x.fillText('Press Run to react in UV light',g.W/2,g.H/2)}}
 function head(){const m=mode();if(m==='init')return G.split.length?`${G.split.length*2} Cl• radicals made`:G.lamp?'UV on: tap a Cl₂ molecule':'Dark: tap the lamp to switch on UV';
  if(m==='prop')return G.ph?'Step 2: the methyl radical meets Cl₂':'Step 1: a Cl• radical meets CH₄';if(m==='term')return`Termination: ${G.made.length} of 3 ways two radicals end the chain`;
  if(m==='mix'||m==='steer'||m==='free')return`Cl₂ : CH₄ = ${G.ratio/10} : 1`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='init')return'Cl–Cl 242 kJ/mol · C–H 413 kJ/mol';if(m==='prop')return'Tap the molecule the radical hits.';if(m==='term')return'Tap two radicals to join them.';
  if(m==='steer')return'Aim: CH₃Cl at least 85% of chlorinated products. Drag across to set the ratio.';if(m==='mix'||m==='free')return'Each Cl₂ swaps one H for Cl on a random C–H. Drag across to set the ratio.';return''}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.gr,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='init')initView(x,g,C);else if(m==='prop')propView(x,g,C);else if(m==='term')termView(x,g,C);else if(m!=='quiz')mixView(x,g,C);
  else if(G.Q&&G.Q.f){x.fillStyle=C.tx;x.font=F(800,g.N?24:32);x.textAlign='center';x.fillText(G.Q.f,g.W/2,g.H*.55)}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:17);wrap(x,head(),12,24,g.W-(m==='init'?80:24),g.N?18:21);x.font=F(600,g.N?12:13);x.fillStyle=C.mu;wrap(x,sub(),12,g.N?62:52,g.W-(m==='init'?80:24),16);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function tell(m){const k=mode();let s=(m?m+' ':'')+head()+'. ';if(k==='prop')s+=`Chain cycles: ${G.loops}.`;else if(k==='term')s+='Made: '+(G.made.map(i=>TP[i][2]).join(', ')||'none')+'.';
  else if(G.res&&k!=='init'&&k!=='quiz')s+=PR.map((p,i)=>`${p} ${G.res[i]}`).join(', ')+`. CH₃Cl ${monoPct(G.res)}% of chlorinated.`;
  c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function lamp(){G.lamp=1-G.lamp;A.sound.tick();tell(G.lamp?'UV lamp on.':'Lamp off.')}
 function split(i){if(G.split.includes(i))return;if(!G.lamp){A.sound.miss();tell('In the dark nothing has enough energy to break Cl–Cl.');return}G.split.push(i);A.sound.pop();tell('UV split Cl–Cl evenly: one electron to each atom, two Cl• radicals.')}
 function hit(t){if(t!==G.ph){A.sound.miss();G.miss=G.ph?'•CH₃ needs a Cl atom, so it hits Cl₂.':'Cl• takes an H atom from CH₄.';tell(G.miss);return}G.miss='';
  if(G.ph===0){G.ph=1;A.sound.pop();tell('Cl• took an H: HCl and a •CH₃ radical.')}else{G.ph=0;G.loops++;A.sound.pop();tell('•CH₃ took a Cl: CH₃Cl, and Cl• is free again.')}}
 function newTray(){G.tray=['Cl•','•CH₃','Cl•','•CH₃'].map(k=>({k,used:0,sel:0}))}
 function pick(i){const t=G.tray[i];if(!t||t.used)return;const s=G.tray.findIndex(z=>z.sel&&!z.used);if(s<0||s===i){t.sel=1-t.sel;A.sound.tick();tell('');return}
  const a=G.tray[s].k,b=t.k,k=TP.findIndex(p=>p[0]===a&&p[1]===b||p[0]===b&&p[1]===a);G.tray[s].used=t.used=1;if(!G.made.includes(k))G.made.push(k);A.sound.pop();
  if(G.tray.every(z=>z.used))newTray();tell(`${a} + ${b} → ${TP[k][2]}: two radicals used up.`)}
 function pair(k){const[a,b]=TP[k];newTray();const i=G.tray.findIndex(z=>z.k===a),j=G.tray.findIndex((z,q)=>q!==i&&z.k===b);G.tray[i].sel=1;pick(j)}
 function run(){G.res=simulate(G.ratio*10);G.prog=0;A.sound.whoosh();A.tween(G,{prog:1},A.reduced()?0:900,'out',()=>tell('Reaction finished.'));tell('')}
 function setR(v){G.ratio=M.max(1,M.min(40,v));G.res=null;A.sound.tick();tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='init'){b(G.lamp?'Lamp off':'UV lamp on',lamp);b('Split next Cl₂',()=>split([4,5,6,7].find(i=>!G.split.includes(i))??4))}
  if(k==='prop'){b('Hit CH₄',()=>hit(0));b('Hit Cl₂',()=>hit(1))}
  if(k==='term')TP.forEach((p,i)=>b(`${p[0]} + ${p[1]}`,()=>pair(i),`Join ${p[0]} and ${p[1]}`));
  if(k==='mix'||k==='steer'||k==='free'){b('Less Cl₂',()=>setR(G.ratio>10?G.ratio-10:G.ratio-3),'Use less chlorine');b('More Cl₂',()=>setR(G.ratio<10?G.ratio+3:G.ratio+10),'Use more chlorine');b('Run ▶',run,'Run the reaction')}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{lamp:0,split:[],ph:0,loops:0,miss:'',made:[],ratio:10,res:null,prog:0},o||{});newTray()};
 const steps=[
  {h:'Light starts it',p:'Methane and chlorine do not react in the dark. Each molecule holds its bonding pairs tight.',
   predict:{q:'Which bond does UV light break first?',opts:['C–H in methane','Cl–Cl in chlorine','Both at once'],ans:1},
   task:'Switch on UV and split a Cl₂ molecule',show:()=>play([lamp,()=>split(4),()=>split(5)],500),
   go:()=>{reset();G.check=when(0,()=>G.split.length>0,()=>'Cl–Cl (242 kJ/mol) is much weaker than C–H (413). UV splits it evenly into two Cl•: initiation.')}},
  {h:'The chain',p:'A radical has an unpaired electron, so it grabs an atom from the next molecule it hits.',
   predict:{q:'Cl• hits CH₄. What does it take?',opts:['The whole CH₃ group','One H atom, making HCl','One electron, making Cl⁻'],ans:1},
   task:'Run the two propagation steps 3 times',show:()=>play([0,1,0,1,0,1].map(t=>()=>hit(t)),400),
   go:()=>{reset();G.check=when(1,()=>G.loops>=3,()=>'Each cycle makes CH₃Cl and HCl and frees Cl• again, so one Cl• can make thousands of molecules: propagation.')}},
  {h:'Ending the chain',p:'The chain stops only when two radicals meet and pair their electrons.',
   task:'Make all 3 termination products',show:()=>play([0,1,2].map(k=>()=>pair(k)),500),
   go:()=>{reset();G.check=when(2,()=>G.made.length===3,()=>'Cl₂, CH₃Cl and C₂H₆: radicals in, none out. Ethane is a clue that •CH₃ really forms.')}},
  {h:'A mixture forms',p:'The products are in the flask too. Cl• can take an H from CH₃Cl just as it can from CH₄.',
   predict:{q:'Equal amounts of CH₄ and Cl₂ react. What do you get?',opts:['Only CH₃Cl and HCl','A mix of CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄ and some CH₄','Only CCl₄'],ans:1},
   task:'Run the 1 : 1 reaction',show:()=>play([run],100),
   go:()=>{reset();G.check=when(3,()=>G.res&&G.prog>.99&&kinds(G.res)>=3,()=>'Every C–H can be hit, so each product is substituted again: a mixture that must be separated.')}},
  {h:'Steer the mixture',p:'You cannot stop further substitution, but you can make it rare.',
   task:'Get CH₃Cl to 85% or more of the chlorinated products',show:()=>play([()=>setR(7),()=>setR(4),()=>setR(1),run],400),
   go:()=>{reset();G.check=when(4,()=>G.res&&G.prog>.99&&monoPct(G.res)>=85,()=>'With excess methane, Cl• nearly always meets CH₄, not CH₃Cl. Excess chlorine pushes on to CCl₄.')}},
  {h:'Sandbox',p:'Change the Cl₂ : CH₄ ratio and run. What ratio gives the most CCl₄?',go:()=>reset()},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run2=0;const fm=k=>'C'+(k<4?'H'+(['₄','₃','₂',''][k]):'')+'Cl'+['','','₂','₃','₄'][k];
 function ask(){qi++;let opts,t;if(qi%2===0){const k=1+(qi/2)%4;t=`Methane is substituted ${k} time${k>1?'s':''} by chlorine. What forms?`;
   const K=k>1?k+' ':'';opts=[[`${fm(k)} + ${K}HCl`,'ok'],[`${fm(k)} + ${K}H₂`,'h2'],[`${fm(k)} only`,'nohcl']];G.Q={t,f:`CH₄ + ${K}Cl₂`,a:` CH₄ + ${K}Cl₂ → ${fm(k)} + ${K}HCl.`}}
  else{const q=CQ[((qi-1)/2)%CQ.length];t=q[0];opts=q[1].slice();G.Q={t}}
  const r=qi%opts.length;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const Q=G.Q,fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='h2')m='Each H that leaves pairs with the other Cl atom of Cl₂, so it leaves as HCl, not H₂.';
  else if(o[1]==='nohcl')m='Each swap also makes one HCl; atoms are not lost.';
  else if(!ok)m=FB[o[1]];
  const ans=Q.a||'';if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m+ans);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ans}${ok?` Streak: ${run2}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();
  if(m==='init'){if(M.hypot(p.x-(g.W-34),p.y-34)<34){lamp();return false}const i=slots(g).findIndex(s=>M.hypot(p.x-s.x,p.y-s.y)<40);if(i>=4)split(i);else if(i>=0){A.sound.miss();tell('UV leaves methane alone: C–H is too strong.')}return false}
  if(m==='prop'){if(M.abs(p.y-(g.top+(g.H-g.top)*.38))<60){const R=p.x>g.W/2;hit(G.ph===0?(R?0:1):(R?1:0))}return false}
  if(m==='term'){const i=G.tray.findIndex((t,j)=>!t.used&&M.hypot(p.x-trayPos(g,j).x,p.y-trayPos(g,j).y)<34);if(i>=0)pick(i);return false}
  if(m==='mix'||m==='steer'||m==='free'){const w=g.W;setR(M.round(1+(p.x/w)*39));return true}return false}
 function mv(p){const m=mode();if(m==='mix'||m==='steer'||m==='free'){const v=M.max(1,M.min(40,M.round(1+(p.x/A.W)*39)));if(v!==G.ratio){G.ratio=v;G.res=null;A.redraw()}}}
 function up(){const m=mode();if(m==='mix'||m==='steer'||m==='free')tell('')}
 A=FK.shell(c,{steps,ratio:.6,tall:.92,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Reaction controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
