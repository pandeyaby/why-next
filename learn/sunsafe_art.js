/* Data for flagsunsafe (protecting eyes from sunlight, ages 7–8). Sources: DfE (2013) National Curriculum science,
   Year 3 light ("recognise that light from the sun can be dangerous and that there are ways to protect their eyes");
   NHS "Sunglasses and eye health" and "Solar retinopathy" (looking at the Sun can permanently damage the retina);
   College of Optometrists and American Academy of Ophthalmology (wear sunglasses marked UV400, CE or BS EN ISO 12312-1;
   dark lenses without UV filters are not protective; a wide-brimmed hat cuts UV reaching the eyes); WHO "Global Solar UV
   Index" (fresh snow reflects up to 80% of UV; light cloud lets most UV through); illuminance values from the
   standard lux table (office or classroom 320–500 lux, overcast day about 1,000 lux, daylight in shade 10,000–25,000 lux,
   direct sunlight up to about 100,000 lux); pinhole image width = distance × 0.0093 (the Sun's 0.53° angular size). */
const SNS=(()=>{
/* scene 1: safe or not? */
const WAYS=[{t:'Looking straight at the Sun',icon:'stare',safe:false,why:'The Sun is so bright it can burn the back of your eye, and that damage can last for ever. Never look straight at it.'},
 {t:'Wearing a sun hat with a wide brim',icon:'hat',safe:true,why:'A wide brim shades your eyes from the sunlight above.'},
 {t:'Looking at the Sun through sunglasses',icon:'shades',safe:false,why:'Sunglasses are for bright days, not for looking at the Sun. It can still burn your eyes.'},
 {t:'Playing in the shade of a tree',icon:'tree',safe:true,why:'Shade blocks the direct sunlight, so less of it reaches your eyes.'},
 {t:'Looking at the Sun through binoculars',icon:'bino',safe:false,why:'Binoculars gather even more sunlight into your eyes. It can hurt them very quickly.'},
 {t:'Pinhole viewer, back to the Sun',icon:'pin',safe:true,why:'You look at a picture of the Sun on a card, with your back to the Sun, so no sunlight goes into your eyes.'}];
/* scene 2: how bright? illuminance in lux, from the standard lux table */
const PLACES=[{t:'Classroom',icon:'lamp',lux:400},{t:'Cloudy day',icon:'cloud',lux:1000},{t:'Shade, sunny day',icon:'tree',lux:20000},{t:'Full sun',icon:'sun',lux:100000}];
/* scene 3: what protects your eyes? */
const GEAR=[{t:'Sun hat with a brim',good:true,why:'A brim shades your eyes.'},{t:'Dark toy glasses, no UV mark',good:false,why:'Dark glasses with no UV mark can let harmful light in. Look for UV400 or a CE mark.'},
 {t:'Sunglasses marked UV400',good:true,why:'UV400 sunglasses block the harmful ultraviolet light.'},{t:'Binoculars to look at the Sun',good:false,why:'Never point binoculars at the Sun. They gather more light into your eyes.'},
 {t:'Play in the shade',good:true,why:'Shade blocks the direct sunlight.'},{t:'A quick look at the Sun',good:false,why:'Even a quick look straight at the Sun can hurt your eyes. Never do it.'}];
/* scene 4: pinhole viewer targets (mm wide); image width = distance in mm × 0.0093 */
const PIN=[3,6,9],K=0.0093,MAXCM=120;
const ROBOT=[{say:'On a cloudy day it is safe to stare at the Sun.',ok:false,fix:'Never stare at the Sun. Clouds can move, and harmful light still gets through.'},
 {say:'Snow and water can bounce sunlight into my eyes.',ok:true,fix:'Yes. Fresh snow bounces back most of the sunlight, so wear sunglasses in the snow too.'},
 {say:'Any dark glasses will protect my eyes.',ok:false,fix:'Only glasses marked UV400 or with a CE mark block the harmful light. Dark is not enough.'},
 {say:'Damage from looking at the Sun can last for ever.',ok:true,fix:'Yes. The Sun can burn the back of the eye, and that damage may never heal.'},
 {say:'I can look at the Sun through a telescope for one second.',ok:false,fix:'Never. A telescope gathers lots of sunlight and can hurt your eyes at once.'}];
const DESC=[
 'A card shows a way to look at or near the Sun. Buttons: Safe or Not safe.',
 'Four places and a light meter. Tap each place to measure how bright it is.',
 'A child outside on a sunny day and six things. Tap the things that protect their eyes.',
 'A pinhole card, a screen and a picture of the Sun. Drag the screen to make the picture the right size, then tap Check.',
 'A robot says things about sunlight and eyes. Buttons: Right or Slip.'];
const DONE=[
 'Never look straight at the Sun, even with sunglasses or binoculars.',
 'Full sun is about 250 times brighter than a classroom. No lamp comes close.',
 'A brim, UV400 sunglasses and shade protect your eyes.',
 'Further away makes a bigger picture of the Sun, and your eyes stay safe.',
 'The robot slipped three times: clouds, dark glasses and telescopes do not make it safe.'];
const QS=[
 {q:'Is it safe to look at the Sun through sunglasses?',a:'No, never',o:[['Yes, sunglasses block it','glasses'],['Yes, for a few seconds','quick']]},
 {q:'Which glasses protect your eyes on a sunny day?',a:'Sunglasses marked UV400',o:[['Any dark glasses','dark'],['Glasses with no mark','dark']]},
 {q:'How does full sun compare with a bright classroom?',a:'Hundreds of times brighter',o:[['About the same','bright'],['A little bit brighter','bright']]},
 {q:'It is cloudy. Is it safe to stare at the Sun?',a:'No, never stare at the Sun',o:[['Yes, clouds block it all','cloud'],['Yes, if it looks dim','cloud']]},
 {q:'How can you watch an eclipse safely?',a:'A pinhole viewer, back to the Sun',o:[['Through binoculars','bino'],['A quick look now and then','quick']]},
 {q:'Which of these helps protect your eyes?',a:'A sun hat with a wide brim',o:[['Looking at the Sun to check','quick'],['Binoculars','bino']]}];
/* small pictures for the cards (drawn on the lab canvas) */
function paintIcon(g,kind,x,y,u){g.save();g.lineCap='round';
 const sun=(sx,sy,r)=>{g.strokeStyle='#d97706';g.lineWidth=Math.max(2,r*.18);for(let k=0;k<8;k++){const a=k*Math.PI/4;g.beginPath();g.moveTo(sx+Math.cos(a)*r*1.25,sy+Math.sin(a)*r*1.25);g.lineTo(sx+Math.cos(a)*r*1.6,sy+Math.sin(a)*r*1.6);g.stroke()}g.fillStyle='#fbbf24';g.beginPath();g.arc(sx,sy,r,0,7);g.fill()};
 const eye=(ex,ey,r)=>{g.fillStyle='#ffffff';g.strokeStyle='#111827';g.lineWidth=2;g.beginPath();g.ellipse(ex,ey,r,r*.55,0,0,7);g.fill();g.stroke();g.fillStyle='#1e3a8a';g.beginPath();g.arc(ex,ey,r*.38,0,7);g.fill()};
 const tree=(tx,ty,r)=>{g.fillStyle='#92400e';g.fillRect(tx-r*.12,ty,r*.24,r*1.1);g.fillStyle='#16a34a';g.beginPath();g.arc(tx,ty-r*.1,r*.75,0,7);g.fill()};
 if(kind==='sun')sun(x,y,u*.45);
 if(kind==='stare'||kind==='shades'||kind==='bino'){sun(x-u*.7,y-u*.25,u*.3);eye(x+u*.65,y+u*.15,u*.32);g.strokeStyle='#f59e0b';g.setLineDash([5,4]);g.lineWidth=2;g.beginPath();g.moveTo(x-u*.3,y-u*.1);g.lineTo(x+u*.3,y+u*.12);g.stroke();g.setLineDash([])}
 if(kind==='shades'){g.fillStyle='#111827';g.fillRect(x+u*.3,y,u*.7,u*.3)}
 if(kind==='bino'){g.fillStyle='#374151';g.beginPath();g.arc(x+u*.15,y-u*.05,u*.16,0,7);g.arc(x+u*.15,y+u*.33,u*.16,0,7);g.fill()}
 if(kind==='hat'){g.fillStyle='#fde68a';g.beginPath();g.arc(x,y+u*.1,u*.32,0,7);g.fill();g.fillStyle='#b45309';g.beginPath();g.ellipse(x,y-u*.15,u*.8,u*.14,0,0,7);g.fill();g.beginPath();g.ellipse(x,y-u*.32,u*.38,u*.26,0,Math.PI,0);g.fill();g.fillStyle='#111827';g.fillRect(x-u*.16,y+u*.05,u*.08,u*.08);g.fillRect(x+u*.08,y+u*.05,u*.08,u*.08)}
 if(kind==='tree'){tree(x,y-u*.1,u*.6);g.fillStyle='#fde68a';g.beginPath();g.arc(x+u*.55,y+u*.35,u*.16,0,7);g.fill()}
 if(kind==='pin'){sun(x-u*.75,y-u*.35,u*.26);g.fillStyle='#94a3b8';g.fillRect(x-u*.25,y-u*.5,u*.1,u);g.fillStyle='#ffffff';g.fillRect(x+u*.55,y-u*.5,u*.12,u);g.strokeStyle='#111827';g.lineWidth=1;g.strokeRect(x+u*.55,y-u*.5,u*.12,u);g.fillStyle='#d97706';g.beginPath();g.arc(x+u*.61,y,u*.05,0,7);g.fill();g.strokeStyle='#f59e0b';g.setLineDash([4,3]);g.beginPath();g.moveTo(x-u*.5,y-u*.25);g.lineTo(x+u*.55,y);g.stroke();g.setLineDash([])}
 if(kind==='lamp'){g.fillStyle='#e5e7eb';g.beginPath();g.moveTo(x-u*.4,y);g.lineTo(x-u*.2,y-u*.4);g.lineTo(x+u*.2,y-u*.4);g.lineTo(x+u*.4,y);g.closePath();g.fill();g.strokeStyle='#475569';g.lineWidth=2;g.stroke();g.fillStyle='#fde047';g.beginPath();g.arc(x,y+u*.08,u*.12,0,7);g.fill()}
 if(kind==='cloud'){g.fillStyle='#9ca3af';[[-.3,0,.3],[.05,-.15,.38],[.4,0,.28]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(x+dx*u,y+dy*u,r*u,0,7);g.fill()})}
 g.restore()}
return{paintIcon,WAYS,PLACES,GEAR,PIN,K,MAXCM,ROBOT,DESC,DONE,QS}})();
