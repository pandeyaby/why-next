/* Flagship – water safety with a grown-up (ages 6–7; PSHE Association KS1 keeping safe; RLSS UK / RNLI Water Safety
   Code; RNLI Float to Live and beach flags). Scenes: decide when it is OK to go in (only with a trusted grown-up
   watching, even for strong swimmers), choose where to swim on a beach (between the red and yellow flags, in sight),
   walk a wet poolside without slipping and go in at the shallow end, help Sam by shouting for a grown-up and
   throwing a ring float instead of jumping in, and float like a starfish after falling in. Every drag or tap has a
   labelled button twin. Data, drawings and text helpers in learn/watersafe_art.js. */
(()=>{const {box,inside,kit,kid,flag,ring,floater,WHO,SPOTS,DESC,DONE,QS}=WSF;
VIS.reg('flagwatersafe',c=>{let A,T,pad,chal,qi=-1,gen=0;c.fig.classList.add('young');
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',sun:'#fef9c3',sea:'#7dd3fc',deep:'#0369a1',sand:'#fde68a',tile:'#e0f2fe'};
const st={};const sc=()=>['who','beach','pool','help','float','quiz'][A.step];
const SPOT_T=['Near Gran, between the flags','Behind the rocks','By the lifeguard, between the flags','Far out in deep water','By the red flag','Shallow water between the flags'];
const PARTS=['Lean my head back','Spread my left arm','Spread my right arm','Spread my left leg','Spread my right leg'];
const at=(fx,fy)=>({x:A.W*fx,y:A.H*fy}),near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
/* ---------- 1: can I go in? ---------- */
const sitB=()=>box(A.W*.12,A.H*.04,A.W*.76,A.H*.24),binB=i=>box(A.W*(.04+i*.48),A.H*.36,A.W*.44,A.H*.54);
function drawWho(){const g=A.ctx;g.fillStyle=K.tile;g.fillRect(0,0,A.W,A.H);const it=WHO[st.i];
 if(it){let b=sitB();if(st.drag)b=box(st.drag.x-b.w/2,st.drag.y-b.h/2,b.w,b.h);T.card(b,K.card,st.drag?'sel':'');T.words(it.t,b.x+b.w/2,b.y+b.h/2,15,{w:b.w-18})}
 else T.words('✓ All six decided',A.W/2,A.H*.16,16);
 ['Go in','Wait'].forEach((t,i)=>{const B=binB(i);T.card(B,K.sun,st.bad===i?'ko':'');T.words((st.bad===i?'✗ ':'')+t,B.x+B.w/2,B.y+T.px(18),15);
  st.done.filter(d=>d.y===(i===0)).forEach((d,j)=>T.words('✓ '+d.t,B.x+B.w/2,B.y+B.h*(.2+j*.19),10,{w:B.w-12,b:700,c:i?K.ink:K.ok}))});
 T.words(`Decided: ${st.done.length} of ${WHO.length}`,A.W/2,A.H*.955,13,{b:700})}
function decide(go){const it=WHO[st.i];if(!it)return;if(it.y!==go){st.bad=go?0:1;A.sound.miss();return say(slip(go?it.slip:'missed'))}
 st.done.push(it);st.i++;st.bad=-1;A.sound.pop();say(go?'Yes: a trusted grown-up is watching, so you can go in.':'Yes: wait. No trusted grown-up is watching.')}
/* ---------- 2: where to swim ---------- */
function drawBeach(){const g=A.ctx,W=A.W,H=A.H;g.fillStyle='#e0f2fe';g.fillRect(0,0,W,H*.16);g.fillStyle=K.deep;g.fillRect(0,H*.16,W,H*.2);g.fillStyle=K.sea;g.fillRect(0,H*.36,W,H*.4);
 g.fillStyle=K.sand;g.fillRect(0,H*.76,W,H*.24);T.chip('Deep water',W*.8,H*.22,10);
 g.fillStyle='#78716c';g.strokeStyle='#1f2937';g.lineWidth=2;g.beginPath();g.ellipse(W*.17,H*.52,W*.08,H*.1,0,0,7);g.fill();g.stroke();
 flag(g,W*.24,H*.8,H*.14,'#dc2626','#facc15');flag(g,W*.63,H*.8,H*.14,'#dc2626','#facc15');flag(g,W*.8,H*.8,H*.14,'#dc2626');
 kid(g,W*.44,H*.86,H*.1,'#fed7aa');T.chip('Gran',W*.44,H*.96,10);g.fillStyle='#dc2626';g.fillRect(W*.66,H*.82,W*.12,H*.08);g.strokeRect(W*.66,H*.82,W*.12,H*.08);T.chip('Lifeguard',W*.72,H*.95,10);
 SPOTS.forEach((s,i)=>{const p=at(s.x,s.y),got=st.found.includes(i),bad=st.bad===i;g.setLineDash(got||bad?[]:[5,4]);g.lineWidth=got||bad?4:2;g.strokeStyle=got?K.ok:bad?K.ko:'#1f2937';
  g.beginPath();g.arc(p.x,p.y,A.W*.06,0,7);g.stroke();g.setLineDash([]);if(got||bad)T.chip(got?'✓':'✗',p.x,p.y,11,got?'ok':'ko')});
 const me=st.drag||at(.1,.9);g.fillStyle='#facc15';g.strokeStyle='#1f2937';g.lineWidth=2;g.beginPath();g.arc(me.x,me.y,A.W*.04,0,7);g.fill();g.stroke();T.words('You',me.x,me.y,9);
 T.chip(`Safe places: ${st.found.length} of 3`,W*.5,H*.07,12)}
function swimAt(i){const s=SPOTS[i];if(!s.ok){st.bad=i;A.sound.miss();return say(slip(s.slip))}
 if(!st.found.includes(i))st.found.push(i);st.bad=-1;A.sound.pop();say(`Yes: ${s.why}`+(st.found.length<3?' Find another place.':''))}
/* ---------- 3: walk by the pool ---------- */
const childAt=()=>at(.1+st.wx*.76,.3),choiceB=i=>box(A.W*(.04+i*.48),A.H*.6,A.W*.44,A.H*.2);
function drawPool(){const g=A.ctx,W=A.W,H=A.H;g.fillStyle='#f1f5f9';g.fillRect(0,0,W,H*.44);g.fillStyle='#38bdf8';g.fillRect(0,H*.44,W,H*.56);
 g.fillStyle='#bfdbfe';[.25,.5,.7].forEach(x=>{g.beginPath();g.ellipse(W*x,H*.36,W*.06,H*.02,0,0,7);g.fill()});T.chip('Wet floor',W*.5,H*.08,11);
 g.fillStyle='#64748b';g.fillRect(W*.02,H*.16,W*.06,H*.2);g.strokeStyle='#1f2937';g.lineWidth=3;[0,1,2].forEach(k=>{g.beginPath();g.moveTo(W*.88,H*(.44+k*.05));g.lineTo(W*.97,H*(.44+k*.05));g.stroke()});
 T.chip('Steps',W*.92,H*.4,10);T.chip('Deep end',W*.16,H*.5,10);T.chip('Shallow end',W*.78,H*.5,10);
 const p=childAt();kid(g,p.x,p.y,H*.17,'#fed7aa',{slip:st.slipped});
 if(st.wx>=1)['Go in by the steps at the shallow end','Jump in at the deep end'].forEach((t,i)=>{const b=choiceB(i);T.card(b,K.sun,st.bad===i?'ko':st.inPool&&i===0?'ok':'');T.words((st.bad===i?'✗ ':st.inPool&&i===0?'✓ ':'')+t,b.x+b.w/2,b.y+b.h/2,13,{w:b.w-14})});
 T.chip(st.wx>=1?'At the steps':`Walk to the steps: ${Math.round(st.wx*100)}%`,W*.5,H*.92,12)}
function step(dx){if(st.wx>=1)return;st.slipped=false;st.wx=Math.min(1,st.wx+dx);A.sound.tick();say(st.wx>=1?'You walked to the steps. Now how do you go in?':'Walking. Keep going slowly.')}
function slipNow(){st.slipped=true;st.wx=0;st.drag=null;A.sound.miss();say(slip('run'))}
function goIn(i){if(st.wx<1||st.inPool)return;if(i){st.bad=1;A.sound.miss();return say(slip('deep'))}st.inPool=true;st.bad=-1;A.sound.pop();say('Yes: in by the steps, at the shallow end.')}
/* ---------- 4: someone in trouble ---------- */
const sam=()=>at(.64,.3),ringHome=()=>at(.66,.86),actB=i=>box(A.W*(.04+i*.48),A.H*.58,A.W*.44,A.H*.12);
function drawHelp(){const g=A.ctx,W=A.W,H=A.H;g.fillStyle='#38bdf8';g.fillRect(0,0,W,H*.76);g.fillStyle='#e7e5e4';g.fillRect(0,H*.76,W,H*.24);
 const s=sam();kid(g,s.x,s.y,H*.14,'#fde68a',{wave:1});T.chip(st.saved?'✓ Sam holds the ring':'Sam: Help!',s.x,s.y-H*.12,11,st.saved?'ok':'');
 kid(g,W*.2,H*.86,H*.11,'#fed7aa');T.chip('You',W*.2,H*.96,10);if(st.called){kid(g,W*.38,H*.84,H*.15,'#fdba74');T.chip('✓ Grown-up',W*.38,H*.97,10,'ok')}
 ['Shout for a grown-up','Jump in to grab Sam'].forEach((t,i)=>{const b=actB(i);T.card(b,K.sun,st.bad===i?'ko':i===0&&st.called?'ok':'');T.words((st.bad===i?'✗ ':i===0&&st.called?'✓ ':'')+t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-12})});
 const r=st.saved?{x:s.x+W*.06,y:s.y+H*.04}:st.drag||ringHome();ring(g,r.x,r.y,W*.045);if(!st.saved&&!st.drag)T.chip('Ring float',r.x,r.y+W*.09,10)}
function shout(){if(st.called)return;st.called=true;st.bad=-1;A.sound.pop();say('Help is coming. Now throw the ring float to Sam.')}
function throwTo(p){if(st.saved)return;if(!st.called){A.sound.miss();return say(slip('first'))}
 if(!near(p,sam(),A.W*.14)){A.sound.miss();return say(slip('short'))}st.saved=true;st.bad=-1;A.sound.pop();say('Sam holds the ring and floats until the grown-up pulls Sam out.')}
/* ---------- 5: float like a starfish ---------- */
const fl=()=>({x:A.W/2,y:A.H*.42,s:Math.min(A.W*.8,A.H*.6)}),partAt=i=>{const f=fl(),o=[[0,-.36],[-.34,-.3],[.34,-.3],[-.24,.44],[.24,.44]][i];return{x:f.x+o[0]*f.s,y:f.y+o[1]*f.s}};
const kickB=()=>box(A.W*.2,A.H*.82,A.W*.6,A.H*.09);
function drawFloat(){const g=A.ctx,f=fl();g.fillStyle='#38bdf8';g.fillRect(0,0,A.W,A.H);floater(g,f.x,f.y,f.s,st.on);
 PARTS.forEach((t,i)=>{if(!st.on[i]){const p=partAt(i);g.setLineDash([5,4]);g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,A.W*.07,0,7);g.stroke();g.setLineDash([])}});
 const n=st.on.filter(Boolean).length;T.chip(n===5?'✓ Starfish float! Now shout and wave.':`Starfish: ${n} of 5`,A.W/2,A.H*.06,12,n===5?'ok':'');
 const b=kickB();T.card(b,K.sun,st.bad===1?'ko':'');T.words((st.bad===1?'✗ ':'')+'Kick and splash hard',b.x+b.w/2,b.y+b.h/2,12)}
function part(i){if(st.on[i])return;st.on[i]=true;st.bad=0;A.sound.pop();const n=st.on.filter(Boolean).length;say(n===5?'Steady! You float like a starfish. Now shout and wave one arm for help.':`${PARTS[i]}: done. ${5-n} to go.`)}
function kick(){st.bad=1;A.sound.miss();say(slip('thrash'))}
/* ---------- feedback that names the slip ---------- */
function slip(t){let m='Think about the water safety rules, then try again.';
 if(t==='friend')m='A friend is not a grown-up. Wait until a trusted grown-up is with you and watching.';
 if(t==='strong')m='Even strong swimmers only go in with a grown-up watching. Water can be cold, deep or moving.';
 if(t==='gone')m='Your grown-up is not watching now. Wait until they are back.';
 if(t==='calm')m='Calm water can still be cold and deep. Never go in with nobody there.';
 if(t==='missed')m='A trusted grown-up is with you and watching. It is OK to go in.';
 if(t==='rocks')m='Behind the rocks your grown-up cannot see you. Stay where your grown-up can see you.';
 if(t==='far')m='Too far out. The water is deep there, and help is far away.';
 if(t==='red')m='A red flag means danger: never swim there. Swim between the red and yellow flags.';
 if(t==='run')m='Slip! The floor is wet. Running by a pool makes you slip. Walk.';
 if(t==='deep')m='You do not know how deep it is. Go in by the steps, at the shallow end.';
 if(t==='jump')m='Do not jump in. Someone in trouble can pull you under too. Shout for help and throw something that floats.';
 if(t==='first')m='Shout for a grown-up first, so help is coming. Then throw the ring.';
 if(t==='short')m='The ring did not reach Sam. Throw it close, so Sam can grab it.';
 if(t==='hide')m='Do not run off. Shout for a grown-up straight away, so help comes fast.';
 if(t==='keep')m='The ring helps only if it is in the water with your friend. Throw it to them.';
 if(t==='thrash')m='Kicking and splashing hard makes you tired and can make you breathe in water. Lean back and float.';
 if(t==='tuck')m='Curled up, you tip and wobble. Spread your arms and legs like a starfish.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=sc();if(k==='quiz'){const g=A.ctx;g.fillStyle=K.tile;g.fillRect(0,0,A.W,A.H);T.words('Challenge',A.W/2,A.H*.4,22);T.words('Grown-up · Flags · Walk · Help · Float',A.W/2,A.H*.55,13,{w:A.W-20});return}
 ({who:drawWho,beach:drawBeach,pool:drawPool,help:drawHelp,float:drawFloat})[k]();A.fx.draw(A.ctx)}
function down(p){const k=sc(),grab=o=>{st.drag=Object.assign({x:p.x,y:p.y,x0:p.x,y0:p.y,t:performance.now(),hx:p.x,ht:performance.now()},o);A.redraw();return true};
 if(k==='who'){if(WHO[st.i]&&inside(p,sitB()))return grab({});for(let i=0;i<2;i++)if(inside(p,binB(i)))decide(i===0);return false}
 if(k==='beach'){if(near(p,at(.1,.9),A.W*.08))return grab({});const i=SPOTS.findIndex(s=>near(p,at(s.x,s.y),A.W*.07));if(i>=0)swimAt(i);return false}
 if(k==='pool'){if(st.wx<1&&near(p,childAt(),A.H*.1))return grab({});if(st.wx>=1)for(let i=0;i<2;i++)if(inside(p,choiceB(i)))goIn(i);return false}
 if(k==='help'){if(!st.saved&&near(p,ringHome(),A.W*.08))return grab({});if(inside(p,actB(0)))shout();if(inside(p,actB(1))){st.bad=1;A.sound.miss();say(slip('jump'))}return false}
 if(k==='float'){const i=PARTS.findIndex((_,n)=>near(p,partAt(n),A.W*.09));if(i>=0)part(i);else if(inside(p,kickB()))kick();return false}return false}
function move(p){const d=st.drag;if(!d)return;d.x=p.x;d.y=p.y;
 if(sc()==='pool'){const now=performance.now(),x0=A.W*.1;if(now-d.ht>120){const v=(p.x-d.hx)/((now-d.ht)/1000);d.hx=p.x;d.ht=now;if(v>A.W*1.1)return slipNow()}
  const wx=Math.max(st.wx,Math.min(1,(p.x-x0)/(A.W*.76)));if(wx>st.wx){st.wx=wx;st.slipped=false}if(st.wx>=1){st.drag=null;A.sound.pop();say('You walked to the steps. Now how do you go in?')}}A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=sc();
 if(k==='who'){for(let i=0;i<2;i++)if(inside(p,binB(i)))return decide(i===0);return A.redraw()}
 if(k==='beach'){const i=SPOTS.findIndex(s=>near(p,at(s.x,s.y),A.W*.09));return i>=0?swimAt(i):A.redraw()}
 if(k==='help'){if(Math.hypot(p.x-d.x0,p.y-d.y0)>12)return throwTo(p);return A.redraw()}A.redraw()}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=sc(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='who'&&WHO[st.i]){b('Go in',()=>decide(true),`Go in: ${WHO[st.i].t}`);b('Wait',()=>decide(false),`Wait: ${WHO[st.i].t}`)}
 if(k==='beach')SPOT_T.forEach((t,i)=>{if(!st.found.includes(i))b(t,()=>swimAt(i),`Swim here: ${t}`)});
 if(k==='pool'){if(st.wx<1){b('Walk a step',()=>step(.25));b('Run',slipNow,'Run to the steps')}else if(!st.inPool){b('Go in by the steps',()=>goIn(0),'Go in by the steps at the shallow end');b('Jump in at the deep end',()=>goIn(1))}}
 if(k==='help'&&!st.saved){if(!st.called)b('Shout for a grown-up',shout);b('Throw the ring to Sam',()=>throwTo(sam()));b('Jump in to grab Sam',()=>{st.bad=1;A.sound.miss();say(slip('jump'))})}
 if(k==='float'){PARTS.forEach((t,i)=>{if(!st.on[i])b(t,()=>part(i))});b('Kick and splash hard',kick)}}
function reset(){gen++;for(const x in st)delete st[x];Object.assign(st,{i:0,bad:-1,done:[],found:[],wx:0,slipped:false,inPool:false,called:false,saved:false,on:[0,0,0,0,0].map(()=>false),drag:null,hook:()=>{}})}
const met=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,test){reset();say(DESC[i]);st.hook=met(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Can I go in?',p:'Read who is there. Is it OK to go in the water, or should you wait? Drag the card to Go in or Wait.',
 predict:{q:'You can swim a whole length. Can you go in with no grown-up there?',opts:['Yes, I swim well','No, I wait for a grown-up'],ans:1},task:'Decide 6 times',
 show:()=>demo(0,WHO.map(()=>()=>decide(WHO[st.i].y)),380),go:()=>begin(0,()=>st.done.length>=WHO.length)},
{h:'Where to swim',p:'At the beach, Gran is on the sand. Drag the swimmer to a safe place to swim.',
 predict:{q:'Where do lifeguards watch?',opts:['Between the red and yellow flags','By the red flag','Anywhere in the sea'],ans:0},task:'Find 3 safe places',
 show:()=>demo(1,[0,2,5].map(i=>()=>swimAt(i)),450),go:()=>begin(1,()=>st.found.length>=3)},
{h:'Walk by the pool',p:'The floor is wet. Drag the child slowly along the side to the steps. Then choose how to go in.',task:'Walk to the steps and go in safely',
 show:()=>demo(2,[...[0,1,2,3].map(()=>()=>step(.25)),()=>goIn(0)],380),go:()=>begin(2,()=>st.inPool)},
{h:'Someone in trouble',p:'Sam is in trouble in the water. What do you do? Tap a card, and drag the ring float to Sam.',
 predict:{q:'Sam is in trouble in the water. Should you jump in to help?',opts:['Yes, jump in and pull Sam out','No, shout for help and throw a float'],ans:1},task:'Help Sam safely',
 show:()=>demo(3,[shout,()=>throwTo(sam())],600),go:()=>begin(3,()=>st.saved)},
{h:'Float like a starfish',p:'You fell in! Lean back and spread out like a starfish. Tap your head, both arms and both legs.',task:'Float like a starfish',
 show:()=>demo(4,PARTS.map((_,i)=>()=>part(i)),380),go:()=>begin(4,()=>st.on.every(Boolean))},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],r=qi%3,list=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>mark(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(s,Q){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?slip(s):'';
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;T=kit(A,K);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Water safety lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
