/* Flagship – seeing someone else's point of view (perspective-taking, ages 7–9): give each child in a story the feeling
   that fits what happened to them; predict where someone looks when they did not see a thing move (they act on what they
   know, not on what we know); sort each child's reasons in a swing quarrel; see that one event feels different to people
   with different pasts; then pick the reply that shows you have stepped into the other person's shoes. */
(()=>{const mn=Math.min,mx=Math.max;
 // a round: story (top lines or a comic strip), q = the question, T = people or places, C = cards to give,
 // G = [card, target] pairs that are right, S = 'card_target' -> what the slip was (anything else uses D)
 const FEEL=[{top:['Ben built a tall tower of blocks.','Zara tripped and knocked it down by accident.'],q:'How does each child feel? Give each one a face.',
   T:[['👦','Ben','His tower fell down'],['👧','Zara','She knocked it by accident']],C:[['😢','sad'],['😟','sorry'],['😄','happy']],G:[[0,0],[1,1]],
   S:{'1_0':'Sorry is how Zara feels, because she did it. It was Ben\u2019s tower that fell. How would you feel?','2_0':'His tower fell down. Would you feel happy if it were yours?',
    '0_1':'Zara\u2019s tower did not fall. She did it by accident, so she feels sorry.','2_1':'It was an accident, not a joke. Zara feels sorry, not happy.'}}];
 const KNOW=[{strip:[['👧🍪➡️🟦','Mia puts her cookie in the blue box.'],['👧🚪','Mia goes out to play.'],['👦🍪➡️🟥','Tom moves it to the red box.']],q:'Mia comes back. Where will she look first?',
   T:[['🟦','Blue box','Where Mia left it'],['🟥','Red box','Where it is now']],C:[['💭','Mia looks here']],G:[[0,0]],
   S:{'0_1':'We saw Tom move it, but Mia did not. She looks where she left it: the blue box.'}},
  {strip:[['🧒⚽➡️🧸','Raj puts his ball in the toy box.'],['🧒🛏️','Raj goes to bed.'],['👨⚽➡️🏠','Dad puts the ball in the shed.']],q:'Next morning, where will Raj look for his ball?',
   T:[['🧸','Toy box','Where Raj left it'],['🏠','Shed','Where it is now']],C:[['💭','Raj looks here']],G:[[0,0]],
   S:{'0_1':'Raj was asleep. He does not know Dad moved it, so he looks in the toy box.'}}];
 const SIDES=[{top:['Leo is on the swing. Ava has been waiting.','Both want it. Whose reason is whose?'],q:'Drag each reason to the child who would say it.',
   T:[['👧','Ava','Waiting'],['👦','Leo','On the swing']],C:[['💬','I waited a long time.'],['💬','I only just got on.'],['💬','It is my turn next.'],['💬','I nearly touched the sky!']],G:[[0,0],[1,1],[2,0],[3,1]]}];
 const PAST=[{top:['A big, friendly dog runs up and wags its tail.'],q:'Same dog, three children. How does each one feel?',
   T:[['🧒','Sam','Has a dog at home'],['👧','Kit','A dog knocked her over'],['👦','Jo','Never met a dog']],C:[['😃','excited'],['😨','scared'],['🤔','not sure']],G:[[0,0],[1,1],[2,2]],
   S:{'1_0':'Sam has a dog at home. Dogs feel safe and fun to Sam.','2_0':'Sam knows dogs well, so Sam is not unsure.','0_1':'You may love dogs, but Kit was knocked over by one. Think what Kit remembers.',
    '2_1':'Kit does know dogs: one knocked her over. That memory makes her scared.','0_2':'Jo has never met a dog, so Jo does not know what to expect yet.','1_2':'Jo has no bad memory of dogs. Jo just does not know yet.'}}];
 const FIX=[{top:['You are on the swing. Ava says,','"I have waited ages!"'],q:'Which reply shows you see Ava\u2019s side?',
   T:[['🗨️','You say','']],C:[['💬','You waited ages. Ten more pushes, then it is yours.'],['💬','I got here first. Go away.'],['💬','Stop moaning. It is just a swing.']],G:[[0,0]],
   S:{'1_0':'That only says your side. Ava waited too. How would you feel if you were her?','2_0':'That says her feelings do not count. Name what she feels first.'}},
  {top:['Kai drops your book in a puddle.','He looks shocked.'],q:'What is the best first thing to say?',
   T:[['🗨️','You say','']],C:[['💬','You look shocked. Was it an accident?'],['💬','You did that on purpose!'],['💬','I am never sharing again!']],G:[[0,0]],
   S:{'1_0':'You guessed he meant it without asking. His shocked face is a clue it was an accident.','2_0':'That only shows your feeling. Check his side first: was it an accident?'}}];
 const SETS=[FEEL,KNOW,SIDES,PAST,FIX];
VIS.reg('flagpov',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const K={r:0,got:[],put:{},hold:null,sel:-1,bad:-1,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const fs=z=>A.narrow?z:z+3,X=f=>f*A.W,Y=f=>f*A.H,set=()=>SETS[A.step]||[],rd=()=>set()[K.r];
 function words(x,t,cx,cy,w,z,k,wt){x.font=`${wt||700} ${fs(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;
  const ln=[];let cur='';t.split(' ').forEach(s=>{const n=cur?cur+' '+s:s;if(x.measureText(n).width>w&&cur){ln.push(cur);cur=s}else cur=n});ln.push(cur);
  const lh=fs(z)*1.25;ln.forEach((l,i)=>x.fillText(l,cx,cy+(i-(ln.length-1)/2)*lh))}
 const box=(x,r,k,thick,a)=>{x.fillStyle=A.alpha(k,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);x.fill();x.strokeStyle=k;x.lineWidth=thick?4:2;x.stroke()};
 const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 // people or places sit in one row of cards; the cards to hand out sit underneath
 function card(t,n){const g=8,w=(A.W-(n+1)*g)/n;return{x:g+t*(w+g),y:Y(.3),w,h:Y(.33)}}
 function chipR(i,R){const n=R.C.length,long=R.C[0][1].length>16,cols=long?(A.narrow?1:2):n,rows=Math.ceil(n/cols),g=6,top=Y(.66),hh=(Y(.98)-top-(rows-1)*g)/rows;
  const w=(A.W-(cols+1)*g)/cols,h=mn(hh,Y(.15));return{x:g+(i%cols)*(w+g),y:top+Math.floor(i/cols)*(h+g),w,h}}
 function used(c){return Object.prototype.hasOwnProperty.call(K.put,c)}
 function story(x,R){const C=A.col;if(R.strip){const n=R.strip.length,g=6,w=(A.W-(n+1)*g)/n;R.strip.forEach((s,i)=>{const r={x:g+i*(w+g),y:Y(.015),w,h:Y(.2)};box(x,r,C.vi,0,.08);
    words(x,s[0],r.x+r.w/2,r.y+r.h*.3,r.w-6,15,C.tx,400);words(x,s[1],r.x+r.w/2,r.y+r.h*.72,r.w-8,10,C.tx,600);x.fillStyle=C.tx;if(i<n-1){x.font=`700 ${fs(12)}px system-ui`;x.fillText('→',r.x+r.w+g/2,r.y+r.h/2)}})}
  else R.top.forEach((l,i)=>words(x,l,A.W/2,Y(.05+i*.075),A.W-16,14,C.tx,i?600:700));words(x,R.q,A.W/2,Y(.255),A.W-16,13,C.vi,800)}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);x.fillRect(0,0,W,H);const R=rd();
  if(A.step>4){words(x,K.Q||'👟',W/2,H/2,W,56,C.tx,400);return A.fx.draw(x)}
  if(!R){words(x,'✓ '+DONE[A.step],W/2,H/2,W-30,17,C.gr,800);return A.fx.draw(x)}story(x,R);
  R.T.forEach((t,i)=>{const r=card(i,R.T.length),c=Object.keys(K.put).find(k=>K.put[k]===i);box(x,r,i===K.bad?C.rd:c!=null?C.gr:C.cy,i===K.bad||c!=null);
   words(x,t[0],r.x+r.w/2,r.y+r.h*.2,r.w,26,C.tx,400);words(x,t[1],r.x+r.w/2,r.y+r.h*.45,r.w-6,14,C.tx,800);if(t[2])words(x,t[2],r.x+r.w/2,r.y+r.h*.63,r.w-10,10,C.tx,500);
   if(c!=null){const k=R.C[c];words(x,k[1].length>16?k[0]+' ✓':k[0]+' '+k[1],r.x+r.w/2,r.y+r.h*.86,r.w-6,12,C.tx,800)}});
  R.C.forEach((k,i)=>{if(used(i))return;let r=chipR(i,R);if(K.hold&&K.hold.c===i)r={...r,x:K.hold.x-r.w/2,y:K.hold.y-r.h/2};box(x,r,i===K.sel?C.vi:C.am,i===K.sel,.22);
   words(x,k[1].length>16?k[1]:k[0]+' '+k[1],r.x+r.w/2,r.y+r.h/2,r.w-10,k[1].length>16?12:15,C.tx,700)});A.fx.draw(x)}
 const DONE=['Ben feels sad and Zara feels sorry: same moment, two views.','People look where they think a thing is, not where it really is.','Both children had a fair reason.','One dog, three feelings: each child\u2019s past shapes their view.','You named their feeling first, then fixed it.'];
 function give(c,t){const R=rd();if(!R||used(c))return;K.hold=null;K.sel=-1;const g=R.G.find(p=>p[0]===c&&p[1]===t);
  if(!g){K.bad=t;A.sound.miss();const own=R.G.find(p=>p[0]===c);say((R.S&&R.S[c+'_'+t])||`That reason belongs to ${R.T[own[1]][1]}. Think: what is ${R.T[own[1]][1]} doing right now?`);refresh();return}
  K.bad=-1;K.put[c]=t;A.sound.pop();const left=R.G.filter(p=>!used(p[0])).length;
  if(!left){K.r++;K.put={};tell(K.r<set().length?'Yes! Next story.':'Yes!')}else tell('Yes!')}
 function tell(msg){const R=rd();let t;if(A.step>4)t='Challenge time.';else if(!R)t=DONE[A.step];
  else t=(R.top?R.top.join(' '):R.strip.map(s=>s[1]).join(' '))+' '+R.q+(K.sel>=0?` You picked ${R.C[K.sel][1]}. Now choose who or where.`:'');
  say((msg?msg+' ':'')+t);refresh();K.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const R=rd();if(!R||A.step>4)return A.redraw();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(K.sel<0)R.C.forEach((k,i)=>{if(!used(i))B((k[1].length>16?'💬 ':k[0]+' ')+k[1],()=>{K.sel=i;tell()},'Pick '+k[1])});
  else{R.T.forEach((t,i)=>B('➡️ '+t[1],()=>give(K.sel,i),`Give ${R.C[K.sel][1]} to ${t[1]}`));B('↩ Pick again',()=>{K.sel=-1;tell()})}A.redraw()}
 const fin=(n,msg)=>()=>{if(A.step===n&&K.r>=SETS[n].length&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const run=(fl,gap)=>{const g=K.gen;fl.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},j*gap))};
 const fresh=()=>{K.gen++;K.want=()=>{};K.hold=null;K.sel=-1;K.bad=-1;K.r=0;K.put={}};
 const showAll=n=>()=>{steps[n].go();run(SETS[n].flatMap(R=>R.G.map(g=>()=>give(g[0],g[1]))),480)};
 const steps=[
  {h:'One moment, two views',p:'The same thing can feel very different to two people. Ask: how would I feel if that happened to me?',
   predict:{q:'The tower fell. Do Ben and Zara feel the same?',opts:['Yes, they both feel the same','No, each feels something different'],ans:1},task:'Give Ben and Zara a face each',
   show:showAll(0),go:()=>{fresh();tell();K.want=fin(0,'Ben is sad his tower fell. Zara is sorry she knocked it.')}},
  {h:'What do they know?',p:'People act on what they know. If they did not see something change, they still think it is the old way.',
   predict:{q:'Mia did not see Tom move the cookie. Where will she look first?',opts:['The red box, where it is now','The blue box, where she left it'],ans:1},task:'Say where each child will look',
   show:showAll(1),go:()=>{fresh();tell();K.want=fin(1,'They look where they think it is. We know more than they do.')}},
  {h:'Two sides',p:'In a quarrel, each person has a reason that feels fair to them. Find both.',task:'Give every reason to the right child',
   show:showAll(2),go:()=>{fresh();tell();K.want=fin(2,'Ava waited; Leo just got on. Both reasons make sense.')}},
  {h:'Same dog, new eyes',p:'What has happened to someone before changes how they feel now. You need to think about their past, not yours.',
   predict:{q:'A friendly dog runs up. Will all three children feel the same?',opts:['Yes, the dog is friendly','No, it depends on each child'],ans:1},task:'Match a feeling to each child',
   show:showAll(3),go:()=>{fresh();tell();K.want=fin(3,'Sam is excited, Kit is scared, Jo is not sure.')}},
  {h:'Use it to fix it',p:'Seeing their side helps you choose kind words. Say what they feel, then find a fair fix.',task:'Pick the best reply both times',
   show:showAll(4),go:()=>{fresh();tell();K.want=fin(4,'Name their feeling, check their side, then fix it.')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['Jay\u2019s sandcastle is washed away by a wave. How might Jay feel?','🏖️',[['Sad or cross','ok'],['Glad, it is only sand','onlysand'],['The same as the wave','nofeel']]],
  ['Ella hides the teddy under the bed while Max is outside. Where will Max look first?','🧸',[['Where he last saw it','ok'],['Under the bed','knowall'],['He will just know','magic']]],
  ['Nia loves thunder. Ollie hides when it thunders. Why?','⛈️',[['People can feel differently about one thing','ok'],['Ollie is wrong to be scared','wrongfeel'],['Nia is pretending','pretend']]],
  ['A new girl sits alone at lunch. How would you feel if it were you?','🍎',[['Lonely. I would want someone to say hi','ok'],['Fine. Lunch is just lunch','fine'],['It is her own fault','fault']]],
  ['Sam bumps you in the line and says "Oops!" What is a good first thought?','🚶',[['Maybe it was an accident','ok'],['He did it on purpose','purpose'],['I will bump him back','back']]],
  ['You and a friend want to play different games. What helps most?','🎲',[['Ask what they want and why','ok'],['Pick yours and walk off','mine'],['Say their idea is silly','silly']]]];
 let qn=-1,stars=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>check(tag)});say('Challenge: '+q);A.redraw()}
 function check(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! You stepped into their shoes.';break;
   case 'onlysand':m='It is only sand to you. Jay worked hard on it. How would you feel?';break;
   case 'nofeel':m='Waves do not have feelings, but Jay does. Think about Jay.';break;
   case 'knowall':m='You know it is under the bed. Max was outside, so he does not.';break;
   case 'magic':m='Nobody just knows. Max only knows what he saw.';break;
   case 'wrongfeel':m='Feelings are not right or wrong. Something may have scared Ollie before.';break;
   case 'pretend':m='Nia really can love thunder. Two people can feel two ways about one thing.';break;
   case 'fine':m='Maybe for you, but picture sitting alone on your first day. Most people feel lonely.';break;
   case 'fault':m='Blaming her skips her side. She is new and knows nobody yet.';break;
   case 'purpose':m='He said "Oops!" That is a clue it was an accident. Check his side first.';break;
   case 'back':m='Bumping back starts a fight. Think how he might feel first.';break;
   case 'mine':m='That only looks at your side. Ask about theirs, then find a fair plan.';break;
   default:m='Calling an idea silly hurts. Ask what they like about it.'}
  const good=tag==='ok';if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const R=rd();K.hold=null;if(!R||A.step>4)return false;
  const i=R.C.findIndex((_,i)=>!used(i)&&hit(p,chipR(i,R)));if(i>=0){K.hold={c:i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const t=R.T.findIndex((_,i)=>hit(p,card(i,R.T.length)));if(t>=0&&K.sel>=0)give(K.sel,t);return false}
 function move(p){if(K.hold){K.hold.x=p.x;K.hold.y=p.y;A.redraw()}}
 function up(p){const h=K.hold,R=rd();if(!h||!R)return;K.hold=null;if(Math.hypot(p.x-h.x0,p.y-h.y0)<12){K.sel=h.c;return tell()}
  const t=R.T.findIndex((_,i)=>hit(p,card(i,R.T.length)));if(t>=0)give(h.c,t);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
