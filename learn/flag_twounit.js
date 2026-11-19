/* Flagship – measuring with different units (ages 7–8; CCSS 2.MD.A.2, NC 2013 Year 2 measurement). Scenes: lay straws
   end to end along a scarf, then paper clips along the same scarf (shorter unit, bigger count); drag the length of a unit
   until a ribbon takes 6, 3 and 12 of them; slide a book and a pencil to 0 on a ruler and read them in centimetres and
   in inches; decide whose foot is longer from two foot counts of one rug; check a robot. Data in learn/twounit_art.js.
   Distinct from flaglenht (comparing with one non-standard unit), flagunits (choosing the unit for a quantity) and
   flagconv (converting with ×1000, ×100): this lab is about how the count depends on the size of the unit. */
(()=>{const U=TWU;
VIS.reg('flagtwounit',c=>{let A,keys,quiz,ask=-1,run=0;const M={};c.fig.classList.add('young');
const NAVY='#0f172a',GOOD='#166534',BAD='#b91c1c',EDGE='#64748b',PAPER='#fffbeb',FLOOR='#fef3c7',F='px system-ui,sans-serif';
const scene=()=>['straw','clip','drag','ruler','feet','robot','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.18);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=PAPER;g.fillRect(0,0,A.W,A.H)}
/* a caption tag: white fill, navy text, rim turns green or red */
function tag(text,x,y,o){o=o||{};const g=A.ctx;let f=big(o.n||14);g.font=`700 ${f}${F}`;
 while(f>9&&g.measureText(text).width+22>(o.max||A.W-10)){f--;g.font=`700 ${f}${F}`}
 const w=g.measureText(text).width+22,h=f+14,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?GOOD:o.no?BAD:EDGE;g.stroke();g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(text,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
/* a big tap key with one or two lines of words */
function key(r,text,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok?3.5:1.6;g.strokeStyle=o.no?BAD:o.ok?GOOD:EDGE;g.stroke();let f=big(o.n||15);g.font=`800 ${f}${F}`;
 const words=text.split(' ');let rows=[text];if(g.measureText(text).width>r.w-14&&words.length>1){const h=Math.ceil(words.length/2);rows=[words.slice(0,h).join(' '),words.slice(h).join(' ')]}
 while(f>9&&rows.some(t=>g.measureText(t).width>r.w-12)){f--;g.font=`800 ${f}${F}`}g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';
 rows.forEach((t,k)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(k-(rows.length-1)/2)*(f+4)))}
/* ---------- 1 and 2: lay units end to end along the scarf ---------- */
const cmPx=total=>(A.W-28)/(total+2);
const scarfBox=()=>{const s=cmPx(U.SCARF);return{x:14,y:A.H*.26,w:U.SCARF*s,h:Math.max(26,A.H*.1)}};
function drawScarf(){const g=A.ctx,b=scarfBox();g.fillStyle='#db2777';A.paint.rrect(b.x,b.y,b.w,b.h,6);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;
 for(let x=b.x+10;x<b.x+b.w-4;x+=14){g.beginPath();g.moveTo(x,b.y+3);g.lineTo(x,b.y+b.h-3);g.stroke()}
 for(let k=0;k<7;k++){g.fillStyle='#be185d';g.fillRect(b.x+b.w,b.y+4+k*(b.h-8)/7,10,3)}}
function drawUnitRow(u,n,y,faded){const g=A.ctx,s=cmPx(U.SCARF),b=scarfBox(),h=u.k==='straw'?Math.max(12,A.H*.04):Math.max(16,A.H*.055);
 for(let i=0;i<n;i++){const x=b.x+i*u.cm*s;g.globalAlpha=faded?.45:1;
  if(u.k==='straw'){g.fillStyle=u.col;A.paint.rrect(x+1,y,u.cm*s-2,h,h/2);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;for(let q=1;q<4;q++){g.beginPath();g.moveTo(x+q*u.cm*s/4,y+2);g.lineTo(x+q*u.cm*s/4-6,y+h-2);g.stroke()}}
  else{g.strokeStyle='#1d4ed8';g.lineWidth=2.5;const w=u.cm*s-3;A.paint.rrect(x+1.5,y,w,h,h/2);g.stroke();A.paint.rrect(x+w*.2,y+h*.25,w*.65,h*.5,h/4);g.stroke()}
  g.globalAlpha=1}
 g.strokeStyle=EDGE;g.setLineDash([4,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(b.x,b.y-6);g.lineTo(b.x,y+h+8);g.moveTo(b.x+b.w,b.y-6);g.lineTo(b.x+b.w,y+h+8);g.stroke();g.setLineDash([]);return h}
function drawLay(k){const S=M.lay[k],u=U.UNITS[k];paper();drawScarf();const b=scarfBox(),y=b.y+b.h+12;
 if(k===1){const h0=drawUnitRow(U.UNITS[0],3,y,true);tag('Straws: 3',A.W*.25,y+h0+20,{n:12})}
 const yy=k===1?y+Math.max(12,A.H*.04)+44:y,h=drawUnitRow(u,S.n,yy,false);const full=S.n*u.cm>=U.SCARF;
 tag(full?`The scarf is ${S.n} ${u.plural} long`:`${u.plural[0].toUpperCase()+u.plural.slice(1)} laid: ${S.n}`,A.W/2,yy+h+26,{ok:full});
 tag(full?'End to end: no gaps, no overlaps':`Tap to lay a ${u.name} end to end`,A.W/2,A.H*.1,{n:13});
 if(k===1&&full)tag('Shorter unit, so more of them',A.W/2,A.H*.86,{n:13,ok:1})}
function lay(k){const S=M.lay[k],u=U.UNITS[k];if(S.n*u.cm>=U.SCARF)return say(`The scarf is covered. It is ${S.n} ${u.plural} long.`);S.n++;A.sound.tick();
 const left=U.SCARF/u.cm-S.n;say(left?`${S.n} ${S.n>1?u.plural:u.name}, end to end. The scarf is not covered yet.`:`The scarf is ${S.n} ${u.plural} long.`+(k===1?' The same scarf was only 3 straws long: a shorter unit fits more times.':''))}
/* ---------- 3: drag the unit ---------- */
const ribbonBox=()=>{const s=cmPx(U.RIBBON);return{x:14,y:A.H*.3,w:U.RIBBON*s,h:Math.max(22,A.H*.08),s}};
const unitBar=()=>{const R=ribbonBox();return{x:R.x,y:A.H*.62,w:M.drag.u*R.s,h:Math.max(20,A.H*.07)}};
const fits=u=>U.RIBBON/u;
function drawDrag(){const S=M.drag,g=A.ctx,R=ribbonBox(),B=unitBar();paper();
 const want=U.TARGETS[Math.min(S.hit,U.TARGETS.length-1)],n=fits(S.u),whole=Number.isInteger(n);
 tag(S.hit>=U.TARGETS.length?'All 3 made':`Make the ribbon ${want} units long`,A.W/2,A.H*.1,{n:14,ok:S.hit>=U.TARGETS.length});
 g.fillStyle='#7c3aed';A.paint.rrect(R.x,R.y,R.w,R.h,5);g.fill();
 g.strokeStyle='#ffffff';g.lineWidth=2;for(let i=1;i<Math.ceil(n);i++){const x=R.x+i*S.u*R.s;if(x<R.x+R.w-1){g.beginPath();g.moveTo(x,R.y-4);g.lineTo(x,R.y+R.h+4);g.stroke()}}
 tag(whole?`${n} units long`:`${Math.floor(n)} units and a bit`,A.W/2,R.y+R.h+24,{n:13,ok:whole&&n===want&&S.hit<U.TARGETS.length});
 g.fillStyle='#0891b2';A.paint.rrect(B.x,B.y,B.w,B.h,6);g.fill();g.fillStyle='#ffffff';g.font=`800 ${big(12)}${F}`;g.textAlign='center';g.textBaseline='middle';if(B.w>40)g.fillText('unit',B.x+B.w/2,B.y+B.h/2);
 const hx=B.x+B.w,hy=B.y+B.h/2;g.fillStyle=NAVY;g.beginPath();g.arc(hx,hy,big(14),0,7);g.fill();g.fillStyle='#ffffff';g.beginPath();g.moveTo(hx-6,hy);g.lineTo(hx-1,hy-5);g.lineTo(hx-1,hy+5);g.fill();g.beginPath();g.moveTo(hx+6,hy);g.lineTo(hx+1,hy-5);g.lineTo(hx+1,hy+5);g.fill();
 tag('Drag the handle',Math.min(A.W-60,hx+20),B.y+B.h+26,{n:11})}
function setUnit(u){const S=M.drag;S.u=Math.max(1,Math.min(12,Math.round(u)));A.redraw()}
function checkUnit(){const S=M.drag;if(S.hit>=U.TARGETS.length)return;const want=U.TARGETS[S.hit],n=fits(S.u);
 if(n===want){S.hit++;A.sound.pop();return say(`Yes: ${want} units. `+(S.hit<U.TARGETS.length?`Now make it ${U.TARGETS[S.hit]} units long.`:'Long units, few of them. Short units, lots of them.'))}
 say(Number.isInteger(n)?`${n} units. ${n>want?'Too many: make the unit longer.':'Too few: make the unit shorter.'}`:`${Math.floor(n)} units and a bit left over. ${n>want?'Make the unit longer.':'Make the unit shorter.'}`)}
/* ---------- 4: the ruler, in cm then inches ---------- */
const rulerScale=()=>(A.W-28)/32;
const job=()=>{const S=M.ruler;return{thing:U.THINGS[S.i>>1],inch:S.i%2===1}};
const thingBox=()=>{const s=rulerScale(),J=job();return{x:14+M.ruler.off*s,y:A.H*.36,w:J.thing.cm*s,h:Math.max(24,A.H*.09)}};
function drawRuler(){const S=M.ruler,g=A.ctx,s=rulerScale();paper();
 if(S.i>=U.THINGS.length*2){tag('Book: 28 cm or 11 inches',A.W/2,A.H*.3,{ok:1});tag('Pencil: 18 cm or 7 inches',A.W/2,A.H*.48,{ok:1});tag('More centimetres, fewer inches',A.W/2,A.H*.7,{n:13});return}
 const J=job(),T=thingBox(),y=A.H*.58,h=Math.max(40,A.H*.13),x0=14;
 tag(`${J.thing.name[0].toUpperCase()+J.thing.name.slice(1)} in ${J.inch?'inches':'centimetres'}: put its end on 0`,A.W/2,A.H*.1,{n:13});
 g.fillStyle='#fde68a';g.fillRect(x0-6,y,A.W-16,h);g.strokeStyle='#92400e';g.lineWidth=1.5;g.strokeRect(x0-6,y,A.W-16,h);
 const step=J.inch?2.54:1,last=J.inch?12:30,label=J.inch?1:A.narrow?5:2;g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='top';g.font=`700 ${big(11)}${F}`;
 for(let v=0;v<=last;v++){const x=x0+v*step*s,tall=J.inch||v%5===0;g.fillRect(x-.75,y,1.5,tall?h*.45:h*.25);if(v%label===0)g.fillText(String(v),x,y+h*.52)}
 g.textAlign='right';g.fillText(J.inch?'inches':'cm',A.W-14,y+h*.8);
 g.fillStyle=J.thing.col;A.paint.rrect(T.x,T.y,T.w,T.h,8);g.fill();g.strokeStyle=NAVY;g.lineWidth=2;g.stroke();g.fillStyle=NAVY;g.font=`800 ${big(13)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(J.thing.name,T.x+T.w/2,T.y+T.h/2);
 g.strokeStyle=S.off===0?GOOD:BAD;g.setLineDash([5,4]);g.lineWidth=2;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x,y+h);g.moveTo(T.x+T.w,T.y);g.lineTo(T.x+T.w,y+h);g.stroke();g.setLineDash([]);
 if(S.off===0)tag(`It ends at ${J.inch?J.thing.inch+' inches':J.thing.cm+' cm'}`,A.W/2,y+h+24,{ok:1});else tag('The end is not on 0 yet',A.W/2,y+h+24,{no:S.off<0});
 const rows=S.got.map(r=>`${r.name}: ${r.v}`).join('   ');if(rows)tag(rows,A.W/2,A.H*.22,{n:11})}
function slide(off){const S=M.ruler;if(S.i>=U.THINGS.length*2)return;S.off=Math.max(-3,Math.min(6,Math.round(off*2)/2));A.redraw()}
function dropThing(){const S=M.ruler;if(S.i>=U.THINGS.length*2)return;const J=job();
 if(S.off!==0)return say(S.off>0?`The ${J.thing.name} does not start at 0. Slide it left.`:'It hangs off the end of the ruler. Slide it right to 0.');
 const v=J.inch?`${J.thing.inch} in`:`${J.thing.cm} cm`;S.got.push({name:`${J.thing.name} (${J.inch?'in':'cm'})`,v});A.sound.pop();S.i++;
 const msg=`The ${J.thing.name} ends at ${v}.`+(J.inch?` In centimetres it was ${J.thing.cm}: inches are longer, so fewer fit.`:' Now turn the ruler over to inches.');
 if(S.i<U.THINGS.length*2)S.off=3;say(msg)}
/* ---------- 5: whose foot is longer? ---------- */
const rugBox=()=>({x:14,y:A.H*.2,w:A.W-28,h:A.H*.4});
const footKeys=()=>{const w=(A.W-40)/2,h=Math.min(64,A.H*.16);return[0,1].map(i=>({i,x:14+i*(w+12),y:A.H*.72,w,h}))};
function feetRow(n,y,col){const g=A.ctx,R=rugBox(),w=R.w/n,h=Math.min(R.h*.32,w*.55);for(let i=0;i<n;i++){const x=R.x+i*w;g.fillStyle=col;g.beginPath();g.ellipse(x+w*.42,y,w*.4,h/2,0,0,7);g.fill();g.beginPath();g.arc(x+w*.88,y-h*.15,Math.min(w*.08,h*.2),0,7);g.fill()}}
function drawFeet(){const S=M.feet,g=A.ctx;paper();if(S.i>=U.FEET.length){tag('All 3 rugs done',A.W/2,A.H*.3,{ok:1});tag('Fewer feet means a longer foot',A.W/2,A.H*.5,{n:13});return}
 const Q=U.FEET[S.i],R=rugBox();g.fillStyle='#fca5a5';A.paint.rrect(R.x,R.y,R.w,R.h,10);g.fill();g.strokeStyle='#991b1b';g.lineWidth=2;g.stroke();
 feetRow(Q.an,R.y+R.h*.3,'#1e3a8a');feetRow(Q.bn,R.y+R.h*.75,'#065f46');
 tag(`${Q.a}: ${Q.an} feet`,R.x+R.w*.25,R.y+R.h*.08,{n:11});tag(`${Q.b}: ${Q.bn} feet`,R.x+R.w*.75,R.y+R.h*.53,{n:11});
 tag(`Rug ${S.i+1} of ${U.FEET.length}: whose foot is longer?`,A.W/2,A.H*.09,{n:13});footKeys().forEach(k=>key(k,k.i?Q.b:Q.a,{no:S.miss===k.i}))}
function pickFoot(k){const S=M.feet;if(S.i>=U.FEET.length)return;const Q=U.FEET[S.i],who=[Q.a,Q.b],n=[Q.an,Q.bn];
 if(k!==Q.long){S.miss=k;A.sound.miss();return say(`${who[k]} needed ${n[k]} feet, more than ${n[1-k]}. More feet fit, so ${who[k]}'s foot is the shorter one.`)}
 S.miss=-1;S.i++;A.sound.pop();say(`Yes: ${who[k]} needed only ${n[k]} feet for the same rug, so ${who[k]}'s foot is longer.`+(S.i<U.FEET.length?' Next rug.':''))}
/* ---------- 6: robot ---------- */
const robotKeys=()=>{const w=Math.min(180,(A.W-40)/2);return[0,1].map(i=>({i,x:A.W/2+(i?8:-w-8),y:A.H*.72,w,h:Math.min(64,A.H*.17)}))};
function drawRobot(){const S=M.robot,g=A.ctx;paper();if(S.i>=U.ROBOT.length){tag('All 5 checked',A.W/2,A.H*.3,{ok:1});tag('Same thing, different unit, different number',A.W/2,A.H*.5,{n:12});return}
 const Q=U.ROBOT[S.i],x=A.W/2,y=A.H*.17,r=Math.min(A.W*.06,24);g.fillStyle='#cbd5e1';A.paint.rrect(x-r*1.2,y-r,r*2.4,r*2,8);g.fill();g.strokeStyle=NAVY;g.lineWidth=2;g.stroke();
 g.fillStyle=NAVY;g.beginPath();g.arc(x-r*.45,y-r*.15,r*.18,0,7);g.arc(x+r*.45,y-r*.15,r*.18,0,7);g.fill();g.fillRect(x-r*.4,y+r*.45,r*.8,3);
 U.card2(A.ctx,(...q)=>A.paint.rrect(...q),A.W,Q.say,A.H*.4,big(14),F,EDGE,NAVY);tag(`Saying ${S.i+1} of ${U.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.57,{n:12});robotKeys().forEach(k=>key(k,k.i?'✗ Slip':'✓ Right',{no:S.miss===k.i,n:17}))}
function judge(k){const S=M.robot;if(S.i>=U.ROBOT.length)return;const Q=U.ROBOT[S.i];
 if((k===0)!==Q.ok){S.miss=k;A.sound.miss();return say(Q.ok?`Look again: it is right. ${Q.fix}`:`Look again: that is a slip. ${Q.fix}`)}
 S.miss=-1;S.i++;A.sound.pop();say((Q.ok?'Yes, right. ':'Yes, a slip. ')+Q.fix)}
function draw(){const k=scene();if(k==='quiz'){paper();tag('Challenge',A.W/2,A.H*.25,{ok:1});tag('Same length, different units',A.W/2,A.H*.5,{n:13});return}
 ({straw:()=>drawLay(0),clip:()=>drawLay(1),drag:drawDrag,ruler:drawRuler,feet:drawFeet,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* pointer: taps lay units and pick keys; drags move the unit handle and the thing on the ruler */
function down(p){const k=scene();
 if(k==='straw'||k==='clip'){if(p.y>A.H*.18&&p.y<A.H*.8)lay(k==='straw'?0:1);return false}
 if(k==='drag'){const B=unitBar();if(Math.abs(p.y-(B.y+B.h/2))<B.h+14&&p.x>B.x){M.drag.grab=true;setUnit((p.x-B.x)/ribbonBox().s);return true}return false}
 if(k==='ruler'){const T=thingBox();if(inside(p,{x:T.x-10,y:T.y-12,w:T.w+20,h:T.h+24})){M.ruler.grab=p.x-T.x;return true}return false}
 if(k==='feet'){const b=footKeys().find(q=>inside(p,q));if(b)pickFoot(b.i);return false}
 if(k==='robot'){const b=robotKeys().find(q=>inside(p,q));if(b)judge(b.i);return false}return false}
function move(p){const k=scene();if(k==='drag'&&M.drag.grab)setUnit((p.x-unitBar().x)/ribbonBox().s);
 if(k==='ruler'&&M.ruler.grab!=null){const off=(p.x-M.ruler.grab-14)/rulerScale();slide(Math.abs(off)<.6?0:off)}}
function up(){if(M.drag&&M.drag.grab){M.drag.grab=false;checkUnit()}if(M.ruler&&M.ruler.grab!=null){M.ruler.grab=null;dropThing()}}
function reset(){run++;for(const k in M)delete M[k];Object.assign(M,{lay:[{n:0},{n:0}],drag:{u:5,hit:0,grab:false},ruler:{i:0,off:3,got:[],grab:null},feet:{i:0,miss:-1},robot:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();M.hook()}
/* button twins under the canvas */
function buttons(){if(!keys)return;keys.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='straw')add('Lay a straw',()=>lay(0),'Lay one straw end to end along the scarf');
 if(k==='clip')add('Lay a paper clip',()=>lay(1),'Lay one paper clip end to end along the scarf');
 if(k==='drag'&&M.drag.hit<U.TARGETS.length){add('Shorter unit',()=>{setUnit(M.drag.u-1);checkUnit()},'Make the unit 1 centimetre shorter');add('Longer unit',()=>{setUnit(M.drag.u+1);checkUnit()},'Make the unit 1 centimetre longer')}
 if(k==='ruler'&&M.ruler.i<U.THINGS.length*2){add('Slide left',()=>{slide(M.ruler.off-1);dropThing()},'Slide the thing 1 centimetre left');add('Slide right',()=>{slide(M.ruler.off+1);dropThing()},'Slide the thing 1 centimetre right')}
 if(k==='feet'&&M.feet.i<U.FEET.length){const Q=U.FEET[M.feet.i];add(Q.a,()=>pickFoot(0),`${Q.a} has the longer foot`);add(Q.b,()=>pickFoot(1),`${Q.b} has the longer foot`)}
 if(k==='robot'&&M.robot.i<U.ROBOT.length){add('✓ Right',()=>judge(0),'The robot is right');add('✗ Slip',()=>judge(1),'The robot made a slip')}}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(U.DESC[i]);M.hook=ready(i,ok,U.DONE[i])}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const twelve=f=>Array.from({length:12},()=>f);
const steps=[
{h:'Straws end to end',p:'To measure, lay the same unit again and again, end to end, with no gaps and no overlaps. Measure the scarf with straws.',task:'Cover the scarf with straws',
 show:()=>play(0,[()=>lay(0),()=>lay(0),()=>lay(0)],600),go:()=>begin(0,()=>M.lay[0].n*U.UNITS[0].cm>=U.SCARF)},
{h:'Now paper clips',p:'Same scarf, new unit. A paper clip is much shorter than a straw.',
 predict:{q:'Will you need more paper clips than straws, or fewer?',opts:['Fewer clips','More clips','The same: 3'],ans:1},task:'Cover the scarf with paper clips',
 show:()=>play(1,twelve(()=>lay(1)),330),go:()=>begin(1,()=>M.lay[1].n*U.UNITS[1].cm>=U.SCARF)},
{h:'Stretch the unit',p:'Drag the handle to change how long one unit is. Watch the count on the ribbon.',task:'Make the ribbon 6, then 3, then 12 units long',
 show:()=>play(2,[()=>{setUnit(4);checkUnit()},()=>{setUnit(8);checkUnit()},()=>{setUnit(2);checkUnit()}],800),go:()=>begin(2,()=>M.drag.hit>=U.TARGETS.length)},
{h:'Centimetres and inches',p:'A ruler can show centimetres (cm) on one side and inches on the other. Slide each thing so its end sits on 0.',
 predict:{q:'Will the book be more centimetres long, or more inches long?',opts:['More inches','More centimetres','The same number'],ans:1},task:'Measure the book and the pencil both ways',
 show:()=>play(3,[0,1,2,3].map(()=>()=>{slide(0);dropThing()}),700),go:()=>begin(3,()=>M.ruler.i>=U.THINGS.length*2)},
{h:'Foot steps',p:'Two people walk heel to toe across the same rug and count their feet. Tap the one with the longer foot.',
 predict:{q:'Kai counts 8 of his feet. Mum counts 5 of hers. Whose foot is longer?',opts:['Kai: 8 is more','Mum','They are the same'],ans:1},task:'Answer all 3 rugs',
 show:()=>play(4,U.FEET.map(Q=>()=>pickFoot(Q.long)),700),go:()=>begin(4,()=>M.feet.i>=U.FEET.length)},
{h:'Check the robot',p:'The robot says things about measuring. Is it right, or a slip?',task:'Check all 5 sayings',
 show:()=>play(5,U.ROBOT.map(Q=>()=>judge(Q.ok?0:1)),650),go:()=>begin(5,()=>M.robot.i>=U.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.hook()});
function why(t){let m='Think about how big one unit is, and lay units end to end.';
 if(t==='big')m='A longer unit fits fewer times, so the number gets smaller, not bigger.';
 if(t==='same')m='The thing stays the same length, but a different unit gives a different number.';
 if(t==='gap')m='Gaps leave parts of the book not counted, so the count comes out too small.';
 if(t==='gapbig')m='Gaps mean fewer clips fit along the book, so the count is too small, not too big.';
 if(t==='zero')m='Count the centimetres from where it starts. From 1 to 9 is 8 cm. Or slide it to start at 0.';
 if(t==='unit')m='A number alone does not say how long. 12 cm and 12 m are very different.';
 return m}
function pose(){ask++;const Q=U.QS[ask%U.QS.length],all=[[Q.a,'ok'],...Q.o],r=ask%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:x=>{quiz.hidden=x.step!==6;keys.hidden=x.step===6;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Measuring with different units lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
