/* Flagship: adding three small numbers (ages 6–7; CCSS 1.OA.B.3 and 1.OA.A.2, NC England Y2 add three one-digit numbers).
   Join number cards in any order and see the total stay the same, hunt for the pair that makes 10, then add the rest,
   use a double when there is no ten, and check three children's answers for the slips. Drag a card onto another, tap two cards, or use the buttons. */
(()=>{
const P={ink:'#111827',mute:'#374151',bg:'#fefcf7',edge:'#1f2937',hi:'#1d4ed8',hiBg:'#dbeafe',good:'#166534',goodBg:'#dcfce7',warn:'#9f1239',tipBg:'#fff7ed',slot:'#e5e7eb'};
const DOT=['#b91c1c','#1d4ed8','#047857'];
const ANY=[5,7,3];
const TENS=[[4,6,8],[2,9,8],[7,5,3]];
const REST=[[6,4,7,[17,107,16]],[3,8,7,[18,108,17]],[9,5,1,[15,105,14]]];
const DUBS=[[6,6,3],[4,5,4],[7,2,7]];
const KIDS=[[[6,4,5],[['Ali',10,'Ali added 6 + 4 = 10 and forgot the 5.'],['Bea',15,''],['Cal',14,'Cal counted on from 10 but said 10 as the first count: 10, 11, 12, 13, 14. Start counting at 11.']]],
 [[8,2,3],[['Dev',11,'Dev added 8 + 3 and forgot the 2.'],['Eli',12,'Eli counted the 10 again when counting on. 10 and 3 more is 13.'],['Fay',13,'']]],
 [[9,1,6],[['Gus',16,''],['Hana',10,'Hana added 9 + 1 = 10 and forgot the 6.'],['Ivy',106,'Ivy wrote 10 and then 6. Ten and six is sixteen: 16.']]]];
const Q=[['3 + 8 + 7. Which two make 10?','3 and 7',[['3 and 8','pair'],['8 and 7','pair2']]],
 ['10 + 6 = ?','16',[['106','write'],['7','ten1']]],
 ['2 + 5 + 8. What is the total?','15',[['7','forgot'],['14','countstart']]],
 ['Does 4 + 9 + 6 give the same total as 6 + 4 + 9?','Yes, always',[['No, order changes it','order'],['Only if 9 is first','order']]],
 ['5 + 4 + 5. Which pair is a double?','5 and 5',[['5 and 4','notdub'],['There is no double','apart']]],
 ['6 + 1 + 4. What is the total?','11',[['10','forgot'],['641','write']]]];
const FIX={pair:'3 + 8 = 11, not 10. Look for two numbers that make exactly 10.',pair2:'8 + 7 = 15, not 10. Try 3 and 7.',write:'Ten and six is sixteen, written 16. 106 is one hundred and six.',ten1:'The 10 is ten ones, not one. 10 + 6 = 16.',
 forgot:'You added only two numbers. Add all three.',countstart:'When you count on, start with the next number. 10 + 5: 11, 12, 13, 14, 15.',order:'You can add three numbers in any order. The total stays the same.',notdub:'A double is two numbers that are the same.',apart:'The two 5s are not next to each other, but they are still a double.'};
VIS.reg('flagadd3',c=>{let A,X,pad,box,nq=-1,job=0;const T={after:()=>{}};
const s=n=>Math.round(n*(A.narrow?1:1.12));
const tell=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function wr(t,x,y,n,col,wt,al){X.font=`${wt||700} ${s(n)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function split(t,w,n){X.font=`700 ${s(n)}px system-ui,sans-serif`;const L=[];let line='';for(const word of String(t).split(' ')){const try1=line?line+' '+word:word;if(line&&X.measureText(try1).width>w){L.push(line);line=word}else line=try1}L.push(line);return L}
function rr(x,y,w,h,fill,stroke,lw){A.paint.rrect(x,y,w,h,14);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
function para(t,x,y,w,h,n,col){const L=split(t,w-14,n),lh=s(n)+4;L.forEach((r,i)=>wr(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function head(t,won){const L=split(t,A.W-44,14),lh=s(14)+4,h=Math.max(s(36),L.length*lh+14);rr(12,10,A.W-24,h,won?P.goodBg:P.tipBg,won?P.good:P.edge,2);L.forEach((r,i)=>wr(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?P.good:P.ink));return 10+h}
function foot(){if(!T.msg)return;const L=split((T.bad?'✗ ':'✓ ')+T.msg,A.W-48,13),lh=s(13)+5,h=L.length*lh+12,y=A.H-h-10;rr(12,y,A.W-24,h,'#ffffff',T.bad?P.warn:P.good,3);L.forEach((r,i)=>wr(r,A.W/2,y+6+lh*(i+.5),13,T.bad?P.warn:P.ink))}
const nope=m=>{T.bad=true;T.msg=m;A.sound.miss();sync()};
const yes=m=>{T.bad=false;T.msg=m;A.sound.pop()};
const which=()=>['any','ten','rest','dub','check','quiz'][A.step];
/* a card is {v, parts:[[value,colour index]]}; dots fill ten-frames part by part so you can see where each number went */
const deal=nums=>nums.map((v,i)=>({v,parts:[[v,i]]}));
function frames(cd,x,y,w,h){const cells=[];cd.parts.forEach(([v,ci])=>{for(let k=0;k<v;k++)cells.push(ci)});const nf=Math.max(1,Math.ceil(cd.v/10)),gap=s(6),cw=Math.max(8,Math.min((w-12-gap*(nf-1))/(2*nf),(h-8)/5,s(30))),fw=2*cw,tot=nf*fw+(nf-1)*gap,x0=x+(w-tot)/2,y0=y+(h-5*cw)/2;
 for(let f=0;f<nf;f++){const fx=x0+f*(fw+gap);X.strokeStyle=P.mute;X.lineWidth=1.5;for(let r=0;r<5;r++)for(let q=0;q<2;q++){const i=f*10+r*2+q;X.strokeRect(fx+q*cw,y0+r*cw,cw,cw);if(i<cells.length){X.fillStyle=DOT[cells[i]];X.beginPath();X.arc(fx+q*cw+cw/2,y0+r*cw+cw/2,cw*.34,0,7);X.fill()}}}}
function drawCards(t0,b0){const n=T.cards.length,gap=s(10),w=Math.min(s(150),(A.W-s(24)-gap*(n-1))/n),h=Math.min(b0-t0-s(8),w*2.1),x0=(A.W-(n*w+(n-1)*gap))/2;T.rects=[];
 T.cards.forEach((cd,i)=>{const r={x:x0+i*(w+gap),y:t0+s(4),w,h,i};T.rects.push(r);const d=T.drag&&T.drag.i===i,px=d?T.drag.x-w/2:r.x,py=d?T.drag.y-h/2:r.y,on=T.sel===i||d,ten=cd.v===10&&cd.parts.length>1;
  rr(px,py,w,h,ten?P.goodBg:on?P.hiBg:'#ffffff',ten?P.good:on?P.hi:P.edge,on||ten?3.5:2);wr(cd.v,px+w/2,py+s(26),26,P.ink,900);
  if(cd.parts.length>1)wr(cd.parts.map(q=>q[0]).join(' + '),px+w/2,py+s(50),12,P.mute,700);frames(cd,px,py+s(58),w,h-s(64))})}
/* join card a into card b */
function join(a,b){if(T.won||T.busy||a===b||a==null||b==null)return;const C=T.cards,x=C[a],y=C[b],k=which();T.sel=null;
 if(k==='ten'&&x.v+y.v!==10)return nope(`${x.v} + ${y.v} = ${x.v+y.v}, not 10. Look for two numbers that make 10.`);
 if((k==='rest')&&C.length===3&&x.v+y.v!==10)return nope(`${x.v} + ${y.v} = ${x.v+y.v}. Make a 10 first, then add the last number.`);
 if(k==='dub'&&C.length===3&&x.v!==y.v)return nope(`${x.v} and ${y.v} are not the same. A double is two numbers that are the same.`);
 const m={v:x.v+y.v,parts:x.parts.concat(y.parts)};T.cards=C.filter((_,i)=>i!==a&&i!==b);T.cards.splice(Math.min(a,b),0,m);A.sound.tick();
 if(k==='any'){if(T.cards.length===2){T.first=`${x.v} + ${y.v}`;yes(`${x.v} + ${y.v} = ${m.v}. Now add the last number.`)}else{T.ways.add(T.first);yes(`Total ${m.v}. You started with ${T.first}.`);
   if(T.ways.size>=2){T.won=true;T.msg=`Two different ways, same total: 15. Order does not change the total.`}else{T.msg+=' Try again and start with a different pair.';T.busy=true;setTimeout(()=>{T.busy=false;if(which()==='any'&&!T.won){T.cards=deal(ANY);sync()}},A.reduced()?40:900)}}}
 if(k==='ten'){yes(`${x.v} + ${y.v} = 10. A full ten-frame!`);T.busy=true;setTimeout(()=>{T.busy=false;if(which()!=='ten')return;T.round++;if(T.round===TENS.length){T.won=true;T.msg='You found the ten in all three. Look for 10 first.'}else T.cards=deal(TENS[T.round]);sync()},A.reduced()?40:700)}
 if(k==='rest'){if(T.cards.length===2)yes(`${x.v} + ${y.v} = 10. Now tap the total for 10 and ${T.cards.find(q=>q.v!==10||q.parts.length===1).v}.`);}
 if(k==='dub'){if(T.cards.length===2)yes(`Double ${x.v} is ${m.v}. Now add the last number.`);else{yes(`${m.v}! A double, then the rest.`);T.busy=true;setTimeout(()=>{T.busy=false;if(which()!=='dub')return;T.round++;if(T.round===DUBS.length){T.won=true;T.msg='No ten? A double helps too.'}else T.cards=deal(DUBS[T.round]);sync()},A.reduced()?40:700)}}
 sync()}
/* step 2: choose the total after the ten */
function pickTotal(v){if(T.won)return;const R=REST[T.round],tot=R[0]+R[1]+R[2];if(T.cards.length===3)return nope('Make a 10 first: join the two numbers that make 10.');
 if(v!==tot){const rest=tot-10;return nope(v===100+rest?`Ten and ${rest} is written ${tot}, not ${v}.`:`Count on ${rest} from 10: start at 11. 10 + ${rest} = ${tot}, not ${v}.`)}
 yes(`10 + ${tot-10} = ${tot}.`);T.round++;if(T.round===REST.length){T.won=true;T.msg='Make 10, then add the rest: ten and some more.'}else T.cards=deal(REST[T.round].slice(0,3));sync()}
/* step 4: who is right? */
function judgeKid(i){if(T.won)return;const [nums,kids]=KIDS[T.round],k=kids[i],tot=nums[0]+nums[1]+nums[2];if(k[1]!==tot)return nope(k[2]);yes(`${k[0]} is right: ${nums.join(' + ')} = ${tot}.`);T.round++;if(T.round===KIDS.length){T.won=true;T.msg='Add all three numbers, and count on from the next number.'}sync()}
function drawTotals(t0,b0){const R=REST[Math.min(T.round,2)],w=(A.W-s(48))/3,h=s(54),y=b0-h;T.tots=R[3].map((v,i)=>{const r={x:s(16)+i*(w+s(8)),y,w,h,v};const live=T.cards.length===2;rr(r.x,r.y,r.w,r.h,live?'#ffffff':'#f3f4f6',live?P.edge:'#9ca3af',2);wr(v,r.x+w/2,r.y+h/2,20,live?P.ink:P.mute,900);return r});return y}
function drawKids(t0,b0){const [nums,kids]=KIDS[Math.min(T.round,2)],w=(A.W-s(48))/3,h=Math.min(s(130),b0-t0-s(70));wr(nums.join(' + ')+' = ?',A.W/2,t0+s(24),24,P.ink,900);
 T.kidR=kids.map((k,i)=>{const r={x:s(16)+i*(w+s(8)),y:t0+s(52),w,h,i};rr(r.x,r.y,w,h,'#ffffff',P.edge,2);X.fillStyle=['#fde68a','#bfdbfe','#bbf7d0'][i];X.beginPath();X.arc(r.x+w/2,r.y+s(28),s(18),0,7);X.fill();X.strokeStyle=P.edge;X.lineWidth=1.5;X.stroke();
  wr(k[0],r.x+w/2,r.y+s(62),13,P.ink,800);wr('says '+k[1],r.x+w/2,r.y+s(88),17,P.ink,900);return r})}
function draw(){X.fillStyle=A.col.dark?'#1f2937':P.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=P.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=which(),H={any:['Join two cards, then the last one. 5 + 7 + 3.','Any order, same total!'],ten:['Find the two numbers that make 10.','Look for 10 first.'],rest:['Make 10, then tap the total.','Ten and some more.'],
  dub:['No 10 here. Join the double first.','Doubles help too.'],check:['Who is right? Tap the right answer.','Check all three numbers.'],quiz:['Look for 10. Look for a double. Add all three.','']};
 const t=head(H[k][T.won?1:0]||H[k][0],T.won),bot=A.H-(T.msg?s(62):s(12));
 if(k==='any'||k==='ten'||k==='dub')drawCards(t+s(6),k==='any'?bot-s(20):bot);
 if(k==='rest'){const y=drawTotals(t,bot-s(4));drawCards(t+s(6),y-s(8))}
 if(k==='any'&&T.ways.size){wr('Ways found: '+[...T.ways].join(' first, ')+' first',A.W/2,bot-s(4),12,P.mute,700)}
 if(k==='check')drawKids(t+s(6),bot);
 if(k==='quiz')para('5 + 7 + 3: join 7 and 3 to make 10. Then 10 + 5 = 15.',s(20),t+s(10),A.W-s(40),bot-t-s(20),16,P.mute);
 foot();A.fx.draw(X)}
let p0=null;
function down(p){const k=which();p0=p;
 if(['any','ten','rest','dub'].includes(k)&&!T.won){const r=(T.rects||[]).find(q=>inside(p,q));if(r){T.drag={i:r.i,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='rest'){const r=(T.tots||[]).find(q=>inside(p,q));if(r){pickTotal(r.v);return true}}
 if(k==='check'){const r=(T.kidR||[]).find(q=>inside(p,q));if(r){judgeKid(r.i);return true}}
 return false}
function move(p){if(!T.drag)return;T.drag.x=p.x;T.drag.y=p.y;A.redraw()}
function up(p){const d=T.drag;T.drag=null;if(!d)return;const tap=p0&&Math.hypot(p.x-p0.x,p.y-p0.y)<10;
 if(tap){if(T.sel==null||T.sel===d.i){T.sel=T.sel===d.i?null:d.i;A.redraw();return}join(T.sel,d.i);return}
 const tgt=(T.rects||[]).find(q=>q.i!==d.i&&inside(p,q));if(tgt)join(d.i,tgt.i);else A.redraw()}
function sync(){const k=which(),list=T.cards.map(q=>q.v).join(', ');let d='Challenge.';
 if(k==='any')d=`Cards: ${list}. Ways found: ${T.ways.size} of 2.`;
 if(k==='ten')d=T.won?'All three tens found.':`Sum ${T.round+1} of 3. Cards: ${list}.`;
 if(k==='rest')d=T.won?'All three totals found.':`Sum ${T.round+1} of 3. Cards: ${list}. Totals to pick: ${REST[T.round][3].join(', ')}.`;
 if(k==='dub')d=T.won?'All three doubles used.':`Sum ${T.round+1} of 3. Cards: ${list}.`;
 if(k==='check')d=T.won?'All three checked.':`Sum ${T.round+1} of 3: ${KIDS[T.round][0].join(' + ')}. ${KIDS[T.round][1].map(q=>q[0]+' says '+q[1]).join(', ')}.`;
 tell((T.msg?T.msg+' ':'')+d);ctl();T.after()}
function ctl(){if(!pad)return;pad.innerHTML='';const k=which(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(['any','ten','rest','dub'].includes(k)&&!T.won&&T.cards.length>1&&!(k==='rest'&&T.cards.length<3))
  for(let i=0;i<T.cards.length;i++)for(let j=i+1;j<T.cards.length;j++){const a=T.cards[i].v,bb=T.cards[j].v;b(`Join ${a} and ${bb}`,()=>join(i,j))}
 if(k==='rest'&&!T.won)REST[T.round][3].forEach(v=>b('Total: '+v,()=>pickTotal(v)));
 if(k==='check'&&!T.won)KIDS[T.round][1].forEach((q,i)=>b(`${q[0]} says ${q[1]}`,()=>judgeKid(i)));
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function setup(nums){job++;Object.assign(T,{after:()=>{},won:false,msg:'',bad:false,busy:false,sel:null,drag:null,round:0,ways:new Set(),first:'',cards:deal(nums)})}
const pairAt=(nums,ok)=>{for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)if(ok(nums[i],nums[j]))return[i,j];return[0,1]};
const steps=[
{h:'Any order, same total',p:'5 + 7 + 3. You can join any two numbers first. Then add the last one.',
predict:{q:'5 + 7 + 3. If you add 7 + 3 first, is the total different?',opts:['Yes, it changes','No, it is the same','Only if 5 is first'],ans:1},
task:'Find the total 2 different ways',show:()=>{steps[0].go();demo([()=>join(0,1),()=>join(0,1),()=>{},()=>join(1,2),()=>join(0,1)],520)},go:()=>{setup(ANY);sync();T.after=ready(0,()=>T.won,'15 both ways.')}},
{h:'Look for a ten',p:'Making 10 first makes adding easy. Look at all three numbers, not just the first two.',
predict:{q:'4 + 6 + 8. Which two make 10?',opts:['4 and 8','4 and 6','6 and 8'],ans:1},
task:'Find the ten in 3 sums',show:()=>{steps[1].go();demo(TENS.map(n=>()=>{const [i,j]=pairAt(T.cards.map(q=>q.v),(a,b)=>a+b===10);join(i,j)}),900)},go:()=>{setup(TENS[0]);sync();T.after=ready(1,()=>T.won,'A ten in every sum.')}},
{h:'Ten and some more',p:'Once you have 10, adding is quick. 10 + 7 is seventeen: one ten and 7 ones.',
predict:{q:'10 + 7 = ?',opts:['107','17','8'],ans:1},
task:'Make 10, then pick the total, 3 times',show:()=>{steps[2].go();const one=()=>{const [i,j]=pairAt(T.cards.map(q=>q.v),(a,b)=>a+b===10);join(i,j)},tot=()=>{const R=REST[T.round];pickTotal(R[0]+R[1]+R[2])};demo([one,tot,one,tot,one,tot],450)},go:()=>{setup(REST[0].slice(0,3));sync();T.after=ready(2,()=>T.won,'Ten and some more.')}},
{h:'Doubles help too',p:'Some sums have no pair that makes 10. Look for a double: two numbers that are the same. They do not have to be next to each other.',
predict:{q:'4 + 5 + 4. Which pair is a double?',opts:['4 and 4','4 and 5','There is no double'],ans:0},
task:'Use the double in 3 sums',show:()=>{steps[3].go();const one=()=>{const [i,j]=pairAt(T.cards.map(q=>q.v),(a,b)=>a===b);join(i,j)};demo([one,()=>join(0,1),()=>{},one,()=>join(0,1),()=>{},one,()=>join(0,1)],420)},go:()=>{setup(DUBS[0]);sync();T.after=ready(3,()=>T.won,'Double, then the rest.')}},
{h:'Check the answer',p:'Three children added the same numbers. Only one is right. Find the slips.',
predict:{q:'Ali says 6 + 4 + 5 = 10. What went wrong?',opts:['Nothing, he is right','He forgot the 5','He forgot the 6'],ans:1},
task:'Find who is right in 3 sums',show:()=>{steps[4].go();demo([0,1,2].map(r=>()=>{const [n,k]=KIDS[T.round];judgeKid(k.findIndex(q=>q[1]===n[0]+n[1]+n[2]))}),700)},go:()=>{setup([1,1,1]);sync();T.after=ready(4,()=>T.won,'Three numbers, all added.')}},
{h:'Challenge',p:'',go:()=>{setup([1,1,1]);ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.after()});
function ask(){nq++;const [q,right,wrong]=Q[nq%Q.length],all=[[right,'ok']].concat(wrong),r=nq%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,right)});tell('Challenge: '+q);A.redraw()}
let run=0;
function score(tag,right){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=tag==='ok';let m=FIX[tag]||'Look for 10, then add the rest.';
 if(tag==='forgot')m='You added only two of the numbers. Add all three, then check.';
 if(tag==='write')m='One ten and some ones is a teen number. Ten and six is 16, not 106.';
 if(tag==='apart')m='A double can be split up. The two 5s are a double even with the 4 between them.';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Adding three numbers lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
