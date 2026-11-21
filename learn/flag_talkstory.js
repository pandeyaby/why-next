/* Flagship – talking about a story I know (ages 3–4; Development Matters 2021 Communication and Language; Reception
   retelling and the Comprehension ELG). The book stays shut the whole time: the child recalls who was in Goldilocks and
   the Three Bears (the wolf and a dragon bounce back), sorts what really happened from made-up or borrowed events,
   drags the answer that fits each question word (who = person, what = thing, where = place), picks the telling that a
   listener who never heard the story can follow (say the name, not "she" or "it"), and builds true who-did-what
   sentences. Every drag or tap has a labelled button twin. Data and drawings in learn/talkstory_art.js. */
(()=>{const {face,WHO,WHAT,ASK,KIND,WORD,SAY,DOER,DID,DESC,DONE,QS}=TKS;
VIS.reg('flagtalkstory',c=>{let A,pad,chal,qi=-1,gen=0;c.fig.classList.add('young');
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',sun:'#fef9c3',leaf:'#dcfce7',sky:'#dbeafe',rose:'#fce7f3',sand:'#ffedd5'};
const S={};const scene=()=>['who','what','ask','say','build','quiz'][A.step];
const px=n=>Math.round(A.narrow?n:n*1.15);
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* centred words; when w is given they wrap onto as many lines as they need */
function words(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
 const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){rows.push(line);line=w}else line=t}rows.push(line);
 const lh=px(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
/* a card; right and wrong are also marked with ✓ and ✗ in the words, never colour alone */
function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||K.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(16,b.h/3));g.fill();
 g.lineWidth=state?4:2;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
function ground(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function tally(t,n,of){words(`${t}: ${n} of ${of}`,A.W/2,A.H*.955,13,{c:A.col.tx,b:700})}
function held(b){return S.drag?box(S.drag.x-b.w/2,S.drag.y-b.h/2,b.w,b.h):b}
/* ---------- 1 and 2: sort with the book shut ---------- */
const binB=i=>box(A.W*(.04+i*.48),A.H*.45,A.W*.44,A.H*.43);
const whoB=()=>box(A.W*.38,A.H*.04,A.W*.44,A.H*.34),whatB=()=>box(A.W*.08,A.H*.07,A.W*.84,A.H*.24);
function drawSort(list,labels,fill){ground(fill);const g=A.ctx,live=S.i<list.length,it=list[Math.min(S.i,list.length-1)],isWho=list===WHO;
 if(isWho)face(g,'book',A.W*.18,A.H*.19,A.W*.26);
 let b=held(isWho?whoB():whatB());card(b,K.sun,S.drag?'sel':'');
 if(!live)words('✓ All sorted',b.x+b.w/2,b.y+b.h/2,15,{w:b.w-14,c:K.ok});
 else if(isWho){face(g,it.k,b.x+b.w/2,b.y+b.h*.42,Math.min(b.w,b.h)*.62);words(it.t,b.x+b.w/2,b.y+b.h*.88,12,{w:b.w-10})}
 else words(it.t,b.x+b.w/2,b.y+b.h/2,14,{w:b.w-16});
 labels.forEach((t,i)=>{const B=binB(i),bad=S.bad===i;card(B,K.card,bad?'ko':'');words((bad?'✗ ':'')+t,B.x+B.w/2,B.y+px(20),12,{w:B.w-10});
  S.done.filter(d=>d.y===(i===0)).forEach((d,j)=>words('✓ '+(d.s||d.t),B.x+B.w/2,B.y+B.h*(.3+j*.17),11,{w:B.w-12,b:700,c:i?K.ink:K.ok}))});
 tally('Sorted',S.done.length,list.length)}
function sortTo(list,yes){const it=list[S.i];if(!it)return;if(it.y!==yes){S.bad=yes?0:1;A.sound.miss();return tell(slip(it.slip||(list===WHO?'missed':'real'),it.t))}
 S.done.push(it);S.i++;S.bad=-1;A.sound.pop();tell(`${yes?'Yes':'No'}: ${it.t}.`+(S.i<list.length?' Next card.':' All sorted.'))}
/* ---------- 3: who, what, where ---------- */
const qB=()=>box(A.W*.06,A.H*.05,A.W*.88,A.H*.22),ansB=i=>box(A.W*.1,A.H*(.4+i*.16),A.W*.8,A.H*.13);
function drawAsk(){ground(K.sky);const live=S.i<ASK.length,Q=ASK[Math.min(S.i,ASK.length-1)],qb=qB();card(qb,K.card,'');
 if(!live){words('✓ 4 questions answered',qb.x+qb.w/2,qb.y+qb.h/2,15,{w:qb.w-12,c:K.ok});return tally('Answered',S.i,ASK.length)}
 words(Q.q,qb.x+qb.w/2,qb.y+qb.h*.38,16,{w:qb.w-12});words(`${WORD[Q.want]} wants ${KIND[Q.want]}`,qb.x+qb.w/2,qb.y+qb.h*.78,11,{w:qb.w-12,b:700,c:'#1e3a8a'});
 Q.a.forEach(([t],i)=>{let b=ansB(i);if(S.drag&&S.drag.i===i)b=held(b);card(b,K.sun,S.bad===i?'ko':S.drag&&S.drag.i===i?'sel':'');words((S.bad===i?'✗ ':'')+t,b.x+b.w/2,b.y+b.h/2,13,{w:b.w-12})});
 tally('Answered',S.i,ASK.length)}
function answer(i){const Q=ASK[S.i];if(!Q)return;const [t,kind]=Q.a[i];if(kind!==Q.want){S.bad=i;A.sound.miss();return tell(slip('qword',t,Q))}
 S.i++;S.bad=-1;A.sound.pop();tell(`Yes: ${Q.q} ${t}.`+(S.i<ASK.length?' Next question.':''))}
/* ---------- 4: say the name, for a listener who never heard it ---------- */
const optB=i=>box(A.W*.06,A.H*(.44+i*.24),A.W*.88,A.H*.2);
const flip=()=>S.i%2===1,optText=i=>SAY[S.i][(i===0)===flip()?1:0],isClear=i=>(i===0)===flip();
function drawSay(){ground(K.leaf);const g=A.ctx,live=S.i<SAY.length;face(g,'grandpa',A.W*.18,A.H*.18,A.W*.22);
 const bub=box(A.W*.34,A.H*.06,A.W*.6,A.H*.26);card(bub,K.card,S.bad>=0?'ko':S.heard?'ok':'');
 words(S.bad>=0?'✗ Who? What? I did not hear the story.':S.heard?'✓ '+S.heard:'Tell me what happened!',bub.x+bub.w/2,bub.y+bub.h/2,12,{w:bub.w-14});
 if(live)[0,1].forEach(i=>{const b=optB(i);card(b,K.sun,S.bad===i?'ko':'');words('"'+optText(i)+'"',b.x+b.w/2,b.y+b.h/2,14,{w:b.w-16})});
 else words('✓ Grandpa knows who did what.',A.W/2,A.H*.6,14,{c:A.col.tx,w:A.W-20});tally('Told clearly',S.i,SAY.length)}
function pickSay(i){if(S.i>=SAY.length)return;if(!isClear(i)){S.bad=i;S.heard='';A.sound.miss();return tell(slip('vague',optText(i)))}
 S.heard=optText(i);S.i++;S.bad=-1;A.sound.pop();tell(`Grandpa understands: ${S.heard}`+(S.i<SAY.length?' Tell him the next part.':''))}
/* ---------- 5: who did what ---------- */
const doerB=i=>box(A.W*(.03+i*.325),A.H*.05,A.W*.3,A.H*.14),didB=i=>box(A.W*(.04+(i%2)*.48),A.H*(.26+Math.floor(i/2)*.16),A.W*.44,A.H*.13);
function drawBuild(){ground(K.rose);DOER.forEach((t,i)=>{let b=doerB(i);if(S.drag&&S.drag.i===i)b=held(b);card(b,K.card,S.who===i||(S.drag&&S.drag.i===i)?'sel':'');words(t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-8})});
 DID.forEach((d,i)=>{const b=didB(i),got=S.made.includes(i),bad=S.bad===i;card(b,K.sun,got?'ok':bad?'ko':'');words((got?'✓ ':bad?'✗ ':'')+d.t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-10})});
 const out=box(A.W*.04,A.H*.6,A.W*.92,A.H*.3);card(out,K.card,'');words('My story',out.x+out.w/2,out.y+px(14),12,{b:700});
 S.made.forEach((i,j)=>words(`✓ ${DOER[DID[i].by]} ${DID[i].t}.`,out.x+out.w/2,out.y+out.h*(.34+j*.2),11,{w:out.w-12,b:700,c:K.ok}));tally('True sentences',S.made.length,3)}
function chooseWho(i){S.who=i;S.bad=-1;A.sound.tick();tell(`${DOER[i]}. Now tap what they did.`)}
function chooseDid(i){if(S.made.includes(i))return;if(S.who<0){A.sound.tick();return tell('First tap who did it: Goldilocks, the three bears or Baby Bear.')}
 const d=DID[i];if(d.by!==S.who){S.bad=i;A.sound.miss();return tell(slip('mixup',DOER[S.who],d))}
 S.made.push(i);S.who=-1;S.bad=-1;A.sound.pop();tell(`True: ${DOER[d.by]} ${d.t}.`+(S.made.length<3?' Make another.':''))}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Think about the story with the book shut, then try again.';
 if(t==='other')m=`"${a}" is from a different story: The Three Little Pigs. Keep each story's own people and events.`;
 if(t==='made')m=`"${a}" was not in this book. That is made up. When we talk about a story we know, we tell what really happened.`;
 if(t==='missed')m=`${a} was in this story. Think of the three bowls, three chairs and three beds.`;
 if(t==='real')m=`"${a}" really happened in the story. Think of the porridge, the chair and the bed.`;
 if(t==='qword')m=b?`"${b.q.split(' ')[0]}" asks for ${KIND[b.want]}. "${a}" is ${KIND[b.a.find(x=>x[0]===a)[1]]}.`:'Look at the question word: who wants a person, what wants a thing, where wants a place.';
 if(t==='vague')m=`"${a}" Grandpa does not know who "she", "it" or "they" is. Say the name: Goldilocks, the chair, the bears.`;
 if(t==='mixup')m=b?`${a} did not do that. ${DOER[b.by]} ${b.t}.`:'That person did not do that in the story. Think: who did it?';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=scene();if(k==='quiz'){ground(K.sun);words('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});words('Who was in it · What happened · Say the name',A.W/2,A.H*.55,13,{c:A.col.tx,w:A.W-20});return}
 if(k==='who')drawSort(WHO,['In the story','Not in this story'],K.sand);if(k==='what')drawSort(WHAT,['It happened','It did not happen'],K.sky);
 if(k==='ask')drawAsk();if(k==='say')drawSay();if(k==='build')drawBuild();A.fx.draw(A.ctx)}
function down(p){const k=scene(),lift=o=>{S.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
 if(k==='who'||k==='what'){const L=k==='who'?WHO:WHAT;if(inside(p,k==='who'?whoB():whatB())&&S.i<L.length)return lift({});for(let i=0;i<2;i++)if(inside(p,binB(i)))sortTo(L,i===0);return false}
 if(k==='ask'&&S.i<ASK.length){for(let i=0;i<3;i++)if(inside(p,ansB(i)))return lift({i});return false}
 if(k==='say'){for(let i=0;i<2;i++)if(inside(p,optB(i)))pickSay(i);return false}
 if(k==='build'){for(let i=0;i<3;i++)if(inside(p,doerB(i)))return lift({i});const j=DID.findIndex((_,n)=>inside(p,didB(n)));if(j>=0)chooseDid(j);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=scene(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='who'||k==='what'){for(let i=0;i<2;i++)if(inside(p,binB(i)))return sortTo(k==='who'?WHO:WHAT,i===0);return A.redraw()}
 if(k==='ask'){if(tap||inside(p,qB()))return answer(d.i);return A.redraw()}
 if(k==='build'){chooseWho(d.i);if(!tap){const j=DID.findIndex((_,n)=>inside(p,didB(n)));if(j>=0)chooseDid(j)}}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='who'&&S.i<WHO.length){b('In the story',()=>sortTo(WHO,true),`In the story: ${WHO[S.i].t}`);b('Not in this story',()=>sortTo(WHO,false),`Not in this story: ${WHO[S.i].t}`)}
 if(k==='what'&&S.i<WHAT.length){b('It happened',()=>sortTo(WHAT,true),`It happened: ${WHAT[S.i].t}`);b('It did not happen',()=>sortTo(WHAT,false),`It did not happen: ${WHAT[S.i].t}`)}
 if(k==='ask'&&S.i<ASK.length)ASK[S.i].a.forEach(([t],i)=>b(t,()=>answer(i),`Answer ${ASK[S.i].q} with ${t}`));
 if(k==='say'&&S.i<SAY.length)[0,1].forEach(i=>b(optText(i),()=>pickSay(i),`Tell Grandpa: ${optText(i)}`));
 if(k==='build'){DOER.forEach((t,i)=>b(t,()=>chooseWho(i),`Who: ${t}`));DID.forEach((d,i)=>{if(!S.made.includes(i))b(d.t,()=>chooseDid(i),`Did what: ${d.t}`)})}}
function reset(){gen++;for(const x in S)delete S[x];Object.assign(S,{i:0,bad:-1,done:[],heard:'',who:-1,made:[],drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();tell(DESC[i]);S.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const buildActs=[0,1,2].flatMap(n=>{const i=[1,0,2][n];return[()=>chooseWho(DID[i].by),()=>chooseDid(i)]});
const steps=[
{h:'Who was in it?',p:'Think of Goldilocks and the Three Bears. The book is shut. Was each one in the story? Drag the card to a box.',
 predict:{q:'Do you need to see the pictures to say who was in a story you know?',opts:['Yes, I need the pictures','No, I can remember'],ans:1},task:'Sort 6 cards',
 show:()=>demo(0,WHO.map(()=>()=>sortTo(WHO,WHO[S.i].y)),360),go:()=>begin(0,()=>S.done.length>=WHO.length)},
{h:'What happened?',p:'Some of these really happened in the book. Some did not. Drag each card to It happened or It did not happen.',
 task:'Sort 6 events',show:()=>demo(1,WHAT.map(()=>()=>sortTo(WHAT,WHAT[S.i].y)),360),go:()=>begin(1,()=>S.done.length>=WHAT.length)},
{h:'Who? What? Where?',p:'The question word tells you what kind of answer to give. Drag the answer that fits onto the question.',
 predict:{q:'"Who ate the porridge?" What does who want?',opts:['A thing, like a bowl','A person or animal','A place'],ans:1},task:'Answer 4 questions',
 show:()=>demo(2,ASK.map(()=>()=>answer(ASK[S.i].a.findIndex(x=>x[1]===ASK[S.i].want))),420),go:()=>begin(2,()=>S.i>=ASK.length)},
{h:'Say the name',p:'Grandpa did not hear the story, and he cannot see the book. Which way of telling helps him know who and what?',
 predict:{q:'Grandpa did not hear the story. Is "She ate it" enough?',opts:['Yes, he will know','No, say who and what'],ans:1},task:'Tell Grandpa 3 things clearly',
 show:()=>demo(3,SAY.map(()=>()=>pickSay([0,1].find(isClear))),420),go:()=>begin(3,()=>S.i>=SAY.length)},
{h:'Who did what?',p:'Now tell it your way. Tap who, then tap what they did. Only true sentences go in your story.',
 task:'Make 3 true story sentences',show:()=>demo(4,buildActs,300),go:()=>begin(4,()=>S.made.length>=3)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,list=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>check(s,Q,t)});c.say('Challenge: '+Q.q);A.redraw()}
function check(s,Q,t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb');
 const why=!s?'':s==='qword'?`"${Q.q.split(' ')[0]}" asks for ${/^Who/.test(Q.q)?'a person or an animal':'a place'}. "${t}" does not fit.`:s==='mixup'?`${t} did not run away. Goldilocks ran away home when the bears found her.`:slip(s,t);
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
