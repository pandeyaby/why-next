/* Flagship – practise the part I find hard (ages 10–11): mark wrong and slow answers, find the step inside a sum that
   goes wrong, build a 10-try plan, race two plans over five days, re-sort after a recheck. Data in learn/hardpart_art.js. */
(()=>{const {SLOW,QUIZ,hard,SUMS,STEPS,STEPBAD,LEOQ,HARD,EASY,SLOTS,NEED,DAYS,START,GAIN,PLANS,RACEQ,RECHECK,BINS,DESC,DONE,TXT,QS,END}=HARDPART;
VIS.reg('flaghardpart',c=>{let A,pad,box,qi=-1,gen=0,drag=null;const Z={};
const INK='#0f172a',YES='#047857',NO='#b91c1c',LINE='#64748b',AMB='#fef3c7',SKY='#e0f2fe',F='px system-ui,sans-serif';
const stage=()=>['quiz','leo','plan','race','recheck','chal'][A.step];
const z=n=>A.narrow?n:Math.round(n*1.12);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const wrongSums=SUMS.filter(s=>s.leo!==s.a-s.b);
const stack=(labels,y0)=>{const h=Math.min(A.H*.085,42),w=Math.min(A.W-32,420);return labels.map((t,i)=>({i,t,x:(A.W-w)/2,y:y0+i*(h+6),w,h}))};
let bg,txt,card,title,opts,optDraw;
/* ---------- 1. mark the hard ones ---------- */
const rows=()=>{const top=A.H*.13,h=(A.H*.86-top)/QUIZ.length;return QUIZ.map((r,i)=>({r,i,x:8,y:top+i*h+1,w:A.W-16,h:h-3}))};
function drawQuiz(){const s=Z.a;bg();const n=s.mk.filter(Boolean).length;
 title(s.ok?'4 hard parts: 2 wrong, 2 slow':s.msg?'Not yet: look again':`Marked as hard: ${n}. Then tap Check`,{ok:s.ok,no:!!s.msg&&!s.ok});
 rows().forEach(R=>{const r=R.r,m=s.mk[R.i],right=r.g===r.a,slow=r.t>SLOW;card(R,{fill:m?AMB:'#ffffff',edge:s.bad===R.i?NO:m?'#b45309':LINE,lw:s.bad===R.i||m?2.6:1.2});
  const cy=R.y+R.h/2,u=R.w;txt(`Q${R.i+1}`,R.x+8,cy,11,{col:'#475569'});txt(`${r.q} = ${r.g}`,R.x+u*.14,cy,13,{w:800});
  txt(right?'right':'wrong',R.x+u*.46,cy,12,{w:800,col:right?YES:NO});txt(`${r.t} s`,R.x+u*.64,cy,12,{w:800,col:slow?'#b45309':INK});
  if(m)txt('HARD',R.x+u-10,cy,11,{w:800,col:'#92400e',al:'right'});else txt('tap to mark',R.x+u-10,cy,10,{col:'#475569',al:'right'})});
 txt(`Slow = more than ${SLOW} s`,A.W/2,A.H*.93,11,{al:'center',col:A.col.tx})}
function toggle(i){const s=Z.a;if(s.ok)return tell('All marked. The 4 hard parts are 6 × 7, 7 × 8, 8 × 6 and 8 × 7.');s.mk[i]=!s.mk[i];s.bad=-1;s.msg='';A.sound.tick();
 const r=QUIZ[i];tell(`${r.q} ${s.mk[i]?'marked as hard':'unmarked'}. ${s.mk.filter(Boolean).length} marked.`)}
function checkMarks(){const s=Z.a;if(s.ok)return;const miss=QUIZ.findIndex((r,i)=>hard(r)&&!s.mk[i]&&r.g!==r.a),slow=QUIZ.findIndex((r,i)=>hard(r)&&!s.mk[i]),extra=QUIZ.findIndex((r,i)=>!hard(r)&&s.mk[i]);
 const fail=(i,m)=>{s.bad=i;s.msg=m;A.sound.miss();tell(m)};
 if(miss>=0)return fail(miss,`${QUIZ[miss].q} = ${QUIZ[miss].g} is wrong: it is ${QUIZ[miss].a}. A wrong answer is a hard part.`);
 if(slow>=0)return fail(slow,`${QUIZ[slow].q} was right, but it took ${QUIZ[slow].t} s. Slow means Ana had to work it out: that is still a hard part.`);
 if(extra>=0)return fail(extra,`${QUIZ[extra].q} was right in ${QUIZ[extra].t} s. That one is fluent: leave it unmarked.`);
 s.ok=true;s.bad=-1;s.msg='';A.sound.pop();tell('Yes: 7 × 8 and 8 × 7 were wrong, and 6 × 7 and 8 × 6 were right but slow. Those 4 are the hard part.')}
/* ---------- 2. the step that goes wrong ---------- */
function drawLeo(){const s=Z.b,g=A.ctx;bg();const all=s.i>=wrongSums.length;
 title(s.q?'Leo\u2019s hard part: exchanging':all?LEOQ.q:`Wrong sum ${s.i+1} of 3: which step went wrong?`,{ok:s.q,no:s.bad>=0});
 const w=(A.W-16-4*6)/5;SUMS.forEach((S,k)=>{const r={x:8+k*(w+6),y:A.H*.13,w,h:A.H*.11},ok=S.leo===S.a-S.b,found=wrongSums.indexOf(S)<s.i&&!ok;
  card(r,{fill:ok?'#ffffff':found?'#dcfce7':'#fee2e2',edge:ok?LINE:found?YES:NO});txt(`${S.a}−${S.b}`,r.x+r.w/2,r.y+r.h*.33,11,{al:'center',w:800});
  txt(ok?`${S.leo} right`:found?'found':`${S.leo} wrong`,r.x+r.w/2,r.y+r.h*.72,10,{al:'center',col:ok?YES:found?YES:NO,w:800})});
 if(all){txt('All 3 slipped at the same step.',A.W/2,A.H*.4,14,{al:'center',w:800,col:A.col.tx});txt('Everything else Leo did was right.',A.W/2,A.H*.5,12,{al:'center',col:A.col.tx});
  if(!s.q)stack(LEOQ.opts,A.H*.62).forEach(r=>optDraw(r,s.bad===r.i));return}
 const S=wrongSums[s.i],cx=A.W/2,top=A.H*.33,lh=Math.min(A.H*.085,40),dx=lh*.7;card({x:cx-lh*2.2,y:top-lh*.6,w:lh*4.4,h:lh*3.9},{rad:12});
 const dig=(n,row,col)=>{const t=String(n).padStart(2,' ');[0,1].forEach(j=>txt(t[j],cx-dx*.5+j*dx,top+row*lh,26,{al:'center',w:800,col:col||INK}))};
 dig(S.a,0);dig(S.b,1);txt('−',cx-dx*1.7,top+lh,24,{al:'center',w:800});g.strokeStyle=INK;g.lineWidth=2.5;g.beginPath();g.moveTo(cx-dx*2,top+lh*1.55);g.lineTo(cx+dx*1.5,top+lh*1.55);g.stroke();
 dig(S.leo,2,NO);txt('Leo',cx+dx*1.6,top+lh*2,11,{col:NO,w:800});
 if(s.hint){g.strokeStyle='#b45309';g.lineWidth=3;g.strokeRect(cx+dx*.5-dx*.45,top-lh*.45,dx*.9,lh*1.85)}
 stack(STEPS,A.H*.68).forEach(r=>optDraw(r,s.bad===r.i))}
function pickStep(k){const s=Z.b;if(s.i>=wrongSums.length)return;const S=wrongSums[s.i],o1=S.a%10,o2=S.b%10;
 if(k!==1){s.bad=k;s.hint=true;A.sound.miss();return tell(k===0?STEPBAD[0]:`Leo\u2019s tens are fine for what he wrote. The first slip is in the ones: ${o1} − ${o2} needs an exchange, and he did ${o2} − ${o1} instead.`)}
 s.bad=-1;s.hint=false;s.i++;A.sound.pop();
 tell(`Yes: ${o1} − ${o2} can\u2019t be done, so Leo needed to exchange a ten for ten ones (${o1+10} − ${o2} = ${o1+10-o2}). He did ${o2} − ${o1} = ${o2-o1}. The answer is ${S.a-S.b}.`+(s.i<wrongSums.length?' Next wrong sum.':` ${LEOQ.q}`))}
function pickLeo(k){const s=Z.b;if(s.i<wrongSums.length)return tell('Find the slip in all 3 wrong sums first.');if(s.q)return;
 if(k!==LEOQ.ans){s.bad=k;A.sound.miss();return tell(LEOQ.bad[k])}s.q=true;s.bad=-1;A.sound.pop();tell('Yes: practise sums that need an exchange. Leo\u2019s hard part is one step, not all of subtraction.')}
/* ---------- 3. build the plan ---------- */
const BANK=[...HARD,...EASY];
function slotR(i){const cols=5,w=(A.W-16-4*6)/cols,h=A.H*.1;return{x:8+(i%cols)*(w+6),y:A.H*.17+Math.floor(i/cols)*(h+6),w,h}}
function bankR(i){const cols=4,w=(A.W-16-3*7)/cols,h=A.H*.1;return{x:8+(i%cols)*(w+7),y:A.H*.6+Math.floor(i/cols)*(h+7),w,h}}
const hardN=()=>Z.c.plan.filter(f=>HARD.includes(f)).length;
function drawPlan(){const s=Z.c;bg();title(s.ok?`Good plan: ${hardN()} of 10 on the hard part`:s.msg?'Not yet: look at the plan':`Tomorrow\u2019s 10 tries: ${s.plan.length} filled`,{ok:s.ok,no:!!s.msg&&!s.ok});
 for(let i=0;i<SLOTS;i++){const r=slotR(i),f=s.plan[i];card(r,{fill:f?(HARD.includes(f)?AMB:SKY):'#f1f5f9',edge:LINE,lw:f?1.4:1});
  txt(f||String(i+1),r.x+r.w/2,r.y+r.h/2,f?12:11,{al:'center',w:f?800:600,col:f?INK:'#475569'})}
 const y=A.H*.43,w=A.W-16,hn=hardN();card({x:8,y,w,h:A.H*.06},{fill:'#ffffff'});A.ctx.fillStyle='#f59e0b';A.ctx.fillRect(10,y+2,(w-4)*hn/SLOTS,A.H*.06-4);
 txt(`Hard part: ${hn} of 10 tries (aim for ${NEED} or more)`,A.W/2,y+A.H*.03,12,{al:'center',w:800});
 txt('Tap a card to add it. Tap a slot to take it out.',A.W/2,A.H*.555,11,{al:'center',col:A.col.tx});
 BANK.forEach((f,i)=>{const r=bankR(i),h=HARD.includes(f);card(r,{fill:h?AMB:SKY});txt(f,r.x+r.w/2,r.y+r.h*.4,13,{al:'center',w:800});txt(h?'hard':'easy',r.x+r.w/2,r.y+r.h*.76,10,{al:'center',col:h?'#92400e':'#1e3a8a'})})}
function addFact(f){const s=Z.c;if(s.ok)return tell('The plan is done.');if(s.plan.length>=SLOTS)return tell('All 10 slots are full. Tap a slot to take one out.');s.plan.push(f);s.msg='';A.sound.tick();
 tell(`Added ${f}. ${s.plan.length} of 10 filled, ${hardN()} on the hard part.`)}
function takeOut(i){const s=Z.c;if(s.ok||i>=s.plan.length)return;const f=s.plan.splice(i,1)[0];s.msg='';A.sound.tick();tell(`Took out ${f}. ${s.plan.length} of 10 filled.`)}
function sameQuiz(){const s=Z.c;if(s.ok)return;s.plan=QUIZ.map(r=>r.q);s.msg='same';A.sound.miss();
 tell(`That is the same quiz again: only ${hardN()} of 10 tries are on the hard part, and 6 go on facts Ana already knows. Clear it and build a better one.`)}
function clearPlan(){const s=Z.c;if(s.ok)return;s.plan=[];s.msg='';A.sound.tick();tell('Plan cleared. 10 empty slots.')}
function checkPlan(){const s=Z.c;if(s.ok)return;const fail=m=>{s.msg=m;A.sound.miss();tell(m)};
 if(s.plan.length<SLOTS)return fail(`Fill all 10 slots first: ${SLOTS-s.plan.length} still empty.`);const hn=hardN();
 if(hn<NEED)return fail(`Only ${hn} of 10 tries are on the hard part. The other ${SLOTS-hn} go on facts Ana already knows.`);
 const gap=HARD.find(f=>!s.plan.includes(f));if(gap)return fail(`${gap} is not in the plan. Every hard fact needs a go.`);
 s.ok=true;s.msg='';A.sound.pop();tell(`Good plan: ${hn} of 10 tries on the hard part, and every hard fact gets a go.`)}
/* ---------- 4. two plans, five days ---------- */
const level=(p,k,d)=>Math.min(100,START[k]+GAIN*d*PLANS[p].hard/4);
function drawRace(){const s=Z.d,g=A.ctx;bg();const fin=s.day>=DAYS;title(s.q?'Plan B wins: tries went where they help':fin?RACEQ.q:`Day ${s.day} of ${DAYS}: tap Next day`,{ok:s.q,no:s.bad>=0});
 const top=A.H*.15,bot=A.H*(fin&&!s.q?.7:.78),pw=(A.W-24)/2;
 PLANS.forEach((P,p)=>{const x0=8+p*(pw+8);card({x:x0,y:top,w:pw,h:bot-top+A.H*.11},{rad:12});txt(p?'Plan B':'Plan A',x0+pw/2,top+z(12),13,{al:'center',w:800});
  txt(p?'mostly hard facts':'whole quiz again',x0+pw/2,top+z(27),10,{al:'center',col:'#475569'});
  const y0=top+z(50),y1=bot-z(14),bw=pw/4*.62;g.strokeStyle=YES;g.setLineDash([4,3]);g.lineWidth=1.5;g.beginPath();g.moveTo(x0+6,y0);g.lineTo(x0+pw-6,y0);g.stroke();g.setLineDash([]);
  txt('fluent',x0+pw-6,y0-z(7),9,{al:'right',col:YES});
  HARD.forEach((f,k)=>{const v=level(p,k,s.day),bx=x0+pw*(k+.5)/4-bw/2,h=(y1-y0)*v/100;g.fillStyle=v>=100?'#10b981':'#f59e0b';g.fillRect(bx,y1-h,bw,h);g.strokeStyle=INK;g.lineWidth=1;g.strokeRect(bx,y1-h,bw,h);
   txt(f,bx+bw/2,y1+z(8),9,{al:'center',w:800})});
  txt(`Hard tries a day: ${P.hard}`,x0+pw/2,bot+z(10),10,{al:'center',w:800});txt(`Already-easy tries: ${10-P.hard}`,x0+pw/2,bot+z(24),10,{al:'center',col:'#475569'})});
 if(fin&&!s.q)opts(RACEQ.opts).forEach(r=>optDraw(r,s.bad===r.i));else txt('A picture of the idea, not real data',A.W/2,A.H*.96,10,{al:'center',col:A.col.tx})}
function nextDay(){const s=Z.d;if(s.day>=DAYS)return tell(s.q?'Done.':RACEQ.q);s.day++;A.sound.tick();
 const fa=HARD.filter((f,k)=>level(0,k,s.day)>=100).length,fb=HARD.filter((f,k)=>level(1,k,s.day)>=100).length;
 tell(`Day ${s.day}: Plan A has ${fa} of 4 hard facts fluent, Plan B has ${fb} of 4.`+(s.day>=DAYS?' '+RACEQ.q:''))}
function pickRace(k){const s=Z.d;if(s.day<DAYS)return tell('Run all 5 days first.');if(s.q)return;if(k!==RACEQ.ans){s.bad=k;A.sound.miss();return tell(RACEQ.bad)}
 s.q=true;s.bad=-1;A.sound.pop();tell('Yes: 6 of Plan A\u2019s 10 tries a day went on facts Ana already knew. Plan B fixed all 4 hard facts by day 4.')}
/* ---------- 5. recheck and re-sort ---------- */
function binR(i){const w=(A.W-24)/2;return{x:8+i*(w+8),y:A.H*.62,w,h:A.H*.3}}
function curR(){return{x:A.W/2-A.W*.22,y:A.H*.2,w:A.W*.44,h:A.H*.24}}
const keep=r=>r.g!==r.a||r.t>SLOW;
function drawRecheck(){const s=Z.e,g=A.ctx;bg();const all=s.i>=RECHECK.length;title(all?'Sorted: the hard part has moved':`Card ${s.i+1} of ${RECHECK.length}: which box?`,{ok:all,no:s.bad});
 BINS.forEach((b,i)=>{const r=binR(i);card(r,{rad:12,fill:i?'#dcfce7':AMB,edge:s.bad&&i===s.badBin?NO:LINE,lw:s.bad&&i===s.badBin?3:1.4});b.split(': ').forEach((t,j)=>txt(t+(j||!i?'':':'),r.x+r.w/2,r.y+z(13)+j*z(14),11,{al:'center',w:800}));
  s.bins[i].forEach((q,j)=>txt(q,r.x+r.w/2,r.y+z(44)+j*z(17),12,{al:'center',w:800}))});
 if(all)return;const R=RECHECK[s.i],r=curR(),d=drag?{x:drag.x-r.w/2,y:drag.y-r.h/2}:r;card({x:d.x,y:d.y,w:r.w,h:r.h},{rad:12,lw:2.5,edge:'#6d28d9'});
 txt(`${R.q} = ${R.g}`,d.x+r.w/2,d.y+r.h*.3,17,{al:'center',w:800});txt(R.g===R.a?'right':'wrong',d.x+r.w*.3,d.y+r.h*.66,13,{al:'center',w:800,col:R.g===R.a?YES:NO});
 txt(`${R.t} s`,d.x+r.w*.72,d.y+r.h*.66,13,{al:'center',w:800,col:R.t>SLOW?'#b45309':INK});if(!drag)txt('drag me into a box',A.W/2,A.H*.5,10,{al:'center',col:A.col.tx})}
function place(bin){const s=Z.e;if(s.i>=RECHECK.length)return;const R=RECHECK[s.i],want=keep(R)?0:1;
 if(bin!==want){s.bad=true;s.badBin=bin;A.sound.miss();
  return tell(want===0?(R.g!==R.a?`${R.q} = ${R.g} is wrong: it is ${R.a}. That is a new hard part: keep practising it.`:`${R.q} was right, but ${R.t} s is still slower than ${SLOW} s. Keep it in the plan.`):`${R.q} was right in ${R.t} s: fluent now. Take it out of daily practice, and check it now and then so it stays easy.`)}
 s.bins[bin].push(R.q);s.i++;s.bad=false;A.sound.pop();tell(`${R.q} goes in ${bin?'Easy now':'Keep practising'}.`+(s.i<RECHECK.length?' Next card.':' The new plan: 8 × 6 and 7 × 9.'))}
/* ---------- wiring ---------- */
function draw(){const k=stage();if(k==='chal'){bg();title('Challenge',{ok:1});END.forEach((t,i)=>txt(`${i+1}. ${t}`,A.W/2,A.H*(.25+i*.15),13,{al:'center',w:800,col:A.col.tx}));return}
 ({quiz:drawQuiz,leo:drawLeo,plan:drawPlan,race:drawRace,recheck:drawRecheck})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='quiz'){const R=rows().find(r=>within(p,r));if(R)toggle(R.i);return false}
 if(k==='leo'){const s=Z.b;if(s.i<wrongSums.length){const r=stack(STEPS,A.H*.68).find(q=>within(p,q));if(r)pickStep(r.i)}else if(!s.q){const r=stack(LEOQ.opts,A.H*.62).find(q=>within(p,q));if(r)pickLeo(r.i)}return false}
 if(k==='plan'){for(let i=0;i<SLOTS;i++)if(within(p,slotR(i)))return takeOut(i),false;const b=BANK.findIndex((f,i)=>within(p,bankR(i)));if(b>=0)addFact(BANK[b]);return false}
 if(k==='race'){if(Z.d.day<DAYS)nextDay();else{const r=opts(RACEQ.opts).find(q=>within(p,q));if(r)pickRace(r.i)}return false}
 if(k==='recheck'){if(Z.e.i>=RECHECK.length)return false;const b=[0,1].find(i=>within(p,binR(i)));if(b!=null)return place(b),false;if(within(p,curR())){drag={x:p.x,y:p.y};A.redraw();return true}}
 return false}
function move(p){if(!drag)return;drag={x:p.x,y:p.y};A.redraw()}
function up(p){if(!drag)return;const b=[0,1].find(i=>within(p,binR(i)));drag=null;if(b!=null)place(b);else{A.redraw();c.say('Drop the card on a box.')}}
function reset(){gen++;drag=null;for(const k in Z)delete Z[k];Object.assign(Z,{a:{mk:QUIZ.map(()=>false),ok:false,bad:-1,msg:''},b:{i:0,q:false,bad:-1,hint:false},c:{plan:[],ok:false,msg:''},d:{day:0,q:false,bad:-1},e:{i:0,bins:[[],[]],bad:false,badBin:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctrls();Z.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);Z.check=finish(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const e=gen;acts.forEach((f,j)=>setTimeout(()=>{if(e===gen)f()},ms*(j+1)))}
function ctrls(){if(!pad)return;pad.innerHTML='';const k=stage(),B=(t,f,l,pr)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t);if(pr!=null)b.setAttribute('aria-pressed',String(pr));b.onclick=f};
 if(k==='quiz'&&!Z.a.ok){QUIZ.forEach((r,i)=>B(`Q${i+1} ${r.q}`,()=>toggle(i),`Q${i+1} ${r.q}: ${r.g===r.a?'right':'wrong'}, ${r.t} seconds. Mark as hard`,Z.a.mk[i]));B('Check my marks',checkMarks)}
 if(k==='leo'){const s=Z.b;if(s.i<wrongSums.length)STEPS.forEach((t,i)=>B(t,()=>pickStep(i)));else if(!s.q)LEOQ.opts.forEach((t,i)=>B(t,()=>pickLeo(i)))}
 if(k==='plan'&&!Z.c.ok){BANK.forEach(f=>B(`Add ${f}`,()=>addFact(f)));B('Same quiz again',sameQuiz);B('Clear plan',clearPlan);B('Check plan',checkPlan)}
 if(k==='race'){const s=Z.d;if(s.day<DAYS)B('Next day',nextDay);else if(!s.q)RACEQ.opts.forEach((t,i)=>B(t,()=>pickRace(i)))}
 if(k==='recheck'&&Z.e.i<RECHECK.length){const q=RECHECK[Z.e.i].q;BINS.forEach((b,i)=>B(b,()=>place(i),`${b}: ${q}`))}}
const steps=[
{h:'Mark the hard ones',p:TXT[0],predict:{q:'Ana scored 8 out of 10. What should her next practice be on?',opts:['Only the 2 she got wrong','The wrong ones and the slow ones'],ans:1},task:'Mark all the hard ones and check',
 show:()=>auto(0,[...QUIZ.map((r,i)=>hard(r)?()=>toggle(i):null).filter(Boolean),checkMarks],350),go:()=>begin(0,()=>Z.a.ok)},
{h:'Find the step',p:TXT[1],predict:{q:'Leo got 3 of 5 sums wrong. What is his hard part?',opts:['Subtraction: all of it','One step inside the sums'],ans:1},task:'Find the slip in all 3, then choose',
 show:()=>auto(1,[...wrongSums.map(()=>()=>pickStep(1)),()=>pickLeo(0)],420),go:()=>begin(1,()=>Z.b.q)},
{h:'Plan the practice',p:TXT[2],task:'Build a plan and check it',
 show:()=>auto(2,[...[...HARD,...HARD,EASY[0],EASY[1]].map(f=>()=>addFact(f)),checkPlan],220),go:()=>begin(2,()=>Z.c.ok)},
{h:'Two plans, five days',p:TXT[3],predict:{q:'Which plan makes the hard facts fluent sooner?',opts:['Plan A: the whole quiz again','Plan B: mostly the hard facts'],ans:1},task:'Run 5 days and answer',
 show:()=>auto(3,[...Array(DAYS)].map(()=>nextDay).concat([()=>pickRace(0)]),300),go:()=>begin(3,()=>Z.d.q)},
{h:'Check again',p:TXT[4],task:'Sort all 5 new results',show:()=>auto(4,RECHECK.map(r=>()=>place(keep(r)?0:1)),400),go:()=>begin(4,()=>Z.e.i>=RECHECK.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
function why(t){let m='Look at what went wrong or slow, and put the practice there.';
 if(t==='onlywrong')m='A right answer can still be hard. If it was slow, you had to work it out: practise it until it is quick.';
 if(t==='redo')m='Redoing everything spends most tries on what you can already do. Pick out the hard parts first.';
 if(t==='easyfeel')m='Easy practice feels good, but it changes little. The tries that help are on the part you find hard.';
 if(t==='avoid')m='Skipping the hard part keeps it hard. Find it, then practise it on purpose.';
 if(t==='whole')m='The hard part is often one step, not the whole topic. Practise that step.';
 if(t==='forever')m='Once a fact is quick and right, daily practice on it is wasted. Check it now and then instead.';
 if(t==='drop')m='Never looking again lets it fade. A quick check now and then keeps it easy.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge. The four moves: '+END.join('. ')+'.');A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;ctrls()},
 init:X=>{A=X;({bg,txt,card,title,opts,optDraw}=HARDPART_DRAW(A));const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Hard part lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrls()}}).start()})})();
