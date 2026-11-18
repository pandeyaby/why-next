/* Flagship – bias in samples and surveys (ages 13–15; GCSE sampling limits; CCSS 7.SP.A.1, HSS-IC.B.3). Model town:
   40% teens (85% yes), 60% adults (30% yes), census 52%. Where you ask, how you ask, who replies, name it, fix a plan. */
(()=>{
const TEEN=.4,TY=.85,AY=.3,TRUTH=52;
/* share of teens among the people each place reaches */
const PLACES=[{n:'Skate shop',p:.95},{n:'Library, 11 am',p:.1},{n:'Random from town list',p:.4}];
const SLOTS=[["Don't you agree that",'Do you think'],['the town badly needs','the town should build'],['a fun, safe skate park?','a skate park?']];
const KINDS=[{n:'Who is asked',s:'sampling bias'},{n:'How it is asked',s:'leading question'},{n:'Who replies',s:'non-response'}];
const CASES=[['Asking people at a gym how much they exercise',0],["'Most people want a longer lunch. Do you?'",1],['Only 15% of the forms came back, mostly from retired people',2],
['Phoning landlines in the daytime only',0],["'Wouldn't you love a brand-new pool?'",1],['Busy parents ignored the survey; people with free time replied',2]];
const PLAN=[{n:'Who',o:['Skate shop','Random list']},{n:'Wording',o:['Leading','Neutral']},{n:'Replies',o:['No reminders','Chase non-replies']}];
function estimate(p,w,rt,ra){const t=Math.min(1,TY+w),a=Math.min(1,AY+w),den=p*rt+(1-p)*ra;return den?100*(p*rt*t+(1-p)*ra*a)/den:0}
VIS.reg('flagsurvey',c=>{let A,rack,box,qn=-1,ver=0;
const V={};
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',GREY='#64748b',GRAB='#1d4ed8',TEENC='#7c2d12',TEENF='#ffedd5',ADC='#1e3a8a',ADF='#dbeafe',BARF='#c7d2fe',BARE='#3730a3';
const k=n=>Math.round(n*(A.narrow?1:1.15)),F=(n,w)=>`${w||800} ${k(n)}px system-ui,sans-serif`,pct=x=>Math.round(x)+'%';
const phase=()=>['where','word','reply','kind','plan','quiz'][A.step],hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f1f5f9',A.col.dark?.05:.5);g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok){const g=A.ctx;let n=14;g.font=F(n);while(g.measureText(t).width+26>A.W-8&&n>10){n--;g.font=F(n)}const w=g.measureText(t).width+24,h=k(n)+14;
g.fillStyle='#ffffff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GOOD:GREY;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function slab(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.edge?3.5:1.8;g.strokeStyle=o.edge||GREY;g.stroke();if(t==null)return;
g.fillStyle=o.ink||INK;g.font=F(o.n||14,o.wt);g.textAlign='center';g.textBaseline='middle';const lines=wrap(t,r.w-12);const lh=k(o.n||14)+4;lines.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(lines.length-1)/2)*lh))}
function wrap(t,max){const g=A.ctx,out=[];let cur='';t.split(' ').forEach(w=>{const s=cur?cur+' '+w:w;if(g.measureText(s).width>max&&cur){out.push(cur);cur=w}else cur=s});out.push(cur);return out}
/* the gauge: estimate bar with the census value marked */
function gauge(y,est,label){const g=A.ctx,x0=k(14),w=A.W-2*x0,h=k(26);g.fillStyle='#ffffff';A.paint.rrect(x0,y,w,h,7);g.fill();g.strokeStyle=GREY;g.lineWidth=1.5;g.stroke();
g.fillStyle=BARF;A.paint.rrect(x0,y,Math.max(8,w*est/100),h,7);g.fill();g.strokeStyle=BARE;g.stroke();const tx=x0+w*TRUTH/100;g.strokeStyle=GOOD;g.lineWidth=3;g.beginPath();g.moveTo(tx,y-6);g.lineTo(tx,y+h+6);g.stroke();
g.fillStyle=A.col.tx;g.font=F(14);g.textAlign='left';g.textBaseline='middle';g.fillText(`${label||'Survey says yes'}: ${pct(est)}`,x0,y-k(12),w);
g.fillStyle=A.col.tx;g.font=F(12,700);g.textAlign='center';g.fillText(`census (truth): ${TRUTH}%`,Math.min(A.W-k(70),Math.max(k(70),tx)),y+h+k(16))}
function mixBar(y,p){const g=A.ctx,x0=k(14),w=A.W-2*x0,h=k(20);g.fillStyle=TEENF;g.fillRect(x0,y,w*p,h);g.fillStyle=ADF;g.fillRect(x0+w*p,y,w*(1-p),h);g.strokeStyle=GREY;g.lineWidth=1.5;g.strokeRect(x0,y,w,h);
g.font=F(12);g.textBaseline='middle';g.fillStyle=TEENC;g.textAlign='left';if(p>.18)g.fillText(`teens ${pct(100*p)}`,x0+6,y+h/2+1);g.fillStyle=ADC;g.textAlign='right';if(p<.82)g.fillText(`adults ${pct(100*(1-p))}`,x0+w-6,y+h/2+1);
g.fillStyle=A.col.tx;g.textAlign='center';g.font=F(12,700);g.fillText('Who was asked (town: teens 40%)',A.W/2,y-k(11))}
/* step 1: where you ask */
function places(){const w=(A.W-k(14)*2-16)/3,h=k(70);return PLACES.map((q,j)=>({...q,j,x:k(14)+j*(w+8),y:A.H*.3,w,h}))}
function stand(){const w=k(130),h=k(40);return{x:A.W/2-w/2,y:A.H*.13,w,h}}
function drawWhere(){const s=V.a,g=A.ctx;ground();tag(s.tried.size>=3?'All 3 places tried':`Drag the survey stand to a place (${s.tried.size} of 3 tried)`,A.H*.05,s.tried.size>=3);
places().forEach(r=>slab(r,r.n,{edge:s.at===r.j?GRAB:null,fill:s.at===r.j?'#eef2ff':null,n:13}));
const d=V.drag,b=stand();slab(d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,'Survey stand',{fill:'#fef9c3',edge:d?GRAB:'#a16207',n:13});
if(s.at!=null){const p=PLACES[s.at].p;mixBar(A.H*.62,p);gauge(A.H*.76,estimate(p,0,1,1))}else{g.fillStyle=A.col.tx;g.font=F(13,700);g.textAlign='center';g.fillText('200 people answer: should the town build a skate park?',A.W/2,A.H*.66,A.W-16)}}
function askAt(j){const s=V.a,p=PLACES[j].p,e=Math.round(estimate(p,0,1,1));s.at=j;s.tried.add(j);A.sound.pop();
say(j===2?`Random from the town list: ${pct(100*p)} teens, like the town. The survey says ${e}%, close to the census ${TRUTH}%.`:`${PLACES[j].n}: ${pct(100*p)} of the people asked are teens, but the town is 40% teens. The survey says ${e}%, ${e>TRUTH?'too high':'too low'} by ${Math.abs(e-TRUTH)} points.`)}
/* step 2: how you ask */
function slotRects(){const h=k(48);return SLOTS.map((o,j)=>({j,x:k(14),y:A.H*.2+j*(h+8),w:A.W-2*k(14),h}))}
function drawWord(){const s=V.w;ground();const loaded=s.on.filter(Boolean).length;tag(loaded?`Tap a slanted phrase to make it neutral (${loaded} left)`:'Neutral question',A.H*.05,!loaded);
slotRects().forEach(r=>slab(r,SLOTS[r.j][s.on[r.j]?0:1],{fill:s.on[r.j]?'#fee2e2':'#dcfce7',edge:s.on[r.j]?BAD:GOOD,n:15}));gauge(A.H*.72,estimate(.4,.05*loaded,1,1),'Same 200 people say yes')}
function flip(j){const s=V.w;s.on[j]=!s.on[j];A.sound.pop();const e=Math.round(estimate(.4,.05*s.on.filter(Boolean).length,1,1));
say(s.on[j]?`"${SLOTS[j][0]}" pushes people towards yes. Back up to ${e}%.`:`"${SLOTS[j][1]}" is neutral. Same people, now ${e}%.`+(s.on.some(Boolean)?'':` The wording bias is gone: ${e}% matches the census.`))}
/* step 3: who replies */
function sliders(){const w=k(64),h=A.H*.36,y=A.H*.2;return[{x:A.W*.22-w/2,y,w,h,n:'Teens',key:'rt'},{x:A.W*.5-w/2,y,w,h,n:'Adults',key:'ra'}]}
function bigBtn(){const w=Math.min(k(130),A.W*.3);return{x:A.W*.78-w/2,y:A.H*.28,w,h:k(56)}}
function drawReply(){const s=V.r,g=A.ctx;ground();tag(s.rt===s.ra&&s.big?'Reply rates match':'Drag the reply rates',A.H*.05,s.rt===s.ra&&s.big);
sliders().forEach(r=>{const v=s[r.key];g.fillStyle='#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=GREY;g.lineWidth=1.5;g.stroke();
g.fillStyle=r.key==='rt'?TEENF:ADF;const fh=r.h*v;A.paint.rrect(r.x,r.y+r.h-fh,r.w,fh,9);g.fill();g.strokeStyle=r.key==='rt'?TEENC:ADC;g.lineWidth=V.drag&&V.drag.key===r.key?4:2.5;g.beginPath();g.moveTo(r.x-6,r.y+r.h-fh);g.lineTo(r.x+r.w+6,r.y+r.h-fh);g.stroke();
g.fillStyle=INK;g.font=F(15);g.textAlign='center';g.textBaseline='middle';g.fillText(pct(100*v),r.x+r.w/2,r.y+r.h-Math.max(fh,k(20))+k(12));g.fillStyle=A.col.tx;g.font=F(13,700);g.fillText(`${r.n} reply`,r.x+r.w/2,r.y+r.h+k(14))});
const b=bigBtn();slab(b,s.big?'5,000 forms (10×)':'500 forms',{fill:s.big?'#fef9c3':null,edge:s.big?'#a16207':null,n:13});
const N=s.big?5000:500,rep=Math.round(N*(TEEN*s.rt+(1-TEEN)*s.ra));g.fillStyle=A.col.tx;g.font=F(12,700);g.textAlign='center';g.fillText(`${rep.toLocaleString('en-GB')} replies`,b.x+b.w/2,b.y+b.h+k(14));
gauge(A.H*.74,estimate(.4,0,s.rt,s.ra),'Replies say yes')}
function setRate(key,v){const s=V.r;v=Math.max(.1,Math.min(1,Math.round(v*10)/10));if(s[key]===v)return A.redraw();s[key]=v;A.sound.pop();const e=Math.round(estimate(.4,0,s.rt,s.ra));
say(`Teens ${pct(100*s.rt)}, adults ${pct(100*s.ra)} reply. Replies say ${e}%.`+(s.rt===s.ra?' Equal reply rates: the replies look like the town again.':s.rt<s.ra?' Too few teen replies, so the result is too low.':' Too many teen replies, so the result is too high.'))}
function toggleBig(){const s=V.r;s.big=!s.big;A.sound.pop();const e=Math.round(estimate(.4,0,s.rt,s.ra));say(`${s.big?'Ten times as many forms':'Back to 500 forms'}. Still ${e}%: more forms ${s.rt===s.ra?'do not change a fair result':'do not fix who replies'}.`)}
/* step 4: name the bias */
function kindBins(){const w=(A.W-k(14)*2-12)/3;return KINDS.map((q,j)=>({...q,j,x:k(14)+j*(w+6),y:A.H*.5,w,h:A.H*.44}))}
function caseCard(){const w=A.W-2*k(20);return{x:k(20),y:A.H*.13,w,h:k(70)}}
function drawKind(){const s=V.k,g=A.ctx;ground();tag(s.n>=6?'All 6 sorted':`Survey ${s.n+1} of 6: what went wrong?`,A.H*.05,s.n>=6);
kindBins().forEach(r=>{g.fillStyle='#ecfeff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle='#155e75';g.lineWidth=2;g.stroke();g.fillStyle=INK;g.font=F(13);g.textAlign='center';g.textBaseline='top';g.fillText(r.n,r.x+r.w/2,r.y+7,r.w-6);
g.font=F(11,700);g.fillText(r.s,r.x+r.w/2,r.y+7+k(17),r.w-6);g.font=F(20);g.fillText(String(CASES.slice(0,s.n).filter(x=>x[1]===r.j).length||''),r.x+r.w/2,r.y+r.h*.55)});
if(s.n<6){const d=V.drag,b=caseCard();slab(d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,CASES[s.n][0],{edge:d?GRAB:s.miss?BAD:null,n:14})}}
function sortCase(j){const s=V.k;if(s.n>=6)return;const [t,ans]=CASES[s.n];
if(j!==ans){s.miss=1;A.sound.miss();return say(ans===0?'The question is fine and everyone asked could reply. The fault is who gets asked: some groups are left out.':ans===1?'The people are fine. The wording tells them which answer is wanted.':'The people were chosen fairly. The fault is that some groups did not reply.')}
s.n++;s.miss=0;A.sound.pop();say(`${KINDS[ans].s}: ${ans===0?'the sample leaves people out':ans===1?'the wording pushes one answer':'the replies are not like the town'}.`+(s.n>=6?' All 6 sorted.':''))}
/* step 5: fix the plan */
function planRows(){const h=k(46),w=(A.W-2*k(14)-k(70)-12)/2;return PLAN.map((q,i)=>q.o.map((o,j)=>({i,j,o,x:k(14)+k(70)+j*(w+6),y:A.H*.17+i*(h+10),w,h})))}
function planEst(){const s=V.p;return estimate(s.pick[0]?.4:.95,s.pick[1]?0:.15,s.pick[2]?.7:.2,s.pick[2]?.7:.6)}
function drawPlan(){const s=V.p,g=A.ctx;ground();const e=Math.round(planEst());tag(Math.abs(e-TRUTH)<=1?'Fair plan: matches the census':'Tap the options to fix the plan',A.H*.05,Math.abs(e-TRUTH)<=1);
planRows().forEach((row,i)=>{g.fillStyle=A.col.tx;g.font=F(13);g.textAlign='left';g.textBaseline='middle';g.fillText(PLAN[i].n,k(14),row[0].y+row[0].h/2);row.forEach(r=>slab(r,r.o,{fill:s.pick[i]===r.j?(r.j?'#dcfce7':'#fee2e2'):null,edge:s.pick[i]===r.j?(r.j?GOOD:BAD):null,n:13}))});
gauge(A.H*.72,planEst(),'Plan says yes')}
function pick(i,j){const s=V.p;if(s.pick[i]===j)return say(`${PLAN[i].o[j]} is already chosen.`);s.pick[i]=j;A.sound.pop();const e=Math.round(planEst()),left=s.pick.filter(x=>!x).length;
say(`${PLAN[i].n}: ${PLAN[i].o[j]}. The plan now says ${e}%.`+(left?` ${left} fault${left>1?'s':''} left: each kind of bias needs its own fix.`:' All three faults fixed.'))}
function draw(){const p=phase();if(p==='quiz'){ground();tag('Challenge',A.H*.25,1);tag('Who is asked · how it is asked · who replies',A.H*.55);return}
({where:drawWhere,word:drawWord,reply:drawReply,kind:drawKind,plan:drawPlan})[p]();A.fx.draw(A.ctx)}
function down(p){const ph=phase();
if(ph==='where'){if(hitR(p,stand())){V.drag={x:p.x,y:p.y};return true}const r=places().find(r=>hitR(p,r));if(r)askAt(r.j);return false}
if(ph==='word'){const r=slotRects().find(r=>hitR(p,r));if(r)flip(r.j);return false}
if(ph==='reply'){const r=sliders().find(r=>hitR(p,{x:r.x-14,y:r.y-14,w:r.w+28,h:r.h+28}));if(r){V.drag={key:r.key};setRate(r.key,(r.y+r.h-p.y)/r.h);return true}if(hitR(p,bigBtn()))toggleBig();return false}
if(ph==='kind'&&V.k.n<6){if(hitR(p,caseCard())){V.drag={x:p.x,y:p.y};return true}const b=kindBins().find(r=>hitR(p,r));if(b)sortCase(b.j);return false}
if(ph==='plan'){for(const row of planRows())for(const r of row)if(hitR(p,r)){pick(r.i,r.j);return false}}return false}
function move(p){const d=V.drag;if(!d)return;if(d.key){const r=sliders().find(r=>r.key===d.key);setRate(d.key,(r.y+r.h-p.y)/r.h);return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=V.drag;if(!d)return;V.drag=null;const ph=phase();if(d.key)return A.redraw();
if(ph==='where'){const r=places().find(r=>hitR(p,{x:r.x-10,y:r.y-20,w:r.w+20,h:r.h+40}));if(r)askAt(r.j);else A.redraw();return}
if(ph==='kind'){const b=kindBins().find(r=>hitR(p,r));if(b)sortCase(b.j);else A.redraw()}}
function zero(){ver++;for(const x in V)delete V[x];Object.assign(V,{a:{at:null,tried:new Set()},w:{on:[1,1,1]},r:{rt:.2,ra:.6,big:false},k:{n:0},p:{pick:[0,0,0]},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();V.check()}
function arm(i,desc,ok,msg){zero();say(desc);V.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function film(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function keys(){if(!rack)return;rack.innerHTML='';const p=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},rack,t).onclick=f};
if(p==='where')PLACES.forEach((q,j)=>B(q.n,()=>askAt(j),`Put the survey stand at: ${q.n}`));
if(p==='word')SLOTS.forEach((o,j)=>B(V.w.on[j]?o[1]:o[0],()=>flip(j),`Change "${V.w.on[j]?o[0]:o[1]}" to "${V.w.on[j]?o[1]:o[0]}"`));
if(p==='reply'){[['rt','Teens'],['ra','Adults']].forEach(([key,n])=>{B(`${n} +10%`,()=>setRate(key,V.r[key]+.1),`${n} reply rate up 10 points`);B(`${n} −10%`,()=>setRate(key,V.r[key]-.1),`${n} reply rate down 10 points`)});B(V.r.big?'Back to 500 forms':'Send 10× forms',toggleBig)}
if(p==='kind'&&V.k.n<6)KINDS.forEach((q,j)=>B(q.n,()=>sortCase(j),`This survey's fault: ${q.n} (${q.s})`));
if(p==='plan')PLAN.forEach((q,i)=>q.o.forEach((o,j)=>B(`${q.n}: ${o}`,()=>pick(i,j))))}
const steps=[
{h:'Who you ask',p:'The town is 40% teens. A census of everyone found 52% want a skate park. Drag the survey stand to each place and compare.',
predict:{q:'200 people asked outside the skate shop. The result will be…',opts:['About right: 200 is plenty','Far too high'],ans:1},task:'Try all 3 places',
show:()=>film(0,[0,1,2].map(j=>()=>askAt(j)),900),
go:()=>arm(0,'Places: skate shop, library, random town list. The stand is above them.',()=>V.a.tried.size>=3,'Only the random list gives everyone the same chance.')},
{h:'How you ask',p:'Same 200 random people, but the question is slanted. Tap each slanted phrase to make it neutral.',
predict:{q:'Only the wording changes. The yes share will…',opts:['Stay the same','Move a lot'],ans:1},task:'Make the question neutral',
show:()=>film(1,[0,1,2].map(j=>()=>flip(j)),900),
go:()=>arm(1,"Question: Don't you agree that the town badly needs a fun, safe skate park?",()=>!V.w.on.some(Boolean),'A leading question biases even a perfect sample.')},
{h:'Who replies',p:'Forms go to a random 500. Only 20% of teens reply but 60% of adults do. Drag the reply rates, and try sending ten times as many forms.',
predict:{q:'Send 5,000 forms instead of 500. The result will…',opts:['Get close to 52%','Stay far off'],ans:1},task:'Make the replies fair',
show:()=>film(2,[toggleBig,...[.3,.4,.5,.6].map(v=>()=>setRate('rt',v))],700),
go:()=>arm(2,'Teens reply 20%, adults 60%.',()=>V.r.big&&V.r.rt===V.r.ra,'Bias is about who replies, not how many.')},
{h:'Name the bias',p:'Each survey has one fault: who is asked, how it is asked, or who replies? Drag each card to a box.',task:'Sort all 6 surveys',
show:()=>film(3,CASES.map(x=>()=>sortCase(x[1])),650),
go:()=>arm(3,'Card: asking people at a gym about exercise.',()=>V.k.n>=6,'Sampling, wording, non-response: three faults.')},
{h:'Fix the plan',p:'This plan has all three faults. Fix them one at a time.',task:'Get the plan to match the census',
show:()=>film(4,[0,1,2].map(i=>()=>pick(i,1)),900),
go:()=>arm(4,'Plan: skate shop, leading wording, no reminders.',()=>Math.abs(planEst()-TRUTH)<=1,'Random list, neutral wording, chase non-replies.')},
{h:'Challenge',p:'',go:()=>{zero();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const QS=[
{q:'A survey of 5,000 shoppers at one sports shop asks about a new gym. What is the main problem?',a:'Who is asked: shoppers there are not like the town',o:[['None: 5,000 is a big sample','big'],['The question must be leading','word']]},
{q:'Which question is neutral?',a:'How often do you use the park?',o:[["Don't you love our lovely park?",'lead'],['How much do you hate the litter?','lead2']]},
{q:'Forms went to a random sample, but only 10% of young people replied. What kind of bias?',a:'Non-response bias',o:[['Sampling bias','frame'],['No bias: it was random','random']]},
{q:'A biased survey is repeated with ten times as many people. The bias…',a:'stays the same',o:[['disappears','size'],['gets ten times smaller','tenth']]},
{q:'An online poll on a cycling website asks if the town needs more cycle lanes. Why is it biased?',a:'Mostly cyclists see it and choose to answer',o:[['The question is too short','short'],['Online polls always get too few replies','few']]},
{q:'The best way to pick a sample of students is…',a:'Draw names at random from the full register',o:[['Ask the first 50 through the gate','gate'],['Ask for volunteers by email','vol']]}];
function why(t){let m='Ask: who was asked, how, and who replied?';
if(t==='big')m='Size does not fix who is asked. 5,000 sports shoppers still over-represent sporty people.';
if(t==='word')m='The wording is not the problem. The place is: only that shop\'s shoppers are asked.';
if(t==='lead')m='"Don\'t you love our lovely park?" tells people the answer you want.';
if(t==='lead2')m='"How much do you hate" assumes people hate it. That leads the answer.';
if(t==='frame')m='The sample was chosen fairly at random. The fault came later: who replied.';
if(t==='random')m='A random sample can still be biased if some groups do not reply.';
if(t==='size')m='Bias is a fault in the method. More people asked the same way give the same lean.';
if(t==='tenth')m='Ten times the people cuts random error, not bias. The bias stays the same.';
if(t==='short')m='Short questions are fine. The fault is who sees the poll and answers.';
if(t==='few')m='The number of replies is not the issue. Most who reply are cyclists.';
if(t==='gate')m='The first 50 through the gate is a convenience sample: early arrivers are not typical.';
if(t==='vol')m='Volunteers choose themselves, so keen people are over-represented.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'yes'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='yes';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{box.hidden=B.step!==5;rack.hidden=B.step===5;keys()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);rack=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Survey buttons'},bx);box=c.el('div',{class:'fl-chal'},A.below);zero();A.gest({down,move,up});keys()}}).start()})})();
