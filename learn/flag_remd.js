/* Flagship: Division with remainders in context (ages 9-10; CCSS 4.OA.A.3 "solve multistep word problems ... including
   problems in which remainders must be interpreted; represent these problems using equations with a letter standing for
   the unknown; assess the reasonableness of answers using mental computation and estimation"; NC Y6 "interpret
   remainders as whole number remainders, fractions, or by rounding, as appropriate for the context").
   Same sum, four answers: seat 52 children in minibuses of 9 (round up), pack 52 eggs in boxes of 6 (round down), deal 52
   stickers to 9 children (the remainder is the answer), cut leftover pizzas into fair pieces (a fraction), then a
   two-step pens problem with a letter, a bar model and an estimate. Not lesson 27 (long division method) or flagunkf. */
(()=>{
VIS.reg('flagremd',c=>{let K,row,box,qi=-1,gen=0;const D={};
const INK='#0f172a',BLUE='#1e3a8a',GRN='#047857',RED='#be123c',PAPER='#fffbeb';
const kind=()=>['bus','egg','deal','pizza','pens','chal'][K.step];
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),hit=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function voice(t){c.say(t);K.cv.setAttribute('aria-label',t)}
function note(t,x,y,o){o=o||{};const g=K.ctx;let fs=o.f||(K.narrow?13:16);g.font=`700 ${fs}px system-ui`;while(fs>10&&g.measureText(t).width>(o.w||K.W)-16){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+18),h=o.h||fs*1.9,x0=cl(x-w/2,3,K.W-w-3);g.fillStyle=o.bg||PAPER;K.paint.rrect(x0,y-h/2,w,h,8);g.fill();g.lineWidth=o.edge?2.5:1.2;g.strokeStyle=o.edge||'#78716c';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1);return{x:x0,y:y-h/2,w,h}}
const dot=(x,y,r,col)=>{const g=K.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1;g.stroke()};
/* a grid of n dots inside a rectangle */
function crowd(n,r,col){const cols=Math.max(1,Math.floor(r.w/14)),s=Math.min(14,r.w/cols);for(let i=0;i<n;i++)dot(r.x+s*(i%cols+.5),r.y+s*(Math.floor(i/cols)+.5),s*.38,col)}
/* ---- 1: minibuses, round up ---- */
const busRect=i=>{const n=7,gap=K.W*.012,w=(K.W*.96-gap*(n-1))/n;return{x:K.W*.02+i*(w+gap),y:K.H*.6,w,h:K.H*.2}};
function drawBus(){const g=K.ctx,seated=Math.min(52,D.bus*9),wait=52-seated;note('52 children. A minibus holds 9.',K.W/2,K.H*.07,{edge:BLUE});
 note(`Waiting: ${wait}`,K.W/2,K.H*.17,{f:K.narrow?12:14});crowd(wait,{x:K.W*.1,y:K.H*.23,w:K.W*.8,h:K.H*.3},'#f59e0b');
 for(let i=0;i<7;i++){const r=busRect(i);if(i<D.bus){const on=Math.min(9,52-i*9);g.fillStyle=on<9?'#fde68a':'#fcd34d';K.paint.rrect(r.x,r.y,r.w,r.h,6);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
   for(let s=0;s<9;s++){const cx=r.x+r.w*(.2+.3*(s%3)),cy=r.y+r.h*(.2+.3*Math.floor(s/3));dot(cx,cy,Math.min(r.w,r.h)*.09,s<on?'#f59e0b':'#ffffff')}}
  else{g.setLineDash([5,4]);g.strokeStyle=K.alpha(K.col.tx,.6);g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([])}}
 note(wait?`${D.bus} bus${D.bus===1?'':'es'}. Tap the road to add a bus.`:`${D.bus} buses: 52 ÷ 9 = 5 r 7, so round up to 6`,K.W/2,K.H*.9,{edge:wait?BLUE:GRN})}
function addBus(d){const n=cl(D.bus+d,0,7);if(n===D.bus)return speak(d>0?'That is enough buses for now.':'No buses to take away.');
 if(d>0&&D.bus*9>=52){K.sound.miss();return speak('Everyone already has a seat. An empty bus is not needed.')}D.bus=n;K.sound.tick();const left=Math.max(0,52-n*9);
 if(n===5)return speak('5 full buses carry 45. 7 children are still waiting. 52 ÷ 9 = 5 r 7. Can they stay behind?');
 speak(left?`${n} bus${n===1?'':'es'}, ${n*9} seated, ${left} waiting.`:'6 buses. The 7 left over still need a seat, so the remainder makes us round up: 6 minibuses.')}
/* ---- 2: egg boxes, round down ---- */
const eggRect=i=>{const w=K.W*.17,h=K.H*.15,gx=(K.W-5*w)/6;return{x:gx+(i%5)*(w+gx),y:K.H*.36+Math.floor(i/5)*(h+K.H*.05),w,h}};
function drawEgg(){const g=K.ctx,left=52-D.packed*6;note('52 eggs. A box holds 6.',K.W/2,K.H*.07,{edge:BLUE});note(`Eggs not packed: ${left}`,K.W/2,K.H*.18,{f:K.narrow?12:14,edge:left<6?RED:null});
 for(let i=0;i<10;i++){const r=eggRect(i),full=i<D.packed;g.fillStyle=full?'#d6d3d1':K.alpha(K.col.tx,.08);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=K.alpha(K.col.tx,.7);g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);
  for(let s=0;s<6;s++){const cx=r.x+r.w*(.2+.3*(s%3)),cy=r.y+r.h*(.3+.4*Math.floor(s/3));g.fillStyle=full?'#fef3c7':'transparent';g.beginPath();g.ellipse(cx,cy,r.w*.11,r.h*.16,0,0,7);g.fill();if(full){g.strokeStyle=INK;g.lineWidth=1;g.stroke()}}}
 note(D.sold?`Sold ${D.sold} full boxes. ${left} eggs left, not enough for a box.`:'Tap an empty box to pack it',K.W/2,K.H*.9,{edge:D.sold?GRN:BLUE})}
function pack(){if(D.sold)return speak('The boxes are sold.');const left=52-D.packed*6;if(left<6){K.sound.miss();return speak(`Only ${left} eggs are left. A box needs 6, so it cannot be full. Sell the full boxes.`)}
 D.packed++;K.sound.tick();speak(`${D.packed} box${D.packed>1?'es':''} packed, ${left-6} eggs left.`)}
function sell(){if(D.sold)return;const left=52-D.packed*6;if(left>=6){K.sound.miss();return speak(`${left} eggs are still loose. That is enough for another full box.`)}
 D.sold=D.packed;K.sound.pop();speak('52 ÷ 6 = 8 r 4. Only full boxes can be sold, so round down: 8 boxes. The 4 eggs stay in the fridge.')}
/* ---- 3: dealing stickers, the remainder is the answer ---- */
const pileR=()=>({x:K.W*.06,y:K.H*.2,w:K.W*.4,h:K.H*.28}),teachR=()=>({x:K.W*.6,y:K.H*.2,w:K.W*.34,h:K.H*.28});
function drawDeal(){const g=K.ctx,pile=52-D.rounds*9-D.toTeach,P=pileR(),T=teachR();note('52 stickers shared equally by 9 children',K.W/2,K.H*.07,{edge:BLUE});
 g.strokeStyle=K.alpha(K.col.tx,.6);g.lineWidth=2;g.setLineDash([5,4]);g.strokeRect(P.x,P.y,P.w,P.h);g.strokeRect(T.x,T.y,T.w,T.h);g.setLineDash([]);crowd(pile,{x:P.x+4,y:P.y+4,w:P.w-8,h:P.h-8},'#a855f7');
 g.fillStyle=K.col.tx;g.font=`700 ${K.narrow?12:14}px system-ui`;g.textAlign='center';g.fillText(`Pile: ${pile}`,P.x+P.w/2,P.y+P.h+16);g.fillText(`Teacher: ${D.toTeach}`,T.x+T.w/2,T.y+T.h+16);crowd(D.toTeach,{x:T.x+4,y:T.y+4,w:T.w-8,h:T.h-8},'#a855f7');
 const cw=K.W/9;for(let i=0;i<9;i++){const x=cw*(i+.5),y=K.H*.68;dot(x,y,Math.min(cw*.3,16),'#38bdf8');g.fillStyle=K.col.tx;g.font=`700 ${K.narrow?11:13}px system-ui`;g.fillText(String(D.rounds),x,y+28)}
 note(D.toTeach?'Each child 5, teacher 7: the remainder is the answer':'Tap the pile to give everyone one more',K.W/2,K.H*.9,{edge:D.toTeach?GRN:BLUE})}
function deal(){if(D.toTeach)return speak('All shared out.');const pile=52-D.rounds*9;if(pile<9){K.sound.miss();return speak(`Only ${pile} left: not enough for one more each. Give the leftovers to the teacher.`)}
 D.rounds++;K.sound.tick();speak(`Each child has ${D.rounds}. ${pile-9} left in the pile.`)}
function teacher(){if(D.toTeach)return;const pile=52-D.rounds*9;if(pile>=9){K.sound.miss();return speak(`${pile} are left. That is enough to give all 9 children another one first.`)}
 D.toTeach=pile;K.sound.pop();speak('52 ÷ 9 = 5 r 7. Each child gets 5, and the question asks about the leftovers, so the answer is the remainder: the teacher gets 7.')}
/* ---- 4: pizzas, the remainder becomes a fraction ---- */
const PZ=[[7,2],[11,4]];
const slicePizza=i=>{const n=PZ[D.pz][0]%PZ[D.pz][1],w=K.W/(n+1);return{x:w*(i+1)-K.H*.13,y:K.H*.42,w:K.H*.26,h:K.H*.26}};
function drawPizza(){const g=K.ctx;if(D.pz>1)return note('Both shares are fair: 3½ and 2¾ each',K.W/2,K.H*.5,{edge:GRN});const [pz,ppl]=PZ[D.pz],each=Math.floor(pz/ppl),left=pz%ppl;
 note(`${pz} pizzas shared fairly by ${ppl} friends`,K.W/2,K.H*.07,{edge:BLUE});note(`${pz} ÷ ${ppl} = ${each} r ${left}: ${each} whole each, ${left} left over`,K.W/2,K.H*.18,{f:K.narrow?12:14});
 for(let i=0;i<left;i++){const r=slicePizza(i),cx=r.x+r.w/2,cy=r.y+r.h/2,R=r.w/2;g.fillStyle='#fbbf24';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.strokeStyle='#92400e';g.lineWidth=3;g.stroke();
  g.strokeStyle=INK;g.lineWidth=2.5;for(let k=0;k<D.cuts;k++){const a=k*2*Math.PI/D.cuts-Math.PI/2;if(D.cuts>1){g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));g.stroke()}}}
 note(`Each leftover pizza: ${D.cuts} piece${D.cuts>1?'s':''}. Tap a pizza to cut more.`,K.W/2,K.H*.82,{f:K.narrow?12:14,edge:BLUE})}
function cut(d){if(D.pz>1)return;D.cuts=cl(D.cuts+d,1,6);K.sound.tick();speak(`Each leftover pizza is in ${D.cuts} piece${D.cuts>1?'s':''}.`)}
function share(){if(D.pz>1)return;const [pz,ppl]=PZ[D.pz],each=Math.floor(pz/ppl),left=pz%ppl;
 if(D.cuts!==ppl){K.sound.miss();return speak(D.cuts<ppl?`${D.cuts} piece${D.cuts>1?'s':''} per pizza will not go round ${ppl} friends fairly. Cut each leftover into one piece per friend.`:`${D.cuts} pieces per pizza do not share equally between ${ppl} friends. Make one piece per friend.`)}
 K.sound.pop();const frac=D.pz?'¾':'½';D.pz++;D.cuts=1;speak(`Fair: ${each} whole and ${left} piece${left>1?'s':''} of 1/${ppl} each, so ${each}${frac} each.`+(D.pz>1?' The remainder became a fraction.':' Now try 11 pizzas and 4 friends.'))}
/* ---- 5: two steps, a letter and an estimate ---- */
const STAGES=[['First: how many pens in all?',['7 × 25','25 ÷ 7','7 + 25'],'You have 7 boxes with 25 in each. Groups of the same size: multiply.'],
 ['Next: share 175 pens between 8 classes. p = ?',['175 ÷ 8','175 × 8','175 − 8'],'Sharing equally between 8 is dividing by 8.'],
 ['175 ÷ 8 = 21 r 7. What does each class get?',['21 each, 7 spare','22 each','21.7 each'],'']];
const cardR=i=>{const w=K.W*.29,gap=(K.W-3*w)/4;return{x:gap+i*(w+gap),y:K.H*.62,w,h:K.H*.13}};
function drawPens(){const g=K.ctx,S=STAGES[D.st];note('7 boxes of 25 pens, shared equally between 8 classes',K.W/2,K.H*.07,{w:K.W*.96,edge:BLUE});
 if(D.st>=1){const x=K.W*.05,w=K.W*.9,y=K.H*.2,h=K.H*.1,part=w*21/175*1;g.lineWidth=1.5;for(let i=0;i<8;i++){g.fillStyle=i%2?'#bfdbfe':'#93c5fd';g.fillRect(x+i*part,y,part,h);g.strokeStyle=INK;g.strokeRect(x+i*part,y,part,h)}
  g.fillStyle=D.st>2?'#fca5a5':'#e5e7eb';g.fillRect(x+8*part,y,w-8*part,h);g.strokeRect(x+8*part,y,w-8*part,h);g.fillStyle=INK;g.font=`700 ${K.narrow?11:13}px system-ui`;g.textAlign='center';g.textBaseline='middle';
  if(D.st>2){for(let i=0;i<8;i++)g.fillText('21',x+(i+.5)*part,y+h/2);g.fillText('7',x+8*part+(w-8*part)/2,y+h/2)}g.fillStyle=K.col.tx;g.fillText('175 pens',K.W/2,y+h+14)}
 if(D.st>=2)note('p = 175 ÷ 8. Estimate: 160 ÷ 8 = 20, so p is about 20',K.W/2,K.H*.45,{f:K.narrow?11:14});
 if(!S)return note('21 each, 7 spare. Close to 20: it makes sense.',K.W/2,K.H*.88,{edge:GRN});note(S[0],K.W/2,K.H*.54,{edge:BLUE,f:K.narrow?12:15});
 S[1].forEach((t,i)=>{const r=cardR(i);note(t,r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,f:K.narrow?12:15,edge:D.miss===i?RED:'#475569',bg:'#eef2ff'})})}
function choose(i){const S=STAGES[D.st];if(!S)return speak('All three steps are done.');if(i){D.miss=i;K.sound.miss();
  const why=D.st<2?S[2]:i===1?'22 each needs 176 pens, and there are only 175. The 7 spare cannot make another full share.':'The remainder 7 is 7 pens, not 7 tenths. Write 21 r 7: 21 each and 7 spare.';return speak(why)}
 D.miss=null;D.st++;K.sound.pop();speak(['7 × 25 = 175 pens in all.','p = 175 ÷ 8. Estimate first: 175 is close to 160, and 160 ÷ 8 = 20.','Each class gets 21 pens and 7 are spare. 21 is close to the estimate of 20, so the answer is reasonable.'][D.st-1])}
function draw(){const g=K.ctx;g.fillStyle=K.mix(K.col.pn,'#e0e7ff',K.col.dark?.05:.3);g.fillRect(0,0,K.W,K.H);const k=kind();
 if(k==='chal'){note('Challenge',K.W/2,K.H*.14,{edge:BLUE});note('Same sum, different answers: read the question',K.W/2,K.H*.5,{f:K.narrow?13:17});return}
 ({bus:drawBus,egg:drawEgg,deal:drawDeal,pizza:drawPizza,pens:drawPens})[k]()}
function wipe(){gen++;for(const k in D)delete D[k];Object.assign(D,{bus:0,packed:0,sold:0,rounds:0,toTeach:0,pz:0,cuts:1,st:0,miss:null,check:()=>{}})}
function speak(t){voice(t);K.redraw();keys();D.check()}
const finishIf=(i,test,msg)=>()=>{if(K.step===i&&test()&&(!steps[i].predict||K.pred[i]!=null)&&!K.isDone)K.done(msg+K.reveal(i))};
function open(i,intro,test,msg){wipe();voice(intro);keys();D.check=finishIf(i,test,msg)}
function demo(i,acts,ms){steps[i].go();const v=gen;acts.forEach((f,j)=>setTimeout(()=>{if(v===gen)f()},K.reduced()?25*(j+1):(ms||450)*(j+1)))}
function keys(){if(!row)return;row.innerHTML='';const k=kind(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='bus'){B('Add a bus',()=>addBus(1),'Add a minibus');B('Take a bus away',()=>addBus(-1),'Take a minibus away')}
 if(k==='egg'){B('Pack a box',pack,'Pack 6 eggs into a box');B('Sell the full boxes',sell)}
 if(k==='deal'){B('Give one each',deal,'Give each child one more sticker');B('Leftovers to teacher',teacher,'Give the leftover stickers to the teacher')}
 if(k==='pizza'&&D.pz<2){B('More pieces',()=>cut(1),'Cut each leftover pizza into one more piece');B('Fewer pieces',()=>cut(-1),'Use one piece fewer');B('Share the pieces',share,'Share the leftover pieces')}
 if(k==='pens'&&STAGES[D.st])STAGES[D.st][1].forEach((t,i)=>B(t,()=>choose(i),'Choose '+t))}
function down(p){const k=kind();
 if(k==='bus'&&p.y>K.H*.55&&p.y<K.H*.84)addBus(1);
 if(k==='egg'){if([...Array(10).keys()].some(i=>hit(p,eggRect(i))))pack()}
 if(k==='deal'){if(hit(p,pileR()))deal();else if(hit(p,teachR()))teacher()}
 if(k==='pizza'&&D.pz<2){const n=PZ[D.pz][0]%PZ[D.pz][1];for(let i=0;i<n;i++)if(hit(p,slicePizza(i))){cut(D.cuts>=6?-5:1);break}}
 if(k==='pens'){const i=[0,1,2].findIndex(j=>hit(p,cardR(j)));if(i>=0)choose(i)}return false}
const steps=[
{h:'Minibuses',p:'52 children go on a trip. Each minibus holds 9. Tap the road, or press Add a bus, until every child has a seat.',
 predict:{q:'52 ÷ 9 = 5 r 7. How many minibuses are needed?',opts:['5, leave the 7 out','6, the 7 still need seats','5 r 7 minibuses'],ans:1},task:'Give every child a seat',
 show:()=>demo(0,[1,1,1,1,1,1].map(()=>()=>addBus(1)),350),
 go:()=>open(0,'52 children waiting and an empty road for minibuses that hold 9.',()=>D.bus===6,'Nobody can be left behind, so round up.')},
{h:'Egg boxes',p:'52 eggs, and a box holds 6. Pack full boxes by tapping them. When no box can be filled, sell the full ones.',
 predict:{q:'How many full boxes of 6 can be sold from 52 eggs?',opts:['9, round up','8, the 4 left cannot fill a box','8 r 4 boxes'],ans:1},task:'Sell every full box',
 show:()=>demo(1,[...Array(8)].map(()=>pack).concat([pack,sell]),260),
 go:()=>open(1,'52 loose eggs and ten empty egg boxes.',()=>D.sold===8,'Only full boxes count, so round down.')},
{h:'Leftovers',p:'Share 52 stickers equally between 9 children. Tap the pile to give everyone one more. Leftovers go to the teacher.',
 predict:{q:'How many stickers does the teacher get?',opts:['5, the answer to 52 ÷ 9','7, the remainder','none, share them all'],ans:1},task:'Share fairly, then give the teacher the rest',
 show:()=>demo(2,[...Array(5)].map(()=>deal).concat([teacher]),300),
 go:()=>open(2,'A pile of 52 stickers, 9 children and a teacher.',()=>D.toTeach===7,'When the question asks what is left, the remainder is the answer.')},
{h:'Cut the leftovers',p:'Pizzas can be cut. Cut each leftover pizza into pieces, then share them. Every friend must get the same.',task:'Share both lots of pizza fairly',
 show:()=>demo(3,[()=>cut(1),share,()=>cut(1),()=>cut(1),()=>cut(1),share],420),
 go:()=>open(3,'7 pizzas for 2 friends: 3 whole each and 1 left over.',()=>D.pz>1,'If the leftover can be cut, the remainder becomes a fraction.')},
{h:'Two steps',p:'A school buys 7 boxes of 25 pens and shares them equally between 8 classes. Pick each step.',task:'Finish all three steps',
 show:()=>demo(4,[()=>choose(0),()=>choose(0),()=>choose(0)],600),
 go:()=>open(4,'The pens problem with three choice cards.',()=>D.st>2,'Work out the steps, use a letter for the unknown, and check with an estimate.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.check()});
const QS=[
 {q:'A minibus holds 9. How many minibuses for 40 children?',ans:'5',bad:[['4','down'],['4 r 4','rem']]},
 {q:'Eggs go in boxes of 6. How many full boxes from 45 eggs?',ans:'7',bad:[['8','up'],['7.3','dec']]},
 {q:'50 stickers are shared equally by 8 children. How many are left over?',ans:'2',bad:[['6','quot'],['42','op']]},
 {q:'9 pizzas are shared fairly by 2 friends. How much does each get?',ans:'4½',bad:[['4 r 1','frac'],['5','up']]},
 {q:'7 boxes of 24 pens are shared equally between 8 classes. How many pens does each class get?',ans:'21',bad:[['168','one'],['3','op']]},
 {q:'Tom says 52 ÷ 9 = 5.7. What went wrong?',ans:'He wrote the remainder 7 as tenths',bad:[['Nothing, 5.7 is right','tenth'],['He should round to 6','ctx']]}];
function slip(t){let m='Work out the division, then ask what the remainder means here.';
 if(t==='down')m='40 ÷ 9 = 4 r 4. The 4 children left still need a seat, so round up to 5.';
 if(t==='rem')m='You cannot order 4 r 4 buses. Decide what the remainder means: extra children need one more bus.';
 if(t==='up')m='Only full boxes or whole shares count here, so the remainder is left out. Round down.';
 if(t==='dec')m='A remainder is not a decimal. 7 r 3 means 3 whole eggs left over, not 3 tenths.';
 if(t==='tenth')m='5 r 7 means 7 left over. 5.7 means 7 tenths, and 7 out of 9 is not 7 tenths.';
 if(t==='ctx')m='There is nothing to seat or pack here, so no rounding. The slip is writing r 7 as .7.';
 if(t==='quot')m='6 is how many each child gets. The question asks for the leftovers: the remainder, 2.';
 if(t==='op')m='Check the operation. Sharing equally is dividing. Find the total first if there are groups.';
 if(t==='frac')m='Pizza can be cut. Share the leftover one in halves: 4 and a half each.';
 if(t==='one')m='168 is the total pens: step one only. Now share them: 168 ÷ 8 = 21.';
 return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pick=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pick,v).onclick=()=>score(t,Q.ans)});voice('Challenge: '+Q.q);K.redraw()}
function score(t,ans){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)K.win();else K.sound.miss();voice(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:Q=>{box.hidden=Q.step!==5;row.hidden=Q.step===5;keys()},
 init:Q=>{K=Q;const w=c.el('div',{class:'fl-below'},Q.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Remainder controls'},w);box=c.el('div',{class:'fl-chal'},Q.below);wipe();const A=K;A.gest({down});keys()}}).start()})})();
