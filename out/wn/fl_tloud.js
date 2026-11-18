/* Flagship – thinking aloud (ages 8–9): switch on Sam's "thinking voice" to hear the steps behind a wrong answer and
   tap the step that slipped; put Ava's plan → how → do → check thoughts in order; sort useful think-aloud talk from
   talk that hides the steps; catch the slip in three spoken workings (maths, spelling, reading); and match sentence
   starters to the moments of a task (before, during, stuck, after).
   The Challenge targets the usual beliefs: thinking aloud is about speed, saying the answer is enough, "I'm bad at
   this" counts as thinking aloud, and only teachers do it. Every drag has a button twin. */
(()=>{
const SAM=['I need the total number of pens.','There are 3 packs, with 4 pens in each pack.','So I will add 4 and 3. That makes 7.','Done. The answer is 7 pens.'];
const SAM_SLIP=2,SAM_WHY=['That step is fine: he knows what he is finding.','That step is fine: 3 packs of 4 is the right picture.','','That is where he stops, but the slip came one step before.'];
const AVA=['What am I finding? How many each.','I will deal them out, one at a time.','1, 2, 3 … that is 4 rounds, so 4 each.','Does it work? 3 lots of 4 is 12. Yes!'];
const AVA_TAG=['Plan','How','Do','Check'],AVA_MIX=[2,0,3,1];
const AVA_NO=['Plan first: say what you are trying to find before anything else.','Next say how you will do it, before you start dealing.','You cannot count the rounds until you have planned how.','You can only check once you have an answer.'];
const TALK=[['First I will find what the question asks.',1,'Yes: it says the plan out loud.'],['Um … done!',0,'It is out loud, but it hides every step.'],
 ['That looks too big, so I will check it.',1,'Yes: noticing and checking is great thinking aloud.'],['I am rubbish at this.',0,'A feeling is not a step. Say what you know and what you will try.'],
 ['I am stuck on this word, so I will read on.',1,'Yes: it names the problem and a fix.'],['I just know it.',0,'Nobody can check "I just know". Say how you know.']];
const SLIPS=[{t:'52 − 17',s:['Ones first: 2 take away 7.','I can\'t, so I will do 7 take 2. That is 5.','Tens: 5 take 1 is 4. So 45.'],k:1,fix:'Swap slip! Exchange a ten: 12 − 7 = 5, then 4 − 1 = 3. So 35.'},
 {t:'hop + ing',s:['Hop has a short o, then one p.','So I do not need to double the p.','h-o-p-i-n-g.'],k:1,fix:'Short vowel and one consonant: double it. hopping.'},
 {t:'"Tom grabbed his coat and umbrella."',s:['Tom took a coat and an umbrella.','So it must be sunny and hot.','I will read on to see if I am right.'],k:1,fix:'A coat and an umbrella are clues for rain, not sun.'}];
const WHEN=['Before I start','While I work','When I am stuck','When I finish'];
const CARDS=['First, I will …','So far I have …','This is tricky, so I will try …','To check, I will …'],CARD_MIX=[3,1,0,2];
const CARD_NO=['"First" is for planning, before you start.','"So far" is a progress report, while you work.','"Tricky, so I will try" is a fix-up for when you are stuck.','"To check" fits when you have an answer to test.'];
VIS.reg('flagtloud',c=>{let A,ctl,chal,qi=-1,streak=0;const S={};
const stage=()=>['reveal','order','sort','catch','start','quiz'][A.step];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
/* wrapped canvas text: returns the number of lines used */
function wrap(g,t,x,y,maxW,px,opt){const o=opt||{};g.font=`${o.wt||600} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.fillStyle=o.col||A.col.tx;g.textAlign=o.al||'left';g.textBaseline='middle';
 const out=[];let line='';t.split(' ').forEach(w=>{const tryL=line?line+' '+w:w;if(g.measureText(tryL).width>maxW&&line){out.push(line);line=w}else line=tryL});out.push(line);
 const lh=px*1.25;out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*lh));return out.length}
function bubble(g,r,t,tone,px){const C=A.col,f=tone==='bad'?C.rd:tone==='good'?C.gr:tone==='hide'?C.mu:tone==='pick'?C.or:C.cy;
 g.fillStyle=A.alpha(f,tone==='hide'?.08:.16);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=tone==='pick'?3.5:2;g.strokeStyle=tone==='hide'?C.mu:C.tx;
 if(tone==='hide')g.setLineDash([6,5]);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([]);
 wrap(g,t,r.x+12,r.y+r.h/2,r.w-24,px||14,{col:C.tx})}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const head=(g,t)=>wrap(g,t,A.W/2,A.H*.055,A.W-20,15,{wt:800,al:'center'});
/* geometry for each stage */
const samR=i=>({x:12,y:A.H*(.19+i*.15),w:A.W-24,h:A.H*.13});
const slotR=i=>({x:A.W*.24,y:A.H*(.12+i*.11),w:A.W*.76-12,h:A.H*.095});
const trayR=j=>({x:12,y:A.H*(.6+j*.1),w:A.W-24,h:A.H*.085});
const talkR=()=>({x:20,y:A.H*.13,w:A.W-40,h:A.H*.22});
const binR=k=>({x:k?A.W/2+6:12,y:A.H*.56,w:A.W/2-18,h:A.H*.4});
const slipR=i=>({x:12,y:A.H*(.15+i*.17),w:A.W-24,h:A.H*.15});
const whenR=i=>({x:12,y:A.H*(.11+i*.115),w:A.W-24,h:A.H*.1});
const cardR=j=>({x:12,y:A.H*(.6+j*.095),w:A.W-24,h:A.H*.08});
/* ---- drawing ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,st=stage();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(st==='quiz'){head(g,'Plan → do → check, out loud.');['💭 Plan','🗣️ Do','✅ Check'].forEach((t,i)=>bubble(g,{x:W*.12,y:H*(.25+i*.22),w:W*.76,h:H*.16},t,i===2?'good':'',17));return}
 if(st==='reveal'){head(g,'3 packs of 4 pens. How many pens?');wrap(g,`Sam's answer: 7 pens ${S.found?'✗':'?'}`,W/2,H*.13,W-20,15,{wt:800,al:'center',col:S.found?C.rd:C.tx});
  SAM.forEach((t,i)=>bubble(g,samR(i),i<S.heard?`${i+1}. ${t}`:`Tap to hear thought ${i+1}`,i>=S.heard?'hide':S.found&&i===SAM_SLIP?'bad':S.wrong===i?'pick':'',14));
  wrap(g,S.found?'4 + 4 + 4 = 12 pens. We found it because Sam said it.':S.heard<4?'Sam is thinking aloud. Hear each thought.':'Tap the thought where Sam slipped.',W/2,H*.86,W-24,14,{wt:700,al:'center',col:S.found?C.gr:C.tx});return A.fx.draw(g)}
 if(st==='order'){head(g,'Share 12 sweets between 3 friends.');
  AVA_TAG.forEach((tg,i)=>{const r=slotR(i);wrap(g,`${i+1} ${tg}`,12,r.y+r.h/2,A.W*.24-16,13,{wt:800});if(i<S.placed.length)bubble(g,r,AVA[i],'good',13);else bubble(g,r,i===S.placed.length?'Drop the next thought here':'',i===S.placed.length?'pick':'hide',12)});
  AVA_MIX.forEach((a,j)=>{if(S.placed.includes(a))return;let r=trayR(j);if(S.drag&&S.drag.a===a&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};bubble(g,r,AVA[a],S.wrong===a?'bad':'',13)});
  if(S.placed.length>=4)wrap(g,'Plan, how, do, check: the order good thinkers say it.',W/2,H*.7,W-24,15,{wt:800,al:'center',col:C.gr});return A.fx.draw(g)}
 if(st==='sort'){head(g,S.k<TALK.length?`Does this help? (${S.k+1} of ${TALK.length})`:'All sorted!');
  if(S.k<TALK.length){let r=talkR();if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};bubble(g,r,`“${TALK[S.k][0]}”`,'pick',16)}
  wrap(g,S.note||'',W/2,H*.44,W-24,13,{wt:700,al:'center',col:S.noteOk?C.gr:C.rd});
  ['Helps: says what or why','Doesn\'t help'].forEach((t,k)=>{const r=binR(k);bubble(g,{...r,h:r.h},'',k?'':'good');wrap(g,t,r.x+r.w/2,r.y+22,r.w-12,13,{wt:800,al:'center'});
   S.bins[k].forEach((n,j)=>wrap(g,'• '+TALK[n][0],r.x+8,r.y+50+j*Math.min(30,(r.h-56)/3),r.w-14,10.5,{wt:500}))});return A.fx.draw(g)}
 if(st==='catch'){const R=SLIPS[Math.min(S.r,2)];head(g,S.r<3?`Round ${S.r+1}: ${R.t}`:'Three slips caught!');
  if(S.r<3)R.s.forEach((t,i)=>bubble(g,slipR(i),`${i+1}. ${t}`,S.wrong===i?'bad':'',14));
  if(S.fix)bubble(g,{x:12,y:H*.68,w:W-24,h:H*.2},'✓ '+S.fix,'good',14);return A.fx.draw(g)}
 if(st==='start'){head(g,'Match each starter to its moment.');
  WHEN.forEach((w,i)=>{const r=whenR(i),got=S.match[i];bubble(g,r,'',got!=null?'good':'hide');wrap(g,w,r.x+10,r.y+r.h/2,r.w*.38,13,{wt:800});
   if(got!=null)wrap(g,CARDS[got],r.x+r.w*.42,r.y+r.h/2,r.w*.56,13,{wt:600})});
  const nx=CARD_MIX.find(n=>!S.match.includes(n));
  CARD_MIX.forEach((n,j)=>{if(S.match.includes(n))return;let r=cardR(j);if(S.drag&&S.drag.n===n&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};bubble(g,r,CARDS[n],S.wrong===n?'bad':n===nx?'pick':'',13)});
  if(nx==null)wrap(g,'Now you have words for every part of a task.',W/2,H*.72,W-24,15,{wt:800,al:'center',col:C.gr});return A.fx.draw(g)}}
/* ---- actions ---- */
const blink=k=>{setTimeout(()=>{S.wrong=-1;A.redraw()},A.reduced()?10:900)};
function hear(){if(stage()!=='reveal'||S.heard>=4)return;voice(`Sam thinks: ${SAM[S.heard]}`);S.heard++;A.sound.pop();A.redraw();pads();S.check()}
function blame(i){if(stage()!=='reveal'||S.heard<4||S.found)return;
 if(i!==SAM_SLIP){S.wrong=i;A.sound.miss();voice(SAM_WHY[i]);blink();return A.redraw()}
 S.found=1;A.sound.pop();voice('Yes! He added 4 and 3, but 3 packs of 4 is 4 + 4 + 4 = 12. Thinking aloud let us find the exact step.');A.redraw();pads();S.check()}
function putNext(a){if(stage()!=='order'||S.placed.includes(a))return;const want=S.placed.length;
 if(a!==want){S.wrong=a;A.sound.miss();voice(AVA_NO[want]);blink();return A.redraw()}
 S.placed.push(a);A.sound.pop();voice(`${AVA_TAG[a]}: ${AVA[a]}`);A.redraw();pads();S.check()}
function judge(k){if(stage()!=='sort'||S.k>=TALK.length)return;const[t,help,why]=TALK[S.k],ok=(k===0)===!!help;
 S.noteOk=ok;S.note=ok?why:(help?'This one helps: ':'This one does not help: ')+why;
 if(!ok){A.sound.miss();voice(S.note);return A.redraw()}
 S.bins[k].push(S.k);S.k++;A.sound.pop();voice(why);A.redraw();pads();S.check()}
function catchIt(i){if(stage()!=='catch'||S.r>=3)return;const R=SLIPS[S.r];
 if(i!==R.k){S.wrong=i;A.sound.miss();voice(`Thought ${i+1} is fine. Listen again: which step does not make sense?`);blink();return A.redraw()}
 S.fix=R.fix;S.r++;S.wrong=-1;A.sound.pop();voice(R.fix);A.redraw();pads();S.check()}
function fit(n,i){if(stage()!=='start'||S.match.includes(n)||S.match[i]!=null)return;
 if(n!==i){S.wrong=n;A.sound.miss();voice(CARD_NO[n]);blink();return A.redraw()}
 S.match[i]=n;A.sound.pop();voice(`${WHEN[i]}: “${CARDS[n]}”`);A.redraw();pads();S.check()}
function pads(){if(!ctl)return;ctl.innerHTML='';const st=stage(),add=(t,fn,lab)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},ctl,t);b.onclick=fn};
 if(st==='reveal'){if(S.heard<4)add(`Hear thought ${S.heard+1}`,hear,'Hear Sam\'s next thought');else if(!S.found)SAM.forEach((t,i)=>add(`Thought ${i+1}`,()=>blame(i),`Sam slipped at thought ${i+1}: ${t}`))}
 if(st==='order')AVA_MIX.forEach(a=>{if(!S.placed.includes(a))add(AVA[a],()=>putNext(a),`Put next: ${AVA[a]}`)});
 if(st==='sort'&&S.k<TALK.length){add('Helps',()=>judge(0),'This talk helps');add('Doesn\'t help',()=>judge(1),'This talk does not help')}
 if(st==='catch'&&S.r<3)SLIPS[S.r].s.forEach((t,i)=>add(`Thought ${i+1}`,()=>catchIt(i),`The slip is thought ${i+1}: ${t}`));
 if(st==='start'){const nx=CARD_MIX.find(n=>!S.match.includes(n));if(nx!=null)WHEN.forEach((w,i)=>{if(S.match[i]==null)add(w,()=>fit(nx,i),`Put “${CARDS[nx]}” at: ${w}`)})}}
/* ---- pointer ---- */
function press(p){const st=stage();
 if(st==='reveal'){if(S.heard<4){if(inR(p,samR(S.heard)))hear()}else SAM.forEach((t,i)=>{if(inR(p,samR(i)))blame(i)});return false}
 if(st==='order'){const a=AVA_MIX.find((a,j)=>!S.placed.includes(a)&&inR(p,trayR(j)));if(a!=null){S.drag={a,x:null,y:null,sx:p.x,sy:p.y};return true}return false}
 if(st==='sort'&&S.k<TALK.length){if(inR(p,talkR())){S.drag={x:null,y:null,sx:p.x,sy:p.y};return true}[0,1].forEach(k=>{if(inR(p,binR(k)))judge(k)});return false}
 if(st==='catch'&&S.r<3){[0,1,2].forEach(i=>{if(inR(p,slipR(i)))catchIt(i)});return false}
 if(st==='start'){const n=CARD_MIX.find((n,j)=>!S.match.includes(n)&&inR(p,cardR(j)));if(n!=null){S.drag={n,x:null,y:null,sx:p.x,sy:p.y};return true}return false}
 return false}
function slide(p){const d=S.drag;if(d&&(d.x!=null||Math.abs(p.x-d.sx)+Math.abs(p.y-d.sy)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function lift(p){const d=S.drag,st=stage();S.drag=null;if(!d)return;
 if(st==='order'){if(d.x==null||p.y<A.H*.57)putNext(d.a);else A.redraw()}
 if(st==='sort'){if(d.x!=null&&p.y>A.H*.5)judge(p.x<A.W/2?0:1);else{voice('Drag the words into a box, or tap Helps or Doesn\'t help.');A.redraw()}}
 if(st==='start'){const i=WHEN.findIndex((w,i)=>inR(p,whenR(i)));if(d.x!=null&&i>=0)fit(d.n,i);else{if(d.x==null)voice(`Drag “${CARDS[d.n]}” up to its moment.`);A.redraw()}}}
function fresh(){const v=(S.v||0)+1;for(const k in S)delete S[k];Object.assign(S,{v,check:()=>{},heard:0,found:0,wrong:-1,placed:[],k:0,bins:[[],[]],note:'',noteOk:0,r:0,fix:'',match:[null,null,null,null],drag:null})}
function play(list,ms){const v=++S.v;list.forEach((f,j)=>setTimeout(()=>{if(S.v===v)f()},A.reduced()?30*(j+1):ms*(j+1)))}
const when=(n,test,msg)=>()=>{if(A.step!==n||!test())return;if(steps[n].predict&&A.pred[n]==null)return;A.done(msg+A.reveal(n))};
const steps=[
{h:'Hear the hidden steps',p:'Sam wrote 7, but that is wrong. Switch on his thinking voice. Then find the step where he slipped.',predict:{q:'Can you tell what went wrong from the answer 7 alone?',opts:['No, I need to hear his steps','Yes, easily'],ans:0},task:'Find Sam\'s slip',
 show:()=>{steps[0].go();play([hear,hear,hear,hear,()=>blame(SAM_SLIP)],360)},
 go:()=>{fresh();voice('Sam wrote 7 pens. Tap to hear his first thought.');pads();S.check=when(0,()=>S.found,'An answer alone hides the thinking. Said aloud, each step can be checked.')}},
{h:'Plan, do, check',p:'Ava thinks aloud as she shares 12 sweets. Put her thoughts in the order she would say them.',task:'Put all 4 thoughts in order',
 show:()=>{steps[1].go();play([0,1,2,3].map(a=>()=>putNext(a)),420)},
 go:()=>{fresh();voice('Drag the first thing Ava would say into slot 1.');pads();S.check=when(1,()=>S.placed.length>=4,'Good thinking aloud plans, says how, does it, then checks.')}},
{h:'Useful talk',p:'Thinking aloud means saying what you are doing and why. Sort the talk: does it help or not?',predict:{q:'Is "Um … done!" good thinking aloud?',opts:['No, it hides the steps','Yes, it is said out loud'],ans:0},task:'Sort all 6',
 show:()=>{steps[2].go();play(TALK.map(([,h])=>()=>judge(h?0:1)),380)},
 go:()=>{fresh();voice(`Does this help? ${TALK[0][0]}`);pads();S.check=when(2,()=>S.k>=TALK.length,'Useful talk names a step, a reason, a problem or a check.')}},
{h:'Catch the slip',p:'Three children think aloud. Each says one step that does not make sense. Tap it.',predict:{q:'Why can we spot these slips?',opts:['Their thinking is out loud','They wrote neat answers','We guessed'],ans:0},task:'Catch 3 slips',
 show:()=>{steps[3].go();play(SLIPS.map(R=>()=>catchIt(R.k)),520)},
 go:()=>{fresh();voice(`Round 1: ${SLIPS[0].t}. Tap the step that slipped.`);pads();S.check=when(3,()=>S.r>=3,'When thinking is out loud, you and others can catch a slip at the exact step.')}},
{h:'Words to start with',p:'Match each starter to the moment you would say it: before, while working, stuck, or at the end.',predict:{q:'You are stuck. What is best to say aloud?',opts:['This is tricky, so I will try …','Nothing, just guess'],ans:0},task:'Match all 4 starters',
 show:()=>{steps[4].go();play(CARD_MIX.map(n=>()=>fit(n,n)),420)},
 go:()=>{fresh();voice('Drag each starter up to its moment, or tap a moment button.');pads();S.check=when(4,()=>S.match.every(x=>x!=null),'Starters give you words for planning, checking progress, getting unstuck and checking.')}},
{h:'Challenge',p:'',go:()=>{fresh();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const BANK=[['Why think aloud while you work?',[['So people can hear the steps and spot slips','ok'],['To finish faster','fast'],['So you can say the answer louder','answer']]],
 ['Which is the best think-aloud?',[['"I need the total, so I will add the groups."','ok'],['"Done!"','answer'],['"I am bad at maths."','feel']]],
 ['Mia is stuck. What should she say aloud?',[['"I know the start. Next I will try a drawing."','ok'],['"I give up."','feel'],['Nothing: only teachers think aloud.','teacher']]],
 ['Ravi says: "6 × 5 … 6 + 5 = 11." What does his think-aloud show?',[['He added when he needed to multiply','ok'],['He is right','missed'],['He talks too much','fast']]],
 ['When do you say your check aloud?',[['After you have an answer','ok'],['Before you start','order'],['Never: checking wastes time','fast']]],
 ['Your teacher thinks aloud while she solves a problem. Why?',[['To show the hidden steps you can use','ok'],['Because she forgot the answer','teacher'],['To fill the time','fast']]]];
function why(tag){let m='Look for the choice that makes the steps easy to hear and check.';
 if(tag==='fast')m='Thinking aloud is not about speed. It makes each step easy to hear and check.';
 if(tag==='answer')m='Saying only the answer hides the steps. Say what you are doing and why.';
 if(tag==='feel')m='Feelings matter, but "I am bad at this" gives no step to check. Say what you know and what you will try.';
 if(tag==='teacher')m='Anyone can think aloud. Teachers do it to show their steps; you do it to plan, check and get help.';
 if(tag==='missed')m='Listen again: 6 lots of 5 is 30. His words show he added instead.';
 if(tag==='order')m='You can only check once you have an answer. Plan first, check last.';
 return m}
function quizNext(){qi++;const[q,opts]=BANK[qi%BANK.length],turn=(qi*2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');opts.slice(turn).concat(opts.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(tag)});voice('Challenge: '+q);A.redraw()}
function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.64,tall:1.45,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:lift});pads()}});
A.start()})})();
