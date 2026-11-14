/* Flagship – quartiles and the interquartile range (ages 13–15): order the data, find the median, then the lower
   quartile (middle of the lower half) and the upper quartile (middle of the upper half), stretch a box over the middle
   half, drag an outlier far away and watch the range jump while the IQR holds still, then compare two players by median
   and IQR. Data sets have 7 or 11 values, so the (n+1)/4 rule and the halves method give the same quartiles.
   Drag or tap on the canvas; a button row below repeats every move. */
(()=>{
 const RAW=[12,5,9,20,15,7,11,18,9,14,6];
 const SETS=[{d:[5,6,7,9,9,11,12,14,15,18,20],name:'reading minutes'},{d:[3,4,4,6,8,10,13],name:'goals per season'}];
 const ASKS=[['median','the middle value'],['lower quartile (Q1)','the middle of the lower half'],['upper quartile (Q3)','the middle of the upper half']];
 const at=(n,k)=>k===0?(n+1)/2-1:k===1?(n+1)/4-1:3*(n+1)/4-1;
 const PLAY=[{who:'Asha',d:[12,14,15,16,17,18,20]},{who:'Ben',d:[5,9,13,17,21,24,28]}];
 const stats=d=>{const n=d.length;return{med:d[at(n,0)],q1:d[at(n,1)],q3:d[at(n,2)],lo:d[0],hi:d[n-1]}};
 const CMP=[['Who has the higher median score?',1,'Ben’s median is 17 and Asha’s is 16, so Ben’s typical score is a little higher.'],
  ['Who is more consistent?',0,'Asha’s IQR is 18 − 14 = 4 and Ben’s is 24 − 9 = 15. The smaller IQR means Asha’s middle scores sit closer together.'],
  ['You need someone who almost always scores at least 14. Who?',0,'Asha’s Q1 is 14, so at least three quarters of her scores are 14 or more. Ben’s Q1 is only 9.']];
VIS.reg('flagiqr',c=>{let A,btns,qbox;
 const D={go:0,picked:[],k:0,set:0,edge:[2,22],drag:null,top:20,msg:'',err:false,cmp:0,check:()=>{}};
 const stage=()=>['order','find','box','outlier','compare','chal'][A.step];
 const read=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const fail=t=>{D.err=true;D.msg=t;A.sound.miss();read(t);A.redraw()};
 const pass=t=>{D.err=false;D.msg=t;A.sound.pop()};
 const fz=n=>Math.round(n*(A.narrow?1:1.15));
 function say(g,s,x,y,n,col,wt){g.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
 function block(g,s,x,y,n,col,w){g.font=`700 ${fz(n)}px system-ui,sans-serif`;const R=[];let cur='';String(s).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>w){R.push(cur);cur=t}else cur=tr});R.push(cur);const lh=fz(n)+5;R.forEach((r,i)=>say(g,r,x,y+(i-(R.length-1)/2)*lh,n,col))}
 function card(g,r,col,a,thick){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=col;g.lineWidth=thick?3:1.6;g.stroke()}
 const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const tileR=(i,n,y)=>{const gap=4,w=Math.min(54,(A.W-24-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return{x:x0+i*(w+gap),y,w,h:Math.max(44,A.H*.11)}};
 const PADX=28,X=(v,lo,hi)=>PADX+(v-lo)/(hi-lo)*(A.W-2*PADX),V=(x,lo,hi)=>lo+(x-PADX)/(A.W-2*PADX)*(hi-lo);
 function axis(g,lo,hi,y,step){const C=A.col;g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(PADX,y);g.lineTo(A.W-PADX,y);g.stroke();for(let v=lo;v<=hi;v+=step){const x=X(v,lo,hi);g.beginPath();g.moveTo(x,y);g.lineTo(x,y+5);g.stroke();say(g,v,x,y+15,10,C.tx,600)}}
 function dots(g,d,lo,hi,y,col){const seen={};d.forEach(v=>{seen[v]=(seen[v]||0)+1;const r=A.narrow?6:7;g.fillStyle=col;g.beginPath();g.arc(X(v,lo,hi),y-r-(seen[v]-1)*(2*r+2),r,0,7);g.fill()})}
 function strip(g){if(!D.msg)return;const C=A.col;g.font=`700 ${fz(13)}px system-ui,sans-serif`;const R=[];let cur='';((D.err?'✗ ':'✓ ')+D.msg).split(' ').forEach(t=>{const tr=cur?cur+' '+t:t;if(cur&&g.measureText(tr).width>A.W-44){R.push(cur);cur=t}else cur=tr});R.push(cur);
  const lh=fz(13)+5,h=R.length*lh+12,y=A.H-h-6;card(g,{x:12,y,w:A.W-24,h},D.err?C.rd:C.gr,.13);R.forEach((r,i)=>say(g,r,A.W/2,y+6+lh*(i+.5),13,C.tx))}
 const boxData=()=>SETS[0].d.slice(0,10).concat([D.top]);
 // ---------- scenes ----------
 const PAINT={
  order(g,C){say(g,'Reading minutes for 11 pupils',A.W/2,A.H*.05,13,C.mu);const left=RAW.map((v,i)=>i).filter(i=>!D.picked.includes(i));
   RAW.forEach((v,i)=>{if(D.picked.includes(i))return;const q=tileR(left.indexOf(i),left.length||1,A.H*.1);card(g,q,C.cy,.14);say(g,v,q.x+q.w/2,q.y+q.h/2,15,C.tx,800)});
   say(g,'in order:',A.W/2,A.H*.3,12,C.mu);D.picked.forEach((i,k)=>{const q=tileR(k,RAW.length,A.H*.34),mid=D.picked.length===RAW.length&&k===5;card(g,q,mid?C.am:C.gr,mid?.3:.16,mid);say(g,RAW[i],q.x+q.w/2,q.y+q.h/2,15,C.tx,800)});
   if(D.picked.length===RAW.length)block(g,'The 6th of 11 values is the middle one: the median is 11, not the halfway point of the range (12.5).',A.W/2,A.H*.58,13,C.tx,A.W-40)},
  find(g,C){const S=SETS[D.set];if(!S)return block(g,'Median splits the data in half; Q1 and Q3 split each half in half again.',A.W/2,A.H*.25,15,C.gr,A.W-40);const d=S.d,n=d.length;
   say(g,`${S.name}: ${n} values in order`,A.W/2,A.H*.05,13,C.mu);const marks={};for(let k=0;k<D.k;k++)marks[at(n,k)]=['median','Q1','Q3'][k];
   d.forEach((v,i)=>{const q=tileR(i,n,A.H*.12),m=marks[i];const lowHalf=D.k>=1&&i<at(n,0),upHalf=D.k>=1&&i>at(n,0);card(g,q,m?C.am:lowHalf?C.vi:upHalf?C.pk:C.cy,m?.32:.13,!!m);say(g,v,q.x+q.w/2,q.y+q.h/2,15,C.tx,800);if(m)say(g,m,q.x+q.w/2,q.y+q.h+12,11,C.tx,800)});
   if(D.k<3)block(g,`Tap the ${ASKS[D.k][0]}: ${ASKS[D.k][1]}.`,A.W/2,A.H*.45,14,C.tx,A.W-40)},
  box(g,C){const lo=0,hi=25,y=A.H*.52,d=SETS[0].d;axis(g,lo,hi,y,5);dots(g,d,lo,hi,y,C.cy);const [a,b]=D.edge,xa=X(a,lo,hi),xb=X(b,lo,hi);
   g.fillStyle=A.alpha(C.am,.18);g.fillRect(xa,y-A.H*.3,xb-xa,A.H*.3);g.strokeStyle=C.am;g.lineWidth=3;g.strokeRect(xa,y-A.H*.3,xb-xa,A.H*.3);
   [xa,xb].forEach((x,k)=>{g.fillStyle=C.am;g.beginPath();g.arc(x,y-A.H*.33,A.narrow?11:12,0,7);g.fill();say(g,k?'Q3?':'Q1?',x,y-A.H*.33,9,'#111',800)});
   const inside=d.filter(v=>v>=a&&v<=b).length;block(g,`Box from ${a} to ${b}: width ${b-a}. Values inside: ${inside} of 11.`,A.W/2,A.H*.08,14,C.tx,A.W-30)},
  outlier(g,C){const lo=0,hi=65,y=A.H*.5,d=boxData(),s=stats(d.slice().sort((p,q)=>p-q));axis(g,lo,hi,y,10);dots(g,d.slice(0,10),lo,hi,y,C.cy);
   const r=A.narrow?9:10;g.fillStyle=C.rd;g.beginPath();g.arc(X(D.top,lo,hi),y-r,r,0,7);g.fill();say(g,'drag',X(D.top,lo,hi),y-2*r-10,10,C.tx,700);
   const xa=X(s.q1,lo,hi),xb=X(s.q3,lo,hi);g.strokeStyle=C.am;g.lineWidth=3;g.strokeRect(xa,y-A.H*.22,xb-xa,A.H*.12);say(g,'Q1 to Q3',(xa+xb)/2,y-A.H*.25,10,C.tx,700);
   block(g,`Largest value: ${D.top}.  Range = ${D.top} − 5 = ${D.top-5}.  IQR = 15 − 7 = ${s.q3-s.q1}.`,A.W/2,A.H*.1,14,C.tx,A.W-30)},
  compare(g,C){const lo=0,hi=30;PLAY.forEach((P,k)=>{const y=A.H*(.16+k*.24),s=stats(P.d),col=k?C.pk:C.vi;say(g,P.who,PADX+10,y-A.H*.07,13,C.tx,800);
    g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.moveTo(X(s.lo,lo,hi),y);g.lineTo(X(s.hi,lo,hi),y);g.stroke();g.fillStyle=A.alpha(col,.22);const xa=X(s.q1,lo,hi),xb=X(s.q3,lo,hi);g.fillRect(xa,y-14,xb-xa,28);g.strokeRect(xa,y-14,xb-xa,28);
    g.beginPath();g.moveTo(X(s.med,lo,hi),y-14);g.lineTo(X(s.med,lo,hi),y+14);g.lineWidth=3;g.stroke();say(g,`median ${s.med}, IQR ${s.q3-s.q1}`,A.W/2,y+24,11,C.tx,700)});axis(g,lo,hi,A.H*.62,5);
   if(D.cmp<CMP.length)block(g,CMP[D.cmp][0],A.W/2,A.H*.72,14,C.tx,A.W-30);else block(g,'Median for typical, IQR for consistency.',A.W/2,A.H*.72,14,C.gr,A.W-30)}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.32);g.fillRect(0,0,W,H);const f=PAINT[stage()];if(f)f(g,C);else say(g,'Q1 · median · Q3',W/2,H/2,18,C.tx);strip(g);A.fx.draw(g)}

 // ---------- moves ----------
 function take(i){if(D.picked.includes(i))return;const left=RAW.filter((v,j)=>!D.picked.includes(j)),min=Math.min(...left);if(RAW[i]!==min)return fail(`${RAW[i]} is not the smallest left. ${min} is smaller. Ordering comes first: quartiles only work on sorted data.`);
  D.picked.push(i);pass(D.picked.length===RAW.length?'All 11 in order. The median is the 6th value: 11.':`${RAW[i]} placed.`);sync()}
 function mark(i){const S=SETS[D.set];if(!S)return;const n=S.d.length,want=at(n,D.k);if(i!==want){let m;
   if(D.k===0)m=`That is not the middle. With ${n} values the median is value number ${(n+1)/2}, with ${(n-1)/2} values on each side.`;
   else if(i===at(n,0))m='That is the median. The quartile is the middle of one half, not of the whole set.';
   else if((D.k===1&&i>at(n,0))||(D.k===2&&i<at(n,0)))m=`Wrong half. Q${D.k===1?1:3} is in the ${D.k===1?'lower':'upper'} half.`;
   else m=`Count again: the ${D.k===1?'lower':'upper'} half has ${(n-1)/2} values, and its middle is number ${(n+1)/4} of them.`;return fail(m)}
  const v=S.d[i];D.k++;pass(D.k===3?`${S.name}: Q1 = ${S.d[at(n,1)]}, median = ${S.d[at(n,0)]}, Q3 = ${S.d[at(n,2)]}.`:`${['Median','Q1','Q3'][D.k-1]} = ${v}.`);if(D.k===3){D.set++;D.k=0}sync()}
 function nudge(k,dv){const e=D.edge.slice();e[k]=Math.max(0,Math.min(25,e[k]+dv));if(e[0]>=e[1])return;D.edge=e;const [a,b]=e;pass(a===7&&b===15?'The box runs from Q1 = 7 to Q3 = 15. IQR = 15 − 7 = 8: the spread of the middle half of the data.':`Box ${a} to ${b}.`);sync()}
 function pull(v){D.top=Math.max(20,Math.min(60,Math.round(v)));pass(`Top value ${D.top}: range ${D.top-5}, IQR still 8.`);sync()}
 function pick(k){const it=CMP[D.cmp];if(!it)return;if(k!==it[1])return fail(it[2]);D.cmp++;pass(it[2]);sync()}

 function sync(){const v=stage();let s='';
  if(v==='order')s=D.picked.length<RAW.length?`Unsorted: ${RAW.filter((x,i)=>!D.picked.includes(i)).join(', ')}. Tap the smallest.`:'Sorted.';
  else if(v==='find')s=D.set<SETS.length?`${SETS[D.set].d.join(', ')}. Find the ${ASKS[D.k][0]}.`:'Both sets done.';
  else if(v==='box')s=`Box edges at ${D.edge[0]} and ${D.edge[1]}.`;
  else if(v==='outlier')s=`Largest value ${D.top}. Range ${D.top-5}. IQR 8.`;
  else if(v==='compare')s=D.cmp<CMP.length?`Asha: median 16, IQR 4. Ben: median 17, IQR 15. ${CMP[D.cmp][0]}`:'Comparison done.';else s='Challenge.';
  read((D.msg?D.msg+' ':'')+s);ctl();D.check()}
 function ctl(){if(!btns)return;btns.innerHTML='';const v=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},btns,t);e.onclick=f};
  if(v==='order'&&D.picked.length<RAW.length)RAW.forEach((x,i)=>{if(!D.picked.includes(i))b(String(x),()=>take(i),`Place ${x}`)});
  if(v==='find'&&D.set<SETS.length)SETS[D.set].d.forEach((x,i)=>b(String(x),()=>mark(i),`Value ${i+1}: ${x}`));
  if(v==='box'){b('Q1 edge ←',()=>nudge(0,-1),'Move left edge down 1');b('Q1 edge →',()=>nudge(0,1),'Move left edge up 1');b('Q3 edge ←',()=>nudge(1,-1),'Move right edge down 1');b('Q3 edge →',()=>nudge(1,1),'Move right edge up 1')}
  if(v==='outlier'){b('Top value +10',()=>pull(D.top+10));b('Top value −10',()=>pull(D.top-10))}
  if(v==='compare'&&D.cmp<CMP.length)PLAY.forEach((P,k)=>b(P.who,()=>pick(k)));A.redraw()}

 function down(p){const v=stage();D.drag=null;
  if(v==='order'){const left=RAW.map((x,i)=>i).filter(i=>!D.picked.includes(i)),j=left.findIndex((i,k)=>inR(p,tileR(k,left.length,A.H*.1)));if(j>=0)take(left[j]);return false}
  if(v==='find'&&D.set<SETS.length){const n=SETS[D.set].d.length,i=[...Array(n).keys()].find(i=>inR(p,tileR(i,n,A.H*.12)));if(i!=null)mark(i);return false}
  if(v==='box'){const xs=D.edge.map(e=>X(e,0,25)),k=Math.abs(p.x-xs[0])<=Math.abs(p.x-xs[1])?0:1;if(Math.abs(p.x-xs[k])<40){D.drag=k;return true}return false}
  if(v==='outlier'){if(Math.abs(p.x-X(D.top,0,65))<40&&p.y>A.H*.3&&p.y<A.H*.62){D.drag=1;return true}return false}
  if(v==='compare'&&D.cmp<CMP.length){const k=[0,1].find(k=>Math.abs(p.y-A.H*(.16+k*.24))<A.H*.1);if(k!=null)pick(k);return false}
  return false}
 function move(p){const v=stage();if(D.drag==null)return;if(v==='box'){const val=Math.round(V(p.x,0,25)),e=D.edge.slice();e[D.drag]=Math.max(0,Math.min(25,val));if(e[0]<e[1]){D.edge=e;A.redraw()}}
  else if(v==='outlier'){D.top=Math.max(20,Math.min(60,Math.round(V(p.x,0,65))));A.redraw()}}
 function up(){const v=stage(),h=D.drag;D.drag=null;if(h==null)return A.redraw();if(v==='box')nudge(0,0);else if(v==='outlier')pull(D.top)}

 // ---------- steps ----------
 const gate=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=fs=>{const id=++D.go,gap=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===D.go)f()},i*gap))};
 const fresh=()=>{D.go++;D.check=()=>{};D.picked=[];D.k=0;D.set=0;D.edge=[2,22];D.top=20;D.cmp=0;D.msg='';D.err=false;D.drag=null};
 const steps=[
  {h:'Line them up first',p:'Quartiles only make sense when the data are in order. Tap the values from smallest to largest, or use the buttons.',
   predict:{q:'The values run from 5 to 20. Is the median halfway between them, 12.5?',opts:['Yes: halfway between smallest and largest','No: it is the middle value once they are in order'],ans:1},task:'Put 11 values in order',
   show:()=>{steps[0].go();const order=RAW.map((v,i)=>[v,i]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]).map(x=>x[1]);auto(order.map(i=>()=>take(i)))},go:()=>{fresh();sync();D.check=gate(0,()=>D.picked.length>=RAW.length,'Ordered. The median is 11, the 6th value, not 12.5.')}},
  {h:'Halves, then quarters',p:'The median cuts the ordered data in half. The lower quartile (Q1) is the middle of the lower half and the upper quartile (Q3) is the middle of the upper half. With an odd number of values, leave the median out of both halves.',
   predict:{q:'Is Q1 the value a quarter of the way from the smallest to the largest number?',opts:['Yes: smallest + a quarter of the range','No: it is a quarter of the way through the ordered list'],ans:1},task:'Find median, Q1 and Q3 for 2 data sets',
   show:()=>{steps[1].go();auto(SETS.flatMap(S=>[0,1,2].map(k=>()=>mark(at(S.d.length,k)))))},go:()=>{fresh();sync();D.check=gate(1,()=>D.set>=SETS.length,'Q1 = 7, median 11, Q3 = 15; then Q1 = 4, median 6, Q3 = 10.')}},
  {h:'The box holds the middle half',p:'Drag the two edges of the box so it runs from Q1 to Q3, or use the buttons. Its width, Q3 − Q1, is the interquartile range (IQR).',
   task:'Stretch the box from Q1 to Q3',show:()=>{steps[2].go();const s=[];for(let v=D.edge[0];v<7;v++)s.push(()=>nudge(0,1));for(let v=D.edge[1];v>15;v--)s.push(()=>nudge(1,-1));auto(s)},
   go:()=>{fresh();sync();D.check=gate(2,()=>D.edge[0]===7&&D.edge[1]===15,'IQR = 15 − 7 = 8. About a quarter of the data lies below the box, a quarter above it, and the middle half inside.')}},
  {h:'One wild value',p:'Range = largest − smallest, so one extreme value changes it a lot. Drag the red value far to the right, or tap +10, and watch the range and the IQR.',
   predict:{q:'The largest value jumps from 20 to 60. What happens to the IQR?',opts:['It grows a lot, like the range','It stays at 8'],ans:1},task:'Drag the top value past 50',
   show:()=>{steps[3].go();auto([1,2,3,4].map(()=>()=>pull(D.top+10)))},go:()=>{fresh();sync();D.check=gate(3,()=>D.top>=50,'The range jumped, but Q1 and Q3 did not move. The IQR ignores the extreme ends, so outliers barely affect it.')}},
  {h:'Compare two players',p:'Use the median to compare typical scores and the IQR to compare consistency. Read the two boxes and answer each question by tapping a player.',
   task:'Answer 3 comparisons',show:()=>{steps[4].go();auto(CMP.map(it=>()=>pick(it[1])))},go:()=>{fresh();sync();D.check=gate(4,()=>D.cmp>=CMP.length,'Ben is a touch higher on median; Asha is far more consistent, with an IQR of 4 against 15.')}},
  {h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>D.check()});

 // ---------- challenge: every wrong option names the slip ----------
 const Q=[['Data: 2, 3, 5, 8, 9, 12, 15. What is the IQR?','9',[['13','range'],['8','median']]],
  ['Data: 9, 1, 7, 3, 5, 11, 2. What is the median?','5',[['3','unsorted'],['6','midrange']]],
  ['Data: 4, 6, 7, 10, 12, 13, 19, 20, 22, 25, 30. What is Q1?','7',[['10.5','quarter'],['6','count']]],
  ['One value of 100 is added to a set of test scores. Which mostly changes?','the range',[['the IQR','iqr'],['the median, by a lot','median2']]],
  ['Two classes have the same median. Class A has IQR 4, Class B has IQR 12. Whose scores are more consistent?','Class A',[['Class B','bigger'],['Neither: the medians match','same']]],
  ['Data: 3, 5, 6, 8, 11, 12, 14. What is Q3?','12',[['14','max'],['11','count']]]];
 function slip(tag,w){let m='Order the data, find the median, then the middle of each half.';
  if(tag==='range')m=`${w} is the range (largest − smallest). The IQR is Q3 − Q1.`;
  if(tag==='median')m=`${w} is the median. The IQR is the gap between Q1 and Q3.`;
  if(tag==='unsorted')m=`${w} is the middle of the list as written. Sort the values first.`;
  if(tag==='midrange')m=`${w} is halfway between smallest and largest. The median is the middle value in order.`;
  if(tag==='quarter')m=`${w} is the smallest plus a quarter of the range. Q1 is the middle of the lower half of the ordered list.`;
  if(tag==='count')m=`${w} is one place off. With 7 values Q1 is the 2nd and Q3 the 6th; with 11 values Q1 is the 3rd and Q3 the 9th.`;
  if(tag==='iqr')m='The IQR uses only the middle half, so one extreme value barely moves it.';
  if(tag==='median2')m='Adding one value shifts the median by at most half a place in the ordered list, so it barely changes. The range jumps.';
  if(tag==='bigger')m='A bigger IQR means more spread, so less consistent.';
  if(tag==='same')m='A matching median says nothing about spread. Compare the IQRs.';
  if(tag==='max')m=`${w} is the largest value. Q3 is the middle of the upper half.`;
  return m}
 let qi=-1,streak=0;
 function quiz(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
  qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const r=qbox.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>grade(tag,w,ans)});read('Challenge: '+q);A.redraw()}
 function grade(tag,w,ans){qbox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=qbox.querySelector('.fl-fb');
  if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes, '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}

 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qbox.hidden=A.step!==5;btns.hidden=A.step===5;ctl()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Quartile controls'},w);qbox=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up})}});
 A.start()})})();
