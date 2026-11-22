/* Data and pictures for flaglabel (writing labels and captions, ages 4–5). Sources: DfE Development Matters 2021,
   Reception Writing ("form lower-case and capital letters correctly; spell words by identifying the sounds and then
   writing the sound with letter/s; write short sentences with words with known sound-letter correspondences using a
   capital letter and full stop"); DfE EYFS Statutory Framework 2024, ELG Writing; Letters and Sounds Phase 2 CVC words.
   A label is one naming word placed next to the thing it names, often with a line to it; a caption is a short sentence
   that tells about the whole picture. Slips it targets: a label put somewhere else on the page, writing only the first
   sound of the word, copying any letters rather than listening for each sound, mixing up a label and a caption, a
   caption with no capital letter or full stop, and a full stop added to a one-word label. */
const LABEL=(()=>{
const NAME={sun:'sun',tree:'tree',cat:'cat',dog:'dog',hat:'hat'};
const PLACE=['sun','tree','cat'];
const BUILD=[{w:'dog',tiles:['g','o','t','d']},{w:'hat',tiles:['t','s','a','h']}];
const SORT=[['cat',0],['The cat is on the mat.',1],['sun',0],['I can see a big tree.',1],['hat',0],['The dog has a hat.',1]];
const CAP=['The','dog','is','in','the','sun','.'],CAPTILES=['sun','is','.','The','in','dog','the'];
const ROBOT=[{two:['cat','sun'],lab:'cat',at:0,ok:true,fix:'"cat" is next to the cat, with a line to it. Right.'},
 {two:['tree','sun'],lab:'tree',at:1,ok:false,fix:'The label says tree, but it is by the sun. A label goes next to the thing it names.'},
 {two:['dog','tree'],lab:'d',at:0,ok:false,fix:'Only the first sound. Say it slowly: d-o-g. Dog needs 3 letters.'},
 {two:['dog','sun'],cap:'the dog is in the sun',ok:false,fix:'A caption starts with a capital letter and ends with a full stop: The dog is in the sun.'},
 {two:['hat','tree'],lab:'hat',at:0,ok:true,fix:'"hat": h-a-t, next to the hat. Right.'}];
const DESC=['A picture with a sun, a tree and a cat. Three word cards: sun, tree, cat. Put each label by its thing.',
 'A dog, with three empty boxes for its label. Tap the letter for each sound you hear.',
 'One card at a time. Is it a label, one naming word, or a caption, a sentence about the picture?',
 'A dog in the sun. Tap the word cards in order to make a caption under the picture.',
 'The robot made some labels and a caption. Is each one right, or did it slip?'];
const DONE=['Each label is one word, next to the thing it names.',
 'd-o-g and h-a-t. You said each word slowly and wrote a letter for each sound.',
 'One naming word is a label. A sentence about the picture is a caption.',
 'The dog is in the sun. A capital letter at the start, a full stop at the end.',
 'The robot slipped 3 times: a label by the wrong thing, only the first sound, and a caption with no capital or full stop.'];
const TXT=['Drag each word card to the thing it names. Or tap a card, then tap the thing. Tap a card to hear it.',
 'Say the word slowly: d-o-g. Tap the letter for the first sound, then the next, then the last.',
 'Drag the card into Label or Caption. Or tap a box. A label names one thing. A caption tells about the picture.',
 'Tap the words in order to make the caption: The dog is in the sun. Start with a capital. End with a full stop.',
 'Look at each label or caption the robot made. Tap Right or Slip.'];
const QS=[{q:'What is a label?',a:'One word that names a thing',o:[['A long story about the picture','story'],['A sentence with a full stop','dotlabel']]},
 {q:'Where does the label "dog" go?',a:'Next to the dog, with a line to it',o:[['Anywhere on the page','where'],['Next to the sun','where']]},
 {q:'Which one is a caption?',a:'The cat is on the mat.',o:[['cat','label'],['the cat is on the mat','caps']]},
 {q:'You want to write "sun". What do you do?',a:'Say s-u-n and write a letter for each sound',o:[['Write just the s','first'],['Copy any letters I know','copy']]},
 {q:'How does a caption start and end?',a:'A capital letter at the start, a full stop at the end',o:[['A full stop at the start','order'],['No capital and no full stop','caps']]},
 {q:'Sam labels his dog "d". What is missing?',a:'The o and the g: d-o-g',o:[['Nothing, d is enough','first'],['A full stop after d','dotlabel']]}];
/* simple pictures, drawn at centre x,y with size u */
function SHAPES(A){const g=()=>A.ctx,INK='#0f172a';
 function sun(x,y,u){const c=g();c.strokeStyle='#d97706';c.lineWidth=Math.max(2,u*.08);for(let i=0;i<8;i++){const a=i*Math.PI/4;c.beginPath();c.moveTo(x+Math.cos(a)*u*.62,y+Math.sin(a)*u*.62);c.lineTo(x+Math.cos(a)*u*.9,y+Math.sin(a)*u*.9);c.stroke()}
  c.fillStyle='#facc15';c.beginPath();c.arc(x,y,u*.5,0,7);c.fill();c.strokeStyle='#a16207';c.lineWidth=2;c.stroke()}
 function tree(x,y,u){const c=g();c.fillStyle='#92400e';c.fillRect(x-u*.12,y,u*.24,u*.8);c.fillStyle='#16a34a';[[0,-.25,.5],[-.32,.05,.36],[.32,.05,.36]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(x+dx*u,y+dy*u,r*u,0,7);c.fill()});
  c.strokeStyle='#14532d';c.lineWidth=2;c.beginPath();c.arc(x,y-u*.25,u*.5,0,7);c.stroke()}
 function cat(x,y,u){const c=g();c.fillStyle='#fb923c';c.beginPath();c.ellipse(x,y+u*.42,u*.42,u*.34,0,0,7);c.fill();
  c.beginPath();c.arc(x,y-u*.05,u*.32,0,7);c.fill();[-1,1].forEach(e=>{c.beginPath();c.moveTo(x+e*u*.3,y-u*.2);c.lineTo(x+e*u*.22,y-u*.5);c.lineTo(x+e*u*.06,y-u*.32);c.fill()});
  c.strokeStyle='#7c2d12';c.lineWidth=2;c.beginPath();c.arc(x,y-u*.05,u*.32,0,7);c.stroke();c.fillStyle=INK;[-1,1].forEach(e=>{c.beginPath();c.arc(x+e*u*.12,y-u*.1,u*.045,0,7);c.fill()});
  c.beginPath();c.moveTo(x+u*.4,y+u*.5);c.quadraticCurveTo(x+u*.75,y+u*.4,x+u*.62,y+u*.05);c.stroke()}
 function dog(x,y,u){const c=g();c.fillStyle='#a16207';c.beginPath();c.ellipse(x,y+u*.25,u*.5,u*.26,0,0,7);c.fill();
  c.fillRect(x-u*.42,y+u*.35,u*.1,u*.32);c.fillRect(x+u*.3,y+u*.35,u*.1,u*.32);c.beginPath();c.arc(x-u*.48,y-u*.08,u*.26,0,7);c.fill();
  c.fillStyle='#713f12';c.beginPath();c.ellipse(x-u*.66,y-u*.1,u*.09,u*.2,.3,0,7);c.fill();c.fillStyle=INK;c.beginPath();c.arc(x-u*.52,y-u*.14,u*.04,0,7);c.fill();c.beginPath();c.arc(x-u*.72,y-u*.02,u*.05,0,7);c.fill();
  c.strokeStyle='#713f12';c.lineWidth=Math.max(2,u*.07);c.beginPath();c.moveTo(x+u*.48,y+u*.18);c.quadraticCurveTo(x+u*.75,y,x+u*.68,y-u*.2);c.stroke()}
 function hat(x,y,u){const c=g();c.fillStyle='#2563eb';c.beginPath();c.ellipse(x,y+u*.25,u*.7,u*.16,0,0,7);c.fill();c.beginPath();c.moveTo(x-u*.38,y+u*.22);c.quadraticCurveTo(x-u*.36,y-u*.42,x,y-u*.42);c.quadraticCurveTo(x+u*.36,y-u*.42,x+u*.38,y+u*.22);c.fill();
  c.fillStyle='#fbbf24';c.fillRect(x-u*.37,y+u*.02,u*.74,u*.12);c.strokeStyle='#1e3a8a';c.lineWidth=2;c.beginPath();c.ellipse(x,y+u*.25,u*.7,u*.16,0,0,7);c.stroke()}
 return{sun,tree,cat,dog,hat}}
return{NAME,PLACE,BUILD,SORT,CAP,CAPTILES,ROBOT,DESC,DONE,TXT,QS,SHAPES}})();
