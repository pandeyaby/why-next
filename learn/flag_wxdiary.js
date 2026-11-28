/* Flagship – Local weather patterns (Science, ages 5-6; NGSS K-ESS2-1, NC England Y1 Seasonal changes). The learner
   keeps a weather diary from five window views, moves each day into a Sunny / Cloudy / Rainy block chart to find the
   week's pattern by counting, taps the warmer of a 9 am and a 2 pm thermometer for five days, sorts sentences into
   'a pattern' or 'just one day', and sorts weather cards into winter or summer. Data and drawings: wxdiary_art.js. */
(()=>{const D=WXD;
VIS.reg('flagwxdiary',c=>{c.fig.classList.add('young');
let A,row,chalBox,cq=-1,run=0,grab=null,hot={};const W={};
const ORDER=['diary','tally','warm','sort','season','chal'],now=()=>ORDER[A.step];
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function reply(text,wrong){W.msg=text;W.wrong=!!wrong;c.say(text);A.cv.setAttribute('aria-label',text);controls();A.redraw();W.test()}
const toneOf=f=>f?'ok':W.wrong?'no':'';
/* ---- step 1: record the window view ---- */
function record(i,kind){const s=W.diary,Dy=D.WEEK[i];if(s.put[i]!=null)return;s.pick=null;
 if(kind!==Dy.w){s.bad=i;A.sound.miss();return reply(`Look at ${Dy.day}'s window: ${D.SEEN[Dy.w]}. That is ${D.NAME[Dy.w].toLowerCase()}.`,true)}
 s.put[i]=kind;s.bad=null;A.sound.pop();reply(`${Dy.day}: ${D.NAME[kind].toLowerCase()}.`,false)}
function drawDiary(){const s=W.diary,g=A.ctx,dk=A.col.dark,n=Object.keys(s.put).length,fin=n===5;
 const y0=D.head(A,fin?D.DONE[0]:`What did you see? Put a symbol under each window. (${n} of 5)`,toneOf(fin),W.msg,W.wrong);
 const cw=(A.W-16)/5,side=Math.min(cw-8,78),sh=A.narrow?54:64;hot={days:[],syms:[]};
 D.WEEK.forEach((Dy,i)=>{const x=8+i*cw+(cw-side)/2;g.font=`800 ${A.narrow?14:16}${D.F}`;g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='top';g.fillText(Dy.d,x+side/2,y0+2);
  D.window_(g,{x,y:y0+22,w:side,h:side},Dy.w);const slot={i,x,y:y0+30+side,w:side,h:sh};hot.days.push(slot);const k=s.put[i],over=grab&&within(grab,slot);
  if(k){D.card(g,slot,'','ok');D.icon(g,k,slot.x+slot.w/2,slot.y+slot.h/2,Math.min(side,sh)*.8)}
  else{g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#0f172a':'#f8fafc');D.rr(g,slot.x,slot.y,side,sh,10);g.fill();g.setLineDash([6,5]);g.strokeStyle=s.bad===i?D.NO:over?D.SEL:(dk?'#cbd5e1':D.EDGE);g.lineWidth=2.5;g.stroke();g.setLineDash([])}});
 if(fin)return;const ty=y0+44+side+sh,tw=Math.min(130,(A.W-32)/3),th=Math.min(96,A.H-ty-10);
 D.KINDS.forEach((k,j)=>{const r={k,x:A.W/2-1.5*tw-8+j*(tw+8),y:ty,w:tw,h:th};hot.syms.push(r);if(grab&&grab.k===k)return;D.card(g,r,'',s.pick===k?'sel':'');D.icon(g,k,r.x+r.w/2,r.y+r.h*.4,th*.55);
  g.font=`800 ${A.narrow?14:16}${D.F}`;g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='bottom';g.fillText(D.NAME[k],r.x+r.w/2,r.y+r.h-5)});
 if(grab&&grab.k){D.card(g,{x:grab.x-tw/2,y:grab.y-th/2,w:tw,h:th},'','sel');D.icon(g,grab.k,grab.x,grab.y-th*.1,th*.55)}}
/* ---- step 2: count the days in a block chart ---- */
function file(i,kind){const s=W.tally,Dy=D.WEEK[i];if(s.at[i]!=null)return;s.pick=null;
 if(kind!==Dy.w){s.bad=i;A.sound.miss();return reply(`${Dy.day} was ${D.NAME[Dy.w].toLowerCase()} in the diary, so it goes in ${D.NAME[Dy.w]}.`,true)}
 s.at[i]=kind;s.bad=null;A.sound.pop();const n=Object.values(s.at).filter(v=>v===kind).length;reply(`${D.NAME[kind]}: ${n} ${n===1?'day':'days'} so far.`,false)}
function drawTally(){const s=W.tally,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===5;
 const y0=D.head(A,fin?D.DONE[1]:`Move each day into its column. Then count. (${n} of 5)`,toneOf(fin),W.msg,W.wrong);
 const cw=(A.W-16)/5,dh=A.narrow?64:72;hot={days:[],cols:[]};
 D.WEEK.forEach((Dy,i)=>{if(s.at[i]!=null)return;const r={i,x:8+i*cw+2,y:y0+2,w:cw-4,h:dh};hot.days.push(r);if(grab&&grab.i===i)return;
  D.card(g,r,'',s.bad===i?'no':s.pick===i?'sel':'');D.icon(g,Dy.w,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,dh)*.6);g.font=`800 14${D.F}`;g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='bottom';g.fillText(Dy.d,r.x+r.w/2,r.y+r.h-3)});
 const qy=y0+dh+14,qw=(A.W-24)/3,qh=A.H-qy-10,bh=Math.min(56,(qh-60)/3.4);
 D.KINDS.forEach((k,j)=>{const r={k,x:8+j*(qw+4),y:qy,w:qw,h:qh};hot.cols.push(r);const over=grab&&grab.i!=null&&within(grab,r);
  g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':'#ffffff');D.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=over?D.SEL:D.EDGE;g.lineWidth=over?3:1.5;g.stroke();
  const got=D.WEEK.map((_,i)=>i).filter(i=>s.at[i]===k);g.font=`800 ${A.narrow?15:17}${D.F}`;g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='bottom';g.fillText(`${D.NAME[k]}: ${got.length}`,r.x+r.w/2,r.y+r.h-6);
  got.forEach((i,q)=>{const b={x:r.x+5,y:r.y+r.h-34-(q+1)*(bh+4),w:r.w-10,h:bh};D.card(g,b,'','ok');D.icon(g,k,b.x+b.h*.45,b.y+b.h/2,b.h*.55);g.font=`800 14${D.F}`;g.fillStyle=D.INK;g.textAlign='left';g.textBaseline='middle';g.fillText(D.WEEK[i].d,b.x+b.h*.85,b.y+b.h/2)})});
 if(grab&&grab.i!=null){const r={x:grab.x-cw/2,y:grab.y-dh/2,w:cw-4,h:dh};D.card(g,r,'','sel');D.icon(g,D.WEEK[grab.i].w,grab.x,grab.y-6,Math.min(cw,dh)*.6)}}
/* ---- step 3: morning or afternoon? ---- */
function warmer(when){const s=W.warm;if(s.i>=D.TEMPS.length)return;const T=D.TEMPS[s.i];
 if(when!=='pm'){s.bad='am';A.sound.miss();return reply(`At 9 am it was ${T.am} \u00b0C. The red line is shorter, so the morning was colder. At 2 pm it was ${T.pm} \u00b0C.`,true)}
 s.bad=null;s.res.push(T);s.i++;A.sound.pop();reply(`${T.day}: 2 pm was warmer, ${T.pm} \u00b0C against ${T.am} \u00b0C.`,false)}
function drawWarm(){const s=W.warm,g=A.ctx,dk=A.col.dark,fin=s.i>=D.TEMPS.length,T=D.TEMPS[Math.min(s.i,4)];
 const y0=D.head(A,fin?D.DONE[2]:`${T.day}: which time was warmer? Tap it.`,toneOf(fin),W.msg,W.wrong);hot={th:[]};
 const tw=Math.min(150,(A.W-40)/2),th=Math.min(250,(A.H-y0)*.55);
 if(!fin)[['am','9 am',T.am],['pm','2 pm',T.pm]].forEach(([k,lab,t],j)=>{const r={k,x:A.W/2-tw-8+j*(tw+16),y:y0+26,w:tw,h:th};hot.th.push(r);
  g.font=`800 ${A.narrow?16:18}${D.F}`;g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='bottom';g.fillText(lab,r.x+tw/2,r.y-4);D.thermo(g,r,t,dk,s.bad===k?'no':'')});
 const ly=fin?y0+8:y0+th+40;g.font=`700 ${A.narrow?14:16}${D.F}`;g.textAlign='left';g.textBaseline='top';
 s.res.forEach((R,i)=>{g.fillStyle=dk?'#86efac':D.OK;g.fillText(`\u2713 ${R.day}: 9 am ${R.am} \u00b0C, 2 pm ${R.pm} \u00b0C`,14,ly+i*(A.narrow?21:24))});
 if(!fin)return;const cy=ly+5*(A.narrow?21:24)+34,ch=A.H-cy-30,gw=(A.W-40)/5,bw=Math.min(28,gw/2-6);g.font=`800 14${D.F}`;g.textBaseline='bottom';
 [['9 am','#2563eb'],['2 pm','#dc2626']].forEach(([t,col],j)=>{g.fillStyle=col;g.fillRect(14+j*90,cy-26,14,14);g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='left';g.fillText(t,32+j*90,cy-11)});
 D.TEMPS.forEach((T,i)=>{const x=20+i*gw+gw/2;[[T.am,'#2563eb',-1],[T.pm,'#dc2626',1]].forEach(([v,col,sd])=>{const h=ch*v/20;g.fillStyle=col;g.fillRect(x+(sd<0?-bw-2:2),cy+ch-h,bw,h)});
  g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='top';g.fillText(D.WEEK[i].d,x,cy+ch+4)});
 g.strokeStyle=dk?'#cbd5e1':D.EDGE;g.lineWidth=1.5;g.beginPath();g.moveTo(14,cy+ch);g.lineTo(A.W-14,cy+ch);g.stroke()}
/* ---- steps 4 and 5: sort cards into two boxes ---- */
const SETS={sort:{cards:D.SAYS,bins:D.BINS4,key:'p',no:C=>D.NO4[C.p]},season:{cards:D.SEASON,bins:D.BINS5,key:'s',no:C=>C.no}};
function place(i,b){const k=now(),Z=SETS[k],s=W[k],C=Z.cards[i];if(s.at[i]!=null)return;s.pick=null;
 if(C[Z.key]!==b){s.bad=i;A.sound.miss();return reply(Z.no(C),true)}
 s.at[i]=b;s.bad=-1;A.sound.pop();reply(`'${C.t}': ${Z.bins[b].toLowerCase()}.`,false)}
function drawSort(){const k=now(),Z=SETS[k],s=W[k],g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===Z.cards.length,i=ORDER.indexOf(k);
 const y0=D.head(A,fin?D.DONE[i]:`Drag each card into a box. (${n} of ${Z.cards.length})`,toneOf(fin),W.msg,W.wrong);
 const bw=(A.W-24)/2,bh=Math.min(190,(A.H-y0)*.42);hot={bins:[],cards:[]};
 Z.bins.forEach((lab,b)=>{const r={b,x:8+b*(bw+8),y:y0+2,w:bw,h:bh};hot.bins.push(r);const over=grab&&grab.c!=null&&within(grab,r);
  g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':['#eff6ff','#fff7ed'][b]);D.rr(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=[D.SEL,'#c2410c'][b];g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?16:18}${D.F}`;g.fillStyle=dk?D.LIGHT:D.INK;g.textAlign='center';g.textBaseline='top';g.fillText(lab,r.x+bw/2,r.y+8);
  if(k==='season'){if(b)D.sun(g,r.x+bw-22,r.y+20,30);else{g.fillStyle=dk?'#e0f2fe':'#0369a1';g.font=`900 20${D.F}`;g.fillText('\u2744',r.x+bw-20,r.y+8)}}
  g.font=`700 ${A.narrow?12:14}${D.F}`;g.fillStyle=dk?'#86efac':D.OK;let yy=r.y+36;Z.cards.forEach((C,j)=>{if(s.at[j]!==b)return;D.lines(g,C.t,bw-14,g.font).forEach(t=>{g.fillText(t,r.x+bw/2,yy);yy+=A.narrow?15:17});yy+=3})});
 const cy=y0+bh+12,cw=(A.W-28)/2,ch=A.narrow?62:60;let j=0;
 Z.cards.forEach((C,ci)=>{if(s.at[ci]!=null)return;const r={c:ci,x:8+(j%2)*(cw+12),y:cy+Math.floor(j/2)*(ch+10),w:cw,h:ch};j++;hot.cards.push(r);if(grab&&grab.c===ci)return;D.card(g,r,C.t,s.bad===ci?'no':s.pick===ci?'sel':'',17)});
 if(grab&&grab.c!=null)D.card(g,{x:grab.x-cw/2,y:grab.y-ch/2,w:cw,h:ch},Z.cards[grab.c].t,'sel',17)}
/* ---- challenge ---- */
function slip(tag){let m='Count the days in the diary to find the pattern.';
 if(tag==='count')m='Count every day in the diary. The weather with the most days is the pattern, not the one you remember best.';
 if(tag==='morn')m='Mornings are usually cooler. The sun warms the air all day, so the afternoon is usually warmer.';
 if(tag==='one')m='That is just one day. A pattern is something that happens again and again.';
 if(tag==='season')m='Where there are four seasons, frost and snow come in winter, when the days are cold and short.';
 if(tag==='always')m='A pattern is what usually happens. One rainy day does not stop a mostly sunny week.';
 if(tag==='why')m='Writing it down cannot change the weather. A diary lets us count days and compare them.';return m}
function quiz(){cq++;const T=D.QS[cq%D.QS.length],opts=[[T.a,'ok'],...T.o],k=(cq+2)%3,list=opts.slice(k).concat(opts.slice(0,k));
 chalBox.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 list.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chalBox.querySelector('.fl-pick'),v).onclick=()=>score(tag,T.a)});c.say('Challenge: '+T.q);A.cv.setAttribute('aria-label','Challenge: '+T.q);A.redraw()}
function score(tag,a){chalBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chalBox.querySelector('.fl-fb'),ok=tag==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Right: ${a}.`:'\u2717 '+slip(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Right.':slip(tag))}
/* ---- wiring ---- */
const PAINT={diary:drawDiary,tally:drawTally,warm:drawWarm,sort:drawSort,season:drawSort};
function draw(){const g=A.ctx,dk=A.col.dark;g.fillStyle=dk?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){const y=D.head(A,'Challenge: local weather patterns','ok'),s=Math.min(90,A.W/5);D.KINDS.forEach((q,j)=>D.icon(g,q,A.W/2+(j-1)*s*1.3,y+s*.8,s));return}PAINT[k]();A.fx.draw(g)}
function down(p){const k=now();
 if(k==='diary'){const t=hot.syms.find(q=>within(p,q));if(t){grab={k:t.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const d=hot.days.find(q=>within(p,q));if(d&&W.diary.pick)record(d.i,W.diary.pick);return false}
 if(k==='tally'){const d=hot.days.find(q=>within(p,q));if(d){grab={i:d.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const col=hot.cols.find(q=>within(p,q));if(col&&W.tally.pick!=null)file(W.tally.pick,col.k);return false}
 if(k==='warm'){const t=hot.th.find(q=>within(p,q));if(t)warmer(t.k);return false}
 if(k==='sort'||k==='season'){const cd=hot.cards.find(q=>within(p,q));if(cd){grab={c:cd.c,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const b=hot.bins.find(q=>within(p,q));if(b&&W[k].pick!=null)place(W[k].pick,b.b)}return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){if(!grab)return;const h=grab,k=now(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;grab=null;
 if(k==='diary'){const d=hot.days.find(q=>within(p,q));if(d)return record(d.i,h.k);if(tap){W.diary.pick=h.k;return reply(`Picked ${D.NAME[h.k].toLowerCase()}. Now tap a day.`,false)}return A.redraw()}
 if(k==='tally'){const col=hot.cols.find(q=>within(p,q));if(col)return file(h.i,col.k);if(tap){W.tally.pick=h.i;return reply(`Picked ${D.WEEK[h.i].day}. Now tap a column.`,false)}return A.redraw()}
 const b=hot.bins.find(q=>within(p,q));if(b)return place(h.c,b.b);if(tap){W[k].pick=h.c;return reply('Picked a card. Now tap a box.',false)}A.redraw()}
function fresh(){run++;grab=null;for(const k in W)delete W[k];
 Object.assign(W,{diary:{put:{},pick:null,bad:null},tally:{at:{},pick:null,bad:null},warm:{i:0,res:[],bad:null},sort:{at:{},pick:null,bad:-1},season:{at:{},pick:null,bad:-1},msg:null,wrong:false,test:()=>{}})}
function enter(i,met){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);
 W.test=()=>{if(A.step===i&&!A.isDone&&met()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(D.DONE[i]+A.reveal(i))};controls();A.redraw()}
function demo(i,list){PLAN[i].go();const e=run;list.forEach((f,j)=>setTimeout(()=>{if(e===run)f()},420*(j+1)))}
function controls(){if(!row)return;row.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='diary'&&W.diary){const i=D.WEEK.findIndex((_,j)=>W.diary.put[j]==null);if(i>=0)D.KINDS.forEach(q=>add(`${D.WEEK[i].d}: ${D.NAME[q]}`,()=>record(i,q),`Record ${D.WEEK[i].day} as ${D.NAME[q].toLowerCase()}`))}
 if(k==='tally'&&W.tally){const i=D.WEEK.findIndex((_,j)=>W.tally.at[j]==null);if(i>=0)D.KINDS.forEach(q=>add(`${D.WEEK[i].d} in ${D.NAME[q]}`,()=>file(i,q),`Move ${D.WEEK[i].day} into the ${D.NAME[q]} column`))}
 if(k==='warm'&&W.warm&&W.warm.i<D.TEMPS.length){const T=D.TEMPS[W.warm.i];add('9 am was warmer',()=>warmer('am'),`${T.day}: the 9 am thermometer was warmer`);add('2 pm was warmer',()=>warmer('pm'),`${T.day}: the 2 pm thermometer was warmer`)}
 if((k==='sort'||k==='season')&&W[k]){const Z=SETS[k],i=Z.cards.findIndex((_,j)=>W[k].at[j]==null);if(i>=0)Z.bins.forEach((lab,b)=>add(lab,()=>place(i,b),`Put '${Z.cards[i].t}' in ${lab}`))}}
const PLAN=[
{h:'Weather diary',p:D.TXT[0],task:'Record the weather for all 5 days',
 show:()=>demo(0,D.WEEK.map((Dy,i)=>()=>record(i,Dy.w))),go:()=>enter(0,()=>Object.keys(W.diary.put).length===5)},
{h:'Count the days',p:D.TXT[1],predict:{q:'Tuesday was sunny sports day. Everyone remembers it. Which weather came most this week?',opts:['Sunny','Rainy','Cloudy'],ans:1},task:'Move all 5 days into the chart',
 show:()=>demo(1,D.WEEK.map((Dy,i)=>()=>file(i,Dy.w))),go:()=>enter(1,()=>Object.keys(W.tally.at).length===5)},
{h:'Morning or afternoon?',p:D.TXT[2],predict:{q:'Is the air usually warmer in the morning or in the afternoon?',opts:['In the morning','In the afternoon','No difference'],ans:1},task:'Find the warmer time for all 5 days',
 show:()=>demo(2,D.TEMPS.map(()=>()=>warmer('pm'))),go:()=>enter(2,()=>W.warm.i>=D.TEMPS.length)},
{h:'Pattern or one day?',p:D.TXT[3],predict:{q:'"It was sunny on Tuesday." Is that a weather pattern?',opts:['Yes','No, it is just one day','Only if it was very sunny'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(3,D.SAYS.map((C,i)=>()=>place(i,C.p))),go:()=>enter(3,()=>Object.keys(W.sort.at).length===D.SAYS.length)},
{h:'Winter and summer',p:D.TXT[4],task:'Sort all 6 weather cards',
 show:()=>demo(4,D.SEASON.map((C,i)=>()=>place(i,C.s))),go:()=>enter(4,()=>Object.keys(W.season.at).length===D.SEASON.length)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.5,draw,onStep:X=>{chalBox.hidden=X.step!==5;row.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Weather patterns lab buttons'},w);chalBox=c.el('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up});controls()}}).start()})})();
