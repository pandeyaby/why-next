/* Flagship 60 – asking for help (ages 5–6, with a grown-up): move Pip up a help ladder (try another way, look for a
   clue, ask a friend, ask a grown-up) and see what each rung does; asking before trying gets "what have you tried?",
   repeating the same try makes Pip cross; build a clear ask from word cards; sort problems into "get a grown-up now"
   (hurt, unsafe, unkind) and "have a go first". Challenge: what first, when to ask, safety, best ask, clue vs answer. */
(()=>{const RUNG=['Try another way','Look for a clue','Ask a friend','Ask a grown-up'];
 // r: what happens on each rung; s: the rung that solves it; safe: a grown-up is the right first step
 const PROB=[{t:"Pip can't spell 'they'.",s:1,r:['Pip sounds it out: th-ay? Not sure yet.','Pip looks at the word wall. There it is: they. Solved!']},
  {t:"Pip can't open the paint pot.",s:3,r:['Pip twists harder. Still stuck.','Pip looks for a clue. Nothing on the lid.','Sam tries too. Still stuck.','The teacher shows Pip how to lift the lid. Solved!']},
  {t:'Pip\'s shoes feel funny.',s:0,r:['Pip looks again: wrong feet! Pip swaps them. Solved!']},
  {t:"Pip doesn't know what to do next.",s:2,r:['Pip thinks back. Still not sure.','Pip looks at the board. No steps there.','Ava says: colour the shapes, then cut them out. Solved!']},
  {t:'Pip wants a book from the top shelf.',s:3,safe:1,r:['Climb on a chair? No, that is not safe.','No clue helps Pip reach.','Sam is too small too.','A grown-up gets the book down. Safe and solved!']}];
 const CHIP=[["I'm doing the 7 + 8 sum.",1],["I can't do it!",0,'That does not tell the helper what is wrong.'],['I counted on my fingers but ran out.',1],
  ['Do it for me.',0,'Then the helper does the learning, not you.'],['Can you give me a clue?',1],['Help!',0,'Help with what? Say what you are doing.']];
 const SORT=[['I cut my finger.',0],["I can't find my pencil.",1],['Someone is being unkind to me.',0],["My zip is stuck.",1],['I feel sick.',0],["I can't read a word.",1]];
VIS.reg('flaghelp',c=>{let A,pad,chal,read;c.fig.classList.add('young');
 const G={p:0,at:-1,tried:[],same:0,stuck:1,fin:0,back:0,said:'',bub:[],srt:[],cur:0,dr:null,dp:null,flash:0,want:()=>{},tok:0,free:2};
 const tell=t=>{G.said=t;c.say(t);if(read){read.textContent=t;A.cv.setAttribute('aria-label',t)}};
 const mode=()=>['lad','lad','ask','now','lad','q'][A.step];
 const ft=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 function wrap(x,t,w){const o=[];let l='';t.split(' ').forEach(s=>{const k=l?l+' '+s:s;if(x.measureText(k).width>w&&l){o.push(l);l=s}else l=k});o.push(l);return o}
 function status(){const m=mode();let t;
  if(m==='lad'){const P=PROB[G.p];t=`${P.t} Stuck meter ${G.stuck} of 5. `+(G.fin?'Solved!':G.at<0?'Pip is at the bottom of the help ladder.':`Pip is on: ${RUNG[G.at]}.`)}
  else if(m==='ask')t=G.bub.length?`Pip's ask: ${G.bub.map(i=>CHIP[i][0]).join(' ')}`:'An empty speech bubble. Tap word cards to build Pip\'s ask.';
  else{const n=G.srt.length;t=n<SORT.length?`Card: "${SORT[G.cur][0]}" Get a grown-up now, or have a go first? ${n} of ${SORT.length} sorted.`:'All six problems are sorted.'}
  tell(t);sync();G.want()}
 const lad=()=>{const x0=A.W*(A.narrow?.52:.6),w=A.W-12-x0,top=A.H*.08,gap=(A.H*.78-top)/4;return RUNG.map((n,i)=>({n,i,x:x0,w,y:top+(3-i)*gap,h:Math.min(52,gap*.72)}))};
 const ground=()=>{const R=lad()[0];return{x:R.x+R.w/2,y:A.H-26}};
 const pipAt=()=>{if(G.dr==='pip'&&G.dp)return G.dp;if(G.at<0)return ground();const R=lad()[G.at];return{x:R.x-24,y:R.y+R.h/2}};
 function face(x,cx,cy,r,st){const C=A.col,k=st/5;x.fillStyle=A.mix('#fde68a','#fca5a5',k);x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.fillStyle='#1f2937';
  [-1,1].forEach(s=>{x.beginPath();x.arc(cx+s*r*.35,cy-r*.15,r*.09,0,7);x.fill()});x.strokeStyle='#1f2937';x.lineWidth=Math.max(2,r*.08);x.lineCap='round';
  const cv=G.fin?.5:.35-k*.7;x.beginPath();x.moveTo(cx-r*.35,cy+r*.35);x.quadraticCurveTo(cx,cy+r*.35+cv*r*.6,cx+r*.35,cy+r*.35);x.stroke();
  if(st>=4){[-1,1].forEach(s=>{x.beginPath();x.moveTo(cx+s*r*.55,cy-r*.45);x.lineTo(cx+s*r*.18,cy-r*.32);x.stroke()})}}
 function meter(x,X,Y,w){const C=A.col;ft(x,700,13,'left');x.fillStyle=C.tx;x.fillText('Stuck meter',X,Y-10);for(let i=0;i<5;i++){x.fillStyle=i<G.stuck?(i<2?'#22c55e':i<4?'#f59e0b':'#ef4444'):A.alpha(C.tx,.12);A.paint.rrect(X+i*(w/5),Y,w/5-4,14,4);x.fill()}}
 function ladView(x){const C=A.col,P=PROB[G.p],L=lad(),lw=L[0].x-24;
  x.strokeStyle=A.alpha(C.tx,.35);x.lineWidth=5;[L[0].x+6,L[0].x+L[0].w-6].forEach(X=>{x.beginPath();x.moveTo(X,L[3].y-6);x.lineTo(X,A.H-8);x.stroke()});
  L.forEach(R=>{const used=G.tried.includes(R.i),on=G.at===R.i;x.fillStyle=on?A.alpha(C.ac,.3):used?A.alpha(C.tx,.08):A.alpha(C.cy,.16);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.strokeStyle=on?C.ac:C.cy;x.lineWidth=2;x.stroke();
   ft(x,700,A.narrow?13:15);x.fillStyle=C.tx;wrap(x,`${R.i+1}. ${R.n}`,R.w-10).forEach((l,j,a)=>x.fillText(l,R.x+R.w/2,R.y+R.h/2+(j-(a.length-1)/2)*15))});
  ft(x,800,A.narrow?16:19,'left');x.fillStyle=C.tx;wrap(x,P.t,lw-8).forEach((l,j)=>x.fillText(l,12,24+j*22));
  const fr=Math.min(lw*.28,A.H*.13);face(x,12+lw*.4,A.H*.48,fr,G.stuck);meter(x,12,A.H*.72,Math.min(lw-16,180));
  const p=pipAt();face(x,p.x,p.y,17,G.stuck);ft(x,700,11);x.fillStyle=C.tx;x.fillText('Pip',p.x,p.y+27)}
 const chipR=i=>{const w=(A.W-30)/2,h=Math.min(58,A.H*.13),y0=A.H*.47;return{x:10+(i%2)*(w+10),y:y0+Math.floor(i/2)*(h+8),w,h}};
 const bubR=()=>({x:12,y:10,w:A.W-24,h:A.H*.36});
 function askView(x){const C=A.col,B=bubR();x.fillStyle=A.alpha(C.vi,.12);A.paint.rrect(B.x,B.y,B.w,B.h,18);x.fill();x.strokeStyle=C.vi;x.lineWidth=2;x.stroke();
  ['What I am doing','What I tried','What I need'].forEach((s,i)=>{const y=B.y+B.h*(i+.5)/3;ft(x,600,12,'left');x.fillStyle=C.mu;x.fillText(s,B.x+12,y-14);
   const k=G.bub[i];ft(x,700,A.narrow?14:17,'left');x.fillStyle=C.tx;x.fillText(k==null?'…':CHIP[k][0],B.x+12,y+6)});
  CHIP.forEach((q,i)=>{if(G.bub.includes(i))return;const r=G.dr===i&&G.dp?{...chipR(i),x:G.dp.x-chipR(i).w/2,y:G.dp.y-chipR(i).h/2}:chipR(i);x.fillStyle=A.alpha(C.ac,.14);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=C.ac;x.lineWidth=2;x.stroke();
   ft(x,600,A.narrow?13:15);x.fillStyle=C.tx;wrap(x,q[0],r.w-14).forEach((l,j,a)=>x.fillText(l,r.x+r.w/2,r.y+r.h/2+(j-(a.length-1)/2)*16))})}
 const zones=()=>{const w=(A.W-36)/2,h=A.H*.4,y=A.H-h-12;return[{x:12,y,w,h,n:'Get a grown-up now'},{x:24+w,y,w,h,n:'Have a go first'}]};
 const cardR=()=>{const w=Math.min(A.W*.7,300),h=70;return{x:A.W/2-w/2,y:A.H*.1,w,h}};
 function nowView(x){const C=A.col;zones().forEach((z,i)=>{x.fillStyle=A.alpha(i?C.gr:C.rd,.12);A.paint.rrect(z.x,z.y,z.w,z.h,14);x.fill();x.strokeStyle=i?C.gr:C.rd;x.lineWidth=2;x.stroke();
   ft(x,800,A.narrow?14:17);x.fillStyle=C.tx;x.fillText(z.n,z.x+z.w/2,z.y+20);G.srt.filter(k=>SORT[k][1]===i).forEach((k,j)=>{ft(x,500,A.narrow?11:13);x.fillText(SORT[k][0],z.x+z.w/2,z.y+46+j*20)})});
  if(G.srt.length<SORT.length){const r=cardR(),p=G.dr==='card'&&G.dp?{x:G.dp.x-r.w/2,y:G.dp.y-r.h/2}:r;x.fillStyle='#fff';A.paint.shadow(10,4,.25);A.paint.rrect(p.x,p.y,r.w,r.h,14);x.fill();A.paint.noShadow();
   ft(x,800,A.narrow?16:19);x.fillStyle='#111827';wrap(x,SORT[G.cur][0],r.w-20).forEach((l,j,a)=>x.fillText(l,p.x+r.w/2,p.y+r.h/2+(j-(a.length-1)/2)*20))}}
 function draw(A){const{ctx:x,W,H,col:C}=A,m=mode();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);x.fillRect(0,0,W,H);
  if(m==='lad')ladView(x);else if(m==='ask')askView(x);else if(m==='now')nowView(x);else{face(x,W/2,H*.45,Math.min(W,H)*.22,G.Q&&G.Q.st||1)}
  if(G.flash>0){x.strokeStyle=A.alpha(C.gr,G.flash);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 const fresh=()=>{G.tok++;G.want=()=>{};G.Q=null;G.dr=null};
 const setP=p=>{G.p=p;G.at=-1;G.tried=[];G.same=0;G.stuck=1;G.fin=0;status()};
 // Pip uses one rung of the ladder
 function use(i){const P=PROB[G.p],top=G.tried.length?Math.max(...G.tried):-1;if(G.fin)return;
  if(!P.safe&&i===3&&top<0){G.at=-1;shake();tell('The teacher asks: "What have you tried?" Pip has not had a go yet. Try first.');sync();return}
  if(!P.safe&&i>top+1){shake();tell(`One rung at a time. Try "${RUNG[top+1]}" first.`);return}
  if(i===G.at){G.same++;G.stuck=Math.min(5,G.stuck+1);shake();tell(G.same>1?'The same try again and again. Pip is getting cross. Go up a rung!':'Trying the same way again does not help. Go up a rung.');sync();return}
  G.at=i;if(!G.tried.includes(i))G.tried.push(i);A.sound.tick();
  if(i===P.s){G.fin=1;G.stuck=0;G.flash=1;A.tween(G,{flash:0},900,'out');tell(P.r[i]+(P.safe&&G.tried.length===1?' It is not safe to try alone, so asking first was right.':''));sync();G.want();return}
  G.stuck=Math.min(5,G.stuck+1);tell(`${P.r[i]} Stuck meter ${G.stuck} of 5.`);sync()}
 function chip(i){if(G.bub.includes(i)||G.bub.length>=3)return;const q=CHIP[i];G.dr=null;if(!q[1]){shake();tell(`"${q[0]}" ${q[2]}`);A.redraw();return}
  // a good chip goes into its own line: what I'm doing (0), what I tried (2), what I need (4)
  G.bub[[0,2,4].indexOf(i)]=i;A.sound.pop();status()}
 function sortAs(z){const k=G.cur,ok=SORT[k][1]===z;G.dr=null;if(!ok){shake();tell(SORT[k][1]?`"${SORT[k][0]}" You are safe, so have a go first. Look, think, then ask.`:`"${SORT[k][0]}" Hurt, unsafe or someone unkind: get a grown-up straight away.`);A.redraw();return}
  G.srt.push(k);G.cur=Math.min(SORT.length-1,G.srt.length);A.sound.pop();status()}
 function shake(){A.sound.miss()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',G.said);if(!pad)return A.redraw();pad.innerHTML='';const m=mode();
  const B=(t,f,dis,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!dis;e.onclick=f};
  if(m==='lad'){RUNG.forEach((n,i)=>B(`${i+1}. ${n}`,()=>use(i),G.fin,`Pip: ${n}`));B('Start again',()=>setP(G.p));if(A.step===4)B('New problem',()=>{G.free=(G.free+1)%PROB.length;setP(G.free)})}
  if(m==='ask'){CHIP.forEach((q,i)=>B(q[0],()=>chip(i),G.bub.includes(i),`Add: ${q[0]}`));B('Clear',()=>{G.bub=[];status()})}
  if(m==='now'&&G.srt.length<SORT.length){B('Get a grown-up now',()=>sortAs(0));B('Have a go first',()=>sortAs(1))}A.redraw()}
 const fin=(st,test,msg)=>()=>{if(A.step===st&&test()&&(!steps[st].predict||A.pred[st]!=null)){A.done(msg()+A.reveal(st))}};
 const steps=[
  {h:'Have a go first',p:"Pip is stuck on a word. Drag Pip up the ladder, or tap a rung. Start at the bottom.",
   predict:{q:'Pip is stuck on a word. What should Pip do first?',opts:['Ask the teacher straight away','Have a go: try another way','Give up and draw instead'],ans:1},task:'Help Pip get unstuck',
   show:()=>{const k=G.tok;setP(0);[0,1].forEach((r,j)=>setTimeout(()=>{if(k===G.tok)use(r)},A.reduced()?0:j*500))},
   go:()=>{fresh();setP(0);G.want=fin(0,()=>G.fin,()=>'Pip tried, then found a clue. No help needed!')}},
  {h:'Still stuck? Ask',p:'This one is harder. Keep climbing. Watch the stuck meter.',
   predict:{q:'Pip has tried and is still stuck. What now?',opts:['Keep trying the same way for ever','Ask for help: Pip has had a go','Give up'],ans:1},task:'Help Pip open the paint pot',
   show:()=>{const k=G.tok;setP(1);[0,1,2,3].forEach((r,j)=>setTimeout(()=>{if(k===G.tok)use(r)},A.reduced()?0:j*450))},
   go:()=>{fresh();setP(1);G.want=fin(1,()=>G.fin,()=>'Pip had a go, so asking was the smart move.')}},
  {h:'A clear ask',p:'Help Pip ask for help with a sum. Drag the cards into the bubble, or tap them.',
   predict:{q:'Which ask helps the helper most?',opts:['"Help!"','"I counted on my fingers but ran out. Can you give me a clue?"','"Do it for me."'],ans:1},task:'Build a clear ask',
   show:()=>{G.bub=[];[0,2,4].forEach(i=>chip(i))},
   go:()=>{fresh();G.bub=[];status();G.want=fin(2,()=>G.bub.filter(v=>v!=null).length===3,()=>'Say what you are doing, what you tried, and ask for a clue.')}},
  {h:'Now, or try first?',p:'Drag each card to a box, or press a button.',
   predict:{q:'Pip has cut a finger. Should Pip have a go first?',opts:['Yes, always try first','No: if you are hurt or unsafe, get a grown-up straight away'],ans:1},task:'Sort all six problems',
   show:()=>{const k=G.tok;SORT.forEach((q,j)=>setTimeout(()=>{if(k===G.tok&&G.srt.length<SORT.length)sortAs(SORT[G.cur][1])},A.reduced()?0:j*200))},
   go:()=>{fresh();G.srt=[];G.cur=0;status();G.want=fin(3,()=>G.srt.length===SORT.length,()=>'Hurt, unsafe or unkind: ask a grown-up now. Everything else: have a go first.')}},
  {h:'Your turn',p:'Pick a new problem and help Pip climb.',go:()=>{fresh();setP(G.free)}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.want()});
 const KS=['first','when','now','best','brave','clue','busy'];let qn=-1,run=0;
 function ask(){qn++;const k=KS[qn%KS.length],j=qn%3;let q,ops,st=2;
  if(k==='first'){q="You are stuck on a sum. What do you do first?";ops=[['Have a go another way','ok'],['Ask the teacher straight away','early'],['Copy a friend','copy']]}
  else if(k==='when'){q='You tried two ways and asked a friend. Still stuck. Now what?';st=4;ops=[['Ask a grown-up','ok'],['Sit and wait','wait'],['Give up','quit']]}
  else if(k==='now'){q='You fall over and your knee is bleeding. What do you do?';st=5;ops=[['Get a grown-up straight away','ok'],['Have a go at fixing it first','tryhurt'],['Wait till home time','wait']]}
  else if(k==='best'){q='Which ask is best?';ops=[["I sounded it out. Can you help with the middle bit?",'ok'],["I can't do it!",'vague'],['Just tell me the answer.','answer']]}
  else if(k==='brave'){q='Is asking for help babyish?';st=1;ops=[['No: good learners ask after they try','ok'],['Yes: big kids never ask','baby'],['Only if nobody is looking','hide']]}
  else if(k==='clue'){q='Your helper gives you a clue, not the answer. Why?';st=1;ops=[['So you finish it and learn it yourself','ok'],["They don't know the answer",'dont'],['To be mean','mean']]}
  else{q='The teacher is reading with a group. You are stuck on a word, not hurt. What do you do?';st=3;ops=[['Try a friend or the word wall, then wait for a good moment','ok'],['Shout across the room','shout'],["Pull the teacher's sleeve right now",'pull']]}
  G.Q={k,st};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(j%ops.length).concat(ops.slice(0,j%ops.length)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});
  tell('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  if(tag==='ok')m='Yes!';
  else if(tag==='early')m='Have a go first. Then if you are still stuck, ask.';
  else if(tag==='copy')m='Copying skips the learning. Try another way, then ask for a clue.';
  else if(tag==='wait')m='Sitting stuck does not help. When you have had a go, ask.';
  else if(tag==='quit')m='You tried, so now it is time to ask, not to stop.';
  else if(tag==='tryhurt')m='Hurt or unsafe: get a grown-up straight away. No need to try first.';
  else if(tag==='vague')m='That does not say what is wrong. Say what you tried and what you need.';
  else if(tag==='answer')m='Asking for the answer means someone else does the learning. Ask for a clue.';
  else if(tag==='baby')m='Everyone gets stuck, even grown-ups. Asking after you try is smart.';
  else if(tag==='hide')m='No need to hide. Asking after you try is what good learners do.';
  else if(tag==='dont')m='A clue lets you finish it yourself, so you learn it.';
  else if(tag==='mean')m='A clue is kind: it lets you do the last bit yourself.';
  else if(tag==='shout')m='Shouting stops everyone. Try a friend or the wall, then ask at a good moment.';
  else m='Not hurt? Try a friend or the word wall first, then wait for a good moment.';
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
   A.gest({down:p=>{const m=mode();G.dp=null;
     if(m==='lad'){const q=pipAt();if(Math.hypot(p.x-q.x,p.y-q.y)<34&&!G.fin){G.dr='pip';return true}const R=lad().find(R=>inR(p,R));if(R)use(R.i);return false}
     if(m==='ask'){const i=CHIP.findIndex((q,i)=>!G.bub.includes(i)&&inR(p,chipR(i)));if(i>=0){G.dr=i;G.p0=p;return true}return false}
     if(m==='now'){if(G.srt.length<SORT.length&&inR(p,cardR())){G.dr='card';return true}return false}return false},
    move:p=>{G.dp=p;A.redraw()},
    up:p=>{const d=G.dr,m=mode();G.dr=null;G.dp=null;
     if(d==='pip'){const R=lad().find(R=>p.y>R.y-12&&p.y<R.y+R.h+12&&p.x>R.x-60);if(R)use(R.i);else A.redraw()}
     else if(typeof d==='number'){if(inR(p,bubR())||Math.hypot(p.x-G.p0.x,p.y-G.p0.y)<10)chip(d);else A.redraw()}
     else if(d==='card'){const i=zones().findIndex(z=>inR(p,{...z,y:z.y-20,h:z.h+20}));if(i>=0)sortAs(i);else A.redraw()}}});
   sync()}});
 A.start()})})();
