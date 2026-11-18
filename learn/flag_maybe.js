/* Flagship – questioning first impressions (ages 9–11): fact vs guess, two other reasons, clue cards on a sure-o-meter
   (accident, can't tell yet, on purpose), pause-think-check in order, and words that check instead of blame. */
(()=>{
const SEEN=[['Leo bumped my tray in the lunch queue.',0],['Leo did it to make me look silly.',1],['Ava walked past me without waving.',0]];
const WHYNOT={0:'You could see or hear this, so it is what happened, not a guess.',1:'Nobody can see inside Leo’s head. Why he did it is a guess.'};
const MOMENTS=[{who:'👧',what:'Ava walked past and did not wave.',hot:'She is ignoring me.',chips:[['She did not see me',1],['She was thinking about her test',1],['She hates me now',0,'Same unkind guess, bigger words. Not a new reason.'],['She wants everyone to ignore me',0,'That adds a plan you never saw. Find a reason not about you.']]},
 {who:'👦',what:'Leo bumped my tray in the lunch queue.',hot:'He did it on purpose.',chips:[['The queue was crowded and he got pushed',1],['He tripped on a bag',1],['He wanted me to drop it',0,'That is the first guess again. Try a reason where it was not on purpose.'],['He always does mean things',0,'“Always” is a sign of a hot thought. One bump is not proof.']]},
 {who:'🧑‍🤝‍🧑',what:'My friends stopped talking when I walked up.',hot:'They were talking about me.',chips:[['They were planning a surprise',1],['They had just finished a story',1],['They do not want me as a friend',0,'One quiet moment is not proof of that.'],['They were all laughing at me',0,'Nobody laughed. That adds something you did not see.']]}];
/* clue cards decide the zone: 0 accident, 1 not sure yet, 2 on purpose */
const CASES=[{who:'🧒',what:'Sam knocked your pencil case off the desk.',clues:['He was carrying a tall pile of books.','He said “Oops!” and picked it up.'],zone:0,miss:{1:'You have two clues now, and both point to an accident. Use them.',2:'The clues point to an accident: a pile of books and an “Oops!”. A strong feeling is not a clue.'}},
 {who:'👩',what:'Maya did not save you a seat on the trip.',clues:['You never told Maya you wanted to sit together.','She saved seats for two friends who asked.'],zone:1,miss:{0:'Nothing shows an accident either. Clues this thin mean you cannot tell yet: ask her.',2:'Nothing shows she meant to leave you out. She may not have known. You cannot tell yet.'}},
 {who:'🧑',what:'Jo took your pen from your desk.',clues:['Jo said “Mine now!” and laughed.','Jo has done this three times this week and will not give it back.'],zone:2,miss:{0:'Questioning a first thought is not always saying “accident”. These clues show Jo meant it.',1:'Jo said “Mine now!” and keeps doing it. That is enough to be fairly sure.'}}];
const ZONE=['Accident','Can’t tell yet','On purpose'];
const ORDER=[['🔥','Notice the hot thought'],['⏸️','Pause and take a breath'],['💭','Think of two other reasons'],['🔎','Check: ask calmly or look for clues']];
const OWHY=['','A hot brain only finds unkind reasons. Notice the thought first, so you know to slow down.','You cannot think clearly while you are still hot. Pause first.','Checking while you are angry can sound like blaming. Pause and think of other reasons first.'];
const ASKS=[{who:'👦',what:'Leo bumped your tray.',opts:[['Hey, did you mean to bump me?',1],['Why did you do that on purpose?!',0,'“On purpose” decides the answer. That is blaming, not checking.'],['Say nothing and bump him back later',0,'Getting back acts on a guess. If it was an accident, you started a fight.']]},
 {who:'👧',what:'Ava walked past without waving.',opts:[['Hi Ava! Did you see me earlier?',1],['Why are you ignoring me?',0,'That tells Ava what she was doing. Ask, do not tell.'],['Tell everyone Ava is rude',0,'Spreading a guess hurts Ava, and it may not be true.']]},
 {who:'🧑‍🤝‍🧑',what:'Your friends went quiet when you walked up.',opts:[['Hi! What are you all talking about?',1],['Stop talking about me!',0,'You do not know they were. Ask first, then you will know.'],['Walk off and never speak to them',0,'Walking off keeps the guess. You never find out.']]}];
VIS.reg('flagmaybe',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;
const fresh=()=>({k:0,n:0,wait:0,ok:0,bad:-1,hold:null,hook:()=>{},picked:[],seen:[],needle:.5,set:0,placed:[],deal:[2,0,3,1],quick:0}),S=fresh();
const part=()=>['seen','reasons','meter','order','ask','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),brisk=()=>A.reduced()||S.quick;
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function para(g,t,x,y,w,n,col,wt,al){g.font=`${wt||600} ${z(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(q=>{const v=s?s+' '+q:q;if(g.measureText(v).width>w&&s){L.push(s);s=q}else s=v});L.push(s);const h=z(n)*1.25;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
function face(g,e,x,y,s){g.fillStyle='#000';g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(g,r,fill,edge,lw,rad){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.stroke();g.restore()}
const story=()=>({x:10,y:8,w:A.W-20,h:A.H*(A.narrow?.3:.32)});
const lines=n=>{const h=z(44),gap=7,y0=A.H-n*(h+gap)-4;return Array.from({length:n},(_,j)=>({x:10,y:y0+j*(h+gap),w:A.W-20,h}))};
const tray=()=>{const w=(A.W-30)/2,h=z(70),y=A.H-h-8;return[0,1].map(j=>({x:10+j*(w+10),y,w,h}))};
const slip=()=>{const w=Math.min(A.W-30,z(400)),h=z(64);return{x:(A.W-w)/2,y:A.H*.3,w,h}};
const bar=()=>({x:24,y:A.H*(A.narrow?.66:.66),w:A.W-48,h:z(18)});
const clueRects=()=>{const w=(A.W-30)/2,h=z(A.narrow?84:70),y=A.H*.34;return[0,1].map(j=>({x:10+j*(w+10),y,w,h}))};
const item=()=>({reasons:MOMENTS,meter:CASES,ask:ASKS}[part()]||[])[S.k]||{};
const choices=()=>{const p=part(),it=item();return p==='reasons'?it.chips:p==='ask'?it.opts:p==='order'?S.deal.map(i=>ORDER[i]):[]};
const zoneOf=v=>v<.34?0:v>.66?2:1;
function scene(g,it){const C=A.col,r=story();card(g,r,C.pn,C.ln,2);face(g,it.who,r.x+z(34),r.y+r.h*.42,z(40));para(g,it.what,r.x+r.w/2+z(26),r.y+r.h*(it.hot?.3:.42),r.w-z(90),15,C.tx,800);
 if(it.hot){const b={x:r.x+z(70),y:r.y+r.h*.56,w:r.w-z(84),h:r.h*.34};card(g,b,A.mix(C.pn,C.rd,.12),C.rd,2,18);para(g,'First thought: '+it.hot,b.x+b.w/2,b.y+b.h/2,b.w-14,14,C.tx,700)}}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part(),it=item();
 if(p==='quiz'){para(g,'What you saw is a fact. Why they did it is a guess until you check.',W/2,H*.45,W-40,17);return}
 if(p==='seen'){para(g,'Is this what happened, or a guess about why?',W/2,H*.1,W-30,17,C.tx,800);
  tray().forEach((r,j)=>{card(g,r,A.mix(C.pn,[C.cy,C.am][j],.14),[C.cy,C.am][j],2);face(g,['👀','💭'][j],r.x+z(26),r.y+r.h/2,z(26));para(g,['What happened','A guess about why'][j],r.x+r.w/2+z(14),r.y+r.h/2,r.w-z(56),14,C.tx,800)});
  if(S.k<3&&!S.ok){const r0=slip(),d=S.hold,r=d&&d.x!=null?{...r0,x:d.x-r0.w/2,y:d.y-r0.h/2}:r0;card(g,r,S.bad>=0?A.mix(C.pn,C.rd,.18):C.pn,S.bad>=0?C.rd:C.vi,3);para(g,SEEN[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-16,16,C.tx,700);
   if(!d)para(g,'Drag it to a box',W/2,r0.y+r0.h+z(18),W-30,13,C.mu)}
  A.fx.draw(g);return}
 if(p==='order'){para(g,'Your friend took your seat. Tap the steps in order.',W/2,H*.08,W-30,16,C.tx,800);
  const done=S.placed.length;for(let i=0;i<4;i++){const y=H*.16+i*z(30);g.fillStyle=i<done?C.gr:C.mu;para(g,`${i+1}. ${i<done?ORDER[i][0]+' '+ORDER[i][1]:'…'}`,24,y,W-40,14,i<done?C.tx:C.mu,i<done?800:600,'left')}
  lines(4).forEach((r,j)=>{const o=choices()[j],used=S.placed.includes(S.deal[j]);if(used)return;card(g,r,S.bad===j?A.mix(C.pn,C.rd,.18):C.pn,S.bad===j?C.rd:C.vi,S.bad===j?3:2);para(g,o[0]+' '+o[1],r.x+r.w/2,r.y+r.h/2,r.w-16,15,C.tx,700)});A.fx.draw(g);return}
 scene(g,it);
 if(p==='meter'){const b=bar(),zx=k=>b.x+b.w*k;clueRects().forEach((r,j)=>{const open=S.seen.includes(j);card(g,r,open?A.mix(C.pn,C.cy,.12):A.alpha(C.vi,.1),open?C.cy:C.vi,2);para(g,open?it.clues[j]:'🔎 Clue '+(j+1)+': tap',r.x+r.w/2,r.y+r.h/2,r.w-14,13,C.tx,open?600:800)});
  [[0,.34,C.gr],[.34,.66,C.am],[.66,1,C.rd]].forEach(([a,e,col],k)=>{g.fillStyle=A.alpha(col,.35);A.paint.rrect(zx(a)+1,b.y,b.w*(e-a)-2,b.h,6);g.fill();para(g,ZONE[k],zx((a+e)/2),b.y+b.h+z(16),b.w*(e-a)-4,12,C.tx,700)});
  const nx=zx(S.needle);g.save();A.paint.shadow(6,2,.25);g.fillStyle=S.ok?C.gr:C.vi;g.beginPath();g.arc(nx,b.y+b.h/2,z(16),0,7);g.fill();g.restore();g.strokeStyle=C.pn;g.lineWidth=3;g.beginPath();g.arc(nx,b.y+b.h/2,z(9),0,7);g.stroke();
  para(g,'How sure are you that it was on purpose? Drag the dot.',W/2,b.y-z(34),W-30,13,C.tx,700);A.fx.draw(g);return}
 const rs=lines(choices().length);rs.forEach((r,j)=>{const o=choices()[j],got=S.picked.includes(j);if(S.hold&&S.hold.j===j&&S.hold.x!=null)return;
  card(g,r,got?A.mix(C.pn,C.gr,.2):S.bad===j?A.mix(C.pn,C.rd,.18):C.pn,got?C.gr:S.bad===j?C.rd:C.vi,got||S.bad===j?3:2);para(g,(got?'✓ ':'')+o[0],r.x+r.w/2,r.y+r.h/2,r.w-16,15,C.tx,700)});
 if(S.hold&&S.hold.x!=null){const r=rs[0];card(g,{...r,x:S.hold.x-r.w/2,y:S.hold.y-r.h/2},C.pn,C.vi,3);para(g,choices()[S.hold.j][0],S.hold.x,S.hold.y,r.w-16,15,C.tx,700)}
 para(g,p==='reasons'?`Find 2 other reasons (${S.picked.length}/2)`:'Drag the best words up to the story',W/2,rs[0].y-z(16),W-30,13,C.mu,700);A.fx.draw(g)}
const nope=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;voice(t);setTimeout(()=>{S.bad=-1;A.redraw()},brisk()?10:1100);A.redraw()};
function win1(t,goal=3){S.n++;A.sound.pop();keys();if(S.n<goal&&part()!=='order'){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;Object.assign(S,{wait:0,k:S.k+1,ok:0,picked:[],seen:[],needle:.5,set:0});voice(t+' Next one.');keys();A.redraw()},brisk()?5:1400);voice(t)}else{voice(t);keys()}A.redraw();S.hook()}
function sortTo(j){if(part()!=='seen'||S.n>=3||S.wait||S.ok)return;const[t,want]=SEEN[S.k];if(j!==want)return nope(WHYNOT[want],0);S.ok=1;win1(`${j?'A guess about why':'What happened'}: “${t}” ${WHYNOT[want]}`)}
function chip(j){const p=part();if(S.n>=3||S.wait||S.ok)return;const it=item(),o=choices()[j];if(!o)return;
 if(p==='reasons'){if(S.picked.includes(j))return;if(!o[1])return nope(o[2],j);S.picked.push(j);A.sound.tick();if(S.picked.length<2){voice(`“${o[0]}” could be true. Find one more.`);keys();return A.redraw()}S.ok=1;return win1(`Two other reasons. “${it.hot}” is only one of three ideas, and you do not know which is true yet.`)}
 if(p==='ask'){if(!o[1])return nope(o[2],j);S.picked=[j];S.ok=1;return win1(`“${o[0]}” checks without blaming, so you hear what really happened.`)}}
function clue(j){if(part()!=='meter'||S.ok||S.wait||S.seen.includes(j))return;S.seen.push(j);A.sound.tick();voice('Clue: '+item().clues[j]);A.redraw()}
function judge(){if(part()!=='meter'||S.ok||S.wait||S.n>=3)return;const it=item(),zn=zoneOf(S.needle);if(S.seen.length<2)return nope('Look at both clue cards first. You need evidence before you decide.');
 if(zn!==it.zone)return nope(it.miss[zn]);S.ok=1;win1(['The clues fit an accident. Your first thought was wrong.','You cannot tell yet, so ask before you decide.','The clues show Jo meant it. Questioning means following the evidence, either way.'][it.zone])}
function setZone(k){if(part()!=='meter'||S.ok||S.wait)return;S.needle=[.17,.5,.83][k];A.redraw();judge()}
function tapOrder(j){if(part()!=='order'||S.n>=4||S.wait)return;const id=S.deal[j];if(S.placed.includes(id))return;const want=S.placed.length;
 if(id!==want)return nope(OWHY[id]||'Start by noticing the hot thought.',j);S.placed.push(id);A.sound.tick();
 if(S.placed.length<4){S.n++;voice(`${want+1}. ${ORDER[id][1]}.`);keys();A.redraw();S.hook()}else win1('Notice, pause, think, check. Now you are ready to find out what really happened.',4)}
function keys(){if(!pad)return;pad.innerHTML='';const p=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.ok)return;
 if(p==='seen'&&S.n<3){B('👀 What happened',()=>sortTo(0));B('💭 A guess about why',()=>sortTo(1))}
 if(p==='reasons'||p==='ask')choices().forEach((o,j)=>{if(!S.picked.includes(j))B(o[0],()=>chip(j))});
 if(p==='meter'&&S.n<3){[0,1].forEach(j=>{if(!S.seen.includes(j))B('🔎 Clue '+(j+1),()=>clue(j))});ZONE.forEach((n,k)=>B(n,()=>setZone(k),'Set the sure-o-meter to '+n))}
 if(p==='order')S.deal.forEach((id,j)=>{if(!S.placed.includes(id))B(ORDER[id][0]+' '+ORDER[id][1],()=>tapOrder(j))})}
const inR=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h;
function down(q){const p=part();if(p==='quiz'||S.wait||S.ok)return false;
 if(p==='seen'){if(inR(q,slip())){S.hold={x:null,x0:q.x,y0:q.y};return true}return false}
 if(p==='meter'){const j=clueRects().findIndex(r=>inR(q,r));if(j>=0){clue(j);return false}const b=bar();if(Math.abs(q.y-(b.y+b.h/2))<z(34)){S.hold={meter:1};S.needle=Math.max(0,Math.min(1,(q.x-b.x)/b.w));A.redraw();return true}return false}
 if(p==='order'){const j=lines(4).findIndex(r=>inR(q,r));if(j>=0)tapOrder(j);return false}
 const j=lines(choices().length).findIndex(r=>inR(q,r));if(j<0)return false;if(p==='reasons'){chip(j);return false}S.hold={j,x:null,x0:q.x,y0:q.y};return true}
function move(q){const d=S.hold;if(!d)return;if(d.meter){const b=bar();S.needle=Math.max(0,Math.min(1,(q.x-b.x)/b.w));S.set=1;A.redraw();return}if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.hold;S.hold=null;if(!d)return;const p=part();if(d.meter)return judge();
 if(p==='seen'){if(d.x==null)return A.redraw();const j=tray().findIndex(r=>inR(q,{x:r.x,y:r.y-30,w:r.w,h:r.h+30}));if(j>=0)sortTo(j);else A.redraw();return}
 if(d.x==null||inR(q,story()))chip(d.j);else{voice('Drop the words on the story at the top.');A.redraw()}}
const fin=(n,msg,goal=3)=>()=>{if(A.step===n&&S.n>=goal&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f,goal=3){const k=++run,go=()=>{if(k!==run||S.n>=goal)return;f();setTimeout(go,60)};setTimeout(go,30)}
const wipe=()=>{run++;Object.assign(S,fresh())};
const good=()=>choices().findIndex((o,j)=>o[1]&&!S.picked.includes(j));
const steps=[
{h:'Fact or guess?',p:'What you saw or heard is a fact. Why someone did it is a guess, because you cannot see inside their head. Drag each sentence to its box.',task:'Sort 3 sentences',
 show:()=>{steps[0].go();S.quick=1;auto(()=>sortTo(SEEN[S.k][1]))},go:()=>{wipe();voice('Leo bumped my tray. Fact or guess?');keys();S.hook=fin(0,'What happened is a fact. Why it happened is a guess until you check.')}},
{h:'Other reasons',p:'Your first thought is just one idea. Tap two other reasons that could also explain what happened.',predict:{q:'Ava walked past without waving. What do you know for sure?',opts:['She is cross with me','Only that she did not wave'],ans:1},task:'Find other reasons 3 times',
 show:()=>{steps[1].go();S.quick=1;auto(()=>chip(good()))},go:()=>{wipe();voice('Ava did not wave. Find two other reasons.');keys();S.hook=fin(1,'Every puzzling moment has more than one possible reason.')}},
{h:'Weigh the clues',p:'Tap the clue cards, then drag the dot to show how sure you can be. Clues decide, not feelings.',predict:{q:'Before any clues: how sure can you be that Sam meant it?',opts:['Very sure: he knocked it off','Not sure yet: I only saw what happened'],ans:1},task:'Weigh the clues 3 times',
 show:()=>{steps[2].go();S.quick=1;auto(()=>{if(S.seen.length<2)return clue(S.seen.includes(0)?1:0);setZone(item().zone)})},go:()=>{wipe();voice('Sam knocked your pencil case off. Tap the clues.');keys();S.hook=fin(2,'Two clues said accident, one said can’t tell yet, one said on purpose. Follow the evidence.')}},
{h:'Pause, think, check',p:'When a first thought makes you hot, use these steps. Tap them in the right order.',task:'Put the 4 steps in order',
 show:()=>{steps[3].go();S.quick=1;auto(()=>tapOrder(S.deal.indexOf(S.placed.length)),4)},go:()=>{wipe();voice('Tap the first step.');keys();S.hook=fin(3,'Notice, pause, think of other reasons, then check.',3)}},
{h:'Check, don’t blame',p:'Asking finds out what happened. Blaming starts a fight. Drag the best words up to the story.',predict:{q:'Leo bumped your tray. Which gets you the truth?',opts:['“Why did you do that on purpose?”','“Did you mean to bump me?”'],ans:1},task:'Choose the best words 3 times',
 show:()=>{steps[4].go();S.quick=1;auto(()=>chip(good()))},go:()=>{wipe();voice('Leo bumped your tray. What do you say?');keys();S.hook=fin(4,'A calm question lets the other person explain.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Kai did not answer your message. What is a fact?',[['Kai has not answered yet','ok'],['Kai is angry with me','guess'],['Kai never liked me','always']]],
 ['You feel very sure Mo meant to trip you. Does that prove it?',[['No, a feeling is not a clue','ok'],['Yes, I would know','feel'],['Yes, feelings are always right','feel']]],
 ['Which is the best way to check?',[['“Did you mean to do that?”','ok'],['“Why did you do that on purpose?”','blame'],['Get them back later','revenge']]],
 ['Zoe took your pen, said “Mine now!” and will not give it back. What fits?',[['She probably meant it','ok'],['It must be an accident','soft'],['Never decide anything','soft']]],
 ['A friend is quiet today. How many reasons could there be?',[['Lots: tired, worried, busy…','ok'],['One: they are upset with me','one'],['None','one']]],
 ['When should you check what happened?',[['After you pause and think','ok'],['Straight away, while you are angry','hot'],['Never, just guess','guess']]]];
function why(t){let m='Split what you saw from the guess about why.';
 if(t==='guess')m='That is a guess about why. The fact is only what you saw or heard.';if(t==='always')m='“Never” and “always” are signs of a hot thought. One moment is not proof.';
 if(t==='feel')m='A strong feeling is not evidence. Look for clues or ask.';if(t==='blame')m='“On purpose” decides the answer before they speak. Ask, do not accuse.';
 if(t==='revenge')m='Getting back acts on a guess. If it was an accident, you started the fight.';if(t==='soft')m='Questioning a first thought means following the clues. Here they show she meant it.';
 if(t==='one')m='A puzzling moment almost always has more than one possible reason.';if(t==='hot')m='Checking while you are angry often sounds like blaming. Pause first.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You checked the first thought.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
