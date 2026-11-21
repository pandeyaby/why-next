/* Data for flagtalkstory (talking about a story I know, ages 3–4; Development Matters 2021, Communication and
   Language 3–4 "engage in extended conversations about stories, learning new vocabulary"; Reception "retell the story,
   once they have developed a deep familiarity with the text, some as exact repetition and some in their own words";
   ELG Comprehension "demonstrate understanding of what has been read to them by retelling stories ... using their own
   words"). The story is the traditional tale Goldilocks and the Three Bears (Flora Annie Steel, English Fairy Tales,
   1918). Slips it targets: mixing in a character or event from another story, making up an event and saying it was in
   the book, answering a who question with a thing or a place (Blank's levels of questioning), saying "she" or "it" to
   a listener who does not know the story, and mixing up who did what. */
const TKS=(()=>{
/* 1. who was in it: y = in this story; slip = the mistake a wrong sort shows */
const WHO=[{t:'Goldilocks',k:'goldi',y:true},{t:'The big bad wolf',k:'wolf',y:false,slip:'other'},{t:'Daddy Bear',k:'bear3',y:true},
 {t:'A dragon',k:'dragon',y:false,slip:'made'},{t:'Mummy Bear',k:'bear2',y:true},{t:'Baby Bear',k:'bear1',y:true}];
/* 2. what happened: y = happened in the book */
const WHAT=[{t:'Goldilocks ate up Baby Bear\'s porridge',s:'Porridge eaten up',y:true},{t:'Goldilocks ate a big cake',s:'A big cake',y:false,slip:'made'},
 {t:'Baby Bear\'s chair broke',s:'The chair broke',y:true},{t:'The wolf blew the house down',s:'The wolf',y:false,slip:'other'},
 {t:'Goldilocks went to sleep in Baby Bear\'s bed',s:'Asleep in the bed',y:true},{t:'The bears came home',s:'Bears came home',y:true}];
/* 3. who, what, where: each answer is a person (p), a thing (t) or a place (w) */
const ASK=[{q:'Who ate the porridge?',want:'p',a:[['Goldilocks','p'],['The porridge','t'],['In the house','w']]},
 {q:'Where did the bears live?',want:'w',a:[['Baby Bear','p'],['A bowl','t'],['In a house in the wood','w']]},
 {q:'What broke?',want:'t',a:[['Goldilocks','p'],['Baby Bear\'s chair','t'],['In the kitchen','w']]},
 {q:'Who came home from a walk?',want:'p',a:[['The three bears','p'],['The beds','t'],['In the wood','w']]}];
const KIND={p:'a person or an animal',t:'a thing',w:'a place'},WORD={p:'Who',t:'What',w:'Where'};
/* 4. say the name: [vague, clear]; Grandpa did not hear the story */
const SAY=[['She ate it.','Goldilocks ate Baby Bear\'s porridge.'],['It broke.','Baby Bear\'s chair broke.'],
 ['They came back.','The three bears came home.']];
/* 5. who did what: true pairs only */
const DOER=['Goldilocks','The three bears','Baby Bear'];
const DID=[{t:'went for a walk',by:1},{t:'ate up the porridge',by:0},{t:'found her in his bed',by:2},{t:'ran away home',by:0}];
const DESC=['The book is shut. A picture card shows someone. Drag it to In the story or Not in this story, or tap a box.',
 'The book is shut. An event card and two boxes: It happened and It did not happen. Drag the card, or tap a box.',
 'A question and three answer cards. Drag the answer that fits the question word onto the question.',
 'Grandpa did not hear the story. Two ways to tell him. Tap the one he can understand.',
 'Who cards and did-what cards. Tap a who card, then a did-what card, to make a true story sentence.',
 'Challenge.'];
const DONE=['You remembered who was in it, with the book shut.','You remembered what really happened in this story.',
 'Who wants a person, what wants a thing, where wants a place.','Say the name, so your listener knows who you mean.',
 'You told who did what, in your own words.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Who was in Goldilocks and the Three Bears?',a:'Baby Bear',o:[['The big bad wolf','other'],['A dragon','made']]},
 {q:'Who ate the porridge?',a:'Goldilocks',o:[['A bowl','qword'],['In the house','qword']]},
 {q:'Where did the bears live?',a:'In a house in the wood',o:[['Baby Bear','qword'],['Porridge','qword']]},
 {q:'Grandpa did not hear the story. Which helps him most?',a:'Goldilocks broke the chair.',o:[['She broke it.','vague'],['It broke.','vague']]},
 {q:'What happened in the story?',a:'Goldilocks slept in Baby Bear\'s bed',o:[['Goldilocks ate a cake','made'],['The wolf blew the house down','other']]},
 {q:'Who ran away home at the end?',a:'Goldilocks',o:[['Baby Bear','mixup'],['The three bears','mixup']]}];
/* flat faces and a shut book, drawn with shapes */
function face(g,k,x,y,s){g.save();g.translate(x,y);g.lineWidth=Math.max(2,s*.05);g.strokeStyle='#1f2937';const dot=(a,b,r)=>{g.beginPath();g.arc(a,b,r,0,7);g.fill()};
 if(k.startsWith('bear')){const c='#a16207';g.fillStyle=c;dot(-s*.3,-s*.3,s*.14);dot(s*.3,-s*.3,s*.14);g.beginPath();g.arc(0,0,s*.4,0,7);g.fill();g.stroke();
  g.fillStyle='#fde68a';g.beginPath();g.ellipse(0,s*.14,s*.17,s*.12,0,0,7);g.fill();g.fillStyle='#1f2937';dot(-s*.14,-s*.08,s*.05);dot(s*.14,-s*.08,s*.05);dot(0,s*.1,s*.05);
  if(k==='bear3'){g.fillStyle='#1d4ed8';g.fillRect(-s*.16,s*.36,s*.32,s*.09)}if(k==='bear2'){g.fillStyle='#be185d';dot(s*.3,-s*.38,s*.08)}}
 if(k==='goldi'){g.fillStyle='#facc15';g.beginPath();g.arc(0,-s*.04,s*.46,0,7);g.fill();g.fillStyle='#fed7aa';g.beginPath();g.arc(0,s*.04,s*.32,0,7);g.fill();g.stroke();
  g.fillStyle='#1f2937';dot(-s*.12,0,s*.045);dot(s*.12,0,s*.045);g.beginPath();g.arc(0,s*.12,s*.1,.2,2.9);g.stroke()}
 if(k==='wolf'){g.fillStyle='#64748b';g.beginPath();g.moveTo(-s*.36,-s*.1);g.lineTo(-s*.3,-s*.48);g.lineTo(-s*.08,-s*.3);g.lineTo(s*.08,-s*.3);g.lineTo(s*.3,-s*.48);g.lineTo(s*.36,-s*.1);g.lineTo(0,s*.42);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fef9c3';dot(-s*.13,-s*.1,s*.06);dot(s*.13,-s*.1,s*.06);g.fillStyle='#1f2937';dot(0,s*.3,s*.06)}
 if(k==='dragon'){g.fillStyle='#16a34a';g.beginPath();for(let i=0;i<5;i++){const a=-2.6+i*.55;g.moveTo(Math.cos(a)*s*.3,Math.sin(a)*s*.3);g.lineTo(Math.cos(a+.27)*s*.5,Math.sin(a+.27)*s*.5);g.lineTo(Math.cos(a+.55)*s*.3,Math.sin(a+.55)*s*.3)}g.fill();
  g.beginPath();g.arc(0,0,s*.34,0,7);g.fill();g.stroke();g.fillStyle='#fef9c3';dot(-s*.13,-s*.06,s*.06);dot(s*.13,-s*.06,s*.06);g.fillStyle='#1f2937';dot(-s*.07,s*.18,s*.03);dot(s*.07,s*.18,s*.03)}
 if(k==='book'){g.fillStyle='#7c2d12';g.fillRect(-s*.5,-s*.36,s,s*.72);g.strokeRect(-s*.5,-s*.36,s,s*.72);g.fillStyle='#fef3c7';g.fillRect(-s*.4,-s*.26,s*.8,s*.3);
  g.fillStyle='#7c2d12';g.font=`800 ${Math.round(s*.1)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('Goldilocks and',0,-s*.17);g.fillText('the Three Bears',0,-s*.05)}
 if(k==='grandpa'){g.fillStyle='#fed7aa';g.beginPath();g.arc(0,0,s*.36,0,7);g.fill();g.stroke();g.fillStyle='#e5e7eb';g.beginPath();g.arc(0,-s*.22,s*.3,3.3,6.1);g.fill();
  g.strokeStyle='#1f2937';g.strokeRect(-s*.24,-s*.08,s*.18,s*.12);g.strokeRect(s*.06,-s*.08,s*.18,s*.12);g.beginPath();g.moveTo(-s*.06,-s*.02);g.lineTo(s*.06,-s*.02);g.stroke();g.beginPath();g.arc(0,s*.16,s*.1,.3,2.8);g.stroke()}
 g.restore()}
return{face,WHO,WHAT,ASK,KIND,WORD,SAY,DOER,DID,DESC,DONE,QS}})();
