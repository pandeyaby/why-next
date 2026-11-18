/* Flagship – spacing out practice (ages 11–12). A simplified forgetting model: after a study session recall falls as
   R = e^(−t/S); each review resets R to 100% and multiplies the memory's stability S by (1 + 2.5 × (1 − R)), so a review
   made when recall has faded helps far more than one made straight away. Plan four sessions on a 13-day calendar and
   see recall on test day and a month later (cramming days 10–13 keeps 25% on day 30, spreading them keeps about 50%),
   pick the best moment to review as memories get stronger, build an expanding schedule (+1, +3, +7 days), and sort
   spaced from massed study plans. Not a real memory: the shape follows Ebbinghaus and Cepeda et al. */
(()=>{
const S0=1.5,GAIN=2.5;
function model(days,t){let S=S0,last=0;for(const d of days){if(d>t)break;const R=Math.exp(-(d-last)/S);S*=1+GAIN*(1-R);last=d}return Math.exp(-(t-last)/S)}
const pct=v=>Math.round(v*100)+'%';
const WHEN=[{S:2,note:'After the first study'},{S:5,note:'After one review'},{S:10,note:'After two reviews'}],DAYS=[0,1,2,4,7,12];
const GAPS=[1,3,7];
const PLANS=[['Read your notes five times the night before',1,'Five reads in one night is massed: all the practice is bunched together.'],
 ['Quiz yourself on Monday, Wednesday and next Monday',0,'Gaps of days between quizzes: that is spaced.'],
 ['Practise for 10 minutes every day for a week',0,'Short sessions on separate days are spaced.'],
 ['Do two hours of spelling on Sunday only',1,'One long block on one day is massed, however long it is.'],
 ['Re-read the chapter three times in a row',1,'Three times in a row with no gap is massed.'],
 ['Answer a few questions on last month’s topic in today’s homework',0,'Coming back to an old topic after weeks is spacing.']];
VIS.reg('flagspaced',c=>{let A,bar,box,ask=-1,run=0,live=0;
const base=()=>({view:null,pick:null,won:0,need:1,cal:[],gaps:[],k:0,wrong:-1,flash:'',drag:null,areas:[],bins:[],cb:()=>{},auto:0}),Q=base();
const where=()=>['intro','plan','when','grow','sort','chal'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),instant=()=>A.reduced()||Q.auto;
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function label(g,s,x,y,w,px,col,bold,al){g.font=`${bold||600} ${u(px)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[];let line='';String(s).split(' ').forEach(wd=>{const t=line?line+' '+wd:wd;if(line&&g.measureText(t).width>w){L.push(line);line=wd}else line=t});L.push(line);
 L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*u(px)*1.25))}
function slab(g,r,tint,dash){const C=A.col,h=tint&&C[tint];g.save();if(!dash){A.paint.shadow(4,2,.1);g.fillStyle=h?A.mix(C.pn,h,.15):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([6,5]);g.lineWidth=h?2.4:1.4;g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
/* recall chart: x is days, y is % recalled; f(t) gives recall, dots mark study days */
function chart(g,r,maxD,f,dots,tags){const C=A.col,X=d=>r.x+42+d/maxD*(r.w-52),Y=v=>r.y+8+(1-v)*(r.h-30);
 g.strokeStyle=C.ln;g.lineWidth=1;[0,.5,1].forEach(v=>{g.beginPath();g.moveTo(X(0),Y(v));g.lineTo(X(maxD),Y(v));g.stroke();label(g,pct(v),r.x+20,Y(v),36,10,C.mu,600)});
 for(let d=0;d<=maxD;d+=maxD>20?5:2)label(g,String(d),X(d),r.y+r.h-10,24,10,C.mu,600);
 g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();for(let t=0;t<=maxD;t+=maxD/240){const y=Y(f(t));t?g.lineTo(X(t),y):g.moveTo(X(t),y)}g.stroke();
 dots.forEach(d=>{g.fillStyle=C.am;g.beginPath();g.arc(X(d),Y(1),5,0,7);g.fill()});
 (tags||[]).forEach(([d,col])=>{const v=f(d);g.strokeStyle=C[col];g.setLineDash([4,4]);g.beginPath();g.moveTo(X(d),r.y+8);g.lineTo(X(d),r.y+r.h-22);g.stroke();g.setLineDash([]);
  g.fillStyle=C[col];g.beginPath();g.arc(X(d),Y(v),6,0,7);g.fill();label(g,pct(v),X(d)+(d>maxD*.8?-22:22),Y(v)-12,50,12,C.tx,800)});return{X,Y}}
function paint(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,s=where();Q.areas=[];Q.bins=[];
 if(s==='chal'){label(g,'Spread it out, review as it starts to fade, let the gaps grow, and keep coming back to old topics.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(s==='intro'){const r={x:8,y:H*.08,w:W-16,h:H*.55};chart(g,r,14,t=>model([],t),[0],[[1,'rd'],[7,'rd']]);
  label(g,'Studied once on day 0. One day later about half is gone. A week later almost all of it.',W/2,H*.72,W-30,15,C.tx,700);label(g,'Simplified model, not a real person’s memory.',W/2,H*.86,W-30,12,C.mu,600);return}
 if(s==='plan'){const days=[...Q.cal].sort((a,b)=>a-b),f=t=>model(days,t),r={x:8,y:H*.03,w:W-16,h:H*.44};chart(g,r,30,f,[0,...days],days.length===4?[[14,'vi'],[30,'pk']]:[]);
  label(g,days.length===4?`Test day 14: ${pct(f(14))}   ·   Day 30: ${pct(f(30))}`:`Tap ${4-days.length} more day${days.length===3?'':'s'} to study (day 0 is the first lesson).`,W/2,H*.52,W-20,14,Q.won?C.gr:C.tx,800);
  const n=13,gap=4,cw=(W-16-gap*(n-1))/n,ch=Math.min(u(46),H*.1);for(let i=0;i<n;i++){const b={x:8+i*(cw+gap),y:H*.58,w:cw,h:ch,v:i+1},on=Q.cal.includes(i+1);slab(g,b,on?'am':Q.wrong===i+1?'rd':null);label(g,String(i+1),b.x+cw/2,b.y+ch/2,cw,13,C.tx,on?900:600);Q.areas.push(b)}
  label(g,'Day',8,H*.58+ch+12,40,11,C.mu,600,'left');label(g,'Test →',W-8,H*.58+ch+12,60,11,C.mu,600,'right');
  if(Q.flash)label(g,Q.flash,W/2,H*.82,W-24,14,Q.won?C.gr:C.rd,800);return}
 if(s==='when'){const R=WHEN[Q.view!=null?Q.view:Q.k];if(!R)return;const f=t=>Math.exp(-t/R.S),r={x:8,y:H*.05,w:W-16,h:H*.5},pk=Q.wrong>=0?[[Q.wrong,'rd']]:Q.won?[[Q.pick,'gr']]:[];
  label(g,R.note+': memory lasts longer each time',W/2,H*.03,W-20,13,C.mu,700);const m=chart(g,r,14,f,[0],pk);
  DAYS.forEach(d=>{const b={x:m.X(d)-14,y:r.y,w:28,h:r.h,v:d};Q.areas.push(b)});
  label(g,Q.flash||'When should you review? Tap a day on the chart, or use the buttons.',W/2,H*.66,W-24,14,Q.won?C.gr:Q.wrong>=0?C.rd:C.tx,800);return}
 if(s==='grow'){const days=[];Q.gaps.reduce((a,gp)=>(days.push(a+gp),a+gp),0);const f=t=>model(days,t),r={x:8,y:H*.03,w:W-16,h:H*.42};
  chart(g,r,30,f,[0,...days],Q.gaps.length===3?[[30,Q.won?'gr':'rd']]:[]);
  const sw=(W-16-16)/3,sh=Math.min(u(50),H*.1);for(let i=0;i<3;i++){const b={x:8+i*(sw+8),y:H*.52,w:sw,h:sh};slab(g,b,Q.gaps[i]?'am':null,!Q.gaps[i]);label(g,Q.gaps[i]?`Gap ${i+1}: +${Q.gaps[i]} day${Q.gaps[i]>1?'s':''}`:`Gap ${i+1}`,b.x+sw/2,b.y+sh/2,sw-6,13,C.tx,800)}
  const left=GAPS.filter(x=>!Q.gaps.includes(x)),d=Q.drag;left.forEach((gp,i)=>{let b={x:8+i*(sw+8),y:H*.68,w:sw,h:sh,v:gp};if(d&&d.v===gp&&d.x!=null)b={...b,x:d.x-sw/2,y:d.y-sh/2};slab(g,b,'vi');label(g,`+${gp} day${gp>1?'s':''}`,b.x+sw/2,b.y+sh/2,sw-6,15,C.tx,900);Q.areas.push(b)});
  if(Q.flash)label(g,Q.flash,W/2,H*.86,W-24,14,Q.won?C.gr:C.rd,800);return}
 if(s==='sort'){const hw=(W-28)/2;[[8,'Spaced',0,'gr'],[20+hw,'Massed (crammed)',1,'rd']].forEach(([x,t,v,tn])=>{const b={x,y:H*.04,w:hw,h:H*.3,v};slab(g,b,tn,1);label(g,t,x+hw/2,b.y+u(15),hw-8,14,C.tx,800);
   const got=PLANS.slice(0,Q.k).filter(p=>p[1]===v).length;label(g,got?`${got} plan${got>1?'s':''} here`:'drop here',x+hw/2,b.y+b.h/2+u(8),hw-8,13,C.mu,700);Q.bins.push(b)});
  const p=PLANS[Q.k];if(!p){label(g,'✓ Spaced plans put days between the practice. Massed plans bunch it together.',W/2,H*.55,W-30,15,C.gr,800);return}
  const cw=Math.min(W-30,u(320)),ch=u(64),d=Q.drag;let b={x:W/2-cw/2,y:H*.48,w:cw,h:ch,v:Q.k};if(d&&d.x!=null)b={...b,x:d.x-cw/2,y:d.y-ch/2};slab(g,b,Q.wrong===0?'rd':'am');label(g,p[0],b.x+cw/2,b.y+ch/2,cw-16,14,C.tx,800);Q.areas.push(b);
  label(g,Q.flash||`Plan ${Q.k+1} of ${PLANS.length}: drag it into a box, or use the buttons.`,W/2,H*.75,W-24,13,Q.wrong===0?C.rd:C.mu,700)}
 A.fx.draw(g)}
function miss(t,mark){A.sound.miss();Q.wrong=mark;Q.flash=t;speak(t);setTimeout(()=>{Q.wrong=-1;A.redraw()},instant()?10:1800);A.redraw()}
function score(t){Q.won++;A.sound.pop();Q.flash=t;speak(t);A.redraw();buttons();Q.cb()}
function pickDay(d){if(Q.won>=Q.need)return;const s=where();
 if(s==='plan'){const i=Q.cal.indexOf(d);if(i>=0)Q.cal.splice(i,1);else if(Q.cal.length<4)Q.cal.push(d);else return miss('Four sessions is the limit. Tap a day to remove it first.',d);Q.flash='';A.redraw();buttons();
  if(Q.cal.length===4){const days=[...Q.cal].sort((a,b)=>a-b),a=model(days,14),b=model(days,30);
   if(b>=.45)return score(`Day 30: ${pct(b)}. Spreading the same 4 sessions keeps far more a month later.`);
   const crammed=days[0]>=9;return miss(crammed?`Crammed: test day ${pct(a)}, but day 30 only ${pct(b)}. Bunched sessions fade together. Spread them out.`:`Day 30: ${pct(b)}. Try leaving bigger gaps between sessions.`,-1)}return}
 if(s==='when'){const R=WHEN[Q.k],v=Math.exp(-d/R.S);Q.pick=d;
  if(v>.85)return miss(`Day ${d}: still ${pct(v)} recalled. Too soon: reviewing what you already know adds little.`,d);
  if(v<.35)return miss(`Day ${d}: only ${pct(v)} left. Too late: you would be relearning it from scratch.`,d);
  Q.view=Q.k;Q.k++;Q.won++;A.sound.pop();Q.flash=`✓ Day ${d}: ${pct(v)} left. Hard to recall, but not gone, so the review makes it last much longer.`;speak(Q.flash);buttons();A.redraw();Q.cb();
  later(()=>{if(Q.won>=Q.need)return;Q.flash='';Q.pick=null;Q.view=null;A.redraw();buttons()},1900)}}
function later(f,ms){const r=run,k=Q.k;setTimeout(()=>{if(r!==run||Q.k!==k)return;f()},instant()?5:ms)}
function addGap(gp){if(Q.won>=Q.need||Q.gaps.length>=3||Q.gaps.includes(gp))return;Q.gaps.push(gp);Q.flash='';A.redraw();buttons();if(Q.gaps.length<3)return speak(`Gap ${Q.gaps.length}: +${gp} days.`);
 const days=[];Q.gaps.reduce((a,x)=>(days.push(a+x),a+x),0);const v=model(days,30);if(Q.gaps.join()==='1,3,7')return score(`✓ +1, +3, +7: day 30 at ${pct(v)}, the best order. Each review is stronger, so the next gap can be longer.`);
 miss(`Gaps ${Q.gaps.join(', ')}: day 30 at ${pct(v)}. ${Q.gaps[0]===7?'Waiting 7 days first lets the new memory fade too far.':Q.gaps[2]!==7?'Bunched reviews near the end add little.':'Start with the shortest gap, while the memory is new.'} Short gaps first, then longer.`,-1);later(()=>{Q.gaps=[];Q.flash='';A.redraw();buttons()},2400)}
function file(v){if(Q.won>=Q.need)return;const p=PLANS[Q.k];if(v!==p[1])return miss(p[2],0);Q.k++;Q.flash='';A.sound.pop();speak('✓ '+p[2]);if(Q.k>=PLANS.length)return score('All six sorted.');buttons();A.redraw()}
function buttons(){if(!bar)return;bar.innerHTML='';const s=where(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);b.onclick=f};
 if(s==='chal'||s==='intro'||Q.won>=Q.need)return;
 if(s==='plan'){for(let d=1;d<=13;d++)B((Q.cal.includes(d)?'✓ ':'')+d,()=>pickDay(d),(Q.cal.includes(d)?'Remove study on day ':'Study on day ')+d);B('Clear',()=>{Q.cal=[];Q.flash='';A.redraw();buttons()})}
 if(s==='when')DAYS.forEach(d=>B('Day '+d,()=>pickDay(d),'Review on day '+d));
 if(s==='grow')GAPS.filter(x=>!Q.gaps.includes(x)).forEach(x=>B('+'+x+' days',()=>addGap(x),'Next gap: '+x+' days'));
 if(s==='sort'){B('Spaced',()=>file(0));B('Massed',()=>file(1))}}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const s=where();if(s==='chal'||s==='intro'||Q.won>=Q.need)return false;const hit=Q.areas.find(r=>inside(p,r));if(!hit)return false;Q.drag={v:hit.v,x:null,ox:p.x,oy:p.y};return true}
function move(p){const d=Q.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.ox,p.y-d.oy)>8){d.x=p.x;d.y=p.y;if(where()!=='plan'&&where()!=='when')A.redraw()}}
function up(p){const d=Q.drag,s=where();Q.drag=null;if(!d)return;if(s==='plan'||s==='when')return pickDay(d.v);if(s==='grow')return addGap(d.v);
 if(s==='sort'){const bin=Q.bins.find(b=>inside(p,b));if(d.x!=null&&bin)return file(bin.v);speak('Drag the plan into Spaced or Massed, or use the buttons.');A.redraw()}}
const finish=(i,m)=>()=>{if(A.step===i&&Q.won>=Q.need&&(!steps[i].predict||A.pred[i]!=null))A.done(m+A.reveal(i))};
const clean=n=>{run++;Object.assign(Q,base(),{need:n||1})};
function bot(){if(Q.won>=Q.need)return;const s=where();if(s==='plan'){const want=[1,3,7,13];if(Q.cal.some(x=>!want.includes(x))){Q.cal=[];A.redraw()}const nx=want.find(x=>!Q.cal.includes(x));return pickDay(nx)}
 if(s==='when'){if(Q.flash&&Q.flash[0]==='✓')return;const R=WHEN[Q.k];return pickDay(DAYS.find(d=>{const v=Math.exp(-d/R.S);return v<=.85&&v>=.35}))}
 if(s==='grow'){if(Q.gaps.length&&Q.gaps.join()!==GAPS.slice(0,Q.gaps.length).join())Q.gaps=[];return addGap(GAPS[Q.gaps.length])}if(s==='sort')return file(PLANS[Q.k][1])}
const showMe=i=>()=>{steps[i].go();Q.auto=1;const r=++live,loop=()=>{if(r!==live||Q.won>=Q.need)return;bot();setTimeout(loop,70)};setTimeout(loop,30)};
const steps=[
{h:'Memory fades',p:'Right after you study, you remember nearly everything. Then recall drops fast at first and more slowly later. This is the forgetting curve.',go:()=>{clean();speak('A forgetting curve: studied once on day 0, about half gone after one day.')}},
{h:'Cram or spread?',p:'You have 4 study sessions before a test on day 14. Place them on the calendar and watch recall on test day and a month later.',predict:{q:'Same 4 sessions. Which leaves more remembered on day 30?',opts:['all 4 in the days just before the test','4 sessions spread across the two weeks'],ans:1},task:'Plan 4 sessions that keep at least 45% on day 30',show:showMe(1),
 go:()=>{clean();speak('Tap 4 days on the calendar to study.');buttons();Q.cb=finish(1,'Cramming (days 10 to 13) looks fine on test day but drops to about 25% by day 30. Spreading the same sessions keeps about half. This is the spacing effect.')}},
{h:'Review as it fades',p:'A review helps most when the memory is getting hard to recall but is not gone. Too soon adds little; too late means relearning.',predict:{q:'The best time to review is…',opts:['straight after you finish studying','when it is getting hard to recall, but not gone'],ans:1},task:'Pick a good review day 3 times',show:showMe(2),
 go:()=>{clean(3);speak('Pick a day to review.');buttons();Q.cb=finish(2,'The good window moved later each time: the stronger a memory, the longer you can wait before the next review.')}},
{h:'Let the gaps grow',p:'Each review makes the memory last longer, so the next gap can be longer too. This is an expanding schedule.',predict:{q:'For three reviews, the best gaps are…',opts:['short first, then longer: 1, 3, 7 days','long first, then shorter: 7, 3, 1 days'],ans:0},task:'Build the best 3-gap schedule',show:showMe(3),
 go:()=>{clean();speak('Put the gaps in order: plus 1, plus 3 and plus 7 days.');buttons();Q.cb=finish(3,'+1, +3, +7 beats every other order. A long first gap lets a new memory slip too far; bunched last reviews add little.')}},
{h:'Spaced or massed?',p:'Massed practice bunches it all into one go. Spaced practice puts days between sessions and comes back to old topics.',task:'Sort 6 study plans',show:showMe(4),
 go:()=>{clean();speak('Is the plan spaced or massed? Drag it into a box.');buttons();Q.cb=finish(4,'Re-reading in a row and one long session feel productive, but spaced plans win for remembering.')}},
{h:'Challenge',p:'',go:()=>{clean();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Q.cb()});
const QS=[['Lena has 3 hours to learn French words for a test in 2 weeks. Which plan is best?',[['30 minutes on 6 different days','ok'],['3 hours the night before','cram'],['1 hour on each of the last 3 days','late']]],
 ['You learned a topic today. When is the best first review?',[['Tomorrow or the day after','ok'],['Ten minutes from now','soon'],['In two months','long']]],
 ['Which schedule of reviews is expanding?',[['Day 1, day 4, day 11','ok'],['Day 1, day 2, day 3','even'],['Day 7, day 10, day 11','shrink']]],
 ['Why does cramming feel like it works?',[['Recall is high on test day, then fades fast','ok'],['It builds memories that last longest','last'],['Your brain cannot forget crammed facts','never']]],
 ['Which is spaced practice?',[['Answering last month’s questions in today’s homework','ok'],['Re-reading a page five times in a row','reread'],['A two-hour session on Sunday only','block']]],
 ['After each review, the next gap can be…',[['a bit longer','ok'],['the same forever','same'],['shorter','shorter']]]];
function why(t){let m='Spread sessions out, review as recall fades, and let gaps grow.';
 if(t==='cram')m='One big session the night before fades fast after the test.';if(t==='late')m='Those are bunched at the end: still crammed.';
 if(t==='soon')m='Ten minutes later you still know it, so a review adds little.';if(t==='long')m='After two months most of it is gone; you would relearn it.';
 if(t==='even')m='Gaps of 1 day each are short and equal, not expanding.';if(t==='shrink')m='Those gaps shrink (7, 3, 1). Expanding means each gap is longer.';
 if(t==='last'||t==='never')m='Crammed facts fade fast after the test. Spacing builds lasting memories.';
 if(t==='reread'||t==='block')m='That is massed: all in one go. Spacing needs gaps of days.';if(t==='same'||t==='shorter')m='Each review makes the memory stronger, so the next gap can grow.';return m}
function next(){ask++;const[q,ops]=QS[ask%QS.length],sh=ask%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Options"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const el=box.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},el,o);b.onclick=()=>check(t)});speak('Challenge: '+q);A.redraw()}
let row=0;function check(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` In a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.72,tall:1.3,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
