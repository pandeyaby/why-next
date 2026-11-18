/* Data for flagmeds (medicines and household products: ask first, ages 4–5). Sources: PSHE Association Programme of
   Study (2020) KS1 Health and wellbeing (medicines and household products, and who can help keep us safe); NHS
   'Accidental poisoning in children' and Child Accident Prevention Trust (CAPT) guidance on look-alike products such as
   liquid laundry capsules; HSE/CLP hazard pictograms (red-bordered diamonds) on household chemicals. Slips it
   targets: 'I can tell sweets from tablets by looking', 'my friend's medicine will help me too', 'more medicine works
   better', 'no warning sign means it is safe to drink', and picking up a found tablet or bottle to carry it. */
const MED=(()=>{
const PAIRS=[{look:'Small pink dots',a:['Sweets',1],b:['Tablets',0]},{look:'A purple drink',a:['Blackcurrant juice',1],b:['Cleaning liquid',0]},{look:'A squishy blob',a:['Jelly sweet',1],b:['Washing pod',0]}];
const GIVE=[{where:'You have a cough at home.',who:[['Dad',1],['Your friend Jo, age 5',0],['Your big sister, age 8',0]]},
 {where:'You are at the doctor with Mum.',who:[['A boy in the waiting room',0],['The nurse, with Mum there',1],['Nobody: take it yourself',0]]},
 {where:'Grandma looks after you today.',who:[['Your cousin, age 6',0],['The medicine cupboard: help yourself',0],['Grandma',1]]}];
const BOTTLES=[{n:'Bleach',sign:1,drink:0},{n:'Milk',sign:0,drink:1},{n:'Spray cleaner',sign:1,drink:0},{n:'Shampoo',sign:0,drink:0},{n:'Water',sign:0,drink:1},{n:'Washing-up liquid',sign:1,drink:0}];
const FOUND=[{t:'Tablets on the floor',k:'pills'},{t:'An open bottle under the sink',k:'bottle'},{t:'A washing pod on the table',k:'pod'}];
const ACTS=[['Taste it','taste'],['Pick it up and carry it','carry'],['Leave it and tell a grown-up','ok']];
const RULES=[['Dad gives me my cough medicine',1],['I take my sister’s medicine',0],['I take more because it tastes nice',0],['The nurse gives me medicine with Mum there',1],['I eat vitamins from the cupboard like sweets',0],['Grandma measures my spoon',1]];
const DESC=[
 'Three pairs of things that look the same. Tap each one to see what it really is.',
 'A medicine bottle and three people. Tap who can give you the medicine.',
 'Six bottles. Some have a red diamond warning sign. Two boxes: Drink, and Not a drink.',
 'You find something that might not be safe. Three choices of what to do.',
 'Six cards about medicine. Two boxes: Safe, and Not safe.'];
const DONE=[
 'Each pair looked the same, but one was food and one was not. You cannot always tell by looking, so ask a grown-up first.',
 'Only a trusted grown-up who looks after you gives you medicine: Dad, the nurse with Mum, or Grandma. Never friends, and never help yourself.',
 'Only milk and water are drinks. Shampoo has no red diamond, but it is still not a drink.',
 'Every time: leave it where it is and tell a grown-up. Do not taste it or carry it.',
 'Medicine is safe only from a trusted grown-up, only your own, and only the amount they give.'];
const QS=[
 {q:'Two little pink things look the same. Can you tell which is a sweet?',a:'Not always, so I ask a grown-up',o:[['Yes, sweets look different','look'],['Yes, the pink one is a sweet','look']]},
 {q:'Your friend’s medicine made her feel better. Can you have some?',a:'No, it is only for her',o:[['Yes, it will help me too','share'],['Yes, if I only take a little','share']]},
 {q:'Medicine helps you get better. Is more even better?',a:'No, too much can make you poorly',o:[['Yes, more works faster','more'],['Yes, if it tastes nice','more']]},
 {q:'A bottle has no warning sign on it. Is it OK to drink?',a:'Not unless a grown-up says it is a drink',o:[['Yes, no sign means safe','nosign'],['Yes, if it smells nice','nosign']]},
 {q:'You find tablets on the floor. What do you do?',a:'Leave them and tell a grown-up',o:[['Pick them up for Mum','touch'],['Taste one to see','touch']]},
 {q:'Who can give you medicine?',a:'A trusted grown-up who looks after me',o:[['Any big child','who'],['Me, from the cupboard','who']]}];
return{PAIRS,GIVE,BOTTLES,FOUND,ACTS,RULES,DESC,DONE,QS}})();
