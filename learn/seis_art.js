/* Data and drawings for flagseiswave (Seismic waves and Earth's interior; ages 11-13; KS3 science 'the structure of the
   Earth', GCSE Physics AQA 8463 4.6.1.5 seismic waves, NGSS HS-ESS2-3). Sources: USGS Earthquake Hazards Program,
   'Shadow zone' (no direct P waves 104 to 140 degrees from an earthquake; S waves stopped by the liquid core, P waves
   refracted by it); USGS 'The Interior of the Earth' (Oldham found the core in 1906; outer core liquid because it does
   not pass S waves; paths curve because speed changes with depth); Lehmann 1936 'P′' (faint P waves inside the shadow
   zone show a faster inner core); APS News 2023 on Jeffreys 1926 (liquid core); PREM, Dziewonski and Anderson 1981
   (core-mantle boundary at 2,891 km, inner core radius 1,221 km, Earth radius 6,371 km; P about 6 km/s and S about
   3.5 km/s in the upper crust). Slips it targets: P and S motion swapped; S waves through liquids; a fixed S-P gap;
   thinking people have drilled to the core; thinking the whole core is liquid or the whole core solid; S arriving first. */
const SEIS=(()=>{
const R_E=6371,R_OC=3480,R_IC=1220,VP=6,VS=3.5,SH1=104,SH2=140;
/* step 1: property cards; w: 0 = P wave, 1 = S wave */
const CARDS=[{t:'Rock moves back and forth along the path',w:0},{t:'Rock moves side to side, across the path',w:1},{t:'Fastest: arrives first',w:0},{t:'Slower: arrives second',w:1},{t:'Squashes and stretches the rock',w:0},{t:'Shears the rock sideways',w:1}];
const CARD_NO=['That is a push wave: the rock is squeezed and stretched along the direction the wave travels. That is P.','That is a shake wave: the rock moves across the direction of travel. That is S.',
 'P stands for primary because it arrives first. It is about 1.7 times as fast as S.','S stands for secondary: slower, so it arrives after P.','Squashing and stretching is compression, the P wave.','Shearing is the S wave. A liquid cannot pass on a shear.'];
/* step 2: does the wave get through? */
const TESTS=[{w:'P',m:'solid rock',ok:1},{w:'S',m:'solid rock',ok:1},{w:'P',m:'liquid',ok:1},{w:'S',m:'liquid',ok:0}];
const WHY=['A P wave squashes and stretches, and any solid can be squashed and spring back.','A solid is stiff, so a sideways shake on one layer drags the next layer with it. S gets through.',
 'A liquid can be squashed and pushes back, so P waves travel through liquids, more slowly than through rock.','A liquid just flows when it is sheared. Nothing pulls the next layer sideways, so the S wave stops.'];
/* step 3: S minus P lag at distance d (km) */
const lag=d=>Math.round(d/VS-d/VP),TARGET=[12,24,48],DMAX=500;
/* step 4: what arrives at a station theta degrees round the surface from the quake */
const zone=a=>a<SH1?0:a<=SH2?1:2,ZONE=['P and S arrive','No direct P or S: shadow zone','P only, no S'];
const SPOTS=[30,60,90,115,130,155,175];
/* step 5: clue to conclusion */
const CLUES=[{t:'S waves never arrive more than 104° from a quake',c:0},{t:'P waves bend at a sharp edge about 2,900 km down',c:1},{t:'Faint P waves turn up inside the shadow zone (Lehmann, 1936)',c:2},{t:'Wave paths curve as they go deeper',c:3}];
const CONC=['The outer core is liquid','The core has a boundary at 2,900 km','There is a solid inner core','Waves speed up deeper in the mantle'];
const CLUE_NO=['No S wave gets past 104° because something liquid stops it: the outer core.','A sharp bend means a sudden change of speed at a boundary: the top of the core, found by Gutenberg in 1914.',
 'Those faint P waves were bent by a faster layer inside the core. Lehmann concluded there is a solid inner core.','A path that curves back up means the speed keeps rising with depth, as the rock is squeezed harder.'];
const DESC=['Two drawings of a spring, and six cards about the waves. Sort each card into P wave or S wave.',
 'A wave, a block and two answer keys. For each test, say whether the wave gets through.',
 'A seismometer on a track from 0 to 500 km, and its trace. Drag the station until the S minus P gap matches the target.',
 'A cut-through Earth with an earthquake at the top. Place stations round the surface and see which waves arrive.',
 'Four clues from earthquake waves and four conclusions. Match each clue to what it tells us.'];
const TXT=['Earthquakes send out two kinds of body wave. Sort what you know about each.','Which waves get through a liquid?',
 'P arrives first, S later. The gap tells you how far away the quake was.','Nobody has drilled even 13 km down. Waves can see 6,371 km.','Each clue tells us something about Earth\'s hidden layers.'];
const DONE=['P waves push and pull along their path and arrive first. S waves shake across their path and come second.',
 'P waves cross solids and liquids. S waves stop at a liquid, because a liquid cannot pass on a sideways shear.',
 'Every 100 km adds about 12 s to the gap. Three stations and three distances pin down where the quake was.',
 'S waves vanish beyond 104°. Between 104° and 140° no direct waves arrive. Beyond 140°, P waves arrive through the core.',
 'Liquid outer core, a sharp core boundary, a solid inner core, and a mantle that gets faster with depth: all from waves.'];
const QS=[{q:'In a P wave, which way does the rock move?',a:'Back and forth along the path of the wave',o:[['Up and down, across the path','dir'],['It does not move at all','dir']]},
 {q:'Why do no S waves reach the far side of Earth from a quake?',a:'The outer core is liquid and stops them',o:[['The outer core is solid iron','solid'],['S waves are too slow to get there','order']]},
 {q:'Station B is further from the quake than station A. How does its S minus P gap compare?',a:'It is longer',o:[['It is the same','lag'],['It is shorter','lag']]},
 {q:'How do we know what the core is made of and whether it is liquid?',a:'From how earthquake waves travel through it',o:[['From rock drilled up from the core','drill'],['From lava at volcanoes','drill']]},
 {q:'Which wave arrives first at a seismometer?',a:'The P wave',o:[['The S wave','order'],['Both at the same time','order']]},
 {q:'Faint P waves arrive inside the shadow zone. What does that show?',a:'There is a solid inner core',o:[['The whole core is liquid','solid'],['The shadow zone is a mistake','drill']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',PC='#1d4ed8',SC='#7c3aed';
function spring(g,x,y,w,h,kind){g.strokeStyle=RIM;g.lineWidth=1;g.strokeRect(x,y,w,h);const n=24,sp=(w-20)/(n-1);
 for(let i=0;i<n;i++){const f=i/(n-1);let px=x+10+f*(w-20),py=y+h/2;if(kind===0)px+=Math.sin(f*Math.PI*4)*sp*.85;else py+=Math.sin(f*Math.PI*4)*h*.3;
  g.fillStyle=kind===0?PC:SC;g.beginPath();g.arc(px,py,Math.max(2,Math.min(sp*.3,h*.07)),0,7);g.fill()}
 g.strokeStyle=INK;g.lineWidth=2;const ay=y+h*.85,ax=x+w/2;g.beginPath();
 if(kind===0){g.moveTo(ax-18,ay);g.lineTo(ax+18,ay);g.moveTo(ax-18,ay);g.lineTo(ax-12,ay-4);g.moveTo(ax+18,ay);g.lineTo(ax+12,ay-4)}else{g.moveTo(x+12,y+h*.2);g.lineTo(x+12,y+h*.8);g.moveTo(x+12,y+h*.2);g.lineTo(x+8,y+h*.27);g.moveTo(x+12,y+h*.8);g.lineTo(x+8,y+h*.73)}g.stroke()}
function trace(g,x,y,w,h,d){g.fillStyle='#ffffff';g.fillRect(x,y,w,h);g.strokeStyle=RIM;g.lineWidth=1;g.strokeRect(x,y,w,h);const T=150,tp=d/VP,ts=d/VS,mid=y+h/2;
 g.strokeStyle=INK;g.lineWidth=1.4;g.beginPath();for(let i=0;i<=w;i++){const t=i/w*T;let a=.03;if(t>=tp)a=.18*Math.exp(-(t-tp)/25)+.05;if(t>=ts)a=.42*Math.exp(-(t-ts)/18)+.06;g.lineTo(x+i,mid+Math.sin(i*1.7)*Math.sin(i*.31)*a*h)}g.stroke();
 [[tp,'P',PC],[ts,'S',SC]].forEach(([t,l,c])=>{if(t>T)return;const px=x+t/T*w;g.strokeStyle=c;g.lineWidth=2.5;g.beginPath();g.moveTo(px,y+4);g.lineTo(px,y+h-4);g.stroke();g.fillStyle=c;g.font=`800 14${F}`;g.textAlign='left';g.textBaseline='top';g.fillText(l,px+3,y+3)});
 g.fillStyle=INK;g.font=`600 12${F}`;g.textAlign='right';g.textBaseline='bottom';g.fillText('time (s), 0 to 150',x+w-4,y+h-2)}
function earth(g,cx,cy,r,dark,found){const f=k=>r*k/R_E;g.fillStyle='#a16207';g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.fillStyle='#ea580c';g.beginPath();g.arc(cx,cy,f(R_OC),0,7);g.fill();
 g.fillStyle='#facc15';g.beginPath();g.arc(cx,cy,f(R_IC),0,7);g.fill();g.strokeStyle=dark?'#f1f5f9':INK;g.lineWidth=2;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();
 if(found&&found[1]){g.strokeStyle='#dc2626';g.lineWidth=7;[1,-1].forEach(s=>{g.beginPath();g.arc(cx,cy,r+5,-Math.PI/2+s*SH1*Math.PI/180,-Math.PI/2+s*SH2*Math.PI/180,s<0);g.stroke()})}
 if(found&&found[2]){g.strokeStyle='#2563eb';g.lineWidth=7;[1,-1].forEach(s=>{g.beginPath();g.arc(cx,cy,r+5,-Math.PI/2+s*SH2*Math.PI/180,Math.PI/2,s<0);g.stroke()})}
 g.fillStyle='#dc2626';g.beginPath();const sx=cx,sy=cy-r;for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r*.04:r*.09;g.lineTo(sx+Math.cos(a)*q,sy+Math.sin(a)*q)}g.closePath();g.fill()}
function ray(g,cx,cy,r,a,col,lw){const t=a*Math.PI/180,sx=cx,sy=cy-r,ex=cx+r*Math.sin(t),ey=cy-r*Math.cos(t);g.strokeStyle=col;g.lineWidth=lw||2.5;g.setLineDash(zone(a)===1?[6,5]:[]);g.beginPath();g.moveTo(sx,sy);
 if(zone(a)===2)g.quadraticCurveTo(cx+r*.12*Math.sin(t),cy,ex,ey);else{const k=zone(a)===0?.55+.25*(a/104):.5,mx=(sx+ex)/2,my=(sy+ey)/2;g.quadraticCurveTo(cx+(mx-cx)*k,cy+(my-cy)*k,ex,ey)}g.stroke();g.setLineDash([])}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.1),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,14+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||15),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=10)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=o.top?r.y+6+L.length*n*.6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 return{wrap,strip,card,sz,fg,dk,INK,F}}
return{R_E,SH1,SH2,DMAX,CARDS,CARD_NO,TESTS,WHY,lag,TARGET,zone,ZONE,SPOTS,CLUES,CONC,CLUE_NO,DESC,TXT,DONE,QS,PC,SC,spring,trace,earth,ray,PEN}})();
