/* Flagship: Observing with simple equipment (ages 5–7; NC KS1 working scientifically: observing closely, using simple
   equipment). A hand lens reveals veins, edge hairs and an aphid that were there all along. Focus until sharp, use
   looking words, compare two leaves, match questions to lens/ruler/timer, never look at the Sun.
   Not flaglook (drawing what I observe), flagsense (five senses) or flagobsvs (observation vs interpretation). */
(()=>{
VIS.reg('flaghlens',c=>{let A,pad,chal,round=-1,gen=0;const S={};c.fig.classList.add('young');
const kind=()=>['hunt','focus','words','pair','tool','safe','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-10)}
function pill(r,fill,lw){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=lw||1.5;g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ZOOM=4,radius=()=>Math.min(A.W,A.H)*(A.narrow?.2:.17);
/* a leaf drawn at real size: the veins, edge hairs and the aphid are really there, just too small to see */
function leaf(cx,cy,s,o){const g=A.ctx,C=A.col;o=o||{};
 g.fillStyle=o.tint||'#4d9a3a';g.beginPath();g.moveTo(cx-s,cy);g.quadraticCurveTo(cx,cy-s*.62,cx+s,cy);g.quadraticCurveTo(cx,cy+s*.62,cx-s,cy);g.fill();
 g.strokeStyle='#2f6b22';g.lineWidth=Math.max(.6,s*.025);g.beginPath();g.moveTo(cx-s*1.25,cy);g.lineTo(cx+s*.95,cy);g.stroke();
 g.strokeStyle='#86c46a';g.lineWidth=.6;for(let k=-3;k<=3;k++){if(!k)continue;const x=cx+k*s*.24;g.beginPath();g.moveTo(x,cy);g.lineTo(x+s*.16,cy-s*.26);g.moveTo(x,cy);g.lineTo(x+s*.16,cy+s*.26);g.stroke()}
 if(o.hairs!==false){g.strokeStyle='#a9d98b';g.lineWidth=.45;for(let t=.08;t<.95;t+=.045){const x=cx-s+2*s*t,yy=s*.62*2*t*(1-t);[-1,1].forEach(d=>{g.beginPath();g.moveTo(x,cy+d*yy);g.lineTo(x+1,cy+d*(yy+2.2));g.stroke()})}}
 if(o.bug){const bx=cx-s*.95,by=cy-s*.06;g.fillStyle='#e0b43c';g.beginPath();g.ellipse(bx,by,2.4,1.6,0,0,7);g.fill();g.strokeStyle='#5b4310';g.lineWidth=.35;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(bx+k*1,by);g.lineTo(bx+k*1.3,by+2.4);g.stroke()}}
 if(o.mark)word(o.mark,cx,cy+s*.62+A.H*.06,A.narrow?14:16,{b:800,ink:C.tx})}
/* draw the scene, then the same scene ZOOM times bigger inside the lens (blurred while out of focus) */
function looking(scene){const g=A.ctx,C=A.col,R=radius(),blur=Math.abs(S.dist-3);scene();
 g.save();g.beginPath();g.arc(S.lx,S.ly,R,0,7);g.clip();g.fillStyle=A.mix(C.pn,'#f1f5f9',C.dark?.1:.5);g.fillRect(S.lx-R,S.ly-R,2*R,2*R);
 const z=ZOOM-blur*.35,ghosts=blur?[[0,0],[blur*3,0],[-blur*3,blur*2],[0,-blur*3]]:[[0,0]];
 ghosts.forEach(([dx,dy],k)=>{g.save();g.globalAlpha=k?.45:blur?.55:1;g.translate(S.lx+dx,S.ly+dy);g.scale(z,z);g.translate(-S.lx,-S.ly);scene();g.restore()});g.restore();
 g.strokeStyle=C.tx;g.lineWidth=5;g.beginPath();g.arc(S.lx,S.ly,R,0,7);g.stroke();g.strokeStyle=A.alpha(C.cy,.8);g.lineWidth=2;g.beginPath();g.arc(S.lx,S.ly,R-4,0,7);g.stroke();
 g.strokeStyle='#8b5a2b';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(S.lx+R*.72,S.ly+R*.72);g.lineTo(S.lx+R*1.35,S.ly+R*1.35);g.stroke();g.lineCap='butt'}
const oneLeaf=()=>{leaf(A.W*.5,A.H*.45,A.W*(A.narrow?.36:.26),{bug:true})};
const pairS=()=>A.W*(A.narrow?.19:.15),pairY=()=>A.H*.42+pairS()*.3;
const twoLeaves=()=>{const s=A.W*(A.narrow?.19:.15);leaf(A.W*.27,A.H*.42,s,{mark:'Leaf 1'});leaf(A.W*.73,A.H*.42,s,{hairs:false,mark:'Leaf 2'})};
/* the hidden details in step 1, in canvas units */
const SPOTS=()=>{const s=A.W*(A.narrow?.36:.26),cx=A.W*.5,cy=A.H*.45;return[{n:'veins',x:cx+s*.35,y:cy-s*.12,say:'Thin lines called veins. They carry water.'},{n:'hairs',x:cx+s*.1,y:cy+s*.3,say:'Tiny hairs on the edge of the leaf.'},{n:'bug',x:cx-s*.95,y:cy-s*.06,say:'A tiny aphid near the stalk.'}]};
function drawHunt(){const C=A.col;looking(oneLeaf);word(S.found.length+' of 3 tiny things found',A.W/2,A.H*.9,A.narrow?15:17,{b:800});
 word(S.head||'Drag the lens over the leaf',A.W/2,A.H*.05,A.narrow?15:17,{b:800});S.found.forEach((n,i)=>word('✓ '+n,A.W*(.2+i*.3),A.H*.96,A.narrow?13:14,{ink:C.tx}))}
function drawFocus(){const C=A.col,g=A.ctx;looking(oneLeaf);word(S.dist===3?'Sharp!':'Blurry: move the lens',A.W/2,A.H*.05,A.narrow?15:17,{b:800});
 const x0=A.W*.12,x1=A.W*.88,y=A.H*.88;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let k=0;k<=6;k++){const x=x0+(x1-x0)*k/6;g.lineWidth=k===3?3:1.5;g.beginPath();g.moveTo(x,y-8);g.lineTo(x,y+8);g.stroke()}
 A.paint.ball(x0+(x1-x0)*S.dist/6,y,14,C.cy);word('close',x0,y+A.H*.05,A.narrow?13:14,{ink:C.mu});word('far',x1,y+A.H*.05,A.narrow?13:14,{ink:C.mu})}
function shell(cx,cy,r){const g=A.ctx;g.fillStyle='#b7793a';g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.strokeStyle='#7a4a1e';g.lineWidth=r*.09;for(let k=0;k<10;k++){const a=k*Math.PI/5;g.beginPath();g.moveTo(cx+Math.cos(a)*r*.2,cy+Math.sin(a)*r*.2);g.lineTo(cx+Math.cos(a+.5)*r*.97,cy+Math.sin(a+.5)*r*.97);g.stroke()}g.strokeStyle='#5b3414';g.lineWidth=r*.07;g.beginPath();
 for(let t=0;t<16;t+=.1){const rr=r*.95*Math.exp(-t*.17),x=cx+rr*Math.cos(t),y=cy+rr*Math.sin(t);t?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
 g.fillStyle='#f3d9a8';for(let k=0;k<14;k++){const a=k*.9,rr=r*(.35+.5*((k*7)%10)/10);g.beginPath();g.arc(cx+rr*Math.cos(a),cy+rr*Math.sin(a),r*.045,0,7);g.fill()}}
const WORDS=[['stripy','pattern'],['nice',null],['bumpy','texture'],['brown','colour'],['good',null],['round','shape']];
const chip=i=>{const w=A.W*(A.narrow?.29:.26),h=A.H*.11;return{x:A.W*.04+(i%3)*(w+A.W*.04),y:A.H*.55+Math.floor(i/3)*(h+A.H*.03),w,h}};
function drawWords(){const C=A.col;shell(A.W*.5,A.H*.25,Math.min(A.W,A.H)*.17);word('Tap the looking words for the shell',A.W/2,A.H*.47,A.narrow?14:16,{b:800});
 WORDS.forEach(([w,k],i)=>{const r=chip(i),on=S.got.includes(i),bad=S.bad===i;pill(r,on?A.alpha(C.gr,.35):bad?A.alpha(C.rd,.3):A.alpha(C.am,.25),on||bad?3:1.5);word(w,r.x+r.w/2,r.y+r.h*.42,A.narrow?18:20,{b:900});if(on)word(k,r.x+r.w/2,r.y+r.h*.8,A.narrow?11:12,{ink:C.tx,b:600})})}
function drawPair(){looking(twoLeaves);word(S.seen.length<2?'Look closely at both leaves':'Now choose below',A.W/2,A.H*.05,A.narrow?15:17,{b:800})}
const QS=[['See tiny legs on a bug',0],['How long is the worm in cm?',1],['How long does ice take to melt?',2]];
const TOOLS=[['🔍','hand lens'],['📏','ruler'],['⏱️','timer']];
const qcard=i=>({x:A.W*.05,y:A.H*(.08+i*.14),w:A.W*.9,h:A.H*.11}),tbox=i=>{const w=A.W*.28;return{x:A.W*.04+i*(w+A.W*.04),y:A.H*.64,w,h:A.H*.26}};
function drawTool(){const C=A.col;QS.forEach(([q],i)=>{if(S.put[i]!=null)return;let r=qcard(i);if(S.drag&&S.drag.i===i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};pill(r,S.pick===i?A.alpha(C.ac,.35):A.alpha(C.am,.28),S.pick===i?3:1.5);word(q,r.x+r.w/2,r.y+r.h/2,A.narrow?14:16,{b:800,max:r.w-12})});
 TOOLS.forEach(([e,n],i)=>{const r=tbox(i),done=S.put.indexOf(i)>=0;pill(r,done?A.alpha(C.gr,.3):A.alpha(C.tx,.05));word(e,r.x+r.w/2,r.y+r.h*.35,A.narrow?30:36);word(n,r.x+r.w/2,r.y+r.h*.75,A.narrow?13:15,{b:800})});
 if(S.msg)word(S.msg,A.W/2,A.H*.57,A.narrow?12:14,{ink:C.tx,max:A.W*.94})}
const pane=i=>({x:A.W*(.04+i*.5),y:A.H*.12,w:A.W*.42,h:A.H*.66});
function drawSafe(){const C=A.col,g=A.ctx;word('Which is the safe way?',A.W/2,A.H*.05,A.narrow?15:17,{b:800});
 [0,1].forEach(i=>{const r=pane(i);pill(r,S.tap===i?A.alpha(i===0?C.gr:C.rd,.3):A.alpha(C.tx,.04),S.tap===i?3:1.5);const cx=r.x+r.w/2;
  if(i===0){leaf(cx,r.y+r.h*.62,r.w*.3,{bug:true,hairs:false});g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.arc(cx,r.y+r.h*.4,r.w*.18,0,7);g.stroke();g.strokeStyle='#8b5a2b';g.lineWidth=9;g.beginPath();g.moveTo(cx+r.w*.13,r.y+r.h*.4+r.w*.13);g.lineTo(cx+r.w*.3,r.y+r.h*.4+r.w*.3);g.stroke();word('Look at a leaf',cx,r.y+r.h*.9,A.narrow?13:15,{b:800})}
  else{g.fillStyle='#f59e0b';g.beginPath();g.arc(cx,r.y+r.h*.24,r.w*.14,0,7);g.fill();g.strokeStyle='#f59e0b';g.lineWidth=3;for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(cx+Math.cos(a)*r.w*.18,r.y+r.h*.24+Math.sin(a)*r.w*.18);g.lineTo(cx+Math.cos(a)*r.w*.25,r.y+r.h*.24+Math.sin(a)*r.w*.25);g.stroke()}
   g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.arc(cx,r.y+r.h*.58,r.w*.16,0,7);g.stroke();g.strokeStyle='#8b5a2b';g.lineWidth=9;g.beginPath();g.moveTo(cx+r.w*.12,r.y+r.h*.58+r.w*.12);g.lineTo(cx+r.w*.28,r.y+r.h*.58+r.w*.28);g.stroke();word('Look at the Sun',cx,r.y+r.h*.9,A.narrow?13:15,{b:800})}})}
function draw(Q){const C=Q.col,k=kind();Q.ctx.fillStyle=Q.mix(C.pn,'#ecfccb',C.dark?.06:.4);Q.ctx.fillRect(0,0,Q.W,Q.H);
 if(k==='hunt')drawHunt();else if(k==='focus')drawFocus();else if(k==='words')drawWords();else if(k==='pair')drawPair();else if(k==='tool')drawTool();else if(k==='safe')drawSafe();
 else{word('🔍 Look closely',Q.W/2,Q.H*.38,Q.narrow?22:28,{b:900});word('colour · shape · size · texture · pattern',Q.W/2,Q.H*.56,Q.narrow?13:15,{ink:C.mu})}
 Q.fx.draw(Q.ctx)}
function fresh(o){gen++;for(const k in S)delete S[k];Object.assign(S,{lx:A.W*.25,ly:A.H*.3,dist:3,found:[],head:'',got:[],bad:null,seen:[],put:[null,null,null],pick:null,drag:null,msg:'',tap:null,held:false,check:()=>{}},o||{})}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const g=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},A.reduced()?20*(j+1):260*(j+1)))}
/* move the lens; in step 1 it finds a detail only when the view is sharp and the detail is near the middle */
function moveLens(x,y){const R=radius();S.lx=Math.max(R*.3,Math.min(A.W-R*.3,x));S.ly=Math.max(R*.3,Math.min(A.H*.82,y));const k=kind();
 if(k==='hunt'&&S.dist===3)SPOTS().forEach(s=>{if(!S.found.includes(s.n)&&Math.hypot(s.x-S.lx,s.y-S.ly)<R*.55){S.found.push(s.n);A.sound.pop();tell(s.say+' It was there all the time.')}});
 if(k==='pair'){[[A.W*.27,0],[A.W*.73,1]].forEach(([x,i])=>{if(Math.abs(S.lx-x)<A.W*.12&&!S.seen.includes(i)){S.seen.push(i);tell(i?'Leaf 2: a smooth edge, no hairs.':'Leaf 1: tiny hairs all along the edge.');pads()}})}
 A.redraw();S.check()}
function setDist(d){S.dist=Math.max(0,Math.min(6,d));tell(S.dist===3?'Sharp. Now you can see the details.':S.dist<3?'Too close: blurry. Move the lens a little farther.':'Too far: blurry. Move the lens a little closer.');S.dist===3?A.sound.pop():A.sound.tick();A.redraw();S.check()}
function tapWord(i){const[w,k]=WORDS[i];if(S.got.includes(i))return;if(k){S.got.push(i);S.bad=null;A.sound.pop();tell(`"${w}" tells the ${k}.`)}else{S.bad=i;A.sound.miss();tell(`"${w}" says what you think, not what you see. Pick a colour, shape, texture or pattern word.`)}A.redraw();pads();S.check()}
function judgePair(t){S.ans=t;if(t===1){A.sound.pop();tell('Yes. Only leaf 1 has tiny hairs. They looked the same until you looked closely.')}else{A.sound.miss();tell(t===0?'Look again with the lens at the edges of both leaves.':'Leaf 2 has a smooth edge. Check leaf 1 with the lens.')}A.redraw();S.check()}
function putTool(i,t){if(S.put[i]!=null)return;S.pick=null;if(QS[i][1]===t){S.put[i]=t;A.sound.pop();S.msg=`Yes: ${TOOLS[t][1]}.`}else{A.sound.miss();S.msg=t===0?'A lens shows tiny details. It cannot tell you how long.':t===1&&i===2?'This "how long" means time. Use the timer.':t===2&&i===1?'This "how long" means length. Use the ruler.':'A ruler or timer cannot show tiny legs. Use the lens.'}
 tell(S.msg);A.redraw();pads();S.check()}
function tapSafe(i){S.tap=i;if(i===0){A.sound.pop();tell('Safe. Never look at the Sun, with or without a lens. It can hurt your eyes.')}else{A.sound.miss();tell('Not safe! Looking at the Sun can hurt your eyes, and a lens makes it worse.')}A.redraw();S.check()}
function pads(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='hunt')SPOTS().forEach(s=>b(s.n==='bug'?'Near the stalk':s.n==='hairs'?'The edge':'The middle',()=>moveLens(s.x,s.y),'Move the lens to '+(s.n==='bug'?'the stalk':s.n==='hairs'?'the edge':'the middle')));
 if(k==='focus'){b('Closer',()=>setDist(S.dist-1),'Move the lens closer');b('Farther',()=>setDist(S.dist+1),'Move the lens farther')}
 if(k==='words')WORDS.forEach(([w],i)=>{if(!S.got.includes(i))b(w,()=>tapWord(i),'Choose the word '+w)});
 if(k==='pair'){b('Look at leaf 1',()=>moveLens(A.W*.27,pairY()));b('Look at leaf 2',()=>moveLens(A.W*.73,pairY()));if(S.seen.length===2)[['They are the same',0],['Leaf 1 has hairs',1],['Leaf 2 has hairs',2]].forEach(([t,v])=>b(t,()=>judgePair(v)))}
 if(k==='tool'){if(S.pick==null)QS.forEach(([q],i)=>{if(S.put[i]==null)b(q,()=>{S.pick=i;tell('Picked: '+q+'. Now choose a tool.');A.redraw();pads()},'Pick: '+q)});else TOOLS.forEach(([e,n],t)=>b(e+' '+n,()=>putTool(S.pick,t),'Use the '+n))}
 if(k==='safe'){b('Look at a leaf',()=>tapSafe(0));b('Look at the Sun',()=>tapSafe(1))}}
function down(p){const k=kind(),R=radius();if(k==='chal')return false;
 if(k==='hunt'||k==='pair'||k==='focus'){if(k==='focus'&&p.y>A.H*.8){setDist(Math.round((p.x-A.W*.12)/(A.W*.76)*6));S.slide=true;return true}S.held=true;moveLens(p.x,p.y);return true}
 if(k==='words'){const i=WORDS.findIndex((_,j)=>hit(p,chip(j)));if(i<0)return false;tapWord(i);return true}
 if(k==='tool'){const i=QS.findIndex((_,j)=>S.put[j]==null&&hit(p,qcard(j)));if(i>=0){S.drag={i,x:p.x,y:p.y};S.pick=i;A.redraw();return true}const t=TOOLS.findIndex((_,j)=>hit(p,tbox(j)));if(t>=0&&S.pick!=null)putTool(S.pick,t);return false}
 if(k==='safe'){const i=[0,1].find(j=>hit(p,pane(j)));if(i==null)return false;tapSafe(i);return true}
 return false}
function move(p){if(S.slide){setDist(Math.round((p.x-A.W*.12)/(A.W*.76)*6));return}if(S.held)moveLens(p.x,p.y);if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){S.held=false;S.slide=false;const d=S.drag;S.drag=null;if(!d){A.redraw();return}const t=p?TOOLS.findIndex((_,j)=>hit(p,tbox(j))):-1;if(t>=0)putTool(d.i,t);else{A.redraw();pads()}}
const steps=[
{h:'Look through a hand lens',p:'A hand lens makes things look bigger. Slide it over the leaf and find 3 tiny things.',
 predict:{q:'What will the lens show on this leaf?',opts:['Nothing new','Tiny things you could not see','A bigger, heavier leaf'],ans:1},
 task:'Find 3 tiny things with the lens',show:()=>auto(0,SPOTS().map(s=>()=>moveLens(s.x,s.y))),
 go:()=>{fresh({lx:A.W*.18,ly:A.H*.22});tell('A leaf. Drag the lens over it.');pads();S.check=finish(0,()=>S.found.length===3,'Veins, hairs and an aphid. They were there all along. The lens only makes them look bigger.')}},
{h:'Make it sharp',p:'If it looks blurry, move the lens a little closer or farther until it is sharp.',
 predict:{q:'The view is blurry. What should you do?',opts:['Press the lens flat on the leaf','Move it until it looks sharp','Stop, lenses are blurry'],ans:1},
 task:'Make the view sharp',show:()=>auto(1,[()=>setDist(4),()=>setDist(3)]),
 go:()=>{fresh({lx:A.W*.6,ly:A.H*.45-A.W*(A.narrow?.36:.26)*.22,dist:6});tell('Blurry. Move the lens closer or farther.');pads();S.check=finish(1,()=>S.dist===3,'Sharp! Too close or too far is blurry.')}},
{h:'Use looking words',p:'Say what you see. Use words for colour, shape, size, texture and pattern.',
 predict:{q:'Which tells a friend more about the shell?',opts:['It is nice','It is brown and stripy','It is a thing'],ans:1},
 task:'Tap the 4 looking words',show:()=>auto(2,[0,2,3,5].map(i=>()=>tapWord(i))),
 go:()=>{fresh();tell('A snail shell. Tap the words that tell what you see.');pads();S.check=finish(2,()=>S.got.length===4,'Brown, round, stripy, bumpy: now a friend can picture it.')}},
{h:'Compare closely',p:'Two things can look the same from far away. Look closely at both before you decide.',
 predict:{q:'These two leaves look the same. Are they?',opts:['Yes, same colour, same leaf','Look closely first','No need to look'],ans:1},
 task:'Look at both leaves, then say how they differ',show:()=>auto(3,[()=>moveLens(A.W*.27,pairY()),()=>moveLens(A.W*.73,pairY()),()=>judgePair(1)]),
 go:()=>{fresh({lx:A.W*.5,ly:A.H*.2});tell('Two leaves. Look at the edge of each one.');pads();S.check=finish(3,()=>S.ans===1,'Leaf 1 has tiny hairs, leaf 2 is smooth. Close looking found the difference.')}},
{h:'Pick the right tool',p:'A lens shows tiny details. A ruler measures how long. A timer measures how much time.',
 predict:{q:'To find how long a worm is, use…',opts:['a hand lens','a ruler','a timer'],ans:1},
 task:'Put each question on its tool',show:()=>auto(4,[()=>putTool(0,0),()=>putTool(1,1),()=>putTool(2,2)]),
 go:()=>{fresh();tell('Three questions. Drag each one to the tool that answers it.');pads();S.check=finish(4,()=>S.put.every((t,i)=>t===i),'Lens for tiny details, ruler for length, timer for time.')}},
{h:'Stay safe',p:'Never look at the Sun, with or without a lens. A lens in sunshine can also start a fire.',
 task:'Tap the safe way to use a lens',show:()=>auto(5,[()=>tapSafe(0)]),
 go:()=>{fresh();tell('Two pictures. Which one is safe?');pads();S.check=finish(5,()=>S.tap===0,'Use a lens on things, never on the Sun.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const BANK=[['The lens makes a bug…',[['look bigger','ok'],['grow bigger','grow'],['get heavier','grow']]],
 ['The view is blurry. You…',[['move the lens until sharp','ok'],['press it on the leaf','press'],['stop looking','press']]],
 ['The best looking word for a shell is…',[['stripy','ok'],['nice','opinion'],['good','opinion']]],
 ['To find how long a stick is, use…',[['a ruler','ok'],['a hand lens','tool'],['a timer','tool']]],
 ['Two leaves look alike. To compare them…',[['look closely at both','ok'],['say they are the same','same'],['pick the bigger one','same']]],
 ['Can you look at the Sun through a lens?',[['No, never','ok'],['Yes, for a moment','sun'],['Yes, on a cloudy day','sun']]],
 ['The lens shows tiny hairs. Were they there before?',[['Yes, too small to see','ok'],['No, the lens made them','grow'],['Only when you look','grow']]]];
function slip(t){let m='Look closely, then say what you see.';
 if(t==='grow')m='A lens only makes things look bigger. The thing itself does not change.';
 if(t==='press')m='Move the lens a little closer or farther until the view is sharp.';
 if(t==='opinion')m='That word says what you think. Use a looking word: colour, shape, size, texture or pattern.';
 if(t==='tool')m='Pick the tool for the question: lens for tiny details, ruler for length, timer for time.';
 if(t==='same')m='Things can look alike from far away. Look closely at both before you decide.';
 if(t==='sun')m='Never look at the Sun, with or without a lens. It can hurt your eyes.';
 return m}
function ask(){round++;const[q,ops]=BANK[round%BANK.length],sh=round%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?'✓ Yes! Good looking.':'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:Q=>{chal.hidden=Q.step!==6;pad.hidden=Q.step===6;pads()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Hand lens controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
