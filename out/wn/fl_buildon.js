/* Flagship – building on others in discussions (ages 10–11): add a reply that builds instead of repeating, ask
   follow-up questions, back a remark with evidence, steer drifting talk back to the question, sharpen vague questions. */
(()=>{
 const QN='Should our school have a longer lunch break?';
 const AVA='A longer lunch would give us more time to play outside.';
 const R0=[['I agree, we would get more time to play outside.','repeat'],['Yes, and running around at lunch could help us focus in afternoon lessons.','ok'],['My favourite lunch is pizza.','offtopic']];
 const LEO='Some kids never finish their food before the bell.';
 const Q1=[['Why do you think they run out of time?','ok'],["What's your favourite sport?",'offtopic'],['How would a longer break fix that?','ok'],['Is lunch good or not?','vague'],['Who sits next to you?','offtopic']];
 const REM=[['🏃','Play helps us focus.'],['🍎','Kids do not finish food.'],['🕒','Home time would be later.']];
 const EVI=[['On Monday six trays went back half full.',1],['If lunch grows by 15 minutes, school ends at 3:30.',2],['Our teacher says we work better after a run.',0]];
 const DRIFT=['Longer lunch means more football.','My brother plays for a team.','His team won a cup last year!'];
 const BACK=[['Cool! But how would a longer lunch help people who do not play football?','ok'],['What cup did they win?','drift'],['Can everyone just stop talking?','rude']];
 const SPEC=[['What do you mean by "not enough time"?',0],['What about stuff?',1],['How many extra minutes would be enough?',0],['Is that good or whatever?',1]];
VIS.reg('flagbuildon',c=>{let A,pad,quiz;
 const G={put:null,ok0:0,asks:[],miss:'',lk:{},held:null,at:null,from:null,back:null,si:0,sorted:[],tok:0,onChange:()=>{}};
 const mode=()=>['build','ask','evi','drift','spec','quiz'][A.step];
 function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const big=n=>A.narrow?n:Math.round(n*1.22),F=(w,n)=>`${w} ${big(n)}px system-ui,sans-serif`;
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;

 // ---------- drawing helpers ----------
 function tile(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=thick?3.5:1.5;g.stroke()}
 function lines(g,t,w){const out=[];let l='';t.split(' ').forEach(x=>{const s=l?l+' '+x:x;if(l&&g.measureText(s).width>w){out.push(l);l=x}else l=s});out.push(l);return out}
 function text(g,t,r,n,col,wt,al){g.font=F(wt||600,n);const L=lines(g,t,r.w-20),lh=big(n)*1.28;g.fillStyle=col;g.textBaseline='middle';g.textAlign=al||'center';
  const y0=r.y+r.h/2-(L.length-1)*lh/2;L.forEach((l,i)=>g.fillText(l,al==='left'?r.x+10:r.x+r.w/2,y0+i*lh))}
 function emo(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{font:F(800,11),bg});
 const topR=()=>({x:10,y:8,w:A.W-20,h:A.narrow?50:44});
 function head(g){const C=A.col,r=topR();tile(g,r,C.vi,.1);text(g,'❓ '+QN,r,13,C.tx,800)}
 function bubble(g,who,e,t,r,col,thick){tile(g,r,col,.12,thick);emo(g,e,r.x+20,r.y+r.h/2,24);text(g,`${who}: ${t}`,{x:r.x+32,y:r.y,w:r.w-32,h:r.h},13,A.col.tx,600,'left')}
 function listR(n,y,h){const gap=8,hh=Math.min(h,(A.H-y-10-gap*(n-1))/n);return[...Array(n)].map((_,i)=>({x:10,y:y+i*(hh+gap),w:A.W-20,h:hh}))}
 function meter(g,v,y,lab,good){const C=A.col,x=10,w=A.W-20;g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(x,y,w,12,6);g.fill();g.fillStyle=good?C.gr:C.or;A.paint.rrect(x,y,Math.max(12,w*v),12,6);g.fill();
  g.font=F(700,11);g.textAlign='left';g.textBaseline='bottom';g.fillStyle=C.tx;g.fillText(lab,x,y-3)}

 // ---------- scenes ----------
 function drawBuild(g){const C=A.col,t=topR(),y=t.y+t.h+10,bh=A.narrow?56:48;bubble(g,'Ava','👧',AVA,{x:10,y,w:A.W-20,h:bh},C.cy);
  const tag=G.put==null?'':R0[G.put][1],sy=y+bh+10;G.slot={x:30,y:sy,w:A.W-40,h:bh};
  if(G.put==null){g.setLineDash([6,5]);tile(g,G.slot,C.mu,.05);g.setLineDash([]);text(g,'Your reply goes here',G.slot,12,C.mu,700)}
  else bubble(g,'You','🙂',R0[G.put][0],G.slot,tag==='ok'?C.gr:C.rd,1);
  meter(g,tag==='ok'?1:tag==='repeat'?.35:tag==='offtopic'?.08:.35,sy+bh+26,tag==='ok'?'Discussion moves forward':tag==='offtopic'?'Off topic: the talk loses its way':tag==='repeat'?'Same idea again: the talk stands still':'How far the talk moves',tag==='ok');
  G.cards=listR(3,sy+bh+48,A.narrow?50:52);G.cards.forEach((q,i)=>{if(G.put===i)return;let b=q;if(G.held===i&&G.at)b={...q,x:G.at.x-q.w/2,y:G.at.y-q.h/2};tile(g,b,C.vi,.12,G.held===i);text(g,R0[i][0],b,12,C.tx)})}
 function drawAsk(g){const C=A.col,t=topR(),y=t.y+t.h+10,bh=A.narrow?52:44;bubble(g,'Leo','👦',LEO,{x:10,y,w:A.W-20,h:bh},C.cy);
  g.font=F(700,12);g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(`Follow-up questions asked: ${G.asks.length} of 2`,A.W/2,y+bh+14);
  G.cards=listR(5,y+bh+30,A.narrow?46:52);G.cards.forEach((q,i)=>{const[s,tag]=Q1[i],on=G.asks.includes(i),bad=G.miss==='q'+i;tile(g,q,on?C.gr:bad?C.rd:C.vi,.12,on||bad);text(g,(on?'✓ ':'')+s,q,12,C.tx);if(bad)pill(tag==='vague'?'too vague':'not about Leo\'s idea',q.x+q.w-70,q.y+8,'#b91c1c')})}
 function eviR(){const t=topR(),y=t.y+t.h+12,n=A.narrow,rw=n?A.W-20:(A.W-30)*.42,rh=n?40:54,gap=8;
  const R=REM.map((_,i)=>({x:10,y:y+i*(rh+gap),w:rw,h:rh}));const ey=n?y+3*(rh+gap)+16:y,ex=n?10:20+rw,ew=n?A.W-20:A.W-30-rw,eh=n?44:54;
  return{R,E:EVI.map((_,i)=>({x:ex,y:ey+i*(eh+gap),w:ew,h:eh}))}}
 function drawEvi(g){const C=A.col,{R,E}=eviR();head(g);
  EVI.forEach((e,i)=>{const r=G.lk[i];if(r==null||A.narrow)return;const a=E[i],b=R[r];g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(A.narrow?a.x+24:a.x,a.y+a.h/2);g.lineTo(A.narrow?b.x+24:b.x+b.w,b.y+b.h/2);g.stroke()});
  R.forEach((r,i)=>{const got=Object.values(G.lk).includes(i),bad=G.miss==='r'+i;tile(g,r,got?C.gr:bad?C.rd:C.cy,.12,got||bad);emo(g,REM[i][0],r.x+20,r.y+r.h/2,20);text(g,REM[i][1],{x:r.x+30,y:r.y,w:r.w-30,h:r.h},12,C.tx,700,'left')});
  E.forEach((q,i)=>{let b=q;if(G.held===i&&G.at)b={...q,x:G.at.x-q.w/2,y:G.at.y-q.h/2};tile(g,b,G.lk[i]!=null?C.gr:G.held===i?C.or:C.vi,.12,G.held===i);text(g,(G.lk[i]!=null&&A.narrow?'✓ '+REM[G.lk[i]][0]+' ':'📎 ')+EVI[i][0],b,12,C.tx)})}
 function drawDrift(g){const C=A.col;head(g);const t=topR(),y0=t.y+t.h+8,n=A.narrow,bw=n?A.W*.62:A.W*.42,bh=n?44:40,fixed=G.back==='ok';
  DRIFT.forEach((d,i)=>{const x=10+(A.W-20-bw)*(i+1)/3,y=y0+i*(bh+8),r={x,y,w:bw,h:bh};tile(g,r,i<1?C.cy:C.or,.12,0);text(g,d,r,12,C.tx)});
  const dy=y0+3*(bh+8)+18;meter(g,fixed?.05:G.back==='drift'?1:.85,dy,fixed?'Back on the question':G.back==='drift'?'Even further from the question':'Distance from the question',fixed);
  if(G.back){const r={x:10,y:dy+18,w:A.W-20,h:bh+6};bubble(g,'You','🙂',BACK.find(b=>b[1]===G.back)[0],r,fixed?C.gr:C.rd,1)}
  if(!fixed&&!G.back)pill('the talk is drifting →',A.W/2,dy+30,'#b45309')}
 function binR(){const w=(A.W-30)/2,h=A.narrow?104:130;return[{x:10,y:A.H-h-10,w,h},{x:20+w,y:A.H-h-10,w,h}]}
 function drawSpec(g){const C=A.col;head(g);const t=topR(),B=binR(),done=G.si>=SPEC.length;
  ['🎯 Specific','🌫️ Too vague'].forEach((l,i)=>{tile(g,B[i],i?C.or:C.gr,.08,G.miss==='b'+i);text(g,l,{...B[i],h:28},13,C.tx,800);
   G.sorted.filter(k=>SPEC[k][1]===i).forEach((k,j)=>text(g,SPEC[k][0],{x:B[i].x,y:B[i].y+28+j*((B[i].h-30)/2),w:B[i].w,h:(B[i].h-30)/2},11,C.tx,600))});
  if(done){G.card=null;return text(g,'All 4 sorted. Specific questions are easy to answer.',{x:10,y:t.y+t.h+20,w:A.W-20,h:60},13,C.tx,700)}
  let r={x:A.W*.15,y:t.y+t.h+24,w:A.W*.7,h:64};G.card=r;if(G.held!=null&&G.at)r={...r,x:G.at.x-r.w/2,y:G.at.y-r.h/2};tile(g,r,C.vi,.14,1);text(g,'Mia asks: '+SPEC[G.si][0],r,13,C.tx,700);
  g.font=F(600,11);g.textAlign='center';g.fillStyle=C.tx;g.fillText(`Question ${G.si+1} of 4`,A.W/2,t.y+t.h+100)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.3);g.fillRect(0,0,W,H);const m=mode();
  if(m==='build'){head(g);drawBuild(g)}if(m==='ask'){head(g);drawAsk(g)}if(m==='evi')drawEvi(g);if(m==='drift')drawDrift(g);if(m==='spec')drawSpec(g);if(m==='quiz')emo(g,'🗣️',W/2,H/2,72);A.fx.draw(g)}

 // ---------- actions ----------
 function reply(i){if(G.ok0)return;G.put=i;const tag=R0[i][1];
  if(tag==='ok'){G.ok0=1;A.sound.pop();return report('That builds! You keep Ava\'s idea and add something new: play could help focus.')}
  A.sound.miss();report(tag==='repeat'?'That says Ava\'s idea again in new words. Agreeing is fine, but add something new.':'Pizza is not about the length of lunch. Stay on the question.')}
 function askQ(i){if(G.asks.includes(i)||G.asks.length>=2)return;const tag=Q1[i][1];
  if(tag==='ok'){G.asks.push(i);G.miss='';A.sound.pop();return report(i===0?'Good follow-up: it digs into Leo\'s point.':'Good follow-up: it links Leo\'s point back to the question.')}
  G.miss='q'+i;A.sound.miss();report(tag==='vague'?'Too vague. A follow-up asks about what Leo actually said.':'That question is not about Leo\'s idea. Ask about not finishing food.')}
 function attach(e,r){if(G.lk[e]!=null)return;G.held=null;
  if(EVI[e][1]===r){G.lk[e]=r;G.miss='';A.sound.pop();return report(`Evidence added: "${EVI[e][0]}" backs up "${REM[r][1]}"`)}
  G.miss='r'+r;A.sound.miss();report(`That fact does not prove "${REM[r][1]}" Which remark is it really about?`)}
 function steer(k){if(G.back==='ok')return;G.back=BACK[k][1];
  if(G.back==='ok'){A.sound.pop();return report('Back on track! You were kind about the cup and linked back to the lunch question.')}
  A.sound.miss();report(G.back==='drift'?'That follows the drift. Now everyone talks about cups, not lunch.':'That shuts people down. Steer them back with a question about the topic.')}
 function sort(b){if(G.si>=SPEC.length)return;const[s,ans]=SPEC[G.si];G.held=null;
  if(b===ans){G.sorted.push(G.si);G.si++;G.miss='';A.sound.pop();return report(ans?`Too vague: "${s}" could mean anything.`:`Specific: "${s}" asks about one clear thing.`)}
  G.miss='b'+b;A.sound.miss();report(ans?'Could someone answer that clearly? What does it actually ask?':'That one names exactly what it wants to know. Try again.')}

 function report(msg){const m=mode();let t='';
  if(m==='build')t=G.ok0?'':'Pick a reply to Ava.';
  if(m==='ask')t=`Follow-ups: ${G.asks.length} of 2.`;
  if(m==='evi')t=`Evidence linked: ${Object.keys(G.lk).length} of 3.`+(G.held!=null?' Now pick the remark it supports.':'');
  if(m==='drift')t=G.back==='ok'?'':'The talk has drifted to a football cup. Pick a question.';
  if(m==='spec')t=G.si<SPEC.length?`Sort: ${SPEC[G.si][0]}`:'';
  speak((msg?msg+' ':'')+t);buttons();G.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':label||null},pad,t);e.onclick=f;return e};
  if(m==='build'&&!G.ok0)R0.forEach((x,i)=>b(`Reply ${i+1}`,()=>reply(i),'Reply: '+x[0]));
  if(m==='ask'&&G.asks.length<2)Q1.forEach((x,i)=>{if(!G.asks.includes(i))b(`Ask ${i+1}`,()=>askQ(i),'Ask: '+x[0])});
  if(m==='evi'){const e=EVI.findIndex((_,i)=>G.lk[i]==null);if(e>=0)REM.forEach((r,j)=>b(`Fact ${e+1} → ${r[0]}`,()=>attach(e,j),`"${EVI[e][0]}" supports "${r[1]}"`))}
  if(m==='drift'&&G.back!=='ok')BACK.forEach((x,i)=>b(`Say ${i+1}`,()=>steer(i),'Say: '+x[0]));
  if(m==='spec'&&G.si<SPEC.length){b('🎯 Specific',()=>sort(0),'Specific question');b('🌫️ Too vague',()=>sort(1),'Too vague question')}A.redraw()}

 // ---------- canvas input ----------
 function down(p){const m=mode();G.at=p;G.from=p;
  if(m==='build'){const k=(G.cards||[]).findIndex((q,i)=>inside(p,q)&&G.put!==i);if(k>=0&&!G.ok0){G.held=k;A.redraw();return true}return false}
  if(m==='ask'){const k=(G.cards||[]).findIndex(q=>inside(p,q));if(k>=0)askQ(k);return false}
  if(m==='evi'){const{R,E}=eviR(),i=E.findIndex(r=>inside(p,r)),j=R.findIndex(r=>inside(p,r));
   if(i>=0&&G.lk[i]==null){G.held=i;report('Holding a fact. Drag it to a remark, or tap the remark.');return true}
   if(j>=0&&G.held!=null)attach(G.held,j);return false}
  if(m==='spec'&&inside(p,G.card)){G.held=0;return true}
  if(m==='spec'){const k=binR().findIndex(r=>inside(p,r));if(k>=0)sort(k)}return false}
 function up(p){const m=mode(),moved=G.from&&Math.hypot(p.x-G.from.x,p.y-G.from.y)>12;G.at=null;
  if(m==='build'&&G.held!=null){const k=G.held;G.held=null;if(!moved||inside(p,{x:0,y:G.slot.y-30,w:A.W,h:G.slot.h+60}))reply(k);else report('Drop the reply in the empty slot.');return}
  if(m==='evi'&&G.held!=null&&moved){const j=eviR().R.findIndex(r=>inside(p,r));if(j>=0)attach(G.held,j);else{G.held=null;report('Drop the fact on a remark.')}}
  if(m==='spec'&&G.held!=null){G.held=null;if(moved){const k=binR().findIndex(r=>inside(p,r));if(k>=0)sort(k);else A.redraw()}else report('Drag the question to a box, or tap a box.')}}

 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const fresh=()=>{G.tok++;G.onChange=()=>{};Object.assign(G,{put:null,ok0:0,asks:[],miss:'',lk:{},held:null,at:null,back:null,si:0,sorted:[],cards:null,card:null})};
 const steps=[
  {h:'Build, do not repeat',p:'Ava has made a point. Drag the reply that builds on her idea into the slot, or tap it.',
   predict:{q:'Which kind of reply moves a discussion forward?',opts:['Saying the same idea again in new words','Keeping the idea and adding something new'],ans:1},task:'Add a reply that builds on Ava',
   show:()=>{steps[0].go();later([()=>reply(0),()=>reply(1)],900)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.ok0,'Building means: keep the idea, add something new.')}},
  {h:'Ask a follow-up',p:'Leo made a point. Tap 2 questions that dig into what Leo actually said.',task:'Ask 2 follow-up questions',
   show:()=>{steps[1].go();later([()=>askQ(0),()=>askQ(2)],800)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.asks.length===2,'A follow-up question starts from what the speaker just said.')}},
  {h:'Back it up',p:'A remark is stronger with evidence. Drag each fact to the remark it supports, or tap the fact and then the remark.',
   predict:{q:'Mia says, "Lunch should be longer because I want it to be." Is that a strong addition?',opts:['Yes, she gave a reason','No, she needs a fact or example'],ans:1},task:'Link all 3 facts',
   show:()=>{steps[2].go();later(EVI.map((e,i)=>()=>attach(i,e[1])),700)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>Object.keys(G.lk).length===3,'Facts and examples make remarks stronger.')}},
  {h:'Back on track',p:'Each remark followed the last, and now the talk is about a football cup. Pick what you would say.',
   predict:{q:'The talk has drifted far from the question. What helps most?',opts:['Ask more about the cup','Ask a question that links back to lunch'],ans:1},task:'Steer the talk back',
   show:()=>{steps[3].go();later([()=>steer(1),()=>steer(0)],1000)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>G.back==='ok','A linking question steers drifting talk back to the topic.')}},
  {h:'Make it specific',p:'Specific questions are easy to answer. Drag each of Mia\'s questions to a box, or tap a box.',task:'Sort all 4 questions',
   show:()=>{steps[4].go();later(SPEC.map(s=>()=>sort(s[1])),600)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.si>=SPEC.length,'Name exactly what you want to know.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});

 // ---------- challenge ----------
 const QS=[['Sam says, "Homework helps us practise." Which reply builds on it?',[['Yes, and practising at home means we forget less over the weekend.','ok'],['Yes, homework helps us practise.','repeat'],['I got a new bike.','offtopic']]],
  ['Priya says, "Our park needs more bins." Which is a good follow-up question?',[['Where have you seen the most litter?','ok'],['What is your favourite park game?','offtopic'],['What about things?','vague']]],
  ['Jay says, "We should plant more trees at school." How could you make his point stronger?',[['Add that trees give shade on hot days, like the oak by the gate.','ok'],['Say, "I agree, more trees."','repeat'],['Say, "Because trees, obviously."','noreason']]],
  ['A talk about school trips has drifted onto video games. What do you say?',[['Fun! But which trip would teach us the most?','ok'],['Which game is the best?','drift'],['Stop talking about games, that is silly.','rude']]],
  ['Which question is the most specific?',[['How long does the bus to the museum take?','ok'],['What about the trip and stuff?','vague'],['Is it good?','vague']]],
  ['Ben says, "Pets teach kids to be responsible." Which reply builds on Ben\'s remark?',[['Yes, my cousin feeds her rabbit every morning before school.','ok'],['Pets are responsible, like Ben said.','repeat'],['Ben always talks the most.','person']]]];
 function slip(tag){let m='Look again at what the speaker said.';
  if(tag==='repeat')m='That says the same idea again. Building means adding something new.';
  if(tag==='offtopic')m='That is off topic. Stay with what the speaker said.';
  if(tag==='vague')m='Too vague: nobody could answer it clearly. Ask about one exact thing.';
  if(tag==='noreason')m='That gives no real reason. Add a fact or an example.';
  if(tag==='drift')m='That follows the drift away. Link back to the main question.';
  if(tag==='rude')m='That shuts people down. Steer with a kind question instead.';
  if(tag==='person')m='Talk about the idea, not the person.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes, that moves the talk forward.':'✗ '+slip(tag)}${good?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

 A=FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   fresh();A.gest({down,move:p=>{G.at=p;A.redraw()},up});buttons()}});
 A.start()})})();
