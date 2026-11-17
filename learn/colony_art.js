/* Data, little drawings and screen-reader text for the social-insects lab (flag_colony.js; bundled in learn.js).
   Facts (British Beekeepers' Association "The honey bee colony"; Bumblebee Conservation Trust; Natural History Museum
   "Ants"; Royal Entomological Society; von Frisch, The Dance Language and Orientation of Bees): a honeybee colony has one
   queen, who lays the eggs (up to about 2,000 a day in summer), thousands of workers (all female) and, in summer, a few
   hundred drones (males, no sting, collect no food). A summer worker lives about 5–6 weeks and changes job as she ages:
   cleaning cells (days 1–2), feeding young (about days 3–11), making wax and building comb (about 12–17), guarding the
   entrance (about 18–21), then fetching nectar, pollen and water until she dies. The queen gives no orders. A forager's
   waggle run points the way: straight up the comb means "fly towards the sun"; the angle from straight up is the angle
   from the sun; a longer waggle means the food is farther away. Ant workers (all female) lay a scent trail (pheromone)
   home from food, nestmates follow it and refresh it, and it fades when no one does. Most of the 20,000-plus bee species
   live alone (mason, leafcutter and mining bees); all ants and some bees and wasps live in colonies. */
const COLART=(()=>{
/* [card, who: 0 queen 1 worker 2 drone, why it is not the box tapped] */
const JOBS=[['Lays all the eggs',0,'Only the queen lays eggs. That is her whole job.'],['Fetches nectar and pollen',1,'Workers do all the fetching. The queen and drones never collect food.'],
 ['Male, with no sting',2,'Drones are the male bees. Workers and the queen are female and can sting.'],['Builds the wax comb',1,'Workers make wax from their own bodies and build the comb.'],
 ['Only one in the hive',0,'There is just one queen. There are thousands of workers.'],['Guards the door',1,'Guard bees are workers. They check every bee that lands.'],['Does no work for food',2,'Drones eat honey but never fetch food. Their job is to mate with a young queen.']];
const WHO=['Queen','Worker','Drone'];
/* a worker's life in summer: [job, from day, to day, where in the hive] */
const LIFE=[['Clean cells',1,2,'inside'],['Feed the young',3,11,'inside'],['Build comb',12,17,'inside'],['Guard the door',18,21,'door'],['Fetch food',22,38,'outside']];
/* the field: flowers [name, angle from the sun in degrees (+ right), distance word, distance 0..1] and dances [angle, waggle 0..1] */
const FLW=[['Clover',0,'near',.3],['Heather',0,'far',.92],['Lime tree',60,'middle',.6]];
const DANCE=[[0,.92,1],[60,.6,2],[0,.3,0]];
const TEAM=[['Honeybee',1,'Honeybees live in hives of thousands.'],['Mason bee',0,'A mother mason bee works alone. Most kinds of bee live alone.'],['Garden ant',1,'Every kind of ant lives in a colony.'],
 ['Ladybird',0,'Ladybirds live and feed on their own.'],['Bumblebee',1,'Bumblebees live in small colonies of a few hundred.'],['Leafcutter bee',0,'Leafcutter bees nest alone in holes and stems.']];
const KIDS=[['The queen bee…',[['Ann','tells the workers what to do.','The queen gives no orders. Workers share out the jobs among themselves.'],['Ben','lays the eggs for the whole hive.',''],['Col','fetches most of the food.','Workers fetch the food. The queen stays inside laying eggs.']]],
 ['Worker bees are…',[['Dee','all male.','Workers are all female. The drones are the males.'],['Eve','all female.',''],['Fin','bigger than the queen.','The queen is the longest bee in the hive.']]],
 ['Bees…',[['Gia','all live in hives and make honey.','Most kinds of bee live alone and make no honey, like the mason bee.'],['Hal','never talk to each other.','Bees share news by dancing and by scent.'],['Ida','are insects, and many kinds live alone.','']]]];
const QZ=[['Who lays the eggs in a beehive?','The queen',[['The workers','eggs'],['The drones','eggs']]],['What is a drone?','A male bee',[['A worker that guards','drone'],['A baby queen','drone']]],
 ['A young worker has just hatched. What is her first job?','Cleaning cells',[['Fetching nectar','age'],['Laying eggs','eggs']]],['A waggle run points straight up the comb. Where is the food?','Towards the sun',[['Straight up in the sky','up'],['Away from the sun','up']]],
 ['A long waggle run means the food is…','far away',[['very close','len'],['very sweet','len']]],['How do ants find food a scout has found?','They follow her scent trail',[['The queen tells them','boss'],['They can see it from the nest','see']]]];
const WHY={eggs:'Only the queen lays eggs. Workers and drones do not.',drone:'A drone is a male bee. He has no sting and does not work.',age:'Workers start inside the hive and only fly out for food at about three weeks old.',
 up:'Up on the comb stands for the sun. The angle from straight up is the angle to fly from the sun.',len:'The longer the waggle, the farther away the food is.',boss:'No one gives orders. Each ant follows the scent left by the ant before.',see:'Ants follow smell, not sight. The scout leaves a scent trail on her way home.'};
const H={jobs:['Who does this job? Drag the card or tap a box.','Queen, workers, drones.'],age:['Drag the bee along her life, then tap her jobs in order.','Inside first, flying out last.'],dance:['Watch the dance. Tap the flower it points to.','Angle shows the way, length shows how far.'],
 trail:['Drag the scout ant home, or tap the button.','The scent trail leads the team to food.'],team:['Colony or alone? Drag or tap a box.','Not every bee lives in a hive.'],kids:['Who is right? Tap them.','Facts checked.'],quiz:['Many insects, one team.','']};
function bee(X,x,y,r,kind,col){X.save();X.translate(x,y);const len=kind===0?1.5:kind===2?1.2:1;X.fillStyle='#f5f5f4';X.strokeStyle='#1f2937';X.lineWidth=1.5;
 X.beginPath();X.ellipse(-r*.2,-r*.75,r*.55,r*.32,-.5,0,7);X.fill();X.stroke();X.beginPath();X.ellipse(r*.2,-r*.75,r*.55,r*.32,.5,0,7);X.fill();X.stroke();
 X.fillStyle=col||'#f59e0b';X.beginPath();X.ellipse(0,r*.15*len,r*.55,r*.9*len,0,0,7);X.fill();X.stroke();X.fillStyle='#1f2937';for(let k=0;k<3;k++)X.fillRect(-r*.5,r*(-.15+k*.42)*len,r,r*.16);
 X.beginPath();X.arc(0,-r*.85,r*(kind===2?.5:.4),0,7);X.fill();X.restore()}
function ant(X,x,y,r,a){X.save();X.translate(x,y);X.rotate(a||0);X.fillStyle='#7c2d12';[[-r*.9,.42],[0,.32],[r*.85,.5]].forEach(([dx,s])=>{X.beginPath();X.arc(dx,0,r*s,0,7);X.fill()});
 X.strokeStyle='#7c2d12';X.lineWidth=1.2;for(let k=-1;k<=1;k++){X.beginPath();X.moveTo(k*r*.25,0);X.lineTo(k*r*.4-r*.1,-r*.6);X.moveTo(k*r*.25,0);X.lineTo(k*r*.4-r*.1,r*.6);X.stroke()}X.restore()}
function say(k,S){let d='Challenge.';
 if(k==='jobs'||k==='team'){const L=k==='jobs'?JOBS:TEAM;d=S.won?'All sorted.':`Card: ${L[S.k][0]}. Sorted ${S.k} of ${L.length}.`}
 if(k==='age'){const j=LIFE.find(x=>S.day>=x[1]&&S.day<=x[2])||LIFE[0];d=S.won?'All five jobs in order.':`Worker bee, day ${S.day}: ${j[0].toLowerCase()}, ${j[3]==='outside'?'outside the hive':j[3]==='door'?'at the door':'inside the hive'}. Jobs tapped: ${S.seq.map(i=>LIFE[i][0]).join(', ')||'none'}.`}
 if(k==='dance'){const [a,l]=DANCE[Math.min(S.k,2)];d=S.won?'All three dances read.':`Dance ${S.k+1}: waggle run ${a?a+' degrees right of straight up':'straight up'}, ${l>.8?'long':l>.5?'medium':'short'}. Flowers: ${FLW.map(f=>`${f[0]}, ${f[1]?f[1]+' degrees right of the sun':'towards the sun'}, ${f[2]}`).join('; ')}.`}
 if(k==='trail')d=S.won?'The ants follow the trail to the food.':`Scout ant ${Math.round(S.walk*100)}% of the way home from the food. ${S.walk>=1?'':'Bring her to the nest.'}`;
 if(k==='kids')d=S.won?'All three checked.':`${KIDS[S.k][0]} `+KIDS[S.k][1].map(x=>x[0]+' says '+x[1]).join(' ');
 return d}
return {JOBS,WHO,LIFE,FLW,DANCE,TEAM,KIDS,QZ,WHY,H,bee,ant,say}})();
