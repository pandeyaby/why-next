/* Flagship – self-reflection in relationships (ages 9–11). Look at how YOU act with friends: tally your own moments
   until a pattern shows (one time is a moment, again and again is a pattern), slide a habit to find the amount that
   helps everyone (leading, staying quiet, talking about yourself), name strengths as well as stretches, and turn a
   pattern into a goal you can check: when + I will + something you can see. Every drag has a button twin. */
(()=>{
const COLS=[['🗣️','I decided for us'],['🙋','I asked others'],['🤐','I went along']];
const MOMENTS=[['I picked the teams at football.',0],['I asked Sam which game he wanted.',1],['I chose our project topic before anyone spoke.',0],
 ['I played the game Ella chose, though I did not want to.',2],['I told everyone where we would sit at lunch.',0],['I said: what do you think, Jo?',1]];
const DIALS=[{who:'🧑‍🤝‍🧑',what:'How often Kai decides for the group',lo:[3,6],says:[[3,'Nobody chooses, so break time runs out.'],[7,'Kai gets us started, and asks us too.'],[11,'We never get a say. I will stop sharing ideas.']]},
 {who:'👧',what:'How often Ava stays quiet when she disagrees',lo:[3,6],says:[[3,'Ava argues about every little thing. It is tiring.'],[7,'Ava lets small things go, and says so when it matters.'],[11,'We never know what Ava wants. She ends up left out.']]},
 {who:'👦',what:'How much Leo talks about himself',lo:[3,6],says:[[3,'Leo never shares. It is hard to get to know him.'],[7,'Leo shares his news and asks about ours.'],[11,'It is always about Leo. I stop telling him things.']]}];
const NOTES=[['I notice when someone is left out and ask them to join.',0],['I interrupt when others are talking.',1,'Cutting in stops others finishing. That is a stretch: something to work on.'],
 ['I keep the secrets friends tell me.',0,'Keeping a secret builds trust. That is a strength to be proud of.'],['I walk off when we disagree.',1,'Walking off leaves the problem there. That is a stretch you can work on.'],
 ['I say sorry when I get it wrong.',0,'Owning a mistake is a strength. Name it, so you keep doing it.'],['I only ever play with my best friend.',1,'Others may feel shut out. That is a stretch: try one new person.']];
const GOALS=[{pat:'I choose the game before others can speak.',ops:[['Be less bossy.',0,'Too vague. What will you do, and when? You could not tell if you did it.'],['At break, I will ask two friends what they want to play before I suggest a game.',1],['Never suggest a game again.',0,'That throws away a strength. Your ideas help too. Just ask first.']]},
 {pat:'I stay quiet when I disagree, then feel left out.',ops:[['Always argue back.',0,'That goes too far the other way. Small things can be let go.'],['Be braver.',0,'Too vague. When, and what will you say?'],['When I disagree with a plan, I will say once, kindly: I would like to try…',1]]},
 {pat:'I talk about myself a lot.',ops:[['When a friend tells me news, I will ask one question about it before I share mine.',1],['Stop talking to friends.',0,'Friends want to know you too. Change how, not whether.'],['Be a better friend.',0,'Too vague. Pick one thing you will do, and when.']]}];
VIS.reg('flagmirror',c=>{let A,pad,quiz,qn=-1,run=0,row=0;
const S={};const clear=()=>Object.assign(S,{at:0,got:0,need:3,v:9,bar:[0,0,0],bad:-1,won:0,hold:null,zones:[],after:()=>{},auto:0});
const stage=()=>['hi','tally','dial','note','goal','quiz'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),instant=()=>A.reduced()||S.auto;
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,s,x,y,w,px,col,wt){g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[''];for(const p of String(s).split(' ')){const t=out[out.length-1]?out[out.length-1]+' '+p:p;if(out[out.length-1]&&g.measureText(t).width>w)out.push(p);else out[out.length-1]=t}
 out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*u(px)*1.3))}
function plate(g,r,hue,dashed){const C=A.col,e={g:C.gr,r:C.rd,c:C.cy,a:C.am,v:C.vi,p:C.pk}[hue]||C.ln;g.save();
 if(dashed)g.setLineDash([6,5]);else{A.paint.shadow(6,2,.1);g.fillStyle=hue?A.mix(C.pn,e,.12):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,13);g.fill();A.paint.noShadow()}
 g.lineWidth=hue?2.5:2;g.strokeStyle=e;A.paint.rrect(r.x,r.y,r.w,r.h,13);g.stroke();g.restore()}
function face(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
const inZone=d=>S.v>=d.lo[0]&&S.v<=d.lo[1],line=d=>d.says.find(s=>S.v<s[0])[1];
const trackOf=()=>({x:A.W*.1,y:A.H*.62,w:A.W*.8});
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=stage();S.zones=[];
 if(m==='quiz'){write(g,'Spot your patterns, use the right amount, name strengths too, and set a goal you can check.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(m==='hi'){face(g,'🪞',W/2,H*.14,u(54));const r={x:16,y:H*.28,w:W-32,h:H*.3};plate(g,r,'c');
  write(g,'Reflecting on friendships means looking at what YOU do with others, not just what they do.',W/2,r.y+r.h/2,r.w-24,18,C.tx,800);
  write(g,'Spot a pattern. Name a strength. Pick one thing to work on.',W/2,H*.72,W-30,17,C.gr,800);return}
 if(m==='tally'){const top=H*.03,cw=(W-40)/3,base=H*.5,unit=Math.min(u(34),H*.1);
  COLS.forEach((k,i)=>{const x=16+i*(cw+4),bin={x,y:top,w:cw,h:base-top,i};const most=S.got>=6&&i===0;plate(g,bin,most?'g':S.bad===i?'r':'v',!most);
   face(g,k[0],x+cw/2,top+u(20),u(26));write(g,k[1],x+cw/2,top+u(50),cw-8,13,C.tx,800);
   for(let j=0;j<S.bar[i];j++){const b={x:x+10,y:base-10-(j+1)*(unit+4),w:cw-20,h:unit};g.fillStyle=A.alpha(i===0?C.am:i===1?C.cy:C.vi,.55);A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fill()}
   write(g,String(S.bar[i]),x+cw/2,base+u(14),cw,15,C.tx,900);S.zones.push(bin)});
  const mo=MOMENTS[S.at];if(mo){const d=S.hold,h=u(70),r=d&&d.x!=null?{x:d.x-(W-40)/2,y:d.y-h/2,w:W-40,h}:{x:20,y:H*.62,w:W-40,h};plate(g,r,'a');
   write(g,mo[0],r.x+r.w/2,r.y+h/2,r.w-20,17,C.tx,800);S.card=r;write(g,'Drag it up to the right column, or tap a column.',W/2,H*.62+h+u(22),W-30,14,C.mu,700)}
  else write(g,'Pattern: I often decide for the group (3 of 6 moments).',W/2,H*.7,W-30,18,C.gr,900)}
 if(m==='dial'){const d=DIALS[S.at];if(!d)return;const ok=inZone(d),t=trackOf();face(g,d.who,W*.14,H*.12,u(40));
  const b={x:W*.26,y:H*.03,w:W*.72,h:H*.2};plate(g,b,ok?'g':'a');write(g,'“'+line(d)+'”',b.x+b.w/2,b.y+b.h/2,b.w-16,15,C.tx,800);
  write(g,d.what,W/2,H*.33,W-30,17,C.tx,900);face(g,ok?'🙂':'😕',W/2,H*.45,u(40));
  if(S.won){g.fillStyle=A.alpha(C.gr,.3);A.paint.rrect(t.x+t.w*d.lo[0]/10,t.y-14,t.w*(d.lo[1]-d.lo[0])/10,28,10);g.fill()}
  g.strokeStyle=C.ln;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(t.x,t.y);g.lineTo(t.x+t.w,t.y);g.stroke();
  const kx=t.x+t.w*S.v/10;A.paint.ball(kx,t.y,u(17),ok?C.gr:C.am);S.zones=[{x:kx-u(26),y:t.y-u(26),w:u(52),h:u(52),i:0}];
  write(g,'Never',t.x,t.y+u(32),80,14,C.mu,800);write(g,'Always',t.x+t.w,t.y+u(32),80,14,C.mu,800);
  write(g,S.won?'✓ The right amount helps everyone.':'Drag the dot, then check how it feels for everyone.',W/2,H*.86,W-30,15,S.won?C.gr:C.tx,800)}
 if(m==='note'){const n=NOTES[S.at];const gap=10,bw=(W-32-gap)/2,bh=Math.min(u(96),H*.24),y=H-bh-12;
  [['💪','Strength: I do this well','g'],['🌱','Stretch: I will work on it','p']].forEach((k,i)=>{const r={x:16+i*(bw+gap),y,w:bw,h:bh,i};plate(g,r,S.bad===i?'r':k[2],1);face(g,k[0],r.x+bw/2,y+bh*.32,u(30));write(g,k[1],r.x+bw/2,y+bh*.72,bw-12,14,C.tx,800);S.zones.push(r)});
  write(g,'Priya looks in the mirror: strength or stretch?',W/2,H*.05,W-30,15,C.mu,800);
  if(n){const d=S.hold,h=u(84),r=d&&d.x!=null?{x:d.x-(W-40)/2,y:d.y-h/2,w:W-40,h}:{x:20,y:H*.14,w:W-40,h};plate(g,r,'c');write(g,n[0],r.x+r.w/2,r.y+h/2,r.w-20,17,C.tx,800);S.card=r}
  else write(g,'✓ 3 strengths and 3 stretches. Honest, and fair to herself.',W/2,H*.3,W-30,17,C.gr,900);
  write(g,`Strengths ${S.bar[0]} · Stretches ${S.bar[1]}`,W/2,y-u(22),W-30,15,C.tx,800)}
 if(m==='goal'){const it=GOALS[S.at];if(!it)return;const pr={x:16,y:H*.03,w:W-32,h:u(62)};plate(g,pr,'a');write(g,'Pattern: '+it.pat,W/2,pr.y+pr.h/2,pr.w-20,16,C.tx,800);
  const slot={x:16,y:pr.y+pr.h+u(14),w:W-32,h:u(70)},good=it.ops.find(o=>o[1]);plate(g,slot,S.won?'g':'v',!S.won);
  write(g,S.won?'🎯 '+good[0]:'🎯 My goal: drop one here, or tap it.',W/2,slot.y+slot.h/2,slot.w-20,S.won?14:15,S.won?C.tx:C.mu,800);S.slot=slot;
  if(!S.won){const y0=slot.y+slot.h+u(16),gap=8,h=Math.min(u(74),(H-y0-10-2*gap)/3);it.ops.forEach((o,i)=>{const d=S.hold,r=d&&d.i===i&&d.x!=null?{x:d.x-(W-32)/2,y:d.y-h/2,w:W-32,h,i}:{x:16,y:y0+i*(h+gap),w:W-32,h,i};
   plate(g,r,S.bad===i?'r':'c');write(g,o[0],W/2,r.y+h/2,r.w-20,15,C.tx,800);S.zones.push(r)})}else write(g,'When + I will + something you can see. You can check it tomorrow.',W/2,slot.y+slot.h+u(30),W-30,15,C.gr,800)}
 A.fx.draw(g)}
function nope(t,j){A.sound.miss();S.bad=j;speak(t);A.redraw();setTimeout(()=>{S.bad=-1;A.redraw()},instant()?10:1900)}
function gain(t,nextAfter){S.got++;A.sound.pop();speak(t);controls();A.redraw();if(S.got>=S.need)S.after();else if(nextAfter)wait(()=>{S.at++;S.won=0;S.v=9;speak('Next one.');controls();A.redraw()},1800)}
function wait(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r===run&&S.at===at)f()},instant()?5:ms)}
function put(i){const m=stage();if(S.got>=S.need)return;
 if(m==='tally'){const mo=MOMENTS[S.at];if(!mo)return;if(i!==mo[1])return nope(`Read it again: “${mo[0]}” goes in: ${COLS[mo[1]][1]}.`,i);S.bar[i]++;S.at++;
  return gain(S.at>=6?'The tallest column is the pattern: I often decide for the group. Once is a moment; again and again is a pattern.':'Added. '+S.bar.join(', ')+' so far.')}
 if(m==='note'){const n=NOTES[S.at];if(!n)return;if(i!==n[1])return nope(n[2]||'Asking others to join helps them feel welcome. That is a strength.',i);S.bar[i]++;S.at++;return gain(i?'A stretch: something to work on.':'A strength: keep doing it.')}
 if(m==='goal'){const o=GOALS[S.at].ops[i];if(S.won)return;if(!o[1])return nope(o[2],i);S.won=1;return gain('A goal you can check: '+o[0],1)}}
function check(){const d=DIALS[S.at];if(!d||S.won||S.got>=S.need)return;if(!inZone(d))return nope('Your friend says: '+line(d)+' Try a different amount.',-1);S.won=1;gain('Just right: '+line(d),1)}
function nudge(k){S.v=Math.max(0,Math.min(10,S.v+k));speak(DIALS[S.at].what+': '+S.v+' out of 10. '+line(DIALS[S.at]));A.redraw()}
function controls(){if(!pad)return;pad.innerHTML='';const m=stage(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if(m==='tally'&&MOMENTS[S.at])COLS.forEach((k,i)=>B(k[0]+' '+k[1],()=>put(i)));
 if(m==='note'&&NOTES[S.at]){B('💪 Strength',()=>put(0));B('🌱 Stretch',()=>put(1))}
 if(m==='dial'&&!S.won){B('◀ Less',()=>nudge(-1),'Less often');B('More ▶',()=>nudge(1),'More often');B('✓ Check',check,'Check how it feels for everyone')}
 if(m==='goal'&&!S.won)GOALS[S.at].ops.forEach((o,i)=>B(o[0],()=>put(i)))}
const hit=(p,r)=>p.x>r.x-4&&p.x<r.x+r.w+4&&p.y>r.y-4&&p.y<r.y+r.h+4;
function down(p){const m=stage();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;
 if(m==='dial'){if(S.won)return false;const t=trackOf();if(Math.abs(p.y-t.y)>u(40))return false;S.hold={dial:1};slide(p);return true}
 if((m==='tally'||m==='note')&&S.card&&hit(p,S.card)){S.hold={i:-1,x:null,sx:p.x,sy:p.y};return true}
 const z=S.zones.find(r=>hit(p,r));if(!z)return false;S.hold={i:z.i,x:null,sx:p.x,sy:p.y,tap:1};return true}
function slide(p){const t=trackOf();S.v=Math.round(Math.max(0,Math.min(10,(p.x-t.x)/t.w*10)));A.redraw()}
function move(p){const d=S.hold;if(!d)return;if(d.dial)return slide(p);if(d.tap&&stage()!=='goal')return;if(d.x!=null||Math.hypot(p.x-d.sx,p.y-d.sy)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold,m=stage();S.hold=null;if(!d)return;if(d.dial){speak(line(DIALS[S.at]));return check()}
 if(m==='goal'){if(d.x==null||p.y<S.slot.y+S.slot.h+u(10))return put(d.i);speak('Drop it in the goal box, or tap it.');return A.redraw()}
 if(d.x==null){if(d.i>=0)put(d.i);else A.redraw();return}const z=S.zones.find(r=>hit(p,r));if(z)return put(z.i);speak('Drop the card on a column, or tap one.');A.redraw()}
function auto(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
function solve(){const m=stage();if(m==='tally'&&MOMENTS[S.at])return put(MOMENTS[S.at][1]);if(m==='note'&&NOTES[S.at])return put(NOTES[S.at][1]);
 if(m==='dial'&&!S.won){S.v=5;return check()}if(m==='goal'&&!S.won)return put(GOALS[S.at].ops.findIndex(o=>o[1]))}
const reset=()=>{run++;clear()};
const done=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const show=i=>()=>{steps[i].go();S.auto=1;auto(solve)};
const steps=[
{h:'Look in the mirror',p:'Reflecting on friendships means looking at your own part: what you often do, what you do well, and one thing to work on.',go:()=>{reset();speak('Reflecting means looking at what you do with others. Spot a pattern, name a strength, pick one thing to work on.')}},
{h:'Tally your moments',p:'Sort six moments from one week. The column that grows tallest shows a pattern in how you act.',predict:{q:'You picked the game once last week. Is that a pattern?',opts:['Yes, it happened','No: a pattern happens again and again'],ans:1},task:'Sort all 6 moments',show:show(1),
 go:()=>{reset();S.need=6;speak('Drag each moment to a column, or tap a column.');controls();S.after=done(1,'3 of 6 moments were deciding for the group. That is the pattern, not just one time.')}},
{h:'The right amount',p:'Most habits are not just good or bad. Slide each one and listen to friends. Find the amount that works for everyone.',predict:{q:'Leading the group is…',opts:['always good: the more the better','helpful in the right amount'],ans:1},task:'Find the right amount for 3 habits',show:show(2),
 go:()=>{reset();speak('Drag the dot along the line, then let go to check.');controls();S.after=done(2,'Too little and too much both cause problems. Leading, letting things go and sharing news all help in the middle.')}},
{h:'Strengths and stretches',p:'Honest reflection is fair. Name what you do well, and what you could do better. A stretch is not a fault forever.',predict:{q:'Honest reflection means…',opts:['only listing what you do wrong','naming strengths and things to work on'],ans:1},task:'Sort 6 of Priya’s notes',show:show(3),
 go:()=>{reset();S.need=6;speak('Is it a strength or a stretch? Drag the note to a box, or tap one.');controls();S.after=done(3,'Priya found 3 strengths and 3 stretches. Knowing your strengths helps you keep them.')}},
{h:'A goal you can check',p:'Turn a pattern into one small goal. Say when, and what you will do, so you can tell if you did it.',predict:{q:'Which goal is easier to keep?',opts:['Be a better friend','At lunch, I will ask one friend how their day was'],ans:1},task:'Pick 3 goals you can check',show:show(4),
 go:()=>{reset();speak('Read the pattern. Drop the best goal in the box, or tap it.');controls();S.after=done(4,'Each good goal says when and what you will do, and keeps your strength. Vague goals and all-or-nothing goals are hard to keep.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Jo says: “I always want to go first in games.” What is she doing?',[['Spotting a pattern in what she does','ok'],['Being unkind to herself','harsh'],['Blaming her friends','blame']]],
 ['Which of these is a pattern?',[['Kai cuts in on most group chats','ok'],['Kai cut in once last week','once'],['Kai is a bad person','label']]],
 ['Which goal can you check?',[['In class talks, I will wait until the speaker stops','ok'],['Be nicer','vague'],['Never speak in groups','extreme']]],
 ['Mo lets friends choose every game, even ones he hates. What could he work on?',[['Saying what he would like, kindly','ok'],['Choosing every game himself from now on','extreme'],['Nothing: going along is always best','always']]],
 ['Which is a fair strength to name?',[['I keep my promises to friends','ok'],['I am the best friend in the world','brag'],['I am never good at anything','harsh']]],
 ['A friend says you never let her talk. What is a good first step?',[['Think: is that a pattern? Ask her for an example','ok'],['Tell her she is wrong and walk off','blame'],['Decide you are a terrible friend','harsh']]]];
function why(t){let m='Look at what you do, find the pattern, and pick one goal you can check.';
 if(t==='harsh')m='Reflection is honest, not harsh. Name what you did, not that you are bad.';if(t==='blame')m='That looks at others, not at your own part. Start with what you can change.';
 if(t==='once')m='Once is a moment. A pattern happens again and again.';if(t==='label')m='That judges the whole person. Name the action, so it can change.';
 if(t==='vague')m='Too vague: when, and what will you do? You could not check it.';if(t==='extreme')m='That swings too far. Keep the strength and change the amount.';
 if(t==='always')m='Going along can help, but always doing it leaves you out. The right amount matters.';if(t==='brag')m='A fair strength is something real you do, not a boast.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const el=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},el,o);b.onclick=()=>grade(t)});speak('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.4,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
