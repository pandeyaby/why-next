/* Flagship – story lessons and morals (ages 7–8): sort "what happens" from "the lesson", tap the key details that prove
   "slow and steady wins the race", build choice → result → lesson for The Ant and the Grasshopper, pick the moral of
   folktales from Greece, Ghana and India, then turn a story-only rule into a lesson for everyone. Drag or tap. */
(()=>{
const EVT=[['🏁','The tortoise won the race.',0,'That is what happens in the story. It is an event, not the lesson.'],
 ['💡','Slow and steady wins the race.',1,'Nobody says this in the race. It is a rule for your life, so it is the lesson.'],
 ['💤','The hare had a nap.',0,'The nap is something that happens. Ask: what does it teach me?'],
 ['🙊','Do not show off. Keep going.',1,'This is advice you can use too. That makes it a lesson.']];
const CLU=[['💤','The hare naps under a tree.',1,'Yes! Fast is not enough if you stop.'],['🐢','The tortoise keeps walking, step by step.',1,'Yes! The tortoise never stops. That is steady.'],
 ['🌳','The race goes past a big tree.',0,'That is just where it happens. It does not show why steady wins.'],['🏁','The tortoise gets to the end first.',1,'Yes! Steady wins. This proves the lesson.'],
 ['👂','The hare has long ears.',0,'True, but long ears do not show the lesson. Pick a detail about what they do.']];
const CHAIN=[['☀️','Choice','In summer, the ant stores food. The grasshopper just sings.'],['❄️','Result','Winter comes. The grasshopper has no food.'],['💡','Lesson','Get ready now for what you will need later.']];
const LINKMSG=[['Yes! The story starts with a choice.','The choice comes first. The rest happens because of it.'],['Yes! The choice leads to a result.','The result comes after the choice. It shows what the choice led to.'],['Yes! The lesson comes last. You work it out from the choice and the result.','The lesson comes last. You work it out from the choice and the result.']];
const TALES=[['🦁','The Lion and the Mouse','Aesop, Greece','A lion lets a little mouse go free. Later, the mouse chews the net and saves the lion.',
  [['Kind acts can come back to help you.',1,''],['The mouse chewed a net.',0,'That is what happens. Ask: what does it teach me?'],['Lions are big. Mice are small.',0,'That is about the animals. A lesson is something you can use.']]],
 ['🕷️','Anansi and the Pot of Wisdom','Ashanti, Ghana','Anansi hides all the wisdom in a pot. His small son shows him a better way to climb.',
  [['Nobody knows everything.',1,''],['Anansi climbed a tall tree.',0,'That is an event. Think about what Anansi learned.'],['Spiders are good at climbing.',0,'That is a fact about spiders, not the message.']]],
 ['🐒','The Monkey and the Crocodile','Panchatantra, India','A crocodile wants the monkey\u2019s heart. The monkey says, “It is up in the tree!” and gets away.',
  [['Stay calm and think fast in danger.',1,''],['Crocodiles swim in rivers.',0,'That is a fact, not a lesson. Look at how the monkey got away.'],['Never go near rivers.',0,'The story is not about rivers. It shows the monkey thinking fast.']]]];
const WOLF=[['🗣️','Tell the truth, so people trust you.',0,'Anyone can use this. It is a lesson for everyone.'],['🐺','The boy should not shout “Wolf!”',1,'This is only about the boy. Say it so it fits anyone.'],
 ['🤥','If you tell lies, people stop believing you.',0,'This fits anyone, anywhere. It is a lesson for everyone.'],['🐑','The wolf ate the sheep.',1,'That is an event in this story, not a rule for everyone.']];
VIS.reg('flagmoral',c=>{let A,pad,qbox,qn=-1,streak=0,tok=0;c.fig.classList.add('young');
const fresh=()=>({deck:[],got:[],n:0,drag:null,miss:-1,flash:-1,round:0,fill:0,order:[1,0,2],then:()=>{}}),st=fresh();
const mode=()=>['sort','clue','chain','tale','wolf','quiz'][A.step],need=()=>({sort:4,clue:3,chain:3,tale:3,wolf:4}[mode()]||99);
const sz=n=>Math.round(n*(A.narrow?1:1.12));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function wrap(g,t,x,y,w,n,col){g.font=`700 ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(g.measureText(k).width>w&&cur){rows.push(cur);cur=s}else cur=k});rows.push(cur);
 const lh=sz(n)*1.2;rows.forEach((l,i)=>g.fillText(l,x,y+(i-(rows.length-1)/2)*lh,w))}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function box(g,r,fill,line,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=line;g.lineWidth=lw||2;g.stroke()}
const inside=(p,r)=>p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const ink=()=>A.mix(A.col.tx,A.col.pn,.4),paper=()=>A.col.dark?'#1e293b':'#ffffff',tint=(c0,k)=>A.mix(A.col.pn,c0,A.col.dark?.22:k||.55);
/* layout */
const dock=()=>({x:A.W*.06,y:A.H*.77,w:A.W*.88,h:A.H*.19});
const bins=()=>[0,1].map(i=>({x:i*A.W/2+6,y:A.H*.03,w:A.W/2-12,h:A.H*.7}));
const clueBoxes=()=>{const cols=A.narrow?2:3,w=(A.W-16)/cols-8,h=A.H*(A.narrow?.22:.3);return CLU.map((_,i)=>({x:8+(i%cols)*(w+8)+4,y:A.H*.2+Math.floor(i/cols)*(h+8),w,h}))};
const links=()=>[0,1,2].map(i=>({x:A.W*.04,y:A.H*(.03+i*.245),w:A.W*.92,h:A.H*.21}));
const gapBox=()=>({x:A.W*.08,y:A.H*.38,w:A.W*.84,h:A.H*.17});
const opts=()=>{const w=(A.W-16)/3-8,h=A.H*.34;return[0,1,2].map(i=>({x:8+i*(w+8)+4,y:A.H*.62,w,h}))};
const targets=()=>({sort:bins(),wolf:bins(),chain:links(),tale:[gapBox()]}[mode()]||[]);
const carried=r=>st.drag&&st.drag.x!=null?{...r,x:st.drag.x-r.w/2,y:st.drag.y-r.h/2}:r;
function card(g,e,t,r,bad){box(g,r,paper(),bad?A.col.rd:ink(),bad?4:2);emo(g,e,r.x+r.h*.4,r.y+r.h/2,Math.min(r.h*.5,40));wrap(g,t,r.x+r.h*.75+(r.w-r.h*.75)/2,r.y+r.h/2,r.w-r.h*.9,13)}
function drawBins(g,set,labels,cols){const C=A.col;bins().forEach((r,i)=>{box(g,r,tint(cols[i]),i===st.flash?C.vi:ink(),i===st.flash?5:2);wrap(g,labels[i],r.x+r.w/2,r.y+24,r.w-10,14);
  st.got.filter(o=>o.b===i).forEach((o,j)=>emo(g,set[o.k][0],r.x+r.w*(.28+.44*(j%2)),r.y+r.h*(.42+.3*Math.floor(j/2)),Math.min(r.w*.22,42)))});
 const k=st.deck[0];if(k!=null)card(g,set[k][0],set[k][1],carried(dock()),st.miss===k)}
function drawClue(g){const C=A.col;box(g,{x:A.W*.04,y:A.H*.03,w:A.W*.92,h:A.H*.13},tint('#fde68a',.7),ink());wrap(g,'💡 Lesson: Slow and steady wins the race.',A.W/2,A.H*.095,A.W*.86,15);
 clueBoxes().forEach((r,i)=>{const on=st.got.includes(i);box(g,r,on?tint('#bbf7d0',.7):paper(),i===st.miss?C.rd:on?(C.dark?'#4ade80':'#15803d'):i===st.flash?C.vi:ink(),on||i===st.miss||i===st.flash?4:2);
  emo(g,CLU[i][0],r.x+r.w/2,r.y+r.h*.27,Math.min(r.h*.3,36));wrap(g,CLU[i][1],r.x+r.w/2,r.y+r.h*.68,r.w-10,12)})}
function drawChain(g){const C=A.col;links().forEach((r,i)=>{const on=i<st.fill,nx=i===st.fill;box(g,r,on?tint('#fde68a',.6):C.pn,nx||i===st.flash?C.vi:ink(),nx?4:2);
  wrap(g,(i+1)+'. '+CHAIN[i][1],r.x+r.w*.13,r.y+r.h/2,r.w*.22,13,C.tx);
  if(on){emo(g,CHAIN[i][0],r.x+r.w*.3,r.y+r.h/2,Math.min(r.h*.5,36));wrap(g,CHAIN[i][2],r.x+r.w*.66,r.y+r.h/2,r.w*.6,13)}else wrap(g,nx?'Drop the next card here':'?',r.x+r.w*.62,r.y+r.h/2,r.w*.6,13,C.mu)});
 const k=st.deck[0];if(k!=null&&mode()==='chain')card(g,CHAIN[k][0],CHAIN[k][2],carried(dock()),st.miss===k)}
function drawTale(g){const C=A.col,T=TALES[st.round%3],top={x:A.W*.04,y:A.H*.02,w:A.W*.92,h:A.H*.33},gp=gapBox();box(g,top,tint('#bfdbfe',.6),ink());
 emo(g,T[0],top.x+top.h*.38,top.y+top.h*.4,Math.min(top.h*.45,50));wrap(g,T[1],top.x+top.w*.58,top.y+top.h*.17,top.w*.74,14);wrap(g,'('+T[2]+')',top.x+top.w*.58,top.y+top.h*.37,top.w*.74,12,C.tx);
 wrap(g,T[3],top.x+top.w*.56,top.y+top.h*.72,top.w*.8,12);g.setLineDash([6,6]);box(g,gp,A.alpha(C.vi,.08),st.flash===0?C.vi:ink(),st.flash===0?5:2);g.setLineDash([]);
 wrap(g,st.n>st.round?'✓ That is the lesson!':'The lesson is…?',gp.x+gp.w/2,gp.y+gp.h/2,gp.w-12,14);
 if(st.n<=st.round&&st.n<3)opts().forEach((b,j)=>{const o=T[4][st.order[j]],r=st.drag&&st.drag.j===j?carried(b):b;box(g,r,paper(),st.miss===j?C.rd:ink(),st.miss===j?4:2);wrap(g,o[0],r.x+r.w/2,r.y+r.h/2,r.w-12,12)})}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='sort')drawBins(g,EVT,['📖 What happens','💡 The lesson'],['#bfdbfe','#fde68a']);if(m==='clue')drawClue(g);if(m==='tale')drawTale(g);
 if(m==='wolf')drawBins(g,WOLF,['🌍 Lesson for everyone','📍 Only this story'],['#bbf7d0','#fecaca']);if(m==='chain'||m==='quiz'){if(m==='quiz')st.fill=3;drawChain(g)}A.fx.draw(g)}
function flash(i){st.flash=i;const v=tok;setTimeout(()=>{if(v===tok){st.flash=-1;A.redraw()}},420)}
function nope(t){A.sound.miss();tell(t);A.redraw()}
function good(t){st.n++;st.miss=-1;A.sound.pop();tell(t);keys();A.redraw();st.then()}
/* drop the dock card into bin b */
function put(b){const k=st.deck[0];if(k==null||st.n>=need())return;flash(b);const set=mode()==='sort'?EVT:WOLF,it=set[k];
 if(it[2]!==b){st.miss=k;return nope(it[3])}st.got.push({k:st.deck.shift(),b});good('Yes! '+it[3])}
function pick(i){if(st.n>=3||st.got.includes(i))return;flash(i);const it=CLU[i];if(!it[2]){st.miss=i;return nope(it[3])}st.got.push(i);good(it[3]+(st.n>=2?' Three key details prove the lesson.':''))}
function link(s){const k=st.deck[0];if(k==null||st.n>=3)return;flash(s);if(s!==st.fill)return nope(`Fill box ${st.fill+1} next.`);
 if(k!==st.fill){st.miss=k;const v=tok;setTimeout(()=>{if(v===tok&&st.deck[0]===k){st.deck.push(st.deck.shift());st.miss=-1;keys();A.redraw()}},A.reduced()?10:900);return nope(LINKMSG[k][1])}
 st.deck.shift();st.fill++;good(LINKMSG[k][0])}
function choose(j){if(st.n>=3||st.n>st.round)return;flash(0);const T=TALES[st.round%3],o=T[4][st.order[j]];if(!o[1]){st.miss=j;return nope(o[2])}
 const v=tok;good(`Yes! ${T[1]} teaches: ${o[0]}`);if(st.n<3)setTimeout(()=>{if(v===tok){st.round++;st.order=st.round%2?[2,0,1]:[1,2,0];st.miss=-1;keys();A.redraw()}},A.reduced()?20:1000)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||st.n>=need())return;
 const K=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if((m==='sort'||m==='wolf')&&st.deck.length){const set=m==='sort'?EVT:WOLF,lab=m==='sort'?['📖 What happens','💡 The lesson']:['🌍 For everyone','📍 Only this story'];lab.forEach((t,b)=>K(t,`${set[st.deck[0]][1]}: ${t.slice(3)}`,()=>put(b)))}
 if(m==='clue')CLU.forEach((it,i)=>{if(!st.got.includes(i))K(it[0]+' '+it[1],'Key detail? '+it[1],()=>pick(i))});
 if(m==='chain')st.deck.forEach(k=>K(CHAIN[k][0]+' '+CHAIN[k][1],`${CHAIN[k][1]}: ${CHAIN[k][2]} goes in box ${st.fill+1}`,()=>{st.deck=[k,...st.deck.filter(x=>x!==k)];link(st.fill)}));
 if(m==='tale'&&st.n<=st.round)st.order.forEach((d,j)=>{const o=TALES[st.round%3][4][d];K(o[0],'The lesson is: '+o[0],()=>choose(j))})}
function down(p){const m=mode();if(m==='quiz'||st.n>=need())return false;
 if(m==='clue'){const i=clueBoxes().findIndex(r=>inside(p,r));if(i>=0)pick(i);return false}
 if(m==='tale'){const j=opts().findIndex(r=>inside(p,r));if(j>=0&&st.n<=st.round){st.drag={j,x:null,x0:p.x,y0:p.y};return true}return false}
 if(st.deck.length&&inside(p,dock())){st.drag={x:null,x0:p.x,y0:p.y};return true}
 const i=targets().findIndex(r=>inside(p,r));if(i>=0&&st.deck.length)(m==='chain'?link:put)(i);return false}
function move(p){const d=st.drag;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=st.drag,m=mode();st.drag=null;if(!d)return;const i=targets().findIndex(r=>inside(p,r));
 if(m==='tale'){if(d.x!=null&&i<0){tell('Drag the lesson into the gap, or tap a button.');return A.redraw()}return choose(d.j)}
 if(d.x==null||i<0){tell('Drag the card into a box, or tap a button.');return A.redraw()}(m==='chain'?link:put)(i)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++tok;list.forEach((f,j)=>setTimeout(()=>{if(k===tok)f()},A.reduced()?j*40+30:(j+1)*(gap||450)))}
const begin=(deck,extra)=>{tok++;Object.assign(st,fresh(),{deck},extra||{})};
const steps=[
{h:'What happens, or the lesson?',p:'A fable is a short story that teaches a lesson, called the moral. Drag each card: is it what happens, or the lesson?',predict:{q:'“The tortoise won the race.” Is that the lesson?',opts:['Yes, that is the lesson','No, that is what happens'],ans:1},task:'Sort 4 cards',
 show:()=>{steps[0].go();play([0,1,2,3].map(()=>()=>put(EVT[st.deck[0]][2])))},go:()=>{begin([0,1,2,3]);tell('Is it what happens, or the lesson?');keys();st.then=fin(0,()=>st.n>=4,'What happens is the plot. The lesson is what the story teaches you.')}},
{h:'Key details',p:'The Tortoise and the Hare teaches: slow and steady wins the race. Which details prove it? Tap 3.',task:'Find 3 key details',
 show:()=>{steps[1].go();play([0,1,3].map(i=>()=>pick(i)))},go:()=>{begin([]);tell('Tap the details that prove the lesson.');keys();st.then=fin(1,()=>st.n>=3,'Key details show the lesson. Where the race went does not.')}},
{h:'Choice, result, lesson',p:'In a fable, a character makes a choice. Something happens because of it. That teaches the lesson. Drag each card to the next box.',predict:{q:'Where does the lesson in a fable come from?',opts:['The first line of the story','A choice and what happens after it'],ans:1},task:'Build the chain',
 show:()=>{steps[2].go();play([0,1,2].map(k=>()=>{st.deck=[k,...st.deck.filter(x=>x!==k)];link(st.fill)}),600)},go:()=>{begin([2,0,1]);tell('Which card is the choice?');keys();st.then=fin(2,()=>st.n>=3,'Choice, then result, then lesson. The grasshopper did not get ready, so he went hungry.')}},
{h:'Stories from many lands',p:'Fables and folktales come from all over the world. Read each one. Drag its lesson into the gap.',predict:{q:'The Lion and the Mouse. What is the lesson?',opts:['The mouse chewed a net','Kind acts can come back to help you'],ans:1},task:'Find 3 lessons',
 show:()=>{steps[3].go();play([0,1,2].map(()=>()=>choose(st.order.indexOf(0))),1150)},go:()=>{begin([],{order:[1,0,2]});tell('Read the story. Pick its lesson.');keys();st.then=fin(3,()=>st.n>=3,'Each lesson is a rule for life, not a thing that happens.')}},
{h:'A lesson for everyone',p:'The Boy Who Cried Wolf lied about a wolf. When a real wolf came, no one believed him. A moral should help anyone. Sort the cards.',task:'Sort 4 cards',
 show:()=>{steps[4].go();play([0,1,2,3].map(()=>()=>put(WOLF[st.deck[0]][2])))},go:()=>{begin([1,0,3,2]);tell('Is it a lesson for everyone, or only about this story?');keys();st.then=fin(4,()=>st.n>=4,'Say a moral as a rule anyone can use: tell the truth, so people trust you.')}},
{h:'Challenge',p:'',go:()=>{begin([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.then()});
const QS=[['The Ant and the Grasshopper. What is the moral?',[['Get ready now for later','ok'],['The ant carried food','event'],['Ants work hard','topic']]],
 ['Which detail proves “slow and steady wins”?',[['The tortoise never stops','ok'],['The race passes a tree','place'],['The hare has long ears','looks']]],
 ['Which is a lesson for everyone?',[['Tell the truth, so people trust you','ok'],['The boy should not shout “Wolf!”','narrow'],['The boy looked after sheep','event']]],
 ['The Lion and the Mouse. What does it teach?',[['Kind acts can come back to help you','ok'],['Lions sleep in the day','topic'],['Small animals are no help','opposite']]],
 ['Where do you find a fable\u2019s lesson?',[['In a choice and what happens after','ok'],['Only in the title','title'],['In the first line','first']]]];
function why(t){let m='Look back at the lab: a lesson is a rule for life, shown by key details.';
 if(t==='event')m='That is what happens in the story. The moral is what it teaches you.';
 if(t==='topic')m='That is what the story is about, not what it teaches. Ask: what should I do?';
 if(t==='place')m='Where the race goes does not prove anything. Pick a detail about what a character does.';
 if(t==='looks')m='How the hare looks does not show the lesson. Look at what each animal does.';
 if(t==='narrow')m='That only fits the boy. Say the moral so it helps anyone.';
 if(t==='opposite')m='The story shows the opposite: the little mouse saves the lion.';
 if(t==='title')m='The title names the characters. The lesson comes from their choices.';
 if(t==='first')m='The first line starts the story. You find the lesson by what happens after a choice.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is the lesson.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
