/* Flagship – basic digital citizenship (ages 7–9) on Kai's tablet: sort private and shareable facts, pick kind replies and
   see the real child behind each post, choose safe moves for a worrying message, decide on friend requests, and think
   before posting. Each tap or drag has a button twin; the canvas label reads out every result. */
(()=>{
const INFO=[['🔑 Your password',0,'A password is a secret key. Only you and your grown-up should know it.'],['🎨 Your favourite colour',1],
 ['🏠 Your home address',0,'An address tells a stranger where you live.'],['🐶 That you love dogs',1],
 ['🏫 The name of your school',0,'A school name helps a stranger find you.'],['📞 Your phone number',0,'A phone number lets a stranger call or text you.']];
const POSTS=[['Zara','😊','😢','My first drawing of a horse 🐴',[['Cool horse! I like the colours.','kind'],['LOL that looks like a dog','mean'],['Bad drawing. Everyone thinks so.','pile']]],
 ['Ben','🙂','😞','I came last in the race today.',[['Haha slowest kid ever','mean'],['Well done for finishing!','kind'],['😂😂😂','emoji']]],
 ['Mo','😀','😟','Here is me singing my song!',[['Just a joke: you sound like a cat','joke'],['Do not post again','mean'],['Brave! Keep going 🎤','kind']]]];
const HURT={mean:'read it and felt sad. A real person with real feelings reads every comment.',pile:'felt worse. “Everyone thinks so” is like a crowd joining in.',
 emoji:'felt laughed at. Laughing faces can hurt as much as words.',joke:'still felt hurt. Calling it a joke does not stop it hurting.'};
const MOVES=[['🛑 Do not reply',1],['🤫 Keep it a secret',0,'Never keep a secret like this. A trusted adult can help, and you are not in trouble.'],['🚫 Block and report',1],
 ['📷 Send a photo',0,'Never send photos to someone you do not know. Stop and tell an adult.'],['🧑‍🏫 Tell a trusted adult',1]];
const ASKS=[['Ana','You see your cousin every week.',1,'✓ It really is Ana, your cousin.'],['Lily, 9, loves ponies','You have never met her.',0,'? Anyone can type any name, age or photo.'],
 ['FreeCoins','“Send me your password for 500 coins!”',0,'✗ A trick to get into your account.']];
const POSTIT=[['📸 Me in my school uniform',0,'Your uniform shows which school you go to.'],['🐱 My drawing of a cat',1],['🏡 “Home alone tonight!”',0,'It tells strangers you are on your own.'],['⚽ “I scored a goal today!”',1]];
VIS.reg('flagnetsafe',c=>{let A,ctl,chal,qn=-1,tick=0,best=0;c.fig.classList.add('young');
const base=()=>({then:()=>{},got:0,at:0,deck:[],held:null,oops:-1,lit:-1,reply:-1,taps:[],seen:-1,trail:[]}),Z=base();
const part=()=>['info','kind','help','who','post','quiz'][A.step],rush=()=>A.reduced();
const goal=()=>({info:6,kind:3,help:3,who:3,post:4}[part()]||99);
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const fz=n=>Math.round(n*(A.narrow?1.08:1.15));
function say(g,t,x,y,n,col,mw){g.font=`700 ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-10)}
/* split words over lines that fit width mw, centred on y */
function para(g,t,x,y,n,mw,col){g.font=`700 ${fz(n)}px system-ui,sans-serif`;const L=[];let s='';
 for(const w of t.split(' ')){const u=s?s+' '+w:w;if(s&&g.measureText(u).width>mw){L.push(s);s=w}else s=u}L.push(s);
 const d=fz(n)*1.25;L.forEach((l,i)=>say(g,l,x,y+(i-(L.length-1)/2)*d,n,col,mw))}
function card(g,r,fill,line,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=w||2;g.strokeStyle=line;g.stroke()}
const on=(p,r)=>r&&p.x>=r.x-6&&p.x<=r.x+r.w+6&&p.y>=r.y-6&&p.y<=r.y+r.h+6;
const rim=()=>A.mix(A.col.tx,A.col.pn,.38),sheet=()=>A.col.dark?'#1e293b':'#ffffff',soft=h=>A.mix(A.col.pn,h,A.col.dark?.2:.55);
const mid=(g,t,r,n,col)=>para(g,t,r.x+r.w/2,r.y+r.h/2,n,r.w-14,col);
/* layout helpers */
const bin=i=>({x:8+i*(A.W/2),y:A.H*.06,w:A.W/2-16,h:A.H*.5}),pile=()=>({x:A.W*.12,y:A.H*.68,w:A.W*.76,h:A.H*.2});
const postBox=()=>({x:8,y:8,w:A.W-16,h:A.H*.38}),pickRow=i=>({x:8,y:A.H*(.48+i*.17),w:A.W-16,h:A.H*.14});
const msgBox=()=>({x:8,y:8,w:A.W-16,h:A.H*.26}),moveTile=i=>{const w=(A.W-24)/2;return{x:8+(i%2)*(w+8),y:A.H*(.32+Math.floor(i/2)*.22),w,h:A.H*.19}};
const profile=()=>({x:A.W*.08,y:A.H*.05,w:A.W*.84,h:A.H*.5}),yesNo=i=>{const w=(A.W-24)/2;return{x:8+i*(w+8),y:A.H*.62,w,h:A.H*.24}};
const drag=r=>{const h=Z.held;return h&&h.x!=null?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};
function face(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function drawInfo(g){const C=A.col;['🔒 Keep private','✅ OK to share'].forEach((t,i)=>{const r=bin(i);card(g,r,soft(i?'#bbf7d0':'#fecaca'),Z.lit===i?C.vi:rim(),Z.lit===i?4:2);say(g,t,r.x+r.w/2,r.y+18,13,C.tx,r.w-8);
  let y=r.y+42;Z.trail.filter(k=>INFO[k][1]===i).forEach(k=>{para(g,INFO[k][0],r.x+r.w/2,y,11,r.w-10,C.tx);y+=fz(11)*2.6})});
 const k=Z.deck[0];if(k==null){say(g,'All sorted! 👏',A.W/2,A.H*.78,15);return}const r=drag(pile());card(g,r,sheet(),Z.oops===k?C.rd:rim(),Z.oops===k?4:2);mid(g,INFO[k][0],r,15)}
function drawKind(g){const C=A.col,P=POSTS[Z.at%3],b=postBox(),flip=Z.reply>=0;card(g,b,sheet(),rim());
 const s=Math.min(b.h*.42,64),bad=flip&&P[4][Z.reply][1]!=='kind';g.fillStyle=soft(flip?'#fde68a':'#e2e8f0');g.beginPath();g.arc(b.x+s*.7+8,b.y+s*.7+8,s*.6,0,7);g.fill();
 face(g,flip?(bad?P[2]:P[1]):'👤',b.x+s*.7+8,b.y+s*.7+8,s*.7);say(g,flip?P[0]+' (a real child)':'@'+P[0].toLowerCase(),b.x+s*1.5+18,b.y+s*.5+8,12,C.tx,b.w-s*2);
 para(g,P[3],A.W/2,b.y+b.h*.72,14,b.w-24);
 P[4].forEach((o,i)=>{const r=pickRow(i),me=Z.reply===i;card(g,r,me?soft(o[1]==='kind'?'#bbf7d0':'#fecaca'):sheet(),me?(o[1]==='kind'?C.gr:C.rd):Z.lit===i?C.vi:rim(),me?4:2);mid(g,'💬 '+o[0],r,13)})}
function drawHelp(g){const C=A.col,m=msgBox();card(g,m,soft('#fde68a'),C.am,3);say(g,'New message from CoolKid22',A.W/2,m.y+18,11,C.tx);
 mid(g,'“Send me a photo of you. Do not tell your mum.”',{...m,y:m.y+12},14);
 MOVES.forEach((v,i)=>{const r=moveTile(i),got=Z.taps.includes(i),bad=Z.oops===i;card(g,r,got?soft('#bbf7d0'):sheet(),got?C.gr:bad?C.rd:Z.lit===i?C.vi:rim(),got||bad?4:2);mid(g,(got?'✓ ':'')+v[0],r,13)})}
function drawWho(g){const C=A.col,Q=ASKS[Z.at%3],r=profile(),done=Z.got>Z.at;card(g,r,sheet(),rim(),2);say(g,'Friend request',A.W/2,r.y+18,11,C.tx);
 face(g,done?(Q[2]?'🧒':'❔'):'🙂',A.W/2,r.y+r.h*.34,Math.min(r.h*.3,60));say(g,Q[0],A.W/2,r.y+r.h*.6,15,C.tx);para(g,done?Q[3]:Q[1],A.W/2,r.y+r.h*.82,12,r.w-20,done&&!Q[2]?C.rd:C.tx);
 ['✅ Accept','❌ Say no'].forEach((t,i)=>{const b=yesNo(i);card(g,b,sheet(),Z.oops===i?C.rd:Z.lit===i?C.vi:rim(),Z.oops===i?4:2);say(g,t,b.x+b.w/2,b.y+b.h/2,15,C.tx,b.w-8)})}
function drawPost(g){const C=A.col,k=Z.deck[0];say(g,`Your footprint: ${Z.trail.length} post${Z.trail.length===1?'':'s'} that stay online`,A.W/2,A.H*.05,12,C.tx);
 Z.trail.forEach((j,i)=>{const r={x:8+(i%2)*(A.W/2),y:A.H*(.1+Math.floor(i/2)*.12),w:A.W/2-16,h:A.H*.1};card(g,r,soft('#bae6fd'),rim());mid(g,'👣 '+POSTIT[j][0],r,10)});
 if(k==null){say(g,'Done. Think before you post! 🧠',A.W/2,A.H*.5,14);return}const r={x:8,y:A.H*.36,w:A.W-16,h:A.H*.2};card(g,r,sheet(),Z.oops>=0?C.rd:rim(),Z.oops>=0?4:2);mid(g,POSTIT[k][0],r,15);
 ['📤 Post it','🙅 Do not post'].forEach((t,i)=>{const b=yesNo(i);card(g,b,sheet(),Z.lit===i?C.vi:rim());say(g,t,b.x+b.w/2,b.y+b.h/2,15,C.tx,b.w-8)})}
function drawQuiz(g){face(g,'📱',A.W/2,A.H*.4,Math.min(A.H*.4,110));say(g,'Be safe, be kind online',A.W/2,A.H*.82,15)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.35);g.fillRect(0,0,A.W,A.H);
 ({info:drawInfo,kind:drawKind,help:drawHelp,who:drawWho,post:drawPost,quiz:drawQuiz}[part()])(g);A.fx.draw(g)}
function flash(i){Z.lit=i;const v=tick;setTimeout(()=>{if(v===tick){Z.lit=-1;A.redraw()}},420)}
function no(t){A.sound.miss();voice(t);A.redraw()}
function ok(t){Z.got++;Z.oops=-1;A.sound.pop();voice(t);pads();A.redraw();Z.then()}
const strip=t=>t.replace(/^\S+\s/,''),soon=(f,ms)=>{const v=tick;setTimeout(()=>{if(v===tick)f()},rush()?20:ms)};
/* put the top fact card in bin b (0 private, 1 ok) */
function file(b){const k=Z.deck[0];if(k==null)return;flash(b);const F=INFO[k];
 if(F[1]!==b){Z.oops=k;return no(b?F[2]+' Keep it private.':'That is fine to share. It does not help anyone find you or get into your things.')}
 Z.deck.shift();Z.trail.push(k);ok(b?'OK to share: it does not show who or where you are.':'Keep private. '+F[2])}
/* answer the post with reply i; the avatar flips to show the real child */
function answer(i){const P=POSTS[Z.at%3],o=P[4][i];if(Z.got>Z.at||Z.got>=3)return;flash(i);Z.reply=i;
 if(o[1]!=='kind'){Z.oops=i;return no(`${P[0]} ${HURT[o[1]]} Pick a kind reply.`)}
 ok(`${P[0]} smiles. Kind words help a real person.`);if(Z.got<3)soon(()=>{Z.at++;Z.reply=-1;voice('New post from '+POSTS[Z.at][0]+'. Pick a kind reply.');pads();A.redraw()},1300)}
function tapMove(i){const v=MOVES[i];if(Z.taps.includes(i)||Z.got>=3)return;flash(i);
 if(!v[1]){Z.oops=i;return no(v[2])}Z.taps.push(i);ok(strip(v[0])+': a safe move.'+(Z.got>=2?' That is the full plan: stop, block and report, tell.':''))}
function decide(y){const Q=ASKS[Z.at%3];if(Z.got>Z.at||Z.got>=3)return;flash(y);
 if(!y&&!Q[2]){Z.oops=y;return no('Only accept people you know in real life. '+Q[3].slice(2))}
 ok(y&&Q[2]?'Saying no is always allowed. You know Ana in real life, so accepting is fine too.':Q[3].slice(2));if(Z.got<3)soon(()=>{Z.at++;Z.oops=-1;voice('Friend request from '+ASKS[Z.at][0]+'.');pads();A.redraw()},1300)}
function share(y){const k=Z.deck[0];if(k==null)return;flash(y);const P=POSTIT[k];
 if(!y&&!P[1]){Z.oops=k;return no(P[2]+' Do not post it.')}
 Z.deck.shift();if(!y)Z.trail.push(k);ok(y?(P[1]?'Fine: you never have to post. This one would be safe too.':'Not posted. '+P[2]):'Posted. It is safe, and now part of your footprint.')}
function pads(){if(!ctl)return;ctl.innerHTML='';const m=part();if(m==='quiz'||Z.got>=goal())return;
 const K=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=f};
 if(m==='info'&&Z.deck.length)['🔒 Keep private','✅ OK to share'].forEach((t,i)=>K(t,`${strip(INFO[Z.deck[0]][0])}: ${strip(t)}`,()=>file(i)));
 if(m==='kind'&&Z.got<=Z.at)POSTS[Z.at%3][4].forEach((o,i)=>K('💬 '+o[0],'Reply: '+o[0],()=>answer(i)));
 if(m==='help')MOVES.forEach((v,i)=>{if(!Z.taps.includes(i))K(v[0],strip(v[0]),()=>tapMove(i))});
 if(m==='who'&&Z.got<=Z.at)['✅ Accept','❌ Say no'].forEach((t,i)=>K(t,`${strip(t)} the request from ${ASKS[Z.at%3][0]}`,()=>decide(i)));
 if(m==='post'&&Z.deck.length)['📤 Post it','🙅 Do not post'].forEach((t,i)=>K(t,`${strip(t)}: ${strip(POSTIT[Z.deck[0]][0])}`,()=>share(i)))}
function down(p){const m=part();if(m==='quiz'||Z.got>=goal())return false;
 if(m==='info'){if(Z.deck.length&&on(p,pile())){Z.held={x:null,x0:p.x,y0:p.y};return true}const b=[0,1].find(i=>on(p,bin(i)));if(b!=null)file(b);return false}
 if(m==='kind'){const i=[0,1,2].find(j=>on(p,pickRow(j)));if(i!=null)answer(i)}
 if(m==='help'){const i=MOVES.findIndex((_,j)=>on(p,moveTile(j)));if(i>=0)tapMove(i)}
 if(m==='who'||m==='post'){const y=[0,1].find(j=>on(p,yesNo(j)));if(y!=null)(m==='who'?decide:share)(y)}return false}
function move(p){const h=Z.held;if(h&&(h.x!=null||Math.hypot(p.x-h.x0,p.y-h.y0)>8)){h.x=p.x;h.y=p.y;A.redraw()}}
function up(p){const h=Z.held;Z.held=null;if(!h)return;const b=[0,1].find(i=>on(p,bin(i)));if(b==null){voice('Drop the card in Keep private or OK to share.');return A.redraw()}file(b)}
const when=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,ms){const k=++tick;list.forEach((f,j)=>setTimeout(()=>{if(k===tick)f()},rush()?j*40+30:(j+1)*(ms||650)))}
const begin=x=>{tick++;Object.assign(Z,base(),x||{});pads()};
const kindAt=()=>POSTS[Z.at%3][4].findIndex(o=>o[1]==='kind');
const steps=[
{h:'Private or OK to share?',p:'Private information can help a stranger find you or get into your things. Drag each card to Keep private or OK to share.',predict:{q:'Is it OK to tell a friend in an online game the name of your school?',opts:['Yes, it is only a school','No, it helps a stranger find you'],ans:1},task:'Sort 6 cards',
 show:()=>{steps[0].go();demo(INFO.map(()=>()=>file(INFO[Z.deck[0]][1])))},go:()=>{begin({deck:[0,1,2,3,4,5]});voice('Drag the card to Keep private or OK to share.');Z.then=when(0,()=>Z.got>=6,'Keep personal information private: password, address, school and phone number.')}},
{h:'Real people, real feelings',p:'Behind every screen is a real person. Tap a reply to each post and see how the child who posted it feels.',predict:{q:'Does a mean comment hurt less online than face to face?',opts:['Yes, it is only words on a screen','No, a real person reads it'],ans:1},task:'Reply kindly 3 times',
 show:()=>{steps[1].go();demo([()=>answer(kindAt()),()=>answer(kindAt()),()=>answer(kindAt())],1500)},go:()=>{begin();voice('New post from Zara. Pick a kind reply.');Z.then=when(1,()=>Z.got>=3,'Only post what you would say to someone’s face.')}},
{h:'Stop, block, tell',p:'Kai gets a message that feels wrong. Tap the 3 safe moves. Leave the unsafe ones.',predict:{q:'The message says “Do not tell your mum.” What should Kai do?',opts:['Keep the secret','Tell a trusted adult'],ans:1},task:'Find 3 safe moves',
 show:()=>{steps[2].go();demo([()=>tapMove(0),()=>tapMove(2),()=>tapMove(4)])},go:()=>{begin();voice('A message from CoolKid22 asks for a photo. Tap the safe moves.');Z.then=when(2,()=>Z.got>=3,'If something online feels wrong: stop, block and report, and tell a trusted adult.')}},
{h:'Who is really there?',p:'People online may not be who they say. Accept or say no to each friend request, then see who it really is.',task:'Decide 3 requests',
 show:()=>{steps[3].go();demo([()=>decide(0),()=>decide(1),()=>decide(1)],1500)},go:()=>{begin();voice('Friend request from Ana.');Z.then=when(3,()=>Z.got>=3,'Only accept friends you know in real life.')}},
{h:'Think before you post',p:'What you post is your digital footprint. It can stay online even if you delete it. Post it or not?',task:'Decide 4 posts',
 show:()=>{steps[4].go();demo(POSTIT.map(()=>()=>share(POSTIT[Z.deck[0]][1]?0:1)))},go:()=>{begin({deck:[0,1,2,3]});voice('Post it or not? '+strip(POSTIT[0][0]));Z.then=when(4,()=>Z.got>=4,'Ask: is it safe, is it kind, would I be happy for anyone to see it?')}},
{h:'Challenge',p:'',go:()=>{begin();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.then()});
const QS=[['A player in a game asks which school you go to. What do you do?',[['Do not tell them, and tell a grown-up','ok'],['Tell them. It is only a school','school'],['Tell them your street instead','street']]],
 ['Someone posts a mean comment about your friend. What helps?',[['Do not join in, be kind to your friend, tell an adult','ok'],['Add a laughing emoji','emoji'],['Share it so others see','share']]],
 ['Who is a trusted adult?',[['A parent, carer or teacher you know','ok'],['Anyone online who says they are a grown-up','online'],['A friend your age','peer']]],
 ['Someone online offers free coins for your password. What is it?',[['A trick. Never share your password','ok'],['A good deal','deal'],['Fine if they seem friendly','friendly']]],
 ['Why should you think before you post?',[['Posts can stay online and be shared, even if you delete them','ok'],['Deleted posts are gone forever','gone'],['Only your friends can ever see a post','only']]]];
function why(t){let m='Look back at the lab: private, kind, stop-block-tell.';
 if(t==='school')m='Your school name helps a stranger find you. Keep it private.';
 if(t==='street')m='Your street is even more private: it shows where you live.';
 if(t==='emoji')m='Laughing faces join in with the meanness and hurt a real person.';
 if(t==='share')m='Sharing spreads the hurt to more people. That is cyberbullying too.';
 if(t==='online')m='You cannot be sure who someone online really is. A trusted adult is someone you know in real life.';
 if(t==='peer')m='Friends are great, but a grown-up you know can do more to help.';
 if(t==='deal')m='Anyone who asks for your password wants to get into your account.';
 if(t==='friendly')m='Strangers can seem friendly. Your password is only for you and your grown-up.';
 if(t==='gone')m='Others may have saved or shared it before you deleted it.';
 if(t==='only')m='Friends can share your post with people you do not know.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
function grade(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes! Safe and kind.':'✗ '+why(t)}${yes?` Streak: ${best}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
