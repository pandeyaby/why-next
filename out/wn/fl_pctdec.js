/* Flagship: percentage and decimal equivalents (ages 9–10; NC England Y5 fractions: per cent and decimal equivalents of
   1/2, 1/4, 1/5, 2/5, 4/5 and denominators that are multiples of 10 or 25). Shade fifths of a 100-strip, scale to
   hundredths, place fractions on a 0–1 line, find 40% of 60, take 25% and 20% off prices. Every tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',rule:'#334155',paper:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#2563eb',fillSoft:'#bfdbfe',gold:'#b45309',goldSoft:'#fde68a',tag:'#7c2d12',line:'#1e293b'};
const {SCALE,CARDS,SLOTS,SALES}=PDART;
VIS.reg('flagpctdec',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const fz=n=>Math.round(n*(A.narrow?1:1.12));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function lines(s,maxW,n){X.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=lines(s,A.W-40,13),lh=fz(13)+4,h=Math.max(fz(40),L.length*lh+14);panel(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.rule);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
const footH=()=>G.msg?lines('✓ '+G.msg,A.W-44,13).length*(fz(13)+5)+22:0;
function foot(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=fz(13)+5,h=L.length*lh+10,y=A.H-h-8;
 panel(10,y,A.W-20,h,K.paper,G.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{G.bad=true;G.msg=s;A.sound.miss();refresh()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();refresh()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const dec=PDART.dec;
/* ---- step 0: fifths of a hundred-strip ---- */
function flipFifth(i){if(G.won)return;G.five[i]=!G.five[i];A.sound.tick();const n=G.five.filter(Boolean).length;
 if(n===2){G.won=true;return yes('2/5 is 40 of the 100 little squares: 2/5 = 40/100 = 40% = 0.4.')}
 if(n===1){G.bad=false;G.msg='One fifth is 20 little squares: 1/5 = 20/100 = 20% = 0.2, not 5%.';return refresh()}
 G.bad=false;G.msg=`${n}/5 = ${n*20}/100 = ${n*20}%. The task asks for 2/5.`;refresh()}
function drawFifths(){const top=head(G.won?'Each fifth is 20 hundredths. 2/5 = 40% = 0.4; 4/5 = 80% = 0.8.':'100 little squares in 5 equal parts. Tap parts to shade 2/5.',G.won);
 const sq=Math.min(A.W-110,A.H*.46),u=sq/10,sx=(A.W-sq)/2+18,y0=top+fz(16);G.fiveHit=[];
 for(let p=0;p<5;p++){const y=y0+p*2*u;PDART.cells(X,sx,y,10,2,u,()=>G.five[p]);X.strokeStyle=K.rule;X.lineWidth=2.5;X.strokeRect(sx,y,sq,2*u);
  say(`part ${p+1}`,sx-8,y+u,11,K.dim,'right');G.fiveHit.push({x:sx-fz(60),y,w:sq+fz(60),h:2*u})}
 const n=G.five.filter(Boolean).length,ry=y0+sq+fz(28);
 say(`${n}/5 = ${n*20}/100 = ${n*20}% = ${dec(n*20)}`,A.W/2,ry,16,K.fill)}
/* ---- step 1: scale to hundredths ---- */
const MULTS=[2,4,5,10];
function scaleBy(m){if(G.won)return;const f=SCALE[G.si];
 if(m===0)return oops(`Changing only the bottom makes ${f.t}/100, a smaller amount. Multiply the top and bottom by the same number.`);
 if(f.b*m!==100)return oops(`× ${m} gives ${f.t*m}/${f.b*m}. Same amount, but not hundredths. What times ${f.b} makes 100?`);
 G.done.push({t:f.t*m,b:f.b,m,src:f.t});A.sound.tick();
 if(G.si===SCALE.length-1){G.won=true;return yes(`${f.t}/${f.b} × ${m}/${m} = ${f.t*m}/100 = ${f.t*m}% = ${dec(f.t*m)}. All three are hundredths.`)}
 yes(`${f.t}/${f.b} = ${f.t*m}/100 = ${f.t*m}% = ${dec(f.t*m)}. Next fraction.`);G.si++;refresh()}
function drawScale(){const f=SCALE[G.si],last=G.done.length?G.done[G.done.length-1]:null,showSq=last&&(G.won||last.src!==f.t);
 const top=head(G.won?'Scale to hundredths: the top number is the per cent.':`Make ${f.t}/${f.b} into hundredths. Tap a multiplier for the top and bottom.`,G.won);
 const big=fz(30),fx=A.W*.25,fy=top+fz(54);say(f.t,fx,fy-big*.55,30,K.ink);X.fillStyle=K.ink;X.fillRect(fx-big*.8,fy-1,big*1.6,3);say(f.b,fx,fy+big*.6,30,K.ink);
 const sq=Math.min(A.W*.42,A.H*.36),sx=A.W-14-sq,sy=top+fz(12),u=sq/10,lit=showSq?last.t:0;
 PDART.cells(X,sx,sy,10,10,u,k=>k<lit);
 X.strokeStyle=K.rule;X.lineWidth=2;X.strokeRect(sx,sy,sq,sq);say(showSq?`${last.t}/100 = ${last.t}%`:'hundred square',sx+sq/2,sy+sq+fz(12),12,showSq?K.fill:K.dim);
 const cy=Math.max(fy+big*1.4,sy+sq+fz(30)),cw=(A.W-28-4*6)/5;G.multHit=[];
 MULTS.concat([0]).forEach((m,i)=>{const x=14+i*(cw+6);panel(x,cy,cw,fz(40),G.won?'#f1f5f9':K.goldSoft,K.gold,2);say(m?`× ${m}`:'bottom',x+cw/2,cy+fz(m?20:13),m?15:11,K.tag);if(!m)say('only',x+cw/2,cy+fz(28),11,K.tag);G.multHit.push({x,y:cy,w:cw,h:fz(40),m})});
 say(G.done.map(d=>`${d.src}/${d.b} = ${d.t}%`).join('   '),A.W/2,cy+fz(56),12,K.ok)}
/* ---- step 2: line them up ---- */
function pickCard(i){if(G.won||G.at[i]!=null)return;G.pick=i;A.sound.tick();G.bad=false;G.msg=`${CARDS[i].t}/${CARDS[i].b} picked. Tap the place on the line where it belongs.`;refresh()}
function putAt(s){if(G.won)return;if(G.pick==null)return oops('Tap a fraction card first, then a place on the line.');
 const f=CARDS[G.pick],h=100*f.t/f.b,want=SLOTS[s];
 if(G.at.includes(s))return oops('That place already has its fraction.');
 if(h!==want){let m=`${f.t}/${f.b} = ${h}/100 = ${h}% = ${dec(h)}, not ${dec(want)}.`;
  if(want===10*f.b||String(want).startsWith(String(f.b)))m=`The ${f.b} in ${f.t}/${f.b} counts the parts; it is not a digit of the decimal. ${f.t}/${f.b} = ${h}/100 = ${dec(h)}.`;
  return oops(m)}
 G.at[G.pick]=s;G.pick=null;if(G.at.every(v=>v!=null)){G.won=true;return yes('All six placed. Each name at a point is the same amount.')}yes(`${f.t}/${f.b} = ${dec(h)} = ${h}%. Next card.`)}
function drawLine(){const top=head(G.won?'1/5 = 0.2, 1/4 = 0.25, 2/5 = 0.4, 1/2 = 0.5, 3/4 = 0.75, 4/5 = 0.8.':'Tap a fraction card, then the spot on the line with the same decimal and per cent.',G.won);
 const lx=22,lw=A.W-44,ly=top+fz(96);PDART.ticks(X,lx,ly,lw);say('0',lx,ly+fz(16),12,K.dim);say('1',lx+lw,ly+fz(16),12,K.dim);
 G.slotHit=SLOTS.map((h,s)=>{const x=lx+lw*h/100,up=s%2===0,ty=up?ly-fz(52):ly+fz(30),own=G.at.indexOf(s);
  X.strokeStyle='#64748b';X.lineWidth=1.5;X.beginPath();X.moveTo(x,ly);X.lineTo(x,up?ty+fz(36):ty);X.stroke();
  const bw=fz(46);panel(x-bw/2,ty,bw,fz(36),own>=0?K.okBg:K.paper,own>=0?K.ok:K.rule,1.5,6);say(dec(h),x,ty+fz(11),12,K.ink);say(h+'%',x,ty+fz(26),11,K.dim);
  if(own>=0)say(`${CARDS[own].t}/${CARDS[own].b}`,x,up?ty-fz(10):ty+fz(48),13,K.ok);return{x:x-bw/2,y:ty,w:bw,h:fz(36),s}});
 const cy=ly+fz(96),cw=(A.W-28-5*6)/6;G.cardHit=[];
 CARDS.forEach((f,i)=>{if(G.at[i]!=null)return;const x=14+i*(cw+6);panel(x,cy,cw,fz(42),G.pick===i?'#dbeafe':K.paper,G.pick===i?K.fill:K.rule,G.pick===i?3:1.5);
  say(`${f.t}/${f.b}`,x+cw/2,cy+fz(21),15,K.ink);G.cardHit.push({x,y:cy,w:cw,h:fz(42),i})})}
/* ---- step 3: 40% of 60 ---- */
const CUTS=[2,4,5,10];
function cutInto(n){if(G.won)return;G.cut=n;G.on=Array(n).fill(false);A.sound.tick();G.bad=false;G.msg=`60 ÷ ${n} = ${60/n}. Each part is ${100/n}% of the 60.`;refresh()}
function shadePart(i){if(G.won)return;if(!G.cut)return oops('Cut the 60 into equal parts first.');G.on[i]=!G.on[i];A.sound.tick();
 const k=G.on.filter(Boolean).length,pc=k*100/G.cut,got=k*60/G.cut;
 if(pc===40){G.won=true;return yes(`${k} of ${G.cut} parts = ${k}/${G.cut} = 40%. 40% of 60 = ${got}.`)}
 if(G.cut===4||G.cut===2){G.bad=true;G.msg=`Each part is ${100/G.cut}%, so 40% cannot be made from these parts. Try fifths or tenths.`;return refresh()}
 G.bad=false;G.msg=`${k}/${G.cut} = ${pc}%: that is ${got} sweets.`;refresh()}
function drawAmount(){const top=head(G.won?'40% is 2/5. One fifth of 60 is 12, so two fifths is 24. Tenths work too: 4 × 6 = 24.':'Find 40% of 60 sweets. Cut the bar, then shade 40%.',G.won);
 const bx=14,bw=A.W-28,by=top+fz(40),bh=fz(48);G.partHit=[];const n=G.cut||1;
 for(let i=0;i<n;i++){const x=bx+i*bw/n;panel(x+1,by,bw/n-2,bh,G.cut&&G.on[i]?K.fill:K.fillSoft,K.rule,1.5,4);
  if(G.cut){say(60/n,x+bw/(2*n),by+bh/2,n>5?12:15,G.on[i]?'#ffffff':K.ink);G.partHit.push({x,y:by,w:bw/n,h:bh,i})}}
 if(!G.cut)say('60 sweets',A.W/2,by+bh/2,16,K.ink);say('0',bx,by+bh+fz(12),11,K.dim);say('60',bx+bw,by+bh+fz(12),11,K.dim);
 if(G.cut){const k=G.on.filter(Boolean).length;say(`${k}/${G.cut} = ${k*100/G.cut}% → ${k*60/G.cut} sweets`,A.W/2,by+bh+fz(34),15,K.fill)}
 const cy=by+bh+fz(60),cw=(A.W-28-3*8)/4;G.cutHit=[];
 CUTS.forEach((m,i)=>{const x=14+i*(cw+8);panel(x,cy,cw,fz(38),G.cut===m?K.goldSoft:K.paper,K.gold,2);say(`${m} parts`,x+cw/2,cy+fz(19),13,K.tag);G.cutHit.push({x,y:cy,w:cw,h:fz(38),m})})}
/* ---- step 4: sale prices ---- */
function sale(){return SALES[G.sj]}
function splitTag(n){if(G.won)return;G.cut=n;G.on=Array(n).fill(false);A.sound.tick();G.bad=false;const s=sale();G.msg=`£${s.price} ÷ ${n} = £${s.price/n} a part, ${100/n}% each.`;refresh()}
function takeOff(i){if(G.won)return;if(!G.cut)return oops('Split the price into equal parts first.');G.on[i]=!G.on[i];A.sound.tick();const s=sale(),k=G.on.filter(Boolean).length;G.bad=false;G.msg=`Taking off ${k*100/G.cut}% = £${k*s.price/G.cut}.`;refresh()}
function pay(){if(G.won)return;const s=sale();if(!G.cut)return oops('Split the price into equal parts first.');const k=G.on.filter(Boolean).length,off=k*100/G.cut,left=s.price-k*s.price/G.cut;
 if(off!==s.off)return oops(off?`You took off ${off}%, but the sign says ${s.off}% off. ${s.off}% of £${s.price} is ${s.off===25?'a quarter':'a fifth'}.`:'Nothing is taken off yet. Tap the parts the shop takes away.');
 if(G.sj===SALES.length-1){G.won=true;return yes(`£${s.price} − £${s.price-left} = £${left}. You pay £${left}: ${100-s.off}% of the price.`)}
 yes(`£${s.price} − £${s.price-left} = £${left}. You pay £${left}: 75% left, not the £${s.price-left} off.`);G.sj++;G.cut=0;G.on=[];refresh()}
function drawSale(){const s=sale(),top=head(G.won?'The discount is taken off. You pay what is left: 80% of £60 = £48.':`${s.off}% off a £${s.price} ${s.item}. Split it, take off parts, then Pay.`,G.won);
 const bx=14,bw=A.W-28,by=top+fz(44),bh=fz(50),n=G.cut||1;G.partHit=[];
 panel(bx,by-fz(30),fz(92),fz(24),K.goldSoft,K.gold,2,12);say(`${s.item} £${s.price}`,bx+fz(46),by-fz(18),12,K.tag);
 for(let i=0;i<n;i++){const x=bx+i*bw/n,gone=G.cut&&G.on[i];panel(x+1,by,bw/n-2,bh,gone?'#fee2e2':K.fillSoft,gone?K.no:K.rule,gone?2.5:1.5,4);
  if(G.cut){say(`£${s.price/n}`,x+bw/(2*n),by+bh*.38,n>5?11:14,gone?K.no:K.ink);say(gone?'off':`${100/n}%`,x+bw/(2*n),by+bh*.72,11,gone?K.no:K.dim);G.partHit.push({x,y:by,w:bw/n,h:bh,i})}}
 if(!G.cut)say(`£${s.price}`,A.W/2,by+bh/2,16,K.ink);
 const k=G.cut?G.on.filter(Boolean).length:0;if(G.cut)say(`off £${k*s.price/G.cut}   ·   pay £${s.price-k*s.price/G.cut}`,A.W/2,by+bh+fz(20),15,K.fill);
 const cy=by+bh+fz(44),cw=(A.W-28-4*8)/5;G.cutHit=[];
 CUTS.forEach((m,i)=>{const x=14+i*(cw+8);panel(x,cy,cw,fz(38),G.cut===m?K.goldSoft:K.paper,K.gold,2);say(m,x+cw/2,cy+fz(13),14,K.tag);say('parts',x+cw/2,cy+fz(28),10,K.tag);G.cutHit.push({x,y:cy,w:cw,h:fz(38),m})});
 const px=14+4*(cw+8);panel(px,cy,cw,fz(38),K.okBg,K.ok,2);say('Pay',px+cw/2,cy+fz(19),14,K.ok);G.payHit={x:px,y:cy,w:cw,h:fz(38)}}
/* ---- input, drawing, controls ---- */
const mode=()=>['fifths','scale','line','amount','sale','quiz'][A.step];
function down(p){const m=mode();
 if(m==='fifths'){const i=(G.fiveHit||[]).findIndex(r=>inside(p,r));if(i>=0){flipFifth(i);return true}}
 if(m==='scale'){const r=(G.multHit||[]).find(r=>inside(p,r));if(r){scaleBy(r.m);return true}}
 if(m==='line'){const cd=(G.cardHit||[]).find(r=>inside(p,r));if(cd){pickCard(cd.i);return true}const sl=(G.slotHit||[]).find(r=>inside(p,r));if(sl){putAt(sl.s);return true}}
 if(m==='amount'||m==='sale'){const cu=(G.cutHit||[]).find(r=>inside(p,r));if(cu){(m==='sale'?splitTag:cutInto)(cu.m);return true}const pt=(G.partHit||[]).find(r=>inside(p,r));if(pt){(m==='sale'?takeOff:shadePart)(pt.i);return true}if(m==='sale'&&inside(p,G.payHit)){pay();return true}}
 return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='fifths')drawFifths();if(m==='scale')drawScale();if(m==='line')drawLine();if(m==='amount')drawAmount();if(m==='sale')drawSale();
 if(m==='quiz'){head('Fraction, decimal and per cent are three names for one amount.');const y=A.H*.45;[['1/4','0.25','25%'],['2/5','0.4','40%'],['3/20','0.15','15%']].forEach((r,i)=>say(r.join('  =  '),A.W/2,y+i*fz(30),16,K.fill))}
 foot();A.fx.draw(X)}
function refresh(){const m=mode();let d='Challenge.';
 if(m==='fifths')d=`Hundred-strip in 5 parts. Shaded: ${G.five.map((v,i)=>v?i+1:null).filter(Boolean).join(', ')||'none'}.`;
 if(m==='scale')d=`${SCALE[G.si].t}/${SCALE[G.si].b}. Done: ${G.done.map(x=>x.src+'/'+x.b+'='+x.t+'%').join('; ')||'none'}.`;
 if(m==='line')d=CARDS.map((f,i)=>`${f.t}/${f.b} ${G.at[i]!=null?'at '+dec(SLOTS[G.at[i]]):G.pick===i?'picked':'not placed'}`).join('; ')+'.';
 if(m==='amount')d=G.cut?`60 cut into ${G.cut} parts of ${60/G.cut}; ${G.on.filter(Boolean).length} shaded.`:'60 sweets, not cut yet.';
 if(m==='sale'){const s=sale();d=`${s.off}% off £${s.price}. `+(G.cut?`Split into ${G.cut} parts of £${s.price/G.cut}; ${G.on.filter(Boolean).length} taken off.`:'Not split yet.')}
 announce((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(m==='fifths'&&!G.won)[0,1,2,3,4].forEach(i=>b(`Part ${i+1}`,()=>flipFifth(i),`Shade or unshade fifth number ${i+1}`));
 if(m==='scale'&&!G.won){MULTS.forEach(k=>b(`× ${k}`,()=>scaleBy(k),`Multiply top and bottom by ${k}`));b('Bottom only',()=>scaleBy(0),'Change only the bottom number to 100')}
 if(m==='line'&&!G.won){CARDS.forEach((f,i)=>{if(G.at[i]==null)b(`${f.t}/${f.b}`,()=>pickCard(i),`Pick the card ${f.t} over ${f.b}`)});SLOTS.forEach((h,s)=>{if(!G.at.includes(s))b(`${dec(h)} (${h}%)`,()=>putAt(s),`Place at ${dec(h)}, ${h} per cent`)})}
 if((m==='amount'||m==='sale')&&!G.won){CUTS.forEach(k=>b(`${k} parts`,()=>(m==='sale'?splitTag:cutInto)(k),`Cut into ${k} equal parts`));(G.on||[]).forEach((v,i)=>b(`${v?'Undo':m==='sale'?'Take off':'Shade'} ${i+1}`,()=>(m==='sale'?takeOff:shadePart)(i),`${m==='sale'?'Take off':'Shade'} part ${i+1}`));if(m==='sale')b('Pay',pay,'Pay what is left')}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok)f()},(j+1)*(A.reduced()?30:ms)))};
function fresh(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,five:[false,false,false,false,false],si:0,done:[],at:CARDS.map(()=>null),pick:null,cut:0,on:[],sj:0})}
const steps=[
{h:'Fifths',p:'A fifth is one of 5 equal parts. Spread over 100 little squares, each fifth gets 100 ÷ 5 = 20 of them.',
predict:{q:'What is 1/5 as a per cent?',opts:['20%','5%','15%'],ans:0},
task:'Shade 2/5 of the strip',show:()=>{steps[0].go();replay([()=>flipFifth(0),()=>flipFifth(1)],600)},go:()=>{fresh();refresh();G.after=settle(0,()=>G.won,'2/5 = 40%.')}},
{h:'Make hundredths',p:'Twentieths, twenty-fifths and fiftieths scale up to hundredths. Multiply the top and the bottom by the same number.',
predict:{q:'What is 7/25 as a per cent?',opts:['28%','7%','25%'],ans:0},
task:'Turn all three fractions into hundredths',show:()=>{steps[1].go();replay([()=>scaleBy(5),()=>scaleBy(4),()=>scaleBy(2)],700)},go:()=>{fresh();refresh();G.after=settle(1,()=>G.won,'15%, 28% and 18%.')}},
{h:'Same spot',p:'A fraction, a decimal and a per cent can name the same point on a line from 0 to 1.',
task:'Put all six fractions on the line',show:()=>{steps[2].go();replay(CARDS.flatMap((f,i)=>[()=>pickCard(i),()=>putAt(SLOTS.indexOf(100*f.t/f.b))]),320)},go:()=>{fresh();refresh();G.after=settle(2,()=>G.won,'All six placed.')}},
{h:'Per cent of an amount',p:'To find a per cent of an amount, use the fraction it equals. 40% is 2/5, so cut the amount into fifths.',
predict:{q:'What is 40% of 60 sweets?',opts:['24','20','36'],ans:0},
task:'Shade 40% of the 60 sweets',show:()=>{steps[3].go();replay([()=>cutInto(5),()=>shadePart(0),()=>shadePart(1)],650)},go:()=>{fresh();refresh();G.after=settle(3,()=>G.won,'40% of 60 = 24.')}},
{h:'Sale prices',p:'In a sale, the per cent tells you what is taken off. The price you pay is the part that is left.',
predict:{q:'A £40 jacket has 25% off. What do you pay?',opts:['£30','£15','£10'],ans:0},
task:'Pay the sale price for both items',show:()=>{steps[4].go();replay([()=>splitTag(4),()=>takeOff(0),pay,()=>splitTag(5),()=>takeOff(0),pay],480)},go:()=>{fresh();refresh();G.after=settle(4,()=>G.won,'£30 and £48.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
const BANK=PDART.bank;
function why(tag){let m='Scale the fraction so the bottom is 100. Then the top is the per cent, and the decimal shows hundredths.';
 if(tag==='digitCopy')m='The digits of a fraction are not the digits of its decimal. 4/5 means 4 of 5 equal parts: × 20 gives 80/100 = 0.8.';
 if(tag==='bottomOnly')m='Changing only the bottom to 100 shrinks the amount. 9/25 × 4/4 = 36/100 = 36%; the top must be multiplied too.';
 if(tag==='offNotPay')m='That is the amount taken off. The price you pay is what is left: £50 − £10 = £40.';
 if(tag==='takeAway')m='A per cent is not a number to subtract. 25% of 80 is a quarter of 80, which is 20; take that off only if the question asks.';
 if(tag==='divideByPercent')m='Dividing by 20 or 25 is not the same as finding 25%. 25% is 1/4, so divide by 4: 80 ÷ 4 = 20.';
 if(tag==='placeValue')m='Check place value. 0.4 is 4 tenths, which is 40 hundredths, so 40%. 4% is 0.04.';
 if(tag==='wrongScale')m='20 × 5 = 100, so multiply the 3 by 5 as well: 15/100 = 15%. Multiplying by 20 is too much.';
 return m}
function ask(){qi++;const [q,right,wrongs]=BANK[qi%BANK.length],all=[[right,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});announce('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,right){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Per cent lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
