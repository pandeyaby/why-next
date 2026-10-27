/* Flagship – playing alongside and together (ages 2–3, with a grown-up): copy what Kit does, take turns to build one
   tower, pass Kit the toy she asks for, ask "Can I play?" and roll a ball back and forth, then sort scenes into playing
   next to each other or playing together. Big tap targets, very few words, everything also on buttons. */
(()=>{const mn=Math.min;
 const ACT=[['👏','clap'],['🦘','jump'],['👋','wave']],COPY=[0,1,2];
 const TOYS=[['🟥','red brick'],['⚽','ball'],['🚗','car'],['🧸','teddy']],ASK=[1,0,2];
 const WAYS=[['👀','Just watch','watch'],['✋','Grab the ball','grab'],['🗣️','Ask, "Can I play?"','ask']];
 const SC=[['🖍️','Mia and Kit each draw their own picture.',0],['🧱','Mia and Kit build one tower.',1],['🧩','Mia and Kit each do their own puzzle.',0],['🏃','Mia and Kit play chase.',1],['⚽','Mia rolls the ball to Kit.',1]];
 const BIN=['🧍 🧍 Next to','🤝 Together'];
VIS.reg('flagplay',c=>{let A,keys,quiz,aloud;c.fig.classList.add('young');
 const st={k:0,bad:null,tw:[],gv:0,held:null,way:0,rolls:0,ball:0,busy:0,s:0,cb:()=>{},tok:0,face:null,lift:null,pos:null};
 const voice=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(aloud)aloud.textContent=t}};
 const part=()=>['copy','tower','pass','join','sort','quiz'][A.step];
 const big=n=>A.narrow?n:n+3;
 function say(g,t,x,y,n,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function emo(g,e,x,y,n){g.fillStyle='#000';g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
 function box(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,20);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const inR=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const oops=t=>{A.sound.miss();voice(t);A.redraw()};
 const cols=(i,n,y,h)=>{const g=10,w=(A.W-(n+1)*g)/n;return{x:g+i*(w+g),y,w,h}};
 const opt=i=>{const h=mn(60,A.H*.14);return{x:A.W*.08,y:A.H*.42+i*(h+10),w:A.W*.84,h}};
 const pile=i=>cols(i,2,A.H*.62,mn(120,A.H*.3));
 const towR=()=>({x:A.W*.35,y:A.H*.04,w:A.W*.3,h:A.H*.56});
 const kitR=()=>({x:A.W*.42,y:A.H*.04,w:A.W*.54,h:A.H*.36});
 const toy=i=>cols(i,4,A.H*.66,mn(100,A.H*.26));
 const bin=i=>cols(i,2,A.H*.66,mn(110,A.H*.28));
 function kid(g,x,y,n,who){emo(g,who?'👧':'🧒',x,y,n);say(g,who?'Kit':'You',x,y+n*.75,11,A.col.tx)}
 function copyV(g){const C=A.col;if(st.k>=3)return say(g,'You copied Kit three times. Now you are playing together!',A.W/2,A.H*.4,14,C.gr);const a=ACT[COPY[st.k]];
  kid(g,A.W*.18,A.H*.15,mn(64,A.H*.18),1);box(g,{x:A.W*.34,y:A.H*.05,w:A.W*.6,h:A.H*.24},C.cy,0,.14);emo(g,a[0],A.W*.5,A.H*.17,mn(48,A.H*.14));say(g,`Kit can ${a[1]}!`,A.W*.74,A.H*.17,15,C.tx);
  ACT.forEach((o,i)=>{const r=opt(i);box(g,r,st.bad===i?C.rd:C.vi,st.bad===i);emo(g,o[0],r.x+34,r.y+r.h/2,30);say(g,'I '+o[1]+' too',r.x+r.w/2+14,r.y+r.h/2,16,C.tx)})}
 function towerV(g){const C=A.col,t=towR(),bh=mn(34,t.h/7),me=st.tw.length%2===0;
  st.tw.forEach((w,j)=>{g.fillStyle=w?'#a78bfa':'#fb923c';A.paint.rrect(t.x+8,t.y+t.h-(j+1)*bh,t.w-16,bh-3,6);g.fill()});
  g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=3;g.beginPath();g.moveTo(t.x,t.y+t.h);g.lineTo(t.x+t.w,t.y+t.h);g.stroke();
  if(st.tw.length>=6)say(g,'One tall tower, built together!',A.W/2,A.H*.02+12,14,C.gr);
  [0,1].forEach(i=>{const r=pile(i),turn=st.tw.length<6&&(i===0)===me;box(g,r,i?'#a78bfa':'#fb923c',turn,.18);kid(g,r.x+r.w*.3,r.y+r.h*.42,mn(44,r.h*.4),i);emo(g,'🧱',r.x+r.w*.72,r.y+r.h*.42,30);
   say(g,turn?(i?"Kit's turn":'Your turn'):'wait',r.x+r.w/2,r.y+r.h*.86,12,turn?C.tx:C.mu)})}
 function passV(g){const C=A.col,k=kitR();box(g,k,C.cy,inR(st.pos||{},k),.12);kid(g,k.x+k.w*.25,k.y+k.h*.45,mn(56,k.h*.4),1);
  if(st.gv<3){const t=TOYS[ASK[st.gv]];say(g,`"Can I have`,k.x+k.w*.68,k.y+k.h*.3,13,C.tx);emo(g,t[0],k.x+k.w*.68,k.y+k.h*.55,34);say(g,`the ${t[1]}?"`,k.x+k.w*.68,k.y+k.h*.8,13,C.tx)}
  else say(g,'"Thank you!"',k.x+k.w*.68,k.y+k.h*.5,13,C.gr);if(st.held!=null)emo(g,TOYS[st.held][0],k.x+k.w*.25,k.y+k.h*.9,26);
  kid(g,A.W*.2,A.H*.5,mn(46,A.H*.12),0);TOYS.forEach((t,i)=>{let r=toy(i);if(st.lift===i&&st.pos)r={...r,x:st.pos.x-r.w/2,y:st.pos.y-r.h/2};box(g,r,st.bad===i?C.rd:C.or,st.bad===i,.14);emo(g,t[0],r.x+r.w/2,r.y+r.h*.4,30);say(g,t[1],r.x+r.w/2,r.y+r.h*.82,10,C.tx)})}
 function joinV(g){const C=A.col;const L={x:A.W*.18,y:A.H*.2},R={x:A.W*.82,y:A.H*.2};kid(g,L.x,L.y,mn(58,A.H*.16),0);kid(g,R.x,R.y,mn(58,A.H*.16),1);
  if(!st.way){emo(g,'⚽',R.x-50,R.y+10,30);say(g,'Kit is rolling a ball.',A.W/2,A.H*.36,14,C.tx);WAYS.forEach((w,i)=>{const r=opt(i);box(g,r,st.bad===i?C.rd:C.vi,st.bad===i);emo(g,w[0],r.x+30,r.y+r.h/2,26);say(g,w[1],r.x+r.w/2+14,r.y+r.h/2,15,C.tx)});return}
  emo(g,'⚽',L.x+40+(R.x-L.x-80)*st.ball,L.y+30,34);say(g,`Rolls: ${st.rolls} of 3`,A.W/2,A.H*.45,16,st.rolls>=3?C.gr:C.tx);
  const r={x:A.W*.15,y:A.H*.6,w:A.W*.7,h:mn(80,A.H*.22)};box(g,r,C.or,!st.busy,.16);say(g,st.rolls>=3?'Yay! We play together.':st.busy?'Kit rolls it back…':'Tap: roll to Kit',A.W/2,r.y+r.h/2,16,C.tx)}
 function sortV(g){const C=A.col;if(st.s>=SC.length)return say(g,'All sorted! Next to is OK. Together is fun too.',A.W/2,A.H*.4,14,C.gr);const s=SC[st.s];
  box(g,{x:A.W*.06,y:A.H*.05,w:A.W*.88,h:A.H*.5},C.cy,0,.1);emo(g,'🧒',A.W*.32,A.H*.22,mn(54,A.H*.15));emo(g,'👧',A.W*.68,A.H*.22,mn(54,A.H*.15));emo(g,s[0],A.W*.5,A.H*.3,34);if(!s[2]){emo(g,s[0],A.W*.2,A.H*.36,26);emo(g,s[0],A.W*.8,A.H*.36,26)}
  say(g,s[1],A.W/2,A.H*.47,12,C.tx,700);BIN.forEach((b,i)=>{const r=bin(i);box(g,r,st.bad===i?C.rd:i?C.gr:C.vi,st.bad===i,.14);say(g,b,r.x+r.w/2,r.y+r.h/2,15,C.tx)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.5);g.fillRect(0,0,W,H);
  const f={copy:copyV,tower:towerV,pass:passV,join:joinV,sort:sortV}[part()];if(f)f(g);else emo(g,st.face||'🤝',W/2,H/2,64);A.fx.draw(g)}
 function copy(i){if(st.k>=3)return;const want=COPY[st.k];if(i!==want){st.bad=i;return oops(`Look at Kit. Kit can ${ACT[want][1]}. You ${ACT[want][1]} too!`)}st.bad=null;st.k++;A.sound.pop();talk(`You ${ACT[i][1]} like Kit. Kit laughs!`)}
 function brick(i){if(st.tw.length>=6)return;const me=st.tw.length%2===0;if((i===0)!==me)return oops(me?'It is your turn! Put your brick on.':'Wait! It is Kit\'s turn. Then you.');st.tw.push(i);A.sound.tick();talk(i?'Kit puts a brick on.':'You put a brick on.')}
 function give(i){if(st.gv>=3)return;const want=ASK[st.gv];if(i!==want){st.bad=i;return oops(`That is the ${TOYS[i][1]}. Kit asked for the ${TOYS[want][1]}.`)}st.bad=null;st.held=i;st.gv++;A.sound.pop();talk(`You gave Kit the ${TOYS[i][1]}. Kit says thank you!`)}
 function join(i){if(st.way)return;const w=WAYS[i][2];if(w==='watch'){st.bad=i;return oops('Kit does not know you want to play. Ask her!')}
  if(w==='grab'){st.bad=i;st.face='😢';return oops('Kit is sad. The ball was hers. Ask, "Can I play?"')}st.bad=null;st.face=null;st.way=1;A.sound.pop();talk('Kit says, "Yes! Catch!"')}
 function roll(){if(!st.way||st.busy||st.rolls>=3)return;st.busy=1;A.sound.tick();A.tween(st,{ball:1},500,'io',()=>{A.tween(st,{ball:0},500,'io',()=>{st.rolls++;st.busy=0;if(st.rolls>=3)A.sound.pop();talk(st.rolls>=3?'Three rolls! You and Kit are playing together.':'Kit rolls it back to you.')})});talk('')}
 function sortIt(i){if(st.s>=SC.length)return;const s=SC[st.s];if(i!==s[2]){st.bad=i;return oops(s[2]?'They share one game. That is playing together.':'They are near, but each has their own. That is playing next to each other.')}
  st.bad=null;st.s++;A.sound.pop();talk(i?'Yes, together!':'Yes, next to each other. That is OK too.')}
 function talk(msg){const v=part();let t;
  if(v==='copy')t=st.k>=3?'You copied Kit three times.':`Kit can ${ACT[COPY[st.k]][1]}. What do you do?`;
  else if(v==='tower')t=st.tw.length>=6?'The tower has 6 bricks.':`Tower: ${st.tw.length} bricks. ${st.tw.length%2?"Kit's":'Your'} turn.`;
  else if(v==='pass')t=st.gv>=3?'Kit has all she asked for.':`Kit asks for the ${TOYS[ASK[st.gv]][1]}.`;
  else if(v==='join')t=!st.way?'Kit is rolling a ball. How do you join?':`Rolls: ${st.rolls} of 3.`;
  else if(v==='sort')t=st.s>=SC.length?'All scenes sorted.':SC[st.s][1]+' Next to, or together?';else t='Challenge time.';
  voice((msg?msg+' ':'')+t);pads();st.cb()}
 function pads(){if(!A||!keys)return;keys.innerHTML='';const v=part();const b=(t,f,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},keys,t);e.onclick=f};
  if(v==='copy'&&st.k<3)ACT.forEach((o,i)=>b(o[0]+' I '+o[1]+' too',()=>copy(i)));
  if(v==='tower'&&st.tw.length<6){b('🧒 My brick',()=>brick(0),'Put my brick on');b("👧 Kit's brick",()=>brick(1),"Kit puts her brick on")}
  if(v==='pass'&&st.gv<3)TOYS.forEach((t,i)=>b(t[0]+' '+t[1],()=>give(i),'Give Kit the '+t[1]));
  if(v==='join'){if(!st.way)WAYS.forEach((w,i)=>b(w[0]+' '+w[1],()=>join(i)));else if(st.rolls<3)b('⚽ Roll to Kit',roll)}
  if(v==='sort'&&st.s<SC.length)BIN.forEach((t,i)=>b(t,()=>sortIt(i)));A.redraw()}
 const ready=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m()+A.reveal(n))};
 const seq=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const clear=()=>{st.tok++;st.cb=()=>{};st.face=null;st.lift=null;st.pos=null;st.bad=null};
 const steps=[
  {h:'Copy Kit',p:'Kit does something fun. Do it too! Copying is a way to play with a friend.',
   predict:{q:'Kit claps. How can you play with her?',opts:['Walk away','Clap too'],ans:1},task:'Copy Kit three times',
   show:()=>{steps[0].go();seq([()=>copy(0),()=>copy(1),()=>copy(2)],400)},go:()=>{clear();st.k=0;talk();st.cb=ready(0,()=>st.k>=3,()=>'When you copy a friend, you are playing together.')}},
  {h:'One tower',p:'You and Kit build one tower. You put a brick on, then Kit does. Take turns!',
   predict:{q:'You put a brick on. Who goes next?',opts:['Kit','Me again'],ans:0},task:'Build a tower of 6, taking turns',
   show:()=>{steps[1].go();seq([0,1,0,1,0,1].map(i=>()=>brick(i)),300)},go:()=>{clear();st.tw=[];talk();st.cb=ready(1,()=>st.tw.length>=6,()=>'Me, then Kit, then me. Taking turns makes one big tower.')}},
  {h:'Pass a toy',p:'Kit asks for a toy. Give her the one she asks for. Drag it to Kit, or tap it.',
   predict:{q:'Kit says, "Can I have the ball?" What do you do?',opts:['Give Kit the ball','Hide the ball'],ans:0},task:'Give Kit the three toys she asks for',
   show:()=>{steps[2].go();seq(ASK.map(i=>()=>give(i)),400)},go:()=>{clear();st.gv=0;st.held=null;talk();st.cb=ready(2,()=>st.gv>=3,()=>'Passing a toy is a kind way to play together.')}},
  {h:'Can I play?',p:'Kit is playing ball. How can you join in?',
   predict:{q:'Kit has a ball. How do you join?',opts:['Take the ball','Ask, "Can I play?"'],ans:1},task:'Join Kit and roll the ball 3 times',
   show:()=>{steps[3].go();seq([()=>join(2),roll,null,null,roll,null,null,roll].map(f=>f||(()=>{})),400)},go:()=>{clear();st.way=0;st.rolls=0;st.ball=0;st.busy=0;talk();st.cb=ready(3,()=>st.rolls>=3,()=>'Asking "Can I play?" opens the game. Then you take turns.')}},
  {h:'Next to or together?',p:'Look at Mia and Kit. Are they playing next to each other, or together? Both are OK.',
   predict:{q:'Mia and Kit sit side by side. Each has her own puzzle. Is that playing together?',opts:['Yes, together','No, next to each other'],ans:1},task:'Sort all five pictures',
   show:()=>{steps[4].go();seq(SC.map(s=>()=>sortIt(s[2])),400)},go:()=>{clear();st.s=0;talk();st.cb=ready(4,()=>st.s>=SC.length,()=>'Playing next to a friend comes first. Playing together grows from it.')}},
  {h:'Challenge',p:'',go:()=>{clear();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.cb()});
 const QS=[['Kit jumps up and down. How can you play with her?','🦘',[['Jump too','ok'],['Walk away','away'],['Shout "Stop!"','stop']]],
  ['You put a brick on the tower. Whose turn is it now?','🧱',[["Kit's turn",'ok'],['My turn again','again'],['Nobody','nobody']]],
  ['Kit asks, "Can I have the car?"','🚗',[['Give Kit the car','ok'],['Give Kit the teddy','wrongtoy'],['Hide the car','hide']]],
  ['Kit has the teddy. You want a go. What do you do?','🧸',[['Ask, "Can I have a go?"','ok'],['Grab it','grab'],['Cry','cry']]],
  ['Kit is playing chase. You want to join.','🏃',[['Ask, "Can I play?"','ok'],['Push Kit','push'],['Just watch','watch']]],
  ['Mia and Kit each draw their own picture, side by side. Is that OK?','🖍️',[['Yes, it is OK','ok'],['No, they must share','must'],['No, they are cross','cross']]]];
 const WHY={away:'Kit wants a friend. Copy her: jump too!',stop:'Kit is having fun. Jump with her.',again:'Take turns: you, then Kit.',nobody:'Someone is next. It is Kit.',
  wrongtoy:'Kit asked for the car, not the teddy.',hide:'Kit asked nicely. Give her the car.',grab:'Grabbing makes Kit sad. Ask for a go.',cry:'Use words. Ask, "Can I have a go?"',
  push:'Pushing hurts. Ask, "Can I play?"',watch:'Kit does not know you want to play. Ask her!',must:'Playing next to a friend is OK. It is how playing starts.',cross:'They are fine. They just play side by side.'};
 let qk=-1,run=0;
 function pose(){qk++;const[q,face,ops]=QS[qk%QS.length],sh=qk%3;st.face=face;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,o);e.onclick=()=>judge(tag)});voice('Challenge: '+q);A.redraw()}
 function judge(tag){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Yes!';else if(tag==='grab')m='Grabbing makes Kit sad. Ask for a go.';else if(tag==='watch')m='Kit does not know you want to play. Ask her!';else m=WHY[tag];
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function press(p){const v=part();st.lift=null;st.pos=null;
  if(v==='copy'&&st.k<3){[0,1,2].forEach(i=>{if(inR(p,opt(i)))copy(i)});return false}
  if(v==='tower'){[0,1].forEach(i=>{if(inR(p,pile(i)))brick(i)});return false}
  if(v==='pass'&&st.gv<3){const i=TOYS.findIndex((t,i)=>inR(p,toy(i)));if(i<0)return false;st.lift=i;return true}
  if(v==='join'){if(!st.way)[0,1,2].forEach(i=>{if(inR(p,opt(i)))join(i)});else if(p.y>A.H*.55)roll();return false}
  if(v==='sort'){[0,1].forEach(i=>{if(inR(p,bin(i)))sortIt(i)})}return false}
 function lift(p){const k=st.lift;st.lift=null;st.pos=null;if(k==null)return A.redraw();if(inR(p,kitR())||inR(p,toy(k)))give(k);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);aloud=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Play controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{st.pos=p;A.redraw()},up:lift});pads()}});
 A.start()})})();
