/* Flagship – accurate measurement: repeat readings and anomalous results (ages 9-11): time the same car run three times
   and see the readings vary, tap the anomaly in tables of repeat readings, drag the readings that fit into a tray to find
   the mean, compare two groups by their range, and sort measuring habits into good practice and not. Data: repeat_art.js. */
(()=>{const R=REPEAT;
VIS.reg('flagrepeat',c=>{let A,Q,ctl,chalEl,cq=-1,ep=0;const S={};
const stage=()=>['time','odd','mean','spread','habit','chal'][A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const fmt=(v,u)=>`${v} ${u}`;
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f7fee7';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. time the same run three times ---------- */
let SW=null;
function timeRun(){const s=S.ti;if(s.got.length>=R.RUNS.length)return;const v=R.RUNS[s.got.length];s.got.push(v);A.sound.pop();
 const left=R.RUNS.length-s.got.length;note(`Run ${s.got.length}: ${v.toFixed(1)} s.`+(s.got.length>1&&v!==s.got[0]?' Same car, same ramp, but a slightly different time.':'')+(left?' Time it again.':''),false)}
function drawTime(){const s=S.ti,n=s.got.length,y0=Q.bar(n<3?`Run ${n+1} of 3: tap the stopwatch to time the car down the ramp.`:R.DONE[0],n<3?'':'ok',S.say,S.err);
 const h=A.H-y0-14,rw=A.W*.5;Q.ramp({x:28,y:y0+h*.2,w:rw,h:h*.5},n?1:0);const Rr=Math.min(A.W*.14,h*.2,60);SW=Q.watch(A.W*.78,y0+Rr*1.4+6,Rr,n?s.got[n-1]:null,n<3);
 const ty=y0+Rr*2.8+16,tw=A.W*.42,tx=A.W-tw-10,rh=Math.min(34,(A.H-ty-10)/4);
 for(let i=0;i<3;i++)Q.tile({x:tx,y:ty+i*(rh+4),w:tw,h:rh},`Run ${i+1}: `+(s.got[i]!=null?s.got[i].toFixed(1)+' s':'…'),{n:14,ok:s.got[i]!=null})}
/* ---------- 2. spot the anomaly ---------- */
let CELLS=[];
function pickOdd(k){const s=S.od,set=R.SETS[s.i];if(!set)return;if(k!==set.bad){s.bad=k;A.sound.miss();return note(`${fmt(set.v[k],set.u)} fits with the others. Look for the reading far from the rest.`,true)}
 s.bad=-1;s.i++;A.sound.pop();note(`Yes: ${fmt(set.v[k],set.u)} is the anomaly. The others are close together.`+(s.i<R.SETS.length?' Next table.':''),false)}
function drawOdd(){const s=S.od,set=R.SETS[s.i],y0=Q.bar(set?`Table ${s.i+1} of 3: ${set.q} (${set.u}). Tap the anomaly.`:R.DONE[1],set?(s.bad>=0?'no':''):'ok',S.say,S.err);
 if(!set){CELLS=[];return}const gap=8,w=(A.W-20-gap*3)/4,h=Math.min(110,A.H-y0-40),g=A.ctx;g.font=`700 ${Q.sz(13)}${Q.F}`;g.fillStyle=Q.fg();g.textAlign='center';g.textBaseline='top';
 CELLS=set.v.map((v,k)=>({k,x:10+k*(w+gap),y:y0+26,w,h}));CELLS.forEach(r=>{g.font=`700 ${Q.sz(13)}${Q.F}`;g.fillStyle=Q.fg();g.textAlign='center';g.textBaseline='top';g.fillText(`Reading ${r.k+1}`,r.x+r.w/2,y0+6);Q.tile(r,String(set.v[r.k]),{n:26,no:s.bad===r.k})})}
/* ---------- 3. the mean, without the anomaly ---------- */
let CARDS=[],TRAY=null;
function addIn(k){const s=S.me,set=R.SETS[s.i];if(!set||s.inn.includes(k))return;s.drag=null;
 if(k===set.bad){s.bad=k;A.sound.miss();return note(`${fmt(set.v[k],set.u)} is the anomaly. It would pull the mean away, so leave it out (but keep it in your table).`,true)}
 s.bad=-1;s.inn.push(k);A.sound.pop();const used=s.inn.map(j=>set.v[j]),tot=used.reduce((a,b)=>a+b,0);
 if(used.length<3)return note(`Total so far: ${tot} ${set.u}. Add the other readings that fit.`,false);
 s.i++;s.inn=[];note(`Mean = ${used.join(' + ')} = ${tot}, then ${tot} ÷ 3 = ${fmt(tot/3,set.u)}.`+(s.i<R.SETS.length?' Next set.':''),false)}
function drawMean(){const s=S.me,set=R.SETS[s.i],y0=Q.bar(set?`Set ${s.i+1} of 3: ${set.q}. Drag the readings that fit into the tray.`:R.DONE[2],set?(s.bad>=0?'no':''):'ok',S.say,S.err);
 if(!set){CARDS=[];TRAY=null;return}const th=Math.min(A.H*.3,130);TRAY={x:10,y:A.H-th-8,w:A.W-20,h:th};Q.tile(TRAY,'',{sel:!!s.drag});
 const g=A.ctx,used=s.inn.map(j=>set.v[j]);g.font=`800 ${Q.sz(15)}${Q.F}`;g.fillStyle=Q.INK;g.textAlign='center';g.textBaseline='top';
 g.fillText(used.length?`Add up: ${used.join(' + ')} = ${used.reduce((a,b)=>a+b,0)}`:'Add up tray',A.W/2,TRAY.y+10);
 const gap=8,w=(A.W-20-gap*3)/4,h=Math.min(70,TRAY.y-y0-20);CARDS=set.v.map((v,k)=>({k,x:10+k*(w+gap),y:y0+6,w,h}));
 CARDS.forEach(r=>{const isIn=s.inn.includes(r.k),d=s.drag&&s.drag.k===r.k;if(isIn){const j=s.inn.indexOf(r.k),q={x:TRAY.x+14+j*(w+gap),y:TRAY.y+TRAY.h-h*.8-10,w,h:h*.8};Q.tile(q,fmt(set.v[r.k],set.u),{ok:1,n:18});return}
  const q=d?{x:s.drag.x-w/2,y:s.drag.y-h/2,w,h}:r;Q.tile(q,fmt(set.v[r.k],set.u),{n:18,no:s.bad===r.k,sel:d})})}
/* ---------- 4. which results agree better? ---------- */
let GRP=[];
const rng=a=>Math.round((Math.max(...a)-Math.min(...a))*10)/10;
function trust(k){const s=S.sp,p=R.PAIRS[s.i];if(!p)return;const pick=k?p.b:p.a,other=k?p.a:p.b;
 if(k!==p.k){s.bad=k;A.sound.miss();return note(`Group ${'AB'[k]}'s readings are spread out: range ${Math.max(...pick)} − ${Math.min(...pick)} = ${rng(pick)}. The other group's range is only ${rng(other)}.`,true)}
 s.bad=-1;s.i++;A.sound.pop();note(`Yes: range ${rng(pick)}, against ${rng(other)}. Readings close together agree, so you can trust them more.`+(s.i<R.PAIRS.length?' Next pair.':''),false)}
function drawSpread(){const s=S.sp,p=R.PAIRS[s.i],y0=Q.bar(p?`Pair ${s.i+1} of 3: ${p.q}. Whose results can you trust more?`:R.DONE[3],p?(s.bad>=0?'no':''):'ok',S.say,S.err);
 if(!p){GRP=[];return}const gap=10,w=(A.W-20-gap)/2,h=A.H-y0-14;GRP=[0,1].map(k=>({k,x:10+k*(w+gap),y:y0+4,w,h}));
 GRP.forEach(r=>{const v=r.k?p.b:p.a;Q.tile(r,'',{no:s.bad===r.k});const g=A.ctx;g.font=`800 ${Q.sz(16)}${Q.F}`;g.fillStyle=Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(`Group ${'AB'[r.k]}`,r.x+r.w/2,r.y+8);
  const lo=Math.min(...p.a,...p.b),hi=Math.max(...p.a,...p.b),ax=r.x+14,aw=r.w-28,ay=r.y+r.h*.62;g.strokeStyle='#475569';g.lineWidth=2;g.beginPath();g.moveTo(ax,ay);g.lineTo(ax+aw,ay);g.stroke();
  v.forEach((x,i)=>{const px=ax+aw*(x-lo)/((hi-lo)||1),same=v.slice(0,i).filter(y=>y===x).length;g.fillStyle=r.k?'#7c3aed':'#0e7490';g.beginPath();g.arc(px,ay-9-same*14,6,0,7);g.fill()});
  g.font=`700 ${Q.sz(14)}${Q.F}`;g.fillStyle=Q.INK;g.fillText(v.map(x=>v.some(y=>y%1)?x.toFixed(1):String(x)).join(', '),r.x+r.w/2,r.y+r.h*.3);if(s.bad===r.k)g.fillText(`range ${rng(v)}`,r.x+r.w/2,ay+10)})}
/* ---------- 5. good habits ---------- */
let HB=[],HC=null;
function sortHab(z){const s=S.hb,it=R.HAB[s.i];if(!it)return;s.drag=null;if(z!==it.z){s.bad=z;A.sound.miss();return note(`Look again. ${it.why}`,true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();note(it.why+(s.i<R.HAB.length?' Next card.':''),false)}
function drawHabit(){const s=S.hb,it=R.HAB[s.i],y0=Q.bar(it?`Card ${s.i+1} of 6: good practice or not?`:R.DONE[4],it?(s.bad>=0?'no':''):'ok',S.say,S.err);
 const gap=8,bw=(A.W-20-gap)/2,bh=Math.min(A.H*.28,120),by=A.H-bh-8;HB=['Good practice','Not good practice'].map((l,z)=>({z,l,x:10+z*(bw+gap),y:by,w:bw,h:bh}));
 HB.forEach(r=>Q.tile(r,`${r.l} (${s.n[r.z]})`,{n:16,no:s.bad===r.z}));
 if(it){const w=Math.min(A.W-50,330),h=Math.min(by-y0-24,86),d=s.drag;HC={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+8,w,h};Q.tile(HC,it.t,{n:18,sel:!!d})}else HC=null}
/* ---------- wiring ---------- */
function draw(){ground();const m=stage();if(m==='chal'){Q.bar('Challenge: repeat readings and anomalies','ok');const Rr=Math.min(A.W*.12,A.H*.16);Q.watch(A.W*.3,A.H*.6,Rr,2.5,0);Q.ramp({x:A.W*.5,y:A.H*.4,w:A.W*.4,h:A.H*.4},1);return}
 ({time:drawTime,odd:drawOdd,mean:drawMean,spread:drawSpread,habit:drawHabit})[m]();A.fx.draw(A.ctx)}
function down(p){const m=stage();
 if(m==='time'){if(inR(p,SW))timeRun();return false}
 if(m==='odd'){const r=CELLS.find(r=>inR(p,r));if(r)pickOdd(r.k);return false}
 if(m==='mean'){const r=CARDS.find(r=>!S.me.inn.includes(r.k)&&inR(p,r));if(r){S.me.drag={k:r.k,x:p.x,y:p.y};A.redraw();return true}return false}
 if(m==='spread'){const r=GRP.find(r=>inR(p,r));if(r)trust(r.k);return false}
 if(m==='habit'){if(HC&&inR(p,HC)){S.hb.drag={x:p.x,y:p.y};return true}const r=HB.find(r=>inR(p,r));if(r)sortHab(r.z);return false}return false}
function move(p){const m=stage(),d=m==='mean'?S.me.drag:m==='habit'?S.hb.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=stage();
 if(m==='mean'&&S.me.drag){const k=S.me.drag.k;S.me.drag=null;if(inR(p,TRAY))addIn(k);else{A.redraw();note('Drop the reading in the Add up tray.',false)}}
 if(m==='habit'&&S.hb.drag){S.hb.drag=null;const r=HB.find(r=>inR(p,r));if(r)sortHab(r.z);else{A.redraw();note('Drop the card in a box.',false)}}}
function fresh(){ep++;for(const k in S)delete S[k];Object.assign(S,{ti:{got:[]},od:{i:0,bad:-1},me:{i:0,inn:[],bad:-1,drag:null},sp:{i:0,bad:-1},hb:{i:0,n:[0,0],bad:-1,drag:null},say:null,err:false,check:()=>{}})}
function note(t,bad){S.say=t;S.err=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();S.check()}
const closer=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(R.DONE[i]+A.reveal(i))};
function enter(i,ok){fresh();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);S.check=closer(i,ok);pad();A.redraw()}
function demo(i,acts){steps[i].go();const e=ep;acts.forEach((f,j)=>setTimeout(()=>{if(e===ep)f()},(j+1)*360))}
function pad(){if(!ctl)return;ctl.innerHTML='';const m=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='time'&&S.ti.got.length<3)B('Time a run',timeRun,'Time the car down the ramp');
 if(m==='odd'){const set=R.SETS[S.od.i];if(set)set.v.forEach((v,k)=>B(fmt(v,set.u),()=>pickOdd(k),`Reading ${k+1}, ${fmt(v,set.u)}, is the anomaly`))}
 if(m==='mean'){const set=R.SETS[S.me.i];if(set)set.v.forEach((v,k)=>{if(!S.me.inn.includes(k))B('Add '+fmt(v,set.u),()=>addIn(k),`Put ${fmt(v,set.u)} in the Add up tray`)})}
 if(m==='spread'&&R.PAIRS[S.sp.i])[0,1].forEach(k=>B('Group '+'AB'[k],()=>trust(k),`Trust group ${'AB'[k]} more`));
 if(m==='habit'&&R.HAB[S.hb.i])['Good practice','Not good practice'].forEach((b,z)=>B(b,()=>sortHab(z),`"${R.HAB[S.hb.i].t}": ${b}`))}
const steps=[
{h:'Time it three times',p:R.TXT[0],predict:{q:'Same car, same ramp, same stopwatch. Will all three times be exactly the same?',opts:['Yes: same run, same time','No: they will vary a little'],ans:1},task:'Time 3 runs',
 show:()=>demo(0,R.RUNS.map(()=>timeRun)),go:()=>enter(0,()=>S.ti.got.length>=R.RUNS.length)},
{h:'Spot the anomaly',p:R.TXT[1],task:'Find the anomaly in all 3 tables',
 show:()=>demo(1,R.SETS.map(s=>()=>pickOdd(s.bad))),go:()=>enter(1,()=>S.od.i>=R.SETS.length)},
{h:'Find the mean',p:R.TXT[2],predict:{q:'Bounce heights: 42, 44, 43 and 61 cm. Should 61 cm go into the mean?',opts:['Yes: use every reading','No: it does not fit, so leave it out'],ans:1},task:'Find the mean of all 3 sets',
 show:()=>demo(2,R.SETS.flatMap(s=>s.v.map((v,k)=>k).filter(k=>k!==s.bad).map(k=>()=>addIn(k)))),go:()=>enter(2,()=>S.me.i>=R.SETS.length)},
{h:'Close together or spread out?',p:R.TXT[3],task:'Choose for all 3 pairs',
 show:()=>demo(3,R.PAIRS.map(p=>()=>trust(p.k))),go:()=>enter(3,()=>S.sp.i>=R.PAIRS.length)},
{h:'Good habits',p:R.TXT[4],task:'Sort all 6 cards',
 show:()=>demo(4,R.HAB.map(it=>()=>sortHab(it.z))),go:()=>enter(4,()=>S.hb.i>=R.HAB.length)},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Take at least 3 readings, leave anomalies out of the mean, and trust readings that agree.';
 if(t==='exact')m='Repeat readings nearly always vary a little, for example because of reaction time. That is normal, not broken.';
 if(t==='once')m='With one reading you cannot tell if it was a slip. Repeats let you check.';
 if(t==='all')m='That mean includes the anomaly, which pulls it away. Leave the anomaly out and divide by 3.';
 if(t==='erase')m='Never rub a reading out. Keep it in the table, circle it and say why it was left out.';
 if(t==='spread')m='Look at the range, not the size of the numbers. The group whose readings are close together is more repeatable.';
 if(t==='accprec')m='Close together means precise. It is only accurate if it is also close to the true value, and a scale not set to zero shifts every reading.';
 if(t==='big')m='That reading sits with the others. The anomaly is the one far from the rest.';
 return m}
function pose(){cq++;const X=R.QS[cq%R.QS.length],all=[[X.a,'ok'],...X.o],r=cq%3,ord=all.slice(r).concat(all.slice(0,r));
 chalEl.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chalEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,X.a)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function judge(t,a){chalEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chalEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:X=>{chalEl.hidden=X.step!==5;ctl.hidden=X.step===5;pad()},
 init:X=>{A=X;Q=R.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Repeat readings lab buttons'},w);chalEl=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pad()}}).start()})})();
