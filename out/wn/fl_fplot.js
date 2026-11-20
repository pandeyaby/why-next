/* Flagship – measurement line plots with fractions (ages 9–10; CCSS 4.MD.B.4 / 5.MD.B.2). Find eighth marks on an
   inch scale, plot 8 seedling heights (equivalent forms share a stack), read the plot, subtract tallest minus
   shortest by counting jumps, and lay three 1½ in bars end to end. Data in learn/fplot_art.js. Distinct from
   flaglplot (whole centimetres, ages 7–8) and flaghist (dot plots and histograms). */
(()=>{const F=FPL;
VIS.reg('flagfplot',c=>{let A,keysRow,quiz,qk=-1,run=0;const st={};
const DARK='#0f172a',RIGHT='#047857',WRONG='#b91c1c',LINE='#475569',PAPER='#f8fafc',XCOL='#1d4ed8',TXT='px system-ui,sans-serif';
const part=()=>['find','plot','read','diff','ends','quiz'][A.step];
const z=n=>A.narrow?n:Math.round(n*1.12);
const inBox=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* geometry of the 1-to-2 inch line: 8 equal jumps of an eighth */
const axis=()=>({l:A.W*.08,r:A.W*.92,y:A.H*.72});
const xOf=e=>{const a=axis();return a.l+(a.r-a.l)*e/8};
const eAt=x=>{const a=axis();return Math.max(0,Math.min(8,Math.round((x-a.l)/(a.r-a.l)*8)))};
function banner(s,o){o=o||{};const g=A.ctx;let f=z(o.n||14);g.font=`800 ${f}${TXT}`;while(f>10&&g.measureText(s).width>A.W-36){f--;g.font=`800 ${f}${TXT}`}
 const w=Math.min(A.W-8,g.measureText(s).width+26),h=f+16,y=o.y==null?A.H*.03:o.y;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y,w,h,9);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?RIGHT:o.bad?WRONG:'#94a3b8';g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(s,A.W/2,y+h/2+1)}
function tile(b,s,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=o.bad||o.ok?3.5:1.5;g.strokeStyle=o.bad?WRONG:o.ok?RIGHT:'#94a3b8';g.stroke();
 let f=z(o.n||16);g.font=`800 ${f}${TXT}`;while(f>10&&g.measureText(s).width>b.w-8){f--;g.font=`800 ${f}${TXT}`}g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(s,b.x+b.w/2,b.y+b.h/2+1)}
/* the line with ticks: long at wholes, medium at halves, shorter at quarters; names shown where named(e) is true */
function scale(named,hi){const g=A.ctx,a=axis();g.strokeStyle=DARK;g.lineWidth=2.5;g.beginPath();g.moveTo(a.l-8,a.y);g.lineTo(a.r+8,a.y);g.stroke();
 for(let e=0;e<=8;e++){const x=xOf(e),t=e%8===0?18:e%4===0?14:e%2===0?10:7;g.lineWidth=e%2?1.5:2.5;g.beginPath();g.moveTo(x,a.y-t);g.lineTo(x,a.y+t);g.stroke();
  if(named(e)){g.font=`800 ${z(e%4?13:15)}${TXT}`;g.fillStyle=hi&&hi[e]?hi[e]:DARK;g.textAlign='center';g.textBaseline='top';g.fillText(F.NAME[e],x,a.y+22)}}
 const cx=xOf(st.cur);g.fillStyle='#7c3aed';g.beginPath();g.moveTo(cx,a.y+44);g.lineTo(cx-8,a.y+58);g.lineTo(cx+8,a.y+58);g.fill()}
/* stacks of Xs above the line */
function crosses(counts,ring){const g=A.ctx,a=axis(),s=Math.min(22,(a.r-a.l)/8*.6);g.lineWidth=3;g.lineCap='round';
 counts.forEach((n,e)=>{for(let k=0;k<n;k++){const x=xOf(e),y=a.y-14-s*.7-k*(s+5);g.strokeStyle=ring&&ring[e]?ring[e]:XCOL;g.beginPath();g.moveTo(x-s/2,y-s/2);g.lineTo(x+s/2,y+s/2);g.moveTo(x+s/2,y-s/2);g.lineTo(x-s/2,y+s/2);g.stroke()}})}
const full=()=>{const n=Array(9).fill(0);F.DATA.forEach(d=>n[d.e]++);return n};
const nearLine=p=>Math.abs(p.y-axis().y)<A.H*.32&&p.x>A.W*.03&&p.x<A.W*.97;
/* 1. find the eighth marks */
function drawFind(){const s=st.find;if(s.i>=F.FIND.length)banner('All 4 marks found',{ok:1});else banner(`Tap ${F.FIND[s.i].t} on the scale (${s.i+1} of 4)`,{bad:s.miss>=0});
 const g=A.ctx;g.font=`700 ${z(13)}${TXT}`;g.fillStyle=DARK;g.textAlign='center';g.fillText('1 inch split into 8 equal jumps',A.W/2,A.H*.32);
 const hi={};s.got.forEach(e=>hi[e]=RIGHT);if(s.miss>=0)hi[s.miss]=WRONG;scale(e=>e%4===0||s.got.includes(e)||e===s.miss,hi)}
function tapMark(e){const s=st.find;if(s.i>=F.FIND.length)return;const want=F.FIND[s.i];st.cur=e;
 if(e!==want.e){s.miss=e;A.sound.miss();return speak(`That mark is ${F.SAY[e]} inches. ${want.t} is ${want.e} jumps of one eighth past 1`+(want.e%2===0?`, because each quarter is 2 eighths.`:'.'))}
 s.miss=-1;s.got.push(e);s.i++;A.sound.pop();speak(`Yes: ${want.t} is ${e} eighths past 1.`+(s.i<F.FIND.length?' Next mark.':' All found.'))}
/* 2. plot the seedlings */
const cardBox=()=>({x:A.W/2-Math.min(110,A.W*.3),y:A.H*.13,w:Math.min(220,A.W*.6),h:Math.min(58,A.H*.13)});
function drawPlot(){const s=st.plot,g=A.ctx;if(s.i>=F.DATA.length)banner('All 8 seedlings plotted',{ok:1});else{banner(`Seedling ${s.i+1} of 8: drag the X to its height`,{n:13,bad:s.miss>=0});
  const b=cardBox();tile(b,`${F.DATA[s.i].t} inches`,{n:20});F.paintSeedling(g,b.x-22,b.y+b.h,b.h*.9,14)}
 const hi={};if(s.miss>=0)hi[s.miss]=WRONG;scale(()=>true,hi);crosses(s.n);
 if(s.drag){g.strokeStyle=XCOL;g.lineWidth=3;g.beginPath();g.moveTo(s.drag.x-9,s.drag.y-9);g.lineTo(s.drag.x+9,s.drag.y+9);g.moveTo(s.drag.x+9,s.drag.y-9);g.lineTo(s.drag.x-9,s.drag.y+9);g.stroke()}}
function place(e){const s=st.plot;if(s.i>=F.DATA.length)return;const d=F.DATA[s.i];st.cur=e;
 if(e!==d.e){s.miss=e;A.sound.miss();const same=d.t.includes('/');return speak(`Not there: that is ${F.NAME[e]}. ${d.t} is ${d.e} eighths past 1`+(same?`, the same length as ${F.NAME[d.e]}, so it joins that stack.`:'.'))}
 s.miss=-1;s.n[e]++;s.i++;A.sound.tick();speak(`X placed at ${F.NAME[e]}`+(d.t!==F.NAME[e]?`: ${d.t} is the same as ${F.NAME[e]}.`:'.')+(s.i<F.DATA.length?' Next seedling.':' All plotted.'))}
/* 3. read the finished plot */
const numKeys=keys=>{const w=Math.min(110,(A.W-40)/keys.length);return keys.map((k,i)=>({i,k,x:A.W/2+(i-keys.length/2)*(w+8)+4,y:A.H*.17,w,h:Math.min(56,A.H*.12)}))};
function drawRead(){const s=st.read;banner(!s.mode?'Tap the height most seedlings have':!s.count?F.TALLER.ask:'Plot read',{n:13,ok:s.mode&&s.count,bad:s.miss!=null});
 const ring={};if(s.mode)ring[F.MODE]=RIGHT;scale(()=>true);crosses(full(),ring);
 if(s.mode&&!s.count)numKeys(F.TALLER.keys).forEach(b=>tile(b,String(b.k),{bad:s.miss===b.i}))}
function readMode(e){const s=st.read;if(s.mode)return;st.cur=e;if(e!==F.MODE){s.miss=-1;A.sound.miss();return speak(`${F.NAME[e]} has ${full()[e]} X${full()[e]===1?'':'s'}. Look for the tallest stack.`)}
 s.mode=true;s.miss=null;A.sound.pop();speak(`Yes: 1½ inches has 3 Xs, the most. ${F.TALLER.ask}`)}
function readCount(i){const s=st.read;if(!s.mode||s.count)return;const k=F.TALLER.keys[i];
 if(k!==F.TALLER.ans){s.miss=i;A.sound.miss();return speak(k===7?'Taller than 1½ leaves out the three seedlings that are exactly 1½. Count only the Xs to the right of 1½.':'Count every X to the right of 1½: one at 1⅝, two at 1¾ and one at 1⅞.')}
 s.count=true;s.miss=null;A.sound.pop();speak('Yes: 4 seedlings are taller than 1½ inches: 1⅝, 1¾, 1¾ and 1⅞.')}
/* 4. tallest minus shortest */
function drawDiff(){const s=st.diff,g=A.ctx;banner(!s.top?'Tap the tallest seedling’s X':!s.low?'Now tap the shortest seedling’s X':!s.done?'Difference: tallest − shortest = ?':'Difference found',{n:13,ok:s.done,bad:s.miss!=null});
 const ring={};if(s.top)ring[7]=RIGHT;if(s.low)ring[2]=RIGHT;scale(()=>true);crosses(full(),ring);
 if(s.top&&s.low){const a=axis(),y=a.y-A.H*.3;g.strokeStyle='#7c3aed';g.lineWidth=2.5;for(let e=2;e<7;e++){const x0=xOf(e),x1=xOf(e+1);g.beginPath();g.moveTo(x0,y+18);g.quadraticCurveTo((x0+x1)/2,y-6,x1,y+18);g.stroke()}
  g.font=`800 ${z(13)}${TXT}`;g.fillStyle=DARK;g.textAlign='center';g.fillText('5 jumps of ⅛',(xOf(2)+xOf(7))/2,y-14);if(!s.done)numKeys(F.DIFF.keys).forEach(b=>tile(b,b.k,{bad:s.miss===b.i}))}}
function diffPick(e){const s=st.diff;if(s.low)return;st.cur=e;const n=full()[e];
 if(!s.top){if(e!==7){s.miss=-1;A.sound.miss();return speak(n?`${F.NAME[e]} is not the tallest. The tallest X is the one furthest right.`:`No X at ${F.NAME[e]}. The tallest X is the one furthest right.`)}s.top=true;s.miss=null;A.sound.pop();return speak('Yes: the tallest is 1⅞ inches. Now the shortest.')}
 if(e!==2){s.miss=-1;A.sound.miss();return speak('The shortest X is the one furthest left on the plot.')}
 s.low=true;s.miss=null;A.sound.pop();speak('Yes: the shortest is 1¼ inches, which is 1 2/8. Choose the difference.')}
function diffAns(i){const s=st.diff;if(!s.low||s.done)return;if(i!==F.DIFF.ans){s.miss=i;A.sound.miss();return speak(F.DIFF.slip[i])}
 s.done=true;s.miss=null;A.sound.pop();speak('Yes: 1⅞ − 1¼ = 7/8 − 2/8 = ⅝ inch.')}
/* 5. three 1½ in bars end to end on a 0–5 inch ruler */
const ruler=()=>({l:A.W*.06,r:A.W*.94,y:A.H*.5});
const inchX=v=>{const R=ruler();return R.l+(R.r-R.l)*v/5};
const trayBar=k=>({x:A.W*.1+k*(A.W*.28),y:A.H*.75,w:inchX(1.5)-inchX(0),h:Math.min(26,A.H*.06)});
function drawEnds(){const s=st.ends,g=A.ctx,R=ruler();banner(s.placed<3?`Lay the 1½ in bars end to end: ${s.placed} of 3`:!s.done?'Total length = ?':'Total found',{n:13,ok:s.done,bad:s.miss!=null});
 g.fillStyle='#fde68a';g.fillRect(R.l-6,R.y,R.r-R.l+12,34);g.strokeStyle='#92400e';g.lineWidth=1.5;g.strokeRect(R.l-6,R.y,R.r-R.l+12,34);
 for(let q=0;q<=20;q++){const x=inchX(q/4),t=q%4===0?18:q%2===0?12:7;g.strokeStyle=DARK;g.lineWidth=q%4?1.2:2;g.beginPath();g.moveTo(x,R.y);g.lineTo(x,R.y+t);g.stroke();if(q%2===0){g.font=`800 ${z(q%4?11:14)}${TXT}`;g.fillStyle=DARK;g.textAlign='center';g.textBaseline='bottom';g.fillText(q%4?`${(q-2)/4|0}½`.replace(/^0/,''):String(q/4),x,R.y-4)}}
 for(let k=0;k<3;k++){const b=k<s.placed?{x:inchX(1.5*k),y:R.y-50,w:inchX(1.5)-inchX(0),h:26}:s.drag&&s.drag.k===k?{x:s.drag.x-30,y:s.drag.y-13,w:inchX(1.5)-inchX(0),h:26}:trayBar(k);
  g.fillStyle=['#86efac','#93c5fd','#fca5a5'][k];A.paint.rrect(b.x,b.y,b.w,b.h,6);g.fill();g.strokeStyle=DARK;g.lineWidth=1.5;g.stroke();g.font=`800 ${z(12)}${TXT}`;g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText('1½ in',b.x+b.w/2,b.y+b.h/2)}
 if(s.placed){const x=inchX(1.5*s.placed);g.strokeStyle='#7c3aed';g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.moveTo(x,R.y-50);g.lineTo(x,R.y+34);g.stroke();g.setLineDash([])}
 if(s.placed>=3&&!s.done){const K=numKeys(F.ENDS.keys).map(b=>Object.assign(b,{y:A.H*.78}));K.forEach(b=>tile(b,b.k,{bad:s.miss===b.i}))}}
function lay(){const s=st.ends;if(s.placed>=3)return;s.placed++;A.sound.tick();const end=1.5*s.placed;speak(`Bar ${s.placed} laid down. The bars now reach ${end%1?Math.floor(end)+' and a half':end} inches.`+(s.placed<3?'':' Choose the total.'))}
function endsAns(i){const s=st.ends;if(s.placed<3||s.done)return;if(i!==F.ENDS.ans){s.miss=i;A.sound.miss();return speak(F.ENDS.slip[i])}
 s.done=true;s.miss=null;A.sound.pop();speak('Yes: 1½ + 1½ + 1½ = 4½ inches. The ruler shows it too.')}
function draw(){const g=A.ctx;g.fillStyle=PAPER;g.fillRect(0,0,A.W,A.H);const k=part();if(k==='quiz'){banner('Challenge',{y:A.H*.3,ok:1});return}
 ({find:drawFind,plot:drawPlot,read:drawRead,diff:drawDiff,ends:drawEnds})[k]();A.fx.draw(g)}
function down(p){const k=part();
 if(k==='find'&&nearLine(p))tapMark(eAt(p.x));
 else if(k==='plot'){if(st.plot.i<F.DATA.length&&inBox(p,cardBox())){st.plot.drag={x:p.x,y:p.y};A.redraw();return true}if(nearLine(p))place(eAt(p.x))}
 else if(k==='read'){const b=st.read.mode&&!st.read.count&&numKeys(F.TALLER.keys).find(q=>inBox(p,q));if(b)readCount(b.i);else if(nearLine(p))readMode(eAt(p.x))}
 else if(k==='diff'){const b=st.diff.low&&!st.diff.done&&numKeys(F.DIFF.keys).find(q=>inBox(p,q));if(b)diffAns(b.i);else if(nearLine(p))diffPick(eAt(p.x))}
 else if(k==='ends'){const s=st.ends;if(s.placed>=3){const b=numKeys(F.ENDS.keys).map(q=>Object.assign(q,{y:A.H*.78})).find(q=>inBox(p,q));if(b)endsAns(b.i);return false}
  const t=[0,1,2].find(j=>j>=s.placed&&inBox(p,trayBar(j)));if(t!=null){s.drag={k:t,x:p.x,y:p.y};return true}}
 return false}
function move(p){const k=part();if(k==='plot'&&st.plot.drag){st.plot.drag={x:p.x,y:p.y};A.redraw()}if(k==='ends'&&st.ends.drag){Object.assign(st.ends.drag,{x:p.x,y:p.y});A.redraw()}}
function up(p){const k=part();if(k==='plot'&&st.plot.drag){st.plot.drag=null;if(p&&nearLine(p))place(eAt(p.x));else{A.redraw();speak('Drop the X on the line, above the seedling’s height.')}}
 if(k==='ends'&&st.ends.drag){st.ends.drag=null;lay()}}
function fresh(){run++;for(const k in st)delete st[k];Object.assign(st,{cur:4,find:{i:0,miss:-1,got:[]},plot:{i:0,miss:-1,n:Array(9).fill(0),drag:null},read:{mode:false,count:false,miss:null},diff:{top:false,low:false,done:false,miss:null},ends:{placed:0,done:false,miss:null,drag:null},hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();twins();st.hook()}
function cursor(d){st.cur=Math.max(0,Math.min(8,st.cur+d));speak(`Pointer at ${F.NAME[st.cur]} inches.`)}
/* button twins under the canvas: a pointer moved by Left and Right, and the canvas keys */
function twins(){if(!keysRow)return;keysRow.innerHTML='';const k=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keysRow,t).onclick=f};
 const ptr=(go,l)=>{add('◀ Left',()=>cursor(-1),'Move the pointer one eighth left');add('Right ▶',()=>cursor(1),'Move the pointer one eighth right');add(l,()=>go(st.cur))};
 if(k==='find'&&st.find.i<F.FIND.length)ptr(tapMark,'Pick this mark');
 if(k==='plot'&&st.plot.i<F.DATA.length)ptr(place,'Place the X here');
 if(k==='read'&&!st.read.mode)ptr(readMode,'Pick this height');
 if(k==='read'&&st.read.mode&&!st.read.count)F.TALLER.keys.forEach((n,i)=>add(String(n),()=>readCount(i),`${n} seedlings`));
 if(k==='diff'&&!st.diff.low)ptr(diffPick,'Pick this X');
 if(k==='diff'&&st.diff.low&&!st.diff.done)F.DIFF.keys.forEach((n,i)=>add(n,()=>diffAns(i),`Difference ${n} inch`));
 if(k==='ends'&&st.ends.placed<3)add('Lay a bar',lay,'Lay the next 1½ inch bar on the ruler');
 if(k==='ends'&&st.ends.placed>=3&&!st.ends.done)F.ENDS.keys.forEach((n,i)=>add(n,()=>endsAns(i),`Total ${n} inches`))}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){fresh();speak(F.DESC[i]);st.hook=ready(i,ok,F.DONE[i])}
function demo(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const steps=[
{h:'Eighths of an inch',p:'A ruler splits each inch into 8 equal jumps. Find each mark on the scale. Only 1, 1½ and 2 are named.',
 predict:{q:'Which is longer: ⅛ inch or ¼ inch?',opts:['⅛ inch, because 8 is bigger','¼ inch, the inch is cut into fewer pieces'],ans:1},task:'Find all 4 marks',
 show:()=>demo(0,F.FIND.map(f=>()=>tapMark(f.e)),550),go:()=>open(0,()=>st.find.i>=F.FIND.length)},
{h:'Plot the seedlings',p:'Eight bean seedlings were measured to the nearest ⅛ inch. Put one X above each height. Some heights are written in a different way.',
 predict:{q:'One seedling is 1 2/4 in and another is 1 4/8 in. Where do their Xs go?',opts:['In two different places','In the same stack'],ans:1},task:'Plot all 8 seedlings',
 show:()=>demo(1,F.DATA.map(d=>()=>place(d.e)),450),go:()=>open(1,()=>st.plot.i>=F.DATA.length)},
{h:'Read the plot',p:'A line plot shows every value at once. Find the most common height, then count the taller seedlings.',task:'Answer both questions',
 show:()=>demo(2,[()=>readMode(F.MODE),()=>readCount(F.TALLER.keys.indexOf(F.TALLER.ans))],700),go:()=>open(2,()=>st.read.count)},
{h:'Tallest − shortest',p:'How much taller is the tallest seedling than the shortest? Tap both Xs, then count the jumps between them.',
 predict:{q:'To work out 1⅞ − 1¼, what do you do first?',opts:['Take away tops and bottoms: 6/4','Write 1¼ as 1 2/8'],ans:1},task:'Find the difference',
 show:()=>demo(3,[()=>diffPick(7),()=>diffPick(2),()=>diffAns(F.DIFF.ans)],700),go:()=>open(3,()=>st.diff.done)},
{h:'End to end',p:'The three 1½ in seedlings are laid end to end. Drag each bar onto the ruler, then find the total length.',
 predict:{q:'What is ½ + ½ + ½?',opts:['3/6','1½'],ans:1},task:'Lay the 3 bars and find the total',
 show:()=>demo(4,[lay,lay,lay,()=>endsAns(F.ENDS.ans)],550),go:()=>open(4,()=>st.ends.done)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});
/* feedback for each wrong challenge answer, by the slip it shows */
function fix(t){let m='Measure in eighths: each inch on the plot has 8 equal jumps.';
 if(t==='big8')m='More pieces means smaller pieces: an inch cut into 8 gives smaller parts than an inch cut into 4. ¼ = 2/8.';
 if(t==='equiv')m='1 4/8 is the same length as 1½, so it joins the 1½ stack. Equal lengths share one place on the line.';
 if(t==='marks')m='Count the jumps between marks, not the marks themselves. From 1⅜ to 1⅞ is 4 jumps: 4/8 = ½ inch.';
 if(t==='tops')m='Only the tops change when the bottoms match. Keep the bottom number and add or take away the tops.';
 if(t==='incl')m='“Taller than” leaves out the values that are equal. Take away the shorter ones and the equal ones.';
 if(t==='whole')m='Add the wholes and the fractions: ¾ + ¾ = 6/4 = 1½, so 1¾ + 1¾ = 2 + 1½ = 3½.';
 if(t==='add')m='“−” means take away. 1¾ − 1¼: the wholes cancel and ¾ − ¼ = 2/4 = ½.';
 return m}
function next(){qk++;const Q=F.QS[qk%F.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qk+1)%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+fix(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':fix(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{quiz.hidden=x.step!==5;keysRow.hidden=x.step===5;twins()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);keysRow=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Line plot lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});twins()}}).start()})})();
