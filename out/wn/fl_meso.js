/* Flagship: the Mesozoic Era (ages 7–9). Put the three periods in order, measure how long each lasted on a time line
   drawn to scale, drag five dinosaurs into the period they lived in, measure the Stegosaurus to T. rex gap against the
   T. rex to today gap, decide which pairs could ever have met, then a challenge. Dates and text are in meso_art.js. */
(()=>{
const M=MESOART,P=M.PERIODS;
VIS.reg('flagmeso',c=>{let A,g,pad,quiz,pick=-1,gen=0,hold=null;const st={};
const ui=()=>({fg:A.col.tx,soft:A.col.mu,bg:A.col.pn,dark:A.col.dark,ink:'#111827',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',band:A.col.dark?'#1e293b':'#f1f5f9',top:A.col.dark?'#3730a3':'#e0e7ff',sel:'#7c3aed'});
const z=n=>A.narrow?n:Math.round(n*1.15);
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
function pen(text,x,y,size,colour,weight,align){g.font=`${weight||700} ${z(size)}px system-ui,sans-serif`;g.textAlign=align||'center';g.textBaseline='middle';g.fillStyle=colour;g.fillText(String(text),x,y,A.W-10)}
function split(text,width,size){g.font=`700 ${z(size)}px system-ui,sans-serif`;const rows=[''];String(text).split(' ').forEach(w=>{const r=rows[rows.length-1],t=r?r+' '+w:w;if(r&&g.measureText(t).width>width)rows.push(w);else rows[rows.length-1]=t});return rows}
function card(x,y,w,h,fill,line){A.paint.rrect(x,y,w,h,8);g.fillStyle=fill;g.fill();if(line){g.lineWidth=2;g.strokeStyle=line;g.stroke()}}
function banner(text){const k=ui(),rows=split(text,A.W-36,13),lh=z(17),h=rows.length*lh+12;card(9,7,A.W-18,h,k.top);rows.forEach((r,i)=>pen(r,A.W/2,13+lh*(i+.5),13,k.dark?'#f8fafc':k.ink));return 7+h+z(8)}
function footer(){if(!st.say)return;const k=ui(),rows=split((st.oops?'✗ ':'✓ ')+st.say,A.W-40,12),lh=z(16),h=rows.length*lh+10,y=A.H-h-7;card(9,y,A.W-18,h,'#ffffff',st.oops?k.bad:k.good);rows.forEach((r,i)=>pen(r,A.W/2,y+5+lh*(i+.5),12,st.oops?k.bad:k.ink))}
const wrong=s=>{st.oops=true;st.say=s;A.sound.miss();tell(s);A.redraw()};
const right=s=>{st.oops=false;st.say=s;A.sound.pop();tell(s);A.redraw();st.check()};
/* the time line: 252 million years ago on the left, today on the right, drawn to scale */
const X0=()=>z(16),X1=()=>A.W-z(16),at=mya=>X0()+(252-mya)/252*(X1()-X0());
const ago=x=>252-(x-X0())/(X1()-X0())*252;
function line(y,h,show){const k=ui();card(X0(),y,X1()-X0(),h,k.band,k.soft);P.forEach(([n,a,b,f],i)=>{if(!show||show(i)){g.fillStyle=f;g.fillRect(at(a),y,at(b)-at(a),h);g.strokeStyle=k.ink;g.lineWidth=1;g.strokeRect(at(a),y,at(b)-at(a),h)}});
 [252,201,145,66,0].forEach(m=>{g.fillStyle=k.fg;g.fillRect(at(m)-1,y+h,2,z(6));pen(m?m:'now',at(m),y+h+z(14),10,k.fg,700)});pen('millions of years ago',A.W/2,y+h+z(30),10,k.soft,600)}
/* step 1: order the periods */
function drawOrder(t){const k=ui(),w=(A.W-z(40))/3,y=t+z(10),h=z(52);st.slots={y,h,w};
 for(let i=0;i<3;i++){const x=z(14)+i*(w+z(6)),f=st.placed[i];card(x,y,w,h,f!=null?P[f][3]:k.band,k.soft);pen(f!=null?P[f][0]:['oldest','middle','youngest'][i],x+w/2,y+h/2,12,f!=null?k.ink:k.fg,800)}
 const cy=y+h+z(60);st.cards=[];['Jurassic','Cretaceous','Triassic'].forEach((n,j)=>{const i=P.findIndex(p=>p[0]===n);if(st.placed.includes(i))return;const x=z(14)+j*(w+z(6)),hx=hold&&hold.i===i?hold:null;
  const bx=hx?hx.x-w/2:x,by=hx?hx.y-z(22):cy;card(bx,by,w,z(44),P[i][3],k.ink);pen(n,bx+w/2,by+z(22),12,k.ink,800);st.cards.push({i,x,y:cy,w,h:z(44)})});
 pen('drag a card into the next empty box',A.W/2,cy+z(62),11,k.soft,600)}
function place(i){const slot=st.placed.indexOf(null);if(slot<0)return;
 if(i!==slot){let m=`Not yet: the ${P[i][0]} came ${i>slot?'later':'earlier'} than the box you are filling.`;if(slot===0)m=`The ${P[i][0]} is not the oldest. Which period had the very first dinosaurs?`;wrong(m);return}
 st.placed[slot]=i;A.sound.tick();if(slot===2){right('Triassic, then Jurassic, then Cretaceous. T, J, C.');return}
 st.oops=false;st.say=`${P[i][0]}: about ${P[i][1]} to ${P[i][2]} million years ago.`;tell(st.say);A.redraw()}
/* step 2: measure each period */
function drawLength(t){const k=ui(),y=t+z(30),h=z(56);st.band={y,h};line(y,h);
 st.seen.forEach(i=>{const [n,a,b]=P[i],mid=(at(a)+at(b))/2;pen(n,mid,y+h*.32,A.narrow?10:12,k.ink,800);pen(`${a-b} My`,mid,y+h*.7,A.narrow?10:12,k.ink,800)});
 if(st.seen.size<3)pen('tap a coloured period',A.W/2,y-z(14),11,k.soft,600)}
function measure(i){if(i<0||i>2)return;st.seen.add(i);const [n,a,b]=P[i];A.sound.tick();const s=`${n}: from ${a} to ${b} million years ago, about ${a-b} million years.`;
 if(st.seen.size===3){right(s+' The Cretaceous was the longest.');return}st.oops=false;st.say=s;tell(s);A.redraw()}
/* step 3: put each dinosaur in its period */
function drawDinos(t){const k=ui(),y=t+z(48),h=z(46);st.band={y,h};line(y,h);
 st.done.forEach(d=>{const [n,,a,b]=M.DINOS[d],x=at((a+b)/2);g.fillStyle=k.ink;g.beginPath();g.arc(x,y+h/2,z(5),0,7);g.fill();pen(n.replace('Tyrannosaurus','T.'),x,y-z(10)-(d%3)*z(14),10,k.fg,800)});
 const d=st.d;if(d<M.DINOS.length){const n=M.DINOS[d][0],w=Math.min(A.W*.6,z(190)),bx=hold?hold.x-w/2:A.W/2-w/2,by=hold?hold.y-z(20):y+h+z(60);card(bx,by,w,z(40),'#fef3c7',k.ink);pen('🦕 '+n,bx+w/2,by+z(20),12,k.ink,800)}}
function drop(x){const d=st.d;if(d>=M.DINOS.length)return;const m=ago(x),[n,p,a,b]=M.DINOS[d],into=P.findIndex(q=>m<=q[1]&&m>q[2]);
 if(into<0){wrong(`${n} lived inside the Mesozoic, between 252 and 66 million years ago. Drop it on a coloured period.`);return}
 if(into!==p){wrong(`${n} did not live in the ${P[into][0]}. It lived about ${a} to ${b} million years ago, in the ${P[p][0]}.`);return}
 st.done.push(d);st.d++;A.sound.tick();if(st.d>=M.DINOS.length){right('All five placed. No dinosaur lived through the whole era.');return}
 st.oops=false;st.say=`Yes: ${n}, ${P[p][0]}, about ${a} to ${b} million years ago.`;tell(st.say);A.redraw()}
const dropIn=p=>drop((at(P[p][1])+at(P[p][2]))/2);
/* step 4: measure the two gaps */
function drawGap(t){const k=ui(),y=t+z(50),h=z(30);st.band={y,h};line(y,h);
 M.MARKS.forEach(([n,m],i)=>{const x=at(m);g.fillStyle=st.first===i?k.sel:(k.dark?'#e5e7eb':k.ink);g.beginPath();g.arc(x,y-z(14),z(9),0,7);g.fill();pen(n,Math.min(A.W-z(26),Math.max(z(30),x)),y-z(34),11,k.fg,800)});
 st.gaps.forEach((v,j)=>{const [a,b]=j?[67,0]:[150,67],gy=y+h+z(52)+j*z(30);g.fillStyle=j?'#0ea5e9':'#f97316';g.fillRect(at(a),gy,at(b)-at(a),z(12));pen(`${a-b} million years`,(at(a)+at(b))/2,gy+z(22)-z(30)*0+z(0),11,k.fg,800)})}
function mark(i){if(st.first==null||st.first===i){st.first=i;A.sound.tick();tell(`Picked ${M.MARKS[i][0]}. Now tap another mark.`);A.redraw();return}
 const pair=[st.first,i].sort().join('');st.first=null;
 if(pair==='02'){const m='That is the whole span from Stegosaurus to today. Measure the two parts: Stegosaurus to T. rex, and T. rex to today.';wrong(m);return}
 st.gaps.add(pair==='01'?0:1);A.sound.tick();if(st.gaps.size===2){right('83 million years from Stegosaurus to T. rex, but only 67 from T. rex to us.');return}
 st.oops=false;st.say=pair==='01'?'Stegosaurus to T. rex: about 83 million years.':'T. rex to today: about 67 million years.';tell(st.say);A.redraw()}
/* step 5: could they meet? */
function drawMeet(t){const k=ui(),pr=M.PAIRS[Math.min(st.q,M.PAIRS.length-1)],y=t+z(40),h=z(22);line(y,h);
 [[pr[0],pr[1],'#7c3aed'],[pr[2],pr[3],'#be123c']].forEach(([n,[a,b],col],j)=>{const by=y+h+z(66)+j*z(40),x=at(a),w=Math.max(z(10),at(b)-at(a)),lx=Math.min(A.W-z(70),Math.max(z(70),x+w/2));g.fillStyle=col;g.fillRect(x,by,w,z(14));g.strokeStyle=col;g.setLineDash([3,3]);g.beginPath();g.moveTo(x+w/2,y+h+z(36));g.lineTo(x+w/2,by);g.stroke();g.setLineDash([]);pen(`${n}: ${a<1?'0.3 to 0':a+' to '+b} Mya`,lx,by-z(10),11,k.fg,800)});
 const zy=y+h+z(150),zh=z(48),zw=(A.W-z(40))/2;st.zones={zy,zh,zw};['Could meet','Never met'].forEach((n,i)=>{const x=z(14)+i*(zw+z(12));card(x,zy,zw,zh,'#f8fafc',k.ink);pen(n,x+zw/2,zy+zh/2,13,k.ink,800)})}
function judgePair(yes){const pr=M.PAIRS[st.q];if(!pr)return;
 if(yes!==pr[4]){let m=`They could meet: ${pr[0]} and ${pr[2]} lived at the same time, so their bars overlap.`;if(yes)m=`${pr[0]} and ${pr[2]} never met: their bars do not overlap, so they lived millions of years apart.`;wrong(m);return}
 st.q++;A.sound.tick();if(st.q>=M.PAIRS.length){right('All five judged. Overlapping bars mean they could meet; a gap means never.');return}
 st.oops=false;st.say=`Right: ${pr[0]} and ${pr[2]} ${pr[4]?'could meet':'never met'}.`;tell(st.say);A.redraw()}
const phase=()=>['order','length','dinos','gap','meet','chal'][A.step];
function paint(a){g=a.ctx;const k=ui(),ph=phase();g.fillStyle=k.bg;g.fillRect(0,0,A.W,A.H);
 if(ph==='chal'){pen('The Mesozoic Era',A.W/2,A.H*.34,18,k.fg,900);pen('Triassic · Jurassic · Cretaceous',A.W/2,A.H*.5,13,k.soft,700);A.fx.draw(g);return}
 const t=banner(st.head||'');({order:drawOrder,length:drawLength,dinos:drawDinos,gap:drawGap,meet:drawMeet})[ph](t);footer();A.fx.draw(g)}
function fresh(o){gen++;hold=null;for(const key in st)delete st[key];Object.assign(st,{say:'',oops:false,check:()=>{},placed:[null,null,null],seen:new Set(),d:0,done:[],first:null,gaps:new Set(),q:0},o||{})}
function play(i,list){const my=gen;list.forEach((f,j)=>setTimeout(()=>{if(my===gen&&A.step===i)f()},A.reduced()?30*(j+1):280*(j+1)))}
const doneWhen=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function buttons(){if(!pad)return;pad.innerHTML='';const ph=phase(),add=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
 if(ph==='order')P.forEach(([n],i)=>add('Place '+n,()=>place(i)));
 if(ph==='length')P.forEach(([n],i)=>add('Measure the '+n,()=>measure(i)));
 if(ph==='dinos')P.forEach(([n],i)=>add('Put it in the '+n,()=>dropIn(i)));
 if(ph==='gap')M.MARKS.forEach(([n],i)=>add('Tap the '+n+' mark',()=>mark(i)));
 if(ph==='meet'){add('Could meet',()=>judgePair(true));add('Never met',()=>judgePair(false))}}
function press(p){const ph=phase();if(ph==='chal')return false;
 if(ph==='order'){const cd=(st.cards||[]).find(r=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h);if(cd)hold={i:cd.i,x:p.x,y:p.y};return true}
 if(ph==='length'){const b=st.band;if(b&&p.y>b.y-z(10)&&p.y<b.y+b.h+z(10)){const m=ago(p.x);measure(P.findIndex(q=>m<=q[1]&&m>q[2]))}return true}
 if(ph==='dinos'){if(st.d<M.DINOS.length)hold={x:p.x,y:p.y};return true}
 if(ph==='gap'){const b=st.band;let best=-1,dist=1e9;M.MARKS.forEach(([,m],i)=>{const d=Math.hypot(p.x-at(m),p.y-(b.y-z(14)));if(d<dist){dist=d;best=i}});if(dist<z(34))mark(best);return true}
 if(ph==='meet'){const zn=st.zones;if(zn&&p.y>zn.zy&&p.y<zn.zy+zn.zh)judgePair(p.x<A.W/2);return true}return true}
function drag(p){if(!hold)return;hold.x=p.x;hold.y=p.y;A.redraw()}
function release(p){const ph=phase(),h=hold;hold=null;if(!h){A.redraw();return}
 if(ph==='order'){const s=st.slots;if(p&&p.y<s.y+s.h+z(20))place(h.i);else A.redraw()}
 if(ph==='dinos'){const b=st.band;if(p&&p.y<b.y+b.h+z(30))drop(p.x);else A.redraw()}}
const steps=[
{h:'Three periods in order',p:M.STEPP[0],
 predict:{q:'Which period came first?',opts:['Jurassic','Cretaceous','Triassic'],ans:2},
 task:'Fill the boxes, oldest to youngest',show:()=>play(0,[()=>place(0),()=>place(1),()=>place(2)]),
 go:()=>{fresh({head:'Drag each period card into the boxes, oldest first'});tell('Three empty boxes: oldest, middle, youngest. Cards: Jurassic, Cretaceous, Triassic.');buttons();st.check=doneWhen(0,()=>st.placed[2]!=null,M.DONE[0])}},
{h:'How long was each period?',p:M.STEPP[1],
 predict:{q:'Which period lasted the longest?',opts:['Jurassic','Cretaceous','they were all the same'],ans:1},
 task:'Measure all three periods',show:()=>play(1,[()=>measure(0),()=>measure(1),()=>measure(2)]),
 go:()=>{fresh({head:'Tap each coloured period on the time line'});tell('A time line from 252 million years ago to today, with the three periods coloured.');buttons();st.check=doneWhen(1,()=>st.seen.size===3,M.DONE[1])}},
{h:'Who lived when?',p:M.STEPP[2],
 task:'Place all five dinosaurs',show:()=>play(2,M.DINOS.map(d=>()=>dropIn(d[1]))),
 go:()=>{fresh({head:'Drag the dinosaur card up onto the time line'});tell('Place Coelophysis on the time line.');buttons();st.check=doneWhen(2,()=>st.d>=M.DINOS.length,M.DONE[2])}},
{h:'Mind the gap',p:M.STEPP[3],
 predict:{q:'Who lived closer in time to T. rex?',opts:['Stegosaurus','people today','they were all at the same time'],ans:1},
 task:'Measure both gaps',show:()=>play(3,[()=>mark(0),()=>mark(1),()=>mark(1),()=>mark(2)]),
 go:()=>{fresh({head:'Tap one mark, then another, to measure the gap'});tell('Marks on the time line: Stegosaurus 150, T. rex 67, today 0 million years ago.');buttons();st.check=doneWhen(3,()=>st.gaps.size===2,M.DONE[3])}},
{h:'Could they meet?',p:M.STEPP[4],
 predict:{q:'Could Stegosaurus have fought T. rex?',opts:['yes, they lived at the same time','no, they never met','only in the Triassic'],ans:1},
 task:'Judge all five pairs',show:()=>play(4,M.PAIRS.map(pr=>()=>judgePair(pr[4]))),
 go:()=>{fresh({head:'Look at the two bars. Do they overlap?'});tell('Tyrannosaurus rex and Triceratops: could they meet?');buttons();st.check=doneWhen(4,()=>st.q>=M.PAIRS.length,M.DONE[4])}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
function ask(){pick++;const [q,opts]=M.QZ[pick%M.QZ.length],r=(pick+2)%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.slice(r).concat(opts.slice(0,r)).forEach(([o,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark2(tag)});tell('Challenge: '+q);A.redraw()}
let run2=0;function mark2(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${run2} in a row.`:'✗ '+(M.WHY[tag]||'Look back at the time line.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.22,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{g=A.ctx;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Time line controls'},box);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down:p=>press(p),move:p=>drag(p),up:p=>release(p)});buttons()}});
A.start()})})();
