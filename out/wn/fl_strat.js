/* Flagship – choosing a strategy (ages 9–10). Match tasks to study tools, run a week of three revision plans and compare
   "felt sure" with the Friday score, say the plan and the reason, judge strategies on proof, then try, check and switch. */
(()=>{
const TOOLS=[{n:'Test yourself',e:'🃏',good:'remembering facts'},{n:'Mind map',e:'🕸️',good:'sorting lots of ideas'},{n:'Draw a diagram',e:'✏️',good:'seeing how the steps of a process fit'},{n:'Worked example',e:'🧮',good:'learning a new method'}];
const MATCH=[['Learn 10 spellings for Friday',0],['Sort ideas for a story about the sea',1],['Understand the steps of the water cycle',2],['Learn a new way to do long multiplication',3]];
const PLANS=[{n:'Re-read the list 5 times',days:[1],felt:9,score:4},{n:'Test yourself 5 times, all on Monday',days:[1],felt:6,score:6},{n:'Test yourself 3 short times, on 3 days',days:[1,3,5],felt:6,score:9}];
const SAY=[{t:'Revise 12 science words',s:['test myself','re-read my notes','colour in my notes'],why:['I will find the words I do not know yet','it looks neat','it is quick']},
 {t:'Plan a report about volcanoes',s:['make a mind map','test myself','copy the book'],why:['there is a lot to organise','I like my new pens','it was the first idea I had']},
 {t:'Learn a new kind of fraction problem',s:['study a worked example first','re-read the question','guess and hope'],why:['I can follow each step, then try my own','it is shorter','I did that yesterday']}];
const VERD=['Keep it: the proof says it worked','Switch: it felt good, but the proof says no','Not sure yet: check first'];
const EVAL=[{who:'Ali re-read his notes for a science quiz.',felt:'He felt very sure.',proof:'Quiz score: 4 out of 10.',a:1},
 {who:'Mia drew a diagram of the water cycle.',felt:'It felt slow.',proof:'Then she explained it all to her dad without looking.',a:0},
 {who:'Sam made a mind map of the 7 times table.',felt:'It felt fun.',proof:'He has not checked himself yet.',a:2}];
const LOOP=[{t:'Learn 8 French animal words',o:[['Re-read the list',4],['Test yourself with cards',9],['Copy them out neatly',5]]},
 {t:'Get better at long division',o:[['Watch a friend do it',3],['Read the rules again',4],['Worked example, then try one',8]]},
 {t:'Remember the order of the planets',o:[['Make up a silly sentence',9],['Stare at the poster',3],['Re-read the page',4]]}];
VIS.reg('flagstrat',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;
const blank=()=>({r:0,n:0,busy:0,bad:-1,drag:null,after:()=>{},ran:[],slot:0,pick:[],v:-1,tri:-1,out:[],fast:0}),S=blank();
const phase=()=>['match','week','say','judge','loop','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),quick=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,maxw,px,col,wt,al){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*z(px)*1.25))}
function tile(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(5,2,.12);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();if(dash)g.setLineDash([6,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
function emoji(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
const rows=(n,y0)=>{const h=z(50);return Array.from({length:n},(_,j)=>({x:18,y:y0+j*(h+10),w:A.W-36,h}))};
const grid=()=>{const w=(A.W-46)/2,h=z(72),y0=A.H*.5;return TOOLS.map((_,i)=>({x:18+(i%2)*(w+10),y:y0+Math.floor(i/2)*(h+12),w,h}))};
const card=()=>({x:A.W/2,y:A.H*.24});
const runBox=()=>({x:18,y:A.H*.1+3*(z(50)+10)+6,w:A.W-36,h:z(56)});
const rot=(a,k)=>a.map((_,i)=>(i+k)%a.length);/* display order for round k */
const sayOpts=()=>{const q=SAY[S.r],src=S.slot?q.why:q.s;return rot(src,S.r+S.slot).map(i=>[src[i],i])};
const loopOpts=()=>LOOP[S.r].o.map((o,i)=>[o,i]);
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag;
 if(p==='quiz'){write(g,'Plan it, name it, check it, then keep it or switch.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='match'){const m=MATCH[S.r];write(g,'Which tool fits this task? Drag the card.',W/2,H*.06,W-30,15,C.mu,700);
  grid().forEach((r,i)=>{const t=TOOLS[i];tile(g,r,S.bad===i?A.mix(C.pn,C.rd,.22):A.mix(C.pn,C.vi,.1),S.bad===i?C.rd:C.vi,2.5);emoji(g,t.e,r.x+z(24),r.y+r.h/2,z(24));write(g,t.n,r.x+r.w/2+z(14),r.y+r.h/2,r.w-z(56),14,C.tx,800)});
  if(!S.busy){const at=d&&d.x!=null?d:card(),r={x:at.x-z(130),y:at.y-z(40),w:z(260),h:z(80)};tile(g,r,A.mix(C.pn,C.am,.2),C.am,3);write(g,m[0],at.x,at.y,r.w-20,16,C.tx,800)}
  else write(g,`${MATCH[S.r][0]} → ${TOOLS[m[1]].n}`,W/2,H*.24,W-40,16,C.gr,800)}
 if(p==='week'){const rb=runBox(),at=d&&d.x!=null?d:null;write(g,'Drag a plan into the week, or tap it.',W/2,H*.04,W-30,14,C.mu,700);
  rows(3,H*.1).forEach((r,i)=>{const done=S.ran.includes(i);if(at&&d.i===i)return;tile(g,r,done?A.mix(C.pn,C.gr,.1):C.pn,done?C.gr:C.am,2.5);write(g,`${i+1}. ${PLANS[i].n}`,r.x+12,r.y+r.h/2,r.w-24,14,C.tx,800,'left')});
  tile(g,rb,A.alpha(C.cy,.06),C.cy,2,1);'MTWTF'.split('').forEach((ch,k)=>{const x=rb.x+rb.w*(k+.5)/5,last=S.ran[S.ran.length-1],on=last!=null&&PLANS[last].days.includes(k+1);
   g.fillStyle=on?C.am:A.alpha(C.ln,.6);g.beginPath();g.arc(x,rb.y+rb.h*.42,z(on?11:7),0,7);g.fill();write(g,ch,x,rb.y+rb.h*.82,30,11,C.mu,700)});
  if(at){const r={x:at.x-z(120),y:at.y-z(22),w:z(240),h:z(44)};tile(g,r,A.mix(C.pn,C.am,.2),C.am,3);write(g,PLANS[d.i].n,at.x,at.y,r.w-16,13,C.tx,800)}
  const by=H*.95,top=rb.y+rb.h+z(44),bw=Math.min(z(26),W/14);PLANS.forEach((pl,i)=>{const cx=W*(i+.5)/3;write(g,'Plan '+(i+1),cx,by+z(4),W/3,12,C.tx,800);if(!S.ran.includes(i))return;
   [[pl.felt,C.am],[pl.score,C.gr]].forEach(([v,col],k)=>{const h=(by-z(36)-top)*v/10,x=cx+(k?4:-bw-4);g.fillStyle=col;g.fillRect(x,by-z(14)-h,bw,h);write(g,v,x+bw/2,by-z(24)-h,bw+10,12,C.tx,800)})});
  g.fillStyle=C.am;g.fillRect(18,top-z(18),12,12);write(g,'felt sure',36,top-z(12),90,12,C.tx,700,'left');g.fillStyle=C.gr;g.fillRect(W/2,top-z(18),12,12);write(g,'Friday score /10',W/2+18,top-z(12),140,12,C.tx,700,'left')}
 if(p==='say'){const q=SAY[S.r],a=S.pick[0]!=null?q.s[S.pick[0]]:'_____',b=S.pick[1]!=null?q.why[S.pick[1]]:'_____';write(g,'Task: '+q.t,W/2,H*.06,W-30,15,C.tx,800);
  const r={x:18,y:H*.13,w:W-36,h:z(84)};tile(g,r,A.mix(C.pn,C.vi,.08),S.busy?C.gr:C.vi,2.5);write(g,`I'll ${a} because ${b}.`,W/2,r.y+r.h/2,r.w-24,15,C.tx,800);
  if(!S.busy){write(g,S.slot?'Pick the best reason:':'Pick a strategy:',W/2,H*.38,W-30,14,C.mu,700);rows(3,H*.43).forEach((r,j)=>{const[o]=sayOpts()[j];tile(g,r,S.bad===j?A.mix(C.pn,C.rd,.22):C.pn,S.bad===j?C.rd:C.am,2.5);write(g,o,W/2,r.y+r.h/2,r.w-20,14,C.tx,800)})}}
 if(p==='judge'){const e=EVAL[S.r],r={x:18,y:H*.04,w:W-36,h:H*.34};tile(g,r,C.pn,C.ln,2);write(g,e.who,W/2,r.y+r.h*.2,r.w-20,15,C.tx,800);
  write(g,'😊 '+e.felt,W/2,r.y+r.h*.5,r.w-20,14,C.am,800);write(g,'🔎 '+e.proof,W/2,r.y+r.h*.8,r.w-20,14,C.gr,800);
  rows(3,H*.45).forEach((b,j)=>{const on=S.v===j;tile(g,b,S.bad===j?A.mix(C.pn,C.rd,.22):on?A.mix(C.pn,C.gr,.18):C.pn,S.bad===j?C.rd:on?C.gr:C.vi,on?3.5:2.5);write(g,VERD[j],W/2,b.y+b.h/2,b.w-20,14,C.tx,800)})}
 if(p==='loop'){const q=LOOP[S.r];write(g,'Task: '+q.t,W/2,H*.05,W-30,15,C.tx,800);write(g,S.tri<0?'Pick a strategy to try.':'Check done. Keep it or switch?',W/2,H*.11,W-30,13,C.mu,700);
  rows(3,H*.16).forEach((r,j)=>{const o=q.o[j],out=S.out.includes(j),on=S.tri===j;if(out)g.globalAlpha=.4;tile(g,r,S.bad===j?A.mix(C.pn,C.rd,.22):on?A.mix(C.pn,C.am,.2):C.pn,on?C.am:C.ln,on?3.5:2);write(g,(out?'✗ ':'')+o[0],W/2,r.y+r.h/2,r.w-20,14,C.tx,800);g.globalAlpha=1});
  if(S.tri>=0){const sc=q.o[S.tri][1],bx=18,bw=W-36,y=H*.62;write(g,`Check: ${sc} out of 10`,W/2,y-z(18),W-30,16,sc>=7?C.gr:C.rd,800);g.fillStyle=A.alpha(C.ln,.4);g.fillRect(bx,y,bw,z(18));g.fillStyle=sc>=7?C.gr:C.rd;g.fillRect(bx,y,bw*sc/10,z(18));
   g.strokeStyle=C.tx;g.setLineDash([4,3]);g.beginPath();g.moveTo(bx+bw*.7,y-6);g.lineTo(bx+bw*.7,y+z(24));g.stroke();g.setLineDash([]);write(g,'goal 7',bx+bw*.7,y+z(34),80,11,C.tx,700)}
  if(S.busy)write(g,'Kept a strategy that works.',W/2,H*.85,W-30,15,C.gr,800)}
 A.fx.draw(g)}
function miss(t,j){A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1300);A.redraw()}
function yes(t,stay){S.n++;A.sound.pop();if(S.n<3&&!stay){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,slot:0,pick:[],v:-1,tri:-1,out:[]});say(t+' Next one.');buttons();A.redraw()},quick()?5:1500)}else S.busy=!stay;say(t);buttons();A.redraw();S.after()}
function match(i){if(phase()!=='match'||S.busy)return;const m=MATCH[S.r];if(i!==m[1])return miss(`${TOOLS[i].n} is best for ${TOOLS[i].good}. This task is about ${TOOLS[m[1]].good}.`,i);yes(`Yes: ${TOOLS[i].n} fits, because the task is about ${TOOLS[i].good}.`)}
function run(i){if(phase()!=='week'||S.busy||S.ran.includes(i))return;const p=PLANS[i];S.ran.push(i);A.sound.tick();
 const m=i===0?'Felt sure: 9. Friday score: 4. Re-reading feels easy, so it fools you.':i===1?'Felt sure: 6. Score: 6. Testing helps, but it was all crammed into one day.':'Felt sure: 6. Score: 9. Short tests spread over the week worked best.';yes(m,1)}
function choose(j){if(phase()!=='say'||S.busy)return;const q=SAY[S.r],[o,i]=sayOpts()[j];
 if(!S.slot){if(i)return miss(`"${o}" does not fit "${q.t}". Which one really helps with this task?`,j);S.pick[0]=0;S.slot=1;A.sound.tick();say('Good. Now pick the reason.');return A.redraw()}
 if(i)return miss(`"Because ${o}" says nothing about how it helps with the task. Pick a reason about the task.`,j);S.pick[1]=0;yes(`I'll ${q.s[0]} because ${q.why[0]}.`)}
function judge(j){if(phase()!=='judge'||S.busy)return;const e=EVAL[S.r];if(j!==e.a){let m='Look at the proof, not the feeling.';
  if(j===0)m=e.a===1?'Feeling sure is not proof. The quiz says it did not work.':'Fun is not proof. Nobody has checked yet.';
  if(j===1)m=e.a===0?'Slow is fine. The proof says it worked: she explained it without looking.':'There is no proof either way yet. Check first.';
  if(j===2)m=e.a===1?'There is proof already: 4 out of 10. That is enough to switch.':'There is proof already: she explained it all. Keep it.';return miss(m,j)}
 S.v=j;yes(['Keep it. The proof is good, even though it felt slow.','Switch. Feeling sure is not the same as knowing.','Not sure yet. Test yourself before you decide.'][j])}
function tryIt(j){if(phase()!=='loop'||S.busy||S.tri>=0||S.out.includes(j))return;S.tri=j;A.sound.tick();say(`You tried ${LOOP[S.r].o[j][0]}. Check: ${LOOP[S.r].o[j][1]} out of 10. Keep it or switch?`);buttons();A.redraw()}
function verdict(keep){if(phase()!=='loop'||S.busy||S.tri<0)return;const sc=LOOP[S.r].o[S.tri][1];
 if(keep&&sc<7)return miss(`${sc} out of 10 is below the goal. Be honest: switch to a different strategy.`);if(!keep&&sc>=7)return miss(`${sc} out of 10 beats the goal. It worked, so keep it.`);
 if(!keep){S.out.push(S.tri);S.tri=-1;A.sound.tick();say('Switched. Pick a different strategy to try.');buttons();return A.redraw()}yes(`Kept: ${sc} out of 10.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=3||S.busy)return;
 if(p==='match')TOOLS.forEach((t,i)=>B(t.e+' '+t.n,()=>match(i),`Match the task to ${t.n}`));
 if(p==='week')PLANS.forEach((pl,i)=>{if(!S.ran.includes(i))B(`▶ Plan ${i+1}`,()=>run(i),`Run plan ${i+1}: ${pl.n}`)});
 if(p==='say')sayOpts().forEach(([o],j)=>B(o,()=>choose(j)));
 if(p==='judge')VERD.forEach((v,j)=>B(v.split(':')[0],()=>judge(j),v));
 if(p==='loop'){if(S.tri<0)loopOpts().forEach(([o,i])=>{if(!S.out.includes(i))B(o[0],()=>tryIt(i),'Try '+o[0])});else{B('✓ Keep it',()=>verdict(1));B('↻ Switch',()=>verdict(0))}}}
const within=(q,r,m)=>(m=m||0,q.x>r.x-m&&q.x<r.x+r.w+m&&q.y>r.y-m&&q.y<r.y+r.h+m);
function down(q){const p=phase();if(p==='quiz'||S.busy)return false;
 if(p==='match'){const k=card();if(Math.abs(q.x-k.x)<z(130)&&Math.abs(q.y-k.y)<z(40)){S.drag={x:null,x0:q.x,y0:q.y};return true}const i=grid().findIndex(r=>within(q,r));if(i>=0)match(i);return false}
 if(p==='week'){const i=rows(3,A.H*.1).findIndex(r=>within(q,r));if(i>=0&&!S.ran.includes(i)){S.drag={i,x:null,x0:q.x,y0:q.y};return true}return false}
 const hit=y0=>rows(3,y0).findIndex(r=>within(q,r));
 if(p==='say'){const j=hit(A.H*.43);if(j>=0)choose(j)}if(p==='judge'){const j=hit(A.H*.45);if(j>=0)judge(j)}if(p==='loop'&&S.tri<0){const j=hit(A.H*.16);if(j>=0)tryIt(j)}return false}
function move(q){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag,p=phase();S.drag=null;if(!d)return;
 if(p==='match'){if(d.x==null){say('Drag the card onto a tool, or tap a tool.');return A.redraw()}const i=grid().findIndex(r=>within(q,r,10));if(i>=0)match(i);else{say('Drop the card on a tool.');A.redraw()}return}
 if(p==='week'){if(d.x==null||within(q,runBox(),30))return run(d.i);say('Drop the plan in the week box.');A.redraw()}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(S.busy)return;if(p==='match')return match(MATCH[S.r][1]);if(p==='week')return run([0,1,2].find(i=>!S.ran.includes(i)));
 if(p==='say')return choose(sayOpts().findIndex(o=>o[1]===0));if(p==='judge')return judge(EVAL[S.r].a);
 if(p==='loop'){const q=LOOP[S.r];if(S.tri<0)return tryIt(q.o.findIndex((o,i)=>!S.out.includes(i)));return verdict(q.o[S.tri][1]>=7)}}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Match the tool',p:'Different tasks need different tools. Drag the task card onto the strategy that fits it best.',predict:{q:'To remember spellings for a test, which works better?',opts:['Reading the list again and again','Covering the list and testing yourself'],ans:1},task:'Match 3 tasks',show:show(0),
 go:()=>{reset();say('Which tool fits: learn 10 spellings for Friday?');buttons();S.after=finish(0,'Pick the tool for the job: testing for facts, mind maps for lots of ideas, diagrams for processes, worked examples for new methods.')}},
{h:'Feeling vs proof',p:'Three ways to revise 20 spellings in one week. Run each plan and compare how sure it felt with the Friday score. These are example results.',predict:{q:'Which plan will score best on Friday?',opts:['Re-reading the list 5 times','Short self-tests on 3 different days'],ans:1},task:'Run all 3 plans',show:show(1),
 go:()=>{reset();say('Drag plan 1 into the week.');buttons();S.after=finish(1,'Re-reading felt best but scored worst. Feeling sure is not proof. Spread-out self-testing won.')}},
{h:'Name it, say why',p:'Before you start, say your plan out loud: I will use this strategy because of this reason.',task:'Make 3 plans',show:show(2),
 go:()=>{reset();say('Pick a strategy for: revise 12 science words.');buttons();S.after=finish(2,'A good plan names the strategy and gives a reason about the task, not about pens or speed.')}},
{h:'Was it worth it?',p:'Read what happened. Did the strategy work? Judge on the proof, not on the feeling.',predict:{q:'Ali felt very sure after re-reading. Did his strategy work?',opts:['Yes, he felt sure','We need proof, like a quiz score'],ans:1},task:'Judge 3 strategies',show:show(3),
 go:()=>{reset();say('Ali re-read his notes. Did it work?');buttons();S.after=finish(3,'Keep what the proof backs, switch what the proof says failed, and check when there is no proof yet.')}},
{h:'Try, check, switch',p:'Pick a strategy, see the check score, then keep it or switch. The goal is 7 out of 10.',task:'Finish 3 tasks',show:show(4),
 go:()=>{reset();say('Pick a strategy to learn 8 French animal words.');buttons();S.after=finish(4,'Plan, try, check, then keep or switch. Switching after a poor check is smart, not giving up.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['You need to learn 15 capital cities. Which strategy fits best?',[['Test yourself with cards','ok'],['Make a poster','pretty'],['Read the list a lot','reread']]],
 ['You felt sure after re-reading, but scored 3 out of 10. What now?',[['Switch to testing myself','ok'],['Re-read more','reread'],['Give up on it','quit']]],
 ['Which is the best plan to say out loud?',[["I'll mind map it because there's a lot to organise",'ok'],["I'll mind map it because it's fun",'fun'],["I'll just start",'noplan']]],
 ['How do you know if a strategy worked?',[['Check yourself, like a quiz','ok'],['It felt easy','feel'],['It took a long time','time']]],
 ['Ten-minute self-tests on 3 days, or 30 minutes on one day?',[['3 days, spread out','ok'],['All on one day','cram'],['It makes no difference','same']]]];
function why(t){let m='Pick a strategy that fits the task, then check if it worked.';
 if(t==='pretty')m='A poster can look great but you might not remember it. Testing yourself makes facts stick.';if(t==='reread')m='Re-reading feels easy, so it tricks you. Testing yourself shows what you really know.';
 if(t==='quit')m='A poor score means switch strategy, not give up. Try testing yourself.';if(t==='fun')m='Fun is nice, but a reason should say how it helps with the task.';
 if(t==='noplan')m='Just starting skips the plan. Name the strategy and why it fits.';if(t==='feel')m='Easy can mean it is not sinking in. Check yourself to get proof.';
 if(t==='time')m='Time spent is not proof. A quick check shows if it worked.';if(t==='cram')m='Cramming feels fine but fades fast. Spread-out practice lasts longer.';
 if(t==='same')m='It does make a difference: spacing practice out over days helps you remember.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right. You chose with a reason and judged on proof.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
