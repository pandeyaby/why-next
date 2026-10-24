/* Flagship 44 – naming organic compounds. A "name machine": a chain of carbon tiles, numbered twice (from the left above,
   from the right below), with one functional group the learner places by tapping or dragging along the chain. The name
   is assembled live in colour: stem (carbon count), "an" link, position number, suffix (group). Steps: grow the chain
   1 → 5 to hear the stems (trap: "tetrane"); give a 2-carbon chain each group (trap: "ethol"); walk –OH along butane and
   see four places give only two names (trap: butan-3-ol); slide C=C through the three gaps (trap: three butenes); try
   –COOH mid-chain, which the lab refuses because its carbon has one bond left, and build propanoic acid (trap: counting
   only CH₃CH₂, so "ethanoic"); then build three molecules from their names. Challenge: name a structure, draw from a name
   and read a number; each wrong option is a real slip (highest number, miscounted stem, dropped "an", missed COOH carbon). */
(()=>{const ST=['','meth','eth','prop','but','pent','hex'],SB='₀₁₂₃₄₅₆₇₈₉',sub=k=>k>1?String(k).replace(/\d/g,d=>SB[d]):'',cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const GN={ane:'no group',ene:'C=C',ol:'–OH',oic:'–COOH'};
 const loc=(n,g,p)=>g==='ene'?[p+1,n-1-p]:[p+1,n-p];
 function parts(n,g,p){const s=[ST[n],'st'],[l,r]=loc(n,g,p),k='-'+Math.min(l,r)+'-';
  if(g==='ane')return[s,['ane','suf']];if(g==='ene')return n>=4?[s,[k,'loc'],['ene','suf']]:[s,['ene','suf']];
  if(g==='ol')return n>=3?[s,['an','mid'],[k,'loc'],['ol','suf']]:[s,['an','mid'],['ol','suf']];return[s,['an','mid'],['oic acid','suf']]}
 const nm=(n,g,p)=>parts(n,g,p).map(x=>x[0]).join('');
 const hOn=(n,g,p,i)=>4-((i>0)+(i<n-1))-(g==='ene'&&(i===p||i===p+1)?1:0)-(g==='ol'&&i===p?1:g==='oic'&&i===p?3:0);
 function cond(n,g,p,keep){if(g==='ol'&&(keep?p===0&&n>1:p<n-1-p))p=n-1-p;if(g==='oic')p=n-1;if(!keep&&g==='ene'&&p>n-2-p)p=n-2-p;let s='';
  for(let i=0;i<n;i++){const h=hOn(n,g,p,i);if(g==='oic'&&i===p)s+=(h?'H':'')+'COOH';else{s+='C'+(h?'H'+sub(h):'');if(g==='ol'&&i===p)s+=i===n-1?'OH':'(OH)'}
   if(g==='ene'&&i===p)s+='='}return s}
VIS.reg('flagname',c=>{let A,pad,chal,read;const hot=[];
 const M={n:1,g:'ane',p:0,seenN:new Set(),seenG:new Set(),ols:new Set(),gaps:new Set(),mid:false,built:new Set(),tgt:0,drag:false,nope:0,hide:false,goal:()=>{},run:0};
 const say=t=>{t=cap(t);c.say(t);if(read)read.textContent=t};
 const TG=[[3,'ol',1],[4,'ene',1],[4,'oic',3]];
 function note(){const{n,g,p}=M;if(g==='ane')M.seenN.add(n);if(n===2)M.seenG.add(g);if(g==='ol'&&n===4)M.ols.add(p);if(g==='ene'&&n===4)M.gaps.add(p);
  if(A.step===5&&nm(n,g,p)===nm(...TG[M.tgt])){M.built.add(M.tgt);if(M.tgt<2)M.tgt++}}
 function why(){const{n,g,p}=M,[l,r]=loc(n,g,p),name=nm(n,g,p),k=n===1?'1 carbon':`${n} carbons`;
  if(g==='ane')return `${k}, single bonds only: ${name}. The stem ${ST[n]}- means ${k}.`;
  if(g==='oic')return `${k}, counting the –COOH carbon: ${name}. That carbon is carbon 1, so no number is needed.`;
  const what=g==='ene'?`The C=C starts at carbon ${l} from the left, carbon ${r} from the right`:`The –OH is on carbon ${l} from the left, carbon ${r} from the right`;
  const need=g==='ene'?n>=4:n>=3;return need?`${what}. Use the lower number, ${Math.min(l,r)}: ${name}.`:`${k}: ${name}. ${n===1?'Only one carbon':'Every position gives the same molecule'}, so no number is needed.`}
 function set(n,g,p,quiet){M.n=n;M.g=g;M.p=p;note();if(!quiet)say(why());sync();M.goal()}
 function grow(d){let{n,g,p}=M;const m=n+d;if(m<1||m>6){A.sound.miss();say(m<1?'A compound needs at least one carbon.':'Six carbons is the longest chain here.');return}
  if(g==='ene'&&m<2){A.sound.miss();say('A C=C needs two carbons, so the chain cannot be shorter than 2.');return}
  if(g==='ol'||g==='oic')p=p===0?0:Math.min(p,m-1);if(g==='oic'&&p)p=m-1;if(g==='ene')p=Math.min(p,m-2);A.sound.tick();set(m,g,p)}
 function setG(g){const{n}=M;if(g==='ene'&&n<2){A.sound.miss();say('A C=C needs two carbons. Add a carbon first.');return}A.sound.tick();set(n,g,g==='oic'?n-1:0)}
 function place(i){const{n,g}=M;if(g==='ane'){say(`Carbon ${i+1} from the left, ${n-i} from the right. Choose a group first, then tap a carbon.`);return}
  if(g==='oic'&&i>0&&i<n-1){M.mid=true;M.nope=1;A.tween(M,{nope:0},600,'out');A.sound.miss();
   say(`–COOH cannot go on carbon ${i+1}. Its carbon has a C=O (2 bonds) and an O–H (1 bond), so only 1 bond is left for the chain. It must sit at an end.`);sync();M.goal();return}
  const p=g==='ene'?Math.min(i,n-2):i;if(p!==M.p)A.sound.tick();set(n,g,p)}
 function nudge(d){const{n,g,p}=M;if(g==='ane')return;if(g==='oic'){set(n,g,p?0:n-1);return}const q=p+d,max=g==='ene'?n-2:n-1;if(q<0||q>max){A.sound.miss();say('That is the end of the chain.');return}set(n,g,q)}
 function play(list,ms=320){const tok=++M.run;let j=0;const go=()=>{if(tok!==M.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){if(A.step===7&&M.hide)return 'Challenge: '+(chal.querySelector('b')||{}).textContent;const{n,g,p}=M,[l,r]=loc(n,g,p);
  return `Chain of ${n} carbon${n>1?'s':''}, condensed formula ${cond(n,g,p,1)}. Group: ${GN[g]}${g==='ane'?'':`, at carbon ${l} counting from the left and ${r} from the right`}. Name: ${nm(n,g,p)}.`+(A.step===5?` Target: ${nm(...TG[M.tgt])}.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';if(A.step===7)return A.redraw();
  const b=(t,aria,f,on)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);if(on!=null)x.setAttribute('aria-pressed',String(on));x.onclick=f};
  b('− C','Remove a carbon from the chain',()=>grow(-1));b('+ C','Add a carbon to the chain',()=>grow(1));
  for(const g of['ane','ene','ol','oic'])b(GN[g],`Use group ${GN[g]}`,()=>setG(g),M.g===g);
  if(M.g!=='ane'){b('◀ move','Move the group one carbon left',()=>nudge(-1));b('move ▶','Move the group one carbon right',()=>nudge(1))}A.redraw()}
 // ---- drawing ----
 function geo(){const{W,H}=A,n=M.n,gap=Math.min(A.narrow?60:96,(W-110)/Math.max(1,n)),x0=W/2-gap*(n-1)/2;return{gap,X:i=>x0+i*gap,cy:H*(A.narrow?.42:.44),tw:Math.min(gap-12,74)}}
 function draw(A){const{ctx,W,H,col:C,paint:P}=A,{n,g,p}=M,{gap,X,cy,tw}=geo(),th=34,[l,r]=loc(n,g,p),flip=r<l;hot.length=0;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);if(M.hide==='blank'){P.label('Pick the formula that matches the name',W/2,H/2,{font:'700 13px system-ui',bg:A.alpha(C.vi,.9)});return}
  if(A.step===5){P.label(`Build: ${nm(...TG[M.tgt])}  (${M.built.size}/3)`,12,16,{align:'left',font:'800 13px system-ui',bg:A.alpha(C.vi,.9)})}
  // bonds
  for(let i=0;i<n-1;i++){const a=X(i)+tw/2,b2=X(i+1)-tw/2,dbl=g==='ene'&&i===p;ctx.strokeStyle=dbl?C.ac:C.tx;ctx.lineWidth=dbl?3.5:2.5;ctx.beginPath();
   if(dbl){ctx.moveTo(a,cy-5);ctx.lineTo(b2,cy-5);ctx.moveTo(a,cy+5);ctx.lineTo(b2,cy+5)}else{ctx.moveTo(a,cy);ctx.lineTo(b2,cy)}ctx.stroke();
   if(dbl&&!M.hide)P.label('C=C',(a+b2)/2,cy-22,{font:'800 11px system-ui',bg:C.ac})}
  // tiles
  for(let i=0;i<n;i++){const x=X(i),h=hOn(n,g,p,i),acid=g==='oic'&&i===p,bad=M.nope>.05&&g==='oic'&&i>0&&i<n-1,sh=bad?Math.sin(M.nope*30)*4:0;
   P.shadow(6,2,.2);ctx.fillStyle=acid?A.mix(C.pn,C.pk,.35):A.mix(C.pn,C.tx,.08);P.rrect(x-tw/2+sh,cy-th/2,tw,th,9);ctx.fill();P.noShadow();
   ctx.strokeStyle=bad?C.rd:A.alpha(C.tx,.45);ctx.lineWidth=bad?2.5:1.2;P.rrect(x-tw/2+sh,cy-th/2,tw,th,9);ctx.stroke();
   ctx.fillStyle=C.tx;ctx.textAlign='center';ctx.textBaseline='middle';const t=acid?(h?'H':'')+'COOH':'C'+(h?'H'+sub(h):'');ctx.font=`800 ${A.narrow?(t.length>3?11:13):(t.length>4?13:16)}px system-ui`;ctx.fillText(t,x+sh,cy+1);
   if(g==='ol'&&i===p){ctx.strokeStyle=C.gr;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x,cy-th/2);ctx.lineTo(x,cy-th/2-20);ctx.stroke();P.ball(x,cy-th/2-34,15,'#16a34a');
    ctx.fillStyle='#fff';ctx.font='800 12px system-ui';ctx.fillText('OH',x,cy-th/2-33)}
   if(!M.hide){const ry=cy-th/2-(A.narrow?62:66),by=cy+th/2+22,on=g!=='ane'&&(g==='ene'?i===p||i===p+1:i===p);
    for(const[y,k,lo]of[[ry,i+1,!flip],[by,n-i,flip]]){ctx.font='700 12px system-ui';ctx.fillStyle=on&&lo?C.gr:on?C.rd:C.mu;ctx.fillText(String(k),x,y);
     if(on&&g!=='oic'){ctx.strokeStyle=lo?C.gr:A.alpha(C.rd,.7);ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,10,0,7);ctx.stroke()}}}
   hot.push({k:'c',i,x:x-gap/2,y:cy-th/2-60,w:gap,h:th+80})}
  // end tiles
  if(!M.hide){const ex=X(n-1)+tw/2+28,sx=X(0)-tw/2-28;for(const[x,t,k]of[[ex,'+','add'],[sx,'−','cut']]){ctx.setLineDash([4,4]);ctx.strokeStyle=A.alpha(C.mu,.8);ctx.lineWidth=1.5;P.rrect(x-15,cy-15,30,30,8);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=C.mu;ctx.font='800 18px system-ui';ctx.textAlign='center';ctx.fillText(t,x,cy+1);hot.push({k,x:x-18,y:cy-20,w:36,h:40})}
   ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.fillStyle=C.mu;ctx.fillText('from left',8,cy-th/2-(A.narrow?62:66));ctx.fillText('from right',8,cy+th/2+22)}
  // name bar
  if(M.hide)return;const ny=Math.min(H-(A.narrow?62:58),cy+th/2+(A.narrow?92:100)),pc={st:C.ac,mid:C.mu,loc:C.am,suf:C.gr},fs=A.narrow?22:28;ctx.font=`800 ${fs}px system-ui`;const ps=parts(n,g,p),wsum=ps.reduce((s,q)=>s+ctx.measureText(q[0]).width,0);
  let x=W/2-wsum/2;ctx.textAlign='left';ctx.textBaseline='alphabetic';for(const[t,k]of ps){ctx.fillStyle=pc[k];ctx.fillText(t,x,ny);const w=ctx.measureText(t).width;ctx.fillRect(x,ny+5,w,3);x+=w}
  ctx.font='600 12px system-ui';ctx.fillStyle=C.mu;ctx.textAlign='center';ctx.fillText(cond(n,g,p,1),W/2,ny+24);ctx.font='600 11px system-ui';ctx.fillText('stem = carbons · number = where · ending = group',W/2,ny+42)}
 // ---- steps ----
 const fresh=()=>{M.run++;M.seenN=new Set();M.seenG=new Set();M.ols=new Set();M.gaps=new Set();M.mid=false;M.built=new Set();M.tgt=0;M.hide=false;M.goal=()=>{};c.say('');if(read)read.textContent=''};
 const fin=(i,ok,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&ok())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'The stem counts carbons',p:'The first part of a name says how many carbons are in the longest chain. Grow the chain and read the name.',
   predict:{q:'A chain of 4 carbons with only single bonds. What is it called?',opts:['Tetrane (tetra means 4)','Butane','Pentane'],ans:1},
   task:'Grow the chain from 1 to 5 carbons (tap + or the + tile)',show:()=>play([1,2,3,4,5].map(k=>()=>set(k,'ane',0))),
   go:()=>{fresh();set(1,'ane',0,true);M.goal=fin(0,()=>[1,2,3,4,5].every(k=>M.seenN.has(k)),'Meth 1, eth 2, prop 3, but 4, pent 5. The first four stems must be learned; from pent- on they are counting words.')}},
  {h:'The ending shows the group',p:'Keep two carbons. Change the group and watch only the ending change.',
   predict:{q:'Put an –OH on ethane. What is the new name?',opts:['Ethol','Ethanol','Ethane-ol'],ans:1},
   task:'Give the 2-carbon chain C=C, then –OH, then –COOH',show:()=>play(['ene','ol','oic'].map(g=>()=>setG(g)),600),
   go:()=>{fresh();set(2,'ane',0,true);M.goal=fin(1,()=>['ene','ol','oic'].every(g=>M.seenG.has(g)),'Ethane, ethene, ethanol, ethanoic acid: same stem, new ending. Alcohols and acids keep the “an” from the alkane.')}},
  {h:'Numbers say where',p:'Butane can carry its –OH on any carbon. Count from both ends. The name uses the lower number.',
   predict:{q:'The –OH is on carbon 3, counting from the left of a 4-carbon chain. What is it called?',opts:['Butan-3-ol','Butan-2-ol','Butan-1-ol'],ans:1},
   task:'Put the –OH on every carbon in turn (tap or drag it)',show:()=>play([0,1,2,3].map(i=>()=>place(i)),500),
   go:()=>{fresh();set(4,'ol',0,true);M.goal=fin(2,()=>M.ols.size===4,'Four places, only two names: butan-1-ol and butan-2-ol. Carbon 3 from one end is carbon 2 from the other.')}},
  {h:'Where is the C=C?',p:'A double bond sits in a gap between two carbons. Its number is the first carbon of the C=C, counted from the nearer end.',
   predict:{q:'How many different straight-chain butenes are there?',opts:['3, one for each gap','2','1'],ans:1},
   task:'Slide the C=C into all three gaps',show:()=>play([0,1,2].map(i=>()=>place(i)),500),
   go:()=>{fresh();set(4,'ene',0,true);M.goal=fin(3,()=>M.gaps.size===3,'The two end gaps are one molecule seen from each end: but-1-ene. The middle gap is but-2-ene.')}},
  {h:'The acid carbon counts',p:'–COOH holds its own carbon. Try to put it in the middle of a chain, then make propanoic acid.',
   predict:{q:'What is CH₃CH₂COOH called?',opts:['Ethanoic acid: the chain is CH₃CH₂','Propanoic acid','Propan-3-oic acid'],ans:1},
   task:'Try –COOH on a middle carbon, then build propanoic acid',show:()=>play([()=>set(3,'oic',2),()=>place(1),()=>set(3,'oic',2)],900),
   go:()=>{fresh();set(2,'oic',1,true);M.goal=fin(4,()=>M.mid&&M.n===3&&M.g==='oic','The –COOH carbon is carbon 1 and counts in the stem. It can only be at an end, so acids never need a number.')}},
  {h:'From name to structure',p:'Read each name part by part: stem for carbons, number for the place, ending for the group. Build it.',
   task:'Build propan-2-ol, but-2-ene and butanoic acid',show:()=>play(TG.slice(M.tgt).map(t=>()=>set(...t)),700),
   go:()=>{fresh();set(2,'ane',0,true);M.goal=fin(5,()=>M.built.size===3,'Stem, number, ending: you can draw any of these from its name.')}},
  {h:'Sandbox',p:'Build any chain up to six carbons with one group and read its name.',go:()=>{fresh();set(5,'ol',1)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>M.goal()});
 // ---- challenge ----
 const QS=[{t:'name',n:4,g:'ol',p:2,w:[['Butan-3-ol','high'],['Propan-2-ol','stem'],['But-2-ol','an']]},{t:'name',n:3,g:'oic',p:2,w:[['Ethanoic acid','cooh'],['Propanol','grp'],['Propan-3-oic acid','num']]},
  {t:'draw',n:4,g:'ol',p:3,w:[['CH₃CH(OH)CH₂CH₃','pos'],['CH₃CH₂CH₂OH','stem']]},{t:'name',n:5,g:'ene',p:2,w:[['Pent-3-ene','high'],['But-2-ene','stem'],['Pentane','grp']]},
  {t:'read'},{t:'name',n:2,g:'oic',p:1,w:[['Methanoic acid','cooh'],['Ethanol','grp'],['Ethoic acid','an']]},{t:'draw',n:3,g:'ol',p:1,w:[['CH₃CH₂CH₂OH','pos'],['CH₃CH₂CH(OH)CH₃','stem']]},
  {t:'name',n:4,g:'ene',p:0,w:[['But-3-ene','high'],['Prop-1-ene','stem'],['Butane','grp']]},{t:'draw',n:4,g:'ene',p:1,w:[['CH₂=CHCH₂CH₃','pos'],['CH₃CH=CHCH₂CH₃','stem']]}];let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const q=QS[qi];let html,opts;
  if(q.t==='read'){html='<p><b>What does the 2 in but-2-ene tell you?</b></p>';opts=[['The C=C starts at carbon 2','ok'],['There are 2 double bonds','count'],['The chain has 2 carbons','place']];M.n=4;M.g='ene';M.p=1;M.hide=true}
  else if(q.t==='name'){html=`<p><b>Name the compound ${cond(q.n,q.g,q.p)} shown on the chain.</b></p>`;opts=[[cap(nm(q.n,q.g,q.p)),'ok'],...q.w];M.n=q.n;M.g=q.g;M.p=q.p;M.hide=true}
  else{html=`<p><b>Which formula is ${nm(q.n,q.g,q.p)}?</b></p>`;opts=[[cond(q.n,q.g,q.p),'ok'],...q.w];M.hide='blank'}
  const k=qi%opts.length;opts=opts.slice(k).concat(opts.slice(0,k));chal.innerHTML=html+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o[0]);b.onclick=()=>judge(q,o[1])});sync()}
 function judge(q,s){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),n=q.n||4,g=q.g||'ene',p=q.p==null?1:q.p,right=nm(n,g,p),[l,r]=loc(n,g,p);let m;
  M.n=n;M.g=g;M.p=p;M.hide=false;
  if(s==='ok')m=`${cap(right)} is ${cond(n,g,p)}: stem ${ST[n]}- for ${n} carbons, ending for ${GN[g]}${(g==='ol'&&n>=3)||(g==='ene'&&n>=4)?`, number ${Math.min(l,r)} for its place`:''}.`;
  else if(s==='high')m=`You counted from the far end. Number from the end nearer the group so the number is as low as possible: ${right}.`;
  else if(s==='stem')m=`Count the carbons again. There are ${n}, so the stem is ${ST[n]}-: ${right}.`;
  else if(s==='an')m=`Alcohols and acids keep the “an” of the alkane: ${ST[n]} + an + ${g==='ol'?'ol':'oic acid'} gives ${right}.`;
  else if(s==='cooh')m=`The carbon inside –COOH is part of the chain. Count it too: ${n} carbons, so ${right}.`;
  else if(s==='grp')m=`The ending must show the group. ${GN[g]} needs the ending “${parts(n,g,p).pop()[0]}”, so ${right}.`;
  else if(s==='num')m=`–COOH is always on carbon 1 at the end of the chain, so acids never carry a number: ${right}.`;
  else if(s==='pos')m=`That puts the group on the wrong carbon. The number in ${right} says carbon ${Math.min(l,r)}, so the formula is ${cond(n,g,p)}.`;
  else if(s==='place')m=`The stem but- already gives the carbons: 4. The 2 is a place: the C=C starts at carbon 2.`;
  else m=`The number is a place, not a count. but-2-ene has one C=C, starting at carbon 2 of a 4-carbon chain.`;
  if(s==='ok'){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}fb.querySelector('button').onclick=ask;sync()}
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{chal.hidden=A.step!==7;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Build the chain and place the group'},box);chal=E('div',{class:'fl-chal'},A.below);
   const at=pt=>hot.find(q=>pt.x>=q.x&&pt.x<=q.x+q.w&&pt.y>=q.y&&pt.y<=q.y+q.h);
   const near=pt=>{const{X}=geo();let b=0,d=1e9;for(let i=0;i<M.n;i++){const e=Math.abs(pt.x-(M.g==='ene'?(X(i)+X(i+1))/2:X(i)));if(e<d&&(M.g!=='ene'||i<M.n-1)){d=e;b=i}}return b};
   A.gest({down:pt=>{if(A.step===7)return false;const t=at(pt);if(!t)return false;if(t.k==='add'){grow(1);return false}if(t.k==='cut'){grow(-1);return false}
     if(M.g==='ane'||M.g==='oic'){place(t.i);return false}M.drag=true;place(M.g==='ene'?near(pt):t.i);return true},
    move:pt=>{if(!M.drag)return;const i=near(pt);if(i!==M.p)place(i)},up:()=>{M.drag=false}});sync()}});
 A.start()})})();
