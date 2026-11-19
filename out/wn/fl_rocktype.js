/* Flagship – types of rock (ages 7–9; NC 2013 Year 3 rocks; BGS "How rocks form"). Scenes: drop sand, mud and shells
   into a sea, drag a weight down to press them into sedimentary rock and find the oldest layer; decide where melted rock
   cooled to make granite, basalt and pumice; drag a heat marker to heat and squeeze rocks into marble, slate and
   quartzite without melting them; sort rock cards into igneous, sedimentary and metamorphic; check a robot.
   Data in learn/rocktype_art.js. Distinct from flagrock (Earth is made of rock) and the fossil labs. */
(()=>{const R=RKT;
VIS.reg('flagrocktype',c=>{let A,dock,chal,qk=-1,epoch=0;const Z={};c.fig.classList.add('young');
const DARK='#111827',YES='#15803d',WRONG='#b91c1c',LINE='#94a3b8',SKY='#e0f2fe',SEA='#bae6fd',DEEP='#7dd3fc',FONT='px system-ui,sans-serif';
const part=()=>['layers','lava','meta','sort','robot','quiz'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.2);
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function backdrop(){const g=A.ctx;g.fillStyle=SKY;g.fillRect(0,0,A.W,A.H);g.fillStyle='#d6d3d1';g.fillRect(0,A.H*.9,A.W,A.H*.1)}
/* a label pill: white with dark words, green or red rim for right or wrong */
function pill(words,x,y,o){o=o||{};const g=A.ctx;let f=fz(o.n||14);g.font=`800 ${f}${FONT}`;while(f>9&&g.measureText(words).width+24>(o.max||A.W-8)){f--;g.font=`800 ${f}${FONT}`}
 const w=g.measureText(words).width+24,h=f+16,x0=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?WRONG:LINE;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(words,x0+w/2,y+1)}
/* a tappable box with up to two lines of words */
function box(b,words,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=o.no||o.ok?3.5:1.5;g.strokeStyle=o.no?WRONG:o.ok?YES:LINE;g.stroke();
 if(!words)return;let f=fz(o.n||13);g.font=`800 ${f}${FONT}`;const parts=words.split(' ');let rows=[words];
 if(g.measureText(words).width>b.w-12&&parts.length>1){const mid=Math.ceil(parts.length/2);rows=[parts.slice(0,mid).join(' '),parts.slice(mid).join(' ')]}
 while(f>9&&rows.some(t=>g.measureText(t).width>b.w-10)){f--;g.font=`800 ${f}${FONT}`}g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';
 const cy=o.top?b.y+f+6:b.y+b.h/2;rows.forEach((t,k)=>g.fillText(t,b.x+b.w/2,cy+(k-(rows.length-1)/2)*(f+3)))}
const seeded=R.seeded,rock=(kind,x,y,w,h)=>R.paintRock(A.ctx,(...q)=>A.paint.rrect(...q),kind,x,y,w,h);
/* 1. layers settle in the sea, get pressed into rock, and the bottom one is oldest */
const tank=()=>({x:8,y:A.H*.17,w:A.W*.6,h:A.H*.7});
const buckets=()=>{const T=tank(),x=T.x+T.w+10,w=A.W-x-8,h=Math.min(T.h/3-8,72);return R.SED.map((s,i)=>({i,x,y:T.y+i*(h+10),w,h}))};
const layerH=()=>tank().h*(Z.layers.pressed?.09:.13);
const layerBox=k=>{const T=tank(),h=layerH();return{x:T.x+3,y:T.y+T.h-3-(k+1)*h,w:T.w-6,h}};
const weight=()=>{const T=tank(),w=T.w*.5,h=Math.max(30,T.h*.1),top=T.y+6+Z.layers.drop;return{x:T.x+(T.w-w)/2,y:top,w,h}};
const weightStop=()=>{const T=tank();return T.h-6-4*T.h*.13-Math.max(30,T.h*.1)};
function drawLayers(){const s=Z.layers,g=A.ctx,T=tank();backdrop();
 g.fillStyle=SEA;g.fillRect(T.x,T.y,T.w,T.h);g.strokeStyle='#0369a1';g.lineWidth=2;g.strokeRect(T.x,T.y,T.w,T.h);
 s.stack.forEach((k,j)=>{const S=R.SED[k],b=layerBox(j),rnd=seeded(j+3);g.fillStyle=s.pressed?A.mix(S.col,'#57534e',.25):S.col;g.fillRect(b.x,b.y,b.w,b.h);g.fillStyle=S.dot;
  for(let q=0;q<b.w/5;q++)g.fillRect(b.x+rnd()*b.w,b.y+rnd()*b.h,2,2);
  if(S.k==='shells'){g.strokeStyle=DARK;g.lineWidth=1.5;for(let q=0;q<4;q++){const sx=b.x+b.w*(.12+q*.24),sy=b.y+b.h*.6;g.beginPath();g.arc(sx,sy,Math.min(9,b.h*.38),Math.PI,0);g.closePath();g.stroke()}}
  g.strokeStyle=s.miss===j?WRONG:s.oldOk&&j===0?YES:'#57534e';g.lineWidth=s.miss===j||(s.oldOk&&j===0)?3:1;g.strokeRect(b.x,b.y,b.w,b.h)});
 if(s.stack.length>=4&&!s.pressed||s.drop>0&&!s.pressed){const W=weight();g.fillStyle='#334155';A.paint.rrect(W.x,W.y,W.w,W.h,6);g.fill();g.fillStyle='#ffffff';g.font=`800 ${fz(12)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText('Weight',W.x+W.w/2,W.y+W.h/2)}
 buckets().forEach(b=>{box(b,'',{});const S=R.SED[b.i];g.fillStyle=S.col;g.fillRect(b.x+8,b.y+8,b.w-16,b.h*.42);g.strokeStyle='#57534e';g.lineWidth=1;g.strokeRect(b.x+8,b.y+8,b.w-16,b.h*.42);
  g.fillStyle=DARK;g.font=`800 ${fz(12)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(S.name,b.x+b.w/2,b.y+b.h*.76)});
 const msg=s.stack.length<4?`Tap a bucket: layer ${s.stack.length+1} of 4`:!s.pressed?'Drag the weight down to press the layers':!s.oldOk?'Which layer is the oldest? Tap it.':'Sedimentary rock, oldest at the bottom';
 pill(msg,A.W/2,A.H*.08,{n:13,ok:s.oldOk});if(s.pressed)pill('Pressed for a very long time: now it is rock',T.x+T.w/2,T.y+18,{n:10,max:T.w})}
function dropLayer(k){const s=Z.layers;if(s.stack.length>=4)return speak(s.pressed?'The layers are rock now. Tap the oldest layer.':'Four layers are in. Now drag the weight down to press them.');
 s.stack.push(k);A.sound.tick();const n=s.stack.length;speak(`${R.SED[k].name} settles on the sea floor${n>1?', on top of the layer before':''}. ${n<4?`Layer ${n} of 4.`:'Four layers. Now drag the weight down.'}`)}
function pressTo(d){const s=Z.layers;if(s.stack.length<4||s.pressed)return;s.drop=Math.max(0,Math.min(weightStop(),d));A.redraw();
 if(s.drop>=weightStop()-2){s.pressed=true;s.drop=0;A.sound.pop();const sh=s.stack.includes(2);speak(`Pressed! Over a very long time, the weight of the layers above squeezes and sticks the grains together into sedimentary rock.${sh?' The shells are now fossils.':''} Now tap the oldest layer.`)}}
function oldTap(j){const s=Z.layers;if(!s.pressed||s.oldOk||j>=s.stack.length)return;
 if(j!==0){s.miss=j;A.sound.miss();return speak(j===s.stack.length-1?'That layer settled last, so it is the youngest. The first layer went down at the bottom.':'Layers settle one on top of another. Which one went down first?')}
 s.miss=-1;s.oldOk=true;A.sound.pop();speak(`Yes: the bottom layer (${R.SED[s.stack[0]].name.toLowerCase()}) settled first, so it is the oldest.`)}
/* 2. where did the melted rock cool? */
const sample=()=>({x:A.W*.2,y:A.H*.17,w:A.W*.6,h:A.H*.3});
const places=()=>{const w=(A.W-26)/2,h=A.H*.34;return[0,1].map(i=>({i,x:8+i*(w+10),y:A.H*.53,w,h}))};
const scenery=(i,b)=>R.paintPlace(A.ctx,i,b);
function drawLava(){const s=Z.lava;backdrop();if(s.i>=R.IGN.length){pill('All 3 igneous rocks placed',A.W/2,A.H*.16,{ok:1});pill('Slow cool: big crystals. Fast cool: tiny ones.',A.W/2,A.H*.4,{n:13});return}
 const Q=R.IGN[s.i],S=sample();pill(`Rock ${s.i+1} of ${R.IGN.length}: ${R.LOOK[Q.rock].name}. Where did it cool?`,A.W/2,A.H*.08,{n:13});rock(Q.rock,S.x,S.y,S.w,S.h*.78);pill(Q.clue,A.W/2,S.y+S.h*.9,{n:12});
 places().forEach(b=>{box(b,b.i?'Deep underground: cools slowly':'On the surface: cools fast',{no:s.miss===b.i,top:1,n:12});scenery(b.i,b)})}
function lavaTap(k){const s=Z.lava;if(s.i>=R.IGN.length)return;const Q=R.IGN[s.i];
 if(k!==Q.where){s.miss=k;A.sound.miss();return speak(Q.no)}
 s.miss=-1;s.i++;A.sound.pop();speak(Q.yes+(s.i<R.IGN.length?' Next rock.':''))}
/* 3. heat and squeeze, but do not melt */
const bar=()=>({x:20,y:A.H*.62,w:A.W-40,h:22});
const heatX=v=>bar().x+bar().w*v/100;
const squeezeKey=()=>({x:A.W/2-Math.min(120,A.W*.32),y:A.H*.77,w:Math.min(240,A.W*.64),h:Math.min(56,A.H*.13)});
function drawMeta(){const s=Z.meta,g=A.ctx,B=bar();backdrop();if(s.i>=R.META.length){pill('All 3 rocks changed',A.W/2,A.H*.16,{ok:1});pill('Heated and squeezed, never melted',A.W/2,A.H*.4,{n:13});return}
 const M=R.META[s.i],show=s.made?M.to:M.from,w=Math.min(A.W*.4,200),h=A.H*.22;pill(`Rock ${s.i+1} of ${R.META.length}: change ${R.LOOK[M.from].name.toLowerCase()}`,A.W/2,A.H*.08,{n:13});
 rock(show,(A.W-w)/2,A.H*.17,w,h);pill(s.melt?'Melted into magma!':R.LOOK[show].name,A.W/2,A.H*.17+h+16,{n:12,ok:s.made,no:s.melt});
 const zc=['#fde68a','#fb923c','#dc2626'],edges=[0,R.ZONE[0],R.ZONE[1],100];for(let k=0;k<3;k++){g.fillStyle=zc[k];g.fillRect(heatX(edges[k]),B.y,heatX(edges[k+1])-heatX(edges[k]),B.h)}
 g.strokeStyle=DARK;g.lineWidth=1.5;g.strokeRect(B.x,B.y,B.w,B.h);
 ['Warm','Hot','Melts'].forEach((t,k)=>pill(t,(heatX(edges[k])+heatX(edges[k+1]))/2,B.y+B.h+16,{n:10}));
 const mx=heatX(s.heat);g.fillStyle='#1d4ed8';g.beginPath();g.moveTo(mx,B.y-2);g.lineTo(mx-12,B.y-22);g.lineTo(mx+12,B.y-22);g.closePath();g.fill();g.fillRect(mx-2,B.y-2,4,B.h+4);
 box(squeezeKey(),'Heat and squeeze',{n:15})}
function setHeat(v){const s=Z.meta;if(s.i>=R.META.length)return;s.heat=Math.max(0,Math.min(100,Math.round(v/5)*5));s.melt=false;A.redraw()}
function zoneName(v){return v<R.ZONE[0]?'warm':v<R.ZONE[1]?'hot':'melting'}
function squeeze(){const s=Z.meta;if(s.i>=R.META.length||s.made)return;const M=R.META[s.i],z=zoneName(s.heat),a=R.LOOK[M.from].name,b=R.LOOK[M.to].name;
 if(z==='warm'){A.sound.miss();return speak(`Only warm: the ${a.toLowerCase()} did not change. Deep underground it is much hotter. Drag the marker to Hot.`)}
 if(z==='melting'){s.melt=true;A.sound.miss();return speak(`Too hot: it melted into magma. Melted rock cools into igneous rock, not metamorphic rock. Drag the marker back to Hot.`)}
 s.made=true;A.sound.pop();speak(`${a} was heated and squeezed without melting. It changed into ${b.toLowerCase()}, a metamorphic rock.`+(s.i+1<R.META.length?' Next rock.':''));
 const e0=epoch;setTimeout(()=>{if(e0!==epoch)return;s.i++;s.made=false;s.heat=10;A.redraw();buttonsFor();Z.hook()},700)}
/* 4. sort the rocks */
const card=()=>({x:A.W*.18,y:A.H*.15,w:A.W*.64,h:A.H*.42});
const bins=()=>{const w=(A.W-16-16)/3,h=Math.min(A.H*.2,74);return R.BINS.map((t,i)=>({i,t,x:8+i*(w+8),y:A.H*.68,w,h}))};
function drawSort(){const s=Z.sort;backdrop();if(s.i>=R.SORT.length){pill('All 6 rocks sorted',A.W/2,A.H*.16,{ok:1});pill('Igneous, sedimentary, metamorphic',A.W/2,A.H*.4,{n:13});return}
 const Q=R.SORT[s.i],C=card();pill(`Card ${s.i+1} of ${R.SORT.length}: which type of rock?`,A.W/2,A.H*.07,{n:13});box(C,'',{});rock(Q.rock,C.x+10,C.y+10,C.w-20,C.h*.56);
 pill(R.LOOK[Q.rock].name,C.x+C.w/2,C.y+C.h*.7,{n:13,max:C.w});pill(Q.clue,C.x+C.w/2,C.y+C.h*.88,{n:11});bins().forEach(b=>box(b,b.t,{no:s.miss===b.i,n:13}))}
function sortTap(k){const s=Z.sort;if(s.i>=R.SORT.length)return;const Q=R.SORT[s.i],nm=R.LOOK[Q.rock].name;
 if(k!==Q.bin){s.miss=k;A.sound.miss();return speak(`Not ${R.BINS[k].toLowerCase()}. ${nm}: ${Q.clue.toLowerCase()}. ${R.SORTWHY[Q.bin]}`)}
 s.miss=-1;s.i++;A.sound.pop();speak(`Yes: ${nm.toLowerCase()} is ${R.BINS[Q.bin].toLowerCase()}.`+(s.i<R.SORT.length?' Next card.':''))}
/* 5. robot */
const twoKeys=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,t:k?'✗ Slip':'✓ Right',x:A.W/2+(k?6:-w-6),y:A.H*.72,w,h:Math.min(A.H*.18,62)}))};
function drawRobot(){const s=Z.robot,g=A.ctx;backdrop();if(s.i>=R.ROBOT.length){pill('All 5 sayings checked',A.W/2,A.H*.16,{ok:1});pill('Three types, three ways to form',A.W/2,A.H*.4,{n:13});return}
 const Q=R.ROBOT[s.i],cx=A.W/2,cy=A.H*.2,u=Math.min(A.W*.06,26);g.fillStyle='#cbd5e1';g.beginPath();g.ellipse(cx,cy,u*1.1,u,0,0,7);g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
 g.fillStyle=DARK;g.fillRect(cx-u*.55,cy-u*.3,u*.3,u*.3);g.fillRect(cx+u*.25,cy-u*.3,u*.3,u*.3);g.fillRect(cx-u*.35,cy+u*.4,u*.7,3);
 pill(Q.say,A.W/2,A.H*.44,{n:12});pill(`Saying ${s.i+1} of ${R.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.58,{n:12});twoKeys().forEach(b=>box(b,b.t,{no:s.miss===b.i,n:16}))}
function robotPick(k){const s=Z.robot;if(s.i>=R.ROBOT.length)return;const Q=R.ROBOT[s.i];
 if((k===0)!==Q.ok){s.miss=k;A.sound.miss();return speak(Q.ok?`Check again. ${Q.fix}`:`Hmm, think about how that rock forms. ${Q.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();speak((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=part();if(k==='quiz'){backdrop();pill('Challenge',A.W/2,A.H*.2,{ok:1});pill('Rock detective',A.W/2,A.H*.5,{n:13});return}
 ({layers:drawLayers,lava:drawLava,meta:drawMeta,sort:drawSort,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* pointer handling: taps for every scene, drags for the weight and the heat marker */
function down(p){const k=part();
 if(k==='layers'){const s=Z.layers,b=buckets().find(q=>on(p,q));if(b){dropLayer(b.i);return false}
  if(s.stack.length>=4&&!s.pressed&&on(p,weight())){s.grab=p.y-s.drop;return true}
  if(s.pressed){for(let j=0;j<s.stack.length;j++)if(on(p,layerBox(j))){oldTap(j);break}}return false}
 if(k==='lava'){const b=places().find(q=>on(p,q));if(b)lavaTap(b.i);return false}
 if(k==='meta'){if(on(p,squeezeKey())){squeeze();return false}const B=bar();if(p.y>B.y-30&&p.y<B.y+B.h+8){Z.meta.drag=true;setHeat((p.x-B.x)/B.w*100);return true}return false}
 if(k==='sort'){const b=bins().find(q=>on(p,q));if(b)sortTap(b.i);return false}
 if(k==='robot'){const b=twoKeys().find(q=>on(p,q));if(b)robotPick(b.i);return false}
 return false}
function move(p){const k=part();if(k==='layers'&&Z.layers.grab!=null)pressTo(p.y-Z.layers.grab);if(k==='meta'&&Z.meta.drag){const B=bar();setHeat((p.x-B.x)/B.w*100)}}
function up(){if(Z.layers&&Z.layers.grab!=null){Z.layers.grab=null;if(!Z.layers.pressed){Z.layers.drop=0;A.redraw();speak('Drag the weight all the way down onto the layers.')}}
 if(Z.meta&&Z.meta.drag){Z.meta.drag=false;speak(`Heat: ${zoneName(Z.meta.heat)}. Tap Heat and squeeze.`)}}
function clear(){epoch++;for(const k in Z)delete Z[k];Object.assign(Z,{layers:{stack:[],pressed:false,drop:0,grab:null,oldOk:false,miss:-1},lava:{i:0,miss:-1},meta:{i:0,heat:10,made:false,melt:false,drag:false},sort:{i:0,miss:-1},robot:{i:0,miss:-1},hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttonsFor();Z.hook()}
/* the button twins under the canvas */
function buttonsFor(){if(!dock)return;dock.innerHTML='';const k=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='layers'){const s=Z.layers;if(s.stack.length<4)R.SED.forEach((S,i)=>add(`Drop ${S.name.toLowerCase()}`,()=>dropLayer(i)));
  else if(!s.pressed)add('Press the weight down',()=>pressTo(weightStop()),'Press the weight down onto the layers');
  else if(!s.oldOk)s.stack.forEach((q,j)=>add(j===0?'Bottom layer':j===s.stack.length-1?'Top layer':`Layer ${j+1} from the bottom`,()=>oldTap(j),`Oldest is: layer ${j+1} from the bottom, ${R.SED[q].name.toLowerCase()}`))}
 if(k==='lava'&&Z.lava.i<R.IGN.length){add('On the surface',()=>lavaTap(0),'It cooled fast on the surface');add('Deep underground',()=>lavaTap(1),'It cooled slowly deep underground')}
 if(k==='meta'&&Z.meta.i<R.META.length){add('Cooler',()=>{setHeat(Z.meta.heat-10);speak(`Heat: ${zoneName(Z.meta.heat)}.`)},'Turn the heat down');add('Hotter',()=>{setHeat(Z.meta.heat+10);speak(`Heat: ${zoneName(Z.meta.heat)}.`)},'Turn the heat up');add('Heat and squeeze',squeeze)}
 if(k==='sort'&&Z.sort.i<R.SORT.length)R.BINS.forEach((t,i)=>add(t,()=>sortTap(i),`${R.LOOK[R.SORT[Z.sort.i].rock].name} is ${t.toLowerCase()}`));
 if(k==='robot'&&Z.robot.i<R.ROBOT.length){add('✓ Right',()=>robotPick(0),'The robot is right');add('✗ Slip',()=>robotPick(1),'The robot made a slip')}}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enterStep(i,ok){clear();speak(R.DESC[i]);Z.hook=ready(i,ok,R.DONE[i])}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const steps=[
{h:'Layers in the sea',p:'Sand, mud and shells sink and settle in layers. Drop four layers, press them, then find the oldest layer.',
 predict:{q:'Layers pile up one on top of another. Which layer is the oldest?',opts:['The top layer','The bottom layer'],ans:1},task:'Make sedimentary rock and find the oldest layer',
 show:()=>demo(0,[()=>dropLayer(0),()=>dropLayer(1),()=>dropLayer(2),()=>dropLayer(0),()=>pressTo(weightStop()),()=>oldTap(0)],500),go:()=>enterStep(0,()=>Z.layers.oldOk)},
{h:'Melted rock cools',p:'Igneous rock forms when melted rock cools and goes hard. Tap where each rock cooled.',
 predict:{q:'Could you find a fossil in rock made from lava?',opts:['Yes, often','No, the heat destroys it'],ans:1},task:'Place all 3 rocks',
 show:()=>demo(1,R.IGN.map(Q=>()=>lavaTap(Q.where)),650),go:()=>enterStep(1,()=>Z.lava.i>=R.IGN.length)},
{h:'Heat and squeeze',p:'Metamorphic rock is rock changed by heat and squeezing deep underground. Drag the heat marker, then tap Heat and squeeze.',
 predict:{q:'To make metamorphic rock, do you melt the rock?',opts:['Yes, melt it','No, heat and squeeze it'],ans:1},task:'Change all 3 rocks',
 show:()=>demo(2,R.META.flatMap(()=>[()=>setHeat(55),()=>squeeze(),()=>{}]),420),go:()=>enterStep(2,()=>Z.meta.i>=R.META.length)},
{h:'Sort the rocks',p:'Read the clue on each rock card. Tap the type of rock it is.',task:'Sort all 6 rocks',
 show:()=>demo(3,R.SORT.map(Q=>()=>sortTap(Q.bin)),550),go:()=>enterStep(3,()=>Z.sort.i>=R.SORT.length)},
{h:'Check the robot',p:'The robot says things about rocks. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>demo(4,R.ROBOT.map(Q=>()=>robotPick(Q.ok?0:1)),600),go:()=>enterStep(4,()=>Z.robot.i>=R.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>Z.hook()});
function why(t){let m='Think about how the rock formed: cooled melted rock, layers, or a changed rock.';
 if(t==='fossil')m='Fossils form when living things are buried in layers of mud or sand. That makes sedimentary rock.';
 if(t==='ign')m='Rock from cooled magma or lava is igneous. Sedimentary rock comes from layers.';
 if(t==='old')m='New layers settle on top, so the bottom layer is usually the oldest.';
 if(t==='melt')m='Metamorphic rock is heated and squeezed but not melted. Melted rock that cools is igneous.';
 if(t==='met')m='Marble was limestone that got changed by heat and squeezing. Changed rock is metamorphic.';
 if(t==='sed')m='Grains or shells pressed together in layers make sedimentary rock.';
 return m}
function pose(){qk++;const Q=R.QS[qk%R.QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{chal.hidden=x.step!==5;dock.hidden=x.step===5;buttonsFor()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Types of rock lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttonsFor()}}).start()})})();
