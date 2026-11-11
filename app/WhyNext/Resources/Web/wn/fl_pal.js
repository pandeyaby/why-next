/* Flagship – supporting a friend who is struggling (14–16): spot lasting, out-of-character changes in a friend's
   week, open a conversation with replies that listen rather than fix, put a supportive talk in a sensible order,
   decide which worries must go to a trusted adult even when asked to keep a secret, and look after yourself too. */
(()=>{const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const WEEK=[['Quit football, which he loved',1,'A big change from usual: he has dropped something he enjoyed.'],['Says “what’s the point?” a lot',1,'Hopeless talk that keeps coming back is a sign to take seriously.'],
  ['Grumpy for one evening after losing a match',0,'One bad day is normal. Look for changes that last two weeks or more.'],['Hardly eating lunch for weeks',1,'A lasting change in eating can be a sign.'],
  ['Got a new haircut',0,'Changing style is not a sign of struggling.'],['Snaps at friends, which is not like him',1,'Out-of-character irritability is a common sign, especially in teens.'],
  ['Quiet during a hard maths test',0,'Everyone is quiet in a test. It is not a change in Sam.'],['Up late and exhausted every day',1,'Sleep that changes and stays changed is a sign.']];
 const REP=[['That sounds really hard.',1,'Naming that it is hard shows you heard them.'],['What has been going on?',1,'An open question lets them tell it their own way.'],
  ['Cheer up, it could be worse.',0,'This tells them their feelings are wrong, so the door closes.'],['Take your time. I’m listening.',1,'Patience gives them room to say more.'],
  ['You just need more sleep.',0,'Jumping straight to a fix skips the listening. They feel brushed off.'],['Same! Let me tell you about my week…',0,'Turning it to you takes the space away from them.']];
 const ORD=[['Notice','“You’ve seemed quieter lately. How are you, really?”'],['Listen, say it back','“So it’s been piling up since your parents split?”'],
  ['Encourage help','“Could you talk to Ms Khan? I can come with you.”'],['Check in later','A few days on: “How did it go?”']];
 const ORDWHY=['Start by noticing and asking. Nothing else can happen until they talk.','Listen first. Suggesting help too early can feel like being passed on.',
  'Once they feel heard, gently suggest someone who can help.','Checking in comes last: it shows you still care after the talk.'];
 const SAFE=[['They have a crush on someone',0],['They are hurting themselves',1],['They failed a test and feel embarrassed',0],['They said they want to die',1],
  ['Someone at home is hurting them',1],['They are stressed about exams',0]];
 const SAFEWHY=['Private: this is theirs to share. Keep it, and keep supporting them.','Tell a trusted adult: their safety matters more than the secret.'];
 const SELF=[['Answer every message, even at 2 am',0,'Losing sleep wears you down, and then you can help less.'],['Share the worry with a trusted adult',1],
  ['Keep going to your own clubs',1],['Promise to fix it all yourself',0,'You are a friend, not a counsellor. Nobody can fix it alone.'],
  ['Talk to someone about how you feel too',1],['Drop other friends to focus on them',0,'Cutting yourself off leaves you with no support of your own.']];
VIS.reg('flagpal',c=>{let A,pad,chal,say;
 const S={seen:[],miss:null,door:0,used:[],ord:[],deal:[2,0,3,1],safe:0,lean:null,drag:null,bat:40,picks:[],gen:0,check:()=>{},em:null};
 const mode=()=>['spot','talk','ord','safe','self','quiz'][A.step];
 const fz=n=>A.narrow?n:n+2;
 function font(x,n,w){x.font=`${w||700} ${fz(n)}px system-ui,sans-serif`}
 function put(x,s,X,Y,n,k,w,al){font(x,n,w);x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)}
 function lines(x,s,maxw,n){font(x,n);const L=[];let row='';for(const v of s.split(' ')){const t=row?row+' '+v:v;if(row&&x.measureText(t).width>maxw){L.push(row);row=v}else row=t}L.push(row);return L}
 function para(x,s,R,n,k){const L=lines(x,s,R.w-16,n),g=fz(n)*1.25;L.forEach((l,i)=>put(x,l,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*g,n,k))}
 function card(x,R,k,on,t){x.fillStyle=A.mix(A.col.pn,k,t==null?.12:t);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.lineWidth=on?3.5:1.4;x.strokeStyle=k;x.stroke()}
 const hit=(p,R)=>!!R&&p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 const weekR=i=>{const cols=A.narrow?2:4,g=8,w=(A.W-g*(cols+1))/cols,h=A.H*(A.narrow?.19:.3);return{x:g+(i%cols)*(w+g),y:A.H*.13+Math.floor(i/cols)*(h+g),w,h}};
 const repR=i=>{const g=8,w=(A.W-3*g)/2,h=A.H*.12;return{x:g+(i%2)*(w+g),y:A.H*.52+Math.floor(i/2)*(h+g),w,h}};
 const dealR=j=>{const h=A.H*.1;return{x:12,y:A.H*.55+j*(h+6),w:A.W-24,h}};
 const slotR=j=>{const h=A.H*.095;return{x:12,y:A.H*.06+j*(h+5),w:A.W-24,h}};
 const sideR=s=>({x:s?A.W/2+4:8,y:A.H*.62,w:A.W/2-12,h:A.H*.34});
 const chipR=()=>({x:A.W*.1,y:A.H*.2,w:A.W*.8,h:A.H*.24});
 const selfR=i=>{const h=A.H*.1;return{x:12,y:A.H*.3+i*(h+6),w:A.W-24,h}};
 function spotD(x){const C=A.col,n=S.seen.length;put(x,`Sam’s last few weeks. Signs found: ${n} of 5`,A.W/2,A.H*.06,13,n>=5?C.gr:C.tx,800);
  WEEK.forEach(([s,ok],i)=>{const R=weekR(i),on=S.seen.includes(i),bad=S.miss===i;card(x,R,on?C.gr:bad?C.rd:C.cy,on||bad,on?.28:.1);para(x,(on?'✓ ':bad?'✗ ':'')+s,R,12,C.tx)})}
 function talkD(x){const C=A.col,cx=A.W/2,top=A.H*.06,dh=A.H*.3,dw=dh*.6,ang=S.door/100;
  x.fillStyle=A.alpha(C.mu,.18);x.fillRect(cx-dw/2,top,dw,dh);x.fillStyle=A.mix(C.pn,C.am,.55);x.beginPath();x.moveTo(cx-dw/2,top);x.lineTo(cx-dw/2+dw*(1-ang*.8),top+dh*.06*ang);
  x.lineTo(cx-dw/2+dw*(1-ang*.8),top+dh-dh*.06*ang);x.lineTo(cx-dw/2,top+dh);x.closePath();x.fill();x.strokeStyle=C.tx;x.lineWidth=2;x.strokeRect(cx-dw/2,top,dw,dh);
  put(x,ang>=1?'Wide open: they are talking':ang>0?'Opening…':'Closed',cx,top+dh+14,13,ang>=1?C.gr:C.mu,800);
  put(x,'Friend: “I’ve just been really low lately.”',A.W/2,A.H*.47,12,C.tx,700);
  REP.forEach(([s],i)=>{const R=repR(i),used=S.used.includes(i),bad=S.miss===i;card(x,R,used?C.gr:bad?C.rd:C.vi,used||bad,used?.28:.1);para(x,(used?'✓ ':bad?'✗ ':'')+s,R,11,C.tx)})}
 function ordD(x){const C=A.col;ORD.forEach((o,j)=>{const R=slotR(j),f=S.ord[j];card(x,R,f!=null?C.gr:C.mu,0,f!=null?.22:.05);
   para(x,f!=null?`${j+1}. ${ORD[f][0]}: ${ORD[f][1]}`:`${j+1}. ?`,R,11,f!=null?C.tx:C.mu)});
  S.deal.forEach((i,j)=>{if(S.ord.includes(i))return;const R=dealR(j),bad=S.miss===i;card(x,R,bad?C.rd:C.cy,bad,.12);para(x,ORD[i][0]+': '+ORD[i][1],R,11,C.tx)})}
 function safeD(x){const C=A.col;put(x,`Worry ${clamp(S.safe+1,1,6)} of 6`,A.W/2,A.H*.08,13,C.mu,800);
  ['Keep it private','Tell a trusted adult'].forEach((w,s)=>{const R=sideR(s);card(x,R,s?C.rd:C.gr,S.lean===s,.08);put(x,w,R.x+R.w/2,R.y+18,13,C.tx,900);put(x,s?'➡':'⬅',R.x+R.w/2,R.y+R.h*.62,26,C.mu,700)});
  if(S.safe>=SAFE.length)return put(x,'All six decided',A.W/2,A.H*.32,16,C.gr,800);
  const R0=chipR(),R=S.drag?{...R0,x:R0.x+S.drag.dx}:R0;card(x,R,S.miss!=null?C.rd:C.vi,1,.2);para(x,'“'+SAFE[S.safe][0]+'”',R,14,C.tx);
  put(x,'Drag left or right, or use the buttons',A.W/2,A.H*.5,11,C.mu,700)}
 function selfD(x){const C=A.col,w=A.W*.6,bx=(A.W-w)/2,by=A.H*.07,bh=A.H*.13,f=S.bat/100;
  x.lineWidth=3;x.strokeStyle=C.tx;A.paint.rrect(bx,by,w,bh,10);x.stroke();x.fillStyle=C.tx;x.fillRect(bx+w,by+bh*.3,8,bh*.4);
  x.fillStyle=f>.66?C.gr:f>.33?C.am:C.rd;A.paint.rrect(bx+4,by+4,Math.max(2,(w-8)*f),bh-8,7);x.fill();
  put(x,`Your energy: ${S.bat}%`,A.W/2,by+bh+16,13,C.tx,800);
  SELF.forEach(([s],i)=>{const R=selfR(i),on=S.picks.includes(i),bad=S.miss===i;card(x,R,on?C.gr:bad?C.rd:C.cy,on||bad,on?.26:.1);para(x,(on?'✓ ':bad?'✗ ':'')+s,R,12,C.tx)})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);x.fillRect(0,0,W,H);
  const f={spot:spotD,talk:talkD,ord:ordD,safe:safeD,self:selfD}[mode()];if(f)f(x);else put(x,S.em||'🤝',W/2,H/2,Math.min(W,H)*.22,'#000');A.fx.draw(x)}
 function flash(i,s){A.sound.miss();S.miss=i;setTimeout(()=>{S.miss=null;A.redraw()},750);note(s)}
 function spot(i){if(S.seen.includes(i))return;if(!WEEK[i][1])return flash(i,WEEK[i][2]);S.seen.push(i);A.sound.pop();note(WEEK[i][2])}
 function reply(i){if(S.used.includes(i))return;if(!REP[i][1]){S.door=clamp(S.door-25,0,100);return flash(i,REP[i][2])}S.used.push(i);A.sound.pop();
  A.tween(S,{door:clamp(S.door+34,0,100)},500,'out');note(REP[i][2])}
 function take(i){if(S.ord.includes(i))return;const j=S.ord.length;if(i!==j)return flash(i,'Not yet. '+ORDWHY[i]);S.ord.push(i);A.sound.pop();note(ORDWHY[i])}
 function decide(s){if(S.safe>=SAFE.length)return;S.drag=null;S.lean=null;const want=SAFE[S.safe][1];
  if(s!==want){A.sound.miss();S.miss=1;setTimeout(()=>{S.miss=null;A.redraw()},700);return note((want?'Not one to keep. ':'This one is theirs to keep. ')+SAFEWHY[want])}
  S.safe++;A.sound.pop();note(SAFEWHY[s])}
 function care(i){if(S.picks.includes(i))return;if(!SELF[i][1]){S.bat=clamp(S.bat-15,5,100);return flash(i,SELF[i][2])}S.picks.push(i);S.bat=clamp(S.bat+20,0,100);A.sound.pop();
  note('That protects you: '+SELF[i][0].toLowerCase()+'.')}
 function note(m){const k=mode();let s;
  if(k==='spot')s='Signs found: '+(S.seen.map(i=>WEEK[i][0]).join('; ')||'none')+'.';
  else if(k==='talk')s=`Door ${Math.round(S.door)}% open. Helpful replies used: ${S.used.length} of 3.`;
  else if(k==='ord')s='Talk order so far: '+(S.ord.map(i=>ORD[i][0]).join(', then ')||'nothing placed')+'.';
  else if(k==='safe')s=S.safe<6?`Worry: ${SAFE[S.safe][0]}. ${S.safe} of 6 decided.`:'All six worries decided.';
  else if(k==='self')s=`Energy ${S.bat}%. Picked: `+(S.picks.map(i=>SELF[i][0]).join('; ')||'nothing')+'.';else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(say)say.textContent=s;controls();S.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode();
  const b=(s,f,lab,off)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,s);e.disabled=!!off;e.onclick=f};
  if(k==='spot')WEEK.forEach(([s],i)=>b(s,()=>spot(i),'Mark as a sign: '+s,S.seen.includes(i)));
  if(k==='talk')REP.forEach(([s],i)=>b(s,()=>reply(i),'Reply: '+s,S.used.includes(i)||S.door>=100));
  if(k==='ord')S.deal.forEach(i=>b(ORD[i][0],()=>take(i),'Next in the talk: '+ORD[i][0],S.ord.includes(i)));
  if(k==='safe'&&S.safe<6){b('⬅ Keep it private',()=>decide(0),'Keep it private');b('Tell a trusted adult ➡',()=>decide(1),'Tell a trusted adult')}
  if(k==='self')SELF.forEach(([s],i)=>b(s,()=>care(i),'Do this: '+s,S.picks.includes(i)));A.redraw()}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},A.reduced()?j*25:j*ms))};
 const reset=()=>{S.gen++;S.check=()=>{};S.em=null;S.miss=null;S.drag=null;S.lean=null};
 const steps=[
  {h:'Spot the change',p:'Everyone has bad days. A friend may be struggling when there are changes that last and are not like them. Tap the signs in Sam’s weeks.',
   predict:{q:'Sam was grumpy one evening after losing a match. Is that a sign he is struggling?',opts:['Yes: grumpy is a warning sign','No: one bad day is normal'],ans:1},task:'Find all five signs',
   show:()=>{steps[0].go();play([0,1,3,5,7].map(i=>()=>spot(i)),420)},go:()=>{reset();S.seen=[];note();S.check=when(0,()=>S.seen.length>=5,()=>'Signs are changes that last, like dropping things he loved, not eating, not sleeping and hopeless talk.')}},
  {h:'Open the door',p:'Your friend says they have been low. Pick replies that help them keep talking. Wrong ones shut the door a little.',
   predict:{q:'What helps most first?',opts:['Give advice to fix it','Listen and ask what is up'],ans:1},task:'Open the door with three helpful replies',
   show:()=>{steps[1].go();play([1,0,3].map(i=>()=>reply(i)),600)},go:()=>{reset();S.door=0;S.used=[];note();S.check=when(1,()=>S.used.length>=3,()=>'Listening, open questions and patience open people up. Fixes, “cheer up” and your own stories close them down.')}},
  {h:'Put the talk in order',p:'A supportive talk has a shape. Tap the four parts in the order they should happen.',task:'Build the talk in order',
   show:()=>{steps[2].go();play([0,1,2,3].map(i=>()=>take(i)),500)},go:()=>{reset();S.ord=[];note();S.check=when(2,()=>S.ord.length>=4,()=>'Notice, listen, encourage help, then check in later. You do not need the perfect words, just to show you care.')}},
  {h:'Secrets and safety',p:'Most things a friend tells you are theirs to keep private. But if someone is not safe, a trusted adult must know, even if you promised.',
   predict:{q:'A friend says they are hurting themselves and asks you to promise not to tell. Should you promise?',opts:['Yes: keep their trust','No: say you care too much to keep that secret'],ans:1},task:'Decide all six worries',
   show:()=>{steps[3].go();play(SAFE.map(w=>()=>decide(w[1])),450)},go:()=>{reset();S.safe=0;note();S.check=when(3,()=>S.safe>=6,()=>'Hurting themselves, wanting to die, or being hurt by someone: tell a trusted adult. If they are in danger right now, call 999.')}},
  {h:'Look after you too',p:'Supporting someone can wear you out. Pick the things that keep your own energy up so you can keep being there.',
   predict:{q:'To be a good friend, should you be there for them at any hour, day or night?',opts:['Yes, always','No: you need rest and support too'],ans:1},task:'Pick the three things that protect you',
   show:()=>{steps[4].go();play([1,2,4].map(i=>()=>care(i)),500)},go:()=>{reset();S.bat=40;S.picks=[];note();S.check=when(4,()=>S.picks.length>=3,()=>'You are a friend, not a counsellor. Share the load with an adult, keep your own life going and talk about how you feel.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
 const QS=[['Your friend has seemed flat and has skipped their club for three weeks. What is the best first step?','👀',[['Say you have noticed and ask how they are, in private','ok'],['Wait: it will pass by itself','wait'],['Tell the whole group so everyone helps','group']]],
  ['A friend says, “I feel like there is no point any more.” What should you do?','💬',[['Ask gently what they mean, listen, and tell a trusted adult','ok'],['Change the subject so they cheer up','subject'],['Laugh it off: they are probably joking','joke']]],
  ['You are worried about a friend. Who is a good trusted adult to tell?','🧑‍🏫',[['A teacher, school counsellor or parent you trust','ok'],['Nobody: it would be a betrayal','nobody'],['A post on social media to ask for advice','post']]],
  ['Your friend messages you every night at 1 am and you are exhausted. What is fair?','🔋',[['Say you care, and agree to talk after school; tell an adult too','ok'],['Keep replying: a good friend never sleeps','never'],['Block them without saying anything','block']]],
  ['Does asking a friend directly, “Are you thinking about suicide?”, put the idea in their head?','❓',[['No: research shows asking does not raise the risk','ok'],['Yes: never mention it','mention'],['Only if you use the word suicide','word']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,em,ops]=QS[qi%QS.length],r=qi%3;S.em=em;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});c.say('Challenge: '+q);A.redraw()}
 function mark(t){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';let m='Right.';
  if(t==='wait')m='Three weeks of change is a sign. Waiting can leave them alone with it. Ask, in private.';
  if(t==='group')m='Telling everyone can embarrass them. Ask them yourself, one to one.';
  if(t==='subject')m='Changing the subject tells them you cannot hear it. Listen, and get an adult involved.';
  if(t==='joke')m='Never laugh off hopeless talk. Take it seriously and tell a trusted adult.';
  if(t==='nobody')m='Getting help is not a betrayal when someone may not be safe. It is caring.';
  if(t==='post')m='Posting shares their private life. Talk to a trusted adult you know instead.';
  if(t==='never')m='If you burn out you cannot help. Setting a kind limit is fair, and an adult can help carry it.';
  if(t==='block')m='Cutting them off with no word can hurt. Say what you can do, and bring in an adult.';
  if(t==='mention')m='Asking directly does not make it more likely. It can bring relief and open the way to help.';
  if(t==='word')m='Using the clear word is fine and helps. Research finds asking does not raise the risk.';
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=mode();
  if(k==='spot'){const i=WEEK.findIndex((w,i)=>hit(p,weekR(i)));if(i>=0)spot(i);return false}
  if(k==='talk'){const i=REP.findIndex((w,i)=>hit(p,repR(i)));if(i>=0&&S.door<100)reply(i);return false}
  if(k==='ord'){const j=S.deal.findIndex((i,j)=>!S.ord.includes(i)&&hit(p,dealR(j)));if(j>=0)take(S.deal[j]);return false}
  if(k==='safe'&&S.safe<6){if(hit(p,chipR())){S.drag={x0:p.x,dx:0};return true}if(hit(p,sideR(0)))decide(0);else if(hit(p,sideR(1)))decide(1);return false}
  if(k==='self'){const i=SELF.findIndex((w,i)=>hit(p,selfR(i)));if(i>=0)care(i);return false}return false}
 function move(p){if(!S.drag)return;S.drag.dx=p.x-S.drag.x0;S.lean=S.drag.dx>30?1:S.drag.dx<-30?0:null;A.redraw()}
 function up(){const d=S.drag;if(!d)return;S.drag=null;if(Math.abs(d.dx)>A.W*.18)return decide(d.dx>0?1:0);S.lean=null;A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;say.hidden=q;pad.hidden=q;controls()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);say=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});controls()}});
 A.start()})})();
