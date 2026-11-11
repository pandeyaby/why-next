/* Flagship – all about me and my family (ages 2–3, with a grown-up): answer a new friend's questions with your name,
   age and who lives with you, put the right number of candles on birthday cakes, visit three different homes, fill your
   own home with the people (and pets) who live there, and put the things that make you special on a star. */
(()=>{const mn=Math.min;
 const ASKS=[['What is your name?',[['I am Mia.','name'],['I am 3.','age'],['Yes!','yes']],0],
  ['How old are you?',[['I like cake.','like'],['I am 3.','age'],['I am Mia.','name']],1],
  ['Who lives at your house?',[['I am 3.','age'],['Red!','yes'],['My mum and my gran.','home']],2]];
 const ASKWHY={name:'That tells Bo your name.',age:'That tells Bo how old you are.',yes:'That does not tell Bo anything about you.',like:'That is something you like. Bo asked how old you are.',home:'That tells Bo who lives with you.'};
 const CAKES=[['Mia','👧',3],['baby Sam','👶',1],['Leo','👦',2]];
 const HOMES=[['Mia\'s home',[['👩','Mum'],['👵','Gran'],['👧','Mia']]],['Leo\'s home',[['👨','Dad'],['🧔','Papa'],['👦','Leo'],['👶','baby Kit']]],['Ava\'s home',[['👩','Mum'],['👨','Dad'],['👧','big sister'],['🐶','Rex the dog'],['🧒','Ava']]]];
 const FOLK=[['👩','Mum'],['👨','Dad'],['👵','Gran'],['👴','Grandad'],['👦','brother'],['👧','sister'],['👶','baby'],['🐱','my cat']];
 const STARS=[['🐇','I can hop'],['❤️','I like red'],['🎵','I can sing'],['🌀','I have curly hair'],['🧩','I can do puzzles']];
VIS.reg('flagfam',c=>{let A,keys,quiz,aloud;c.fig.classList.add('young');
 const st={q:0,bad:null,ck:0,n:0,seen:[],open:-1,mine:[],said:0,star:[],asked:0,cb:()=>{},tok:0,face:null,lift:null,pos:null};
 const voice=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(aloud)aloud.textContent=t}};
 const part=()=>['hello','cake','homes','mine','star','quiz'][A.step];
 const big=n=>A.narrow?n:n+3;
 function write(g,t,x,y,n,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function pic(g,e,x,y,n){g.fillStyle='#000';g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
 function pill(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const on=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const wrong=t=>{A.sound.miss();voice(t);A.redraw()};
 const row=(i,n,y,h)=>{const g=10,w=(A.W-(n+1)*g)/n;return{x:g+i*(w+g),y,w,h}};
 const ans3=i=>{const h=mn(54,A.H*.13);return{x:A.W*.08,y:A.H*.47+i*(h+8),w:A.W*.84,h}};
 const line=i=>{const h=mn(58,A.H*.14);return{x:A.W*.08,y:A.H*.42+i*(h+10),w:A.W*.84,h}};
 const cakeR=()=>({x:A.W*.2,y:A.H*.34,w:A.W*.6,h:A.H*.3});
 const twin=i=>{const h=mn(60,A.H*.15);return row(i,2,A.H-h-12,h)};
 const houseR=i=>row(i,3,A.H*.1,mn(150,A.H*.4));
 const myHouse=()=>({x:A.W*.08,y:A.H*.06,w:A.W*.84,h:A.H*.42});
 const chip=(i,n)=>{const h=mn(64,A.H*.16),k=Math.ceil(n/2);return row(i%k,k,A.H*.54+Math.floor(i/k)*(h+8),h)};
 function helloV(g){const C=A.col;if(st.q>=3)return write(g,'Bo knows your name, your age and who lives with you!',A.W/2,A.H*.4,14,C.gr);const[q,ops]=ASKS[st.q];
  pic(g,'🐻',A.W*.16,A.H*.17,mn(70,A.H*.2));pill(g,{x:A.W*.3,y:A.H*.07,w:A.W*.64,h:A.H*.22},C.cy,0,.14);write(g,q,A.W*.62,A.H*.18,15,C.tx);
  ops.forEach((o,i)=>{const r=line(i);pill(g,r,st.bad===i?C.rd:C.vi,st.bad===i);write(g,o[0],r.x+r.w/2,r.y+r.h/2,16,C.tx)})}
 function cakeV(g){const C=A.col;if(st.ck>=3)return write(g,'Three cakes, three right ages!',A.W/2,A.H*.4,15,C.gr);const[who,e,age]=CAKES[st.ck],r=cakeR();
  pic(g,e,A.W*.12,A.H*.13,mn(56,A.H*.15));write(g,`${who} is ${age}.`,A.W/2,A.H*.12,17,C.tx);write(g,'Tap the cake to add a candle.',A.W/2,A.H*.22,12,C.mu,700);
  g.fillStyle='#f9a8d4';A.paint.rrect(r.x,r.y+r.h*.35,r.w,r.h*.65,14);g.fill();g.fillStyle='#fde68a';g.fillRect(r.x,r.y+r.h*.35,r.w,r.h*.12);
  for(let k=0;k<st.n;k++){const x=r.x+r.w*(k+1)/(st.n+1);g.fillStyle='#60a5fa';g.fillRect(x-5,r.y+r.h*.05,10,r.h*.3);pic(g,'🔥',x,r.y,22)}
  write(g,`Candles: ${st.n}`,A.W/2,r.y+r.h*.72,16,'#1f2937');[['Take one off',C.or],['That is right',C.gr]].forEach(([t,col],i)=>{const b=twin(i);pill(g,b,col,1);write(g,t,b.x+b.w/2,b.y+b.h/2,14,C.tx)})}
 function homesV(g){const C=A.col;HOMES.forEach((h,i)=>{const r=houseR(i),seen=st.seen.includes(i);pill(g,r,st.open===i?C.or:seen?C.gr:C.cy,st.open===i,.12);pic(g,'🏠',r.x+r.w/2,r.y+r.h*.4,mn(r.h*.45,60));write(g,h[0],r.x+r.w/2,r.y+r.h*.82,11,C.tx)});
  if(st.open<0)return write(g,st.seen.length>=3?'Three homes, three different families.':'Tap a home to see who lives there.',A.W/2,A.H*.66,14,st.seen.length>=3?C.gr:C.mu);
  const ppl=HOMES[st.open][1];ppl.forEach((p,j)=>{const r=row(j,ppl.length,A.H*.56,mn(110,A.H*.3));pill(g,r,C.vi,0,.1);pic(g,p[0],r.x+r.w/2,r.y+r.h*.4,mn(r.w*.6,52));write(g,p[1],r.x+r.w/2,r.y+r.h*.82,10,C.tx)})}
 function mineV(g){const C=A.col,h=myHouse();pill(g,h,C.or,st.lift!=null,.1);write(g,st.said?'This is my home!':'🏠 My home',h.x+h.w/2,h.y+20,14,st.said?C.gr:C.tx);
  ['🧒'].concat(st.mine.map(i=>FOLK[i][0])).forEach((e,j,a)=>pic(g,e,h.x+h.w*(j+1)/(a.length+1),h.y+h.h*.55,mn(48,h.w/(a.length+1)*.8)));
  FOLK.forEach((f,i)=>{if(st.mine.includes(i))return;let r=chip(i,FOLK.length);if(st.lift===i&&st.pos)r={...r,x:st.pos.x-r.w/2,y:st.pos.y-r.h/2};pill(g,r,C.cy,0,.12);pic(g,f[0],r.x+r.w/2,r.y+r.h*.38,26);write(g,f[1],r.x+r.w/2,r.y+r.h*.8,10,C.tx)})}
 function starV(g){const C=A.col;pic(g,'⭐',A.W*.5,A.H*.17,mn(100,A.H*.27));st.star.forEach((i,j)=>pic(g,STARS[i][0],A.W*(.42+.16*j),A.H*.19,28));
  if(st.star.length<2){write(g,`Pick what makes you special: ${st.star.length} of 2`,A.W/2,A.H*.42,13,C.tx);STARS.forEach((s,i)=>{if(st.star.includes(i))return;const r=chip(i,STARS.length);pill(g,r,C.pk,0,.12);pic(g,s[0],r.x+r.w/2,r.y+r.h*.36,24);write(g,s[1],r.x+r.w/2,r.y+r.h*.8,10,C.tx)});return}
  if(st.asked)return write(g,'You are special. Bo is special too!',A.W/2,A.H*.5,15,C.gr);
  write(g,'🐻 Bo says: "I like blue, not red."',A.W/2,A.H*.34,13,C.tx);write(g,'Who is right?',A.W/2,A.H*.41,15,C.tx);
  ['Both of us','Only me','Only Bo'].forEach((t,i)=>{const r=ans3(i);pill(g,r,st.bad===i?C.rd:C.vi,st.bad===i);write(g,t,r.x+r.w/2,r.y+r.h/2,15,C.tx)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.5);g.fillRect(0,0,W,H);
  const f={hello:helloV,cake:cakeV,homes:homesV,mine:mineV,star:starV}[part()];if(f)f(g);else pic(g,st.face||'🏠',W/2,H/2,64);A.fx.draw(g)}
 function reply(i){if(st.q>=3)return;const[q,ops,ok]=ASKS[st.q];if(i!==ok){st.bad=i;return wrong(`${ASKWHY[ops[i][1]]} Bo asked: ${q}`)}st.bad=null;st.q++;A.sound.pop();tell2('Bo smiles. Nice to meet you!')}
 function candle(){if(st.ck>=3)return;if(st.n>=6)return wrong('That is lots of candles! Take some off.');st.n++;st.bad=null;A.sound.tick();tell2('')}
 function unCandle(){if(st.ck>=3||!st.n)return;st.n--;st.bad=null;A.sound.tick();tell2('')}
 function cakeDone(){if(st.ck>=3)return;const[who,,age]=CAKES[st.ck];if(st.n!==age){st.bad=1;return wrong(st.n>age?`Too many! ${who} is ${age}, so ${age} candle${age>1?'s':''}. Take ${st.n-age} off.`:`Not yet. ${who} is ${age}. Add ${age-st.n} more.`)}
  st.bad=null;st.ck++;st.n=0;A.sound.pop();tell2(`Yes! ${age} candle${age>1?'s':''} for ${who}.`)}
 function visit(i){st.open=i;if(!st.seen.includes(i))st.seen.push(i);A.sound.tick();tell2(`${HOMES[i][0]}: ${HOMES[i][1].map(p=>p[1]).join(', ')}. That is a family.`)}
 function addIn(i){if(st.mine.includes(i)||st.said)return;st.mine.push(i);A.sound.pop();tell2(i===7?'Pets can be part of home too.':`${FOLK[i][1]} lives with you.`)}
 function sayHome(){if(st.said)return;if(!st.mine.length)return wrong('Your home is empty. Who lives with you? Add them first.');st.said=1;A.sound.pop();tell2('At my home: me, '+st.mine.map(i=>FOLK[i][1]).join(', ')+'.')}
 function pickStar(i){if(st.star.includes(i)||st.star.length>=2)return;st.star.push(i);A.sound.pop();tell2(STARS[i][1]+'! That is special about you.')}
 function whoRight(i){if(st.asked||st.star.length<2)return;if(i){st.bad=i;return wrong(i===1?'You like red. Bo likes blue. Liking something different does not make Bo wrong.':'Bo likes blue and you like red. You are not wrong for being different.')}st.bad=null;st.asked=1;A.sound.pop();tell2('Yes! People like different things, and that is OK.')}
 function tell2(msg){const v=part();let t;
  if(v==='hello')t=st.q>=3?'All three questions answered.':`Bo asks: ${ASKS[st.q][0]} Answers: ${ASKS[st.q][1].map(o=>o[0]).join(' / ')}`;
  else if(v==='cake')t=st.ck>=3?'All three cakes done.':`${CAKES[st.ck][0]} is ${CAKES[st.ck][2]}. Candles on the cake: ${st.n}.`;
  else if(v==='homes')t=`Homes visited: ${st.seen.length} of 3.`;
  else if(v==='mine')t=st.said?'Your home is done.':`In my home: me${st.mine.map(i=>', '+FOLK[i][1]).join('')}. Add who lives with you, then say it.`;
  else if(v==='star')t=st.star.length<2?`Special things picked: ${st.star.length} of 2.`:st.asked?'Star finished.':'Bo likes blue, you like red. Who is right?';else t='Challenge time.';
  voice((msg?msg+' ':'')+t);pads();st.cb()}
 function pads(){if(!A||!keys)return;keys.innerHTML='';const v=part();
  const b=(t,f,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},keys,t);e.onclick=f};
  if(v==='hello'&&st.q<3)ASKS[st.q][1].forEach((o,i)=>b(o[0],()=>reply(i)));
  if(v==='cake'&&st.ck<3){b('🕯️ Add a candle',candle);b('Take one off',unCandle);b('That is right',cakeDone)}
  if(v==='homes')HOMES.forEach((h,i)=>b('🏠 '+h[0],()=>visit(i)));
  if(v==='mine'&&!st.said){FOLK.forEach((f,i)=>{if(!st.mine.includes(i))b(f[0]+' '+f[1],()=>addIn(i),'Put '+f[1]+' in my home')});b('This is my home',sayHome)}
  if(v==='star'&&!st.asked){if(st.star.length<2)STARS.forEach((s,i)=>{if(!st.star.includes(i))b(s[0]+' '+s[1],()=>pickStar(i))});else['Both of us','Only me','Only Bo'].forEach((t,i)=>b(t,()=>whoRight(i)))}A.redraw()}
 const ready=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m()+A.reveal(n))};
 const seq=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const clear=()=>{st.tok++;st.cb=()=>{};st.face=null;st.lift=null;st.pos=null;st.bad=null};
 const steps=[
  {h:'Hello, Bo!',p:'Bo the bear wants to know you. Tap the answer that fits his question.',
   predict:{q:'Bo asks, "What is your name?" What do you say?',opts:['I am 3.','I am Mia.'],ans:1},task:'Answer all three of Bo\'s questions',
   show:()=>{steps[0].go();seq([()=>reply(0),()=>reply(1),()=>reply(2)],400)},go:()=>{clear();st.q=0;tell2();st.cb=ready(0,()=>st.q>=3,()=>'Your name, your age and who lives with you: that is all about you.')}},
  {h:'How old?',p:'Put one candle on the cake for each year. Tap the cake to add one.',
   predict:{q:'Mia is 3. How many candles go on her cake?',opts:['Lots and lots','3 candles'],ans:1},task:'Make all three cakes right',
   show:()=>{steps[1].go();seq([candle,candle,candle,cakeDone,candle,cakeDone,candle,candle,cakeDone],260)},go:()=>{clear();st.ck=0;st.n=0;tell2();st.cb=ready(1,()=>st.ck>=3,()=>'One candle for each year. Three years, three candles.')}},
  {h:'Different homes',p:'Tap each home to see who lives there.',
   predict:{q:'Mia lives with her mum and her gran. Is that a family?',opts:['No, it needs a dad too','Yes, it is her family'],ans:1},task:'Visit all three homes',
   show:()=>{steps[2].go();seq([()=>visit(0),()=>visit(1),()=>visit(2)],450)},go:()=>{clear();st.open=-1;st.seen=[];tell2();st.cb=ready(2,()=>st.seen.length>=3,()=>'Every family is different, and every one is a real family.')}},
  {h:'My home',p:'Who lives with you? Drag them into your home, or tap them. Then tap "This is my home".',task:'Fill your home and say who lives there',
   show:()=>{steps[3].go();seq([()=>addIn(0),()=>addIn(2),()=>addIn(7),sayHome],400)},go:()=>{clear();st.mine=[];st.said=0;tell2();st.cb=ready(3,()=>st.said,()=>'Now you can tell a friend who lives in your home.')}},
  {h:'I am special',p:'Pick two things that make you, you. Then see what Bo says.',
   predict:{q:'Bo likes blue. You like red. Is one of you wrong?',opts:['Yes, one is wrong','No, we are both OK'],ans:1},task:'Fill your star and answer Bo',
   show:()=>{steps[4].go();seq([()=>pickStar(0),()=>pickStar(3),()=>whoRight(0)],400)},go:()=>{clear();st.star=[];st.asked=0;tell2();st.cb=ready(4,()=>st.asked,()=>'Things you like and can do make you special.')}},
  {h:'Challenge',p:'',go:()=>{clear();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.cb()});
 const QS=[['A new friend asks, "What is your name?"','👋',[['I am Mia.','ok'],['I am 3.','agefor'],['I like dogs.','likefor']]],
  ['Sam is 2. How many candles on his cake?','🎂',[['2','ok'],['5','many'],['1','few']]],
  ['Leo lives with his dad and his papa. Is that a family?','🏠',[['Yes','ok'],['No, he needs a mum','needmum'],['No, it is too small','small']]],
  ['Which is a special thing about you?','⭐',[['I can hop','ok'],['Mum is tall','other'],['It is sunny','weather']]],
  ['Ava\'s dog lives in her home. Can a pet be part of home?','🐶',[['Yes','ok'],['No, only people','pets'],['Only big dogs','bigdog']]],
  ['A friend asks, "How old are you?"','🧒',[['I am 3.','ok'],['I am Mia.','namefor'],['My gran.','homefor']]]];
 let qk=-1,row2=0;
 function pose(){qk++;const[q,face,ops]=QS[qk%QS.length],sh=qk%3;st.face=face;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,o);e.onclick=()=>judge(tag)});voice('Challenge: '+q);A.redraw()}
 function judge(tag){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'agefor':m='That is how old you are. The friend asked your name.';break;
   case 'likefor':m='That is something you like. Say your name first.';break;
   case 'many':m='Too many. One candle for each year: Sam is 2, so 2 candles.';break;
   case 'few':m='Not enough. Sam is 2, so he needs 2 candles.';break;
   case 'needmum':m='Families are different. Leo, his dad and his papa are a family.';break;
   case 'small':m='A small family is still a family.';break;
   case 'other':m='That is about Mum. Pick something about you.';break;
   case 'weather':m='That is about the day, not about you.';break;
   case 'pets':m='Pets live with us too. They can be part of home.';break;
   case 'bigdog':m='Any pet that lives with you is part of home, big or small.';break;
   case 'namefor':m='That is your name. The friend asked how old you are.';break;
   default:m='That is who lives with you. The friend asked how old you are.'}
  const good=tag==='ok';if(good){row2++;A.win()}else{row2=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${row2}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function press(p){const v=part();st.lift=null;st.pos=null;
  if(v==='hello'&&st.q<3){[0,1,2].forEach(i=>{if(on(p,line(i)))reply(i)});return false}
  if(v==='cake'&&st.ck<3){if(on(p,cakeR()))candle();else if(on(p,twin(0)))unCandle();else if(on(p,twin(1)))cakeDone();return false}
  if(v==='homes'){const i=[0,1,2].find(i=>on(p,houseR(i)));if(i!=null)visit(i);return false}
  if(v==='mine'&&!st.said){if(on(p,myHouse()))return sayHome(),false;const i=FOLK.findIndex((f,i)=>!st.mine.includes(i)&&on(p,chip(i,FOLK.length)));if(i<0)return false;st.lift=i;return true}
  if(v==='star'&&!st.asked){if(st.star.length<2){const i=STARS.findIndex((s,i)=>!st.star.includes(i)&&on(p,chip(i,STARS.length)));if(i>=0)pickStar(i)}else[0,1,2].forEach(i=>{if(on(p,ans3(i)))whoRight(i)})}return false}
 function lift(p){const k=st.lift;st.lift=null;st.pos=null;if(k==null)return A.redraw();if(on(p,myHouse())||on(p,chip(k,FOLK.length)))addIn(k);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);aloud=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{st.pos=p;A.redraw()},up:lift});pads()}});
 A.start()})})();
