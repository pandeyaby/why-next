/* Flagship: polar exploration then and now (ages 9–11; NC England KS2 geography "human and physical geography of a region"
   and KS2 science "working scientifically"; topic evidence: compare Heroic Age exploration (1897–1922) with modern polar
   science, name technologies that make it possible, and know today's teams are diverse and international).
   Sort kit into 1911 or today, race a dog sledge and a ski plane over the same 1,280 km, give each old science question its
   new tool, drill an ice core and read its trapped air, and sort who went then and who goes now. Every drag has a button. */
(()=>{
const C={ink:'#111827',soft:'#374151',card:'#fffdf8',rim:'#1f2937',old:'#7c2d12',oldBg:'#ffedd5',nw:'#1e3a8a',nwBg:'#dbeafe',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',snow:'#f1f5f9',ice:'#bae6fd',deep:'#0c4a6e',tip:'#fff7ed'};
const BINS=['Heroic Age, 1897–1922','Polar science today'];
const {KIT,TEAM,QS,TOOLS,CORE,DIST,KM,SLED,PLANE,Q,FIX}=POLSCIART;
VIS.reg('flagpolsci',c=>{let A,X,pad,box,nq=-1,job=0;const S={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const say=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function txt(t,x,y,n,col,wt,al){X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(t),x,y)}
function fitTxt(t,x,y,maxW,n,col,wt,al){let k=n;X.font=`${wt||700} ${z(k)}px system-ui,sans-serif`;while(k>8&&X.measureText(String(t)).width>maxW){k-=.5;X.font=`${wt||700} ${z(k)}px system-ui,sans-serif`}txt(t,x,y,k,col,wt,al)}
function lines(t,w,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const wd of String(t).split(' ')){const nx=cur?cur+' '+wd:wd;if(cur&&X.measureText(nx).width>w){out.push(cur);cur=wd}else cur=nx}out.push(cur);return out}
function box2(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
function block(t,x,y,w,h,n,col){const L=lines(t,w-16,n),lh=z(n)+4;L.forEach((r,i)=>txt(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function banner(t,won){const L=lines(t,A.W-44,14),lh=z(14)+4,h=Math.max(z(36),L.length*lh+14);box2(12,10,A.W-24,h,won?C.okBg:C.tip,won?C.ok:C.rim,2);L.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?C.ok:C.ink));return 10+h}
function note(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=z(13)+5,h=L.length*lh+12,y=A.H-h-10;box2(12,y,A.W-24,h,'#ffffff',S.bad?C.bad:C.ok,3);L.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.bad:C.ink))}
const wrong=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const right=m=>{S.bad=false;S.msg=m;A.sound.pop()};
const mode=()=>['kit','trip','tools','core','team','quiz'][A.step];
/* --- sorting: one card at a time into two bins (steps kit and team) --- */
const deck=()=>mode()==='kit'?KIT:TEAM;
function place(bin){if(S.won||S.i>=deck().length)return;const [t,ok,why]=deck()[S.i];if(bin!==ok)return wrong(why);S.done[ok].push(deck()[S.i][3]||t);S.i++;right(`${t}: ${BINS[ok]}.`);
 if(S.i===deck().length){S.won=true;S.msg=mode()==='kit'?'All 8 sorted. Satellites, planes and steel ships changed polar travel.':'All 6 sorted. Teams today are international, and women and men work side by side.'}sync()}
function drawSort(t0,b0){const w=(A.W-s3(40))/2,bh=Math.max(z(90),(b0-t0)*.52),by=b0-bh;S.binR=[0,1].map(i=>{const r={x:s3(14)+i*(w+s3(12)),y:by,w,h:bh,i};box2(r.x,r.y,w,bh,i?C.nwBg:C.oldBg,i?C.nw:C.old,2.5);fitTxt(BINS[i],r.x+w/2,r.y+z(16),w-12,13,i?C.nw:C.old,900);
  S.done[i].slice(-4).forEach((q,j)=>fitTxt('• '+q,r.x+8,r.y+z(38)+j*z(18),w-14,11,C.ink,600,'left'));return r});
 if(S.i<deck().length){const cw=Math.min(A.W-s3(60),z(330)),ch=Math.min(by-t0-z(14),z(64)),d=S.drag,x=d?d.x-cw/2:(A.W-cw)/2,y=d?d.y-ch/2:t0+z(6);S.cardR={x:(A.W-cw)/2,y:t0+z(6),w:cw,h:ch};
  box2(x,y,cw,ch,'#ffffff',d?C.nw:C.rim,d?3.5:2.5);block(deck()[S.i][0],x,y,cw,ch,15,C.ink);txt(`${S.i+1} of ${deck().length}`,A.W/2,y+ch+z(10),11,C.soft,700)}else S.cardR=null}
const s3=n=>z(n);
/* --- the trip: one slider, two travellers --- */
function setTrip(v){if(S.won)return;S.t=Math.max(0,Math.min(1,v));const k=S.who;if(S.t>=.999&&!S.arr[k]){S.arr[k]=true;right(k?`Ski plane: about ${PLANE} hours for about ${KM} km at 300 km/h.`:`Dog sledge: ${SLED} days for about ${KM} km, about ${Math.round(DIST/SLED)} km a day.`);
  if(S.arr[0]&&S.arr[1]){S.won=true;S.msg=`Same trip, about ${KM} km: ${SLED} days by sledge in 1911, about ${PLANE} hours by plane today.`}}sync()}
function swapWho(k){if(S.won)return;S.who=k;S.t=S.arr[k]?1:0;sync()}
function drawTrip(t0,b0){const x0=s3(30),x1=A.W-s3(30),rowH=(b0-t0-z(70))/2;['Dog sledge, 1911','Ski plane, today'].forEach((nm,k)=>{const y=t0+z(20)+k*(rowH+z(8)),on=S.who===k,f=S.arr[k]?1:on?S.t:0;
  box2(x0-s3(14),y,x1-x0+s3(28),rowH,on?(k?C.nwBg:C.oldBg):'#ffffff',k?C.nw:C.old,on?3:1.5);txt(nm,x0,y+z(16),13,k?C.nw:C.old,900,'left');
  const ly=y+rowH*.62;X.strokeStyle=C.soft;X.lineWidth=3;X.setLineDash([6,5]);X.beginPath();X.moveTo(x0,ly);X.lineTo(x1,ly);X.stroke();X.setLineDash([]);
  txt('Base',x0,ly+z(16),11,C.soft,700,'left');txt('South Pole',x1,ly+z(16),11,C.soft,700,'right');const px=x0+(x1-x0)*f;X.fillStyle=k?C.nw:C.old;X.beginPath();
  if(k){X.moveTo(px+12,ly);X.lineTo(px-10,ly-8);X.lineTo(px-6,ly);X.lineTo(px-10,ly+8);X.closePath()}else{X.rect(px-12,ly-7,24,14)}X.fill();
  const tm=k?(f*PLANE).toFixed(1)+' hours':Math.round(f*SLED)+' days';txt(tm,x1,y+z(16),14,C.ink,900,'right')});
 const sy=b0-z(30);S.bar={x:x0,y:sy-z(16),w:x1-x0,h:z(32)};X.fillStyle='#e5e7eb';A.paint.rrect(x0,sy-5,x1-x0,10,5);X.fill();X.fillStyle=S.who?C.nw:C.old;X.beginPath();X.arc(x0+(x1-x0)*S.t,sy,z(13),0,7);X.fill();txt('Drag the time',A.W/2,sy+z(22),11,C.soft,700)}
/* --- same questions, new tools --- */
function giveTool(tool){if(S.won)return;const q=QS[S.i];if(tool!==q[2])return wrong(`${tool} does not answer “${q[0]}” Think what measures that today.`);right(`${q[0]} Then: ${q[1]}. Now: ${q[2]}.`);S.i++;
 if(S.i===QS.length){S.won=true;S.msg='The questions are old. Heroic Age teams did science too; the tools are new.'}sync()}
function drawTools(t0,b0){const n=QS.length,rh=Math.min(z(46),(b0-t0-z(70))/n),w=A.W-s3(28);QS.forEach((q,i)=>{const y=t0+z(6)+i*(rh+4),on=i===S.i,dn=i<S.i;box2(s3(14),y,w,rh,dn?C.okBg:on?'#ffffff':'#f3f4f6',dn?C.ok:on?C.nw:'#9ca3af',on?3:1.5);
  fitTxt(q[0]+(dn?'  ✓':''),s3(24),y+rh*.32,w-20,12,C.ink,900,'left');fitTxt('Then: '+q[1]+(dn?'  →  Now: '+q[2]:''),s3(24),y+rh*.72,w-20,11,dn?C.ok:C.old,700,'left')});
 const ty=b0-z(62),tw=(A.W-s3(40))/2;S.toolR=TOOLS.map((t,i)=>{const r={x:s3(14)+(i%2)*(tw+s3(12)),y:ty+Math.floor(i/2)*z(31),w:tw,h:z(27),t};box2(r.x,r.y,tw,r.h,C.nwBg,C.nw,1.5);fitTxt(t,r.x+tw/2,r.y+r.h/2,tw-10,11,C.nw,800);return r})}
/* --- ice core --- */
function drill(f){if(S.won)return;S.d=Math.max(0,Math.min(1,f));CORE.forEach((s,i)=>{if(S.d>=s[0]&&!S.got.includes(i)){S.got.push(i);right(`Sample: ${s[1]}. Its air bubbles hold ${s[2]} ppm of carbon dioxide.`)}});
 if(S.got.length===3&&S.order==null){S.order=[];S.msg+=' Now tap the samples from oldest to youngest.'}sync()}
function pickOld(i){if(S.won||S.order==null||S.order.includes(i))return;const want=[2,1,0][S.order.length];if(i!==want)return wrong('Snow falls on top each year. The deepest sample fell first, so it is the oldest.');S.order.push(i);right(CORE[i][1]+'.');
 if(S.order.length===3){S.won=true;S.msg='Deeper is older. Air today has over 420 ppm of carbon dioxide, far more than any sample.'}sync()}
function drawCore(t0,b0){const cx=s3(30),cw=Math.min(s3(130),A.W*.3),top=t0+z(10),bot=b0-z(16),h=bot-top;box2(cx,top,cw,h,C.ice,C.deep,2);
 for(let k=1;k<14;k++){const y=top+h*(1-Math.pow(1-k/14,1.6));X.strokeStyle='rgba(12,74,110,.35)';X.lineWidth=1;X.beginPath();X.moveTo(cx,y);X.lineTo(cx+cw,y);X.stroke()}
 txt('Surface',cx+cw+8,top+z(8),11,C.soft,700,'left');txt('Bedrock, 3.2 km down',cx+cw+8,bot-z(6),11,C.soft,700,'left');
 const dy=top+h*S.d;X.fillStyle=C.deep;X.fillRect(cx+cw/2-4,top,8,dy-top);X.beginPath();X.moveTo(cx+cw/2-12,dy-10);X.lineTo(cx+cw/2+12,dy-10);X.lineTo(cx+cw/2,dy+6);X.closePath();X.fill();S.drillR={x:cx,y:top,w:cw,h};
 const rx=cx+cw+s3(14),rw=A.W-rx-s3(14);S.sampR=S.got.map((i,j)=>{const r={x:rx,y:top+z(30)+j*z(52),w:rw,h:z(46),i},used=S.order&&S.order.includes(i);box2(r.x,r.y,rw,r.h,used?C.okBg:'#ffffff',used?C.ok:C.nw,2);
  block(CORE[i][1]+' · '+CORE[i][2]+' ppm CO₂',r.x,r.y,rw,r.h,11,C.ink);return r})}
function drawQuiz(t0,b0){block('Then: dogs, sextants, wooden ships, no way to call home. Now: GPS, satellites, ski planes, heated stations, ice cores and teams from many countries.',s3(20),t0+z(10),A.W-s3(40),b0-t0-z(20),15,C.soft)}
function draw(){X.fillStyle=A.col.dark?'#1f2937':C.card;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.card;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=mode(),H={kit:['1911 or today? Drag the card to a box.','All kit sorted.'],trip:['Pick a traveller, then drag the time to the Pole.','Days then, hours now.'],tools:['Give the question its new tool. Tap a tool.','Old questions, new tools.'],
  core:['Drag the drill down the ice. Collect 3 samples.','Deeper is older.'],team:['Who went then, who goes now? Drag to a box.','Teams then and now.'],quiz:['Then and now.','']};
 const t=banner(H[k][S.won?1:0]||H[k][0],S.won),bot=A.H-(S.msg?z(70):z(12));
 if(k==='kit'||k==='team')drawSort(t+z(4),bot);if(k==='trip')drawTrip(t,bot);if(k==='tools')drawTools(t,bot);if(k==='core')drawCore(t,bot);if(k==='quiz')drawQuiz(t,bot);note();A.fx.draw(X)}
let p0=null;
function down(p){const k=mode();p0=p;if(S.won&&k!=='quiz')return false;
 if((k==='kit'||k==='team')&&hit(p,S.cardR)){S.drag={x:p.x,y:p.y};A.redraw();return true}
 if((k==='kit'||k==='team')){const r=(S.binR||[]).find(q=>hit(p,q));if(r){place(r.i);return true}}
 if(k==='trip'&&S.bar&&p.y>S.bar.y-z(10)&&p.y<S.bar.y+S.bar.h+z(10)){S.slide=true;setTrip((p.x-S.bar.x)/S.bar.w);return true}
 if(k==='tools'){const r=(S.toolR||[]).find(q=>hit(p,q));if(r){giveTool(r.t);return true}}
 if(k==='core'){const r=(S.sampR||[]).find(q=>hit(p,q));if(r){pickOld(r.i);return true}if(hit(p,S.drillR)){S.slide=true;drill((p.y-S.drillR.y)/S.drillR.h);return true}}
 return false}
function move(p){const k=mode();if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}if(S.slide&&k==='trip')setTrip((p.x-S.bar.x)/S.bar.w);if(S.slide&&k==='core')drill(Math.max(S.d,(p.y-S.drillR.y)/S.drillR.h))}
function up(p){S.slide=false;const d=S.drag;S.drag=null;if(!d)return;const r=(S.binR||[]).find(q=>hit(p,q));if(r)place(r.i);else A.redraw()}
function sync(){const k=mode();let d='Challenge.';
 if(k==='kit'||k==='team')d=S.won?'All sorted.':`Card ${S.i+1} of ${deck().length}: ${deck()[S.i][0]}. Boxes: ${BINS.join(' or ')}.`;
 if(k==='trip')d=`${S.who?'Ski plane':'Dog sledge'} selected. Sledge ${S.arr[0]?'arrived':'not there yet'}, plane ${S.arr[1]?'arrived':'not there yet'}.`;
 if(k==='tools')d=S.won?'All four questions have new tools.':`Question: ${QS[S.i][0]} Then: ${QS[S.i][1]}. Pick the new tool.`;
 if(k==='core')d=`Drill depth ${Math.round(S.d*3200)} m. Samples: ${S.got.length} of 3.`+(S.order?` Ordered: ${S.order.length} of 3.`:'');
 say((S.msg?S.msg+' ':'')+d);pads();S.after()}
function pads(){if(!pad)return;pad.innerHTML='';const k=mode(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};if(S.won)return A.redraw();
 if((k==='kit'||k==='team')&&S.i<deck().length)BINS.forEach((n,i)=>b(n,()=>place(i)));
 if(k==='trip'){b('Dog sledge',()=>swapWho(0));b('Ski plane',()=>swapWho(1));b('Time: +25%',()=>setTrip(S.t+.25))}
 if(k==='tools')TOOLS.forEach(t=>b(t,()=>giveTool(t)));
 if(k==='core'){if(S.got.length<3)b('Drill deeper',()=>drill(S.d+.2));else CORE.forEach((s,i)=>{if(!S.order.includes(i))b(s[1],()=>pickOld(i))})}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function reset(){job++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,i:0,done:[[],[]],drag:null,slide:false,t:0,who:0,arr:[false,false],d:0,got:[],order:null})}
const steps=[
{h:'Kit then and now',p:'The Heroic Age of polar exploration ran from 1897 to 1922. Teams had no satellites, no planes and no radio on the ice.',
predict:{q:'Amundsen reached the South Pole in December 1911. How did the world find out?',opts:['He radioed from the Pole','By ship and telegraph, months later','By satellite phone'],ans:1},
task:'Sort all 8 cards',show:()=>{steps[0].go();demo(KIT.map(q=>()=>place(q[1])),320)},go:()=>{reset();sync();S.after=ready(0,()=>S.won,'Kit sorted.')}},
{h:'Days then, hours now',p:'Amundsen’s team skied about 1,500 km from base to the Pole. His dog teams took 56 days. A ski plane flies at about 300 km/h.',
predict:{q:'How long does a ski plane take for the same trip?',opts:['About 56 days','About 5 hours','About 2 weeks'],ans:1},
task:'Get both travellers to the Pole',show:()=>{steps[1].go();demo([()=>setTrip(.5),()=>setTrip(1),()=>swapWho(1),()=>setTrip(1)],500)},go:()=>{reset();sync();S.after=ready(1,()=>S.won,'Both at the Pole.')}},
{h:'Old questions, new tools',p:'Heroic Age teams did science: they kept weather records and Scott’s team hauled fossil rocks from the Beardmore Glacier. Today the questions are the same, but the tools are new.',
predict:{q:'Did Heroic Age explorers do any science?',opts:['No, they only raced','Yes: rocks, fossils and weather records','Only after 1959'],ans:1},
task:'Give 4 questions their new tool',show:()=>{steps[2].go();demo(QS.map(q=>()=>giveTool(q[2])),450)},go:()=>{reset();sync();S.after=ready(2,()=>S.won,'New tools for old questions.')}},
{h:'Reading an ice core',p:'Snow piles up each year and is squashed into ice. Tiny bubbles trap the air of that year. Scientists drill out a long tube of ice, an ice core, to read old air.',
predict:{q:'Ice near the bottom of the ice sheet is…',opts:['younger than the top','older than the top','the same age'],ans:1},
task:'Drill 3 samples and put them in age order',show:()=>{steps[3].go();demo([()=>drill(.5),()=>drill(1),()=>pickOld(2),()=>pickOld(1),()=>pickOld(0)],500)},go:()=>{reset();sync();S.after=ready(3,()=>S.won,'Deeper ice is older ice.')}},
{h:'Teams then and now',p:'In 1911 the teams were small, all men, and each worked for one country. In 1969 the first women reached the South Pole: six women, including the team of the geochemist Lois Jones.',
predict:{q:'When did the first women reach the South Pole?',opts:['1911','1969','2020'],ans:1},
task:'Sort all 6 cards',show:()=>{steps[4].go();demo(TEAM.map(q=>()=>place(q[1])),320)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Teams sorted.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function ask(){nq++;const [q,ok,bad]=Q[nq%Q.length],all=[[ok,'ok']].concat(bad),r=nq%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ok)});say('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=tag==='ok';let m=FIX[tag]||'Think: what did teams have in 1911, and what came later?';
 if(tag==='radio')m='No radio went on the trek. The news went by ship to Hobart, then by telegraph in March 1912.';
 if(tag==='young')m='The deepest ice is the oldest: each year’s snow lands on top of the last.';
 if(tag==='men')m='Not any more. The first women reached the South Pole in 1969, and today women lead polar science teams.';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Polar then and now lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
