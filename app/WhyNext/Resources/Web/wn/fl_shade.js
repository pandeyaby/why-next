/* Flagship – shades of meaning (ages 5–9): watch three walkers and name the verb for each manner (tiptoe, march, sprint);
   put close synonyms on a strength staircase (big → huge → gigantic, damp → wet → soaked, warm → hot → scorching); pull back
   and let go to act out toss, throw and hurl; drop the most exact verb into a sentence (scurried, gobbled, glanced); and
   place know / think / wonder on a sure-o-meter (degrees of certainty). */
(()=>{const lo=Math.min,hi=Math.max;
 const GAIT=[{w:'tiptoe',v:.05,step:.022,lift:.012,why:'Tiny, slow, quiet steps on the toes.'},{w:'march',v:.11,step:.06,lift:.05,why:'Big, steady, even steps, knees up high.'},{w:'sprint',v:.34,step:.13,lift:.02,why:'Running as fast as you can.'}];
 const GAIT_TRAY=[1,2,0];
 const LADDER=[{pic:'🐘',ws:['huge','big','gigantic'],ok:[1,0,2]},{pic:'💧',ws:['soaked','damp','wet'],ok:[2,0,1]},{pic:'☀️',ws:['hot','scorching','warm'],ok:[1,2,0]}];
 const RUNG=['a bit','more','the most'];
 const THROW=[['toss','soft and short, like tossing a ball to a little child'],['throw','a normal, middle throw'],['hurl','as hard and far as you can']];
 const GAP=[{s:['The tiny mouse','across the floor.'],pic:'🐭',ws:['stomped','scurried','marched'],ok:1,bad:{0:'Stomp is heavy and loud. A tiny mouse runs fast and light.',2:'March is big steady steps, like a band. A mouse scurries.'}},
  {s:['The hungry lion','its dinner.'],pic:'🦁',ws:['nibbled','sipped','gobbled'],ok:2,bad:{0:'Nibble is tiny bites. A hungry lion eats fast, in big bites.',1:'You sip a drink, a little at a time. A lion gobbles meat.'}},
  {s:['Shh! The baby is asleep, so we','past.'],pic:'👶',ws:['tiptoed','stomped','raced'],ok:0,bad:{1:'Stomping is loud. It would wake the baby!',2:'Racing is fast and noisy. Quiet steps on your toes is tiptoe.'}},
  {s:['I just','at the clock, then looked away.'],pic:'⏰',ws:['stared','glanced','glared'],ok:1,bad:{0:'Stare is a long look. Then looked away means it was quick.',2:'Glare is an angry look. A quick look is a glance.'}}];
 const SURE=[{ws:['I know it will rain.','I wonder if it will rain.','I think it will rain.'],ok:[2,0,1]},{ws:['Sam guessed the answer.','Sam knew the answer.','Sam believed it was right.'],ok:[0,2,1]}];
 const ZONE=[['🤔','not sure'],['🙂','fairly sure'],['😎','sure']];
VIS.reg('flagshade',c=>{let A,ctl,quizBox,live;c.fig.classList.add('young');
 const S={n:0,placed:{},drag:null,pick:-1,wrong:-1,clock:0,gen:0,th:0,pow:0,ball:null,mark:'',hook:()=>{}};
 const speak=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(live)live.textContent=t}};
 const px=v=>v*A.W,py=v=>v*A.H,big=z=>A.narrow?z:z+3,kind=()=>['gait','ladder','throw','gap','sure','quiz'][A.step];
 function txt(g,s,x,y,size,col,wt,maxw){g.font=`${wt||700} ${big(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;
  if(!maxw||g.measureText(s).width<=maxw)return g.fillText(s,x,y);const parts=s.split(' '),half=Math.ceil(parts.length/2),d=big(size)*.62;
  g.fillText(parts.slice(0,half).join(' '),x,y-d,maxw);g.fillText(parts.slice(half).join(' '),x,y+d,maxw)}
 const tile=(g,r,col,strong,fill)=>{g.fillStyle=A.alpha(col,fill||.16);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=strong?4:2;g.strokeStyle=col;g.stroke()};
 const inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 // the round that is showing in this step, and the word tiles waiting in the tray
 const round=()=>({ladder:LADDER,gap:GAP,sure:SURE}[kind()]||[null])[S.n];
 const words=()=>{const k=kind();if(k==='gait')return GAIT_TRAY.map(i=>GAIT[i].w);const R=round();return R?R.ws:[]};
 function trayBox(i){const n=words().length,long=kind()==='sure',cols=long&&A.narrow?1:n,rows=Math.ceil(n/cols),gap=7,y0=py(.7),h=lo(py(.13),(py(.97)-y0-(rows-1)*gap)/rows),w=(A.W-(cols+1)*gap)/cols;
  return{x:gap+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}}
 function slotBox(j){const k=kind();
  if(k==='gait')return{x:px(.02),y:py(.12+j*.18),w:px(.96),h:py(.16)};
  if(k==='ladder'){const w=px(.29),h=py(.15+j*.13);return{x:px(.035)+j*(w+px(.035)),y:py(.64)-h,w,h}}
  if(k==='gap')return{x:px(.3),y:py(.15),w:px(.4),h:py(.12)};
  if(k==='sure'){const w=px(.31);return{x:px(.025)+j*(w+px(.015)),y:py(.3),w,h:py(.3)}}return null}
 const slots=()=>({gait:3,ladder:3,gap:1,sure:3}[kind()]||0);
 const usedTile=i=>Object.values(S.placed).includes(i);
 const want=i=>{const k=kind(),R=round();if(k==='gait')return GAIT_TRAY[i];if(k==='gap')return i===R.ok?0:-1;return R.ok[i]};
 // ---- painters ----
 function walkers(g){const C=A.col;GAIT.forEach((G,j)=>{const r=slotBox(j),t=S.placed[j];tile(g,r,j===S.wrong?C.rd:t!=null?C.gr:C.ln,j===S.wrong||t!=null,.08);
   const clk=A.reduced()?1.6:S.clock,span=r.w*.66,pos=(clk*G.v*A.W)%span,x0=r.x+12,yb=r.y+r.h*.66;g.fillStyle=A.alpha(C.tx,.35);
   for(let f=0;f*G.step*A.W<=pos;f++){const fx=x0+f*G.step*A.W;g.beginPath();g.ellipse(fx,yb+(f%2?5:-5),3.5,2.2,0,0,7);g.fill()}
   const bob=Math.abs(Math.sin(clk*Math.PI*G.v/G.step))*G.lift*A.H;txt(g,j===2?'🏃':'🚶',x0+pos,yb-r.h*.22-bob,24,C.tx,400);
   txt(g,t!=null?'✓ '+GAIT[GAIT_TRAY[t]].w:'?',r.x+r.w*.85,r.y+r.h/2,16,t!=null?C.tx:C.mu,800)});
  txt(g,'Who does what? Drag a word to each walker.',A.W/2,py(.05),13,C.tx,800,A.W-14)}
 function stairs(g){const C=A.col,R=round();if(!R)return;for(let j=0;j<3;j++){const r=slotBox(j),t=Object.keys(S.placed).find(k=>+S.placed[k]===j);
   const full=Object.entries(S.placed).find(([s])=>+s===j);tile(g,r,j===S.wrong?C.rd:full?C.gr:C.vi,j===S.wrong||!!full,.12+j*.06);
   txt(g,RUNG[j],r.x+r.w/2,r.y+r.h-14,11,C.tx,600);if(full){txt(g,R.ws[full[1]],r.x+r.w/2,r.y+20,15,C.tx,800,r.w-6);txt(g,R.pic,r.x+r.w/2,r.y-py(.06)-j*6,18+j*10,C.tx,400)}}
  txt(g,'Put the words in order: weakest to strongest.',A.W/2,py(.05),13,C.tx,800,A.W-14)}
 function sentence(g){const C=A.col,R=round();if(!R)return;const s=slotBox(0);txt(g,R.s[0],A.W/2,py(.07),15,C.tx,700,A.W-12);
  const f=S.placed[0];tile(g,s,S.wrong===0?C.rd:f!=null?C.gr:C.vi,1,.12);txt(g,f!=null?R.ws[f]:'?',s.x+s.w/2,s.y+s.h/2,16,C.tx,800);txt(g,R.s[1],A.W/2,py(.34),15,C.tx,700,A.W-12);txt(g,R.pic,A.W/2,py(.52),44,C.tx,400)}
 function meter(g){const C=A.col,R=round();if(!R)return;txt(g,'How sure is the speaker?',A.W/2,py(.06),14,C.tx,800);
  g.fillStyle=A.paint.lin(px(.03),0,px(.97),0,[[0,A.alpha(C.am,.5)],[1,A.alpha(C.gr,.5)]]);A.paint.rrect(px(.03),py(.14),px(.94),py(.06),8);g.fill();
  ZONE.forEach((z,j)=>{const r=slotBox(j),f=Object.entries(S.placed).find(([s])=>+s===j);tile(g,r,j===S.wrong?C.rd:f?C.gr:C.cy,j===S.wrong||!!f,.1);
   txt(g,z[0],r.x+r.w/2,r.y+r.h*.22,22,C.tx,400);txt(g,z[1],r.x+r.w/2,r.y+r.h*.48,13,C.tx,800,r.w-6);if(f)txt(g,R.ws[f[1]].split(' ').slice(0,2).join(' ')+'…',r.x+r.w/2,r.y+r.h*.8,11,C.tx,700,r.w-6)})}
 function pitch(g){const C=A.col,gy=py(.84);g.fillStyle=A.alpha(C.gr,.25);g.fillRect(0,gy,A.W,A.H-gy);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(0,gy);g.lineTo(A.W,gy);g.stroke();
  txt(g,'🧒',px(.07),gy-py(.09),34,C.tx,400);const goal=THROW[S.th];txt(g,goal?`Make a ${goal[0]}: ${goal[1]}.`:'Toss, throw, hurl: all done!',A.W/2,py(.06),13,goal?C.tx:C.gr,800,A.W-14);
  if(goal&&!S.drag&&!(S.ball&&S.ball.t<1))txt(g,'👈 Drag back from the ball, then let go. Further back = harder.',A.W/2,py(.4),12,C.tx,600,A.W-30);
  if(S.drag&&S.drag.pull){const p=S.pow;g.fillStyle=A.alpha(C.ln,.5);A.paint.rrect(px(.25),py(.16),px(.5),py(.05),6);g.fill();g.fillStyle=p<.35?C.cy:p<.7?C.am:C.rd;A.paint.rrect(px(.25),py(.16),px(.5)*p,py(.05),6);g.fill();txt(g,'power',A.W/2,py(.25),11,C.tx,700)}
  const b=S.ball;let bx=px(.14),by=gy-py(.13);if(b){bx=px(.14+(b.land-.14)*b.t);by=gy-py(.13)*(1-b.t)-Math.sin(Math.PI*b.t)*py(.1+b.p*.45)}
  if(S.drag&&S.drag.pull){bx-=S.pow*px(.06)}A.paint.ball(bx,by,lo(14,px(.025)+4),C.or);
  if(S.mark&&b&&b.t>=1)txt(g,S.mark,lo(A.W-50,hi(50,px(b.land))),gy+py(.07),14,C.tx,800)}
 function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.45);g.fillRect(0,0,W,H);
  if(k==='quiz'){txt(g,S.Q||'🎨',W/2,H/2,58,C.tx,400);return A.fx.draw(g)}
  if(k==='throw')pitch(g);else if(!round()&&k!=='gait'||k==='gait'&&Object.keys(S.placed).length>=3&&S.fin)txt(g,'✓ '+FIN[A.step],W/2,H*.4,16,C.gr,800,W-20);
  else{({gait:walkers,ladder:stairs,gap:sentence,sure:meter})[k](g);
   words().forEach((w,i)=>{if(usedTile(i))return;let r=trayBox(i);if(S.drag&&S.drag.i===i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};tile(g,r,i===S.pick?C.vi:C.am,i===S.pick,.24);txt(g,w,r.x+r.w/2,r.y+r.h/2,k==='sure'?12:15,C.tx,800,r.w-8)})}A.fx.draw(g)}
 const FIN=['Tiptoe, march and sprint are all ways to move, but each one paints a different picture.','Close words can be weaker or stronger.','','The exact word makes the picture sharp.','Know is sure, think is fairly sure, wonder is not sure.'];
 // ---- answers ----
 function place(i,j){const k=kind();if(usedTile(i)||j<0)return;S.drag=null;S.pick=-1;const ok=want(i)===j;
  if(!ok){S.wrong=j;A.sound.miss();return speak(slip(k,i,j))}S.wrong=-1;S.placed[j]=i;A.sound.pop();
  const need=k==='gap'?1:3;if(Object.keys(S.placed).length>=need){if(k==='gait'){S.fin=1;return narrate('Yes! '+GAIT.map(G=>G.w+': '+G.why).join(' '))}S.n++;S.placed={};return narrate(round()?'Yes! Next one.':'Yes!')}narrate('Yes!')}
 function slip(k,i,j){const w=words()[i];
  if(k==='gait'){const G=GAIT[GAIT_TRAY[i]],at=GAIT[j];return `${w}: ${G.why} This walker is ${at.v>G.v?'faster':'slower'} than that.`}
  if(k==='ladder'){const want=round().ok[i];return want>j?`${w} is stronger than that. Move it further up the stairs.`:`${w} is weaker than that. Move it further down.`}
  if(k==='gap')return round().bad[i]||'Read the whole sentence again.';
  const want=round().ok[i];return want>j?`"${w}" is more sure than that. Listen to the doing word.`:`"${w}" is less sure than that. Listen to the doing word.`}
 function narrate(pre){const k=kind(),R=round();let t='';
  if(k==='gait')t=S.fin?'':'Three walkers: one tiptoes, one marches, one sprints. Drag each word to its walker.';
  else if(k==='throw')t=THROW[S.th]?`Pull the ball back and let go to make a ${THROW[S.th][0]}.`:'All three throws done.';
  else if(k==='quiz')t='Challenge time.';else if(!R)t=FIN[A.step];
  else if(k==='ladder')t=`Order ${R.ws.join(', ')} from weakest to strongest.`;else if(k==='gap')t=`${R.s[0]} blank ${R.s[1]} Pick ${R.ws.join(', ')}.`;else t='How sure? '+R.ws.join(' ');
  if(S.pick>=0)t+=` You picked ${words()[S.pick]}. Now pick a place.`;speak((pre?pre+' ':'')+t);buttons();S.hook()}
 function fling(p){if(S.th>=3)return;const land=.18+p*.78,word=p<.35?0:p<.7?1:2;S.drag=null;S.ball={t:0,p,land};S.mark='';
  A.sound.whoosh();A.tween(S.ball,{t:1},500+p*500,'out',()=>{S.mark=THROW[word][0]+'!';if(word!==S.th){A.sound.miss();
   speak(word<S.th?`That was a ${THROW[word][0]}: too soft. A ${THROW[S.th][0]} is ${THROW[S.th][1]}. Pull back further.`:`That was a ${THROW[word][0]}: too hard. A ${THROW[S.th][0]} is ${THROW[S.th][1]}. Pull back less.`);return A.redraw()}
   S.th++;A.sound.pop();narrate(`Yes, a ${THROW[word][0]}!`)})}
 function buttons(){if(!A||!ctl)return;ctl.innerHTML='';const k=kind(),add=(t,f,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},ctl,t);b.onclick=f};
  if(k==='throw'&&S.th<3)[['🤏 Soft',.2],['💪 Medium',.52],['🚀 Very hard',.9]].forEach(([n,p])=>add(n,()=>fling(p),'Throw '+n.split(' ').slice(1).join(' ').toLowerCase()));
  else if(k!=='quiz'&&k!=='throw'&&(round()||k==='gait'&&!S.fin)){if(S.pick<0)words().forEach((w,i)=>{if(!usedTile(i))add(w,()=>{S.pick=i;narrate()},'Pick '+w)});
   else{const names=k==='gait'?['Walker 1','Walker 2','Walker 3']:k==='ladder'?RUNG.map(r=>'Stair: '+r):k==='gap'?['Into the gap']:ZONE.map(z=>z[1]);names.forEach((n,j)=>add('➡️ '+n,()=>place(S.pick,j)));add('↩ Pick again',()=>{S.pick=-1;narrate()})}}A.redraw()}
 const finish=(n,msg)=>()=>{const k=kind(),over=k==='gait'?S.fin:k==='throw'?S.th>=3:!round();if(A.step===n&&over&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,gap)=>{const g=S.gen;fns.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},j*gap))};
 const reset=()=>{S.gen++;S.hook=()=>{};S.drag=null;S.pick=-1;S.wrong=-1;S.n=0;S.placed={};S.fin=0;S.th=0;S.ball=null;S.mark=''};
 const solveRounds=list=>list.flatMap(R=>(R.ok.map?R.ok.map((j,i)=>()=>place(i,j)):[()=>place(R.ok,0)]));
 const steps=[
  {h:'Ways to move',p:'Walk, tiptoe, march and sprint all mean moving on your feet. But each word shows a different way. Watch the feet!',task:'Name all three walkers',
   show:()=>{steps[0].go();later(GAIT_TRAY.map((g,i)=>()=>place(i,g)),450)},go:()=>{reset();narrate();S.hook=finish(0,'Each verb shows how they move.')}},
  {h:'Stronger and stronger',p:'Some words mean nearly the same, but one is stronger. Big, huge, gigantic: each one is bigger than the last.',
   predict:{q:'Damp and soaked both mean wet. Do they mean the same?',opts:['Yes, just the same','No, soaked is much wetter'],ans:1},task:'Order all three sets',
   show:()=>{steps[1].go();later(solveRounds(LADDER),380)},go:()=>{reset();narrate();S.hook=finish(1,'Damp, wet, soaked: same idea, different strength.')}},
  {h:'Toss, throw, hurl',p:'These verbs all mean sending something through the air. How hard you do it changes the word. Pull the ball back and let go.',task:'Make a toss, a throw and a hurl',
   show:()=>{steps[2].go();later([.2,.52,.9].map(p=>()=>fling(p)),1300)},go:()=>{reset();narrate();S.hook=finish(2,'Toss is soft, throw is middle, hurl is very hard.')}},
  {h:'The best word',p:'Pick the word that fits the whole sentence. Look for clues like tiny, hungry or asleep.',
   predict:{q:'A tiny mouse runs across the floor. Which word fits best?',opts:['stomped','scurried'],ans:1},task:'Fill all four gaps',
   show:()=>{steps[3].go();later(GAP.map(R=>()=>place(R.ok,0)),420)},go:()=>{reset();narrate();S.hook=finish(3,'Clues in the sentence pick the shade.')}},
  {h:'How sure?',p:'Some verbs tell how sure someone is. Know is very sure. Think is fairly sure. Wonder is not sure at all.',task:'Sort both sets',
   show:()=>{steps[4].go();later(solveRounds(SURE),400)},go:()=>{reset();narrate();S.hook=finish(4,'Knew, believed, guessed: three levels of sure.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});

 const QS=[['Which word is the strongest?','🌡️',[['scorching','ok'],['warm','weak'],['hot','mid']]],
  ['The giant ___ down the hill. Boom, boom!','🦶',[['stomped','ok'],['tiptoed','quiet'],['skipped','light']]],
  ['Which word means a very hard throw?','🥎',[['hurl','ok'],['toss','soft'],['drop','nothrow']]],
  ['She ___ at her cake, taking tiny bites.','🍰',[['nibbled','ok'],['gobbled','gob'],['gulped','gulp']]],
  ['Which shows the speaker is most sure?','🔮',[['I know the shop is open.','ok'],['I think the shop is open.','think'],['I wonder if the shop is open.','wonder']]],
  ['Which is the smallest?','🐜',[['tiny','ok'],['small','small'],['big','bigw']]]];
 let qi=-1,run=0;
 function ask(){qi++;const[q,pic,ops]=QS[qi%QS.length],r=qi%3;S.Q=pic;
  quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quizBox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quizBox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quizBox.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! That is the exact shade.';break;
   case 'weak':m='Warm is only a bit hot. Scorching is the hottest of the three.';break;
   case 'mid':m='Hot is in the middle. Scorching is even hotter.';break;
   case 'quiet':m='Tiptoe is quiet, on your toes. Boom, boom means heavy, loud steps.';break;
   case 'light':m='Skipping is light and bouncy. A giant going boom stomps.';break;
   case 'soft':m='A toss is soft and short. Hurl is the hardest throw.';break;
   case 'nothrow':m='Drop means letting go and it falls. It is not a throw at all.';break;
   case 'gob':m='Gobble is eating fast, in big bites. Tiny bites is nibble.';break;
   case 'gulp':m='Gulp is for big swallows, often of a drink. Tiny bites is nibble.';break;
   case 'think':m='Think is fairly sure. Know is the most sure.';break;
   case 'wonder':m='Wonder is not sure at all. Know is the most sure.';break;
   case 'small':m='Small is little, but tiny is even smaller.';break;
   default:m='Big is the opposite end! Tiny is the smallest.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 // ---- pointer ----
 function down(p){const k=kind();S.drag=null;
  if(k==='throw'){if(S.th<3&&!(S.ball&&S.ball.t<1)&&p.x<A.W*.6){S.drag={pull:1,x0:p.x,y0:p.y};S.pow=0;S.ball=null;S.mark='';A.redraw();return true}return false}
  if(k==='quiz')return false;const i=words().findIndex((_,i)=>!usedTile(i)&&inside(p,trayBox(i)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const j=[...Array(slots()).keys()].find(j=>inside(p,slotBox(j)));if(j!=null&&S.pick>=0)place(S.pick,j);return false}
 function move(p){const d=S.drag;if(!d)return;if(d.pull){S.pow=lo(1,Math.hypot(p.x-d.x0,p.y-d.y0)/(A.W*.4));return A.redraw()}d.x=p.x;d.y=p.y;A.redraw()}
 function up(p){const d=S.drag;if(!d)return;S.drag=null;if(d.pull){if(S.pow<.05)return A.redraw();return fling(S.pow)}
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<12){S.pick=d.i;return narrate()}const j=[...Array(slots()).keys()].find(j=>inside(p,slotBox(j)));if(j!=null)place(d.i,j);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quizBox.hidden=A.step!==5;live.hidden=A.step===5;ctl.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'});
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);quizBox=E('div',{class:'fl-chal'},A.below);
   A.every(dt=>{if(A.step!==0||A.reduced())return false;S.clock+=dt;A.redraw();return true});A.gest({down,move,up});buttons()}});
 A.start()})})();
