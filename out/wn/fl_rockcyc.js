/* Flagship – the rock cycle (ages 9–11; BGS and Geological Society KS3 rock cycle pages). Weather three kinds of rock and
   send the bits down a river, follow one quartz grain right round the loop, find the short cuts any rock can take, put
   each change where it happens in a slice through the ground, and sort changes into fast and slow. Data: rockcyc_art.js. */
(()=>{const {NODES,PROC,SHORT,LOOP,NEEDS,GRAIN,CUTS,PLACES,WHERE,WHERE_NO,ROCKS,RIVER,SPEED,TXT,DESC,DONE,QS}=ROCKCYC;
VIS.reg('flagrockcyc',c=>{let A,g,pad,quiz,scene,turn=-1,gen=0;const st={};
const GOOD='#047857',BAD='#b91c1c',EDGE='#64748b',FONT='px system-ui,sans-serif';
const dark=()=>A.col.dark,ink=()=>dark()?'#f8fafc':'#0f172a';
const kind=()=>['wear','grain','cuts','where','speed','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.12);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wrap(t,w,font){g.font=font;const out=[];let cur='';t.split(' ').forEach(wd=>{const tr=cur?cur+' '+wd:wd;if(g.measureText(tr).width>w&&cur){out.push(cur);cur=wd}else cur=tr});if(cur)out.push(cur);return out}
/* the sentence panel across the top; returns where the scene can start */
function banner(t,tone){const f=`700 ${px(14)}${FONT}`,L=wrap(t,A.W-36,f),lh=px(14)*1.3,h=L.length*lh+14;
 g.fillStyle=tone==='ok'?(dark()?'#064e3b':'#dcfce7'):tone==='no'?(dark()?'#7f1d1d':'#fee2e2'):(dark()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);g.fill();
 g.strokeStyle=tone==='ok'?GOOD:tone==='no'?BAD:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.fillStyle=ink();g.textAlign='left';g.textBaseline='top';g.font=f;L.forEach((s,i)=>g.fillText(s,18,15+i*lh));return 8+h+6}
function card(r,t,o){o=o||{};g.fillStyle=o.fill||(o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
 g.lineWidth=o.no||o.ok||o.sel||o.ring?3:1.5;g.strokeStyle=o.no?BAD:o.ok?GOOD:o.sel||o.ring?'#1d4ed8':EDGE;g.stroke();
 let n=px(o.n||13),L;do{L=wrap(t,r.w-10,`800 ${n}${FONT}`);n--}while((L.length>2||L.some(s=>g.measureText(s).width>r.w-8))&&n>8);
 g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';const lh=(n+1)*1.15;L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh+1))}
function grid(n,i,cols){cols=Math.min(n,cols||(A.narrow?3:n));const rows=Math.ceil(n/cols),h=Math.min(A.H*.085,42),w=Math.min(190,(A.W-16-6*(cols-1))/cols),r=Math.floor(i/cols),k=i%cols,inRow=Math.min(cols,n-r*cols);
 return{x:(A.W-(inRow*w+6*(inRow-1)))/2+k*(w+6),y:A.H-(rows-r)*(h+6),w,h}}
const gridH=(n,cols)=>{cols=Math.min(n,cols||(A.narrow?3:n));return Math.ceil(n/cols)*(Math.min(A.H*.085,42)+6)+4};
function boxFrom(top,bottom){scene={x:8,y:top,w:A.W-16,h:Math.max(60,A.H-top-bottom-6)};return scene}
/* ---------- the loop diagram ---------- */
function nodeR(k){const B=scene,N=NODES[k],w=Math.min(B.w*.31,170),h=Math.min(B.h*.17,48);return{x:B.x+B.w*N.x-w/2,y:B.y+B.h*N.y-h/2,w,h}}
const mid=r=>({x:r.x+r.w/2,y:r.y+r.h/2});
const NODECOL={ign:'#fecaca',sed:'#fde68a',sdr:'#fed7aa',met:'#ddd6fe',mag:'#fca5a5'};
function arrow(a,b,label,o){o=o||{};const A0=nodeR(a),B0=nodeR(b),p=mid(A0),q=mid(B0),dx=q.x-p.x,dy=q.y-p.y,
  ta=Math.min(A0.w/2/Math.abs(dx||1e-6),A0.h/2/Math.abs(dy||1e-6))+.03,tb=Math.min(B0.w/2/Math.abs(dx||1e-6),B0.h/2/Math.abs(dy||1e-6))+.03,
  s={x:p.x+dx*ta,y:p.y+dy*ta},e={x:q.x-dx*tb,y:q.y-dy*tb},col=o.col||(dark()?'#cbd5e1':'#334155');
 g.save();g.globalAlpha=o.faint?.35:1;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=o.faint?2:3;if(o.dash)g.setLineDash([7,5]);g.beginPath();g.moveTo(s.x,s.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);
 const an=Math.atan2(e.y-s.y,e.x-s.x),hl=11;g.beginPath();g.moveTo(e.x,e.y);g.lineTo(e.x-hl*Math.cos(an-.45),e.y-hl*Math.sin(an-.45));g.lineTo(e.x-hl*Math.cos(an+.45),e.y-hl*Math.sin(an+.45));g.closePath();g.fill();g.restore();
 if(label){const f=o.lp||.5,m={x:s.x+(e.x-s.x)*f,y:s.y+(e.y-s.y)*f},cx=scene.x+scene.w/2,side=o.dash?{}:Math.abs(m.x-cx)<8?{}:m.x<cx?{align:'right',x:m.x+12}:{align:'left',x:m.x-12};
  A.paint.label(label,side.x==null?m.x:side.x,m.y,{font:`700 ${px(11)}${FONT}`,bg:o.dash?'#1e3a8a':'#1f2937',col:'#ffffff',align:side.align})}}
function diagram(o){o=o||{};(o.loop||LOOP).forEach(([a,b,p],i)=>arrow(a,b,o.labels===false||(o.shown&&!o.shown(i))?'':SHORT[p],{faint:o.shown&&!o.shown(i)}));
 (o.cuts||[]).forEach(C=>arrow(C.from,C.to,C.cl,{dash:1,lp:C.lp,col:dark()?'#93c5fd':'#1d4ed8'}));
 Object.keys(NODES).forEach(k=>card(nodeR(k),NODES[k].t,{fill:NODECOL[k],ring:o.ring===k,no:o.bad===k,n:13}))}
/* ---------- 1. wear it down ---------- */
const unit=()=>Math.min(scene.w*.055,scene.h*.08,24);
const rockAt=r=>({x:scene.x+scene.w*r.x,y:scene.y+scene.h*r.y});
const riverR=()=>({x:scene.x+scene.w*RIVER.x,y:scene.y+scene.h*RIVER.y,w:scene.w*RIVER.w,h:scene.h*RIVER.h});
function drawRock(r,P,state,big){const u=unit()*(big?1.15:1);if(state==='gone')return;g.strokeStyle='#1f2937';g.lineWidth=1.6;
 if(state==='whole'){g.fillStyle=r.c;g.beginPath();g.moveTo(P.x-u,P.y+u*.5);g.lineTo(P.x-u*.7,P.y-u*.55);g.lineTo(P.x+u*.1,P.y-u*.8);g.lineTo(P.x+u,P.y-u*.2);g.lineTo(P.x+u*.8,P.y+u*.6);g.closePath();g.fill();g.stroke()}
 else[[-.6,.2],[.1,-.3],[.55,.3],[-.1,.45],[.45,-.45]].forEach(([a,b])=>{g.fillStyle=r.c;g.beginPath();g.arc(P.x+a*u,P.y+b*u,u*.28,0,7);g.fill();g.stroke()});
 A.paint.label(r.k+(state==='bits'?' bits':''),P.x,P.y+u*1.25,{font:`700 ${px(11)}${FONT}`,bg:'#1f2937',col:'#ffffff'})}
function weather(k){const s=st.a;if(s.rk[k]!=='whole')return;s.rk[k]='bits';s.bad='';A.sound.pop();const R=ROCKS.find(r=>r.k===k);
 say(`Weathering: ice and rain crack the ${k} (${R.type} rock) into bits where it stands. Now drag the bits into the river.`)}
function drop(k){const s=st.a,R=ROCKS.find(r=>r.k===k);s.sel=null;if(s.rk[k]==='gone')return;
 if(s.rk[k]==='whole'){s.bad=k;A.sound.miss();return say(`A whole lump of ${k} is too big for the river to carry. Weather it first: tap it to crack it into bits.`)}
 s.rk[k]='gone';s.layers.push(R.c);s.bad='';A.sound.pop();const left=ROCKS.filter(r=>s.rk[r.k]!=='gone').length;
 say(`Erosion: the river carries the ${k} bits to the sea, where they settle as a layer of sediment.`+(left?` ${left} to go.`:' Three rocks, three layers.'))}
/* ---------- 2. follow a grain ---------- */
const PKEYS=Object.keys(PROC);
function choose(p){const s=st.b,G=GRAIN[s.i];if(!G||s.mv)return;
 if(p!==G.p){s.bad=p;A.sound.miss();return say(`Not ${PROC[p].toLowerCase()}. ${NEEDS[p]}`)}
 const to=LOOP.find(L=>L[0]===G.at)[1];s.bad='';s.i++;s.mv={from:G.at,to,t:0};A.sound.pop();A.tween(s.mv,{t:1},520,'io',()=>{s.mv=null;A.redraw()});
 say(G.yes+(s.i<GRAIN.length?' Next stop.':''))}
/* ---------- 3. short cuts ---------- */
function pickNode(k){const s=st.c,C=CUTS[s.i];if(!C)return;
 if(k===C.from){s.bad=k;A.sound.miss();return say(`The rock starts as ${NODES[k].t.toLowerCase()}. Something happens to it: tap where it ends up.`)}
 if(k!==C.to){s.bad=k;A.sound.miss();return say((C.no[k]||'That does not match what happened.')+' Read it again.')}
 s.bad='';s.i++;A.sound.pop();say(C.yes+(s.i<CUTS.length?' Next rock.':''))}
/* ---------- 4. where on Earth ---------- */
const placeR=z=>{const Z=PLACES[z];return{x:scene.x+scene.w*Z.x,y:scene.y+scene.h*Z.y,w:scene.w*Z.w,h:scene.h*Z.h}};
function putWhere(z){const s=st.d,W=WHERE[s.i];if(!W)return;
 if(z!==W.z){s.bad=z;A.sound.miss();return say(`Not the ${PLACES[z].t}. ${WHERE_NO[z]} Where does "${W.k.toLowerCase()}" happen?`)}
 s.bad='';s.done.push(s.i);s.i++;A.sound.pop();say(W.yes+(s.i<WHERE.length?' Next change.':''))}
/* ---------- 5. fast or slow ---------- */
const binR=i=>{const top=scene.y,w=(scene.w-8)/2;return{x:scene.x+i*(w+8),y:top,w,h:scene.h}};
const left=()=>SPEED.cards.map((x,i)=>i).filter(i=>st.e.bin[i]==null);
function sortCard(i,b){const s=st.e;s.sel=null;if(s.bin[i]!=null)return;const [t,want]=SPEED.cards[i];
 if(b!==want){s.bad=i;A.sound.miss();return say(`Not ${b?'slow':'fast'}: "${t}". ${SPEED.why[want]}`)}
 s.bin[i]=b;s.bad=null;A.sound.pop();const n=left().length;say(`Yes: "${t}" is ${b?'slow':'fast'}.`+(n?` ${n} to go.`:' All sorted.'))}
/* ---------- drawing ---------- */
function draw(){const k=kind(),d=dark();g.fillStyle=d?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){boxFrom(banner('Challenge: the loop, the short cuts and the time it takes.','ok'),8);diagram();return A.fx.draw(g)}
 if(k==='wear'){const s=st.a,fin=ROCKS.every(r=>s.rk[r.k]==='gone');boxFrom(banner(fin?'All three rocks are now layers of sediment on the sea floor.':s.msg||DESC[0],fin?'ok':s.bad?'no':''),8);
  ROCKCYC.SHAPES(A).land(scene,{layers:s.layers});const RV=riverR();if(s.sel||(s.drag&&s.rk[s.drag.k]!=='gone')){g.setLineDash([6,4]);g.strokeStyle='#1d4ed8';g.lineWidth=2.5;A.paint.rrect(RV.x,RV.y,RV.w,RV.h,8);g.stroke();g.setLineDash([])}
  A.paint.label('river',RV.x+RV.w/2,RV.y+RV.h*.85,{font:`700 ${px(11)}${FONT}`,bg:'#075985',col:'#ffffff'});A.paint.label('sea',scene.x+scene.w*.85,scene.y+scene.h*.4,{font:`700 ${px(11)}${FONT}`,bg:'#075985',col:'#ffffff'});
  ROCKS.forEach(r=>{if(s.drag&&s.drag.k===r.k)return;const P=rockAt(r);drawRock(r,P,s.rk[r.k]);if(s.sel===r.k||s.bad===r.k){const u=unit();g.strokeStyle=s.bad===r.k?BAD:'#1d4ed8';g.lineWidth=3;g.strokeRect(P.x-u*1.2,P.y-u*1.05,u*2.4,u*2.1)}});
  if(s.drag){const r=ROCKS.find(q=>q.k===s.drag.k);drawRock(r,s.drag,s.rk[r.k],1)}}
 if(k==='grain'){const s=st.b,G=GRAIN[s.i];boxFrom(banner(G?`Stop ${s.i+1} of 5. ${G.t}`:'Round the loop and back to igneous rock: granite again.',G?(s.bad?'no':''):'ok'),gridH(PKEYS.length));
  diagram({shown:i=>i<s.i||s.mv&&i===s.i-1,ring:G&&!s.mv?G.at:null});
  const at=s.mv?(()=>{const a=mid(nodeR(s.mv.from)),b=mid(nodeR(s.mv.to)),t=s.mv.t;return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}})():mid(nodeR(G?G.at:'ign'));
  const NR=nodeR('ign'),gx=at.x+NR.w/2-6,gy=at.y-NR.h/2+6;A.paint.ball(gx,gy,Math.max(7,unit()*.42),'#a3a3a3');g.strokeStyle='#0f172a';g.lineWidth=2;g.beginPath();g.arc(gx,gy,Math.max(7,unit()*.42),0,7);g.stroke();
  if(G)PKEYS.forEach((p,i)=>card(grid(PKEYS.length,i),PROC[p],{no:s.bad===p,n:12}))}
 if(k==='cuts'){const s=st.c,C=CUTS[s.i];boxFrom(banner(C?`Short cut ${s.i+1} of 3. ${C.t}`:'Three short cuts: any kind of rock can become any other kind.',C?(s.bad?'no':''):'ok'),8);
  diagram({cuts:CUTS.slice(0,s.i),ring:C?C.from:null,bad:s.bad})}
 if(k==='where'){const s=st.d,W=WHERE[s.i];boxFrom(banner(W?`Change ${s.i+1} of 5: where does this happen? "${W.k}"`:'Every change is in its place.',W?(s.bad?'no':''):'ok'),8);
  ROCKCYC.SHAPES(A).land(scene,{layers:['#e8b86d','#cbd5e1']});
  Object.keys(PLACES).forEach(z=>{const r=placeR(z);g.setLineDash([6,4]);g.strokeStyle=s.bad===z?BAD:(d?'#e2e8f0':'#1e3a8a');g.lineWidth=s.bad===z?3:2;A.paint.rrect(r.x+2,r.y+2,r.w-4,r.h-4,8);g.stroke();g.setLineDash([]);
   const here=s.done.filter(i=>WHERE[i].z===z);A.paint.label(PLACES[z].t,r.x+r.w/2,r.y+14,{font:`800 ${px(11)}${FONT}`,bg:'#1e3a8a',col:'#ffffff'});
   here.forEach((i,j)=>A.paint.label('✓ '+WHERE[i].tag,r.x+r.w/2,r.y+36+j*22,{font:`700 ${px(10)}${FONT}`,bg:'#065f46',col:'#ffffff'}))})}
 if(k==='speed'){const s=st.e,L=left();boxFrom(banner(L.length?s.msg||TXT[4]:'Sorted: fast changes you could watch, slow ones that take ages of time.',L.length?(s.bad!=null?'no':''):'ok'),L.length?gridH(L.length):8);
  [0,1].forEach(b=>{const r=binR(b);g.fillStyle=b?(d?'#312e81':'#ede9fe'):(d?'#713f12':'#fef3c7');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=(s.sel!=null||s.drag)?'#1d4ed8':EDGE;g.lineWidth=(s.sel!=null||s.drag)?3:1.5;g.stroke();
   g.fillStyle=ink();g.textAlign='center';g.textBaseline='top';wrap(SPEED.bins[b],r.w-12,`800 ${px(13)}${FONT}`).forEach((t,j)=>g.fillText(t,r.x+r.w/2,r.y+8+j*px(16)));
   SPEED.cards.forEach(([t,w],i)=>{if(s.bin[i]!==b)return;const n=SPEED.cards.filter((_,q)=>s.bin[q]===b&&q<i).length;card({x:r.x+6,y:r.y+px(44)+n*Math.min(36,r.h*.18),w:r.w-12,h:Math.min(32,r.h*.16)},t,{ok:1,n:11})})});
  L.forEach((i,j)=>{if(s.drag&&s.drag.i===i)return;card(grid(L.length,j),SPEED.cards[i][0],{sel:s.sel===i,no:s.bad===i,n:12})});
  if(s.drag){const r=grid(L.length,0);card({x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h},SPEED.cards[s.drag.i][0],{sel:1,n:12})}}
 A.fx.draw(g)}
/* ---------- pointer ---------- */
function down(p){const k=kind();
 if(k==='wear'){const s=st.a,u=unit(),r=ROCKS.find(q=>s.rk[q.k]!=='gone'&&Math.hypot(p.x-rockAt(q).x,p.y-rockAt(q).y)<u*1.4);
  if(r){s.drag={k:r.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(s.sel&&hit(p,riverR()))drop(s.sel);return false}
 if(k==='grain'){if(GRAIN[st.b.i]){const i=PKEYS.findIndex((_,i)=>hit(p,grid(PKEYS.length,i)));if(i>=0)choose(PKEYS[i])}return false}
 if(k==='cuts'){const n=Object.keys(NODES).find(q=>hit(p,nodeR(q)));if(n)pickNode(n);return false}
 if(k==='where'){const z=['mountain','volcano','sea','deep'].find(q=>hit(p,placeR(q)));if(z)putWhere(z);return false}
 if(k==='speed'){const s=st.e,L=left(),j=L.findIndex((_,j)=>hit(p,grid(L.length,j)));if(j>=0){s.drag={i:L[j],x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  if(s.sel!=null){const b=[0,1].find(b=>hit(p,binR(b)));if(b!=null)sortCard(s.sel,b)}return false}
 return false}
function move(p){const s=kind()==='wear'?st.a:kind()==='speed'?st.e:null;if(s&&s.drag){s.drag.x=p.x;s.drag.y=p.y;A.redraw()}}
function up(){const k=kind(),s=k==='wear'?st.a:k==='speed'?st.e:null;if(!s||!s.drag)return;const D=s.drag;s.drag=null;const moved=Math.hypot(D.x-D.x0,D.y-D.y0)>12;
 if(k==='wear'){if(moved&&hit(D,riverR()))drop(D.k);else if(!moved){if(st.a.rk[D.k]==='whole')weather(D.k);else{st.a.sel=D.k;say(`The ${D.k} bits are picked up. Tap the river, or use the buttons.`)}}else{A.redraw()}return}
 const b=[0,1].find(b=>hit(D,binR(b)));if(moved&&b!=null)sortCard(D.i,b);else if(!moved){s.sel=D.i;say(`"${SPEED.cards[D.i][0]}" picked up. Tap a box, or use the buttons.`)}else A.redraw()}
/* ---------- state, buttons and steps ---------- */
function fresh(){gen++;for(const k in st)delete st[k];Object.assign(st,{a:{rk:Object.fromEntries(ROCKS.map(r=>[r.k,'whole'])),layers:[],sel:null,drag:null,bad:''},
 b:{i:0,bad:'',mv:null},c:{i:0,bad:''},d:{i:0,bad:'',done:[]},e:{bin:{},sel:null,drag:null,bad:null},check:()=>{}})}
function say(t){if(st.a)st.a.msg=kind()==='wear'?t:st.a.msg;if(st.e&&kind()==='speed')st.e.msg=t;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();say(DESC[i]);st.check=finish(i,ok,DONE[i])}
function demo(i,list){steps[i].go();const e=gen;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='wear'){const s=st.a;if(s.sel)B(`Put the ${s.sel} bits in the river`,()=>drop(s.sel));
  ROCKS.forEach(r=>{if(s.rk[r.k]==='whole'){B(`Weather the ${r.k}`,()=>weather(r.k));B(`Put the whole ${r.k} in the river`,()=>drop(r.k))}else if(s.rk[r.k]==='bits'&&s.sel!==r.k)B(`Pick up the ${r.k} bits`,()=>{s.sel=r.k;say(`The ${r.k} bits are picked up. Tap the river, or use the buttons.`)})})}
 if(k==='grain'&&GRAIN[st.b.i])PKEYS.forEach(p=>B(PROC[p],()=>choose(p)));
 if(k==='cuts'&&CUTS[st.c.i])Object.keys(NODES).forEach(n=>B(NODES[n].t,()=>pickNode(n),`It ends up as: ${NODES[n].t}`));
 if(k==='where'&&WHERE[st.d.i])Object.keys(PLACES).forEach(z=>B(`On the ${PLACES[z].t}`.replace('On the deep','Deep'),()=>putWhere(z)));
 if(k==='speed'){const s=st.e;if(s.sel!=null)SPEED.bins.forEach((t,b)=>B(`Put it in ${b?'Slow':'Fast'}`,()=>sortCard(s.sel,b)));
  else left().forEach(i=>B(`Pick up: ${SPEED.cards[i][0]}`,()=>{s.sel=i;say(`"${SPEED.cards[i][0]}" picked up. Tap a box, or use the buttons.`)}))}}
const steps=[
{h:'Wear it down',p:TXT[0],predict:{q:'Marble is metamorphic rock, made hard by heat and squeezing. Can rain, ice and rivers wear it into sediment?',opts:['No: it is too hard to wear away','Yes: any rock at the surface wears away'],ans:1},
 task:'Break up all 3 rocks and send the bits down the river',show:()=>demo(0,ROCKS.flatMap(r=>[[160,()=>weather(r.k)],[160,()=>drop(r.k)]])),go:()=>enter(0,()=>ROCKS.every(r=>st.a.rk[r.k]==='gone'))},
{h:'Follow a grain',p:TXT[1],task:'Take the grain all the way round the loop',show:()=>demo(1,GRAIN.map(G=>[600,()=>choose(G.p)])),go:()=>enter(1,()=>st.b.i>=GRAIN.length)},
{h:'Short cuts',p:TXT[2],predict:{q:'Can metamorphic rock become sedimentary rock without melting first?',opts:['No: rock goes round the loop in order','Yes: it can be worn into sediment'],ans:1},
 task:'Find where all 3 rocks end up',show:()=>demo(2,CUTS.map(C=>[300,()=>pickNode(C.to)])),go:()=>enter(2,()=>st.c.i>=CUTS.length)},
{h:'Where on Earth?',p:TXT[3],task:'Put all 5 changes where they happen',show:()=>demo(3,WHERE.map(W=>[250,()=>putWhere(W.z)])),go:()=>enter(3,()=>st.d.i>=WHERE.length)},
{h:'Fast or slow?',p:TXT[4],predict:{q:'How long does it take for sand on the sea floor to become sandstone?',opts:['About a few years','Thousands to millions of years'],ans:1},
 task:'Sort all 6 changes',show:()=>demo(4,SPEED.cards.map(([t,b],i)=>[200,()=>sortCard(i,b)])),go:()=>enter(4,()=>!left().length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
function why(t){let m='Rock changes round a loop with short cuts: weathering, compaction, heat and pressure, melting and cooling.';
 if(t==='order')m='Rock does not have to go round in order. Marble at the surface can be weathered into sediment, then pressed and glued into sedimentary rock, without melting.';
 if(t==='stuck')m='Every kind of rock can change. Metamorphic rock can be weathered, heated more, or melted.';
 if(t==='melt')m='Heat and squeezing without melting make metamorphic rock. Only rock that melts becomes magma.';
 if(t==='cool')m='Igneous rock forms only when melted rock cools and turns solid. Liquid rock underground is magma, and rock that never melted is not igneous.';
 if(t==='start')m='The rock cycle is a loop, so it has no start. Rock can join it at any point and leave by many paths.';
 if(t==='fast')m='Pressing and gluing sand into sandstone takes thousands to millions of years, far longer than a life.';
 if(t==='erode')m='Weathering breaks rock where it stands. Erosion is when water, ice or wind carry the bits away.';
 if(t==='sed')m='Sedimentary rock is made when layers of sediment are squeezed and glued, not by cooling or by carrying bits away.';
 if(t==='crys')m='Slow cooling underground gives crystals time to grow, so they are big. Tiny crystals come from lava that cools fast.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rock cycle lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
