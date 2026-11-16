/* Flagship: measuring earthquake strength (ages 9–11; NGSS 4-ESS3-2, KS3 earth science). Seismometer, wiggle height to
   magnitude (×10 a step), energy (×32 a step), magnitude vs intensity, how often each size happens. Buttons twin every tap. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',rule:'#334155',paper:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#1d4ed8',soft:'#dbeafe',gold:'#b45309',goldSoft:'#fde68a',tag:'#7c2d12',ground:'#78716c',mud:'#a16207',red:'#b91c1c'};
const {SEIS,MAGS,TOWNS,COUNTS}=QKART;
VIS.reg('flagquake',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const fz=n=>Math.round(n*(A.narrow?1:1.12));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function lines(s,maxW,n){X.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=lines(s,A.W-40,13),lh=fz(13)+4,h=Math.max(fz(40),L.length*lh+14);panel(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.rule);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=fz(13)+5,h=L.length*lh+10,y=A.H-h-8;
 panel(10,y,A.W-20,h,K.paper,G.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
function chip(x,y,w,h,label){panel(x,y,w,h,K.paper,K.gold,2);say(label,x+w/2,y+h/2,13,K.tag);return{x,y,w,h}}
function chipRow(y,labels,h){const n=labels.length,w=(A.W-28-8*(n-1))/n;return labels.map((l,i)=>Object.assign(chip(14+i*(w+8),y,w,h||fz(38),l[0]),{k:l[1]}))}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{G.bad=true;G.msg=s;A.sound.miss();refresh()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();refresh()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- step 0: a seismometer ---- */
function shake(strong){if(G.won)return;if(G.rec.length>=2)return oops('Both are recorded. Tap the trace from the strong shake.');
 G.rec=G.rec.filter(r=>r.s!==strong).concat([{s:strong,seed:strong?2.1:0.7}]);G.sh=1;G.amp=strong?1:.3;A.tween(G,{sh:0},A.reduced()?10:1100);A.sound.tick();
 G.bad=false;G.msg=strong?'Strong shake: the frame and paper jerk far but the heavy pen hardly moves.':'Gentle shake: the frame moves a little, so the line wiggles a little.';refresh()}
function pickTrace(i){if(G.won)return;const r=G.rec[i];if(!r)return;if(G.rec.length<2)return oops('Record both shakes first.');
 if(!r.s)return oops('That trace has the smaller wiggles, so the ground moved less. A strong shake makes taller wiggles.');
 G.won=true;yes('The taller wiggles came from the strong shake. Wiggle height shows how far the ground moved.')}
function drawSeis(){const top=head(G.won?'The heavy pen stays almost still while the ground, frame and paper move, so it draws the shaking.':'Shake the ground gently, then strongly. Tap the trace from the strong shake.',G.won);
 const t=performance.now()/38,dx=(G.sh||0)*(G.amp||0)*fz(16)*Math.sin(t),gy=top+fz(128),fx=24+dx,fw=fz(120),wy=top+fz(78),cx=24+fw/2;
 const px=A.W*.56+dx,pw=A.W-24-A.W*.56;QKART.frame(X,{dx,gy,fx,fw,wy,cx,top,px,pw,W:A.W,f:fz});
 const last=G.rec[G.rec.length-1];if(last)QKART.trace(X,px+4,wy,pw-8,last.s?fz(30):fz(8),last.seed,K.ink);
 say('frame',fx+6,top+fz(28),10,K.dim,'left');say('paper',px+pw/2,wy-fz(48),10,K.dim);
 G.shHit=chipRow(gy+fz(16),[['Gentle shake',0],['Strong shake',1]]);let y=gy+fz(62);G.trHit=[];G.rec.forEach((r,i)=>{const h=fz(48),box={x:14,y,w:A.W-28,h,i};panel(14,y,A.W-28,h,K.paper,G.won&&r.s?K.ok:K.rule,G.won&&r.s?3:1.5);
  say(`trace ${i+1}`,22,y+fz(10),10,K.dim,'left');QKART.trace(X,fz(70),y+h/2,A.W-28-fz(66),r.s?fz(20):fz(6),r.seed,K.ink);G.trHit.push(box);y+=h+6});}
/* ---- step 1: wiggle height to magnitude ---- */
function pickSeis(i){if(G.won)return;G.pick=i;A.sound.tick();G.bad=false;G.msg=`Seismogram ${SEIS[i].k}: tallest wiggle ${SEIS[i].amp} mm. Now tap its magnitude.`;refresh()}
function setMag(m){if(G.won)return;if(G.pick==null)return oops('Tap a seismogram first, then a magnitude.');const S=SEIS[G.pick],want=3+Math.round(Math.log10(S.amp));
 if(m!==want){const st=Math.round(Math.log10(S.amp));return oops(`${S.amp} mm is 1 mm × ${S.amp}. ${st?`Each ×10 adds 1, so ×${S.amp} adds ${st}`:'That is the starting point'}: magnitude ${want}, not ${m}.`)}
 G.mag[G.pick]=m;G.pick=null;A.sound.tick();if(G.mag.every(v=>v!=null)){G.won=true;return yes('1 mm → 3, 10 mm → 4, 100 mm → 5. Ten times the wiggle is one step up.')}
 yes(`${S.amp} mm → magnitude ${m}. Next seismogram.`)}
function drawAmp(){const top=head(G.won?'Magnitude counts powers of ten: each step up is a wiggle ten times taller.':'All recorded 100 km away. 1 mm means magnitude 3; each ×10 in height adds 1.',G.won);
 const bh=fz(58),u=fz(25);G.seisHit=SEIS.map((S,i)=>{const y=top+fz(8)+i*(bh+8),on=G.pick===i,done=G.mag[i]!=null;panel(14,y,A.W-28,bh,on?'#dbeafe':K.paper,done?K.ok:on?K.fill:K.rule,on||done?3:1.5);
  say(S.k,28,y+bh/2,18,K.ink);X.strokeStyle='#cbd5e1';X.lineWidth=1;X.beginPath();X.moveTo(44,y+bh/2);X.lineTo(A.W-fz(84),y+bh/2);X.stroke();QKART.trace(X,44,y+bh/2,A.W-fz(84)-44,Math.max(.4,S.amp/100*u),i*1.3,K.ink);
  say(on||done?`${S.amp} mm`:'tap',A.W-fz(52),y+bh*.34,12,K.dim);if(done)say(`M ${G.mag[i]}`,A.W-fz(52),y+bh*.7,14,K.ok);return{x:14,y,w:A.W-28,h:bh,i}});
 G.magHit=chipRow(top+fz(8)+3*(bh+8)+4,MAGS.map(m=>[`M ${m}`,m]))}
/* ---- step 2: energy steps ---- */
const energy=m=>Math.round(Math.pow(10,1.5*(m-5)));
function dial(d){if(G.won)return;G.m=Math.min(8,Math.max(5,G.m+d));A.sound.tick();G.bad=false;G.msg=`Magnitude ${G.m}: wiggle ${Math.pow(10,G.m-5)} × taller, energy about ${energy(G.m).toLocaleString('en-GB')} × a magnitude 5.`;
 if(G.m===7)G.msg='Magnitude 7. How many magnitude 5 quakes match its energy? Tap your answer.';refresh()}
function answer(v){if(G.won)return;if(G.m!==7)return oops('Turn the dial to magnitude 7 first.');
 if(v===2)return oops('7 is 2 more than 5, but each step is about ×32 in energy: 32 × 32 ≈ 1000.');
 if(v===100)return oops('100 is the wiggle-height jump (10 × 10). Energy grows about 32 times a step: 32 × 32 ≈ 1000.');
 G.won=true;yes('About 1000 magnitude 5 quakes: one step is ×32 in energy, two steps are ×1000.')}
function drawEnergy(){const top=head(G.won?'Each step on the scale: wiggle ×10, energy about ×32. Two steps: energy ×1000.':'Turn the dial to 7. Each square is the energy of one magnitude 5 quake.',G.won);
 const y=top+fz(10);G.dHit=chipRow(y,[['−',-1],[`magnitude ${G.m}`,0],['+',1]],fz(36));
 const n=energy(G.m),cols=40,cs=(A.W-28)/cols,gy=y+fz(48);for(let k=0;k<1000;k++){const cx=14+(k%cols)*cs,cy=gy+Math.floor(k/cols)*cs;X.fillStyle=k<n?K.gold:'#e2e8f0';X.fillRect(cx+.5,cy+.5,cs-1,cs-1)}
 say(n>1000?`${n.toLocaleString('en-GB')}: the grid holds only 1000 (about 32 full grids)`:`${n} ${n===1?'square':'squares'} of energy`,A.W/2,gy+25*cs+fz(14),13,K.tag);
 G.ansHit=G.m===7&&!G.won?chipRow(gy+25*cs+fz(30),[['2',2],['100',100],['about 1000',1000]],fz(36)):[]}
/* ---- step 3: magnitude vs intensity ---- */
function visit(i){if(G.won)return;G.seen[i]=true;G.town=i;A.sound.tick();const T=TOWNS[i];G.bad=false;G.msg=`Town ${T.n}: ${T.i}. ${T.w}`;refresh()}
function magAtD(v){if(G.won)return;if(!G.seen.every(Boolean))return oops('Visit all four towns first.');
 if(v!=='6.5')return oops('Magnitude belongs to the quake, not the town. Town D shakes less (IV) because it is far away; the quake is still 6.5.');
 G.won=true;yes('One quake, one magnitude: 6.5. The intensity changes from town to town: VIII, VII, VI, IV.')}
function drawMap(){const top=head(G.won?'Magnitude: one number for the quake. Intensity: how hard the ground shook in each place.':G.seen.every(Boolean)?'What is the magnitude in town D?':'One magnitude 6.5 quake. Tap each town to see how hard it shook.',G.won);
 const mx=14,my=top+fz(8),mw=A.W-28,mh=fz(172);panel(mx,my,mw,mh,'#f0fdf4',K.rule,1.5);const ex=mx+mw*.08,ey=my+mh*.5;
 X.fillStyle='#fde68a';X.beginPath();X.ellipse(mx+mw*.58,my+mh*.84,mw*.13,mh*.12,0,0,7);X.fill();say('soft mud',mx+mw*.58,my+mh*.97-fz(4),10,K.mud);
 X.save();X.beginPath();X.rect(mx,my,mw,mh);X.clip();[.25,.55,.85].forEach(r=>{X.strokeStyle='#94a3b8';X.lineWidth=1;X.setLineDash([4,4]);X.beginPath();X.arc(ex,ey,mw*r,-1.1,1.1);X.stroke()});X.restore();
 QKART.star(X,ex,ey,fz(13),K.red);say('epicentre',ex+fz(4),ey+fz(22),10,K.red,'left');
 G.townHit=TOWNS.map((T,i)=>{const x=mx+mw*T.fx,y=my+mh*T.fy;QKART.house(X,x,y+fz(6),fz(18),G.town===i?K.fill:'#475569');say(T.n,x,y+fz(16),12,K.ink);
  if(G.seen[i])say(T.i,x+fz(13),y-fz(12),14,K.red,'left');return{x:x-fz(22),y:y-fz(20),w:fz(44),h:fz(46),i}});
 let y=my+mh+fz(8);if(G.town!=null){const T=TOWNS[G.town];say(`Town ${T.n} · ${T.km} km · intensity ${T.i}`,A.W/2,y+fz(6),13,K.fill)}
 G.dHit=G.seen.every(Boolean)&&!G.won?chipRow(y+fz(22),[['6.5','6.5'],['about 3','3'],['about 8','8']],fz(36)):[]}
/* ---- step 4: how often ---- */
function pickCard(i){if(G.won||G.at[i]!=null)return;G.pick=i;A.sound.tick();G.bad=false;G.msg=`${COUNTS[i].c} a year picked. Tap its magnitude band.`;refresh()}
function putBand(m){if(G.won)return;if(G.pick==null)return oops('Tap a count card first, then a magnitude band.');const C=COUNTS[G.pick];
 if(G.at.some((v,j)=>v!=null&&COUNTS[j].m===m))return oops('That band already has its count.');
 if(C.m!==m)return oops(`${C.c} a year is for magnitude ${C.m}. Bigger quakes are rarer: about 10 times fewer for each step up.`);
 G.at[G.pick]=m;G.pick=null;A.sound.tick();if(G.at.every(v=>v!=null)){G.won=true;return yes('Small quakes are common and big ones are rare: about 10 times fewer each step up.')}yes(`Magnitude ${m}: ${C.c} a year. Next card.`)}
function drawCount(){const top=head(G.won?'About 13,000 magnitude 4s a year, but only about 15 magnitude 7s.':'How many quakes happen around the world each year? Tap a card, then its band.',G.won);
 const rh=fz(40);G.bandHit=[4,5,6,7].map((m,i)=>{const y=top+fz(8)+i*(rh+6),j=G.at.findIndex(v=>v===m);panel(14,y,A.W-28,rh,j>=0?K.okBg:K.paper,j>=0?K.ok:K.rule,1.5);
  say(`magnitude ${m}`,26,y+rh/2,13,K.ink,'left');if(j>=0){const w=(A.W-fz(250))*[1,.1,.01,.0012][i]+3;X.fillStyle=K.gold;X.fillRect(fz(122),y+rh*.3,Math.max(3,w),rh*.4);say(COUNTS[j].c,A.W-22,y+rh/2,12,K.ok,'right')}
  return{x:14,y,w:A.W-28,h:rh,m}});
 const cy=top+fz(8)+4*(rh+6)+fz(10),cw=(A.W-28-8*3)/4;G.cardHit=[];COUNTS.forEach((C,i)=>{if(G.at[i]!=null)return;const x=14+i*(cw+8),on=G.pick===i;
  panel(x,cy,cw,fz(44),on?'#dbeafe':K.paper,on?K.fill:K.rule,on?3:1.5);say(C.c.split(' ')[0],x+cw/2,cy+fz(14),10,K.dim);say(C.c.split(' ')[1],x+cw/2,cy+fz(30),13,K.ink);G.cardHit.push({x,y:cy,w:cw,h:fz(44),i})})}
/* ---- input, drawing, controls ---- */
const mode=()=>['seis','amp','energy','map','count','quiz'][A.step];
function down(p){const m=mode(),hit=a=>(a||[]).find(r=>inside(p,r));let r;
 if(m==='seis'){if(r=hit(G.shHit)){shake(r.k);return true}if(r=hit(G.trHit)){pickTrace(r.i);return true}}
 if(m==='amp'){if(r=hit(G.seisHit)){pickSeis(r.i);return true}if(r=hit(G.magHit)){setMag(r.k);return true}}
 if(m==='energy'){if(r=hit(G.dHit)){dial(r.k);return true}if(r=hit(G.ansHit)){answer(r.k);return true}}
 if(m==='map'){if(r=hit(G.townHit)){visit(r.i);return true}if(r=hit(G.dHit)){magAtD(r.k);return true}}
 if(m==='count'){if(r=hit(G.cardHit)){pickCard(r.i);return true}if(r=hit(G.bandHit)){putBand(r.m);return true}}
 return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='seis')drawSeis();if(m==='amp')drawAmp();if(m==='energy')drawEnergy();if(m==='map')drawMap();if(m==='count')drawCount();
 if(m==='quiz'){head('Magnitude: the quake. Intensity: the shaking where you are.');const y=A.H*.45;['wiggle ×10 → magnitude +1','energy ×32 → magnitude +1','one quake, one magnitude'].forEach((r,i)=>say(r,A.W/2,y+i*fz(30),16,K.fill))}
 foot();A.fx.draw(X)}
function refresh(){const m=mode();let d='Challenge.';
 if(m==='seis')d=`Recorded: ${G.rec.map((r,i)=>`trace ${i+1} ${r.s?'strong':'gentle'}`).join(', ')||'nothing yet'}.`;
 if(m==='amp')d=SEIS.map((S,i)=>`${S.k}: ${S.amp} mm, ${G.mag[i]!=null?'magnitude '+G.mag[i]:'not matched'}`).join('; ')+'.';
 if(m==='energy')d=`Dial at magnitude ${G.m}; energy ${energy(G.m)} times a magnitude 5.`;
 if(m==='map')d=TOWNS.map((T,i)=>`Town ${T.n} ${T.km} km: ${G.seen[i]?'intensity '+T.i:'not visited'}`).join('; ')+'.';
 if(m==='count')d=COUNTS.map((C,i)=>`${C.c}: ${G.at[i]!=null?'magnitude '+G.at[i]:G.pick===i?'picked':'not placed'}`).join('; ')+'.';
 announce((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(m==='seis'&&!G.won){b('Gentle shake',()=>shake(0));b('Strong shake',()=>shake(1));G.rec.forEach((r,i)=>b(`Trace ${i+1}`,()=>pickTrace(i),`Pick trace ${i+1} as the strong shake`))}
 if(m==='amp'&&!G.won){SEIS.forEach((S,i)=>{if(G.mag[i]==null)b(`Seismogram ${S.k}`,()=>pickSeis(i),`Measure seismogram ${S.k}`)});MAGS.forEach(v=>b(`M ${v}`,()=>setMag(v),`Magnitude ${v}`))}
 if(m==='energy'&&!G.won){b('Magnitude −1',()=>dial(-1));b('Magnitude +1',()=>dial(1));if(G.m===7)[[2,'2'],[100,'100'],[1000,'about 1000']].forEach(([v,l])=>b(l,()=>answer(v),`Answer ${l} magnitude 5 quakes`))}
 if(m==='map'&&!G.won){TOWNS.forEach((T,i)=>b(`Town ${T.n}`,()=>visit(i),`Visit town ${T.n}, ${T.km} km away`));if(G.seen.every(Boolean))[['6.5','6.5'],['about 3','3'],['about 8','8']].forEach(([l,v])=>b(`D: ${l}`,()=>magAtD(v),`Magnitude in town D is ${l}`))}
 if(m==='count'&&!G.won){COUNTS.forEach((C,i)=>{if(G.at[i]==null)b(C.c,()=>pickCard(i),`Pick the card ${C.c} a year`)});[4,5,6,7].forEach(v=>b(`Band M ${v}`,()=>putBand(v),`Place in the magnitude ${v} band`))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok)f()},(j+1)*(A.reduced()?30:ms)))};
function fresh(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,rec:[],sh:0,amp:0,pick:null,mag:SEIS.map(()=>null),m:5,seen:TOWNS.map(()=>false),town:null,at:COUNTS.map(()=>null)})}
const steps=[
{h:'A seismometer',p:'A seismometer records shaking. A heavy weight holds a pen almost still while the ground, frame and paper move.',
predict:{q:'When the ground shakes, which part stays almost still?',opts:['The heavy weight and its pen','The frame','The paper'],ans:0},
task:'Record both shakes, then pick the strong one',show:()=>{steps[0].go();replay([()=>shake(0),()=>shake(1),()=>pickTrace(1)],900)},go:()=>{fresh();refresh();G.after=settle(0,()=>G.won,'Taller wiggles, stronger shaking.')}},
{h:'Wiggles to magnitude',p:'Magnitude is the size of a quake. At 100 km a 1 mm wiggle is magnitude 3, and each step up the wiggle is 10 times taller.',
predict:{q:'Quake B makes a wiggle 10 times taller than quake A. How much bigger is its magnitude?',opts:['1 more','10 more','10 times the number'],ans:0},
task:'Give each seismogram its magnitude',show:()=>{steps[1].go();replay([()=>pickSeis(0),()=>setMag(4),()=>pickSeis(1),()=>setMag(5),()=>pickSeis(2),()=>setMag(3)],560)},go:()=>{fresh();refresh();G.after=settle(1,()=>G.won,'3, 4 and 5.')}},
{h:'Energy steps',p:'A quake one step bigger lets out about 32 times as much energy.',
predict:{q:'How much more energy does magnitude 6 let out than magnitude 5?',opts:['About 32 times','2 times','1.2 times (6 ÷ 5)'],ans:0},
task:'Find how many magnitude 5s match a magnitude 7',show:()=>{steps[2].go();replay([()=>dial(1),()=>dial(1),()=>answer(1000)],900)},go:()=>{fresh();refresh();G.after=settle(2,()=>G.won,'About 1000.')}},
{h:'Magnitude or intensity?',p:'Intensity is how hard the ground shook in one place. It is written in Roman numerals and changes from town to town.',
predict:{q:'A near town and a far town feel the same quake. What is different?',opts:['How hard the ground shakes','The magnitude','Nothing'],ans:0},
task:'Visit all four towns, then give the magnitude in town D',show:()=>{steps[3].go();replay([0,1,2,3].map(i=>()=>visit(i)).concat([()=>magAtD('6.5')]),600)},go:()=>{fresh();refresh();G.after=settle(3,()=>G.won,'One magnitude, many intensities.')}},
{h:'Small ones are common',p:'Each year the world has thousands of small quakes and only a few big ones.',
predict:{q:'Which happen more often each year?',opts:['Magnitude 4 quakes','Magnitude 7 quakes','About the same'],ans:0},
task:'Put each yearly count on its magnitude',show:()=>{steps[4].go();replay(COUNTS.flatMap((C,i)=>[()=>pickCard(i),()=>putBand(C.m)]),480)},go:()=>{fresh();refresh();G.after=settle(4,()=>G.won,'13,000, 1,300, 130 and 15.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
const BANK=QKART.bank;
function why(tag){let m='Magnitude goes up by 1 for every ×10 in wiggle height and about ×32 in energy.';
 if(tag==='linear'||tag==='ratio')m='Magnitude is not an ordinary amount. Each step is ×10 in wiggle height, so two steps are 10 × 10 = 100 times.';
 if(tag==='ampEnergy'||tag==='addOne')m='One step is not one more unit, and not ×10 either: the energy grows about 32 times for each step.';
 if(tag==='magByPlace')m='The magnitude belongs to the quake, so it is 5.8 everywhere. Only the intensity, how hard it shakes, changes with distance.';
 if(tag==='magVsInt'||tag==='when')m='Intensity describes the shaking in one place, from dishes rattling (IV) to chimneys falling (VIII). Magnitude is one number for the whole quake.';
 if(tag==='linear2')m='1000 mm is 1 mm × 10 × 10 × 10: three steps of ×10, so 3 + 3 = magnitude 6.';
 if(tag==='oneZero')m='Count the steps of ×10: 1 → 10 → 100 → 1000 is three steps, not one. 3 + 3 = 6.';
 if(tag==='rareBig')m='Big quakes are rare. There are about 10 times fewer for each step up: about 1,300 magnitude 5s a year but only about 1 magnitude 8.';
 return m}
function ask(){qi++;const [q,right,wrongs]=BANK[qi%BANK.length],all=[[right,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});announce('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,right){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Earthquake lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
