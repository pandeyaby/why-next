/* Flagship – interpreting visual information in texts (ages 9–10; CCSS RI.4.7): what a chart adds, reading a scale,
   timelines vs word order, which visual answers a question, words + chart together. */
(()=>{
/* [fact, 0 words/1 chart/2 both, why] */
const ART='Ana grew bean plants. Some sat on a sunny window sill and some in a dark cupboard. The sunny plants grew taller. The cupboard plants went pale yellow.';
const BEAN={title:'Height after 2 weeks (cm)',max:20,step:5,lab:5,bars:[['sunny',18],['cupboard',7]]};
const WHO=[['The plants were beans.',0,'Only the words say beans.'],
 ['The sunny plants reached 18 cm.',1,'The words give no number. The bar stops at 18.'],
 ['The sunny plants grew taller.',2,'The words say it, and the sunny bar is taller too.'],
 ['The cupboard plants went pale yellow.',0,'Colour is only in the words. A height chart can’t show it.'],
 ['They were measured after 2 weeks.',1,'2 weeks is only in the chart title.'],
 ['The sunny plants were 11 cm taller.',1,'You need 18 and 7, and only the chart has them.']];
const BINS=['only the words','only the chart','both say it'];
/* [question, answer, [[wrong, why]]] */
const LIB={title:'Books borrowed this week',max:40,step:5,lab:10,bars:[['Mon',15],['Tue',30],['Wed',25],['Thu',40],['Fri',10]]};
const READ=[['How many books on Tuesday?','30',[['6','Each line is worth 5, so 6 lines make 30.'],['25','25 is Wednesday. Find the Tue label first.']]],
 ['How many books on Monday?','15',[['3','Each line is 5: 3 × 5 = 15.'],['10','Halfway from 10 to 20 is 15.']]],
 ['Which day had the most books?','Thu',[['Fri','Friday is last, not tallest.'],['Tue','Tuesday is tall, but Thursday reaches 40.']]],
 ['How many more on Thursday than Friday?','30',[['40','40 is Thursday on its own. Take away Friday’s 10.'],['50','50 adds them. How many more means 40 − 10.']]]];

const TXT='Long before the first plane flew, people talked on telephones. People walked on the Moon 66 years after that first flight.';
const EV=[[1876,'telephone'],[1903,'first plane flight'],[1969,'Moon landing'],[1991,'World Wide Web']];
/* [question, right event, {wrong: why}] */
const TQ=[['Tap the event that came first.',0,{1:'The words name the plane first, but 1876 is before 1903.',2:'1969 is far to the right: later, not first.',3:'1991 is the newest. Left on the timeline is earlier.'}],
 ['Tap what happened 66 years after the first flight.',2,{0:'1876 is before the flight. 1903 + 66 = 1969.',1:'That is the flight itself. Count on 66 years from 1903.',3:'1903 + 66 is 1969, not 1991.'}],
 ['Tap the event the words never mention.',3,{0:'The words do mention telephones.',1:'The words mention the first plane.',2:'The words mention walking on the Moon.'}],
 ['Tap the event closest in time to the first flight.',0,{2:'1969 is 66 years after 1903. 1876 is only 27 before.',3:'1991 is 88 years after 1903.',1:'That is the flight. Which other dot is nearest 1903?'}]];

const KINDS=['bar chart','timeline','labelled diagram','map'];
const PICK=[['Which pet is most popular in our class?',0,'Comparing amounts: a bar chart.'],['In what order were the castles built?',1,'Order in time: a timeline.'],
 ['What are the parts of a flower?',2,'Parts and names: a labelled diagram.'],['Where does the river reach the sea?',3,'Where things are: a map.'],
 ['How many hours of sun did each month get?',0,'Amounts for each month: a bar chart.'],['When did each king rule?',1,'Dates and order: a timeline.']];
const KWHY=['A bar chart compares amounts.','A timeline shows when.','A diagram shows parts.','A map shows where.'];
/* [words, chart, question, [[option, ok, why]]] */
const BOTH=[['30 children each voted for one trip.',{title:'Votes',max:15,step:5,lab:5,bars:[['zoo',14],['farm',9],['museum',7]]},'Did more than half the class pick the zoo?',
  [['No: 14 is less than 15, half of 30.',1,''],['Yes: the zoo bar is the tallest.',0,'Tallest means most votes. Half of 30 is 15; the zoo got 14.'],['We can’t tell.',0,'We can: 30 children from the words, 14 from the chart.']]],
 ['Every bag holds 6 apples.',{title:'Bags sold',max:10,step:2,lab:2,bars:[['Mon',4],['Tue',7]]},'How many apples were sold on Tuesday?',
  [['42 apples',1,''],['7 apples',0,'7 is bags, not apples. Each bag holds 6: 7 × 6.'],['6 apples',0,'6 is one bag. The chart says 7 bags were sold.']]],
 ['The pool shuts on any day the water is under 20 °C.',{title:'Water (°C)',max:25,step:5,lab:5,bars:[['Mon',24],['Tue',15],['Wed',22]]},'On which day was the pool shut?',
  [['Tuesday',1,''],['Monday',0,'Monday is 24 °C, the warmest. It shuts under 20.'],['We can’t tell.',0,'The rule is in the words, the temperatures in the chart. Join them.']]]];
VIS.reg('flagvisinf',c=>{let A,g,pad,chal,qi=-1,gen=0;const st={};
const INK='#0f172a',SHEET='#ffffff',EDGE='#64748b',OKC='#047857',BADC='#be123c',HOLD='#1d4ed8',BAR='#0e7490',BAR2='#a16207',PALE='#ffe4e6';
const k=n=>Math.round(n*(A.narrow?.9:1.06)),fnt=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`,on=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const PH=['who','read','time','kind','both','quiz'],ph=()=>PH[A.step],LEN={who:WHO,read:READ,time:TQ,kind:PICK,both:BOTH},over=n=>st[n].i>=LEN[n].length;
const bad=()=>A.col.dark?'#fda4af':BADC;
const mk=(h,bg,n)=>({n,bg:h?PALE:bg,ring:h?BADC:null});
function floor(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function font(n,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function wrap(t,x,y,w,n){const L=[];let r='';String(t).split(' ').forEach(q=>{const s=r?r+' '+q:q;if(g.measureText(s).width>w&&r){L.push(r);r=q}else r=s});L.push(r);
 const lh=k(n)*1.25;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*lh));return L.length}
function box(r,t,o){o=o||{};g.fillStyle=o.bg||SHEET;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ring?3.4:1.3;g.strokeStyle=o.ring||EDGE;g.stroke();
 if(t!=null){g.fillStyle=o.fg||INK;font(o.n||16,o.w||700);wrap(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||16)}}
function head(t,won){font(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=k(14)+14,y=A.H*.02;box({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':SHEET,ring:won?OKC:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){g.fillStyle=col||A.col.tx;font(n||14,650);wrap(t,A.W/2,y,A.W-26,n||14)}
function words(t,y,h){const r={x:12,y,w:A.W-24,h};box(r,null,{bg:'#fef9c3'});g.fillStyle='#422006';font(14,650);wrap(t,A.W/2,y+h/2,r.w-18,14)}
function closing(t,L){floor();head(t,1);L.forEach((s,i)=>box({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* chart on a white sheet: same in both themes */
function chart(C,r,hi){box(r,null,{});const L=r.x+k(34),R=r.x+r.w-10,T=r.y+k(30),B=r.y+r.h-k(24),yv=v=>B-(v/C.max)*(B-T);
 g.fillStyle=INK;font(12,800);g.fillText(C.title,r.x+r.w/2,r.y+k(14));font(11,700,'right');
 for(let v=0;v<=C.max;v+=C.step){g.strokeStyle=v%C.lab?'#e2e8f0':'#94a3b8';g.lineWidth=1;g.beginPath();g.moveTo(L,yv(v));g.lineTo(R,yv(v));g.stroke();if(!(v%C.lab)){g.fillStyle=INK;g.fillText(String(v),L-5,yv(v))}}
 const n=C.bars.length,sl=(R-L)/n,bw=Math.min(sl*.56,k(70));C.bars.forEach(([lb,v],i)=>{const x=L+sl*(i+.5)-bw/2;g.fillStyle=hi===i?BAR2:BAR;g.fillRect(x,yv(v),bw,B-yv(v));
  g.fillStyle=INK;font(11,750);g.fillText(lb,x+bw/2,B+k(11))})}
/* ---- 1: who tells you that? ---- */
function binR(){const y=A.H*.75,h=A.H*.22,gp=8,w=(A.W-24-2*gp)/3;return BINS.map((t,b)=>({b,t,x:12+b*(w+gp),y,w,h}))}
function cardR(){const w=Math.min(A.W-24,k(340)),h=k(46);return st.drag?{x:st.drag.x-w/2,y:st.drag.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.58,w,h}}
function drawWho(){const s=st.who;floor();if(over('who'))return closing('All 6 facts sorted',['Some facts are only in the words.','Some are only in the chart.','A chart adds facts.']);
 head(`Fact ${s.i+1} of 6: who tells you that?`);words(ART,A.H*.09,A.H*.19);chart(BEAN,{x:A.W*.18,y:A.H*.3,w:A.W*.64,h:A.H*.26});
 binR().forEach(r=>box(r,r.t,{n:14,bg:['#fef9c3','#cffafe','#dcfce7'][r.b],ring:s.miss===r.b?BADC:null}));box(cardR(),WHO[s.i][0],{n:15,ring:st.drag?HOLD:null});if(s.msg)note(s.msg,A.H*.69,12,bad())}
function who(b){const s=st.who;if(over('who'))return;const [f,ans,why]=WHO[s.i];
 if(b===ans){return nx(s,`${BINS[ans]}. ${why}`)}
 s.miss=b;A.sound.miss();s.msg=(b===2?'Not both. ':b===0?'Check the words again. ':'Check the chart again. ')+why;speak(s.msg)}
/* ---- 2: read the scale ---- */
function optR(){const Q=READ[st.read.i],all=[Q[1],...Q[2].map(x=>x[0])],r=st.read.i%3,ord=all.slice(r).concat(all.slice(0,r)),w=Math.min(k(130),(A.W-44)/3),tot=3*w+20;
 return ord.map((t,j)=>({t,x:A.W/2-tot/2+j*(w+10),y:A.H*.8,w,h:k(50)}))}
function drawRead(){const s=st.read;floor();if(over('read'))return closing('All 4 read from the scale',['Check what each line is worth first.','Find the label, then read the bar top.']);
 head(`Question ${s.i+1} of 4`);chart(LIB,{x:12,y:A.H*.09,w:A.W-24,h:A.H*.5});note(READ[s.i][0],A.H*.63,15);
 optR().forEach(r=>box(r,r.t,mk(s.miss===r.t,SHEET,18)));if(s.msg)note(s.msg,A.H*.72,12,bad())}
function read(t){const s=st.read;if(over('read'))return;const [q,a,W]=READ[s.i];
 if(t===a){return nx(s,`Yes, ${a}. ${q}`)}
 s.miss=t;A.sound.miss();s.msg=(W.find(x=>x[0]===t)||[0,''])[1];speak(s.msg)}
/* ---- 3: the timeline ---- */
function dotR(){const L=k(34),R=A.W-k(34),y=A.H*.52,span=[1860,2000];return EV.map(([yr,t],i)=>({i,yr,t,cx:L+(yr-span[0])/(span[1]-span[0])*(R-L),cy:y}))}
function evBox(d){const w=k(96),h=k(58),up=d.i%2===0;return{x:Math.max(4,Math.min(A.W-w-4,d.cx-w/2)),y:up?d.cy-h-k(24):d.cy+k(24),w,h}}
function drawTime(){const s=st.time;floor();if(over('time'))return closing('Timeline read',['Left is earlier.','Words can name events out of order.','A timeline can add events.']);
 head(`Question ${s.i+1} of 4`);words(TXT,A.H*.09,A.H*.17);const D=dotR(),y=D[0].cy;
 g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(k(16),y);g.lineTo(A.W-k(16),y);g.stroke();
 D.forEach(d=>{const r=evBox(d),wrong=s.miss===d.i;g.fillStyle=A.col.tx;g.beginPath();g.arc(d.cx,y,k(7),0,7);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.beginPath();g.moveTo(d.cx,y);g.lineTo(d.cx,r.y+(r.y<y?r.h:0));g.stroke();
  box(r,`${d.yr} ${d.t}`,{n:12,bg:wrong?PALE:'#e0f2fe',ring:wrong?BADC:null})});note(TQ[s.i][0],A.H*.82,15);if(s.msg)note(s.msg,A.H*.92,12,bad())}
function time(i){const s=st.time;if(over('time'))return;const [q,ans,why]=TQ[s.i];
 if(i===ans){return nx(s,`Yes: ${EV[i][0]}, ${EV[i][1]}.`)}
 s.miss=i;A.sound.miss();s.msg=why[i]||'Look again at the years on the timeline.';speak(s.msg)}
/* ---- 4: which visual answers it? ---- */
function kindR(){const gp=8,w=(A.W-24-gp)/2,h=A.H*.25;return KINDS.map((t,j)=>({j,t,x:12+(j%2)*(w+gp),y:A.H*.42+Math.floor(j/2)*(h+gp),w,h}))}
function qR(){const w=Math.min(A.W-24,k(360)),h=k(52);return st.drag?{x:st.drag.x-w/2,y:st.drag.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.13,w,h}}
function icon(r,j){const x=r.x+r.w/2,y=r.y+r.h*.62,s=Math.min(r.w,r.h)*.22;g.strokeStyle=INK;g.fillStyle=BAR;g.lineWidth=2;
 if(j===0){[.5,1,.7].forEach((v,i)=>g.fillRect(x-s+i*s*.75,y+s-2*s*v,s*.55,2*s*v))}
 if(j===1){g.beginPath();g.moveTo(x-1.6*s,y);g.lineTo(x+1.6*s,y);g.stroke();[-1.2,-.2,1.1].forEach(d=>{g.beginPath();g.arc(x+d*s,y,4,0,7);g.fill()})}
 if(j===2){g.beginPath();g.arc(x-.4*s,y,s*.6,0,7);g.stroke();g.beginPath();g.moveTo(x+.2*s,y);g.lineTo(x+1.4*s,y-.6*s);g.stroke();g.fillStyle=INK;g.fillRect(x+1.2*s,y-.8*s,s*.6,4)}
 if(j===3){g.beginPath();g.moveTo(x-1.5*s,y+s);g.bezierCurveTo(x-.5*s,y-s,x+.2*s,y+s,x+1.5*s,y-.8*s);g.strokeStyle=BAR;g.lineWidth=4;g.stroke()}}
function drawKind(){const s=st.kind;floor();if(over('kind'))return closing('All 6 matched',['How much? bar chart. When? timeline.','What parts? diagram. Where? map.']);
 head(`Question ${s.i+1} of 6: drag it to the visual that answers it`);if(s.msg)note(s.msg,A.H*.34,12,bad());
 kindR().forEach(r=>{box(r,null,{bg:s.miss===r.j?PALE:'#f1f5f9',ring:s.miss===r.j?BADC:null});g.fillStyle=INK;font(15,800);g.fillText(r.t,r.x+r.w/2,r.y+k(18));icon(r,r.j)});
 box(qR(),PICK[s.i][0],{n:15,bg:'#ede9fe',fg:'#2e1065',ring:st.drag?HOLD:null})}
function kind(j){const s=st.kind;if(over('kind'))return;const [q,ans,why]=PICK[s.i];
 if(j===ans){return nx(s,why)}
 let m;if(ans===1)m='This asks when.';else if(ans===3)m='This asks where.';else if(ans===2)m='This asks about parts.';else m='This asks how much.';
 s.miss=j;A.sound.miss();s.msg=KWHY[j]+' '+m;speak(s.msg)}
/* ---- 5: words + chart together ---- */
function bothR(){const O=BOTH[st.both.i][3],r=st.both.i%3,ord=O.slice(r).concat(O.slice(0,r)),h=k(42),gp=6;return ord.map((o,j)=>({o,x:16,w:A.W-32,h,y:A.H*.65+j*(h+gp)}))}
function drawBoth(){const s=st.both;floor();if(over('both'))return closing('Words + chart joined',['The words gave a rule.','The chart gave numbers.','Together: a new fact.']);
 const [w,C,q]=BOTH[s.i];head(`Puzzle ${s.i+1} of 3: you need both`);words(w,A.H*.09,A.H*.08);chart(C,{x:A.W*.14,y:A.H*.18,w:A.W*.72,h:A.H*.3});note(q,A.H*.53,15);
 bothR().forEach(r=>box(r,r.o[0],mk(s.miss===r.o[0],SHEET,14)));if(s.msg)note(s.msg,A.H*.605,12,bad())}
function both(o){const s=st.both;if(over('both'))return;
 if(o[1]){return nx(s,`Yes: ${o[0]} Words and chart together.`)}
 s.miss=o[0];A.sound.miss();s.msg=o[2];speak(s.msg)}
/* ---- pointer ---- */
function down(p){const n=ph();
 if(n==='read'&&!over('read')){const r=optR().find(r=>on(p,r));if(r)read(r.t)}
 if(n==='time'&&!over('time')){const d=dotR().find(d=>on(p,evBox(d))||Math.hypot(p.x-d.cx,p.y-d.cy)<k(20));if(d)time(d.i)}
 if(n==='both'&&!over('both')){const r=bothR().find(r=>on(p,r));if(r)both(r.o)}
 if(n==='who'&&!over('who')&&on(p,cardR())){st.drag={x:p.x,y:p.y};A.redraw();return true}
 if(n==='kind'&&!over('kind')&&on(p,qR())){st.drag={x:p.x,y:p.y};A.redraw();return true}return false}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}}
function up(p){if(!st.drag)return;st.drag=null;const n=ph();
 if(n==='who'){const b=binR().find(r=>on(p,r));if(b)return who(b.b)}
 if(n==='kind'){const b=kindR().find(r=>on(p,r));if(b)return kind(b.j)}A.redraw()}
function reset(){gen++;for(const n in st)delete st[n];Object.assign(st,{who:{i:0},read:{i:0},time:{i:0},kind:{i:0},both:{i:0},drag:null,check:()=>{}})}
function nx(s,t){s.i++;s.msg='';s.miss=null;A.sound.pop();speak(t)}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.check()}
function begin(i,first,ok,msg){reset();speak(first);st.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const n=ph(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(n==='who'&&!over('who'))BINS.forEach((t,j)=>b(t,()=>who(j),`${WHO[st.who.i][0]}: ${t}`));
 if(n==='read'&&!over('read'))optR().forEach(r=>b(r.t,()=>read(r.t),`Answer ${r.t}`));
 if(n==='time'&&!over('time'))EV.forEach((e,i)=>b(`${e[0]} ${e[1]}`,()=>time(i)));
 if(n==='kind'&&!over('kind'))KINDS.forEach((t,j)=>b(t,()=>kind(j),`Answer with a ${t}`));
 if(n==='both'&&!over('both'))bothR().forEach(r=>b(r.o[0],()=>both(r.o)))}
const steps=[
{h:'What does the chart add?',p:'A chart can add facts the words leave out, like numbers. Read both.',
predict:{q:'Does a chart only repeat what the words say?',opts:['yes, it shows the same thing','no, it can add new facts'],ans:1},task:'Sort all 6 facts',
show:()=>play(0,WHO.map(q=>()=>who(q[1])),600),go:()=>begin(0,'Drag the fact to who tells you it: the words, the chart, or both.',()=>over('who'),'Read the words and the chart.')},
{h:'Read the scale',p:'Before you read a bar, check what each line is worth. Here each line is 5.',
predict:{q:'Each line is worth 5. A bar reaches the 6th line. How many?',opts:['6','30'],ans:1},task:'Answer all 4',
show:()=>play(1,READ.map(q=>()=>read(q[1])),600),go:()=>begin(1,'Read the chart and tap the answer.',()=>over('read'),'Scale first, then the bar top.')},
{h:'Use the timeline',p:'A timeline puts events in time order: earlier on the left, later on the right. Words can mention things out of order.',
predict:{q:'The words mention the plane before the telephone. Did the plane come first?',opts:['yes, the words said it first','not always: check the dates'],ans:1},task:'Answer all 4',
show:()=>play(2,TQ.map(q=>()=>time(q[1])),600),go:()=>begin(2,'Tap the event on the timeline.',()=>over('time'),'Left is earlier.')},
{h:'Pick the right visual',p:'Each visual answers its own kind of question. How much? When? What parts? Where?',task:'Match all 6',
show:()=>play(3,PICK.map(q=>()=>kind(q[1])),550),go:()=>begin(3,'Drag the question onto the visual that answers it.',()=>over('kind'),'Each visual has its job.')},
{h:'Put them together',p:'The words give a rule or a total; the chart gives the numbers. Join them.',task:'Solve all 3',
show:()=>play(4,BOTH.map(q=>()=>both(q[3][0])),650),go:()=>begin(4,'Read the words and the chart, then tap the answer.',()=>over('both'),'Words + chart together.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const QS=[
{q:'A scale has a line every 5. A bar stops one line above 20. What does it show?',a:'25',o:[['21','Each line is worth 5, not 1.'],['30','30 is two lines above 20.']]},
{q:'The words say “the town grew fast”. What could a graph add?',a:'The number of people each year',o:[['That the town grew fast','The words already say that.'],['What the town smells like','A graph shows numbers, not smells.']]},
{q:'You want to show when each planet was discovered. Which visual?',a:'a timeline',o:[['a map','A map shows where, not when.'],['a labelled diagram','A diagram shows parts, not dates.']]},
{q:'Text: “Each team has 5 players.” Chart: 4 teams. How many players?',a:'20',o:[['4','4 is teams, not players.'],['9','9 adds them. Each team has 5 players: 4 × 5.']]},
{q:'A timeline shows 1066 on the left and 1215 on the right. Which happened first?',a:'the 1066 event',o:[['the 1215 event','Left is earlier on a timeline.'],['the one the words name first','Words can mention events out of order. Check the dates.']]},
{q:'Why look at the chart as well as the words?',a:'It can add facts.',o:[['It is just a nice picture.','Charts carry facts, often numbers.'],['It always repeats the words.','Often it adds new facts.']]}];
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why)}
function draw(){const n=ph();if(n==='quiz'){floor();head('Challenge',1);chart(LIB,{x:12,y:A.H*.12,w:A.W-24,h:A.H*.6});note('Read the scale, the labels and the words.',A.H*.82,15);return}
 ({who:drawWho,read:drawRead,time:drawTime,kind:drawKind,both:drawBoth})[n]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.72,tall:1.4,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Answer buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
