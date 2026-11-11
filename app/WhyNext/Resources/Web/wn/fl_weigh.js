/* Flagship: Evaluating Arguments in Non-Fiction (ages 11–14; NC KS3 English reading: critical reading, how writers make
   and support claims, distinguishing fact from opinion, recognising bias and rhetorical technique; CCSS RI.6.8–8.8:
   trace and evaluate the argument, assess whether reasoning is sound and evidence relevant and sufficient).
   A sample editorial and a reply letter (invented for the lab): find the main claim; drag evidence onto a scale or into
   the bin; weigh it strong / some / weak until it is enough; name four reasoning tricks; read a biased source fairly;
   then judge which side is more convincing and why. Not flagevid (quotations), flagargue (writing), flagfvo (fact vs opinion). */
(()=>{
VIS.reg('flagweigh',c=>{let A,pad,quizBox,item=-1,run=0;const S={};
const now=()=>['claim','rel','weight','trick','bias','judge','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||600} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;
 const L=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(g.measureText(t).width>mw&&cur){L.push(cur);cur=w}else cur=t}L.push(cur);
 L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*px*1.25,mw));return L.length*px*1.25}
const px=()=>A.narrow?13:15,hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function box(r,fill,line,w){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=line||A.col.ln;g.lineWidth=w||1.2;g.stroke()}
/* the editorial's four sentences; index 1 is the main claim */
const ED=['Every morning, 400 cars squeeze past the gates of Mill Road School.','The council should close Mill Road to cars at drop-off and pick-up times.','Would you let your child cross that road?','A trial at 12 schools cut traffic at the gates by a third.'];
const edBox=i=>({x:A.W*.04,y:A.H*(.1+i*.2),w:A.W*.92,h:A.H*.17});
/* evidence cards: [text, relevant?, weight 3 strong / 2 some / 1 weak] */
const EV=[['A council trial at 12 schools cut traffic at the gates by a third.',1,3],['Mill Road was first paved in 1952.',0,0],['One parent says her son was nearly hit last week.',1,1],['The council’s new website cost £40,000.',0,0],['Air at the gate was cleaner on 10 car-free days than on the 10 days before.',1,2]];
const W=['','weak','some','strong'],cardR=()=>({x:A.W*.08,y:A.H*.06,w:A.W*.84,h:A.H*.17});
const panX=()=>A.W*.3,binR=()=>({x:A.W*.7,y:A.H*.55,w:A.W*.24,h:A.H*.25});
/* the scale: left pan holds relevant evidence; it sinks by the total weight, and a dashed line marks "enough" (5) */
function scale(total,y0,cx,label,bare){const g=A.ctx,C=A.col,len=A.W*(A.narrow?.14:.17),a=-Math.min(total,7)/7*.32,cy=A.H*y0;
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx,cy+A.H*.28);g.stroke();
 const L={x:cx-len*Math.cos(a),y:cy+len*Math.sin(-a)},R={x:cx+len*Math.cos(a),y:cy-len*Math.sin(-a)};g.beginPath();g.moveTo(L.x,L.y);g.lineTo(R.x,R.y);g.stroke();
 [L,R].forEach((P,i)=>{g.fillStyle=A.alpha(i?C.rd:C.gr,.25);g.beginPath();g.ellipse(P.x,P.y+A.H*.05,A.W*.06,A.H*.022,0,0,7);g.fill();g.stroke()});
 if(!bare){g.setLineDash([5,4]);g.strokeStyle=C.mu;g.beginPath();const ey=cy+len*Math.sin(5/7*.32)+A.H*.05;g.moveTo(cx-len*1.45,ey);g.lineTo(cx-len*.55,ey);g.stroke();g.setLineDash([]);put('enough',cx-len,ey+A.H*.05,A.narrow?11:12,{ink:C.mu})}g.fillStyle=C.tx;g.beginPath();g.moveTo(cx-14,cy+A.H*.28);g.lineTo(cx+14,cy+A.H*.28);g.lineTo(cx,cy+A.H*.25);g.fill();
 put(label||`weight ${total}`,cx,cy+A.H*.33,px(),{b:800})}
const total=()=>S.on.reduce((s,i)=>s+(S.rate[i]||0),0);
function drawClaim(){ED.forEach((s,i)=>{const r=edBox(i),pick=S.pick===i;box(r,A.alpha(pick?(i===1?A.col.gr:A.col.rd):A.col.tx,pick?.18:.04),pick?(i===1?A.col.gr:A.col.rd):null,pick?3:1);put(s,r.x+r.w/2,r.y+r.h/2,px(),{max:r.w-14})});
 put(S.msg||'Tap the sentence that is the main claim',A.W/2,A.H*.93,px(),{ink:A.col.mu})}
function drawRel(){const j=S.next,C=A.col;scale(S.on.length,.42,panX(),`For the claim: ${S.on.length}`,1);const b=binR();box(b,A.alpha(C.mu,.12));put('🗑 Not relevant',b.x+b.w/2,b.y+b.h/2,px(),{max:b.w-8,b:800});
 if(j<EV.length){const r=cardR(),dx=S.drag?S.drag.x-S.drag.x0:0,dy=S.drag?S.drag.y-S.drag.y0:0;box({...r,x:r.x+dx,y:r.y+dy},A.mix(C.pn,'#fde68a',C.dark?.2:.65),C.tx);put(EV[j][0],r.x+r.w/2+dx,r.y+r.h/2+dy,px(),{max:r.w-14,b:700,ink:C.dark?'#f8fafc':'#111827'})}
 put(S.msg||'Drag the card to the scale or the bin',A.W/2,A.H*.93,px(),{ink:C.mu})}
function drawWeight(){const C=A.col,t=total();scale(t,.5,A.W*.5,t>=5?`weight ${t}: enough ✓`:`weight ${t}`);
 [0,4,2].forEach((i,k)=>{const r={x:A.W*.04,y:A.H*(.03+k*.13),w:A.W*.92,h:A.H*.11};box(r,A.alpha(C.ac,S.rate[i]?.14:.04));put(`${EV[i][0]}${S.rate[i]?'  → '+W[S.rate[i]]:''}`,r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,{max:r.w-12})});
 put(S.msg||'Rate each piece of evidence',A.W/2,A.H*.95,px(),{ink:C.mu})}
const TR=[['People who back this plan just hate drivers.',0],['Either Mill Road stays open or every shop in town will close.',1],['Everyone I know is against it, so it must be wrong.',2],['Close one road today and soon every road in town will be shut.',3]];
const TN=['Attacks the person','False choice','Bandwagon','Slippery slope'];
function drawTrick(){const C=A.col;put('A reply letter:',A.W/2,A.H*.05,px(),{b:800});
 TR.forEach(([s],i)=>{const r={x:A.W*.04,y:A.H*(.1+i*.19),w:A.W*.92,h:A.H*.16},done=S.named[i]!=null;box(r,A.alpha(done?C.gr:i===S.ti?C.ac:C.tx,done?.15:i===S.ti?.12:.03),i===S.ti?C.ac:null,i===S.ti?2.5:1);
  put(`“${s}”${done?' → '+TN[i]:''}`,r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,{max:r.w-14})});put(S.msg||'Name the trick in the highlighted line',A.W/2,A.H*.92,px(),{ink:C.mu})}
const BI=[['Takings at my car park fell 30% during the trial.',0],['The closure is a disaster for this town.',1],['Nobody wants their road closed.',1]];
function drawBias(){const C=A.col;put('Letter from the owner of the Mill Road car park',A.W/2,A.H*.06,px(),{b:800});
 BI.forEach(([s,k],i)=>{const r={x:A.W*.04,y:A.H*(.14+i*.2),w:A.W*.92,h:A.H*.17},v=S.fo[i];box(r,A.alpha(v==null?C.tx:v===k?C.gr:C.rd,v==null?.04:.16));put(`“${s}”${v!=null?(v?'  → opinion':'  → fact to check'):''}`,r.x+r.w/2,r.y+r.h/2,px(),{max:r.w-14})});
 put(S.msg||'Fact you can check, or opinion?',A.W/2,A.H*.86,px(),{ink:C.mu})}
function drawJudge(){scale(6,.2,A.W*.27,'Editorial: 6, no tricks');scale(1,.2,A.W*.73,'Letter: 1, 4 tricks');
 if(S.verdict!=null)put(S.verdict===0?'✓ The editorial is more convincing':'✗ Look at the evidence, not the feeling',A.W/2,A.H*.72,A.narrow?15:17,{b:900});put(S.msg||'Which side is more convincing, and why?',A.W/2,A.H*.88,px(),{ink:A.col.mu})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#ede9fe',C.dark?.05:.35);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({claim:drawClaim,rel:drawRel,weight:drawWeight,trick:drawTrick,bias:drawBias,judge:drawJudge}[now()]||(()=>put(S.q||'Claim, evidence, reasoning: weigh it.',Q.W/2,Q.H*.45,Q.narrow?18:22,{b:800})))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{pick:null,next:0,on:[],drag:null,rate:{},ti:0,named:{},fo:{},verdict:null,msg:'',q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?30*(j+1):450*(j+1)))}
function note(m){S.msg=m;tell(m);A.redraw();keys();S.ok()}
function claim(i){S.pick=i;i===1?A.sound.pop():A.sound.miss();
 note(['That is a fact used to set the scene. The claim is what the writer wants you to accept.','Yes. The claim is the point the whole piece argues for: close the road.','A question to stir feeling. It is not the claim itself.','That is evidence for the claim, not the claim.'][i])}
function sortEv(toScale){const j=S.next;if(j>=EV.length)return;const rel=EV[j][1];
 if(!!rel!==toScale){A.sound.miss();return note(rel?'That is about traffic and safety at the gate, so it is relevant.':'It may be true, but it says nothing about traffic or safety now. It is a distraction.')}
 if(rel)S.on.push(j);S.next++;A.sound.pop();note(S.next===EV.length?'3 relevant pieces on the scale, 2 in the bin.':toScale?'On the scale.':'In the bin.')}
function rate(i,w){const k=EV[i][2];if(w!==k){A.sound.miss();return note(w>k?(k===1?'One person’s story is weak: it may be true, but it is a single case.':'Only 10 days at one gate: useful, but not strong on its own.'):k===3?'Measured across 12 schools: that is strong evidence.':'It was measured, so it counts for some, even if only for 10 days.')}
 S.rate[i]=w;A.sound.pop();note(nextRate()==null?'Strong + some + weak = 6. Enough to support the claim.':`Weight now ${total()}.`)}
const nextRate=()=>[0,4,2].find(i=>!S.rate[i]);
function name(k){const i=S.ti;if(i>=TR.length)return;if(k!==TR[i][1]){A.sound.miss();
 return note(['It attacks the people, not the plan. Is that the trick here?','A false choice gives only two options when there are more. Look again.','Bandwagon says it is right because many people think so. Look again.','A slippery slope claims one step will lead to an extreme. Look again.'][k])}
 S.named[i]=k;S.ti++;A.sound.pop();note(S.ti===TR.length?'4 tricks. None of them is evidence against the plan.':['It insults supporters instead of answering the reasons.','There are more options, like closing the road only at certain times.','Popularity is not proof.','No evidence that one closure leads to all roads shutting.'][i])}
function fo(i,v){if(S.fo[i]===BI[i][1])return;S.fo[i]=v;v===BI[i][1]?A.sound.pop():A.sound.miss();
 note(v!==BI[i][1]?(v?'A number you can check in his accounts is a fact, even from a biased writer.':'“Disaster” and “nobody” are judgements you cannot check. That is opinion.'):i===0?'A fact, but about his business, not safety. Bias tells you what to check.':'Opinion. Strong words, no evidence.')}
const nextFo=()=>[0,1,2].find(i=>S.fo[i]!==BI[i][1]);
function judge(v){S.verdict=v;v===0?A.sound.pop():A.sound.miss();note(['Yes: relevant, strong evidence that is enough, and no reasoning tricks.','Feeling strongly is not the same as having evidence.','How many people agree does not make a claim true.'][v])}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='claim'&&S.pick!==1)ED.forEach((s,i)=>b(`Sentence ${i+1}`,()=>claim(i),`Sentence ${i+1}: ${s}`));
 if(k==='rel'&&S.next<EV.length){b('Put on the scale',()=>sortEv(true));b('Put in the bin',()=>sortEv(false))}
 if(k==='weight'){const i=nextRate();if(i!=null)[3,2,1].forEach(w=>b(W[w],()=>rate(i,w),`Rate as ${W[w]}: ${EV[i][0]}`))}
 if(k==='trick'&&S.ti<TR.length)TN.forEach((n,j)=>b(n,()=>name(j)));
 if(k==='bias'){const i=nextFo();if(i!=null){b('Fact to check',()=>fo(i,0),`Fact: ${BI[i][0]}`);b('Opinion',()=>fo(i,1),`Opinion: ${BI[i][0]}`)}}
 if(k==='judge'&&S.verdict!==0){b('Editorial: stronger, relevant evidence',()=>judge(0));b('Letter: it feels more strongly',()=>judge(1));b('Letter: more people agree',()=>judge(2))}}
function down(p){const k=now();
 if(k==='claim'){const i=[0,1,2,3].find(j=>hit(p,edBox(j)));if(i!=null){claim(i);return true}return false}
 if(k==='rel'){if(S.next<EV.length&&hit(p,cardR())){S.drag={x0:p.x,y0:p.y,x:p.x,y:p.y};return true}return false}
 if(k==='bias'){const i=[0,1,2].find(j=>hit(p,{x:A.W*.04,y:A.H*(.14+j*.2),w:A.W*.92,h:A.H*.17}));if(i!=null&&i===nextFo()){fo(i,S.fo[i]===0?1:0);return true}}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(hit(p,binR()))sortEv(false);else if(p.x<A.W*.6&&p.y>A.H*.3)sortEv(true);else A.redraw()}
const steps=[
{h:'Find the claim',p:'An editorial argues for something. First find its main claim: the one point the rest of the piece is trying to make you accept.',
 predict:{q:'The writer sounds very sure and uses strong words. Does that make the argument strong?',opts:['Yes, confident writing convinces','No, it depends on the reasons and evidence','Yes, if it is in a newspaper'],ans:1},
 task:'Tap the main claim',show:()=>auto(0,[()=>claim(1)]),go:()=>{fresh();tell('An editorial in four sentences.');keys();S.ok=finishIf(0,()=>S.pick===1,'The claim: close Mill Road at drop-off and pick-up.')}},
{h:'Relevant or not?',p:'Evidence only counts if it is about the claim. Put relevant evidence on the scale. Bin anything that is true but beside the point.',
 task:'Sort all 5 cards',show:()=>auto(1,[()=>sortEv(true),()=>sortEv(false),()=>sortEv(true),()=>sortEv(false),()=>sortEv(true)]),
 go:()=>{fresh();tell('An empty scale and a bin. The first evidence card is at the top.');keys();S.ok=finishIf(1,()=>S.next===EV.length,'Irrelevant facts can distract, but they weigh nothing.')}},
{h:'Is it enough?',p:'Relevant is not the same as sufficient. Weigh each piece: how many cases does it cover, and was it measured?',
 predict:{q:'Which is stronger evidence: one vivid story, or a trial at 12 schools?',opts:['The story, it feels more real','The 12-school trial','They count the same'],ans:1},
 task:'Rate all 3 until the scale passes “enough”',show:()=>auto(2,[()=>rate(0,3),()=>rate(4,2),()=>rate(2,1)]),
 go:()=>{fresh({on:[0,2,4]});tell('Three relevant pieces of evidence, not yet weighed.');keys();S.ok=finishIf(2,()=>nextRate()==null&&total()>=5,'Enough: a broad trial, a measurement and a story.')}},
{h:'Spot the trick',p:'A reply letter attacks the plan. Some sentences sound like reasons but are tricks that skip the evidence. Name each one.',
 task:'Name all 4 tricks',show:()=>auto(3,[()=>name(0),()=>name(1),()=>name(2),()=>name(3)]),
 go:()=>{fresh();tell('A reply letter in four sentences.');keys();S.ok=finishIf(3,()=>S.ti===4,'Tricks can feel persuasive, but they add no evidence.')}},
{h:'Who is writing?',p:'The car-park owner loses money if the road closes, so he is biased. Bias does not make him wrong. It tells you to check his facts closely.',
 predict:{q:'The writer is biased. Does that make his argument wrong?',opts:['Yes, ignore it','No, but check his evidence closely','Yes, all letters are biased'],ans:1},
 task:'Mark each line fact or opinion',show:()=>auto(4,[()=>fo(0,0),()=>fo(1,1),()=>fo(2,1)]),
 go:()=>{fresh();tell('Three lines from the car-park owner.');keys();S.ok=finishIf(4,()=>nextFo()==null,'One checkable fact, about his business; two opinions.')}},
{h:'Compare and decide',p:'Now weigh both sides. Judge on relevant, sufficient evidence and sound reasoning, not on how loud or popular a side is.',
 predict:{q:'The letter is angrier and more people signed it. Is it more convincing?',opts:['Yes, more feeling and more people','No, check the evidence on each side','It is a draw'],ans:1},
 task:'Choose the stronger side and the reason',show:()=>auto(5,[()=>judge(0)]),go:()=>{fresh();tell('Two scales: the editorial weighs 6, the letter weighs 1.');keys();S.ok=finishIf(5,()=>S.verdict===0,'The editorial wins on evidence and reasoning.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['“Our new trainers are best: 9 out of 10 celebrities wear them.” What is wrong?','Popularity is not proof the trainers are best',[['Nothing, 9 out of 10 is a lot','pop'],['It is too short','style']]],
 ['A claim: homework should be banned. Which evidence is relevant?','A study of homework and test results',[['The history of the school bell','rel'],['The writer hates maths','person']]],
 ['“My uncle smoked and lived to 95, so smoking is safe.” How strong is this evidence?','Weak: one case cannot outweigh large studies',[['Strong: it really happened','one'],['Strong: 95 is old','one']]],
 ['“Anyone who wants a later school start is just lazy.” Which trick is this?','Attacking the person',[['Bandwagon','name'],['False choice','name']]],
 ['A sugar company report says sugar is harmless. What should you do?','Check its evidence closely, it may be biased',[['Trust it, they know sugar','bias'],['Ignore it, it must be false','bias']]],
 ['“Either we build the bypass or the town dies.” What is the problem?','It ignores other options',[['It uses a number','name'],['Nothing, it is clear','style']]]];
function why(tag){let m='Ask: is it relevant, is it enough, and is the reasoning sound?';
 if(tag==='pop')m='How many people do something does not show it is good. That is the bandwagon trick.';
 if(tag==='rel')m='True but beside the point: it says nothing about the claim.';
 if(tag==='person')m='That is about the writer, not the evidence. Judge the reasons.';
 if(tag==='one')m='One case is weak evidence. A few stories cannot outweigh large, measured studies.';
 if(tag==='name')m='Match the trick to what the sentence does: insult, two options only, popularity or extreme chain.';
 if(tag==='bias')m='Bias means check harder, not believe or dismiss automatically.';
 if(tag==='style')m='Judge the reasoning, not the length or tone.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:Q=>{quizBox.hidden=Q.step!==6;pad.hidden=Q.step===6;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Argument controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
