/* Flagship – triggers and causes of feelings (ages 5–7, with a grown-up): match what happened to how each child felt
   and say "felt … because …"; sort cards into what happened and feelings; look back through a comic strip to find a
   cause that came earlier; check tired and hungry as hidden causes; then make your own "I feel … when …" sentences. */
(()=>{
 // [name, face, feeling, what happened]
 const PEOPLE=[['Mia','😢','sad','her ice cream fell on the floor'],['Leo','😨','scared','a loud bang of thunder'],['Ava','😄','happy','Grandma came to visit']];
 const SORT=[['My tower fell down',0],['cross',1],['My friend shared her snack',0],['worried',1],['I lost my teddy',0],['proud',1]];
 // [who, face now, feeling now, [panel emoji, panel text] x3, index of the cause, why]
 const STORY=[['Leo','😠','grumpy at lunch',[['🥣','Breakfast: toast and milk.'],['⚽','Play: his ball goes over the fence.'],['🍝','Lunch: pasta. He likes pasta.']],1,'His ball went over the fence at playtime. The cause came earlier.'],
  ['Zara','🤩','too excited to sleep',[['🎂','Morning: Mum says, “Party tomorrow!”'],['🛁','Bath: bubbles and a duck.'],['🛏️','Bed: lights out.']],0,'She is thinking about her party tomorrow. A cause can be something you are waiting for.']];
 const FEEL=[['😄','happy'],['😢','sad'],['😠','cross'],['😨','scared']];
 const HAP=['my friend plays with me','I lose a game','someone shouts at me','I hear a strange noise','I get a hug','my toy breaks'];
VIS.reg('flagcause',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const st={m:{},sel:null,held:null,at:null,from:null,bad:null,k:0,round:0,body:{},helped:0,f:null,h:null,mine:[],tok:0,onChange:()=>{}};
 const mode=()=>['match','sort','look','body','mine','quiz'][A.step];
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}

 // ---------- layout ----------
 const big=n=>A.narrow?n:Math.round(n*1.15);
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const row=(i,n,y,h,g=8)=>{const w=(A.W-g*(n+1))/n;return{x:g+i*(w+g),y:A.H*y,w,h:A.H*h}};
 const hapR=i=>row(i,3,.04,.36),pplR=i=>row(i,3,.56,.4),boxR=b=>row(b,2,.5,.46,12),curR=()=>({x:A.W*.2,y:A.H*.06,w:A.W*.6,h:A.H*.3});
 const panR=i=>row(i,3,.3,.62),meterR=i=>row(i,2,.56,.3,16),feelR=i=>row(i,4,.03,.2),hapR2=i=>{const r=row(i%3,3,i<3?.27:.47,.17);return r};
 function write(g,t,x,y,n,col,w){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-12)}
 function wrap(g,t,r,n,col,y0){g.font=`700 ${big(n)}px system-ui,sans-serif`;const lines=[];let ln='';t.split(' ').forEach(w=>{const tr=ln?ln+' '+w:w;if(g.measureText(tr).width>r.w-10&&ln){lines.push(ln);ln=w}else ln=tr});lines.push(ln);
  const lh=big(n)*1.2,y=(y0==null?r.y+r.h/2:y0)-(lines.length-1)*lh/2;lines.forEach((l,i)=>write(g,l,r.x+r.w/2,y+i*lh,n,col,700))}
 function glyph(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function tile(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}

 // ---------- drawing ----------
 function drawMatch(g){const C=A.col;PEOPLE.forEach(([n,f,feel,hap],i)=>{let r=hapR(i);const used=Object.values(st.m).includes(i);
   if(!used){if(st.held===i&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};tile(g,r,st.sel===i?C.or:C.mu,st.sel===i,.12);wrap(g,hap,r,11,C.tx)}});
  PEOPLE.forEach(([n,f,feel],j)=>{const r=pplR(j),k=Object.keys(st.m).find(x=>st.m[x]===j);tile(g,r,st.bad===j?C.rd:k!=null?C.gr:C.cy,false,.1);
   glyph(g,f,r.x+r.w/2,r.y+r.h*.26,Math.min(44,r.h*.36));write(g,`${n}: ${feel}`,r.x+r.w/2,r.y+r.h*.58,11,C.tx);
   if(k!=null)wrap(g,'because '+PEOPLE[j][3],{x:r.x,y:r.y+r.h*.66,w:r.w,h:r.h*.32},9,C.tx)});
  write(g,'Drag what happened to who it happened to',A.W/2,A.H*.47,11,C.tx,700)}
 function drawSort(g){const C=A.col,k=st.k;[['🎬 What happened',C.cy],['💗 Feeling',C.pk]].forEach(([t,col],b)=>{const r=boxR(b);tile(g,r,col,false,.1);write(g,t,r.x+r.w/2,r.y+20,12,C.tx);
   SORT.filter((x,i)=>st.m[i]===b).forEach((x,j)=>write(g,x[0],r.x+r.w/2,r.y+48+j*big(18),10,C.tx,700))});
  if(k<SORT.length){let r=curR();if(st.held!=null&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};tile(g,r,st.bad!=null?C.rd:C.or,true,.14);wrap(g,SORT[k][0],r,15,C.tx)}
  else write(g,'All sorted!',A.W/2,A.H*.2,16,C.gr)}
 function drawLook(g){const C=A.col;if(st.round>=STORY.length){write(g,'Both causes found!',A.W/2,A.H*.4,16,C.gr);return}
  const[who,face,now,pans,cause]=STORY[st.round];glyph(g,face,A.W*.14,A.H*.14,Math.min(48,A.H*.16));write(g,`${who} is ${now}. Why?`,A.W*.58,A.H*.14,13,C.tx);
  pans.forEach(([e,t],i)=>{const r=panR(i),ok=st.sel===i&&i===cause;tile(g,r,st.bad===i?C.rd:ok?C.gr:C.mu,ok,.1);glyph(g,e,r.x+r.w/2,r.y+r.h*.2,Math.min(38,r.w*.4));
   wrap(g,t,{x:r.x,y:r.y+r.h*.38,w:r.w,h:r.h*.6},10,C.tx);write(g,['1','2','3'][i],r.x+14,r.y+14,10,C.tx)})}
 function drawBody(g){const C=A.col,calm=st.helped;glyph(g,calm?'🙂':'😠',A.W/2,A.H*.17,Math.min(56,A.H*.2));
  write(g,calm?'Ava feels calmer now.':'Ava is cross. Her sock is twisted!',A.W/2,A.H*.38,13,C.tx);
  [['😴','Sleep',.2],['🍽️','Tummy',.15]].forEach(([e,t,lv],i)=>{const r=meterR(i),seen=st.body[i],v=calm?.9:lv;tile(g,r,seen?(calm?C.gr:C.rd):C.or,!seen,.1);
   glyph(g,e,r.x+26,r.y+r.h*.5,26);write(g,t,r.x+r.w*.55,r.y+r.h*.28,11,C.tx);
   if(seen){const bx=r.x+52,bw=r.w-64,by=r.y+r.h*.5;g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(bx,by,bw,14);g.fillStyle=v>.5?'#16a34a':'#dc2626';g.fillRect(bx+2,by+2,(bw-4)*v,10);
    write(g,calm?'full':i?'empty':'very low',r.x+r.w*.55,r.y+r.h*.82,10,C.tx,700)}else write(g,'tap to check',r.x+r.w*.55,r.y+r.h*.7,10,C.tx,700)})}
 function drawMine(g){const C=A.col;FEEL.forEach(([e,t],i)=>{const r=feelR(i);tile(g,r,st.f===i?C.or:C.mu,st.f===i,.12);glyph(g,e,r.x+r.w/2,r.y+r.h*.38,Math.min(30,r.h*.45));write(g,t,r.x+r.w/2,r.y+r.h*.82,10,C.tx,700)});
  HAP.forEach((t,i)=>{const r=hapR2(i);tile(g,r,st.h===i?C.or:C.mu,st.h===i,.12);wrap(g,t,r,10,C.tx)});
  const s=`I feel ${st.f!=null?FEEL[st.f][1]:'…'} when ${st.h!=null?HAP[st.h]:'…'}.`;wrap(g,s,{x:8,y:A.H*.68,w:A.W-16,h:A.H*.12},12,C.tx);
  st.mine.forEach((m,i)=>write(g,'✓ '+m,A.W/2,A.H*(.85+i*.07),10,C.gr,700))}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.04:.3);g.fillRect(0,0,W,H);const v=mode();
  if(v==='match')drawMatch(g);if(v==='sort')drawSort(g);if(v==='look')drawLook(g);if(v==='body')drawBody(g);if(v==='mine')drawMine(g);
  if(v==='quiz')glyph(g,'💭',W/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 const free=()=>PEOPLE.map((p,i)=>i).filter(i=>!Object.values(st.m).includes(i));
 function give(i,j){if(i==null||st.m[j]!=null)return;st.held=null;st.at=null;
  if(i!==j){st.bad=j;st.sel=i;A.sound.miss();const[n,,feel]=PEOPLE[j];speak(`Would ${PEOPLE[i][3]} make ${n} feel ${feel}? Look for what fits ${feel}.`);buttons();return}
  st.m[j]=i;st.bad=null;st.sel=free()[0];A.sound.pop();const[n,,feel,hap]=PEOPLE[j];report(`${n} felt ${feel} because ${hap}.`)}
 function file(b){const k=st.k;if(k>=SORT.length)return;st.held=null;st.at=null;const[t,ok]=SORT[k];
  if(b!==ok){st.bad=b;A.sound.miss();speak(ok?`“${t}” is a feeling word. It is how you feel inside.`:`“${t}” is what happened. A feeling is a word like sad or glad.`);buttons();return}
  st.m[k]=b;st.k++;st.bad=null;A.sound.pop();report(ok?`Yes. ${t} is a feeling.`:`Yes. That is what happened, the trigger.`)}
 function look(i){if(st.round>=STORY.length||st.sel!=null&&st.sel===STORY[st.round][4])return;const[who,,,pans,cause,why]=STORY[st.round];
  if(i!==cause){st.bad=i;A.sound.miss();speak(i===2&&st.round===0?`Leo likes pasta, so lunch is not the cause. Look back earlier.`:`That did not make ${who} feel this way. Try another picture.`);A.redraw();return}
  st.sel=i;st.bad=null;A.sound.pop();speak('Yes! '+why);later([()=>{st.round++;st.sel=null;report()}],700)}
 function check(i){if(st.body[i])return;st.body[i]=1;A.sound.tick();report(i?'Her tummy is empty. Hunger can make feelings bigger.':'She slept badly. Being tired can make feelings bigger.')}
 function help(){if(st.helped||!st.body[0]||!st.body[1])return;st.helped=1;A.sound.pop();report('A snack and a rest. Now the sock is a small thing again.')}
 function addMine(){if(st.f==null||st.h==null)return;const s=`I feel ${FEEL[st.f][1]} when ${HAP[st.h]}.`;
  if(st.mine.some(m=>m.startsWith(`I feel ${FEEL[st.f][1]} `))){speak('You have that feeling already. Pick a different feeling.');return}
  st.mine.push(s);A.sound.pop();st.f=null;st.h=null;report(s+' That is one of your triggers.')}
 function report(msg){const v=mode();let t='';
  if(v==='match')t=free().length?`Still to match: ${free().map(i=>PEOPLE[i][3]).join('; ')}.`:'All matched.';
  else if(v==='sort')t=st.k<SORT.length?`Next card: ${SORT[st.k][0]}. Is it what happened, or a feeling?`:'All sorted.';
  else if(v==='look')t=st.round<STORY.length?`${STORY[st.round][0]} is ${STORY[st.round][2]}. Which picture shows the cause?`:'Both causes found.';
  else if(v==='body')t=st.helped?'':!st.body[0]||!st.body[1]?'Check her sleep and her tummy.':'Now give Ava a snack and a rest.';
  else if(v==='mine')t=st.mine.length<2?'Pick a feeling and what makes you feel it, then add it.':'Two sentences made.';else t='Challenge time.';
  speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if(v==='match'&&st.sel!=null)PEOPLE.forEach(([n,f,feel],j)=>{if(st.m[j]==null)b(`${f} ${n}`,()=>give(st.sel,j),`Give “${PEOPLE[st.sel][3]}” to ${n}, who feels ${feel}`)});
  if(v==='sort'&&st.k<SORT.length){b('🎬 What happened',()=>file(0));b('💗 Feeling',()=>file(1))}
  if(v==='look'&&st.round<STORY.length)STORY[st.round][3].forEach(([e],i)=>b(`${e} Picture ${i+1}`,()=>look(i)));
  if(v==='body'){if(!st.body[0])b('😴 Check sleep',()=>check(0));if(!st.body[1])b('🍽️ Check tummy',()=>check(1));if(st.body[0]&&st.body[1]&&!st.helped)b('🍎 Snack and rest',help)}
  if(v==='mine'&&st.f!=null&&st.h!=null)b('➕ Add my sentence',addMine);A.redraw()}

 // ---------- canvas input ----------
 function down(p){const v=mode();st.at=p;st.from=p;
  if(v==='match'){const i=free().find(i=>inside(p,hapR(i)));if(i!=null){st.held=i;st.sel=i;st.bad=null;buttons();return true}
   const j=[0,1,2].find(j=>inside(p,pplR(j)));if(j!=null&&st.sel!=null)give(st.sel,j);return false}
  if(v==='sort'){if(st.k<SORT.length&&inside(p,curR())){st.held=1;st.bad=null;A.redraw();return true}[0,1].forEach(b=>{if(inside(p,boxR(b)))file(b)});return false}
  if(v==='look'){[0,1,2].forEach(i=>{if(inside(p,panR(i)))look(i)});return false}
  if(v==='body'){[0,1].forEach(i=>{if(inside(p,meterR(i)))check(i)});if(p.y<A.H*.45)help();return false}
  if(v==='mine'){FEEL.forEach((f,i)=>{if(inside(p,feelR(i)))st.f=i});HAP.forEach((h,i)=>{if(inside(p,hapR2(i)))st.h=i});buttons();return false}
  return false}
 function up(p){const v=mode(),moved=st.from&&Math.hypot(p.x-st.from.x,p.y-st.from.y)>12;
  if(v==='match'&&st.held!=null){const i=st.held,j=[0,1,2].find(j=>inside(p,pplR(j)));st.held=null;st.at=null;if(moved&&j!=null)give(i,j);else report(`${PEOPLE[i][3]}. Now tap who it happened to.`)}
  if(v==='sort'&&st.held!=null){st.held=null;const b=[0,1].find(b=>inside(p,boxR(b)));st.at=null;if(moved&&b!=null)file(b);else speak('Tap a box, or drag the card in.');A.redraw()}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{st.tok++;st.onChange=()=>{};Object.assign(st,{m:{},sel:null,held:null,at:null,bad:null,k:0,round:0,body:{},helped:0,f:null,h:null,mine:[]})};
 const steps=[
  {h:'Felt it because…',p:'Something happened to each child. Drag it to who it happened to.',task:'Match 3 causes',
   show:()=>{steps[0].go();later([0,1,2].map(i=>()=>give(i,i)),500)},go:()=>{fresh();st.sel=0;report();st.onChange=whenDone(0,()=>!free().length,'Something happens, then we feel. That is the cause.')}},
  {h:'Happened or feeling?',p:'A trigger is what happens. A feeling is inside you. Sort each card.',
   predict:{q:'“My brother took my toy.” Is that a feeling?',opts:['Yes, it is a feeling','No, it is what happened'],ans:1},task:'Sort 6 cards',
   show:()=>{steps[1].go();later(SORT.map(x=>()=>file(x[1])),400)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>st.k>=SORT.length,'Took my toy is the trigger. Cross is the feeling.')}},
  {h:'Look back',p:'Look at the pictures from the day. Tap the one that caused the feeling.',
   predict:{q:'Leo is grumpy at lunch. What made him grumpy?',opts:['The lunch','Something before lunch'],ans:1},task:'Find 2 causes',
   show:()=>{steps[2].go();later(STORY.map(s=>()=>look(s[4])),900)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>st.round>=STORY.length,'The cause can come earlier, or be something coming up.')}},
  {h:'Tired and hungry',p:'Sometimes a cause is inside your body. Check Ava’s sleep and tummy.',
   predict:{q:'Ava is cross about a twisted sock. Can being tired make it feel bigger?',opts:['No, only the sock matters','Yes, it can'],ans:1},task:'Check and help Ava',
   show:()=>{steps[3].go();later([()=>check(0),()=>check(1),help],500)},go:()=>{fresh();report();st.onChange=whenDone(3,()=>st.helped,'Tired and hungry make feelings bigger.')}},
  {h:'My triggers',p:'Tap a feeling. Tap what makes you feel it. Add it. Make two.',task:'Make 2 sentences',
   show:()=>{steps[4].go();later([()=>{st.f=0;st.h=4;buttons()},addMine,()=>{st.f=3;st.h=3;buttons()},addMine],350)},go:()=>{fresh();report();st.onChange=whenDone(4,()=>st.mine.length>=2,'Knowing your triggers helps you get ready for them.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge ----------
 const QS=[['Sam felt scared. What was the trigger?','😨',[['A big dog barked at him','ok'],['He hid behind Dad','act'],['He was scared','feel']]],
  ['Finish it: “I felt sad because …”','😢',[['my balloon popped','ok'],['I cried','act'],['I was sad','feel']]],
  ['Why did Mia feel proud?','🧩',[['She finished her puzzle','ok'],['She smiled a big smile','act'],['Proud','feel']]],
  ['Leo is cross at bedtime. He slept badly last night. What can make it bigger?','😠',[['Being tired','ok'],['His blue pyjamas','odd'],['Nothing, feelings just happen','nowhere']]],
  ['Which one is a trigger?','🎬',[['My friend would not play with me','ok'],['lonely','feel'],['I stamped my feet','act']]],
  ['Zara feels excited at night. What is the cause?','🎂',[['Her party is tomorrow','ok'],['It is dark','odd'],['She is excited','feel']]]];
 function slip(tag){let m='Ask: what happened first?';
  if(tag==='feel')m='That is the feeling, not the cause. Ask: what happened first?';
  if(tag==='act')m='That is what they did after the feeling. The trigger came before.';
  if(tag==='nowhere')m='Feelings have causes. Look for what happened, or check tired and hungry.';
  if(tag==='odd')m='Would that make someone feel this way? Pick what fits the feeling.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
