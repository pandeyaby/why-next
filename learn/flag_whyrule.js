/* Flagship – why rules and agreements exist (ages 5–7). Sort rules by their reason (safe, fair, together), take a rule
   away and watch the slide, the hall and the game fall apart, keep a rule when the grown-up looks away, make a group
   agreement that every face is happy with, and match rules to places. Every drag has a big button twin. */
(()=>{
const WHY=[['🦺','Safe'],['⚖️','Fair'],['🤝','Together']];
const REASON=[['Walk inside, do not run',0,'Running inside can make you trip and bump your head.'],['Everyone gets a go on the swing',1,'Fair means everyone gets a turn, not just some.'],
 ['Tidy up together after play',2,'When we all help, the job is quick and the room works for everyone.']];
const PLACE=[['📚','Library'],['🏊','Pool'],['⚽','Football']];
const WHERE=[['Use a quiet voice',0,'People in the library are reading. Quiet helps them think.'],['Walk, do not run',1,'Pool floors are wet and slippery.'],['Only the goalie uses hands',2,'It is a rule of the game, so both teams play the same way.']];
/* a place with no rule: what goes wrong, and which rule fixes it */
const MESS=[{e:'🛝',name:'The slide',mess:'Pushing and bumps! Some never get a go.',fix:'One at a time. Everyone gets a go.',opts:[['Take turns, one at a time',1],['Go faster',0,'Going faster makes more bumps, not fewer.'],['The biggest goes first',0,'Then the small ones never get a go. That is not fair.']]},
 {e:'🚪',name:'The hall',mess:'Running! Crash! Someone is hurt.',fix:'Walking. Nobody bumps.',opts:[['Walk in the hall',1],['Run, but say sorry',0,'Sorry does not stop the bump. Walking does.'],['Run if you are late',0,'Being late does not make the floor safe.']]},
 {e:'🏃',name:'The game of tag',mess:'Everyone has their own rules. Nobody knows who is out!',fix:'Same rules for all. Now the game works.',opts:[['Same rules for everyone',1],['Make up your own rules',0,'If everyone has their own rules, the game cannot work.'],['The winner makes the rules',0,'Then it is only fair for the winner.']]}];
/* the grown-up looks away: does the rule still count? */
const LOOK=[{who:'🧑‍🏫',say:'The teacher goes out. Ben says: run to the door!',why:'The floor is still slippery.',opts:[['Walk to the door',1],['Run: nobody will see',0,'The rule is not about being seen. You can still slip and fall.'],['Run, then walk when she comes back',0,'The danger is there when she is gone too.']]},
 {who:'👩',say:'Rule: one biscuit each. Mum is upstairs. There are lots left.',why:'Everyone needs one.',opts:[['Take one, so all get one',1],['Take three: Mum will not know',0,'Then someone else gets none. The rule is there to be fair.'],['Hide some for later',0,'Hiding biscuits is still taking more than your share.']]},
 {who:'👦',say:'You play a board game. Your friend looks away.',why:'The game is only fun if it is fair.',opts:[['Keep playing fair',1],['Move your piece extra',0,'Cheating when they look away still breaks the game.'],['Peek at their cards',0,'Peeking is not fair, even if nobody sees.']]}];
/* agreements: each option sets how every child in the group feels */
const DEAL=[{say:'Four friends. Which game at break?',kids:['🧒','👧','👦','🧑'],opts:[['Vote, or take turns to choose',[1,1,1,1]],['The ball owner always picks',[1,0,0,0]],['Nobody plays',[0,0,0,0]]]},
 {say:'Carpet time. Everyone wants to talk.',kids:['👧','🧒','👦'],opts:[['One talks, the others listen',[1,1,1]],['Everyone talks at once',[0,0,0]],['Only the loudest talks',[1,0,0]]]},
 {say:'Three friends build a den.',kids:['👦','👧','🧒'],opts:[['We plan it together',[1,1,1]],['The bossiest one decides',[1,0,0]],['Each builds alone',[0,1,0]]]}];
VIS.reg('flagwhyrule',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({k:0,n:0,wait:0,ok:0,bad:-1,drag:null,hook:()=>{},t:0,moods:null,quick:0}),S=fresh();
const kind=()=>['why','mess','look','deal','place','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced()||S.quick;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(q=>{const u=s?s+' '+q:q;if(g.measureText(u).width>w&&s){L.push(s);s=q}else s=u});L.push(s);const h=z(n)*1.25;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
function emo(g,e,x,y,s){g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function box(g,r,fill,edge,lw){g.save();A.paint.shadow(7,2,.15);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
const sorting=()=>kind()==='why'||kind()==='place';
const bins=()=>{const n=3,w=(A.W-24-16)/3,h=z(96),y=A.H-h-12;return Array.from({length:n},(_,j)=>({x:12+j*(w+8),y,w,h}))};
const card=()=>{const w=Math.min(A.W-40,z(320)),h=z(74);return{x:(A.W-w)/2,y:A.H*(A.narrow?.3:.26),w,h}};
const scene=()=>({x:12,y:10,w:A.W-24,h:A.H*(A.narrow?.5:.5)});
const rows=()=>{const h=z(46),gap=8,y0=A.H-3*(h+gap)-6;return[0,1,2].map(j=>({x:12,y:y0+j*(h+gap),w:A.W-24,h}))};
const set=()=>({mess:MESS,look:LOOK,deal:DEAL}[kind()]||[]);
const opts=()=>(set()[S.k]||{}).opts||[];
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=kind();
 if(v==='quiz'){words(g,'Rules keep us safe, keep it fair and help us work together.',W/2,H*.45,W-40,17);return}
 if(sorting()){const B=v==='why'?WHY:PLACE,L=v==='why'?REASON:WHERE;
  bins().forEach((r,j)=>{box(g,r,A.mix(C.pn,[C.cy,C.vi,C.gr][j],.12),[C.cy,C.vi,C.gr][j],2);emo(g,B[j][0],r.x+r.w/2,r.y+r.h*.36,z(30));words(g,B[j][1],r.x+r.w/2,r.y+r.h*.78,r.w-6,15,C.tx,800)});
  words(g,v==='why'?'Why do we have this rule?':'Where does this rule belong?',W/2,H*(A.narrow?.12:.1),W-30,18,C.tx,800);
  if(S.k<L.length&&!S.ok){const r0=card(),d=S.drag,r=d&&d.x!=null?{...r0,x:d.x-r0.w/2,y:d.y-r0.h/2}:r0;box(g,r,S.bad>=0?A.mix(C.pn,C.rd,.18):C.pn,S.bad>=0?C.rd:C.am,3);words(g,L[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-16,19,C.tx,800);
   if(!d)words(g,'Drag me to a box',W/2,r0.y+r0.h+z(22),W-30,13,C.mu,600)}
  else if(S.k<L.length){words(g,L[S.k][2],W/2,H*.36,W-40,17,C.tx,700)}}
 else{const sc=scene(),it=set()[S.k],drop=S.drag&&S.drag.x!=null;box(g,sc,S.ok?A.mix(C.pn,C.gr,.12):C.pn,drop?C.vi:S.ok?C.gr:C.ln,drop?4:2);
  if(v==='mess')drawMess(g,sc,it);if(v==='look')drawLook(g,sc,it);if(v==='deal')drawDeal(g,sc,it);
  if(!S.ok)rows().forEach((r,j)=>{if(S.drag&&S.drag.j===j&&drop)return;opt(g,r,j)});
  if(drop){const r=rows()[0];opt(g,{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2},S.drag.j)}}
 A.fx.draw(g)}
function opt(g,r,j){const C=A.col;box(g,r,S.bad===j?A.mix(C.pn,C.rd,.18):C.pn,S.bad===j?C.rd:C.vi,S.bad===j?4:2.5);words(g,opts()[j][0],r.x+r.w/2,r.y+r.h/2,r.w-20,16,C.tx,800)}
/* no rule: children wander and bump; with the rule they line up */
function drawMess(g,sc,it){const C=A.col,n=4,t=S.t;emo(g,it.e,sc.x+sc.w*.82,sc.y+sc.h*.42,z(54));words(g,it.name,sc.x+sc.w/2,sc.y+z(18),sc.w-20,16,C.tx,800);
 for(let i=0;i<n;i++){let x,y;if(S.ok){x=sc.x+sc.w*(.16+i*.14);y=sc.y+sc.h*.5}else{x=sc.x+sc.w*(.38+.22*Math.sin(t*1.7+i*2.1));y=sc.y+sc.h*(.5+.16*Math.cos(t*2.3+i*1.3))}emo(g,['🧒','👧','👦','🧑'][i],x,y,z(34))}
 if(!S.ok&&Math.sin(t*5)>0)emo(g,'💥',sc.x+sc.w*.4,sc.y+sc.h*.42,z(30));
 words(g,S.ok?it.fix:it.mess,sc.x+sc.w/2,sc.y+sc.h-z(26),sc.w-20,15,S.ok?C.tx:C.tx,700)}
function drawLook(g,sc,it){const C=A.col;emo(g,it.who,sc.x+sc.w*.18,sc.y+sc.h*.32,z(44));emo(g,'🙈',sc.x+sc.w*.18,sc.y+sc.h*.58,z(28));
 words(g,'Not looking',sc.x+sc.w*.18,sc.y+sc.h*.78,sc.w*.32,13,C.tx,700);words(g,it.say,sc.x+sc.w*.64,sc.y+sc.h*.34,sc.w*.62,16,C.tx,800);
 const r={x:sc.x+sc.w*.36,y:sc.y+sc.h*.62,w:sc.w*.58,h:z(40)};box(g,r,A.mix(C.pn,C.am,.14),C.am,2);words(g,'Reason: '+it.why,r.x+r.w/2,r.y+r.h/2,r.w-10,13,C.tx,700);
 if(S.ok)emo(g,'✅',sc.x+sc.w-z(24),sc.y+z(24),z(26))}
function drawDeal(g,sc,it){const C=A.col,n=it.kids.length,m=S.moods;words(g,it.say,sc.x+sc.w/2,sc.y+z(24),sc.w-20,17,C.tx,800);
 const r={x:sc.x+sc.w*.14,y:sc.y+sc.h*.62,w:sc.w*.72,h:z(40)};box(g,r,A.mix(C.pn,C.am,.12),C.am,2);words(g,S.ok?'We agree: '+it.opts[0][0]:'We agree: ……',r.x+r.w/2,r.y+r.h/2,r.w-12,14,C.tx,700);
 it.kids.forEach((k,i)=>{const x=sc.x+sc.w*(i+.5)/n,y=sc.y+sc.h*.4;emo(g,k,x,y,z(36));if(m)emo(g,m[i]?'🙂':'😞',x+z(18),y-z(18),z(20))})}
const no=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1000);A.redraw()};
function tick(t){S.n++;A.sound.pop();pads();if(S.n<3){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;Object.assign(S,{wait:0,k:S.k+1,ok:0,moods:null});tell(t+' Next one.');pads();A.redraw()},fast()?5:1300);tell(t)}else{tell(t);pads()}A.redraw();S.hook()}
/* sort steps: drop the rule card in a box */
function sortTo(j){if(!sorting()||S.n>=3||S.wait||S.ok)return;const L=kind()==='why'?REASON:WHERE,[t,want,why]=L[S.k],B=kind()==='why'?WHY:PLACE;
 if(j!==want)return no(`Not ${B[j][1]}. ${why}`,0);S.ok=1;tick(`${t}: ${B[want][1]}. ${why}`)}
/* scene steps: drop an option on the scene */
function pick(j){const v=kind();if(sorting()||v==='quiz'||S.n>=3||S.wait||S.ok)return;const it=set()[S.k],o=it.opts[j];
 if(v==='deal'){S.moods=o[1];const sad=o[1].filter(x=>!x).length;if(sad){A.redraw();return no(`${sad} of ${o[1].length} friends are sad. An agreement has to work for everyone.`,j)}S.ok=1;return tick(`Everyone agrees: ${o[0]}.`)}
 if(!o[1])return no(o[2],j);S.ok=1;tick(v==='mess'?`${o[0]}. ${it.fix}`:`${o[0]}. ${it.why} The rule counts when nobody is looking.`)}
function pads(){if(!pad)return;pad.innerHTML='';const v=kind(),B=(t,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'},pad,t);b.onclick=f};if(v==='quiz'||S.n>=3||S.ok)return;
 if(sorting())(v==='why'?WHY:PLACE).forEach((b,j)=>B(b[0]+' '+b[1],()=>sortTo(j)));else opts().forEach((o,j)=>B(o[0],()=>pick(j)))}
const inn=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){if(S.wait||S.ok||S.n>=3||kind()==='quiz')return false;if(sorting()){if(inn(p,card())){S.drag={x:null,x0:p.x,y0:p.y};return true}return false}
 const j=rows().findIndex(r=>inn(p,r));if(j>=0){S.drag={j,x:null,x0:p.x,y0:p.y};return true}return false}
function move(p){const d=S.drag;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(sorting()){if(d.x==null){A.redraw();return}const j=bins().findIndex(r=>inn(p,{x:r.x,y:r.y-30,w:r.w,h:r.h+30}));if(j>=0)sortTo(j);else A.redraw();return}
 if(d.x==null||inn(p,scene()))pick(d.j);else A.redraw()}
const fin=(n,msg)=>()=>{if(A.step===n&&S.n>=3&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(f){const k=++run,go=()=>{if(k!==run||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
const right=()=>sorting()?(kind()==='why'?REASON:WHERE)[S.k][1]:opts().findIndex(o=>Array.isArray(o[1])?o[1].every(x=>x):o[1]);
const auto=i=>()=>{steps[i].go();S.quick=1;play(()=>sorting()?sortTo(right()):pick(right()))};
const steps=[
{h:'Why is there a rule?',p:'Every rule has a reason. Some keep us safe. Some keep it fair. Some help us work together. Drag the rule to its reason.',task:'Find the reason for 3 rules',show:auto(0),
 go:()=>{reset();tell('Walk inside, do not run. Why?');pads();S.hook=fin(0,'Safe, fair, together: every rule has a reason.')}},
{h:'What if there is no rule?',p:'Look! Nobody has a rule here. Drag the rule that fixes it.',predict:{q:'At the slide, nobody takes turns. What happens?',opts:['More fun for everyone','Pushing, bumps, and some get no go'],ans:1},task:'Fix 3 places',show:auto(1),
 go:()=>{reset();tell('The slide has no rule. Which rule fixes it?');pads();S.hook=fin(1,'With no rules: bumps, pushing and unfair games. Rules fix that.')}},
{h:'When nobody is looking',p:'The grown-up looks away. Does the rule still count? Pick what to do.',predict:{q:'The teacher goes out. Do the class rules still count?',opts:['No, nobody is watching','Yes, the reason is still there'],ans:1},task:'Choose well 3 times',show:auto(2),
 go:()=>{reset();tell('The teacher goes out. What do you do?');pads();S.hook=fin(2,'We keep rules because of the reason, not because someone is watching.')}},
{h:'Make an agreement',p:'An agreement is a rule a group makes together. Pick one that makes every face happy.',task:'Make 3 agreements',show:auto(3),
 go:()=>{reset();tell('Which game at break? Pick an agreement.');pads();S.hook=fin(3,'A good agreement works for everyone in the group.')}},
{h:'Rules for each place',p:'Different places need different rules. Drag each rule to its place.',predict:{q:'Shouting is fine at football. Is it fine in the library?',opts:['Yes, the same rules are everywhere','No, people in the library are reading'],ans:1},task:'Match 3 rules to places',show:auto(4),
 go:()=>{reset();tell('Use a quiet voice. Where does it belong?');pads();S.hook=fin(4,'Each place has rules that fit what people do there.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Why do we walk inside?',[['So nobody trips and gets hurt','ok'],['Because grown-ups are bossy','nowhy'],['So it is boring','fun']]],
 ['Nobody is watching. Do you still keep the rule?',[['Yes, the reason is still there','ok'],['No, nobody will know','watch'],['Only if I might get caught','watch']]],
 ['What would happen in a game with no rules?',[['Nobody would know how to play','ok'],['It would be more fun','fun'],['The same game','nowhy']]],
 ['Which is a fair agreement?',[['Take turns to choose the game','ok'],['The oldest always chooses','unfair'],['Whoever shouts first chooses','unfair']]],
 ['Is it OK to run at the pool?',[['No, the floor is wet','ok'],['Yes, running is fine at the park, so it is fine here','same'],['Yes, if nobody sees','watch']]],
 ['Who makes a class agreement?',[['The class, together','ok'],['Only the loudest child','unfair'],['Nobody: it just happens','nowhy']]]];
function why(t){let m='Think about the reason for the rule.';
 if(t==='nowhy')m='Rules have reasons: to keep us safe, keep it fair, or help us work together.';if(t==='watch')m='The reason does not go away when nobody is looking. Keep the rule anyway.';
 if(t==='fun')m='Rules make games and play work. Without them, people get hurt or left out.';if(t==='unfair')m='A fair rule works for everyone, not just one person.';
 if(t==='same')m='Different places need different rules. The pool floor is wet, so walk.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b0=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},b0,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You know why the rule is there.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});
  A.every(dt=>{if(kind()!=='mess'||S.ok||A.reduced())return false;S.t+=dt;return true});pads()}});
A.start()})})();
