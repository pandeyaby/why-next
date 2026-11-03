/* Flagship – healthy and unhealthy relationships (ages 14–16, DfE RSE statutory guidance 2019/2025: respectful
   relationships, trust, boundaries, consent, coercive control; PSHE Association KS4 R1–R10). Sort behaviours into
   healthy and warning signs, place them on a healthy–unhealthy–abusive spectrum, spot a pattern of control across
   Jay's week, choose an assertive boundary, and pick the safe ways to help a friend. Targets the common ideas that
   jealousy proves love, that control only counts if it is physical, and that one good day cancels a pattern. */
(()=>{
const FLAGS=[['Respects it when you say no',1],['Reads your messages without asking',0],['Is happy you have other friends',1],
 ['Gets angry if you do not reply in five minutes',0],['Says sorry and changes what they do',1],['Calls you names, then says it was a joke',0]];
const SPEC=[['Wants to know you got home safe, and is fine if you forget',0],['Sulks for days when you see your friends',1],['Threatens to share your photos if you end it',2]];
const BAND=['Healthy','Unhealthy','Abusive'];
const WEEK=[['Mon','Says your friends are a bad influence',1],['Tue','Brings you a snack after your exam',0],['Wed','Asks for your location, all evening',1],
 ['Thu','Laughs at a film with you',0],['Fri','Tells you no one else would put up with you',1],['Sat','Watches a match with you and your mates',0],['Sun','Says you have to choose: them or your team',1]];
const BOUND=[{s:'Sam asks for your phone password to prove you trust them.',o:[['“I keep my passwords private. That is not about trust.”',1],['Give it, so Sam is not upset',0,'give'],['Shout that Sam is crazy and walk out',0,'shout']]},
 {s:'Alex keeps pushing to go further than you want.',o:[['Go along with it this once',0,'give'],['“No. I am not up for that.” And stop.',1],['Say nothing and hope it stops',0,'quiet']]},
 {s:'Riley wants you to skip your friend’s party to stay in.',o:[['Never speak to Riley again',0,'shout'],['Skip it and say nothing',0,'quiet'],['“I am going. I will text you after.”',1]]}];
const HELP=[['Listen, and say it is not their fault',1],['Tell a trusted adult, like a teacher',1],['Share Childline: 0800 1111',1],
 ['Go and confront the partner yourself',0],['Promise to keep it secret, whatever happens',0],['Tell them it is their own fault for staying',0]];
VIS.reg('flaghealthy',c=>{let A,box,quiz,n=-1,run=0;const S={};
const where=()=>['flags','spec','week','bound','help','quiz'][A.step];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=v=>Math.round(v*(A.narrow?1:1.12)),upd=()=>A.redraw();
function words(g,s,x,y,w,size,col,wt){g.font=`${wt||700} ${px(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[];let cur='';String(s).split(' ').forEach(p=>{const t=cur?cur+' '+p:p;if(cur&&g.measureText(t).width>w){L.push(cur);cur=p}else cur=t});L.push(cur);
 const lh=px(size)*1.28;L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*lh))}
function card(g,r,tone,dash){const C=A.col,k={ok:C.gr,bad:C.rd,mid:C.am,cool:C.cy,v:C.vi}[tone]||C.ln;g.save();if(dash)g.setLineDash([5,4]);
 g.fillStyle=tone?A.mix(C.pn,k,.14):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=tone?3:2;g.strokeStyle=k;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const has=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=where();S.hit=[];
 if(v==='quiz'){words(g,'Healthy means respect, trust and room to say no. Control is a pattern. Help is there.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(v==='flags'){const it=FLAGS[S.i],bw=(W-42)/2,bh=H*.3,y=H-bh-12;
  [['Healthy','ok'],['Warning sign','bad']].forEach(([t,k],j)=>{const r={x:16+j*(bw+10),y,w:bw,h:bh,j};card(g,r,S.miss===j?'mid':k,1);
   words(g,t,r.x+bw/2,y+18,bw-10,15,C.tx,900);words(g,String(S.n[j]),r.x+bw/2,y+bh*.6,bw,30,k==='ok'?C.gr:C.rd,900);S.hit.push(r)});
  if(it){const r={x:20,y:H*.06,w:W-40,h:H*.36};card(g,r,'cool');words(g,it[0],W/2,r.y+r.h/2,r.w-24,19,C.tx,800);words(g,`Card ${S.i+1} of 6: tap a box`,W/2,r.y+r.h+16,W,13,C.mu,700)}
  else words(g,'3 healthy, 3 warning signs. Respect means your no counts.',W/2,H*.25,W-30,17,C.gr,900)}
 if(v==='spec'){const y=H*.18,x0=W*.08,w=W*.84;[C.gr,C.am,C.rd].forEach((k,i)=>{g.fillStyle=k;A.paint.rrect(x0+w*i/3+2,y-8,w/3-4,16,8);g.fill()});
  BAND.forEach((b,i)=>{const bx=x0+w*(i+.5)/3;words(g,b,bx,y+26,w/3,14,C.tx,900);S.hit.push({x:x0+w*i/3,y:y-30,w:w/3,h:70,j:i})});
  SPEC.forEach((s,i)=>{const at=S.put[i],ry=H*.42+i*H*.19,r={x:20,y:ry,w:W-40,h:H*.16};card(g,r,at==null?(i===S.i?'v':0):at===s[1]?['ok','mid','bad'][at]:'mid',at==null&&i!==S.i);
   words(g,s[0],W/2,ry+r.h/2,r.w-24,14,C.tx,i===S.i?900:700);if(at!=null)A.paint.ball(x0+w*(at+.5)/3,y,px(9),C.tx)})}
 if(v==='week'){const cw=(W-28)/7,top=H*.05,ch=H*.62;
  WEEK.forEach((d,i)=>{const r={x:14+i*cw,y:top,w:cw-4,h:ch,j:i},on=S.tag[i];card(g,r,on===1?'bad':on===0?'mid':0);words(g,d[0],r.x+r.w/2,top+14,cw,12,C.tx,900);
   g.save();g.translate(r.x+r.w/2,top+ch*.56);g.rotate(-Math.PI/2);words(g,d[1],0,0,ch*.8,11,C.tx,700);g.restore();S.hit.push(r)});
  const got=WEEK.filter((d,i)=>S.tag[i]===1&&d[2]).length;words(g,got>=4?'A pattern: cutting you off, tracking, put-downs, ultimatums. That is coercive control.':`Control days found: ${got} of 4. Good days do not cancel them.`,W/2,H*.82,W-24,14,got>=4?C.rd:C.tx,800)}
 if(v==='bound'){const b=BOUND[S.i];if(!b){words(g,'Clear, calm and firm: say what you will do, then do it.',W/2,H*.4,W-30,18,C.gr,900);return}
  const r={x:16,y:H*.04,w:W-32,h:H*.2};card(g,r,'v');words(g,b.s,W/2,r.y+r.h/2,r.w-20,15,C.tx,800);
  b.o.forEach((o,j)=>{const q={x:16,y:H*.3+j*H*.23,w:W-32,h:H*.2,j};card(g,q,S.miss===j?'mid':0);words(g,o[0],W/2,q.y+q.h/2,q.w-20,14,C.tx,700);S.hit.push(q)});
  words(g,`Situation ${S.i+1} of 3`,W/2,H*.97,W,12,C.mu,700)}
 if(v==='help'){words(g,'Mo says their partner checks their phone and scares them. Pick 3 safe ways to help.',W/2,H*.07,W-30,14,C.tx,800);
  const cw=(W-38)/2,ch=H*.25;HELP.forEach((h,i)=>{const r={x:14+(i%2)*(cw+10),y:H*.17+Math.floor(i/2)*(ch+8),w:cw,h:ch,j:i},on=S.tag[i];
   card(g,r,on==null?0:h[1]?'ok':'mid');words(g,h[0],r.x+cw/2,r.y+ch/2,cw-14,13,C.tx,700);S.hit.push(r)})}}
function sortFlag(j){const it=FLAGS[S.i];if(!it)return;if((it[1]?0:1)!==j){S.miss=j;A.sound.miss();voice(j?'Look again. '+it[0]+' respects you, so it is healthy.':'Look again. '+it[0]+' is about control or put-downs. That is a warning sign.');upd();return}
 S.miss=-1;S.n[j]++;S.i++;A.sound.tick();voice(j?'Warning sign.':'Healthy.');upd();pad();S.want()}
function place(b){const i=S.i;if(i>=SPEC.length)return;const want=SPEC[i][1];S.put[i]=b;
 if(b!==want){A.sound.miss();voice(want===2&&b<2?'Threats to share photos are abuse, and a crime. It goes at the far end.':want===1&&b===0?'Sulking for days to stop you seeing friends puts pressure on you. That is unhealthy.':'This one is caring. They check you are safe and let it go. That is healthy.');upd();return}
 S.i++;A.sound.tick();voice(BAND[b]+'.');upd();pad();S.want()}
function day(i){if(S.tag[i]!=null)return;const d=WEEK[i];S.tag[i]=d[2];if(d[2])A.sound.tick();else{A.sound.miss();voice(d[0]+' was a kind day. Kind days can sit next to control. Look for the pattern.')}
 if(d[2])voice(d[0]+': '+d[1]+'. That is control.');upd();pad();S.want()}
function choose(j){const b=BOUND[S.i];if(!b)return;const o=b.o[j];if(!o[1]){S.miss=j;A.sound.miss();
  voice(o[2]==='give'?'Giving in teaches them your no can be pushed. You can say no and still be kind.':o[2]==='shout'?'Your feelings make sense, but shouting can make things unsafe. Say it calmly and firmly.':'Saying nothing leaves it unclear. Say it plainly, so they know where you stand.');upd();return}
 S.miss=-1;S.i++;A.sound.tick();voice('Assertive: clear and calm.');upd();pad();S.want()}
function helpPick(i){if(S.tag[i]!=null)return;const h=HELP[i];S.tag[i]=h[1];if(h[1])A.sound.tick();else{A.sound.miss();
  voice(i===3?'Confronting the partner could put you both in danger. Tell an adult instead.':i===4?'You cannot promise that. If someone is at risk, an adult needs to know.':'Blame makes it harder to get out. It is never their fault.')}upd();pad();S.want()}
function tap(p){const v=where(),z=(S.hit||[]).find(r=>has(p,r));if(!z)return false;
 if(v==='flags')sortFlag(z.j);if(v==='spec')place(z.j);if(v==='week')day(z.j);if(v==='bound')choose(z.j);if(v==='help')helpPick(z.j);return false}
function pad(){if(!box)return;box.innerHTML='';const v=where(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},box,t);b.onclick=f};
 if(v==='flags'&&FLAGS[S.i]){B('Healthy',()=>sortFlag(0),'Healthy: '+FLAGS[S.i][0]);B('Warning sign',()=>sortFlag(1),'Warning sign: '+FLAGS[S.i][0])}
 if(v==='spec'&&SPEC[S.i])BAND.forEach((b,j)=>B(b,()=>place(j),b+': '+SPEC[S.i][0]));
 if(v==='week')WEEK.forEach((d,i)=>{if(S.tag[i]==null)B(d[0]+': '+d[1],()=>day(i))});
 if(v==='bound'&&BOUND[S.i])BOUND[S.i].o.forEach((o,j)=>B('Option '+'ABC'[j],()=>choose(j),o[0]));
 if(v==='help')HELP.forEach((h,i)=>{if(S.tag[i]==null)B(h[0],()=>helpPick(i))})}
const okDone=(k,t,msg)=>()=>{if(A.step===k&&t()&&(!steps[k].predict||A.pred[k]!=null))A.done(msg+A.reveal(k))};
const auto=(fs,ms)=>{const k=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*25+25:(j+1)*ms))};
const fresh=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},i:0,n:[0,0],miss:-1,put:[],tag:[],hit:[]})};
const steps=[
{h:'Healthy or warning sign?',p:'Read each card. Is it healthy, or a warning sign (a red flag)?',task:'Sort all 6 cards',
 show:()=>{steps[0].go();auto(FLAGS.map(f=>()=>sortFlag(f[1]?0:1)),550)},
 go:()=>{fresh();voice('A card about how someone treats you. Healthy or a warning sign?');pad();S.want=okDone(0,()=>S.i>=6,'Healthy relationships rest on respect and trust.')}},
{h:'The spectrum',p:'Relationships are not just good or bad. Place each one: healthy, unhealthy or abusive.',predict:{q:'Jealousy that stops you seeing friends shows they really care. True?',opts:['False: it is a warning sign of control','True: it shows love','True, if they say sorry after'],ans:0},task:'Place all 3 on the spectrum',
 show:()=>{steps[1].go();auto(SPEC.map(s=>()=>place(s[1])),800)},
 go:()=>{fresh();voice('A line from healthy to abusive. Where does each one go?');pad();S.want=okDone(1,()=>S.i>=3,'It runs from healthy to unhealthy to abusive.')}},
{h:'Spot the pattern',p:'This is Jay’s week with a partner. Tap each day that shows control.',predict:{q:'To spot coercive control, what matters most?',opts:['The pattern over time','One really bad day','Whether they ever hit'],ans:0},task:'Find the 4 control days',
 show:()=>{steps[2].go();auto([0,2,4,6].map(i=>()=>day(i)),700)},
 go:()=>{fresh();voice('Seven days. Tap the ones that show control.');pad();S.want=okDone(2,()=>WEEK.filter((d,i)=>S.tag[i]===1&&d[2]).length>=4,'Coercive control is a pattern, and it is a crime.')}},
{h:'Set a boundary',p:'Pick the reply that is clear, calm and firm. That is called assertive.',task:'Answer all 3 situations',
 show:()=>{steps[3].go();auto(BOUND.map(b=>()=>choose(b.o.findIndex(o=>o[1]))),800)},
 go:()=>{fresh();voice('A situation. Pick the assertive reply.');pad();S.want=okDone(3,()=>S.i>=3,'A boundary says what you will and will not do.')}},
{h:'Help a friend',p:'Mo trusts you with something. Pick the 3 safe ways to help.',task:'Find the 3 safe ways',
 show:()=>{steps[4].go();auto([0,1,2].map(i=>()=>helpPick(i)),700)},
 go:()=>{fresh();voice('Mo needs help. Pick the safe ways.');pad();S.want=okDone(4,()=>[0,1,2].every(i=>S.tag[i]===1),'Listen, believe, and get an adult. In danger now: 999 or 911.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QZ=[['Your partner wants your location on all the time. What is it?',[['A warning sign of control','ok'],['Just being caring','care'],['Normal if you are close','normal']]],
 ['What is coercive control?',[['A pattern of control, threats or put-downs','ok'],['One argument','once'],['Only hitting','hit']]],
 ['Someone says no. What is the respectful thing to do?',[['Stop, and accept it','ok'],['Ask again later until they agree','push'],['Act hurt so they change their mind','guilt']]],
 ['A friend says their partner scares them. Best first step?',[['Listen, then tell a trusted adult','ok'],['Confront the partner','fight'],['Keep it secret','secret']]],
 ['They are kind most days, but cut you off from friends. Is it healthy?',[['No, the pattern still matters','ok'],['Yes, kind days cancel it','cancel'],['Yes, if they are sorry','sorry']]],
 ['Which is a sign of a healthy relationship?',[['You can say no and it is respected','ok'],['They choose who you see','choose'],['They check your phone','phone']]]];
function why(t){let m='Healthy means respect, trust and your no counts.';
 if(t==='care')m='Caring is checking you got home, not tracking you all the time. Constant tracking is control.';
 if(t==='normal')m='Being close does not mean being watched. You get to have privacy.';
 if(t==='once')m='One argument can happen in any relationship. Coercive control is a repeated pattern.';
 if(t==='hit')m='Control does not have to be physical. Threats, tracking and put-downs count too.';
 if(t==='push'||t==='guilt')m='Pushing or guilt-tripping after a no is pressure. Consent is given freely, not worn down.';
 if(t==='fight')m='Confronting them could make it more dangerous. Tell a trusted adult or call Childline.';
 if(t==='secret')m='If someone is at risk, an adult needs to know. Do not promise to keep it secret.';
 if(t==='cancel'||t==='sorry')m='Kind days and sorry can sit inside a pattern of control. Look at what keeps happening.';
 if(t==='choose'||t==='phone')m='Choosing who you see or checking your phone is control, not respect.';
 return m}
function next(){n++;const[q,ops]=QZ[n%QZ.length],rot=n%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});voice('Challenge: '+q);upd()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?'Correct. Streak: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Next question</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;box.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);box=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);
  const note=E('p',{class:'fl-note'},A.below,'If you or someone you know is not safe: Childline 0800 1111 (UK), loveisrespect: text LOVEIS to 22522 (US). In danger now: 999 or 911.');
  fresh();A.gest({down:tap});pad()}});
A.start()})})();
