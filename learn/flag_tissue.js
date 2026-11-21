/* Flagship – cells, tissues and organs (ages 7–9): zoom from body to cell, build a tissue from similar cells, build the
   stomach from tissues, sort organs into systems, climb the levels from cell to body. Data in learn/tissue_art.js. */
(()=>{const {ZOOM,KINDS,TRAY,BUILD,NEED,TISSUES,SYSTEMS,ORGANS,JOBS,LEVELS,MIX,T,DESC,DONE,QS}=TIS;
VIS.reg('flagtissue',c=>{let A,X,bar,quiz,qk=-1,ver=0;const M={};
const DK='#111827',GO='#15803d',NOPE='#be123c',LINE='#52525b',FOCUS='#6d28d9',FONT='system-ui,sans-serif';
const lvl=()=>['zoom','tissue','organ','system','ladder','chal'][A.step];
const px=n=>Math.round(n*(A.narrow?1:1.14));
const on=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const kind=k=>KINDS.find(q=>q.k===k);
function paper(){X.fillStyle=A.mix(A.col.pn,'#fdf2f8',A.col.dark?.06:.5);X.fillRect(0,0,A.W,A.H)}
function say2(s,x,y,n,col,o){o=o||{};X.font=`${o.w||700} ${px(n)}px ${FONT}`;X.fillStyle=col||DK;X.textAlign=o.al||'center';X.textBaseline='middle';
 const parts=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&o.wrap&&X.measureText(t).width>o.wrap){parts.push(cur);cur=w}else cur=t}parts.push(cur);
 const lh=px(n)+2;parts.forEach((t,i)=>X.fillText(t,x,y+(o.top?i*lh:(i-(parts.length-1)/2)*lh)))}
function tab(b,o){o=o||{};X.fillStyle=o.no?'#ffe4e6':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,8);X.fill();X.lineWidth=o.no||o.ok||o.hi?3:1.5;X.strokeStyle=o.no?NOPE:o.ok?GO:o.hi?FOCUS:LINE;X.stroke()}
function banner(s,ok){let n=px(13);X.font=`800 ${n}px ${FONT}`;let w=X.measureText(s).width+26;while(w>A.W-12&&n>10){n--;X.font=`800 ${n}px ${FONT}`;w=X.measureText(s).width+26}
 const h=n+14,x=(A.W-w)/2,y=A.H*.055-h/2;X.fillStyle=ok?'#dcfce7':'#ffffff';A.paint.rrect(x,y,w,h,h/2);X.fill();X.lineWidth=ok?3:1.5;X.strokeStyle=ok?GO:LINE;X.stroke();X.fillStyle=ok?GO:DK;X.textAlign='center';X.textBaseline='middle';X.fillText(s,A.W/2,y+h/2+1)}
function ring(x,y,r){X.save();X.setLineDash([6,5]);X.lineWidth=3;X.strokeStyle=FOCUS;X.beginPath();X.arc(x,y,r,0,7);X.stroke();X.restore()}
function heart(x,y,s,col){X.fillStyle=col;X.beginPath();X.moveTo(x,y+s*.9);X.bezierCurveTo(x-s*1.3,y+s*.1,x-s*.9,y-s*.9,x,y-s*.35);X.bezierCurveTo(x+s*.9,y-s*.9,x+s*1.3,y+s*.1,x,y+s*.9);X.fill();X.lineWidth=2;X.strokeStyle='#7f1d1d';X.stroke()}
/* cell pictures, one per kind */
function cellPic(k,x,y,s){X.lineWidth=2;
 if(k==='muscle'){X.fillStyle='#fecaca';A.paint.rrect(x-s,y-s*.32,s*2,s*.64,s*.32);X.fill();X.strokeStyle='#dc2626';X.stroke();X.strokeStyle='#f87171';for(let i=-3;i<=3;i++){X.beginPath();X.moveTo(x+i*s*.24,y-s*.24);X.lineTo(x+i*s*.24,y+s*.24);X.stroke()}X.fillStyle='#7f1d1d';X.beginPath();X.ellipse(x,y,s*.16,s*.1,0,0,7);X.fill()}
 else if(k==='nerve'){X.strokeStyle='#a16207';X.lineWidth=3;for(let i=0;i<5;i++){const a=i*1.26+.3;X.beginPath();X.moveTo(x-s*.35,y);X.lineTo(x-s*.35+Math.cos(a)*s*.55,y+Math.sin(a)*s*.55);X.stroke()}X.beginPath();X.moveTo(x-s*.35,y);X.lineTo(x+s,y+s*.15);X.stroke();
  X.fillStyle='#fde68a';X.beginPath();X.arc(x-s*.35,y,s*.3,0,7);X.fill();X.lineWidth=2;X.stroke();X.fillStyle='#713f12';X.beginPath();X.arc(x-s*.35,y,s*.11,0,7);X.fill()}
 else if(k==='lining'){X.fillStyle='#bfdbfe';X.fillRect(x-s*.5,y-s*.45,s,s*.9);X.strokeStyle='#1d4ed8';X.strokeRect(x-s*.5,y-s*.45,s,s*.9);X.fillStyle='#1e3a8a';X.beginPath();X.arc(x,y,s*.14,0,7);X.fill()}
 else{X.fillStyle='#e7e5e4';A.paint.rrect(x-s*.9,y-s*.3,s*1.8,s*.6,s*.3);X.fill();X.strokeStyle='#57534e';X.stroke();[-1,1].forEach(e=>{X.fillStyle='#e7e5e4';X.beginPath();X.arc(x+e*s*.9,y,s*.36,0,7);X.fill();X.stroke()})}}
/* 1. zoom from body to cell */
function zoomTarget(){const z=M.z.lv,cx=A.W/2,cy=A.H*.46,S=Math.min(A.W,A.H)*.36;
 return[{x:cx-S*.1,y:cy-S*.05,r:S*.17},{x:cx,y:cy,r:S*.42},{x:cx+S*.25,y:cy+S*.05,r:S*.17},{x:cx,y:cy,r:S*.18},null][z]}
function drawZoom(){paper();const z=M.z.lv,cx=A.W/2,cy=A.H*.46,S=Math.min(A.W,A.H)*.36;
 if(z===0){X.fillStyle=A.col.dark?'#e7e5e4':'#fde68a';X.beginPath();X.arc(cx,cy-S*.78,S*.24,0,7);X.fill();A.paint.rrect(cx-S*.42,cy-S*.5,S*.84,S*1.1,S*.2);X.fill();X.fillRect(cx-S*.36,cy+S*.55,S*.24,S*.55);X.fillRect(cx+S*.12,cy+S*.55,S*.24,S*.55);heart(cx-S*.1,cy-S*.05,S*.12,'#dc2626')}
 if(z===1){X.lineWidth=6;X.strokeStyle='#dc2626';X.beginPath();X.ellipse(cx,cy-S*.55,S*.9,S*.4,0,Math.PI,0);X.stroke();X.strokeStyle='#2563eb';X.beginPath();X.ellipse(cx,cy+S*.55,S*.9,S*.4,0,0,Math.PI);X.stroke();
  X.strokeStyle='#dc2626';X.beginPath();X.moveTo(cx+S*.9,cy-S*.55);X.lineTo(cx+S*.9,cy+S*.55);X.stroke();X.strokeStyle='#2563eb';X.beginPath();X.moveTo(cx-S*.9,cy+S*.55);X.lineTo(cx-S*.9,cy-S*.55);X.stroke();heart(cx,cy,S*.3,'#dc2626');
  say2('blood vessels',cx,cy-S*1.05,12,A.col.tx)}
 if(z===2){heart(cx,cy,S*.75,'#ef4444');X.fillStyle='#fecaca';X.fillRect(cx+S*.17,cy-S*.03,S*.16,S*.16)}
 if(z===3){const w=S*.34;for(let r=-2;r<=2;r++)for(let k=-2;k<=2;k++)cellPic('muscle',cx+k*w*2.2+(r%2)*w*.6,cy+r*w*.8,w)}
 if(z===4){cellPic('muscle',cx,cy,S*.85);say2('nucleus',cx,cy+S*.5,13,A.col.tx);say2('cell membrane',cx,cy-S*.5,13,A.col.tx);say2('Too small to see by eye: use a microscope',cx,cy+S*.95,12,A.col.tx,{wrap:A.W-30})}
 const t=zoomTarget();if(t)ring(t.x,t.y,t.r);
 const crumbs=ZOOM.map(q=>q.t),w=(A.W-16)/5;crumbs.forEach((s,i)=>{const b={x:8+i*w,y:A.H*.88,w:w-4,h:A.H*.09};tab(b,{ok:i===z,hi:i<z});say2(s,b.x+b.w/2,b.y+b.h/2,10,i===z?GO:DK,{wrap:b.w-6,w:800})});
 banner(z>=4?'Down to one cell':`${ZOOM[z].s}: tap the ring`,z>=4)}
function zoom(){const s=M.z;if(s.lv>=4)return;s.lv++;A.sound.pop();tell(`${ZOOM[s.lv].t}: ${ZOOM[s.lv].s}.`)}
/* 2. build a tissue */
const trayBoxes=()=>{const n=4,g=8,w=(A.W-24-(n-1)*g)/n,h=Math.min(w*.62,A.H*.11);return TRAY.map((k,i)=>({i,k,x:12+(i%n)*(w+g),y:A.H*.5+Math.floor(i/n)*(h+g),w,h}))};
const bowl=()=>({x:12,y:A.H*.13,w:A.W-24,h:A.H*.3});
function drawTissue(){paper();const s=M.t,B=bowl(),R=BUILD[Math.min(s.r,BUILD.length-1)],full=s.r>=BUILD.length;tab(B,{hi:M.over});
 say2(full?'Two tissues built':`Build ${R.t}: ${s.n} of ${NEED} cells`,B.x+B.w/2,B.y+px(16),14,DK,{w:800});
 const half=(k,j,n,done)=>{const x=B.x+B.w*(j*.5+.25),sz=Math.min(B.w*.1,B.h*.16);for(let q=0;q<n;q++)cellPic(k,x,B.y+B.h*(.42+q*.19),sz);if(done)say2(`✓ ${kind(k).t.replace(' cell',' tissue')}`,x,B.y+B.h*.27,12,GO,{w:800})};
 s.made.forEach((k,j)=>half(k,j,NEED,1));if(!full)half(R.k,s.r,s.n,0);
 trayBoxes().forEach(b=>{if(s.used.includes(b.i)||(M.drag&&M.drag.i===b.i))return;tab(b,{no:s.bad===b.i});cellPic(b.k,b.x+b.w/2,b.y+b.h/2,Math.min(b.w*.3,b.h*.42))});
 if(M.drag){const d=M.drag,b=trayBoxes()[d.i];tab({x:d.x-b.w/2,y:d.y-b.h/2,w:b.w,h:b.h},{hi:1});cellPic(b.k,d.x,d.y,Math.min(b.w*.3,b.h*.42))}
 banner(full?'A tissue: similar cells, one job':'Drag (or tap) the right cells into the box',full)}
function addCell(i){const s=M.t;if(s.r>=BUILD.length||s.used.includes(i))return;const k=TRAY[i],R=BUILD[s.r];
 if(k!==R.k){s.bad=i;A.sound.miss();return tell(T.sameKind(kind(k).t.toLowerCase(),R.t))}
 s.used.push(i);s.bad=-1;s.n++;A.sound.pop();if(s.n<NEED)return tell(`${s.n} of ${NEED} ${R.k} cells in the box.`);
 s.made.push(R.k);s.r++;s.n=0;tell(`That is ${R.t}: similar cells that ${R.job}.`+(s.r<BUILD.length?` Now build ${BUILD[s.r].t}.`:''))}
/* 3. build the stomach */
const tCards=()=>{const g=8,w=(A.W-24-g)/2,h=px(44);return TISSUES.map((q,i)=>({i,x:12+(i%2)*(w+g),y:A.H*.68+Math.floor(i/2)*(h+g),w,h}))};
const belly=()=>({x:A.W*.18,y:A.H*.12,w:A.W*.64,h:A.H*.48});
function drawOrgan(){paper();const s=M.o,B=belly(),cx=B.x+B.w*.5,cy=B.y+B.h*.55,rx=B.w*.4,ry=B.h*.36;
 const has=k=>s.got.includes(k);X.lineWidth=has('muscle')?14:3;X.strokeStyle=has('muscle')?'#f87171':LINE;X.fillStyle=has('lining')?'#bfdbfe':(A.col.dark?'#f5f5f4':'#ffffff');
 X.beginPath();X.ellipse(cx,cy,rx,ry,-.35,0,7);X.fill();X.stroke();X.lineWidth=6;X.strokeStyle=has('muscle')?'#f87171':LINE;X.beginPath();X.moveTo(cx-rx*.55,cy-ry*.85);X.lineTo(cx-rx*.75,B.y);X.stroke();X.beginPath();X.moveTo(cx+rx*.85,cy+ry*.3);X.lineTo(B.x+B.w,cy+ry*.6);X.stroke();
 if(has('nerve')){X.strokeStyle='#ca8a04';X.lineWidth=2.5;for(const i of[-1,1]){X.beginPath();X.moveTo(cx-rx*.6,cy+i*ry*.5);X.quadraticCurveTo(cx,cy+i*ry*.5-ry*.22,cx+rx*.6,cy+i*ry*.5);X.stroke()}}
 say2('Stomach',cx,cy,14,DK,{w:900});say2(`${s.got.length} of 3 tissues`,A.W/2,B.y+B.h+px(12),13,A.col.tx,{w:800});
 tCards().forEach(b=>{const q=TISSUES[b.i];if(has(q.k))return;tab(b,{no:s.bad===b.i});say2(q.t,b.x+b.w/2,b.y+b.h*.36,13,DK,{w:800});say2(q.job,b.x+b.w/2,b.y+b.h*.72,10,'#3f3f46',{w:600})});
 if(M.drag){const d=M.drag,b=tCards()[d.i];tab({x:d.x-b.w/2,y:d.y-b.h/2,w:b.w,h:b.h},{hi:1});say2(TISSUES[d.i].t,d.x,d.y,13,DK,{w:800})}
 banner(s.got.length>=3?'An organ: different tissues working together':'Drag (or tap) the tissues the stomach needs',s.got.length>=3)}
function addTissue(i){const s=M.o,q=TISSUES[i];if(s.got.includes(q.k)||s.got.length>=3)return;
 if(!q.in){s.bad=i;A.sound.miss();return tell(T.bone)}
 s.got.push(q.k);s.bad=-1;A.sound.pop();tell(`${q.t} ${q.job}.`+(s.got.length>=3?' The stomach is built: three tissues, one organ.':''))}
/* 4. organs into systems */
const bins=()=>{const g=8,w=(A.W-24-2*g)/3;return SYSTEMS.map((t,i)=>({i,x:12+i*(w+g),y:A.H*.12,w,h:A.H*.36}))};
const oCards=()=>{const g=8,w=(A.W-24-2*g)/3,h=px(40);return ORGANS.map((q,i)=>({i,x:12+(i%3)*(w+g),y:A.H*.62+Math.floor(i/3)*(h+g),w,h}))};
function drawSystem(){paper();const s=M.s;
 bins().forEach(b=>{tab(b,{hi:M.over===b.i});say2(SYSTEMS[b.i],b.x+b.w/2,b.y+px(16),12,DK,{w:800,wrap:b.w-6});say2(JOBS[b.i],b.x+b.w/2,b.y+px(36),10,'#3f3f46',{w:600,wrap:b.w-8,top:1});
  s.put.filter(i=>ORGANS[i].s===b.i).forEach((i,j)=>say2(ORGANS[i].t,b.x+b.w/2,b.y+b.h*.66+j*px(18),12,GO,{w:800}))});
 oCards().forEach(b=>{if(s.put.includes(b.i)||(M.drag&&M.drag.i===b.i))return;tab(b,{no:s.bad===b.i,hi:s.pick===b.i});say2(ORGANS[b.i].t,b.x+b.w/2,b.y+b.h/2,12,DK,{w:800,wrap:b.w-8})});
 if(M.drag){const d=M.drag,b=oCards()[d.i];tab({x:d.x-b.w/2,y:d.y-b.h/2,w:b.w,h:b.h},{hi:1});say2(ORGANS[d.i].t,d.x,d.y,12,DK,{w:800})}
 banner(s.put.length>=ORGANS.length?'Organs work together in systems':'Drag each organ to its system',s.put.length>=ORGANS.length)}
function file(i,b){const s=M.s;if(s.put.includes(i))return;s.pick=null;const q=ORGANS[i];
 if(q.s!==b){s.bad=i;A.sound.miss();return tell(T.sys[i])}
 s.put.push(i);s.bad=-1;A.sound.pop();tell(`${q.t}: ${SYSTEMS[b].toLowerCase()} system.`+(s.put.length>=ORGANS.length?' All 6 sorted.':''))}
/* 5. smallest to biggest */
const stairs=()=>{const g=5,w=(A.W-24-4*g)/5;return LEVELS.map((_,i)=>{const h=A.H*(.12+i*.06);return{i,x:12+i*(w+g),y:A.H*.5-h,w,h}})};
const lCards=()=>{const g=8,w=(A.W-24-2*g)/3,h=px(40);return MIX.map((li,j)=>({i:li,x:12+(j%3)*(w+g),y:A.H*.62+Math.floor(j/3)*(h+g),w,h}))};
function drawLadder(){paper();const s=M.l;
 stairs().forEach(b=>{const got=s.seq[b.i];tab(b,{ok:got!=null});say2(got!=null?LEVELS[got]:String(b.i+1),b.x+b.w/2,b.y+b.h/2,11,got!=null?GO:'#52525b',{w:800,wrap:b.w-4})});
 say2('smallest  →  biggest',A.W/2,A.H*.555,12,A.col.tx);
 lCards().forEach(b=>{if(s.seq.includes(b.i))return;tab(b,{no:s.bad===b.i});say2(LEVELS[b.i],b.x+b.w/2,b.y+b.h/2,12,DK,{w:800,wrap:b.w-8})});
 banner(s.seq.length>=LEVELS.length?'Cell, tissue, organ, system, body':'Tap the cards from smallest to biggest',s.seq.length>=LEVELS.length)}
function climb(i){const s=M.l;if(s.seq.includes(i))return;const n=s.seq.length;
 if(i!==n){s.bad=i;A.sound.miss();return tell(T.order[n])}
 s.seq.push(i);s.bad=-1;A.sound.pop();tell(`${n+1}: ${LEVELS[i]}.`+(n+1>=LEVELS.length?' Each level is made of lots of the one before.':''))}
function draw(){const k=lvl();if(k==='chal'){paper();banner('Challenge',true);say2('Cell → tissue → organ → system → body',A.W/2,A.H*.5,14,A.col.tx,{wrap:A.W-30});return}
 ({zoom:drawZoom,tissue:drawTissue,organ:drawOrgan,system:drawSystem,ladder:drawLadder})[k]();A.fx.draw(X)}
function down(p){const k=lvl();
 if(k==='zoom'){const t=zoomTarget();if(t&&Math.hypot(p.x-t.x,p.y-t.y)<=t.r*1.3)zoom();else if(t){A.sound.miss();tell(T.zoomMiss)}return false}
 if(k==='ladder'){const b=lCards().find(b=>on(p,b)&&!M.l.seq.includes(b.i));if(b)climb(b.i);return false}
 const list=k==='tissue'?trayBoxes().filter(b=>!M.t.used.includes(b.i)):k==='organ'?tCards().filter(b=>!M.o.got.includes(TISSUES[b.i].k)):oCards().filter(b=>!M.s.put.includes(b.i));
 const b=list.find(b=>on(p,b));if(b){M.drag={i:b.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(k==='system'&&M.s.pick!=null){const z=bins().find(z=>on(p,z));if(z)file(M.s.pick,z.i)}return false}
function target(p){const k=lvl();if(k==='tissue')return on(p,bowl())?0:null;if(k==='organ')return on(p,belly())?0:null;const z=bins().find(z=>on(p,z));return z?z.i:null}
function move(p){const d=M.drag;if(!d)return;d.x=p.x;d.y=p.y;M.over=target(p);A.redraw()}
function up(p){const d=M.drag;if(!d)return;M.drag=null;M.over=null;const k=lvl(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,t=target(p);
 if(k==='tissue'&&(tap||t!=null))return addCell(d.i);if(k==='organ'&&(tap||t!=null))return addTissue(d.i);
 if(k==='system'){if(t!=null)return file(d.i,t);if(tap){M.s.pick=d.i;return tell(`${ORGANS[d.i].t} picked. Now tap its system.`)}}A.redraw()}
function clear(){ver++;for(const k in M)delete M[k];Object.assign(M,{z:{lv:0},t:{r:0,n:0,used:[],made:[],bad:-1},o:{got:[],bad:-1},s:{put:[],bad:-1,pick:null},l:{seq:[],bad:-1},drag:null,over:null,ready:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.ready()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){clear();tell(DESC[i]);M.ready=when(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},ms*(j+1)))}
function keys(){if(!bar)return;bar.innerHTML='';const k=lvl(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='zoom'&&M.z.lv<4)B(`Zoom in on the ${['heart','heart','heart wall','muscle cell'][M.z.lv]}`,zoom);
 if(k==='tissue'&&M.t.r<BUILD.length)KINDS.forEach(q=>{const i=TRAY.findIndex((t,j)=>t===q.k&&!M.t.used.includes(j));if(i>=0)B(`Add a ${q.t.toLowerCase()}`,()=>addCell(i))});
 if(k==='organ')TISSUES.forEach((q,i)=>{if(!M.o.got.includes(q.k)&&M.o.got.length<3)B(`Add ${q.t.toLowerCase()}`,()=>addTissue(i))});
 if(k==='system')ORGANS.forEach((q,i)=>{if(!M.s.put.includes(i))SYSTEMS.forEach((t,b)=>B(`${q.t} → ${t}`,()=>file(i,b),`Put the ${q.t.toLowerCase()} in the ${t.toLowerCase()} system`))});
 if(k==='ladder')MIX.forEach(i=>{if(!M.l.seq.includes(i))B(LEVELS[i],()=>climb(i),`Next biggest: ${LEVELS[i]}`)})}
const steps=[
{h:'Zoom in',p:'Tap the part inside the dashed ring to zoom in, from your whole body down to one cell.',
 predict:{q:'Can you see one of your own cells with just your eyes?',opts:['Yes, if you look closely','No, you need a microscope'],ans:1},task:'Zoom all the way down to one cell',
 show:()=>auto(0,[zoom,zoom,zoom,zoom],500),go:()=>enter(0,()=>M.z.lv>=4)},
{h:'Make a tissue',p:'Drag cells into the box, or tap them. Each tissue needs 3 cells of the right kind.',
 predict:{q:'What is a tissue made of?',opts:['All sorts of cells mixed up','Lots of similar cells'],ans:1},task:'Build muscle tissue, then nerve tissue',
 show:()=>auto(1,BUILD.flatMap(R=>TRAY.map((k,i)=>[k,i]).filter(([k])=>k===R.k).slice(0,NEED).map(([,i])=>()=>addCell(i))),350),go:()=>enter(1,()=>M.t.r>=BUILD.length)},
{h:'Make an organ',p:'The stomach is an organ. Drag in the tissues it needs, or tap them. One tissue does not belong.',
 predict:{q:'Is an organ made of just one kind of tissue?',opts:['Yes, just one','No, several tissues working together'],ans:1},task:'Build the stomach from its 3 tissues',
 show:()=>auto(2,[0,1,3].map(i=>()=>addTissue(i)),550),go:()=>enter(2,()=>M.o.got.length>=3)},
{h:'Organ systems',p:'Organs work in teams called organ systems. Drag each organ to its system, or tap an organ and then a system.',
 predict:{q:'Which system is the heart part of?',opts:['The breathing system, with the lungs','The circulatory system, with the blood vessels'],ans:1},task:'Sort all 6 organs',
 show:()=>auto(3,ORGANS.map((q,i)=>()=>file(i,q.s)),420),go:()=>enter(3,()=>M.s.put.length>=ORGANS.length)},
{h:'Smallest to biggest',p:'Tap the cards from the smallest level to the biggest.',
 predict:{q:'Which is bigger: a tissue or an organ?',opts:['A tissue','An organ'],ans:1},task:'Put all 5 levels in order',
 show:()=>auto(4,LEVELS.map((_,i)=>()=>climb(i)),480),go:()=>enter(4,()=>M.l.seq.length>=LEVELS.length)},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.ready()});
function why(t){let m='Cells make tissues, tissues make organs, organs make systems, and systems make the body.';
 if(t==='mix')m='A tissue is a group of similar cells doing one job, not a mix of any cells.';
 if(t==='one')m='A tissue is many cells, not one. One cell is the smallest level.';
 if(t==='size')m='An organ is made of several tissues, so it is bigger than a tissue, and much bigger than a cell.';
 if(t==='organ')m='Several tissues working together make an organ, and several organs make an organ system.';
 if(t==='sys')m='The lungs take in air, so they are in the breathing system with the windpipe.';
 if(t==='see')m='Most cells are far too small to see with your eyes. You need a microscope.';
 return m}
function pose(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:Y=>{quiz.hidden=Y.step!==5;bar.hidden=Y.step===5;keys()},
 init:Y=>{A=Y;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Cells and tissues lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
