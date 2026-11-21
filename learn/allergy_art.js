/* Data for flagallergy (allergies and not sharing food, ages 6–7; DfE Relationships, Sex and Health Education statutory
   guidance (2019), primary Health and prevention: "the facts and science relating to allergies"; Health education:
   "how to make a clear and efficient call to emergency services if necessary"; NHS: Food allergy (symptoms: itchy
   mouth, raised itchy rash, swelling of face, lips, tongue or around the eyes, tummy pain, being sick; severe: trouble
   breathing, wheeze, cough, feeling faint = anaphylaxis); Perry et al. 2004 (J Allergy Clin Immunol 113:973): soap and
   water or wipes removed peanut allergen from hands, hand sanitiser often did not). Slips it targets: thinking a food
   safe for me is safe for everyone, no badge means safe to share, gel cleans food off, wiping hands on clothes, pressing
   a friend to try, picking the nut out, "it is only a tiny bit", hidden milk in cheese, keeping it quiet, waiting to
   see, thinking an allergy is just being fussy. */
const ALG=(()=>{
/* 1. same food, different bodies: drag the looking glass over each friend */
const FOOD={e:'🥜',n:'peanuts'};
const KIDS=[{k:'ava',e:'👧',n:'Ava',ok:1,says:'Peanuts are fine for Ava’s body.'},
 {k:'sam',e:'👦',n:'Sam',ok:0,says:'Sam is allergic to peanuts. Even a little can give him itchy bumps, puffy lips and trouble breathing.'},
 {k:'leo',e:'🧒',n:'Leo',ok:1,says:'Peanuts are fine for Leo. But Leo is allergic to milk! Every body is different.'}];
/* 2. sort: what we do with lunch */
const CARDS=[{t:'Eat my own lunch',ok:1},{t:'Swap my sandwich',ok:0,slip:'share'},{t:'Share a game, not food',ok:1},
 {t:'Give a bite of my cake',ok:0,slip:'share'},{t:'Share my crisps',ok:0,slip:'share'},{t:'Ask a grown-up if offered food',ok:1}];
/* 3. crumbs: 14 bits of peanut on the hands; which way gets them off */
const BITS=14;
const TOOLS=[{k:'soap',e:'🧼',n:'Soap and water',works:1},{k:'gel',e:'🧴',n:'Hand gel',slip:'gel'},{k:'legs',e:'👖',n:'Wipe on my trousers',slip:'legs'}];
/* 4. a friend says no: tap the kind reply */
const TALK=[{who:'👦 Sam',line:'No thanks. I can’t eat nuts.',r:[['OK! Want to play tag?','ok'],['Just try a tiny bit','press'],['I’ll pick the nuts out','pick']]},
 {who:'🧒 Leo',line:'I can’t have milk.',r:[['OK. Let’s play after lunch','ok'],['Cheese isn’t milk, have some','hidden'],['A little won’t hurt','press']]},
 {who:'👧 Mia',line:'I only eat food from my own lunch box.',r:[['OK! That’s a good rule','ok'],['Go on, nobody will know','secret'],['You’re just being fussy','fussy']]}];
/* 5. after lunch: spot the signs on Sam, then choose who to tell */
const SIGNS=[{k:'bumps',e:'🔴',t:'Itchy bumps on skin',sign:1,x:.24,y:.58},{k:'lips',e:'👄',t:'Puffy lips or eyes',sign:1,x:.5,y:.3},
 {k:'breath',e:'😮‍💨',t:'Coughing, hard to breathe',sign:1,x:.76,y:.42},{k:'tummy',e:'🤢',t:'Tummy ache, being sick',sign:1,x:.5,y:.62},
 {k:'yawn',e:'🥱',t:'A big yawn',x:.22,y:.34},{k:'laugh',e:'😂',t:'Laughing at a joke',x:.8,y:.66}];
const ACT=[{k:'tell',e:'🧑‍🏫',t:'Tell a grown-up',ok:1},{k:'wait',e:'⏳',t:'Wait and see',slip:'wait'},{k:'quiet',e:'🤫',t:'Keep it quiet',slip:'secret'}];
const DESC=['Three friends at lunch: Ava, Sam and Leo. Drag the looking glass to each friend to see what peanuts do in their body.',
 'Six lunch cards. Drag each one to Do or Don’t.',
 'Hands with fourteen tiny bits of peanut on them after a snack. Choose how to clean them, then rub the hands.',
 'A friend says no to food. Tap the kind reply.',
 'Sam feels ill after lunch. Tap every sign that means get help, then choose what to do.',
 'Challenge.'];
const DONE=['Same peanuts, three different bodies. A food that is fine for you can make a friend very ill.',
 'Your lunch is just for you. Share games and fun, not food.','Every bit gone! Soap and water takes food bits off. Gel does not.',
 'Three kind replies. When a friend says no, we stop asking.','You spotted the signs and told a grown-up straight away.'];
const QS=[{q:'Peanuts are fine for you. Are they fine for everyone?',a:'No, some people are allergic',o:[['Yes, food is food','same'],['Yes, if you share a tiny bit','press']]},
 {q:'Your friend has no allergy badge. Can you share your crisps?',a:'No, we eat our own lunch',o:[['Yes, no badge means safe','badge'],['Yes, if you swap','share']]},
 {q:'You ate a peanut bar. How do you clean your hands?',a:'Soap and water',o:[['Hand gel','gel'],['Wipe them on my trousers','legs']]},
 {q:'Sam says, “I can’t eat nuts.” What do you say?',a:'OK! Let’s play',o:[['I’ll pick the nuts out','pick'],['Just try a tiny bit','press']]},
 {q:'After lunch, Sam’s lips get puffy. What do you do?',a:'Tell a grown-up straight away',o:[['Wait and see','wait'],['Keep it quiet','secret']]},
 {q:'Leo says he can’t have milk. Is he just being fussy?',a:'No, milk can make him ill',o:[['Yes, he is fussy','fussy'],['Cheese is fine, it isn’t milk','hidden']]}];
return{FOOD,KIDS,CARDS,BITS,TOOLS,TALK,SIGNS,ACT,DESC,DONE,QS}})();
