/* Flagship – vocabulary of making decisions and keeping safe (ages 5–8): walk a child down each branch of a fork to see that
   every choice has a consequence; sort consequences into good and bad; pick the honest words after a mistake; bring the
   trusted adults (not strangers who seem friendly) into the safe circle; then name each scene: fair, honest, rule, safe,
   responsible. */
(()=>{const lo=Math.min;
 const FORK=[{pic:'⚽',s:'You find a ball. It is not yours.',o:[['🙈 Keep it','😢','Your friend is sad. Now she has no ball.'],['🤲 Give it back','😊','Your friend is happy. You play together.']]},
  {pic:'🍪',s:'One cookie left. Your brother wants it too.',o:[['✋ Grab it','😠','Your brother is cross. You both shout.'],['✂️ Share it','😊','You both get half. Nobody is cross.']]}];
 const CONS=[['🪥','I brush my teeth','No toothache',0],['🏊','I run by the pool','I slip and fall',1],['🗣️','I tell the truth','Mum trusts me',0],
  ['🚲','I leave my bike in the rain','It goes rusty',1],['📖','I practise reading','It gets easier',0],['🧸','I grab the toys','Nobody wants to play',1]];
 const TRUTH=[{pic:'🏺💥',q:'The vase broke. Mum asks: what happened?',o:[['The cat did it.','blame'],['I broke it. I am sorry.','ok'],['I do not know.','hide']]},
  {pic:'🍫',q:'You ate the chocolate. Dad asks: who ate it?',o:[['Not me!','fib'],['I did. Sorry, Dad.','ok'],['My sister did.','blame']]},
  {pic:'✏️',q:'You did not do your reading. Your teacher asks why.',o:[['I forgot. I will do it tonight.','ok'],['The dog ate my book.','fib'],['I did read it.','fib']]}];
 const TWHY={blame:'Blaming someone else is not honest. Now the cat or your sister gets told off for nothing.',hide:'"I do not know" hides what you know. Honest means telling what really happened.',fib:'That is not true. Honest means telling the truth, even when it is hard.'};
 const FOLK=[['👩‍🏫','My teacher',1],['👮','A police officer',1],['🚗','A stranger in a car',0],['👵','My grandma',1],['💻','Someone online I do not know',0],['👨','My dad',1]];
 const NAME=[{pic:'🛝⏳',s:'Everyone gets a turn on the slide.',w:'fair'},{pic:'🗣️',s:'Sam says: I spilt the paint.',w:'honest'},{pic:'🚸',s:'We hold hands by the road. That is what we always do.',w:'rule'},
  {pic:'🚴⛑️',s:'Mia puts her helmet on to ride.',w:'safe'},{pic:'🐶🥣',s:'Leo feeds his dog every day without being asked.',w:'responsible'}];
 const WORDS=['fair','honest','rule','safe','responsible'];
 const MEAN={fair:'Fair means everyone gets a fair go.',honest:'Honest means telling the truth.',rule:'A rule tells everyone what to do, so we are safe and fair.',safe:'Safe means nothing will hurt you.',responsible:'Responsible means you do your jobs and look after things.'};
VIS.reg('flagdecide',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={k:0,seen:{},walk:null,i:0,got:{},bad:-1,pick:-1,drag:null,gen:0,hook:()=>{}};
 const mode=()=>['fork','cons','truth','folk','name','quiz'][A.step];
 const X=v=>v*A.W,Y=v=>v*A.H,sz=z=>A.narrow?z:z+3;
 function t(g,s,x,y,size,col,wt,w){g.font=`${wt||800} ${sz(size)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';
  if(!w||g.measureText(s).width<=w)return g.fillText(s,x,y);const ws=s.split(' '),L=[];let r='';ws.forEach(q=>{const z=r?r+' '+q:q;if(r&&g.measureText(z).width>w){L.push(r);r=q}else r=z});L.push(r);
  L.forEach((r,j)=>g.fillText(r,x,y+(j-(L.length-1)/2)*sz(size)*1.25))}
 const pill=(g,r,col,f,lw)=>{g.fillStyle=A.alpha(col,f);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.lineWidth=lw||2;g.strokeStyle=col;g.stroke()};
 const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m);if(read)read.textContent=m};
 // fork geometry: start at the top middle, two roads to the bottom corners
 const ends=()=>[{x:X(.2),y:Y(.62)},{x:X(.8),y:Y(.62)}],start=()=>({x:X(.5),y:Y(.3)});
 const binR=j=>({x:j?X(.52):X(.02),y:Y(.58),w:X(.46),h:Y(.4)});
 const cardR=()=>({x:X(.15),y:Y(.08),w:X(.7),h:Y(.4)});
 const ringR=()=>({x:X(.3),y:Y(.36),w:X(.4),h:Y(.36)});
 const folkR=j=>{const w=X(.3),h=Y(.15),col=j%3,row=j<3?0:1;return{x:X(.025)+col*(w+X(.025)),y:row?Y(.8):Y(.03),w,h}};
 const wordR=j=>{const n=WORDS.length,cols=A.narrow?3:5,w=(A.W-X(.04)-(cols-1)*6)/cols,h=Y(.14),r=Math.floor(j/cols);return{x:X(.02)+(j%cols)*(w+6),y:Y(.62)+r*(h+6),w,h}};
 // ---- painters ----
 function fork(g){const C=A.col,F=FORK[S.k];if(!F)return t(g,'✓ Every choice had a consequence.',A.W/2,Y(.45),17,C.gr,800,A.W-30);
  t(g,F.pic+' '+F.s,A.W/2,Y(.08),15,C.tx,800,A.W-24);const s0=start(),E=ends();
  E.forEach((e,j)=>{g.strokeStyle=A.alpha(C.mu,.55);g.lineWidth=lo(40,X(.07));g.lineCap='round';g.beginPath();g.moveTo(s0.x,s0.y);g.quadraticCurveTo(e.x,s0.y+Y(.08),e.x,e.y);g.stroke();
   const r={x:e.x-X(.19),y:e.y+Y(.04),w:X(.38),h:Y(.3)},v=S.seen[S.k+'_'+j];pill(g,r,v?(j?C.gr:C.or):C.ln,v?.22:.08,v?3:2);
   t(g,F.o[j][0],r.x+r.w/2,r.y+Y(.07),14,C.tx,800,r.w-8);if(v){t(g,F.o[j][1],r.x+r.w/2,r.y+Y(.15),26,C.tx,400);t(g,F.o[j][2],r.x+r.w/2,r.y+Y(.24),11,C.tx,700,r.w-8)}});
  const w=S.walk||s0;t(g,'🧒',w.x,w.y-6,34,C.tx,400);if(!S.walk)t(g,'Drag me down a road',s0.x,s0.y-Y(.08),11,C.mu,700)}
 function cons(g){const C=A.col;['😊 Good','😟 Bad'].forEach((s,j)=>{const r=binR(j);pill(g,r,j?C.or:C.gr,S.bad===j?.32:.12,S.bad===j?4:2);t(g,s,r.x+r.w/2,r.y+Y(.07),16,C.tx,800);
   const n=CONS.filter((q,k)=>S.got[k]&&q[3]===j).map(q=>q[0]).join(' ');t(g,n||'',r.x+r.w/2,r.y+r.h*.6,22,C.tx,400,r.w-6)});
  const q=CONS[S.i];if(!q)return t(g,'✓ Every choice leads somewhere.',A.W/2,Y(.25),16,C.gr,800,A.W-30);let r=cardR();if(S.drag)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};
  pill(g,r,C.vi,.14,3);t(g,q[0],r.x+r.w/2,r.y+r.h*.25,30,C.tx,400);t(g,q[1]+' →',r.x+r.w/2,r.y+r.h*.55,14,C.tx,800,r.w-10);t(g,q[2],r.x+r.w/2,r.y+r.h*.8,14,C.tx,800,r.w-10)}
 function truth(g){const C=A.col,T=TRUTH[S.i];if(!T)return t(g,'✓ Honest every time.',A.W/2,Y(.45),17,C.gr,800);
  t(g,T.pic,A.W/2,Y(.13),38,C.tx,400);t(g,T.q,A.W/2,Y(.3),14,C.tx,800,A.W-24);
  T.o.forEach((o,j)=>{const r={x:X(.05),y:Y(.42+j*.19),w:X(.9),h:Y(.16)};pill(g,r,S.bad===j?C.rd:C.cy,S.bad===j?.25:.1,S.bad===j?4:2);t(g,'💬 '+o[0],r.x+r.w/2,r.y+r.h/2,15,C.tx,800,r.w-12)})}
 function folk(g){const C=A.col,r=ringR();g.fillStyle=A.alpha(C.gr,.14);g.beginPath();g.ellipse(r.x+r.w/2,r.y+r.h/2,r.w/2+X(.05),r.h/2,0,0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.gr;g.stroke();
  t(g,'🛡️ People I can tell',r.x+r.w/2,r.y+r.h*.22,12,C.tx,800,r.w+X(.08));t(g,FOLK.filter((f,k)=>S.got[k]).map(f=>f[0]).join(' ')||'',r.x+r.w/2,r.y+r.h*.62,22,C.tx,400,r.w+X(.06));
  FOLK.forEach((f,j)=>{if(S.got[j])return;let b=folkR(j);if(S.drag&&S.drag.j===j)b={...b,x:S.drag.x-b.w/2,y:S.drag.y-b.h/2};pill(g,b,S.bad===j?C.rd:S.pick===j?C.vi:C.am,S.pick===j?.35:.16,S.pick===j||S.bad===j?4:2);
   t(g,f[0],b.x+b.h*.4,b.y+b.h/2,20,C.tx,400);t(g,f[1],b.x+b.w/2+b.h*.25,b.y+b.h/2,10,C.tx,800,b.w-b.h*.8-4)})}
 function name(g){const C=A.col,N=NAME[S.i];if(!N)return t(g,'✓ You know all five words.',A.W/2,Y(.4),17,C.gr,800);
  t(g,N.pic,A.W/2,Y(.15),40,C.tx,400);t(g,N.s,A.W/2,Y(.35),15,C.tx,800,A.W-30);const slot={x:X(.3),y:Y(.44),w:X(.4),h:Y(.12)};pill(g,slot,S.bad>=0?C.rd:C.vi,.1,3);t(g,'Which word? ✋',slot.x+slot.w/2,slot.y+slot.h/2,13,C.tx,800);
  WORDS.forEach((w,j)=>{let r=wordR(j);if(S.drag&&S.drag.j===j)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};pill(g,r,S.bad===j?C.rd:S.pick===j?C.vi:C.am,S.pick===j?.35:.18,S.pick===j||S.bad===j?4:2);t(g,w,r.x+r.w/2,r.y+r.h/2,14,C.tx,800,r.w-6)})}
 function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.4);g.fillRect(0,0,W,H);
  if(m==='quiz'){t(g,S.Q||'🤔',W/2,H/2,58,C.tx,400);return A.fx.draw(g)}({fork,cons,truth,folk,name})[m](g);A.fx.draw(g)}
 // ---- actions ----
 function walk(j){const F=FORK[S.k];if(!F||S.busy)return;const e=ends()[j],s0=start();S.busy=1;S.walk={x:s0.x,y:s0.y};A.sound.whoosh();
  A.tween(S.walk,{x:e.x,y:e.y},600,'io',()=>{S.busy=0;S.seen[S.k+'_'+j]=1;A.sound.pop();const o=F.o[j];let m=`${o[0].slice(3)}: ${o[2]} That is a consequence.`;
   if(S.seen[S.k+'_0']&&S.seen[S.k+'_1']){S.k++;S.walk=null;m+=FORK[S.k]?' Both roads done. Next choice.':' Every choice had a consequence.'}tell(m);pads()})}
 function sortTo(j){const q=CONS[S.i];if(!q)return;S.drag=null;if(q[3]!==j){S.bad=j;A.sound.miss();tell(j?`${q[2]}: that helps you. It is a good consequence.`:`${q[2]}: that hurts or makes things worse. It is a bad consequence.`);return A.redraw()}
  S.bad=-1;S.got[S.i]=1;S.i++;A.sound.pop();tell(`${j?'Bad':'Good'} consequence. `+(CONS[S.i]?'Next: '+CONS[S.i][1]+'. '+CONS[S.i][2]:''));pads()}
 function say(j){const T=TRUTH[S.i];if(!T)return;const o=T.o[j];if(o[1]!=='ok'){S.bad=j;A.sound.miss();tell(TWHY[o[1]]);return A.redraw()}
  S.bad=-1;S.i++;A.sound.pop();tell(`"${o[0]}" That is honest. Now everyone can fix it together.`+(TRUTH[S.i]?' Next one.':''));pads()}
 function invite(j){const f=FOLK[j];S.drag=null;S.pick=-1;if(S.got[j])return;if(!f[2]){S.bad=j;A.sound.miss();tell(`${f[1]}: I do not know them. Being friendly does not make someone a trusted adult. Tell a grown-up you know.`);return A.redraw()}
  S.bad=-1;S.got[j]=1;A.sound.pop();tell(`${f[1]} is a trusted adult: someone you know who helps keep you safe.`);pads()}
 function label(j){const N=NAME[S.i];S.drag=null;S.pick=-1;if(!N)return;const w=WORDS[j];if(w!==N.w){S.bad=j;A.sound.miss();tell(`Not ${w}. ${MEAN[w]} Look again at the picture.`);return A.redraw()}
  S.bad=-1;S.i++;A.sound.pop();tell(`Yes: ${w}! ${MEAN[w]}`+(NAME[S.i]?' Next picture.':''));pads()}
 function pads(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(s,f,lb)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':lb||null},pad,s).onclick=f};
  if(m==='fork'&&FORK[S.k])FORK[S.k].o.forEach((o,j)=>b(o[0],()=>walk(j),'Choose: '+o[0].slice(3)));
  if(m==='cons'&&CONS[S.i]){b('😊 Good',()=>sortTo(0),'Good consequence');b('😟 Bad',()=>sortTo(1),'Bad consequence')}
  if(m==='truth'&&TRUTH[S.i])TRUTH[S.i].o.forEach((o,j)=>b('💬 '+o[0],()=>say(j)));
  if(m==='folk')FOLK.forEach((f,j)=>{if(!S.got[j])b(f[0]+' '+f[1],()=>invite(j),'Bring '+f[1]+' into the safe circle')});
  if(m==='name'&&NAME[S.i])WORDS.forEach((w,j)=>b(w,()=>label(j),'Word: '+w));A.redraw();S.hook()}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fns,ms)=>{const g=++S.gen;fns.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*ms))};
 const reset=()=>{S.gen++;S.hook=()=>{};Object.assign(S,{k:0,seen:{},walk:null,i:0,got:{},bad:-1,pick:-1,drag:null,busy:0})};
 const steps=[
  {h:'Choice and consequence',p:'A choice is when you pick what to do. A consequence is what happens next, because of your choice.',
   predict:{q:'Do good choices have consequences too?',opts:['No, only bad ones','Yes, every choice does'],ans:1},
   task:'Try both roads, two times',show:()=>{steps[0].go();play([()=>walk(0),()=>walk(1),()=>walk(0),()=>walk(1)],800)},
   go:()=>{reset();tell('Drag the child down a road, or tap a button. '+FORK[0].s);S.hook=fin(0,()=>S.k>=FORK.length,'Every choice has a consequence: good or bad.')}},
  {h:'Good or bad?',p:'Some consequences help you. Some hurt you or other people. Drag each card to a box.',
   task:'Sort all six cards',show:()=>{steps[1].go();play(CONS.map(q=>()=>sortTo(q[3])),420)},
   go:()=>{reset();tell('First card: '+CONS[0][1]+'. '+CONS[0][2]);S.hook=fin(1,()=>S.i>=CONS.length,'Think first: what will happen next?')}},
  {h:'Being honest',p:'Honest means telling the truth. It can feel hard after a mistake. Pick the honest words.',
   predict:{q:'You tell the truth about a mistake. What happens?',opts:['You always get in big trouble','People trust you, and you fix it together'],ans:1},
   task:'Pick the honest words three times',show:()=>{steps[2].go();play(TRUTH.map(T=>()=>say(T.o.findIndex(o=>o[1]==='ok'))),500)},
   go:()=>{reset();tell(TRUTH[0].q);S.hook=fin(2,()=>S.i>=TRUTH.length,'Honest words help fix a mistake.')}},
  {h:'Trusted adults',p:'A trusted adult is a grown-up you know, who helps keep you safe. Drag the people you could tell into the circle.',
   task:'Bring in all four trusted adults',show:()=>{steps[3].go();play(FOLK.map((f,j)=>f[2]?()=>invite(j):null).filter(Boolean),450)},
   go:()=>{reset();tell('Who could you tell if you feel unsafe? Drag them into the circle.');S.hook=fin(3,()=>FOLK.every((f,j)=>!f[2]||S.got[j]),'Tell a trusted adult you know. Not a stranger, even a friendly one.')}},
  {h:'Name it',p:'Fair, honest, rule, safe, responsible. Drag the word that fits each picture.',
   task:'Name all five pictures',show:()=>{steps[4].go();play(NAME.map(N=>()=>label(WORDS.indexOf(N.w))),450)},
   go:()=>{reset();tell(NAME[0].s+' Which word fits?');S.hook=fin(4,()=>S.i>=NAME.length,'Naming it helps you choose well.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
 const QS=[['🙋 What is a consequence?',[['What happens because of a choice','ok'],['A kind of rule','rule'],['Only a punishment','punish']]],
  ['🚗 A stranger says: get in, I have a puppy. What do you do?',[['Say no and tell a grown-up I know','ok'],['Get in, he is friendly','friendly'],['Keep it a secret','secret']]],
  ['🎯 Everyone gets three throws. What is that?',[['Fair','ok'],['Honest','honestx'],['Unsafe','unsafe']]],
  ['🥛 You spilt the milk. What is honest?',[['I spilt it. Sorry!','ok'],['The dog did it.','blame'],['Say nothing.','hide']]],
  ['🐠 Who is responsible?',[['Ali feeds his fish every day','ok'],['Ali forgets the fish','forget'],['Ali asks Mum to do it all','others']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%ops.length,o=ops.slice(r).concat(ops.slice(0,r));S.Q=q.split(' ')[0];
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.forEach(([s,tg])=>{c.el('button',{type:'button',class:'lbtn'},row,s).onclick=()=>judge(tg)});tell('Challenge: '+q);A.redraw()}
 function judge(tg){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tg){case 'ok':m='Yes! Good thinking.';break;
   case 'rule':m='A rule tells us what to do. A consequence is what happens after a choice.';break;
   case 'punish':m='Good choices have consequences too, like a happy friend.';break;
   case 'friendly':m='Friendly is not the same as trusted. Never go with someone you do not know.';break;
   case 'secret':m='Do not keep it secret. Tell a trusted adult straight away.';break;
   case 'honestx':m='Honest is about telling the truth. Same turns for all is fair.';break;
   case 'unsafe':m='Nobody gets hurt here. Same turns for everyone is fair.';break;
   case 'blame':m='Blaming the dog is not true. Honest means saying what really happened.';break;
   case 'hide':m='Saying nothing hides it. Honest means telling.';break;
   case 'forget':m='Forgetting means the fish goes hungry. Responsible means doing your job.';break;
   default:m='Asking Mum to do it all is not looking after it yourself.'}
  const ok=tg==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 // ---- pointer ----
 function down(p){const m=mode();S.drag=null;
  if(m==='fork'){const s0=start();if(FORK[S.k]&&!S.busy&&Math.hypot(p.x-s0.x,p.y-s0.y)<60){S.drag={f:1};S.walk={x:s0.x,y:s0.y};return true}
   const j=ends().findIndex(e=>Math.abs(p.x-e.x)<X(.2)&&p.y>e.y-20);if(j>=0)walk(j);return false}
  if(m==='cons'){if(CONS[S.i]&&hit(p,cardR())){S.drag={x:p.x,y:p.y};return true}const j=[0,1].find(j=>hit(p,binR(j)));if(j!=null)sortTo(j);return false}
  if(m==='truth'){const j=[0,1,2].find(j=>hit(p,{x:X(.05),y:Y(.42+j*.19),w:X(.9),h:Y(.16)}));if(j!=null)say(j);return false}
  if(m==='folk'){const j=FOLK.findIndex((f,j)=>!S.got[j]&&hit(p,folkR(j)));if(j>=0){S.drag={j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(hit(p,ringR())&&S.pick>=0)invite(S.pick);return false}
  if(m==='name'){const j=WORDS.findIndex((w,j)=>hit(p,wordR(j)));if(j>=0){S.drag={j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}return false}
 function move(p){const d=S.drag;if(!d)return;if(d.f){S.walk={x:p.x,y:Math.max(start().y,p.y)}}else{d.x=p.x;d.y=p.y}A.redraw()}
 function up(p){const d=S.drag,m=mode();S.drag=null;if(!d)return;
  if(d.f){const s0=start();if(p.y>s0.y+Y(.12)&&Math.abs(p.x-s0.x)>X(.08))return walk(p.x<s0.x?0:1);S.walk=null;return A.redraw()}
  if(m==='cons'){const j=[0,1].find(j=>hit(p,binR(j)));return j!=null?sortTo(j):A.redraw()}
  const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<12;
  if(m==='folk'){if(tap){S.pick=d.j;tell(FOLK[d.j][1]+' picked. Tap the circle to bring them in.');return A.redraw()}return hit(p,ringR())?invite(d.j):A.redraw()}
  if(m==='name'){if(tap||p.y<Y(.6))return label(d.j);A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},bx);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Choice controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
