/* Flagship – exploring with my five senses (ages 2–3): send each thing to the body part that senses it, find toys in a
   feely bag by touch alone, pick the sense word that fits, sort food from look-only things, and explore a pine cone. */
(()=>{const lo=Math.min,dist=Math.hypot;
 const PART=[['eyes','👀','see','see'],['ears','👂','hear','hear'],['nose','👃','smell','smells'],['mouth','👅','taste','tastes'],['hands','✋','feel','feel']];
 const THING=[['🌈','a rainbow',0],['🔔','a bell',1],['🌸','a flower',2],['🍓','a strawberry',3],['🧸','a teddy',4]];
 const BAG=[['soft and fluffy',0],['hard and cold',1],['squishy and wet',2]],TOY=[['🧸','teddy','soft'],['🪨','rock','hard'],['🧽','sponge','squishy']];
 const WORD=[['🥁','drum',1,'How does it sound?',[['loud',1],['fluffy',4],['sweet',3]]],['🍋','lemon',3,'How does it taste?',[['shiny',0],['sour',3],['loud',1]]],
  ['🐑','lamb',4,'How does it feel?',[['smelly',2],['quiet',1],['soft',4]]],['🧦','old sock',2,'How does it smell?',[['smelly',2],['red',0],['sweet',3]]]];
 const SAFE=[['🍌','banana',0],['🧼','soap',1],['🍄','mushroom from the park',1],['🍎','apple',0],['🖍️','crayon',1]];
 const SAFEWHY={soap:'Soap is for washing hands, not for eating. Look and sniff only.','mushroom from the park':'Never taste things from the park. Some can make you very ill. Just look.',crayon:'Crayons are for drawing. Do not put them in your mouth.',banana:'A banana from a grown-up is food. It can go on the plate.',apple:'An apple from a grown-up is food. It can go on the plate.'};
 const CONE=['It is brown, with lots of little scales.','Tap tap! It makes a soft click.','It smells like a tree.','','It feels prickly and bumpy.'];
VIS.reg('flagsense',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const S={ti:0,tok:0,wrong:-1,felt:0,bi:0,bok:0,wi:0,wok:0,sorted:[],cone:[],stop:0,grab:null,at:null,from:null,want:()=>{},gen:0,Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['match','bag','words','safe','cone','quiz'][A.step];
 const fs=z=>A.narrow?z:z+3;
 const write=(x,t,X,Y,z,k,b)=>{x.font=`${b||800} ${fs(z)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const tile=(x,R,k,on,a)=>{x.fillStyle=A.alpha(k,a||.15);A.paint.rrect(R.x,R.y,R.w,R.h,16);x.fill();x.strokeStyle=k;x.lineWidth=on?4:2;x.stroke()};
 const hit=(p,R)=>p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h,miss=t=>{A.sound.miss();say(t);A.redraw()};
 const partR=i=>{const g=8,w=(A.W-6*g)/5,h=lo(96,A.H*.24);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const three=i=>{const g=10,w=(A.W-4*g)/3,h=lo(92,A.H*.22);return{x:g+i*(w+g),y:A.H-h-14,w,h}};
 const two=i=>{const g=12,w=(A.W-3*g)/2,h=lo(110,A.H*.27);return{x:g+i*(w+g),y:A.H-h-12,w,h}};
 const big=()=>({x:A.W/2,y:A.H*.3});
 function partRow(x,glow){PART.forEach((p,i)=>{const R=partR(i);tile(x,R,S.wrong===i?A.col.rd:A.col.cy,S.wrong===i||glow===i);write(x,p[1],R.x+R.w/2,R.y+R.h*.38,22,A.col.tx);write(x,p[0],R.x+R.w/2,R.y+R.h*.78,12,A.col.tx)})}
 function matchV(x){const C=A.col;if(S.tok>=5)return write(x,'Every thing found its body part!',A.W/2,A.H*.4,16,C.gr);
  const t=THING[S.ti],P=S.grab!=null&&S.at?S.at:big();write(x,'Which part helps?',A.W/2,A.H*.08,15,C.mu,700);write(x,t[0],P.x,P.y,46,C.tx);write(x,t[1],A.W/2,A.H*.48,16,C.tx);partRow(x)}
 function bagV(x){const C=A.col;if(S.bok>=3)return write(x,'You found all three by feel!',A.W/2,A.H*.4,16,C.gr);
  const B={x:A.W*.3,y:A.H*.06,w:A.W*.4,h:A.H*.38};x.fillStyle=A.alpha(C.or,.55);A.paint.rrect(B.x,B.y+14,B.w,B.h-14,26);x.fill();x.strokeStyle=C.or;x.lineWidth=3;x.stroke();
  x.fillStyle=A.alpha(C.or,.8);A.paint.rrect(B.x+B.w*.3,B.y,B.w*.4,22,8);x.fill();write(x,S.felt?'✋':'?',A.W/2,B.y+B.h*.58,34,C.tx,900);
  write(x,S.felt?'It feels '+BAG[S.bi][0]+'.':'Tap Feel to put your hand in.',A.W/2,A.H*.52,15,S.felt?C.tx:C.mu);
  TOY.forEach((t,i)=>{const R=three(i);tile(x,R,S.wrong===i?C.rd:C.vi,S.wrong===i);write(x,t[0],R.x+R.w/2,R.y+R.h*.42,30,C.tx);write(x,t[1],R.x+R.w/2,R.y+R.h*.82,13,C.tx)})}
 function wordsV(x){const C=A.col;if(S.wok>=4)return write(x,'Four good sense words!',A.W/2,A.H*.4,16,C.gr);
  const w=WORD[S.wi];write(x,w[0],A.W*.38,A.H*.2,44,C.tx);write(x,PART[w[2]][1],A.W*.64,A.H*.2,34,C.tx);write(x,w[3],A.W/2,A.H*.43,16,C.tx);
  w[4].forEach((o,j)=>{const R=three(j);tile(x,R,S.wrong===j?C.rd:C.vi,S.wrong===j);write(x,o[0],R.x+R.w/2,R.y+R.h/2,18,C.tx)})}
 function safeV(x){const C=A.col;['🍽️ Food to taste','👀 Look only'].forEach((l,i)=>{const R=two(i);tile(x,R,i?C.rd:C.gr,S.wrong===i,.12);write(x,l,R.x+R.w/2,R.y+18,13,C.tx);
   SAFE.forEach((s,k)=>{const n=S.sorted.indexOf(k);if(n<0||s[2]!==i)return;const m=S.sorted.filter((q,j)=>j<n&&SAFE[q][2]===i).length;write(x,s[0],R.x+22+m*(R.w-30)/3,R.y+R.h*.62,24,C.tx)})});
  const k=SAFE.findIndex((s,i)=>!S.sorted.includes(i));if(k<0)return write(x,'All sorted. Taste only food from a grown-up.',A.W/2,A.H*.3,15,C.gr);
  const P=S.grab!=null&&S.at?S.at:big();write(x,SAFE[k][0],P.x,P.y,46,C.tx);write(x,SAFE[k][1],A.W/2,A.H*.48,15,C.tx)}
 function coneV(x){const C=A.col,X=A.W/2,Y=A.H*.27,r=lo(A.W,A.H)*.13;x.fillStyle='#8b5a2b';x.beginPath();x.ellipse(X,Y,r*.7,r*1.15,0,0,7);x.fill();
  x.strokeStyle='#5c3a18';x.lineWidth=2;for(let i=-3;i<=2;i++){x.beginPath();x.arc(X,Y+i*r*.3,r*.55,.4,Math.PI-.4);x.stroke()}
  const last=S.cone[S.cone.length-1];write(x,S.stop?'Stop! A pine cone is not food. Do not taste it.':last!=null?CONE[last]:'Pick a body part to explore the pine cone.',A.W/2,A.H*.56,14,S.stop?C.rd:C.tx);
  write(x,`Senses used: ${S.cone.length} of 3`,A.W/2,A.H*.64,13,C.mu,700);partRow(x,last)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);x.fillRect(0,0,W,H);
  const f={match:matchV,bag:bagV,words:wordsV,safe:safeV,cone:coneV}[v];if(f)f(x);else write(x,S.Q?S.Q.pic:'?',W/2,H/2,60,C.tx);A.fx.draw(x)}
 function send(i){if(S.tok>=5)return;const t=THING[S.ti];if(i!==t[2]){S.wrong=i;return miss(`Your ${PART[i][0]} can not ${PART[t[2]][2]} ${t[1]}. Which part can?`)}
  S.wrong=-1;S.tok++;S.ti=lo(4,S.tok);A.sound.pop();tell(`Yes! Your ${PART[i][0]} ${PART[i][3]} ${t[1]}.`)}
 function feel(){if(S.bok>=3||S.felt)return;S.felt=1;A.sound.tick();tell('Your hand feels something '+BAG[S.bi][0]+'.')}
 function pick(i){if(S.bok>=3)return;if(!S.felt){S.wrong=i;return miss('You can not see inside the bag. Feel first!')}
  if(i!==BAG[S.bi][1]){S.wrong=i;return miss(`A ${TOY[i][1]} is ${TOY[i][2]}, not ${BAG[S.bi][0]}. Think about what you felt.`)}
  S.wrong=-1;S.bok++;S.bi=lo(2,S.bok);S.felt=0;A.sound.pop();tell(`It was the ${TOY[i][1]}! Your hand found it.`)}
 function word(j){if(S.wok>=4)return;const w=WORD[S.wi],o=w[4][j];if(o[1]!==w[2]){S.wrong=j;return miss(`${o[0][0].toUpperCase()+o[0].slice(1)} is a word for your ${PART[o[1]][0]}. The question is about your ${PART[w[2]][0]}.`)}
  S.wrong=-1;S.wok++;S.wi=lo(3,S.wok);A.sound.pop();tell(`Yes, the ${w[1]} is ${o[0]}.`)}
 function place(b){const k=SAFE.findIndex((s,i)=>!S.sorted.includes(i));if(k<0)return;if(SAFE[k][2]!==b){S.wrong=b;return miss(SAFEWHY[SAFE[k][1]])}
  S.wrong=-1;S.sorted.push(k);A.sound.pop();tell(b?`The ${SAFE[k][1]} is for looking, not tasting.`:`The ${SAFE[k][1]} is food from a grown-up.`)}
 function sense(i){if(S.cone.length>=3)return;if(i===3){S.stop=1;return miss('Stop! A pine cone is not food. Do not taste it. Try another part.')}
  S.stop=0;if(!S.cone.includes(i))S.cone.push(i);else S.cone.push(S.cone.splice(S.cone.indexOf(i),1)[0]);A.sound.tick();tell(`Your ${PART[i][0]}: ${CONE[i]}`)}
 function tell(msg){const v=view();let t;
  if(v==='match')t=S.tok>=5?'All five matched.':`Which part helps with ${THING[S.ti][1]}? Parts: eyes, ears, nose, mouth, hands.`;
  else if(v==='bag')t=S.bok>=3?'All three found by touch.':S.felt?`It feels ${BAG[S.bi][0]}. Is it the teddy, rock or sponge?`:'Something is in the bag. Tap Feel.';
  else if(v==='words')t=S.wok>=4?'Four sense words chosen.':`The ${WORD[S.wi][1]}. ${WORD[S.wi][3]} Words: ${WORD[S.wi][4].map(o=>o[0]).join(', ')}.`;
  else if(v==='safe'){const k=SAFE.findIndex((s,i)=>!S.sorted.includes(i));t=k<0?'All five sorted.':`Where does the ${SAFE[k][1]} go: food to taste, or look only?`}
  else if(v==='cone')t=`Pine cone. Senses used: ${S.cone.length} of 3.`;else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();S.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=view();
  const B=(t,f,off,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='match'&&S.tok<5)PART.forEach((p,i)=>B(p[1]+' '+p[0],()=>send(i),0,'Send to '+p[0]));
  if(v==='bag'&&S.bok<3){B('✋ Feel',feel,S.felt,'Feel inside the bag');TOY.forEach((t,i)=>B(t[0]+' '+t[1],()=>pick(i),0,'It is the '+t[1]))}
  if(v==='words'&&S.wok<4)WORD[S.wi][4].forEach((o,j)=>B(o[0],()=>word(j)));
  if(v==='safe'&&S.sorted.length<5){B('🍽️ Food to taste',()=>place(0));B('👀 Look only',()=>place(1))}
  if(v==='cone'&&S.cone.length<3)PART.forEach((p,i)=>B(p[1]+' '+p[0],()=>sense(i),0,'Explore with your '+p[0]));A.redraw()}
 const ok=(st,cond,msg)=>()=>{if(A.step===st&&cond()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const seq=(fs,gap)=>{const g=S.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===S.gen)f()},A.reduced()?j*20:j*gap))};
 const clear=()=>{S.gen++;S.want=()=>{};S.Q=null;S.grab=null;S.at=null;S.wrong=-1};
 const steps=[
  {h:'Which part helps?',p:'Your body has five helpers. Drag each thing to the part that finds it out, or tap a part.',
   predict:{q:'How do you know a bell is ringing?',opts:['With my eyes','With my ears'],ans:1},task:'Match all five things',
   show:()=>{steps[0].go();seq([0,1,2,3,4].map(i=>()=>send(i)),400)},go:()=>{clear();S.ti=0;S.tok=0;tell();S.want=ok(0,()=>S.tok>=5,()=>'Eyes see, ears hear, nose smells, mouth tastes, hands feel.')}},
  {h:'The feely bag',p:'You can not see in the bag. Feel, then pick what it is.',
   predict:{q:'You can not see in the bag. Can your hands tell what is in it?',opts:['No, I need my eyes','Yes, my hands can feel it'],ans:1},task:'Find three things just by feeling',
   show:()=>{steps[1].go();seq([feel,()=>pick(0),feel,()=>pick(1),feel,()=>pick(2)],350)},go:()=>{clear();S.bi=0;S.bok=0;S.felt=0;tell();S.want=ok(1,()=>S.bok>=3,()=>'Your hands found all three, with no looking.')}},
  {h:'Sense words',p:'Words tell what your senses found. Pick the word that fits.',task:'Pick four sense words',
   show:()=>{steps[2].go();seq([0,1,2,0].map(j=>()=>word(j)),400)},go:()=>{clear();S.wi=0;S.wok=0;tell();S.want=ok(2,()=>S.wok>=4,()=>'Loud for ears, sour for tongues, soft for hands, smelly for noses.')}},
  {h:'Look, do not taste',p:'Some things are food. Some things are just for looking. Drag each one to a box.',
   predict:{q:'A red mushroom in the park looks yummy. Can you taste it?',opts:['Yes, it looks yummy','No, just look'],ans:1},task:'Sort all five things',
   show:()=>{steps[3].go();seq(SAFE.map(s=>()=>place(s[2])),400)},go:()=>{clear();S.sorted=[];tell();S.want=ok(3,()=>S.sorted.length>=5,()=>'Only taste food a grown-up gives you.')}},
  {h:'Explore a pine cone',p:'Use your senses on the pine cone. Tap a body part to try it.',task:'Use three senses on the pine cone',
   show:()=>{steps[4].go();seq([0,4,2].map(i=>()=>sense(i)),400)},go:()=>{clear();S.cone=[];S.stop=0;tell();S.want=ok(4,()=>S.cone.length>=3,()=>'Many senses tell you more. The mouth stays shut for things that are not food.')}},
  {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ=[['Which part tells you a dog is barking?','🐶',[['Ears','ok'],['Eyes','eyes'],['Nose','nose']]],
  ['How can you find out a kitten is soft?','🐱',[['Stroke it gently with your hand','ok'],['Just look at it','look'],['Lick it','lick']]],
  ['Which part smells a flower?','🌸',[['Nose','ok'],['Mouth','mouth'],['Ears','ears']]],
  ['You find a sweet on the floor at the shop. What do you do?','🍬',[['Leave it and tell a grown-up','ok'],['Eat it','eat'],['Lick it a little','lick']]],
  ['Which word tells how a drum sounds?','🥁',[['Loud','ok'],['Sweet','sweet'],['Fluffy','fluffy']]],
  ['You can not see in the box. Can you find out what is in it?','📦',[['Yes, feel it with my hands','ok'],['No, never','never'],['Taste it','lick']]]];
 let qn=-1,run=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;S.Q={pic};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'eyes':m='Eyes see the dog. Ears hear the bark.';break;
   case 'nose':m='A nose smells. Ears hear sounds.';break;
   case 'look':m='Looking can not tell you soft. Gentle hands can.';break;
   case 'lick':m='Do not lick it! Mouths are only for food from a grown-up. Use your hands.';break;
   case 'mouth':m='Your mouth tastes. Your nose smells.';break;
   case 'ears':m='Ears hear. Your nose smells the flower.';break;
   case 'eat':m='Never eat things from the floor. Tell a grown-up.';break;
   case 'sweet':m='Sweet is a taste word. Drums are heard, so use an ear word.';break;
   case 'fluffy':m='Fluffy is a feel word. Use an ear word, like loud.';break;
   default:m='Your hands can find out, even with no looking.'}
  const good=tag==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.from=p;S.at=null;S.grab=null;
  if((v==='match'&&S.tok<5)||(v==='safe'&&S.sorted.length<5)){const B=big();if(dist(p.x-B.x,p.y-B.y)<lo(70,A.W*.16)){S.grab=1;return true}
   if(v==='match'){const i=PART.findIndex((q,i)=>hit(p,partR(i)));if(i>=0)send(i)}else{const b=[0,1].find(b=>hit(p,two(b)));if(b!=null)place(b)}return false}
  if(v==='bag'&&S.bok<3){if(p.y<A.H*.46)feel();else{const i=TOY.findIndex((t,i)=>hit(p,three(i)));if(i>=0)pick(i)}return false}
  if(v==='words'&&S.wok<4){const j=[0,1,2].find(j=>hit(p,three(j)));if(j!=null)word(j);return false}
  if(v==='cone'){const i=PART.findIndex((q,i)=>hit(p,partR(i)));if(i>=0)sense(i)}return false}
 function up(p){const v=view(),g=S.grab;S.grab=null;S.at=null;if(g==null)return A.redraw();
  if(v==='match'){const i=PART.findIndex((q,i)=>hit(p,partR(i)));if(i>=0)send(i);else A.redraw()}
  else if(v==='safe'){const b=[0,1].find(b=>hit(p,two(b)));if(b!=null)place(b);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.at=p;A.redraw()},up});refresh()}});
 A.start()})})();
