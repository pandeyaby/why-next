/* Flagship – syllables (ages 5–6, with a grown-up): clap the beats in a word, find out that long words can have
   one beat, glue spoken parts into a word, chop written words at the beat breaks, and sort pictures by their beats.
   Every action is a big canvas target and a button too. */
(()=>{
 // Each word: text, picture, spoken parts. The parts are the beats.
 const W=(w,e,p)=>({w,e,p:p.split('-')});
 const CLAP=[W('cat','🐱','cat'),W('rabbit','🐰','rab-bit'),W('butterfly','🦋','but-ter-fly')];
 const PAIR=[W('strong','💪','strong'),W('banana','🍌','ba-na-na')];
 const GLUE=[W('rainbow','🌈','rain-bow'),W('popcorn','🍿','pop-corn'),W('dinosaur','🦕','di-no-saur')];
 const CHOP=[['rabbit','🐰',[3]],['carrot','🥕',[3]],['thunder','⛈️',[4]],['tomato','🍅',[2,4]]];
 const SORT=[W('train','🚂','train'),W('apple','🍎','ap-ple'),W('cake','🎂','cake'),W('elephant','🐘','el-e-phant'),W('pencil','✏️','pen-cil'),W('computer','💻','com-pu-ter')];
 const SORT_TIP={cake:'Cake has an a and an e, but the e at the end is quiet. Say it: cake. One beat.',
  elephant:'Say it slowly: el-e-phant. Three beats.',train:'Train has five letters, but you say it in one go. One beat.'};
 const BEATS=['1 beat','2 beats','3 beats'];
 const PAL=['#f97316','#8b5cf6','#06b6d4','#ec4899'];
VIS.reg('flagsyl',c=>{let A,pad,quiz,reader;c.fig.classList.add('young');
 const st={i:0,claps:0,wrong:null,pairDone:[0,0],slots:[],tiles:[],cut:new Set(),sorted:0,drag:null,at:null,flash:0,tok:0,onChange:()=>{}};
 const stepName=()=>['clap','pair','glue','chop','sort','quiz'][A.step];

 // ---------- speaking: the canvas label is the live description ----------
 function tell(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}
 function miss(t){A.sound.miss();tell(t);A.redraw()}

 // ---------- drawing helpers ----------
 const fs=n=>A.narrow?n:Math.round(n*1.25);
 function text(g,t,x,y,n,col,weight){g.font=`${weight||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-12)}
 function pic(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function card(g,r,col,strong,fill){g.fillStyle=A.alpha(col,fill||.16);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=col;g.lineWidth=strong?4:2;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function row(i,n,y,h){const gap=10,w=(A.W-gap*(n+1))/n;return{x:gap+i*(w+gap),y,w,h}}
 const clapR=()=>({x:A.W*.06,y:A.H*.6,w:A.W*.52,h:Math.min(130,A.H*.32)});
 const allR=()=>({x:A.W*.62,y:A.H*.6,w:A.W*.32,h:Math.min(130,A.H*.32)});

 // The spoken parts of a word, lit up one by one as the child claps.
 function parts(g,word,lit,y,n){const ps=word.p,widths=ps.map(s=>s.length*fs(n)*.62+22),total=widths.reduce((a,b)=>a+b,0)+(ps.length-1)*8;let x=A.W/2-total/2;
  ps.forEach((s,j)=>{const r={x,y:y-fs(n)*.8,w:widths[j],h:fs(n)*1.6},on=j<lit;card(g,r,on?PAL[j%4]:A.col.mu,on,on?.28:.06);text(g,s,x+widths[j]/2,y,n,on?A.col.tx:A.col.mu);x+=widths[j]+8})}
 function clapScene(g,word,count){const C=A.col;pic(g,word.e,A.W/2,A.H*.13,Math.min(70,A.H*.16));parts(g,word,Math.min(count,word.p.length),A.H*.34,20);
  text(g,'👏'.repeat(Math.min(count,6))||' ',A.W/2,A.H*.5,18,C.tx);
  card(g,clapR(),C.or,true,.2);text(g,'👏 Clap',clapR().x+clapR().w/2,clapR().y+clapR().h/2,22,C.tx);
  card(g,allR(),st.wrong?C.rd:C.gr,!!st.wrong,.18);text(g,'✋ Done',allR().x+allR().w/2,allR().y+allR().h/2,18,C.tx)}
 function drawClap(g){if(st.i>=CLAP.length)return text(g,'Three words clapped! Each clap is one beat.',A.W/2,A.H*.4,15,A.col.gr);clapScene(g,CLAP[st.i],st.claps)}
 function drawPair(g){const C=A.col;if(st.i>=PAIR.length){PAIR.forEach((w,j)=>{const r=row(j,2,A.H*.08,A.H*.8);card(g,r,PAL[j],false,.1);pic(g,w.e,r.x+r.w/2,r.y+r.h*.18,44);text(g,w.w,r.x+r.w/2,r.y+r.h*.38,18,C.tx);
   text(g,`${w.w.length} letters`,r.x+r.w/2,r.y+r.h*.58,14,C.mu,700);text(g,`${w.p.length} ${w.p.length>1?'beats':'beat'}`,r.x+r.w/2,r.y+r.h*.75,18,C.gr);text(g,'👏'.repeat(w.p.length),r.x+r.w/2,r.y+r.h*.9,16,C.tx)});return}
  const w=PAIR[st.i];clapScene(g,w,st.claps);text(g,`${w.w.length} letters: ${w.w.split('').join(' ')}`,A.W/2,A.H*.03+10,14,C.mu,700)}
 const slotR=(j,n)=>{const w=Math.min(130,(A.W-20-(n-1)*10)/n),tot=n*w+(n-1)*10;return{x:A.W/2-tot/2+j*(w+10),y:A.H*.3,w,h:Math.min(70,A.H*.17)}};
 const tileR=(j,n)=>row(j,n,A.H*.66,Math.min(80,A.H*.2));
 function drawGlue(g){const C=A.col;if(st.i>=GLUE.length)return text(g,'You glued three words together!',A.W/2,A.H*.4,15,C.gr);const w=GLUE[st.i],n=w.p.length,full=st.slots.length===n;
  pic(g,full&&!st.wrong?w.e:'❓',A.W/2,A.H*.13,Math.min(60,A.H*.15));
  for(let j=0;j<n;j++){const r=slotR(j,n),t=st.slots[j];card(g,r,st.wrong?C.rd:C.vi,!!st.wrong,t!=null?.25:.05);text(g,t!=null?w.p[t]:(j?'then':'first'),r.x+r.w/2,r.y+r.h/2,t!=null?20:15,t!=null?C.tx:C.mu)}
  if(full&&!st.wrong)text(g,w.p.join(' + ')+' = '+w.w,A.W/2,A.H*.55,16,C.gr);
  st.tiles.forEach((t,j)=>{if(st.slots.includes(t))return;let r=tileR(j,st.tiles.length);if(st.drag===j&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};card(g,r,PAL[j%4],false,.22);text(g,w.p[t],r.x+r.w/2,r.y+r.h/2,20,C.tx)})}
 // Letter tiles for chopping; tapping near a gap toggles a cut there.
 function letterBox(word){const n=word.length,w=Math.min(64,(A.W-24)/n),tot=w*n;return{x0:A.W/2-tot/2,w,y:A.H*.36,h:Math.min(80,A.H*.2)}}
 function drawChop(g){const C=A.col;if(st.i>=CHOP.length)return text(g,'All chopped! Each piece is one beat.',A.W/2,A.H*.4,15,C.gr);const[word,e]=CHOP[st.i],L=letterBox(word);
  pic(g,e,A.W/2,A.H*.15,Math.min(60,A.H*.15));let piece=0;
  for(let k=0;k<word.length;k++){if(st.cut.has(k))piece++;const r={x:L.x0+k*L.w+2,y:L.y,w:L.w-4,h:L.h};card(g,r,PAL[piece%4],false,.2);text(g,word[k],r.x+r.w/2,r.y+r.h/2,22,C.tx)}
  st.cut.forEach(k=>{const x=L.x0+k*L.w;g.strokeStyle=C.rd;g.lineWidth=4;g.setLineDash([6,5]);g.beginPath();g.moveTo(x,L.y-16);g.lineTo(x,L.y+L.h+16);g.stroke();g.setLineDash([]);pic(g,'✂️',x,L.y-26,22)});
  text(g,`Pieces: ${st.cut.size+1}`,A.W/2,L.y+L.h+36,15,C.tx);const ck=checkR();card(g,ck,st.wrong?C.rd:C.gr,!!st.wrong,.18);text(g,'✓ Check',ck.x+ck.w/2,ck.y+ck.h/2,17,C.tx)}
 const checkR=()=>({x:A.W*.3,y:A.H*.8,w:A.W*.4,h:Math.min(64,A.H*.16)});
 const binR=i=>row(i,3,A.H*.64,Math.min(120,A.H*.3));
 function drawSort(g){const C=A.col;if(st.sorted>=SORT.length)return text(g,'All sorted by beats!',A.W/2,A.H*.4,16,C.gr);const w=SORT[st.sorted];
  let r={x:A.W/2-80,y:A.H*.06,w:160,h:A.H*.46};if(st.drag!=null&&st.at)r={...r,x:st.at.x-r.w/2,y:st.at.y-r.h/2};card(g,r,C.cy,false,.14);pic(g,w.e,r.x+r.w/2,r.y+r.h*.42,Math.min(64,r.h*.5));text(g,w.w,r.x+r.w/2,r.y+r.h*.84,18,C.tx);
  BEATS.forEach((b,i)=>{const q=binR(i);card(g,q,st.wrong===i?C.rd:PAL[i],st.wrong===i,.14);text(g,'👏'.repeat(i+1),q.x+q.w/2,q.y+q.h*.38,16,C.tx);text(g,b,q.x+q.w/2,q.y+q.h*.72,14,C.tx)})}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.45);g.fillRect(0,0,W,H);
  const f={clap:drawClap,pair:drawPair,glue:drawGlue,chop:drawChop,sort:drawSort}[stepName()];if(f)f(g);else pic(g,'👏',W/2,H/2,70);A.fx.draw(g)}

 // ---------- actions ----------
 function clap(){const list=stepName()==='pair'?PAIR:CLAP;if(st.i>=list.length||st.claps>=6)return;st.claps++;st.wrong=null;A.sound.tick();tell(`Clap ${st.claps}.`);A.redraw()}
 // Judge the claps for the current word against its beats.
 function finishClaps(){const list=stepName()==='pair'?PAIR:CLAP;if(st.i>=list.length)return;const w=list[st.i],n=w.p.length,said=w.p.join('-');
  if(st.claps<n){st.wrong=1;st.claps=0;return miss(`Say it slowly: ${said}. Listen for ${n} beats, then clap again.`)}
  if(st.claps>n){st.wrong=1;st.claps=0;return miss(n===1?`Too many claps. Say ${w.w} in one go. One clap.`:`Too many claps. ${said} has ${n} beats. Try again.`)}
  st.wrong=null;st.i++;st.claps=0;A.sound.pop();update(`Yes! ${said}: ${n} ${n>1?'claps':'clap'}.`)}
 function startGlue(){st.slots=[];st.wrong=null;if(st.i<GLUE.length){const n=GLUE[st.i].p.length;st.tiles=[...Array(n).keys()].reverse();if(n===3)st.tiles=[1,2,0]}}
 // Put a spoken part into the next empty slot; check the order when every slot is full.
 function place(t){const w=GLUE[st.i];if(!w||st.slots.includes(t))return;st.wrong=null;st.slots.push(t);A.sound.tick();
  if(st.slots.length<w.p.length)return update(`You said ${w.p[t]}.`);
  const said=st.slots.map(k=>w.p[k]).join('');if(st.slots.every((k,j)=>k===j)){A.sound.pop();const done=w.w;st.i++;startGlue();return update(`${w.p.join(' + ')} makes ${done}!`)}
  startGlue();st.wrong=1;buttons();miss(`${said} is not a word. Which part do you say first? Try again.`)}
 function toggleCut(k){if(st.i>=CHOP.length)return;const n=CHOP[st.i][0].length;if(k<1||k>=n)return;st.wrong=null;st.cut.has(k)?st.cut.delete(k):st.cut.add(k);A.sound.tick();update('')}
 // Compare the cuts with the beat breaks of the word.
 function checkChop(){if(st.i>=CHOP.length)return;const[word,,cuts]=CHOP[st.i],want=cuts.length+1,have=st.cut.size+1;
  const pieces=word.split('').reduce((a,ch,k)=>(st.cut.has(k)?a.push(ch):a[a.length-1]+=ch,a),['']).filter(Boolean);
  if(have!==want){st.wrong=1;return miss(`You made ${have} ${have>1?'pieces':'piece'}, but ${word} has ${want} beats. Clap it, then cut again.`)}
  if(!cuts.every(k=>st.cut.has(k))){st.wrong=1;return miss(`${pieces.join(' | ')}: right number of pieces! Now say each piece. Does it sound like the beats of ${word}?`)}
  st.wrong=null;A.sound.pop();const done=pieces.join('-');st.i++;st.cut=new Set();update(`Yes! ${done}.`)}
 function sortInto(i){if(st.sorted>=SORT.length)return;const w=SORT[st.sorted],n=w.p.length;
  if(i+1!==n){st.wrong=i;return miss(SORT_TIP[w.w]||`Clap it: ${w.p.join('-')}. That is ${n} ${n>1?'beats':'beat'}.`)}
  st.wrong=null;st.sorted++;A.sound.pop();update(n>1?`${w.w}: ${w.p.join('-')}, ${n} beats.`:`${w.w}: one beat.`)}

 // Live description of the stage for screen readers, plus the button pad.
 function update(msg){const v=stepName();let t='';
  if(v==='clap'||v==='pair'){const list=v==='pair'?PAIR:CLAP;t=st.i<list.length?`Word: ${list[st.i].w}. Claps so far: ${st.claps}.`:'All words clapped.'}
  else if(v==='glue')t=st.i<GLUE.length?`Glue the parts in order. Filled: ${st.slots.length} of ${GLUE[st.i].p.length}.`:'All words glued.';
  else if(v==='chop')t=st.i<CHOP.length?`Word: ${CHOP[st.i][0]}. Cuts: ${st.cut.size}.`:'All words chopped.';
  else if(v==='sort')t=st.sorted<SORT.length?`Picture: ${SORT[st.sorted].w}. How many beats?`:'All pictures sorted.';else t='Challenge time.';
  tell((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=stepName();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f};
  if((v==='clap'&&st.i<CLAP.length)||(v==='pair'&&st.i<PAIR.length)){b('👏 Clap',clap);b('✋ Done',finishClaps,'Done clapping')}
  if(v==='glue'&&st.i<GLUE.length)st.tiles.forEach(t=>{if(!st.slots.includes(t))b(GLUE[st.i].p[t],()=>place(t),'Say '+GLUE[st.i].p[t])});
  if(v==='chop'&&st.i<CHOP.length){const w=CHOP[st.i][0];for(let k=1;k<w.length;k++)b((st.cut.has(k)?'✂️ ':'')+w.slice(0,k)+' | '+w.slice(k),()=>toggleCut(k),(st.cut.has(k)?'Remove cut after ':'Cut after ')+w.slice(0,k));b('✓ Check',checkChop,'Check the pieces')}
  if(v==='sort'&&st.sorted<SORT.length)BEATS.forEach((x,i)=>b('👏'.repeat(i+1)+' '+x,()=>sortInto(i)));A.redraw()}

 // ---------- canvas input ----------
 function press(p){const v=stepName();st.drag=null;st.at=null;
  if(v==='clap'||v==='pair'){if(hit(p,clapR()))clap();else if(hit(p,allR()))finishClaps();return false}
  if(v==='glue'&&st.i<GLUE.length){const j=st.tiles.findIndex((t,j)=>!st.slots.includes(t)&&hit(p,tileR(j,st.tiles.length)));if(j<0)return false;st.drag=j;st.at=p;return true}
  if(v==='chop'&&st.i<CHOP.length){if(hit(p,checkR())){checkChop();return false}const L=letterBox(CHOP[st.i][0]);if(p.y>L.y-30&&p.y<L.y+L.h+30)toggleCut(Math.round((p.x-L.x0)/L.w));return false}
  if(v==='sort'&&st.sorted<SORT.length){const i=BEATS.findIndex((x,i)=>hit(p,binR(i)));if(i>=0){sortInto(i);return false}st.drag=0;st.at=p;return true}
  return false}
 function release(p){const v=stepName(),j=st.drag;st.drag=null;st.at=null;if(j==null)return A.redraw();
  if(v==='glue'){const t=st.tiles[j];if(p.y<A.H*.55||hit(p,tileR(j,st.tiles.length)))place(t);else A.redraw();return}
  if(v==='sort'){const i=BEATS.findIndex((x,i)=>hit(p,binR(i)));if(i>=0)sortInto(i);else A.redraw()}}

 // ---------- steps ----------
 const finishWhen=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{st.tok++;st.onChange=()=>{};st.i=0;st.claps=0;st.wrong=null;st.drag=null;st.at=null;st.cut=new Set();st.sorted=0};
 const clapRun=list=>list.flatMap(w=>[...w.p.map(()=>clap),finishClaps]);
 const steps=[
  {h:'Clap the beats',p:'Say the word and clap for each part. Each clap is one beat, called a syllable. Tap Clap, then Done.',
   predict:{q:'How many claps for butterfly?',opts:['2 claps','3 claps'],ans:1},task:'Clap cat, rabbit and butterfly',
   show:()=>{steps[0].go();play(clapRun(CLAP),260)},go:()=>{reset();update();st.onChange=finishWhen(0,()=>st.i>=CLAP.length,'Cat 1, rab-bit 2, but-ter-fly 3.')}},
  {h:'Letters are not beats',p:'Strong and banana have the same number of letters. Clap them both and count the beats.',
   predict:{q:'Strong and banana both have 6 letters. Do they have the same number of beats?',opts:['Yes, the same','No'],ans:1},task:'Clap strong, then banana',
   show:()=>{steps[1].go();play(clapRun(PAIR),260)},go:()=>{reset();update();st.onChange=finishWhen(1,()=>st.i>=PAIR.length,'Strong is 1 beat and ba-na-na is 3. Count claps, not letters.')}},
  {h:'Glue the parts',p:'Here are the parts of a word. Drag them into the boxes in the right order, or tap them, to make the word.',task:'Glue three words together',
   show:()=>{steps[2].go();play(GLUE.flatMap(w=>w.p.map((s,j)=>()=>place(j))),350)},go:()=>{reset();startGlue();update();st.onChange=finishWhen(2,()=>st.i>=GLUE.length,'Rain + bow = rainbow. Parts go in the order you say them.')}},
  {h:'Chop the word',p:'Now the word is written. Tap between two letters to cut it into its beats. Then tap Check.',
   predict:{q:'Where does rabbit break into beats?',opts:['ra | bbit','rab | bit'],ans:1},task:'Chop four words into beats',
   show:()=>{steps[3].go();play(CHOP.flatMap(([, ,cuts])=>[...cuts.map(k=>()=>toggleCut(k)),checkChop]),350)},go:()=>{reset();update();st.onChange=finishWhen(3,()=>st.i>=CHOP.length,'Rab-bit, car-rot, thun-der, to-ma-to. Each piece has one vowel sound.')}},
  {h:'Sort by beats',p:'Say each word and clap it. Drag the picture to the box with the same number of claps, or tap a box.',
   predict:{q:'Cake has two vowel letters, a and e. How many beats?',opts:['1 beat','2 beats'],ans:0},task:'Sort all six pictures',
   show:()=>{steps[4].go();play(SORT.map(w=>()=>sortInto(w.p.length-1)),350)},go:()=>{reset();update();st.onChange=finishWhen(4,()=>st.sorted>=SORT.length,'The e in cake is quiet, so cake is one beat.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});

 // ---------- challenge: each wrong answer is tagged with the slip it shows ----------
 const QS=[['dog','🐶','dog',[3,'letters'],[2,'extra']],['tiger','🐯','ti-ger',[5,'letters'],[1,'short']],['kite','🪁','kite',[2,'vowels'],[4,'letters']],
  ['tomato','🍅','to-ma-to',[2,'short'],[6,'letters']],['caterpillar','🐛','cat-er-pil-lar',[3,'short'],[5,'extra']],['pumpkin','🎃','pump-kin',[1,'short'],[7,'letters']]];
 function why(tag,word,said){let m=`One clap too many. Say ${said} and stop when the word ends.`;
  if(tag==='letters')m=`That is the number of letters. Clap ${said}: claps, not letters.`;
  if(tag==='vowels')m=`${word} has two vowel letters, but the e at the end is quiet. One beat.`;
  if(tag==='short')m=`A beat got missed. Say it slowly: ${said}.`;
  return m}
 let qn=-1,streak=0;
 function ask(){qn++;const[word,e,said,...wrong]=QS[qn%QS.length],n=said.split('-').length;
  const opts=[[n,'ok'],...wrong];const turn=qn%3;const shown=opts.slice(turn).concat(opts.slice(0,turn));
  quiz.innerHTML=`<p><b>${e} How many beats in ${word}?</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const box=quiz.querySelector('.fl-pick');shown.forEach(([k,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,`${k} ${k>1?'beats':'beat'}`);b.onclick=()=>judge(tag,word,said)});
  tell(`Challenge: how many beats in ${word}?`);A.redraw()}
 function judge(tag,word,said){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  const m=good?`Yes! ${said}.`:why(tag,word,said);if(good){streak++;A.win()}else{streak=0;A.sound.miss()}
  fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Syllable controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{st.at=p;A.redraw()},up:release});buttons()}});
 A.start()})})();
