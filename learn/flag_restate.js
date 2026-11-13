/* Flagship – paraphrasing what you hear (ages 9–10; CCSS SL.4.2): copy vs paraphrase vs changed meaning, main idea,
   safe word swaps, spotting a changed fact, retelling in order. */
(()=>{
/* [heard, retelling, 0 copy/1 paraphrase/2 changed, why] */
const HEARD=['Bees visit flowers to collect nectar, which they turn into honey.','Most owls hunt at night and sleep during the day.'];
const SORT=[[0,'Bees visit flowers to collect nectar, which they turn into honey.',0,'Every word is the same, so this is a copy, not your own words.'],
 [0,'Bees go to flowers for nectar and make it into honey.',1,'New words, same facts: nectar from flowers becomes honey.'],
 [0,'Bees make nectar out of the honey they find in flowers.',2,'This swaps nectar and honey round, so the fact is now wrong.'],
 [1,'All owls hunt at night.',2,'Most became all. That changes the meaning.'],
 [1,'Most owls rest by day and look for food after dark.',1,'New words, same meaning: most owls, active at night, asleep by day.'],
 [1,'Most owls hunt at night and sleep during the day.',0,'Every word is the same, so it is a copy.']];
const BINS=['copied','paraphrase','meaning changed'];
/* [talk, [choice, 0 main/1 detail/2 not said]] */
const GIST=[['Hedgehogs sleep through the winter. Before it gets cold they eat lots of slugs and beetles. Then they curl up in a nest of leaves until spring.',
  [['Hedgehogs get ready for a long winter sleep.',0],['Hedgehogs eat beetles.',1],['Hedgehogs like the snow.',2]]],
 ['The Great Wall of China was built over hundreds of years. Many rulers added parts to it. Today it stretches for thousands of miles.',
  [['The wall grew bit by bit over a very long time.',0],['Many rulers lived in China.',1],['The wall was built in one year.',2]]],
 ['Our school is starting a garden club. It meets on Fridays at lunch. You can grow beans, herbs and sunflowers.',
  [['A new garden club is starting at school.',0],['Sunflowers can be grown.',1],['The club meets every day after school.',2]]]];
/* [sentence, word, safe swap, [[decoy, why]]] */
const SWAP=[['The storm destroyed three houses.','destroyed','wrecked',[['damaged','damaged is weaker than destroyed.'],['built','built is the opposite.']]],
 ['The trip was cancelled because of snow.','cancelled','called off',[['delayed','delayed means it still happened, later.'],['planned','planned changes the meaning: the trip was stopped.']]],
 ['Tom rarely eats meat.','rarely','hardly ever',[['never','never is stronger. Rarely means sometimes, but not often.'],['often','often is the opposite of rarely.']]],
 ['The bridge is about 50 metres long.','about','roughly',[['exactly','about means near, not exact.'],['over','over means more than 50. About can be a bit less.']]],
 ['Ali was furious.','furious','very angry',[['a bit cross','a bit cross is far too weak.'],['tired','tired is a different feeling.']]]];
/* [heard, retelling, changed word(s), what changed] */
const SPOT=[['The library opens at nine on Saturdays.',['On','Saturdays,','the','library','shuts','at','nine.'],[4],'opens became shuts.'],
 ['Some frogs can change colour.',['Every','frog','can','change','colour.'],[0],'some became every.'],
 ['The bus was late, so Mia missed the start.',['Mia','missed','the','start','because','she','was','late.'],[5],'Now Mia was late. In the talk it was the bus.'],
 ['Sharks have lived on Earth for over 400 million years.',['Sharks','have','been','around','for','40','million','years.'],[5],'400 became 40.'],
 ['Jack gave the book to Sara.',['Sara','gave','Jack','the','book.'],[0,2],'Jack and Sara swapped places: now Sara is the giver.']];
/* [talk, points in order] */
const SEQ=[['First we filled a pot with soil. Next we pushed a seed into it. After that we gave it a drink. Last, it went on a sunny window sill.',['Fill a pot with soil.','Push the seed in.','Water it.','Put it in a sunny spot.']],
 ['When the bell went off, we got into a line by the door. Then we walked out to the field. At the end, the teacher read out our names.',['The bell rang.','We lined up at the door.','We walked to the field.','The teacher called our names.']],
 ['A mother frog lays her eggs in a pond. Tiny tadpoles come out of the eggs. Bit by bit, the tadpoles grow legs. In the end they are frogs.',['A frog lays eggs.','Tadpoles hatch.','Tadpoles grow legs.','They become frogs.']]];
VIS.reg('flagrestate',c=>{let A,ctx,pad,chal,qx=-1,tok=0;const Z={};
const PK='#ffe4e6',DARK='#0f172a',CARD='#ffffff',LINE='#64748b',YES='#047857',NO='#be123c',BUB='#e0f2fe',BUBI='#0c4a6e',PICK='#1d4ed8';
const u=n=>Math.round(n*(A.narrow?.92:1.08)),face=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`,inside=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const ORDER=['sort','gist','swap','spot','seq','quiz'],part=()=>ORDER[A.step],DATA={sort:SORT,gist:GIST,swap:SWAP,spot:SPOT,seq:SEQ},cp=k=>Z[k].i>=DATA[k].length;
const red=()=>A.col.dark?'#fda4af':NO;
function wsh(){ctx.fillStyle=A.col.dark?'#0b1120':'#f8fafc';ctx.fillRect(0,0,A.W,A.H)}
function type(n,w,al){ctx.font=face(n,w);ctx.textAlign=al||'center';ctx.textBaseline='middle'}
function para(t,x,y,w,n){const L=[];let cur='';String(t).split(' ').forEach(q=>{const k=cur?cur+' '+q:q;if(ctx.measureText(k).width>w&&cur){L.push(cur);cur=q}else cur=k});L.push(cur);
 const lh=u(n)*1.26;L.forEach((s,i)=>ctx.fillText(s,x,y+(i-(L.length-1)/2)*lh));return L.length*lh}
function pn(r,t,o){o=o||{};ctx.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);ctx.fill();ctx.lineWidth=o.ring?3.5:1.4;ctx.strokeStyle=o.ring||LINE;ctx.stroke();
 if(t!=null){ctx.fillStyle=o.fg||DARK;type(o.n||17,o.w||700);para(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function ttl(t,won){type(14,800);const w=Math.min(A.W-8,ctx.measureText(t).width+26),h=u(14)+14,y=A.H*.02;pn({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':CARD,ring:won?YES:null});ctx.fillStyle=DARK;ctx.fillText(t,A.W/2,y+h/2+1,w-12)}
function ln(t,y,n,col){ctx.fillStyle=col||A.col.tx;type(n||15,650);para(t,A.W/2,y,A.W-26,n||15)}
function bubble(t,y,h,n){const r={x:14,y,w:A.W-28,h};pn(r,null,{bg:BUB});ctx.fillStyle=BUB;ctx.beginPath();ctx.moveTo(r.x+28,r.y+r.h-1);ctx.lineTo(r.x+20,r.y+r.h+12);ctx.lineTo(r.x+44,r.y+r.h-1);ctx.fill();
 ctx.fillStyle=BUBI;type(n||15,700);para('You heard: '+t,A.W/2,r.y+r.h/2,r.w-18,n||15)}
function fin(t,L){wsh();ttl(t,1);L.forEach((s,i)=>pn({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
function tiles(words,y0,n){type(n,750);const h=u(n)+u(16),R=[[]];let x=0,y=y0;
 words.forEach((t,i)=>{const w=ctx.measureText(t).width+u(16);if(x+w>A.W-24&&x>0){R.push([]);x=0;y+=h+u(10)}R[R.length-1].push({t,i,x,y,w,h});x+=w+u(9)});
 R.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>q.x+=off)});return R.flat()}
/* ---- 1: copied, paraphrase or changed ---- */
function bins(){const y=A.H*.67,h=A.H*.24,gp=8,w=(A.W-24-2*gp)/3;return BINS.map((t,b)=>({b,t,x:12+b*(w+gp),y,w,h}))}
function srd(){const w=Math.min(A.W-24,u(360)),h=u(70);return Z.h&&Z.h.card?{x:Z.h.x-w/2,y:Z.h.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.33,w,h}}
function drawSort(){const s=Z.sort;wsh();if(cp('sort'))return fin('All 6 retellings sorted',['Copied: the same words.','Paraphrase: new words, same meaning.','Changed: a fact is wrong (most → all).']);
 const [hi,t]=SORT[s.i];ttl(`Retelling ${s.i+1} of 6: drag it to a box`);bubble(HEARD[hi],A.H*.12,A.H*.15,14);
 bins().forEach(r=>pn(r,r.t,{n:15,bg:['#f1f5f9','#dcfce7',PK][r.b],ring:s.bad===r.b?NO:null}));pn(srd(),t,{n:15,ring:Z.h?PICK:null});if(s.msg)ln(s.msg,A.H*.565,13,red())}
function sortIt(b){const s=Z.sort;if(cp('sort'))return;const [hi,t,ans,why]=SORT[s.i];let m;
 if(b===ans){s.i++;s.msg='';s.bad=null;A.sound.pop();return tell(`${BINS[ans]}. ${why}`)}
 s.bad=b;A.sound.miss();
 if(b===0)m=`Not a copy: some words are new. ${why}`;else if(b===1)m=`A paraphrase keeps the meaning. ${why}`;else m=`The meaning has not changed. ${why}`;s.msg=m;tell(m)}
/* ---- 2: main idea ---- */
function gso(){const [, C]=GIST[Z.gist.i],k=Z.gist.i%3,ord=C.slice(k).concat(C.slice(0,k)),h=u(52),gp=u(8);return ord.map((q,j)=>({t:q[0],kind:q[1],x:20,w:A.W-40,h,y:A.H*.43+j*(h+gp)}))}
function drawGist(){const s=Z.gist;wsh();if(cp('gist'))return fin('All 3 main ideas found',['The main idea is what the whole talk is about.','A small detail is true, but only part of it.']);
 ttl(`Talk ${s.i+1} of 3: tap the main idea`);bubble(GIST[s.i][0],A.H*.11,A.H*.28,14);
 gso().forEach(r=>pn(r,r.t,{n:16,bg:s.bad===r.kind?PK:CARD,ring:s.bad===r.kind?NO:null}));if(s.msg)ln(s.msg,Math.max(A.H*.88,gso()[2].y+gso()[2].h+u(22)),13,red())}
function gist(kind,t){const s=Z.gist;if(cp('gist'))return;let m;
 if(kind===0){s.i++;s.msg='';s.bad=null;A.sound.pop();return tell(`Yes: ${t} That is what every sentence is about.`)}
 s.bad=kind;A.sound.miss();if(kind===1)m='That is true, but it is one small detail. The main idea covers the whole talk.';else m='That was never said. A paraphrase only uses what you heard.';s.msg=m;tell(m)}
/* ---- 3: swap a word ---- */
function swo(){const [, ,ok,bad]=SWAP[Z.swap.i],all=[ok,...bad.map(b=>b[0])],k=(Z.swap.i+1)%3,ord=all.slice(k).concat(all.slice(0,k)),w=Math.min(u(150),(A.W-40)/3),gp=10,tot=3*w+2*gp;
 return ord.map((t,j)=>{const r={t,x:A.W/2-tot/2+j*(w+gp),y:A.H*.68,w,h:u(56)};return Z.h&&Z.h.word===t?{...r,x:Z.h.x-w/2,y:Z.h.y-r.h/2}:r})}
function slotR(){return{x:A.W*.2,y:A.H*.36,w:A.W*.6,h:u(52)}}
function drawSwap(){const s=Z.swap;wsh();if(cp('swap'))return fin('All 5 words swapped',['destroyed → wrecked, cancelled → called off','rarely → hardly ever (not never)','about → roughly (not exactly)']);
 const [sent,word]=SWAP[s.i];ttl(`Word ${s.i+1} of 5: drag a word that means the same`);bubble(sent,A.H*.12,A.H*.13,16);
 ctx.fillStyle=A.col.tx;type(15,700);ctx.fillText(`Swap "${word}" for:`,A.W/2,A.H*.31);const r=slotR();ctx.setLineDash([6,4]);pn(r,null,{bg:'#fef9c3'});ctx.setLineDash([]);
 if(s.msg)ln(s.msg,A.H*.56,13,red());swo().forEach(q=>pn(q,q.t,{n:16,bg:'#ede9fe',fg:'#2e1065',ring:Z.h&&Z.h.word===q.t?PICK:s.bad===q.t?NO:null}))}
function swap(t){const s=Z.swap;if(cp('swap'))return;const [sent,word,ok,bad]=SWAP[s.i];let m;
 if(t===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return tell(`${sent.replace(word,ok)} Same meaning, your own words.`)}
 s.bad=t;A.sound.miss();m=`"${t}" changes the meaning: ${(bad.find(b=>b[0]===t)||[0,''])[1]}`;s.msg=m;tell(m)}
/* ---- 4: spot the change ---- */
function spr(){return tiles(SPOT[Z.spot.i][1],A.H*.42,20)}
function drawSpot(){const s=Z.spot;wsh();if(cp('spot'))return fin('All 5 changes spotted',['opens → shuts, some → every','400 → 40: numbers must stay the same']);
 ttl(`Retelling ${s.i+1} of 5: tap the word that changes the meaning`);bubble(SPOT[s.i][0],A.H*.12,A.H*.15,15);ln('Someone retold it:',A.H*.35,14);
 const T=spr();T.forEach(r=>pn(r,r.t,{n:20,bg:s.bad===r.i?PK:CARD,ring:s.bad===r.i?NO:null}));if(s.msg)ln(s.msg,Math.max(...T.map(r=>r.y+r.h))+u(40),13,red())}
function spot(i){const s=Z.spot;if(cp('spot'))return;const [heard,W,hit,what]=SPOT[s.i];let m;
 if(hit.includes(i)){s.i++;s.msg='';s.bad=null;A.sound.pop();return tell(`Found it: ${what}`)}
 s.bad=i;A.sound.miss();m=`"${W[i]}" is fine. Check who, what, how many, when.`;s.msg=m;tell(m)}
/* ---- 5: retell in order ---- */
function sqc(){const [,P]=SEQ[Z.seq.i],mix=[2,0,3,1].map(j=>({t:P[j],j})),h=u(46),gp=u(7);return mix.map((q,k)=>({...q,x:20,w:A.W-40,h,y:A.H*.4+k*(h+gp)}))}
function drawSeq(){const s=Z.seq;wsh();if(cp('seq'))return fin('All 3 retold in order',['Keep the order you heard.','Listen for first, then, next, at the end.']);
 const [heard,P]=SEQ[s.i];ttl(`Talk ${s.i+1} of 3: tap the points in order`);bubble(heard,A.H*.1,A.H*.22,14);ln(`Tap point ${s.n+1} of 4`,A.H*.365,15);
 sqc().forEach(r=>{const done=r.j<s.n;pn(r,(done?`${r.j+1}. `:'')+r.t,{n:16,bg:done?'#dcfce7':s.bad===r.j?PK:CARD,ring:done?YES:s.bad===r.j?NO:null})});if(s.msg){const L=sqc()[3];ln(s.msg,Math.max(A.H*.9,L.y+L.h+u(22)),13,red())}}
function seq(j){const s=Z.seq;if(cp('seq'))return;const [heard,P]=SEQ[s.i];let m;if(j<s.n)return;
 if(j===s.n){s.n++;s.bad=null;s.msg='';A.sound.pop();if(s.n===P.length){s.i++;s.n=0;return tell(`Retold in order: ${P.join(' Then ')}`)}return tell(`Step ${s.n}: ${P[j]}`)}
 s.bad=j;A.sound.miss();m=`"${P[j]}" comes later. What had to happen just after "${s.n?P[s.n-1]:'the start'}"?`;s.msg=m;tell(m)}
/* ---- pointer ---- */
function down(p){const k=part();
 if(k==='gist'&&!cp('gist')){const r=gso().find(r=>hit(p,r));if(r)gist(r.kind,r.t)}
 if(k==='spot'&&!cp('spot')){const r=spr().find(r=>hit(p,r));if(r)spot(r.i)}
 if(k==='seq'&&!cp('seq')){const r=sqc().find(r=>hit(p,r));if(r)seq(r.j)}
 if(k==='sort'&&!cp('sort')&&hit(p,srd())){Z.h={card:1,x:p.x,y:p.y};A.redraw();return true}
 if(k==='swap'&&!cp('swap')){const q=swo().find(q=>hit(p,q));if(q){Z.h={word:q.t,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(Z.h){Z.h.x=p.x;Z.h.y=p.y;A.redraw()}}
function up(p){const d=Z.h;if(!d)return;Z.h=null;const k=part();
 if(k==='sort'){const b=bins().find(r=>hit(p,r));if(b)return sortIt(b.b)}
 if(k==='swap'&&hit(p,slotR(),u(24)))return swap(d.word);A.redraw()}
function clear(){tok++;for(const k in Z)delete Z[k];Object.assign(Z,{sort:{i:0},gist:{i:0},swap:{i:0},spot:{i:0},seq:{i:0,n:0},hold:null,test:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.test()}
function enter(i,first,ok,msg){clear();tell(first);Z.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function hear(t){try{if(window.speechSynthesis&&window.SpeechSynthesisUtterance){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}}catch(e){}}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 const said={sort:()=>HEARD[SORT[Z.sort.i][0]],gist:()=>GIST[Z.gist.i][0],swap:()=>SWAP[Z.swap.i][0],spot:()=>SPOT[Z.spot.i][0],seq:()=>SEQ[Z.seq.i][0]};
 if(said[k]&&!cp(k))b('🔊 Hear it',()=>hear(said[k]()),'Hear it read aloud');
 if(k==='sort'&&!cp('sort'))BINS.forEach((t,j)=>b(t,()=>sortIt(j),`Sort as ${t}`));
 if(k==='gist'&&!cp('gist'))gso().forEach(r=>b(r.t,()=>gist(r.kind,r.t),`Main idea: ${r.t}`));
 if(k==='swap'&&!cp('swap'))swo().forEach(r=>b(r.t,()=>swap(r.t),`Swap in ${r.t}`));
 if(k==='spot'&&!cp('spot'))SPOT[Z.spot.i][1].forEach((w,j)=>b(w,()=>spot(j),`${w} changes the meaning`));
 if(k==='seq'&&!cp('seq'))sqc().forEach(r=>b(r.t,()=>seq(r.j),`Next point: ${r.t}`))}
const steps=[
{h:'Copy or paraphrase?',p:'To paraphrase, say what you heard in your own words with the same meaning. Same words is copying; a changed fact is not a paraphrase.',
predict:{q:'You heard "Most owls hunt at night." Is "All owls hunt at night" a fair paraphrase?',opts:['yes, close enough','no: the meaning changed'],ans:1},task:'Sort all 6 retellings',
show:()=>auto(0,SORT.map(q=>()=>sortIt(q[2])),600),go:()=>enter(0,'Drag the card to copied, paraphrase or meaning changed.',()=>cp('sort'),'New words, same meaning.')},
{h:'Keep the main idea',p:'Before you retell, ask: what was the whole talk about? That is the main idea. Details come after it.',
predict:{q:'Which is the main idea?',opts:['the most interesting fact','what the whole talk is about'],ans:1},task:'Find all 3 main ideas',
show:()=>auto(1,GIST.map(()=>()=>gist(0,'')),600),go:()=>enter(1,'Tap the main idea.',()=>cp('gist'),'Main idea first, then details.')},
{h:'Swap the words',p:'Swap a word for one that means the same. Watch out: some swaps make the meaning stronger, weaker or opposite.',
predict:{q:'"Tom rarely eats meat." Can you swap rarely for never?',opts:['yes, they mean the same','no: never is stronger'],ans:1},task:'Swap all 5 words',
show:()=>auto(2,SWAP.map(q=>()=>swap(q[2])),600),go:()=>enter(2,'Drag a word into the yellow gap.',()=>cp('swap'),'Same meaning, your own words.')},
{h:'Spot the change',p:'A new word order is fine. A new fact is not. Check who did it, what happened, how many and when.',task:'Spot all 5 changes',
show:()=>auto(3,SPOT.map(q=>()=>spot(q[2][0])),650),go:()=>enter(3,'Tap the word that changes the meaning.',()=>cp('spot'),'Who, what, how many, when: keep them all.')},
{h:'Retell in order',p:'Keep the points in the order you heard them. Order words like first, then and at the end help your listener.',task:'Retell all 3 in order',
show:()=>auto(4,SEQ.flatMap(q=>q[1].map((_,j)=>()=>seq(j))),350),go:()=>enter(4,'Tap the points in the order you heard them.',()=>cp('seq'),'Same order, your own words.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.test()});
const QS=[
{q:'You heard: "Rain is falling across the north today." Which is a paraphrase?',a:'It is raining in the north today.',o:[['Rain is falling across the north today.','Word for word: a copy.'],['It is raining everywhere today.','everywhere changes it: the talk said the north.']]},
{q:'"Many children walk to school." Which swap keeps the meaning?',a:'Lots of children walk to school.',o:[['All children walk to school.','all is stronger than many.'],['Few children walk to school.','few is the opposite of many.']]},
{q:'A talk says snails sleep in winter, hide under logs and wake in spring. What is the main idea?',a:'Snails rest through the winter.',o:[['Snails hide under logs.','That is one detail, not the whole talk.'],['Snails like rain.','The talk never said that.']]},
{q:'You heard: "The match starts at 3 pm." Which retelling has a slip?',a:'The match ends at 3 pm.',o:[['At 3 pm the match begins.','begins means starts: fair.'],['The game kicks off at 3 pm.','kicks off means starts: fair.']]},
{q:'You heard: "Sam helped his little sister." Which is a fair paraphrase?',a:'Sam gave his little sister a hand.',o:[['His little sister helped Sam.','That swaps who helped whom.'],['Sam helped his sister a bit.','a bit was never said.']]},
{q:'Why paraphrase instead of copying?',a:'It shows you understood it.',o:[['It makes it longer.','Length is not the point: understanding is.'],['You can change the facts.','A paraphrase must keep the facts the same.']]}];
function quiz(){qx++;const Q=QS[qx%QS.length],all=[[Q.a,''],...Q.o],r=qx%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why)}
function draw(){const k=part();if(k==='quiz'){wsh();ttl('Challenge',1);['Copy: same words','Paraphrase: new words, same meaning','Changed: a fact is wrong'].forEach((t,i)=>pn({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:18,bg:['#f1f5f9','#dcfce7',PK][i]}));return}
 ({sort:drawSort,gist:drawGist,swap:drawSwap,spot:drawSpot,seq:drawSeq})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.7,tall:1.32,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;ctx=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Retelling buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
