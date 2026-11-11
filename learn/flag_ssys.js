/* Flagship: our solar system (ages 5–7; KS1/EYFS "the natural world", NGSS 1-ESS1 sky patterns, KS2 Y5 Earth and space
   foundations). Fly a rocket up past birds, clouds and planes until the air runs out and space begins; sort things in
   the air around Earth from things out in space; zoom out from home to see Earth is a planet; build the solar system
   (the Sun and everything that goes round it) and keep far-away stars outside it; then find Earth among moving planets
   and name the group. Not flagpname (planet order), flagstar (Sun is a star) or flagspin. */
(()=>{const lo=Math.min;
const SKY=[['🐦','A bird',.1],['☁️','Clouds',.22],['✈️','A plane',.34],['🎈','A weather balloon',.5]];
const SORT=[['🐦','A bird',0],['🌕','The Moon',1],['☁️','A cloud',0],['🪐','Saturn',1],['✈️','A plane',0],['⭐','A star',1]];
const ZOOM=['Your home','Your town','Earth: a planet','Earth and the Moon','The Sun and its planets'];
const PL=[['Mercury','#a8a29e'],['Venus','#f59e0b'],['Earth','#2563eb'],['Mars','#dc2626'],['Jupiter','#d97706'],['Saturn','#ca8a04'],['Uranus','#22d3ee'],['Neptune','#4f46e5']];
const BUILD=[['🌍','Earth',1],['🔴','Mars',1],['✨','A night-sky star',0],['🟠','Jupiter',1],['🌕','The Moon',1],['🌟','A far-away star',0]];
const NAMES=[['solar system','ok'],['the sky','sky'],['a star','star']];
VIS.reg('flagssys',c=>{let A,pad,quiz,qn=-1,T=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#475569',SEL='#6d28d9',SUN='#f59e0b';
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2);
const mode=()=>['up','sort','zoom','build','find','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const space=()=>{const g=A.ctx;g.fillStyle='#0b1026';g.fillRect(0,0,A.W,A.H);g.fillStyle='#e2e8f0';for(let i=0;i<40;i++){g.fillRect((i*97)%A.W,(i*53)%A.H,1.6,1.6)}};
function back(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=font(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=font(n);w=g.measureText(t).width+22}
 const h=n+14,x0=Math.max(5,lo(A.W-w-5,x-w/2));g.fillStyle='#fff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:RIM;g.stroke();mid(g);g.fillStyle=INK;g.fillText(t,x0+w/2,y+1)}
function card(r,pic,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.bad||o.on?4:2;g.strokeStyle=o.bad?NO:o.on?SEL:RIM;g.stroke();mid(g);
 g.font=`${Math.round(lo(r.h*.42,r.w*.3))}px system-ui,sans-serif`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*.38);let n=sz(16);g.font=font(n);while(g.measureText(word).width>r.w-8&&n>10){n--;g.font=font(n)}g.fillStyle=INK;g.fillText(word,r.x+r.w/2,r.y+r.h*.8)}
const ball=(x,y,r,col)=>{const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()};
const dragged=r=>S.drag?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r;
/* 1. fly up */
const alt=a=>A.H*.92-a*A.H*.84;
function drawUp(){const s=S.u,g=A.ctx;for(let i=0;i<24;i++){const a=i/24;g.fillStyle=A.mix('#7dd3fc','#0b1026',lo(1,a*1.25));g.fillRect(0,alt(a+1/24),A.W,A.H*.84/24+1)}
 g.fillStyle='#0b1026';g.fillRect(0,0,A.W,alt(1)+1);g.fillStyle='#16a34a';g.fillRect(0,alt(0),A.W,A.H-alt(0));
 if(s.a>.75){g.fillStyle='#fff';for(let i=0;i<18;i++)g.fillRect((i*71)%A.W,alt(.86)+((i*37)%(A.H*.12)),2,2)}
 g.strokeStyle='#fde68a';g.setLineDash([6,5]);g.lineWidth=2;g.beginPath();g.moveTo(0,alt(.8));g.lineTo(A.W,alt(.8));g.stroke();g.setLineDash([]);
 g.font=font(sz(12));g.textAlign='left';g.textBaseline='bottom';g.fillStyle='#fde68a';g.fillText('Space starts here: no more air',8,alt(.8)-4);
 mid(g);SKY.forEach(([e,t,a],i)=>{g.font=`${sz(26)}px system-ui,sans-serif`;g.fillText(e,A.W*(i%2?.8:.2),alt(a));pill(t,A.W*(i%2?.8:.2),alt(a)+sz(24),{n:11});g.font=`${sz(26)}px system-ui,sans-serif`;g.fillStyle='#000'});
 g.font=`${sz(40)}px system-ui,sans-serif`;g.fillText('🚀',A.W/2,alt(s.a));pill(s.a>=.85?'In space!':'Air all around',A.W/2,A.H*.05,{ok:s.a>=.85})}
function fly(a){const s=S.u;if(s.a>=.85)return;const was=s.a;s.a=Math.max(was,lo(.9,a));const pass=SKY.filter(v=>v[2]>was&&v[2]<=s.a);
 if(s.a>=.85){A.sound.pop();return say('You are in space! The air is gone, the sky looks black, and the stars shine. Space is past our sky.')}
 if(pass.length)A.sound.tick();say(pass.length?`Past ${pass[pass.length-1][1].toLowerCase()}. Still in the air around Earth, still in our sky.`:'Higher. Keep going up.')}
/* 2. sort */
const bins=()=>{const w=(A.W-24)/2,h=A.H*.38;return[0,1].map(i=>({i,x:8+i*(w+8),y:A.H*.56,w,h}))};
const big=()=>{const w=lo(220,A.W*.6),h=lo(130,A.H*.3);return{x:A.W/2-w/2,y:A.H*.1,w,h}};
function drawSort(){const s=S.s,g=A.ctx;back();bins().forEach(b=>{g.fillStyle=b.i?'#0b1026':'#bae6fd';g.fillRect(b.x,b.y,b.w,b.h);if(b.i){g.fillStyle='#e2e8f0';for(let i=0;i<14;i++)g.fillRect(b.x+(i*37)%b.w,b.y+(i*23)%b.h,2,2)}
 g.strokeStyle=RIM;g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,b.h);pill(['In the air','Out in space'][b.i],b.x+b.w/2,b.y+18,{n:13});
 const got=s.at.filter(k=>SORT[k][2]===b.i);g.font=`${sz(24)}px system-ui,sans-serif`;mid(g);got.forEach((k,j)=>g.fillText(SORT[k][0],b.x+b.w/2+(j-(got.length-1)/2)*sz(32),b.y+b.h*.6))});
 if(s.k<SORT.length){pill(`${s.k+1} of ${SORT.length}`,A.W/2,A.H*.04,{n:12});card(dragged(big()),SORT[s.k][0],SORT[s.k][1],{bad:s.bad,on:!!S.drag})}else pill('All sorted',A.W/2,A.H*.25,{ok:1})}
function sortTo(b){const s=S.s;if(s.k>=SORT.length)return;const [,t,want]=SORT[s.k];
 if(b!==want){s.bad=1;A.sound.miss();return say(t==='The Moon'?'We see the Moon in our sky, but it is far out in space, past all the air.':want?`${t} is not in the air near us. It is far out in space.`:`${t} is in the air around Earth. Space starts much higher, where the air runs out.`)}
 s.at.push(s.k);s.k++;s.bad=0;A.sound.pop();say(`Yes: ${t.toLowerCase()} is ${want?'out in space':'in the air around Earth'}.`)}
/* 3. zoom out */
function drawZoom(){const s=S.z,g=A.ctx,cx=A.W/2,cy=A.H*.5,R=lo(A.W,A.H);if(s.z>=2)space();else back();
 if(s.z===0){g.font=`${sz(90)}px system-ui,sans-serif`;mid(g);g.fillText('🏠',cx,cy)}
 if(s.z===1){g.font=`${sz(30)}px system-ui,sans-serif`;mid(g);for(let i=0;i<15;i++)g.fillText(['🏠','🏫','🏬','🌳','🏠'][i%5],A.W*(.15+.175*(i%5)),A.H*(.3+.18*Math.floor(i/5)))}
 if(s.z===2){ball(cx,cy,R*.3,'#2563eb');g.fillStyle='#16a34a';g.beginPath();g.ellipse(cx-R*.08,cy-R*.05,R*.1,R*.14,.4,0,7);g.fill();g.beginPath();g.ellipse(cx+R*.12,cy+R*.1,R*.07,R*.08,0,0,7);g.fill()}
 if(s.z===3){g.strokeStyle='#94a3b8';g.lineWidth=1.5;g.beginPath();g.arc(cx,cy,R*.32,0,7);g.stroke();ball(cx,cy,R*.1,'#2563eb');ball(cx+R*.32,cy,R*.035,'#e2e8f0')}
 if(s.z===4){ball(cx,cy,R*.06,SUN);PL.forEach(([n,col],i)=>{const r=R*(.1+.045*i);g.strokeStyle='#475569';g.lineWidth=1;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();const a=1+i*.8;ball(cx+r*Math.cos(a),cy+r*Math.sin(a),i===2?sz(7):sz(5),col)});
  const a=1+2*.8,r=R*.19;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),sz(11),0,7);g.stroke()}
 pill(ZOOM[s.z],cx,A.H*.07,{ok:s.z===4,n:15});if(s.z>=2)pill(s.z===4?'Earth is one of 8 planets':'Earth is a planet: a huge ball in space',cx,A.H*.93,{n:13})}
function zoom(){const s=S.z;if(s.z>=4)return;s.z++;A.sound.whoosh();say(['Zoom out: now you see your whole town.','Zoom out: now you see Earth. Earth is a planet, a huge round ball in space.','Zoom out: the Moon goes round Earth.','Zoom out: Earth and 7 other planets all go round the Sun. Earth is just one planet.'][s.z-1])}
/* 4. build the solar system */
const ss=()=>{const r=lo(A.W*.3,A.H*.36);return{x:A.W*(A.narrow?.36:.32),y:A.H*.58,r}};
const outBox=()=>({x:A.W*(A.narrow?.73:.7),y:A.H*.3,w:A.W*(A.narrow?.25:.27),h:A.H*.6});
const piece=()=>{const w=lo(170,A.W*.44),h=lo(84,A.H*.17);return{x:A.W/2-w/2,y:A.H*.02,w,h}};
function drawBuild(){const s=S.b,g=A.ctx,O=ss(),B=outBox();back();ball(O.x,O.y,O.r,'#0b1026');ball(O.x,O.y,sz(14),SUN);
 g.strokeStyle='#475569';[.45,.7,.92].forEach(k=>{g.beginPath();g.arc(O.x,O.y,O.r*k,0,7);g.stroke()});
 pill('Our solar system',O.x,O.y+O.r+(A.narrow?-12:12),{n:12});g.fillStyle='#0b1026';A.paint.rrect(B.x,B.y,B.w,B.h,10);g.fill();pill('Far away',B.x+B.w/2,B.y+16,{n:11});
 s.at.forEach((k,j)=>{const [e,,inn]=BUILD[k];g.font=`${sz(22)}px system-ui,sans-serif`;mid(g);if(inn){const a=j*1.7,r=O.r*[.45,.7,.92,.7][j%4];g.fillText(e,O.x+r*Math.cos(a),O.y+r*Math.sin(a))}else g.fillText(e,B.x+B.w/2,B.y+B.h*(.35+.3*(j%2)))});
 if(s.k<BUILD.length)card(dragged(piece()),BUILD[s.k][0],BUILD[s.k][1],{bad:s.bad,on:!!S.drag});else pill('Solar system built',A.W/2,A.H*.08,{ok:1})}
function put(inn){const s=S.b;if(s.k>=BUILD.length)return;const [,t,want]=BUILD[s.k];
 if(+inn!==want){s.bad=1;A.sound.miss();return say(want?(t==='The Moon'?'The Moon goes round Earth, and Earth goes round the Sun, so the Moon is in our solar system too.':`${t} goes round the Sun, so it belongs in our solar system.`):'That star does not go round our Sun. It is far, far away, outside our solar system.')}
 s.at.push(s.k);s.k++;s.bad=0;A.sound.pop();say(want?`Yes: ${t} is part of our solar system.`:'Yes: that star is far outside our solar system.')}
/* 5. find Earth and name the group */
const orb=i=>{const R=lo(A.W,A.H*1.1)*.46,r=R*(.18+.1*i),a=T*(.9/Math.sqrt(i+1))+i*1.3;return{x:A.W/2+r*Math.cos(a),y:A.H*.45+r*Math.sin(a)*.62,r}};
const nameBtns=()=>{const w=(A.W-32)/3,h=lo(54,A.H*.11);return NAMES.map((v,i)=>({i,x:8+i*(w+8),y:A.H*.86,w,h}))};
function drawFind(){const s=S.f,g=A.ctx;space();ball(A.W/2,A.H*.45,sz(16),SUN);PL.forEach(([n,col],i)=>{const o=orb(i);g.strokeStyle='#334155';g.beginPath();g.ellipse(A.W/2,A.H*.45,o.r,o.r*.62,0,0,7);g.stroke()});
 PL.forEach(([n,col],i)=>{const p=orb(i);ball(p.x,p.y,sz(i===4?10:7),col);if(i===2)ball(p.x+2,p.y-1,sz(3),'#16a34a');if(i===2&&s.earth){g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,sz(13),0,7);g.stroke()}});
 pill(s.earth?(s.name?'Our solar system':'What is this whole group called?'):'Tap Earth, the blue planet',A.W/2,A.H*.06,{ok:s.name,bad:s.bad});if(s.earth&&!s.name)nameBtns().forEach(r=>card(r,NAMES[r.i][1]==='ok'?'☀️':NAMES[r.i][1]==='sky'?'☁️':'⭐',NAMES[r.i][0],{}))}
function tapPlanet(i){const s=S.f;if(s.earth)return;if(i!==2){s.bad=1;A.sound.miss();return say(`That is ${PL[i][0]}. Earth is the blue one, third from the Sun.`)}
 s.earth=1;s.bad=0;A.sound.pop();say('Yes: that is Earth, our planet. It goes round the Sun with the others. What is the whole group called?')}
function name(j){const s=S.f;if(!s.earth||s.name)return;const t=NAMES[j][1];if(t!=='ok'){s.bad=1;A.sound.miss();return say(why(t))}
 s.name=1;s.bad=0;A.sound.pop();say('Yes: the Sun and everything that goes round it is the solar system. Solar means of the Sun.')}
function draw(){const k=mode();if(k==='chal'){space();pill('Challenge',A.W/2,A.H*.3,{n:18});pill('Earth is a planet. The Sun is in the middle.',A.W/2,A.H*.55,{n:13});return}
 ({up:drawUp,sort:drawSort,zoom:drawZoom,build:drawBuild,find:drawFind})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='up'){if(Math.abs(p.x-A.W/2)<A.W*.2&&Math.abs(p.y-alt(S.u.a))<A.H*.12){S.drag={};return true}return false}
 if(k==='sort'&&S.s.k<SORT.length&&inside(p,big())){S.drag={x:p.x,y:p.y};return true}
 if(k==='sort'){const b=bins().find(b=>inside(p,b));if(b)sortTo(b.i);return false}
 if(k==='zoom'){zoom();return false}
 if(k==='build'&&S.b.k<BUILD.length&&inside(p,piece())){S.drag={x:p.x,y:p.y};return true}
 if(k==='find'){if(S.f.earth){const r=nameBtns().find(r=>inside(p,r));if(r)name(r.i);return false}let best=-1,d=1e9;PL.forEach((v,i)=>{const o=orb(i),e=Math.hypot(p.x-o.x,p.y-o.y);if(e<d){d=e;best=i}});if(d<sz(26))tapPlanet(best)}return false}
function move(p){if(!S.drag)return;if(mode()==='up'){fly((A.H*.92-p.y)/(A.H*.84));return}S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){if(!S.drag)return;S.drag=null;const k=mode();if(k==='sort'){const b=bins().find(b=>inside(p,b));if(b)sortTo(b.i);else A.redraw()}
 if(k==='build'){const O=ss();if(Math.hypot(p.x-O.x,p.y-O.y)<O.r)put(1);else if(inside(p,outBox()))put(0);else A.redraw()}}
function fresh(){for(const k in S)delete S[k];Object.assign(S,{u:{a:0},s:{k:0,at:[],bad:0},z:{z:0},b:{k:0,at:[],bad:0},f:{earth:0,name:0,bad:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);S.hook=watch(i,ok,msg)}
function play(i,acts){steps[i].go();const s0=S.u;acts.forEach(([ms,f])=>setTimeout(()=>{if(S.u===s0)f()},ms))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
 if(k==='up'&&S.u.a<.85)B('🚀 Fly higher',()=>fly(S.u.a+.2));
 if(k==='sort'&&S.s.k<SORT.length)['In the air','Out in space'].forEach((t,j)=>B(`${SORT[S.s.k][1]}: ${t}`,()=>sortTo(j)));
 if(k==='zoom'&&S.z.z<4)B('🔭 Zoom out',zoom);
 if(k==='build'&&S.b.k<BUILD.length){B(`${BUILD[S.b.k][1]}: in our solar system`,()=>put(1));B(`${BUILD[S.b.k][1]}: far away`,()=>put(0))}
 if(k==='find'&&!S.f.earth)PL.forEach((v,i)=>B(v[0],()=>tapPlanet(i)));
 if(k==='find'&&S.f.earth&&!S.f.name)NAMES.forEach((v,j)=>B(v[0],()=>name(j)))}
const steps=[
{h:'Up into space',p:'Drag the rocket up, or tap Fly higher. Watch what you pass. Where does space start?',
 predict:{q:'Are the clouds in space?',opts:['Yes, they are very high','No, they are in our sky'],ans:1},task:'Fly the rocket into space',
 show:()=>play(0,[1,2,3,4,5].map(j=>[350*j,()=>fly(S.u.a+.2)])),
 go:()=>open(0,'A rocket on the ground. Above: a bird, clouds, a plane, a balloon, then the line where space starts.',()=>S.u.a>=.85,'Space is past our sky, where the air runs out.')},
{h:'Air or space?',p:'Some things are in the air around Earth. Some are far out in space. Drag each card to its box.',
 predict:{q:'Where is the Moon?',opts:['In the air, with the clouds','Out in space'],ans:1},task:'Sort all 6 cards',
 show:()=>play(1,SORT.map((v,j)=>[450*(j+1),()=>sortTo(v[2])])),
 go:()=>open(1,'Card 1 of 6: a bird. Two boxes: In the air, and Out in space.',()=>S.s.k>=SORT.length,'Birds, clouds and planes are in our air. The Moon, planets and stars are out in space.')},
{h:'Zoom out',p:'Start at home. Tap the picture, or tap Zoom out, to see more and more.',
 predict:{q:'Is Earth a planet?',opts:['No, it is where we live','Yes, like Mars'],ans:1},task:'Zoom out 4 times',
 show:()=>play(2,[1,2,3,4].map(j=>[450*j,zoom])),
 go:()=>open(2,'A house. Zoom out to see more.',()=>S.z.z>=4,'Earth is a planet. It goes round the Sun with 7 other planets.')},
{h:'Build the solar system',p:'The solar system is the Sun and everything that goes round it. Drag each card into it, or to Far away.',
 predict:{q:'Are the stars you see at night part of our solar system?',opts:['Yes','No, they are far beyond it'],ans:1},task:'Place all 6 cards',
 show:()=>play(3,BUILD.map((v,j)=>[450*(j+1),()=>put(v[2])])),
 go:()=>open(3,'The Sun in a big circle called Our solar system, and a Far away box. First card: Earth.',()=>S.b.k>=BUILD.length,'Planets and moons belong to our solar system. Other stars are far outside it.')},
{h:'Find our planet',p:'The planets go round the Sun (not to scale). Tap Earth as it moves. Then name the whole group.',task:'Find Earth and name the group',
 show:()=>play(4,[[300,()=>tapPlanet(2)],[1100,()=>name(0)]]),
 go:()=>open(4,'Eight planets moving round the Sun. Find Earth, the blue planet, third from the Sun.',()=>S.f.name,'Earth is one planet in the solar system: the Sun and all that goes round it.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
 {q:'Is Earth a planet?',a:'Yes, one of 8 planets',o:[['No, it is where we live','notplanet'],['No, it is a star','star']]},
 {q:'What is the solar system?',a:'The Sun and all that goes round it',o:[['All the stars in the sky','allstars'],['Just our Earth','justearth']]},
 {q:'Where does space start?',a:'Past the air, above our sky',o:[['In the clouds','clouds'],['Past all the stars','farstars']]},
 {q:'Is the Moon in space?',a:'Yes, far past our air',o:[['No, it is with the clouds','moonsky'],['No, it is on Earth','onearth']]},
 {q:'Are night-sky stars in our solar system?',a:'No, they are far beyond it',o:[['Yes, all of them','allstars'],['Yes, they go round Earth','roundearth']]},
 {q:'What is in the middle of our solar system?',a:'The Sun',o:[['Earth','earthmid'],['The Moon','moonmid']]}];
function why(t){let m='Think: the solar system is the Sun and everything that goes round it.';
 if(t==='notplanet')m='We live on Earth, and it is a planet too: a huge ball going round the Sun, like Mars.';
 if(t==='star')m='A star makes its own light, like the Sun. Earth does not. Earth is a planet.';
 if(t==='sky')m='The sky is the air above us. The Sun and its planets are far out in space.';
 if(t==='allstars')m='Most stars are far outside our solar system. Ours has only one star: the Sun.';
 if(t==='justearth')m='Earth is only one part. The Sun, 8 planets and their moons all belong.';
 if(t==='clouds')m='Clouds float in the air, in our sky. Space starts much higher, where the air runs out.';
 if(t==='farstars')m='Space starts much nearer than that: just past the air around Earth.';
 if(t==='moonsky')m='We see the Moon in our sky, but it is far out in space, past the air and the clouds.';
 if(t==='onearth')m='The Moon is not on Earth. It goes round Earth, far out in space.';
 if(t==='roundearth')m='Stars do not go round Earth. They are far away, outside our solar system.';
 if(t==='earthmid')m='Earth goes round the Sun, so Earth is not in the middle. The Sun is.';
 if(t==='moonmid')m='The Moon goes round Earth. The Sun is in the middle of the solar system.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Solar system lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
  A.every(dt=>{if(mode()!=='find'||A.reduced())return false;T+=dt*.5;return true});fresh();A.gest({down,move,up});buttons()}}).start()})})();
