/* Flagship: Fair testing (ages 7–9; NC KS2 Years 3–4 working scientifically: set up simple practical enquiries, comparative
   and fair tests; make careful observations and, where appropriate, accurate measurements with standard units; record
   findings in tables; use results to draw simple conclusions). Paper parachutes: sort the variables into change / measure /
   keep the same; see why a test with two changes cannot answer the question; drop three canopy sizes into a results
   table and pick the pattern; repeat a drop and spot the odd reading; plan the bean-and-soil test.
   Builds on flagsimtest (KS1 simple tests). Not flagdrop (gravity), flagramp (slopes) or flagsciq (kinds of question). */
(()=>{
VIS.reg('flagfairvar',c=>{let A,pad,quizBox,item=-1,run=0;const S={};
const now=()=>['sort','one','table','repeat','beans','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
/* wrap text onto lines that fit the canvas width */
function lines(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||600} ${px}px system-ui,sans-serif`;const L=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(g.measureText(t).width>mw&&cur){L.push(cur);cur=w}else cur=t}L.push(cur);
 L.forEach((l,i)=>txt(l,x,y+(i-(L.length-1)/2)*px*1.25,px,{...o,max:mw}))}
const sz=()=>A.narrow?14:17,inBox=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* fall time for a paper parachute (terminal speed ~ sqrt(load / area)): 10, 15, 20 cm canopies take 1.2, 1.8, 2.4 s from 2 m */
const fallTime=k=>Math.round(12*(k.d/10)*(k.h/2)/Math.sqrt(k.m))/10;
/* --- step 1: sort the variables --- */
const VARS=[['Size of the parachute',0],['Time it takes to fall',1],['Height you drop it from',2],['Mass of the load',2],['Kind of paper',2]];
const COLS=['Change','Measure','Keep the same'];
const colBox=i=>({x:A.W*(.02+i*.33),y:A.H*.42,w:A.W*.3,h:A.H*.5});
const cardBox=()=>({x:A.W*.18,y:A.H*.13,w:A.W*.64,h:A.H*.13});
function drawSort(){const g=A.ctx,C=A.col;txt('Does a bigger parachute fall more slowly?',A.W/2,A.H*.05,sz(),{b:800});
 COLS.forEach((n,i)=>{const r=colBox(i);g.fillStyle=A.alpha([C.ac,C.or,C.gr][i],.13);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.ln;g.stroke();txt(n,r.x+r.w/2,r.y+16,A.narrow?13:16,{b:800});
  VARS.forEach((v,j)=>{const k=S.put.filter(z=>z[1]===i).findIndex(z=>z[0]===j);if(k>=0)lines(v[0],r.x+r.w/2,r.y+42+k*A.H*.11,A.narrow?11:13,{max:r.w-8,b:600})})});
 const j=S.put.length;if(j<VARS.length){const r=cardBox(),dx=S.drag?S.drag.x-S.drag.x0:0,dy=S.drag?S.drag.y-S.drag.y0:0;g.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.25:.7);A.paint.rrect(r.x+dx,r.y+dy,r.w,r.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  lines(VARS[j][0],r.x+r.w/2+dx,r.y+r.h/2+dy,sz(),{b:800,ink:C.dark?'#f8fafc':'#111827',max:r.w-10})}
 lines(S.msg||'Drag the card into a box',A.W/2,A.H*.34,A.narrow?13:15,{ink:C.mu})}
/* --- parachutes and the drop --- */
function chute(x,y,k,lab){const g=A.ctx,C=A.col,w=A.W*.013*k.d;g.fillStyle=k.d>15?'#f97316':k.d>10?'#14b8a6':'#a855f7';g.beginPath();g.arc(x,y,w/2,Math.PI,0);g.fill();
 g.strokeStyle=C.tx;g.lineWidth=1;g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x,y+w*.6);g.lineTo(x+w/2,y);g.stroke();for(let i=0;i<k.m;i++){g.fillStyle='#64748b';g.fillRect(x-6,y+w*.6+i*7,12,6)}
 if(lab)txt(lab,x,y-w/2-10,A.narrow?12:14,{b:800})}
const fallY=(k,f)=>{const top=A.H*(k.h>2?.14:.3),bot=A.H*.74-A.W*.0078*k.d-7*k.m;return top+(bot-top)*f};
function stage(xs,ks,labs){const g=A.ctx,C=A.col;g.fillStyle=A.alpha(C.gr,.25);g.fillRect(0,A.H*.74,A.W,A.H*.26);
 ks.forEach((k,i)=>{chute(xs[i],fallY(k,S.f[i]||0),k,labs[i]);if(S.t[i]!=null)txt(`⏱ ${S.t[i].toFixed(1)} s`,xs[i],A.H*.81,sz(),{b:900})})}
function setLab(k){return`${k.d} cm, ${k.h} m, ${k.m} clip${k.m>1?'s':''}`}
function drawOne(){const xs=[A.W*.27,A.W*.73];stage(xs,[S.a,S.b],['A','B']);[S.a,S.b].forEach((k,i)=>{const diff=['d','h','m'].filter(q=>S.a[q]!==S.b[q]);
 txt(setLab(k),xs[i],A.H*.06,A.narrow?12:14,{b:700,ink:i&&diff.length>1?A.col.rd:A.col.tx})});lines(S.msg||'Set up B, then drop both',A.W/2,A.H*.94,A.narrow?12:14,{ink:A.col.mu})}
const SIZES=[10,15,20];
function table(y){const C=A.col;SIZES.forEach((d,i)=>{const yy=A.H*y+i*A.H*.065;txt(`${d} cm canopy`,A.W*.42,yy,A.narrow?12:14,{al:'right'});const v=S.rec[i];
 A.ctx.fillStyle=A.alpha(C.ac,.5);if(v)A.ctx.fillRect(A.W*.45,yy-A.H*.02,A.W*.18*v,A.H*.04);txt(v?v.toFixed(1)+' s':'?',A.W*.92,yy,A.narrow?13:15,{b:900})})}
function drawTable(){stage([A.W*.2,A.W*.5,A.W*.8],SIZES.map(d=>({d,h:2,m:1})),['10 cm','15 cm','20 cm']);table(.04);if(S.pat!=null)txt(S.pat===0?'✓ Bigger canopy, longer fall':'✗ Check the table',A.W/2,A.H*.95,sz(),{b:900})}
const REP=[2.4,2.5,3.6],repBox=i=>({x:A.W*(.08+i*.3),y:A.H*.6,w:A.W*.24,h:A.H*.16});
function drawRepeat(){const g=A.ctx,C=A.col;chute(A.W/2,A.H*(.12+.3*(S.f[0]||0)),{d:20,h:2,m:1},'20 cm, 2 m, 1 clip');
 REP.forEach((v,i)=>{const r=repBox(i);g.fillStyle=i<S.n?A.alpha(S.odd===i?C.rd:C.ac,.15):A.alpha(C.tx,.04);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=S.odd===i?C.rd:C.ln;g.lineWidth=S.odd===i?3:1;g.stroke();
  txt(`Drop ${i+1}`,r.x+r.w/2,r.y+r.h*.28,A.narrow?12:14);txt(i<S.n?v.toFixed(1)+' s':'…',r.x+r.w/2,r.y+r.h*.68,A.narrow?18:22,{b:900})});
 lines(S.msg||'Drop it 3 times',A.W/2,A.H*.88,A.narrow?13:15,{ink:C.mu})}
/* --- bean plan: three soils; water and place can be tapped until they match --- */
const SOILS=['Compost','Sand','Clay'],WAT=[50,100,150],potBox=i=>({x:A.W*(.05+i*.32),y:A.H*.3,w:A.W*.26,h:A.H*.34});
function drawBeans(){const g=A.ctx,C=A.col;txt('Which soil is best for growing beans?',A.W/2,A.H*.05,sz(),{b:800});
 SOILS.forEach((s,i)=>{const r=potBox(i),dark=!S.sun[i];g.fillStyle=dark?A.alpha('#1e293b',.35):A.alpha('#facc15',.22);A.paint.rrect(r.x,r.y-A.H*.12,r.w,r.h+A.H*.12,10);g.fill();
  txt(dark?'🌑 cupboard':'☀️ window',r.x+r.w/2,r.y-A.H*.07,A.narrow?12:14,{b:700});g.fillStyle=['#78350f','#d6b16b','#9a3412'][i];g.fillRect(r.x+r.w*.15,r.y+r.h*.35,r.w*.7,r.h*.45);g.strokeStyle=C.tx;g.strokeRect(r.x+r.w*.15,r.y+r.h*.35,r.w*.7,r.h*.45);
  txt(s,r.x+r.w/2,r.y+r.h*.58,A.narrow?12:14,{b:800,ink:'#fff'});txt(`💧 ${WAT[S.w[i]]} ml`,r.x+r.w/2,r.y+r.h*.15,A.narrow?13:15,{b:800,ink:S.w.every(x=>x===S.w[0])?C.tx:C.rd})});
 txt(S.meas?'Measure: '+S.meas:'Measure: ?',A.W/2,A.H*.74,sz(),{b:800});lines(S.msg||'Make it fair, then choose what to measure',A.W/2,A.H*.88,A.narrow?13:15,{ink:C.mu})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#e0f2fe',C.dark?.05:.4);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({sort:drawSort,one:drawOne,table:drawTable,repeat:drawRepeat,beans:drawBeans}[now()]||(()=>lines(S.q||'Change one thing. Measure one thing. Keep the rest the same.',Q.W/2,Q.H*.45,Q.narrow?18:22,{b:800})))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{put:[],drag:null,a:{d:10,h:2,m:1},b:{d:20,h:3,m:1},f:[],t:[],rec:[null,null,null],pat:null,n:0,odd:null,sun:[1,1,0],w:[1,2,0],meas:'',fair:false,msg:'',q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?30*(j+1):650*(j+1)))}
function say(m){S.msg=m;tell(m);A.redraw();keys();S.ok()}
function sortTo(col){const j=S.put.length;if(j>=VARS.length)return;const [name,want]=VARS[j];
 if(col===want){S.put.push([j,col]);A.sound.pop();return say(S.put.length===VARS.length?'One thing changes, one is measured, three stay the same.':`${name}: ${COLS[col].toLowerCase()}. Next card.`)}
 A.sound.miss();say(want===1?'You cannot choose the fall time. It is what you find out, so you measure it.':want===0?'The size is what the question is about, so it is the one thing you change.':
  col===0?`If the ${name.toLowerCase()} changes too, you cannot tell which change made the difference.`:`You do not need to measure that. Keep it the same so the test is fair.`)}
function setB(q){const nx={d:{10:20,20:10},h:{2:3,3:2},m:{1:2,2:1}};S.b[q]=nx[q][S.b[q]];S.t=[];S.f=[];A.sound.tick();say('B is now '+setLab(S.b)+'.')}
function dropBoth(){const ks=[S.a,S.b],diff=['d','h','m'].filter(q=>S.a[q]!==S.b[q]),t=run;S.t=[];S.f=[0,0];A.sound.whoosh();
 A.tween(S.f,{0:1,1:1},A.reduced()?1:900,'io',()=>{if(t!==run)return;S.t=ks.map(fallTime);S.fair=diff.length===1&&diff[0]==='d';
  say(S.fair?`Only the size changed. A took ${S.t[0]} s, B took ${S.t[1]} s, so the bigger parachute fell more slowly.`:diff.length>1?`${diff.length} things are different. B was ${S.t[1]>S.t[0]?'slower':'faster'}, but you cannot tell which change did it.`:'Change the size, not something else. The question is about size.')})}
function dropSize(i){if(S.rec[i])return;const t=run;S.f[i]=0;A.sound.whoosh();A.tween(S.f,{[i]:1},A.reduced()?1:700,'io',()=>{if(t!==run)return;S.rec[i]=S.t[i]=fallTime({d:SIZES[i],h:2,m:1});say(`${SIZES[i]} cm: ${S.rec[i].toFixed(1)} s. Put it in the table.`)})}
function pattern(k){if(S.rec.some(v=>!v))return say('Drop all three first, so the table is full.');S.pat=k;k===0?A.sound.pop():A.sound.miss();
 say(k===0?'Yes: 1.2 s, 1.8 s, 2.4 s. The bigger the canopy, the longer it takes to fall.':k===1?'The bigger ones took longer, so they fell more slowly, not faster.':'The times are different, so size does make a difference.')}
function dropAgain(){if(S.n>=3)return;const t=run;S.f=[0];A.sound.whoosh();A.tween(S.f,{0:1},A.reduced()?1:500,'io',()=>{if(t!==run)return;S.n++;say(S.n===3?'3.6 s! A door opened and air blew in. Tap the result that does not fit.':`Drop ${S.n}: ${REP[S.n-1].toFixed(1)} s.`)})}
function pickOdd(i){if(S.n<3)return say('Do all 3 drops first.');S.odd=i;i===2?A.sound.pop():A.sound.miss();
 say(i===2?'3.6 s is far from 2.4 and 2.5. Do that drop again. The usual time is about 2.5 s.':`${REP[i].toFixed(1)} s is close to the others. Find the one that is far away.`)}
function water(i){S.w[i]=(S.w[i]+1)%3;A.sound.tick();say(S.w.every(x=>x===S.w[0])?'Every pot gets the same water now.':'The water is not the same yet.')}
function light(i){S.sun[i]=S.sun[i]?0:1;A.sound.tick();say(S.sun.every(Boolean)?'All three pots are by the window.':'One pot is in the dark. That is a second change.')}
function sameSoil(){A.sound.miss();say('The soil is what you are testing, so it must be different. Keep everything else the same.')}
function measure(m){if(m!=='height of each plant after 2 weeks'){A.sound.miss();return say('That is not something you can measure with a ruler. Pick a number you can record.')}S.meas=m;A.sound.pop();say('Measure every plant the same way, on the same day.')}
const bReady=()=>S.w.every(x=>x===S.w[0])&&S.sun.every(Boolean)&&S.meas;
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='sort'&&S.put.length<VARS.length)COLS.forEach((n,i)=>b(n,()=>sortTo(i),`${VARS[S.put.length][0]}: ${n}`));
 if(k==='one'&&!S.fair){b(`B size: ${S.b.d} cm`,()=>setB('d'));b(`B height: ${S.b.h} m`,()=>setB('h'));b(`B load: ${S.b.m} clip${S.b.m>1?'s':''}`,()=>setB('m'));b('Drop both',dropBoth)}
 if(k==='table'){SIZES.forEach((d,i)=>{if(!S.rec[i])b(`Drop ${d} cm`,()=>dropSize(i))});if(S.pat!==0){b('Bigger = slower fall',()=>pattern(0));b('Bigger = faster fall',()=>pattern(1));b('Size makes no difference',()=>pattern(2))}}
 if(k==='repeat'){if(S.n<3)b('Drop again',dropAgain);else if(S.odd!==2)REP.forEach((v,i)=>b(`Odd one: ${v.toFixed(1)} s`,()=>pickOdd(i)))}
 if(k==='beans'&&!S.done){SOILS.forEach((s,i)=>b(`${s}: water`,()=>water(i),`Change water for ${s}`));b('Move clay pot',()=>light(2),'Move the clay pot');b('Use the same soil',sameSoil);
  if(!S.meas){b('Measure height after 2 weeks',()=>measure('height of each plant after 2 weeks'));b('Measure which looks nicest',()=>measure('nicest'))}}}
function down(p){const k=now();
 if(k==='sort'){if(S.put.length<VARS.length&&inBox(p,cardBox())){S.drag={x0:p.x,y0:p.y,x:p.x,y:p.y};return true}const i=[0,1,2].find(j=>inBox(p,colBox(j)));if(i!=null&&S.put.length<VARS.length){sortTo(i);return true}return false}
 if(k==='one'){if(p.y<A.H*.12){p.x>A.W/2&&setB(p.x>A.W*.86?'m':p.x>A.W*.7?'h':'d');return true}return false}
 if(k==='table'){const i=[0,1,2].find(j=>Math.abs(p.x-A.W*(.2+j*.3))<A.W*.13&&p.y>A.H*.25);if(i!=null){dropSize(i);return true}return false}
 if(k==='repeat'){const i=[0,1,2].find(j=>inBox(p,repBox(j)));if(i!=null){pickOdd(i);return true}if(p.y<A.H*.5){dropAgain();return true}return false}
 if(k==='beans'){const i=[0,1,2].find(j=>inBox(p,potBox(j)));if(i==null)return false;p.y<potBox(i).y?light(i):water(i);return true}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const i=[0,1,2].find(j=>inBox(p,colBox(j)));if(i!=null)sortTo(i);else A.redraw()}
const steps=[
{h:'Change, measure, keep the same',p:'Question: does a bigger parachute fall more slowly? In a fair test you change one variable, measure one, and keep all the others the same.',
 predict:{q:'In this test, what do you measure?',opts:['The size of the parachute','The time it takes to fall','The height you drop it from'],ans:1},
 task:'Sort all 5 cards',show:()=>auto(0,[()=>sortTo(0),()=>sortTo(1),()=>sortTo(2),()=>sortTo(2),()=>sortTo(2)]),
 go:()=>{fresh();tell('A card: size of the parachute. Three boxes: change, measure, keep the same.');keys();S.ok=finishIf(0,()=>S.put.length===5,'Change the size, measure the time, keep the height, load and paper the same.')}},
{h:'One change at a time',p:'Parachute B is set up differently from A. Drop them and see what you can say. Then fix B so only one thing is different.',
 predict:{q:'A is small and dropped from 2 m. B is big and dropped from 3 m. B takes longer. Can you say big parachutes fall more slowly?',opts:['Yes','No, the height changed too','Yes, if you time it carefully'],ans:1},
 task:'Make only the size different, then drop both',show:()=>auto(1,[dropBoth,()=>setB('h'),dropBoth]),
 go:()=>{fresh();tell('A: 10 cm, 2 m, 1 clip. B: 20 cm, 3 m, 1 clip.');keys();S.ok=finishIf(1,()=>S.fair,'Only the size was different, so the test can answer the question.')}},
{h:'Measure and record',p:'Drop three sizes from the same height with the same load. Time each fall in seconds and record it in the table. Then look for a pattern.',
 predict:{q:'Which parachute will take the longest to fall?',opts:['10 cm, it is lighter','15 cm','20 cm'],ans:2},
 task:'Drop all 3, then pick the pattern',show:()=>auto(2,[()=>dropSize(0),()=>dropSize(1),()=>dropSize(2),()=>{},()=>pattern(0)]),
 go:()=>{fresh();tell('Three parachutes: 10, 15 and 20 centimetres. An empty results table.');keys();S.ok=finishIf(2,()=>S.pat===0,'The table shows the pattern: bigger canopy, slower fall.')}},
{h:'Repeat and check',p:'One reading can go wrong. Scientists repeat a test to check it. Drop the big parachute 3 times.',
 predict:{q:'Your first drop took 2.4 s. Is one drop enough to trust?',opts:['Yes, one is enough','No, repeat it to check','Use a different parachute'],ans:1},
 task:'Drop 3 times, then tap the odd result',show:()=>auto(3,[dropAgain,dropAgain,dropAgain,()=>pickOdd(2)]),
 go:()=>{fresh();tell('The 20 centimetre parachute, ready to drop 3 times.');keys();S.ok=finishIf(3,()=>S.odd===2,'Repeating found the odd result.')}},
{h:'Plan a fair test',p:'Which soil is best for growing beans? Only the soil should change. Make the water and the light the same, then choose what to measure.',
 task:'Make it fair and choose what to measure',show:()=>auto(4,[()=>water(0),()=>water(2),()=>water(2),()=>light(2),()=>measure('height of each plant after 2 weeks')]),
 go:()=>{fresh();tell('Three pots: compost, sand and clay. The water is different and the clay pot is in a cupboard.');keys();S.ok=finishIf(4,bReady,'Only the soil changes. You measure height. That is a fair test.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['Which ball bounces highest? What must you keep the same?','The height you drop each ball from',[['The kind of ball','tested'],['The bounce height','measured']]],
 ['Ella gives the sunny plant more water than the shady plant. Why is that unfair?','Two things change, so you cannot tell which helped',[['Plants need water','reason'],['It is fair, both got water','reason']]],
 ['You test which paper towel soaks up most. What do you measure?','How much water each towel soaks up',[['The kind of towel','tested'],['How big the bowl is','kept']]],
 ['Times: 3.1 s, 3.0 s, 5.2 s. What should you do?','Do the 5.2 s drop again',[['Use 5.2 s, it is the biggest','odd'],['Keep only the first one','odd']]],
 ['Car on a ramp: you change the surface. Which must stay the same?','The car and the ramp height',[['The surface','tested'],['How far it rolls','measured']]],
 ['A test changes the size AND the height. What can you say?','Nothing sure about size',[['Bigger is slower','reason'],['Height does not matter','reason']]]];
function why(tag){let m='Look at what changed and what was measured.';
 if(tag==='tested')m='That is the variable you change on purpose. Everything else stays the same.';
 if(tag==='measured')m='That is what you measure to find the answer, not something you keep the same.';
 if(tag==='kept')m='That stays the same. You measure the result of the change.';
 if(tag==='reason')m='When two things change, you cannot tell which one made the difference.';
 if(tag==='odd')m='A result far from the others is odd. Repeat that test, do not trust it.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Test controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
