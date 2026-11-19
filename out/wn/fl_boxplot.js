/* Flagship – Box plots (ages 13–15; CCSS 6.SP.B.4 and S-ID.A.1–2, GCSE S4). Scenes: drag five markers onto a number
   line to draw a box plot from its five-number summary; tap the four parts of a plot under its dot plot and find 3 of
   the 12 values in each, however long the part; read median, IQR and range off a plot; compare two classes by median
   and IQR; check a robot. Data in learn/boxplot_art.js. Distinct from flagiqr (lesson 850, finding quartiles from an
   ordered list): here the learner builds, reads and compares the box plot itself. */
(()=>{const D=BXP;
VIS.reg('flagboxplot',c=>{let A,ctl,quiz,cq=-1,era=0;const S={};
const PAPER='#f8fafc',INK='#0f172a',GREY='#64748b',OK='#15803d',BAD='#b91c1c',BOXF='#bfdbfe',BOXS='#1d4ed8',HI='#fde68a',PICK='#7c3aed';
const mode=()=>['draw','split','read','comp','robot','chal'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.12);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=PAPER;g.fillRect(0,0,A.W,A.H)}
/* a white pill of dark text that shrinks to fit */
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=fz(o.f||14);g.font=`700 ${f}px system-ui,sans-serif`;while(g.measureText(t).width+20>A.W-8&&f>9){f--;g.font=`700 ${f}px system-ui,sans-serif`}
 const w=g.measureText(t).width+20,h=f+13,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?2.5:1.2;g.strokeStyle=o.ok?OK:o.no?BAD:GREY;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
/* number line: returns value->x and x->value */
function line(sc,y){const x0=22,x1=A.W-22,X=v=>x0+(v-sc.lo)/(sc.hi-sc.lo)*(x1-x0),V=x=>sc.lo+(x-x0)/(x1-x0)*(sc.hi-sc.lo),g=A.ctx;
 g.strokeStyle=INK;g.lineWidth=1.5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.fillStyle=INK;g.font=`600 ${fz(11)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';
 const lab=A.narrow&&sc.hi-sc.lo>=50?sc.step*2:sc.step;for(let v=sc.lo;v<=sc.hi;v+=sc.step){g.beginPath();g.moveTo(X(v),y-4);g.lineTo(X(v),y+4);g.stroke();if((v-sc.lo)%lab===0)g.fillText(String(v),X(v),y+7)}return{X,V,x0,x1}}
/* the plot itself: whiskers, box, median line */
function plot(L,f,y,h,o){o=o||{};const g=A.ctx,[a,q1,m,q3,b]=f.map(L.X);g.strokeStyle=o.col||BOXS;g.lineWidth=2.2;g.beginPath();g.moveTo(a,y);g.lineTo(q1,y);g.moveTo(q3,y);g.lineTo(b,y);
 g.moveTo(a,y-h*.3);g.lineTo(a,y+h*.3);g.moveTo(b,y-h*.3);g.lineTo(b,y+h*.3);g.stroke();g.fillStyle=o.fill||BOXF;g.fillRect(q1,y-h/2,q3-q1,h);g.strokeRect(q1,y-h/2,q3-q1,h);
 g.lineWidth=3.5;g.strokeStyle=INK;g.beginPath();g.moveTo(m,y-h/2);g.lineTo(m,y+h/2);g.stroke()}
/* ---------- 1. draw from five numbers ---------- */
const axisY=()=>A.H*.62;
function drawDraw(){const s=S.draw,g=A.ctx;ground();if(s.i>=D.DRAW.sets.length){pill('All 3 box plots drawn',A.W/2,A.H*.2,{ok:1});pill('Whiskers to min and max, box from Q1 to Q3',A.W/2,A.H*.4,{f:12});return}
 const T=D.DRAW.sets[s.i],L=line(D.DRAW,axisY());pill(`Plot ${s.i+1} of 3: ${T.what}`,A.W/2,A.H*.07,{f:13,ok:s.wait});
 const cw=(A.W-16)/5;D.NAMES.forEach((n,j)=>{const ok=s.v[j]===T.five[j];pill(`${j===2?'Med':n} ${T.five[j]}`,8+cw*j+cw/2,A.H*.19,{f:11,ok,bg:ok?'#dcfce7':'#ffffff'})});
 const sorted=s.v.every((v,j)=>!j||v>=s.v[j-1]);if(sorted)plot(L,s.v,A.H*.38,A.H*.12,{fill:s.wait?'#bbf7d0':BOXF});else pill('Markers out of order: Min ≤ Q1 ≤ Median ≤ Q3 ≤ Max',A.W/2,A.H*.38,{f:11,no:1});
 s.v.forEach((v,j)=>{const x=L.X(v),ok=v===T.five[j],y=axisY();g.fillStyle=j===s.sel?PICK:ok?OK:'#ffffff';g.strokeStyle=j===s.sel?PICK:ok?OK:INK;g.lineWidth=2.5;
  g.beginPath();g.arc(x,y,j===s.sel?11:9,0,Math.PI*2);g.fill();g.stroke();const below=A.H*[.74,.83,.92][j%3];g.beginPath();g.moveTo(x,y+11);g.lineTo(x,below-10);g.lineWidth=1;g.stroke();
  pill(`${j===2?'Med':D.NAMES[j]} ${v}`,x,below,{f:11,ok,bg:j===s.sel?'#ede9fe':'#ffffff'})})}
function nudge(j,v){const s=S.draw;if(s.wait||s.i>=D.DRAW.sets.length)return;const T=D.DRAW.sets[s.i];v=Math.max(D.DRAW.lo,Math.min(D.DRAW.hi,Math.round(v)));s.sel=j;if(s.v[j]===v)return A.redraw();s.v[j]=v;A.sound.tick();
 const n=D.NAMES[j],good=s.v.filter((x,k)=>x===T.five[k]).length;
 if(good<5)return say(`${n} is at ${v}`+(v===T.five[j]?', which matches. ':`; the summary says ${T.five[j]}. `)+`${good} of 5 markers placed.`);
 pause(s,()=>{s.i++;s.v=D.DRAW.start.slice();s.sel=-1},`Box plot drawn for ${T.what.toLowerCase()}: min ${T.five[0]}, Q1 ${T.five[1]}, median ${T.five[2]}, Q3 ${T.five[3]}, max ${T.five[4]}.`)}
/* hold a finished plot for a moment, then move on */
function pause(s,then,msg){A.sound.pop();if(s.last&&s.last()){then();say(msg);return}s.wait=true;say(msg);const e=era;setTimeout(()=>{if(e!==era)return;s.wait=false;then();A.redraw();keys()},A.reduced()?50:800)}
/* ---------- 2. a quarter in each part ---------- */
function splitGeo(){const L=line(D.SPLIT,A.H*.6);return L}
function drawSplit(){const s=S.split,g=A.ctx;ground();if(s.i>=D.SPLIT.sets.length){pill('Both plots split',A.W/2,A.H*.2,{ok:1});pill('Each part holds a quarter of the values',A.W/2,A.H*.4,{f:12});return}
 const T=D.SPLIT.sets[s.i],L=splitGeo(),f=T.five,r=Math.max(4,Math.min(7,(L.x1-L.x0)/(D.SPLIT.hi-D.SPLIT.lo)*.45));pill(`${T.what}: 12 values`,A.W/2,A.H*.07,{f:13,ok:s.wait});
 const seen={};T.data.forEach(v=>{const k=seen[v]=(seen[v]||0)+1,pt=part(f,v),on=s.got.includes(pt);g.fillStyle=on?['#f59e0b','#0ea5e9','#a855f7','#10b981'][pt]:'#94a3b8';g.strokeStyle=INK;g.lineWidth=1;
  g.beginPath();g.arc(L.X(v),A.H*.5-(k-1)*r*2.2,r,0,Math.PI*2);g.fill();g.stroke()});
 const by=A.H*.78;s.got.forEach(pt=>{const a=L.X(f[pt]),b=L.X(f[pt+1]);g.fillStyle=HI;g.fillRect(a,by-A.H*.08,b-a,A.H*.16)});plot(L,f,by,A.H*.1);
 if(s.note)pill(s.note,A.W/2,A.H*.18,{f:12,ok:1});else pill('Tap each part of the box plot',A.W/2,A.H*.18,{f:12})}
const part=(f,v)=>v<=f[1]?0:v<=f[2]?1:v<=f[3]?2:3;
function tapPart(pt){const s=S.split;if(s.wait||s.i>=D.SPLIT.sets.length)return;const T=D.SPLIT.sets[s.i],f=T.five,n=T.data.filter(v=>part(f,v)===pt).length,len=f[pt+1]-f[pt];
 if(!s.got.includes(pt))s.got.push(pt);A.sound.tick();s.note=`${D.PART[pt]}: ${n} of 12 values`;
 const msg=`The ${D.PART[pt]} runs from ${f[pt]} to ${f[pt+1]}, ${len} wide, and holds ${n} of the 12 values: a quarter.`;
 if(s.got.length<4)return say(msg+` ${4-s.got.length} parts left.`);pause(s,()=>{s.i++;s.got=[];s.note=''},msg+' Every part holds 3 values, long or short.')}
/* ---------- 3 and 4. pick an answer from three cards ---------- */
function cards(n){const y=A.H*.66,h=(A.H-y-14)/n-6;return[...Array(n)].map((_,i)=>({i,x:10,y:y+i*(h+6),w:A.W-20,h}))}
function order(Q,turn){const all=[[Q.a,'ok'],...Q.o],r=turn%3;return all.slice(r).concat(all.slice(0,r))}
function drawCards(Q,s){const g=A.ctx;cards(3).forEach((b,i)=>{const [t]=order(Q,s.i)[i];g.fillStyle=s.miss===i?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();
 g.lineWidth=s.miss===i?2.5:1.2;g.strokeStyle=s.miss===i?BAD:GREY;g.stroke();let f=fz(13);g.font=`700 ${f}px system-ui,sans-serif`;while(g.measureText(t).width>b.w-20&&f>9){f--;g.font=`700 ${f}px system-ui,sans-serif`}
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,b.x+b.w/2,b.y+b.h/2)})}
function drawRead(){const s=S.read;ground();if(s.i>=D.READ.qs.length){pill('All 6 values read',A.W/2,A.H*.2,{ok:1});pill('Median: the line. IQR: Q3 − Q1. Range: max − min.',A.W/2,A.H*.4,{f:12});return}
 const Q=D.READ.qs[s.i],P=D.READ.plots[Q.p],L=line(D.READ,A.H*.48);pill(P.what,A.W/2,A.H*.07,{f:12});plot(L,P.five,A.H*.32,A.H*.13);pill(`${s.i+1} of 6. ${Q.q}`,A.W/2,A.H*.59,{f:13});drawCards(Q,s)}
function drawComp(){const s=S.comp,g=A.ctx;ground();if(s.i>=D.COMP.qs.length){pill('All 3 comparisons made',A.W/2,A.H*.2,{ok:1});pill('Compare a median and an IQR, in context',A.W/2,A.H*.4,{f:12});return}
 const Q=D.COMP.qs[s.i],L=line(D.COMP,A.H*.49);g.fillStyle=INK;g.font=`800 ${fz(12)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';
 g.fillText('Class A',8,A.H*.09);plot(L,D.COMP.A,A.H*.18,A.H*.1);g.fillStyle=INK;g.fillText('Class B',8,A.H*.27);plot(L,D.COMP.B,A.H*.36,A.H*.1,{fill:'#fecdd3',col:'#be123c'});pill(`${s.i+1} of 3. ${Q.q}`,A.W/2,A.H*.59,{f:13});drawCards(Q,s)}
function choose(k,i){const s=S[k],qs=k==='read'?D.READ.qs:D.COMP.qs;if(s.i>=qs.length)return;const Q=qs[s.i],[t,tag]=order(Q,s.i)[i];
 if(tag!=='ok'){s.miss=i;A.sound.miss();return say(`Not ${t}. ${D.FIX[tag]}`)}
 s.miss=-1;s.i++;A.sound.pop();say(`Yes: ${t}.`+(s.i<qs.length?' Next question.':''))}
/* ---------- 5. robot ---------- */
const rb=()=>{const w=Math.min(190,(A.W-34)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?7:-w-7),y:A.H*.74,w,h:Math.min(A.H*.17,64)}))};
function drawRobot(){const s=S.robot,g=A.ctx;ground();const L=line({lo:0,hi:50,step:5},A.H*.3);plot(L,[12,20,22,38,46],A.H*.16,A.H*.1);
 const u=Math.min(26,A.W*.06),x=A.W/2,y=A.H*.47;g.fillStyle='#e2e8f0';g.strokeStyle=INK;g.lineWidth=2;g.fillRect(x-u,y-u*.8,u*2,u*1.6);g.strokeRect(x-u,y-u*.8,u*2,u*1.6);
 g.fillStyle=INK;g.fillRect(x-u*.55,y-u*.3,u*.3,u*.3);g.fillRect(x+u*.25,y-u*.3,u*.3,u*.3);g.beginPath();g.moveTo(x,y-u*.8);g.lineTo(x,y-u*1.3);g.stroke();
 if(s.i>=D.ROBOT.length){pill('All 5 sayings checked',A.W/2,A.H*.64,{ok:1});return}const R=D.ROBOT[s.i];pill(`"${R.say}"`,A.W/2,A.H*.63,{f:12});
 rb().forEach(b=>{g.fillStyle=s.miss===b.i?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.miss===b.i?2.5:1.2;g.strokeStyle=s.miss===b.i?BAD:GREY;g.stroke();
  g.fillStyle=INK;g.font=`800 ${fz(16)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function judge(k){const s=S.robot;if(s.i>=D.ROBOT.length)return;const R=D.ROBOT[s.i];if((k===0)!==R.ok){s.miss=k;A.sound.miss();return say((R.ok?'Look again: that one is right. ':'Look again: that one is a slip. ')+R.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* ---------- pointer ---------- */
let grab=-1;
function down(p){const k=mode();
 if(k==='draw'){const s=S.draw;if(s.wait||s.i>=D.DRAW.sets.length)return false;const L=line(D.DRAW,axisY());if(Math.abs(p.y-axisY())>A.H*.3)return false;
  let best=-1,bd=30;s.v.forEach((v,j)=>{const d=Math.abs(L.X(v)-p.x);if(d<bd||(d===bd&&j===s.sel)){bd=d;best=j}});if(best<0&&s.sel>=0)best=s.sel;if(best<0)return false;
  grab=best;s.sel=best;nudge(best,L.V(p.x));return true}
 if(k==='split'){const s=S.split;if(s.i>=D.SPLIT.sets.length)return false;const L=splitGeo(),v=L.V(p.x),f=D.SPLIT.sets[s.i].five;if(p.y>A.H*.66&&p.y<A.H*.92&&v>=f[0]-2&&v<=f[4]+2)tapPart(part(f,Math.max(f[0],Math.min(f[4],v))));return false}
 if(k==='read'||k==='comp'){const b=cards(3).find(q=>hit(p,q));if(b)choose(k,b.i);return false}
 if(k==='robot'){const b=rb().find(q=>hit(p,q));if(b)judge(b.i)}return false}
function move(p){if(grab<0||mode()!=='draw')return;nudge(grab,line(D.DRAW,axisY()).V(p.x))}
function up(){grab=-1}
function reset(){era++;grab=-1;for(const k in S)delete S[k];Object.assign(S,{draw:{i:0,v:D.DRAW.start.slice(),sel:-1},split:{i:0,got:[],note:''},read:{i:0,miss:-1},comp:{i:0,miss:-1},robot:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.hook()}
function draw(){const k=mode();if(k==='chal'){ground();pill('Challenge',A.W/2,A.H*.2,{ok:1});const L=line(D.READ,A.H*.7);plot(L,[8,17,21,33,45],A.H*.5,A.H*.14);return}
 ({draw:drawDraw,split:drawSplit,read:drawRead,comp:drawComp,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* button twins for every canvas action */
function keys(){if(!ctl)return;ctl.innerHTML='';const k=mode(),b=(t,f,l,pr)=>{const e=c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},ctl,t);if(pr!=null)e.setAttribute('aria-pressed',String(pr));e.onclick=f};
 if(k==='draw'&&S.draw.i<D.DRAW.sets.length){const s=S.draw;D.NAMES.forEach((n,j)=>b(n,()=>{s.sel=j;say(`${n} picked, now at ${s.v[j]}.`)},`Pick the ${n} marker`,s.sel===j));
  if(s.sel>=0){b('◀ 1 less',()=>nudge(s.sel,s.v[s.sel]-1),`Move ${D.NAMES[s.sel]} down by 1`);b('1 more ▶',()=>nudge(s.sel,s.v[s.sel]+1),`Move ${D.NAMES[s.sel]} up by 1`)}}
 if(k==='split'&&S.split.i<D.SPLIT.sets.length)D.PART.forEach((n,j)=>b(n,()=>tapPart(j),`Count the values in the ${n}`));
 if((k==='read'||k==='comp')){const qs=k==='read'?D.READ.qs:D.COMP.qs,s=S[k];if(s.i<qs.length)order(qs[s.i],s.i).forEach(([t],i)=>b(t,()=>choose(k,i),`Answer: ${t}`))}
 if(k==='robot'&&S.robot.i<D.ROBOT.length){b('✓ Right',()=>judge(0),'The robot is right');b('✗ Slip',()=>judge(1),'The robot made a slip')}}
const fin=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(D.DESC[i]);S.hook=fin(i,ok,D.DONE[i])}
/* Show me: one move at a time, waiting while a finished plot is held */
function run(i,acts,ms){steps[i].go();const e=era,k=mode();let n=0;const go=()=>{if(e!==era)return;if(!(S[k]&&S[k].wait)){if(n>=acts.length)return;acts[n++]()}setTimeout(go,A.reduced()?30:ms)};setTimeout(go,ms)}
const rightIdx=(qs,j)=>order(qs[j],j).findIndex(x=>x[1]==='ok');
const steps=[
{h:'Draw a box plot',p:'A box plot shows five numbers: the minimum, Q1, the median, Q3 and the maximum. Drag each marker to its value. The box spans Q1 to Q3; the whiskers reach out to the min and max.',task:'Draw all 3 box plots',
 show:()=>run(0,D.DRAW.sets.flatMap(T=>T.five.map((v,j)=>()=>nudge(j,v))),150),go:()=>{begin(0,()=>S.draw.i>=D.DRAW.sets.length);S.draw.last=()=>S.draw.i>=D.DRAW.sets.length-1}},
{h:'A quarter in each part',p:'The four parts of a box plot are the two whiskers and the two halves of the box. Tap each part and count the dots above it.',
 predict:{q:'The right whisker is five times as long as the left one. Which holds more of the 12 values?',opts:['The right whisker','They hold the same number'],ans:1},task:'Count all 4 parts of both plots',
 show:()=>run(1,[0,1,2,3,0,1,2,3].map(j=>()=>tapPart(j)),260),go:()=>{begin(1,()=>S.split.i>=D.SPLIT.sets.length);S.split.last=()=>S.split.i>=D.SPLIT.sets.length-1}},
{h:'Read the plot',p:'Read the median from the line inside the box. The IQR is Q3 − Q1, the width of the box. The range is max − min.',task:'Answer all 6',
 show:()=>run(2,D.READ.qs.map((_,j)=>()=>choose('read',rightIdx(D.READ.qs,j))),300),go:()=>begin(2,()=>S.read.i>=D.READ.qs.length)},
{h:'Compare two classes',p:'To compare, give one average (the median) and one measure of spread (the IQR), and say what they mean.',
 predict:{q:'Class B has the highest score of anyone. Does that mean Class B usually scored higher?',opts:['Yes','No: compare the medians'],ans:1},task:'Make all 3 comparisons',
 show:()=>run(3,D.COMP.qs.map((_,j)=>()=>choose('comp',rightIdx(D.COMP.qs,j))),400),go:()=>begin(3,()=>S.comp.i>=D.COMP.qs.length)},
{h:'Check the robot',p:'The robot reads the plot at the top. Is each claim right, or a slip?',task:'Check all 5 claims',
 show:()=>run(4,D.ROBOT.map(R=>()=>judge(R.ok?0:1)),400),go:()=>begin(4,()=>S.robot.i>=D.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function why(t){let m='Read the five numbers from the plot first, then decide.';
 if(t==='q3')m='That is just Q3. The IQR is a difference: Q3 − Q1.';
 if(t==='add')m='Subtract, do not add: a spread is the gap between two values.';
 if(t==='max')m='That is the maximum on its own. The range is max − min.';
 if(t==='long')m='Each whisker and each half of the box holds a quarter of the data. Length shows spread, not how many.';
 if(t==='centre')m='The median is the line inside the box, wherever it sits. It need not be the centre.';
 if(t==='spread')m='Same median, so look at spread: the smaller IQR is the more consistent group.';
 if(t==='five')m='A box plot shows min, Q1, median, Q3 and max. It never shows the mean or the mode.';
 return m}
function ask(){cq++;const Q=D.QS[cq%D.QS.length],r=cq%3,all=[[Q.a,'ok'],...Q.o],list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{quiz.hidden=x.step!==5;ctl.hidden=x.step===5;keys()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Box plots lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
