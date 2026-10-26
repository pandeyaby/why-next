/* Flagship – using help wisely, including AI (16–18): sort help that builds learning from help that replaces it, catch
   a confident AI's wrong algebra step and prove it by substitution, tell real checks from fake ones, read what a
   classroom trial of AI tutors found, and build an honest AI acknowledgement for coursework. */
(()=>{const lo=Math.min,hi=Math.max;
 const ASKS=[['Quiz me on cell biology, one question at a time',0],['Write my essay so I can hand it in',1],['Give me a hint for Q4, not the answer',0],
  ['Rewrite my paragraph so it sounds better, and I submit that',1],['Explain the step I got wrong, then I redo it myself',0],['Do all ten homework questions for me',1]];
 const ASKWHY=['Builds learning: you still do the thinking.','Does it for you: the brain work is skipped, so nothing sticks.'];
 const WORK=[['3(x + 4) = 27','The question.'],['3x + 4 = 27','Wrong: the 3 must multiply the 4 too, giving 3x + 12.'],['3x = 23','Follows from the wrong line.'],['x = 23/3 ≈ 7.67','Follows from the wrong line.']];
 const CHK=[['Ask the AI: are you sure?',0,'It can just agree with itself. Asking again is not a check.'],['Put the answer back into the question',1],
  ['Compare with the mark scheme or textbook',1],['It sounds confident and shows steps',0,'Confident wording is not evidence. AI can be fluent and wrong.'],
  ['Ask your teacher',1],['Ask the same AI again: same answer',0,'Repeating a mistake twice does not make it right.']];
 const BARS={prac:[0,48,127],exam:[0,-17,0]},GRP=['No AI','Answer AI','Tutor AI'];
 const ACK=[['Name of the AI tool',1],['Date you used it',1],['Saved copy of your prompts and its replies',1],['How you used it',1],
  ['Nothing: research help does not count',0,'Any AI use must be acknowledged, even for research.'],['Its text pasted in as your words',0,'Passing off AI text as your own, even reworded, is malpractice.']];
VIS.reg('flagai',c=>{let A,ctl,quizEl,live;
 const G={k:0,bin:[[],[]],bad:null,hold:null,pick:null,line:null,sub:0,chk:[],seen:{prac:0,exam:0},worst:null,ack:[],run:0,after:()=>{},big:null};
 const kind=()=>['sort','work','check','study','ack','quiz'][A.step];
 const sz=z=>A.narrow?z:z+2;
 const txt=(x,s,X,Y,z,k,w,al)=>{x.font=`${w||700} ${sz(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,X,Y)};
 function wrap(x,s,w,z){x.font=`700 ${sz(z)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(v=>{const t=cur?cur+' '+v:v;if(cur&&x.measureText(t).width>w){out.push(cur);cur=v}else cur=t});out.push(cur);return out}
 function block(x,s,B,z,k,left){const L=wrap(x,s,B.w-18,z),lh=sz(z)*1.28;L.forEach((l,i)=>txt(x,l,left?B.x+9:B.x+B.w/2,B.y+B.h/2+(i-(L.length-1)/2)*lh,z,k,700,left?'left':'center'))}
 function box(x,B,k,bold,f){x.fillStyle=A.mix(A.col.pn,k,f==null?.13:f);A.paint.rrect(B.x,B.y,B.w,B.h,12);x.fill();x.lineWidth=bold?3.5:1.5;x.strokeStyle=k;x.stroke()}
 const inR=(p,B)=>!!B&&p.x>=B.x&&p.x<=B.x+B.w&&p.y>=B.y&&p.y<=B.y+B.h;
 const askB=()=>({x:12,y:A.H*.06,w:A.W-24,h:A.H*.22});
 const binB=s=>{const w=(A.W-30)/2;return{x:10+s*(w+10),y:A.H*.4,w,h:A.H*.56}};
 const lineB=i=>{const h=A.H*.095;return{x:12,y:A.H*.075+i*(h+7),w:A.W-24,h}};
 const chkB=i=>{const g=8,w=(A.W-3*g)/2,h=A.H*.16;return{x:g+(i%2)*(w+g),y:A.H*.2+Math.floor(i/2)*(h+g),w,h}};
 const ackB=i=>{const h=A.H*.1;return{x:12,y:A.H*.22+i*(h+6),w:A.W-24,h}};
 const chart=()=>({x:40,y:A.H*.16,w:A.W-56,h:A.H*.6});
 function sortD(x){const C=A.col;['Builds my learning','Does it for me'].forEach((w,s)=>{const B=binB(s);box(x,B,s?C.rd:C.gr,0,.07);txt(x,w,B.x+B.w/2,B.y+18,14,C.tx,900);
   G.bin[s].forEach((i,j)=>block(x,'✓ '+ASKS[i][0],{x:B.x,y:B.y+34+j*(B.h-38)/3,w:B.w,h:(B.h-38)/3},11,C.mu))});
  if(G.k>=ASKS.length)return txt(x,'All six sorted',A.W/2,A.H*.17,16,C.gr,800);
  const b=askB(),B=G.hold?{...b,x:G.hold.p.x-b.w/2,y:G.hold.p.y-b.h/2}:b;box(x,B,G.bad?C.rd:C.vi,G.pick!=null||!!G.bad,.2);block(x,'“'+ASKS[G.k][0]+'”',B,14,C.tx);
  txt(x,`Request ${G.k+1} of 6`,A.W/2,A.H*.33,12,C.mu,700)}
 function workD(x){const C=A.col;txt(x,'AI chat: Solve 3(x + 4) = 27',A.W/2,A.H*.035,12,C.mu,700);
  WORK.forEach(([s],i)=>{const B=lineB(i),bad=G.line===1&&i===1;box(x,B,bad?C.rd:i&&G.line===i?C.am:C.cy,bad,.1);txt(x,s,B.x+16,B.y+B.h/2,16,C.tx,800,'left');txt(x,'line '+(i+1),B.x+B.w-12,B.y+B.h/2,11,C.mu,700,'right')});
  const y0=A.H*.53,B={x:12,y:y0,w:A.W-24,h:A.H*.42};box(x,B,G.sub&&G.line===1?C.gr:C.am,0,.08);
  const L=[];if(G.sub){L.push(['Check AI: 3(7.67 + 4) = 3 × 11.67 = 35','not 27 ✗',C.rd])}
  if(G.line===1){L.push(['Fix: 3(x + 4) = 3x + 12 = 27','',C.tx]);L.push(['3x = 15, so x = 5','',C.tx]);L.push(['Check: 3(5 + 4) = 3 × 9 = 27','✓',C.gr])}
  if(!L.length)L.push(['Tap the line where it first goes wrong,','',C.mu],['or test its answer in the question.','',C.mu]);
  L.forEach(([s,t,k],i)=>{block(x,s+(t?'  '+t:''),{x:B.x,y:B.y+8+i*(B.h-16)/4,w:B.w,h:(B.h-16)/4},12,k,1)})}
 function checkD(x){const C=A.col,n=G.chk.length;txt(x,'Is the AI answer right? Pick real checks.',A.W/2,A.H*.04,13,C.tx,800);
  x.fillStyle=A.alpha(C.mu,.2);A.paint.rrect(12,A.H*.09,A.W-24,16,8);x.fill();x.fillStyle=n>=3?C.gr:C.cy;A.paint.rrect(12,A.H*.09,(A.W-24)*lo(1,n/3)||.01,16,8);x.fill();
  txt(x,`Real checks: ${n} of 3`,A.W/2,A.H*.15,12,n>=3?C.gr:C.mu,800);
  CHK.forEach(([s,ok],i)=>{const B=chkB(i),on=G.chk.includes(i),bad=G.bad===i;box(x,B,on?C.gr:bad?C.rd:C.cy,on||bad,on?.25:.1);block(x,(on?'✓ ':bad?'✗ ':'')+s,B,12,C.tx)})}
 function studyD(x){const C=A.col,P=chart(),Y=v=>P.y+P.h*(1-(v+40)/180);txt(x,'Maths practice with AI, then an exam without it',A.W/2,A.H*.05,12,C.tx,800);txt(x,'(about 1,000 high school students)',A.W/2,A.H*.1,11,C.mu,700);
  [-40,0,50,100,140].forEach(v=>{x.strokeStyle=A.alpha(C.mu,v?.25:.8);x.lineWidth=v?1:2;x.beginPath();x.moveTo(P.x,Y(v));x.lineTo(P.x+P.w,Y(v));x.stroke();txt(x,(v>0?'+':'')+v+'%',P.x-6,Y(v),10,C.mu,700,'right')});
  const gw=P.w/3;GRP.forEach((g,i)=>{['prac','exam'].forEach((r,j)=>{const bx=P.x+i*gw+gw*.12+j*gw*.4,bw=gw*.34,v=G.seen[r]?BARS[r][i]:null;
    if(v==null){x.setLineDash([4,4]);x.strokeStyle=C.mu;x.strokeRect(bx,Y(30),bw,Y(0)-Y(30));x.setLineDash([]);txt(x,'?',bx+bw/2,Y(15),14,C.mu,800);return}
    const top=Y(hi(v,0)),h=Math.abs(Y(v)-Y(0))||2;x.fillStyle=j?(i===G.worst?C.rd:C.or):C.cy;A.paint.rrect(bx,top,bw,h,4);x.fill();
    txt(x,i?(v?(v>0?'+':'')+v+'%':'≈ same'):'base',bx+bw/2,v<0?Y(v)+11:top-9,10,C.tx,800)});
   txt(x,g,P.x+i*gw+gw/2,P.y+P.h+14,12,C.tx,800)});
  x.fillStyle=C.cy;x.fillRect(P.x,A.H*.93,12,12);txt(x,'practice (with AI)',P.x+16,A.H*.93+6,11,C.mu,700,'left');x.fillStyle=C.or;x.fillRect(A.W/2+10,A.H*.93,12,12);txt(x,'exam (no AI)',A.W/2+26,A.H*.93+6,11,C.mu,700,'left')}
 function ackD(x){const C=A.col,n=G.ack.filter(i=>ACK[i][1]).length;block(x,'You used an AI to suggest sources for history coursework. What goes in your acknowledgement?',{x:8,y:4,w:A.W-16,h:A.H*.13},13,C.tx);
  txt(x,`Required parts: ${n} of 4`,A.W/2,A.H*.18,12,n>=4?C.gr:C.mu,800);
  ACK.forEach(([s,ok],i)=>{const B=ackB(i),on=G.ack.includes(i),bad=G.bad===i;box(x,B,on?C.gr:bad?C.rd:C.cy,on||bad,on?.25:.1);block(x,(on?'✓ ':bad?'✗ ':'')+s,B,12,C.tx)})}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);x.fillRect(0,0,W,H);
  const f={sort:sortD,work:workD,check:checkD,study:studyD,ack:ackD}[kind()];if(f)f(x);else txt(x,G.big||'🤖',W/2,H/2,lo(W,H)*.22,'#000');A.fx.draw(x)}
 const miss=(s,i)=>{A.sound.miss();G.bad=i==null?1:i;setTimeout(()=>{G.bad=null;A.redraw()},700);tell(s)};
 function file(s){if(G.k>=ASKS.length)return;G.pick=null;const want=ASKS[G.k][1];if(s!==want)return miss(ASKWHY[want]);G.bin[s].push(G.k);G.k++;A.sound.pop();tell(ASKWHY[s])}
 function flagLine(i){G.line=i;if(i!==1){A.sound.miss();return tell(i?'That line follows correctly from the one above. Look earlier.':'That is just the question.')}A.sound.pop();tell(WORK[1][1])}
 function sub(){G.sub=1;A.sound.tick();tell('3 × 11.67 is 35, not 27, so the AI answer fails the check.')}
 function check(i){if(G.chk.includes(i))return;if(!CHK[i][1])return miss(CHK[i][2],i);G.chk.push(i);A.sound.pop();tell('A real check: it uses something outside the AI.')}
 function see(r){G.seen[r]=1;A.sound.tick();tell(r==='prac'?'With AI during practice, both AI groups scored higher.':'In the exam without AI, the answer-AI group scored 17% below the no-AI group.')}
 function worst(i){G.worst=i;if(i!==1)return miss(i?'The tutor group, given hints not answers, ended up about the same as no AI.':'No AI is the baseline the others are compared with.');A.sound.pop();tell('The answer AI boosted practice but students learned less.')}
 function own(i){if(G.ack.includes(i))return;if(!ACK[i][1])return miss(ACK[i][2],i);G.ack.push(i);A.sound.pop();tell('Needed: '+ACK[i][0]+'.')}
 function tell(m){const k=kind();let s;
  if(k==='sort')s=G.k<6?`Request: ${ASKS[G.k][0]}. Builds learning ${G.bin[0].length}, does it for you ${G.bin[1].length}.`:'All six sorted.';
  else if(k==='work')s=`Faulty line chosen: ${G.line==null?'none':G.line+1}. Answer tested: ${G.sub?'yes, it fails':'no'}.`;
  else if(k==='check')s='Real checks picked: '+(G.chk.map(i=>CHK[i][0]).join('; ')||'none')+'.';
  else if(k==='study')s=`Practice shown: ${G.seen.prac?'yes':'no'}. Exam shown: ${G.seen.exam?'yes':'no'}.`+(G.worst!=null?` Picked worst: ${GRP[G.worst]}.`:'');
  else if(k==='ack')s='Included: '+(G.ack.map(i=>ACK[i][0]).join('; ')||'nothing')+'.';else s='Challenge time.';
  s=(m?m+' ':'')+s;c.say(s);A.cv.setAttribute('aria-label',s);if(live)live.textContent=s;rebuild();G.after()}
 function rebuild(){if(!A||!ctl)return;ctl.innerHTML='';const k=kind();
  const btn=(s,f,lab,off)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},ctl,s);b.disabled=!!off;b.onclick=f};
  if(k==='sort'&&G.k<6){btn('Builds my learning',()=>file(0),'File as builds my learning');btn('Does it for me',()=>file(1),'File as does it for me')}
  if(k==='work'){WORK.forEach((w,i)=>btn('Line '+(i+1),()=>flagLine(i),'Line '+(i+1)+' goes wrong first: '+w[0]));btn('Test x = 7.67',sub,'Put the AI answer back into the question',G.sub)}
  if(k==='check')CHK.forEach(([s],i)=>btn(s,()=>check(i),'Check: '+s,G.chk.includes(i)));
  if(k==='study'){btn('Show practice',()=>see('prac'),'Show practice results',G.seen.prac);btn('Show exam',()=>see('exam'),'Show exam results',G.seen.exam);
   if(G.seen.prac&&G.seen.exam)GRP.forEach((g,i)=>btn('Worst in exam: '+g,()=>worst(i),'Did worst in the exam: '+g))}
  if(k==='ack')ACK.forEach(([s],i)=>btn(s,()=>own(i),'Include: '+s,G.ack.includes(i)));A.redraw()}
 const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,ms)=>{const r=G.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===G.run)f()},A.reduced()?j*25:j*ms))};
 const fresh=()=>{G.run++;G.after=()=>{};G.big=null;G.pick=null;G.hold=null;G.bad=null};
 const steps=[
  {h:'Help that builds you',p:'Some help makes you learn. Some help does the work for you. Sort each request.',task:'Sort all six requests',
   show:()=>{steps[0].go();seq(ASKS.map(a=>()=>file(a[1])),450)},go:()=>{fresh();G.k=0;G.bin=[[],[]];tell();G.after=ready(0,()=>G.k>=6,()=>'Good help leaves the thinking to you: quizzes, hints and explanations you then act on.')}},
  {h:'Catch the slip',p:'An AI solved this equation with neat steps. Find the line where it first goes wrong, and test its answer.',
   predict:{q:'It shows every step and sounds sure. Is its answer right?',opts:['Yes: the working is shown','Maybe not: check it'],ans:1},task:'Find the faulty line and test the answer',
   show:()=>{steps[1].go();seq([sub,()=>flagLine(1)],900)},go:()=>{fresh();G.line=null;G.sub=0;tell();G.after=ready(1,()=>G.line===1&&G.sub,()=>'Putting the answer back in caught it: 35 is not 27. The fix gives x = 5, and 3 × 9 = 27.')}},
  {h:'Real checks only',p:'Which of these actually tell you if an AI answer is right? Pick the real checks.',
   predict:{q:'You ask the AI “are you sure?” and it says yes. Is that a check?',opts:['Yes: it looked again','No: it can just agree'],ans:1},task:'Pick three real checks',
   show:()=>{steps[2].go();seq([1,2,4].map(i=>()=>check(i)),500)},go:()=>{fresh();G.chk=[];tell();G.after=ready(2,()=>G.chk.length>=3,()=>'A real check uses something outside the AI: the question itself, a trusted source or a person who knows.')}},
  {h:'What a trial found',p:'In a 2025 study, students practised maths with an AI that gave answers, an AI tutor that gave hints, or no AI. Then they sat an exam with no AI.',
   predict:{q:'How did the answer-AI group do in the exam, compared with no AI?',opts:['Better','About the same','Worse'],ans:2},task:'Reveal both rounds and pick who did worst in the exam',
   show:()=>{steps[3].go();seq([()=>see('prac'),()=>see('exam'),()=>worst(1)],800)},go:()=>{fresh();G.seen={prac:0,exam:0};G.worst=null;tell();G.after=ready(3,()=>G.seen.prac&&G.seen.exam&&G.worst===1,()=>'Answers on tap raised practice scores by 48% but lowered the exam by 17%. Hints kept students thinking.')}},
  {h:'Own it honestly',p:'In UK exam coursework, AI use must be acknowledged, and your teacher may limit it. Build the acknowledgement.',task:'Include all four required parts',
   show:()=>{steps[4].go();seq([0,1,2,3].map(i=>()=>own(i)),500)},go:()=>{fresh();G.ack=[];tell();G.after=ready(4,()=>G.ack.filter(i=>ACK[i][1]).length>=4,()=>'Tool, date, saved prompts and replies, and how you used it. Marks still only go to your own work.')}},
  {h:'Challenge',p:'',go:()=>{fresh();next()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.after()});
 const QS=[['An AI gives you a full essay plan for coursework. You use it but do not say so. What is that?','📝',[['Malpractice: AI use must be acknowledged','ok'],['Fine, it is only a plan','plan'],['Fine if you change some words','reword']]],
  ['Best way to use AI for revising for a test?','🧠',[['Ask it to quiz me, then check my answers','ok'],['Ask it for a summary and reread it','reread'],['Ask it for the answers to past papers','answers']]],
  ['The AI says 15% of 80 is 10. Fastest real check?','🔢',[['10% is 8, 5% is 4, so 15% is 12: it is wrong','ok'],['Ask the AI if it is sure','sure'],['It gave a number, so it is fine','fine']]],
  ['An AI cites a study you cannot find anywhere. What should you do?','🔍',[['Do not use it until you find the real source','ok'],['Use it: the AI read it somewhere','trust'],['Cite the AI as the study','cite']]],
  ['You are stuck on a homework question. Which help builds learning most?','💡',[['Ask for a hint, then try again yourself','ok'],['Ask for the full worked answer and copy it','copy'],['Skip it','skip']]]];
 let qi=-1,streak=0;
 function next(){qi++;const[q,big,ops]=QS[qi%QS.length],r=qi%3;G.big=big;quizEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quizEl.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});c.say('Challenge: '+q);A.redraw()}
 function judge(t){quizEl.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';let m;switch(t){case 'ok':m='Right.';break;case 'plan':m='Using AI for planning still counts. Unacknowledged use is malpractice under exam rules.';break;case 'reword':m='Rewording AI work and calling it yours is still malpractice.';break;case 'reread':m='Rereading feels easy but builds little. Being quizzed makes you recall, which sticks.';break;case 'answers':m='Answers skip the thinking. The trial showed this lowers later exam scores.';break;case 'sure':m='It can just agree with itself. Use a check outside the AI.';break;case 'fine':m='A number is not proof. 10% of 80 is 8, so 15% must be more than 10.';break;case 'trust':m='AI tools can invent sources that do not exist. Find it yourself first.';break;case 'cite':m='The AI is not the study. Only cite sources you have checked.';break;case 'copy':m='Copying a worked answer skips the struggle that makes it stick.';break;default:m='Skipping loses the chance to learn. A hint keeps you working.'}
 
  if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
 function down(p){const k=kind();
  if(k==='sort'&&G.k<6){if(inR(p,askB())){G.hold={p,p0:p};return true}if(G.pick!=null){if(inR(p,binB(0)))file(0);else if(inR(p,binB(1)))file(1)}return false}
  if(k==='work'){const i=WORK.findIndex((w,i)=>inR(p,lineB(i)));if(i>=0)flagLine(i);else if(p.y>A.H*.53&&!G.sub)sub();return false}
  if(k==='check'){const i=CHK.findIndex((w,i)=>inR(p,chkB(i)));if(i>=0)check(i);return false}
  if(k==='study'){const P=chart();if(inR(p,{x:P.x,y:P.y-20,w:P.w,h:P.h+40})){const i=Math.floor((p.x-P.x)/(P.w/3));if(!G.seen.prac)see('prac');else if(!G.seen.exam)see('exam');else if(i>=0&&i<3)worst(i)}return false}
  if(k==='ack'){const i=ACK.findIndex((w,i)=>inR(p,ackB(i)));if(i>=0)own(i);return false}return false}
 function move(p){if(G.hold){G.hold.p=p;A.redraw()}}
 function up(p){const h=G.hold;if(!h)return;G.hold=null;if(p&&Math.hypot(p.x-h.p0.x,p.y-h.p0.y)>12){if(inR(p,binB(0)))return file(0);if(inR(p,binB(1)))return file(1)}
  G.pick=G.pick==null?0:null;if(G.pick!=null){A.sound.tick();c.say('Picked up. Now tap a box.')}A.redraw()}
 A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{const q=A.step===5;quizEl.hidden=!q;live.hidden=q;ctl.hidden=q;rebuild()},
  init:A=>{const E=c.el,wrapEl=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'});
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},wrapEl);quizEl=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});rebuild()}});
 A.start()})})();
