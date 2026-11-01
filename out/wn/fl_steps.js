/* Flagship – breaking tasks into steps (ages 7–9): tap a too-big job ("tidy my bedroom") to chip it into small steps,
   drag the steps of a frog-poster project into a sensible order, sort candidate steps into "small and clear" or
   "too big or fuzzy", split a step that is still too big into a first mini-step, then cross the stepping stones in order
   and say a progress check after each one. Every drag or tap also has a button. */
(()=>{const mn=Math.min,mx=Math.max;
 const CHIPS=['Clothes in the wash basket','Books back on the shelf','Toys in the toy box','Rubbish in the bin'];
 const ORDER=[['🔎','Find 3 facts about frogs'],['✏️','Plan where each part goes'],['🖍️','Draw and write it'],['✅','Check spellings and colour in']];
 const ORDERWHY=['You need facts first: you cannot write about frogs before you know about them.','Plan before you draw, or the parts will not fit on the page.','Draw and write once the plan is done.','Checking comes last, when there is something to check.'];
 const SIZE=[['Learn all 10 spellings tonight',0,'That is the whole job, not a step. Make it smaller.'],['Read the first 3 words out loud',1,'Small and clear: you know exactly what to do and when it is done.'],
  ['Get better at spelling',0,'Too fuzzy: what would you actually do first?'],['Look, cover, write, check word 1',1,'Small and clear: one word, one way to practise.'],['Do some spelling stuff',0,'Too fuzzy: you could not tell when it is finished.']];
 const SPLIT=[['Write the story',[['Write the first sentence about the frog',1],['Write it really well',0],['Finish the whole story tonight',0]]],
  ['Clean the hamster cage',[['Put the hamster safely in its ball',1],['Make it all clean',0],['Clean everything at once',0]]],
  ['Practise my piano piece',[['Play the first 2 bars slowly, 3 times',1],['Play it perfectly',0],['Play the whole piece again and again',0]]]];
 const STONES=[['Find facts','1 done, 3 to go!'],['Plan','Halfway there!'],['Draw and write','Nearly there, one more!'],['Check','All done! I did every step.']];
 const SELFTALK=[['I did one step!',1],['It is still not finished. Rubbish.',0]];
VIS.reg('flagsteps',c=>{let A,pad,chal,q=-1,gen=0;
 const K={chip:0,ord:[],held:null,si:0,sp:0,stone:0,talk:0,wrong:-1,pic:'',want:()=>{}};
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const view=()=>['chip','order','size','split','stones','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,fs=z=>A.narrow?z:z+3;
 const write=(x,s,px,py,z,k,w,al)=>{x.font=`${w||700} ${fs(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-16)};
 const box=(x,r,k,a,lw)=>{x.fillStyle=A.alpha(k,a==null?.16:a);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=k;x.lineWidth=lw||2;x.stroke()};
 const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const wrap=(x,s,r,z,k)=>{x.font=`600 ${fs(z)}px system-ui,sans-serif`;const ws=s.split(' '),ls=[];let l='';ws.forEach(w=>{const t=l?l+' '+w:w;if(x.measureText(t).width>r.w-14&&l){ls.push(l);l=w}else l=t});ls.push(l);
  ls.forEach((t,i)=>write(x,t,r.x+r.w/2,r.y+r.h/2+(i-(ls.length-1)/2)*(fs(z)+3),z,k,600))};
 const oops=t=>{A.sound.miss();tell(t);A.redraw()};
 const nice=t=>{A.sound.pop();tell(t);ctl();A.redraw();K.want()};
 // ---- 1: chip the big job ----
 const rockR=()=>{const s=1-K.chip*.17;return{x:A.W/2,y:Y(.3),r:mn(A.W*.3,A.H*.24)*s}};
 const chipR=i=>{const w=(A.W-30)/2;return{x:10+(i%2)*(w+10),y:Y(.6)+Math.floor(i/2)*Y(.19),w,h:Y(.16)}};
 function chipV(x){const C=A.col,r=rockR();if(K.chip<4){x.fillStyle=A.mix(C.mu,C.pn,.3);x.beginPath();for(let a=0;a<9;a++){const t=a/9*6.283,k=r.r*(.86+.14*Math.sin(a*2.7));x.lineTo(r.x+Math.cos(t)*k,r.y+Math.sin(t)*k*.8)}x.closePath();x.fill();x.strokeStyle=C.tx;x.lineWidth=2;x.stroke();
   write(x,K.chip?'the rest of the job':'Tidy my bedroom',r.x,r.y,15,C.tx,800)}else write(x,'The big job is now four small steps.',A.W/2,Y(.3),15,C.gr,800);
  for(let i=0;i<K.chip;i++){const b=chipR(i);box(x,b,C.cy);wrap(x,`${i+1}. ${CHIPS[i]}`,b,12,C.tx)}
  write(x,K.chip<4?'Tap the big job to break off a step':'',A.W/2,Y(.05),13,C.tx)}
 function chip(){if(K.chip>=4)return;K.chip++;nice(K.chip<4?`Step ${K.chip}: ${CHIPS[K.chip-1]}. The job got smaller.`:`Step 4: ${CHIPS[3]}. Now the job is four small steps.`)}
 // ---- 2: put the steps in order ----
 const slot=i=>{const h=Y(.11);return{x:10,y:Y(.06)+i*(h+6),w:A.W-20,h}};
 const loose=()=>ORDER.map((_,i)=>i).filter(i=>!K.ord.includes(i));
 const looseR=k=>{const w=(A.W-30)/2;return{x:10+(k%2)*(w+10),y:Y(.62)+Math.floor(k/2)*Y(.18),w,h:Y(.15)}};
 function orderV(x){const C=A.col;ORDER.forEach((_,i)=>{const r=slot(i),j=K.ord[i];box(x,r,j!=null?C.gr:C.ln,j!=null?.18:.06);write(x,String(i+1),r.x+16,r.y+r.h/2,14,C.tx,800);if(j!=null)write(x,ORDER[j][0]+' '+ORDER[j][1],r.x+r.w/2+8,r.y+r.h/2,13,C.tx,600)});
  loose().forEach((i,k)=>{let r=looseR(k);if(K.held&&K.held.i===i)r={...r,x:K.held.x-r.w/2,y:K.held.y-r.h/2};box(x,r,K.wrong===i?C.rd:C.vi,.14,K.wrong===i?4:2);wrap(x,ORDER[i][0]+' '+ORDER[i][1],r,12,C.tx)})}
 function place(i){K.held=null;const n=K.ord.length;if(n>=4||K.ord.includes(i))return A.redraw();if(i!==n){K.wrong=i;return oops(`Not yet. ${ORDERWHY[i]} What has to happen first?`)}K.wrong=-1;K.ord.push(i);nice(n<3?`Step ${n+1}: ${ORDER[i][1]}. ${ORDERWHY[i]}`:'Facts, plan, draw and write, check: a sensible order.')}
 // ---- 3: small and clear? ----
 const bin=k=>({x:k?X(.52):X(.02),y:Y(.62),w:X(.46),h:Y(.34)});
 const candR=()=>{const r={x:X(.1),y:Y(.2),w:X(.8),h:Y(.2)};return K.held?{...r,x:K.held.x-r.w/2,y:K.held.y-r.h/2}:r};
 function sizeV(x){const C=A.col;[['Too big or fuzzy',C.rd],['Small and clear',C.gr]].forEach(([t,k],i)=>{const r=bin(i);box(x,r,k,.1);write(x,t,r.x+r.w/2,r.y+22,13,C.tx,800)});
  if(K.si>=SIZE.length)return write(x,'You can tell a real step from a wish.',A.W/2,Y(.3),15,C.gr,800);write(x,`Is this a good small step? (${K.si+1} of ${SIZE.length})`,A.W/2,Y(.08),13,C.tx);const r=candR();box(x,r,C.vi,.2);wrap(x,SIZE[K.si][0],r,14,C.tx)}
 function judge(v){if(K.si>=SIZE.length)return;K.held=null;const s=SIZE[K.si];if(v!==s[1])return oops(s[2]);K.si++;nice(s[2])}
 // ---- 4: still too big? split again ----
 const optR=i=>({x:10,y:Y(.4)+i*Y(.19),w:A.W-20,h:Y(.16)});
 function splitV(x){const C=A.col;if(K.sp>=SPLIT.length)return write(x,'Any step can be made smaller.',A.W/2,Y(.3),15,C.gr,800);const s=SPLIT[K.sp];
  write(x,'This step still feels too big:',A.W/2,Y(.07),13,C.tx);box(x,{x:X(.15),y:Y(.13),w:X(.7),h:Y(.14)},C.am,.22);write(x,s[0],A.W/2,Y(.2),15,C.tx,800);write(x,'Pick a smaller first step:',A.W/2,Y(.34),13,C.tx);
  s[1].forEach((o,i)=>{const r=optR(i);box(x,r,K.wrong===i?C.rd:C.cy,.12,K.wrong===i?4:2);wrap(x,o[0],r,13,C.tx)})}
 function pickSplit(i){if(K.sp>=SPLIT.length)return;const o=SPLIT[K.sp][1][i];if(!o[1]){K.wrong=i;return oops(/whole|everything|all at once|again and again/i.test(o[0])?'That is the same big job, just said again. Make it smaller.':'That is a wish, not a step. What would your hands actually do first?')}
  K.wrong=-1;K.sp++;nice(`Yes: "${o[0]}" is small enough to start right now.`)}
 // ---- 5: stepping stones and progress checks ----
 const stoneAt=i=>({x:X(.14+i*.24),y:Y(.5)-(i%2)*Y(.08)});
 function stonesV(x){const C=A.col;x.fillStyle=A.alpha(C.cy,.22);x.fillRect(0,Y(.3),A.W,Y(.36));write(x,'river',X(.92),Y(.62),11,C.tx,600);
  STONES.forEach(([t],i)=>{const p=stoneAt(i),on=i<K.stone,r=mn(A.W*.1,44);x.fillStyle=on?C.gr:A.mix(C.mu,C.pn,.3);x.beginPath();x.ellipse(p.x,p.y,r,r*.7,0,0,7);x.fill();x.strokeStyle=C.tx;x.lineWidth=K.wrong===i?4:2;x.stroke();
   write(x,on?'✓':String(i+1),p.x,p.y,16,on?(C.dark?'#052e1a':'#fff'):C.tx,800);write(x,t,p.x,p.y+r+12,11,C.tx,600)});
  const bar={x:X(.08),y:Y(.86),w:X(.84),h:Y(.06)};x.fillStyle=A.alpha(C.ln,.5);A.paint.rrect(bar.x,bar.y,bar.w,bar.h,8);x.fill();x.fillStyle=C.gr;A.paint.rrect(bar.x,bar.y,bar.w*K.stone/4+.01,bar.h,8);x.fill();
  write(x,K.stone>=4?'Across! Every step done.':K.talk?'What do you say to yourself?':'Tap the next stone when that step is done',A.W/2,Y(.12),13,K.stone>=4?C.gr:C.tx,800)}
 function stone(i){if(K.stone>=4)return;if(K.talk)return oops('First, say a progress check about the step you just did.');if(i!==K.stone){K.wrong=i;return oops(`Step ${K.stone+1} comes first. Jumping ahead makes the later steps harder.`)}
  K.wrong=-1;K.stone++;K.talk=1;A.sound.tick();tell(`Step ${i+1} done. What do you say to yourself?`);ctl();A.redraw()}
 function say(v){if(!K.talk)return;if(!v)return oops('Each step done is real progress. Notice it: "I did one step!"');K.talk=0;nice(STONES[K.stone-1][1])}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={chip:chipV,order:orderV,size:sizeV,split:splitV,stones:stonesV}[v];if(f)f(x);else{x.font=`${mn(W*.25,96)}px system-ui`;x.textAlign='center';x.textBaseline='middle';x.fillText(K.pic||'🪜',W/2,H*.5)}A.fx.draw(x)}
 function ctl(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t);b.onclick=f};
  if(v==='chip'&&K.chip<4)B('🔨 Break off a step',chip);
  if(v==='order'&&K.ord.length<4)loose().forEach(i=>B(`Step ${K.ord.length+1}: ${ORDER[i][1]}`,()=>place(i)));
  if(v==='size'&&K.si<SIZE.length){B('✗ Too big or fuzzy',()=>judge(0));B('✓ Small and clear',()=>judge(1))}
  if(v==='split'&&K.sp<SPLIT.length)SPLIT[K.sp][1].forEach((o,i)=>B(o[0],()=>pickSplit(i)));
  if(v==='stones'&&K.stone<4||v==='stones'&&K.talk){if(K.talk)SELFTALK.forEach(([t,ok])=>B('💬 '+t,()=>say(ok)));else B(`🪨 Step ${K.stone+1} done: ${STONES[K.stone][0]}`,()=>stone(K.stone))}}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const fresh=()=>{gen++;K.want=()=>{};K.held=null;K.wrong=-1};
 const steps=[
  {h:'Too big to start',p:'Some jobs feel so big you do not know where to start. Tap the big job to break off small steps.',
   predict:{q:'A job feels far too big. What helps most?',opts:['Wait until you feel like it','Break it into small steps'],ans:1},task:'Break the job into four steps',
   show:()=>{steps[0].go();later([0,1,2,3].map(()=>chip),450)},
   go:()=>{fresh();K.chip=0;tell('Tidy my bedroom. Tap to break off a step.');ctl();K.want=fin(0,()=>K.chip>=4,'One big job became four small steps.')}},
  {h:'Put the steps in order',p:'Your class is making a poster about frogs. Drag the steps into the order that makes sense.',task:'Order all four steps',
   show:()=>{steps[1].go();later([0,1,2,3].map(i=>()=>place(i)),500)},
   go:()=>{fresh();K.ord=[];tell('Which step comes first?');ctl();K.want=fin(1,()=>K.ord.length>=4,'Some steps must come before others.')}},
  {h:'Small and clear',p:'A good step is small and clear: you know what to do, and you can tell when it is done. Drag each one to a box.',
   predict:{q:'Which is a better first step for learning 10 spellings?',opts:['Learn all 10 tonight','Read the first 3 words out loud'],ans:1},task:'Sort all five steps',
   show:()=>{steps[2].go();later(SIZE.map(s=>()=>judge(s[1])),450)},
   go:()=>{fresh();K.si=0;tell('Is this a good small step?');ctl();K.want=fin(2,()=>K.si>=SIZE.length,'Small and clear beats big and fuzzy.')}},
  {h:'Still too big?',p:'If a step still feels too big, break it again. Pick the first thing your hands would do.',
   predict:{q:'"Write the story" still feels too big. What now?',opts:['Skip it for today','Break it into an even smaller step'],ans:1},task:'Make three steps smaller',
   show:()=>{steps[3].go();later(SPLIT.map(s=>()=>pickSplit(s[1].findIndex(o=>o[1]))),500)},
   go:()=>{fresh();K.sp=0;tell('Write the story. Pick a smaller first step.');ctl();K.want=fin(3,()=>K.sp>=SPLIT.length,'Keep splitting until you can start right now.')}},
  {h:'Notice your progress',p:'Cross the river one stone at a time. After each step, say something that notices your progress.',task:'Cross all four stones',
   show:()=>{steps[4].go();later([0,1,2,3].flatMap(i=>[()=>stone(i),()=>say(1)]),400)},
   go:()=>{fresh();K.stone=0;K.talk=0;tell('Tap stone 1 when you have found your facts.');ctl();K.want=fin(4,()=>K.stone>=4&&!K.talk,'Step by step, and you noticed each one.')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Your Lego set has 200 pieces and a big book. What do you do first?','🧱',[['Build page 1 of the book','ok'],['Tip out all 200 and start anywhere','all'],['Leave it until you feel ready','wait']]],
  ['You have a big book report due Friday. It is Monday. What is the best plan?','📚',[['Read a chapter a day, then write on Thursday','ok'],['Do it all on Thursday night','cram'],['Write the report before reading','order']]],
  ['You finish step 1 of 5. What do you say?','🪜',[['One done! On to step 2.','ok'],['Four more. This is hopeless.','gloom'],['Nothing, it does not count yet','count']]],
  ['Your step "Make my room perfect" feels too big. What now?','🧸',[['Make the bed first','ok'],['Try harder to make it perfect','harder'],['Give up for today','quit']]],
  ['Which is a small, clear step for a times-table test?','✖️',[['Say the 3 times table twice','ok'],['Get good at maths','fuzzy'],['Learn every table tonight','all']]]];
 let streak=0;
 function quiz(){q++;const[t,e,o]=QZ[q%QZ.length],r=q%3;K.pic=e;
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([s,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,s);b.onclick=()=>verdict(tag)});tell('Challenge: '+t);A.redraw()}
 function verdict(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes: a small, clear first step you can start now.';break;
   case 'all':m='Doing everything at once is what makes a job feel too big. Pick one small step.';break;
   case 'wait':m='Waiting to feel ready is putting it off. Starting a small step is what makes you feel ready.';break;
   case 'cram':m='Leaving it all to the last night makes one giant step. Spread small steps over the week.';break;
   case 'order':m='Wrong order: you need to read before you can write about it.';break;
   case 'gloom':m='Counting only what is left hides your progress. Notice the step you finished.';break;
   case 'count':m='Every finished step counts. Noticing it gives you energy for the next one.';break;
   case 'harder':m='Trying harder at a giant step does not make it smaller. Break it down.';break;
   case 'quit':m='Giving up is not the only choice. Find a tiny first step instead.';break;
   default:m='Too fuzzy: you would not know what to do first or when it is done.'}
  const ok=tag==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();K.held=null;
  if(v==='chip'){const r=rockR();if(K.chip<4&&Math.hypot(p.x-r.x,p.y-r.y)<r.r)chip();return false}
  if(v==='order'){const k=loose().findIndex((_,k)=>hit(p,looseR(k)));if(k>=0){K.held={i:loose()[k],x:p.x,y:p.y};return true}return false}
  if(v==='size'){if(K.si<SIZE.length&&hit(p,candR())){K.held={x:p.x,y:p.y};return true}const k=[0,1].find(k=>hit(p,bin(k)));if(k!=null)judge(k);return false}
  if(v==='split'){const i=[0,1,2].findIndex(i=>hit(p,optR(i)));if(i>=0)pickSplit(i);return false}
  if(v==='stones'){const i=[0,1,2,3].findIndex(i=>Math.hypot(p.x-stoneAt(i).x,p.y-stoneAt(i).y)<mx(30,A.W*.1));if(i>=0)stone(i)}return false}
 function move(p){if(K.held){K.held.x=p.x;K.held.y=p.y;A.redraw()}}
 function up(p){const v=view(),h=K.held;if(!h)return;K.held=null;
  if(v==='order'){if(p.y<Y(.56))return place(h.i);return A.redraw()}
  if(v==='size'){const k=[0,1].find(k=>hit(p,bin(k)));return k!=null?judge(k):A.redraw()}}
 A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});ctl()}});
 A.start()})})();
