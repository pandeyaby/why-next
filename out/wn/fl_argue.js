/* Flagship: persuasive (argument) writing (topic "Persuasive Writing"; ages 11-14; CCSS W.6-8.1 and KS3 English
   writing: claim, reasons, relevant evidence, acknowledging and rebutting a counterclaim, linking words, formal
   style, concluding statement). The learner builds a five-paragraph argument for "Schools should start at 9:30":
   pick the claim, back each reason, answer the other side, join with connectives, make it formal, then order it. */
(()=>{
VIS.reg('flagargue',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['claim','evid','counter','link','formal','order','chal'][A.step];
const SLOTS=['Introduction: claim','Reason 1 + evidence','Reason 2 + evidence','Counterclaim + rebuttal','Conclusion'];
const ROUNDS={
 claim:[{slot:0,q:'Pick the claim for your opening paragraph.',o:[['Schools should start at 9:30 so that teenagers get enough sleep.','ok'],['Most schools in England start at about 8:45.','fact'],['Sleep is nice.','vague']]}],
 evid:[{slot:1,q:'Reason 1: teenage body clocks run later. Which evidence backs it up?',o:[['Sleep scientists find that body clocks shift up to two hours later in puberty.','ok'],['My cousin always stays up really late.','anec'],['Lots of people enjoy a lie-in.','popular']]},
  {slot:2,q:'Reason 2: tired students learn less. Which evidence backs it up?',o:[['When Seattle high schools started later, students slept about 34 minutes more and grades rose.','ok'],['Everyone knows tired people are grumpy.','everyone'],['Mornings are boring anyway.','opinion']]}],
 counter:[{slot:3,q:'Pick a fair counterclaim to answer.',o:[['Some argue a later start pushes clubs and part-time jobs into the evening.','ok'],['People who disagree are just lazy.','straw'],['Nobody could disagree with this.','none']]},
  {slot:3,add:1,q:'Now rebut it: answer the counterclaim.',o:[['However, clubs can move to lunchtime, and rested students get more done.','ok'],['But that is wrong.','bare'],['That is a good point, so maybe I am wrong.','concede']]}],
 link:[{slot:2,link:1,q:'Reason 2 adds to reason 1. Which word fills the gap?',o:[['Furthermore','ok'],['However','contrast'],['Therefore','result']]},
  {slot:3,link:1,q:'The rebuttal turns against the counterclaim. Which word fills the gap?',o:[['However','ok'],['Furthermore','add'],['Therefore','result']]},
  {slot:4,link:1,q:'The conclusion draws a result from the reasons. Which word fills the gap?',o:[['Therefore','ok'],['However','contrast'],['For example','example']]}],
 formal:[{slot:2,swap:1,q:'Make it formal: "Loads of kids are totally knackered in first lesson."',o:[['Many students are very tired in the first lesson.','ok'],['Loads of kids are well tired.','slang'],['I reckon kids are knackered, innit.','slang']]},
  {slot:4,q:'Pick a formal concluding statement.',o:[['In conclusion, a 9:30 start would help students sleep, learn and attend more.','ok'],['So yeah, start later, obviously!','informal'],['Also, school lunches should be longer.','newpoint']]}]};
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function wrap(t,x,y,w,px,lh,o){const g=A.ctx;g.font=`${(o&&o.w)||500} ${px}px system-ui,sans-serif`;let line='',n=0;
 t.split(' ').forEach(wd=>{const s=line?line+' '+wd:wd;if(g.measureText(s).width>w&&line){T(line,x,y+n*lh,px,{al:'left',w:(o&&o.w)||500,c:o&&o.c});n++;line=wd}else line=s});
 if(line){T(line,x,y+n*lh,px,{al:'left',w:(o&&o.w)||500,c:o&&o.c});n++}return n}
function cards(){const W=A.W,H=A.H,top=H*.1,gap=6,h=(H*.88-top-gap*4)/5;return SLOTS.map((t,i)=>({i,x:10,y:top+i*(h+gap),w:W-20,h}))}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),px=A.narrow?11:13;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Claim → reasons + evidence',W/2,H*.26,A.narrow?14:18,{w:900});T('→ counterclaim + rebuttal → conclusion',W/2,H*.42,A.narrow?13:16,{w:800});
  T('Furthermore adds · However turns · Therefore concludes',W/2,H*.6,A.narrow?11:14,{c:C.mu});T('Formal: no slang, no "I reckon"',W/2,H*.74,A.narrow?11:14,{c:C.mu});A.fx.draw(g);return}
 T(k==='order'?(S.done<5?'Tap the paragraphs in the order they go':'Argument in order!'):'Essay: "Schools should start at 9:30"',W/2,H*.05,A.narrow?12:15,{w:800});
 const cs=cards(),r=cur();
 (k==='order'&&S.done<5?S.shuf.map((si,p)=>({...cs[p],i:si})):cs).forEach(b=>{const on=k!=='order'&&r&&r.slot===b.i,placed=k==='order'&&S.placed.includes(b.i);
  g.fillStyle=A.alpha(placed?C.gr:on?C.ac:C.vi,on||placed?.2:.08);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=on?C.ac:A.alpha(C.tx,.5);g.lineWidth=on?3:1.5;g.stroke();
  let lab=SLOTS[b.i];if(placed)lab=(S.placed.indexOf(b.i)+1)+'. '+lab;T(lab,b.x+10,b.y+12,px,{al:'left',w:800,c:on?C.tx:C.mu});
  let tx=S.fill[b.i]||(k==='order'?S.full[b.i]:'');
  if(tx)wrap(tx,b.x+10,b.y+12+px*1.5,b.w-20,px,px*1.3,{c:C.tx});else T('…',b.x+18,b.y+b.h*.6,px,{al:'left',c:C.mu})});
 A.fx.draw(g)}
const FULL=['Schools should start at 9:30 so that teenagers get enough sleep.','Body clocks shift up to two hours later in puberty, so early starts fight biology.','When Seattle high schools started later, students slept about 34 minutes more and grades rose.','Some argue clubs would suffer. However, clubs can move to lunchtime.','In conclusion, a 9:30 start would help students sleep, learn and attend more.'];
function cur(){const rs=ROUNDS[kind()];return rs&&rs[S.r]}
function reset(){run++;for(const x in S)delete S[x];Object.assign(S,{r:0,fill:{},full:FULL,placed:[],done:0,shuf:[3,0,4,2,1],check:()=>{}})}
const MISS={fact:'That is a fact anyone can check, so there is nothing to argue. A claim is a view someone could disagree with.',vague:'Too vague: nice for whom, and so what? A claim says what should happen and why.',
 anec:'One cousin is an anecdote. It may not be typical, so it is weak evidence.',popular:'Liking lie-ins is not evidence that a later start helps learning.',everyone:'"Everyone knows" is an assumption, not evidence. Look for a study or figures.',opinion:'That is another opinion. Evidence is something measured or found out.',
 straw:'Insulting the other side is not a counterclaim. Give their best reason fairly.',none:'Every real issue has another side. Saying there is none makes readers trust you less.',bare:'"That is wrong" gives no reason. A rebuttal explains why the counterclaim does not win.',concede:'Giving in drops your claim. Accept the worry, then show why your side still wins.',
 contrast:'However turns to a different side. Here you need a different job.',result:'Therefore shows a result. Here you need a different job.',add:'Furthermore adds a point on the same side, but here you turn to the other side.',example:'For example introduces evidence, not a result.',
 slang:'Still informal: "loads", "knackered" and "innit" are chatty. Formal style uses standard words.',informal:'"So yeah" and "obviously" are chatty, and a conclusion should sum up your reasons.',newpoint:'A conclusion sums up. It does not start a new argument about lunches.'};
function pick(tag,text){const r=cur();if(!r||S.lock)return;if(tag!=='ok'){A.sound.miss();say(MISS[tag]||'Not quite. Read the job of this part again.');return}
 A.sound.pop();if(r.link)S.fill[r.slot]=S.fill[r.slot].replace('___',text);else S.fill[r.slot]=r.add?(S.fill[r.slot]+' '+text):text;S.r++;
 const nx=cur();say('Yes. '+(nx?nx.q:'This part is done.'));A.redraw();controls();S.check()}
function place(i){if(S.done>=5)return;if(i!==S.done){A.sound.miss();say(i<S.done?'That one is already placed.':'Not yet. Next comes the '+SLOTS[S.done].toLowerCase()+'.');return}
 A.sound.pop();S.placed.push(i);S.done++;say(S.done<5?'Yes. Next: the '+SLOTS[S.done].toLowerCase()+'.':'Claim, two reasons with evidence, counterclaim and rebuttal, conclusion.');A.redraw();controls();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind();if(k==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='order'){S.shuf.forEach(i=>{if(!S.placed.includes(i))btn(SLOTS[i],()=>place(i),'Place the '+SLOTS[i])});return}
 const r=cur();if(!r)return;c.el('p',{class:'fl-q'},ctl,r.q);const sh=(S.r+1)%3;[...r.o.slice(sh),...r.o.slice(0,sh)].forEach(([t,g])=>btn(t,()=>pick(g,t)))}
function auto(i,n){steps[i].go();const r=run;for(let j=0;j<n;j++)setTimeout(()=>{if(r!==run)return;if(kind()==='order')place(S.done);else{const x=cur();if(x)pick('ok',x.o[0][0])}},A.reduced()?25*(j+1):(j+1)*450)}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
const roundsDone=k=>()=>S.r>=ROUNDS[k].length;
function down(p){if(kind()!=='order')return false;const b=cards().find(b=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h);if(b)place(S.shuf[b.i]);return true}
const steps=[
{h:'Claim',p:'An argument starts with a claim: a clear view that someone could disagree with. It goes in your introduction.',
 predict:{q:'A claim is a sentence that…',opts:['someone could argue against','everyone already agrees with','is a fact you can look up'],ans:0},
 task:'Choose the claim for the introduction',show:()=>auto(0,1),
 go:()=>{reset();S.k='claim';say(ROUNDS.claim[0].q);controls();S.check=finish(0,roundsDone('claim'),'The claim takes a side and gives the reason in a nutshell.')}},
{h:'Reasons and evidence',p:'Each reason needs relevant evidence: facts, figures or research, not just feelings.',
 predict:{q:'Is one person\'s story strong evidence?',opts:['No, it might not be typical','Yes, if it is true','Yes, stories always win'],ans:0},
 task:'Back up both reasons with evidence',show:()=>auto(1,2),
 go:()=>{reset();S.fill[0]=FULL[0];say(ROUNDS.evid[0].q);controls();S.check=finish(1,roundsDone('evid'),'Research and measured results are relevant evidence; anecdotes and "everyone knows" are not.')}},
{h:'Counterclaim',p:'Strong writers name the other side fairly, then rebut it: they show why their claim still wins.',
 predict:{q:'Does naming the other side weaken your argument?',opts:['No, answering it makes yours stronger','Yes, never mention it','Only if you agree with it'],ans:0},
 task:'Give a fair counterclaim, then rebut it',show:()=>auto(2,2),
 go:()=>{reset();S.fill[0]=FULL[0];S.fill[1]=FULL[1];S.fill[2]=FULL[2];say(ROUNDS.counter[0].q);controls();S.check=finish(2,roundsDone('counter'),'Counterclaim stated fairly, then answered with a reason.')}},
{h:'Linking words',p:'Connectives tell the reader what job the next sentence does: add, turn, or conclude.',
 task:'Choose the right linking word three times',show:()=>auto(3,3),
 go:()=>{reset();[FULL[0],FULL[1],'___, when Seattle high schools started later, students slept about 34 minutes more.','Some argue clubs would suffer. ___, clubs can move to lunchtime.','Students are short of sleep. ___, a 9:30 start would help them learn and attend more.'].forEach((t,i)=>S.fill[i]=t);say(ROUNDS.link[0].q);controls();S.check=finish(3,roundsDone('link'),'Furthermore adds, However turns to the other side, Therefore draws a result.')}},
{h:'Formal style',p:'Arguments for school, letters or speeches use formal style: no slang, no chatty asides.',
 task:'Make a sentence formal, then pick a formal conclusion',show:()=>auto(4,2),
 go:()=>{reset();FULL.slice(0,4).forEach((t,i)=>S.fill[i]=t);S.fill[2]='Loads of kids are totally knackered in first lesson.';say(ROUNDS.formal[0].q);controls();
  S.check=finish(4,roundsDone('formal'),'Formal words, and a conclusion that sums up without a new point.')}},
{h:'Build the order',p:'Now put the whole argument in order. Tap each paragraph in turn.',
 predict:{q:'Where does the counterclaim usually go?',opts:['After your reasons, before the conclusion','In the very first sentence','After the conclusion'],ans:0},
 task:'Put the five paragraphs in order',show:()=>auto(5,5),
 go:()=>{reset();say('Tap the paragraph that comes first.');controls();S.check=finish(5,()=>S.done>=5,'Introduction, reasons, counterclaim and rebuttal, conclusion.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which is a claim?',[['Homework should be banned for under-12s.','ok'],['Most pupils get homework.','fact'],['Homework exists.','vague']]],
 ['Which is the strongest evidence that phones distract in class?',[['A study of 91 English schools found test scores rose after phone bans.','ok'],['My friend checks his phone all the time.','anec'],['Everyone knows phones are bad.','everyone']]],
 ['Which word turns to the other side?',[['However','ok'],['Furthermore','add'],['Therefore','result']]],
 ['What should come straight after a counterclaim?',[['A rebuttal that answers it','ok'],['A brand new reason','newpoint'],['The conclusion','early']]],
 ['Which sentence is formal?',[['This policy would benefit many students.','ok'],['This is a total no-brainer, guys.','slang'],['Honestly, it\'s kind of obvious.','informal']]],
 ['What does a concluding statement do?',[['Sums up the claim and main reasons','ok'],['Adds a new topic','newpoint'],['Repeats the first sentence word for word','copy']]],
 ['Which is a fair counterclaim?',[['Some parents worry that later starts clash with work.','ok'],['Only silly people disagree.','straw'],['There is no other side.','none']]]];
function why(t){let m='Think about the job of each part of the argument.';
 if(t==='fact')m='That is a fact anyone can check. A claim is a view someone could disagree with.';
 if(t==='vague')m='Too vague to argue about. A claim says what should happen.';
 if(t==='anec')m='One friend is an anecdote, not strong evidence. Look for a study or figures.';
 if(t==='everyone')m='"Everyone knows" is an assumption, not evidence.';
 if(t==='add')m='Furthermore adds a point on the same side. To turn, use however.';
 if(t==='result')m='Therefore shows a result. To turn to the other side, use however.';
 if(t==='newpoint')m='A new point here confuses the reader. Answer the counterclaim, or sum up.';
 if(t==='early')m='The conclusion comes last. First answer the counterclaim with a rebuttal.';
 if(t==='slang')m='"No-brainer" and "guys" are slang. Formal style uses standard words.';
 if(t==='informal')m='"Honestly" and "kind of" are chatty. Formal style is calm and precise.';
 if(t==='copy')m='Copying the opening adds nothing. Sum up the reasons in fresh words.';
 if(t==='straw')m='Calling people silly is not a counterclaim. Give their best reason fairly.';
 if(t==='none')m='Every real issue has another side. Saying there is none loses trust.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.9,tall:1.5,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Argument choices'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
