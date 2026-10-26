/* Flagship – animals and their babies (ages 2–3, with a grown-up): take each baby home to its mummy, give a grown-up
   animal's baby its name, grow a kitten into a cat and a chick into a hen, sort big and small, and find a baby and its
   mummy on a farm page. Babies are drawn as small copies so size is the clue. */
(()=>{const mn=Math.min;
 const Z={sheep:['🐑','sheep','lamb'],cow:['🐄','cow','calf'],cat:['🐈','cat','kitten'],duck:['🦆','duck','duckling'],dog:['🐕','dog','puppy'],hen:['🐔','hen','chick'],pig:['🐖','pig','piglet'],horse:['🐎','horse','foal']};
 const HOME=[['sheep',['cow','sheep','duck']],['cow',['cow','cat','sheep']],['cat',['dog','duck','cat']],['duck',['duck','hen','cow']]];
 const NAMES=[['dog',['kitten','puppy','calf']],['sheep',['calf','lamb','puppy']],['pig',['puppy','duckling','piglet']],['horse',['foal','kitten','chick']]];
 const BABYOF=Object.fromEntries(Object.keys(Z).map(k=>[Z[k][2],k]));
 const GROW=[['cat',['dog','cat','cow']],['hen',['hen','duck','sheep']]];
 const SORT=[['sheep',0],['cow',1],['hen',1],['pig',0],['cat',1],['horse',0]];
 const PAGE=['cow','sheep','hen','cow*','sheep*','hen*'],HUNT=[['sheep',4,1],['hen',5,2],['cow',3,0]];
VIS.reg('flagbaby',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const st={r:0,pick:null,bad:null,grab:null,at:null,size:0,ask:0,gi:0,si:0,hunt:0,half:0,cb:()=>{},tok:0,emo:null};
 const tell=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const which=()=>['home','names','grow','sort','hunt','quiz'][A.step];
 const fs=n=>A.narrow?n:n+3;
 function txt(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function card(g,r,col,strong,fill){g.fillStyle=A.alpha(col,fill||.15);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=col;g.lineWidth=strong?4:2;g.stroke()}
 const hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const oops=t=>{A.sound.miss();tell(t);A.redraw()};
 const three=i=>{const g=10,w=(A.W-4*g)/3,h=mn(118,A.H*.32);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const topCard=()=>{const w=mn(150,A.W*.4),h=mn(118,A.H*.32);return{x:A.W/2-w/2,y:A.H*.06,w,h}};
 const halves=i=>{const g=12,w=(A.W-3*g)/2,h=mn(150,A.H*.4);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const cell=i=>{const g=10,w=(A.W-4*g)/3,h=mn(112,A.H*.34);return{x:g+(i%3)*(w+g),y:A.H*.2+Math.floor(i/3)*(h+g),w,h}};
 function beast(g,k,baby,x,y,big){const n=Math.round(big*(baby?.58:1));g.fillStyle='#000';g.font=`${n}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(Z[k][0],x,y)}
 function tile(g,r,k,baby,col,strong){card(g,r,col,strong,.12);beast(g,k,baby,r.x+r.w/2,r.y+r.h*.44,mn(r.h*.66,80));txt(g,baby?Z[k][2]:Z[k][1],r.x+r.w/2,r.y+r.h*.86,12,A.col.tx)}
 function homeV(g){const C=A.col;if(st.r>=4)return txt(g,'Every baby is home with its mummy!',A.W/2,A.H*.4,15,C.gr);const[kid,opts]=HOME[st.r];
  let r=topCard();if(st.grab!=null&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};tile(g,r,kid,1,C.pk,1);
  txt(g,`Who is the ${Z[kid][2]}'s mummy?`,A.W/2,A.H*.5,15,C.tx);opts.forEach((k,i)=>tile(g,three(i),k,0,st.bad===i?C.rd:C.cy,st.bad===i));
  txt(g,`Babies home: ${st.r} of 4`,A.W/2,A.H*.58,12,C.mu,700)}
 function namesV(g){const C=A.col;if(st.r>=4)return txt(g,'You know four baby names!',A.W/2,A.H*.4,15,C.gr);const[k,ws]=NAMES[st.r],r=topCard();
  tile(g,r,k,0,C.cy,1);txt(g,`A baby ${Z[k][1]} is called...`,A.W/2,A.H*.5,15,C.tx);
  ws.forEach((w,i)=>{const b=three(i);card(g,b,st.bad===i?C.rd:C.vi,st.bad===i);beast(g,BABYOF[w],1,b.x+b.w/2,b.y+b.h*.4,mn(b.h*.6,64));txt(g,w,b.x+b.w/2,b.y+b.h*.84,14,C.tx)})}
 function growV(g){const C=A.col;if(st.gi>=2)return txt(g,'Babies grow up into grown-ups like their mummy.',A.W/2,A.H*.4,14,C.gr);const[k,ops]=GROW[st.gi],big=mn(A.H*.5,170),s=.5+st.size*.25;
  g.fillStyle='#000';g.font=`${Math.round(big*s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(Z[k][0],A.W/2,A.H*.3);
  txt(g,st.size<2?`A ${Z[k][2]}. Size: ${['tiny','bigger'][st.size]}`:'All grown up!',A.W/2,A.H*.56,14,C.tx);
  if(st.size<2){const r={x:A.W*.15,y:A.H-mn(70,A.H*.18)-12,w:A.W*.7,h:mn(70,A.H*.18)};card(g,r,C.gr,1,.22);txt(g,'🌱 Grow a bit',A.W/2,r.y+r.h/2,16,C.tx);return}
  txt(g,`What is the ${Z[k][2]} now?`,A.W/2,A.H*.64,14,C.tx);ops.forEach((o,i)=>{const b=three(i),r={...b,y:b.y+b.h*.35,h:b.h*.65};card(g,r,st.bad===i?C.rd:C.vi,st.bad===i);txt(g,'a '+Z[o][1],r.x+r.w/2,r.y+r.h/2,15,C.tx)})}
 function sortV(g){const C=A.col;[0,1].forEach(i=>{const r=halves(i);card(g,r,i?C.cy:C.pk,st.grab!=null,.1);txt(g,i?'Grown-ups':'Babies',r.x+r.w/2,r.y+r.h*.2,16,C.tx);
   SORT.slice(0,st.si).forEach(([k,big],j)=>{if(big!==i)return;const n=SORT.slice(0,j).filter(s=>s[1]===i).length;beast(g,k,!big,r.x+r.w*(.2+.3*(n%3)),r.y+r.h*(n<3?.5:.8),r.h*.32)})});
  if(st.si>=6)return txt(g,'Small babies, big grown-ups. All sorted!',A.W/2,A.H*.12,15,C.gr);const[k,big]=SORT[st.si];let r=topCard();if(st.grab!=null&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};
  tile(g,r,k,!big,st.bad!=null?C.rd:C.or,1)}
 function huntV(g){const C=A.col;if(st.hunt>=3)return txt(g,'You found each baby and its mummy!',A.W/2,A.H*.4,15,C.gr);const[k]=HUNT[st.hunt];
  txt(g,st.half?`Now tap the ${Z[k][2]}'s mummy.`:`Tap the ${Z[k][2]}.`,A.W/2,A.H*.09,16,C.tx);
  PAGE.forEach((p,i)=>{const r=cell(i),b=p.endsWith('*'),kk=p.replace('*','');card(g,r,st.bad===i?C.rd:C.gr,st.bad===i,.1);beast(g,kk,b,r.x+r.w/2,r.y+r.h/2,mn(r.h*.7,74))})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.5);g.fillRect(0,0,W,H);
  const f={home:homeV,names:namesV,grow:growV,sort:sortV,hunt:huntV}[which()];if(f)f(g);else txt(g,st.emo||'🐣',W/2,H/2,60,C.tx);A.fx.draw(g)}
 function goHome(i){if(st.r>=4)return;const[kid,opts]=HOME[st.r],k=opts[i];if(k!==kid){st.bad=i;return oops(`That is a ${Z[k][1]}. A ${Z[k][1]}'s baby is a ${Z[k][2]}. Look for a big ${Z[kid][1]}.`)}
  st.bad=null;st.r++;A.sound.pop();say(`Yes! The ${Z[kid][2]} is a baby ${Z[kid][1]}.`)}
 function nameIt(i){if(st.r>=4)return;const[k,ws]=NAMES[st.r],w=ws[i];if(w!==Z[k][2]){st.bad=i;return oops(`A ${w} is a baby ${Z[BABYOF[w]][1]}. Which name is for a baby ${Z[k][1]}?`)}
  st.bad=null;st.r++;A.sound.pop();say(`Yes! A baby ${Z[k][1]} is a ${w}.`)}
 function grow(){if(st.gi>=2||st.size>=2)return;st.size++;A.sound.tick();say(st.size>=2?'It grew up!':'It is getting bigger.')}
 function grownIs(i){if(st.gi>=2||st.size<2)return;const[k,ops]=GROW[st.gi];if(ops[i]!==k){st.bad=i;return oops(`A ${Z[k][2]} does not grow into a ${Z[ops[i]][1]}. It grows into a ${Z[k][1]}, like its mummy.`)}
  st.bad=null;st.gi++;st.size=0;A.sound.pop();say(`Yes! A ${Z[k][2]} grows into a ${Z[k][1]}.`)}
 function sortTo(b){if(st.si>=6)return;const[k,big]=SORT[st.si];if(b!==big){st.bad=1;return oops(big?`This ${Z[k][1]} is big. It is a grown-up. Its baby is the ${Z[k][2]}.`:`The ${Z[k][2]} is small. It is a baby. It will grow into a ${Z[k][1]}.`)}
  st.bad=null;st.si++;A.sound.pop();say(big?`The ${Z[k][1]} is a grown-up.`:`The ${Z[k][2]} is a baby.`)}
 function tapPage(i){if(st.hunt>=3)return;const[k,bi,mi]=HUNT[st.hunt],p=PAGE[i],nm=p.endsWith('*')?Z[p.replace('*','')][2]:Z[p][1];
  if(!st.half){if(i!==bi){st.bad=i;return oops(p.endsWith('*')?`That is a ${nm}, a baby ${Z[p.replace('*','')][1]}. Find the ${Z[k][2]}.`:`That is a big ${nm}. A baby is small. Find the ${Z[k][2]}.`)}st.bad=null;st.half=1;A.sound.tick();return say(`You found the ${Z[k][2]}!`)}
  if(i!==mi){st.bad=i;return oops(i===bi?`That is the ${Z[k][2]} again. Find the big animal it grows into.`:`That is a ${nm}. The ${Z[k][2]}'s mummy is a ${Z[k][1]}.`)}st.bad=null;st.half=0;st.hunt++;A.sound.pop();say(`Yes! The ${Z[k][1]} is the ${Z[k][2]}'s mummy.`)}
 function say(msg){const v=which();let t;
  if(v==='home')t=st.r>=4?'All four babies are home.':`Baby: ${Z[HOME[st.r][0]][2]}. Grown-ups: ${HOME[st.r][1].map(k=>Z[k][1]).join(', ')}.`;
  else if(v==='names')t=st.r>=4?'Four baby names found.':`Grown-up: ${Z[NAMES[st.r][0]][1]}. Names: ${NAMES[st.r][1].join(', ')}.`;
  else if(v==='grow')t=st.gi>=2?'Both babies grew up.':st.size<2?`A ${Z[GROW[st.gi][0]][2]}, ${['tiny','bigger'][st.size]}. Tap grow.`:`What is it now? ${GROW[st.gi][1].map(k=>'a '+Z[k][1]).join(', ')}.`;
  else if(v==='sort')t=st.si>=6?'All six animals sorted.':`Sort the ${SORT[st.si][1]?Z[SORT[st.si][0]][1]:Z[SORT[st.si][0]][2]}: baby or grown-up? ${st.si} of 6 done.`;
  else if(v==='hunt')t=st.hunt>=3?'Found all three.':`Farm page: cow, sheep, hen, calf, lamb, chick. ${st.half?'Tap the mummy of the '+Z[HUNT[st.hunt][0]][2]:'Tap the '+Z[HUNT[st.hunt][0]][2]}.`;else t='Challenge time.';
  tell((msg?msg+' ':'')+t);buttons();st.cb()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=which();
  const b=(t,f,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.onclick=f};
  if(v==='home'&&st.r<4)HOME[st.r][1].forEach((k,i)=>b(Z[k][0]+' '+Z[k][1],()=>goHome(i),'Take the baby to the '+Z[k][1]));
  if(v==='names'&&st.r<4)NAMES[st.r][1].forEach((w,i)=>b(w,()=>nameIt(i)));
  if(v==='grow'&&st.gi<2){if(st.size<2)b('🌱 Grow a bit',grow);else GROW[st.gi][1].forEach((o,i)=>b('a '+Z[o][1],()=>grownIs(i)))}
  if(v==='sort'&&st.si<6){b('Baby',()=>sortTo(0));b('Grown-up',()=>sortTo(1))}
  if(v==='hunt'&&st.hunt<3)PAGE.forEach((p,i)=>{const bb=p.endsWith('*'),k=p.replace('*','');b(Z[k][0]+' '+(bb?Z[k][2]:Z[k][1]),()=>tapPage(i),'Tap the '+(bb?Z[k][2]:Z[k][1]))});A.redraw()}
 const fin=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m()+A.reveal(n))};
 const auto=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{st.tok++;st.cb=()=>{};st.emo=null;st.grab=null;st.at=null;st.bad=null};
 const steps=[
  {h:'Take baby home',p:'Each baby needs its mummy. Drag the baby to its grown-up, or tap the grown-up.',
   predict:{q:'A lamb is a baby. Who is its mummy?',opts:['A cow','A sheep'],ans:1},task:'Take four babies home',
   show:()=>{steps[0].go();auto([()=>goHome(1),()=>goHome(0),()=>goHome(2),()=>goHome(0)],350)},go:()=>{reset();st.r=0;say();st.cb=fin(0,()=>st.r>=4,()=>'A baby is a small one of the same animal.')}},
  {h:'Baby names',p:'Baby animals have their own names. Pick the name for this baby.',
   predict:{q:'What do we call a baby dog?',opts:['A kitten','A puppy'],ans:1},task:'Name four babies',
   show:()=>{steps[1].go();auto([()=>nameIt(1),()=>nameIt(1),()=>nameIt(2),()=>nameIt(0)],350)},go:()=>{reset();st.r=0;say();st.cb=fin(1,()=>st.r>=4,()=>'Puppy, lamb, piglet and foal: each baby has a name.')}},
  {h:'Watch it grow',p:'Babies grow. Tap grow and see what the baby turns into.',
   predict:{q:'The kitten grows and grows. What will it be?',opts:['A dog','A cat'],ans:1},task:'Grow the kitten and the chick',
   show:()=>{steps[2].go();auto([grow,grow,()=>grownIs(1),grow,grow,()=>grownIs(0)],320)},go:()=>{reset();st.gi=0;st.size=0;say();st.cb=fin(2,()=>st.gi>=2,()=>'A kitten grows into a cat. A chick grows into a hen.')}},
  {h:'Big and small',p:'Is it a baby or a grown-up? Drag it to a box, or tap a button.',task:'Sort six animals',
   show:()=>{steps[3].go();auto(SORT.map(s=>()=>sortTo(s[1])),320)},go:()=>{reset();st.si=0;say();st.cb=fin(3,()=>st.si>=6,()=>'Babies are small. Grown-ups are big.')}},
  {h:'Find them in a book',p:'Look at the farm page. Find the baby, then find its mummy.',task:'Find three babies and their mummies',
   show:()=>{steps[4].go();auto(HUNT.flatMap(h=>[()=>tapPage(h[1]),()=>tapPage(h[2])]),320)},go:()=>{reset();st.hunt=0;st.half=0;say();st.cb=fin(4,()=>st.hunt>=3,()=>'Lamb and sheep, chick and hen, calf and cow.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.cb()});
 const QS=[['Who is the calf\'s mummy?','🐄',[['A cow','ok'],['A cat','name'],['A hen','name2']]],
  ['What will a puppy grow into?','🐕',[['A dog','ok'],['A cat','swap'],['It stays a puppy','stay']]],
  ['Which one is the baby?','🐑',[['The small lamb','ok'],['The big sheep','size'],['They are both babies','both']]],
  ['A duckling grows up. What is it now?','🦆',[['A duck','ok'],['A hen','bird'],['A bigger duckling','stay2']]],
  ['What is a baby cat called?','🐈',[['A kitten','ok'],['A puppy','swap2'],['A cat','same']]],
  ['A chick hatches. Who is its mummy?','🐔',[['A hen','ok'],['A duck','bird2'],['A cow','name3']]]];
 let qn=-1,run=0;
 function ask(){qn++;const[q,emo,ops]=QS[qn%QS.length],sh=qn%3;st.emo=emo;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,o);e.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'name':m='A cat\'s baby is a kitten. A calf is a baby cow.';break;
   case 'name2':m='A hen\'s baby is a chick. A calf is a baby cow.';break;
   case 'name3':m='A cow\'s baby is a calf. A chick comes from a hen.';break;
   case 'swap':m='Puppies grow into dogs. Kittens grow into cats.';break;
   case 'swap2':m='A puppy is a baby dog. A baby cat is a kitten.';break;
   case 'stay':m='Babies do not stay small. A puppy grows into a dog.';break;
   case 'stay2':m='It is all grown up now, so it is a duck, like its mummy.';break;
   case 'size':m='The big one is the grown-up. The baby is the small one.';break;
   case 'both':m='Look at the size. The small lamb is the baby. The big sheep is its mummy.';break;
   case 'bird':m='Ducklings grow into ducks, not hens. Chicks grow into chickens.';break;
   case 'bird2':m='A duck\'s baby is a duckling. A chick\'s mummy is a hen.';break;
   default:m='Look again: each baby grows into its own kind of animal.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=which();st.grab=null;st.at=null;
  if(v==='home'&&st.r<4){const i=[0,1,2].find(i=>hit(p,three(i)));if(i!=null){goHome(i);return false}if(hit(p,topCard())){st.grab=1;return true}return false}
  if(v==='names'&&st.r<4){const i=[0,1,2].find(i=>hit(p,three(i)));if(i!=null)nameIt(i);return false}
  if(v==='grow'&&st.gi<2){if(st.size<2){if(p.y>A.H*.6)grow()}else{const i=[0,1,2].find(i=>hit(p,three(i)));if(i!=null)grownIs(i)}return false}
  if(v==='sort'&&st.si<6){if(hit(p,topCard())){st.grab=1;return true}const i=[0,1].find(i=>hit(p,halves(i)));if(i!=null)sortTo(i);return false}
  if(v==='hunt'&&st.hunt<3){const i=PAGE.findIndex((x,i)=>hit(p,cell(i)));if(i>=0)tapPage(i)}return false}
 function up(p){const v=which(),had=st.grab;st.grab=null;st.at=null;if(had==null)return A.redraw();
  if(v==='home'){const i=[0,1,2].find(i=>hit(p,three(i)));if(i!=null)goHome(i);else A.redraw()}
  else if(v==='sort'){const i=[0,1].find(i=>hit(p,halves(i)));if(i!=null)sortTo(i);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
