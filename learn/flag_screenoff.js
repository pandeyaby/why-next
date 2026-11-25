/* Flagship – screen time: knowing when to switch off (Personal & Social, Self-Regulation, ages 4-5; Development
   Matters 2021 Reception PSED 'sensible amounts of screen time', WHO 2019 under-5 guidelines, AAP 2016, RCPCH 2019).
   A child on a sofa with a tablet: switch it off when the timer rings, the show ends or a grown-up says stop (one more,
   hiding it or carrying on keep it glowing); build a screen-free bedtime (a screen in bed leaves the child wide awake);
   tap the TV, tablet and phone off at dinner; drag the show sticker into a day so screen time is short and never at
   meals or bedtime; then help the cross feeling get smaller after switching off. Data and drawings: screenoff_art.js. */
(()=>{const K=SCR;
VIS.reg('flagscreenoff',c=>{let A,P,tray,chal,qi=-1,gen=0,drag=null;const W={};c.fig.classList.add('young');
const PHASE=['stop','bed','meal','day','calm','quiz'],ph=()=>PHASE[A.step];
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
let HITS=[],STICK=null;
const room=(y0,f)=>({x:8,y:y0,w:A.W-16,h:(A.H-y0-8)*f});
function grid(n,top,cols,maxH){const gp=10,rows=Math.ceil(n/cols),w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-top-8)/rows-gp,maxH);
 return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+gp),y:top+Math.floor(i/cols)*(h+gp),w,h}))}
/* ---- 1. when it is time to stop ---- */
const stopChoices=k=>{const R=K.STOP[k],all=[[K.STOP_OK,'ok'],...R.o],s=(k+1)%3;return all.slice(s).concat(all.slice(0,s))};
function stopPick(j){const t=W.t;if(t.k>=K.STOP.length||t.wait)return;const [,tag]=stopChoices(t.k)[j];
 if(tag==='ok'){t.off=true;t.miss=-1;t.wait=true;A.sound.pop();tell('Off! Good stopping.',false);const g0=gen;
  setTimeout(()=>{if(g0!==gen)return;t.wait=false;t.off=false;t.k++;tell(t.k>=K.STOP.length?'Off every time. Well done!':`Next: ${K.STOP[t.k].cue}`,false)},650);return}
 t.miss=j;t.off=false;A.sound.miss();tell(K.STOP_WHY[tag],true)}
function paintStop(){const t=W.t,fin=t.k>=K.STOP.length,cur=K.STOP[Math.min(t.k,K.STOP.length-1)];
 const y0=P.strip(fin?K.DONE[0]:`${cur.cue} What do you do? (${t.k+1} of 3)`,fin?'ok':W.bad?'no':'',W.msg,W.bad),r=room(y0,.46);
 K.sofa(A.ctx,r,Object.assign({},fin?{timer:'end'}:cur.st,{off:fin||t.off}),A.col.dark);
 if(fin){HITS=[];return}const opts=stopChoices(t.k);HITS=grid(3,r.y+r.h+10,A.narrow?1:3,84);HITS.forEach((b,i)=>P.card(b,opts[i][0],{no:t.miss===i}))}
/* ---- 2. a screen-free bedtime ---- */
function bedPick(i){const b=W.b,x=K.BED[i];if(b.got.includes(i)||b.slept)return;
 if(x.ok===0){b.awake=true;b.miss=i;A.sound.miss();return tell(`${x.t} in bed? Screens keep your brain awake, so sleep comes late. Screens off in the hour before bed.`,true)}
 if(x.ok===2){if(b.got.length<3){b.miss=i;A.sound.miss();return tell('Not yet! Bath, teeth and a story come first.',true)}b.slept=true;b.awake=false;A.sound.pop();return tell('Sleep came quickly. Night night!',false)}
 b.got.push(i);b.miss=-1;b.awake=false;A.sound.pop();tell(`${x.t}: a calm thing before bed. ${b.got.length} of 3.`,false)}
function paintBed(){const b=W.b,y0=P.strip(b.slept?K.DONE[1]:`Get ready for bed. Calm things: ${b.got.length} of 3, then Sleep.`,b.slept?'ok':W.bad?'no':'',W.msg,W.bad),r=room(y0,.4);
 K.bed(A.ctx,r,{awake:b.awake,sleep:b.slept},A.col.dark);HITS=grid(6,r.y+r.h+10,3,96);
 HITS.forEach((h,i)=>{const x=K.BED[i];P.card(h,'',{ok:b.got.includes(i)||(x.ok===2&&b.slept),no:b.miss===i});K.emo(A.ctx,x.e,h.x+h.w/2,h.y+h.h*.4,Math.min(h.w,h.h)*.42);P.text(x.t,h.x+h.w/2,h.y+h.h*.82,14,'center','#0f172a')})}
/* ---- 3. screens off at dinner ---- */
function mealTap(i){const m=W.m,x=K.MEAL[i];if(m.off.includes(i))return;
 if(!x.s){m.miss=i;A.sound.tick();return tell(`That is the ${x.t.toLowerCase()}, not a screen. Find the screens that glow.`,true)}
 m.off.push(i);m.miss=-1;A.sound.pop();tell(m.off.length>=3?'All off! Now we can talk.':`${x.t}: off. ${m.off.length} of 3 screens.`,false)}
function paintMeal(){const m=W.m,fin=m.off.length>=3,y0=P.strip(fin?K.DONE[2]:`Dinner time! Tap the screens to switch them off. ${m.off.length} of 3.`,fin?'ok':W.bad?'no':'',W.msg,W.bad),g=A.ctx,r=room(y0,1);
 g.fillStyle=A.col.dark?'#422006':'#fef3c7';K.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.fillStyle='#b45309';K.rr(g,r.x+r.w*.08,r.y+r.h*.48,r.w*.84,r.h*.36,14);g.fill();
 const s=Math.min(r.w*.16,r.h*.24);HITS=K.MEAL.map((x,i)=>{const cx=r.x+r.w*x.x,cy=r.y+r.h*x.y,on=x.s&&!m.off.includes(i);
  if(on){g.fillStyle='rgba(56,189,248,.45)';g.beginPath();g.arc(cx,cy,s*.72,0,7);g.fill()}if(m.miss===i){g.strokeStyle='#b91c1c';g.lineWidth=4;g.beginPath();g.arc(cx,cy,s*.7,0,7);g.stroke()}
  K.emo(g,x.e,cx,cy,s*.8);if(x.s&&!on)P.text('OFF',cx,cy+s*.62,13,'center',A.col.dark?'#86efac':'#047857');return{i,x:cx-s*.6,y:cy-s*.6,w:s*1.2,h:s*1.2}});
 if(fin){K.emo(g,'\u{1F468}\u200D\u{1F469}\u200D\u{1F467}',r.x+r.w*.5,r.y+r.h*.15,s*.7);K.emo(g,'\u{1F4AC}',r.x+r.w*.62,r.y+r.h*.06,s*.45)}}
/* ---- 4. plan a day with two short shows ---- */
function daySet(i){const d=W.d,x=K.DAY[i];if(d.on.length>=K.SHOWS&&!d.on.includes(i)){d.miss=i;A.sound.miss();return tell('Two shows is enough sitting for today. Choose to play instead!',true)}
 if(d.on.includes(i)){d.on=d.on.filter(j=>j!==i);d.miss=-1;A.sound.tick();return tell(`Show taken off ${x.t.toLowerCase()}.`,false)}
 if(!x.ok){d.miss=i;A.sound.miss();return tell(x.why==='bed'?'Not at bedtime: screens keep you awake. Pick a time earlier in the day.':`Not at ${x.t.toLowerCase()}: screens off at meals, so we talk and eat.`,true)}
 d.on.push(i);d.miss=-1;A.sound.pop();tell(d.on.length>=K.SHOWS?'Two short shows. The rest of the day is for play!':`One show in the ${x.t.toLowerCase()}. Choose 1 more time.`,false)}
function paintDay(){const d=W.d,fin=d.on.length>=K.SHOWS,y0=P.strip(fin?K.DONE[3]:`Choose 2 times for a short show: ${d.on.length} of 2. Drag the TV or tap a time.`,fin?'ok':W.bad?'no':'',W.msg,W.bad),g=A.ctx;
 const top=y0+4,tr=Math.min(70,(A.H-top)*.2);STICK={x:A.W/2-tr*.6,y:top,w:tr*1.2,h:tr};
 g.fillStyle=A.col.dark?'#1e293b':'#e0f2fe';K.rr(g,8,top,A.W-16,tr,12);g.fill();K.emo(g,'\u{1F4FA}',A.W/2,top+tr/2,tr*.7);P.text(`${K.SHOWS-d.on.length} left`,A.W/2+tr*.75,top+tr/2,15,'left');
 HITS=grid(6,top+tr+10,3,120);HITS.forEach((h,i)=>{const x=K.DAY[i],on=d.on.includes(i);P.card(h,'',{ok:on,no:d.miss===i});K.emo(g,x.e,h.x+h.w*.3,h.y+h.h*.42,Math.min(h.w,h.h)*.36);
  if(on)K.emo(g,'\u{1F4FA}',h.x+h.w*.74,h.y+h.h*.42,Math.min(h.w,h.h)*.34);else K.emo(g,x.ok?'\u26BD':'\u{1F6AB}',h.x+h.w*.74,h.y+h.h*.42,Math.min(h.w,h.h)*.26);P.text(x.t,h.x+h.w/2,h.y+h.h*.84,14,'center','#0f172a')});
 if(drag)K.emo(g,'\u{1F4FA}',drag.x,drag.y,tr*.8)}
/* ---- 5. the cross feeling ---- */
function calmPick(i){const f=W.f,x=K.CALM[i];if(f.good.includes(i))return;
 if(!x.ok){f.miss=i;A.sound.miss();return tell(K.CALM_WHY[x.k],true)}
 f.good.push(i);f.miss=-1;A.sound.pop();tell(f.good.length>=3?'Calm again, and off to play!':`${x.t}: the cross feeling gets a bit smaller.`,false)}
function paintCalm(){const f=W.f,fin=f.good.length>=3,y0=P.strip(fin?K.DONE[4]:`The TV is off. Help the cross feeling get smaller: ${f.good.length} of 3.`,fin?'ok':W.bad?'no':'',W.msg,W.bad),r=room(y0,.4);
 K.sofa(A.ctx,r,{off:true,face:K.FACE[f.good.length],next:fin?'\u26BD':null},A.col.dark);HITS=grid(6,r.y+r.h+10,A.narrow?2:3,80);
 HITS.forEach((h,i)=>P.card(h,K.CALM[i].t,{ok:f.good.includes(i),no:f.miss===i,n:16}))}
/* ---- wiring ---- */
const PAINT={stop:paintStop,bed:paintBed,meal:paintMeal,day:paintDay,calm:paintCalm},ACT={stop:stopPick,bed:bedPick,meal:mealTap,day:daySet,calm:calmPick};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=ph();
 if(m==='quiz'){const y0=P.strip('Challenge: switching off','ok');K.sofa(g,room(y0,.8),{off:true,face:'\u{1F604}',next:'\u26BD'},A.col.dark);return}PAINT[m]();A.fx.draw(g)}
function down(p){const m=ph();if(m==='day'&&inside(p,STICK)&&W.d.on.length<K.SHOWS){drag={x:p.x,y:p.y};A.redraw();return true}
 const h=HITS.find(b=>inside(p,b));if(h&&ACT[m])ACT[m](h.i);return false}
function move(p){if(drag){drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!drag)return;drag=null;const h=HITS.find(b=>inside(p,b));if(h)daySet(h.i);else A.redraw()}
function reset(){gen++;drag=null;for(const k in W)delete W[k];Object.assign(W,{t:{k:0,miss:-1,off:false,wait:false},b:{got:[],miss:-1,awake:false,slept:false},m:{off:[],miss:-1},d:{on:[],miss:-1},f:{good:[],miss:-1},msg:null,bad:null,fresh:true,goal:()=>{}})}
function tell(t,bad){W.msg=t;W.bad=!!bad;W.fresh=false;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();W.goal()}
function enter(i,met){reset();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);W.goal=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function demo(i,acts,gap){steps[i].go();const g0=gen;acts.reduce((t,f)=>{t+=gap||520;setTimeout(()=>{if(g0===gen)f()},t);return t},0)}
function buttons(){if(!tray)return;tray.innerHTML='';const m=ph(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(m==='stop'&&W.t.k<K.STOP.length)stopChoices(W.t.k).forEach(([t],j)=>add(t,()=>stopPick(j),`When it is time to stop: ${t}`));
 if(m==='bed'&&!W.b.slept)K.BED.forEach((x,i)=>{if(!W.b.got.includes(i))add(x.t,()=>bedPick(i),`Before bed: ${x.t}`)});
 if(m==='meal')K.MEAL.forEach((x,i)=>{if(!W.m.off.includes(i))add(x.t,()=>mealTap(i),`At dinner, tap the ${x.t}`)});
 if(m==='day')K.DAY.forEach((x,i)=>add((W.d.on.includes(i)?'\u2713 ':'')+x.t,()=>daySet(i),`A short show at ${x.t}`));
 if(m==='calm'&&W.f.good.length<3)K.CALM.forEach((x,i)=>{if(!W.f.good.includes(i))add(x.t,()=>calmPick(i),`When I feel cross: ${x.t}`)})}
const steps=[
{h:'Time to stop',p:K.TXT[0],predict:{q:'Ding! The timer rings. What now?',opts:['Watch one more show','Switch it off'],ans:1},task:'Switch the tablet off 3 times',
 show:()=>demo(0,K.STOP.map((_,k)=>()=>stopPick(stopChoices(k).findIndex(x=>x[1]==='ok'))),950),go:()=>enter(0,()=>W.t.k>=K.STOP.length)},
{h:'Bedtime',p:K.TXT[1],predict:{q:'A tablet game in bed. Will you fall asleep faster?',opts:['Yes, it helps me relax','No, it keeps my brain awake'],ans:1},task:'Pick 3 calm things, then Sleep',
 show:()=>demo(1,[0,2,4,5].map(i=>()=>bedPick(i))),go:()=>enter(1,()=>W.b.slept)},
{h:'Dinner time',p:K.TXT[2],task:'Switch off the 3 screens at dinner',
 show:()=>demo(2,K.MEAL.map((x,i)=>x.s?()=>mealTap(i):null).filter(Boolean)),go:()=>enter(2,()=>W.m.off.length>=3)},
{h:'Plan a day',p:K.TXT[3],predict:{q:'Can a show go at dinner time?',opts:['Yes, any time is fine','No, screens are off at meals'],ans:1},task:'Choose 2 good times for a short show',
 show:()=>demo(3,K.DAY.map((x,i)=>x.ok?()=>daySet(i):null).filter(Boolean)),go:()=>enter(3,()=>W.d.on.length>=K.SHOWS)},
{h:'Cross is OK',p:K.TXT[4],task:'Tap 3 things that help',
 show:()=>demo(4,K.CALM.map((x,i)=>x.ok?()=>calmPick(i):null).filter(Boolean)),go:()=>enter(4,()=>W.f.good.length>=3)},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.goal()});
function why(tag){let m='Switch off when it is time, keep screens away from meals and bed, and go and play.';
 if(tag==='more')m='One more show means more sitting, and it is just as hard to stop next time. Switch off now.';
 if(tag==='hide')m='A hidden tablet is still on. When the timer rings, switch it off.';
 if(tag==='bed')m='Screens keep your brain awake, so sleep comes late. Screens off in the hour before bed.';
 if(tag==='meal')m='At meals, screens go off so we can eat, talk and listen to each other.';
 if(tag==='ask')m='Phones and tablets belong to grown-ups. Always ask a grown-up first.';
 if(tag==='sit')m='After sitting at a screen, your body needs to move. Run, jump or play outside.';
 if(tag==='cross')m='Feeling cross is OK. Take a big breath, say bye to the screen, and choose what to do next.';
 return m}
function nextQ(){qi++;const Q=K.QS[qi%K.QS.length],all=[[Q.a,'ok'],...Q.o],s=qi%3,ord=all.slice(s).concat(all.slice(0,s));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function answer(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=K.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Screen time lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
