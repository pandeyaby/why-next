/* Flagship – spotting constellations (ages 5–7; NGSS 1-ESS1-1 patterns of the stars; Royal Museums Greenwich star-
   hopping from the Plough). Scenes: find the 7 stars of the Plough among many, follow the pointer stars to the North
   Star, move the night on and see the sky turn round the North Star, pick the Plough when it is turned round, and check
   a robot's star facts. Data in learn/plough_art.js. */
(()=>{const {PLOUGH,LINKS,POLARIS,FAINT,BRIGHT,W5,ODD,SHAPES,ROBOT,DESC,DONE,QS}=PLO;
VIS.reg('flagplough',c=>{let A,ctl,chal,qi=-1,run=0;const K={};c.fig.classList.add('young');
const INK='#1e293b',OK='#047857',NO='#b91c1c',EDGE='#64748b',STAR='#fde68a',GOLD='#facc15',HALO='#c4b5fd',NIGHT='#0b1533',FONT='px system-ui,sans-serif';
const part=()=>['join','point','turn','shape','robot','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.2);
const inBox=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function night(){const g=A.ctx;g.fillStyle=NIGHT;g.fillRect(0,0,A.W,A.H)}
function say(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${big(n)}${FONT}`;g.fillStyle=col||'#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+24}
 const h=n+15,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,11);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?NO:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?NO:o.ok?OK:EDGE;g.stroke()}
/* a view maps sky degrees (x right, y up) to the canvas */
function view(x0,x1,y0,y1,top){const s=Math.min((A.W-36)/(x1-x0),(A.H-top-14)/(y1-y0)),cx=A.W/2-(x0+x1)/2*s,cy=top+(A.H-top)/2+(y0+y1)/2*s;return{s,at:p=>({x:cx+p.x*s,y:cy-p.y*s})}}
function dot(q,r,col,ring){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(q.x,q.y,r,0,7);g.fill();if(ring){g.strokeStyle=ring;g.lineWidth=3;g.beginPath();g.arc(q.x,q.y,r+6,0,7);g.stroke()}}
function nearest(p,list,max){let best=-1,d0=max;list.forEach((q,i)=>{const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<d0){d0=d;best=i}});return best}
function lines(pts,which,col,w){const g=A.ctx;g.strokeStyle=col;g.lineWidth=w||2.5;which.forEach(([a,b])=>{g.beginPath();g.moveTo(pts[a].x,pts[a].y);g.lineTo(pts[b].x,pts[b].y);g.stroke()})}
/* 1. find the 7 Plough stars */
const joinView=()=>view(-29,6,-7,15,A.H*.14);
function drawJoin(){const s=K.a,v=joinView(),P=PLOUGH.map(v.at);night();
 FAINT.forEach(f=>{const q=v.at({x:f[0],y:f[1]});if(q.y>A.H*.14)dot(q,2.2,'#cbd5e1')});
 const got=LINKS.filter(([a,b])=>s.got[a]&&s.got[b]);lines(P,got,HALO,3);
 P.forEach((q,i)=>dot(q,s.got[i]?6:5,s.got[i]?GOLD:STAR,s.got[i]?GOLD:null));
 if(s.bad){dot(s.bad,4,'#fca5a5','#f87171')}
 const n=s.got.filter(Boolean).length;note(n>=7?'All 7: that is the Plough':`Stars found: ${n} of 7. Look for a pan and a handle.`,A.W/2,A.H*.07,{n:12,ok:n>=7})}
function joinTap(i,p){const s=K.a;if(i<0){s.bad=p;A.sound.miss();return tell('That star is not part of the Plough. Look for 4 stars in a pan and 3 in a bent handle.')}
 if(s.got[i])return tell('You found that one already. Look along the handle or round the pan.');
 s.got[i]=true;s.bad=null;A.sound.pop();const n=s.got.filter(Boolean).length;tell(n<7?`Yes, that star is in the ${i<3?'handle':'pan'}. ${7-n} more.`:'All 7 stars found: 4 in the pan, 3 in the handle.')}
/* 2. pointers to the North Star */
const pointView=()=>view(-28,15,-3,37,A.H*.13);
function drawPoint(){const s=K.b,v=pointView(),P=PLOUGH.map(v.at),g=A.ctx;night();
 FAINT.forEach(f=>dot(v.at({x:f[0],y:f[1]}),2.2,'#cbd5e1'));dot(v.at(BRIGHT),7.5,'#ffffff');
 lines(P,LINKS,'#475569',2);
 if(s.ptr.length===2){const a=P[5],b=P[6],dy=b.y-a.y;g.setLineDash([6,6]);g.strokeStyle='#93c5fd';g.lineWidth=2;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(a.x,v.at(POLARIS).y-12);g.stroke();g.setLineDash([]);
  for(let k=1;k<=5;k++){const y=b.y+dy*k*1.06;g.fillStyle='#93c5fd';g.fillRect(a.x-6,y,12,2);if(k===5)say('5 gaps',a.x+30,y,10,'#bfdbfe',700)}}
 P.forEach((q,i)=>dot(q,4.5,s.ptr.includes(i)?GOLD:STAR,s.ptr.includes(i)?GOLD:null));
 dot(v.at(POLARIS),s.found?6:4.5,s.found?GOLD:STAR,s.found?GOLD:null);if(s.found)say('North Star',v.at(POLARIS).x,v.at(POLARIS).y-22,12,'#fde68a');
 if(s.bad)dot(s.bad,4,'#fca5a5','#f87171');
 note(s.found?'You found the North Star':s.ptr.length<2?`Tap the 2 pointer stars (${s.ptr.length} of 2)`:'Follow the line up. Tap the North Star.',A.W/2,A.H*.06,{n:12,ok:s.found})}
function pointPick(p){const v=pointView(),P=PLOUGH.map(v.at),i=nearest(p,P,24);if(i>=0)return pointTap('p'+i,p);
 if(Math.hypot(p.x-v.at(POLARIS).x,p.y-v.at(POLARIS).y)<26)return pointTap('north',p);if(Math.hypot(p.x-v.at(BRIGHT).x,p.y-v.at(BRIGHT).y)<26)return pointTap('bright',p);pointTap('faint',p)}
function pointTap(k,p){const s=K.b;if(s.found)return;
 if(s.ptr.length<2){if(k==='p5'||k==='p6'){const i=+k.slice(1);if(!s.ptr.includes(i)){s.ptr.push(i);s.bad=null;A.sound.pop()}
   return tell(s.ptr.length<2?'Yes, a pointer star. Find the other one next to it.':'Merak and Dubhe. The dashed line shows where they point. Count 5 gaps up.')}
  s.bad=p;A.sound.miss();return tell(k[0]==='p'?(+k.slice(1)<3?'That star is in the handle. The pointers are the 2 stars at the end of the pan, away from the handle.':'That star is in the pan, but on the handle side. The pointers are the 2 stars at the far end of the pan.'):'Start with the Plough. The pointers are the 2 stars at the end of the pan.')}
 if(k==='north'){s.found=true;s.bad=null;A.sound.pop();return tell('Yes, the North Star. It is only medium bright, but the pointers lead straight to it.')}
 s.bad=p;A.sound.miss();tell(k==='bright'?'That is the brightest star here, but it is not on the pointer line. The North Star is only medium bright.':'Follow the dashed line about 5 gaps up from the pointers. Is that star on the line?')}
/* 3. the night turns */
const turnView=()=>{const v=view(-44,44,-44+34.1,44+34.1,A.H*.14);return v};
function spin(p,deg){const t=deg*Math.PI/180,x=p.x-POLARIS.x,y=p.y-POLARIS.y;return{x:POLARIS.x+x*Math.cos(t)-y*Math.sin(t),y:POLARIS.y+x*Math.sin(t)+y*Math.cos(t)}}
function drawTurn(){const s=K.c,v=turnView(),g=A.ctx;night();
 for(let h=0;h<s.hours;h+=2){const P=PLOUGH.map(q=>v.at(spin(q,h*15)));g.globalAlpha=.35;lines(P,LINKS,'#94a3b8',1.5);g.globalAlpha=1}
 const P=PLOUGH.map(q=>v.at(spin(q,s.hours*15)));lines(P,LINKS,HALO,2.5);P.forEach(q=>dot(q,4,STAR));
 const N=v.at(POLARIS);dot(N,s.found?6:4.5,s.found?GOLD:STAR,s.found?GOLD:null);if(s.bad)dot(s.bad,4,'#fca5a5','#f87171');
 note(s.found?'The North Star stayed still':s.hours<6?`Time: ${s.hours} hours later. Move the night on.`:'6 hours later. Tap the star that stayed still.',A.W/2,A.H*.06,{n:12,ok:s.found});
 const b=clockR();card(b,{});say('+2 hours',b.x+b.w/2,b.y+b.h/2+1,13,INK,900)}
const clockR=()=>({x:8,y:A.H*.13,w:Math.min(118,A.W*.34),h:Math.min(52,A.H*.13)});
function moveOn(){const s=K.c;if(s.hours>=6)return tell('That is 6 hours. Now tap the star that stayed in the same place.');s.hours+=2;A.sound.tick();
 tell(s.hours<6?`${s.hours} hours later. The Plough has moved round. Keep going.`:'6 hours later. The Plough turned a quarter of the way round. Which star stayed still?')}
function turnTap(p){const s=K.c,v=turnView(),N=v.at(POLARIS);if(s.found)return;if(s.hours<6){s.bad=p;A.sound.miss();return tell('First move the night on to 6 hours, then look for the star that did not move.')}
 if(Math.hypot(p.x-N.x,p.y-N.y)<26){s.found=true;s.bad=null;A.sound.pop();return tell('Yes. The North Star stays nearly still. All the other stars turn round it.')}
 const P=PLOUGH.map(q=>v.at(spin(q,s.hours*15)));s.bad=p;A.sound.miss();tell(nearest(p,P,26)>=0?'The Plough moved: look at its faint old places. Find the star in the middle that stayed put.':'Look at the middle of the turning. Which star is in the same place as at the start?')}
/* 4. the Plough turned round */
function shapePts(kind,rot){let pts=kind==='w'?W5:kind==='odd'?ODD:PLOUGH.map(p=>[p.x+12.5,p.y-2.2]);if(kind==='mirror')pts=pts.map(([x,y])=>[-x,y]);
 const t=rot*Math.PI/180;return pts.map(([x,y])=>({x:x*Math.cos(t)-y*Math.sin(t),y:x*Math.sin(t)+y*Math.cos(t)}))}
function shapeOrder(r){const S=SHAPES[r],all=['plough',...S.d],k=r%3;return all.slice(k).concat(all.slice(0,k))}
const panelR=()=>{const gap=8,w=Math.min(190,(A.W-24-gap*2)/3),h=Math.min(w*1.6,A.H*.6),x0=(A.W-(w*3+gap*2))/2;return[0,1,2].map(k=>({k,x:x0+k*(w+gap),y:A.H*.22,w,h}))};
function drawShape(){const s=K.d,g=A.ctx;night();if(s.r>=SHAPES.length){note('All 3 skies done',A.W/2,A.H*.14,{ok:1});note('Turned round: yes. Flipped: never.',A.W/2,A.H*.34,{n:14});return}
 const S=SHAPES[s.r],ord=shapeOrder(s.r);note(`Sky ${s.r+1} of ${SHAPES.length}: which one is the Plough?`,A.W/2,A.H*.08,{n:12});
 panelR().forEach(r=>{g.fillStyle='#16213f';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=s.bad===r.k?3.5:1.5;g.strokeStyle=s.bad===r.k?'#f87171':'#64748b';g.stroke();
  const kind=ord[r.k],rot=kind==='plough'||kind==='mirror'?S.rot:S.rot/2,pts=shapePts(kind,rot),sc=r.w/29,cx=r.x+r.w/2,cy=r.y+r.h/2,Q=pts.map(p=>({x:cx+p.x*sc,y:cy-p.y*sc}));
  g.strokeStyle=HALO;g.lineWidth=2;g.beginPath();Q.forEach((q,i)=>{if(kind==='plough'||kind==='mirror'){return}i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)});g.stroke();
  if(kind==='plough'||kind==='mirror')lines(Q,LINKS,HALO,2);Q.forEach(q=>dot(q,4.5,STAR))})}
const SHAPEWHY={mirror:'That one is flipped, like in a mirror. The sky turns the Plough round, but never flips it.',w:'That is a W of 5 stars: Cassiopeia, on the other side of the North Star.',odd:'That has 7 stars, but no pan and no handle.'};
function shapeTap(k){const s=K.d;if(s.r>=SHAPES.length)return;const kind=shapeOrder(s.r)[k];
 if(kind!=='plough'){s.bad=k;A.sound.miss();return tell(SHAPEWHY[kind])}
 s.bad=-1;A.sound.pop();s.r++;tell('Yes, the Plough, just turned round.'+(s.r<SHAPES.length?' Next sky.':''))}
/* 5. the robot's star facts */
const verdictR=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.17,64)}});
function drawRobot(){const s=K.e,g=A.ctx;night();if(s.i>=ROBOT.length){note('All 4 robot facts checked',A.W/2,A.H*.15,{ok:1});note('Slips: brightest star, stars gone by day',A.W/2,A.H*.4,{n:13});return}
 const R=ROBOT[s.i],cx=A.W*.13,cy=A.H*.36,u=Math.min(A.W*.07,32);
 g.fillStyle='#94a3b8';A.paint.rrect(cx-u,cy-u,u*2,u*1.7,10);g.fill();g.strokeStyle='#e2e8f0';g.lineWidth=2;g.stroke();g.fillStyle='#0ea5e9';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.45,cy-u*.3,u*.22,0,7);g.fill()});
 const words=R.s.split(' '),half=Math.ceil(words.length/2);note(words.slice(0,half).join(' '),A.W*.58,A.H*.2,{n:13});note(words.slice(half).join(' '),A.W*.58,A.H*.35,{n:13});
 note(`Robot ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.55,{n:12});verdictR().forEach(r=>{card(r,{no:s.bad===r.k});say(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,17,INK,900)})}
function judge(k){const s=K.e;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Look again: ${R.fix} The robot was right.`:`Think again. ${R.fix}`)}
 s.bad=-1;A.sound.pop();s.i++;tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=part();if(k==='quiz'){night();note('Challenge',A.W/2,A.H*.2,{ok:1});note('Pointers lead to the North Star. The sky turns round it.',A.W/2,A.H*.5,{n:13});return}
 ({join:drawJoin,point:drawPoint,turn:drawTurn,shape:drawShape,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='join'){const v=joinView(),P=PLOUGH.map(v.at);joinTap(nearest(p,P,24),p);return false}
 if(k==='point'){pointPick(p);return false}
 if(k==='turn'){if(inBox(p,clockR()))moveOn();else turnTap(p);return false}
 if(k==='shape'){const r=panelR().find(q=>inBox(p,q));if(r)shapeTap(r.k);return false}
 if(k==='robot'){const v=verdictR().find(q=>inBox(p,q));if(v)judge(v.k);return false}
 return false}
function reset(){run++;for(const k in K)delete K[k];Object.assign(K,{a:{got:PLOUGH.map(()=>false),bad:null},b:{ptr:[],found:false,bad:null},c:{hours:0,found:false,bad:null},d:{r:0,bad:-1},e:{i:0,bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);K.check=finish(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const steps=[
{h:'Find the Plough',p:'A constellation is a pattern of stars. The Plough looks like a pan with a bent handle. Tap its 7 stars.',task:'Find all 7 stars of the Plough',
 show:()=>play(0,PLOUGH.map((_,i)=>()=>joinTap(i)),450),go:()=>begin(0,()=>K.a.got.every(Boolean))},
{h:'Follow the pointers',p:'The 2 stars at the end of the pan are the pointers. Tap them, then follow the line to the North Star.',
 predict:{q:'Is the North Star the brightest star in the sky?',opts:['Yes, the brightest of all','No, it is only medium bright'],ans:1},task:'Tap the 2 pointers, then the North Star',
 show:()=>play(1,[()=>pointTap('p5'),()=>pointTap('p6'),()=>pointTap('north')],650),go:()=>begin(1,()=>K.b.found)},
{h:'The night turns',p:'Move the night on 2 hours at a time. Watch the Plough, then tap the star that stays still.',
 predict:{q:'As the night goes on, which star stays in the same place?',opts:['The Plough stays still','The North Star stays nearly still'],ans:1},task:'Move on 6 hours, then tap the still star',
 show:()=>play(2,[moveOn,moveOn,moveOn,()=>{const v=turnView();turnTap(v.at(POLARIS))}],600),go:()=>begin(2,()=>K.c.found)},
{h:'Turned round',p:'The Plough is not always the same way up. Tap the sky that shows the Plough.',
 predict:{q:'Late at night the Plough can look upside down. Is it still the Plough?',opts:['No, it is a new pattern','Yes, the same stars turned round'],ans:1},task:'Find the Plough in all 3 skies',
 show:()=>play(3,SHAPES.map((_,r)=>()=>shapeTap(shapeOrder(r).indexOf('plough'))),700),go:()=>begin(3,()=>K.d.r>=SHAPES.length)},
{h:'Spot the slip',p:'The robot says things about stars. Is each one right, or a slip?',task:'Check all 4 robot facts',
 show:()=>play(4,ROBOT.map(R=>()=>judge(R.ok?0:1)),700),go:()=>begin(4,()=>K.e.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.check()});
function why(t){let m='Use the pointer stars, and remember the sky turns round the North Star.';
 if(t==='w')m='5 stars make the W of Cassiopeia. The Plough has 7: 4 in the pan and 3 in the handle.';
 if(t==='count')m='3 stars make the handle. Add the 4 in the pan: the Plough has 7.';
 if(t==='pointer')m='The pointers are the 2 stars at the end of the pan, away from the handle.';
 if(t==='bright')m='The North Star is not the brightest. Many stars are brighter. You find it with the pointers.';
 if(t==='planet')m='The North Star is a star, like our Sun, but very far away.';
 if(t==='day')m='Stars do not go away. In the day the Sun is so bright that we cannot see them.';
 if(t==='moon')m='The Moon is much too small to hide the stars. Sunlight hides them in the day.';
 if(t==='still')m='The Plough turns round the North Star in the night. Only the North Star stays nearly still.';
 if(t==='flip')m='It is the same 7 stars. The sky has turned, so the Plough looks a different way up.';
 if(t==='apart')m='The stars keep the same shape. The whole pattern turns round together.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='join'&&!K.a.got.every(Boolean)){const i=K.a.got.indexOf(false);B(i<3?'⭐ Next handle star':'⭐ Next pan star',()=>joinTap(i),`Tap a Plough star in the ${i<3?'handle':'pan'}`);B('A star off the pattern',()=>joinTap(-1,null),'Tap a star that is not in the Plough')}
 if(k==='point'&&!K.b.found){if(K.b.ptr.length<2){B('Merak (pointer)',()=>pointTap('p5'));B('Dubhe (pointer)',()=>pointTap('p6'));B('Megrez (pan, handle side)',()=>pointTap('p3'))}
  else{B('⭐ Star on the line',()=>pointTap('north'),'The star about 5 gaps up the line');B('The brightest star',()=>pointTap('bright'))}}
 if(k==='turn'&&!K.c.found){if(K.c.hours<6)B('🕑 +2 hours',moveOn,'Move the night on 2 hours');else{B('The middle star',()=>{const v=turnView();turnTap(v.at(POLARIS))},'Tap the North Star in the middle');B('A Plough star',()=>{const v=turnView();turnTap(v.at(spin(PLOUGH[0],K.c.hours*15)))},'Tap a star in the Plough')}}
 if(k==='shape'&&K.d.r<SHAPES.length)['Left sky','Middle sky','Right sky'].forEach((t,j)=>B(t,()=>shapeTap(j)));
 if(k==='robot'&&K.e.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:S=>{chal.hidden=S.step!==5;ctl.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Star pattern lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});controls()}}).start()})})();
