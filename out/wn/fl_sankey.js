/* Flagship – Efficiency, Sankey diagrams and work done (Science, Physics, ages 12-13; NC England KS3 Energy, AQA GCSE
   4.1.2.2 efficiency and 4.5.2 work done). The learner sets the light arrow of a filament bulb's Sankey diagram (the rest
   is wasted, never used up), sets three motor output arrows so they add up to the input, reads efficiency off two Sankey
   diagrams onto a 0-150% scale, drags a box to do 600 J of work with two different forces, and ranks three motors by
   efficiency. Data and drawings: sankey_art.js. */
(()=>{const Q=SNK;
VIS.reg('flagsankey',c=>{
let A,pad,box,qn=-1,gen=0,hold=null,Z={};const S={};
const KEYS=['bulb','motor','eff','work','rank','chal'],key=()=>KEYS[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tell(msg,bad){S.msg=msg;S.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();S.check()}
const tone=f=>f?'ok':S.bad?'no':'';
/* ---- steps 1-2: build a Sankey diagram with sliders ---- */
function outsOf(D,vals){return D.outs.map((o,i)=>({n:o.n,useful:!!o.useful,v:o.auto?D.input-vals[0]:vals[i]}))}
function setOut(i,v){const s=S.s,D=s.D;if(s.fin)return;v=Math.max(0,Math.min(D.max,Math.round(v/D.step)*D.step));s.vals[i]=v;s.bad=-1;A.redraw()}
function judgeOut(i){const s=S.s,D=s.D,o=D.outs[i],v=s.vals[i];if(s.fin)return;
 if(D===Q.BULB){if(v===o.t){s.fin=true;A.sound.pop();return tell(Q.DONE[0],false)}s.bad=i;A.sound.miss();
  return tell(v===D.input?'Then nothing would be wasted, but a filament bulb gets hot. Only 10 J leaves as light.':`Light is ${v} J, so ${D.input-v} J is wasted. This bulb gives out only 10 J of light.`,true)}
 const sum=s.vals.reduce((a,b)=>a+b,0),ok=D.outs.every((q,j)=>s.vals[j]===q.t);
 if(ok){s.fin=true;A.sound.pop();return tell(Q.DONE[1],false)}
 if(v===o.t){A.sound.tick();const todo=D.outs.filter((q,j)=>s.vals[j]!==q.t).map(q=>`${q.n.toLowerCase()} ${q.t} J`).join(', ');return tell(`${o.n} is ${v} J. Still to set: ${todo}.`+(sum>D.input?` Now the outputs add up to ${sum} J, more than the ${D.input} J in.`:''),false)}
 s.bad=i;A.sound.miss();tell(sum>D.input?`The outputs add up to ${sum} J, but only ${D.input} J goes in. Energy cannot be made.`:`${o.n} should carry ${o.t} J, not ${v} J.`,true)}
function viewBuild(){const s=S.s,D=s.D,g=A.ctx,dk=A.col.dark,outs=outsOf(D,s.vals);
 const ask=D===Q.BULB?`${D.name}: 100 J in, only 10 J comes out as light. Set the light arrow.`:`${D.name}: 200 J in. Set kinetic 140 J (useful), thermal 40 J, sound 20 J.`;
 const y0=Q.head(A,s.fin?Q.DONE[A.step]:ask,tone(s.fin),s.fin?null:S.msg,S.bad);
 const rows=D.outs.filter(o=>!o.auto).length,rh=A.narrow?42:46,sh=rows*rh+8,b={x:14,y:y0+4,w:A.W-28,h:Math.max(150,A.H-y0-sh-12)};
 Q.sankey(g,b,D,outs,dk);Z.sl=[];let y=b.y+b.h+6;
 D.outs.forEach((o,i)=>{if(o.auto)return;const st=s.bad===i?'no':(s.fin||(D!==Q.BULB&&s.vals[i]===o.t))?'ok':'';
  const r={x:14,y,w:A.W-28,h:rh,lw:A.narrow?84:110};Z.sl.push(Object.assign(Q.slider(g,r,o.n+(o.useful?' \u2605':''),s.vals[i],D.max,Q.COL[o.n],st,dk),{i}));y+=rh});
 if(D===Q.BULB){g.font=`700 13${Q.F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='left';g.textBaseline='top';g.fillText('\u2605 = useful. Thermal is all the rest.',14,y)}}
/* ---- step 3: efficiency on a 0-150% scale ---- */
function setEff(v){const e=S.e;if(e.fin)return;e.v=Math.max(0,Math.min(150,Math.round(v/5)*5));e.bad=null;A.redraw()}
function judgeEff(){const e=S.e,D=Q.EFF[e.r],u=D.outs.find(o=>o.useful).v,t=Math.round(100*u/D.input);if(e.fin)return;
 if(e.v!==t){e.bad=e.v;A.sound.miss();return tell(Q.effNo(D,e.v),true)}
 e.done.push(`${D.name}: ${u} \u00f7 ${D.input} = ${t/100} = ${t}%`);A.sound.pop();e.r++;
 if(e.r>=Q.EFF.length){e.fin=true;e.r=Q.EFF.length-1;return tell(Q.DONE[2],false)}
 e.v=0;tell(`${u} \u00f7 ${D.input} = ${t/100}, so the ${D.name.toLowerCase()} is ${t}% efficient. Now the ${Q.EFF[e.r].name.toLowerCase()}.`,false)}
function viewEff(){const e=S.e,g=A.ctx,dk=A.col.dark,D=Q.EFF[e.r];
 const y0=Q.head(A,e.fin?Q.DONE[2]:`${D.name}: how efficient is it? Drag the marker.`,tone(e.fin),e.fin?null:S.msg,S.bad);
 const b={x:14,y:y0+2,w:A.W-28,h:Math.max(150,(A.H-y0)*.5)};Q.sankey(g,b,D,D.outs,dk);
 const sy=b.y+b.h+44,x0=26,x1=A.W-26,X=v=>x0+(x1-x0)*v/150;Z.scale={x:x0-14,y:sy-34,w:x1-x0+28,h:70,x0,x1};
 g.fillStyle=dk?'#7f1d1d':'#fee2e2';g.fillRect(X(100),sy-10,X(150)-X(100),20);g.strokeStyle=dk?'#cbd5e1':Q.EDGE;g.lineWidth=3;g.beginPath();g.moveTo(x0,sy);g.lineTo(x1,sy);g.stroke();
 for(let v=0;v<=150;v+=10){const big=v%50===0;g.lineWidth=big?3:1.5;g.beginPath();g.moveTo(X(v),sy-(big?12:6));g.lineTo(X(v),sy+(big?12:6));g.stroke();
  if(big){g.font=`800 13${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(v+'%',X(v),sy+15)}}
 g.font=`800 12${Q.F}`;g.fillStyle=dk?'#fca5a5':Q.NO;g.textAlign='center';g.textBaseline='bottom';g.fillText('impossible',(X(100)+X(150))/2,sy-12);
 const mx=X(e.v),bad=e.bad!=null;g.fillStyle=bad?Q.NO:Q.SEL;g.beginPath();g.moveTo(mx,sy-4);g.lineTo(mx-11,sy-24);g.lineTo(mx+11,sy-24);g.closePath();g.fill();
 Q.tag(g,mx,sy-36,`${e.v}%`,bad?Q.NO:Q.SEL,dk,'center');
 let y=sy+40;g.font=`800 ${A.narrow?14:15}${Q.F}`;g.fillStyle=dk?'#86efac':Q.OK;g.textAlign='left';g.textBaseline='top';e.done.forEach(t=>{g.fillText('\u2713 '+t,14,y);y+=20})}
/* ---- step 4: work done = force x distance ---- */
function setBox(d){const w=S.w;if(w.fin)return;w.d=Math.max(0,Math.min(Q.FLOOR,Math.round(d*2)/2));A.redraw()}
function judgeWork(){const w=S.w,R=Q.WORK[w.r],W=R.F*w.d;if(w.fin)return;
 if(W===R.W){w.done.push(`${R.F} N \u00d7 ${w.d} m = ${W} J`);A.sound.pop();w.r++;
  if(w.r>=Q.WORK.length){w.fin=true;w.r=Q.WORK.length-1;return tell(Q.DONE[3],false)}w.d=0;return tell(`${R.F} N \u00d7 ${R.W/R.F} m = ${R.W} J. Now push with ${Q.WORK[w.r].F} N.`,false)}
 w.bad=true;A.sound.miss();
 if(w.d===0)return tell(`The box has not moved, so ${R.F} N \u00d7 0 m = 0 J. However hard you push, no movement means no work.`,true);
 tell(`${R.F} N \u00d7 ${w.d} m = ${W} J. That is ${W>R.W?'too much':'not enough'}: push it ${W>R.W?'less far':'further'}.`,true)}
function viewWork(){const w=S.w,g=A.ctx,dk=A.col.dark,R=Q.WORK[w.r],W=R.F*w.d;
 const y0=Q.head(A,w.fin?Q.DONE[3]:`Push with ${R.F} N. Drag the box to do ${R.W} J of work.`,tone(w.fin),w.fin?null:S.msg,S.bad);
 const big=A.narrow?22:28;g.font=`900 ${big}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(`${R.F} N \u00d7 ${w.d} m = ${W} J`,A.W/2,y0+6);
 const x0=30,x1=A.W-30,fy=y0+big+130,X=d=>x0+(x1-x0)*d/Q.FLOOR,bs=A.narrow?54:64;Z.floor={x0,x1};
 g.strokeStyle=dk?'#cbd5e1':Q.EDGE;g.lineWidth=4;g.beginPath();g.moveTo(x0-16,fy);g.lineTo(x1+16,fy);g.stroke();
 for(let d=0;d<=Q.FLOOR;d++){g.lineWidth=2;g.beginPath();g.moveTo(X(d),fy);g.lineTo(X(d),fy+10);g.stroke();g.font=`800 13${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(d+' m',X(d),fy+13)}
 const bx=X(w.d);if(w.d>0){g.strokeStyle=dk?'#86efac':Q.OK;g.lineWidth=3;g.setLineDash([6,4]);g.beginPath();g.moveTo(X(0),fy-bs-14);g.lineTo(bx,fy-bs-14);g.stroke();g.setLineDash([]);Q.tag(g,(X(0)+bx)/2,fy-bs-28,`moved ${w.d} m`,Q.OK,dk,'center')}
 g.fillStyle='#b45309';Q.rr(g,bx-bs/2,fy-bs,bs,bs,6);g.fill();g.strokeStyle=dk?'#fde68a':'#78350f';g.lineWidth=2;g.stroke();g.strokeStyle='#78350f';g.lineWidth=1.5;g.beginPath();g.moveTo(bx-bs/2,fy-bs);g.lineTo(bx+bs/2,fy);g.moveTo(bx+bs/2,fy-bs);g.lineTo(bx-bs/2,fy);g.stroke();
 Z.box={x:bx-bs/2-10,y:fy-bs-10,w:bs+20,h:bs+20};
 const al=24+R.F/10,ax=bx-bs/2-4;g.fillStyle=Q.SEL;g.beginPath();g.moveTo(ax,fy-bs/2);g.lineTo(ax-14,fy-bs/2-11);g.lineTo(ax-14,fy-bs/2-4);g.lineTo(ax-al,fy-bs/2-4);g.lineTo(ax-al,fy-bs/2+4);g.lineTo(ax-14,fy-bs/2+4);g.lineTo(ax-14,fy-bs/2+11);g.closePath();g.fill();
 Q.tag(g,Math.max(40,ax-al/2),fy-bs/2-24,`${R.F} N`,Q.SEL,dk,'center');
 let y=fy+38;g.font=`800 ${A.narrow?14:15}${Q.F}`;g.fillStyle=dk?'#86efac':Q.OK;g.textAlign='left';g.textBaseline='top';w.done.forEach(t=>{g.fillText('\u2713 '+t,14,y);y+=20})}
/* ---- step 5: rank three motors ---- */
function place(ki){const r=S.r,M=Q.MOTORS[ki];if(r.order.includes(ki)||r.order.length>=3)return;r.pick=null;
 const left=Q.MOTORS.map((m,i)=>i).filter(i=>!r.order.includes(i)),best=left.reduce((a,b)=>Q.pct(Q.MOTORS[b])>Q.pct(Q.MOTORS[a])?b:a);
 if(ki!==best){r.bad=ki;A.sound.miss();return tell(Q.rankNo(M,Q.MOTORS[best]),true)}
 r.order.push(ki);r.bad=-1;A.sound.pop();tell(r.order.length===3?Q.DONE[4]:`Motor ${M.k}: ${M.use} \u00f7 ${M.input} = ${Q.pct(M)}%. Which is next?`,false)}
function viewRank(){const r=S.r,g=A.ctx,dk=A.col.dark,fin=r.order.length===3;
 const y0=Q.head(A,fin?Q.DONE[4]:'Put the motors in order, most efficient first.',tone(fin),fin?null:S.msg,S.bad);
 const sw=(A.W-32)/3,sh=A.narrow?96:104;Z.slots={x:8,y:y0+4,w:A.W-16,h:sh};
 ['Most efficient','Middle','Least efficient'].forEach((t,i)=>{const x=8+i*(sw+8),ki=r.order[i];g.fillStyle=dk?'#1e293b':'#f8fafc';Q.rr(g,x,y0+4,sw,sh,12);g.fill();g.strokeStyle=ki!=null?Q.OK:(hold&&hit(hold,Z.slots)&&i===r.order.length?Q.SEL:Q.EDGE);g.lineWidth=2;g.stroke();
  g.font=`800 ${A.narrow?12:14}${Q.F}`;g.fillStyle=dk?Q.LIGHT:Q.INK;g.textAlign='center';g.textBaseline='top';g.fillText(t,x+sw/2,y0+10);
  if(ki!=null){const M=Q.MOTORS[ki];g.font=`900 ${A.narrow?20:24}${Q.F}`;g.fillStyle=dk?'#86efac':Q.OK;g.fillText(`${M.k}: ${Q.pct(M)}%`,x+sw/2,y0+34);g.font=`700 12${Q.F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.fillText(`${M.use} \u00f7 ${M.input}`,x+sw/2,y0+66)}});
 const cy=y0+sh+18,ch=74,cw=A.W-16;Z.cards=[];let j=0;
 Q.MOTORS.forEach((M,i)=>{if(r.order.includes(i))return;const rc={ki:i,x:8,y:cy+j*(ch+10),w:cw,h:ch};j++;Z.cards.push(rc);if(hold&&hold.ki===i)return;
  Q.card(g,rc,`Motor ${M.k}: ${M.input} J in, ${M.use} J useful`,r.bad===i?'no':r.pick===i?'sel':'',A.narrow?18:20,dk)});
 if(hold&&hold.ki!=null){const M=Q.MOTORS[hold.ki];Q.card(g,{x:hold.x-cw/2,y:hold.y-ch/2,w:cw,h:ch},`Motor ${M.k}: ${M.input} J in, ${M.use} J useful`,'sel',A.narrow?18:20,dk)}}
/* ---- challenge ---- */
function why(tag){let m='Efficiency = useful output energy \u00f7 total input energy.';
 if(tag==='flip')m='That divides the input by the useful output. Efficiency is useful \u00f7 input: 100 \u00f7 400 = 0.25 = 25%.';
 if(tag==='waste')m='300 J is the wasted energy, in joules. Efficiency is the useful fraction, given as a decimal or a percentage.';
 if(tag==='over'||tag==='made')m='Energy cannot be made. The useful output can never be more than the input, so 100% is the limit.';
 if(tag==='add')m='Outputs add up to the input: 200 \u2212 150 = 50 J wasted. Adding them gives more energy out than in.';
 if(tag==='same')m='The useful and wasted arrows share the 200 J between them, so the wasted arrow is 200 \u2212 150 = 50 J.';
 if(tag==='divide'||tag==='addw')m='Work done = force \u00d7 distance: 50 N \u00d7 4 m = 200 J.';
 if(tag==='time'||tag==='force')m='Work needs movement in the direction of the force. The bag does not move, so 100 N \u00d7 0 m = 0 J. Your arm tires, but no work is done on the bag.';
 if(tag==='size')m='A gives more useful joules, but 300 \u00f7 500 = 60%. B is 80 \u00f7 100 = 80%, so B wastes a smaller fraction.';
 if(tag==='sameeff')m='Work out each fraction: A is 300 \u00f7 500 = 60% and B is 80 \u00f7 100 = 80%.';
 if(tag==='store')m='Wasted energy leaves the device, mostly by heating. It spreads out into the surroundings, where it is hard to use again.';return m}
function pose(){qn++;const T=Q.QS[qn%Q.QS.length],all=[[T.a,'ok'],...T.o],k=(qn+1)%3,list=all.slice(k).concat(all.slice(0,k));
 box.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 list.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},box.querySelector('.fl-pick'),v).onclick=()=>judge(tag,T.a)});c.say('Challenge: '+T.q);A.cv.setAttribute('aria-label','Challenge: '+T.q);A.redraw()}
function judge(tag,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Yes: ${a}.`:'\u2717 '+why(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=pose;c.say(good?'Yes.':why(tag))}
/* ---- wiring ---- */
function reset(){gen++;hold=null;for(const k in S)delete S[k];Object.assign(S,{s:null,e:{r:0,v:0,bad:null,done:[],fin:false},w:{r:0,d:0,bad:false,done:[],fin:false},r:{order:[],pick:null,bad:-1},msg:null,bad:false,check:()=>{}})}
function begin(i,goal){reset();if(i<2){const D=i?Q.MOTOR:Q.BULB;S.s={D,vals:D.outs.map(o=>o.auto?0:o.v),bad:-1,fin:false}}c.say(Q.DESC[i]);A.cv.setAttribute('aria-label',Q.DESC[i]);
 S.check=()=>{if(A.step===i&&!A.isDone&&goal()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(Q.DONE[i]+A.reveal(i))};pads();A.redraw()}
function play(i,acts){PLAN[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
const nudge=(i,dv)=>()=>{setOut(i,S.s.vals[i]+dv);judgeOut(i)};
function pads(){if(!pad)return;pad.innerHTML='';const k=key(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if((k==='bulb'||k==='motor')&&S.s&&!S.s.fin){const D=S.s.D,st=D.step*2;D.outs.forEach((o,i)=>{if(o.auto)return;
  b(`${o.n} \u2212${st} J`,nudge(i,-st),`Make the ${o.n.toLowerCase()} arrow ${st} joules smaller. It is ${S.s.vals[i]} joules now`);b(`${o.n} +${st} J`,nudge(i,st),`Make the ${o.n.toLowerCase()} arrow ${st} joules bigger. It is ${S.s.vals[i]} joules now`)})}
 if(k==='eff'&&S.e&&!S.e.fin){const D=Q.EFF[S.e.r],u=D.outs.find(o=>o.useful).v,t=Math.round(100*u/D.input),opts=[t,Math.min(150,Math.round(100*D.input/u/5)*5),100-t],r=S.e.r%3;
  opts.slice(r).concat(opts.slice(0,r)).forEach(v=>b(`${v}%`,()=>{setEff(v);judgeEff()},`Set the ${D.name.toLowerCase()} efficiency to ${v} percent`))}
 if(k==='work'&&S.w&&!S.w.fin){const R=Q.WORK[S.w.r],t=R.W/R.F;[0,t,t+1].forEach(d=>b(`Push ${d} m`,()=>{setBox(d);judgeWork()},`Push the box ${d} metres with ${R.F} newtons`))}
 if(k==='rank'&&S.r&&S.r.order.length<3)Q.MOTORS.forEach((M,i)=>{if(!S.r.order.includes(i))b(`Motor ${M.k} next`,()=>place(i),`Put motor ${M.k}, ${M.input} joules in and ${M.use} useful, in the next place`)})}
const PLAN=[
{h:'Never used up',p:Q.TXT[0],predict:{q:'A filament bulb takes in 100 J. 10 J comes out as light. How much is wasted?',opts:['0 J: the rest is used up','90 J','110 J'],ans:1},task:'Set the light arrow to 10 J',
 show:()=>play(0,[[500,()=>{setOut(0,30)}],[500,()=>{setOut(0,10);judgeOut(0)}]]),go:()=>begin(0,()=>S.s&&S.s.fin)},
{h:'Arrow widths',p:Q.TXT[1],task:'Make the motor arrows 140 J, 40 J and 20 J',
 show:()=>play(1,[[500,()=>{setOut(0,140);judgeOut(0)}],[600,()=>{setOut(1,40);judgeOut(1)}],[600,()=>{setOut(2,20);judgeOut(2)}]]),go:()=>begin(1,()=>S.s&&S.s.fin)},
{h:'Efficiency',p:Q.TXT[2],predict:{q:'A motor takes in 200 J and gives 140 J of useful kinetic energy. Its efficiency is:',opts:['70%','140%','143%'],ans:0},task:'Mark the efficiency of the motor, then the kettle',
 show:()=>play(2,[[600,()=>{setEff(70);judgeEff()}],[900,()=>{setEff(90);judgeEff()}]]),go:()=>begin(2,()=>S.e.fin)},
{h:'Work done',p:Q.TXT[3],predict:{q:'You push a heavy box with 200 N but it does not move. How much work do you do on it?',opts:['200 J','0 J','It depends how long you push'],ans:1},task:'Do 600 J of work with 200 N, then with 300 N',
 show:()=>play(3,[[600,()=>{setBox(3);judgeWork()}],[900,()=>{setBox(2);judgeWork()}]]),go:()=>begin(3,()=>S.w.fin)},
{h:'Which is best?',p:Q.TXT[4],predict:{q:'Which motor is most efficient?',opts:['A: 1000 J in, 600 J useful','B: 200 J in, 150 J useful','C: 500 J in, 200 J useful'],ans:1},task:'Rank the three motors',
 show:()=>play(4,[1,0,2].map(i=>[600,()=>place(i)])),go:()=>begin(4,()=>S.r.order.length===3)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function draw(){const g=A.ctx,dk=A.col.dark;g.fillStyle=dk?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=key();
 if(k==='chal'){const y=Q.head(A,'Challenge: efficiency, Sankey diagrams and work done','ok');Q.sankey(g,{x:14,y:y+4,w:A.W-28,h:Math.min(220,A.H-y-20)},Q.EFF[0],Q.EFF[0].outs,dk);return}
 if((k==='bulb'||k==='motor')&&S.s)viewBuild();else if(k==='eff')viewEff();else if(k==='work')viewWork();else if(k==='rank')viewRank();A.fx.draw(g)}
const slVal=(s,x)=>(x-s.x)/s.w*s.max;
function down(p){const k=key();
 if((k==='bulb'||k==='motor')&&S.s&&!S.s.fin){const s=(Z.sl||[]).find(q=>hit(p,{x:q.x-16,y:q.y,w:q.w+32,h:q.h}));if(s){hold={sl:s,x:p.x,y:p.y};setOut(s.i,slVal(s,p.x));return true}return false}
 if(k==='eff'&&!S.e.fin&&hit(p,Z.scale)){hold={eff:1,x:p.x,y:p.y};setEff((p.x-Z.scale.x0)/(Z.scale.x1-Z.scale.x0)*150);return true}
 if(k==='work'&&!S.w.fin&&hit(p,Z.box)){hold={work:1,x:p.x,y:p.y,dx:p.x-(Z.floor.x0+(Z.floor.x1-Z.floor.x0)*S.w.d/Q.FLOOR)};return true}
 if(k==='rank'){const cd=(Z.cards||[]).find(q=>hit(p,q));if(cd){hold={ki:cd.ki,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(hit(p,Z.slots)&&S.r.pick!=null)place(S.r.pick);return false}return false}
function move(p){if(!hold)return;hold.x=p.x;hold.y=p.y;const k=key();
 if(hold.sl)setOut(hold.sl.i,slVal(hold.sl,p.x));else if(hold.eff)setEff((p.x-Z.scale.x0)/(Z.scale.x1-Z.scale.x0)*150);
 else if(hold.work)setBox((p.x-hold.dx-Z.floor.x0)/(Z.floor.x1-Z.floor.x0)*Q.FLOOR);else A.redraw()}
function up(p){if(!hold)return;const h=hold,k=key();hold=null;
 if(h.sl)return judgeOut(h.sl.i);if(h.eff)return judgeEff();if(h.work)return judgeWork();
 if(k==='rank'){const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;if(hit(p,Z.slots)||tap)return place(h.ki);A.redraw()}}
FK.shell(c,{steps:PLAN,ratio:.75,tall:1.4,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Energy lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});pads()}}).start()})})();
