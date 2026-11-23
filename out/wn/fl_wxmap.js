/* Flagship – reading weather maps (ages 9–11; KS2 working scientifically, NGSS 3-ESS2-1): symbols, temperatures,
   wind arrows, a rainfall chart and predicting moving rain. Data and symbols: wxmap_art.js. */
(()=>{const W=WXMAP;
VIS.reg('flagwxmap',c=>{let A,x2,tray,qa,qi=-1,run=0;const K={};
const RIGHT='#047857',WRONG='#b91c1c',LINE='#64748b',UI='px system-ui,sans-serif';
const part=()=>['sym','temp','wind','graph','move','chal'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.1);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const night=()=>A.col.dark,txt=()=>night()?'#f1f5f9':'#0f172a';
const degC=t=>(t<0?'−'+(-t):t)+' °C';
function rows(t,max,font){x2.font=font;const o=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(cur&&x2.measureText(tr).width>max){o.push(cur);cur=w}else cur=tr});if(cur)o.push(cur);return o}
function head(t,state){const font=`700 ${fs(15)}${UI}`,ls=rows(t,A.W-34,font),lh=fs(15)*1.3,h=ls.length*lh+16;
 x2.fillStyle=state==='ok'?(night()?'#14532d':'#dcfce7'):state==='no'?(night()?'#7f1d1d':'#fee2e2'):(night()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);x2.fill();
 x2.lineWidth=state?2.5:1.2;x2.strokeStyle=state==='ok'?RIGHT:state==='no'?WRONG:LINE;x2.stroke();x2.font=font;x2.fillStyle=txt();x2.textAlign='left';x2.textBaseline='top';ls.forEach((r,i)=>x2.fillText(r,17,16+i*lh));
 let y=8+h+6;if(K.msg){const f2=`700 ${fs(13)}${UI}`,l2=rows(K.msg,A.W-36,f2).slice(0,3);x2.font=f2;x2.fillStyle=K.msgBad?(night()?'#fca5a5':WRONG):(night()?'#86efac':RIGHT);l2.forEach((r,i)=>x2.fillText(r,18,y+i*fs(13)*1.3));y+=l2.length*fs(13)*1.3+6}return y}
function pill(r,t,st){st=st||{};x2.fillStyle=st.no?'#fee2e2':st.ok?'#dcfce7':st.on?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);x2.fill();x2.lineWidth=st.no||st.ok||st.on?3:1.4;x2.strokeStyle=st.no?WRONG:st.ok?RIGHT:st.on?'#1d4ed8':LINE;x2.stroke();
 let n=fs(st.n||15);x2.font=`800 ${n}${UI}`;while(x2.measureText(t).width>r.w-8&&n>9){n--;x2.font=`800 ${n}${UI}`}x2.fillStyle='#0f172a';x2.textAlign='center';x2.textBaseline='middle';x2.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
const chipAt=(i,n,rowsN)=>{rowsN=rowsN||1;const per=Math.ceil(n/rowsN),w=Math.min(140,(A.W-16-6*(per-1))/per),h=Math.min(42,A.H*.09),r=Math.floor(i/per),k=i%per;return{x:(A.W-(per*w+6*(per-1)))/2+k*(w+6),y:A.H-(rowsN-r)*(h+6)-2,w,h}};
/* symbols */
const symbol=(s,x,y,r)=>W.sym(x2,A.paint,s,x,y,r);
/* the island */
const COAST=[[.5,.03],[.8,.1],[.97,.4],[.93,.72],[.68,.98],[.32,.98],[.06,.72],[.02,.36],[.2,.09]];
let MAP={x:0,y:0,w:1,h:1};
const tp=T=>({x:MAP.x+T.x*MAP.w,y:MAP.y+T.y*MAP.h});
const rad=()=>Math.max(13,Math.min(28,Math.min(MAP.w,MAP.h)*.08));
function island(top,bottom){MAP={x:10,y:top,w:A.W-20,h:Math.max(120,A.H-top-bottom)};x2.fillStyle=night()?'#0c4a6e':'#bae6fd';A.paint.rrect(MAP.x,MAP.y,MAP.w,MAP.h,12);x2.fill();
 const P=COAST.map(([a,b])=>[MAP.x+MAP.w*(.04+a*.92),MAP.y+MAP.h*(.03+b*.94)]);x2.beginPath();P.forEach((q,i)=>{const n=P[(i+1)%P.length],mx=(q[0]+n[0])/2,my=(q[1]+n[1])/2;i?x2.quadraticCurveTo(q[0],q[1],mx,my):x2.moveTo(mx,my)});
 const q=P[0],n=P[1];x2.quadraticCurveTo(q[0],q[1],(q[0]+n[0])/2,(q[1]+n[1])/2);x2.closePath();x2.fillStyle=night()?'#14532d':'#bbf7d0';x2.fill();x2.strokeStyle=night()?'#86efac':'#15803d';x2.lineWidth=2;x2.stroke()}
function townName(T,i,r,st,up){const p=tp(T);A.paint.label(T.n,p.x,up?p.y-r*1.15-8:p.y+r*1.15+8,{font:`800 ${fs(11)}${UI}`,bg:st==='ok'?'#065f46':st==='no'?'#991b1b':'#1f2937',col:'#ffffff'})}
const tempTag=(x,y,t)=>W.temp(x2,x,y,t,Math.max(15,rad()*.72),fs(12));
function windTag(x,y,d,v,hi){const r=Math.max(14,rad()*.68),a=(d-90)*Math.PI/180,L=r*1.9,ex=x+Math.cos(a)*(r+L),ey=y+Math.sin(a)*(r+L);x2.strokeStyle=night()?'#f1f5f9':'#0f172a';x2.lineWidth=3.5;x2.beginPath();x2.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);x2.lineTo(ex,ey);x2.stroke();
 x2.fillStyle=x2.strokeStyle;x2.beginPath();x2.moveTo(ex+Math.cos(a)*8,ey+Math.sin(a)*8);x2.lineTo(ex+Math.cos(a+2.4)*12,ey+Math.sin(a+2.4)*12);x2.lineTo(ex+Math.cos(a-2.4)*12,ey+Math.sin(a-2.4)*12);x2.closePath();x2.fill();
 x2.fillStyle=hi?'#7c3aed':'#ffffff';x2.beginPath();x2.arc(x,y,r,0,7);x2.fill();x2.strokeStyle='#0f172a';x2.lineWidth=2;x2.stroke();x2.font=`800 ${fs(12)}${UI}`;x2.fillStyle=hi?'#ffffff':'#0f172a';x2.textAlign='center';x2.textBaseline='middle';x2.fillText(String(v),x,y+1)}
function townAt(p){const r=rad();let best=-1,bd=1e9;W.TOWNS.forEach((T,i)=>{const q=tp(T),d=Math.hypot(p.x-q.x,p.y-q.y);if(d<bd){bd=d;best=i}});return bd<r*2.1?best:-1}
/* 1. symbols */
function pickSym(i){const s=K.y,Q=W.SYMQ[s.k];if(!Q)return;if(i!==Q.a){s.bad=i;A.sound.miss();return say(`${W.TOWNS[i].n}: ${Q.why[i]}`)}
 s.k++;s.bad=null;s.got.push(i);A.sound.pop();say(`Yes: ${W.TOWNS[i].n} shows ${W.SYMNAME[W.TOWNS[i].s]}.`+(s.k<W.SYMQ.length?' Next question.':''))}
/* 2. temperatures */
function pickTemp(i){const s=K.t;if(s.got.includes(i))return;const want=W.COLD[s.got.length],T=W.TOWNS[i],U=W.TOWNS[want];
 if(i!==want){s.bad=i;A.sound.miss();return say(T.s==='sun'&&U.t<0?`${T.n} is sunny but ${degC(T.t)}. ${degC(U.t)} is below zero, so it is colder.`:T.t<0?`${degC(T.t)} is the coldest of all, but you have found it already.`:`${T.n} is ${degC(T.t)}. A town with a lower number is left: find the smallest.`)}
 s.got.push(i);s.bad=null;A.sound.pop();say(`${T.n}: ${degC(T.t)}.`+(s.got.length<5?' Next coldest?':' All in order.'))}
/* 3. wind */
const cap=w=>w[0].toUpperCase()+w.slice(1);
function pickName(j){const s=K.w,Q=W.WINDQ[s.k];if(!Q||Q.ask!=='name')return;const T=W.TOWNS[Q.town],to=W.COMPASS[T.w[0]],from=W.FROM[T.w[0]];
 if(W.NAMES[j]!==cap(from)+' wind'){s.bad=j;A.sound.miss();return say(W.NAMES[j]===cap(to)+' wind'?`The arrow at ${T.n} points ${to}, so the wind is going ${to}. A wind is named from where it comes from: the ${from}.`:`Look at the tail of the arrow at ${T.n}: that is where the wind comes from.`)}
 s.k++;s.bad=null;A.sound.pop();say(`Yes: at ${T.n} the wind blows from the ${from}, so it is a ${from} wind.`+(s.k<W.WINDQ.length?' Next one.':''))}
function pickWindTown(i){const s=K.w,Q=W.WINDQ[s.k];if(!Q||Q.ask!=='strong')return;const T=W.TOWNS[i];
 if(i!==Q.a){s.bad='t'+i;A.sound.miss();return say(`${T.n} has ${T.w[1]} mph. Find the biggest number: that is the strongest wind.`)}
 s.k++;s.bad=null;A.sound.pop();say(`Yes: ${T.n} has ${T.w[1]} mph, the strongest wind on the map.`)}
/* 4. rainfall graph */
let CH={x:0,y:0,w:1,h:1,bw:1};
function chart(top,bottom,hl){const max=120;CH={x:40,y:top+8,w:A.W-52,h:Math.max(90,A.H-top-bottom-34)};CH.bw=CH.w/12;
 x2.strokeStyle=txt();x2.lineWidth=1.5;x2.beginPath();x2.moveTo(CH.x,CH.y);x2.lineTo(CH.x,CH.y+CH.h);x2.lineTo(CH.x+CH.w,CH.y+CH.h);x2.stroke();
 x2.font=`600 ${fs(10)}${UI}`;x2.fillStyle=txt();x2.textAlign='right';x2.textBaseline='middle';[0,40,80,120].forEach(v=>{const y=CH.y+CH.h-v/max*CH.h;x2.fillText(String(v),CH.x-4,y);x2.strokeStyle=night()?'#334155':'#e2e8f0';x2.lineWidth=1;x2.beginPath();x2.moveTo(CH.x+1,y);x2.lineTo(CH.x+CH.w,y);x2.stroke()});
 x2.save();x2.translate(10,CH.y+CH.h/2);x2.rotate(-Math.PI/2);x2.textAlign='center';x2.fillText('rain (mm)',0,0);x2.restore();
 W.RAIN.forEach((v,i)=>{const h=v/max*CH.h,x=CH.x+i*CH.bw+CH.bw*.15,st=hl[i];x2.fillStyle=st==='no'?'#dc2626':st==='ok'?'#059669':st==='on'?'#7c3aed':(night()?'#60a5fa':'#2563eb');x2.fillRect(x,CH.y+CH.h-h,CH.bw*.7,h);
  x2.font=`700 ${fs(A.narrow?9:11)}${UI}`;x2.fillStyle=txt();x2.textAlign='center';x2.textBaseline='top';x2.fillText(A.narrow?W.MONTHS[i][0]:W.MONTHS[i],x+CH.bw*.35,CH.y+CH.h+4);if(st)x2.fillText(String(v),x+CH.bw*.35,CH.y+CH.h-h-14)})}
function pickMonth(i){const s=K.r,Q=W.GRAPHQ[s.k];if(!Q||Q.k==='season')return;const v=W.RAIN[i],M=W.MONTHS[i],want=Q.k==='wet'?W.RAIN.indexOf(Math.max(...W.RAIN)):W.RAIN.indexOf(Math.min(...W.RAIN));
 if(i!==want){s.bad=i;A.sound.miss();return say(Q.k==='dry'&&v===Math.max(...W.RAIN)?`${M} has the tallest bar, so it is the wettest month. The driest month has the shortest bar.`:`${M} has ${v} mm. Look for the ${Q.k==='wet'?'tallest':'shortest'} bar.`)}
 s.mark[i]='ok';s.k++;s.bad=null;A.sound.pop();say(`Yes: ${M}, ${v} mm, the ${Q.k==='wet'?'wettest':'driest'} month.`+(s.k<3?' Next question.':''))}
function pickSeason(j){const s=K.r,Q=W.GRAPHQ[s.k];if(!Q||Q.k!=='season')return;const [n,ms]=W.SEASONS[j],sum=ms.reduce((a,i)=>a+W.RAIN[i],0);
 if(n!=='Summer'){s.bad='s'+j;s.sea=j;A.sound.miss();return say(`${n}: ${ms.map(i=>W.RAIN[i]).join(' + ')} = ${sum} mm. Is there a season with less?`)}
 s.k++;s.bad=null;s.sea=j;A.sound.pop();say(`Yes: summer is ${ms.map(i=>W.RAIN[i]).join(' + ')} = ${sum} mm, the least rain.`)}
/* 5. moving rain */
let SQ={x:0,y:0,w:1,h:1};
const sqX=k=>SQ.x+(k-.5)*SQ.w/8,sqOf=x=>Math.max(1,Math.min(8,Math.round((x-SQ.x)/(SQ.w/8)+.5)));
function strip(top,bottom){SQ={x:12,y:top+30,w:A.W-24,h:Math.min(110,A.H-top-bottom-60)};const cw=SQ.w/8;
 for(let k=1;k<=8;k++){x2.fillStyle=night()?(k%2?'#14532d':'#166534'):(k%2?'#bbf7d0':'#a7f3d0');x2.fillRect(SQ.x+(k-1)*cw,SQ.y,cw,SQ.h);x2.font=`800 ${fs(12)}${UI}`;x2.fillStyle=txt();x2.textAlign='center';x2.textBaseline='top';x2.fillText(String(k),sqX(k),SQ.y+SQ.h+4)}
 x2.strokeStyle=night()?'#86efac':'#15803d';x2.lineWidth=2;x2.strokeRect(SQ.x,SQ.y,SQ.w,SQ.h);
 [[1,'West Port'],[8,'East Cove']].forEach(([k,n])=>A.paint.label(n,sqX(k),SQ.y+SQ.h+30,{font:`800 ${fs(11)}${UI}`,bg:'#1f2937',col:'#ffffff'}));
 x2.font=`700 ${fs(11)}${UI}`;x2.fillStyle=txt();x2.textAlign='center';x2.fillText('west ←      → east',A.W/2,SQ.y-22)}
function rainAt(k,lab,ghost,low){const r=Math.min(SQ.w/16,24),x=typeof k==='number'?k:sqX(1),y=SQ.y+SQ.h*.42;x2.globalAlpha=ghost?.55:1;symbol('rain',x,y,r);x2.globalAlpha=1;if(lab)A.paint.label(lab,x,low?SQ.y+SQ.h-12:SQ.y+10,{font:`800 ${fs(11)}${UI}`,bg:ghost?'#475569':'#7c3aed',col:'#ffffff'})}
function tryBand(k){const s=K.m,Q=W.BAND.ask[s.k];if(!Q)return;s.at=k;
 if(k===Q.c){s.placed.push([k,Q.t]);s.k++;s.bad=null;s.at=Q.c;A.sound.pop();return say(`Yes: square ${k} at ${Q.t}.`+(s.k<2?' Now 3 hours later?':' The rain reaches East Cove at 6 pm.'))}
 s.bad=true;A.sound.miss();const last=s.placed.length?s.placed[s.placed.length-1][0]:4;
 say(k===last?`That is where the rain already is. Weather moves on: 2 squares every 3 hours.`:k===last+1?`That is only 1 square on. From 9 am to 12 noon it moved 2 squares, so in 3 hours it moves 2.`:k<last?'The rain is moving east, to the right. It does not go back.':`Too far. 3 hours is 2 squares on from square ${last}.`)}
function stepRain(d){const s=K.m;if(!W.BAND.ask[s.k])return;s.at=Math.max(1,Math.min(8,s.at+d));s.bad=null;A.sound.tick();say(`The rain is over square ${s.at}.`)}
/* draw */
function draw(){const m=part();x2.fillStyle=night()?'#0f172a':'#f8fafc';x2.fillRect(0,0,A.W,A.H);
 if(m==='chal'){const t=head('Challenge: read the map, the numbers and the chart.','ok');island(t,8);W.TOWNS.forEach((T,i)=>{const p=tp(T);symbol(T.s,p.x,p.y,rad());townName(T,i,rad())});return A.fx.draw(x2)}
 if(m==='sym'){const s=K.y,Q=W.SYMQ[s.k],t=head(Q?`Question ${s.k+1} of 4. ${Q.q}`:W.DONE[0],Q?(s.bad!=null?'no':''):'ok');island(t,8);
  W.TOWNS.forEach((T,i)=>{const p=tp(T);symbol(T.s,p.x,p.y,rad());townName(T,i,rad(),s.bad===i?'no':Q&&s.got.includes(i)?'ok':'')})}
 if(m==='temp'){const s=K.t,fin=s.got.length===5,t=head(fin?W.DONE[1]:`Tap the towns from coldest to warmest. ${s.got.length} of 5 done.`,fin?'ok':s.bad!=null?'no':'');island(t,8);const r=rad();
  W.TOWNS.forEach((T,i)=>{const p=tp(T);symbol(T.s,p.x-r*.75,p.y-r*.2,r*.7);tempTag(p.x+r*.6,p.y,T.t);const k=s.got.indexOf(i);townName(T,i,r,s.bad===i?'no':k>=0?'ok':'');
   if(k>=0)A.paint.label(String(k+1),p.x-r*1.3,p.y+r*.7,{font:`800 ${fs(11)}${UI}`,bg:'#7c3aed',col:'#ffffff'})})}
 if(m==='wind'){const s=K.w,Q=W.WINDQ[s.k],nameQ=Q&&Q.ask==='name';const t=head(!Q?W.DONE[2]:nameQ?`${s.k+1} of 4. What is the wind at ${W.TOWNS[Q.town].n} called?`:'4 of 4. Tap the town with the strongest wind.',Q?(s.bad!=null?'no':''):'ok');
  const bot=nameQ?Math.min(42,A.H*.09)*2+16:8;island(t,bot);W.TOWNS.forEach((T,i)=>{const p=tp(T);windTag(p.x,p.y,T.w[0],T.w[1],nameQ&&Q.town===i);townName(T,i,rad(),s.bad==='t'+i?'no':'',T.w[0]===180)});
  if(nameQ)W.NAMES.forEach((n,j)=>pill(chipAt(j,4,2),n,{no:s.bad===j}))}
 if(m==='graph'){const s=K.r,Q=W.GRAPHQ[s.k],t=head(Q?`Rainfall in Brin. ${Q.q}`:W.DONE[3],Q?(s.bad!=null?'no':''):'ok');const sea=Q&&Q.k==='season',bot=sea?Math.min(42,A.H*.09)+12:8;
  const hl=Object.assign({},s.mark);if(typeof s.bad==='number')hl[s.bad]='no';if(s.sea!=null)W.SEASONS[s.sea][1].forEach(i=>{if(!hl[i])hl[i]=!Q?'ok':'on'});chart(t,bot,hl);
  if(sea)W.SEASONS.forEach(([n],j)=>pill(chipAt(j,4),n,{no:s.bad==='s'+j}))}
 if(m==='move'){const s=K.m,Q=W.BAND.ask[s.k],t=head(Q?`The rain moves east at a steady speed. Where will it be at ${Q.t}?`:W.DONE[4],Q?(s.bad?'no':''):'ok');strip(t,8);
  W.BAND.seen.forEach(([k,l])=>rainAt(sqX(k),l,true));s.placed.forEach(([k,l])=>rainAt(sqX(k),l,true));if(Q)rainAt(s.drag?s.drag.x:sqX(s.at),Q.t+'?',false,1)}
 A.fx.draw(x2)}
/* pointer */
function down(p){const m=part();
 if(m==='sym'){const i=townAt(p);if(i>=0)pickSym(i);return false}
 if(m==='temp'){const i=townAt(p);if(i>=0)pickTemp(i);return false}
 if(m==='wind'){const Q=W.WINDQ[K.w.k];if(!Q)return false;if(Q.ask==='name'){const j=[0,1,2,3].find(j=>inside(p,chipAt(j,4,2)));if(j!=null)pickName(j)}else{const i=townAt(p);if(i>=0)pickWindTown(i)}return false}
 if(m==='graph'){const Q=W.GRAPHQ[K.r.k];if(!Q)return false;if(Q.k==='season'){const j=[0,1,2,3].find(j=>inside(p,chipAt(j,4)));if(j!=null)pickSeason(j)}else if(p.x>CH.x&&p.x<CH.x+CH.w&&p.y>CH.y-20&&p.y<CH.y+CH.h+24)pickMonth(Math.min(11,Math.floor((p.x-CH.x)/CH.bw)));return false}
 if(m==='move'){const s=K.m;if(!W.BAND.ask[s.k])return false;if(Math.abs(p.x-sqX(s.at))<SQ.w/14+12&&p.y>SQ.y-10&&p.y<SQ.y+SQ.h+10){s.drag={x:p.x,x0:p.x};A.redraw();return true}
  if(p.y>SQ.y&&p.y<SQ.y+SQ.h){s.at=sqOf(p.x);s.bad=null;A.sound.tick();say(`The rain is over square ${s.at}. Press "Put the rain here" or drag it.`)}return false}
 return false}
function move(p){const s=K.m;if(part()==='move'&&s.drag){s.drag.x=Math.max(SQ.x,Math.min(SQ.x+SQ.w,p.x));A.redraw()}}
function up(p){const s=K.m;if(part()!=='move'||!s.drag)return;const d=s.drag;s.drag=null;if(Math.abs(p.x-d.x0)<6){say('Drag the rain along the strip, or use the buttons.');return}tryBand(sqOf(d.x))}
/* state */
function blank(){run++;for(const k in K)delete K[k];Object.assign(K,{y:{k:0,bad:null,got:[]},t:{got:[],bad:null},w:{k:0,bad:null},r:{k:0,bad:null,mark:{},sea:null},m:{k:0,at:4,bad:null,drag:null,placed:[]},msg:null,check:()=>{}})}
function say(t){const st={sym:K.y,temp:K.t,wind:K.w,graph:K.r,move:K.m}[part()];K.msg=t;K.msgBad=!!st&&st.bad!=null&&st.bad!==false;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();K.check()}
const close=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){blank();say(W.DESC[i]);K.msg=null;A.redraw();K.check=close(i,ok,W.DONE[i])}
function auto(i,acts){steps[i].go();const e=run;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function keys(){if(!tray)return;tray.innerHTML='';const m=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(m==='sym'&&W.SYMQ[K.y.k])W.TOWNS.forEach((T,i)=>add(T.n,()=>pickSym(i)));
 if(m==='temp')W.TOWNS.forEach((T,i)=>{if(!K.t.got.includes(i))add(`${T.n} ${degC(T.t)}`,()=>pickTemp(i))});
 if(m==='wind'){const Q=W.WINDQ[K.w.k];if(Q&&Q.ask==='name')W.NAMES.forEach((n,j)=>add(n,()=>pickName(j)));if(Q&&Q.ask==='strong')W.TOWNS.forEach((T,i)=>add(`${T.n} ${T.w[1]} mph`,()=>pickWindTown(i)))}
 if(m==='graph'){const Q=W.GRAPHQ[K.r.k];if(Q&&Q.k!=='season')W.MONTHS.forEach((M,i)=>add(M,()=>pickMonth(i),`${M}: ${W.RAIN[i]} mm`));if(Q&&Q.k==='season')W.SEASONS.forEach(([n],j)=>add(n,()=>pickSeason(j)))}
 if(m==='move'&&W.BAND.ask[K.m.k]){add('◀ West',()=>stepRain(-1),'Move the rain 1 square west');add('East ▶',()=>stepRain(1),'Move the rain 1 square east');add(`Put the rain here (square ${K.m.at})`,()=>tryBand(K.m.at))}}
const windPlan=()=>W.WINDQ.map(Q=>[350,()=>Q.ask==='name'?pickName(W.NAMES.indexOf(cap(W.FROM[W.TOWNS[Q.town].w[0]])+' wind')):pickWindTown(Q.a)]);
const steps=[
{h:'Weather symbols',p:W.TXT[0],predict:{q:'A grey cloud with nothing under it means…',opts:['Rain is coming','Cloudy, but dry'],ans:1},task:'Answer all 4 map questions',
 show:()=>auto(0,W.SYMQ.map(Q=>[350,()=>pickSym(Q.a)])),go:()=>open(0,()=>K.y.k>=W.SYMQ.length)},
{h:'Temperatures',p:W.TXT[1],predict:{q:'Is the sunniest town always the warmest?',opts:['Yes: sun means warm','No: read the number to know'],ans:1},task:'Put the 5 towns in order',
 show:()=>auto(1,W.COLD.map(i=>[300,()=>pickTemp(i)])),go:()=>open(1,()=>K.t.got.length===5)},
{h:'Wind arrows',p:W.TXT[2],predict:{q:'A wind arrow points east. Where is the wind coming from?',opts:['From the east','From the west'],ans:1},task:'Answer all 4 wind questions',
 show:()=>auto(2,windPlan()),go:()=>open(2,()=>K.w.k>=W.WINDQ.length)},
{h:'Rainfall chart',p:W.TXT[3],task:'Answer all 3 chart questions',show:()=>auto(3,[[350,()=>pickMonth(10)],[350,()=>pickMonth(6)],[350,()=>pickSeason(2)]]),go:()=>open(3,()=>K.r.k>=3)},
{h:'What comes next?',p:W.TXT[4],task:'Place the rain at 3 pm and 6 pm',show:()=>auto(4,W.BAND.ask.map(Q=>[400,()=>tryBand(Q.c)])),go:()=>open(4,()=>K.m.k>=2)},
{h:'Challenge',p:'',go:()=>{blank();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.check()});
function slip(t){let m='Read each part of the map: the symbol, the number and the arrow.';
 if(t==='cloud')m='A cloud on its own means cloudy and dry. Rain has drops under the cloud, and snow has flakes.';
 if(t==='sun')m='Sunshine does not mean warm. The temperature number tells you how warm it is: 11 °C is warmer than 2 °C.';
 if(t==='from')m='A wind is named from where it comes from. This one comes from the north, so it is a north wind.';
 if(t==='dir')m='Follow the arrow: it starts in the north and points south. Name the wind from the start.';
 if(t==='speed')m='The number is the speed. The bigger number, 24 mph, is the stronger wind, whatever the arrow length.';
 if(t==='neg')m='Below zero is colder than zero. −2 °C is 2 degrees below zero, so it is the coldest.';
 if(t==='tall')m='Each bar shows how much rain fell. The shortest bar is the month with the least rain.';
 if(t==='move')m='The rain keeps moving at the same speed: 1 square each hour. From 10 am to 1 pm is 3 hours, so 3 squares.';
 return m}
function pose(){qi++;const Q=W.QS[qi%W.QS.length],all=[[Q.a,'ok'],...Q.o],k=qi%3,shown=all.slice(k).concat(all.slice(0,k));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qa.querySelector('.fl-pick');shown.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:X=>{qa.hidden=X.step!==5;tray.hidden=X.step===5;keys()},
 init:X=>{A=X;x2=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Weather map lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);blank();A.gest({down,move,up});keys()}}).start()})})();
