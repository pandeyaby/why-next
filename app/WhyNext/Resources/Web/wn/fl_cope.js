/* Flagship – choosing the right coping strategy (ages 7–9): sort tools into the feeling they fit (anger is hot and fast,
   sadness is heavy and slow), flip between school and home to see which tools you can really use there, sort problems
   into "I can fix it" and "I can't change it", help Sam when his first tool only half works, then make a
   feeling + place + tool plan for three friends. */
(()=>{const mn=Math.min,mx=Math.max;
 const FEEL=[['😠','Angry: hot and fast'],['😢','Sad: heavy and slow']];
 const KIT=[['🌬️ Slow, deep breaths',0,'Slow breaths cool a hot, fast body. That is what anger needs first.'],
  ['🚶 Walk away and cool off',0,'Walking away gives hot anger space to cool. When you are sad, going off alone can feel lonelier.'],
  ['💬 Talk to someone you trust',1,'When you are boiling, words come out hot. Cool off first. Talking is the comfort sad feelings need.'],
  ['✊ Squeeze a stress ball',0,'Squeezing uses up the fizzy, hot energy of anger. Sad feelings are heavy, not fizzy.'],
  ['🧸 Hug a pet or a teddy',1,'A hug is comfort, and comfort is what sad feelings need. Angry bodies need to cool down first.'],
  ['🎵 Do a small thing you enjoy',1,'A song or a drawing lifts a heavy, sad feeling a little. Hot anger needs cooling first.']];
 const FIX=[['🔧','I can fix it: make a plan'],['🌈','I can\u2019t change it: help my feelings']];
 const PROB=[['I lost my pencil',0,'Look in your bag, or ask to borrow one.'],['It rains on sports day',1,'No one can stop rain. Say it is a let-down, then find a fun thing to do inside.'],
  ['I forgot my reading book',0,'Tell your teacher, and pack it tonight.'],['My best friend moved away',1,'You can\u2019t make a friend move back. Talk about it and plan a video call.'],
  ['My tower keeps falling down',0,'Try a wider base, or ask for a tip.'],['The trip is off because of snow',1,'You can\u2019t change the weather. Help your feelings and look forward to the new date.']];
 const PLACE=['🏫 School','🏠 Home'];
 const SPOT=[['🛏️','Go to my room','h','There is no bedroom at school. Try the calm corner instead.'],['🙋','Tell my teacher','s','Your teacher is at school. At home, tell a grown-up who is there.'],
  ['🌬️','Slow breaths','b',''],['🐶','Hug my dog','h','Your dog stays at home. At school, try slow breaths or the calm corner.'],
  ['🛋️','Class calm corner','s','The calm corner is in your classroom. At home, find a quiet spot there.'],['👪','Tell Mum or Dad','h','Mum and Dad are not in class. At school, your teacher is the grown-up to tell.']];
 const TRY=[['📞','Video call his friend',3,'Seeing his friend\u2019s face helps Sam feel less alone. This tool fits!'],['✏️','Make a card for him',2,'Making a card turns sad into something kind. It helps.'],
  ['👊','Kick the bin',-1,'Kicking can hurt and makes the feeling bigger, not smaller.']];
 const PLAN=[['Jay\u2019s team lost. He is boiling mad, in the school playground.',0,[['Walk to the calm corner and breathe','ok'],['Go to his bedroom','place'],['Hug his teddy and nap','feel']]],
  ['Ava\u2019s cat is ill. She feels sad, at home after tea.',1,[['Tell her teacher','place'],['Cuddle up with Dad and talk','ok'],['Squeeze a stress ball','feel']]],
  ['Leo has a spelling test tomorrow. He feels worried, at home tonight.',2,[['Stomp about to let it out','feel'],['Ask his teacher right now','place'],['Practise the words with Mum','ok']]]];
 const MOOD=[['😠','Angry'],['😢','Sad'],['😟','Worried']];
VIS.reg('flagcope',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={i:0,put:[[],[]],bad:-1,drag:null,pl:0,got:{s:[],h:[]},lvl:4,used:[],pi:0,mood:-1,pok:0,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['feel','place','fix','try','plan','quiz'][A.step];
 const pz=z=>A.narrow?z:z+3;
 const word=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${pz(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-14)};
 const lines=(x,t,X,Y,w,z,k)=>{x.font=`800 ${pz(z)}px system-ui,sans-serif`;const L=[];let r='';t.split(' ').forEach(v=>{const q=r?r+' '+v:v;if(r&&x.measureText(q).width>w-10){L.push(r);r=v}else r=q});L.push(r);
  const g=pz(z)*1.18;L.forEach((l,i)=>word(x,l,X,Y+(i-(L.length-1)/2)*g,z,k))};
 const tile=(x,R,k,on,a)=>{x.fillStyle=A.alpha(k,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,14);x.fill();x.strokeStyle=k;x.lineWidth=on?5:2;x.stroke()};
 const hit=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,nope=t=>{A.sound.miss();say(t);A.redraw()};
 // ---- deal one card at a time into two jars (steps 1 and 3) ----
 const jar=i=>{const g=10,w=(A.W-3*g)/2;return{x:g+i*(w+g),y:A.H*.04,w,h:A.H*.56}};
 const cardHome=()=>{const w=mn(A.W*.7,330),h=A.H*.17;return{x:(A.W-w)/2,y:A.H*.72,w,h}};
 const deck=()=>mode()==='feel'?KIT:PROB,heads=()=>mode()==='feel'?FEEL:FIX;
 function dealV(x){const C=A.col,D=deck(),H=heads();
  H.forEach((h,i)=>{const R=jar(i);tile(x,R,i?C.vi:C.rd,K.bad===i);word(x,h[0],R.x+R.w/2,R.y+A.H*.07,26,C.tx,400);lines(x,h[1],R.x+R.w/2,R.y+A.H*.16,R.w,12,C.tx);
   K.put[i].forEach((k,j)=>lines(x,mode()==='feel'?D[k][0].replace(/^\S+ /,''):D[k][0],R.x+R.w/2,R.y+A.H*(.27+j*.09),R.w,10,C.tx))});
  if(K.i>=D.length)return word(x,mode()==='feel'?'Each feeling has its own tools!':'Fix it, or help your feelings!',A.W/2,A.H*.8,16,C.gr);
  const R=cardHome(),P=K.drag?{x:K.drag.x-R.w/2,y:K.drag.y-R.h/2,w:R.w,h:R.h}:R;tile(x,P,C.cy,1,.22);lines(x,D[K.i][0],P.x+P.w/2,P.y+P.h/2,P.w,14,C.tx);
  if(!K.drag)word(x,'Drag me to a jar ↑',A.W/2,A.H*.67,11,C.tx,600)}
 function drop(j){const D=deck();if(K.i>=D.length)return;const d=D[K.i];K.drag=null;
  if(j!==d[1]){K.bad=j;return nope(mode()==='feel'?d[2]:(d[1]?'Trying hard can\u2019t change this one. ':'Wait, you CAN fix this one! ')+(mode()==='feel'?'':d[2]))}
  K.bad=-1;K.put[j].push(K.i);K.i++;A.sound.pop();tell(mode()==='feel'?d[2]:(d[1]?'Can\u2019t change it. ':'Fix it! ')+d[2])}
 // ---- school or home ----
 const swR=()=>({x:A.W*.2,y:A.H*.03,w:A.W*.6,h:A.H*.14});
 const spR=i=>{const g=8,per=A.narrow?2:3,w=(A.W-g*(per+1))/per,h=A.H*(A.narrow?.2:.3);return{x:g+(i%per)*(w+g),y:A.H*.27+Math.floor(i/per)*(h+g),w,h}};
 function placeV(x){const C=A.col,S=swR(),k=K.pl?'h':'s';tile(x,S,C.am,1,.2);word(x,'Now at: '+PLACE[K.pl],S.x+S.w/2,S.y+S.h*.4,15,C.tx);word(x,'tap to switch',S.x+S.w/2,S.y+S.h*.8,10,C.tx,600);
  word(x,`Worried. School tools: ${K.got.s.length}/2   Home tools: ${K.got.h.length}/2`,A.W/2,A.H*.22,11,C.tx,700);
  SPOT.forEach((s,i)=>{const R=spR(i),on=K.got[k].includes(i);tile(x,R,on?C.gr:K.bad===i?C.rd:C.cy,on||K.bad===i);word(x,s[0],R.x+R.w/2,R.y+R.h*.36,24,C.tx,400);lines(x,s[1],R.x+R.w/2,R.y+R.h*.74,R.w,11,C.tx)})}
 function useSpot(i){const s=SPOT[i],k=K.pl?'h':'s';if(K.got[k].length>=2||K.got[k].includes(i))return;
  if(s[2]!=='b'&&s[2]!==k){K.bad=i;return nope(s[3])}K.bad=-1;K.got[k].push(i);A.sound.pop();tell(`Yes, "${s[1]}" works at ${k==='s'?'school':'home'}.`)}
 function flip(){K.pl=1-K.pl;K.bad=-1;A.sound.tick();tell('You are now at '+(K.pl?'home':'school')+'.')}
 // ---- try it, check it ----
 const samP=()=>({x:A.W*.3,y:A.H*.28});
 const tyR=i=>{const g=8,w=(A.W-g*4)/3,h=A.H*.24;return{x:g+i*(w+g),y:A.H*.7,w,h}};
 function tryV(x){const C=A.col,P=samP(),m=K.lvl;word(x,m<=1?'🙂':m<=2?'😐':'😢',P.x,P.y,48,C.tx,400);word(x,'Sam: my best friend moved away',P.x,P.y+A.H*.13,11,C.tx,700);
  const bx=A.W*.68,bw=mn(46,A.W*.1),top=A.H*.06,bh=A.H*.5;x.strokeStyle=C.tx;x.lineWidth=2;x.strokeRect(bx,top,bw,bh);
  x.fillStyle=A.alpha(m>2?C.vi:C.gr,.6);x.fillRect(bx,top+bh*(1-m/5),bw,bh*m/5);word(x,`Sad meter: ${m} of 5`,bx+bw/2,top+bh+A.H*.05,11,C.tx,700);
  word(x,'Tried: 🌬️ slow breaths (5 → 4)',A.W*.3,A.H*.55,10,C.tx,600);
  TRY.forEach((t,i)=>{if(K.used.includes(i))return;const R=K.drag&&K.drag.k===i?{...tyR(i),x:K.drag.x-tyR(i).w/2,y:K.drag.y-tyR(i).h/2}:tyR(i);tile(x,R,C.cy,0);word(x,t[0],R.x+R.w/2,R.y+R.h*.32,22,C.tx,400);lines(x,t[1],R.x+R.w/2,R.y+R.h*.72,R.w,10,C.tx)})}
 function give(i){if(K.used.includes(i)||K.lvl<=1)return;const t=TRY[i];K.drag=null;
  if(t[2]<0){K.lvl=mn(5,K.lvl+1);return nope(t[3]+` Meter up to ${K.lvl}.`)}K.used.push(i);K.lvl=mx(0,K.lvl-t[2]);A.sound.pop();tell(t[3])}
 // ---- make a plan ----
 const mdR=i=>{const g=8,w=(A.W-g*4)/3;return{x:g+i*(w+g),y:A.H*.36,w,h:A.H*.2}};
 const opR=i=>({x:10,y:A.H*(.6+i*.13),w:A.W-20,h:A.H*.115});
 function planV(x){const C=A.col;if(K.pok>=3)return word(x,'Feeling, place, then the tool that fits!',A.W/2,A.H*.45,15,C.gr);const s=PLAN[K.pi],R={x:10,y:A.H*.03,w:A.W-20,h:A.H*.29};
  tile(x,R,C.am,0);lines(x,s[0],A.W/2,R.y+R.h*.45,R.w-20,13,C.tx);
  MOOD.forEach((m,i)=>{const Q=mdR(i);tile(x,Q,K.mood===i?C.gr:C.cy,K.mood===i);word(x,m[0],Q.x+Q.w/2,Q.y+Q.h*.38,22,C.tx,400);word(x,m[1],Q.x+Q.w/2,Q.y+Q.h*.78,11,C.tx)});
  if(K.mood<0)return word(x,'1. How does this child feel? Tap it.',A.W/2,A.H*.72,12,C.tx,700);
  s[2].forEach((o,i)=>{const Q=opR(i);tile(x,Q,K.bad===i?C.rd:C.vi,K.bad===i);lines(x,o[0],Q.x+Q.w/2,Q.y+Q.h/2,Q.w,11,C.tx)})}
 function mood(i){if(K.pok>=3||K.mood>=0)return;const s=PLAN[K.pi];if(i!==s[1])return nope(`Look again. Which word in the story tells you how they feel?`);K.mood=i;A.sound.tick();tell(`Yes, ${MOOD[i][1].toLowerCase()}. Now pick the tool that fits the feeling and the place.`)}
 function pick(i){if(K.pok>=3||K.mood<0)return;const o=PLAN[K.pi][2][i];
  if(o[1]==='place'){K.bad=i;return nope('Check the place. That tool cannot be used where this child is right now.')}
  if(o[1]==='feel'){K.bad=i;return nope(`That tool fits a different feeling. This child feels ${MOOD[PLAN[K.pi][1]][1].toLowerCase()}.`)}
  K.bad=-1;K.pok++;K.pi=mn(2,K.pok);K.mood=-1;A.sound.pop();tell('Good plan: it fits the feeling and the place.')}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();x.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.05:.45);x.fillRect(0,0,W,H);
  const f={feel:dealV,fix:dealV,place:placeV,try:tryV,plan:planV}[v];if(f)f(x);else word(x,K.Q||'🧰',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=mode();let t;
  if(v==='feel'||v==='fix')t=K.i>=deck().length?'All cards sorted.':`Card: ${deck()[K.i][0]}. Which jar?`;
  else if(v==='place')t=`At ${K.pl?'home':'school'}. Feeling worried. School tools ${K.got.s.length} of 2, home tools ${K.got.h.length} of 2.`;
  else if(v==='try')t=`Sam's sad meter is ${K.lvl} of 5.`;
  else if(v==='plan')t=K.pok>=3?'Three plans made.':PLAN[K.pi][0]+(K.mood<0?' How do they feel?':' Pick a tool.');else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();K.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if((v==='feel'||v==='fix')&&K.i<deck().length)heads().forEach((h,j)=>B(h[0]+' '+h[1].split(':')[0],()=>drop(j),`Put in: ${h[1]}`));
  if(v==='place'){B('🔁 Switch to '+(K.pl?'school':'home'),flip);SPOT.forEach((s,i)=>B(s[0]+' '+s[1],()=>useSpot(i),`Use: ${s[1]}`))}
  if(v==='try'&&K.lvl>1)TRY.forEach((t,i)=>{if(!K.used.includes(i))B(t[0]+' '+t[1],()=>give(i),`Try: ${t[1]}`)});
  if(v==='plan'&&K.pok<3){if(K.mood<0)MOOD.forEach((m,i)=>B(m[0]+' '+m[1],()=>mood(i),`Feels ${m[1]}`));else PLAN[K.pi][2].forEach((o,i)=>B(o[0],()=>pick(i)))}A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gap)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},j*gap))};
 const reset=()=>{K.gen++;K.want=()=>{};K.drag=null;K.bad=-1;K.i=0;K.put=[[],[]]};
 const steps=[
  {h:'Different feelings, different tools',p:'Anger feels hot and fast. Sadness feels heavy and slow. Put each tool in the jar it fits best.',
   predict:{q:'Will the tool that cools anger also be the best for sadness?',opts:['Yes, one tool fits all','No, each feeling needs its own tools'],ans:1},task:'Sort all six tools',
   show:()=>{steps[0].go();seq(KIT.map(k=>()=>drop(k[1])),380)},go:()=>{reset();tell();K.want=ok(0,()=>K.i>=KIT.length,()=>'Hot anger needs cooling. Heavy sadness needs comfort and company.')}},
  {h:'School or home?',p:'Ava feels worried. Some tools only work in one place. Tap the switch to change places.',
   predict:{q:'Ava is worried at school. Can she go to her bedroom?',opts:['Yes, any time','No, she needs a school tool'],ans:1},task:'Find 2 tools for school and 2 for home',
   show:()=>{steps[1].go();seq([()=>useSpot(1),()=>useSpot(2),()=>flip(),()=>useSpot(0),()=>useSpot(5)],420)},go:()=>{reset();K.pl=0;K.got={s:[],h:[]};tell();K.want=ok(1,()=>K.got.s.length>=2&&K.got.h.length>=2,()=>'Slow breaths work anywhere. Other tools depend on where you are.')}},
  {h:'Can I change it?',p:'Some problems you can fix. Some you can\u2019t. Then you help your feelings instead.',
   predict:{q:'It rains on sports day. Can Leo fix the rain if he tries hard?',opts:['Yes, if he tries','No, he helps his feelings instead'],ans:1},task:'Sort all six problems',
   show:()=>{steps[2].go();seq(PROB.map(k=>()=>drop(k[1])),380)},go:()=>{reset();tell();K.want=ok(2,()=>K.i>=PROB.length,()=>'Fix what you can. For the rest, help your feelings.')}},
  {h:'Try it, check it',p:'Sam is sad because his best friend moved away. He tried slow breaths. His meter went from 5 to 4 only.',
   predict:{q:'The breaths did not help much. What should Sam do?',opts:['Give up, nothing works','Try a tool that fits sad'],ans:1},task:'Drag a tool to Sam. Get his meter to 1 or less',
   show:()=>{steps[3].go();seq([()=>give(0)],300)},go:()=>{reset();K.lvl=4;K.used=[];tell();K.want=ok(3,()=>K.lvl<=1,()=>'Breaths calm a body, but lonely Sam needed his friend. If a tool does not work, try one that fits.')}},
  {h:'Make a plan',p:'Read about each child. First tap how they feel. Then pick a tool that fits the feeling and the place.',task:'Make plans for all three children',
   show:()=>{steps[4].go();seq([()=>mood(0),()=>pick(0),()=>mood(1),()=>pick(1),()=>mood(2),()=>pick(2)],420)},go:()=>{reset();K.pi=0;K.pok=0;K.mood=-1;tell();K.want=ok(4,()=>K.pok>=3,()=>'Ask: How do I feel? Where am I? Can I change it? Then pick the tool.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Mia is very angry. What is a good first tool?','😠',[['Cool off with slow breaths','ok'],['Argue while still boiling','hot'],['Have a nap','nap']]],
  ['Ben is sad that his friend moved away. What could help?','😢',[['Talk to someone he trusts','ok'],['Squeeze a stress ball','anger'],['Make his friend move back','fix']]],
  ['Zara is worried in class. Which tool can she use there?','🏫',[['Tell her teacher','ok'],['Go to her bedroom','home'],['Hug her dog','home']]],
  ['You tried a tool and it did not work. What next?','🔁',[['Try a different tool','ok'],['Give up','quit'],['Do the same thing louder','same']]],
  ['It is raining on sports day. What helps?','🌧️',[['Find a fun thing to do inside','ok'],['Try to stop the rain','fix'],['Stay cross all day','stay']]],
  ['Which is true about coping tools?','🧰',[['Different feelings need different tools','ok'],['One tool works for everything','one'],['Only grown-ups need tools','adult']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That tool fits.';break;
   case 'hot':m='Words come out hot while you are boiling. Cool your body first, then talk.';break;
   case 'nap':m='A nap will not cool hot anger right now. Slow breaths work in a minute.';break;
   case 'anger':m='A stress ball uses up angry energy. Sad feelings need comfort and company.';break;
   case 'fix':m='That can\u2019t be changed. When you can\u2019t fix it, help your feelings.';break;
   case 'home':m='That tool is at home. In class, use a school tool like telling the teacher.';break;
   case 'quit':m='Don\u2019t give up! A tool that does not fit is a clue. Try one that fits the feeling.';break;
   case 'same':m='Doing it louder is still the same tool. Try a different one.';break;
   case 'stay':m='Staying cross all day spoils the day. Say it is a let-down, then find something fun.';break;
   case 'one':m='What cools anger may not help sadness. Match the tool to the feeling.';break;
   default:m='Everyone needs coping tools, children too.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=mode();K.drag=null;
  if((v==='feel'||v==='fix')&&K.i<deck().length){if(hit(p,cardHome())){K.drag={x:p.x,y:p.y};return true}const j=[0,1].find(j=>hit(p,jar(j)));if(j!=null)drop(j);return false}
  if(v==='place'){if(hit(p,swR())){flip();return false}const i=SPOT.findIndex((_,i)=>hit(p,spR(i)));if(i>=0)useSpot(i);return false}
  if(v==='try'&&K.lvl>1){const i=TRY.findIndex((_,i)=>!K.used.includes(i)&&hit(p,tyR(i)));if(i>=0){K.drag={x:p.x,y:p.y,k:i,x0:p.x,y0:p.y};return true}return false}
  if(v==='plan'&&K.pok<3){if(K.mood<0){const i=MOOD.findIndex((_,i)=>hit(p,mdR(i)));if(i>=0)mood(i)}else{const i=[0,1,2].find(i=>hit(p,opR(i)));if(i!=null)pick(i)}}return false}
 function move(p){if(!K.drag)return;K.drag.x=p.x;K.drag.y=p.y;A.redraw()}
 function up(p){const v=mode(),d=K.drag;if(!d)return;
  if(v==='feel'||v==='fix'){const j=[0,1].find(j=>hit(p,jar(j)));if(j!=null)drop(j);else{K.drag=null;A.redraw()}return}
  if(v==='try'){const S=samP(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<12;if(tap||Math.hypot(p.x-S.x,p.y-S.y)<A.H*.2)give(d.k);else{K.drag=null;A.redraw()}}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
