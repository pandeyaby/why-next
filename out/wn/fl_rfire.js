/* Flagship: the Ring of Fire (ages 7-9; NGSS 4-ESS2-2 "analyze and interpret data from maps to describe patterns of
   Earth's features"; National Curriculum in England KS2 geography, physical geography: volcanoes and earthquakes).
   Drop earthquakes on a Pacific-centred world map and watch them fall in lines, add volcanoes in the same lines,
   trace the ring with a finger, tap quakes to find the plate edges they sit on, then find which places are on the
   ring. Not flagearthq (what an earthquake is) or flagvolc (inside a volcano). */
(()=>{
VIS.reg('flagrfire',c=>{let G,ui,qz,qk=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',QK='#dc2626',VO='#ea580c',TAU=Math.PI*2;
const LAND=[
 [[30,70],[60,75],[100,77],[140,72],[180,68],[180,64],[162,60],[156,51],[142,47],[132,43],[122,31],[120,22],[108,20],[105,10],[100,13],[97,16],[90,22],[80,10],[73,20],[58,25],[50,30],[40,30],[30,34]],
 [[30,31],[35,29],[43,12],[51,12],[40,-15],[35,-25],[30,-31]],
 [[114,-22],[122,-17],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[140,-38],[132,-32],[115,-35]],
 [[193,66],[200,71],[240,70],[270,72],[290,68],[300,55],[296,46],[284,40],[280,32],[280,26],[277,30],[270,30],[262,27],[263,20],[272,21],[272,16],[277,13],[281,9],[275,10],[268,15],[258,18],[251,23],[243,32],[236,40],[235,48],[228,56],[212,59],[200,57],[195,62]],
 [[281,9],[288,11],[300,7],[310,0],[325,-5],[322,-22],[312,-28],[302,-40],[292,-52],[288,-55],[285,-45],[287,-30],[289,-18],[282,-14],[279,-5],[280,1]],
 [[305,62],[318,61],[330,70],[330,76],[300,77],[295,76]]];
const ISLE=[[138,37,4,8],[122,12,2,4],[114,1,4,4],[105,-4,7,2],[142,-5,6,2.5],[174,-40,2,5],[47,-19,2,5]];
/* the ring, south-west round to south-east, with the plates that meet there */
const RING=[[176,-39,'Pacific and Australian'],[185,-19,'Pacific and Australian'],[167,-15,'Pacific and Australian'],[150,-6,'Pacific and Australian'],[127,1,'Philippine Sea and Eurasian'],
 [125,11,'Philippine Sea and Eurasian'],[122,24,'Philippine Sea and Eurasian'],[134,33,'Philippine Sea and Eurasian'],[142,38,'Pacific and North American'],[146,44,'Pacific and North American'],[158,53,'Pacific and North American'],[176,51,'Pacific and North American'],
 [192,52,'Pacific and North American'],[210,59,'Pacific and North American'],[236,45,'Juan de Fuca and North American'],[238,37,'Pacific and North American'],[256,18,'Cocos and North American'],[270,13,'Cocos and Caribbean'],[278,8,'Cocos and Caribbean'],
 [282,2,'Nazca and South American'],[280,-6,'Nazca and South American'],[285,-15,'Nazca and South American'],[290,-24,'Nazca and South American'],[288,-33,'Nazca and South American'],[286,-42,'Nazca and South American']];
const SUNDA=[[127,-7,'Australian and Eurasian'],[115,-9,'Australian and Eurasian'],[105,-7,'Australian and Eurasian'],[96,3,'Australian and Eurasian']];
const BELT=[[44,38,'Arabian and Eurasian'],[55,30,'Arabian and Eurasian'],[70,36,'Indian and Eurasian'],[84,28,'Indian and Eurasian'],[95,25,'Indian and Eurasian']];
const CHECK=[0,3,5,7,9,11,13,15,17,19,22,24];
const PLACES=[['Japan',138,36,1],['Chile',289,-33,1],['New Zealand',175,-40,1],['California',240,36,1],['Indonesia',110,-7,1],['Middle of Australia',134,-25,0],['Brazil',313,-10,0],['Madagascar',47,-19,0]];
const kind=()=>['quake','volc','trace','edge','where','chal'][G.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v));
function rnd(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function pts(n,seed,beltShare,looseShare){const r=rnd(seed),out=[];for(let i=0;i<n;i++){const u=r();let p;
 if(u<looseShare)p=[40+r()*280,-50+r()*110,null];else if(u<looseShare+beltShare){const b=BELT[Math.floor(r()*BELT.length)];p=[b[0]+(r()-.5)*10,b[1]+(r()-.5)*5,b[2]]}
 else{const L=r()<.2?SUNDA:RING,k=Math.floor(r()*(L.length-1)),f=r(),a=L[k],b=L[k+1];p=[a[0]+(b[0]-a[0])*f+(r()-.5)*4,a[1]+(b[1]-a[1])*f+(r()-.5)*4,(f<.5?a:b)[2]]}out.push(p)}return out}
const QUAKES=pts(90,7,.12,.04),VOLCS=pts(40,11,.05,.03);
function box(){const top=G.H*.14,bot=G.H*.86;return{x0:6,w:G.W-12,y0:top,h:bot-top}}
function xy(lon,lat){const b=box();return{x:b.x0+(lon-30)/300*b.w,y:b.y0+(75-lat)/135*b.h}}
function label(t,x,y,o){o=o||{};const g=G.ctx;let f=o.f||(G.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>G.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=lim(x-w/2,4,G.W-w-4);
 g.fillStyle='#ffffff';G.paint.rrect(l,y-h/2,w,h,10);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function map(){const g=G.ctx,b=box();g.fillStyle=G.mix(G.col.pn,'#e2e8f0',G.col.dark?.06:.5);g.fillRect(0,0,G.W,G.H);
 g.fillStyle=G.col.dark?'#1e3a5f':'#bfdbfe';G.paint.rrect(b.x0,b.y0,b.w,b.h,8);g.fill();
 g.save();G.paint.rrect(b.x0,b.y0,b.w,b.h,8);g.clip();g.fillStyle=G.col.dark?'#4d7c0f':'#a3c48a';g.strokeStyle=G.col.dark?'#365314':'#6b8f55';g.lineWidth=1;
 LAND.forEach(P=>{g.beginPath();P.forEach(([lo,la],i)=>{const p=xy(lo,la);i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)});g.closePath();g.fill();g.stroke()});
 ISLE.forEach(([lo,la,rw,rh])=>{const p=xy(lo,la),q=xy(lo+rw,la-rh);g.beginPath();g.ellipse(p.x,p.y,Math.abs(q.x-p.x),Math.abs(q.y-p.y),0,0,TAU);g.fill()});
 g.fillStyle=G.col.dark?'#bfdbfe':'#1e3a8a';g.font=`italic 700 ${G.narrow?10:13}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const pc=xy(205,5);g.fillText('Pacific Ocean',pc.x,pc.y);g.restore()}
function dot(p,s){const g=G.ctx,q=xy(p[0],p[1]);g.fillStyle=QK;g.globalAlpha=.85;g.beginPath();g.arc(q.x,q.y,s,0,TAU);g.fill();g.globalAlpha=1}
function tri(p,s){const g=G.ctx,q=xy(p[0],p[1]);g.fillStyle=VO;g.strokeStyle='#431407';g.lineWidth=1;g.beginPath();g.moveTo(q.x,q.y-s);g.lineTo(q.x+s*.9,q.y+s*.7);g.lineTo(q.x-s*.9,q.y+s*.7);g.closePath();g.fill();g.stroke()}
function edges(){const g=G.ctx;g.strokeStyle=G.col.dark?'#fde047':'#7c2d12';g.lineWidth=2.5;g.setLineDash([7,5]);[RING,SUNDA,BELT].forEach(L=>{g.beginPath();L.forEach((p,i)=>{const q=xy(p[0],p[1]);i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)});g.stroke()});g.setLineDash([])}
const sz=()=>G.narrow?3:4;
function drawQuake(){map();QUAKES.slice(0,S.q).forEach(p=>dot(p,sz()));label(S.q?`${S.q} big earthquakes`:'Where do big earthquakes happen?',G.W/2,G.H*.06,{ok:S.q>=90});label(S.q>=90?'Most are in lines round the Pacific':'Tap the map to add 30 more',G.W/2,G.H*.94,{f:12,ok:S.q>=90})}
function addQuakes(){if(S.q>=90)return;S.q+=30;G.sound.tick();const ring=QUAKES.slice(0,S.q).filter(p=>p[2]&&!BELT.some(b=>b[2]===p[2])).length;
 say(`${S.q} earthquakes on the map. ${ring} of them are in lines round the edge of the Pacific Ocean.`+(S.q>=90?' They are not spread out evenly. Most make a ring round the Pacific: the Ring of Fire.':''))}
function drawVolc(){map();QUAKES.forEach(p=>dot(p,sz()-1));VOLCS.slice(0,S.v).forEach(p=>tri(p,G.narrow?5:6));label(S.v?`${S.v} volcanoes on top of the earthquakes`:'Now add volcanoes',G.W/2,G.H*.06,{ok:S.v>=40});label('Tap the map to add 20 volcanoes',G.W/2,G.H*.94,{f:12})}
function addVolcs(){if(S.v>=40)return;S.v+=20;G.sound.pop();say(`${S.v} volcanoes added. They sit in the same lines as the earthquakes.`+(S.v>=40?' Earthquakes and volcanoes happen in the same places: along the Ring of Fire and a few other belts.':''))}
function drawTrace(){map();const g=G.ctx;QUAKES.forEach(p=>dot(p,sz()-1));if(S.path.length>1){g.strokeStyle=YES;g.lineWidth=5;g.lineCap='round';g.beginPath();S.path.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke()}
 CHECK.forEach((k,i)=>{const q=xy(RING[k][0],RING[k][1]),on=S.lit.has(i);g.fillStyle=on?YES:'#ffffff';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(q.x,q.y,G.narrow?7:9,0,TAU);g.fill();g.stroke()});
 label(`${S.lit.size} of ${CHECK.length} ring stops lit`,G.W/2,G.H*.06,{ok:S.lit.size>=CHECK.length});label('Drag along the red dots, New Zealand to Chile',G.W/2,G.H*.94,{f:12})}
function light(i){if(S.lit.has(i))return;S.lit.add(i);G.sound.tick();if(S.lit.size>=CHECK.length)say('You traced the whole ring: from New Zealand, up past Indonesia, the Philippines and Japan, across to Alaska, and down the coast of the Americas to Chile. About 40,000 km long.');else if(S.lit.size%3===0)say(`${S.lit.size} of ${CHECK.length} stops lit.`);else{G.cv.setAttribute('aria-label',`${S.lit.size} of ${CHECK.length} ring stops lit.`);G.redraw();S.hit()}}
function nextStop(){const i=CHECK.findIndex((k,j)=>!S.lit.has(j));if(i>=0){const q=xy(RING[CHECK[i]][0],RING[CHECK[i]][1]);S.path.push(q);light(i)}}
function drawEdge(){map();edges();QUAKES.forEach((p,i)=>dot(p,S.picked.includes(i)?sz()+4:sz()-1));label(`Plate edges (dashed). Quakes tapped: ${S.picked.length} of 3`,G.W/2,G.H*.06,{ok:S.picked.length>=3,f:G.narrow?12:15});if(S.last)label(S.last,G.W/2,G.H*.94,{f:G.narrow?11:13})}
function pickQuake(i){if(i==null){i=[5,40,77].find(j=>!S.picked.includes(j)&&QUAKES[j][2]);if(i==null)i=QUAKES.findIndex((p,j)=>p[2]&&!S.picked.includes(j))}const p=QUAKES[i];if(S.picked.includes(i))return;
 if(!p[2]){G.sound.miss();S.last='Far from a plate edge';return say('This one is far from a plate edge. A few earthquakes happen inside plates, but they are rare. Try one in a line.')}
 S.picked.push(i);G.sound.pop();S.last=`Edge of the ${p[2]} plates`;say(`This quake sits where the ${p[2]} plates meet.`+(S.picked.length>=3?' The ground is cut into giant pieces called plates. They push, pull and slide at their edges. That is where the ground shakes and rock melts.':''))}
function pins(){return PLACES.map(([n,lo,la,on],i)=>({i,n,on,...xy(lo,la)}))}
function drawWhere(){map();edges();const g=G.ctx;pins().forEach(p=>{const st=S.ans[p.i];g.fillStyle=st===1?YES:st===0?'#94a3b8':'#ffffff';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,G.narrow?9:11,0,TAU);g.fill();g.stroke();
  if(st!=null){g.fillStyle=INK;g.font=`800 ${G.narrow?10:12}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='bottom';const t=p.n;const w=g.measureText(t).width+8;g.fillStyle='#ffffff';g.fillRect(lim(p.x-w/2,2,G.W-w-2),p.y-28,w,16);g.fillStyle=INK;g.fillText(t,lim(p.x,w/2+2,G.W-w/2-2),p.y-13)}});
 const found=pins().filter(p=>p.on&&S.ans[p.i]===1).length;label(`On the ring: ${found} of 5 found`,G.W/2,G.H*.06,{ok:found>=5});label('Tap a pin to check it',G.W/2,G.H*.94,{f:12})}
function tapPin(i){if(S.ans[i]!=null)return;const P=PLACES[i];S.ans[i]=P[3];if(P[3]){G.sound.pop();const n=PLACES.filter((p,j)=>p[3]&&S.ans[j]===1).length;say(`${P[0]} is on the Ring of Fire, at a plate edge. It has earthquakes and volcanoes. ${n} of 5 found.`)}
 else{G.sound.miss();say(`${P[0]} is not on the ring. It sits in the middle of a plate, far from an edge, so big earthquakes are rare there and it has no active volcanoes.`)}}
function draw(){const k=kind();if(k==='chal'){map();label('Challenge',G.W/2,G.H*.08,{ok:1});return}({quake:drawQuake,volc:drawVolc,trace:drawTrace,edge:drawEdge,where:drawWhere})[k]();G.fx.draw(G.ctx)}
function down(p){const k=kind();if(k==='trace'){S.drag=1;S.path=[p];return true}
 if(k==='quake'){addQuakes();return false}if(k==='volc'){addVolcs();return false}
 if(k==='edge'){let best=-1,d=1e9;QUAKES.forEach((q,i)=>{const z=xy(q[0],q[1]),e=Math.hypot(z.x-p.x,z.y-p.y);if(e<d){d=e;best=i}});if(d<30)pickQuake(best);return false}
 if(k==='where'){const h=pins().find(q=>Math.hypot(q.x-p.x,q.y-p.y)<26);if(h)tapPin(h.i);return false}return false}
function move(p){if(!S.drag)return;S.path.push(p);CHECK.forEach((k,i)=>{const q=xy(RING[k][0],RING[k][1]);if(Math.hypot(q.x-p.x,q.y-p.y)<(G.narrow?22:28))light(i)});G.redraw()}
function up(){if(!S.drag)return;S.drag=0;if(S.lit.size<CHECK.length)say(`${S.lit.size} of ${CHECK.length} stops lit. Keep going along the line of red dots.`)}
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{q:0,v:0,path:[],lit:new Set(),picked:[],last:'',ans:{},drag:0,hit:()=>{}})}
function say(t){c.say(t);G.cv.setAttribute('aria-label',t);G.redraw();keys();S.hit()}
const goal=(i,ok,msg)=>()=>{if(G.step===i&&ok()&&(!steps[i].predict||G.pred[i]!=null)&&!G.isDone)G.done(msg+G.reveal(i))};
function enter(i,desc,ok,msg){fresh();say(desc);S.hit=goal(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function keys(){if(!ui)return;ui.innerHTML='';const k=kind(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ui,t).onclick=f};
 if(k==='quake'&&S.q<90)B('Add 30 earthquakes',addQuakes);if(k==='volc'&&S.v<40)B('Add 20 volcanoes',addVolcs);
 if(k==='trace'&&S.lit.size<CHECK.length)B('Trace the next part',nextStop,'Trace the ring to the next stop');
 if(k==='edge'&&S.picked.length<3)B('Check a quake',()=>pickQuake(),'Check which plate edge the next earthquake is on');
 if(k==='where')PLACES.forEach(([n],i)=>{if(S.ans[i]==null)B(n,()=>tapPin(i),`Check ${n}`)})}
const steps=[
{h:'Drop the earthquakes',p:'This map has the Pacific Ocean in the middle. Tap the map, or the button, to add the places where big earthquakes happened.',
 predict:{q:'Where will most big earthquakes be?',opts:['Spread out evenly all over the world','In lines, mostly round the Pacific edge'],ans:1},task:'Add 90 earthquakes',
 show:()=>demo(0,[addQuakes,addQuakes,addQuakes],650),
 go:()=>enter(0,'A world map with the Pacific Ocean in the middle and no earthquakes yet.',()=>S.q>=90,'Earthquakes are not random. Most of the big ones line up round the edge of the Pacific Ocean.')},
{h:'Add the volcanoes',p:'Volcanoes are the orange triangles. Tap the map, or the button, to add them.',
 predict:{q:'Will volcanoes be in the same places as earthquakes?',opts:['No, volcanoes are somewhere else','Yes, mostly in the same lines'],ans:1},task:'Add 40 volcanoes',
 show:()=>demo(1,[addVolcs,addVolcs],700),
 go:()=>enter(1,'The earthquake map, ready for volcanoes.',()=>S.v>=40,'Volcanoes and earthquakes share the same lines. About 3 in every 4 active volcanoes are on the Ring of Fire.')},
{h:'Trace the ring',p:'Drag your finger along the line of red dots, from New Zealand up to Japan, across to Alaska and down to Chile. Or use the button.',task:'Light up every ring stop',
 show:()=>demo(2,CHECK.map(()=>nextStop),400),
 go:()=>enter(2,'The earthquake map with 12 white stops along the line of dots.',()=>S.lit.size>=CHECK.length,'That horseshoe round the Pacific is the Ring of Fire, about 40,000 km long.')},
{h:'Where plates meet',p:'The dashed lines are plate edges. Tap 3 earthquakes, or tap Check a quake, to see which plates meet there.',
 predict:{q:'Why do earthquakes make lines?',opts:['Big cities make the ground weak','Earth\'s outside is cut into plates, and they meet there'],ans:1},task:'Check 3 earthquakes',
 show:()=>demo(3,[()=>pickQuake(),()=>pickQuake(),()=>pickQuake()],600),
 go:()=>enter(3,'The map with plate edges drawn as dashed lines.',()=>S.picked.length>=3,'Earth\'s rocky outside is cut into plates. Where plates push, pull or slide past each other, the ground shakes and rock can melt to make volcanoes.')},
{h:'On the ring?',p:'Some of these places are on the Ring of Fire and some are not. Tap each pin to check, or use the buttons.',task:'Find the 5 places on the ring',
 show:()=>demo(4,PLACES.map((p,i)=>()=>{if(p[3])tapPin(i)}),550),
 go:()=>enter(4,'The map with 8 place pins.',()=>PLACES.every((p,i)=>!p[3]||S.ans[i]===1),'Japan, Indonesia, New Zealand, California and Chile are on the ring. The middle of Australia, Brazil and Madagascar are not.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hit()});
const QS=[
 {q:'Where are most big earthquakes?',a:'In lines round the Pacific Ocean',o:[['Evenly spread over the world','rand'],['In the middle of big countries','mid']]},
 {q:'Why are earthquakes in lines?',a:'They happen where plates meet',o:[['Hot places get more','hot'],['Cities shake the ground','city']]},
 {q:'Which place is on the Ring of Fire?',a:'Japan',o:[['The middle of Australia','mid'],['Brazil','mid']]},
 {q:'Volcanoes are mostly…',a:'in the same lines as earthquakes',o:[['in hot deserts','hot'],['in random places','rand']]},
 {q:'Is the Ring of Fire made of real fire?',a:'No, it is a ring of volcanoes and quakes',o:[['Yes, the sea is on fire','fire'],['Yes, a ring of lava on the sea','fire']]},
 {q:'Chile has lots of earthquakes because…',a:'two plates meet along its coast',o:[['it is very hot there','hot'],['it is a big country','city']]}];
function why(t){let m='Look back at the map: the dots make lines along plate edges.';
 if(t==='rand')m='The map showed they are not random or even. Most fall in lines round the Pacific edge.';
 if(t==='mid')m='The middles of plates are far from the edges. Big quakes there are rare, and there are no active volcanoes in the middle of Australia or Brazil.';
 if(t==='hot')m='Heat from the Sun has nothing to do with it. Cold Alaska is on the ring; hot deserts like the Sahara are not.';
 if(t==='city')m='People and buildings do not cause big earthquakes. Plates moving at their edges do.';
 if(t==='fire')m='The name is a picture word. It is a horseshoe of volcanoes and earthquakes round the Pacific, not real flames.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);G.redraw()}
function judge(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)G.win();else G.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.58,tall:.9,draw,onStep:B=>{qz.hidden=B.step!==5;ui.hidden=B.step===5;keys()},
 init:B=>{G=B;const A=G,wrap=c.el('div',{class:'fl-below'},G.below);ui=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Map controls'},wrap);qz=c.el('div',{class:'fl-chal'},G.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
