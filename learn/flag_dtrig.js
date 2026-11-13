/* Flagship – differentiating sin x and cos x (ages 16–18; A level Pure): tangents, gradient graphs, radians, the cycle. */
(()=>{
const PI=Math.PI,TGT=[0,PI/2,PI,3*PI/2,2*PI],TL=['0','π/2','π','3π/2','2π'];
/* d/dx F[i] = F[(i+1)%4] */
const F=[['sin x',Math.sin],['cos x',Math.cos],['−sin x',x=>-Math.sin(x)],['−cos x',x=>-Math.cos(x)]];
/* [unit, h steps, x-range, to-radians] */
const UNIT=[['radians',[1.2,.6,.2,.05,.01],1.3,1],['degrees',[60,30,10,3,1],65,PI/180]];
/* [f, right f′, [[wrong, why]]] */
const DIFF=[['3 sin x − cos x','3 cos x + sin x',[['3 cos x − sin x','d/dx(−cos x) = +sin x: the two minus signs cancel.'],['−3 cos x + sin x','sin → +cos, no minus.']]],
 ['5 cos x','−5 sin x',[['5 sin x','Missing minus: cos → −sin.'],['−sin x','The 5 stays in front.']]],
 ['2 sin x + 4 cos x','2 cos x − 4 sin x',[['2 cos x + 4 sin x','d/dx(4 cos x) = −4 sin x.'],['−2 cos x − 4 sin x','2 sin x → +2 cos x.']]],
 ['sin x + x²','cos x + 2x',[['cos x + x²','x² differentiates too: 2x.'],['−cos x + 2x','−cos x is the integral of sin x.']]],
 ['4 − 6 sin x','−6 cos x',[['4 − 6 cos x','A constant has gradient 0, so the 4 goes.'],['6 cos x','The −6 stays: −6 × cos x.']]]];
/* tap the nth derivative of F[start] on the cycle */
const NTH=[[0,2],[1,3],[0,6],[1,8]];
VIS.reg('flagdtrig',c=>{let A,q,pad,chal,qk=-1,era=0;const V={};
const DK='#0f172a',WH='#ffffff',GR='#64748b',GOOD='#047857',MISS='#be123c',FOCUS='#1d4ed8',PINK='#ffe4e6',CURV='#7c3aed',TAN='#c2410c',DOTC='#0e7490';
const r_=n=>Math.round(n*(A.narrow?.9:1.05)),fo=(n,w)=>`${w||700} ${r_(n)}px system-ui,sans-serif`,hitR=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const PART=['walk','name','rad','diff','cyc','quiz'],at=()=>PART[A.step],SIZE={walk:TGT,name:F,rad:UNIT,diff:DIFF,cyc:[1,2,3,...NTH]},end=k=>V[k].i>=SIZE[k].length;
const red=()=>A.col.dark?'#fda4af':MISS,cu=()=>A.col.dark?'#c4b5fd':CURV,tn=()=>A.col.dark?'#fdba74':TAN,dc=()=>A.col.dark?'#67e8f9':DOTC;
function paper(){q.fillStyle=A.col.dark?'#0b1120':'#f8fafc';q.fillRect(0,0,A.W,A.H)}
function fnt(n,w,al){q.font=fo(n,w);q.textAlign=al||'center';q.textBaseline='middle'}
function txt(t,x,y,w,n){const L=[];let r='';String(t).split(' ').forEach(s=>{const k=r?r+' '+s:s;if(q.measureText(k).width>w&&r){L.push(r);r=s}else r=k});L.push(r);
 const lh=r_(n)*1.25;L.forEach((s,i)=>q.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function card(r,t,o){o=o||{};q.fillStyle=o.bg||WH;A.paint.rrect(r.x,r.y,r.w,r.h,9);q.fill();q.lineWidth=o.ring?3.4:1.3;q.strokeStyle=o.ring||GR;q.stroke();
 if(t!=null){q.fillStyle=o.fg||DK;fnt(o.n||16,o.w||700);txt(t,r.x+r.w/2,r.y+r.h/2,r.w-12,o.n||16)}}
function title(t,won){fnt(14,800);const w=Math.min(A.W-8,q.measureText(t).width+26),h=r_(14)+14,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':WH,ring:won?GOOD:null});q.fillStyle=DK;q.fillText(t,A.W/2,y+h/2+1,w-12)}
function line(t,y,n,col){q.fillStyle=col||A.col.tx;fnt(n||14,650);txt(t,A.W/2,y,A.W-26,n||14)}
function done(t,L){paper();title(t,1);L.forEach((s,i)=>card({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* axes box: x in [0,X], y in [−Y,Y] */
function ax(X,Y,top,bot,lab){const L=r_(30),R=A.W-r_(12),o={X,Y,L,R,top,bot,px:x=>L+x/X*(R-L),py:y=>(top+bot)/2-y/Y*(bot-top)/2,ux:p=>(p-L)/(R-L)*X};
 q.strokeStyle=A.col.dark?'#475569':'#94a3b8';q.lineWidth=1;q.beginPath();q.moveTo(L,o.py(0));q.lineTo(R,o.py(0));q.moveTo(L,top);q.lineTo(L,bot);q.stroke();
 fnt(11,700,'right');q.fillStyle=A.col.tx;q.fillText('1',L-4,o.py(1));q.fillText('−1',L-4,o.py(-1));if(lab){fnt(12,800,'left');q.fillText(lab,L+6,top+r_(6))}return o}
function ticks(o){fnt(11,700);q.fillStyle=A.col.tx;TGT.forEach((x,i)=>{if(x<=o.X+1e-6)q.fillText(TL[i],o.px(x),o.py(0)+r_(12))})}
function plot(o,f,col,a,b,w){q.strokeStyle=col;q.lineWidth=w||2.6;q.beginPath();for(let i=0;i<=240;i++){const x=a+(b-a)*i/240,X=o.px(x),Y=o.py(f(x));i?q.lineTo(X,Y):q.moveTo(X,Y)}q.stroke()}
function dot(x,y,r,col){q.fillStyle=col;q.beginPath();q.arc(x,y,r,0,7);q.fill()}
/* ---- 1: walk along sin x ---- */
function walkAx(){return[ax(2*PI,1.35,A.H*.1,A.H*.46,'y = sin x'),ax(2*PI,1.35,A.H*.52,A.H*.86,'gradient of sin x')]}
function drawWalk(){const s=V.walk;paper();if(end('walk'))return done('Gradient of sin x plotted',['The gradient dots trace out cos x.','So d/dx(sin x) = cos x.']);
 title(`Visit all 5 marks: ${s.seen.length} of 5`);const [G,D]=walkAx();ticks(G);ticks(D);plot(G,Math.sin,cu(),0,2*PI);
 TGT.forEach((x,i)=>{q.strokeStyle=s.seen.includes(i)?GOOD:A.col.tx;q.lineWidth=2.5;q.beginPath();q.arc(G.px(x),G.py(Math.sin(x)),r_(8),0,7);q.stroke()});
 s.seen.forEach(i=>dot(D.px(TGT[i]),D.py(Math.cos(TGT[i])),r_(6),dc()));if(s.seen.length>=4)plot(D,Math.cos,A.alpha(dc(),.45),0,2*PI,2);
 const x0=s.x,m=Math.cos(x0),k=(G.py(1)-G.py(0))/(G.px(1)-G.px(0));q.strokeStyle=tn();q.lineWidth=3;q.beginPath();
 q.moveTo(G.px(x0-.7),G.py(Math.sin(x0))+(-.7)*m*k*(G.px(1)-G.px(0)));q.lineTo(G.px(x0+.7),G.py(Math.sin(x0))+(.7)*m*k*(G.px(1)-G.px(0)));q.stroke();
 dot(G.px(x0),G.py(Math.sin(x0)),r_(9),FOCUS);fnt(13,800);q.fillStyle=tn();q.fillText(`tangent gradient ${m.toFixed(2)}`,A.W/2,A.H*.485);
 line(s.msg||'Drag the blue point along the curve.',A.H*.93,13,s.bad?red():null)}
function walkTo(x){const s=V.walk;if(end('walk'))return;s.x=Math.max(0,Math.min(2*PI,x));const i=TGT.findIndex(t=>Math.abs(t-s.x)<.12);s.bad=0;
 if(i<0||s.seen.includes(i))return A.redraw();s.x=TGT[i];s.seen.push(i);A.sound.pop();const g=Math.round(Math.cos(TGT[i]));
 const why=g===1?'it rises at its steepest':g===-1?'it falls at its steepest':'it is flat (a peak or trough)';
 s.msg=`At x = ${TL[i]}, ${why}: gradient ${g}. And cos ${TL[i]} = ${g}.`;if(s.seen.length===5)s.i=5;speak(s.msg)}
/* ---- 2: name the gradient graph ---- */
function nameR(){const w=(A.W-36)/2,h=r_(46);return F.map((f,j)=>({j,t:f[0],x:12+(j%2)*(w+12),y:A.H*.72+Math.floor(j/2)*(h+8),w,h}))}
function drawName(){const s=V.name;paper();if(end('name'))return done('All 4 gradient graphs named',['sin → cos → −sin → −cos → sin','Each gradient graph is its function shifted π/2 left.']);
 const f=F[s.i];title(`Graph ${s.i+1} of 4: which is the gradient of y = ${f[0]}?`);const G=ax(2*PI,1.35,A.H*.1,A.H*.36,`y = ${f[0]}`),D=ax(2*PI,1.35,A.H*.4,A.H*.66,'its gradient');
 ticks(D);plot(G,f[1],cu(),0,2*PI);for(let k=0;k<=16;k++){const x=k*PI/8,h=1e-4;dot(D.px(x),D.py((f[1](x+h)-f[1](x-h))/2/h),r_(4.5),dc())}
 nameR().forEach(r=>card(r,r.t,{n:17,bg:s.bad===r.j?PINK:WH,ring:s.bad===r.j?MISS:null}));if(s.msg)line(s.msg,A.H*.69-r_(2),12,red())}
function name(j){const s=V.name;if(end('name'))return;const i=s.i,ok=(i+1)%4;let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: d/dx(${F[i][0]}) = ${F[ok][0]}.`)}
 s.bad=j;A.sound.miss();const g0=Math.sign(F[ok][1](.3)),z0=Math.round(F[ok][1](0)),p0=Math.round(F[j][1](0));
 if(j===(ok+2)%4)m=`Sign slip. Just after x = 0, ${F[i][0]} is ${g0>0?'rising':g0<0?'falling':'flat'}, so its gradient there is ${g0>0?'positive':g0<0?'negative':'0'}.`;
 else if(j===i)m=`That is ${F[i][0]} itself. Where it peaks the gradient is 0, so the gradient graph must cross zero there.`;
 else m=`Check x = 0: the gradient dot is at ${z0}, but ${F[j][0]} is ${p0} there.`;s.msg=m;speak(m)}
/* ---- 3: why radians ---- */
function radAx(){const [u,,X]=UNIT[V.rad.i];return{X,L:r_(36),R:A.W-r_(14),top:A.H*.12,bot:A.H*.58,px(x){return this.L+x/X*(this.R-this.L)},py(y){return this.bot-(y+.1)/1.15*(this.bot-this.top)},ux(p){return(p-this.L)/(this.R-this.L)*X}}}
function drawRad(){const s=V.rad;paper();if(end('rad'))return done('Radians make the limit 1',['sin h / h → 1 when h is in radians.','In degrees it tends to π/180 ≈ 0.0175.','So d/dx(sin x) = cos x needs radians.']);
 const [u,,X,k]=UNIT[s.i],o=radAx(),h=s.h;title(`Round ${s.i+1} of 2: x in ${u}. Shrink h`);
 q.strokeStyle=A.col.dark?'#475569':'#94a3b8';q.lineWidth=1;q.beginPath();q.moveTo(o.L,o.py(0));q.lineTo(o.R,o.py(0));q.moveTo(o.L,o.top);q.lineTo(o.L,o.bot);q.stroke();
 q.setLineDash([6,5]);q.strokeStyle=GR;q.lineWidth=2;q.beginPath();q.moveTo(o.px(0),o.py(0));const xe=Math.min(X,1.05);q.lineTo(o.px(xe),o.py(xe));q.stroke();q.setLineDash([]);
 fnt(12,700,'left');q.fillStyle=A.col.tx;q.fillText('y = x (gradient 1)',s.i?o.px(xe)+6:o.px(.12),s.i?o.py(.95):o.py(.8));
 q.strokeStyle=cu();q.lineWidth=2.6;q.beginPath();for(let j=0;j<=200;j++){const x=X*j/200;j?q.lineTo(o.px(x),o.py(Math.sin(x*k))):q.moveTo(o.px(x),o.py(Math.sin(x*k)))}q.stroke();
 q.strokeStyle=tn();q.lineWidth=3;q.beginPath();q.moveTo(o.px(0),o.py(0));q.lineTo(o.px(h),o.py(Math.sin(h*k)));q.stroke();dot(o.px(h),o.py(Math.sin(h*k)),r_(9),FOCUS);
 const ratio=Math.sin(h*k)/h;fnt(15,800);q.fillStyle=A.col.tx;q.fillText(`h = ${h} ${u==='degrees'?'°':'rad'}   sin h / h = ${ratio.toFixed(4)}`,A.W/2,A.H*.66);
 if(s.i)line(`π/180 = ${(PI/180).toFixed(4)}`,A.H*.72,13);line(s.msg||'Drag the blue point towards the origin.',A.H*.8,13,s.bad?red():null)}
function radTo(h){const s=V.rad;if(end('rad'))return;const [u,H,X,k]=UNIT[s.i];s.h=Math.max(H[H.length-1],Math.min(X,+h.toPrecision(2)));
 if(s.h<=H[H.length-2]+1e-9){const lim=s.i?'π/180 ≈ 0.0175, so in degrees d/dx(sin x) = (π/180) cos x':'1, so the gradient of sin at 0 is exactly 1 = cos 0';s.i++;
  A.sound.pop();s.h=s.i<2?UNIT[s.i][1][0]:s.h;return speak(`As h shrinks, sin h / h tends to ${lim}.`)}A.redraw()}
/* ---- 4: differentiate ---- */
function difR(){const [,a,W]=DIFF[V.diff.i],all=[a,...W.map(w=>w[0])],r=V.diff.i%3,ord=all.slice(r).concat(all.slice(0,r)),h=r_(50);return ord.map((t,j)=>({t,x:20,w:A.W-40,h,y:A.H*.46+j*(h+r_(8))}))}
function drawDiff(){const s=V.diff;paper();if(end('diff'))return done('All 5 differentiated',['d/dx(sin x) = cos x','d/dx(cos x) = −sin x','Constants in front stay; lone constants go.']);
 title(`${s.i+1} of 5: tap f′(x)`);card({x:12,y:A.H*.12,w:A.W-24,h:A.H*.14},`f(x) = ${DIFF[s.i][0]}`,{n:22,bg:'#ede9fe',fg:'#2e1065'});
 line('d/dx sin x = cos x      d/dx cos x = −sin x',A.H*.33,13);difR().forEach(r=>card(r,r.t,{n:19,bg:s.bad===r.t?PINK:WH,ring:s.bad===r.t?MISS:null}));if(s.msg)line(s.msg,A.H*.4,12,red())}
function diff(t){const s=V.diff;if(end('diff'))return;const [f,a,W]=DIFF[s.i];
 if(t===a){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: f′(x) = ${a}.`)}s.bad=t;A.sound.miss();s.msg=(W.find(w=>w[0]===t)||[0,''])[1];speak(s.msg)}
/* ---- 5: the 4-cycle ---- */
function slotR(){const w=Math.min(r_(150),(A.W-60)/2),h=r_(56),cx=A.W/2,cy=A.H*.36,dx=w/2+r_(22),dy=h/2+r_(36);return[[cx-dx,cy-dy],[cx+dx,cy-dy],[cx+dx,cy+dy],[cx-dx,cy+dy]].map(([x,y],j)=>({j,x:x-w/2,y:y-h/2,w,h}))}
function poolR(){const w=Math.min(r_(110),(A.W-48)/4),h=r_(50),L=['−sin x','sin x','−cos x','cos x'];return L.map((t,j)=>{const r={t,x:A.W/2-(4*w+36)/2+j*(w+12),y:A.H*.78,w,h};return V.hold&&V.hold.t===t?{...r,x:V.hold.x-w/2,y:V.hold.y-h/2}:r})}
function drawCyc(){const s=V.cyc;paper();if(end('cyc'))return done('The cycle repeats every 4',['sin → cos → −sin → −cos → sin','nth derivative: use n ÷ 4’s remainder.']);
 const S=slotR(),fill=s.i>=3;title(fill?`Tap the ${['','','2nd','3rd'][NTH[s.i-3][1]]||NTH[s.i-3][1]+'th'} derivative of ${F[NTH[s.i-3][0]][0]}`:`Drag the derivative into box ${s.i+2}`);
 q.strokeStyle=A.col.tx;q.lineWidth=2;S.forEach((r,j)=>{const n=S[(j+1)%4],a=[r.x+r.w/2,r.y+r.h/2],b=[n.x+n.w/2,n.y+n.h/2];q.beginPath();q.moveTo(a[0]+(b[0]-a[0])*.32,a[1]+(b[1]-a[1])*.32);const e=[a[0]+(b[0]-a[0])*.68,a[1]+(b[1]-a[1])*.68],u=Math.atan2(b[1]-a[1],b[0]-a[0]);q.lineTo(...e);q.lineTo(e[0]-9*Math.cos(u-.5),e[1]-9*Math.sin(u-.5));q.moveTo(...e);q.lineTo(e[0]-9*Math.cos(u+.5),e[1]-9*Math.sin(u+.5));q.stroke();
  fnt(11,800);q.fillStyle=A.col.tx;q.fillText('d/dx',(a[0]+b[0])/2,(a[1]+b[1])/2-(j%2?0:10))});
 S.forEach((r,j)=>{const have=j<=Math.min(s.i,3);card(r,have?F[j][0]:'?',{n:19,bg:s.bad===j+10?PINK:have?'#ecfdf5':'#fef9c3',ring:s.bad===j+10?MISS:!have&&j===s.i+1?FOCUS:null})});
 if(!fill)poolR().forEach(r=>card(r,r.t,{n:17,bg:s.bad===r.t?PINK:'#ede9fe',fg:'#2e1065',ring:V.hold&&V.hold.t===r.t?FOCUS:s.bad===r.t?MISS:null}));if(s.msg)line(s.msg,A.H*.68,12,red())}
function cyc(t){const s=V.cyc;if(end('cyc')||s.i>=3)return;const want=F[s.i+1][0],from=F[s.i][0];let m;
 if(t===want){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`d/dx(${from}) = ${want}.`)}s.bad=t;A.sound.miss();
 if(t.replace('−','')===want.replace('−',''))m=`Sign slip: d/dx(${from}) = ${want}. The minus comes from differentiating cos.`;
 else if(t===from)m=`${from} is where you start. Its derivative is the next one round.`;else m=`Differentiating swaps sin and cos: d/dx(${from}) is a ${want.includes('sin')?'sin':'cos'}.`;s.msg=m;speak(m)}
function nth(j){const s=V.cyc;if(end('cyc')||s.i<3)return;const [st,n]=NTH[s.i-3],ok=(st+n)%4;let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: ${n} steps round from ${F[st][0]} lands on ${F[ok][0]} (${n} ÷ 4 leaves ${n%4}).`)}
 s.bad=j+10;A.sound.miss();m=`Count ${n} steps round from ${F[st][0]}: ${n} ÷ 4 leaves ${n%4}, so move ${n%4} box${n%4===1?'':'es'}.`;s.msg=m;speak(m)}
/* ---- pointer ---- */
function down(p){const k=at();
 if(k==='walk'&&!end('walk')&&p.y<A.H*.5){walkTo(walkAx()[0].ux(p.x));return true}
 if(k==='rad'&&!end('rad')&&p.y<A.H*.62){radTo(Math.max(.001,radAx().ux(p.x)));return true}
 if(k==='name'&&!end('name')){const r=nameR().find(r=>hitR(p,r));if(r)name(r.j)}
 if(k==='diff'&&!end('diff')){const r=difR().find(r=>hitR(p,r));if(r)diff(r.t)}
 if(k==='cyc'&&!end('cyc')){if(V.cyc.i>=3){const r=slotR().find(r=>hitR(p,r));if(r)nth(r.j)}else{const r=poolR().find(r=>hitR(p,r));if(r){V.hold={t:r.t,x:p.x,y:p.y};A.redraw();return true}}}return false}
function move(p){const k=at();if(k==='walk'&&!end('walk'))return walkTo(walkAx()[0].ux(p.x));if(k==='rad'&&!end('rad'))return radTo(Math.max(.001,radAx().ux(p.x)));if(V.hold){V.hold.x=p.x;V.hold.y=p.y;A.redraw()}}
function up(p){const h=V.hold;if(!h)return;V.hold=null;const S=slotR()[V.cyc.i+1];if(S&&hitR(p,S,r_(24)))return cyc(h.t);A.redraw()}
function fresh(){era++;for(const k in V)delete V[k];Object.assign(V,{walk:{i:0,x:PI/4,seen:[]},name:{i:0},rad:{i:0,h:UNIT[0][1][0]},diff:{i:0},cyc:{i:0},hold:null,test:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();V.test()}
function into(i,first,ok,msg){fresh();speak(first);V.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=era;acts.forEach((f,j)=>setTimeout(()=>{if(me===era)f()},ms*(j+1)))}
function btns(){if(!pad)return;pad.innerHTML='';const k=at(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='walk'&&!end('walk'))TGT.forEach((x,i)=>{if(!V.walk.seen.includes(i))b(`x = ${TL[i]}`,()=>walkTo(x),`Move the point to x = ${TL[i]}`)});
 if(k==='name'&&!end('name'))F.forEach((f,j)=>b(f[0],()=>name(j),`The gradient graph is ${f[0]}`));
 if(k==='rad'&&!end('rad'))UNIT[V.rad.i][1].slice(1).forEach(h=>b(`h = ${h}`,()=>radTo(h),`Set h to ${h} ${UNIT[V.rad.i][0]}`));
 if(k==='diff'&&!end('diff'))difR().forEach(r=>b(r.t,()=>diff(r.t),`f′(x) = ${r.t}`));
 if(k==='cyc'&&!end('cyc')){if(V.cyc.i<3)poolR().forEach(r=>b(r.t,()=>cyc(r.t),`Next derivative: ${r.t}`));else F.forEach((f,j)=>b(f[0],()=>nth(j)))}}
const steps=[
{h:'The gradient of sin x',p:'Slide a tangent along y = sin x. The dots below plot its gradient at each mark.',
predict:{q:'What is the gradient of y = sin x at x = 0?',opts:['0, because sin 0 = 0','1: it is rising at its steepest'],ans:1},task:'Visit all 5 marks',
show:()=>auto(0,TGT.map(x=>()=>walkTo(x)),600),go:()=>into(0,'Drag the blue point along y = sin x.',()=>V.walk.seen.length===5,'The gradient of sin x is cos x.')},
{h:'Name the gradient graph',p:'Each dot shows the gradient of the top curve. Which function do the dots trace out?',
predict:{q:'What is d/dx(cos x)?',opts:['sin x','−sin x'],ans:1},task:'Name all 4',
show:()=>auto(1,F.map((_,i)=>()=>name((i+1)%4)),600),go:()=>into(1,'Tap the function the gradient dots follow.',()=>end('name'),'sin → cos → −sin → −cos.')},
{h:'Why radians?',p:'The gradient of sin at 0 is the limit of sin h / h. Shrink h, then try degrees.',
predict:{q:'If x is in degrees, is d/dx(sin x) still cos x?',opts:['yes, the same','no: an extra π/180 appears'],ans:1},task:'Shrink h in both units',
show:()=>auto(2,[0,1].flatMap(u=>UNIT[u][1].slice(1).map(h=>()=>radTo(h))),400),go:()=>into(2,'Drag the blue point towards the origin.',()=>end('rad'),'Radians make the limit exactly 1.')},
{h:'Differentiate',p:'Go term by term. Numbers in front stay; a lone constant goes.',task:'Differentiate all 5',
show:()=>auto(3,DIFF.map(d=>()=>diff(d[1])),600),go:()=>into(3,'Tap the right derivative.',()=>end('diff'),'Term by term, signs checked.')},
{h:'The 4-cycle',p:'Keep differentiating: sin, cos, −sin, −cos, then sin again.',task:'Fill the cycle and use it',
show:()=>auto(4,[...[1,2,3].map(j=>()=>cyc(F[j][0])),...NTH.map(([s,n])=>()=>nth((s+n)%4))],500),go:()=>into(4,'Drag the derivative of sin x into box 2.',()=>end('cyc'),'Every 4 derivatives, back to the start.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.test()});
const QS=[
{q:'Differentiate 3 sin x − cos x.',a:'3 cos x + sin x',o:[['3 cos x − sin x','d/dx(−cos x) = +sin x.'],['−3 cos x − sin x','d/dx(sin x) is +cos x.']]},
{q:'What is the gradient of y = sin x at x = π?',a:'−1',o:[['0','sin π = 0 is the height.'],['1','At π the curve is falling: cos π = −1.']]},
{q:'Why must x be in radians for d/dx(sin x) = cos x?',a:'Only then does sin h / h → 1',o:[['Degrees are banned in calculus','Allowed, but they add π/180.'],['cos only works in radians','The limit sin h / h needs radians.']]},
{q:'Find the 3rd derivative of sin x.',a:'−cos x',o:[['cos x','That is the 1st derivative.'],['−sin x','That is the 2nd. One more step: −cos x.']]},
{q:'y = 2 cos x. Find dy/dx at x = π/2.',a:'−2',o:[['0','cos(π/2) = 0 is the height; the gradient is −2 sin(π/2).'],['2','Missing minus: cos → −sin.']]},
{q:'Where does y = cos x have gradient 0 (0 ≤ x < 2π)?',a:'x = 0 and x = π',o:[['x = π/2 and 3π/2','Those are where cos x = 0, not its gradient.'],['Nowhere','−sin x = 0 at 0 and π.']]}];
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,''],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>check(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why)}
function draw(){const k=at();if(k==='quiz'){paper();title('Challenge',1);const G=ax(2*PI,1.35,A.H*.14,A.H*.6,'sin x (purple), cos x (blue)');ticks(G);plot(G,Math.sin,cu(),0,2*PI);plot(G,Math.cos,dc(),0,2*PI);line('d/dx sin x = cos x · d/dx cos x = −sin x',A.H*.72,15);return}
 ({walk:drawWalk,name:drawName,rad:drawRad,diff:drawDiff,cyc:drawCyc})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.7,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;q=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Calculus buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
