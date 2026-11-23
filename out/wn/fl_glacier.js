/* Flagship – glaciers and ice sheets (ages 9–11): snow to ice, mass balance, U-shaped valleys, sea level, ice cores.
   Data, messages and canvas UI helpers: glacier_art.js. */
(()=>{const G=GLAC;
VIS.reg('flagglacier',c=>{let A,g,tray,chal,qi=-1,gen=0;const S={};
const YES='#047857',NO='#b91c1c',RIM='#64748b',PX='px system-ui,sans-serif';
const now=()=>['snow','bal','carve','sea','core','chal'][A.step];
const fz=n=>A.narrow?n:Math.round(n*1.1);
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':'#0f172a';
const U=G.ui(()=>A,()=>g,S),{lines,top,pill,tag,row}=U;
/* ---------- 1. snow to ice: a stack of yearly layers ---------- */
let STK={x:0,y:0,w:1,h:1,lh:1},TOK={};
function winter(){const s=S.sn;if(s.L.length&&G.kindOf(s.L[0])===2)return note('Your first snow is already glacier ice.',false);
 s.L=s.L.map(a=>a+1);s.L.push(0);s.bad=false;A.sound.pop();const k=G.kindOf(s.L[0]);
 note(s.L.length===1?G.MSG.first:`Winter ${s.L.length}: new snow on top squeezes the layers below. The first layer is now ${G.KIND[k].n.toLowerCase()}.`,false)}
function summer(){const s=S.sn;if(!s.L.length)return note(G.MSG.nosnow,false);
 s.L.pop();s.bad=true;A.sound.miss();note(G.MSG.summer,true)}
function layerAt(p){const s=S.sn;for(let i=0;i<s.L.length;i++){const y=STK.y+STK.h-(i+1)*STK.lh;if(within(p,{x:STK.x,y,w:STK.w,h:STK.lh}))return i}return -1}
function drawSnow(){const s=S.sn,fin=s.L.length&&G.kindOf(s.L[0])===2,t=top(fin?G.DONE[0]:'Add winters until your first snow becomes glacier ice.',fin?'ok':s.bad?'no':'');
 const r=Math.max(22,Math.min(34,A.W*.08));TOK={cloud:{x:12+r*1.3,y:t+r+14,r},sun:{x:12+r*1.3,y:t+r*3.6+28,r}};
 STK={x:A.W*.42,w:A.W*.5,y:t+6,h:A.H-t-16,lh:Math.min(34,(A.H-t-16)/6.5)};g.strokeStyle=RIM;g.lineWidth=1.5;g.strokeRect(STK.x,STK.y,STK.w,STK.h);
 g.fillStyle=dk()?'#57534e':'#a8a29e';g.fillRect(STK.x,STK.y+STK.h-6,STK.w,6);
 s.L.forEach((a,i)=>{const k=G.kindOf(a),K=G.KIND[k],y=STK.y+STK.h-6-(i+1)*STK.lh;g.fillStyle=K.fill;g.fillRect(STK.x+1,y,STK.w-2,STK.lh-1);g.strokeStyle='#94a3b8';g.lineWidth=1;g.strokeRect(STK.x+1,y,STK.w-2,STK.lh-1);
  g.font=`700 ${fz(12)}${PX}`;g.fillStyle=K.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(`${K.n}${i===0?' (first snow)':''}`,STK.x+STK.w/2,y+STK.lh/2)});
 if(s.L.length>1&&s.L.length<6){g.fillStyle=fg();g.font=`800 ${fz(13)}${PX}`;g.textAlign='center';g.textBaseline='bottom';g.fillText('⬇ new snow presses down ⬇',STK.x+STK.w/2,STK.y+STK.h-6-s.L.length*STK.lh-6)}
 const dr=s.drag;G.cloud(g,dr&&dr.what==='cloud'?dr.x:TOK.cloud.x,dr&&dr.what==='cloud'?dr.y:TOK.cloud.y,TOK.cloud.r);tag('Winter snow',TOK.cloud.x,TOK.cloud.y+TOK.cloud.r+12);
 G.sun(g,dr&&dr.what==='sun'?dr.x:TOK.sun.x,dr&&dr.what==='sun'?dr.y:TOK.sun.y,TOK.sun.r);tag('Warm summer',TOK.sun.x,TOK.sun.y+TOK.sun.r+12,'#9a3412')}
/* ---------- 2. grow or shrink: snow in against melt out ---------- */
let BARS=[],RUN=null,VAL={x:0,y:0,w:1,h:1};
const along=f=>({x:VAL.x+f*VAL.w,y:VAL.y+f*VAL.h*.8});
function runYears(){const b=S.ba,Q=G.GOALS[b.k];if(!Q||b.busy)return;b.busy=true;const d=b.snow-b.melt,len=Math.max(.3,Math.min(.95,b.len+d*.07)),st=b.stone+.22;A.sound.whoosh();
 A.tween(b,{len,stone:st},700,'io',()=>{b.busy=false;if(b.stone>b.len){b.stone=.12;b.drop=true}judge(d)})}
function judge(d){const b=S.ba,Q=G.GOALS[b.k],got=d>0?'grow':d<0?'shrink':'same';
 if(got!==Q.g){b.bad=true;A.sound.miss();return note(G.MSG.wrongBal(got),true)}
 b.k++;b.bad=false;A.sound.pop();note(G.MSG.rightBal(got),false)}
function setBar(which,v){const b=S.ba;if(b.busy)return;b[which]=Math.max(1,Math.min(5,v));b.bad=false;A.sound.tick();note(`Winter snow ${b.snow}, summer melt ${b.melt}. Press Run 10 years.`,false)}
function drawBal(){const b=S.ba,Q=G.GOALS[b.k],t=top(Q?`${b.k+1} of 3. ${Q.q}`:G.DONE[1],Q?(b.bad?'no':''):'ok');const bh=Math.min(42,A.H*.1),base=A.H-bh-14,barH=Math.max(60,base-t-34);
 BARS=[['snow','Snow',A.W*.06,'#93c5fd'],['melt','Melt',A.W*.06+A.W*.13,'#fb923c']].map(([k,n,x,col])=>{const w=A.W*.1,r={x,y:t+18,w,h:barH,k};g.strokeStyle=RIM;g.lineWidth=1.4;g.strokeRect(x,r.y,w,barH);const h=b[k]/5*barH;g.fillStyle=col;g.fillRect(x+1,r.y+barH-h,w-2,h);
  g.font=`800 ${fz(12)}${PX}`;g.fillStyle=fg();g.textAlign='center';g.textBaseline='bottom';g.fillText(`${n} ${b[k]}`,x+w/2,r.y-3);return r});
 RUN=row(0,1,base);RUN.x=A.W*.04;RUN.w=A.W*.3;pill(RUN,b.busy?'Running…':'Run 10 years',{});
 VAL={x:A.W*.4,y:t+50,w:A.W*.56,h:A.H-t-80};VAL.h=Math.min(VAL.h,VAL.w*.75);g.fillStyle=dk()?'#57534e':'#a8a29e';g.beginPath();g.moveTo(VAL.x,VAL.y);g.lineTo(VAL.x+VAL.w,VAL.y+VAL.h*.8);g.lineTo(VAL.x+VAL.w,A.H-8);g.lineTo(VAL.x,A.H-8);g.closePath();g.fill();
 const e=along(b.len),T=Math.max(18,VAL.w*.13),thick=f=>T*Math.sqrt(Math.max(0,1-Math.pow(f/b.len,2)));g.fillStyle='#bfdbfe';g.strokeStyle='#1d4ed8';g.lineWidth=2;g.beginPath();g.moveTo(VAL.x,VAL.y);
 for(let i=0;i<=24;i++){const f=b.len*i/24,q=along(f);g.lineTo(q.x,q.y-thick(f))}g.lineTo(e.x,e.y);g.closePath();g.fill();g.stroke();
 const sf=b.stone*b.len,s=along(sf),sy=s.y-thick(sf);g.fillStyle='#44403c';g.beginPath();g.arc(s.x,sy-5,6,0,7);g.fill();tag('stone',s.x,sy-22,'#44403c');tag('end',e.x+4,e.y+16,'#1e3a8a');
 if(b.drop){const m=along(Math.min(.97,b.len+.03));g.fillStyle='#78716c';[0,1,2].forEach(i=>{g.beginPath();g.arc(m.x+i*7,m.y-3-(i%2)*4,4,0,7);g.fill()})}
 g.font=`700 ${fz(11)}${PX}`;g.fillStyle=fg();g.textAlign='right';g.textBaseline='top';g.fillText('downhill →',VAL.x+VAL.w,VAL.y+VAL.h*.8+6)}
/* ---------- 3. carve the valley ---------- */
let VB={x:0,y:0,w:1,h:1},ICEB=null,PICK=[];
function carve(){const v=S.cv;if(v.k>=3)return;v.k++;v.bad=false;A.sound.whoosh();A.tween(v,{t:v.k/3},500,'io');
 note(G.MSG.carve[v.k-1],false)}
function answer(u){const v=S.cv;if(v.k<3||v.ok)return;if(!u){v.bad=true;A.sound.miss();return note(G.MSG.vee,true)}
 v.ok=true;v.bad=false;A.sound.pop();note(G.MSG.uok,false)}
function drawCarve(){const v=S.cv,t=top(v.ok?G.DONE[2]:v.k<3?`Drag the glacier down into the valley. ${v.k} of 3.`:'Tap the shape the glacier left.',v.ok?'ok':v.bad?'no':'');const bh=Math.min(42,A.H*.1),bot=v.k>=3?bh+16:10;
 VB={x:14,y:t+30,w:A.W-28,h:A.H-t-30-bot};const cx=VB.x+VB.w/2,hw=VB.w*.36,dep=VB.h*.62,gy=VB.y+VB.h*.2;
 g.fillStyle=dk()?'#57534e':'#a8a29e';g.beginPath();g.moveTo(VB.x,gy);g.lineTo(cx-hw,gy);for(let i=0;i<=40;i++){const u=-1+i/20;g.lineTo(cx+u*hw,gy+G.floor(u,v.t)*dep)}g.lineTo(VB.x+VB.w,gy);g.lineTo(VB.x+VB.w,VB.y+VB.h);g.lineTo(VB.x,VB.y+VB.h);g.closePath();g.fill();
 g.fillStyle='#22c55e';g.fillRect(VB.x,gy-5,cx-hw-VB.x,5);g.fillRect(cx+hw,gy-5,VB.x+VB.w-cx-hw,5);
 if(v.k<3){const off=v.drag?v.drag.dy:0,iy=gy-30+off+v.k*dep*.18;ICEB={x:cx-hw*.85,y:iy-26,w:hw*1.7,h:44};g.fillStyle='#bfdbfe';g.strokeStyle='#1d4ed8';g.lineWidth=2;A.paint.rrect(ICEB.x,ICEB.y,ICEB.w,ICEB.h,14);g.fill();g.stroke();
  g.fillStyle='#57534e';for(let i=0;i<7;i++){g.beginPath();g.arc(ICEB.x+12+i*(ICEB.w-24)/6,ICEB.y+ICEB.h-7,3.5,0,7);g.fill()}tag('glacier ⬇',cx,ICEB.y-10,'#1e3a8a')}
 else{g.fillStyle='#78716c';[[cx-hw*.92,gy+dep*.25],[cx+hw*.92,gy+dep*.25],[cx,gy+dep*.97]].forEach(([x,y])=>{for(let i=0;i<5;i++){g.beginPath();g.arc(x-8+i*4,y-2-(i%2)*4,4,0,7);g.fill()}});tag('moraine',cx+hw*.92,gy+dep*.25-16,'#44403c');
  PICK=[row(0,2),row(1,2)];pill(PICK[0],'U shape',{ok:v.ok});pill(PICK[1],'V shape',{no:v.bad})}}
/* ---------- 4. ice and sea level ---------- */
let SEA={x:0,y:0,w:1,h:1},BLK=[];
function melt(i){const s=S.se;if(s.gone.includes(i))return;s.gone.push(i);const I=G.ICE[i];A.sound.pop();A.tween(s,{lvl:s.lvl+I.m},600,'out');s.bad=false;
 note(G.MSG.melt(i),false)}
function drawSea(){const s=S.se,fin=s.gone.length===3,t=top(fin?G.DONE[3]:`Drag each kind of ice into the sea. ${s.gone.length} of 3 melted.`,fin?'ok':'');
 const bw=A.W*.36;BLK=G.ICE.map((I,i)=>({x:10,y:t+8+i*((A.H-t-16)/3),w:bw,h:Math.min(70,(A.H-t-16)/3-8),i}));
 SEA={x:A.W*.42,y:t+8,w:A.W*.56,h:A.H-t-18};const scale=SEA.h/70,sl=SEA.y+SEA.h-14*scale-s.lvl*scale;
 g.fillStyle=dk()?'#1e3a8a':'#93c5fd';g.fillRect(SEA.x,sl,SEA.w,SEA.y+SEA.h-sl);g.strokeStyle=RIM;g.lineWidth=1.2;g.strokeRect(SEA.x,SEA.y,SEA.w,SEA.h);
 g.font=`700 ${fz(10)}${PX}`;g.fillStyle=fg();g.textAlign='left';g.textBaseline='middle';[0,20,40,60].forEach(m=>{const y=SEA.y+SEA.h-14*scale-m*scale;g.fillRect(SEA.x,y,8,1.5);g.fillText(`+${m} m`,SEA.x+10,y)});
 tag(`sea level +${(Math.round(s.lvl*10)/10).toString()} m`,SEA.x+SEA.w*.62,Math.max(SEA.y+12,sl-12),'#1e3a8a');
 BLK.forEach(r=>{if(s.gone.includes(r.i))return;const I=G.ICE[r.i],dr=s.drag&&s.drag.i===r.i?s.drag:null,x=dr?dr.x-r.w/2:r.x,y=dr?dr.y-r.h/2:r.y;g.fillStyle=r.i?'#e0f2fe':'#ffffff';g.strokeStyle='#1d4ed8';g.lineWidth=2;A.paint.rrect(x,y,r.w,r.h,10);g.fill();g.stroke();
  g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';g.font=`800 ${fz(12)}${PX}`;lines(I.n,r.w-10,g.font).forEach((L,j,a)=>g.fillText(L,x+r.w/2,y+r.h/2-8+(j-(a.length-1)/2)*fz(13)));g.font=`600 ${fz(10)}${PX}`;g.fillText(I.sub,x+r.w/2,y+r.h-10)})}
/* ---------- 5. ice core ---------- */
let SH={x:0,y:0,w:1,h:1},ORD=[];
const zone=f=>f<.3?0:f<.7?1:2;
function drill(f){const s=S.co;if(s.have.length===3)return;s.depth=f;const z=zone(f);if(s.have.includes(z))return note(`You already have the ${G.CORE[z].n.toLowerCase()}. Drill to a different depth.`,false);
 s.have.push(z);s.bad=false;A.sound.pop();note(s.have.length<3?`Sample taken from the ${['top','middle','bottom'][z]}. Take samples from the other depths too.`:G.MSG.three,false)}
function order(z){const s=S.co;if(s.have.length<3||s.seq.length===3)return;const want=[2,1,0][s.seq.length];
 if(z!==want){s.bad=true;A.sound.miss();return note(z===0&&!s.seq.length?G.MSG.topNew:G.MSG.deeper,true)}
 s.seq.push(z);s.bad=false;A.sound.pop();const C=G.CORE[z];note(`${C.n}: ${C.age}. Its bubbles hold ${C.air}.`+(s.seq.length<3?'':' Today the air has over 420 ppm.'),false)}
function drawCore(){const s=S.co,fin=s.seq.length===3,t=top(fin?G.DONE[4]:s.have.length<3?`Drag the drill down to take 3 samples. ${s.have.length} of 3.`:'Tap the samples from oldest to youngest.',fin?'ok':s.bad?'no':'');const bh=Math.min(42,A.H*.1),bot=s.have.length===3?bh+16:10;
 SH={x:A.W*.3,y:t+30,w:A.W*.4,h:A.H-t-40-bot};for(let i=0;i<14;i++){const y=SH.y+i*SH.h/14;g.fillStyle=G.KIND[i<1?0:i<3?1:2].fill;g.globalAlpha=i<3?1:.55+.45*i/14;g.fillRect(SH.x,y,SH.w,SH.h/14+1);g.globalAlpha=1}
 g.strokeStyle=RIM;g.lineWidth=1.5;g.strokeRect(SH.x,SH.y,SH.w,SH.h);g.fillStyle=dk()?'#57534e':'#a8a29e';g.fillRect(SH.x,SH.y+SH.h,SH.w,6);
 g.font=`700 ${fz(11)}${PX}`;g.fillStyle=fg();g.textAlign='right';g.textBaseline='middle';g.fillText('surface',SH.x-6,SH.y+6);g.fillText('rock',SH.x-6,SH.y+SH.h);
 const f=s.drag?s.drag.f:s.depth,dx=SH.x+SH.w/2,dy=SH.y+f*SH.h;g.strokeStyle='#475569';g.lineWidth=5;g.beginPath();g.moveTo(dx,SH.y-24);g.lineTo(dx,dy);g.stroke();g.fillStyle='#f59e0b';g.beginPath();g.moveTo(dx-9,dy);g.lineTo(dx+9,dy);g.lineTo(dx,dy+14);g.closePath();g.fill();tag('drill',dx,SH.y-30,'#7c2d12');
 s.have.forEach(z=>{const y=SH.y+G.CORE[z].at*SH.h;g.fillStyle='#7c3aed';g.fillRect(SH.x+SH.w+6,y-8,14,16);tag(s.seq.includes(z)?G.CORE[z].age.replace(' old',''):G.CORE[z].n,Math.min(A.W-60,SH.x+SH.w+70),y,'#5b21b6')});
 if(s.have.length===3){ORD=[0,1,2].map(i=>row(i,3));[0,1,2].forEach(z=>pill(ORD[z],G.CORE[z].n,{ok:s.seq.includes(z)}))}}
/* ---------- draw + pointer ---------- */
function draw(){const m=now();g.fillStyle=dk()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);
 if(m==='chal'){top('Challenge: glaciers, ice sheets and ice cores.','ok');}
 else ({snow:drawSnow,bal:drawBal,carve:drawCarve,sea:drawSea,core:drawCore})[m]();A.fx.draw(g)}
function down(p){const m=now();
 if(m==='snow'){for(const w of ['cloud','sun']){const T=TOK[w];if(T&&Math.hypot(p.x-T.x,p.y-T.y)<T.r*1.3){S.sn.drag={what:w,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}const i=layerAt({x:p.x,y:p.y+6});if(i>=0){const K=G.KIND[G.kindOf(S.sn.L[i])];note(`${K.n}: ${K.about}.`,false)}return false}
 if(m==='bal'){if(within(p,RUN)){runYears();return false}const B=BARS.find(r=>within(p,{x:r.x-6,y:r.y-10,w:r.w+12,h:r.h+20}));if(B){S.ba.drag=B;barTo(B,p);return true}return false}
 if(m==='carve'){const v=S.cv;if(v.k>=3){if(within(p,PICK[0]))answer(true);else if(within(p,PICK[1]))answer(false);return false}if(within(p,ICEB)){v.drag={y0:p.y,dy:0};return true}return false}
 if(m==='sea'){const r=BLK.find(r=>!S.se.gone.includes(r.i)&&within(p,r));if(r){S.se.drag={i:r.i,x:p.x,y:p.y,x0:p.x};return true}return false}
 if(m==='core'){const s=S.co;if(s.have.length===3){const z=[0,1,2].find(z=>within(p,ORD[z]));if(z!=null)order(z);return false}if(p.x>SH.x-20&&p.x<SH.x+SH.w+20&&p.y>SH.y-40&&p.y<SH.y+SH.h+10){s.drag={f:s.depth,y0:p.y};depthTo(p);return true}return false}
 return false}
function barTo(B,p){const v=Math.round((B.y+B.h-p.y)/B.h*5);if(v!==S.ba[B.k])setBar(B.k,v)}
function depthTo(p){S.co.drag.f=Math.max(.02,Math.min(.98,(p.y-SH.y)/SH.h));A.redraw()}
function move(p){const m=now();if(m==='snow'&&S.sn.drag){Object.assign(S.sn.drag,{x:p.x,y:p.y});A.redraw()}if(m==='bal'&&S.ba.drag)barTo(S.ba.drag,p);
 if(m==='carve'&&S.cv.drag){S.cv.drag.dy=Math.max(0,p.y-S.cv.drag.y0);A.redraw()}if(m==='sea'&&S.se.drag){Object.assign(S.se.drag,{x:p.x,y:p.y});A.redraw()}if(m==='core'&&S.co.drag)depthTo(p)}
function up(p){const m=now();
 if(m==='snow'&&S.sn.drag){const d=S.sn.drag;S.sn.drag=null;if(within(p,STK))(d.what==='cloud'?winter:summer)();else{A.redraw();note('Drop it on the stack of snow.',false)}}
 if(m==='bal')S.ba.drag=null;
 if(m==='carve'&&S.cv.drag){const d=S.cv.drag.dy;S.cv.drag=null;if(d>25)carve();else{A.redraw();note('Drag the glacier further down into the valley.',false)}}
 if(m==='sea'&&S.se.drag){const d=S.se.drag;S.se.drag=null;if(within(p,SEA))melt(d.i);else{A.redraw();note('Drop the ice into the sea on the right.',false)}}
 if(m==='core'&&S.co.drag){const f=S.co.drag.f;S.co.drag=null;drill(f)}}
/* ---------- state, words, buttons ---------- */
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{sn:{L:[],bad:false,drag:null},ba:{snow:3,melt:3,len:.6,stone:.15,k:0,bad:false,busy:false,drag:null,drop:false},cv:{k:0,t:0,bad:false,ok:false,drag:null},
 se:{gone:[],lvl:0,bad:false,drag:null},co:{have:[],seq:[],depth:.05,bad:false,drag:null},note:null,check:()=>{}})}
function note(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(G.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();S.note=null;c.say(G.DESC[i]);A.cv.setAttribute('aria-label',G.DESC[i]);S.check=finish(i,ok);buttons();A.redraw()}
function play(i,acts){steps[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!tray)return;tray.innerHTML='';const m=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(m==='snow'){add('Add a winter of snow',winter);add('Warm summer melts the top',summer)}
 if(m==='bal'&&G.GOALS[S.ba.k]){add('Snow −',()=>setBar('snow',S.ba.snow-1),'Less winter snow');add('Snow +',()=>setBar('snow',S.ba.snow+1),'More winter snow');add('Melt −',()=>setBar('melt',S.ba.melt-1),'Less summer melt');add('Melt +',()=>setBar('melt',S.ba.melt+1),'More summer melt');add('Run 10 years',runYears)}
 if(m==='carve'){if(S.cv.k<3)add('Push the glacier down',carve);else if(!S.cv.ok){add('U shape',()=>answer(true));add('V shape',()=>answer(false))}}
 if(m==='sea')G.ICE.forEach((I,i)=>{if(!S.se.gone.includes(i))add(`Melt the ${I.n}`,()=>melt(i))});
 if(m==='core'){const s=S.co;if(s.have.length<3)G.CORE.forEach((C,z)=>{if(!s.have.includes(z))add(`Drill: ${C.n.toLowerCase()}`,()=>drill(C.at))});else if(s.seq.length<3)G.CORE.forEach((C,z)=>{if(!s.seq.includes(z))add(C.n,()=>order(z))})}}
const balPlan=()=>G.SHOW_BAL.flatMap(([a,b])=>[[250,()=>{S.ba.snow=a;S.ba.melt=b;A.redraw()}],[150,runYears],[850,()=>{}]]);
const steps=[
{h:'Snow to ice',p:G.TXT[0],predict:{q:'Where does the ice in a glacier come from?',opts:['A frozen river or lake','Snow pressed down year after year'],ans:1},task:'Turn your first snow into glacier ice',
 show:()=>play(0,[0,1,2,3,4].map(()=>[300,winter])),go:()=>begin(0,()=>S.sn.L.length>0&&G.kindOf(S.sn.L[0])===2)},
{h:'Grow or shrink',p:G.TXT[1],predict:{q:'A glacier is shrinking: its end moves back up the valley. Which way does its ice flow?',opts:['Back up the valley','Still down the valley'],ans:1},task:'Make it grow, shrink, then stay the same',
 show:()=>play(1,balPlan()),go:()=>begin(1,()=>S.ba.k>=3)},
{h:'Carving a valley',p:G.TXT[2],predict:{q:'A river cuts a V-shaped valley. What shape will a glacier leave?',opts:['The same V','A wide U'],ans:1},task:'Carve the valley and name its shape',
 show:()=>play(2,[[300,carve],[300,carve],[300,carve],[600,()=>answer(true)]]),go:()=>begin(2,()=>S.cv.ok)},
{h:'Ice and the sea',p:G.TXT[3],predict:{q:'All the Arctic sea ice floats on the sea. If it melts, sea level…',opts:['Rises a lot','Hardly changes'],ans:1},task:'Melt all 3 kinds of ice',
 show:()=>play(3,[0,1,2].map(i=>[400,()=>melt(i)])),go:()=>begin(3,()=>S.se.gone.length===3)},
{h:'Ice cores',p:G.TXT[4],task:'Take 3 samples, then order them by age',
 show:()=>play(4,[...G.CORE.map(C=>[250,()=>drill(C.at)]),[250,()=>order(2)],[250,()=>order(1)],[250,()=>order(0)]]),go:()=>begin(4,()=>S.co.seq.length===3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Think about where glacier ice comes from and how it moves.';
 if(t==='river')m='A glacier is not frozen water from a river or lake. It is snow, piled up and squeezed into ice over many years.';
 if(t==='back')m='The end moves back because ice melts there faster than it arrives. The ice itself still flows downhill.';
 if(t==='sea')m='Sea ice already floats, so melting it hardly changes sea level. Only ice on land adds new water to the sea.';
 if(t==='vee')m='Rivers cut narrow V shapes. A wide, flat floor with steep sides is the U shape a glacier leaves.';
 if(t==='young')m='Snow piles up on top each year, so the deepest ice was buried first. Deeper ice is older.';
 if(t==='size')m='Greenland would add about 7 m, but Antarctica holds far more ice: about 58 m.';
 if(t==='land')m='Ice on land is not in the sea yet. When it melts, the water runs into the sea and raises it.';
 if(t==='cold')m='Cold is not enough. A glacier needs more snow to fall each winter than melts each summer.';
 return m}
function ask(){qi++;const Q=G.QS[qi%G.QS.length],all=[[Q.a,'ok'],...Q.o],k=qi%3,shown=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');shown.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;buttons()},
 init:X=>{A=X;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Glacier lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
