/* Flagship – plan, monitor, evaluate (ages 9–10): sort before/during/after questions, plan a checkable goal, judge
   homework runs at the 15-minute check against the plan line, pick the fix the graph calls for, find lost minutes. */
(()=>{
const QQ=[['What is my goal?',0],['Is my strategy working?',1],['How did it go?',2],['Which strategy will I use?',0],['Should I change something?',1],['What will I do differently next time?',2]];
const STAGE=['Plan','Monitor','Evaluate'],WHEN=['before','during','after'];
const PLAN=[{slot:'Goal',ops:[['All 20 questions in 30 minutes','ok'],['Do some maths','vague'],['Be the best in the class','vague2']]},
 {slot:'Strategy',ops:[['Do the ones I can first, mark hard ones to come back to','ok'],['Start at question 1 and never move on until it is right','stuck'],['Guess fast so I finish first','guess']]},
 {slot:'Checkpoint',ops:[['At 15 minutes I should have about 10 done','ok'],['At the end I will see how it went','late'],['No check, I will just keep going','none']]}];
/* runs: [minute, done]; plan = 20 in 30 min */
const CHECK=[{who:'Ava',run:[[0,0],[5,4],[10,7],[15,11],[20,15],[25,18],[30,20]],ok:1},
 {who:'Kai',run:[[0,0],[4,4],[6,5],[15,5],[30,12]],ok:0},
 {who:'Zoe',run:[[0,0],[3,2],[8,2],[11,4],[15,6],[30,13]],ok:0}];
const FIX=[{who:'Kai',note:'Stuck on question 6 for 9 minutes',run:[[0,0],[4,4],[6,5],[15,5]],after:[[22,14],[27,19],[30,20]],
  ops:[['Skip it, mark it, come back at the end','ok'],['Keep trying the same way until it is right','same'],['Give up on the whole sheet','quit']]},
 {who:'Zoe',note:'Phone buzzing: long gaps with no work',run:[[0,0],[3,2],[8,2],[11,4],[15,6]],after:[[21,12],[26,17],[30,20]],
  ops:[['Put the phone in another room','ok'],['Keep it close and try to ignore it','same'],['Stop and finish tomorrow','quit']]},
 {who:'Leo',note:'On pace, but 2 of his 3 spot checks were wrong',run:[[0,0],[5,5],[10,9],[15,12]],bad:[[6,6],[13,11]],after:[[20,15],[25,18],[30,20]],
  ops:[['Slow down and check each answer another way','ok'],['Go even faster to make up time','fast'],['Keep going and check them all at the end','late']]}];
const EVAL=[{who:'Kai',run:[[0,0],[6,5],[16,6],[23,11],[30,15]],lost:[6,16],got:15,ops:[['Next time, if I am stuck for 3 minutes, I will skip and come back','ok'],['Next time I will try harder','vague'],['I got 15, so it went fine','score']]},
 {who:'Zoe',run:[[0,0],[4,3],[9,3],[16,8],[22,8],[30,16]],lost:[16,22],got:16,ops:[['Next time my phone goes in another room before I start','ok'],['Next time I will concentrate more','vague'],['Maths is just hard for me','fixed']]},
 {who:'Leo',run:[[0,0],[6,9],[12,16],[17,20],[30,20]],bad:[[4,6],[8,12],[11,15],[14,18]],lost:[17,30],got:16,ops:[['Next time I will use spare time to check each answer','ok'],['Next time I will go even faster','fast'],['I finished first, so it went well','score']]}];
VIS.reg('flagpme',c=>{let A,pad,box,qn=-1,good=0;const T={};
const stage=()=>['sort','plan','check','fix','eval','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)},miss=t=>{A.sound.miss();tell(t)};
const sz=n=>Math.round(n*(A.narrow?1:1.12));
function label(g,t,x,y,n,al,col,wt){al=al||'center';col=col||A.col.tx;g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al;g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-12)}
function box2(g,r,col,a,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function at(run,t){if(t<=run[0][0])return run[0][1];for(let i=1;i<run.length;i++)if(t<=run[i][0]){const[a,b]=run[i-1],[c2,d]=run[i];return b+(d-b)*(t-a)/(c2-a)}return run[run.length-1][1]}
/* pace graph */
const plotR=()=>({x:A.narrow?34:46,y:A.H*.14,w:A.W-(A.narrow?48:66),h:A.H*(A.narrow?.5:.58)});
const X=m=>plotR().x+plotR().w*m/30,Y=q=>plotR().y+plotR().h*(1-q/20),M=x=>Math.max(0,Math.min(30,(x-plotR().x)/plotR().w*30));
function graph(g,o){const P=plotR(),C=A.col;g.fillStyle=A.alpha(C.pn,.6);g.fillRect(P.x,P.y,P.w,P.h);
 if(o.lost){g.fillStyle=A.alpha(C.rd,o.lostOn?.28:.12);g.fillRect(X(o.lost[0]),P.y,X(o.lost[1])-X(o.lost[0]),P.h)}
 g.strokeStyle=A.alpha(C.mu,.5);g.lineWidth=1;for(let m=0;m<=30;m+=5){g.beginPath();g.moveTo(X(m),P.y);g.lineTo(X(m),P.y+P.h);g.stroke();label(g,String(m),X(m),P.y+P.h+12,10,0,0,600)}
 for(let q=0;q<=20;q+=10){g.beginPath();g.moveTo(P.x,Y(q));g.lineTo(P.x+P.w,Y(q));g.stroke();label(g,String(q),P.x-6,Y(q),10,'right',C.tx,600)}
 label(g,'minutes',P.x+P.w/2,P.y+P.h+28,10,0,0,600);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(P.x,P.y,P.w,P.h);
 if(o.plan){g.setLineDash([7,5]);g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(30),Y(20));g.stroke();g.setLineDash([]);label(g,'plan',X(26),Y(17.3)+14,11,0,C.vi,800)}
 if(o.check){g.strokeStyle=C.cy;g.lineWidth=2;g.setLineDash([3,3]);g.beginPath();g.moveTo(X(15),P.y);g.lineTo(X(15),P.y+P.h);g.stroke();g.setLineDash([]);label(g,'check',X(15),P.y-9,11,0,0,800)}
 const run=o.run;if(run){const end=Math.min(o.upto==null?30:o.upto,run[run.length-1][0]);g.strokeStyle=C.or;g.lineWidth=4;g.beginPath();g.moveTo(X(0),Y(0));
  for(let t=0;t<=end+1e-9;t+=.25)g.lineTo(X(t),Y(at(run,t)));g.stroke();g.fillStyle=C.or;g.beginPath();g.arc(X(end),Y(at(run,end)),6,0,7);g.fill();
  if(o.tag)label(g,`${Math.round(at(run,end))} done`,Math.min(X(end)+8,P.x+P.w-50),Y(at(run,end))-16,12,'left',C.tx,800);
  (o.bad||[]).forEach(([m,q])=>{if(m<=end)label(g,'✗',X(m),Y(q)-12,15,0,C.rd,900)})}
 if(o.cursor!=null){g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(X(o.cursor),P.y);g.lineTo(X(o.cursor),P.y+P.h);g.stroke();
  box2(g,{x:X(o.cursor)-14,y:P.y+P.h-14,w:28,h:28},C.cy,1);label(g,'⇔',X(o.cursor),P.y+P.h,13,0,'#000',900)}}
/* ---- other layouts ---- */
const colR=i=>{const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.42,w,h:A.H*.54}};
const cardR=()=>{const w=Math.min(A.W*.8,360);return{x:A.W/2-w/2,y:A.H*.12,w,h:A.H*.18}};
const slotR=i=>({x:A.W*.05,y:A.H*(.12+i*.26),w:A.W*.9,h:A.H*.22});
const run2=f=>f.run.concat(T.fixed?f.after:[]);
function paint(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){STAGE.forEach((s,i)=>{const r=colR(i);r.y=H*.3;r.h=H*.4;box2(g,r,[C.vi,C.cy,C.gr][i],.12);label(g,s,r.x+r.w/2,r.y+r.h*.4,15,0,0,800);label(g,WHEN[i],r.x+r.w/2,r.y+r.h*.65,12)});label(g,'Plan → Monitor → Evaluate → plan again',W/2,H*.15,14,0,0,800);return}
 if(v==='sort'){if(T.k<QQ.length){const r=cardR(),d=T.drag&&T.drag.x!=null?T.drag:null,q=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;box2(g,q,C.am,.16,3);label(g,QQ[T.k][0],q.x+q.w/2,q.y+q.h/2,14,0,0,800)}
  else label(g,'Before, during, after: all sorted.',W/2,H*.2,15,0,0,800);
  STAGE.forEach((s,i)=>{const r=colR(i);box2(g,r,[C.vi,C.cy,C.gr][i],T.bad===i?.32:.1,T.bad===i?4:2);label(g,s,r.x+r.w/2,r.y+16,13,0,0,800);label(g,WHEN[i],r.x+r.w/2,r.y+34,11,0,0,600);
   T.cols[i].forEach((t,j)=>{g.save();g.font=`600 ${sz(11)}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle=C.tx;wrap(g,t,r.x+r.w/2,r.y+58+j*r.h*.3,r.w-10,sz(13));g.restore()})});return A.fx.draw(g)}
 if(v==='plan'){PLAN.forEach((p,i)=>{const r=slotR(i),got=T.plan[i];box2(g,r,got!=null?C.gr:C.mu,got!=null?.14:.06,i===T.plan.length?3:2);label(g,`${i+1}. ${p.slot}`,r.x+12,r.y+18,13,'left',C.tx,800);
   g.save();g.font=`600 ${sz(12)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;wrap(g,got!=null?p.ops[got][0]:'…',r.x+12,r.y+44,r.w-24,sz(16),'left');g.restore()});return A.fx.draw(g)}
 if(v==='check'){const k=Math.min(T.r,2),s=CHECK[k];label(g,T.r>=3?'Three runs checked.':`${s.who}'s homework. Drag the line to the check.`,W/2,H*.05,13,0,0,800);
  graph(g,{plan:1,check:1,run:s.run,upto:T.r>=3?15:T.cur,cursor:T.r<3?T.cur:null,tag:1});return A.fx.draw(g)}
 if(v==='fix'){const k=Math.min(T.r,2),f=FIX[k];label(g,T.r>=3?'Three runs fixed.':`${f.who}: ${f.note}`,W/2,H*.05,12,0,0,800);
  graph(g,{plan:1,check:1,run:T.r>=3?f.run.concat(f.after):run2(f),upto:T.fixed?T.grow:T.r>=3?30:15,bad:f.bad,tag:1});return A.fx.draw(g)}
 if(v==='eval'){const k=Math.min(T.r,2),e=EVAL[k];label(g,T.r>=3?'Three runs evaluated.':T.lostOn?`${e.who} got ${e.got} of 20. What next time?`:`${e.who} got ${e.got} of 20. Tap where time was lost.`,W/2,H*.05,12,0,0,800);
  graph(g,{plan:1,run:e.run,bad:e.bad,lost:T.lostOn||T.r>=3?e.lost:null,lostOn:T.lostOn,tag:1});return A.fx.draw(g)}}
function wrap(g,t,x,y,w,lh){let L='';for(const d of t.split(' ')){const n=L?L+' '+d:d;if(g.measureText(n).width>w&&L){g.fillText(L,x,y);L=d;y+=lh}else L=n}g.fillText(L,x,y)}
/* ---- actions ---- */
function place(i){if(stage()!=='sort'||T.k>=QQ.length)return;const[q,s]=QQ[T.k];
 if(i!==s){A.sound.miss();T.bad=i;tell(s===1?`You ask that during the task, while you can still change: monitor.`:s===0?`You ask that before you start: plan.`:`That looks back after the task: evaluate.`);setTimeout(()=>{T.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 T.cols[i].push(q);T.k++;A.sound.tick();tell(`${STAGE[i]}: ${q}`);A.redraw();buttons();T.want()}
function choosePlan(j){if(stage()!=='plan'||T.plan.length>=3)return;const p=PLAN[T.plan.length],[t,tag]=p.ops[j];
 if(tag!=='ok'){miss({vague:'"Do some maths" never says when you are done. A goal you can check names the amount and the time.',vague2:'Being the best depends on others. Make the goal about this task: how much, by when.',
  stuck:'One hard question can eat the whole half hour. Plan a way round it.',guess:'Fast guesses finish the sheet, not the learning.',
  late:'At the end it is too late to change anything.',none:'With no checkpoint you only find out at the end.'}[tag]);return}
 T.plan.push(j);A.sound.pop();tell(`${p.slot}: ${t}.`);A.redraw();buttons();T.want()}
function slide(m){if(stage()!=='check'||T.r>=3)return;T.cur=Math.max(T.cur,Math.min(15,m));A.redraw();if(T.cur>=15){tell(`${CHECK[T.r].who} at 15 minutes: ${Math.round(at(CHECK[T.r].run,15))} done. The plan says about 10. On track?`);buttons()}}
function judge(ok){if(stage()!=='check'||T.r>=3||T.cur<15)return;const s=CHECK[T.r],n=Math.round(at(s.run,15));
 if(ok!==!!s.ok){miss(s.ok?`${n} done beats the plan's 10. On track.`:`Only ${n} done by 15 minutes, but the plan says about 10. ${s.who} will not finish at this pace.`);return}
 A.sound.pop();tell(s.ok?`${n} done by halfway: on track. Keep going.`:`${n} by halfway is behind the plan. Time to change something.`);T.r++;T.cur=0;A.redraw();buttons();T.want()}
function mend(j){if(stage()!=='fix'||T.r>=3||T.fixed)return;const f=FIX[T.r],[t,tag]=f.ops[j];
 if(tag!=='ok'){miss({same:'The same way gives the same result. The graph shows it is not working.',quit:'Changing is not quitting. Fix the problem and finish the sheet.',
  fast:'Faster wrong answers are still wrong.',late:'Wait till the end and 2 mistakes become 10. Fix it now.'}[tag]);return}
 T.fixed=1;T.grow=15;A.sound.pop();tell(`${f.who}: ${t}.`);A.tween(T,{grow:30},A.reduced()?1:700,'io',()=>{tell(`${f.who} finishes all 20 by 30 minutes.`);setTimeout(()=>{T.r++;T.fixed=0;A.redraw();buttons();T.want()},A.reduced()?20:300)});buttons()}
function markLost(m){if(stage()!=='eval'||T.r>=3||T.lostOn)return;const e=EVAL[T.r];
 if(m<e.lost[0]||m>e.lost[1]){miss(at(e.run,Math.min(30,m+1))>at(e.run,m)+.3||e.bad?'Look for minutes that gave nothing: a flat line, or spare time not used to check.':'Look for where time passed but the line did not climb.');return}
 T.lostOn=1;A.sound.tick();tell(e.bad?`Minutes ${e.lost[0]} to 30: finished early, never checked, 4 wrong.`:`Minutes ${e.lost[0]} to ${e.lost[1]}: the line is flat. Time lost.`);A.redraw();buttons()}
function sayNext(j){if(stage()!=='eval'||T.r>=3||!T.lostOn)return;const e=EVAL[T.r],[t,tag]=e.ops[j];
 if(tag!=='ok'){miss({vague:'"Try harder" does not say what to do. Name one action.',score:'A score says what happened, not why.',
  fixed:'That blames you, not the plan. The graph shows a fixable cause: the phone.',fast:'Speed was not the problem. The spare minutes were there to check.'}[tag]);return}
 A.sound.pop();tell(`Specific, and it fixes the lost minutes: ${t}.`);T.r++;T.lostOn=0;A.redraw();buttons();T.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='sort'&&T.k<QQ.length)STAGE.forEach((s,i)=>B(`${s} (${WHEN[i]})`,()=>place(i),`Put "${QQ[T.k][0]}" in ${s}`));
 if(v==='plan'&&T.plan.length<3)PLAN[T.plan.length].ops.forEach((o,j)=>B(o[0],()=>choosePlan(j),`${PLAN[T.plan.length].slot}: ${o[0]}`));
 if(v==='check'&&T.r<3){if(T.cur<15)B('Move to 15 minutes',()=>slide(15),'Move the time line to the 15 minute check');else{B('On track',()=>judge(true));B('Behind: change something',()=>judge(false))}}
 if(v==='fix'&&T.r<3&&!T.fixed)FIX[T.r].ops.forEach((o,j)=>B(o[0],()=>mend(j)));
 if(v==='eval'&&T.r<3){const e=EVAL[T.r];if(!T.lostOn)B(`Mark minutes ${e.lost[0]} to ${e.lost[1]}`,()=>markLost((e.lost[0]+e.lost[1])/2),`Mark minutes ${e.lost[0]} to ${e.lost[1]} as lost time`);else e.ops.forEach((o,j)=>B(o[0],()=>sayNext(j)))}}
/* ---- pointer ---- */
function down(p){const v=stage();
 if(v==='sort'&&T.k<QQ.length&&within(p,cardR())){T.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='check'&&T.r<3&&within(p,{...plotR(),y:plotR().y-10,h:plotR().h+30})){slide(M(p.x));return true}
 if(v==='eval'&&T.r<3&&!T.lostOn&&within(p,plotR())){markLost(M(p.x));return false}
 return false}
function move(p){const v=stage();if(v==='check'){slide(M(p.x));return}const d=T.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=T.drag;T.drag=null;if(stage()!=='sort'||!d)return;if(d.x==null){tell('Drag it into a box, or use the buttons.');return A.redraw()}
 if(p.y>A.H*.38)place(Math.max(0,Math.min(2,Math.floor((p.x-8)/((A.W-16)/3)))));else A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function seq(fns,gap){const me=++T.v;fns.forEach((f,j)=>setTimeout(()=>{if(me===T.v)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function clean(){const v=(T.v||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{v,want:()=>{},k:0,cols:[[],[],[]],bad:-1,plan:[],r:0,cur:0,fixed:0,grow:15,lostOn:0,drag:null})}
const steps=[
{h:'Before, during, after',p:'Plan before you start. Monitor while you work. Evaluate when you finish. Sort each question.',predict:{q:'When should you ask "Is my strategy working?"',opts:['During the task','Only at the end','Before you start'],ans:0},task:'Sort all 6 questions',
 show:()=>{steps[0].go();seq(QQ.map(q=>()=>place(q[1])),380)},
 go:()=>{clean();tell('Drag each question to Plan, Monitor or Evaluate.');buttons();T.want=ready(0,()=>T.k>=QQ.length,'Plan: goal and strategy. Monitor: is it working? Evaluate: what next time?')}},
{h:'Make a plan',p:'Homework: 20 maths questions, about 30 minutes. A plan needs a goal you can check, a strategy and a halfway checkpoint.',task:'Choose a goal, a strategy and a checkpoint',
 show:()=>{steps[1].go();seq([0,0,0].map(j=>()=>choosePlan(j)),500)},
 go:()=>{clean();tell('Choose a goal for the homework.');buttons();T.want=ready(1,()=>T.plan.length>=3,'20 in 30 minutes means about 10 by the 15-minute check. Now the plan can be checked.')}},
{h:'Monitor: check halfway',p:'The dashed line is the plan: 20 in 30 minutes. Drag the time line to the 15-minute check. Compare the orange line with the plan.',predict:{q:'At 15 minutes Kai has done 5 of 20. He feels fine. Is he on track?',opts:['No: the plan says about 10 by now','Yes: he feels fine'],ans:0},task:'Check 3 homework runs at 15 minutes',
 show:()=>{steps[2].go();seq(CHECK.flatMap(s=>[()=>slide(15),()=>judge(!!s.ok)]),420)},
 go:()=>{clean();tell("Ava's homework. Drag the time line to the check at 15 minutes.");buttons();T.want=ready(2,()=>T.r>=3,'Monitoring compares progress with the plan while there is time to act.')}},
{h:'Change course',p:'Each run is behind or going wrong at the check. Read the graph, then pick the change that fixes that problem.',predict:{q:'Kai has been stuck on question 6 for 9 minutes. Best move?',opts:['Skip it and come back at the end','Keep going until it is right'],ans:0},task:'Fix 3 runs',
 show:()=>{steps[3].go();seq([0,1,2].map(()=>()=>mend(0)),1150)},
 go:()=>{clean();tell("Kai's run. The line went flat. Pick a change.");buttons();T.want=ready(3,()=>T.r>=3,'Changing strategy partway is what monitoring is for. It is not giving up.')}},
{h:'Evaluate: next time',p:'The task is done. Find where time was lost on the graph, then choose a next-time plan that is specific.',task:'Evaluate 3 runs',
 show:()=>{steps[4].go();seq(EVAL.flatMap(e=>[()=>markLost((e.lost[0]+e.lost[1])/2),()=>sayNext(0)]),450)},
 go:()=>{clean();tell("Kai's finished run. Tap where the time was lost.");buttons();T.want=ready(4,()=>T.r>=3,'A good evaluation names what went wrong and one fix. It feeds the next plan.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Mia checks how her essay is going only after she hands it in. What is she missing?',[['Monitoring while she can still change it','ok'],['Nothing, the end is the time to check','end'],['A longer essay','vague']]],
 ['Sam plans 12 spellings in 20 minutes. After 10 minutes he knows 3. What should he do?',[['Change his strategy now','ok'],['Carry on the same way','same'],['Give up','quit']]],
 ['Which goal can you check?',[['Learn the 8 French words for Friday','ok'],['Get better at French','vague'],['Do some French','vague']]],
 ['Ana feels sure she knows her notes after reading them twice. How should she monitor?',[['Test herself without the notes','ok'],['Trust the feeling','feel'],['Read them a third time','same']]],
 ['Which is the best evaluation?',[['Next time I will draw a diagram for the word problems','ok'],['It went OK','vague'],['I got 14','score']]]];
function hint(t){let m='Think about when you can still change the result.';
 if(t==='end')m='At the end it is too late to fix this task. Monitoring happens during the task.';
 if(t==='same')m='The same strategy will give the same result. Change it while there is time.';
 if(t==='quit')m='Changing course is not giving up. Swap the strategy and keep going.';
 if(t==='vague')m='Vague words cannot be checked. Say exactly what to do, and when.';
 if(t==='score')m='A score says how it went, not why. Name an action.';
 if(t==='feel')m='Feeling sure is not evidence. A self-test shows what you know.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o);b.onclick=()=>answer(t,b)});tell('Challenge: '+q);A.redraw()}
function answer(t,b){box.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const ok=t==='ok',fb=box.querySelector('.fl-fb');b.classList.add(ok?'ok':'no');
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right. ${good} in a row.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next question →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw:paint,onStep:A=>{box.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
