/* Flagship: The two digits of a two-digit number (ages 6–7; CCSS 1.NBT.2 the two digits of a two-digit number
   represent amounts of tens and ones; 1.NBT.2a–c 10 as a bundle, teens, and decades). Place-chart build of tens
   rods + ones cubes; expand 47 = 4 tens + 7 ones; catch digit-sum and reverse-digit myths. Distinct from
   flagbundle (10 ones ↔ 1 ten swap), flagtenten (100 = 10 tens), flagdigit (writing glyphs 0–9), flagteens
   (teen structure only). */
(()=>{
VIS.reg('flag2digit',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['chart','expand','value','teen','myth','build','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function rod(g,x,y,u){const C=A.col;for(let i=0;i<10;i++){g.fillStyle=A.alpha(C.or||C.am,.8);g.fillRect(x,y+i*(u*.9),u*.85,u*.8);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(x,y+i*(u*.9),u*.85,u*.8)}}
function cube(g,x,y,u){const C=A.col;g.fillStyle=A.alpha(C.ac,.85);g.fillRect(x,y,u*.85,u*.85);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(x,y,u*.85,u*.85)}
function chart(g,W,H,tens,ones){const C=A.col,u=Math.min(W,H)*.055;
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,H*.2,W*.4,H*.55);g.strokeRect(W*.52,H*.2,W*.4,H*.55);
 T('tens',W*.26,H*.24,12,{c:C.mu});T('ones',W*.72,H*.24,12,{c:C.mu});
 for(let i=0;i<tens;i++)rod(g,W*.12+i*u*1.3,H*.3,u);
 for(let i=0;i<ones;i++)cube(g,W*.58+(i%5)*u*1.1,H*.32+Math.floor(i/5)*u*1.2,u);
 T(`${tens} tens + ${ones} ones`,W/2,H*.86,13,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Tens and ones',W/2,H*.3,A.narrow?15:18,{w:900});T('Left digit = tens · right digit = ones',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='chart'||k==='build'){T(S.title||'Place chart',W/2,H*.08,A.narrow?13:15,{w:800});chart(g,W,H,S.tens||0,S.ones||0);T(S.msg||'',W/2,H*.94,12,{c:C.mu,max:W*.92})}
 if(k==='expand'){T(S.title||'Expand the digits',W/2,H*.08,A.narrow?13:15,{w:800});
  T(String(S.n||47),W/2,H*.28,28,{w:900});
  T(S.open?`${S.tens} tens + ${S.ones} ones = ${S.n}`:(S.msg||'Open the tens-and-ones expansion.'),W/2,H*.5,A.narrow?13:15,{c:C.mu,max:W*.92});
  chart(g,W,H*.55+H*.35,S.open?S.tens:0,S.open?S.ones:0)}
 if(k==='value'||k==='teen'||k==='myth'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{tens:0,ones:0,n:0,open:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='chart'||kind()==='build'){btn('Add a ten',()=>{S.tens=Math.min(9,(S.tens||0)+1);S.msg=`${S.tens} tens + ${S.ones||0} ones = ${(S.tens||0)*10+(S.ones||0)}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one ten rod');
  btn('Add a one',()=>{S.ones=Math.min(9,(S.ones||0)+1);S.msg=`${S.tens||0} tens + ${S.ones} ones = ${(S.tens||0)*10+(S.ones||0)}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one ones cube');
  btn('Clear chart',()=>{S.tens=0;S.ones=0;S.msg='Empty chart.';A.redraw()},'Clear tens and ones')}
 if(kind()==='expand'){btn('Open expansion',()=>{S.open=1;S.msg=`${S.tens} tens + ${S.ones} ones`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal tens and ones');
  btn('Done',()=>S.check(),'Mark expansion done')}
 if(kind()==='value'||kind()==='teen'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='chart'||kind()==='build'){if(p.x<A.W/2)S.tens=Math.min(9,(S.tens||0)+1);else S.ones=Math.min(9,(S.ones||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='expand'){S.open=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='value'||kind()==='teen'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Build on the place chart',p:'The left digit counts tens rods; the right digit counts ones cubes. Build 3 tens and 5 ones to make 35 — not 3+5=8.',
 predict:{q:'3 tens + 5 ones equals…',opts:['35','8','53'],ans:0},
 task:'Build 3 tens and 5 ones',show:()=>auto(0,[()=>{S.tens=3;S.ones=5;S.msg='3 tens + 5 ones = 35';A.redraw();S.check()}]),
 go:()=>{reset({title:'Build 35',tens:0,ones:0,msg:'Add tens rods and ones cubes.'});say('Build three tens and five ones.');controls();S.check=finish(0,()=>S.tens===3&&S.ones===5,'3 tens + 5 ones = 35.')}},
{h:'Expand the digits',p:'Read 47 as 4 tens + 7 ones. The digit 4 is worth 40, not 4 ones. Expanding names the place values.',
 predict:{q:'47 expands to…',opts:['4 tens + 7 ones','4 + 7 = 11','7 tens + 4 ones'],ans:0},
 task:'Open the expansion for 47',show:()=>auto(1,[()=>{S.open=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Expand 47',n:47,tens:4,ones:7,open:0,msg:'Open tens and ones.'});say('Expand forty-seven.');controls();S.check=finish(1,()=>!!S.open,'47 = 4 tens + 7 ones.')}},
{h:'What is a ten worth?',p:'One ten equals ten ones. So the tens digit tells how many groups of ten — the digit 2 in 29 is twenty, not two.',
 predict:{q:'The 2 in 29 means…',opts:['2 tens (twenty)','2 ones','2 + 9'],ans:0},
 task:'Tap what the tens digit means',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'The 2 in 29',opts:['2 tens (twenty)','2 ones','2 + 9'],picked:null});say('What is the tens digit worth?');controls();S.check=finish(2,()=>S.picked===0,'The tens digit counts groups of ten.')}},
{h:'Teens on the chart',p:'A teen such as 14 is 1 ten and 4 ones. The “1” is a ten rod, not a lonely one — same place-value rule as 24 or 34.',
 predict:{q:'14 is…',opts:['1 ten + 4 ones','1 + 4 = 5','4 tens + 1 one'],ans:0},
 task:'Tap the teen expansion',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Expand 14',opts:['1 ten + 4 ones','1 + 4 = 5','4 tens + 1 one'],picked:null});say('Expand fourteen.');controls();S.check=finish(3,()=>S.picked===0,'14 = 1 ten + 4 ones.')}},
{h:'Catch a mix-up',p:'Slips: adding the digits (47 as 4+7=11); reversing places (47 as 7 tens + 4 ones); treating the tens digit as that many ones.',
 predict:{q:'Which is the mix-up?',opts:['47 means 4 + 7 = 11','47 means 4 tens + 7 ones','The left digit counts tens'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['47 means 4 + 7 = 11','47 means 4 tens + 7 ones','The left digit counts tens'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Digits name place values — do not add them as ones.')}},
{h:'Build 52',p:'Put 5 tens and 2 ones on the chart to make 52. Check: 5×10 + 2 = 52.',
 predict:{q:'52 needs…',opts:['5 tens + 2 ones','2 tens + 5 ones','5 + 2 ones only'],ans:0},
 task:'Build 5 tens and 2 ones',show:()=>auto(5,[()=>{S.tens=5;S.ones=2;A.redraw();S.check()}]),
 go:()=>{reset({title:'Build 52',tens:0,ones:0,msg:'Five tens, two ones.'});say('Build fifty-two.');controls();S.check=finish(5,()=>S.tens===5&&S.ones===2,'5 tens + 2 ones = 52.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['3 tens + 5 ones =',[['35','ok'],['8','sum'],['53','rev']]],
 ['47 expands to…',[['4 tens + 7 ones','ok'],['4 + 7 = 11','sum'],['7 tens + 4 ones','rev']]],
 ['The 2 in 29 is…',[['2 tens (20)','ok'],['2 ones','ones'],['2 + 9','sum']]],
 ['14 is…',[['1 ten + 4 ones','ok'],['1 + 4 = 5','sum'],['4 tens + 1 one','rev']]],
 ['52 needs…',[['5 tens + 2 ones','ok'],['2 tens + 5 ones','rev'],['5 + 2 only','sum']]],
 ['60 is…',[['6 tens + 0 ones','ok'],['6 ones','ones'],['0 tens + 6 ones','rev']]],
 ['Which is the mix-up?',[['47 means 4+7=11','ok'],['left digit = tens','place'],['right digit = ones','place']]]];
function why(t){let m='Left digit = tens; right digit = ones. Value is 10×tens + ones.';
 if(t==='sum')m='Do not add the digits as ones. 4 tens + 7 ones is 47, not 11.';
 if(t==='rev')m='You swapped places. The left digit is tens; the right digit is ones.';
 if(t==='ones')m='That digit sits in the tens place — it counts groups of ten, not single ones.';
 if(t==='place')m='That statement is true place value — not a mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Tens and ones controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
