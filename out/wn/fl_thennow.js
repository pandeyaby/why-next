/* Flagship – personal growth over time (ages 10–11). Things that are hard now are not fixed: you can see it by looking at
   how you have already changed. Put then-and-now cards on a timeline, name what caused each change (practice, help, a new
   strategy, or simply growing up), sort fixed from growth statements, and choose fair evidence: compare with past you,
   treat a dip as part of the line, and trust records over feelings. Every drag has a button twin. */
(()=>{
const AGES=['Age 6','Age 8','Now (10)'];
const LINES=[{k:'Reading',e:'📚',c:['Knew some letter sounds','Read short books with help','Reads chapter books alone']},
 {k:'Swimming',e:'🏊',c:['Scared to put face in water','Swam a width with a float','Swims 25 metres']},
 {k:'Being cross',e:'😤',c:['Shouted and hid when cross','Counted to ten when cross','Says “I need a minute” and steps away']}];
const CAUSE=['Practice','Help from someone','A new strategy','Growing up'];
const WHAT=[{t:'Aisha used to freeze at times tables. She did five minutes of practice every night for a term. Now she knows them.',a:0,
  w:['','She did not get help from a person here. The story says five minutes every night: that is practice.','She did not change how she learned; she did the same thing often. That is practice.','One term is not enough to grow up much. The nightly five minutes made the change.']},
 {t:'Leo could not ride a bike. His big sister held the seat and let go a little more each day. Now he rides alone.',a:1,
  w:['He did practise, but the key part was his sister holding the seat. That is help from someone.','','His sister did the helping; he did not switch to a new method himself. That is help.','He did not just get older. Someone held the seat until he could do it.']},
 {t:'Kai kept forgetting his homework. He started writing it on a list by the door. Now he hands it in.',a:2,
  w:['Doing the same thing more would not fix it. The list by the door is a new way of working.','Nobody helped him in the story. He changed the way he does it: a new strategy.','','Getting older did not fix it. The list did. That is a new strategy.']},
 {t:'Rosa could not reach the top shelf at 6. At 10 she can, without trying anything new.',a:3,
  w:['You cannot practise being taller. Some change comes from growing up.','Nobody lifted her. Her body grew. Not every change needs effort.','She did not try a new way. She grew, and that counts as change too.','']}];
const SAYS=[['I am just bad at drawing.',0],['I can’t do long division yet.',1],['I used to panic in tests. Now I make a plan first.',1],['Some people are maths people. I’m not.',0],['My handwriting is neater than it was in Year 3.',1]];
const FAIR=[{q:'How can Mo see if his running has improved?',v:'bars',o:[['Compare with the fastest runner in class',0,'Comparing with someone else hides your own change. They started in a different place.'],['Compare his lap time now with September',1],['Only count races he wins',0,'Winning depends on who else runs. His own times show his growth.']]},
 {q:'Jas’s reading score went down this week. What is true?',v:'dip',o:[['Her growth has stopped',0,'One dip is not the whole line. Look at where she started and where she is now.'],['A dip is normal. Look at the whole year.',1],['She is just not a reader',0,'That is fixed thinking. Her line goes up over the year, with one wobble.']]},
 {q:'Which is real evidence that Sam has grown as a writer?',v:'pages',o:[['He feels like he is better',0,'Feelings can trick you both ways. A record you can see is stronger evidence.'],['His first story was half a page. Now he writes two pages.',1],['Everyone says he is clever',0,'Praise is not evidence of change. Compare his old work with his new work.']]}];
VIS.reg('flagthennow',c=>{let A,pad,quiz,qn=-1,run=0,row=0;
const fresh=()=>({at:0,got:0,need:3,bad:-1,put:[],hold:null,hot:[],after:()=>{},fast:0,ok:0,said:[]}),S=fresh();
const mode=()=>['hi','order','cause','words','fair','quiz'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),brisk=()=>A.reduced()||S.fast;
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function label(g,s,x,y,w,px,col,wt){g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const ls=[''];String(s).split(' ').forEach(p=>{const n=ls.length-1,t=ls[n]?ls[n]+' '+p:p;if(ls[n]&&g.measureText(t).width>w)ls.push(p);else ls[n]=t});
 ls.forEach((l,i)=>g.fillText(l,x,y+(i-(ls.length-1)/2)*u(px)*1.25))}
function glyph(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function box(g,r,tone,dash){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi,pk:C.pk}[tone];g.save();if(!dash){A.paint.shadow(4,2,.1);g.fillStyle=h?A.mix(C.pn,h,.14):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([6,5]);g.lineWidth=h?2.5:1.5;g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
const slots=()=>{const g=6,w=(A.W-16-g*2)/3;return AGES.map((a,i)=>({x:8+i*(w+g),y:A.H*.14,w,h:A.H*.3}))};
function stack(list,y0,y1){const n=list.length,g=7,h=Math.min(u(50),(y1-y0-g*(n-1))/n),d=S.hold;
 return list.map((v,i)=>d&&d.i===i&&d.x!=null?{x:d.x-(A.W-20)/2,y:d.y-h/2,w:A.W-20,h,v}:{x:10,y:y0+i*(h+g),w:A.W-20,h,v})}
function quad(list,y0,y1){const g=8,w=(A.W-20-g)/2,h=Math.min(u(56),(y1-y0-g)/2),d=S.hold;
 return list.map((v,i)=>d&&d.i===i&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h,v}:{x:10+(i%2)*(w+g),y:y0+Math.floor(i/2)*(h+g),w,h,v})}
const bins=()=>{const g=10,w=(A.W-20-g)/2;return[{x:10,y:A.H*.58,w,h:A.H*.34,v:0},{x:10+w+g,y:A.H*.58,w,h:A.H*.34,v:1}]};
const MIXED=[[2,0,1],[1,2,0],[2,1,0]],left=()=>LINES[S.at]?MIXED[S.at].filter(i=>!S.put.includes(i)):[];
function mini(g,kind,r){const C=A.col;g.save();g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);
 if(kind==='bars'){label(g,'Lap time (shorter is faster)',r.x+r.w/2,r.y+u(10),r.w,12,C.mu);[['Sept 6:10',.85],['Now 5:20',.6]].forEach(([n,f],i)=>{const bw=r.w*.28,x=r.x+r.w*(.14+i*.44),bh=r.h*.62*f;g.fillStyle=i?C.gr:C.mu;g.fillRect(x,r.y+r.h-bh-u(16),bw,bh);label(g,n,x+bw/2,r.y+r.h-u(8),bw*1.6,12,C.tx)})}
 if(kind==='dip'){const P=[.2,.3,.38,.5,.42,.6,.7];g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();P.forEach((p,i)=>{const x=r.x+8+i*(r.w-16)/6,y=r.y+r.h-8-p*(r.h-16)*1.2;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();
  const x=r.x+8+4*(r.w-16)/6,y=r.y+r.h-8-.42*(r.h-16)*1.2;g.fillStyle=C.am;g.beginPath();g.arc(x,y,6,0,7);g.fill();label(g,'this week',x,y+u(16),90,12,C.tx)}
 if(kind==='pages'){[['First story',.5],['Now',2]].forEach(([n,p],i)=>{const x=r.x+r.w*(.12+i*.46),pw=r.w*.3;for(let k=0;k<Math.ceil(p);k++){g.fillStyle=A.mix(C.pn,C.vi,.2);g.fillRect(x+k*6,r.y+8+k*6,pw,(r.h-36)*(p<1?p:1));g.strokeStyle=C.vi;g.strokeRect(x+k*6,r.y+8+k*6,pw,(r.h-36)*(p<1?p:1))}label(g,n,x+pw/2,r.y+r.h-u(10),pw*1.4,12,C.tx)})}
 g.restore()}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();S.hot=[];
 if(m==='quiz'){label(g,'Hard now is not hard forever. Look back, name what changed, and use fair evidence.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(m==='hi'){const s=slots();s.forEach((r,i)=>{box(g,r,'cy');label(g,AGES[i],r.x+r.w/2,r.y+u(14),r.w,13,C.mu,800);label(g,['Could not tie laces','Tied them slowly','Ties them without thinking'][i],r.x+r.w/2,r.y+r.h*.6,r.w-10,14)});
  g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(16,H*.62);g.lineTo(W-16,H*.5);g.stroke();label(g,'You have already changed a lot. The hard things now can change too.',W/2,H*.76,W-30,16,C.tx,800);return}
 if(m==='order'){const L=LINES[S.at];glyph(g,L.e,W*.12,H*.06,u(26));label(g,L.k+': put the cards in order',W/2+u(10),H*.06,W-u(70),15,C.tx,800);
  slots().forEach((r,i)=>{const f=S.put[i];box(g,r,f!=null?'ok':i===S.put.length?(S.bad===9?'no':'am'):null,f==null);label(g,AGES[i],r.x+r.w/2,r.y+u(13),r.w,12,C.mu,800);if(f!=null)label(g,L.c[f],r.x+r.w/2,r.y+r.h*.6,r.w-8,13)});
  if(S.put.length<3){const L2=left(),t=stack(L2,H*.52,H*.97);t.forEach((r,j)=>{box(g,r,S.bad===L2[j]?'no':'vi');label(g,L.c[L2[j]],r.x+r.w/2,r.y+r.h/2,r.w-12,14)});S.hot=t}
  else label(g,'✓ '+L.k+' grew step by step.',W/2,H*.62,W-30,16,C.gr,800)}
 if(m==='cause'){const it=WHAT[S.at],r={x:10,y:H*.04,w:W-20,h:H*.38};box(g,r,'cy');label(g,it.t,W/2,r.y+r.h/2,r.w-20,15,C.tx,600);
  label(g,S.ok?'✓ '+CAUSE[it.a]+' made the change.':'What made the change? Drag a card up, or tap it.',W/2,H*.49,W-20,15,S.ok?C.gr:C.tx,800);
  const t=quad(CAUSE.map((x,i)=>i),H*.56,H*.97);t.forEach((q,i)=>{box(g,q,S.ok&&i===it.a?'ok':S.bad===i?'no':'vi');label(g,CAUSE[i],q.x+q.w/2,q.y+q.h/2,q.w-10,15)});if(!S.ok)S.hot=t}
 if(m==='words'){const it=SAYS[S.at],d=S.hold,b=bins();b.forEach((r,i)=>{box(g,r,S.bad===i?'no':i?'cy':'pk',1);label(g,i?'🌱 Growth':'🧱 Fixed',r.x+r.w/2,r.y+u(18),r.w,16,C.tx,800);
   label(g,i?'can still change':'can never change',r.x+r.w/2,r.y+u(40),r.w-8,12,C.mu);const n=S.said.filter(k=>SAYS[k][1]===i).length;if(n)label(g,'✓ '+n+' sorted here',r.x+r.w/2,r.y+r.h-u(20),r.w-8,13,C.tx,800)});
  if(it&&S.got<S.need){const w=W-40,h=H*.22,cr=d&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h}:{x:20,y:H*.08,w,h};box(g,cr,'am');label(g,'“'+it[0]+'”',cr.x+w/2,cr.y+h/2,w-16,16,C.tx,800);S.hot=[cr]}
  else label(g,'✓ Sorted.',W/2,H*.2,W,17,C.gr,800);label(g,'Drag the card into a box, or tap a box.',W/2,H*.4,W-20,14,C.mu)}
 if(m==='fair'){const it=FAIR[S.at];label(g,it.q,W/2,H*.06,W-24,15,C.tx,800);mini(g,it.v,{x:W*.12,y:H*.12,w:W*.76,h:H*.28});
  if(S.ok)label(g,'✓ Fair evidence: compare with past you.',W/2,H*.45,W-20,15,C.gr,800);
  const t=stack(it.o.map((x,i)=>i),H*.5,H*.97);t.forEach((q,i)=>{box(g,q,S.ok&&it.o[i][1]?'ok':S.bad===i?'no':'vi');label(g,it.o[i][0],q.x+q.w/2,q.y+q.h/2,q.w-12,14)});if(!S.ok)S.hot=t}
 A.fx.draw(g)}
function wrong(t,j){A.sound.miss();S.bad=j;voice(t);setTimeout(()=>{S.bad=-1;A.redraw()},brisk()?10:1400);A.redraw()}
function gain(t){S.got++;A.sound.pop();voice(t);ctl();A.redraw();S.after()}
function wait(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r!==run||S.at!==at||S.got>=S.need)return;f()},brisk()?5:ms)}
function on(){S.at++;S.put=[];S.ok=0;voice('Next one.');ctl();A.redraw()}
function place(i){if(mode()!=='order'||S.got>=S.need)return;const L=LINES[S.at],want=S.put.length;if(S.put.includes(i)||want>2)return;
 if(i!==want){const m=i>want?`“${L.c[i]}” shows more skill than “${L.c[want]}”, so it comes later. Start with the earliest.`:'Put the earliest card first.';return wrong(m,i)}
 S.put.push(i);A.sound.tick();if(S.put.length<3){voice(`${AGES[want]}: ${L.c[i]}.`);return A.redraw()}gain(`${L.k}: from “${L.c[0]}” to “${L.c[2]}”. That change took time.`);wait(on,1500)}
function cause(i){if(mode()!=='cause'||S.got>=S.need||S.ok)return;const it=WHAT[S.at];if(i!==it.a)return wrong(it.w[i],i);S.ok=1;gain(`${CAUSE[i]}. Naming what helped tells you what to use next time.`);wait(on,1600)}
function sort(b){if(mode()!=='words'||S.got>=S.need)return;const it=SAYS[S.at];
 if(b!==it[1]){const m=it[1]?'This one shows change over time or a “yet”, so it is growth thinking.':'This one says you can never change. That is fixed thinking.';return wrong(m,b)}
 S.said.push(S.at);S.at++;gain(it[1]?'Growth: it says change is possible.':'Fixed: it says change is impossible. Try adding “yet”.')}
function fair(i){if(mode()!=='fair'||S.got>=S.need||S.ok)return;const o=FAIR[S.at].o[i];if(!o[1])return wrong(o[2],i);S.ok=1;gain('Yes: '+o[0]+'.');wait(on,1600)}
function ctl(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if(m==='order'){const L=LINES[S.at];left().forEach(i=>B(L.c[i],()=>place(i),`Put “${L.c[i]}” in the next slot`))}
 if(m==='cause'&&!S.ok)CAUSE.forEach((x,i)=>B(x,()=>cause(i)));
 if(m==='words'){const it=SAYS[S.at];['Fixed','Growth'].forEach((x,i)=>B(x,()=>sort(i),`“${it[0]}” is ${x.toLowerCase()} thinking`))}
 if(m==='fair'&&!S.ok)FAIR[S.at].o.forEach((o,i)=>B(o[0],()=>fair(i)))}
const hit=(p,r,e)=>(e=e||0,p.x>r.x-e&&p.x<r.x+r.w+e&&p.y>r.y-e&&p.y<r.y+r.h+e);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;
 if(m==='words'){const b=bins().find(r=>hit(p,r));if(b){sort(b.v);return false}}
 const j=S.hot.findIndex(r=>hit(p,r,4));if(j<0)return false;S.hold={i:j,v:S.hot[j].v,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold,m=mode();S.hold=null;if(!d)return;
 if(m==='words'){const b=bins().find(r=>hit(p,r,8));if(b)return sort(b.v);voice('Drop the card in Fixed or Growth.');return A.redraw()}
 if(d.x==null||p.y<A.H*.46)return m==='order'?place(d.v):m==='cause'?cause(d.v):fair(d.v);voice('Drop it higher up.');A.redraw()}
const fin=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function good(){const m=mode();if(m==='order'&&S.put.length<3)return place(S.put.length);if(m==='cause'&&!S.ok)return cause(WHAT[S.at].a);if(m==='words'&&SAYS[S.at])return sort(SAYS[S.at][1]);
 if(m==='fair'&&!S.ok)return fair(FAIR[S.at].o.findIndex(o=>o[1]))}
const demo=i=>()=>{steps[i].go();S.fast=1;auto(good)};
const steps=[
{h:'Look how far you have come',p:'You are not the same person you were at six. Looking back at how you changed is real evidence that hard things can get easier.',go:()=>{reset();voice('Age 6: could not tie laces. Now: ties them without thinking.')}},
{h:'Then, later, now',p:'Put each skill on the timeline, from the earliest to now. Notice that the change came in steps, not all at once.',predict:{q:'Something you find really hard now will…',opts:['always be hard for you','probably change, like things that were hard before'],ans:1},task:'Put 3 growth stories in order',show:demo(1),
 go:()=>{reset();voice('Drag the earliest card up to Age 6, or tap it.');ctl();S.after=fin(1,'Each skill grew in steps over years. Your hard things now are at an early step.')}},
{h:'What made the change?',p:'Change has causes. Read each story and name what made the difference. Knowing what helped tells you what to try next time.',predict:{q:'People who got better at something were mostly…',opts:['born good at it','helped by practice, support or a new way'],ans:1},task:'Name the cause in 4 stories',show:demo(2),
 go:()=>{reset();S.need=4;voice('Read the story. Drag the cause up, or tap it.');ctl();S.after=fin(2,'Practice, help and new strategies change skills. Some change is just growing up, and that is fine too.')}},
{h:'Fixed or growth?',p:'Fixed thinking says “I can never change.” Growth thinking says “not yet” or “I have improved.” Sort each sentence.',predict:{q:'Adding “yet” to “I can’t do it”…',opts:['changes nothing','says it can still change'],ans:1},task:'Sort 5 sentences',show:demo(3),
 go:()=>{reset();S.need=5;voice('Drag the card into Fixed or Growth, or tap a box.');ctl();S.after=fin(3,'Growth thinking is honest: “yet” and “I have improved” are both true when you look back.')}},
{h:'Fair evidence',p:'To see your growth, compare yourself with you, not with other people. A dip is part of the line, and a record beats a feeling.',task:'Choose fair evidence 3 times',show:demo(4),
 go:()=>{reset();voice('Pick the fair way to see growth. Drag it up, or tap it.');ctl();S.after=fin(4,'Compare with past you, look at the whole line, and keep work you can look back at.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Zoe could not do a cartwheel last year. She can now. What is the best next question?',[['What helped me learn it?','ok'],['Am I better than my friends?','compare'],['Was I just born sporty?','born']]],
 ['Which sentence shows growth thinking?',[['I can’t speak French yet.','ok'],['I’m just not a languages person.','fixed'],['Languages are pointless.','avoid']]],
 ['Tom’s spelling scores: 4, 6, 5, 8. What is true?',[['He has improved, with one dip','ok'],['He is getting worse','dip'],['He has not changed','flat']]],
 ['Which is the best evidence you have grown as a reader?',[['Last year I read picture books; now I read novels','ok'],['My teacher said “good job” once','praise'],['I feel smarter today','feel']]],
 ['Ali grew taller and can now reach the bar. What caused it?',[['Growing up','ok'],['Hours of practice','effort'],['A new strategy','strategy']]],
 ['You find fractions hard now. What does looking back tell you?',[['Hard things before got easier, so this can too','ok'],['I will always find fractions hard','forever'],['I should stop doing fractions','quit']]]];
function why(t){let m='Look back at how you changed and what helped.';
 if(t==='compare')m='Comparing with friends tells you nothing about your own change. Ask what helped you.';if(t==='born')m='No one is born doing cartwheels. Practice or help made the change.';
 if(t==='fixed')m='“Just not a languages person” says you can never change. That is fixed thinking.';if(t==='avoid')m='This avoids the skill instead of showing it can grow. “Yet” is the growth word.';
 if(t==='dip')m='One drop from 6 to 5 is a dip. From 4 to 8 overall, he has improved.';if(t==='flat')m='4 to 8 is a real change. Look at the first and last scores.';
 if(t==='praise')m='One comment is not a record of change. Compare what you read then and now.';if(t==='feel')m='Feelings change day to day. Evidence you can see is stronger.';
 if(t==='effort')m='You cannot practise being taller. This change came from growing up.';if(t==='strategy')m='No new method here: Ali simply grew.';
 if(t==='forever')m='That is fixed thinking. Things that were hard before got easier, and this can too.';if(t==='quit')m='Stopping keeps it hard. Practice, help or a new strategy can change it.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const el=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},el,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctl()}});
A.start()})})();
