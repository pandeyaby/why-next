/* Flagship – reciprocal hyperbolic functions (17–18): sech from cosh, reciprocal vs inverse, graphs, ranges,
   identities, exact values from cosh x = 5/4. */
(()=>{const ex=Math.exp,ch=x=>(ex(x)+ex(-x))/2,sh=x=>(ex(x)-ex(-x))/2,th=x=>sh(x)/ch(x);
const F={sech:x=>1/ch(x),cosech:x=>1/sh(x),coth:x=>1/th(x)},NAMES=['sech','cosech','coth'];
const fix2=v=>v.toFixed(2).replace('-','−');
/* plot sech at these x values */
const XS=[0,1,-1.5,2.2];
/* [card, 0 reciprocal / 1 inverse] */
const NOTE=[['sech x',0],['cosh⁻¹ x',1],['(cosh x)⁻¹',0],['arcosh x',1],['1 / cosh x',0],['the x that makes cosh x = 3',1]];

const LOOK={sech:'Through (0, 1), never below 0: that is sech x.',
 cosech:'Breaks at x = 0 and tends to 0 at both ends: that is cosech x.',
 coth:'Breaks at x = 0 and levels off at y = ±1: that is coth x.'};
const FIND=['coth','sech','cosech','sech','coth'];
/* [value, possible?, why] */
const CAN=[['sech x = 0.4',1,'0 < sech x ≤ 1 and 0.4 is in it.'],['sech x = 1.2',0,'cosh x ≥ 1, so sech x ≤ 1.'],
 ['coth x = 0.5',0,'|tanh x| < 1, so |coth x| > 1.'],['coth x = −3',1,'|coth x| > 1 is fine: x < 0.'],
 ['cosech x = 0',0,'1/sinh x is never 0; it only tends to 0.'],['cosech x = −0.2',1,'sinh x = −5 has a solution.'],['sech x = 1',1,'sech 0 = 1 / cosh 0 = 1, the maximum.']];
/* [text before gap, tile, term before simplifying] */
const SLOT=[['÷ cosh²x:  ','1','cosh²x / cosh²x'],[' − ','tanh²x','sinh²x / cosh²x'],[' = ','sech²x','1 / cosh²x'],
 ['÷ sinh²x:  ','coth²x','cosh²x / sinh²x'],[' − ','1','sinh²x / sinh²x'],[' = ','cosech²x','1 / sinh²x']];
const PIECES=['1','tanh²x','sech²x','coth²x','cosech²x'],MEAN={'1':'1','tanh²x':'sinh²x / cosh²x','sech²x':'1 / cosh²x','coth²x':'cosh²x / sinh²x','cosech²x':'1 / sinh²x'};
/* cosh x = 5/4, x > 0: [asked, choices, right, slips] */
const EXACT=[['sech x',['4/5','5/4','−4/5'],0,{'5/4':'5/4 is cosh x itself. sech x is its reciprocal: 4/5.','−4/5':'cosh x is positive, so sech x is positive.'}],
 ['sinh x',['9/16','3/4','−3/4'],1,{'9/16':'9/16 is sinh²x. Take the root.','−3/4':'x > 0, so sinh x > 0.'}],
 ['tanh x',['4/3','3/5','3/4'],1,{'4/3':'4/3 is cosech x. tanh = sinh / cosh.','3/4':'3/4 is sinh x. Divide by cosh x.'}],
 ['coth x',['3/5','5/3','5/4'],1,{'3/5':'3/5 is tanh x. coth x is its reciprocal: 5/3.','5/4':'5/4 is cosh x. coth = cosh / sinh.'}],
 ['cosech x',['3/4','4/3','4/5'],1,{'3/4':'3/4 is sinh x. Flip it: cosech x = 4/3.','4/5':'4/5 is sech x, 1 / cosh x.'}]];
VIS.reg('flagrecip',c=>{let A,g,bar,box,qn=-1,run=0;const T={};
const INK='#0f172a',OKC='#047857',BADC='#be123c',WHITE='#ffffff',RULE='#64748b',COSH='#94a3b8',SECH='#2563eb',CSCH='#db2777',COTH='#7c3aed',SEL='#1d4ed8';
const CURVE={sech:SECH,cosech:CSCH,coth:COTH};
const k=n=>Math.round(n*(A.narrow?.94:1.06)),fnt=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
const part=()=>['plot','note','look','can','build','exact','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const LEN={plot:XS,note:NOTE,look:FIND,can:CAN,build:SLOT,exact:EXACT},over=s=>T[s].n>=LEN[s].length,red=()=>A.col.dark?'#fda4af':BADC;
function bg(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tf(n,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function pill(r,t,o){o=o||{};g.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ring?3.5:1.4;g.strokeStyle=o.ring||RULE;g.stroke();
 if(t!=null){g.fillStyle=o.ink||INK;tf(o.n||17,o.w||750);wrapT(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function wrapT(t,x,y,w,n){const L=[];let cur='';t.split(' ').forEach(q=>{const s=cur?cur+' '+q:q;if(g.measureText(s).width>w&&cur){L.push(cur);cur=q}else cur=s});L.push(cur);
 const lh=k(n)*1.25;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function cap(t,won){tf(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=k(14)+14,y=A.H*.02;pill({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':WHITE,ring:won?OKC:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function txt(t,y,n,col){g.fillStyle=col||A.col.tx;tf(n||15,650);wrapT(t,A.W/2,y,A.W-26,n||15)}
function closing(t,L){bg();cap(t,1);L.forEach((s,i)=>pill({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* axes, and a curve in rect r that breaks at asymptotes */
function axes(r,x0,x1,y0,y1){const X=x=>r.x+(x-x0)/(x1-x0)*r.w,Y=y=>r.y+r.h-(y-y0)/(y1-y0)*r.h;g.strokeStyle=A.col.dark?'#475569':'#94a3b8';g.lineWidth=1.2;
 g.beginPath();g.moveTo(r.x,Y(0));g.lineTo(r.x+r.w,Y(0));g.moveTo(X(0),r.y);g.lineTo(X(0),r.y+r.h);g.stroke();return {X,Y}}
function curve(f,r,x0,x1,y0,y1,col,lw){const X=x=>r.x+(x-x0)/(x1-x0)*r.w,Y=y=>r.y+r.h-(y-y0)/(y1-y0)*r.h;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
 g.strokeStyle=col;g.lineWidth=lw||3;g.beginPath();let pen=false,prev=null;for(let i=0;i<=300;i++){const x=x0+(x1-x0)*i/300,y=f(x);
  if(!isFinite(y)||Math.abs(y)>y1*4||(prev!=null&&Math.sign(y)!==Math.sign(prev)&&Math.abs(y-prev)>1)){pen=false;prev=isFinite(y)?y:null;continue}
  pen?g.lineTo(X(x),Y(y)):g.moveTo(X(x),Y(y));pen=true;prev=y}g.stroke();g.restore()}
/* step 1: flip cosh to plot sech */
const PR=()=>({x:16,y:A.H*.2,w:A.W-32,h:A.H*.58}),PX=[-3,3],PY=[-.4,3.6];
function grid(){const r=PR(),a=axes(r,PX[0],PX[1],PY[0],PY[1]);g.fillStyle=A.col.tx;tf(12,700,'right');[1,2,3].forEach(v=>{g.fillText(String(v),a.X(0)-5,a.Y(v));g.fillRect(a.X(0)-3,a.Y(v),6,1.5)});return {r,...a}}
function drawPlot(){const s=T.plot;bg();if(over('plot'))return closing('sech x plotted',['sech 0 = 1: the top.','Big cosh x, so sech x → 0.','0 < sech x ≤ 1']);
 const x=XS[s.n],{r,X,Y}=grid();cap(`Point ${s.n+1} of 4: drag the dot to sech x = 1 / cosh x`);curve(ch,r,PX[0],PX[1],PY[0],PY[1],COSH,2.5);
 g.fillStyle=A.col.tx;tf(13,700,'left');g.fillText('y = cosh x',X(1.25),Y(ch(1.25))-6);
 if(s.done.length>1){const ok=s.done.slice().sort((a,b)=>a-b);curve(F.sech,{...r,x:X(ok[0]),w:X(ok[ok.length-1])-X(ok[0])},ok[0],ok[ok.length-1],PY[0],PY[1],SECH,3)}
 s.done.forEach(v=>{g.fillStyle=SECH;g.beginPath();g.arc(X(v),Y(F.sech(v)),6,0,7);g.fill()});
 g.strokeStyle=A.col.dark?'#64748b':'#cbd5e1';g.setLineDash([3,4]);g.beginPath();g.moveTo(X(x),r.y);g.lineTo(X(x),r.y+r.h);g.stroke();g.setLineDash([]);
 g.fillStyle=COSH;g.beginPath();g.arc(X(x),Y(ch(x)),5,0,7);g.fill();txt(`x = ${fix2(x)}:  cosh x = ${fix2(ch(x))}`,A.H*.14,14);
 const y=s.y==null?2.8:s.y;g.fillStyle=s.bad?BADC:SEL;g.beginPath();g.arc(X(x),Y(y),k(13),0,7);g.fill();g.fillStyle=WHITE;tf(11,800);g.fillText(fix2(y),X(x),Y(y));
 if(s.msg)txt(s.msg,A.H*.88,14,red())}
function plot(y){const s=T.plot;if(over('plot'))return;const x=XS[s.n],want=F.sech(x);let m;s.y=y;
 if(Math.abs(y-want)<=.07){s.done.push(x);s.n++;s.y=null;s.bad=0;s.msg='';A.sound.pop();return say(`Yes: sech ${fix2(x)} = 1 / ${fix2(ch(x))} = ${fix2(want)}.`)}
 s.bad=1;A.sound.miss();
 if(Math.abs(y-ch(x))<=.1&&x!==0)m=`That is cosh x itself. sech x is 1 ÷ ${fix2(ch(x))}.`;
 else if(y>1.02)m=`sech x is never above 1: cosh x ≥ 1, so 1 / cosh x ≤ 1.`;
 else if(y<0)m=`cosh x > 0, so 1 / cosh x > 0 too.`;
 else m=`${y>want?'Too high':'Too low'}: you placed ${fix2(y)}, but 1 ÷ ${fix2(ch(x))} = ${fix2(want)}.`;s.msg=m;say(m)}
/* step 2: reciprocal or inverse */
function nBins(){const w=(A.W-36)/2,h=A.H*.26;return [0,1].map(j=>({j,x:12+j*(w+12),y:A.H*.6,w,h}))}
function drawNote(){const s=T.note;bg();if(over('note'))return closing('All 6 sorted',['sech x = (cosh x)⁻¹ = 1 / cosh x','cosh⁻¹ x = arcosh x, the inverse']);
 cap(`Card ${s.n+1} of 6: reciprocal or inverse?`);pill({x:A.W*.15,y:A.H*.2,w:A.W*.7,h:A.H*.22},NOTE[s.n][0],{n:24,w:800,ring:s.bad!=null?BADC:SEL});
 nBins().forEach(r=>pill(r,r.j?'inverse function: arcosh x':'reciprocal: 1 / cosh x',{n:16,bg:s.bad===r.j?'#ffe4e6':WHITE,ring:s.bad===r.j?BADC:null}));if(s.msg)txt(s.msg,A.H*.5,14,red())}
function note(j){const s=T.note;if(over('note'))return;const [t,want]=NOTE[s.n];let m;
 if(j===want){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(want?`${t} is the inverse function: it undoes cosh.`:`${t} means 1 / cosh x, which is sech x.`)}
 s.bad=j;A.sound.miss();m=t==='cosh⁻¹ x'?'On a function name, ⁻¹ means inverse: cosh⁻¹ x = arcosh x. The reciprocal is called sech x.':
 t==='(cosh x)⁻¹'?'The bracket puts the power on the value: (cosh x)⁻¹ = 1 / cosh x.':want?`${t} undoes cosh: it finds x from a cosh value.`:`${t} is 1 over cosh x: a reciprocal.`;s.msg=m;say(m)}
/* step 3: match the graph */
function gCards(){const n=3,gp=8,w=(A.W-24-gp*(n-1))/n,h=A.H*.5,rot=T.look.n%3;return [0,1,2].map(i=>({f:NAMES[(i+rot)%3],x:12+i*(w+gp),y:A.H*.2,w,h}))}
function drawLook(){const s=T.look;bg();if(over('look'))return closing('All 5 graphs matched',['sech: through (0, 1)','cosech: x = 0, tends to 0','coth: x = 0, y = ±1']);
 cap(`Graph ${s.n+1} of 5: tap y = ${FIND[s.n]} x`);
 gCards().forEach(r=>{pill(r,null,{bg:WHITE,ring:s.bad===r.f?BADC:null});const q={x:r.x+6,y:r.y+8,w:r.w-12,h:r.h-16};g.save();g.strokeStyle='#cbd5e1';g.lineWidth=1;
  const X=x=>q.x+(x+3)/6*q.w,Y=y=>q.y+q.h-(y+3)/6*q.h;g.beginPath();g.moveTo(q.x,Y(0));g.lineTo(q.x+q.w,Y(0));g.moveTo(X(0),q.y);g.lineTo(X(0),q.y+q.h);g.stroke();
  [1,-1].forEach(v=>{g.setLineDash([4,3]);g.strokeStyle='#64748b';g.beginPath();g.moveTo(q.x,Y(v));g.lineTo(q.x+q.w,Y(v));g.stroke();g.setLineDash([])});g.restore();
  curve(F[r.f],q,-3,3,-3,3,CURVE[r.f],2.6)});if(s.msg)txt(s.msg,A.H*.87,14,red());txt('Dashed lines: y = 1 and y = −1',A.H*.75,12)}
function look(f){const s=T.look;if(over('look'))return;const want=FIND[s.n];let m;
 if(f===want){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(LOOK[want])}
 s.bad=f;A.sound.miss();m=LOOK[f]+` Look again for ${want} x.`;s.msg=m;say(m)}
/* step 4: possible values */
function cBtns(){const w=Math.min(k(150),(A.W-36)/2),h=k(58);return [1,0].map((v,j)=>({v,x:A.W/2+(j?6:-w-6),y:A.H*.62,w,h}))}
function drawCan(){const s=T.can;bg();if(over('can'))return closing('All 7 checked',['0 < sech x ≤ 1','cosech x ≠ 0','|coth x| > 1']);
 cap(`Value ${s.n+1} of 7: can this happen?`);pill({x:A.W*.12,y:A.H*.22,w:A.W*.76,h:A.H*.2},CAN[s.n][0],{n:26,w:800});
 cBtns().forEach(r=>pill(r,r.v?'possible':'impossible',{n:18,bg:s.bad===r.v?'#ffe4e6':WHITE,ring:s.bad===r.v?BADC:null}));if(s.msg)txt(s.msg,A.H*.52,14,red())}
function can(v){const s=T.can;if(over('can'))return;const [t,ok,why]=CAN[s.n];let m;
 if(v===ok){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`${t}: ${ok?'possible':'impossible'}. ${why}`)}
 s.bad=v;A.sound.miss();m=`Not quite. ${why}`;s.msg=m;say(m)}
/* step 5: build the identities */
function pTiles(){const per=A.narrow?3:5,gp=8,w=(A.W-24-gp*(per-1))/per,h=k(46);return PIECES.map((t,i)=>{const row=Math.floor(i/per),inRow=Math.min(per,PIECES.length-row*per),x0=A.W/2-(inRow*w+(inRow-1)*gp)/2;return {t,x:x0+(i%per)*(w+gp),y:A.H*(A.narrow?.68:.74)+row*(h+gp),w,h}})}
function drawBuild(){const s=T.build;bg();if(over('build'))return closing('Both identities built',['cosh²x − sinh²x = 1','÷ cosh²x:  1 − tanh²x = sech²x','÷ sinh²x:  coth²x − 1 = cosech²x']);
 cap(`Gap ${s.n+1} of 6: tap the tile that fills it`);txt('Start: cosh²x − sinh²x = 1',A.H*.15,16);
 [0,3].forEach((st,row)=>{const y=A.H*(.27+row*.12);let L='';for(let i=st;i<st+3;i++){const [pre,want]=SLOT[i];L+=pre+(i<s.n?want:i===s.n?'[ ? ]':'[   ]')}txt(L,y,17,row*3<=s.n?A.col.tx:A.col.mu)});
 if(s.n<SLOT.length)txt(`The gap is ${SLOT[s.n][2]}`,A.H*.47,15);pTiles().forEach(r=>pill(r,r.t,{n:15,w:800,bg:'#ede9fe',ink:'#3730a3',ring:s.bad===r.t?BADC:null}));if(s.msg)txt(s.msg,A.H*.58,14,red())}
function build(t){const s=T.build;if(over('build'))return;const [,want,frac]=SLOT[s.n];let m;
 if(t===want){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`${frac} = ${want}.`+(s.n===3?' 1 − tanh²x = sech²x.':s.n===6?' coth²x − 1 = cosech²x.':''))}
 s.bad=t;A.sound.miss();m=`${t} is ${MEAN[t]}, but this gap is ${frac}.`+(t==='coth²x'&&want==='tanh²x'?' tanh is sinh over cosh; coth is the other way up.':'');s.msg=m;say(m)}
/* step 6: exact values */
function eOpts(){const [,ch3]=EXACT[T.exact.n],gp=8,w=(A.W-24-gp*2)/3,h=k(60);return ch3.map((t,i)=>({t,i,x:12+i*(w+gp),y:A.H*.6,w,h}))}
function drawExact(){const s=T.exact;bg();if(over('exact'))return closing('All 5 values found',['sinh x = 3/4, tanh x = 3/5','sech 4/5, cosech 4/3, coth 5/3']);
 cap(`Value ${s.n+1} of 5: cosh x = 5/4 and x > 0`);const got=EXACT.slice(0,s.n).map(q=>`${q[0]} = ${q[1][q[2]]}`).join('   ');
 txt(got||'Use cosh²x − sinh²x = 1.',A.H*.2,14);txt(`${EXACT[s.n][0]} = ?`,A.H*.38,26);
 eOpts().forEach(r=>pill(r,r.t,{n:22,w:800,bg:s.bad===r.i?'#ffe4e6':WHITE,ring:s.bad===r.i?BADC:null}));if(s.msg)txt(s.msg,A.H*.86,14,red())}
function exact(i){const s=T.exact;if(over('exact'))return;const [f,ch3,ok,slip]=EXACT[s.n];let m;
 if(i===ok){s.n++;s.bad=null;s.msg='';A.sound.pop();return say(`${f} = ${ch3[ok]}.`)}
 s.bad=i;A.sound.miss();m=slip[ch3[i]]||'Check which is the reciprocal.';s.msg=m;say(m)}
/* input: drag the plot dot, tap elsewhere */
function down(p){const m=part();
 if(m==='plot'&&!over('plot')){const {X,Y}=grid(),x=XS[T.plot.n],y=T.plot.y==null?2.8:T.plot.y;if(Math.hypot(p.x-X(x),p.y-Y(y))<k(30)){T.drag=1;return true}}
 if(m==='note'&&!over('note')){const r=nBins().find(r=>on(p,r));if(r)note(r.j)}
 if(m==='look'&&!over('look')){const r=gCards().find(r=>on(p,r));if(r)look(r.f)}
 if(m==='can'&&!over('can')){const r=cBtns().find(r=>on(p,r));if(r)can(r.v)}
 if(m==='build'&&!over('build')){const r=pTiles().find(r=>on(p,r));if(r)build(r.t)}
 if(m==='exact'&&!over('exact')){const r=eOpts().find(r=>on(p,r));if(r)exact(r.i)}return false}
function move(p){if(!T.drag)return;const r=PR(),y=PY[0]+(r.y+r.h-p.y)/r.h*(PY[1]-PY[0]);T.plot.y=Math.max(PY[0],Math.min(PY[1],Math.round(y*100)/100));T.plot.bad=0;A.redraw()}
function up(){if(!T.drag)return;T.drag=0;plot(T.plot.y==null?2.8:T.plot.y)}
function reset(){run++;for(const s in T)delete T[s];Object.assign(T,{plot:{n:0,done:[],y:null},note:{n:0},look:{n:0},can:{n:0},build:{n:0},exact:{n:0},drag:0,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();T.check()}
function arm(i,first,ok,msg){reset();say(first);T.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keys(){if(!bar)return;bar.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='plot'&&!over('plot')){const x=XS[T.plot.n],v=[F.sech(x),x===0?.5:ch(x),-F.sech(x)].map(v=>Math.round(v*100)/100),r=T.plot.n%3;v.slice(r).concat(v.slice(0,r)).forEach(y=>b(fix2(y),()=>plot(y),`Put the dot at y = ${fix2(y)}`))}
 if(m==='note'&&!over('note'))['reciprocal: 1 / cosh x','inverse function: arcosh x'].forEach((t,j)=>b(t,()=>note(j),`${NOTE[T.note.n][0]} is the ${t}`));
 if(m==='look'&&!over('look'))gCards().forEach((r,i)=>b(`Graph ${i+1}`,()=>look(r.f)));
 if(m==='can'&&!over('can'))[[1,'possible'],[0,'impossible']].forEach(([v,t])=>b(t,()=>can(v),`${CAN[T.can.n][0]} is ${t}`));
 if(m==='build'&&!over('build'))PIECES.forEach(t=>b(t,()=>build(t),`Fill the gap with ${t}`));
 if(m==='exact'&&!over('exact'))EXACT[T.exact.n][1].forEach((t,i)=>b(t,()=>exact(i),`${EXACT[T.exact.n][0]} = ${t}`))}
const steps=[
{h:'Flip cosh to get sech',p:'sech x = 1 / cosh x. At each x, read the height of cosh x and take 1 over it. Drag the blue dot to that height.',
predict:{q:'As x gets large, what does sech x do?',opts:['grows, like cosh x','shrinks towards 0'],ans:1},task:'Plot all 4 points',
show:()=>auto(0,XS.map(x=>()=>plot(Math.round(F.sech(x)*100)/100)),650),go:()=>arm(0,'Drag the blue dot to 1 / cosh x.',()=>over('plot'),'Big cosh, small sech.')},
{h:'Reciprocal, not inverse',p:'sech x = 1 / cosh x, cosech x = 1 / sinh x, coth x = 1 / tanh x. But cosh⁻¹ x is the inverse function, arcosh x.',
predict:{q:'Is sech x the same as cosh⁻¹ x?',opts:['Yes: both mean 1 / cosh x','No: cosh⁻¹ x is arcosh x'],ans:1},task:'Sort all 6 cards',
show:()=>auto(1,NOTE.map(q=>()=>note(q[1])),550),go:()=>arm(1,'Tap reciprocal or inverse function.',()=>over('note'),'The −1 on a function name means inverse.')},
{h:'Match the graphs',p:'sinh 0 = tanh 0 = 0, so cosech and coth break at x = 0. cosh x ≥ 1, so 0 < sech x ≤ 1.',task:'Match all 5 graphs',
show:()=>auto(2,FIND.map(f=>()=>look(f)),600),go:()=>arm(2,'Tap the graph asked for.',()=>over('look'),'Know each graph by its asymptotes.')},
{h:'Which values can happen?',p:'Use what you know about cosh, sinh and tanh.',
predict:{q:'Can coth x equal 0.5?',opts:['yes','no'],ans:1},task:'Check all 7 values',
show:()=>auto(3,CAN.map(q=>()=>can(q[1])),550),go:()=>arm(3,'Tap possible or impossible.',()=>over('can'),'sech is in (0, 1]; |coth| > 1; cosech is never 0.')},
{h:'Build the identities',p:'Divide cosh²x − sinh²x = 1 by cosh²x, then by sinh²x. Fill each gap.',task:'Fill all 6 gaps',
show:()=>auto(4,SLOT.map(q=>()=>build(q[1])),500),go:()=>arm(4,'Tap the tile for the first gap.',()=>over('build'),'1 − tanh²x = sech²x and coth²x − 1 = cosech²x.')},
{h:'Exact values',p:'cosh x = 5/4, x > 0. Find sinh x from the identity, then flip.',task:'Find all 5 values',
show:()=>auto(5,EXACT.map(q=>()=>exact(q[2])),600),go:()=>arm(5,'Tap the value of sech x.',()=>over('exact'),'Find sinh x first, then flip.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.check()});
const QS=[
{q:'What is sech x?',a:'1 / cosh x',o:[['cosh⁻¹ x','cosh⁻¹ x is the inverse function arcosh x, not the reciprocal.'],['1 / sinh x','That is cosech x.']]},
{q:'Which identity is true?',a:'1 − tanh²x = sech²x',o:[['1 + tanh²x = sech²x','That is the trig sign. Dividing by cosh²x gives a minus.'],['tanh²x − 1 = sech²x','tanh²x < 1, so sech²x would be negative.']]},
{q:'What is the range of sech x?',a:'0 < y ≤ 1',o:[['y ≥ 1','That is the range of cosh x.'],['all real y','sech x is never negative or above 1.']]},
{q:'Which function is undefined at x = 0?',a:'coth x',o:[['sech x','sech 0 = 1.'],['tanh x','tanh 0 = 0; coth = 1 / tanh breaks.']]},
{q:'sinh x = 5/12. What is cosech x?',a:'12/5',o:[['5/12','That is sinh x. Flip it.'],['13/12','13/12 is cosh x.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(m,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const m=part();if(m==='quiz'){bg();cap('Challenge',1);['sech x = 1 / cosh x','cosech x = 1 / sinh x','coth x = 1 / tanh x','1 − tanh²x = sech²x'].forEach((t,i)=>txt(t,A.H*(.26+i*.15),18));return}
 ({plot:drawPlot,note:drawNote,look:drawLook,can:drawCan,build:drawBuild,exact:drawExact})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{box.hidden=B.step!==6;bar.hidden=B.step===6;keys()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Reciprocal function buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
