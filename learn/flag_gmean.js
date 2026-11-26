/* Flagship – estimating the mean from grouped data (Mathematics, ages 13-15; GCSE S4 'estimate the mean from grouped
   data using midpoints', modal class and median class). Choose the midpoint of each height class on a number line,
   build the f x midpoint column and pick the right divisor, slide the pupils inside one class to see why the answer is
   only an estimate, find the modal and median classes with a running total, then reshape the histogram and watch the
   estimate move. Data and drawings: gmean_art.js. */
(()=>{const G=GME;
VIS.reg('flaggmean',c=>{
let A,ctl,chal,qi=-1,epoch=0,drag=null,hit=[],axisX=null,rows=[],divs=[],bars=[],band=null;const S={};
const STEPS=['mid','fm','why','cls','play','chal'],now=()=>STEPS[A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const one=v=>(Math.round(v*10)/10).toFixed(1);
function reply(msg,bad){S.msg=msg;S.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);buttons();A.redraw();S.check()}
const mood=f=>f?'ok':S.bad?'no':'';
/* ---- 1: midpoints on a number line ---- */
function choose(i,v){const s=S.m;if(s.set[i])return;if(v===G.mid(i)){s.set[i]=1;s.wrong=null;A.sound.pop();const n=s.set.filter(Boolean).length;
  return reply(`${G.lab(i)}: midpoint ${v} cm = (${G.LO[i]} + ${G.LO[i]+G.W}) \u00f7 2.${n===5?' All five done.':''}`,false)}
 s.wrong={i,v};A.sound.miss();
 if(v===G.LO[i])return reply(`${v} is the lower boundary. Pupils in ${G.lab(i)} are ${v} cm or more, so ${v} is too low for most of them. Use the middle.`,true);
 if(v===G.LO[i]+G.W)return reply(`Nobody in ${G.lab(i)} is ${v} cm: that height belongs to the next class. Use halfway between ${G.LO[i]} and ${v}.`,true);
 reply(`The midpoint is halfway between the boundaries ${G.LO[i]} and ${G.LO[i]+G.W}.`,true)}
function drawMid(){const s=S.m,g=A.ctx,dk=A.col.dark,n=s.set.filter(Boolean).length,fin=n===5,y0=G.top(A,fin?G.DONE[0]:`Tap or drag the pin to the value that stands for each class. (${n} of 5)`,mood(fin),S.msg,S.bad);
 const x0=24,x1=A.W-24,ly=Math.max(y0+130,A.H*.62);/* fixed height so the line does not jump when a reply appears */axisX=G.axis(g,x0,x1,ly,130,180,dk);band={x:x0-12,y:ly-120,w:x1-x0+24,h:150};
 G.LO.forEach((lo,i)=>{const bx=axisX(lo),bw=axisX(lo+G.W)-bx;g.fillStyle=G.BAR[i]+(dk?'55':'26');g.fillRect(bx+1,ly-96,bw-2,90);g.strokeStyle=G.BAR[i];g.lineWidth=2;g.strokeRect(bx+1,ly-96,bw-2,90);
  G.txt(g,`${lo}\u2013`,bx+bw/2,ly-78,A.narrow?12:14,dk?G.LIGHT:G.INK,'center','middle',800);G.txt(g,`${lo+G.W}`,bx+bw/2,ly-62,A.narrow?12:14,dk?G.LIGHT:G.INK,'center','middle',800);
  if(s.set[i]){const mx=axisX(G.mid(i));g.fillStyle=dk?'#86efac':G.OK;g.beginPath();g.arc(mx,ly-26,9,0,7);g.fill();G.txt(g,String(G.mid(i)),mx,ly-42,14,dk?'#86efac':G.OK,'center','middle',800)}
  if(s.wrong&&s.wrong.i===i){const wx=axisX(s.wrong.v);g.strokeStyle=G.NO;g.lineWidth=3;g.beginPath();g.moveTo(wx-7,ly-33);g.lineTo(wx+7,ly-19);g.moveTo(wx+7,ly-33);g.lineTo(wx-7,ly-19);g.stroke()}});
 const pv=drag?drag.v:null;if(pv!=null){const px=axisX(pv);g.fillStyle=G.SEL;g.beginPath();g.moveTo(px,ly-2);g.lineTo(px-9,ly-20);g.lineTo(px+9,ly-20);g.closePath();g.fill();G.txt(g,`${pv} cm`,px,ly-110,15,dk?'#93c5fd':G.SEL,'center','middle',800)}
 G.fit(g,'Each box is one class: lower boundary \u2264 h < upper boundary',A.W-32,`700 ${A.narrow?13:15}px system-ui,sans-serif`).forEach((t,j)=>G.txt(g,t,16,ly+52+j*18,A.narrow?13:15,dk?'#cbd5e1':'#475569'))}
const snap=x=>{const v=130+(x-24)/(A.W-48)*50;return Math.max(130,Math.min(180,Math.round(v/5)*5))};
const classOf=x=>Math.max(0,Math.min(4,Math.floor((130+(x-24)/(A.W-48)*50-130)/10)));
/* ---- 2: f x midpoint and the divisor ---- */
function fill(i){const s=S.f;if(s.row[i])return;s.row[i]=1;A.sound.pop();const n=s.row.filter(Boolean).length;
 reply(`${G.F[i]} \u00d7 ${G.mid(i)} = ${G.FM[i]}: the ${G.F[i]} pupils in ${G.lab(i)} counted at ${G.mid(i)} cm each.${n===5?` Total ${G.SUM}. Now choose what to divide by.`:''}`,false)}
function divide(k){const s=S.f;if(s.row.some(v=>!v)){A.sound.miss();return reply('First fill every f \u00d7 midpoint cell, then add them up.',true)}const D=G.DIV[k];
 if(!D[2]){s.bad=k;A.sound.miss();return reply(D[3],true)}s.div=1;s.bad=-1;A.sound.pop();reply(`${G.SUM} \u00f7 ${G.N} = ${one(G.EST)} cm. That is between 130 and 180, so it is sensible.`,false)}
function drawFM(){const s=S.f,g=A.ctx,dk=A.col.dark,fin=!!s.div,n=s.row.filter(Boolean).length,y0=G.top(A,fin?G.DONE[1]:n<5?`Tap each row to work out f \u00d7 midpoint. (${n} of 5)`:'Total found. What do you divide it by?',mood(fin),S.msg,S.bad);
 const cols=[0,.38,.5,.76].map(t=>16+t*(A.W-32)),rh=Math.min(40,(A.H-y0-150)/6),fs=A.narrow?13:15,head=['Height h (cm)','f','Midpoint','f \u00d7 mid'];
 head.forEach((h,k)=>G.txt(g,h,cols[k],y0+16,fs,dk?'#cbd5e1':'#334155','left','middle',800));rows=[];
 G.LO.forEach((lo,i)=>{const y=y0+30+i*rh,r={i,x:8,y,w:A.W-16,h:rh-4};rows.push(r);g.fillStyle=s.row[i]?(dk?'#14532d':'#dcfce7'):(dk?'#1e293b':'#ffffff');G.round(g,r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=s.row[i]?G.OK:G.EDGE;g.lineWidth=s.row[i]?2:1;g.stroke();
  const cy=y+rh/2-2,col=s.row[i]?(dk?G.LIGHT:G.INK):(dk?G.LIGHT:G.INK);G.txt(g,G.lab(i),cols[0],cy,fs,col,'left','middle',700);G.txt(g,String(G.F[i]),cols[1],cy,fs+1,col,'left','middle',800);G.txt(g,String(G.mid(i)),cols[2],cy,fs+1,col,'left','middle',800);
  G.txt(g,s.row[i]?String(G.FM[i]):'tap',cols[3],cy,fs+1,s.row[i]?col:(dk?'#93c5fd':G.SEL),'left','middle',800)});
 const ty=y0+30+5*rh+4;G.txt(g,`Total: ${G.N}`,cols[1]-28,ty+12,fs+1,dk?G.LIGHT:G.INK,'left','middle',800);G.txt(g,n===5?`Total: ${G.SUM}`:'Total: ?',cols[3]-20,ty+12,fs+1,dk?G.LIGHT:G.INK,'left','middle',800);
 const dw=(A.W-32)/3,dy=ty+34;divs=G.DIV.map((D,k)=>({k,x:8+k*(dw+8),y:dy,w:dw,h:52}));divs.forEach(r=>{const D=G.DIV[r.k],st=s.div&&D[2]?'ok':s.bad===r.k?'no':'';
  g.fillStyle=st==='ok'?'#dcfce7':st==='no'?'#fee2e2':'#ffffff';G.round(g,r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=st==='ok'?G.OK:st==='no'?G.NO:G.EDGE;g.lineWidth=st?3:1.5;g.stroke();
  G.fit(g,`${n===5?G.SUM:'Total'} ${D[0]}`,r.w-10,`800 ${A.narrow?13:15}px system-ui,sans-serif`).forEach((t,j,a)=>G.txt(g,t,r.x+r.w/2,r.y+r.h/2+(j-(a.length-1)/2)*17,A.narrow?13:15,G.INK,'center','middle',800))});
 if(fin)G.txt(g,`Estimated mean \u2248 ${one(G.EST)} cm`,A.W/2,dy+80,A.narrow?18:21,dk?'#86efac':G.OK,'center','middle',800)}
/* ---- 3: why it is only an estimate ---- */
function slide(cm){const s=S.w;s.c=Math.max(G.SPAN[0],Math.min(G.SPAN[1],cm));if(s.c<=G.SPAN[0]+.25)s.lo=1;if(s.c>=G.SPAN[1]-.25)s.hi=1;const t=G.trueMean(s.c);
 reply(`All 12 near ${one(s.c)} cm: true mean ${one(t)} cm, estimate still ${one(G.EST)} cm (${t<G.EST-.05?'estimate too high':t>G.EST+.05?'estimate too low':'they match'}).`,false)}
function drawWhy(){const s=S.w,g=A.ctx,dk=A.col.dark,fin=s.lo&&s.hi,y0=G.top(A,fin?G.DONE[2]:'Drag the 12 pupils to the shortest end of 160\u2013170, then to the tallest end.',mood(fin),S.msg,S.bad);
 const x0=30,x1=A.W-30,ly=Math.max(y0+100,A.H*.5),X=G.axis(g,x0,x1,ly,160,170,dk);axisX=X;band={x:x0-20,y:ly-90,w:x1-x0+40,h:110};
 g.fillStyle=G.BAR[G.SPOT]+(dk?'40':'1f');g.fillRect(x0,ly-80,x1-x0,78);G.txt(g,'Class 160 \u2264 h < 170: 12 pupils',x0,ly-88,A.narrow?13:15,dk?G.LIGHT:G.INK,'left','bottom',800);
 for(let k=0;k<12;k++){const v=s.c+((k%4)-1.5)*.35,y=ly-16-Math.floor(k/4)*20;g.fillStyle=G.BAR[G.SPOT];g.beginPath();g.arc(X(Math.max(160,Math.min(169.9,v))),y,8,0,7);g.fill();g.strokeStyle=dk?'#f8fafc':'#ffffff';g.lineWidth=1.5;g.stroke()}
 const mx=X(165);g.setLineDash([5,4]);g.strokeStyle=dk?'#cbd5e1':G.EDGE;g.lineWidth=2;g.beginPath();g.moveTo(mx,ly-80);g.lineTo(mx,ly);g.stroke();g.setLineDash([]);G.txt(g,'midpoint 165',mx+4,ly-70,13,dk?'#cbd5e1':'#475569','left','middle',700);
 const by=ly+104,x2=30,x3=A.W-30,Y=G.axis(g,x2,x3,by,150,170,dk),t=G.trueMean(s.c);
 [[G.EST,'Estimate',G.SEL,'#93c5fd',-1],[t,'True mean',G.OK,'#86efac',1]].forEach(([v,l,cl,cd,side])=>{const px=Y(v);g.fillStyle=dk?cd:cl;g.beginPath();g.moveTo(px,by-2);g.lineTo(px-8,by-16);g.lineTo(px+8,by-16);g.closePath();g.fill();
  G.txt(g,`${l} ${one(v)}`,Math.max(60,Math.min(A.W-60,px+side*4)),by-24-(side>0?18:0),A.narrow?13:15,dk?cd:cl,side>0?'left':'right','bottom',800)});
 G.txt(g,'Mean of all 30 pupils (cm)',x2,by+44,13,dk?'#cbd5e1':'#475569','left','middle',700);
 G.txt(g,`${s.lo?'\u2713':'\u25cb'} shortest end   ${s.hi?'\u2713':'\u25cb'} tallest end`,16,A.H-18,15,dk?G.LIGHT:G.INK,'left','middle',800)}
/* ---- 4: modal class and median class ---- */
function pick(i){const s=S.c;if(s.done)return;const f=G.F;
 if(s.phase==='mode'){if(G.modal(f).includes(i)){s.mode=i;s.phase='med';s.badI=-1;A.sound.pop();return reply(`Modal class ${G.lab(i)}: the biggest frequency, ${f[i]}. Now find the class with the median.`,false)}
  s.badI=i;A.sound.miss();return reply(i===2?'That is the middle class, not the most common one. Look for the tallest bar.':`That class has frequency ${f[i]}. The modal class has the biggest frequency.`,true)}
 const m=G.medClass(f);if(i===m){s.med=i;s.done=1;s.badI=-1;A.sound.pop();return reply(`Median at place (30 + 1) \u00f7 2 = 15.5: running totals 2, 7, 13, 25, so the 15th and 16th pupils are in ${G.lab(i)}.`,false)}
 s.badI=i;A.sound.miss();reply(i===2?'The middle row is not the median. Running totals 2, 7, 13: only 13 pupils so far, so the 15th and 16th are in the next class.':`Count up the running totals until you pass 15.5. ${G.lab(i)} ends at ${G.cum(f)[i]}.`,true)}
function drawCls(){const s=S.c,g=A.ctx,dk=A.col.dark,fin=!!s.done,y0=G.top(A,fin?G.DONE[3]:s.phase==='mode'?'Tap the modal class.':'Now tap the class that holds the median height.',mood(fin),S.msg,S.bad);
 const r={x:20,y:y0+30,w:A.W-40,h:Math.min(220,A.H-y0-130)},st=G.F.map((_,i)=>i===s.badI?'no':i===s.mode||i===s.med?'ok':'');bars=G.hist(g,r,G.F,13,st,dk);
 if(s.phase!=='mode'){const cm=G.cum(G.F);G.txt(g,'Running total:',20,r.y+r.h+44,13,dk?'#cbd5e1':'#475569','left','middle',700);bars.forEach((b,i)=>G.txt(g,String(cm[i]),b.x+b.w/2,r.y+r.h+64,16,dk?G.LIGHT:G.INK,'center','middle',800))}
 G.txt(g,'Height h (cm), 30 pupils',20,A.H-14,13,dk?'#cbd5e1':'#475569','left','middle',700)}
/* ---- 5: reshape the histogram ---- */
function setF(i,v){const s=S.p;s.f[i]=Math.max(0,Math.min(12,Math.round(v)));if(s.f.every(x=>!x))s.f[i]=1;const e=G.estimate(s.f);if(e>165)s.hi=1;if(e<145)s.lo=1;
 reply(`Frequencies ${s.f.join(', ')}: estimated mean ${one(e)} cm, modal class ${G.modal(s.f).map(G.short).join(' and ')}.`,false)}
function shift(up){const s=S.p,f=s.f,from=up?f.findIndex(x=>x>0):4-[...f].reverse().findIndex(x=>x>0),to=up?Math.min(4,from+1):Math.max(0,from-1);if(from===to){A.sound.miss();return reply(up?'Everyone is already in the tallest class.':'Everyone is already in the shortest class.',true)}
 f[from]--;f[to]++;setF(to,f[to])}
function drawPlay(){const s=S.p,g=A.ctx,dk=A.col.dark,fin=s.hi&&s.lo,e=G.estimate(s.f),y0=G.top(A,fin?G.DONE[4]:'Drag bar tops. Make the estimate go above 165 cm, then below 145 cm.',mood(fin),S.msg,S.bad);
 const r={x:20,y:y0+30,w:A.W-40,h:Math.min(200,A.H-y0-178)};bars=G.hist(g,r,s.f,13,null,dk);
 const ay=r.y+r.h+72,X=G.axis(g,20,A.W-20,ay,130,180,dk),px=X(e);g.fillStyle=dk?'#93c5fd':G.SEL;g.beginPath();g.moveTo(px,ay-2);g.lineTo(px-9,ay-18);g.lineTo(px+9,ay-18);g.closePath();g.fill();
 G.txt(g,`Estimate ${one(e)} cm`,Math.max(70,Math.min(A.W-70,px)),ay-24,15,dk?'#93c5fd':G.SEL,'center','bottom',800);
 G.txt(g,`${s.hi?'\u2713':'\u25cb'} above 165   ${s.lo?'\u2713':'\u25cb'} below 145`,16,A.H-16,15,dk?G.LIGHT:G.INK,'left','middle',800)}
/* ---- challenge ---- */
function slipMsg(tag){let m='Estimated mean = total of f \u00d7 midpoint \u00f7 total frequency.';
 if(tag==='bound')m='That is a class boundary. Use the midpoint, halfway between the two boundaries.';
 if(tag==='width')m='That is the class width, not a value in the class. The midpoint of 20 to 30 is 25.';
 if(tag==='rows')m='Divide by the total frequency, not the number of classes, and do not stop at the total.';
 if(tag==='exact')m='The midpoint is a guess for every value in its class. The real values are unknown, so the mean is an estimate.';
 if(tag==='freq')m='That is a frequency. The modal class is the class with the biggest frequency.';
 if(tag==='middle')m='The middle row is not special. Use the biggest frequency for the mode and a running total for the median.';
 if(tag==='range')m='A mean always lies between the smallest and largest values, so it must be inside the grouped range.';
 return m}
function ask(){qi++;const Q=G.QS[qi%G.QS.length],all=[[Q.a,'ok'],...Q.o],rot=(qi+2)%3,order=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>judge(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
/* ---- wiring ---- */
const VIEW={mid:drawMid,fm:drawFM,why:drawWhy,cls:drawCls,play:drawPlay};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){const y=G.top(A,'Challenge: grouped data','ok');G.hist(g,{x:40,y:y+30,w:A.W-80,h:Math.min(150,A.H-y-80)},G.F,13,null,A.col.dark);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=now();
 if(k==='mid'&&inR(p,band)){drag={v:snap(p.x),i:classOf(p.x)};A.redraw();return true}
 if(k==='fm'){const r=rows.find(q=>inR(p,q));if(r){fill(r.i);return false}const d=divs.find(q=>inR(p,q));if(d)divide(d.k);return false}
 if(k==='why'&&inR(p,band)){drag={why:1};slideAt(p);return true}
 if(k==='cls'){const b=bars.find(q=>inR(p,q));if(b)pick(b.i);return false}
 if(k==='play'){const b=bars.find(q=>inR(p,{x:q.x,y:q.y-20,w:q.w,h:q.h+20}));if(b){drag={bar:b.i,r:b};barAt(p);return true}}return false}
const slideAt=p=>{S.w.c=Math.max(G.SPAN[0],Math.min(G.SPAN[1],160+(p.x-30)/(A.W-60)*10));A.redraw()};
const barAt=p=>{const b=drag.r;S.p.f[drag.bar]=Math.max(0,Math.min(12,Math.round((b.y+b.h-p.y)/b.h*13)));A.redraw()};
function move(p){if(!drag)return;if(drag.why)return slideAt(p);if(drag.bar!=null)return barAt(p);drag.v=snap(p.x);drag.i=classOf(p.x);A.redraw()}
function up(p){if(!drag)return;const d=drag;drag=null;if(d.why)return slide(S.w.c);if(d.bar!=null)return setF(d.bar,S.p.f[d.bar]);
 if(S.m.set[d.i])return reply(`${G.lab(d.i)} is done. Pick another class.`,false);choose(d.i,d.v)}
function wipe(){epoch++;drag=null;for(const k in S)delete S[k];
 Object.assign(S,{m:{set:[0,0,0,0,0],wrong:null},f:{row:[0,0,0,0,0],div:0,bad:-1},w:{c:165,lo:0,hi:0},c:{phase:'mode',badI:-1},p:{f:[...G.F],hi:0,lo:0},msg:null,bad:false,check:()=>{}})}
function open(i,over){wipe();c.say(G.DESC[i]);A.cv.setAttribute('aria-label',G.DESC[i]);
 S.check=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(G.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=now(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if(k==='mid'){const i=S.m.set.indexOf(0);if(i>=0)[G.LO[i],G.mid(i),G.LO[i]+G.W].forEach(v=>b(`${G.short(i)}: ${v}`,()=>choose(i,v),`Use ${v} cm to stand for the class ${G.lab(i)}`))}
 if(k==='fm'){const i=S.f.row.indexOf(0);if(i>=0)b(`Work out row ${G.short(i)}`,()=>fill(i),`Work out f times midpoint for ${G.lab(i)}`);else if(!S.f.div)G.DIV.forEach((D,j)=>b(D[0],()=>divide(j),`Divide the total by ${D[0].slice(2)}`))}
 if(k==='why')[[G.SPAN[0],'shortest'],[165,'middle'],[G.SPAN[1],'tallest']].forEach(([v,w])=>b(`Move to ${v} cm`,()=>slide(v),`Move all 12 pupils to the ${w} end, ${v} cm`));
 if(k==='cls'&&!S.c.done)G.LO.forEach((_,i)=>b(G.short(i),()=>pick(i),`${S.c.phase==='mode'?'Modal class':'Median class'}: ${G.lab(i)}`));
 if(k==='play'){b('Move a pupil up a class',()=>shift(1),'Move one pupil from the shortest filled class up one class');b('Move a pupil down a class',()=>shift(0),'Move one pupil from the tallest filled class down one class')}}
const PLAN=[
{h:'Midpoints',p:G.TXT[0],predict:{q:'Which single value best stands for every pupil in 150 \u2264 h < 160?',opts:['150, where the class starts','155, the midpoint','10, the class width'],ans:1},task:'Choose the midpoint of all 5 classes',
 show:()=>auto(0,G.LO.map((_,i)=>[550,()=>choose(i,G.mid(i))])),go:()=>open(0,()=>S.m.set.every(Boolean))},
{h:'f \u00d7 midpoint',p:G.TXT[1],predict:{q:'The f \u00d7 midpoint column adds up to 4780. What do you divide it by?',opts:['5, the number of classes','30, the total frequency'],ans:1},task:'Fill the column and divide correctly',
 show:()=>auto(1,[...G.LO.map((_,i)=>[450,()=>fill(i)]),[700,()=>divide(1)]]),go:()=>open(1,()=>!!S.f.div)},
{h:'Why only an estimate?',p:G.TXT[2],predict:{q:'If all 12 pupils in 160 \u2264 h < 170 are really 161 cm, how does the true mean compare with the estimate?',opts:['Higher than the estimate','Lower than the estimate','Exactly the same'],ans:1},task:'Slide the pupils to both ends of the class',
 show:()=>auto(2,[[600,()=>slide(G.SPAN[0])],[1200,()=>slide(G.SPAN[1])]]),go:()=>open(2,()=>S.w.lo&&S.w.hi)},
{h:'Modal and median class',p:G.TXT[3],predict:{q:'Which class holds the median height?',opts:['150 \u2264 h < 160, the middle row','160 \u2264 h < 170'],ans:1},task:'Tap the modal class, then the median class',
 show:()=>auto(3,[[600,()=>pick(3)],[900,()=>pick(G.medClass(G.F))]]),go:()=>open(3,()=>!!S.c.done)},
{h:'Reshape the data',p:G.TXT[4],task:'Push the estimate above 165 cm and below 145 cm',
 show:()=>auto(4,[[500,()=>{S.p.f=[0,0,2,6,12];setF(4,12)}],[1400,()=>{S.p.f=[12,6,2,0,0];setF(0,12)}]]),go:()=>open(4,()=>S.p.hi&&S.p.lo)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
FK.shell(c,{steps:PLAN,ratio:.62,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Grouped mean lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});buttons()}}).start()})})();
