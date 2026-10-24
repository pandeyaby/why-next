/* Why Next? Guide: every learner-facing line the learner model (guide_mood.js) uses, kept in one place so it can be
   reviewed for tone and translated. Rules for this copy: kind and specific; offers, never pressure; no streak-loss
   threats, guilt or fake urgency; and never a diagnosis ("you seem anxious"). Only describe what happened. */
const GUIDE_COPY=(()=>{
const EXAMS=['','GCSE (AQA)','GCSE (Edexcel)','GCSE (OCR)','IGCSE (Cambridge)','IB MYP','IB Diploma','A level','AP','SAT','CBSE','ICSE','Common Core','Scottish Nationals','Other'];
const REACT={
 struggling:{say:['This one’s tricky. Want to try it a different way?','Let’s slow down. Which would help most?'],offer:['Hint','Simpler','Worked example']},
 frustrated:{say:['That looks frustrating, and that’s normal when something is new. We can take a different route.','Let’s pause the guessing for a moment. A worked example often unlocks it.'],offer:['Worked example','Simpler','Take a break']},
 bored:{say:['Want something with more bite?','This might be too easy for you. Fancy a challenge, or skip ahead?'],offer:['Challenge me','Skip ahead','Quiz me']},
 confident:{say:['You’re on a roll. Want a harder one?','Nicely done. Ready for a challenge, or the next topic?'],offer:['Challenge me','Skip ahead']},
 tired:{say:['It’s getting late. A short recap and some rest is a great way to remember this.','Brains learn a lot while resting. Want a quick summary to finish on?'],offer:['Key idea','Take a break']},
 away:{say:[],offer:[]},focused:{say:[],offer:[]}};
const FACE_WORD={focused:'Focused',struggling:'Working it out',frustrated:'Taking it slower',bored:'Ready for more',confident:'On a roll',tired:'Winding down',away:'Paused'};
const MOOD_BTN={great:'😀 Great',ok:'🙂 OK',stuck:'🤔 Stuck',frustrated:'😣 Frustrated',bored:'😐 Bored',tired:'😴 Tired'};
const CHECKIN_REPLY={great:'Love that. I’ll keep the pace up and offer harder ones.',ok:'Thanks. Carry on, I’m here if you need me.',stuck:'Thanks for saying. Let’s untangle it together.',frustrated:'Thanks for telling me. Let’s slow down and try another way.',bored:'Fair. Let’s make it more interesting.',tired:'Thanks. We’ll keep it short and gentle.'};
return{EXAMS,REACT,FACE_WORD,MOOD_BTN,CHECKIN_REPLY}})();
