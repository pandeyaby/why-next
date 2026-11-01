/* Flagship – narrative writing (ages 7–11): pace a story by choosing which events become slow scenes and which are
   one-line summaries; build the key moment from a mix of action, dialogue, thought and sensory detail; keep only
   dialogue that shows a feeling or moves the plot; link events with time phrases that fit the gap; pick an ending that
   answers the story's problem. Challenge on the usual slips: equal detail for every event, "and then" chains, filler
   chat, "Suddenly" for anything, naming a feeling instead of showing it, and dream or new-problem endings. */
(()=>{
const BEATS=[['🛏️','Zara got up and got dressed.',0,'getting dressed'],['🚌','She rode the bus to the pool.',0,'bus ride'],['🧍','She stood on the diving block and froze.',1,'the freeze'],['🏊','She dived and swam her length.',1,'the dive'],['🏠','She went home with her medal.',0,'going home']];
const WHY0=['Getting dressed changes nothing. Summarise it so the reader reaches the problem sooner.','Nothing happens on the bus. One line is enough.','Freezing on the block is the problem. Slow it down so the reader is there with her.','The dive is the turning point. It deserves a full scene.','The trip home is after the story is solved. Keep it short.'];
const TOOLS=[['🏃','Action','Her toes curled over the cold edge.'],['💬','Speech','“I can’t,” she whispered.'],['💭','Thought','Everyone is watching me, she thought.'],['👂','Sense','Water slapped the tiles. The whistle shrieked.'],['🏃','Action','She gripped her goggles until her knuckles went white.'],['😨','Tell','Zara was very scared.'],['👀','Sense','The water below looked a mile deep.'],['💭','Thought','What if I belly-flop?']];
const TALK=[['🧒','“Coach, my legs won’t move.”','feel'],['👋','“Hi, Coach.” “Hi, Zara.”','fill'],['🧑‍🏫','“Look at the far wall, not the crowd,” said Coach.','plot'],['🌤️','“Nice weather today.”','fill'],['🧒','“Okay. Three… two… one…”','plot'],['🍞','“Did you eat breakfast?” “Yes.”','fill']];
const GAPS=[[['After breakfast,','ok'],['Suddenly,','sud'],['Then,','then']],[['Twenty minutes later,','ok'],['Meanwhile,','mean'],['Then,','then']],[['That evening,','ok'],['Suddenly,','sud'],['A year ago,','back']]];
const ENDS=[['Zara’s problem: scared to dive.',[['She climbed out, grinning. Next time she would not wait so long.','ok'],['Then she woke up. It was all a dream.','dream'],['Suddenly a shark swam into the pool!','newp'],['She went home and had tea.','flat']]],
 ['Tom’s problem: his dog ran off in the park.',[['Biscuit bounded out of the bushes, and Tom hugged him so hard he squeaked.','ok'],['Tom went home. The end.','flat'],['Then a storm started and the park flooded.','newp'],['It was all a dream.','dream']]]];
VIS.reg('flagpace',c=>{let A,pad,quiz,qn=-1,row=0;
const P={tok:0,want:()=>{},sc:[0,0,0,0,0],read:0,ok0:0,lines:[],kinds:new Set(),talk:[],gap:0,link:[],e:0,won:0,bad:-1,flash:''};
const stage=()=>['pace','slow','talk','links','end','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function put(g,s,x,y,n,o={}){g.font=`${o.w||600} ${sz(n)}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-16)}
function wrap(g,s,x,y,maxW,n,lh,o={}){g.font=`${o.w||600} ${sz(n)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxW&&cur){out.push(cur);cur=w}else cur=t});out.push(cur);
 out.forEach((l,i)=>put(g,l,x,y+i*lh,n,{...o,max:maxW}));return out.length}
function panel(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=lw||1.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,10);g.stroke()}
const rowY=i=>A.H*(.05+i*.172),rowH=()=>A.H*.15;
const KCOL=k=>({Action:A.col.or,Speech:A.col.cy,Thought:A.col.vi,Sense:A.col.gr,Tell:A.col.rd})[k];
function draw(A){const{ctx:g,W,H,col:C}=A,s=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(s==='quiz'){put(g,'Slow the moments that matter.',W/2,H*.38,16,{w:800});put(g,'Skip the rest. End on the problem.',W/2,H*.56,14);return}
 if(s==='pace'){BEATS.forEach((b,i)=>{const y=rowY(i),h=rowH(),w=P.sc[i]?W-20:W*.42,bad=P.bad===i;panel(g,10,y,w,h,A.alpha(P.sc[i]?C.vi:C.cy,P.sc[i]?.2:.1),bad?C.rd:C.tx,bad?3.5:1.5);
   put(g,b[0],30,y+h/2,18);if(P.sc[i])wrap(g,b[1],52,y+h*.36,w-110,11,sz(13),{a:'left',w:700});else{put(g,b[3],52,y+h*.36,11,{a:'left',w:700,max:w-50});put(g,'summary',52,y+h*.7,10,{a:'left',w:600})}
   put(g,P.sc[i]?'SCENE':'',W-48,y+h/2,10,{w:800})});put(g,'Scenes: '+P.sc.filter(Boolean).length+' (tap a bar to switch)',W/2,H*.92,11,{w:700})}
 if(s==='slow'){panel(g,10,8,W-20,H*.13,A.alpha(C.vi,.14));put(g,'🧍 On the diving block (slow motion)',W/2,8+H*.065,13,{w:800});
  let y=H*.19;P.lines.forEach(([e,k,t])=>{const h=H*.15;panel(g,10,y,W-20,h,A.alpha(KCOL(k),.16),C.tx);put(g,e+' '+k,16,y+h*.28,10,{a:'left',w:800});wrap(g,t,16,y+h*.62,W-40,11,sz(13),{a:'left'});y+=h+5});
  if(P.flash)wrap(g,P.flash,W/2,H*.86,W-30,11,sz(13),{w:700,c:C.tx});put(g,'Lines '+P.lines.length+' of 4 · kinds '+P.kinds.size+' of 3+',W/2,H*.96,11,{w:700})}
 if(s==='talk'){let y=H*.05;put(g,'Zara and Coach, by the pool',W/2,y+8,13,{w:800});y+=H*.09;P.talk.forEach(k=>{const[e,t]=TALK[k],h=H*.17;panel(g,10,y,W-20,h,A.alpha(C.cy,.14));put(g,e,30,y+h/2,18);wrap(g,t,52,y+h*.34,W-76,11,sz(14),{a:'left',w:700});y+=h+6});
  if(P.bad>=0){const h=H*.15;panel(g,10,y,W-20,h,A.alpha(C.rd,.1),C.rd,3);put(g,'✂',30,y+h/2,18);wrap(g,TALK[P.bad][1],52,y+h*.4,W-76,11,sz(14),{a:'left'})}
  put(g,'Lines that do a job: '+P.talk.length+' of 3',W/2,H*.95,11,{w:700})}
 if(s==='links'){const n=BEATS.length-1,parts=[0,1,2,4];let y=H*.04;parts.forEach((bi,j)=>{const h=H*.13;panel(g,10,y,W-20,h,A.alpha(C.cy,.1));put(g,BEATS[bi][0],30,y+h/2,16);put(g,BEATS[bi][1].replace(/^She /,'she '),52,y+h/2,11,{a:'left',max:W-70});y+=h+4;
   if(j<3){const h2=H*.09,cur=P.gap===j,bad=cur&&P.bad>=0;panel(g,W*.18,y,W*.64,h2,A.alpha(P.link[j]?C.gr:C.or,cur?.25:.1),bad?C.rd:C.tx,bad||cur?3:1.5);
    put(g,P.link[j]||(cur?'which time phrase?':'…'),W/2,y+h2/2,12,{w:800});y+=h2+4}});void n;
  put(g,'Links: '+P.link.length+' of 3',W/2,H*.96,11,{w:700})}
 if(s==='end'){const[prob]=ENDS[P.e%2];panel(g,10,10,W-20,H*.2,A.alpha(C.or,.16));put(g,'⚠️ Problem',W/2,10+H*.06,12,{w:800});wrap(g,prob,W/2,10+H*.13,W-40,12,sz(14),{w:700});
  const ax=W*.12,ay=H*.62;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(ax,ay);g.quadraticCurveTo(W/2,H*.14,W*.88,ay);g.stroke();put(g,'start',ax,ay+14,10);put(g,'problem',W/2,H*.32,10,{w:700});put(g,P.won>P.e?'✅ solved':'ending?',W*.88,ay+14,10,{w:800});
  if(P.flash)wrap(g,P.flash,W/2,H*.76,W-30,11,sz(13),{w:700});put(g,'Endings that answer: '+P.won+' of 2',W/2,H*.95,11,{w:700})}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);A.redraw()},good=t=>{A.sound.pop();speak(t);buttons();A.redraw();P.want()};
function flip(i){if(P.ok0)return;P.sc[i]=P.sc[i]?0:1;P.bad=-1;A.sound.tick();speak(BEATS[i][0]+(P.sc[i]?' is now a scene.':' is now a summary.'));buttons();A.redraw()}
function readIt(){if(P.ok0)return;const wrong=BEATS.findIndex((b,i)=>!!P.sc[i]!==!!b[2]);
 if(wrong<0){P.ok0=1;P.bad=-1;return good('Paced! The problem and the dive are slow scenes; the rest are quick summaries.')}
 P.bad=wrong;nope(P.sc.every(Boolean)?'Every event is a scene, so nothing stands out. '+WHY0[wrong]:P.sc.every(v=>!v)?'All summary reads like a list. '+WHY0[wrong]:WHY0[wrong])}
function addTool(k){if(P.lines.length>=4&&P.kinds.size>=3)return;const[e,kind,t]=TOOLS[k];
 if(kind==='Tell'){P.flash='“Zara was very scared” names the feeling. Show it with an action, words, a thought or a sense.';return nope(P.flash)}
 const last=P.lines[P.lines.length-1];if(last&&last[1]===kind){P.flash=`Two ${kind.toLowerCase()} lines in a row. Mix in a different kind.`;return nope(P.flash)}
 if(P.lines.some(l=>l[2]===t))return;if(P.lines.length>=4)P.lines.shift();P.lines.push([e,kind,t]);P.kinds=new Set(P.lines.map(l=>l[1]));P.flash='';
 if(P.lines.length>=4&&P.kinds.size>=3)return good('Slow motion: four lines that mix kinds. The reader feels the freeze.');A.sound.tick();speak(kind+' added.');buttons();A.redraw()}
function say2(k){if(P.talk.length>=3||P.talk.includes(k))return;const[,t,job]=TALK[k];
 if(job==='fill'){P.bad=k;return nope('Real people say this, but it does no job in a story. Cut it.')}
 P.bad=-1;P.talk.push(k);if(P.talk.length>=3)return good('Every line shows a feeling or moves the action.');A.sound.tick();speak(job==='feel'?'That line shows how Zara feels.':'That line moves the action on.');buttons();A.redraw()}
function link(j){if(P.gap>=3)return;const[w,tag]=GAPS[P.gap][j];
 if(tag!=='ok'){P.bad=j;return nope(tag==='sud'?'“Suddenly” is for surprises. Nothing surprising happens here.':tag==='then'?'“Then” works, but it does not tell the reader how much time passed.':tag==='mean'?'“Meanwhile” jumps to something else at the same time. Here time moves on.':'“A year ago” jumps backwards. This story moves forwards.')}
 P.bad=-1;P.link.push(w);P.gap++;if(P.gap>=3)return good('Each link tells the reader how much time jumped.');A.sound.tick();speak('Linked with “'+w+'”');buttons();A.redraw()}
function endIt(j){if(P.won>=2||P.won>P.e)return;const[,opts]=ENDS[P.e%2],tag=opts[j][1];
 if(tag!=='ok'){P.flash=tag==='dream'?'“It was all a dream” cancels the story. The reader wants the problem answered.':tag==='newp'?'A brand-new problem leaves the first one unsolved.':'It stops, but it never says what happened to the problem.';return nope(P.flash)}
 P.won++;P.flash='That ending answers the problem.';if(P.won<2){const t=P.tok;setTimeout(()=>{if(t===P.tok){P.e++;P.flash='';buttons();A.redraw()}},A.reduced()?20:800)}good('Yes! That ending answers the problem and shows how the character feels.')}
function buttons(){if(!pad)return;pad.innerHTML='';const s=stage(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=f};
 if(s==='pace'&&!P.ok0){BEATS.forEach((b,i)=>K(b[0]+(P.sc[i]?' Scene':' Summary'),()=>flip(i),`${b[1]} Now a ${P.sc[i]?'scene':'summary'}. Switch it`));K('✔ Read it',readIt,'Read the story and check the pacing')}
 if(s==='slow'&&!(P.lines.length>=4&&P.kinds.size>=3))TOOLS.forEach(([e,k,t],i)=>K(e+' '+t,()=>addTool(i),k+': '+t));
 if(s==='talk'&&P.talk.length<3)TALK.forEach(([e,t],k)=>{if(!P.talk.includes(k))K(t,()=>say2(k))});
 if(s==='links'&&P.gap<3)GAPS[P.gap].forEach(([w],j)=>K(w,()=>link(j)));
 if(s==='end'&&P.won<2&&P.won<=P.e)ENDS[P.e%2][1].forEach(([w],j)=>K(w,()=>endIt(j)))}
function down(p){const s=stage();if(s==='pace')BEATS.forEach((b,i)=>{if(p.y>rowY(i)&&p.y<rowY(i)+rowH()&&p.x>10&&p.x<A.W-10)flip(i)});return false}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++P.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===P.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const clear=()=>{P.tok++;Object.assign(P,{want:()=>{},sc:[0,0,0,0,0],read:0,ok0:0,lines:[],kinds:new Set(),talk:[],gap:0,link:[],e:0,won:0,bad:-1,flash:''})};
const steps=[
{h:'Scene or summary?',p:'A story speeds up and slows down. Tap a bar to make it a slow scene or a quick summary. Then tap Read it.',
 predict:{q:'Which part of Zara’s story should get the most words?',opts:['The start, so the reader knows everything','The moment she freezes on the block'],ans:1},task:'Pace the story so it reads well',
 show:()=>{steps[0].go();play([()=>flip(2),()=>flip(3),readIt],400)},
 go:()=>{clear();speak('Five events. Which ones deserve a slow scene?');buttons();P.want=fin(0,()=>P.ok0,'Slow down where the problem and the turning point are. Summarise the rest.')}},
{h:'Build the slow moment',p:'Zara freezes. Build four lines. Mix action, speech, thought and senses. Do not use two of one kind in a row.',task:'Build 4 lines with 3+ kinds',
 show:()=>{steps[1].go();play([0,1,3,2].map(k=>()=>addTool(k)),380)},
 go:()=>{clear();speak('Build the moment Zara freezes, line by line.');buttons();P.want=fin(1,()=>P.lines.length>=4&&P.kinds.size>=3,'Action, speech, thought and senses together put the reader on the block.')}},
{h:'Dialogue with a job',p:'Pick lines for Zara and Coach. Each line must show a feeling or move the action.',
 predict:{q:'Should story dialogue include “hello” and “how are you”, like real talk?',opts:['Yes, it sounds real','No, each line needs a job'],ans:1},task:'Keep 3 lines that do a job',
 show:()=>{steps[2].go();play([()=>say2(0),()=>say2(2),()=>say2(4)],380)},
 go:()=>{clear();speak('Choose dialogue for Zara and Coach.');buttons();P.want=fin(2,()=>P.talk.length>=3,'Story dialogue skips small talk. It shows feelings or pushes the plot on.')}},
{h:'Jump the gaps',p:'Link the events. Pick a time phrase that fits each gap.',task:'Link all 3 gaps',
 show:()=>{steps[3].go();play([()=>link(0),()=>link(0),()=>link(0)],380)},
 go:()=>{clear();speak('Pick a time phrase for the first gap.');buttons();P.want=fin(3,()=>P.gap>=3,'Time phrases show the reader how far the story jumped.')}},
{h:'End on the problem',p:'A good ending answers the problem from the middle. Pick the ending for each story.',task:'Pick 2 endings that answer the problem',
 show:()=>{steps[4].go();play([()=>endIt(0),()=>{},()=>{},()=>endIt(0)],380)},
 go:()=>{clear();speak('Read the problem, then pick the ending.');buttons();P.want=fin(4,()=>P.won>=2,'The ending solves the problem and shows how the character feels now.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.want()});
const QS=[['A story about a lost dog. Which part deserves a slow scene?',[['The moment Tom sees the empty lead','ok'],['Tom putting on his shoes','start'],['The walk to the park','trip']]],
 ['Which dialogue line does a job?',[['“Stay back from the edge!” Mum shouted.','ok'],['“Hello.” “Hello.”','hello'],['“Nice day.” “Yes, it is.”','chat']]],
 ['The bus ride, then the race. Which link fits best?',[['Twenty minutes later,','ok'],['Suddenly,','sudden'],['Then,','then']]],
 ['Zara is scared to dive. Which ending is best?',[['She swims, climbs out grinning, and wants another go','ok'],['It was all a dream','dream'],['A shark appears!','newprob']]],
 ['A slow-motion moment should mix…',[['Action, speech, thoughts and senses','ok'],['Five actions in a row','same'],['Just the words “she was scared”','tell']]],
 ['Why summarise the bus ride in one line?',[['Nothing changes there, so the reader gets to the problem sooner','ok'],['Summaries are always lazy','lazy'],['Readers want every detail','every']]]];
function fix(t){let m='Slow down at the problem, link with clear time phrases, keep only dialogue that works, and end by answering the problem.';
 if(t==='start')m='Shoes change nothing. Summarise them and slow down when the dog is gone.';
 if(t==='trip')m='The walk is before the problem. One line is enough.';
 if(t==='hello')m='Hellos are real, but they do no job. Cut them.';
 if(t==='chat')m='Weather chat shows no feeling and moves nothing. Cut it.';
 if(t==='sudden')m='A bus ride is not a surprise. Save “Suddenly” for the unexpected.';
 if(t==='then')m='“Then” does not say how much time passed. A time phrase does.';
 if(t==='dream')m='A dream ending cancels everything. Answer the problem instead.';
 if(t==='newprob')m='A new problem at the end leaves the first one unsolved.';
 if(t==='same')m='Five actions in a row read like a list. Mix in speech, a thought or a sense.';
 if(t==='tell')m='Naming the feeling tells it. Show it: curled toes, a whisper, a racing thought.';
 if(t==='lazy')m='A summary is a choice: it speeds past what does not matter.';
 if(t==='every')m='Every detail everywhere is slow and flat. Spend words where the story changes.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});speak('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Right! In a row: '+row+'.':'✗ '+fix(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down});buttons()}});
A.start()})})();
