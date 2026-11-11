/* Flagship – narrative perspective and unreliable narrators (ages 11–14): tell one event (a smashed vase) as Sam ("I"),
   from Gran's limited view and from an all-knowing narrator and watch whose thoughts open up; name the perspective of
   three passages; find the facts Gran does not know (dramatic irony); catch Sam's narration out against the evidence;
   then mix narrator and honesty to make suspense, irony or an unreliable narrator. */
(()=>{
 const WHO=[['Sam','🧒','Gran will see the ball…'],['Gran','👵','Sam did this. I just know it.'],['the cat','🐈','Nobody saw me jump.']];
 const VIEWS=[['Sam tells it (I)','I heard the crash and my stomach dropped. Gran walked in. I could not tell what she was thinking.',[1,0,0]],
  ['Gran\'s view (she)','Gran saw the pieces, then Sam\'s red face. She was sure she knew who had done it.',[0,1,0]],
  ['All-knowing','The cat slunk off, pleased. Sam prayed no one would spot the ball. Gran had already, wrongly, blamed Sam.',[1,1,1]]];
 const KINDS=['First person','Third limited','Omniscient'];
 const PASS=[['Priya waited at the gate. She hoped Jo had not forgotten. A car slowed, but she could not see the driver.',1,[['🧍‍♀️','Priya',1],['🚗','driver',0]]],
  ['I grabbed my coat. Whatever Mia said now, I was not going back in there.',0,[['🧒','I',1],['👧','Mia',0]]],
  ['Leo read the letter twice. Across the street, Ana was sure he would bin it, and their dad secretly hoped he would.',2,[['👦','Leo',1],['👩','Ana',1],['👨','Dad',1]]]];
 const FACTS=[['The vase is broken',0],['The cat knocked it over',1],['Sam\'s face is red',0],['Sam kicked a ball indoors',1]];
 const LINES=[['"I was reading my new book the whole time."','📕','The book is still in its wrapper.'],['"I never touched the ball today."','⚽','The ball is lying by the vase.'],
  ['"The cat is always knocking things over."','',''],['"I came straight in. My shoes were clean."','👣','Muddy footprints lead from the door.']];
 const NAR=['Sam (I)','Gran (she)','All-knowing'],HON=['Tells all','Holds back'];
 const TELL={'00':['I kicked the ball inside. It bounced, the cat leapt, and the vase smashed. My face burned when Gran came in.','close: we feel Sam\'s guilt','close'],
  '01':['I was reading quietly when the cat went wild. I never touched the ball. (The muddy ball sits by the vase.)','unreliable: we catch Sam out','unrel'],
  '1':['Gran heard a crash. Sam stood by the pieces, red-faced. The cat licked its paw. Who had done it?','suspense: we only know what Gran knows','susp'],
  '20':['The cat, chasing Sam\'s ball, had sent the vase flying. Gran knew none of this. She glared at Sam.','dramatic irony: we know more than Gran','irony'],
  '21':['Something had knocked the vase from the shelf. Each of them knew a different piece of the story.','mystery: the answer is held back','myst']};
VIS.reg('flagnarr',c=>{let A,pad,quiz;
 const z={tok:0,cb:()=>{}};
 const part=()=>['view','name','irony','trust','mix','quiz'][A.step];
 function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const px=n=>A.narrow?n:Math.round(n*1.15);
 function lines(g,t,x,y,w,n,col,wt,al){g.font=`${wt||600} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;
  const L=[];let l='';t.split(' ').forEach(q=>{const m=l?l+' '+q:q;if(g.measureText(m).width>w&&l){L.push(l);l=q}else l=m});L.push(l);
  const h=px(n)*1.3;L.forEach((s,k)=>g.fillText(s,x,y+(k-(L.length-1)/2)*h));return L.length*h}
 function box(g,r,col,on,a){g.fillStyle=A.alpha(col,a||.13);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=on?3.5:1.6;g.stroke()}
 const icon=(g,e,x,y,n)=>{g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)};
 const on=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const badge=(t,x,y,bg)=>A.paint.label(t,x,y,{font:`800 ${px(12)}px system-ui,sans-serif`,bg});

 // the room: three people, thought bubbles open or shut
 function room(g,open,top,h){const C=A.col,w=A.W/3,n=Math.min(w*.32,h*.3);
  WHO.forEach(([nm,e,th],i)=>{const x=w*i+w/2,r={x:w*i+6,y:top,w:w-12,h:h*.5};box(g,r,open[i]?C.vi:C.mu,open[i],open[i]?.16:.06);
   if(open[i])lines(g,th,x,r.y+r.h/2,r.w-10,11,C.tx,600);else lines(g,'?',x,r.y+r.h/2,r.w,22,C.mu,800);
   icon(g,e,x,top+h*.72,n);lines(g,nm,x,top+h*.95,w,11,C.tx,700)});icon(g,'🏺',A.W*.34,top+h*.82,n*.5);icon(g,'⚽',A.W*.66,top+h*.84,n*.42)}
 const chipR=(i,n,y,h)=>{const g=8,w=(A.W-g*(n+1))/n;return{x:g+i*(w+g),y,w,h}};
 function chips(g,list,pick,y,h,good){const C=A.col;list.forEach((t,i)=>{const r=chipR(i,list.length,y,h);box(g,r,good&&good[i]?C.gr:i===pick?C.or:C.cy,i===pick,.12);lines(g,t,r.x+r.w/2,r.y+r.h/2,r.w-8,12,C.tx,700)})}

 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const v=part();
  if(v==='view'){const k=z.view;room(g,k==null?[0,0,0]:VIEWS[k][2],H*.03,H*.5);chips(g,VIEWS.map(q=>q[0]),k,H*.56,H*.11,VIEWS.map((q,i)=>z.seen[i]));
   if(k!=null){box(g,{x:8,y:H*.7,w:W-16,h:H*.28},C.mu,0,.05);lines(g,VIEWS[k][1],W/2,H*.84,W-36,13,C.tx,500)}else lines(g,'Pick who tells the story.',W/2,H*.82,W-30,14,C.tx,700)}
  if(v==='name'){const p=PASS[z.pi];if(!p){PASS.forEach((q,i)=>{const r={x:8,y:H*(.04+i*.32),w:W-16,h:H*.28};box(g,r,C.gr,0,.08);lines(g,q[0],W/2,r.y+r.h*.42,r.w-20,12,C.tx,500);badge(KINDS[q[1]],W/2,r.y+r.h*.86,'#047857')})}else{box(g,{x:8,y:H*.03,w:W-16,h:H*.4},C.mu,0,.05);lines(g,p[0],W/2,H*.23,W-36,14,C.tx,500);
    const n=p[2].length;p[2].forEach(([e,nm,m],i)=>{const x=W*(i+.5)/n,lit=z.named&&m;icon(g,e,x,H*.56,Math.min(44,H*.1));lines(g,nm,x,H*.65,W/n,11,C.tx,700);if(z.named)badge(lit?'mind open':'outside only',x,H*.49,lit?'#6d28d9':'#4b5563')});
    chips(g,KINDS,z.bad,H*.76,H*.17)}}
  if(v==='irony'){room(g,[1,1,1],H*.02,H*.42);FACTS.forEach(([t,gap],i)=>{const r={x:8+(i%2)*(W/2),y:H*(.5+Math.floor(i/2)*.24),w:W/2-16,h:H*.2},f=z.found[i];
    box(g,r,f?C.vi:z.bad===i?C.rd:C.cy,f,.12);lines(g,t,r.x+r.w/2,r.y+r.h*.42,r.w-12,12,C.tx,700);if(f)badge('Gran does not know',r.x+r.w/2,r.y+r.h*.82,'#6d28d9')})}
  if(v==='trust'){const tr=1-Object.keys(z.caught).length/3;lines(g,'Can we trust Sam?',W*.3,H*.05,W*.6,12,C.tx,800);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.62,H*.03,W*.34,14);
   g.fillStyle=tr>.5?'#16a34a':tr>0?'#d97706':'#dc2626';g.fillRect(W*.62+2,H*.03+2,(W*.34-4)*tr,10);if(!tr)lines(g,'Not at all',W*.79,H*.03+7,W*.34,11,C.rd,800);lines(g,'Evidence: 📕 book still wrapped · ⚽ ball by vase · 👣 mud by door',W/2,H*.11,W-16,11,C.tx,700);
   LINES.forEach(([t,e,why],i)=>{const r={x:8,y:H*(.17+i*.205),w:W-16,h:H*.19},k=z.caught[i];box(g,r,k?C.rd:z.bad===i?C.or:C.mu,k,.1);
    lines(g,t,W/2,r.y+r.h*(k?.32:.5),r.w-20,12,C.tx,600);if(k)lines(g,e+' '+why,W/2,r.y+r.h*.74,r.w-20,12,C.rd,800)})}
  if(v==='mix'){chips(g,NAR,z.n,H*.03,H*.12);chips(g,HON,z.n===1?null:z.h,H*.18,H*.1);const T=told();box(g,{x:8,y:H*.32,w:W-16,h:H*.44},C.mu,0,.05);lines(g,T[0],W/2,H*.54,W-36,13,C.tx,500);
   badge(T[1],W/2,H*.83,'#6d28d9');lines(g,'Found: '+(['susp','irony','unrel'].filter(k=>z.fx[k]).map(k=>({susp:'suspense',irony:'irony',unrel:'unreliable'})[k]).join(', ')||'none yet'),W/2,H*.93,W-20,12,C.tx,700)}
  if(v==='quiz')icon(g,'📖',W/2,H/2,64);A.fx.draw(g)}

 // ---------- actions ----------
 function pickView(k){z.view=k;z.seen[k]=1;A.sound.tick();report(`${VIEWS[k][0]}: "${VIEWS[k][1]}" ${['Only Sam\'s thoughts are open.','Only Gran\'s thoughts are open.','Every mind is open.'][k]}`)}
 function nameIt(k){const p=PASS[z.pi];if(!p||z.named)return;if(k!==p[1]){z.bad=k;A.sound.miss();let m='Look again at whose thoughts we get.';
   if(k===0)m='No narrator says "I" here. The narrator stands outside the story.';else if(p[1]===0)m='"I" is telling the story, so it is first person.';
   else if(k===1)m='We get inside more than one mind (Ana and Dad), so it is omniscient.';else m='We only get Priya\'s thoughts. She cannot see the driver, and neither can we. That is limited.';
   return report('Not quite. '+m)}
  z.named=1;z.bad=null;A.sound.pop();report(`Yes: ${KINDS[k]}. `+['The narrator is a character, "I", inside the story.','One mind open: we know only what Priya knows.','Several minds open at once.'][k]);
  const t=z.tok;setTimeout(()=>{if(t!==z.tok)return;z.pi++;z.named=0;report()},A.reduced()?10:1300)}
 function fact(i){if(z.found[i])return;if(!FACTS[i][1]){z.bad=i;A.sound.miss();return report(`Gran can see that herself, so there is no gap. Find what only the reader knows.`)}
  z.found[i]=1;z.bad=null;A.sound.pop();report(`Gap found: "${FACTS[i][0]}". We know it, Gran does not. That gap is dramatic irony.`)}
 function catchLine(i){if(z.caught[i])return;if(!LINES[i][1]){z.bad=i;A.sound.miss();return report('That one is true: the cat did knock the vase. Unreliable narrators mix truth with lies, so check each claim.')}
  z.caught[i]=1;z.bad=null;A.sound.pop();report(`Caught: ${LINES[i][0]} But ${LINES[i][2].toLowerCase()}`)}
 const told=()=>TELL[z.n===1?'1':`${z.n}${z.h}`];
 function mix(n,h){if(n!=null)z.n=n;if(h!=null)z.h=h;const T=told();z.fx[T[2]]=1;A.sound.tick();report(`${NAR[z.n]}${z.n===1?'':', '+HON[z.h].toLowerCase()}: "${T[0]}" Effect: ${T[1]}.${z.n===1&&h!=null?' Gran cannot hold back what she never saw.':''}`)}

 function report(msg){const v=part();let t='';
  if(v==='view')t=z.seen.filter(Boolean).length<3?'Try all three tellers.':'';
  else if(v==='name')t=PASS[z.pi]?(z.named?'':`Passage ${z.pi+1}: "${PASS[z.pi][0]}" First person, third limited or omniscient?`):'All three passages named: third limited, first person, omniscient.';
  else if(v==='irony')t=`Gaps found: ${Object.keys(z.found).length} of 2.`;else if(v==='trust')t=`Lies caught: ${Object.keys(z.caught).length} of 3.`;
  else if(v==='mix')t='';else t='Challenge time.';
  voice(((msg||'')+' '+t).trim());keys();z.cb()}
 function keys(){if(!A||!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='view')VIEWS.forEach((q,k)=>B(q[0],()=>pickView(k)));
  if(v==='name'&&PASS[z.pi]&&!z.named)KINDS.forEach((q,k)=>B(q,()=>nameIt(k)));
  if(v==='irony')FACTS.forEach((f,i)=>{if(!z.found[i])B(f[0],()=>fact(i),'Gran does not know: '+f[0])});
  if(v==='trust')LINES.forEach((l,i)=>{if(!z.caught[i])B('Doubt: '+l[0],()=>catchLine(i))});
  if(v==='mix'){NAR.forEach((q,k)=>B('Narrator: '+q,()=>mix(k,null)));HON.forEach((q,k)=>B(q,()=>mix(null,k)))}A.redraw()}

 function down(p){const v=part(),H=A.H;
  if(v==='view')VIEWS.forEach((q,k)=>{if(on(p,chipR(k,3,H*.56,H*.11)))pickView(k)});
  if(v==='name')KINDS.forEach((q,k)=>{if(on(p,chipR(k,3,H*.76,H*.17)))nameIt(k)});
  if(v==='irony')FACTS.forEach((f,i)=>{if(on(p,{x:8+(i%2)*(A.W/2),y:H*(.5+Math.floor(i/2)*.24),w:A.W/2-16,h:H*.2}))fact(i)});
  if(v==='trust')LINES.forEach((l,i)=>{if(on(p,{x:8,y:H*(.17+i*.205),w:A.W-16,h:H*.19}))catchLine(i)});
  if(v==='mix'){NAR.forEach((q,k)=>{if(on(p,chipR(k,3,H*.03,H*.12)))mix(k,null)});HON.forEach((q,k)=>{if(on(p,chipR(k,2,H*.18,H*.1)))mix(null,k)})}return false}

 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const seq=(fns,ms)=>{const k=z.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===z.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{z.tok++;z.cb=()=>{};Object.assign(z,{view:null,seen:[],pi:0,named:0,bad:null,found:{},caught:{},n:0,h:0,fx:{}})};
 const steps=[
  {h:'Who tells it?',p:'One event: the vase is smashed. Tell it three ways and watch whose thoughts we can see.',task:'Try all three tellers',
   show:()=>{steps[0].go();seq([0,1,2].map(k=>()=>pickView(k)),600)},go:()=>{reset();report();z.cb=fin(0,()=>z.seen.filter(Boolean).length===3,'The teller decides what the reader can know.')}},
  {h:'Name the view',p:'Ask two questions. Who says "I"? Whose thoughts do we get?',predict:{q:'A story says "she" all the way through. Which view is it?',opts:['Always omniscient','Limited or omniscient: check whose thoughts'],ans:1},
   task:'Name 3 passages',show:()=>{steps[1].go();seq(PASS.map(p=>()=>nameIt(p[1])),1500)},go:()=>{reset();report();z.cb=fin(1,()=>z.pi>=PASS.length,'Pronouns give first or third. Open minds give limited or omniscient.')}},
  {h:'Knowing more',p:'The all-knowing narrator shows every mind. Tap the facts that Gran does not know.',predict:{q:'We know the cat did it. Gran blames Sam. How does that feel?',opts:['A surprise later on','Tension now: we want to warn her'],ans:1},
   task:'Find the 2 gaps',show:()=>{steps[2].go();seq([1,3].map(i=>()=>fact(i)),600)},go:()=>{reset();report();z.cb=fin(2,()=>Object.keys(z.found).length===2,'Reader knows, character does not: dramatic irony.')}},
  {h:'Can we trust Sam?',p:'Now Sam tells it. Tap each line the evidence proves false.',predict:{q:'Sam says "I am telling the truth." Is Sam reliable?',opts:['Yes, Sam said so','Not yet: check the evidence'],ans:1},
   task:'Catch 3 lies',show:()=>{steps[3].go();seq([0,1,3].map(i=>()=>catchLine(i)),600)},go:()=>{reset();report();z.cb=fin(3,()=>Object.keys(z.caught).length===3,'An unreliable narrator: the clues say more than the teller.')}},
  {h:'Make an effect',p:'Pick a narrator and how much they tell. Make suspense, irony and an unreliable narrator.',task:'Find 3 effects',
   show:()=>{steps[4].go();seq([()=>mix(1,null),()=>mix(2,0),()=>mix(0,1)],700)},go:()=>{reset();report();z.cb=fin(4,()=>z.fx.susp&&z.fx.irony&&z.fx.unrel,'Perspective is a tool: it controls what we know and feel.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>z.cb()});

 const QS=[['"I knew Jake was lying. I just did not know why." Which view is this?',[['First person','ok'],['Third limited','pron'],['Omniscient','omni']]],
  ['The narrator tells us what three different characters secretly think. Which view?',[['Omniscient','ok'],['Third limited','omni'],['First person','pron']]],
  ['The reader knows the bridge is down, but the hero does not. What is this?',[['Dramatic irony','ok'],['A plot twist','irony'],['An unreliable narrator','trust']]],
  ['Max narrates: "I am the most honest boy in school." Then he hides his test. What should you do?',[['Doubt him and check his actions','ok'],['Believe him: he is the narrator','trust'],['Decide the author is a liar','author']]],
  ['A story uses "she" all the way through. What can you say for sure?',[['It is third person, limited or omniscient','ok'],['It is omniscient','omni'],['The narrator is a girl','pron']]],
  ['A first-person narrator is cruel to everyone. Is the author cruel?',[['No, the narrator is a made-up voice','ok'],['Yes, it is the author speaking','author'],['Yes, if the book is famous','trust']]]];
 function slip(t){let m='Ask: who tells it, and whose thoughts do we get?';
  if(t==='pron')m='Check the narrator\'s pronoun: "I" telling the story means first person; "he" or "she" means third.';
  if(t==='omni')m='Third person is not always all-knowing. One mind open is limited; many minds is omniscient.';
  if(t==='irony')m='A twist surprises us later. Dramatic irony is when we already know and a character does not.';
  if(t==='trust')m='Narrators can be wrong or lie. Test what they say against what happens.';
  if(t==='author')m='The narrator is a voice the author made up, not the author.';
  return m}
 let qi=-1,streak=0;
 function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
 function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
  if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right. Streak: '+streak+'.':'✗ '+slip(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   reset();A.gest({down});keys()}});
 A.start()})})();
