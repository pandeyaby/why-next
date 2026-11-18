/* Flagship: Picture & Bar Graphs (ages 7-8; CCSS 2.MD.10 "draw a picture graph and a bar graph (with single-unit scale)
   to represent a data set with up to four categories. Solve simple put-together, take-apart, and compare problems using
   information presented in a bar graph"; NC 2013 Y2 statistics). Build a picture graph one picture per vote, drag bars
   to the right line on a 0-8 scale, label the title and both axes, pick bars to put together and take apart, and slide
   a level line to read how many more. Not flagtally (tallies, pictograms with a key of 2, block diagrams). */
(()=>{
VIS.reg('flagbgraph',c=>{let A,G,pad,chal,qi=-1,ver=0;const S={};
const INK='#111827',GOOD='#047857',CUE='#1e40af',WRONG='#be123c',CARD='#eff6ff';
const FRUIT=[['Apple',5,'#ef4444'],['Banana',3,'#eab308'],['Grape',6,'#8b5cf6'],['Pear',2,'#22c55e']],TOP=8;
const LABELS=[['Our favourite fruit','title'],['Number of children','side'],['Fruit','base']];
const ASKS=[['How many chose apple or banana?',[0,1],8,'together'],['16 children voted. How many did not choose grape?',[0,1,3],10,'apart']];
const part=()=>['pic','bars','label','sum','gap','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let fs=o.f||(A.narrow?14:17);g.font=`700 ${fs}px system-ui`;while(fs>11&&g.measureText(t).width>(o.w||A.W)-18){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+20),h=o.h||fs*2,L=lim(x-w/2,3,A.W-w-3);g.fillStyle=o.bg||CARD;A.paint.rrect(L,y-h/2,w,h,9);g.fill();g.lineWidth=o.edge?3:1.4;g.strokeStyle=o.edge||'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,L+w/2,y+1);return{x:L,y:y-h/2,w,h}}
const frame=()=>{const x=A.W*(A.narrow?.15:.12),y=A.H*.2,w=A.W*(A.narrow?.8:.83),h=A.H*.56;return{x,y,w,h,u:h/TOP,col:w/4}};
const yAt=v=>{const F=frame();return F.y+F.h-v*F.u},colX=i=>{const F=frame();return F.x+F.col*(i+.5)};
const barRect=(i,v)=>{const F=frame(),bw=F.col*.56;return{x:colX(i)-bw/2,y:yAt(v),w:bw,h:v*F.u}};
function axes(grid){const F=frame(),g=A.ctx;g.font=`600 ${A.narrow?11:13}px system-ui`;g.textAlign='right';g.textBaseline='middle';
 for(let v=0;v<=TOP;v++){const y=yAt(v);if(grid){g.strokeStyle=A.alpha(A.col.tx,v?.22:.9);g.lineWidth=v?1:2.5;g.beginPath();g.moveTo(F.x,y);g.lineTo(F.x+F.w,y);g.stroke()}g.fillStyle=A.col.tx;g.fillText(String(v),F.x-6,y)}
 g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(F.x,F.y-6);g.lineTo(F.x,F.y+F.h);g.lineTo(F.x+F.w,F.y+F.h);g.stroke();
 g.textAlign='center';g.textBaseline='top';g.font=`700 ${A.narrow?12:14}px system-ui`;FRUIT.forEach((f,i)=>g.fillText(f[0],colX(i),F.y+F.h+6))}
function card(){pill('Votes: Apple 5, Banana 3, Grape 6, Pear 2',A.W/2,A.H*.07,{w:A.W*.94,f:A.narrow?13:16,edge:CUE})}
/* ---- 1: picture graph, one picture = one child ---- */
function drawPic(){const g=A.ctx,F=frame();card();g.fillStyle=A.col.tx;g.font=`600 ${A.narrow?12:14}px system-ui`;g.textAlign='center';g.textBaseline='top';
 g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(F.x,F.y+F.h);g.lineTo(F.x+F.w,F.y+F.h);g.stroke();
 FRUIT.forEach((f,i)=>{g.fillStyle=A.col.tx;g.font=`700 ${A.narrow?12:14}px system-ui`;g.fillText(f[0],colX(i),F.y+F.h+6);const r=Math.min(F.u*.42,F.col*.3);
  for(let k=0;k<S.pics[i];k++){g.fillStyle=f[2];g.beginPath();g.arc(colX(i),yAt(k+.5),r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
  if(S.pics[i]===f[1]){g.fillStyle=GOOD;g.font=`800 ${A.narrow?14:17}px system-ui`;g.fillText('✓',colX(i),yAt(S.pics[i])-22)}});
 pill(picsDone()?'Each picture stands for one child':'Tap a column to add a picture',A.W/2,A.H*.93,{f:A.narrow?13:15,edge:picsDone()?GOOD:CUE})}
const picsDone=()=>FRUIT.every((f,i)=>S.pics[i]===f[1]);
function addPic(i,d){const f=FRUIT[i],n=lim(S.pics[i]+d,0,TOP);if(n===S.pics[i])return say(d>0?'That column is full.':'There are no pictures to take off.');S.pics[i]=n;
 if(n>f[1]){A.sound.miss();return say(`${f[0]} has ${f[1]} votes, but there are ${n} pictures. One picture is one child, so take ${n-f[1]} off.`)}
 A.sound.tick();say(n===f[1]?`${f[0]}: ${n} pictures for ${n} votes.`+(picsDone()?' The picture graph is done.':''):`${f[0]}: ${n} so far. The card says ${f[1]}.`)}
/* ---- 2: bars on a single-unit scale ---- */
function drawBars(){const g=A.ctx;card();axes(true);FRUIT.forEach((f,i)=>{const v=S.bars[i],r=barRect(i,v);g.fillStyle=f[2];g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);
  g.fillStyle=S.bars[i]===f[1]?GOOD:CUE;g.fillRect(r.x-4,r.y-5,r.w+8,10)});
 pill(barsDone()?'Every bar ends on its number line':'Drag the top of each bar to its number',A.W/2,A.H*.93,{f:A.narrow?13:15,edge:barsDone()?GOOD:CUE})}
const barsDone=()=>FRUIT.every((f,i)=>S.bars[i]===f[1]);
function setBar(i,v,quiet){S.bars[i]=lim(Math.round(v),0,TOP);if(quiet)return A.redraw();const f=FRUIT[i],b=S.bars[i];
 if(b===f[1]){A.sound.pop();return say(`${f[0]} ends on the line marked ${b}.`+(barsDone()?' All four bars match the votes.':''))}
 say(b===f[1]+1?`${f[0]} is at ${b}. Did you count the 0 line as one? The bar starts at 0, so stop on the line marked ${f[1]}.`:`${f[0]} is at ${b}. The card says ${f[1]}.`)}
/* ---- 3: title and axis labels ---- */
const slots=()=>{const F=frame();return{title:{x:A.W*.2,y:A.H*.02,w:A.W*.6,h:A.H*.1},side:{x:2,y:F.y,w:F.x-28,h:F.h},base:{x:F.x+F.w*.25,y:A.H*.84,w:F.w*.5,h:A.H*.09}}};
const chips=()=>{const w=A.W*.3,gap=(A.W-3*w)/4;return LABELS.map((_,i)=>({x:gap+i*(w+gap),y:A.H*.9,w,h:A.H*.09}))};
function drawLabel(){const g=A.ctx,Z=slots();axes(false);FRUIT.forEach((f,i)=>{const r=barRect(i,f[1]);g.fillStyle=f[2];g.fillRect(r.x,r.y,r.w,r.h)});
 Object.entries(Z).forEach(([k,r])=>{const got=LABELS.find(l=>S.put[l[0]]===k);g.setLineDash(got?[]:[6,4]);g.strokeStyle=S.lMiss===k?WRONG:got?GOOD:CUE;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([]);
  if(got){if(k==='side'){g.save();g.translate(r.x+r.w/2,r.y+r.h/2);g.rotate(-Math.PI/2);g.fillStyle=A.col.tx;g.font=`700 ${A.narrow?12:14}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(got[0],0,0);g.restore()}
   else pill(got[0],r.x+r.w/2,r.y+r.h/2,{f:A.narrow?12:15,bg:'#ecfdf5'})}});
 const C=chips();LABELS.forEach((l,i)=>{if(S.put[l[0]])return;const d=S.drag&&S.drag.i===i?S.drag:null,r=C[i];pill(l[0],r.x+r.w/2+(d?d.dx:0),r.y+r.h/2+(d?d.dy:0),{w:r.w,h:r.h,f:A.narrow?11:14,edge:S.pick===i?CUE:null,bg:'#fef9c3'})})}
const labelsDone=()=>LABELS.every(l=>S.put[l[0]]);
function putLabel(i,slot){const l=LABELS[i];if(S.put[l[0]])return;if(l[1]===slot){S.put[l[0]]=slot;S.pick=null;S.lMiss=null;A.sound.pop();
  return say({title:'The title says what the graph is about.',side:'The side axis counts: it shows the number of children.',base:'The bottom axis names the groups: the fruits.'}[slot]+(labelsDone()?' Now anyone can read your graph.':''))}
 S.lMiss=slot;A.sound.miss();say(l[1]==='title'?'That name tells what the whole graph is about. It goes at the top.':l[1]==='side'?'The numbers go up the side, so the counting label goes up the side axis.':'The fruit names sit along the bottom, so "Fruit" labels the bottom axis.')}
/* ---- 4: put together and take apart ---- */
function drawSum(){const g=A.ctx,Q=ASKS[S.ai];axes(true);pill(Q?Q[0]:'Both questions answered',A.W/2,A.H*.07,{w:A.W*.94,f:A.narrow?13:16,edge:Q?CUE:GOOD});
 FRUIT.forEach((f,i)=>{const r=barRect(i,f[1]),on=S.sel.includes(i);g.fillStyle=on?f[2]:A.alpha(f[2],.35);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=S.sMiss===i?WRONG:on?INK:A.alpha(A.col.tx,.5);g.lineWidth=on||S.sMiss===i?3:1.5;g.strokeRect(r.x,r.y,r.w,r.h)});
 const tot=S.sel.reduce((s,i)=>s+FRUIT[i][1],0);pill(S.sel.length?S.sel.map(i=>FRUIT[i][1]).join(' + ')+' = '+tot:'Tap the bars the question needs',A.W/2,A.H*.93,{f:A.narrow?13:15,edge:S.sel.length?CUE:null})}
function pickBar(i){const Q=ASKS[S.ai];if(!Q)return say('Both questions are done.');if(S.sel.includes(i))return say(`${FRUIT[i][0]} is already in.`);
 if(!Q[1].includes(i)){S.sMiss=i;A.sound.miss();return say(Q[3]==='together'?`The question asks about apple and banana only, not ${FRUIT[i][0].toLowerCase()}.`:'"Did not choose grape" means every bar except grape. Leave grape out.')}
 S.sMiss=null;S.sel.push(i);A.sound.tick();if(Q[1].every(k=>S.sel.includes(k))){const sum=S.sel.map(k=>FRUIT[k][1]).join(' + ');S.ai++;S.sel=[];A.sound.pop();
  return say(Q[3]==='together'?`Put together: ${sum} = 8 children chose apple or banana.`:`Take apart: 16 − 6 = 10, and ${sum} = 10 too. 10 children did not choose grape.`)}
 say(`${FRUIT[i][0]}: ${FRUIT[i][1]}. Which other bar does the question need?`)}
/* ---- 5: how many more? ---- */
function drawGap(){const g=A.ctx,F=frame();axes(true);pill('How many more chose grape than pear?',A.W/2,A.H*.07,{w:A.W*.94,f:A.narrow?13:16,edge:CUE});
 FRUIT.forEach((f,i)=>{const r=barRect(i,f[1]);g.fillStyle=i===2||i===3?f[2]:A.alpha(f[2],.3);g.fillRect(r.x,r.y,r.w,r.h)});
 const y=yAt(S.lvl);g.strokeStyle=CUE;g.lineWidth=4;g.setLineDash([8,5]);g.beginPath();g.moveTo(F.x,y);g.lineTo(F.x+F.w,y);g.stroke();g.setLineDash([]);
 if(S.lvl===2){const r=barRect(2,6);g.fillStyle='#fde047';g.fillRect(r.x,yAt(6),r.w,yAt(2)-yAt(6));g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(r.x,yAt(6),r.w,yAt(2)-yAt(6))}
 pill(S.gapOK?'The gap is 4 squares: 6 − 2 = 4 more':`Level line at ${S.lvl}. Slide it to the top of the pear bar.`,A.W/2,A.H*.93,{f:A.narrow?13:15,edge:S.gapOK?GOOD:CUE})}
function setLvl(v,quiet){S.lvl=lim(Math.round(v),0,TOP);if(quiet)return A.redraw();if(S.lvl===2&&!S.gapOK){S.gapOK=true;A.sound.pop();return say('The line sits on top of the pear bar. The yellow part of the grape bar is the gap: 4 squares. Grape has 4 more.')}
 say(S.lvl===6?'The line is at the top of the grape bar. Slide it down to the top of the pear bar to see the gap.':`The level line is at ${S.lvl}.`)}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dbeafe',A.col.dark?.05:.3);g.fillRect(0,0,A.W,A.H);const k=part();
 if(k==='chal'){pill('Challenge',A.W/2,A.H*.12,{edge:CUE});pill('Cat 7, Dog 5, Fish 2, Rabbit 4',A.W/2,A.H*.5,{f:A.narrow?16:20});return}
 ({pic:drawPic,bars:drawBars,label:drawLabel,sum:drawSum,gap:drawGap})[k]()}
function clear(){ver++;for(const k in S)delete S[k];Object.assign(S,{pics:[0,0,0,0],bars:[1,1,1,1],put:{},pick:null,lMiss:null,ai:0,sel:[],sMiss:null,lvl:6,gapOK:false,drag:null,after:()=>{}})}
function say(t){tell(t);A.redraw();buttons();S.after()}
const when=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function setup(i,intro,test,msg){clear();tell(intro);buttons();S.after=when(i,test,msg)}
function replay(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},A.reduced()?25*(j+1):(ms||400)*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='pic')FRUIT.forEach((f,i)=>{B('+ '+f[0],()=>addPic(i,1),'Add an '+f[0].toLowerCase()+' picture');B('− '+f[0],()=>addPic(i,-1),'Take off an '+f[0].toLowerCase()+' picture')});
 if(k==='bars')FRUIT.forEach((f,i)=>{B(f[0]+' ▲',()=>setBar(i,S.bars[i]+1),f[0]+' bar up one');B(f[0]+' ▼',()=>setBar(i,S.bars[i]-1),f[0]+' bar down one')});
 if(k==='label'){const i=LABELS.findIndex(l=>!S.put[l[0]]);if(i>=0)[['title','Top title'],['side','Side axis'],['base','Bottom axis']].forEach(([s,n])=>B(`"${LABELS[i][0]}": ${n}`,()=>putLabel(i,s),`Put the label ${LABELS[i][0]} on the ${n.toLowerCase()}`))}
 if(k==='sum'&&ASKS[S.ai])FRUIT.forEach((f,i)=>B(f[0]+' bar',()=>pickBar(i),'Use the '+f[0].toLowerCase()+' bar'));
 if(k==='gap'){B('Line down ▼',()=>setLvl(S.lvl-1),'Move the level line down one');B('Line up ▲',()=>setLvl(S.lvl+1),'Move the level line up one')}}
const colAt=p=>{const F=frame();return p.x<F.x||p.x>F.x+F.w?-1:Math.floor((p.x-F.x)/F.col)};
const valAt=p=>{const F=frame();return(F.y+F.h-p.y)/F.u};
function down(p){const k=part();
 if(k==='pic'){const i=colAt(p);if(i>=0&&p.y>A.H*.14&&p.y<A.H*.85)addPic(i,1);return false}
 if(k==='bars'){const i=colAt(p);if(i>=0&&p.y>frame().y-20&&p.y<frame().y+frame().h+10){S.drag={bar:i};setBar(i,valAt(p),true);return true}return false}
 if(k==='label'){const i=chips().findIndex((r,j)=>!S.put[LABELS[j][0]]&&inside(p,r));if(i>=0){S.pick=i;S.drag={i,x0:p.x,y0:p.y,dx:0,dy:0};A.redraw();return true}
  const z=Object.entries(slots()).find(([,r])=>inside(p,r));if(z&&S.pick!=null)putLabel(S.pick,z[0]);return false}
 if(k==='sum'){const i=colAt(p);if(i>=0)pickBar(i);return false}
 if(k==='gap'){S.drag={lvl:1};setLvl(valAt(p),true);return true}return false}
function move(p){const d=S.drag;if(!d)return;if(d.bar!=null)setBar(d.bar,valAt(p),true);else if(d.lvl)setLvl(valAt(p),true);else{d.dx=p.x-d.x0;d.dy=p.y-d.y0;A.redraw()}}
function up(){const d=S.drag;S.drag=null;if(!d)return;if(d.bar!=null)return setBar(d.bar,S.bars[d.bar]);if(d.lvl)return setLvl(S.lvl);
 if(Math.abs(d.dx)+Math.abs(d.dy)<10)return A.redraw();const pt={x:d.x0+d.dx,y:d.y0+d.dy},z=Object.entries(slots()).find(([,r])=>inside(pt,r));if(z)putLabel(d.i,z[0]);else A.redraw()}
const steps=[
{h:'Picture graph',p:'The card shows how children voted for a fruit. Tap a column to add one picture for each vote.',
 predict:{q:'One picture stands for one child. Grape needs 6 votes. How many pictures?',opts:['3, one for every 2','6','12'],ans:1},task:'Match all four columns to the card',
 show:()=>replay(0,FRUIT.flatMap((f,i)=>Array.from({length:f[1]},()=>()=>addPic(i,1))),120),
 go:()=>setup(0,'An empty picture graph with columns for apple, banana, grape and pear.',picsDone,'In a picture graph, count the pictures to read the votes.')},
{h:'Bar graph',p:'Now draw a bar graph of the same votes. Drag the top of each bar to its number on the side.',
 predict:{q:'Grape has 6 votes. Where does its bar stop?',opts:['on the line marked 6','one line higher, counting the 0 line as 1','on any line near the top'],ans:0},task:'Make all four bars match',
 show:()=>replay(1,FRUIT.map((f,i)=>()=>setBar(i,f[1])),450),
 go:()=>setup(1,'A bar graph with a scale from 0 to 8. All four bars are at 1.',barsDone,'Read the number at the top of the bar.')},
{h:'Label it',p:'A graph needs a title and a label on each axis. Drag each label to its place, or tap it and then a dashed box.',task:'Put all 3 labels in place',
 show:()=>replay(2,[()=>putLabel(0,'title'),()=>putLabel(1,'side'),()=>putLabel(2,'base')],600),
 go:()=>setup(2,'A bar graph with no title and no axis labels. Three label cards below.',labelsDone,'Title on top, counting label up the side, groups along the bottom.')},
{h:'Put together, take apart',p:'Answer each question by tapping the bars it needs. The sum builds as you tap.',task:'Answer both questions',
 show:()=>replay(3,[()=>pickBar(0),()=>pickBar(1),()=>pickBar(0),()=>pickBar(1),()=>pickBar(3)],500),
 go:()=>setup(3,'The fruit bar graph with a question above it.',()=>S.ai>1,'Put together: add bars. Take apart: the total minus a bar.')},
{h:'How many more?',p:'Drag the level line from the top of the grape bar down to the top of the pear bar. The gap is the answer.',
 predict:{q:'How many more chose grape than pear?',opts:['8, add both bars','4, the gap between the tops','6, the grape bar'],ans:1},task:'Line up with the pear bar',
 show:()=>replay(4,[()=>setLvl(4),()=>setLvl(2)],500),
 go:()=>setup(4,'The fruit bar graph with a level line at 6.',()=>S.gapOK,'How many more: find the gap between the bar tops.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 {q:'Pets bar graph: Cat 7, Dog 5, Fish 2, Rabbit 4. How many more chose cat than fish?',ans:'5',bad:[['9','add'],['7','bar']]},
 {q:'Pets bar graph: Cat 7, Dog 5, Fish 2, Rabbit 4. How many chose dog or rabbit?',ans:'9',bad:[['1','gap'],['5','one']]},
 {q:'Pets bar graph: Cat 7, Dog 5, Fish 2, Rabbit 4. How many children voted in all?',ans:'18',bad:[['4','groups'],['7','tallest']]},
 {q:'Pets bar graph: Cat 7, Dog 5, Fish 2, Rabbit 4. Which pet got 3 fewer votes than cat?',ans:'Rabbit',bad:[['Dog','fewer'],['Fish','far']]},
 {q:'18 children voted. Cat got 7. How many did not choose cat?',ans:'11',bad:[['25','add'],['7','copy']]},
 {q:'Sam draws the dog bar (5 votes) up to the line marked 6. What went wrong?',ans:'He counted the 0 line as 1',bad:[['Nothing, 6 is right','zero'],['He added the fish votes','mix']]}];
function slip(t){let m='Read each bar by the number on the line at its top.';
 if(t==='add')m='Adding finds a total. "How many more" or "did not choose" needs a take away.';
 if(t==='bar')m='That is just the cat bar. How many more is the gap: 7 − 2.';
 if(t==='gap')m='That is the gap between the bars. "Dog or rabbit" puts them together: 5 + 4.';
 if(t==='one')m='That is only the dog bar. Add the rabbit bar too.';
 if(t==='groups')m='4 is the number of pets on the graph, not children. Add all the bars.';
 if(t==='tallest')m='7 is only the tallest bar. Add every bar: 7 + 5 + 2 + 4.';
 if(t==='fewer')m='Dog has 5, which is 2 fewer than cat. 3 fewer than 7 is 4.';
 if(t==='far')m='Fish has 2, which is 5 fewer than cat. 3 fewer than 7 is 4.';
 if(t==='copy')m='7 chose cat. The rest did not: 18 − 7.';
 if(t==='zero')m='Bars start at 0. A bar for 5 stops on the line marked 5.';
 if(t==='mix')m='Each bar shows one pet only. The bar just ended one line too high.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],list=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=list.slice(r).concat(list.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>judge(t,Q.ans)});tell('Challenge: '+Q.q);A.redraw()}
function judge(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();tell(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
G=FK.shell(c,{steps,ratio:.7,tall:1.2,draw,onStep:Q=>{chal.hidden=Q.step!==5;pad.hidden=Q.step===5;buttons()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Graph controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);clear();A.gest({down,move,up});buttons()}});
G.start()})})();
