/* Flagship – early word problems to 20 (ages 5–7; CCSS 1.OA.1; NC Y1 incl. 7 = □ − 9): part–whole bar, count on to a
   missing part, missing start, compare, sense checks. Not flagstory (acting out within 10). */
(()=>{const mn=Math.min,mx=Math.max;
const SLOTQ=[{s:'Ben has 7 red cars and 5 blue cars. He has 12 cars.',w:12,p:[7,5]},{s:'There were 15 apples. 6 were eaten. 9 are left.',w:15,p:[6,9]},{s:'Zara has 11 pens: 3 green and 8 blue.',w:11,p:[3,8]}];
const FILLQ=[{s:'Mia has 7 shells. She finds more. Now she has 12. How many did she find?',have:7,w:12,n:'shells'},
 {s:'9 children are on a bus. More get on. Now there are 15. How many got on?',have:9,w:15,n:'children'},
 {s:'Tom had 13 stickers. He gave some away. 6 are left. How many went?',have:6,w:13,n:'stickers'}];
const STARTQ=[{s:'Some birds sat on a fence. 5 flew away. 8 are left. How many at first?',good:'8 + 5 = 13',bad:'8 − 5 = 3',miss:'8 − 5 = 3, but 5 birds cannot fly away from 3. The start is more than 8: add back the 5.'},
 {s:'Leo had some marbles. He won 6 more. Now he has 14. How many at first?',good:'14 − 6 = 8',bad:'14 + 6 = 20',miss:'14 + 6 = 20, but 20 and 6 more is 26, not 14. The start is less than 14: take off the 6 he won.'},
 {s:'Some cakes were on a plate. 4 were eaten. 9 are left. How many at first?',good:'9 + 4 = 13',bad:'9 − 4 = 5',miss:'9 − 4 = 5, but 5 cakes cannot leave 9. Add back the 4 eaten.'}];
const CMPQ=[{a:'Sam',na:13,b:'Ana',nb:9,q:'How many more does Sam have?'},{a:'Kai',na:8,b:'Jo',nb:15,q:'How many fewer does Kai have?'},{a:'Reds',na:17,b:'Blues',nb:11,q:'How many more do the Reds have?'}];
CMPQ.forEach(q=>{q.big=q.na>q.nb?0:1;q.lo=Math.min(q.na,q.nb);q.hi=Math.max(q.na,q.nb);q.need=q.hi-q.lo});
const SENSEQ=[{s:'12 sweets. Eat 4. Ava says 16 are left.',ok:0,why:'16 is more than 12. Eat some and fewer are left: 12 − 4 = 8.'},
 {s:'7 = □ − 9. Raj says the box is 16.',ok:1,why:'16 − 9 = 7. Both sides of = are the same, so 16 is right.'},
 {s:'Mia has 7 shells, finds 5 more. Leo says 2.',ok:0,why:'2 is fewer than 7, but she found more: 7 + 5 = 12.'},
 {s:'15 children. 6 go home. Zoe says 9 are left.',ok:1,why:'9 is less than 15, and 9 + 6 = 15. It checks out.'}];
VIS.reg('flagwprob',c=>{let A,au,pad,quiz,qx=-1,ep=0;const W={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',RIM='#64748b',PICK='#7c2d12',HAVE='#2563eb',ADD='#d97706',TAU=Math.PI*2;
const tf=(n,b)=>`${b||800} ${n}px system-ui,sans-serif`,em=n=>A.narrow?n:Math.round(n*1.2);
const part=()=>['slot','fill','start','cmp','sense','quiz'][A.step];
const cx=()=>A.W/2,mid=g=>{g.textAlign='center';g.textBaseline='middle'};
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function words(t,w,n){const g=A.ctx;g.font=tf(n,700);const out=[];let line='';for(const v of t.split(' ')){const tr=line?line+' '+v:v;if(g.measureText(tr).width>w&&line){out.push(line);line=v}else line=tr}out.push(line);return out}
function sbox(t,y,h){const g=A.ctx,x=8,w=A.W-16;g.fillStyle='#fff';A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();
 let n=em(15),L=words(t,w-20,n);while(L.length*(n+5)>h-8&&n>10){n--;L=words(t,w-20,n)}g.fillStyle=INK;g.font=tf(n,700);mid(g);
 L.forEach((s,i)=>g.fillText(s,cx(),y+h/2+(i-(L.length-1)/2)*(n+5)))}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=em(o.n||14);g.font=tf(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=tf(n);w=g.measureText(t).width+22}
 const h=n+16,l=mx(5,mn(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?NO:RIM;g.stroke();
 g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function cell(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();if(o.dash)g.setLineDash([6,5]);g.lineWidth=o.ok||o.bad||o.sel?4:2;
 g.strokeStyle=o.ok?YES:o.bad?NO:o.sel?PICK:RIM;g.stroke();g.setLineDash([]);if(t==null)return;let n=mn(em(o.n||24),r.h*.55);g.font=tf(n,900);while(g.measureText(String(t)).width>r.w-8&&n>10){n--;g.font=tf(n,900)}
 g.fillStyle=o.ink||INK;mid(g);g.fillText(String(t),r.x+r.w/2,r.y+r.h/2+1)}
function fin(t,L,n){wash();chip(t,cx(),A.H*.07,{ok:1});L.forEach((x,j)=>chip(x,cx(),A.H*(.3+j*.15),{n:n||15,ok:n>15}))}
const used=v=>Object.values(W.sl.put).includes(v);
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function barR(w,a){const x=12,full=A.W-24,y=A.H*.36,h=mn(64,A.H*.14),wa=mx(56,mn(full-56,full*a/w));return{whole:{x,y,w:full,h},a:{x,y:y+h+8,w:wa,h},b:{x:x+wa,y:y+h+8,w:full-wa,h}}}
/* 1. whole and parts */
const cards=()=>{const q=SLOTQ[mn(W.sl.k,2)],nums=[q.p[1],q.w,q.p[0]],w=mn(96,A.W*.24),h=mn(70,A.H*.15);return nums.map((v,i)=>({v,i,x:A.W/2-1.5*w-12+i*(w+12),y:A.H*.8,w,h}))};
function drawSlot(){const s=W.sl;wash();if(s.k>=3)return fin('3 bars built',['The parts make the whole']);
 const q=SLOTQ[s.k];chip(`Story ${s.k+1} of 3: drag numbers to the bar`,cx(),A.H*.05,{n:12});sbox(q.s,A.H*.11,A.H*.19);
 const R=barR(q.w,q.p[0]);[['whole','w'],['a','a'],['b','b']].forEach(([r,k])=>{const v=s.put[k];cell(R[r],v,{fill:v?(k==='w'?'#dbeafe':'#fef3c7'):'#fff',dash:!v,ok:!!v,bad:s.bad===k})});
 const g=A.ctx;g.fillStyle=A.col.tx;g.font=tf(em(11),700);g.textAlign='left';g.textBaseline='bottom';g.fillText('whole',R.whole.x+4,R.whole.y-3);g.textBaseline='top';g.fillText('parts',R.a.x+4,R.a.y+R.a.h+3);
 cards().forEach(r=>{if(used(r.v)||(W.drag&&W.drag.i===r.i))return;cell(r,r.v,{})});
 if(W.drag){const d=W.drag,r=cards()[d.i];cell({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},r.v,{sel:1})}}
function slotPut(v,where){const s=W.sl;if(s.k>=3)return;const q=SLOTQ[s.k];if(used(v))return;
 if(!where)where=v===q.w?'w':(s.put.a?'b':'a');if(s.put[where])where=where==='a'?'b':where==='b'?'a':where;if(s.put[where])return;
 const isWhole=v===q.w;if(where==='w'&&!isWhole){s.bad='w';au.miss();return say(`${v} is a part. The whole is all of them: the biggest number.`)}
 if(where!=='w'&&isWhole){s.bad=where;au.miss();return say(`${v} is all of them, the whole. It goes on top.`)}
 s.put[where]=v;s.bad=null;au.pop();if(s.put.w&&s.put.a&&s.put.b){s.k++;s.put={};return say(`Parts ${q.p[0]} and ${q.p[1]} make the whole, ${q.w}.`+(s.k>=3?' 3 bars built.':''))}
 say(`${v}: ${where==='w'?'the whole':'a part'}.`)}
/* 2. count on to fill a missing part */
function cubes(){const n=20,gap=3,w=mn(34,(A.W-24-gap*(A.narrow?9:19))/(A.narrow?10:20)),rows=A.narrow?2:1,x0=(A.W-(w*(n/rows)+gap*(n/rows-1)))/2,y0=A.H*.48;
 return [...Array(n)].map((_,i)=>({i,x:x0+(i%(n/rows))*(w+gap),y:y0+Math.floor(i/(n/rows))*(w+10),w,h:w}))}
function drawFill(){const s=W.fl,g=A.ctx;wash();if(s.k>=3)return fin('3 missing parts found',['7 and 5 make 12','9 and 6 make 15','6 and 7 make 13'],16);
 const q=FILLQ[s.k];chip(`Story ${s.k+1} of 3`,cx(),A.H*.05,{n:12});sbox(q.s,A.H*.1,A.H*.22);
 chip(s.n>q.w?`Too many: the whole is ${q.w}`:`${q.have} + ${s.n-q.have} = ${s.n}`,cx(),A.H*.39,{n:15,bad:s.n>q.w,ok:s.n===q.w});
 cubes().forEach(r=>{const on=r.i<s.n,fixed=r.i<q.have;g.fillStyle=fixed?HAVE:on?(r.i<q.w?ADD:NO):'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,6);g.fill();g.strokeStyle=r.i===q.w-1&&s.ask?YES:RIM;g.lineWidth=1.5;g.stroke();
  if(on&&!fixed){g.fillStyle='#fff';g.font=tf(mn(14,r.w*.45),800);mid(g);g.fillText(String(r.i+1),r.x+r.w/2,r.y+r.h/2+1)}});
 g.fillStyle=A.col.tx;g.font=tf(em(12),700);g.textAlign='center';g.textBaseline='top';const last=cubes()[19];g.fillText(`blue: ${q.have} at the start   orange: the missing part`,cx(),last.y+last.h+10);
 if(s.ask)chip('Now pick the answer below',cx(),A.H*.93,{n:13})}
function fillTo(n){const s=W.fl;if(s.k>=3||s.ask)return;const q=FILLQ[s.k];n=mx(q.have,mn(20,n));if(n===s.n)return;s.n=n;au.tick();
 if(n>q.w){au.miss();return say(`${n} is more than ${q.w}. Take some off.`)}
 if(n===q.w){s.ask=1;return say(`${q.have} to ${q.w}. How many did you add?`)}say(`${n}. Keep counting on to ${q.w}.`)}
function fpick(v){const s=W.fl;if(!s.ask)return;const q=FILLQ[s.k],m=q.w-q.have;
 if(v!==m){au.miss();return say(v===q.w?`${q.w} is the whole, all the ${q.n}. Count the orange cubes.`:`${v} is ${q.have} + ${q.w}, but ${q.w} is already the whole. Count the orange cubes.`)}
 s.k++;s.n=FILLQ[mn(s.k,2)].have;s.ask=0;au.pop();say(`Yes, ${m}: ${q.have} + ${m} = ${q.w}.`+(s.k>=3?' 3 found.':''))}
const fillOpts=()=>{const q=FILLQ[mn(W.fl.k,2)],m=q.w-q.have,o=[m,q.w,q.w+q.have],r=W.fl.k%3;return o.slice(r).concat(o.slice(0,r))};
/* 3. missing start: choose the number sentence */
const sentR=()=>{const w=mn(200,(A.W-36)/2),h=mn(70,A.H*.15);return[0,1].map(i=>({i,x:A.W/2+(i?6:-6-w),y:A.H*.78,w,h}))};
const sord=()=>{const q=STARTQ[mn(W.st.k,2)];return W.st.k===1?[q.good,q.bad]:[q.bad,q.good]};
function drawStart(){const s=W.st,g=A.ctx;wash();if(s.k>=3)return fin('3 starts found',['Went away? Add it back','Was added? Take it off']);
 const q=STARTQ[s.k];chip(`Story ${s.k+1} of 3: find the start`,cx(),A.H*.05,{n:12});sbox(q.s,A.H*.1,A.H*.22);
 const nums=q.good.match(/\d+/g).map(Number),plus=q.good.includes('+'),wh=plus?nums[2]:nums[0],pa=plus?nums[0]:nums[2],pb=nums[1];const R=barR(wh,pa);
 cell(R.whole,plus?'?':wh,{fill:'#dbeafe',n:22});cell(R.a,plus?pa:'?',{fill:'#fef3c7',n:20});cell(R.b,pb,{fill:'#fef3c7',n:20});
 sentR().forEach((r,i)=>cell(r,sord()[i],{n:20,bad:s.bad===sord()[i]}))}
function spick(t){const s=W.st;if(s.k>=3)return;const q=STARTQ[s.k];if(t!==q.bad&&t!==q.good)return;
 if(t===q.bad){s.bad=t;au.miss();return say(q.miss)}s.bad=null;s.k++;au.pop();const n=q.good.split('= ')[1];
 say(`${q.good}. ${n} at the start, and the story works with ${n}.`+(s.k>=3?' 3 starts found.':''))}
/* 4. compare: mark the extra cubes */
function trains(){const q=CMPQ[mn(W.cm.k,2)],gap=3,x0=A.narrow?64:84,w=mn(36,(A.W-x0-12-gap*9)/10),h=w,y0=A.H*.36;
 return[q.na,q.nb].map((n,t)=>[...Array(n)].map((_,i)=>({t,i,x:x0+(i%10)*(w+gap),y:y0+(Math.floor(i/10)*2+t)*(h+6)+Math.floor(i/10)*10,w,h})))}
function drawCmp(){const s=W.cm,g=A.ctx;wash();if(s.k>=3)return fin('3 compares done',['More = cubes with no partner']);
 const q=CMPQ[s.k],{big,lo:small,need}=q;chip(`${s.k+1} of 3: tap each extra cube (${s.marked.length})`,cx(),A.H*.05,{n:12});sbox(`${q.a} has ${q.na}. ${q.b} has ${q.nb}. ${q.q}`,A.H*.1,A.H*.2);
 trains().forEach((row,t)=>{g.fillStyle=A.col.tx;g.font=tf(em(13),800);g.textAlign='right';g.textBaseline='middle';row.filter(r=>r.i%10===0).forEach(r=>g.fillText(t?q.b:q.a,r.x-6,r.y+r.h/2));
  row.forEach(r=>{const mk=t===big&&s.marked.includes(r.i);g.fillStyle=mk?ADD:t?'#0e7490':HAVE;A.paint.rrect(r.x,r.y,r.w,r.h,5);g.fill();if(s.bad&&s.bad[0]===t&&s.bad[1]===r.i){g.strokeStyle=NO;g.lineWidth=3;g.stroke()}})});
 const R=trains();g.strokeStyle=A.col.tx;g.lineWidth=2;for(let i=0;i<small;i+=1){const a=R[0][i],b=R[1][i];g.beginPath();g.moveTo(a.x+a.w/2,a.y+a.h);g.lineTo(b.x+b.w/2,b.y);g.stroke()}
 if(s.marked.length===need)chip(`${need} extra`,cx(),A.H*.9,{ok:1})}
function mark(t,i){const s=W.cm;if(s.k>=3)return;const q=CMPQ[s.k],{big,lo:small,need,hi}=q;
 if(t!==big||i<small){s.bad=[t,i];au.miss();return say(t!==big?`That is the shorter train. Extra cubes are on the longer one.`:`That cube has a partner (see the line). Extra cubes have none.`)}
 if(s.marked.includes(i))return;s.marked.push(i);s.bad=null;au.tick();if(s.marked.length<need)return say(`${s.marked.length}.`);
 s.k++;s.marked=[];au.pop();say(`${need}. ${hi} − ${small} = ${need}: the difference, not ${hi}.`+(s.k>=3?' 3 done.':''))}
/* 5. does the answer make sense? */
const judgeR=()=>{const w=mn(190,(A.W-36)/2),h=mn(78,A.H*.17);return[{v:1,x:A.W/2-w-6,y:A.H*.62,w,h},{v:0,x:A.W/2+6,y:A.H*.62,w,h}]};
function drawSense(){const s=W.se,g=A.ctx;wash();if(s.k>=4)return fin('All 4 checked',['More or less than the start?']);chip(`${s.k+1} of 4: does this answer make sense?`,cx(),A.H*.06,{n:13});
 sbox(SENSEQ[s.k].s,A.H*.16,A.H*.3);judgeR().forEach(r=>cell(r,r.v?'Makes sense':'Not right',{n:18,bad:s.bad===r.v,fill:r.v?'#ecfdf5':'#fff1f2'}))}
function judge(v){const s=W.se;if(s.k>=4)return;const q=SENSEQ[s.k];if(v!==q.ok){s.bad=v;au.miss();return say((v?'Look again. ':'It does make sense. ')+q.why)}
 s.k++;s.bad=null;au.pop();say((v?'Yes, it makes sense. ':'Right, it is not. ')+q.why+(s.k>=4?' All 4 checked.':''))}
function draw(){const k=part();if(k==='quiz')return fin('Challenge',['Find the whole and the parts first']);
 ({slot:drawSlot,fill:drawFill,start:drawStart,cmp:drawCmp,sense:drawSense})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='slot'&&W.sl.k<3){const r=cards().find(r=>inR(p,r)&&!used(r.v));if(r){W.drag={i:r.i,v:r.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='fill'&&W.fl.k<3&&!W.fl.ask){const r=cubes().find(r=>inR(p,{x:r.x-2,y:r.y-6,w:r.w+4,h:r.h+12}));if(r){fillTo(r.i+1);W.drag={fill:1,x0:p.x,y0:p.y};return true}return false}
 if(k==='start'){const r=sentR().find(r=>inR(p,r));if(r)spick(sord()[r.i]);return false}
 if(k==='cmp'){for(const row of trains()){const r=row.find(r=>inR(p,r));if(r){mark(r.t,r.i);break}}return false}
 if(k==='sense'){const r=judgeR().find(r=>inR(p,r));if(r)judge(r.v)}return false}
function move(p){const d=W.drag;if(!d)return;if(d.fill){const r=cubes().find(r=>inR(p,{x:r.x-2,y:r.y-6,w:r.w+4,h:r.h+12}));if(r)fillTo(r.i+1);return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;if(d.fill)return;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;if(tap)return slotPut(d.v);
 const q=SLOTQ[W.sl.k],R=barR(q.w,q.p[0]),where=inR(p,R.whole)?'w':inR(p,R.a)?'a':inR(p,R.b)?'b':null;if(where)slotPut(d.v,where);else A.redraw()}
function fresh(){ep++;for(const k in W)delete W[k];Object.assign(W,{sl:{k:0,put:{},bad:null},fl:{k:0,n:FILLQ[0].have,ask:0},st:{k:0,bad:null},cm:{k:0,marked:[],bad:null},se:{k:0,bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctls();W.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);W.hook=watch(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=ep;acts.forEach((f,j)=>setTimeout(()=>{if(e0===ep)f()},ms*(j+1)))}
function ctls(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='slot'&&W.sl.k<3){const s=W.sl;cards().forEach(r=>{if(used(r.v))return;if(!s.put.w)B(`${r.v} → whole`,()=>slotPut(r.v,'w'),`${r.v} is the whole`);if(!s.put.a||!s.put.b)B(`${r.v} → part`,()=>slotPut(r.v,s.put.a?'b':'a'),`${r.v} is a part`)})}
 if(k==='fill'&&W.fl.k<3){const s=W.fl;if(!s.ask){B('Add 1 cube',()=>fillTo(s.n+1));if(s.n>FILLQ[s.k].have)B('Take 1 off',()=>fillTo(s.n-1))}else fillOpts().forEach(v=>B(String(v),()=>fpick(v),`The missing part is ${v}`))}
 if(k==='start'&&W.st.k<3)sord().forEach(t=>B(t,()=>spick(t)));
 if(k==='cmp'&&W.cm.k<3){const q=CMPQ[W.cm.k],{big,lo,hi}=q,nm=big?q.b:q.a;for(let i=lo-2;i<hi;i++)if(!W.cm.marked.includes(i))B(`${nm} ${i+1}`,()=>mark(big,i),`${nm}'s cube ${i+1}`)}
 if(k==='sense'&&W.se.k<4){B('Makes sense',()=>judge(1));B('Not right',()=>judge(0))}}
const steps=[
{h:'Whole and parts',p:'The whole goes on top. The parts go under it. Drag each number.',
 predict:{q:'15 apples, 6 eaten, 9 left. Which number is the whole?',opts:['9, the ones left','15, all of them'],ans:1},task:'Build the bar for all 3 stories',
 show:()=>demo(0,SLOTQ.flatMap(q=>[()=>slotPut(q.w,'w'),()=>slotPut(q.p[0],'a'),()=>slotPut(q.p[1],'b')]),420),
 go:()=>open(0,SLOTQ[0].s+' An empty bar model.',()=>W.sl.k>=3,'The two parts make the whole.')},
{h:'Count on to the whole',p:'Tap or drag along the cubes to count on from the blue ones to the whole.',
 predict:{q:'Mia has 7 shells, finds more, and now has 12. Do you add 7 + 12?',opts:['Yes, more means add','No, 12 is already the whole'],ans:1},task:'Find all 3 missing parts',
 show:()=>demo(1,FILLQ.flatMap(q=>[()=>fillTo(q.w),()=>fpick(q.w-q.have)]),650),
 go:()=>open(1,FILLQ[0].s+' 7 of 20 cubes are blue.',()=>W.fl.k>=3,'Count on from the part you know to the whole. The cubes you add are the answer.')},
{h:'What was there at first?',p:'The start is missing. Tap the number sentence that finds it.',
 predict:{q:'5 birds flew away and 8 are left. Do you take away to find the start?',opts:['Yes, away means take away','No, add back the ones that flew'],ans:1},task:'Find the start in all 3 stories',
 show:()=>demo(2,STARTQ.map(q=>()=>spick(q.good)),900),
 go:()=>open(2,STARTQ[0].s+' Pick 8 − 5 or 8 + 5.',()=>W.st.k>=3,'Went away? Add them back. Were added? Take them off.')},
{h:'How many more?',p:'Tap each extra cube on the longer train: the ones with no partner.',task:'Finish all 3 compare stories',
 show:()=>demo(3,CMPQ.flatMap(q=>[...Array(q.need)].map((_,j)=>()=>mark(q.big,q.lo+j))),230),
 go:()=>open(3,'Sam has 13 cubes, Ana has 9. Lines join the partners.',()=>W.cm.k>=3,'More or fewer means the difference: cubes with no partner.')},
{h:'Does it make sense?',p:'Should the answer be more or less than the start?',task:'Check all 4 answers',
 show:()=>demo(4,SENSEQ.map(q=>()=>judge(q.ok)),650),
 go:()=>open(4,SENSEQ[0].s,()=>W.se.k>=4,'Put the answer back in the story to check it.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.hook()});
const QS=[
 {q:'Ali has 8 cars. He gets more. Now he has 14. How many did he get?',a:'6',o:[['22','more'],['14','whole']]},
 {q:'Some ducks were on a pond. 4 swam away. 7 are left. How many at first?',a:'11',o:[['3','away'],['7','whole']]},
 {q:'Sam has 16 stickers. Ana has 10. How many more does Sam have?',a:'6',o:[['16','compare'],['26','more']]},
 {q:'7 = □ − 9. What number goes in the box?',a:'16',o:[['2','equals'],['7','equals']]},
 {q:'20 grapes. You eat 5. Which answer makes sense?',a:'15 left',o:[['25 left','sense'],['5 left','whole']]},
 {q:'Ben has 9 pens. Zara has 13. How many fewer does Ben have?',a:'4',o:[['9','compare'],['22','more']]}];
function why(t){let m='Find the whole and the parts first. Then ask which one is missing.';
 if(t==='more')m='One of those numbers is already the whole. Missing part = whole − the part you know.';
 if(t==='whole')m='That number is in the story. The question asks for the missing one.';
 if(t==='away')m='Taking away gives what is left. Add back the ones that went: 7 + 4 = 11.';
 if(t==='compare')m='That is one amount. How many more or fewer means the difference.';
 if(t==='equals')m='Both sides of = are the same. What take away 9 leaves 7? 16 − 9 = 7.';
 if(t==='sense')m='Eat some and you have fewer than 20. 25 is more, so it is wrong.';
 return m}
function ask(){qx++;const Q=QS[qx%QS.length],all=[[Q.a,'ok'],...Q.o],r=qx%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else au.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;ctls()},
 init:B=>{A=B;au=A.sound;const box=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word problem buttons'},box);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});ctls()}}).start()})})();
