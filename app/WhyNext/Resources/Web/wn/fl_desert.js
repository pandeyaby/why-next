/* Flagship: Desert Animals (ages 7–9; NC Year 2 living things and their habitats; Year 4 and
   Year 6 adaptation and environments). A desert gets very little rain (under about 250 mm a
   year): it can be hot like the Sahara or cold like the Gobi and inland Antarctica. Animals
   cope with heat and little water: big ears that let body heat out (fennec fox), burrows
   that stay cool (meerkat), a hump of fat, not water, and drinking a lot at once (camel),
   water from food (kangaroo rat), hiding by day (scorpion, rattlesnake).
   The learner measures rain in five places, drags a fennec fox's ears bigger until it cools,
   drags a meerkat down its burrow past a depth thermometer, fills a camel's hump and lets it
   drink, and matches five animals to their tricks.
   Distinct from flagnoc (night senses) and flagsavanna (grassland food and herds): this lab
   is about surviving heat and lack of water. */
(()=>{
VIS.reg('flagdesert',c=>{
let A,bar,qbox,qi=-1;const S={};
const PAGES=['dry','ears','burrow','hump','tricks','quiz'];
const PLACES=[['Sahara','hot',25,'is hot'],['Gobi','cold winters',194,'has freezing winters'],['inland Antarctica','freezing',50,'is freezing'],['Amazon rainforest','hot',2300,'is hot'],['London','mild',600,'is mild']];
const ANIMALS=[['camel','fat'],['fennec fox','ears'],['meerkat','dig'],['kangaroo rat','food'],['scorpion','hide']];
const TRICKS={fat:'hump of fat, drinks lots at once',ears:'huge ears let heat out',dig:'digs cool burrows',food:'gets water from its food',hide:'hides under rocks by day'};
const DEPTH=[[0,65,'surface sand'],[.35,40,'30 cm down'],[.7,32,'60 cm down'],[1,30,'1 m: nest']];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const at=()=>PAGES[A.step];
function W(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.m||A.W-16)}
function note(t,y){const g=A.ctx,px=A.narrow?13:15,ln=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const i=ln.length-1,s=(ln[i]+' '+w).trim();if(g.measureText(s).width>A.W-20&&ln[i])ln.push(w);else ln[i]=s});
 const k=Math.min(3,ln.length);ln.slice(0,3).forEach((s,j)=>W(s,A.W/2,y+(j-(k-1)/2)*(px+4),px,{w:600}))}
const sh=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function tile(b,k,a,r){const g=A.ctx;g.fillStyle=sh(k,a);A.paint.rrect(b.x,b.y,b.w,b.h,r||10);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}
const within=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* ---- dry: rain gauges against the 250 mm desert line ---- */
function gauge(i){const n=PLACES.length,w=(A.W-24)/n;return{x:12+i*w+4,y:A.H*.14,w:w-8,h:A.H*.58}}
function paintDry(){const g=A.ctx,C=A.col,top=700,line=v=>{const b=gauge(0);return b.y+b.h-Math.min(1,v/top)*(b.h-34)};
 PLACES.forEach(([nm,hot,mm],i)=>{const b=gauge(i),m=S.meas[i];tile(b,'ln',.08);
  if(m){const y=line(mm);g.fillStyle=sh('cy',.7);g.fillRect(b.x+6,y,b.w-12,b.y+b.h-y-2);W(mm>top?`${mm.toLocaleString('en-GB')} mm ↑`:`${mm} mm`,b.x+b.w/2,b.y+14,A.narrow?11:13,{m:b.w-4})}else W('tap',b.x+b.w/2,b.y+b.h/2,14,{c:C.mu,w:600});
  const desert=mm<250;W(nm.split(' ').pop(),b.x+b.w/2,b.y+b.h+14,A.narrow?11:13,{w:600,m:b.w+6});W(hot,b.x+b.w/2,b.y+b.h+30,A.narrow?10:12,{c:C.mu,w:600,m:b.w+6});
  if(m)W(desert?'desert':'not desert',b.x+b.w/2,b.y+b.h+46,A.narrow?11:13,{c:desert?C.gr:C.tx,m:b.w+6})});
 const y=line(250);g.strokeStyle=C.rd;g.lineWidth=2;g.setLineDash([6,4]);g.beginPath();g.moveTo(8,y);g.lineTo(A.W-8,y);g.stroke();g.setLineDash([]);g.fillStyle=C.pn;A.paint.rrect(A.W-112,y-19,100,18,6);g.fill();W('250 mm a year',A.W-16,y-10,12,{a:'right',c:C.tx,w:600});
 W('Rain and snow in one year',A.W/2,A.H*.06,A.narrow?15:18)}
function measure(i){if(S.meas[i])return speak(`${PLACES[i][0]} is already measured.`);S.meas[i]=1;const[nm,,mm,feel]=PLACES[i],d=mm<250,n=S.meas.filter(Boolean).length;
 if(n===PLACES.length){S.dry=true;return speak('Sahara, Gobi and inland Antarctica are all deserts. Some are hot, some are cold, but all are dry.',true)}
 speak(d?`${nm}: about ${mm} mm a year. Under 250 mm, so it is a desert, even though it ${feel}.`:`${nm}: about ${mm.toLocaleString('en-GB')} mm a year. Too wet to be a desert.`,d)}
/* ---- ears: fennec fox ---- */
function fox(){const cx=A.W/2,cy=A.H*.56,r=A.narrow?42:48;return{cx,cy,r}}
function paintEars(){const g=A.ctx,C=A.col,F=fox(),e=S.ear,L=F.r*(.6+e*1.6),cool=e>=.8,heat=Math.round(100-e*70);
 W(cool?'Cool fox: heat flows out of its big ears':'Hot fox: drag an ear tip up',A.W/2,A.H*.07,A.narrow?15:18,{c:cool?C.gr:C.tx});
 [-1,1].forEach(s=>{g.fillStyle=sh('am',.55);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(F.cx+s*F.r*.25,F.cy-F.r*.7);g.lineTo(F.cx+s*(F.r*.55+L*.45),F.cy-F.r*.6-L);g.lineTo(F.cx+s*F.r*.95,F.cy-F.r*.25);g.closePath();g.fill();g.stroke();
  if(e>.3){g.strokeStyle=C.rd;g.lineWidth=1.5;for(let k=1;k<=3;k++){const t=k/4,x=F.cx+s*(F.r*.6+L*.45*t),y=F.cy-F.r*.6-L*t;g.beginPath();g.moveTo(x,y);g.lineTo(x+s*10*e,y-6*e);g.stroke()}}});
 S.tip={x:F.cx+F.r*.55+L*.45,y:F.cy-F.r*.6-L};g.fillStyle=C.rd;g.beginPath();g.arc(S.tip.x,S.tip.y,9,0,7);g.fill();
 g.fillStyle=sh('am',.45);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(F.cx,F.cy,F.r,0,7);g.fill();g.stroke();
 g.fillStyle=C.tx;[-1,1].forEach(s=>{g.beginPath();g.arc(F.cx+s*F.r*.38,F.cy-F.r*.1,4,0,7);g.fill()});g.beginPath();g.arc(F.cx,F.cy+F.r*.35,6,0,7);g.fill();
 const mx=A.narrow?16:30,mw=A.W-2*mx,my=A.H*.82;tile({x:mx,y:my,w:mw,h:16},'ln',.1,6);g.fillStyle=cool?C.gr:C.rd;g.fillRect(mx+2,my+2,(mw-4)*heat/100,12);W(`heat kept in: ${heat}%`,A.W/2,my-12,13,{w:600})}
function setEar(v){S.ear=Math.max(0,Math.min(1,v));if(S.ear>=.8&&!S.cool){S.cool=true;return speak('Big thin ears with lots of blood vessels let body heat escape into the air. They also hear prey under the sand.',true)}
 if(!S.cool)speak(S.ear<.3?'Small ears keep heat in, like an Arctic fox. This fox is too hot.':'Bigger ears, more heat out. Keep going.');else A.redraw()}
/* ---- burrow: meerkat and depth thermometer ---- */
function tunnel(){const x=A.narrow?A.W*.38:A.W*.4,y0=A.H*.22,y1=A.H*.78;return{x,y0,y1}}
function tempAt(d){for(let i=1;i<DEPTH.length;i++){const[a,ta]=DEPTH[i-1],[b,tb]=DEPTH[i];if(d<=b)return Math.round(ta+(tb-ta)*(d-a)/(b-a))}return 30}
function paintBurrow(){const g=A.ctx,C=A.col,T=tunnel(),y=T.y0+S.d*(T.y1-T.y0),t=tempAt(S.d);
 g.fillStyle=sh('am',.75);g.fillRect(0,A.H*.12,A.W,A.H*.1);g.fillStyle=sh('am',.35);g.fillRect(0,T.y0,A.W,T.y1-T.y0+30);W('midday sun on the sand',A.W/2,A.H*.17,13,{w:600});
 g.fillStyle=sh('ln',.15);g.fillRect(T.x-24,T.y0,48,T.y1-T.y0);g.beginPath();g.ellipse(T.x+30,T.y1,56,22,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 DEPTH.forEach(([d,tc,lab])=>{const yy=T.y0+d*(T.y1-T.y0);W(`${lab}: ${tc} °C`,A.W-12,yy,A.narrow?12:13,{a:'right',w:600})});
 g.fillStyle=C.tx;g.beginPath();g.ellipse(T.x,y,10,16,0,0,7);g.fill();g.beginPath();g.arc(T.x,y-20,8,0,7);g.fill();S.mk={x:T.x,y};
 const hot=t>45;W(`${t} °C`,T.x,A.H*.07,A.narrow?20:24,{c:hot?C.rd:t<=31?C.gr:C.tx})}
function setDepth(d){S.d=Math.max(0,Math.min(1,d));const t=tempAt(S.d);
 if(S.d>=.95&&!S.deep){S.deep=true;return speak('About 30 °C down in the nest, while the surface sand is 65 °C. Soil above blocks the sun, so deep burrows stay cool by day.',true)}
 if(!S.deep)speak(`${t} °C here. ${t>45?'Too hot: keep digging.':'Cooler. Go deeper.'}`);else A.redraw()}
/* ---- hump: fat or water? then drink ---- */
function item(i){const w=A.narrow?100:120;return{x:i?A.W-w-16:16,y:A.H*.74,w,h:46}}
function paintHump(){const g=A.ctx,C=A.col,cx=A.W/2,cy=A.H*.45,s=A.narrow?.8:1;
 g.fillStyle=sh('am',.5);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.ellipse(cx,cy,95*s,38*s,0,0,7);g.fill();g.stroke();
 g.fillStyle=S.fat?sh('am',.85):sh('ln',.2);g.beginPath();g.ellipse(cx-5,cy-38*s,46*s,34*s,0,Math.PI,0);g.fill();g.stroke();S.humpAt={x:cx-55*s,y:cy-75*s,w:100*s,h:45*s};W(S.fat?'fat':'?',cx-5,cy-52*s,15);
 g.lineWidth=6;g.beginPath();[-60,-35,35,60].forEach(dx=>{g.moveTo(cx+dx*s,cy+30*s);g.lineTo(cx+dx*s,cy+80*s)});g.moveTo(cx+85*s,cy-10*s);g.lineTo(cx+115*s,cy-60*s);g.stroke();g.lineWidth=2;
 g.fillStyle=sh('am',.5);g.beginPath();g.ellipse(cx+122*s,cy-66*s,20*s,11*s,0,0,7);g.fill();g.stroke();
 W(`drunk: ${S.drank} litres`,cx,A.H*.08,A.narrow?16:19,{c:S.drank>=135?C.gr:C.tx});
 if(!S.fat){[['fat',0],['water',1]].forEach(([n,i])=>{if(S.carry&&S.carry.n===n)return;const b=item(i);tile(b,i?'cy':'am',.35);W(n,b.x+b.w/2,b.y+b.h/2,17)});
  if(S.carry){tile({x:S.carry.x-50,y:S.carry.y-22,w:100,h:44},S.carry.n==='fat'?'am':'cy',.5);W(S.carry.n,S.carry.x,S.carry.y,17)}W('drag into the hump',A.W/2,A.H*.68,13,{c:C.mu,w:600})}
 else{S.trough={x:A.W/2-70,y:A.H*.72,w:140,h:42};tile(S.trough,'cy',.4);W('tap: drink 45 L',A.W/2,A.H*.72+21,14)}}
function fill(n){if(S.fat)return;if(n==='water')return speak('Not water! A camel’s hump is a store of fat. The camel can use the fat for energy when food is short.',false);
 S.fat=true;speak('Yes: the hump is fat. Now let the camel drink at the trough.',true)}
function drink(){if(!S.fat)return speak('Fill the hump first.');if(S.drank>=135)return;S.drank+=45;
 if(S.drank>=135){S.drunk=true;return speak('135 litres in one go! A thirsty camel can drink this much in about 13 minutes, then go days without drinking.',true)}speak(`${S.drank} litres so far. Keep drinking.`)}
/* ---- tricks: match animals ---- */
const KEYS=Object.keys(TRICKS);
function slot(i){const h=A.narrow?46:44,w=A.narrow?A.W-24:A.W*.62;return{x:A.narrow?12:A.W*.36,y:A.H*(A.narrow?.3:.16)+i*(h+8),w,h}}
function paintTricks(){const C=A.col,cur=ANIMALS[S.ti];W(cur?`How does the ${cur[0]} cope?`:'All five matched!',A.W/2,A.H*.06,A.narrow?16:19,{c:cur?C.tx:C.gr});
 if(cur){const b=A.narrow?{x:A.W/2-70,y:A.H*.12,w:140,h:48}:{x:16,y:A.H*.3,w:A.W*.3,h:56},p=S.hold;tile(p?{x:p.x-b.w/2,y:p.y-b.h/2,w:b.w,h:b.h}:b,'vi',.3);W(cur[0],p?p.x:b.x+b.w/2,p?p.y:b.y+b.h/2,17);S.card=b}
 KEYS.forEach((k,i)=>{const b=slot(i),got=S.matched.includes(k);tile(b,got?'gr':'cy',got?.3:.12);W((got?'✓ '+ANIMALS.find(a=>a[1]===k)[0]+': ':'')+TRICKS[k],b.x+b.w/2,b.y+b.h/2,A.narrow?13:14,{w:600,m:b.w-10})})}
function match(k){const cur=ANIMALS[S.ti];S.hold=null;if(!cur)return;if(S.matched.includes(k))return speak('That trick already has its animal.',false);
 if(k!==cur[1]){const who=ANIMALS.find(a=>a[1]===k)[0];return speak(`That is the ${who}’s trick. The ${cur[0]} does something else.`,false)}
 S.matched.push(k);S.ti++;if(S.ti>=ANIMALS.length){S.tricks=true;return speak('Five animals, five ways to beat heat and save water.',true)}speak(`Yes: ${cur[0]}: ${TRICKS[k]}.`,true)}
/* ---- frame ---- */
function paint(){const{ctx:g,W:w,H:h,col:C}=A,k=at();g.fillStyle=A.mix(C.pn,C.am,C.dark?.05:.06);g.fillRect(0,0,w,h);
 if(k==='quiz'){W('Desert survival check',w/2,h*.42,A.narrow?18:21);W('Answer below',w/2,h*.55,14,{c:C.mu,w:500});A.fx.draw(g);return}
 ({dry:paintDry,ears:paintEars,burrow:paintBurrow,hump:paintHump,tricks:paintTricks})[k]();if(S.msg)note(S.msg,h*.93);A.fx.draw(g)}
function speak(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();voice(t);btns();A.redraw();S.after&&S.after()}
function wipe(){for(const k in S)delete S[k];Object.assign(S,{meas:[],ear:.1,d:0,fat:false,drank:0,ti:0,matched:[],msg:'',after:()=>{}});A.redraw()}
function btns(){if(!bar)return;bar.innerHTML='';const k=at();if(k==='quiz')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':l||t},bar,t).onclick=f};
 if(k==='dry')PLACES.forEach(([n],i)=>{if(!S.meas[i])add(`Measure ${n}`,()=>measure(i))});
 if(k==='ears'){add('Bigger ears',()=>setEar(S.ear+.25));add('Smaller ears',()=>setEar(S.ear-.25))}
 if(k==='burrow'){add('Dig deeper',()=>setDepth(S.d+1/3));add('Go up',()=>setDepth(S.d-1/3))}
 if(k==='hump'){if(!S.fat){add('Put fat in the hump',()=>fill('fat'));add('Put water in the hump',()=>fill('water'))}else if(S.drank<135)add('Drink 45 litres',drink)}
 if(k==='tricks'&&ANIMALS[S.ti])KEYS.forEach(t=>{if(!S.matched.includes(t))add(TRICKS[t],()=>match(t),`${ANIMALS[S.ti][0]}: ${TRICKS[t]}`)})}
function down(p){const k=at();if(k==='quiz')return false;
 if(k==='dry'){for(let i=0;i<PLACES.length;i++)if(within(p,gauge(i))){measure(i);return true}return false}
 if(k==='ears'){if(S.tip&&Math.hypot(p.x-S.tip.x,p.y-S.tip.y)<34){S.grab='ear';return true}return false}
 if(k==='burrow'){if(S.mk&&Math.hypot(p.x-S.mk.x,p.y-S.mk.y)<40){S.grab='mk';return true}return false}
 if(k==='hump'){if(!S.fat){for(const[n,i]of[['fat',0],['water',1]])if(within(p,item(i))){S.carry={n,x:p.x,y:p.y};A.redraw();return true}return false}if(within(p,S.trough)){drink();return true}return false}
 if(k==='tricks'&&ANIMALS[S.ti]){if(within(p,S.card)){S.hold={x:p.x,y:p.y};return true}for(let i=0;i<KEYS.length;i++)if(within(p,slot(i))){match(KEYS[i]);return true}}
 return false}
function move(p){const F=fox(),T=tunnel();
 if(S.grab==='ear')setEar(((F.cy-F.r*.6-p.y)/F.r-.6)/1.6);
 else if(S.grab==='mk')setDepth((p.y-T.y0)/(T.y1-T.y0));
 else if(S.carry){S.carry.x=p.x;S.carry.y=p.y;A.redraw()}else if(S.hold){S.hold={x:p.x,y:p.y};A.redraw()}}
function up(p){S.grab=null;if(S.carry){const n=S.carry.n;S.carry=null;if(p&&within(p,{x:S.humpAt.x-20,y:S.humpAt.y-20,w:S.humpAt.w+40,h:S.humpAt.h+60}))fill(n);else A.redraw();return}
 if(S.hold){const i=KEYS.findIndex((k,j)=>within(S.hold,slot(j)));if(i>=0)match(KEYS[i]);else{S.hold=null;A.redraw()}}}
const tickOn=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function demo(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*320))}
function enter(i,hint,ok,line){wipe();speak(hint);S.after=tickOn(i,ok,line)}
const steps=[
{h:'Always dry',p:'A desert is a place that gets very little rain or snow: under about 250 mm in a year. Some deserts are hot. Some are cold. All are dry.',
 predict:{q:'Inland Antarctica is freezing cold. Is it a desert?',opts:['no, deserts are hot and sandy','yes, it gets very little rain or snow'],ans:1},
 task:'Measure the rain in all five places',show:()=>demo(0,PLACES.map((_,i)=>()=>measure(i))),
 go:()=>enter(0,'Tap a gauge to measure a year of rain.',()=>S.dry,()=>'Deserts are dry, hot or cold.')},
{h:'Ears that let heat out',p:'The fennec fox lives in the Sahara. Its ears can be 15 cm long. Warm blood flows near the thin skin, so heat leaves the body.',
 predict:{q:'Why are a fennec fox’s ears so big?',opts:['to keep the sun off its face','to let body heat escape','to store water'],ans:1},
 task:'Make the fox’s ears big enough to cool it',show:()=>demo(1,[()=>setEar(.35),()=>setEar(.6),()=>setEar(.85)]),
 go:()=>enter(1,'Drag the red dot on the ear tip upwards.',()=>S.cool,()=>'Big ears, cooler fox.')},
{h:'Go underground',p:'Meerkats dig burrows. The soil above blocks the sun, so a deep burrow is much cooler than the sand on top in the day.',
 predict:{q:'At midday, where is it coolest?',opts:['on top of the sand','deep in a burrow','it is the same everywhere'],ans:1},
 task:'Take the meerkat down to its nest',show:()=>demo(2,[()=>setDepth(.35),()=>setDepth(.7),()=>setDepth(1)]),
 go:()=>enter(2,'Drag the meerkat down the tunnel.',()=>S.deep,()=>'The nest is cool.')},
{h:'The camel’s hump',p:'A camel’s hump is a store of fat, not water. The camel saves water in other ways and can drink a huge amount when it finds water.',
 predict:{q:'A camel’s hump is full of…',opts:['water','fat','air'],ans:1},
 task:'Fill the hump, then let the camel drink',show:()=>demo(3,[()=>fill('fat'),drink,drink,drink]),
 go:()=>enter(3,'Drag fat or water into the hump.',()=>S.drunk,()=>'Fat in the hump, 135 L drunk.')},
{h:'Five survival tricks',p:'Each desert animal has its own ways to cope with heat and little water. A kangaroo rat may never drink at all: it gets water from the seeds it eats.',
 predict:{q:'A kangaroo rat may never drink. How does it get water?',opts:['from the seeds it eats','from licking the sand','it needs no water'],ans:0},
 task:'Match all five animals',show:()=>demo(4,ANIMALS.map(a=>()=>match(a[1]))),
 go:()=>enter(4,'Drag the animal to its trick, or use the buttons.',()=>S.tricks,()=>'All matched.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['What do all deserts have in common?',[['very little rain','ok'],['they are all hot','hot'],['they are all sandy','hot']]],
 ['What is inside a camel’s hump?',[['fat','ok'],['water','hump'],['milk','hump']]],
 ['How do a fennec fox’s big ears help it?',[['they let body heat out','ok'],['they keep it warm','ears'],['they store water','ears']]],
 ['Why do meerkats go into burrows at midday?',[['it is cooler under the ground','ok'],['it is warmer under the ground','burrow'],['to find rain','burrow']]],
 ['How does a kangaroo rat get water?',[['from its food','ok'],['it needs no water at all','drink'],['from rivers every day','drink']]],
 ['When do scorpions usually hunt?',[['at night, when it is cooler','ok'],['at midday in full sun','hide'],['only in the rain','hide']]],
 ['The Gobi Desert has freezing winters. Why is it still a desert?',[['it gets very little rain or snow','ok'],['it is a desert only in summer','hot'],['all big places are deserts','hot']]]];
function why(t){let m='Think: how does this animal stay cool and save water?';
 if(t==='hot')m='A desert is about rain, not heat or sand. Under about 250 mm a year makes a desert, hot or cold.';
 if(t==='hump')m='The hump is fat. Camels save water in their bodies and drink a lot at once when they can.';
 if(t==='ears')m='Big thin ears let heat leave the body. Small ears keep heat in, like an Arctic fox’s.';
 if(t==='burrow')m='Soil blocks the sun, so deep burrows stay cool in the day.';
 if(t==='drink')m='Every animal needs water. Some get it from food, like the kangaroo rat’s seeds.';
 if(t==='hide')m='Many desert animals hide in the hot day and come out when it is cooler.';
 return m}
function next(){qi++;const Q=QS[qi%QS.length],r=qi%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qbox.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>grade(t)});voice('Challenge: '+Q[0]);A.redraw()}
function grade(t){qbox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.7,tall:1.4,draw:paint,onStep:A=>{qbox.hidden=A.step!==5;bar.hidden=A.step===5;btns()},
 init:A=>{wipe();const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Desert buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});btns()}});
A.start()})})();
