/* Flagship: midnight sun and polar night (ages 5–7; NC England Y1 seasonal changes "how day length varies", KS1 geography
   hot and cold areas and the North and South Poles, NGSS 1-ESS1-1 and 1-ESS1-2 daylight and time of year).
   Drag the clock through a June day at home, then the same day at the North Pole (the Sun never sets) and a December day
   there (it never rises). Spin a leaning Earth to see why, then sort what you would see at home and at the pole. */
(()=>{
const {alt,TILT,PLACES,BINS,CARDS,BANK,WHY}=MIDSUN;
const Q={ink:'#111827',soft:'#374151',card:'#fffdf8',edge:'#1f2937',tip:'#fff7ed',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',
 day:'#bae6fd',dusk:'#fdba74',night:'#1e293b',sun:'#facc15',sunE:'#a16207',grass:'#65a30d',snow:'#f1f5f9',snowE:'#94a3b8',star:'#fef9c3',lit:'#fef3c7',dark:'#334155',sea:'#38bdf8'};
VIS.reg('flagmidsun',c=>{let A,X,pad,quiz,qn=-1,inrow=0,job=0;const S={after:()=>{}};
const k=n=>Math.round(n*(A.narrow?1:1.12));
function voice(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function put(s,x,y,n,col,w,al){X.font=`${w||700} ${k(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function fold(s,maxW,n){X.font=`700 ${k(n)}px system-ui,sans-serif`;const L=[];let row='';for(const w of String(s).split(' ')){const t=row?row+' '+w:w;if(row&&X.measureText(t).width>maxW){L.push(row);row=w}else row=t}L.push(row);return L}
function pill(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||12);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function title(s,won){const L=fold(s,A.W-44,15),lh=k(15)+4,h=Math.max(k(38),L.length*lh+14);pill(12,10,A.W-24,h,won?Q.okBg:Q.tip,won?Q.ok:Q.edge,2);L.forEach((r,i)=>put(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,15,won?Q.ok:Q.ink));return 10+h}
function msgBox(){if(!S.msg)return 0;const L=fold((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,14),lh=k(14)+5,h=L.length*lh+12,y=A.H-h-10;pill(12,y,A.W-24,h,'#ffffff',S.bad?Q.bad:Q.ok,3);L.forEach((r,i)=>put(r,A.W/2,y+6+lh*(i+.5),14,S.bad?Q.bad:Q.ink));return h+14}
const no=s=>{S.bad=true;S.msg=s;A.sound.miss();sync()};
const yes=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const kind=()=>['home','june','dec','lean','sort','quiz'][A.step];
const hourName=h=>{h=((Math.round(h)%24)+24)%24;return h===0?'midnight':h===12?'midday':h<12?h+' in the morning':(h-12)+(h<18?' in the afternoon':' at night')};
/* ---------- sky days: S.hour 0–24, S.seen = hours visited ---------- */
function place(){return PLACES[kind()]||PLACES.home}
function sunH(h){const P=place();return alt(P[1],P[2],h)}
function setHour(h){if(S.won&&S.full)return;h=Math.max(0,Math.min(24,h));const from=S.hour;S.hour=h;const a=Math.min(from,h),b=Math.max(from,h);for(let t=Math.floor(a);t<=Math.min(23,Math.floor(b));t++)S.seen.add(t);
 const up=sunH(h)>0;S.bad=false;S.msg=`${hourName(h)}: the Sun is ${up?'up':'down'}.`;if(up!==S.wasUp){S.flips++;S.wasUp=up}
 if(S.seen.size>=24&&!S.full){S.full=true;S.won=true;const K=kind();
  S.msg=K==='home'?'A whole day at home: the Sun came up and went down. About 16 hours of light, 8 of dark.':K==='june'?'A whole day and the Sun never set! It went round the sky. This is the midnight sun.':'A whole day and the Sun never came up. This is the polar night.';A.sound.pop()}
 sync()}
function playDay(){const id=++job;S.hour=0;S.seen=new Set([0]);let t=0;const tick=()=>{if(id!==job)return;t+=1;setHour(t);if(t<24)setTimeout(tick,A.reduced()?30:110)};tick()}
function skyCol(a){return a>2?Q.day:a>-6?Q.dusk:Q.night}
function drawSky(t0,b0){const x0=k(14),w=A.W-2*k(14),stripH=k(64),skyB=b0-stripH-k(6),hor=t0+(skyB-t0)*.66,top=t0+k(4),scale=(hor-top-k(46))/64,K=kind(),a=sunH(S.hour);
 pill(x0,top,w,skyB-top,skyCol(a),Q.edge,2,14);
 if(a<-6){X.fillStyle=Q.star;const sh=Math.max(10,hor-top-k(30));for(let i=0;i<22;i++){X.beginPath();X.arc(x0+k(8)+((i*197+i*i*37)%(w-k(16))),top+k(26)+((i*131+i*i*17)%sh),i%4?1.6:2.6,0,7);X.fill()}}
 X.fillStyle=K==='home'?Q.grass:Q.snow;X.fillRect(x0+1,hor,w-2,skyB-hor-1);X.strokeStyle=K==='home'?'#3f6212':Q.snowE;X.lineWidth=3;X.beginPath();X.moveTo(x0,hor);X.lineTo(x0+w,hor);X.stroke();
 put(K==='home'?'Land (horizon)':'Snow and ice (horizon)',x0+w/2,hor+k(16),13,Q.ink,800);
 X.setLineDash([5,5]);X.strokeStyle=a<-6?'#cbd5e1':Q.soft;X.lineWidth=2;X.beginPath();for(let h=0;h<=24;h+=.25){const x=x0+k(10)+(w-k(20))*h/24,y=hor-sunH(h)*scale;h?X.lineTo(x,y):X.moveTo(x,y)}X.stroke();X.setLineDash([]);
 const sx=x0+k(10)+(w-k(20))*S.hour/24,sy=hor-a*scale;X.save();X.beginPath();X.rect(x0,top,w,hor-top);X.clip();X.fillStyle=Q.sun;X.strokeStyle=Q.sunE;X.lineWidth=2.5;X.beginPath();X.arc(sx,sy,k(16),0,7);X.fill();X.stroke();X.restore();
 if(a<=0){X.fillStyle=Q.sun;X.globalAlpha=.55;X.beginPath();X.arc(sx,hor+k(34),k(9),0,7);X.fill();X.globalAlpha=1;put('Sun is below',sx,hor+k(50)>skyB-k(6)?hor+k(34):hor+k(50),11,Q.ink,800)}
 put(place()[0],x0+w/2,top+k(14),13,a<-6?'#f8fafc':Q.ink,900);
 S.strip={x:x0,y:skyB+k(6),w,h:stripH};pill(x0,S.strip.y,w,stripH,'#ffffff',Q.edge,2,12);
 for(let h=0;h<24;h++){const xa=x0+k(10)+(w-k(20))*h/24,xb=x0+k(10)+(w-k(20))*(h+1)/24;X.fillStyle=skyCol(sunH(h+.5));X.fillRect(xa,S.strip.y+k(8),xb-xa,k(14));if(!S.seen.has(h)){X.fillStyle='rgba(255,255,255,.7)';X.fillRect(xa,S.strip.y+k(8),xb-xa,k(14))}}
 [['midnight',0],['morning',6],['midday',12],['evening',18],['midnight',24]].forEach(([n,h],i)=>{if(A.narrow&&(i===1||i===3))return;put(n,i===0?x0+k(6):i===4?x0+w-k(6):x0+k(10)+(w-k(20))*h/24,S.strip.y+stripH-k(14),12,Q.ink,800,i===0?'left':i===4?'right':'center')});
 X.fillStyle=Q.edge;X.beginPath();X.arc(sx,S.strip.y+k(15),k(12),0,7);X.fill();X.fillStyle=Q.sun;X.beginPath();X.arc(sx,S.strip.y+k(15),k(8),0,7);X.fill()}
/* ---------- leaning Earth ---------- */
function pt(lat,lon,month){const e=TILT*Math.PI/180,s=month==='june'?-1:1,ax=[s*Math.sin(e),Math.cos(e),0],e1=[Math.cos(e),-s*Math.sin(e),0],cl=Math.cos(lat*Math.PI/180),sl=Math.sin(lat*Math.PI/180);
 return[0,1,2].map(i=>cl*Math.cos(lon)*e1[i]+cl*Math.sin(lon)*(i===2?1:0)+sl*ax[i])}
function spin(then){if(S.spinning)return;S.spinning=true;const id=++job,start=S.lon,month=S.month;let t=0;const go=()=>{if(id!==job){S.spinning=false;return}t+=1/24;S.lon=start+t*2*Math.PI;A.redraw();if(t<1)setTimeout(go,A.reduced()?20:70);else{S.spinning=false;spun(month);then&&then()}};go()}
function spun(month){S.done.add(month);yes(month==='june'?'June: the North Pole stayed in the sunlight all the way round. Home went into the dark for the night.':'December: the North Pole stayed in the dark all the way round. Home still got some daylight.');
 if(S.done.has('june')&&S.done.has('dec')){S.won=true;S.msg='Earth leans. Lean toward the Sun: light all day. Lean away: dark all day.'}sync()}
function setMonth(m){if(S.spinning)return;S.month=m;S.turn=0;yes(m==='june'?'June: the top of the Earth leans toward the Sun.':'December: Earth is on the other side of the Sun, so the top leans away.');sync()}
function drawLean(t0,b0){const h=b0-t0,R=Math.min(h*.33,A.W*.26),cx=A.W*.6,cy=t0+h*.55,m=S.month;
 X.fillStyle=Q.sun;X.strokeStyle=Q.sunE;X.lineWidth=2;X.beginPath();X.arc(k(34),cy,k(26),0,7);X.fill();X.stroke();put('Sun',k(34),cy+k(40),13,Q.ink,900);
 X.strokeStyle='#eab308';X.lineWidth=2;for(let i=-2;i<=2;i++){X.beginPath();X.moveTo(k(66),cy+i*R*.4);X.lineTo(cx-R-k(8),cy+i*R*.4);X.stroke()}
 X.save();X.beginPath();X.arc(cx,cy,R,0,7);X.clip();X.fillStyle=Q.lit;X.fillRect(cx-R,cy-R,R,2*R);X.fillStyle=Q.dark;X.fillRect(cx,cy-R,R,2*R);X.restore();X.strokeStyle=Q.edge;X.lineWidth=2.5;X.beginPath();X.arc(cx,cy,R,0,7);X.stroke();
 put('day side',cx-R*.5,cy+R+k(14),12,Q.ink,800);put('night side',cx+R*.5,cy+R+k(14),12,Q.ink,800);
 const N=pt(90,0,m),Sd=pt(-90,0,m);X.strokeStyle=Q.bad;X.lineWidth=3;X.beginPath();X.moveTo(cx+Sd[0]*R*1.25,cy-Sd[1]*R*1.25);X.lineTo(cx+N[0]*R*1.25,cy-N[1]*R*1.25);X.stroke();
 const dot=(p,col,lab,dy)=>{const x=cx+p[0]*R,y=cy-p[1]*R,front=p[2]>=-0.02;X.globalAlpha=front?1:.35;X.fillStyle=col;X.strokeStyle='#ffffff';X.lineWidth=2;X.beginPath();X.arc(x,y,k(8),0,7);X.fill();X.stroke();X.globalAlpha=1;
  const litNow=p[0]<0;pill(x-k(48),y+dy-k(11),k(96),k(22),'#ffffff',Q.edge,1.5,8);put(`${lab}: ${litNow?'light':'dark'}`,x,y+dy,11,Q.ink,800)};
 dot(N,'#dc2626','North Pole',-k(24));dot(pt(51.5,S.lon,m),'#2563eb','Home',k(26));
 pill(k(8),t0+k(2),k(104),k(30),m==='june'?'#fef9c3':'#e2e8f0',Q.edge,2,10);put(m==='june'?'June':'December',k(60),t0+k(17),15,Q.ink,900)}
/* ---------- sort cards ---------- */
function drop(b){if(S.won)return;const C=CARDS[S.card];if(b!==C[1])return no(`Not ${BINS[b].toLowerCase()}. ${C[2]}`);yes(C[2]);S.card++;if(S.card>=CARDS.length){S.won=true;S.msg='All six sorted. The poles have the biggest changes.'}sync()}
function drawSort(t0,b0){const bw=(A.W-k(40))/3,bh=Math.min(k(120),(b0-t0)*.42),by=b0-bh;S.bins=BINS.map((n,i)=>{const r={x:k(14)+i*(bw+k(6)),y:by,w:bw,h:bh,i};pill(r.x,r.y,bw,bh,['#dcfce7','#fef9c3','#e2e8f0'][i],Q.edge,2.5);
  fold(n,bw-k(10),13).forEach((l,j)=>put(l,r.x+bw/2,r.y+k(18)+j*k(17),13,Q.ink,900));put(i===0?'☀ ☾':i===1?'☀':'☾',r.x+bw/2,r.y+bh-k(22),20,Q.ink,700);return r});
 if(S.card<CARDS.length){const cw=Math.min(A.W-k(60),k(300)),ch=k(64),d=S.drag,x=d?d.x-cw/2:(A.W-cw)/2,y=d?d.y-ch/2:t0+(by-t0-ch)/2;S.cardR={x:(A.W-cw)/2,y:t0+(by-t0-ch)/2,w:cw,h:ch};
  pill(x,y,cw,ch,'#ffffff',d?'#1d4ed8':Q.edge,3);const L=fold(CARDS[S.card][0],cw-k(16),15);L.forEach((l,j)=>put(l,x+cw/2,y+ch/2+(j-(L.length-1)/2)*(k(15)+4),15,Q.ink,900));put(`Card ${S.card+1} of ${CARDS.length}`,A.W/2,t0+k(8),12,Q.soft,800)}}
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.card;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.card;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const K=kind(),T={home:['Drag the Sun along the clock. Watch the whole day at home.','Home: light and dark every day.'],june:['Same day, at the North Pole. Drag through the whole day.','The midnight sun!'],
  dec:['December at the North Pole. Drag through the whole day.','The polar night.'],lean:['Earth leans. Pick a month, then spin the Earth.','The lean makes the difference.'],sort:['Where would you see this? Drag the card to a box.','Sorted!'],quiz:['Midnight sun in summer. Polar night in winter.','']};
 const t=title(S.won?T[K][1]:T[K][0],S.won),b=A.H-msgBox()-k(6);
 if(K==='home'||K==='june'||K==='dec')drawSky(t+k(6),b);if(K==='lean')drawLean(t+k(4),b-k(14));if(K==='sort')drawSort(t+k(14),b);
 if(K==='quiz'){S.month='june';drawLean(t+k(4),b-k(14))}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let grab=null;
function down(p){const K=kind();if(K==='home'||K==='june'||K==='dec'){if(S.strip&&p.y>S.strip.y-k(40)){grab={t:'clock'};move(p);return true}grab={t:'clock',rel:true,x:p.x,h:S.hour};return true}
 if(K==='lean'){grab={t:'globe',x:p.x,lon:S.lon,moved:0};return true}
 if(K==='sort'&&S.cardR&&on(p,S.cardR)&&!S.won){S.drag={x:p.x,y:p.y};grab={t:'card'};A.redraw();return true}
 if(K==='sort'){const r=(S.bins||[]).find(q=>on(p,q));if(r){drop(r.i);return true}}return false}
function move(p){if(!grab)return;const s=S.strip;if(grab.t==='clock'){const h=grab.rel?grab.h+(p.x-grab.x)/(s.w-k(20))*24:(p.x-s.x-k(10))/(s.w-k(20))*24;setHour(h)}
 if(grab.t==='globe'&&!S.spinning){const d=(p.x-grab.x)/A.W*4*Math.PI;S.lon=grab.lon+d;grab.moved=Math.max(grab.moved,Math.abs(d));A.redraw()}
 if(grab.t==='card'){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const g=grab;grab=null;if(!g)return;if(g.t==='globe'&&g.moved>=2*Math.PI*.95)spun(S.month);
 if(g.t==='card'){S.drag=null;const r=(S.bins||[]).find(q=>on(p,q));if(r)drop(r.i);else A.redraw()}}
/* ---------- live text and buttons ---------- */
function sync(){const K=kind();let d='Challenge.';
 if(K==='home'||K==='june'||K==='dec'){const lightH=[...Array(24).keys()].filter(h=>sunH(h+.5)>0).length;d=`${place()[0]}. Time: ${hourName(S.hour)}. The Sun is ${sunH(S.hour)>0?'up':'down'}. Hours watched: ${S.seen.size} of 24.${S.full?` Hours of light: ${lightH} of 24.`:''}`}
 if(K==='lean')d=`${S.month==='june'?'June':'December'}. North Pole: ${pt(90,0,S.month)[0]<0?'in sunlight':'in the dark'}. Home: ${pt(51.5,S.lon,S.month)[0]<0?'in sunlight':'in the dark'}. Spun in: ${[...S.done].join(', ')||'none yet'}.`;
 if(K==='sort')d=S.won?'All cards sorted.':`Card: ${CARDS[S.card][0]}. Boxes: ${BINS.join(', ')}.`;
 voice((S.msg?S.msg+' ':'')+d);ctl();S.after()}
function ctl(){if(!pad)return;pad.innerHTML='';const K=kind(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=()=>{fn();sync()}};
 if(K==='home'||K==='june'||K==='dec'){b('− 1 hour',()=>setHour(S.hour-1));b('+ 1 hour',()=>setHour(S.hour+1));b('Play the whole day',()=>playDay())}
 if(K==='lean'){b('June',()=>setMonth('june'));b('December',()=>setMonth('dec'));b('Spin one day',()=>spin())}
 if(K==='sort'&&!S.won)BINS.forEach((n,i)=>b(n,()=>drop(i)));A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const id=++job;fns.forEach((f,j)=>setTimeout(()=>{if(id===job){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){job++;Object.assign(S,{after:()=>{},won:false,full:false,msg:'',bad:false,hour:12,seen:new Set([12]),flips:0,wasUp:true,month:'june',lon:Math.PI,spinning:false,done:new Set(),card:0,drag:null})}
const dayStep=(n,msg)=>({task:'Watch all 24 hours of the day',show:()=>{steps[n].go();playDay()},go:()=>{fresh();S.wasUp=sunH(12)>0;sync();S.after=ready(n,()=>S.full,msg)}});
const steps=[
{h:'A day at home',p:'Drag the Sun along the clock, or play the whole day. Where is the Sun at bedtime? Where is it at midnight?',...dayStep(0,'Light, then dark, every day.')},
{h:'Summer at the North Pole',p:'Same day, 21 June, but now you are at the North Pole. It is summer there.',predict:{q:'Summer at the North Pole. Where is the Sun at midnight?',opts:['Gone, below the snow','Still up in the sky','Right overhead'],ans:1},...dayStep(1,'The Sun stayed up all day and night.')},
{h:'Winter at the North Pole',p:'Now it is 21 December. It is winter at the North Pole.',predict:{q:'Winter at the North Pole. Is the Sun up at lunchtime?',opts:['Yes, high in the sky','No, it stays below all day','Only for one hour'],ans:1},...dayStep(2,'The Sun never came up.')},
{h:'Why? Earth leans',p:'Earth spins once a day, and it leans. In June the top of the Earth leans toward the Sun. In December it leans away.',
predict:{q:'June. Earth spins round once. Does the North Pole go into the dark?',opts:['Yes, every night','No, it stays in the light','It stays in the dark'],ans:1},
task:'Spin the Earth in June and in December',show:()=>{steps[3].go();setMonth('june');spin(()=>{if(A.step===3){setMonth('dec');spin()}})},go:()=>{fresh();sync();S.after=ready(3,()=>S.won,'Lean toward: light. Lean away: dark.')}},
{h:'Home or the pole?',p:'Read each card. Would you see it at home, at the North Pole in summer, or at the North Pole in winter?',
task:'Sort all 6 cards',show:()=>{steps[4].go();later(CARDS.map(C=>()=>drop(C[1])),400)},go:()=>{fresh();sync();S.after=ready(4,()=>S.won,'All six sorted.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function ask(){qn++;const [q,right,wrong]=BANK[qn%BANK.length],all=[[right,'ok'],...wrong],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,right)});voice('Challenge: '+q);A.redraw()}
function judge(tag,right){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';let m=WHY[tag]||'Think about which way Earth leans.';
 if(tag==='set')m='At midnight in polar summer the Sun is still in the sky, low down. It does not set.';
 if(tag==='closer')m='The Sun stays the same distance. Earth leans, so in June the North Pole tips toward the Sun.';
 if(tag==='both')m='The poles are opposite. North leans toward the Sun in June, so South leans away: polar night.';
 if(ok){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. In a row: '+inrow+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Midnight sun lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
