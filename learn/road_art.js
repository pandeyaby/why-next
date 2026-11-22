/* Data and pictures for flagroad (crossing the road: stop, look, listen, ages 6–7). Sources: UK Department for
   Transport THINK! road safety, the Green Cross Code (1 Think: find the safest place to cross; 2 Stop just before
   the kerb; 3 Use your eyes and ears: look all around for traffic and listen; 4 If traffic is coming, let it pass;
   5 When it is safe, go straight across, do not run; 6 Keep looking and listening while you cross) and its advice that
   children under 8 cross with a grown-up; RoSPA child pedestrian guidance (parked cars hide children from drivers;
   at a crossing, wait for the green figure and for traffic to stop); WHO (2008) World report on child injury
   prevention, chapter 2 (young children find it hard to judge the speed and distance of traffic). Slips it targets:
   crossing between parked cars or on a bend, looking only one way, running across, stopping looking half-way,
   thinking that if you can see a car the driver can see you, and thinking a far-away car is always slower to arrive. */
const ROAD=(()=>{
const SPOTS=[{k:'parked',x:.2,t:'between cars',ok:0,why:'Parked cars hide you, so drivers cannot see you step out. Find a crossing instead.'},
 {k:'zebra',x:.44,t:'zebra',ok:1},{k:'lights',x:.64,t:'green figure',ok:1},
 {k:'bend',x:.86,t:'on a bend',ok:0,why:'On a bend you cannot see cars coming round the corner, and they cannot see you.'}];
const CODE=['Find a safer place','Stop at the kerb','Look all around and listen','Wait until no traffic','Walk straight across, keep looking'];
const SHUF=[3,0,4,2,1];
const FRAMES=[{cars:[{side:0,x:.22}],ans:'wait'},{cars:[{side:1,x:.8}],ans:'wait'},{cars:[],ans:'cross'}];
const VAN={x0:.3,x1:.7},DRIVER=.06,SAFE=.08;
const RACE=[{a:{n:'A',far:1,fast:1,x:.02,v:.5,c:'#dc2626'},b:{n:'B',far:0,fast:0,x:.46,v:.14,c:'#2563eb'},ans:'a',
  bad:'Car B was nearer, but car A was so fast it got there first. Far away does not always mean safe.'},
 {a:{n:'A',far:1,fast:0,x:.02,v:.16,c:'#7c3aed'},b:{n:'B',far:0,fast:1,x:.4,v:.4,c:'#ea580c'},ans:'b',
  bad:'Car B was near and fast, so it came first. Near and fast is the most dangerous of all.'}];
const DESC=['A street seen from above. Four places to cross: between parked cars, a zebra crossing, a crossing with a green figure, and a bend. Find the two safer places.',
 'Five cards with the steps of the Green Cross Code, mixed up. Tap them in order.',
 'You are at the kerb. The road is hidden until you look. Tap Look left and Look right, then choose Wait or Cross.',
 'A big van is parked by the kerb. A car is coming. Drag the child along the path to a place where the driver can see them.',
 'Two cars, A and B, drive to the crossing. Which one gets there first?'];
const DONE=['Zebra crossings and green-figure crossings are safer places. Not between parked cars or on a bend.',
 'Find a safer place, stop at the kerb, look all around and listen, wait until no traffic, walk straight across and keep looking.',
 'You looked both ways every time, waited for each car, and crossed only when nothing was coming.',
 'Behind the van the driver could not see you. Out from behind it, the driver can.',
 'A far, fast car can come sooner than a near, slow one. That is hard to judge, so cross with a grown-up.'];
const TXT=['Tap a place on the path where you would cross. Find the two safer places.',
 'Tap the steps of the Green Cross Code in order, first to last.',
 'Look left. Look right. Listen. Is anything coming? Then tap Wait or Cross.',
 'Drag the child left or right along the path. The line shows if the driver can see them.',
 'Look at how far away each car is, and how fast it goes. Pick which gets to the crossing first, then watch.'];
const QS=[{q:'What is the first step of the Green Cross Code?',a:'Find a safer place to cross',o:[['Run across quickly','run'],['Look one way','oneway']]},
 {q:'Which is a safer place to cross?',a:'A zebra crossing',o:[['Between two parked cars','parked'],['On a bend','bend']]},
 {q:'The road is clear on one side. A car is coming on the other side. What do you do?',a:'Wait for it to pass',o:[['Cross now','oneway'],['Run fast','run']]},
 {q:'You are behind a big parked van. Can the driver see you?',a:'No, the van hides me',o:[['Yes, I can see the road','see'],['Yes, if I wave','see']]},
 {q:'A car is far away but going very fast. Is it safe to cross?',a:'Maybe not: a fast car comes quickly',o:[['Yes, far away is always safe','speed'],['Yes, if I run','run']]},
 {q:'While you walk across, what do you do?',a:'Keep looking and listening',o:[['Look at my feet','keep'],['Run to the other side','run']]},
 {q:'Why do children aged 6 and 7 cross with a grown-up?',a:'Car speed is hard to judge, and drivers may not see small children',o:[['Because roads are always empty','why'],['Only because it is a rule at night','why']]}];
function SHAPES(A){const g=()=>A.ctx;
 function car(x,y,w,col,flip,van){const c=g(),h=w*(van?.55:.46);c.fillStyle=col;A.paint.rrect(x-w/2,y-h/2,w,h,h*.25);c.fill();c.strokeStyle='#0f172a';c.lineWidth=1.5;c.stroke();
  c.fillStyle='#bae6fd';const wx=flip?x-w*.38:x+w*.14;c.fillRect(wx,y-h*.36,w*.24,h*.72);c.strokeRect(wx,y-h*.36,w*.24,h*.72)}
 function kid(x,y,u,col){const c=g();c.fillStyle='#fcd9b6';c.beginPath();c.arc(x,y-u*.55,u*.28,0,7);c.fill();c.strokeStyle='#7c2d12';c.lineWidth=1.5;c.stroke();
  c.fillStyle=col||'#16a34a';A.paint.rrect(x-u*.28,y-u*.26,u*.56,u*.62,u*.15);c.fill();c.stroke();c.fillStyle='#1e293b';c.fillRect(x-u*.22,y+u*.36,u*.16,u*.34);c.fillRect(x+u*.06,y+u*.36,u*.16,u*.34)}
 function figure(x,y,u,green){const c=g();c.fillStyle='#111827';A.paint.rrect(x-u*.4,y-u*.9,u*.8,u*1.8,u*.15);c.fill();
  c.fillStyle=green?'#22c55e':'#3f3f46';c.beginPath();c.arc(x,y+u*.42,u*.28,0,7);c.fill();c.fillStyle=green?'#3f3f46':'#ef4444';c.beginPath();c.arc(x,y-u*.42,u*.28,0,7);c.fill()}
 return{car,kid,figure}}
return{SPOTS,CODE,SHUF,FRAMES,VAN,DRIVER,SAFE,RACE,DESC,DONE,TXT,QS,SHAPES}})();
