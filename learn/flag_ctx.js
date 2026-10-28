/* Flagship – context and interpretation (ages 16–18): a dealt card at a time, drag each one where it belongs. Split
   contexts of production from contexts of reception; place four real responses to The Taming of the Shrew's final speech
   on a timeline (Fletcher c.1611, Garrick 1754, Pickford 1929, the 2020s stage); judge whether a context sentence sharpens
   the argument or is bolted on; match one line to historicist, feminist and performance readings; and catch the classic
   slips (presentism, the 'all Elizabethans' generalisation, context replacing argument). */
(()=>{const MIN=Math.min,MAX=Math.max;
 const DECKS=[
  {q:'Production (when and how it was made) or reception (when and how it is read)?',bins:[['🖋️','Production'],['👓','Reception']],cards:[
   ['Written c.1590–92 for an all-male company: a boy actor played Katherine.',0,'How and by whom it was first made and staged: production.'],
   ['A 2020s audience watches after years of public talk about coercive control.',1,'Who is watching now and what they bring: reception.'],
   ['Under coverture, a married woman\u2019s property and legal identity passed to her husband.',0,'The law of the world the play was written in: production.'],
   ['A student in 2026 meets the play on an exam set-text list.',1,'Where and why it is read today: reception.'],
   ['The Church\u2019s Homily on matrimony (1563) preached that wives should obey.',0,'Ideas in circulation when it was written: production.'],
   ['Garrick cut it to a short afterpiece, Catharine and Petruchio, for 1754 audiences.',1,'How a later theatre took it up and changed it: reception.']]},
  {q:'Katherine\u2019s last speech: "Thy husband is thy lord, thy life, thy keeper." Same words, four audiences. When did each happen?',tl:1,bins:[['','c.1611'],['','1754'],['','1929'],['','2020s']],cards:[
   ['John Fletcher writes a sequel, The Woman\u2019s Prize, in which Petruchio\u2019s new wife tames him.',0,'Fletcher\u2019s answer came within about 20 years: the play was argued with in its own era.'],
   ['David Garrick keeps the taming as a short comic afterpiece that holds the stage for decades.',1,'Garrick\u2019s Catharine and Petruchio (1754) treated the taming as farce.'],
   ['In the first sound feature film of a Shakespeare play, Mary Pickford winks at the audience during the speech.',2,'The 1929 film turns the speech into a private joke with the audience.'],
   ['Many productions play the speech as irony, exhaustion or a test, and audiences debate it.',3,'Modern stagings often unsettle the speech rather than celebrate it.']]},
  {q:'Does this context sentence sharpen an argument about the play, or is it bolted on?',bins:[['🎯','Sharpens'],['🔩','Bolted on']],cards:[
   ['Because coverture made a wife her husband\u2019s in law, Petruchio\u2019s "she is my goods, my chattels" states a legal fact, which makes the joke harder to laugh at.',0,'It links a fact to a quotation and changes how we read it.'],
   ['Shakespeare married Anne Hathaway in 1582.',1,'True, but it is not tied to any line or claim about the play.'],
   ['Fletcher\u2019s sequel shows some early audiences already resisted the taming, so a resistant reading is not only modern.',0,'It uses context to test a claim about interpretation.'],
   ['The Elizabethan era was a time of great change.',1,'Too vague to support any point: bolted on.']]},
  {q:'One line, three critical lenses. Which lens is each reading using?',bins:[['🏛️','Historicist'],['♀️','Feminist'],['🎭','Performance']],cards:[
   ['It echoes the 1563 Homily on matrimony, so it voices the standard doctrine of its day.',0,'Reading the line against documents of its time: historicist.'],
   ['It shows a woman made to speak, and so endorse, the power that silences her.',1,'Asking how the text treats women and power: feminist.'],
   ['Delivered slowly to a silent Petruchio, the speech can sound like a threat, not a surrender.',2,'Meaning made by delivery, staging and audience: performance.']]},
  {q:'Sound use of context, or a slip?',bins:[['✅','Sound'],['⚠️','Slip']],cards:[
   ['Shakespeare was sexist because he did not campaign for votes for women.',1,'Presentism: judging the 1590s by a 20th-century standard.'],
   ['An audience in 1594 may have laughed where many modern audiences wince.',0,'Hedged, and it separates two contexts of reception.'],
   ['All Elizabethans agreed that wives should obey.',1,'Over-generalised: Fletcher\u2019s sequel shows they did not.'],
   ['Context proves what the play really means.',1,'Context should sharpen an argument, not replace it.'],
   ['Ironic modern stagings show how reception can reshape a speech\u2019s meaning.',0,'Ties reception to a specific effect on meaning.']]}];
VIS.reg('flagctx',c=>{let A,keys,qz,echo;
 const T={k:0,tally:[],last:[],grab:null,wob:0,miss:-1,epoch:0,cb:()=>{}};
 const voice=s=>{c.say(s);if(A){A.cv.setAttribute('aria-label',s);if(echo)echo.textContent=s}};
 const W=f=>f*A.W,H=f=>f*A.H,sz=z=>A.narrow?z:z+2,deck=()=>DECKS[A.step],now=()=>{const d=deck();return d&&d.cards[T.k]};
 function para(g,s,cx,top,w,size,col,wt,center){g.font=`${wt||600} ${sz(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';g.fillStyle=col;
  const rows=[];let line='';for(const word of s.split(' ')){const t=line?line+' '+word:word;if(g.measureText(t).width>w&&line){rows.push(line);line=word}else line=t}rows.push(line);
  const lh=sz(size)*1.3,y0=center?top-rows.length*lh/2:top;rows.forEach((r,i)=>g.fillText(r,cx,y0+i*lh));return rows.length*lh}
 const slab=(g,r,col,bold,a)=>{g.fillStyle=A.alpha(col,a||.13);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=bold?4:2;g.stroke()};
 const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 // the dealt card sits in the middle; bins sit along the bottom (or as dates on a timeline)
 function cardRect(){const r={x:W(.05),y:H(.2),w:W(.9),h:H(.36)};if(T.grab)return{...r,x:T.grab.x-T.grab.dx,y:T.grab.y-T.grab.dy};return{...r,x:r.x+Math.sin(T.wob*30)*T.wob*40}}
 function binRect(i){const d=deck(),n=d.bins.length,g=6,w=(A.W-(n+1)*g)/n;return d.tl?{x:g+i*(w+g),y:H(.68),w,h:H(.27)}:{x:g+i*(w+g),y:H(.64),w,h:H(.33)}}
 function timeline(g){const C=A.col,y=H(.66);g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W(.02),y);g.lineTo(W(.97),y);g.stroke();g.beginPath();g.moveTo(W(.97),y);g.lineTo(W(.94),y-6);g.lineTo(W(.94),y+6);g.closePath();g.fillStyle=C.tx;g.fill()}
 function draw(A){const{ctx:g,W:w,H:h,col:C}=A,d=deck();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.4);g.fillRect(0,0,w,h);
  if(!d){para(g,T.Q||'📜',w/2,h/2,w,50,C.tx,400,1);return A.fx.draw(g)}
  para(g,d.q,w/2,H(.025),w-20,12,C.vi,800);if(d.tl)timeline(g);
  d.bins.forEach((b,i)=>{const r=binRect(i);slab(g,r,i===T.miss?C.rd:T.tally[i]?C.gr:C.cy,i===T.miss,.12);const top=r.y+8;
   if(b[0])para(g,b[0],r.x+r.w/2,top,r.w,16,C.tx,400);para(g,b[1],r.x+r.w/2,top+(b[0]?sz(16)*1.35:2),r.w-6,13,C.tx,800);
   if(T.tally[i])para(g,'✓ '+T.tally[i],r.x+r.w/2,r.y+r.h-sz(12)*1.6,r.w,11,C.tx,700)});
  const k=now();if(k){const r=cardRect();A.paint.shadow(10,4,.22);slab(g,r,C.am,1,.92);A.paint.noShadow();
   para(g,k[0],r.x+r.w/2,r.y+r.h/2,r.w-22,13,'#1c1917',650,1);para(g,`${T.k+1} / ${d.cards.length}`,r.x+r.w-26,r.y+6,40,10,'#1c1917',700)}
  else para(g,'✓ '+WRAP[A.step],w/2,H(.3),w-30,14,C.gr,800,1);A.fx.draw(g)}
 const WRAP=['Production is the world that made it; reception is the world that reads it.','Same words, different centuries, different meanings.','Good context changes how a quotation reads.','Each lens asks a different question of the same line.','Hedge, separate the contexts, and keep the text at the centre.'];
 function drop(b){const d=deck(),k=now();if(!k)return;T.grab=null;
  if(b!==k[1]){T.miss=b;T.wob=.4;A.tween(T,{wob:0},420,'out');A.sound.miss();return voice(`Not ${d.bins[b][1]}. ${k[2]}`)}
  T.miss=-1;T.tally[b]=(T.tally[b]||0)+1;T.k++;A.sound.pop();announce(`Yes, ${d.bins[b][1]}. ${k[2]}`)}
 function announce(pre){const d=deck(),k=now();let s;if(!d)s='Challenge time.';else if(!k)s=WRAP[A.step];else s=`${d.q} Card ${T.k+1}: ${k[0]}`;voice((pre?pre+' ':'')+s);controls();T.cb()}
 function controls(){if(!A||!keys)return;keys.innerHTML='';const d=deck();if(d&&now())d.bins.forEach((b,i)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':'Put this card in '+b[1]},keys,(b[0]?b[0]+' ':'📅 ')+b[1]);e.onclick=()=>drop(i)});A.redraw()}
 const ready=(n,msg)=>()=>{if(A.step===n&&!now()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const chain=(fs,gap)=>{const e=T.epoch;fs.forEach((f,j)=>setTimeout(()=>{if(e===T.epoch)f()},j*gap))};
 const clean=()=>{T.epoch++;T.cb=()=>{};T.k=0;T.tally=[];T.grab=null;T.miss=-1;T.wob=0};
 const auto=n=>()=>{steps[n].go();chain(DECKS[n].cards.map(k=>()=>drop(k[1])),420)};
 const steps=[
  {h:'Two contexts',p:'The context of production is the world a text was made in. The context of reception is the time, place and values of whoever reads or watches it.',
   predict:{q:'Is the context of reception about when the text was written?',opts:['Yes, it is the writer\u2019s time','No, it is the reader\u2019s time and place'],ans:1},task:'Sort all six cards',
   show:auto(0),go:()=>{clean();announce();T.cb=ready(0,'Six contexts sorted.')}},
  {h:'Four audiences',p:'The words of a play do not change. The people meeting them do. Place each response on the timeline.',
   predict:{q:'Did audiences in Shakespeare\u2019s own lifetime all accept the taming?',opts:['Yes, people then all agreed','No, it was answered back within about 20 years'],ans:1},task:'Date all four responses',
   show:auto(1),go:()=>{clean();announce();T.cb=ready(1,'Fletcher, Garrick, Pickford, today: one speech, four readings.')}},
  {h:'Sharpen, don\u2019t replace',p:'Examiners reward context that changes how you read a line, not facts dropped in beside it.',task:'Judge all four sentences',
   show:auto(2),go:()=>{clean();announce();T.cb=ready(2,'Tie each fact to a quotation and a claim.')}},
  {h:'Lenses',p:'Critics read in different contexts too. A lens is the question a reader brings to the text.',task:'Match all three readings',
   show:auto(3),go:()=>{clean();announce();T.cb=ready(3,'Historicist, feminist and performance readings can all be argued from the same line.')}},
  {h:'Spot the slip',p:'Some uses of context sound clever but break the argument. Catch them.',
   predict:{q:'"Shakespeare was sexist because he did not campaign for votes for women." Good use of context?',opts:['Yes, it uses context','No, it judges the 1590s by today\u2019s rules'],ans:1},task:'Judge all five sentences',
   show:auto(4),go:()=>{clean();announce();T.cb=ready(4,'Avoid presentism and sweeping claims; context supports, the text decides.')}},
  {h:'Challenge',p:'',go:()=>{clean();pose()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>T.cb()});
 const BANK=[['Which is a context of reception for The Merchant of Venice?','⚖️',[['Post-1945 productions staged after the Holocaust','ok'],['Venice as a trading city in the 1590s','prod'],['Shakespeare\u2019s source, Il Pecorone','source']]],
  ['Jean Rhys\u2019s Wide Sargasso Sea (1966) retells Jane Eyre from Bertha\u2019s side. What does that show?','📕',[['A later reader reinterpreting a text from a new position','ok'],['What Charlotte Bront\u00eb secretly meant','intent'],['That Jane Eyre is a bad novel','value']]],
  ['Which sentence uses context best?','🧭',[['Because coverture gave husbands their wives\u2019 property, "my goods, my chattels" is legal fact, not just a boast.','ok'],['Elizabethan times were very different from now.','vague'],['Shakespeare was born in 1564.','bolt']]],
  ['"Elizabethan audiences found the ending funny." What is the problem?','🎭',[['It assumes one audience reacted one way','ok'],['Nothing, it is a fact','fact'],['It should say Victorian','wrongera']]],
  ['A modern reader finds Othello\u2019s treatment of race troubling. This is...','🌍',[['a response shaped by the context of reception','ok'],['the context of production','prod2'],['proof the play is racist','proof']]],
  ['What should context do in an essay?','✍️',[['Sharpen an argument about the text','ok'],['Replace close reading','replace'],['Fill the opening paragraph','intro']]]];
 let qn=-1,streak=0;
 function pose(){qn++;const[q,pic,ops]=BANK[qn%BANK.length],r=qn%3;T.Q=pic;
  qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=qz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});voice('Challenge: '+q);A.redraw()}
 function judge(tag){qz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=qz.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes. That keeps production, reception and the text in their places.';break;
   case 'prod':m='Venice in the 1590s is the world the play was written about and in: production, not reception.';break;
   case 'source':m='A source the writer used is part of production.';break;
   case 'intent':m='A rewriting cannot reveal the author\u2019s secret intent; it shows a new reader\u2019s position.';break;
   case 'value':m='Rewriting is a response, not a verdict on quality.';break;
   case 'vague':m='Too vague: it is not tied to any line or claim.';break;
   case 'bolt':m='A true fact, but bolted on: it changes nothing about how we read the play.';break;
   case 'fact':m='We cannot know one audience reaction; Fletcher\u2019s sequel shows some resisted. Hedge it.';break;
   case 'wrongera':m='The era is not the problem; treating a whole audience as one mind is.';break;
   case 'prod2':m='Production is 1603\u201304 London. The modern reader\u2019s response is reception.';break;
   case 'proof':m='A response is evidence of a reading, not proof of a verdict. Argue it from the text.';break;
   case 'replace':m='Context supports close reading; it never replaces it.';break;
   default:m='Context belongs where it changes a reading, not in a block at the start.'}
  const good=tag==='ok';if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function down(p){if(!deck()||!now())return false;const r=cardRect();if(within(p,r)){T.grab={x:p.x,y:p.y,dx:p.x-r.x,dy:p.y-r.y};return true}
  const b=deck().bins.findIndex((_,i)=>within(p,binRect(i)));if(b>=0)drop(b);return false}
 function move(p){if(T.grab){T.grab.x=p.x;T.grab.y=p.y;A.redraw()}}
 function up(p){if(!T.grab)return;const b=deck().bins.findIndex((_,i)=>within(p,binRect(i)));T.grab=null;if(b>=0)drop(b);else A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qz.hidden=A.step!==5;echo.hidden=A.step===5;keys.hidden=A.step===5;controls()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);echo=E('p',{class:'fl-read','aria-hidden':'true'});
   keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);qz=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});controls()}});
 A.start()})})();
