/* Flagship – social awareness words (7–11): think/feel/do, equality vs equity fence, bias as a pattern, compassion, name it. */
(()=>{
 const LADDER=[['Think','stereotype','an idea about a whole group'],['Feel','prejudice','judging a person before you know them'],['Do','discrimination','treating someone unfairly because of their group']];
 const CHAIN=[['"Girls are bad at football."',0],['"I bet Ella is rubbish. I don\'t want her on my team."',1],['Ella is not allowed to play at break, because she is a girl.',2],
  ['"People with that accent are not clever."',0],['"I don\'t like the new boy. I haven\'t met him, but I can tell."',1],['He is left off the quiz team because of his accent.',2]];
 const KIDS=[['Sam','🧑',0],['Ali','👦',1],['Jo','👧',2]]; // name, face, boxes needed to see over the fence
 // Same stars per pair; Mr Lee scores Red higher.
 const ART=[['🌻','Red',9,4],['🌻','Blue',6,4],['🚀','Red',8,3],['🚀','Blue',5,3],['🐋','Red',10,5],['🐋','Blue',7,5]];
 const HURT=[['😞','Nia sits alone at break.',[['💬 "Want to play with us?"','help'],['🤷 "Oh well, not my problem."','pass'],['😆 Laugh with friends','tease']]],
  ['🥪','Raj drops his lunch tray.',[['🤝 Help him pick it up','help'],['👀 Watch and feel sorry','pity'],['📸 Take a photo','tease']]],
  ['🤕','Kim falls and hurts her knee.',[['🧑‍🏫 Ask "Are you OK?" and get a grown-up','help'],['🏃 Keep running','pass'],['👀 Watch and feel sorry','pity']]]];
 const WORDS=['stereotype','prejudice','discrimination','bias','equality','equity','fairness','compassion'];
 const SCENES=[['Everyone gets the same 10 minutes on the computer.','equality'],['Zara can\'t see the board well, so she sits at the front.','equity'],
  ['A shop won\'t let teenagers in, just because they are teenagers.','discrimination'],['Some people think all gamers are lazy.','stereotype'],
  ['Max sees Leo crying and goes to ask what is wrong.','compassion'],['Priya decides she won\'t like the new girl, because of where she is from.','prejudice'],
  ['The ref gives more free kicks to his own school, and he doesn\'t notice he does it.','bias'],['The rules are the same for every team, and there are no favourites.','fairness']];
 const DEF={stereotype:'a fixed idea about a whole group',prejudice:'judging a person before you know them',discrimination:'unfair action against someone because of their group',bias:'a leaning one way, often not noticed',
  equality:'everyone gets the same',equity:'each gets what they need for a fair chance',fairness:'the same rules for all, no favourites',compassion:'caring for someone who is hurting and helping'};
VIS.reg('flagaware',c=>{let A,pad,quiz;
 const st={k:0,bad:null,boxes:[1,1,1],spare:0,flipped:0,named:0,round:0,phase:0,noticed:false,scene:0,drag:null,at:null,tok:0,check:()=>{}};
 const stage=()=>['chain','fence','bias','care','words','quiz'][A.step];

 function announce(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 function wrong(t){A.sound.miss();announce(t);A.redraw()}

 const px=n=>A.narrow?n:Math.round(n*1.15);
 function label(g,t,x,y,n,col,w,max){g.font=`${w||700} ${px(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,max||A.W-16)}
 function para(g,t,x,y,n,col,width){g.font=`600 ${px(n)}px system-ui`;const words=t.split(' '),lines=[];let line='';
  words.forEach(w=>{const test=line?line+' '+w:w;if(g.measureText(test).width>width&&line){lines.push(line);line=w}else line=test});lines.push(line);
  const lh=px(n)*1.3;lines.forEach((l,i)=>label(g,l,x,y+(i-(lines.length-1)/2)*lh,n,col,600,width))}
 function face(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function panel(g,r,col,thick,a){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=thick?4:2;g.stroke()}
 const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const COLS=()=>[A.col.cy,A.col.vi,A.col.rd];
 const cardR=()=>({x:A.W*.05,y:A.H*.04,w:A.W*.9,h:A.H*.24});
 const rungR=i=>({x:A.W*.05,y:A.H*.33+i*A.H*.215,w:A.W*.9,h:A.H*.19});

 function drawChain(g){const C=A.col;if(st.k>=CHAIN.length)return para(g,'Think → feel → do. A stereotype can grow into prejudice, then discrimination.',A.W/2,A.H*.45,15,C.gr,A.W*.85);
  const r=cardR();panel(g,r,C.or,true,.16);para(g,CHAIN[st.k][0],r.x+r.w/2,r.y+r.h/2,14,C.tx,r.w-20);
  LADDER.forEach(([verb,word,mean],i)=>{const q=rungR(i);panel(g,q,COLS()[i],st.bad===i,st.bad===i?.3:.12);label(g,`${verb}: ${word}`,q.x+q.w/2,q.y+q.h*.34,15,C.tx,800);label(g,mean,q.x+q.w/2,q.y+q.h*.72,11,C.mu,600)})}
 const kidX=i=>A.W*(.2+i*.3);
 function sees(i){return st.boxes[i]>=KIDS[i][2]}
 function drawFence(g){const C=A.col,ground=A.H*.78,box=Math.min(36,A.H*.09),fenceTop=ground-box*3.4;
  face(g,'⚽',A.W*.5,A.H*.08,30);label(g,'The match',A.W*.5,A.H*.17,12,C.mu);
  KIDS.forEach(([name,f,need],i)=>{const x=kidX(i);for(let b=0;b<st.boxes[i];b++){g.fillStyle='#b45309';A.paint.rrect(x-box*.8,ground-(b+1)*box,box*1.6,box-3,4);g.fill()}
   const base=ground-st.boxes[i]*box,height=box*(3.8-need*.9);g.fillStyle=A.alpha(C.tx,.75);A.paint.rrect(x-10,base-height,20,height,8);g.fill();
   const eye=base-height;face(g,sees(i)?'😀':'😕',x,eye-14,30);label(g,`${name}: ${sees(i)?'can see':'can\'t see'}`,x,ground+16,12,sees(i)?C.gr:C.rd,800);label(g,`${st.boxes[i]} ${st.boxes[i]===1?'box':'boxes'}`,x,ground+34,11,C.mu)});
  g.fillStyle=A.alpha('#92400e',.85);g.fillRect(0,fenceTop,A.W,ground-fenceTop);g.fillStyle='#fde68a';label(g,'FENCE',A.W/2,(fenceTop+ground)/2,12,'#fff',800);
  label(g,`Spare boxes: ${st.spare}`,A.W*.5,A.H*.95,12,C.tx)}
 const artR=i=>{const cols=3,gap=8,w=(A.W-gap*(cols+1))/cols,h=Math.min(100,A.H*.24);return{x:gap+(i%cols)*(w+gap),y:A.H*.05+Math.floor(i/cols)*(h+gap),w,h}};
 function drawBias(g){const C=A.col;ART.forEach(([e,team,score,q],i)=>{const r=artR(i),open=i<st.flipped,col=team==='Red'?C.rd:C.cy;panel(g,r,col,false,open?.2:.06);face(g,e,r.x+r.w*.3,r.y+r.h*.4,30);
   label(g,`${team} · ${'★'.repeat(q)}`,r.x+r.w/2,r.y+r.h*.82,10,C.tx);label(g,open?String(score):'?',r.x+r.w*.72,r.y+r.h*.4,22,open?C.tx:C.mu,800)});
  const sum=t=>ART.slice(0,st.flipped).filter(a=>a[1]===t).reduce((s,a)=>s+a[2],0),y0=A.H*.62,maxW=A.W*.6;
  ['Red','Blue'].forEach((t,j)=>{const y=y0+j*A.H*.1,col=t==='Red'?C.rd:C.cy;label(g,t,A.W*.12,y,13,C.tx,800);g.fillStyle=A.alpha(col,.7);g.fillRect(A.W*.22,y-10,maxW*sum(t)/27,20);label(g,String(sum(t)),A.W*.22+maxW*sum(t)/27+18,y,12,C.tx)});
  label(g,st.named?'Same stars, more points for Red: bias.':st.flipped>=ART.length?'Same stars in each pair. What do you notice?':'★ = how good the drawing is (other judges agreed).',A.W/2,A.H*.86,12,st.named?C.gr:C.mu,700)}
 const kidSpot=i=>({x:A.W*(.06+i*.18),y:A.H*.1,w:A.W*.16,h:A.H*.28});
 const actR=i=>({x:A.W*.05,y:A.H*.48+i*A.H*.16,w:A.W*.9,h:A.H*.13});
 function drawCare(g){const C=A.col;if(st.round>=HURT.length)return para(g,'Notice, care, help: that is compassion.',A.W/2,A.H*.4,16,C.gr,A.W*.8);const[e,text,acts]=HURT[st.round],who=st.round+2;
  ['🙂','😄','🙂','😃','😊'].forEach((f,i)=>{const r=kidSpot(i),hurt=i===who;if(st.noticed&&hurt)panel(g,r,C.gr,true,.2);else if(st.bad===`k${i}`)panel(g,r,C.rd,true,.15);face(g,hurt?e:f,r.x+r.w/2,r.y+r.h/2,Math.min(40,r.h*.5))});
  label(g,st.noticed?text:'Who needs help? Tap them.',A.W/2,A.H*.42,13,C.tx,800);
  if(st.noticed)acts.forEach(([a],i)=>{const r=actR(i);panel(g,r,st.bad===i?C.rd:C.vi,st.bad===i,.14);label(g,a,r.x+r.w/2,r.y+r.h/2,12,C.tx,700,r.w-10)})}
 const wordR=i=>{const cols=A.narrow?2:4,gap=8,w=(A.W-gap*(cols+1))/cols,h=Math.min(48,A.H*(A.narrow?.09:.12));return{x:gap+(i%cols)*(w+gap),y:A.H*(A.narrow?.5:.6)+Math.floor(i/cols)*(h+gap),w,h}};
 function drawWords(g){const C=A.col;if(st.scene>=SCENES.length)return para(g,'All eight words matched!',A.W/2,A.H*.4,16,C.gr,A.W*.8);
  const r={x:A.W*.05,y:A.H*.04,w:A.W*.9,h:A.H*(A.narrow?.38:.46)};panel(g,r,C.or,false,.12);para(g,SCENES[st.scene][0],r.x+r.w/2,r.y+r.h/2,15,C.tx,r.w-24);
  WORDS.forEach((w,i)=>{let q=wordR(i);if(st.drag===i&&st.at)q={...q,x:st.at.x-q.w/2,y:st.at.y-q.h/2};panel(g,q,st.bad===i?C.rd:C.cy,st.bad===i,.14);label(g,w,q.x+q.w/2,q.y+q.h/2,13,C.tx,700,q.w-8)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
  const f={chain:drawChain,fence:drawFence,bias:drawBias,care:drawCare,words:drawWords}[stage()];if(f)f(g);else face(g,'🧭',W/2,H/2,64);A.fx.draw(g)}

 function placeCard(i){if(st.k>=CHAIN.length)return;const want=CHAIN[st.k][1];
  if(i!==want){st.bad=i;if(want===2)return wrong('Something was done to them. Unfair action is discrimination.');if(want===0)return wrong('An idea about a whole group is a stereotype.');return wrong('Nothing was done yet. Judging one person before you know them is prejudice.')}
  st.bad=null;st.k++;A.sound.pop();refresh(`Yes: ${LADDER[i][1]}.`)}
 function takeBox(i){if(st.boxes[i]<1)return wrong(`${KIDS[i][0]} has no box to give.`);st.boxes[i]--;st.spare++;A.sound.tick();refresh(`Took a box from ${KIDS[i][0]}.`)}
 function giveBox(i){if(st.spare<1)return wrong('No spare boxes. Take one from someone who can already see.');st.boxes[i]++;st.spare--;A.sound.tick();
  const extra=st.boxes[i]>KIDS[i][2]?` ${KIDS[i][0]} could already see.`:'';refresh(`Gave a box to ${KIDS[i][0]}.${extra}`)}
 function flip(){if(st.flipped>=ART.length)return;st.flipped++;A.sound.tick();refresh('')}
 function nameIt(w){if(st.flipped<ART.length)return wrong('Flip all six first. One score is not a pattern.');if(w!=='bias')return wrong(w==='equity'?'Equity is giving by need. Red gets more for the same stars.':'Compassion is caring. This judge leans one way.');st.named=1;A.sound.pop();refresh('Yes: bias. A pattern of leaning one way, even with equal work.')}
 function notice(i){if(st.round>=HURT.length||st.noticed)return;if(i!==st.round+2){st.bad=`k${i}`;return wrong('That child looks happy. Find someone sad or hurt.')}st.noticed=true;st.bad=null;A.sound.tick();refresh('You noticed. Now, what do you do?')}
 function act(i){if(!st.noticed||st.round>=HURT.length)return;const tag=HURT[st.round][2][i][1];
  const why={pity:'Feeling sorry is a start. Compassion also wants to help, so do something kind.',pass:'Walking away leaves them hurting. Compassion means you care and help.',tease:'That would make them feel worse. Think how it feels to be them.'}[tag];
 if(why){st.bad=i;return wrong(why)}
 st.bad=null;st.round++;st.noticed=false;A.sound.pop();refresh('That is compassion: notice, care, help.')}
 function matchWord(i){if(st.scene>=SCENES.length)return;const right=SCENES[st.scene][1],picked=WORDS[i];
  if(picked!==right){st.bad=i;return wrong(`Not ${picked}: that means ${DEF[picked]}. Read the scene again.`)}
  st.bad=null;st.scene++;A.sound.pop();refresh(`Yes: ${right}.`)}

 function refresh(msg){const v=stage();let t='';
  if(v==='chain')t=st.k<CHAIN.length?`Card: ${CHAIN[st.k][0]} Think, feel or do?`:'All six cards placed.';
  else if(v==='fence')t=KIDS.map((k,i)=>`${k[0]} has ${st.boxes[i]} and ${sees(i)?'can':'cannot'} see`).join('. ')+`. Spare: ${st.spare}.`;
  else if(v==='bias')t=`${st.flipped} of 6 scores shown.`+(st.flipped?' Last: '+ART[st.flipped-1][1]+' '+ART[st.flipped-1][2]+' points.':'');
  else if(v==='care')t=st.round<HURT.length?(st.noticed?HURT[st.round][1]+' Pick what to do.':'Five children. Who needs help?'):'All three helped.';
  else if(v==='words')t=st.scene<SCENES.length?`Scene: ${SCENES[st.scene][0]} Which word fits?`:'All words matched.';else t='Challenge time.';
  announce((msg?msg+' ':'')+t);controls();st.check()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const v=stage();const b=(t,f,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.onclick=f};
  if(v==='chain'&&st.k<CHAIN.length)LADDER.forEach(([verb,word],i)=>b(`${verb}: ${word}`,()=>placeCard(i)));
  if(v==='fence')KIDS.forEach(([n],i)=>{b(`− ${n}`,()=>takeBox(i),`Take a box from ${n}`);b(`+ ${n}`,()=>giveBox(i),`Give a box to ${n}`)});
  if(v==='bias'){if(st.flipped<ART.length)b('🔄 Flip next score',flip);else if(!st.named)['equity','bias','compassion'].forEach(w=>b(w,()=>nameIt(w),`Name it: ${w}`))}
  if(v==='care'&&st.round<HURT.length){if(!st.noticed)[0,1,2,3,4].forEach(i=>b(`Child ${i+1}`,()=>notice(i)));else HURT[st.round][2].forEach(([a],i)=>b(a,()=>act(i)))}
  if(v==='words'&&st.scene<SCENES.length)WORDS.forEach((w,i)=>b(w,()=>matchWord(i)));A.redraw()}

 function down(p){const v=stage();st.drag=null;st.at=p;
  if(v==='chain'&&st.k<CHAIN.length){const i=[0,1,2].find(i=>within(p,rungR(i)));if(i!=null)placeCard(i);return false}
  if(v==='fence'){const i=KIDS.findIndex((k,i)=>Math.abs(p.x-kidX(i))<A.W*.14);if(i<0)return false;if(p.y>A.H*.5&&st.boxes[i]){st.drag=i;return true}giveBox(i);return false}
  if(v==='bias'){if(ART.some((a,i)=>within(p,artR(i))))flip();return false}
  if(v==='care'&&st.round<HURT.length){if(!st.noticed){const i=[0,1,2,3,4].find(i=>within(p,kidSpot(i)));if(i!=null)notice(i);return false}
   const i=[0,1,2].find(i=>within(p,actR(i)));if(i!=null)act(i);return false}
  if(v==='words'&&st.scene<SCENES.length){const i=WORDS.findIndex((w,i)=>within(p,wordR(i)));if(i<0)return false;st.drag=i;return true}
  return false}
 function up(p){const v=stage(),d=st.drag;st.drag=null;st.at=null;if(d==null)return A.redraw();
  if(v==='fence'){const to=KIDS.findIndex((k,i)=>Math.abs(p.x-kidX(i))<A.W*.14);if(to===d)return A.redraw();takeBox(d);if(to>=0)giveBox(to)}
  if(v==='words'){if(p.y<A.H*.5||within(p,wordR(d)))matchWord(d);else A.redraw()}}

 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const run=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const restart=()=>{st.tok++;st.check=()=>{};st.k=0;st.bad=null;st.boxes=[1,1,1];st.spare=0;st.flipped=0;st.named=0;st.round=0;st.noticed=false;st.scene=0;st.drag=null};
 const steps=[
  {h:'Think, feel, do',p:'Three words that are easy to mix up. A stereotype is a thought, prejudice is a judgement, discrimination is an action. Tap the row each card belongs in.',
   predict:{q:'"Boys can\'t dance." Nobody has done anything yet. Is it discrimination?',opts:['Yes','No, it is a stereotype'],ans:1},task:'Place all six cards',
   show:()=>{steps[0].go();run(CHAIN.map(x=>()=>placeCard(x[1])),350)},go:()=>{restart();refresh();st.check=when(0,()=>st.k>=CHAIN.length,'Stereotype = idea. Prejudice = judging a person. Discrimination = unfair action.')}},
  {h:'Equal or fair?',p:'Equality means everyone gets the same. Equity means everyone gets what they need for a fair chance. Move boxes so all three can see.',
   predict:{q:'Everyone gets one box. Can all three see the match?',opts:['Yes, it is equal','No'],ans:1},task:'Share the 3 boxes so everyone can see',
   show:()=>{steps[1].go();run([()=>takeBox(0),()=>giveBox(2)],500)},go:()=>{restart();refresh();st.check=when(1,()=>KIDS.every((k,i)=>sees(i)),'Same boxes for all was equality. Boxes by need is equity.')}},
  {h:'Spot the bias',p:'Mr Lee judges a drawing contest. He teaches Red class. The stars show how good each drawing is. Tap to flip his scores.',
   predict:{q:'The first Red drawing gets more points than the first Blue one. Is that enough to say he is biased?',opts:['Yes','No, look for a pattern'],ans:1},task:'Flip all six scores and name what you see',
   show:()=>{steps[2].go();run([...ART.map(()=>flip),()=>nameIt('bias')],300)},go:()=>{restart();refresh();st.check=when(2,()=>st.named,'Bias is a leaning for or against a group. It shows up as a pattern.')}},
  {h:'Compassion',p:'Compassion is noticing someone is hurting, caring, and wanting to help. Tap who needs help, then tap what you do.',
   predict:{q:'You feel sorry for someone but do nothing. Is that compassion?',opts:['Yes','Not quite: compassion wants to help'],ans:1},task:'Help all three children',
   show:()=>{steps[3].go();run(HURT.flatMap((h,r)=>[()=>notice(r+2),()=>act(0)]),400)},go:()=>{restart();refresh();st.check=when(3,()=>st.round>=HURT.length,'Notice, care, help.')}},
  {h:'Name it',p:'Read each scene. Drag the word that fits up to it, or tap the word.',task:'Match all eight scenes',
   show:()=>{steps[4].go();run(SCENES.map(s=>()=>matchWord(WORDS.indexOf(s[1]))),350)},go:()=>{restart();refresh();st.check=when(4,()=>st.scene>=SCENES.length,'Eight words, each with its own job.')}},
  {h:'Challenge',p:'',go:()=>{restart();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.check()});

 const QS=[['"All old people are bad with phones." Which word is this?',[['stereotype','ok'],['discrimination','didnt'],['equity','offtopic']]],
  ['A club says no to Leah because she uses a wheelchair. Which word is this?',[['discrimination','ok'],['prejudice','headonly'],['bias','hidden']]],
  ['Ben needs a ramp to get into school. The school builds one. Which word is this?',[['equity','ok'],['equality','same'],['compassion','feeling']]],
  ['Every child gets one sticker, no matter what. Which word is this?',[['equality','ok'],['equity','need'],['bias','nofav']]],
  ['Tia thinks the new boy will be mean, before she has met him. Which word is this?',[['prejudice','ok'],['discrimination','didnt'],['stereotype','group']]],
  ['A teacher always picks boys to answer, and does not notice. Which word is this?',[['bias','ok'],['equality','same'],['compassion','feeling']]]];
 const FB={nofav:'Bias leans one way. Here nobody is favoured: all get the same.',didnt:'Nobody did anything yet. Discrimination is an action.',headonly:'Leah was kept out. That is an action, not just a judgement.',hidden:'Bias is a hidden leaning. This was open unfair treatment.',same:'Equality is the same for all. Look at who got what.',need:'Equity is by need. Here everyone gets the same.',group:'A stereotype is about a whole group. This is judging one person: prejudice.',feeling:'Compassion is caring for someone hurting. This is about fair chances.',offtopic:'Equity is about need. This is a fixed idea about a group.'};
function feedback(tag){let m='Read it again.';if(FB[tag])m=FB[tag];if(tag==='group')m='A stereotype is about a whole group. This is judging one person: prejudice.';if(tag==='need')m='Equity is by need. Here everyone gets the same.';return m}
 let qi=-1,streak=0;
 function pose(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,o);e.onclick=()=>grade(tag)});announce('Challenge: '+q);A.redraw()}
 function grade(tag){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Right.':'✗ '+feedback(tag)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{st.at=p;A.redraw()},up});controls()}});
 A.start()})})();
