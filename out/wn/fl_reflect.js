/* Flagship – vocabulary of self-reflection (ages 5–10): drag each word (notice, reflect, trigger, pattern,
   self-awareness) onto what it means, with "reflect = look in a mirror" as the tempting slip; scan Leo's week to find the
   trigger that comes before every grumpy day (a pattern, not a one-off); sort what Leo noticed from the assumptions he
   made; drag a lens onto three people to see one spill from each perspective; drop action stones in a pond to see their
   impact; then a challenge on choosing the precise word. */
(()=>{const mn=Math.min,hy=Math.hypot;
const WORDS=[['notice','to spot something by paying attention'],['reflect','to think back on what happened and why'],['trigger','the thing that sets off a feeling'],['pattern','something that happens again and again'],['self-awareness','knowing your own feelings and habits']];
const WRONG={reflect:'Here “reflect” is not a mirror. It means thinking back on what happened and why.',notice:'“Notice” is the first step: spotting something. It is not the thinking-back part.',trigger:'A trigger comes before the feeling and sets it off. It is not the feeling itself.',pattern:'A pattern happens again and again. One time on its own is not a pattern.','self-awareness':'Self-awareness is about knowing yourself: your own feelings and habits.'};
const WEEK=[['Mon',['⏰ late up','⚽ football'],0],['Tue',['🥣 slow breakfast','🎨 art'],1],['Wed',['⏰ late up','📚 spelling test'],0],['Thu',['🎨 art','⚽ football'],1],['Fri',['⏰ late up','🎵 music'],0]];
const CLUES=['⏰ late up','⚽ football','🎨 art','📚 spelling test','🥣 slow breakfast','🎵 music'];
const CARDS=[['Ava did not wave at me.',0],['Ava is cross with me.',1],['My cheeks felt hot.',0],['Everyone thinks I am silly.',1],['I got 6 out of 10.',0],['I will never get better.',1]];
const PEOPLE=[['🧒','Sam','I tipped the paint by mistake. I feel bad.'],['👧','Tia','My picture is ruined! I worked so hard.'],['👩‍🏫','Mr Lee','Accidents happen. Let’s fix it together.']];
const STONES=[['😠 snap “Go away!”',-1,'Tia looks sad and moves away. Snapping hurt her.'],['🤝 say sorry',1,'Tia’s shoulders drop. Sorry helps her feel heard.'],['🧽 help tidy up',1,'Tia smiles. Helping fixed some of the harm.']];
VIS.reg('flagreflect',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,want:()=>{},fit:{},held:null,miss:-1,clue:-1,cardAt:0,sorted:[],lens:null,seen:{},thrown:[],last:-1};
const phase=()=>['words','week','facts','lens','pond','quiz'][A.step];
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function txt(g,t,x,y,n,k,w,al){g.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y,A.W-10)}
function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
// meanings column on the right, word chips on the left (phone: meanings below)
const mean=i=>A.narrow?{x:8,y:A.H*.36+i*A.H*.125,w:A.W-16,h:A.H*.11}:{x:A.W*.38,y:A.H*.04+i*A.H*.19,w:A.W*.6,h:A.H*.16};
const chip=i=>{if(A.narrow){const w=(A.W-24)/3;return{x:8+(i%3)*(w+4),y:A.H*.04+Math.floor(i/3)*A.H*.13,w,h:A.H*.1}}return{x:8,y:A.H*.04+i*A.H*.19,w:A.W*.32,h:A.H*.14}};
const day=i=>{const w=(A.W-16)/5;return{x:8+i*w,y:A.H*.1,w:w-4,h:A.H*.44}};
const clue=i=>{const w=(A.W-16)/3;return{x:8+(i%3)*w,y:A.H*.62+Math.floor(i/3)*A.H*.17,w:w-6,h:A.H*.14}};
const pile=()=>({x:A.W*.15,y:A.H*.08,w:A.W*.7,h:A.H*.2}),bin=i=>({x:8+i*(A.W/2),y:A.H*.36,w:A.W/2-16,h:A.H*.6});
const who=i=>({x:A.W*(.18+i*.32),y:A.H*.42}),lensHome=()=>({x:A.W*.5,y:A.H*.86});
const pond=()=>({x:A.W*.5,y:A.H*.5,r:mn(A.W*.3,A.H*.26)}),stone=i=>({x:A.W*(.18+i*.32),y:A.H*.9});
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'notice · reflect · trigger · pattern',W/2,H*.38,15,C.tx,800);txt(g,'assumption · impact · perspective',W/2,H*.55,15,C.tx,800);return}
 if(v==='words'){WORDS.forEach(([w,m],i)=>{const r=mean(i),done=Object.values(S.fit).includes(i);card(g,r,A.alpha(done?C.gr:C.cy,done?.22:.1),S.miss===i?C.rd:C.tx,S.miss===i?3:1.5);
   txt(g,(done?WORDS[i][0]+': ':'')+m,r.x+r.w/2,r.y+r.h/2,A.narrow?10:11,C.tx,600)});
  WORDS.forEach(([w],i)=>{if(S.fit[i]!=null)return;let r=chip(i);if(S.held&&S.held.i===i)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};card(g,r,A.alpha(C.or,.3),C.tx);txt(g,w,r.x+r.w/2,r.y+r.h/2,A.narrow?11:13,C.tx,800)})}
 if(v==='week'){txt(g,'Leo’s week. 🙁 = grumpy morning',W/2,H*.05,13,C.tx,800);WEEK.forEach(([d,ev,ok],i)=>{const r=day(i),hit=S.clue>=0&&ev.includes(CLUES[S.clue]);card(g,r,A.alpha(ok?C.gr:C.rd,.14),hit?C.vi:C.tx,hit?4:1.5);
   txt(g,d,r.x+r.w/2,r.y+sz(14),12,C.tx,800);txt(g,ok?'🙂':'🙁',r.x+r.w/2,r.y+r.h*.32,22);ev.forEach((e,k)=>{txt(g,e.split(' ')[0],r.x+r.w/2,r.y+r.h*(.56+k*.22),18);txt(g,e.split(' ').slice(1).join(' '),r.x+r.w/2,r.y+r.h*(.66+k*.22),8,C.tx,600)})});
  CLUES.forEach((e,i)=>{const r=clue(i);card(g,r,A.alpha(S.clue===i?C.vi:C.cy,S.clue===i?.3:.12),C.tx);txt(g,e,r.x+r.w/2,r.y+r.h/2,A.narrow?10:12,C.tx,700)})}
 if(v==='facts'){const p=pile();if(S.cardAt<CARDS.length){card(g,p,A.alpha(C.or,.25),C.tx);txt(g,'“'+CARDS[S.cardAt][0]+'”',p.x+p.w/2,p.y+p.h/2,13,C.tx,800)}else txt(g,'All sorted!',W/2,p.y+p.h/2,16,C.gr,800);
  ['👀 I noticed (fact)','💭 I assumed (guess)'].forEach((t,i)=>{const r=bin(i);card(g,r,A.alpha([C.gr,C.vi][i],.12),S.miss===i?C.rd:C.tx,S.miss===i?3:1.5);txt(g,t,r.x+r.w/2,r.y+sz(14),12,C.tx,800);
   S.sorted.filter(s=>s[1]===i).forEach((s,k)=>txt(g,CARDS[s[0]][0],r.x+r.w/2,r.y+sz(38)+k*sz(20),A.narrow?8:10,C.tx,600))});
  if(S.held){const r={x:S.held.x-p.w/2,y:S.held.y-p.h/4,w:p.w,h:p.h/2};card(g,r,A.alpha(C.or,.5),C.tx)}}
 if(v==='lens'){txt(g,'Paint spilled on Tia’s picture',W/2,H*.06,14,C.tx,800);g.fillStyle=A.alpha(C.cy,.5);g.beginPath();g.ellipse(W/2,H*.2,W*.1,H*.04,0,0,7);g.fill();
  PEOPLE.forEach(([e,n,th],i)=>{const p=who(i);txt(g,e,p.x,p.y,34);txt(g,n,p.x,p.y+sz(28),12,C.tx,800);if(S.seen[i]){const r={x:p.x-W*.155,y:p.y+sz(42),w:W*.31,h:H*.2};card(g,r,A.alpha(C.vi,.14),C.vi);
   const ws=th.split(' '),half=Math.ceil(ws.length/2);[ws.slice(0,half).join(' '),ws.slice(half).join(' ')].forEach((l,k)=>txt(g,l,p.x,r.y+r.h*(.3+k*.4),A.narrow?8:10,C.tx,600))}});
  const L=S.lens||lensHome();g.strokeStyle=C.or;g.lineWidth=5;g.beginPath();g.arc(L.x,L.y,sz(20),0,7);g.stroke();g.beginPath();g.moveTo(L.x+sz(14),L.y+sz(14));g.lineTo(L.x+sz(28),L.y+sz(28));g.stroke();txt(g,'👁',L.x,L.y,16)}
 if(v==='pond'){const P=pond();g.fillStyle=A.alpha(C.cy,.28);g.beginPath();g.arc(P.x,P.y,P.r,0,7);g.fill();if(S.last>=0){const k=STONES[S.last][1]>0?C.gr:C.rd;[.35,.6,.85].forEach(f=>{g.strokeStyle=A.alpha(k,.8);g.lineWidth=3;g.beginPath();g.arc(P.x,P.y,P.r*f,0,7);g.stroke()})}
  txt(g,S.last<0?'😐':STONES[S.last][1]>0?'🙂':'😢',P.x,P.y,40);txt(g,'Tia',P.x,P.y+sz(32),12,C.tx,800);txt(g,'Drop a choice in the pond. Watch the impact.',W/2,H*.06,13,C.tx,800);
  STONES.forEach(([t],i)=>{if(S.thrown.includes(i)&&!(S.held&&S.held.i===i))return;let p=stone(i);if(S.held&&S.held.i===i)p=S.held;card(g,{x:p.x-W*.15,y:p.y-sz(18),w:W*.3,h:sz(36)},A.alpha(C.or,.3),C.tx);txt(g,t,p.x,p.y,A.narrow?9:11,C.tx,700)})}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();say(t);A.redraw()},yes=t=>{A.sound.pop();say(t);buttons();A.redraw();S.want()};
function fitWord(i,j){S.held=null;if(S.fit[i]!=null||j<0)return A.redraw();if(i!==j){S.miss=j;return no(WRONG[WORDS[i][0]])}S.miss=-1;S.fit[i]=j;yes(`${WORDS[i][0]}: ${WORDS[i][1]}.`)}
function pickClue(i){S.clue=i;const e=CLUES[i],on=WEEK.filter(w=>w[1].includes(e)),grumpy=WEEK.filter(w=>!w[2]);
 if(on.length===1)return no(`${e} happened only on ${on[0][0]}. Once is not a pattern.`);
 if(on.some(w=>w[2]))return no(`${e} happened on a happy day too (${on.find(w=>w[2])[0]}), so it is not what sets off the grumpy mornings.`);
 if(grumpy.every(w=>w[1].includes(e))){S.found=1;return yes('Late up came before every grumpy morning: Mon, Wed and Fri. That is a pattern, and late up is the trigger.')}no('Look again.')}
function sortCard(b){S.held=null;if(S.cardAt>=CARDS.length||b<0)return A.redraw();const[t,k]=CARDS[S.cardAt];if(b!==k){S.miss=b;return no(k?`“${t}” is a guess about what is inside someone’s head or the future. That is an assumption.`:`“${t}” is something Leo could see or feel for himself. That is a fact he noticed.`)}
 S.miss=-1;S.sorted.push([S.cardAt,b]);S.cardAt++;yes(k?`Assumption: “${t}” Leo could check it by asking.`:`Noticed: “${t}”`)}
function look(i){S.lens=null;if(i<0)return A.redraw();S.seen[i]=1;yes(`From ${PEOPLE[i][1]}’s perspective: ${PEOPLE[i][2]}`)}
function throwStone(i){S.held=null;if(i<0||S.thrown.includes(i))return A.redraw();S.thrown.push(i);S.last=i;A.sound.whoosh();yes(STONES[i][2])}
function buttons(){if(!ctl)return;ctl.innerHTML='';const v=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(v==='words'){const i=WORDS.findIndex((_,i)=>S.fit[i]==null);if(i>=0){c.el('p',{class:'fl-tk'},ctl,`What does “${WORDS[i][0]}” mean?`);WORDS.forEach(([,m],j)=>{if(!Object.values(S.fit).includes(j))B(m,()=>fitWord(i,j))})}}
 if(v==='week'&&!S.found)CLUES.forEach((e,i)=>B(e,()=>pickClue(i),'Check '+e.split(' ').slice(1).join(' ')));
 if(v==='facts'&&S.cardAt<CARDS.length){B('👀 I noticed',()=>sortCard(0),'Fact I noticed');B('💭 I assumed',()=>sortCard(1),'Assumption I made')}
 if(v==='lens')PEOPLE.forEach(([,n],i)=>B('👁 See it as '+n,()=>look(i)));
 if(v==='pond')STONES.forEach(([t],i)=>{if(!S.thrown.includes(i))B(t,()=>throwStone(i),'Choose: '+t.slice(2))});A.redraw()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const v=phase();
 if(v==='words'){const i=WORDS.findIndex((_,i)=>S.fit[i]==null&&inside(p,chip(i)));if(i>=0){S.held={i,x:p.x,y:p.y};return true}return false}
 if(v==='week'){const i=CLUES.findIndex((_,i)=>inside(p,clue(i)));if(i>=0&&!S.found)pickClue(i);return false}
 if(v==='facts'&&S.cardAt<CARDS.length&&inside(p,pile())){S.held={x:p.x,y:p.y};return true}
 if(v==='lens'){const L=S.lens||lensHome();if(hy(p.x-L.x,p.y-L.y)<sz(40)){S.lens={x:p.x,y:p.y};return true}return false}
 if(v==='pond'){const i=STONES.findIndex((_,i)=>!S.thrown.includes(i)&&hy(p.x-stone(i).x,p.y-stone(i).y)<A.W*.15);if(i>=0){S.held={i,x:p.x,y:p.y};return true}}return false}
function move(p){if(S.held){S.held.x=p.x;S.held.y=p.y}if(S.lens)S.lens={x:p.x,y:p.y};A.redraw()}
function up(p){const v=phase();if(v==='words'&&S.held)return fitWord(S.held.i,WORDS.findIndex((_,j)=>inside(p,mean(j))));
 if(v==='facts'&&S.held)return sortCard([0,1].find(i=>inside(p,bin(i)))??-1);
 if(v==='lens'&&S.lens)return look(PEOPLE.findIndex((_,i)=>hy(p.x-who(i).x,p.y-who(i).y)<sz(50)));
 if(v==='pond'&&S.held){const P=pond();return throwStone(hy(p.x-P.x,p.y-P.y)<P.r?S.held.i:-1)}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fs,ms)=>{const k=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const clean=()=>{S.tok++;Object.assign(S,{want:()=>{},fit:{},held:null,miss:-1,clue:-1,found:0,cardAt:0,sorted:[],lens:null,seen:{},thrown:[],last:-1})};
const steps=[
{h:'Words for inside you',p:'These words help you talk about your own mind. Drag each word onto what it means.',
 predict:{q:'“Reflect on your day.” What does reflect mean here?',opts:['Look in a mirror','Think back on what happened and why'],ans:1},task:'Match all five words',
 show:()=>{steps[0].go();seq(WORDS.map((_,i)=>()=>fitWord(i,i)),500)},go:()=>{clean();say('Match notice, reflect, trigger, pattern and self-awareness.');buttons();S.want=fin(0,()=>Object.keys(S.fit).length>=5,'Notice, then reflect: that is how self-awareness grows.')}},
{h:'Find the pattern',p:'Leo is grumpy some mornings. Tap the thing that came before every grumpy morning and never before a happy one.',
 predict:{q:'Leo was grumpy once after a spelling test. Is that a pattern?',opts:['Yes','No'],ans:1},task:'Find Leo’s trigger',
 show:()=>{steps[1].go();seq([()=>pickClue(3),()=>pickClue(1),()=>pickClue(0)],650)},go:()=>{clean();say('Which thing comes before every grumpy morning?');buttons();S.want=fin(1,()=>S.found,'A pattern repeats. Late up, every time, is Leo’s trigger.')}},
{h:'Noticed or assumed?',p:'A fact is something you saw or felt. An assumption is a guess you made without checking. Drag each thought into a box.',task:'Sort all six thoughts',
 show:()=>{steps[2].go();seq(CARDS.map(([,k])=>()=>sortCard(k)),450)},go:()=>{clean();say('Ava did not wave at me. Noticed, or assumed?');buttons();S.want=fin(2,()=>S.cardAt>=6,'Check an assumption by asking, before you believe it.')}},
{h:'Perspective',p:'Your perspective is how things look from where you are. Drag the lens onto each person to see the spill their way.',task:'See all three perspectives',
 show:()=>{steps[3].go();seq([0,1,2].map(i=>()=>look(i)),550)},go:()=>{clean();say('Drag the lens onto Sam, Tia or Mr Lee.');buttons();S.want=fin(3,()=>Object.keys(S.seen).length>=3,'One spill, three perspectives. None of them is the only true one.')}},
{h:'Impact',p:'Impact is the effect your choice has on someone else. Drop each choice into the pond.',
 predict:{q:'Sam did not mean to spill. Can snapping at Tia still hurt her?',opts:['No, not if he did not mean it','Yes, impact counts too'],ans:1},task:'Try all three choices',
 show:()=>{steps[4].go();seq([0,1,2].map(i=>()=>throwStone(i)),600)},go:()=>{clean();say('Drop a choice into the pond to see its impact on Tia.');buttons();S.want=fin(4,()=>S.thrown.length>=3,'What you meant and the impact you had are both real.')}},
{h:'Challenge',p:'',go:()=>{clean();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['“I get cross when I am hungry. It happens most days.” That is a…',[['pattern','ok'],['trigger','trig'],['perspective','persp']]],
 ['“Being hungry sets off my cross feeling.” Being hungry is the…',[['trigger','ok'],['pattern','pat'],['impact','imp']]],
 ['“Jay did not sit with me, so he hates me.” That is an…',[['assumption','ok'],['fact I noticed','fact'],['impact','imp2']]],
 ['At bedtime Zoe thinks back on her day and why she felt upset. She is…',[['reflecting','ok'],['noticing','note'],['triggering','trig2']]],
 ['“From my side it felt unfair, but I can see Tom’s side too.” This is about…',[['perspective','ok'],['pattern','pat2'],['trigger','trig3']]],
 ['Knowing “I go quiet when I am nervous” shows…',[['self-awareness','ok'],['an assumption','ass'],['impact','imp3']]]];
function why(tag){let m='Think about what the word means.';
 if(tag==='trig')m='A trigger is the thing that sets a feeling off (hunger). Happening most days makes it a pattern.';
 if(tag==='persp')m='Perspective is how things look from one person’s side. Something that keeps happening is a pattern.';
 if(tag==='pat')m='A pattern is the repeat over many days. The thing that sets the feeling off is the trigger.';
 if(tag==='imp')m='Impact is the effect on someone else. What sets your own feeling off is a trigger.';
 if(tag==='fact')m='You noticed he did not sit with you. “He hates me” is a guess about his head: an assumption.';
 if(tag==='imp2')m='Impact is the effect of an action. Guessing why Jay did it, without asking, is an assumption.';
 if(tag==='note')m='Noticing is spotting something now. Thinking back on why is reflecting.';
 if(tag==='trig2')m='A trigger sets off a feeling. Thinking back on your day is reflecting.';
 if(tag==='pat2')m='A pattern repeats. Seeing your side and Tom’s side is about perspective.';
 if(tag==='trig3')m='A trigger sets a feeling off. Seeing two sides of one event is perspective.';
 if(tag==='ass')m='An assumption is an unchecked guess. Knowing your own habit is self-awareness.';
 if(tag==='imp3')m='Impact is your effect on others. Knowing how you act when nervous is self-awareness.';
 return m}
function pose(){ask++;const[q,ops]=QS[ask%QS.length],turn=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes.':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
