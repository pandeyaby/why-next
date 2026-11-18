/* Flagship – prefixes (ages 7–10; NC England Y3/4 spelling appendix: prefixes dis-, mis-, re-, pre-, anti-, auto-,
   super-, added to a root word without changing its spelling). Clip a prefix onto a root to fit a clue, keep every
   letter when they meet (misspell, disappear), sort words by what the prefix means, match anti-, auto- and super-
   words, and catch words that only start with the same letters (dish, ready, mister). Big tap targets; a button row
   below repeats every move. */
(()=>{
 const PRE=[['re','again'],['dis','not'],['mis','wrongly'],['pre','before']];
 const BUILD=[['play','play it again','re'],['like','not like it','dis'],['read','read it wrongly','mis'],['heat','heat it before','pre']];
 /* prefix, root, right spelling, the tempting wrong spelling */
 const GLUE=[['mis','spell','misspell','mispell'],['dis','appear','disappear','dissappear'],['dis','satisfied','dissatisfied','disatisfied'],['mis','take','mistake','misstake']];
 const MEAN=[['not','dis-  un-'],['wrongly','mis-'],['again','re-'],['before','pre-']];
 const SORT=[['unfair',0],['rewrite',2],['misbehave',1],['preview',3],['disobey',0],['mislead',1]];
 const BIG=[['autograph',['your own name, written by you','a graph about cars'],0,'auto- means self: you write it yourself.'],['antifreeze',['it stops water freezing','it freezes things fast'],0,'anti- means against: it works against freezing.'],['superstar',['a star above the rest','a star made by a machine'],0,'super- means above or more than.'],['anticlockwise',['the other way to clock hands','the same way as clock hands'],0,'anti- means against: against the way clocks turn.']];
 const REAL=[['dislike',1],['dish',0],['reread',1],['ready',0],['misplace',1],['mister',0]];
 VIS.reg('flagpfx',c=>{let A,tap,box;c.fig.classList.add('young');
  const W={id:0,i:0,made:[],bad:false,msg:'',bins:[[],[],[],[]],yes:[],no:[],done:()=>{}};
  const part=()=>['build','glue','mean','big','real','chal'][A.step];
  const sz=n=>Math.round(n*(A.narrow?1:1.15));
  const INK='#1e293b',PFX='#7c2d12',PFXBG='#ffedd5',ROOT='#0c4a6e',ROOTBG='#e0f2fe',OK='#047857',NO='#b91c1c',EDGE='#64748b',PAPER='#ffffff';
  function txt(g,s,x,y,n,col,wt,al){g.font=`${wt||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
  function chip(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function bubble(g){if(!W.msg)return;g.font=`800 ${sz(14)}px system-ui,sans-serif`;const out=[];let cur='';((W.bad?'✗ ':'✓ ')+W.msg).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>A.W-44){out.push(cur);cur=t}else cur=tr});out.push(cur);
   const lh=sz(14)+6,h=out.length*lh+14,y=A.H-h-6;chip(g,{x:12,y,w:A.W-24,h},PAPER,W.bad?NO:OK,3);out.forEach((l,i)=>txt(g,l,A.W/2,y+7+lh*(i+.5),14,INK))}
  const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const nope=t=>{W.bad=true;W.msg=t;A.sound.miss();voice(t);A.redraw()};
  const yes=t=>{W.bad=false;W.msg=t;A.sound.pop()};
  /* a word drawn as prefix (orange) + root (blue) */
  function joined(g,pre,root,x,y,n){g.font=`900 ${sz(n)}px system-ui,sans-serif`;const a=g.measureText(pre).width,b=g.measureText(root).width,x0=x-(a+b)/2;g.textAlign='left';g.textBaseline='middle';g.fillStyle=PFX;g.fillText(pre,x0,y);g.fillStyle=ROOT;g.fillText(root,x0+a,y)}
  // ---- layouts ----
  const preR=k=>{const w=(A.W-50)/4;return{x:14+k*(w+7),y:A.H*.62,w,h:sz(52)}};
  const twoR=k=>{const w=(A.W-42)/2;return{x:14+k*(w+14),y:A.H*.42,w,h:sz(70)}};
  const binR=k=>{const w=(A.W-40)/2,h=A.H*.25;return{x:14+(k%2)*(w+12),y:A.H*.25+Math.floor(k/2)*(h+8),w,h}};
  const optR=k=>({x:16,y:A.H*(.38+k*.2),w:A.W-32,h:sz(56)});
  const pileR=k=>{const w=(A.W-40)/2;return{x:14+k*(w+12),y:A.H*.36,w,h:A.H*.4}};
  function scene(g){const v=part();
   if(v==='build'){const R=BUILD[W.i];if(!R){BUILD.forEach((b,i)=>{joined(g,b[2],b[0],A.W*.36,A.H*(.1+i*.14),24);txt(g,b[1],A.W*.6,A.H*(.1+i*.14),14,INK,700,'left')});return}
    txt(g,`Make a word that means: ${R[1]}`,A.W/2,A.H*.08,15,INK);const r={x:A.W/2-sz(120),y:A.H*.2,w:sz(240),h:sz(70)};chip(g,r,PAPER,EDGE,2);
    if(W.made[W.i])joined(g,W.made[W.i],R[0],A.W/2,r.y+r.h/2,30);else{txt(g,'? + '+R[0],A.W/2,r.y+r.h/2,30,ROOT,900)}
    PRE.forEach(([p],k)=>{const q=preR(k);chip(g,q,PFXBG,PFX,2.5);txt(g,p,q.x+q.w/2,q.y+q.h/2,22,PFX,900)})}
   if(v==='glue'){const R=GLUE[W.i];if(!R){txt(g,'Keep every letter of both parts.',A.W/2,A.H*.3,16,INK);return}
    const top={x:A.W/2-sz(130),y:A.H*.08,w:sz(260),h:sz(56)};chip(g,top,PAPER,EDGE,2);joined(g,R[0]+' + ',R[1],A.W/2,top.y+top.h/2,24);txt(g,'Tap the right spelling',A.W/2,A.H*.34,15,INK,700);
    const opts=W.i%2?[R[3],R[2]]:[R[2],R[3]];opts.forEach((w,k)=>{const q=twoR(k);chip(g,q,ROOTBG,ROOT,2.5);txt(g,w,q.x+q.w/2,q.y+q.h/2,A.narrow?18:22,INK,900)})}
   if(v==='mean'){const R=SORT[W.i];if(R){const top={x:A.W/2-sz(95),y:A.H*.05,w:sz(190),h:sz(52)};chip(g,top,PAPER,EDGE,2);txt(g,R[0],A.W/2,top.y+top.h/2,24,INK,900)}else txt(g,'All sorted!',A.W/2,A.H*.12,20,OK,900);
    MEAN.forEach(([m,p],k)=>{const q=binR(k);chip(g,q,PFXBG,PFX,2);g.save();txt(g,`${m} (${p.trim().replace(/\s+/g,' ')})`,q.x+q.w/2,q.y+sz(15),A.narrow?14:16,PFX,900);g.restore();W.bins[k].forEach((w,i)=>txt(g,w,q.x+q.w/2,q.y+sz(36)+i*sz(19),15,INK,800))})}
   if(v==='big'){const R=BIG[W.i];if(!R){txt(g,'auto- self · anti- against · super- above',A.W/2,A.H*.3,15,INK);return}
    const top={x:A.W/2-sz(120),y:A.H*.06,w:sz(240),h:sz(58)};chip(g,top,PAPER,EDGE,2);const cut=R[0].startsWith('super')?5:4;joined(g,R[0].slice(0,cut),R[0].slice(cut),A.W/2,top.y+top.h/2,26);
    txt(g,'What does it mean?',A.W/2,A.H*.3,15,INK,700);R[1].forEach((m,k)=>{const q=optR(k);chip(g,q,ROOTBG,ROOT,2.5);txt(g,m,q.x+q.w/2,q.y+q.h/2,16,INK,800)})}
   if(v==='real'){const R=REAL[W.i];if(R){const top={x:A.W/2-sz(90),y:A.H*.06,w:sz(180),h:sz(56)};chip(g,top,PAPER,EDGE,2);txt(g,R[0],A.W/2,top.y+top.h/2,26,INK,900)}else txt(g,'All checked!',A.W/2,A.H*.12,20,OK,900);
    [['prefix + word',W.yes],['just starts that way',W.no]].forEach(([t,list],k)=>{const q=pileR(k);chip(g,q,k?ROOTBG:PFXBG,k?ROOT:PFX,2.5);txt(g,t,q.x+q.w/2,q.y+sz(18),A.narrow?13:15,INK,900);list.forEach((w,i)=>txt(g,w,q.x+q.w/2,q.y+sz(44)+i*sz(22),16,INK,800))})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fff7ed',C.dark?.04:.55);g.fillRect(0,0,A.W,A.H);
   if(C.dark){g.fillStyle='#fffaf3';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')txt(g,'dis · mis · re · pre · anti · auto · super',A.W/2,A.H/2,15,INK);else scene(g);bubble(g);A.fx.draw(g)}
  // ---- moves ----
  function pick(k){const R=BUILD[W.i];if(!R)return;const p=PRE[k][0];if(p!==R[2]){const m=PRE.find(x=>x[0]===R[2])[1];return nope(`${p} means ${PRE[k][1]}. "${R[1]}" needs ${m}: ${R[2]}-.`)}
   W.made[W.i]=p;yes(`${p} + ${R[0]} = ${p}${R[0]}: ${R[1]}.`);W.i++;sync()}
  function spell(w){const R=GLUE[W.i];if(!R)return;if(w!==R[2]){const m=w.length<R[2].length?`You lost a letter. ${R[0]} ends in ${R[0].slice(-1)} and ${R[1]} starts with ${R[1][0]}, so keep both: ${R[2]}.`:`You added a letter. ${R[1]} does not start with ${R[0].slice(-1)}, so there is only one: ${R[2]}.`;return nope(m)}
   yes(`${R[0]} + ${R[1]} = ${R[2]}. Every letter kept.`);W.i++;sync()}
  function file(k){const R=SORT[W.i];if(!R)return;if(k!==R[1])return nope(`${R[0]}: the prefix means ${MEAN[R[1]][0]}, not ${MEAN[k][0]}.`);W.bins[k].push(R[0]);yes(`${R[0]} → ${MEAN[k][0]}.`);W.i++;sync()}
  function mean(k){const R=BIG[W.i];if(!R)return;if(k!==R[2])return nope(`Not quite. ${R[3]}`);yes(`${R[0]}: ${R[1][k]}. ${R[3]}`);W.i++;sync()}
  function judge(isPre){const R=REAL[W.i];if(!R)return;const cut=R[0].startsWith('dis')?3:R[0].startsWith('mis')?3:2,rest=R[0].slice(cut);
   if((isPre?1:0)!==R[1])return nope(R[1]?`Take ${R[0].slice(0,cut)} off and "${rest}" is a real word, so ${R[0]} does have a prefix.`:`Take ${R[0].slice(0,cut)} off and "${rest}" is not a word, so ${R[0]} only starts with those letters.`);
   (isPre?W.yes:W.no).push(R[0]);yes(R[1]?`${R[0].slice(0,cut)} + ${rest} = ${R[0]}.`:`"${rest}" is not a word: no prefix in ${R[0]}.`);W.i++;sync()}
  function sync(){const v=part();let s='';
   if(v==='build')s=BUILD[W.i]?`Root word: ${BUILD[W.i][0]}. Make a word that means ${BUILD[W.i][1]}.`:'Four words built.';
   else if(v==='glue')s=GLUE[W.i]?`${GLUE[W.i][0]} plus ${GLUE[W.i][1]}. Pick the right spelling.`:'All four spelled.';
   else if(v==='mean')s=SORT[W.i]?`Word: ${SORT[W.i][0]}. Does the prefix mean not, wrongly, again or before?`:'All six sorted.';
   else if(v==='big')s=BIG[W.i]?`Word: ${BIG[W.i][0]}. Choose what it means.`:'All four matched.';
   else if(v==='real')s=REAL[W.i]?`Word: ${REAL[W.i][0]}. Prefix plus a real word, or does it just start that way?`:'All six checked.';else s='Challenge.';
   voice((W.msg?W.msg+' ':'')+s);keys();W.done()}
  function keys(){if(!tap)return;tap.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},tap,t);e.onclick=f};
   if(v==='build'&&BUILD[W.i])PRE.forEach(([p,m],k)=>b(p+'-',()=>pick(k),`Add ${p}, meaning ${m}`));
   if(v==='glue'&&GLUE[W.i]){const R=GLUE[W.i];(W.i%2?[R[3],R[2]]:[R[2],R[3]]).forEach(w=>b(w,()=>spell(w),`Spell it ${w.split('').join(' ')}`))}
   if(v==='mean'&&SORT[W.i])MEAN.forEach(([m],k)=>b(m,()=>file(k),`${SORT[W.i][0]}: prefix means ${m}`));
   if(v==='big'&&BIG[W.i])BIG[W.i][1].forEach((m,k)=>b(m,()=>mean(k)));
   if(v==='real'&&REAL[W.i]){b('prefix + word',()=>judge(true),`${REAL[W.i][0]} has a prefix`);b('just starts that way',()=>judge(false),`${REAL[W.i][0]} has no prefix`)}A.redraw()}
  function down(p){const v=part();
   if(v==='build'){const k=[0,1,2,3].find(k=>on(p,preR(k)));if(k!=null)pick(k)}
   if(v==='glue'&&GLUE[W.i]){const R=GLUE[W.i],o=W.i%2?[R[3],R[2]]:[R[2],R[3]],k=[0,1].find(k=>on(p,twoR(k)));if(k!=null)spell(o[k])}
   if(v==='mean'){const k=[0,1,2,3].find(k=>on(p,binR(k)));if(k!=null)file(k)}
   if(v==='big'){const k=[0,1].find(k=>on(p,optR(k)));if(k!=null)mean(k)}
   if(v==='real'){const k=[0,1].find(k=>on(p,pileR(k)));if(k!=null)judge(k===0)}return false}
  // ---- steps ----
  const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const run=fs=>{const id=++W.id,gap=A.reduced()?15:320;fs.forEach((f,i)=>setTimeout(()=>{if(id===W.id)f()},i*gap))};
  const wipe=()=>{W.id++;W.done=()=>{};W.i=0;W.made=[];W.bins=[[],[],[],[]];W.yes=[];W.no=[];W.msg='';W.bad=false};
  const steps=[
   {h:'Clip on a prefix',p:'A prefix is a few letters at the front of a word. It changes the meaning. Read the clue, then tap the prefix that fits.',
    task:'Build 4 words',show:()=>{steps[0].go();run(BUILD.map(R=>()=>pick(PRE.findIndex(x=>x[0]===R[2]))))},go:()=>{wipe();sync();W.done=ready(0,()=>W.i>=BUILD.length,'replay, dislike, misread, preheat. Same root, new meaning.')}},
   {h:'Keep every letter',p:'When a prefix meets a root word, nothing is dropped and nothing is added. Tap the right spelling.',
    predict:{q:'mis + spell. How many letter s?',opts:['One: mispell','Two: misspell'],ans:1},
    task:'Spell 4 words',show:()=>{steps[1].go();run(GLUE.map(R=>()=>spell(R[2])))},go:()=>{wipe();sync();W.done=ready(1,()=>W.i>=GLUE.length,'misspell and dissatisfied keep both letters. disappear and mistake have just one s.')}},
   {h:'What does it mean?',p:'dis- and un- mean not. mis- means wrongly. re- means again. pre- means before. Tap a box for each word.',
    task:'Sort 6 words',show:()=>{steps[2].go();run(SORT.map(R=>()=>file(R[1])))},go:()=>{wipe();sync();W.done=ready(2,()=>W.i>=SORT.length,'The prefix told you the meaning every time.')}},
   {h:'Bigger prefixes',p:'auto- means self. anti- means against. super- means above or more than. Tap the meaning that fits.',
    predict:{q:'An autograph is…',opts:['A graph about cars','Your own name, written by you'],ans:1},
    task:'Match 4 words',show:()=>{steps[3].go();run(BIG.map(R=>()=>mean(R[2])))},go:()=>{wipe();sync();W.done=ready(3,()=>W.i>=BIG.length,'auto- self, anti- against, super- above.')}},
   {h:'Real prefix or not?',p:'Some words just start with the same letters. Take the letters off. Is a real word left? Then it is a prefix.',
    predict:{q:'dish starts with d-i-s. Does it have the prefix dis-?',opts:['Yes: it starts with dis','No: take dis off and h is not a word'],ans:1},
    task:'Check 6 words',show:()=>{steps[4].go();run(REAL.map(R=>()=>judge(!!R[1])))},go:()=>{wipe();sync();W.done=ready(4,()=>W.i>=REAL.length,'dislike, reread, misplace have prefixes. dish, ready, mister do not.')}},
   {h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>W.done()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['Which word means "not agree"?','disagree',[['misagree','wrongly'],['reagree','again']]],
   ['mis + spell = ?','misspell',[['mispell','lost'],['misspel','root']]],
   ['dis + appear = ?','disappear',[['dissappear','extra'],['disapear','root']]],
   ['What does pre- mean in preview?','before',[['again','re'],['not','neg']]],
   ['Which word has the prefix re-?','rebuild',[['ready','fake'],['reach','fake']]],
   ['An autograph is…','your own name, written by you',[['a graph about cars','car'],['a very big graph','super']]]];
  function slip(tag,w){let m='Find the prefix, then check the root word is still whole.';
   if(tag==='wrongly')m='mis- means wrongly. Not agree needs dis-: disagree.';
   if(tag==='again')m='re- means again. Not agree needs dis-: disagree.';
   if(tag==='lost')m='mis ends in s and spell starts with s. Keep both: misspell.';
   if(tag==='root')m=`${w} drops a letter from the root word. The root stays whole.`;
   if(tag==='extra')m='appear starts with a, not s. Only one s: disappear.';
   if(tag==='re')m='Again is re-. pre- means before: you view it before.';
   if(tag==='neg')m='Not is dis- or un-. pre- means before.';
   if(tag==='fake')m=`Take re off ${w} and what is left is not a word. It just starts with r-e.`;
   if(tag==='car')m='auto- means self, not car. You write an autograph yourself.';
   if(tag==='super')m='Big or above is super-. auto- means self.';
   return m}
  let qi=-1,hot=0;
  function quiz(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=box.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>check(tag,w,ans)});voice('Challenge: '+q);A.redraw()}
  function check(tag,w,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
   if(ok){hot++;A.win()}else{hot=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! '+ans+'. Streak: '+hot+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
  A=FK.shell(c,{steps,ratio:.62,tall:.98,draw,onStep:A=>{box.hidden=A.step!==5;tap.hidden=A.step===5;keys()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);tap=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Prefix buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
