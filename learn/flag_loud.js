/* Flagship – making loud and quiet sounds (ages 3–4): sort everyday sounds into loud and quiet, lift a drumstick a
   little or a lot and hit the drum (a harder hit makes a louder sound and bigger sound rings), shake a shaker gently for
   a sleeping baby and hard for a marching band, blow softly or hard into a toy trumpet, then tap a big and a tiny bell
   and find that high and low are not the same as loud and quiet. Challenge targets the usual mix-ups: a big drum is
   always louder, high means loud, and fast or many taps mean loud. Real sounds play only if the sound button is on. */
(()=>{const SOUNDS=[['🦁','a lion roars',0],['🤫','a whisper',1],['🚒','a fire engine',0],['🐱','a cat purrs',1],['🥁','a big drum bang',0],['🍃','leaves rustle',1]];
const DRUM=['loud','quiet','loud'],SHAKE=[['baby','quiet'],['band','loud']],BLOW=[['kitten','quiet'],['dad','loud']],BELL=['high','low','high'];
VIS.reg('flagloud',c=>{let A,pad,quiz,qn=-1,run=0,AC=null;c.fig.classList.add('young');
const G={};
const part=()=>['sort','drum','shake','blow','bell','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
/* a real tone, only when the family has switched sound on; volume kept low even for "loud" */
function play(f,loud,dur){if(!A.sound.on())return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type='triangle';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(loud?.22:.025,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+(dur||.5));o.connect(g).connect(AC.destination);o.start(t);o.stop(t+(dur||.5)+.05)}catch(e){}}
function txt(g,s,x,y,n,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function emo(g,s,x,y,n){g.font=`${fz(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(s,x,y)}
function box(g,x,y,w,h,col,a,edge,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,14);g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const trays=()=>{const w=A.W*.42,h=A.H*.26;return[{x:8,y:A.H-h-8,w,h},{x:A.W-w-8,y:A.H-h-8,w,h}]};
/* sound rings: bigger and darker for a louder sound; tight wiggles for a high sound, wide ones for a low sound */
function rings(g,x,y,amt,col){if(!G.ring)return;const k=G.ring.t,n=amt>.5?4:2;for(let i=0;i<n;i++){const r=(A.W*.05)+(k+i/n)*A.W*(amt>.5?.26:.1);g.strokeStyle=A.alpha(col,Math.max(0,(1-k)*(amt>.5?.95:.6)));g.lineWidth=amt>.5?5:2;g.beginPath();g.arc(x,y,r,Math.PI*1.1,Math.PI*1.9);g.stroke()}}
function meter(g,x,y,lv){const w=A.W*.05,h=A.H*.05;for(let i=0;i<5;i++){g.fillStyle=A.alpha(i<lv?(i>2?A.col.rd:A.col.gr):A.col.mu,i<lv?.85:.18);g.fillRect(x+i*(w+4),y-(i+1)*h*.35,w,(i+1)*h*.35)}txt(g,'how loud',x+2.5*(w+4),y+fz(10),10,600)}
function wave(g,x,y,w,high,col){g.strokeStyle=col;g.lineWidth=3;g.beginPath();const k=high?7:2;for(let i=0;i<=60;i++){const u=i/60;g.lineTo(x+u*w,y+Math.sin(u*k*Math.PI*2)*A.H*.04)}g.stroke()}
const drum=()=>({x:A.W*.5,y:A.H*.74,rx:A.W*.2,ry:A.H*.07});
const stickY=()=>{const d=drum();return d.y-d.ry-A.H*.02-G.lift*A.H*.45};
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Hit, shake or blow hard: loud.',W/2,H*.32,16);txt(g,'Gently: quiet.',W/2,H*.48,16);txt(g,'High and low are something else.',W/2,H*.64,14);return}
 if(v==='sort'){const tr=trays();[['📢 Loud'],['🤫 Quiet']].forEach(([n],i)=>{box(g,tr[i].x,tr[i].y,tr[i].w,tr[i].h,i?C.vi:C.or,.16);txt(g,n,tr[i].x+tr[i].w/2,tr[i].y+tr[i].h/2,17)});
  if(G.i<SOUNDS.length){const[e,n]=SOUNDS[G.i],d=G.hold||{x:W/2,y:H*.32};box(g,d.x-W*.22,d.y-H*.14,W*.44,H*.28,G.red?C.rd:C.cy,.18,G.red?C.rd:C.tx,G.red?4:2);emo(g,e,d.x,d.y-H*.03,34);txt(g,n,d.x,d.y+H*.08,14)}
  txt(g,`Sorted ${G.i} of ${SOUNDS.length}`,W/2,fz(12),12,600)}
 if(v==='drum'){const d=drum(),job=DRUM[Math.min(G.ok,2)];txt(g,G.ok<3?(job==='loud'?'Make a LOUD bang':'Now a quiet tap'):'Well played!',W/2,fz(14),15);
  rings(g,d.x,d.y-d.ry,G.amt,G.amt>.5?C.rd:C.cy);g.fillStyle=A.alpha(C.or,.55);g.fillRect(d.x-d.rx,d.y,d.rx*2,H*.16);g.strokeStyle=C.tx;g.lineWidth=2.5;g.strokeRect(d.x-d.rx,d.y,d.rx*2,H*.16);
  g.fillStyle=A.mix(C.pn,'#ffffff',.5);g.beginPath();g.ellipse(d.x,d.y,d.rx,d.ry,0,0,7);g.fill();g.stroke();
  const sy=stickY();g.strokeStyle=A.mix(C.tx,C.or,.3);g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(d.x+d.rx*.9,sy-H*.12);g.lineTo(d.x+d.rx*.1,sy);g.stroke();A.paint.ball(d.x+d.rx*.1,sy,W*.022,C.pk);
  if(G.word)txt(g,G.word,W*.18,H*.42,G.amt>.5?26:12);meter(g,W*.7,H*.5,G.lv);txt(g,G.drag?(G.lift>.5?'high up: a hard hit':'a little way: a gentle hit'):'Drag the stick up, then let go',W/2,H*.96,11,600)}
 if(v==='shake'){const[who,want]=SHAKE[Math.min(G.ok,1)],sx=W*.5+(G.wig||0)*W*.08;txt(g,G.ok<2?(who==='baby'?'Shh! Baby is asleep. Play quietly.':'The band is marching. Play loud!'):'Both done!',W/2,fz(14),14);
  emo(g,G.ok<2?(who==='baby'?(G.woke?'😭':'😴'):(G.sad?'🙁':'🥁🎺')):'🎉',W*.2,H*.36,40);if(G.ok<2&&who==='baby')txt(g,'baby',W*.2,H*.52,11,600);if(G.ok<2&&who==='band')txt(g,'band',W*.2,H*.52,11,600);
  rings(g,sx,H*.5,G.amt,G.amt>.5?C.rd:C.cy);g.fillStyle=A.alpha(C.gr,.7);g.beginPath();g.ellipse(sx,H*.5,W*.07,H*.1,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;g.stroke();g.fillRect(sx-W*.015,H*.6,W*.03,H*.16);
  meter(g,W*.7,H*.4,G.lv);if(G.word)txt(g,G.word,W*.75,H*.6,G.amt>.5?20:11);txt(g,'Drag the shaker side to side: a little, or a lot',W/2,H*.93,11,600)}
 if(v==='blow'){const[who]=BLOW[Math.min(G.ok,1)];txt(g,G.ok<2?(who==='kitten'?'Play softly for the kitten.':'Call Dad. He is far away!'):'Both done!',W/2,fz(14),14);
  emo(g,'🧒',W*.14,H*.5,38);g.fillStyle=A.alpha(C.am,.85);g.beginPath();g.moveTo(W*.22,H*.5);g.lineTo(W*.5,H*.46);g.lineTo(W*.62,H*.36);g.lineTo(W*.62,H*.64);g.lineTo(W*.5,H*.54);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  if(G.breath>0){g.strokeStyle=C.cy;g.lineWidth=3+G.breath*6;g.beginPath();g.moveTo(W*.2,H*.5);g.lineTo(W*.2+G.breath*W*.3,H*.5);g.stroke()}
  rings(g,W*.62,H*.5,G.amt,G.amt>.5?C.rd:C.cy);emo(g,G.ok<2?(who==='kitten'?(G.woke?'🙀':'🐱'):(G.sad?'👨❔':'👨')):'🎉',W*.88,H*.5,34);meter(g,W*.62,H*.86,G.lv);if(G.word)txt(g,G.word,W*.5,H*.24,G.amt>.5?20:11);
  txt(g,'Drag from the mouth: a short breath or a big breath',W/2,H*.96,11,600)}
 if(v==='bell'){const want=BELL[Math.min(G.ok,2)];txt(g,G.ok<3?(want==='high'?'Make a HIGH sound, like a bird 🐦':'Make a LOW sound, like a bear 🐻'):'Well done!',W/2,fz(14),14);
  const bb=bellBox(0),tb=bellBox(1);box(g,bb.x,bb.y,bb.w,bb.h,C.or,G.hit===0?.3:.1,G.red===0?C.rd:C.tx,G.red===0?4:2);box(g,tb.x,tb.y,tb.w,tb.h,C.cy,G.hit===1?.3:.1,G.red===1?C.rd:C.tx,G.red===1?4:2);
  emo(g,'🔔',bb.x+bb.w/2,bb.y+bb.h*.42,62);emo(g,'🔔',tb.x+tb.w/2,tb.y+tb.h*.42,26);txt(g,'big bell',bb.x+bb.w/2,bb.y+bb.h*.86,12);txt(g,'tiny bell',tb.x+tb.w/2,tb.y+tb.h*.86,12);
  if(G.hit!=null){wave(g,W*.1,H*.86,W*.8,G.hit===1,G.hit?C.cy:C.or);txt(g,G.hit?'ding: high':'dong: low',W/2,H*.75,13)}}
 A.fx.draw(g)}
const bellBox=i=>({x:i?A.W*.56:A.W*.06,y:A.H*.14,w:A.W*.38,h:A.H*.5});
/* rings fade out over about a second; reduced motion shows one still frame */
function ring(amt){G.amt=amt;G.ring={t:0};if(A.reduced()){G.ring.t=.3;return A.redraw()}A.tween(G.ring,{t:1},1000,'out',()=>{G.ring=null;A.redraw()})}
const no=t=>{A.sound.miss();speak(t);buttons();A.redraw()},yes=t=>{G.red=null;A.sound.pop();speak(t);buttons();A.redraw();G.want()};
function sortAs(k){G.hold=null;if(G.i>=SOUNDS.length)return;const[,n,ans]=SOUNDS[G.i];
 if(k!==ans){G.red=1;setTimeout(()=>{G.red=0;A.redraw()},A.reduced()?10:600);return no(ans?`Listen: ${n} softly. That is a quiet sound.`:`${n[0].toUpperCase()+n.slice(1)}. You hear it from far away. That is loud.`)}
 G.i++;G.red=0;A.sound.tick();if(G.i<SOUNDS.length){speak((ans?'Quiet':'Loud')+'! Next sound.');buttons();return A.redraw()}yes('All sorted. Loud sounds are big. Quiet sounds are soft.')}
/* the drum: how high the stick is lifted sets how hard it hits */
function hit(lift){if(G.ok>=3)return;G.lift=0;G.drag=null;const loud=lift>.5;G.lv=loud?5:1;G.word=loud?'BOOM!':'tap';ring(loud?1:.2);play(110,loud,.6);const want=DRUM[G.ok];
 if((want==='loud')!==loud)return no(loud?'BOOM! That was loud. A hard hit is loud. For a quiet tap, lift the stick just a little.':'tap… That was quiet. A gentle hit is quiet. Lift the stick high and hit hard for a loud bang.');
 G.ok++;yes(loud?'BOOM! A hard hit makes a loud sound.':'tap. A gentle hit makes a quiet sound.')}
function shake(hard){if(G.ok>=2)return;const[who,want]=SHAKE[G.ok];G.lv=hard?5:1;G.word=hard?'CHK CHK!':'shh shh';ring(hard?1:.2);play(hard?700:650,hard,.25);G.woke=0;G.sad=0;
 if((want==='loud')!==hard){if(who==='baby')G.woke=1;else G.sad=1;return no(hard?'Oh no, baby woke up! A hard shake is loud. Shake it gently.':'The band cannot hear you. A gentle shake is quiet. Shake it hard!')}
 G.ok++;G.woke=0;G.sad=0;yes(hard?'The band hears you! A hard shake makes a loud sound.':'Baby is still asleep. A gentle shake makes a quiet sound.')}
function blow(big){if(G.ok>=2)return;const[who,want]=BLOW[G.ok];G.breath=0;G.lv=big?5:1;G.word=big?'TOOT!':'toot';ring(big?1:.2);play(392,big,.5);G.woke=0;G.sad=0;
 if((want==='loud')!==big){if(who==='kitten')G.woke=1;else G.sad=1;return no(big?'The kitten jumped! A big breath is loud. Blow softly.':'Dad cannot hear that. A soft breath is quiet. Take a big breath and blow hard!')}
 G.ok++;yes(big?'Dad hears you! Blowing hard makes a loud sound.':'The kitten stays calm. Blowing softly makes a quiet sound.')}
function bell(i){if(G.ok>=3)return;const want=BELL[G.ok],high=i===1;G.hit=i;G.lv=3;play(high?1568:196,true,.7);
 if((want==='high')!==high){G.red=i;setTimeout(()=>{G.red=null;A.redraw()},A.reduced()?10:600);return no(high?'Ding! That is a high sound, like a bird. The big bell makes the low sound.':'Dong! That is a low sound, like a bear. The tiny bell makes the high sound.')}
 G.ok++;G.red=null;yes(high?'Ding! The tiny bell is high. It is not louder, just higher.':'Dong! The big bell is low. It is not quieter, just lower.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='sort'&&G.i<SOUNDS.length){B('📢 Loud',()=>sortAs(0),'It is a loud sound');B('🤫 Quiet',()=>sortAs(1),'It is a quiet sound')}
 if(v==='drum'&&G.ok<3){B('🥁 Gentle tap',()=>hit(.25),'Lift the stick a little and tap gently');B('🥁 Hard hit',()=>hit(.9),'Lift the stick high and hit hard')}
 if(v==='shake'&&G.ok<2){B('👋 Shake gently',()=>shake(false),'Shake the shaker gently');B('💪 Shake hard',()=>shake(true),'Shake the shaker hard')}
 if(v==='blow'&&G.ok<2){B('🎺 Blow softly',()=>blow(false),'Blow softly into the trumpet');B('🎺 Blow hard',()=>blow(true),'Take a big breath and blow hard')}
 if(v==='bell'&&G.ok<3){B('🔔 Big bell',()=>bell(0),'Tap the big bell');B('🔔 Tiny bell',()=>bell(1),'Tap the tiny bell')}}
function down(p){const v=part();
 if(v==='sort'&&G.i<SOUNDS.length&&Math.abs(p.x-A.W/2)<A.W*.24&&Math.abs(p.y-A.H*.32)<A.H*.16){G.hold={x:p.x,y:p.y};return true}
 if(v==='drum'&&G.ok<3){const d=drum();if(Math.abs(p.x-d.x)<d.rx*1.3&&p.y<d.y+d.ry){G.drag={y0:p.y};G.lift=0;return true}}
 if(v==='shake'&&G.ok<2&&Math.abs(p.x-A.W*.5)<A.W*.2){G.drag={x:p.x,trav:0};return true}
 if(v==='blow'&&G.ok<2&&p.x<A.W*.35){G.drag={x0:p.x};G.breath=0;return true}
 if(v==='bell'){[0,1].forEach(i=>{if(inside(p,bellBox(i)))bell(i)})}return false}
function move(p){const v=part(),d=G.drag;if(G.hold){G.hold.x=p.x;G.hold.y=p.y;return A.redraw()}if(!d)return;
 if(v==='drum'){G.lift=Math.max(0,Math.min(1,(drum().y-p.y)/(A.H*.55)));A.redraw()}
 if(v==='shake'){d.trav+=Math.abs(p.x-d.x);d.x=p.x;G.wig=Math.max(-1,Math.min(1,(p.x-A.W*.5)/(A.W*.08)));A.redraw()}
 if(v==='blow'){G.breath=Math.max(0,Math.min(1,(p.x-d.x0)/(A.W*.4)));A.redraw()}}
function up(p){const v=part(),d=G.drag;
 if(G.hold){const tr=trays(),h=G.hold;G.hold=null;if(inside(h,tr[0]))return sortAs(0);if(inside(h,tr[1]))return sortAs(1);return A.redraw()}
 if(!d)return;G.drag=null;
 if(v==='drum'){const l=G.lift;if(l<.05){G.lift=0;speak('Drag the stick up first, then let go.');return A.redraw()}return hit(l)}
 if(v==='shake'){G.wig=0;if(d.trav<A.W*.04)return A.redraw();return shake(d.trav>A.W*.5)}
 if(v==='blow'){const b=G.breath;if(b<.05)return A.redraw();return blow(b>.5)}}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++G.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===G.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const clean=()=>{const t=(G.tok||0)+1;Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,{tok:t,want:()=>{},i:0,ok:0,red:null,hold:null,drag:null,lift:0,lv:0,word:'',amt:0,ring:null,wig:0,breath:0,woke:0,sad:0,hit:null})};
const steps=[
{h:'Loud or quiet?',p:'Some sounds are loud. Some are quiet. Put each one in a box.',task:'Sort 6 sounds',
 show:()=>{steps[0].go();seq(SOUNDS.map(s=>()=>sortAs(s[2])),250)},
 go:()=>{clean();speak('A lion roars. Loud or quiet?');buttons();G.want=ok(0,()=>G.i>=SOUNDS.length,'Loud sounds are big. Quiet sounds are soft.')}},
{h:'Bang the drum',p:'Lift the stick a little for a gentle tap. Lift it high for a hard hit.',predict:{q:'How do you make a LOUD sound on a drum?',opts:['Hit it gently','Hit it hard'],ans:1},task:'Make loud, then quiet, then loud',
 show:()=>{steps[1].go();seq([()=>hit(.9),()=>hit(.25),()=>hit(.9)],500)},
 go:()=>{clean();speak('Make a loud bang on the drum.');buttons();G.want=ok(1,()=>G.ok>=3,'Hit hard: loud. Hit gently: quiet.')}},
{h:'Shake it',p:'A gentle shake is quiet. A hard shake is loud.',task:'Play for the baby, then for the band',
 show:()=>{steps[2].go();seq([()=>shake(false),()=>shake(true)],600)},
 go:()=>{clean();speak('Shh, the baby is asleep. Play the shaker quietly.');buttons();G.want=ok(2,()=>G.ok>=2,'Gentle shake for quiet, hard shake for loud.')}},
{h:'Blow it',p:'A soft breath makes a quiet toot. A big breath makes a loud toot.',predict:{q:'Dad is far away. How do you blow the trumpet so he hears?',opts:['Softly','Hard'],ans:1},task:'Toot for the kitten, then call Dad',
 show:()=>{steps[3].go();seq([()=>blow(false),()=>blow(true)],600)},
 go:()=>{clean();speak('Play softly for the kitten.');buttons();G.want=ok(3,()=>G.ok>=2,'Blow softly for quiet, blow hard for loud.')}},
{h:'High or low?',p:'High and low are not loud and quiet. A bird sings high. A bear growls low.',predict:{q:'Big bell or tiny bell: which one rings high?',opts:['The big bell','The tiny bell'],ans:1},task:'Make high, low, then high',
 show:()=>{steps[4].go();seq([()=>bell(1),()=>bell(0),()=>bell(1)],500)},
 go:()=>{clean();speak('Make a high sound, like a bird.');buttons();G.want=ok(4,()=>G.ok>=3,'Tiny bell: high. Big bell: low. Both can be loud or quiet.')}},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['😴 Baby is asleep. How do you play the drum?',[['Gently, so it is quiet','ok'],['Hard, so it is loud','hard'],['Lots of taps, very fast','fast']]],
 ['You want a LOUD shaker. What do you do?',[['Shake it hard','ok'],['Shake it gently','gentle'],['Hold it still','still']]],
 ['Which sound is loud?',[['🚒 A fire engine','ok'],['🤫 A whisper','whisper'],['🐱 A cat purring','purr']]],
 ['🔔 A tiny bell goes ding. Its sound is…',[['High','ok'],['Low','low'],['Loud, because it is high','mix']]],
 ['🎺 You blow softly into a toy trumpet. The sound is…',[['Quiet','ok'],['Loud','loudblow'],['Higher than a bird','pitch']]],
 ['🥁 Tap the drum gently. Then hit it hard. Which is louder?',[['The hard hit','ok'],['The gentle tap','gtap'],['Same drum, so the same','same']]]];
function why(t){let m='Hard makes loud. Gently makes quiet.';
 if(t==='hard')m='A hard hit is loud. It would wake the baby. Tap gently.';
 if(t==='fast')m='Lots of fast taps make lots of noise, and baby wakes up. Play a few gentle taps.';
 if(t==='gentle')m='A gentle shake is quiet. Shake hard for a loud sound.';
 if(t==='still')m='A still shaker makes no sound. Things must move to make a sound.';
 if(t==='whisper')m='A whisper is very quiet. A fire engine is loud.';
 if(t==='purr')m='A purr is soft and quiet. The fire engine is the loud one.';
 if(t==='low')m='Big bells make low sounds. A tiny bell rings high, like a bird.';
 if(t==='mix')m='High is not the same as loud. A tiny bell is high, and it can ring loud or quiet.';
 if(t==='loudblow')m='A soft breath gives a quiet toot. Blow hard for loud.';
 if(t==='pitch')m='Blowing softly makes it quieter, not higher like a bird.';
 if(t==='gtap')m='A gentle tap is quiet. The hard hit is louder.';
 if(t==='same')m='It is the same drum, but a harder hit makes a louder sound.';
 return m}
function nextQ(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
