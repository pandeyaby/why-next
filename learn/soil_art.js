/* Data and drawings for flagsoil (rocks and soil; Science, ages 7-8). Sources: National Curriculum in England (2013),
   Science Year 3 Rocks ('recognise that soils are made from rocks and organic matter'; non-statutory: explore different
   kinds of soil); USDA soil texture classes (sand 0.05-2 mm, silt 0.002-0.05 mm, clay under 0.002 mm); a typical loam
   is about 45% mineral, 5% organic matter, 25% water and 25% air by volume (USDA NRCS soil survey teaching material);
   FAO (2015) International Year of Soils fact sheets ('it can take up to 1,000 years to produce 1 cm of soil');
   Royal Horticultural Society guidance on sandy, clay and loam soils; the settling-jar (shake test) used by RHS and
   soil scientists. Drain figures in the water test are a classroom-style demonstration, in the order real tests give.
   Slips it targets: soil is just crushed rock or just dirt; the tiniest bits settle first; clay lets water through
   fastest because it is smooth; sandy soil is best for every plant; soil forms in a few years. */
const SOIL=(()=>{
/* step 1: what goes in the jar; ok 1 = part of soil */
const PARTS=[{t:'Rock bits',e:'\u{1FAA8}',ok:1,col:'#a16207'},{t:'Plastic',e:'\u{1F964}',ok:0,why:'Plastic is litter. It does not rot into soil, it pollutes it.'},{t:'Humus',e:'\u{1F342}',ok:1,col:'#3f2a14'},
 {t:'Water',e:'\u{1F4A7}',ok:1,col:'#38bdf8'},{t:'Sugar',e:'\u{1F36C}',ok:0,why:'Sugar is food we make. It is not one of the parts of soil.'},{t:'Air',e:'\u{1F32C}\uFE0F',ok:1,col:'#e2e8f0'},{t:'Worms and microbes',e:'\u{1FAB1}',ok:1,col:'#f472b6'}];
const MIX=[['Rock bits',45,'#a16207'],['Water',25,'#0ea5e9'],['Air',25,'#cbd5e1'],['Humus',5,'#3f2a14']];
/* step 2: settling jar, bottom to top; size in mm */
const LAYERS=[{t:'Sand',mm:'0.05 to 2 mm',col:'#eab308',h:.34},{t:'Silt',mm:'0.002 to 0.05 mm',col:'#a8a29e',h:.22},{t:'Clay',mm:'under 0.002 mm',col:'#c2410c',h:.16},{t:'Humus',mm:'floats',col:'#3f2a14',h:.06}];
const LAYER_WHY=['Sand grains are the biggest and heaviest, so they sink first, to the bottom.','Silt bits are middle-sized, so they settle on top of the sand.','Clay bits are the tiniest, so they settle last, on top. Some stay in the water for a day.','Humus is light rotted plant bits, so it floats on top of the water.'];
/* step 3: water test: 100 ml poured on each; ml through after one minute */
const POTS=[{t:'Sandy',ml:80,col:'#eab308',dots:[3,1]},{t:'Loam',ml:50,col:'#78350f',dots:[2,2]},{t:'Clay',ml:15,col:'#c2410c',dots:[1,3]}];
/* step 4: jobs; s = soil index in POTS */
const JOBS=[{t:'A veg patch for most plants',e:'\u{1F955}',s:1,why:'Loam holds some water and food but drains well, so most vegetables grow best in it.'},
 {t:'Lining a pond to hold water',e:'\u{1F986}',s:2,why:'Clay lets very little water through, so it holds water in a pond.'},
 {t:'A cactus that hates wet roots',e:'\u{1F335}',s:0,why:'Sandy soil drains fast and dries out, so cactus roots do not sit in water.'},
 {t:'Making pots and bricks',e:'\u{1F3FA}',s:2,why:'Wet clay is sticky and can be shaped, and it goes hard when it is baked.'},
 {t:'A pitch that must dry fast after rain',e:'\u26BD',s:0,why:'Sand lets rain drain through quickly, so the pitch is not muddy for long.'}];
/* step 5: how soil forms, in order */
const MAKE=[{t:'Rain, ice and roots crack the rock',e:'\u{1F9CA}'},{t:'Bits break off and get smaller',e:'\u{1FAA8}'},{t:'Plants grow, die and rot into humus',e:'\u{1F342}'},{t:'Worms mix humus into the rock bits',e:'\u{1FAB1}'}];
const MAKE_SHOW=[2,0,3,1];
const MAKE_WHY=['First the rock has to crack. Water freezes in cracks, and roots push in.','The cracked rock breaks into smaller and smaller bits.','Plants grow in the rock bits, then die and rot into dark humus.','Worms pull leaves down and mix the humus with the rock bits.'];
const DESC=['An empty jar and seven cards. Drag or tap the 5 things that soil is made of into the jar.',
 'A jar of soil and water. Tap Shake, then tap the layers from the bottom to the top.',
 'Sandy, loam and clay soil in three funnels. Tap Pour to pour 100 ml of water on each, then tap the soil that let the most water through.',
 'Five jobs and three soils. Drag each job onto the right soil, or tap a soil.',
 'Four cards about how soil is made. Tap them in the order they happen.'];
const TXT=['Soil is rock bits, humus, water, air and living things.','Shake it in water: big bits sink first.','Sandy soil drains fast. Clay holds water.','Each soil is good for different jobs.','Soil takes hundreds of years to make.'];
const DONE=['Rock bits, humus, water, air and living things. That is soil. About half of it is rock bits.',
 'Sand at the bottom, then silt, then clay, with humus floating on top. Big bits sink first.',
 'Sandy soil let 80 ml through, loam 50 ml and clay only 15 ml. Big gaps between sand grains let water rush through.',
 'Loam for veg, clay for ponds and pots, sand for cactus and fast-drying pitches.',
 'Crack, break, rot, mix. It can take up to 1,000 years to make 1 cm of soil, so we must look after it.'];
const QS=[{q:'What is soil made of?',a:'Rock bits, humus, water, air and living things',o:[['Only crushed rock','rock'],['Only rotted leaves','rock']]},
 {q:'You shake soil in a jar of water. What settles at the bottom?',a:'Sand, the biggest bits',o:[['Clay, the tiniest bits','settle'],['Humus, the rotted leaves','float']]},
 {q:'Which soil lets water through fastest?',a:'Sandy soil',o:[['Clay soil','drain'],['They are all the same','drain']]},
 {q:'Why does clay soil get waterlogged?',a:'Its tiny bits leave tiny gaps for water',o:[['Its bits are the biggest','drain'],['It has no rock in it','rock']]},
 {q:'Which soil is best for most vegetables?',a:'Loam',o:[['Pure sand','job'],['Pure clay','job']]},
 {q:'What is humus?',a:'Rotted plant and animal remains',o:[['A kind of rock','rock'],['Tiny bits of sand','rock']]},
 {q:'How long can 1 cm of soil take to form?',a:'Up to 1,000 years',o:[['About a week','time'],['About a year','time']]},
 {q:'What breaks rock into bits to start soil?',a:'Rain, ice and plant roots',o:[['Worms eating the rock','time'],['People digging','time']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',EDGE='#64748b',F='px system-ui,sans-serif';
function pic(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function box(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* speckles so each soil looks grainy; n = grains per row, big = grain size */
function grains(g,x,y,w,h,col,big,seed){g.fillStyle=col;g.fillRect(x,y,w,h);let s=seed||7;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280};
 g.fillStyle='rgba(0,0,0,.18)';const n=Math.round(w*h/(big*big*6));for(let i=0;i<n;i++){g.beginPath();g.arc(x+rnd()*w,y+rnd()*h,big*(.4+rnd()*.5),0,7);g.fill()}}
/* the jar: glass outline, optional water, layers (bottom first) with a settle fraction 0..1 */
function jar(g,r,o){const x=r.x,y=r.y,w=r.w,h=r.h;g.fillStyle=o.dark?'rgba(148,163,184,.12)':'rgba(224,242,254,.7)';box(g,x,y,w,h,14);g.fill();g.lineWidth=3;g.strokeStyle=EDGE;g.stroke();
 g.fillStyle=EDGE;g.fillRect(x+w*.1,y-10,w*.8,12);
 if(o.water){g.fillStyle='rgba(56,189,248,.35)';g.fillRect(x+3,y+h*.12,w-6,h*.88-3)}
 if(o.murky){g.fillStyle=`rgba(120,83,52,${.75*o.murky})`;g.fillRect(x+3,y+h*.12,w-6,h*.88-3)}
 let base=y+h-3;(o.layers||[]).forEach((L,i)=>{const lh=h*L.h*(o.settle==null?1:Math.max(0,Math.min(1,o.settle*4-i))),ly=L.t==='Humus'?y+h*.12:base-lh;
  if(lh>1){grains(g,x+3,ly,w-6,L.t==='Humus'?h*.06:lh,L.col,L.t==='Sand'?4:L.t==='Silt'?2.2:1.2,11+i);if(L.t!=='Humus')base-=lh}
  if(o.lab&&o.lab[i]&&lh>8)lbl(g,L.t,x+w+8,(L.t==='Humus'?ly+h*.03:ly+lh/2),o.dark)});
 (o.fill||[]).forEach((p,i)=>pic(g,p,x+w*(.25+.25*(i%3)),y+h*(.82-.18*Math.floor(i/3)),Math.min(w*.22,34)))}
function lbl(g,t,x,y,dk){g.font=`800 14${F}`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=dk?'#f1f5f9':INK;g.fillText('\u2190 '+t,x,y)}
/* a funnel of soil over a measuring cylinder; ml shows how much has come through */
function funnel(g,cx,top,w,h,P,ml,dk,mark){const fw=w*.8;g.fillStyle=dk?'#334155':'#e2e8f0';g.beginPath();g.moveTo(cx-fw/2,top);g.lineTo(cx+fw/2,top);g.lineTo(cx+w*.08,top+h*.32);g.lineTo(cx-w*.08,top+h*.32);g.closePath();g.fill();
 g.save();g.clip();grains(g,cx-fw/2,top+h*.04,fw,h*.28,P.col,P.t==='Sandy'?4:P.t==='Loam'?2.6:1.3,P.ml);g.restore();g.strokeStyle=EDGE;g.lineWidth=2;g.beginPath();g.moveTo(cx-fw/2,top);g.lineTo(cx-w*.08,top+h*.32);g.lineTo(cx-w*.08,top+h*.38);g.moveTo(cx+fw/2,top);g.lineTo(cx+w*.08,top+h*.32);g.lineTo(cx+w*.08,top+h*.38);g.stroke();
 const cy0=top+h*.42,ch=h*.5,cw=w*.36;g.fillStyle=dk?'rgba(148,163,184,.15)':'#f8fafc';g.fillRect(cx-cw/2,cy0,cw,ch);const f=ml/100*ch;g.fillStyle='#0ea5e9';g.fillRect(cx-cw/2,cy0+ch-f,cw,f);
 g.strokeStyle=mark==='ok'?GOOD:mark==='no'?BAD:EDGE;g.lineWidth=mark?4:2;g.strokeRect(cx-cw/2,cy0,cw,ch);
 g.strokeStyle=EDGE;g.lineWidth=1;for(let k=1;k<4;k++){const yy=cy0+ch-ch*k/4;g.beginPath();g.moveTo(cx-cw/2,yy);g.lineTo(cx-cw/2+8,yy);g.stroke()}
 return{x:cx-w/2,y:top,w,h}}
function TOOLS(A){const big=n=>A.narrow?n:Math.round(n*1.1),c=()=>A.ctx,dk=()=>A.col.dark,ink=()=>dk()?'#f1f5f9':INK;
 function lines(t,max,font){const g=c();g.font=font;const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
 function banner(t,tone,note,bad){const g=c(),font=`800 ${big(16)}${F}`,L=lines(t,A.W-34,font),lh=big(16)*1.3,h=L.length*lh+14;
  g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');box(g,8,8,A.W-16,h,10);g.fill();
  g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?GOOD:tone==='no'?BAD:EDGE;g.stroke();g.font=font;g.fillStyle=ink();g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${big(14)}${F}`,L2=lines(note,A.W-34,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk()?'#fca5a5':BAD):(dk()?'#86efac':GOOD);L2.forEach((r,i)=>g.fillText(r,17,y+i*big(14)*1.3));y+=L2.length*big(14)*1.3+6}return y}
 function tile(r,word,o){o=o||{};const g=c();g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';box(g,r.x,r.y,r.w,r.h,10);g.fill();
  g.lineWidth=o.no||o.ok||o.sel?4:1.6;g.strokeStyle=o.no?BAD:o.ok?GOOD:o.sel?'#1d4ed8':EDGE;g.stroke();if(!word)return;
  let n=big(o.n||15),L;for(;;){L=lines(word,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=11)break;n--}
  g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const cy=r.y+r.h/2+(o.dy||0);L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function say(t,x,y,n,al,col){const g=c();g.font=`800 ${big(n)}${F}`;g.fillStyle=col||ink();g.textAlign=al||'left';g.textBaseline='middle';g.fillText(t,x,y)}
 return{banner,tile,say,ink}}
return{PARTS,MIX,LAYERS,LAYER_WHY,POTS,JOBS,MAKE,MAKE_SHOW,MAKE_WHY,DESC,TXT,DONE,QS,pic,box,grains,jar,funnel,TOOLS}})();
