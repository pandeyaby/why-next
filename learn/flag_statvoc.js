/* Flagship: Statistical analysis vocabulary (ages 9–11; NC Year 6 Statistics and KS2/KS3 data
   handling: mode, median, mean, range, frequency, outlier, scatter graph, correlation).
   Each word is met by doing it: vote to change the mode (most common, from the frequency),
   swap score cards into order to find the median, level cube towers to find the mean,
   drag one score away to make an outlier and watch range and mean jump while the median
   holds, then label three scatter graphs as positive, negative or no correlation.
   Distinct from flagmad (mean absolute deviation), flagspread (statistical questions),
   flagtally (pictograms and tally charts) and flagdtype (types of data). */
(()=>{
VIS.reg('flagstatvoc',c=>{
let A,pad,qa,round=-1;const S={};
const PANES=['mode','median','mean','outlier','scatter','quiz'];
const FRUIT=['apple','banana','pear','grape'];
const CARDS0=[9,2,7,4,5];const TOW0=[2,4,9];const DOTS0=[4,6,8,8,10];
const SETS=[{name:'Height and shoe size',x:'height',y:'shoe size',kind:'positive',pts:[[1,1.5],[2,2],[3,3.2],[4,3.6],[5,5],[6,5.4],[7,6.8],[8,7.2]]},
 {name:'Outdoor temperature and hot drinks sold',x:'temperature',y:'hot drinks sold',kind:'negative',pts:[[1,7.6],[2,7],[3,6.1],[4,5.6],[5,4.2],[6,3.8],[7,2.6],[8,1.8]]},
 {name:'Birthday month and test score',x:'birthday month',y:'test score',kind:'none',pts:[[1,5],[2,2],[3,7],[4,3.5],[5,6.5],[6,1.8],[7,4.4],[8,7.3]]}];
const describe=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const pane=()=>PANES[A.step];
const fx=v=>Number.isInteger(v)?String(v):v.toFixed(1);
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.wt||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-14)}
function wrapLine(g,t,y){const px=A.narrow?13:15,out=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const n=out.length-1,s=(out[n]+' '+w).trim();if(g.measureText(s).width>A.W-18&&out[n])out.push(w);else out[n]=s}
 const k=Math.min(3,out.length);out.slice(0,3).forEach((s,j)=>word(s,A.W/2,y+(j-(k-1)/2)*(px+3),px,{wt:600}))}
function tint(k,a){const C=A.col;return A.mix(C.pn,C[k],C.dark?a*.8:a)}
/* ---- frequency and mode ---- */
function modeOf(f){const top=Math.max(...f);const w=FRUIT.filter((_,i)=>f[i]===top);return w}
function barBox(i){const n=FRUIT.length,gap=A.narrow?10:18,w=(A.W-40-gap*(n-1))/n,base=A.H*.74,u=Math.min(26,A.H*.07);return{x:20+i*(w+gap),w,base,u}}
function paintVotes(){const g=A.ctx,C=A.col,f=S.freq,top=modeOf(f);
 word('Votes for favourite fruit (frequency)',A.W/2,A.H*.08,A.narrow?14:16);
 FRUIT.forEach((nm,i)=>{const b=barBox(i),h=f[i]*b.u,isTop=top.includes(nm);
  g.fillStyle=tint(isTop?'gr':'cy',isTop?.45:.3);A.paint.rrect(b.x,b.base-h,b.w,h,6);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  word(f[i],b.x+b.w/2,b.base-h-12,15);word(nm,b.x+b.w/2,b.base+14,A.narrow?12:14,{wt:600});word('tap to vote',b.x+b.w/2,b.base+30,11,{wt:500,ink:C.mu})});
 word(top.length>1?`Modes: ${top.join(' and ')} (a tie)`:`Mode: ${top[0]}`,A.W/2,A.H*.17,A.narrow?16:19,{ink:C.gr})}
function vote(i){S.freq[i]++;const top=modeOf(S.freq);S.voted=true;
 note(top.length>1?`${FRUIT[i]} now has ${S.freq[i]} votes. ${top.join(' and ')} tie, so there are two modes.`:`${FRUIT[i]} now has ${S.freq[i]} votes. The mode is ${top[0]}: the most common answer, not the biggest number.`,top.length===1&&top[0]==='grape'?true:undefined)}
/* ---- median: swap cards into order ---- */
function cardBox(i){const n=S.cards.length,gap=A.narrow?8:14,w=Math.min(78,(A.W-30-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return{x:x0+i*(w+gap),y:A.H*.3,w,h:w*1.15}}
const sorted=a=>a.every((v,i)=>!i||a[i-1]<=v);
function paintCards(){const g=A.ctx,C=A.col,ok=sorted(S.cards),mid=(S.cards.length-1)/2;
 word('Spelling scores of five children',A.W/2,A.H*.08,A.narrow?14:16);
 S.cards.forEach((v,i)=>{const b=cardBox(i),hit=ok&&i===mid,sel=S.pick===i;
  g.fillStyle=hit?tint('gr',.45):sel?tint('am',.45):tint('cy',.18);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=sel?C.am:C.tx;g.lineWidth=sel?4:1.5;g.stroke();word(v,b.x+b.w/2,b.y+b.h/2,A.narrow?24:30)});
 const b=cardBox(mid);word(ok?`In order. The middle card is the median: ${S.cards[mid]}`:'Tap two cards to swap them, or drag one onto another',A.W/2,b.y+b.h+26,A.narrow?13:15,{ink:ok?C.gr:C.mu,wt:ok?700:600})}
function swap(i,j){if(i===j||i==null||j==null)return;const a=S.cards;[a[i],a[j]]=[a[j],a[i]];S.pick=null;
 if(sorted(a)){S.ordered=true;return note(`Smallest to largest: ${a.join(', ')}. The middle value is ${a[2]}, so the median is ${a[2]}.`,true)}
 note(`Now ${a.join(', ')}. Keep swapping until the scores go up from smallest to largest.`)}
function nudgeOrder(){const a=S.cards;for(let i=0;i<a.length-1;i++)if(a[i]>a[i+1])return swap(i,i+1)}
/* ---- mean: level the towers ---- */
function towerBox(i){const n=S.tow.length,w=Math.min(84,(A.W-60)/n-16),gap=(A.W-n*w)/(n+1),cube=Math.min(30,A.H*.064);return{x:gap+i*(w+gap),w,base:A.H*.8,cube}}
function paintTowers(){const g=A.ctx,C=A.col,t=S.tow,tot=t.reduce((a,b)=>a+b,0),even=t.every(v=>v===t[0]);
 word(`Total ${tot} cubes shared by ${t.length} towers`,A.W/2,A.H*.08,A.narrow?14:16);
 t.forEach((h,i)=>{const b=towerBox(i);for(let k=0;k<h;k++){g.fillStyle=tint(even?'gr':(k%2?'vi':'pk'),.4);const y=b.base-(k+1)*b.cube;g.fillRect(b.x,y,b.w,b.cube-2);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(b.x,y,b.w,b.cube-2)}
  word(h,b.x+b.w/2,b.base+16,16);if(S.lift===i)word('↑ lifted',b.x+b.w/2,b.base+34,12,{ink:C.am})});
 word(even?`Level! Each tower has ${t[0]}: the mean is ${tot} ÷ ${t.length} = ${t[0]}`:'Drag a top cube from a tall tower to a short one',A.W/2,A.H*.17,A.narrow?14:16,{ink:even?C.gr:C.mu})}
function moveCube(from,to){const t=S.tow;if(from==null||to==null||from===to||!t[from])return;t[from]--;t[to]++;S.lift=null;
 if(t.every(v=>v===t[0])){S.level=true;return note(`All towers are ${t[0]} tall. Sharing the total fairly gives the mean: 15 ÷ 3 = ${t[0]}.`,true)}
 note(`Towers now ${t.join(', ')}. The total is still 15. Keep levelling.`)}
function evenOut(){const t=S.tow,hi=t.indexOf(Math.max(...t)),lo=t.indexOf(Math.min(...t));moveCube(hi,lo)}
/* ---- range, outlier ---- */
function statsOf(v){const s=v.slice().sort((a,b)=>a-b),n=s.length,mean=s.reduce((a,b)=>a+b,0)/n,med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;return{mean,med,range:s[n-1]-s[0]}}
function axisX(v){return 24+v*(A.W-48)/30}
function paintOutlier(){const g=A.ctx,C=A.col,v=S.dots,st=statsOf(v),y0=A.H*.6;
 word('Quiz scores out of 30 (drag the last score)',A.W/2,A.H*.08,A.narrow?13:15);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(axisX(0),y0);g.lineTo(axisX(30),y0);g.stroke();
 for(let t=0;t<=30;t+=5){g.beginPath();g.moveTo(axisX(t),y0);g.lineTo(axisX(t),y0+6);g.stroke();word(t,axisX(t),y0+18,12,{wt:600})}
 const stack={};v.forEach((x,i)=>{const k=stack[x]||0;stack[x]=k+1;const last=i===v.length-1;g.fillStyle=last?tint('am',.6):tint('cy',.45);g.beginPath();g.arc(axisX(x),y0-13-k*20,last?11:9,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=last?3:1.5;g.stroke()});
 g.strokeStyle=C.rd;g.lineWidth=2;g.setLineDash([5,4]);g.beginPath();g.moveTo(axisX(st.mean),A.H*.3);g.lineTo(axisX(st.mean),y0);g.stroke();g.setLineDash([]);
 word('mean',axisX(st.mean),A.H*.27,12,{ink:C.tx});
 g.fillStyle=C.tx;g.beginPath();g.moveTo(axisX(st.med),y0+28);g.lineTo(axisX(st.med)-7,y0+40);g.lineTo(axisX(st.med)+7,y0+40);g.closePath();g.fill();word('median',axisX(st.med),y0+52,12,{wt:600});
 word(`mean ${fx(st.mean)}   median ${fx(st.med)}   range ${st.range}`,A.W/2,A.H*.17,A.narrow?15:18,{ink:C.tx})}
function setLast(x){x=Math.max(0,Math.min(30,Math.round(x)));const v=S.dots;if(x===v[4])return;v[4]=x;const st=statsOf(v);
 if(x>=20){S.out=true;return note(`${x} is an outlier: far from the rest. The range jumped to ${st.range} and the mean to ${fx(st.mean)}, but the median stayed ${fx(st.med)}.`,true)}
 note(`Last score ${x}. Range ${st.range}, mean ${fx(st.mean)}, median ${fx(st.med)}.`)}
/* ---- scatter graphs ---- */
function plotBox(){const l=A.narrow?40:54;return{l,t:A.H*.2,r:A.W-16,b:A.H*.7}}
function paintScatter(){const g=A.ctx,C=A.col,d=SETS[S.set],p=plotBox();
 word(d.name,A.W/2,A.H*.08,A.narrow?14:16);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(p.l,p.t);g.lineTo(p.l,p.b);g.lineTo(p.r,p.b);g.stroke();
 word(d.x+' →',(p.l+p.r)/2,p.b+18,12,{wt:600});g.save();g.translate(p.l-18,(p.t+p.b)/2);g.rotate(-Math.PI/2);word(d.y+' →',0,0,12,{wt:600});g.restore();
 d.pts.forEach(([x,y])=>{const X=p.l+x/9*(p.r-p.l),Y=p.b-y/8.5*(p.b-p.t);g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(X-6,Y-6);g.lineTo(X+6,Y+6);g.moveTo(X+6,Y-6);g.lineTo(X-6,Y+6);g.stroke()});
 const lab=S.named[S.set];word(lab?`Labelled: ${lab==='none'?'no correlation':lab+' correlation'}`:`Graph ${S.set+1} of 3: tap the graph for the next one`,A.W/2,A.H*.79,A.narrow?13:15,{ink:lab?C.gr:C.mu})}
function nameIt(kind){const d=SETS[S.set];if(kind!==d.kind){const why={positive:'Positive means both go up together: dots rise from left to right.',negative:'Negative means one goes up as the other goes down: dots fall from left to right.',none:'No correlation means no pattern: dots are scattered all over.'}[kind];return note(`Not this one. ${why} Look at the dots again.`,false)}
 S.named[S.set]=kind;const all=SETS.every((s,i)=>S.named[i]===s.kind);if(all){S.allNamed=true;return note('All three labelled. Correlation describes a pattern. It does not prove that one thing causes the other.',true)}
 note(`Yes: ${kind==='none'?'no correlation':kind+' correlation'}. Tap the graph or Next graph for another.`,true)}
function nextSet(){S.set=(S.set+1)%SETS.length;note(`${SETS[S.set].name}. Which pattern do the dots show?`)}
/* ---- frame ---- */
function paint(){const{ctx:g,W,H,col:C}=A,k=pane();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.05:.07);g.fillRect(0,0,W,H);
 if(k==='quiz'){word('Mode, median, mean, range',W/2,H*.4,A.narrow?16:19);word('or correlation?',W/2,H*.5,A.narrow?16:19);word('Answer below',W/2,H*.62,14,{ink:C.mu,wt:500});A.fx.draw(g);return}
 ({mode:paintVotes,median:paintCards,mean:paintTowers,outlier:paintOutlier,scatter:paintScatter})[k]();
 if(S.msg)wrapLine(g,S.msg,H*.9);A.fx.draw(g)}
function note(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();describe(t);controls();A.redraw();S.after&&S.after()}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{freq:[5,3,2,4],cards:CARDS0.slice(),tow:TOW0.slice(),dots:DOTS0.slice(),set:0,named:{},pick:null,lift:null,msg:'',after:()=>{}});A.redraw()}
function controls(){if(!pad)return;pad.innerHTML='';const k=pane();if(k==='quiz')return;
 const b=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':lab||t},pad,t).onclick=f};
 if(k==='mode')FRUIT.forEach((nm,i)=>b(`+1 ${nm}`,()=>vote(i),`Add a vote for ${nm}`));
 if(k==='median'){b('Swap one pair that is out of order',nudgeOrder);b('Mix them up again',()=>{S.cards=CARDS0.slice();S.ordered=false;note('Back to 9, 2, 7, 4, 5.')})}
 if(k==='mean'){b('Move a cube: tallest → shortest',evenOut);b('Start again',()=>{S.tow=TOW0.slice();S.level=false;note('Towers of 2, 4 and 9.')})}
 if(k==='outlier'){b('Last score −1',()=>setLast(S.dots[4]-1));b('Last score +1',()=>setLast(S.dots[4]+1));b('Last score +5',()=>setLast(S.dots[4]+5))}
 if(k==='scatter'){b('Positive',()=>nameIt('positive'),'Label this graph positive correlation');b('Negative',()=>nameIt('negative'),'Label this graph negative correlation');b('No correlation',()=>nameIt('none'),'Label this graph no correlation');b('Next graph',nextSet)}}
function inBox(p,b){return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h}
function press(p){const k=pane();if(k==='quiz')return false;
 if(k==='mode'){for(let i=0;i<FRUIT.length;i++){const b=barBox(i);if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>A.H*.2&&p.y<b.base+40){vote(i);return true}}return false}
 if(k==='median'){for(let i=0;i<S.cards.length;i++)if(inBox(p,cardBox(i))){S.grab=i;return true}return false}
 if(k==='mean'){for(let i=0;i<S.tow.length;i++){const b=towerBox(i);if(p.x>=b.x-8&&p.x<=b.x+b.w+8&&p.y>A.H*.2&&p.y<b.base+20&&S.tow[i]){S.lift=i;A.redraw();return true}}return false}
 if(k==='outlier'){S.slide=true;setLast((p.x-24)/(A.W-48)*30);return true}
 if(k==='scatter'){const pb=plotBox();if(p.y>pb.t-10&&p.y<pb.b+10){nextSet();return true}}
 return false}
function drag(p){if(S.slide)setLast((p.x-24)/(A.W-48)*30)}
function release(p){const k=pane();S.slide=false;if(!p)return;
 if(k==='median'&&S.grab!=null){let over=null;for(let i=0;i<S.cards.length;i++)if(inBox(p,cardBox(i)))over=i;
  if(over!=null&&over!==S.grab)swap(S.grab,over);else if(over===S.grab){if(S.pick!=null&&S.pick!==over)swap(S.pick,over);else{S.pick=over;note(`Picked ${S.cards[over]}. Tap another card to swap.`)}}S.grab=null}
 if(k==='mean'&&S.lift!=null){let over=null;for(let i=0;i<S.tow.length;i++){const b=towerBox(i);if(p.x>=b.x-8&&p.x<=b.x+b.w+8)over=i}
  if(over!=null&&over!==S.lift)moveCube(S.lift,over);else{S.lift=null;A.redraw()}}}
const check=(i,ok,say)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say()+A.reveal(i))};
function demo(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*320))}
function begin(i,hint,ok,say){fresh();note(hint);S.after=check(i,ok,say)}
const steps=[
{h:'Frequency and mode',p:'Frequency is how many times something happens. The mode is the most common value: the one with the highest frequency.',
 predict:{q:'Votes: apple 5, banana 3, pear 2, grape 4. What is the mode?',opts:['5, because it is the biggest number','apple, the most common choice','grape, the last one on the list'],ans:1},
 task:'Add votes until grape is the only mode',show:()=>demo(0,[()=>vote(3),()=>vote(3)]),
 go:()=>begin(0,'Tap a bar, or a button, to add a vote.',()=>{const m=modeOf(S.freq);return m.length===1&&m[0]==='grape'},()=>'Grape has the highest frequency, so grape is the mode.')},
{h:'Median: the middle',p:'The median is the middle value once the data is in order from smallest to largest. Order first, then find the middle.',
 predict:{q:'Scores 9, 2, 7, 4, 5. What is the median?',opts:['7, the middle card as written','5, the middle once they are in order','4, the smallest but one'],ans:1},
 task:'Swap the cards into order, smallest first',show:()=>demo(1,[nudgeOrder,nudgeOrder,nudgeOrder,nudgeOrder,nudgeOrder,nudgeOrder,nudgeOrder]),
 go:()=>begin(1,'Drag one card onto another, or tap two cards, to swap.',()=>S.ordered,()=>'In order: 2, 4, 5, 7, 9. The median is 5.')},
{h:'Mean: share it fairly',p:'The mean adds all the values, then shares the total equally. Mean = total ÷ how many values.',
 predict:{q:'Towers of 2, 4 and 9 cubes are levelled out fairly. How tall is each?',opts:['4, the middle tower','5, the total of 15 shared by 3','9, the tallest tower'],ans:1},
 task:'Move cubes until every tower is the same height',show:()=>demo(2,[evenOut,evenOut,evenOut,evenOut]),
 go:()=>begin(2,'Drag a top cube from one tower to another.',()=>S.level,()=>'Each tower is 5. The mean of 2, 4 and 9 is 5.')},
{h:'Range and outliers',p:'The range is the largest value minus the smallest. An outlier is a value far from the rest. It stretches the range and pulls the mean.',
 predict:{q:'One score changes from 10 to 28. Which average moves the most?',opts:['the median','the mean','neither: averages never change'],ans:1},
 task:'Drag the last score out to 20 or more',show:()=>demo(3,[()=>setLast(14),()=>setLast(20),()=>setLast(28)]),
 go:()=>begin(3,'Drag the orange dot, or use the buttons.',()=>S.out,()=>'The outlier stretched the range and pulled the mean. The median held at 8.')},
{h:'Scatter graphs and correlation',p:'A scatter graph plots pairs of values as dots. Correlation is the pattern: positive (both rise), negative (one rises, one falls) or no correlation.',
 predict:{q:'Taller children tend to have bigger feet. On a scatter graph the dots…',opts:['rise from left to right: positive correlation','fall from left to right: negative correlation','spread all over: no correlation'],ans:0},
 task:'Label all three scatter graphs',show:()=>demo(4,[()=>nameIt('positive'),nextSet,()=>nameIt('negative'),nextSet,()=>nameIt('none')]),
 go:()=>begin(4,'Look at the dots, then pick a label.',()=>S.allNamed,()=>'Positive, negative, and no correlation.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['Shoe sizes 3, 4, 4, 5, 6. What is the mode?',[['4','ok'],['6','big'],['5','order']]],
 ['Scores 8, 1, 6. What is the median?',[['6','ok'],['1','order'],['5','mid']]],
 ['Ages 2, 3 and 7. What is the mean?',[['4','ok'],['3','mid'],['12','total']]],
 ['Heights 120, 135, 150 cm. What is the range?',[['30 cm','ok'],['150 cm','range'],['135 cm','mid']]],
 ['Scores 6, 7, 8, 8, 30. Which value is the outlier?',[['30','ok'],['8','big'],['6','range']]],
 ['Ice cream sales rise as the temperature rises. This is…',[['positive correlation','ok'],['negative correlation','sign'],['proof that ice cream makes it hot','cause']]],
 ['In a frequency table, red has 7, blue 4, green 7. The mode is…',[['red and green (two modes)','ok'],['7','big'],['blue','order']]]];
function why(t){let m='Check what each word asks for: most common, middle, fair share, or spread.';
 if(t==='big')m='The mode is the most common value or category, not the biggest number or the highest frequency count itself.';
 if(t==='order')m='Put the values in order first. The median is the middle of the ordered list.';
 if(t==='mid')m='That mixes up mean and median. Mean = total ÷ how many. Median = middle value in order.';
 if(t==='total')m='You found the total. The mean shares that total equally: divide by how many values.';
 if(t==='range')m='The range is largest minus smallest, not the largest value on its own.';
 if(t==='sign')m='Both go up together, so it is positive. Negative means one goes up while the other goes down.';
 if(t==='cause')m='Correlation shows a pattern. It does not prove one thing causes the other.';
 return m}
function quiz(){round++;const Q=QS[round%QS.length],r=round%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>grade(t)});describe('Challenge: '+Q[0]);A.redraw()}
function grade(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Data buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down:press,move:drag,up:release});controls()}});
A.start()})})();
