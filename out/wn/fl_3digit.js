/* Flagship: The three digits of a three-digit number (ages 7–8; CCSS 2.NBT.1 the three digits of a three-digit
   number represent hundreds, tens, and ones; 2.NBT.1a 100 as a bundle of ten tens). Expand 347; value of each
   place; build on a H-T-O chart; catch digit-sum and place-swap myths. Distinct from flag2digit (tens/ones only),
   flaghund (count/hop within 1000), flagm100 (multiples of 100 flats), flagtenten (10 tens ↔ 1 hundred swap). */
(()=>{
VIS.reg('flag3digit',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['hto','expand','worth','zero','myth','compose','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function flat(g,x,y,s){const C=A.col;g.fillStyle=A.alpha(C.or||C.am,.55);g.fillRect(x,y,s,s);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,s,s);
 for(let i=1;i<5;i++){g.beginPath();g.moveTo(x+i*s/5,y);g.lineTo(x+i*s/5,y+s);g.moveTo(x,y+i*s/5);g.lineTo(x+s,y+i*s/5);g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;g.stroke()}}
function rod(g,x,y,u){const C=A.col;for(let i=0;i<10;i++){g.fillStyle=A.alpha(C.am,.75);g.fillRect(x,y+i*u*.85,u*.7,u*.75);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(x,y+i*u*.85,u*.7,u*.75)}}
function cube(g,x,y,u){const C=A.col;g.fillStyle=A.alpha(C.ac,.85);g.fillRect(x,y,u*.75,u*.75);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(x,y,u*.75,u*.75)}
function hto(g,W,H,h,t,o){const C=A.col,u=Math.min(W,H)*.05,cols=[['hundreds',h],['tens',t],['ones',o]];
 cols.forEach((col,i)=>{const x=W*(.05+i*.32);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,H*.2,W*.28,H*.55);T(col[0],x+W*.14,H*.24,11,{c:C.mu});
  if(i===0){for(let k=0;k<col[1];k++)flat(g,x+8+(k%2)*(u*2.2),H*.3+Math.floor(k/2)*(u*2.2),u*2)}
  if(i===1){for(let k=0;k<col[1];k++)rod(g,x+10+k*u*1.1,H*.3,u)}
  if(i===2){for(let k=0;k<col[1];k++)cube(g,x+10+(k%5)*u*1.05,H*.3+Math.floor(k/5)*u*1.15,u)}});
 T(`${h} hundreds + ${t} tens + ${o} ones`,W/2,H*.88,12,{c:C.mu,max:W*.94})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fae8ff',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Hundreds, tens, ones',W/2,H*.3,A.narrow?14:17,{w:900});T('3 digits → 3 places',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='hto'||k==='compose'){T(S.title||'H–T–O chart',W/2,H*.08,A.narrow?13:15,{w:800});hto(g,W,H,S.h||0,S.t||0,S.o||0);T(S.msg||'',W/2,H*.96,11,{c:C.mu,max:W*.92})}
 if(k==='expand'){T(S.title||'Expand',W/2,H*.08,A.narrow?13:15,{w:800});T(String(S.n||347),W/2,H*.26,26,{w:900});
  T(S.open?`${S.h} hundreds + ${S.t} tens + ${S.o} ones = ${S.n}`:(S.msg||'Open the three-place expansion.'),W/2,H*.48,A.narrow?12:14,{c:C.mu,max:W*.92});
  if(S.open)hto(g,W,H*.5+H*.4,S.h,S.t,S.o)}
 if(k==='worth'||k==='zero'||k==='myth'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{h:0,t:0,o:0,n:0,open:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='hto'||kind()==='compose'){btn('Add hundred',()=>{S.h=Math.min(9,(S.h||0)+1);S.msg=`${S.h}H + ${S.t||0}T + ${S.o||0}O = ${(S.h||0)*100+(S.t||0)*10+(S.o||0)}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a hundred flat');
  btn('Add ten',()=>{S.t=Math.min(9,(S.t||0)+1);S.msg=`${S.h||0}H + ${S.t}T + ${S.o||0}O = ${(S.h||0)*100+(S.t||0)*10+(S.o||0)}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a ten rod');
  btn('Add one',()=>{S.o=Math.min(9,(S.o||0)+1);S.msg=`${S.h||0}H + ${S.t||0}T + ${S.o}O = ${(S.h||0)*100+(S.t||0)*10+(S.o||0)}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add a ones cube');
  btn('Clear',()=>{S.h=0;S.t=0;S.o=0;S.msg='Empty H–T–O chart.';A.redraw()},'Clear chart')}
 if(kind()==='expand'){btn('Open expansion',()=>{S.open=1;A.sound.tick();say(`${S.h} hundreds + ${S.t} tens + ${S.o} ones`);A.redraw();S.check()},'Reveal H-T-O expansion');
  btn('Done',()=>S.check(),'Mark done')}
 if(kind()==='worth'||kind()==='zero'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='hto'||kind()==='compose'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.05)/(A.W*.32))));if(i===0)S.h=Math.min(9,(S.h||0)+1);else if(i===1)S.t=Math.min(9,(S.t||0)+1);else S.o=Math.min(9,(S.o||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='expand'){S.open=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='worth'||kind()==='zero'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Build on H–T–O',p:'Three digits need three places: hundreds flats, tens rods, ones cubes. Build 2 hundreds, 4 tens and 1 one to make 241 — not 2+4+1=7.',
 predict:{q:'2 hundreds + 4 tens + 1 one =',opts:['241','7','214'],ans:0},
 task:'Build 2 hundreds, 4 tens, 1 one',show:()=>auto(0,[()=>{S.h=2;S.t=4;S.o=1;S.msg='2H + 4T + 1O = 241';A.redraw();S.check()}]),
 go:()=>{reset({title:'Build 241',h:0,t:0,o:0,msg:'Add flats, rods and cubes.'});say('Build two hundreds, four tens, one one.');controls();S.check=finish(0,()=>S.h===2&&S.t===4&&S.o===1,'2 hundreds + 4 tens + 1 one = 241.')}},
{h:'Expand three digits',p:'Read 347 as 3 hundreds + 4 tens + 7 ones. Each digit’s worth depends on its place — the 3 is three hundred, not three.',
 predict:{q:'347 expands to…',opts:['3 hundreds + 4 tens + 7 ones','3+4+7=14','7 hundreds + 4 tens + 3 ones'],ans:0},
 task:'Open the expansion for 347',show:()=>auto(1,[()=>{S.open=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Expand 347',n:347,h:3,t:4,o:7,open:0,msg:'Open hundreds, tens, ones.'});say('Expand three hundred forty-seven.');controls();S.check=finish(1,()=>!!S.open,'347 = 3 hundreds + 4 tens + 7 ones.')}},
{h:'What is a hundred worth?',p:'The hundreds digit counts groups of 100. In 520 the 5 means five hundreds (500), not 5 tens or 5 ones.',
 predict:{q:'The 5 in 520 means…',opts:['5 hundreds (500)','5 tens','5 + 2 + 0'],ans:0},
 task:'Tap what the hundreds digit means',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'The 5 in 520',opts:['5 hundreds (500)','5 tens','5 + 2 + 0'],picked:null});say('What is the hundreds digit worth?');controls();S.check=finish(2,()=>S.picked===0,'Hundreds digit counts groups of one hundred.')}},
{h:'Zero holds a place',p:'In 305 the 0 tens means no tens rods — but the places still line up: 3 hundreds and 5 ones. Without the 0 you would misread the digits.',
 predict:{q:'305 is…',opts:['3 hundreds + 0 tens + 5 ones','3 + 0 + 5 = 8','35 with a decoration 0'],ans:0},
 task:'Tap the zero-place reading',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Read 305',opts:['3 hundreds + 0 tens + 5 ones','3 + 0 + 5 = 8','35 with a decoration 0'],picked:null});say('How do you read three hundred five?');controls();S.check=finish(3,()=>S.picked===0,'Zero holds the tens place in 305.')}},
{h:'Catch a mix-up',p:'Slips: summing digits (347 as 14); swapping places (347 as 743’s places); reading the hundreds digit as that many ones or tens.',
 predict:{q:'Which is the mix-up?',opts:['347 means 3+4+7=14','347 means 3 hundreds + 4 tens + 7 ones','Left digit of 347 is hundreds'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['347 means 3+4+7=14','347 means 3 hundreds + 4 tens + 7 ones','Left digit of 347 is hundreds'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Digits name places — do not add them as ones.')}},
{h:'Compose 516',p:'Put 5 hundreds, 1 ten and 6 ones on the chart. Check: 5×100 + 1×10 + 6 = 516.',
 predict:{q:'516 needs…',opts:['5 hundreds + 1 ten + 6 ones','1 hundred + 5 tens + 6 ones','5+1+6 ones only'],ans:0},
 task:'Build 5 hundreds, 1 ten, 6 ones',show:()=>auto(5,[()=>{S.h=5;S.t=1;S.o=6;A.redraw();S.check()}]),
 go:()=>{reset({title:'Build 516',h:0,t:0,o:0,msg:'Five hundreds, one ten, six ones.'});say('Build five hundred sixteen.');controls();S.check=finish(5,()=>S.h===5&&S.t===1&&S.o===6,'5 hundreds + 1 ten + 6 ones = 516.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['2H + 4T + 1O =',[['241','ok'],['7','sum'],['214','swap']]],
 ['347 expands to…',[['3H + 4T + 7O','ok'],['3+4+7=14','sum'],['7H + 4T + 3O','swap']]],
 ['The 5 in 520 is…',[['5 hundreds (500)','ok'],['5 tens','tens'],['5+2+0','sum']]],
 ['305 is…',[['3H + 0T + 5O','ok'],['3+0+5=8','sum'],['just 35','zero']]],
 ['516 needs…',[['5H + 1T + 6O','ok'],['1H + 5T + 6O','swap'],['5+1+6 ones','sum']]],
 ['400 is…',[['4 hundreds + 0 tens + 0 ones','ok'],['4 tens','tens'],['40 with extras','zero']]],
 ['Which is the mix-up?',[['347 means 3+4+7=14','ok'],['left digit = hundreds','place'],['middle digit = tens','place']]]];
function why(t){let m='Hundreds, tens, ones: value = 100×H + 10×T + O.';
 if(t==='sum')m='Do not add the three digits as ones. Places multiply their worth.';
 if(t==='swap')m='You moved digits across places. Hundreds stay on the left.';
 if(t==='tens')m='That digit is in the hundreds place — it counts hundreds, not tens.';
 if(t==='zero')m='Zero holds a place. 305 is not the same as 35.';
 if(t==='place')m='That statement is true place value — not a mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Hundreds tens ones controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
