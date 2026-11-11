/* Flagship 20 – reading wave diagrams and graphs. Two graphs of the same wave, stacked: the top one is a snapshot
   (displacement against distance, at one moment) and the bottom one is the record of one red buoy (displacement against
   time). They look alike, so the learner has to read the axes. Measuring markers can be dragged on either graph (or moved
   with buttons that step to the next grid point or the next crest, trough or zero), and the gap is read out with its unit.
   Predictions target "amplitude is crest to trough", "a wavelength is crest to trough", "the peaks on a time graph are a
   wavelength", "a time change does not show on a distance graph" and "frequency = period". Challenge: read a quantity
   (amplitude, wavelength, period or frequency) off a new wave and give the unit, with feedback for crest-to-trough
   doubling, half waves, reading the wrong graph, mixing up period and frequency, and a wrong unit. */
(()=>{const SPAN=4,YMAX=6,X0=1,TAU=Math.PI*2;
 const r2=v=>{const r=Math.round(v*100)/100;return (r<0?'−':'')+Math.abs(r)};
 const eq=(a,b,t=.011)=>Math.abs(a-b)<t;
 const UNIT={dist:'m',time:'s'};
VIS.reg('flagwread',c=>{let A,chal,sand,read,gapOut,dirBtns,panelBtns,playBtn,onScreen=true;
 const st={amp:4,T:2,v:.8,t:0,play:false,touched:false,mk:{panel:'dist',dir:'up',a:-1,b:1,sel:1},drag:null,chk:()=>{},q:null,won:false,hideVals:false};
 const lam=()=>st.v*st.T;
 /* Displacement (cm) at distance x (m) and time t (s); the wave travels to the right. */
 const disp=(x,t)=>st.amp*Math.sin(TAU*(x/lam()-t/st.T));
 /* x positions (m) on the snapshot, or times (s) on the buoy's record, where the curve has a crest, trough or zero. */
 function features(panel){const out=[],q=panel==='dist'?lam():st.T;
  // phase(u) = u/q − shift on the snapshot, shift − u/q on the record; quarter-turns of phase are the features
  const shift=panel==='dist'?st.t/st.T:X0/lam();
  for(let k=-40;k<=40;k++){const u=panel==='dist'?q*(k/4+shift):q*(shift-k/4);if(u>=-1e-9&&u<=SPAN+1e-9)out.push(Math.round(u*1e6)/1e6)}
  return out.sort((a,b)=>a-b)}
 const crests=panel=>features(panel).filter(u=>eq(panel==='dist'?disp(u,st.t):disp(X0,u),st.amp,1e-6));
 /* Marker stops: grid points plus the curve's features (across), or the half-centimetre grid plus 0 and ±amplitude (up). */
 function stops(){const m=st.mk,s=new Set();if(m.dir==='across'){for(let i=0;i<=SPAN/0.05;i++)s.add(Math.round(i*5)/100);features(m.panel).forEach(u=>s.add(u))}
  else{for(let i=-YMAX*2;i<=YMAX*2;i++)s.add(i/2);[st.amp,-st.amp,0].forEach(u=>s.add(u))}return [...s].sort((a,b)=>a-b)}
 function snap(v){const m=st.mk,f=m.dir==='across'?features(m.panel):[st.amp,-st.amp,0],near=f.find(u=>Math.abs(u-v)<(m.dir==='across'?.07:.35));
  if(near!==undefined)return near;return m.dir==='across'?Math.max(0,Math.min(SPAN,Math.round(v*20)/20)):Math.max(-YMAX,Math.min(YMAX,Math.round(v*2)/2))}
 const gap=()=>Math.abs(st.mk.a-st.mk.b);
 const unitOf=()=>st.mk.dir==='up'?'cm':UNIT[st.mk.panel];
 // ---------- layout ----------
 /* Two panels stacked: 26 px for each title, 32 px under each for the axis numbers and name. */
 function geo(A){const{W,H}=A,l=A.narrow?40:50,r=12,top=26,under=32,hint=28,ph=(H-2*top-2*under-hint)/2;   // 'hint': a strip under the graphs for the drag hint, so it never sits on a graph title
  const mk=(y,kind)=>({kind,x:l,y,w:W-l-r,h:ph});return{dist:mk(top,'dist'),time:mk(top+ph+under+top,'time')}}
 const px=(P,u)=>P.x+P.w*u/SPAN, py=(P,v)=>P.y+P.h/2-v*P.h/(2*YMAX);
 // ---------- words ----------
 const listU=(a,u)=>a.length?a.map(r2).join(', ')+' '+u:'none on screen';
 function describe(){const m=st.mk,hv=st.hideVals;
  const top=`Top graph, displacement against distance at t = ${r2(st.t)} s: crests at ${listU(crests('dist'),'m')}${hv?'':`, amplitude ${r2(st.amp)} cm, wavelength ${r2(lam())} m`}.`;
  const bot=`Bottom graph, displacement of the buoy at ${X0} m against time: crests at ${listU(crests('time'),'s')}${hv?'':`, period ${r2(st.T)} s, frequency ${r2(1/st.T)} Hz`}.`;
  const where=m.panel==='dist'?'top':'bottom',axis=m.dir==='across'?(m.panel==='dist'?'distance':'time'):'displacement';
  return `${top} ${bot} Markers on the ${where} graph, measuring ${axis}: ${r2(m.a)} and ${r2(m.b)} ${unitOf()}, gap ${r2(gap())} ${unitOf()}.`}
 function updateRead(){if(!read)return;const u=unitOf();
  read.innerHTML=(st.hideVals?'':`<span class="fl-chip"><b>Amplitude</b> ${r2(st.amp)} cm</span> <span class="fl-chip"><b>Wavelength</b> ${r2(lam())} m</span> <span class="fl-chip"><b>Period</b> ${r2(st.T)} s</span> <span class="fl-chip"><b>Frequency</b> ${r2(1/st.T)} Hz</span> `)+`<span class="fl-chip"><b>Speed</b> ${r2(st.v)} m/s</span>`;
  gapOut.innerHTML=`📏 Marker ${st.mk.sel+1} selected. Markers at ${r2(st.mk.a)} and ${r2(st.mk.b)} ${u}: <b>gap ${r2(gap())} ${u}</b>`;
  dirBtns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===st.mk.dir)));panelBtns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===st.mk.panel)));
  selBtns.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===st.mk.sel)));
  nudgeBtns.forEach(b=>{const k=+b.dataset.k,big=Math.abs(k)>1;b.textContent=st.mk.dir==='across'?(k<0?(big?'⏮ feature':'◀ 0.05'):(big?'feature ⏭':'0.05 ▶')):(k<0?(big?'⏬ feature':'▼ 0.5'):(big?'feature ⏫':'▲ 0.5'));
   b.setAttribute('aria-label',`Move marker ${st.mk.sel+1} ${st.mk.dir==='across'?(k<0?'left':'right'):(k<0?'down':'up')} ${big?'to the next crest, trough or zero':st.mk.dir==='across'?'by 0.05':'by half a centimetre'}`)})}
 let selBtns=[],nudgeBtns=[];
 const say=()=>{const d=describe();c.say(d);A&&A.cv.setAttribute('aria-label','Two wave graphs. '+d);updateRead()};
 // ---------- actions ----------
 function setTool(panel,dir,a,b){Object.assign(st.mk,{panel,dir,a,b,sel:1});say();A.redraw()}
 function setMarker(i,v,quiet){st.mk[i?'b':'a']=v;st.touched=true;if(!quiet)say();A.redraw()}
 /* Step the selected marker to the next stop (small) or the next feature (big) in the direction of k. */
 function nudge(k){const m=st.mk,cur=m.sel?m.b:m.a,big=Math.abs(k)>1,dir=Math.sign(k);
  const list=big?(m.dir==='across'?features(m.panel):[-st.amp,0,st.amp]):stops();
  const next=dir>0?list.find(u=>u>cur+1e-6):[...list].reverse().find(u=>u<cur-1e-6);
  if(next===undefined)return;pause();setMarker(m.sel,next);st.chk()}
 function pause(){if(st.play){st.play=false;playBtn&&syncPlay()}}
 function syncPlay(){playBtn.setAttribute('aria-pressed',String(st.play));playBtn.textContent=A.reduced()?'Move on 0.25 s':st.play?'⏸ Pause the wave':'▶ Play the wave'}
 function togglePlay(){if(A.reduced()){st.t=Math.round((st.t+.25)*100)/100;say();A.redraw();return}st.play=!st.play;syncPlay();if(st.play)A.kick();else say()}
 function glideMarkers(a,b,done){st.touched=true;pause();A.tween(st.mk,{a,b},700,'io',()=>{st.mk.a=a;st.mk.b=b;say();A.redraw();done&&done()})}
 function setWave(o){Object.assign(st,o);say();A.redraw()}
 // ---------- drawing ----------
 function drawPanel(A,P){const{ctx,paint:Pt,col:C}=A,active=st.mk.panel===P.kind,isD=P.kind==='dist',curveCol=isD?C.cy:C.pk;
  ctx.fillStyle=A.alpha(active?C.am:C.ln,active?.07:.06);Pt.rrect(P.x-6,P.y-6,P.w+12,P.h+12,10);ctx.fill();
  if(active){ctx.strokeStyle=A.alpha(C.am,.55);ctx.lineWidth=1.5;Pt.rrect(P.x-6,P.y-6,P.w+12,P.h+12,10);ctx.stroke()}
  ctx.font='600 11px system-ui';ctx.lineWidth=1;
  // vertical grid: every 0.25 (labels every 1 on phones, 0.5 on wide screens)
  const lab=A.narrow?1:.5;for(let u=0;u<=SPAN+1e-9;u+=.25){const X=px(P,u),major=Math.abs(u/lab-Math.round(u/lab))<1e-6;ctx.strokeStyle=A.alpha(C.tx,major?.18:.07);ctx.beginPath();ctx.moveTo(X,P.y);ctx.lineTo(X,P.y+P.h);ctx.stroke();
   if(major){ctx.fillStyle=A.alpha(C.tx,.85);ctx.textAlign='center';ctx.fillText(r2(u),X,P.y+P.h+13)}}
  for(let v=-YMAX;v<=YMAX;v++){const Y=py(P,v);ctx.strokeStyle=A.alpha(C.tx,v===0?.55:v%2?.05:.12);ctx.lineWidth=v===0?1.5:1;ctx.beginPath();ctx.moveTo(P.x,Y);ctx.lineTo(P.x+P.w,Y);ctx.stroke();
   if(v%2===0){ctx.fillStyle=A.alpha(C.tx,.85);ctx.textAlign='right';ctx.fillText(r2(v),P.x-6,Y+4)}}
  ctx.textAlign='right';ctx.fillStyle=A.alpha(C.tx,.9);ctx.fillText(isD?'distance (m)':'time (s)',P.x+P.w,P.y+P.h+26);
  ctx.save();ctx.translate(P.x-(A.narrow?28:36),P.y+P.h/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillText('displacement (cm)',0,0);ctx.restore();
  Pt.label(isD?`Displacement–distance: a snapshot at t = ${r2(st.t)} s`:`Displacement–time: the buoy at ${X0} m`,P.x-4,P.y-13,{align:'left',font:'700 11px system-ui',bg:A.alpha(curveCol,.95),col:C.dark?'#0b1220':'#fff'});
  // the wave
  ctx.strokeStyle=curveCol;ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=P.w;i++){const u=SPAN*i/P.w,v=isD?disp(u,st.t):disp(X0,u),X=P.x+i,Y=py(P,v);i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)}ctx.stroke();
  // the buoy: where it is on the snapshot, and "now" on its own record
  const bu=isD?X0:((st.t%SPAN)+SPAN)%SPAN,bv=disp(X0,st.t);ctx.setLineDash([4,4]);ctx.strokeStyle=A.alpha(C.rd,.6);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(px(P,bu),P.y);ctx.lineTo(px(P,bu),P.y+P.h);ctx.stroke();ctx.setLineDash([]);
  Pt.shadow(6,2,.3);Pt.ball(px(P,bu),py(P,bv),7,C.rd);Pt.noShadow();
  if(active)drawMarkers(A,P)}
 function drawMarkers(A,P){const{ctx,paint:Pt,col:C}=A,m=st.mk,ink='#111',u=unitOf();
  const pos=v=>m.dir==='across'?px(P,v):py(P,v);
  [m.a,m.b].forEach((v,i)=>{const p=pos(v),selected=i===m.sel;ctx.strokeStyle=A.alpha(C.am,selected?1:.75);ctx.lineWidth=selected?2.5:1.8;ctx.beginPath();
   if(m.dir==='across'){ctx.moveTo(p,P.y-2);ctx.lineTo(p,P.y+P.h+2)}else{ctx.moveTo(P.x-2,p);ctx.lineTo(P.x+P.w+2,p)}ctx.stroke();
   const hx=m.dir==='across'?p:P.x+P.w-14-i*30,hy=m.dir==='across'?P.y+P.h-12-i*0:p;Pt.shadow(6,2,.3);Pt.ball(hx,hy,selected?10:8,C.am);Pt.noShadow();
   ctx.fillStyle=ink;ctx.font='700 11px system-ui';ctx.textAlign='center';ctx.fillText(String(i+1),hx,hy+4)});
  // the gap, with a double arrow and its unit
  const p0=pos(m.a),p1=pos(m.b);ctx.strokeStyle=C.am;ctx.fillStyle=C.am;ctx.lineWidth=2;
  if(Math.abs(p1-p0)>4){ctx.beginPath();if(m.dir==='across'){const y=P.y+P.h*.12;ctx.moveTo(p0,y);ctx.lineTo(p1,y)}else{const x=P.x+P.w*.88;ctx.moveTo(x,p0);ctx.lineTo(x,p1)}ctx.stroke()}
  const lx=m.dir==='across'?(p0+p1)/2:P.x+P.w*.88-8,ly=m.dir==='across'?P.y+P.h*.12-1:(p0+p1)/2;
  Pt.label(`${r2(gap())} ${u}`,lx,ly,{font:'700 12px system-ui',bg:A.alpha(C.am,.97),col:ink,align:m.dir==='across'?undefined:'right'})}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(A);ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.04)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  drawPanel(A,G.dist);drawPanel(A,G.time);
  if(!st.touched)P.label('👆 drag a marker on the graph',W/2,H-13,{pill:1,bg:A.alpha(C.am,.95),col:'#111'})}
 // ---------- steps ----------
 const fresh=(o,tool)=>{st.play=false;st.t=0;st.hideVals=false;Object.assign(st,{amp:4,T:2,v:.8},o);setTool(...tool);if(playBtn)syncPlay()};
 const tell=t=>c.say(t);
 const steps=[
  {h:'Amplitude: from the middle',p:'The top graph is a snapshot of a wave on a rope. Across is distance along the rope, in metres. Up is how far the rope is from where it rests, in centimetres. That is called displacement.',
   predict:{q:'The rope goes 4 cm above the middle line and 4 cm below it. What is the amplitude?',opts:['8 cm, from the top to the bottom','4 cm, from the middle line to the top','It depends on how long the wave is'],ans:1},
   task:'Put one marker on the middle line and one on a crest',show:()=>glideMarkers(0,4,()=>st.chk()),
   go:()=>{fresh({},['dist','up',-1,1]);st.chk=()=>{const m=st.mk,lo=Math.min(m.a,m.b),hi=Math.max(m.a,m.b);
    if((eq(lo,0)&&eq(hi,st.amp))||(eq(hi,0)&&eq(lo,-st.amp)))A.done('Gap 4 cm: that is the amplitude, the biggest displacement from the rest position. Crest to trough is 8 cm, twice the amplitude.'+A.reveal(0));
    else if(eq(gap(),2*st.amp))tell('That gap is 8 cm, from a crest down to a trough. That is twice the amplitude. Move one marker to the middle line.')}}},
  {h:'Wavelength: one whole wave',p:'One wavelength is the length of one whole wave: the distance from a point to the next point doing exactly the same thing.',
   predict:{q:'On this graph, one wavelength is the distance from…',opts:['a crest to the next trough','a crest to the next crest','the start of the graph to the end'],ans:1},
   task:'Put the markers one wavelength apart',show:()=>{const c2=crests('dist');glideMarkers(c2[0],c2[1],()=>st.chk())},
   go:()=>{fresh({},['dist','across',.25,1]);st.chk=()=>{const g=gap();
    if(eq(g,lam()))A.done('Gap 1.6 m: one wavelength. Crest to crest, trough to trough, or one upward zero to the next all give the same 1.6 m.'+A.reveal(1));
    else if(eq(g,lam()/2))tell('That gap is 0.8 m, from a crest to a trough. That is only half a wave. Go on to the next crest.');
    else if(eq(g,2*lam()))tell('That gap is 3.2 m: two whole waves. Look for the next crest along, not the one after it.')}}},
  {h:'The time graph',p:'The bottom graph follows one red buoy sitting on the rope at 1 m. Across is now time, in seconds. Up is still displacement. The buoy only moves up and down.',
   predict:{q:'The bottom graph looks like the top one, and its crests are 2 apart. What does that 2 tell you?',opts:['The wavelength is 2 m','The buoy takes 2 s for one up-and-down','The wave is 2 cm tall'],ans:1},
   task:'On the bottom graph, put the markers one full wave apart',show:()=>{const c2=crests('time');glideMarkers(c2[0],c2[1],()=>st.chk())},
   go:()=>{fresh({},['time','across',.25,1]);st.chk=()=>{const g=gap();
    if(eq(g,st.T))A.done('Gap 2 s: the period, the time for one full up-and-down. A time graph gives the period, not the wavelength, because its axis is in seconds.'+A.reveal(2));
    else if(eq(g,st.T/2))tell('That gap is 1 s, from a crest to a trough: half a wave. Go on to the next crest.')}}},
  {h:'Same wave, two graphs',p:'The wave moves at 0.8 m/s, and the rope sets that speed. You can change how fast the hand wiggles: that is the period.',
   predict:{q:'You halve the period, so the hand wiggles twice as fast. What happens on the top graph?',opts:['Nothing: the top graph shows distance, not time','The crests get closer: the wavelength halves','The crests get taller'],ans:1},
   task:'Make the period 1 s with the Period buttons',show:()=>{st.touched=true;A.tween(st,{T:1},1200,'io',()=>{st.T=1;say();st.chk()})},
   go:()=>{fresh({},['time','across',.25,1]);st.chk=()=>{if(eq(st.T,1))A.done('Period 1 s, so the bottom crests are 1 s apart. The wave still moves 0.8 m/s, so in one period it moves 0.8 m: the wavelength halved from 1.6 m to 0.8 m. Wavelength = speed × period.'+A.reveal(3))}}},
  {h:'Waves per second',p:'Frequency is how many whole waves pass the buoy each second. It is measured in hertz (Hz).',
   predict:{q:'This wave has a period of 0.5 s. How many waves pass the buoy each second?',opts:['0.5','2','5'],ans:1},
   task:'Mark 1 second on the bottom graph and count the waves',show:()=>glideMarkers(0,1,()=>st.chk()),
   go:()=>{fresh({T:.5},['time','across',.25,.5]);st.chk=()=>{if(eq(gap(),1))A.done('In 1 s the buoy goes up and down 2 times, so the frequency is 2 Hz. Frequency = 1 ÷ period = 1 ÷ 0.5 s. The period and the frequency are not the same number.'+A.reveal(4))}}},
  {h:'Sandbox',p:'Play the wave, change it, and measure on either graph. Tap a graph to put the markers on it. Check: speed = wavelength ÷ period.',go:()=>{fresh({},['dist','across',.25,1]);st.chk=()=>{};st.play=!A.reduced();syncPlay();A.kick()}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5&&A.step!==3;sand.querySelectorAll('[data-only]').forEach(b=>b.hidden=A.step===3&&b.dataset.only!=='T');if(A.step!==6)st.hideVals=false;say()},
  init:A=>{const E=c.el,ctl=E('div',{class:'fl-below'},A.below);read=E('div',{class:'fl-read'},ctl);gapOut=E('p',{class:'fl-read'},ctl);chal=E('div',{class:'fl-chal'},A.below);
   const r=E('div',{class:'fl-ctl',role:'group','aria-label':'Move the markers'},ctl);
   selBtns=[0,1].map(i=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-pressed':'false'},r,`Marker ${i+1}`);b.onclick=()=>{st.mk.sel=i;say();A.redraw()};return b});
   nudgeBtns=[-2,-1,1,2].map(k=>{const b=E('button',{type:'button',class:'lbtn sm ghost','data-k':String(k)},r,'');b.onclick=()=>nudge(k);return b});
   const t=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose what to measure'},ctl);
   panelBtns=[['dist','Top graph'],['time','Bottom graph']].map(([v,l])=>{const b=E('button',{type:'button',class:'lbtn sm ghost','data-v':v,'aria-pressed':'false'},t,l);b.onclick=()=>switchPanel(v);return b});
   dirBtns=[['across','Measure across'],['up','Measure up']].map(([v,l])=>{const b=E('button',{type:'button',class:'lbtn sm ghost','data-v':v,'aria-pressed':'false'},t,l);b.onclick=()=>switchDir(v);return b});
   playBtn=E('button',{type:'button',class:'lbtn sm ghost','aria-pressed':'false'},t,'');playBtn.onclick=togglePlay;syncPlay();
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Change the wave'},ctl);
   const knob=(key,label,unit,lo,hi,step)=>[[-1,'−'],[1,'+']].forEach(([s,sym])=>{const b=E('button',{type:'button',class:'lbtn sm ghost','data-only':key,'aria-label':`${s<0?'Decrease':'Increase'} the ${label.toLowerCase()}`},sand,`${label} ${sym}`);
    b.onclick=()=>{st.touched=true;st[key]=Math.round(Math.max(lo,Math.min(hi,st[key]+s*step))*100)/100;say();A.redraw();st.chk()}});
   knob('amp','Amplitude','cm',1,5,.5);knob('T','Period','s',.5,4,.5);knob('v','Speed','m/s',.2,1.6,.2);
   if(typeof IntersectionObserver!=='undefined'){const io=new IntersectionObserver(e=>{onScreen=e[0].isIntersecting;if(onScreen)A.kick()});io.observe(A.cv);c.stops.push(()=>io.disconnect())}
   // the wave moves only while playing and on screen; the snapshot's time is shown on the top graph
   let acc=0;A.every(dt=>{if(!(st.play&&onScreen&&!A.reduced()))return false;st.t+=dt*.5;acc+=dt;if(acc>.5){acc=0;say()}return true});
   // drag a marker: grab the nearest one in the measured direction, or pull the selected one to the finger
   const panelAt=p=>{const G=geo(A);return['dist','time'].find(k=>{const P=G[k];return p.x>=P.x-8&&p.x<=P.x+P.w+8&&p.y>=P.y-8&&p.y<=P.y+P.h+8})};
   const valueAt=p=>{const P=geo(A)[st.mk.panel];return st.mk.dir==='across'?(p.x-P.x)/P.w*SPAN:(P.y+P.h/2-p.y)/P.h*2*YMAX};
   A.gest({down:p=>{const k=panelAt(p);if(!k)return false;
     if(k!==st.mk.panel){if(A.step===5||A.step===6)switchPanel(k);else{tell(`This step measures on the ${st.mk.panel==='dist'?'top':'bottom'} graph.`);return false}}
     const P=geo(A)[k],pos=v=>st.mk.dir==='across'?px(P,v):py(P,v),here=st.mk.dir==='across'?p.x:p.y,da=Math.abs(pos(st.mk.a)-here),db=Math.abs(pos(st.mk.b)-here);
     if(Math.min(da,db)<28)st.mk.sel=da<db?0:1;pause();st.drag=true;setMarker(st.mk.sel,snap(valueAt(p)),true);updateRead();return true},
    move:p=>{if(!st.drag)return;const v=snap(valueAt(p));if(v!==(st.mk.sel?st.mk.b:st.mk.a)){setMarker(st.mk.sel,v,true);updateRead()}},
    up:()=>{if(!st.drag)return;st.drag=false;say();st.chk()}});
   say()}});
 function switchPanel(k){const dir=st.mk.dir;setTool(k,dir,dir==='across'?.25:-1,dir==='across'?1:1)}
 function switchDir(d){setTool(st.mk.panel,d,d==='across'?.25:-1,1)}
 // ---------- challenge: read one quantity off a new wave, with its unit ----------
 const TARGETS=[{ask:'period',amp:3,T:1.5,v:.8},{ask:'wavelength',amp:5,T:1,v:1.2},{ask:'amplitude',amp:2,T:2,v:.5},{ask:'frequency',amp:4,T:.5,v:1.6},
  {ask:'wavelength',amp:3,T:2.5,v:.8},{ask:'period',amp:5,T:.8,v:1.5},{ask:'amplitude',amp:4.5,T:1,v:.8},{ask:'frequency',amp:3,T:.4,v:1.5}];let qi=-1;
 const RIGHT={amplitude:'cm',wavelength:'m',period:'s',frequency:'Hz'};
 function newChal(){qi=(qi+1)%TARGETS.length;const q=TARGETS[qi];st.q=q;st.won=false;fresh({amp:q.amp,T:q.T,v:q.v},['dist','across',.25,1]);st.hideVals=true;st.chk=()=>{};say();
  chal.innerHTML=`<p><b>What is the ${q.ask} of this wave?</b> Measure it on the right graph, then give the number and the unit.</p><label>Answer <input type="text" inputmode="decimal" class="fl-in" aria-label="your answer, a number"></label> <label>Unit <select class="fl-unit" aria-label="unit"><option value="">choose</option><option>cm</option><option>m</option><option>s</option><option>Hz</option></select></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge}
 /* Name the slip behind a wrong answer: a doubled amplitude, half a wave, the wrong graph, period for frequency, or a wrong unit. */
 function judge(){const fb=chal.querySelector('.fl-fb'),q=st.q;if(!q||st.won)return;const raw=chal.querySelector('.fl-in').value.trim().replace('−','-').replace(',','.'),unit=chal.querySelector('.fl-unit').value;
  const n=parseFloat(raw);if(!isFinite(n)){fb.textContent='Type a number first, for example 1.5.';return}
  const want={amplitude:q.amp,wavelength:q.v*q.T,period:q.T,frequency:1/q.T}[q.ask];
  if(eq(n,want,.02)&&unit===RIGHT[q.ask]){st.won=true;fb.innerHTML=`✓ ${q.ask[0].toUpperCase()+q.ask.slice(1)} = ${r2(want)} ${RIGHT[q.ask]}. ${q.ask==='frequency'?`The period is ${r2(q.T)} s, and 1 ÷ ${r2(q.T)} = ${r2(want)}.`:q.ask==='amplitude'?'Measured from the rest line to a crest.':q.ask==='wavelength'?'Crest to crest on the distance graph.':'Crest to crest on the time graph.'} <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
  A.sound.miss();let m;const lamQ=q.v*q.T;
  if(q.ask==='amplitude'&&eq(n,2*q.amp,.02))m=`${r2(n)} is the height from a crest down to a trough: twice the amplitude. Measure from the middle line (0) to a crest.`;
  else if((q.ask==='wavelength'&&eq(n,lamQ/2,.02))||(q.ask==='period'&&eq(n,q.T/2,.02)))m=`${r2(n)} is from a crest to a trough: half a wave. One whole wave goes from a crest to the next crest.`;
  else if(q.ask==='wavelength'&&eq(n,q.T,.02))m=`${r2(n)} is the crest-to-crest gap on the bottom graph. Its axis is time, so that gap is the period. The wavelength comes from the top graph, in metres.`;
  else if(q.ask==='period'&&eq(n,lamQ,.02))m=`${r2(n)} is the crest-to-crest gap on the top graph. Its axis is distance, so that gap is the wavelength. The period comes from the bottom graph, in seconds.`;
  else if(q.ask==='frequency'&&eq(n,q.T,.02))m=`${r2(n)} s is the period: the time for one wave. Frequency is how many waves fit in one second, so it is 1 ÷ period.`;
  else if(q.ask==='period'&&eq(n,1/q.T,.02))m=`${r2(n)} is the frequency, waves per second. The period is the time for one wave: read it as a gap on the time axis.`;
  else if(eq(n,want,.02))m=`The number is right, but the unit is not. ${q.ask==='amplitude'?'Displacement is in centimetres here.':q.ask==='wavelength'?'A wavelength is a length, read off a distance axis in metres.':q.ask==='period'?'A period is a time, read off a time axis in seconds.':'Waves per second is measured in hertz.'}`;
  else if(q.ask!=='amplitude'&&(eq(n,q.amp,.02)||eq(n,2*q.amp,.02)))m=`${r2(n)} cm is an up-and-down size. The ${q.ask} is ${q.ask==='frequency'?'worked out from':'a gap along'} the horizontal axis.`;
  else m=`Not ${r2(n)}. Put the markers on the ${q.ask==='wavelength'||q.ask==='amplitude'?'top':'bottom'} graph, ${q.ask==='amplitude'?'measuring up from 0 to a crest':'measuring across from one crest to the next'}, and read the gap.${q.ask==='frequency'?' Then work out 1 ÷ that time.':''}`;
  fb.textContent=m}
 A.start()})})();
