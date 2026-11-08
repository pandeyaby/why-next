/* Flagship: Where Are the Poles? (ages 5–7; KS1 geography: poles, Equator, hot and cold areas). Tap the poles, slide
   the Equator to halfway, walk to each cold pole, aim Sun rays, send animals home. Not flagpoles or flagpolaran. */
(()=>{
VIS.reg('flagglobe',c=>{
let K,ui,qz,qi=-1;const st={};c.fig.classList.add('young');
const PAGES=['find','belt','walk','sun','who','quiz'];
const page=()=>PAGES[K.step];
const BEASTS=[['polar bear','🐻‍❄️','n','Polar bears live in the Arctic, the icy sea round the North Pole.'],
 ['emperor penguin','🐧','s','Emperor penguins live round Antarctica, near the South Pole.'],
 ['parrot','🦜','eq','Parrots live in warm rainforests near the Equator.']];
const ZN={n:'near the North Pole',s:'near the South Pole',eq:'near the Equator'};
function tell(t){c.say(t);if(K)K.cv.setAttribute('aria-label',t)}
function word(s,x,y,px,o){o=o||{};const g=K.ctx;g.font=`${o.w||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||K.col.tx;g.fillText(String(s),x,y,o.max||K.W-12)}
const G=()=>{const r=Math.min(K.W*(K.narrow?.34:.3),K.H*(K.narrow?.3:.28));return{x:K.W/2,y:Math.max(K.H*.43,r+80),r}};
const yAt=v=>{const g=G();return g.y-v*g.r};
function strip(t){const g=K.ctx,px=K.narrow?15:16,lines=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const i=lines.length-1,test=(lines[i]+' '+w).trim();if(g.measureText(test).width>K.W-24&&lines[i])lines.push(w);else lines[i]=test});
 const n=Math.min(4,lines.length),lh=px+5,y0=K.H-n*lh-12;g.fillStyle=K.alpha(K.col.pn,.95);g.fillRect(0,y0,K.W,K.H-y0);
 g.strokeStyle=K.col.ln;g.lineWidth=1;g.beginPath();g.moveTo(0,y0);g.lineTo(K.W,y0);g.stroke();lines.slice(0,4).forEach((s,j)=>word(s,K.W/2,y0+6+lh*j+lh/2,px,{w:600}))}
function earth(opt){opt=opt||{};const g=K.ctx,C=K.col,o=G();
 g.save();g.beginPath();g.arc(o.x,o.y,o.r,0,7);g.clip();
 g.fillStyle=K.mix(C.pn,C.cy,C.dark?.42:.5);g.fillRect(o.x-o.r,o.y-o.r,o.r*2,o.r*2);
 g.fillStyle=K.mix(C.pn,C.gr,C.dark?.5:.55);
 [[-.42,-.28,.3,.22],[.05,.12,.22,.3],[.45,-.18,.28,.18],[-.3,.45,.18,.14]].forEach(([dx,dy,rx,ry])=>{g.beginPath();g.ellipse(o.x+dx*o.r,o.y+dy*o.r,rx*o.r,ry*o.r,.4,0,7);g.fill()});
 g.fillStyle=C.dark?'#e8f1f8':'#ffffff';g.fillRect(o.x-o.r,o.y-o.r,o.r*2,o.r*.2);g.fillRect(o.x-o.r,o.y+o.r*.78,o.r*2,o.r*.22);
 if(opt.heat){g.fillStyle=K.alpha(C.rd,C.dark?.22:.16);g.fillRect(o.x-o.r,o.y-o.r*.25,o.r*2,o.r*.5)}
 g.restore();g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(o.x,o.y,o.r,0,7);g.stroke();
 if(opt.axis){g.setLineDash([5,5]);g.strokeStyle=K.alpha(C.tx,.45);g.beginPath();g.moveTo(o.x,o.y-o.r-6);g.lineTo(o.x,o.y+o.r+6);g.stroke();g.setLineDash([])}}
function equatorRing(k,ink){const g=K.ctx,o=G(),y=o.y+k*o.r,half=o.r*Math.sqrt(Math.max(0,1-k*k));g.strokeStyle=ink;g.lineWidth=4;g.beginPath();g.ellipse(o.x,y,Math.max(1,half),Math.max(1,half*.14),0,0,7);g.stroke();return y}
function poleTag(which){const o=G(),north=which==='n',y=north?o.y-o.r:o.y+o.r,g=K.ctx;g.fillStyle=K.col.rd;g.beginPath();g.arc(o.x,y,7,0,7);g.fill();
 word(north?'North Pole':'South Pole',o.x,north?y-16:y+17,K.narrow?15:17,{w:800})}
/* ---- find: very top and very bottom ---- */
function drawFind(){earth({axis:true});const o=G();if(st.found.n)poleTag('n');if(st.found.s)poleTag('s');
 if(!st.found.n||!st.found.s)word('Tap the North Pole and the South Pole',K.W/2,18,K.narrow?15:17);
 if(st.miss){K.ctx.strokeStyle=K.col.am;K.ctx.lineWidth=3;K.ctx.beginPath();K.ctx.arc(st.miss.x,st.miss.y,14,0,7);K.ctx.stroke()}}
function pickSpot(where,p){st.miss=null;
 if(where==='n'||where==='s'){if(st.found[where])return;st.found[where]=true;
  if(st.found.n&&st.found.s){st.gotPoles=true;return say('Found both! The North Pole is at the very top. The South Pole is at the very bottom.',true)}
  return say(where==='n'?'Yes! The North Pole is the very top of the Earth.':'Yes! The South Pole is the very bottom of the Earth.',true)}
 st.miss=p||{x:G().x,y:G().y};say(where==='mid'?'That is the middle, near the Equator. The poles are at the very top and the very bottom.':'That is the side. Look for the very top and the very bottom.',false)}
/* ---- belt: the Equator is halfway ---- */
function drawBelt(){earth();const o=G(),C=K.col,ok=st.beltSet,y=equatorRing(st.k,ok?C.gr:C.am);poleTag('n');poleTag('s');
 const top=o.y-o.r,bot=o.y+o.r,bx=o.x+o.r+(K.narrow?18:30),g=K.ctx;g.lineWidth=3;
 [[top,y,C.vi],[y,bot,C.pk]].forEach(([a,b,ink])=>{g.strokeStyle=ink;g.beginPath();g.moveTo(bx,a+4);g.lineTo(bx,b-4);g.stroke();g.beginPath();g.moveTo(bx-6,a+4);g.lineTo(bx+6,a+4);g.moveTo(bx-6,b-4);g.lineTo(bx+6,b-4);g.stroke()});
 const far=Math.abs(st.k)<.06?'same':st.k<0?'North Pole nearer':'South Pole nearer';
 word(ok?'Equator':'belt',o.x-o.r*.62,y-14,K.narrow?14:16,{w:800,ink:ok?C.gr:C.tx});
 word(far==='same'?'halfway':far,K.W/2,18,K.narrow?15:17,{ink:far==='same'?C.gr:C.tx})}
function moveBelt(k,final){if(st.beltSet)return;st.k=Math.max(-.9,Math.min(.9,k));
 if(final){if(Math.abs(st.k)<.08){st.k=0;st.beltSet=true;return say('That is the Equator: an imaginary line round the middle, halfway between the two poles.',true)}
  return say(st.k<0?'The belt is nearer the North Pole. The Equator is the same distance from both poles.':'The belt is nearer the South Pole. Move it up until it is halfway.',false)}
 K.redraw()}
/* ---- walk: colder towards each pole ---- */
const feel=v=>{const a=Math.abs(v);return a<.2?['hot','rd']:a<.45?['warm','am']:a<.7?['cool','cy']:a<.93?['very cold','cy']:['freezing: the coldest place','vi']};
function drawWalk(){earth({heat:true});const o=G(),C=K.col,g=K.ctx;equatorRing(0,K.alpha(C.gr,.8));poleTag('n');poleTag('s');
 const y=yAt(st.v),hx=o.x+(K.narrow?28:34);g.fillStyle=C.tx;g.beginPath();g.arc(o.x,y,5,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(o.x,y);g.lineTo(hx-12,y);g.stroke();st.hiker={x:hx,y};word('🧑',hx,y,K.narrow?30:36);
 const tx=o.x+o.r+(K.narrow?22:40),t0=o.y-o.r*.8,t1=o.y+o.r*.8,heat=1-Math.abs(st.v),f=feel(st.v);
 g.fillStyle=K.mix(C.pn,C.ln,.4);K.paint.rrect(tx-9,t0,18,t1-t0,9);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 g.fillStyle=C[f[1]];const fill=(t1-t0-8)*(.1+.9*heat);K.paint.rrect(tx-5,t1-4-fill,10,fill,5);g.fill();
 word(f[0],K.W/2,18,K.narrow?16:18,{ink:C.tx,w:800});
 const been=(st.went.n?'✓ North Pole  ':'')+(st.went.s?'✓ South Pole':'');if(been)word(been,K.W/2,40,14,{ink:C.gr,w:700})}
function walkTo(v){if(st.walked&&!st.drag){K.redraw();return}st.v=Math.max(-1,Math.min(1,v));
 const pole=st.v>=.95?'n':st.v<=-.95?'s':null;
 if(pole&&!st.went[pole]){st.went[pole]=true;st.v=pole==='n'?1:-1;
  if(st.went.n&&st.went.s){st.walked=true;return say('Both poles are freezing. The further from the Equator you walk, the colder it gets, north or south.',true)}
  return say(pole==='n'?'Brrr! The North Pole is freezing. Now try the South Pole.':'Brrr! The bottom of the Earth is freezing too, not hot. Now try the North Pole.',true)}
 tell('Explorer: '+feel(st.v)[0]);K.redraw()}
/* ---- sun: the same rays spread thin near a pole ---- */
function hits(c0){const o=G(),gap=o.r*.07,out=[];for(let i=-2;i<=2;i++){const y=c0+i*gap,dy=y-o.y;if(Math.abs(dy)>=o.r)continue;out.push({x:o.x-Math.sqrt(o.r*o.r-dy*dy),y})}return out}
function drawSun(){earth();const o=G(),C=K.col,g=K.ctx,c0=st.aim;equatorRing(0,K.alpha(C.gr,.8));
 const sx=K.narrow?22:o.x-o.r-90;word('☀️',sx,c0,K.narrow?30:40);st.sunAt={x:sx,y:c0};
 const pts=hits(c0);g.strokeStyle=C.am;g.lineWidth=2.5;pts.forEach(p=>{g.beginPath();g.moveTo(sx+18,p.y);g.lineTo(p.x,p.y);g.stroke()});
 if(pts.length>1){const a=Math.atan2(pts[0].y-o.y,pts[0].x-o.x),b=Math.atan2(pts[pts.length-1].y-o.y,pts[pts.length-1].x-o.x),span=Math.abs(b-a);
  g.strokeStyle=K.alpha(C.am,Math.min(1,.25/span+.15));g.lineWidth=12;g.beginPath();g.arc(o.x,o.y,o.r-6,Math.min(a,b),Math.max(a,b));g.stroke();
  st.spread=span/(pts.length-1)}
 if(st.lit.mid&&Math.abs(c0-o.y)>o.r*.2){g.fillStyle=K.alpha(C.rd,.5);hits(o.y).forEach(q=>{g.beginPath();g.arc(q.x,q.y,4,0,7);g.fill()});word('middle: close together',o.x-o.r*.2,o.y+o.r*.2,13,{al:'left',w:700})}
 pts.forEach(p=>{g.fillStyle=C.rd;g.beginPath();g.arc(p.x,p.y,4,0,7);g.fill()});
 const strong=st.spread<.11;word(pts.length<5?'some rays miss the Earth':strong?'5 rays close together: strong sunshine':'5 rays spread out: weak sunshine',K.W/2,18,K.narrow?14:16);
 const seen=(st.lit.mid?'✓ middle  ':'')+(st.lit.pole?'✓ near a pole':'');if(seen)word(seen,K.W/2,40,14,{ink:C.gr})}
function aimAt(y,final){const o=G();st.aim=Math.max(o.y-o.r*.95,Math.min(o.y+o.r*.95,y));if(!final){K.redraw();return}
 const v=(o.y-st.aim)/o.r;
 if(Math.abs(v)<.2){if(!st.lit.mid){st.lit.mid=true;return sunCheck('At the middle the rays hit the ground straight on. They bunch up, so the sunshine is strong and hot.')}}
 else if(Math.abs(v)>.62){if(!st.lit.pole){st.lit.pole=true;return sunCheck('Near a pole the same rays come in low and slanting. They spread out, so each patch of ground gets less warmth.')}}
 else tell('Rays a little spread out. Aim at the middle or near a pole.');K.redraw()}
function sunCheck(t){if(st.lit.mid&&st.lit.pole){st.sunDone=true;return say(t+' That is why the poles are the coldest places.',true)}say(t,true)}
/* ---- who: polar bear north, penguin south, parrot in the middle ---- */
function zoneOf(p){const o=G();if(Math.hypot(p.x-o.x,p.y-o.y)>o.r+12)return null;const v=(o.y-p.y)/o.r;return v>.55?'n':v<-.55?'s':Math.abs(v)<.3?'eq':'gap'}
function drawWho(){earth();const o=G(),C=K.col;equatorRing(0,K.alpha(C.gr,.8));poleTag('n');poleTag('s');
 st.homeIcons.forEach(([e,z])=>{const y=z==='n'?o.y-o.r*.82:z==='s'?o.y+o.r*.72:o.y-o.r*.08;word(e,o.x+(z==='eq'?o.r*.45:o.r*.35),y,K.narrow?26:30)});
 const cur=BEASTS[st.bi];if(!cur){word('Everyone is home',K.W/2,18,K.narrow?16:18,{ink:C.gr});return}
 const b=st.card=K.narrow?{x:8,y:8,w:150,h:44}:{x:12,y:12,w:190,h:50},h=st.carry,g=K.ctx,box=h?{x:h.x-b.w/2,y:h.y-b.h/2,w:b.w,h:b.h}:b;
 g.fillStyle=K.mix(C.pn,C.vi,C.dark?.22:.18);K.paint.rrect(box.x,box.y,box.w,box.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 word(cur[1]+' '+cur[0],box.x+box.w/2,box.y+box.h/2,K.narrow?15:17,{max:box.w-8})}
function sendTo(z){const cur=BEASTS[st.bi];st.carry=null;if(!cur)return;
 if(z==='gap'||!z)return say('Drop it near a pole or on the Equator.',false);
 if(z!==cur[2]){const why=cur[2]==='n'?`No wild ${cur[0]}s live ${ZN[z]}. ${cur[3]}`:cur[2]==='s'?`No wild penguins live ${ZN[z]}. ${cur[3]}`:`A parrot would freeze ${ZN[z]}. ${cur[3]}`;return say(why,false)}
 st.homeIcons.push([cur[1],z]);st.bi++;if(st.bi>=BEASTS.length){st.homed=true;return say('Polar bears are near the North Pole and penguins near the South Pole: opposite ends of the Earth.',true)}say('Yes! '+cur[3],true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=K,p=page();g.fillStyle=K.mix(C.pn,C.cy,C.dark?.05:.06);g.fillRect(0,0,W,H);
 if(p==='quiz'){earth({axis:true});poleTag('n');poleTag('s');K.fx.draw(g);return}
 ({find:drawFind,belt:drawBelt,walk:drawWalk,sun:drawSun,who:drawWho})[p]();if(st.msg)strip(st.msg);K.fx.draw(g)}
function say(t,good){st.msg=t;if(good)K.sound.pop();else if(good===false)K.sound.miss();tell(t);buttons();K.redraw();st.check&&st.check()}
function fresh(){for(const k in st)delete st[k];Object.assign(st,{found:{},k:-.6,v:0,went:{},aim:K?G().y-G().r*.4:0,lit:{},spread:1,bi:0,homeIcons:[],msg:'',check:()=>{}});if(K)K.redraw()}
function buttons(){if(!ui)return;ui.innerHTML='';const p=page();if(p==='quiz')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ui,t).onclick=f};
 if(p==='find'){if(!st.found.n)add('Tap the very top',()=>pickSpot('n'));add('Tap the middle',()=>pickSpot('mid'));if(!st.found.s)add('Tap the very bottom',()=>pickSpot('s'))}
 if(p==='belt'&&!st.beltSet){add('Move the belt up ⬆',()=>moveBelt(st.k-.3,true));add('Move the belt down ⬇',()=>moveBelt(st.k+.3,true))}
 if(p==='walk'&&!st.walked){add('Walk north ⬆',()=>walkTo(st.v+.35));add('Walk south ⬇',()=>walkTo(st.v-.35))}
 if(p==='sun'&&!st.sunDone){const o=G();add('Shine on the middle',()=>aimAt(o.y,true));add('Shine near the North Pole',()=>aimAt(o.y-o.r*.8,true));add('Shine near the South Pole',()=>aimAt(o.y+o.r*.8,true))}
 if(p==='who'&&BEASTS[st.bi])[['n','Near the North Pole'],['eq','On the Equator'],['s','Near the South Pole']].forEach(([z,t])=>add(t,()=>sendTo(z),`Put the ${BEASTS[st.bi][0]} ${ZN[z]}`))}
function down(p){const k=page(),o=G();if(k==='quiz')return false;
 if(k==='find'){if(Math.hypot(p.x-o.x,p.y-(o.y-o.r))<36){pickSpot('n');return true}if(Math.hypot(p.x-o.x,p.y-(o.y+o.r))<36){pickSpot('s');return true}
  if(Math.hypot(p.x-o.x,p.y-o.y)<o.r){pickSpot(Math.abs(p.y-o.y)<o.r*.35?'mid':'side',p);return true}return false}
 if(k==='belt'&&!st.beltSet){if(Math.abs(p.y-(o.y+st.k*o.r))<30&&Math.abs(p.x-o.x)<o.r+20){st.drag='belt';return true}return false}
 if(k==='walk'){if(st.hiker&&Math.hypot(p.x-st.hiker.x,p.y-st.hiker.y)<36){st.drag='hiker';return true}return false}
 if(k==='sun'&&!st.sunDone){if(st.sunAt&&Math.hypot(p.x-st.sunAt.x,p.y-st.sunAt.y)<40){st.drag='sun';return true}if(Math.hypot(p.x-o.x,p.y-o.y)<o.r){aimAt(p.y,true);return true}return false}
 if(k==='who'&&BEASTS[st.bi]){const b=st.card;if(b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){st.carry={x:p.x,y:p.y};return true}const z=zoneOf(p);if(z){sendTo(z);return true}}
 return false}
function move(p){const o=G();if(st.drag==='belt')return moveBelt((p.y-o.y)/o.r,false);if(st.drag==='hiker')return walkTo((o.y-p.y)/o.r);if(st.drag==='sun')return aimAt(p.y,false);
 if(st.carry){st.carry={x:p.x,y:p.y};K.redraw()}}
function up(p){const d=st.drag,o=G();st.drag=null;if(d==='belt')return moveBelt(st.k,true);if(d==='sun')return aimAt(st.aim,true);if(d==='hiker')return K.redraw();
 if(st.carry){const h=st.carry;sendTo(zoneOf(h))}}
const finish=(i,ok,line)=>()=>{if(K.step===i&&!K.isDone&&K.pred[i]!=null&&ok())K.done(line()+K.reveal(i))};
function demo(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(K.step===i)f()},K.reduced()?30*(j+1):(j+1)*380))}
function begin(i,hint,ok,line){fresh();say(hint);st.check=finish(i,ok,line)}
const steps=[
{h:'Top and bottom',p:'A globe is a round model of the Earth. The North Pole is at the very top. The South Pole is at the very bottom.',
 predict:{q:'Where is the North Pole on a globe?',opts:['in the middle','at the very top','on the side'],ans:1},
 task:'Find both poles',show:()=>demo(0,[()=>pickSpot('n'),()=>pickSpot('s')]),
 go:()=>begin(0,'Tap the very top of the globe, then the very bottom.',()=>st.gotPoles,()=>'Both poles found.')},
{h:'The Equator',p:'The Equator is an imaginary line round the middle of the Earth. It is halfway between the North Pole and the South Pole.',
 predict:{q:'Where does the Equator go?',opts:['round the top of the Earth','round the middle of the Earth'],ans:1},
 task:'Slide the belt to halfway',show:()=>demo(1,[()=>moveBelt(-.3,true),()=>moveBelt(0,true)]),
 go:()=>begin(1,'Drag the belt until both arrows match.',()=>st.beltSet,()=>'The Equator is halfway.')},
{h:'Colder and colder',p:'Near the Equator it is hot. Walk away from it, north or south, and it gets colder. The poles are as far from the Equator as you can go.',
 predict:{q:'The South Pole is at the bottom. Is it hot or cold there?',opts:['hot','freezing cold'],ans:1},
 task:'Walk the explorer to both poles',show:()=>demo(2,[()=>walkTo(.35),()=>walkTo(.7),()=>walkTo(1),()=>walkTo(-1)]),
 go:()=>begin(2,'Drag the explorer up to the North Pole and down to the South Pole.',()=>st.walked,()=>'Both poles are the coldest places.')},
{h:'Why so cold?',p:'The Sun shines on the whole Earth. At the middle its rays hit straight on. Near the poles the same rays come in low and spread out.',
 predict:{q:'Why are the poles so cold?',opts:['they are much further from the Sun','the sunshine hits them slanting and spread out'],ans:1},
 task:'Shine on the middle, then near a pole',show:()=>demo(3,[()=>aimAt(G().y,true),()=>aimAt(G().y-G().r*.8,true)]),
 go:()=>begin(3,'Drag the Sun, or tap the globe where it should shine.',()=>st.sunDone,()=>'Spread-out sunshine is weak.')},
{h:'Who lives where?',p:'Polar bears live in the Arctic, round the North Pole. Penguins live round Antarctica, near the South Pole. Parrots need warm forest.',
 predict:{q:'Do polar bears and penguins live at the same pole?',opts:['yes, both at the North Pole','no, at opposite ends'],ans:1},
 task:'Send each animal home',show:()=>demo(4,BEASTS.map(b=>()=>sendTo(b[2]))),
 go:()=>begin(4,'Drag the card onto the globe, or tap the globe.',()=>st.homed,()=>'Opposite ends of the Earth.')},
{h:'Challenge',p:'',go:()=>{fresh();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const QS=[
 ['Where is the South Pole on a globe?',[['at the very bottom','ok'],['in the middle','mid'],['at the very top','flip']]],
 ['What is the Equator?',[['an imaginary line round the middle of the Earth','ok'],['a line round the top','belt'],['a real rope you can see','real']]],
 ['Which places are the coldest on Earth?',[['the North Pole and the South Pole','ok'],['only the North Pole','south'],['the Equator','mid']]],
 ['Why are the poles so cold?',[['the sunshine there is slanting and spread out','ok'],['they are much further from the Sun','far'],['the Sun never shines on Earth','far']]],
 ['You walk from the Equator towards a pole. What happens?',[['it gets colder','ok'],['it gets hotter','south'],['it stays the same','same']]],
 ['Where do wild penguins live?',[['round Antarctica, near the South Pole','ok'],['at the North Pole with polar bears','bear'],['near the Equator','mid']]],
 ['How far is each pole from the Equator?',[['the same distance','ok'],['the North Pole is much further','belt'],['the South Pole is touching it','belt']]]];
function whyNot(t){let m='Picture a globe: the poles at the top and bottom, the Equator round the middle.';
 if(t==='mid')m='The middle of the Earth is the Equator, the hottest part. The poles are at the very top and the very bottom.';
 if(t==='flip')m='The North Pole is at the top. The South Pole is at the very bottom.';
 if(t==='belt')m='The Equator is halfway, so both poles are the same distance from it.';
 if(t==='real')m='You cannot see the Equator on the ground. It is a line we draw on globes and maps.';
 if(t==='south')m='The South Pole is freezing too. Going away from the Equator, north or south, gets colder.';
 if(t==='far')m='The poles are not much further from the Sun. Its rays hit them slanting and spread out, so they warm less.';
 if(t==='same')m='It does not stay the same. The further from the Equator, the colder it gets.';
 if(t==='bear')m='Penguins live in the south and polar bears in the north. They never meet in the wild.';
 return m}
function nextQ(){qi++;const Q=QS[qi%QS.length],r=qi%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qz.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t)});tell('Challenge: '+Q[0]);K.redraw()}
function grade(t){qz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)K.win();else K.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+whyNot(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
K=FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:A=>{qz.hidden=A.step!==5;ui.hidden=A.step===5;buttons()},
 init:A=>{K=A;fresh();const w=c.el('div',{class:'fl-below'},A.below);ui=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Globe buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
K.start()})})();
