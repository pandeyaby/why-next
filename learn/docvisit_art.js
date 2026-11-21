/* Data for flagdocvisit (visiting the doctor or dentist, ages 4–5; Development Matters 2021 Reception PSED "know and
   talk about the different factors that support their overall health and wellbeing", including toothbrushing; DfE
   Relationships, Sex and Health Education guidance, primary health education: dental health and regular check-ups at
   the dentist; NHS: take children to the dentist when milk teeth first appear; NICE CG19: check-ups every 3 to 12
   months for under-18s; NHS: a digital thermometer goes under the armpit for children under 5; children have 20 milk
   teeth). Slips it targets: thinking a visit is a punishment, thinking you only go when something hurts, staying quiet
   about pain, hiding or keeping a worry secret, and thinking the tools hurt or mixing up what each tool checks.
   A parent or carer stays with the child, and the doctor or nurse says what they will do first. */
const DCV=(()=>{
/* 1. why we go: y = a real reason; slip = the mistake a wrong sort shows */
const WHY=[{t:'To check my teeth are healthy',y:true},{t:'Because I was naughty',y:false,slip:'punish'},
 {t:'To check I am growing well',y:true},{t:'My teeth do not hurt, so I never go',y:false,slip:'onlysick'},{t:'To get help when I feel poorly',y:true}];
/* 2. what happens, in order */
const VISIT=['Say my name at the desk','Wait in the waiting room','Go in and sit with my grown-up','Have the check, and ask questions'];
const SHUF=[2,0,3,1];
/* 3. tools and where they check; zones are on a plain body diagram */
const ZONES=[{k:'ear',n:'ear'},{k:'mouth',n:'mouth'},{k:'chest',n:'chest'},{k:'arm',n:'armpit'}];
const TOOLS=[{k:'steth',n:'stethoscope',z:'chest',does:'It listens to your heart and your breathing. It feels a bit cold, and it does not hurt.'},
 {k:'light',n:'ear light',z:'ear',does:'It shines a little light to look inside your ear. It does not hurt.'},
 {k:'therm',n:'thermometer',z:'arm',does:'It goes under your arm to check how hot you are. It does not hurt.'},
 {k:'mirror',n:'dentist mirror',z:'mouth',does:'It helps the dentist see the backs of your teeth. It does not hurt.'}];
/* 4. tell if it hurts: index of the sore tooth in a row of 5 */
const SORE=[2,4,1];
/* 5. worry meter: helpful things lower it; slip = why the others do not help */
const CALM=[{t:'Ask what will happen',ok:true},{t:'Run and hide',slip:'hideaway'},{t:'Hold my grown-up\'s hand',ok:true},
 {t:'Take slow, deep breaths',ok:true},{t:'Keep my worry a secret',slip:'secret'},{t:'Hug my teddy',ok:true}];
const DESC=['A reason card and two boxes: Yes, that is why we go, and No. Drag the card to a box, or tap a box.',
 'Four cards about a visit. Put them in order: tap or drag each card into the next space.',
 'A body diagram with ear, mouth, chest and armpit, and a tool to try. Drag the tool to the place it checks.',
 'A row of five teeth with the dentist mirror on one. Keep still while it checks. When a tooth feels sore, put your hand up.',
 'A worry meter and six things to do. Tap the things that help to make the worry go down.',
 'Challenge.'];
const DONE=['We go to stay healthy, even when nothing hurts. A visit is never a punishment.','Now you know what will happen at a visit.',
 'Every tool just looks or listens. None of them hurt.','You told the dentist each time. Now they know which tooth to help.',
 'Asking, holding a hand, slow breaths and a teddy all help. Worry is down to zero.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Why do we go to the dentist?',a:'To keep our teeth healthy',o:[['Because we were naughty','punish'],['Only when a tooth hurts','onlysick']]},
 {q:'A tooth hurts in the check. What do you do?',a:'Put my hand up and say it hurts',o:[['Keep quiet and be brave','hide'],['Shut my mouth tight','shut']]},
 {q:'What does a stethoscope do?',a:'Listens to your heart and breathing',o:[['Looks inside your ears','tool'],['Checks how hot you are','tool']]},
 {q:'You feel worried before a visit. What helps?',a:'Ask what will happen',o:[['Run and hide','hideaway'],['Keep the worry a secret','secret']]},
 {q:'Who are doctors, nurses and dentists?',a:'Grown-ups whose job is to help us stay healthy',o:[['People who tell you off','punish'],['People to keep secrets from','secret']]},
 {q:'Where does the thermometer go for a check?',a:'Under your arm',o:[['On your teeth','tool'],['In your ear, to listen','tool']]},
 {q:'How many baby teeth does a child have?',a:'20',o:[['32, like a grown-up','adult'],['10','count']]}];
/* flat tool and body pictures, drawn with shapes (no character art) */
function pic(g,paint,k,x,y,s){g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';g.strokeStyle='#1f2937';g.lineWidth=Math.max(2,s*.06);
 if(k==='steth'){g.beginPath();g.moveTo(-s*.25,-s*.38);g.quadraticCurveTo(-s*.28,s*.05,0,s*.08);g.quadraticCurveTo(s*.28,s*.05,s*.25,-s*.38);g.stroke();g.beginPath();g.moveTo(0,s*.08);g.quadraticCurveTo(s*.05,s*.3,s*.3,s*.3);g.stroke();
  g.fillStyle='#64748b';g.beginPath();g.arc(s*.32,s*.3,s*.12,0,7);g.fill();g.stroke()}
 if(k==='light'){g.fillStyle='#334155';paint.rrect(-s*.1,-s*.05,s*.2,s*.45,s*.06);g.fill();g.fillStyle='#e2e8f0';g.beginPath();g.moveTo(-s*.12,-s*.05);g.lineTo(s*.12,-s*.05);g.lineTo(s*.04,-s*.38);g.lineTo(-s*.04,-s*.38);g.closePath();g.fill();g.stroke();
  g.fillStyle='#facc15';g.beginPath();g.arc(0,-s*.42,s*.05,0,7);g.fill()}
 if(k==='therm'){g.fillStyle='#e0f2fe';paint.rrect(-s*.09,-s*.4,s*.18,s*.62,s*.09);g.fill();g.stroke();g.fillStyle='#0369a1';g.fillRect(-s*.06,-s*.15,s*.12,s*.14);g.fillStyle='#dc2626';g.beginPath();g.arc(0,s*.3,s*.1,0,7);g.fill()}
 if(k==='mirror'){g.beginPath();g.moveTo(-s*.3,s*.35);g.lineTo(s*.1,-s*.12);g.stroke();g.fillStyle='#bae6fd';g.beginPath();g.arc(s*.18,-s*.22,s*.14,0,7);g.fill();g.stroke()}
 if(k==='body'){g.fillStyle='#fde68a';g.beginPath();g.arc(0,-s*.32,s*.16,0,7);g.fill();g.stroke();g.fillStyle='#bfdbfe';paint.rrect(-s*.2,-s*.14,s*.4,s*.42,s*.08);g.fill();g.stroke();
  g.beginPath();g.moveTo(-s*.2,-s*.08);g.lineTo(-s*.36,s*.2);g.moveTo(s*.2,-s*.08);g.lineTo(s*.36,s*.2);g.moveTo(-s*.1,s*.28);g.lineTo(-s*.12,s*.48);g.moveTo(s*.1,s*.28);g.lineTo(s*.12,s*.48);g.stroke()}
 g.restore()}
return{pic,WHY,VISIT,SHUF,ZONES,TOOLS,SORE,CALM,DESC,DONE,QS}})();
