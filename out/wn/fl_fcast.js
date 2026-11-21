/* Flagship – weather forecasting (ages 7–9): tools and jobs, radar rain timing, model runs spreading out, 70% as 7 days
   in 10, planning with a warning. Data and sources in learn/fcast_art.js. Distinct from flagwxinst, flagwxclim, flagstorm. */
(()=>{const D=FCA;
VIS.reg('flagfcast',c=>{let A,btnRow,chal,qi=-1,gen=0;const S={};
const INK='#0f172a',OK='#047857',BAD='#b91c1c',EDGE='#64748b',BG='#f1f5f9',SEA='#dbeafe',LAND='#dcfce7',RAINC='#1d4ed8',FF='px system-ui,sans-serif';
const scene=()=>['tools','rain','runs','chance','plan','quiz'][A.step];
const fs=n=>Math.round(A.narrow?n:n*1.15);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* break text into lines that fit width w */
function lines(t,w,font){const g=A.ctx;g.font=font;const out=[];let cur='';for(const word of t.split(' ')){const tryit=cur?cur+' '+word:word;if(g.measureText(tryit).width>w&&cur){out.push(cur);cur=word}else cur=tryit}if(cur)out.push(cur);return out}
function text(t,x,y,w,o){o=o||{};const g=A.ctx,f=`${o.b||700} ${fs(o.n||13)}${FF}`,ls=lines(t,w,f),lh=fs(o.n||13)*1.2;g.font=f;g.fillStyle=o.col||INK;g.textAlign='center';g.textBaseline='middle';
 const y0=y-(ls.length-1)*lh/2;ls.forEach((s,i)=>g.fillText(s,x,y0+i*lh));return ls.length*lh}
function headline(t,state){const g=A.ctx,n=fs(14),f=`800 ${n}${FF}`;g.font=f;const w=Math.min(A.W-10,g.measureText(t).width+28),h=n+14,x=(A.W-w)/2,y=6;
 g.fillStyle='#ffffff';A.paint.rrect(x,y,w,h,8);g.fill();g.lineWidth=state?3:1.5;g.strokeStyle=state==='ok'?OK:state==='bad'?BAD:EDGE;g.stroke();
 let k=n;while(k>9&&g.measureText(t).width>w-12){k--;g.font=`800 ${k}${FF}`}g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+h/2+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.state==='bad'?'#fee2e2':o.state==='ok'?'#d1fae5':o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.state||o.sel?3.5:1.5;g.strokeStyle=o.state==='bad'?BAD:o.state==='ok'?OK:o.sel?'#7c3aed':EDGE;g.stroke();if(t)text(t,r.x+r.w/2,r.y+r.h/2,r.w-10,{n:o.n||13,b:800})}
/* ---------- 1. tools and jobs ---------- */
const jobRect=j=>{const m=8,top=A.H*.14,h=(A.H*.5-m)/2,w=(A.W-3*m)/2;return{x:m+(j%2)*(w+m),y:top+(j>>1)*(h+m),w,h}};
const trayRect=k=>{const m=8,w=(A.W-5*m)/4;return{x:m+k*(w+m),y:A.H*.68,w,h:Math.min(A.H*.28,120)}};
function drawTools(){const s=S.tools,g=A.ctx;headline(s.placed.length===4?'All 4 tools in place':s.miss!=null?'Not that job – try again':'Drag each tool onto its job',s.placed.length===4?'ok':s.miss!=null?'bad':'');
 D.JOBS.forEach((j,i)=>{const r=jobRect(i),who=D.TOOLS.findIndex((t,k)=>t.job===i&&s.placed.includes(k));box(r,'',{fill:who>=0?'#ecfdf5':'#f8fafc',state:who>=0?'ok':s.missJob===i?'bad':''});
  text(j,r.x+r.w/2,r.y+r.h*(who>=0?.3:.5),r.w-14,{n:12});if(who>=0){D.icon(g,who,r.x+r.w*.3,r.y+r.h*.7,Math.min(30,r.h*.38));text(D.TOOLS[who].n,r.x+r.w*.62,r.y+r.h*.72,r.w*.5,{n:11,col:OK})}});
 D.TRAY.forEach((t,k)=>{if(s.placed.includes(t))return;let r=trayRect(k);if(s.drag&&s.drag.t===t)r={x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h};
  box(r,'',{sel:s.sel===t});D.icon(g,t,r.x+r.w/2,r.y+r.h*.36,Math.min(r.w*.5,r.h*.45));text(D.TOOLS[t].n,r.x+r.w/2,r.y+r.h*.8,r.w-6,{n:11})})}
function putTool(t,j){const s=S.tools;if(s.placed.includes(t))return;s.sel=null;
 if(D.TOOLS[t].job!==j){s.miss=t;s.missJob=j;A.sound.miss();return tell(`${D.TOOLS[t].n} does not ${D.JOBS[j].toLowerCase().replace(/^(\w+)s /,'$1 ')}. `+D.SLIP[t])}
 s.miss=null;s.missJob=null;s.placed.push(t);A.sound.pop();tell(`Yes. ${D.WHY[t]}`+(s.placed.length<4?'':' All four tools are in place.'))}
/* ---------- 2. radar rain ---------- */
const map=()=>{const l=A.W*.05,r=A.W*.95,t=A.H*.22,b=A.H*.64;return{l,r,t,b,cw:(r-l)/D.COLS}};
const hourOf=p=>D.HOUR0+(p-D.START);
const overTown=p=>p+1>=D.TOWN&&p-1<=D.TOWN;
const timeKey=i=>{const m=8,w=(A.W-4*m)/3;return{i,x:m+i*(w+m),y:A.H*.78,w,h:Math.max(42,A.H*.12)}};
function drawRain(){const s=S.rain,g=A.ctx,M=map();headline(s.done?'Rain reaches the town at 1 pm':`Radar at ${D.clock(hourOf(s.p))}`+(overTown(s.p)?': raining in town':''),s.done?'ok':s.miss!=null?'bad':'');
 g.fillStyle=LAND;g.fillRect(M.l,M.t,M.r-M.l,M.b-M.t);g.strokeStyle='#94a3b8';g.lineWidth=1;for(let i=0;i<=D.COLS;i++){g.beginPath();g.moveTo(M.l+i*M.cw,M.t);g.lineTo(M.l+i*M.cw,M.b);g.stroke()}
 const ty=(M.t+M.b)/2,tx=M.l+(D.TOWN+.5)*M.cw,ry=Math.min((M.b-M.t)*.42,M.cw*1.2);
 g.save();g.beginPath();g.rect(M.l,M.t,M.r-M.l,M.b-M.t);g.clip();
 const blob=(p,a)=>{g.globalAlpha=a;g.fillStyle=RAINC;g.beginPath();g.ellipse(M.l+(p+.5)*M.cw,ty,M.cw*1.5,ry,0,0,7);g.fill();g.globalAlpha=1};
 blob(D.START-1,.22);blob(s.p,.7);g.restore();
 [[D.START-1,'8 am'],[s.p,D.clock(hourOf(s.p))]].forEach(([p,t])=>text(t,Math.max(M.l+20,M.l+(p+.5)*M.cw),M.t-10,M.cw*2,{n:11}));
 g.fillStyle='#b45309';g.fillRect(tx-M.cw*.25,ty-M.cw*.05,M.cw*.5,M.cw*.32);g.beginPath();g.moveTo(tx-M.cw*.33,ty-M.cw*.05);g.lineTo(tx,ty-M.cw*.33);g.lineTo(tx+M.cw*.33,ty-M.cw*.05);g.fill();
 box({x:tx-M.cw*.55,y:ty+M.cw*.32,w:M.cw*1.1,h:fs(12)+8},'Town',{n:11});
 const fx=M.l+(s.p+1.5)*M.cw;g.strokeStyle='#7c3aed';g.lineWidth=2.5;g.setLineDash([5,4]);g.beginPath();g.moveTo(fx,M.t);g.lineTo(fx,M.b);g.stroke();g.setLineDash([]);
 g.font=`700 ${fs(11)}${FF}`;g.fillStyle=INK;g.textAlign='left';g.textBaseline='middle';g.fillText('Wind from the west →',M.l,M.b+14);g.textAlign='right';g.fillText('1 square = 10 km',M.r,M.b+14);
 if(!s.done)D.TIMES.forEach((t,i)=>box(timeKey(i),t,{n:15,state:s.miss===i?'bad':''}))}
function moveRain(p){const s=S.rain;if(s.done)return;p=Math.max(0,Math.min(7,p));if(p===s.p)return;s.p=p;A.sound.tick();tell(`Radar at ${D.clock(hourOf(p))}. The front of the rain is ${Math.max(0,D.TOWN-p-1)} squares from the town.`+(overTown(p)?' It is raining in the town.':''))}
function pickTime(i){const s=S.rain;if(s.done)return;if(i!==D.TIME_ANS){s.miss=i;A.sound.miss();return tell(D.TIME_SLIP[i])}s.miss=null;s.done=true;s.p=D.TOWN-1;A.sound.pop();tell(D.YES[0])}
/* ---------- 3. computer model runs ---------- */
const plot=()=>({l:A.W*.12,r:A.W*.9,t:A.H*.2,b:A.H*.66});
const px=d=>{const P=plot();return P.l+(P.r-P.l)*d/6},py=v=>{const P=plot();return P.b-(P.b-P.t)*(v-10)/12};
const runKey=()=>({x:A.W/2-Math.min(130,A.W*.4),y:A.H*.8,w:Math.min(260,A.W*.8),h:Math.max(42,A.H*.12)});
const RUNCOL=['#1d4ed8','#b91c1c','#047857','#7c3aed','#b45309'];
function drawRuns(){const s=S.runs,g=A.ctx,P=plot();headline(s.done?'Day 1: the runs agree best':s.n<5?`Computer runs: ${s.n} of 5`:'Tap the day the runs agree best',s.done?'ok':s.miss!=null?'bad':'');
 g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(P.l,P.t);g.lineTo(P.l,P.b);g.lineTo(P.r,P.b);g.stroke();
 g.font=`700 ${fs(11)}${FF}`;g.fillStyle=INK;g.textAlign='right';g.textBaseline='middle';[10,15,20].forEach(v=>g.fillText(v+'°C',P.l-4,py(v)));
 g.textAlign='center';g.textBaseline='top';for(let d=0;d<7;d++){g.fillStyle=s.miss===d?BAD:s.done&&d===D.DAY_ANS?OK:INK;g.fillText('Day '+(d+1),px(d),P.b+5)}
 if(s.n>=2)for(let d=0;d<7;d++){const vs=D.RUNS.slice(0,s.n).map(r=>r[d]);g.fillStyle=d===s.miss?'rgba(185,28,28,.2)':d===D.DAY_ANS&&s.done?'rgba(4,120,87,.25)':'rgba(100,116,139,.18)';g.fillRect(px(d)-9,py(Math.max(...vs))-6,18,py(Math.min(...vs))-py(Math.max(...vs))+12)}
 D.RUNS.slice(0,s.n).forEach((r,k)=>{g.strokeStyle=RUNCOL[k];g.lineWidth=2.5;g.beginPath();r.forEach((v,d)=>d?g.lineTo(px(d),py(v)):g.moveTo(px(d),py(v)));g.stroke()});
 if(s.n<5)box(runKey(),'Run the computer again',{n:14})}
function runOnce(){const s=S.runs;if(s.n>=5)return;s.n++;A.sound.step();tell(`Run ${s.n} of 5 drawn.`+(s.n<5?' Each run starts from almost the same measurements.':' Now tap the day where the five runs are closest together.'))}
function pickDay(d){const s=S.runs;if(s.n<5||s.done)return;if(d!==D.DAY_ANS){s.miss=d;A.sound.miss();return tell(d>=4?`On day ${d+1} the runs are spread far apart, so that forecast is the least sure. Look for where the lines bunch up.`:`Day ${d+1} is close, but the lines are bunched even tighter on day 1.`)}
 s.miss=null;s.done=true;A.sound.pop();tell(D.YES[1])}
/* ---------- 4. 7 in 10 ---------- */
const cell=i=>{const m=8,w=(A.W-6*m)/5,h=Math.min(w*.9,A.H*.2);return{x:m+(i%5)*(w+m),y:A.H*.15+(i>4?h+m:0),w,h}};
const checkKey=()=>({x:A.W/2-Math.min(110,A.W*.35),y:A.H*.66,w:Math.min(220,A.W*.7),h:Math.max(42,A.H*.11)});
const sureKey=i=>({i,x:A.W*.06,y:A.H*.6+i*(Math.max(40,A.H*.1)+6),w:A.W*.88,h:Math.max(40,A.H*.1)});
function drawChance(){const s=S.chance,g=A.ctx,n=s.wet.filter(Boolean).length;
 headline(s.done?'Rain is likely, not certain':s.built?'Will it rain tomorrow for sure?':`Forecast: ${D.PCT}% chance of rain. Rainy days: ${n} of 10`,s.done?'ok':s.miss!=null?'bad':'');
 for(let i=0;i<10;i++){const r=cell(i);box(r,'',{fill:s.wet[i]?'#dbeafe':'#fef9c3'});if(s.wet[i]){D.wet(g,r.x+r.w/2,r.y+r.h*.42,r.w*.2)}else D.sun(g,r.x+r.w/2,r.y+r.h*.5,r.w*.13)}
 if(!s.built)box(checkKey(),'Check my 10 days',{n:14,state:s.miss==='n'?'bad':''});else if(!s.done)D.SURE.keys.forEach((k,i)=>box(sureKey(i),k,{n:13,state:s.miss===i?'bad':''}))}
function toggle(i){const s=S.chance;if(s.built)return;s.wet[i]=!s.wet[i];s.miss=null;A.sound.tick();const n=s.wet.filter(Boolean).length;tell(`Day ${i+1} is now ${s.wet[i]?'rainy':'dry'}. ${n} rainy days out of 10 is ${n*10}%.`)}
function check(){const s=S.chance;if(s.built)return;const n=s.wet.filter(Boolean).length;
 if(n!==D.WANT){s.miss='n';A.sound.miss();return tell(n===3?'You made 3 rainy days. 70% means 7 out of 10 days like this one are rainy, so 3 stay dry.':`${n} rainy days is ${n*10}%. A 70% chance of rain means 7 of the 10 days are rainy.`)}
 s.miss=null;s.built=true;A.sound.pop();tell(D.YES[3])}
function sure(i){const s=S.chance;if(!s.built||s.done)return;if(i!==D.SURE.ans){s.miss=i;A.sound.miss();return tell(D.SURE.slip[i])}s.miss=null;s.done=true;A.sound.pop();tell(D.YES[2])}
/* ---------- 5. plan the days ---------- */
const dayRect=d=>{const m=8,w=(A.W-4*m)/3;return{x:m+d*(w+m),y:A.H*.14,w,h:A.H*.42}};
const planRect=k=>{const m=8,w=(A.W-4*m)/3;return{x:m+k*(w+m),y:A.H*.66,w,h:Math.max(48,A.H*.17)}};
function drawPlan(){const s=S.plan,g=A.ctx,all=s.put.every(x=>x!=null);headline(all?'Every plan fits its day':'Drag each plan onto the right day',all?'ok':s.miss!=null?'bad':'');
 D.DAYS.forEach((d,i)=>{const r=dayRect(i),who=s.put.indexOf(i);box(r,'',{fill:'#ffffff',state:who>=0?'ok':s.missDay===i?'bad':''});text(d.d,r.x+r.w/2,r.y+14,r.w-6,{n:13,b:800});
  const ix=r.x+r.w/2,iy=r.y+r.h*.33,R=Math.min(r.w,r.h)*.13;if(d.k==='sun')D.sun(g,ix,iy,R);
  if(d.k==='warn'){D.warn(g,ix,iy,R)}
  if(d.k==='rain'){D.wet(g,ix,iy,R*1.3)}
  text(d.w,r.x+r.w/2,r.y+r.h*.6,r.w-8,{n:11});if(who>=0)text(D.PLANS[who].t,r.x+r.w/2,r.y+r.h*.86,r.w-8,{n:11,col:OK,b:800})});
 D.PLANS.forEach((p,k)=>{if(s.put[k]!=null)return;let r=planRect(k);if(s.drag&&s.drag.k===k)r={x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h};box(r,p.t,{n:12,sel:s.sel===k})})}
function putPlan(k,d){const s=S.plan;if(s.put[k]!=null)return;s.sel=null;if(D.PLANS[k].day!==d){s.miss=k;s.missDay=d;A.sound.miss();return tell(D.PLAN_SLIP[k+'-'+d])}
 s.miss=null;s.missDay=null;s.put[k]=d;A.sound.pop();tell(`Yes: ${D.PLANS[k].t.toLowerCase()} on ${D.DAYS[d].d}.`+(s.put.every(x=>x!=null)?' All three plans fit the forecast.':''))}
/* ---------- canvas input ---------- */
function draw(){const g=A.ctx;g.fillStyle=BG;g.fillRect(0,0,A.W,A.H);const k=scene();if(k==='quiz'){headline('Challenge','ok');[0,1,2].forEach(k=>D.icon(g,k,A.W*(.3+k*.2),A.H*.5,60));return}
 ({tools:drawTools,rain:drawRain,runs:drawRuns,chance:drawChance,plan:drawPlan})[k]();A.fx.draw(g)}
function down(p){const k=scene();
 if(k==='tools'){const s=S.tools,j=[0,1,2,3].find(i=>hit(p,jobRect(i)));if(s.sel!=null&&j!=null){putTool(s.sel,j);return false}const t=D.TRAY.findIndex((x,i)=>!s.placed.includes(x)&&hit(p,trayRect(i)));if(t>=0){s.drag={t:D.TRAY[t],x:p.x,y:p.y};s.sel=D.TRAY[t];A.redraw();return true}}
 if(k==='rain'){const s=S.rain,M=map();const key=[0,1,2].find(i=>hit(p,timeKey(i)));if(key!=null&&!s.done){pickTime(key);return false}if(p.y>M.t&&p.y<M.b&&!s.done){s.drag=true;return true}}
 if(k==='runs'){const s=S.runs;if(s.n<5&&hit(p,runKey())){runOnce();return false}const P=plot();if(p.y>P.t-10&&p.y<P.b+30){pickDay(Math.max(0,Math.min(6,Math.round((p.x-P.l)/((P.r-P.l)/6)))))}}
 if(k==='chance'){const s=S.chance;if(!s.built){const i=[...Array(10).keys()].find(i=>hit(p,cell(i)));if(i!=null)toggle(i);else if(hit(p,checkKey()))check()}else{const i=[0,1,2].find(i=>hit(p,sureKey(i)));if(i!=null)sure(i)}}
 if(k==='plan'){const s=S.plan,d=[0,1,2].find(i=>hit(p,dayRect(i)));if(s.sel!=null&&d!=null){putPlan(s.sel,d);return false}const t=[0,1,2].find(i=>s.put[i]==null&&hit(p,planRect(i)));if(t!=null){s.drag={k:t,x:p.x,y:p.y};s.sel=t;A.redraw();return true}}
 return false}
function move(p){const k=scene();if(k==='tools'&&S.tools.drag){Object.assign(S.tools.drag,{x:p.x,y:p.y});A.redraw()}
 if(k==='rain'&&S.rain.drag){const M=map();moveRain(Math.round((p.x-M.l)/M.cw-.5))}
 if(k==='plan'&&S.plan.drag){Object.assign(S.plan.drag,{x:p.x,y:p.y});A.redraw()}}
function up(p){const k=scene();
 if(k==='tools'&&S.tools.drag){const t=S.tools.drag.t;S.tools.drag=null;const j=p&&[0,1,2,3].find(i=>hit(p,jobRect(i)));if(j!=null)putTool(t,j);else{A.redraw();tell(`${D.TOOLS[t].n} picked. Drop it on a job, or tap a job.`)}}
 if(k==='rain')S.rain.drag=false;
 if(k==='plan'&&S.plan.drag){const t=S.plan.drag.k;S.plan.drag=null;const d=p&&[0,1,2].find(i=>hit(p,dayRect(i)));if(d!=null)putPlan(t,d);else{A.redraw();tell(`${D.PLANS[t].t} picked. Drop it on a day, or tap a day.`)}}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{tools:{placed:[],sel:null,drag:null,miss:null,missJob:null},rain:{p:D.START,done:false,miss:null,drag:false},
 runs:{n:1,done:false,miss:null},chance:{wet:Array(10).fill(false),built:false,done:false,miss:null},plan:{put:[null,null,null],sel:null,drag:null,miss:null,missDay:null},after:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.after()}
/* buttons under the canvas: every canvas action has a twin */
function buttons(){if(!btnRow)return;btnRow.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btnRow,t).onclick=f};
 if(k==='tools'){const s=S.tools;if(s.sel==null)D.TRAY.forEach(t=>{if(!s.placed.includes(t))b(D.TOOLS[t].n,()=>{s.sel=t;tell(`${D.TOOLS[t].n} picked. Now choose its job.`)},`Pick the ${D.TOOLS[t].n}`)});
  else D.JOBS.forEach((j,i)=>{if(!D.TOOLS.some((t,k)=>t.job===i&&s.placed.includes(k)))b(j,()=>putTool(s.sel,i),`Put the ${D.TOOLS[s.sel].n} on: ${j}`)})}
 if(k==='rain'&&!S.rain.done){b('◀ 1 hour back',()=>moveRain(S.rain.p-1),'Move the rain back one hour');b('1 hour on ▶',()=>moveRain(S.rain.p+1),'Move the rain on one hour');D.TIMES.forEach((t,i)=>b(t,()=>pickTime(i),`Rain reaches town at ${t}`))}
 if(k==='runs'&&!S.runs.done){if(S.runs.n<5)b('Run the computer again',runOnce);else for(let d=0;d<7;d++)b('Day '+(d+1),()=>pickDay(d),`Day ${d+1} is the surest`)}
 if(k==='chance'&&!S.chance.done){if(!S.chance.built){b('Add a rainy day',()=>{const i=S.chance.wet.indexOf(false);if(i>=0)toggle(i)});b('Remove a rainy day',()=>{const i=S.chance.wet.lastIndexOf(true);if(i>=0)toggle(i)});b('Check my 10 days',check)}
  else D.SURE.keys.forEach((t,i)=>b(t,()=>sure(i)))}
 if(k==='plan'){const s=S.plan;if(s.sel==null)D.PLANS.forEach((p,i)=>{if(s.put[i]==null)b(p.t,()=>{s.sel=i;tell(`${p.t} picked. Now choose a day.`)},`Pick: ${p.t}`)});
  else D.DAYS.forEach((d,i)=>{if(!s.put.includes(i))b(d.d,()=>putPlan(s.sel,i),`Put ${D.PLANS[s.sel].t} on ${d.d}: ${d.w}`)})}}
const whenDone=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(D.DESC[i]);S.after=whenDone(i,ok,D.DONE[i])}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'The forecaster’s tools',p:D.P[0],
 predict:{q:'Which tool can find where rain is falling right now?',opts:['A weather balloon','Radar'],ans:1},task:'Put all 4 tools on their jobs',
 show:()=>play(0,[0,1,2,3].map(t=>()=>putTool(t,t)),500),go:()=>begin(0,()=>S.tools.placed.length===4)},
{h:'Track the rain',p:D.P[1],
 predict:{q:'The wind blows from the west. Which way will the rain move?',opts:['Towards the west','Towards the east'],ans:1},task:'Find when the rain reaches the town',
 show:()=>play(1,[()=>moveRain(2),()=>moveRain(3),()=>moveRain(4),()=>moveRain(5),()=>pickTime(D.TIME_ANS)],450),go:()=>begin(1,()=>S.rain.done)},
{h:'Many computer runs',p:D.P[2],
 predict:{q:'Which forecast is more likely to be right?',opts:['The one for next week','The one for tomorrow'],ans:1},task:'Run the computer 5 times and find the surest day',
 show:()=>play(2,[runOnce,runOnce,runOnce,runOnce,()=>pickDay(D.DAY_ANS)],450),go:()=>begin(2,()=>S.runs.done)},
{h:'Chance of rain',p:D.P[3],
 predict:{q:'What does a 70% chance of rain mean?',opts:['It will rain for 70% of the day','On 7 out of 10 days like this, it rains here'],ans:1},task:'Make 7 of the 10 days rainy, then answer',
 show:()=>play(3,[...[0,1,2,3,4,5,6].map(i=>()=>toggle(i)),check,()=>sure(D.SURE.ans)],300),go:()=>begin(3,()=>S.chance.done)},
{h:'Plan with a forecast',p:D.P[4],
 task:'Put each plan on the right day',
 show:()=>play(4,D.PLANS.map((p,k)=>()=>putPlan(k,p.day)),550),go:()=>begin(4,()=>S.plan.put.every(x=>x!=null))},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
/* challenge feedback names the slip behind each wrong answer */
function fix(t){let m='Think about what each tool measures and how forecasts work.';
 if(t==='tool')m='Match the tool to its job: radar maps rain now, satellites photograph clouds from space, balloons carry sensors up through the air.';
 if(t==='back')m='The rain is still on its way, so the time must be later than 10 am, not earlier. Add 3 hours: 1 pm.';
 if(t==='edge')m='Rain starts when the front edge arrives: 3 squares at 1 square an hour is 3 hours after 10 am, so 1 pm.';
 if(t==='pct')m='A chance of rain is about how likely rain is at your place, not how long it rains or how much of the town gets wet. 30% means 3 days in 10 like this one are rainy.';
 if(t==='far')m='Small errors grow as the days go on, so the computer runs spread apart. Tomorrow’s forecast is the surest.';
 if(t==='west')m='A wind is named after where it comes from. A west wind blows from the west, so it carries the rain from the west.';
 if(t==='warn')m='The warning colours go up in danger: yellow (be aware), then amber (be prepared), then red (take action now).';
 return m}
function ask(){qi++;const Q=D.QS[qi%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qi*2+1)%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(t,a){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Right: ${a}.`:'✗ '+fix(t))+' <button type="button" class="lbtn sm">Next question →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Right.':fix(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{chal.hidden=x.step!==5;btnRow.hidden=x.step===5;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);btnRow=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Forecasting lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
