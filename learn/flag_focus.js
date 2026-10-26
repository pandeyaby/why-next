/* Flagship – paying attention to one thing (ages 2–3): stack cups while a bird flies past, hear a story to its end,
   come back to a puzzle after a dog barks, clear away noisy things, and keep your eyes on one duck. */
(()=>{const mi=Math.min;
 const PAGES=[['🐱','Kit the cat lost her red ball.'],['🛏️','She looked under the bed. No ball!'],['📦','She looked in the box. No ball!'],['🧺','It was in her basket all the time!']];
 const WHERE=[['In the basket','ok'],['Under the bed','bed'],['In the box','box']];
 const WHEREWHY={bed:'Kit looked under the bed, but there was no ball. The end of the story told us.',box:'The box was empty too. Only the last page said where the ball was.'};
 const FISH=[['tail','#f97316'],['body','#eab308'],['head','#22c55e']];
 const ROOM=[['📺','TV on loud',1],['🎺','trumpet',1],['🧩','puzzle',0],['🚗','toy car',1],['📱','buzzing phone',1]];
 const SPOTS=[0,4,2,5,1],FLASH=[['🎈','balloon'],['⭐','star'],['🎁','present'],['🌟','sparkle'],['🪁','kite'],['🎈','balloon']];
VIS.reg('flagfocus',c=>{let A,ctl,quizBox,live;c.fig.classList.add('young');
 const st={cups:0,bird:0,away:0,pg:0,tv:0,ans:0,bad:null,pz:0,woof:0,stopped:0,box:[],duck:0,seen:0,drag:null,pt:null,cb:()=>{},tok:0,pic:null};
 const speak=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(live)live.textContent=t}};
 const part=()=>['cups','story','puzzle','room','duck','quiz'][A.step];
 const px=n=>A.narrow?n:n+3;
 function words(g,t,X,Y,n,col,wt){g.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,X,Y,A.W-18)}
 function box(g,r,col,thick,fill){g.fillStyle=A.alpha(col,fill||.16);A.paint.rrect(r.x,r.y,r.w,r.h,15);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const nope=t=>{A.sound.miss();speak(t);A.redraw()};
 const wide=y=>{const h=mi(64,A.H*.15);return{x:A.W*.1,y,w:A.W*.8,h}};
 const pair=i=>{const g=12,w=(A.W-3*g)/2,h=mi(64,A.H*.15);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const birdR=()=>({x:A.W-mi(130,A.W*.34)-8,y:8,w:mi(130,A.W*.34),h:mi(70,A.H*.17)});
 const cupR=i=>{const w=mi(62,A.W*.15),g=(A.W-5*w)/6;return{x:g+i*(w+g),y:A.H-w-14,w,h:w}};
 const grid=i=>{const g=10,w=(A.W-4*g)/3,h=mi(110,A.H*.3);return{x:g+(i%3)*(w+g),y:A.H*.2+Math.floor(i/3)*(h+g),w,h}};
 const roomR=i=>{const g=10,w=(A.W-4*g)/3,h=mi(96,A.H*.24);if(i===2)return{x:A.W/2-w/2,y:A.H*.36,w,h};const k=i<2?i:i-1;return{x:k%2?A.W-g-w:g,y:k<2?A.H*.08:A.H*.64,w,h}};
 const toyBin=()=>({x:A.W/2-A.W*.14,y:A.H*.64,w:A.W*.28,h:mi(96,A.H*.24)});
 function cup(g,X,Y,w,col){g.fillStyle=col;g.beginPath();g.moveTo(X-w/2,Y);g.lineTo(X+w/2,Y);g.lineTo(X+w*.36,Y+w*.7);g.lineTo(X-w*.36,Y+w*.7);g.closePath();g.fill();g.strokeStyle=A.alpha('#000',.25);g.lineWidth=2;g.stroke()}
 const CUPC=['#ef4444','#f97316','#eab308','#22c55e','#3b82f6'];
 function cupsV(g){const C=A.col,w=mi(62,A.W*.15);if(st.away){box(g,{x:12,y:A.H*.25,w:A.W-24,h:A.H*.3},C.or,1,.2);words(g,'🐦 You are watching the bird.',A.W/2,A.H*.35,15,C.tx);words(g,'The cups are waiting.',A.W/2,A.H*.45,15,C.mu);const r=wide(A.H*.62);box(g,r,C.gr,1);words(g,'Look back at my cups',A.W/2,r.y+r.h/2,16,C.tx);return}
  for(let k=0;k<st.cups;k++)cup(g,A.W/2,A.H*.62-k*w*.55,w*1.1,CUPC[k]);if(st.cups>=5)words(g,'A tall tower! You stayed with it.',A.W/2,A.H*.1,15,C.gr);
  for(let k=st.cups;k<5;k++){const r=cupR(k);cup(g,r.x+r.w/2,r.y+6,r.w*.9,CUPC[k])}
  if(st.bird&&st.cups<5){const r=birdR();box(g,r,C.cy,0,.12);words(g,'🐦 Look, a bird!',r.x+r.w/2,r.y+r.h/2,13,C.tx)}
  if(st.cups<5)words(g,`Cups in the tower: ${st.cups} of 5`,A.W/2,A.H*.72,13,C.mu,700)}
 function storyV(g){const C=A.col;if(st.ans)return words(g,'You heard it to the end and knew the answer!',A.W/2,A.H*.4,15,C.gr);
  if(st.tv===1){box(g,{x:12,y:A.H*.06,w:A.W-24,h:A.H*.3},C.or,1,.2);words(g,'📺 Beep beep! The TV came on.',A.W/2,A.H*.21,15,C.tx);[0,1].forEach(i=>{const r=pair(i);box(g,r,i?C.gr:C.mu,0);words(g,i?'Back to the story':'Watch the TV',r.x+r.w/2,r.y+r.h/2,14,C.tx)});return}
  if(st.pg>=4){words(g,'Where was the ball?',A.W/2,A.H*.12,17,C.tx);WHERE.forEach((o,j)=>{const r=wide(A.H*.26+j*(mi(64,A.H*.15)+10));box(g,r,st.bad===j?C.rd:C.vi,st.bad===j);words(g,o[0],A.W/2,r.y+r.h/2,16,C.tx)});return}
  const p=PAGES[st.pg];box(g,{x:A.W*.12,y:A.H*.05,w:A.W*.76,h:A.H*.55},C.vi,0,.08);words(g,p[0],A.W/2,A.H*.22,46,C.tx);words(g,p[1],A.W/2,A.H*.45,15,C.tx);
  words(g,`Page ${st.pg+1} of 4`,A.W/2,A.H*.56,12,C.mu,700);const r=wide(A.H-mi(64,A.H*.15)-14);box(g,r,C.cy,1);words(g,'Next page →',A.W/2,r.y+r.h/2,16,C.tx)}
 function shape(g,i,X,Y,s){g.fillStyle=FISH[i][1];g.beginPath();if(i===0){g.moveTo(X+s/2,Y);g.lineTo(X-s/2,Y-s*.45);g.lineTo(X-s/2,Y+s*.45);g.closePath();g.fill()}
  else if(i===1){g.fillRect(X-s/2,Y-s*.42,s,s*.84)}else{g.arc(X-s/2,Y,s*.42,-Math.PI/2,Math.PI/2);g.fill();g.fillStyle='#111';g.beginPath();g.arc(X-s*.3,Y-s*.1,4,0,7);g.fill()}}
 function fishV(g){const C=A.col,Y=A.H*.3,s=mi(A.W*.22,90);FISH.forEach((f,i)=>{const X=A.W/2+(i-1)*s;if(i<st.pz)shape(g,i,X,Y,s);
   else{g.setLineDash([6,5]);g.strokeStyle=C.mu;g.lineWidth=2;g.strokeRect(X-s/2,Y-s*.42,s,s*.84);g.setLineDash([])}});
  if(st.pz>=3)return words(g,'The fish is done! You came back and finished.',A.W/2,A.H*.6,15,C.gr);
  if(st.woof===1){words(g,'🐶 Woof! A dog barked. You looked away.',A.W/2,A.H*.56,14,C.or);[0,1].forEach(i=>{const r=pair(i);box(g,r,i?C.gr:C.mu,0);words(g,i?'Look back at the puzzle':'Stop the puzzle',r.x+r.w/2,r.y+r.h/2,13,C.tx)});return}
  words(g,st.stopped?'The puzzle is still here. Keep going!':'Put the next piece in.',A.W/2,A.H*.56,14,C.mu,700);const r=wide(A.H-mi(64,A.H*.15)-14),f=FISH[st.pz];box(g,r,f[1],1,.25);shape(g,st.pz,r.x+r.h*.75,r.y+r.h/2,r.h*.6);words(g,'Add the '+f[0],A.W/2+r.h*.3,r.y+r.h/2,16,C.tx)}
 function roomV(g){const C=A.col,b=toyBin();box(g,b,C.mu,st.drag!=null,.1);words(g,'🧺 toy box',b.x+b.w/2,b.y+b.h/2,13,C.tx);
  ROOM.forEach((o,i)=>{if(st.box.includes(i))return;let r=roomR(i);if(st.drag===i&&st.pt)r={...r,x:st.pt.x-r.w/2,y:st.pt.y-r.h/2};box(g,r,st.bad===i?C.rd:o[2]?C.or:C.gr,st.bad===i||!o[2],.14);words(g,o[0],r.x+r.w/2,r.y+r.h*.42,28,C.tx);words(g,o[1],r.x+r.w/2,r.y+r.h*.82,11,C.tx)});
  words(g,st.box.length>=4?'Just the puzzle now. Nice and calm.':`Put away: ${st.box.length} of 4`,A.W/2,A.H*.17,13,st.box.length>=4?C.gr:C.mu,700)}
 function duckV(g){const C=A.col;words(g,st.seen>=5?'You kept your eyes on the duck!':`Find the duck: ${st.seen} of 5`,A.W/2,A.H*.09,15,st.seen>=5?C.gr:C.tx);
  for(let i=0;i<6;i++){const r=grid(i),d=i===SPOTS[st.duck]&&st.seen<5;box(g,r,st.bad===i?C.rd:C.cy,d||st.bad===i,.1);words(g,d?'🦆':FLASH[(i+st.seen)%6][0],r.x+r.w/2,r.y+r.h/2,34,C.tx)}}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.45);g.fillRect(0,0,W,H);
  const f={cups:cupsV,story:storyV,puzzle:fishV,room:roomV,duck:duckV}[part()];if(f)f(g);else words(g,st.pic||'🎯',W/2,H/2,60,C.tx);A.fx.draw(g)}
 function stack(){if(st.cups>=5)return;if(st.away)return nope('You are still watching the bird. Look back at your cups first.');st.cups++;if(st.cups===2)st.bird=1;A.sound.pop();update(st.cups>=5?'Five cups, all stacked!':'')}
 function lookBird(){if(!st.bird||st.cups>=5||st.away)return;st.away=1;A.sound.miss();update('You looked at the bird. The tower stopped growing.')}
 function backCups(){if(!st.away)return;st.away=0;st.bird=0;A.sound.tick();update('You looked back at your cups.')}
 function turn(){if(st.ans||st.pg>=4)return;if(st.tv===1)return nope('The TV is beeping. Choose: back to the story?');st.pg++;if(st.pg===2&&!st.tv)st.tv=1;A.sound.tick();update(st.pg<4?PAGES[st.pg][1]:'The end.')}
 function tvPick(back){if(st.tv!==1)return;if(!back){A.sound.miss();return speak('The story stops while you watch the TV. You will miss the end. Come back to the book!')}st.tv=2;A.sound.pop();update('Back to the story. '+PAGES[st.pg][1])}
 function answer(j){if(st.ans||st.pg<4)return;if(WHERE[j][1]!=='ok'){st.bad=j;return nope(WHEREWHY[WHERE[j][1]])}st.bad=null;st.ans=1;A.win();update('Yes, in the basket!')}
 function piece(){if(st.pz>=3)return;if(st.woof===1)return nope('The dog barked. Pick: look back at the puzzle?');st.pz++;st.stopped=0;if(st.pz===1&&!st.woof)st.woof=1;A.sound.pop();update(st.pz>=3?'Last piece in!':'')}
 function woofPick(back){if(st.woof!==1)return;if(!back){st.stopped=1;A.sound.miss();return speak('The puzzle is not over. Looking away is OK. You can come back to it!')}st.woof=2;A.sound.tick();update('You came back to the puzzle.')}
 function tidy(i){if(st.box.includes(i)||st.box.length>=4)return;if(!ROOM[i][2]){st.bad=i;return nope('Keep the puzzle! It is the one thing you are playing with.')}st.bad=null;st.box.push(i);A.sound.pop();update(`The ${ROOM[i][1]} is put away.`)}
 function spot(i){if(st.seen>=5)return;if(i!==SPOTS[st.duck]){st.bad=i;return nope(`That is the ${FLASH[(i+st.seen)%6][1]}. Look for the duck.`)}st.bad=null;st.seen++;st.duck=mi(4,st.seen);A.sound.tick();update('Found the duck!')}
 function update(msg){const v=part();let t;
  if(v==='cups')t=st.away?'You are watching the bird. Look back at your cups.':st.cups>=5?'The tower has five cups.':`Tower: ${st.cups} of 5 cups.${st.bird?' A bird is flying by.':''}`;
  else if(v==='story')t=st.ans?'Story finished.':st.tv===1?'The TV came on. Watch it, or go back to the story?':st.pg>=4?'Where was the ball? In the basket, under the bed, or in the box?':`Page ${st.pg+1} of 4: ${PAGES[st.pg][1]}`;
  else if(v==='puzzle')t=st.pz>=3?'The fish puzzle is finished.':st.woof===1?'A dog barked. Stop, or look back at the puzzle?':`Fish puzzle: ${st.pz} of 3 pieces.`;
  else if(v==='room')t=st.box.length>=4?'Only the puzzle is left.':'Things out: '+ROOM.filter((o,i)=>!st.box.includes(i)).map(o=>o[1]).join(', ')+'.';
  else if(v==='duck')t=st.seen>=5?'Duck found five times.':'Find the duck. Boxes: '+[0,1,2,3,4,5].map(i=>i===SPOTS[st.duck]?'duck':FLASH[(i+st.seen)%6][1]).join(', ')+'.';else t='Challenge time.';
  speak((msg?msg+' ':'')+t);controls();st.cb()}
 function controls(){if(!A||!ctl)return;ctl.innerHTML='';const v=part();
  const btn=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},ctl,t);e.disabled=!!off;e.onclick=f};
  if(v==='cups'&&st.cups<5){btn('Stack a cup',stack,st.away);if(st.bird&&!st.away)btn('Look at the bird',lookBird);if(st.away)btn('Look back at my cups',backCups)}
  if(v==='story'&&!st.ans){if(st.tv===1){btn('Watch the TV',()=>tvPick(0));btn('Back to the story',()=>tvPick(1))}else if(st.pg<4)btn('Next page',turn);else WHERE.forEach((o,j)=>btn(o[0],()=>answer(j)))}
  if(v==='puzzle'&&st.pz<3){if(st.woof===1){btn('Stop the puzzle',()=>woofPick(0));btn('Look back at the puzzle',()=>woofPick(1))}else btn('Add the '+FISH[st.pz][0],piece)}
  if(v==='room'&&st.box.length<4)ROOM.forEach((o,i)=>{if(!st.box.includes(i))btn(o[0]+' '+o[1],()=>tidy(i),0,'Put away the '+o[1])});
  if(v==='duck'&&st.seen<5)for(let i=0;i<6;i++){const f=i===SPOTS[st.duck]?['🦆','duck']:FLASH[(i+st.seen)%6];btn(f[0]+' '+f[1],()=>spot(i),0,'Tap the '+f[1]+' in box '+(i+1))}A.redraw()}
 const when=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const k=st.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const fresh=()=>{st.tok++;st.cb=()=>{};st.pic=null;st.drag=null;st.pt=null;st.bad=null};
 const steps=[
  {h:'Stay with the cups',p:'Build a tall tower. Tap a cup, or drag it up. Something may try to pull your eyes away.',
   predict:{q:'A bird flies by while you stack. What helps you finish the tower?',opts:['Watch the bird','Look back at the cups'],ans:1},task:'Build a tower of five cups',
   show:()=>{steps[0].go();play([stack,stack,lookBird,backCups,stack,stack,stack],300)},go:()=>{fresh();st.cups=0;st.bird=0;st.away=0;update();st.cb=when(0,()=>st.cups>=5,()=>'The tower only grew while your eyes were on the cups.')}},
  {h:'Hear it to the end',p:'Listen to the story about Kit the cat. Turn the pages, then answer.',
   predict:{q:'Can you tell where the ball is if you stop at page 2?',opts:['Yes','No, the end tells us'],ans:1},task:'Hear the whole story and answer',
   show:()=>{steps[1].go();play([turn,turn,()=>tvPick(1),turn,turn,()=>answer(0)],350)},go:()=>{fresh();st.pg=0;st.tv=0;st.ans=0;update();st.cb=when(1,()=>st.ans,()=>'Only the last page said where the ball was.')}},
  {h:'Come back',p:'Make the fish puzzle. If something pulls you away, you can come back.',
   predict:{q:'You looked away from the puzzle. Is it over?',opts:['Yes, it is over','No, I can come back to it'],ans:1},task:'Finish the fish puzzle',
   show:()=>{steps[2].go();play([piece,()=>woofPick(1),piece,piece],350)},go:()=>{fresh();st.pz=0;st.woof=0;st.stopped=0;update();st.cb=when(2,()=>st.pz>=3,()=>'Looking away is OK. Coming back finished the fish.')}},
  {h:'Make it calm',p:'Too many things! Drag the noisy things into the toy box, or tap them. Keep the one thing you want.',
   predict:{q:'Where is it easier to do a puzzle?',opts:['With the TV on and lots of toys','With just the puzzle'],ans:1},task:'Put four things away',
   show:()=>{steps[3].go();play([0,1,3,4].map(i=>()=>tidy(i)),350)},go:()=>{fresh();st.box=[];update();st.cb=when(3,()=>st.box.length>=4,()=>'Fewer things means fewer pulls on your eyes.')}},
  {h:'Eyes on the duck',p:'Shiny things pop up. Keep looking for the duck and tap it.',task:'Find the duck five times',
   show:()=>{steps[4].go();play(SPOTS.map(i=>()=>spot(i)),350)},go:()=>{fresh();st.duck=0;st.seen=0;update();st.cb=when(4,()=>st.seen>=5,()=>'You kept looking for one thing, even with shiny things around.')}},
  {h:'Challenge',p:'',go:()=>{fresh();next()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.cb()});
 const QS=[['Story time. A toy beeps. What helps you hear the end?','📖',[['Look back at the book','ok'],['Play with the toy','toy'],['Shut the book','shut']]],
  ['You looked away from your puzzle. What now?','🧩',[['Come back to it','ok'],['It is over, so stop','over'],['Get a new toy','new']]],
  ['Where is it easier to stack cups?','🥤',[['In a quiet spot','ok'],['With the TV on loud','loud'],['While running about','run']]],
  ['Pip plays with the puzzle, the drum and the ball all at once. Does Pip finish?','🥁',[['No. One thing at a time','ok'],['Yes, all of them','all'],['Yes, it is faster','fast']]],
  ['You feel wiggly at story time. What can help?','🌬️',[['Take a big breath, then listen','ok'],['Run off','run'],['Talk over the story','talk']]],
  ['You got lost in the game. Who can help you come back?','🧑',[['A grown-up can help me','ok'],['Nobody can','alone'],['The TV','loud']]]];
 let qi=-1,streak=0;
 function next(){qi++;const[q,pic,ops]=QS[qi%QS.length],sh=qi%3;st.pic=pic;
  quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quizBox.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tag)});speak('Challenge: '+q);A.redraw()}
 function grade(tag){quizBox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quizBox.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'toy':m='The toy pulls you away, and you miss the end. Look back at the book.';break;
   case 'shut':m='Then you never hear the end. Stay a little longer.';break;
   case 'over':m='It is not over! Looking away is OK. Come back to it.';break;
   case 'new':m='A new toy leaves the puzzle unfinished. Come back to the puzzle.';break;
   case 'loud':m='Loud noise pulls your eyes and ears away. A quiet spot helps.';break;
   case 'run':m='Running about makes it hard to stay with one thing. Sit and try.';break;
   case 'all':m='Doing it all at once means nothing gets finished.';break;
   case 'fast':m='Jumping between things is slower. One at a time gets it done.';break;
   case 'talk':m='Talking over the story means you miss the words. Breathe, then listen.';break;
   default:m='Grown-ups can help you come back. Just ask.'}
  const good=tag==='ok';if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
 function press(p){const v=part();st.drag=null;st.pt=null;
  if(v==='cups'){if(st.away){if(inside(p,wide(A.H*.62)))backCups();return false}if(st.bird&&inside(p,birdR()))return lookBird(),false;if(st.cups<5&&inside(p,cupR(st.cups))){st.drag=st.cups;return true}if(p.y>A.H*.6)stack();return false}
  if(v==='story'){if(st.tv===1){[0,1].forEach(i=>{if(inside(p,pair(i)))tvPick(i)})}else if(st.pg<4){if(p.y>A.H*.6)turn()}else WHERE.forEach((o,j)=>{if(inside(p,wide(A.H*.26+j*(mi(64,A.H*.15)+10))))answer(j)});return false}
  if(v==='puzzle'){if(st.woof===1){[0,1].forEach(i=>{if(inside(p,pair(i)))woofPick(i)})}else if(p.y>A.H*.62)piece();return false}
  if(v==='room'){const i=ROOM.findIndex((o,i)=>!st.box.includes(i)&&inside(p,roomR(i)));if(i<0)return false;if(!ROOM[i][2]){tidy(i);return false}st.drag=i;return true}
  if(v==='duck'){for(let i=0;i<6;i++)if(inside(p,grid(i)))spot(i)}return false}
 function release(p){const v=part(),k=st.drag;st.drag=null;st.pt=null;if(k==null)return A.redraw();
  if(v==='cups'){if(p.y<A.H*.7)stack();else A.redraw()}else if(v==='room'){if(inside(p,toyBin())||inside(p,roomR(k)))tidy(k);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quizBox.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
  init:A=>{const E=c.el,wrap=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'});
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},wrap);quizBox=E('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{st.pt=p;A.redraw()},up:release});controls()}});
 A.start()})})();
