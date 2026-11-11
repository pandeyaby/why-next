/* Flagship – floating and sinking (ages 3–4, with a grown-up): drop real things into a tub of water and watch them
   bob or sink; find that big things can float and small things can sink; guess first, then test; squash a sinking
   clay ball into a boat that floats; then load the boat with marbles until the water comes in. Big tap targets. */
(()=>{
 // [name, emoji, floats?, size 1 small – 3 big]
 const T={duck:['duck','🦆',1,2],key:['key','🔑',0,1],apple:['apple','🍎',1,2],stone:['stone','🪨',0,1],log:['big log','🪵',1,3],coin:['coin','🪙',0,1],
  beach:['big ball','🏐',1,3],pebble:['pebble','🪨',0,1],leaf:['leaf','🍃',1,1],spoon:['spoon','🥄',0,2],brick:['brick','🧱',0,2],feather:['feather','🪶',1,1]};
 const SETS=[['duck','key','apple','stone'],['log','coin','beach','pebble'],['leaf','spoon','brick','feather']];
 const MAXLOAD=5; // marbles the clay boat can hold before water comes over the side
VIS.reg('flagfloat',c=>{let A,pad,quiz,reader;c.fig.classList.add('young');
 const st={tub:[],guess:null,held:null,at:null,from:null,clay:null,marbles:0,bad:null,tok:0,face:'🙂',onChange:()=>{}};
 const mode=()=>['test','size','guess','clay','load','quiz'][A.step];
 const set=()=>SETS[{test:0,size:1,guess:2}[mode()]]||[];
 const left=()=>set().filter(k=>!st.tub.some(t=>t.k===k));
 function speak(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}

 // ---------- layout ----------
 const big=n=>A.narrow?n:Math.round(n*1.2);
 const surf=()=>A.H*.56,floor=()=>A.H*.93;
 const tubR=()=>({x:A.W*.05,y:A.H*.44,w:A.W*.9,h:A.H*.52});
 function shelfR(i){const n=4,gap=10,w=(A.W-gap*(n+1))/n,h=Math.min(92,A.H*.26);return{x:gap+i*(w+gap),y:A.H*.06,w,h}}
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function write(g,t,x,y,n,col,w){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function glyph(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function tile(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.15);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const emSize=k=>Math.min(A.W*.11,A.H*.13)*(.7+.25*T[k][3]);

 // ---------- drawing ----------
 function water(g){const C=A.col,r=tubR(),s=surf();g.fillStyle=A.mix(C.pn,'#e5e7eb',C.dark?.1:.6);A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
  g.fillStyle=A.alpha('#38bdf8',C.dark?.35:.45);g.fillRect(r.x+4,s,r.w-8,floor()-s);g.strokeStyle='#0284c7';g.lineWidth=3;g.beginPath();g.moveTo(r.x+4,s);g.lineTo(r.x+r.w-4,s);g.stroke();
  g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,18);g.stroke()}
 function tubThings(g){const C=A.col;st.tub.forEach(t=>{const n=emSize(t.k);glyph(g,T[t.k][1],t.x,t.y,n);
  if(t.landed)A.paint.label(T[t.k][2]?'floats ⬆':'sinks ⬇',t.x,t.y+(T[t.k][2]?-n*.85:-n*.75),{font:`800 ${big(12)}px system-ui,sans-serif`,bg:T[t.k][2]?'#047857':'#b91c1c'})})}
 function shelf(g){const C=A.col;left().forEach((k,i)=>{let r=shelfR(set().indexOf(k));if(st.held===k&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};
  tile(g,r,st.bad===k?C.rd:C.or,st.held===k,.14);glyph(g,T[k][1],r.x+r.w/2,r.y+r.h*.42,Math.min(40,r.h*.45));write(g,T[k][0],r.x+r.w/2,r.y+r.h*.84,12,C.tx,700)})}
 // clay as a ball or as a boat; the boat sits lower with each marble
 function clay(g){const C=A.col,q=st.clay;if(!q)return;const s=surf(),col='#c2410c';
  if(q.shape==='ball'){A.paint.ball(q.x,q.y,Math.min(26,A.W*.05),col);return}
  const w=Math.min(150,A.W*.36),h=Math.min(44,A.H*.12);g.fillStyle=col;g.beginPath();g.moveTo(q.x-w/2,q.y-h/2);g.lineTo(q.x+w/2,q.y-h/2);
  g.quadraticCurveTo(q.x+w*.42,q.y+h/2,q.x,q.y+h/2);g.quadraticCurveTo(q.x-w*.42,q.y+h/2,q.x-w/2,q.y-h/2);g.fill();
  for(let i=0;i<st.marbles;i++)A.paint.ball(q.x-w*.3+i*(w*.15),q.y-h*.2-(i%2)*5,Math.min(9,w*.06),i%2?C.vi:C.cy);
  if(q.shape==='boat'&&!q.sunk&&mode()==='load'){const top=q.y-h/2;write(g,`${st.marbles} marble${st.marbles===1?'':'s'}`,q.x,Math.max(A.H*.38,top-24),12,C.tx)}
  if(q.sunk)write(g,'Water came in!',A.W/2,A.H*.4,14,C.rd)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);g.fillRect(0,0,W,H);const v=mode();
  if(v!=='quiz'){water(g);tubThings(g);if(v==='clay'||v==='load')clay(g)}
  if(v==='test'||v==='size'||v==='guess')shelf(g);
  if(v==='guess'&&left().length){const k=left()[0];write(g,st.guess==null?`${T[k][1]} Float or sink? Guess first!`:`You guessed: ${st.guess?'float':'sink'}. Now test it!`,W/2,H*.37,14,C.tx)}
  if(v==='quiz')glyph(g,'🛁',W/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 function landY(k){const s=surf(),n=emSize(k);return T[k][2]?s-n*.12:floor()-n*.5}
 function drop(k){if(!k||!left().includes(k))return;if(mode()==='guess'&&st.guess==null){st.bad=k;speak(`Guess first: will the ${T[k][0]} float or sink? Tap a guess.`);A.sound.miss();return A.redraw()}
  const slot=set().indexOf(k),t={k,x:tubR().x+tubR().w*(.14+slot*.24),y:A.H*.42,landed:false};st.tub.push(t);st.held=null;st.at=null;st.bad=null;A.sound.whoosh();
  A.tween(t,{y:landY(k)},T[k][2]?1100:1500,T[k][2]?'el':'out',()=>{t.landed=true;A.redraw()});
  let msg=T[k][2]?`Splash! The ${T[k][0]} floats on top.`:`Splash! The ${T[k][0]} sinks to the bottom.`;
  if(mode()==='size'&&T[k][3]===3&&T[k][2])msg+=' It is big, and it floats!';
  if(mode()==='size'&&T[k][3]===1&&!T[k][2])msg+=' It is small, and it sinks!';
  if(mode()==='guess'){const ok=(st.guess===1)===!!T[k][2];msg+=ok?' Your guess was right!':' Your guess was wrong, and that is OK. Now we know!';st.guess=null}
  report(msg)}
 function guess(f){const k=left()[0];if(!k)return;st.guess=f;st.bad=null;A.sound.tick();report(`You think the ${T[k][0]} will ${f?'float':'sink'}. Drop it in to test!`)}
 function dropBall(){const q=st.clay;if(!q||q.shape!=='ball'||q.wet)return;q.wet=1;A.sound.whoosh();A.tween(q,{y:floor()-26},1500,'out',()=>A.redraw());report('Plop! The clay ball sinks.')}
 function makeBoat(){const q=st.clay;if(!q)return;if(!q.wet){speak('First drop the ball in, to see what it does.');return A.sound.miss()}
  if(q.shape==='boat')return;q.shape='boat';q.wet=0;q.x=A.W/2;q.y=A.H*.36;A.sound.pop();report('You squashed the same clay flat and pushed up the sides. Now it is a boat shape.')}
 function boatY(){const h=Math.min(44,A.H*.12);return surf()-h*.32+st.marbles*h*.11}
 function dropBoat(){const q=st.clay;if(!q||q.shape!=='boat'||q.wet)return;q.wet=1;A.sound.whoosh();A.tween(q,{y:boatY()},1100,'el',()=>A.redraw());report('The same clay floats now, because it is a boat shape!')}
 function addMarble(){const q=st.clay;if(!q||q.sunk)return;if(!q.wet){q.wet=1;q.y=boatY()}st.marbles++;A.sound.tick();
  if(st.marbles>MAXLOAD){q.sunk=1;A.tween(q,{y:floor()-20},1400,'out',()=>A.redraw());return report(`Too many! With ${st.marbles} marbles the water came in, and the boat sank.`)}
  A.tween(q,{y:boatY()},400,'out');report(st.marbles<MAXLOAD?`${st.marbles} marble${st.marbles>1?'s':''} in. The boat sits lower in the water.`:`${st.marbles} marbles. The boat is very low. Careful!`)}

 function report(msg){const v=mode();let t='';
  if(v==='test'||v==='size')t=left().length?`Things left to test: ${left().map(k=>T[k][0]).join(', ')}.`:'You tested them all.';
  else if(v==='guess')t=left().length?`Next: the ${T[left()[0]][0]}.`:'All guessed and tested.';
  else if(v==='clay'){const q=st.clay;t=q.shape==='ball'?(q.wet?'The clay ball is at the bottom.':'A ball of clay.'):(q.wet?'The clay boat floats on top.':'A clay boat, not in the water yet.')}
  else if(v==='load')t=st.clay&&st.clay.sunk?'The boat is at the bottom.':`The boat holds ${st.marbles} marbles.`;else t='Challenge time.';
  speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if(v==='test'||v==='size')left().forEach(k=>b(T[k][1]+' '+T[k][0],()=>drop(k),'Put the '+T[k][0]+' in the water'));
  if(v==='guess'&&left().length){const k=left()[0];b('⬆️ Float',()=>guess(1),`Guess: the ${T[k][0]} floats`);b('⬇️ Sink',()=>guess(0),`Guess: the ${T[k][0]} sinks`);b(T[k][1]+' Test it',()=>drop(k),'Put the '+T[k][0]+' in the water')}
  if(v==='clay'){b('🟠 Drop the ball',dropBall);b('👐 Squash into a boat',makeBoat);b('⛵ Drop the boat',dropBoat)}
  if(v==='load')b('🔵 Add a marble',addMarble);A.redraw()}

 // ---------- canvas input: drag a thing into the water, or tap it ----------
 function down(p){const v=mode();st.at=p;st.from=p;
  if(v==='clay'){const q=st.clay;if(q.shape==='ball'&&!q.wet)dropBall();else if(q.shape==='ball'&&q.wet)makeBoat();else if(q.shape==='boat'&&!q.wet)dropBoat();return false}
  if(v==='load'){addMarble();return false}
  if(!['test','size','guess'].includes(v))return false;const k=left().find(k=>inside(p,shelfR(set().indexOf(k))));if(!k)return false;
  if(v==='guess'&&k!==left()[0])return false;st.held=k;A.redraw();return true}
 function up(p){const k=st.held;if(!k)return;const moved=st.from&&Math.hypot(p.x-st.from.x,p.y-st.from.y)>12;
  if(!moved||p.y>A.H*.4)drop(k);else{st.held=null;st.at=null;A.redraw()}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const fresh=()=>{st.tok++;st.onChange=()=>{};st.tub=[];st.guess=null;st.held=null;st.bad=null;st.marbles=0;st.clay={shape:'ball',x:A.W/2,y:A.H*.36,wet:0}};
 const tests=()=>set().map(k=>()=>drop(k));
 const steps=[
  {h:'Splash!',p:'Drag a thing into the water, or tap it. Watch: does it float on top, or sink to the bottom?',task:'Put 4 things in the water',
   show:()=>{steps[0].go();later(tests(),450)},go:()=>{fresh();report();st.onChange=whenDone(0,()=>!left().length,'Some things float. Some things sink.')}},
  {h:'Big and small',p:'Here is a big log, a small coin, a big ball and a small pebble. Test them all.',
   predict:{q:'A big log and a small coin. Which one sinks?',opts:['The big log','The small coin'],ans:1},task:'Test the big things and the small things',
   show:()=>{steps[1].go();later(tests(),450)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>!left().length,'Big things can float. Small things can sink.')}},
  {h:'Guess, then test',p:'Scientists guess first, then test. Tap Float or Sink, then drop it in.',task:'Guess and test 4 things',
   show:()=>{steps[2].go();later(SETS[2].flatMap(k=>[()=>guess(T[k][2]),()=>drop(k)]),350)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>!left().length,'A wrong guess is fine. The test tells us.')}},
  {h:'Make a boat',p:'Drop the clay ball in. Then squash the same clay into a boat and try again.',
   predict:{q:'The clay ball sinks. We make it a boat. Now what?',opts:['It still sinks','It floats'],ans:1},task:'Sink the ball, then float the boat',
   show:()=>{steps[3].go();later([dropBall,makeBoat,dropBoat],600)},go:()=>{fresh();report();st.onChange=whenDone(3,()=>st.clay.shape==='boat'&&st.clay.wet,'Same clay. A boat shape floats.')}},
  {h:'Fill the boat',p:'Put marbles in the boat, one at a time. Watch the boat go lower.',
   predict:{q:'We keep adding marbles. What happens?',opts:['It floats forever','It goes lower, then sinks'],ans:1},task:'Add marbles until the boat sinks',
   show:()=>{steps[4].go();later(Array(MAXLOAD+1).fill(addMarble),380)},go:()=>{fresh();st.clay={shape:'boat',x:A.W/2,y:boatY(),wet:1};report();st.onChange=whenDone(4,()=>st.clay.sunk,'Too much in a boat, and it sinks.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge ----------
 const QS=[['Which one floats?','🛁',[['🍎 An apple','ok'],['🪙 A coin','small'],['🔑 A key','small']]],
  ['A big log falls in the river. What does it do?','🪵',[['It floats','ok'],['It sinks, it is big','big'],['It sinks, then pops up','guess']]],
  ['Ben\'s clay ball sinks. How can he make the clay float?','🟠',[['Make it a boat shape','ok'],['Make a smaller ball','small'],['Paint it red','guess']]],
  ['A toy boat gets lots of stones in it. Water comes in. What happens?','⛵',[['It sinks','ok'],['It floats, boats always float','boat'],['It gets bigger','guess']]],
  ['Which one sinks?','🌊',[['🪨 A small stone','ok'],['🏐 A big ball','big'],['🍃 A leaf','guess']]],
  ['Mia guessed the spoon floats. It sinks! What now?','🥄',[['Say: it sinks! Good test','ok'],['Say the water is wrong','guess'],['Stop testing','stop']]]];
 function slip(tag){let m='Try again.';
  if(tag==='small')m='Small things can sink too. A tiny coin sinks!';
  if(tag==='big')m='Big things can float. A big log floats!';
  if(tag==='boat')m='Too much in a boat lets the water in. Then it sinks.';
  if(tag==='guess')m='Test it and see. The water shows us what is true.';
  if(tag==='stop')m='A wrong guess is fine. Keep testing!';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Things to test'},w);quiz=E('div',{class:'fl-chal'},A.below);
   st.clay={shape:'ball',x:A.W/2,y:A.H*.36,wet:0};A.gest({down,move:p=>{st.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
