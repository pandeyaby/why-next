/* Flagship – leadership styles and influence (ages 13–14; PSHE Association Programme of Study KS3 R/L strands on
   respectful relationships, assertive communication, peer influence and coercion; DfE RSHE "Respectful relationships,
   including friendships" and consent; leadership styles after Lewin, Lippitt & White 1939, Greenleaf 1970 and
   Bass 1985). Name the style behind four things a leader says; match a style to four situations; get every voice heard
   in a meeting where two people do all the talking; sort lines into fair persuasion or pressure; and lead a team through
   three problems while a trust meter and an effort meter show what threats, shaming and tricks really cost. */
(()=>{
 const STY=['Directive','Democratic','Servant','Transformational'];
 const SAYS=[['“Fire alarm. Everyone out the side door, now. Follow me.”',0],['“We have three ideas for the stall. Hear each one, then we vote.”',1],
  ['“What do you need from me so you can finish your part?”',2],['“Picture our park clean enough for the little kids. Who is in?”',3]];
 const WHEN=[['The fire alarm goes off during club.',0],['The class picks where to go on a trip.',1],['A teammate is stuck and stressed the night before a deadline.',2],['A long project is dragging and everyone has lost interest.',3]];
 const WHENWHY=[['Time matters most. Clear, quick orders keep people safe.','There is no time to vote or ask about needs in an emergency.'],
  ['Everyone is affected and there is time, so everyone gets a say.','Nobody is in danger and there is time. People back a choice they helped make.'],
  ['The leader’s job here is to remove what is blocking them.','A stressed person needs help, not orders, a vote or a speech.'],
  ['A shared goal brings back the reason to care.','When people have lost the why, orders or votes do not bring it back.']];
 const PEOPLE=[['Sam',6,0],['Jo',5,0],['Priya',0,1,'Sell plants we grew: they cost almost nothing.'],['Ben',0,1,'Put the stall by the gate, where parents queue.'],['Lena',0,1,'Ask the art club to make the signs.']];
 const LINES=[['“Here is why the clean-up matters, and here is the evidence.”',0,'Reasons and evidence let people judge for themselves.'],
  ['“Everyone else already said yes, so you would be weird not to.”',1,'Fake crowd pressure: it pushes, it does not persuade.'],
  ['“Do it or you are out of the group chat.”',1,'A threat. Saying yes to a threat is not a free choice.'],
  ['“You can say no. I will still be your friend.”',0,'Leaving room to say no is what makes it fair.'],
  ['“Do not tell your parents. It is our secret plan.”',1,'Secrecy from trusted adults is a warning sign of manipulation.'],
  ['“If you have a better idea, I want to hear it.”',0,'Inviting other views is influence that respects people.']];
 const ROUNDS=[['The team is behind on the poster.',[['Show them how good it will look at the fair, then ask who takes which part','ok'],['Say you will tell the teacher who is lazy','threat'],['Post in the group chat that they are letting everyone down','shame']]],
  ['Ben disagrees with your plan.',[['Ask him to explain, and change the plan if his point is good','ok'],['Tell him to go along with it or leave','threat'],['Agree in front of him, then quietly change it back','trick']]],
  ['Someone has to do the boring job.',[['Take a share yourself and explain why it matters','ok'],['Give it to the youngest, because they cannot say no','rank'],['Promise to do their homework if they take it','bribe']]]];
 const COST={ok:[15,10],threat:[-25,10],shame:[-20,-5],trick:[-25,0],rank:[-20,0],bribe:[-10,5]};
 VIS.reg('flaglead',c=>{let A,bar,box;
  const T={go:0,i:0,heard:[],sorted:[0,0],li:0,ri:0,trust:50,effort:50,msg:'',bad:false,fin:()=>{}};
  const at=()=>['style','when','voice','sort','team','chal'][A.step];
  const fs=n=>Math.round(n*(A.narrow?1:1.1));
  const INK='#172033',DIM='#475569',RIM='#64748b',PAGE='#ffffff',TEAL='#0f766e',PLUM='#6d28d9',GREEN='#047857',RED='#b91c1c',SUN='#fef3c7';
  function put(g,s,x,y,n,col,al){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function split(g,s,max,n){g.font=`800 ${fs(n)}px system-ui,sans-serif`;const out=[];let line='';s.split(' ').forEach(w=>{const t=line?line+' '+w:w;if(line&&g.measureText(t).width>max){out.push(line);line=w}else line=t});out.push(line);return out}
  function para(g,s,x,y,max,n,col){const L=split(g,s,max,n),lh=fs(n)+5;L.forEach((l,k)=>put(g,l,x,y+(k-(L.length-1)/2)*lh,n,col))}
  function pane(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function flag(g){if(!T.msg)return;const L=split(g,(T.bad?'✗ ':'✓ ')+T.msg,A.W-44,13),lh=fs(13)+6,h=L.length*lh+12,y=A.H-h-6;pane(g,{x:10,y,w:A.W-20,h},PAGE,T.bad?RED:GREEN,3);L.forEach((l,k)=>put(g,l,A.W/2,y+6+lh*(k+.5),13,INK))}
  const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const oops=s=>{T.bad=true;T.msg=s;A.sound.miss();speak(s);A.redraw()};
  const yes=s=>{T.bad=false;T.msg=s;A.sound.pop()};
  const quad=k=>{const w=(A.W-30)/2,h=A.H*.15;return{x:10+(k%2)*(w+10),y:A.H*.36+Math.floor(k/2)*(h+8),w,h}};
  const seat=k=>{const a=-Math.PI/2+k*2*Math.PI/5,rx=A.W*(A.narrow?.32:.3),ry=A.H*.17;return{x:A.W/2+Math.cos(a)*rx,y:A.H*.33+Math.sin(a)*ry,r:fs(24)}};
  const pile=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.42,w,h:A.H*.26}};
  function meter(g,y,label,v,col){const r={x:20,y,w:A.W-40,h:fs(20)};pane(g,r,'#e2e8f0',RIM,1.5);g.fillStyle=col;g.fillRect(r.x+1,r.y+1,(r.w-2)*Math.max(0,Math.min(100,v))/100,r.h-2);put(g,`${label}: ${v}`,r.x,r.y-fs(11),13,INK,'left')}
  function view(g){const v=at();
   if(v==='style'||v==='when'){const L=v==='style'?SAYS:WHEN,it=L[T.i],top={x:12,y:A.H*.05,w:A.W-24,h:A.H*.26};pane(g,top,it?SUN:PAGE,it?'#b45309':RIM,2.5);
    if(it)para(g,it[0],A.W/2,top.y+top.h/2,top.w-24,15,INK);else put(g,v==='style'?'All four styles named':'All four situations matched',A.W/2,top.y+top.h/2,15,GREEN);
    STY.forEach((s,k)=>{const b=quad(k);pane(g,b,'#f1f5f9',RIM,2);put(g,s,b.x+b.w/2,b.y+b.h/2,A.narrow?12:15,INK)})}
   if(v==='voice'){put(g,'Club meeting: ideas for the charity stall',A.W/2,A.H*.05,14,INK);const n=T.heard.length;
    PEOPLE.forEach((p,k)=>{const s=seat(k),said=p[2]&&T.heard.includes(k),talk=said?3:p[1];g.fillStyle=p[2]?(said?'#ccfbf1':PAGE):'#ede9fe';g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fill();g.strokeStyle=p[2]?(said?TEAL:RIM):PLUM;g.lineWidth=3;g.stroke();
     put(g,p[0],s.x,s.y,12,INK);g.fillStyle=p[2]?TEAL:PLUM;g.fillRect(s.x-s.r,s.y+s.r+6,s.r*2*talk/6,6);if(p[2]&&!said)put(g,'tap',s.x,s.y+s.r+fs(18),11,DIM)});
    put(g,`Quiet voices heard: ${n} of 3`,A.W/2,A.H*.72,14,n>=3?GREEN:INK)}
   if(v==='sort'){const L=LINES[T.li],top={x:12,y:A.H*.05,w:A.W-24,h:A.H*.3};pane(g,top,L?SUN:PAGE,L?'#b45309':RIM,2.5);if(L)para(g,L[0],A.W/2,top.y+top.h/2,top.w-24,15,INK);else put(g,'All 6 lines sorted',A.W/2,top.y+top.h/2,15,GREEN);
    ['Fair persuasion','Pressure or trick'].forEach((t,k)=>{const b=pile(k);pane(g,b,'#f1f5f9',k?RED:TEAL,2.5);put(g,t,b.x+b.w/2,b.y+b.h*.35,A.narrow?12:15,k?RED:TEAL);put(g,T.sorted[k]?'●'.repeat(T.sorted[k]):'tap',b.x+b.w/2,b.y+b.h*.72,13,DIM)})}
   if(v==='team'){const R=ROUNDS[T.ri],top={x:12,y:A.H*.05,w:A.W-24,h:A.H*.17};pane(g,top,R?SUN:PAGE,R?'#b45309':RIM,2.5);if(R)para(g,`Problem ${T.ri+1}: ${R[0]}`,A.W/2,top.y+top.h/2,top.w-20,14,INK);else put(g,'Three problems led well',A.W/2,top.y+top.h/2,14,GREEN);
    meter(g,A.H*.36,'Trust',T.trust,TEAL);meter(g,A.H*.52,'Effort',T.effort,PLUM)}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(at()==='chal')put(g,'Lead so people choose to follow.',A.W/2,A.H/2,15,INK);else view(g);flag(g);A.fx.draw(g)}
  // ---- actions ----
  const STYWHY=['Directive means clear orders from the leader.','Democratic means the group decides together.','Servant means the leader asks what others need and helps.','Transformational means a big shared goal that inspires.'];
  function nameStyle(k){const it=SAYS[T.i];if(!it)return;if(k!==it[1])return oops(`Not ${STY[k].toLowerCase()}. ${STYWHY[k]} Read the words again: who decides, and how?`);yes(`${STY[k]}. ${STYWHY[k]}`);T.i++;sync()}
  function matchWhen(k){const it=WHEN[T.i];if(!it)return;if(k!==it[1])return oops(`${STY[k]} does not fit here. ${WHENWHY[it[1]][1]}`);yes(`${STY[k]}. ${WHENWHY[it[1]][0]}`);T.i++;sync()}
  function invite(k){const p=PEOPLE[k];if(!p)return;if(!p[2])return oops(`${p[0]} has already talked the most. Asking them again keeps the quiet people quiet.`);if(T.heard.includes(k))return;T.heard.push(k);yes(`You asked ${p[0]} by name. ${p[0]}: “${p[3]}”`);sync()}
  function aloud(){oops('“Any other ideas?” to the whole room is usually answered by the same confident voices. Ask someone by name, or go round the circle.')}
  function circle(){PEOPLE.forEach((p,k)=>{if(p[2]&&!T.heard.includes(k))T.heard.push(k)});yes('Going round the circle gives everyone a turn. Three new ideas, from the people who had not spoken.');sync()}
  function sortLine(k){const L=LINES[T.li];if(!L)return;if(k!==L[1])return oops(`Look again. ${L[2]}`);T.sorted[k]++;yes(L[2]);T.li++;sync()}
  function lead(tag){const R=ROUNDS[T.ri];if(!R)return;const d=COST[tag];T.trust=Math.max(0,Math.min(100,T.trust+d[0]));T.effort=Math.max(0,Math.min(100,T.effort+d[1]));
   if(tag!=='ok'){oops(cost(tag));return sync()}yes('Trust and effort both rise: people choose to help, even when you are not watching.');T.ri++;sync()}
  function cost(tag){let m='That costs trust.';
   if(tag==='threat')m='Effort rose for now, but trust fell hard. People work only while you watch, and drift away after.';
   if(tag==='shame')m='Public shaming made people feel small. Trust and effort both fell.';
   if(tag==='trick')m='Agreeing then changing it back is manipulation. When Ben finds out, trust collapses.';
   if(tag==='rank')m='Picking the person who cannot say no is using power, not leading. Trust fell.';
   if(tag==='bribe')m='A bribe buys one job, not loyalty, and doing their homework is cheating. Trust fell.';return m}
  function sync(){const v=at();let s='';
   if(v==='style')s=SAYS[T.i]?`A leader says: ${SAYS[T.i][0]} Which style?`:'All four styles named.';
   else if(v==='when')s=WHEN[T.i]?`Situation: ${WHEN[T.i][0]} Which style fits?`:'All four matched.';
   else if(v==='voice')s=`Sam and Jo have done most of the talking. Quiet voices heard: ${T.heard.length} of 3.`;
   else if(v==='sort')s=LINES[T.li]?`Line: ${LINES[T.li][0]} Fair persuasion, or pressure or a trick?`:'All six lines sorted.';
   else if(v==='team')s=(ROUNDS[T.ri]?`Problem: ${ROUNDS[T.ri][0]} `:'All three problems done. ')+`Trust ${T.trust}, effort ${T.effort}.`;else s='Challenge.';
   speak((T.msg?T.msg+' ':'')+s);keys();T.fin()}
  function keys(){if(!bar)return;bar.innerHTML='';const v=at(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);e.onclick=f};
   if((v==='style'&&SAYS[T.i])||(v==='when'&&WHEN[T.i]))STY.forEach((s,k)=>b(s,()=>v==='style'?nameStyle(k):matchWhen(k),`${s} style`));
   if(v==='voice'&&T.heard.length<3){PEOPLE.forEach((p,k)=>{if(!T.heard.includes(k))b(`Ask ${p[0]}`,()=>invite(k),`Ask ${p[0]} by name`)});b('“Any other ideas?”',aloud,'Ask the whole room for other ideas');b('Go round the circle',circle,'Go round the circle')}
   if(v==='sort'&&LINES[T.li])['Fair persuasion','Pressure or trick'].forEach((t,k)=>b(t,()=>sortLine(k)));
   if(v==='team'&&ROUNDS[T.ri]){const o=ROUNDS[T.ri][1],k=T.ri%3,order=o.slice(k).concat(o.slice(0,k));order.forEach(([t,tag])=>b(t,()=>lead(tag)))}A.redraw()}
  function down(p){const v=at();
   if(v==='style'||v==='when'){const k=[0,1,2,3].find(k=>on(p,quad(k)));if(k!=null)v==='style'?nameStyle(k):matchWhen(k)}
   if(v==='voice'){const k=PEOPLE.findIndex((q,k)=>{const s=seat(k);return Math.hypot(p.x-s.x,p.y-s.y)<s.r+8});if(k>=0)invite(k)}
   if(v==='sort'){const k=[0,1].find(k=>on(p,pile(k)));if(k!=null)sortLine(k)}return false}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fns=>{const id=++T.go,gap=A.reduced()?15:300;fns.forEach((f,k)=>setTimeout(()=>{if(id===T.go)f()},k*gap))};
  const wipe=()=>{T.go++;T.fin=()=>{};T.i=0;T.heard=[];T.sorted=[0,0];T.li=0;T.ri=0;T.trust=50;T.effort=50;T.msg='';T.bad=false};
  const steps=[
   {h:'Four leadership styles',p:'Read what each leader says. Tap the style it shows.',
    predict:{q:'Which leadership style is the best one?',opts:['It depends on the situation','Democratic: always ask everyone','Directive: someone must be in charge'],ans:0},
    task:'Name 4 styles',show:()=>{steps[0].go();auto(SAYS.map(s=>()=>nameStyle(s[1])))},go:()=>{wipe();sync();T.fin=fin(0,()=>T.i>=SAYS.length,'Orders, a vote, help, or a shared dream: four different ways to lead.')}},
   {h:'Pick the style for the moment',p:'Good leaders switch style. Tap the style that fits each situation.',
    task:'Match 4 situations',show:()=>{steps[1].go();auto(WHEN.map(s=>()=>matchWhen(s[1])))},go:()=>{wipe();sync();T.fin=fin(1,()=>T.i>=WHEN.length,'Danger needs orders; shared choices need a vote; stuck people need help; tired teams need a why.')}},
   {h:'Every voice heard',p:'Sam and Jo have talked the most. Tap a quiet person to ask them by name, or try the buttons.',
    predict:{q:'Sam and Jo talk the most. Do they have the best ideas?',opts:['Not always: quiet people have ideas too','Yes: they talk most because they know most'],ans:0},
    task:'Hear all 3 quiet voices',show:()=>{steps[2].go();auto([2,3,4].map(k=>()=>invite(k)))},go:()=>{wipe();sync();T.fin=fin(2,()=>T.heard.length>=3,'The three best stall ideas came from the people who had said nothing.')}},
   {h:'Persuade or pressure?',p:'Leaders influence people. Fair influence leaves people free to say no. Sort each line.',
    task:'Sort 6 lines',show:()=>{steps[3].go();auto(LINES.map(L=>()=>sortLine(L[1])))},go:()=>{wipe();sync();T.fin=fin(3,()=>T.li>=LINES.length,'Reasons and real choice persuade. Threats, fake crowds and secrets pressure.')}},
   {h:'Lead the team',p:'Pick how to handle each problem. Watch the trust and effort meters.',
    predict:{q:'A threat gets people working fast. What happens to trust?',opts:['It drops, and help stops when you are not looking','It stays the same: results are what count'],ans:0},
    task:'Handle 3 problems',show:()=>{steps[4].go();auto(ROUNDS.map(()=>()=>lead('ok')))},go:()=>{wipe();sync();T.fin=fin(4,()=>T.ri>=ROUNDS.length,'Inspiring and listening raised trust and effort. Threats and tricks only bought effort for a moment.')}},
   {h:'Challenge',p:'',go:()=>{wipe();pose()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>T.fin()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['A fire alarm goes off during a club meeting. Which style fits?','Directive: clear, quick orders',[['Democratic: take a vote','vote'],['Servant: ask what each person needs','slow']]],
   ['Two people do all the talking in your group. What should the leader do?','Ask quieter people by name',[['Let the talkers decide: they know most','loud'],['Ask the room, “Any other ideas?”','room']]],
   ['“Do it or you are out of the group chat.” What is this?','Coercion: a threat',[['Persuasion: it gives a reason','reason'],['Good leadership: being firm','firm']]],
   ['Which is fair persuasion?','Giving reasons and leaving them free to say no',[['Saying everyone agreed when they did not','crowd'],['Asking them to keep the plan from adults','secret']]],
   ['A friend says yes only because they are scared to say no. Is that real consent?','No: consent has to be freely given',[['Yes: they said yes','said'],['Yes, if it is only a small thing','small']]],
   ['What makes a leader transformational?','They share a goal that inspires people to grow',[['They give strict orders','orders'],['They let everyone do what they like','loose']]]];
  function slip(tag){let m='Ask: does this leave people free to choose?';
   if(tag==='vote')m='A vote takes time. In danger, clear orders keep people safe.';
   if(tag==='slow')m='Asking about needs is right when someone is stuck, not when people must get out fast.';
   if(tag==='loud')m='Talking most is not knowing most. Quiet people often hold ideas nobody has heard.';
   if(tag==='room')m='An open question to the room is answered by the same confident voices. Ask by name.';
   if(tag==='reason')m='A reason would explain why. This only threatens a loss if they refuse.';
   if(tag==='firm')m='Firm is being clear. A threat to exclude someone is coercion, not leadership.';
   if(tag==='crowd')m='A fake “everyone agreed” is a pressure trick, not a reason.';
   if(tag==='secret')m='Asking for secrecy from trusted adults is a sign of manipulation.';
   if(tag==='said')m='Saying yes out of fear is not free. Consent means they could say no with no bad result.';
   if(tag==='small')m='Size does not matter: pressure to say yes takes away the choice either way.';
   if(tag==='orders')m='Strict orders is the directive style.';
   if(tag==='loose')m='Letting everyone do anything is hands-off leadership, with no shared goal.';return m}
  let qk=-1,best=0;
  function pose(){qk++;const [q,ans,bad]=Q[qk%Q.length],all=[[ans,'ok']].concat(bad),k=qk%3,order=all.slice(k).concat(all.slice(0,k));
   box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=box.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>grade(tag,ans)});speak('Challenge: '+q);A.redraw()}
  function grade(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
   if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+best+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
