/* Flagship – finding a missing number in addition (ages 6–7): fill the empty seats on a bus and see that 8 + 2 = 10 and
   10 − 8 = 2 tell the same story; match each subtraction to the missing-number addition that asks the same question;
   count up hop by hop from the smaller number to the bigger one; use a fact you know to answer a take-away; and level a
   balance by filling the box in □ + 5 = 9 and 9 = 4 + □. The Challenge targets adding the two numbers, giving back a part
   or the whole, counting the start number as a hop, and reading = as "the answer comes next". Every drag has a button twin. */
(()=>{
const BUS=[[8,10],[6,10],[9,12]],HOPS=[[9,12],[7,11],[13,16]],FACTS=[[6,4,6],[7,5,7],[8,6,6]];
const SUBS=['10 − 8','9 − 4','7 − 3'],ADDS=[['4 + □ = 9',1],['8 + 10 = □',-1],['3 + □ = 7',2],['8 + □ = 10',0]];
const PANS=[['□ + 5 = 9',5,9,0],['9 = 4 + □',4,9,1],['7 + □ = 10',7,10,0]];
VIS.reg('flagcountup',c=>{let A,pad,quiz,qNo=-1,streak=0;c.fig.classList.add('young');const M={};
const scene=()=>['bus','match','hop','fact','pan','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const big=n=>Math.round(n*(A.narrow?1:1.15));
function text(g,t,x,y,n,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function box(g,r,fill,edge,rad){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,rad||12);g.stroke()}
/* ---- layout ---- */
function seat(i,n){const cols=n/2,w=Math.min((A.W*.9-12)/cols,A.H*.17,64),x0=(A.W-cols*w)/2;return{x:x0+(i%cols)*w+3,y:A.H*.2+Math.floor(i/cols)*(w+4),w:w-6,h:w-6}}
const waiting=()=>({x:A.W/2,y:A.H*.8,r:Math.min(26,A.H*.06)});
const leftCard=i=>{const h=Math.min(A.H*.14,58);return{x:A.W*.04,y:A.H*.18+i*(h+10),w:A.W*.36,h}};
const rightCard=i=>{const h=Math.min(A.H*.14,58);return{x:A.W*.46,y:A.H*.14+i*(h+8),w:A.W*.5,h}};
function track(i){const w=(A.W-24)/8;return{x:12+i*w+2,y:A.H*.46,w:w-4,h:Math.min(w*1.45,A.H*.18)}}
const answerCard=i=>{const w=(A.W-48)/3;return{x:12+i*(w+12),y:A.H*.74,w,h:A.H*.2}};
const cupSpot=()=>({x:A.W/2,y:A.H*.86,r:Math.min(24,A.H*.055)});
/* ---- drawing ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=scene();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){text(g,'8 + □ = 10',W/2,H*.38,30);text(g,'10 − 8 = □',W/2,H*.58,30);text(g,'Same question, same answer.',W/2,H*.82,16);return}
 if(v==='bus')drawBus(g,W,H,C);if(v==='match')drawMatch(g,W,H,C);if(v==='hop')drawHop(g,W,H,C);if(v==='fact')drawFact(g,W,H,C);if(v==='pan')drawPan(g,W,H,C);A.fx.draw(g)}
function drawBus(g,W,H,C){const r=Math.min(M.r,2),[have,seats]=BUS[r],last=seat(seats-1,seats),first=seat(0,seats);
 box(g,{x:first.x-12,y:first.y-14,w:last.x+last.w-first.x+24,h:last.y+last.h-first.y+28},A.alpha(C.am,.28),C.tx,18);
 for(let i=0;i<seats;i++){const s=seat(i,seats);box(g,s,A.alpha(C.mu,.12),A.col.mu,8);if(i<have)A.paint.ball(s.x+s.w/2,s.y+s.h/2,s.w*.32,C.cy);else if(i<have+M.on)A.paint.ball(s.x+s.w/2,s.y+s.h/2,s.w*.32,C.gr)}
 text(g,M.r>=3?'Three buses full.':`${have} on the bus. ${seats} seats.`,W/2,H*.07,16);
 if(M.full){text(g,`${have} + ${M.on} = ${seats}`,W/2,H*.68,24);text(g,`${seats} − ${have} = ${M.on}`,W/2,H*.8,24,C.tx);return}
 text(g,`${have} + □ = ${seats}`,W/2,H*.64,22);const w=waiting(),d=M.drag&&M.drag.x!=null?M.drag:w;A.paint.ball(d.x,d.y,w.r,C.gr);text(g,'Drag me on',w.x,w.y+w.r+16,13,C.tx,700)}
function drawMatch(g,W,H,C){text(g,M.paired.length>=3?'All matched!':'Tap a take-away, then the card that asks the same.',W/2,H*.06,14);
 SUBS.forEach((t,i)=>{const r=leftCard(i),done=M.paired.includes(i);box(g,r,done?A.alpha(C.gr,.25):M.sel===i?A.alpha(C.vi,.3):A.alpha(C.cy,.12),M.sel===i?C.vi:C.tx);text(g,t+' = ?',r.x+r.w/2,r.y+r.h/2,20)});
 ADDS.forEach(([t,k],i)=>{const r=rightCard(i),done=k>=0&&M.paired.includes(k);box(g,r,done?A.alpha(C.gr,.25):M.bad===i?A.alpha(C.rd,.25):A.alpha(C.or,.12),C.tx);text(g,t,r.x+r.w/2,r.y+r.h/2,19)})}
function drawHop(g,W,H,C){const r=Math.min(M.r,2),[a,b]=HOPS[r],s0=a-1;text(g,M.r>=3?'Count up from the small number.':`${b} − ${a} = ?  Count up from ${a}.`,W/2,H*.07,16);
 for(let i=0;i<8;i++){const t=track(i),n=s0+i;box(g,t,n===M.bad?A.alpha(C.rd,.25):n===b?A.alpha(C.am,.3):A.alpha(C.cy,.12),C.tx,10);text(g,String(n),t.x+t.w/2,t.y+t.h*.78,15)}
 for(let k=0;k<M.hops;k++){const p=track(a-s0+k),q=track(a-s0+k+1),x0=p.x+p.w/2,x1=q.x+q.w/2;g.lineWidth=3;g.strokeStyle=C.vi;g.beginPath();g.moveTo(x0,p.y);g.quadraticCurveTo((x0+x1)/2,p.y-40,x1,p.y);g.stroke();text(g,String(k+1),(x0+x1)/2,p.y-34,14,C.tx)}
 const f=track(M.at-s0);g.font=`${Math.round(Math.min(30,f.h*.42))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText('🐸',f.x+f.w/2,f.y+f.h*.3);
 text(g,M.full?`${a} to ${b} is ${M.hops} hops. ${b} − ${a} = ${M.hops}`:`Hops: ${M.hops}`,W/2,H*.8,M.full?17:20)}
function drawFact(g,W,H,C){const r=Math.min(M.r,2),[a,b,sub]=FACTS[r],whole=a+b,other=whole-sub,u=(W*.84)/whole,x0=W*.08;
 text(g,`You know: ${a} + ${b} = ${whole}`,W/2,H*.07,16);text(g,`${whole} − ${sub} = ${M.full?other:'?'}`,W/2,H*.18,26);
 box(g,{x:x0,y:H*.28,w:u*whole,h:H*.12},A.alpha(C.or,.25),C.tx,8);text(g,String(whole),W/2,H*.34,18);
 box(g,{x:x0,y:H*.44,w:u*sub,h:H*.12},A.alpha(C.cy,.25),C.tx,8);text(g,String(sub),x0+u*sub/2,H*.5,18);
 box(g,{x:x0+u*sub,y:H*.44,w:u*other,h:H*.12},M.full?A.alpha(C.gr,.3):A.alpha(C.mu,.08),C.tx,8);text(g,M.full?String(other):'?',x0+u*sub+u*other/2,H*.5,18);
 if(M.r<3&&!M.full)factChoices(r).forEach((n,i)=>{const q=answerCard(i);box(g,q,M.bad===n?A.alpha(C.rd,.25):A.alpha(C.vi,.1),C.tx,14);text(g,String(n),q.x+q.w/2,q.y+q.h/2,24)})}
const factChoices=r=>{const[a,b,sub]=FACTS[r],w=a+b,o=[w-sub,w,w+sub];return r===0?[o[1],o[0],o[2]]:r===1?[o[2],o[1],o[0]]:o};
function stack(g,cx,base,n,s,col,from){for(let i=0;i<n;i++){const k=from+i,x=cx-2.5*s+(k%5)*s,y=base-(Math.floor(k/5)+1)*s;g.fillStyle=col;A.paint.rrect(x+1,y+1,s-2,s-2,4);g.fill();g.lineWidth=1.5;g.strokeStyle=A.col.tx;A.paint.rrect(x+1,y+1,s-2,s-2,4);g.stroke()}}
function drawPan(g,W,H,C){const r=Math.min(M.r,2),[t,part,whole,side]=PANS[r],sides=[0,0];sides[side]=part+M.box;sides[1-side]=whole;
 const tilt=Math.max(-3,Math.min(3,sides[1]-sides[0]))*.05,px=W/2,py=H*.3,arm=W*.32,s=Math.min(W*.045,20);
 text(g,M.r>=3?'Both sides the same.':t,W/2,H*.07,26);g.lineWidth=5;g.strokeStyle=C.tx;g.beginPath();g.moveTo(px-arm*Math.cos(tilt),py-arm*Math.sin(tilt));g.lineTo(px+arm*Math.cos(tilt),py+arm*Math.sin(tilt));g.stroke();
 g.beginPath();g.moveTo(px,py);g.lineTo(px-14,H*.7);g.lineTo(px+14,H*.7);g.closePath();g.fillStyle=C.mu;g.fill();
 [-1,1].forEach((dir,k)=>{const cx=px+dir*arm*Math.cos(tilt),cy=py+dir*arm*Math.sin(tilt)+H*.26;g.lineWidth=2;g.strokeStyle=C.tx;g.beginPath();g.moveTo(cx-3*s,cy);g.lineTo(cx+3*s,cy);g.stroke();
  if(k===side){stack(g,cx,cy-2,part,s,C.cy,0);stack(g,cx,cy-2,M.box,s,C.gr,part);g.setLineDash([5,4]);g.strokeRect(cx-2.7*s,cy-4.4*s,5.4*s,4.3*s);g.setLineDash([])}else stack(g,cx,cy-2,whole,s,C.or,0);
  text(g,k===side?`${part} + ${M.box}`:String(whole),cx,cy+18,17)});
 if(M.full)text(g,`Level! The box is ${M.box}.`,W/2,H*.78,20);else{const q=cupSpot(),d=M.drag&&M.drag.x!=null?M.drag:q;g.fillStyle=C.gr;A.paint.rrect(d.x-q.r*.7,d.y-q.r*.7,q.r*1.4,q.r*1.4,5);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();text(g,'Drag a cube to the box',W/2,q.y-q.r-10,13,C.tx,700)}}
/* ---- actions ---- */
function board(){if(scene()!=='bus'||M.full||M.r>=3)return;const[have,seats]=BUS[M.r];M.on++;A.sound.pop();
 if(have+M.on>=seats){M.full=1;tell(`Full! ${have} and ${M.on} make ${seats}. So ${seats} take away ${have} is ${M.on}.`)}else tell(`${have} and ${M.on} more. ${seats-have-M.on} seats still empty.`);A.redraw();buttons()}
function pickSub(i){if(scene()!=='match'||M.paired.includes(i))return;M.sel=i;A.sound.tick();tell(`${SUBS[i]}. Which card asks the same?`);A.redraw();buttons()}
function pickAdd(j){if(scene()!=='match'||M.sel<0)return;const[t,k]=ADDS[j],i=M.sel,[w,p]=SUBS[i].split(' − ').map(Number);
 if(k!==i){A.sound.miss();M.bad=j;tell(k<0?`${t} adds 8 and 10 to make 18. ${SUBS[i]} asks what joins ${p} to make ${w}.`:`That card makes ${t.split('= ')[1]}. ${SUBS[i]} starts with ${w}: find the card that makes ${w} from ${p}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.paired.push(i);M.sel=-1;A.sound.pop();tell(`Yes. ${SUBS[i]} and ${t} ask the same question. The answer is ${w-p}.`);A.redraw();buttons();M.want()}
function hop(n){if(scene()!=='hop'||M.full||M.r>=3)return;const[a,b]=HOPS[M.r];
 if(n!==M.at+1){A.sound.miss();M.bad=n;tell(n<=M.at?`That goes back. Count up from ${a} to ${b}.`:`That skips. Hop one number at a time so you can count the hops.`);setTimeout(()=>{M.bad=0;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.at=n;M.hops++;A.sound.tick();if(n===b){M.full=1;tell(`${a} to ${b} is ${M.hops} hops. So ${b} take away ${a} is ${M.hops}.`)}else tell(`${M.hops} hop${M.hops>1?'s':''}. Now on ${n}.`);A.redraw();buttons()}
function sayFact(n){if(scene()!=='fact'||M.full||M.r>=3)return;const[a,b,sub]=FACTS[M.r],w=a+b,ok=w-sub;
 if(n!==ok){A.sound.miss();M.bad=n;tell(n===w?`${w} is the whole. Take away ${sub} and the part left is smaller.`:`${n} is ${w} add ${sub}. Take away makes it smaller. ${sub} and what make ${w}?`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.full=1;A.sound.pop();tell(`${sub} and ${ok} make ${w}, so ${w} take away ${sub} is ${ok}.`);A.redraw();buttons()}
function cube(d){if(scene()!=='pan'||M.full||M.r>=3)return;const[,part,whole]=PANS[M.r];M.box=Math.max(0,M.box+d);A.sound.tick();
 if(part+M.box===whole){M.full=1;tell(`Level! ${part} and ${M.box} make ${whole}. The box is ${M.box}.`)}else tell(part+M.box>whole?`Too many. That side is heavier. Take one out.`:`${part} and ${M.box} is ${part+M.box}. Not ${whole} yet.`);A.redraw();buttons()}
function nextRound(){if(!M.full||M.r>=3)return;if(M.r===2){M.r=3;A.redraw();buttons();return M.want()}M.r++;M.full=0;M.on=0;M.box=0;M.hops=0;M.bad=-1;if(scene()==='hop'&&M.r<3)M.at=HOPS[M.r][0];
 const v=scene();if(M.r<3)tell(v==='bus'?`New bus: ${BUS[M.r][0]} on, ${BUS[M.r][1]} seats.`:v==='hop'?`${HOPS[M.r][1]} take away ${HOPS[M.r][0]}. The frog is on ${HOPS[M.r][0]}.`:v==='fact'?`You know ${FACTS[M.r][0]} + ${FACTS[M.r][1]}.`:`Next: ${PANS[M.r][0]}`);A.redraw();buttons();M.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(M.full&&M.r<3){B(M.r<2?'Next one':'Finish',nextRound);return}
 if(v==='bus'&&M.r<3)B('One more gets on',board,'One more child gets on the bus');
 if(v==='match'&&M.paired.length<3){if(M.sel<0)SUBS.forEach((t,i)=>{if(!M.paired.includes(i))B(t+' = ?',()=>pickSub(i),`Pick ${t}`)});else ADDS.forEach(([t],j)=>B(t,()=>pickAdd(j),`Match with ${t.replace('□','box')}`))}
 if(v==='hop'&&M.r<3){const a=HOPS[M.r][0];for(let n=a-1;n<a+7;n++)B(String(n),()=>hop(n),`Hop to ${n}`)}
 if(v==='fact'&&M.r<3)factChoices(M.r).forEach(n=>B(String(n),()=>sayFact(n),`Answer ${n}`));
 if(v==='pan'&&M.r<3){B('Put a cube in',()=>cube(1),'Put one cube in the box');B('Take one out',()=>cube(-1),'Take one cube out of the box')}}
/* ---- pointer ---- */
function down(p){const v=scene();if(M.full){nextRound();return false}
 if(v==='bus'&&M.r<3){const w=waiting();if(Math.hypot(p.x-w.x,p.y-w.y)<w.r+14){M.drag={x:null,y:null,x0:p.x,y0:p.y};return true}}
 if(v==='match'){SUBS.forEach((t,i)=>{if(inside(p,leftCard(i)))pickSub(i)});ADDS.forEach((t,j)=>{if(inside(p,rightCard(j)))pickAdd(j)})}
 if(v==='hop'&&M.r<3){const s0=HOPS[M.r][0]-1;for(let i=0;i<8;i++)if(inside(p,track(i)))hop(s0+i)}
 if(v==='fact'&&M.r<3)[0,1,2].forEach(i=>{if(inside(p,answerCard(i)))sayFact(factChoices(M.r)[i])});
 if(v==='pan'&&M.r<3){const q=cupSpot();if(Math.hypot(p.x-q.x,p.y-q.y)<q.r+14){M.drag={x:null,y:null,x0:p.x,y0:p.y};return true}}
 return false}
function move(p){const d=M.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=M.drag,v=scene();M.drag=null;if(!d)return;
 if(v==='bus'){if(d.x==null||p.y<A.H*.6)board();else{tell('Drag the child up onto the bus, or tap One more gets on.');A.redraw()}}
 if(v==='pan'){const[, , ,side]=PANS[M.r];if(d.x==null||(side===0?p.x<A.W/2:p.x>A.W/2)&&p.y<A.H*.75)cube(1);else{tell('Drop the cube on the side with the box.');A.redraw()}}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function runList(fns,gap){const me=++M.ver;fns.forEach((f,j)=>setTimeout(()=>{if(me===M.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function reset(){const v=(M.ver||0)+1;Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,{ver:v,want:()=>{},r:0,on:0,full:0,sel:-1,paired:[],bad:-1,at:HOPS[0][0],hops:0,box:0,drag:null})}
const thrice=f=>[0,1,2].flatMap(f);
const steps=[
{h:'Fill the bus',p:'8 children are on a bus with 10 seats. Drag more on until it is full. How many got on?',predict:{q:'8 on, 10 seats. How many more can get on?',opts:['18','2','10'],ans:1},task:'Fill 3 buses',
 show:()=>{steps[0].go();runList(thrice(r=>[...Array(BUS[r][1]-BUS[r][0]).fill(board),nextRound]),240)},
 go:()=>{reset();tell('8 on the bus, 10 seats. Drag a child on.');buttons();M.want=ready(0,()=>M.r>=3,'Adding on and taking away tell the same story: 8 + 2 = 10, so 10 − 8 = 2.')}},
{h:'Same question',p:'10 − 8 asks: what do I add to 8 to make 10? Match each take-away to the card that asks the same.',task:'Match all 3',
 show:()=>{steps[1].go();runList([[0,3],[1,0],[2,2]].flatMap(([i,j])=>[()=>pickSub(i),()=>pickAdd(j)]),300)},
 go:()=>{reset();tell('Tap 10 − 8, then tap the card that asks the same question.');buttons();M.want=ready(1,()=>M.paired.length>=3,'Every take-away is a missing-number addition.')}},
{h:'Count up',p:'For 12 − 9, start on 9 and hop up to 12. Count the hops, not the numbers you start on.',predict:{q:'12 − 9. Hop from 9 up to 12. How many hops?',opts:['3','4','21'],ans:0},task:'Count up 3 times',
 show:()=>{steps[2].go();runList(thrice(r=>{const[a,b]=HOPS[r],L=[];for(let n=a+1;n<=b;n++)L.push(()=>hop(n));return L.concat(nextRound)}),220)},
 go:()=>{reset();tell('The frog is on 9. Tap 10 to hop.');buttons();M.want=ready(2,()=>M.r>=3,'When the numbers are close, counting up is quick.')}},
{h:'Use a fact you know',p:'If you know 6 + 4 = 10, you also know 10 − 6 = 4. Use the fact to find the missing part.',predict:{q:'You know 7 + 5 = 12. What is 12 − 7?',opts:['12','19','5'],ans:2},task:'Answer 3 take-aways',
 show:()=>{steps[3].go();runList(thrice(r=>{const[a,b,s]=FACTS[r];return[()=>sayFact(a+b-s),nextRound]}),320)},
 go:()=>{reset();tell('You know 6 + 4 = 10. What is 10 − 6?');buttons();M.want=ready(3,()=>M.r>=3,'One adding fact gives you two take-away facts.')}},
{h:'Level the balance',p:'= means both sides are the same. Put cubes in the box until the balance is level.',predict:{q:'9 = 4 + □. What goes in the box?',opts:['13','5','9'],ans:1},task:'Level 3 balances',
 show:()=>{steps[4].go();runList(thrice(r=>{const[,p,w]=PANS[r];return[...Array(w-p).fill(()=>cube(1)),nextRound]}),200)},
 go:()=>{reset();tell('□ + 5 = 9. Drag cubes into the box until it is level.');buttons();M.want=ready(4,()=>M.r>=3,'The box is the missing part. = means the same as.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.want()});
const QS=[['10 − 8 = ? Think: 8 + ? = 10.',[['2','ok'],['18','added'],['8','part']]],
 ['12 − 9 = ? Count up from 9.',[['3','ok'],['4','start'],['21','added']]],
 ['9 = 4 + □. What goes in the box?',[['5','ok'],['13','next'],['9','whole']]],
 ['You know 7 + 5 = 12. What is 12 − 7?',[['5','ok'],['12','whole'],['19','added']]],
 ['□ + 6 = 10. What goes in the box?',[['4','ok'],['16','added'],['6','part']]],
 ['15 − 13. Which way needs fewer hops?',[['Count up from 13','ok'],['Count back 13 hops','slow'],['Count up from 1','start1']]]];
function slip(t){let m='Think: the small number and what make the big one?';
 if(t==='added')m='That adds both numbers. Take away asks what joins the small number to make the big one.';
 if(t==='part')m='That is the number you started with. Count how many you add on to it.';
 if(t==='start')m='Count the hops, not the start number. 9 to 10, 11, 12 is 3 hops.';
 if(t==='next')m='= means "is the same as", not "the answer comes next". 4 and what make 9? 5.';
 if(t==='whole')m='That is the whole. The box is the missing part, so it is smaller.';
 if(t==='slow')m='That works, but it takes 13 hops. 13, 14, 15 is only 2 hops.';
 if(t==='start1')m='Start on the smaller number, 13, not on 1. Then count the hops up to 15.';
 return m}
function ask(){qNo++;const[q,ops]=QS[qNo%QS.length],r=qNo%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} right in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
