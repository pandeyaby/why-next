/* Flagship – brain science of emotions (ages 11–12): amygdala alarm vs prefrontal brake, stress hormones and recall
   (inverted U), reward system vs brake by age, suppress vs regulate, and cognitive reappraisal. Models are simplified. */
(()=>{
const EVENTS=[['💥','A loud bang behind you','It was a door slamming in the wind.'],['🐍','A snake shape on the path','Look again: it is a stick.'],['📣','Your name is called in assembly','You are getting a certificate.']];
const COPE=[['Hide it and act like nothing happened',0],['Name it: “I feel embarrassed”',1],['Tell yourself “Stop feeling this!”',0],['Breathe out slowly, then decide what to do',1],['Bottle it up for weeks',0],['Talk it through with someone you trust',1]];
const COPEWHY=['That pushes the feeling down. It still runs inside: heart rate and stress stay up.','That manages the feeling: you notice it and choose what to do, so it can settle.'];
const SITS=[['Your friend walks past you without saying hi.',[['“They hate me now.”',.92,'That thought treats a guess as a fact, so the alarm stays high. Is there another possible reason?'],['“Maybe they didn’t see me. I’ll say hi later.”',.3,''],['“I don’t care. I feel nothing.”',.78,'That is pushing the feeling down, not changing the meaning. Inside, the alarm is still up.']]],
 ['You score 4 out of 10 on a practice quiz.',[['“I’m just stupid.”',.9,'That thought labels you, not the quiz, so the alarm stays high. What does the score really tell you?'],['“Whatever. Quizzes don’t matter.”',.7,'Brushing it off is avoiding, not reappraising. The worry is still there.'],['“Now I know which topics to practise.”',.3,'']]]];
VIS.reg('flagbrain',c=>{let A,pad,qb,qi=-1,gen=0,run=0;
const fresh=()=>({next:()=>{},n:0,deck:[],grab:null,bad:-1,glow:-1,alarm:.12,pfc:0,ev:-1,lvl:.2,hi:false,age:8,ages:[],press:.3,sorted:[],sit:0,pick:-1,slide:false}),S=fresh();
const mode=()=>['alarm','horm','age','sup','re','quiz'][A.step],quick=()=>A.reduced();
const goal=()=>({alarm:2,horm:2,age:3,sup:6,re:2}[mode()]||99);
const px=n=>Math.round(n*(A.narrow?1.05:1.15));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function tx(g,t,x,y,n,o){o=o||{};g.font=`${o.w||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.mw||A.W-12)}
/* wrap t inside width mw, centred on y (max 3 lines) */
function para(g,t,x,y,n,mw,o){o=o||{};g.font=`${o.w||700} ${px(n)}px system-ui,sans-serif`;const L=[];let cur='';
 t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>mw&&cur){L.push(cur);cur=w}else cur=tr});L.push(cur);
 const k=L.slice(0,3),h=px(n)*1.2;k.forEach((l,i)=>tx(g,l,x,y+(i-(k.length-1)/2)*h,n,{...o,mw}))}
function slab(g,r,fill,stroke,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=w||2;g.strokeStyle=stroke;g.stroke()}
const inside=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const rim=()=>A.mix(A.col.tx,A.col.pn,.38),sheet=()=>A.col.dark?'#1e293b':'#ffffff',hue=(h,k)=>A.mix(A.col.pn,h,A.col.dark?.22:k||.55);
const drag=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
/* shared pieces */
function meter(g,v,x,y,w,label){const C=A.col,h=14;slab(g,{x,y,w,h},hue('#e5e7eb',.5),rim(),1);g.fillStyle=v>.66?C.rd:v>.4?C.am:C.gr;A.paint.rrect(x+1,y+1,Math.max(4,(w-2)*v),h-2,6);g.fill();
 tx(g,`${label}: ${v>.66?'high':v>.4?'medium':'low'}`,x+w/2,y-11,11)}
function brainBox(){return{x:A.W*.14,y:A.H*.06,w:A.W*.72,h:A.H*.44}}
function brain(g){const C=A.col,B=brainBox(),cx=B.x+B.w/2,cy=B.y+B.h/2;g.fillStyle=hue('#fbcfe8',.75);g.fillRect(cx+B.w*.08,B.y+B.h*.8,B.w*.1,A.H*.1);g.beginPath();g.ellipse(cx,cy,B.w/2,B.h/2,0,0,7);g.fillStyle=hue('#fbcfe8',.6);g.fill();g.lineWidth=2;g.strokeStyle=rim();g.stroke();
 g.save();g.beginPath();g.ellipse(cx,cy,B.w/2,B.h/2,0,0,7);g.clip();g.fillStyle=A.alpha(C.vi,.18+.5*S.pfc);g.fillRect(B.x,B.y,B.w*.34,B.h);g.restore();

 const ax=cx+B.w*.08,ay=cy-B.h*.02;g.beginPath();g.ellipse(ax,ay,B.w*.07,B.h*.09,.4,0,7);g.fillStyle=S.alarm>.6?C.rd:C.am;g.fill();if(S.alarm>.6){A.paint.glow(C.rd,18);g.fill();A.paint.noShadow()}
 para(g,'Prefrontal cortex: brake',B.x+B.w*.18,cy,11,B.w*.28,{w:800});
 tx(g,'Amygdala',ax,ay+B.h*.2,11,{w:800});tx(g,'(the alarm)',ax,ay+B.h*.32,11);tx(g,'front',B.x+4,B.y-2,10,{al:'left',col:C.mu})}
const evCard=()=>{const w=Math.min(A.W*.86,360);return{x:A.W/2-w/2,y:A.H*.74,w,h:A.H*.17}};
function drawAlarm(g){brain(g);meter(g,S.alarm,A.W*.15,A.H*.6,A.W*.7,'Alarm');
 if(S.ev>=0&&S.pfc>.5)para(g,'🧠 Check: '+EVENTS[S.ev][2],A.W/2,A.H*.68,11,A.W-20,{col:A.col.tx});
 const k=S.deck[0];if(k==null||S.slide)return;const r=drag(evCard());slab(g,r,sheet(),rim());tx(g,EVENTS[k][0],r.x+r.h*.45,r.y+r.h/2,r.h*.4);para(g,EVENTS[k][1],r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,12,r.w-r.h-10)}
/* inverted-U model: thinking works best with a middling level of stress hormones */
const focus=v=>Math.max(0,1-Math.pow((v-.45)/.5,2));
const track=()=>({x:A.W*.1,y:A.H*.86,w:A.W*.8});
function slider(g,v,lab,ends){const T=track(),C=A.col;g.fillStyle=A.alpha(C.mu,.35);A.paint.rrect(T.x,T.y-4,T.w,8,4);g.fill();
 const kx=T.x+T.w*v;g.beginPath();g.arc(kx,T.y,13,0,7);g.fillStyle=C.vi;g.fill();g.lineWidth=3;g.strokeStyle=sheet();g.stroke();
 tx(g,lab,A.W/2,T.y-24,12,{w:800});tx(g,ends[0],T.x,T.y+22,10,{al:'left',col:C.tx});tx(g,ends[1],T.x+T.w,T.y+22,10,{al:'right',col:C.tx})}
function drawHorm(g){const C=A.col,f=focus(S.lvl),held=Math.round(6*f),box={x:A.W*.08,y:A.H*.06,w:A.W*.84,h:A.H*.42};slab(g,box,sheet(),rim());
 tx(g,`Test facts you can recall: ${held} of 6`,A.W/2,box.y+16,12,{w:800});
 for(let i=0;i<6;i++){const x=box.x+box.w*(.13+.148*i),y=box.y+box.h*.58,on=i<held;g.beginPath();g.arc(x,y,Math.min(box.w*.06,22),0,7);g.fillStyle=on?hue('#bae6fd',.8):'transparent';g.fill();g.lineWidth=2;g.setLineDash(on?[]:[4,4]);g.strokeStyle=on?C.cy:A.alpha(C.mu,.6);g.stroke();g.setLineDash([]);tx(g,on?'💡':'',x,y,14)}
 meter(g,S.lvl,A.W*.15,A.H*.6,A.W*.7,'Adrenaline and cortisol');tx(g,'Simplified model',A.W/2,box.y+box.h-12,10,{col:C.mu});
 slider(g,S.lvl,'Drag: stress hormone level',['calm','panic'])}
const reward=a=>.4+.55*Math.exp(-Math.pow((a-15)/3.5,2)),brake=a=>Math.min(1,.2+.8*(a-6)/19);
function drawAge(g){const C=A.col,a=Math.round(S.age),bar=(y,v,lab,col)=>{tx(g,lab,A.W*.08,y-12,11,{al:'left',w:800});slab(g,{x:A.W*.08,y,w:A.W*.84,h:18},hue('#e5e7eb',.45),rim(),1);g.fillStyle=col;A.paint.rrect(A.W*.08+1,y+1,(A.W*.84-2)*v,16,7);g.fill()};
 tx(g,`Age ${a}`,A.W/2,A.H*.07,18,{w:900});bar(A.H*.22,reward(a),'Reward system (dopamine) response',C.am);bar(A.H*.38,brake(a),'Prefrontal brake: how built it is',C.vi);
 const gap=reward(a)-brake(a);para(g,a>=24?'Brake fully built: feelings are easier to steer.':gap>.15?'Big gap: strong reward and feelings, brake still building.':'Reward and brake are closer here.',A.W/2,A.H*.56,12,A.W-24,{col:C.tx});
 tx(g,'Simplified picture of average trends',A.W/2,A.H*.67,10,{col:C.mu});slider(g,(S.age-6)/20,'Drag: age',['6','26'])}
const bins2=i=>({x:A.W/2*i+6,y:A.H*.05,w:A.W/2-12,h:A.H*.42});
const copeCard=()=>{const w=Math.min(A.W*.88,370);return{x:A.W/2-w/2,y:A.H*.74,w,h:A.H*.17}};
function drawSup(g){const C=A.col;[['🫙 Suppress','push it down'],['🧭 Regulate','manage it']].forEach((b,i)=>{const r=bins2(i);slab(g,r,hue(i?'#bbf7d0':'#fecaca',.5),i===S.glow?C.vi:rim(),i===S.glow?4:2);
  tx(g,b[0],r.x+r.w/2,r.y+18,13,{w:800,mw:r.w-8});tx(g,b[1],r.x+r.w/2,r.y+36,11);const got=S.sorted.filter(k=>COPE[k][1]===i).length;tx(g,'✔'.repeat(got),r.x+r.w/2,r.y+r.h*.7,18,{col:C.tx})});
 meter(g,S.press,A.W*.15,A.H*.6,A.W*.7,'Stress inside the body');const k=S.deck[0];if(k==null)return para(g,'Suppressed feelings kept stress up; regulated ones let it settle.',A.W/2,A.H*.8,12,A.W-24);const r=drag(copeCard());slab(g,r,sheet(),S.bad===k?C.rd:rim(),S.bad===k?4:2);para(g,COPE[k][0],r.x+r.w/2,r.y+r.h/2,12,r.w-14)}
const thought=i=>({x:A.W*.05,y:A.H*(.6+i*.13),w:A.W*.9,h:A.H*.115});
function drawRe(g){const C=A.col,s=SITS[S.sit%2];para(g,s[0],A.W/2,A.H*.08,13,A.W-20,{w:800});
 const bub={x:A.W*.1,y:A.H*.17,w:A.W*.8,h:A.H*.2};g.setLineDash([6,5]);slab(g,bub,A.alpha(C.vi,.08),S.glow===0?C.vi:rim(),S.glow===0?4:2);g.setLineDash([]);
 para(g,S.pick>=0?s[1][S.pick][0]:'💭 Drop a thought here',bub.x+bub.w/2,bub.y+bub.h/2,12,bub.w-14,{w:800});meter(g,S.alarm,A.W*.15,A.H*.47,A.W*.7,'Alarm');
 if(S.n<=S.sit)s[1].forEach((t,i)=>{if(i===S.pick)return;const r=S.grab&&S.grab.k===i?drag(thought(i)):thought(i);slab(g,r,sheet(),S.bad===i?C.rd:rim(),S.bad===i?4:2);para(g,t[0],r.x+r.w/2,r.y+r.h/2,12,r.w-12)})}
function drawQuiz(g){S.alarm=.3;S.pfc=.6;brain(g)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.35);g.fillRect(0,0,A.W,A.H);({alarm:drawAlarm,horm:drawHorm,age:drawAge,sup:drawSup,re:drawRe,quiz:drawQuiz}[mode()])(g);A.fx.draw(g)}
function lit(i){S.glow=i;const v=gen;setTimeout(()=>{if(v===gen){S.glow=-1;A.redraw()}},420)}
function off(t){A.sound.miss();tell(t);A.redraw()}
function win(t){S.n++;S.bad=-1;A.sound.pop();tell(t);keys();A.redraw();S.next()}
/* a surprise reaches the brain: alarm first, the slower prefrontal check second */
function fire(){const k=S.deck[0];if(k==null||S.slide)return;S.ev=k;S.pfc=0;S.slide=true;const v=gen;A.tween(S,{alarm:.95},160,'out');tell(`${EVENTS[k][1]}! The amygdala fires the alarm in a split second: heart races, adrenaline flows.`);
 setTimeout(()=>{if(v!==gen)return;A.tween(S,{pfc:1,alarm:.25},700);S.deck.shift();S.slide=false;win(`A moment later the prefrontal cortex checks: ${EVENTS[k][2]} The alarm calms down.`)},quick()?30:1100)}
function setLvl(v){S.lvl=Math.max(0,Math.min(1,v));const f=focus(S.lvl),held=Math.round(6*f);
 if(!S.hi&&S.lvl>=.85){S.hi=true;return win(`Flooded with stress hormones: you can recall only ${held} of 6 facts. This is why minds go blank in a scary test.`)}
 if(S.hi&&S.n<2&&S.lvl>=.3&&S.lvl<=.6)return win(`A middling level: you recall ${held} of 6. A little stress can sharpen focus; too much blocks thinking.`);
 tell(`Stress hormones ${Math.round(S.lvl*100)}%: you recall ${held} of 6.`);A.redraw()}
function setAge(a){S.age=Math.max(6,Math.min(26,a));const r=Math.round(S.age),band=r<11?0:r>=13&&r<=17?1:r>=24?2:-1;
 if(band>=0&&!S.ages.includes(band)){S.ages.push(band);return win(['Age '+r+': both are still growing.','Age '+r+': the reward system is at its most responsive, but the brake is still building, so feelings hit harder.','Age '+r+': the prefrontal cortex is fully developed by the mid-twenties.'][band])}
 tell(`Age ${r}.`);A.redraw()}
function cope(i){const k=S.deck[0];if(k==null)return;lit(i);if(COPE[k][1]!==i){S.bad=k;return off('Not quite. '+COPEWHY[COPE[k][1]])}
 S.sorted.push(S.deck.shift());A.tween(S,{press:Math.max(.08,Math.min(.95,S.press+(i?-.12:.2)))},400);win(COPEWHY[i])}
function think(i){const s=SITS[S.sit%2][1][i];if(S.n>S.sit||S.n>=2)return;lit(0);S.pick=i;A.tween(S,{alarm:s[1]},500);
 if(s[2]){S.bad=i;return off(s[2])}const v=gen;win(`Reappraisal: a realistic new meaning, so the alarm drops. ${S.n>=1?'':'Next situation…'}`);
 if(S.n<2)setTimeout(()=>{if(v===gen){S.sit++;S.pick=-1;S.alarm=.85;S.bad=-1;keys();A.redraw()}},quick()?20:1100)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='alarm'&&S.deck.length)B(`${EVENTS[S.deck[0]][0]} Send it to the brain`,`Send to the brain: ${EVENTS[S.deck[0]][1]}`,fire);
 if(m==='horm'){B('◀ Less','Less stress hormone',()=>setLvl(S.lvl-.1));B('More ▶','More stress hormone',()=>setLvl(S.lvl+.1))}
 if(m==='age')[[9,'Age 9'],[15,'Age 15'],[25,'Age 25']].forEach(([a,t])=>B(t,`Set age to ${a}`,()=>setAge(a)));
 if(m==='sup'&&S.deck.length)[['🫙 Suppress',0],['🧭 Regulate',1]].forEach(([t,i])=>B(t,`${COPE[S.deck[0]][0]}: ${t.slice(3)}`,()=>cope(i)));
 if(m==='re'&&S.n<=S.sit)SITS[S.sit%2][1].forEach((t,i)=>B(t[0],`Think: ${t[0]}`,()=>think(i)))}
function down(p){const m=mode();if(m==='quiz'||S.n>=goal())return false;
 if(m==='horm'||m==='age'){const T=track();if(Math.abs(p.y-T.y)<34){S.grab={k:'s',x:null,x0:p.x,y0:p.y};move(p);return true}return false}
 if(m==='alarm'&&S.deck.length&&!S.slide&&inside(p,evCard())){S.grab={k:0,x:null,x0:p.x,y0:p.y};return true}
 if(m==='sup'){if(S.deck.length&&inside(p,copeCard())){S.grab={k:0,x:null,x0:p.x,y0:p.y};return true}const i=[0,1].find(j=>inside(p,bins2(j)));if(i!=null)cope(i);return false}
 if(m==='re'&&S.n<=S.sit){const i=[0,1,2].find(j=>j!==S.pick&&inside(p,thought(j)));if(i!=null){S.grab={k:i,x:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){const d=S.grab;if(!d)return;const m=mode();if(d.k==='s'){const T=track(),u=(p.x-T.x)/T.w;if(m==='horm')setLvl(u);else setAge(6+20*u);return}
 if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,m=mode();S.grab=null;if(!d||d.k==='s')return;const moved=d.x!=null;
 if(m==='alarm'){if(moved&&!inside(p,brainBox())){tell('Drop it onto the brain.');return A.redraw()}return fire()}
 if(m==='sup'){const i=[0,1].find(j=>inside(p,bins2(j)));if(!moved||i==null){tell('Drop it in Suppress or Regulate.');return A.redraw()}return cope(i)}
 if(m==='re'){if(moved&&!inside(p,{x:A.W*.1,y:A.H*.17,w:A.W*.8,h:A.H*.2})){tell('Drop it in the thought bubble.');return A.redraw()}return think(d.k)}}
const shut=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},quick()?j*60+30:(j+1)*(ms||500)))}
const wipe=more=>{gen++;Object.assign(S,fresh(),more||{})};
const steps=[
{h:'Alarm and brake',p:'Drag the surprise onto the brain. Which reacts first: the amygdala (alarm) or the prefrontal cortex (brake)?',predict:{q:'A sudden bang. Which part reacts first?',opts:['The prefrontal cortex: it thinks first','The amygdala: the alarm fires first'],ans:1},task:'Send 2 surprises',
 show:()=>{steps[0].go();play([fire,fire],1500)},go:()=>{wipe({deck:[0,1,2]});tell('Drag the loud bang onto the brain.');keys();S.next=shut(0,()=>S.n>=2,'The amygdala’s alarm is fast; the prefrontal cortex checks a moment later.')}},
{h:'Stress hormones',p:'Adrenaline and cortisol get you ready to act. Drag the slider right up, then find where you recall the most.',predict:{q:'In a test, does more stress hormone always help you remember?',opts:['Yes, more is always better','No, too much makes your mind go blank'],ans:1},task:'Go to panic, then find the best zone',
 show:()=>{steps[1].go();play([()=>setLvl(.9),()=>setLvl(.45)],800)},go:()=>{wipe();tell('Stress hormones low. Drag the slider up.');keys();S.next=shut(1,()=>S.n>=2,'Some stress sharpens focus, but a flood of stress hormones blocks thinking and recall.')}},
{h:'The teenage brain',p:'Drag the age slider. Compare the reward system with the prefrontal brake at 9, in the teens, and at 25.',predict:{q:'When does the prefrontal cortex finish developing?',opts:['By about age 12','In the mid-twenties'],ans:1},task:'Visit 3 ages',
 show:()=>{steps[2].go();play([()=>setAge(9),()=>setAge(15),()=>setAge(25)],800)},go:()=>{wipe();tell('Age 8. Drag the age slider.');keys();S.next=shut(2,()=>S.ages.length>=3,'In the teens the reward system is very responsive while the brake is still being built.')}},
{h:'Push down or manage?',p:'Is each move suppressing a feeling (pushing it down) or regulating it (managing it)?',predict:{q:'If you hide a feeling so nobody sees it, does the feeling go away?',opts:['Yes, hiding it switches it off','No, the body stays stressed inside'],ans:1},task:'Sort 6 moves',
 show:()=>{steps[3].go();play([0,1,2,3,4,5].map(()=>()=>cope(COPE[S.deck[0]][1])),420)},go:()=>{wipe({deck:[0,1,2,3,4,5]});tell('Hide it and act like nothing happened. Suppress or regulate?');keys();S.next=shut(3,()=>S.n>=6,'Regulating manages a feeling; suppressing hides it while the stress stays inside.')}},
{h:'Reappraise it',p:'Cognitive reappraisal means finding another realistic way to see what happened. Drag that thought into the bubble.',task:'Reappraise 2 situations',
 show:()=>{steps[4].go();play([()=>think(1),()=>think(2)],1400)},go:()=>{wipe({alarm:.85});tell(SITS[0][0]+' Pick a thought.');keys();S.next=shut(4,()=>S.n>=2,'Change the meaning, and the feeling changes with it.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Which part of the brain sets off the fast alarm?',[['The amygdala','ok'],['The prefrontal cortex','pfc'],['The brain stem','stem']]],
 ['Why can your mind go blank in a scary test?',[['A flood of stress hormones makes it hard to think and recall','ok'],['Your brain deletes what you learned','delete'],['Stress hormones always make you sharper','sharp']]],
 ['Why can feelings feel extra strong at 13?',[['The reward system is very responsive while the prefrontal cortex is still developing','ok'],['Teenage brains are broken','broken'],['The amygdala switches off in the teens','amyg']]],
 ['Which one is cognitive reappraisal?',[['Thinking of another realistic way to see what happened','ok'],['Hiding your face so nobody can tell','hide'],['Telling yourself everything is perfect','fake']]],
 ['How is regulating a feeling different from suppressing it?',[['Regulating manages it; suppressing pushes it down while it stays inside','ok'],['They are the same thing','same'],['Suppressing is the healthier choice','health']]]];
function why(t){let m='Look back at the lab.';
 if(t==='pfc')m='The prefrontal cortex is the slower brake that checks and calms. The amygdala fires the fast alarm.';
 if(t==='stem')m='The brain stem runs breathing and heartbeat. The fast alarm is the amygdala.';
 if(t==='delete')m='The memory is still there. Stress hormones make it hard to reach for a while; once calm, it comes back.';
 if(t==='sharp')m='A little stress can help focus, but too much blocks thinking. Remember the slider at panic.';
 if(t==='broken')m='Teenage brains are not broken; they are still developing, and they learn fast.';
 if(t==='amyg')m='The amygdala keeps working. The gap is that the prefrontal brake is still being built.';
 if(t==='hide')m='Hiding your face is suppressing. Reappraisal changes what the situation means to you.';
 if(t==='fake')m='Reappraisal is not pretending. The new view must be realistic, like “Maybe they didn’t see me.”';
 if(t==='same')m='They are different. Suppressing hides the feeling but stress stays inside; regulating helps it settle.';
 if(t==='health')m='Research links regular suppressing to more stress inside and worse wellbeing over time. Regulating works better.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${right?'✓ Correct.':'✗ '+why(t)}${right?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
