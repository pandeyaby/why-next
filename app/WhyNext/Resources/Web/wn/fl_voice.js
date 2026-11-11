/* Flagship – active and passive voice (ages 10–11). Find the doer, flip active sentences into the passive with
   be + past participle, tell real passives from look-alikes, keep or cut the by-phrase, and choose a voice for a purpose. */
(()=>{
const DOER=[{w:['The','dog','chased','the','cat.'],d:[0,1],v:'chasing'},{w:['The','cat','was','chased','by','the','dog.'],d:[5,6],v:'chasing',subj:[0,1]},
 {w:['The','vase','was','smashed','by','Leo.'],d:[5],v:'smashing',subj:[0,1]}];
const FLIP=[{a:'Sam broke the window.',parts:['The window','was broken','by Sam'],bad:'was broke',why:'Broke is the simple past. The passive needs was + the past participle: was broken.'},
 {a:'The chef cooks the meals.',parts:['The meals','are cooked','by the chef'],bad:'is cooked',why:'Meals is plural, so the verb must agree: are cooked, not is cooked.'},
 {a:'Bees made this honey.',parts:['This honey','was made','by bees'],bad:'was make',why:'Make is the base form. The passive uses the past participle: was made.'}];
const SPOT=[['The match was cancelled.',1],['The cake was delicious.',0,'Delicious describes the cake. It is not a past participle, and nothing is done to the cake.'],
 ['The letters were posted.',1],['Tom was running late.',0,'Was running is the past progressive. Tom is the doer, so it is active.'],
 ['The prize was won by Asha.',1],['We were happy.',0,'Happy is an adjective. Were happy tells how we felt; no action is done to us.']];
const CUT=[{s:'My bike was stolen by someone.',by:' by someone',keep:0,why:'By someone tells the reader nothing new, so cut it.'},
 {s:'Hamlet was written by Shakespeare.',by:' by Shakespeare',keep:1,why:'Who wrote it is the whole point here, so keep it.'},
 {s:'The bins are emptied by people every Monday.',by:' by people',keep:0,why:'Of course people empty them. By people adds nothing.'}];
const PICK=[{job:'Science report: say what was done, not who did it.',o:['I heated the water for 5 minutes.','The water was heated for 5 minutes.'],ans:1,
  ok:'Passive keeps the focus on the method, so any reader could repeat it.',no:'In a method the reader needs the process. Who held the beaker does not matter.'},
 {job:'Adventure story: make the hero act.',o:['Mia grabbed the rope and swung across.','The rope was grabbed by Mia, and she swung across.'],ans:0,
  ok:'Active puts Mia first, doing things. Stories feel faster that way.',no:'The passive puts the rope first and slows the action down. Mia should drive the sentence.'},
 {job:'News report: nobody knows who did it.',o:['Somebody stole a rare painting.','A rare painting was stolen.'],ans:1,
  ok:'The doer is unknown, so the passive starts with the painting, the real news.',no:'Somebody adds nothing. The passive lets the report start with the painting.'}];
VIS.reg('flagvoice',c=>{let A,pad,quiz,qn=-1,gen=0,stars=0;
const fresh=()=>({k:0,n:0,wait:0,oops:-1,fill:[],found:[],picked:-1,grab:null,hits:[],after:()=>{},fast:0}),S=fresh();
const stage=()=>['doer','flip','spot','cut','pick','quiz'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),hurry=()=>A.reduced()||S.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
/* wrapped, centred text; returns the number of lines drawn */
function txt(g,t,x,y,maxw,px,col,wt){g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const lines=String(t).split(' ').reduce((L,w)=>{const try_=L[L.length-1]?L[L.length-1]+' '+w:w;if(g.measureText(try_).width>maxw&&L[L.length-1])L.push(w);else L[L.length-1]=try_;return L},['']);
 const lh=u(px)*1.25;lines.forEach((s,i)=>g.fillText(s,x,y+(i-(lines.length-1)/2)*lh));return lines.length}
function card(g,r,tone,thick){const C=A.col,edge=tone==='ok'?C.gr:tone==='bad'?C.rd:tone==='on'?C.am:tone==='doer'?C.vi:C.ln;
 g.save();A.paint.shadow(6,2,.12);g.fillStyle=tone==='ok'?A.mix(C.pn,C.gr,.15):tone==='bad'?A.mix(C.pn,C.rd,.2):tone==='on'?A.mix(C.pn,C.am,.2):tone==='doer'?A.mix(C.pn,C.vi,.16):C.pn;
 A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=thick||(tone?3:1.5);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
/* lay word chips out in rows that fit the canvas */
function flow(g,words,top,px){g.font=`800 ${u(px)}px system-ui,sans-serif`;const padX=u(10),gap=u(8),h=u(px)*1.9,rows=[[]];let w=0;
 words.forEach((t,i)=>{const cw=g.measureText(t).width+padX*2;if(w+cw>A.W-28&&rows[rows.length-1].length){rows.push([]);w=0}rows[rows.length-1].push([i,cw]);w+=cw+gap});
 const out=[];rows.forEach((row,j)=>{const tot=row.reduce((s,[,cw])=>s+cw+gap,-gap);let x=(A.W-tot)/2;row.forEach(([i,cw])=>{out[i]={x,y:top+j*(h+u(14)),w:cw,h};x+=cw+gap})});return out}
const grid=(n,cols,top,h)=>{const gap=10,w=(A.W-24-(cols-1)*gap)/cols;return Array.from({length:n},(_,i)=>({x:12+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))};
const flipNow=()=>FLIP[S.k],pool=()=>{const f=flipNow(),all=[f.parts[1],f.bad,f.parts[2],f.parts[0]],r=S.k%4;return all.slice(r).concat(all.slice(0,r))};
const slotRects=()=>{const w=(A.W-40)/3;return[0,1,2].map(i=>({x:14+i*(w+6),y:A.H*.3,w,h:u(54)}))};
const poolRects=()=>grid(4,2,A.H*.56,u(52));
const sideRects=()=>{const two=A.narrow;return[0,1].map(i=>two?{x:14,y:A.H*(.36+i*.27),w:A.W-28,h:A.H*.22}:{x:14+i*(A.W/2-7),y:A.H*.36,w:A.W/2-21,h:A.H*.4})};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,s=stage();
 if(s==='quiz'){txt(g,'Passive = the receiver comes first + be + past participle (+ by the doer).',W/2,H*.45,W-40,18,C.tx,800);return}
 if(s==='doer'){const q=DOER[S.k],rs=flow(g,q.w,H*.32,24);txt(g,S.wait?'Found the doer!':`Who is doing the ${q.v}? Tap the doer.`,W/2,H*.1,W-30,17,S.wait?C.gr:C.tx,800);S.hits=rs;
  rs.forEach((r,i)=>{const isD=q.d.includes(i);card(g,r,S.wait&&isD?'doer':S.oops===i?'bad':'');txt(g,q.w[i],r.x+r.w/2,r.y+r.h/2,r.w+40,24,C.tx,800)});
  if(S.wait&&q.subj){const r=rs[q.subj[0]];txt(g,'subject (receiver)',r.x+r.w/2+u(20),r.y+r.h+u(18),W/2,13,C.mu,700)}
  if(S.wait){const r=rs[q.d[0]];txt(g,'doer (agent)',r.x+u(40),r.y+r.h+u(18),W/2,13,C.vi,800)}}
 if(s==='flip'){const f=flipNow();txt(g,'Active: '+f.a,W/2,H*.08,W-30,18,C.tx,800);txt(g,S.wait?'Passive: '+f.parts.join(' ')+'.':'Build the passive. Drag or tap the chunks in order.',W/2,H*.18,W-30,15,S.wait?C.gr:C.mu,700);
  slotRects().forEach((r,i)=>{const got=S.fill[i]!=null;card(g,r,got?'ok':'',got?2.5:1.5);if(!got){g.save();g.setLineDash([5,5]);g.strokeStyle=C.mu;A.paint.rrect(r.x+4,r.y+4,r.w-8,r.h-8,8);g.stroke();g.restore()}
   txt(g,got?f.parts[i]:['receiver','be + past participle','by + doer'][i],r.x+r.w/2,r.y+r.h/2,r.w-8,got?16:12,got?C.tx:C.mu,got?800:600)});
  const used=S.fill.map(i=>f.parts[i]);poolRects().forEach((r,i)=>{const t=pool()[i];if(used.includes(t))return;const dr=S.grab&&S.grab.i===i&&S.grab.x!=null;const rr=dr?{...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2}:r;
   card(g,rr,S.oops===i?'bad':'on');txt(g,t,rr.x+rr.w/2,rr.y+rr.h/2,rr.w-10,17,C.tx,800)})}
 if(s==='spot'){txt(g,'Tap the 3 sentences that are passive.',W/2,H*.07,W-30,16,C.tx,800);const rs=grid(6,A.narrow?2:3,H*.15,A.narrow?H*.22:H*.3);S.hits=rs;
  rs.forEach((r,i)=>{const f=S.found.includes(i);card(g,r,f?'ok':S.oops===i?'bad':'');txt(g,SPOT[i][0],r.x+r.w/2,r.y+r.h/2-(f?u(9):0),r.w-14,15,C.tx,700);if(f)txt(g,'passive ✓',r.x+r.w/2,r.y+r.h-u(14),r.w,12,C.gr,800)})}
 if(s==='cut'){const q=CUT[S.k],out=S.picked>=0;txt(g,out?(q.keep?q.s:q.s.replace(q.by,'')):q.s,W/2,H*.16,W-30,20,out?C.gr:C.tx,800);
  txt(g,out?q.why:`Keep or cut "${q.by.trim()}"?`,W/2,H*.3,W-30,15,C.mu,700);const rs=[0,1].map(i=>({x:14+i*(W/2-7),y:H*.46,w:W/2-21,h:H*.3}));S.hits=rs;
  ['Keep it','Cut it'].forEach((t,i)=>{const pick=i===0?1:0;card(g,rs[i],out&&pick===q.keep?'ok':S.oops===i?'bad':'');txt(g,t,rs[i].x+rs[i].w/2,rs[i].y+rs[i].h*.4,rs[i].w-10,20,C.tx,800);
   txt(g,i?q.s.replace(q.by,''):q.s,rs[i].x+rs[i].w/2,rs[i].y+rs[i].h*.72,rs[i].w-16,12,C.mu,600)})}
 if(s==='pick'){const q=PICK[S.k];txt(g,q.job,W/2,H*.12,W-30,17,C.tx,800);const rs=sideRects();S.hits=rs;
  rs.forEach((r,i)=>{card(g,r,S.picked===i?'ok':S.oops===i?'bad':'');txt(g,/\b(was|were)\b/.test(q.o[i])?'Passive':'Active',r.x+r.w/2,r.y+u(18),r.w,13,C.mu,800);
   txt(g,q.o[i],r.x+r.w/2,r.y+r.h/2+u(6),r.w-20,17,C.tx,700)});if(S.picked>=0)txt(g,q.ok,W/2,H*.9,W-30,13,C.gr,700)}
 A.fx.draw(g)}
function nope(t,j){A.sound.miss();S.oops=j==null?-1:j;tell(t);setTimeout(()=>{S.oops=-1;A.redraw()},hurry()?10:1300);A.redraw()}
function good(t,keep){S.n++;A.sound.pop();if(S.n<3&&!keep){const r0=S.k,g0=gen;S.wait=1;setTimeout(()=>{if(S.k!==r0||g0!==gen)return;Object.assign(S,{wait:0,k:S.k+1,fill:[],picked:-1});tell(t+' Next one.');pads();A.redraw()},hurry()?5:1500)}
 else S.wait=!keep;tell(t);pads();A.redraw();S.after()}
function tapWord(i){if(stage()!=='doer'||S.wait)return;const q=DOER[S.k];
 if(q.d.includes(i))return good(`Yes: ${q.d.map(j=>q.w[j]).join(' ').replace('.','')} did the ${q.v}.`+(q.subj?' In the passive the doer comes after by.':''));
 if(q.subj&&q.subj.includes(i))return nope(`${q.w[q.subj[1]]} is the subject, but it is not doing the ${q.v}. Look after the word by.`,i);
 nope(`${q.w[i]} is not the doer. Ask: who did the ${q.v}?`,i)}
function place(i){if(stage()!=='flip'||S.wait)return;const f=flipNow(),t=pool()[i],want=S.fill.length;
 if(t===f.bad)return nope(f.why,i);const p=f.parts.indexOf(t);if(p<0||S.fill.includes(p))return;
 if(p!==want)return nope(['Start with the receiver: the thing the action happens to.','Next comes the verb: a form of be + the past participle.','Finish with by + the doer.'][want],i);
 S.fill.push(p);A.sound.tick();if(S.fill.length<3){tell(`${t}… what comes next?`);pads();return A.redraw()}good(`Passive: ${f.parts.join(' ')}.`)}
function spot(i){if(stage()!=='spot'||S.n>=3||S.found.includes(i))return;const s=SPOT[i];if(!s[1])return nope(s[2],i);S.found.push(i);good(`Passive: ${s[0]}`,1)}
function cut(keep){if(stage()!=='cut'||S.wait)return;const q=CUT[S.k];if(keep!==q.keep)return nope(keep?`Think about ${q.by.trim()}: does it tell us anything we need? ${q.why}`:`Without ${q.by.trim()} we lose the key fact. ${q.why}`,keep?0:1);S.picked=keep;good(q.why)}
function choose(i){if(stage()!=='pick'||S.wait)return;const q=PICK[S.k];if(i!==q.ans)return nope(q.no,i);S.picked=i;good(q.ok)}
function pads(){if(!pad)return;pad.innerHTML='';const s=stage(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(s==='quiz'||S.n>=3||S.wait)return;
 if(s==='doer')DOER[S.k].w.forEach((w,i)=>B(w,()=>tapWord(i),'Doer: '+w));
 if(s==='flip'){const f=flipNow(),used=S.fill.map(i=>f.parts[i]);pool().forEach((t,i)=>{if(!used.includes(t))B(t,()=>place(i),'Add chunk: '+t)})}
 if(s==='spot')SPOT.forEach((x,i)=>{if(!S.found.includes(i))B(x[0],()=>spot(i),'Passive: '+x[0])});
 if(s==='cut'){B('Keep it',()=>cut(1),'Keep '+CUT[S.k].by.trim());B('Cut it',()=>cut(0),'Cut '+CUT[S.k].by.trim())}
 if(s==='pick')PICK[S.k].o.forEach((t,i)=>B(t,()=>choose(i)))}
const inside=(q,r,m)=>(m=m||0,q.x>r.x-m&&q.x<r.x+r.w+m&&q.y>r.y-m&&q.y<r.y+r.h+m);
function down(q){const s=stage();if(s==='quiz'||S.wait)return false;
 if(s==='flip'){const f=flipNow(),used=S.fill.map(i=>f.parts[i]),i=poolRects().findIndex((r,j)=>inside(q,r,3)&&!used.includes(pool()[j]));if(i>=0){S.grab={i,x:null,x0:q.x,y0:q.y};return true}return false}
 const i=S.hits.findIndex(r=>inside(q,r,4));if(i<0)return false;
 if(s==='doer')tapWord(i);if(s==='spot')spot(i);if(s==='cut')cut(i===0?1:0);if(s==='pick')choose(i);return false}
function move(q){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.grab;S.grab=null;if(!d)return;if(d.x==null)return place(d.i);const r=slotRects(),band={x:r[0].x,y:r[0].y,w:r[2].x+r[2].w-r[0].x,h:r[0].h};
 if(inside(q,band,30))place(d.i);else{tell('Drop the chunk on the sentence line.');A.redraw()}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,run=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(run,60)};setTimeout(run,30)}
const reset=()=>{gen++;Object.assign(S,fresh())};
function oneMove(){const s=stage();if(S.wait)return;if(s==='doer')return tapWord(DOER[S.k].d[0]);if(s==='flip'){const f=flipNow();return place(pool().indexOf(f.parts[S.fill.length]))}
 if(s==='spot')return spot(SPOT.findIndex((x,i)=>x[1]&&!S.found.includes(i)));if(s==='cut')return cut(CUT[S.k].keep);if(s==='pick')return choose(PICK[S.k].ans)}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Find the doer',p:'Every action has a doer (the agent) and often a receiver. Tap the doer in each sentence.',predict:{q:'The cat was chased by the dog. Who did the chasing?',opts:['The cat, because it comes first','The dog'],ans:1},task:'Find 3 doers',show:show(0),
 go:()=>{reset();tell('Who is doing the chasing? Tap the doer.');pads();S.after=finish(0,'In the active voice the doer is the subject. In the passive the receiver is the subject and the doer moves after by, or vanishes.')}},
{h:'Flip it',p:'Turn the active sentence into the passive: receiver first, then be + past participle, then by + doer.',predict:{q:'Sam broke the window. In the passive, what happens to broke?',opts:['It stays: was broke','It becomes was broken'],ans:1},task:'Flip 3 sentences',show:show(1),
 go:()=>{reset();tell('Build the passive. Start with the receiver.');pads();S.after=finish(1,'Passive = form of be (is, are, was, were) + past participle. Be agrees with the new subject.')}},
{h:'Real or look-alike?',p:'A form of be is not enough. Tap only the sentences where something is done to the subject.',predict:{q:'Is "The cake was delicious" passive?',opts:['Yes, it has was','No, delicious is not a past participle'],ans:1},task:'Find 3 passives',show:show(2),
 go:()=>{reset();tell('Tap the 3 passive sentences.');pads();S.after=finish(2,'Was + adjective (happy, delicious) or was + -ing is not passive. Look for be + past participle.')}},
{h:'Keep or cut "by"?',p:'The by-phrase is optional. Keep it when the doer matters. Cut it when it adds nothing.',task:'Decide 3 times',show:show(3),
 go:()=>{reset();tell('Keep or cut the by-phrase?');pads();S.after=finish(3,'An agentless passive drops the doer when it is unknown, obvious or unimportant.')}},
{h:'Choose the voice',p:'Read the purpose. Tap the version that fits it best.',task:'Choose 3 times',show:show(4),
 go:()=>{reset();tell('Read the purpose and tap the better version.');pads();S.after=finish(4,'Use active for lively, clear action. Use passive to focus on the receiver or process, or when the doer is unknown.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which sentence is passive?',[['The ball was kicked by Ella.','ok'],['Ella kicked the ball.','act'],['Ella was kicking the ball.','ing']]],
 ['Make it passive: The wind blew the tent away.',[['The tent was blown away by the wind.','ok'],['The tent was blew away by the wind.','past'],['The wind was blowing the tent away.','ing']]],
 ['The song was sung by the choir. Who did the singing?',[['the choir','ok'],['the song','first'],['We are not told','gone']]],
 ['Why might a science report say "The salt was dissolved in water"?',[['The process matters, not who did it','ok'],['Passive is always better writing','always'],['It makes the sentence shorter','short']]],
 ['Which sentence is NOT passive?',[['The door was green.','ok'],['The door was painted.','pp'],['The door was painted by Dad.','pp']]],
 ['Make it passive: The teachers mark the tests.',[['The tests are marked by the teachers.','ok'],['The tests is marked by the teachers.','agree'],['The tests marked the teachers.','swap']]]];
function why(t){let m='Passive = receiver as subject + be + past participle.';
 if(t==='act')m='Ella kicked the ball is active: the doer, Ella, is the subject.';if(t==='ing')m='Was kicking or was blowing is the past progressive, and the doer is still the subject. That is active.';
 if(t==='past')m='Blew is the simple past. The passive needs the past participle: was blown.';if(t==='first')m='Coming first does not make it the doer. The song is the receiver; the doer comes after by.';
 if(t==='gone')m='We are told: by the choir names the doer.';if(t==='always')m='Not always. Active is often clearer. Passive suits reports where the action matters more than the doer.';
 if(t==='short')m='It is not shorter. It moves the focus onto the salt and the process.';if(t==='pp')m='Was painted is be + past participle, so that one is passive. Was green only describes the door.';
 if(t==='agree')m='Tests is plural, so be must agree: are marked.';if(t==='swap')m='Swapping the nouns changes the meaning. Keep the meaning and add be + past participle.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
