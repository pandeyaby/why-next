/* Flagship – ethics in real-world issues (ages 9–11), on one live issue: should our school ban phones?
   Split fact questions from values questions, match reasons to the people affected, take a position on a line and back it,
   sum up the other side fairly (steelman, not strawman), and sort new evidence, including a case for an exception.
   Every drag has a button twin. Text sits on light cards with dark ink, so it reads in both themes. */
(()=>{
const INK='#111827',CARD='#fff7ed',BOX=['#dbeafe','#fce7f3','#dcfce7','#fef9c3'];
const DECKS={
 0:{bins:['Fact: check it','Values: argue it'],cards:[
  ['How many pupils bring a phone to school?',0,'You can count this. That makes it a fact question.'],
  ['Is it fair to take phones away from everyone?',1,'Fair is a values word. People can look at the same facts and still disagree.'],
  ['Do phones buzz during lessons?',0,'You can watch and check. That makes it a fact question.'],
  ['Should safety matter more than freedom?',1,'This asks what matters most. That is a values question.'],
  ['What does the government guidance say?',0,'You can read the guidance and check. That is a fact question.'],
  ['Who should get to make the rule?',1,'This is about who has the right to decide. That is a values question.']]},
 1:{bins:['Pupil','Parent','Teacher','Pupil with diabetes'],cards:[
  ['"I want to reach my child if the bus is late."',1,'Think about who worries on the way home. That is the parent.'],
  ['"Phones buzzing break up my lesson."',2,'Who is trying to teach the class? That is the teacher.'],
  ['"Break is when I message my friends."',0,'This is about time with friends at break. That is a pupil.'],
  ['"My phone reads my blood sugar sensor."',3,'Some pupils with diabetes use a phone app to check their blood sugar.']]},
 4:{bins:['Helps the ban case','Weakens the ban case','Needs an exception'],cards:[
  ['A study in England found test results went up after schools banned phones.',0,'Better results after a ban is evidence for a ban.'],
  ['A 2025 study of 30 schools found strict phone rules did not make pupils feel better.',1,'If a ban does not help wellbeing, that weakens one reason for it.'],
  ['Some pupils need a phone to check their blood sugar.',2,'A fair rule can still allow phones for medical needs.']]}};
const REASONS=[['Fewer buzzing phones means fewer distractions in class',1],['Pupils need phones to stay safe on the way home',-1],['Everyone in my class thinks so',0]];
const FAIR=[{q:'You are FOR a ban. Sum up the other side fairly.',good:1,opts:['They only want to play games all day','Some families want phones for the trip home, so they ask for phones kept in bags','They are wrong, so I do not need to listen'],
  bad:['That is a strawman: a weak version that is easy to knock down.','','Not listening is not a summary. Say their best reason.']},
 {q:'Now you are AGAINST a ban. Sum up the other side fairly.',good:2,opts:['They just want to boss pupils about','Nobody really thinks that','Teachers say phones distract in class, so they want them away until home time'],
  bad:['That guesses a bad motive. Say the reason they would give.','Lots of people do think it. Say their best reason.','']}];
VIS.reg('flagstance',c=>{let A,row,quiz,qi=-1,inRow=0;const L={};
const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const upd=()=>{note(L.said);A.redraw()};
const em=n=>Math.round(n*(A.narrow?1:1.12));
function wrap(g,t,w,n,wt){g.font=`${wt||700} ${em(n)}px system-ui,sans-serif`;const out=[''];t.split(' ').forEach(x=>{const k=out.length-1,nx=out[k]?out[k]+' '+x:x;if(g.measureText(nx).width>w&&out[k])out.push(x);else out[k]=nx});return out}
function text(g,t,x,y,w,n,col,wt){const ls=wrap(g,t,w,n,wt),lh=em(n)*1.25;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;ls.forEach((l,i)=>g.fillText(l,x,y+(i-(ls.length-1)/2)*lh))}
function box(g,r,fill,lw,line){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=line||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const inside=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const deck=()=>DECKS[A.step];
const cardR=()=>({x:A.W*.08,y:A.H*.16,w:A.W*.84,h:A.H*.3});
function binR(i){const n=deck().bins.length,cols=n===4?2:n,rows=Math.ceil(n/cols),gap=8,w=(A.W-gap*(cols+1))/cols,h=(A.H*.4-gap*(rows-1))/rows;return{x:gap+(i%cols)*(w+gap),y:A.H*.56+Math.floor(i/cols)*(h+gap),w,h}}
const lineY=()=>A.H*.3,lineX=v=>A.W*.17+(v+1)/2*A.W*.66;
const reasonR=i=>({x:A.W*.06,y:A.H*(.5+i*.16),w:A.W*.88,h:A.H*.14});
const optR=i=>({x:A.W*.06,y:A.H*(.2+i*.26),w:A.W*.88,h:A.H*.23});
function scene(A){const{ctx:g,W,H,col:C}=A,s=A.step;g.fillStyle=C.pn;g.fillRect(0,0,W,H);
 text(g,'📱 Should our school ban phones?',W/2,H*.06,W-16,14,C.tx,800);
 if(s===5){text(g,'Facts, people, a position, fairness, evidence.',W/2,H*.45,W-30,14,C.tx);return}
 if(DECKS[s]){const D=deck();D.bins.forEach((b,i)=>{const r=binR(i);box(g,r,BOX[i],L.flash===i?5:2,L.flash===i?C.rd:INK);text(g,b,r.x+r.w/2,r.y+r.h*.3,r.w-12,13,INK,800);
   const got=L.placed.filter(([,t])=>t===i).length;if(got)text(g,'✓ '+got,r.x+r.w/2,r.y+r.h*.72,r.w-12,12,INK,800)});
  if(L.i<D.cards.length){const r=cardR(),d=L.drag;if(d){r.x=d.x-r.w/2;r.y=d.y-r.h/2}box(g,r,CARD,3,INK);text(g,D.cards[L.i][0],r.x+r.w/2,r.y+r.h/2,r.w-24,15,INK,700)}
  else text(g,'All sorted!',W/2,H*.3,W-20,16,C.tx,800);
  text(g,L.said||`Card ${Math.min(L.i+1,D.cards.length)} of ${D.cards.length}`,W/2,H*.5,W-16,11,C.tx,600);return A.fx.draw(g)}
 if(s===2){const y=lineY();g.lineWidth=6;g.strokeStyle=C.mu;g.beginPath();g.moveTo(lineX(-1),y);g.lineTo(lineX(1),y);g.stroke();
  [[-1,'Against a ban'],[0,'Not sure'],[1,'For a ban']].forEach(([v,t])=>{g.fillStyle=C.mu;g.fillRect(lineX(v)-1.5,y-12,3,24);text(g,t,lineX(v),y+30,W*.3,12,C.tx,700)});
  const x=lineX(L.pos);g.beginPath();g.arc(x,y,16,0,7);g.fillStyle=C.ac;g.fill();g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();text(g,'Me',x,y-28,60,12,C.tx,800);
  REASONS.forEach(([t],i)=>{const r=reasonR(i);box(g,r,L.reason===i?'#dcfce7':CARD,L.reason===i?4:2,INK);text(g,t,r.x+r.w/2,r.y+r.h/2,r.w-20,14,INK)});
  text(g,L.said||'Drag Me to your view, then tap a reason.',W/2,H*.13,W-16,11,C.tx,600);return A.fx.draw(g)}
 if(s===3){if(L.round<FAIR.length){const F=FAIR[L.round];text(g,F.q,W/2,H*.13,W-16,12,C.tx,800);F.opts.forEach((t,i)=>{const r=optR(i);box(g,r,L.wrong===i?'#fee2e2':CARD,L.wrong===i?4:2,INK);text(g,t,r.x+r.w/2,r.y+r.h/2,r.w-20,14,INK)})}
  else text(g,'Both sides summed up fairly.',W/2,H*.4,W-20,15,C.tx,800);
  text(g,L.said||'',W/2,H*.96,W-16,11,C.tx,600);return A.fx.draw(g)}}
function drop(t){const D=deck();if(L.i>=D.cards.length)return;const[,want,why]=D.cards[L.i];L.drag=null;
 if(t!==want){L.flash=t;A.sound.miss();L.said='Not quite. '+why;upd();return}
 L.placed.push([L.i,t]);L.i++;L.flash=-1;A.sound.pop();L.said='Yes. '+why;upd();keys();L.want()}
function place(v){L.pos=Math.max(-1,Math.min(1,v));A.redraw();check2()}
function pickReason(i){L.reason=i;A.sound.tick();check2(true);keys()}
function check2(loud){if(L.reason<0)return;const side=REASONS[L.reason][1];
 if(side===0)L.said='Lots of people agreeing is not a reason. Say who it helps and how.';
 else if(Math.abs(L.pos)<.25)L.said='You are in the middle. Move Me to the side your reason supports.';
 else if(Math.sign(L.pos)!==side)L.said='That reason supports the other side. Move Me, or pick another reason.';
 else{L.said='Position plus reason: that is an argument.';L.ok2=1}
 if(loud&&!L.ok2)A.sound.miss();upd();if(L.ok2)L.want()}
function fair(i){if(L.round>=FAIR.length)return;const F=FAIR[L.round];if(i!==F.good){L.wrong=i;A.sound.miss();L.said=F.bad[i];upd();return}
 L.wrong=-1;L.round++;A.sound.pop();L.said='Fair! They would agree that is their view.';upd();keys();L.want()}
function keys(){if(!row)return;row.innerHTML='';const s=A.step,B=(t,fn,l,pr)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);if(pr!=null)b.setAttribute('aria-pressed',String(pr));b.onclick=fn};
 if(DECKS[s]&&L.i<deck().cards.length)deck().bins.forEach((b,i)=>B(b,()=>drop(i),'Put the card in '+b));
 if(s===2){B('◀ Against',()=>place(L.pos-.25),'Move my marker towards against a ban');B('For ▶',()=>place(L.pos+.25),'Move my marker towards for a ban');REASONS.forEach(([t],i)=>B('Reason '+(i+1),()=>pickReason(i),t,L.reason===i))}
 if(s===3&&L.round<FAIR.length)FAIR[L.round].opts.forEach((t,i)=>B('Summary '+'ABC'[i],()=>fair(i),t))}
function grab(p){const s=A.step;
 if(DECKS[s]){if(inside(p,cardR())&&L.i<deck().cards.length){L.drag={x:p.x,y:p.y};A.redraw();return true}deck().bins.forEach((b,i)=>{if(inside(p,binR(i)))drop(i)});return false}
 if(s===2){const i=REASONS.findIndex((x,j)=>inside(p,reasonR(j)));if(i>=0){pickReason(i);return false}if(Math.abs(p.y-lineY())<40){place((p.x-lineX(0))/(A.W*.33));return true}return false}
 if(s===3)[0,1,2].forEach(i=>{if(inside(p,optR(i)))fair(i)});return false}
function move(p){if(L.drag){L.drag={x:p.x,y:p.y};A.redraw()}else if(A.step===2)place((p.x-lineX(0))/(A.W*.33))}
function up(p){if(!L.drag)return;const i=deck().bins.findIndex((b,j)=>inside(p,binR(j)));L.drag=null;if(i>=0)drop(i);else A.redraw()}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list){const me=(L.run=(L.run||0)+1);let j=0;(function go(){if(me!==L.run||j>=list.length)return;const[f,ms]=list[j++];f();setTimeout(go,A.reduced()?40:ms)})()}
function fresh(){const r=(L.run||0)+1;Object.keys(L).forEach(k=>delete L[k]);Object.assign(L,{run:r,want:()=>{},i:0,placed:[],flash:-1,drag:null,pos:0,reason:-1,ok2:0,round:0,wrong:-1,said:''})}
const sortAll=n=>()=>{steps[n].go();auto(DECKS[n].cards.map(([,t])=>[()=>drop(t),500]))};
const steps=[
{h:'Fact or values?',p:'Some questions you can check. Others are about what matters, so people argue them with reasons.',predict:{q:'Is "Should phones be banned?" a fact question?',opts:['No, it is about values, so facts alone cannot settle it','Yes, you can just look it up','Yes, the teacher knows the answer'],ans:0},task:'Sort all 6 questions',
 show:sortAll(0),go:()=>{fresh();note('Drag the card to Fact or Values, or tap a box.');keys();L.want=ready(0,()=>L.i>=6,'Facts can be checked. Values questions need reasons, and people can disagree fairly.')}},
{h:'Who is affected?',p:'A rule lands on different people in different ways. Match each reason to the person who would say it.',predict:{q:'Does a phone ban affect everyone the same way?',opts:['No, people have different needs','Yes, a rule is a rule','Only pupils are affected'],ans:0},task:'Match all 4 reasons to a person',
 show:sortAll(1),go:()=>{fresh();note('Drag each reason to the person who would say it.');keys();L.want=ready(1,()=>L.i>=4,'Pupils, parents, teachers and a pupil with a medical need all see the rule differently.')}},
{h:'Take a position',p:'Decide where you stand on the line. Then back it with a reason that says who it helps and how.',predict:{q:'Which is the strongest kind of reason?',opts:['One that says who it helps and how','One that most people agree with','One that is said loudly'],ans:0},task:'Place Me and pick a reason for your side',
 show:()=>{steps[2].go();auto([[()=>place(.25),300],[()=>place(.5),300],[()=>place(.75),300],[()=>pickReason(0),500]])},
 go:()=>{fresh();note('Drag Me along the line, then pick a reason.');keys();L.want=ready(2,()=>L.ok2,'A position with a reason about people is an argument, not just an opinion.')}},
{h:'Be fair to the other side',p:'Before you disagree, say the other side\'s best reason, in a way they would agree with.',task:'Pick the fair summary twice',
 show:()=>{steps[3].go();auto(FAIR.map(F=>[()=>fair(F.good),600]))},
 go:()=>{fresh();note('Pick the summary the other side would call fair.');keys();L.want=ready(3,()=>L.round>=2,'A fair summary is a steelman. It makes your own thinking stronger.')}},
{h:'New evidence',p:'Evidence can help a side, weaken it, or show a rule needs an exception. Sort each card.',predict:{q:'New evidence goes against your view. What should you do?',opts:['Weigh it, and change my mind if it is strong','Ignore it','Only listen to people who agree with me'],ans:0},task:'Sort all 3 evidence cards',
 show:sortAll(4),go:()=>{fresh();note('Drag each evidence card to a box.');keys();L.want=ready(4,()=>L.i>=3,'Strong evidence can move you. One study is not the last word, and fair rules can have exceptions.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>L.want()});
const QS=[['Which is a fact question?',[['How many pupils have phones?','ok'],['Is a ban fair?','fairq'],['Should pupils be trusted?','trust']]],
 ['Ali says, "A ban is right because everyone says so." What is wrong?',[['Popular is not a reason','ok'],['Nothing, that is a good reason','pop'],['He should say it louder','loud']]],
 ['Which is a fair summary of the other side?',[['They want phones for safety on the way home','ok'],['They just want games','straw'],['They are being silly','silly']]],
 ['A new study goes against your view. What is a good move?',[['Think again about my view','ok'],['Ignore it','ignore'],['Find a friend who agrees','friend']]],
 ['A pupil needs a phone for a medical app. A fair rule would…',[['Allow an exception for them','ok'],['Treat everyone exactly the same','same'],['Ban medical apps too','med']]],
 ['Who is affected by a school phone rule?',[['Pupils, parents and teachers','ok'],['Only pupils','pupils'],['Only the head teacher','head']]]];
function slip(t){let m='Look for reasons that say who is helped and how.';
 if(t==='fairq')m='Fair is a values word. You cannot settle it just by counting.';
 if(t==='trust')m='Should is a values word. That needs reasons, not a count.';
 if(t==='pop')m='Lots of people agreeing is popularity, not a reason.';
 if(t==='loud')m='Loud does not make it true. Give a reason about people.';
 if(t==='straw')m='That is a strawman. Give their best reason instead.';
 if(t==='silly')m='Calling people silly is not a summary. Say their reason.';
 if(t==='ignore')m='Ignoring evidence is not good thinking. Weigh it.';
 if(t==='friend')m='Only hearing people who agree keeps you stuck.';
 if(t==='same')m='The same rule can hurt someone with a medical need.';
 if(t==='med')m='Banning a medical app could put someone at risk.';
 if(t==='pupils')m='Parents and teachers are affected too.';
 if(t==='head')m='A rule lands on many people, not just the head.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>mark(t)});note('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inRow++;A.win()}else{inRow=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+inRow+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.72,tall:1.35,draw:scene,onStep:A=>{quiz.hidden=A.step!==5;row.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down:grab,move,up});keys()}});
A.start()})})();
