/* Flagship: Organising homework and deadlines (ages 11–12; Learning to Learn — capture tasks with due
   dates, estimate time, break projects, place into a planner). Catch “I’ll remember” and “easiest first
   always”. Distinct from flagtime (general job importance/deadline sorting), flagpme (plan-monitor-
   evaluate on one task), flagpace (narrative pacing). */
(()=>{
VIS.reg('flaghworg',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['capture','estimate','break','place','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.1:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Homework & deadlines',W/2,H*.3,A.narrow?14:17,{w:900});T('capture → estimate → break → plan',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='capture'){T(S.title||'Capture tasks',W/2,H*.08,A.narrow?13:15,{w:800});
  (S.tasks||[]).forEach((t,i)=>{const y=H*(.28+i*.16);g.fillStyle=S.captured?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.06,W*.88,H*.12);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.06,W*.88,H*.12);T(t,W/2,y,A.narrow?12:14,{max:W*.8})});
  T(S.msg||'Write tasks with due dates.',W/2,H*.88,12,{c:C.mu})}
 if(k==='estimate'){T(S.title||'Estimate minutes',W/2,H*.08,A.narrow?13:15,{w:800});
  T('Essay due tomorrow',W/2,H*.28,14,{w:800});T(S.mins? (S.mins+' minutes'):'Pick an estimate',W/2,H*.45,16,{w:800});
  [15,30,45].forEach((m,i)=>{const x=W*(.1+i*.3);g.fillStyle=S.mins===m?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,H*.62,W*.26,H*.18);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,H*.62,W*.26,H*.18);T(m+' min',x+W*.13,H*.71,13,{w:800})});
  T(S.msg||'',W/2,H*.92,12,{c:C.mu})}
 if(k==='break'){T(S.title||'Break the project',W/2,H*.08,A.narrow?13:15,{w:800});
  (S.steps||[]).forEach((t,i)=>{const on=S.broken&&i<S.broken;const y=H*(.28+i*.16);g.fillStyle=on?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.06,W*.88,H*.12);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.06,W*.88,H*.12);T((on?'✓ ':'')+t,W/2,y,A.narrow?12:14,{max:W*.8})});
  T(S.msg||'Split into sittings.',W/2,H*.88,12,{c:C.mu})}
 if(k==='place'){T(S.title||'Place into planner',W/2,H*.08,A.narrow?13:15,{w:800});
  ['Mon','Tue','Wed'].forEach((d,i)=>{const x=W*(.08+i*.3);g.fillStyle=S.slot===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,H*.3,W*.26,H*.35);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,H*.3,W*.26,H*.35);T(d,x+W*.13,H*.4,14,{w:800});if(S.slot===i)T('essay',x+W*.13,H*.55,13,{c:C.mu})});
  T(S.msg||'Slot due-soon work first.',W/2,H*.85,12,{c:C.mu})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{tasks:[],captured:0,mins:null,steps:[],broken:0,slot:null,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='capture'){btn('Write tasks + due dates',()=>{S.captured=1;S.msg='Tasks are captured with due dates.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Capture homework list');
  btn('Reset',()=>{S.captured=0;A.redraw()},'Reset list')}
 if(kind()==='estimate'){[15,30,45].forEach(m=>btn(m+' min',()=>{S.mins=m;S.msg='Estimate: '+m+' minutes.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Estimate '+m+' minutes'))}
 if(kind()==='break'){btn('Add next step',()=>{S.broken=Math.min(3,(S.broken||0)+1);S.msg=S.broken+' step(s) ready.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Break into a step');
  btn('Reset',()=>{S.broken=0;A.redraw()},'Reset steps')}
 if(kind()==='place'){['Mon','Tue','Wed'].forEach((d,i)=>btn('Slot '+d,()=>{S.slot=i;S.msg='Essay placed on '+d+'.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Place on '+d))}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='capture'){S.captured=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='estimate'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.1)/(A.W*.3))));S.mins=[15,30,45][i];A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='break'){S.broken=Math.min(3,(S.broken||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='place'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.08)/(A.W*.3))));S.slot=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Capture with due dates',p:'Organising homework starts by writing every task with its due date. A list in your head is a hope, not a plan.',
 predict:{q:'A solid plan starts by…',opts:['writing every task with its due date','hoping you will remember','doing only the easiest task'],ans:0},
 task:'Write the homework list with due dates',show:()=>auto(0,[()=>{S.captured=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Capture tasks',tasks:['Essay — due Tue','Maths Qs — due Wed','Reading — due Fri'],captured:0,msg:'Tap to capture with due dates.'});say('Capture tasks with due dates.');controls();S.check=finish(0,()=>!!S.captured,'Tasks and due dates are written down.')}},
{h:'Estimate the time',p:'Guess how many minutes each task needs before you place it. Estimates turn a list into a schedule that fits real evenings.',
 predict:{q:'Why estimate minutes?',opts:['so work fits into real planner slots','so you can skip due dates','so you always pick easiest'],ans:0},
 task:'Pick a time estimate for the essay',show:()=>auto(1,[()=>{S.mins=30;A.redraw();S.check()}]),
 go:()=>{reset({title:'Estimate minutes',mins:null,msg:'Pick 15, 30 or 45 minutes.'});say('Estimate time.');controls();S.check=finish(1,()=>!!S.mins,'Time estimate chosen.')}},
{h:'Break a big project',p:'A long project should split into steps that fit one sitting. That stops one panic night and spreads the load across days.',
 predict:{q:'Break a project so…',opts:['each step fits one sitting','you can forget the due date','you only do easy steps'],ans:0},
 task:'Split the project into three steps',show:()=>auto(2,[()=>{S.broken=3;A.redraw();S.check()}]),
 go:()=>{reset({title:'Break into steps',steps:['Research notes','Draft paragraphs','Edit and submit'],broken:0,msg:'Add each sitting-sized step.'});say('Break the project.');controls();S.check=finish(2,()=>S.broken>=3,'Project split into sittings.')}},
{h:'Place into the planner',p:'Put due-soon or high-stakes work into a protected planner slot first. Easy or fun tasks can fill gaps after must-do work has a home.',
 predict:{q:'Protected time is for…',opts:['due-soon or high-stakes work','only games after homework hope','tasks you will remember later'],ans:0},
 task:'Slot the essay onto a planner day',show:()=>auto(3,[()=>{S.slot=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Planner slots',slot:null,msg:'Place due-soon work first.'});say('Place into planner.');controls();S.check=finish(3,()=>S.slot!=null,'Essay placed in a planner slot.')}},
{h:'Catch a mix-up',p:'Slips: saying I’ll remember instead of writing it down; always doing the easiest task first so hard due-soon work gets squeezed.',
 predict:{q:'Which is the mix-up?',opts:["I'll remember is a solid plan",'Break a project into steps','Protect time for due-soon work'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:["I'll remember is a solid plan",'Break a project into steps','Protect time for due-soon work'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,"I'll remember is not a plan.")}},
{h:'Order the plan',p:'Order: capture tasks with due dates → estimate minutes → break big projects → place into planner (due-soon first).',
 predict:{q:'Correct order starts with…',opts:['capture with due dates → estimate → place','start easiest with no list','wait until you remember'],ans:0},
 task:'Tap the correct order',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Plan order',opts:['capture with due dates → estimate → place','start easiest with no list','wait until you remember'],picked:null});say('Pick the order.');controls();S.check=finish(5,()=>S.picked===0,'Capture, estimate, then place.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A solid plan starts by…',[['writing tasks with due dates','ok'],['hoping to remember','mem'],['only easiest first','easy']]],
 ['Why estimate minutes?',[['so work fits planner slots','ok'],['to skip due dates','due'],['to always pick easiest','easy']]],
 ['Break a project so…',[['each step fits one sitting','ok'],['you forget the due date','due'],['only easy steps count','easy']]],
 ['Which is the mix-up?',[["I'll remember is a plan",'ok'],['break into steps','true'],['protect due-soon time','true']]],
 ['Protected time is for…',[['due-soon or high-stakes work','ok'],['only leftover hope','mem'],['games before any list','easy']]],
 ['Order starts with…',[['capture with due dates','ok'],['easiest with no list','easy'],['wait to remember','mem']]],
 ['Easiest-first is a trap because…',[['due-soon hard work gets squeezed','ok'],['easy tasks never help','true'],['planners ban easy tasks','true']]]];
function why(t){let m='Capture tasks with due dates, estimate time, break projects, place due-soon work first.';
 if(t==='mem')m="I'll remember is a hope, not a plan. Write the task and due date down.";
 if(t==='easy')m='Always picking the easiest task can squeeze out hard work that is due soon.';
 if(t==='due')m='Due dates still matter when you break a project or estimate time — do not drop them.';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Homework plan controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
