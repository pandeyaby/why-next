/* Flagship: Rhetoric in non-fiction: ethos, pathos, logos (ages 14-16, GCSE English Language). A fictional dog-shelter
   campaign: sort sentences by appeal, spot five techniques, match openers to audiences, test credibility claims, build
   the strongest paragraph. Not flagweigh (judging evidence) or flagargue (writing an argument). */
(()=>{
VIS.reg('flagrhet',c=>{let A,ctl,qa,qx=-1,tok=0;const R={};
const INK='#111827',PAPER='#f8fafc',WIN='#166534',FOCUS='#5b21b6',MISS='#9f1239',TINT=['#dbeafe','#fce7f3','#dcfce7'];
const APPEALS=['Ethos','Pathos','Logos'],SUB=['credibility','emotion','reason'];
const SORT=[['As a vet who has worked here for 15 years, I check every dog that arrives.',0],['Seven in ten of our dogs arrive underweight.',2],
 ['Imagine coming home to an empty bowl and a cold floor, night after night.',1],['We are a registered charity, and our accounts are online every year.',0],
 ['Bella shook in a corner for a week before she let anyone stroke her.',1],['£5 feeds one dog for a week, so £20 feeds four.',2]];
const SORTWHY=[[null,'It may feel moving, but it works by telling you why to trust the speaker: 15 years as a vet. That is ethos.','The 15 years shows expertise; it is not data. Ethos.'],
 ['A statistic is evidence. It may be sad, but it persuades by giving a fact to reason with. Logos.','Sounding official is not credibility. It is a number used as evidence: logos.',null],
 ['No facts and no credentials: it asks you to picture a feeling. That is pathos.',null,'There is nothing to reason with here, only an image to feel. Pathos.'],
 [null,'This is not about feelings. Being registered and open about money shows you can trust them: ethos.','It has no data. It builds trust in the charity: ethos.'],
 ['A story about one dog does not show the speaker\'s expertise. It makes you feel for Bella: pathos.',null,'One story is not evidence. It works on feeling: pathos.'],
 ['Prices are not about trust. This is a costed reason to give: logos.','The figures may move you, but it works by simple reasoning: £5 × 4 = £20. Logos.',null]];
const SPEECH=['Who among us has not loved a dog?','Last winter, a boy brought us a puppy he found in a bin bag.','Last year we took in 412 dogs, our highest number ever.',
 'We feed them, we warm them, we find them homes.','You can change that today.'];
const TECH=['rhetorical question','anecdote','statistic','triad','direct address'],ASKS=[3,2,0,4,1];
const AUDS=['Council budget committee','Primary school assembly','Local dog owners'];
const OPEN=[['Every £1 spent on rehoming saves the council £3 in stray collection.',0],['Bella was scared and alone. Now she has a home and a best friend.',1],['As dog owners on these streets, we know these dogs like you do.',2]];
const OPENWHY={'0-1':'Young children will not follow a cost saving. A story about one dog makes it real for them.','0-2':'Dog owners respond to people like them; costs to the council are less personal.',
 '1-0':'A committee deciding a budget needs costs and evidence. A sad story alone will not justify spending.','1-2':'This could work, but the shared-identity opener speaks to owners more directly.',
 '2-0':'Shared identity works on fellow owners. The committee needs figures.','2-1':'Children are not dog owners on these streets. A simple story about Bella suits them.'};
const CLAIMS=[['A famous footballer supports our shelter.',35,'Borrowed fame, not expertise in dog welfare. Some readers are swayed; a critical reader asks why it matters.'],
 ['Trust me, I know what I\'m talking about.',10,'It claims trust without giving a reason. Asserted ethos is weak ethos.'],
 ['As the shelter vet for 15 years, I have treated over 2,000 dogs.',90,'Relevant expertise plus a specific record: strong ethos.'],
 ['Everyone in town agrees with us.',20,'That is an appeal to popularity, not credibility, and it cannot be checked.']];
const SLOTS=[{a:0,good:'I am Sam Patel, a parent here and a shelter volunteer for three years.',bad:'Experts say we are the best shelter in the world.',why:'Unnamed experts and a wild claim weaken trust. Name yourself and your link to the audience.'},
 {a:1,good:'Last week our pupils met Bella, a shy dog who now runs to greet them.',bad:'If you do not give, every dog\'s suffering is on you.',why:'Guilt-tripping can make an audience resent you. A real, shared story moves them without blame.'},
 {a:2,good:'The cake sale last term raised £240: enough to feed 48 dogs for a week.',bad:'Millions of dogs are dying everywhere.',why:'A vague, unsourced number cannot be checked. A local, costed figure can: £240 ÷ £5 = 48.'}];
const step=()=>['sort','spot','aud','eth','build','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),line=()=>A.col.dark?'#e5e7eb':INK,hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t)}
/* wrapped text on a pale card; returns its box */
function para(t,x,y,w,o={}){const g=A.ctx,f=o.f||(A.narrow?14:16);g.font=`${o.b?700:600} ${f}px system-ui`;const L=[];let cur='';
 t.split(' ').forEach(wd=>{const nx=cur?cur+' '+wd:wd;if(g.measureText(nx).width>w-22&&cur){L.push(cur);cur=wd}else cur=nx});L.push(cur);
 const h=o.h||L.length*f*1.3+16;g.fillStyle=o.bg||PAPER;A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=o.ring?3:1.3;g.strokeStyle=o.ring||'#94a3b8';g.stroke();
 g.fillStyle=INK;g.textAlign=o.c?'center':'left';g.textBaseline='middle';const y0=y+h/2-(L.length-1)*f*.65;L.forEach((s,i)=>g.fillText(s,o.c?x+w/2:x+11,y0+i*f*1.3));return{x,y,w,h}}
const head=(t,ok)=>para(t,A.W*.04,8,A.W*.92,{b:1,c:1,f:A.narrow?13:16,ring:ok?WIN:FOCUS});
/* three drop bins along the bottom */
const bins=()=>{const n=A.narrow,w=(A.W*.92-16)/3,h=n?A.H*.24:A.H*.3;return[0,1,2].map(i=>({x:A.W*.04+i*(w+8),y:A.H-h-10,w,h}))};
function drawBins(names,subs,flash){const g=A.ctx;bins().forEach((b,i)=>{para(names[i],b.x,b.y,b.w,{h:b.h,c:1,b:1,f:A.narrow?(names[i].length>12?12:14):16,bg:flash===i?'#ffe4e6':TINT[i],ring:flash===i?MISS:null});
 if(subs){g.font='600 12px system-ui';g.fillStyle=INK;g.textAlign='center';g.fillText(subs[i],b.x+b.w/2,b.y+b.h*.78)}})}
function dragCard(text){const w=A.W*.92,x=R.drag?R.drag.x-w/2:A.W*.04,y=R.drag?R.drag.y-20:A.H*(A.narrow?.2:.24);return para(text,lim(x,4,A.W-w-4),y,w,{f:A.narrow?15:18,ring:FOCUS})}
/* ---- 1: sort sentences into appeals ---- */
function drawSort(){const k=R.k;head(k<6?`Sentence ${k+1} of 6: which appeal?`:'All 6 sorted: credibility, emotion, reason',k>5);
 if(k<6)R.card=dragCard(SORT[k][0]);drawBins(APPEALS.map((a,i)=>a+' ('+R.tally[i]+')'),SUB,R.flash)}
function sortTo(b){if(R.k>5)return;const [t,ans]=SORT[R.k];if(b===ans){R.tally[b]++;R.k++;R.flash=null;A.sound.pop();
  return say(`${APPEALS[b]}: ${['it gives a reason to trust the speaker','it works on the reader\'s feelings','it gives facts or reasoning'][b]}.`+(R.k>5?' Two of each.':''))}
 R.flash=b;A.sound.miss();say(SORTWHY[R.k][b])}
/* ---- 2: spot techniques in a speech ---- */
const lines=()=>{const n=A.narrow,f=n?13:16,top=A.H*(n?.17:.18),gap=(A.H-top-10)/5;return SPEECH.map((s,i)=>({x:A.W*.04,y:top+i*gap,w:A.W*.92,h:gap-8,f}))};
function drawSpot(){const r=R.round;head(r<5?`Tap the ${TECH[ASKS[r]]} (${r+1} of 5)`:'All 5 techniques found',r>4);
 lines().forEach((L,i)=>{const got=R.found.includes(i);para((got?TECH[i]+': ':'')+SPEECH[i],L.x,L.y,L.w,{h:L.h,f:L.f,bg:got?'#ede9fe':R.flash===i?'#ffe4e6':PAPER,ring:got?FOCUS:R.flash===i?MISS:null})})}
function spot(i){if(R.round>4)return;const want=ASKS[R.round];if(R.found.includes(i))return say(`That line is already the ${TECH[i]}.`);
 if(i===want){R.found.push(i);R.round++;R.flash=null;A.sound.pop();
  return say({0:'Rhetorical question: it expects no answer, but makes the listener agree in their head.',1:'Anecdote: a short true story that makes the issue personal.',2:'Statistic: 412 dogs gives the claim weight and scale.',3:'Triad: three parallel phrases sound complete and stick in the memory.',4:'Direct address: "you" makes the listener responsible.'}[i])}
 R.flash=i;A.sound.miss();say(`That line is a ${TECH[i]}, not a ${TECH[want]}.`+({3:' A triad is a group of three.',2:' A statistic is a number used as evidence.',0:' A rhetorical question is asked for effect, not for an answer.',4:' Direct address speaks to the listener as "you".',1:' An anecdote is a short story about a real event.'}[want]))}
/* ---- 3: match openers to audiences ---- */
function drawAud(){const k=R.k;head(k<3?`Opener ${k+1} of 3: who is it best for?`:'Each audience got the appeal that suits it',k>2);if(k<3)R.card=dragCard(OPEN[k][0]);drawBins(AUDS,null,R.flash)}
function audTo(b){if(R.k>2)return;const ans=OPEN[R.k][1];if(b===ans){R.k++;R.flash=null;A.sound.pop();return say(['Logos for the committee: they must justify spending, so figures persuade.','Pathos for children: one dog\'s story is concrete and memorable.','Ethos for owners: "people like you" builds trust.'][ans]+(R.k>2?' Same cause, three audiences, three appeals.':''))}
 R.flash=b;A.sound.miss();say(OPENWHY[ans+'-'+b])}
/* ---- 4: credibility meter ---- */
const claims=()=>{const n=A.narrow,top=A.H*.17,h=n?A.H*.13:A.H*.12;return CLAIMS.map((q,i)=>({x:A.W*.04,y:top+i*(h+8),w:A.W*.92,h}))};
function drawEth(){const g=A.ctx;head(R.best?'Strongest ethos found':'Tap each claim to test its credibility',R.best);
 claims().forEach((r,i)=>para(CLAIMS[i][0],r.x,r.y,r.w,{h:r.h,f:A.narrow?13:16,bg:R.tested.includes(i)?(i===2?'#dcfce7':'#ffe4e6'):PAPER,ring:R.pick===i?FOCUS:null}));
 const y=A.H*.86,x0=A.W*.08,w=A.W*.84,v=R.pick==null?0:CLAIMS[R.pick][1];g.fillStyle=A.col.dark?'#334155':'#e5e7eb';A.paint.rrect(x0,y,w,22,11);g.fill();
 g.fillStyle=v>60?WIN:v>30?'#b45309':MISS;A.paint.rrect(x0,y,Math.max(22,w*v/100),22,11);g.fill();g.fillStyle=line();g.font='700 13px system-ui';g.textAlign='left';g.fillText('Credibility: '+(R.pick==null?'tap a claim':v+'/100'),x0,y-12)}
function test(i){R.pick=i;if(!R.tested.includes(i))R.tested.push(i);if(i===2){R.best=true;A.sound.pop()}else A.sound.tick();say(CLAIMS[i][2])}
/* ---- 5: build the paragraph ---- */
const opts=()=>{const n=A.narrow,top=A.H*(n?.4:.42),h=n?A.H*.2:A.H*.2;return[0,1].map(i=>({x:A.W*.04,y:top+i*(h+10),w:A.W*.92,h}))};
const flip=i=>(R.slot+i)%2===0;   // the strong option is not always first
function drawBuild(){const g=A.ctx,s=R.slot;head(s<3?`Parents at a school meeting: pick the stronger ${APPEALS[SLOTS[s].a].toLowerCase()} line`:'A paragraph that persuades parents',s>2);
 const y=A.H*(A.narrow?.2:.2);APPEALS.forEach((a,i)=>{const w=(A.W*.92-16)/3,x=A.W*.04+i*(w+8);para((R.got[i]?'✓ ':'')+a,x,y,w,{c:1,b:1,f:13,bg:R.got[i]?'#dcfce7':TINT[i],ring:i===s?FOCUS:null})});
 g.fillStyle=line();g.font='700 14px system-ui';g.textAlign='center';g.fillText('Persuasion: '+'★'.repeat(R.score)+'☆'.repeat(3-R.score),A.W/2,A.H*.34);
 if(s>2){SLOTS.forEach((S,i)=>para(S.good,A.W*.04,A.H*.4+i*A.H*.18,A.W*.92,{f:A.narrow?12:15,bg:TINT[i]}));return}
 opts().forEach((r,i)=>para(flip(i)?SLOTS[s].good:SLOTS[s].bad,r.x,r.y,r.w,{h:r.h,f:A.narrow?14:16,bg:R.flash===i?'#ffe4e6':PAPER,ring:R.flash===i?MISS:null}))}
function choose(i){if(R.slot>2)return;const S=SLOTS[R.slot];if(flip(i)){R.got[R.slot]=true;R.score++;R.slot++;R.flash=null;A.sound.pop();return say('Stronger: '+S.good+(R.slot>2?' Credible, warm and costed: all three appeals working together.':''))}
 R.flash=i;A.sound.miss();say(S.why)}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);const k=step();
 if(k==='chal'){head('Challenge');const Q=QZ[qx%QZ.length];if(Q)para(Q.pic,A.W*.08,A.H*.36,A.W*.84,{c:1,b:1,f:A.narrow?16:20});return}
 ({sort:drawSort,spot:drawSpot,aud:drawAud,eth:drawEth,build:drawBuild})[k]()}
function fresh(){tok++;for(const k in R)delete R[k];Object.assign(R,{k:0,tally:[0,0,0],flash:null,round:0,found:[],tested:[],pick:null,best:false,slot:0,got:[false,false,false],score:0,drag:null,card:null,test:()=>{}})}
function say(t){voice(t);A.redraw();pads();R.test()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,t,ok,msg){fresh();voice(t);pads();R.test=finish(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},A.reduced()?25*(j+1):(ms||350)*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=step(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='sort'&&R.k<6)APPEALS.forEach((a,i)=>B(a,()=>sortTo(i),`Sort this sentence as ${a}, ${SUB[i]}`));
 if(k==='spot'&&R.round<5)SPEECH.forEach((s,i)=>B('Line '+(i+1),()=>spot(i),`Line ${i+1}: ${s}`));
 if(k==='aud'&&R.k<3)AUDS.forEach((a,i)=>B(a,()=>audTo(i),'Best for: '+a));
 if(k==='eth')CLAIMS.forEach((q,i)=>B('Claim '+(i+1),()=>test(i),`Test claim ${i+1}: ${q[0]}`));
 if(k==='build'&&R.slot<3)[0,1].forEach(i=>B(i?'Lower line':'Upper line',()=>choose(i),'Choose: '+(flip(i)?SLOTS[R.slot].good:SLOTS[R.slot].bad)))}
function down(p){const k=step();
 if((k==='sort'&&R.k<6)||(k==='aud'&&R.k<3)){const b=bins().findIndex(r=>hit(p,r));if(b>=0){k==='sort'?sortTo(b):audTo(b);return false}if(hit(p,R.card)){R.drag={x:p.x,y:p.y};A.redraw();return true}}
 if(k==='spot'){const i=lines().findIndex(r=>hit(p,r));if(i>=0)spot(i)}
 if(k==='eth'){const i=claims().findIndex(r=>hit(p,r));if(i>=0)test(i)}
 if(k==='build'){const i=opts().findIndex(r=>hit(p,r));if(i>=0)choose(i)}return false}
function move(p){if(R.drag){R.drag.x=p.x;R.drag.y=p.y;A.redraw()}}
function up(p){const d=R.drag;R.drag=null;if(!d)return;const b=bins().findIndex(r=>hit(d,r));if(b>=0)step()==='sort'?sortTo(b):audTo(b);else A.redraw()}
const steps=[
{h:'Three appeals',p:'A dog shelter is asking for money. Drag each sentence to the appeal it uses most, or tap a box. Ethos: trust the speaker. Pathos: feel. Logos: reason.',
 predict:{q:'"Seven in ten of our dogs arrive underweight" mainly appeals to…',opts:['pathos: it is sad','logos: it is evidence','ethos: it sounds official'],ans:1},task:'Sort all 6 sentences',
 show:()=>auto(0,SORT.map(s=>()=>sortTo(s[1])),300),
 go:()=>open(0,'A sentence card above three boxes: ethos, pathos, logos.',()=>R.k>5,'Ethos is credibility, pathos is emotion, logos is reasoning and evidence.')},
{h:'Spot the technique',p:'Appeals are built from techniques. Read the speech and tap the line that uses each one.',task:'Find all 5 techniques',
 show:()=>auto(1,ASKS.map(i=>()=>spot(i)),350),
 go:()=>open(1,'A five-line speech from the shelter.',()=>R.round>4,'Rhetorical question, anecdote, statistic, triad, direct address.')},
{h:'Know your audience',p:'The same campaign speaks to three audiences. Drag each opener to the audience it would persuade most.',
 predict:{q:'For a council committee setting a budget, the strongest opener is…',opts:['the saddest story','costed figures','a famous supporter'],ans:1},task:'Match all 3 openers',
 show:()=>auto(2,OPEN.map(o=>()=>audTo(o[1])),450),
 go:()=>open(2,'An opener card above three audiences: council committee, primary assembly, local dog owners.',()=>R.k>2,'The best appeal depends on who is listening.')},
{h:'Test the credibility',p:'Ethos must be earned. Tap each claim to see how much it makes you trust the speaker.',
 predict:{q:'Which claim builds the most credibility?',opts:['a famous footballer supports us','a vet with 15 years here','everyone in town agrees'],ans:1},task:'Find the strongest ethos',
 show:()=>auto(3,[()=>test(0),()=>test(1),()=>test(2)],500),
 go:()=>open(3,'Four credibility claims and an empty credibility meter.',()=>R.best,'Relevant, specific expertise builds trust. Fame, popularity and "trust me" do not.')},
{h:'Build the strongest case',p:'Write to parents at a school meeting. For each appeal, pick the line that persuades without losing their trust.',task:'Get 3 stars',
 show:()=>auto(4,[()=>choose(0),()=>choose(1),()=>choose(0)],500),
 go:()=>open(4,'Three slots: ethos, pathos, logos. Two lines to choose from for each.',()=>R.score>2,'The most persuasive text uses appeals the audience will trust.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.test()});
const QZ=[
 {pic:'"Picture a child shivering in a doorway."',q:'Which appeal does this sentence use?',ans:'pathos',bad:[['logos','img'],['ethos','who']]},
 {pic:'"As a paramedic for 20 years, I have seen what speeding does."',q:'Which appeal is strongest here?',ans:'ethos',bad:[['pathos','scene'],['logos','years']]},
 {pic:'"A London study found 20 mph zones cut casualties by about 40%."',q:'Which appeal does this use?',ans:'logos',bad:[['ethos','council'],['pathos','crash']]},
 {pic:'"We came, we saw, we conquered."',q:'Which technique is this?',ans:'triad',bad:[['anecdote','story'],['rhetorical question','rq']]},
 {pic:'A sad story, no figures, sent to a budget committee',q:'What is the main weakness?',ans:'this audience needs evidence and costs',bad:[['stories never persuade','never'],['it is too short','len']]},
 {pic:'"Trust me, I know best."',q:'Why is this weak ethos?',ans:'it claims trust without a reason to trust',bad:[['it is too polite','polite'],['it uses a statistic','stat']]}];
function why(t){let m='Ask: does it work through trust, feeling or reasoning?';
 if(t==='img')m='There is no fact or reasoning here, only an image to feel. Pathos.';
 if(t==='who')m='The writer gives no reason to trust them. It works on feeling: pathos.';
 if(t==='scene')m='"What speeding does" hints at feeling, but the 20 years as a paramedic is the main move: credibility. Ethos.';
 if(t==='years')m='"20 years" is a number, but it is there to show experience, not as evidence. Ethos.';
 if(t==='council')m='Naming a study adds trust, but the sentence persuades with a measured result: about 40% fewer casualties. Logos.';
 if(t==='crash')m='Casualties are upsetting, but the line works by giving a figure. Logos.';
 if(t==='story')m='An anecdote is a short story about an event. This is three parallel phrases: a triad.';
 if(t==='rq')m='There is no question here. Three short parallel phrases make a triad.';
 if(t==='never')m='Stories can persuade, but a committee must justify spending. Without figures, the appeal does not fit the audience.';
 if(t==='len')m='Length is not the problem. The appeal does not match an audience that needs evidence.';
 if(t==='polite')m='Politeness is not the issue. It asks for trust without giving any reason, such as experience.';
 if(t==='stat')m='There is no number here. The weakness is that the trust is asserted, not earned.';
 return m}
function quiz(){qx++;const Q=QZ[qx%QZ.length],o=[[Q.ans,'ok'],...Q.bad],r=qx%3,ord=o.slice(r).concat(o.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>verdict(t,Q.ans)});voice('Challenge: '+Q.q+' '+Q.pic);A.redraw()}
function verdict(t,ans){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();voice(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:Q=>{qa.hidden=Q.step!==5;ctl.hidden=Q.step===5;pads()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rhetoric lab controls'},w);qa=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
