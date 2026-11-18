/* Flagship: Addition and subtraction within 1000 (ages 7–8; CCSS 2.NBT.7: add and subtract within 1000 using concrete
   models or drawings and strategies based on place value, composing or decomposing tens or hundreds when necessary;
   NC Year 3 add and subtract numbers with up to three digits using formal written methods of columnar addition and
   subtraction). A place-value mat of hundreds flats, tens rods and ones cubes sits next to the written column method.
   Drag 10 ones up to make a ten, 10 tens up to make a hundred, or drag a ten or a hundred down to break it, and watch
   the small carried or renamed digits appear in the written sum at the same moment. Distinct from flag3digit (what
   each digit is worth) and flagw20 (facts within 20): this lab is the exchange inside three-digit column sums. */
(()=>{
const NAME=['hundreds','tens','ones'],ONE=['hundred','ten','one'];
const pl=(n,i)=>n===1?ONE[i]:NAME[i];
const dig=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10];
// each teaching step: [a, op, b]
const SUMS=[[247,'+',136],[365,'+',271],[458,'+',367],[352,'−',127],[425,'−',162],[503,'−',148]];
VIS.reg('flagregroup',c=>{let A,keys,qa,turn=-1;const R={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function ink(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
// one sum on the mat: n = blocks now in each column, carry = tens or hundreds made, took = columns already taken away
function setUp(i){for(const k in R)delete R[k];const[a,op,b]=SUMS[i]||SUMS[0],da=dig(a),db=dig(b),add=op==='+';
 Object.assign(R,{a,b,op,add,da,db,n:add?da.map((d,j)=>d+db[j]):da.slice(),carry:[0,0,0],took:[false,false,false],msg:'',drag:null,hook:()=>{}});A.redraw()}
const total=()=>R.n[0]*100+R.n[1]*10+R.n[2];
const target=()=>R.add?R.a+R.b:R.a-R.b;
const settled=()=>R.add?R.n.every(v=>v<10):R.took.every(Boolean);
// ---------- layout ----------
function mat(){const{W,H}=A;return A.narrow?{x:6,y:H*.1,w:W-12,h:H*.58}:{x:8,y:H*.12,w:W*.62,h:H*.8}}
function paper(){const{W,H}=A;return A.narrow?{x:W*.18,y:H*.7,w:W*.64,h:H*.29}:{x:W*.66,y:H*.18,w:W*.32,h:H*.66}}
const colAt=p=>{const m=mat();if(p.y<m.y||p.y>m.y+m.h||p.x<m.x||p.x>m.x+m.w)return -1;return Math.min(2,Math.floor((p.x-m.x)/(m.w/3)))};
const COLS=()=>[A.col.vi,A.col.ac,A.col.am];
function blocks(g,i,box,count,ghost){const C=A.col,fill=A.mix(COLS()[i],C.pn,C.dark?.25:.15),edge=A.mix(COLS()[i],C.tx,.35);g.globalAlpha=ghost?.45:1;
 if(i===0){const s=Math.max(10,Math.min(box.w/3-5,box.h/5-5));for(let k=0;k<count;k++){const x=box.x+(k%3)*(s+5),y=box.y+Math.floor(k/3)*(s+5);
  g.fillStyle=fill;g.fillRect(x,y,s,s);g.strokeStyle=A.alpha(C.pn,.55);g.lineWidth=1;g.beginPath();for(let q=1;q<10;q++){g.moveTo(x+s*q/10,y);g.lineTo(x+s*q/10,y+s);g.moveTo(x,y+s*q/10);g.lineTo(x+s,y+s*q/10)}g.stroke();g.strokeStyle=edge;g.strokeRect(x,y,s,s)}}
 if(i===1){const rw=Math.max(5,Math.min(box.w/9-3,16)),rh=Math.min(box.h/2-8,rw*10);for(let k=0;k<count;k++){const x=box.x+(k%9)*(rw+3),y=box.y+Math.floor(k/9)*(rh+8);
  g.fillStyle=fill;g.fillRect(x,y,rw,rh);g.strokeStyle=A.alpha(C.pn,.6);g.lineWidth=1;g.beginPath();for(let q=1;q<10;q++){g.moveTo(x,y+rh*q/10);g.lineTo(x+rw,y+rh*q/10)}g.stroke();g.strokeStyle=edge;g.strokeRect(x,y,rw,rh)}}
 if(i===2){const q=Math.max(7,Math.min(box.w/5-4,box.h/4-4,26));for(let k=0;k<count;k++){const x=box.x+(k%5)*(q+4),y=box.y+Math.floor(k/5)*(q+4);g.fillStyle=fill;g.fillRect(x,y,q,q);g.strokeStyle=edge;g.lineWidth=1;g.strokeRect(x,y,q,q)}
  if(count>=10&&!ghost){g.strokeStyle=C.gr;g.lineWidth=2.5;g.setLineDash([5,4]);g.strokeRect(box.x-3,box.y-3,5*(q+4)+2,2*(q+4)+2);g.setLineDash([])}}
 if(i===1&&count>=10&&!ghost){const rw=Math.max(5,Math.min(box.w/9-3,16)),rh=Math.min(box.h/2-8,rw*10);g.strokeStyle=C.gr;g.lineWidth=2.5;g.setLineDash([5,4]);g.strokeRect(box.x-3,box.y-3,9*(rw+3)+2,rh+6);g.setLineDash([])}
 g.globalAlpha=1}
function drawMat(g){const C=A.col,m=mat(),cw=m.w/3,small=A.narrow?12:14;
 for(let i=0;i<3;i++){const x=m.x+i*cw,hot=R.add?R.n[i]>=10&&i>0:!R.took[i]&&R.n[i]<R.db[i];
  g.fillStyle=A.mix(C.pn,COLS()[i],C.dark?.12:.08);A.paint.rrect(x+2,m.y,cw-4,m.h,10);g.fill();g.strokeStyle=hot?C.am:C.ln;g.lineWidth=hot?3:1;g.stroke();
  ink(NAME[i],x+cw/2,m.y+13,small,{max:cw-8});
  const sub=R.add?'':R.took[i]?' ✓':` (take ${R.db[i]})`;ink(`${R.n[i]}${sub}`,x+cw/2,m.y+32,A.narrow?15:18,{c:hot?C.tx:C.mu,max:cw-8});
  const box={x:x+8,y:m.y+48,w:cw-16,h:m.h-56};blocks(g,i,box,R.n[i])}
 if(R.drag&&R.drag.moved){const i=R.drag.from,box={x:R.drag.x-14,y:R.drag.y-14,w:cw-16,h:m.h-56};blocks(g,i,box,R.add||i===2?Math.min(10,R.n[i]):1,true)}}
function drawPaper(g){const C=A.col,p=paper(),px=A.narrow?18:22,cw=Math.min(p.w/4.2,px*1.6),x0=p.x+p.w-cw*3-6,row=px*1.35;let y=p.y+10;
 const at=(j,s,yy,o)=>ink(String(s),x0+cw*(j+.5),yy,o&&o.px||px,o);
 ['H','T','O'].forEach((h,j)=>at(j,h,y,{px:A.narrow?11:12,c:C.mu,w:600}));y+=row*.75;
 // small digits: carries (addition) or renamed amounts (subtraction)
 for(let j=0;j<3;j++){if(R.add&&R.carry[j])at(j,R.carry[j],y,{px:A.narrow?12:13,c:C.gr});
  if(!R.add){const now=R.n[j]+(R.took[j]?R.db[j]:0);if(now!==R.da[j])at(j,now,y,{px:A.narrow?12:13,c:C.gr})}}
 y+=row*.7;R.da.forEach((d,j)=>{if(j===0&&!d)return;at(j,d,y);if(!R.add){const now=R.n[j]+(R.took[j]?R.db[j]:0);if(now!==d){g.strokeStyle=C.rd;g.lineWidth=2;g.beginPath();g.moveTo(x0+cw*(j+.2),y+px*.35);g.lineTo(x0+cw*(j+.8),y-px*.35);g.stroke()}}});
 y+=row;ink(R.add?'+':'−',x0-cw*.4,y,px);R.db.forEach((d,j)=>{if(j===0&&!d)return;at(j,d,y)});
 y+=row*.6;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0-cw*.8,y);g.lineTo(x0+cw*3,y);g.stroke();y+=row*.65;
 const show=j=>R.add?settled():R.took[j];for(let j=0;j<3;j++)if(show(j)&&!(j===0&&R.n[0]===0&&settled()))at(j,R.n[j],y,{c:C.gr})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,C.ac,C.dark?.03:.04);g.fillRect(0,0,W,H);
 if(A.step===6){ink('Add and subtract within 1000',W/2,H*.42,A.narrow?16:20);ink('Answer below',W/2,H*.56,13,{c:C.mu,w:500});A.fx.draw(g);return}
 const head=settled()?`${R.a} ${R.op} ${R.b} = ${target()} ✓`:`${R.a} ${R.op} ${R.b}`;ink(head,W/2,H*.045,A.narrow?16:19,{c:settled()?C.gr:C.tx});
 drawMat(g);drawPaper(g);if(R.msg)ink(R.msg,W/2,H-10,A.narrow?11:13,{w:600,max:W-10});A.fx.draw(g)}
// ---------- actions ----------
function say(m,good){R.msg=m;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(m);controls();A.redraw();R.hook()}
// compose: 10 of column i become 1 of the column to its left
function exchange(i){if(i<1)return say('A hundred is the biggest block here.',false);
 if(!R.add)return say('When you take away, you break a big block into small ones. You do not swap up.',false);
 if(R.n[i]<10)return say(`You need 10 ${NAME[i]} to make 1 ${ONE[i-1]}. There are only ${R.n[i]}.`,false);
 R.n[i]-=10;R.n[i-1]++;R.carry[i-1]++;
 say(`10 ${NAME[i]} → 1 ${ONE[i-1]}. Now ${R.n[i]} ${pl(R.n[i],i)} left, and a small 1 goes in the ${NAME[i-1]} column.`,true)}
// is there a reason to break a block from column i into column i+1?
function needs(i){const j=i+1;if(R.took[j])return false;if(R.n[j]<R.db[j])return true;return j===1&&R.n[1]===0&&!R.took[2]&&R.n[2]<R.db[2]}
// decompose: 1 of column i becomes 10 of the column to its right
function breakDown(i){if(i>1)return say('Ones are the smallest blocks. You cannot break them.',false);
 if(R.add)return say('When you add, you swap 10 small blocks for 1 bigger one, not the other way.',false);
 if(R.n[i]<1)return say(`There are no ${NAME[i]} to break.${i===1?' Break a hundred into 10 tens first.':''}`,false);
 if(!needs(i))return say(`You have enough ${NAME[i+1]} already. Only break a block when you need more.`,false);
 R.n[i]--;R.n[i+1]+=10;say(`1 ${ONE[i]} → 10 ${NAME[i+1]}. Now there are ${R.n[i]} ${pl(R.n[i],i)} and ${R.n[i+1]} ${NAME[i+1]}.`,true)}
function take(i){if(R.add)return R.n[i]>=10&&i>0?exchange(i):say(R.n[i]>=10?'Ten hundreds would be a thousand. Not here.':`${R.n[i]} ${NAME[i]} is fine. Look for a column with 10 or more.`,R.n[i]<10?undefined:false);
 if(R.took[i])return say(`You already took away the ${NAME[i]}.`);
 const need=R.db[i];if(R.n[i]<need){const up=i===2&&R.n[1]===0?'a hundred, then a ten':ONE[i-1]||'';
  return say(`${R.n[i]} take away ${need} will not go. Do not swap it to ${need} − ${R.n[i]}. Break ${/^a /.test(up)?up:'a '+up} first.`,false)}
 R.n[i]-=need;R.took[i]=true;say(`Take away ${need} ${pl(need,i)}: ${R.n[i]} ${pl(R.n[i],i)} left.`,true)}
function controls(){if(!keys)return;keys.innerHTML='';if(A.step===6)return;const b=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':lab||t},keys,t).onclick=f};
 if(R.add){b('10 ones → 1 ten',()=>exchange(2),'Swap 10 ones for 1 ten');b('10 tens → 1 hundred',()=>exchange(1),'Swap 10 tens for 1 hundred');return}
 b('1 hundred → 10 tens',()=>breakDown(0),'Break 1 hundred into 10 tens');b('1 ten → 10 ones',()=>breakDown(1),'Break 1 ten into 10 ones');
 [2,1,0].forEach(i=>{if(!R.took[i])b(`Take away ${R.db[i]} ${pl(R.db[i],i)}`,()=>take(i))})}
// ---------- canvas: drag blocks to the next column, tap a column to take away ----------
function down(p){if(A.step===6)return false;const i=colAt(p);if(i<0||!R.n[i])return false;R.drag={from:i,x:p.x,y:p.y,x0:p.x,y0:p.y,moved:false};return true}
function move(p){if(!R.drag)return;R.drag.x=p.x;R.drag.y=p.y;if(Math.hypot(p.x-R.drag.x0,p.y-R.drag.y0)>10)R.drag.moved=true;A.redraw()}
function up(p){const d=R.drag;R.drag=null;if(!d)return;if(!d.moved){take(d.from);return}const j=p?colAt(p):-1;
 if(j===d.from-1)exchange(d.from);else if(j===d.from+1)breakDown(d.from);else if(j===d.from)A.redraw();else say('Drag blocks one column left to swap up, or one column right to break down.',false)}
const when=(i,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&settled()&&total()===target())A.done(line()+A.reveal(i))};
function run(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*450))}
function begin(i,line,hint){setUp(i);voice(hint);controls();R.hook=when(i,line)}
const steps=[
{h:'Make a ten',p:'Add the ones first. 7 ones and 6 ones make 13 ones. A column can hold at most 9, so swap 10 ones for 1 ten.',
 predict:{q:'247 + 136: 7 ones + 6 ones = 13 ones. What goes in the ones column of the answer?',opts:['13','3, and the 10 ones become 1 ten','1'],ans:1},
 task:'Drag 10 ones into the tens column',show:()=>run(0,[()=>exchange(2)]),
 go:()=>begin(0,()=>'13 ones = 1 ten and 3 ones. The small 1 in the tens column is that ten: 247 + 136 = 383.','247 plus 136. The ones column has 13 ones. Drag 10 of them to the tens, or use the button.')},
{h:'Make a hundred',p:'The same rule works one column up. 10 tens make 1 hundred, so 13 tens become 1 hundred and 3 tens.',
 predict:{q:'365 + 271: 6 tens + 7 tens = 13 tens. That is the same as…',opts:['13 ones','1 hundred and 3 tens','1 ten and 3 ones'],ans:1},
 task:'Swap 10 tens for 1 hundred',show:()=>run(1,[()=>exchange(1)]),
 go:()=>begin(1,()=>'130 is 1 hundred and 3 tens, so a small 1 goes in the hundreds: 365 + 271 = 636.','365 plus 271. The tens column has 13 tens. Drag 10 tens to the hundreds.')},
{h:'Two swaps',p:'Some sums need a swap in the ones and another in the tens. Work from the ones to the left, one column at a time.',
 predict:{q:'458 + 367. How many swaps will you need?',opts:['none','one','two'],ans:2},
 task:'Make every column 9 or less',show:()=>run(2,[()=>exchange(2),()=>exchange(1)]),
 go:()=>begin(2,()=>'15 ones gave a ten; then 12 tens gave a hundred. 458 + 367 = 825.','458 plus 367. Find each column with 10 or more and swap.')},
{h:'Break a ten',p:'To take away, start with the ones. If there are not enough ones, break 1 ten into 10 ones. Never swap the digits round.',
 predict:{q:'352 − 127. In the ones, 2 − 7 will not go. What do you do?',opts:['work out 7 − 2 = 5 instead','break 1 ten into 10 ones, then 12 − 7','write 0 and move on'],ans:1},
 task:'Break a ten, then take away 127',show:()=>run(3,[()=>breakDown(1),()=>take(2),()=>take(1),()=>take(0)]),
 go:()=>begin(3,()=>'5 tens became 4 tens and 12 ones. 12 − 7 = 5, 4 − 2 = 2, 3 − 1 = 2: 352 − 127 = 225.','352 take away 127. Only 2 ones, but we must take 7. Drag a ten into the ones to break it.')},
{h:'Break a hundred',p:'If the tens are short, break 1 hundred into 10 tens. The hundreds digit then goes down by 1.',
 predict:{q:'425 − 162. In the tens, 2 − 6 will not go. You…',opts:['break 1 hundred into 10 tens','break 1 ten into 10 ones','swap it to 6 − 2'],ans:0},
 task:'Take away 162, breaking a hundred when you need to',show:()=>run(4,[()=>take(2),()=>breakDown(0),()=>take(1),()=>take(0)]),
 go:()=>begin(4,()=>'4 hundreds became 3 hundreds and 12 tens. 12 − 6 = 6 tens: 425 − 162 = 263.','425 take away 162. Start with the ones.')},
{h:'Zero in the middle',p:'503 has no tens to break. First break a hundred into 10 tens. Then break one of those tens into 10 ones.',
 predict:{q:'503 − 148. There are no tens to break. What now?',opts:['the answer must be below zero','break a hundred into 10 tens, then a ten into 10 ones','take 3 from 8 instead'],ans:1},
 task:'Take away 148 from 503',show:()=>run(5,[()=>breakDown(0),()=>breakDown(1),()=>take(2),()=>take(1),()=>take(0)]),
 go:()=>begin(5,()=>'5 hundreds, 0 tens, 3 ones became 4 hundreds, 9 tens, 13 ones. 503 − 148 = 355.','503 take away 148. There are 0 tens. Break a hundred first.')},
{h:'Challenge',p:'',go:()=>{setUp(0);next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
 ['247 + 136 = ?',[['383','ok'],['3713','write13'],['373','nocarry']]],
 ['352 − 127 = ?',[['225','ok'],['235','swap'],['479','op']]],
 ['458 + 367 = ?',[['825','ok'],['715','nocarry'],['725','onecarry']]],
 ['503 − 148 = ?',[['355','ok'],['445','swap'],['365','zero']]],
 ['365 + 271 = ?',[['636','ok'],['5136','write13'],['536','nocarry']]],
 ['425 − 162 = ?',[['263','ok'],['343','swap'],['363','nored']]],
 ['1 hundred is the same as…',[['10 tens','ok'],['10 ones','place'],['100 tens','place']]]];
function why(t){let m='Work column by column from the ones, swapping or breaking blocks when a column needs it.';
 if(t==='write13')m='13 ones cannot sit in one column. 13 ones is 1 ten and 3 ones, so write 3 and carry the 1.';
 if(t==='nocarry')m='The 10 you swapped became 1 in the next column. Add that small carried 1 too.';
 if(t==='onecarry')m='There were two swaps: 15 ones gave a ten, and then 12 tens gave a hundred. Carry both.';
 if(t==='swap')m='You took the small digit from the big one. 2 − 7 will not go, so break a ten to make 12 ones first.';
 if(t==='op')m='That is the sum. The sign is minus, so take away.';
 if(t==='zero')m='After breaking the hundred there were 10 tens, then one ten went to the ones, so 9 tens are left, not 10.';
 if(t==='nored')m='When you break a hundred into tens, the hundreds go down by 1: 4 hundreds become 3.';
 if(t==='place')m='Each column is worth 10 of the one to its right: 1 hundred = 10 tens = 100 ones.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right: column by column, with every swap counted.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{qa.hidden=A.step!==6;keys.hidden=A.step===6;controls()},
 init:A=>{setUp(0);const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Place-value mat controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
