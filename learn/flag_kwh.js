/* Flagship: energy bills and kilowatt-hours (ages 14–16; AQA GCSE Physics 8463 4.2.4 E = Pt, KS3 England "comparing
   amounts of energy transferred (J, kJ, kW hour); domestic fuel bills"). Run appliances for a minute on a joule meter,
   drag a power × time rectangle to make 1 kWh three ways, convert W and minutes, rank daily running costs and turn two
   meter readings into a bill. Every drag or tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',edge:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 volt:'#1d4ed8',voltSoft:'#dbeafe',amber:'#a16207',amberSoft:'#fef3c7',tag:'#7c2d12',bar:'#b45309'};
const E=KWART,B=E.big,M=E.money;
VIS.reg('flagkwh',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const sz=n=>Math.round(n*(A.narrow?1:1.12));
const word=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function brk(s,maxW,n){X.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function slab(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function lead(s,won){const L=brk(s,A.W-40,13),lh=sz(13)+4,h=Math.max(sz(40),L.length*lh+14);slab(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>word(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function tail(){if(!G.msg)return;const L=brk((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=sz(13)+5,h=L.length*lh+10,y=A.H-h-8;
 slab(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>word(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();update()};
const hitOk=s=>{G.bad=false;G.msg=s;A.sound.pop();update()};
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- step 0: run an appliance for 60 s ---- */
function run(i){if(G.won)return;const a=E.RUN[i],J=a.w*60;G.sel=i;G.meter=0;A.tween(G,{meter:J},A.reduced()?1:700,'out');A.sound.tick();
 if(J===60000){G.won=true;return hitOk(`${a.name}: ${B(a.w)} J every second × 60 s = ${B(J)} J. Power is energy per second.`)}
 miss(`${a.name}: ${B(a.w)} W × 60 s = ${B(J)} J. ${J>60000?'Too much: try a lower power.':'Too little: try a higher power.'}`)}
function drawRun(){const t=lead(G.won?'E = P × t: watts are joules per second, so 1000 W for 60 s is 60 000 J.':'Which appliance transfers 60 000 J in one minute? Tap one to run it for 60 seconds.',G.won);
 const gap=10,w=(A.W-28-gap)/2,h=sz(56);G.cards=E.RUN.map((a,i)=>{const x=14+(i%2)*(w+gap),y=t+sz(12)+Math.floor(i/2)*(h+gap),sel=G.sel===i;
  slab(x,y,w,h,sel?K.voltSoft:K.card,sel?K.volt:K.edge,sel?3:2,12);word(a.name,x+w/2,y+h*.36,14,K.ink);word(B(a.w)+' W',x+w/2,y+h*.7,13,K.volt);return{x,y,w,h,i}});
 const my=t+sz(12)+2*(h+gap)+sz(18),a=E.RUN[G.sel];slab(14,my,A.W-28,sz(92),'#0f172a',null,0,14);word('energy meter',A.W/2,my+sz(16),11,'#cbd5e1',null,600);
 word(B(G.meter||0)+' J',A.W/2,my+sz(46),26,'#fde68a');if(a)word(`${B(a.w)} W × 60 s = ${B(a.w*60)} J`,A.W/2,my+sz(76),12,'#e2e8f0',null,600)}
/* ---- step 1: power × time rectangle ---- */
const kwh=()=>G.p10*G.t2/20;
function setPT(p10,t2){G.p10=Math.max(1,Math.min(30,p10));G.t2=Math.max(1,Math.min(20,t2));A.sound.tick();
 if(G.p10*G.t2===20){const key=G.p10+'x'+G.t2;if(!G.ways.has(key)){G.ways.add(key)}if(G.ways.size>=3&&!G.won){G.won=true;return hitOk(`${G.p10/10} kW × ${G.t2/2} h = 1 kWh again. Three different rectangles, the same area: 1 kWh = 3 600 000 J.`)}
  return hitOk(`${G.p10/10} kW × ${G.t2/2} h = 1 kWh. Ways found: ${G.ways.size} of 3.`)}
 G.bad=false;G.msg=`${G.p10/10} kW × ${G.t2/2} h = ${+kwh().toFixed(2)} kWh.`;update()}
function chart(t){const ox=sz(46),oy=A.H-sz(118),w=A.W-ox-sz(20),h=oy-t-sz(46);G.ch={ox,oy,w,h};return{ox,oy,w,h,X:v=>ox+w*v/10,Y:v=>oy-h*v/3}}
function drawArea(){const t=lead(G.won?'kWh = kW × hours. Any power × time that makes 1 sits on the 1 kWh curve.':'Drag the corner (or use the buttons) to make exactly 1 kWh. Find 3 different ways.',G.won);
 const C=chart(t);X.fillStyle=A.alpha(K.amber,.22);X.fillRect(C.ox,C.Y(G.p10/10),C.X(G.t2/2)-C.ox,C.oy-C.Y(G.p10/10));X.strokeStyle=K.amber;X.lineWidth=2.5;X.strokeRect(C.ox,C.Y(G.p10/10),C.X(G.t2/2)-C.ox,C.oy-C.Y(G.p10/10));
 X.setLineDash([6,5]);X.strokeStyle=K.volt;X.lineWidth=2;X.beginPath();for(let tt=1/3;tt<=10;tt+=.05){const y=C.Y(1/tt);tt<.34?X.moveTo(C.X(tt),y):X.lineTo(C.X(tt),y)}X.stroke();X.setLineDash([]);word('1 kWh',C.X(7),C.Y(1/7)-sz(12),11,K.volt);
 X.strokeStyle=K.edge;X.lineWidth=2;X.beginPath();X.moveTo(C.ox,C.oy-C.h);X.lineTo(C.ox,C.oy);X.lineTo(C.ox+C.w,C.oy);X.stroke();
 for(let v=0;v<=10;v+=2)word(v,C.X(v),C.oy+sz(10),10,K.dim,null,600);for(let v=0;v<=3;v++)word(v,C.ox-sz(10),C.Y(v),10,K.dim,null,600);
 word('time (hours)',C.ox+C.w/2,C.oy+sz(26),11,K.dim);word('kW',C.ox-sz(26),C.oy-C.h-sz(4),11,K.dim);
 const hx=C.X(G.t2/2),hy=C.Y(G.p10/10);X.fillStyle=K.volt;X.beginPath();X.arc(hx,hy,sz(11),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=2;X.stroke();G.handle={x:hx,y:hy};
 word(`area = ${G.p10/10} kW × ${G.t2/2} h = ${+kwh().toFixed(2)} kWh = ${B(kwh()*3600000)} J`,A.W/2,t+sz(14),12,K.ink)}
/* ---- steps 2 and 4: tap an answer ---- */
const now=()=>G.list[G.si];
const seq=()=>{const n=now().opts.length,r=(G.si+2)%n;return[...Array(n)].map((_,j)=>(j+r)%n)};
function choose(i){if(G.won)return;const Q=now(),[lab,tag]=Q.opts[i];if(tag!=='ok')return miss(why(tag));G.done.push(lab);
 if(G.si===G.list.length-1){G.won=true;return hitOk(`${lab}. ${G.fin}`)}hitOk(`${lab}. Next.`);G.si++}
function tiles(y){const Q=now(),n=Q.opts.length,gap=8,w=(A.W-28-gap*(n-1))/n,h=sz(40);G.tileHit=seq().map((i,j)=>{const x=14+j*(w+gap);slab(x,y,w,h,K.amberSoft,K.amber,2,12);word(Q.opts[i][0],x+w/2,y+h/2,14,K.tag);return{x,y,w,h,i}})}
function drawUnits(){const Q=now(),t=lead(G.won?'Turn watts into kilowatts (÷ 1000) and minutes into hours (÷ 60) before you multiply.':`A ${Q.p} ${Q.name} is on for ${Q.t}. How many kWh?`,G.won);
 slab(14,t+sz(12),A.W-28,sz(70),K.card,K.edge,2,12);word(Q.name[0].toUpperCase()+Q.name.slice(1),A.W/2,t+sz(30),15,K.ink);word(`power ${Q.p}   ·   time ${Q.t}`,A.W/2,t+sz(58),14,K.volt);
 ['W → kW: divide by 1000','minutes → hours: divide by 60','kWh = kW × hours'].forEach((s,i)=>word(s,A.W/2,t+sz(104)+i*sz(22),12,K.dim,null,600));
 tiles(t+sz(176));if(G.done.length)word('✓ '+G.done.join('   ✓ '),A.W/2,t+sz(232),12,K.ok)}
/* ---- step 3: rank the daily costs ---- */
function rank(i){if(G.won)return;const left=E.COST.map((r,j)=>j).filter(j=>!G.order.includes(j)),top=left.reduce((a,b)=>E.COST[b].kwh>E.COST[a].kwh?b:a),r=E.COST[i];
 if(G.order.includes(i))return miss(`${r.name} is already on the bill.`);
 if(i!==top){const q=E.COST[top];return miss(`${r.name}: ${r.kwh} kWh a day. ${q.name} uses more: ${q.kwh} kWh. Work out kW × hours for each before you pick.`)}
 G.order.push(i);A.sound.tick();if(G.order.length===E.COST.length){G.won=true;return hitOk('Heater £1.50, lights 12p, kettle 7.5p, router 6p: the 20 W lights cost more than the 3 kW kettle.')}
 hitOk(`${r.name}: ${r.kwh} kWh × 25p = ${M(r.kwh*E.PRICE)} a day. Next most expensive?`)}
function drawCost(){const t=lead(G.won?'Cost = kWh × price. A small power left on for a long time can cost more than a big power used briefly.':'Tap the appliances from most to least expensive per day. Price: 25p per kWh (an example).',G.won);
 const h=sz(48),gap=6;G.rows=E.COST.map((r,i)=>{const y=t+sz(12)+i*(h+gap),k=G.order.indexOf(i),done=k>=0;slab(14,y,A.W-28,h,done?K.okBg:K.card,done?K.ok:K.edge,2,12);
  word(r.name,26,y+h*.32,14,K.ink,'left');word(r.use,26,y+h*.7,12,K.volt,'left',600);
  if(done){const bw=(A.W*.38)*Math.min(1,r.kwh*E.PRICE/150);X.fillStyle=K.bar;X.fillRect(A.W-24-A.W*.38,y+h*.62,Math.max(4,bw),sz(8));word(`#${k+1}  ${r.kwh} kWh = ${M(r.kwh*E.PRICE)}`,A.W-24,y+h*.32,12,K.ok,'right')}
  return{x:14,y,w:A.W-28,h,i}})}
/* ---- step 4: meter readings ---- */
function digits(n,y,lab){const s=String(n).padStart(5,'0'),dw=sz(30),x0=A.W/2-2.5*dw+sz(30);word(lab,x0-sz(12),y+sz(18),12,K.dim,'right',600);
 s.split('').forEach((d,i)=>{slab(x0+i*dw+2,y,dw-4,sz(36),'#0f172a',null,0,6);word(d,x0+i*dw+dw/2,y+sz(18),20,'#fde68a')});word('kWh',x0+5*dw+sz(18),y+sz(18),12,K.dim)}
function drawMeter(){const Q=now(),m=E.METER,t=lead(G.won?'Energy used = new reading − old reading. Bill = kWh × price per kWh.':Q.q,G.won);
 digits(m.was,t+sz(16),'last week');digits(m.now,t+sz(62),'today');tiles(t+sz(122));if(G.done.length)word('✓ '+G.done.join('   ✓ '),A.W/2,t+sz(180),13,K.ok)}
/* ---- input, drawing, controls ---- */
const mode=()=>['run','area','units','cost','meter','quiz'][A.step];
function down(p){const m=mode();
 if(m==='run'){const r=(G.cards||[]).find(r=>on(p,r));if(r){run(r.i);return true}}
 if(m==='area'&&G.handle&&Math.hypot(p.x-G.handle.x,p.y-G.handle.y)<sz(36)){G.drag=true;return true}
 if(m==='units'||m==='meter'){const r=(G.tileHit||[]).find(r=>on(p,r));if(r){choose(r.i);update();return true}}
 if(m==='cost'){const r=(G.rows||[]).find(r=>on(p,r));if(r){rank(r.i);update();return true}}
 return false}
function move(p){if(!G.drag||!G.ch)return;const C=G.ch,t=(p.x-C.ox)/C.w*10,v=(C.oy-p.y)/C.h*3;const p10=Math.round(v*10),t2=Math.round(t*2);if(p10!==G.p10||t2!==G.t2)setPT(p10,t2)}
function up(){G.drag=false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='run')drawRun();if(m==='area')drawArea();if(m==='units')drawUnits();if(m==='cost')drawCost();if(m==='meter')drawMeter();
 if(m==='quiz'){lead('E = P × t. Joules: watts × seconds. kWh: kilowatts × hours. Cost = kWh × price.');['1000 W × 60 s = 60 000 J','1 kWh = 1000 W × 3600 s = 3 600 000 J','0.1 kW × 24 h = 2.4 kWh → 60p at 25p'].forEach((r,i)=>word(r,A.W/2,A.H*.4+i*sz(30),14,K.volt))}
 tail();A.fx.draw(X)}
function update(){const m=mode();let d='Challenge.';
 if(m==='run')d=`Appliances: ${E.RUN.map(a=>a.name+' '+a.w+' watts').join(', ')}. Meter: ${G.sel==null?'not run yet':E.RUN[G.sel].name+', '+E.RUN[G.sel].w*60+' joules in 60 seconds'}.`;
 if(m==='area')d=`Power ${G.p10/10} kilowatts for ${G.t2/2} hours makes ${+kwh().toFixed(2)} kilowatt-hours. Ways to make 1 kWh found: ${G.ways.size} of 3.`;
 if(m==='units'){const Q=now();d=`${Q.name}: ${Q.p} for ${Q.t}. Choices: ${Q.opts.map(o=>o[0]).join(', ')}.`}
 if(m==='cost')d=`Daily use: ${E.COST.map(r=>r.name+' '+r.use).join('; ')}. Ranked so far: ${G.order.map(i=>E.COST[i].name).join(', ')||'none'}.`;
 if(m==='meter')d=`Meter last week ${E.METER.was} kWh, today ${E.METER.now} kWh. ${now().q} Choices: ${now().opts.map(o=>o[0]).join(', ')}.`;
 voice((G.msg?G.msg+' ':'')+d);controls();G.after()}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(m==='run'&&!G.won)E.RUN.forEach((a,i)=>b(`${a.name} ${B(a.w)} W`,()=>run(i),`Run the ${a.name} for 60 seconds`));
 if(m==='area'&&!G.won){b('Power +0.1 kW',()=>setPT(G.p10+1,G.t2),'More power');b('Power −0.1 kW',()=>setPT(G.p10-1,G.t2),'Less power');b('Time +½ h',()=>setPT(G.p10,G.t2+1),'Half an hour longer');b('Time −½ h',()=>setPT(G.p10,G.t2-1),'Half an hour shorter')}
 if((m==='units'||m==='meter')&&!G.won)seq().forEach(i=>{const lab=now().opts[i][0];b(lab,()=>{choose(i);update()},`Answer ${lab}`)});
 if(m==='cost'&&!G.won)E.COST.forEach((r,i)=>{if(!G.order.includes(i))b(r.name,()=>{rank(i);update()},`Pick ${r.name}, ${r.use}, as the next most expensive`)});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();update()}},(j+1)*(A.reduced()?30:ms)))};
function fresh(list,fin){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,list:list||[],si:0,done:[],fin:fin||'',sel:null,meter:0,p10:15,t2:4,ways:new Set(),order:[],drag:false})}
const steps=[
{h:'Power is energy per second',p:'A watt is one joule every second. Energy transferred = power × time: E = P × t, with P in watts and t in seconds.',
predict:{q:'A 2000 W heater runs for 10 seconds. How much energy does it transfer?',opts:['200 J','20 000 J','2010 J'],ans:1},
task:'Find the appliance that transfers 60 000 J in one minute',show:()=>{steps[0].go();replay([()=>run(0),()=>run(1)],1100)},go:()=>{fresh();update();G.after=settle(0,()=>G.won,'The 1000 W microwave.')}},
{h:'One kilowatt-hour',p:'Joules are tiny for a home. Bills use the kilowatt-hour: 1 kW for 1 hour. The area of a power × time rectangle is the energy.',
predict:{q:'How many joules are in 1 kWh?',opts:['1000 J','3600 J','3 600 000 J'],ans:2},
task:'Make exactly 1 kWh three different ways',show:()=>{steps[1].go();replay([()=>setPT(20,1),()=>setPT(10,2),()=>setPT(1,20)],900)},go:()=>{fresh();update();G.after=settle(1,()=>G.won,'Different shapes, the same 1 kWh.')}},
{h:'Watch the units',p:'For kWh, power must be in kilowatts and time in hours. Convert first, then multiply.',
predict:{q:'A 100 W TV is on for 5 hours. How much energy is that?',opts:['500 kWh','0.5 kWh','20 kWh'],ans:1},
task:'Work out all three in kWh',show:()=>{steps[2].go();replay(E.UNITS.map(()=>()=>choose(0)),850)},go:()=>{fresh(E.UNITS,'6 minutes = 0.1 h, and 3 × 0.1 = 0.3.');update();G.after=settle(2,()=>G.won,'0.5, 1 and 0.3 kWh.')}},
{h:'What does it cost?',p:'Cost = energy in kWh × price per kWh. Power alone does not decide the bill: time matters just as much.',
predict:{q:'Which costs more each day: a 3 kW kettle used for 6 minutes, or 20 W lights left on for 24 hours?',opts:['The kettle: it has far more power','The lights','They cost the same'],ans:1},
task:'Rank all four from most to least expensive',show:()=>{steps[3].go();replay([0,1,2,3].map(i=>()=>rank(i)),800)},go:()=>{fresh();update();G.after=settle(3,()=>G.won,'Heater, lights, kettle, router.')}},
{h:'Read the meter',p:'An electricity meter counts kilowatt-hours and never goes back. Take the old reading from the new one, then multiply by the price.',
predict:{q:'The meter said 4512 kWh last week and 4590 kWh today. How much energy was used?',opts:['9102 kWh','78 kWh','4590 kWh'],ans:1},
task:'Find the energy used and the bill',show:()=>{steps[4].go();replay([()=>choose(0),()=>choose(0)],900)},go:()=>{fresh(E.METER.rounds,'78 × 25p = 1950p.');update();G.after=settle(4,()=>G.won,'78 kWh and £19.50.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function why(tag){let m=E.WHY[tag]||'Check the units: joules need watts × seconds, and kWh need kilowatts × hours.';
 if(tag==='usedW')m='Watts × hours does not give kWh. Divide by 1000 first: 100 W = 0.1 kW, and 0.1 × 5 = 0.5 kWh.';
 if(tag==='usedMin')m='Minutes are not hours. Divide the minutes by 60 first, then multiply by the kilowatts.';
 if(tag==='penceSlip')m='The price is in pence. 1950p is £19.50 (divide by 100), not £1950.';
 return m}
function ask(){qi++;const [q,ans,wrongs]=E.bank[qi%E.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,ans)});voice('Challenge: '+q);A.redraw()}
let chain=0;
function score(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){chain++;A.win()}else{chain=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+chain+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B2=>{chal.hidden=B2.step!==5;pad.hidden=B2.step===5;controls()},
 init:B2=>{A=B2;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Energy bill lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
