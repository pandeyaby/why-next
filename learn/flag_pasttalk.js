/* Flagship – talking about what happened: went, not goed (ages 4-5; Reception speaking, EYFS ELG Speaking past,
   present and future forms): sort sentences by yesterday, today and tomorrow, run an -ed word machine, find the
   words that change (go, went), fix a robot that says goed, and fit doing words to time words. Data: pasttalk_art.js. */
(()=>{const R=PASTTALK;
VIS.reg('flagpasttalk',c=>{let A,P,ctl,chal,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const part=()=>['when','ed','change','robot','frame','chal'][A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fefce8';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. yesterday, today or tomorrow ---------- */
let DAYBOX=[],SENT=null;
function file(z){const s=S.wh,W=R.WHEN[s.i];if(!W)return;s.drag=null;if(z!==W.z){s.bad=z;A.sound.miss();return say(`Not ${R.DAYS[z].toLowerCase()}. ${R.DWHY[W.z]}`,true)}
 s.box[z].push(s.i);s.i++;s.bad=-1;A.sound.pop();say(R.DWHY[z]+(s.i<R.WHEN.length?' Next card.':''),false)}
function drawWhen(){const s=S.wh,W=R.WHEN[s.i],t=P.banner(W?`Card ${s.i+1} of ${R.WHEN.length}. When did it happen?`:R.DONE[0],W?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const g=A.ctx,bh=Math.min(A.H*.3,150),bt=A.H-bh-8,gap=6,bw=(A.W-16-gap*2)/3;DAYBOX=R.DAYS.map((d,z)=>({z,x:8+z*(bw+gap),y:bt,w:bw,h:bh}));
 const col=['#a855f7','#16a34a','#ea580c'];DAYBOX.forEach(r=>{g.fillStyle=P.dk()?'#1f2937':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col[r.z];g.lineWidth=s.bad===r.z?5:3;g.stroke();
  g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';P.wrap(R.DAYS[r.z],r.w-10,g.font).forEach((L,i)=>g.fillText(L,r.x+r.w/2,r.y+8+i*P.sz(17)));
  s.box[r.z].forEach((i,j)=>P.kid(R.WHEN[i].pic,r.x+r.w*(j?.7:.3),r.y+r.h*.66,Math.min(r.w*.45,r.h*.5)))});
 if(W){const cw=Math.min(A.W-40,340),ch=Math.min(bt-t-12,120),d=s.drag;SENT={x:d?d.x-cw/2:(A.W-cw)/2,y:d?d.y-ch/2:t+2,w:cw,h:ch};P.card(SENT,'',{sel:!!d});const kw=Math.min(ch*.8,cw*.3);P.kid(W.pic,SENT.x+kw*.6,SENT.y+ch/2,kw);
  P.card({x:SENT.x+kw*1.15,y:SENT.y+4,w:cw-kw*1.15-4,h:ch-8},W.t,{n:17,bare:1})}else SENT=null}
/* ---------- 2. the -ed machine ---------- */
let TAG=null,SLOT=null;
function addEd(){const s=S.ed,E=R.ED[s.i];if(!E)return;s.drag=null;s.i++;A.sound.pop();say(`Yesterday I ${E.w}ed. ${E.w} + ed = ${E.w}ed.`+(s.i<R.ED.length?' Next word.':''),false)}
function drawEd(){const s=S.ed,E=R.ED[s.i],t=P.banner(E?`Yesterday I ... Make "${E.w}" about yesterday.`:R.DONE[1],E?'':'ok',S.note,S.bad);
 const g=A.ctx,mh=Math.min(130,(A.H-t)*.42),my=t+10;SLOT={x:A.W*.12,y:my,w:A.W*.76,h:mh};g.fillStyle=P.dk()?'#334155':'#e0e7ff';A.paint.rrect(SLOT.x,SLOT.y,SLOT.w,SLOT.h,18);g.fill();g.strokeStyle='#4f46e5';g.lineWidth=3;g.stroke();
 const prev=s.i>0?R.ED[s.i-1]:null,show=E||prev;if(show){P.kid(show.k,SLOT.x+mh*.5,SLOT.y+mh/2,mh*.8);g.font=`900 ${P.sz(28)}${P.F}`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=P.fg();const wx=SLOT.x+mh;
  if(E){g.fillText(E.w,wx,SLOT.y+mh/2);g.strokeStyle='#4f46e5';g.setLineDash([6,5]);g.lineWidth=2.5;const ww=g.measureText(E.w).width;g.strokeRect(wx+ww+8,SLOT.y+mh*.25,P.sz(52),mh*.5);g.setLineDash([])}
  else{g.fillText(prev.w,wx,SLOT.y+mh/2);const ww=g.measureText(prev.w).width;g.fillStyle=P.dk()?'#86efac':'#047857';g.fillText('ed',wx+ww,SLOT.y+mh/2)}}
 const done=R.ED.slice(0,s.i).map(x=>x.w+'ed');g.font=`700 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';if(done.length)g.fillText('Done: '+done.join(', '),A.W/2,SLOT.y+mh+10);
 if(E){const tw=Math.min(110,A.W*.3),th=Math.min(70,A.H*.14),d=s.drag;TAG={x:d?d.x-tw/2:(A.W-tw)/2,y:d?d.y-th/2:A.H-th-12,w:tw,h:th};g.fillStyle='#4f46e5';A.paint.rrect(TAG.x,TAG.y,TAG.w,TAG.h,14);g.fill();
  g.font=`900 ${P.sz(26)}${P.F}`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText('-ed',TAG.x+tw/2,TAG.y+th/2)}else TAG=null}
/* ---------- 3. words that change ---------- */
let OPT=[];
const changeOpts=i=>{const C=R.CHANGE[i],all=[C.p,...C.x],r=i%3;return all.slice(r).concat(all.slice(0,r))};
function pickChange(w){const s=S.ch,C=R.CHANGE[s.i];if(!C)return;if(w!==C.p){s.bad=w;A.sound.miss();
  return say(C.x[0]===w?`We do not say ${w}. ${C.w} is a word that changes: ${C.w}, ${C.p}.`:`${w} is for now, not yesterday. Yesterday I ${C.p}.`,true)}
 s.i++;s.bad='';A.sound.pop();say(`Yes! Yesterday I ${C.p}. ${C.w} changes to ${C.p}.`+(s.i<R.CHANGE.length?' Next word.':''),false)}
function drawChange(){const s=S.ch,C=R.CHANGE[s.i],t=P.banner(C?`Today I ${C.w}. Yesterday I ...?`:R.DONE[2],C?(s.bad?'no':''):'ok',S.note,S.bad);
 const g=A.ctx,oh=Math.min(64,A.H*.13),gap=8,top=A.H-oh*3-gap*2-8;
 if(C){P.kid(C.k,A.W/2,t+(top-t)/2,Math.min(A.W*.4,top-t-10));OPT=changeOpts(s.i).map((w,j)=>({w,x:16,y:top+j*(oh+gap),w2:A.W-32,h:oh})).map(o=>({w:o.w,x:o.x,y:o.y,wd:o.w2,h:o.h}));
  OPT.forEach(o=>P.card({x:o.x,y:o.y,w:o.wd,h:o.h},o.w,{n:20,no:s.bad===o.w}))}
 else{OPT=[];g.font=`800 ${P.sz(18)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';R.CHANGE.forEach((x,j)=>g.fillText(`${x.w} → ${x.p}`,A.W/2,t+10+j*P.sz(26)))}}
/* ---------- 4. fix the robot ---------- */
let RB=[];
function judge(right){const s=S.rb,Q=R.ROBOT[s.i];if(!Q)return;if(right!==!!Q.ok){s.bad=right?'ok':'fix';A.sound.miss();
  return say(Q.ok?`It is right! ${Q.s.split(' ')[1]} is a word that takes -ed.`:`Listen again: "${Q.s}" has a wrong word.`,true)}
 s.i++;s.bad='';A.sound.pop();say(Q.ok?`Yes, "${Q.s}" is right.`:`Fixed: "${Q.fix}"`,false)}
function drawRobot(){const s=S.rb,Q=R.ROBOT[s.i],t=P.banner(Q?`Robot ${s.i+1} of ${R.ROBOT.length}: is it right?`:R.DONE[3],Q?(s.bad?'no':''):'ok',S.note,S.bad);
 const g=A.ctx,bh=Math.min(64,A.H*.13),rx=A.W*.2,ry=t+(A.H-bh-t)*.55,u=Math.min(A.W*.16,(A.H-bh-t)*.22);
 g.fillStyle='#94a3b8';A.paint.rrect(rx-u*.6,ry-u*.5,u*1.2,u,u*.2);g.fill();g.fillStyle='#0ea5e9';[-1,1].forEach(d=>{g.beginPath();g.arc(rx+d*u*.25,ry-u*.1,u*.12,0,7);g.fill()});g.fillStyle='#475569';g.fillRect(rx-u*.25,ry+u*.2,u*.5,u*.08);
 g.fillStyle='#64748b';A.paint.rrect(rx-u*.5,ry+u*.55,u,u*1.0,u*.15);g.fill();g.strokeStyle='#64748b';g.lineWidth=3;g.beginPath();g.moveTo(rx,ry-u*.5);g.lineTo(rx,ry-u*.8);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.arc(rx,ry-u*.85,u*.08,0,7);g.fill();
 if(Q){const bx=A.W*.38,bw=A.W*.58,by=ry-u*1.1,bhh=u*1.6;P.card({x:bx,y:by,w:bw,h:bhh},`"${Q.s}"`,{n:18});}
 RB=Q?[{k:true,l:'✓ Right',x:8,y:A.H-bh-6,w:A.W/2-12,h:bh},{k:false,l:'✎ Fix it',x:A.W/2+4,y:A.H-bh-6,w:A.W/2-12,h:bh}]:[];
 RB.forEach(r=>P.card(r,r.l,{n:18,no:(s.bad==='ok'&&r.k)||(s.bad==='fix'&&!r.k)}))}
/* ---------- 5. match the time word ---------- */
let FO=[];
function fit(j){const s=S.fr,Fq=R.FRAMES[s.i];if(!Fq)return;const w=Fq.opts[j];if(j!==Fq.ans){s.bad=j;A.sound.miss();
  return say(w.startsWith('will')?`"Will" is for things that have not happened yet. ${Fq.a} ... already happened.`:Fq.a.startsWith('Tomorrow')?`"${w}" is not for tomorrow. Tomorrow has not happened yet: use will.`:`"${w}" is for now. ${Fq.a.split(' ')[0]} is in the past.`,true)}
 s.i++;s.bad=-1;A.sound.pop();say(`${Fq.a} ${w} ${Fq.b}`+(s.i<R.FRAMES.length?' Next one.':''),false)}
function drawFrame(){const s=S.fr,Fq=R.FRAMES[s.i],t=P.banner(Fq?`${Fq.a} ___ ${Fq.b}`:R.DONE[4],Fq?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const g=A.ctx,oh=Math.min(64,A.H*.13),gap=8,top=A.H-oh-10;if(Fq){const tw=Fq.a.split(' ')[0]+(Fq.a.startsWith('Last')?' night':'');P.kid(Fq.k,A.W*.3,t+(top-t)/2,Math.min(A.W*.35,top-t-10));
  g.fillStyle=Fq.a.startsWith('Tomorrow')?'#c2410c':'#7e22ce';A.paint.rrect(A.W*.55,t+(top-t)/2-24,A.W*.4,48,24);g.fill();g.fillStyle='#ffffff';g.font=`800 ${P.sz(16)}${P.F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(tw,A.W*.75,t+(top-t)/2);
  const ow=(A.W-16-gap*2)/3;FO=Fq.opts.map((w,j)=>({j,w,x:8+j*(ow+gap),y:top,wd:ow,h:oh}));FO.forEach(o=>P.card({x:o.x,y:o.y,w:o.wd,h:o.h},o.w,{n:18,no:s.bad===o.j}))}else FO=[]}
/* ---------- wiring ---------- */
function draw(){paper();const m=part();if(m==='chal'){P.banner('Challenge: went, not goed','ok');['park','eat','run','kick'].forEach((k,i)=>P.kid(k,A.W*(.2+i*.2),A.H*.55,Math.min(A.W*.17,100)));return}
 ({when:drawWhen,ed:drawEd,change:drawChange,robot:drawRobot,frame:drawFrame})[m]();A.fx.draw(A.ctx)}
const rectOf=o=>({x:o.x,y:o.y,w:o.wd,h:o.h});
function down(p){const m=part();
 if(m==='when'){if(SENT&&inside(p,SENT)){S.wh.drag={x:p.x,y:p.y};return true}const r=DAYBOX.find(r=>inside(p,r));if(r)file(r.z);return false}
 if(m==='ed'){if(TAG&&inside(p,TAG)){S.ed.drag={x:p.x,y:p.y};return true}return false}
 if(m==='change'){const o=OPT.find(o=>inside(p,rectOf(o)));if(o)pickChange(o.w);return false}
 if(m==='robot'){const r=RB.find(r=>inside(p,r));if(r)judge(r.k);return false}
 if(m==='frame'){const o=FO.find(o=>inside(p,rectOf(o)));if(o)fit(o.j);return false}return false}
function move(p){const d=part()==='when'?S.wh.drag:part()==='ed'?S.ed.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=part();
 if(m==='when'&&S.wh.drag){S.wh.drag=null;const r=DAYBOX.find(r=>inside(p,r));if(r)file(r.z);else{A.redraw();say('Drop the card on a day.',false)}}
 if(m==='ed'&&S.ed.drag){S.ed.drag=null;if(inside(p,SLOT))addEd();else{A.redraw();say('Drop the -ed tile on the word in the machine.',false)}}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{wh:{i:0,box:[[],[],[]],bad:-1,drag:null},ed:{i:0,drag:null},ch:{i:0,bad:''},rb:{i:0,bad:''},fr:{i:0,bad:-1},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(R.DONE[i]+A.reveal(i))};
function enter(i,ok){fresh();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);S.check=finish(i,ok);buttons();A.redraw()}
function demo(i,list){steps[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='when'&&R.WHEN[S.wh.i])R.DAYS.forEach((d,z)=>B(d,()=>file(z),`"${R.WHEN[S.wh.i].t}" goes in ${d}`));
 if(m==='ed'&&R.ED[S.ed.i])B('Add -ed',addEd,`Add -ed to ${R.ED[S.ed.i].w}`);
 if(m==='change'&&R.CHANGE[S.ch.i])changeOpts(S.ch.i).forEach(w=>B(w,()=>pickChange(w),`Yesterday I ${w}`));
 if(m==='robot'&&R.ROBOT[S.rb.i]){B('✓ Right',()=>judge(true),`The robot is right: ${R.ROBOT[S.rb.i].s}`);B('✎ Fix it',()=>judge(false),`Fix it: ${R.ROBOT[S.rb.i].s}`)}
 if(m==='frame'&&R.FRAMES[S.fr.i]){const Fq=R.FRAMES[S.fr.i];Fq.opts.forEach((w,j)=>B(w,()=>fit(j),`${Fq.a} ${w} ${Fq.b}`))}}
const steps=[
{h:'Yesterday, today, tomorrow',p:R.TXT[0],task:'Put all 6 cards on their day',
 show:()=>demo(0,R.WHEN.map(W=>[400,()=>file(W.z)])),go:()=>enter(0,()=>S.wh.i>=R.WHEN.length)},
{h:'The -ed machine',p:R.TXT[1],predict:{q:'Yesterday I ___ in a puddle.',opts:['jump','jumped'],ans:1},task:'Add -ed to all 4 words',
 show:()=>demo(1,R.ED.map(()=>[450,addEd])),go:()=>enter(1,()=>S.ed.i>=R.ED.length)},
{h:'Words that change',p:R.TXT[2],predict:{q:'Yesterday I ___ to the park.',opts:['goed','went'],ans:1},task:'Find all 4 words for yesterday',
 show:()=>demo(2,R.CHANGE.map(C=>[450,()=>pickChange(C.p)])),go:()=>enter(2,()=>S.ch.i>=R.CHANGE.length)},
{h:'Fix the robot',p:R.TXT[3],predict:{q:'The robot says "I jumped in a puddle." Is that right?',opts:['No, jumped is wrong too','Yes, jump takes -ed'],ans:1},task:'Check all 5 robot sentences',
 show:()=>demo(3,R.ROBOT.map(Q=>[450,()=>judge(!!Q.ok)])),go:()=>enter(3,()=>S.rb.i>=R.ROBOT.length)},
{h:'Match the time word',p:R.TXT[4],task:'Finish all 3 sentences',
 show:()=>demo(4,R.FRAMES.map(Fq=>[450,()=>fit(Fq.ans)])),go:()=>enter(4,()=>S.fr.i>=R.FRAMES.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Most doing words add -ed for yesterday, but some change: go, went. Eat, ate. Run, ran. See, saw.';
 if(t==='goed')m='We do not say goed. Go is a word that changes: yesterday I went.';
 if(t==='eated')m='We do not say eated. Eat changes: yesterday I ate.';
 if(t==='runned')m='We do not say runned. Run changes: yesterday I ran.';
 if(t==='seed')m='Seed is a word for a plant, not for seeing. And tomorrow has not happened yet: I will see.';
 if(t==='saw')m='Saw is for the past. Tomorrow has not happened yet, so we say: I will see.';
 if(t==='will')m='Will is for things that have not happened yet. Yesterday is already done.';
 if(t==='now')m='That word is for now. Yesterday is in the past, so the doing word changes or adds -ed.';
 if(t==='kicken')m='Kick takes -ed, not -en: yesterday I kicked.';
 if(t==='jamp')m='Jamp is not a word. Jump just adds -ed: jumped. It was right!';
 return m}
function ask(){qn++;const Q=R.QS[qn%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=R.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Past tense lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
