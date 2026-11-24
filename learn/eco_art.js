/* Data and drawings for flagecohelp (Reducing human impact; ages 5-6; NGSS K-ESS3-3 'communicate solutions that will
   reduce the impact of humans on the land, water, air and/or other living things in the local environment').
   Sources: RSPCA 'Litter' (cans, plastic rings, bags and wrappers trap and hurt hedgehogs, birds and other animals;
   cut plastic rings and put litter in a bin); WRAP Recycle Now (cans, paper, plastic bottles and glass go in home
   recycling once rinsed; crisp packets cannot go in home recycling, so they go in the rubbish bin or a supermarket
   soft-plastics point; food scraps go in the food waste caddy); the waste hierarchy in the Waste (England and Wales)
   Regulations 2011 (prevent and reuse before recycling, recycling before throwing away); Waterwise (a running tap
   wastes about 6 litres a minute, so turning it off while brushing for 2 minutes saves about 12 litres); Energy Saving
   Trust (switch off lights and screens in empty rooms); DESNZ Energy Trends (much UK electricity is still made by
   burning gas). Slips it targets: picking flowers or moving animals as 'tidying', shiny crisp packets in the
   recycling, food in the rubbish, recycling as good as reusing, leaving the tap running, switching off a light someone
   is using. */
const ECO=(()=>{
/* step 1: litter in the park; x, y are fractions of the scene; each piece hurts a nearby animal */
const LITTER=[{e:'🥫',t:'can',x:.18,y:.55,a:'🦔',n:'hedgehog',hurt:'A hedgehog can get its head stuck in a can.'},
 {e:'🛍️',t:'plastic bag',x:.62,y:.72,a:'🦆',n:'duck',hurt:'A duck can get tangled in a plastic bag.'},
 {e:'🍬',t:'sweet wrapper',x:.42,y:.38,a:'🐦',n:'bird',hurt:'A bird might try to eat a wrapper.'},
 {e:'🧃',t:'juice carton',x:.84,y:.52,a:'🐿️',n:'squirrel',hurt:'A squirrel can get its head stuck in a carton.'}];
const KEEP=[{e:'🌼',t:'flower',x:.3,y:.8,why:'That is a flower, not litter. Leave it to grow for the bees.'},
 {e:'🐌',t:'snail',x:.1,y:.25,why:'That is a snail, not litter. It lives here. Leave it be.'}];
/* step 2: which bin? 0 recycling, 1 food waste, 2 rubbish */
const BINS=[{e:'♻️',t:'Recycling'},{e:'🍌',t:'Food waste'},{e:'🗑️',t:'Rubbish'}];
const ITEMS=[{e:'🥫',t:'Tin can',b:0},{e:'📰',t:'Newspaper',b:0},{e:'🫙',t:'Glass jar',b:0},{e:'🍌',t:'Banana skin',b:1},{e:'🥔',t:'Crisp packet',b:2},{e:'🍎',t:'Apple core',b:1}];
const WHY={0:'Cans, paper and glass can be made into new things. They go in the recycling.',1:'Food scraps go in the food waste bin. They can be made into compost for plants.',2:'Crisp packets cannot go in the home recycling, so they go in the rubbish bin.'};
/* step 3: use it again; [throw-away choice, use-again choice] */
const PAIRS=[[{e:'🧴',t:'New plastic bottle'},{e:'🚰',t:'Fill my own bottle'}],[{e:'🛍️',t:'New carrier bag'},{e:'👜',t:'Take a cloth bag'}],[{e:'📄',t:'New sheet of paper'},{e:'✏️',t:'Draw on the back'}]];
/* step 4: brushing teeth; 4 brushes of 30 s; a running tap wastes about 6 litres a minute */
const BRUSHES=4,PER=3,WET=1,GOAL=2;
/* step 5: four rooms; on: what is switched on; who: someone is there */
const ROOMS=[{t:'Kitchen',on:['💡','📺'],who:null},{t:'Bedroom',on:['💡'],who:null},{t:'Living room',on:['💡'],who:'📖'},{t:'Bathroom',on:[],who:null}];
const DESC=['A park with a pond, four bits of litter, two animals and a flower. Tap each bit of litter to put it in the bin.',
 'Three bins: recycling, food waste and rubbish. One thing at a time appears. Tap the bin it goes in.',
 'Three times you can choose: something new to throw away, or something you use again. Tap your choice.',
 'A tap, a toothbrush and a bucket that shows the water used. Turn the tap off and brush for 2 minutes.',
 'A house with four rooms. Some lights and a TV are on. Tap the ones in empty rooms to switch them off.'];
const TXT=['Litter can hurt animals. Pick it up and put it in a bin.',
 'Some rubbish can be made into new things. Which bin?',
 'Using things again makes less rubbish than buying new.',
 'Water from the tap is cleaned for us. Do not let it run away.',
 'Making electricity can put smoke and gas into the air. Switch off what nobody is using.'];
const DONE=['The park is clean. The animals are safe.',
 'All sorted! Cans, paper and glass in the recycling, food in food waste, crisp packet in the rubbish.',
 'You used things again three times, so there is no new rubbish at all.',
 'Two minutes of brushing with the tap off. Leaving it running wastes about 12 litres.',
 'Everything in the empty rooms is off. The reading light stays on.'];
const QS=[{q:'You see a can on the grass in the park. What do you do?',a:'Put it in a bin',o:[['Leave it there','leave'],['Kick it into the pond','leave']]},
 {q:'Where does a crisp packet go at home?',a:'In the rubbish bin',o:[['In the recycling, it is shiny','shiny'],['In the food waste','shiny']]},
 {q:'Where does a banana skin go?',a:'In the food waste bin',o:[['In the recycling','food'],['On the grass','leave']]},
 {q:'Which makes the least rubbish?',a:'Filling my own bottle again',o:[['A new bottle each day, then recycling it','recycle'],['A new bottle each day','recycle']]},
 {q:'You are brushing your teeth. What do you do with the tap?',a:'Turn it off while I brush',o:[['Leave it running','tap'],['Turn it on more','tap']]},
 {q:'Nobody is in the kitchen and the light is on. What do you do?',a:'Switch it off',o:[['Leave it on','light'],['Switch on the TV too','light']]},
 {q:'Grandad is reading in the living room. Should you switch his light off?',a:'No, he is using it',o:[['Yes, all lights must go off','using'],['Yes, and the TV on','using']]},
 {q:'Is picking all the flowers in the park a good way to tidy it?',a:'No, flowers are not litter',o:[['Yes, it makes it tidy','flower'],['Yes, bees do not need them','flower']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function park(g,x,y,w,h){g.fillStyle='#bbf7d0';g.fillRect(x,y,w,h);g.fillStyle='#7dd3fc';g.beginPath();g.ellipse(x+w*.62,y+h*.78,w*.2,h*.14,0,0,7);g.fill();g.strokeStyle='#0369a1';g.lineWidth=2;g.stroke()}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function bucket(g,x,y,w,h,v,max){g.fillStyle='#e2e8f0';g.fillRect(x,y,w,h);const f=Math.min(1,v/max);g.fillStyle='#38bdf8';g.fillRect(x,y+h*(1-f),w,h*f);g.lineWidth=3;g.strokeStyle='#334155';g.strokeRect(x,y,w,h)}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||15),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function meter(x,y,w,h,v,max,col,mark){const c=g();c.fillStyle=dk()?'#334155':'#e2e8f0';A.paint.rrect(x,y,w,h,h/2);c.fill();c.fillStyle=col;A.paint.rrect(x,y,Math.max(h,w*Math.min(1,v/max)),h,h/2);c.fill();
  if(mark!=null){const mx=x+w*mark/max;c.strokeStyle=fg();c.lineWidth=3;c.beginPath();c.moveTo(mx,y-4);c.lineTo(mx,y+h+4);c.stroke()}}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,card,meter,text,sz,fg,dk,INK,F}}
return{LITTER,KEEP,BINS,ITEMS,WHY,PAIRS,BRUSHES,PER,WET,GOAL,ROOMS,DESC,TXT,DONE,QS,park,emo,bucket,PEN}})();
