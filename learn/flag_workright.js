/* Flagship: rights and responsibilities at work (ages 16–18; PSHE Association KS5 / post-16 work and careers:
   rights at work, the National Minimum Wage, payslips, rest breaks, and what to do if treated unfairly). UK rates
   from 1 April 2026 (gov.uk): £12.71 at 21+, £10.85 at 18–20, £8.00 under 18 and for apprentices under 19 or in
   their first year. Sort pay offers, find the error on three payslips, set the legal rest break for three shifts,
   sort rights from responsibilities and order the steps for fixing a problem. Every drag also has a button. */
(()=>{
const OFFERS=[['Jo, 17, café: £7.50 an hour',1,'Under 18 the minimum is £8.00 an hour, so £7.50 is too low.'],['Sam, 19, shop: £10.85 an hour',0,'£10.85 is exactly the 18 to 20 rate. Legal.'],['Priya, 22, warehouse: £12.50 an hour',1,'At 21 and over she must get the National Living Wage, £12.71.'],['Leo, 17, first-year apprentice: £8.00',0,'The apprentice rate, £8.00, applies to apprentices under 19.'],['Ana, 20, bar: £12.00 an hour',0,'Above £10.85, so legal. Employers can always pay more than the minimum.']];
const BIN=['Legal','Below the minimum'];
const SLIPS=[{who:'Mo, 19',rota:'Rota: 20 hours this week',rows:[['Hours worked','18','hours'],['Hourly rate','£10.85','rate'],['Gross pay','£195.30','gross']],bad:'hours',fix:'The rota says 20 hours but he was paid for 18. 2 hours × £10.85 = £21.70 is missing.'},
{who:'Grace, 22',rota:'Rota: 30 hours this week (May 2026)',rows:[['Hours worked','30','hours'],['Hourly rate','£12.21','rate'],['Gross pay','£366.30','gross']],bad:'rate',fix:'£12.21 was the old rate. From 1 April 2026 she must get at least £12.71 an hour.'},
{who:'Kit, 18',rota:'Rota: 16 hours this week',rows:[['Gross pay (16 × £10.85)','£173.60','gross'],['Deduction: work uniform','−£30.00','uniform'],['Pay after deduction','£143.60','net']],bad:'uniform',fix:'£143.60 ÷ 16 = £8.98 an hour, below £10.85. A uniform deduction cannot take pay below the minimum wage.'}];
const SHIFTS=[['Ravi, 19',7,1,'Over 6 hours, so an adult worker gets one 20-minute break.'],['Ana, 17',5,2,'Under 18 and over 4½ hours: a 30-minute break.'],['Beth, 25',5.5,0,'An adult is only owed a break for a shift over 6 hours, so none is required by law.']];
const BRK=['No break by law','20 minutes','30 minutes'];
const DUTY=[['Paid at least the minimum wage',0],['Turn up on time for your shifts',1],['An itemised payslip every payday',0],['Follow the safety training you were given',1],['A written statement of your main terms from day one',0],['Tell your manager early if you are ill',1],['Paid holiday: 5.6 weeks a year if full-time',0]];
const DBIN=['Your right','Your responsibility'];
const PLAN=['Check your payslip and contract','Talk to your manager','Raise a formal grievance in writing','Get free advice from Acas, or report unpaid minimum wage to HMRC'];
VIS.reg('flagworkright',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#94a3b8',CARD='#ffffff',OK='#047857',NO='#b91c1c',GOLD='#b45309',BLUE='#1d4ed8',PLUM='#7e22ce',PALE='#f3e8ff',HOT='#dcfce7';
const MODE=['pay','slip','break','duty','plan','chal'],mode=()=>MODE[A.step];
const q=n=>Math.round(n*(A.narrow?1:1.12)),fo=(n,w)=>`${w||700} ${q(n)}px system-ui,sans-serif`;
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function print(s,x,y,n,col,al,w){Z.font=fo(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function split(s,max,n){Z.font=fo(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function tile(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function tileText(r,s,n,col){const L=split(s,r.w-14,n),lh=q(n)+4;L.forEach((l,i)=>print(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col||INK,'center',700))}
function top(s,done){const r={x:10,y:8,w:A.W-20,h:A.H*.11};tile(r,done?HOT:PALE,done?OK:PLUM,2);tileText(r,s,13,done?OK:INK)}
function foot(){if(!S.msg)return;const L=split((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=q(13)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>print(l,A.W/2,y+5+lh*(i+.5),13))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const no=s=>{S.bad=true;S.msg=s;A.sound.miss();speak(s);A.redraw()};
const ok=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* shared card-and-bins sorter for steps 1 and 4 */
const binR=(j,n)=>{const w=(A.W-20-6*(n-1))/n;return{x:10+j*(w+6),y:A.H*.52,w,h:A.H*.26}};
const cardR=()=>({x:A.W*.12,y:A.H*.21,w:A.W*.76,h:q(50)});
const rateR=()=>({x:A.W*.12,y:A.H*.21+q(56),w:A.W*.76,h:q(26)});
function drawSorter(list,bins,doneMsg,ask){const v=list[S.i];top(v?ask:doneMsg,!v);
 bins.forEach((t,j)=>{const b=binR(j,bins.length);tile(b,S.miss===j?'#fee2e2':CARD,S.miss===j?NO:RIM,S.miss===j?3:2);tileText({x:b.x,y:b.y,w:b.w,h:b.h*.5},t,13);const n=S.sorted.filter(x=>x===j).length;print(n+(n===1?' card':' cards'),b.x+b.w/2,b.y+b.h-q(14),12,SOFT,'center',600)});
 if(v){const r0=cardR(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;tile(r,'#fffbeb',GOLD,3);tileText(r,v[0],14)}}
function payPick(j){const v=OFFERS[S.i];if(!v)return;if(j===v[1]){S.sorted.push(j);S.i++;S.miss=null;ok(v[2]);return refresh()}S.miss=j;no(j===0?`Not legal. ${v[2]}`:`It is legal. ${v[2]}`)}
function dutyPick(j){const v=DUTY[S.i];if(!v)return;if(j===v[1]){S.sorted.push(j);S.i++;S.miss=null;ok(v[1]?`${v[0]}: your side of the deal.`:`${v[0]}: the law gives you this.`);return refresh()}S.miss=j;
 no(v[1]?`${v[0]} is something you owe your employer, not something they owe you.`:`${v[0]} is a legal right your employer must give you, not a favour.`)}
/* step 2: payslips */
const rowR=k=>({x:A.W*.1,y:A.H*.36+k*q(44),w:A.W*.8,h:q(38)});
function drawSlip(){const s=SLIPS[S.i];top(s?`Tap the line that is wrong on ${s.who}'s payslip.`:'Check hours, rate and deductions on every payslip.',!s);
 if(!s){tileText({x:A.W*.1,y:A.H*.3,w:A.W*.8,h:A.H*.3},'Hours match the rota? Rate at least the minimum for your age? Deductions never take you below it?',14);return}
 const paper={x:A.W*.06,y:A.H*.2,w:A.W*.88,h:A.H*.56};tile(paper,'#fefce8',GOLD,2);print(`Payslip: ${s.who}`,paper.x+12,paper.y+q(14),13,INK,'left',800);print(s.rota,paper.x+12,paper.y+q(34),12,BLUE,'left',700);
 s.rows.forEach((r,k)=>{const b=rowR(k);tile(b,S.miss===r[2]?'#fee2e2':CARD,S.miss===r[2]?NO:RIM,S.miss===r[2]?3:1.5);print(r[0],b.x+10,b.y+b.h/2,12,INK,'left',700);print(r[1],b.x+b.w-10,b.y+b.h/2,13,INK,'right',800)})}
function slipPick(k){const s=SLIPS[S.i];if(!s)return;const tag=s.rows[k][2];if(tag===s.bad){S.i++;S.miss=null;ok(s.fix);return refresh()}S.miss=tag;
 if(tag==='gross'&&s.bad==='hours')return no('£195.30 is right for 18 hours (18 × £10.85). Check the hours against the rota.');
 if(tag==='gross')return no('The sum is right for the numbers shown, so the slip hides the error higher up. Check the rate against April 2026.');
 if(tag==='hours')return no('30 hours matches the rota. Check the hourly rate for a 22-year-old.');
 if(tag==='rate')return no(`${s.rows[k][1]} is legal for ${s.who.split(',')[0]}'s age. Look for another line.`);
 no('That line follows from the others. Look at what was taken off and whether it leaves at least £10.85 an hour.')}
/* step 3: breaks */
const brkR=j=>{const w=(A.W-20-12)/3;return{x:10+j*(w+6),y:A.H*.56,w,h:q(48)}};
function drawBreak(){const s=SHIFTS[S.i];top(s?'What break does the law give for this shift? Tap a box.':'Adults: 20 minutes over 6 hours. Under 18s: 30 minutes over 4½ hours.',!s);
 const bar={x:A.W*.08,y:A.H*.3,w:A.W*.84,h:q(30)};const H=s?s[1]:9;tile(bar,'#f1f5f9',RIM,1.5);for(let h=0;h<=9;h++){const x=bar.x+bar.w*h/9;print(h,x,bar.y+bar.h+q(10),10,SOFT)}
 if(s){Z.fillStyle=PLUM;Z.fillRect(bar.x,bar.y+3,bar.w*H/9,bar.h-6);print(`${s[0]}: ${String(H).replace('.5','½')}-hour shift`,A.W/2,bar.y-q(14),14,INK,'center',800);
  [4.5,6].forEach(t=>{const x=bar.x+bar.w*t/9;Z.strokeStyle=GOLD;Z.setLineDash([4,3]);Z.lineWidth=2;Z.beginPath();Z.moveTo(x,bar.y-4);Z.lineTo(x,bar.y+bar.h+4);Z.stroke();Z.setLineDash([])});
  print('4½ h: under 18',bar.x+bar.w*4.5/9,bar.y+bar.h+q(26),10,GOLD,'right',800);print('6 h: 18+',bar.x+bar.w*6/9+4,bar.y+bar.h+q(26),10,GOLD,'left',800);
  BRK.forEach((t,j)=>{const b=brkR(j);tile(b,S.miss===j?'#fee2e2':CARD,S.miss===j?NO:RIM,S.miss===j?3:2);tileText(b,t,12)})}}
function brkPick(j){const s=SHIFTS[S.i];if(!s)return;if(j===s[2]){S.i++;S.miss=null;ok(s[3]);return refresh()}S.miss=j;const young=/1[67]/.test(s[0]);
 if(j===2&&!young)return no(`30 minutes is the under-18 rule. ${s[0].split(',')[0]} is an adult: 20 minutes, and only over 6 hours.`);
 if(j===1&&young)return no(`${s[0].split(',')[0]} is under 18, so the rule is 30 minutes for more than 4½ hours.`);
 if(j===0)return no(`${s[1]} hours is past the limit for this age, so a break is owed by law.`);
 no(`${String(s[1]).replace('.5','½')} hours is not over 6, so an adult has no legal break on this shift. Many employers give one anyway.`)}
/* step 5: order the plan */
const planR=k=>({x:A.W*.06,y:A.H*.2+k*q(50),w:A.W*.88,h:q(44)});
function drawPlan(){const done=S.k>=PLAN.length;top(done?'Check, talk, put it in writing, then get outside help.':'Tap the steps in the order you would take them.',done);
 S.order.forEach((p,k)=>{const r=planR(k),placed=k<S.k;tile(r,placed?HOT:S.miss===p?'#fee2e2':CARD,placed?OK:S.miss===p?NO:RIM,2);tileText({x:r.x+q(26),y:r.y,w:r.w-q(30),h:r.h},PLAN[p],12,placed?OK:INK);if(placed)print(S.pos[p]+1,r.x+q(14),r.y+r.h/2,14,OK,'center',800)})}
function planPick(p){if(S.k>=PLAN.length||S.pos[p]!=null)return;if(p===S.k){S.pos[p]=S.k;S.k++;S.miss=null;ok(['Start with the facts: what you were promised and what you got.','Most mistakes are fixed by a calm word with your manager.','A written grievance starts the formal process set out in the Acas Code of Practice.','Acas gives free, impartial advice; HMRC can make an employer pay back minimum wage.'][p]);
  S.order.sort((a,b)=>(S.pos[a]??9)-(S.pos[b]??9)||a-b);return refresh()}S.miss=p;
 no(p>S.k?`Not yet. ${p===3?'Outside help comes after you have tried to sort it out at work.':p===2?'A formal grievance comes after an informal chat has not worked.':'Talk to your manager once you have checked the facts.'}`:'That step is done already.')}
/* pointer */
function down(p){const m=mode();
 if(m==='pay'||m==='duty'){const L=m==='pay'?OFFERS:DUTY,n=2;if(!L[S.i])return false;if(over(p,cardR())){S.drag={x:p.x,y:p.y};return true}const j=[0,1].find(j=>over(p,binR(j,n)));if(j!=null){(m==='pay'?payPick:dutyPick)(j);return true}return false}
 if(m==='slip'){if(!SLIPS[S.i])return false;const k=[0,1,2].find(k=>over(p,rowR(k)));if(k!=null){slipPick(k);return true}return false}
 if(m==='break'){if(!SHIFTS[S.i])return false;const j=[0,1,2].find(j=>over(p,brkR(j)));if(j!=null){brkPick(j);return true}return false}
 if(m==='plan'){const k=S.order.findIndex((_,k)=>over(p,planR(k)));if(k>=0){planPick(S.order[k]);return true}}return false}
function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!S.drag)return;const at=p||S.drag;S.drag=null;const m=mode(),j=[0,1].find(j=>over(at,binR(j,2)));if(j!=null)return(m==='pay'?payPick:dutyPick)(j);A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='pay')drawSorter(OFFERS,BIN,'From April 2026: £12.71 at 21+, £10.85 at 18–20, £8.00 under 18 and for apprentices.','Legal pay from 1 April 2026? Drag the offer to a box, or tap a box.');
 if(m==='slip')drawSlip();if(m==='break')drawBreak();if(m==='duty')drawSorter(DUTY,DBIN,'Rights come with responsibilities on both sides.','Is it your right or your responsibility? Drag or tap.');if(m==='plan')drawPlan();
 if(m==='chal'){top('Know your rate, check every payslip, know your breaks, and know who to ask.');tileText({x:A.W*.1,y:A.H*.3,w:A.W*.8,h:A.H*.3},'£12.71 (21+) · £10.85 (18–20) · £8.00 (under 18, apprentices)',15)}
 if(m==='pay'&&OFFERS[S.i]){}foot();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='pay'){const v=OFFERS[S.i];s=v?`Offer: ${v[0]}. Legal or below the minimum? Sorted ${S.sorted.length} of ${OFFERS.length}.`:'All five offers sorted.'}
 if(m==='slip'){const v=SLIPS[S.i];s=v?`Payslip for ${v.who}. ${v.rota}. ${v.rows.map(r=>r[0]+' '+r[1]).join('; ')}.`:'All three payslips checked.'}
 if(m==='break'){const v=SHIFTS[S.i];s=v?`${v[0]}, ${String(v[1]).replace('.5',' and a half')}-hour shift. Options: ${BRK.join(', ')}.`:'All three shifts done.'}
 if(m==='duty'){const v=DUTY[S.i];s=v?`Card: ${v[0]}. Right or responsibility? Sorted ${S.sorted.length} of ${DUTY.length}.`:'All seven cards sorted.'}
 if(m==='plan')s=`Steps placed: ${S.k} of 4. ${S.order.filter(p=>S.pos[p]==null).map(p=>PLAN[p]).join('; ')||'All in order.'}`;
 speak((S.msg?S.msg+' ':'')+s);btns();S.then()}
function btns(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='pay'&&OFFERS[S.i])BIN.forEach((t,j)=>b(t,()=>payPick(j),`${OFFERS[S.i][0]}: ${t}`));
 if(m==='slip'&&SLIPS[S.i])SLIPS[S.i].rows.forEach((r,k)=>b(`${r[0]}: ${r[1]}`,()=>slipPick(k),`Flag ${r[0]} ${r[1]} as wrong`));
 if(m==='break'&&SHIFTS[S.i])BRK.forEach((t,j)=>b(t,()=>brkPick(j),`${SHIFTS[S.i][0]}: ${t}`));
 if(m==='duty'&&DUTY[S.i])DBIN.forEach((t,j)=>b(t,()=>dutyPick(j),`${DUTY[S.i][0]}: ${t}`));
 if(m==='plan'&&S.k<PLAN.length)S.order.filter(p=>S.pos[p]==null).forEach(p=>b(PLAN[p],()=>planPick(p),`Next step: ${PLAN[p]}`));
 A.redraw()}
const finish=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const clean=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,k:0,sorted:[],order:[2,0,3,1],pos:{},drag:null,miss:null,msg:'',bad:false})};
const steps=[
{h:'Is the pay legal?',p:'The National Minimum Wage depends on your age. From 1 April 2026 it is £12.71 an hour at 21 and over (the National Living Wage), £10.85 at 18 to 20, and £8.00 under 18. Rates rise every April.',
predict:{q:'Jo is 17. What is the lowest legal hourly rate for her from April 2026?',opts:['£8.00','£12.71','There is no minimum under 18'],ans:0},
task:'Sort 5 pay offers',show:()=>{steps[0].go();play(OFFERS.map(v=>()=>payPick(v[1])),400)},go:()=>{clean();refresh();S.then=finish(0,()=>S.i>=OFFERS.length,'The minimum depends on age.')}},
{h:'Check the payslip',p:'Your employer must give you an itemised payslip every payday. Check the hours against your rota, the rate against the minimum, and any deductions.',
predict:{q:'Kit\'s boss takes £30 from his pay for the uniform he must wear, and that drops him below the minimum wage. Is that allowed?',opts:['No','Yes, the uniform is his cost','Yes, if he signed for it'],ans:0},
task:'Find 3 payslip errors',show:()=>{steps[1].go();play(SLIPS.map(s=>()=>slipPick(s.rows.findIndex(r=>r[2]===s.bad))),500)},go:()=>{clean();refresh();S.then=finish(1,()=>S.i>=SLIPS.length,'Check every line, every payday.')}},
{h:'Rest breaks',p:'Workers aged 18 and over get one 20-minute break if they work more than 6 hours in a day. Under 18s get 30 minutes if they work more than 4½ hours. Breaks do not have to be paid.',
predict:{q:'Ana is 17 and works a 5-hour shift. Is she owed a break?',opts:['Yes, 30 minutes','No, only after 6 hours','Only if she asks'],ans:0},
task:'Set the break for 3 shifts',show:()=>{steps[2].go();play(SHIFTS.map(s=>()=>brkPick(s[2])),450)},go:()=>{clean();refresh();S.then=finish(2,()=>S.i>=SHIFTS.length,'Age and shift length set the break.')}},
{h:'Right or responsibility?',p:'The law gives you rights at work. Your employer can also expect things from you.',
task:'Sort 7 cards',show:()=>{steps[3].go();play(DUTY.map(v=>()=>dutyPick(v[1])),350)},go:()=>{clean();refresh();S.then=finish(3,()=>S.i>=DUTY.length,'Both sides have duties.')}},
{h:'If something is wrong',p:'Most problems are fixed inside work. Put the steps in a sensible order.',
task:'Order 4 steps',show:()=>{steps[4].go();play([0,1,2,3].map(p=>()=>planPick(p)),400)},go:()=>{clean();refresh();S.then=finish(4,()=>S.k>=PLAN.length,'Check, talk, write, then get help.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['Dev is 20. What is the lowest legal hourly rate for him from April 2026?','£10.85',[['£12.71','old21'],['£8.00','young']]],
['Lucy is 18 and works a 7-hour shift. What break is she owed by law?','20 minutes',[['30 minutes','young18'],['None if the shop is busy','busy']]],
['Who must give you an itemised payslip?','Your employer, every payday',[['Only if you ask for one','ask'],['Only full-time staff get one','fulltime']]],
['Tom, 24, is paid £12.71 an hour for 10 hours. What is his gross pay?','£127.10',[['£12.71','onehour'],['£1,271.00','decimal']]],
['Which of these is your responsibility at work?','Following the safety rules you were trained in',[['Writing your own payslip','payslip'],['Setting your own minimum wage','setrate']]],
['Your pay is still wrong after you talked to your manager. What is a good next step?','Raise a formal grievance in writing',[['Stop going in without telling anyone','quit'],['Post about it online first','post']]]];
function why(tag){let m='Check your age rate, your payslip and your breaks, and get advice if something is wrong.';
 if(tag==='old21')m='£12.71 is the rate for 21 and over. At 18 to 20 the minimum is £10.85.';
 if(tag==='young')m='£8.00 is the under-18 and apprentice rate. At 20 Dev must get at least £10.85.';
 if(tag==='young18')m='30 minutes is for under 18s. At 18 Lucy is an adult worker: 20 minutes for a shift over 6 hours.';
 if(tag==='busy')m='The 20-minute break is a legal right for a shift over 6 hours. Being busy does not cancel it.';
 if(tag==='ask')m='Every employee and worker has the right to an itemised payslip on or before payday, without asking.';
 if(tag==='fulltime')m='Part-time workers have the same right to an itemised payslip as full-time staff.';
 if(tag==='onehour')m='£12.71 is one hour\'s pay. For 10 hours multiply: 10 × £12.71 = £127.10.';
 if(tag==='decimal')m='The decimal point moved too far: 10 × £12.71 is £127.10, not £1,271.';
 if(tag==='payslip')m='Payslips are your employer\'s job. Yours include being on time and following safety training.';
 if(tag==='setrate')m='The government sets the minimum wage each April. Your job is to do the work you agreed to.';
 if(tag==='quit')m='Walking out can cost you your job and your claim. Put the problem in writing as a grievance first.';
 if(tag==='post')m='Posting first can break your contract and does not fix the pay. Use a written grievance, then Acas.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Work rights lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
