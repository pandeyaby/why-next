/* Data, text helpers and drawings for flagmetam (types of metamorphosis, ages 9–11; Monarch Joint Venture "Growth
   and development": five larval instars, the larval exoskeleton only stretches a little so it is shed, a pupa of
   about 10–14 days in which wings and flight muscles grow from imaginal discs and the gut changes from leaf-chewing
   to nectar-sipping; University of Maryland Extension FS-1144; Kaleka et al. 2019 (IntechOpen) on gradual
   metamorphosis: grasshopper nymphs resemble the adult, grow wing pads that enlarge at each of 5–6 moults, no pupa;
   Royal Entomological Society and Natural History Museum guides to complete and incomplete metamorphosis; DfE
   National Curriculum 2013 Year 5 life cycles of an insect). Slips it targets: "the hard skin stretches as it grows",
   "every insect has a pupa", "a pupa is asleep, doing nothing", "a nymph looks nothing like its adult", "a spider is
   an insect" and "a small butterfly is a baby that will grow". */
const MET=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function brush(A,K){const z=n=>Math.round(A.narrow?n:n*1.15);
 function word(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${z(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const rows=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){rows.push(cur);cur=w}else cur=t}rows.push(cur);
  rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*z(n)*1.2))}
 function tile(b,fill,m){const g=A.ctx;g.fillStyle=m==='ok'?'#dcfce7':m==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(10,b.h/3));g.fill();
  g.lineWidth=m?3:1.5;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[m]||K.rim;g.stroke()}
 function lane(n,a,gap){gap=gap==null?8:gap;const w=(a.w-gap*(n-1))/n;return Array.from({length:n},(_,i)=>box(a.x+i*(w+gap),a.y,w,a.h))}
 function table(n,cols,a,gap){gap=gap||8;const r=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(r-1))/r;return Array.from({length:n},(_,i)=>box(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{z,word,tile,lane,table}}
const MOULTS=5;
/* 2. two life cycles: lane 0 butterfly (egg fixed in slot 0), lane 1 grasshopper; o = slot it belongs in */
const STAGES=[{t:'Larva (caterpillar)',l:0,o:1,d:'cat'},{t:'Pupa (chrysalis)',l:0,o:2,d:'pupa'},{t:'Adult butterfly',l:0,o:3,d:'fly'},{t:'Nymph',l:1,o:1,d:'nymph'},{t:'Adult grasshopper',l:1,o:2,d:'hop'}];
/* 3. sort: k 0 complete, 1 incomplete, 2 not an insect */
const BUGS=[{t:'Ladybird',c:'Young is a spiky larva, then a pupa',k:0},{t:'Housefly',c:'Young is a maggot, then a pupa',k:0},{t:'Honeybee',c:'Young is a grub in the comb, then a pupa',k:0},
 {t:'Cricket',c:'Young is a nymph: a small cricket with no wings',k:1},{t:'Dragonfly',c:'Young is a nymph in a pond. No pupa',k:1},{t:'Cockroach',c:'Young is a nymph that moults into an adult',k:1},
 {t:'Spider',c:'8 legs. Babies look like tiny spiders',k:2}];
const KINDS=['Complete: egg, larva, pupa, adult','Incomplete: egg, nymph, adult','Not an insect'];
/* 4. inside the chrysalis, day 0-10 */
const DAYS=10,PHASE=[[0,'Day 0: the caterpillar has just made its chrysalis'],[1,'Much of the caterpillar body breaks down'],[4,'Groups of cells build wings, legs, eyes and a sipping tube'],[8,'The wings get their colours: you can see them through the case'],[10,'Out comes the butterfly!']];
/* 5. food: eater i takes food FOOD[j] when j === EAT[i] */
const EATERS=['Caterpillar','Butterfly','Grasshopper nymph','Adult grasshopper'],FOODS=['Leaves (chewed)','Nectar (sipped)','Grass','Grass'],EAT=[0,1,2,3];
const BRIEF=['A young grasshopper, a nymph, in its hard outer skin. Drag a leaf to it to feed it, then drag it out of its old skin to moult.',
 'Two life cycles, each starting with an egg. Drag each stage card into the next box of the right life cycle.',
 'Seven small animals and their young. Drag each one to Complete, Incomplete, or Not an insect.',
 'Inside a chrysalis. Drag the marker along the days and watch what happens inside.',
 'Two young insects and their adults. Drag each food to the animal that eats it.','Challenge.'];
const GOT=['A hard outer skin cannot stretch. A young insect grows by moulting it, again and again.',
 'Complete metamorphosis has 4 stages: egg, larva, pupa, adult. Incomplete has 3: egg, nymph, adult, with no pupa.',
 'A pupa stage means complete metamorphosis. A nymph means incomplete. Spiders are not insects.',
 'A pupa is not asleep. Inside, the body is taken apart and rebuilt with wings.',
 'A caterpillar and a butterfly eat different food, so they do not compete. A nymph eats the same as its adult.'];
const QZ=[{q:'Which life cycle has a pupa stage?',a:'Complete metamorphosis',o:[['Incomplete metamorphosis','nopupa'],['Both of them','allpupa']]},
 {q:'Why does a young grasshopper moult?',a:'Its hard skin cannot stretch, so it grows a new, bigger one',o:[['To change colour','colour'],['Because it is cold','colour']]},
 {q:'What does a grasshopper nymph look like?',a:'A small adult with no full wings',o:[['A worm with no legs','nymphlook'],['A chrysalis','nopupa']]},
 {q:'What happens inside a chrysalis?',a:'The body is taken apart and rebuilt with wings',o:[['Nothing: it is asleep','asleep'],['The caterpillar just gets bigger','asleep']]},
 {q:'A small butterfly and a big one are the same kind. Is the small one a baby?',a:'No: adult butterflies do not grow',o:[['Yes, it will grow bigger','grow'],['Yes, it will moult','grow']]},
 {q:'Why is a spider not in either group?',a:'A spider is not an insect',o:[['It has a pupa','spider'],['It has a nymph with wings','spider']]},
 {q:'A caterpillar and a butterfly do not compete for food. Why?',a:'The caterpillar eats leaves; the butterfly sips nectar',o:[['They both eat leaves','samefood'],['Butterflies do not eat','samefood']]}];
/* ---------- drawings ---------- */
function hopper(g,x,y,s,wing,col){g.save();g.fillStyle=col||'#65a30d';g.strokeStyle='#365314';g.lineWidth=1.5;
 g.beginPath();g.ellipse(x,y,s*.5,s*.17,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(x+s*.52,y-s*.04,s*.16,0,7);g.fill();g.stroke();
 g.fillStyle='#111827';g.beginPath();g.arc(x+s*.58,y-s*.08,s*.035,0,7);g.fill();
 g.strokeStyle='#365314';g.lineWidth=2;g.beginPath();g.moveTo(x+s*.6,y-s*.16);g.quadraticCurveTo(x+s*.8,y-s*.5,x+s*.95,y-s*.45);g.stroke();
 g.beginPath();g.moveTo(x-s*.1,y+s*.1);g.lineTo(x-s*.35,y-s*.3);g.lineTo(x-s*.55,y+s*.22);g.stroke();
 [.15,.32].forEach(k=>{g.beginPath();g.moveTo(x+s*k,y+s*.12);g.lineTo(x+s*(k+.05),y+s*.3);g.stroke()});
 if(wing>0){g.fillStyle='rgba(132,204,22,.75)';g.strokeStyle='#365314';g.lineWidth=1.2;g.beginPath();g.ellipse(x-s*(.05+.12*wing),y-s*.12,s*(.08+.4*wing),s*(.05+.08*wing),-.08,0,7);g.fill();g.stroke()}g.restore()}
function crawler(g,x,y,s){g.save();for(let i=0;i<6;i++){g.fillStyle=i%2?'#facc15':'#16a34a';g.beginPath();g.arc(x-s*.4+i*s*.15,y,s*.1,0,7);g.fill()}
 g.fillStyle='#111827';g.beginPath();g.arc(x+s*.42,y-s*.02,s*.03,0,7);g.fill();g.restore()}
function chrysalis(g,x,y,s,day){g.save();const clear=Math.max(0,(day-7)/3);g.fillStyle=`rgb(${Math.round(74+120*clear)},${Math.round(222-120*clear)},${Math.round(128-90*clear)})`;
 g.strokeStyle='#166534';g.lineWidth=2;g.beginPath();g.ellipse(x,y,s*.28,s*.48,0,0,7);g.fill();g.stroke();g.fillStyle='#facc15';[-.18,.18].forEach(k=>{g.beginPath();g.arc(x+k*s*.6,y-s*.3,s*.03,0,7);g.fill()});
 g.strokeStyle='#14532d';g.beginPath();g.moveTo(x,y-s*.48);g.lineTo(x,y-s*.62);g.stroke();
 if(day>=4){const w=Math.min(1,(day-3)/4);g.fillStyle=clear>0?'#ea580c':'rgba(21,128,61,.6)';g.beginPath();g.ellipse(x-s*.08,y-s*.05,s*.12*w,s*.25*w,.3,0,7);g.fill();g.beginPath();g.ellipse(x+s*.08,y-s*.05,s*.12*w,s*.25*w,-.3,0,7);g.fill()}
 if(day>=1&&day<4){g.fillStyle='rgba(254,240,138,.8)';for(let i=0;i<7;i++){g.beginPath();g.arc(x+Math.sin(i*2.1)*s*.13,y+Math.cos(i*1.7)*s*.25,s*.04,0,7);g.fill()}}g.restore()}
function flyer(g,x,y,s){g.save();g.fillStyle='#ea580c';g.strokeStyle='#111827';g.lineWidth=2;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{g.beginPath();g.ellipse(x+a*s*.25,y+b*s*.14,s*.24,b<0?s*.2:s*.14,a*b*.5,0,7);g.fill();g.stroke()});
 g.fillStyle='#111827';g.fillRect(x-s*.03,y-s*.3,s*.06,s*.6);g.beginPath();g.moveTo(x,y-s*.3);g.lineTo(x-s*.12,y-s*.48);g.moveTo(x,y-s*.3);g.lineTo(x+s*.12,y-s*.48);g.stroke();g.restore()}
return{box,inside,brush,MOULTS,STAGES,BUGS,KINDS,DAYS,PHASE,EATERS,FOODS,EAT,BRIEF,GOT,QZ,hopper,crawler,chrysalis,flyer}})();
