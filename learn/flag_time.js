/* Flagship – time and attention management (ages 9–11): sort tonight's jobs into "do first" and "can wait"
   (prioritising by importance and deadline), build an evening plan and run it to see what happens when the fun job
   goes first, pick a strategy for each distraction during a focus block, see what switching between two jobs costs,
   and plan with real timings instead of hopeful guesses. Challenge on the usual time and attention slips. */
(()=>{const JOBS=[['Maths homework, due tomorrow',0,'Due tomorrow. If it waits, there may be no time left tonight.'],['Next level of my game',1,'Fun, but nothing is due. It fits after the must-dos.'],
 ['Pack PE kit for tomorrow',0,'Tomorrow needs it, and it takes 10 minutes. Do it tonight.'],['Science project, due next week',1,'Important, but due next week: plan a small part, not all of it now.'],
 ['Learn spellings for tomorrow\u2019s test',0,'The test is tomorrow, so this cannot wait.'],['Watch a new video',1,'Nothing depends on it. It can wait.']];
const BLK=[['📘 Homework',40,1],['🎮 Game',30,0],['🎒 PE kit',10,1],['🔤 Spellings',15,1]],WIN=120,OVER=30;
const DIS=[['📱 Your phone buzzes',[['Put it in another room till the timer ends',1],['Check it quickly, just once',0,'A quick check pulls your mind away, and getting back takes longer than the check.'],['Turn it face down next to you',0,'A phone in reach is easy to grab “just for a second”. Out of the room removes the pull.']]],
 ['📺 The TV is on in the same room',[['Move to a quiet spot, or ask for it off',1],['Work with it on and try harder',0,'Trying harder does not stop your ears listening. Change the place.'],['Watch first, work later',0,'That swaps the job for the distraction. Must-dos first.']]],
 ['🍪 You feel hungry',[['Have a snack before the timer starts',1],['Keep getting up to the kitchen',0,'Each trip breaks your focus. Deal with hunger before you start.'],['Ignore it for 2 hours',0,'A rumbling tummy keeps grabbing attention. Eat first, then focus.']]],
 ['💭 You keep thinking about Saturday\u2019s party',[['Write it on a “later” list, then carry on',1],['Stop and plan the party now',0,'That is a switch to a different job. Park the thought on paper.'],['Tell yourself not to think about it',0,'Trying not to think of something often makes it pop up more. Writing it down parks it.']]]];
const EST=[['10 maths questions',[3,4,2,5,3,3,4,3,2,3]],['Read 10 pages',[4,3,4,5,4,4,3,5,4,4]]];
VIS.reg('flagtime',c=>{let A,ctrl,qbox,qi=-1,hot=0;
const T={tok:0,want:()=>{},card:0,sorted:[],bad:-1,plan:[],ran:null,okRuns:0,d:0,focus:100,beaten:0,sw:0,tried:[],e:0,guess:20,timed:false,planned:0,grab:null};
const v=()=>['sort','plan','dis','switch','est','quiz'][A.step];
const tell=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const px=n=>Math.round(n*(A.narrow?1:1.15));
function say(g,s,x,y,n,col,w,al){g.font=`${w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function card(g,r,f,e,lw){g.fillStyle=f;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||1.5;g.strokeStyle=e;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const In=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const tray=()=>({x:A.W*.08,y:A.H*.05,w:A.W*.84,h:A.H*.16}),pile=i=>({x:6+i*A.W/2,y:A.H*.3,w:A.W/2-12,h:A.H*.66});
const clock=m=>{const t=16*60+30+m,h=Math.floor(t/60)-12,mm=t%60;return h+':'+String(mm).padStart(2,'0')};
function runPlan(){let t=0,fun=false;const out=[];T.plan.forEach(i=>{const[n,len,must]=BLK[i];let L=len;if(!must&&T.plan.slice(T.plan.indexOf(i)+1).some(j=>BLK[j][2]))L+=OVER;out.push({i,s:t,e:t+L,cut:t+L>WIN,must});t+=L});return out}
const swTime=n=>18+n*2;
function draw(A){const{ctx:g,W,H,col:C}=A,s=v();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(s==='quiz'){say(g,'Must-dos first · one thing at a time',W/2,H*.4,14,C.tx,800);say(g,'Plan with real times',W/2,H*.56,13,C.tx,700);return}
 if(s==='sort'){const tr=tray();if(T.card<JOBS.length){const r=T.grab?{...tr,x:T.grab.x-tr.w/2,y:T.grab.y-tr.h/2}:tr;card(g,r,A.alpha(C.or,.25),C.tx,2);say(g,JOBS[T.card][0],r.x+r.w/2,r.y+r.h/2,13,C.tx,800)}else say(g,'All sorted',W/2,tr.y+tr.h/2,14,C.gr,800);
  ['⏰ Do tonight first','🕒 Can wait'].forEach((n,i)=>{const r=pile(i);card(g,r,A.alpha([C.rd,C.cy][i],.1),T.bad===i?C.rd:C.tx,T.bad===i?4:1.5);say(g,n,r.x+r.w/2,r.y+px(16),12,C.tx,800);
   T.sorted.filter(k=>JOBS[k][1]===i).forEach((k,j)=>say(g,JOBS[k][0].split(',')[0],r.x+r.w/2,r.y+px(42)+j*px(22),A.narrow?9:11,C.tx,600))})}
 if(s==='plan'){const x0=W*.06,w=W*.88,y=H*.12,h=H*.2,sc=w/WIN;card(g,{x:x0,y,w,h},A.alpha(C.ln,.12),C.tx);
  const rows=T.ran||(()=>{let t=0;return T.plan.map(i=>{const r={i,s:t,e:t+BLK[i][1]};t=r.e;return r})})();
  rows.forEach(r=>{const a=x0+r.s*sc,b=x0+Math.min(r.e,WIN)*sc;card(g,{x:a,y,w:Math.max(2,b-a),h},A.alpha(r.cut?C.rd:BLK[r.i][2]?C.gr:C.vi,.35),C.tx);say(g,BLK[r.i][0].split(' ')[0],(a+b)/2,y+h/2,14)});
  say(g,'4:30',x0,y+h+px(12),10,C.tx,600,'left');say(g,'6:30 dinner',x0+w,y+h+px(12),10,C.tx,600,'right');
  say(g,T.ran?(T.ran.some(r=>r.cut&&r.must)?'✗ A must-do did not fit before dinner':'✓ Every must-do got done'):'Tap jobs in the order you will do them',W/2,H*.48,12,T.ran&&T.ran.some(r=>r.cut&&r.must)?C.rd:C.tx,700);
  BLK.forEach(([n,len],i)=>{const r={x:6+i*(W-12)/4,y:H*.58,w:(W-12)/4-6,h:H*.22},used=T.plan.includes(i);card(g,r,A.alpha(C.or,used?.06:.2),C.tx);say(g,n,r.x+r.w/2,r.y+r.h*.38,A.narrow?9:12,C.tx,used?500:700);say(g,len+' min',r.x+r.w/2,r.y+r.h*.72,10,C.tx,600)});
  say(g,'Good plans run: '+T.okRuns,W/2,H*.9,11,C.tx,600)}
 if(s==='dis'){const D=DIS[Math.min(T.d,3)];card(g,{x:W*.06,y:H*.06,w:W*.88,h:H*.1},A.alpha(C.ln,.15),C.tx);g.fillStyle=A.alpha(T.focus>60?C.gr:C.am,.55);A.paint.rrect(W*.06,H*.06,W*.88*T.focus/100,H*.1,10);g.fill();say(g,'Focus '+T.focus+'%',W/2,H*.11,12,C.tx,800);
  say(g,T.d<4?D[0]:'Block finished!',W/2,H*.26,15,C.tx,800);if(T.d<4)D[1].forEach(([t],i)=>{const r={x:W*.06,y:H*(.36+i*.2),w:W*.88,h:H*.16};card(g,r,A.alpha(C.cy,.12),T.bad===i?C.rd:C.tx,T.bad===i?4:1.5);say(g,t,W/2,r.y+r.h/2,12,C.tx,700)});
  say(g,'Handled: '+T.beaten+' of 4',W/2,H*.96,11,C.tx,600)}
 if(s==='switch'){const x0=W*.06,w=W*.88,tot=swTime(T.sw),sc=w/swTime(6),y=H*.14,h=H*.16,n=T.sw+2;let x=x0;
  for(let k=0;k<n;k++){const isM=k%2===0,len=(isM?12/Math.ceil(n/2):6/Math.floor(n/2));if(k>1){card(g,{x,y,w:2*sc,h},A.alpha(C.rd,.5),C.tx,1);x+=2*sc}card(g,{x,y,w:len*sc,h},A.alpha(isM?C.cy:C.vi,.35),C.tx,1);x+=len*sc}
  say(g,tot+' minutes in total',W/2,y+h+px(20),15,C.tx,800);say(g,'red = getting back into it (2 min each, in this model)',W/2,y+h+px(42),10,C.tx,600);
  const sl={x:W*.1,y:H*.66,w:W*.8};g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(sl.x,sl.y);g.lineTo(sl.x+sl.w,sl.y);g.stroke();for(let k=0;k<=6;k++){say(g,String(k),sl.x+sl.w*k/6,sl.y+px(22),11,C.tx,600)}
  g.fillStyle=C.or;g.beginPath();g.arc(sl.x+sl.w*T.sw/6,sl.y,px(13),0,7);g.fill();g.strokeStyle=C.tx;g.stroke();say(g,'Switches between maths and messages',W/2,H*.84,11,C.tx,600);say(g,'Tried: '+T.tried.length+' settings',W/2,H*.93,11,C.tx,600)}
 if(s==='est'){const[name,log]=EST[Math.min(T.e,1)],act=log.reduce((a,b)=>a+b,0);say(g,'⏱ '+name,W/2,H*.08,15,C.tx,800);say(g,'My guess: '+T.guess+' min',W/2,H*.2,14,C.tx,700);
  if(T.timed){const bw=(W*.88)/log.length;log.forEach((m,i)=>{const bh=m*H*.05;card(g,{x:W*.06+i*bw+2,y:H*.56-bh,w:bw-4,h:bh},A.alpha(C.cy,.35),C.tx,1)});say(g,'Real time: '+act+' min',W/2,H*.64,14,act>T.guess?C.rd:C.tx,800)}
  else say(g,'Set your guess, then time it',W/2,H*.4,12,C.tx,600);say(g,'Planned: '+T.planned+' of 2',W/2,H*.92,11,C.tx,600)}
 A.fx.draw(g)}
const nope=s=>{A.sound.miss();tell(s);A.redraw()},nice=s=>{A.sound.pop();tell(s);pad();A.redraw();T.want()};
function drop(b){T.grab=null;if(T.card>=JOBS.length||b<0)return A.redraw();const J=JOBS[T.card];if(b!==J[1]){T.bad=b;return nope(J[2])}T.bad=-1;T.sorted.push(T.card);T.card++;nice(J[2])}
function addJob(i){if(T.ran){T.plan=[];T.ran=null}if(T.plan.includes(i))return;T.plan.push(i);A.sound.tick();tell(BLK[i][0]+' added at '+clock(T.plan.slice(0,-1).reduce((a,j)=>a+BLK[j][1],0)));pad();A.redraw()}
function go(){if(T.plan.length<4)return nope('Put all 4 jobs in the plan first.');T.ran=runPlan();const lost=T.ran.filter(r=>r.cut&&r.must);
 if(lost.length){const fun=T.ran.find(r=>!r.must);return nope(`The game ran ${OVER} minutes over, as fun things often do. ${BLK[lost[0].i][0]} did not fit before dinner at 6:30.`)}T.okRuns++;nice(`Must-dos done by ${clock(T.ran.filter(r=>r.must).reduce((a,r)=>Math.max(a,r.e),0))}. The game came last, so if it runs over, only fun time is lost.`)}
function choose(i){if(T.d>=4)return;const o=DIS[T.d][1][i];if(!o[1]){T.bad=i;T.focus=Math.max(10,T.focus-15);return nope(o[2])}T.bad=-1;T.beaten++;T.d++;nice('Good fix. Focus stays on the job.')}
function setSw(n){n=Math.max(0,Math.min(6,Math.round(n)));T.sw=n;if(!T.tried.includes(n))T.tried.push(n);A.sound.tick();tell(`${n} switch${n===1?'':'es'}: ${swTime(n)} minutes. ${n?`That is ${n*2} minutes lost getting back into it.`:'One job, then the other: the fastest.'}`);
 pad();A.redraw();if(T.tried.length>=3&&T.tried.includes(0))T.want()}
function guess(d){if(T.timed)return;T.guess=Math.max(5,Math.min(60,T.guess+d));A.sound.tick();tell('My guess: '+T.guess+' minutes');pad();A.redraw()}
function timeIt(){if(T.e>1)return;T.timed=true;const act=EST[T.e][1].reduce((a,b)=>a+b,0);A.sound.whoosh();tell(`It really took ${act} minutes. ${act>T.guess?'Longer than the guess, as most people find.':'Close to your guess.'} Now plan for it.`);pad();A.redraw()}
function plan(k){const act=EST[T.e][1].reduce((a,b)=>a+b,0),opts=[act-10,act+5,act+40],p=opts[k];if(k!==1)return nope(p<act?`${p} minutes is too short: you just saw it takes ${act}.`:`${p} minutes wastes time you could use for other jobs. Real time plus a little spare is enough.`);
 T.planned++;nice(`Planned ${p} minutes: the real ${act} plus a little spare.`);const t=T.tok;setTimeout(()=>{if(t===T.tok&&T.e<1){T.e++;T.timed=false;T.guess=20;pad();A.redraw()}},A.reduced()?20:700)}
function pad(){if(!ctrl)return;ctrl.innerHTML='';const s=v(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctrl,t);b.onclick=fn};
 if(s==='sort'&&T.card<JOBS.length){K('⏰ Do tonight first',()=>drop(0));K('🕒 Can wait',()=>drop(1))}
 if(s==='plan'){BLK.forEach(([n,len],i)=>{if(!T.plan.includes(i)||T.ran)K(n,()=>addJob(i),'Add '+n+', '+len+' minutes, to the plan')});K('▶ Run my evening',go);K('↺ Clear',()=>{T.plan=[];T.ran=null;pad();A.redraw()})}
 if(s==='dis'&&T.d<4)DIS[T.d][1].forEach(([t],i)=>K(t,()=>choose(i)));
 if(s==='switch')[0,1,2,4,6].forEach(n=>K(n+(n===1?' switch':' switches'),()=>setSw(n)));
 if(s==='est'&&T.e<2){if(!T.timed){K('− 5 min',()=>guess(-5),'Guess 5 minutes less');K('+ 5 min',()=>guess(5),'Guess 5 minutes more');K('⏱ Time it',timeIt)}else{const act=EST[T.e][1].reduce((a,b)=>a+b,0);[act-10,act+5,act+40].forEach((m,k)=>K('Plan '+m+' min',()=>plan(k)))}}}
const knob=p=>Math.abs(p.y-A.H*.66)<A.H*.12&&p.x>A.W*.05&&p.x<A.W*.95;
function down(p){const s=v();
 if(s==='sort'&&T.card<JOBS.length&&In(p,tray())){T.grab={x:p.x,y:p.y};return true}
 if(s==='plan'){const i=BLK.findIndex((_,i)=>In(p,{x:6+i*(A.W-12)/4,y:A.H*.58,w:(A.W-12)/4-6,h:A.H*.22}));if(i>=0)addJob(i)}
 if(s==='dis'&&T.d<4){const i=[0,1,2].find(i=>In(p,{x:A.W*.06,y:A.H*(.36+i*.2),w:A.W*.88,h:A.H*.16}));if(i!=null)choose(i)}
 if(s==='switch'&&knob(p)){T.grab={sl:1};return true}return false}
function move(p){if(!T.grab)return;if(T.grab.sl){T.sw=Math.max(0,Math.min(6,Math.round((p.x-A.W*.1)/(A.W*.8)*6)));A.redraw()}else{T.grab.x=p.x;T.grab.y=p.y;A.redraw()}}
function up(p){const G=T.grab;if(!G)return;T.grab=null;if(G.sl)return setSw(T.sw);drop([0,1].find(i=>In(p,pile(i)))??-1)}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const t=++T.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(t===T.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const wipe=()=>{T.tok++;Object.assign(T,{want:()=>{},card:0,sorted:[],bad:-1,plan:[],ran:null,okRuns:0,d:0,focus:100,beaten:0,sw:0,tried:[],e:0,guess:20,timed:false,planned:0,grab:null})};
const steps=[
{h:'What matters most?',p:'Some jobs are due soon and matter. Some are fun but can wait. Sort tonight\u2019s list.',task:'Sort all 6 jobs',
 show:()=>{steps[0].go();play(JOBS.map(j=>()=>drop(j[1])),400)},go:()=>{wipe();tell(JOBS[0][0]+'. Do first, or can wait?');pad();T.want=fin(0,()=>T.card>=6,'Due soon and important goes first.')}},
{h:'Plan the evening',p:'You have 4:30 to 6:30. Tap the jobs in the order you will do them, then run the evening.',
 predict:{q:'You play the game first, then do homework. What usually happens?',opts:['Everything still gets done','The game runs over and a must-do gets squeezed'],ans:1},task:'Make a plan where every must-do fits',
 show:()=>{steps[1].go();play([()=>addJob(1),()=>addJob(0),()=>addJob(2),()=>addJob(3),go,()=>{},()=>addJob(0),()=>addJob(3),()=>addJob(2),()=>addJob(1),go],330)},
 go:()=>{wipe();tell('Tap the jobs in your order.');pad();T.want=fin(1,()=>T.okRuns>=1,'Must-dos first, fun last: a fun job that runs over cannot squeeze anything.')}},
{h:'Beat the distractions',p:'You start a 20-minute focus block. Things try to pull you away. Pick the best fix each time.',task:'Handle 4 distractions',
 show:()=>{steps[2].go();play([0,0,0,0].map(i=>()=>choose(i)),400)},go:()=>{wipe();tell(DIS[0][0]+'. What do you do?');pad();T.want=fin(2,()=>T.beaten>=4,'Remove it, move away from it, sort it first, or park it on paper.')}},
{h:'One thing at a time',p:'12 minutes of maths and 6 minutes of messages. Drag the knob: how many times do you switch between them?',
 predict:{q:'Doing maths while answering messages, compared with one then the other, is…',opts:['Faster: two jobs at once','Slower: each switch costs time'],ans:1},task:'Try 0 switches and 2 other settings',
 show:()=>{steps[3].go();play([()=>setSw(6),()=>setSw(2),()=>setSw(0)],450)},go:()=>{wipe();tell('Drag the knob or tap a button to set the switches.');pad();T.want=fin(3,()=>T.tried.length>=3&&T.tried.includes(0),'Every switch costs a little time to get back into the job.')}},
{h:'How long will it take?',p:'Guess how long a job takes. Then time it. Plan with the real time, plus a little spare.',task:'Plan 2 jobs',
 show:()=>{steps[4].go();play([timeIt,()=>plan(1),()=>{},()=>{},timeIt,()=>plan(1)],420)},go:()=>{wipe();tell('Set your guess for 10 maths questions.');pad();T.want=fin(4,()=>T.planned>=2,'Time a job once, then plan with the real number.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Homework is due tomorrow. A new game level is waiting. Which first?',[['The homework','ok'],['The game, just one level','fun'],['Whichever I feel like','mood']]],
 ['Your phone keeps buzzing while you read. Best fix?',[['Put it in another room','ok'],['Check it quickly each time','peek'],['Turn it face down beside me','near']]],
 ['Is texting while doing homework faster?',[['No, each switch costs time','ok'],['Yes, two at once','multi'],['It makes no difference','same']]],
 ['You guessed 15 minutes. It really took 30. How long should you plan next time?',[['About 35 minutes','ok'],['15 minutes','hope'],['2 hours','huge']]],
 ['A thought about the weekend keeps popping up. What helps?',[['Write it on a later list','ok'],['Tell myself not to think it','suppress'],['Plan the weekend now','switch']]],
 ['A project is due next week. What is a good plan tonight?',[['Do one small part now','ok'],['Leave it all till the night before','cram'],['Do the whole thing tonight','all']]]];
function why(t){let m='Must-dos first, one job at a time, distractions out of reach, and plan with real times.';
 if(t==='fun')m='One level often becomes three. Do the job that is due first, then enjoy the game.';
 if(t==='mood')m='Feelings pick the fun job. Use the deadline to choose instead.';
 if(t==='peek')m='Each check pulls you out of the book and back again. Put it out of reach.';
 if(t==='near')m='A phone in reach is easy to grab “just for a second”. Out of the room is better.';
 if(t==='multi')m='Your brain switches back and forth, and each switch costs time.';
 if(t==='same')m='Switching adds time to get back into each job, so it is slower.';
 if(t==='hope')m='You just saw it takes 30. Planning 15 again repeats the same slip.';
 if(t==='huge')m='Too much spare wastes time. The real time plus a little is enough.';
 if(t==='suppress')m='Pushing a thought away often makes it come back more. Write it down.';
 if(t==='switch')m='That swaps your job for a new one. Park the thought and carry on.';
 if(t==='cram')m='The night before leaves no time if something goes wrong. Start small now.';
 if(t==='all')m='It is not due yet. A small part tonight leaves time for tomorrow\u2019s must-dos.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){hot++;A.win()}else{hot=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Right. Streak: '+hot+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;ctrl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctrl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pad()}});
A.start()})})();
