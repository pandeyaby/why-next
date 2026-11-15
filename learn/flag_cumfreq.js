/* Flagship: cumulative frequency graphs (ages 14–16; GCSE Mathematics (England) statistics: "construct and interpret
   cumulative frequency graphs", estimate the median, quartiles and interquartile range from grouped data).
   Data: travel times of 80 students in six 10-minute classes. Fill the running totals, plot each total at the upper class
   boundary, join the points with straight lines, read the median across from n/2 = 40, the quartiles from 20 and 60,
   then read how many took more than 45 minutes (80 − 72 = 8). All readings use straight-line joins and are estimates.
   Every canvas tap or drag has a button twin. */
(()=>{
const K={ink:'#0f172a',mid:'#475569',navy:'#1e3a8a',paper:'#ffffff',good:'#047857',bad:'#b91c1c',wash:'#eef2ff',yes:'#dcfce7',no:'#fee2e2',grid:'#cbd5e1',pt:'#7c3aed',read:'#c2410c'};
const UP=[10,20,30,40,50,60],FREQ=[8,18,26,16,8,4],CF=FREQ.reduce((a,f)=>a.concat((a.length?a[a.length-1]:0)+f),[]),N=80;
const PTS=[[0,0]].concat(UP.map((u,i)=>[u,CF[i]]));
const tAt=c=>{for(let i=1;i<PTS.length;i++){const [x0,y0]=PTS[i-1],[x1,y1]=PTS[i];if(c<=y1)return x0+(x1-x0)*(c-y0)/((y1-y0)||1)}return 60};
const cAt=t=>{for(let i=1;i<PTS.length;i++){const [x0,y0]=PTS[i-1],[x1,y1]=PTS[i];if(t<=x1)return y0+(y1-y0)*(t-x0)/(x1-x0)}return N};
const r1=v=>Math.round(v*10)/10,MED=r1(tAt(40)),LQ=r1(tAt(20)),UQ=r1(tAt(60)),IQR=r1(UQ-LQ),OVER=N-cAt(45);
VIS.reg('flagcumfreq',c=>{let A,D,bar,qa,qk=-1,best=0;const W={after:()=>{}};
const u=v=>Math.round(v*(A.narrow?1:1.1)),ft=v=>`700 ${u(v)}px system-ui,sans-serif`;
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(s,x,y,v,col,al){D.font=ft(v);D.fillStyle=col||K.ink;D.textAlign=al||'center';D.textBaseline='middle';D.fillText(String(s),x,y,A.W-12)}
function cut(s,max,v){D.font=ft(v);const o=[];let l='';for(const w of String(s).split(' ')){const t=l?l+' '+w:w;if(l&&D.measureText(t).width>max){o.push(l);l=w}else l=t}o.push(l);return o}
function card(r,fill,edge,lw){D.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,8);D.fill();if(edge){D.strokeStyle=edge;D.lineWidth=lw||2;D.stroke()}}
function head(s,ok){const L=cut(s,A.W-34,13),lh=u(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.09,L.length*lh+12)};card(r,ok?K.yes:K.wash,ok?K.good:K.navy);L.forEach((l,i)=>put(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,ok?K.good:K.ink));W.headB=r.y+r.h}
function foot(){if(!W.msg)return;const L=cut((W.bad?'✗ ':'✓ ')+W.msg,A.W-40,13),lh=u(13)+5,h=L.length*lh+10,y=A.H-h-6;card({x:10,y,w:A.W-20,h},K.paper,W.bad?K.bad:K.good,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),13))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{W.bad=true;W.msg=s;A.sound.miss();redo()};
const good=s=>{W.bad=false;W.msg=s;A.sound.pop()};
function row(list,y,state,label){const w=Math.min(u(84),(A.W-24-(list.length-1)*8)/list.length),all=list.length*w+(list.length-1)*8;
 return list.map((v,i)=>{const r={x:(A.W-all)/2+i*(w+8),y,w,h:u(40)},s=state?state(v):'';card(r,s==='ok'?K.yes:s==='no'?K.no:K.paper,s==='ok'?K.good:s==='no'?K.bad:K.navy,2);put(label?label(v):v,r.x+r.w/2,r.y+r.h/2,14);return r})}
/* graph frame */
const G=()=>({x0:u(40),x1:A.W-u(16),y0:(W.headB||A.H*.12)+u(14),y1:A.H*(A.narrow?.6:.66)});
const gx=t=>{const g=G();return g.x0+(g.x1-g.x0)*t/60},gy=v=>{const g=G();return g.y1-(g.y1-g.y0)*v/N};
const fromX=x=>{const g=G();return 60*(x-g.x0)/(g.x1-g.x0)},fromY=y=>{const g=G();return N*(g.y1-y)/(g.y1-g.y0)};
function axes(){const g=G();D.strokeStyle=K.grid;D.lineWidth=1;for(let t=0;t<=60;t+=10){D.beginPath();D.moveTo(gx(t),g.y0);D.lineTo(gx(t),g.y1);D.stroke();put(t,gx(t),g.y1+u(10),11,K.mid)}
 for(let v=0;v<=N;v+=20){D.beginPath();D.moveTo(g.x0,gy(v));D.lineTo(g.x1,gy(v));D.stroke();put(v,g.x0-u(6),gy(v),11,K.mid,'right')}
 D.strokeStyle=K.ink;D.lineWidth=2;D.beginPath();D.moveTo(g.x0,g.y0);D.lineTo(g.x0,g.y1);D.lineTo(g.x1,g.y1);D.stroke();put('time (min)',g.x1,g.y1+u(24),11,K.mid,'right');put('cum. freq.',g.x0+u(4),g.y0-u(6),11,K.mid,'left')}
function curve(k){D.strokeStyle=K.pt;D.lineWidth=2.5;D.beginPath();PTS.slice(0,k+1).forEach(([t,v],i)=>i?D.lineTo(gx(t),gy(v)):D.moveTo(gx(t),gy(v)));D.stroke();PTS.slice(0,k+1).forEach(([t,v])=>{D.fillStyle=K.pt;D.beginPath();D.arc(gx(t),gy(v),u(4.5),0,7);D.fill()})}
function across(v,col){const t=tAt(v),g=G();D.strokeStyle=col;D.lineWidth=2;D.setLineDash([6,4]);D.beginPath();D.moveTo(g.x0,gy(v));D.lineTo(gx(t),gy(v));D.lineTo(gx(t),g.y1);D.stroke();D.setLineDash([]);put(r1(t),gx(t),g.y1-u(10),12,col)}
function upFrom(t,col){const v=cAt(t),g=G();D.strokeStyle=col;D.lineWidth=2;D.setLineDash([6,4]);D.beginPath();D.moveTo(gx(t),g.y1);D.lineTo(gx(t),gy(v));D.lineTo(g.x0,gy(v));D.stroke();D.setLineDash([]);put(r1(v),g.x0+u(16),gy(v)-u(10),12,col)}
const now=()=>['table','plot','median','quart','over','quiz'][A.step];
/* 1: running totals */
function offers(i){const prev=i?CF[i-1]:0,o=[...new Set([CF[i],FREQ[i],prev+10,UP[i],prev])].slice(0,3),r=i%3;return o.slice(r).concat(o.slice(0,r))}
function drawTable(){const fin=W.rows===6;head(fin?'Each running total counts everyone up to the end of that class. The last one is 80, all the students.':'Travel times of 80 students. Tap the running total for the highlighted row.',fin);
 const y0=W.headB+u(12),rh=u(26),x=[A.W*.22,A.W*.5,A.W*.78];put('Time t (min)',x[0],y0,12,K.mid);put('Frequency',x[1],y0,12,K.mid);put('Cumulative',x[2],y0,12,K.mid);
 UP.forEach((up,i)=>{const y=y0+rh*(i+1);if(i===W.rows&&!fin){D.fillStyle='#fef3c7';D.fillRect(16,y-rh/2,A.W-32,rh)}put(`${up-10} < t ≤ ${up}`,x[0],y,13);put(FREQ[i],x[1],y,13);put(i<W.rows?CF[i]:'?',x[2],y,13,i<W.rows?K.good:K.mid)});
 if(!fin)W.offR=row(offers(W.rows),y0+rh*7+u(4),v=>v===W.miss?'no':'')}
function total(v){if(W.rows>=6)return;const i=W.rows,prev=i?CF[i-1]:0;A.sound.tick();
 if(v===FREQ[i]&&v!==CF[i]){W.miss=v;return nope(`${v} is just this class. A running total adds it to everyone before: ${prev} + ${FREQ[i]} = ${CF[i]}.`)}
 if(v===UP[i]&&v!==CF[i]){W.miss=v;return nope(`${v} is the class boundary, a time in minutes. The running total counts students: ${prev} + ${FREQ[i]} = ${CF[i]}.`)}
 if(v===prev&&v!==CF[i]){W.miss=v;return nope(`${v} is the total before this class. Add this class's ${FREQ[i]} students: ${prev} + ${FREQ[i]} = ${CF[i]}.`)}
 if(v!==CF[i]){W.miss=v;return nope(`${prev} + 10 adds the class width, not the frequency. Add the ${FREQ[i]} students: ${prev} + ${FREQ[i]} = ${CF[i]}.`)}
 W.miss=null;W.rows++;if(W.rows===6)good('8, 26, 52, 68, 76, 80. The last total is N = 80.');else{W.bad=false;W.msg=`${prev} + ${FREQ[i]} = ${CF[i]}.`}redo()}
/* 2: plot at the upper class boundary */
function drawPlot(){const fin=W.plotted===6;head(fin?'Plot each total at the end of its class: by 10 min, 8 students have arrived. Then join the points, starting at (0, 0).':`Plot ${CF[W.plotted]} for ${UP[W.plotted]-10} < t ≤ ${UP[W.plotted]}. Tap the graph at the right time, or use the buttons.`,fin);
 axes();curve(W.plotted);if(W.ghost!=null){D.fillStyle=K.bad;D.beginPath();D.arc(gx(W.ghost),gy(CF[W.plotted]),u(5),0,7);D.fill()}
 if(!fin){D.strokeStyle=K.read;D.setLineDash([3,4]);D.beginPath();D.moveTo(G().x0,gy(CF[W.plotted]));D.lineTo(G().x1,gy(CF[W.plotted]));D.stroke();D.setLineDash([])}}
function place(t){if(W.plotted>=6)return;const i=W.plotted,lo=UP[i]-10,hi=UP[i];A.sound.tick();t=Math.round(t/5)*5;
 if(t!==hi){W.ghost=t;if(t===lo+5)return nope(`${t} is the middle of the class. Midpoints are for estimating the mean. A running total counts everyone up to ${hi}, so plot at t = ${hi}.`);
  if(t===lo)return nope(`At t = ${lo} the ${FREQ[i]} students in this class have not all arrived yet. Plot at the end, t = ${hi}.`);
  return nope(`${CF[i]} is the total for ${lo} < t ≤ ${hi}. Plot it at the upper class boundary, t = ${hi}.`)}
 W.ghost=null;W.plotted++;if(W.plotted===6)good('All six points plotted at 10, 20, 30, 40, 50 and 60 minutes.');else{W.bad=false;W.msg=`(${hi}, ${CF[i]}) plotted.`}redo()}
/* 3 and 4: horizontal reading line */
function drawReader(mode){const want=mode==='median'?[40]:[20,60],fin=want.every(v=>W.got.includes(v));
 head(mode==='median'?(fin?`Median ≈ ${MED} min: across from 40 (half of 80) to the line, then down.`:'Drag the orange line up or down to the height that splits 80 students in half.'):(fin?`LQ ≈ ${LQ} min, UQ ≈ ${UQ} min, so IQR ≈ ${UQ} − ${LQ} = ${IQR} min.`:'Read the lower quartile (a quarter of 80) and the upper quartile (three quarters of 80).'),fin);
 axes();curve(6);W.got.forEach(v=>across(v,K.good));const y=gy(W.line),g=G();D.strokeStyle=K.read;D.lineWidth=3;D.beginPath();D.moveTo(g.x0,y);D.lineTo(g.x1,y);D.stroke();
 card({x:g.x1-u(56),y:y-u(13),w:u(52),h:u(24)},K.paper,K.read,2);put(W.line,g.x1-u(30),y,13,K.read)}
function rest(mode){const v=W.line,want=mode==='median'?[40]:[20,60];A.sound.tick();
 if(want.includes(v)){if(!W.got.includes(v))W.got.push(v);const t=r1(tAt(v));
  good(mode==='median'?`Across from 40 and down: median ≈ ${t} min.`:v===20?`Across from 20 (a quarter of 80): LQ ≈ ${t} min.`:`Across from 60 (three quarters of 80): UQ ≈ ${t} min.`);
  if(mode==='quart'&&want.every(x=>W.got.includes(x)))W.msg=`IQR ≈ ${UQ} − ${LQ} = ${IQR} min: subtract the times, not the 60 and 20.`;return redo()}
 if(v===N)return nope('80 is everyone: across from 80 gives the longest trip, not the middle one.');
 if(mode==='median'&&v===30)return nope('30 is half of the time axis, not half of the students. The middle student is number 40 of 80.');
 if(mode==='median')return nope(`Across from ${v} gives the time that ${v} of the 80 students took or less. The median needs half: 40.`);
 return nope(`The quartiles sit a quarter and three quarters of the way through 80 students: 20 and 60. ${v} is not one of them.`)}
/* 5: how many more than 45 minutes */
function drawOver(){const fin=W.pick===OVER;head(fin?`Up from 45 to the line gives 72 students in 45 min or less. More than 45: 80 − 72 = ${OVER}.`:'Drag the green line to 45 minutes. Then choose how many took MORE than 45 minutes.',fin);
 axes();curve(6);const g=G(),x=gx(W.vt);D.strokeStyle=K.good;D.lineWidth=3;D.beginPath();D.moveTo(x,g.y0);D.lineTo(x,g.y1);D.stroke();card({x:x-u(24),y:g.y0-u(2),w:u(48),h:u(22)},K.paper,K.good,2);put(W.vt,x,g.y0+u(9),12,K.good);
 if(W.vt===45)upFrom(45,K.read);W.ansR=row([72,OVER,45],g.y1+u(34),v=>v===W.pick?(v===OVER?'ok':'no'):'')}
function slideT(t){W.vt=Math.max(0,Math.min(60,Math.round(t/5)*5));A.sound.tick();W.bad=false;W.msg=W.vt===45?'Up to the line, then across: about 72 students took 45 minutes or less.':'';redo()}
function answer(v){A.sound.tick();if(W.vt!==45){W.pick=null;return nope('Move the green line to 45 minutes first and read up to the graph.')}W.pick=v;
 if(v===OVER){good(`${N} − 72 = ${OVER} students took more than 45 minutes.`);return redo()}
 if(v===72)return nope('72 took 45 minutes OR LESS: that is what a cumulative frequency counts. Subtract from 80 to get the rest: 80 − 72 = 8.');
 nope('45 is the time you read from, not a number of students. Read up to the graph (72), then do 80 − 72.')}
/* pointer */
function down(p){const m=now(),g=G();let i;
 if(m==='table'&&W.offR){i=W.offR.findIndex(r=>on(p,r));if(i>=0){total(offers(W.rows)[i]);return true}}
 if(m==='plot'&&p.x>=g.x0-10&&p.x<=g.x1+10&&p.y>=g.y0-10&&p.y<=g.y1+10){place(fromX(p.x));return true}
 if((m==='median'||m==='quart')&&p.x>=g.x0-10&&p.y>=g.y0-14&&p.y<=g.y1+14){W.dragY=true;W.line=Math.max(0,Math.min(N,Math.round(fromY(p.y)/5)*5));A.redraw();return true}
 if(m==='over'){i=(W.ansR||[]).findIndex(r=>on(p,r));if(i>=0){answer([72,OVER,45][i]);return true}if(p.y>=g.y0-10&&p.y<=g.y1+10){W.dragX=true;W.vt=Math.max(0,Math.min(60,Math.round(fromX(p.x)/5)*5));A.redraw();return true}}return false}
function move(p){if(W.dragY){W.line=Math.max(0,Math.min(N,Math.round(fromY(p.y)/5)*5));A.redraw()}if(W.dragX){W.vt=Math.max(0,Math.min(60,Math.round(fromX(p.x)/5)*5));A.redraw()}}
function up(){const m=now();if(W.dragY){W.dragY=false;rest(m)}if(W.dragX){W.dragX=false;slideT(W.vt)}}
function draw(){D.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);D.fillRect(0,0,A.W,A.H);if(A.col.dark){D.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);D.fill()}
 const m=now();if(m==='table')drawTable();if(m==='plot')drawPlot();if(m==='median')drawReader('median');if(m==='quart')drawReader('quart');if(m==='over')drawOver();
 if(m==='quiz'){head('Totals at upper boundaries. Read across from n/2, n/4 and 3n/4. Subtract from n for "more than".');axes();curve(6);across(40,K.read)}
 foot();A.fx.draw(D)}
function redo(){const m=now();let s='Challenge.';
 if(m==='table')s=`Running totals so far: ${CF.slice(0,W.rows).join(', ')||'none'}.`+(W.rows<6?` Row ${UP[W.rows]-10} to ${UP[W.rows]} minutes, frequency ${FREQ[W.rows]}. Choices: ${offers(W.rows).join(', ')}.`:'');
 if(m==='plot')s=`Points plotted: ${PTS.slice(1,W.plotted+1).map(([t,v])=>`(${t}, ${v})`).join(', ')||'none'}.`;
 if(m==='median'||m==='quart')s=`Reading line at cumulative frequency ${W.line}. Readings: ${W.got.map(v=>v+' gives '+r1(tAt(v))+' min').join(', ')||'none yet'}.`;
 if(m==='over')s=`Time line at ${W.vt} minutes${W.vt===45?', reading 72 students':''}.`+(W.pick!=null?` Answer chosen: ${W.pick}.`:'');
 voice((W.msg?W.msg+' ':'')+s);ctrl();W.after()}
function ctrl(){if(!bar)return;bar.innerHTML='';const m=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(m==='table'&&W.rows<6)offers(W.rows).forEach(v=>b('Total '+v,()=>total(v)));
 if(m==='plot'&&W.plotted<6){const hi=UP[W.plotted];[hi-10,hi-5,hi].forEach(t=>b('Plot at t = '+t,()=>place(t)))}
 if(m==='median'||m==='quart'){b('Line up 5',()=>{W.line=Math.min(N,W.line+5);rest(m)});b('Line down 5',()=>{W.line=Math.max(0,W.line-5);rest(m)});(m==='median'?[30,40,80]:[20,40,60]).forEach(v=>b('Read from '+v,()=>{W.line=v;rest(m)}))}
 if(m==='over'){b('Time line ← 5',()=>slideT(W.vt-5));b('Time line → 5',()=>slideT(W.vt+5));[72,OVER,45].forEach(v=>b(v+' students',()=>answer(v)))}
 A.redraw()}
const met=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fs,gap)=>{const id=++W.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===W.run)f()},(j+1)*(A.reduced()?30:gap)))};
const wipe=()=>{W.run=(W.run||0)+1;Object.assign(W,{after:()=>{},rows:0,miss:null,plotted:0,ghost:null,line:10,got:[],dragY:false,dragX:false,vt:20,pick:null,msg:'',bad:false})};
const steps=[
{h:'Running totals',p:'Cumulative frequency is a running total: how many values so far, up to the end of each class.',
predict:{q:'What will the last running total be?',opts:['80, every student','60, the end of the last class','4, the last frequency'],ans:0},
task:'Fill all 6 running totals',show:()=>{steps[0].go();auto(CF.map(v=>()=>total(v)),320)},go:()=>{wipe();redo();W.after=met(0,()=>W.rows===6,'Running totals done.')}},
{h:'Plot the points',p:'Each total belongs at the upper class boundary, the end of its class. Start the graph at (0, 0).',
predict:{q:'Where do you plot 8 for the class 0 < t ≤ 10?',opts:['At t = 10','At t = 5, the middle','At t = 0'],ans:0},
task:'Plot all 6 points',show:()=>{steps[1].go();auto(UP.map(t=>()=>place(t)),320)},go:()=>{wipe();W.rows=6;redo();W.after=met(1,()=>W.plotted===6,'Upper boundaries.')}},
{h:'The median',p:'The median is the middle value. On a cumulative frequency graph, read across from half the total, then down.',
predict:{q:'There are 80 students. Read across from which cumulative frequency to find the median?',opts:['40','80','30, the middle of the time axis'],ans:0},
task:'Read the median',show:()=>{steps[2].go();auto([()=>{W.line=40;rest('median')}],300)},go:()=>{wipe();redo();W.after=met(2,()=>W.got.includes(40),`Median ≈ ${MED} min.`)}},
{h:'Quartiles and IQR',p:'The quartiles cut the students into quarters. The interquartile range is the spread of the middle half.',
predict:{q:'How do you find the interquartile range here?',opts:['UQ time − LQ time','60 − 20 = 40','Longest time − shortest time'],ans:0},
task:'Read both quartiles',show:()=>{steps[3].go();auto([()=>{W.line=20;rest('quart')},()=>{W.line=60;rest('quart')}],400)},go:()=>{wipe();redo();W.after=met(3,()=>[20,60].every(v=>W.got.includes(v)),`IQR ≈ ${IQR} min.`)}},
{h:'More than 45 minutes',p:'A cumulative frequency counts values up to a point. To count those above it, subtract from the total.',
task:'Find how many took more than 45 min',show:()=>{steps[4].go();auto([()=>slideT(25),()=>slideT(35),()=>slideT(45),()=>answer(OVER)],350)},go:()=>{wipe();redo();W.after=met(4,()=>W.pick===OVER,'80 − 72 = 8.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>W.after()});
const Q=[['Where should the cumulative frequency for 20 < t ≤ 30 be plotted?','At t = 30',[['At t = 25','midpoint'],['At t = 20','lowerEnd']]],
['A cumulative frequency graph shows 120 people. Across from which value do you read the median?','60',[['120','wholeN'],['30','quarter']]],
['From the graph, LQ ≈ 16.7 min and UQ = 35 min. What is the IQR?','About 18.3 min',[['40, from 60 − 20','subtractCF'],['About 25.9 min, their mean','meanQ']]],
['Up from 45 min the graph reads 72 out of 80. How many took more than 45 min?','8',[['72','noSubtract'],['45','axisMix']]],
['The frequencies are 5, 12, 9. What are the cumulative frequencies?','5, 17, 26',[['5, 12, 9','noRunning'],['5, 17, 21','skipAdd']]],
['Why is the median from a cumulative frequency graph only an estimate?','We do not know the exact values inside each class',[['Graphs are always drawn wrong','blame'],['Because n is even','parity']]]];
function why(tag){let m='Plot totals at upper boundaries, read across from a fraction of n, and subtract from n for "more than".';
 if(tag==='midpoint')m='Midpoints are for estimating the mean. By t = 30 everyone in the class has arrived, so plot at the upper boundary.';
 if(tag==='lowerEnd')m='At t = 20 nobody in 20 < t ≤ 30 is counted yet. The total includes them only at t = 30.';
 if(tag==='wholeN')m='Across from 120 reaches the end of the graph: the largest value. The middle is half of 120, which is 60.';
 if(tag==='quarter')m='30 is a quarter of 120: that gives the lower quartile, not the median.';
 if(tag==='subtractCF')m='60 and 20 are numbers of people on the vertical axis. The IQR is a spread of times: 35 − 16.7 ≈ 18.3 min.';
 if(tag==='meanQ')m='The IQR is a difference, not an average: UQ − LQ = 35 − 16.7 ≈ 18.3 min.';
 if(tag==='noSubtract')m='72 is how many took 45 min or less. More than 45 is the rest: 80 − 72 = 8.';
 if(tag==='axisMix')m='45 is the time you read from. Read up to the graph, then subtract from the total.';
 if(tag==='noRunning')m='Those are the frequencies. Keep a running total: 5, 5 + 12 = 17, 17 + 9 = 26.';
 if(tag==='skipAdd')m='Add each new frequency to the last total: 17 + 9 = 26, not 12 + 9.';
 if(tag==='blame')m='A careful graph is fine. The class only tells us a value is between, say, 20 and 30, not exactly where.';
 if(tag==='parity')m='Grouped data loses the exact values, whatever n is. The straight lines assume values are spread evenly in each class.';
 return m}
function ask(){qk++;const [qq,ans,bad]=Q[qk%Q.length],all=[[ans,'ok']].concat(bad),r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const rw=qa.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},rw,w).onclick=()=>judge(tag,ans)});voice('Challenge: '+qq);A.redraw()}
function judge(tag,ans){qa.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=qa.querySelector('.fl-fb');
 if(ok){best++;A.win()}else{best=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+best+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{qa.hidden=B.step!==5;bar.hidden=B.step===5;ctrl()},
 init:B=>{A=B;D=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Cumulative frequency lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
