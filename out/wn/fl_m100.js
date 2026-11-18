/* Flagship: The multiples of 100 (ages 7–8; CCSS 2.NBT.1.b / NC Y2 place value).
   Build 100–900 with hundred flats only (0 tens, 0 ones), read a place-value chart, place on a 0–1000 line,
   compare 400 vs 40, reject “400 is 4 tens”, then challenge. Distinct from ten-tens bundling (flagtenten)
   and hop-counting within 1000 (flaghund). */
(()=>{
VIS.reg('flagm100',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['build','chart','line','compare','myth','write','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function flat(g,x,y,u,lab){const{col:C}=A;g.fillStyle=A.alpha(C.am,.55);g.fillRect(x,y,u,u*.65);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,u,u*.65);T(lab||'100',x+u/2,y+u*.32,A.narrow?11:13,{w:800})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind(),u=Math.min(W,H)*.18;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Multiples of 100',W/2,H*.35,A.narrow?16:18,{w:900});T('Hundreds · 0 tens · 0 ones',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='build'){T(`Build ${S.target||300}`,W/2,H*.08,A.narrow?14:16,{w:800});
  for(let i=0;i<(S.h||0);i++)flat(g,W*.08+(i%5)*(u*1.05),H*.22+Math.floor(i/5)*(u*.75),u);
  T(S.msg||`${(S.h||0)*100} — tens:0 ones:0`,W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='chart'){T('Place-value chart',W/2,H*.08,A.narrow?14:16,{w:800});
  [['Hundreds',S.h||0],['Tens',0],['Ones',0]].forEach((row,i)=>{const x=W*(.18+i*.28);g.fillStyle=A.alpha(C.ac,.12);g.fillRect(x-W*.1,H*.25,W*.2,H*.4);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.1,H*.25,W*.2,H*.4);T(row[0],x,H*.32,11,{c:C.mu});T(String(row[1]),x,H*.5,A.narrow?22:28,{w:900})});
  T(S.msg||`${(S.h||0)*100}`,W/2,H*.88,A.narrow?14:16,{c:C.mu})}
 if(k==='line'){T('Place on the line to 1000',W/2,H*.1,A.narrow?13:15,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.08,H*.55);g.lineTo(W*.92,H*.55);g.stroke();
  for(let n=0;n<=10;n++){const x=W*.08+n*(W*.84/10);g.beginPath();g.moveTo(x,H*.5);g.lineTo(x,H*.6);g.stroke();T(String(n*100),x,H*.68,10,{c:C.mu})}
  if(S.pos!=null){const x=W*.08+(S.pos/1000)*(W*.84);g.fillStyle=C.rd;g.beginPath();g.arc(x,H*.55,10,0,7);g.fill()}
  T(S.msg||`Mark ${S.mark||700}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='compare'){T('Which is more?',W/2,H*.08,A.narrow?14:16,{w:800});
  g.fillStyle=A.alpha(C.vi,.12);g.fillRect(W*.05,H*.2,W*.4,H*.5);g.fillStyle=A.alpha(C.gr,.12);g.fillRect(W*.55,H*.2,W*.4,H*.5);
  for(let i=0;i<4;i++)flat(g,W*.12+(i%2)*u*.95,H*.28+Math.floor(i/2)*u*.7,u*.85);
  T('40',W*.75,H*.45,A.narrow?28:36,{w:900});T('400',W*.25,H*.78,12,{c:C.mu});T('40 (4 tens)',W*.75,H*.78,12,{c:C.mu});
  T(S.msg||'Tap the greater amount',W/2,H*.94,12,{c:C.mu})}
 if(k==='myth'){T('Tap the true sentence',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='write'){T(`What number is ${S.h||5} hundreds?`,W/2,H*.12,A.narrow?13:15,{w:800});
  [['500',1],['50',0],['5',0],['505',0]].forEach(([lab,ok],i)=>{const x=W*(.15+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.08,H*.4,W*.16,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.08,H*.4,W*.16,H*.2);T(lab,x,H*.5,A.narrow?14:16,{w:800})});
  T(S.msg||'Tap the number',W/2,H*.88,12,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{h:0,target:300,pos:null,mark:700,picked:null,msg:'',opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*220))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='build'){btn('+ hundred',()=>{S.h=Math.min(9,(S.h||0)+1);S.msg=`${S.h*100} — tens:0 ones:0`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a hundred flat');btn('Clear',()=>{S.h=0;S.msg='Cleared';A.sound.tick();A.redraw()},'Clear')}
 if(kind()==='chart'){btn('+ hundred digit',()=>{S.h=Math.min(9,(S.h||0)+1);S.msg=`${S.h} hundreds, 0 tens, 0 ones = ${S.h*100}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one to hundreds')}
 if(kind()==='line'){btn('Mark '+ (S.mark||700),()=>{S.pos=S.mark||700;S.msg=`${S.mark} sits at ${S.mark/100} hundreds`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Mark the multiple')}
 if(kind()==='compare'){btn('Left (400)',()=>{S.picked=1;S.msg='Yes — 400 is 4 hundreds; 40 is only 4 tens';A.sound.tick();say(S.msg);A.redraw();S.check()},'400');btn('Right (40)',()=>{S.picked=0;S.msg='40 is smaller — only 4 tens';A.sound.miss();say(S.msg);A.redraw()},'40')}
 if(kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='write')[['500',1],['50',0],['5',0],['505',0]].forEach(([lab,ok],i)=>btn(lab,()=>{S.picked=i;S.msg=ok?'5 hundreds = 500':'Not that — hundreds end with two zeros';ok?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Choose '+lab))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='build'){S.h=Math.min(9,(S.h||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='chart'){S.h=Math.min(9,(S.h||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='line'){S.pos=S.mark||700;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='compare'){S.picked=p.x<A.W/2?1:0;S.picked===1?A.sound.tick():A.sound.miss();A.redraw();if(S.picked===1)S.check();return true}
 if(kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='write'){const i=Math.max(0,Math.min(3,Math.floor((p.x-A.W*.07)/(A.W*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Build with hundred flats',p:'A multiple of 100 is made of whole hundreds only: 0 tens and 0 ones. Three flats make 300.',
 predict:{q:'300 means…',opts:['3 hundreds, 0 tens, 0 ones','3 tens','30 ones'],ans:0},
 task:'Build 300 with flats',show:()=>auto(0,[()=>{S.h=3;A.redraw();S.check()}]),
 go:()=>{reset({h:0,target:300});say('Add hundred flats to make 300.');controls();S.check=finish(0,()=>(S.h||0)>=3,'300 = 3 hundreds.')}},
{h:'Read the chart',p:'In a place-value chart, 700 shows 7 in the hundreds column and zeros in tens and ones.',
 predict:{q:'700 has how many tens?',opts:['0 tens','7 tens','70 tens'],ans:0},
 task:'Make 700 on the chart',show:()=>auto(1,[()=>{S.h=7;A.redraw();S.check()}]),
 go:()=>{reset({h:0});say('Put 7 in the hundreds place.');controls();S.check=finish(1,()=>(S.h||0)>=7,'7 hundreds, 0 tens, 0 ones = 700.')}},
{h:'Number line to 1000',p:'Multiples of 100 sit on the big marks: 100, 200, … 900, 1000. 700 is seven marks from 0.',
 predict:{q:'Where does 700 sit?',opts:['At the 700 mark','Halfway to 100','At 70'],ans:0},
 task:'Mark 700 on the line',show:()=>auto(2,[()=>{S.pos=700;A.redraw();S.check()}]),
 go:()=>{reset({mark:700,pos:null});say('Mark 700.');controls();S.check=finish(2,()=>S.pos===700,'700 is seven hundreds from 0.')}},
{h:'400 vs 40',p:'400 is four hundreds. 40 is four tens. Extra zeros change the place — not just the look.',
 predict:{q:'Which is greater?',opts:['400','40','They are equal'],ans:0},
 task:'Pick the greater amount',show:()=>auto(3,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Which is more: 400 or 40?');controls();S.check=finish(3,()=>S.picked===1,'400 beats 40 because place value differs.')}},
{h:'True place-value idea',p:'A multiple of 100 always ends with two zeros: it has no leftover tens or ones.',
 predict:{q:'A multiple of 100…',opts:['ends with two zeros','ends with one zero','can end with any digit'],ans:0},
 task:'Tap the true sentence',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['900 means 9 hundreds, 0 tens, 0 ones','900 means 9 tens','900 means 90 ones'],picked:null});say('Tap the true idea.');controls();S.check=finish(4,()=>S.picked===0,'Hundreds with empty tens and ones.')}},
{h:'Write five hundreds',p:'Five hundreds is written 500 — not 50 (five tens) and not 5 (five ones).',
 predict:{q:'5 hundreds = ?',opts:['500','50','5'],ans:0},
 task:'Choose 500',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({h:5,picked:null});say('Tap 500.');controls();S.check=finish(5,()=>S.picked===0,'5 hundreds = 500.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['300 means…',[['3 hundreds, 0 tens, 0 ones','ok'],['3 tens','tens'],['30 ones','ones']]],
 ['700 has how many tens?',[['0 tens','ok'],['7 tens','sevens'],['70 tens','seventy']]],
 ['400 vs 40 — greater is…',[['400','ok'],['40','forty'],['equal','eq']]],
 ['5 hundreds = ?',[['500','ok'],['50','fifty'],['5','five']]],
 ['A multiple of 100…',[['Ends with two zeros','ok'],['Ends with one zero','onez'],['Any ending digit','any']]],
 ['900 means…',[['9 hundreds, 0 tens, 0 ones','ok'],['9 tens','tens'],['90 ones','ones']]],
 ['Why write two zeros?',[['Show empty tens and ones','ok'],['To make it look longer','long'],['Because tens disappeared','gone']]]];
function why(t){let m='A multiple of 100 is whole hundreds: 0 tens and 0 ones.';
 if(t==='tens'||t==='ones'||t==='sevens'||t==='seventy')m='The tens and ones places are empty — digits go in hundreds, then two zeros.';
 if(t==='forty'||t==='eq')m='400 is 4 hundreds; 40 is only 4 tens. Place value, not digit look-alike.';
 if(t==='fifty'||t==='five')m='5 hundreds = 500. 50 is five tens; 5 is five ones.';
 if(t==='onez'||t==='any')m='Multiples of 100 always end with two zeros (100, 200, … 900).';
 if(t==='long'||t==='gone')m='The two zeros mark empty tens and ones — the total stays in hundreds.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Multiples of 100 controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
