/* Flagship – how emotions feel in your body (ages 7–9): stick body clues (butterflies, racing heart, clenched fists, tight
shoulders) where you feel them, decode each clue into a feeling, test one racing heart in two scenes (scared or excited),
turn the body alarm up and breathe it back down, then scan Sam from head to toes before the school play. */
(()=>{
// [emoji, clue, zone, feeling it usually signals]
const CLUES=[['🦋','Butterflies','tummy','nervous'],['💓','Racing heart','chest','scared'],['✊','Clenched fists','hands','angry'],['🪨','Tight shoulders','shoulders','stressed']];
const ZONES={head:'head',shoulders:'shoulders',chest:'chest',tummy:'tummy',hands:'hands',legs:'legs'};
const ZK=Object.keys(ZONES);
const DEC=[0,2,3],NAMES=['nervous','angry','stressed','sleepy'];
// [emoji, scene, feeling, wrong pick message]
const SCENES=[['🛝','You whizz down the giant slide you love.','excited','You love this slide! The same fast heart can mean excited.'],
['🐕','A big dog runs at you, barking.','scared','A dog running at you is a danger. Here the fast heart means scared.']];
// body scan for Sam before the play: [zone, what Sam notices]
const SCAN=[['head','Thoughts racing: “What if I forget my words?”'],['shoulders','Shoulders up near his ears'],['chest','Heart going fast'],['tummy','Fluttery tummy'],['hands','Sweaty hands'],['legs','Wobbly knees']];
VIS.reg('flagsoma',c=>{let A,pad,quiz;c.fig.classList.add('young');
const S={put:{},pick:null,held:null,at:null,from:null,bad:null,named:{},sel:null,felt:[0,0],said:[null,null],alarm:0,peak:0,breaths:0,scan:0,scanBad:null,guess:null,beat:0,tok:0,onChange:()=>{}};
const mode=()=>['map','decode','heart','alarm','scan','quiz'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const z=n=>Math.round(n*(A.narrow?1.15:1.4)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;

// the body figure and its zones
const fig=()=>{const w=Math.min(A.W*.44,A.H*.62),h=A.H*.92;return{x:A.W*.03+(A.W*.44-w)/2,y:A.H*.04,w,h}};
function zone(k){const f=fig(),X=f.x,Y=f.y,W=f.w,H=f.h;
return{head:{x:X+W*.32,y:Y,w:W*.36,h:H*.17},shoulders:{x:X+W*.1,y:Y+H*.19,w:W*.8,h:H*.08},chest:{x:X+W*.28,y:Y+H*.28,w:W*.44,h:H*.13},
tummy:{x:X+W*.28,y:Y+H*.42,w:W*.44,h:H*.13},hands:{x:X,y:Y+H*.5,w:W,h:H*.1},legs:{x:X+W*.26,y:Y+H*.66,w:W*.48,h:H*.32}}[k]}
const zoneAt=p=>ZK.find(k=>hit(p,zone(k)));
function body(g,glowZone){const C=A.col,f=fig(),X=f.x,Y=f.y,W=f.w,H=f.h,skin=A.mix(C.pn,'#f5c9a0',C.dark?.35:.75),edge=A.alpha(C.tx,.55);
g.fillStyle=skin;g.strokeStyle=edge;g.lineWidth=2;
g.beginPath();g.arc(X+W/2,Y+H*.085,Math.min(W*.17,H*.085),0,7);g.fill();g.stroke();
A.paint.rrect(X+W*.22,Y+H*.19,W*.56,H*.38,W*.12);g.fill();g.stroke();
[[X+W*.04,Y+H*.21],[X+W*.84,Y+H*.21]].forEach(([x,y])=>{A.paint.rrect(x,y,W*.12,H*.36,W*.06);g.fill();g.stroke()});
[[X+W*.28],[X+W*.53]].forEach(([x])=>{A.paint.rrect(x,Y+H*.57,W*.19,H*.41,W*.07);g.fill();g.stroke()});
if(glowZone){const r=zone(glowZone);g.fillStyle=A.alpha(C.or,.22);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.or;g.lineWidth=3;g.stroke()}}
function chip(g,r,t,col,on,bad){g.fillStyle=A.alpha(bad?C().rd:col,on?.24:.12);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=bad?C().rd:col;g.lineWidth=on||bad?3.5:2;g.stroke();
g.font=font(12);g.textAlign='center';g.textBaseline='middle';g.fillStyle=C().tx;g.fillText(t,r.x+r.w/2,r.y+r.h/2,r.w-8)}
const C=()=>A.col;
function text(g,t,x,y,n,col,w,al){g.font=font(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||C().tx;g.fillText(t,x,y,al==='left'?A.W-x-6:A.W-12)}
function lines(g,t,x,y,w,n,col){g.font=font(n,700);const out=[];let ln='';t.split(' ').forEach(s=>{const tr=ln?ln+' '+s:s;if(g.measureText(tr).width>w&&ln){out.push(ln);ln=s}else ln=tr});out.push(ln);
out.forEach((l,i)=>text(g,l,x,y+i*z(n)*1.25,n,col,700,'left'));return out.length}
const right=()=>({x:A.W*.5,w:A.W*.47});
const slot=i=>{const R=right(),h=Math.min(A.H*.15,z(46));return{x:R.x,y:A.H*.06+i*(h+A.H*.035),w:R.w,h}};

// drawing
function drawMap(g){body(g,S.held!=null&&S.at?zoneAt(S.at):null);
CLUES.forEach(([e,t,k],i)=>{if(S.put[i]){const r=zone(k);text(g,e,r.x+r.w/2,r.y+r.h/2,20,null,400);return}
let r=slot(i);if(S.held===i&&S.at)r={...r,x:S.at.x-r.w/2,y:S.at.y-r.h/2};chip(g,r,`${e} ${t}`,C().cy,S.pick===i,S.bad===i)});
text(g,'Drag each clue to where you feel it',A.W*.735,A.H*.94,10,C().tx,700)}
function drawDecode(g){body(g,S.sel!=null?CLUES[S.sel][2]:null);
DEC.forEach(i=>{const[e,t,k,f]=CLUES[i];const r=zone(k);text(g,e,r.x+r.w/2,r.y+r.h/2,20,null,400);
if(S.named[i])text(g,f,r.x+r.w/2,r.y+r.h+z(9),11,C().tx,800)});
NAMES.forEach((n,j)=>chip(g,slot(j),n,C().pk,false,S.bad===j));
const R=right();text(g,S.sel!=null?`${CLUES[S.sel][1]}: which feeling?`:'Tap a clue on the body',R.x+R.w/2,A.H*.86,11,C().tx,800)}
function heart(g,x,y,r,beat){const k=1+.12*Math.max(0,Math.sin(beat));g.save();g.translate(x,y);g.scale(k,k);g.fillStyle='#dc2626';g.beginPath();
g.moveTo(0,r*.35);g.bezierCurveTo(-r*1.1,-r*.35,-r*.5,-r*1.05,0,-r*.45);g.bezierCurveTo(r*.5,-r*1.05,r*1.1,-r*.35,0,r*.35);g.fill();g.restore()}
const sceneR=i=>A.narrow?{x:8,y:8+i*(A.H*.49),w:A.W-16,h:A.H*.46}:{x:8+i*(A.W/2),y:8,w:A.W/2-16,h:A.H-16};
function drawHeart(g){SCENES.forEach(([e,t,f],i)=>{const r=sceneR(i),done=S.said[i]===f;g.fillStyle=A.alpha(done?C().gr:C().mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
g.strokeStyle=done?C().gr:A.alpha(C().tx,.35);g.lineWidth=done?3:1.5;g.stroke();text(g,e,r.x+r.w*.18,r.y+r.h*.26,30,null,400);
lines(g,t,r.x+r.w*.34,r.y+r.h*.16,r.w*.62,11,C().tx);
const hx=r.x+r.w*.2,hy=r.y+r.h*.68;heart(g,hx,hy,Math.min(26,r.h*.16),S.felt[i]?S.beat:0);
text(g,S.felt[i]?'Fast! Thump-thump-thump':'Tap the heart to feel it',r.x+r.w*.36,hy,10,C().tx,700,'left');
if(S.said[i])text(g,done?`✓ ${f}`:`not ${S.said[i]}?`,r.x+r.w/2,r.y+r.h*.9,12,done?C().gr:C().rd,800)})}
function meter(g,y,label,v,lo,hi){const R={x:A.W*.5,w:A.W*.46};text(g,label,R.x,y,11,C().tx,800,'left');const by=y+z(14),bw=R.w;
g.strokeStyle=A.alpha(C().tx,.6);g.lineWidth=1.5;A.paint.rrect(R.x,by,bw,14,7);g.stroke();g.fillStyle=v>.6?'#dc2626':v>.3?'#d97706':'#16a34a';A.paint.rrect(R.x+2,by+2,Math.max(6,(bw-4)*v),10,5);g.fill();
text(g,lo,R.x,by+z(26),9,C().tx,600,'left');text(g,hi,R.x+bw,by+z(26),9,C().tx,600,'right')}
const dialR=()=>{const f=fig();return{x:f.x+f.w*.15,y:A.H*.1,w:f.w*.7,h:A.H*.8}};
function drawAlarm(g){const r=dialR(),v=S.alarm;g.fillStyle=A.alpha(C().mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=A.alpha(C().tx,.4);g.lineWidth=1.5;g.stroke();
const ty=r.y+r.h*(1-v);g.fillStyle=A.alpha(v>.6?'#dc2626':'#16a34a',.25);A.paint.rrect(r.x+3,ty,r.w-6,r.y+r.h-ty-3,13);g.fill();
text(g,'🚨',r.x+r.w/2,r.y+z(18),20,null,400);text(g,'😌',r.x+r.w/2,r.y+r.h-z(18),20,null,400);
g.fillStyle=C().or;A.paint.rrect(r.x-6,ty-9,r.w+12,18,9);g.fill();text(g,'drag',r.x+r.w/2,ty,10,'#111',800);
text(g,'Body alarm',r.x+r.w/2,r.y-z(2)<12?12:r.y-z(6),11,C().tx,800);
const y0=A.H*.06,gap=A.H*.2;meter(g,y0,'💓 Heart',.15+.8*v,'slow','fast');meter(g,y0+gap,'🌬️ Breathing',.15+.8*v,'slow','quick');
meter(g,y0+gap*2,'💪 Muscles',.1+.85*v,'loose','tight');meter(g,y0+gap*3,'🦋 Tummy',.1+.85*v,'calm','fluttery')}
function drawScan(g){body(g,S.scan<SCAN.length?SCAN[S.scan][0]:null);
if(S.scanBad){const r=zone(S.scanBad);g.strokeStyle=C().rd;g.lineWidth=3;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const R=right();let y=A.H*.06;text(g,'🎭 Sam, just before the school play',R.x,y,11,C().tx,800,'left');y+=z(20);
SCAN.slice(0,S.scan).forEach(([k,t])=>{const n=lines(g,`✓ ${t}`,R.x,y,R.w,10,C().tx);y+=n*z(10)*1.25+6});
if(S.scan>=SCAN.length)text(g,S.guess==='nervous'?'Sam feels nervous.':'So how does Sam feel?',R.x,A.H*.92,12,S.guess==='nervous'?C().gr:C().tx,800,'left')}
function draw(A){const{ctx:g,W,H}=A;g.fillStyle=A.mix(C().pn,'#ffe4e6',C().dark?.04:.28);g.fillRect(0,0,W,H);const m=mode();
if(m==='map')drawMap(g);if(m==='decode')drawDecode(g);if(m==='heart')drawHeart(g);if(m==='alarm')drawAlarm(g);if(m==='scan')drawScan(g);
if(m==='quiz'){body(g,null);text(g,'❓',A.W*.73,A.H/2,48,null,400)}A.fx.draw(g)}

// actions
const left=()=>CLUES.map((x,i)=>i).filter(i=>!S.put[i]);
function place(i,k){if(i==null||S.put[i])return;S.held=null;S.at=null;const[e,t,want]=CLUES[i];
if(k!==want){S.bad=i;S.pick=i;A.sound.miss();tell(k==='head'&&want==='tummy'?`${t} are not a thought. You feel them low down, in your tummy.`:`Where do you feel ${t.toLowerCase()}? Not in your ${k}. Try again.`);buttons();return}
S.put[i]=1;S.bad=null;S.pick=left()[0]??null;A.sound.pop();report(`${t}: you feel them in your ${k}.`)}
function name(j){if(S.sel==null||S.named[S.sel])return;const[,t,,f]=CLUES[S.sel],n=NAMES[j];
if(n!==f){S.bad=j;A.sound.miss();tell(n==='sleepy'?`${t} is a busy, wide-awake clue. Sleepy bodies feel heavy and slow.`:t==='Butterflies'&&n==='angry'?'Butterflies are fluttery and wobbly, not hot and tight. Think about a test.':`${t} usually means a different feeling. Think when you feel it.`);A.redraw();return}
S.named[S.sel]=1;S.bad=null;A.sound.pop();const nx=DEC.find(i=>!S.named[i]);S.sel=nx??null;report(`${t} often means ${f}.`)}
function feel(i){if(S.felt[i])return;S.felt[i]=1;A.sound.tick();pulse();report('Fast heart! Now, which feeling is it here?')}
function label(i,f){if(!S.felt[i]){tell('Tap the heart first to feel it.');return}if(S.said[i]===SCENES[i][2])return;S.said[i]=f;
if(f!==SCENES[i][2]){A.sound.miss();tell(SCENES[i][3]);A.redraw();return}A.sound.pop();report(`Yes, ${f}. The heart was fast both times.`)}
function setAlarm(v){S.alarm=Math.max(0,Math.min(1,v));S.peak=Math.max(S.peak,S.alarm);if(S.alarm>.85&&!S.upSaid){S.upSaid=1;report('Alarm on high: fast heart, quick breaths, tight muscles, fluttery tummy.')}else A.redraw()}
function breathe(){if(S.peak<.85){tell('Turn the alarm up first. Drag it to the top.');return}S.breaths++;A.sound.tick();
S.alarm=Math.max(0,S.alarm-.3);
report(S.alarm<.15?'Slow breaths told the body it is safe. The alarm is down.':`Slow breath in… and out. Breath ${S.breaths}.`)}
function scanAt(k){if(S.scan>=SCAN.length)return;if(k!==SCAN[S.scan][0]){S.scanBad=k;A.sound.miss();tell(`Scan in order, from head to toes. Next: ${SCAN[S.scan][0]}.`);A.redraw();return}
S.scanBad=null;S.scan++;A.sound.tick();report(SCAN[S.scan-1][1]+'.')}
function guess(f){if(S.scan<SCAN.length)return;S.guess=f;if(f!=='nervous'){A.sound.miss();tell(f==='ill'?'Sam is not ill. These clues came just before the play. Think about how he feels about it.':'Angry bodies feel hot, with clenched fists. Sam’s clues are fluttery and wobbly.');A.redraw();return}
A.sound.pop();report('Nervous! Noticing the clues is the first step to helping yourself.')}
let pulseOn=0;function pulse(){if(pulseOn)return;pulseOn=1;A.every(dt=>{if(mode()!=='heart'||!S.felt.some(Boolean))return false;S.beat+=dt*13;return !A.reduced()})}
function report(msg){const m=mode();let t='';
if(m==='map')t=left().length?`Still to place: ${left().map(i=>CLUES[i][1]).join(', ')}.`:'All 4 clues placed.';
else if(m==='decode')t=S.sel!=null?`${CLUES[S.sel][1]}: pick the feeling.`:'All named.';
else if(m==='heart')t=SCENES.map((s,i)=>S.said[i]===s[2]?'':`Scene ${i+1}: ${s[1]}`).filter(Boolean).join(' ');
else if(m==='alarm')t=S.peak<.85?'Drag the alarm up to the top.':S.alarm>=.15?'Now tap Slow breath to calm it.':'';
else if(m==='scan')t=S.scan<SCAN.length?`Tap Sam’s ${SCAN[S.scan][0]}.`:S.guess==='nervous'?'':'How does Sam feel?';
tell((msg?msg+' ':'')+t);buttons();S.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f;return e};
if(m==='map'){if(S.pick==null)S.pick=left()[0]??null;if(S.pick!=null){left().forEach(i=>{if(i!==S.pick)b(`${CLUES[i][0]} ${CLUES[i][1]}`,()=>{S.pick=i;S.bad=null;buttons()},`Choose ${CLUES[i][1]}`)});
ZK.forEach(k=>b(`Put on ${k}`,()=>place(S.pick,k),`Put ${CLUES[S.pick][1]} on the ${k}`))}}
if(m==='decode'){DEC.forEach(i=>{if(!S.named[i]&&S.sel!==i)b(`${CLUES[i][0]} ${CLUES[i][1]}`,()=>{S.sel=i;S.bad=null;report()},`Choose the clue ${CLUES[i][1]}`)});
if(S.sel!=null)NAMES.forEach((n,j)=>b(n,()=>name(j),`${CLUES[S.sel][1]} means ${n}`))}
if(m==='heart')SCENES.forEach(([e,t,f],i)=>{if(S.said[i]===f)return;if(!S.felt[i])b(`💓 Feel heart ${i+1}`,()=>feel(i),`Feel the heart in scene ${i+1}`);
else['scared','excited'].forEach(x=>b(`${e} ${x}`,()=>label(i,x),`Scene ${i+1}: ${x}`))});
if(m==='alarm'){b('⬆ Alarm up',()=>setAlarm(S.alarm+.35));b('🌬️ Slow breath',breathe)}
if(m==='scan'){if(S.scan<SCAN.length)b(`Scan ${SCAN[S.scan][0]}`,()=>scanAt(SCAN[S.scan][0]));else if(S.guess!=='nervous')['angry','nervous','ill'].forEach(f=>b(f,()=>guess(f),`Sam feels ${f}`))}
A.redraw()}

// canvas input
function down(p){const m=mode();S.at=p;S.from=p;
if(m==='map'){const i=left().find(i=>hit(p,slot(i)));if(i!=null){S.held=i;S.pick=i;S.bad=null;A.redraw();return true}const k=zoneAt(p);if(k&&S.pick!=null)place(S.pick,k);return false}
if(m==='decode'){const i=DEC.find(i=>!S.named[i]&&hit(p,zone(CLUES[i][2])));if(i!=null){S.sel=i;S.bad=null;report();return false}
const j=NAMES.findIndex((n,j)=>hit(p,slot(j)));if(j>=0)name(j);return false}
if(m==='heart'){SCENES.forEach((s,i)=>{const r=sceneR(i);if(hit(p,r)){if(!S.felt[i])feel(i)}});return false}
if(m==='alarm'){if(hit(p,{...dialR(),x:dialR().x-10,w:dialR().w+20})){S.drag=1;setAlarm(1-(p.y-dialR().y)/dialR().h);return true}return false}
if(m==='scan'){const k=zoneAt(p);if(k)scanAt(k);return false}
return false}
function move(p){S.at=p;if(mode()==='alarm'&&S.drag){const r=dialR();setAlarm(1-(p.y-r.y)/r.h);return}A.redraw()}
function up(p){const m=mode(),moved=S.from&&Math.hypot(p.x-S.from.x,p.y-S.from.y)>12;S.drag=0;
if(m==='map'&&S.held!=null){const i=S.held,k=zoneAt(p);S.held=null;S.at=null;if(moved&&k)place(i,k);else report(`${CLUES[i][1]}: now tap where you feel it.`)}}

// steps
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=S.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{S.tok++;S.onChange=()=>{};Object.assign(S,{put:{},pick:null,held:null,at:null,bad:null,named:{},sel:null,felt:[0,0],said:[null,null],alarm:0,peak:0,breaths:0,upSaid:0,scan:0,scanBad:null,guess:null,drag:0})};
const steps=[
{h:'Body clues',p:'Feelings show up in your body. Drag each clue to the place you feel it.',task:'Place 4 body clues',
show:()=>{steps[0].go();later(CLUES.map((x,i)=>()=>place(i,x[2])),450)},go:()=>{fresh();report();S.onChange=whenDone(0,()=>!left().length,'Each clue lives in a place in your body.')}},
{h:'What is it telling you?',p:'A body clue is a message about a feeling. Tap a clue, then tap the feeling it often means.',
predict:{q:'Butterflies in your tummy. Does that mean you are hungry?',opts:['Yes, it means hungry','No, it often means nervous'],ans:1},task:'Name 3 clues',
show:()=>{steps[1].go();later(DEC.map(i=>()=>{S.sel=i;name(NAMES.indexOf(CLUES[i][3]))}),500)},go:()=>{fresh();S.sel=0;report();S.onChange=whenDone(1,()=>DEC.every(i=>S.named[i]),'Butterflies: nervous. Fists: angry. Tight shoulders: stressed.')}},
{h:'Same heart, two feelings',p:'Tap each heart to feel it. Then use what is happening to name the feeling.',
predict:{q:'Your heart is racing. Does it always mean you are scared?',opts:['Yes, always scared','No, it can be excited too'],ans:1},task:'Feel both hearts and name both',
show:()=>{steps[2].go();later([()=>feel(0),()=>label(0,'excited'),()=>feel(1),()=>label(1,'scared')],450)},go:()=>{fresh();report();S.onChange=whenDone(2,()=>SCENES.every((s,i)=>S.said[i]===s[2]),'Same fast heart. What is happening tells you which feeling.')}},
{h:'The body alarm',p:'When the brain spots danger or a big moment, it turns on an alarm. Drag it up. Then breathe it down.',
predict:{q:'Can slow, deep breaths turn the alarm down?',opts:['No, you just have to wait','Yes, slow breaths help'],ans:1},task:'Alarm up, then breathe it down',
show:()=>{steps[3].go();later([()=>setAlarm(1),breathe,breathe,breathe,breathe],450)},go:()=>{fresh();report();S.onChange=whenDone(3,()=>S.peak>.85&&S.alarm<.15,'The alarm gets your body ready to act. Slow breaths calm it.')}},
{h:'Body scan',p:'Sam’s play starts soon. Scan his body from head to toes. Tap each part in order.',task:'Scan Sam and name his feeling',
show:()=>{steps[4].go();later(SCAN.map(s=>()=>scanAt(s[0])).concat([()=>guess('nervous')]),350)},go:()=>{fresh();report();S.onChange=whenDone(4,()=>S.guess==='nervous','Head to toes, then name it. That is a body scan.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.onChange()});

// challenge
const QS=[['Mia has butterflies in her tummy before a spelling test. What is her body telling her?','🦋',[['She is nervous','ok'],['She is hungry','need'],['She is ill','ill']]],
['Leo’s fists are clenched and his face is hot. What feeling is that?','✊',[['Angry','ok'],['Sleepy','far'],['Calm','far']]],
['Zara’s heart races on the first day at a fun camp. Which feeling could it be?','💓',[['Excited','ok'],['It must be scared','one'],['No feeling, just her heart','none']]],
['Why does your heart beat fast when you are scared?','🚨',[['The body alarm gets you ready to act','ok'],['Your heart is broken','ill'],['Feelings stay in your head','none']]],
['Tom’s shoulders are up by his ears and stiff. What is a good first step?','🪨',[['Notice it and take slow breaths','ok'],['Ignore it, it means nothing','none'],['Eat a snack, he is hungry','need']]],
['Which is a body clue for nervous?','🦵',[['Wobbly knees','ok'],['Clenched fists','far'],['Big yawn','far']]]];
function slip(tag){let m='Look at the clue and what is happening.';
if(tag==='need')m='That mixes a feeling clue with a body need. Check what is happening: a test or a big moment points to a feeling.';
if(tag==='ill')m='Strong feelings can make your body feel odd, but that does not mean you are ill or broken.';
if(tag==='one')m='A racing heart can mean scared or excited. Look at what is happening to tell which.';
if(tag==='none')m='Feelings are not only in your head. Your body sends clues, so notice them.';
if(tag==='far')m='That clue goes with a different feeling. Match the clue to the feeling it usually signals.';
return m}
let qk=-1,stars=0;
function pose(){qk++;const[q,e,ops]=QS[qk%QS.length],turn=qk%3;
quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const r=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});tell('Challenge: '+q);A.redraw()}
function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes!':'✗ '+slip(tag)}${good?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}

A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
