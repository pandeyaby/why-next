/* Flagship – averages from frequency tables (Mathematics, Data & Statistics, ages 12-14; KS3 Statistics, GCSE S4).
   Drop ten match results into a frequency table and read what f means, tap the mode (a value, not the frequency),
   unroll the table into a line of values and tap the middle place for the median, fill the f × x column and choose
   the divisor for the mean, then drag frequency bars and watch the three averages move. Data and drawings:
   freqavg_art.js. */
(()=>{const D=FQA;
VIS.reg('flagfreqavg',c=>{let A,ctl,cq,qk=-1,run=0,drag=null;const Z={};
const ORDER=['tally','mode','median','mean','bars','chal'],at=()=>ORDER[A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let CELLS=[],CHIPS=[],TILES=[],BARS=[];
const TW=()=>Math.min(A.W-16,520),TX=()=>(A.W-TW())/2;
function say(text,bad){Z.msg=text;Z.bad=!!bad;c.say(text);A.cv.setAttribute('aria-label',text);A.redraw();btns();Z.chk()}
const tone=f=>f?'ok':Z.bad?'no':'';
const fmt=v=>Number.isInteger(v)?String(v):v.toFixed(2).replace(/0$/,'');
/* ---- 1. build the table from raw results ---- */
function drop(i,row){const s=Z.t;if(s.put[i])return;const v=D.RAW[i];
 if(D.RAW_X[row]!==v){s.bad=i;A.sound.miss();return say(`That card shows ${v} goal${v===1?'':'s'}, so it goes in the ${v} row, not the ${D.RAW_X[row]} row.`,true)}
 s.put[i]=1;s.k++;s.bad=-1;s.pick=null;A.sound.pop();const f=D.RAW.filter((x,j)=>s.put[j]&&x===v).length;say(`${v} goals: frequency now ${f}.`,false)}
function paintTally(){const s=Z.t,fin=s.k>=D.RAW.length,g=A.ctx,y0=D.top(A,fin?D.DONE[0]:`Drag each match result into its row. (${s.k} of 10)`,tone(fin),Z.msg,Z.bad);
 const per=A.narrow?5:10,cw=(A.W-16)/per,r=Math.min(22,cw*.38);CHIPS=[];D.RAW.forEach((v,i)=>{if(s.put[i])return;const k=CHIPS.length,cx=8+cw*(k%per)+cw/2,cy=y0+r+6+Math.floor(k/per)*(r*2+10);CHIPS.push({i,x:cx-r,y:cy-r,w:2*r,h:2*r});
  if(drag&&drag.i===i)return;D.chip(g,cx,cy,r,v,{ring:s.bad===i?D.NO:s.pick===i?'#1d4ed8':null})});
 const ty=y0+2*(r*2+10)+8,T={name:'Goals',unit:'goals',x:D.RAW_X,f:D.RAW_X.map(x=>D.RAW.filter((v,j)=>s.put[j]&&v===x).length)};
 CELLS=D.table(A,T,TX(),ty,TW(),Math.min(48,(A.H-ty-60)/5),fin?['f \u00d7 x']:[],(i,cc)=>String(T.f[i]*T.x[i]),i=>fin&&i===2?'hi':'');
 if(fin)D.txt(g,'Row 2: 3 matches \u00d7 2 goals = 6 goals',A.W/2,CELLS[CELLS.length-1].y+CELLS[0].h+22,{w:800,n:16,c:A.col.dark?'#86efac':D.OK});
 if(drag)D.chip(g,drag.x,drag.y,r+4,D.RAW[drag.i],{ring:'#1d4ed8'})}
/* ---- 2. the mode ---- */
function pickMode(i,col){const s=Z.m;if(s.r>=D.MODE_T.length)return;const T=D.MODE_T[s.r],top=Math.max(...T.f),u=T.unit?' '+T.unit:'';
 if(col===1){s.bad=[i,1];A.sound.miss();return say(T.f[i]===top?`${top} is the frequency: how many times. The mode is the VALUE with that frequency: ${T.x[i]}${u}.`:`${T.f[i]} is a frequency, not a value. Find the biggest frequency, then read its value.`,true)}
 if(T.f[i]!==top){s.bad=[i,0];A.sound.miss();return say(`${T.x[i]}${u} happens ${T.f[i]} times. Another value happens more often.`,true)}
 s.bad=null;s.r++;A.sound.pop();say(`Mode = ${T.x[i]}${u}: it has the biggest frequency, ${top}.`,false)}
function paintMode(){const s=Z.m,fin=s.r>=D.MODE_T.length,T=D.MODE_T[Math.min(s.r,D.MODE_T.length-1)],y0=D.top(A,fin?D.DONE[1]:`Tap the MODE in this table. (${s.r+1} of 2)`,tone(fin),Z.msg,Z.bad);
 const rh=Math.min(52,(A.H-y0-20)/(T.x.length+1));CELLS=fin?[]:D.table(A,T,TX(),y0+6,TW(),rh,[],null,(i,cc)=>s.bad&&s.bad[0]===i&&s.bad[1]===cc?'no':'')}
/* ---- 3. the median ---- */
function pickPlace(k){const s=Z.d;if(s.r>=D.MED_T.length)return;const T=D.MED_T[s.r],L=D.sorted(T),m=L.length,mid=(m+1)/2,ok=m%2?k===mid:(k===m/2||k===m/2+1);s.cur=k;
 if(!ok){s.bad=k;A.sound.miss();return say(`That is the ${ord(k)} value. There are ${m} values, and (${m} + 1) \u00f7 2 = ${fmt(mid)}, so the middle is ${m%2?'the '+ord(mid):'between the '+ord(m/2)+' and '+ord(m/2+1)}.`,true)}
 s.bad=-1;s.r++;s.cur=1;A.sound.pop();say(`Median = ${fmt(D.median(T))} ${T.unit}. ${m%2?`The ${ord(mid)} of ${m} values.`:`The ${ord(m/2)} and ${ord(m/2+1)} of ${m} values are both ${L[m/2-1]}.`}`,false)}
function ord(k){const t=k%100;return k+(t>10&&t<14?'th':k%10===1?'st':k%10===2?'nd':k%10===3?'rd':'th')}
function paintMedian(){const s=Z.d,fin=s.r>=D.MED_T.length,g=A.ctx,T=D.MED_T[Math.min(s.r,D.MED_T.length-1)],y0=D.top(A,fin?D.DONE[2]:`Tap the value in the MIDDLE place. (${s.r+1} of 2)`,tone(fin),Z.msg,Z.bad);
 const rh=Math.min(38,(A.H-y0)*.075);D.table(A,T,TX(),y0+4,TW(),rh,['Running total'],(i,cc)=>String(T.f.slice(0,i+1).reduce((a,b)=>a+b,0)),null);
 const L=D.sorted(T),per=10,cw=(A.W-16)/per,r=Math.min(15,cw*.4),gy=y0+4+rh*(T.x.length+1)+16;CHIPS=[];if(fin)return;
 D.txt(g,`${L.length} values in order (place 1 is top left)`,A.W/2,gy,{w:700,n:14,c:A.col.dark?D.LIGHT:D.INK});
 L.forEach((v,j)=>{const cx=8+cw*(j%per)+cw/2,cy=gy+16+r+Math.floor(j/per)*(r*2+8);CHIPS.push({i:j+1,x:cx-r-2,y:cy-r-2,w:2*r+4,h:2*r+4});D.chip(g,cx,cy,r,v,{ring:s.bad===j+1?D.NO:s.cur===j+1?'#facc15':null})})}
/* ---- 4. the mean ---- */
function workRow(i){const s=Z.n;if(s.rows[i])return;s.rows[i]=1;s.k++;A.sound.pop();const T=D.GOALS;say(`${T.f[i]} matches \u00d7 ${T.x[i]} goals = ${T.f[i]*T.x[i]} goals.${s.k===T.x.length?' Total: 46 goals. Now choose what to divide by.':''}`,false)}
function divide(j){const s=Z.n;if(s.k<D.GOALS.x.length){A.sound.miss();return say('First work out f \u00d7 x for every row, so you know the total goals.',true)}const O=D.DIV[j];
 if(!O[2]){s.bad=j;A.sound.miss();return say(O[3],true)}s.bad=-1;s.done=1;A.sound.pop();say('46 \u00f7 30 = 1.53 goals a match. It lies between 0 and 4, so it is sensible.',false)}
function paintMean(){const s=Z.n,T=D.GOALS,g=A.ctx,fin=!!s.done,y0=D.top(A,fin?D.DONE[3]:s.k<5?`Tap each row to work out f \u00d7 x. (${s.k} of 5)`:'Total 46 goals. What do you divide by?',tone(fin),Z.msg,Z.bad);
 const rh=Math.min(42,(A.H-y0)*.085);CELLS=D.table(A,T,TX(),y0+4,TW(),rh,['f \u00d7 x'],(i)=>s.rows[i]?String(T.f[i]*T.x[i]):'tap',(i,cc)=>s.rows[i]&&cc===2?'ok':'');
 const ty=y0+4+rh*(T.x.length+1);D.txt(g,`Total: f = 30, f \u00d7 x = ${s.k===5?46:'?'}`,A.W/2,ty+18,{w:800,n:16,c:A.col.dark?D.LIGHT:D.INK});
 const th=Math.max(40,Math.min(50,(A.H-ty-44)/3-8));TILES=s.k<5?[]:D.DIV.map((O,j)=>({i:j,x:8,y:ty+36+j*(th+8),w:A.W-16,h:th}));TILES.forEach(r=>D.tile(g,r,`46 ${D.DIV[r.i][0]}${fin&&D.DIV[r.i][2]?' = 1.53':''}`,{state:s.bad===r.i?'no':fin&&D.DIV[r.i][2]?'ok':'',n:17}))}
/* ---- 5. drag the bars ---- */
const GOAL=f=>{const T={x:[0,1,2,3,4],f};const md=D.modes(T);return D.n(T)>0&&md.length===1&&md[0]===3&&D.sfx(T)/D.n(T)>2};
function setF(i,v){const s=Z.b;v=Math.max(0,Math.min(12,Math.round(v)));if(s.f[i]===v)return;s.f[i]=v;const T={x:[0,1,2,3,4],f:s.f},nn=D.n(T);
 const msg=nn?`n = ${nn}. Mean ${fmt(+(D.sfx(T)/nn).toFixed(2))}, median ${fmt(D.median(T))}, mode ${D.modes(T).join(' and ')}.`:'Every frequency is 0: there is no data, so no averages.';
 if(GOAL(s.f)&&!s.won){s.won=1;A.sound.pop()}say(msg,false)}
function paintBars(){const s=Z.b,g=A.ctx,dk=A.col.dark,T={x:[0,1,2,3,4],f:s.f},nn=D.n(T),y0=D.top(A,s.won?D.DONE[4]:'Drag the bars. Make the mode 3 goals AND the mean more than 2.',tone(s.won),Z.msg,Z.bad);
 const lx=48,bw=A.W-lx-24,bh=Math.min(40,(A.H-y0-150)/5-8);BARS=[];
 D.txt(g,'Goals',24,y0+10,{w:800,n:13,c:dk?D.LIGHT:D.INK});D.txt(g,'Frequency (drag)',lx+bw/2,y0+10,{w:800,n:13,c:dk?D.LIGHT:D.INK});
 s.f.forEach((f,i)=>{const y=y0+24+i*(bh+8);D.txt(g,String(i),24,y+bh/2,{w:800,n:18,c:dk?D.LIGHT:D.INK});g.fillStyle=dk?'#1e293b':'#f1f5f9';g.fillRect(lx,y,bw,bh);
  const w=bw*f/12;g.fillStyle=D.HUE[i];g.fillRect(lx,y,w,bh);g.fillStyle='#ffffff';g.fillRect(lx+w-5,y+4,4,bh-8);D.txt(g,String(f),lx+w+(f>10?-16:14),y+bh/2,{w:800,n:16,c:f>10?'#ffffff':dk?D.LIGHT:D.INK});BARS.push({i,x:lx,y,w:bw,h:bh})});
 const ry=y0+24+5*(bh+8)+10;if(!nn)return D.txt(g,'No data: every frequency is 0.',A.W/2,ry+20,{w:800,n:16,c:dk?D.LIGHT:D.INK});
 const mean=D.sfx(T)/nn,md=D.modes(T),med=D.median(T),ax0=lx,ax1=lx+bw,X=v=>ax0+(ax1-ax0)*v/4;
 g.strokeStyle=dk?'#cbd5e1':'#475569';g.lineWidth=2;g.beginPath();g.moveTo(ax0,ry+40);g.lineTo(ax1,ry+40);g.stroke();[0,1,2,3,4].forEach(v=>{g.beginPath();g.moveTo(X(v),ry+34);g.lineTo(X(v),ry+46);g.stroke();D.txt(g,String(v),X(v),ry+56,{w:700,n:14,c:dk?D.LIGHT:D.INK})});
 [['mean',mean,'#b45309',-1],['median',med,'#1d4ed8',1]].forEach(([l,v,cl,side])=>{g.fillStyle=dk&&cl==='#1d4ed8'?'#93c5fd':dk?'#fbbf24':cl;g.beginPath();g.moveTo(X(v),ry+40+side*4);g.lineTo(X(v)-7,ry+40+side*16);g.lineTo(X(v)+7,ry+40+side*16);g.closePath();g.fill();
  g.font='800 14px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(`${l} ${fmt(+v.toFixed(2))}`,Math.max(40,Math.min(A.W-40,X(v))),ry+40+(side>0?34:-26))});
 D.txt(g,`n = ${nn}   total f \u00d7 x = ${D.sfx(T)}   mode = ${md.join(' and ')}`,A.W/2,ry+100,{w:800,n:A.narrow?13:15,c:dk?D.LIGHT:D.INK})}
/* ---- wiring ---- */
const PAINT={tally:paintTally,mode:paintMode,median:paintMedian,mean:paintMean,bars:paintBars};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=at();
 if(k==='chal'){const y0=D.top(A,'Challenge: averages from frequency tables','ok'),dk=A.col.dark;[['Mode','biggest f \u2192 its value'],['Median','value at place (n + 1) \u00f7 2'],['Mean','total f \u00d7 x \u00f7 total f']].forEach(([a,b],i)=>{const y=y0+30+i*64;D.chip(g,40,y,22,i+1);D.txt(g,a,76,y-10,{w:800,n:18,al:'left',c:dk?D.LIGHT:D.INK});D.txt(g,b,76,y+14,{w:700,n:15,al:'left',c:dk?D.LIGHT:D.INK})});return}
 PAINT[k]();A.fx.draw(g)}
function down(p){const k=at();
 if(k==='tally'){const s=Z.t;if(s.pick!=null){const cell=CELLS.find(q=>inR(p,q));if(cell){const i=s.pick;s.pick=null;drop(i,cell.i);return false}}const ch=CHIPS.find(q=>inR(p,q));if(ch){drag={i:ch.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='mode'){const cell=CELLS.find(q=>inR(p,q));if(cell)pickMode(cell.i,cell.c);return false}
 if(k==='median'){const ch=CHIPS.find(q=>inR(p,q));if(ch)pickPlace(ch.i);return false}
 if(k==='mean'){const t=TILES.find(q=>inR(p,q));if(t){divide(t.i);return false}const cell=CELLS.find(q=>inR(p,q));if(cell)workRow(cell.i);return false}
 if(k==='bars'){const b=BARS.find(q=>p.y>=q.y-6&&p.y<=q.y+q.h+6&&p.x>=q.x-10);if(b){drag={bar:b.i};setF(b.i,(p.x-b.x)/b.w*12);return true}}return false}
function move(p){if(!drag)return;if(drag.bar!=null){const b=BARS[drag.bar];setF(drag.bar,(p.x-b.x)/b.w*12);return}drag.x=p.x;drag.y=p.y;A.redraw()}
function up(p){if(!drag)return;const h=drag;drag=null;if(h.bar!=null)return;const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10,cell=CELLS.find(q=>inR(p,q));
 if(cell&&!tap)return drop(h.i,cell.i);if(tap){Z.t.pick=h.i;return say(`Card: ${D.RAW[h.i]} goals. Now tap its row in the table.`,false)}A.redraw()}
function clear(){run++;drag=null;for(const k in Z)delete Z[k];Object.assign(Z,{t:{put:{},k:0,bad:-1,pick:null},m:{r:0,bad:null},d:{r:0,bad:-1,cur:1},n:{rows:{},k:0,bad:-1,done:0},b:{f:D.GOALS.f.slice(),won:0},msg:null,bad:false,chk:()=>{}})}
function open(i,met){clear();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);Z.chk=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};btns();A.redraw()}
function auto(i,list){steps[i].go();const t=run;let w=0;list.forEach(([ms,f])=>{w+=ms;setTimeout(()=>{if(t===run)f()},w)})}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=at(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='tally'){const i=D.RAW.findIndex((_,j)=>!Z.t.put[j]);if(i>=0)D.RAW_X.forEach((x,r)=>add(`Next card (${D.RAW[i]}) \u2192 row ${x}`,()=>drop(i,r),`Put the next card, ${D.RAW[i]} goals, in the ${x} goals row`))}
 if(k==='mode'&&Z.m.r<D.MODE_T.length){const T=D.MODE_T[Z.m.r];T.x.forEach((x,i)=>add(`Mode = ${x}`,()=>pickMode(i,0),`The mode is ${x} ${T.unit}`));add(`Mode = ${Math.max(...T.f)}`,()=>pickMode(T.f.indexOf(Math.max(...T.f)),1),`The mode is the biggest frequency, ${Math.max(...T.f)}`)}
 if(k==='median'&&Z.d.r<D.MED_T.length){const L=D.sorted(D.MED_T[Z.d.r]),s=Z.d;const mv=d=>()=>{s.cur=Math.max(1,Math.min(L.length,s.cur+d));say(`Place ${s.cur} of ${L.length}: ${L[s.cur-1]}.`,false)};
  add('\u25C0 5',mv(-5),'Back 5 places');add('\u25C0 1',mv(-1),'Back 1 place');add('1 \u25B6',mv(1),'Forward 1 place');add('5 \u25B6',mv(5),'Forward 5 places');add(`Choose place ${s.cur}`,()=>pickPlace(s.cur),`Choose place ${s.cur}, value ${L[s.cur-1]}`)}
 if(k==='mean'&&!Z.n.done){if(Z.n.k<5)D.GOALS.x.forEach((x,i)=>{if(!Z.n.rows[i])add(`Row ${x}: f \u00d7 x`,()=>workRow(i),`Work out f times x for the ${x} goals row`)});else D.DIV.forEach((O,j)=>add(`46 ${O[0]}`,()=>divide(j),`Divide 46 ${O[0]}`))}
 if(k==='bars')[0,1,2,3,4].forEach(i=>{add(`${i}: \u2212`,()=>setF(i,Z.b.f[i]-1),`One fewer match with ${i} goals`);add(`${i}: +`,()=>setF(i,Z.b.f[i]+1),`One more match with ${i} goals`)})}
const steps=[
{h:'What a row means',p:D.TXT[0],predict:{q:'A row says: 2 goals, frequency 3. That means...',opts:['3 goals were scored','3 matches each had 2 goals'],ans:1},task:'Put all 10 results in the table',
 show:()=>auto(0,D.RAW.map((v,i)=>[300,()=>drop(i,D.RAW_X.indexOf(v))])),go:()=>open(0,()=>Z.t.k>=D.RAW.length)},
{h:'The mode',p:D.TXT[1],predict:{q:'The biggest frequency is 10, in the row for 1 goal. The mode is...',opts:['10','1 goal'],ans:1},task:'Tap the mode in 2 tables',
 show:()=>auto(1,D.MODE_T.map(T=>[800,()=>pickMode(T.f.indexOf(Math.max(...T.f)),0)])),go:()=>open(1,()=>Z.m.r>=D.MODE_T.length)},
{h:'The median',p:D.TXT[2],predict:{q:'Goals 0 to 4, 30 matches. The median is...',opts:['The middle row: 2 goals','The 15th and 16th values in order'],ans:1},task:'Find the middle place in 2 tables',
 show:()=>auto(2,D.MED_T.map(T=>[900,()=>{const m=D.n(T);pickPlace(m%2?(m+1)/2:m/2)}])),go:()=>open(2,()=>Z.d.r>=D.MED_T.length)},
{h:'The mean',p:D.TXT[3],predict:{q:'Total goals 46. To find the mean, divide by...',opts:['the number of rows, 5','the number of matches, 30'],ans:1},task:'Fill f \u00d7 x, then divide',
 show:()=>auto(3,[...D.GOALS.x.map((_,i)=>[450,()=>workRow(i)]),[700,()=>divide(1)]]),go:()=>open(3,()=>!!Z.n.done)},
{h:'Move the data',p:D.TXT[4],task:'Make the mode 3 and the mean above 2',
 show:()=>auto(4,[2,3,4,9,5].map((v,i)=>[500,()=>setF(i,v)])),go:()=>open(4,()=>!!Z.b.won)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.chk()});
function slip(tag){let m='Mode: the value with the biggest frequency. Median: the middle value in order. Mean: total of f \u00d7 x \u00f7 total frequency.';
 switch(tag){case 'modef':m='That is a frequency (how many times), or just the biggest value. The mode is the value whose frequency is biggest.';break;
  case 'rows':m='Divide by the total frequency (how many values), not by the number of rows in the table.';break;
  case 'midrow':m='The middle row is not the middle value. Rows hold different numbers of values; count to place (n + 1) \u00f7 2.';break;
  case 'medpos':m='Half of n is the middle PLACE, not the median. Count along to that place and read the value there.';break;
  case 'range':m='That mean is possible: it lies between the smallest and largest score. A mean outside that range must be wrong.';break;
  case 'fx':m='Each match in the row scored that many goals, so multiply: frequency \u00d7 goals.';break}
 return m}
function quiz(){qk++;const Q=D.QS[qk%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qk*2)%3,ord2=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 ord2.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},cq.querySelector('.fl-pick'),v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.74,tall:1.6,draw,onStep:X=>{cq.hidden=X.step!==5;ctl.hidden=X.step===5;btns()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Frequency table lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);clear();
  A.gest({down,move,up});btns()}}).start()})})();
