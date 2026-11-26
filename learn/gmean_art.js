/* Data and drawings for flaggmean (estimating the mean from grouped data; Mathematics, Data & Statistics, ages 13-15).
   Sources: National Curriculum in England (2013) KS3 Statistics ('describe, interpret and compare observed
   distributions of a single variable through ... appropriate measures of central tendency') and DfE GCSE Mathematics
   subject content (2013) S4 ('interpret, analyse and compare the distributions of data sets ... through appropriate
   measures of central tendency, including modal class') and S3 (grouped data in tables and charts); AQA GCSE
   Mathematics 8300 specification S4 note 'estimate the mean from grouped data, using midpoints'; Watson and Moritz (2000)
   on students' understanding of averages. All heights are made-up data with exact arithmetic. Slips it targets: using a
   class boundary (or the class width) instead of the midpoint; dividing by the number of classes instead of the total
   frequency; thinking the answer is exact; taking the middle class as the median class; giving the biggest frequency
   instead of the modal class; and accepting an estimate outside the range of the data. */
const GME=(()=>{
/* heights of 30 pupils, h in cm, in 10 cm classes lo <= h < lo + 10 */
const LO=[130,140,150,160,170],W=10,F=[2,5,6,12,5];
const mid=i=>LO[i]+W/2,lab=i=>`${LO[i]} \u2264 h < ${LO[i]+W}`,short=i=>`${LO[i]}\u2013${LO[i]+W}`;
const N=F.reduce((a,b)=>a+b,0),FM=F.map((f,i)=>f*mid(i)),SUM=FM.reduce((a,b)=>a+b,0),EST=SUM/N;/* 30 pupils, 4780, 159.33 cm */
const cum=f=>{let t=0;return f.map(x=>t+=x)};
function medClass(f){const n=f.reduce((a,b)=>a+b,0),c=cum(f),p=(n+1)/2;return c.findIndex(x=>x>=p)}
function modal(f){const top=Math.max(...f);return f.map((x,i)=>x===top?i:-1).filter(i=>i>=0)}
function estimate(f){const n=f.reduce((a,b)=>a+b,0);return n?f.reduce((a,x,i)=>a+x*mid(i),0)/n:0}
/* step 3: the 12 pupils in 160 <= h < 170 may sit anywhere in the class; the other classes are taken at their midpoints */
const SPOT=3,SPAN=[161,169];
const trueMean=c=>(SUM-F[SPOT]*mid(SPOT)+F[SPOT]*c)/N;
/* step 2: what to divide the total by: [label, divisor, ok, reply] */
const DIV=[['\u00f7 5 classes',5,0,'4780 \u00f7 5 = 956 cm? Nobody is 9 m tall. Divide by how many pupils, not how many classes.'],
 ['\u00f7 30 pupils',30,1,''],
 ['\u00f7 10 (class width)',10,0,'4780 \u00f7 10 = 478 cm is far above the tallest class. The class width is not a count of pupils.']];
const DESC=['A number line from 130 to 180 cm split into five classes. Tap each class at the value that best stands for it.',
 'A grouped frequency table with a midpoint column. Tap each row to work out f times the midpoint, then choose what to divide the total by.',
 'The 12 pupils in the 160 to 170 class shown as dots. Drag the dots along the class to see how the true mean moves while the estimate stays.',
 'A histogram of the heights with a running total. Tap the modal class, then the class that holds the median.',
 'A histogram you can change. Drag the top of any bar to change its frequency and watch the estimated mean.'];
const TXT=['Inside a class you do not know each value, so use the midpoint: halfway between the class boundaries.',
 'Estimated mean = total of f \u00d7 midpoint \u00f7 total frequency.',
 'The midpoint assumes the values in a class balance out around the middle. If they do not, the true mean is different. That is why it is an estimate.',
 'The modal class has the biggest frequency. The median class holds the middle value, found with a running total.',
 'Bars with more pupils pull the estimated mean towards their midpoint. The estimate always lies between the smallest and largest possible values.'];
const DONE=['Midpoints 135, 145, 155, 165 and 175 cm: halfway between each pair of boundaries.','4780 \u00f7 30 = 159.3 cm (1 d.p.), an estimate of the mean height.',
 'The true mean could be anywhere from about 157.7 to 160.9 cm, but the estimate stays at 159.3 cm.','Modal class 160 \u2264 h < 170 (12 pupils). The 15th and 16th heights are both in 160 \u2264 h < 170 too, not in the middle row.',
 'Moving pupils into a taller class pulls the estimate up; it can never leave the 130 to 180 cm range.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'What midpoint stands for the class 20 \u2264 t < 30 minutes?',a:'25 minutes',o:[['20 minutes','bound'],['10 minutes','width']]},
 {q:'A grouped table has 4 classes, total frequency 40 and total f \u00d7 midpoint 1000. Estimate the mean.',a:'25',o:[['250','rows'],['1000','rows']]},
 {q:'Why is a mean from a grouped table only an estimate?',a:'The exact values in each class are not known',o:[['The midpoints are rounded','exact'],['The classes are too wide to add','exact']]},
 {q:'Frequencies 3, 9, 8, 2 in classes 0\u201310, 10\u201320, 20\u201330, 30\u201340. What is the modal class?',a:'10\u201320',o:[['9','freq'],['20\u201330, the middle','middle']]},
 {q:'Classes 0\u201310, 10\u201320, 20\u201330, 30\u201340, 40\u201350 have f 1, 2, 3, 10, 4. Which class holds the median?',a:'30\u201340',o:[['20\u201330, the middle row','middle'],['10','freq']]},
 {q:'Heights are grouped from 130 to 180 cm. Someone estimates the mean as 192 cm. Why must it be wrong?',a:'The mean must lie inside 130 to 180 cm',o:[['Means are always below the midpoint','range'],['192 is not a midpoint','bound']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F_='px system-ui,sans-serif',BAR=['#2563eb','#7c3aed','#0891b2','#c2410c','#15803d'];
function round(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fit(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?15:17,f=`800 ${s}${F_}`,rows=fit(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F_}`,r2=fit(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* text helper: one line at x,y */
function txt(g,s,x,y,size,col,align,base,weight){g.font=`${weight||700} ${size}${F_}`;g.fillStyle=col;g.textAlign=align||'left';g.textBaseline=base||'alphabetic';g.fillText(s,x,y)}
/* a cm axis from v0 to v1 between x0 and x1 at height y, labelled every 10 */
function axis(g,x0,x1,y,v0,v1,dk){const X=v=>x0+(x1-x0)*(v-v0)/(v1-v0);g.strokeStyle=dk?'#94a3b8':EDGE;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let v=v0;v<=v1;v++){const big=v%10===0;g.beginPath();g.moveTo(X(v),y);g.lineTo(X(v),y+(big?10:v%5===0?7:4));g.stroke();if(big)txt(g,String(v),X(v),y+24,13,dk?'#cbd5e1':'#334155','center')}return X}
/* a histogram of f over the five classes in the box r; returns bar rects; st[i] = '' | 'sel' | 'ok' | 'no' */
function hist(g,r,f,maxF,st,dk){const bw=r.w/f.length,out=[];g.strokeStyle=dk?'#94a3b8':EDGE;g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
 f.forEach((v,i)=>{const h=r.h*v/maxF,x=r.x+i*bw,y=r.y+r.h-h,s=st&&st[i];g.fillStyle=s==='no'?(dk?'#7f1d1d':'#fecaca'):s==='ok'?(dk?'#166534':'#86efac'):BAR[i];g.fillRect(x+1,y,bw-2,h);
  g.strokeStyle=s==='sel'||s==='ok'?(dk?'#f8fafc':INK):s==='no'?NO:(dk?'#0f172a':'#ffffff');g.lineWidth=s?3:1.5;g.strokeRect(x+1,y,bw-2,h);
  txt(g,String(v),x+bw/2,y-6,15,dk?LIGHT:INK,'center','bottom',800);txt(g,short(i),x+bw/2,r.y+r.h+18,A_narrow(r)?11:13,dk?'#cbd5e1':'#334155','center');out.push({i,x,y:r.y,w:bw,h:r.h,top:y})});return out}
const A_narrow=r=>r.w<420;
return{LO,W,F,N,FM,SUM,EST,mid,lab,short,cum,medClass,modal,estimate,SPOT,SPAN,trueMean,DIV,DESC,TXT,DONE,QS,round,fit,top,txt,axis,hist,INK,LIGHT,OK,NO,EDGE,SEL,BAR}})();
