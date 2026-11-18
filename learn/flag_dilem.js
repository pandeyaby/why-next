/* Flagship – difficult ethical choices (ages 9–11). A dilemma is hard because two good values pull different ways
   (Honesty and Kindness, Loyalty and Safety, Loyalty and Fairness), not because one side is bad. Name the two values,
   put each consequence on the side it argues for and watch the scale tip (harm that cannot be undone weighs most, so a
   secret that hides danger goes to a trusted adult), sort real reasons from non-reasons, then look for a choice that
   respects both values. Every drag has a button twin. */
(()=>{
const CASES=[
 {e:'🧶',t:'Gran knitted you a jumper. You do not like it. She asks, “Do you love it?”',pair:['Honesty','Kindness'],miss:'Here the pull is between telling the truth (Honesty) and not hurting Gran (Kindness).',
  ops:[['Say “No, it is horrible.”',0,'That is honest but not kind. You can tell the truth gently.'],['Say you love it and will wear it every day',0,'That is kind but not honest, and now you have to keep pretending.'],['Thank Gran for her time and care, and say the part you do like',1,'Honest and kind together: you thank her and tell the truth about the part you like.']]},
 {e:'🚲',t:'Ben makes you promise not to tell. He plans to cycle to the lake alone after dark.',pair:['Loyalty','Safety'],miss:'Keeping your promise to Ben is Loyalty. Ben being in danger is about Safety.',
  ops:[['Keep quiet: a promise is a promise',0,'That is loyal, but Ben could be badly hurt. Safety comes first.'],['Tell the whole class so he gets in trouble',0,'That is not loyal or kind, and it does not make Ben any safer.'],['Tell Ben you are worried, then tell a trusted adult',1,'You stay a good friend by being honest with Ben, and an adult can keep him safe.']]},
 {e:'⚽',t:'You are captain. Do you pick your best friend, or Kit, who trained hardest and plays better?',pair:['Loyalty','Fairness'],miss:'Sticking by your friend is Loyalty. Choosing by effort and skill is Fairness to Kit and the team.',
  ops:[['Pick your friend because he is your friend',0,'That is loyal, but it is unfair to Kit and the team.'],['Pick Kit and stop talking to your friend',0,'That is fair, but you can still be a kind friend.'],['Pick Kit, and kindly tell your friend why',1,'Fair to Kit, and you keep your friendship by explaining.']]}];
const VALS=['Honesty','Kindness','Loyalty','Safety','Fairness','Courage'];
const CARDS=[['Ben could get badly hurt in the dark',0,4,'Getting hurt is the danger the secret hides. It is a reason to Tell, and it weighs the most because it cannot be undone.'],
 ['Ben trusted you with a secret',1,2,'Trust is what keeping the promise protects, so it argues for Keep.'],
 ['An adult can stop him and keep him safe',0,2,'An adult stepping in is what telling gets you, so it goes on Tell.'],
 ['Ben may be cross with you for a while',1,1,'Ben being cross is a cost of telling, so it pulls toward Keep. It is real, but it passes.'],
 ['Ben may feel embarrassed',1,1,'Embarrassment is a cost of telling, so it pulls toward Keep. It is small next to getting hurt.']];
const WHY=[['It would hurt Gran’s feelings',0,'Hurting someone is a real reason. It comes from a value: Kindness.'],['Everyone else does it',1,'Lots of people doing something does not make it right. Ask who it helps or harms.'],
 ['It is fair to the whole team',0,'Fairness is a real value, so this is a good reason.'],['I won’t get caught',1,'Getting caught or not does not change whether a choice is right.'],
 ['Someone could get hurt',0,'Safety is a real value. This is one of the strongest reasons there is.'],['Because I said so',1,'That gives no reason at all. A good reason says who is helped or harmed.']];
VIS.reg('flagdilem',c=>{let A,ctl,chal,qi=-1,streak=0,tok=0;
const blank=()=>({n:0,goal:3,pick:[],side:[0,0],placed:[],err:-1,done:0,hold:null,targets:[],zones:[],then:()=>{},bot:0}),P=blank();
const phase=()=>['intro','values','weigh','reasons','both','chal'][A.step];
const span=()=>Math.min((A.W-28)/1.4,z(330)),z=v=>Math.round(v*(A.narrow?1:1.12)),fast=()=>A.reduced()||P.bot;
const announce=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function text(g,s,x,y,maxW,size,fill,weight,align){g.font=`${weight||600} ${z(size)}px system-ui,sans-serif`;g.textAlign=align||'center';g.textBaseline='middle';g.fillStyle=fill||A.col.tx;
 const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);
 const lh=z(size)*1.28;out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*lh));return out.length*lh}
function card(g,b,hue,dashed,rad){const C=A.col,ring=hue&&C[hue];g.save();if(!dashed){A.paint.shadow(5,2,.12);g.fillStyle=ring?A.mix(C.pn,ring,.14):C.pn;A.paint.rrect(b.x,b.y,b.w,b.h,rad||12);g.fill();A.paint.noShadow()}
 if(dashed)g.setLineDash([7,5]);g.lineWidth=ring?2.6:1.6;g.strokeStyle=ring||C.ln;A.paint.rrect(b.x,b.y,b.w,b.h,rad||12);g.stroke();g.restore()}
/* the balance: a post, a beam turned by tilt (-1 left down … 1 right down), two pans with labels and weight blocks */
function balance(g,cx,cy,span,tilt,labL,labR,blocksL,blocksR){const C=A.col,ang=tilt*.22,dx=Math.cos(ang)*span/2,dy=Math.sin(ang)*span/2;
 g.strokeStyle=C.mu;g.lineWidth=4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx,cy+span*.42);g.moveTo(cx-span*.14,cy+span*.42);g.lineTo(cx+span*.14,cy+span*.42);g.stroke();
 g.strokeStyle=C.tx;g.lineWidth=5;g.beginPath();g.moveTo(cx-dx,cy-dy);g.lineTo(cx+dx,cy+dy);g.stroke();g.fillStyle=C.am;g.beginPath();g.arc(cx,cy,6,0,7);g.fill();
 [[cx-dx,cy-dy,labL,blocksL,'cy'],[cx+dx,cy+dy,labR,blocksR,'vi']].forEach(([px,py,lab,bl,hue])=>{const pw=span*.36,ph=z(30);g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(px,py);g.lineTo(px-pw/2,py+z(26));g.moveTo(px,py);g.lineTo(px+pw/2,py+z(26));g.stroke();
  const pan={x:px-pw/2,y:py+z(26),w:pw,h:ph};card(g,pan,hue,0,8);text(g,lab,px,pan.y+ph/2,pw-6,13,C.tx,800);
  for(let i=0;i<bl;i++){const s=z(11);g.fillStyle=C[hue];g.fillRect(px-pw/2+6+(i%6)*(s+3),py+z(22)-s-Math.floor(i/6)*(s+2),s,s)}})}
function scene(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,ph=phase();P.targets=[];P.zones=[];
 if(ph==='chal'){text(g,'Hard choices weigh two good values. Name them, weigh who could be hurt and how badly, give real reasons, and look for a choice that respects both.',W/2,H*.45,W-40,16,C.tx,800);return}
 if(ph==='intro'){const k=CASES[0];text(g,k.e,W/2,H*.08,60,34,'#000',400);text(g,k.t,W/2,H*.2,W-40,16,C.tx,700);balance(g,W/2,H*.42,span(),0,'Honesty','Kindness',3,3);
  text(g,'Both sides care about something good. That is what makes it hard.',W/2,H*.82,W-40,16,C.gr,800);return}
 if(ph==='values'){const k=CASES[P.done?P.n-1:P.n];if(!k)return;const top={x:12,y:H*.03,w:W-24,h:H*.2};card(g,top,'am');text(g,k.e+' '+k.t,W/2,top.y+top.h/2,top.w-24,15,C.tx,700);
  const tilt=P.done?0:P.pick.length===1?-1:0;balance(g,W/2,H*.31,span(),tilt,P.pick[0]||'?',P.pick[1]||'?',P.pick[0]?3:0,P.pick[1]?3:0);
  if(P.done){text(g,'✓ '+k.pair.join(' and ')+': two good values pulling different ways.',W/2,H*.66,W-30,15,C.gr,800);return}
  text(g,'Which two values pull against each other? Tap or drag two onto the scale.',W/2,H*.6,W-30,14,C.tx,700);
  const gw=(W-24-16)/3,gh=Math.min(z(48),H*.1);VALS.forEach((v,i)=>{const b={x:12+(i%3)*(gw+8),y:H*.67+Math.floor(i/3)*(gh+8),w:gw,h:gh,v:i},d=P.hold;
   const r=d&&d.i===i&&d.x!=null?{...b,x:d.x-gw/2,y:d.y-gh/2}:b;const on=P.pick.includes(v);card(g,r,P.err===i?'rd':on?'gr':'vi');text(g,v,r.x+r.w/2,r.y+r.h/2,r.w-8,15,C.tx,800);P.targets.push(r)});
  P.zones.push({x:0,y:0,w:W,h:H*.58,v:'scale'});return}
 if(ph==='weigh'){const sum=[0,0];P.placed.forEach(i=>sum[CARDS[i][1]]+=CARDS[i][2]);const tilt=Math.max(-1,Math.min(1,(sum[1]-sum[0])/3));
  text(g,'Ben’s secret: tell a trusted adult, or keep the promise?',W/2,H*.04,W-30,15,C.tx,800);balance(g,W/2,H*.2,span(),tilt,'Tell','Keep',sum[0],sum[1]);
  const half=(W-36)/2;[[12,'Reasons to Tell',0,'cy'],[24+half,'Reasons to Keep',1,'vi']].forEach(([x,lab,s,hue])=>{const b={x,y:H*.5,w:half,h:H*.12,v:s};card(g,b,hue,1);text(g,'Drop here: '+lab,b.x+b.w/2,b.y+b.h/2,b.w-10,13,C.tx,700);P.zones.push(b)});
  const i=P.placed.length;if(i>=CARDS.length){text(g,`✓ Tell ${sum[0]} : Keep ${sum[1]}. Getting hurt cannot be undone, so the scale tips to Tell.`,W/2,H*.78,W-30,15,C.gr,800);return}
  const cw=Math.min(W-40,z(320)),ch=z(62),d=P.hold,base={x:W/2-cw/2,y:H*.72,w:cw,h:ch,v:i},r=d&&d.x!=null?{...base,x:d.x-cw/2,y:d.y-ch/2}:base;
  card(g,r,P.err===0?'rd':'am');text(g,CARDS[i][0],r.x+r.w/2,r.y+r.h/2,r.w-16,15,C.tx,800);P.targets.push(r);
  text(g,`Card ${i+1} of ${CARDS.length}. Which side does it argue for?`,W/2,H*.93,W-30,13,C.mu,700);return}
 if(ph==='reasons'){const i=P.n;const half=(W-36)/2;[[12,'Good reason',0,'gr'],[24+half,'Not a real reason',1,'rd']].forEach(([x,lab,s,hue])=>{const b={x,y:H*.05,w:half,h:H*.38,v:s};card(g,b,hue,1);text(g,lab,b.x+b.w/2,b.y+z(16),b.w-10,14,C.tx,800);let y=b.y+z(34);
   WHY.slice(0,i).filter(w=>w[1]===s).forEach(w=>{g.font=`600 ${z(12)}px system-ui,sans-serif`;const n=Math.ceil(g.measureText('✓ '+w[0]).width/(b.w-16)),h=n*z(12)*1.28;text(g,'✓ '+w[0],b.x+b.w/2,y+h/2,b.w-14,12,C.tx,600);y+=h+6});P.zones.push(b)});
  if(i>=WHY.length){text(g,'✓ Good reasons name a value or who is helped or harmed.',W/2,H*.6,W-30,16,C.gr,800);return}
  const cw=Math.min(W-40,z(300)),ch=z(60),d=P.hold,base={x:W/2-cw/2,y:H*.58,w:cw,h:ch,v:i},r=d&&d.x!=null?{...base,x:d.x-cw/2,y:d.y-ch/2}:base;
  card(g,r,P.err===0?'rd':'am');text(g,'“'+WHY[i][0]+'”',r.x+r.w/2,r.y+r.h/2,r.w-16,16,C.tx,800);P.targets.push(r);text(g,'Drag it up into a box, or use the buttons.',W/2,H*.8,W-30,13,C.mu,700);return}
 if(ph==='both'){const k=CASES[P.done?P.n-1:P.n];if(!k)return;const top={x:12,y:H*.03,w:W-24,h:H*.25};card(g,top,'am');text(g,k.e+' '+k.t,W/2,top.y+top.h*.38,top.w-24,15,C.tx,700);
  text(g,k.pair.join(' vs ')+': find a choice that respects both.',W/2,top.y+top.h*.84,top.w-24,13,C.tx,800);
  if(P.done){const o=k.ops.find(o=>o[1]);card(g,{x:12,y:H*.32,w:W-24,h:H*.16},'gr');text(g,o[0],W/2,H*.4,W-44,15,C.tx,800);text(g,'✓ '+o[2],W/2,H*.62,W-30,14,C.gr,700);return}
  text(g,'Which choice respects both values? Tap one, or drag it up.',W/2,H*.33,W-30,14,C.tx,700);
  const sh=Math.min(z(64),H*.15);k.ops.forEach((o,i)=>{const b={x:12,y:H*.39+i*(sh+8),w:W-24,h:sh,v:i},d=P.hold,r=d&&d.i===i&&d.x!=null?{...b,x:d.x-b.w/2,y:d.y-sh/2}:b;
   card(g,r,P.err===i?'rd':'vi');text(g,o[0],r.x+r.w/2,r.y+r.h/2,r.w-20,15,C.tx,800);P.targets.push(r)});P.zones.push({x:0,y:0,w:W,h:H*.3,v:'up'})}
 A.fx.draw(g)}
function fail(msg,idx){A.sound.miss();P.err=idx;announce(msg);setTimeout(()=>{P.err=-1;A.redraw()},fast()?10:1700);A.redraw()}
function good(msg,round){P.n++;A.sound.pop();announce(msg);if(round){P.done=1;later(()=>{P.done=0;P.pick=[];A.redraw();keys()},1800)}keys();A.redraw();P.then()}
function later(f,ms){const t=tok,n=P.n;setTimeout(()=>{if(t!==tok||P.n!==n||P.n>=P.goal)return;f()},fast()?5:ms)}
function act(v){if(P.n>=P.goal||P.done)return;const ph=phase();
 if(ph==='values'){const k=CASES[P.n],name=VALS[v];if(P.pick.includes(name))return;P.pick.push(name);A.redraw();if(P.pick.length<2){announce(name+' is on the scale. Pick one more value.');return}
  if(k.pair.every(p=>P.pick.includes(p)))return good(`Yes: ${k.pair[0]} and ${k.pair[1]}. Both are good, and they pull different ways.`,1);P.pick=[];return fail(k.miss,v)}
 if(ph==='weigh'){const i=P.placed.length,cd=CARDS[i];if(v!==cd[1])return fail(cd[3],0);P.placed.push(i);return good(`“${cd[0]}” goes on ${cd[1]?'Keep':'Tell'}, weight ${cd[2]}.`)}
 if(ph==='reasons'){const w=WHY[P.n];if(v!==w[1])return fail(w[2],0);return good(`“${w[0]}”: ${w[1]?'not a real reason':'a good reason'}. ${w[2]}`)}
 if(ph==='both'){const o=CASES[P.n].ops[v];if(!o[1])return fail(o[2],v);return good(o[2],1)}}
function keys(){if(!ctl)return;ctl.innerHTML='';const ph=phase(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(ph==='chal'||ph==='intro'||P.n>=P.goal||P.done)return;
 if(ph==='values')VALS.forEach((v,i)=>{if(!P.pick.includes(v))add(v,()=>act(i),'Put '+v+' on the scale')});
 if(ph==='weigh'){add('⬅ Reason to Tell',()=>act(0));add('Reason to Keep ➡',()=>act(1))}
 if(ph==='reasons'){add('✓ Good reason',()=>act(0));add('✗ Not a real reason',()=>act(1))}
 if(ph==='both')CASES[P.n].ops.forEach((o,i)=>add(o[0],()=>act(i)))}
const hit=(p,r,pad)=>(pad=pad||0,p.x>r.x-pad&&p.x<r.x+r.w+pad&&p.y>r.y-pad&&p.y<r.y+r.h+pad);
function down(p){if(['chal','intro'].includes(phase())||P.n>=P.goal||P.done)return false;const j=P.targets.findIndex(r=>hit(p,r,4));if(j<0)return false;P.hold={i:P.targets[j].v,x:null,sx:p.x,sy:p.y};return true}
function move(p){const d=P.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.sx,p.y-d.sy)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=P.hold;P.hold=null;if(!d)return;const ph=phase(),zn=P.zones.find(r=>hit(p,r));
 if(ph==='weigh'||ph==='reasons'){if(d.x!=null&&zn)return act(zn.v);announce('Drag the card into a box, or use the buttons below.');return A.redraw()}
 if(d.x==null||zn)return act(d.i);A.redraw()}
const finish=(i,msg)=>()=>{if(A.step===i&&P.n>=P.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function robot(f){const t=++tok,loop=()=>{if(t!==tok||P.n>=P.goal)return;if(!P.done)f();setTimeout(loop,60)};setTimeout(loop,30)}
const fresh=g=>{tok++;Object.assign(P,blank(),{goal:g||3})};
function solve(){const ph=phase();if(ph==='values'){const k=CASES[P.n];const nx=k.pair.find(p=>!P.pick.includes(p));return act(VALS.indexOf(nx))}
 if(ph==='weigh')return act(CARDS[P.placed.length][1]);if(ph==='reasons')return act(WHY[P.n][1]);if(ph==='both')return act(CASES[P.n].ops.findIndex(o=>o[1]))}
const demo=i=>()=>{steps[i].go();P.bot=1;robot(solve)};
const steps=[
{h:'Two good things pulling apart',p:'A dilemma is a choice where every option costs something you care about. It is hard because both sides matter, not because one side is bad.',go:()=>{fresh();announce('Gran asks if you love the jumper. Honesty and Kindness sit on a level scale.')}},
{h:'Name the values',p:'Start by naming what pulls each way. Values are things people care about: honesty, kindness, loyalty, safety, fairness, courage.',predict:{q:'In a really hard choice…',opts:['one side is good and the other side is bad','both sides care about something good'],ans:1},task:'Name the two values in 3 dilemmas',show:demo(1),
 go:()=>{fresh();announce('Read the dilemma. Put the two values that pull against each other on the scale.');keys();P.then=finish(1,'Honesty and Kindness, Loyalty and Safety, Loyalty and Fairness: each choice was hard because both values are good.')}},
{h:'Weigh the consequences',p:'Ask who could be helped or harmed by each choice, and how badly. Harm that cannot be undone weighs the most.',predict:{q:'A friend’s secret could get him badly hurt. You should…',opts:['keep it, because a promise is a promise','tell a trusted adult, because safety comes first'],ans:1},task:'Put all 5 cards on the scale',show:demo(2),
 go:()=>{fresh(CARDS.length);announce('Drag each card to the side it argues for: Tell or Keep.');keys();P.then=finish(2,'Tell 6, Keep 4. Keeping the promise matters, but getting hurt cannot be undone, so this is a secret to share with a trusted adult.')}},
{h:'Real reasons',p:'A good reason names a value, or says who is helped or harmed. “Everyone does it” and “I won’t get caught” are not reasons a choice is right.',task:'Sort 6 reasons',show:demo(3),
 go:()=>{fresh(WHY.length);announce('Is it a good reason, or not a real reason? Drag it into a box.');keys();P.then=finish(3,'Good reasons point to kindness, fairness or safety. Popularity, not getting caught and “because I said so” do not.')}},
{h:'Look for a third way',p:'Often there is a choice that respects both values, like being honest in a kind way.',predict:{q:'When two values clash, the best choice…',opts:['always gives up one value completely','often finds a way to respect both'],ans:1},task:'Find 3 choices that respect both values',show:demo(4),
 go:()=>{fresh();announce('Which choice respects both values? Tap one.');keys();P.then=finish(4,'Thanking Gran, telling an adult after talking to Ben, and explaining your pick kindly: each keeps both values in view.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.then()});
const QS=[['Mia found £10 on the playground. Which two values pull against each other if she wants to keep it?',[['Honesty and wanting it for herself','ok'],['Kindness and courage','offtopic'],['Nothing: keeping it is fine','none']]],
 ['Which is a good reason to tell a teacher about bullying?',[['Someone is being hurt','ok'],['Everyone else is telling','crowd'],['You won’t get caught telling','caught']]],
 ['Your friend asks you to keep a secret that he is being hurt at home. What should you do?',[['Tell a trusted adult','ok'],['Keep the promise','promise'],['Tell other kids so they can help','gossip']]],
 ['Sam wants to stay loyal to a friend and also be fair in a game. Which choice respects both?',[['Play fair, and stick up for the friend kindly','ok'],['Let the friend cheat','cheat'],['Stop being his friend','drop']]],
 ['On a scale, which weighs most?',[['A harm that cannot be undone','ok'],['Someone being a bit cross','cross'],['Feeling embarrassed for a day','embar']]],
 ['Why are dilemmas hard?',[['Both choices protect something good','ok'],['One choice is clearly bad','bad'],['They are only about rules','rules']]]];
function coach(t){let m='Name the values, weigh the harms, and look for a choice that respects both.';
 if(t==='offtopic')m='Keeping the money is about being honest versus wanting it for yourself, not kindness or courage.';if(t==='none')m='The money belongs to someone. Honesty says hand it in.';
 if(t==='crowd')m='What others do is not a reason. Someone being hurt is.';if(t==='caught')m='Getting caught does not decide what is right.';
 if(t==='promise')m='A secret that hides harm is one to share. Safety comes first.';if(t==='gossip')m='Other kids cannot keep him safe. A trusted adult can.';
 if(t==='cheat')m='Letting him cheat is loyal but unfair to everyone else.';if(t==='drop')m='Fairness does not mean dropping a friend.';
 if(t==='cross'||t==='embar')m='Those feelings pass. Harm that cannot be undone weighs the most.';if(t==='bad'||t==='rules')m='Dilemmas are hard because both sides care about something good.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],s=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choices"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(s).concat(ops.slice(0,s)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>judge(t)});announce('Challenge: '+q);A.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+coach(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Next →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.72,tall:1.35,draw:scene,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
