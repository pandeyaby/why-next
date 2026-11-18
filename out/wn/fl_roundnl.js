/* Flagship: Rounding to 10, 100, 1000 (ages 8–9; CCSS 3.NBT.1, NC Year 4 Number and place value: round any number to
   the nearest 10, 100 or 1000). Drag a marker along a number line between two multiples and watch which one is nearer;
   meet the halfway case (5 rounds up); round to the nearest 100 by looking at the tens digit and catch the "round twice"
   slip (349 is not 400); round to the nearest 1000; round one number three ways; and use rounding to estimate a sum.
   Distinct from flagplace (× and ÷ by 10 shifting digits), flagpvc (value of each digit) and flagcmp2d (comparing with
   < and >): this lab is about distance to the nearest multiple on a number line. */
(()=>{
const near=(v,u)=>Math.floor(v/u+.5)*u,fmt=n=>n>=1000?n.toLocaleString('en-GB'):String(n);
// each number-line part: the unit to round to, the window shown, and where the marker starts
const LINES={tens:{u:10,lo:30,hi:40,v:37},half:{u:10,lo:60,hi:70,v:62},hund:{u:100,lo:300,hi:400,v:349},thou:{u:1000,lo:4000,hi:5000,v:4738}};
const THREE=[[10,[4360,4370,4300]],[100,[4400,4300,4370]],[1000,[4000,5000,4400]]];
VIS.reg('flagroundnl',c=>{let A,keys,qa,turn=-1;const R={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const part=()=>['tens','half','hund','thou','three','est','quiz'][A.step];
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function start(o){for(const k in R)delete R[k];Object.assign(R,{v:0,seen:{up:false,down:false,half:false},drag:false,three:{},est:{a:null,b:null},msg:'',hook:()=>{}},o||{});A.redraw()}
const L=()=>LINES[part()];
// ---------- number line ----------
function geom(){const W=A.W,H=A.H;return{x0:W*.08,x1:W*.92,y:H*.55}}
const toX=v=>{const{x0,x1}=geom(),l=L();return x0+(v-l.lo)/(l.hi-l.lo)*(x1-x0)};
function line(g){const C=A.col,l=L(),{x0,x1,y}=geom(),mid=(l.lo+l.hi)/2,small=(l.hi-l.lo)/10,nar=A.narrow;
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let i=0;i<=10;i++){const v=l.lo+i*small,x=toX(v),end=i===0||i===10,half=i===5;g.lineWidth=end?3:half?2.5:1.5;g.strokeStyle=half?C.am:C.tx;g.beginPath();g.moveTo(x,y-(end?16:half?12:8));g.lineTo(x,y+(end?16:half?12:8));g.stroke();
  if(end)ink(fmt(v),x,y+32,nar?15:18);else if(half)ink(fmt(v),x,y+30,nar?11:13,{c:C.am,w:600});else if(!nar)ink(fmt(v),x,y+26,11,{c:C.mu,w:500})}
 const v=R.v,r=near(v,l.u),xv=toX(v),xr=toX(r),dLo=v-l.lo,dHi=l.hi-v;
 // distance bars to each end
 g.lineWidth=6;g.strokeStyle=A.alpha(C.cy,.55);g.beginPath();g.moveTo(x0,y+52);g.lineTo(xv,y+52);g.stroke();g.strokeStyle=A.alpha(C.vi,.55);g.beginPath();g.moveTo(xv,y+60);g.lineTo(x1,y+60);g.stroke();
 ink(`${fmt(dLo)} from ${fmt(l.lo)}`,Math.max(x0+40,Math.min((x0+xv)/2,x1-40)),y+76,12,{c:C.mu,w:600});ink(`${fmt(dHi)} from ${fmt(l.hi)}`,Math.min(x1-40,Math.max((xv+x1)/2,x0+40)),y+92,12,{c:C.mu,w:600});
 // jump arrow to the nearer multiple
 g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(xv,y-40);g.quadraticCurveTo((xv+xr)/2,y-88,xr,y-22);g.stroke();g.fillStyle=C.gr;g.beginPath();g.moveTo(xr,y-18);g.lineTo(xr-7,y-32);g.lineTo(xr+7,y-32);g.closePath();g.fill();
 if(Math.abs(toX(v)-toX(mid))>46)ink('halfway',toX(mid),y-26,12,{c:C.am,w:600});
 // marker
 g.fillStyle=C.rd;g.beginPath();g.moveTo(xv,y-6);g.lineTo(xv-12,y-30);g.lineTo(xv+12,y-30);g.closePath();g.fill();g.beginPath();g.arc(xv,y-34,13,0,7);g.fill();
 ink(fmt(v),xv,y-56,nar?16:19,{c:C.rd});ink(`${fmt(v)} rounds to ${fmt(r)}`,A.W/2,A.H*.17,nar?17:21,{c:C.gr});
 ink(dLo===dHi?'Exactly halfway: round up':`${fmt(r)} is nearer`,A.W/2,A.H*.26,13,{c:C.mu,w:500})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=part();g.fillStyle=A.mix(C.pn,C.vi,C.dark?.05:.05);g.fillRect(0,0,W,H);const t=A.narrow?14:16;
 if(k==='quiz'){ink('Round it!',W/2,H*.42,A.narrow?17:20);ink('Answer below',W/2,H*.56,13,{c:C.mu,w:500});A.fx.draw(g);return}
 if(LINES[k]){ink({tens:'Round to the nearest 10',half:'What about exactly halfway?',hund:'Round to the nearest 100',thou:'Round to the nearest 1000'}[k],W/2,H*.07,t);line(g)}
 if(k==='three'){ink('Round 4,367 three ways',W/2,H*.07,t);const rows=[['nearest 10','4,367 → ?'],['nearest 100','4,367 → ?'],['nearest 1000','4,367 → ?']];
  // place-value digits, with the deciding digit lit for each unit
  const digits=['4','3','6','7'],dx=A.narrow?34:44,sx=W/2-dx*1.5,dy=H*.22;digits.forEach((d,i)=>{g.fillStyle=A.mix(C.pn,C.ac,.12);A.paint.rrect(sx+i*dx-dx*.42,dy-dx*.5,dx*.84,dx,8);g.fill();ink(d,sx+i*dx,dy,A.narrow?20:24);ink(['Th','H','T','O'][i],sx+i*dx,dy+dx*.75,11,{c:C.mu,w:500})});
  THREE.forEach(([u],i)=>{const y=H*(.48+i*.15),got=R.three[u];ink(`To the ${rows[i][0]}:`,W*.06,y,A.narrow?14:16,{al:'left'});ink(got?`${fmt(near(4367,u))} ✓`:'?',W*.94,y,A.narrow?16:19,{al:'right',c:got?C.gr:C.mu})});
  ink(R.msg,W/2,H*.93,12,{c:C.mu,w:500})}
 if(k==='est'){ink('Estimate 389 + 512',W/2,H*.07,t);const y1=H*.32,y2=H*.55;
  [[389,'a',y1],[512,'b',y2]].forEach(([n,key,y])=>{const lo=Math.floor(n/100)*100,x0=W*.1,x1=W*.9,X=v=>x0+(v-lo)/100*(x1-x0);g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
   [lo,lo+50,lo+100].forEach(v=>{g.beginPath();g.moveTo(X(v),y-10);g.lineTo(X(v),y+10);g.stroke();ink(fmt(v),X(v),y+24,13,{c:v===lo+50?C.am:C.tx,w:600})});
   g.fillStyle=C.rd;g.beginPath();g.arc(X(n),y-14,9,0,7);g.fill();ink(String(n),X(n),y-32,15,{c:C.rd});
   if(R.est[key]!=null){const ok=R.est[key]===near(n,100);ink(`→ ${R.est[key]}`,X(R.est[key]),y+44,15,{c:ok?C.gr:C.rd})}});
  const a=R.est.a,b=R.est.b;ink(a!=null&&b!=null?`${a} + ${b} = ${a+b}   (exact: 901)`:'Tap the nearer hundred on each line',W/2,H*.8,A.narrow?15:17,{c:a!=null&&b!=null?C.tx:C.mu});ink(R.msg,W/2,H*.92,12,{c:C.mu,w:500})}
 A.fx.draw(g)}
// ---------- actions ----------
function setV(v){const l=L();if(!l)return;R.v=Math.max(l.lo,Math.min(l.hi,Math.round(v)));const r=near(R.v,l.u),mid=(l.lo+l.hi)/2;
 if(R.v>l.lo&&R.v<l.hi){if(R.v===mid)R.seen.half=true;else R.seen[R.v>mid?'up':'down']=true}
 voice(`${fmt(R.v)} rounds to ${fmt(r)} to the nearest ${l.u}. It is ${fmt(R.v-l.lo)} from ${fmt(l.lo)} and ${fmt(l.hi-R.v)} from ${fmt(l.hi)}.`+(R.v===mid?' Exactly halfway, so we round up.':''));A.sound.tick();A.redraw();R.hook()}
function nudge(d){setV(R.v+d)}
function answerThree(u,v){const right=near(4367,u);if(v===right){R.three[u]=true;A.sound.pop();R.msg=`Yes: ${fmt(right)}. Look at the ${u===10?'ones':u===100?'tens':'hundreds'} digit to decide.`}
 else{A.sound.miss();R.msg=u===10&&v===4360?'7 ones is 5 or more, so round the tens up: 4,370.':u===100&&v===4370?'That is the nearest 10. For the nearest 100, look at the tens digit: 6, so round up to 4,400.':u===100?'The tens digit is 6, which is 5 or more, so round up to 4,400.':u===1000&&v===5000?'Look only at the hundreds digit: 3 is less than 5, so round down to 4,000.':v===4400?'4,400 is the nearest 100. Round to the nearest 1000: the hundreds digit 3 means round down to 4,000.':'Check the digit just to the right of the place you round to.'}
 voice(R.msg);controls();A.redraw();R.hook()}
function pickEst(key,v){R.est[key]=v;const n=key==='a'?389:512,right=near(n,100);if(v===right)A.sound.pop();else A.sound.miss();R.msg=v===right?`${n} rounds to ${right}.`:`${n} is nearer ${right} than ${v}.`;
 if(R.est.a===400&&R.est.b===500)R.msg='400 + 500 = 900. The exact answer 901 is very close.';voice(R.msg);controls();A.redraw();R.hook()}
function controls(){if(!keys)return;keys.innerHTML='';const k=part();if(k==='quiz')return;const b=(t,f,lab,on)=>{const e=c.el('button',{type:'button',class:'lbtn'+(on?' mine':''),'aria-label':lab||t},keys,t);if(on!=null)e.setAttribute('aria-pressed',String(!!on));e.onclick=f;return e};
 if(LINES[k]){const s=L().u/10;[[-s,'−'+s],[-1,'−1'],[1,'+1'],[s,'+'+s]].filter((z,i,a)=>a.findIndex(q=>q[1]===z[1])===i).forEach(([d,t])=>b(t,()=>nudge(d),`Move the marker ${d>0?'up':'down'} by ${Math.abs(d)}`))}
 if(k==='three')THREE.forEach(([u,opts])=>{if(R.three[u])return;opts.forEach(v=>b(`${u}s: ${fmt(v)}`,()=>answerThree(u,v),`Nearest ${u}: ${fmt(v)}`))});
 if(k==='est'){[300,400].forEach(v=>b(`389 → ${v}`,()=>pickEst('a',v),`Round 389 to ${v}`,R.est.a===v));[500,600].forEach(v=>b(`512 → ${v}`,()=>pickEst('b',v),`Round 512 to ${v}`,R.est.b===v))}}
// ---------- canvas: drag the marker; tap the nearer hundred in the estimate ----------
function down(p){const k=part();if(k==='quiz')return false;
 if(LINES[k]){R.drag=true;move(p);return true}
 if(k==='est'){const key=Math.abs(p.y-A.H*.32)<Math.abs(p.y-A.H*.55)?'a':'b',n=key==='a'?389:512,lo=Math.floor(n/100)*100;pickEst(key,p.x<A.W/2?lo:lo+100);return true}return false}
function move(p){if(!R.drag||!LINES[part()])return;const{x0,x1}=geom(),l=L(),v=l.lo+(p.x-x0)/(x1-x0)*(l.hi-l.lo);const snap=l.u>=100?l.u/100:1;setV(Math.round(v/snap)*snap)}
function up(){R.drag=false}
const when=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function run(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*420))}
const steps=[
{h:'Which ten is nearer?',p:'Rounding to the nearest 10 means finding the multiple of 10 that is closest. Drag the red marker. The green arrow jumps to the nearer ten.',
 predict:{q:'37 rounded to the nearest 10 is…',opts:['30, because it starts with 3','40, because 40 is nearer','37, it stays the same'],ans:1},
 task:'Find a number that rounds down and one that rounds up',show:()=>run(0,[()=>setV(33),()=>setV(37)]),
 go:()=>{start();R.v=LINES.tens.v;voice('37 is on the line. Drag the marker or use the buttons.');controls();R.hook=when(0,()=>R.seen.up&&R.seen.down,()=>'31 to 34 are nearer 30; 36 to 39 are nearer 40. Only the distance decides.')}},
{h:'Exactly halfway',p:'65 is 5 from 60 and 5 from 70. Neither is nearer. The rule is: halfway rounds up. So 5 or more in the ones rounds up; 4 or less rounds down.',
 predict:{q:'65 rounded to the nearest 10 is…',opts:['60','70','it cannot be rounded'],ans:1},
 task:'Put the marker exactly halfway',show:()=>run(1,[()=>setV(64),()=>setV(65)]),
 go:()=>{start();R.v=LINES.half.v;controls();voice('62 is on the line. Move it to halfway.');R.hook=when(1,()=>R.seen.half,()=>'65 is halfway, so it rounds up to 70. 64 rounds down to 60.')}},
{h:'To the nearest 100',p:'Now the line runs from 300 to 400 and halfway is 350. Look at the tens digit: 5 or more rounds up. Do not round in two steps.',
 predict:{q:'349 rounded to the nearest 100 is…',opts:['400, because 349 rounds to 350 first','300, because 349 is below 350','350'],ans:1},
 task:'Find a number that rounds down and one that rounds up',show:()=>run(2,[()=>setV(349),()=>setV(367)]),
 go:()=>{start();R.v=LINES.hund.v;controls();voice('349 is on the line.');R.hook=when(2,()=>R.seen.up&&R.seen.down,()=>'349 is 49 from 300 and 51 from 400, so it rounds to 300. Rounding 349 to 350 first gives the wrong answer.')}},
{h:'To the nearest 1000',p:'Between 4,000 and 5,000, halfway is 4,500. Look at the hundreds digit to decide.',
 predict:{q:'4,738 rounded to the nearest 1000 is…',opts:['4,000, because it starts with 4','5,000','4,700'],ans:1},
 task:'Find a number that rounds down and one that rounds up',show:()=>run(3,[()=>setV(4367),()=>setV(4738)]),
 go:()=>{start();R.v=LINES.thou.v;controls();voice('4,738 is on the line.');R.hook=when(3,()=>R.seen.up&&R.seen.down,()=>'4,738 has 7 hundreds, so it rounds up to 5,000. 4,367 has 3 hundreds, so it rounds down to 4,000.')}},
{h:'One number, three ways',p:'The same number rounds differently to the nearest 10, 100 and 1000. Each time, look at the digit just right of the place you round to.',
 predict:{q:'4,367 to the nearest 1000 is…',opts:['5,000','4,400','4,000'],ans:2},
 task:'Round 4,367 to the nearest 10, 100 and 1000',show:()=>run(4,[()=>answerThree(10,4370),()=>answerThree(100,4400),()=>answerThree(1000,4000)]),
 go:()=>{start();controls();voice('Choose the rounded number for each row.');R.hook=when(4,()=>R.three[10]&&R.three[100]&&R.three[1000],()=>'4,370, 4,400 and 4,000. The digit to the right of the rounding place decides.')}},
{h:'Estimate with rounding',p:'Rounding helps you check an answer. Round each number to the nearest 100, then add.',
 predict:{q:'A quick estimate for 389 + 512 is…',opts:['800, from 300 + 500','900, from 400 + 500','1,000, from 400 + 600'],ans:1},
 task:'Round both numbers to the nearest 100',show:()=>run(5,[()=>pickEst('a',400),()=>pickEst('b',500)]),
 go:()=>{start();controls();voice('Tap the nearer hundred on each line, or use the buttons.');R.hook=when(5,()=>R.est.a===400&&R.est.b===500,()=>'400 + 500 = 900, and the exact sum is 901. If you got 1,101 you would know to check.')}},
{h:'Challenge',p:'',go:()=>{start();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
 ['Round 46 to the nearest 10.',[['50','ok'],['40','first'],['46','same']]],
 ['Round 250 to the nearest 100.',[['300','ok'],['200','half'],['250','same']]],
 ['Round 449 to the nearest 100.',[['400','ok'],['500','twice'],['450','unit']]],
 ['Round 6,512 to the nearest 1000.',[['7,000','ok'],['6,000','first'],['6,500','unit']]],
 ['Round 1,234 to the nearest 10.',[['1,230','ok'],['1,240','up'],['1,200','unit']]],
 ['Which number rounds to 600 to the nearest 100?',[['562','ok'],['549','up'],['650','half']]]];
function why(t){let m='Find the two multiples either side and pick the nearer one; halfway rounds up.';
 if(t==='first')m='Do not just keep the first digit. Check the next digit: 5 or more means round up.';
 if(t==='same')m='Rounding changes the number to the nearest multiple of 10, 100 or 1000.';
 if(t==='half')m='Exactly halfway rounds up. 250 rounds to 300 and 650 rounds to 700.';
 if(t==='twice')m='Round in one step. 449 is 49 from 400 and 51 from 500, so it rounds to 400, not 450 then 500.';
 if(t==='unit')m='Check the place: that answer is rounded to a different unit.';
 if(t==='up')m='The deciding digit is less than 5, so it rounds down.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right: the nearer multiple, and halfway rounds up.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qa.hidden=A.step!==6;keys.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rounding controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
