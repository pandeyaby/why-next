/* Flagship – jot it down so I don't have to hold it (ages 8–10; working memory holds only a few items: Cowan 2001,
   Gathercole & Alloway 2008; cognitive offloading: Risko & Gilbert 2016; EEF guidance on jottings). Scenes: a 4-space
   head overflows when the coach's 6-fact message goes in, so the oldest fact drops out until facts go on the jotter;
   jot only the facts that change Ria's answer; jot the in-between answer of a two-step problem and start step 2 from
   it; empty a full head onto the jotter to make room to think; and label bare numbers with what they mean. Every drag
   or tap has a labelled button twin. Data and drawings in learn/jot_art.js. */
(()=>{const {box,inside,kit,MSG,SHORT,APPLE,STEP,CHAIRS,NUMS,DESC,DONE,QS,bubble,pad:paper}=JOT;
VIS.reg('flagjot',c=>{let A,T,pad,chal,qi=-1,gen=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',bg:'#f0f9ff',chip:'#e0f2fe',head:'#6d28d9'};
const st={};const sc=()=>['msg','pick','between','room','label','quiz'][A.step];const CAP=4;
const cardB=()=>box(A.W*.03,A.H*.03,A.W*.94,A.H*.27),headB=()=>box(A.W*.03,A.H*.35,A.W*.45,A.H*.44),jotB=()=>box(A.W*.52,A.H*.35,A.W*.45,A.H*.48);
const slotB=k=>{const h=headB();return box(h.x+8,h.y+A.H*.07+k*A.H*.088,h.w-16,A.H*.078)},lineY=k=>jotB().y+jotB().h*.2+k*jotB().h*.13;
const lineB=k=>{const j=jotB();return box(j.x+j.w*.12,lineY(k)-jotB().h*.12,j.w*.86,jotB().h*.12)},bottomB=()=>box(A.W*.03,A.H*.86,A.W*.94,A.H*.11);
/* chips still on the question card */
function cardChips(){const k=sc(),list=k==='msg'?MSG.map((t,i)=>({t,i})).filter(o=>st.where[o.i]==='card'):k==='pick'?APPLE.map((o,i)=>({t:o.t,i})).filter(o=>!st.jotted.includes(o.i)):
 k==='label'?NUMS.map(([,t],i)=>({t,i})).filter(o=>!st.labelled.includes(o.i)):[];const c0=cardB(),bx=T.flow(list.map(o=>o.t),box(c0.x+8,c0.y+A.H*.075,c0.w-16,c0.h),11);return list.map((o,n)=>({...o,b:bx[n]}))}
function drawHead(title){const g=A.ctx,h=headB();bubble(g,h);T.words(title||`In my head: ${st.head.length} of ${CAP}`,h.x+h.w/2,h.y+A.H*.035,11,{c:K.head});
 for(let k=0;k<CAP;k++){const b=slotB(k),t=st.headT[k];if(st.drag&&st.drag.from==='head'&&st.drag.k===k)continue;g.setLineDash(t?[]:[4,4]);T.card(b,t?'#ffffff':'#f5f3ff',t&&st.lost===-2?'':'');g.setLineDash([]);if(t)T.words(t,b.x+b.w/2,b.y+b.h/2,10,{w:b.w-8})}}
function drawJot(lines,hi){const g=A.ctx,j=jotB();paper(g,j);T.words('Jotter',j.x+j.w/2,j.y+j.h*.08,11,{c:'#92400e'});
 lines.forEach((t,k)=>{if(k<7)T.words(t,j.x+j.w*.14,lineY(k)-j.h*.05,10,{al:'left',w:j.w*.82,b:hi===k?800:700,c:hi===k?K.ok:'#1e3a8a'})})}
function drawCard(title,body,mid){const g=A.ctx,b=cardB();T.card(b,'#ffffff','');T.words(title,b.x+b.w/2,mid?b.y+b.h*(body?.3:.45):b.y+A.H*.045,12,{w:b.w-16});if(body)T.words(body,b.x+b.w/2,b.y+b.h*.6,11,{w:b.w-24,b:700})}
function drawChips(){cardChips().forEach(o=>{let b=o.b;if(st.drag&&st.drag.from==='card'&&st.drag.i===o.i)b=box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h);
 T.card(b,K.chip,st.bad===o.i?'ko':st.drag&&st.drag.i===o.i&&st.drag.from==='card'?'sel':'');T.words(o.t,b.x+b.w/2,b.y+b.h/2,11)})}
function drawDragged(){const d=st.drag;if(!d||d.from!=='head')return;const b=slotB(0);T.card(box(d.x-b.w/2,d.y-b.h/2,b.w,b.h),'#ffffff','sel');T.words(st.headT[d.k],d.x,d.y,10,{w:b.w-8})}
function status(t,ok){T.words(t,A.W/2,A.H*.92,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20})}
/* ---------- 1: the message ---------- */
function drawMsg(){drawCard('Coach: “Listen, I will only say it once!”');drawChips();drawHead();drawJot(st.jotMsg.map(i=>SHORT[i]));drawDragged();
 const kept=MSG.length-st.where.filter(w=>w==='card').length;status(kept===MSG.length?'✓ All 6 facts kept: some in my head, the rest on the jotter':st.lostT?`✗ Dropped out of my head: ${st.lostT}`:`Facts kept: ${kept} of 6`,kept===MSG.length)}
function toHead(i){if(st.where[i]!=='card')return;let lost='';if(st.head.length>=CAP){const o=st.head.shift();st.where[o]='card';lost=MSG[o];st.lostT=lost}else st.lostT='';
 st.head.push(i);st.where[i]='head';syncHead();A.sound[lost?'miss':'tick']();say(lost?slip('overflow',lost):`Holding: ${MSG[i]}. ${CAP-st.head.length} space${CAP-st.head.length===1?'':'s'} left in your head.`)}
function jotMsg(i){if(st.where[i]==='jot')return;if(st.where[i]==='head'){st.head=st.head.filter(x=>x!==i);syncHead()}st.where[i]='jot';st.jotMsg.push(i);st.lostT='';A.sound.pop();say(`Jotted: ${MSG[i]}. It stays on the page.`)}
function syncHead(){st.headT=st.head.map(i=>MSG[i])}
/* ---------- 2: what matters ---------- */
function drawPick(){drawCard('Which facts change the answer?');drawChips();const h=headB();bubble(A.ctx,h);T.words('Ria’s question:',h.x+h.w/2,h.y+A.H*.04,11,{c:K.head});
 T.words('Ria has 3 bags. Each bag has 6 apples. The bags are red. On Monday she eats 2 apples. How many are left?',h.x+h.w/2,h.y+h.h*.5,11,{w:h.w-18,b:700});drawJot(st.jotted.map(i=>APPLE[i].j));
 const n=st.jotted.length;status(n>=3?'✓ The 3 facts that matter are jotted':`Facts jotted: ${n} of 3`,n>=3)}
function jotPick(i){if(st.jotted.includes(i))return;const o=APPLE[i];if(!o.need){st.bad=i;A.sound.miss();return say(slip(o.slip))}st.bad=-1;st.jotted.push(i);A.sound.pop();say(`Jotted: ${o.j}.`+(st.jotted.length<3?' What else changes the answer?':' That is everything you need.'))}
/* ---------- 3: the in-between answer ---------- */
const tileB=k=>box(A.W*(.05+k*.15),A.H*.62,A.W*.12,A.H*.12);
function drawBetween(){const s=STEP[Math.min(st.s,1)];drawCard(st.s>1?'✓ Both steps done':s.q,st.s>1?'':'Drag the right number onto the jotter.',true);
 const h=headB();bubble(A.ctx,h);T.words('Working on:',h.x+h.w/2,h.y+A.H*.04,11,{c:K.head});T.words(st.s===0?'3 lots of 6':st.s===1?'take 2 away from the in-between answer':'done',h.x+h.w/2,h.y+A.H*.12,11,{w:h.w-16});
 if(st.s<2)s.tiles.forEach(([n],k)=>{let b=tileB(k);if(st.drag&&st.drag.k===k)b=box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h);T.card(b,'#ffffff',st.badT===k?'ko':st.drag&&st.drag.k===k?'sel':'');T.words(String(n),b.x+b.w/2,b.y+b.h/2,16)});
 drawJot(['3 bags','6 apples in each','eats 2',...STEP.slice(0,st.s).map(x=>x.j)],st.s?2+st.s:-1);status(st.s>1?'✓ 18 apples, then 18 − 2 = 16 left':`Step ${st.s+1} of 2`,st.s>1)}
function pickNum(k){if(st.s>1)return;const [n,s]=STEP[st.s].tiles[k];if(s){st.badT=k;A.sound.miss();return say(slip(s))}st.badT=-1;st.s++;A.sound.pop();
 say(st.s===1?'Jotted: 18 apples in all. Now step 2 can start from 18.':'Jotted: 16 left. You started step 2 from the in-between answer, 18.')}
/* ---------- 4: room to think ---------- */
const workB=()=>box(A.W*.03,A.H*.86,A.W*.45,A.H*.11);
function drawRoom(){drawCard('A class sets out 5 tables with 4 chairs at each. 3 chairs are broken. How many good chairs?','',true);drawHead(`In my head: ${st.head.length} of ${CAP}`);
 drawJot([...st.jotRoom.map(i=>CHAIRS[i]),...(st.solved?['5 × 4 = 20 chairs','20 − 3 = 17 good chairs']:[])],st.solved?st.jotRoom.length+1:-1);drawDragged();
 const b=workB();T.card(b,'#fef9c3',st.badW?'ko':st.solved?'ok':'');T.words((st.badW?'✗ ':st.solved?'✓ ':'')+'Work it out',b.x+b.w/2,b.y+b.h/2,12);
 T.words(st.solved?'✓ 17 good chairs':`Free spaces: ${CAP-st.head.length}`,A.W*.75,A.H*.92,12,{b:700,c:st.solved?K.ok:K.ink})}
function jotRoom(i){if(!st.head.includes(i)||st.solved)return;st.head=st.head.filter(x=>x!==i);st.headT=st.head.map(x=>CHAIRS[x]);st.jotRoom.push(i);st.badW=false;A.sound.pop();
 say(`Jotted: ${CHAIRS[i]}. ${CAP-st.head.length} space${CAP-st.head.length===1?'':'s'} free to think.`)}
function work(){if(st.solved)return;if(CAP-st.head.length<2){st.badW=true;A.sound.miss();return say(slip('full'))}st.solved=true;st.badW=false;A.sound.pop();
 say('Room to think: 5 × 4 = 20 chairs, jot 20, then 20 − 3 = 17 good chairs.')}
/* ---------- 5: what does each number mean ---------- */
function drawLabel(){drawCard('Drag each label onto its number.');drawChips();
 const h=headB();bubble(A.ctx,h);T.words('Ria’s question:',h.x+h.w/2,h.y+A.H*.04,11,{c:K.head});T.words('3 bags, 6 apples in each bag. She eats 2. How many are left?',h.x+h.w/2,h.y+h.h*.45,11,{w:h.w-18,b:700});
 drawJot(NUMS.map(([n,t],i)=>st.labelled.includes(i)?`${n} ${t}`:`${n}  …?`),-1);NUMS.forEach((_,k)=>{if(st.badL===k){const b=lineB(k);A.ctx.strokeStyle=K.ko;A.ctx.lineWidth=3;A.ctx.strokeRect(b.x,b.y,b.w,b.h)}});
 status(st.labelled.length>=4?'✓ Every number says what it means':`Labelled: ${st.labelled.length} of 4`,st.labelled.length>=4)}
function putLabel(i,k){if(st.labelled.includes(i))return;if(i!==k){st.badL=k;A.sound.miss();return say(slip('label',NUMS[i][1],NUMS[k][0]))}st.badL=-1;st.labelled.push(i);A.sound.pop();say(`Yes: ${NUMS[k][0]} ${NUMS[i][1]}.`)}
/* ---------- feedback that names the slip ---------- */
function slip(t,a,b){let m='Think about what you need to keep, then try again.';
 if(t==='overflow')m=`Your head was full, so “${a||'a fact'}” dropped out. Jot facts down so they stay safe.`;
 if(t==='colour')m='The colour of the bags does not change how many apples there are. Leave it out.';
 if(t==='day')m='Monday does not change the number of apples. You do not need to jot it.';
 if(t==='copy')m='Copying every word takes ages and buries the numbers. Jot just the numbers and what they mean.';
 if(t==='add')m='3 bags of 6 means 3 lots of 6: 3 × 6, not 3 + 6.';
 if(t==='times')m='12 is only 2 bags of 6. Count 3 lots of 6: 6, 12, 18.';
 if(t==='wrongstart')m='Start step 2 from the in-between answer, 18, not from a number in the question.';
 if(t==='addinstead')m='Ria eats 2, so 2 apples go away. Take away: 18 − 2.';
 if(t==='full')m='Your head is full of facts, so there is no room to think. Jot some facts down to make room.';
 if(t==='label')m=a?`${b} is not the number of ${a}. Look back at the question: which number is ${a}?`:'Numbers on their own are easy to mix up. Jot what each number means.';
 if(t==='need')m='That fact changes the answer, so you need it. Leave out facts like colours and days.';
 if(t==='guess')m='A guess is not working it out. Jot facts down to free room, then work it out.';
 if(t==='why')m='Jotting keeps facts and in-between answers on the page, so your head has room for the next step.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=sc();const g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);if(k==='quiz'){T.words('Challenge',A.W/2,A.H*.4,22);T.words('Hold · Jot · In-between · Room · Label',A.W/2,A.H*.55,13,{w:A.W-20});return}
 ({msg:drawMsg,pick:drawPick,between:drawBetween,room:drawRoom,label:drawLabel})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sc(),grab=o=>{st.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y},o);A.redraw();return true};
 if(k==='msg'||k==='label'||k==='pick'){const o=cardChips().find(o=>inside(p,o.b));if(o)return grab({from:'card',i:o.i})}
  if(k==='msg'||k==='room'){for(let n=0;n<st.head.length;n++)if(inside(p,slotB(n)))return grab({from:'head',k:n})}
 if(k==='between'&&st.s<2){for(let n=0;n<3;n++)if(inside(p,tileB(n)))return grab({from:'tile',k:n})}
 if(k==='room'&&inside(p,workB()))work();return false}
function move(p){const d=st.drag;if(!d)return;d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=sc(),moved=Math.hypot(p.x-d.x0,p.y-d.y0)>12,onJ=inside(p,jotB()),onH=inside(p,headB());
 if(k==='msg'){if(d.from==='card'){if(onH)return toHead(d.i);if(onJ||!moved)return onJ?jotMsg(d.i):say(`Drag “${MSG[d.i]}” into your head or onto the jotter.`)}else if(onJ)return jotMsg(st.head[d.k])}
 if(k==='pick'&&(onJ||!moved))return jotPick(d.i);
 if(k==='between'&&(onJ||!moved))return pickNum(d.k);
 if(k==='room'&&d.from==='head'&&(onJ||!moved))return jotRoom(st.head[d.k]);
 if(k==='label'&&d.from==='card'){const n=NUMS.findIndex((_,j)=>inside(p,lineB(j)));if(n>=0)return putLabel(d.i,n);if(!moved){st.selL=d.i;return say(`“${NUMS[d.i][1]}” picked. Drag it onto its number, or use the buttons.`)}}
 A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=sc(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='msg')MSG.forEach((t,i)=>{if(st.where[i]==='card'){b(`Head: ${t}`,()=>toHead(i),`Hold in my head: ${t}`);b(`Jot: ${t}`,()=>jotMsg(i),`Jot down: ${t}`)}else if(st.where[i]==='head')b(`Jot: ${t}`,()=>jotMsg(i),`Move from my head to the jotter: ${t}`)});
 if(k==='pick'&&st.jotted.length<3)APPLE.forEach((o,i)=>{if(!st.jotted.includes(i))b(`Jot: ${o.t}`,()=>jotPick(i),`Jot down: ${o.t}`)});
 if(k==='between'&&st.s<2)STEP[st.s].tiles.forEach(([n],j)=>b(`Jot ${n}`,()=>pickNum(j),`Step ${st.s+1}: jot ${n}`));
 if(k==='room'&&!st.solved){st.head.forEach(i=>b(`Jot: ${CHAIRS[i]}`,()=>jotRoom(i),`Move from my head to the jotter: ${CHAIRS[i]}`));b('Work it out',work)}
 if(k==='label'&&st.labelled.length<4){const i=st.selL>=0&&!st.labelled.includes(st.selL)?st.selL:NUMS.findIndex((_,j)=>!st.labelled.includes(j));NUMS.forEach(([n],j)=>{if(!st.labelled.includes(j))b(`“${NUMS[i][1]}” by ${n}`,()=>putLabel(i,j),`Put the label ${NUMS[i][1]} by the number ${n}`)})}}
function reset(){gen++;for(const x in st)delete st[x];Object.assign(st,{where:MSG.map(()=>'card'),head:[],headT:[],jotMsg:[],lostT:'',jotted:[],bad:-1,s:0,badT:-1,jotRoom:[],solved:false,badW:false,labelled:[],badL:-1,selL:-1,drag:null,hook:()=>{}})}
function loadRoom(){st.head=[0,1,2,3];st.headT=CHAIRS.slice()}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test,pre){reset();pre&&pre();say(DESC[i]);st.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Too much to hold',p:'The coach gives you 6 facts at once. Drag each one into your head or onto the jotter. Watch what happens when your head is full.',
 predict:{q:'Can you hold all 6 facts in your head at once?',opts:['Yes, easily','No, some will drop out'],ans:1},task:'Keep all 6 facts',
 show:()=>demo(0,[0,1,2,3,4].map(i=>()=>toHead(i)).concat([()=>jotMsg(0),()=>jotMsg(5)]),380),go:()=>begin(0,()=>st.where.every(w=>w!=='card'))},
{h:'Jot what matters',p:'Jot only the facts that change the answer. Drag them onto the jotter.',
 predict:{q:'Should you jot every word of the question?',opts:['Yes, copy it all','No, just the numbers and what they mean'],ans:1},task:'Jot the 3 facts that matter',
 show:()=>demo(1,[0,1,4].map(i=>()=>jotPick(i)),450),go:()=>begin(1,()=>st.jotted.length>=3)},
{h:'Jot the in-between answer',p:'This question has two steps. Work out step 1 and jot the answer. Then do step 2.',
 predict:{q:'Step 1 gives 18 apples. Then what do you do with 18?',opts:['Keep it in my head','Jot it down, then start step 2 from it'],ans:1},task:'Jot both steps',
 show:()=>demo(2,[()=>pickNum(1),()=>pickNum(2)],600),go:()=>begin(2,()=>st.s>=2)},
{h:'Room to think',p:'Your head is full of facts from the chairs question. Tap Work it out. If there is no room, jot facts down first.',task:'Make room and work it out',
 show:()=>demo(3,[()=>jotRoom(0),()=>jotRoom(1),()=>jotRoom(2),work],450),go:()=>begin(3,()=>st.solved,loadRoom)},
{h:'Say what each number means',p:'Ria jotted 3, 6, 18 and 2, but no words. Drag each label onto its number.',task:'Label all 4 numbers',
 show:()=>demo(4,[0,1,2,3].map(i=>()=>putLabel(i,i)),450),go:()=>begin(4,()=>st.labelled.length>=4)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=kit(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Jotting lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
