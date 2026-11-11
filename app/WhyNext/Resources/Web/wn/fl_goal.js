/* Flagship – personal goal-setting (ages 9–11): sharpen a vague goal into a specific, measurable goal with a time frame;
   drag a goal-size dial into the stretch zone (not "as big as possible"); match each obstacle to an if–then plan; log
   weeks on a progress chart against the plan line; and when progress stalls, change the plan before giving up the goal. */
(()=>{const lo=Math.min,hi=Math.max;
const SLOT=[['What exactly?',[['swim front crawl',1,''],['be good at swimming',0,'"Good" is fuzzy. Name the exact skill: which stroke?'],['swim like an Olympic star',0,'That is a dream, not a goal you can reach this year.']]],
 ['How will I measure it?',[['a bit better',0,'You cannot check "a bit". Use a number you can count.'],['25 metres without stopping',1,''],['a lot further',0,'How far is "a lot"? Put a number on it.']]],
 ['By when?',[['one day',0,'"One day" never comes. Give a date or a time frame.'],['by tomorrow',0,'Too soon to learn a new skill. Pick a time you can really do it in.'],['by the end of term',1,'']]]];
const IFS=[['It is raining on my running day.','If it rains, then I skip indoors for 10 minutes.'],['A friend asks me to play at my reading time.','If a friend asks, then I say "after 15 minutes of reading".'],
 ['I forget to practise my spellings.','If I finish my tea, then I do 5 spellings.'],['I feel like giving up after a bad try.','If I have a bad day, then I look at how far I have come.']];
const WEEK=[80,70,30],PLAN=75;
const FIX=[['Week 3: only 30 pages. You read at bedtime, but you fall asleep.',[['Change the plan: read straight after school',1,'Yes: same goal, new plan that fits your day.'],['Give up: you are bad at reading',0,'One slow week does not mean you are bad at it. Change how you do it first.'],['Keep the same plan and hope',0,'If a plan is not working, doing it the same way will not fix it.']]],
 ['You can swim 15 m, but your legs sink. Your coach says your kick is weak.',[['Swim harder the same way',0,'Trying harder at the same thing keeps the same problem. Fix the weak part.'],['Add kick practice with a float',1,'Yes: work on the part that is holding you back.'],['Pick a different goal',0,'The goal is still right. Change the practice, not the goal.']]],
 ['You read 5 books a month, but now there is no time for homework.',[['Skip homework',0,'That swaps one problem for a bigger one.'],['Stop reading',0,'You do not need to drop it. Make it fit.'],['Make the goal smaller: 3 books a month',1,'Yes: if a goal is too big for your week, adjust it so it stays realistic.']]]];
VIS.reg('flaggoal',c=>{let A,pad,chal,qn=-1,tok=0;
const G={pick:[-1,-1,-1],miss:-1,dial:12,matched:[],ob:0,weeks:0,fx:0,drag:0,want:()=>{}};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['sharp','size','plan','track','fix','quiz'][A.step];
const fz=n=>A.narrow?n:n+3,W=()=>A.W,H=()=>A.H;
function wrapText(g,str,maxW){const out=[];let line='';for(const w of str.split(' ')){const tryL=line?line+' '+w:w;if(line&&g.measureText(tryL).width>maxW){out.push(line);line=w}else line=tryL}out.push(line);return out}
function textBox(g,str,r,size,col,weight){g.font=`${weight||700} ${fz(size)}px system-ui,sans-serif`;const L=wrapText(g,str,r.w-20),lh=fz(size)*1.28;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';
 L.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh))}
function tile(g,r,str,col,strong,size){g.fillStyle=A.alpha(col,strong?.26:.13);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=strong?3:1.5;g.stroke();textBox(g,str,r,size||13,A.col.tx,700)}
const title=(g,s)=>textBox(g,s,{x:8,y:4,w:W()-16,h:H()*.1},14,A.col.tx,800);
// option tiles in a column at the bottom; the goal card at the top
const opt=(i,n,y0)=>{const top=H()*(y0||.5),h=(H()*.97-top)/n-8;return{x:12,y:top+i*(h+8),w:W()-24,h}};
function sharpV(g){const C=A.col;const s=G.pick.findIndex(v=>v<0),built=G.pick.map((v,i)=>v<0?'…':SLOT[i][1].find(o=>o[1])[0]);
 tile(g,{x:12,y:H()*.11,w:W()-24,h:H()*.2},'My goal: I will '+built.join(', '),C.or,0,14);
 ['Specific','Measurable','Time frame'].forEach((t,i)=>{const w=(W()-40)/3,r={x:12+i*(w+8),y:H()*.33,w,h:H()*.09};tile(g,r,(G.pick[i]>=0?'✓ ':'○ ')+t,G.pick[i]>=0?C.gr:C.mu,G.pick[i]>=0,11)});
 if(s<0)return textBox(g,'You can check this goal: did I swim 25 m without stopping by the end of term?',{x:12,y:H()*.5,w:W()-24,h:H()*.4},14,C.gr,800);
 title(g,`Vague goal: "get better at swimming". ${SLOT[s][0]}`);SLOT[s][1].forEach(([t],i)=>tile(g,opt(i,3),t,C.cy,G.miss===i,14))}
const dialR=()=>({x:24,y:H()*.62,w:W()-48,h:30}),dX=v=>{const r=dialR();return r.x+(v-1)/19*r.w};
const zoneOf=v=>v<=2?0:v<=5?1:2,ZN=[['Too easy: you do this already','mu'],['Stretch: harder, but you can do it','gr'],['Too big for now: you may give up','rd']];
function sizeV(g){const C=A.col,v=G.dial,z=zoneOf(v),r=dialR();title(g,'Mia reads 2 books a month now. Set her goal for next month.');
 const n=lo(v,20);for(let i=0;i<n;i++){const bw=lo(28,(W()-40)/10),x=20+(i%10)*(bw+2),y=H()*.44-Math.floor(i/10)*(bw*.5+4);g.fillStyle=[C.cy,C.vi,C.or,C.pk][i%4];A.paint.rrect(x,y,bw,bw*.45,3);g.fill()}
 [[1,2.5,C.mu],[2.5,5.5,C.gr],[5.5,20,C.rd]].forEach(([a,b,k])=>{g.fillStyle=A.alpha(k,.35);g.fillRect(dX(a),r.y,dX(b)-dX(a),r.h)});g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);
 [1,2,5,10,20].forEach(t=>{g.font=`600 ${fz(11)}px system-ui`;g.fillStyle=C.tx;g.textAlign='center';g.fillText(String(t),dX(t),r.y+r.h+14)});
 A.paint.ball(dX(v),r.y+r.h/2,13,C.or);textBox(g,`${v} book${v>1?'s':''} a month`,{x:12,y:H()*.12,w:W()-24,h:H()*.12},17,C.tx,800);
 textBox(g,ZN[z][0],{x:12,y:H()*.76,w:W()-24,h:H()*.14},14,C[ZN[z][1]==='mu'?'tx':ZN[z][1]],800)}
function planV(g){const C=A.col;if(G.ob>=IFS.length)return textBox(g,'Every obstacle has a plan ready: "If ___, then I will ___."',{x:12,y:H()*.3,w:W()-24,h:H()*.4},15,C.gr,800);
 title(g,`Obstacle ${G.ob+1} of 4: which if–then plan fits?`);tile(g,{x:12,y:H()*.12,w:W()-24,h:H()*.16},'⚠ '+IFS[G.ob][0],C.rd,0,14);planList().forEach((k,i)=>tile(g,opt(i,4,.34),IFS[k][1],C.cy,G.miss===i,12))}
const planList=()=>[0,1,2,3].filter(k=>!G.matched.includes(k)||k===G.ob).sort((a,b)=>(a*7+3)%4-(b*7+3)%4);
function trackV(g){const C=A.col;title(g,'Goal: read 300 pages in 4 weeks. The plan is 75 pages a week.');const L=40,B=H()*.82,T=H()*.16,cw=(W()-L-16)/4,Ypx=p=>B-(p/320)*(B-T);
 g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(L,T);g.lineTo(L,B);g.lineTo(W()-10,B);g.stroke();[100,200,300].forEach(p=>{g.font=`600 ${fz(11)}px system-ui`;g.fillStyle=C.tx;g.textAlign='right';g.fillText(String(p),L-4,Ypx(p))});
 g.setLineDash([7,5]);g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(L,B);for(let w=1;w<=4;w++)g.lineTo(L+w*cw,Ypx(w*PLAN));g.stroke();g.setLineDash([]);
 let sum=0;for(let w=0;w<4;w++){const x=L+w*cw+cw*.2;g.font=`600 ${fz(11)}px system-ui`;g.fillStyle=C.tx;g.textAlign='center';g.fillText('Wk '+(w+1),x+cw*.3,B+14);if(w>=G.weeks)continue;sum+=WEEK[w];const on=sum>=(w+1)*PLAN;
  g.fillStyle=A.alpha(on?C.gr:C.rd,.6);g.fillRect(x,Ypx(sum),cw*.6,B-Ypx(sum));g.fillStyle=C.tx;g.fillText(String(sum),x+cw*.3,Ypx(sum)-10)}
 const t=G.weeks?WEEK.slice(0,G.weeks).reduce((a,b)=>a+b,0):0;textBox(g,G.weeks?`Total ${t} of a planned ${G.weeks*PLAN}: ${t>=G.weeks*PLAN?'on track':'behind plan'}`:'Log each week',{x:L,y:H()*.86,w:W()-L-10,h:H()*.12},13,G.weeks&&t<G.weeks*PLAN?C.rd:C.gr,800)}
function fixV(g){const C=A.col;if(G.fx>=FIX.length)return textBox(g,'Not working? Change the plan first. Adjust the goal only if it is too big.',{x:12,y:H()*.3,w:W()-24,h:H()*.4},15,C.gr,800);
 title(g,`Problem ${G.fx+1} of 3: what is the best change?`);tile(g,{x:12,y:H()*.12,w:W()-24,h:H()*.22},FIX[G.fx][0],C.or,0,14);FIX[G.fx][1].forEach(([t],i)=>tile(g,opt(i,3,.4),t,C.cy,G.miss===i,13))}
function draw(A){const{ctx:g,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);
 if(m==='quiz')textBox(g,'Specific • Measurable • Stretch • Plan • Track • Adjust',{x:10,y:0,w:A.W-20,h:A.H},17,C.tx,800);else({sharp:sharpV,size:sizeV,plan:planV,track:trackV,fix:fixV})[m](g);A.fx.draw(g)}
const miss=(i,t)=>{G.miss=i;A.sound.miss();say(t);A.redraw()};
const hit=t=>{G.miss=-1;A.sound.pop();say(t);buttons();A.redraw();G.want()};
function pickSlot(i){const s=G.pick.findIndex(v=>v<0);if(s<0)return;const o=SLOT[s][1][i];if(!o[1])return miss(i,o[2]);G.pick[s]=i;hit(`"${o[0]}" ✓. `+(s<2?SLOT[s+1][0]:'Now the goal is specific, measurable and has a time frame.'))}
function setDial(v){v=hi(1,lo(20,Math.round(v)));if(v===G.dial)return;G.dial=v;A.sound.tick();say(`${v} books a month. ${ZN[zoneOf(v)][0]}.`);buttons();A.redraw();G.want()}
function pickPlan(i){if(G.ob>=IFS.length)return;const k=planList()[i];if(k!==G.ob)return miss(i,`That plan is for a different problem (${IFS[k][0].slice(0,-1).toLowerCase()}). It does not solve this one.`);G.matched.push(k);G.ob++;hit('Matched. '+IFS[k][1])}
function logWeek(){if(G.weeks>=3)return;G.weeks++;const t=WEEK.slice(0,G.weeks).reduce((a,b)=>a+b,0),p=G.weeks*PLAN;A.sound.pop();say(`Week ${G.weeks}: ${WEEK[G.weeks-1]} pages. Total ${t}, plan ${p}. ${t>=p?'On track.':'Behind plan by '+(p-t)+' pages.'}`);buttons();A.redraw();G.want()}
function pickFix(i){if(G.fx>=FIX.length)return;const o=FIX[G.fx][1][i];if(!o[1])return miss(i,o[2]);G.fx++;hit(o[2])}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='sharp'){const s=G.pick.findIndex(v=>v<0);if(s>=0)SLOT[s][1].forEach(([t],i)=>B(t,()=>pickSlot(i)))}
 if(m==='size'){B('− 1 book',()=>setDial(G.dial-1),'One fewer book');B('+ 1 book',()=>setDial(G.dial+1),'One more book')}
 if(m==='plan'&&G.ob<IFS.length)planList().forEach((k,i)=>B(IFS[k][1],()=>pickPlan(i)));
 if(m==='track'&&G.weeks<3)B(`Log week ${G.weeks+1}`,logWeek);
 if(m==='fix'&&G.fx<FIX.length)FIX[G.fx][1].forEach(([t],i)=>B(t,()=>pickFix(i)))}
const complete=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fs,ms)=>{const k=++tok;fs.forEach((f,j)=>setTimeout(()=>{if(k===tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const clear=()=>{tok++;G.want=()=>{};Object.assign(G,{pick:[-1,-1,-1],miss:-1,dial:12,matched:[],ob:0,weeks:0,fx:0,drag:0})};
const steps=[
 {h:'Sharpen the goal',p:'"Get better at swimming" is a wish. A goal says exactly what, how you will measure it, and by when. Tap the sharpest choice each time.',
  predict:{q:'Which goal can you check you have reached?',opts:['"Get better at swimming"','"Swim 25 m front crawl without stopping by the end of term"'],ans:1},task:'Build a specific, measurable goal with a time frame',
  show:()=>{steps[0].go();seq([0,1,2].map(i=>()=>pickSlot([0,1,2][i])),600)},go:()=>{clear();say('What exactly?');buttons();A.redraw();G.want=complete(0,()=>G.pick.every(v=>v>=0),'Specific, measurable, with a time frame: now you will know when you get there.')}},
 {h:'Just right',p:'A good goal is a stretch: harder than now, but realistic. Drag the dial.',
  predict:{q:'Mia reads 2 books a month. Which goal is best?',opts:['As many as possible: 20','3 or 4 books','2 books, the same as now'],ans:1},task:'Set a stretch goal',
  show:()=>{steps[1].go();seq([9,6,4].map(v=>()=>setDial(v)),450)},go:()=>{clear();say('Mia reads 2 books a month. Set her goal.');buttons();A.redraw();G.want=complete(1,()=>zoneOf(G.dial)===1,'Too easy gives no progress. Too big feels hopeless and people give up. A stretch keeps you going.')}},
 {h:'If–then plans',p:'Things will get in the way. Plan for them before they happen: "If ___, then I will ___." Match each obstacle to its plan.',task:'Plan for all 4 obstacles',
  show:()=>{steps[2].go();seq([0,1,2,3].map(()=>()=>pickPlan(planList().indexOf(G.ob))),550)},go:()=>{clear();say('Which plan fits this obstacle?');buttons();A.redraw();G.want=complete(2,()=>G.ob>=4,'An if–then plan means you have already decided what to do when the problem comes.')}},
 {h:'Track it',p:'Check your progress each week against the plan line. Log three weeks of reading.',
  predict:{q:'Weeks 1 and 2: 80 and 70 pages. The plan is 75 a week. Are you on track?',opts:['Yes, exactly: 150 of 150','No, you failed week 2'],ans:0},task:'Log 3 weeks',
  show:()=>{steps[3].go();seq([logWeek,logWeek,logWeek],500)},go:()=>{clear();say('Log each week.');buttons();A.redraw();G.want=complete(3,()=>G.weeks>=3,'Week 3 drops to 30, so the total falls behind the plan line. Tracking shows a problem early, while there is time to fix it.')}},
 {h:'Adjust',p:'When progress stalls, find out why. Change the plan first. Change the goal only if it is too big.',
  predict:{q:'Your plan is not working. What should you change first?',opts:['The plan: how and when you work on it','The goal: give it up'],ans:0},task:'Solve 3 problems',
  show:()=>{steps[4].go();seq(FIX.map(f=>()=>pickFix(f[1].findIndex(o=>o[1]))),600)},go:()=>{clear();say('What is the best change?');buttons();A.redraw();G.want=complete(4,()=>G.fx>=3,'Review, then adjust: a new plan, extra practice on the weak part, or a smaller goal.')}},
 {h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QZ=[['Which is the best goal?',[['Learn my 7 times table by Friday','ok'],['Be better at maths','vague'],['Know every times table tomorrow','big']]],
 ['Leo can do 5 keepy-ups. Which goal is a stretch?',[['10 keepy-ups in 3 weeks','ok'],['5 keepy-ups','easy'],['500 keepy-ups by Monday','big']]],
 ['Which is an if–then plan?',[['If I feel tired, then I read for just 5 minutes','ok'],['I will try really hard','try'],['I hope I remember','hope']]],
 ['You practise piano but get stuck on the same bar. What first?',[['Practise that bar slowly on its own','ok'],['Give up piano','quit'],['Play the whole piece faster','same']]],
 ['How do you know if you are on track?',[['Compare your progress with your plan','ok'],['Just feel it','feel'],['Wait until the deadline','wait']]]];
let streak=0;
function ask(){qn++;const[s,o]=QZ[qn%QZ.length],r=qn%3;chal.innerHTML=`<p><b>${s}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([t,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>grade(tag)});say('Challenge: '+s);A.redraw()}
function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m='Yes. That is how goals get reached.';
 if(tag==='vague')m='"Better" cannot be measured. Say exactly what and by when.';
 if(tag==='big')m='Far too much, too soon. A goal you cannot reach makes you give up.';
 if(tag==='easy')m='He can already do 5, so there is no stretch.';
 if(tag==='try')m='Trying hard is good, but it is not a plan. Say what you will do when the problem comes.';
 if(tag==='hope')m='Hoping is not planning. Use "If ___, then I will ___."';
 if(tag==='quit')m='Being stuck on one part is normal. Change how you practise before giving up.';
 if(tag==='same')m='Playing it faster the same way keeps the mistake. Fix the hard part slowly.';
 if(tag==='feel')m='Feelings can trick you. Check real numbers against the plan.';
 if(tag==='wait')m='At the deadline it is too late to fix things. Check as you go.';
 const ok=tag==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
const hitR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const m=mode();
 if(m==='sharp'){const i=[0,1,2].findIndex(i=>hitR(p,opt(i,3)));if(i>=0)pickSlot(i);return false}
 if(m==='size'){const r=dialR();if(p.y>r.y-30&&p.y<r.y+r.h+30){G.drag=1;setDial(1+(p.x-r.x)/r.w*19);return true}return false}
 if(m==='plan'){const i=[0,1,2,3].findIndex(i=>hitR(p,opt(i,4,.34)));if(i>=0)pickPlan(i);return false}
 if(m==='track'){if(p.y>H()*.15)logWeek();return false}
 if(m==='fix'){const i=[0,1,2].findIndex(i=>hitR(p,opt(i,3,.4)));if(i>=0)pickFix(i);return false}return false}
function move(p){if(G.drag){const r=dialR();setDial(1+(p.x-r.x)/r.w*19)}}
function up(){G.drag=0}
A=FK.shell(c,{steps,ratio:.75,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
