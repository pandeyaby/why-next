/* Flagship – word families and root words (ages 7–9): build real words on the root act, sort look-alikes out of the
   family, match the solve family to meanings even when the spelling shifts (solu-), peel prefixes and suffixes off to
   find the root, and file a family's words by job (doing, thing, person, describing). Drag or tap; buttons mirror all. */
(()=>{
 const AFFIX=[['re','pre','react'],['or','suf','actor'],['ion','suf','action'],['un','pre',null],['ive','suf','active'],['ful','suf',null]];
 const FAKE={un:'Unact is not a real word today. A prefix only joins a root when the new word means something.',ful:'Actful is not a word. Not every ending fits every root; check it is a word you know.'};
 const LOOKS=[['actor',1],['fact',0],['react',1],['cactus',0],['action',1],['tractor',0],['active',1]];
 const LOOK_WHY={fact:'Fact has a, c and t, but it means something true, not doing. Same letters, different family.',cactus:'A cactus is a plant. The letters a-c-t are there, but not the meaning of act.',
  tractor:'Tractor comes from a word meaning pull. It only looks like act.'};
 const CLUES=[['the answer to a problem','solution'],['a person who solves things','solver'],['to mix into water until it vanishes','dissolve'],['will not dissolve, however long you stir','insoluble']];
 const SOLVE=['solution','solver','dissolve','insoluble'];
 const PEEL=[[['un','pre'],['break','root'],['able','suf']],[['help','root'],['less','suf']],[['dis','pre'],['agree','root'],['ment','suf']],[['re','pre'],['build','root'],['ing','suf']]];
 const JOBS=['doing (verb)','a thing (noun)','a person','describing (adjective)'];
 const FILE=[['create',0],['creation',1],['creator',2],['creative',3],['invent',0],['invention',1],['inventor',2],['inventive',3]];
 const JOB_HINT=[w=>`${w} is a doing word: you can say I can ${w}.`,w=>`${w} is a thing: -ion turns the doing into a thing.`,w=>`${w} is a person: -or names who does it.`,w=>`${w} is a describing word: -ive describes, as in: the idea is ${w}.`];
VIS.reg('flagwfam',c=>{let A,keys,quizBox;
 const M={n:0,made:[],used:new Set(),flash:'',err:false,grab:null,pos:null,run:0,watch:()=>{}};
 const part=()=>['build','looks','match','peel','jobs','quiz'][A.step];
 function voice(t){c.say(t);A.cv.setAttribute('aria-label',t)}
 function wrong(t){M.err=true;M.flash=t;A.sound.miss();voice(t);A.redraw()}
 function right(t){M.err=false;M.flash=t;A.sound.pop()}
 const px=n=>A.narrow?n:Math.round(n*1.18);
 function txt(g,s,x,y,n,col,w){g.font=`${w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y,A.W-14)}
 function tile(g,r,col,a,bold){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=bold?4:2;g.stroke()}
 const over=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const grid=(i,cols,top,h)=>{const w=(A.W-12*(cols+1))/cols,row=Math.floor(i/cols);return{x:12+(i%cols)*(w+12),y:top+row*(h+10),w,h}};
 const rootR=()=>({x:A.W/2-70,y:A.H*.18,w:140,h:Math.min(66,A.H*.15)});
 const affR=i=>grid(i,3,A.H*.47,Math.min(50,A.H*.13));
 const pileR=()=>({x:A.W/2-85,y:A.H*.05,w:170,h:A.H*.22});
 const pairR=j=>grid(j,2,A.H*.4,A.H*.28);
 const jobR=j=>grid(j,2,A.H*.3,A.H*.18);
 function chunks(word){const w=word.map(([s])=>s.length*px(20)*.66+30),tot=w.reduce((a,b)=>a+b,0)+8*(w.length-1);let x=A.W/2-tot/2;return word.map((m,i)=>{const r={x,y:A.H*.3,w:w[i],h:Math.min(80,A.H*.2)};x+=w[i]+8;return r})}
 function banner(g){if(!M.flash)return;const C=A.col;g.font=`700 ${px(13)}px system-ui,sans-serif`;const out=[];let line='';
  M.flash.split(' ').forEach(w=>{const t=line?line+' '+w:w;if(line&&g.measureText(t).width>A.W-44){out.push(line);line=w}else line=t});out.push(line);
  const lh=px(13)+5,h=out.length*lh+10,y=A.H-h-8;tile(g,{x:12,y,w:A.W-24,h},M.err?C.rd:C.gr,.12);out.forEach((l,i)=>txt(g,(i?'':M.err?'✗ ':'✓ ')+l,A.W/2,y+5+lh*(i+.5),13,C.tx))}

 // ---------- scenes ----------
 const SCENE={
  build(g,C){txt(g,M.made.length?'Family: '+M.made.join(', '):'Drag a part onto act',A.W/2,A.H*.1,15,C.tx);const r=rootR();tile(g,r,C.vi,.22,true);txt(g,'act',r.x+r.w/2,r.y+r.h/2,26,C.tx,800);
   txt(g,'prefix goes in front · suffix goes after',A.W/2,r.y+r.h+22,12,C.mu);
   AFFIX.forEach(([a,k],i)=>{if(M.used.has(a))return;let q=affR(i);if(M.grab===i&&M.pos)q={...q,x:M.pos.x-q.w/2,y:M.pos.y-q.h/2};tile(g,q,k==='pre'?C.cy:C.am,.18);txt(g,k==='pre'?a+'-':'-'+a,q.x+q.w/2,q.y+q.h/2,19,C.tx,800)})},
  looks(g,C){if(M.n>=LOOKS.length)return txt(g,'Family words share meaning, not just letters.',A.W/2,A.H*.35,14,C.gr);let r=pileR();if(M.grab!=null&&M.pos)r={...r,x:M.pos.x-r.w/2,y:M.pos.y-r.h/2};
   tile(g,r,C.cy,.15);txt(g,LOOKS[M.n][0],r.x+r.w/2,r.y+r.h/2,24,C.tx,800);['in the act family','only looks like act'].forEach((t,j)=>{const q=pairR(j);tile(g,q,j?C.or:C.vi,.13);txt(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx,800)})},
  match(g,C){if(M.n>=CLUES.length)return txt(g,'Five words, one root: solve.',A.W/2,A.H*.35,13,C.gr);txt(g,'Which word means:',A.W/2,A.H*.08,13,C.mu);
   txt(g,'“'+CLUES[M.n][0]+'”',A.W/2,A.H*.18,16,C.tx,800);SOLVE.forEach((w,j)=>{const q=grid(j,2,A.H*.3,A.H*.16);tile(g,q,C.vi,.13);txt(g,w,q.x+q.w/2,q.y+q.h/2,18,C.tx,800)})},
  peel(g,C){if(M.n>=PEEL.length)return txt(g,'Peel off the front and the end to find the root.',A.W/2,A.H*.35,14,C.gr);txt(g,'Tap the root word',A.W/2,A.H*.12,15,C.mu);
   chunks(PEEL[M.n]).forEach((r,i)=>{const [s]=PEEL[M.n][i];tile(g,r,[C.cy,C.vi,C.am][i%3],.16);txt(g,s,r.x+r.w/2,r.y+r.h/2,20,C.tx,800)})},
  jobs(g,C){if(M.n>=FILE.length)return txt(g,'The ending tells you the job of the word.',A.W/2,A.H*.3,14,C.gr);let r={x:A.W/2-80,y:A.H*.04,w:160,h:A.H*.2};if(M.grab!=null&&M.pos)r={...r,x:M.pos.x-80,y:M.pos.y-r.h/2};
   tile(g,r,C.cy,.15);txt(g,FILE[M.n][0],r.x+r.w/2,r.y+r.h/2,22,C.tx,800);JOBS.forEach((t,j)=>{const q=jobR(j);tile(g,q,[C.vi,C.am,C.pk,C.gr][j],.12);txt(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx,800)})}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.07:.4);g.fillRect(0,0,W,H);const f=SCENE[part()];if(f)f(g,C);else txt(g,'root + parts = family',W/2,H/2,20,C.tx);banner(g);A.fx.draw(g)}

 // ---------- moves ----------
 function attach(i){const [a,,made]=AFFIX[i]||[];if(!a||M.used.has(a))return;if(!made)return wrong(FAKE[a]);M.used.add(a);M.made.push(made);right(`${made}: ${AFFIX[i][1]==='pre'?a+' + act':'act + '+a}. It still has the meaning of act, doing.`);update()}
 function file(j){const it=LOOKS[M.n];if(!it)return;const fam=it[1]===1;if(fam!==(j===0))return wrong(fam?`${it[0]} is in the family: it is about doing, like act.`:LOOK_WHY[it[0]]);M.n++;right(`${it[0]}: ${fam?'in the family.':'only looks like act.'}`);update()}
 function pick(w){const cl=CLUES[M.n];if(!cl)return;if(w!==cl[1]){let m=`${w} is in the family, but it does not mean that. Read the clue again.`;if(w==='insoluble')m='In- means not. Insoluble means it will not dissolve.';if(w==='solver')m='-er names a person. Is the clue about a person?';return wrong(m)}
  M.n++;right(`${w}: ${cl[0]}.${w==='solution'||w==='insoluble'?' The root is spelled solu- here, but it is the same family.':''}`);update()}
 function peel(i){const wd=PEEL[M.n];if(!wd)return;const [s,k]=wd[i];if(k!=='root')return wrong(k==='pre'?`${s}- is a prefix. It sits at the front and changes the meaning.`:`-${s} is a suffix. It sits at the end and changes the job of the word.`);
  M.n++;right(`${wd.map(x=>x[0]).join(' + ')}: the root is ${s}.`);update()}
 function job(j){const it=FILE[M.n];if(!it)return;if(j!==it[1])return wrong(JOB_HINT[it[1]](it[0]));M.n++;right(`${it[0]}: ${JOBS[j]}.`);update()}

 function update(msg){const v=part();let s='';
  if(v==='build')s=`Root: act. Built: ${M.made.join(', ')||'none yet'}.`;else if(v==='looks')s=M.n<LOOKS.length?`Card: ${LOOKS[M.n][0]}.`:'All cards sorted.';
  else if(v==='match')s=M.n<CLUES.length?`Clue: ${CLUES[M.n][0]}.`:'All clues matched.';else if(v==='peel')s=M.n<PEEL.length?`Word: ${PEEL[M.n].map(x=>x[0]).join('')}. Find the root.`:'All roots found.';
  else if(v==='jobs')s=M.n<FILE.length?`Card: ${FILE[M.n][0]}. Which job?`:'All words filed.';else s='Challenge.';
  voice((msg||M.flash?(msg||M.flash)+' ':'')+s);keypad();M.watch()}
 function keypad(){if(!keys)return;keys.innerHTML='';const v=part(),k=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=f};
  if(v==='build')AFFIX.forEach(([a,t],i)=>{if(!M.used.has(a))k(t==='pre'?a+'- + act':'act + -'+a,()=>attach(i),`Add ${t==='pre'?'prefix':'suffix'} ${a}`)});
  if(v==='looks'&&M.n<LOOKS.length){k('In the act family',()=>file(0));k('Only looks like act',()=>file(1))}
  if(v==='match'&&M.n<CLUES.length)SOLVE.forEach(w=>k(w,()=>pick(w)));
  if(v==='peel'&&M.n<PEEL.length)PEEL[M.n].forEach(([s],i)=>k(s,()=>peel(i),`Choose ${s}`));
  if(v==='jobs'&&M.n<FILE.length)JOBS.forEach((t,j)=>k(t,()=>job(j)));A.redraw()}

 function grabAt(p){const v=part();M.grab=null;M.pos=null;
  if(v==='build'){const i=AFFIX.findIndex(([a],i)=>!M.used.has(a)&&over(p,affR(i)));if(i<0)return false;M.grab=i;M.pos=p;return true}
  if(v==='looks'&&M.n<LOOKS.length){const j=[0,1].find(j=>over(p,pairR(j)));if(j!=null){file(j);return false}if(over(p,pileR())){M.grab=0;M.pos=p;return true}return false}
  if(v==='match'&&M.n<CLUES.length){const j=SOLVE.findIndex((w,j)=>over(p,grid(j,2,A.H*.3,A.H*.16)));if(j>=0)pick(SOLVE[j]);return false}
  if(v==='peel'&&M.n<PEEL.length){const i=chunks(PEEL[M.n]).findIndex(r=>over(p,r));if(i>=0)peel(i);return false}
  if(v==='jobs'&&M.n<FILE.length){const j=JOBS.findIndex((t,j)=>over(p,jobR(j)));if(j>=0){job(j);return false}M.grab=0;M.pos=p;return true}
  return false}
 function letGo(p){const v=part(),i=M.grab;M.grab=null;M.pos=null;if(i==null)return A.redraw();
  if(v==='build'){if(p.y<A.H*.5||over(p,affR(i)))attach(i);else A.redraw()}
  else if(v==='looks'){const j=[0,1].find(j=>over(p,pairR(j)));j!=null?file(j):A.redraw()}
  else if(v==='jobs'){const j=JOBS.findIndex((t,j)=>over(p,jobR(j)));j>=0?job(j):A.redraw()}}

 // ---------- steps ----------
 const when=(n,test,msg)=>()=>{const ready=A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null);if(ready)A.done(msg+A.reveal(n))};
 const demo=fs=>{const id=++M.run,dt=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===M.run)f()},i*dt))};
 const fresh=()=>{M.run++;M.watch=()=>{};M.n=0;M.made=[];M.used=new Set();M.flash='';M.err=false;M.grab=null};
 const steps=[
  {h:'Build on a root',p:'A root word is the main part of a word. Add a prefix in front or a suffix after it to make new words in its family. Drag a part onto act, or tap it.',
   predict:{q:'Actor, action and react all contain act. Do they share a meaning?',opts:['Yes: they are all about doing','No: they only share letters'],ans:0},task:'Build 4 real words from act',
   show:()=>{steps[0].go();demo([0,1,2,4].map(i=>()=>attach(i)))},go:()=>{fresh();update();M.watch=when(0,()=>M.made.length>=4,'React, actor, action, active: a word family keeps the root and its meaning.')}},
  {h:'Looks like it, but is it family?',p:'Some words hide the same letters but mean something else. Family words share the meaning too. Drag each card into a box, or tap a box.',
   predict:{q:'Cactus has a-c-t in it. Is it in the act family?',opts:['Yes, it has act in it','No, it does not mean doing'],ans:1},task:'Sort 7 cards',
   show:()=>{steps[1].go();demo(LOOKS.map(([,f])=>()=>file(f?0:1)))},go:()=>{fresh();update();M.watch=when(1,()=>M.n>=LOOKS.length,'Fact, cactus and tractor only look like act. Check the meaning, not just the letters.')}},
  {h:'The root can change its spelling',p:'In the solve family, the root is sometimes spelled solu-, as in solution. Read each clue and tap the family word that matches.',
   predict:{q:'Solution does not spell solve the same way. Is it still in the solve family?',opts:['Yes: solu- is the same root','No: the spelling changed'],ans:0},task:'Match 4 clues',
   show:()=>{steps[2].go();demo(CLUES.map(([,w])=>()=>pick(w)))},go:()=>{fresh();update();M.watch=when(2,()=>M.n>=CLUES.length,'Solve and solu- are one root. In- means not, dis- means apart, -er names a person.')}},
  {h:'Peel off the parts',p:'To read a long new word, peel off the prefix and the suffix. What is left is the root, and you may know it already. Tap the root.',
   predict:{q:'What is the root of disagreement?',opts:['dis','agree','ment'],ans:1},task:'Find the root in 4 words',
   show:()=>{steps[3].go();demo(PEEL.map(w=>()=>peel(w.findIndex(x=>x[1]==='root'))))},go:()=>{fresh();update();M.watch=when(3,()=>M.n>=PEEL.length,'Break, help, agree, build. Know the root and you can work out the word.')}},
  {h:'Every word has a job',p:'Suffixes change what a family word does in a sentence. Put each word in the box for its job. Drag it, or tap a box.',
   task:'File 8 words by job',show:()=>{steps[4].go();demo(FILE.map(([,j])=>()=>job(j)))},go:()=>{fresh();update();M.watch=when(4,()=>M.n>=FILE.length,'Create, creation, creator, creative: one root, four jobs.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>M.watch()});

 // ---------- challenge: each wrong pick names the slip ----------
 const Q=[['Which word is not in the help family?','helmet',[['helpful','fam','help + ful, full of help'],['helper','fam','help + er, a person who helps']]],
  ['Which word is in the act family?','actor',[['fact','look','fact'],['cactus','look','cactus']]],
  ['What is the root of unhappiness?','happy',[['un','pre','un'],['ness','suf','ness']]],
  ['Which word belongs in the solve family?','insoluble',[['solar','look','solar'],['sold','look','sold']]],
  ['A person who invents is an …','inventor',[['invention','job','-ion makes a thing'],['inventive','job','-ive describes']]],
  ['Which word is not in the kind family?','kindle',[['kindness','fam','kind + ness, being kind'],['unkind','fam','un + kind, not kind']]]];
 function slip(tag,w,info){let m='Look at the meaning, not only the letters.';
  if(tag==='fam')m=`${w} is in the family: ${info}. Look for the word that only shares letters.`;
  if(tag==='look')m=`${w} only looks like it. It shares letters but not the meaning.`;
  if(tag==='pre')m=`${w}- is a prefix at the front. Peel it off.`;
  if(tag==='suf')m=`-${w} is a suffix at the end. Peel it off, and change i back to y.`;
  if(tag==='job')m=`${info}, not a person. -or names a person.`;
  return m}
 let qn=-1,stars=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],opts=[[ans,'ok','']].concat(bad),k=qn%3,order=opts.slice(k).concat(opts.slice(0,k));
  quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quizBox.querySelector('.fl-pick');order.forEach(([w,tag,info])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,w);b.onclick=()=>reply(tag,w,info,ans)});voice('Challenge: '+q);A.redraw()}
 function reply(tag,w,info,ans){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=tag==='ok',fb=quizBox.querySelector('.fl-fb');
  if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes, '+ans+'.':'✗ '+slip(tag,w,info)}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quizBox.hidden=A.step!==5;keys.hidden=A.step===5;keypad()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word family controls'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down:grabAt,move:p=>{M.pos=p;A.redraw()},up:letGo})}});
 A.start()})})();
