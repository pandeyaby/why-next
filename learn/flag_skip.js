/* Flagship – counting in 2s, 5s and 10s (ages 5–7): count pairs of socks 2, 4, 6 … and see that 6 pairs is 12 socks
   (groups are not the total), hop a frog along a 0–20 track in jumps of 2 so it lands only on even numbers, pay with 5p
   coins counting 5, 10, 15 …, colour the tens on a 100 square and find they make one straight column, then fill gaps in
   counts forwards and backwards. Challenge targets the usual slips: dropping back to ones (15, 16), counting the groups
   instead of the things, and thinking a count in 5s or 10s can end in any digit. */
(()=>{const PAIRS=6,PAY=[30,45],GAPS=[[[2,4,null,8,10],6,[5,6,7]],[[5,10,15,null,25],20,[16,20,30]],[[10,20,30,null,50],40,[31,40,35]],[[20,18,null,14,12],16,[17,16,15]]];
VIS.reg('flagskip',c=>{let A,pad,quiz,qn=-1,run=0;c.fig.classList.add('young');
const G={};
const part=()=>['socks','hops','coins','grid','gaps','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
/* text and boxes drawn in the theme's text colour on pale tints, so contrast holds in light and dark themes */
function txt(g,s,x,y,n,w,al){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function box(g,x,y,w,h,col,a,edge,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,12);g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const say=list=>list.join(', ');
/* ---------- step 0: socks in pairs ---------- */
const pairHome=i=>({x:A.W*(.2+(i%3)*.3),y:A.H*(i<3?.16:.38)});
const pairSlot=i=>({x:A.W*(.09+i*.164),y:A.H*.7});
const SR=()=>Math.min(A.W/12,A.H/8);
/* ---------- step 1: frog track 0–20 in two rows ---------- */
function cell(n){const cw=(A.W-16)/11,row=n<=10?0:1,col=row?n-11:n;return{x:8+col*cw+(row?cw/2:0),y:A.H*(row?.62:.36),w:cw-3,h:Math.min(cw*1.1,A.H*.15)}}
/* ---------- step 3: 100 square ---------- */
function sq(n){const s=Math.min((A.W-16)/10,A.H*.78/10),x0=(A.W-10*s)/2,y0=A.H*.04,i=n-1;return{x:x0+(i%10)*s,y:y0+Math.floor(i/10)*s,w:s-2,h:s-2}}
const purse=()=>({x:A.W*.06,y:A.H*.22,w:A.W*.46,h:A.H*.44}),bank=()=>({x:A.W*.62,y:A.H*.22,w:A.W*.32,h:A.H*.44});
function draw(A){const{ctx:g,W,H,col:C}=A,v=part(),r=SR();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'2, 4, 6, 8, 10',W/2,H*.3,22,800);txt(g,'5, 10, 15, 20, 25',W/2,H*.48,20,800);txt(g,'10, 20, 30, 40, 50',W/2,H*.66,20,800);return}
 if(v==='socks'){for(let i=0;i<PAIRS;i++){if(G.hold&&G.hold.i===i)continue;const n=G.order.indexOf(i),p=n>=0?pairSlot(n):pairHome(i);
   box(g,p.x-r*.9,p.y-r*.85,r*1.8,r*1.7,n>=0?C.gr:C.cy,n>=0?.22:.12,G.oops===i?C.rd:C.tx,G.oops===i?4:2);txt(g,'🧦🧦',p.x,p.y-(n>=0?r*.2:0),20);if(n>=0)txt(g,String(2*(n+1)),p.x,p.y+r*.55,12,800)}
  g.strokeStyle=C.tx;g.setLineDash([6,6]);g.lineWidth=1.5;g.beginPath();g.moveTo(8,H*.56);g.lineTo(W-8,H*.56);g.stroke();g.setLineDash([]);
  if(G.hold)txt(g,'🧦🧦',G.hold.x,G.hold.y,22);
  txt(g,G.order.length?'Socks: '+say(G.order.map((_,k)=>2*(k+1))):'Drag or tap each pair down',W/2,H*.84,13,700);
  txt(g,G.order.length===PAIRS?(G.asked?'How many socks?':'6 pairs! How many socks?'):`Pairs counted: ${G.order.length} of ${PAIRS}`,W/2,H*.93,12,600)}
 if(v==='hops'){for(let n=0;n<=20;n++){const b=cell(n),on=G.path.includes(n);box(g,b.x,b.y,b.w,b.h,on?C.gr:C.or,on?.3:.1,G.oops===n?C.rd:C.tx,G.oops===n?4:1.5);txt(g,String(n),b.x+b.w/2,b.y+b.h/2,11,800)}
  g.strokeStyle=C.gr;g.lineWidth=3;for(let k=1;k<G.path.length;k++){const a=cell(G.path[k-1]),b=cell(G.path[k]);if((G.path[k-1]<=10)!==(G.path[k]<=10))continue;const ax=a.x+a.w/2,bx=b.x+b.w/2;g.beginPath();g.moveTo(ax,a.y);g.quadraticCurveTo((ax+bx)/2,a.y-a.h*.9,bx,b.y);g.stroke()}
  const f=cell(G.frog);txt(g,'🐸',f.x+f.w/2,f.y-f.h*.45,20);
  txt(g,'Landed on: '+say(G.path),W/2,H*.12,12,700);txt(g,`Hops: ${G.path.length-1} of 10`,W/2,H*.88,12,600)}
 if(v==='coins'){const pu=purse(),bk=bank(),want=PAY[Math.min(G.paid,1)];box(g,pu.x,pu.y,pu.w,pu.h,C.vi,.12);box(g,bk.x,bk.y,bk.w,bk.h,C.or,.12);
  txt(g,G.paid<2?`Pay ${want}p with 5p coins`:'Both paid!',W/2,H*.09,15,800);txt(g,'purse',pu.x+pu.w/2,pu.y+pu.h+fz(11),11,600);txt(g,'coins',bk.x+bk.w/2,bk.y+bk.h+fz(11),11,600);
  const cr=Math.min(pu.w/10,pu.h/7);for(let i=0;i<G.coins;i++){const x=pu.x+cr*1.3+(i%5)*cr*2.05,y=pu.y+cr*1.4+Math.floor(i/5)*cr*2.1;A.paint.ball(x,y,cr*.9,C.am);txt(g,'5p',x,y,10,800)}
  for(let i=0;i<4;i++){const x=bk.x+bk.w*(i%2?.7:.3),y=bk.y+bk.h*(i<2?.3:.7);A.paint.ball(x,y,cr*.9,C.am);txt(g,'5p',x,y,10,800)}
  if(G.hold){A.paint.ball(G.hold.x,G.hold.y,cr,C.am);txt(g,'5p',G.hold.x,G.hold.y,10,800)}
  txt(g,G.coins?'In the purse: '+say(Array.from({length:Math.min(G.coins,10)},(_,k)=>5*(k+1)+'p'))+(G.coins>10?' …':''):'Drag a coin into the purse',W/2,H*.8,12,700);txt(g,`Paid: ${G.paid} of 2`,W/2,H*.9,11,600)}
 if(v==='grid'){for(let n=1;n<=100;n++){const b=sq(n),on=G.lit.includes(n);g.fillStyle=A.alpha(on?C.gr:C.cy,on?.45:.08);g.fillRect(b.x,b.y,b.w,b.h);if(G.oops===n){g.strokeStyle=C.rd;g.lineWidth=3;g.strokeRect(b.x,b.y,b.w,b.h)}txt(g,String(n),b.x+b.w/2,b.y+b.h/2,b.w<30?8:9,on?800:600)}
  const last=sq(100);txt(g,G.lit.length<10?`Tap ${10*(G.lit.length+1)}`:'All the tens are in one column!',W/2,last.y+last.h+fz(14),13,800);txt(g,`Tens: ${G.lit.length} of 10`,W/2,last.y+last.h+fz(32),11,600)}
 if(v==='gaps'){const k=Math.min(G.gap,GAPS.length-1),[seq]=GAPS[k],n=seq.length,w=Math.min((W-20)/n-8,90);
  txt(g,G.gap<GAPS.length?(seq[0]>seq[1]?'Counting back. What is missing?':'What number is missing?'):'All 4 gaps filled!',W/2,H*.12,14,800);
  seq.forEach((s,i)=>{const x=10+i*((W-20)/n)+((W-20)/n-w)/2;box(g,x,H*.25,w,H*.2,s==null?C.pk:C.cy,s==null?.2:.12,s==null&&G.oops?C.rd:C.tx,s==null&&G.oops?4:2);txt(g,s==null?'?':String(s),x+w/2,H*.35,18,800)});
  if(G.gap<GAPS.length)GAPS[k][2].forEach((o,i)=>{const b=gapBtn(i);box(g,b.x,b.y,b.w,b.h,C.or,.16,G.oops===o?C.rd:C.tx,G.oops===o?4:2);txt(g,String(o),b.x+b.w/2,b.y+b.h/2,20,800)});
  txt(g,`Filled: ${G.gap} of ${GAPS.length}`,W/2,H*.93,11,600)}
 A.fx.draw(g)}
const gapBtn=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.58,w,h:A.H*.22}};
const no=(t,mark)=>{G.oops=mark;A.sound.miss();speak(t);A.redraw()},yes=t=>{G.oops=null;A.sound.pop();speak(t);buttons();A.redraw();G.want()};
/* step 0: moving a pair into the counted row says the next number in 2s */
function countPair(i){G.hold=null;if(G.order.includes(i)){return no('That pair is counted already. Count each pair once.',i)}
 G.order.push(i);G.oops=null;A.sound.tick();const n=2*G.order.length;speak(n+(G.order.length===PAIRS?'. Six pairs. How many socks?':'…'));buttons();A.redraw()}
function howMany(k){if(G.order.length<PAIRS)return speak('Count all the pairs first.');G.asked=1;
 if(k===6)return no('6 is how many pairs. Each pair has 2 socks, so we counted 2, 4, 6, 8, 10, 12. The last number is 12 socks.',null);
 if(k===7)return no('Count in 2s again: 2, 4, 6, 8, 10, 12. Each pair adds 2, not 1.',null);
 G.done=1;yes('Yes! 12 socks. Counting in 2s: 2, 4, 6, 8, 10, 12.')}
/* step 1: the frog may only hop 2 */
function hop(n){if(G.frog>=20)return;const d=n-G.frog;
 if(d!==2)return no(d===1?`${n} is a hop of 1. In 2s the frog jumps over ${G.frog+1} and lands on ${G.frog+2}.`:d===3?`${n} is a hop of 3. Hop 2: from ${G.frog} to ${G.frog+2}.`:`Hop forward 2, from ${G.frog} to ${G.frog+2}.`,n);
 G.frog=n;G.path.push(n);G.oops=null;A.sound.tick();if(n<20){speak(say(G.path.slice(1))+'…');buttons();return A.redraw()}
 yes('2, 4, 6, 8, 10, 12, 14, 16, 18, 20. The frog never landed on an odd number.')}
/* step 2: coins */
function addCoin(){G.hold=null;if(G.paid>=2||G.coins>=12)return A.redraw();G.coins++;G.oops=null;A.sound.tick();speak(5*G.coins+'p');buttons();A.redraw()}
function takeCoin(){if(G.coins<1)return;G.coins--;speak('One coin out. Now '+5*G.coins+'p.');buttons();A.redraw()}
function pay(){const want=PAY[G.paid];if(want==null)return;const have=5*G.coins;
 if(have!==want)return no(have>want?`That is ${have}p, too much. Count 5, 10, 15 … and stop at ${want}.`:`That is ${have}p. Keep counting in 5s until you say ${want}.`,null);
 G.paid++;G.coins=0;yes(`${want}p! ${say(Array.from({length:want/5},(_,k)=>5*(k+1)))}.`)}
/* step 3: tens on the 100 square */
function lite(n){if(G.lit.length>=10)return;const want=10*(G.lit.length+1);
 if(n!==want)return no(n%10===0?`Go in order: next is ${want}.`:`${n} is not a ten. Counting in 10s goes ${want-10||''}${want>10?', ':''}${want}. Tens end in 0.`,n);
 G.lit.push(n);G.oops=null;A.sound.tick();if(G.lit.length<10){speak(say(G.lit)+'…');buttons();return A.redraw()}yes('10, 20, 30 … 100. They make one straight line, and every ten ends in 0.')}
/* step 4: gaps */
function fill(o){const k=G.gap;if(k>=GAPS.length)return;const[seq,ans]=GAPS[k],step=seq[1]-seq[0];
 if(o!==ans)return no(Math.abs(o-seq[1])%Math.abs(step)&&Math.abs(o-ans)===1?`${o} goes up or down by 1. This count jumps by ${Math.abs(step)} each time.`:`Look at the jump: ${seq[0]} to ${seq[1]} is ${step>0?'+':'−'}${Math.abs(step)}. Keep the same jump.`,o);
 G.gap++;G.oops=null;yes(`Yes, ${ans}. The jump stays ${Math.abs(step)} every time.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='socks'){if(G.order.length<PAIRS){const i=[...Array(PAIRS).keys()].find(j=>!G.order.includes(j));B('🧦 Count a pair',()=>countPair(i),'Move the next pair of socks down and count it')}else if(!G.done)[6,12,7].forEach(k=>B(String(k),()=>howMany(k),k+' socks'))}
 if(v==='hops'&&G.frog<20)[1,2,3].map(d=>G.frog+d).filter(n=>n<=20).forEach(n=>B('🐸 '+n,()=>hop(n),'Hop to '+n));
 if(v==='coins'&&G.paid<2){B('➕ Add 5p',addCoin,'Put a 5p coin in the purse');B('↩ Take one out',takeCoin,'Take a coin out of the purse');B('✔ Pay',pay,'Pay with the coins in the purse')}
 if(v==='grid'&&G.lit.length<10){const w=10*(G.lit.length+1);[w-1,w,w+1].map((n,i,a)=>a[(i+G.lit.length)%3]).forEach(n=>B(String(n),()=>lite(n),'Colour '+n))}
 if(v==='gaps'&&G.gap<GAPS.length)GAPS[G.gap][2].forEach(o=>B(String(o),()=>fill(o),'The missing number is '+o))}
function down(p){const v=part(),r=SR();
 if(v==='socks'){if(G.order.length<PAIRS){const i=[...Array(PAIRS).keys()].find(j=>!G.order.includes(j)&&Math.hypot(p.x-pairHome(j).x,p.y-pairHome(j).y)<r*1.2);if(i!=null){G.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
   const j=G.order.findIndex((_,n)=>Math.hypot(p.x-pairSlot(n).x,p.y-pairSlot(n).y)<r);if(j>=0)countPair(G.order[j])}return false}
 if(v==='hops'){for(let n=0;n<=20;n++)if(inside(p,cell(n))){hop(n);break}return false}
 if(v==='coins'){if(inside(p,bank())&&G.paid<2){G.hold={x:p.x,y:p.y};return true}if(inside(p,purse()))takeCoin();return false}
 if(v==='grid'){for(let n=1;n<=100;n++)if(inside(p,sq(n))){lite(n);break}return false}
 if(v==='gaps'&&G.gap<GAPS.length){GAPS[G.gap][2].forEach((o,i)=>{if(inside(p,gapBtn(i)))fill(o)})}return false}
function move(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function up(p){const v=part(),h=G.hold;if(!h)return;
 if(v==='socks'){const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<12;return tap||p.y>A.H*.54?countPair(h.i):(G.hold=null,A.redraw())}
 if(v==='coins')return inside(p,purse())?addCoin():(G.hold=null,A.redraw())}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++G.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===G.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const clean=()=>{const t=(G.tok||0)+1;Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,{tok:t,want:()=>{},order:[],hold:null,oops:null,asked:0,done:0,frog:0,path:[0],coins:0,paid:0,lit:[],gap:0})};
const steps=[
{h:'Socks in pairs',p:'Socks come in pairs. Move each pair down and count in 2s: 2, 4, 6 …',task:'Count the socks in 2s, then say how many',
 show:()=>{steps[0].go();seq([0,1,2,3,4,5].map(i=>()=>countPair(i)).concat([()=>howMany(12)]),180)},
 go:()=>{clean();speak('Move a pair of socks down. Say 2.');buttons();G.want=ok(0,()=>G.done,'6 pairs is 12 socks. The last number in the count is how many socks.')}},
{h:'Hop in 2s',p:'The frog jumps 2 each time. Tap where it lands next.',predict:{q:'The frog starts at 0 and hops 2 each time. Will it land on 7?',opts:['Yes','No'],ans:1},task:'Hop all the way to 20',
 show:()=>{steps[1].go();seq([2,4,6,8,10,12,14,16,18,20].map(n=>()=>hop(n)),220)},
 go:()=>{clean();speak('The frog is on 0. Where does it land after a hop of 2?');buttons();G.want=ok(1,()=>G.frog>=20,'Counting in 2s from 0 lands on 2, 4, 6, 8 … the even numbers.')}},
{h:'Count in 5s',p:'Each coin is 5p. Put coins in the purse and count in 5s: 5, 10, 15 …',predict:{q:'Count 5, 10, 15. What comes next?',opts:['16','20'],ans:1},task:'Pay 30p, then 45p',
 show:()=>{steps[2].go();const a=()=>addCoin();seq([a,a,a,a,a,a,pay,a,a,a,a,a,a,a,a,a,pay],150)},
 go:()=>{clean();speak('Pay 30p. Count in 5s as you drop each coin in.');buttons();G.want=ok(2,()=>G.paid>=2,'Counting in 5s: 5, 10, 15, 20 … Every number ends in 5 or 0.')}},
{h:'Tens on the 100 square',p:'Count in 10s: 10, 20, 30 … Tap each ten on the 100 square.',predict:{q:'Where will 10, 20, 30 … 100 be on the square?',opts:['All over the place','In one straight line'],ans:1},task:'Colour all the tens up to 100',
 show:()=>{steps[3].go();seq([10,20,30,40,50,60,70,80,90,100].map(n=>()=>lite(n)),200)},
 go:()=>{clean();speak('Tap 10 on the 100 square.');buttons();G.want=ok(3,()=>G.lit.length>=10,'The tens line up at the end of each row, and they all end in 0.')}},
{h:'Fill the gap',p:'Find the jump, then keep the same jump to fill the gap. One count goes back.',task:'Fill 4 gaps',
 show:()=>{steps[4].go();seq(GAPS.map(gp=>()=>fill(gp[1])),400)},
 go:()=>{clean();speak('2, 4, something, 8, 10. What is missing?');buttons();G.want=ok(4,()=>G.gap>=GAPS.length,'Same jump each time: that is how you count in 2s, 5s and 10s.')}},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['Count in 5s: 5, 10, 15, … What comes next?',[['20','ok'],['16','ones'],['25','skip']]],
 ['There are 4 pairs of shoes. How many shoes?',[['8','ok'],['4','groups'],['6','add2']]],
 ['Count in 2s: 2, 4, 6, 8, 10, … What comes next?',[['12','ok'],['11','ones'],['20','tens']]],
 ['Which number is in the count of 10s?',[['70','ok'],['75','fives'],['17','swap']]],
 ['Which number is in the count of 5s?',[['35','ok'],['32','end'],['13','ones']]],
 ['Count back in 10s: 50, 40, 30, … What comes next?',[['20','ok'],['29','back1'],['40','up']]]];
function why(t){let m='Keep the same jump every time.';
 if(t==='ones')m='That goes up by 1. Counting in 5s or 2s jumps the same amount each time.';
 if(t==='skip')m='That jumps two 5s. After 15 comes 20, then 25.';
 if(t==='groups')m='4 is how many pairs. Each pair has 2 shoes: 2, 4, 6, 8. So 8 shoes.';
 if(t==='add2')m='Count in 2s for each pair: 2, 4, 6, 8. Four pairs make 8, not 6.';
 if(t==='tens')m='That is a jump of 10. In 2s, 10 is followed by 12.';
 if(t==='fives')m='75 ends in 5, so it is in the 5s count but not the 10s. Tens end in 0.';
 if(t==='swap')m='17 is not a ten. Seventy is 70: 7 tens. The tens all end in 0.';
 if(t==='end')m='Numbers in the 5s count end in 5 or 0. 32 ends in 2.';
 if(t==='back1')m='29 goes back by 1. Counting back in 10s: 50, 40, 30, 20.';
 if(t==='up')m='The count is going back, so the numbers get smaller. After 30 comes 20.';
 return m}
function nextQ(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
