/* Flagship – converting measurement units (ages 8–9; NC England Y4/Y5 measurement: convert km↔m, m↔cm, cm↔mm, kg↔g,
   l↔ml, hours↔minutes, weeks↔days, years↔months). Fill a kilometre with 100 m road pieces, run a conversion machine
   big→small (multiply) and small→big (divide), place half-kilometres on a double number line, and sort time conversions
   by their non-ten factor. Every canvas action has a button too. */
(()=>{
 const UP=[[3,'km','m',1000],[4,'m','cm',100],[2,'kg','g',1000],[6,'cm','mm',10]];      // big unit -> small unit: multiply
 const DOWN=[[5000,'m','km',1000],[700,'cm','m',100],[3000,'ml','l',1000],[80,'mm','cm',10]]; // small unit -> big unit: divide
 const OPS=[['×',10],['×',100],['×',1000],['÷',10],['÷',100],['÷',1000]];
 const SPOT=[[2500,'2.5 km'],[500,'half a kilometre'],[3500,'3½ km'],[1750,'1 km 750 m']];  // targets on the 0–4 km line, in metres
 const TCARDS=[['2 hours','minutes',0,120],['3 weeks','days',1,21],['2 years','months',2,24],['4 minutes','seconds',0,240],['5 weeks','days',1,35]];
 const TBINS=['× 60','× 7','× 12','× 100'];
 const fmtN=n=>String(n);
 VIS.reg('flagconv',c=>{let A,pad,chal;c.fig.classList.add('young');
 const S={then:()=>{}};
 const stage=()=>['road','up','down','line','time','chal'][A.step];
 const INK='#1e293b',SOFT='#475569',LINE='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',SUN='#fef3c7',PICK='#dcfce7',ROAD='#334155',VIO='#6d28d9',LAV='#ede9fe';
 const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
 function say(g,s,x,y,n,col,al){g.font=`700 ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function wrapT(g,s,max,n){g.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function head(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};tile(g,r,SUN,'#b45309',2);const L=wrapT(g,s,r.w-16,14);L.forEach((l,i)=>say(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*fz(18),14,col))}
 function note(g){if(!S.msg)return;const L=wrapT(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=fz(13)+5,h=L.length*lh+10,y=A.H-h-6;tile(g,{x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>say(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const oops=s=>{S.bad=true;S.msg=s;A.sound.miss();live(s);A.redraw()};
 const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 // ---- 1. road: ten 100 m pieces make 1 km
 const roadR=()=>({x:16,y:A.H*.36,w:A.W-32,h:fz(40)});
 function drawRoad(g){const m=S.road*100;head(g,S.roadOk?'1 km = 1000 m':'Fill the road to make exactly 1 kilometre.',S.roadOk?OK:INK);
 const R=roadR();tile(g,R,'#e2e8f0',LINE,2);const w=R.w/10;
 for(let k=0;k<S.road;k++){g.fillStyle=k%2?'#475569':ROAD;g.fillRect(R.x+k*w+1,R.y+2,w-2,R.h-4);say(g,'100 m',R.x+k*w+w/2,R.y+R.h/2,A.narrow?8:10,'#ffffff')}
 for(let k=0;k<=10;k++){g.strokeStyle=LINE;g.lineWidth=1;g.beginPath();g.moveTo(R.x+k*w,R.y+R.h);g.lineTo(R.x+k*w,R.y+R.h+8);g.stroke()}
 say(g,'0 m',R.x,R.y+R.h+fz(20),11,SOFT,'left');say(g,'1 km',R.x+R.w,R.y+R.h+fz(20),11,SOFT,'right');
 say(g,`${fmtN(m)} m`,A.W/2,A.H*.56,22,S.roadOk?OK:INK);
 if(S.roadOk){say(g,'1 m = 100 cm   1 cm = 10 mm',A.W/2,A.H*.56+fz(28),12,SOFT);say(g,'1 kg = 1000 g   1 l = 1000 ml',A.W/2,A.H*.56+fz(46),12,SOFT)}}
 function addPiece(){if(S.roadOk)return;if(S.road>=10)return oops('The road is full: 10 pieces of 100 m. Press "That makes 1 km".');S.road++;S.msg='';A.sound.tick();refresh()}
 function claimKm(){if(S.roadOk)return;const m=S.road*100;
 if(m<1000)return oops(m===100?'Only 100 m. A kilometre is not 100 m: it takes ten pieces of 100 m.':`Only ${m} m. 1 km is 1000 m, so ${10-S.road} more piece${10-S.road>1?'s':''}.`);
 S.roadOk=true;good('Ten pieces of 100 m: 1 km = 1000 m. "Kilo" means a thousand, just like 1 kg = 1000 g.');refresh()}
 // ---- 2 and 3. conversion machine: pick an operation card
 const opR=i=>{const cols=3,gap=8,w=(A.W-20-(cols-1)*gap)/cols,h=fz(36);return{x:10+(i%cols)*(w+gap),y:A.H*.5+Math.floor(i/cols)*(h+gap),w,h}};
 function drawMachine(g,list){const q=list[S.qi];
 if(!q){head(g,list===UP?'Big unit to small unit: multiply.':'Small unit to big unit: divide.',OK);S.log.forEach((l,i)=>say(g,l,A.W/2,A.H*.3+i*fz(24),14,OK));return}
 head(g,`Change ${fmtN(q[0])} ${q[1]} into ${q[2]}.`);
 const box={x:A.W*.12,y:A.H*.22,w:A.W*.76,h:fz(44)};tile(g,box,LAV,VIO,3);
 say(g,`${fmtN(q[0])} ${q[1]}  →  ? ${q[2]}`,A.W/2,box.y+box.h/2,17);
 say(g,`1 ${list===UP?q[1]:q[2]} = ${fmtN(q[3])} ${list===UP?q[2]:q[1]}`,A.W/2,box.y+box.h+fz(16),12,SOFT);
 OPS.forEach(([o,f],i)=>{const r=opR(i);tile(g,r,CARD,LINE,2);say(g,`${o} ${fmtN(f)}`,r.x+r.w/2,r.y+r.h/2,15)})}
 function useOp(i){const list=stage()==='up'?UP:DOWN,q=list[S.qi];if(!q)return;const [o,f]=OPS[i],[n,a,b,k]=q,mul=list===UP;
 if(o===(mul?'×':'÷')&&f===k){const ans=mul?n*k:n/k;good(`${fmtN(n)} ${a} ${o} ${fmtN(k)} = ${fmtN(ans)} ${b}.`);S.log.push(`${fmtN(n)} ${a} = ${fmtN(ans)} ${b}`);S.qi++;return refresh()}
 const res=o==='×'?n*f:n/f;
 if(o!==(mul?'×':'÷'))return oops(mul?`${fmtN(n)} ${a} ÷ ${fmtN(f)} gives a tiny number. ${b} is a smaller unit, so you need MORE of them: multiply.`:`${fmtN(n)} ${a} × ${fmtN(f)} = ${fmtN(res)}: far too many. ${b} is a bigger unit, so you need FEWER of them: divide.`);
 oops(`1 ${mul?a:b} is ${fmtN(k)} ${mul?b:a}, not ${fmtN(f)}. Use ${mul?'×':'÷'} ${fmtN(k)}.`)}
 // ---- 4. double number line 0–4 km with metres underneath, snapping to 250 m
 const lineR=()=>({x:28,y:A.H*.46,w:A.W-56});
 const mAt=x=>{const L=lineR();return Math.max(0,Math.min(4000,Math.round((x-L.x)/L.w*16)*250))};
 function drawLine(g){const q=SPOT[S.li];head(g,q?`Tap where ${q[1]} is. How many metres is that?`:'Half a kilometre is 500 m, so 3½ km = 3500 m.',q?INK:OK);
 const L=lineR(),X=m=>L.x+m/4000*L.w;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(L.x,L.y);g.lineTo(L.x+L.w,L.y);g.stroke();
 for(let m=0;m<=4000;m+=250){const big=m%1000===0,half=m%500===0;g.strokeStyle=big?INK:LINE;g.lineWidth=big?3:1.5;g.beginPath();g.moveTo(X(m),L.y-(big?14:half?10:6));g.lineTo(X(m),L.y+(big?14:half?10:6));g.stroke();
  if(big)say(g,`${m/1000} km`,X(m),L.y-fz(26),12);if(half&&(!A.narrow||big))say(g,`${fmtN(m)} m`,X(m),L.y+fz(28),A.narrow?9:11,SOFT)}
 if(A.narrow)say(g,'Each small mark is 250 m.',A.W/2,L.y+fz(52),11,SOFT);
 S.pins.forEach((m,i)=>{g.fillStyle=OK;g.beginPath();g.arc(X(m),L.y,fz(8),0,7);g.fill();if(i===S.pins.length-1)say(g,`${fmtN(m)} m`,X(m),L.y-fz(46),12,OK)});
 if(S.pins.length)say(g,'Pinned: '+S.pins.map(m=>fmtN(m)+' m').join(' · '),A.W/2,L.y+fz(A.narrow?72:52),11,OK);
 if(SPOT[S.li]){const x=X(S.cur);g.fillStyle=VIO;g.beginPath();g.moveTo(x,L.y+fz(12));g.lineTo(x-fz(8),L.y+fz(26));g.lineTo(x+fz(8),L.y+fz(26));g.closePath();g.fill()}
 if(S.miss!=null){g.strokeStyle=NO;g.lineWidth=3;g.beginPath();g.arc(X(S.miss),L.y,fz(9),0,7);g.stroke()}}
 function pin(m){const q=SPOT[S.li];if(!q)return;
 if(m===q[0]){S.miss=null;S.pins.push(m);good(q[0]===2500?'2.5 km is 2 km and half a km: 2000 + 500 = 2500 m.':q[0]===500?'Half of 1000 m is 500 m.':q[0]===3500?'3½ km = 3000 + 500 = 3500 m, not 3005 m.':'1 km 750 m = 1000 + 750 = 1750 m.');S.li++;return refresh()}
 S.miss=m;const kmw=(m/1000).toString();
 if(q[0]===2500&&m===2000)return oops('That is 2 km. The .5 is half of another kilometre: 500 m more.');
 if(q[0]===3500&&m<3500&&m>=3000)return oops(`That is ${fmtN(m)} m. Half a kilometre is 500 m, not 5 m, so 3½ km is 3000 + 500.`);
 if(q[0]===500&&m===250)return oops('250 m is a quarter of a kilometre. Half of 1000 m is 500 m.');
 oops(`That point is ${fmtN(m)} m, which is ${kmw} km. Find ${q[1]}: count whole kilometres first, then the part.`)}
 // ---- 5. time: sort each conversion by its factor
 const tbinR=i=>{const n=4,gap=6,w=(A.W-20-(n-1)*gap)/n;return{x:10+i*(w+gap),y:A.H*.44,w,h:fz(40)}};
 const tcardR=()=>({x:A.W/2-A.W*.26,y:A.H*.2,w:A.W*.52,h:fz(44)});
 function drawTime(g){const t=TCARDS[S.ti];head(g,t?`${t[0]} into ${t[1]}: which multiplier?`:'Time is not in tens: 60 seconds, 60 minutes, 7 days, 12 months.',t?INK:OK);
 TBINS.forEach((b,i)=>{const r=tbinR(i);tile(g,r,S.drag&&hit(S.drag,r)?PICK:CARD,LINE,2.5);say(g,b,r.x+r.w/2,r.y+r.h/2,14);
});
 S.tdone.forEach((k,j)=>{const T=TCARDS[k],y0=tbinR(0).y+tbinR(0).h+fz(16);say(g,`${T[0]} = ${T[3]} ${T[1]}`,10+(j%2+.5)*(A.W-20)/2,y0+Math.floor(j/2)*fz(17),11,OK)});
 if(t){const h=tcardR(),r=S.drag?{...h,x:S.drag.x-h.w/2,y:S.drag.y-h.h/2}:h;tile(g,r,LAV,VIO,3);say(g,`${t[0]} → ${t[1]}`,r.x+r.w/2,r.y+r.h/2,14)}}
 function sortT(b){const t=TCARDS[S.ti];if(!t)return;const [what,into,want,ans]=t;
 if(b===want){good(`${what} = ${what.split(' ')[0]} ${TBINS[want]} = ${ans} ${into}.`);S.tdone.push(S.ti);S.ti++;return refresh()}
 if(b===3)return oops(`Time units are not in hundreds. ${into==='minutes'?'1 hour is 60 minutes':into==='seconds'?'1 minute is 60 seconds':into==='days'?'1 week is 7 days':'1 year is 12 months'}.`);
 oops(`${TBINS[b]} is the wrong link. ${into==='minutes'?'1 hour = 60 minutes':into==='seconds'?'1 minute = 60 seconds':into==='days'?'1 week = 7 days':'1 year = 12 months'}.`)}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=stage();if(v==='road')drawRoad(g);if(v==='up')drawMachine(g,UP);if(v==='down')drawMachine(g,DOWN);if(v==='line')drawLine(g);if(v==='time')drawTime(g);
 if(v==='chal'){head(g,'Big → small: multiply. Small → big: divide.');[['1 km','1000 m'],['1 m','100 cm'],['1 cm','10 mm'],['1 kg','1000 g'],['1 l','1000 ml'],['1 hour','60 min']].forEach(([a,b],i)=>{const r={x:10+(i%2)*(A.W-20)/2+4,y:A.H*.24+Math.floor(i/2)*fz(40),w:(A.W-20)/2-8,h:fz(32)};tile(g,r,CARD,LINE,1.5);say(g,`${a} = ${b}`,r.x+r.w/2,r.y+r.h/2,13)})}
 note(g);A.fx.draw(g)}
 function refresh(){const v=stage();let s='Challenge.';
 if(v==='road')s=`Road: ${S.road*100} metres of 1 kilometre.`;
 if(v==='up'||v==='down'){const q=(v==='up'?UP:DOWN)[S.qi];s=q?`Change ${q[0]} ${q[1]} into ${q[2]}. Pick an operation.`:'All four converted.'}
 if(v==='line')s=SPOT[S.li]?`Find ${SPOT[S.li][1]} on the line from 0 to 4 kilometres.${S.pins.length?' Placed: '+S.pins.join(', ')+' metres.':''}`:'All four points placed.';
 if(v==='time')s=TCARDS[S.ti]?`Card: ${TCARDS[S.ti][0]} into ${TCARDS[S.ti][1]}. Which multiplier?`:'All five time cards sorted.';
 live((S.msg?S.msg+' ':'')+s);controls();S.then()}
 function controls(){if(!pad)return;pad.innerHTML='';const v=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(v==='road'&&!S.roadOk){b('Add 100 m',addPiece,'Add a 100 metre piece of road');b('That makes 1 km',claimKm,'Say the road is now 1 kilometre');b('Clear road',()=>{S.road=0;S.msg='';refresh()})}
 if((v==='up'&&UP[S.qi])||(v==='down'&&DOWN[S.qi]))OPS.forEach(([o,f],i)=>b(`${o} ${fmtN(f)}`,()=>useOp(i),`${o==='×'?'Multiply':'Divide'} by ${f}`));
 if(v==='line'&&SPOT[S.li]){b('◀ 250 m',()=>{S.cur=Math.max(0,S.cur-250);S.msg='';refresh()},'Move the marker back 250 metres');b('250 m ▶',()=>{S.cur=Math.min(4000,S.cur+250);S.msg='';refresh()},'Move the marker on 250 metres');b(`Pin at ${fmtN(S.cur)} m`,()=>pin(S.cur),`Pin the marker at ${S.cur} metres`)}
 if(v==='time'&&TCARDS[S.ti])TBINS.forEach((t,i)=>b(t,()=>sortT(i),`${TCARDS[S.ti][0]} into ${TCARDS[S.ti][1]}: ${t}`));A.redraw()}
 function down(p){const v=stage();
 if(v==='road'){if(hit(p,roadR())){addPiece();return true}return false}
 if(v==='up'||v==='down'){const i=OPS.findIndex((_,i)=>hit(p,opR(i)));if(i>=0){useOp(i);return true}return false}
 if(v==='line'){const L=lineR();if(!SPOT[S.li]||Math.abs(p.y-L.y)>fz(40)||p.x<L.x-12||p.x>L.x+L.w+12)return false;S.cur=mAt(p.x);pin(S.cur);return true}
 if(v==='time'){if(!TCARDS[S.ti])return false;if(hit(p,tcardR())){S.drag={x:p.x,y:p.y};return true}const i=[0,1,2,3].find(i=>hit(p,tbinR(i)));if(i!=null){sortT(i);return true}return false}return false}
 function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){if(!S.drag)return;const i=[0,1,2,3].find(i=>hit(p||S.drag,tbinR(i)));S.drag=null;if(i!=null)sortT(i);else A.redraw()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const auto=(fs,gap)=>{const id=++S.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*(A.reduced()?30:gap)))};
 const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},road:0,roadOk:false,qi:0,log:[],li:0,pins:[],miss:null,cur:0,ti:0,tdone:[],drag:null,msg:'',bad:false})};
 const opIx=(o,f)=>OPS.findIndex(x=>x[0]===o&&x[1]===f);
 const steps=[
 {h:'How long is a kilometre?',p:'Each tap on the road adds a 100 m piece. When you think the road is exactly 1 km long, press "That makes 1 km".',
 predict:{q:'How many metres make 1 kilometre?',opts:['1000','100','10'],ans:0},
 task:'Build 1 km',show:()=>{steps[0].go();auto(Array(10).fill(addPiece).concat([claimKm]),160)},go:()=>{reset();refresh();S.then=finish(0,()=>S.roadOk,'1 km = 1000 m, like 1 kg = 1000 g and 1 l = 1000 ml.')}},
 {h:'Big unit to small unit',p:'Pick the operation that changes each amount into the smaller unit.',
 predict:{q:'3 km into metres: which do you do?',opts:['× 1000','÷ 1000','add three zeros after the point'],ans:0},
 task:'Convert 4 amounts',show:()=>{steps[1].go();auto(UP.map(q=>()=>useOp(opIx('×',q[3]))),450)},go:()=>{reset();refresh();S.then=finish(1,()=>S.qi>=UP.length,'A smaller unit needs more of them, so you multiply.')}},
 {h:'Small unit to big unit',p:'Now go the other way: change each amount into the bigger unit.',
 predict:{q:'700 cm into metres. The number of metres will be…',opts:['smaller than 700','bigger than 700','still 700'],ans:0},
 task:'Convert 4 amounts',show:()=>{steps[2].go();auto(DOWN.map(q=>()=>useOp(opIx('÷',q[3]))),450)},go:()=>{reset();refresh();S.then=finish(2,()=>S.qi>=DOWN.length,'A bigger unit needs fewer of them, so you divide.')}},
 {h:'Halves and decimals',p:'The line shows kilometres on top and metres underneath. Tap the line, or move the marker with the buttons and pin it.',
 predict:{q:'How many metres is 3½ km?',opts:['3500 m','3005 m','350 m'],ans:0},
 task:'Pin 4 distances',show:()=>{steps[3].go();auto(SPOT.map(s=>()=>{S.cur=s[0];pin(s[0])}),450)},go:()=>{reset();refresh();S.then=finish(3,()=>S.li>=SPOT.length,'0.5 km is 500 m, so 2.5 km = 2500 m.')}},
 {h:'Time is not in tens',p:'Drag each card to the multiplier that converts it, or tap a box.',
 predict:{q:'How many minutes are in 2 hours?',opts:['120','200','260'],ans:0},
 task:'Sort 5 time cards',show:()=>{steps[4].go();auto(TCARDS.map(t=>()=>sortT(t[2])),400)},go:()=>{reset();refresh();S.then=finish(4,()=>S.ti>=TCARDS.length,'Hours and minutes go in 60s, weeks in 7s and years in 12s.')}},
 {h:'Challenge',p:'',go:()=>{reset();askNext()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 // challenge: each wrong answer names its slip
 const Q=[['How many metres are in 4 km?','4000 m',[['400 m','hund'],['4 m','same']]],
 ['650 cm in metres?','6.5 m',[['65 m','tenx'],['65,000 m','mulw']]],
 ['2.5 kg in grams?','2500 g',[['2005 g','zero'],['250 g','hund']]],
 ['How many minutes are in 3 hours?','180',[['300','time'],['30','div']]],
 ['How many days are in 6 weeks?','42',[['60','time'],['13','add']]],
 ['3000 ml in litres?','3 l',[['3,000,000 l','mulw'],['30 l','hund']]]];
 function whyNot(tag){let m='Check which unit is bigger, then multiply or divide by the link number.';
 if(tag==='hund')m='Kilo means 1000, so the link is 1000, not 100 (only 1 m = 100 cm uses 100).';
 if(tag==='same')m='Kilometres are bigger units: 4 km is many more metres. Multiply by 1000.';
 if(tag==='tenx')m='1 m is 100 cm, so divide by 100: 650 ÷ 100 = 6.5, not 65.';
 if(tag==='mulw')m='Going to a bigger unit you need fewer of them: divide, do not multiply.';
 if(tag==='zero')m='Half a kilogram is 500 g, not 5 g: 2.5 kg = 2000 + 500 = 2500 g.';
 if(tag==='time')m='Time does not go in hundreds. 1 hour is 60 minutes and 1 week is 7 days.';
 if(tag==='div')m='Minutes are smaller than hours, so there are more of them: multiply by 60.';
 if(tag==='add')m='6 weeks is 6 lots of 7 days: multiply, do not add.';
 return m}
 let qn=-1,streak=0;
 function askNext(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>judge(tag,ans)});live('Challenge: '+q);A.redraw()}
 function judge(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+whyNot(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=askNext}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
