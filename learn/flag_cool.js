/* Flagship – emotions and decision-making (ages 9–11): turn up an anger dial and watch your choices vanish, sort
hot-moment choices from cool-head choices, wait out an angry text before sending, build the stop-think-choose plan in
order, and decide when a feeling is a warning to listen to and when to cool it first. */
(()=>{
// choices for "a friend posts a joke about you"; each fades once anger passes its level
const OPTS=[['💬 Ask what they meant',.3],['🧑‍🏫 Tell a trusted adult',.45],['😄 Laugh it off',.25],['📅 Talk tomorrow',.4],['😡 Post a mean reply',2],['🚪 Storm off',2]];
const HOT={scene:'🧱 Your little brother knocks over the Lego tower you spent all day on.',bins:['🔥 Hot moment','❄️ Cool head'],cards:[
['Shout “I hate you!”',0,'Shouting something hurtful is what a hot moment pushes you to do.'],
['Say “That made me really cross.”',1,'Naming the feeling calmly is a cool-head choice.'],
['Break one of his toys back',0,'Getting even feels good for a second, then makes things worse. Hot moment.'],
['Ask him to help rebuild it',1,'Fixing the problem together is a cool-head choice.'],
['Slam the door',0,'Slamming doors is the body alarm talking. Hot moment.'],
['Build on a high shelf next time',1,'Planning to stop it happening again needs a cool head.']]};
const DRAFT_HOT='You are the WORST friend ever!!! 😡',DRAFT_COOL='I felt left out when you went without me. Can we talk?';
const PLAN=[['👀 Notice the feeling','Start by noticing: “I am really angry.” You cannot cool a feeling you have not spotted.'],
['⏸️ Pause and cool down','After noticing, pause. Breathe, walk away or count before you plan.'],
['📝 List your options','Once calmer, list a few options. Do not pick yet.'],
['🔮 Think ahead','Before choosing, think what each option leads to next.'],
['✅ Choose','Choosing comes last. Choosing first is the hot-moment shortcut.']];
const MIX=[3,0,4,2,1];
const WARN={bins:['👂 Listen to it','❄️ Cool it first'],cards:[
['A stranger in a car asks you to get in. You feel scared.',0,'Fear here is a warning. Listen: say no, get away and tell a trusted adult.'],
['Someone pushes in front of you in the lunch queue. You feel furious.',1,'The anger is fair, but acting while furious makes it worse. Cool off, then speak up calmly.'],
['Friends dare you to climb onto the garage roof. Your tummy feels uneasy.',0,'That uneasy feeling is your sense of danger. Listen to it and say no.'],
['You lose a match and want to quit the team forever.',1,'Disappointment makes big choices feel urgent. Wait a day before deciding.']]};
VIS.reg('flagcool',c=>{let A,ctl,quiz;
const st={heat:0,peak:0,down:0,n:0,sorted:[],mins:0,sent:0,cool:0,regret:0,slots:[],sel:null,drag:null,from:null,bad:null,gen:0,hook:()=>{}};
const part=()=>['dial','sort','text','plan','warn','quiz'][A.step];
const col=()=>A.col,px=v=>Math.round(v*(A.narrow?1.1:1.32));
const within=(q,b)=>!!b&&q.x>=b.x&&q.x<=b.x+b.w&&q.y>=b.y&&q.y<=b.y+b.h;
const anger=()=>part()==='text'?(st.cool?.1:.95*Math.exp(-st.mins/15)):st.heat;
function say(m){c.say(m);if(A)A.cv.setAttribute('aria-label',m)}
function write(g,s,x,y,size,o){o=o||{};g.font=`${o.w||700} ${px(size)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||col().tx;g.fillText(s,x,y)}
function para(g,s,x,y,maxW,size,o){g.font=`${(o&&o.w)||700} ${px(size)}px system-ui,sans-serif`;const out=[];let line='';
for(const w of s.split(' ')){const t=line?line+' '+w:w;if(g.measureText(t).width>maxW&&line){out.push(line);line=w}else line=t}out.push(line);
const lh=px(size)*1.3;out.forEach((l,i)=>write(g,l,x,y+(i-(out.length-1)/2)*lh,size,o));return out.length}
function tile(g,b,stroke,fillA,lw){g.fillStyle=A.alpha(stroke,fillA);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=stroke;g.stroke()}
const bare=t=>t.replace(/^\S+\s/,''),heatCol=v=>v>.6?'#dc2626':v>.35?'#d97706':'#16a34a';

// 1: anger dial
const dialB=()=>({x:A.W*.05,y:A.H*.1,w:Math.min(A.W*.2,90),h:A.H*.8});
const optB=i=>{const x=A.W*.32,h=(A.H*.8-5*8)/6;return{x,y:A.H*.1+i*(h+8),w:A.W*.64,h}};
const seen=()=>OPTS.filter(o=>anger()<o[1]).length;
function paintDial(g){const d=dialB(),v=st.heat;tile(g,d,A.alpha(col().tx,.5),.05,1.5);const top=d.y+d.h*(1-v);
g.fillStyle=A.alpha(heatCol(v),.35);A.paint.rrect(d.x+3,top,d.w-6,d.y+d.h-top-3,10);g.fill();
write(g,'🌋',d.x+d.w/2,d.y-px(2)+px(14),16,{w:400});write(g,'😌',d.x+d.w/2,d.y+d.h-px(14),16,{w:400});
g.fillStyle=col().or;A.paint.rrect(d.x-5,top-10,d.w+10,20,10);g.fill();write(g,'drag',d.x+d.w/2,top,9,{c:'#111',w:800});
write(g,`Anger ${Math.round(v*10)}/10`,d.x+d.w/2,A.H*.05,10,{w:800});
write(g,`Choices you can see: ${seen()} of 6`,A.W*.32,A.H*.05,10,{al:'left',w:800});
OPTS.forEach(([t,lv],i)=>{const b=optB(i),on=v<lv;g.globalAlpha=on?1:.18;tile(g,b,lv>1?col().rd:col().cy,on?.14:.05);write(g,t,b.x+12,b.y+b.h/2,11,{al:'left'});g.globalAlpha=1;
if(!on){g.strokeStyle=A.alpha(col().tx,.5);g.setLineDash([5,5]);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.stroke();g.setLineDash([])}})}
// 2 and 5: decks
const deckNow=()=>part()==='sort'?HOT:WARN;
const topCard=()=>({x:A.W*.06,y:A.H*(part()==='sort'?.16:.05),w:A.W*.88,h:A.H*.26});
const binB=j=>{const w=A.W*.45;return{x:A.W*.03+j*(w+A.W*.04),y:A.H*.52,w,h:A.H*.45}};
function paintDeck(g){const D=deckNow(),cd=D.cards[st.n];if(D.scene)para(g,D.scene,A.W/2,A.H*.07,A.W*.9,10,{w:800});
D.bins.forEach((t,j)=>{const b=binB(j);tile(g,b,st.bad===j?col().rd:(j?col().cy:col().or),.08,st.bad===j?3.5:2);write(g,t,b.x+b.w/2,b.y+px(13),11,{w:800});
st.sorted.filter(k=>D.cards[k][1]===j).forEach((k,r)=>{const s=D.cards[k][0];write(g,'✓ '+(s.length>26?s.slice(0,24)+'…':s),b.x+8,b.y+px(32)+r*px(15),8,{al:'left',w:600})})});
if(cd){let b=topCard();if(st.drag!=null&&st.at)b={...b,x:st.at.x-b.w/2,y:st.at.y-b.h/2};g.save();A.paint.shadow(10,3,.2);tile(g,b,col().vi,.16,2.5);g.restore();
para(g,cd[0],b.x+b.w/2,b.y+b.h/2,b.w-24,12);write(g,`${st.n+1} of ${D.cards.length} · drag to a box`,A.W/2,A.H*.47,8,{w:600})}else write(g,'All sorted ✓',A.W/2,A.H*.3,15,{c:col().gr})}
// 3: angry text
const phoneB=()=>({x:A.W*.05,y:A.H*.05,w:A.W*(A.narrow?.9:.5),h:A.H*(A.narrow?.5:.9)});
const clockB=()=>A.narrow?{x:A.W*.05,y:A.H*.6,w:A.W*.42,h:A.H*.36}:{x:A.W*.6,y:A.H*.05,w:A.W*.36,h:A.H*.42};
const meterB=()=>A.narrow?{x:A.W*.53,y:A.H*.6,w:A.W*.42,h:A.H*.36}:{x:A.W*.6,y:A.H*.52,w:A.W*.36,h:A.H*.43};
function paintText(g){const p=phoneB(),v=anger();tile(g,p,A.alpha(col().tx,.6),.06,2);write(g,'To: Maya 💬',p.x+14,p.y+px(16),10,{al:'left',w:800});
const bub={x:p.x+p.w*.12,y:p.y+p.h*.3,w:p.w*.8,h:p.h*.42};tile(g,bub,st.cool?col().gr:heatCol(v),.16,2);
para(g,st.cool?DRAFT_COOL:DRAFT_HOT,bub.x+bub.w/2,bub.y+bub.h/2,bub.w-20,11);
if(st.regret)write(g,'Sent too soon: Maya is hurt. Undone, try again.',p.x+p.w/2,p.y+p.h*.86,9,{c:col().tx,w:800});
else if(st.sent)write(g,'✓ Sent calmly. Maya replies: “Sorry! Yes, let’s talk.”',p.x+p.w/2,p.y+p.h*.86,9,{c:col().tx,w:800});
const k=clockB();tile(g,k,col().cy,.08);const r=Math.min(k.w,k.h)*.28,cx=k.x+k.w/2,cy=k.y+k.h*.45;g.strokeStyle=col().tx;g.lineWidth=2;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();
const a=-Math.PI/2+st.mins/60*2*Math.PI;g.lineWidth=3;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*r*.85,cy+Math.sin(a)*r*.85);g.stroke();
write(g,`⏳ ${st.mins} min · tap to wait`,cx,k.y+k.h*.88,9,{w:800});
const m=meterB();tile(g,m,A.alpha(col().tx,.5),.05,1.5);write(g,'How angry you feel',m.x+m.w/2,m.y+px(13),9,{w:800});
const bh=m.h-px(40),bx=m.x+m.w*.35,bw=m.w*.3,by=m.y+px(26);g.strokeStyle=A.alpha(col().tx,.6);A.paint.rrect(bx,by,bw,bh,8);g.stroke();
g.fillStyle=heatCol(v);A.paint.rrect(bx+3,by+bh*(1-v)+3,bw-6,Math.max(6,bh*v-6),6);g.fill();write(g,Math.round(v*10)+'/10',bx+bw+6,by+bh*(1-v)+8,9,{al:'left',w:800})}
// 4: plan ladder
const rung=i=>{const h=(A.H*.86-4*8)/5;return{x:A.W*.03,y:A.H*.07+i*(h+8),w:A.W*.46,h}};
const pile=i=>{const h=(A.H*.86-4*8)/5;return{x:A.W*.52,y:A.H*.07+i*(h+8),w:A.W*.45,h}};
const loose=()=>MIX.filter(k=>!st.slots.includes(k));
function paintPlan(g){write(g,'Your plan, top to bottom',A.W*.26,A.H*.03,9,{w:800});
PLAN.forEach((x,i)=>{const b=rung(i),k=st.slots[i];tile(g,b,k!=null?col().gr:A.alpha(col().tx,.45),k!=null?.15:.04,k!=null?2.5:1.5);
write(g,k!=null?PLAN[k][0]:`${i+1}. …`,b.x+10,b.y+b.h/2,10,{al:'left'})});
MIX.forEach((k,i)=>{if(st.slots.includes(k))return;let b=pile(i);if(st.drag===k&&st.at)b={...b,x:st.at.x-b.w/2,y:st.at.y-b.h/2};
tile(g,b,st.bad===k?col().rd:col().vi,st.sel===k?.28:.12,st.sel===k||st.bad===k?3.5:2);write(g,PLAN[k][0],b.x+10,b.y+b.h/2,10,{al:'left'})})}
function draw(A){const g=A.ctx;g.fillStyle=A.mix(col().pn,'#e0f2fe',col().dark?.05:.3);g.fillRect(0,0,A.W,A.H);const p=part();
if(p==='dial')paintDial(g);if(p==='sort'||p==='warn')paintDeck(g);if(p==='text')paintText(g);if(p==='plan')paintPlan(g);
if(p==='quiz'){write(g,'🔥 ➜ ⏸️ ➜ ❄️',A.W/2,A.H*.45,28,{w:400});write(g,'Feel it, pause, then choose',A.W/2,A.H*.68,12)}A.fx.draw(g)}

// actions
function setHeat(v){st.heat=Math.max(0,Math.min(1,v));st.peak=Math.max(st.peak,st.heat);if(st.peak>=.9&&st.heat<=.15)st.down=1;update()}
function drop(j){const D=deckNow(),cd=D.cards[st.n];st.drag=null;st.at=null;if(!cd)return;
if(cd[1]!==j){st.bad=j;A.sound.miss();say(`Think again. ${cd[2]}`);setTimeout(()=>{st.bad=null;A.redraw()},900);buttons();return}
st.sorted.push(st.n);st.n++;A.sound.pop();update(cd[2])}
function wait(){if(st.sent)return;st.regret=0;st.mins=Math.min(60,st.mins+5);A.sound.tick();update(st.mins>=15?'The anger has dropped. Now the message looks harsh.':`${st.mins} minutes. Still hot.`)}
function rewrite(){if(st.sent)return;if(anger()>.4){A.sound.miss();say('While you are this angry, the harsh words still feel right. Wait a bit first.');return}st.cool=1;A.sound.pop();update('Rewritten: say how you felt and ask to talk.')}
function send(){if(st.sent)return;if(!st.cool){st.regret=1;st.mins=0;A.sound.miss();update(anger()>.4?'You sent it at the peak of the feeling. Maya is hurt and you wish you had waited. Undone, so try again.':'Even calmer, those harsh words hurt. Rewrite it first. Undone.');return}
st.sent=1;A.win();update('Sent calmly. Waiting changed the choice.')}
function place(k){if(k==null||st.slots.includes(k))return;st.drag=null;st.at=null;const want=st.slots.length;
if(k!==want){st.bad=k;st.sel=k;A.sound.miss();say(`Not yet. ${PLAN[want][1]}`);setTimeout(()=>{st.bad=null;A.redraw()},900);buttons();return}
st.slots.push(k);st.sel=loose()[0]??null;A.sound.pop();update(PLAN[k][1])}
function update(msg){const p=part();let s='';
if(p==='dial')s=`Anger ${Math.round(st.heat*10)} out of 10. You can see ${seen()} of 6 choices: ${OPTS.filter(o=>st.heat<o[1]).map(o=>bare(o[0])).join(', ')}.`+(st.peak<.9?' Turn it up to the top.':st.down?'':' Now cool it right down.');
else if(p==='sort'||p==='warn'){const cd=deckNow().cards[st.n];s=cd?`Card: ${cd[0]}`:'All sorted.'}
else if(p==='text')s=st.sent?'':`${st.mins} minutes passed. Anger ${Math.round(anger()*10)} out of 10.`;
else if(p==='plan')s=st.slots.length<5?`Step ${st.slots.length+1} of the plan is still empty.`:'Plan built.';
say((msg?msg+' ':'')+s);buttons();st.hook()}
function buttons(){if(!A||!ctl)return;ctl.innerHTML='';const p=part(),mk=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
if(p==='dial'){mk('🔥 Hotter',()=>setHeat(st.heat+.25));mk('❄️ Cooler',()=>setHeat(st.heat-.25))}
if(p==='sort'||p==='warn'){const D=deckNow();if(D.cards[st.n])D.bins.forEach((t,j)=>mk('→ '+t,()=>drop(j),`Put the card in ${t}`))}
if(p==='text'&&!st.sent){mk('⏳ Wait 5 minutes',wait);mk('✏️ Rewrite calmly',rewrite);mk('📨 Send',send)}
if(p==='plan'){if(st.sel==null)st.sel=loose()[0]??null;loose().forEach(k=>mk((st.sel===k?'● ':'')+PLAN[k][0],()=>{st.sel=k;place(k)},`Put ${bare(PLAN[k][0])} as the next step`))}
A.redraw()}

// pointer
function down(q){const p=part();st.at=q;st.from=q;
if(p==='dial'){const d=dialB();if(within(q,{x:d.x-12,y:d.y-12,w:d.w+24,h:d.h+24})){st.slide=1;setHeat(1-(q.y-d.y)/d.h);return true}return false}
if(p==='sort'||p==='warn'){if(deckNow().cards[st.n]&&within(q,topCard())){st.drag=st.n;A.redraw();return true}const j=[0,1].find(j=>within(q,binB(j)));if(j!=null)drop(j);return false}
if(p==='text'){if(within(q,clockB()))wait();else if(within(q,phoneB())&&!st.cool)rewrite();return false}
if(p==='plan'){const k=MIX.find((k,i)=>!st.slots.includes(k)&&within(q,pile(i)));if(k!=null){st.drag=k;st.sel=k;A.redraw();return true}return false}return false}
function move(q){st.at=q;if(part()==='dial'&&st.slide){const d=dialB();setHeat(1-(q.y-d.y)/d.h);return}A.redraw()}
function up(q){const p=part(),far=st.from&&Math.hypot(q.x-st.from.x,q.y-st.from.y)>12;st.slide=0;
if((p==='sort'||p==='warn')&&st.drag!=null){const j=[0,1].find(j=>within(q,binB(j)));st.drag=null;st.at=null;if(far&&j!=null)drop(j);else A.redraw()}
if(p==='plan'&&st.drag!=null){const k=st.drag;st.drag=null;st.at=null;if(!far||PLAN.some((x,i)=>within(q,rung(i))))place(k);else A.redraw()}}

// steps
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const g=st.gen;fns.forEach((f,j)=>setTimeout(()=>{if(g===st.gen)f()},A.reduced()?j*20+20:(j+1)*ms))};
const wipe=()=>{st.gen++;st.hook=()=>{};Object.assign(st,{heat:0,peak:0,down:0,n:0,sorted:[],mins:0,sent:0,cool:0,regret:0,slots:[],sel:null,drag:null,at:null,bad:null,slide:0})};
const steps=[
{h:'Feelings narrow the view',p:'A friend posts a joke about you. Drag the anger dial up, then all the way down. Watch which choices you can still see.',
predict:{q:'When you are furious, do you see more choices or fewer?',opts:['More choices','Fewer choices'],ans:1},task:'Turn anger to the top, then cool it to calm',
show:()=>{steps[0].go();play([()=>setHeat(.3),()=>setHeat(.6),()=>setHeat(1),()=>setHeat(.5),()=>setHeat(0)],450)},go:()=>{wipe();update();st.hook=check(0,()=>st.down,'Hot: only the mean reply and storming off are left. Calm: all six choices come back.')}},
{h:'Hot moment, cool head',p:'Same moment, two moods. Which choices come from a hot moment, and which from a cool head?',task:'Sort 6 choices',
show:()=>{steps[1].go();play(HOT.cards.map(c=>()=>drop(c[1])),380)},go:()=>{wipe();update();st.hook=check(1,()=>st.n>=HOT.cards.length,'Hot choices hit back fast. Cool choices name the feeling and fix the problem.')}},
{h:'Cool off first',p:'Maya went to the park without you. You typed an angry text. Wait, rewrite, then send. Or try sending now and see.',
predict:{q:'After 20 minutes, will the angry text still seem like a good idea?',opts:['Yes, just as good','No, it will look too harsh'],ans:1},task:'Wait until calmer, rewrite, then send',
show:()=>{steps[2].go();play([wait,wait,wait,wait,rewrite,send],400)},go:()=>{wipe();update();st.hook=check(2,()=>st.sent,'Strong feelings fade with time. The calm text gets a kind reply.')}},
{h:'Stop, think, choose',p:'Build a plan for big feelings. Tap or drag the steps into order, top to bottom.',task:'Build the 5-step plan',
show:()=>{steps[3].go();play([0,1,2,3,4].map(k=>()=>place(k)),400)},go:()=>{wipe();update();st.hook=check(3,()=>st.slots.length===5,'Notice, pause, list, think ahead, choose.')}},
{h:'Feelings as clues',p:'Feelings are not the enemy. Some are warnings to listen to. Others need cooling before you act.',
predict:{q:'When you decide, should you ignore your feelings?',opts:['Yes, feelings only get in the way','No, they can be useful clues'],ans:1},task:'Sort 4 feelings',
show:()=>{steps[4].go();play(WARN.cards.map(c=>()=>drop(c[1])),420)},go:()=>{wipe();update();st.hook=check(4,()=>st.n>=WARN.cards.length,'Fear and unease can warn of danger. Anger and disappointment need cooling before big choices.')}},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});

// challenge
const QS=[['Ava is furious and wants to post a mean comment right now. What is the wisest first step?','📱',[['Pause and cool off before deciding','ok'],['Post it now while the feeling is real','now'],['Pretend she is not angry at all','bottle']]],
['Why do your choices seem fewer when you are very angry?','🔦',[['Strong feelings narrow what you notice','ok'],['There really are fewer choices','fact'],['Angry people are bad people','bad']]],
['Older kids dare Leo to cross a busy road. He feels scared. Should he ignore the feeling?','🚗',[['No, the fear is a useful warning','ok'],['Yes, feelings always get in the way','ignore'],['He should do it to prove he is brave','brave']]],
['Zoe quit football the minute she lost. Next day she wishes she had not. What happened?','⚽',[['Disappointment rushed a big decision','ok'],['Quitting was right; feelings never change','fact'],['She is just a quitter','label']]],
['Which order makes a cool-headed choice?','🪜',[['Notice, pause, list options, think ahead, choose','ok'],['Choose, then think about it later','order'],['List options, choose, then notice the feeling','order']]],
['Two days after a fight, the same text from a friend looks far less rude. Why?','💬',[['You are calmer, so you read it differently','ok'],['The friend secretly changed the words','fact'],['Your angry feeling was wrong to have','bottle']]]];
function slip(t){let m='Think about how strong the feeling was, and what pausing changes.';
if(t==='now')m='Acting at the peak of a feeling is when choices go wrong. Pause first; the feeling will still be real later.';
if(t==='bottle')m='Feelings are not wrong to have. Notice them and name them, then decide what to do.';
if(t==='fact')m='The situation did not change; the feeling did. Strong feelings change how things look.';
if(t==='bad')m='Being angry does not make anyone bad. The brain’s alarm narrows focus for everyone.';
if(t==='ignore')m='Feelings are not always in the way. Fear and unease can warn you about real danger.';
if(t==='brave')m='Doing something dangerous to look brave is a hot-moment choice. Listening to fear is the smart move.';
if(t==='label')m='Calling her names misses it. Disappointment pushed a big choice before she was calm.';
if(t==='order')m='Choosing comes last. Notice the feeling, pause, list options and think ahead first.';
return m}
let qi=-1,streak=0;
function next(){qi++;const[q,e,ops]=QS[qi%QS.length],r=qi%3;
quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});say('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Streak: '+streak+'.':'✗ '+slip(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}

A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
wipe();A.gest({down,move,up});buttons()}});
A.start()})})();
