/* Flagship – formal and informal English (7–10): spot informal clues, swap words to suit the reader, open up
   contractions for a formal letter, and rank situations from chatty to formal. */
(()=>{const CLUE=[['Hey',1,'“Hey” is a chatty hello. A letter to a teacher starts “Dear”.'],['Mr',0],['Jones,',0],['can',0],['u',1,'“u” is text speak. Write “you”.'],
  ['gimme',1,'“gimme” is slang for “give me”.'],['the',0],['form?',0],['Ta!',1,'“Ta” is a chatty thank you. Write “Thank you”.'],['😀',1,'Emojis are for friends, not formal notes.']];
 const SW={f:{to:'🏫 To: Mrs Patel, the headteacher',want:1,s:[['Hi','Dear'],' Mrs Patel, ',['can','may'],' I ',['grab','borrow'],' a book ',['pls?','please?'],' ',['Cheers!','Thank you.']]},
  i:{to:'🧒 To: Sam, your best friend',want:0,s:[['Hi Sam,','Dear Sam,'],' ',['do you want to','would you care to'],' ',['come round','visit my home'],' later? ',['See you!','Kind regards.']]}};
 const CON=[['I’m','I am'],' writing because we ',['can’t','cannot'],' use the park. ',['It’s','It is'],' shut and we ',['don’t','do not'],' know why.'];
 const SIT=[['💬','Chat with your best friend',0],['🛒','Asking a shop worker',1],['🎤','A talk to your class',2],['✉️','A letter to the mayor',3]];
VIS.reg('flagreg',c=>{let A,pad,chal,read;
 const S={hit:[],sw:[],on:[],ord:[2,0,3,1],pick:null,miss:null,em:null,gen:0,check:()=>{},drag:null,lay:[]};
 const mode=()=>['clue','swapf','swapi','con','rank','quiz'][A.step];
 function put(x,s,X,Y,n,k,w,al){x.font=`${w||700} ${A.narrow?n:n+3}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)}
 function tile(x,R,k,on,t){x.fillStyle=A.mix(A.col.pn,k,t==null?.16:t);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.lineWidth=on?3.5:1.5;x.strokeStyle=k;x.stroke()}
 const hit=(p,R)=>!!R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 // lay out word pieces in rows; returns rects for every piece
 function flow(x,parts,top,n){const L=[],pad=A.narrow?10:14,gap=6,h=(A.narrow?n:n+3)*2.1;let X=12,Y=top;x.font=`700 ${A.narrow?n:n+3}px system-ui,sans-serif`;
  parts.forEach((t,i)=>{const w=x.measureText(t).width+pad*2;if(X+w>A.W-12&&X>12){X=12;Y+=h+gap}L.push({x:X,y:Y,w,h,i});X+=w+gap});return L}
 function pieces(src,state){let j=0;return src.map(p=>Array.isArray(p)?{t:p[state[j]],k:j++,v:state[j-1]}:{t:p.trim()?p.trim():p,k:-1})}
 function clueD(x){const C=A.col;put(x,'A note to your teacher',A.W/2,A.H*.08,13,C.mu);
  const L=flow(x,CLUE.map(w=>w[0]),A.H*.22,16);S.lay=L;L.forEach((R,i)=>{const on=S.hit.includes(i),bad=S.miss===i;tile(x,R,on?C.or:bad?C.rd:C.tx,on||bad,on?.3:.06);put(x,CLUE[i][0],R.x+R.w/2,R.y+R.h/2,16,C.tx)});
  put(x,`Informal clues found: ${S.hit.length} of 5`,A.W/2,A.H*.85,13,S.hit.length>4?C.gr:C.mu,800)}
 function meter(x,f,want){const C=A.col,y=A.H*.86,w=A.W-60,ok=want?f>=1:f<=0;x.fillStyle=A.alpha(C.tx,.12);A.paint.rrect(30,y-8,w,16,8);x.fill();
  x.fillStyle=ok?C.gr:C.am;A.paint.rrect(30,y-8,Math.max(16,w*f),16,8);x.fill();put(x,'Chatty',30,y+22,11,C.mu,700,'left');put(x,'Formal',30+w,y+22,11,C.mu,700,'right')}
 function swapD(x){const C=A.col,M=SW[mode()==='swapf'?'f':'i'];put(x,M.to,A.W/2,A.H*.08,14,C.tx,800);
  const P=pieces(M.s,S.sw),L=flow(x,P.map(p=>p.t),A.H*.2,15);S.lay=L.map((R,i)=>({...R,k:P[i].k}));
  L.forEach((R,i)=>{const p=P[i];if(p.k<0)return put(x,p.t,R.x+R.w/2,R.y+R.h/2,15,C.mu,600);tile(x,R,p.v?C.cy:C.or,1,.22);put(x,p.t,R.x+R.w/2,R.y+R.h/2,15,C.tx)});
  const f=S.sw.reduce((a,b)=>a+b,0)/S.sw.length;meter(x,f,M.want);put(x,'Tap a coloured word to swap it',A.W/2,A.H*.72,12,C.mu,700)}
 function conD(x){const C=A.col;put(x,'✉️ A letter to the council',A.W/2,A.H*.08,14,C.tx,800);
  const P=pieces(CON,S.on),L=flow(x,P.map(p=>p.t),A.H*.2,15);S.lay=L.map((R,i)=>({...R,k:P[i].k}));
  L.forEach((R,i)=>{const p=P[i];if(p.k<0)return put(x,p.t,R.x+R.w/2,R.y+R.h/2,15,C.mu,600);tile(x,R,p.v?C.gr:C.vi,!p.v,.2);put(x,p.t,R.x+R.w/2,R.y+R.h/2,15,C.tx)});
  put(x,`Full forms: ${S.on.filter(Boolean).length} of 4`,A.W/2,A.H*.85,13,S.on.every(Boolean)?C.gr:C.mu,800)}
 const slot=i=>{const h=A.H*.16,g=8;return{x:A.W*.2,y:A.H*.1+i*(h+g),w:A.W*.76,h}};
 function rankD(x){const C=A.col,top=slot(0),bot=slot(3);x.strokeStyle=A.alpha(C.tx,.4);x.lineWidth=3;x.beginPath();x.moveTo(A.W*.1,bot.y+bot.h);x.lineTo(A.W*.1,top.y+4);x.stroke();
  x.beginPath();x.moveTo(A.W*.1-8,top.y+14);x.lineTo(A.W*.1,top.y+2);x.lineTo(A.W*.1+8,top.y+14);x.stroke();
  put(x,'Formal',A.W*.1,top.y-12,11,C.mu,800);put(x,'Chatty',A.W*.1,bot.y+bot.h+14,11,C.mu,800);
  S.ord.forEach((s,i)=>{let R=slot(i);const d=S.drag&&S.drag.s===s;if(d)R={...R,y:S.drag.y-R.h/2};tile(x,R,S.pick===i?C.am:C.vi,S.pick===i||d,.14);
   put(x,SIT[s][0]+' '+SIT[s][1],R.x+12,R.y+R.h/2,13,C.tx,800,'left')})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);x.fillRect(0,0,W,H);
  const k=mode(),f={clue:clueD,swapf:swapD,swapi:swapD,con:conD,rank:rankD}[k];if(f)f(x);else put(x,S.em||'✍️',W/2,H/2,Math.min(W,H)*.2,'#000');A.fx.draw(x)}
 // ---- actions ----
 function flash(i,s){A.sound.miss();S.miss=i;setTimeout(()=>{S.miss=null;A.redraw()},700);note(s)}
 function clue(i){if(S.hit.includes(i))return;const w=CLUE[i];if(!w[1])return flash(i,`“${w[0]}” is fine in any style. Look for chatty words.`);S.hit.push(i);A.sound.pop();note(w[2])}
 function swap(k){const M=SW[mode()==='swapf'?'f':'i'];let j=0,src=null;for(const p of M.s)if(Array.isArray(p)){if(j===k)src=p;j++}
  S.sw[k]^=1;A.sound.tick();note(`“${src[1-S.sw[k]]}” → “${src[S.sw[k]]}”: ${S.sw[k]?'more formal':'more chatty'}.`)}
 function open(k){if(S.on[k])return;S.on[k]=1;A.sound.pop();let j=0;for(const p of CON)if(Array.isArray(p)){if(j===k)note(`“${p[0]}” opens up to “${p[1]}”.`);j++}}
 const ranked=()=>S.ord[0]===3&&S.ord[3]===0;
 function move(i,d){const j=i+d;if(j<0||j>3)return;[S.ord[i],S.ord[j]]=[S.ord[j],S.ord[i]];S.pick=null;A.sound.tick();
  note(ranked()?'Letter to the mayor at the top, chat with a friend at the bottom.':'Top is most formal, bottom is most chatty.')}
 function note(m){const k=mode();let s;
  if(k==='clue')s=`Informal clues found: ${S.hit.map(i=>CLUE[i][0]).join(', ')||'none'}.`;
  else if(k==='swapf'||k==='swapi'){const M=SW[k==='swapf'?'f':'i'];s='The message now reads: '+pieces(M.s,S.sw).map(p=>p.t).join(' ').replace(/ ([,?.!])/g,'$1')+'.'}
  else if(k==='con')s='The letter now reads: '+pieces(CON,S.on).map(p=>p.t).join(' ')+'';
  else if(k==='rank')s='From most formal to most chatty: '+S.ord.map(i=>SIT[i][1]).join(', ')+'.';else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();S.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb,off)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lb||null},pad,t);e.disabled=!!off;e.onclick=f;return e};
  if(k==='clue')CLUE.forEach((w,i)=>b(w[0],()=>clue(i),'Word: '+w[0],S.hit.includes(i)));
  if(k==='swapf'||k==='swapi'){const M=SW[k==='swapf'?'f':'i'];let j=0;M.s.forEach(p=>{if(!Array.isArray(p))return;const q=j++;b('⇄ '+p[S.sw[q]],()=>swap(q),`Swap “${p[S.sw[q]]}” for “${p[1-S.sw[q]]}”`)})}
  if(k==='con'){let j=0;CON.forEach(p=>{if(!Array.isArray(p))return;const q=j++;b(p[0]+' → '+p[1],()=>open(q),`Open up ${p[0]}`,S.on[q])})}
  if(k==='rank')S.ord.forEach((s,i)=>{b('▲ '+SIT[s][1],()=>move(i,-1),'Move up: '+SIT[s][1],i===0);b('▼',()=>move(i,1),'Move down: '+SIT[s][1],i===3)})}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*ms))};
 const reset=()=>{S.gen++;S.check=()=>{};S.em=null;S.miss=null;S.drag=null;S.pick=null};
 const solve=want=>()=>S.sw.map((v,q)=>()=>{if(v!==want)swap(q)});
 const steps=[
  {h:'Spot the chatty clues',p:'Formal English is for people you do not know well, or for serious jobs. Informal English is chatty, for friends and family. This note goes to a teacher. Tap every chatty clue.',
   predict:{q:'Which word makes a note sound chatty?',opts:['Hey','Dear','Please'],ans:0},task:'Find all 5 chatty clues',
   show:()=>{steps[0].go();play(CLUE.map((w,i)=>w[1]?()=>clue(i):null).filter(Boolean),400)},go:()=>{reset();S.hit=[];note();S.check=when(0,()=>S.hit.length>=5,()=>'Hey, u, gimme, Ta and the emoji all sound chatty. A teacher needs “Dear”, “you”, “please give me” and “Thank you”.')}},
  {h:'Make it formal',p:'Your reader is the headteacher. Tap each coloured word to swap it until the bar is full.',task:'Make every word choice formal',
   show:()=>{steps[1].go();play(solve(1)(),400)},go:()=>{reset();S.sw=[0,0,0,0,0];note();S.check=when(1,()=>S.sw.every(v=>v===1),()=>'“Dear Mrs Patel, may I borrow a book please? Thank you.” That is polite and formal: just right for a headteacher.')}},
  {h:'Make it chatty',p:'Now you are writing to your best friend. This message sounds stiff, like a robot wrote it. Swap the words to make it friendly.',
   predict:{q:'Is chatty, informal English wrong?',opts:['Yes, always','No, it is right for friends and family'],ans:1},task:'Make every word choice chatty',
   show:()=>{steps[2].go();play(solve(0)(),400)},go:()=>{reset();S.sw=[1,1,1,1];note();S.check=when(2,()=>S.sw.every(v=>v===0),()=>'“Hi Sam, do you want to come round later? See you!” Informal is not wrong. It fits the reader.')}},
  {h:'Open up short forms',p:'Short forms like “can’t” join two words with an apostrophe. In a formal letter, write the two words in full. Tap each short form to open it up.',
   predict:{q:'In a letter to the council, which is better?',opts:['I’m writing to ask','I am writing to ask'],ans:1},task:'Open up all 4 short forms',
   show:()=>{steps[3].go();play([0,1,2,3].map(q=>()=>open(q)),400)},go:()=>{reset();S.on=[0,0,0,0];note();S.check=when(3,()=>S.on.every(Boolean),()=>'“I am”, “cannot”, “It is”, “do not”: full forms make the letter sound formal.')}},
  {h:'Speaking too',p:'We change how we speak, too. Drag the cards, or use the buttons, to put the most formal at the top and the most chatty at the bottom.',task:'Put the letter to the mayor at the top and the chat with a friend at the bottom',
   show:()=>{steps[4].go();play([()=>move(2,-1),()=>move(1,-1),()=>move(2,1)],500)},go:()=>{reset();S.ord=[2,0,3,1];note();S.check=when(4,ranked,()=>'A friend gets your chattiest voice; the mayor gets your most formal. A shop worker or a class talk sits in between.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
 const QS=[['Which is best in a note to your headteacher?','🏫',[['Dear Mrs Hill, may I please borrow a football?','ok'],['Hey Mrs Hill, can I grab a football?','hey'],['Mrs Hill can u lend me a ball pls','txt']]],
  ['You text your best friend. Which fits best?','📱',[['Want to come to the park later?','ok'],['Dear Sam, I would be most grateful if you came to the park.','stiff'],['To whom it may concern: the park.','stiff']]],
  ['Which is the formal way to say “Can I have some?”','🍪',[['May I please have some?','ok'],['Can I have some of that stuff, yeah?','long'],['CAN I HAVE SOME?','caps']]],
  ['Why write “I am” and not “I’m” in a letter to the council?','✉️',[['Full forms sound more formal','ok'],['“I’m” is a spelling mistake','wrong'],['Shorter words are always more formal','short']]],
  ['You give a talk to your class. Which opening fits?','🎤',[['Good morning, everyone. Today I am going to talk about volcanoes.','ok'],['Alright guys, so like, volcanoes are cool.','chat'],['Dear Class, yours sincerely, volcanoes.','letter']]],
  ['Is informal English ever the right choice?','🤔',[['Yes, with friends and family','ok'],['No, it is always wrong','never'],['Yes, everywhere, even in a job letter','always']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,em,ops]=QS[qi%QS.length],r=qi%3;S.em=em;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});c.say('Challenge: '+q);A.cv.setAttribute('aria-label','Challenge: '+q);A.redraw()}
 function mark(t){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';let m='Right.';
  if(t==='hey')m='“Hey” and “grab” are chatty. A headteacher gets “Dear” and “borrow”.';if(t==='txt')m='Text speak like “u” and “pls” is for friends, never formal notes.';
  if(t==='stiff')m='That is far too stiff for a friend. Chatty words fit a text to a mate.';if(t==='long')m='More words do not make it formal. “Stuff” and “yeah” are chatty.';
  if(t==='caps')m='Capital letters just look like shouting. Formal means “May I please…”.';if(t==='wrong')m='“I’m” is spelt right. It is just chatty, so a formal letter uses “I am”.';
  if(t==='short')m='Short forms are more chatty, not more formal. Full forms sound formal.';if(t==='chat')m='“Guys” and “like” are for friends. A class talk needs a clear, formal start.';
  if(t==='letter')m='“Dear” and “yours sincerely” belong in letters, not in a spoken talk.';if(t==='never')m='Informal is right for friends and family. Formal would sound odd there.';
  if(t==='always')m='A job letter needs formal words. Pick the style that suits the reader.';
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=mode();
  if(k==='rank'){const i=[0,1,2,3].findIndex(i=>hit(p,slot(i)));if(i<0)return false;S.drag={s:S.ord[i],from:i,y:p.y,y0:p.y};return true}
  const R=S.lay.find(R=>hit(p,R));if(!R)return false;
  if(k==='clue')clue(R.i);else if(R.k>=0)(k==='con'?open:swap)(R.k);return false}
 function dmove(p){if(S.drag){S.drag.y=p.y;A.redraw()}}
 function up(){const d=S.drag;S.drag=null;if(!d)return;if(Math.abs(d.y-d.y0)<8){if(S.pick==null){S.pick=d.from;A.redraw();return}const a=S.pick;S.pick=null;if(a!==d.from){[S.ord[a],S.ord[d.from]]=[S.ord[d.from],S.ord[a]];A.sound.tick()}return note()}
  const to=[0,1,2,3].reduce((b,i)=>Math.abs(slot(i).y+slot(i).h/2-d.y)<Math.abs(slot(b).y+slot(b).h/2-d.y)?i:b,0);S.ord.splice(d.from,1);S.ord.splice(to,0,d.s);A.sound.tick();
  note(ranked()?'Letter to the mayor at the top, chat with a friend at the bottom.':'Top is most formal, bottom is most chatty.')}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;controls()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Word controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:dmove,up});controls()}});
 A.start()})})();
