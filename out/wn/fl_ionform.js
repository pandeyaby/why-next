/* Flagship – writing formulae of ionic compounds (ages 14–16; AQA GCSE Chemistry 4.2.1.3/4.2.1.5, OCR Gateway C2.2,
   NC England KS3 chemistry; NGSS HS-PS1-1 preview). Tap the cation and anion trays to add ions and watch two charge
   bars: the formula appears only when the positive and negative totals match and the ratio is the lowest whole one.
   Build MgCl₂, then Al₂O₃ (lowest common multiple 6), then Ca(OH)₂ with brackets round the compound ion; build three
   compounds from their names (potassium sulfate, iron(III) chloride, ammonium sulfate); and sort six written formulae. */
(()=>{
 const CAT=[['Na',1,'sodium'],['K',1,'potassium'],['Mg',2,'magnesium'],['Ca',2,'calcium'],['Al',3,'aluminium'],['Fe',3,'iron(III)'],['NH₄',1,'ammonium',1]];
 const AN=[['Cl',-1,'chloride'],['O',-2,'oxide'],['OH',-1,'hydroxide',1],['SO₄',-2,'sulfate',1],['NO₃',-1,'nitrate',1]];
 const ROUNDS=[[1,3],[5,0],[6,3]];
 const WRITTEN=[['NaCl₂',0,'Na⁺ and Cl⁻ cancel one to one, so it is NaCl.'],['MgO',1,'Mg²⁺ and O²⁻: +2 and −2 cancel.'],['AlCl₃',1,'One Al³⁺ needs three Cl⁻.'],
  ['CaNO₃₂',0,'Two nitrate ions need brackets: Ca(NO₃)₂.'],['K₂O',1,'Two K⁺ cancel one O²⁻.'],['Al₃O₂',0,'+9 and −4 do not cancel. It is Al₂O₃.']];
 const SUB='₀₁₂₃₄₅₆₇₈₉',sub=n=>String(n).split('').map(d=>SUB[+d]).join('');
 const chg=q=>(Math.abs(q)>1?['','','²','³'][Math.abs(q)]:'')+(q>0?'⁺':'⁻');
 const gcd=(a,b)=>b?gcd(b,a%b):a,need=(ci,ai)=>{const p=CAT[ci][1],m=-AN[ai][1],l=p*m/gcd(p,m);return[l/p,l/m]};
 const part=(ion,n)=>n===1?ion[0]:(ion[3]?`(${ion[0]})`:ion[0])+sub(n);
 const formula=(ci,ai)=>{const[a,b]=need(ci,ai);return part(CAT[ci],a)+part(AN[ai],b)};
 const named=(ci,ai)=>`${CAT[ci][2]} ${AN[ai][2]}`;
 VIS.reg('flagionform',c=>{let A,row,box;
  const z={go:0,ci:2,ai:0,nc:0,na:0,made:false,rd:0,wr:0,bins:[0,0],say:'',bad:false,cb:()=>{}};
  const now=()=>['mgcl','alo','caoh','names','check','chal'][A.step];
  const em=n=>Math.round(n*(A.narrow?1:1.1));
  const NAVY='#172033',SLATE='#475569',LINE='#64748b',CARD='#ffffff',PLUS='#c2410c',PLUSBG='#ffedd5',MINUS='#1d4ed8',MINUSBG='#dbeafe',GOOD='#047857',BAD='#b91c1c';
  function t(g,s,x,y,n,col,w,al){g.font=`${w||800} ${em(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function wraps(g,s,max,n){g.font=`800 ${em(n)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(w=>{const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx});out.push(cur);return out}
  function plate(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function foot(g){if(!z.say)return;const L=wraps(g,(z.bad?'✗ ':'✓ ')+z.say,A.W-44,13),lh=em(13)+6,h=L.length*lh+12,y=A.H-h-6;plate(g,{x:10,y,w:A.W-20,h},CARD,z.bad?BAD:GOOD,3);L.forEach((l,i)=>t(g,l,A.W/2,y+6+lh*(i+.5),13,NAVY))}
  const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const no=s=>{z.bad=true;z.say=s;A.sound.miss();tell(s);A.redraw()};
  const yes=s=>{z.bad=false;z.say=s;A.sound.pop()};
  // ---- layout ----
  const trayR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.03,w,h:A.H*.17}};
  const ionR=(k,n,y)=>{const s=Math.min(A.W/(n+1.5),em(54)),gap=6,wid=n*s+(n-1)*gap;return{x:(A.W-wid)/2+k*(s+gap),y,w:s,h:s*.8}};
  const binR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.42,w,h:A.H*.28}};
  const total=()=>z.nc*CAT[z.ci][1]+z.na*AN[z.ai][1];
  function builder(g){const C=CAT[z.ci],N=AN[z.ai];
   [[C,PLUS,PLUSBG],[N,MINUS,MINUSBG]].forEach(([ion,col,bg],k)=>{const r=trayR(k);plate(g,r,bg,col,2.5);t(g,ion[0]+chg(ion[1]),r.x+r.w/2,r.y+r.h*.4,20,col,900);t(g,`${ion[2]} · tap to add`,r.x+r.w/2,r.y+r.h*.8,11,NAVY,800)});
   const n=z.nc+z.na,y=A.H*.25;for(let k=0;k<n;k++){const cat=k<z.nc,ion=cat?C:N,r=ionR(k,n,y);plate(g,r,cat?PLUSBG:MINUSBG,cat?PLUS:MINUS,2.5);t(g,ion[0]+chg(ion[1]),r.x+r.w/2,r.y+r.h/2,ion[0].length>2?11:14,cat?PLUS:MINUS,900)}
   if(!n)t(g,'no ions yet',A.W/2,A.H*.3,13,SLATE,800);
   const u=(A.W-90)/12,bx=70,pos=z.nc*C[1],neg=-z.na*N[1];[[pos,PLUS,'+'],[neg,MINUS,'−']].forEach(([v,col,s],k)=>{const y=A.H*(.47+k*.09);t(g,v?`${s}${v}`:'0',bx-10,y+em(8),14,col,900,'right');
    for(let i=0;i<12;i++){g.strokeStyle='#cbd5e1';g.lineWidth=1;g.strokeRect(bx+i*u,y,u,em(16))}g.fillStyle=col;for(let i=0;i<Math.min(12,v);i++)g.fillRect(bx+i*u+1,y+1,u-2,em(16)-2);
    const step=k?-N[1]:C[1];g.strokeStyle=NAVY;g.lineWidth=2;for(let i=step;i<Math.min(12,v);i+=step){g.beginPath();g.moveTo(bx+i*u,y-2);g.lineTo(bx+i*u,y+em(16)+2);g.stroke()}});
   const q=total(),done=n&&!q;t(g,done?(z.made?formula(z.ci,z.ai):'balanced, but not the lowest ratio'):`total charge ${q>0?'+':''}${q}`,A.W/2,A.H*.7,done&&z.made?22:15,done?(z.made?GOOD:BAD):NAVY,900)}
  function scene(g){const v=now();
   if(v==='names'&&!ROUNDS[z.rd]){t(g,'All three built!',A.W/2,A.H*.35,18,GOOD,900);return}
   if(v==='names')t(g,`Build: ${named(z.ci,z.ai)}`,A.W/2,A.H*.79,14,NAVY,900);
   if(v!=='check'){builder(g);return}
   const W=WRITTEN[z.wr],top={x:14,y:A.H*.05,w:A.W-28,h:A.H*.3};plate(g,top,CARD,LINE,2.5);t(g,W?W[0]:'All six checked!',A.W/2,top.y+top.h/2,W?30:18,W?NAVY:GOOD,900);
   ['correct','wrong'].forEach((s,k)=>{const b=binR(k);plate(g,b,k?'#f1f5f9':'#dcfce7',k?LINE:GOOD,2.5);t(g,s,b.x+b.w/2,b.y+b.h*.32,15,NAVY,900);t(g,z.bins[k]?'✓'.repeat(z.bins[k]):'tap',b.x+b.w/2,b.y+b.h*.7,15,k?SLATE:GOOD,900)})}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(now()==='chal')t(g,'Total charge zero, lowest whole ratio.',A.W/2,A.H/2,15,NAVY);else scene(g);foot(g);A.fx.draw(g)}
  // ---- moves ----
  function judge(){const q=total();if(q||!(z.nc+z.na)){z.made=false;return}const[a,b]=need(z.ci,z.ai);
   if(z.nc!==a||z.na!==b){z.made=false;return no(`Balanced, but ${z.nc}:${z.na} is not the lowest ratio. Divide both by ${gcd(z.nc,z.na)}: formulae use the smallest whole numbers.`)}
   z.made=true;yes(`${a} × (+${CAT[z.ci][1]}) + ${b} × (−${-AN[z.ai][1]}) = 0. Formula: ${formula(z.ci,z.ai)}.`)}
  function addIon(k){if(z.made)return;if((k?z.na:z.nc)>=4)return no('Four is plenty here. Remove an ion and think about the lowest common multiple of the charges.');
   if(k)z.na++;else z.nc++;const q=total();if(q)yes(`Total charge ${q>0?'+':''}${q}. ${q>0?'Too much positive: add a negative ion.':'Too much negative: add a positive ion.'}`);judge();if(now()==='names'&&z.made)setTimeout(nextRound,A.reduced()?10:700);sync()}
  function dropIon(k){if(z.made)return;if(k){if(z.na)z.na--}else if(z.nc)z.nc--;z.made=false;yes(`Total charge ${total()>0?'+':''}${total()}.`);judge();sync()}
  function nextRound(){if(now()!=='names'||!z.made)return;z.rd++;z.nc=0;z.na=0;z.made=false;const R=ROUNDS[z.rd];if(R){z.ci=R[0];z.ai=R[1]}sync()}
  function sortF(k){const W=WRITTEN[z.wr];if(!W)return;const want=W[1]?0:1;if(k!==want)return no(W[1]?`${W[0]} is right. ${W[2]}`:`${W[0]} is wrong. ${W[2]}`);z.bins[k]++;yes(W[2]);z.wr++;sync()}
  function sync(){const v=now();let s='';
   if(v==='names'&&!ROUNDS[z.rd])s='All three named compounds built.';
   else if(v==='check')s=WRITTEN[z.wr]?`Is ${WRITTEN[z.wr][0]} correct or wrong?`:'All six formulae checked.';
   else if(v==='chal')s='Challenge.';
   else s=`${named(z.ci,z.ai)}: ${z.nc} ${CAT[z.ci][0]}${chg(CAT[z.ci][1])} and ${z.na} ${AN[z.ai][0]}${chg(AN[z.ai][1])}. Total charge ${total()}.${z.made?' Formula '+formula(z.ci,z.ai)+'.':''}`;
   tell((z.say?z.say+' ':'')+s);panel();z.cb()}
  function panel(){if(!row)return;row.innerHTML='';const v=now(),add=(s,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,s);e.onclick=f};
   if(v==='check'){if(WRITTEN[z.wr]){add('correct',()=>sortF(0),`${WRITTEN[z.wr][0]} is correct`);add('wrong',()=>sortF(1),`${WRITTEN[z.wr][0]} is wrong`)}}
   else if(v!=='chal'&&!(v==='names'&&!ROUNDS[z.rd])){const C=CAT[z.ci],N=AN[z.ai];add(`Add ${C[0]}${chg(C[1])}`,()=>addIon(0),`Add a ${C[2]} ion`);add(`Add ${N[0]}${chg(N[1])}`,()=>addIon(1),`Add a ${N[2]} ion`);
    add(`Remove ${C[0]}${chg(C[1])}`,()=>dropIon(0),`Remove a ${C[2]} ion`);add(`Remove ${N[0]}${chg(N[1])}`,()=>dropIon(1),`Remove a ${N[2]} ion`)}A.redraw()}
  function down(p){const v=now();
   if(v==='check'){const k=[0,1].find(k=>hitR(p,binR(k)));if(k!=null)sortF(k);return false}
   if(v==='chal')return false;const k=[0,1].find(k=>hitR(p,trayR(k)));if(k!=null){addIon(k);return false}
   const n=z.nc+z.na;for(let i=0;i<n;i++)if(hitR(p,ionR(i,n,A.H*.25))){dropIon(i<z.nc?0:1);break}return false}
  // ---- steps ----
  const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const run=fs=>{const id=++z.go,gap=A.reduced()?15:280;fs.forEach((f,i)=>setTimeout(()=>{if(id===z.go)f()},i*gap))};
  const pair=(ci,ai)=>{z.go++;z.cb=()=>{};z.ci=ci;z.ai=ai;z.nc=0;z.na=0;z.made=false;z.rd=0;z.wr=0;z.bins=[0,0];z.say='';z.bad=false};
  const build=()=>{const[a,b]=need(z.ci,z.ai),fs=[];for(let i=0;i<a;i++)fs.push(()=>addIon(0));for(let i=0;i<b;i++)fs.push(()=>addIon(1));return fs};
  const steps=[
   {h:'Charges must cancel',p:'An ionic compound has no overall charge. Tap the trays to add ions until the + and − bars are the same length.',
    predict:{q:'Magnesium forms Mg²⁺ and chlorine forms Cl⁻. What is the formula?',opts:['MgCl','MgCl₂','Mg₂Cl'],ans:1},
    task:'Build magnesium chloride',show:()=>{steps[0].go();z.nc=0;z.na=0;run(build())},go:()=>{pair(2,0);sync();z.cb=ok(0,()=>z.made,'One Mg²⁺ (+2) needs two Cl⁻ (−2). MgCl₂.')}},
   {h:'Use the lowest common multiple',p:'Al³⁺ and O²⁻ do not cancel one to one. Find the smallest total both charges fit into.',
    predict:{q:'Aluminium oxide: Al³⁺ and O²⁻. How many of each?',opts:['1 Al and 1 O','2 Al and 3 O','3 Al and 2 O'],ans:1},
    task:'Build aluminium oxide',show:()=>{steps[1].go();run(build())},go:()=>{pair(4,1);sync();z.cb=ok(1,()=>z.made,'6 is the lowest common multiple of 3 and 2: two Al³⁺ (+6), three O²⁻ (−6). Al₂O₃.')}},
   {h:'Brackets for compound ions',p:'Hydroxide, OH⁻, is one ion made of two atoms. When you need more than one, put it in brackets.',
    predict:{q:'Calcium hydroxide: Ca²⁺ and OH⁻. Which formula is right?',opts:['CaOH₂','Ca(OH)₂','CaOH'],ans:1},
    task:'Build calcium hydroxide',show:()=>{steps[2].go();run(build())},go:()=>{pair(3,2);sync();z.cb=ok(2,()=>z.made,'Two whole OH⁻ ions: Ca(OH)₂. CaOH₂ would mean one O and two H.')}},
   {h:'From name to formula',p:'Read the name, find each ion\'s charge, then balance. A Roman numeral gives the metal\'s charge: iron(III) is Fe³⁺.',
    task:'Build 3 named compounds',show:()=>{steps[3].go();const fs=[];ROUNDS.forEach(([ci,ai],r)=>{const[a,b]=need(ci,ai);fs.push(()=>{if(z.rd!==r){z.rd=r;z.ci=ci;z.ai=ai;z.nc=0;z.na=0;z.made=false}});for(let i=0;i<a;i++)fs.push(()=>addIon(0));for(let i=0;i<b;i++)fs.push(()=>addIon(1));fs.push(nextRound)});run(fs)},
    go:()=>{pair(ROUNDS[0][0],ROUNDS[0][1]);sync();z.cb=ok(3,()=>z.rd>=ROUNDS.length,'K₂SO₄, FeCl₃ and (NH₄)₂SO₄. Brackets only go round compound ions.')}},
   {h:'Spot the wrong formula',p:'Check each formula: do the charges cancel, is the ratio lowest, and are compound ions in brackets?',
    task:'Check 6 formulae',show:()=>{steps[4].go();run(WRITTEN.map(W=>()=>sortF(W[1]?0:1)))},go:()=>{pair(0,0);sync();z.cb=ok(4,()=>z.wr>=WRITTEN.length,'NaCl₂, CaNO₃₂ and Al₃O₂ all break a rule.')}},
   {h:'Challenge',p:'',go:()=>{pair(0,0);ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>z.cb()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['Ca²⁺ and Cl⁻ make calcium chloride. What is its formula?','CaCl₂',[['CaCl','unbal'],['Ca₂Cl','swap']]],
   ['Al³⁺ and O²⁻ make aluminium oxide. What is its formula?','Al₂O₃',[['AlO','unbal'],['Al₃O₂','swap']]],
   ['Mg²⁺ and OH⁻ make magnesium hydroxide. What is its formula?','Mg(OH)₂',[['MgOH₂','bracket'],['MgOH','unbal']]],
   ['Na⁺ and SO₄²⁻ make sodium sulfate. What is its formula?','Na₂SO₄',[['NaSO₄','unbal'],['Na(SO₄)₂','swap']]],
   ['Mg²⁺ and O²⁻ make magnesium oxide. What is its formula?','MgO',[['Mg₂O₂','lowest'],['MgO₂','unbal']]],
   ['What is the formula of iron(III) chloride?','FeCl₃',[['FeCl₂','roman'],['Fe₃Cl','swap']]]];
  function why(tag){let m='Add up the charges: the total must be zero.';
   if(tag==='unbal')m='Add up the charges: they do not make zero. Add ions until + and − match.';
   if(tag==='swap')m='The numbers went on the wrong ions. Count the charge: the ion with the smaller charge needs more copies.';
   if(tag==='bracket')m='Without brackets the 2 applies only to the last atom. Put brackets round the compound ion: (OH)₂.';
   if(tag==='lowest')m='The charges cancel, but formulae use the lowest whole ratio. Mg₂O₂ simplifies to MgO.';
   if(tag==='roman')m='The (III) means Fe³⁺, so it needs three Cl⁻. FeCl₂ would be iron(II) chloride.';
   return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=box.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
  function mark(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=tag==='ok',fb=box.querySelector('.fl-fb');
   if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{box.hidden=A.step!==5;row.hidden=A.step===5;panel()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ion buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
