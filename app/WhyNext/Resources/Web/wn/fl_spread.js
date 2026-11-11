/* Flagship – statistical questions and variability (ages 11–13). A statistical question expects answers that vary.
   Learners sort questions, collect answers onto a dot plot and judge whether they vary, drag dots to change the
   centre and spread of a data set (same mean, different spread), and compare two classes by centre and spread.
   Mean, median and range update live; every drag has button controls and every wrong choice gets a reason. */
(()=>{
const SORT=[['How many pets do pupils in my class have?',1,'Each pupil can give a different number, so the answers vary.'],['How old am I?',0,'There is one true answer, so nothing varies.'],
 ['How tall are the pupils in Year 7?',1,'Heights differ from pupil to pupil: that is variability.'],['How many days are in a week?',0,'Everyone gives 7. A number answer alone does not make it statistical.'],
 ['How long do pupils take to get to school?',1,'Travel times differ, so we expect a spread of answers.'],['How many pupils are in class 7B today?',0,'One count gives one answer, so it is not statistical.']];
const ASK=[['How many legs does a dog have?',[4,4,4,4,4,4],0,'🐕'],['How many pets do you have?',[0,2,1,3,1,0],1,'🐹'],
 ['How many letters are in the word Monday?',[6,6,6,6,6,6],0,'📅'],['How many hours did you sleep last night?',[9,8,10,7,9,8],1,'😴']];
const GOALS=[['Squash the spread: make the range 0 but keep the mean at 5.',d=>rng(d)===0&&avg(d)===5,[5,5,5,5,5,5,5]],
 ['Spread it out: range of at least 8, mean still 5.',d=>rng(d)>=8&&avg(d)===5,[1,5,5,5,5,5,9]],
 ['Change the shape: pile the dots left so the median is 2.',d=>med(d)===2,[1,2,2,2,5,5,9]]];
const PAIRS=[[[4,5,5,5,6,5,5],[1,3,5,7,9,5,5],'Which class has the bigger spread?',1],[[2,3,3,4,4,5],[6,7,7,8,8,9],'Which class has the lower centre?',0],
 [[1,9,2,8,5,5],[5,5,4,6,5,5],'Which class is more consistent (smaller spread)?',1],[[7,8,8,9,9,10],[2,4,6,8,9,10],'Which class has the higher median?',0]];
const sum=d=>d.reduce((a,b)=>a+b,0),avg=d=>Math.round(sum(d)/d.length*100)/100,rng=d=>Math.max(...d)-Math.min(...d);
const med=d=>{const s=d.slice().sort((a,b)=>a-b),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2};
VIS.reg('flagspread',c=>{let A,ctl,chal,qi=-1,best=0,ticket=0;
const G={k:0,pts:0,need:4,got:[],val:[],sel:0,lock:0,auto:0,bad:null,grab:null,fin:null};
const wipe=()=>{ticket++;Object.assign(G,{k:0,pts:0,need:4,got:[],val:[1,3,4,5,6,7,9],sel:0,lock:0,auto:0,bad:null,grab:null,fin:null})};
const part=()=>['look','sort','ask','shape','pair','end'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1));
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const label=(t,x,y,px,col,wt,mw)=>{const g=A.ctx;g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const ws=String(t).split(' '),ln=[];let cur='';for(const w of ws){const tr=cur?cur+' '+w:w;if(cur&&mw&&g.measureText(tr).width>mw){ln.push(cur);cur=w}else cur=tr}ln.push(cur);
 ln.forEach((l,i)=>g.fillText(l,x,y+(i-(ln.length-1)/2)*u(px)*1.3))};
const pill=(r,hue,o)=>{const g=A.ctx,C=A.col,cc=hue?C[hue]:C.ln;g.save();A.paint.shadow(5,2,.12);g.fillStyle=hue?A.mix(C.pn,cc,.2):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,o||14);g.fill();A.paint.noShadow();g.lineWidth=2.5;g.strokeStyle=cc;g.stroke();g.restore()};
const pic=(e,x,y,s)=>{const g=A.ctx;g.font=`${u(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)};
/* dot plot on an axis 0..10; returns dot positions for hit tests */
function plot(d,x,y,w,hue,mark,title){const g=A.ctx,C=A.col,step=w/10,rad=Math.min(u(9),step*.42),cnt={},out=[];
 g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.stroke();
 for(let v=0;v<=10;v++){g.beginPath();g.moveTo(x+v*step,y);g.lineTo(x+v*step,y+5);g.stroke();label(v,x+v*step,y+u(13),11,C.mu,700)}
 d.forEach((v,i)=>{cnt[v]=(cnt[v]||0)+1;const cx=x+v*step,cy=y-rad-2-(cnt[v]-1)*(rad*2+3);out.push({i,cx,cy});g.beginPath();g.arc(cx,cy,rad,0,7);g.fillStyle=C[hue]||C.cy;g.fill();
  if(i===mark){g.lineWidth=3;g.strokeStyle=C.tx;g.stroke()}});
 if(title)label(title,x+w/2,y+u(32),13,C.tx,800);return out}
const zones=()=>{const w=(A.W-36)/2,h=u(64),y=A.H*.74;return[{v:1,t:'Statistical',x:12,y,w,h},{v:0,t:'Not statistical',x:24+w,y,w,h}]};
const verdicts=()=>{const w=(A.W-36)/2,h=u(58),y=A.H*.8;return[{v:1,t:'Answers vary',x:12,y,w,h},{v:0,t:'Same every time',x:24+w,y,w,h}]};
const classes=()=>{const w=(A.W-36)/2,h=u(56),y=A.H*.82;return[{v:0,t:'Class A',x:12,y,w,h},{v:1,t:'Class B',x:24+w,y,w,h}]};
const axis=()=>({x:u(22),y:A.H*.62,w:A.W-u(44)});
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part();
 if(p==='end'){label('Is it statistical? What are the centre and the spread?',W/2,H*.45,17,C.tx,800,W-40);return}
 if(p==='look'){label('Same question, same answer? Or answers that vary?',W/2,H*.07,16,C.tx,900,W-24);
  plot([4,4,4,4,4],u(22),H*.42,W-u(44),'am',-1,'How many legs does a dog have?');plot([0,1,1,2,0,3,5],u(22),H*.82,W-u(44),'cy',-1,'How many pets do you have?');return}
 if(p==='sort'){const it=SORT[G.k];if(!it)return;const card={x:16,y:H*.2,w:W-32,h:H*.3};
  if(G.grab&&G.grab.x!=null){card.x=G.grab.x-card.w/2;card.y=G.grab.y-card.h/2}
  label('Drag the question into a box, or use the buttons.',W/2,H*.08,14,C.mu,700,W-24);pill(card,'vi');label(it[0],card.x+card.w/2,card.y+card.h/2,19,C.tx,800,card.w-24);
  zones().forEach(z=>{pill(z,G.bad===z.v?'rd':z.v?'gr':'am');label(z.t,z.x+z.w/2,z.y+z.h/2,16,C.tx,800,z.w-10)});return}
 if(p==='ask'){const it=ASK[G.k];if(!it)return;pic(it[3],W/2,H*.09,38);label(it[0],W/2,H*.21,17,C.tx,800,W-24);const a=axis();
  plot(G.got,a.x,H*.6,a.w,it[2]?'cy':'am',-1);label(G.got.length<6?`Answers so far: ${G.got.length} of 6. Tap the plot to ask.`:'Do the answers vary?',W/2,H*.71,14,C.mu,700,W-24);
  if(G.got.length>=6)verdicts().forEach(z=>{pill(z,G.bad===z.v?'rd':'vi');label(z.t,z.x+z.w/2,z.y+z.h/2,16,C.tx,800,z.w-8)});A.fx.draw(g);return}
 if(p==='shape'){const goal=GOALS[G.k];if(!goal)return;label(goal[0],W/2,H*.1,16,C.tx,800,W-24);const a=axis(),d=G.val;plot(d,a.x,a.y,a.w,'vi',G.sel);
  const m=avg(d),x=a.x+m/10*a.w;g.strokeStyle=C.am;g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.moveTo(x,a.y-u(100));g.lineTo(x,a.y);g.stroke();g.setLineDash([]);
  const lo=a.x+Math.min(...d)/10*a.w,hi=a.x+Math.max(...d)/10*a.w;g.fillStyle=C.gr;g.fillRect(lo,a.y+u(26),Math.max(hi-lo,3),5);
  label(`mean ${m}   median ${med(d)}   range ${rng(d)}`,W/2,H*.82,17,C.tx,900,W-20);label('dashed line = mean, green bar = range',W/2,H*.9,12,C.mu,700,W-20);A.fx.draw(g);return}
 if(p==='pair'){const it=PAIRS[G.k];if(!it)return;label(it[2],W/2,H*.07,16,C.tx,900,W-24);plot(it[0],u(22),H*.33,W-u(44),'am',-1,'Class A');plot(it[1],u(22),H*.66,W-u(44),'cy',-1,'Class B');
  classes().forEach(z=>{pill(z,G.bad===z.v?'rd':z.v?'cy':'am');label(z.t,z.x+z.w/2,z.y+z.h/2,16,C.tx,800)});A.fx.draw(g)}}
function nope(msg,v){A.sound.miss();G.bad=v;voice(msg);A.redraw();setTimeout(()=>{G.bad=null;A.redraw()},G.auto||A.reduced()?10:1300)}
function gain(msg,adv){G.pts++;A.sound.pop();voice(msg);pad();A.redraw();if(G.pts>=G.need)return G.fin&&G.fin();
 const t=ticket;G.lock=1;setTimeout(()=>{if(t!==ticket)return;G.k++;G.got=[];G.lock=0;if(adv)adv();voice('Next one.');pad();A.redraw()},G.auto||A.reduced()?5:1400)}
function sortTo(v){if(G.lock||G.pts>=G.need)return;const it=SORT[G.k];if(v===it[1])return gain(`${v?'Statistical':'Not statistical'}. ${it[2]}`);
 nope(v?`Not quite: ${it[2]} A statistical question expects different answers.`:`Not quite: ${it[2]}`,v)}
function askOne(){if(part()!=='ask'||G.lock||G.got.length>=6)return;const it=ASK[G.k];G.got.push(it[1][G.got.length]);A.sound.tick();voice(`Answer: ${G.got[G.got.length-1]}.`);pad();A.redraw()}
function judge(v){if(G.lock||G.got.length<6||G.pts>=G.need)return;const it=ASK[G.k];
 if(v===it[2])return gain(v?`The answers spread from ${Math.min(...G.got)} to ${Math.max(...G.got)}: range ${rng(G.got)}. That is a statistical question.`:'Every answer is the same, range 0. No variability, so not a statistical question.');
 nope(v?'Look at the plot: every dot sits in one stack. The range is 0, so the answers do not vary.':`The dots spread out, range ${rng(G.got)}. Different people gave different answers.`,v)}
function nudge(dx){if(part()!=='shape'||G.lock)return;const d=G.val;d[G.sel]=Math.max(0,Math.min(10,d[G.sel]+dx));A.sound.tick();test()}
function test(){const goal=GOALS[G.k];if(!goal||G.lock||G.pts>=G.need)return;const d=G.val;voice(`mean ${avg(d)}, median ${med(d)}, range ${rng(d)}`);A.redraw();
 if(goal[1](d))gain(['Range 0: every value is 5. The centre is 5 and there is no spread at all.','Same mean of 5, but now a range of '+rng(d)+'. Centre alone hides the spread.','Median 2: most values sit low and a few stretch right, so the shape is skewed.'][G.k])}
function choose(v){if(G.lock||G.pts>=G.need)return;const it=PAIRS[G.k],a=it[0],b=it[1],info=`A: median ${med(a)}, range ${rng(a)}. B: median ${med(b)}, range ${rng(b)}.`;
 if(v===it[3])return gain(`Yes. ${info}`);nope(`Check the numbers. ${info} ${/spread|consistent/.test(it[2])?'Spread is about the range, not the centre.':'Centre is about the middle value, not the spread.'}`,v)}
function pad(){if(!ctl)return;ctl.innerHTML='';const p=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},ctl,t);e.onclick=f};
 if(G.pts>=G.need||G.lock||p==='look'||p==='end')return;
 if(p==='sort'){b('Statistical',()=>sortTo(1),'Sort as statistical');b('Not statistical',()=>sortTo(0),'Sort as not statistical')}
 if(p==='ask'){if(G.got.length<6)b('Ask a pupil',askOne);else{b('Answers vary',()=>judge(1));b('Same every time',()=>judge(0))}}
 if(p==='shape'){b('Next dot',()=>{G.sel=(G.sel+1)%G.val.length;voice(`Dot ${G.sel+1} selected, value ${G.val[G.sel]}`);A.redraw()},'Select the next dot');b('◀',()=>nudge(-1),'Move the dot left');b('▶',()=>nudge(1),'Move the dot right')}
 if(p==='pair'){b('Class A',()=>choose(0));b('Class B',()=>choose(1))}}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(pt){const p=part();if(G.lock||G.pts>=G.need)return false;
 if(p==='sort'){G.grab={x:null,sx:pt.x,sy:pt.y};return true}
 if(p==='ask'){if(G.got.length<6){askOne();return false}const z=verdicts().find(z=>inside(pt,z));if(z)judge(z.v);return false}
 if(p==='pair'){const z=classes().find(z=>inside(pt,z));if(z)choose(z.v);return false}
 if(p==='shape'){const a=axis(),step=a.w/10;let bi=-1,bd=1e9,cnt={};G.val.forEach((v,i)=>{cnt[v]=(cnt[v]||0)+1;const cx=a.x+v*step,cy=a.y-u(11)-(cnt[v]-1)*u(21),dd=Math.hypot(pt.x-cx,pt.y-cy);if(dd<bd){bd=dd;bi=i}});
  if(bi<0||bd>u(40))return false;G.sel=bi;G.grab={i:bi};A.redraw();return true}return false}
function move(pt){const d=G.grab;if(!d)return;const p=part();
 if(p==='sort'){if(d.x!=null||Math.hypot(pt.x-d.sx,pt.y-d.sy)>8){d.x=pt.x;d.y=pt.y;A.redraw()}return}
 if(p==='shape'){const a=axis(),v=Math.max(0,Math.min(10,Math.round((pt.x-a.x)/(a.w/10))));if(v!==G.val[d.i]){G.val[d.i]=v;A.redraw()}}}
function up(pt){const d=G.grab;G.grab=null;if(!d)return;const p=part();
 if(p==='sort'){A.redraw();const z=zones().find(z=>pt.y>z.y-u(40)&&pt.x>=z.x&&pt.x<=z.x+z.w);if(d.x!=null&&z)return sortTo(z.v);if(d.x!=null)voice('Drop the question into one of the two boxes.');return}
 if(p==='shape')test()}
function solve(){const p=part();if(p==='sort')return sortTo(SORT[G.k][1]);if(p==='ask'){if(G.got.length<6)return askOne();return judge(ASK[G.k][2])}
 if(p==='shape'){G.val=GOALS[G.k][2].slice();return test()}if(p==='pair')return choose(PAIRS[G.k][3])}
const close=(n,msg)=>()=>{if(A.step===n&&G.pts>=G.need&&A.pred[n]!=null)A.done(msg+A.reveal(n))};
const showMe=n=>()=>{steps[n].go();G.auto=1;const t=ticket,tick=()=>{if(t!==ticket||A.step!==n||G.pts>=G.need)return;if(!G.lock)solve();setTimeout(tick,60)};setTimeout(tick,30)};
const steps=[
{h:'Answers that vary',p:'A statistical question expects answers that vary. Every dog has 4 legs, so that data has no spread. Pupils own different numbers of pets, so that data varies.',go:()=>{wipe();voice('Top plot: one stack, no variability. Bottom plot: answers spread out.')}},
{h:'Statistical or not?',p:'Sort each question. Ask yourself: would different people, or different times, give different answers?',predict:{q:'How many days are in a week? has a number answer. Is it a statistical question?',opts:['Yes, any number question is statistical','No, everyone gives the same answer'],ans:1},task:'Sort 6 questions',show:showMe(1),
 go:()=>{wipe();G.need=6;voice('Drag the question into a box.');pad();G.fin=close(1,'A statistical question expects variability in its answers. One fixed answer, even a number, is not statistical.')}},
{h:'Collect and look',p:'Ask six pupils each question and watch the dot plot grow. Then decide: do the answers vary?',predict:{q:'Ask 6 pupils how many legs a dog has. What will the dot plot look like?',opts:['Dots spread from 2 to 6','One tall stack at 4'],ans:1},task:'Judge 4 questions',show:showMe(2),
 go:()=>{wipe();voice('Tap the plot or the button to ask a pupil.');pad();G.fin=close(2,'When every answer is the same, the range is 0 and the question is not statistical.')}},
{h:'Centre, spread and shape',p:'A data set has a distribution. Its centre is a typical value, like the mean or median. Its spread shows how far the values range. Drag the dots to hit each goal.',predict:{q:'Two data sets both have a mean of 5. Must they look the same?',opts:['Yes, the same mean means the same data','No, the spread can be very different'],ans:1},task:'Hit 3 goals',show:showMe(3),
 go:()=>{wipe();G.need=3;voice('Drag a dot, or pick a dot and use the arrows.');pad();G.fin=close(3,'Centre, spread and shape describe a distribution. The same mean can hide a range of 0 or a range of 8.')}},
{h:'Compare two classes',p:'Two classes answered the same question. Compare their centres and spreads to answer each question.',predict:{q:'Class A: 4, 5, 5, 5, 6. Class B: 1, 3, 5, 7, 9. Both have a mean of 5. Which is more consistent?',opts:['Class B','Class A'],ans:1},task:'Compare 4 pairs',show:showMe(4),
 go:()=>{wipe();voice('Read the question, then tap Class A or Class B.');pad();G.fin=close(4,'To compare data sets, describe both the centre and the spread: a smaller range means more consistent answers.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.fin&&G.fin()});
const QS=[['Which is a statistical question?',[['How long do Year 7 pupils sleep each night?','ok'],['How long did I sleep last night?','one'],['How many hours are in a day?','fixed']]],
 ['Data: 3, 3, 3, 3, 3. What is the range?',[['0','ok'],['3','mean'],['5','count']]],
 ['Data: 2, 4, 4, 5, 10. What is the median?',[['4','ok'],['5','meanv'],['8','rangev']]],
 ['Two classes have the same mean score. What can still differ?',[['The spread of the scores','ok'],['Nothing at all','same'],['The mean','mean2']]],
 ['Why is How old am I? not a statistical question?',[['It has only one answer','ok'],['It is about age','topic'],['It uses a number','num']]],
 ['Scores A: 6, 7, 7, 8. Scores B: 1, 5, 9, 13. Which is more spread out?',[['B','ok'],['A','revs'],['They are the same','same']]]];
function why(t){let m='Think about whether answers vary, then about centre and spread.';
 if(t==='one')m='That asks about one night for one person, so it has one answer. Ask a group to get variability.';
 if(t==='fixed')m='Every day has 24 hours, so every answer is the same. Not statistical.';
 if(t==='mean')m='3 is the mean and the median. The range is largest minus smallest: 3 − 3 = 0.';
 if(t==='count')m='5 is how many values there are. Range = largest − smallest = 0.';
 if(t==='meanv')m='5 is the mean. The median is the middle value when sorted: 2, 4, 4, 5, 10 gives 4.';
 if(t==='rangev')m='8 is the range. The median is the middle value: 4.';
 if(t==='same')m='The same mean can come from tightly packed or widely spread data.';if(t==='mean2')m='The mean is the same by the question. It is the spread that can differ.';
 if(t==='topic')m='Ages of a class would be statistical. The problem is that one person has one age.';if(t==='num')m='Plenty of number questions are statistical. What matters is whether answers vary.';
 if(t==='revs')m='A has range 8 − 6 = 2. B has range 13 − 1 = 12, so B is more spread out.';return m}
function quiz(){qi++;const [q,ops]=QS[qi%QS.length],r=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const e=c.el('button',{type:'button',class:'lbtn'},box,o);e.onclick=()=>verdict(t)});voice('Challenge: '+q);A.redraw()}
function verdict(t){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=t==='ok',fb=chal.querySelector('.fl-fb');if(ok){best++;A.win()}else{best=0;A.sound.miss()}
 fb.innerHTML=(ok?`✓ Correct. Run: ${best}.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},box);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pad()}});
A.start()})})();
