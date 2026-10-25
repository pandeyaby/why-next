/* Flagship 75 – inferring characters' feelings and motives (ages 7–10): tap the action words that give a feeling away,
   sort what the text says from what we work out, build a "because" with real evidence, revise a motive clue by clue,
   and read how a line is spoken. */
(()=>{const mn=Math.min,hy=Math.hypot;
 const ACT=[['Mia',0],['slammed',1],['the door',0],['and',0],['threw',1],['her bag',0],['on the floor.',0]],FEEL=['happy','angry','sleepy'];
 const SAM=['Sam\'s hands shook as he walked on stage.','He whispered, "I can\'t do this."'];
 const SORT=[['Sam walked on stage',0],['Sam is nervous',1],['His hands shook',0],['Sam is scared of the crowd',1],['Sam whispered',0]];
 const LEO='When Dad praised Ben\'s painting, Leo crossed his arms and looked away. "Mine is better anyway," he muttered.';
 const EV=[['Leo crossed his arms and looked away',1],['Leo is Ben\'s big brother',0],['He muttered, "Mine is better anyway"',1],['Ben\'s painting has a boat in it',0]];
 const AVA=['Ava hid the last cookie behind the jar.','She kept looking at the door.','When Gran came in, Ava held out the cookie and smiled.'];
 const MOT=[['She is greedy','greedy'],['She is saving it for someone','save'],['She does not like cookies','dislike']];
 const TAGS=[['"Fine," she snapped, and turned away.','cross'],['"Is it really mine?" he gasped, eyes wide.','amazed'],['"I suppose so," she sighed, looking at the rain.','let down']];
 const TAGW={cross:'snapped and turned away',amazed:'gasped, eyes wide','let down':'sighed, looking at the rain'};
VIS.reg('flaginfer',c=>{let A,pad,chal,read;
 const S={tap:[],feel:-1,si:0,sok:0,ev:[],line:0,picks:[],ti:0,tok:0,bad:null,hold:null,dp:null,p0:null,zones:[],want:()=>{},run:0,Q:null,note:''};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['clues','sort','evidence','motive','voice','quiz'][A.step];
 const Z=z=>A.narrow?z:z+2,tint=(k,a)=>A.alpha(k,a);
 const fnt=(x,z,w)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`};
 const line=(x,t,X,Y,z,k,w)=>{fnt(x,z,w);x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 function wrap(x,t,X,Y,maxW,z,k,w){fnt(x,z,w);const ws=t.split(' '),out=[];let cur='';for(const v of ws){const n=cur?cur+' '+v:v;if(x.measureText(n).width>maxW&&cur){out.push(cur);cur=v}else cur=n}out.push(cur);
  const lh=Z(z)*1.3;out.forEach((l,i)=>line(x,l,X,Y+i*lh,z,k,w));return out.length*lh}
 const box=(x,R,k,strong,a)=>{x.fillStyle=tint(k,a||.13);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=strong?4:2;x.stroke()};
 const zone=(R,id)=>{S.zones.push({R,id});return R},inR=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
 const at=p=>{for(let i=S.zones.length-1;i>=0;i--)if(inR(p,S.zones[i].R))return S.zones[i].id;return null};
 const nope=t=>{A.sound.miss();say(t);A.redraw()};
 const cardText=(x,t,R,z,k)=>{fnt(x,z,800);if(x.measureText(t).width<R.w-14)return line(x,t,R.x+R.w/2,R.y+R.h/2,z,k,800);const h=Z(z)*1.3;wrap(x,t,R.x+R.w/2,R.y+R.h/2-h/2,R.w-14,z,k,800)};
 function cluesV(x){const C=A.col;line(x,'Read it. Tap the words that show a feeling.',A.W/2,16,13,C.mu);fnt(x,17,800);
  let X=10,Y=A.H*.12;const h=mn(52,A.H*.12);ACT.forEach((t,i)=>{const w=x.measureText(t[0]).width+22;if(X+w>A.W-10){X=10;Y+=h+8}const R=zone({x:X,y:Y,w,h},'tok'+i),on=S.tap.includes(i);
   box(x,R,on?C.or:S.bad==='tok'+i?C.rd:C.cy,on,on?.3:.1);line(x,t[0],R.x+w/2,R.y+h/2,17,C.tx,800);X+=w+8});
  const n=S.tap.length;line(x,`Feeling clues found: ${n} of 2`,A.W/2,Y+h+22,14,n>=2?C.gr:C.mu,800);
  if(n>=2){line(x,'So how does Mia feel?',A.W/2,Y+h+50,15,C.tx,900);const g=10,w=(A.W-4*g)/3,bh=mn(56,A.H*.13);
   FEEL.forEach((f,i)=>{const R=zone({x:g+i*(w+g),y:A.H-bh-12,w,h:bh},'feel'+i);box(x,R,S.feel===i?C.gr:S.bad==='feel'+i?C.rd:C.vi,S.feel===i||S.bad==='feel'+i);line(x,f,R.x+w/2,R.y+bh/2,16,C.tx,800)})}
  if(S.feel===1)line(x,'Angry: slammed + threw. Never written, but shown!',A.W/2,A.H-mn(56,A.H*.13)-30,13,C.gr,800)}
 function sortV(x){const C=A.col;let y=14;SAM.forEach(s=>{y+=wrap(x,s,A.W/2,y+8,A.W-30,15,C.tx,800)});
  const g=10,bw=(A.W-3*g)/2,bh=mn(96,A.H*.24),by=A.H-bh-10;[['The text says it',C.cy],['We work it out',C.or]].forEach((b,i)=>{const R=zone({x:g+i*(bw+g),y:by,w:bw,h:bh},'bin'+i);box(x,R,b[1],S.hold!=null,.12);
   line(x,b[0],R.x+bw/2,R.y+18,14,C.tx,900);const got=SORT.slice(0,S.sok).filter(s=>s[1]===i).map(s=>s[0]);got.forEach((t,j)=>line(x,'✓ '+t,R.x+bw/2,R.y+40+j*Z(16),11,C.mu,700))});
  if(S.sok>=SORT.length)return line(x,'Said = in the words. Worked out = from the clues.',A.W/2,A.H*.42,14,C.gr,800);
  const R0={x:A.W*.1,y:A.H*.36,w:A.W*.8,h:mn(62,A.H*.15)},drag=S.hold==='card'&&S.dp,R=drag?{...R0,x:S.dp.x-R0.w/2,y:S.dp.y-R0.h/2}:R0;zone(R0,'card');
  box(x,R,S.bad==='card'?C.rd:C.vi,drag||S.bad==='card',.2);cardText(x,SORT[S.si][0],R,16,C.tx);line(x,`Card ${S.sok+1} of ${SORT.length}: drag it to a box`,A.W/2,R0.y+R0.h+16,12,C.mu)}
 function evV(x){const C=A.col;let y=12;y+=wrap(x,LEO,A.W/2,y+8,A.W-24,13,C.mu,700);
  const B=zone({x:10,y:y+8,w:A.W-20,h:mn(64,A.H*.16)},'because'),n=S.ev.length;box(x,B,n>=2?C.gr:C.or,S.hold!=null,.12);
  line(x,'Leo is jealous because…',B.x+B.w/2,B.y+16,14,C.tx,900);line(x,n?S.ev.map(i=>EV[i][0].split(' ').slice(0,3).join(' ')+'…').join(' + '):'drop evidence here',B.x+B.w/2,B.y+B.h-16,12,n?C.tx:C.mu,700);
  const mw=A.W-40,mY=B.y+B.h+12;x.fillStyle=tint(C.mu,.2);x.fillRect(20,mY,mw,8);x.fillStyle=C.gr;x.fillRect(20,mY,mw*n/2,8);line(x,n>=2?'Strong: two real clues':`Evidence strength: ${n} of 2`,A.W/2,mY+20,12,n>=2?C.gr:C.mu,800);
  const h=mn(52,A.H*.11),top=mY+36;EV.forEach((e,i)=>{if(S.ev.includes(i))return;const R0={x:14,y:top+i*(h+6),w:A.W-28,h},drag=S.hold==='ev'+i&&S.dp,R=drag?{...R0,x:S.dp.x-R0.w/2,y:S.dp.y-h/2}:R0;zone(R0,'ev'+i);
   box(x,R,S.bad==='ev'+i?C.rd:C.vi,drag||S.bad==='ev'+i);cardText(x,e[0],R,13,C.tx)})}
 function motV(x){const C=A.col;let y=14;for(let i=0;i<=S.line&&i<3;i++){y+=wrap(x,`Clue ${i+1}: ${AVA[i]}`,A.W/2,y+8,A.W-24,14,i===S.line?C.tx:C.mu,i===S.line?800:600)+4}
  const last=S.picks[S.picks.length-1];if(S.note)wrap(x,S.note,A.W/2,y+16,A.W-24,12,C.or,700);
  const h=mn(54,A.H*.12);MOT.forEach((m,i)=>{const R=zone({x:14,y:A.H-3*(h+8)-4+i*(h+8),w:A.W-28,h},'mot'+i),mine=S.picks.length>S.line&&S.picks[S.line]===i;
   box(x,R,mine?(S.done4?C.gr:C.or):S.bad==='mot'+i?C.rd:C.vi,mine||S.bad==='mot'+i);cardText(x,m[0],R,15,C.tx)});void last}
 function voiceV(x){const C=A.col;if(S.tok>=3)return line(x,'How they said it gave each feeling away.',A.W/2,A.H/2,15,C.gr,800);
  const T=zone({x:12,y:A.H*.08,w:A.W-24,h:mn(96,A.H*.24)},'tag');box(x,T,S.hold!=null?C.or:C.cy,S.hold!=null,.1);cardText(x,TAGS[S.ti][0],T,16,C.tx);
  line(x,`Line ${S.ti+1} of 3: drag the feeling onto the line`,A.W/2,T.y+T.h+18,12,C.mu);
  const opts=['cross','amazed','let down'],g=10,w=(A.W-4*g)/3,h=mn(60,A.H*.14);opts.forEach((o,i)=>{if(S.usedT.includes(o))return;const R0={x:g+i*(w+g),y:A.H-h-14,w,h},drag=S.hold==='f'+i&&S.dp,R=drag?{...R0,x:S.dp.x-w/2,y:S.dp.y-h/2}:R0;zone(R0,'f'+i);
   box(x,R,S.bad==='f'+i?C.rd:C.vi,drag||S.bad==='f'+i);line(x,o,R.x+w/2,R.y+h/2,15,C.tx,800)})}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();S.zones=[];x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={clues:cluesV,sort:sortV,evidence:evV,motive:motV,voice:voiceV}[v];if(f)f(x);else{x.textAlign='center';x.textBaseline='middle';x.fillStyle=tint(C.or,.5);x.font=`900 ${mn(W,H)*.18}px system-ui`;x.fillText(S.Q?S.Q.big:'🕵️',W/2,H/2)}A.fx.draw(x)}
 function tapTok(i){if(S.tap.includes(i)||S.feel===1)return;if(!ACT[i][1]){S.bad='tok'+i;return nope(`"${ACT[i][0]}" is not a clue to a feeling. Look for what Mia does, and how.`)}S.bad=null;S.tap.push(i);A.sound.tick();report(`"${ACT[i][0]}" is a clue.`)}
 function pickFeel(i){if(S.feel===1)return;if(S.tap.length<2)return nope('Find the two clue words first. Then decide.');if(i!==1){S.bad='feel'+i;return nope(i?'Sleepy people do not slam doors. What do slamming and throwing show?':'Happy people do not usually slam doors and throw bags. Check the clues.')}
  S.bad=null;S.feel=1;A.sound.pop();report('Mia is angry. The text never says angry. The clues show it.')}
 function sortTo(b){if(S.sok>=SORT.length)return;const s=SORT[S.si];if(b!==s[1]){S.bad='card';return nope(s[1]?`"${s[0]}" is not in the words. We work it out from clues.`:`"${s[0]}" is right there in the text, so the text says it.`)}
  S.bad=null;S.sok++;S.si=mn(SORT.length-1,S.sok);A.sound.pop();report()}
 function addEv(i){if(S.ev.length>=2||S.ev.includes(i))return;if(!EV[i][1]){S.bad='ev'+i;return nope(`True, but "${EV[i][0]}" does not show how Leo feels. Pick what Leo does or says.`)}S.bad=null;S.ev.push(i);A.sound.pop();report()}
 function pickMot(i){if(S.done4)return;const k=MOT[i][1];S.bad=null;
  if(S.line<2){S.picks[S.line]=i;A.sound.tick();S.note=S.line===0?(k==='dislike'?'Hiding it does not show she dislikes it. Hold your idea loosely.':'Possible. Hold that idea loosely and read on.'):(k==='save'?'Looking at the door fits saving it for someone.':'Why keep looking at the door? This clue makes you wonder.');
   S.line++;return report()}
  if(k!=='save'){S.bad='mot'+i;return nope(k==='greedy'?'Clue 3 does not fit greedy: she gives the cookie away. Change your idea.':'She smiled and held it out. That does not fit not liking it.')}
  S.picks[2]=i;S.done4=1;S.note='All three clues fit: she was saving it for Gran.';A.sound.pop();report()}
 function tagIt(o){if(S.tok>=3||S.usedT.includes(o))return;const want=TAGS[S.ti][1];if(o!==want){S.bad='f'+['cross','amazed','let down'].indexOf(o);return nope(`Not ${o}. Look at ${TAGW[want]}. What feeling does that show?`)}
  S.bad=null;S.usedT.push(o);S.tok++;S.ti=mn(2,S.tok);A.sound.pop();report(`Yes, ${o}: ${TAGW[o]}.`)}
 function report(msg){const v=mode();let t;
  if(v==='clues')t=S.feel===1?'Mia is angry.':`Mia slammed the door and threw her bag on the floor. Clue words found: ${S.tap.map(i=>ACT[i][0]).join(', ')||'none'}.`+(S.tap.length>=2?' How does Mia feel?':'');
  else if(v==='sort')t=S.sok>=SORT.length?'All five cards sorted.':`Card: ${SORT[S.si][0]}. Does the text say it, or do we work it out?`;
  else if(v==='evidence')t=`Leo is jealous because: ${S.ev.map(i=>EV[i][0]).join('; ')||'no evidence yet'}. Strength ${S.ev.length} of 2.`;
  else if(v==='motive')t=S.done4?'Ava was saving the cookie for Gran.':`Clue ${S.line+1}: ${AVA[S.line]} Why did Ava hide the cookie? `+(S.note||'');
  else if(v==='voice')t=S.tok>=3?'All three lines matched.':`Line: ${TAGS[S.ti][0]} Which feeling?`;
  else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const K=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='clues'){ACT.forEach((t,i)=>K(t[0],()=>tapTok(i),S.tap.includes(i)||S.feel===1,'Word: '+t[0]));FEEL.forEach((f,i)=>K('Mia feels '+f,()=>pickFeel(i),S.feel===1))}
  if(v==='sort'&&S.sok<SORT.length){K('The text says it',()=>sortTo(0));K('We work it out',()=>sortTo(1))}
  if(v==='evidence')EV.forEach((e,i)=>K(e[0],()=>addEv(i),S.ev.includes(i)||S.ev.length>=2,'Use as evidence: '+e[0]));
  if(v==='motive')MOT.forEach((m,i)=>K(m[0],()=>pickMot(i),S.done4));
  if(v==='voice'&&S.tok<3)['cross','amazed','let down'].forEach(o=>K(o,()=>tagIt(o),S.usedT.includes(o),'Feeling: '+o));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.note=''};
 const steps=[
  {h:'Actions are clues',p:'Writers often show a feeling instead of naming it. Find the action words, then decide how Mia feels.',
   predict:{q:'The text never says how Mia feels. Can we still tell?',opts:['No, it is not written down','Yes, from what she does'],ans:1},task:'Find two clue words and name Mia\'s feeling',
   show:()=>{steps[0].go();later([()=>tapTok(1),()=>tapTok(4),()=>pickFeel(1)],450)},go:()=>{reset();S.tap=[];S.feel=-1;report();S.want=fin(0,()=>S.feel===1,()=>'Slammed and threw show anger. That is an inference: worked out from clues.')}},
  {h:'Said or worked out?',p:'Some things the text says. Others we work out from clues. Drag each card to the right box.',
   predict:{q:'"Sam is nervous." Does the text say that?',opts:['Yes, it says it','No, we work it out from his shaking hands'],ans:1},task:'Sort all five cards',
   show:()=>{steps[1].go();later(SORT.map(s=>()=>sortTo(s[1])),380)},go:()=>{reset();S.si=0;S.sok=0;report();S.want=fin(1,()=>S.sok>=SORT.length,()=>'The text says his hands shook. We work out that he is nervous.')}},
  {h:'Prove it',p:'An inference needs evidence. Drag the two lines that really show Leo is jealous into the because box.',
   predict:{q:'Which is better evidence that Leo is jealous?',opts:['Leo is Ben\'s big brother','He muttered, "Mine is better anyway"'],ans:1},task:'Back up the inference with two pieces of evidence',
   show:()=>{steps[2].go();later([()=>addEv(0),()=>addEv(2)],500)},go:()=>{reset();S.ev=[];report();S.want=fin(2,()=>S.ev.length>=2,()=>'Good evidence is something Leo does or says that shows the feeling.')}},
  {h:'Why did she do it?',p:'A motive is the reason a character acts. Read one clue at a time and choose the best reason each time.',task:'Choose a motive that fits all three clues',
   show:()=>{steps[3].go();later([()=>pickMot(0),()=>pickMot(1),()=>pickMot(1)],500)},go:()=>{reset();S.line=0;S.picks=[];S.done4=0;report();S.want=fin(3,()=>S.done4,()=>'A first idea can change. The best inference fits every clue.')}},
  {h:'How it is said',p:'Words like snapped, gasped and sighed tell you how a line is spoken, and so how the speaker feels.',task:'Match a feeling to each line',
   show:()=>{steps[4].go();later(TAGS.map(t=>()=>tagIt(t[1])),450)},go:()=>{reset();S.ti=0;S.tok=0;S.usedT=[];report();S.want=fin(4,()=>S.tok>=3,()=>'Snapped, gasped and sighed each carry a feeling.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 S.usedT=[];steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={door:['Tom stamped up the stairs and banged his door. How does Tom feel?','🚪',[['Cross','ok'],['Happy','happy'],['We can not tell. It is not written.','unwritten']]],
  evid:['Ella is nervous. Which line is the best evidence?','🎤',[['"Her voice wobbled as she spoke."','ok'],['"Ella has long hair."','irrel'],['"I think Ella is nervous."','opinion']]],
  stated:['"Jo ate three slices of cake." Is "Jo likes cake" said or worked out?','🍰',[['Worked out from a clue','ok'],['Said in the text','stated'],['Just a wild guess','guess']]],
  change:['A new clue does not fit your idea. What do you do?','🔍',[['Change the idea to fit all the clues','ok'],['Keep my first idea','keep'],['Skip the new clue','ignore']]],
  motive:['Raj ran back to the shop with the extra change. Why?','🪙',[['To be honest and give it back','ok'],['He wanted more sweets','greedy'],['We can not know, it is not written','unwritten']]],
  tag:['"Go away," she snapped. Which word is the biggest clue to her feeling?','💬',[['snapped','ok'],['away','away'],['she','who']]]};
 let qn=-1,stars=0;
 function ask(){qn++;const K=Object.keys(QZ),k=K[qn%K.length],rot=qn%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes, and you can point to the clue.';break;
   case 'unwritten':m='Feelings and reasons are often not written. Use the actions as clues.';break;
   case 'happy':m='Stamping and banging do not fit happy. Read the action words.';break;
   case 'irrel':m='True, but hair does not show a feeling. Evidence must link to the feeling.';break;
   case 'opinion':m='That is a claim, not evidence. Point to something she does or says.';break;
   case 'stated':m='The text never says likes. You worked it out from three slices.';break;
   case 'guess':m='It is not wild: three slices is a clue. Inference is a guess with evidence.';break;
   case 'keep':m='A good reader changes the idea when a clue does not fit.';break;
   case 'ignore':m='Every clue counts. Skipping one can make your inference wrong.';break;
   case 'greedy':m='Going back with money he could keep is the opposite of greedy.';break;
   default:m='That word does not tell us how she feels. Snapped does.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 const DRAG=/^(card|ev\d|f\d)$/;
 function down(p){const id=at(p);S.p0=p;S.dp=null;S.hold=null;if(id==null)return false;
  if(DRAG.test(id)){S.hold=id;return true}
  if(id.startsWith('tok'))tapTok(+id.slice(3));else if(id.startsWith('feel'))pickFeel(+id.slice(4));else if(id.startsWith('bin'))sortTo(+id.slice(3));else if(id.startsWith('mot'))pickMot(+id.slice(3));return false}
 function up(p){const k=S.hold,far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(k==null)return A.redraw();const tgt=at(p);
  if(k==='card'){if(tgt&&tgt.startsWith('bin'))sortTo(+tgt.slice(3));else A.redraw()}
  else if(k.startsWith('ev')){if(!far||tgt==='because')addEv(+k.slice(2));else A.redraw()}
  else if(k[0]==='f'){if(!far||tgt==='tag')tagIt(['cross','amazed','let down'][+k.slice(1)]);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
 A.start()})})();
