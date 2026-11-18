/* Flagship: 10 more or 10 less (ages 6-7; CCSS 1.NBT.5, NC Y1/Y2 place value). On a hundred square, 10 more is one row
   down and 10 less is one row up; with tens rods and ones cubes, only the tens digit changes. Learners jump, add and
   remove rods, sort 10-more / 10-less / 1-more cards, and fill a hundred-square jigsaw cross. Big targets, button twins. */
(()=>{
VIS.reg('flagtenjump',c=>{let A,pad,box,qn=-1,streak=0;const Z={};c.fig.classList.add('young');
const mode=()=>['jump','add','take','sort','cross','free','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(t,x,y,px,o){o=o||{};const g=A.ctx,s=Math.round(px*(A.narrow?1:1.15));g.font=`${o.w||800} ${s}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(t,x,y,o.max||A.W-16)}
function box2(x,y,w,h,fill,edge,lw){const g=A.ctx;A.paint.rrect(x,y,w,h,Math.min(12,w/4));g.fillStyle=fill;g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---------- hundred square ---------- */
function sq(){const s=Math.floor(Math.min((A.W-16)/10,(A.H*.74)/10));return{s,x:(A.W-10*s)/2,y:A.H*.12}}
const cellRect=n=>{const q=sq(),i=n-1;return{x:q.x+(i%10)*q.s,y:q.y+Math.floor(i/10)*q.s,w:q.s,h:q.s}};
function cellAt(p){const q=sq(),col=Math.floor((p.x-q.x)/q.s),row=Math.floor((p.y-q.y)/q.s);return col<0||col>9||row<0||row>9?0:row*10+col+1}
function hundred(g,C,lit){const q=sq();for(let n=1;n<=100;n++){const r=cellRect(n),hot=lit[n];g.fillStyle=hot?A.alpha(hot,C.dark?.45:.35):(Math.floor((n-1)/10)%2?A.alpha(C.cy,.07):A.alpha(C.cy,.14));g.fillRect(r.x,r.y,r.w,r.h);
  g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);write(String(n),r.x+r.w/2,r.y+r.h/2,q.s>34?13:11,{w:hot?900:600})}}
function token(g,C,x,y){const q=sq(),r=q.s*.46;g.fillStyle=C.am;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();write(String(Z.at),x,y,q.s>34?14:12,{ink:'#111',w:900})}
function arrowDown(g,C,from,to){const a=cellRect(from),b=cellRect(to),x=a.x+a.w*.85,y0=a.y+a.h*.7,y1=b.y+b.h*.3;g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(x,y0);g.lineTo(x,y1);g.stroke();
 const d=y1>y0?1:-1;g.fillStyle=C.gr;g.beginPath();g.moveTo(x,y1+d*6);g.lineTo(x-6,y1-d*3);g.lineTo(x+6,y1-d*3);g.fill()}
/* ---------- tens rods and ones cubes ---------- */
function mat(){return{x:A.W*.04,y:A.H*.3,w:A.W*.62,h:A.H*.5}}
function store(){return{x:A.W*.7,y:A.H*.3,w:A.W*.26,h:A.H*.5}}
function rods(g,C){const m=mat(),t=Math.floor(Z.n/10),o=Z.n%10,u=Math.min(m.h/11.5,(m.w*.6)/9/1.2);
 box2(m.x,m.y,m.w,m.h,A.alpha(C.tx,.05),C.tx);box2(store().x,store().y,store().w,store().h,A.alpha(C.vi,.1),C.tx);
 write(Z.kind==='add'?'Tens box':'Bin',store().x+store().w/2,store().y+16,12);
 if(Z.kind==='add'){g.fillStyle=C.cy;for(let k=0;k<3;k++){const sx=store().x+store().w/2-u*1.6+k*u*1.1;g.fillRect(sx,store().y+30,u*.9,u*10);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(sx,store().y+30,u*.9,u*10)}write('drag a ten',store().x+store().w/2,store().y+store().h-12,11,{w:700})}
 else write('🗑️',store().x+store().w/2,store().y+store().h/2,30);
 for(let k=0;k<t;k++){const x=m.x+10+k*u*1.25,y=m.y+10;g.fillStyle=Z.flash===k?C.gr:C.cy;g.fillRect(x,y,u,u*10);g.strokeStyle=C.tx;g.lineWidth=1;for(let j=0;j<10;j++)g.strokeRect(x,y+j*u,u,u)}
 for(let k=0;k<o;k++){const x=m.x+m.w-14-u*2.4+(k%2)*u*1.2,y=m.y+10+Math.floor(k/2)*u*1.2;g.fillStyle=C.am;g.fillRect(x,y,u,u);g.strokeStyle=C.tx;g.strokeRect(x,y,u,u)}
 if(Z.held)(g.fillStyle=A.alpha(C.cy,.8),g.fillRect(Z.held.x-u/2,Z.held.y-u*5,u,u*10));
 const ds=A.narrow?40:46,cx=A.W*.35,y=A.H*.15;write(String(t),cx-ds*.5,y,ds,{ink:C.ac,w:900});write(String(o),cx+ds*.5,y,ds,{w:900});
 write('tens',cx-ds*.5,y+ds*.68,13,{ink:C.tx,w:800});write('ones',cx+ds*.5,y+ds*.68,13,{w:800});
 write(Z.msg||'',A.W/2,A.H*.9,13,{w:700})}
/* ---------- card sort ---------- */
const SETS=[[37,[[47,0],[27,1],[38,2]]],[81,[[91,0],[71,1],[82,2]]]],BINS=['10 more','10 less','1 more'];
function bins(){const w=(A.W-32)/3,h=A.H*.3;return BINS.map((_,i)=>({x:8+i*(w+8),y:A.H*.62,w,h}))}
function cards(){const set=SETS[Z.round]||SETS[0],w=Math.min(84,(A.W-40)/3),h=Math.min(60,A.H*.15);return set[1].map((it,i)=>Z.where[i]!=null?(()=>{const b=bins()[Z.where[i]];return{x:b.x+b.w/2-w/2,y:b.y+b.h-h-8,w,h}})():{x:A.W/2-1.5*w-12+i*(w+12),y:A.H*.3,w,h})}
function sortPic(g,C){const set=SETS[Z.round];if(!set){write('10 more: tens digit up 1. 10 less: down 1.',A.W/2,A.H*.45,15);return}
 write(`Start number: ${set[0]}`,A.W/2,A.H*.1,20,{w:900});write(Z.msg||'Drag each card to its box, or tap a card then a box.',A.W/2,A.H*.2,12,{w:700});
 bins().forEach((b,i)=>{box2(b.x,b.y,b.w,b.h,A.alpha([C.gr,C.vi,C.am][i],Z.bad===i?.4:.16),C.tx,Z.bad===i?4:2);write(BINS[i],b.x+b.w/2,b.y+16,13)});
 cards().forEach((r,i)=>{const it=set[1][i];let rr=r;if(Z.drag&&Z.drag.i===i)rr={...r,x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2};
  box2(rr.x,rr.y,rr.w,rr.h,Z.pick===i?A.alpha(C.ac,.35):C.pn,C.tx,Z.pick===i?4:2);write(String(it[0]),rr.x+rr.w/2,rr.y+rr.h/2,22,{w:900})})}
/* ---------- hundred-square jigsaw cross ---------- */
const MID=45,SLOTS=[[MID-10,0,-1],[MID+10,0,1],[MID-1,-1,0],[MID+1,1,0]],TILES=[55,35,46,44];
function crossSize(){return Math.min(A.W/6.2,A.H/6.4)}
function slotRect(k){const s=crossSize(),cx=A.W/2,cy=A.H*.38;if(k<0)return{x:cx-s/2,y:cy-s/2,w:s,h:s};const d=SLOTS[k];return{x:cx-s/2+d[1]*s,y:cy-s/2+d[2]*s,w:s,h:s}}
function tileRect(i){const s=crossSize()*.92,gap=10,tot=TILES.length*s+(TILES.length-1)*gap;return{x:A.W/2-tot/2+i*(s+gap),y:A.H*.8,w:s,h:s*.8}}
function crossPic(g,C){const s=crossSize();box2(slotRect(-1).x,slotRect(-1).y,s,s,A.alpha(C.am,.45),C.tx,3);write(String(MID),A.W/2,A.H*.38,22,{w:900});
 SLOTS.forEach((d,k)=>{const r=slotRect(k),got=Z.fill[k];box2(r.x,r.y,r.w,r.h,got?A.alpha(C.gr,.3):Z.bad===k?A.alpha(C.rd,.3):A.alpha(C.tx,.05),C.tx,2);write(got?String(d[0]):'?',r.x+r.w/2,r.y+r.h/2,got?20:18,{w:900,ink:got?C.tx:C.mu})});
 write(Z.msg||'Drag each number tile into its box in the square.',A.W/2,A.H*.07,13,{w:700});
 TILES.forEach((n,i)=>{if(Z.used[i])return;let r=tileRect(i);if(Z.drag&&Z.drag.i===i)r={...r,x:Z.drag.x-r.w/2,y:Z.drag.y-r.h/2};box2(r.x,r.y,r.w,r.h,Z.pick===i?A.alpha(C.ac,.35):C.pn,C.tx,Z.pick===i?4:2);write(String(n),r.x+r.w/2,r.y+r.h/2,20,{w:900})})}
/* ---------- paint ---------- */
function paint(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.06:.3);g.fillRect(0,0,W,H);
 if(m==='jump'){const lit={};lit[Z.from]=C.vi;lit[Z.at]=C.am;if(Z.trail.length)Z.trail.forEach(n=>lit[n]=lit[n]||C.gr);hundred(g,C,lit);Z.trail.forEach((n,i)=>arrowDown(g,C,i?Z.trail[i-1]:Z.from,n));
  const r=cellRect(Z.at),tx=Z.drag?Z.drag.x:r.x+r.w/2,ty=Z.drag?Z.drag.y:r.y+r.h/2;token(g,C,tx,ty);write(Z.msg||'Drag the counter, or use the buttons.',W/2,H*.05,13,{w:700});write('10 more = one row down',W/2,H*.95,12,{w:700})}
 if(m==='free'){const lit={};if(Z.at){lit[Z.at]=C.am;if(Z.at>10)lit[Z.at-10]=C.vi;if(Z.at<=90)lit[Z.at+10]=C.gr}hundred(g,C,lit);
  write(Z.at?`${Z.at}: 10 less is ${Z.at>10?Z.at-10:'off the square'}, 10 more is ${Z.at<=90?Z.at+10:'off the square'}`:'Tap any number.',W/2,H*.05,13,{w:800});write('Same column: the ones digit stays the same.',W/2,H*.95,12,{w:700})}
 if(m==='add'||m==='take')rods(g,C);
 if(m==='sort')sortPic(g,C);
 if(m==='cross')crossPic(g,C);
 if(m==='chal'){write('10 more or 10 less?',W/2,H*.32,20,{w:900});write('Change the tens digit by 1. Keep the ones.',W/2,H*.52,14,{w:700})}
 A.fx.draw(g)}
/* ---------- actions ---------- */
function moveTo(n){if(mode()!=='jump'||n<1||n>100)return;const d=n-Z.at;
 if(d===10){Z.trail.push(n);Z.at=n;A.sound.pop();Z.msg=`${n-10} → ${n}: one row down, 10 more.`}
 else if(d===1){A.sound.miss();Z.msg=`${n} is only 1 more. 10 more is the number right under it.`}
 else if(d===-10){A.sound.miss();Z.msg=`${n} is 10 less: one row up. Go down for 10 more.`}
 else if(d!==0){A.sound.miss();Z.msg=`Not that one. Find ${Z.at} and go straight down one row.`}
 speak(Z.msg);paint2();Z.want()}
function addTen(){if(mode()!=='add'||Z.n>=90)return;Z.n+=10;Z.flash=Math.floor(Z.n/10)-1;A.sound.pop();Z.msg=`${Z.n-10} + 10 = ${Z.n}. Only the tens digit changed.`;speak(Z.msg);paint2();Z.want()}
function takeTen(){if(mode()!=='take'||Z.n<20)return;Z.n-=10;Z.flash=null;Z.count++;A.sound.pop();Z.msg=`${Z.n+10} − 10 = ${Z.n}. The ones stay ${Z.n%10}.`;speak(Z.msg);paint2();Z.want()}
function takeOne(){if(mode()!=='take')return;A.sound.miss();Z.msg=`Taking a cube is 1 less (${Z.n-1}). For 10 less, take a whole ten rod.`;speak(Z.msg);paint2()}
function drop(i,b){const set=SETS[Z.round];if(!set||Z.where[i]!=null)return;const it=set[1][i],n=it[0],s=set[0];
 if(b===it[1]){Z.where[i]=b;A.sound.pop();Z.msg=`${n} is ${BINS[b]} than ${s}.`;if(Z.where.every(w=>w!=null)){Z.round++;Z.where=[null,null,null];if(SETS[Z.round])Z.msg=`Now start from ${SETS[Z.round][0]}.`}}
 else{A.sound.miss();Z.bad=b;setTimeout(()=>{Z.bad=null;paint2()},A.reduced()?10:700);
  Z.msg=it[1]===2?`${n} is only 1 more: the ones digit changed. 10 more changes the tens.`:it[1]===0&&b===1?`${n} is bigger than ${s}, so it is more, not less.`:it[1]===1&&b===0?`${n} is smaller than ${s}, so it is 10 less.`:`${n}: the tens digit moved by 1, so it is 10 ${n>s?'more':'less'}.`}
 Z.pick=null;speak(Z.msg);paint2();Z.want()}
function place(i,k){if(Z.used[i]||Z.fill[k])return;const n=TILES[i],want=SLOTS[k][0];
 if(n===want){Z.used[i]=1;Z.fill[k]=1;A.sound.pop();Z.msg=k===0?`${n} is above: 10 less.`:k===1?`${n} is below: 10 more.`:k===2?`${n} is left: 1 less.`:`${n} is right: 1 more.`}
 else{A.sound.miss();Z.bad=k;setTimeout(()=>{Z.bad=null;paint2()},A.reduced()?10:700);
  Z.msg=k<2&&Math.abs(n-MID)===1?`${n} is next door, 1 away. Up and down jump 10.`:k===0&&n===55?`Up is 10 less, so it is smaller than 45.`:k===1&&n===35?`Down is 10 more, so it is bigger than 45.`:`Left and right change by 1: 44 and 46.`}
 Z.pick=null;speak(Z.msg);paint2();Z.want()}
/* ---------- buttons ---------- */
function paint2(){A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},pad,t).onclick=f};
 if(m==='jump'){b('10 more ↓',()=>moveTo(Z.at+10),'Move the counter 10 more, one row down');b('1 more →',()=>moveTo(Z.at+1),'Move the counter 1 more');b('10 less ↑',()=>moveTo(Z.at-10),'Move the counter 10 less, one row up')}
 if(m==='add')b('Add a ten',addTen,'Add one ten rod');
 if(m==='take'){b('Take a ten',takeTen,'Take away one ten rod');b('Take a cube',takeOne,'Take away one ones cube')}
 if(m==='sort'&&SETS[Z.round]){const set=SETS[Z.round];if(Z.pick==null)set[1].forEach((it,i)=>{if(Z.where[i]==null)b('Pick '+it[0],()=>{Z.pick=i;speak(`${it[0]} picked. Now choose a box.`);paint2()},`Pick card ${it[0]}`)});
  else BINS.forEach((nm,k)=>b('Put in '+nm,()=>drop(Z.pick,k),`Put ${set[1][Z.pick][0]} in ${nm}`))}
 if(m==='cross'){if(Z.pick==null)TILES.forEach((n,i)=>{if(!Z.used[i])b('Pick '+n,()=>{Z.pick=i;speak(`${n} picked. Now choose a box.`);paint2()},`Pick tile ${n}`)});
  else['above','below','left','right'].forEach((w,k)=>{if(!Z.fill[k])b('Put '+w,()=>place(Z.pick,k),`Put ${TILES[Z.pick]} ${w} 45`)})}
 if(m==='free')[23,58,90].forEach(n=>b('Try '+n,()=>{Z.at=n;speak(`${n}: 10 more is ${n<=90?n+10:'off the square'}, 10 less is ${n-10}.`);paint2()}))}
/* ---------- pointer ---------- */
function down(p){const m=mode();
 if(m==='jump'){const r=cellRect(Z.at);if(Math.hypot(p.x-r.x-r.w/2,p.y-r.y-r.h/2)<sq().s){Z.drag={x:p.x,y:p.y};return true}const n=cellAt(p);if(n)moveTo(n);return false}
 if(m==='free'){const n=cellAt(p);if(n){Z.at=n;speak(`${n}: 10 more is ${n<=90?n+10:'off the square'}.`);paint2()}return false}
 if(m==='add'){if(inside(p,store())){Z.held={x:p.x,y:p.y};return true}return false}
 if(m==='take'){const mt=mat();if(inside(p,mt)){if(p.x<mt.x+mt.w*.6){Z.held={x:p.x,y:p.y};return true}takeOne()}return false}
 if(m==='sort'){const cs=cards(),i=cs.findIndex((r,j)=>Z.where[j]==null&&inside(p,r));if(i>=0){Z.drag={i,x:p.x,y:p.y};Z.pick=i;paint2();return true}
  const k=bins().findIndex(r=>inside(p,r));if(k>=0&&Z.pick!=null)drop(Z.pick,k);return false}
 if(m==='cross'){const i=TILES.findIndex((_,j)=>!Z.used[j]&&inside(p,tileRect(j)));if(i>=0){Z.drag={i,x:p.x,y:p.y};Z.pick=i;paint2();return true}
  const k=SLOTS.findIndex((_,j)=>inside(p,slotRect(j)));if(k>=0&&Z.pick!=null)place(Z.pick,k);return false}
 return false}
function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}if(Z.held){Z.held.x=p.x;Z.held.y=p.y;A.redraw()}}
function up(p){const m=mode(),d=Z.drag,h=Z.held;Z.drag=null;Z.held=null;if(!p){A.redraw();return}
 if(m==='jump'&&d){const n=cellAt(p);if(n)moveTo(n);else A.redraw()}
 if(m==='add'&&h){inside(p,mat())?addTen():A.redraw()}
 if(m==='take'&&h){inside(p,store())?takeTen():A.redraw()}
 if(m==='sort'&&d){const k=bins().findIndex(r=>inside(p,r));k>=0?drop(d.i,k):paint2()}
 if(m==='cross'&&d){const k=SLOTS.findIndex((_,j)=>inside(p,slotRect(j)));k>=0?place(d.i,k):paint2()}}
/* ---------- steps ---------- */
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,list){steps[n].go();const k=++Z.k;list.forEach((f,j)=>setTimeout(()=>{if(k===Z.k)f()},A.reduced()?30*(j+1):(j+1)*350))}
function fresh(o){const k=(Z.k||0)+1;for(const x in Z)delete Z[x];Object.assign(Z,{k,want:()=>{},at:23,from:23,trail:[],n:46,kind:'add',flash:null,count:0,round:0,where:[null,null,null],fill:[0,0,0,0],used:[0,0,0,0],pick:null,bad:null,drag:null,held:null,msg:''},o||{})}
const steps=[
{h:'One row down',p:'On a hundred square, each row has 10 numbers. The number right under another is 10 more.',
 predict:{q:'What is 10 more than 23?',opts:['33','24','32'],ans:0},task:'Jump 10 more, then 10 more again',
 show:()=>play(0,[()=>moveTo(33),()=>moveTo(43)]),
 go:()=>{fresh();speak('Start on 23. Move the counter 10 more.');buttons();Z.want=finish(0,()=>Z.at===43,'23, 33, 43. Each jump down is 10 more.')}},
{h:'Add a ten',p:'46 is 4 tens and 6 ones. Add one ten rod. Watch which digit changes.',
 predict:{q:'Add one ten to 46. Which digit changes?',opts:['The tens digit','The ones digit','Both digits'],ans:0},task:'Add tens to make 76',
 show:()=>play(1,[addTen,addTen,addTen]),
 go:()=>{fresh({n:46,kind:'add',msg:'Drag a ten rod onto the mat.'});speak('46. Add a ten rod.');buttons();Z.want=finish(1,()=>Z.n===76,'46, 56, 66, 76. The 6 ones never moved.')}},
{h:'Take a ten',p:'10 less means take away one whole ten. The ones do not change.',
 predict:{q:'What is 10 less than 58?',opts:['48','57','68'],ans:0},task:'Make 10 less, two times',
 show:()=>play(2,[takeTen,takeTen]),
 go:()=>{fresh({n:58,kind:'take',msg:'Drag a ten rod to the bin.'});speak('58. Take away a ten rod.');buttons();Z.want=finish(2,()=>Z.count>=2&&Z.n===38,'58, 48, 38. The tens digit went down by 1 each time.')}},
{h:'More, less or 1 more?',p:'Look at the digits. 10 more or 10 less changes the tens. 1 more changes the ones.',task:'Sort the cards for 37 and 81',
 show:()=>play(3,[0,1,2].map(i=>()=>drop(i,SETS[0][1][i][1])).concat([0,1,2].map(i=>()=>drop(i,SETS[1][1][i][1])))),
 go:()=>{fresh();speak('Sort the cards for 37.');buttons();Z.want=finish(3,()=>Z.round>=2,'47 and 91 are 10 more. 27 and 71 are 10 less. 38 and 82 are 1 more.')}},
{h:'Fix the square',p:'This is a piece cut from a hundred square. Above is 10 less, below is 10 more, and the sides are 1 less and 1 more.',
 predict:{q:'Which number goes right under 45?',opts:['55','46','35'],ans:0},task:'Fill the 4 boxes',
 show:()=>play(4,[()=>place(1,0),()=>place(0,1),()=>place(3,2),()=>place(2,3)]),
 go:()=>{fresh({msg:''});speak('Fill the boxes around 45.');buttons();Z.want=finish(4,()=>Z.fill.every(Boolean),'35 above, 55 below, 44 left, 46 right.')}},
{h:'Your turn',p:'Tap any number. See 10 less above it and 10 more below it. The ones digit stays the same in a column.',
 go:()=>{fresh({at:0});speak('Tap any number on the square.');buttons()}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
/* ---------- challenge ---------- */
function makeQ(){const up=qn%2===0,n=11+((qn*37+19)%79),a=up?n+10:n-10;
 const opts=[[a,'ok'],[up?n+1:n-1,'one'],qn%3===2?[up?a+1:a-1,'ones']:[up?n-10:n+10,'way']];
 return{q:`What is 10 ${up?'more':'less'} than ${n}?`,n,up,opts}}
function why(t,Q){let m=`10 ${Q.up?'more':'less'} than ${Q.n}: the tens digit goes ${Q.up?'up':'down'} by 1 and the ones stay.`;
 if(t==='one')m=`That is 1 ${Q.up?'more':'less'}. You changed the ones digit. 10 ${Q.up?'more':'less'} changes the tens digit.`;
 if(t==='way')m=`That went the wrong way. 10 ${Q.up?'more is bigger: one row down':'less is smaller: one row up'}.`;
 if(t==='ones')m=`The ones digit should not change. Keep the ${Q.n%10} and change only the tens.`;
 return m}
function ask(){qn++;const Q=makeQ(),sh=(qn+1)%3;box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...Q.opts.slice(sh),...Q.opts.slice(0,sh)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,String(v)).onclick=()=>mark(t,Q)});speak('Challenge: '+Q.q);A.redraw()}
function mark(t,Q){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} in a row.`:'✗ '+why(t,Q))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw:paint,onStep:A=>{box.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Ten more ten less controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
