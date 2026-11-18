/* Flagship: places different from where I live (ages 4-5). Hot/cold sort, a week of rain, animal homes, same or
   different, mystery places from clues. Labels sit on theme-coloured badges for contrast. */
(()=>{
VIS.reg('flagplaces',c=>{let A,bar,box,q=-1,run=0;const K={};
const view=()=>['hot','rain','home','same','clue','quiz'][A.step];
const sfx=k=>A.sound[k](),paintNow=()=>A.redraw(),sync=()=>{paintNow();keys()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function font(px,wt){return `${wt||800} ${Math.round(px*(A.narrow?1:1.15))}px system-ui,sans-serif`}
function word(t,x,y,px,ink,wt){const g=A.ctx;g.font=font(px,wt);g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-14)}
function box2(x,y,w,h,r,fill,edge,lw){const g=A.ctx;A.paint.rrect(x,y,w,h,r);g.fillStyle=fill;g.fill();g.lineWidth=lw||2.5;g.strokeStyle=edge||A.col.tx;g.stroke()}
function tag(t,x,y,px,edge){const g=A.ctx;g.font=font(px||13);const w=Math.min(A.W-10,g.measureText(t).width+16),h=(px||13)*1.9;box2(x-w/2,y-h/2,w,h,h/2,A.col.pn,edge||A.col.tx,2);word(t,x,y,px||13)}
function emo(e,x,y,s){const g=A.ctx;g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function scene(k,x,y,w,h){const g=A.ctx;g.save();A.paint.rrect(x,y,w,h,10);g.clip();
 const sky={arctic:'#dbeafe',desert:'#fde68a',rain:'#86efac',sea:'#bae6fd',town:'#bfdbfe',north:'#e0f2fe',mystery:'#e2e8f0'}[k];g.fillStyle=sky;g.fillRect(x,y,w,h);
 if(k==='arctic'||k==='north'){g.fillStyle='#ffffff';g.fillRect(x,y+h*.62,w,h*.38);g.fillStyle='#93c5fd';g.beginPath();g.moveTo(x+w*.55,y+h*.62);g.lineTo(x+w*.7,y+h*.3);g.lineTo(x+w*.86,y+h*.62);g.fill()}
 if(k==='desert'){g.fillStyle='#f59e0b';g.beginPath();g.arc(x+w*.8,y+h*.25,h*.13,0,7);g.fill();g.fillStyle='#d97706';g.beginPath();g.ellipse(x+w*.3,y+h,w*.5,h*.4,0,0,7);g.fill();g.fillStyle='#fbbf24';g.beginPath();g.ellipse(x+w*.85,y+h*1.05,w*.45,h*.38,0,0,7);g.fill()}
 if(k==='rain'){g.fillStyle='#166534';g.fillRect(x,y+h*.7,w,h*.3);[.15,.4,.65,.9].forEach((f,i)=>{g.fillStyle='#78350f';g.fillRect(x+w*f-3,y+h*.35,6,h*.4);g.fillStyle=i%2?'#15803d':'#14532d';g.beginPath();g.arc(x+w*f,y+h*.33,h*.2,0,7);g.fill()})}
 if(k==='sea'){g.fillStyle='#0284c7';g.fillRect(x,y+h*.45,w,h*.3);g.fillStyle='#fcd34d';g.fillRect(x,y+h*.72,w,h*.28);g.fillStyle='#78716c';g.beginPath();g.ellipse(x+w*.2,y+h*.78,w*.12,h*.08,0,0,7);g.fill()}
 if(k==='town'){g.fillStyle='#4ade80';g.fillRect(x,y+h*.65,w,h*.35);house(x+w*.18,y+h*.65,w*.26,'#f87171');g.fillStyle='#78350f';g.fillRect(x+w*.7-3,y+h*.3,6,h*.36);g.fillStyle='#15803d';g.beginPath();g.arc(x+w*.7,y+h*.3,h*.16,0,7);g.fill()}
 if(k==='north'){house(x+w*.1,y+h*.62,w*.24,'#dc2626');house(x+w*.4,y+h*.62,w*.22,'#facc15')}
 if(k==='mystery'){word('?',x+w/2,y+h/2,h*.5,'#334155',900)}
 g.restore();box2(x,y,w,h,10,'rgba(0,0,0,0)',A.col.tx,2.5)}
function house(x,y,w,col){const g=A.ctx,h=w*.7;g.fillStyle=col;g.fillRect(x,y-h,w,h);g.fillStyle='#334155';g.beginPath();g.moveTo(x-4,y-h);g.lineTo(x+w/2,y-h-w*.45);g.lineTo(x+w+4,y-h);g.fill();g.fillStyle='#fef3c7';g.fillRect(x+w*.38,y-h*.55,w*.24,h*.55)}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.3);g.fillRect(0,0,W,H);
 ({hot:dHot,rain:dRain,home:dHome,same:dSame,clue:dClue,quiz:dQuiz})[view()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: hot or cold ---- */
const HC=[['Arctic','arctic',0],['Hot desert','desert',1],['Rainforest','rain',1],['Antarctica','arctic',0]];
const card=()=>{const w=Math.min(A.W*.5,240),h=w*.62;return{x:A.W/2-w/2+K.dx,y:A.H*.17,w,h}};
const bins=()=>[{x:A.W*.03,y:A.H*.64,w:A.W*.45,h:A.H*.33},{x:A.W*.52,y:A.H*.64,w:A.W*.45,h:A.H*.33}];
function dHot(g,W,H,C){const B=bins();
 B.forEach((b,i)=>{box2(b.x,b.y,b.w,b.h,14,A.alpha(i?'#f97316':'#38bdf8',C.dark?.22:.28),i?C.rd:C.cy,3);word(i?'Hot ☀':'Cold ❄',b.x+b.w/2,b.y+18,16);
  K.sorted.filter(s=>HC[s][2]===i).forEach((s,j)=>tag(HC[s][0],b.x+b.w/2,b.y+48+j*30,12))});
 if(K.hc<4){const r=card();scene(HC[K.hc][1],r.x,r.y,r.w,r.h);tag(HC[K.hc][0],r.x+r.w/2,r.y+r.h+16,14,K.bad?C.rd:C.tx)}
 word(K.hc<4?'Hot or cold? Drag it to a side.':'All 4 places are sorted.',W/2,H*.07,16)}
function sortTo(side){if(view()!=='hot'||K.hc>=4)return;K.dx=0;const[nm,,ans]=HC[K.hc];
 if(side!==ans){K.bad=1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');
  let m=ans?`${nm==='Rainforest'?'A rainforest is warm and wet all year':'A hot desert has strong sun and very little rain'}. It goes on the hot side.`:`Brr! ${nm==='Arctic'?'The Arctic':'Antarctica'} is icy and snowy. It goes on the cold side.`;speak(m);return paintNow()}
 K.sorted.push(K.hc);K.hc++;sfx('pop');speak(`Yes. ${nm} goes on the ${ans?'hot':'cold'} side.`+(K.hc>=4?' The Arctic and Antarctica are cold. The hot desert and the rainforest are hot.':''));sync();K.want()}
/* ---- 2: a week of rain ---- */
const WET=[1,1,0,1,1,1,1];
function jar(x,y,w,h,f,C){const g=A.ctx;g.fillStyle=A.alpha('#0284c7',.85);g.fillRect(x+3,y+h*(1-f),w-6,h*f);g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+h);g.lineTo(x+w,y+h);g.lineTo(x+w,y);g.stroke();
 for(let i=1;i<7;i++){g.fillStyle=C.tx;g.fillRect(x,y+h*i/7,8,2)}}
function dRain(g,W,H,C){const cw=W*.42,sh=cw*.5;[['Rainforest','rain',0],['Hot desert','desert',1]].forEach(([nm,k,i])=>{const x=W*(i?.54:.04);scene(k,x,H*.12,cw,sh);tag(nm,x+cw/2,H*.12+sh+14,13);
  const n=i?0:WET.slice(0,K.day).reduce((a,b)=>a+b,0);
  for(let d=0;d<7;d++){const dx=x+cw*(d+.5)/7,dy=H*.12+sh+40;emo(d<K.day?(i||!WET[d]?'☀️':'🌧️'):'·',dx,dy,Math.min(24,cw/6.6))}
  jar(x+cw*.3,H*.56,cw*.4,H*.26,K.fill[i],C);word(`${n} rainy day${n===1?'':'s'}`,x+cw/2,H*.88,13,C.tx,800)});
 word(`Day ${K.day} of 7`,W/2,H*.05,16);word(K.day>=7?'The rainforest got lots of rain. The desert got none.':'Press Next day to see the weather.',W/2,H*.96,12,C.tx,700)}
function nextDay(){if(view()!=='rain')return;if(K.day>=7){sfx('miss');let m='That was the whole week. Look at the jars: the rainforest jar is full and the desert jar is still dry.';return speak(m)}
 const d=K.day++,wet=WET[d];sfx(wet?'whoosh':'tick');const to=[WET.slice(0,K.day).reduce((a,b)=>a+b,0)/7,0];A.tween(K.fill,{0:to[0],1:0},A.reduced()?1:250,'out');
 speak(`Day ${K.day}. ${wet?'Rain in the rainforest.':'Sun in the rainforest today.'} Sun and no rain in the hot desert.`+(K.day>=7?' The week is over. The rainforest is wet; the hot desert is dry.':''));sync();K.want()}
/* ---- 3: take each animal home ---- */
const ZN=[['Arctic','arctic'],['Hot desert','desert'],['Rainforest','rain'],['Seaside','sea']];
const pl=i=>i?ZN[i][0].toLowerCase():'Arctic';
const AN=[['🐻‍❄️','polar bear',0],['🐪','camel',1],['🦜','parrot',2],['🦀','crab',3]];
const zone=i=>{const w=A.W*.45,h=A.H*.27;return{x:A.W*(i%2?.52:.03),y:A.H*(.38+(i>1?.31:0)),w,h}};
function dHome(g,W,H,C){for(let i=0;i<4;i++){const z=zone(i);scene(ZN[i][1],z.x,z.y,z.w,z.h);tag(ZN[i][0],z.x+z.w/2,z.y+z.h-14,12,K.bad===i+1?C.rd:C.tx);
  K.homed.filter(a=>AN[a][2]===i).forEach(a=>emo(AN[a][0],z.x+z.w/2,z.y+z.h*.42,Math.min(40,z.h*.38)))}
 if(K.an<4){const a=AN[K.an];emo(a[0],W/2+K.dx,H*.17+K.dy,Math.min(64,H*.13));tag(`Take the ${a[1]} home`,W/2,H*.3,13)}else word('Every animal is home.',W/2,H*.2,16)}
function takeTo(i){if(view()!=='home'||K.an>=4)return;K.dx=K.dy=0;const[,nm,ans]=AN[K.an];
 if(i!==ans){K.bad=i+1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');
  let m=['A polar bear has thick fur and fat to stay warm. It lives in the icy Arctic.','A camel can go for days without a drink. It lives in the hot, dry desert.','This parrot eats fruit from tall trees. It lives in the warm, wet rainforest.','A crab lives by the sea, in rock pools and on the sand.'][ans];speak(m);return paintNow()}
 K.homed.push(K.an);K.an++;sfx('pop');speak(`Yes! The ${nm} lives ${['in the Arctic','in the hot desert','in the rainforest','at the seaside'][i]}.`+(K.an>=4?' Each animal fits the place it lives in.':''));sync();K.want()}
/* ---- 4: same or different ---- */
const SD=[['People live here',1],['There are houses',1],['Snow and ice for most of the year',0],['Tall trees grow',0]];
function dSame(g,W,H,C){const w=W*.45,h=w*.72;scene('town',W*.03,H*.1,w,h);scene('north',W*.52,H*.1,w,h);tag("Sam's town",W*.03+w/2,H*.1+h+14,12);tag('A town in the Arctic',W*.52+w/2,H*.1+h+14,12);
 K.said.forEach((s,j)=>word(`${SD[s][1]?'Same':'Different'}: ${SD[s][0]}`,W/2,H*.1+h+44+j*20,12,C.tx,800));
 if(K.sd<4)tag(SD[K.sd][0],W/2,H*.9,14,K.bad?C.rd:C.tx);else word('Some things are the same. Some are different.',W/2,H*.9,13)}
function judgeSD(same){if(view()!=='same'||K.sd>=4)return;const[t,ans]=SD[K.sd];
 if(same!==!!ans){K.bad=1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');
  let m=['Look again: people live in both places. In the Arctic, people live in towns and villages too.','Look again: both pictures have houses. Arctic houses are often painted bright colours.',"Look again: Sam's town has green grass. The Arctic town is covered in snow and ice for most of the year.","Look again: Sam's town has a tall tree. It is too cold for tall trees in this part of the Arctic."][K.sd];speak(m);return paintNow()}
 K.said.push(K.sd);K.sd++;sfx('pop');speak(`Yes, that is ${ans?'the same':'different'}: ${t.toLowerCase()}.`);sync();K.want()}
/* ---- 5: mystery places ---- */
const MY=[[['There is lots of sand.','The sand is next to the sea.','Crabs live in the rock pools.'],3,[[1,3],[3],[3]]],
 [['It is hot.','It rains nearly every day.','Tall trees and parrots live here.'],2,[[1,2],[2],[2]]]];
function dClue(g,W,H,C){const R=MY[Math.min(K.r,1)],sw=Math.min(W*.5,220),sh=sw*.6;scene(K.solved>K.r||K.r>1?ZN[R[1]][1]:'mystery',W/2-sw/2,H*.1,sw,sh);
 tag(K.r>1?'Both places found!':`Mystery place ${K.r+1} of 2`,W/2,H*.06,14);
 for(let i=0;i<3;i++){const y=H*.1+sh+30+i*34;i<K.clues?tag(`Clue ${i+1}: ${R[0][i]}`,W/2,y,13):word(`Clue ${i+1}: ?`,W/2,y,13,C.mu,700)}
 word(K.r>1?'You used the clues to find each place.':'Read the clues, then pick a place.',W/2,H*.95,13,C.tx,700)}
function moreClue(){if(view()!=='clue'||K.r>1)return;if(K.clues>=3){sfx('miss');let m='That is every clue. Now pick the place that fits them all.';return speak(m)}
 K.clues++;sfx('tick');speak(`Clue ${K.clues}: ${MY[K.r][0][K.clues-1]}`);sync()}
function guess(i){if(view()!=='clue'||K.r>1)return;const R=MY[K.r],fits=R[2].slice(0,K.clues);let m;
 const bad=fits.findIndex(f=>!f.includes(i));
 if(bad>=0){sfx('miss');m=`Check the clues. The ${pl(i)} does not fit "${R[0][bad]}"`;return speak(m)}
 if(K.clues<2){sfx('miss');m=`Maybe! But ${K.r?'the rainforest and the hot desert are both hot':'a hot desert and the seaside both have sand'}. Get the next clue to be sure.`;return speak(m)}
 sfx('pop');K.solved=K.r+1;speak(`Yes! It is the ${pl(i)}. Every clue fits.`);paintNow();const k=K.k;
 setTimeout(()=>{if(k!==K.k)return;K.r++;if(K.r<2){K.clues=1;speak(`Mystery place 2. Clue 1: ${MY[1][0][0]}`)}sync();K.want()},A.reduced()?10:500)}
function dQuiz(g,W,H,C){['🐻‍❄️','🐪','🦜','🦀'].forEach((e,i)=>emo(e,W*(.17+i*.22),H*.45,H*.12));word('Who lives where?',W/2,H*.15,17);word('Think about each place.',W/2,H*.78,15,C.tx,700)}
/* ---- controls and gestures ---- */
function keys(){if(!bar)return;bar.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='hot'&&K.hc<4){const n=HC[K.hc][0];b('Cold ❄',()=>sortTo(0),`Put ${n} on the cold side`);b('Hot ☀',()=>sortTo(1),`Put ${n} on the hot side`)}
 if(v==='rain')b('Next day',nextDay,'Show the next day of weather');
 if(v==='home'&&K.an<4)ZN.forEach(([z],i)=>b(z,()=>takeTo(i),`Take the ${AN[K.an][1]} to the ${z}`));
 if(v==='same'&&K.sd<4){b('Same in both',()=>judgeSD(true),'It is the same in both places');b('Different',()=>judgeSD(false),'It is different')}
 if(v==='clue'&&K.r<2){b('Next clue',moreClue,'Show the next clue');ZN.forEach(([z],i)=>b(z,()=>guess(i),`Guess the ${z}`))}}
function down(p){const v=view();K.gx=p.x;K.gy=p.y;
 if(v==='hot'&&K.hc<4){const B=bins();if(inside(p,card())){K.drag=1;return true}B.forEach((r,i)=>{if(inside(p,r))sortTo(i)});return false}
 if(v==='home'&&K.an<4){if(Math.abs(p.x-A.W/2)<60&&Math.abs(p.y-A.H*.17)<60){K.drag=1;return true}for(let i=0;i<4;i++)if(inside(p,zone(i)))takeTo(i);return false}
 if(v==='rain'){nextDay();return false}return false}
function move(p){if(!K.drag)return;K.dx=p.x-K.gx;if(view()==='home')K.dy=p.y-K.gy;paintNow()}
function up(p){if(!K.drag)return;K.drag=0;const v=view();
 if(v==='hot'){const x=A.W/2+K.dx;K.dx=0;if(x<A.W*.4)sortTo(0);else if(x>A.W*.6)sortTo(1);else paintNow()}
 if(v==='home'){const pt={x:A.W/2+K.dx,y:A.H*.17+K.dy};K.dx=K.dy=0;let hit=-1;for(let i=0;i<4;i++)if(inside(pt,zone(i)))hit=i;hit>=0?takeTo(hit):paintNow()}}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts,gap){steps[n].go();const k=++K.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===K.k)f()},A.reduced()?30*(j+1):(j+1)*(gap||380)))}
function reset(){const k=(K.k||0)+1;for(const x in K)delete K[x];Object.assign(K,{k,want:()=>{},bad:0,dx:0,dy:0,drag:0,hc:0,sorted:[],day:0,fill:{0:0,1:0},an:0,homed:[],sd:0,said:[],r:0,clues:1,solved:0})}
const steps=[
{h:'Hot or cold?',p:'Some places are cold, with ice and snow. Some places are hot. Sort each place.',
 predict:{q:'Which place is cold all year?',opts:['The hot desert','The Arctic','The rainforest'],ans:1},task:'Put all 4 places on the hot side or the cold side',
 show:()=>play(0,[0,1,1,0].map(s=>()=>sortTo(s))),go:()=>{reset();speak('Drag the picture to Hot or Cold, or press a button.');keys();K.want=finish(0,()=>K.hc>=4,'The Arctic and Antarctica are cold. The hot desert and the rainforest are hot.')}},
{h:'Wet or dry?',p:'A rainforest and a hot desert are both hot. But one gets lots of rain, and one gets hardly any.',
 predict:{q:'Which place gets the most rain?',opts:['The hot desert','The rainforest','They get the same'],ans:1},task:'Watch 7 days of weather',
 show:()=>play(1,Array(7).fill(nextDay),300),go:()=>{reset();speak('Press Next day to see the weather in each place.');keys();K.want=finish(1,()=>K.day>=7,'Both are hot, but the rainforest is wet and the hot desert is dry. That is a difference.')}},
{h:'Who lives here?',p:'Animals live in places that suit them. Take each animal to its home.',
 predict:{q:'Where does a polar bear live?',opts:['In the Arctic','In the hot desert','In the rainforest'],ans:0},task:'Take all 4 animals home',
 show:()=>play(2,[0,1,2,3].map(i=>()=>takeTo(i))),go:()=>{reset();speak('Drag the animal to its home, or press the name of the place.');keys();K.want=finish(2,()=>K.an>=4,'Thick fur for the cold Arctic, and a camel for the dry desert. Each animal suits its place.')}},
{h:'Same or different?',p:"Sam lives in a green town. Look at Sam's town and a town in the Arctic. What is the same? What is different?",
 predict:{q:'Do people live in the Arctic?',opts:['Yes, in towns and villages','No, nobody lives there','Only in igloos'],ans:0},task:'Say same or different for all 4 things',
 show:()=>play(3,[true,true,false,false].map(s=>()=>judgeSD(s))),go:()=>{reset();speak('Is it the same in both places, or different?');keys();K.want=finish(3,()=>K.sd>=4,'People and houses are the same. Snow and trees are different.')}},
{h:'Mystery place',p:'Use the clues to find the place. One clue may fit two places, so get more clues.',
 predict:{q:'The first clue is: there is lots of sand. Where could it be?',opts:['The hot desert or the seaside','Only the hot desert','The Arctic'],ans:0},task:'Find both mystery places',
 show:()=>play(4,[moreClue,()=>guess(3),()=>{},moreClue,()=>guess(2)],420),go:()=>{reset();speak(`Mystery place 1. Clue 1: ${MY[0][0][0]}`);keys();K.want=finish(4,()=>K.r>=2,'Sand fits two places. More clues told you which one.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['Where do polar bears live?',[['In the Arctic','ok'],['In the hot desert','desert'],['In the rainforest','forest']]],
 ['Do penguins live with polar bears in the Arctic?',[['No, wild penguins live in the south','ok'],['Yes, they live together','penguin'],['Penguins only live in zoos','zoo']]],
 ['What is a rainforest like?',[['Hot and wet','ok'],['Hot and dry','dry'],['Cold and icy','icy']]],
 ['What is a hot desert like?',[['Hot and dry','ok'],['Wet and rainy','rainy'],['Full of tall trees','trees']]],
 ['Do people live in the Arctic?',[['Yes, in towns and villages','ok'],['No, nobody lives there','nobody'],['Yes, but only in igloos','igloo']]],
 ["What do Sam's town and an Arctic town both have?",[['People and houses','ok'],['Snow all year','snow'],['Camels','camel']]],
 ['Where would you find a crab in a rock pool?',[['At the seaside','ok'],['In the hot desert','sand'],['Up a rainforest tree','tree']]]];
function slip(t){let m='Think about what that place is like: hot or cold, wet or dry.';
 if(t==='desert')m='A polar bear has thick fur. It would be far too hot in the desert. It lives in the icy Arctic.';
 if(t==='forest')m='The rainforest is hot and wet. A polar bear needs ice and snow, so it lives in the Arctic.';
 if(t==='penguin')m='Polar bears live in the far north. Wild penguins live in the south, many near Antarctica, so they never meet.';
 if(t==='zoo')m='Some penguins are in zoos, but wild penguins live in the south of the world, many near Antarctica.';
 if(t==='dry')m='A rainforest is hot, but it is not dry. It rains there nearly every day.';
 if(t==='icy')m='A rainforest is never icy. It is warm and wet all year.';
 if(t==='rainy')m='A hot desert gets very little rain. It is dry.';
 if(t==='trees')m='Tall trees need lots of rain. A hot desert is too dry for a forest.';
 if(t==='nobody')m='People do live in the Arctic, in towns and villages, with schools and shops.';
 if(t==='igloo')m='Most people in the Arctic live in houses, like Sam does. An igloo is a snow shelter some people build for a short trip.';
 if(t==='snow')m="Sam's town is green most of the year. Snow all year is a difference, not the same.";
 if(t==='camel')m='Camels live in hot deserts, not in either town. People and houses are in both.';
 if(t==='sand')m='A desert has sand but no sea and no rock pools. Crabs live at the seaside.';
 if(t==='tree')m='Most crabs live by the sea, in rock pools and on the sand.';return m}
function ask(){q++;const[qq,ops]=QS[q%QS.length],turn=(q+1)%3;box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(turn),...ops.slice(0,turn)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+qq);paintNow()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Yes! ${run} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
