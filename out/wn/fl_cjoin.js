/* Flagship – commas before joining words (ages 9–11): a comma goes before and, but, or, so or yet when the joining word
   links two complete sentences (two independent clauses), but not when one subject simply has two verbs. Cover each side
   to test it, tap the gap where the comma belongs, pick the joining word whose meaning fits, edit a short paragraph, and
   find which "and" joins two sentences. Drag or tap on the canvas; a button row below repeats every move. */
(()=>{
 const COVER=[['Mia sang a song','and','Leo played the piano',1],['Mia sang','and','danced at the end',0],['The bus was late','so','we walked to school',1],
  ['Dad washed the car','and','polished it',0],['I wanted to go outside','but','it was raining',1],['We can walk','or','take the bus',0]];
 const COVER_WHY=['Leo played the piano has its own who (Leo) and its own verb, so both halves stand alone: comma before and.','Danced at the end has no who. Mia does both things, so this is one sentence with two verbs: no comma.',
  'We walked to school can stand alone, and so does the bus was late: comma before so.','Polished it has no who of its own. Dad did both, so no comma.','It was raining stands alone, and so does I wanted to go outside: comma before but.','Take the bus has no who. We do one or the other, so no comma.'];
 const GAPS=[['It was cold so I wore my coat',2],['Sam likes football but his sister prefers tennis',2],['You can have juice or you can have milk',3],['The dog barked yet nobody came to the door',2]];
 const JOINERS=['and','but','or','so','yet'];
 const MEAN={and:'adds one more thing',but:'shows a contrast',or:'gives a choice or an otherwise',so:'shows a result',yet:'shows a surprising contrast'};
 const PAIRS=[['The shop was shut','we went home',['so'],'the second part is a result of the first'],['I like apples','I do not like pears',['but','yet'],'the two parts are opposites'],
  ['Tidy your room','you cannot go out',['or'],'it is a choice: do this, otherwise that'],['Ali brought crisps','Zoe brought drinks',['and'],'it just adds one more thing']];
 const EDIT=[['Gran made soup and we ate it all.','add','We ate it all stands alone, so add a comma before and.'],['Ben ran, and jumped over the log.','cut','Jumped over the log has no who. Ben did both, so take the comma out.'],
  ['The lights went out, so we lit a candle.','ok','Both halves stand alone and the comma is before so. It is right.'],['Tom was hungry but he waited for dinner.','add','He waited for dinner stands alone, so add a comma before but.'],
  ['I can sing, or dance at the show.','cut','Dance at the show has no who of its own, so take the comma out.'],['Nobody answered, yet the door was open.','ok','Two full sentences joined by yet, with the comma before it. It is right.']];
 const FIX=['add a comma','take it out','it is right'],FIXK=['add','cut','ok'];
 const ANDS=[['Sam and Ali went to the park and Ali climbed a tree.',1,'The first and joins two names. The second joins two sentences: Ali climbed a tree.'],
  ['We had fish and chips and then Dad made a cake.',1,'Fish and chips is one meal. Then Dad made a cake is a whole sentence, so the comma goes before the second and.'],
  ['Mum laughed and the baby clapped and cheered.',0,'The baby clapped and cheered shares one who. The first and joins two sentences: Mum laughed, and the baby clapped.'],
  ['The cat was black and white and it slept all day.',1,'Black and white is one colour pattern. It slept all day is a sentence, so the second and gets the comma.']];
VIS.reg('flagcjoin',c=>{let A,row,quiz;
 const K={run:0,n:0,got:[],grab:null,pt:null,flash:'',bad:false,ok:()=>{}};
 const phase=()=>['cover','gap','pick','edit','ands','quiz'][A.step];
 const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const nope=t=>{K.bad=true;K.flash=t;A.sound.miss();speak(t);A.redraw()};
 const good=t=>{K.bad=false;K.flash=t;A.sound.pop()};
 const px=n=>Math.round(n*(A.narrow?1:1.18));
 const font=(g,n,wt)=>{g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`};
 function put(g,s,x,y,n,col,wt){font(g,n,wt);g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y,A.W-16)}
 function wrapTo(g,s,maxW,n){font(g,n);const L=[];let line='';for(const w of s.split(' ')){const t=line?line+' '+w:w;if(line&&g.measureText(t).width>maxW){L.push(line);line=w}else line=t}L.push(line);return L}
 function para(g,s,x,y,n,col,maxW){const L=wrapTo(g,s,maxW,n),lh=px(n)+5;L.forEach((l,i)=>put(g,l,x,y+(i-(L.length-1)/2)*lh,n,col))}
 function tile(g,r,col,a,bold){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=col;g.lineWidth=bold?3.5:1.8;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const slot=(i,cols,top,h)=>{const m=9,w=(A.W-m*(cols+1))/cols;return{x:m+(i%cols)*(w+m),y:top+Math.floor(i/cols)*(h+m),w,h}};
 const binR=j=>slot(j,2,A.H*.5,A.H*.2);
 const fixR=j=>slot(j,3,A.H*.42,A.H*.2);
 const joinR=j=>slot(j,5,A.H*.52,A.H*.13);
 function banner(g){if(!K.flash)return;const C=A.col,L=wrapTo(g,(K.bad?'✗ ':'✓ ')+K.flash,A.W-44,13),lh=px(13)+5,h=L.length*lh+12,y=A.H-h-6;tile(g,{x:12,y,w:A.W-24,h},K.bad?C.rd:C.gr,.13);L.forEach((l,i)=>put(g,l,A.W/2,y+6+lh*(i+.5),13,C.tx))}
 // word chips laid out in wrapped rows; gaps sit between chips
 function chips(g,words,top,n,extra){font(g,n,800);const gap=px(16),lh=px(n)+18+(extra||0),out=[];let x=14,y=top;words.forEach((w,i)=>{const wd=g.measureText(w).width+12;if(x+wd>A.W-14&&i){x=14;y+=lh}out.push({w,x,y,wd,h:px(n)+10});x+=wd+gap});return out}
 // ---------- scenes ----------
 const SCENE={
  cover(g,C){const it=COVER[K.n];if(!it)return para(g,'Two halves that stand alone: comma. One who, two verbs: no comma.',A.W/2,A.H*.22,15,C.gr,A.W-40);
   let r={x:12,y:A.H*.05,w:A.W-24,h:A.H*.34};if(K.grab!=null&&K.pt)r={...r,x:K.pt.x-r.w/2,y:K.pt.y-r.h/2};tile(g,r,C.cy,.12,true);
   const hw=(r.w-90)/2;[[it[0],r.x+8],[it[2],r.x+r.w-8-hw]].forEach(([s,x])=>{tile(g,{x,y:r.y+10,w:hw,h:r.h-20},C.vi,.1);para(g,s,x+hw/2,r.y+r.h/2,14,C.tx,hw-10)});
   put(g,it[1],r.x+r.w/2,r.y+r.h/2,18,C.am,800);
   ['comma: two sentences','no comma: one who, two verbs'].forEach((t,j)=>{const q=binR(j);tile(g,q,j?C.or:C.gr,.13);para(g,t,q.x+q.w/2,q.y+q.h/2,13,C.tx,q.w-12)})},
  gap(g,C){const it=GAPS[K.n];if(!it)return para(g,'The comma sits just before the joining word.',A.W/2,A.H*.22,15,C.gr,A.W-40);put(g,'Tap the gap where the comma goes',A.W/2,A.H*.06,13,C.mu);
   const L=chips(g,it[0].split(' '),A.H*.14,17);L.forEach((k,i)=>{const j=JOINERS.includes(k.w);tile(g,{x:k.x,y:k.y,w:k.wd,h:k.h},j?C.am:C.cy,j?.2:.1);put(g,k.w,k.x+k.wd/2,k.y+k.h/2,17,C.tx,800);
    if(i<L.length-1&&L[i+1].y===k.y){g.fillStyle=A.alpha(C.mu,.5);g.beginPath();g.arc(k.x+k.wd+px(8),k.y+k.h-4,3,0,7);g.fill()}})},
  pick(g,C){const it=PAIRS[K.n];if(!it)return para(g,'Each joining word has its own meaning.',A.W/2,A.H*.22,15,C.gr,A.W-40);const r={x:12,y:A.H*.05,w:A.W-24,h:A.H*.38};tile(g,r,C.cy,.12,true);
   para(g,it[0]+', ____',A.W/2,r.y+r.h*.3,16,C.tx,r.w-20);para(g,it[1]+'.',A.W/2,r.y+r.h*.72,16,C.tx,r.w-20);
   JOINERS.forEach((w,j)=>{let q=joinR(j);if(K.grab===j&&K.pt)q={...q,x:K.pt.x-q.w/2,y:K.pt.y-q.h/2};tile(g,q,C.vi,.14);put(g,w,q.x+q.w/2,q.y+q.h/2,16,C.tx,800)})},
  edit(g,C){const it=EDIT[K.n];if(!it)return para(g,'Paragraph fixed: commas only where two sentences meet.',A.W/2,A.H*.22,15,C.gr,A.W-40);const r={x:12,y:A.H*.05,w:A.W-24,h:A.H*.3};tile(g,r,C.pk,.12,true);para(g,it[0],A.W/2,r.y+r.h/2,17,C.tx,r.w-20);
   put(g,`Sentence ${K.n+1} of ${EDIT.length}`,A.W/2,A.H*.38,12,C.mu);FIX.forEach((t,j)=>{const q=fixR(j);tile(g,q,[C.gr,C.rd,C.cy][j],.13);para(g,t,q.x+q.w/2,q.y+q.h/2,13,C.tx,q.w-10)})},
  ands(g,C){const it=ANDS[K.n];if(!it)return para(g,'Only the and that joins two sentences gets a comma.',A.W/2,A.H*.22,15,C.gr,A.W-40);put(g,'Which and joins two sentences? Tap it.',A.W/2,A.H*.06,13,C.mu);
   let a=0;chips(g,it[0].split(' '),A.H*.14,17,14).forEach(k=>{const isA=k.w==='and';tile(g,{x:k.x,y:k.y,w:k.wd,h:k.h},isA?C.am:C.cy,isA?.22:.08,isA);put(g,k.w,k.x+k.wd/2,k.y+k.h/2,17,C.tx,800);if(isA){put(g,a?'2nd':'1st',k.x+k.wd/2,k.y+k.h+9,11,C.tx,700);a++}})}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.38);g.fillRect(0,0,W,H);const f=SCENE[phase()];if(f)f(g,C);else put(g,'sentence , and sentence',W/2,H/2,18,C.tx);banner(g);A.fx.draw(g)}

 // ---------- moves ----------
 function sort(j){const it=COVER[K.n];if(!it)return;const want=it[3]?0:1;if(j!==want)return nope(COVER_WHY[K.n]);K.n++;good((want?'No comma. ':'Comma. ')+COVER_WHY[K.n-1]);sync()}
 function gapAt(i){const it=GAPS[K.n];if(!it)return;const ws=it[0].split(' ');if(i!==it[1]){const after=i===it[1]+1;return nope(after?`Not after ${ws[i]}. The comma goes before the joining word, not after it.`:`That gap is inside one half of the sentence. The comma goes where the two sentences meet, just before ${ws[it[1]+1]}.`)}
  K.n++;good(`${ws.slice(0,i+1).join(' ')}, ${ws.slice(i+1).join(' ')}.`);sync()}
 function join(w){const it=PAIRS[K.n];if(!it)return;if(!it[2].includes(w))return nope(`${w} ${MEAN[w]}, but here ${it[3]}.`);K.n++;good(`${it[0]}, ${w} ${it[1]}. ${w} ${MEAN[w]}.`);sync()}
 function fix(j){const it=EDIT[K.n];if(!it)return;if(FIXK[j]!==it[1])return nope(it[2]);K.n++;good(it[2]);sync()}
 function andPick(k){const it=ANDS[K.n];if(!it)return;if(k!==it[1])return nope(it[2]);K.n++;good(it[2]);sync()}

 function sync(){const v=phase();let s='';
  if(v==='cover')s=K.n<COVER.length?`Sentence: ${COVER[K.n].slice(0,3).join(' ')}. Comma or no comma?`:'All sentences sorted.';
  else if(v==='gap')s=K.n<GAPS.length?`Sentence: ${GAPS[K.n][0]}. Which gap gets the comma?`:'All commas placed.';
  else if(v==='pick')s=K.n<PAIRS.length?`${PAIRS[K.n][0]}, blank, ${PAIRS[K.n][1]}. Which joining word?`:'All gaps filled.';
  else if(v==='edit')s=K.n<EDIT.length?`Sentence: ${EDIT[K.n][0]} Add, take out, or right?`:'Paragraph fixed.';
  else if(v==='ands')s=K.n<ANDS.length?`Sentence: ${ANDS[K.n][0]} First or second and?`:'All done.';else s='Challenge.';
  speak((K.flash?K.flash+' ':'')+s);controls();K.ok()}
 function controls(){if(!row)return;row.innerHTML='';const v=phase(),mk=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);b.onclick=f};
  if(v==='cover'&&K.n<COVER.length){mk('Comma: two sentences',()=>sort(0));mk('No comma: one who',()=>sort(1))}
  if(v==='gap'&&K.n<GAPS.length){const ws=GAPS[K.n][0].split(' ');ws.slice(0,-1).forEach((w,i)=>mk('after '+w,()=>gapAt(i),`Comma after ${w}`))}
  if(v==='pick'&&K.n<PAIRS.length)JOINERS.forEach(w=>mk(w,()=>join(w)));
  if(v==='edit'&&K.n<EDIT.length)FIX.forEach((t,j)=>mk(t,()=>fix(j)));
  if(v==='ands'&&K.n<ANDS.length){mk('first and',()=>andPick(0));mk('second and',()=>andPick(1))}A.redraw()}

 function nearGap(p,words){const g=A.ctx,L=chips(g,words,A.H*.14,17);let best=-1,d=1e9;L.forEach((k,i)=>{if(i===L.length-1)return;const gx=k.x+k.wd+px(8),gy=k.y+k.h/2,dd=Math.hypot(p.x-gx,(p.y-gy)*1.6);if(dd<d){d=dd;best=i}});return d<px(40)?best:-1}
 function press(p){const v=phase();K.grab=null;K.pt=null;
  if(v==='cover'&&K.n<COVER.length){const j=[0,1].find(j=>hit(p,binR(j)));if(j!=null){sort(j);return false}if(p.y<A.H*.42){K.grab=0;K.pt=p;return true}}
  if(v==='gap'&&K.n<GAPS.length){const i=nearGap(p,GAPS[K.n][0].split(' '));if(i>=0)gapAt(i);return false}
  if(v==='pick'&&K.n<PAIRS.length){const j=JOINERS.findIndex((w,j)=>hit(p,joinR(j)));if(j>=0){K.grab=j;K.pt=p;return true}}
  if(v==='edit'&&K.n<EDIT.length){const j=[0,1,2].find(j=>hit(p,fixR(j)));if(j!=null)fix(j);return false}
  if(v==='ands'&&K.n<ANDS.length){const L=chips(A.ctx,ANDS[K.n][0].split(' '),A.H*.14,17,14).filter(k=>k.w==='and'),k=L.findIndex(k=>hit(p,{x:k.x-6,y:k.y-6,w:k.wd+12,h:k.h+12}));if(k>=0)andPick(k);return false}
  return false}
 function release(p){const v=phase(),h=K.grab;K.grab=null;K.pt=null;if(h==null)return A.redraw();
  if(v==='cover'){const j=[0,1].find(j=>hit(p,binR(j)));j!=null?sort(j):A.redraw()}
  else if(v==='pick'){if(p.y<A.H*.46||hit(p,joinR(h)))join(JOINERS[h]);else A.redraw()}}

 // ---------- steps ----------
 const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=list=>{const id=++K.run,dt=A.reduced()?15:320;list.forEach((f,i)=>setTimeout(()=>{if(id===K.run)f()},i*dt))};
 const clear=()=>{K.run++;K.ok=()=>{};K.n=0;K.flash='';K.bad=false;K.grab=null};
 const steps=[
  {h:'Can each half stand alone?',p:'Cover the joining word. If both halves are complete sentences, each with its own who and verb, put a comma before the joining word. If the second half has no who, it is one sentence: no comma. Drag the sentence to a box, or tap a box.',
   predict:{q:'“She sang and danced.” Does it need a comma before and?',opts:['Yes: a comma goes before every and','No: danced has no who of its own'],ans:1},task:'Sort 6 sentences',
   show:()=>{steps[0].go();auto(COVER.map(it=>()=>sort(it[3]?0:1)))},go:()=>{clear();sync();K.ok=finish(0,()=>K.n>=COVER.length,'Two sentences joined: comma. One who doing two things: no comma.')}},
  {h:'Before, not after',p:'The comma goes where the two sentences meet, just before the joining word. Tap the gap where it belongs.',
   predict:{q:'“I was tired but I kept going.” Where does the comma go?',opts:['Before but','After but'],ans:0},task:'Place 4 commas',
   show:()=>{steps[1].go();auto(GAPS.map(it=>()=>gapAt(it[1])))},go:()=>{clear();sync();K.ok=finish(1,()=>K.n>=GAPS.length,'Cold, so. Football, but. Juice, or. Barked, yet. Always before the joining word.')}},
  {h:'Pick a joining word that fits',p:'And, but, or, so and yet are coordinating conjunctions. Each one means something different. Drag the joining word that fits up into the gap, or tap it.',
   task:'Join 4 pairs',show:()=>{steps[2].go();auto(PAIRS.map(it=>()=>join(it[2][0])))},go:()=>{clear();sync();K.ok=finish(2,()=>K.n>=PAIRS.length,'So for a result, but or yet for a contrast, or for a choice, and to add.')}},
  {h:'Edit the paragraph',p:'Some commas are missing and some should not be there. For each sentence, add a comma, take it out, or leave it.',
   task:'Check 6 sentences',show:()=>{steps[3].go();auto(EDIT.map(it=>()=>fix(FIXK.indexOf(it[1]))))},go:()=>{clear();sync();K.ok=finish(3,()=>K.n>=EDIT.length,'Add where two sentences meet; take out where one who does two things.')}},
  {h:'Which and joins sentences?',p:'And can join two words, like fish and chips. It only needs a comma when it joins two sentences. Tap the and that joins two sentences.',
   task:'Find the and in 4 sentences',show:()=>{steps[4].go();auto(ANDS.map(it=>()=>andPick(it[1])))},go:()=>{clear();sync();K.ok=finish(4,()=>K.n>=ANDS.length,'Words joined by and: no comma. Sentences joined by and: comma before it.')}},
  {h:'Challenge',p:'',go:()=>{clear();next()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>K.ok()});

 // ---------- challenge: each wrong option names the slip ----------
 const Q=[['Which sentence is punctuated correctly?','The sun came out, and the snow melted.',[['The sun came out and, the snow melted.','after'],['The sun came out, the snow melted.','splice']]],
  ['Which sentence is punctuated correctly?','Leo opened the box and laughed.',[['Leo opened the box, and laughed.','onewho'],['Leo opened, the box and laughed.','inside']]],
  ['Which sentence is punctuated correctly?','We could stay in, or we could go to the beach.',[['We could stay in or we could go to the beach.','missing'],['We could stay in, or, we could go to the beach.','after']]],
  ['Which sentence is punctuated correctly?','I studied hard, so I passed the test.',[['I studied hard so, I passed the test.','after'],['I studied hard, I passed the test.','splice']]],
  ['Which sentence is punctuated correctly?','Grandpa planted seeds and watered them.',[['Grandpa planted seeds, and watered them.','onewho'],['Grandpa, planted seeds and watered them.','inside']]],
  ['Which sentence is punctuated correctly?','The film was long, yet nobody got bored.',[['The film was long yet nobody got bored.','missing'],['The film was long, nobody got bored.','splice']]]];
 function slip(tag){let m='Read each half again and test whether it stands alone.';
  if(tag==='after')m='The comma is after the joining word. It belongs before it, where the two sentences meet.';
  if(tag==='splice')m='A comma alone cannot join two sentences. That is a comma splice: keep the joining word too.';
  if(tag==='onewho')m='The second half has no who of its own: one person does two things, so there is no comma.';
  if(tag==='missing')m='Both halves stand alone, so a comma is needed before the joining word.';
  if(tag==='inside')m='That comma splits one half in the middle. Commas before joining words sit only where two sentences meet.';
  return m}
 let qi=-1,streak=0;
 function next(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,w);b.onclick=()=>judge(tag,ans)});speak('Challenge: '+q);A.redraw()}
 function judge(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
  if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+' Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}

 A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;row.hidden=A.step===5;controls()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comma controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{K.pt=p;A.redraw()},up:release})}});
 A.start()})})();
