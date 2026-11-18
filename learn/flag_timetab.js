/* Flagship: Reading tables (ages 9–10; NC Year 4 Statistics: interpret and present data using tables; Year 5: complete,
   read and interpret information in tables, including timetables; CCSS 3.MD.1 elapsed time). A bus timetable on the
   canvas: tap cells to read a column (one bus) down to a row (one stop), meet the dash that means "does not stop",
   drag a marker along a time line to count on across an o'clock, find the latest bus that still arrives in time, then
   complete a two-way table from its totals. The challenge reads the same timetable with tagged wrong answers. */
(()=>{
const STOPS=['Park Road','Library','Market Sq','Station'];
const TT=[['08:45','09:20','10:05','11:40'],['08:58','09:33','10:18','11:52'],['09:07',null,'10:27','12:03'],['09:16','09:49','10:36','12:14']];
const mins=t=>{const[h,m]=t.split(':').map(Number);return h*60+m},clock=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');
const asNum=n=>Math.floor(n/60)*100+n%60;   // what you get by wrongly treating 08:45 as the number 845
const cellName=(r,k)=>TT[r][k]?`${TT[r][k]} at ${STOPS[r]}`:`the dash at ${STOPS[r]}`;
// questions answered by tapping one timetable cell; "near" lists the tempting wrong cells offered as buttons
const READ=[{q:'When does the 08:45 bus get to the Library?',a:[1,0],near:[[0,1],[1,1]]},
 {q:'When does the 10:05 bus get to the Station?',a:[3,2],near:[[3,1],[2,2]]},
 {q:'When does the last bus leave Park Road?',a:[0,3],near:[[3,3],[0,0]]}];
const GAP=[{q:'When does the 09:20 bus get to Market Sq?',a:[2,1],near:[[1,1],[3,1]],ok:'The dash means the 09:20 bus does not stop at Market Sq.'},
 {q:'You get to Market Sq at 09:30. When is the next bus?',a:[2,2],near:[[1,1],[2,0]],ok:'10:27. The 09:20 bus skips Market Sq, so the next one is the 10:05 bus.'}];
const LATE=[{q:'Be at the Station by 10:45. Which is the latest bus you can catch from Park Road?',a:[0,2],near:[[0,3],[3,2]],ok:'The 10:05 bus reaches the Station at 10:36, before 10:45. The next one is too late.'},
 {q:'Be at the Library by 09:40. Which is the latest bus you can catch from Park Road?',a:[0,1],near:[[0,0],[0,2]],ok:'The 09:20 bus reaches the Library at 09:33, before 09:40.'}];
const TRIPS=[[0,0],[0,3]];   // [first row, bus]: Park Road to the Station on this bus
// two-way table: favourite sport; null = a gap to fill, with the tempting wrong values
const TW={cols:['Football','Swimming','Netball','Total'],rows:['Year 5','Year 6','Total'],v:[[12,7,9,28],[14,10,6,30],[26,17,15,58]]};
const HOLES=[[0,2,[47,9,16]],[1,0,[46,14,4]],[2,2,[15,3,24]],[2,3,[58,116,43]]];
VIS.reg('flagtimetab',c=>{let A,pad,qa,turn=-1;const S={};
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['read','gap','trip','late','two','chal'][A.step];
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||600} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function wrap(t,y,px,o){const g=A.ctx,rows=[''];g.font=`${(o&&o.w)||600} ${px}px system-ui,sans-serif`;t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-24&&rows[n])rows.push(w);else rows[n]=s});
 rows.slice(0,3).forEach((s,j)=>txt(s,A.W/2,y+j*(px+4),px,o))}
function clear(o){for(const k in S)delete S[k];Object.assign(S,{qi:0,tap:null,msg:'',t:0,mark:0,hole:0,filled:{},after:()=>{}},o||{});A.redraw()}
const bank=()=>({read:READ,gap:GAP,late:LATE})[mode()]||[];
// ---------- timetable geometry ----------
function grid(){const x0=8,lw=A.narrow?84:130,cw=(A.W-x0*2-lw)/4,rh=A.narrow?32:36,y0=A.H*(A.narrow?.17:.18);return{x0,lw,cw,rh,y0}}
function cellAt(p){const G=grid();const k=Math.floor((p.x-G.x0-G.lw)/G.cw),r=Math.floor((p.y-G.y0-G.rh)/G.rh);return k>=0&&k<4&&r>=0&&r<4?[r,k]:null}
function drawTT(g,hl){const C=A.col,G=grid(),px=A.narrow?13:16;
 g.fillStyle=A.mix(C.pn,C.cy,C.dark?.22:.14);g.fillRect(G.x0,G.y0,A.W-G.x0*2,G.rh);
 txt('Stop',G.x0+6,G.y0+G.rh/2,px,{al:'left',w:700});['Bus 1','Bus 2','Bus 3','Bus 4'].forEach((b,k)=>txt(b,G.x0+G.lw+G.cw*(k+.5),G.y0+G.rh/2,px,{w:700}));
 STOPS.forEach((s,r)=>{const y=G.y0+G.rh*(r+1);if(hl&&hl[0]===r){g.fillStyle=A.alpha(C.am,C.dark?.22:.18);g.fillRect(G.x0,y,A.W-G.x0*2,G.rh)}
  txt(s,G.x0+6,y+G.rh/2,px,{al:'left',w:700,max:G.lw-8});
  TT[r].forEach((t,k)=>{const x=G.x0+G.lw+G.cw*k;if(hl&&hl[1]===k){g.fillStyle=A.alpha(C.cy,C.dark?.2:.16);g.fillRect(x,G.y0+G.rh,G.cw,G.rh*4)}
   if(S.tap&&S.tap[0]===r&&S.tap[1]===k){g.strokeStyle=S.good?C.gr:C.rd;g.lineWidth=3;A.paint.rrect(x+3,y+3,G.cw-6,G.rh-6,8);g.stroke()}
   txt(t||'—',x+G.cw/2,y+G.rh/2,px+1,{w:t?600:800})})});
 g.strokeStyle=C.ln;g.lineWidth=1;for(let r=0;r<=5;r++){g.beginPath();g.moveTo(G.x0,G.y0+G.rh*r);g.lineTo(A.W-G.x0,G.y0+G.rh*r);g.stroke()}
 for(let k=0;k<=4;k++){const x=G.x0+G.lw+G.cw*k;g.beginPath();g.moveTo(x,G.y0);g.lineTo(x,G.y0+G.rh*5);g.stroke()}}
// ---------- time line for counting on ----------
function line(){const[r,k]=TRIPS[S.t]||TRIPS[0],a=mins(TT[r][k]),b=mins(TT[3][k]),lo=a-5,hi=b+6,x0=24,x1=A.W-24;return{a,b,lo,hi,x0,x1,y:A.H*.78,X:n=>x0+(n-lo)/(hi-lo)*(x1-x0)}}
function drawTrip(g){const C=A.col,L=line(),k=(TRIPS[S.t]||TRIPS[0])[1],end=L.a+S.mark,hour=Math.ceil(L.a/60)*60,px=A.narrow?12:14;drawTT(g,[null,k]);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();
 for(let n=L.lo;n<=L.hi;n++){const x=L.X(n),big=n%5===0;g.beginPath();g.moveTo(x,L.y-(big?8:4));g.lineTo(x,L.y+(big?8:4));g.stroke();if(n%15===0||n===L.a)txt(clock(n),x,L.y+22,px,{c:n===hour?C.am:C.mu})}
 const leg=(f,t,col,yy)=>{if(t<=f)return;g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(L.X(f),yy);g.quadraticCurveTo((L.X(f)+L.X(t))/2,yy-34,L.X(t),yy);g.stroke();txt(`${t-f} min`,(L.X(f)+L.X(t))/2,yy-30,px+1,{c:col,w:800})};
 if(end>hour&&hour>L.a){leg(L.a,hour,C.cy,L.y-6);leg(hour,end,C.vi,L.y-6)}else leg(L.a,end,C.cy,L.y-6);
 g.fillStyle=C.rd;g.beginPath();g.arc(L.X(end),L.y,11,0,7);g.fill();txt('drag',L.X(end),L.y+40,px,{c:C.mu});
 txt(S.t<TRIPS.length?`Bus ${k+1}: leaves ${clock(L.a)}, arrives ${clock(L.b)}. Now at ${clock(end)}, ${S.mark} min`:'Both trips timed ✓',A.W/2,A.H*.6,A.narrow?13:16,{w:700,c:S.t<TRIPS.length?C.tx:C.gr})}
// ---------- two-way table ----------
function tgrid(){const x0=8,lw=A.narrow?62:110,cw=(A.W-16-lw)/4,rh=A.narrow?36:40,y0=A.H*.14;return{x0,lw,cw,rh,y0}}
function tileAt(j){const w=(A.W-40)/3;return{x:14+j*(w+6),y:A.H*.72,w,h:52}}
function drawTwo(g){const C=A.col,G=tgrid(),px=A.narrow?12:15,h=HOLES[S.hole];
 g.fillStyle=A.mix(C.pn,C.vi,C.dark?.22:.12);g.fillRect(G.x0,G.y0,A.W-16,G.rh);TW.cols.forEach((s,k)=>txt(s,G.x0+G.lw+G.cw*(k+.5),G.y0+G.rh/2,px,{w:700,max:G.cw-4}));
 TW.rows.forEach((s,r)=>{const y=G.y0+G.rh*(r+1);txt(s,G.x0+6,y+G.rh/2,px+1,{al:'left',w:700});
  TW.v[r].forEach((v,k)=>{const x=G.x0+G.lw+G.cw*k,hole=HOLES.findIndex(q=>q[0]===r&&q[1]===k),open=hole>=0&&S.filled[hole]==null,now=h&&h[0]===r&&h[1]===k;
   if(r===2||k===3){g.fillStyle=A.alpha(C.mu,.12);g.fillRect(x,y,G.cw,G.rh)}if(now){g.strokeStyle=C.am;g.lineWidth=3;A.paint.rrect(x+3,y+3,G.cw-6,G.rh-6,8);g.stroke()}
   txt(open?'?':String(v),x+G.cw/2,y+G.rh/2,px+3,{w:800,c:open?C.am:C.tx})})});
 g.strokeStyle=C.ln;g.lineWidth=1;for(let r=0;r<=4;r++){g.beginPath();g.moveTo(G.x0,G.y0+G.rh*r);g.lineTo(A.W-8,G.y0+G.rh*r);g.stroke()}
 if(h)h[2].forEach((v,j)=>{const t=tileAt(j);g.fillStyle=C.pn;A.paint.rrect(t.x,t.y,t.w,t.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt(String(v),t.x+t.w/2,t.y+t.h/2,20,{w:800})});
 else txt('Table complete ✓',A.W/2,A.H*.76,18,{c:C.gr,w:800})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=mode();if(S.qi==null)return;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);const px=A.narrow?14:17;
 if(k==='trip')drawTrip(g);else if(k==='two'){drawTwo(g);const h=HOLES[S.hole];if(h)txt(`Fill the ? in ${TW.rows[h[0]]}, ${TW.cols[h[1]]}`,W/2,H*.06,px,{w:700})}
 else{drawTT(g,S.tap);const Q=bank()[S.qi];if(k!=='chal'){if(Q)wrap(Q.q,H*.045,px-1,{w:700});else txt('All found ✓',W/2,H*.07,px,{w:700,c:C.gr})}}
 if(S.msg)wrap(S.msg,k==='two'?H*.6:k==='trip'?H*.66:H*.72,A.narrow?13:15);A.fx.draw(g)}
// ---------- actions ----------
function say(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(t);buttons();A.redraw();S.after()}
// feedback for a wrong cell names the slip: wrong row, wrong column, the arrival instead of the departure, too late, too early
function slip(Q,r,k){const[ar,ak]=Q.a;
 if(mode()==='late'){const dest=Q.q.includes('Library')?1:3,arr=TT[dest][k];if(r===dest)return'That is when the bus arrives. Go up its column and tap the time it leaves Park Road.';if(r!==0)return'Tap a time in the Park Road row: that is where you get on.';
  return mins(TT[0][k])>mins(TT[0][ak])?`Too late: that bus arrives at ${arr}.`:'That bus gets there in time, but a later bus does too. Latest means the last one that still arrives in time.'}
 if(Q.a[0]===2&&Q.a[1]===2&&r===2&&k===0)return'That bus left Market Sq at 09:07, before you got there.';
 if(k===ak)return`Right bus, wrong stop. That is the ${STOPS[r]} row. Go down to ${STOPS[ar]}.`;
 if(r===ar)return`Right stop, wrong bus. Check which bus the question asks about.`;
 return`That is ${cellName(r,k)}. You need the ${STOPS[ar]} row.`}
function pick(r,k){const Q=bank()[S.qi];if(!Q)return;S.tap=[r,k];
 if(r===Q.a[0]&&k===Q.a[1]){S.good=true;S.qi++;return say(Q.ok||`Yes: ${cellName(r,k)}. Down the bus column, across the stop row.`,true)}
 S.good=false;say(slip(Q,r,k),false)}
function nudge(d){const L=line();if(S.t>=TRIPS.length)return;S.mark=Math.max(0,Math.min(L.hi-L.a,S.mark+d));A.sound.tick();check()}
function check(){const L=line();if(S.t>=TRIPS.length)return;const n=L.a+S.mark,hour=Math.ceil(L.a/60)*60;
 if(n===L.b){const a=hour-L.a,b=L.b-hour;S.t++;S.mark=0;return say(`${a} min to ${clock(hour)}, then ${b} min more: ${a+b} minutes. Not ${asNum(L.b)-asNum(L.a)}: an hour is 60 minutes, not 100.`,true)}
 if(n>L.b)return say(`Past ${clock(L.b)}. Drag back.`,false);say(`${clock(n)}: ${S.mark} min so far.`)}
// a wrong number for a gap: added instead of taking away, took away only one cell, or a total that double counts
function holeSlip(h,v){const[r,k]=h,row=TW.v[r],others=row.slice(0,3).filter((x,j)=>j!==k);
 if(r===2&&k===3)return`The grand total is the Total column added up (28 + 30), or the Total row. ${v} counts things twice or misses some.`;
 if(r===2)return`A column total adds the cells above it: ${TW.v[0][k]} + ${TW.v[1][k]}.`;
 if(v===row[3]+others[0]+others[1])return`${v} is too big. You added. The total is ${row[3]}, so take the other cells away from it.`;
 return`Take away every other cell in the row: ${row[3]} − ${others[0]} − ${others[1]}.`}
function fill(j){const h=HOLES[S.hole];if(!h)return;const v=h[2][j],want=TW.v[h[0]][h[1]];
 if(v!==want)return say(holeSlip(h,v),false);
 S.filled[S.hole]=v;S.hole++;say(h[0]===2&&h[1]===3?'58: both the Total row and the Total column add up to 58. That is the check.':h[0]===2?`${v}: add down the column, ${TW.v[0][h[1]]} + ${TW.v[1][h[1]]}.`:`${v}: ${TW.v[h[0]][3]} take away the other cells in the row.`,true)}
function buttons(){if(!pad||S.qi==null)return;pad.innerHTML='';const k=mode();if(k==='chal')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn sm',style:'min-height:48px;min-width:48px','aria-label':lab||t},pad,t).onclick=f};
 const Q=bank()[S.qi];if(Q){const L=[...Q.near,Q.a],r=(S.qi+1)%3;[...L.slice(r),...L.slice(0,r)].forEach(([r,j])=>add(`${TT[r][j]||'—'} (${STOPS[r]}, bus ${j+1})`,()=>pick(r,j),`Tap ${cellName(r,j)}, bus ${j+1}`))}
 if(k==='trip'&&S.t<TRIPS.length)[[-1,'−1 min'],[1,'+1 min'],[5,'+5 min'],[10,'+10 min']].forEach(([d,t])=>add(t,()=>nudge(d),`Move the marker ${t}`));
 if(k==='two'&&HOLES[S.hole])HOLES[S.hole][2].forEach((v,j)=>add(String(v),()=>fill(j),`Put ${v} in the gap`))}
// ---------- canvas: tap a cell or a tile, drag the time marker ----------
function down(p){const k=mode();if(k==='chal')return false;
 if(k==='trip'){const L=line();if(Math.abs(p.y-L.y)<40){S.drag=true;move(p);return true}return false}
 if(k==='two'){const j=[0,1,2].find(j=>{const t=tileAt(j);return p.x>t.x&&p.x<t.x+t.w&&p.y>t.y&&p.y<t.y+t.h});if(j!=null){fill(j);return true}return false}
 const cell=cellAt(p);if(cell){pick(cell[0],cell[1]);return true}return false}
function move(p){if(!S.drag)return;const L=line();const n=Math.round(L.lo+(p.x-L.x0)/(L.x1-L.x0)*(L.hi-L.lo));S.mark=Math.max(0,Math.min(L.hi-L.a,n-L.a));A.redraw();voice(`${clock(L.a+S.mark)}, ${S.mark} minutes`)}
function up(){if(S.drag){S.drag=false;check()}}
const when=(i,ok,end)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(end+A.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*450))}
function begin(i,hint,ok,end){clear();say(hint);S.after=when(i,ok,end)}
const steps=[
{h:'Columns and rows',p:'In a bus timetable each column is one bus. Each row is one stop. Go down the bus column to the stop row and read the time.',
 predict:{q:'In this timetable, one column shows…',opts:['one stop','one bus on its trip','one hour'],ans:1},
 task:'Tap the time that answers each question',show:()=>play(0,READ.map(Q=>()=>pick(...Q.a))),
 go:()=>begin(0,'Tap a cell in the table, or a button.',()=>S.qi>=READ.length,'Down the column for the bus, across the row for the stop.')},
{h:'The dash',p:'A dash (—) in a timetable means the bus does not stop there. Look for the next bus that does.',
 predict:{q:'Bus 2 has a dash at Market Sq. That means…',opts:['the time is missing by mistake','bus 2 does not stop there','bus 2 waits there'],ans:1},
 task:'Answer both Market Sq questions',show:()=>play(1,GAP.map(Q=>()=>pick(...Q.a))),
 go:()=>begin(1,'Tap the cell that answers the question.',()=>S.qi>=GAP.length,'A dash means no stop, so you wait for the next bus that stops.')},
{h:'How long is the trip?',p:'Count on from the start time. Jump to the next o’clock first, then count on the rest. An hour has 60 minutes, so do not take the times away like ordinary numbers.',
 predict:{q:'Bus 1 leaves at 08:45 and arrives at 09:16. How long is the trip?',opts:['71 minutes','31 minutes','29 minutes'],ans:1},
 task:'Drag the marker to the arrival time for both trips',show:()=>play(2,[()=>nudge(15),()=>nudge(16),()=>nudge(20),()=>nudge(14)]),
 go:()=>begin(2,'Drag the red marker along the line, or use the buttons.',()=>S.t>=TRIPS.length,'Count on to the o’clock, then add the rest.')},
{h:'Arrive in time',p:'To arrive by a set time, read the arrival row first. Find the last bus that gets there in time. Then go up its column to see when it leaves.',
 predict:{q:'You must be at the Station by 10:45. Where do you look first?',opts:['the Park Road row','the Station row','the Bus 4 column'],ans:1},
 task:'Find the latest bus for both trips',show:()=>play(3,LATE.map(Q=>()=>pick(...Q.a))),
 go:()=>begin(3,'Tap the time the bus leaves Park Road.',()=>S.qi>=LATE.length,'Arrival row first, then up the column to the start.')},
{h:'Two-way table',p:'A two-way table sorts data two ways at once: here by year group and by sport. Each Total adds up its own row or column, so you can work out a missing cell.',
 predict:{q:'Year 5 row: 12, 7, ?, total 28. The gap is…',opts:['47, because 28 + 12 + 7','9, because 28 − 12 − 7','16, because 28 − 12'],ans:1},
 task:'Fill all four gaps',show:()=>play(4,HOLES.map(h=>()=>fill(h[2].indexOf(TW.v[h[0]][h[1]])))),
 go:()=>begin(4,'Tap the number that fits the gap.',()=>S.hole>=HOLES.length,'Row totals and column totals both add to the grand total: 58.')},
{h:'Challenge',p:'Use the timetable to answer.',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['When does the 10:05 bus reach Market Sq?',[['10:27','ok'],['10:18','row'],['12:03','col']]],
 ['How long does the 08:45 bus take from Park Road to the Station?',[['31 minutes','ok'],['71 minutes','dec'],['29 minutes','count']]],
 ['Which bus does not stop at Market Sq?',[['Bus 2','ok'],['Bus 1','dash'],['Bus 4','dash']]],
 ['Be at the Station by 10:00. Which is the latest bus from Park Road?',[['09:20','ok'],['08:45','early'],['10:05','late']]],
 ['How long does the 11:40 bus take from Park Road to the Station?',[['34 minutes','ok'],['74 minutes','dec'],['26 minutes','count']]],
 ['A train leaves at 14:05. In 12-hour time that is…',[['2:05 pm','ok'],['4:05 pm','h24'],['14:05 am','h24']]],
 ['You reach the Library at 09:40. When is the next bus from the Library?',[['10:18','ok'],['09:33','gone'],['10:27','row']]]];
function tell(t){let m='Find the bus column, then go down to the stop row.';
 if(t==='row')m='That time is in a different row: it is another stop. Check the stop name on the left.';
 if(t==='col')m='That time is for a different bus. Stay in one column for one bus.';
 if(t==='dec')m='Times are not ordinary numbers: an hour has 60 minutes, not 100. Count on to the o’clock, then add the rest.';
 if(t==='count')m='Count again: first to the o’clock, then on to the arrival time, and add the two jumps.';
 if(t==='dash')m='That bus has a time at Market Sq. Look for the column with a dash (—).';
 if(t==='early')m='That bus is in time, but a later one is too. Latest means the last one that still arrives in time.';
 if(t==='late')m='That bus arrives after 10:00. Read the Station row first.';
 if(t==='h24')m='For times after 12:00, take away 12 hours: 14:05 is 2:05 pm.';
 if(t==='gone')m='That bus has already left the Library before 09:40.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];S.tap=null;
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t)});voice('Challenge: '+Q[0]);A.redraw()}
function judge(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Correct.':'✗ '+tell(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{clear();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Answer buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
