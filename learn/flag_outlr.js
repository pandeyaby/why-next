/* Flagship – choosing an average; outliers and skew (ages 12–14; KS3 statistics, CCSS 6.SP.5c/d). */
(()=>{
const BASE=[4,5,5,6,7,7,7,8,9];
const HUNT=[['Test scores out of 80',[3,58,61,62,65,66,68,70,71,74],0,80,0,[20,10]],['House prices (£ thousand)',[180,195,200,210,215,225,950],100,1000,6,[300,100]],['Lap times (seconds)',[12,14,15,15,16,17,18],10,20,-1,[2,1]]];
const SKEW=[['Pay in a small firm (£ thousand)',[18,19,20,21,22,24,25,90],10,100,[30,10]],['Quiz marks out of 20',[4,15,16,17,17,18,19,19],0,20,[5,2]]];
const CTX=[['House prices in a street with one mansion',1,'mansion street'],['Which shoe size a shop should order most of',2,'shoe sizes'],['Favourite fruit of 30 pupils',2,'favourite fruit'],['Test marks with no outliers, using every mark',0,'test marks'],['Pay in a firm with one very highly paid boss',1,'boss pay'],['Times for 5 laps that are all close together',0,'lap times']];
const AVG=['mean','median','mode'];
const PAY=[20,22,22,25,26,300];
const CLAIM=[['"Average pay here is £69.2k!"',0],['"Half our staff earn £23.5k or less."',1],['"The most common pay is £22k."',2]];
VIS.reg('flagoutlr',c=>{let A,bar,ch,k0=-1,epoch=0;
const T={};
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',AX='#475569',DOT='#1d4ed8',ODD='#c2410c',MEANC='#7c3aed',MEDC='#0f766e',WHITE='#ffffff';
const fs=(v,w)=>`${w||700} ${Math.round(v*(A.narrow?1:1.12))}px system-ui,sans-serif`;
const mode=()=>['stretch','hunt','skew','pick','spin','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const sum=a=>a.reduce((s,v)=>s+v,0),mean=a=>sum(a)/a.length,median=a=>{const b=[...a].sort((x,y)=>x-y),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2},r1=v=>Math.round(v*10)/10;
function mid(n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=fs(n);g.textAlign='center';g.textBaseline='middle'}
function list(a){mid(14);a.forEach((t,i)=>A.ctx.fillText(t,A.W/2,A.H*(.3+i*.16),A.W-14))}
function key(r,t,e,w){const g=A.ctx;g.fillStyle=WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.lineWidth=w||2;g.strokeStyle=e;g.stroke();g.fillStyle=INK;g.font=fs(13,800);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function sub(t){mid(13);A.ctx.fillText(t,A.W/2,A.H*.19,A.W-12)}
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.04:.5);g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok){const g=A.ctx;let n=14;g.font=fs(n,800);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=fs(n,800)}
const w=g.measureText(t).width+24,h=n+18;g.fillStyle=WHITE;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GOOD:AX;g.stroke();
g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
const PADX=()=>Math.max(22,A.W*.06);
function axis(lo,hi,y,step,below,above){const g=A.ctx,L=PADX(),R=A.W-PADX(),X=v=>L+(v-lo)/(hi-lo)*(R-L);
g.fillStyle=WHITE;A.paint.rrect(6,y-A.H*(above||.3),A.W-12,A.H*(above||.3)+(below||36),10);g.fill();
g.strokeStyle=AX;g.lineWidth=2;g.beginPath();g.moveTo(L,y);g.lineTo(R,y);g.stroke();g.fillStyle=INK;g.font=fs(11);g.textAlign='center';g.textBaseline='top';
for(let v=lo;v<=hi+1e-9;v+=step){g.beginPath();g.moveTo(X(v),y);g.lineTo(X(v),y+5);g.stroke();g.fillText(String(v),X(v),y+8)}return X}
function dots(vals,X,y,col){const g=A.ctx,seen={},r=Math.max(6,Math.min(10,A.W/60));return vals.map((v,i)=>{const k=seen[v]=(seen[v]||0)+1,cx=X(v),cy=y-r-2-(k-1)*(2*r+2);
g.fillStyle=(col&&col(i))||DOT;g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.strokeStyle=WHITE;g.lineWidth=1.5;g.stroke();return{x:cx,y:cy,r,i,v}})}
function marker(x,y,col,label,up){const g=A.ctx,s=9;g.fillStyle=col;g.beginPath();const e=(up?1:-1)*s*1.6;g.moveTo(x,y);g.lineTo(x-s,y+e);g.lineTo(x+s,y+e);g.closePath();g.fill();
g.font=fs(12,800);g.textAlign='center';g.textBaseline=up?'top':'bottom';const hw=g.measureText(label).width/2+10,tx=Math.max(hw,Math.min(A.W-hw,x));g.fillStyle=col;g.fillText(label,tx,y+e+(up?2:-2))}
const stretchVals=()=>BASE.slice(0,-1).concat([T.top]);
function drawStretch(){ground();const v=stretchVals(),X=axis(0,45,A.H*.62,A.narrow?10:5,72,.37),D=dots(v,X,A.H*.62,i=>i===v.length-1?ODD:null);T.knob=D[D.length-1];
const mn=mean(v),md=median(v);marker(X(mn),A.H*.62+30,MEANC,`mean ${r1(mn)}`,1);marker(X(md),A.H*.62-A.H*.24,MEDC,`median ${r1(md)}`,0);
tag(T.top>=30?`Top value ${T.top}: mean ${r1(mn)}, median ${md}`:`Drag the orange dot right (now ${T.top})`,A.H*.08,T.top>=30);
sub('Pocket money (£) for 9 pupils');}
function setTop(v){v=Math.max(9,Math.min(45,Math.round(v)));if(v===T.top)return;T.top=v;const s=stretchVals();
talk(`Top value ${v}. Mean ${r1(mean(s))}, median ${median(s)}. The mean moved ${r1(mean(s)-58/9)} from 6.4; the median did not.`)}
const noneKey=()=>({x:A.W/2-70,y:A.H*.84,w:140,h:36});
function drawHunt(){ground();if(T.h>=HUNT.length){tag('All 3 data sets checked',A.H*.08,1);list(['Scores: 3 is an outlier (mean 59.8 → 66.1)','Prices: 950 is an outlier (mean 310.7 → 204.2)','Laps: no outlier; 12 and 18 are just the ends']);return}
const [lab,vals,lo,hi,,tk]=HUNT[T.h];tag(`Set ${T.h+1} of 3: tap the outlier (or No outlier)`,A.H*.08);
sub(lab);
const X=axis(lo,hi,A.H*.66,A.narrow?tk[0]:tk[1]);T.pts=dots(vals,X,A.H*.66,i=>T.wrong===i?BAD:null);
key(noneKey(),'No outlier',T.wrong==='none'?BAD:AX,T.wrong==='none'?3:2)}
function judgeHunt(i){if(T.h>=HUNT.length)return;const [,vals,,,odd]=HUNT[T.h];
if(i!==(odd<0?'none':odd)){T.wrong=i;A.sound.miss();
if(odd<0)return talk(i===0||i===vals.length-1?`${vals[i]} is the ${i?'largest':'smallest'} value but sits close to the rest. Being at the end does not make it an outlier.`:`${vals[i]} is in the middle, so it is not far from the rest.`);
if(i==='none')return talk(`Look again: ${vals[odd]} sits far from all the other values, so it is an outlier.`);
return talk(`${vals[i]} is close to its neighbours. An outlier sits far from the rest: here it is ${vals[odd]}.`)}
T.wrong=null;A.sound.pop();
if(odd<0)talk('Right: no value is far from the rest. Mean '+r1(mean(vals))+', median '+median(vals)+'.');
else{const rest=vals.filter((_,k)=>k!==odd);talk(`${vals[odd]} is the outlier. With it: mean ${r1(mean(vals))}, median ${median(vals)}. Without it: mean ${r1(mean(rest))}, median ${median(rest)}. The mean moves much more.`)}
T.h++;talk2()}
function drawSkew(){ground();if(T.s>=SKEW.length){tag('Both means placed',A.H*.08,1);list(['Pay: median 21.5, mean 29.9 (pulled up by 90)','Quiz: median 17, mean 15.6 (pulled down by 4)','The mean leans towards the long tail.']);return}
const [lab,vals,lo,hi,tk]=SKEW[T.s];tag(`Set ${T.s+1} of 2: drag the purple arrow to the mean`,A.H*.08);
sub(lab+'. Median '+median(vals)+' shown in green.');
const X=axis(lo,hi,A.H*.62,A.narrow?tk[0]:tk[1],72,.37);dots(vals,X,A.H*.62);marker(X(median(vals)),A.H*.62-A.H*.22,MEDC,'median',0);
marker(X(T.guess),A.H*.62+30,MEANC,`your mean: ${r1(T.guess)}`,1);
key(checkKey(),'Check',MEANC)}
const checkKey=()=>({x:A.W-110,y:A.H*.86,w:96,h:34});
function nudge(d){if(T.s>=SKEW.length)return;const [,,lo,hi]=SKEW[T.s];T.guess=Math.max(lo,Math.min(hi,T.guess+d));talk(`Your mean: ${r1(T.guess)}.`)}
function checkMean(){if(T.s>=SKEW.length)return;const [,vals,lo,hi]=SKEW[T.s],m=mean(vals),md=median(vals),tol=(hi-lo)/40;
if(Math.abs(T.guess-m)>tol){A.sound.miss();
const near=Math.abs(T.guess-md)<=tol;return talk(near?`That is where the median is. The mean uses every value, so the ${m>md?'big':'small'} value ${m>md?Math.max(...vals):Math.min(...vals)} pulls it ${m>md?'up':'down'}. Total ${sum(vals)} ÷ ${vals.length}.`:
`Not yet: your mean is ${r1(T.guess)}. Find total ÷ count: ${sum(vals)} ÷ ${vals.length}. It is ${T.guess<m?'higher':'lower'}.`)}
A.sound.pop();talk(`Yes: mean ${r1(m)}, median ${md}. The ${m>md?'high':'low'} value pulls the mean ${m>md?'above':'below'} the median.`);T.s++;if(T.s<SKEW.length)T.guess=SKEW[T.s][2]+(SKEW[T.s][3]-SKEW[T.s][2])*.1;talk2()}
const avgBins=()=>{const w=(A.W-40)/3;return AVG.map((t,j)=>({x:10+j*(w+10),y:A.H*.46,w,h:A.H*.5,j}))};
const ctxCard=()=>{const w=Math.min(A.W-24,420);return{x:A.W/2-w/2,y:A.H*.16,w,h:A.H*.2}};
function wrap(t,x,y,w,lh){const g=A.ctx,ws=t.split(' '),ls=[''];ws.forEach(s=>{const q=ls[ls.length-1]?ls[ls.length-1]+' '+s:s;if(g.measureText(q).width>w)ls.push(s);else ls[ls.length-1]=q});ls.forEach((l,i)=>g.fillText(l,x,y+i*lh))}
function drawPick(){ground();const g=A.ctx;tag(T.p>=CTX.length?'All 6 matched':`Card ${T.p+1} of 6: which average fits best?`,A.H*.07,T.p>=CTX.length);
avgBins().forEach(b=>{g.fillStyle='#f0f9ff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=T.miss===b.j?BAD:'#0369a1';g.lineWidth=T.miss===b.j?4:2.5;g.stroke();
g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=fs(15,800);g.fillText(AVG[b.j],b.x+b.w/2,b.y+8);g.font=fs(11,700);
CTX.slice(0,T.p).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[2],b.x+b.w/2,b.y+32+i*16,b.w-6))});
if(T.p<CTX.length){const d=T.drag,r=ctxCard(),q=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;g.fillStyle=WHITE;A.paint.rrect(q.x,q.y,q.w,q.h,12);g.fill();g.lineWidth=d?4:2;g.strokeStyle=d?DOT:AX;g.stroke();
g.fillStyle=INK;g.font=fs(15,700);g.textAlign='center';g.textBaseline='top';wrap(CTX[T.p][0],q.x+q.w/2,q.y+10,q.w-20,20)}}
function file(j){if(T.p>=CTX.length)return;const [t,k]=CTX[T.p];
if(j!==k){T.miss=j;A.sound.miss();const why=k===2?(/fruit/.test(t)?'Fruit names are not numbers: no mean or median. Only the mode works.':'The shop wants the size bought most often: the mode. A mean like 5.7 is not a size.'):
k===1?'One extreme value pulls the mean a long way. The median is the middle value, so it still shows a typical one.':'Values close together, no outliers: the mean uses every value and is not pulled off.';return talk(why)}
T.miss=null;T.p++;A.sound.pop();talk(`${t}: ${AVG[k]}.`+(T.p>=CTX.length?' All 6 matched.':''))}
function drawSpin(){ground();const g=A.ctx;tag(T.c>=CLAIM.length?'All 3 claims decoded':`Claim ${T.c+1} of 3: which average is it?`,A.H*.07,T.c>=CLAIM.length);
mid(13);g.fillText('Pay of 6 staff (£ thousand): 20, 22, 22, 25, 26, 300',A.W/2,A.H*.18,A.W-12);
const X=axis(0,300,A.H*.56,A.narrow?100:50,36);dots(PAY,X,A.H*.56,i=>i===5?ODD:null);
if(T.c<CLAIM.length){g.fillStyle=A.col.tx;g.font=fs(16,800);g.fillText(CLAIM[T.c][0],A.W/2,A.H*.78,A.W-12)}
else ['mean 69.2','median 23.5','mode 22'].forEach((t,i)=>{g.fillStyle=[MEANC,MEDC,DOT][i];g.font=fs(14,800);g.fillText(t,A.W*(.2+i*.3),A.H*.8)})}
function decode(j){if(T.c>=CLAIM.length)return;const [t,k]=CLAIM[T.c];
if(j!==k){T.miss=j;A.sound.miss();const fix=k===0?'69.2 is 415 ÷ 6: the total shared out. Only the boss earns more than 26, so it is the mean, pulled up by 300.':k===1?'Half the values are at or below 23.5: the middle of 22 and 25. That is the median.':'22 appears twice and every other value once, so 22 is the mode.';return talk(fix)}
T.miss=null;T.c++;A.sound.pop();talk(`${t} uses the ${AVG[k]}.`+(T.c>=CLAIM.length?' All 3 decoded. The mean makes pay look high; the median is typical.':''))}
function draw(){const k=mode();if(k==='quiz'){ground();tag('Challenge',A.H*.25,1);tag('One outlier moves the mean; the median holds',A.H*.55);return}
({stretch:drawStretch,hunt:drawHunt,skew:drawSkew,pick:drawPick,spin:drawSpin})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
if(k==='stretch'&&T.knob&&Math.hypot(p.x-T.knob.x,p.y-T.knob.y)<T.knob.r+16){T.drag={kind:'top'};return true}
if(k==='hunt'&&T.h<HUNT.length){if(on(p,noneKey())){judgeHunt('none');return false}const d=(T.pts||[]).find(q=>Math.hypot(p.x-q.x,p.y-q.y)<q.r+8);if(d)judgeHunt(d.i);return false}
if(k==='skew'&&T.s<SKEW.length){if(on(p,checkKey())){checkMean();return false}if(p.y>A.H*.55){T.drag={kind:'mean'};move(p);return true}return false}
if(k==='pick'&&T.p<CTX.length){if(on(p,ctxCard())){T.drag={x:p.x,y:p.y};return true}const b=avgBins().find(r=>on(p,r));if(b)file(b.j)}return false}
function move(p){const d=T.drag;if(!d)return;const k=mode();
if(k==='stretch'){const L=PADX(),R=A.W-PADX();setTop((p.x-L)/(R-L)*45);return}
if(k==='skew'){const [,,lo,hi]=SKEW[T.s],L=PADX(),R=A.W-PADX();T.guess=Math.max(lo,Math.min(hi,lo+(p.x-L)/(R-L)*(hi-lo)));A.redraw();return}
d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=T.drag;if(!d)return;T.drag=null;const k=mode();
if(k==='skew'){talk(`Your mean: ${r1(T.guess)}. Tap Check when you are happy.`);return}
if(k==='pick'){const b=avgBins().find(r=>on(p,r));if(b)file(b.j);else A.redraw()}}
function wipe(){epoch++;for(const k in T)delete T[k];Object.assign(T,{top:9,h:0,s:0,guess:15,p:0,c:0,drag:null,ping:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();T.ping()}
function talk2(){A.redraw();btns();T.ping()}
function prime(i,desc,ok,msg){wipe();talk(desc);T.ping=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function replay(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function btns(){if(!bar)return;bar.innerHTML='';const k=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
if(k==='stretch'){b('top value −5',()=>setTop(T.top-5),'Top value minus 5');b('top value +5',()=>setTop(T.top+5),'Top value plus 5')}
if(k==='hunt'&&T.h<HUNT.length){const v=HUNT[T.h][1];[0,v.length-1].forEach(i=>b(`${v[i]}`,()=>judgeHunt(i),`Outlier is ${v[i]}`));b('a middle value',()=>judgeHunt(Math.floor(v.length/2)),`Outlier is ${v[Math.floor(v.length/2)]}`);b('No outlier',()=>judgeHunt('none'),'This set has no outlier')}
if(k==='skew'&&T.s<SKEW.length){const st=(SKEW[T.s][3]-SKEW[T.s][2])/40;[-5,-1,1,5].forEach(k=>b(k<0?(k<-1?'◀◀':'◀'):(k>1?'▶▶':'▶'),()=>nudge(k*st),`Move your mean ${k<0?'left':'right'} ${Math.abs(k)} step${k*k>1?'s':''}`));b('Check',checkMean,'Check your mean')}
if(k==='pick'&&T.p<CTX.length)AVG.forEach((t,j)=>b(t,()=>file(j),`${CTX[T.p][0]}: ${t}`));
if(k==='spin'&&T.c<CLAIM.length)AVG.forEach((t,j)=>b(t,()=>decode(j),`The claim uses the ${t}`))}
const steps=[
{h:'Stretch one value',p:'Nine pupils get pocket money from £4 to £9. Drag the orange top value far right and watch the mean and median.',
predict:{q:'The top value grows from 9 to 30. What happens?',opts:['Mean and median both move','Mean moves, median stays'],ans:1},task:'Drag the top value to 30 or more',
show:()=>replay(0,[14,19,24,30,35].map(v=>()=>setTop(v)),500),
go:()=>prime(0,'9 values from 4 to 9. Mean 6.4, median 7. Drag the orange top value.',()=>T.top>=30,'The mean uses every value, so one big value drags it. The median only cares about the middle.')},
{h:'Find the outlier',p:'An outlier is a value far from the rest. Tap it. Careful: the biggest or smallest value is not always an outlier.',task:'Check all 3 sets',
show:()=>replay(1,HUNT.map(q=>()=>judgeHunt(q[4]<0?'none':q[4])),700),
go:()=>prime(1,'Test scores from 3 to 74. Tap the outlier or No outlier.',()=>T.h>=HUNT.length,'An outlier moves the mean a lot and the median very little.')},
{h:'Skew pulls the mean',p:'When a few values trail off on one side, the data is skewed. Drag the purple arrow to your guess for the mean, then tap Check.',
predict:{q:'Pay: 18, 19, 20, 21, 22, 24, 25 and 90. Where is the mean?',opts:['Near the median, about 21','Above the median, nearer 30'],ans:1},task:'Place both means',
show:()=>{steps[2].go();const me=epoch;SKEW.forEach((q,j)=>{setTimeout(()=>{if(me===epoch){T.guess=mean(q[1]);checkMean()}},700*(j+1))})},
go:()=>prime(2,'Pay data with a long tail to the right. Median 21.5. Drag the mean arrow, then Check.',()=>T.s>=SKEW.length,'The mean is pulled towards the tail; the median stays with the bulk.')},
{h:'Which average fits?',p:'Mean: uses every value, best with no outliers. Median: the middle, best with outliers or skew. Mode: most common, the only one for categories.',
predict:{q:'Favourite fruit of 30 pupils. Which average can you find?',opts:['the mean','the mode'],ans:1},task:'Match all 6 cards',
show:()=>replay(3,CTX.map(q=>()=>file(q[1])),500),
go:()=>prime(3,'Card: house prices in a street with one mansion. Boxes: mean, median, mode.',()=>T.p>=CTX.length,'Pick the average that gives a typical value for this data.')},
{h:'Spot the spin',p:'Six staff, and the boss earns £300k. Each claim is true. Which average did each one use?',task:'Decode all 3 claims',
show:()=>replay(4,CLAIM.map(q=>()=>decode(q[1])),650),
go:()=>prime(4,'Pay of 6 staff: 20, 22, 22, 25, 26, 300. Claim: average pay is 69.2.',()=>T.c>=CLAIM.length,'Ask which average a claim used, and whether an outlier pulls it.')},
{h:'Challenge',p:'',go:()=>{wipe();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.ping()});
const QS=[
{q:'Data: 2, 3, 3, 4, 48. Which average best shows a typical value?',a:'the median',o:[['the mean','meanout'],['the range','range']]},
{q:'Values 5, 6, 7, 8, 9. The 9 changes to 90. What happens to the median?',a:'It stays 7',o:[['It rises a lot','medmove'],['It becomes 90','last']]},
{q:'Which average can you use for favourite colours?',a:'the mode',o:[['the mean','catmean'],['the median','catmed']]},
{q:'Data has a long tail of high values. How do mean and median compare?',a:'The mean is higher',o:[['They are equal','equal'],['The median is higher','flip']]},
{q:'Heights 150, 152, 153, 155, 1540 cm. What should you do with 1540?',a:'Check it: probably a typing error',o:[['Keep it and use the mean','keep'],['Always delete the biggest value','alwaysdel']]},
{q:'Marks 61, 64, 66, 67, 70, all close. Which average uses every mark?',a:'the mean',o:[['the median','meduse'],['the mode','nomode']]}];
function fb(t){let m='Check for outliers, skew, and whether the data is numbers.';
switch(t){case 'meanout':m='The mean is 60 ÷ 5 = 12, above four of the five values. The median, 3, is typical.';break;
case 'range':m='The range measures spread, not a typical value. It is not an average.';break;
case 'medmove':m='Changing the top value does not change the middle value, so the median stays 7.';break;
case 'last':m='The median is the middle value, 7, not the largest value.';break;
case 'catmean':m='You cannot add colours, so there is no mean. Use the mode.';break;
case 'catmed':m='Colours have no order, so there is no middle one. Use the mode.';break;
case 'equal':m='Only symmetric data has them equal. The high tail pulls the mean up.';break;
case 'flip':m='The high values pull the mean, not the median, so the mean ends up higher.';break;
case 'keep':m='1540 cm is over 15 m: almost surely a typing error for 154. Check it first.';break;
case 'alwaysdel':m='Remove an outlier only for a reason, such as an error. Real outliers stay; use the median.';break;
case 'meduse':m='The median only looks at the middle value. The mean uses all five marks.';break;
case 'nomode':m='No mark appears twice, so there is no mode here. The mean uses every mark.';break}
return m}
function nextQ(){k0++;const Q=QS[k0%QS.length],all=[[Q.a,'ok'],...Q.o],r=k0%3,ord=all.slice(r).concat(all.slice(0,r));
ch.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=ch.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){ch.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const out=ch.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
out.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+fb(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':fb(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{ch.hidden=B.step!==5;bar.hidden=B.step===5;btns()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Average controls'},w);ch=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});btns()}}).start()})})();
