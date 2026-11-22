/* Data for flagactcount (counting claps, jumps and sounds, ages 4–5). Sources: DfE Development Matters 2021, Reception
   Mathematics ("count objects, actions and sounds"); Gelman and Gallistel 1978, The Child's Understanding of Number
   (one-one, stable-order, cardinal and abstraction principles); NCETM Mastering Number, Reception; Fuson 1988,
   Children's Counting and Concepts of Number (keeping track of counted items). A sound or an action is gone as soon
   as it happens, so it cannot be touched or moved aside like a counted object. Slips it targets: thinking only things
   you can touch can be counted, saying a number before the first beat or after the last, missing a quick one,
   counting a big or loud one as more than one, judging "more" by loudness, size or speed, and not stopping on the
   number when making actions. */
const ACTC=(()=>{
const BEATS=[3,5];
const JUMPS=[4,6];
const PAIRS=[{a:{n:3,big:1,who:'Loud',w:'loud bangs'},b:{n:3,big:0,who:'Quiet',w:'quiet taps'},ans:'same',bad:{a:'Loud does not mean more. 3 loud and 3 quiet are the same number.',b:'Quiet does not mean more. 3 and 3 are the same.'}},
 {a:{n:2,big:1,who:'Giant',w:'big slow stamps'},b:{n:4,big:0,who:'Mouse',w:'tiny quick taps'},ans:'b',bad:{a:'Big stamps are not worth more. Count them: the giant made 2, the mouse made 4.',same:'Count each one: 2 and 4 are not the same.'}}];
const RINGS=5;
const ROBOT=[{n:3,said:[1,2,3],ok:true,fix:'3 claps, one number for each: 1, 2, 3. Right.'},
 {n:4,said:[1,2,3,4,5],ok:false,fix:'It kept counting after the claps stopped. Stop when the claps stop: 4.'},
 {n:3,big:1,said:[1,2,3,4],ok:false,fix:'It counted the big clap twice. A big clap is still one clap: 3.'},
 {n:5,fast:1,said:[1,2,3,4],ok:false,fix:'It missed a quick clap. Say a number for every clap, fast or slow: 5.'},
 {n:2,said:[1,2],ok:true,fix:'2 jumps, one number each: 1, 2. Right.'}];
const DESC=[
 'A drum. Press Play the drum. It will boom a few times. Then tap how many booms.',
 'A frog on a lily pad. Tap the frog to make it jump. Stop on the number.',
 'Two drums. One plays, then the other. Then say which had more, or the same.',
 'A bell and a hand. Each time the bell rings, put up one finger.',
 'A robot counts claps out loud. Is it right, or did it slip?'];
const DONE=[
 '3 booms and 5 booms. You counted sounds you could not touch: one number for each boom.',
 '4 jumps and 6 jumps. You counted as you jumped and stopped on the number.',
 '3 loud and 3 quiet are the same. 4 tiny taps are more than 2 big stamps. Each one counts as one.',
 'The bell stopped, but your 5 fingers still showed how many rings.',
 'The robot slipped 3 times: it kept going, counted a big clap twice and missed a quick one.'];
const QS=[
 {q:'The drum goes boom, boom, boom. How many booms?',a:'3',o:[['4','extra'],['2','miss']]},
 {q:'Can you count claps, even though you cannot touch them?',a:'Yes, one number for each clap',o:[['No, only things you can hold','touch'],['Only if they are loud','loud']]},
 {q:'A giant stamps 2 times. A mouse taps 4 times. Who made more?',a:'The mouse: 4 is more than 2',o:[['The giant: big stamps count more','big'],['They are the same','same']]},
 {q:'Jump 3 times. When do you stop?',a:'When I say three',o:[['When I get tired','stop'],['After I say four','stop']]},
 {q:'Ben hears 4 claps and says "1, 2, 3, 4, 5". What went wrong?',a:'He kept counting after the claps stopped',o:[['Nothing, 5 is right','extra'],['He missed a clap','miss']]},
 {q:'3 loud bangs and 3 quiet taps. Which is more?',a:'The same: 3 and 3',o:[['The loud bangs','loud'],['The quiet taps','quiet']]}];
const WHY={def:'Say one number for each clap, jump or sound, and stop when they stop.'};
const TXT=['Tap the drum. It booms a few times, then stops. Say a number for each boom, then tap how many.', 'Tap the frog to make it jump. Count each jump out loud. Tap Stop when you say the number.', 'Tap to play the left drum, then the right. Count each side. Which made more, or are they the same?', 'Tap the bell. Each time it rings, put up one finger. When it stops, say how many rings.', 'The robot counts claps out loud. Its numbers are under the claps. Is it right, or did it slip?'];
return{BEATS,JUMPS,PAIRS,RINGS,ROBOT,DESC,DONE,QS,WHY,TXT}})();
