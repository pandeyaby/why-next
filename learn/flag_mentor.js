/* Flagship – planning narratives from a mentor text (10–11). Sort lines into telling and showing; read a short original
   mentor paragraph like a writer and label how it reveals Nell (action, speech, thought, looks); plan a new character, Jay,
   by dragging notes that show his trait into Action, Speech and Thought slots; pick setting details that build an uneasy
   mood; and borrow the mentor author's zoom, ordering setting lines from wide to close-up. */
(()=>{const TL=[['Sam was nervous.',0],['Sam folded the note for the fifth time, then unfolded it.',1],['Priya was kind.',0],['Priya gave the new girl the last seat on the bench.',1],['Grandad was angry.',0],['Grandad’s spoon clattered into his bowl. “Out,” he said.',1]],DEAL=[1,0,3,4,5,2];
 const TAG=['Action','Speech','Thought','Looks'],MT=[['Nell kicked the gate shut behind her.',0],['“I’m not scared of the dark,” she told the dog, loudly.',1],['She wondered if anyone else could hear her heart.',2],['Her hands were stuffed deep in her pockets, her hood pulled tight.',3]];
 const NOTE=[['Jay puts his hand up to go first, then grips the rope till his knuckles go white.',0],['“Easy,” Jay says, a bit too quickly.',1],['Jay counts the steps back to the coach, just in case.',2],['Jay is brave but scared.',-1],['Jay laughs and runs off to play football.',-2],['Jay has brown hair.',-3]];
 const NF={'-1':'That tells the reader the trait. Turn it into something Jay does, says or thinks.','-2':'That shows a carefree boy, not one who is brave outside and scared inside.','-3':'True, but it shows nothing about who Jay is inside. Pick a detail that reveals the trait.'};
 const SET=[['A gate creaks on one rusty hinge.',1],['Sunflowers nod in the bright sun.',0],['Wind pushes dead leaves against the door.',1],['The house was very scary.',-1],['One window glows, then goes dark.',1],['Children laugh on the swings next door.',0]];
 const ZM=['The village sat in a valley under a heavy grey sky.','At the far end of Mill Lane stood the old house.','Its front door was blistered and green.','On the knocker, one spider sat, waiting.'];
VIS.reg('flagmentor',c=>{let A,pad,chal,read;
 const S={bin:[[],[]],dk:0,tag:[-1,-1,-1,-1],slot:[-1,-1,-1],used:[],pk:-1,mood:[],tried:[],zo:[2,0,3,1],hold:0,at:null,it:-1,msg:'',fn:()=>{},tok:0};
 const kind=()=>['tell','spot','plan','mood','zoom','quiz'][A.step];
 function txt(x,s,X,Y,w,lh,max){const o=[];let r='';for(const t of s.split(' ')){const q=r?r+' '+t:t;if(r&&x.measureText(q).width>w){o.push(r);r=t}else r=q}o.push(r);o.slice(0,max||9).forEach((l,i)=>x.fillText(l,X,Y+i*lh));return Math.min(o.length,max||9)}
 function list(n,top,bot,x0,w){const g=7,h=(bot-top-g*(n-1))/n;return[...Array(n)].map((_,i)=>({i,x:x0==null?8:x0,y:top+i*(h+g),w:w==null?A.W-16:w,h}))}
 function grid(n,top,bot){const c2=Math.ceil(n/2),w=(A.W-22)/2;return list(c2,top,bot,8,w).flatMap(b=>[{...b,i:b.i},{...b,i:b.i+c2,x:14+w}]).filter(b=>b.i<n).sort((a,b)=>a.i-b.i)}
 const on=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
 const bins=()=>{const w=(A.W-22)/2,h=A.H*.58;return[{i:0,x:8,y:34,w,h},{i:1,x:14+w,y:34,w,h}]},deck=()=>({x:12,y:A.H*.58+46,w:A.W-24,h:A.H*.42-54});
 const slots=()=>list(3,34,A.H*.47),tray=()=>grid(6,A.H*.47+12,A.H-8),plan=()=>({x:8,y:34,w:A.W-16,h:A.H*.36}),chips=()=>grid(6,A.H*.36+46,A.H-8);
 function card(x,b,fill,edge,w){x.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,11);x.fill();x.strokeStyle=edge;x.lineWidth=w||1.3;x.stroke()}
 function draw(A){const{ctx:x,W,H,col:C}=A,k=kind(),F=(n,s)=>`${n} ${s||(A.narrow?13:14)}px system-ui`,lh=A.narrow?16:17;x.fillStyle=A.mix(C.pn,C.gr,.05);x.fillRect(0,0,W,H);x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle=C.tx;x.font=F(800,A.narrow?15:17);
  const head=t=>{x.fillStyle=C.tx;x.font=F(800,A.narrow?15:17);x.fillText(t,10,24)};
  if(k==='tell'){head('Telling or showing?');bins().forEach(b=>{card(x,b,A.mix(C.pn,b.i?C.gr:C.am,.1),b.i?C.gr:C.am,1.8);x.fillStyle=b.i?C.gr:C.am;x.font=F(800);x.fillText(b.i?'SHOWING':'TELLING',b.x+10,b.y+20);
    let y=b.y+42;x.fillStyle=C.tx;x.font=F(600,A.narrow?12:13);S.bin[b.i].forEach(j=>{y+=lh*txt(x,'• '+TL[j][0],b.x+8,y,b.w-14,lh-1,4)+6})});
   const j=DEAL[S.dk];if(j!=null){const D=deck(),P=S.hold&&S.at?{...D,x:S.at.x-D.w/2,y:S.at.y-24}:D;card(x,P,A.mix(C.pn,C.vi,.18),C.vi,2);x.fillStyle=C.tx;x.font=F(700,A.narrow?15:16);txt(x,TL[j][0],P.x+12,P.y+26,P.w-24,20,3)}
   else{x.fillStyle=C.gr;x.font=F(700);x.fillText('All six lines sorted.',12,H-30)}}
  if(k==='spot'){head('Mentor text: how do we meet Nell?');list(4,36,H-8).forEach(b=>{const t=S.tag[b.i],ok=t===MT[b.i][1];card(x,b,t<0?C.pn:A.mix(C.pn,ok?C.gr:C.rd,.14),t<0?A.alpha(C.tx,.35):ok?C.gr:C.rd);
    x.fillStyle=C.tx;x.font=F('italic 600');const n=txt(x,MT[b.i][0],b.x+10,b.y+20,b.w-20,lh,3);x.font=F(800,12);const lab=t<0?'tap to label':TAG[t];const w=x.measureText(lab).width+16;
    x.fillStyle=t<0?A.alpha(C.tx,.12):ok?C.gr:C.rd;A.paint.rrect(b.x+10,b.y+24+n*lh-6,w,20,10);x.fill();x.fillStyle=t<0?C.mu:C.bg;x.fillText(lab,b.x+18,b.y+24+n*lh+8)})}
  if(k==='plan'){head('Plan: Jay is brave outside, scared inside');slots().forEach(b=>{const n=S.slot[b.i];card(x,b,n<0?C.pn:A.mix(C.pn,C.gr,.14),n<0?A.alpha(C.vi,.6):C.gr,n<0?1.6:2);x.fillStyle=C.vi;x.font=F(800,12);x.fillText(TAG[b.i].toUpperCase(),b.x+10,b.y+16);
    x.fillStyle=n<0?C.mu:C.tx;x.font=F(600,A.narrow?12:13);txt(x,n<0?'drop a note that shows it':NOTE[n][0],b.x+10,b.y+33,b.w-20,15,Math.max(1,Math.floor((b.h-22)/15)))});
   tray().forEach(b=>{if(S.used.includes(b.i))return;const s=S.pk===b.i,P=S.hold&&S.pk===b.i&&S.at?{...b,x:S.at.x-b.w/2,y:S.at.y-b.h/2}:b;card(x,P,s?A.mix(C.pn,C.am,.22):A.mix(C.pn,C.cy,.08),s?C.am:A.alpha(C.cy,.6),s?2.5:1.3);
    x.fillStyle=C.tx;x.font=F(600,A.narrow?11:13);txt(x,(b.i+1)+'. '+NOTE[b.i][0],P.x+7,P.y+15,P.w-12,A.narrow?13:15,Math.max(1,Math.floor((P.h-4)/(A.narrow?13:15))))})}
  if(k==='mood'){head('Mood: uneasy. Build the setting.');const P=plan();card(x,P,A.mix(C.pn,C.vi,.1),C.vi,1.8);x.fillStyle=C.vi;x.font=F(800,12);x.fillText('MY SETTING PLAN · outside the old house',P.x+10,P.y+17);
   let y=P.y+38;x.fillStyle=C.tx;x.font=F(600,A.narrow?12:13);S.mood.forEach(j=>{y+=lh*txt(x,'• '+SET[j][0],P.x+10,y,P.w-20,lh,2)+4});
   chips().forEach(b=>{if(S.mood.includes(b.i))return;const t=S.tried.includes(b.i),Q=S.hold&&S.it===b.i&&S.at?{...b,x:S.at.x-b.w/2,y:S.at.y-b.h/2}:b;card(x,Q,t?A.mix(C.pn,C.rd,.12):A.mix(C.pn,C.cy,.08),t?C.rd:A.alpha(C.cy,.6));
    x.fillStyle=t?C.mu:C.tx;x.font=F(600,A.narrow?12:13);txt(x,SET[b.i][0],Q.x+8,Q.y+18,Q.w-14,15,Math.max(1,Math.floor((Q.h-6)/15)))})}
  if(k==='zoom'){head('Zoom in: wide → close-up');list(4,36,H-8,34,W-42).forEach(b=>{const z=S.zo[b.i],ok=z===b.i,dr=S.hold&&S.it===b.i,P=dr&&S.at?{...b,y:S.at.y-b.h/2}:b;card(x,P,ok?A.mix(C.pn,C.gr,.14):C.pn,ok?C.gr:A.alpha(C.tx,.35),dr?2.5:1.3);
    x.fillStyle=C.tx;x.font=F(600);txt(x,ZM[z],P.x+10,P.y+22,P.w-20,lh,4)});[18,13,9,5].forEach((r,i)=>{const b=list(4,36,H-8)[i];A.paint.ball(17,b.y+b.h/2,r,C.am)})}
  if(k==='quiz'&&S.q){card(x,{x:10,y:10,w:W-20,h:H-20},A.mix(C.pn,C.gr,.1),A.alpha(C.gr,.5));x.fillStyle=C.tx;x.font=F(700,A.narrow?15:17);const n=txt(x,S.q[0],26,42,W-52,22,7);
   x.fillStyle=C.mu;x.font=F(600);let y=66+n*22;['Show, don’t tell: action, speech, thought, looks.','Setting details build a mood.','Borrow the method, not the words.'].forEach(t=>{y+=20*txt(x,'• '+t,26,y,W-52,20,3)+4})}
  A.fx.draw(x)}
 function tell(m){S.msg=m||'';const k=kind();let t=m||'';
  if(k==='tell')t+=` Telling: ${S.bin[0].length}. Showing: ${S.bin[1].length}.`+(DEAL[S.dk]!=null?' Next line: '+TL[DEAL[S.dk]][0]:'');
  if(k==='spot')t+=' Labels: '+S.tag.map((v,i)=>`line ${i+1} ${v<0?'none':TAG[v]}`).join(', ')+'.';
  if(k==='plan')t+=' Slots: '+S.slot.map((n,i)=>TAG[i]+' '+(n<0?'empty':'note '+(n+1))).join(', ')+'.';
  if(k==='mood')t+=' Plan holds: '+(S.mood.map(j=>SET[j][0]).join(' ')||'nothing yet.');if(k==='zoom')t+=' Order: '+S.zo.map(z=>ZM[z]).join(' ');
  A.cv.setAttribute('aria-label',t.trim()||'Planning lab');c.say(t);if(read)read.textContent=m||'';btns();A.redraw();S.fn()}
 function sort(b){const j=DEAL[S.dk];if(j==null)return;if(TL[j][1]===b){S.bin[b].push(j);S.dk++;A.sound.pop();tell(b?'Showing: the reader works out the feeling from what happens.':'Telling: the feeling is named for the reader.')}
  else{A.sound.miss();tell(b?'That names the feeling, so it tells. Showing gives an action, words said or a detail to picture.':'No feeling word is named here. We work it out from the action, so that is showing.')}}
 function label(i,v){S.tag[i]=v==null?(S.tag[i]+1)%4:v;const t=S.tag[i],ok=t===MT[i][1];ok?A.sound.pop():A.sound.miss();
  tell(ok?['Action: what Nell does.','Speech: what Nell says, and how.','Thought: what goes on in Nell’s head.','Looks: how Nell appears.'][t]:t===2&&i===1?'She says this out loud, so it is speech, even though it tells us about her fear.':`Not ${TAG[t]}. Is it something she does, says, thinks, or how she looks?`)}
 function grab(n){if(S.used.includes(n))return;S.pk=n;A.sound.tick();tell('Holding note '+(n+1)+'. Now pick its slot.')}
 function put(n,s){if(n<0||S.used.includes(n))return;if(S.slot[s]>=0)return tell(TAG[s]+' is already filled.');const ty=NOTE[n][1];S.pk=-1;
  if(ty===s){S.slot[s]=n;S.used.push(n);A.sound.pop();tell(`Yes: note ${n+1} shows the trait through ${TAG[s].toLowerCase()}.`)}
  else{A.sound.miss();tell(ty<0?NF[ty]:`Good note, wrong slot: note ${n+1} is ${TAG[ty].toLowerCase()}, not ${TAG[s].toLowerCase()}.`)}}
 function add(j){if(S.mood.includes(j))return;const v=SET[j][1];if(v===1){S.mood.push(j);A.sound.pop();tell('That detail makes the reader uneasy without saying so.')}
  else{if(!S.tried.includes(j))S.tried.push(j);A.sound.miss();tell(v<0?'That tells the reader the mood. Show it with a sound, a sight or a movement instead.':'That detail is cheerful. It fights the uneasy mood you are building.')}}
 function swap(a,b){if(a===b||b<0||b>3)return;[S.zo[a],S.zo[b]]=[S.zo[b],S.zo[a]];A.sound.tick();const z=S.zo;
  tell(z.every((v,i)=>v===i)?'Wide, closer, closer, close-up: like a camera moving in, which builds suspense.':z[0]!==0?'Start wide: the whole scene first, so the reader knows where they are.':'Each line should move closer than the one before.')}
 function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':l||null},pad,t).onclick=f};
  if(k==='tell'&&DEAL[S.dk]!=null){b('Telling',()=>sort(0),'Sort as telling: '+TL[DEAL[S.dk]][0]);b('Showing',()=>sort(1),'Sort as showing: '+TL[DEAL[S.dk]][0])}
  if(k==='spot')MT.forEach((m,i)=>b('Label line '+(i+1),()=>label(i),'Change the label for: '+m[0]));
  if(k==='plan'){if(S.pk<0)NOTE.forEach((n,i)=>{if(!S.used.includes(i))b('Note '+(i+1),()=>grab(i),'Pick note: '+n[0])});else TAG.slice(0,3).forEach((t,s)=>{if(S.slot[s]<0)b('Put in '+t,()=>put(S.pk,s),`Put note ${S.pk+1} in ${t}`)})}
  if(k==='mood')SET.forEach((s,j)=>{if(!S.mood.includes(j))b('Add '+(j+1),()=>add(j),'Add to the plan: '+s[0])});
  if(k==='zoom')S.zo.forEach((z,p)=>{if(p)b('↑ Line '+(p+1),()=>swap(p,p-1),'Move up: '+ZM[z])})}
 const fin=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m+A.reveal(n))};
 const seq=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},j*ms))};
 const wipe=()=>{S.tok++;S.fn=()=>{};S.bin=[[],[]];S.dk=0;S.tag=[-1,-1,-1,-1];S.slot=[-1,-1,-1];S.used=[];S.pk=-1;S.mood=[];S.tried=[];S.zo=[2,0,3,1];S.msg=''};
 const steps=[
  {h:'Show, don’t tell',p:'Telling names a feeling or trait. Showing lets the reader work it out. Drag each line into a box, or tap a box.',
   predict:{q:'Which line makes you feel Sam is nervous?',opts:['Sam was very, very nervous.','Sam folded the note for the fifth time.'],ans:1},
   task:'Sort all six lines',show:()=>seq(DEAL.map(j=>()=>sort(TL[j][1])),600),go:()=>{wipe();S.fn=fin(0,()=>S.dk>=6,'Adding “very” does not help. An action lets the reader feel it.')}},
  {h:'Read like a writer',p:'Good writers borrow methods from books they read. This is a mentor text. Tap each line to name how the author shows us Nell.',
   predict:{q:'Nell says she is not scared. Is she?',opts:['No, she says so','Yes: her thoughts and her looks give her away'],ans:1},
   task:'Label all four lines',show:()=>seq(MT.map((m,i)=>()=>label(i,m[1])),500),go:()=>{wipe();S.fn=fin(1,()=>S.tag.every((v,i)=>v===MT[i][1]),'What Nell says and what she thinks do not match. That gap tells the reader she is scared.')}},
  {h:'Plan a character',p:'Now plan your own character the same way. Jay acts brave but is scared inside. Drag a note into a slot, or pick a note and then a slot.',
   task:'Fill Action, Speech and Thought',show:()=>seq([0,1,2].map(n=>()=>put(n,n)),600),go:()=>{wipe();S.fn=fin(2,()=>S.slot.every(n=>n>=0),'Three small details, no trait named. The reader will meet Jay the way we met Nell.')}},
  {h:'Setting sets the mood',p:'Jay waits outside an old house. Choose details that make the reader uneasy. Drag them into the plan, or tap Add.',
   predict:{q:'What does a setting do in a good story?',opts:['Just says where it happens','Says where, and makes the reader feel something'],ans:1},
   task:'Add three uneasy details',show:()=>seq([0,2,4].map(j=>()=>add(j)),500),go:()=>{wipe();S.fn=fin(3,()=>S.mood.length===3,'A creak, a push of wind, a light going out: the reader feels uneasy, and no one said “scary”.')}},
  {h:'Borrow the zoom',p:'The mentor author opens wide, then moves closer each line, like a camera. Drag the lines into that order, or use the buttons.',
   task:'Order the lines wide to close-up',show:()=>{const o=S.zo.slice(),fs=[];for(let p=0;p<4;p++){let q=o.indexOf(p);while(q>p){const a=q;fs.push(()=>swap(a,a-1));[o[q],o[q-1]]=[o[q-1],o[q]];q--}}seq(fs,400)},
   go:()=>{wipe();S.fn=fin(4,()=>S.zo.every((v,i)=>v===i),'You borrowed a method, not the words. That is how writers learn from mentor texts.')}},
  {h:'Challenge',p:'',go:()=>{S.tok++;S.fn=()=>{};pose()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.fn()});
 const QB=[['Which line shows that Mia is excited?',['Mia bounced on her toes and checked the clock again.'],[['Mia was really excited.','tell'],['Mia lived on a farm.','fact']]],
  ['“I don’t care,” Tom muttered, kicking a stone. Which method is “kicking a stone”?',['Action'],[['Speech','method'],['Looks','method']]],
  ['You want a calm, safe mood. Which setting detail fits?',['Warm light spilled from the kitchen window.'],[['A branch scraped at the glass.','mood'],['It was a calm and safe place.','tell']]],
  ['What does borrowing from a mentor text mean?',['Using the author’s method with your own ideas'],[['Copying the author’s sentences','copy'],['Using the same character names','copy']]],
  ['Which order zooms in from wide to close-up?',['the forest → a path → a gate → a key in the lock'],[['a key in the lock → a gate → a path → the forest','zoom'],['a gate → the forest → a key in the lock → a path','zoom']]],
  ['Ravi is shy. Which plan note shows it best?',['Ravi waits by the door until everyone else has gone in.'],[['Ravi is very shy.','tell'],['Ravi has a blue bike.','fact']]],
  ['A character says, “I’m fine!” but her hands shake. What should the reader believe?',['Her actions: she is not fine'],[['Her words: she is fine','method'],['Nothing: it is unclear','mood']]]];
 let qn=-1,row=0;
 function pose(){qn++;const[q,[key],wr]=QB[qn%QB.length],o=[key,...wr.map(w=>w[0])],r=qn%3,op=o.slice(r).concat(o.slice(0,r));S.q=[q,key];
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  op.forEach(w=>{c.el('button',{type:'button',class:'lbtn sm'},chal.querySelector('.fl-pick'),w).onclick=()=>check(w)});A.cv.setAttribute('aria-label','Challenge: '+q);c.say('Challenge: '+q);A.redraw()}
 function check(w){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const[,[key],wr]=QB[qn%QB.length],ok=w===key,tag=(wr.find(x=>x[0]===w)||[])[1];let m;
  if(ok)m='Right.';else if(tag==='tell')m='That names the feeling, so it tells. Pick the line that lets the reader work it out.';
  else if(tag==='fact')m='True, maybe, but it shows nothing about the character’s feelings.';
  else if(tag==='method')m='Ask: is it something they do, say, think, or how they look? Actions often say more than words.';
  else if(tag==='mood')m='That detail pulls against the mood. Every detail should push the reader the same way.';
  else if(tag==='copy')m='Copying is not borrowing. Take the method, such as the zoom, and fill it with your own ideas.';
  else m='A zoom starts with the widest view, then each step moves closer.';
  const fb=chal.querySelector('.fl-fb');if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${row}.`:` Answer: ${key}`} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function down(p){const k=kind();if(k==='quiz')return false;
  if(k==='tell'){if(on(p,deck())&&DEAL[S.dk]!=null){S.hold=1;S.at=p;return true}const b=bins().find(b=>on(p,b));if(b)sort(b.i);return false}
  if(k==='spot'){const b=list(4,36,A.H-8).find(b=>on(p,b));if(b)label(b.i);return false}
  if(k==='plan'){const t=tray().find(b=>on(p,b)&&!S.used.includes(b.i));if(t){grab(t.i);S.hold=1;S.at=p;return true}const s=slots().find(b=>on(p,b));if(s&&S.pk>=0)put(S.pk,s.i);return false}
  if(k==='mood'){const t=chips().find(b=>on(p,b)&&!S.mood.includes(b.i));if(t){S.it=t.i;S.hold=1;S.at=p;S.mv=0;return true}return false}
  const b=list(4,36,A.H-8).find(b=>on(p,b));if(b){S.it=b.i;S.hold=1;S.at=p;A.redraw();return true}return false}
 function move(p){if(S.hold){S.mv=1;S.at=p;A.redraw()}}
 function up(p){if(!S.hold)return;S.hold=0;p=p||S.at;const k=kind();
  if(k==='tell'){const b=bins().find(b=>on(p,b));if(b)sort(b.i);else A.redraw()}
  else if(k==='plan'){const s=slots().find(b=>on(p,b));if(s)put(S.pk,s.i);else A.redraw()}
  else if(k==='mood'){if(!S.mv||on(p,plan()))add(S.it);else A.redraw()}
  else if(k==='zoom'){const t=list(4,36,A.H-8).find(b=>on(p,b));if(t&&t.i!==S.it)swap(S.it,t.i);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.7,tall:1.5,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;btns();A.cv.setAttribute('aria-label',steps[A.step].p||'Challenge')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Planning lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});btns()}});
 A.start()})})();
