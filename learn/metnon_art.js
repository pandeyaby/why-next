/* Data and drawings for flagmetnon (metals vs non-metals; ages 11-13, KS3 chemistry; NGSS MS-PS1-2 properties).
   Sources: DfE National Curriculum KS3 science (2013): 'the properties of metals and non-metals', 'the chemical
   properties of metal and non-metal oxides with respect to acidity', 'the varying physical and chemical properties of
   different elements', 'the principles underpinning the Mendeleev periodic table'; RSC Education 'Properties of metals'
   and 'Metals and non-metals' practicals; Royal Society of Chemistry periodic table data (state at 20 C, mercury liquid,
   bromine liquid; graphite an electrical conductor; iodine lustrous but brittle); only iron, cobalt and nickel (and
   steel) of the common metals are attracted to a magnet; universal indicator: pH 1-3 red, 4-6 orange-yellow, 7 green,
   8-10 blue, 11-14 purple. Typical pH: CO2(aq) about 5.6, SO2(aq) about 3, MgO suspension about 10, Na2O(aq) about 14.
   Slips it targets: every shiny solid is a metal (iodine); only metals conduct (graphite); every metal is magnetic
   (copper, aluminium); every metal is a hard solid (mercury, sodium); hydrogen is a metal because it sits in group 1;
   metal oxides make acids. */
const METNON=(()=>{
/* the bench tests. r = result shown; met = is the element a metal */
const CIRC=[{k:'Cu',n:'copper',met:1,r:1,col:'#b45309'},{k:'S',n:'sulfur',met:0,r:0,col:'#facc15'},{k:'Al',n:'aluminium',met:1,r:1,col:'#cbd5e1'},{k:'C',n:'graphite (carbon)',met:0,r:1,col:'#334155'},{k:'I',n:'iodine',met:0,r:0,col:'#4c1d95'}];
const HAMM=[{k:'Fe',n:'iron',met:1,r:'flattens',col:'#78716c'},{k:'S',n:'sulfur',met:0,r:'shatters',col:'#facc15'},{k:'Cu',n:'copper',met:1,r:'flattens',col:'#b45309'},{k:'I',n:'iodine',met:0,r:'shatters',col:'#4c1d95'},{k:'C',n:'graphite (carbon)',met:0,r:'crumbles',col:'#334155'}];
const MAGN=[{k:'Fe',n:'iron',met:1,r:1,col:'#78716c'},{k:'Cu',n:'copper',met:1,r:0,col:'#b45309'},{k:'Al',n:'aluminium',met:1,r:0,col:'#cbd5e1'},{k:'Ni',n:'nickel',met:1,r:1,col:'#a8a29e'},{k:'S',n:'sulfur',met:0,r:0,col:'#facc15'}];
/* step 4: weigh the evidence. met = 1 metal; why = feedback when sorted wrongly */
const EVID=[{n:'Magnesium',e:'shiny when cleaned, bends, conducts',met:1,why:'It is shiny, it bends and it conducts. All the evidence says metal.'},
 {n:'Iodine',e:'shiny grey crystals, shatters, does not conduct',met:0,why:'Shine alone does not decide. Iodine shatters and does not conduct, so it is a non-metal.'},
 {n:'Mercury',e:'liquid at room temperature, shiny, conducts',met:1,why:'Not every metal is solid. Mercury is a liquid, but it is shiny and conducts: a metal.'},
 {n:'Graphite (carbon)',e:'grey, conducts, crumbles when hit',met:0,why:'Conducting alone does not decide. Graphite crumbles instead of bending, and diamond (also carbon) does not conduct: carbon is a non-metal.'},
 {n:'Sodium',e:'soft enough to cut with a knife, shiny when cut, conducts',met:1,why:'Not every metal is hard. Sodium is soft, but it is shiny and conducts: a metal.'},
 {n:'Oxygen',e:'colourless gas, does not conduct',met:0,why:'A gas that does not conduct heat or electricity well is a non-metal.'}];
/* step 5: the periodic table. Rows 1-4, groups 1, 2, (transition block), 3-7, 0. m = 1 metal, 0 non-metal, 2 metalloid */
const PT=[['H',0,0,0],['He',0,0,9],
 ['Li',1,1,0],['Be',1,1,1],['B',2,1,3],['C',0,1,4],['N',0,1,5],['O',0,1,6],['F',0,1,7],['Ne',0,1,9],
 ['Na',1,2,0],['Mg',1,2,1],['Al',1,2,3],['Si',2,2,4],['P',0,2,5],['S',0,2,6],['Cl',0,2,7],['Ar',0,2,9],
 ['K',1,3,0],['Ca',1,3,1],['Fe',1,3,2],['Ga',1,3,3],['Ge',2,3,4],['As',2,3,5],['Se',0,3,6],['Br',0,3,7],['Kr',0,3,9]];
/* the order the learner places them, with a hint for a wrong answer */
const PLACE=[{s:'K',why:'Potassium is in group 1, on the far left. Left of the staircase means metal.'},
 {s:'Br',why:'Bromine is in group 7, right of the staircase. It is a non-metal, even though it is a liquid.'},
 {s:'Fe',why:'Iron is in the middle block (the transition metals). They are all metals.'},
 {s:'H',why:'Hydrogen sits above group 1, but it is a gas that does not conduct: a non-metal. It is the exception on the left.'},
 {s:'P',why:'Phosphorus is right of the staircase, in group 5. It is a non-metal.'},
 {s:'Ca',why:'Calcium is in group 2, on the left. It is a metal.'}];
/* step 6: oxides in water with universal indicator */
const OX=[{k:'MgO',n:'magnesium oxide',met:1,ph:10,col:'#2563eb'},{k:'SO₂',n:'sulfur dioxide',met:0,ph:3,col:'#dc2626'},{k:'Na₂O',n:'sodium oxide',met:1,ph:14,col:'#7e22ce'},{k:'CO₂',n:'carbon dioxide',met:0,ph:5.6,col:'#f59e0b'}];
const DESC=['A circuit with a battery, a bulb and a gap. Drag a sample into the gap, or tap it, to see if the bulb lights.',
 'An anvil and a hammer. Drag a sample onto the anvil, or tap it, to hit it.',
 'A strong magnet. Drag a sample to the magnet, or tap it, to see if it sticks.',
 'One element at a time with its evidence, and two boxes: Metal and Non-metal.',
 'The first four rows of the periodic table with the metal and non-metal staircase. Say whether the lit element is a metal.',
 'A beaker of water with universal indicator. Drag an oxide in, or tap it, and read the colour and pH.'];
const TXT=['Do only metals conduct electricity? Test five elements.','Hit each sample. Metals are malleable: they bend and flatten. What do non-metals do?','Are all metals magnetic? Test five samples.','No single test decides. Weigh all the evidence.','The staircase line splits the periodic table: metals left, non-metals right.','Burn an element, add its oxide to water: acid or alkali?'];
const DONE=['Metals conduct. So does graphite, a non-metal: conducting alone does not prove metal.',
 'Metals flatten (malleable). Solid non-metals are brittle: they shatter or crumble.',
 'Only iron, nickel and cobalt (and steel) stick. Most metals, like copper and aluminium, are not magnetic.',
 'Look at all the properties: shine, conducting, bending. One odd result does not decide.',
 'Left of the staircase and the middle block: metals. Right of it, and hydrogen: non-metals.',
 'Metal oxides are basic (alkaline in water). Non-metal oxides are acidic.'];
const QS=[{q:'Iodine is shiny. Is it a metal?',a:'No: it shatters and does not conduct',o:[['Yes, it is shiny','shiny'],['Yes, all crystals are metals','shiny']]},
 {q:'Graphite conducts electricity. Is carbon a metal?',a:'No, carbon is a non-metal that conducts',o:[['Yes, only metals conduct','conduct'],['Yes, it is grey','shiny']]},
 {q:'Will a magnet pick up a copper coin made of pure copper?',a:'No, copper is not magnetic',o:[['Yes, all metals are magnetic','magnet'],['Yes, it conducts','magnet']]},
 {q:'Mercury is a liquid at room temperature. What is it?',a:'A metal',o:[['A non-metal, metals are solid','solid'],['Neither, it is a liquid','solid']]},
 {q:'Hydrogen is above group 1. Is it a metal?',a:'No, it is a non-metal gas',o:[['Yes, it is on the left','left'],['Yes, group 1 is all metals','left']]},
 {q:'Calcium oxide is added to water with universal indicator. What colour?',a:'Purple or blue: alkaline',o:[['Red: acidic','oxide'],['Green: neutral','oxide']]},
 {q:'Why are electric wires made of copper?',a:'It conducts well and can be drawn into wire',o:[['It is magnetic','magnet'],['It is shiny','shiny']]}];
/* universal indicator colour for a pH */
function uiCol(ph){const S=[[1,'#dc2626'],[3,'#ef4444'],[5,'#f59e0b'],[6,'#eab308'],[7,'#16a34a'],[9,'#0ea5e9'],[10,'#2563eb'],[12,'#6d28d9'],[14,'#7e22ce']];let c=S[0][1];for(const[p,k]of S)if(ph>=p)c=k;return c}
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.12);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#e2e8f0':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function banner(t,tone,note,bad){const c=g(),font=`700 ${sz(15)}${F}`,L=wrap(t,A.W-30,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#f8fafc');A.paint.rrect(6,6,A.W-12,h,10);c.fill();c.lineWidth=tone?2.2:1;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();
  c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,15,12+i*lh));let y=6+h+5;
  if(note){const f2=`600 ${sz(13)}${F}`,L2=wrap(note,A.W-30,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,15,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+5}return y}
 function tile(r,lines,o){o=o||{};const c=g();c.fillStyle=o.bg||(o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,9);c.fill();c.lineWidth=o.no||o.ok||o.sel?3:1.3;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();
  const ls=[].concat(lines);let n=sz(o.n||14),L;for(;;){L=ls.flatMap((t,i)=>wrap(t,r.w-8,`${i?600:800} ${i?Math.round(n*.85):n}${F}`).map(x=>[x,i]));if(L.length*n*1.2<=r.h-6||n<=10)break;n--}
  c.fillStyle=o.ink||INK;c.textAlign='center';c.textBaseline='middle';L.forEach(([s,i],j)=>{c.font=`${i?600:800} ${i?Math.round(n*.85):n}${F}`;c.fillText(s,r.x+r.w/2,r.y+r.h/2+(j-(L.length-1)/2)*n*1.2)})}
 function lump(x,y,r,col){const c=g();c.fillStyle=col;c.beginPath();for(let i=0;i<9;i++){const a=i/9*Math.PI*2,q=r*(.82+.18*Math.sin(i*2.7));c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath();c.fill();c.strokeStyle='#0f172a';c.lineWidth=1.2;c.stroke()}
 return{wrap,banner,tile,lump,sz,fg,dk,INK,OK,NO,RIM,F}}
return{CIRC,HAMM,MAGN,EVID,PT,PLACE,OX,DESC,TXT,DONE,QS,uiCol,PEN}})();
