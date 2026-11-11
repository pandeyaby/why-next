/* Flagship: compare and sequence intervals of time (ages 6–7; NC Year 2 Measurement "compare and sequence intervals of
   time" and "know the number of minutes in an hour"). Compare two intervals given in different units (2 hours vs 45 minutes),
   line up three intervals shortest to longest by turning hours into minutes, mark intervals on a clock-hour timeline, hop
   the hours across 12 o'clock to count an interval, and fit activities into free gaps of the right length. Not flagdur
   (clap bars, same unit), flaghr60 or flagsecs. */
(()=>{const lo=Math.min,hi=Math.max;
const PAIRS=[[['🎬','Film','2 hours',120],['🚗','Car trip','45 minutes',45]],[['🛁','Bath','20 minutes',20],['⚽','Football','1 hour',60]],[['🍝','Lunch','half an hour',30],['📖','Story','40 minutes',40]]];
const THREE=[['⚽','Football match','90 minutes',90],['🎬','Film','2 hours',120],['🚲','Bike ride','1 hour',60]];
const MARK=[['🏊','Swimming',9,11],['🧺','Picnic',12,13],['🎨','Painting',15,17]];
const HOPS=[['🦁','Zoo trip',11,14],['🎪','Fair',12,16]];
const BOOK=[[8,9,'School run'],[10,11,'Swim'],[13,15,'Party'],[16,17,'Tea']];
const GAPS=[[9,10],[11,13],[15,16]];
const FIT=[['🚲','Bike ride',2],['🐕','Dog walk',1]];
const H12=h=>h>12?h-12:h,OC=h=>`${H12(h)} o'clock`,HRS=n=>`${n} ${n===1?'hour':'hours'}`;
VIS.reg('flagivl',c=>{let A,pad,quiz,qn=-1;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',SEL='#6d28d9',BAR=['#2563eb','#c2410c','#7c3aed'];
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2);
const mode=()=>['pair','three','mark','hop','fit','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,col){const g=A.ctx;let k=sz(n);g.font=font(k);while(g.measureText(t).width>A.W-12&&k>10){k--;g.font=font(k)}mid(g);g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
function card(r,pic,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.ok||o.bad||o.on?4:2;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:RIM;g.stroke();mid(g);
 if(pic){g.font=`${Math.round(lo(r.h*.38,r.w*.3))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(word?.34:.5))}
 if(word){const L=String(word).split('\n');L.forEach((w,j)=>{let n=Math.round(hi(11,lo(sz(15),r.h*.2)));g.font=font(n,j?700:800);while(g.measureText(w).width>r.w-8&&n>9){n--;g.font=font(n,j?700:800)}g.fillStyle=INK;g.fillText(w,r.x+r.w/2,r.y+r.h*(pic?(L.length>1?.66+j*.2:.78):.5+(j-(L.length-1)/2)*.3))})}}
function bar(x0,x1,y,h,col,label){const g=A.ctx;g.fillStyle=col;A.paint.rrect(x0,y,hi(6,x1-x0),h,8);g.fill();if(label){g.font=font(sz(12));mid(g);const w=g.measureText(label).width;const inn=w<x1-x0-6,rt=x1+w+10<A.W;g.fillStyle=inn?'#fff':A.col.tx;g.fillText(label,inn?(x0+x1)/2:rt?x1+w/2+6:x0-w/2-6,y+h/2+1)}}
/* 1. two intervals in different units */
const pairCards=()=>{const w=lo(220,(A.W-36)/2),h=lo(120,A.H*.3);return[0,1].map(i=>({i,x:A.W/2-w-6+i*(w+12),y:A.H*.12,w,h}))};
function drawPair(){const s=S.p,g=A.ctx;back();if(s.k>=3){txt('All 3 pairs done',A.W/2,A.H*.3,16);txt('Look at the unit, not just the number.',A.W/2,A.H*.45,14);return}
 txt(`Pair ${s.k+1} of 3: which takes longer?`,A.W/2,A.H*.06,13);const P=PAIRS[s.k];pairCards().forEach(r=>card(r,P[r.i][0],P[r.i][1]+'\n'+P[r.i][2],{bad:s.bad===r.i,ok:s.show&&P[r.i][3]>P[1-r.i][3]}));
 if(s.show){const x0=A.W*.08,u=(A.W*.84)/120,y=A.H*.58;txt('In minutes:',A.W/2,y-sz(14),12);P.forEach((v,j)=>bar(x0,x0+u*v[3],y+j*sz(34),sz(26),BAR[j],`${v[1]}: ${v[3]} minutes`));g.fillStyle=A.col.tx}}
function pickPair(i){const s=S.p;if(s.k>=3||s.wait)return;const P=PAIRS[s.k],me=P[i],other=P[1-i];
 if(me[3]<other[3]){s.bad=i;s.show=1;A.sound.miss();
  return say(parseInt(me[2])>parseInt(other[2])?`${me[2]} has the bigger number, but ${other[2]} is ${other[3]} minutes. ${other[1]} takes longer.`:`${me[1]} is shorter: ${me[3]} minutes is less than ${other[3]} minutes. Try the other one.`)}
 s.bad=null;s.show=1;s.wait=1;A.sound.pop();const n=s.k+1;say(`Yes: ${me[1]} takes longer. ${me[2]} is ${me[3]} minutes, and ${other[2]} is ${other[3]} minutes.`+(n>=3?' Change hours to minutes, then compare.':''));
 setTimeout(()=>{if(S.p===s){s.k=n;s.show=0;s.wait=0;A.redraw();buttons();S.hook()}},A.reduced()?0:900)}
/* 2. line up three */
const threeCards=()=>{const w=lo(170,(A.W-40)/3),h=lo(104,A.H*.24);return THREE.map((v,i)=>({i,x:A.W/2-1.5*w-10+i*(w+10),y:A.H*.06,w,h}))};
const slots=()=>{const h=lo(46,A.H*.11);return[0,1,2].map(i=>({i,x:A.W*.06,y:A.H*.42+i*(h+8),w:A.W*.88,h}))};
function drawThree(){const s=S.t;back();threeCards().forEach(r=>{if(s.at.includes(r.i)||(S.drag&&S.drag.i===r.i))return;const v=THREE[r.i];card(r,v[0],v[1]+'\n'+v[2],{bad:s.bad===r.i})});
 const u=(A.W*.5)/120;slots().forEach((r,j)=>{const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.setLineDash([5,4]);g.stroke();g.setLineDash([]);
  const name=['shortest','middle','longest'][j];if(s.at[j]==null){txt(`${j+1}. ${name}`,r.x+r.w/2,r.y+r.h/2,13);return}const v=THREE[s.at[j]];
  g.font=font(sz(12));g.textAlign='left';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(`${v[0]} ${v[2]}`,r.x+8,r.y+r.h/2);bar(r.x+r.w*.42,r.x+r.w*.42+u*v[3]*(r.w/(A.W*.88)),r.y+r.h*.2,r.h*.6,BAR[j],`${v[3]} min`)});
 if(S.drag){const d=S.drag,r=threeCards()[d.i],v=THREE[d.i];card({...r,x:d.x-r.w/2,y:d.y-r.h/2},v[0],v[1]+'\n'+v[2],{on:1})}}
function place(i){const s=S.t;if(s.at.includes(i)||s.at.length>=3)return;const left=[0,1,2].filter(j=>!s.at.includes(j)),want=left.reduce((a,b)=>THREE[a][3]<THREE[b][3]?a:b),v=THREE[i],w=THREE[want];
 if(i!==want){s.bad=i;A.sound.miss();return say(v[3]===120?`${v[2]} is the longest: it is 120 minutes. ${w[1]} is shorter, so it goes before.`:`${v[2]} is ${v[3]} minutes, but ${w[2]} is only ${w[3]} minutes. ${w[1]} is shorter.`)}
 s.at.push(i);s.bad=null;A.sound.pop();say(s.at.length>=3?'Shortest to longest: 1 hour (60 minutes), 90 minutes, 2 hours (120 minutes).':`Yes: ${v[2]} is ${v[3]} minutes, the ${['shortest','middle'][s.at.length-1]} one.`)}
/* timeline 8 to 5 o'clock */
const tl=()=>{const x0=A.W*.06,x1=A.W*.94;return{x0,x1,u:(x1-x0)/9,y:A.H*.2}};const HX=h=>{const T=tl();return T.x0+(h-8)*T.u};
function axis(hl){const g=A.ctx,T=tl();g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(T.x0,T.y);g.lineTo(T.x1,T.y);g.stroke();
 for(let h=8;h<=17;h++){const x=HX(h),on=hl&&hl.includes(h);g.fillStyle=on?SEL:A.col.tx;g.beginPath();g.arc(x,T.y,on?sz(8):sz(5),0,7);g.fill();mid(g);g.font=font(sz(12));g.fillText(String(H12(h)),x,T.y-sz(16))}}
const markAt=p=>{const T=tl();for(let h=8;h<=17;h++)if(Math.abs(p.x-HX(h))<T.u*.5&&Math.abs(p.y-T.y)<A.H*.14)return h;return null};
/* 3. mark intervals */
function drawMark(){const s=S.m;back();axis(s.start!=null?[s.start]:[]);const T=tl(),bh=sz(30);
 MARK.forEach((v,j)=>{const y=T.y+A.H*.12+j*(bh+sz(18));if(j<s.k)bar(HX(v[2]),HX(v[3]),y,bh,BAR[j],`${v[0]} ${HRS(v[3]-v[2])}`);else if(j===s.k&&s.start!=null){bar(HX(s.start),HX(s.start)+6,y,bh,BAR[j])}});
 if(s.k<3){const v=MARK[s.k];txt(`${v[0]} ${v[1]}: from ${OC(v[2])} to ${OC(v[3])}`,A.W/2,A.H*.8,14);txt(s.start==null?'Tap the start time':'Now tap the end time',A.W/2,A.H*.9,13)}else txt('Each bar shows how long it took.',A.W/2,A.H*.86,14)}
function mark(h){const s=S.m;if(s.k>=3)return;const v=MARK[s.k];
 if(s.start==null){if(h!==v[2]){A.sound.miss();return say(`${v[1]} starts at ${OC(v[2])}. Tap ${H12(v[2])} on the timeline first.`)}s.start=h;A.sound.tick();return say(`Start: ${OC(h)}. Now tap ${OC(v[3])}, the end.`)}
 if(h!==v[3]){A.sound.miss();return say(h<=s.start?'The end comes after the start. Look to the right.':`${v[1]} ends at ${OC(v[3])}, not ${OC(h)}.`)}
 s.k++;s.start=null;A.sound.pop();say(`From ${OC(v[2])} to ${OC(v[3])} is ${HRS(v[3]-v[2])}.`+(s.k>=3?' Painting ends last, but swimming took just as long: 2 hours.':''))}
/* 4. hop the hours across 12 */
function drawHop(){const s=S.h;back();if(s.k>=2){axis([]);txt('11 to 2 is 3 hours. 12 to 4 is 4 hours.',A.W/2,A.H*.5,15);txt('Count the hops. Do not take away.',A.W/2,A.H*.62,13);return}
 const v=HOPS[s.k],T=tl(),g=A.ctx;axis([v[2],...s.hops]);txt(`${v[0]} ${v[1]}: ${OC(v[2])} to ${OC(v[3])}`,A.W/2,A.H*.08,14);
 let prev=v[2];s.hops.forEach((h,j)=>{const a=HX(prev),b=HX(h);g.strokeStyle=OK;g.lineWidth=3;g.beginPath();g.moveTo(a,T.y+4);g.quadraticCurveTo((a+b)/2,T.y+T.u*.8,b,T.y+4);g.stroke();mid(g);g.font=font(sz(13));g.fillStyle=A.col.tx;g.fillText(String(j+1),(a+b)/2,T.y+T.u*.5);prev=h});
 txt(`Hops: ${s.hops.length} = ${HRS(s.hops.length)}`,A.W/2,A.H*.62,18,s.hops.length&&s.hops[s.hops.length-1]===v[3]?OK:null);txt(`Tap the next hour after ${H12(prev)}`,A.W/2,A.H*.78,13)}
function hop(h){const s=S.h;if(s.k>=2)return;const v=HOPS[s.k],prev=s.hops.length?s.hops[s.hops.length-1]:v[2],want=prev+1;
 if(h!==want){A.sound.miss();return say(h<=prev?`Go forward in time. After ${H12(prev)} comes ${H12(want)}.`:`One hour at a time: the next hour after ${H12(prev)} is ${H12(want)}.`)}
 s.hops.push(h);A.sound.tick();if(h<v[3])return say(`${s.hops.length} ${s.hops.length===1?'hop':'hops'}.`+(h===12?' After 12 the clock starts again at 1.':''));
 const n=s.hops.length;s.k++;s.hops=[];A.sound.pop();say(`${OC(v[2])} to ${OC(v[3])} is ${n} hops, so ${HRS(n)}.`+(v[2]===11?' Not 11 take away 2.':''))}
/* 5. fit into gaps */
const itemCard=()=>{const w=lo(200,A.W*.5),h=lo(84,A.H*.18);return{x:A.W/2-w/2,y:A.H*.6,w,h}};
function drawFit(){const s=S.f,T=tl(),y=T.y+A.H*.1,bh=sz(40);back();axis([]);
 BOOK.forEach(b=>{const g=A.ctx;g.fillStyle=A.col.dark?'#475569':'#cbd5e1';A.paint.rrect(HX(b[0])+1,y,HX(b[1])-HX(b[0])-2,bh,6);g.fill();g.font=font(sz(10),700);mid(g);g.fillStyle=INK;g.fillText(A.narrow?'busy':b[2],(HX(b[0])+HX(b[1]))/2,y+bh/2,HX(b[1])-HX(b[0])-4)});
 GAPS.forEach((G,j)=>{const g=A.ctx,x=HX(G[0])+1,w=HX(G[1])-HX(G[0])-2;g.strokeStyle=s.bad===j?NO:OK;g.lineWidth=s.bad===j?4:2;g.setLineDash([6,4]);A.paint.rrect(x,y,w,bh,6);g.stroke();g.setLineDash([]);const it=s.in.findIndex(q=>q===j);
  if(it>=0)bar(x+2,x+2+FIT[it][2]*T.u-4,y+4,bh-8,BAR[it],FIT[it][0]);else txt('free',x+w/2,y+bh+sz(12),11)});
 if(s.k<2){const v=FIT[s.k],r=S.drag?{...itemCard(),x:S.drag.x-itemCard().w/2,y:S.drag.y-itemCard().h/2}:itemCard();card(r,v[0],`${v[1]}\n${HRS(v[2])}`,{on:!!S.drag})}else txt('Both fit!',A.W/2,A.H*.7,18,OK)}
function fit(j){const s=S.f;if(s.k>=2)return;const v=FIT[s.k],G=GAPS[j],len=G[1]-G[0];
 if(s.in.includes(j)){s.bad=j;A.sound.miss();return say('That gap is full now. Pick a free one.')}
 if(len<v[2]){s.bad=j;A.sound.miss();return say(`The gap from ${OC(G[0])} to ${OC(G[1])} is only ${HRS(len)}. The ${v[1].toLowerCase()} needs ${HRS(v[2])}.`)}
 s.in[s.k]=j;s.k++;s.bad=null;A.sound.pop();say(`${OC(G[0])} to ${OC(G[1])} is ${HRS(len)}: the ${v[1].toLowerCase()} fits.`+(s.k>=2?' A gap must be at least as long as the activity.':''))}
function draw(){const k=mode();if(k==='chal'){back();txt('Challenge',A.W/2,A.H*.3,18);txt('Same unit first. Then compare.',A.W/2,A.H*.5,14);return}
 ({pair:drawPair,three:drawThree,mark:drawMark,hop:drawHop,fit:drawFit})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='pair'){const r=pairCards().find(r=>inside(p,r));if(r)pickPair(r.i);return false}
 if(k==='three'){const r=threeCards().find(r=>inside(p,r)&&!S.t.at.includes(r.i));if(r){S.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='mark'||k==='hop'){const h=markAt(p);if(h!=null)(k==='mark'?mark:hop)(h);return false}
 if(k==='fit'&&S.f.k<2&&inside(p,itemCard())){S.drag={x:p.x,y:p.y};return true}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=mode();
 if(k==='three'){const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,inS=slots().some(r=>inside(p,r));if(tap||inS)place(d.i);else A.redraw();return}
 if(k==='fit'){const T=tl(),j=GAPS.findIndex(G=>p.x>=HX(G[0])&&p.x<=HX(G[1])&&p.y<T.y+A.H*.3);if(j>=0)fit(j);else{say('Drop it on a free gap on the timeline.')}}}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{p:{k:0,bad:null,show:0,wait:0},t:{at:[],bad:null},m:{k:0,start:null},h:{k:0,hops:[]},f:{k:0,in:[],bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);S.hook=watch(i,ok,msg)}
function play(i,acts){steps[i].go();const s0=S.p;acts.forEach(([ms,f])=>setTimeout(()=>{if(S.p===s0)f()},ms))}
const longer=k=>PAIRS[k][0][3]>PAIRS[k][1][3]?0:1;
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
 if(k==='pair'&&S.p.k<3&&!S.p.wait)PAIRS[S.p.k].forEach((v,i)=>B(`${v[0]} ${v[1]}, ${v[2]}`,()=>pickPair(i)));
 if(k==='three'&&S.t.at.length<3)THREE.forEach((v,i)=>{if(!S.t.at.includes(i))B(`Next: ${v[1]}, ${v[2]}`,()=>place(i))});
 if(k==='mark'&&S.m.k<3||k==='hop'&&S.h.k<2)for(let h=8;h<=17;h++)B(OC(h),()=>(k==='mark'?mark:hop)(h));
 if(k==='fit'&&S.f.k<2)GAPS.forEach((G,j)=>B(`${FIT[S.f.k][1]} in gap ${H12(G[0])} to ${H12(G[1])}`,()=>fit(j)))}
const steps=[
{h:'Look at the unit',p:'Each card says how long something takes. Tap the one that takes longer. Watch the unit: hours or minutes.',
 predict:{q:'A film takes 2 hours. A car trip takes 45 minutes. Which takes longer?',opts:['The car trip: 45 is bigger','The film'],ans:1},task:'Pick the longer one in 3 pairs',
 show:()=>play(0,[[300,()=>pickPair(longer(0))],[1500,()=>pickPair(longer(1))],[2700,()=>pickPair(longer(2))]]),
 go:()=>open(0,'Two cards: Film, 2 hours, and Car trip, 45 minutes. Which takes longer?',()=>S.p.k>=3,'1 hour is 60 minutes, so 2 hours is 120 minutes. That is longer than 45 minutes.')},
{h:'Line them up',p:'Put the three in order from shortest to longest. Drag a card, or tap it. Turn hours into minutes to help.',
 predict:{q:'Which is the longest: 90 minutes, 1 hour or 2 hours?',opts:['90 minutes','1 hour','2 hours'],ans:2},task:'Order all 3, shortest first',
 show:()=>play(1,[[400,()=>place(2)],[900,()=>place(0)],[1400,()=>place(1)]]),
 go:()=>open(1,'Three cards: Football match, 90 minutes. Film, 2 hours. Bike ride, 1 hour. Three empty rows: shortest, middle, longest.',()=>S.t.at.length>=3,'2 hours is 120 minutes, so it is longer than 90 minutes.')},
{h:'Mark it on a timeline',p:'A timeline shows the hours of a day in order. Tap when each thing starts, then when it ends. The bar shows how long.',task:'Mark all 3 on the timeline',
 show:()=>play(2,MARK.flatMap((v,j)=>[[300+j*900,()=>mark(v[2])],[700+j*900,()=>mark(v[3])]])),
 go:()=>open(2,'A timeline from 8 to 5 o\'clock. Mark Swimming, from 9 to 11 o\'clock.',()=>S.m.k>=3,'The length of each bar shows how long it took.')},
{h:'Hop the hours',p:'To find how long, hop along the hours and count the hops. After 12 the clock starts again at 1.',
 predict:{q:'A zoo trip goes from 11 o\'clock to 2 o\'clock. How long is that?',opts:['9 hours','3 hours','2 hours'],ans:1},task:'Hop both trips',
 show:()=>play(3,[[300,()=>hop(12)],[700,()=>hop(13)],[1100,()=>hop(14)],[1700,()=>hop(13)],[2100,()=>hop(14)],[2500,()=>hop(15)],[2900,()=>hop(16)]]),
 go:()=>open(3,'A timeline. Zoo trip from 11 o\'clock to 2 o\'clock. Tap each hour to hop.',()=>S.h.k>=2,'11 to 2 is 3 hops: 12, 1, 2. That is 3 hours.')},
{h:'Fit it in',p:'Grey parts of the day are busy. Drag each activity into a free gap that is long enough.',
 predict:{q:'A bike ride takes 2 hours. Which free gap fits it?',opts:['9 to 10','11 to 1','3 to 4'],ans:1},task:'Fit the ride and the walk',
 show:()=>play(4,[[400,()=>fit(1)],[1200,()=>fit(0)]]),
 go:()=>open(4,'A busy day. Free gaps: 9 to 10, 11 to 1, and 3 to 4. A bike ride of 2 hours waits to go in.',()=>S.f.k>=2,'11 to 1 is 2 hours, so the ride fits there. The 1-hour gaps are too short for it.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 {q:'A film takes 2 hours. A car trip takes 45 minutes. Which takes longer?',a:'The film',o:[['The car trip','bignum'],['They are the same','same']]},
 {q:'Which is the longest: 90 minutes, 1 hour or 2 hours?',a:'2 hours',o:[['90 minutes','bignum'],['1 hour','short']]},
 {q:'Ali swims from 9 to 11 o\'clock. Ben reads from 3 to 4 o\'clock. Who spent longer?',a:'Ali: 2 hours',o:[['Ben: he ended last','endlast'],['Both the same','same']]},
 {q:'How long is it from 10 o\'clock to 1 o\'clock?',a:'3 hours',o:[['9 hours','subtract'],['1 hour','endnum']]},
 {q:'A walk takes 1 hour. A game takes 50 minutes. Which is shorter?',a:'The game',o:[['The walk','smallnum'],['They are the same','same']]},
 {q:'A gap is free from 2 o\'clock to 3 o\'clock. Will a 2-hour film fit?',a:'No: the gap is 1 hour',o:[['Yes','fit'],['Yes, if it starts at 2','fit']]}];
function why(t){let m='Change both to the same unit, then compare.';
 if(t==='bignum')m='The bigger number is not always longer. 1 hour is 60 minutes, so 2 hours is 120 minutes.';
 if(t==='smallnum')m='1 is a small number, but 1 hour is 60 minutes. That is longer than 50 minutes.';
 if(t==='same')m='They are not the same. Turn the hours into minutes: 60 minutes in each hour.';
 if(t==='short')m='1 hour is 60 minutes. That is the shortest one, not the longest.';
 if(t==='endlast')m='Ending last does not make it longest. Count the hours from start to end.';
 if(t==='subtract')m='Do not take 1 from 10. Hop on: 11, 12, 1. That is 3 hops, 3 hours.';
 if(t==='endnum')m='1 is the end time, not how long. Hop from 10: 11, 12, 1 is 3 hours.';
 if(t==='fit')m='2 to 3 o\'clock is only 1 hour. A 2-hour film needs a gap of 2 hours or more.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>markQ(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function markQ(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Time interval lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move,up});buttons()}}).start()})})();
