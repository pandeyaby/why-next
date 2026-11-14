/* Flagship – themes across cultures and traditions (ages 9–10): stories from different lands often share a pattern
   (trickster, quest, a Cinderella-style rise) and a theme, while the details change with the culture that tells them.
   Sort tales by pattern, file Cinderella details from France and China, build a Venn of Anansi and Br'er Rabbit,
   choose one theme that fits two tales, and match details to the culture they come from. Drag or tap on the canvas;
   a button row below repeats every move. */
(()=>{
 const KINDS=['trickster','quest','Cinderella'];
 const TALES=[['Anansi the spider tricks a python, a leopard and hornets to win the sky god’s stories (Ghana).',0],['Theseus sails to Crete to defeat the Minotaur in the maze (Ancient Greece).',1],
  ['Yeh-Shen loses a golden shoe at a festival, and a king searches for its owner (China).',2],['Br’er Rabbit begs Br’er Fox not to throw him in the briar patch, his home (American South).',0],
  ['Momotarō sets off with a dog, a monkey and a pheasant to beat the ogres of Onigashima (Japan).',1],['An eagle drops Rhodopis’s sandal in the Pharaoh’s lap, and he looks for her (Ancient Egypt).',2]];
 const KIND_WHY=['A small, clever character wins by tricking bigger ones: a trickster tale.','A hero leaves home on a dangerous mission and comes back changed: a quest.','A poor, badly treated girl is found by a ruler through a lost shoe: a Cinderella story.'];
 const SIDES=['France: Perrault','China: Yeh-Shen'];
 const BITS=[['a fairy godmother',0],['the bones of a magic fish',1],['a glass slipper',0],['a golden shoe',1],['home by midnight',0],['a cave festival',1],['marries a prince',0],['marries a king',1]];
 const RINGS=['only Anansi','both','only Br’er Rabbit'];
 const FACTS=[['is a spider',0],['small, but beats bigger animals',1],['uses wits, not strength',1],['first told by the Akan of Ghana',0],['is a rabbit',2],['gets stuck to a sticky doll',1],['told by African Americans in the South',2]];
 const FACT_WHY=['Anansi is a spider; Br’er Rabbit is a rabbit.','Both are small and win against bigger, stronger animals.','Both win with clever tricks, not muscles.','Anansi stories come from the Akan people of Ghana, in West Africa.','Br’er Rabbit is a rabbit; Anansi is a spider.','Both have a tale where they hit a sticky doll and get stuck: Anansi’s gum doll and Br’er Rabbit’s tar baby.','Br’er Rabbit tales were told by African Americans in the southern United States.'];
 const PAIRS=[['King Midas (Greece) wishes that all he touches turns to gold, so even his food does.','The fisherman’s wife (Germany) keeps asking a magic fish for more, until she loses it all.',
   [['Wanting too much can leave you with nothing.','ok'],['Greed.','topic'],['Gold can turn food hard.','one']]],
  ['Theseus (Greece) beats the Minotaur, but only with Ariadne’s thread to find his way out.','Momotarō (Japan) beats the ogres with the help of a dog, a monkey and a pheasant.',
   [['Even brave heroes need help from others.','ok'],['A hero goes to an island.','event'],['Animals make good friends.','one']]],
  ['Anansi (Ghana) wins the stories by tricking animals far bigger than him.','Br’er Rabbit (USA) escapes Br’er Fox by tricking him into the briar patch.',
   [['Brains can beat strength.','ok'],['Tricks.','topic'],['Spiders are clever.','one']]]];
 const LANDS=['Ancient Greece','Ancient Egypt','China','Japan','France'];
 const CLUES=[['the Minotaur in a maze',0],['a Pharaoh by the River Nile',1],['millet dumplings for the animals',3],['a magic fish in a pond',2],['a pumpkin coach and a royal ball',4],['a shoe carried off by an eagle',1]];
VIS.reg('flagtales',c=>{let A,keys,panel;
 const T={job:0,at:0,held:null,hand:null,note:'',wrong:false,bins:[],test:()=>{}};
 const part=()=>['kind','bits','venn','theme','land','chal'][A.step];
 const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const miss=t=>{T.wrong=true;T.note=t;A.sound.miss();voice(t);A.redraw()};
 const hitIt=t=>{T.wrong=false;T.note=t;A.sound.pop()};
 const sz=n=>Math.round(n*(A.narrow?1:1.16));
 function txt(g,s,x,y,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y,A.W-14)}
 function flow(g,s,x,y,n,col,w,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;const rows=[];let cur='';for(const t of s.split(' ')){const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>w){rows.push(cur);cur=t}else cur=tr}rows.push(cur);
  const lh=sz(n)+4;rows.forEach((r,i)=>txt(g,r,x,y+(i-(rows.length-1)/2)*lh,n,col,wt));return rows.length}
 function rowsOf(g,s,n,w,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;let k=1,cur='';for(const t of s.split(' ')){const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>w){k++;cur=t}else cur=tr}return k}
 function stack(g,arr,x,y0,n,col,w,wt){const lh=sz(n)+4;let y=y0;arr.forEach(s=>{const k=rowsOf(g,s,n,w,wt);flow(g,s,x,y+(k-1)*lh/2,n,col,w,wt);y+=k*lh+4})}
 function panelR(g,r,col,a,strong){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.strokeStyle=col;g.lineWidth=strong?3.5:1.6;g.stroke()}
 const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const grid=(i,n,y0,h,gap=8)=>{const w=(A.W-gap*(n+1))/n;return{x:gap+(i%n)*(w+gap),y:y0+Math.floor(i/n)*(h+gap),w,h}};
 const kindR=j=>grid(j,3,A.H*.5,A.H*.2);
 const sideR=j=>grid(j,2,A.H*.36,A.H*.4);
 const ringR=j=>grid(j,3,A.H*.36,A.H*.42,6);
 const optR=j=>grid(0,1,A.H*(.37+j*.13),A.H*.11);
 const landR=j=>A.narrow?grid(j,2,A.H*.4,A.H*.11):grid(j,5,A.H*.46,A.H*.2);
 const dragCard=(w,h,y)=>{let r={x:A.W/2-w/2,y,w,h};if(T.held!=null&&T.hand)r={...r,x:T.hand.x-w/2,y:T.hand.y-h/2};return r};
 function footer(g){if(!T.note)return;const C=A.col;g.font=`700 ${sz(13)}px system-ui,sans-serif`;const rows=[];let cur='';(T.wrong?'✗ ':'✓ ').concat(T.note).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>A.W-44){rows.push(cur);cur=t}else cur=tr});rows.push(cur);
  const lh=sz(13)+5,h=rows.length*lh+12,y=A.H-h-6;panelR(g,{x:12,y,w:A.W-24,h},T.wrong?C.rd:C.gr,.13);rows.forEach((r,i)=>txt(g,r,A.W/2,y+6+lh*(i+.5),13,C.tx))}
 const filed=j=>T.bins.filter(b=>b[1]===j).map(b=>b[0]);
 // ---------- scenes ----------
 const VIEW={
  kind(g,C){if(T.at>=TALES.length)return flow(g,'Six lands, three patterns: the same kinds of story turn up all over the world.',A.W/2,A.H*.22,15,C.gr,A.W-40);
   const r=dragCard(A.W-28,A.H*.3,A.H*.06);panelR(g,r,C.cy,.13,true);flow(g,TALES[T.at][0],r.x+r.w/2,r.y+r.h/2,14,C.tx,r.w-22);
   KINDS.forEach((k,j)=>{const q=kindR(j);panelR(g,q,[C.am,C.vi,C.pk][j],.14);txt(g,k,q.x+q.w/2,q.y+q.h/2-8,14,C.tx,800);txt(g,filed(j).length+' tales',q.x+q.w/2,q.y+q.h/2+12,11,C.tx,600)})},
  bits(g,C){SIDES.forEach((s,j)=>{const q=sideR(j);panelR(g,q,j?C.or:C.cy,.12);txt(g,s,q.x+q.w/2,q.y+16,13,C.tx,800);stack(g,filed(j),q.x+q.w/2,q.y+38,11,C.tx,q.w-10,600)});
   if(T.at>=BITS.length)return flow(g,'Same pattern, different details.',A.W/2,A.H*.16,15,C.gr,A.W-40);const r=dragCard(Math.min(260,A.W-40),A.H*.17,A.H*.08);panelR(g,r,C.vi,.15,true);flow(g,BITS[T.at][0],r.x+r.w/2,r.y+r.h/2,16,C.tx,r.w-16,800)},
  venn(g,C){const y=A.H*.36,h=A.H*.42,cx=A.W/2,rx=A.W*.3;g.lineWidth=2;[[cx-A.W*.17,C.am],[cx+A.W*.17,C.cy]].forEach(([x,col])=>{g.fillStyle=A.alpha(col,.12);g.strokeStyle=A.alpha(col,.55);g.beginPath();g.ellipse(x,y+h/2,rx,h/2,0,0,7);g.fill();g.stroke()});
   RINGS.forEach((t,j)=>{const q=ringR(j);flow(g,t,q.x+q.w/2,q.y+12,11,C.tx,q.w-4,800);stack(g,filed(j),q.x+q.w/2,q.y+38,10,C.tx,q.w-8,600)});
   if(T.at>=FACTS.length)return flow(g,'Different animals and lands, the same trickster role.',A.W/2,A.H*.16,15,C.gr,A.W-40);const r=dragCard(Math.min(300,A.W-40),A.H*.17,A.H*.08);panelR(g,r,C.vi,.15,true);flow(g,FACTS[T.at][0],r.x+r.w/2,r.y+r.h/2,15,C.tx,r.w-16,800)},
  theme(g,C){const it=PAIRS[T.at];if(!it)return flow(g,'A theme is a message that fits both stories, not a single word and not one event.',A.W/2,A.H*.22,15,C.gr,A.W-40);
   [0,1].forEach(k=>{const q=grid(k,2,A.H*.03,A.H*.31);panelR(g,q,k?C.or:C.cy,.12,true);flow(g,it[k],q.x+q.w/2,q.y+q.h/2,12,C.tx,q.w-14)});
   it[2].forEach((o,j)=>{const q=optR(j);panelR(g,q,C.vi,.13);flow(g,o[0],q.x+q.w/2,q.y+q.h/2,14,C.tx,q.w-16,800)})},
  land(g,C){LANDS.forEach((l,j)=>{const q=landR(j);panelR(g,q,[C.cy,C.am,C.rd,C.pk,C.vi][j],.13);flow(g,l,q.x+q.w/2,q.y+q.h/2,12,C.tx,q.w-8,800)});
   if(T.at>=CLUES.length)return flow(g,'The details show where a tale was told.',A.W/2,A.H*.18,15,C.gr,A.W-40);const r=dragCard(Math.min(300,A.W-40),A.H*.2,A.H*.08);panelR(g,r,C.gr,.14,true);flow(g,CLUES[T.at][0],r.x+r.w/2,r.y+r.h/2,16,C.tx,r.w-16,800)}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.05:.28);g.fillRect(0,0,W,H);const f=VIEW[part()];if(f)f(g,C);else txt(g,'one pattern · many lands',W/2,H/2,18,C.tx);footer(g);A.fx.draw(g)}

 // ---------- moves ----------
 function sortKind(j){const it=TALES[T.at];if(!it)return;if(j!==it[1])return miss(`Not a ${KINDS[j]} tale. ${KIND_WHY[it[1]]}`);T.bins.push([T.at,j]);T.at++;hitIt(`${KINDS[j]}. ${KIND_WHY[j]}`);tell()}
 function side(j){const it=BITS[T.at];if(!it)return;if(j!==it[1])return miss(`${it[0]} is in the ${SIDES[it[1]].split(':')[0]==='France'?'French':'Chinese'} version, not the ${j?'Chinese':'French'} one.`);T.bins.push([it[0],j]);T.at++;hitIt(`${it[0]}: ${SIDES[j]}.`);tell()}
 function ring(j){const it=FACTS[T.at];if(!it)return;if(j!==it[1])return miss(FACT_WHY[T.at]);T.bins.push([it[0],j]);T.at++;hitIt(FACT_WHY[T.at-1]);tell()}
 function choose(j){const it=PAIRS[T.at];if(!it)return;const [s,tag]=it[2][j];if(tag!=='ok'){const why={topic:`“${s}” is only a topic, one word. A theme is a whole message about it.`,one:`“${s}” fits only one of the stories. A shared theme must fit both.`,event:`“${s}” is something that happens, not a message.`};return miss(why[tag])}
  T.at++;hitIt(`Both tales say: ${s}`);tell()}
 function land(j){const it=CLUES[T.at];if(!it)return;if(j!==it[1])return miss(`${it[0]} does not fit ${LANDS[j]}. Think about which tale it comes from.`);T.at++;hitIt(`${it[0]}: ${LANDS[j]}.`);tell()}

 function tell(){const v=part();let s='';
  if(v==='kind')s=T.at<TALES.length?`Tale: ${TALES[T.at][0]} Which pattern?`:'All tales sorted.';
  else if(v==='bits')s=T.at<BITS.length?`Detail: ${BITS[T.at][0]}. French or Chinese version?`:'All details filed.';
  else if(v==='venn')s=T.at<FACTS.length?`Fact: ${FACTS[T.at][0]}. Only Anansi, both, or only Br’er Rabbit?`:'Venn complete.';
  else if(v==='theme')s=T.at<PAIRS.length?`Tales: ${PAIRS[T.at][0]} ${PAIRS[T.at][1]} Pick the shared theme.`:'All themes chosen.';
  else if(v==='land')s=T.at<CLUES.length?`Detail: ${CLUES[T.at][0]}. Which land?`:'All details placed.';else s='Challenge.';
  voice((T.note?T.note+' ':'')+s);pad();T.test()}
 function pad(){if(!keys)return;keys.innerHTML='';const v=part(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=f};
  if(v==='kind'&&T.at<TALES.length)KINDS.forEach((k,j)=>add(k,()=>sortKind(j)));
  if(v==='bits'&&T.at<BITS.length)SIDES.forEach((s,j)=>add(s,()=>side(j)));
  if(v==='venn'&&T.at<FACTS.length)RINGS.forEach((s,j)=>add(s,()=>ring(j)));
  if(v==='theme'&&T.at<PAIRS.length)PAIRS[T.at][2].forEach((o,j)=>add(o[0],()=>choose(j),`Theme: ${o[0]}`));
  if(v==='land'&&T.at<CLUES.length)LANDS.forEach((l,j)=>add(l,()=>land(j)));A.redraw()}

 const zones={kind:[kindR,3,sortKind,TALES],bits:[sideR,2,side,BITS],venn:[ringR,3,ring,FACTS],land:[landR,5,land,CLUES]};
 function grab(p){const v=part();T.held=null;T.hand=null;const z=zones[v];
  if(z&&T.at<z[3].length){for(let j=0;j<z[1];j++)if(within(p,z[0](j))){z[2](j);return false}if(p.y<A.H*.34){T.held=0;T.hand=p;return true}return false}
  if(v==='theme'&&T.at<PAIRS.length){const j=[0,1,2].find(j=>within(p,optR(j)));if(j!=null)choose(j)}
  return false}
 function drop(p){const v=part(),h=T.held;T.held=null;T.hand=null;if(h==null)return A.redraw();const z=zones[v];if(!z)return A.redraw();
  for(let j=0;j<z[1];j++)if(within(p,z[0](j)))return z[2](j);A.redraw()}

 // ---------- steps ----------
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const replay=fs=>{const id=++T.job,gap=A.reduced()?15:320;fs.forEach((f,i)=>setTimeout(()=>{if(id===T.job)f()},i*gap))};
 const wipe=()=>{T.job++;T.test=()=>{};T.at=0;T.bins=[];T.note='';T.wrong=false;T.held=null};
 const steps=[
  {h:'Spot the story pattern',p:'Stories from far-apart lands often follow the same pattern. A trickster is small but clever. A quest sends a hero on a dangerous mission. In a Cinderella story a mistreated girl is found by a ruler. Drag each tale to its pattern, or tap a box.',
   predict:{q:'Anansi is a spider from Ghana and Br’er Rabbit is a rabbit from the American South. Can they play the same kind of part?',opts:['No: different animals, different stories','Yes: both are tricksters'],ans:1},task:'Sort 6 tales',
   show:()=>{steps[0].go();replay(TALES.map(([,j])=>()=>sortKind(j)))},go:()=>{wipe();tell();T.test=when(0,()=>T.at>=TALES.length,'Two tricksters, two quests, two Cinderellas, from six lands.')}},
  {h:'Same pattern, new details',p:'The French Cinderella (Perrault, 1697) and the Chinese Yeh-Shen (written down about 850) share a pattern. The details change. Drag each detail to its version, or tap a side.',
   predict:{q:'Does every Cinderella story have a fairy godmother?',opts:['Yes, that is part of the story','No: the helper changes from culture to culture'],ans:1},task:'File 8 details',
   show:()=>{steps[1].go();replay(BITS.map(([,j])=>()=>side(j)))},go:()=>{wipe();tell();T.test=when(1,()=>T.at>=BITS.length,'A fairy or a magic fish, glass or gold: the details change, the pattern stays.')}},
  {h:'Compare two tricksters',p:'A Venn diagram shows what is the same and what is different. Put each fact in only Anansi, both, or only Br’er Rabbit. Drag it, or tap a part.',
   task:'Place 7 facts',show:()=>{steps[2].go();replay(FACTS.map(([,j])=>()=>ring(j)))},go:()=>{wipe();tell();T.test=when(2,()=>T.at>=FACTS.length,'The animal and the land differ. The role is the same: the small one wins with wits.')}},
  {h:'One theme, two tales',p:'A theme is the big message of a story. Two tales from different lands can share one. Read both tales and tap the theme that fits both.',
   task:'Choose 3 shared themes',show:()=>{steps[3].go();replay(PAIRS.map(()=>()=>choose(0)))},go:()=>{wipe();tell();T.test=when(3,()=>T.at>=PAIRS.length,'Greed, help and brains: each theme is a full message that fits both tales.')}},
  {h:'Where is it from?',p:'Each culture tells a tale with its own places, foods and rulers. Drag each detail to the land it comes from, or tap a land.',
   task:'Place 6 details',show:()=>{steps[4].go();replay(CLUES.map(([,j])=>()=>land(j)))},go:()=>{wipe();tell();T.test=when(4,()=>T.at>=CLUES.length,'A Pharaoh points to Egypt, millet dumplings to Japan, a pumpkin coach to France.')}},
  {h:'Challenge',p:'',go:()=>{wipe();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>T.test()});

 // ---------- challenge: every wrong option names the slip ----------
 const Q=[['Anansi (Ghana) and Coyote (many Native American peoples) both trick bigger animals. What do they share?','the trickster role',[['the same animal','animal'],['the same homeland','land']]],
  ['Which is a theme that fits both Midas and The Fisherman and His Wife?','Wanting more and more can cost you everything.',[['Greed.','topic'],['A king touches his food.','event']]],
  ['Theseus and Momotarō are both quest heroes. Which is a difference?','Momotarō is helped by animals; Theseus by Ariadne.',[['Both go on a dangerous mission.','same'],['Both beat a monster.','same']]],
  ['Yeh-Shen gets help from magic fish bones. Why not a fairy godmother?','The helper fits the culture that told the tale.',[['The Chinese version is wrong.','wrong'],['It is a different pattern.','pattern']]],
  ['Which detail shows a tale is from Ancient Egypt?','a Pharaoh by the River Nile',[['a glass slipper','land'],['an island of ogres','land']]],
  ['Two tales share a theme. What should you compare next?','how each culture tells it: characters, setting, details',[['nothing: they are the same story','wrong'],['only which one is longer','topic']]]];
 function slip(tag,w){let m='Look at the role, the message and the details one at a time.';
  if(tag==='animal')m=`${w}? No: a spider and a coyote are different animals. The part they play is what matches.`;
  if(tag==='land')m=`${w} points to a different land. Match the detail to the tale it comes from.`;
  if(tag==='topic')m=`${w} is only a topic or a size. A theme is a whole message about the story.`;
  if(tag==='event')m=`${w} is an event from one tale. A theme is a message both tales share.`;
  if(tag==='same')m=`${w} is a similarity. The question asks for a difference.`;
  if(tag==='wrong')m='Versions are not right or wrong. Each culture tells the shared pattern its own way.';
  if(tag==='pattern')m='It is the same Cinderella pattern. Only the helper detail has changed.';
  return m}
 let qn=-1,row=0;
 function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
  panel.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=panel.querySelector('.fl-pick');order.forEach(([w,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,w);b.onclick=()=>check(tag,w,ans)});voice('Challenge: '+q);A.redraw()}
 function check(tag,w,ans){panel.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=tag==='ok',fb=panel.querySelector('.fl-fb');
  if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. In a row: '+row+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.64,tall:1.18,draw,onStep:A=>{panel.hidden=A.step!==5;keys.hidden=A.step===5;pad()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story comparison controls'},w);panel=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down:grab,move:p=>{T.hand=p;A.redraw()},up:drop})}});
 A.start()})})();
