/* Flagship – allergies and not sharing food (ages 6–7; RSHE 2019 Health and prevention: the facts about allergies; NHS
   food allergy signs). Scenes: drag a looking glass over three friends to see the same peanuts do different things in
   different bodies; drag lunch cards into Do and Don’t; pick soap, gel or trousers and rub peanut bits off sticky
   hands; tap the kind reply when a friend says no to food; spot the signs that mean get help and tell a grown-up.
   Every drag or rub has a labelled button twin. Data in learn/allergy_art.js. */
(()=>{const {FOOD,KIDS,CARDS,BITS,TOOLS,TALK,SIGNS,ACT,DESC,DONE,QS}=ALG;
VIS.reg('flagallergy',c=>{let A,row,ask,qno=-1,tick=0;const st={};c.fig.classList.add('young');
const TEXT='#0f172a',PASS='#047857',FAIL='#b91c1c',EDGE='#64748b',SEL='#6d28d9',FF='px system-ui,sans-serif';
const PHASES=['bodies','lunch','crumbs','reply','help','quiz'],phase=()=>PHASES[A.step];
const s1=n=>Math.round(A.narrow?n:n*1.1);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const near=(p,q,d)=>Math.hypot(p.x-q.x,p.y-q.y)<d;
const R=(x,y,w,h)=>({x,y,w,h});
/* one line of text, made smaller until it fits */
function ink(s,x,y,n,o={}){const g=A.ctx;let k=s1(n);do{g.font=`${o.wt||800} ${k}${FF}`;if(!o.fit||g.measureText(s).width<=o.fit)break;k--}while(k>9);
 g.fillStyle=o.col||TEXT;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* text broken into as many lines as it needs (up to 4) inside a box */
function para(s,r,n,o={}){const g=A.ctx,k=s1(n);g.font=`${o.wt||700} ${k}${FF}`;const out=[];let line='';
 s.split(' ').forEach(w=>{const t=line?line+' '+w:w;if(g.measureText(t).width>r.w-16&&line){out.push(line);line=w}else line=t});out.push(line);
 const L=out.slice(0,4),gap=k*1.25,y0=r.y+r.h/2-(L.length-1)*gap/2;L.forEach((t,i)=>ink(t,r.x+r.w/2,y0+i*gap,n,{fit:r.w-10,wt:o.wt||700,col:o.col}))}
/* a rounded box; tone gives fill and edge; right and wrong also show ✓ / ✗ in the words */
function pill(r,tone){const g=A.ctx,P={pass:['#d1fae5',PASS],fail:['#fee2e2',FAIL],sel:['#ede9fe',SEL],warn:['#fef3c7','#b45309']}[tone]||['#ffffff',EDGE];
 g.fillStyle=P[0];A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();g.lineWidth=tone?3.5:2;g.strokeStyle=P[1];g.stroke()}
function title(s,ok){const g=A.ctx;let k=s1(15);g.font=`800 ${k}${FF}`;while(g.measureText(s).width>A.W-40&&k>10){k--;g.font=`800 ${k}${FF}`}
 const w=g.measureText(s).width+26,r=R((A.W-w)/2,6,w,k+16);pill(r,ok?'pass':'');ink(s,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.1))}
function wash(tint,t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,tint,A.col.dark?.12:t);g.fillRect(0,0,A.W,A.H)}
function note(s,y,tone){if(!s)return;const r=R(A.W*.05,A.H*y,A.W*.9,A.H*.17);pill(r,tone);para(s,r,12)}
/* ---------- 1. same food, different bodies ---------- */
const kidAt=i=>({x:A.W*(.18+i*.32),y:A.H*.3,r:Math.max(30,Math.min(A.W*.12,58))});
const glassHome=()=>({x:A.W*.5,y:A.H*.86});
function drawBodies(){const s=st.b,g=A.ctx;wash('#fde68a',.4);
 KIDS.forEach((K,i)=>{const p=kidAt(i),seen=s.seen.includes(K.k),tone=seen?(K.ok?'pass':'warn'):s.hover===i?'sel':'';
  g.fillStyle={pass:'#d1fae5',warn:'#fef3c7',sel:'#ede9fe'}[tone]||'#ffffff';g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill();g.lineWidth=tone?4:2;g.strokeStyle={pass:PASS,warn:'#b45309',sel:SEL}[tone]||EDGE;g.stroke();
  ink(K.e,p.x,p.y-4,30);ink(K.n,p.x,p.y+p.r+14,13,{col:A.col.tx});if(seen)ink(K.ok?'✓ fine':'⚠ allergic',p.x,p.y+p.r+34,12,{col:A.col.tx,fit:A.W*.3})});
 const tray=R(A.W*.3,A.H*.5,A.W*.4,A.H*.08);pill(tray,'');ink(FOOD.e+' '+FOOD.n+' for lunch',A.W/2,tray.y+tray.h/2,12,{fit:tray.w-8});
 note(s.msg,.6,s.msgTone);const q=s.glass||glassHome();g.fillStyle='#ffffff';g.beginPath();g.arc(q.x,q.y,28,0,7);g.fill();g.lineWidth=3;g.strokeStyle=SEL;g.stroke();ink('🔍',q.x,q.y,22);
 if(!s.glass)ink('drag me',q.x+56,q.y,11,{col:A.col.tx});title(s.seen.length>=3?'Same food, different bodies':'Look at each friend',s.seen.length>=3)}
function look(i){const s=st.b,K=KIDS[i];s.glass=null;s.hover=-1;if(!s.seen.includes(K.k))s.seen.push(K.k);s.msg=K.says;s.msgTone=K.ok?'pass':'warn';A.sound[K.ok?'pop':'tick']();tell(K.says)}
/* ---------- 2. lunch: Do or Don’t ---------- */
const binR=j=>R(A.W*(.04+j*.48),A.H*.1,A.W*.44,A.H*.33);
const cardR=i=>R(A.W*(.04+(i%2)*.48),A.H*(.47+Math.floor(i/2)*.15),A.W*.44,A.H*.12);
function drawLunch(){const s=st.l;wash('#a5f3fc',.4);
 ['✓ Do','✗ Don’t'].forEach((h,j)=>{const r=binR(j);pill(r,s.over===j?'sel':s.badBin===j?'fail':'');ink(h,r.x+r.w/2,r.y+18,15);
  CARDS.forEach((C,i)=>{if(s.put[i]===j){const k=Object.keys(s.put).filter(x=>s.put[x]===j).indexOf(String(i)),h=(r.h-40)/3,q=R(r.x+6,r.y+34+k*h,r.w-12,h-4);pill(q,'pass');para('✓ '+C.t,q,10)}})});
 CARDS.forEach((C,i)=>{if(s.put[i]!=null)return;const r0=cardR(i),d=s.drag&&s.drag.i===i,r=d?R(s.drag.x-r0.w/2,s.drag.y-r0.h/2,r0.w,r0.h):r0;pill(r,d||s.sel===i?'sel':'');para(C.t,r,12)});
 title(Object.keys(s.put).length>=CARDS.length?'Lunch is just for me':'Do or Don’t?',Object.keys(s.put).length>=CARDS.length)}
function place(i,j){const s=st.l,C=CARDS[i];s.drag=null;s.over=-1;s.sel=null;const want=C.ok?0:1;
 if(j!==want){s.badBin=j;A.sound.miss();return tell(C.ok?`“${C.t}” is safe. It goes in Do.`:slip(C.slip))}
 s.put[i]=j;s.badBin=-1;A.sound.pop();tell(`✓ ${C.t}: ${j?'Don’t':'Do'}. ${Object.keys(s.put).length} of ${CARDS.length}.`)}
/* ---------- 3. crumbs on hands ---------- */
const handR=()=>R(A.W*.14,A.H*.12,A.W*.72,A.H*.4);
const toolR=i=>{const w=(A.W-40)/3;return R(10+i*(w+10),A.H*.79,w,A.H*.17)};
const dots=()=>{const h=handR(),out=[];for(let i=0;i<BITS;i++){const a=i*2.399,rr=.18+.3*((i*7)%BITS)/BITS;out.push({x:h.x+h.w*(.5+rr*Math.cos(a)),y:h.y+h.h*(.52+rr*Math.sin(a)*.9)})}return out};
function drawCrumbs(){const s=st.c,g=A.ctx,h=handR();wash('#bbf7d0',.4);pill(h,s.left===0?'pass':s.over?'sel':'');ink('🤲',h.x+h.w/2,h.y+h.h*.52,Math.max(60,h.h*.5));
 dots().slice(0,s.left).forEach(d=>{g.fillStyle='#92400e';g.beginPath();g.arc(d.x,d.y,5,0,7);g.fill();g.lineWidth=1.5;g.strokeStyle='#fef3c7';g.stroke()});
 if(s.tool==='gel'&&s.rubbed)ink('✨ shiny, but the bits are still there',A.W/2,h.y+h.h-14,11,{fit:h.w-10});
 ink(`peanut bits left: ${s.left}`+(s.legs?`  ·  on trousers: ${s.legs}`:''),A.W/2,A.H*.56,12,{col:A.col.tx,fit:A.W-20});
 note(s.msg,.6,s.msgTone);TOOLS.forEach((T,i)=>{const r=toolR(i);pill(r,s.tool===T.k?(T.works?'pass':'fail'):'');ink(T.e,r.x+r.w/2,r.y+r.h*.27,20);para((s.tool===T.k&&!T.works?'✗ ':'')+T.n,R(r.x,r.y+r.h*.5,r.w,r.h*.5),11)});
 title(s.left===0?'Every bit gone!':s.tool?'Rub your hands':'Choose how to clean',s.left===0)}
function pickTool(k){const s=st.c;s.tool=k;s.rubbed=0;s.msg='';A.sound.tick();tell(`${TOOLS.find(t=>t.k===k).n}. Now rub your hands.`)}
function rub(n){const s=st.c;if(!s.tool){A.sound.miss();return tell('Choose soap and water, hand gel or trousers first.')}if(s.left===0)return;s.rubbed=1;
 if(s.tool==='soap'){s.left=Math.max(0,s.left-n);if(s.left===0){A.sound.pop();s.msg='Soap and water washed off every bit.';s.msgTone='pass'}return tell(s.left?`Scrub, scrub: ${s.left} bits left.`:s.msg)}
 const T=TOOLS.find(t=>t.k===s.tool);if(s.tool==='legs'&&s.legs<3){s.left--;s.legs++}s.msg=slip(T.slip);s.msgTone='fail';A.sound.miss();tell(s.msg)}
/* ---------- 4. when a friend says no ---------- */
/* the kind reply sits in a different place each round */
const ORD=[[1,0,2],[2,1,0],[0,2,1]];
const replyR=i=>R(A.W*.05,A.H*(.44+i*.15),A.W*.9,A.H*.12);
function drawReply(){const s=st.r,T=TALK[Math.min(s.round,TALK.length-1)];wash('#fbcfe8',.4);const b=R(A.W*.05,A.H*.11,A.W*.9,A.H*.26);
 pill(b,s.round>=TALK.length?'pass':'sel');ink(T.who,b.x+b.w/2,b.y+b.h*.24,16);para(s.round>=TALK.length?'😊 Thanks for listening!':`“${T.line}”`,R(b.x,b.y+b.h*.4,b.w,b.h*.56),13);
 if(s.round<TALK.length)ORD[s.round].forEach((d,i)=>{const r=replyR(i),[t]=T.r[d];pill(r,s.bad===d?'fail':'');para((s.bad===d?'✗ ':'')+t,r,13)});
 ink(`kind replies: ${Math.min(s.round,TALK.length)} of ${TALK.length}`,A.W/2,A.H*.93,12,{col:A.col.tx});title(s.round>=TALK.length?'We stop asking':'A friend says no',s.round>=TALK.length)}
function reply(i){const s=st.r,T=TALK[s.round];if(!T)return;const [t,k]=T.r[i];if(k!=='ok'){s.bad=i;A.sound.miss();return tell(slip(k))}
 s.bad=-1;s.round++;A.sound.pop();tell(`✓ “${t}” ${T.who.split(' ')[1]} smiles.`+(s.round<TALK.length?` Next: ${TALK[s.round].who.split(' ')[1]} says “${TALK[s.round].line}”`:''))}
/* ---------- 5. spot the signs, get help ---------- */
const signR=i=>R(A.W*(.04+(i%2)*.48),A.H*(.27+Math.floor(i/2)*.155),A.W*.44,A.H*.13);
const actR=i=>{const w=(A.W-40)/3;return R(10+i*(w+10),A.H*.8,w,A.H*.15)};
const found=()=>st.h.got.length>=SIGNS.filter(x=>x.sign).length;
function drawHelp(){const s=st.h;wash('#ddd6fe',.4);const top=R(A.W*.2,A.H*.1,A.W*.6,A.H*.14);pill(top,'warn');ink('👦 Sam, after lunch',A.W/2,top.y+top.h*.34,14,{fit:top.w-10});ink('Which ones mean: get help?',A.W/2,top.y+top.h*.72,11,{fit:top.w-10,wt:700});
 SIGNS.forEach((S,i)=>{const r=signR(i),got=s.got.includes(S.k),bad=s.bad===S.k;pill(r,got?'pass':bad?'fail':'');ink(S.e,r.x+22,r.y+r.h/2,20);
  para((got?'✓ ':bad?'✗ ':'')+S.t,R(r.x+36,r.y,r.w-36,r.h),11)});
 if(found())ACT.forEach((X,i)=>{const r=actR(i);pill(r,s.act===X.k?(X.ok?'pass':'fail'):'');ink(X.e,r.x+r.w/2,r.y+r.h*.28,18);para((s.act===X.k&&!X.ok?'✗ ':'')+X.t,R(r.x,r.y+r.h*.45,r.w,r.h*.55),11)});
 else ink(`signs found: ${s.got.length} of 4`,A.W/2,A.H*.86,13,{col:A.col.tx});
 title(s.act==='tell'?'Help is coming':found()?'What do you do?':'Tap the signs',s.act==='tell')}
function spot(k){const s=st.h,S=SIGNS.find(x=>x.k===k);if(s.got.includes(k))return;if(!S.sign){s.bad=k;A.sound.miss();return tell(`${S.t} is not a sign of an allergy. Look for skin, lips, breathing and tummy.`)}
 s.got.push(k);s.bad='';A.sound.pop();tell(`✓ ${S.t}: a sign to get help.`+(found()?' Now: what do you do?':` ${s.got.length} of 4.`))}
function act(k){const s=st.h,X=ACT.find(a=>a.k===k);if(!found())return tell('Find all 4 signs first.');s.act=k;if(!X.ok){A.sound.miss();return tell(slip(X.slip))}A.sound.pop();tell('You tell a grown-up straight away. The grown-up knows what to do and can get Sam’s medicine or call for help.')}
/* ---------- input ---------- */
function draw(){const k=phase();if(k==='quiz'){wash('#fde68a',.35);title('Challenge',1);ink('Bodies · Lunch · Soap · Kind · Tell',A.W/2,A.H*.5,15,{col:A.col.tx,fit:A.W-20});return}
 ({bodies:drawBodies,lunch:drawLunch,crumbs:drawCrumbs,reply:drawReply,help:drawHelp})[k]();A.fx.draw(A.ctx)}
function down(p){const k=phase();
 if(k==='bodies'){const q=st.b.glass||glassHome();if(near(p,q,40)){st.b.glass={x:p.x,y:p.y};return true}const i=KIDS.findIndex((_,j)=>{const t=kidAt(j);return near(p,t,t.r)});if(i>=0)look(i);return false}
 if(k==='lunch'){const i=CARDS.findIndex((_,j)=>st.l.put[j]==null&&within(p,cardR(j)));if(i>=0){st.l.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const j=[0,1].find(b=>within(p,binR(b)));if(j!=null&&st.l.sel!=null)place(st.l.sel,j);return false}
 if(k==='crumbs'){const t=TOOLS.findIndex((_,i)=>within(p,toolR(i)));if(t>=0){pickTool(TOOLS[t].k);return false}if(within(p,handR())){st.c.rub={x:p.x,y:p.y,d:0};return true}return false}
 if(k==='reply'){const i=[0,1,2].find(j=>within(p,replyR(j)));if(i!=null&&TALK[st.r.round])reply(ORD[st.r.round][i]);return false}
 if(k==='help'){const i=SIGNS.findIndex((_,j)=>within(p,signR(j)));if(i>=0){spot(SIGNS[i].k);return false}if(found()){const a=ACT.findIndex((_,j)=>within(p,actR(j)));if(a>=0)act(ACT[a].k)}return false}
 return false}
function move(p){const k=phase();
 if(k==='bodies'&&st.b.glass){st.b.glass={x:p.x,y:p.y};st.b.hover=KIDS.findIndex((_,j)=>{const t=kidAt(j);return near(p,t,t.r)});A.redraw()}
 if(k==='lunch'&&st.l.drag){Object.assign(st.l.drag,{x:p.x,y:p.y});const j=[0,1].find(b=>within(p,binR(b)));st.l.over=j==null?-1:j;A.redraw()}
 if(k==='crumbs'&&st.c.rub){const r=st.c.rub;r.d+=Math.hypot(p.x-r.x,p.y-r.y);r.x=p.x;r.y=p.y;st.c.over=1;if(r.d>36){r.d=0;rub(1)}else A.redraw()}}
function up(p){const k=phase();
 if(k==='bodies'&&st.b.glass){const i=KIDS.findIndex((_,j)=>{const t=kidAt(j);return near(p,t,t.r+8)});if(i>=0)return look(i);st.b.glass=null;st.b.hover=-1;return tell('Drop the looking glass on a friend.')}
 if(k==='lunch'&&st.l.drag){const d=st.l.drag,j=[0,1].find(b=>within(p,binR(b)));if(j!=null)return place(d.i,j);st.l.drag=null;st.l.over=-1;
  if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){st.l.sel=d.i;return tell(`“${CARDS[d.i].t}” picked. Now tap Do or Don’t.`)}A.redraw()}
 if(k==='crumbs'&&st.c.rub){st.c.rub=null;st.c.over=0;A.redraw()}}
function reset(){tick++;for(const k in st)delete st[k];Object.assign(st,{b:{seen:[],glass:null,hover:-1,msg:'',msgTone:''},l:{put:{},drag:null,sel:null,over:-1,badBin:-1},
 c:{tool:'',left:BITS,legs:0,rub:null,rubbed:0,over:0,msg:'',msgTone:''},r:{round:0,bad:-1},h:{got:[],bad:'',act:''},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();st.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();tell(DESC[i]);if(ok)st.check=finish(i,ok)}
function demo(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
/* every canvas action has a labelled button twin */
function twins(){if(!row)return;row.innerHTML='';const k=phase(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='bodies')KIDS.forEach((K,i)=>btn(`🔍 ${K.n}`,()=>look(i),`Look at ${K.n}`));
 if(k==='lunch'){if(st.l.sel==null)CARDS.forEach((C,i)=>{if(st.l.put[i]==null)btn(C.t,()=>{st.l.sel=i;tell(`“${C.t}” picked. Now choose Do or Don’t.`)},`Pick ${C.t}`)});
  else{btn('✓ Do',()=>place(st.l.sel,0),'Put it in Do');btn('✗ Don’t',()=>place(st.l.sel,1),'Put it in Don’t')}}
 if(k==='crumbs'){TOOLS.forEach(T=>btn(`${T.e} ${T.n}`,()=>pickTool(T.k)));btn('👐 Rub hands',()=>rub(4))}
 if(k==='reply'&&TALK[st.r.round])ORD[st.r.round].forEach(d=>btn(TALK[st.r.round].r[d][0],()=>reply(d)));
 if(k==='help'){if(!found())SIGNS.forEach(S=>{if(!st.h.got.includes(S.k))btn(`${S.e} ${S.t}`,()=>spot(S.k))});else if(st.h.act!=='tell')ACT.forEach(X=>btn(`${X.e} ${X.t}`,()=>act(X.k)))}}
const steps=[
{h:'Same food, different bodies',p:'Ava, Sam and Leo have peanuts for lunch. Drag the looking glass to each friend to see what peanuts do in their body.',
 predict:{q:'Peanuts are fine for you. Are they fine for everyone?',opts:['Yes, for everyone','No, not for everyone'],ans:1},task:'Look at all 3 friends',
 show:()=>demo(0,KIDS.map((_,i)=>()=>look(i)),520),go:()=>enter(0,()=>st.b.seen.length>=3)},
{h:'My lunch is for me',p:'Drag each card to Do or Don’t. Some friends get ill from foods, and we can’t always tell who.',
 predict:{q:'Mia has no allergy badge. Can you share your food?',opts:['Yes, no badge means safe','No, we still don’t share'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(1,CARDS.map((C,i)=>()=>place(i,C.ok?0:1)),380),go:()=>enter(1,()=>Object.keys(st.l.put).length>=CARDS.length)},
{h:'Tiny bits count',p:'You ate a peanut bar. Tiny bits are on your hands. Choose how to clean them, then rub your hands.',
 predict:{q:'Hand gel kills germs. Does it take off food bits?',opts:['Yes, gel cleans everything','No, use soap and water'],ans:1},task:'Get every bit off',
 show:()=>demo(2,[()=>pickTool('soap'),()=>rub(5),()=>rub(5),()=>rub(5)],480),go:()=>enter(2,()=>st.c.left===0&&st.c.tool==='soap')},
{h:'When a friend says no',p:'A friend says no to food. Tap the kind reply. When someone says no, we stop asking.',task:'Reply kindly to 3 friends',
 show:()=>demo(3,TALK.map(()=>()=>reply(0)),520),go:()=>enter(3,()=>st.r.round>=TALK.length)},
{h:'Get a grown-up',p:'Sam feels ill after lunch. Tap every sign that means get help. Then choose what to do.',
 predict:{q:'Sam feels a bit funny after lunch. What do you do?',opts:['Wait and see','Tell a grown-up straight away'],ans:1},task:'Spot 4 signs and get help',
 show:()=>demo(4,[...SIGNS.filter(x=>x.sign).map(x=>()=>spot(x.k)),()=>act('tell')],420),go:()=>enter(4,()=>st.h.act==='tell')},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
/* the feedback names the slip, so the child knows what to change */
function slip(t){let m='Eat your own lunch, wash with soap, stop when a friend says no, and tell a grown-up.';
 if(t==='same')m='Every body is different. Peanuts are fine for some people and make others very ill.';
 if(t==='share')m='We don’t share or swap food. A food that is fine for you could make a friend very ill.';
 if(t==='badge')m='No badge does not mean safe. Some allergies are not on a badge, so we never share lunch.';
 if(t==='gel')m='Gel kills germs, but the peanut bits stay on. Use soap and water.';
 if(t==='legs')m='Now the bits are on your trousers, and they can get back on your hands. Use soap and water.';
 if(t==='press')m='Even a tiny bit can make someone very ill. When a friend says no, we stop asking.';
 if(t==='pick')m='Picking nuts out leaves tiny bits behind. It is still not safe for Sam.';
 if(t==='hidden')m='Cheese is made from milk! Milk hides in lots of foods. Say OK and stop asking.';
 if(t==='secret')m='Never keep it quiet. Food rules keep friends safe, and if a friend feels ill, tell a grown-up.';
 if(t==='fussy')m='An allergy is not being fussy. The food can make their body very ill.';
 if(t==='wait')m='Don’t wait. Signs can get worse fast. Tell a grown-up straight away.';
 return m}
function nextQ(){qno++;const Q=QS[qno%QS.length],opts=[[Q.a,'ok'],...Q.o],rot=(qno+1)%3,list=opts.slice(rot).concat(opts.slice(0,rot));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),right=t==='ok';if(right)A.win();else A.sound.miss();
 fb.innerHTML=(right?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(right?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.32,draw,onStep:X=>{ask.hidden=X.step!==5;row.hidden=X.step===5;twins()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Allergy lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});twins()}}).start()})})();
