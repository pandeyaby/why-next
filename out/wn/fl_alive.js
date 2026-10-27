/* Flagship – living and not living (ages 3–4, with a grown-up): sort things into alive and not alive; wait a few days
   and see which ones grow; give food and water and see who eats and drinks; switch on a toy robot that stops when its
   battery runs out, next to a worm that wriggles by itself; then sort the tricky ones (tree, robot, teddy, worm). */
(()=>{
 // [name, emoji, alive?, kind]  kind: a animal, p plant, m moving toy, l looks like an animal, o thing
 const T={dog:['dog','🐶',1,'a'],flower:['flower','🌻',1,'p'],rock:['rock','🪨',0,'o'],ball:['ball','⚽',0,'o'],
  robot:['toy robot','🤖',0,'m'],tree:['tree','🌳',1,'p'],worm:['worm','🪱',1,'a'],teddy:['teddy','🧸',0,'l']};
 const SORTS={sort:['dog','rock','flower','ball'],tricky:['robot','tree','teddy','worm']};
 // [name, emoji for day 0..3, alive?]
 const GROW=[['seed',['🌰','🌱','🌿','🌻'],1],['puppy',['🐶','🐶','🐕','🐕'],1],['toy car',['🚗','🚗','🚗','🚗'],0],['stone',['🪨','🪨','🪨','🪨'],0]];
 // [name, before, after, food, alive?, word]
 const FEED=[['cat','🐱','😺','🐟',1,'eats','fish'],['plant','🥀','🌷','💧',1,'drinks','water'],['teddy','🧸','🧸','🍪',0,'','cookie']];
 const WHY={a:'It eats and grows.',p:'It drinks water and grows.',m:'A battery makes it go. It cannot eat or grow.',l:'It looks like a bear, but it cannot eat or grow.',o:'It cannot eat, drink or grow.'};
VIS.reg('flagalive',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const st={done:{},sel:null,held:null,at:null,from:null,bad:null,day:0,fed:{},bot:null,worm:null,tok:0,onChange:()=>{}};
 const mode=()=>['sort','grow','feed','move','tricky','quiz'][A.step];
 const set=()=>SORTS[mode()]||[];
 const left=()=>set().filter(k=>st.done[k]==null);
 const cur=()=>left().includes(st.sel)?st.sel:left()[0];
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}

 // ---------- layout ----------
 const big=n=>A.narrow?n:Math.round(n*1.2);
 function shelfR(i){const n=4,gap=10,w=(A.W-gap*(n+1))/n,h=Math.min(96,A.H*.26);return{x:gap+i*(w+gap),y:A.H*.05,w,h}}
 function boxR(b){const gap=12,w=(A.W-gap*3)/2;return{x:gap+b*(w+gap),y:A.H*.44,w,h:A.H*.52}}
 const colR=(i,n)=>{const w=A.W/n;return{x:i*w,y:A.H*.12,w,h:A.H*.8}};
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function write(g,t,x,y,n,col,w){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function glyph(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function tile(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{font:`800 ${big(12)}px system-ui,sans-serif`,bg});

 // ---------- drawing ----------
 function drawSort(g){const C=A.col,k0=cur();
  [['🌱 Alive',C.gr],['🪨 Not alive',C.mu]].forEach(([t,col],b)=>{const r=boxR(b);tile(g,r,col,false,.12);write(g,t,r.x+r.w/2,r.y+22,14,C.tx);
   set().filter(k=>st.done[k]===b).forEach((k,j)=>glyph(g,T[k][1],r.x+r.w*(.28+(j%2)*.44),r.y+r.h*(.45+Math.floor(j/2)*.32),Math.min(46,r.h*.26)))});
  left().forEach(k=>{let r=shelfR(set().indexOf(k));if(st.held===k&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};
   tile(g,r,st.bad===k?C.rd:k===k0?C.or:C.mu,k===k0||st.held===k,.14);glyph(g,T[k][1],r.x+r.w/2,r.y+r.h*.42,Math.min(42,r.h*.46));write(g,T[k][0],r.x+r.w/2,r.y+r.h*.85,12,C.tx,700)});
  if(k0)write(g,`Where does the ${T[k0][0]} go?`,A.W/2,A.H*.37,14,C.tx);else write(g,'All sorted!',A.W/2,A.H*.37,15,C.gr)}
 function drawGrow(g){const C=A.col,gy=A.H*.82;g.fillStyle=A.alpha('#65a30d',.35);g.fillRect(0,gy,A.W,A.H-gy);
  write(g,st.day?`Day ${st.day}`:'Day 0: today',A.W/2,A.H*.08,15,C.tx);
  GROW.forEach(([n,em,live],i)=>{const r=colR(i,4),x=r.x+r.w/2,s=Math.min(r.w*.5,A.H*.16)*(live?1+st.day*.22:1);glyph(g,em[st.day],x,gy-s*.55,s);
   write(g,n,x,gy+A.H*.08,12,C.tx,700);if(st.day)pill(live?'grew!':'same',x,A.H*.22,live?'#047857':'#4b5563')})}
 function drawFeed(g){const C=A.col;FEED.forEach(([n,a,b,food,live,word],i)=>{const r=colR(i,3),x=r.x+r.w/2,fed=st.fed[i],s=Math.min(r.w*.5,A.H*.24);
   tile(g,{x:r.x+8,y:r.y,w:r.w-16,h:r.h},fed?(live?C.gr:C.rd):C.or,!fed,.1);glyph(g,fed&&live?b:a,x,r.y+r.h*.38,s);
   if(!fed||!live)glyph(g,food,fed?x+s*.55:x,fed?r.y+r.h*.62:r.y+r.h*.7,s*.45);write(g,n,x,r.y+r.h*.9,12,C.tx,700);
   if(fed)pill(live?word+'!':'cannot eat',x,r.y+r.h*.1,live?'#047857':'#b91c1c')})}
 function drawMove(g){const C=A.col,q=st.bot,w=st.worm,s=Math.min(A.W*.12,A.H*.17);
  [[.06,'Toy robot'],[.53,'Worm']].forEach(([y,t])=>{tile(g,{x:8,y:A.H*y,w:A.W-16,h:A.H*.41},C.mu,false,.08);write(g,t,A.W*.2,A.H*y+18,12,C.tx,700)});
  glyph(g,'🤖',q.x,A.H*.3,s);const bw=Math.min(90,A.W*.2),bx=A.W-bw-22,by=A.H*.1;g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(bx,by,bw,16);
  g.fillStyle=q.bat>.3?'#16a34a':'#dc2626';g.fillRect(bx+2,by+2,(bw-4)*q.bat,12);write(g,'🔋',bx-14,by+8,12,C.tx);
  if(q.ran&&!q.moving)pill('stopped: no battery',q.x,A.H*.42,'#b91c1c');
  glyph(g,'🍃',A.W*.86,A.H*.78,s*.8);glyph(g,'🪱',w.x,A.H*.78+Math.sin(w.x*.12)*(w.moving?8:0),s*.8);
  if(w.ran&&!w.moving)pill('moved by itself!',w.x,A.H*.64,'#047857')}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.35);g.fillRect(0,0,W,H);const v=mode();
  if(v==='sort'||v==='tricky')drawSort(g);if(v==='grow')drawGrow(g);if(v==='feed')drawFeed(g);if(v==='move')drawMove(g);
  if(v==='quiz')glyph(g,'🔍',W/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 function place(k,b){if(!k||st.done[k]!=null)return;const[n,,live,kind]=T[k];st.held=null;st.at=null;
  if((b===0)!==!!live){st.bad=k;st.sel=k;A.sound.miss();let m=`A ${n} cannot eat, drink or grow. It is not alive.`;
   if(live&&kind==='a')m=`A ${n} is alive! It eats and grows.`;if(live&&kind==='p')m=`Plants are alive! A ${n} drinks water and grows.`;
   if(kind==='m')m=`The ${n} moves, but a battery makes it go. It cannot eat or grow.`;if(kind==='l')m=`The ${n} looks like a bear, but it cannot eat or grow.`;
   speak('Not quite. '+m+' Try the other box.');buttons();return}
  st.done[k]=b;st.bad=null;st.sel=null;A.sound.pop();report(`Yes! The ${n} is ${live?'alive':'not alive'}. ${WHY[kind]}`)}
 function nextDay(){if(st.day>=3)return;st.day++;A.sound.tick();report(st.day===1?'One day later. The seed has a shoot. The puppy is a bit bigger. The car and the stone are the same.':st.day===2?'Two days later. The living things keep growing.':'Many days later! The seed is a flower and the puppy is a big dog. The car and the stone never grew.')}
 function feed(i){if(st.fed[i])return;st.fed[i]=1;const[n,,,,live,word,food]=FEED[i];A.sound[live?'pop':'miss']();
  report(live?`The ${n} ${word} it. ${i?'The plant stands up tall again.':'Yum!'} Living things need food and water.`:`The ${food} just sits there. A ${n} cannot eat. It is not alive.`)}
 function botGo(){const q=st.bot;if(q.ran||q.moving)return;q.moving=1;A.sound.whoosh();A.tween(q,{x:A.W*.72,bat:0},A.reduced()?1:1800,'io',()=>{q.moving=0;q.ran=1;report('The robot stopped. Its battery ran out. It cannot eat to get going again.')});speak('The robot walks while the battery lasts.')}
 function wormGo(){const w=st.worm;if(w.moving)return;w.moving=1;A.sound.tick();A.tween(w,{x:A.W*.72},A.reduced()?1:2000,'io',()=>{w.moving=0;w.ran=1;report('The worm wriggled to the leaf all by itself. Now it eats. Worms are alive.')});speak('The worm wriggles by itself.')}

 function report(msg){const v=mode();let t='';
  if(v==='sort'||v==='tricky')t=left().length?`Still to sort: ${left().map(k=>T[k][0]).join(', ')}. Next: the ${T[cur()][0]}.`:'All sorted.';
  else if(v==='grow')t=st.day<3?'Tap Next day.':'Living things grow. Things that are not alive stay the same.';
  else if(v==='feed'){const h=FEED.filter((f,i)=>!st.fed[i]).map(f=>f[0]);t=h.length?`Still to feed: ${h.join(', ')}.`:'Everyone has had food or water.'}
  else if(v==='move')t=(st.bot.ran?'':'Switch on the robot. ')+(st.worm.ran?'':'Watch the worm.');else t='Challenge time.';
  speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if((v==='sort'||v==='tricky')&&cur()){const k=cur(),n=T[k][0];b(`🌱 Alive`,()=>place(k,0),`The ${n} is alive`);b(`🪨 Not alive`,()=>place(k,1),`The ${n} is not alive`)}
  if(v==='grow'&&st.day<3)b('☀️ Next day',nextDay);
  if(v==='feed')FEED.forEach((f,i)=>{if(!st.fed[i])b(`${f[3]} Give the ${f[0]} ${f[6]}`,()=>feed(i))});
  if(v==='move'){if(!st.bot.ran)b('🔋 Switch on the robot',botGo);if(!st.worm.ran)b('🪱 Watch the worm',wormGo)}A.redraw()}

 // ---------- canvas input ----------
 function down(p){const v=mode();st.at=p;st.from=p;
  if(v==='grow'){nextDay();return false}
  if(v==='feed'){FEED.forEach((f,i)=>{if(inside(p,colR(i,3)))feed(i)});return false}
  if(v==='move'){if(p.y<A.H*.5)botGo();else wormGo();return false}
  if(v!=='sort'&&v!=='tricky')return false;
  const k=left().find(k=>inside(p,shelfR(set().indexOf(k))));
  if(k){st.held=k;st.sel=k;st.bad=null;A.redraw();return true}
  [0,1].forEach(b=>{if(inside(p,boxR(b)))place(cur(),b)});return false}
 function up(p){const k=st.held;if(!k)return;const moved=st.from&&Math.hypot(p.x-st.from.x,p.y-st.from.y)>12;st.held=null;st.at=null;
  const b=[0,1].find(b=>inside(p,boxR(b)));if(moved&&b!=null)place(k,b);else{report(`The ${T[k][0]}. Tap a box, or drag it in.`)}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const fresh=()=>{st.tok++;st.onChange=()=>{};st.done={};st.sel=null;st.held=null;st.bad=null;st.day=0;st.fed={};
  st.bot={x:A.W*.2,bat:1,moving:0,ran:0};st.worm={x:A.W*.2,moving:0,ran:0}};
 const sorts=()=>set().map(k=>()=>place(k,T[k][2]?0:1));
 const steps=[
  {h:'Alive or not?',p:'Is it alive? Drag each thing to a box, or tap a box.',task:'Sort 4 things',
   show:()=>{steps[0].go();later(sorts(),500)},go:()=>{fresh();report();st.onChange=whenDone(0,()=>!left().length,'A dog and a flower are alive. A rock and a ball are not.')}},
  {h:'Does it grow?',p:'Living things grow. Tap Next day and watch.',
   predict:{q:'We wait many days. Which one grows?',opts:['The toy car','The seed'],ans:1},task:'Wait 3 days',
   show:()=>{steps[1].go();later([nextDay,nextDay,nextDay],550)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>st.day>=3,'Living things grow. A toy car stays the same.')}},
  {h:'Food and water',p:'Living things need food and water. Give each one a snack.',task:'Feed all 3',
   show:()=>{steps[2].go();later([0,1,2].map(i=>()=>feed(i)),600)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>FEED.every((f,i)=>st.fed[i]),'The cat eats and the plant drinks. Teddy cannot.')}},
  {h:'It moves. Is it alive?',p:'Switch on the robot. Then watch the worm.',
   predict:{q:'A toy robot can walk. Is it alive?',opts:['Yes, it moves','No, it is not alive'],ans:1},task:'Try the robot and the worm',
   show:()=>{steps[3].go();later([botGo,wormGo],2100)},go:()=>{fresh();report();st.onChange=whenDone(3,()=>st.bot.ran&&st.worm.ran,'The robot needs a battery. The worm moves by itself.')}},
  {h:'Tricky ones',p:'Think: does it eat, drink and grow? Sort these.',
   predict:{q:'A tree stays still. Is it alive?',opts:['No, it never moves','Yes, it drinks and grows'],ans:1},task:'Sort the tricky 4',
   show:()=>{steps[4].go();later(sorts(),500)},go:()=>{fresh();report();st.onChange=whenDone(4,()=>!left().length,'Ask: does it eat or drink, and grow?')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge ----------
 const QS=[['A cat is asleep. It is not moving. Is it alive?','😴',[['Yes, it is alive','ok'],['No, it is still','still'],['Only when it runs','move']]],
  ['Which one is alive?','🔍',[['🐛 A caterpillar','ok'],['🚗 A toy car','move'],['🧸 A teddy','look']]],
  ['Which one is NOT alive?','🔍',[['🪨 A stone','ok'],['🌳 A tree','plant'],['🐟 A fish','animal']]],
  ['A toy robot walks across the floor. Is it alive?','🤖',[['No, a battery makes it go','ok'],['Yes, it moves','move'],['Yes, it has eyes','look']]],
  ['How do we know a flower is alive?','🌻',[['It drinks water and grows','ok'],['It is pretty','look'],['It is not, it stays still','plant']]],
  ['Which clue shows a puppy is alive?','🐶',[['It eats and grows','ok'],['It is soft','look'],['It is brown','look']]]];
 function slip(tag){let m='Ask: does it eat or drink, and grow?';
  if(tag==='still')m='Still things can be alive. A sleeping cat still breathes, eats and grows.';
  if(tag==='move')m='Moving is not enough. A toy moves with a battery, but it cannot eat or grow.';
  if(tag==='plant')m='Plants are alive. They drink water and grow, even if they stay still.';
  if(tag==='look')m='Looks do not tell you. Ask: does it eat or drink, and grow?';
  if(tag==='animal')m='A fish eats and grows. It is alive.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
