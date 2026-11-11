/* Flagship – the puzzle of benzene's structure (16–18): C₆H₆ is 8 H short of hexane (4 rings/C=C), yet it leaves bromine
   water orange, releases 208 not 3 × 120 kJ/mol on hydrogenation, and has six equal 0.139 nm bonds. A structure must explain all four. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',HEX=-120,BEN=-208,SUB='₀₁₂₃₄₅₆₇₈₉',sb=n=>String(n).split('').map(d=>SUB[d]).join('');
 const FACTS=[['Formula C₆H₆: 8 H fewer than hexane',1],['Leaves bromine water orange',1],['Releases 208, not 360 kJ/mol with H₂',1],['All six C–C bonds 0.139 nm',1],['Boils at 80 °C',0],['Smells sweet',0]];
 const FN=['Boiling point says nothing about how the atoms are joined; any C₆ liquid could boil near there.','Smell is not evidence about bonding; it does not clash with any model.'];
 const CQ=[['Benzene is shaken with bromine water in the dark at room temperature. What happens?',[['It stays orange: no addition','ok'],['It turns colourless at once','alk'],['A white solid forms','ppt']]],
  ['Cyclohexene + H₂ releases 120 kJ/mol; benzene + 3H₂ releases 208. What does this show?',[['Benzene is about 152 kJ/mol more stable than three separate C=C','ok'],['Benzene has three normal C=C bonds','three'],['Benzene has fewer than two C=C, so it is barely unsaturated','few']]],
  ['All six C–C bonds in benzene are 0.139 nm. Why is that a problem for alternating single and double bonds?',[['That model predicts three 0.134 nm and three 0.154 nm bonds','ok'],['That model predicts all bonds at 0.154 nm','all'],['Bond lengths cannot be measured','meas']]],
  ['Why is C₆H₆ called highly unsaturated?',[['It has 8 fewer H atoms than hexane, C₆H₁₄','ok'],['It is a ring','ring'],['It has only 6 H atoms, one per carbon, so each C is full','full']]]];
 const FB={alk:'That is what cyclohexene does. Benzene does not add bromine like an alkene: that is the puzzle.',ppt:'No solid forms; the test is about the orange colour staying or going.',
  three:'Three C=C would release about 3 × 120 = 360 kJ/mol. Only 208 comes out, so benzene starts lower in energy.',few:'The formula still needs 4 rings or double bonds. Benzene is unsaturated; it is just extra stable.',
  all:'Alternating bonds would give two lengths: C=C 0.134 nm and C–C 0.154 nm. One length means the bonds are all the same.',meas:'X-ray diffraction measures them. All six come out equal at 0.139 nm.',
  ring:'A ring only removes 2 H. C₆H₆ is 8 H short of C₆H₁₄, so it needs 4 rings or double bonds.',full:'Count bonds: a carbon with one H and two single bonds has only 3 bonds. Something must use the spare electron.'};
VIS.reg('flagbenz',c=>{let A,pad,chal,read;
 const G={ring:0,dbl:[],tube:[0,0],fade:0,k:0,meas:[],tick:[],bad:-1,gen:0,check:()=>{},Q:null,note:''};
 const mode=()=>['h','br','dh','len','list','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow;return{W,H,N,cx:W/2,cy:H*(N?.53:.55),r:M.min(W*(N?.25:.2),H*.22)}}
 const nb=()=>G.ring?6:5,ends=i=>[i,(i+1)%6];
 function pos(g,i){if(G.ring){const a=-M.PI/2+i*M.PI/3;return[g.cx+g.r*M.cos(a),g.cy+g.r*M.sin(a)]}const s=(g.W*(g.N?.78:.66))/5;return[g.cx-2.5*s+i*s,g.cy+(i%2?-.28:.28)*g.r]}
 const used=i=>{let u=0;for(let b=0;b<nb();b++){const e=ends(b);if(e.includes(i))u+=G.dbl.includes(b)?2:1}return u},hOf=i=>4-used(i),hTot=()=>[0,1,2,3,4,5].reduce((t,i)=>t+hOf(i),0);
 const units=()=>(14-hTot())/2,form=()=>'C₆H'+sb(hTot());
 function bond(x,a,b,n,col,w,g){const dx=b[0]-a[0],dy=b[1]-a[1],L=M.hypot(dx,dy),ux=-dy/L,uy=dx/L;x.strokeStyle=col;x.lineWidth=w;
  const off=n===2?(G.ring?[0,1]:[-1,1]):[0];off.forEach(o=>{const k=G.ring&&o?(()=>{const mx=g.cx-(a[0]+b[0])/2,my=g.cy-(a[1]+b[1])/2;return M.sign(ux*mx+uy*my)*7})():o*3.5,s=G.ring&&o?.15:0;
   x.beginPath();x.moveTo(a[0]+dx*s+ux*k,a[1]+dy*s+uy*k);x.lineTo(b[0]-dx*s+ux*k,b[1]-dy*s+uy*k);x.stroke()})}
 function mol(x,g,C,labels){for(let b=0;b<nb();b++){const[i,j]=ends(b);bond(x,pos(g,i),pos(g,j),G.dbl.includes(b)?2:1,A.alpha(C.tx,.8),2.6,g)}
  if(!G.ring&&mode()!=='len'){const a=pos(g,0),b=pos(g,5);x.setLineDash([4,6]);x.strokeStyle=A.alpha(C.mu,.6);x.lineWidth=1.5;x.beginPath();x.moveTo(a[0],a[1]+14);x.quadraticCurveTo(g.cx,g.cy+g.r*1.3,b[0],b[1]+14);x.stroke();x.setLineDash([]);
   x.fillStyle=C.mu;x.font=F(600,11);x.textAlign='center';x.fillText('tap to close the ring',g.cx,g.cy+g.r*1.12)}
  for(let i=0;i<6;i++){const[X,Y]=pos(g,i),h=hOf(i);A.paint.ball(X,Y,15,h<0?C.rd:C.tx);x.fillStyle=C.pn;x.font=F(800,11);x.textAlign='center';x.textBaseline='middle';x.fillText('C',X,Y+.5);
   if(labels&&h>0){const[dx,dy]=G.ring?[(X-g.cx)/g.r,(Y-g.cy)/g.r]:[0,i%2?-1:1];A.paint.label('H'+(h>1?sb(h):''),X+dx*30,Y+dy*28,{bg:A.alpha(C.cy,.85),font:F(700,12)})}}
  x.textBaseline='alphabetic'}
 function hbar(x,g,C){const n=hTot(),y=g.H-(g.N?40:34),s=M.min(22,(g.W-40)/14);for(let i=0;i<14;i++){const X=g.W/2+(i-6.5)*s;x.fillStyle=i<n?C.cy:A.alpha(C.mu,.25);x.beginPath();x.arc(X,y,s*.36,0,7);x.fill()}
  x.fillStyle=C.tx;x.font=F(800,g.N?15:17);x.textAlign='center';x.fillText(`${form()} · ${n} of 14 H · rings + C=C: ${units()}`,g.W/2,g.H-10)}
 function tubes(x,g,C){['cyclohexene','benzene'].forEach((nm,i)=>{const X=g.W*(i?.68:.32),w=g.N?52:60,top=g.H*.24,h=g.H*.52,on=G.tube[i],f=i===0?G.fade:0;
   x.fillStyle=A.alpha(C.mu,.12);A.paint.rrect(X-w/2,top,w,h,w/2);x.fill();x.strokeStyle=A.alpha(C.tx,.6);x.lineWidth=2;x.stroke();
   x.fillStyle=on?A.alpha(A.mix(C.am,'#d9d9d9',f),.85-.55*f):A.alpha(C.cy,.12);A.paint.rrect(X-w/2+3,top+h*.4,w-6,h*.6-3,w/2-3);x.fill();
   x.fillStyle=C.tx;x.font=F(700,13);x.textAlign='center';x.fillText(nm,X,top+h+20);x.font=F(600,12);x.fillStyle=C.mu;x.fillText(on?(i===0?(f>.9?'colourless':'fading…'):'still orange'):'tap to add Br₂(aq)',X,top+h+38)})}
 function dhView(x,g,C){const top=g.N?96:80,sc=(g.H-top-40)/400,y=v=>top-v*sc,cols=[[g.W*.2,'cyclohexene'],[g.W*.5,'model: 3 C=C'],[g.W*.8,'benzene']],w=g.N?g.W*.2:g.W*.13;
  x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1.5;x.beginPath();x.moveTo(16,top);x.lineTo(g.W-16,top);x.stroke();
  const blk=(X,v0,v1,col,t)=>{x.fillStyle=A.alpha(col,.75);A.paint.rrect(X-w/2,y(v0),w,(v0-v1)*sc,5);x.fill();x.fillStyle=C.tx;x.font=F(700,12);x.textAlign='center';x.textBaseline='middle';x.fillText(t,X,(y(v0)+y(v1))/2);x.textBaseline='alphabetic'};
  blk(cols[0][0],0,HEX,C.cy,'−120');for(let i=0;i<G.k;i++)blk(cols[1][0],i*HEX,(i+1)*HEX,C.am,'−120');
  if(G.k===3){blk(cols[2][0],0,BEN,C.gr,'−208');x.strokeStyle=C.rd;x.setLineDash([5,4]);x.beginPath();x.moveTo(cols[1][0],y(BEN));x.lineTo(cols[2][0]+w/2,y(BEN));x.stroke();x.setLineDash([]);
   A.paint.label('152 more stable',cols[2][0],y(-236),{bg:A.alpha(C.rd,.9),font:F(700,12)})}
  x.fillStyle=C.tx;x.font=F(700,g.N?11:13);x.textAlign='center';cols.forEach(([X,t])=>x.fillText(t,X,top-8));x.fillStyle=C.mu;x.textAlign='left';x.fillText('kJ/mol released',16,g.H-12)}
 function lenView(x,g,C){mol(x,g,C,false);G.meas.forEach(b=>{const[i,j]=ends(b),a=pos(g,i),c=pos(g,j);A.paint.label('0.139',(a[0]+c[0])/2,(a[1]+c[1])/2,{bg:A.alpha(C.gr,.92),font:F(700,12)})});
  const y=g.H-(g.N?46:40),X0=g.W*.12,X1=g.W*.88,v=n=>X0+(n-.13)/(.026)*(X1-X0);x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1.5;x.beginPath();x.moveTo(X0,y);x.lineTo(X1,y);x.stroke();
  [[.134,'C=C 0.134',C.vi],[.154,'C–C 0.154',C.or]].forEach(([n,t,col])=>{x.fillStyle=col;x.beginPath();x.arc(v(n),y,6,0,7);x.fill();x.font=F(700,11);x.textAlign='center';x.fillText(t,v(n),y-12)});
  if(G.meas.length){x.fillStyle=C.gr;x.beginPath();x.arc(v(.139),y,8,0,7);x.fill();x.fillStyle=C.tx;x.font=F(800,12);x.textAlign='center';x.fillText(`measured ${G.meas.length}×: 0.139 nm`,v(.139),y+22)}}
 function cards(g){const N=g.N,cols=N?2:3,w=(g.W-24-(cols-1)*10)/cols,h=N?58:52,top=N?112:92;return FACTS.map((f,i)=>({x:12+(i%cols)*(w+10),y:top+M.floor(i/cols)*(h+10),w,h}))}
 function listView(x,g,C){cards(g).forEach((r,i)=>{const t=G.tick.includes(i),bad=G.bad===i;x.fillStyle=t?A.alpha(C.gr,.3):bad?A.alpha(C.rd,.2):A.alpha(C.mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,10);x.fill();
   x.strokeStyle=t?C.gr:bad?C.rd:A.alpha(C.mu,.5);x.lineWidth=t||bad?2.5:1;x.stroke();x.fillStyle=C.tx;x.font=F(700,g.N?12:13);x.textAlign='left';wrap(x,(t?'✓ ':'')+FACTS[i][0],r.x+8,r.y+20,r.w-14,15)})}
 function head(){const m=mode();if(m==='h'||m==='free')return`${form()}${hTot()===6?' — the formula of benzene':''}`;if(m==='br')return'Add bromine water to each tube';if(m==='dh')return`Model: ${G.k} × C=C = ${G.k?'−'+G.k*120:0} kJ/mol`;
  if(m==='len')return`Bonds measured: ${G.meas.length} of 6`;if(m==='list')return`Facts a structure must explain: ${G.tick.length} of 4`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='h'||m==='free')return hTot()<0?'A carbon has more than 4 bonds: undo a C=C.':'Tap a bond for C=C. A C=C or a ring removes 2 H.';if(m==='br')return'Alkenes add Br₂ across C=C, so the orange goes.';
  if(m==='dh')return'Tap the middle column to add one C=C.';if(m==='len')return'Tap each ring bond to measure it by X-ray.';if(m==='list')return G.note||'Tap the four facts that clash with a plain triene.';return''}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.cy,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='h'||m==='free'){mol(x,g,C,true);hbar(x,g,C)}else if(m==='br')tubes(x,g,C);else if(m==='dh')dhView(x,g,C);else if(m==='len')lenView(x,g,C);else if(m==='list')listView(x,g,C);
  else if(G.Q&&G.Q.n){x.fillStyle=C.tx;x.font=F(800,g.N?30:38);x.textAlign='center';x.fillText(G.Q.f,g.W/2,g.H*.55)}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:17);wrap(x,head(),12,24,g.W-24,g.N?18:21);x.font=F(600,g.N?12:13);x.fillStyle=hTot()<0&&(m==='h'||m==='free')?C.rd:C.mu;wrap(x,sub(),12,g.N?62:52,g.W-24,16);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function tell(m){G.note=m||G.note;const k=mode();let s=(m?m+' ':'')+head()+'. ';
  if(k==='h'||k==='free')s+=`${G.ring?'Ring closed':'Open chain'}, ${G.dbl.length} C=C, ${hTot()} hydrogens.`;else if(k==='br')s+=`Cyclohexene ${G.tube[0]?'turned colourless':'not tested'}; benzene ${G.tube[1]?'stayed orange':'not tested'}.`;
  else if(k==='dh')s+=G.k===3?'Measured benzene: −208 kJ/mol, 152 less than the model.':'';else if(k==='list')s+='Ticked: '+(G.tick.map(i=>FACTS[i][0]).join('; ')||'none')+'.';
  c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function togB(b){if(b<0||b>=nb())return;const i=G.dbl.indexOf(b);if(i>=0)G.dbl.splice(i,1);else{const[p,q]=ends(b);if(hOf(p)<1||hOf(q)<1){A.sound.miss();tell('Each carbon makes only 4 bonds: that one is full.');return}G.dbl.push(b)}A.sound.tick();tell('')}
 function setRing(v){G.ring=v;if(!v)G.dbl=G.dbl.filter(b=>b<5);else if(hOf(0)<0||hOf(5)<0){G.ring=0;A.sound.miss();tell('Carbons 1 and 6 have no free bond to close the ring.');return}A.sound.pop();tell(v?'Ring closed: 2 more H gone.':'Ring opened.')}
 function addBr(i){if(G.tube[i])return;G.tube[i]=1;A.sound.pop();if(i===0)A.tween(G,{fade:1},A.reduced()?0:1200,'io',()=>tell('Cyclohexene decolourised the bromine water.'));tell(i?'Benzene: the orange stays.':'Bromine added to cyclohexene.')}
 function setK(v){G.k=M.max(0,M.min(4,v));A.sound.tick();tell(G.k===3?'Measured value revealed.':'')}
 function measure(b){if(b<0||G.meas.includes(b))return;G.meas.push(b);A.sound.pop();tell('That bond is 0.139 nm.')}
 function tick(i){if(G.tick.includes(i))return;if(FACTS[i][1]){G.tick.push(i);G.bad=-1;A.sound.pop();tell('Yes: a structure has to explain that.')}else{G.bad=i;A.sound.miss();tell(FN[i-4])}}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='h'||k==='free'){for(let i=0;i<nb();i++)b(`${G.dbl.includes(i)?'●':'○'} C${i+1}–C${(i+1)%6+1}`,()=>togB(i),`Toggle double bond between carbon ${i+1} and ${(i+1)%6+1}`);b(G.ring?'Open ring':'Close ring',()=>setRing(G.ring?0:1))}
  if(k==='br'){b('Add to cyclohexene',()=>addBr(0));b('Add to benzene',()=>addBr(1))}
  if(k==='dh'){b('+ C=C',()=>setK(G.k+1),'Add one C=C to the model');b('− C=C',()=>setK(G.k-1),'Remove one C=C from the model')}
  if(k==='len')b('Measure next bond',()=>measure([0,1,2,3,4,5].find(i=>!G.meas.includes(i))??-1));
  if(k==='list')FACTS.forEach((f,i)=>b((G.tick.includes(i)?'✓ ':'')+(i+1),()=>tick(i),'Tick: '+f[0]))}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{ring:0,dbl:[],tube:[0,0],fade:0,k:0,meas:[],tick:[],bad:-1,note:''},o||{})};
 const steps=[
  {h:'Count the hydrogens',p:'Hexane, C₆H₁₄, is saturated: every carbon has 4 single bonds. Each C=C, or closing a ring, removes 2 H.',
   predict:{q:'Benzene is C₆H₆. How many rings or C=C bonds must it have?',opts:['1: it is a ring','4 in total, such as one ring and three C=C','8: one for each missing H'],ans:1},
   task:'Build a C₆ molecule with the formula C₆H₆',show:()=>play([()=>setRing(1),()=>togB(0),()=>togB(2),()=>togB(4)],450),
   go:()=>{reset();G.check=when(0,()=>hTot()===6,()=>'C₆H₆ is 8 H short of C₆H₁₄: 4 rings or C=C. Kekulé’s ring of three C=C fits the formula.')}},
  {h:'The bromine water test',p:'If benzene had three C=C bonds, it should react like an alkene. Test it beside cyclohexene, which has one C=C.',
   predict:{q:'What will benzene do to orange bromine water?',opts:['Turn it colourless fast, three times over','Leave it orange','Turn it colourless, but slowly'],ans:1},
   task:'Add bromine water to both tubes',show:()=>play([()=>addBr(0),()=>addBr(1)],700),
   go:()=>{reset();G.check=when(1,()=>G.tube[0]&&G.tube[1],()=>'Cyclohexene adds Br₂ and goes colourless. Benzene stays orange: it does not do addition like an alkene.')}},
  {h:'The energy clue',p:'Cyclohexene + H₂ → cyclohexane releases 120 kJ/mol. A ring with three C=C should release three times that.',
   predict:{q:'How much heat does benzene + 3H₂ → cyclohexane really release?',opts:['Exactly 3 × 120 = 360 kJ/mol','Less than 360 kJ/mol','More than 360 kJ/mol'],ans:1},
   task:'Stack the model for three C=C bonds',show:()=>play([0,0,0].map(()=>()=>setK(G.k+1)),450),
   go:()=>{reset();G.check=when(2,()=>G.k===3,()=>'The model says −360, but benzene gives only −208. It starts 152 kJ/mol lower: more stable than three C=C.')}},
  {h:'Measure the bonds',p:'X-ray diffraction gives bond lengths. A C–C single bond is 0.154 nm and a C=C is 0.134 nm.',
   task:'Measure all six bonds in the ring',show:()=>play([0,1,2,3,4,5].map(i=>()=>measure(i)),280),
   go:()=>{reset({ring:1,dbl:[0,2,4]});G.check=when(3,()=>G.meas.length===6,()=>'Every bond is 0.139 nm: between single and double. Three short and three long bonds do not exist.')}},
  {h:'What must a structure explain?',p:'A good model has to fit every fact, not just the formula. Pick the facts that clash with three plain C=C bonds.',
   task:'Tick the four facts a structure must explain',show:()=>play([0,1,2,3].map(i=>()=>tick(i)),350),
   go:()=>{reset();G.check=when(4,()=>G.tick.length===4,()=>'Formula, no addition, extra stability and equal bonds. Any structure for benzene has to explain all four.')}},
  {h:'Sandbox',p:'Build any C₆ ring or chain. Try to reach C₆H₆ another way, or break a carbon’s 4-bond rule.',go:()=>reset()},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run=0;
 function ask(){qi++;let opts,t;if(qi%2===0){const n=4+(qi/2)%5,u=1+((qi/2)*3)%4,m=2*n+2-2*u;t=`A hydrocarbon is C${sb(n)}H${sb(m)}. How many rings plus C=C bonds does it have?`;
   opts=[[String(u),'ok'],[String(2*u),'half'],[String(u-1),'base'],[String(u+1),'plus']].filter((o,i,a)=>+o[0]>=0&&a.findIndex(z=>z[0]===o[0])===i).slice(0,3);G.Q={t,n:1,f:`C${sb(n)}H${sb(m)}`,a:`${2*n+2} − ${m} = ${2*u} H missing, so ${u}.`}}
  else{const q=CQ[((qi-1)/2)%CQ.length];t=q[0];opts=q[1].slice();G.Q={t}}
  const r=qi%opts.length;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const Q=G.Q,fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='half')m='That counts missing H atoms. Each ring or C=C removes a pair, so halve it.';
  else if(o[1]==='base')m='Compare with the saturated alkane CₙH₂ₙ₊₂, not CₙH₂ₙ: you forgot the 2 end hydrogens.';
  else if(o[1]==='plus')m='Too many: work out 2n + 2 for the alkane, take away the H count, then halve.';
  else if(!ok)m=FB[o[1]];
  const ans=Q.a?' '+Q.a:'';if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m+ans);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ans}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const m=mode(),g=geo();
  if(m==='h'||m==='free'){let best=-1,bd=30;for(let b=0;b<nb();b++){const[i,j]=ends(b),a=pos(g,i),q=pos(g,j),d=M.hypot(p.x-(a[0]+q[0])/2,p.y-(a[1]+q[1])/2);if(d<bd){bd=d;best=b}}
   if(best>=0)togB(best);else if(!G.ring&&M.abs(p.y-(g.cy+g.r*1.05))<40&&M.abs(p.x-g.cx)<g.W*.3)setRing(1);return false}
  if(m==='br'){if(p.y>g.H*.2)addBr(p.x<g.W/2?0:1);return false}if(m==='dh'){if(M.abs(p.x-g.W*.5)<g.W*.15)setK(G.k+1);return false}
  if(m==='len'){let best=-1,bd=34;for(let b=0;b<6;b++){const[i,j]=ends(b),a=pos(g,i),q=pos(g,j),d=M.hypot(p.x-(a[0]+q[0])/2,p.y-(a[1]+q[1])/2);if(d<bd){bd=d;best=b}}measure(best);return false}
  if(m==='list'){const i=cards(g).findIndex(r=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h);if(i>=0)tick(i)}return false}
 A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Benzene controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down});reset();controls()}});
 A.start()})})();
