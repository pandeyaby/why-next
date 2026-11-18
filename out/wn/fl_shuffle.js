/* Flagship: interleaving (topic "Mixing up practice: interleaving"; ages 14-15; Learning to Learn). A blocked and a mixed
   session are run and then tested a week later (Rohrer & Taylor 2007: practice 89% vs 60%, test 20% vs 63%), a nine-question
   set is built with switches between types, mixed area questions need the right formula picked, and study plans are sorted
   into interleaved or not. Every tap has a button twin. */
(()=>{
VIS.reg('flagshuffle',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['run','week','build','pick','sort','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const TY=['Triangle','Trapezium','Parallelogram'],LET=['T','Z','P'];
const tcol=i=>[A.col.vi,A.col.or,A.col.cy||A.col.ac][i];
function chip(x,y,w,h,ty,o){const g=A.ctx;o=o||{};A.paint.rrect(x,y,w,h,6);g.fillStyle=ty<0?A.alpha(A.col.tx,.04):A.alpha(tcol(ty),o.dim?.12:.3);g.fill();g.strokeStyle=ty<0?A.alpha(A.col.tx,.3):tcol(ty);g.lineWidth=o.hi?3:1.5;g.stroke();if(ty>=0)T(LET[ty],x+w/2,y+h/2,Math.min(h*.5,A.narrow?13:16),{w:900})}
// sessions: 12 questions each, the blocked one in runs of 4, the mixed one shuffled
const BLK=[0,0,0,0,1,1,1,1,2,2,2,2],MIX=[0,1,2,1,0,2,2,0,1,0,2,1];
const SC={blocked:[89,20],mixed:[60,63]};
function lane(name,seq,y,shown){const W=A.W,n=seq.length,w=(W*.62-4)/n;T(name==='blocked'?'Blocked: T T T T Z Z Z Z P P P P':'Mixed: T Z P Z T P P T Z T P Z',8,y-14,A.narrow?11:14,{al:'left',w:800});
 seq.forEach((t,i)=>chip(8+i*w,y,w-3,A.H*.1,i<shown?t:-1));
 const bx=W*.66,bw=W*.32,v=S.ran[name]?SC[name][0]:0,u=S.tested?SC[name][1]:0;
 [[v,'practice',0],[u,'a week later',1]].forEach(([p,l,k])=>{const yy=y-6+k*A.H*.1,g=A.ctx;g.fillStyle=A.alpha(A.col.tx,.08);g.fillRect(bx,yy,bw,A.H*.035);g.fillStyle=k?A.col.gr:A.col.ac;g.fillRect(bx,yy,bw*p/100,A.H*.035);
  if(k===0||S.tested)T((p?p+'% ':'')+l,bx,yy+A.H*.045+9,A.narrow?10:12,{al:'left',w:800,c:A.col.tx})})}
function sessDraw(){const k=kind();T(k==='run'?'Run both practice sessions':S.tested?'One week later: the order of practice matters':'Now test both groups a week later',A.W/2,A.H*.06,A.narrow?14:17,{w:900});
 lane('blocked',BLK,A.H*.24,S.ran.blocked?12:0);lane('mixed',MIX,A.H*.54,S.ran.mixed?12:0);
 T(S.tested?'Mixed kept three times as much (Rohrer & Taylor, 2007)':'Score during practice',A.W/2,A.H*.86,A.narrow?12:14,{c:A.col.mu,w:700})}
function runS(n){if(S.ran[n]){A.sound.tick();say(`The ${n} session is done: ${SC[n][0]}% right in practice.`);return}S.ran[n]=1;A.sound.pop();
 say(n==='blocked'?'Blocked: 89% right in practice. You knew the method before reading each question.':'Mixed: 60% right in practice. Each question made you choose the method first.');A.redraw();controls();S.check()}
function test(){if(S.tested)return;S.tested=1;A.sound.pop();say('A week later the blocked group scored 20% and the mixed group 63%.');A.redraw();controls();S.check()}
// build a nine-question set
const sw=a=>a.reduce((s,t,i)=>s+(i&&t!==a[i-1]?1:0),0);
function bslot(i){const w=(A.W-16)/9;return{x:8+i*w,y:A.H*.2,w:w-4,h:A.H*.16}}
function pool(i){const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.58,w,h:A.H*.18}}
function buildDraw(){const g=A.ctx;T(`Build a 9-question set: ${sw(S.set)} switches`,A.W/2,A.H*.07,A.narrow?14:17,{w:900});
 for(let i=0;i<9;i++){const b=bslot(i);chip(b.x,b.y,b.w,b.h,S.set[i]==null?-1:S.set[i]);if(i&&S.set[i]!=null&&S.set[i]!==S.set[i-1]){g.strokeStyle=A.col.gr;g.lineWidth=3;g.beginPath();g.moveTo(b.x-3,b.y+b.h+8);g.lineTo(b.x-1,b.y+b.h+16);g.stroke()}}
 T('A tick under a gap marks a switch to a new type',A.W/2,A.H*.48,A.narrow?11:13,{c:A.col.mu});
 [0,1,2].forEach(t=>{const b=pool(t),left=3-S.set.filter(x=>x===t).length;chip(b.x,b.y,b.w,b.h,left?t:-1,{dim:!left});T(TY[t],b.x+b.w/2,b.y+b.h+13,A.narrow?10:13,{w:800});T(`${left} left`,b.x+b.w/2,b.y+b.h+29,A.narrow?10:12,{c:A.col.mu})})}
function add(t){if(S.set.length>=9)return;if(S.set.filter(x=>x===t).length>=3){A.sound.miss();say(`All 3 ${TY[t].toLowerCase()} questions are used.`);return}
 S.set.push(t);A.sound.tick();const n=S.set.length,s=sw(S.set);
 if(n===9&&s<6){A.sound.miss();say(`Only ${s} switches: long runs of one type are blocks again. Clear and spread the types out.`)}else say(n===9?`${s} switches. Every few questions you must change method.`:`${TY[t]} added. ${s} switches so far.`);A.redraw();controls();S.check()}
// pick the formula for mixed shapes
const PB=[[0,8,5,0,20],[2,7,4,0,28],[1,5,4,3,16],[0,6,9,0,27],[1,8,5,2,25],[2,9,3,0,27]];
const FM=['½ × b × h','½ × (a + b) × h','b × h'];
function shape(p){const g=A.ctx,[t,b,h,a]=p,s=Math.min(A.W*.55/10,A.H*.42/10),o2=p[0]===2?s*1.5:0,x0=A.W/2-(b*s+o2)/2,y1=A.H*.58,y0=y1-h*s;g.beginPath();
 if(t===0){g.moveTo(x0,y1);g.lineTo(x0+b*s,y1);g.lineTo(x0+b*s*.35,y0)}
 if(t===1){const o=(b-a)*s/2;g.moveTo(x0,y1);g.lineTo(x0+b*s,y1);g.lineTo(x0+o+a*s,y0);g.lineTo(x0+o,y0)}
 if(t===2){g.moveTo(x0,y1);g.lineTo(x0+b*s,y1);g.lineTo(x0+b*s+o2,y0);g.lineTo(x0+o2,y0)}
 g.closePath();g.fillStyle=A.alpha(tcol(t),.25);g.fill();g.strokeStyle=tcol(t);g.lineWidth=3;g.stroke();
 const hx=t===0?x0+b*s*.35:x0+b*s*.5;g.setLineDash([5,4]);g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(hx,y0);g.lineTo(hx,y1);g.stroke();g.setLineDash([]);
 const px=A.narrow?12:14;T(`b = ${b} cm`,x0+b*s/2,y1+14,px,{w:800});T(`h = ${h} cm`,hx+8,(y0+y1)/2,px,{al:'left',w:800});if(t===1)T(`a = ${a} cm`,A.W/2,y0-12,px,{w:800})}
function fcard(i){const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.78,w,h:A.H*.14}}
function pickDraw(){const p=PB[S.q%6];T(S.q<6?`Question ${S.q+1} of 6: which formula gives the area?`:'6 of 6 right: you chose the method each time',A.W/2,A.H*.06,A.narrow?13:16,{w:900});
 if(S.q<6){shape(p);T(TY[p[0]],A.W/2,A.H*.14,A.narrow?12:14,{c:A.col.mu,w:800})}else T('Blocked sets never make you choose; mixed sets and tests do.',A.W/2,A.H*.4,A.narrow?12:15,{w:800});
 FM.forEach((f,i)=>{const b=fcard(i),g=A.ctx;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=i===S.bad?A.alpha(A.col.rd,.2):A.alpha(A.col.ac,.12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();T(f,b.x+b.w/2,b.y+b.h/2,A.narrow?12:15,{w:900})})}
const WRONG=[['','A triangle is half of a parallelogram with the same base and height, so halve b × h.','A triangle has one base, not two parallel sides a and b.'],
 ['A trapezium has two parallel sides. ½ × b × h ignores the top side a.','',"b × h treats it as a parallelogram; the top side a is shorter than b."],
 ['That halves it, but a parallelogram is not half of anything: area = b × h.','A parallelogram has both pairs of sides equal, so there is one base: b × h.','']];
function pick(f){if(S.q>=6)return;const p=PB[S.q],t=p[0],ans=[0,1,2][t];
 if(f!==ans){A.sound.miss();S.bad=f;say(WRONG[t][f]);A.redraw();return}
 S.bad=-1;S.q++;A.sound.pop();say(`Yes: ${FM[f]} = ${p[4]} cm².`+(S.q<6?' Next shape.':''));A.redraw();controls();S.check()}
// sort study plans
const PL=[['Mix triangle, trapezium and parallelogram area questions in one set',1,'Yes: three similar types, so each question makes you pick the formula.'],
 ['Do 20 Pythagoras questions in a row',0,'That is one type in a block: no choosing.'],
 ['Mix speed, density and pressure questions in one quiz',1,'Yes: three formulas that look alike, mixed together.'],
 ['Ten questions on one topic, then ten on the next',0,'Still blocked: each block uses one method.'],
 ["Add last month's question types into this week's homework",1,'Yes: old and new types mixed, which also spaces them out.'],
 ['Re-read your notes on one topic three times',0,'Re-reading is not practice at all, mixed or not.']];
function bin(i){const w=(A.W-24)/2;return{x:8+i*(w+8),y:A.H*.56,w,h:A.H*.3}}
function sortDraw(){const g=A.ctx;T(`Sort the study plans (${S.si} of 6)`,A.W/2,A.H*.06,A.narrow?14:17,{w:900});
 if(S.si<6){A.paint.rrect(12,A.H*.14,A.W-24,A.H*.3,12);g.fillStyle=A.alpha(A.col.vi,.12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
  const words=PL[S.si][0].split(' '),lines=[''],mx=A.narrow?26:44;words.forEach(w=>{if((lines[lines.length-1]+' '+w).length>mx)lines.push(w);else lines[lines.length-1]=(lines[lines.length-1]+' '+w).trim()});
  lines.forEach((l,i)=>T(l,A.W/2,A.H*.29+(i-(lines.length-1)/2)*(A.narrow?18:22),A.narrow?14:17,{w:800}))}
 ['Not interleaving','Interleaving'].forEach((n,i)=>{const b=bin(i);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fillStyle=i===S.badb?A.alpha(A.col.rd,.2):A.alpha(i?A.col.gr:A.col.or,.14);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();T(n,b.x+b.w/2,b.y+22,A.narrow?13:16,{w:900});T(`${S.got[i]} plan${S.got[i]===1?"":"s"}`,b.x+b.w/2,b.y+b.h/2+10,A.narrow?12:14,{c:A.col.mu})})}
function drop(i){if(S.si>=6)return;const[,ok,m]=PL[S.si];if(i!==ok){A.sound.miss();S.badb=i;say(ok?'Look again: different types are mixed in one session. '+m.replace('Yes: ',''):m);A.redraw();return}
 S.badb=-1;S.got[i]++;S.si++;A.sound.pop();say(m);A.redraw();controls();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Blocked feels better; mixed lasts longer',W/2,H*.3,A.narrow?14:18,{w:900});T('Mix types that look alike but need different methods',W/2,H*.47,A.narrow?12:15);T('Brand-new method: a few on their own first',W/2,H*.62,A.narrow?12:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='run'||k==='week')sessDraw();if(k==='build')buildDraw();if(k==='pick')pickDraw();if(k==='sort')sortDraw();A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{ran:{},tested:0,set:[],q:0,bad:-1,si:0,badb:-1,got:[0,0],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='run'){btn('Run blocked session',()=>runS('blocked'));btn('Run mixed session',()=>runS('mixed'))}
 if(k==='week'&&!S.tested)btn('Test one week later',test);
 if(k==='build'){if(S.set.length<9)TY.forEach((n,t)=>btn('Add '+n.toLowerCase(),()=>add(t)));btn('Clear',()=>{S.set=[];A.sound.tick();say('Cleared. Add the 9 questions again.');A.redraw();controls()})}
 if(k==='pick'&&S.q<6)FM.forEach((f,i)=>btn(f,()=>pick(i),'Area is '+f));
 if(k==='sort'&&S.si<6){btn('Not interleaving',()=>drop(0));btn('Interleaving',()=>drop(1))}}
const inb=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='run'){if(p.y<A.H*.42)runS('blocked');else if(p.y<A.H*.75)runS('mixed');return true}
 if(k==='week'){test();return true}
 if(k==='build'){[0,1,2].forEach(t=>{if(inb(p,pool(t)))add(t)});return true}
 if(k==='pick'){[0,1,2].forEach(i=>{if(inb(p,fcard(i)))pick(i)});return true}
 if(k==='sort'){[0,1].forEach(i=>{if(inb(p,bin(i)))drop(i)});return true}return false}
const steps=[
{h:'Blocked or mixed',p:'Two groups practise the same 12 area questions. One does them in blocks of one type. The other gets the types mixed up.',
 predict:{q:'Which group will score higher during practice?',opts:['Blocked','Mixed','About the same'],ans:0},
 task:'Run both practice sessions',show:()=>auto(0,[()=>runS('blocked'),()=>runS('mixed')]),
 go:()=>{reset();say('Tap a session to run it.');A.redraw();controls();S.check=finish(0,()=>S.ran.blocked&&S.ran.mixed,'Blocked practice scored 89% and mixed 60%. In a block you already know the method before you read the question.')}},
{h:'A week later',p:'Practice scores feel like proof. The real test is what is left a week later, on a test where the types come in any order.',
 predict:{q:'On the test a week later, which group scores higher?',opts:['Mixed','Blocked','About the same'],ans:0},
 task:'Test both groups a week later',show:()=>auto(1,[test]),
 go:()=>{reset({ran:{blocked:1,mixed:1}});say('Tap to test both groups a week later.');A.redraw();controls();S.check=finish(1,()=>S.tested,'Blocked fell from 89% to 20%. Mixed rose from 60% to 63%. Feeling fluent in practice is not the same as learning.')}},
{h:'Build a mixed set',p:'Interleaving means switching between types so that no long run of one type builds up. Build a set from 3 triangle, 3 trapezium and 3 parallelogram questions.',
 task:'Make a 9-question set with at least 6 switches',show:()=>auto(2,[0,1,2,1,0,2,0,2,1].map(t=>()=>add(t))),
 go:()=>{reset();say('Add questions one at a time.');A.redraw();controls();S.check=finish(2,()=>S.set.length===9&&sw(S.set)>=6,'A blocked set has only 2 switches. Yours makes you change method again and again.')}},
{h:'Pick the method',p:'In a mixed set the first job is to decide which method fits. Choose the area formula for each shape.',
 task:'Choose the right formula for all 6 mixed shapes',show:()=>auto(3,[0,2,1,0,1,2].map(f=>()=>pick(f))),
 go:()=>{reset();say('Which formula gives the area of this shape?');A.redraw();controls();S.check=finish(3,()=>S.q>=6,'Telling the shapes apart is the skill that blocked practice skips and that tests demand.')}},
{h:'Is it interleaving?',p:'Interleaving mixes related types in one session. Doing one type at a time, or not practising at all, is not interleaving.',
 predict:{q:'A method is brand new to you. What should you do first?',opts:['Try a few on their own, then mix it in','Mix it in from the first question','Never practise it mixed'],ans:0},
 task:'Sort all 6 study plans',show:()=>auto(4,PL.map(x=>()=>drop(x[1]))),
 go:()=>{reset();say('Is this plan interleaving?');A.redraw();controls();S.check=finish(4,()=>S.si>=6,'Mix types that look alike but need different methods. A brand-new method needs a few worked examples on its own first.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['In practice, blocked scored higher. What happened a week later?',[['Mixed scored far higher','ok'],['Blocked was still higher','feel'],['They scored the same','same']]],
 ['Why does mixed practice help?',[['You must choose the method each time','ok'],['The questions are easier','easy'],['You do more questions','more']]],
 ['Which order is interleaved?',[['T Z P Z T P','ok'],['T T T Z Z Z','block'],['T T Z Z P P','block']]],
 ['Mixed practice feels harder. That means…',[['It may still be working: a desirable difficulty','ok'],['It is not working','feel'],['Go back to blocks','feel']]],
 ['A method is brand new. What first?',[['A few on their own, then mix it in','ok'],['Mix it in from question one','new'],['Never mix it','never']]],
 ['Which topics are best to interleave?',[['Ones that look alike but need different methods','ok'],['Topics with nothing in common','unrel'],['Just one topic','block']]],
 ['A set goes T T T Z Z Z P P P. How many switches?',[['2','ok'],['8','max'],['9','count']]]];
function why(t){let m='Mixing makes you choose the method, and that is what lasts.';
 if(t==='feel')m='Practice scores mislead: blocked fell to 20% a week later while mixed held 63%.';
 if(t==='same')m='They were far apart: 63% mixed against 20% blocked.';
 if(t==='easy')m='Mixed questions feel harder, not easier. The gain comes from picking the method.';
 if(t==='more')m='Both groups did the same number of questions. Only the order changed.';
 if(t==='block')m='That has long runs of one type, so it is blocked, not interleaved.';
 if(t==='new')m='With a brand-new method, a few worked examples on their own come first.';
 if(t==='never')m='Once you know it, mix it in: that is how you learn when to use it.';
 if(t==='unrel')m='If the topics share nothing there is nothing to tell apart, so mixing adds little.';
 if(t==='max')m='8 would mean a switch at every gap. Here the type changes only twice.';
 if(t==='count')m='9 is the number of questions. Count the gaps where the type changes: 2.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Interleaving controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),up:()=>{}});controls()}});
A.start()})})();
