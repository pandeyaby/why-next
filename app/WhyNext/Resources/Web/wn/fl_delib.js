/* Flagship – deliberate practice (ages 16–17). Toy models, not data: two players put in the same hours, one replaying what
   she can already do (skill levels off near 60) and one targeting weak spots (keeps rising); a piece whose sound is limited
   by its weakest bar, with six practice loops to spend; a difficulty dial where success p = 1/(1+e^(d−6.5)) and learning
   ∝ p³(1−p), so the most is learned in the stretch zone (about 60–85% right); an aiming drill whose shots drift by a hidden
   bias that can only be corrected once feedback shows where they land; and a sort of real practice plans.
   The Challenge targets: hours alone, talent limits, staying in the comfort zone, jumping to the panic zone, replaying the
   whole thing, slow feedback, half-attention, and trying to fix everything at once. */
(()=>{const BARS=[95,92,48,90,61,94],PLANS=[['Loop bars 9 to 12 slowly until clean, then speed up',0],['Play the whole song you already know, again',1],
 ['Mixed questions on your weakest topic, marked after each one',0],['Thirty easy questions you always get right',1],
 ['Film your serve, compare it with the coach’s, fix one thing',0],['Three hours of revision with your phone buzzing',1]],NOISE=[[.3,-.2],[-.4,.5],[.1,.4],[-.2,-.5],[.5,.1],[-.5,-.1],[.2,.3],[0,-.4]];
VIS.reg('flagdelib',c=>{let A,ctl,chal,qi=-1,streak=0;
const S={};
const view=()=>['hours','weak','edge','aim','plan','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.15));
function word(g,s,x,y,n,wt,col,al){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function box(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const naive=w=>30+30*(1-Math.exp(-w/3)),delib=w=>30+60*(1-Math.exp(-w/12));
const succ=d=>1/(1+Math.exp(d-6.5)),gain=d=>{const p=succ(d);return p*p*p*(1-p)/.1055};
const zone=d=>{const p=succ(d);return p>.88?'Comfort zone: too easy, nothing to fix':p>=.55?'Stretch zone: right most of the time, not always':'Panic zone: too hard to learn from'};
const chartR=()=>({x:44,y:A.H*.14,w:A.W-64,h:A.H*.62});
const barR=i=>{const w=(A.W-30)/6;return{x:10+i*(w+2),y:A.H*.18,w:w-4,h:A.H*.5}};
const dialR=()=>({x:30,y:A.H*.78,w:A.W-60,h:A.H*.1});
const tgt=()=>{const R=Math.min(A.W*.36,A.H*.36);return{x:A.W/2,y:A.H*.47,R}};
const binR=i=>{const w=(A.W-30)/2;return{x:10+i*(w+10),y:A.H*.66,w,h:A.H*.26}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Deliberate practice',W/2,H*.25,18,800);word(g,'Target the weak spot · stay in the stretch zone',W/2,H*.45,13,700);word(g,'Fast feedback · full attention · repeat',W/2,H*.6,13,700);return}
 if(v==='hours'){const r=chartR(),X=w=>r.x+w/20*r.w,Y=s=>r.y+(1-s/100)*r.h;g.strokeStyle=A.alpha(C.tx,.3);g.lineWidth=1;
  [0,50,100].forEach(s=>{g.beginPath();g.moveTo(r.x,Y(s));g.lineTo(r.x+r.w,Y(s));g.stroke();word(g,String(s),r.x-18,Y(s),10,600,C.mu)});
  word(g,'Skill',r.x-18,r.y-14,10,700,C.mu);word(g,'Weeks: '+S.week+' of 20 (5 hours a week each)',W/2,r.y+r.h+16,11,700,C.mu);
  [[naive,C.or,'Ana: plays it through'],[delib,C.cy,'Ben: targets weak spots']].forEach(([f,col,n],k)=>{g.strokeStyle=col;g.lineWidth=4;g.beginPath();
   for(let w=0;w<=S.week;w+=.25){const y=Y(f(w));w?g.lineTo(X(w),y):g.moveTo(X(w),y)}g.stroke();const ly=H*(.05+k*.055);g.beginPath();g.moveTo(r.x,ly);g.lineTo(r.x+18,ly);g.stroke();word(g,`${n}: ${Math.round(f(S.week))}`,r.x+26,ly,12,800,C.tx,'left')})}
 if(v==='weak'){const m=Math.min(...S.bars);S.bars.forEach((a,i)=>{const r=barR(i),h=r.h*a/100,low=a<85;box(g,r,C.tx,.05,S.oops===i);
   g.fillStyle=A.alpha(low?C.rd:C.gr,.55);g.fillRect(r.x+3,r.y+r.h-h,r.w-6,h);word(g,a+'%',r.x+r.w/2,r.y-12,12,800);word(g,'Bar '+(i+1),r.x+r.w/2,r.y+r.h+14,10,700,C.mu)});
  word(g,`Whole piece sounds like its weakest bar: ${m}%`,W/2,H*.06,13,800);word(g,`Practice loops left: ${S.loops} of 6`,W/2,H*.86,13,800,S.loops?C.tx:C.rd);
  word(g,'Tap a bar to loop it slowly',W/2,H*.94,11,600,C.mu)}
 if(v==='edge'){const d=S.d,p=succ(d),r=dialR(),bw=(W-80)/2;
  [['Right first time',p,C.gr],['Learning per session',gain(d),C.vi]].forEach(([n,val,col],k)=>{const x=30+k*(bw+20),y=H*.12,h=H*.44;box(g,{x,y,w:bw,h},C.tx,.04);
   g.fillStyle=A.alpha(col,.6);g.fillRect(x+4,y+h-h*val,bw-8,h*val);word(g,n,x+bw/2,y+h+16,12,800);word(g,k?(val>.9?'Most!':val>.5?'Good':'Little'):Math.round(val*100)+'%',x+bw/2,y+h-h*val-14<y+10?y+20:y+h-h*val-14,14,800)});
  word(g,(p>.88?'○ ':p>=.55?'● ':'▲ ')+zone(d),W/2,H*.68,12,800);g.fillStyle=A.alpha(C.tx,.15);A.paint.rrect(r.x,r.y+r.h*.4,r.w,r.h*.2,4);g.fill();
  const kx=r.x+(d-1)/9*r.w;g.fillStyle=C.vi;g.beginPath();g.arc(kx,r.y+r.h/2,px(12),0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
  word(g,'Difficulty '+d+' of 10',W/2,H*.95,11,700,C.mu)}
 if(v==='aim'){const T=tgt();[1,.66,.33,.18].forEach((f,i)=>{g.fillStyle=A.alpha(i%2?C.cy:C.tx,i===3?.5:.1);g.beginPath();g.arc(T.x,T.y,T.R*f,0,7);g.fill()});
  g.lineWidth=1.5;g.strokeStyle=A.alpha(C.tx,.5);g.beginPath();g.arc(T.x,T.y,T.R,0,7);g.stroke();
  if(S.fb)S.shots.forEach(([x,y],i)=>{g.fillStyle=Math.hypot(x,y)<=.18?C.gr:C.rd;g.beginPath();g.arc(T.x+x*T.R,T.y+y*T.R,px(6),0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1;g.stroke()});
  const ax=T.x+S.ax*T.R,ay=T.y+S.ay*T.R,k=px(14);g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(ax-k,ay);g.lineTo(ax+k,ay);g.moveTo(ax,ay-k);g.lineTo(ax,ay+k);g.stroke();g.beginPath();g.arc(ax,ay,k*.6,0,7);g.stroke();
  word(g,S.fb?`Feedback on: you can see each shot. Hits: ${S.hits} of 3`:`No feedback: ${S.shots.length} of 3 shots fired, landing unseen`,W/2,H*.05,12,800);
  word(g,'Drag the purple aim, then shoot',W/2,H*.95,11,600,C.mu)}
 if(v==='plan'){const k=S.k;if(k<PLANS.length){box(g,{x:16,y:H*.12,w:W-32,h:H*.36},C.am,.14,S.oops);word(g,'Plan '+(k+1)+' of '+PLANS.length,W/2,H*.18,11,700,C.mu);
   wrap(g,PLANS[k][0],W/2,H*.3,W-60)}else word(g,'All 6 plans sorted!',W/2,H*.3,15,800);
  ['Deliberate','Just repetition'].forEach((n,i)=>{const r=binR(i);box(g,r,i?C.or:C.cy,.16);word(g,n,r.x+r.w/2,r.y+r.h*.35,13,800);word(g,String(S.tally[i]),r.x+r.w/2,r.y+r.h*.7,16,800)})}
 A.fx.draw(g)}
function wrap(g,s,x,y,w){g.font=`700 ${px(14)}px system-ui,sans-serif`;const L=[];let l='';s.split(' ').forEach(t=>{const n=l?l+' '+t:t;if(l&&g.measureText(n).width>w){L.push(l);l=t}else l=n});L.push(l);
 L.forEach((t,i)=>word(g,t,x,y+(i-(L.length-1)/2)*px(19),14,700))}
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function weeks(w){w=Math.max(0,Math.min(20,Math.round(w)));if(w===S.week)return;S.week=w;A.sound.tick();A.redraw();pad();
 if(w>=20)good(`Same 100 hours. Ana levels off at ${Math.round(naive(20))}; Ben reaches ${Math.round(delib(20))}. Hours alone are not enough.`);
 else tell(`Week ${w}. Ana ${Math.round(naive(w))}, Ben ${Math.round(delib(w))}.`)}
/* step 1 */
function loop(i){if(S.loops<=0)return bad('No loops left. Press Start again and spend them on the red bars.');S.loops--;A.sound.tick();
 if(i<0){S.bars=S.bars.map(a=>Math.min(95,a+2));tell('A full play-through lifts every bar by only 2%. The weak bar barely moves.')}
 else{const was=S.bars[i];S.bars[i]=Math.min(95,was+12);tell(was>=85?`Bar ${i+1} was already strong, so that loop was wasted.`:`Bar ${i+1}: ${was}% to ${S.bars[i]}%.`)}
 S.oops=null;pad();A.redraw();if(S.bars.every(a=>a>=85))good('Every bar is clean: you spent the loops where the mistakes were.');
 else if(!S.loops)bad('Out of loops and a bar is still red. Press Start again.')}
/* step 2 */
function dial(d){d=Math.max(1,Math.min(10,Math.round(d)));if(d===S.d)return;S.d=d;A.sound.tick();const p=Math.round(succ(d)*100);tell(`Difficulty ${d}: ${p}% right. ${zone(d)}.`);A.redraw();
 if(d===5||d===6)good(`Difficulty ${d}: about ${p}% right. Enough mistakes to learn from, enough success to see what works.`)}
/* step 3 */
function shoot(){const n=S.shots.length,[nx,ny]=NOISE[n%NOISE.length],x=S.ax+.45+nx*.08,y=S.ay-.35+ny*.08;S.shots.push([x,y]);A.sound.tick();
 if(!S.fb){if(S.shots.length>=3){S.fb=1;tell('Feedback switched on. All your shots were landing up and to the right. Move your aim to correct it.')}else tell('Shot fired. You cannot see where it went.')}
 else{const ok=Math.hypot(x,y)<=.18;if(ok)S.hits++;tell(ok?`Hit! ${S.hits} of 3.`:'Missed. Look where it landed and move your aim the other way.')}
 A.redraw();if(S.hits>=3)good('Three hits. Seeing each shot let you correct the drift straight away.')}
const nudge=(dx,dy)=>{S.ax=Math.max(-1,Math.min(1,S.ax+dx));S.ay=Math.max(-1,Math.min(1,S.ay+dy));A.redraw()};
/* step 4 */
function sort(b){if(S.k>=PLANS.length)return;const[t,a]=PLANS[S.k];if(b!==a)return bad(a?'That is repetition: nothing hard is targeted, or attention is split.':'That is deliberate: one weak spot, clear feedback, full attention.',1);
 S.tally[b]++;S.k++;S.oops=null;A.sound.pop();pad();A.redraw();if(S.k>=PLANS.length)good('Deliberate plans pick one weakness, check each try, and keep full attention.');else tell('Yes. Next plan.')}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='hours'&&S.week<20)B('Next 4 weeks ▶',()=>weeks(S.week+4),'Run four more weeks');
 if(v==='weak'){B('Play whole piece',()=>loop(-1),'Spend a loop playing the whole piece');B('Start again',()=>{steps[1].go()},'Reset the bars and loops')}
 if(v==='edge'){B('◀ Easier',()=>dial(S.d-1),'Make the work easier');B('Harder ▶',()=>dial(S.d+1),'Make the work harder')}
 if(v==='aim'){B('Shoot',shoot,'Take a shot');[['←',-.1,0,'left'],['↑',0,-.1,'up'],['↓',0,.1,'down'],['→',.1,0,'right']].forEach(([t,x,y,n])=>B(t,()=>nudge(x,y),'Move aim '+n))}
 if(v==='plan'&&S.k<PLANS.length){B('Deliberate',()=>sort(0),'Sort as deliberate practice');B('Just repetition',()=>sort(1),'Sort as just repetition')}}
function down(p){const v=view();
 if(v==='hours'){const r=chartR();if(hit(p,{x:r.x-10,y:r.y,w:r.w+20,h:r.h})){weeks((p.x-r.x)/r.w*20);return true}return false}
 if(v==='weak'){BARS.forEach((_,i)=>{if(hit(p,barR(i)))loop(i)});return false}
 if(v==='edge'){const r=dialR();if(p.y>r.y-20){dial(1+(p.x-r.x)/r.w*9);return true}return false}
 if(v==='aim'){const T=tgt();if(Math.hypot(p.x-T.x-S.ax*T.R,p.y-T.y-S.ay*T.R)<px(34))return true;return false}
 if(v==='plan')[0,1].forEach(i=>{if(hit(p,binR(i)))sort(i)});return false}
function move(p){const v=view();if(v==='hours'){const r=chartR();weeks((p.x-r.x)/r.w*20)}
 if(v==='edge'){const r=dialR();dial(1+(p.x-r.x)/r.w*9)}
 if(v==='aim'){const T=tgt();S.ax=Math.max(-1,Math.min(1,(p.x-T.x)/T.R));S.ay=Math.max(-1,Math.min(1,(p.y-T.y)/T.R));A.redraw()}}
function up(){}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},week:0,bars:BARS.slice(),loops:6,d:2,ax:0,ay:0,shots:[],fb:0,hits:0,k:0,tally:[0,0],oops:null})};
const steps=[
{h:'Same hours, different results',p:'Ana and Ben both practise 5 hours a week. Ana plays through what she can already do. Ben finds his weakest spot and works on it.',predict:{q:'After 20 weeks of the same hours, who is better?',opts:['They are the same: hours are hours','Ben, who targets weak spots','Ana, who plays it all through'],ans:1},task:'Run all 20 weeks',
 show:()=>{steps[0].go();play([4,8,12,16,20].map(w=>()=>weeks(w)),450)},
 go:()=>{reset();tell('Drag across the chart or press Next 4 weeks.');pad();S.want=check(0,()=>S.week>=20,'Practice that only repeats what you can do levels off.')}},
{h:'Find the weak spot',p:'This piece is only as good as its weakest bar. You have 6 practice loops. Get every bar to 85% or more.',predict:{q:'Two bars keep going wrong. With 6 loops, the best plan is…',opts:['Play the whole piece 6 times','Loop the shaky bars, then play it through','Polish the bars you already play well'],ans:1},task:'Get every bar to 85%',
 show:()=>{steps[1].go();play([2,2,2,2,4,4].map(i=>()=>loop(i)),500)},
 go:()=>{reset();tell('Tap a red bar to loop it slowly, or play the whole piece.');pad();S.want=check(1,()=>S.bars.every(a=>a>=85),'Spend practice where the mistakes are.')}},
{h:'The stretch zone',p:'Turn the difficulty dial. Watch how often you are right, and how much you learn each session.',predict:{q:'Which practice makes you improve fastest?',opts:['Work you always get right','Work you get right most of the time, not always','Work far too hard for you'],ans:1},task:'Find the stretch zone',
 show:()=>{steps[2].go();play([3,4,5].map(d=>()=>dial(d)),500)},
 go:()=>{reset();tell('Difficulty 2. Drag the dial or press Harder.');pad();S.want=check(2,()=>S.d===5||S.d===6,'Learn most where you are right about 60 to 85% of the time.')}},
{h:'Fast feedback',p:'Your shots drift in a way you cannot feel. First you shoot blind. Then you see each shot and can correct.',predict:{q:'If you never see where your shots land, will 100 shots make you more accurate?',opts:['Yes, practice is practice','No, you cannot correct what you cannot see'],ans:1},task:'Hit the centre 3 times',
 show:()=>{steps[3].go();play([()=>shoot(),()=>shoot(),()=>shoot(),()=>{S.ax=-.45;S.ay=.35;A.redraw()},()=>shoot(),()=>shoot(),()=>shoot()].map(f=>f),500)},
 go:()=>{reset();tell('Take 3 shots. You will not see where they land.');pad();S.want=check(3,()=>S.hits>=3,'Feedback straight after each try lets you fix the next one.')}},
{h:'Is it deliberate?',p:'Sort each plan. Deliberate practice targets one weakness, checks every try, and has your full attention.',task:'Sort all 6 plans',
 show:()=>{steps[4].go();play(PLANS.map(([,a])=>()=>sort(a)),500)},
 go:()=>{reset();tell('Is this plan deliberate practice, or just repetition?');pad();S.want=check(4,()=>S.k>=PLANS.length,'Hours count only when they are focused, hard and checked.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Mia has played piano for 3 years but stopped improving. The most likely reason?',[['She replays pieces she can already play','ok'],['She has not done enough hours yet','hours'],['She has hit her talent limit','talent']]],
 ['You score 100% on every practice set. What should you change?',[['Make it harder until you make some mistakes','ok'],['Nothing: 100% means it is working','easy'],['Jump to the hardest paper you can find','hard']]],
 ['Your mock shows you lose most marks on vectors. Best plan for next week?',[['Vectors questions, each marked straight after','ok'],['A full paper every night','whole'],['A full paper, checked in a month','late']]],
 ['A player wants a better weak-foot pass. Which session is deliberate practice?',[['50 weak-foot passes at a target, coach calling each one','ok'],['A fun match using her strong foot','easy'],['Two hours of passing while chatting','focus']]],
 ['Why does feedback need to come quickly?',[['So you can fix the next try while this one is fresh','ok'],['It does not matter when it comes','late'],['So you can practise for longer','hours']]],
 ['Your essay feedback lists eight problems. The deliberate-practice move is…',[['Pick one, like topic sentences, and drill it','ok'],['Rewrite it fixing all eight at once','all'],['Write more essays and hope','hours']]]];
function hintFor(t){let m='Deliberate practice: one weak spot, the stretch zone, fast feedback, full attention.';
 if(t==='hours')m='Hours alone level off. Ana and Ben had the same hours. What you do in them matters more.';
 if(t==='talent')m='A plateau usually means the practice stopped stretching you, not a fixed limit. Change what you practise.';
 if(t==='easy')m='Work you always get right is the comfort zone. With nothing to fix, you learn very little.';
 if(t==='hard')m='Far too hard is the panic zone. Aim for right most of the time, but not always.';
 if(t==='whole')m='Running the whole thing spreads effort thin. Target the weak part, then put it back together.';
 if(t==='late')m='Late feedback comes after the mistake is a habit. Check each try straight away.';
 if(t==='focus')m='Half-attention is just repetition. Deliberate practice needs full focus on one thing.';
 if(t==='all')m='Fixing everything at once splits attention. Pick one weakness, drill it, then move on.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+streak+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
