/* Flagship – your impact on others (ages 8–9). Intent is what you meant; impact is how it lands for the other person.
   Drag the impact meter to read how an action landed from the clues, tap the clue that shows impact (not your own
   intent), think before you act by testing choices on the meter, rewind a story and replay a better move, then check in
   when you are not sure. Every drag has a button twin. */
(()=>{
const FACES=['😢','🙁','😐','🙂','😄'],FN=['very upset','upset','okay','happy','very happy'];
/* meant: who, name, what you did, what you meant, clue, ok zone, why if wrong */
const MEANT=[['🧒','Leo','Leo trips in the hall. You laugh out loud.','It looked funny.','Leo goes red and looks at the floor.',[0,1],'Leo went red and looked down. That is a hurt or embarrassed face, not a laughing one.'],
 ['👧','Ana','You tell Ana, "Your drawing is so weird!"','Weird means cool and different.','Ana covers her drawing with her arm.',[0,1],'Ana hid her drawing. It landed as a put-down, even though you meant it kindly.'],
 ['👦','Sam','You save a seat for Sam at lunch.','I want Sam to feel welcome.','Sam grins and sits down next to you.',[3,4],'Sam grinned and sat down. This time the impact matched what you meant.']];
/* clue: who, name, situation, cards [text, ok, why], impact */
const CLUE=[['👧','Mia','At the park you call Mia "slowcoach" as a joke.',[['Mia stops smiling and goes quiet',1],['You were laughing, so it was fine',0,'Your laugh shows how you felt, not how Mia felt.'],['Mia has a red coat on',0,'A coat is not a clue about feelings. Watch her face and what she does.']],1],
 ['🧑','Raj','You borrow Raj\'s pen and keep it all day.',[['You meant to give it back',0,'That is your intent. The clue is what Raj does.'],['Raj keeps looking at your desk and sighs',1],['It is a blue pen',0,'The pen is not a feeling clue. Watch what Raj does.']],1],
 ['👵','Gran','You phone Gran to tell her about your day.',[['Gran lives far away',0,'Where she lives is not a feeling clue. Listen to how she sounds.'],['You talked for a long time',0,'That is what you did. Listen for how Gran sounds.'],['Gran laughs and asks lots of questions',1]],4]];
/* act/rewind/check: who, name, story, cards [text, impact, why], start impact */
const ACT=[['🧒','Jo','One cookie is left. You and Jo both want it.',[['Grab it before Jo sees',1,'Jo would feel it was unfair. Grabbing first leaves Jo out.'],['Ask, "Shall we split it?"',4],['Hide it in your bag',0,'If Jo finds out, Jo will feel tricked.']]],
 ['👦','Finn','Finn is new. He stands alone at break.',[['Keep playing and ignore him',1,'You may not mean to leave him out, but Finn would feel lonely.'],['Whisper about him with a friend',0,'Whispering where he can see would hurt a lot.'],['Ask, "Want to join our game?"',4]]],
 ['👧','Lily','Lily built a tall tower. You want the blocks.',[['Ask, "Can I build next to you?"',3],['Pull blocks from the bottom',0,'The tower falls. Lily would be very upset.'],['Say, "Your tower is boring"',1,'That is a put-down. It would hurt, even as a joke.']]]];
const REW=[['🧒','Kai','Kai tells you about his trip. You cut in to talk about yours. Kai goes quiet.',[['Talk louder about your trip',0,'Louder would make Kai feel even less heard.'],['Listen, then ask, "What was the best bit?"',4],['Walk away',1,'Walking off tells Kai you are not interested.']],1],
 ['👧','Zoe','You both run for the swing. You grab it and shout "Mine!" Zoe stomps off.',[['Say, "Take turns? Ten swings each."',4],['Say, "I got here first"',1,'That may be true, but Zoe still feels pushed out.'],['Swing higher so she sees',0,'Showing off would make it worse.']],1],
 ['👦','Ben','Ben\'s team loses. You shout "You lot are rubbish!" Ben looks down.',[['Laugh with your team',0,'Laughing at him adds to the hurt.'],['Say nothing',2,'Better, but a kind word would help Ben feel okay.'],['Say, "Good game, Ben"',3]],1]];
const CHK=[['👧','Ella','You tease Ella about her new haircut. She gives a small laugh, then goes quiet.',[['Say, "You\'re fine, right?"',1,'That tells Ella how to feel. Ask, then listen.'],['Ask, "Was that okay? I didn\'t mean to upset you."',3],['Tease her again',0,'She went quiet, so more teasing would hurt more.']],2],
 ['🧒','Max','You win a game and cheer loudly. Max shrugs and looks away.',[['Cheer again',1,'Max already looks flat. More cheering rubs it in.'],['Say, "Don\'t be a bad loser"',0,'That blames Max for how he feels.'],['Say, "Good game. Want a rematch?"',4]],2],
 ['👦','Omar','You read Omar\'s note out loud to the class. His ears go red.',[['Say later, "Sorry, I should have asked you first."',3],['Say, "It was only a note"',1,'That makes his feeling small. His red ears show it mattered.'],['Read another one',0,'That would embarrass him even more.']],2]];
VIS.reg('flagimpact',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,mk:2,hit:-1,cards:[],zone:'',bad:-1,grab:null,ok:0,d:null}),S=fresh();
const part=()=>['meant','clue','act','rew','chk','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.12)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,w,n,col,wt,al){g.font=`${wt||600} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(z=>{const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q});L.push(s);const h=sz(n)*1.25;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h));return L.length*h}
function emo(g,e,x,y,s){g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(g,r,label,fill,stroke,lw){g.save();A.paint.shadow(5,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();A.paint.noShadow();g.strokeStyle=stroke;g.lineWidth=lw;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore();txt(g,label,r.x+r.w/2,r.y+r.h/2,r.w-18,14,A.col.tx,700)}
/* geometry: people on top, story, drop zone, impact meter, option cards */
const zoneR=()=>({x:20,y:A.H*.3,w:A.W-40,h:sz(44)}),ch=()=>sz(42),top=()=>A.H-3*(ch()+8)-10;
const meter=()=>{const x=24,w=A.W-48,z=zoneR(),y=z.y+z.h+(top()-z.y-z.h)*.42;return{x,w,y,pos:i=>x+w*(i/4)}};
const cardsR=()=>{const h=ch(),y0=top();return S.cards.map((c,j)=>({x:20,y:y0+j*(h+8),w:A.W-40,h}))};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=part();if(v==='quiz'){txt(g,'Intent is what you meant. Impact is how it lands. Read the clues, think first, check in.',W/2,H*.45,W-48,16);return}
 const d=S.d;if(!d)return;emo(g,'🙂',W*.2,H*.07,sz(38));txt(g,'You',W*.2,H*.07+sz(28),80,12,C.mu);emo(g,d[0],W*.8,H*.07,sz(38));txt(g,d[1],W*.8,H*.07+sz(28),90,12,C.mu);
 g.strokeStyle=C.ln;g.lineWidth=2;g.setLineDash([4,5]);g.beginPath();g.moveTo(W*.2+sz(26),H*.07);g.lineTo(W*.8-sz(26),H*.07);g.stroke();g.setLineDash([]);
 txt(g,d[2],W/2,H*.205,W-40,15,C.tx,600);
 const z=zoneR();
 if(v==='meant'){g.fillStyle=A.alpha(C.vi,.12);A.paint.rrect(z.x,z.y,z.w,z.h,10);g.fill();txt(g,'You meant: '+d[3],W/2,z.y+z.h/2,z.w-16,14,C.vi,700);
  txt(g,'Clue: '+d[4],W/2,top()+ch(),W-40,15,C.tx,700);txt(g,'Drag the dot to how it landed for '+d[1],W/2,H-ch(),W-40,13,C.mu)}
 else{g.setLineDash(S.zone?[]:[5,4]);g.strokeStyle=S.zone?C.gr:C.vi;g.lineWidth=2.5;g.fillStyle=S.zone?A.alpha(C.gr,.14):A.alpha(C.vi,.06);A.paint.rrect(z.x,z.y,z.w,z.h,10);g.fill();g.stroke();g.setLineDash([]);
  txt(g,S.zone||({clue:'Drop the clue here',act:'Drop what you do here',rew:'Replay: drop a better move here',chk:'Drop what you say here'})[v],W/2,z.y+z.h/2,z.w-16,14,S.zone?C.tx:C.mu,700);
  if(!S.ok)cardsR().forEach((r,j)=>{if(S.grab&&S.grab.x!=null&&S.grab.j===j)return;const b=S.bad===j;card(g,r,S.cards[j][0],b?A.mix(C.pn,C.rd,.2):C.pn,b?C.rd:C.vi,b?3.5:2)})}
 /* impact meter */
 const m=meter();txt(g,'How it lands for '+d[1],W/2,m.y-sz(24),W-40,12,C.mu,700);g.strokeStyle=C.ln;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(m.x,m.y);g.lineTo(m.x+m.w,m.y);g.stroke();
 FACES.forEach((f,i)=>{const near=Math.abs(S.mk-i)<.5;emo(g,f,m.pos(i),m.y+sz(22),sz(near?24:19));if(near)txt(g,FN[i],m.pos(i),m.y+sz(42),90,11,C.tx,700)});
 const mx=m.x+m.w*(S.mk/4),col=S.mk<1.5?C.rd:S.mk<2.5?C.or:C.gr;g.fillStyle=col;g.beginPath();g.arc(mx,m.y,sz(13),0,7);g.fill();g.strokeStyle=C.pn;g.lineWidth=3;g.stroke();
 if(S.grab&&S.grab.x!=null&&S.grab.j!=null){const r=cardsR()[0];card(g,{x:S.grab.x-r.w/2,y:S.grab.y-r.h/2,w:r.w,h:r.h},S.cards[S.grab.j][0],C.pn,C.cy,3)}
 A.fx.draw(g)}
const miss=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()};
const DATA=()=>({meant:MEANT,clue:CLUE,act:ACT,rew:REW,chk:CHK})[part()];
function deal(){const v=part();S.ok=0;S.bad=-1;S.grab=null;S.zone='';if(v==='quiz')return;const d=DATA()[S.k];S.d=d;
 S.cards=v==='meant'?[]:d[3];S.mk=v==='meant'||v==='clue'||v==='act'?2:d[4];A&&A.redraw()}
const goal=()=>3;
function next(t){S.ok=1;S.n++;A.sound.pop();if(S.n<goal()){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;S.wait=0;S.k++;deal();tell(t+' Next one: '+S.d[2]);buttons();A.redraw()},fast()?5:900);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
const slide=to=>A.tween(S,{mk:to},fast()?0:450);
const busy=()=>S.n>=goal()||S.wait||S.ok;
function setMeter(i){if(part()!=='meant'||busy())return;const d=S.d;slide(i);
 if(d[5].includes(i))return next(`Yes: ${FN[i]}. You meant "${d[3]}" The clue shows how it landed.`);miss(d[6])}
function pick(j){const v=part();if(v==='meant'||v==='quiz'||busy())return;const d=S.d,[t,val,why]=S.cards[j];
 if(v==='clue'){if(!val)return miss(why,j);S.zone=t;slide(d[4]);return next(`Good clue: ${t.toLowerCase()}. That shows the impact on ${d[1]}.`)}
 slide(val);if(val<3){const back=v==='act'?2:d[4];setTimeout(()=>{if(!S.ok)slide(back)},fast()?10:900);return miss(`${FN[val]}: ${why}`,j)}
 S.zone=t;next(v==='rew'?`Replay: ${t} Now ${d[1]} feels ${FN[val]}.`:v==='chk'?`Checking in helps: ${d[1]} feels ${FN[val]}.`:`Thinking first works: ${d[1]} feels ${FN[val]}.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||busy())return;if(v==='meant')FACES.forEach((f,i)=>B(f+' '+FN[i],()=>setMeter(i),`${S.d[1]} feels ${FN[i]}`));
 else S.cards.forEach((cd,j)=>B(cd[0],()=>pick(j),`Choose: ${cd[0]}`))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=part();if(busy())return false;
 if(v==='meant'){const m=meter();if(Math.abs(p.y-m.y)<sz(34)&&p.x>m.x-20&&p.x<m.x+m.w+20){S.grab={m:1};move(p);return true}return false}
 const j=cardsR().findIndex(r=>inside(p,r));if(j>=0){S.grab={j,x:null,x0:p.x,y0:p.y};return true}return false}
function move(p){const d=S.grab;if(!d)return;if(d.m){const m=meter();S.mk=Math.max(0,Math.min(4,(p.x-m.x)/m.w*4));A.redraw();return}
 if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(!d)return;if(d.m)return setMeter(Math.round(S.mk));if(d.x==null)return pick(d.j);
 const z=zoneR();if(inside(p,{x:z.x,y:z.y-30,w:z.w,h:z.h+60}))pick(d.j);else A.redraw()}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f,gap){const k=++run,tick=()=>{if(k!==run||S.n>=goal())return;if(!S.wait&&!S.ok)f();setTimeout(tick,fast()?40:gap)};setTimeout(tick,fast()?30:gap)}
const good=()=>S.cards.findIndex(x=>part()==='clue'?x[1]:x[1]>=3);
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const steps=[
{h:'Meant vs landed',p:'Intent is what you meant. Impact is how it felt to them. Read the clue, then drag the dot.',predict:{q:'You meant it as a joke. Will it feel like a joke to them?',opts:['Yes, if I meant it kindly','Not always: it depends how it lands'],ans:1},task:'Read 3 impacts',
 show:()=>{steps[0].go();auto(()=>setMeter(S.d[5][0]),450)},
 go:()=>{restart();tell(S.d[2]+' How did it land for Leo?');buttons();S.hook=finish(0,'What you meant and how it landed can be different.')}},
{h:'Read the clues',p:'Impact shows in faces, bodies and actions. Drag the real clue to the box, or tap it.',task:'Find 3 clues',
 show:()=>{steps[1].go();auto(()=>pick(good()),450)},
 go:()=>{restart();tell(S.d[2]+' Which clue shows how Mia felt?');buttons();S.hook=finish(1,'Look at what they do, not at what you meant.')}},
{h:'Think before you act',p:'Test each choice: drop it in the box and watch the meter. Pick one that lands well.',predict:{q:'You take the last cookie without asking. How might Jo feel?',opts:['Fine: it is only a cookie','It may feel unfair to Jo'],ans:1},task:'Choose 3 actions',
 show:()=>{steps[2].go();auto(()=>pick(good()),450)},
 go:()=>{restart();tell(S.d[2]+' What will you do?');buttons();S.hook=finish(2,'Predict how it will land, then choose.')}},
{h:'Rewind',p:'Something went wrong. Rewind and replay a better move.',predict:{q:'Kai went quiet after you cut in. Did you mean to upset him?',opts:['No, so there was no harm','No, but it still upset him'],ans:1},task:'Replay 3 stories',
 show:()=>{steps[3].go();auto(()=>pick(good()),450)},
 go:()=>{restart();tell(S.d[2]+' What could you do differently?');buttons();S.hook=finish(3,'After a problem, ask: what could I do differently next time?')}},
{h:'Check in',p:'Not sure how it landed? Ask and listen. Do not tell them how to feel.',task:'Check in 3 times',
 show:()=>{steps[4].go();auto(()=>pick(good()),450)},
 go:()=>{restart();tell(S.d[2]+' What do you say?');buttons();S.hook=finish(4,'Ask how it landed, then listen.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['You meant it as a joke, but your friend looks hurt. What matters now?',[['How it landed for them','ok'],['That you meant it as a joke','intent'],['Who laughed the most','joke']]],
 ['Which is a clue about impact?',[['Their face drops','ok'],['What you were thinking','intent'],['The time of day','clue']]],
 ['Before you take the last slice, what helps most?',[['Think how others will feel, then ask','ok'],['Take it fast','grab'],['Take it, then say it was yours','grab']]],
 ['A friend says your words hurt. Best reply?',[['"I didn\'t know. I\'m sorry it hurt."','ok'],['"You\'re too sensitive."','blame'],['"I was only joking."','intent']]],
 ['You are not sure how your words landed. What should you do?',[['Ask and listen','ok'],['Say, "You\'re fine"','tell'],['Hope for the best','clue']]],
 ['After an argument, what helps you do better next time?',[['Think what you could do differently','ok'],['Decide it was all their fault','blame'],['Forget about it','clue']]]];
function why(t){let m='Think about how it lands for the other person.';
 if(t==='intent')m='What you meant matters, but they feel the impact. Check how it landed.';if(t==='joke')m='A joke is only funny if the person it is about laughs too.';
 if(t==='clue')m='Look for real clues: faces, bodies, words and actions.';if(t==='grab')m='Stop and predict: how will the others feel if you do that?';
 if(t==='blame')m='Blaming them skips your part. Think what you could change.';if(t==='tell')m='Do not tell people how they feel. Ask, then listen.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You thought about the impact.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.6,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
