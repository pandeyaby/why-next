/* Data for flaganimrec (animal record-holders, ages 5–7). Figures are rounded "about" values:
   cheetah, fastest land animal, about 100 km/h in short bursts (Smithsonian's National Zoo; Sharp 1997 measured 29 m/s);
   racehorse about 70 km/h (Guinness World Records, fastest race horse 70.8 km/h); fastest person about 44 km/h
   (Usain Bolt's peak speed in the 2009 100 m world record); elephant about 25 km/h (Hutchinson et al. 2003, Nature);
   peregrine falcon, fastest animal, more than 300 km/h in a hunting dive (RSPB; Smithsonian); blue whale, largest
   animal known to have lived, up to about 30 m, the NHM's "Hope" skeleton is 25.2 m (Natural History Museum);
   a family car is about 5 m long; giraffe, tallest animal, up to about 5.5 m (San Diego Zoo Wildlife Alliance);
   African elephant about 3 m at the shoulder; bee hummingbird, smallest bird, about 5–6 cm and under 2 g
   (Guinness World Records; Cornell Lab); robin about 14 cm; chicken about 40 cm; ostrich, largest bird, about 2.5 m tall.
   Slips it targets: biggest means fastest; the cheetah is the fastest animal of all; the biggest animal ever was a
   dinosaur; the heaviest animal must be the tallest; small birds in books look as big as big birds. */
const ANIMREC=(()=>{
const RUN=[{k:'cheetah',n:'Cheetah',v:100,c:'#d97706'},{k:'horse',n:'Horse',v:70,c:'#78350f'},
 {k:'person',n:'Fastest person',v:44,c:'#334155'},{k:'ele',n:'Elephant',v:25,c:'#6b7280'}];
const RUNQ=[{q:'Who won the race?',ans:'cheetah',bad:{ele:'The elephant is the biggest, but it came last. Big does not mean fast.',
  horse:'The horse is fast, about 70 km/h, but the cheetah got to the flag first.',person:'The fastest person ever ran about 44 km/h. The cheetah ran more than twice as fast.'}},
 {q:'Who came last?',ans:'ele',bad:{cheetah:'The cheetah won! Look for the one still far from the flag.',horse:'The horse came second. Look for the one furthest back.',
  person:'The person came third. The biggest animal was the slowest here.'}}];
const DIVE={falcon:320,cheetah:100};
const DIVEQ=[{q:'Which was faster?',opts:['Falcon','Cheetah'],ans:0,bad:'Look how far each went in the same time. The falcon went about 3 times as far.'},
 {q:'The cheetah is the fastest animal ...',opts:['on land','of all'],ans:0,bad:'Not of all: the peregrine falcon is faster in a dive. The cheetah is the fastest on land.'}];
const WHALE=25,CAR=5,CARS=5;
const TALL=[{k:'giraffe',n:'Giraffe',h:5.5,c:'#ca8a04'},{k:'ele',n:'Elephant',h:3,c:'#6b7280'}],GROWN=1.7,TOL=.35,TAPE=.5;
const TALLQ={q:'About how many grown-ups tall is a giraffe?',opts:['3','1','10'],ans:0,bad:{1:'One grown-up only reaches the bottom of the giraffe\u2019s body. Count up the tape: about 3 grown-ups.',2:'10 grown-ups would be about 17 m. A giraffe is about 5.5 m: about 3 grown-ups.'}};
const BIRDS=[{k:'bee',n:'Bee hummingbird',cm:5.5,c:'#059669'},{k:'robin',n:'Robin',cm:14,c:'#c2410c'},{k:'hen',n:'Chicken',cm:40,c:'#b45309'},{k:'ostrich',n:'Ostrich',cm:250,c:'#44403c'}];
const SHUF=['hen','bee','ostrich','robin'];
const DESC=['A race track with four lanes: a cheetah, a horse, the fastest person and an elephant at the start.',
 'A peregrine falcon high in the sky and a cheetah on the ground, ready to go.',
 'A blue whale on a long road. Add cars in a line to see how long it is.',
 'A giraffe and an elephant with a measuring tape. Drag the tape up to the top of each one.',
 'Four bird cards, all drawn the same size. Tap them from smallest to biggest.'];
const DONE=['The cheetah won and the elephant came last. The biggest is not the fastest.',
 'The falcon\u2019s dive beat the cheetah. The cheetah is the fastest on land; the falcon is the fastest of all.',
 'The blue whale is about 5 cars long. It is the biggest animal that has ever lived.',
 'The giraffe is the tallest: about 3 grown-ups. The elephant is heavier, but much shorter.',
 'Smallest first: bee hummingbird, robin, chicken, ostrich. Pictures in books are not real size.'];
const TXT=['Four animals line up for a race. Tap Go and watch who gets to the flag first.',
 'A peregrine falcon dives to catch its food. Race its dive against a cheetah.',
 'The blue whale is the biggest animal ever. Add cars nose to tail until they are as long as the whale.',
 'Drag the tape up to the top of each animal\u2019s head, or use the buttons. Who is the tallest?',
 'The cards make every bird look the same size. Tap them in order, from the smallest bird to the biggest.'];
const QS=[{q:'Which animal is the fastest on land?',a:'Cheetah',o:[['Elephant, because it is the biggest','bigfast'],['Horse','land']]},
 {q:'Which animal is the fastest of all?',a:'Peregrine falcon, in a dive',o:[['Cheetah','cheetah'],['Blue whale','bigfast']]},
 {q:'What is the biggest animal that has ever lived?',a:'Blue whale',o:[['T. rex','dino'],['Elephant','land']]},
 {q:'Which animal is the tallest?',a:'Giraffe',o:[['Elephant, because it is the heaviest','heavytall'],['Blue whale','heavytall']]},
 {q:'Which is the smallest bird?',a:'Bee hummingbird',o:[['Robin','book'],['Chicken','book']]},
 {q:'A blue whale is about as long as ...',a:'5 cars in a line',o:[['1 car','dino'],['a bike','dino']]},
 {q:'"Fastest" means ...',a:'faster than all the others',o:[['a bit fast','word'],['the biggest','bigfast']]}];
const END=['Fastest on land: cheetah','Fastest of all: peregrine falcon','Biggest ever: blue whale','Tallest: giraffe','Smallest bird: bee hummingbird'];
return{RUN,RUNQ,DIVE,DIVEQ,WHALE,CAR,CARS,TALL,GROWN,TOL,TAPE,TALLQ,BIRDS,SHUF,DESC,DONE,TXT,QS,END}})();
/* Animal shapes for flaganimrec, drawn on the lab canvas: standing on gy, h = height in pixels, facing right. */
const ANIMREC_SHAPES=A=>{const DARK='#0f172a',{RUN}=ANIMREC;
/* simple animal shapes, standing on gy, h = height in pixels, facing right */
function quad(x,gy,h,col,o){o=o||{};const g=A.ctx,l=h*(o.long||1.4);g.fillStyle=col;g.strokeStyle=DARK;g.lineWidth=1.5;
 [-.3,-.16,.18,.3].forEach(f=>g.fillRect(x+l*f-1.5,gy-h*.5,3.5,h*.5));g.beginPath();g.ellipse(x,gy-h*.58,l*.4,h*.2,0,0,7);g.fill();g.stroke();
 if(o.neck){g.lineWidth=Math.max(3,h*.07);g.strokeStyle=col;g.beginPath();g.moveTo(x+l*.3,gy-h*.62);g.lineTo(x+l*.42,gy-h*.94);g.stroke();g.lineWidth=1.5;g.strokeStyle=DARK}
 const hx=x+l*(o.neck?.46:.44),hy=gy-h*(o.neck?.95:.7);g.beginPath();g.ellipse(hx,hy,l*.1,h*.08,0,0,7);g.fill();g.stroke();
 if(o.spots){g.fillStyle='#1c1917';for(let i=0;i<5;i++){g.beginPath();g.arc(x-l*.25+i*l*.12,gy-h*(.55+(i%2)*.08),Math.max(1,h*.03),0,7);g.fill()}}
 if(o.trunk){g.strokeStyle=col;g.lineWidth=Math.max(3,h*.08);g.beginPath();g.moveTo(hx+l*.06,hy);g.quadraticCurveTo(hx+l*.16,hy+h*.2,hx+l*.1,gy-h*.15);g.stroke();g.lineWidth=1.5;g.strokeStyle=DARK}}
function runner(k,x,gy,h){if(k==='person'){const g=A.ctx,pc=A.col.dark?'#cbd5e1':'#334155';g.strokeStyle=pc;g.fillStyle=pc;g.lineWidth=Math.max(2,h*.07);g.lineCap='round';
  g.beginPath();g.arc(x,gy-h*.88,h*.1,0,7);g.fill();g.beginPath();g.moveTo(x,gy-h*.78);g.lineTo(x-h*.05,gy-h*.42);g.lineTo(x-h*.22,gy);g.moveTo(x-h*.05,gy-h*.42);g.lineTo(x+h*.18,gy-h*.05);
  g.moveTo(x-h*.2,gy-h*.58);g.lineTo(x+h*.2,gy-h*.7);g.stroke();return}
 const R=RUN.find(r=>r.k===k);quad(x,gy,h,R.c,{spots:k==='cheetah',trunk:k==='ele',long:k==='ele'?1.2:1.5})}
function falcon(x,y,s){const g=A.ctx;g.fillStyle='#475569';g.strokeStyle=DARK;g.lineWidth=1.5;g.beginPath();g.moveTo(x+s,y+s*.6);g.lineTo(x-s*.6,y-s*.2);g.lineTo(x-s*.2,y+s*.15);g.lineTo(x-s*.9,y+s*.25);g.closePath();g.fill();g.stroke();
 g.fillStyle='#fde68a';g.beginPath();g.arc(x+s*.75,y+s*.45,s*.12,0,7);g.fill()}
function whale(x,y,L,h){const g=A.ctx;g.fillStyle='#1e40af';g.strokeStyle=DARK;g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+L*.15,y-h*.6,x+L*.55,y-h*.45);
 g.quadraticCurveTo(x+L*.85,y-h*.3,x+L*.93,y-h*.05);g.lineTo(x+L,y-h*.35);g.lineTo(x+L,y+h*.25);g.lineTo(x+L*.93,y+h*.02);g.quadraticCurveTo(x+L*.6,y+h*.4,x+L*.2,y+h*.35);g.quadraticCurveTo(x,y+h*.3,x,y);g.closePath();g.fill();g.stroke();
 g.fillStyle='#ffffff';g.beginPath();g.arc(x+L*.08,y-h*.08,Math.max(1.5,h*.06),0,7);g.fill()}
function car(x,gy,L,col){const g=A.ctx,h=L*.32;g.fillStyle=col;A.paint.rrect(x+1,gy-h,L-2,h*.62,4);g.fill();g.strokeStyle=DARK;g.lineWidth=1.2;g.stroke();
 g.beginPath();g.moveTo(x+L*.22,gy-h*.62);g.lineTo(x+L*.32,gy-h);g.lineTo(x+L*.7,gy-h);g.lineTo(x+L*.8,gy-h*.62);g.closePath();g.fill();g.stroke();
 g.fillStyle='#111827';[.22,.78].forEach(f=>{g.beginPath();g.arc(x+L*f,gy-h*.36,Math.max(2,h*.18),0,7);g.fill()})}
function grown(x,gy,h,col){const g=A.ctx;g.strokeStyle=col||'#334155';g.fillStyle=col||'#334155';g.lineWidth=Math.max(1.5,h*.06);g.lineCap='round';
 g.beginPath();g.arc(x,gy-h*.9,h*.09,0,7);g.fill();g.beginPath();g.moveTo(x,gy-h*.8);g.lineTo(x,gy-h*.45);g.moveTo(x-h*.13,gy);g.lineTo(x,gy-h*.45);g.lineTo(x+h*.13,gy);g.moveTo(x-h*.15,gy-h*.64);g.lineTo(x+h*.15,gy-h*.64);g.stroke()}
function giraffe(x,gy,h,col){const g=A.ctx;g.fillStyle=col;g.strokeStyle=DARK;g.lineWidth=1.5;[-.16,-.08,.1,.18].forEach(f=>{g.fillRect(x+h*f-2,gy-h*.52,4,h*.52)});
 g.beginPath();g.ellipse(x,gy-h*.56,h*.24,h*.09,-.12,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(x+h*.12,gy-h*.6);g.lineTo(x+h*.25,gy-h*.93);g.lineTo(x+h*.31,gy-h*.9);g.lineTo(x+h*.21,gy-h*.56);g.closePath();g.fill();g.stroke();
 g.beginPath();g.ellipse(x+h*.31,gy-h*.94,h*.07,h*.035,.4,0,7);g.fill();g.stroke();g.fillStyle='#78350f';[[-.12,.56],[0,.6],[.1,.54],[.2,.72],[.24,.83]].forEach(([a,b])=>{g.beginPath();g.arc(x+h*a,gy-h*b,Math.max(1.5,h*.018),0,7);g.fill()})}
function elephant(x,gy,h,col){const g=A.ctx;g.fillStyle=col;g.strokeStyle=DARK;g.lineWidth=1.5;[-.42,-.24,.16,.34].forEach(f=>{g.fillRect(x+h*f-h*.06,gy-h*.48,h*.12,h*.48);g.strokeRect(x+h*f-h*.06,gy-h*.48,h*.12,h*.48)});
 g.beginPath();g.ellipse(x-h*.04,gy-h*.68,h*.52,h*.3,0,0,7);g.fill();g.stroke();g.beginPath();g.ellipse(x+h*.5,gy-h*.72,h*.17,h*.2,0,0,7);g.fill();g.stroke();
 g.beginPath();g.ellipse(x+h*.42,gy-h*.72,h*.12,h*.17,0,0,7);g.stroke();g.lineWidth=Math.max(3,h*.08);g.strokeStyle=col;g.beginPath();g.moveTo(x+h*.62,gy-h*.68);g.quadraticCurveTo(x+h*.72,gy-h*.4,x+h*.66,gy-h*.12);g.stroke()}
function bird(x,gy,h,col,o){o=o||{};const g=A.ctx;g.fillStyle=col;g.strokeStyle=DARK;g.lineWidth=1.5;
 if(o.legs){g.beginPath();g.moveTo(x-h*.06,gy-h*.45);g.lineTo(x-h*.06,gy);g.moveTo(x+h*.06,gy-h*.45);g.lineTo(x+h*.06,gy);g.stroke()}
 const by=gy-h*(o.legs?.55:.4);g.beginPath();g.ellipse(x,by,h*.3,h*.2,0,0,7);g.fill();g.stroke();
 const ny=o.legs?by-h*.3:by-h*.12;if(o.legs){g.lineWidth=Math.max(2,h*.05);g.strokeStyle=col;g.beginPath();g.moveTo(x+h*.18,by-h*.05);g.lineTo(x+h*.22,ny);g.stroke();g.lineWidth=1.5;g.strokeStyle=DARK}
 g.beginPath();g.arc(x+h*.24,ny,h*.1,0,7);g.fill();g.stroke();g.fillStyle='#f59e0b';g.beginPath();g.moveTo(x+h*.33,ny-h*.02);g.lineTo(x+h*(o.beak||.44),ny+h*.01);g.lineTo(x+h*.33,ny+h*.04);g.closePath();g.fill()}
return{quad,runner,falcon,whale,car,grown,giraffe,elephant,bird}};
