/* Flagship: Place value of each digit (ages 8-9; NC Y4 "recognise the place value of each digit in a four-digit number
   (thousands, hundreds, tens, and ones)"; CCSS 4.NBT.1-2). Place value counters (1000, 100, 10, 1) on a Th-H-T-O chart:
   build 3,452, reveal what each 5 in 5,555 is worth, hold an empty place with 0, exchange ten 100s for one 1000, and
   drop jumbled parts into their columns. Distinct from flag3digit (H-T-O base-ten blocks), flagplace (x10 / ÷10 shifts),
   flagtenten (10 tens = 100). Every drag has a button twin. */
(()=>{
VIS.reg('flagpvc',c=>{let A,pad,box,qn=-1,streak=0;const Z={};c.fig.classList.add('young');
const PL=['thousands','hundreds','tens','ones'],SH=['Th','H','T','O'],VAL=[1000,100,10,1];
const mode=()=>['build','worth','zero','swap','parts','free','chal'][A.step];
const comma=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');
const total=()=>Z.c.reduce((s,k,i)=>s+k*VAL[i],0);
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const hue=i=>[A.col.vi,A.col.gr,A.col.am,A.col.cy][i];
/* ---------- layout ---------- */
function colW(){return(A.W-20)/4}
function column(i){const w=colW();return{x:10+i*w,y:A.H*.25,w:w-4,h:A.H*.5}}
function digitBox(i){const w=Math.min(colW()-10,62);return{x:column(i).x+(colW()-4-w)/2,y:A.H*.07,w,h:A.H*.12}}
function rad(){return Math.max(9,Math.min(colW()/6.8,A.H*.035))}
function spot(i,k){const r=column(i),R=rad();return{x:r.x+r.w*((k%3)+.5)/3,y:r.y+30+R+Math.floor(k/3)*(2*R+4)}}
function trayDisc(i){const r=column(i);return{x:r.x+r.w/2,y:A.H*.84,r:rad()*1.35}}
function card(i){const n=Z.parts.length,w=Math.min(78,(A.W-24)/n-8),h=A.H*.1;return{x:A.W/2-(n*(w+8))/2+i*(w+8)+4,y:A.H*.83,w,h}}
/* ---------- drawing ---------- */
function disc(g,x,y,r,i,lit){const C=A.col;g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=A.alpha(hue(i),lit?.7:C.dark?.45:.3);g.fill();g.lineWidth=2;g.strokeStyle=hue(i);g.stroke();
 ink(String(VAL[i]),x,y+.5,Math.max(8,r*(i?.85:.68)),{w:900,max:r*1.9})}
function chart(g,C){for(let i=0;i<4;i++){const r=column(i),k=Z.c[i],full=k>9;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=A.alpha(hue(i),Z.flash===i?.25:.08);g.fill();g.lineWidth=full?4:2;g.strokeStyle=full?C.rd:A.alpha(C.tx,.6);g.stroke();
  ink(`${SH[i]} · ${PL[i]}`,r.x+r.w/2,r.y+14,A.narrow?10:11,{w:800,max:r.w-6});
  if(mode()==='worth'&&Z.seen[i])ink('= '+comma(5*VAL[i]),r.x+r.w/2,r.y+r.h-22,15,{w:900,max:r.w-4});
  for(let j=0;j<Math.min(k,15);j++){const s=spot(i,j);if(Z.drag&&Z.drag.src==='col'&&Z.drag.i===i&&j===k-1)continue;disc(g,s.x,s.y,rad(),i,Z.seen&&Z.seen[i])}}}
function digits(g,C){for(let i=0;i<4;i++){const b=digitBox(i),k=Z.c[i],bad=k>9;A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fillStyle=bad?A.alpha(C.rd,.2):A.alpha(hue(i),Z.pickD===i?.45:.14);g.fill();g.lineWidth=Z.pickD===i?4:2;g.strokeStyle=bad?C.rd:C.tx;g.stroke();
  ink(String(k),b.x+b.w/2,b.y+b.h/2+1,bad?20:28,{w:900})}
 const b=digitBox(0);ink(',',column(1).x-2,b.y+b.h*.78,26,{w:900})}
function paint(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.07:.32);g.fillRect(0,0,W,H);
 if(m==='chal'){ink('What is each digit worth?',W/2,H*.3,19,{w:900});ink('Th · H · T · O: each place is 10 times the next.',W/2,H*.5,13,{w:700});A.fx.draw(g);return}
 digits(g,C);chart(g,C);
 if(m==='parts')Z.parts.forEach((v,i)=>{if(Z.used[i])return;let r=card(i);if(Z.drag&&Z.drag.src==='card'&&Z.drag.i===i)r={...r,x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2};A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=Z.pick===i?A.alpha(C.ac,.35):C.pn;g.fill();g.lineWidth=Z.pick===i?4:2;g.strokeStyle=C.tx;g.stroke();ink(String(v),r.x+r.w/2,r.y+r.h/2,17,{w:900})});
 else if(m!=='worth'&&m!=='swap')for(let i=0;i<4;i++){const d=trayDisc(i);disc(g,d.x,d.y,d.r,i);}
 if(m!=='parts'&&m!=='worth'&&m!=='swap')ink('Drag a counter up, or tap it',W/2,H*.92,11,{w:700,col:C.tx});
 if(Z.drag&&Z.drag.src!=='card')disc(g,Z.drag.x,Z.drag.y,rad()*1.2,Z.drag.i,true);
 ink(Z.msg||'',W/2,H*.785,12,{w:700,max:W-16});A.fx.draw(g)}
/* ---------- actions ---------- */
function tell(t){Z.msg=t;speak(t);paint2();Z.want()}
function add(i){const m=mode();if(m==='worth'||m==='swap'||m==='parts')return;if(Z.c[i]>=9){A.sound.miss();return tell(`A column holds at most 9 counters here. 10 ${PL[i]} would make the next place.`)}
 Z.c[i]++;Z.flash=i;A.sound.pop();const n=total(),t=Z.target;let s=`Added a ${VAL[i]}. Now ${comma(n)}.`;
 if(t&&Z.c[i]>digitOf(t,i))s=`That is ${Z.c[i]} ${PL[i]}, but ${comma(t)} has ${digitOf(t,i)}. Take one away.`;
 tell(s)}
function take(i){const m=mode();if(m==='worth'||m==='swap'||m==='parts'||!Z.c[i])return;Z.c[i]--;Z.flash=i;A.sound.tick();tell(`Took away a ${VAL[i]}. Now ${comma(total())}.`)}
const digitOf=(n,i)=>Math.floor(n/VAL[i])%10;
function wrongCol(src,dst){A.sound.miss();Z.flash=dst;tell(`That is a ${VAL[src]} counter. It belongs in the ${PL[src]} column, not ${PL[dst]}.`)}
function reveal(i){if(mode()!=='worth')return;Z.seen[i]=1;Z.pickD=i;A.sound.pop();tell(`This 5 is in the ${PL[i]} place, so it is worth ${comma(5*VAL[i])}.`)}
function exchange(){if(mode()!=='swap')return;if(Z.c[1]<10){A.sound.miss();return tell('You need ten 100s to swap for one 1000.')}
 Z.c[1]-=10;Z.c[0]++;Z.flash=0;A.sound.pop();tell(`Ten 100s became one 1000. Still ${comma(total())}, and now every place has one digit.`)}
function place(k,i){if(mode()!=='parts'||Z.used[k])return;const v=Z.parts[k],want=String(v).length===4?0:String(v).length===3?1:String(v).length===2?2:3;
 if(i!==want){A.sound.miss();Z.bad=i;Z.pick=null;return tell(`${v} is ${String(v)[0]} ${PL[want]}, so it goes in the ${PL[want]} column.`)}
 Z.used[k]=1;Z.c[i]=Number(String(v)[0]);Z.flash=i;Z.pick=null;A.sound.pop();tell(`${v} is ${Z.c[i]} ${PL[i]}. The number so far: ${comma(total())}.`)}
/* ---------- buttons ---------- */
function paint2(){A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},pad,t).onclick=f};
 if(m==='build'||m==='zero'||m==='free'){VAL.forEach((v,i)=>b('+ '+v,()=>add(i),`Add a ${v} counter to the ${PL[i]} column`));VAL.forEach((v,i)=>b('− '+v,()=>take(i),`Take a ${v} counter from the ${PL[i]} column`))}
 if(m==='free')b('Clear',()=>{Z.c=[0,0,0,0];tell('Empty chart. Build any number.')},'Clear the chart');
 if(m==='worth')SH.forEach((s,i)=>b(`${s} 5`,()=>reveal(i),`Show what the ${PL[i]} 5 is worth`));
 if(m==='swap')b('Swap ten 100s for one 1000',exchange,'Swap ten hundred counters for one thousand counter');
 if(m==='parts'){if(Z.pick==null)Z.parts.forEach((v,k)=>{if(!Z.used[k])b('Pick '+v,()=>{Z.pick=k;speak(`${v} picked. Now choose a column.`);paint2()},`Pick part ${v}`)});
  else SH.forEach((s,i)=>b('Put in '+s,()=>place(Z.pick,i),`Put ${Z.parts[Z.pick]} in the ${PL[i]} column`))}}
/* ---------- pointer ---------- */
function colAt(p){for(let i=0;i<4;i++){const r=column(i);if(hit(p,{x:r.x,y:r.y,w:r.w+4,h:r.h}))return i}return-1}
function down(p){const m=mode();
 if(m==='worth'){for(let i=0;i<4;i++)if(hit(p,digitBox(i))||hit(p,column(i)))reveal(i);return false}
 if(m==='parts'){const k=Z.parts.findIndex((_,j)=>!Z.used[j]&&hit(p,card(j)));if(k>=0){Z.drag={src:'card',i:k,x:p.x,y:p.y};Z.pick=k;paint2();return true}const i=colAt(p);if(i>=0&&Z.pick!=null)place(Z.pick,i);return false}
 if(m==='swap'){const i=colAt(p);if(i===1&&Z.c[1]){Z.drag={src:'col',i:1,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(i>=0)tell(i===0?'Drag a 100 from the hundreds column onto the thousands.':'Look at the hundreds: 13 counters is too many for one digit.');return false}
 for(let i=0;i<4;i++){const d=trayDisc(i);if(Math.hypot(p.x-d.x,p.y-d.y)<d.r+8){Z.drag={src:'tray',i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}
 const i=colAt(p);if(i>=0&&Z.c[i]){Z.drag={src:'col',i,x:p.x,y:p.y,x0:p.x,y0:p.y};paint2();return true}return false}
function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){const d=Z.drag;Z.drag=null;if(!d||!p){A.redraw();return}const tap=Math.hypot(p.x-(d.x0??p.x),p.y-(d.y0??p.y))<8,i=colAt(p);
 if(d.src==='card'){i>=0?place(d.i,i):paint2();return}
 if(mode()==='swap'){i===0?exchange():tap?tell('Drag a 100 counter up onto the thousands column.'):A.redraw();return}
 if(d.src==='tray'){if(tap||i===d.i)add(d.i);else if(i>=0)wrongCol(d.i,i);else A.redraw();return}
 if(d.src==='col'){if(tap||i<0)take(d.i);else if(i!==d.i)wrongCol(d.i,i);else A.redraw()}}
/* ---------- steps ---------- */
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,list){steps[n].go();const k=++Z.k;list.forEach((f,j)=>setTimeout(()=>{if(k===Z.k)f()},A.reduced()?30*(j+1):(j+1)*300))}
const fill=t=>[0,1,2,3].map(i=>()=>{for(let j=0;j<digitOf(t,i);j++)add(i)});
const same=(a,b)=>a.every((x,i)=>x===b[i]);
function fresh(o){const k=(Z.k||0)+1;for(const x in Z)delete Z[x];Object.assign(Z,{k,want:()=>{},c:[0,0,0,0],target:0,seen:[0,0,0,0],pickD:null,parts:[],used:[],pick:null,bad:null,flash:null,drag:null,msg:''},o||{})}
const steps=[
{h:'Build 3,452',p:'Each column is a place. A counter in the thousands column is worth 1000. Build the number with counters.',
 predict:{q:'How many 100 counters does 3,452 need?',opts:['4','400','3'],ans:0},task:'Build 3,452 with place value counters',
 show:()=>play(0,fill(3452)),
 go:()=>{fresh({target:3452,msg:'Drag counters up into the chart.'});speak('Build 3,452. Drag counters into the columns.');buttons();Z.want=finish(0,()=>same(Z.c,[3,4,5,2]),'3 thousands, 4 hundreds, 5 tens and 2 ones make 3,452.')}},
{h:'Same digit, new value',p:'All four digits of 5,555 are 5. Tap each 5 to see what it is worth.',
 predict:{q:'In 5,555, are all the 5s worth the same?',opts:['No: each 5 is worth 10 times the 5 to its right','Yes: they are all just 5','No: the 5 on the right is worth the most'],ans:0},task:'Tap all four 5s',
 show:()=>play(1,[0,1,2,3].map(i=>()=>reveal(i))),
 go:()=>{fresh({c:[5,5,5,5],msg:'Tap a 5 at the top, or its column.'});speak('5,555. Tap each 5.');buttons();Z.want=finish(1,()=>Z.seen.every(Boolean),'5000 + 500 + 50 + 5. The place gives the digit its value.')}},
{h:'Zero holds a place',p:'3,052 has no hundreds. The empty column still needs a digit: 0.',
 predict:{q:'Can you leave the 0 out of 3,052?',opts:['No: the 3 would slide to the hundreds and make 352','Yes: zero is worth nothing','Yes: write 3,52'],ans:0},task:'Build 3,052',
 show:()=>play(2,fill(3052)),
 go:()=>{fresh({target:3052,msg:'Build 3,052. Leave one column empty.'});speak('Build 3,052.');buttons();Z.want=()=>{if(same(Z.c,[0,3,5,2])){Z.msg='That shows 352. The 3 must be thousands: 3,052.';speak(Z.msg)}finish(2,()=>same(Z.c,[3,0,5,2]),'3 thousands, 0 hundreds, 5 tens, 2 ones. The 0 keeps the 3 in the thousands place.')()}}},
{h:'Ten for one',p:'The hundreds column has 13 counters. A place can only show one digit, 0 to 9. Ten 100s make one 1000.',
 predict:{q:'13 hundreds is the same as …',opts:['1 thousand and 3 hundreds','13 thousands','1 hundred and 3 tens'],ans:0},task:'Drag a 100 onto the thousands to swap ten for one',
 show:()=>play(3,[exchange]),
 go:()=>{fresh({c:[2,13,4,6],msg:'Drag a 100 up onto the thousands column.'});speak('2 thousands, 13 hundreds, 4 tens and 6 ones. Swap ten 100s for one 1000.');buttons();Z.want=finish(3,()=>same(Z.c,[3,3,4,6]),'2,000 + 1,300 + 46 = 3,346. Same number, one digit in each place.')}},
{h:'Parts in any order',p:'The parts are jumbled: 80, 6000, 9 and 700. Drop each part in its own column.',
 predict:{q:'What is 80 + 6000 + 9 + 700?',opts:['6,789','8,697','6,879'],ans:0},task:'Put every part in its column',
 show:()=>play(4,[()=>place(0,2),()=>place(1,0),()=>place(2,3),()=>place(3,1)]),
 go:()=>{fresh({parts:[80,6000,9,700],used:[0,0,0,0],msg:'Drag a part card into a column.'});speak('Put 80, 6000, 9 and 700 in their columns.');buttons();Z.want=finish(4,()=>Z.used.every(Boolean),'6 thousands, 7 hundreds, 8 tens, 9 ones: 6,789. Order the parts by place, not as they are written.')}},
{h:'Your turn',p:'Build any number. Each place is worth 10 times the place to its right.',
 go:()=>{fresh({msg:'Build any four-digit number.'});speak('Build any number with counters.');buttons();Z.want=()=>{const n=total();if(n)Z.msg=`${comma(n)} = `+Z.c.map((k,i)=>k*VAL[i]).filter(Boolean).join(' + ');speak(Z.msg)}}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
/* ---------- challenge ---------- */
function makeQ(){const r=k=>1+((qn*k+7)%9),d=[r(5),r(7),r(4),r(8)];
 if(qn%2===0){const p=[1,2,0][(qn>>1)%3],n=d[0]*1000+d[1]*100+d[2]*10+d[3],v=d[p]*VAL[p];
  return{q:`What is the ${d[p]} in ${comma(n)} worth?`,kind:'val',n,p,dig:d[p],opts:[[v,'ok'],[d[p],'digit'],[v*10,'place']]}}
 if(d[2]===d[3])d[3]=d[3]%9+1;const n=d[0]*1000+d[2]*10+d[3];
 return{q:`Which number is ${d[0]*1000} + ${d[2]*10} + ${d[3]}?`,kind:'make',n,d,opts:[[n,'ok'],[d[0]*100+d[2]*10+d[3],'zero'],[d[0]*1000+d[3]*10+d[2],'order']]}}
function why(t,Q){let m=`Count the places from the right: ones, tens, hundreds, thousands.`;
 if(t==='digit')m=`That is just the digit. It sits in the ${PL[Q.p]} place, so it is worth ${comma(Q.dig*VAL[Q.p])}.`;
 if(t==='place')m=`That is one place too far left. The ${Q.dig} is in the ${PL[Q.p]} place: ${comma(Q.dig*VAL[Q.p])}.`;
 if(t==='zero')m=`You left out the zero. There are no hundreds, so write 0 to hold that place: ${comma(Q.n)}.`;
 if(t==='order')m=`The tens and ones swapped. ${Q.d[2]*10} is ${Q.d[2]} tens, so ${Q.d[2]} goes in the tens place.`;
 return m}
function ask(){qn++;const Q=makeQ(),sh=(qn+1)%3;box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...Q.opts.slice(sh),...Q.opts.slice(0,sh)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,comma(v)).onclick=()=>mark(t,Q)});speak('Challenge: '+Q.q);A.redraw()}
function mark(t,Q){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} in a row.`:'✗ '+why(t,Q))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.25,draw:paint,onStep:A=>{box.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Place value counter controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
