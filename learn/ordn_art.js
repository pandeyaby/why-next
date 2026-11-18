/* Data for the ordinal numbers flagship (flagordn), ages 4–5. Ordinal numbers name a position in an order (first, second,
   third ... tenth; written 1st, 2nd, 3rd, 4th ... 10th); cardinal numbers say how many. Position depends on where you
   start counting: the front of a queue is the end nearest the bus, a race is ordered by who is ahead, not by lane number. */
const ORDN=(()=>{
const WORD=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
const SHORT=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
const cap=w=>w.charAt(0).toUpperCase()+w.slice(1);
/* race: lane number (top to bottom) vs how far along; ahead = further right */
const RACE=[['frog','🐸',.38],['rabbit','🐇',.86],['tortoise','🐢',.2],['dog','🐶',.62],['cat','🐱',.74]];
const PLACE=RACE.map((r,i)=>i).sort((a,b)=>RACE[b][2]-RACE[a][2]); // lane indexes in finishing order
/* bus queue: six children; bus first on the left, then on the right */
const KIDS=['🧒','👧','👦','🧑','👶','👩'],KN=['Ava','Ben','Cleo','Dev','Eli','Fay'];
const QTASK=[['L',0],['L',1],['R',0],['R',3]]; // [bus side, ordinal index]
/* train: carriages counted from the engine */
const TRAIN=[['dog','🐶',1],['duck','🦆',4],['pig','🐷',0],['cow','🐮',2]];
/* ducklings behind mother duck */
const DUCKS=[5,8,9];
const QS=[
 {q:'Which bead is the third bead?',a:'One bead: the one in place 3',o:[['Three beads together','card'],['The bead at the far end','dir']]},
 {q:'The frog is in lane 1, but two animals are ahead of it. What place is the frog in?',a:'third',o:[['first','label'],['second','any']]},
 {q:'How do we say 2nd?',a:'second',o:[['twoth','word'],['two','card']]},
 {q:'The bus stops at the other end of the queue. Who is first now?',a:'The person nearest the bus',o:[['The same person as before','dir'],['Nobody is first','any']]},
 {q:'Mother duck leads 5 ducklings. Which duckling is first?',a:'The duckling just behind mother duck',o:[['Mother duck','start'],['The last duckling','dir']]},
 {q:'Which word comes straight after third?',a:'fourth',o:[['fifth','any'],['four','card']]}];
return{WORD,SHORT,cap,RACE,PLACE,KIDS,KN,QTASK,TRAIN,DUCKS,QS}})();
