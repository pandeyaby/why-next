/* Flagship – disagreeing respectfully (ages 14–16; PSHE Association Programme of Study KS4 relationships strand on
   communicating respectfully and managing conflict, and online behaviour; DfE RSHE "Online relationships" and "Respectful
   relationships"; steelmanning after Rapoport's rules for criticism). Sort replies that challenge an idea from replies that
   attack a person; steelman an opposing view before answering; back a point with evidence rather than a story or volume;
   bring a heated thread's temperature down; and find the common ground two sides already share. */
(()=>{
 const CLAIM='“Homework should be banned.”';
 const REPLIES=[['Studies find homework helps older students more than younger ones.',0,'This tests the claim with evidence.'],['Only lazy people want that.',1,'This labels the person. It says nothing about homework.'],
  ['What would replace the practice homework gives?',0,'A question about the idea invites a reason back.'],['You would say that, you never do yours.',1,'This goes after their habits, not their argument.'],
  ['Some homework is busywork, but practice before tests helps.',0,'This agrees with part of it and challenges the rest.'],['lol ok boomer',1,'A put-down ends the thinking. Age is not a reason.']];
 const VIEWS=[['Phones should be banned in school.',[['You just hate people having fun.','straw','A straw man: a weaker, silly version of their view that is easy to knock down.'],
   ['Phones split attention, and lessons go better without the buzz.','steel','That is their best reason, stated fairly. They would say: yes, that is what I mean.'],['Some teachers do not like phones.','weak','True maybe, but it misses their real reason.']]],
  ['The voting age should be 16.',[['Teenagers just want to feel grown up.','straw','That mocks them instead of stating their reason.'],['16-year-olds can work and pay tax, so they should have a say.','steel','Their strongest reason, put the way they would put it.'],
   ['Some people think it is a good idea.','weak','That is too vague. Which reason do they actually give?']]],
  ['School uniform should be scrapped.',[['Uniform costs families money and does not raise grades much.','steel','Their real points, cost and the evidence, stated fairly.'],['They want to wear whatever they like.','weak','Close, but it leaves out their best reason.'],['They want school to be a free-for-all.','straw','Nobody said that. It is a straw man.']]]];
 const BACK=[['Is sugar tax working?',[['A 2023 study of English school health checks found fewer obese 10- and 11-year-old girls after the tax.','ev'],['My cousin still drinks loads of fizzy drinks.','story'],['IT OBVIOUSLY DOES NOT WORK.','loud']]],
  ['Do people read less now?',[['Everyone knows nobody reads any more.','crowd'],['A yearly national survey shows fewer young people enjoy reading than 10 years ago.','ev'],['I read loads, so no.','story']]],
  ['Is the four-day week a good idea?',[['Trust me, I just know it is.','trust'],['I saw one angry post about it.','story'],['A 2022 UK trial of 61 firms found most kept it after it ended.','ev']]]];
 const MOVES=[['Reply in CAPITALS',18,'Capitals read as shouting. The heat goes up.'],['Ask what they mean',-16,'A real question shows you are listening. The heat drops.'],
  ['Tag friends to pile on',22,'A pile-on turns a debate into a crowd against one person.'],['Say what you agree with first',-18,'Shared ground lowers the guard on both sides.'],
  ['Post a sarcastic meme',14,'Sarcasm is mockery. It adds heat and no reason.'],['Take a break, reply later',-14,'Time lets both of you cool down before you answer.']];
 const SIDES=[['We both want students to learn well.',1],['Homework should be scrapped tomorrow.',0],['Busywork wastes time.',1],['Teachers set homework to punish us.',0],['Practice helps before a test.',1],['The other side does not care about students.',0]];
 VIS.reg('flagdisag',c=>{let A,ctl,cq;
  const D={tok:0,ri:0,piles:[0,0],vi:0,heard:0,bi:0,heat:70,moves:0,used:[],ground:[],note:'',bad:false,ok:()=>{}};
  const part=()=>['idea','steel','back','heat','ground','chal'][A.step];
  const em=n=>Math.round(n*(A.narrow?1:1.1));
  const DARK='#0f172a',MID='#475569',LINE='#64748b',PAPER='#ffffff',GOOD='#047857',HOT='#b91c1c',COOL='#1d4ed8',NOTE='#fefce8',BRASS='#a16207';
  function say(g,s,x,y,n,col,al){g.font=`700 ${em(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function fold(g,s,max,n){g.font=`700 ${em(n)}px system-ui,sans-serif`;const L=[];let ln='';s.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(ln&&g.measureText(t).width>max){L.push(ln);ln=w}else ln=t});L.push(ln);return L}
  function para(g,s,x,y,max,n,col){const L=fold(g,s,max,n),lh=em(n)+4;L.forEach((l,i)=>say(g,l,x,y+(i-(L.length-1)/2)*lh,n,col))}
  function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function banner(g){if(!D.note)return;const L=fold(g,(D.bad?'✗ ':'✓ ')+D.note,A.W-44,13),lh=em(13)+6,h=L.length*lh+12,y=A.H-h-6;card(g,{x:10,y,w:A.W-20,h},PAPER,D.bad?HOT:GOOD,3);L.forEach((l,i)=>say(g,l,A.W/2,y+6+lh*(i+.5),13,DARK))}
  const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const flop=s=>{D.bad=true;D.note=s;A.sound.miss();live(s);A.redraw()};
  const nice=s=>{D.bad=false;D.note=s;A.sound.pop()};
  const half=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.42,w,h:A.H*.24}};
  const opt=k=>{const h=A.H*.15;return{x:12,y:A.H*.25+k*(h+7),w:A.W-24,h}};
  const chip=k=>{const w=(A.W-30)/2,h=A.H*.15;return{x:10+(k%2)*(w+10),y:A.H*.17+Math.floor(k/2)*(h+7),w,h}};
  function top(g,s,fill,edge,h){const r={x:12,y:A.H*.04,w:A.W-24,h:A.H*(h||.17)};card(g,r,fill||NOTE,edge||BRASS,2.5);para(g,s,A.W/2,r.y+r.h/2,r.w-20,14,DARK)}
  function gauge(g){const r={x:20,y:A.H*.27,w:A.W-40,h:em(22)};card(g,r,'#e2e8f0',LINE,1.5);const f=Math.max(0,Math.min(100,D.heat))/100;g.fillStyle=D.heat>=60?HOT:D.heat>=30?BRASS:COOL;g.fillRect(r.x+1,r.y+1,(r.w-2)*f,r.h-2);
   say(g,`Thread temperature: ${D.heat}`,r.x,r.y-em(11),13,DARK,'left');g.strokeStyle=COOL;g.setLineDash([4,3]);g.beginPath();g.moveTo(r.x+r.w*.3,r.y-4);g.lineTo(r.x+r.w*.3,r.y+r.h+4);g.stroke();g.setLineDash([]);say(g,'calm',r.x+r.w*.3,r.y+r.h+em(10),11,COOL)}
  function view(g){const v=part();
   if(v==='idea'){const R=REPLIES[D.ri];top(g,`Someone posts ${CLAIM} A reply: ${R?R[0]:'all six sorted'}`,R?NOTE:PAPER,R?BRASS:LINE,.3);
    ['Challenges the idea','Attacks the person'].forEach((t,k)=>{const r=half(k);card(g,r,'#f8fafc',k?HOT:GOOD,2.5);say(g,t,r.x+r.w/2,r.y+r.h*.35,A.narrow?12:14,k?HOT:GOOD);say(g,D.piles[k]?'●'.repeat(D.piles[k]):'tap',r.x+r.w/2,r.y+r.h*.72,13,MID)})}
   if(v==='steel'){const V=VIEWS[D.vi];if(!V){top(g,'All three views steelmanned',PAPER,GOOD);return}top(g,`They say: “${V[0]}” Sum up their view before you answer.`);
    V[1].forEach((o,k)=>{const r=opt(k);card(g,r,PAPER,LINE,2);para(g,o[0],r.x+r.w/2,r.y+r.h/2,r.w-20,13,DARK)});say(g,`Views where they felt understood: ${D.heard} of 3`,A.W/2,A.H*.78,13,MID)}
   if(v==='back'){const B=BACK[D.bi];if(!B){top(g,'All three points backed with evidence',PAPER,GOOD);return}top(g,`Question: ${B[0]} Which reply gives the strongest support?`);
    B[1].forEach((o,k)=>{const r=opt(k);card(g,r,PAPER,LINE,2);para(g,o[0],r.x+r.w/2,r.y+r.h/2,r.w-20,13,DARK)})}
   if(v==='heat'){top(g,'A comment thread has turned nasty. Pick your next move and watch the temperature.',NOTE,BRASS,.17);gauge(g);
    say(g,`Moves used: ${D.moves}`,A.W/2,A.H*.43,13,MID);const last=D.used[D.used.length-1];if(last!=null)para(g,`Last move: ${MOVES[last][0]}`,A.W/2,A.H*.52,A.W-40,13,MOVES[last][1]>0?HOT:COOL)}
   if(v==='ground'){say(g,'Two sides on homework. Tap what BOTH could agree on.',A.W/2,A.H*.08,13,DARK);
    SIDES.forEach((s,k)=>{const r=chip(k),on=D.ground.includes(k);card(g,r,on?'#dcfce7':PAPER,on?GOOD:LINE,on?3:2);para(g,s[0],r.x+r.w/2,r.y+r.h/2,r.w-14,12,DARK)});
    say(g,`Common ground found: ${D.ground.length} of 3`,A.W/2,A.H*.72,13,D.ground.length>=3?GOOD:MID)}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')say(g,'Argue with the idea. Respect the person.',A.W/2,A.H/2,15,DARK);else view(g);banner(g);A.fx.draw(g)}
  // ---- moves ----
  function sortReply(k){const R=REPLIES[D.ri];if(!R)return;if(k!==R[1])return flop(`Look again. ${R[2]}`);D.piles[k]++;nice(R[2]);D.ri++;sync()}
  function steelPick(k){const V=VIEWS[D.vi];if(!V)return;const o=V[1][k];if(o[1]!=='steel')return flop(o[2]);D.heard++;nice(o[2]);D.vi++;sync()}
  function backPick(k){const B=BACK[D.bi];if(!B)return;const t=B[1][k][1];if(t!=='ev'){let m='Pick the reply a doubter could check.';
    if(t==='story')m='One story is not a pattern. One cousin or one post cannot show what happens to most people.';
    if(t==='loud')m='Capitals make it louder, not truer. There is no reason in it.';
    if(t==='crowd')m='“Everyone knows” is not evidence. Who measured it, and how?';
    if(t==='trust')m='“Trust me” asks them to take your word. Give them something they can check.';return flop(m)}
   nice('Yes: a named study or survey with numbers can be checked. It is still worth asking who ran it.');D.bi++;sync()}
  function move(k){if(D.heat<30)return;const m=MOVES[k];D.used.push(k);D.moves++;D.heat=Math.max(0,Math.min(100,D.heat+m[1]));if(m[1]>0)flop(m[2]);else nice(m[2]);if(D.heat<30)nice(`${m[2]} The thread is calm: ${D.heat}.`);sync()}
  function ground(k){if(D.ground.includes(k))return;const s=SIDES[k];if(!s[1])return flop(k===1?'That is one side’s demand. The other side would say no.':k===3?'That is a claim about motives, and teachers would reject it.':'That is an attack on the other side, not shared ground.');D.ground.push(k);nice(`Both sides could say: “${s[0]}”`);sync()}
  function sync(){const v=part();let s='';
   if(v==='idea')s=REPLIES[D.ri]?`Reply: ${REPLIES[D.ri][0]} Challenges the idea, or attacks the person?`:'All six replies sorted.';
   else if(v==='steel')s=VIEWS[D.vi]?`They say: ${VIEWS[D.vi][0]} Options: `+VIEWS[D.vi][1].map(o=>o[0]).join(' / '):'All three views steelmanned.';
   else if(v==='back')s=BACK[D.bi]?`Question: ${BACK[D.bi][0]} Options: `+BACK[D.bi][1].map(o=>o[0]).join(' / '):'All three backed.';
   else if(v==='heat')s=`Thread temperature ${D.heat}. Calm is below 30. Moves used ${D.moves}.`;
   else if(v==='ground')s=`Common ground found ${D.ground.length} of 3.`;else s='Challenge.';
   live((D.note?D.note+' ':'')+s);pads();D.ok()}
  function pads(){if(!ctl)return;ctl.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
   if(v==='idea'&&REPLIES[D.ri])['Challenges the idea','Attacks the person'].forEach((t,k)=>b(t,()=>sortReply(k)));
   if(v==='steel'&&VIEWS[D.vi])VIEWS[D.vi][1].forEach((o,k)=>b(`Summary ${k+1}`,()=>steelPick(k),`Summary ${k+1}: ${o[0]}`));
   if(v==='back'&&BACK[D.bi])BACK[D.bi][1].forEach((o,k)=>b(`Reply ${k+1}`,()=>backPick(k),`Reply ${k+1}: ${o[0]}`));
   if(v==='heat'&&D.heat>=30)MOVES.forEach((m,k)=>b(m[0],()=>move(k)));
   if(v==='ground')SIDES.forEach((s,k)=>{if(!D.ground.includes(k))b(s[0],()=>ground(k))});A.redraw()}
  function down(p){const v=part();
   if(v==='idea'){const k=[0,1].find(k=>over(p,half(k)));if(k!=null)sortReply(k)}
   if(v==='steel'||v==='back'){const k=[0,1,2].find(k=>over(p,opt(k)));if(k!=null)(v==='steel'?steelPick:backPick)(k)}
   if(v==='ground'){const k=SIDES.findIndex((_,k)=>over(p,chip(k)));if(k>=0)ground(k)}return false}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fns=>{const id=++D.tok,gap=A.reduced()?15:320;fns.forEach((f,k)=>setTimeout(()=>{if(id===D.tok)f()},k*gap))};
  const blank=()=>{D.tok++;D.ok=()=>{};D.ri=0;D.piles=[0,0];D.vi=0;D.heard=0;D.bi=0;D.heat=70;D.moves=0;D.used=[];D.ground=[];D.note='';D.bad=false};
  const steps=[
   {h:'Idea or person?',p:'Someone posts that homework should be banned. Sort each reply: does it challenge the idea, or attack the person?',
    task:'Sort 6 replies',show:()=>{steps[0].go();auto(REPLIES.map(R=>()=>sortReply(R[1])))},go:()=>{blank();sync();D.ok=fin(0,()=>D.ri>=REPLIES.length,'Three replies argued with homework. Three went after the person and said nothing about homework.')}},
   {h:'Steelman first',p:'Before you disagree, sum up their view the way they would. Tap the fairest summary.',
    predict:{q:'If you sum up their view fairly first, will they listen to you more or less?',opts:['More: they feel heard','Less: it makes your side look weak','No difference'],ans:0},
    task:'Steelman 3 views',show:()=>{steps[1].go();auto(VIEWS.map(V=>()=>steelPick(V[1].findIndex(o=>o[1]==='steel'))))},go:()=>{blank();sync();D.ok=fin(1,()=>D.vi>=VIEWS.length,'A fair summary of their best reason. Now your answer is about what they really think.')}},
   {h:'Back it up',p:'Tap the reply that gives the strongest support: something a doubter could check.',
    task:'Pick 3 strong replies',show:()=>{steps[2].go();auto(BACK.map(B=>()=>backPick(B[1].findIndex(o=>o[1]==='ev'))))},go:()=>{blank();sync();D.ok=fin(2,()=>D.bi>=BACK.length,'Named studies and surveys can be checked. One story, capitals and “trust me” cannot.')}},
   {h:'Cool the thread',p:'The thread is at 70. Pick moves to bring it below 30 so people can actually talk.',
    predict:{q:'Someone is rude to you online. Does a fast, hard reply usually end it?',opts:['No: it usually makes it hotter','Yes: it shows you will not back down'],ans:0},
    task:'Bring the thread below 30',show:()=>{steps[3].go();auto([()=>move(1),()=>move(3),()=>move(5)])},go:()=>{blank();sync();D.ok=fin(3,()=>D.heat<30,'Questions, shared ground and a pause cooled it. Capitals, pile-ons and sarcasm only add heat.')}},
   {h:'Find common ground',p:'People who disagree often share more than they think. Tap the 3 things both sides could say.',
    task:'Find 3 shared points',show:()=>{steps[4].go();auto(SIDES.map((s,k)=>s[1]?()=>ground(k):null).filter(Boolean))},go:()=>{blank();sync();D.ok=fin(4,()=>D.ground.length>=3,'Both sides want learning, dislike busywork and value practice. Start there, then argue about the rest.')}},
   {h:'Challenge',p:'',go:()=>{blank();next()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>D.ok()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['“That is a stupid view and you are stupid for holding it.” What is wrong with this reply?','It attacks the person, not the idea',[['Nothing: it is honest','honest'],['It is too short','short']]],
   ['What is steelmanning?','Stating their strongest reason fairly before you answer',[['Repeating your own view more firmly','repeat'],['Picking the weakest point to knock down','straw']]],
   ['Which reply is best backed up?','A named survey with numbers',[['A story about your friend','story'],['A reply in capital letters','caps']]],
   ['A thread is heating up. Which move helps most?','Ask what they mean',[['Tag friends to back you','pile'],['Reply at once in capitals','caps']]],
   ['Why look for common ground first?','It shows where you agree, so you argue about less',[['It means giving up your view','giveup'],['It is a trick to win','trick']]],
   ['Two people still disagree after a calm talk. Has it failed?','No: you can disagree and still respect each other',[['Yes: one of them must win','win'],['Yes: they should stop speaking','cut']]]];
  function slip(tag){let m='Ask: does this reply deal with their reasons, and respect them as a person?';
   if(tag==='honest')m='Honest is fine; insulting is not. You can say you disagree without calling anyone stupid.';
   if(tag==='short')m='Length is not the problem. The problem is that it attacks the person and gives no reason.';
   if(tag==='repeat')m='Saying your view louder is not listening. Steelmanning is about their view, not yours.';
   if(tag==='straw')m='Knocking down a weak version is a straw man. A steelman takes on their best point.';
   if(tag==='story')m='One story is not a pattern. A survey of many people is stronger support.';
   if(tag==='caps')m='Capitals read as shouting. They add heat, not evidence.';
   if(tag==='pile')m='A pile-on turns a debate into a crowd against one person, and it gets hotter.';
   if(tag==='giveup')m='Shared ground does not mean giving in. You still disagree on the rest.';
   if(tag==='trick')m='It is not a trick if it is true. Real agreement makes the rest easier to discuss.';
   if(tag==='win')m='Not every talk has a winner. Understanding each other is a good result.';
   if(tag==='cut')m='Cutting people off for one view shuts down learning on both sides.';return m}
  let qn=-1,row=0;
  function next(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=cq.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>score(tag,ans)});live('Challenge: '+q);A.redraw()}
  function score(tag,ans){cq.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=cq.querySelector('.fl-fb');
   if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+row+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
  A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{cq.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
