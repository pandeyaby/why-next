/* Flagship – mixed and conflicting emotions (ages 9–11). Two feelings can be true at the same time: pick both feelings
   in a scene, drag the balance between them as the moment changes (nerves before a race, excitement after), sort true
   statements from myths (a mixed feeling is not a fault), and find the two clues in a story that show two feelings. */
(()=>{
const SCENE=[{t:'First day at a new school',pic:'🏫',yes:['Excited','Nervous'],no:['Bored','Angry']},
 {t:'Your friend wins the art prize you also tried for',pic:'🏆',yes:['Happy for her','Disappointed'],no:['Scared','Bored']},
 {t:'Your family is moving to a new town',pic:'📦',yes:['Sad to leave','Excited'],no:['Angry','Calm']}];
const MOMENT=[{say:'“I am really nervous, but a tiny bit excited.”',when:'The night before the swimming gala',lo:0,hi:30,mid:15},
 {say:'“Half of me is nervous and half is excited.”',when:'On the starting block',lo:40,hi:60,mid:50},
 {say:'“I am mostly excited now. Just a bit of nerves left.”',when:'After the first length',lo:70,hi:100,mid:85}];
const MYTH=[['Mixed feelings are normal. Adults have them too.',1,'True. Most people feel two things at once some of the time.'],
 ['Feeling happy and sad at once means something is wrong with you.',0,'Myth. Two feelings at once is normal, not a fault.'],
 ['You can be happy for a friend and jealous at the same time.',1,'True. Both can be real, and you can still be kind.'],
 ['If you feel jealous of a friend, you are a bad friend.',0,'Myth. What you do matters. A feeling does not make you bad.'],
 ['You must pick one feeling and ignore the other.',0,'Myth. Naming both feelings helps you understand yourself.']];
const STORY=[{who:'Maya',bits:['Maya grinned at her new bedroom.','Her coat was blue.','Her eyes filled with tears as she waved goodbye.','The van was big.'],hit:{0:'excited',2:'sad'}},
 {who:'Leo',bits:['The baby was called Sam.','Leo held his new brother very gently.','It was raining.','Leo sulked when Mum was busy with the baby.'],hit:{1:'loving',3:'jealous'}},
 {who:'Zara',bits:['Her hands shook behind the curtain.','The hall had red chairs.','The play was about pirates.','She beamed when the crowd clapped.'],hit:{0:'nervous',3:'proud'}}];
VIS.reg('flagmixed',c=>{let A,bar,quiz,qn=-1,gen=0,streak=0;
const empty=()=>({i:0,won:0,goal:3,err:-1,picked:[],mix:50,drag:0,zones:[],done:()=>{},fast:0}),U=empty();
const where=()=>['intro','both','mix','myth','story','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1:1.08)),rush=()=>A.reduced()||U.fast;
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function say(g,s,x,y,w,size,col,bold){g.font=`${bold||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const ln=[''];String(s).split(' ').forEach(p=>{const n=ln.length-1,t=ln[n]?ln[n]+' '+p:p;if(ln[n]&&g.measureText(t).width>w)ln.push(p);else ln[n]=t});
 const gap=z(size)*1.27;ln.forEach((l,k)=>g.fillText(l,x,y+(k-(ln.length-1)/2)*gap))}
function glyph(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function chip(g,r,tone,lw){const C=A.col,h={yes:C.gr,no:C.rd,warm:C.am,cool:C.cy,soft:C.vi,pink:C.pk}[tone];g.save();A.paint.shadow(5,2,.12);
 g.fillStyle=h?A.mix(C.pn,h,.17):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.lineWidth=lw||(h?2.5:1.5);g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const four=top=>{const gap=10,w=(A.W-24-gap)/2,h=z(56);return[0,1,2,3].map(k=>({x:12+(k%2)*(w+gap),y:top+Math.floor(k/2)*(h+gap),w,h}))};
const opts=()=>{const s=SCENE[U.i];return[s.yes[0],s.no[0],s.yes[1],s.no[1]]};
const track=()=>({x:z(30),y:A.H*.56,w:A.W-z(60),h:z(18)});
const knobX=()=>{const t=track();return t.x+t.w*U.mix/100};
const halves=()=>{const gap=10,w=(A.W-24-gap)/2;return[0,1].map(k=>({x:12+k*(w+gap),y:A.H*.64,w,h:A.H*.28}))};
const lines=()=>{const h=z(54),gap=8;return STORY[U.i].bits.map((_,k)=>({x:14,y:A.H*.17+k*(h+gap),w:A.W-28,h}))};
function heart(g,x,y,s,a,b){const C=A.col;[[a,C.am,-1],[b,C.cy,1]].forEach(([lab,col,side])=>{g.save();g.beginPath();g.rect(side<0?x-s:x,y-s,s,s*2);g.clip();g.fillStyle=col;g.beginPath();
 g.moveTo(x,y+s*.9);g.bezierCurveTo(x-s*1.3,y,x-s*.7,y-s*1.05,x,y-s*.4);g.bezierCurveTo(x+s*.7,y-s*1.05,x+s*1.3,y,x,y+s*.9);g.fill();g.restore();
 say(g,lab,x+side*s*1.55,y,s*1.3,15,C.tx,800)})}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,w=where();
 if(w==='quiz'){say(g,'Two feelings can both be true. Name them both.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(w==='intro'){say(g,'Starting a new school',W/2,H*.12,W-30,17,C.tx,800);heart(g,W/2,H*.5,Math.min(W,H)*.18,'Excited','Nervous');
  say(g,'One heart, two feelings, both real.',W/2,H*.88,W-30,16,C.tx,800);return}
 if(w==='both'){const s=SCENE[U.i];glyph(g,s.pic,W/2,H*.1,z(40));say(g,s.t,W/2,H*.24,W-30,17,C.tx,800);say(g,'Tap the 2 feelings that fit together.',W/2,H*.35,W-30,14,C.mu,700);
  const rs=four(H*.45);U.zones=rs;opts().forEach((o,k)=>{const on=U.picked.includes(o);chip(g,rs[k],on?'yes':U.err===k?'no':'',2.5);say(g,(on?'✓ ':'')+o,rs[k].x+rs[k].w/2,rs[k].y+rs[k].h/2,rs[k].w-12,16,C.tx,800)});
  if(U.picked.length===2)say(g,`${U.picked[0]} AND ${U.picked[1]}`,W/2,H*.9,W-30,16,C.tx,900)}
 if(w==='mix'){const m=MOMENT[U.i],t=track(),x=knobX();say(g,m.when,W/2,H*.08,W-30,15,C.mu,700);say(g,m.say,W/2,H*.22,W-30,17,C.tx,800);
  const nv=100-U.mix,ex=U.mix,mid=t.x+t.w*U.mix/100;g.fillStyle=C.cy;A.paint.rrect(t.x,t.y,Math.max(0,mid-t.x),t.h,9);g.fill();g.fillStyle=C.am;A.paint.rrect(mid,t.y,Math.max(0,t.x+t.w-mid),t.h,9);g.fill();
  say(g,`Excited ${ex}%`,t.x+z(52),t.y-z(28),z(120),15,C.tx,800);say(g,`Nervous ${nv}%`,t.x+t.w-z(52),t.y-z(28),z(120),15,C.tx,800);
  g.save();A.paint.shadow(8,2,.25);g.fillStyle=C.pn;g.beginPath();g.arc(x,t.y+t.h/2,z(22),0,7);g.fill();A.paint.noShadow();g.lineWidth=3;g.strokeStyle=U.err===5?C.rd:C.tx;g.stroke();g.restore();
  say(g,'Drag the dot, then press Check.',W/2,H*.78,W-30,14,C.mu,700)}
 if(w==='myth'){say(g,'True, or a myth?',W/2,H*.07,W-30,16,C.tx,800);const hs=halves();U.zones=hs;
  [['True ✓','yes'],['Myth ✗','warm']].forEach(([l,tone],k)=>{chip(g,hs[k],U.err===k?'no':tone,3);say(g,l,hs[k].x+hs[k].w/2,hs[k].y+hs[k].h/2,hs[k].w-10,22,C.tx,900)});
  if(U.won<U.goal){const r={x:16,y:H*.17,w:W-32,h:H*.4};chip(g,r,'soft',3);say(g,MYTH[U.i][0],W/2,r.y+r.h/2,r.w-30,18,C.tx,800)}}
 if(w==='story'){const s=STORY[U.i];say(g,`Tap the 2 clues that show ${s.who}’s two feelings.`,W/2,H*.07,W-30,15,C.tx,800);const rs=lines();U.zones=rs;
  rs.forEach((r,k)=>{const on=U.picked.includes(k);chip(g,r,on?'yes':U.err===k?'no':'',2);say(g,s.bits[k]+(on?`  → ${s.hit[k]}`:''),r.x+r.w/2,r.y+r.h/2,r.w-16,14,C.tx,on?800:600)});
  if(U.picked.length===2)say(g,`${s.who} feels ${s.hit[U.picked[0]]} AND ${s.hit[U.picked[1]]}.`,W/2,H*.9,W-30,16,C.tx,900)}
 A.fx.draw(g)}
function miss(t,k){A.sound.miss();U.err=k;voice(t);setTimeout(()=>{U.err=-1;A.redraw()},rush()?10:1300);A.redraw()}
function gain(t){U.won++;A.sound.pop();voice(t);keys();A.redraw();U.done()}
function later(f,ms){const was=U.i,tk=gen;if(U.won<U.goal)setTimeout(()=>{if(tk!==gen||U.i!==was)return;f();keys();A.redraw()},rush()?5:ms)}
function pick(k){if(where()!=='both'||U.won>=U.goal||U.picked.length>=2)return;const s=SCENE[U.i],o=opts()[k];if(U.picked.includes(o))return;
 if(!s.yes.includes(o))return miss(`${o} does not fit this scene. Look for one feeling about what is good and one about what is hard.`,k);
 U.picked.push(o);if(U.picked.length<2){A.sound.tick();voice(`${o}: yes. What else might you feel at the same time?`);keys();return A.redraw()}
 gain(`${s.t}: ${s.yes[0]} AND ${s.yes[1]}. Both are true at once.`);later(()=>{U.i++;U.picked=[];voice('Next scene.')},1500)}
function nudge(d){if(where()!=='mix'||U.won>=U.goal)return;U.mix=Math.max(0,Math.min(100,U.mix+d));voice(`Nervous ${100-U.mix}%, excited ${U.mix}%.`);A.redraw()}
function check(){if(where()!=='mix'||U.won>=U.goal)return;const m=MOMENT[U.i];
 if(U.mix<m.lo||U.mix>m.hi)return miss(U.mix<m.lo?`Too much nervous. Listen again: ${m.say} Make the excited part bigger.`:`Too much excited. Listen again: ${m.say} Make the nervous part bigger.`,5);
 gain(`${m.when}: nervous ${100-U.mix}%, excited ${U.mix}%. The mix fits.`);later(()=>{U.i++;U.mix=U.i===1?20:50;voice('Later on. How is the mix now?')},1500)}
function judge(t){if(where()!=='myth'||U.won>=U.goal)return;const m=MYTH[U.i];if(t!==m[1])return miss(m[2],t?0:1);U.i++;gain(m[2]+(U.won+1<U.goal?' Next card.':''))}
function clue(k){if(where()!=='story'||U.won>=U.goal||U.picked.length>=2||U.picked.includes(k))return;const s=STORY[U.i];
 if(!(k in s.hit))return miss(`“${s.bits[k]}” is a fact, not a feeling clue. Look for what ${s.who} does with face or body.`,k);
 U.picked.push(k);if(U.picked.length<2){A.sound.tick();voice(`That shows ${s.hit[k]}. Find the clue for a different feeling.`);keys();return A.redraw()}
 gain(`${s.who} feels ${s.hit[U.picked[0]]} and ${s.hit[U.picked[1]]} at the same time.`);later(()=>{U.i++;U.picked=[];voice('Next story.')},1600)}
function keys(){if(!bar)return;bar.innerHTML='';const w=where(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);b.onclick=f};
 if(w==='quiz'||w==='intro'||U.won>=U.goal)return;
 if(w==='both'&&U.picked.length<2)opts().forEach((o,k)=>{if(!U.picked.includes(o))B(o,()=>pick(k),'Feeling: '+o)});
 if(w==='mix'){B('◀ More nervous',()=>nudge(-10),'Less excited, more nervous');B('More excited ▶',()=>nudge(10),'More excited, less nervous');B('Check the mix',check)}
 if(w==='myth'){const t=MYTH[U.i][0];B('True ✓',()=>judge(1),t+' True');B('Myth ✗',()=>judge(0),t+' Myth')}
 if(w==='story'&&U.picked.length<2)STORY[U.i].bits.forEach((b,k)=>{if(!U.picked.includes(k))B(`Clue ${k+1}`,()=>clue(k),'Clue: '+b)})}
const inBox=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const w=where();if(w==='quiz'||w==='intro'||U.won>=U.goal)return false;
 if(w==='mix'){const t=track();if(Math.abs(p.y-(t.y+t.h/2))<z(34)&&p.x>t.x-z(26)&&p.x<t.x+t.w+z(26)){U.drag=1;move(p);return true}return false}
 const k=U.zones.findIndex(r=>inBox(p,r,3));if(k<0)return false;if(w==='both')pick(k);if(w==='myth')judge(k===0?1:0);if(w==='story')clue(k);return false}
function move(p){if(!U.drag)return;const t=track();U.mix=Math.round(Math.max(0,Math.min(100,(p.x-t.x)/t.w*100))/5)*5;A.cv.setAttribute('aria-label',`Nervous ${100-U.mix}%, excited ${U.mix}%.`);A.redraw()}
function up(){if(!U.drag)return;U.drag=0;voice(`Nervous ${100-U.mix}%, excited ${U.mix}%. Press Check when it fits.`)}
const close=(k,msg)=>()=>{if(A.step===k&&U.won>=U.goal&&(!steps[k].predict||A.pred[k]!=null))A.done(msg+A.reveal(k))};
function play(f){const k=++gen,go=()=>{if(k!==gen||U.won>=U.goal)return;f();setTimeout(go,70)};setTimeout(go,30)}
const wipe=()=>{gen++;Object.assign(U,empty())};
function right(){const w=where();if(w==='both'){const s=SCENE[U.i],k=opts().findIndex(o=>s.yes.includes(o)&&!U.picked.includes(o));return k>=0&&pick(k)}
 if(w==='mix'){U.mix=MOMENT[U.i].mid;return check()}if(w==='myth')return judge(MYTH[U.i][1]);
 if(w==='story'){const k=Object.keys(STORY[U.i].hit).map(Number).find(j=>!U.picked.includes(j));return k!=null&&clue(k)}}
const demo=k=>()=>{steps[k].go();U.fast=1;play(right)};
const steps=[
{h:'Two feelings at once',p:'You can feel two different things at the same moment. Starting a new school can feel exciting and scary at once. That is called a mixed feeling, and it is normal.',
 go:()=>{wipe();voice('One heart, two feelings: excited and nervous.')}},
{h:'Pick both',p:'Read each scene. Choose the two feelings someone might have at the same time.',predict:{q:'Your friend is picked for the team and you are not. How many feelings can you have?',opts:['One: the strongest feeling wins','Two at once: happy for them and let down'],ans:1},task:'Find 2 feelings in 3 scenes',show:demo(1),
 go:()=>{wipe();voice('Tap the 2 feelings that fit together.');keys();U.done=close(1,'Each scene held one feeling about the good part and one about the hard part.')}},
{h:'The mix can move',p:'Mixed feelings are not always half and half. Drag the dot to show how much of each feeling Ade has, then press Check.',predict:{q:'Do mixed feelings stay the same mix?',opts:['Yes, the mix is fixed','No, the mix can change'],ans:1},task:'Match the mix 3 times',show:demo(2),
 go:()=>{wipe();U.mix=60;voice('Drag the dot between nervous and excited, then press Check.');keys();U.done=close(2,'The nerves got smaller and the excitement grew. The mix changed as the gala went on.')}},
{h:'True or myth?',p:'Some people think a mixed feeling means something is wrong. Sort each card into True or Myth.',predict:{q:'You feel happy AND jealous when your friend wins. Are you a bad friend?',opts:['Yes, a good friend only feels happy','No, both feelings are normal'],ans:1},task:'Sort 5 cards',show:demo(3),
 go:()=>{wipe();U.goal=5;voice('True or myth? Tap a box.');keys();U.done=close(3,'Mixed feelings are normal. What you do with them is what counts.')}},
{h:'Clues in a story',p:'Writers show mixed feelings with clues: what a character does with their face or body. Find two clues for two feelings.',task:'Read 3 stories',show:demo(4),
 go:()=>{wipe();voice('Tap the 2 feeling clues.');keys();U.done=close(4,'Grinning and tears, holding gently and sulking, shaking and beaming: each pair shows two feelings at once.')}},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>U.done()});
const QS=[['Kai is excited and nervous about camp. What is true?',[['Both feelings are real at the same time','ok'],['He is only pretending to be excited','fake'],['Feeling nervous means he should not go','avoid']]],
 ['Your friend wins. You feel happy and jealous. What could you say?',[['“Well done! I wish I had won too.”','ok'],['Nothing. Walk off and hide it.','hide'],['“You only won because you were lucky.”','mean']]],
 ['Which sentence shows a mixed feeling?',[['I was proud of my score but sad my friend did badly.','ok'],['I was very, very happy.','one'],['I was happy, then I had lunch.','event']]],
 ['Can the mix of two feelings change?',[['Yes, nerves often shrink once you start','ok'],['No, it stays the same for ever','fixed'],['Only grown-ups feel it change','adult']]],
 ['Why can moving house bring mixed feelings?',[['You lose some things and gain others','ok'],['Because you are confused','confused'],['Because one of the feelings is wrong','wrongfeel']]]];
function why(t){let m='Two feelings can be true at once. Name both.';
 if(t==='fake')m='Feeling nervous does not make the excitement fake. Both are real.';if(t==='avoid')m='Nerves are normal before something new. They often shrink once you start.';
 if(t==='hide')m='Hiding the feeling does not make it go. You can be honest and kind at once.';if(t==='mean')m='That turns jealousy into an unkind act. Say how you feel without putting them down.';
 if(t==='one')m='That is one strong feeling. A mixed feeling has two different feelings at once.';if(t==='event')m='That is one feeling, then an event. A mixed feeling is two feelings together.';
 if(t==='fixed')m='The mix moves. Ade went from mostly nervous to mostly excited.';if(t==='adult')m='Children feel the mix change too, like nerves fading after the start.';
 if(t==='confused')m='Mixed feelings are not confusion. Each feeling fits a different part of the change.';if(t==='wrongfeel')m='No feeling is wrong. Sad fits what you leave; excited fits what is new.';return m}
function next(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>score(t)});voice('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` In a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
