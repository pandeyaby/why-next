/* Data and drawings for flagfreqavg (averages from frequency tables; Mathematics, Data & Statistics, ages 12-14).
   Sources: National Curriculum in England (2013) KS3 Statistics ('describe, interpret and compare observed
   distributions of a single variable through ... appropriate measures of central tendency (mean, mode, median)');
   GCSE Mathematics subject content (DfE 2013) S4 'interpret, analyse and compare ... appropriate measures of central
   tendency' from frequency tables; Pollatsek, Lima and Well (1981) on unweighted-mean errors; NCETM
   KS3 Statistics materials. All tables are made-up data with exact arithmetic. Slips it targets: reading the biggest
   frequency as the mode; taking the middle row (not the middle value) as the median; dividing the total by the number
   of rows instead of the total frequency; adding the values or the frequencies instead of multiplying f x x; and not
   checking that a mean lies between the smallest and largest value. */
const FQA=(()=>{
/* step 1: ten match results to drop into a frequency table (goals 0-3) */
const RAW=[1,0,2,1,3,1,2,0,1,2],RAW_X=[0,1,2,3];
/* the main table: goals in 30 matches. mean 46/30 = 1.53, median between the 15th and 16th = 1, mode 1 */
const GOALS={name:'Goals',unit:'goals',x:[0,1,2,3,4],f:[7,10,6,4,3]};
/* mode round 2: shoe sizes of 20 pupils; mode 5 (frequency 9) */
const SHOES={name:'Shoe size',unit:'',x:[3,4,5,6],f:[2,7,9,2]};
/* median round 2: 21 values; the 11th is 3, though the middle row is 2 */
const PETS={name:'Books read',unit:'books',x:[0,1,2,3,4],f:[2,3,4,8,4]};
const MODE_T=[GOALS,SHOES],MED_T=[GOALS,PETS];
const n=T=>T.f.reduce((a,b)=>a+b,0),sfx=T=>T.f.reduce((a,f,i)=>a+f*T.x[i],0);
function sorted(T){const out=[];T.x.forEach((x,i)=>{for(let k=0;k<T.f[i];k++)out.push(x)});return out}
function median(T){const s=sorted(T),m=s.length;return m%2?s[(m-1)/2]:(s[m/2-1]+s[m/2])/2}
function modes(T){const top=Math.max(...T.f);return T.x.filter((_,i)=>T.f[i]===top)}
/* step 4: divisor choices for the mean of GOALS: [label, divisor, ok, reply] */
const DIV=[['\u00f7 5 rows',5,0,'46 \u00f7 5 = 9.2 goals a match? No match had more than 4. Divide by the number of matches, not rows.'],
 ['\u00f7 30 matches',30,1,''],
 ['\u00f7 10 (0+1+2+3+4)',10,0,'0+1+2+3+4 adds the row labels, not the matches. 46 \u00f7 10 = 4.6 is above 4, so it cannot be right.']];
const DESC=['Ten match results. Drag each card into the row for its number of goals, or use the buttons.',
 'A frequency table. Tap the value that is the mode.',
 'The table written out as a line of values in order. Tap the value in the middle place.',
 'The goals table. Tap each row to work out f times x, then tap what to divide the total by.',
 'Drag the end of each frequency bar to change the table. The mean, median and mode update as you go.'];
const TXT=['A frequency table counts how often each value happens. Row 2 with frequency 3 means 3 matches with 2 goals each.',
 'The mode is the value with the biggest frequency. It is a value from the first column, not the frequency.',
 'Write the values out in order. The median is the middle one, at place (n + 1) \u00f7 2, where n is the total frequency.',
 'Mean = total of f \u00d7 x \u00f7 total frequency. Divide by the number of values, not the number of rows.',
 'Change the frequencies and watch the averages. A mean always lies between the smallest and largest value.'];
const DONE=['The frequencies are 2, 4, 3 and 1: 10 matches. The 2-goal row holds 3 matches, so 3 \u00d7 2 = 6 goals.',
 'Mode: 1 goal (frequency 10) and shoe size 5 (frequency 9). The mode is the value, not the 10 or the 9.',
 '30 values: the middle is between the 15th and 16th, both 1 goal. 21 values: the 11th is 3 books, not the middle row.',
 '46 goals \u00f7 30 matches = 1.53 goals a match (to 2 d.p.). It lies between 0 and 4, so it is sensible.',
 'Mode 3 with a mean above 2: moving matches to high-scoring rows pulls the mean up.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Shoe sizes 3, 4, 5, 6 have frequencies 2, 7, 9, 2. What is the mode?',a:'Size 5',o:[['9','modef'],['Size 6','modef']]},
 {q:'Goals 0 to 4 have frequencies 7, 10, 6, 4, 3 (46 goals). Jo says the mean is 46 \u00f7 5 = 9.2. Is she right?',a:'No: divide by 30 matches, so 1.53',o:[['Yes, there are 5 rows','rows'],['Yes, 46 is the total','rows']]},
 {q:'Pets 0, 1, 2, 3 have frequencies 4, 9, 5, 2 (20 pupils). What is the median?',a:'1 pet',o:[['1.5 pets, the middle of the rows','midrow'],['10, half of 20','medpos']]},
 {q:'Goals 0, 1, 2 have frequencies 3, 5, 2. What is the mean?',a:'0.9 goals',o:[['3 goals (9 \u00f7 3 rows)','rows'],['1 goal, the middle row','midrow']]},
 {q:'Scores go from 1 to 5. Which mean must be wrong?',a:'6.2',o:[['3.4','range'],['1.8','range']]},
 {q:'Row: 3 goals, frequency 4. How many goals does this row add to the total?',a:'12',o:[['4','fx'],['7','fx']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',HI='#1d4ed8',F='px system-ui,sans-serif';
const HUE=['#0e7490','#7c3aed','#c2410c','#15803d','#be185d','#4d7c0f'];
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function words(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function txt(g,s,x,y,o){o=o||{};g.font=`${o.w||700} ${o.n||16}${F}`;g.fillStyle=o.c||INK;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* top strip: instruction, then the last reply in green or red; returns the y under it */
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=words(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,10);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=words(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* a frequency table; cols = extra column labels; cell(i,c) returns its text; mark(i,c) returns 'ok','no','hi' or ''.
   Returns the cell rectangles as {i,c,x,y,w,h}. */
function table(A,T,x,y,w,rh,cols,cell,mark){const g=A.ctx,dk=A.col.dark,heads=[T.name+' (x)','Frequency (f)',...cols],cw=w/heads.length,out=[];
 g.fillStyle=dk?'#334155':'#e2e8f0';g.fillRect(x,y,w,rh);heads.forEach((h,c)=>{const ls=words(g,h,cw-8,`800 ${A.narrow?12:14}${F}`);ls.forEach((t,k)=>txt(g,t,x+cw*c+cw/2,y+rh/2+(k-(ls.length-1)/2)*15,{w:800,n:A.narrow?12:14,c:dk?LIGHT:INK}))});
 T.x.forEach((xv,i)=>{const ry=y+rh*(i+1);heads.forEach((_,c)=>{const m=mark?mark(i,c):'',bg=m==='ok'?(dk?'#14532d':'#dcfce7'):m==='no'?(dk?'#7f1d1d':'#fee2e2'):m==='hi'?(dk?'#1e3a8a':'#dbeafe'):(dk?'#0f172a':'#ffffff');
  g.fillStyle=bg;g.fillRect(x+cw*c,ry,cw,rh);g.strokeStyle=m?(m==='ok'?OK:m==='no'?NO:HI):EDGE;g.lineWidth=m?3:1;g.strokeRect(x+cw*c+(m?1.5:0),ry+(m?1.5:0),cw-(m?3:0),rh-(m?3:0));
  const s=c===0?String(xv):c===1?String(T.f[i]):cell?cell(i,c):'';txt(g,s,x+cw*c+cw/2,ry+rh/2,{w:800,n:A.narrow?16:18,c:dk?LIGHT:INK});out.push({i,c,x:x+cw*c,y:ry,w:cw,h:rh})})});
 g.strokeStyle=EDGE;g.lineWidth=1.5;g.strokeRect(x,y,w,rh*(T.x.length+1));return out}
/* a round value chip, coloured by value */
function chip(g,x,y,r,v,o){o=o||{};g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=HUE[v%HUE.length];g.fill();if(o.ring){g.lineWidth=4;g.strokeStyle=o.ring;g.stroke()}
 txt(g,String(v),x,y+1,{w:800,n:Math.max(11,r*1.05),c:'#ffffff'})}
/* a button-like tile on the canvas */
function tile(g,r,label,o){o=o||{};const st=o.state;g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';rr(g,r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?HI:EDGE;g.lineWidth=st?3.5:1.6;g.stroke();const ls=words(g,label,r.w-12,`800 ${o.n||16}${F}`);ls.forEach((t,k)=>txt(g,t,r.x+r.w/2,r.y+r.h/2+(k-(ls.length-1)/2)*(o.n||16)*1.2,{w:800,n:o.n||16}))}
return{RAW,RAW_X,GOALS,SHOES,PETS,MODE_T,MED_T,DIV,DESC,TXT,DONE,QS,n,sfx,sorted,median,modes,rr,words,txt,top,table,chip,tile,HUE,INK,LIGHT,OK,NO}})();
