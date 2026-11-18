/* Flagship: Risk, Uncertainty, and Cognitive Bias (ages 11–12; PSHE Association KS3 "assess and manage risk", CASEL
   responsible decision-making). Sort risk (known odds) from uncertainty (unknown odds), watch news stories inflate how
   likely something feels but not how often it happens (availability), choose now vs later (present bias), drag the class
   middle line (optimism bias), flag groupthink in a group chat, then order a decision plan. Not flagbias (biases about
   people) or flagdecide (choices and consequences for ages 5–7). */
(()=>{
VIS.reg('flagrisk',c=>{
let R,keys,quiz,qi=-1;const v={};
const PHASE=['sort','avail','present','optim','group','plan','chal'];
const ph=()=>PHASE[R.step];
const ODDS=[['Rolling a 6 on a fair dice','r'],['Whether you will like a new club','u'],['Winning a raffle: you have 1 of 100 tickets','r'],['What job you will do at 30','u'],['A coin landing heads','r'],['How a new school will feel','u']];
const OFFERS=[[['£10 today','now'],['£11 tomorrow','later']],[['£10 in 365 days','now'],['£11 in 366 days','later']]];
const CHAT=[['Mia','Everyone’s in. Don’t be the boring one.',1,'Pressure on anyone who disagrees.'],['Jay','What time is high tide tonight?',0,'A real question about the facts: that breaks groupthink.'],['Leo','Nothing will go wrong, we’ve done loads of stuff.',1,'Feeling the group can’t fail.'],['Ava','Sam’s mum said the pier is closed. Ignore her.',1,'Brushing off a warning.'],['Sam','I’m not sure. Can we vote on it?',0,'Speaking up and asking everyone: healthy.']];
const PLAN=['Pause','List the options','Check the facts and odds','Check your values','Choose','Review how it went'];
function narrate(t){c.say(t);if(R)R.cv.setAttribute('aria-label',t)}
function put(t,x,y,px,o){o=o||{};const g=R.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||R.col.tx;g.fillText(String(t),x,y,o.m||R.W-16)}
function wrapIn(t,r,px,o){const g=R.ctx;g.font=`${(o&&o.w)||600} ${px}px system-ui,sans-serif`;const rows=[''];t.split(' ').forEach(w=>{const k=rows.length-1,n=(rows[k]+' '+w).trim();if(rows[k]&&g.measureText(n).width>r.w-14)rows.push(w);else rows[k]=n});
 const lh=px+4,y0=r.y+r.h/2-(rows.length-1)*lh/2;rows.forEach((s,j)=>put(s,r.x+r.w/2,y0+j*lh,px,Object.assign({w:600,m:r.w-8},o)))}
const hue=(k,a)=>R.mix(R.col.pn,R.col[k],R.col.dark?a*.75:a);
function card(r,k,a){const g=R.ctx;g.fillStyle=hue(k,a);R.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=1.5;g.strokeStyle=R.col.tx;g.stroke()}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function caption(t){const g=R.ctx,px=R.narrow?14:16,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const k=rows.length-1,n=(rows[k]+' '+w).trim();if(rows[k]&&g.measureText(n).width>R.W-24)rows.push(w);else rows[k]=n});
 const n=Math.min(5,rows.length),lh=px+5,top=R.H-n*lh-12;g.fillStyle=R.alpha(R.col.pn,.95);g.fillRect(0,top,R.W,R.H-top);rows.slice(0,5).forEach((s,j)=>put(s,R.W/2,top+6+lh*j+lh/2,px,{w:600}))}
/* ---- 1. risk or uncertainty ---- */
const pile=i=>{const w=(R.W-36)/2;return{x:12+i*(w+12),y:R.H*.36,w,h:R.H*.4}};
function drawSort(){const q=ODDS[v.oi];
 if(q){const r=v.cardR={x:R.W*.06,y:R.H*.08,w:R.W*.88,h:R.narrow?66:60},d=v.hold,b=d?{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h}:r;card(b,'vi',.2);wrapIn(q[0],b,R.narrow?17:19,{w:700})}
 else put('All six sorted ✓',R.W/2,R.H*.16,R.narrow?18:20,{c:R.col.gr});
 [['r','Risk','odds known','cy'],['u','Uncertainty','odds unknown','am']].forEach(([k,t,s,col],i)=>{const r=pile(i);card(r,col,.14);put(t,r.x+r.w/2,r.y+20,R.narrow?16:18,{w:800});put(s,r.x+r.w/2,r.y+40,R.narrow?13:14,{w:500});
  v.sorted.filter(x=>x[1]===k).forEach((x,j)=>put('✓ '+x[0],r.x+r.w/2,r.y+66+j*22,R.narrow?12:14,{w:600,m:r.w-8}))})}
function sortOdds(k){const q=ODDS[v.oi];v.hold=null;if(!q)return;
 if(k!==q[1])return say(q[1]==='r'?`"${q[0]}": you can work out the odds exactly, so it is a risk.`:`"${q[0]}": nobody can give you the odds, so it is uncertain.`,false);
 v.sorted.push(q);v.oi++;if(v.oi>=ODDS.length){v.sortOk=true;return say('Risk: you know the odds. Uncertainty: you cannot know them, so values and planning matter more.',true)}say(k==='r'?'Yes: the odds are known.':'Yes: no one knows the odds.',true)}
/* ---- 2. availability ---- */
function drawAvail(){const g=R.ctx,base=R.H*.62,bw=R.W*.22,top=R.H*.16;put('Sharks vs mosquitoes',R.W/2,22,R.narrow?18:21,{w:800});
 const feel=Math.min(1,.15+v.news*.28),real=v.reveal;const bar=(x,h,k,l1,l2)=>{g.fillStyle=R.col[k];g.fillRect(x,base-h,bw,h);put(l1,x+bw/2,base+18,R.narrow?13:15,{w:700,m:bw+14});put(l2,x+bw/2,base+36,R.narrow?12:13,{w:500,m:bw+14})};
 bar(R.W*.06,(base-top)*feel,'pk','feels likely',`${v.news} shark stories`);
 if(real){bar(R.W*.39,4,'cy','sharks','under 15 a year');bar(R.W*.72,base-top,'gr','mosquitoes','600,000+ a year')}
 else{card({x:R.W*.42,y:top,w:R.W*.52,h:base-top},'cy',.08);wrapIn('Real yearly deaths: watch 3 stories, then look',{x:R.W*.42,y:top,w:R.W*.52,h:base-top},R.narrow?14:16)}
 v.tv={x:R.W*.06,y:R.H*.07+18,w:R.W*.36,h:44};if(v.news<3){card(v.tv,'pk',.25);put('📰 Watch a story',v.tv.x+v.tv.w/2,v.tv.y+22,R.narrow?14:16,{m:v.tv.w-6})}}
function watch(){if(v.news>=3)return;v.news++;if(v.news<3)return say(`Story ${v.news}: a shark attack. Sharks feel more likely now. Did the real number change?`,true);
 v.reveal=v.availOk=true;say('Malaria, spread by mosquitoes, killed about 600,000 people in 2022. Sharks kill under 15 a year. Vivid stories made sharks feel likely: availability bias.',true)}
/* ---- 3. present bias ---- */
const offerR=j=>{const w=(R.W-36)/2;return{x:12+j*(w+12),y:R.H*(v.pi===0?.2:.48),w,h:R.narrow?70:62}};
function drawPresent(){put('Pick one in each pair',R.W/2,22,R.narrow?17:20,{w:800});
 OFFERS.forEach((pair,i)=>{put(i===0?'Choice A: soon':'Choice B: far away',R.W/2,R.H*(i===0?.14:.42),R.narrow?14:16,{w:600,c:R.col.mu});
  pair.forEach(([t],j)=>{const w=(R.W-36)/2,r={x:12+j*(w+12),y:R.H*(i===0?.2:.48),w,h:R.narrow?70:62},got=v.pick[i];card(r,got===j?'gr':'vi',got===j?.4:got!=null?.06:.2);wrapIn(t,r,R.narrow?18:20,{w:800,c:got!=null&&got!==j?R.col.mu:R.col.tx})})})}
function choose(i,j){if(v.pick[i]!=null||v.presOk)return;if(i===1&&v.pick[0]==null)return say('Make choice A first.',false);v.pick[i]=j;
 if(i===0)return say(`You picked ${OFFERS[0][j][0]}. Now choice B: the same one-day wait, a year away.`,true);
 v.presOk=true;const sw=v.pick[0]===0&&v.pick[1]===1;
 say(sw?'You switched: you would not wait a day now, but would wait a day in a year. That is present bias: now feels bigger than later.':v.pick[0]===v.pick[1]?'You were consistent. Many people switch: they take £10 today but wait for £11 when both are a year away. That is present bias.':'You waited now but not later: unusual! Most people do the opposite, which is present bias.',true)}
/* ---- 4. optimism bias ---- */
function drawOptim(){const g=R.ctx,n=30,cols=R.narrow?10:15,rows=n/cols,gap=(R.W-40)/cols,y0=R.H*.2;
 put('30 drivers, least safe → most safe',R.W/2,22,R.narrow?16:19,{w:800});
 for(let i=0;i<n;i++){const x=20+gap*((i%cols)+.5),y=y0+Math.floor(i/cols)*gap*1.05,said=i>1;R.paint.ball(x,y,Math.min(12,gap*.32),i<v.line?R.col.am:R.col.cy);if(said){g.strokeStyle=R.col.tx;g.lineWidth=1.5;g.beginPath();g.arc(x,y,Math.min(12,gap*.32)+3,0,7);g.stroke()}}
 const yb=y0+rows*gap*1.05+10;put(`below the line (amber): ${v.line}   above: ${n-v.line}`,R.W/2,yb,R.narrow?15:17,{w:700,c:v.line===15?R.col.gr:R.col.tx});
 put('ringed = said “I’m safer than the middle”: 28',R.W/2,yb+26,R.narrow?13:15,{w:600});
 v.track={x:20,y:yb+44,w:R.W-40,h:40};const g2=R.ctx;g2.strokeStyle=R.col.tx;g2.lineWidth=3;g2.beginPath();g2.moveTo(20,yb+64);g2.lineTo(R.W-20,yb+64);g2.stroke();
 const kx=20+(R.W-40)*v.line/n;R.paint.ball(kx,yb+64,14,R.col.vi);put('middle line',kx,yb+90,13,{w:600})}
function setLine(k){if(v.optOk)return;v.line=Math.max(0,Math.min(30,Math.round(k)));narrate(`${v.line} below the middle`);R.redraw()}
function checkLine(){if(v.optOk)return;if(v.line!==15)return say(v.line<15?`Only ${v.line} are below. The middle splits the class in half.`:`${v.line} below is more than half. The middle splits the class in half.`,false);
 v.optOk=true;say('Only 15 of 30 can be safer than the middle, yet 28 said they were. That is optimism bias: “it won’t happen to me”.',true)}
/* ---- 5. groupthink ---- */
const bubble=i=>({x:R.W*.05,y:R.H*.08+i*(R.narrow?62:56),w:R.W*.9,h:R.narrow?54:48});
function drawGroup(){CHAT.forEach(([who,txt,bad],i)=>{const r=bubble(i),f=v.flag[i];card(r,f===1?'rd':f===0?'gr':'vi',f!=null?.3:.12);
 put(who,r.x+10,r.y+14,13,{a:'left',w:800,c:R.col.vi});wrapIn(txt,{x:r.x+40,y:r.y+8,w:r.w-46,h:r.h-8},R.narrow?14:16);if(f!=null)put(f?'⚑':'✓',r.x+r.w-14,r.y+14,16,{w:800})})}
function flagMsg(i){if(v.flag[i]!=null||v.grpOk)return;const [who,,bad,why]=CHAT[i];
 if(!bad){v.flag[i]=0;return say(`${who}: ${why}`,false)}
 v.flag[i]=1;const got=CHAT.filter((m,j)=>m[2]&&v.flag[j]===1).length;if(got===3){v.grpOk=true;return say('Three groupthink signs: pressure, feeling safe in a group, and ignoring a warning. Teens take more risks with friends watching.',true)}say(`Yes: ${why}`,true)}
/* ---- 6. decision plan ---- */
const slotR=i=>({x:R.W*.06,y:R.H*.06+i*(R.narrow?44:42),w:R.W*.4,h:R.narrow?38:36});
const chipR=i=>({x:R.W*.54,y:R.H*.06+i*(R.narrow?44:42),w:R.W*.4,h:R.narrow?38:36});
function drawPlan(){PLAN.forEach((s,i)=>{const r=slotR(i),got=v.order[i];card(r,got!=null?'gr':'vi',got!=null?.3:.06);wrapIn(got!=null?`${i+1}. ${got}`:`${i+1}.`,r,R.narrow?12:15,{w:700})});
 v.mix.forEach((s,i)=>{if(v.order.includes(s))return;const r=v.hold&&v.hold.i===i?{x:v.hold.x-R.W*.2,y:v.hold.y-18,w:R.W*.4,h:36}:chipR(i);card(r,'am',.24);wrapIn(s,r,R.narrow?12:15,{w:700})})}
function placeStep(i){const s=v.mix[i],k=v.order.length;if(v.order.includes(s)||v.planOk)return;
 if(s!==PLAN[k]){const tip=['Start by stopping to think, before anything else.','Before you can choose, list what you could do.','Next, find out the facts and the odds for each option.','Facts alone may not decide it. What matters to you?','Now you have options, facts and values: choose.','Last, look back: what would you do again?'];return say(tip[k],false)}
 v.order.push(s);if(v.order.length===PLAN.length){v.planOk=true;return say('Pause, options, facts and odds, values, choose, review. Values decide when facts can’t.',true)}say(`${k+1}. ${s}`,true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=R,m=ph();g.fillStyle=R.mix(C.pn,C.vi,.04);g.fillRect(0,0,W,H);
 if(m==='chal'){put('🎲 Spot the bias',W/2,H*.42,R.narrow?20:24);put('Answer below',W/2,H*.56,15,{c:C.mu,w:500});R.fx.draw(g);return}
 ({sort:drawSort,avail:drawAvail,present:drawPresent,optim:drawOptim,group:drawGroup,plan:drawPlan})[m]();if(v.msg)caption(v.msg);R.fx.draw(g)}
function say(t,good){v.msg=t;if(good)R.sound.pop();else if(good===false)R.sound.miss();narrate(t);controls();R.redraw();v.check&&v.check()}
function fresh(){for(const k in v)delete v[k];Object.assign(v,{oi:0,sorted:[],news:0,pick:[null,null],line:5,flag:{},order:[],mix:[2,0,4,1,5,3].map(i=>PLAN[i]),msg:'',check:()=>{}});if(R)R.redraw()}
function controls(){if(!keys)return;keys.innerHTML='';const m=ph();if(m==='chal')return;
 const b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(m==='sort'&&ODDS[v.oi]){b('Risk: odds known',()=>sortOdds('r'),`${ODDS[v.oi][0]}: risk`);b('Uncertainty: odds unknown',()=>sortOdds('u'),`${ODDS[v.oi][0]}: uncertainty`)}
 if(m==='avail'&&v.news<3)b('📰 Watch a shark story',watch);
 if(m==='present'&&!v.presOk){const i=v.pick[0]==null?0:1;OFFERS[i].forEach(([t],j)=>b(t,()=>choose(i,j),`Choice ${i?'B':'A'}: ${t}`))}
 if(m==='optim'&&!v.optOk){b('◀ Line left',()=>setLine(v.line-1));b('Line right ▶',()=>setLine(v.line+1));b('Check the middle',checkLine)}
 if(m==='group'&&!v.grpOk)CHAT.forEach(([who,t],i)=>{if(v.flag[i]==null)b(`⚑ ${who}`,()=>flagMsg(i),`Flag ${who}: ${t}`)});
 if(m==='plan'&&!v.planOk)v.mix.forEach((s,i)=>{if(!v.order.includes(s))b(s,()=>placeStep(i),`Next step: ${s}`)})}
function grab(p){const m=ph();if(m==='chal')return false;
 if(m==='sort'&&ODDS[v.oi]){if(on(p,v.cardR)){v.hold={x:p.x,y:p.y};return true}for(let i=0;i<2;i++)if(on(p,pile(i))){sortOdds(i?'u':'r');return true}return false}
 if(m==='avail'&&v.news<3&&on(p,v.tv)){watch();return true}
 if(m==='present'&&!v.presOk){for(let i=0;i<2;i++)for(let j=0;j<2;j++){const w=(R.W-36)/2,r={x:12+j*(w+12),y:R.H*(i===0?.2:.48),w,h:R.narrow?70:62};if(on(p,r)){choose(i,j);return true}}return false}
 if(m==='optim'&&!v.optOk&&v.track&&on(p,v.track)){v.slide=true;setLine((p.x-20)/(R.W-40)*30);return true}
 if(m==='group'&&!v.grpOk){const i=CHAT.findIndex((x,j)=>on(p,bubble(j)));if(i>=0){flagMsg(i);return true}return false}
 if(m==='plan'&&!v.planOk){const i=v.mix.findIndex((s,j)=>!v.order.includes(s)&&on(p,chipR(j)));if(i>=0){v.hold={i,x:p.x,y:p.y};return true}}
 return false}
function slide(p){if(v.slide)return setLine((p.x-20)/(R.W-40)*30);if(v.hold){v.hold.x=p.x;v.hold.y=p.y;R.redraw()}}
function release(){const m=ph(),d=v.hold;if(v.slide){v.slide=false;return checkLine()}if(!d)return;v.hold=null;
 if(m==='sort'){const i=[0,1].find(j=>on(d,pile(j)));return i!=null?sortOdds(i?'u':'r'):R.redraw()}
 if(m==='plan')return placeStep(d.i)}
const when=(i,ok,line)=>()=>{if(R.step===i&&!R.isDone&&(R.pred[i]!=null||!steps[i].predict)&&ok())R.done(line()+R.reveal(i))};
function run(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(R.step===i)f()},R.reduced()?30*(j+1):(j+1)*380))}
function enter(i,hint,ok,line){fresh();say(hint);v.check=when(i,ok,line)}
const steps=[
{h:'Risk or uncertainty?',p:'With a risk you know the odds, like 1 in 6 for a dice. With uncertainty nobody knows the odds, so you have to decide another way.',
 task:'Sort all six',show:()=>run(0,ODDS.map(q=>()=>sortOdds(q[1]))),
 go:()=>enter(0,'Drag the card to Risk or Uncertainty, or tap a box.',()=>v.sortOk,()=>'Known odds vs unknown odds.')},
{h:'Easy to imagine is not the same as likely',p:'The availability bias: we judge how likely something is by how easily examples come to mind. News, films and stories make rare things easy to picture.',
 predict:{q:'Which kills more people each year?',opts:['sharks','mosquitoes'],ans:1},
 task:'Watch 3 stories, then compare',show:()=>run(1,[watch,watch,watch]),
 go:()=>enter(1,'Tap the news button. Watch the pink bar, then the real numbers.',()=>v.availOk,()=>'Feeling likely ≠ being likely.')},
{h:'Now or later?',p:'Present bias: a reward now feels much bigger than the same reward later. It is why revision gets pushed to tomorrow.',
 predict:{q:'Will most people make the same choice in A and B?',opts:['yes: the wait is one day both times','no: many switch'],ans:1},
 task:'Make both choices',show:()=>run(2,[()=>choose(0,0),()=>choose(1,1)]),
 go:()=>enter(2,'Tap the one you would really pick in choice A, then choice B.',()=>v.presOk,()=>'Now feels bigger than later.')},
{h:'It won’t happen to me',p:'Optimism bias: most people think bad things are less likely to happen to them than to others. In one study, 93% of students rated their driving above the middle.',
 predict:{q:'In a class of 30, how many can be safer than the middle person?',opts:['15 at most','28','all 30'],ans:0},
 task:'Drag the middle line to split the class',show:()=>run(3,[()=>setLine(15),checkLine]),
 go:()=>enter(3,'Drag the purple dot so the line splits the class in half.',()=>v.optOk,()=>'Most cannot be above the middle.')},
{h:'Spot groupthink',p:'Groupthink: a group wants to agree so much that no one checks the plan. Teens take more risks when friends are watching.',
 task:'Flag the 3 groupthink messages',show:()=>run(4,CHAT.map((x,i)=>x[2]?()=>flagMsg(i):null).filter(Boolean)),
 go:()=>enter(4,'The group plans to jump off a pier at night. Tap a message that shows groupthink.',()=>v.grpOk,()=>'Pressure, “can’t fail”, ignoring warnings.')},
{h:'A plan for big choices',p:'A plan slows your brain down so biases have less pull. When facts can’t decide, your values do.',
 task:'Put the six steps in order',show:()=>run(5,PLAN.map(s=>()=>placeStep(v.mix.indexOf(s)))),
 go:()=>enter(5,'Tap or drag the steps into order, starting with the first.',()=>v.planOk,()=>'Pause, options, facts, values, choose, review.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>v.check()});
const QS=[
 ['After seeing plane-crash news, Zoe thinks flying is riskier than driving. Which bias?',[['availability','ok'],['present bias','now'],['groupthink','group']]],
 ['“I’ll start revising tomorrow, tonight’s game matters more.” Which bias?',[['present bias','ok'],['optimism bias','me'],['availability','vivid']]],
 ['“Other people get scammed online, but I never would.” Which bias?',[['optimism bias','ok'],['groupthink','group'],['present bias','now']]],
 ['Joining a sports team you’ve never tried. Risk or uncertainty?',[['uncertainty: the odds can’t be known','ok'],['risk: the odds are known','known'],['neither','known']]],
 ['Nobody in the group chat questions a plan, and one person who doubts it gets mocked. What is this?',[['groupthink','ok'],['availability','vivid'],['optimism bias','me']]],
 ['The facts don’t settle a choice. What should decide it?',[['your values','ok'],['whatever the group says','group'],['whatever is fun right now','now']]]];
function name(t){let m='Name the bias by what is pulling your judgement.';
 if(t==='now')m='Present bias is about now vs later. Is that the pull here?';
 if(t==='group')m='Groupthink needs a group pushing to agree. Look for who is deciding.';
 if(t==='me')m='Optimism bias is “it won’t happen to me”. Is the person rating their own risk?';
 if(t==='vivid')m='Availability is when vivid examples make something feel common. Is a story or image doing the work?';
 if(t==='known')m='Risk needs known odds, like a dice. Can anyone give you the odds here?';
 return m}
function ask(){qi++;const q=QS[qi%QS.length],r=qi%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 quiz.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>score(t)});narrate('Challenge: '+q[0]);R.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)R.win();else R.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+name(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
R=FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:X=>{quiz.hidden=X.step!==6;keys.hidden=X.step===6;controls()},
 init:A=>{R=A;fresh();const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Decision buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down:grab,move:slide,up:release});controls()}});
R.start()})})();
