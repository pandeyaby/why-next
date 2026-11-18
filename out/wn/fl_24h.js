/* Flagship: 12-hour and 24-hour time (ages 8–9; NC England Y4 "read, write and convert time between analogue and digital
   12- and 24-hour clocks"). Drag a marker along a day, write pm times in 24-hour form, match cards, sort the midnight and
   midday hours, and read a timetable. Drag or tap on the canvas, or use the buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#fff7ed',edge:'#1e293b',sel:'#1d4ed8',
 day:'#fde68a',night:'#1e3a8a',nightTx:'#f8fafc',face:'#ffffff',hand:'#0f172a',min:'#b91c1c',lcd:'#0f172a',lcdTx:'#bbf7d0'};
const D=C24ART,p2=n=>String(n).padStart(2,'0');
const t24=m=>p2(Math.floor(m/60)%24)+':'+p2(m%60);
const t12=m=>{const h=Math.floor(m/60)%24,hh=h%12===0?12:h%12;return hh+':'+p2(m%60)+(h<12?' am':' pm')};
const p12=s=>{const [hm,ap]=s.split(' '),[h,mm]=hm.split(':').map(Number);return(h%12+(ap==='pm'?12:0))*60+mm};
const part=m=>{const h=Math.floor(m/60)%24;return h===0&&m%60===0?'midnight':h===12&&m%60===0?'midday':h<12?'morning (am)':h<18?'afternoon (pm)':'evening (pm)'};
VIS.reg('flag24h',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.15));
const txt=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function wrapT(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function rr(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function boxText(s,x,y,w,h,n,col){const L=wrapT(s,w-10,n),lh=z(n)+3;L.forEach((r,i)=>txt(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
function topLine(s,won){const L=wrapT(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(32),L.length*lh+12);rr(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function status(){if(!G.msg)return;const L=wrapT((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 rr(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- analogue clock with a sun or moon, and a digital readout ---- */
function clock(cx,cy,R,m){X.fillStyle=K.face;X.strokeStyle=K.edge;X.lineWidth=3;X.beginPath();X.arc(cx,cy,R,0,7);X.fill();X.stroke();
 for(let k=1;k<=12;k++){const a=k*Math.PI/6;txt(k,cx+Math.sin(a)*R*.78,cy-Math.cos(a)*R*.78,R>60?12:10,K.ink,'center',800)}
 const mm=m%60,hh=(m/60)%12,ha=hh*Math.PI/6,ma=mm*Math.PI/30;X.lineCap='round';
 X.strokeStyle=K.hand;X.lineWidth=5;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.sin(ha)*R*.5,cy-Math.cos(ha)*R*.5);X.stroke();
 X.strokeStyle=K.min;X.lineWidth=3;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.sin(ma)*R*.75,cy-Math.cos(ma)*R*.75);X.stroke();
 const h24=Math.floor(m/60)%24,sun=h24>=6&&h24<18;X.fillStyle=sun?'#f59e0b':'#475569';X.beginPath();X.arc(cx+R*.82,cy-R*.82,R*.16,0,7);X.fill();
 if(!sun){X.fillStyle=K.face;X.beginPath();X.arc(cx+R*.88,cy-R*.88,R*.13,0,7);X.fill()}}
function lcd(x,y,w,h,s,n){rr(x,y,w,h,K.lcd,null,0,8);txt(s,x+w/2,y+h/2+1,n||22,K.lcdTx,'center',800)}
/* ---- the day strip, 00:00 to 24:00 ---- */
function strip(y,m){const x0=24,x1=A.W-24,h=z(26),w=x1-x0;G.bar={x:x0,y:y-z(14),w,h:h+z(28),x0,x1};
 for(let k=0;k<24;k++){const n=k<6||k>=18;X.fillStyle=n?K.night:K.day;X.fillRect(x0+w*k/24,y,w/24+.5,h)}X.strokeStyle=K.edge;X.lineWidth=2;X.strokeRect(x0,y,w,h);
 (A.narrow?[0,6,12,18,24]:[0,3,6,9,12,15,18,21,24]).forEach(k=>{const x=x0+w*k/24;X.fillStyle=K.edge;X.fillRect(x-1,y+h,2,z(6));txt(p2(k)+':00',x,y+h+z(14),10,K.ink,'center',700)});
 txt('am',x0+w*.25,y-z(9),11,K.dim,'center',800);txt('pm',x0+w*.75,y-z(9),11,K.dim,'center',800);
 if(m!=null){const x=x0+w*m/1440;X.fillStyle=K.sel;X.beginPath();X.moveTo(x,y-2);X.lineTo(x-z(9),y-z(13));X.lineTo(x+z(9),y-z(13));X.closePath();X.fill();
  X.strokeStyle=K.sel;X.lineWidth=4;X.beginPath();X.moveTo(x,y);X.lineTo(x,y+h);X.stroke();X.fillStyle='#ffffff';X.strokeStyle=K.sel;X.lineWidth=3;X.beginPath();X.arc(x,y+h/2,z(11),0,7);X.fill();X.stroke()}}
/* ---- step 0: find times on the day ---- */
function setTime(m){if(G.won)return;G.now=Math.max(0,Math.min(1439,m));const want=D.FIND[G.fi];
 if(G.now===want){A.sound.pop();G.bad=false;G.msg=`${t12(want)} is ${t24(want)}: ${part(want)}.`;G.fi++;if(G.fi===D.FIND.length){G.won=true;G.msg='Morning hours keep their number. From midday on, the 24-hour clock keeps counting: 13, 14, 15 … 23.'}}sync()}
/* ---- step 1: write pm times in 24-hour form ---- */
function bump(d){if(G.won)return;G.hr=(G.hr+d+24)%24;A.sound.tick();G.msg='';sync()}
function check(){if(G.won)return;const [m,tip]=D.SET[G.si],h=Math.floor(m/60),h12=h%12===0?12:h%12;
 if(G.hr!==h){const why=G.hr===h12&&h>=12?`${p2(G.hr)}:${p2(m%60)} would be in the morning. ${tip}`:G.hr===h12+10?'You added 10. Add 12 to pm hours.':h<12&&G.hr===h+12?'That is the evening. Morning (am) hours keep their number.':tip;return miss(why)}
 A.sound.pop();G.bad=false;G.msg=`${t12(m)} = ${t24(m)}.`+(h>=12?` ${h12} + 12 = ${h}.`:' Morning: same hour.');G.si++;
 if(G.si===D.SET.length){G.won=true;G.msg='pm hours add 12 (4 pm → 16). am hours stay the same, written with two digits (9 am → 09).'}else G.hr=Math.floor(D.SET[G.si][0]/60)%12===0?12:Math.floor(D.SET[G.si][0]/60)%12;sync()}
/* ---- step 2: match 24-hour cards to 12-hour cards ---- */
function rightCards(){const R=D.PAIRS.map(m=>[t12(m),m]).concat(D.DECOY);return[R[0],R[4],R[1],R[2],R[5],R[3]]}
function match(i,j){if(G.won||G.paired[i]!=null)return;G.pick=null;const m=D.PAIRS[i],R=rightCards()[j];
 if(R[0]!==t12(m)){const h=Math.floor(m/60);return miss(R[1]===m&&R[0][0]===String(h)[1]?`Do not just drop the 1. ${h} − 12 = ${h-12}, so ${t24(m)} is ${t12(m)}.`:`${R[0]} is ${t24(p12(R[0]))} in 24-hour time. ${t24(m)}: ${h>=12?h+' − 12 = '+(h-12)+', pm':'morning, so am'}.`)}
 G.paired[i]=j;A.sound.pop();G.bad=false;G.msg=`${t24(m)} = ${t12(m)}.`;if(Object.keys(G.paired).length===D.PAIRS.length){G.won=true;G.msg='Hours 13 to 23: take away 12 and write pm. Hours 01 to 11: am, same number.'}sync()}
/* ---- step 3: midnight and midday ---- */
function sortMid(i,b){if(G.won||G.mid[i]!=null)return;G.pick=null;const m=D.MIDS[i],want=m<720?0:1;
 if(b!==want)return miss(want?`${t24(m)} is ${m%60} minutes after midday, so it is ${t12(m)}.`:`${t24(m)} starts with 00: that is the midnight hour. It is ${t12(m)}.`);
 G.mid[i]=b;A.sound.pop();G.bad=false;G.msg=`${t24(m)} = ${t12(m)}.`;if(Object.keys(G.mid).length===D.MIDS.length){G.won=true;G.msg='00:xx is just after midnight (12 am). 12:xx is just after midday (12 pm).'}sync()}
/* ---- step 4: timetable ---- */
function pickTrain(r){if(G.won)return;const T=D.TRAINS[G.ti],row=T.rows[r],m=row[T.col];
 if(r!==T.ans){const late=G.ti===0?(m>1050?`${t24(m)} is ${t12(m)}: too late.`:`${t24(m)} is ${t12(m)}: in time, but a later train still makes it.`):(m<1140?`${t24(m)} is ${t12(m)}, before 7 pm. 7 pm is 19:00.`:`${t24(m)} is ${t12(m)}. An earlier train leaves after 7 pm.`);return miss(late)}
 A.sound.pop();G.bad=false;G.msg=G.ti===0?`Arrives ${t24(m)} = ${t12(m)}, before 5:30 pm (17:30).`:`Leaves ${t24(m)} = ${t12(m)}, the first after 19:00.`;G.ti++;
 if(G.ti===D.TRAINS.length){G.won=true;G.msg='Timetables use the 24-hour clock so there is no am or pm mix-up.'}sync()}
/* ---- drawing ---- */
const kind=()=>['day','set','pair','mid','train','quiz'][A.step];
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind(),H={day:['Drag the marker along the day. Find '+(G.won?'':t12(D.FIND[Math.min(G.fi,3)]))+'.','The 24-hour clock counts all the way to 23.'],set:['Write '+(G.won?'':t12(D.SET[Math.min(G.si,2)][0]))+' in 24-hour time. Use ▲ ▼ or +12, then Check.','pm: add 12.'],
  pair:['Drag each 24-hour card to its 12-hour time. Or tap one, then the other.','All matched.'],mid:['Sort each time: just after midnight or just after midday?','00 means midnight. 12 means midday.'],
  train:[(D.TRAINS[Math.min(G.ti,1)]||{}).q,'You can read a 24-hour timetable.'],quiz:['Afternoon: add 12. Back to 12-hour: take away 12.','']};
 const t=topLine(k==='quiz'?H.quiz[0]:H[k][G.won?1:0],G.won),bot=A.H-(G.msg?z(56):z(12));
 if(k==='day'||k==='quiz'){const m=k==='quiz'?1170:G.now,R=Math.min(z(70),(bot-t)*.24),cy=t+z(12)+R;clock(A.W*.28,cy,R,m);
  lcd(A.W*.55,cy-R*.75,A.W*.4,z(40),t24(m),24);txt('24-hour',A.W*.75,cy-R*.75-z(9),10,K.dim);rr(A.W*.55,cy+R*.1,A.W*.4,z(40),K.card,K.edge,2,8);txt(t12(m),A.W*.75,cy+R*.1+z(20),18,K.ink,'center',800);
  txt(part(m),A.W*.75,cy+R*.1+z(52),11,K.dim);strip(cy+R+z(40),m)}
 if(k==='set'){const m=D.SET[Math.min(G.si,2)][0],R=Math.min(z(62),(bot-t)*.22),cy=t+z(10)+R;clock(A.W*.3,cy,R,m);rr(A.W*.56,cy-z(22),A.W*.38,z(44),K.card,K.edge,2,8);txt(t12(m),A.W*.75,cy,18,K.ink,'center',800);
  const y=cy+R+z(16),bw=Math.min(z(84),A.W*.3),bh=z(54),x=A.W/2-bw-z(4);G.up={x,y,w:bw,h:z(44)};G.dn={x,y:y+z(44)+bh+z(8),w:bw,h:z(44)};
  rr(x,y,bw,z(44),'#dbeafe',K.sel,2,8);txt('▲',x+bw/2,y+z(22),18,K.sel);lcd(x,y+z(48),bw*2+z(8),bh,(G.won?'✓':p2(G.hr))+':'+p2(m%60),28);rr(x,G.dn.y,bw,z(44),'#dbeafe',K.sel,2,8);txt('▼',x+bw/2,G.dn.y+z(22),18,K.sel);
  G.ck={x:x+bw+z(8),y:G.dn.y,w:bw,h:z(44)};G.p12={x:x+bw+z(8),y,w:bw,h:z(44)};rr(x+bw+z(8),y,bw,z(44),'#dbeafe',K.sel,2,8);txt('+12',x+bw*1.5+z(8),y+z(22),16,K.sel,'center',800);rr(G.ck.x,G.ck.y,bw,z(44),K.okBg,K.ok,2,8);txt('Check',G.ck.x+bw/2,G.ck.y+z(22),14,K.ok,'center',800);txt('hours',x+bw/2,y-z(8),10,K.dim)}
 if(k==='pair'){const R=rightCards(),gap=z(6),lw=A.W*.4,rw=A.W*.44,ch=Math.min(z(44),(bot-t-z(12)-gap*5)/6);G.L=[];G.R=[];
  R.forEach((r,j)=>{const y=t+z(10)+j*(ch+gap),used=Object.values(G.paired).includes(j);G.R.push({x:A.W-14-rw,y,w:rw,h:ch,i:j});rr(A.W-14-rw,y,rw,ch,used?K.okBg:K.card,used?K.ok:K.edge,used?3:2);txt(r[0],A.W-14-rw/2,y+ch/2,15,used?K.ok:K.ink,'center',800)});
  D.PAIRS.forEach((m,i)=>{if(G.paired[i]!=null)return;const y=t+z(10)+i*(ch*1.5+gap),d=G.drag&&G.drag.i===i,on=G.pick===i,px=d?G.drag.x-lw/2:14,py=d?G.drag.y-ch/2:y;G.L.push({x:14,y,w:lw,h:ch,i});lcd(px,py,lw,ch,t24(m),18);if(on){X.strokeStyle=K.sel;X.lineWidth=3;A.paint.rrect(px,py,lw,ch,8);X.stroke()}})}
 if(k==='mid'){const gap=z(8),w=(A.W-28-gap)/2,ch=z(44);G.C=[];let n=0;D.MIDS.forEach((m,i)=>{if(G.mid[i]!=null)return;const x=14+(n%2)*(w+gap),y=t+z(10)+Math.floor(n/2)*(ch+gap);n++;const d=G.drag&&G.drag.i===i,on=G.pick===i,px=d?G.drag.x-w/2:x,py=d?G.drag.y-ch/2:y;
   G.C.push({x,y,w,h:ch,i});lcd(px,py,w,ch,t24(m),20);if(on){X.strokeStyle=K.sel;X.lineWidth=3;A.paint.rrect(px,py,w,ch,8);X.stroke()}});
  const by=t+z(10)+2*(ch+gap)+z(6),bh=bot-by-z(6);G.B=[['Just after midnight','am',K.night,K.nightTx],['Just after midday','pm',K.day,K.ink]].map((b,j)=>{const x=14+j*(w+gap);rr(x,by,w,bh,b[2],K.edge,2,10);boxText(b[0]+' ('+b[1]+')',x,by+z(4),w,z(40),13,b[3]);
   D.MIDS.forEach((m,i)=>{if(G.mid[i]===j){const q=D.MIDS.filter((_,s)=>G.mid[s]===j&&s<i).length;rr(x+8,by+z(48)+q*z(30),w-16,z(26),K.okBg,K.ok,2,8);txt(t24(m)+' = '+t12(m),x+w/2,by+z(61)+q*z(30),12,K.ok)}});return{x,y:by,w,h:bh,i:j}})}
 if(k==='train'){const T=D.TRAINS[Math.min(G.ti,1)],y0=t+z(12),rh=z(46),cw=(A.W-28)/3;txt('Train',14+cw/2,y0+z(10),12,K.dim,'center',800);txt('Leaves',14+cw*1.5,y0+z(10),12,K.dim,'center',800);txt('Arrives',14+cw*2.5,y0+z(10),12,K.dim,'center',800);
  G.rows=T.rows.map((r,i)=>{const y=y0+z(22)+i*(rh+z(6));rr(14,y,A.W-28,rh,G.won&&i===T.ans?K.okBg:K.card,K.edge,2,8);txt(String.fromCharCode(65+i),14+cw/2,y+rh/2,16,K.ink,'center',800);
   r.forEach((m,j)=>{const hi=j===T.col;txt(t24(m),14+cw*(1.5+j),y+rh/2,hi?18:16,hi?K.sel:K.ink,'center',hi?900:700)});return{x:14,y,w:A.W-28,h:rh,i}})}
 status();A.fx.draw(X)}
let start=null;
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>inside(p,r));start=p;
 if(k==='day'&&inside(p,G.bar)){G.drag={bar:1};move(p);return true}
 if(k==='set'){if(inside(p,G.up)){bump(1);return true}if(inside(p,G.dn)){bump(-1);return true}if(inside(p,G.ck)){check();return true}if(inside(p,G.p12)){bump(12);return true}}
 if(k==='pair'){const l=hit(G.L);if(l){G.pick=l.i;G.drag={i:l.i,x:p.x,y:p.y};A.sound.tick();A.redraw();return true}const r=hit(G.R);if(r&&G.pick!=null){match(G.pick,r.i);return true}}
 if(k==='mid'){const c0=hit(G.C);if(c0){G.pick=c0.i;G.drag={i:c0.i,x:p.x,y:p.y};A.sound.tick();A.redraw();return true}const b=hit(G.B);if(b&&G.pick!=null){sortMid(G.pick,b.i);return true}}
 if(k==='train'){const r=hit(G.rows);if(r){pickTrain(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;if(G.drag.bar){const b=G.bar,h=Math.round((p.x-b.x0)/(b.x1-b.x0)*24);if(G.won){A.redraw();return}const m=Math.max(0,Math.min(23,h))*60;if(m!==G.now){G.now=m;A.sound.tick();if(m===D.FIND[G.fi])setTime(m);else{G.msg='';sync()}}return}G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag,k=kind(),tap=start&&Math.hypot(p.x-start.x,p.y-start.y)<10;G.drag=null;if(!d||d.bar)return A.redraw();
 if(k==='pair'){const r=(G.R||[]).find(q=>inside(p,q));if(r&&!tap)match(d.i,r.i);else A.redraw();return}
 if(k==='mid'){const b=(G.B||[]).find(q=>inside(p,q));if(b&&!tap)sortMid(d.i,b.i);else A.redraw()}}
function sync(){const k=kind();let d='Challenge. The clock shows 19:30, which is 7:30 pm.';
 if(k==='day')d=`Day marker at ${t24(G.now)}, ${t12(G.now)}, ${part(G.now)}.`+(G.won?'':` Find ${t12(D.FIND[G.fi])}.`);
 if(k==='set')d=G.won?'All three written.':`Write ${t12(D.SET[G.si][0])}. Hours now show ${p2(G.hr)}.`;
 if(k==='pair')d='Cards left: '+(D.PAIRS.filter((_,i)=>G.paired[i]==null).map(t24).join(', ')||'none')+(G.pick!=null?'. Picked '+t24(D.PAIRS[G.pick]):'')+'.';
 if(k==='mid')d='Times left: '+(D.MIDS.filter((_,i)=>G.mid[i]==null).map(t24).join(', ')||'none')+'.';
 if(k==='train'&&!G.won){const T=D.TRAINS[G.ti];d=T.q+' '+T.rows.map((r,i)=>`Train ${String.fromCharCode(65+i)} leaves ${t24(r[0])}, arrives ${t24(r[1])}`).join('; ')+'.'}
 speak((G.msg?G.msg+' ':'')+d);btns();G.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(k==='day'&&!G.won){b('Earlier by 1 hour',()=>setTime(G.now-60));b('Later by 1 hour',()=>setTime(G.now+60))}
 if(k==='set'&&!G.won){b('Hour up ▲',()=>bump(1));b('Hour down ▼',()=>bump(-1));b('Add 12 hours',()=>bump(12));b('Check',check)}
 if(k==='pair'&&!G.won){if(G.pick==null)D.PAIRS.forEach((m,i)=>{if(G.paired[i]==null)b('Pick '+t24(m),()=>{G.pick=i})});else{rightCards().forEach((r,j)=>{if(!Object.values(G.paired).includes(j))b(`${t24(D.PAIRS[G.pick])} = ${r[0]}`,()=>match(G.pick,j))});b('Pick another card',()=>{G.pick=null})}}
 if(k==='mid'&&!G.won)D.MIDS.forEach((m,i)=>{if(G.mid[i]==null){b(t24(m)+': after midnight',()=>sortMid(i,0));b(t24(m)+': after midday',()=>sortMid(i,1))}});
 if(k==='train'&&!G.won)D.TRAINS[G.ti].rows.forEach((r,i)=>b(`Train ${String.fromCharCode(65+i)}`,()=>pickTrain(i)));
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,now:0,fi:0,hr:4,si:0,paired:{},mid:{},ti:0,pick:null,drag:null})}
const steps=[
{h:'One whole day',p:'A clock face only shows 12 hours, so 3 o’clock happens twice a day. The 24-hour clock gives every hour of the day its own number, from 00 to 23.',
predict:{q:'A sign says the shop opens at 15:00. When is that?',opts:['There is no such time','3 o’clock in the afternoon','5 o’clock in the morning'],ans:1},
task:'Find all 4 times on the day strip',show:()=>{steps[0].go();play(D.FIND.map(m=>()=>setTime(m)),450)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Every hour has its own number.')}},
{h:'Afternoon: add 12',p:'Times after midday are pm. In 24-hour time the hours keep counting past 12, so you add 12 to a pm hour. Morning (am) hours stay the same.',
predict:{q:'What is 4:20 pm in 24-hour time?',opts:['04:20','14:20','16:20'],ans:2},
task:'Write all 3 times in 24-hour form',show:()=>{steps[1].go();const f=[];D.SET.forEach(([m])=>{f.push(()=>{G.hr=Math.floor(m/60)});f.push(check)});play(f,350)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'pm: add 12.')}},
{h:'Back to 12-hour time',p:'To go from 24-hour time back to 12-hour time, take 12 away from any hour from 13 to 23, and write pm.',
predict:{q:'What is 19:30 in 12-hour time?',opts:['9:30 pm','7:30 pm','7:30 am'],ans:1},
task:'Match all 4 cards',show:()=>{steps[2].go();const R=rightCards();play(D.PAIRS.map((m,i)=>()=>match(i,R.findIndex(r=>r[0]===t12(m)))),400)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Take away 12 for pm.')}},
{h:'Midnight and midday',p:'Midnight is 00:00, the start of a new day. Midday is 12:00. The hour after midnight is written 00 in 24-hour time but 12 am on a 12-hour clock.',
predict:{q:'What is 00:15?',opts:['15 minutes after midday','15 minutes after midnight','Not a real time'],ans:1},
task:'Sort all 4 times',show:()=>{steps[3].go();play(D.MIDS.map((m,i)=>()=>sortMid(i,m<720?0:1)),400)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'00 is midnight, 12 is midday.')}},
{h:'Read a timetable',p:'Train and bus timetables use the 24-hour clock. Turn a 12-hour time into 24-hour time first, then compare.',
task:'Answer both timetable questions',show:()=>{steps[4].go();play(D.TRAINS.map(T=>()=>pickTrain(T.ans)),500)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'17:20 and 19:10.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=D.bank[qi%D.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=D.WHYM[tag]||'pm hours add 12; am hours stay the same.';
 if(tag==='drop1')m='Do not just drop the first digit. Take away 12 from hours 13 to 23: 19 − 12 = 7, 20 − 12 = 8.';
 if(tag==='ampm')m='Hours 00 to 11 are am (before midday). Hours 12 to 23 are pm (after midday).';
 if(tag==='midday')m='00 is the midnight hour, so 00:20 is 20 minutes after midnight: 12:20 am.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'24-hour time lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
