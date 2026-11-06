/* Flagship: counting objects to 20 (ages 5–6; EYFS/Y1 cardinality to 20).
   Tap each object once on a mat, stop at a target, catch double-counts and skips,
   keep last-number = how many after a rearrange, fill from 11 to 20, then challenge.
   Distinct from one-to-one intro (flagoto), count-to-five (flagcount), and numeral writing (flagto20). */
(()=>{
VIS.reg('flagobj20',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['tap','target','trap','keep','teen','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g){const n=S.n||0,{W,H,col:C}=A;const cols=Math.min(10,Math.max(5,Math.ceil(Math.sqrt(Math.max(n,1)*1.2))));
 const rows=Math.ceil(Math.max(n,1)/cols),r=A.narrow?9:11,gapX=(W*.8)/cols,gapY=(H*.42)/Math.max(rows,1),ox=W*.1+gapX/2,oy=H*.28;
 for(let i=0;i<n;i++){const x=ox+(i%cols)*gapX,y=oy+Math.floor(i/cols)*gapY;g.fillStyle=S.trapHit&&S.trapHit.has(i)?A.alpha(C.or,.85):C.am;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Count objects to 20',W/2,H*.32,A.narrow?14:17,{w:900});T('One tap each · last number = how many',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='tap'||k==='target'||k==='trap'||k==='keep'||k==='teen'){T(S.title||'Count the dots',W/2,H*.08,A.narrow?14:17,{w:800});
  g.fillStyle=A.alpha(C.tx,.06);g.fillRect(W*.06,H*.16,W*.88,H*.58);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,H*.16,W*.88,H*.58);
  dots(g);T(`Count: ${S.n||0}${S.goal!=null?` / ${S.goal}`:''}`,W/2,H*.84,A.narrow?14:16,{w:800});T(S.msg||'',W/2,H*.94,12,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,goal:null,msg:'',done:0,picked:null,opts:[],trapHit:null,title:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*220))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='tap'||kind()==='target'||kind()==='teen'){btn('+1 object',()=>addOne(),'Add one object');btn('Clear mat',()=>{S.n=0;S.msg='Mat cleared';A.redraw();S.check()},'Clear all objects')}
 if(kind()==='trap'){btn('Fair count (no doubles)',()=>{S.n=S.goal;S.trapHit=null;S.done=1;S.msg='One tap each — fair count';A.sound.tick();A.redraw();S.check()},'Use a fair one-to-one count');btn('Oops: double-count',()=>{S.trapHit=new Set([0,0]);S.n=(S.goal||8)+1;S.msg='Double-count makes the total too big';A.sound.miss();A.redraw()},'Show a double-count mistake')}
 if(kind()==='keep'){btn('Spread out',()=>{S.spread=1;S.msg='Same '+S.n+' — still '+S.n;A.sound.tick();A.redraw();S.check()},'Spread the same objects');btn('Squash together',()=>{S.spread=0;S.msg='Same '+S.n+' — still '+S.n;A.sound.tick();A.redraw();S.check()},'Squash the same objects');btn('Confirm same number',()=>{S.done=1;A.sound.tick();A.redraw();S.check()},'Confirm count stays the same')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function addOne(){if(S.goal!=null&&S.n>=S.goal){S.msg='Stop — that is '+S.goal;A.sound.tick();S.done=1;A.redraw();S.check();return}
 S.n=(S.n||0)+1;A.sound.tick();S.msg=S.n+(S.goal!=null&&S.n===S.goal?' — last number is how many':'');if(S.goal!=null&&S.n===S.goal)S.done=1;A.redraw();S.check()}
function down(p){if(kind()==='chal')return false;
 if(kind()==='tap'||kind()==='target'||kind()==='teen'){addOne();return true}
 if(kind()==='trap'){S.n=S.goal;S.trapHit=null;S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='keep'){S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Tap to count',p:'Tap once for each object. The last number you say is how many are on the mat.',
 predict:{q:'The last number you say tells you…',opts:['how many objects there are','the colour of the mat','which object to tap twice'],ans:0},
 task:'Put 8 objects on the mat',show:()=>auto(0,[()=>{S.n=8;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({n:0,goal:8,title:'Count to 8',msg:'Tap +1 for each object'});say('Tap to put 8 objects on the mat.');controls();S.check=finish(0,()=>S.n===8,'Eight objects — last number is how many.')}},
{h:'Stop at the target',p:'When the target is 12, stop as soon as you say twelve. Do not keep tapping.',
 predict:{q:'If the target is 12, you should…',opts:['stop when you reach 12','keep going past 12','start again at 1 after 9'],ans:0},
 task:'Fill the mat to exactly 12',show:()=>auto(1,[()=>{S.n=12;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({n:0,goal:12,title:'Stop at 12',msg:'Tap until you reach 12'});say('Stop at twelve.');controls();S.check=finish(1,()=>S.n===12,'Stopped at 12 — cardinal count.')}},
{h:'Catch a double-count',p:'Tapping the same object twice makes the count too big. A fair count taps each object once.',
 predict:{q:'Double-counting an object makes the total…',opts:['too big','too small','exactly right every time'],ans:0},
 task:'Show a fair count of 10',show:()=>auto(2,[()=>{S.n=10;S.done=1;S.trapHit=null;A.redraw();S.check()}]),
 go:()=>{reset({n:10,goal:10,title:'Fair count of 10',msg:'Use one tap each — no doubles',done:0});say('Make a fair count of ten.');controls();S.check=finish(2,()=>S.done&&S.n===10,'Fair count: each object once.')}},
{h:'Same number after a move',p:'Spread the objects out or squash them together. If nothing was added or taken, the number stays the same.',
 predict:{q:'You move 14 counters farther apart. The number is…',opts:['still 14','now bigger','now smaller'],ans:0},
 task:'Confirm 14 stays 14',show:()=>auto(3,[()=>{S.n=14;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({n:14,goal:14,title:'14 stay 14',msg:'Spread or squash — count stays 14',done:0});say('Check that fourteen stays fourteen.');controls();S.check=finish(3,()=>S.done,'Conservation: moving does not change how many.')}},
{h:'Teens on the mat',p:'Teens are ten and some ones. Count on from 10 up to 20 without skipping.',
 predict:{q:'Sixteen means…',opts:['ten and six ones','six and then stop','twenty take away one'],ans:0},
 task:'Fill the mat to 16',show:()=>auto(4,[()=>{S.n=16;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({n:10,goal:16,title:'Build 16 (ten and six)',msg:'Start at 10 — add ones to 16'});say('Build sixteen from ten.');controls();S.check=finish(4,()=>S.n===16,'Sixteen is ten and six ones.')}},
{h:'True sentence',p:'Pick the sentence that matches careful counting to 20.',
 predict:{q:'A careful count to 20 needs…',opts:['one tap each, no skips, last number = how many','saying numbers in any order','tapping some objects twice on purpose'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['One tap each; last number is how many; stop at the target','Always tap past the target to be safe','Moving objects always changes the number'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Cardinal counting: one each, last number, stop at target.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['The last number you say tells…',[['how many objects there are','ok'],['which colour to pick','colour'],['to tap the first object twice','twice']]],
 ['Double-counting makes the total…',[['too big','ok'],['too small','small'],['always exact','exact']]],
 ['You spread 15 counters out. How many now?',[['still 15','ok'],['more than 15','more'],['fewer than 15','fewer']]],
 ['Seventeen is…',[['ten and seven ones','ok'],['seven tens','sevtens'],['twenty take away one only','take']]],
 ['When the target is 20 you should…',[['stop at 20','ok'],['keep tapping to 25','past'],['skip from 19 to 21','skip']]],
 ['A skip in the count makes the total…',[['too small','ok'],['too big','big'],['exact every time','exact2']]],
 ['Why tap each object only once?',[['so the last number matches how many','ok'],['so the mat looks emptier','empty'],['because teens ignore ones','ignore']]]];
function why(t){let m='Count each object once. The last number is how many. Stop at the target.';
 if(t==='colour'||t==='twice'||t==='empty'||t==='ignore')m='The last number names the total — not colour, and not a double tap.';
 if(t==='small'||t==='big'||t==='exact'||t==='exact2')m='Double-count → too big. Skip → too small. One each stays exact.';
 if(t==='more'||t==='fewer')m='Moving objects does not add or take any away — the number stays the same.';
 if(t==='sevtens'||t==='take')m='Seventeen is ten and seven ones on the way to twenty.';
 if(t==='past'||t==='skip')m='Stop exactly at the target. Do not skip number names.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Counting objects controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
