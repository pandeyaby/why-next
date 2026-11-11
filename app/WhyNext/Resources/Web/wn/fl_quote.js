/* Flagship – quoting accurately (10–11): pick only the proving words, spot a misquote, place quotation marks, quote
   clues for an inference, build signal + quote + explanation; the challenge names each slip. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui';
 const STORY='Mia waited behind the curtain. When her name was called, she walked to the middle of the stage. Her hands shook as she held her poem. She bit her lip and looked at the floor. Then she began to read. At the end, the crowd clapped and clapped. Mia grinned all the way home.'.split(' ');
 const at=s=>{const w=s.split(' ');for(let i=0;i<=STORY.length-w.length;i++)if(w.every((x,j)=>STORY[i+j]===x))return[i,i+w.length-1];return[-1,-1]};
 const CLAIM=[{c:'Mia was nervous on the stage.',ev:['Her hands shook','She bit her lip','looked at the floor.'],off:'Those words are in the story, but they do not show nervous. Look for what her body did.'},
  {c:'Mia felt proud at the end.',ev:['Mia grinned'],off:'That shows how the crowd felt. Find what Mia did that shows her feeling.'}];
 const COPY='Her hand was shaking as she held the poem.'.split(' '),WRONG=[[1],[2,3],[7]];
 const LINE='The poet was so nervous that her hands shook as she held her poem'.split(' '),QS=6,QE=14;
 const TILES=[['According to the text,','sig'],['“her hands shook,”','q'],['which shows that Mia was nervous.','ex'],['I think','me'],['“Mia was very scared,”','fake']];
VIS.reg('flagquote',c=>{let A,pad,chal,read;
 const G={sel:null,ci:0,found:[],wr:[],o:-1,cl:-1,turn:0,slots:[-1,-1,-1],hold:-1,miss:'',ok:'',gen:0,check:()=>{},drag:0,boxes:[],Q:null,good:0};
 const mode=()=>['pick','copy','marks','infer','build','free','quiz'][A.step];
 const words=()=>{const m=mode();return m==='copy'?COPY:m==='marks'?LINE:m==='quiz'?BEES.split(' '):STORY};
 function layout(x,ws,X,Y,w,lh,fs){x.font=F(600,fs);const sp=x.measureText(' ').width,bx=[];let cx=X,cy=Y;ws.forEach((t,i)=>{const tw=x.measureText(t).width;if(cx>X&&cx+tw>X+w){cx=X;cy+=lh}bx.push({x:cx,y:cy,w:tw,i});cx+=tw+sp*1.6});return bx}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh);return n+1}
 function draw(A){const{ctx:x,col:C}=A,W=A.W,H=A.H,N=A.narrow,m=mode();x.fillStyle=A.mix(C.pn,C.am,.05);x.fillRect(0,0,W,H);
  x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=F(800,N?15:17);let y=24+(wrap(x,head(),14,24,W-28,N?19:21)-1)*(N?19:21);
  x.font=F(600,13);x.fillStyle=G.miss?C.rd:G.ok?C.gr:C.mu;y+=8+wrap(x,G.miss||G.ok||sub(),14,y+20,W-28,17)*17;y+=14;
  const fs=N?15:17,lh=N?30:32;
  const cap=t=>{x.font=F(700,12);x.fillStyle=C.mu;x.fillText(t,14,y+10)};
  if(m==='copy'||m==='marks'){cap('THE STORY SAYS');x.font=F(600,fs);x.fillStyle=C.tx;y+=32+(wrap(x,'Her hands shook as she held her poem.',14,y+32,W-28,lh)-1)*lh+18;cap(m==='copy'?'SAM COPIED IT AS':'YOUR SENTENCE: TAP THE GAPS');y+=24}
  if(m==='build')return drawBuild(x,C,W,H,N,y);
  const ws=words(),bx=layout(x,ws,16,y+fs,W-32,lh,fs);G.boxes=bx;
  if(m==='marks'){G.gaps=gapPos(bx,fs);G.gaps.forEach((g,i)=>{const on=i===G.o||i===G.cl;x.fillStyle=on?C.vi:A.alpha(C.mu,.35);x.fillRect(g.x-1.5,g.y-fs,3,fs+6);if(on){x.font=F(800,fs+8);x.fillStyle=C.vi;x.textAlign='center';x.fillText(i===G.o?'“':'”',g.x,g.y-fs+2);x.textAlign='left'}})}
  bx.forEach(b=>{const t=ws[b.i];let hi=null;
   if((m==='pick'||m==='infer'||m==='free')&&G.sel&&b.i>=M.min(...G.sel)&&b.i<=M.max(...G.sel))hi=G.good?C.gr:C.am;
   if(m==='copy'){const k=WRONG.findIndex(g=>g.includes(b.i));if(k>=0&&G.wr.includes(k))hi=C.rd;else if(G.tapOk===b.i)hi=A.alpha(C.gr,.6)}
   if(hi){x.fillStyle=A.alpha(hi,.28);A.paint.rrect(b.x-4,b.y-fs-3,b.w+8,fs+12,6);x.fill();x.strokeStyle=hi;x.lineWidth=2;x.stroke()}
   x.font=F(600,fs);x.fillStyle=C.tx;x.fillText(t,b.x,b.y);if(m==='copy'&&hi===C.rd){x.strokeStyle=C.rd;x.lineWidth=2;x.beginPath();x.moveTo(b.x,b.y-fs/3);x.lineTo(b.x+b.w,b.y-fs/3);x.stroke()}});
  if(m==='marks'){const lb=bx[bx.length-1];x.font=F(600,fs);x.fillStyle=C.tx;x.fillText('.',lb.x+lb.w+(G.cl===QE?12:2),lb.y)}
  if((m==='free'||m==='pick'||m==='infer')&&G.sel){const q=quoteText();x.font=F(700,14);x.fillStyle=C.vi;wrap(x,'According to the text, “'+q+'”',14,H-(N?44:22),W-28,18)}
  A.fx.draw(x)}
 function gapPos(bx,fs){const g=[];bx.forEach((b,i)=>{const p=bx[i-1];g.push({x:p&&p.y===b.y?(p.x+p.w+b.x)/2:b.x-5,y:b.y+4})});const l=bx[bx.length-1];g.push({x:l.x+l.w+6,y:l.y+4});return g}
 function drawBuild(x,C,W,H,N,y){const sw=N?W-28:(W-48)/3,sh=N?40:58,R=[];for(let k=0;k<3;k++){const X=N?14:14+k*(sw+10),Y=N?y+k*(sh+8):y;R.push({x:X,y:Y,w:sw,h:sh,k});
   x.strokeStyle=G.hold>=0?C.vi:A.alpha(C.mu,.6);x.setLineDash([5,4]);x.lineWidth=2;A.paint.rrect(X,Y,sw,sh,10);x.stroke();x.setLineDash([]);x.font=F(700,11);x.fillStyle=C.mu;x.fillText(['1 SIGNAL PHRASE','2 QUOTATION','3 WHAT IT SHOWS'][k],X+8,Y+14);
   const t=G.slots[k];if(t>=0){x.font=F(700,13);x.fillStyle=C.tx;wrap(x,TILES[t][0],X+8,Y+(N?32:34),sw-16,15)}}
  let ty=(N?y+3*(sh+8):y+sh)+18;x.font=F(700,11);x.fillStyle=C.mu;x.fillText('TILES: DRAG ONE TO A BOX, OR TAP IT THEN A BOX',14,ty);ty+=10;const T=[];let tx=14;
  TILES.forEach((t,i)=>{if(G.slots.includes(i))return;x.font=F(700,13);const w=M.min(W-28,x.measureText(t[0]).width+20);if(tx+w>W-14){tx=14;ty+=44}const X=G.drag&&G.drag.t===i?G.drag.x-w/2:tx,Y=G.drag&&G.drag.t===i?G.drag.y-17:ty;
   x.fillStyle=i===G.hold?A.alpha(C.vi,.3):A.mix(C.pn,C.cy,.15);A.paint.rrect(X,Y,w,34,9);x.fill();x.strokeStyle=i===G.hold?C.vi:C.cy;x.lineWidth=2;x.stroke();x.fillStyle=C.tx;x.fillText(t[0],X+10,Y+22);T.push({x:tx,y:ty,w,h:34,i});tx+=w+8});
  G.slotR=R;G.tileR=T;A.fx.draw(x)}
 function head(){const m=mode();if(m==='pick'||m==='infer'||m==='free')return(m==='free'?'Pick any words to quote':'Prove it: '+CLAIM[G.ci].c);if(m==='copy')return`Spot Sam's changes: ${G.found.length} of 3 found`;
  if(m==='marks')return'Put “ and ” round only the copied words';if(m==='build')return'Build a sentence that uses the quote';return G.Q?G.Q.q:''}
 function sub(){const m=mode();if(m==='pick'||m==='infer')return'Drag across the words, or use the buttons. Then press Check.';if(m==='copy')return'Tap each word that is not exactly what the story says.';
  if(m==='marks')return'Tap a gap to put a mark there. The first tap places “, the next places ”.';if(m==='build')return'Fill the three boxes in order, then press Check.';if(m==='free')return'Drag across any words to see them as a quotation.';return''}
 const clr=()=>{G.good=0;G.miss='';G.ok=''};
 const quoteText=()=>{if(!G.sel)return'';const a=M.min(...G.sel),b=M.max(...G.sel);return STORY.slice(a,b+1).join(' ')};
 function tell(msg){const m=mode();let s=(msg?msg+' ':'')+head().replace(/\.$/,'')+'. ';if(G.sel&&m!=='copy'&&m!=='marks'&&m!=='build')s+='Selected: '+quoteText()+'. ';if(m==='marks')s+='Your sentence: '+LINE.map((w,i)=>(i===G.o?'“':'')+(i===G.cl?'” ':'')+w).join(' ')+(G.cl===QE?'”':'')+'. ';
  if(m==='build')s+='Boxes: '+G.slots.map(t=>t<0?'empty':TILES[t][0]).join(' | ')+'. ';s+=sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=msg||'';controls();A.redraw();G.check()}
 function judgePick(){const cl=CLAIM[G.ci];if(!G.sel){G.miss='Pick some words first.';return tell(G.miss)}const a=M.min(...G.sel),b=M.max(...G.sel),n=b-a+1;let s;
  const R=cl.ev.map(at),full=R.find(([p,q])=>a<=p&&b>=q),part=R.find(([p,q])=>a<=q&&b>=p);
  if(full&&n<=9){G.good=1;G.miss='';G.ok='✓ Good proof: “'+quoteText()+'”.';A.sound.pop();G.proved=(G.proved||0)+1;return tell(G.ok)}
  if(full)s=`You picked ${n} words. Keep only the words that prove the point: 9 or fewer here.`;else if(part)s='Nearly. “'+quoteText()+'” is only part of the clue. Add the words next to it so it makes sense.';else s=cl.off;
  G.good=0;G.ok='';G.miss=s;A.sound.miss();tell(s)}
 function tapCopy(i){const k=WRONG.findIndex(g=>g.includes(i));G.tapOk=-1;if(k<0){G.tapOk=i;G.miss='“'+COPY[i]+'” matches the story. Compare word by word.';A.sound.miss();return tell(G.miss)}
  if(!G.wr.includes(k)){G.wr.push(k);G.found.push(k)}G.miss='';G.ok=['The story says “hands”, not “hand”.','The story says “shook”, not “was shaking”.','The story says “her poem”, not “the poem”.'][k];A.sound.pop();tell(G.ok)}
 function setGap(i){if(G.turn%2===0){G.o=i;if(G.cl>=0&&G.cl<=i)G.cl=-1}else{if(i<=G.o){G.cl=G.o;G.o=i}else G.cl=i}G.turn++;G.miss='';G.ok='';A.sound.tick();marksFb()}
 function marksFb(){let s='';if(G.o>=0&&G.cl>=0){if(G.o===QS&&G.cl===QE){G.ok='✓ Only the copied words are inside the marks.';A.sound.pop();return tell(G.ok)}
   if(G.cl<=QS)s=G.o<=4&&G.cl>=5?'“nervous” is your word, not the writer’s. Marks go only round copied words.':'The marks are round words that are not copied. Find “her hands shook…” and mark it.';
   else if(G.o<QS)s='Your own words (“'+LINE.slice(G.o,QS).join(' ')+'”) are inside the marks. Start the quote where the copying starts.';
   else s='All of “her hands shook as she held her poem” is copied. Put the marks round the whole copied part.'}G.miss=s;tell(s)}
 function place(t,k){if(k==null)k=G.slots.indexOf(-1);if(k<0)return;const old=G.slots.indexOf(t);if(old>=0)G.slots[old]=-1;G.slots[k]=t;G.hold=-1;G.miss='';G.ok='';A.sound.tick();tell('')}
 function judgeBuild(){const s=G.slots;let m;if(s.includes(-1)){G.miss='Fill all three boxes first.';return tell(G.miss)}
  if(s[0]===0&&s[1]===1&&s[2]===2){G.built=1;G.ok='✓ According to the text, “her hands shook,” which shows that Mia was nervous.';A.sound.pop();return tell(G.ok)}
  if(s.includes(4))m='The story never says “Mia was very scared”. Quotation marks promise the writer’s exact words.';else if(s.includes(3))m='“I think” gives your view. A signal phrase points to the text, like “According to the text,”.';else m='Put the signal phrase first, then the quotation, then what it shows.';G.miss=m;A.sound.miss();tell(m)}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};if(m==='quiz')return;
  if(m==='pick'||m==='infer'||m==='free'){const s=G.sel||[0,0];const a=M.min(...s),z=M.max(...s);b('Start ←',()=>selSet(a-1,z),'Move the start of the selection one word left');b('Start →',()=>selSet(M.min(a+1,z),z),'Move the start one word right');
   b('End ←',()=>selSet(a,M.max(a,z-1)),'Move the end of the selection one word left');b('End →',()=>selSet(a,z+1),'Move the end one word right');if(m!=='free')b('Check',judgePick)}
  if(m==='copy')COPY.forEach((w,i)=>b(w,()=>tapCopy(i),'Sam wrote '+w));
  if(m==='marks'){b('“ ←',()=>{G.o=M.max(0,G.o-1);marksFb()},'Move the opening mark left');b('“ →',()=>{G.o=M.min(LINE.length-1,G.o+1);marksFb()},'Move the opening mark right');b('” ←',()=>{G.cl=M.max(G.o+1,G.cl-1);marksFb()},'Move the closing mark left');b('” →',()=>{G.cl=M.min(QE,M.max(G.o+1,G.cl+1));marksFb()},'Move the closing mark right')}
  if(m==='build'){TILES.forEach((t,i)=>{if(!G.slots.includes(i))b(t[0],()=>place(i),'Put '+t[0]+' in the next empty box')});b('Clear boxes',()=>{G.slots=[-1,-1,-1];tell('')});b('Check',judgeBuild)}}
 function selSet(a,z){a=M.max(0,a);z=M.min(STORY.length-1,z);G.sel=[a,z];clr();A.sound.tick();tell('')}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},A.reduced()?j*20:j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{sel:null,ci:0,found:[],wr:[],o:-1,cl:-1,turn:0,slots:[-1,-1,-1],hold:-1,miss:'',ok:'',drag:0,good:0,proved:0,built:0,tapOk:-1},o||{})};
 const pickShow=ph=>{const[a,z]=at(ph);return[()=>selSet(0,40),judgePick,()=>selSet(a,z),judgePick]};
 const steps=[
  {h:'Pick the proof',p:'A quotation is the writer’s exact words. You use it to prove a point you make about the text.',
   predict:{q:'How much should you quote to prove a point?',opts:['As much as you can, to be safe','Just the words that prove it','One word is always enough'],ans:1},
   task:'Quote the words that prove Mia was nervous',show:()=>play(pickShow('Her hands shook'),500),go:()=>{reset();G.check=when(0,()=>G.proved>=1,()=>'“Her hands shook” proves it in three words. A whole paragraph hides the proof.')}},
  {h:'Copy it exactly',p:'Words inside quotation marks must match the text exactly: every word, every ending.',
   predict:{q:'Sam’s copy means the same as the story. Is it fine as a quote?',opts:['Yes, the meaning is the same','No, the words must be exact'],ans:1},
   task:'Find all three changes Sam made',show:()=>play([()=>tapCopy(1),()=>tapCopy(2),()=>tapCopy(7)],450),go:()=>{reset();G.check=when(1,()=>G.found.length>=3,()=>'“hand”, “was shaking” and “the” are not the writer’s words, so it is a misquote.')}},
  {h:'Quotation marks',p:'Your own words stay outside the marks. Only the copied words go inside.',
   predict:{q:'Where do the quotation marks go?',opts:['Round the whole sentence','Only round the copied words','Round the most important word'],ans:1},
   task:'Mark the copied words',show:()=>play([()=>setGap(2),()=>setGap(8),()=>{G.turn=0;setGap(QS)},()=>setGap(QE)],450),go:()=>{reset();G.check=when(2,()=>G.o===QS&&G.cl===QE,()=>'“The poet was so nervous that” is your wording, so it stays outside.')}},
  {h:'Quote clues',p:'Sometimes a text never says a thing outright. You infer it, then quote the clue words that made you think so.',
   predict:{q:'The story never says “Mia was proud”. Can you still quote to prove it?',opts:['No, you can only quote what it says','Yes, quote the clue words'],ans:1},
   task:'Quote the clue that shows Mia felt proud',show:()=>play([()=>selSet(...at('crowd clapped and clapped.')),judgePick,()=>selSet(...at('Mia grinned all the way home.')),judgePick],500),
   go:()=>{reset({ci:1});G.check=when(3,()=>G.proved>=1,()=>'“Mia grinned all the way home” is a clue: grinning shows she was pleased with herself.')}},
  {h:'Signal, quote, explain',p:'Lead in with a signal phrase, give the quotation, then say what it shows.',
   predict:{q:'What should come straight after a quotation?',opts:['Nothing: the quote speaks for itself','A few words saying what it shows'],ans:1},
   task:'Build the sentence and press Check',show:()=>play([()=>place(3,0),()=>place(1,1),()=>place(4,2),judgeBuild,()=>{G.slots=[-1,-1,-1];place(0,0)},()=>place(1,1),()=>place(2,2),judgeBuild],380),
   go:()=>{reset();G.check=when(4,()=>G.built,()=>'Signal phrase, exact words, then what they show: the reader sees your proof and your thinking.')}},
  {h:'Sandbox',p:'Pick any words. Check: are they exact, and do they prove what you want to say?',go:()=>reset({sel:[at('looked at the floor.')[0],at('looked at the floor.')[1]]})},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 const BEES='Honeybees talk by dancing. A bee that finds food flies back to the hive and does a “waggle dance”. The longer the waggle, the farther away the food is. Other bees watch and then fly straight to the flowers.';
 const QZ=[['The dance shows how far away the food is.',[['“The longer the waggle, the farther away the food is.”','ok'],['“The longer the dance, the further the food is.”','mis'],['“Honeybees talk by dancing.”','off']]],
  ['Bees pass on news by moving.',[['“Honeybees talk by dancing.”','ok'],['“Honeybees talk to each other by dancing.”','mis'],['“A bee that finds food flies back to the hive”','off']]],
  ['The other bees understand the dance.',[['“Other bees watch and then fly straight to the flowers.”','ok'],['“Other bees watch and then fly straight to the food.”','mis'],['“A bee that finds food flies back to the hive”','off']]],
  ['Which sentence quotes the article correctly?',[['The article says that bees “talk by dancing.”','ok'],['The article says that bees talk by dancing.','bare'],['The article says that bees “use a dance to chat.”','fake']]]];
 let qi=-1,run=0;
 function ask(){qi++;const it=QZ[qi%QZ.length],claim=qi%4<3;G.Q={q:claim?'Which quote best proves: '+it[0]:it[0],it};const r=qi%3,o2=it[1].slice(r).concat(it[1].slice(0,r));
  controls();chal.innerHTML=`<p><b>${G.Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o2.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});A.cv.setAttribute('aria-label','Challenge. The article says: '+BEES+' '+G.Q.q);A.redraw()}
 function fin(ok,m){if(ok){run++;A.win()}else{run=0;A.sound.miss()}const s=(ok?'✓ ':'✗ ')+m;A.cv.setAttribute('aria-label',s);const fb=chal.querySelector('.fl-fb');
  fb.innerHTML=`${s}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=G.Q.it[1][0][0];let m;
  if(o[1]==='ok')m='Right: those are the exact words, and they prove the point.';else if(o[1]==='mis')m='Close, but words were changed. The article says '+good+' Copy word for word.';
  else if(o[1]==='off')m='Those are the exact words, but they do not prove this point. Pick the sentence that shows it.';else if(o[1]==='bare')m='Those are the writer’s words with no quotation marks, so they look like your own.';
  else m='Quotation marks promise exact words, but the article never says “use a dance to chat”.';fin(o[1]==='ok',m)}
 const hitWord=p=>{const fs=A.narrow?15:17;return G.boxes.find(b=>p.x>=b.x-6&&p.x<=b.x+b.w+6&&p.y>=b.y-fs-6&&p.y<=b.y+10)};
 const inR=(r,p)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function down(p){const m=mode();if(m==='quiz')return false;
  if(m==='build'){const t=(G.tileR||[]).find(r=>inR(r,p));if(t){G.drag={t:t.i,x:p.x,y:p.y,moved:0};return true}const s=(G.slotR||[]).find(r=>inR(r,p));if(s&&G.hold>=0){place(G.hold,s.k);return true}return false}
  if(m==='marks'){let best=-1,bd=28;(G.gaps||[]).forEach((g,i)=>{const d=M.hypot(p.x-g.x,(p.y-g.y+8)/1.6);if(d<bd){bd=d;best=i}});if(best<0)return false;setGap(best);return true}
  const w=hitWord(p);if(!w)return false;if(m==='copy'){tapCopy(w.i);return true}G.drag={a:w.i};G.sel=[w.i,w.i];clr();A.redraw();return true}
 function mv(p){const d=G.drag;if(!d)return;if(d.t!=null){d.x=p.x;d.y=p.y;d.moved=1;A.redraw();return}const w=hitWord(p);if(w){G.sel=[d.a,w.i];A.redraw()}}
 function up(p){const d=G.drag;G.drag=0;if(!d)return;if(d.t!=null){const s=d.moved&&(G.slotR||[]).find(r=>inR(r,p));if(s)return place(d.t,s.k);G.hold=d.moved?-1:d.t;A.sound.tick();return tell(G.hold>=0?'Now tap a box for '+TILES[d.t][0]:'')}
  A.sound.tick();tell('')}
 A=FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:A=>{const q=A.step===6;chal.hidden=!q;read.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Quotation controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
