/* Flagship – following two-step instructions (ages 3–4, with a grown-up): Gran asks for one thing, then two things
   in order ("first … then …"), then "get it and bring it", then the same from memory (asking again is allowed and
   praised), and finally the child says the steps back by putting picture cards in order. Big tap targets throughout. */
(()=>{
 const THINGS=[['shoes','👟'],['door','🚪'],['cup','🥤'],['sink','🚰'],['coat','🧥'],['ball','⚽'],['box','📦'],['book','📖']];
 const pic=name=>(THINGS.find(t=>t[0]===name)||['','❔'])[1];
 const ONE=[['Touch the ball.',['ball']],['Touch the cup.',['cup']],['Touch the book.',['book']]];
 const TWO=[['First touch the cup, then the door.',['cup','door']],['First touch the book, then the shoes.',['book','shoes']],['First touch the ball, then the coat.',['ball','coat']]];
 const BRING=[['Get your shoes and bring them to the door.',['shoes','door']],['Put your cup in the sink.',['cup','sink']],['Put the ball in the toy box.',['ball','box']]];
 const MEMO=[['First touch the coat, then the book.',['coat','book']],['First touch the sink, then the ball.',['sink','ball']],['First touch the door, then the cup.',['door','cup']]];
 // Say-it-back rounds: the instruction, then picture cards (two right, one Gran did not say).
 const BACK=[['Wash your hands, then sit at the table.',[['🧼','wash hands'],['🪑','sit at the table'],['🛁','have a bath']]],
  ['Put on your coat, then find your hat.',[['🧥','put on coat'],['👒','find hat'],['🧦','take off socks']]],
  ['Brush your teeth, then get into bed.',[['🪥','brush teeth'],['🛏️','get into bed'],['🍪','eat a biscuit']]]];
VIS.reg('flagtwo',c=>{let A,pad,quiz,reader;c.fig.classList.add('young');
 const st={round:0,did:[],held:null,at:null,dragging:false,bad:null,hidden:false,asked:0,back:[],face:'🙂',tok:0,onChange:()=>{}};
 const mode=()=>['one','two','bring','memo','back','quiz'][A.step];
 const list=()=>({one:ONE,two:TWO,bring:BRING,memo:MEMO,back:BACK}[mode()]||[]);
 const current=()=>list()[st.round];

 function speak(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}
 function nope(t){A.sound.miss();st.face='🤔';speak(t);A.redraw()}

 // ---------- layout ----------
 const big=n=>A.narrow?n:Math.round(n*1.2);
 function write(g,t,x,y,n,col,w){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-20)}
 function glyph(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function tile(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function thingR(i){const cols=4,gap=10,w=(A.W-gap*(cols+1))/cols,h=Math.min(96,A.H*.22);return{x:gap+(i%cols)*(w+gap),y:A.H*.46+Math.floor(i/cols)*(h+gap),w,h}}
 const bubbleR=()=>({x:A.W*.2,y:A.H*.04,w:A.W*.76,h:A.H*.3});
 function cardR(i){const gap=12,w=(A.W-gap*4)/3;return{x:gap+i*(w+gap),y:A.H*.62,w,h:Math.min(120,A.H*.32)}}
 function slotR(i){const w=Math.min(170,A.W*.4);return{x:A.W/2+(i?8:-8-w),y:A.H*.36,w,h:Math.min(90,A.H*.22)}}

 // ---------- drawing ----------
 function gran(g,line){const C=A.col,b=bubbleR();glyph(g,'👵',A.W*.1,A.H*.15,Math.min(60,A.H*.15));glyph(g,st.face,A.W*.1,A.H*.32,26);
  tile(g,b,C.cy,false,.12);wrap(g,line,b.x+b.w/2,b.y+b.h/2,b.w-18,15)}
 // Break the speech-bubble words into lines that fit, centred on y.
 function wrap(g,t,x,y,width,n){g.font=`700 ${big(n)}px system-ui,sans-serif`;const lines=[];let cur='';
  t.split(' ').forEach(w=>{const next=cur?cur+' '+w:w;if(g.measureText(next).width>width&&cur){lines.push(cur);cur=w}else cur=next});lines.push(cur);
  const lh=big(n)*1.25;lines.forEach((l,i)=>write(g,l,x,y+(i-(lines.length-1)/2)*lh,n,A.col.tx,700))}
 function room(g){const C=A.col,now=current(),need=now?now[1]:[];
  THINGS.forEach(([name,e],i)=>{let r=thingR(i);const done=st.did.includes(name),lifted=st.held===name;
   if(lifted&&st.dragging&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};
   tile(g,r,st.bad===name?C.rd:done?C.gr:C.or,st.bad===name||done||lifted,done?.3:.14);glyph(g,e,r.x+r.w/2,r.y+r.h*.42,Math.min(38,r.h*.45));write(g,name,r.x+r.w/2,r.y+r.h*.84,12,C.tx,700);
   if(done)write(g,String(st.did.indexOf(name)+1),r.x+16,r.y+16,12,C.gr)});
  if(need.length>1)write(g,`Done: ${st.did.length} of ${need.length}`,A.W/2,A.H*.4,13,C.mu,700)}
 function drawSteps(g){const now=current();if(!now)return write(g,'All done! You held it all in your head.',A.W/2,A.H*.4,15,A.col.gr);
  const line=mode()==='memo'&&st.hidden?'💭 … Can you remember?':'"'+now[0]+'"';gran(g,line);room(g)}
 function drawBack(g){const C=A.col,now=current();if(!now)return write(g,'You said all three back, in order!',A.W/2,A.H*.4,15,C.gr);
  gran(g,'"'+now[0]+'"');['First','Then'].forEach((lab,i)=>{const r=slotR(i),k=st.back[i];tile(g,r,C.vi,false,k!=null?.25:.05);
   if(k!=null){glyph(g,now[1][k][0],r.x+r.w*.25,r.y+r.h/2,34);write(g,now[1][k][1],r.x+r.w*.64,r.y+r.h/2,10,C.tx,700)}else write(g,lab,r.x+r.w/2,r.y+r.h/2,14,C.mu)});
  now[1].forEach(([e,lab],i)=>{if(st.back.includes(i))return;const r=cardR(i);tile(g,r,st.bad===i?C.rd:C.pk,st.bad===i,.14);glyph(g,e,r.x+r.w/2,r.y+r.h*.4,Math.min(40,r.h*.4));write(g,lab,r.x+r.w/2,r.y+r.h*.82,11,C.tx,700)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.5);g.fillRect(0,0,W,H);
  const v=mode();if(v==='back')drawBack(g);else if(v!=='quiz')drawSteps(g);else glyph(g,'👵',W/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 function nextRound(msg){st.round++;st.did=[];st.held=null;st.bad=null;st.back=[];st.face='😊';A.sound.pop();if(mode()==='memo')hideSoon();report(msg)}
 // A tap on a thing: check it is the next thing Gran asked for.
 function touch(name){const now=current();if(!now)return;const need=now[1],want=need[st.did.length];
  if(name===want){st.did.push(name);st.bad=null;A.sound.tick();if(st.did.length===need.length)return nextRound(need.length>1?`Yes! First the ${need[0]}, then the ${need[1]}.`:`Yes, the ${name}!`);return report(`Good, the ${name}. What comes next?`)}
  st.bad=name;
  if(need.includes(name))return nope(`Gran said the ${need[0]} first. Start with the ${need[0]}, then the ${need[1]}.`);
  nope(need.length>1&&st.did.length?`You did the first part! Now the second part: the ${want}.`:`That is the ${name}. Gran asked for the ${want}. Listen again.`)}
 // Get-and-bring: first pick up the right thing, then put it in the right place.
 const them=n=>n==='shoes'?'them':'it';
 function pick(name){const now=current();if(!now)return false;const[thing]=now[1];
  if(name!==thing){st.bad=name;nope(`Gran said get the ${thing}, not the ${name}.`);return false}st.held=name;st.bad=null;A.sound.tick();report(`You got the ${name}. Now where ${name==='shoes'?'do they':'does it'} go?`);return true}
 function drop(name){const now=current();if(!now||!st.held)return;const[thing,place]=now[1];
  if(name===place){st.did=[thing,place];return nextRound(`You got the ${thing} and took ${them(thing)} to the ${place}. Two parts done!`)}
  if(name===thing){return report(`You are holding ${them(thing)}. Now take ${them(thing)} where Gran said.`)}st.bad=name;nope(`You got the ${thing}. That was part one! Part two: take ${them(thing)} to the ${place}.`)}
 function tapThing(name){if(mode()==='bring'){if(st.held)drop(name);else pick(name)}else touch(name)}
 let hideTimer=0;
 function hideSoon(){st.hidden=false;clearTimeout(hideTimer);const k=st.tok;hideTimer=setTimeout(()=>{if(k===st.tok&&mode()==='memo'){st.hidden=true;report('')}},A.reduced()?30:2400)}
 function askAgain(){st.asked++;st.face='😊';A.sound.step();speak(`Good asking! Gran says it again: ${current()?current()[0]:''}`);hideSoon();A.redraw();buttons()}
 // Say-it-back: tap the picture cards in the order Gran said.
 function chooseCard(i){const now=current();if(!now||st.back.includes(i))return;const want=st.back.length;
  if(i===want){st.back.push(i);st.bad=null;A.sound.tick();if(st.back.length===2)return nextRound(`"${now[1][0][1]}, then ${now[1][1][1]}." You said it back!`);return report(`First: ${now[1][0][1]}. What comes then?`)}
  st.bad=i;if(i===2)return nope(`Gran did not say ${now[1][2][1]}. Listen again: ${now[0]}`);nope(`That part comes second. What did Gran say first? ${now[0]}`)}

 function report(msg){const v=mode(),now=current();let t='';
  if(v==='back')t=now?`Gran says: ${now[0]} Put the cards in order.`:'All said back.';
  else if(v!=='quiz')t=!now?'All done.':v==='memo'&&st.hidden?'Gran has said it. Can you remember both parts?':`Gran says: ${now[0]}`+(st.held?` You are holding the ${st.held}.`:'');else t='Challenge time.';
  speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode(),now=current();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f};
  if(now&&v!=='back'&&v!=='quiz')THINGS.forEach(([name,e])=>b(e+' '+name,()=>tapThing(name),(v==='bring'?(st.held?'Take it to the ':'Get the '):'Touch the ')+name));
  if(now&&v==='memo')b('🔁 Say it again, please',askAgain);
  if(now&&v==='back')now[1].forEach(([e,lab],i)=>{if(!st.back.includes(i))b(e+' '+lab,()=>chooseCard(i))});A.redraw()}

 // ---------- canvas input: tap a thing, or drag it to a place ----------
 function down(p){const v=mode();st.at=p;st.dragging=false;
  if(v==='back'){const i=[0,1,2].find(i=>inside(p,cardR(i)));if(i!=null)chooseCard(i);return false}
  if(v==='quiz'||!current())return false;if(v==='memo'&&inside(p,bubbleR())){askAgain();return false}
  const i=THINGS.findIndex((t,i)=>inside(p,thingR(i)));if(i<0)return false;const name=THINGS[i][0];
  if(v==='bring'&&!st.held){if(pick(name)){st.dragging=true;return true}return false}tapThing(name);return false}
 function up(p){if(!st.dragging)return;st.dragging=false;const i=THINGS.findIndex((t,i)=>inside(p,thingR(i)));st.at=null;
  if(i>=0&&THINGS[i][0]!==st.held)drop(THINGS[i][0]);else A.redraw()}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const fresh=()=>{st.tok++;clearTimeout(hideTimer);st.onChange=()=>{};st.round=0;st.did=[];st.held=null;st.bad=null;st.hidden=false;st.back=[];st.face='🙂'};
 const taps=rounds=>rounds.flatMap(r=>r[1].map(n=>()=>tapThing(n)));
 const steps=[
  {h:'One thing',p:'Gran asks for one thing. Listen, then tap it.',task:'Do what Gran asks three times',
   show:()=>{steps[0].go();later(taps(ONE),400)},go:()=>{fresh();report();st.onChange=whenDone(0,()=>st.round>=ONE.length,'You listened and did it.')}},
  {h:'First, then',p:'Now Gran asks for two things. Do the first thing first, then the second thing.',
   predict:{q:'Gran says, "First clap, then jump." What do you do first?',opts:['Jump','Clap'],ans:1},task:'Do three first-then jobs',
   show:()=>{steps[1].go();later(taps(TWO),400)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>st.round>=TWO.length,'First means do it now. Then means do it next.')}},
  {h:'Get it, bring it',p:'Get the thing Gran says, then take it to the right place. Drag it there, or tap it and then tap the place.',
   predict:{q:'Gran says, "Put your cup in the sink." How many parts?',opts:['One part','Two parts: get the cup, put it in the sink'],ans:1},task:'Do three get-and-bring jobs',
   show:()=>{steps[2].go();later(taps(BRING),450)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>st.round>=BRING.length,'Get it is part one. Bring it is part two.')}},
  {h:'Keep it in your head',p:'Gran says it, then the words hide. Remember both parts. Forgot? Tap "Say it again, please". Asking is good!',
   predict:{q:'You forget the second part. What is best?',opts:['Guess','Ask Gran to say it again'],ans:1},task:'Do three jobs from memory',
   show:()=>{steps[3].go();later(taps(MEMO),450)},go:()=>{fresh();hideSoon();report();st.onChange=whenDone(3,()=>st.round>=MEMO.length,'You kept both parts in your head.'+(st.asked?' And you asked when you needed to.':''))}},
  {h:'Say it back',p:'Saying the steps back helps you remember. Put the pictures in order: first, then.',task:'Say three jobs back in order',
   show:()=>{steps[4].go();later(BACK.flatMap(()=>[()=>chooseCard(0),()=>chooseCard(1)]),400)},go:()=>{fresh();report();st.onChange=whenDone(4,()=>st.round>=BACK.length,'Say it back: first this, then that.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge ----------
 const QS=[['Gran says, "Put your cup in the sink, then get your coat." What do you do first?','🥤',[['Put my cup in the sink','ok'],['Get my coat','swap'],['Get my coat, then play','last']]],
  ['Dad says, "Wash your hands, then sit at the table." Mia sits down. What did she forget?','🧼',[['To wash her hands','ok'],['Nothing, she is done','skip'],['To have a bath','guess']]],
  ['Gran says two things. You only remember one. What do you do?','🤔',[['Ask, "Can you say it again?"','ok'],['Make up the other part','guess'],['Do nothing','stop']]],
  ['Mum says, "Get your shoes and bring them to the door." Where do the shoes go?','👟',[['To the door','ok'],['Under the bed','guess'],['Nowhere, I just hold them','skip']]],
  ['Gran says, "First clap, then touch your nose." Which is right?','👏',[['👏 then 👃','ok'],['👃 then 👏','swap'],['👃 only','last']]],
  ['Teacher says, "Put the book away, then come to the mat." Tom goes to the mat first. Is that right?','📖',[['No, the book goes away first','ok'],['Yes, any order is fine','swap'],['Yes, he can leave the book','skip']]]];
 function slip(tag){let m='Try again.';
  if(tag==='swap')m='Right jobs, wrong order. Do the first part first.';
  if(tag==='last')m='That is only the last part. Hold both parts in your head.';
  if(tag==='skip')m='One part got missed. There were two jobs.';
  if(tag==='guess')m='That was not said. If you forget, ask, "Can you say it again?"';
  if(tag==='stop')m='It is OK to forget. Ask, "Can you say it again, please?"';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;st.face=e;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Things in the room'},w);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
