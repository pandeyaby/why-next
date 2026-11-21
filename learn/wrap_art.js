/* Data for the keeping-warm-or-cold flagship (flagwrap), ages 4–5. Wrapping something in a thick, fluffy material
   slows heat moving in or out: warm things stay warm and cold things stay cold for longer. A coat keeps your own
   warmth in; it does not make heat. Slips it targets: 'wool is warm' so a wrapped ice cube melts faster, wrapping
   makes things hotter than they started, wrapping only works for warm things, thin wrappers work as well as thick,
   and only cloth can keep things warm (Erickson 1979; Driver and others 1994, Making Sense of Secondary Science). */
const WRP=(()=>{
const MELT={bare:.25,sock:.08};
const WRAPS=[{k:'scarf',t:'Woolly scarf',w:.8},{k:'tissue',t:'Thin tissue',w:.45},{k:'net',t:'Net with holes',w:.25}];
const LAYER=L=>1-.8/(1+L),BELL=.7;
const USES=[['Soup in a flask',0],['Ice cream in a cool bag',1],['A baby in a blanket',0],['Drinks in a cool box',1],['A pie in a tea towel',0],['Ice cubes in a towel',1]];
const BINS=['Stays warm','Stays cold'];
const KIT=[{k:'hat',t:'Woolly hat',z:0},{k:'scarf',t:'Scarf',z:1},{k:'coat',t:'Coat',z:2}];
const ZONES=['head','neck','body'];
const DESC=[
 'Two ice cubes on plates and a woolly sock.',
 'Three cups of warm cocoa and three wrappers: a woolly scarf, thin tissue and a net with holes.',
 'A cup of warm cocoa with no wrapping. A line shows warm enough for playtime.',
 'Six cards about wrapping things up. Two boxes: Stays warm and Stays cold.',
 'A child out in the snow with warmth escaping from their head, neck and body.'];
const DONE=[
 'The bare cube melted first. The sock did not warm the ice: it kept the warm air out, so the ice stayed frozen longer.',
 'The scarf kept the cocoa warmest. Thick, fluffy things trap air and slow the warmth getting out; thin tissue and a net let it out.',
 'More layers kept the cocoa warm for longer, but never hotter than when it was poured. Wrapping slows cooling; it does not add heat.',
 'Wrapping works both ways: it keeps warm things warm and cold things cold, because it slows heat moving in or out.',
 'The warmth comes from your body. The hat, scarf and coat keep it in. A coat on a snowman would make it melt more slowly, not faster.'];
const QS=[
 {q:'You wrap one ice cube in a sock and leave one bare. Which melts first?',a:'The bare one',o:[['The one in the sock','woolhot'],['Both at the same time','thin']]},
 {q:'Does a coat make heat?',a:'No, it keeps your own warmth in',o:[['Yes, coats are hot','woolhot'],['Yes, if it is thick','woolhot']]},
 {q:'Which keeps cocoa warm for longest?',a:'A thick woolly scarf',o:[['A thin tissue','thin'],['A net with big holes','thin']]},
 {q:'Can a cool bag keep ice cream cold?',a:'Yes, it keeps the warmth out',o:[['No, wrapping only keeps things warm','onlywarm'],['No, it makes it melt','woolhot']]},
 {q:'Warm soup goes into a flask. Later it is…',a:'A bit cooler, but still warm',o:[['Hotter than before','hotter'],['Ice cold','thin']]},
 {q:'Can bubble wrap keep a drink warm?',a:'Yes, its air bubbles slow the heat',o:[['No, only clothes keep things warm','cloth'],['No, plastic makes things cold','cloth']]}];
/* drawing helpers shared by the scenes (A is the flagship canvas api) */
const EDGE='#64748b',BAD='#b91c1c',PICK='#7c3aed',HOTC='#ea580c';
/* a thermometer bar: v from 0 (cold) to 1 (as hot as when poured) */
function thermo(A,x,y,h,v,line){const g=A.ctx,w=Math.max(12,h*.14);g.fillStyle='#ffffff';A.paint.rrect(x-w/2,y,w,h,w/2);g.fill();g.lineWidth=2;g.strokeStyle=EDGE;g.stroke();
 g.fillStyle=v>=.7?HOTC:v>=.4?'#f59e0b':'#38bdf8';A.paint.rrect(x-w/2+3,y+h*(1-v)+3,w-6,Math.max(0,h*v-6),(w-6)/2);g.fill();
 if(line!=null){g.strokeStyle=A.col.tx;g.setLineDash([5,4]);g.beginPath();g.moveTo(x-w,y+h*(1-line));g.lineTo(x+w*1.2,y+h*(1-line));g.stroke();g.setLineDash([])}}
function mug(A,C,k,v,o){const g=A.ctx;g.lineWidth=5;g.strokeStyle='#92400e';g.beginPath();g.arc(C.x-C.w/2,C.y,C.h*.2,Math.PI*.5,Math.PI*1.5);g.stroke();g.fillStyle='#fde68a';A.paint.rrect(C.x-C.w/2,C.y-C.h/2,C.w,C.h,10);g.fill();g.lineWidth=o&&o.on?4:2;g.strokeStyle=o&&o.no?BAD:o&&o.on?PICK:'#92400e';g.stroke();
 if(k==='scarf'||k>0){const n=k==='scarf'?1:k;for(let j=0;j<n;j++){const p=6+j*7;g.strokeStyle=['#dc2626','#2563eb','#16a34a'][j];g.lineWidth=7;A.paint.rrect(C.x-C.w/2-p,C.y-C.h/2-p+C.h*.25,C.w+2*p,C.h*.75+2*p-C.h*.25,12);g.stroke()}}
 if(k==='tissue'){g.strokeStyle='#f9a8d4';g.lineWidth=2;A.paint.rrect(C.x-C.w/2-4,C.y-C.h/2+4,C.w+8,C.h,10);g.stroke()}
 if(k==='net'){g.strokeStyle='#475569';g.lineWidth=1.5;for(let j=1;j<4;j++){const x=C.x-C.w/2+C.w*j/4;g.beginPath();g.moveTo(x,C.y-C.h/2);g.lineTo(x,C.y+C.h/2);g.stroke()}}
 if(v!=null)thermo(A,C.x+C.w/2+12,C.y-C.h/2,C.h,v)}
function scene(A,K,S,on,ZONES){const g=A.ctx;
 g.fillStyle=A.col.dark?'#e2e8f0':'#ffffff';g.fillRect(0,A.H*.8,A.W,A.H*.2);
 g.fillStyle='#fcd34d';g.beginPath();g.arc(K.head.x,K.head.y,K.head.r,0,7);g.fill();g.fillStyle='#f472b6';g.fillRect(K.body.x,K.body.y,K.body.w,K.body.h);g.fillStyle='#fcd34d';g.fillRect(K.neck.x,K.neck.y,K.neck.w,K.neck.h);
 g.fillStyle='#1e3a8a';g.fillRect(K.x-K.u*.5,K.body.y+K.body.h,K.u*.35,A.H*.8-(K.body.y+K.body.h));g.fillRect(K.x+K.u*.15,K.body.y+K.body.h,K.u*.35,A.H*.8-(K.body.y+K.body.h));
 if(on[0]){g.fillStyle='#dc2626';g.beginPath();g.arc(K.head.x,K.head.y-K.head.r*.2,K.head.r*1.05,Math.PI,0);g.fill()}
 if(on[1]){g.fillStyle='#2563eb';A.paint.rrect(K.neck.x-6,K.neck.y-3,K.neck.w+12,K.neck.h+6,6);g.fill()}
 if(on[2]){g.fillStyle='#16a34a';A.paint.rrect(K.body.x-6,K.body.y,K.body.w+12,K.body.h+8,10);g.fill()}
 ZONES.forEach((z,j)=>{if(on[j])return;const y=j===0?K.head.y:j===1?K.neck.y+K.neck.h/2:K.body.y+K.body.h/2;g.fillStyle=HOTC;[-1,1].forEach(d=>{for(let n=1;n<=2;n++){g.beginPath();g.arc(K.x+d*(K.u*.85+n*12),y-n*5,4,0,7);g.fill()}})});
 g.fillStyle='#ffffff';g.strokeStyle=EDGE;g.lineWidth=2;[[S.y,S.r],[S.y-S.r*1.6,S.r*.7]].forEach(([y,r])=>{g.beginPath();g.arc(S.x,y,r,0,7);g.fill();g.stroke()});
}
return{thermo,mug,scene,MELT,WRAPS,LAYER,BELL,USES,BINS,KIT,ZONES,DESC,DONE,QS}})();
