/* Flagship – dot plots and histograms (ages 11–13). Plot match goals as stacked dots, find the peak, a gap and an outlier
   in travel times, change the class width of a histogram of 40 heights and watch the shape appear or vanish, build a
   histogram from a frequency table by dragging bar tops (bars touch because the classes join), then read it, including
   which class a boundary value such as 30 s belongs to. Every tap or drag has a button twin. */
(()=>{
const GOALS=[2,1,3,2,0,2,4,1,2,3];
const MINS=[5,6,6,6,7,7,7,7,7,8,8,8,8,9,9,9,10,18,19,25],FIND=[{k:'peak',say:'Tap the peak: the value with the tallest stack.',opts:[6,7,8]},{k:'gap',say:'Tap a gap: a value inside the range with no dots.',opts:[9,14,19]},{k:'out',say:'Tap the outlier: the value far from all the others.',opts:[10,19,25]}];
const HTS=[139,139,140,145,145,145,146,147,147,147,148,148,149,149,150,150,150,150,151,152,153,154,154,154,154,155,155,155,156,156,156,156,156,157,158,160,160,161,161,165],WIDTHS=[2,5,10,20];
const TABLE=[3,7,9,5,2],CL=['0–10','10–20','20–30','30–40','40–50'];
const READ=[{q:'Tap the modal class: the class with the highest frequency.',ans:2},{q:'Ella took exactly 30 s. Tap the class she goes in.',ans:3},{q:'Tap the class that holds 7 pupils.',ans:1}];
const NEED=[10,3,3,5,3];
VIS.reg('flaghist',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;
const blank=()=>({n:0,i:0,busy:0,bad:-1,good:-1,drag:null,after:()=>{},w:2,tried:[2],h:[0,0,0,0,0],sel:0,fast:0}),S=blank();
const phase=()=>['dots','find','width','build','read','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),quick=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,px,col,al,wt){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const mw=A.W-24;
 if(g.measureText(t).width<=mw)return g.fillText(t,x,y);const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>mw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*z(px)*1.25))}
const frame=()=>({L:z(40),R:A.W-z(16),base:A.H*.8,top:A.H*.24});
/* one column per whole-number value */
function cols(lo,hi){const f=frame(),w=(f.R-f.L)/(hi-lo+1);return{...f,w,x:v=>f.L+(v-lo+.5)*w,v:x=>Math.round(lo+(x-f.L)/w-.5)}}
const range=()=>phase()==='dots'?[0,5]:[4,26];
function counts(list,lo,hi){const k=Array(hi-lo+1).fill(0);list.forEach(v=>k[v-lo]++);return k}
function dotplot(g,list,lo,hi,label,hl){const C=A.col,P=cols(lo,hi),k=counts(list,lo,hi),mx=Math.max(4,...k),r=Math.min(P.w*.42,z(12),(P.base-P.top)/(mx*2.3));
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(P.L,P.base);g.lineTo(P.R,P.base);g.stroke();
 for(let v=lo;v<=hi;v++){const x=P.x(v),on=hl&&hl.v===v;if(on){g.fillStyle=A.alpha(hl.c,.18);g.fillRect(x-P.w/2,P.top,P.w,P.base-P.top)}
  g.strokeStyle=A.alpha(C.tx,.6);g.beginPath();g.moveTo(x,P.base);g.lineTo(x,P.base+5);g.stroke();
  if(hi-lo<10||v%2===0)txt(g,String(v),x,P.base+z(15),12,C.tx);
  for(let j=0;j<k[v-lo];j++){g.fillStyle=C.cy;g.beginPath();g.arc(x,P.base-r*1.2-j*r*2.15,r,0,7);g.fill()}}
 txt(g,label,(P.L+P.R)/2,P.base+z(33),13,C.tx);return P}
/* histogram: equal-width bars that touch */
function bars(n){const f=frame(),w=(f.R-f.L)/n;return Array.from({length:n},(_,j)=>({...f,x:f.L+j*w,w}))}
function histo(g,freq,edges,ymax,label,col){const C=A.col,f=frame(),Bs=bars(freq.length),s=(f.base-f.top)/ymax;
 g.strokeStyle=A.alpha(C.tx,.18);g.lineWidth=1;const step=ymax>12?5:ymax>6?2:1;for(let y=0;y<=ymax;y+=step){const py=f.base-y*s;g.beginPath();g.moveTo(f.L,py);g.lineTo(f.R,py);g.stroke();txt(g,String(y),f.L-6,py,11,C.tx,'right')}
 Bs.forEach((b,j)=>{const h=freq[j]*s,c0=typeof col==='function'?col(j):col;g.fillStyle=A.alpha(c0,.45);g.fillRect(b.x,f.base-h,b.w,h);g.strokeStyle=c0;g.lineWidth=2;g.strokeRect(b.x,f.base-h,b.w,h)});
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(f.L,f.top-6);g.lineTo(f.L,f.base);g.lineTo(f.R,f.base);g.stroke();
 const every=Math.ceil(edges.length/9);edges.forEach((e,j)=>{if(j%every)return;const x=f.L+j*(f.R-f.L)/(edges.length-1);txt(g,String(e),x,f.base+z(14),11,C.tx)});
 txt(g,label,(f.L+f.R)/2,f.base+z(32),13,C.tx);g.save();g.translate(z(11),(f.top+f.base)/2);g.rotate(-Math.PI/2);txt(g,'Frequency',0,0,11,C.tx);g.restore();return Bs}
function hfreq(w){const n=40/w,k=Array(n).fill(0);HTS.forEach(v=>k[Math.floor((v-130)/w)]++);return k}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag;
 if(p==='quiz'){txt(g,'Dot plots show every value. Histograms group values into classes that touch.',W/2,H*.45,13,C.tx);return}
 if(p==='dots'){const done=GOALS.slice(0,S.i),hl=S.bad>=0?{v:S.bad,c:C.rd}:null;dotplot(g,done,0,5,'Goals scored in a match',hl);
  const cur=GOALS[S.i];txt(g,`Matches plotted: ${S.i} of ${GOALS.length}`,W/2,H*.06,13,C.tx);
  if(cur!=null){const at=d&&d.x!=null?d:{x:W/2,y:H*.15},r={x:at.x-z(62),y:at.y-z(20),w:z(124),h:z(40)};g.fillStyle=C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.am;g.lineWidth=3;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();txt(g,`⚽ ${cur} goal${cur===1?'':'s'}`,at.x,at.y,17,C.tx,'center',800)}}
 if(p==='find'){const t=FIND[Math.min(S.i,2)],hl=S.bad>=0?{v:S.bad,c:C.rd}:S.good>=0?{v:S.good,c:C.gr}:null;dotplot(g,MINS,4,26,'Minutes to get to school (20 pupils)',hl);
  txt(g,S.i<3?t.say:'Peak 7 min, gap 11–17 min, outlier 25 min.',W/2,H*.08,13,C.tx)}
 if(p==='width'){const k=hfreq(S.w),edges=Array.from({length:k.length+1},(_,j)=>130+j*S.w);histo(g,k,edges,Math.max(...k)+2,'Height (cm) of 40 pupils',C.vi);
  const R=chips();R.forEach((r,j)=>{const on=WIDTHS[j]===S.w;g.fillStyle=on?C.vi:C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=C.vi;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();txt(g,`width ${WIDTHS[j]}`,r.x+r.w/2,r.y+r.h/2,12,on?C.pn:C.tx,'center',800)})}
 if(p==='build'){const Bs=histo(g,S.h,[0,10,20,30,40,50],10,'Time t (seconds) to solve a puzzle',j=>S.h[j]===TABLE[j]?C.gr:j===S.sel?C.am:C.cy);
  Bs.forEach((b,j)=>{txt(g,`${CL[j]}: ${TABLE[j]}`,b.x+b.w/2,H*.08,A.narrow?10:12,S.h[j]===TABLE[j]?C.gr:C.tx,'center',800);if(j===S.sel&&S.h[j]!==TABLE[j]){g.fillStyle=C.am;g.beginPath();g.arc(b.x+b.w/2,b.base-S.h[j]*(b.base-b.top)/10,z(7),0,7);g.fill()}})}
 if(p==='read'){const Bs=histo(g,TABLE,[0,10,20,30,40,50],10,'Time t (seconds) to solve a puzzle',j=>j===S.bad?C.rd:j===S.good?C.gr:C.cy);
  txt(g,S.i<3?READ[S.i].q:'Modal class 20–30; 30 s goes in 30–40.',W/2,H*.1,13,C.tx)}
 A.fx.draw(g)}
function chips(){const n=4,w=Math.min(z(84),(A.W-30)/n-8),h=z(30),x0=(A.W-(n*w+(n-1)*8))/2;return WIDTHS.map((_,j)=>({x:x0+j*(w+8),y:A.H*.06,w,h}))}
function miss(t,j){A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1200);A.redraw()}
function win(t){S.n++;A.sound.pop();say(t);buttons();A.redraw();S.after()}
function plot(v){if(phase()!=='dots'||S.i>=GOALS.length)return;const cur=GOALS[S.i];
 if(v!==cur)return miss(v<cur?`That card says ${cur}, so the dot goes further right than ${v}.`:`That card says ${cur}, so the dot goes further left than ${v}.`,v);
 S.i++;const k=GOALS.slice(0,S.i).filter(x=>x===v).length;win(`${v} goals: that stack is now ${k} high.`)}
function pick(v){if(phase()!=='find'||S.i>=3||S.busy)return;const t=FIND[S.i],k=counts(MINS,4,26)[v-4],mx=Math.max(...counts(MINS,4,26));
 let ok=t.k==='peak'?k===mx:t.k==='gap'?k===0&&v>5&&v<25:v===25;
 if(!ok){if(t.k==='peak')return miss(`${v} min has ${k} dot${k===1?'':'s'}. The peak is the tallest stack, with ${mx} dots.`,v);
  if(t.k==='gap')return miss(k?`${v} min has ${k} dot${k===1?'':'s'}, so it is not a gap. A gap has no dots between other values.`:`${v} is outside the data. A gap sits between values, inside the range.`,v);
  return miss(k?`${v} min is close to other values. The outlier sits far from everything else.`:`No one took ${v} min. Find a dot far from all the others.`,v)}
 S.good=v;S.i++;win(t.k==='peak'?`Peak: ${v} min, the most common time.`:t.k==='gap'?`Gap: no pupil took ${v} min, but it is not impossible.`:`Outlier: ${v} min, far from the cluster at 5–10 min.`);if(S.i<3)say(FIND[S.i].say)}
function setW(w){if(phase()!=='width'||w===S.w)return;S.w=w;A.sound.tick();const k=hfreq(w).length;
 if(!S.tried.includes(w)){S.tried.push(w);win(w===2?'Width 2: 20 thin bars, a spiky shape.':w===5?'Width 5: 8 bars. A clear single peak near 150–160 cm.':w===10?'Width 10: 4 bars. The peak shows, with less detail.':'Width 20: only 2 bars. The shape is hidden.')}
 else{say(`Width ${w}: ${k} bars.`);A.redraw()}}
function setH(j,h){if(phase()!=='build'||S.h[j]===TABLE[j])return;h=Math.max(0,Math.min(10,h));S.sel=j;if(h===S.h[j])return A.redraw();S.h[j]=h;A.sound.tick();
 if(h===TABLE[j])return win(`${CL[j]}: frequency ${h}. That bar is right.`)+nextSel();say(h>TABLE[j]?`${CL[j]} is at ${h}. The table says ${TABLE[j]}: too high.`:`${CL[j]} is at ${h}. Keep going up to ${TABLE[j]}.`);buttons();A.redraw()}
function nextSel(){const j=S.h.findIndex((h,i)=>h!==TABLE[i]);if(j>=0)S.sel=j;buttons();A.redraw()}
function read(j){if(phase()!=='read'||S.i>=3||S.busy)return;const t=READ[S.i];
 if(j!==t.ans){if(S.i===0)return miss(`${CL[j]} has ${TABLE[j]} pupils. The modal class has the tallest bar.`,j);
  if(S.i===1)return miss(j===2?'30 is the boundary. 20 ≤ t < 30 stops just below 30, so 30 s starts the next class.':`30 s is not in ${CL[j]}. Find where 30 sits on the time axis.`,j);
  return miss(`${CL[j]} holds ${TABLE[j]}. Read the frequency across from the bar top.`,j)}
 S.good=j;S.i++;win(['20–30 s is the modal class, with 9 pupils.','30 s goes in 30 ≤ t < 40.','10–20 s holds 7 pupils.'][S.i-1]);if(S.i<3)say(READ[S.i].q)}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz')return;
 if(p==='dots'&&S.i<GOALS.length)for(let v=0;v<=5;v++)B(String(v),()=>plot(v),`Put the dot at ${v} goals`);
 if(p==='find'&&S.i<3)FIND[S.i].opts.forEach(v=>B(`${v} min`,()=>pick(v),`Pick ${v} minutes`));
 if(p==='width')WIDTHS.forEach(w=>B(`width ${w}`,()=>setW(w),`Class width ${w} cm`));
 if(p==='build'&&S.n<5){const j=S.sel;B('◀',()=>{S.sel=(j+4)%5;buttons();A.redraw()},'Previous bar');B(`${CL[j]} −1`,()=>setH(j,S.h[j]-1),`Lower the ${CL[j]} bar`);B(`${CL[j]} +1`,()=>setH(j,S.h[j]+1),`Raise the ${CL[j]} bar`);B('▶',()=>{S.sel=(j+1)%5;buttons();A.redraw()},'Next bar')}
 if(p==='read'&&S.i<3)CL.forEach((l,j)=>B(l,()=>read(j),`Pick the ${l} second class`))}
const within=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h;
function down(q){const p=phase(),f=frame();if(p==='quiz'||S.busy)return false;
 if(p==='dots'){if(S.i>=GOALS.length)return false;if(Math.abs(q.x-A.W/2)<z(70)&&Math.abs(q.y-A.H*.15)<z(28)){S.drag={x:null,x0:q.x,y0:q.y};return true}if(q.y>f.top-20&&q.y<f.base+z(24)){const P=cols(0,5),v=P.v(q.x);if(v>=0&&v<=5)plot(v)}return false}
 if(p==='find'){if(q.y>f.top-20&&q.y<f.base+z(24)){const v=cols(4,26).v(q.x);if(v>=4&&v<=26)pick(v)}return false}
 if(p==='width'){const j=chips().findIndex(r=>within(q,r));if(j>=0)setW(WIDTHS[j]);return false}
 if(p==='build'){const Bs=bars(5),j=Bs.findIndex(b=>q.x>b.x&&q.x<b.x+b.w);if(j<0||q.y<f.top-30)return false;S.sel=j;S.drag={j};move(q);buttons();return true}
 if(p==='read'){const j=bars(5).findIndex(b=>q.x>b.x&&q.x<b.x+b.w);if(j>=0&&q.y>f.top-20)read(j);return false}return false}
function move(q){const d=S.drag;if(!d)return;if(phase()==='build'){const f=frame();setH(d.j,Math.round((f.base-q.y)/(f.base-f.top)*10));return}
 if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag;S.drag=null;if(!d)return;if(phase()==='dots'&&d.x!=null){const f=frame();if(q.y>f.top-40){const v=cols(0,5).v(q.x);if(v>=0&&v<=5)return plot(v)}say('Drop the card above its number on the line.')}A.redraw()}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=NEED[i]&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=NEED[A.step])return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(p==='dots')return plot(GOALS[S.i]);if(p==='find')return pick([7,14,25][S.i]);if(p==='width')return setW(WIDTHS.find(w=>!S.tried.includes(w)));
 if(p==='build'){const j=S.h.findIndex((h,i)=>h!==TABLE[i]);return setH(j,TABLE[j])}if(p==='read')return read(READ[S.i].ans)}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Build a dot plot',p:'Drag the goals card above its number, or tap the number line. One dot per match.',predict:{q:'Which value will have the tallest stack?',opts:['1 goal','2 goals','4 goals'],ans:1},task:'Plot all 10 matches',show:show(0),
 go:()=>{reset();say('Plot 10 matches. First card: 2 goals.');buttons();S.after=finish(0,'Each dot is one match. The tallest stack, 2 goals, is the mode.')}},
{h:'Peak, gap, outlier',p:'Read the shape of 20 travel times. Tap the number line under the stack you choose.',predict:{q:'Nobody took 14 minutes. What does that gap tell you?',opts:['14 minutes is impossible','No one in this data took 14 minutes'],ans:1},task:'Find the peak, a gap and the outlier',show:show(1),
 go:()=>{reset();say(FIND[0].say);buttons();S.after=finish(1,'Describe the shape: a cluster at 5–10 min, peak 7, a gap, a small group at 18–19 and an outlier at 25.')}},
{h:'Choose the class width',p:'40 heights are too many dots to read. Tap a width to group them into classes and watch the shape.',predict:{q:'What happens with bars 20 cm wide?',opts:['You see more detail','The shape hides in a few bars'],ans:1},task:'Try the other 3 widths',show:show(2),
 go:()=>{reset();say('Width 2: 20 thin bars. Try other widths.');buttons();S.after=finish(2,'Too thin is spiky, too wide hides the shape. Width 5 or 10 shows one clear peak.')}},
{h:'Build the histogram',p:'Drag each bar top to the frequency in the table, or use the buttons.',predict:{q:'Why do the bars touch?',opts:['To save space','The classes join: 10–20 runs straight into 20–30'],ans:1},task:'Set all 5 bars',show:show(3),
 go:()=>{reset();say('Drag the 0–10 bar up to 3.');buttons();S.after=finish(3,'Time is continuous, so classes join at their boundaries and the bars touch.')}},
{h:'Read the histogram',p:'Each class includes its lower boundary: 20–30 means 20 ≤ t < 30. Tap a bar to answer.',task:'Answer 3 questions',show:show(4),
 go:()=>{reset();say(READ[0].q);buttons();S.after=finish(4,'Read frequency from the bar height, and put boundary values in the class they start.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['A dot plot of test scores has no dots at 6. What does that show?',[['No one in this data scored 6','ok'],['Scoring 6 is impossible','impossible'],['6 is the mode','mode']]],
 ['Classes are 10 ≤ t < 20 and 20 ≤ t < 30. Where does t = 20 go?',[['20 ≤ t < 30','ok'],['10 ≤ t < 20','boundary'],['In both classes','both']]],
 ['Why do the bars of a histogram touch?',[['The classes join with no gaps','ok'],['To save space','space'],['Because the data is categorical','cat']]],
 ['You have the heights of 300 pupils. Which chart shows the shape best?',[['A histogram with equal-width classes','ok'],['A dot plot, one dot each','crowd'],['A histogram with one bar 100 cm wide','wide']]],
 ['Stacks of 1, 4, 6 and 2 dots sit at 0, 1, 2 and 3 goals. Where is the peak?',[['2 goals','ok'],['6 goals','height'],['3 goals','biggest']]]];
function why(t){let m='Look again at what each dot or bar stands for.';
 if(t==='impossible')m='A gap only means no one in this data had that value. Another class might.';if(t==='mode')m='The mode is the tallest stack. A value with no dots is a gap.';
 if(t==='boundary')m='10 ≤ t < 20 stops just below 20, so 20 starts the next class.';if(t==='both')m='Each value goes in exactly one class, or it would be counted twice.';
 if(t==='space')m='The reason is the data: time and height are continuous, so the classes join.';if(t==='cat')m='Categories get bar charts with gaps. Histograms are for numerical data grouped into classes.';
 if(t==='crowd')m='300 dots make towers too tall to read. Grouping into classes shows the shape.';if(t==='wide')m='One bar holds everything, so the shape disappears.';
 if(t==='height')m='6 is how many dots are in the stack. The peak is the value under it: 2 goals.';if(t==='biggest')m='The peak is the tallest stack, not the largest value.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
