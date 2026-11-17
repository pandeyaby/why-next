/* Flagship: tsunamis (ages 7–9). Sort what can start one, push the sea floor up and watch the waves spread, find where
   the wave is fastest and tallest, spot the natural warning signs, choose what to do, judge three children, then a
   challenge. Data, the sea drawing and screen-reader text live in tsun_art.js. */
(()=>{
const {CAUSE,PLACE,SIGN,SAFE,KIDS,QZ,WHY,H,floorY,sea}=TSUNART;
const P={ink:'#111827',dim:'#374151',bg:'#fdfbf6',edge:'#1f2937',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',tip:'#fff7ed',rock:'#92400e',sand:'#d6b98c'};
VIS.reg('flagtsun',c=>{let A,X,pad,box,qn=-1,gen=0;const S={after:()=>{}};
const q=n=>Math.round(n*(A.narrow?1:1.12));
const label=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function t(s,x,y,n,col,w,al){X.font=`${w||700} ${q(n)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function fit(s,w,n){X.font=`700 ${q(n)}px system-ui,sans-serif`;const o=[];let l='';String(s).split(' ').forEach(wd=>{const nx=l?l+' '+wd:wd;if(l&&X.measureText(nx).width>w){o.push(l);l=wd}else l=nx});o.push(l);return o}
function card(x,y,w,h,f,s,lw){A.paint.rrect(x,y,w,h,12);X.fillStyle=f;X.fill();if(s){X.lineWidth=lw||2;X.strokeStyle=s;X.stroke()}}
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function top(s,won){const R=fit(s,A.W-44,14),lh=q(14)+4,h=Math.max(q(36),R.length*lh+14);card(12,10,A.W-24,h,won?P.okBg:P.tip,won?P.ok:P.edge,2);R.forEach((r,i)=>t(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,won?P.ok:P.ink));return 10+h}
function foot(){if(!S.msg)return;const R=fit((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13),lh=q(13)+5,h=R.length*lh+12,y=A.H-h-10;card(12,y,A.W-24,h,'#ffffff',S.bad?P.bad:P.ok,3);R.forEach((r,i)=>t(r,A.W/2,y+6+lh*(i+.5),13,S.bad?P.bad:P.ink))}
const no=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const good=m=>{S.bad=false;S.msg=m;A.sound.pop()};
const stage=()=>['cause','lift','speed','sign','safe','kids','quiz'][A.step];
/* sorting cards: what can start one, and the warning signs */
const list=()=>stage()==='cause'?CAUSE:SIGN,BINS={cause:['Can start a tsunami','Cannot'],sign:['Warning sign','Not a sign']};
function drawSort(t0,b0){const L=list(),cw=Math.min(q(250),A.W*.78),ch=q(62),d=S.drag;S.card={x:A.W/2-cw/2,y:t0+q(10),w:cw,h:ch};
 const bw=(A.W-q(36))/2,bh=Math.min(q(150),b0-t0-ch-q(40)),by=b0-bh;S.bins=BINS[stage()].map((n,i)=>{const r={x:q(12)+i*(bw+q(12)),y:by,w:bw,h:bh,i};card(r.x,by,bw,bh,i?'#f3f4f6':'#e0f2fe',P.edge,2);fit(n,bw-q(16),14).forEach((ln,j)=>t(ln,r.x+bw/2,by+q(18)+j*q(18),14,P.ink,900));
  L.slice(0,S.k).filter(x=>(x[1]?0:1)===i).forEach((x,j)=>fit(x[0],bw-q(14),11).forEach((ln,m,F)=>t(ln,r.x+bw/2,by+q(58)+j*q(30)+(m-(F.length-1)/2)*q(13),11,P.ok,800)));return r});
 if(S.k>=L.length)return;const x=d?d.x-cw/2:S.card.x,y=d?d.y-ch/2:S.card.y;card(x,y,cw,ch,'#ffffff',d?'#1d4ed8':P.edge,d?3.5:2.5);const F=fit(L[S.k][0],cw-q(20),16);F.forEach((ln,j)=>t(ln,x+cw/2,y+ch/2+(j-(F.length-1)/2)*q(19),16,P.ink,900))}
function sort(b){if(S.won)return;const L=list(),[n,yes]=L[S.k];if((b===0)!==!!yes){
  if(stage()==='cause')return no(yes?`${n} can start one: it moves a huge amount of sea water all at once.`:n==='Strong wind'?WHY.wind:WHY.tide);
  return no(yes?`${n} is a natural warning. Go to high ground straight away.`:n==='A high tide'?'High tide comes twice a day. It is not a warning.':'Windy-day waves are normal waves made by wind.')}
 S.k++;A.sound.tick();good(`${n}: ${BINS[stage()][b].toLowerCase()}.`);if(S.k>=L.length){S.won=true;S.msg=stage()==='cause'?'Earthquakes, landslides and volcanoes under or into the sea.':'Strong shaking, the sea rushing out, a roar: go high.'}sync()}
/* push the sea floor up, then the waves spread both ways */
function drawLift(t0,b0){const x0=q(12),x1=A.W-q(12),sy=t0+q(70),by=b0-q(34),amp=q(16);S.geo={x0,x1,sy,by};
 const bump=S.spread==null?f=>S.lift*amp*Math.exp(-Math.pow((f-.3)/.07,2)):f=>[.3-S.spread*.28,.3+S.spread*.35].reduce((a,c)=>a+amp*.6*Math.exp(-Math.pow((f-c)/.06,2)),0);
 sea(X,x0,x1,sy,by,bump);const bx=x0+(x1-x0)*.22,bw=(x1-x0)*.16,lift=S.lift*q(40);S.block={x:bx-q(10),y:by-lift-q(40),w:bw+q(20),h:q(60)+lift};
 X.fillStyle=P.rock;X.fillRect(bx,by-lift,bw,lift+q(22));X.strokeStyle=P.edge;X.lineWidth=2;X.strokeRect(bx,by-lift,bw,lift+q(22));
 if(!S.won&&S.lift<1){X.fillStyle=P.edge;X.beginPath();X.moveTo(bx+bw/2,by-lift-q(30));X.lineTo(bx+bw/2-q(9),by-lift-q(16));X.lineTo(bx+bw/2+q(9),by-lift-q(16));X.closePath();X.fill();t('Push up',bx+bw/2,by-lift-q(40),12,P.ink,900)}
 t('Sea floor',bx+bw/2,by-lift+q(11),11,'#ffffff',900);t('Beach',x1-q(30),sy-q(30),12,P.dim,800);t(S.spread==null?'Sea':'Waves spread out both ways',A.W/2,t0+q(26),13,P.dim,800)}
function push(v){if(S.won||S.spread!=null)return;S.lift=Math.max(S.lift,Math.min(1,v));if(S.lift>=1){A.sound.tick();good('The water above jumped up too. Now it falls and spreads out as waves.');S.spread=0;const id=gen;
 for(let k=1;k<=8;k++)setTimeout(()=>{if(id!==gen)return;S.spread=k/8;if(k===8){S.won=true;S.msg='The whole sea, from floor to top, is pushed: that makes a tsunami.';sync()}else A.redraw()},k*(A.reduced()?20:140))}sync()}
/* fastest to slowest */
function drawSpeed(t0,b0){const x0=q(12),x1=A.W-q(12),sy=t0+q(96),by=b0-q(30),last=S.seq[S.seq.length-1];
 sea(X,x0,x1,sy,by,last==null?null:f=>{const p=PLACE[last][4],h=[q(4),q(14),q(40)][last];return h*Math.exp(-Math.pow((f-p)/(last?.04:.12),2))});
 S.dots=PLACE.map((p,i)=>{const x=x0+(x1-x0)*p[4],y=(sy+floorY(p[4],sy,by))/2+q(8),r={x:x-q(30),y:y-q(26),w:q(60),h:q(52),i},got=S.seq.includes(i);
  X.fillStyle=got?P.okBg:'#ffffff';X.beginPath();X.arc(x,y,q(22),0,7);X.fill();X.strokeStyle=got?P.ok:P.edge;X.lineWidth=2.5;X.stroke();t(got?S.seq.indexOf(i)+1:'?',x,y,16,got?P.ok:P.ink,900);
  fit(p[0],q(90),11).forEach((ln,j)=>t(ln,x,y+q(32)+j*q(13),11,P.ink,800));return r});
 if(last!=null){const p=PLACE[last];t(`${p[0]}: ${p[1].toLocaleString('en-GB')} m deep`,A.W/2,t0+q(18),13,P.ink,900);t(`about ${p[2]} km/h, ${p[5]}`,A.W/2,t0+q(36),12,P.ink,700);t(`wave ${p[3]}`,A.W/2,t0+q(53),12,P.ink,700)}}
function tap(i){if(S.won||S.seq.includes(i))return;const want=[0,1,2].find(k=>!S.seq.includes(k));if(i!==want)return no(`Not yet. The wave is faster where the sea is deeper. ${PLACE[want][0]}: ${PLACE[want][1].toLocaleString('en-GB')} m deep. ${PLACE[i][0]}: only ${PLACE[i][1]} m deep.`);
 S.seq.push(i);A.sound.tick();good(`${PLACE[i][0]}: about ${PLACE[i][2]} km/h, wave ${PLACE[i][3]}.`);if(S.seq.length===3){S.won=true;S.msg='As the sea gets shallow, the wave slows down and grows taller.'}sync()}
/* what to do */
function drawChoice(t0,b0,set,stemOnly){const [stem,opts]=set,F=fit(stem,A.W-q(30),stemOnly?15:14);F.forEach((s,j)=>t(s,A.W/2,t0+q(16)+j*q(19),stemOnly?15:14,P.ink,900));const y0=t0+q(10)+F.length*q(19),h=Math.min(q(70),(b0-y0)/3-q(6));
 S.opts=opts.map((o,i)=>{const r={x:q(16),y:y0+i*(h+q(6)),w:A.W-q(32),h,i};card(r.x,r.y,r.w,h,'#ffffff',P.edge,2);if(stemOnly){X.fillStyle=['#fde68a','#bae6fd','#fbcfe8'][i];X.beginPath();X.arc(r.x+q(26),r.y+h/2,q(15),0,7);X.fill();t(o[0],r.x+q(26),r.y+h/2,11,P.ink,800)}
  const L=fit(stemOnly?o[1]:o[0],r.w-q(stemOnly?70:30),14);L.forEach((ln,j)=>t(ln,stemOnly?r.x+q(52):A.W/2,r.y+h/2+(j-(L.length-1)/2)*q(18),14,P.ink,700,stemOnly?'left':'center'));return r})}
function pick(i){if(S.won)return;const k=stage()==='kids',set=(k?KIDS:SAFE)[S.k],o=set[1][i];if(o[2]!=null&&k&&o[2])return no(`${o[0]} is not right. ${o[2]}`);if(!k&&o[1])return no(o[1]);
 good(k?`${o[0]} is right.`:o[0]+'.');S.k++;if(S.k>=3){S.won=true;S.msg=k?'Fast, low and many waves: go high and stay high.':'Go high at once, and stay there until it is called safe.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':P.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=P.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=stage(),y=top(S.won?H[g][1]:H[g][0],S.won),b=A.H-(S.msg?q(70):q(12));
 if(g==='cause'||g==='sign')drawSort(y,b);if(g==='lift')drawLift(y,b);if(g==='speed')drawSpeed(y,b);if(g==='safe')drawChoice(y+q(4),b,SAFE[Math.min(S.k,2)]);if(g==='kids')drawChoice(y+q(4),b,KIDS[Math.min(S.k,2)],1);
 if(g==='quiz')sea(X,q(12),A.W-q(12),y+q(60),b-q(30),f=>q(30)*Math.exp(-Math.pow((f-.8)/.05,2))+q(3)*Math.exp(-Math.pow((f-.25)/.15,2)));foot();A.fx.draw(X)}
let p0=null;
function down(p){const g=stage();p0=p;if(S.won&&g!=='quiz')return false;
 if(g==='cause'||g==='sign'){if(on(p,S.card)){S.drag={x:p.x,y:p.y};A.redraw();return true}const r=(S.bins||[]).find(z=>on(p,z));if(r){sort(r.i);return true}}
 if(g==='lift'&&on(p,S.block)){S.drag={y0:p.y,l0:S.lift};return true}
 if(g==='speed'){const r=(S.dots||[]).find(z=>on(p,z));if(r){tap(r.i);return true}}
 if(g==='safe'||g==='kids'){const r=(S.opts||[]).find(z=>on(p,z));if(r){pick(r.i);return true}}
 return false}
function move(p){const d=S.drag;if(!d)return;if(stage()==='lift')return push(d.l0+(d.y0-p.y)/q(60));d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(stage()!=='lift'){const r=(S.bins||[]).find(z=>on(p,z));if(r)return sort(r.i)}A.redraw()}
function sync(){label((S.msg?S.msg+' ':'')+TSUNART.say(stage(),S));buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const g=stage(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!S.won){if(g==='cause'||g==='sign')BINS[g].forEach((n,i)=>b(n,()=>sort(i)));
  if(g==='lift')b('Push the sea floor up',()=>push(S.lift+.34));
  if(g==='speed')PLACE.forEach((p,i)=>{if(!S.seq.includes(i))b(p[0],()=>tap(i))});
  if(g==='safe')SAFE[S.k][1].forEach((o,i)=>b(o[0],()=>pick(i)));
  if(g==='kids')KIDS[S.k][1].forEach((o,i)=>b(o[0]+' is right',()=>pick(i)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function clear(){gen++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,drag:null,k:0,lift:0,spread:null,seq:[]})}
const right=L=>L.map(x=>()=>sort(x[1]?0:1));
const steps=[
{h:'What starts a tsunami?',p:'A tsunami is a set of huge waves. They start when something moves a lot of sea water all at once.',
predict:{q:'What starts most tsunamis?',opts:['Strong wind','An earthquake under the sea','The tide'],ans:1},
task:'Sort all 5 cards',show:()=>{steps[0].go();play(right(CAUSE),400)},go:()=>{clear();sync();S.after=ready(0,()=>S.won,'Earthquakes, landslides, volcanoes.')}},
{h:'Push the sea floor',p:'In an earthquake under the sea, a piece of sea floor can jump up. It pushes all the water above it.',
predict:{q:'The sea floor jumps up. What happens to the water above?',opts:['Nothing, the sea is too deep','It lifts up, then spreads out as waves','It gets hot and boils'],ans:1},
task:'Push the sea floor all the way up',show:()=>{steps[1].go();play([0,1,2].map(()=>()=>push(S.lift+.34)),300)},go:()=>{clear();sync();S.after=ready(1,()=>S.won,'Waves spread out both ways.')}},
{h:'Fast and low, then slow and tall',p:'The waves race across the ocean. How fast they go depends on how deep the sea is.',
predict:{q:'Where does a tsunami move fastest?',opts:['Near the beach','In the deep ocean','The same everywhere'],ans:1},
task:'Tap the places from fastest to slowest',show:()=>{steps[2].go();play([0,1,2].map(i=>()=>tap(i)),400)},go:()=>{clear();sync();S.after=ready(2,()=>S.won,'700, 110, 35 km/h.')}},
{h:'Warning signs',p:'Nature often gives a warning before a tsunami reaches the beach. Know the signs.',
predict:{q:'The sea suddenly rushes far out. What does it mean?',opts:['It is just low tide','A tsunami may be coming','The danger is over'],ans:1},
task:'Sort all 5 signs',show:()=>{steps[3].go();play(right(SIGN),400)},go:()=>{clear();sync();S.after=ready(3,()=>S.won,'Shake, sea out, roar: go high.')}},
{h:'Get to safety',p:'You cannot outrun a tsunami on the beach, but you can get out of its way in time.',
task:'Choose well 3 times',show:()=>{steps[4].go();play(SAFE.map(()=>()=>pick(SAFE[S.k][1].findIndex(o=>!o[1]))),450)},go:()=>{clear();sync();S.after=ready(4,()=>S.won,'Go high, stay high.')}},
{h:'Check the facts',p:'Three children talk about tsunamis. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[5].go();play(KIDS.map(()=>()=>pick(KIDS[S.k][1].findIndex(o=>!o[2]))),450)},go:()=>{clear();sync();S.after=ready(5,()=>S.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
let row=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>grade(tag,ok)});label('Challenge: '+qq);A.redraw()}
function grade(tag,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tag==='ok';let m=WHY[tag]||'Deep and fast, then slow and tall. Go high and stay high.';
 if(tag==='tide')m='Tides rise and fall every day. A tsunami comes from the sea floor, a landslide or a volcano moving the water.';
 if(tag==='tall')m='Out in the deep ocean a tsunami is low, often under 1 m. It grows tall only near land.';
 if(tag==='back')m='More waves can come for hours, and a later one can be the biggest. Stay up high.';
 if(win){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==6;pad.hidden=B.step===6;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tsunami lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
