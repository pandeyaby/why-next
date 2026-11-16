/* Flagship: Pompeii and Vesuvius (ages 7–9; NC England Y3 rocks, KS2 history "Roman empire and its impact" and the
   science of volcanoes; NGSS 4-ESS3-2 natural hazards). Tap Vesuvius hour by hour and watch ash and pumice, not lava,
   bury the town; drop everyday things into the ash to see how it kept them; make a plaster cast step by step; put the
   story on a timeline; dig up four finds and say what each tells us about Roman life. Drag or tap, or use the buttons. */
(()=>{
const T={ink:'#0f172a',mid:'#334155',page:'#ffffff',yes:'#166534',yesBg:'#dcfce7',oops:'#9f1239',oopsBg:'#ffe4e6',tip:'#fff7ed',line:'#1e293b',
 sky:'#e0f2fe',hill:'#78716c',hillInk:'#292524',ash:'#a8a29e',ashInk:'#44403c',wall:'#fde68a',roof:'#c2410c',plaster:'#f8fafc',sel:'#1d4ed8'};
const Q=POMPART;
VIS.reg('flagpomp',c=>{let A,X,row,chal,qi=-1,gen=0;const V={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
function put(s,x,y,n,col,al,wt){X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||T.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function split(s,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of String(s).split(' ')){const t=cur?cur+' '+word:word;if(cur&&X.measureText(t).width>w){out.push(cur);cur=word}else cur=t}out.push(cur);return out}
function tile(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function words(s,b,n,col,wt){const L=split(s,b.w-12,n),lh=u(n)+3;L.forEach((t,i)=>put(t,b.x+b.w/2,b.y+b.h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function top(s,won){const L=split(s,A.W-40,13),lh=u(13)+4,h=Math.max(u(32),L.length*lh+12);tile(10,8,A.W-20,h,won?T.yesBg:T.tip,won?T.yes:T.line,2,8);
 L.forEach((t,i)=>put(t,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?T.yes:T.ink));return 8+h}
function strip(){if(!V.msg)return;const L=split((V.bad?'✗ ':'✓ ')+V.msg,A.W-44,12),lh=u(12)+5,h=L.length*lh+10,y=A.H-h-8;
 tile(10,y,A.W-20,h,T.page,V.bad?T.oops:T.yes,3,8);L.forEach((t,i)=>put(t,A.W/2,y+5+lh*(i+.5),12,V.bad?T.oops:T.ink))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{V.bad=true;V.msg=s;A.sound.miss();sync()};
const good=s=>{V.bad=false;V.msg=s;A.sound.pop();sync()};
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const area=t=>{const y=t+u(10);return{x:14,y,w:A.W-28,h:A.H-y-u(80)}};
/* step 0: erupt */
function blast(){if(V.won)return;V.e=Math.min(Q.ERUPT.length-1,V.e+1);A.sound.tick();const s=Q.ERUPT[V.e];
 if(V.e===Q.ERUPT.length-1){V.won=true;return good(s[2]+' No lava reached the town.')}V.bad=false;V.msg=`Hour ${s[0]}: ${s[2]}`;sync()}
function house(x,g,w,h){X.fillStyle=T.wall;X.strokeStyle=T.ashInk;X.lineWidth=1.5;X.fillRect(x,g-h,w,h);X.strokeRect(x,g-h,w,h);
 X.fillStyle=T.roof;X.beginPath();X.moveTo(x-3,g-h);X.lineTo(x+w/2,g-h-w*.35);X.lineTo(x+w+3,g-h);X.closePath();X.fill();X.fillStyle=T.ashInk;X.fillRect(x+w*.4,g-h*.5,w*.2,h*.5)}
function drawErupt(t){const r=area(t);tile(r.x,r.y,r.w,r.h,T.sky,T.line,2,12);const g=r.y+r.h-u(22),s=Q.ERUPT[V.e];
 const vx=r.x+r.w*.24,vw=r.w*.42,vh=r.h*.55;V.hill={x:vx-vw/2,y:g-vh,w:vw,h:vh};
 X.save();A.paint.rrect(r.x,r.y,r.w,r.h,12);X.clip();if(V.e>0){const ch=Math.min(r.h*.4,u(30)+V.e*u(14));X.fillStyle='rgba(87,83,78,.85)';X.fillRect(vx-u(6),g-vh-ch,u(12),ch);X.beginPath();X.ellipse(vx+V.e*u(14),Math.max(r.y+u(30),g-vh-ch),u(30)+V.e*u(12),u(14)+V.e*u(3),0,0,7);X.fill()}X.restore();
 X.fillStyle=T.hill;X.strokeStyle=T.hillInk;X.lineWidth=2;X.beginPath();X.moveTo(vx-vw/2,g);X.lineTo(vx-u(12),g-vh);X.lineTo(vx+u(12),g-vh);X.lineTo(vx+vw/2,g);X.closePath();X.fill();X.stroke();
 put('Vesuvius',vx,g-vh*.4,12,'#ffffff','center',800);
 const tx=r.x+r.w*.58,tw=r.w*.38,m=(g-r.y-u(60))/6;for(let i=0;i<3;i++)house(tx+i*tw/3+4,g,tw/3-10,m*3.2);
 const d=s[1]*m;if(d>0){X.fillStyle='rgba(168,162,158,.92)';X.fillRect(tx-6,g-d,tw+10,d);X.strokeStyle=T.ashInk;X.beginPath();X.moveTo(tx-6,g-d);X.lineTo(tx+tw+4,g-d);X.stroke()}
 X.strokeStyle=T.hillInk;X.lineWidth=2;X.beginPath();X.moveTo(r.x+6,g);X.lineTo(r.x+r.w-6,g);X.stroke();put('Pompeii',tx+tw/2,g+u(11),12,T.ink,'center',800);
 tile(tx+tw/2-u(62),r.y+u(6),u(124),u(20),T.page,T.line,1,6);put(`Hour ${s[0]} · ash ${s[1]} m`,tx+tw/2,r.y+u(16),12,T.ink,'center',800);if(!V.won)put('Tap the volcano',vx,r.y+u(16),12,T.mid,'center',700)}
/* step 1: what the ash kept */
function bury(i){if(V.won||V.kept.has(i))return;V.kept.add(i);V.pick=null;A.sound.tick();
 if(V.kept.size===Q.KEEP.length){V.won=true;return good(Q.KEEP[i][1]+' The ash shut out air, rain and robbers for 1,700 years.')}V.bad=false;V.msg=Q.KEEP[i][1];sync()}
function drawKeep(t){const y0=t+u(10),g=u(6),cols=A.narrow?2:3,w=(A.W-28-g*(cols-1))/cols,h=u(36);V.itemHit=[];let n=0;
 Q.KEEP.forEach((it,i)=>{if(V.kept.has(i))return;const x=14+(n%cols)*(w+g),y=y0+Math.floor(n/cols)*(h+g);n++;const sel=V.pick===i,b=V.drag&&V.drag.i===i?{x:V.drag.x-w/2,y:V.drag.y-h/2,w,h}:{x,y,w,h};
  tile(b.x,b.y,w,h,sel?'#dbeafe':T.page,sel?T.sel:T.line,sel?3:1.5,8);words(it[0],b,12,T.ink,800);V.itemHit.push({x,y,w,h,i})});
 const py=y0+2*(h+g)+u(8),ph=A.H-py-u(84);V.pit={x:14,y:py,w:A.W-28,h:ph};tile(14,py,A.W-28,ph,T.ash,T.ashInk,2,10);
 put('Ash layer: drop things here',A.W/2,py+u(14),12,T.ink,'center',800);
 [...V.kept].forEach((i,j)=>{const cw=(A.W-48)/3,x=24+(j%3)*cw,y=py+u(28)+Math.floor(j/3)*u(40);tile(x,y,cw-8,u(34),'#f5f5f4',T.ashInk,1.5,8);words('✓ '+Q.KEEP[i][0],{x,y,w:cw-8,h:u(34)},11,T.ink,700)})}
/* step 2: plaster cast */
function castStep(i){if(V.won)return;if(i!==V.cs)return miss(i<V.cs?'That step is done already.':`Not yet. First: ${Q.CAST[V.cs].toLowerCase()}. ${i===3?'If you dig first, the hollow crumbles and the shape is lost.':i===2?'There is nothing to set until plaster is poured in.':'You need to find the hollow before you can fill it.'}`);
 V.cs++;A.sound.tick();if(V.cs===4){V.won=true;return good(Q.CASTM[3])}V.bad=false;V.msg=Q.CASTM[i];sync()}
function dog(cx,cy,s,fill,edge,dash){X.save();if(dash)X.setLineDash([5,4]);X.fillStyle=fill;X.strokeStyle=edge;X.lineWidth=2;X.beginPath();X.ellipse(cx,cy,s*1.3,s*.55,0,0,7);X.moveTo(cx+s*1.7,cy-s*.5);X.ellipse(cx+s*1.45,cy-s*.55,s*.45,s*.38,0,0,7);
 for(const dx of[-.9,-.5,.6,1])X.rect(cx+dx*s-s*.1,cy+s*.3,s*.2,s*.7);if(fill!=='transparent')X.fill();X.stroke();X.restore()}
function drawCast(t){const r=area(t),bh=Math.min(u(48),(r.h*.42)/2),g=u(6),bw=(r.w-g)/2;V.castHit=Q.CAST.map((s,i)=>{const x=r.x+(i%2)*(bw+g),y=r.y+Math.floor(i/2)*(bh+g),done=i<V.cs;
  tile(x,y,bw,bh,done?T.yesBg:T.page,done?T.yes:T.line,done?3:1.5,8);words((done?`✓ ${i+1}. `:'')+s,{x,y,w:bw,h:bh},11,done?T.yes:T.ink,700);return{x,y,w:bw,h:bh,i}});
 const sy=r.y+2*(bh+g)+u(6),sh=r.y+r.h-sy;tile(r.x,sy,r.w,sh,V.cs>=4?'#f5f5f4':T.ash,T.ashInk,2,10);const cx=A.W/2-u(10),cy=sy+sh*.55,s=Math.min(u(34),sh*.25);
 if(V.cs===0){dog(cx,cy,s,'transparent',T.ashInk,true);put('hard ash (something rotted away inside)',A.W/2,sy+u(14),11,T.ink,'center',700)}
 if(V.cs===1){dog(cx,cy,s,'#292524',T.ink);put('an empty hollow',A.W/2,sy+u(14),11,T.ink,'center',700)}
 if(V.cs===2){dog(cx,cy,s,T.plaster,T.ink);X.fillStyle=T.plaster;X.fillRect(cx-3,sy,6,cy-sy-s*.4);put('wet plaster poured in',A.W/2,sy+u(14),11,T.ink,'center',700)}
 if(V.cs===3){dog(cx,cy,s,'#e2e8f0',T.ink);put('plaster set hard',A.W/2,sy+u(14),11,T.ink,'center',700)}
 if(V.cs>=4){dog(cx,cy,s,'#e2e8f0',T.ink);put('the plaster cast, dug out',A.W/2,sy+u(14),11,T.ink,'center',700)}}
/* step 3: timeline */
const ORDER=[2,0,4,1,3];
function place(i){if(V.won||V.line.includes(i))return;const want=V.line.length;V.pick=null;
 if(i!==want)return miss(i>want?`Too soon. "${Q.TIME[i][1]}" happened after "${Q.TIME[want][1].toLowerCase()}".`:'');
 V.line.push(i);A.sound.tick();if(V.line.length===Q.TIME.length){V.won=true;return good(`Buried in AD 79, found in 1748: 1748 − 79 = 1,669 years under the ground before digging began.`)}V.bad=false;V.msg=`${Q.TIME[i][0]}: ${Q.TIME[i][1]}.`;sync()}
function drawTime(t){const y0=t+u(8),g=u(6),h=u(34);V.timeHit=[];let n=0;const cw=(A.W-28-g)/2;
 ORDER.forEach(i=>{if(V.line.includes(i))return;const x=14+(n%2)*(cw+g),y=y0+Math.floor(n/2)*(h+g);n++;const b=V.drag&&V.drag.i===i?{x:V.drag.x-cw/2,y:V.drag.y-h/2,w:cw,h}:{x,y,w:cw,h};
  tile(b.x,b.y,cw,h,V.pick===i?'#dbeafe':T.page,V.pick===i?T.sel:T.line,V.pick===i?3:1.5,8);words(Q.TIME[i][1],b,10,T.ink,700);V.timeHit.push({x,y,w:cw,h,i})});
 const ly=y0+3*(h+g)+u(6),lh=A.H-ly-u(84);V.lineBox={x:14,y:ly,w:A.W-28,h:lh};tile(14,ly,A.W-28,lh,'#f5f5f4',T.line,2,10);put('Timeline: earliest at the top',A.W/2,ly+u(12),11,T.mid,'center',700);
 const sh=(lh-u(26))/5;for(let k=0;k<5;k++){const y=ly+u(22)+k*sh,i=V.line[k];X.fillStyle=i!=null?T.yesBg:'#ffffff';X.strokeStyle=i!=null?T.yes:'#94a3b8';X.lineWidth=1.5;X.fillRect(22,y,A.W-44,sh-4);X.strokeRect(22,y,A.W-44,sh-4);
  if(i!=null){put(Q.TIME[i][0],30,y+(sh-4)/2,11,T.yes,'left',800);put(Q.TIME[i][2],A.W-30,y+(sh-4)/2,11,T.ink,'right',700)}}}
/* step 4: dig and read the finds */
function brush(i){if(V.won||V.dug[i]>=2)return;V.dug[i]++;A.sound.tick();V.bad=false;V.msg=V.dug[i]>=2?`Found: ${Q.FINDS[i][0]}. What does it tell us? Pick it, then pick a clue.`:'Brushing away the ash…';sync()}
function match(f,cl){if(V.won||V.match[f]!=null||V.dug[f]<2)return;V.pick=null;if(Q.FINDS[f][1]!==cl)return miss(`Look again at the ${Q.FINDS[f][0].toLowerCase()}. What would people use it for?`);
 V.match[f]=cl;A.sound.pop();V.bad=false;V.msg=`${Q.FINDS[f][0]}: ${Q.CLUES[cl].toLowerCase()}.`;if(Q.FINDS.every((_,j)=>V.match[j]!=null)){V.won=true;V.msg='The ash kept a whole town, so finds tell us how ordinary Romans lived.'}sync()}
function drawDig(t){const y0=t+u(8),g=u(6),w=(A.W-28-g)/2,h=u(48);V.findHit=Q.FINDS.map((f,i)=>{const x=14+(i%2)*(w+g),y=y0+Math.floor(i/2)*(h+g),d=V.dug[i],m=V.match[i]!=null,sel=V.pick===i;
  tile(x,y,w,h,d<2?(d?'#d6d3d1':T.ash):m?T.yesBg:sel?'#dbeafe':T.page,m?T.yes:sel?T.sel:T.ashInk,sel||m?3:1.5,8);words(d<2?(d?'Keep brushing':'Ash: tap to dig'):(m?'✓ ':'')+f[0],{x,y,w,h},11,m?T.yes:T.ink,800);return{x,y,w,h,i}});
 const cy=y0+2*(h+g)+u(8),ch=Math.min(u(46),(A.H-cy-u(84))/4-g);V.clueHit=Q.CLUES.map((s,i)=>{const y=cy+i*(ch+g),used=Object.values(V.match).includes(i);
  tile(14,y,A.W-28,ch,used?T.yesBg:T.tip,used?T.yes:T.line,used?3:1.5,8);words(s,{x:14,y,w:A.W-28,h:ch},11,used?T.yes:T.ink,700);return{x:14,y,w:A.W-28,h:ch,i}})}
/* input */
const kind=()=>['erupt','keep','cast','time','dig','quiz'][A.step];
function down(p){const k=kind(),f=L=>(L||[]).find(r=>on(p,r));
 if(k==='erupt'&&on(p,V.hill)){blast();return true}
 if(k==='keep'){const it=f(V.itemHit);if(it){V.pick=it.i;V.drag={i:it.i,x:p.x,y:p.y};A.sound.tick();sync();return true}if(on(p,V.pit)&&V.pick!=null){bury(V.pick);return true}}
 if(k==='cast'){const r=f(V.castHit);if(r){castStep(r.i);return true}}
 if(k==='time'){const r=f(V.timeHit);if(r){V.pick=r.i;V.drag={i:r.i,x:p.x,y:p.y};A.sound.tick();sync();return true}if(on(p,V.lineBox)&&V.pick!=null){place(V.pick);return true}}
 if(k==='dig'){const r=f(V.findHit);if(r){if(V.dug[r.i]<2)brush(r.i);else if(V.match[r.i]==null){V.pick=r.i;A.sound.tick();sync()}return true}const cl=f(V.clueHit);if(cl&&V.pick!=null){match(V.pick,cl.i);return true}}
 return false}
function move(p){if(!V.drag)return;V.drag.x=p.x;V.drag.y=p.y;A.redraw()}
function up(p){const d=V.drag;V.drag=null;if(!d){A.redraw();return}const k=kind();
 if(k==='keep'){if(on(p,V.pit))bury(d.i);else A.redraw()}
 if(k==='time'){if(on(p,V.lineBox))place(d.i);else A.redraw()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='erupt'){t=top(V.won?'Ash and pumice from the sky, then hot ash clouds, buried Pompeii.':'Tap Vesuvius to move the clock on. What buries the town?',V.won);drawErupt(t)}
 if(k==='keep'){t=top(V.won?'The ash kept things safe for 1,700 years.':'Drag each thing into the ash, or tap it and then the ash.',V.won);drawKeep(t)}
 if(k==='cast'){t=top(V.won?'Plaster in a hollow gives the shape of what was there.':'Make a plaster cast. Tap the 4 steps in the right order.',V.won);drawCast(t)}
 if(k==='time'){t=top(V.won?'Lost for 1,700 years, then found again.':'Put the story in order. Drag the earliest card onto the timeline first, or tap it then the timeline.',V.won);drawTime(t)}
 if(k==='dig'){t=top(V.won?'Each find is a clue to everyday Roman life.':'Tap each patch of ash to dig. Then pick a find and the clue it gives.',V.won);drawDig(t)}
 if(k==='quiz'){t=top('Buried by ash in AD 79, kept for 1,700 years, found and studied today.');drawErupt(t)}
 strip();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='erupt'){const s=Q.ERUPT[V.e];d=`Hour ${s[0]}. Ash on Pompeii: ${s[1]} metres.`}
 if(k==='keep')d='In the ash: '+([...V.kept].map(i=>Q.KEEP[i][0]).join(', ')||'nothing yet')+(V.pick!=null?`. Picked: ${Q.KEEP[V.pick][0]}.`:'.');
 if(k==='cast')d=`Plaster cast: ${V.cs} of 4 steps done.`;
 if(k==='time')d='Timeline so far: '+(V.line.map(i=>Q.TIME[i][0]).join(', ')||'empty')+'.';
 if(k==='dig')d='Finds: '+Q.FINDS.map((f,i)=>V.dug[i]<2?'still buried':f[0]+(V.match[i]!=null?' (matched)':'')).join('; ')+'.';
 speak((V.msg?V.msg+' ':'')+d);keys();V.after()}
function keys(){if(!row)return;row.innerHTML='';const k=kind(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},row,t).onclick=()=>{fn();sync()}};
 if(k==='erupt'&&!V.won)b('Move the clock on',blast);
 if(k==='keep'&&!V.won)Q.KEEP.forEach((it,i)=>{if(!V.kept.has(i))b('Bury in ash: '+it[0],()=>bury(i))});
 if(k==='cast'&&!V.won)Q.CAST.forEach((s,i)=>{if(i>=V.cs)b(s,()=>castStep(i))});
 if(k==='time'&&!V.won)ORDER.forEach(i=>{if(!V.line.includes(i))b('Add to timeline: '+Q.TIME[i][1],()=>place(i))});
 if(k==='dig'&&!V.won){Q.FINDS.forEach((f,i)=>{if(V.dug[i]<2)b(`Dig patch ${i+1}`,()=>brush(i))});
  if(V.pick!=null)Q.CLUES.forEach((s,i)=>b(`${Q.FINDS[V.pick][0]} tells us: ${s}`,()=>match(V.pick,i)));
  else Q.FINDS.forEach((f,i)=>{if(V.dug[i]>=2&&V.match[i]==null)b('Pick: '+f[0],()=>{V.pick=i;A.sound.tick()})})}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){gen++;Object.assign(V,{after:()=>{},won:false,msg:'',bad:false,e:0,kept:new Set(),pick:null,drag:null,cs:0,line:[],dug:[0,0,0,0],match:{}})}
const steps=[
{h:'The day Vesuvius woke up',p:'Pompeii was a busy Roman town in Italy, about 10 km from a mountain called Vesuvius. People did not know Vesuvius was a volcano. In AD 79 it erupted.',
predict:{q:'What do you think buried Pompeii?',opts:['Rivers of red-hot lava','Ash and small stones falling from the sky','A huge wave from the sea'],ans:1},
task:'Tap Vesuvius until Pompeii is buried',show:()=>{steps[0].go();replay([1,2,3,4,5].map(()=>blast),550)},go:()=>{reset();sync();V.after=settle(0,()=>V.won,'Ash and pumice, then hot ash clouds. No lava.')}},
{h:'Kept by the ash',p:'Ash is made of tiny bits of rock. It packed tight around everything in the town, like a thick blanket, and later went hard.',
predict:{q:'What happens to things buried in ash for 1,700 years?',opts:['They all rot away to nothing','Many keep their shape, because ash shuts out air and rain','They all turn into solid stone'],ans:1},
task:'Bury all 5 things in the ash',show:()=>{steps[1].go();replay(Q.KEEP.map((_,i)=>()=>bury(i)),450)},go:()=>{reset();sync();V.after=settle(1,()=>V.won,'Ash is a great keeper.')}},
{h:'Plaster shapes',p:'Some people and animals could not escape. Over time their bodies rotted away inside the hard ash and left empty hollows. In 1863 an archaeologist, Giuseppe Fiorelli, found a way to see their shapes.',
predict:{q:'The shapes of people at Pompeii today are…',opts:['Statues the Romans carved','Plaster poured into hollows in the ash','The real people turned to stone'],ans:1},
task:'Make a plaster cast in the right order',show:()=>{steps[2].go();replay([0,1,2,3].map(i=>()=>castStep(i)),600)},go:()=>{reset();sync();V.after=settle(2,()=>V.won,'Find, pour, wait, dig.')}},
{h:'Lost and found',p:'After the eruption, the town lay hidden under the ground. People forgot where it was. Many hundreds of years later, diggers found it again.',
task:'Put the 5 story cards in time order',show:()=>{steps[3].go();replay([0,1,2,3,4].map(i=>()=>place(i)),420)},go:()=>{reset();sync();V.after=settle(3,()=>V.won,'AD 79 to 1748, and still digging today.')}},
{h:'Clues to Roman life',p:'Archaeologists study what they dig up to learn how people lived. Each find is a clue.',
task:'Dig up all 4 finds and match each to its clue',show:()=>{steps[4].go();replay([0,0,1,1,2,2,3,3].map(i=>()=>brush(i)).concat(Q.FINDS.map((f,i)=>()=>match(i,f[1]))),260)},go:()=>{reset();sync();V.after=settle(4,()=>V.won,'Bread, dogs, streets and writing.')}},
{h:'Challenge',p:'',go:()=>{reset();V.e=Q.ERUPT.length-1;V.won=true;ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>V.after()});
function ask(){qi++;const [q,ans,wr]=Q.bank[qi%Q.bank.length],all=[[ans,'ok']].concat(wr),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},pk,w).onclick=()=>grade(tag,ans)});speak('Challenge: '+q);A.redraw()}
let wins=0;
function grade(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=Q.WHYM[tag]||'Think about the ash: how it fell, and how it kept the town.';
 if(tag==='lava')m='No lava reached Pompeii. Pumice and ash fell from the sky, then hot ash clouds rushed over the town.';
 if(tag==='statue')m='They are not Roman statues: plaster was poured into hollows left in the ash, in the 1800s.';
 if(tag==='found')m='1748 is when digging began. Vesuvius buried the town long before, in AD 79.';
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+wins+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;row.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Pompeii lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
