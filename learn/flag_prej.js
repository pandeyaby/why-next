/* Flagship – prejudice and discrimination (ages 9–11): build the chain idea → feeling → action (stereotype, prejudice,
   discrimination); test whether different treatment is "because of who they are"; open the ripples of harm round one
   girl; shield the nine protected characteristics in the Equality Act 2010; choose the safe, helpful things to do. */
(()=>{
const CHAIN=[[['Thinks: “Travellers steal.”',0],['Feels: distrusts Jack, the new boy whose family are Travellers',1],['Does: won’t let Jack join the team',2]],
 [['Does: gives Lily no job in the group project',2],['Thinks: “Wheelchair users can’t keep up.”',0],['Feels: annoyed that Lily is in her group',1]]];
const SLOT=['Idea: stereotype','Feeling: prejudice','Action: discrimination'];
const CWHY=['A thought about a whole group is a stereotype.','A feeling against someone because of their group is prejudice.','Treating someone unfairly because of who they are is discrimination.'];
const WHY=[['Sam is not picked for the choir because he uses a wheelchair.',1,'His wheelchair has nothing to do with singing. That is discrimination.'],
 ['Sam is not picked for the choir because he missed the try-out.',0,'Missing the try-out is about what he did, not who he is. That is a fair reason.'],
 ['Nadia is told she can’t sit with the group because she is Muslim.',1,'Being shut out for her religion is discrimination.'],
 ['Mo is moved to another seat because he kept talking.',0,'He was moved for what he did, not for who he is.'],
 ['A shop guard follows Kofi round, just because he is Black.',1,'Being watched for his race, when he has done nothing, is discrimination.'],
 ['Priya gets extra time in tests because she has dyslexia.',0,'This is help she needs to have a fair chance. Treating her differently here is fair, not discrimination.'],
 ['Ruby is told girls can’t play football at break.',1,'Being stopped because she is a girl is discrimination.']];
const RINGS=[['Nadia','She feels hurt and ashamed of who she is. She may stop wanting to come to school.'],['Her friends and family','They worry about her and feel angry and sad too.'],
 ['Other Muslim children','They feel unsafe and wonder if they will be next.'],['The whole class','Trust breaks, groups split, and everyone loses Nadia’s ideas and friendship.']];
const TRAITS=[['Age',1],['Disability',1],['Race',1],['Religion or belief',1],['Sex',1],['Sexual orientation',1],['Gender reassignment',1],['Pregnancy and maternity',1],['Marriage and civil partnership',1],
 ['Favourite food',0],['Football team',0],['Hair colour',0]];
const ACTS=[{s:'At lunch some kids tell Ali to move because “your food smells weird” and laugh about his country.',o:[['Sit with Ali and include him',1],['Laugh along so they don’t pick on you',0,'Laughing along joins in and tells Ali that no one is on his side.'],
  ['Tell a teacher or a trusted adult',1],['Shout insults back at them',0,'Insults start a fight and can put you in danger. Stay calm.'],['Calmly say: “That’s not fair. Leave him alone.”',1],['Ignore it: it’s not your problem',0,'Ignoring it lets it carry on. A bystander can still help safely.']]},
 {s:'In a group chat, someone posts a meme that makes fun of disabled people.',o:[['Don’t like it or share it',1],['Forward it to show others',0,'Forwarding spreads the hurt to more people.'],['Report it or show a trusted adult',1],
  ['Post a worse meme back',0,'Hitting back with something cruel adds more harm.'],['Check the person it targets is OK',1],['Keep scrolling: it’s only a joke',0,'A joke that puts down a whole group still hurts real people.']]}];
VIS.reg('flagprej',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},r:0,k:0,won:0,placed:[],open:[],shield:[],sel:[],tip:-1,grab:null,note:''}),S=B0();
const mode=()=>['chain','why','ripple','law','act','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?.95:1.1)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function wrap(g,t,x,y,w,n,lh,al){g.font=`600 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';const L=[];let cur='';
 t.split(' ').forEach(wd=>{const z=cur?cur+' '+wd:wd;if(g.measureText(z).width>w&&cur){L.push(cur);cur=wd}else cur=z});L.push(cur);
 const h=lh||fs(n)*1.25;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*h));return L.length*h}
function box(g,x,y,w,h,col,a,dash){const C=A.col;g.fillStyle=A.alpha(col,a==null?.2:a);A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;if(dash)g.setLineDash([6,5]);A.paint.rrect(x,y,w,h,10);g.stroke();g.setLineDash([])}
const slots=()=>{const n=mode()==='chain'?3:2,gap=8,w=(A.W-16-gap*(n-1))/n,h=A.H*.3;return[...Array(n)].map((_,i)=>({x:8+i*(w+gap),y:A.H-h-8,w,h}))};
const card=()=>({w:Math.min(A.W-24,420),h:A.H*.25,x:A.W/2,y:A.H*.3});
const within=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function rings(){const m=Math.min(A.W,A.H);return RINGS.map((_,i)=>m*(.1+.12*i))}
function tiles(list){const cols=A.narrow?2:3,rows=Math.ceil(list.length/cols),gap=6,w=(A.W-16-gap*(cols-1))/cols,top=A.H*.16,h=(A.H-top-8-gap*(rows-1))/rows;
 return list.map((_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);g.fillStyle=C.tx;
 const head=t=>{g.font=`800 ${fs(14)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,W/2,fs(14),W-16)};
 if(v==='quiz'){const cols=[C.cy,C.or,C.rd];['Idea','Feeling','Action'].forEach((t,i)=>{box(g,10+i*(W-20)/3,H*.35,(W-20)/3-8,H*.3,cols[i]);g.fillStyle=C.tx;wrap(g,t,10+i*(W-20)/3+((W-20)/3-8)/2,H*.5,(W-20)/3-16,15)});return}
 if(v==='chain'||v==='why'){const sl=slots(),names=v==='chain'?SLOT:['Discrimination: because of who they are','Fair reason: what they did or need'],cols=v==='chain'?[C.cy,C.or,C.rd]:[C.rd,C.gr];
  sl.forEach((s,i)=>{box(g,s.x,s.y,s.w,s.h,cols[i],.16,1);g.fillStyle=C.tx;wrap(g,names[i],s.x+s.w/2,s.y+fs(22),s.w-10,12);
   if(v==='chain'){const got=S.placed.find(q=>q[1]===i);if(got){g.fillStyle=C.tx;wrap(g,got[0],s.x+s.w/2,s.y+s.h*.64,s.w-10,11)}}});
  if(v==='chain'&&S.placed.length===3)for(let i=0;i<2;i++){const a=sl[i],y=a.y+a.h/2;g.fillStyle=C.tx;g.font=`800 ${fs(16)}px system-ui`;g.textAlign='center';g.fillText('→',a.x+a.w+4,y)}
  const list=v==='chain'?CHAIN[S.r]:WHY,done=v==='chain'?S.won>=CHAIN.length:S.k>=WHY.length;
  if(!done&&!(v==='chain'&&S.placed.length===3)){const it=list[S.k],k=card(),p=S.grab&&S.grab.x!=null?S.grab:k;box(g,p.x-k.w/2,p.y-k.h/2,k.w,k.h,S.tip>=0?C.rd:C.vi,.22);g.fillStyle=C.tx;wrap(g,it[0],p.x,p.y,k.w-20,15)}
  head(done?(v==='chain'?'Idea → feeling → action':'Ask: is it because of who they are?'):v==='chain'?`Story ${S.r+1}: where does this card go?`:`Card ${S.k+1} of ${WHY.length}`);
  if(S.note){g.fillStyle=C.tx;wrap(g,S.note,W/2,H*.52,W-30,12)}}
 if(v==='ripple'){const m={x:W/2,y:H*.55},rs=rings();for(let i=rs.length-1;i>=0;i--){const on=S.open.includes(i);g.beginPath();g.arc(m.x,m.y,rs[i],0,7);g.fillStyle=on?A.alpha(C.rd,.12+.08*(3-i)):A.alpha(C.tx,.06);g.fill();g.strokeStyle=on?C.rd:A.alpha(C.tx,.5);g.lineWidth=2;g.stroke()}
  g.fillStyle=C.tx;g.font=`800 ${fs(13)}px system-ui`;g.textAlign='center';g.fillText('Nadia',m.x,m.y);rs.forEach((r,i)=>{if(i)g.fillText(String(i+1),m.x,m.y-r+fs(10))});
  head(S.open.length<4?'Tap each ring to see who is hurt':'One unfair act hurts many people');if(S.note){g.fillStyle=C.tx;wrap(g,S.note,W/2,fs(42),W-24,13)}}
 if(v==='law'){tiles(TRAITS).forEach((r,i)=>{const on=S.shield.includes(i),bad=S.tip===i;box(g,r.x,r.y,r.w,r.h,bad?C.rd:on?C.gr:C.tx,on||bad?.3:.06);g.fillStyle=C.tx;wrap(g,(on?'🛡️ ':'')+TRAITS[i][0],r.x+r.w/2,r.y+r.h/2,r.w-10,13)});
  head(`Protected by law: ${S.shield.length} of 9`)}
 if(v==='act'&&S.r<ACTS.length){const a=ACTS[S.r];g.fillStyle=C.tx;wrap(g,a.s,W/2,H*.09,W-24,13);const T=actTiles();a.o.forEach(([t],i)=>{const on=S.sel.includes(i),bad=S.tip===i;box(g,T[i].x,T[i].y,T[i].w,T[i].h,bad?C.rd:on?C.gr:C.tx,on||bad?.3:.06);g.fillStyle=C.tx;wrap(g,(on?'✓ ':'')+t,T[i].x+T[i].w/2,T[i].y+T[i].h/2,T[i].w-10,13)})}
 if(v==='act'&&S.r>=ACTS.length)head('Safe, kind and brave: you can stand up to it');
 A.fx.draw(g)}
function actTiles(){const cols=2,gap=6,w=(A.W-16-gap)/2,top=A.H*.2,h=(A.H-top-8-gap*2)/3;return[...Array(6)].map((_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const miss=(t,i)=>{A.sound.miss();S.tip=i==null?0:i;S.note=t;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:800);buttons();A.redraw()};
const good=t=>{A.sound.pop();S.tip=-1;S.note=t;speak(t);buttons();A.redraw();S.want()};
function place(bin){const v=mode();S.grab=null;
 if(v==='chain'){if(S.won>=CHAIN.length||S.placed.length===3)return;const[t,ok]=CHAIN[S.r][S.k];
  if(bin!==ok)return miss((bin===2?'Nothing has been done to anyone yet. ':bin===0&&ok===2?'This is something someone does. ':'')+CWHY[ok]);S.placed.push([t,ok]);S.k++;S.note=CWHY[ok];
  if(S.placed.length<3){A.sound.tick();speak(CWHY[ok]);buttons();return A.redraw()}
  S.won++;const msg='The idea fed the feeling, and the feeling led to the action.';if(S.won<CHAIN.length){A.sound.pop();speak(msg+' Tap Next story.');S.note=msg;buttons();return A.redraw()}return good(msg)}
 if(v==='why'){if(S.k>=WHY.length)return;const[,d,why]=WHY[S.k],ok=bin===(d?0:1);if(!ok)return miss((d?'Look for the reason. ':'Treated differently is not always unfair. ')+why);S.k++;
  if(S.k<WHY.length){A.sound.tick();S.note=why;speak(why);buttons();return A.redraw()}S.won=1;good(why+' Discrimination is unfair treatment because of who someone is.')}}
function nextStory(){if(mode()!=='chain'||S.placed.length<3||S.won>=CHAIN.length)return;S.r++;S.k=0;S.placed=[];S.note='';A.sound.tick();speak('Story 2. Where does this card go?');buttons();A.redraw()}
function openRing(i){if(mode()!=='ripple')return;if(i==null)i=[0,1,2,3].find(j=>!S.open.includes(j));if(i==null)return;const[n,t]=RINGS[i];S.note=`${n}: ${t}`;
 if(S.open.includes(i)){speak(S.note);return A.redraw()}S.open.push(i);if(S.open.length<4){A.sound.tick();speak(S.note);buttons();return A.redraw()}good(S.note)}
function shield(i){if(mode()!=='law'||S.shield.length>=9)return;if(i==null)i=TRAITS.findIndex((t,j)=>t[1]&&!S.shield.includes(j));const[n,p]=TRAITS[i];
 if(!p)return miss(`${n} is not one of the 9 in the Equality Act 2010. Being unkind about it is still wrong.`,i);if(S.shield.includes(i))return speak(`${n} is shielded already.`);
 S.shield.push(i);if(S.shield.length<9){A.sound.tick();speak(`${n} is protected.`);buttons();return A.redraw()}good('All 9 protected characteristics are shielded. Treating someone unfairly because of them is against the law.')}
function toggle(i){if(mode()!=='act'||S.r>=ACTS.length)return;S.sel=S.sel.includes(i)?S.sel.filter(j=>j!==i):S.sel.concat(i);A.sound.tick();speak(`${ACTS[S.r].o[i][0]}: ${S.sel.includes(i)?'chosen':'not chosen'}.`);buttons();A.redraw()}
function checkAct(){if(mode()!=='act'||S.r>=ACTS.length)return;const o=ACTS[S.r].o,bad=S.sel.find(i=>!o[i][1]);
 if(bad!=null)return miss(o[bad][2],bad);const want=o.map((x,i)=>x[1]?i:-1).filter(i=>i>=0),gap=want.filter(i=>!S.sel.includes(i));
 if(gap.length)return miss(`Good so far. ${gap.length} more safe, helpful thing${gap.length>1?'s':''} to choose.`,-1);S.r++;S.sel=[];
 if(S.r<ACTS.length){A.sound.pop();speak('Yes: include, speak up calmly, get help. Next one.');buttons();return A.redraw()}good('Including them, speaking up calmly and telling an adult are all ways to stand against it.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='chain'&&S.won<CHAIN.length){if(S.placed.length===3)B('Next story →',nextStory);else SLOT.forEach((s,i)=>B(s,()=>place(i),'Put it in '+s))}
 if(v==='why'&&S.k<WHY.length){B('Discrimination',()=>place(0),'Put it in Discrimination: because of who they are');B('Fair reason',()=>place(1),'Put it in Fair reason')}
 if(v==='ripple'&&S.open.length<4)RINGS.forEach(([n],i)=>B(n,()=>openRing(i),'Open the ring: '+n));
 if(v==='law'&&S.shield.length<9)TRAITS.forEach(([n],i)=>{if(!S.shield.includes(i))B(n,()=>shield(i),'Shield '+n)});
 if(v==='act'&&S.r<ACTS.length){ACTS[S.r].o.forEach(([t],i)=>B((S.sel.includes(i)?'✓ ':'')+t,()=>toggle(i)));B('Check my choices',checkAct)}A.redraw()}
function down(p){const v=mode();
 if(v==='chain'||v==='why'){const k=card();if(Math.abs(p.x-k.x)<k.w/2&&Math.abs(p.y-k.y)<k.h/2){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='ripple'){const d=Math.hypot(p.x-A.W/2,p.y-A.H*.55),i=rings().findIndex(r=>d<=r);if(i>=0)openRing(i);return false}
 if(v==='law'){const i=tiles(TRAITS).findIndex(r=>within(p,r));if(i>=0)shield(i);return false}
 if(v==='act'){const i=actTiles().findIndex(r=>within(p,r));if(i>=0)toggle(i);return false}return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;const b=slots().findIndex(r=>within(p,r));if(b<0){speak('Drop the card in a box.');return A.redraw()}place(b)}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*300))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Idea, feeling, action',p:'Drag each card to its box, or use the buttons. A stereotype is an idea. Prejudice is a feeling. Discrimination is an action.',
 predict:{q:'Ella thinks “I don’t like kids who wear a hijab”, but she says and does nothing. Is that discrimination?',opts:['Yes, it is discrimination','No: it is prejudice'],ans:1},task:'Build both stories',
 show:()=>{steps[0].go();play([...CHAIN[0].map(x=>()=>place(x[1])),nextStory,...CHAIN[1].map(x=>()=>place(x[1]))])},go:()=>{fresh();speak('Where does this card go?');buttons();S.want=check(0,()=>S.won>=2,'Prejudice is a feeling. Discrimination is what someone does with it.')}},
{h:'Because of who they are?',p:'People are treated differently for lots of reasons. Is this one about who they are, or about what they did or need?',
 predict:{q:'Every pupil who is treated differently is being discriminated against. True?',opts:['True','False: it depends why'],ans:1},task:'Sort all 7 cards',
 show:()=>{steps[1].go();play(WHY.map(x=>()=>place(x[1]?0:1)))},go:()=>{fresh();speak('Discrimination, or a fair reason?');buttons();S.want=check(1,()=>S.won>=1,'The test: are they treated worse because of who they are?')}},
{h:'Ripples of harm',p:'Nadia is left out of a game because she is Muslim. Tap each ring to see who it hurts.',
 predict:{q:'Who does leaving Nadia out hurt?',opts:['Only Nadia, and only for a moment','Nadia and many people round her'],ans:1},task:'Open all 4 rings',
 show:()=>{steps[2].go();play([0,1,2,3].map(i=>()=>openRing(i)))},go:()=>{fresh();speak('Tap the middle ring first.');buttons();S.want=check(2,()=>S.open.length>=4,'Discrimination harms the person, the people who care about them and the whole group.')}},
{h:'Protected by law',p:'In Great Britain the Equality Act 2010 makes it illegal to treat people unfairly because of 9 things. Tap each one to shield it.',task:'Shield all 9 and leave the rest',
 show:()=>{steps[3].go();play(TRAITS.map((t,i)=>t[1]?()=>shield(i):null).filter(Boolean))},go:()=>{fresh();speak('Tap a protected characteristic to shield it.');buttons();S.want=check(3,()=>S.shield.length>=9,'These are the 9 protected characteristics.')}},
{h:'What can I do?',p:'Choose every safe, helpful thing to do. Tap to choose, tap again to unchoose, then check.',task:'Get both right',
 show:()=>{steps[4].go();play([0,2,4,checkAct,0,2,4,checkAct].map(i=>typeof i==='function'?i:()=>toggle(i)))},go:()=>{fresh();speak(ACTS[0].s);buttons();S.want=check(4,()=>S.r>=2,'You do not have to be a hero. Be kind, stay safe and get help.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Tom dislikes the new boy because he is from Poland, but says nothing. What is that?',[['Prejudice','ok'],['Discrimination','act'],['A fair reason','fair']]],
 ['A club won’t let a girl join because she is deaf. What is that?',[['Discrimination','ok'],['Prejudice only','feel'],['Fine: it’s their club','club']]],
 ['Jas is not picked for the team because he didn’t come to training. Is it discrimination?',[['No, it’s about what he did','ok'],['Yes, he was left out','left'],['Yes, it’s always unfair','left']]],
 ['Some kids mock a boy’s religion and he stays home the next day. What does that show?',[['Discrimination causes real harm','ok'],['It was only a joke','joke'],['He is too sensitive','blame']]],
 ['Your friend is excluded for her skin colour. What is the best first step?',[['Include her and tell an adult','ok'],['Shout at the others','fight'],['Stay out of it','ignore']]]];
function why(t){let m='Ask: is someone being treated worse because of who they are?';
 if(t==='act')m='Nothing has been done yet. A feeling against someone because of their group is prejudice.';
 if(t==='fair')m='Where someone is from is not a fair reason to dislike them. That is prejudice.';
 if(t==='feel')m='It is more than a feeling: the club acted and shut her out. That is discrimination.';
 if(t==='club')m='Shutting someone out because of a disability is unfair, and against the Equality Act.';
 if(t==='left')m='Being left out is not always discrimination. This was about missing training, not who he is.';
 if(t==='joke')m='If it hurts someone for who they are, it is not just a joke. He did not want to come to school.';
 if(t==='blame')m='The harm is caused by the people mocking him, not by him.';
 if(t==='fight')m='Shouting can start a fight. Stay calm, include her and get an adult to help.';
 if(t==='ignore')m='Staying out of it leaves her alone. You can help safely by including her and telling an adult.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
