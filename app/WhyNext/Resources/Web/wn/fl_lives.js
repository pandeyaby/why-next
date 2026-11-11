/* Flagship – different lives and experiences (ages 7–9): match what you see a classmate do to the circumstance behind it
   (young carer, new to the country, money worries, a health condition), with "she is just lazy" as the tempting judgement;
   swipe thoughts to judgement or compassion; drag the sun through one day for you and for Kofi, a young carer; try to
   spot by looking which 9 of 30 children live in poverty (you can't); change a game so Nadia and Yusuf can join in;
   then a challenge on compassion versus judgement. */
(()=>{const mn=Math.min,ab=Math.abs;
const KIDS=[['🥱','Jade','yawns in class'],['🤐','Omar','hardly talks'],['👟','Sam','has no PE kit'],['🚪','Lily','leaves early on Tuesdays']];
const WHY=[['🌙','helps look after Mum at night'],['🌍','just moved here, learning English'],['💷','family is short of money'],['🏥','hospital check-ups']];
const SLIP=['Helping at night makes you tired. Look for the child who yawns.','Learning a new language makes talking hard. Look for the quiet child.','No money can mean no new kit. Look for the child without PE kit.','A check-up means leaving early. Look for the child who goes home on Tuesdays.'];
const THINK=[['He is weird. He never talks.',0],['Maybe English is new for him. I could sit with him.',1],['Her coat is old, so she is scruffy.',0],['Lots of families have hard times. It is not her fault.',1],['He can’t run, so he can’t play.',0],['We could change the game so he can join in.',1]];
const DAY=[['7 am','🥣 Breakfast is made for me','🥣 Makes breakfast for his sister'],['3:30 pm','⚽ Football club','🛒 Does the shopping'],['6 pm','📺 TV, then homework','💊 Cooks tea, helps Dad with his pills'],['9 pm','😴 Asleep','📚 Starts his homework']];
const POOR=[2,3,8,10,13,17,21,25,28];
const FIX=[['🏀 Play on the flat playground',1,'Now Nadia’s wheelchair can roll everywhere the game goes.'],['👋 Show the rules with hands',1,'Yusuf can follow the game without knowing every English word.'],['🙈 Play without them, it’s easier',0,'Leaving people out because they are different is judging them. Change the game, not the guest list.'],['🤝 Ask “Do you want to play?”',1,'Asking first lets Nadia and Yusuf choose, so they feel welcome, not pitied.'],['📢 Talk louder and faster',0,'Louder and faster makes new English harder to follow. Slow, clear words and gestures help.']];
VIS.reg('flaglives',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,want:()=>{},got:{},drag:null,bad:-1,ti:0,sx:0,card:0,kept:[],sun:0,seen:{},picks:[],shown:0,added:[],fb:''};
const at=()=>['why','swipe','day','look','game','quiz'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const f=n=>Math.round(n*(A.narrow?1:1.15));
function write(g,t,x,y,n,k,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y)}
function wrap(g,t,x,y,mw,n,k,w){g.font=`${w||600} ${f(n)}px system-ui,sans-serif`;const ws=t.split(' '),ls=[];let l='';ws.forEach(z=>{const s=l?l+' '+z:z;if(g.measureText(s).width>mw&&l){ls.push(l);l=z}else l=s});ls.push(l);
 ls.forEach((s,i)=>write(g,s,x,y+(i-(ls.length-1)/2)*f(n)*1.25,n,k,w))}
function pill(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const within=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// layouts: children in a row of 4 (2×2 on phones), reason chips below
const kid=i=>A.narrow?{x:8+(i%2)*(A.W/2),y:6+Math.floor(i/2)*A.H*.27,w:A.W/2-16,h:A.H*.25}:{x:8+i*(A.W/4),y:8,w:A.W/4-16,h:A.H*.48};
const chip=i=>A.narrow?{x:8+(i%2)*(A.W/2),y:A.H*.58+Math.floor(i/2)*A.H*.2,w:A.W/2-16,h:A.H*.17}:{x:8+(i%2)*(A.W/2),y:A.H*.6+Math.floor(i/2)*A.H*.2,w:A.W/2-16,h:A.H*.17};
const deck=()=>({x:A.W*.27+S.sx,y:A.H*.26,w:A.W*.46,h:A.H*.42});
const bar=()=>({x:A.W*.08,y:A.H*.1,w:A.W*.84}),sunX=i=>bar().x+bar().w*i/3;
const seat=i=>{const cols=6,w=(A.W-20)/cols,h=A.H*.62/5;return{x:10+(i%cols)*w,y:A.H*.06+Math.floor(i/cols)*h,w:w-4,h:h-4}};
const tile=i=>A.narrow?{x:8,y:A.H*.44+i*A.H*.11,w:A.W-16,h:A.H*.095}:{x:8+(i%2)*(A.W/2),y:A.H*.5+Math.floor(i/2)*A.H*.16,w:A.W/2-16,h:A.H*.13};
const field=()=>A.narrow?{x:8,y:6,w:A.W-16,h:A.H*.36}:{x:8,y:6,w:A.W-16,h:A.H*.42};
function draw(A){const{ctx:g,W,H,col:C}=A,v=at();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){wrap(g,'Different lives. Same need to be treated with kindness.',W/2,H*.45,W*.8,16,C.tx,800);return}
 if(v==='why'){KIDS.forEach(([e,n,d],i)=>{const r=kid(i),ok=S.got[i]!=null;pill(g,r,A.alpha(ok?C.gr:C.cy,ok?.2:.1),S.bad===i?C.rd:C.tx,S.bad===i?3:1.5);
   write(g,e,r.x+r.w/2,r.y+r.h*.22,26);write(g,n,r.x+r.w/2,r.y+r.h*.46,13,C.tx,800);wrap(g,d,r.x+r.w/2,r.y+r.h*.64,r.w-8,11,C.tx,600);
   if(ok)wrap(g,WHY[i][0]+' '+WHY[i][1],r.x+r.w/2,r.y+r.h*.86,r.w-8,9,C.tx,700)});
  WHY.forEach(([e,t],i)=>{if(S.got[i]!=null)return;let r=chip(i);if(S.drag&&S.drag.i===i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};pill(g,r,A.alpha(C.or,.3),C.tx);wrap(g,e+' '+t,r.x+r.w/2,r.y+r.h/2,r.w-10,11,C.tx,700)})}
 if(v==='swipe'){const L={x:6,y:H*.2,w:W*.24,h:H*.6},R={x:W*.76-6,y:H*.2,w:W*.24,h:H*.6};
  pill(g,L,A.alpha(C.rd,.12),S.bad===0?C.rd:C.tx,S.bad===0?3:1.5);pill(g,R,A.alpha(C.gr,.14),S.bad===1?C.rd:C.tx,S.bad===1?3:1.5);
  write(g,'🧱',L.x+L.w/2,L.y+L.h*.35,26);wrap(g,'Judgement',L.x+L.w/2,L.y+L.h*.6,L.w-4,10,C.tx,800);write(g,'💛',R.x+R.w/2,R.y+R.h*.35,26);wrap(g,'Compassion',R.x+R.w/2,R.y+R.h*.6,R.w-4,10,C.tx,800);
  write(g,`Kept: 🧱 ${S.kept.filter(k=>!k).length}  💛 ${S.kept.filter(k=>k).length}`,W/2,H*.1,12,C.tx,700);
  if(S.card<THINK.length){const r=deck();pill(g,r,A.alpha(C.vi,.16),C.tx,2);wrap(g,'“'+THINK[S.card][0]+'”',r.x+r.w/2,r.y+r.h/2,r.w-16,13,C.tx,700);write(g,'⇠ swipe ⇢',W/2,H*.78,11,C.tx,600)}
  else write(g,'All six sorted!',W/2,H*.47,16,C.gr,800)}
 if(v==='day'){const b=bar();g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=4;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x+b.w,b.y);g.stroke();
  DAY.forEach(([t],i)=>{g.fillStyle=S.seen[i]?C.gr:C.mu;g.beginPath();g.arc(sunX(i),b.y,6,0,7);g.fill();write(g,t,sunX(i),b.y+f(16),10,C.tx,700)});
  const sx=S.drag?S.drag.x:sunX(S.sun);write(g,'☀️',sx,b.y,f(26)>30?28:26);const i=S.sun,row=(y,who,t,k)=>{const r={x:8,y,w:W-16,h:H*.28};pill(g,r,A.alpha(k,.13),C.tx,1.5);write(g,who,r.x+12,r.y+f(16),12,C.tx,800,'left');wrap(g,t,W/2,r.y+r.h*.62,W-40,13,C.tx,700)};
  row(H*.3,'🧒 Me',DAY[i][1],C.cy);row(H*.64,'👦 Kofi, 9, young carer',DAY[i][2],C.or)}
 if(v==='look'){for(let i=0;i<30;i++){const r=seat(i),p=S.picks.includes(i),hit=S.shown&&POOR.includes(i);pill(g,r,A.alpha(hit?C.or:p?C.vi:C.cy,hit||p?.3:.1),p?C.vi:C.tx,p?3:1);write(g,'🙂',r.x+r.w/2,r.y+r.h/2,mn(20,r.h*.4))}
  const m=S.picks.filter(i=>POOR.includes(i)).length;write(g,S.shown?`Orange = in poverty. Your guesses matched ${m} of 9.`:`Your guesses: ${S.picks.length} of 9`,W/2,H*.76,12,C.tx,800);
  if(S.shown)wrap(g,'They look like everyone else. You can’t tell by looking.',W/2,H*.88,W-30,12,C.tx,700)}
 if(v==='game'){const r=field(),n=S.added.length;pill(g,r,A.alpha(C.gr,.16),C.tx,1.5);write(g,'Tag game',r.x+r.w/2,r.y+f(14),12,C.tx,800);
  write(g,'🧒👧🧒',r.x+r.w*.3,r.y+r.h*.55,24);write(g,n>=3?'👩‍🦽😀':'👩‍🦽',r.x+r.w*.72,r.y+r.h*.42,24);write(g,n>=3?'🧑🏽😀':'🧑🏽',r.x+r.w*.72,r.y+r.h*.75,24);
  write(g,`Changes that include: ${n} of 3`,W/2,r.y+r.h+f(12),11,C.tx,700);
  FIX.forEach(([t],i)=>{if(S.added.includes(i)&&!(S.drag&&S.drag.i===i))return;let q=tile(i);if(S.drag&&S.drag.i===i)q={...q,x:S.drag.x-q.w/2,y:S.drag.y-q.h/2};pill(g,q,A.alpha(S.bad===i?C.rd:C.or,.25),S.bad===i?C.rd:C.tx);wrap(g,t,q.x+q.w/2,q.y+q.h/2,q.w-10,11,C.tx,700)})}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);ctrl();A.redraw()},yep=t=>{A.sound.pop();speak(t);ctrl();A.redraw();S.want()};
function match(why,k){S.drag=null;if(why<0||k<0||S.got[k]!=null)return A.redraw();if(why!==k){S.bad=k;return nope(`${WHY[why][1]} would not explain why ${KIDS[k][1]} ${KIDS[k][2]}. ${SLIP[why]}`)}
 S.bad=-1;S.got[k]=why;yep(`${KIDS[k][1]} ${KIDS[k][2]} because of something you could not see: ${WHY[why][1]}.`)}
function swipe(side){S.sx=0;S.drag=null;if(S.card>=THINK.length||side<0)return A.redraw();const[t,k]=THINK[S.card];
 if(side!==k){S.bad=side;return nope(k?`“${t}” tries to understand and help. That is compassion.`:`“${t}” decides something bad about a person without knowing their story. That is judgement.`)}
 S.bad=-1;S.kept.push(k);S.card++;yep(k?`Compassion: ${t}`:`Judgement: ${t} Try asking or helping instead.`)}
function sunTo(i){S.drag=null;S.sun=i;S.seen[i]=1;yep(`${DAY[i][0]}. Me: ${DAY[i][1].slice(3)}. Kofi: ${DAY[i][2].slice(3)}.`)}
function pick(i){if(S.shown||S.picks.includes(i)||S.picks.length>=9)return;S.picks.push(i);A.sound.tick();speak(`Guess ${S.picks.length} of 9.`);ctrl();A.redraw()}
function reveal(){if(S.picks.length<9)return nope('Pick 9 children first.');S.shown=1;const m=S.picks.filter(i=>POOR.includes(i)).length;yep(`You matched ${m} of 9. Poverty does not show on the outside, so never judge by clothes or looks.`)}
function change(i){S.drag=null;if(i<0||S.added.includes(i))return A.redraw();const[,ok,why]=FIX[i];if(!ok){S.bad=i;return nope(why)}S.bad=-1;S.added.push(i);yep(why)}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=at(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='why'){const k=KIDS.findIndex((_,i)=>S.got[i]==null);if(k>=0){c.el('p',{class:'fl-tk'},ctl,`Why might ${KIDS[k][1]} ${KIDS[k][2]}?`);WHY.forEach(([e,t],j)=>{if(!Object.values(S.got).includes(j))B(e+' '+t,()=>match(j,k))})}}
 if(v==='swipe'&&S.card<THINK.length){B('🧱 Judgement',()=>swipe(0));B('💛 Compassion',()=>swipe(1))}
 if(v==='day')DAY.forEach(([t],i)=>B('☀️ '+t,()=>sunTo(i),'Move the sun to '+t));
 if(v==='look'&&!S.shown){B('🎲 Pick 9 for me',()=>{for(let i=0;S.picks.length<9;i+=3)pick(i%30)});B('👀 Reveal',reveal)}
 if(v==='game')FIX.forEach(([t],i)=>{if(!S.added.includes(i))B(t,()=>change(i),'Try: '+t.slice(3))});A.redraw()}
function down(p){const v=at();
 if(v==='why'){const i=WHY.findIndex((_,i)=>S.got[i]==null&&within(p,chip(i)));if(i>=0){S.drag={i,x:p.x,y:p.y};return true}return false}
 if(v==='swipe'&&S.card<THINK.length&&within(p,deck())){S.drag={x0:p.x};return true}
 if(v==='day'&&ab(p.y-bar().y)<f(40)){S.drag={x:p.x};return true}
 if(v==='look'){const i=[...Array(30).keys()].find(i=>within(p,seat(i)));if(i!=null)pick(i);return false}
 if(v==='game'){const i=FIX.findIndex((_,i)=>!S.added.includes(i)&&within(p,tile(i)));if(i>=0){S.drag={i,x:p.x,y:p.y};return true}}return false}
function move(p){if(!S.drag)return;if(at()==='swipe')S.sx=p.x-S.drag.x0;else{S.drag.x=p.x;S.drag.y=p.y}A.redraw()}
function up(p){const v=at();if(!S.drag)return;
 if(v==='why')return match(S.drag.i,KIDS.findIndex((_,k)=>within(p,kid(k))));
 if(v==='swipe')return swipe(S.sx<-A.W*.15?0:S.sx>A.W*.15?1:-1);
 if(v==='day'){const b=bar();return sunTo(Math.max(0,mn(3,Math.round((p.x-b.x)/b.w*3))))}
 if(v==='game')return change(within(p,field())?S.drag.i:-1)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const k=++S.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{S.tok++;Object.assign(S,{want:()=>{},got:{},drag:null,bad:-1,sx:0,card:0,kept:[],sun:0,seen:{},picks:[],shown:0,added:[]})};
const steps=[
{h:'What you see, and what is behind it',p:'You can see what a classmate does. You often can’t see why. Drag each reason onto the child it might explain.',
 predict:{q:'Jade yawns in class every day. What can you tell?',opts:['She is lazy','Not yet: there may be a reason'],ans:1},task:'Match all four reasons',
 show:()=>{steps[0].go();play([0,1,2,3].map(i=>()=>match(i,i)),550)},go:()=>{reset();speak('Drag a reason onto Jade, Omar, Sam or Lily.');ctrl();S.want=fin(0,()=>Object.keys(S.got).length>=4,'Each child’s circumstances explain what you saw.')}},
{h:'Judgement or compassion?',p:'Judgement decides someone is bad without knowing their story. Compassion tries to understand and help. Swipe each thought left or right.',task:'Sort all six thoughts',
 show:()=>{steps[1].go();play(THINK.map(([,k])=>()=>swipe(k)),450)},go:()=>{reset();speak('Swipe the thought: left for judgement, right for compassion.');ctrl();S.want=fin(1,()=>S.card>=6,'Swap a judging thought for a kind question.')}},
{h:'Same day, different lives',p:'Kofi is 9. He is a young carer: he helps look after his dad. Drag the sun through the day and compare.',
 predict:{q:'Kofi’s homework is often late. Why might that be?',opts:['He does not care about school','His evenings are full of caring jobs'],ans:1},task:'Visit all four times of day',
 show:()=>{steps[2].go();play([0,1,2,3].map(i=>()=>sunTo(i)),600)},go:()=>{reset();S.seen={0:1};speak('Drag the sun along the day.');ctrl();S.want=fin(2,()=>Object.keys(S.seen).length>=4,'Kofi’s day is full before homework even starts.')}},
{h:'Can you tell by looking?',p:'In the UK about 9 children in a class of 30 live in poverty: their family has much less money than most. Tap 9 children you think they are, then reveal.',
 predict:{q:'Can you tell who lives in poverty by looking?',opts:['Yes, by their clothes','No, you can’t tell'],ans:1},task:'Guess 9, then reveal',
 show:()=>{steps[3].go();play([()=>{for(let i=0;i<9;i++)pick(i*3)},reveal],600)},go:()=>{reset();speak('Tap 9 children, then press Reveal.');ctrl();S.want=fin(3,()=>S.shown,'Never judge someone by their clothes or things.')}},
{h:'Change the game, not the guest list',p:'Nadia uses a wheelchair. Yusuf is new and still learning English. Drag changes onto the game so both can join in.',task:'Find three changes that include',
 show:()=>{steps[4].go();play([0,1,3].map(i=>()=>change(i)),600)},go:()=>{reset();speak('Drag a change onto the tag game.');ctrl();S.want=fin(4,()=>S.added.length>=3,'Inclusion: everyone gets a fair chance to join in.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A new girl’s shoes have holes in them. What is a compassionate thought?',[['Maybe things are hard at home. I will be friendly.','ok'],['She doesn’t look after her things.','judge'],['I won’t sit next to her.','avoid']]],
 ['Ben uses a hearing aid and misses what you said. What should you do?',[['Face him and say it again clearly','ok'],['Shout it in his ear','loud'],['Say “never mind”','skip']]],
 ['Ana is a young carer and falls asleep in class. Which word fits her?',[['Tired from caring for someone','ok'],['Lazy','lazy'],['Rude','rude']]],
 ['A boy who just moved from another country is alone at lunch. What is kind?',[['Ask him to sit with you and show him around','ok'],['Wait until his English is better','wait'],['Feel sorry for him from across the room','pity']]],
 ['Why should you not judge a child by their circumstances?',[['You don’t know their whole story, and it isn’t their fault','ok'],['Because teachers say so','rule'],['Because everyone’s life is the same','same']]]];
function why(tag){let m='Think about what that child might be going through.';
 if(tag==='judge')m='That judges her without knowing her story. Families can be short of money; it is not her fault.';
 if(tag==='avoid')m='Avoiding her leaves her out. Compassion means moving closer and being friendly.';
 if(tag==='loud')m='Shouting can hurt and still be unclear. Face him so he can see your lips, and speak clearly.';
 if(tag==='skip')m='“Never mind” leaves him out of the talk. Say it again so he is included.';
 if(tag==='lazy')m='Lazy is a judgement. Ana is tired because she looks after someone at night.';
 if(tag==='rude')m='Rude is a judgement. Falling asleep is a sign she is worn out from caring.';
 if(tag==='wait')m='Waiting leaves him alone. You can include him now with smiles, gestures and simple words.';
 if(tag==='pity')m='Feeling sorry from far away does not help. Compassion is doing something kind.';
 if(tag==='rule')m='It is not just a rule. You can’t see someone’s circumstances, and they did not choose them.';
 if(tag==='same')m='Lives are not the same: that is the point. Different circumstances deserve understanding.';
 return m}
function quiz(){ask++;const[q,ops]=QS[ask%QS.length],turn=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes, that is compassion.':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
