/* Data for the expanded-noun-phrases-with-prepositional-phrases flagship (flagpphr), ages 9–10. National Curriculum
   England, English Appendix 2, Year 4: "noun phrases expanded by the addition of modifying adjectives, nouns and
   preposition phrases (e.g. the teacher expanded to: the strict maths teacher with curly hair)" and Year 3:
   "expressing time, place and cause using … prepositions". Glossary: a preposition links a following noun, pronoun or
   noun phrase to some other word in the sentence; a phrase has no verb of its own, a clause does. */
const PPHR=(()=>{
/* scene 1: tap the preposition; tags D determiner, N noun, A adjective, V verb, R pronoun, P preposition */
const SPOT=[
 {w:'the house on the hill',tags:'D N P D N'},
 {w:'The cat slept under the old bridge.',tags:'D N V P D A N'},
 {w:'a girl with a red kite',tags:'D N P D A N'},
 {w:'We played football after lunch.',tags:'R V N P N'}];
const TAGWHY={D:w=>`“${w}” is a determiner. It starts a noun phrase, so look just before it.`,N:w=>`“${w}” is a noun, a naming word. The preposition is the small linking word before the noun phrase.`,
 A:w=>`“${w}” is an adjective inside the noun phrase. Look for the linking word before it.`,V:w=>`“${w}” is a verb, the action. Look for the small word that links to a place, time or thing.`,
 R:w=>`“${w}” is a pronoun. Look for the small word that links to a place, time or thing.`};
/* scene 2: pick out one dog. Each dog: size, collar, where it sits; the ringed dog is the target */
const DOGS=[{big:1,red:1,gate:1},{big:0,red:1,gate:1,aim:1},{big:0,red:0,gate:1},{big:0,red:1,gate:0}];
const GROW={ask:'Expand “the dog” to pick out the ringed dog only',zones:['Before “dog”: adjective','After “dog”: prepositional phrases'],caps:[1,2],cards:[
 {t:'small',to:0,cut:d=>!d.big},{t:'with a red collar',to:1,cut:d=>d.red},{t:'quickly',to:-1,why:'Quickly tells how something is done. It cannot describe a dog inside a noun phrase.'},
 {t:'by the gate',to:1,cut:d=>d.gate},{t:'by the tree',to:-1,why:'That picks out the dog by the tree. The ringed dog is by the gate.'},{t:'big',to:-1,why:'Look again: the ringed dog is small, not big.'}]};
/* scene 3: which word does the phrase tell us more about? */
const JOB={zones:['Adjective job: tells which one (about a noun)','Adverb job: tells where, when or how (about a verb)'],rounds:[
 {s:'The house on the hill is empty.',ph:'on the hill',to:0,word:'house',why:'It tells you which house, so it describes the noun house.'},
 {s:'The cat slept on the windowsill.',ph:'on the windowsill',to:1,word:'slept',why:'It tells you where the cat slept, so it describes the verb slept.'},
 {s:'The boy with the kite waved.',ph:'with the kite',to:0,word:'boy',why:'It tells you which boy waved, so it describes the noun boy.'},
 {s:'We swam after lunch.',ph:'after lunch',to:1,word:'swam',why:'It tells you when we swam, so it describes the verb swam.'},
 {s:'She opened the box with great care.',ph:'with great care',to:1,word:'opened',why:'It tells you how she opened it, so it describes the verb opened.'}]};
/* scene 4: one phrase, two meanings */
const TWO={s:'Mia saw the dog with the telescope.',ph:'with the telescope',rounds:[
 {pic:'mia',ans:'saw',ask:'Here Mia holds the telescope. Drop the phrase on the word it tells you more about',why:'In this picture the dog has nothing. Mia looks through the telescope, so the phrase tells how she saw.'},
 {pic:'dog',ans:'dog',ask:'Here the dog holds the telescope. Drop the phrase on the word it tells you more about',why:'Here the dog holds it. The phrase tells you which dog, so it goes with dog.'},
 {pic:'mia',fix:1,ask:'Make it clear: which sentence can only mean this picture?',cards:[
  {t:'With the telescope, Mia saw the dog.',ok:1},{t:'Mia saw the dog with the telescope.',why:'That is the sentence we started with. It could still mean either picture.'},
  {t:'The telescope saw Mia with the dog.',why:'That changes who did the seeing. A telescope cannot see.'}]}]};
/* scene 5: phrase or clause */
const SORT={ask:'Phrase or clause? Look for a verb',zones:['Prepositional phrase: no verb','Clause: has a verb'],cards:[
 {t:'after lunch',to:0},{t:'after we ate lunch',to:1,verb:'ate'},{t:'before the storm',to:0},{t:'before it rained',to:1,verb:'rained'},
 {t:'because of the rain',to:0},{t:'because it rained',to:1,verb:'rained'},{t:'during the film',to:0}]};
const QS=[
 {q:'Which is the prepositional phrase in “The fox hid behind the shed.”?',a:'behind the shed',o:[['The fox','noun'],['hid','noun']]},
 {q:'In “the cake on the table”, what does on the table tell you?',a:'Which cake',o:[['Where someone ate','where'],['When it was baked','where']]},
 {q:'Which is an expanded noun phrase?',a:'the tall girl with a blue scarf',o:[['the girl','bare'],['with a blue scarf the tall girl','order']]},
 {q:'Which is a prepositional phrase, not a clause?',a:'after the match',o:[['after we won the match','clause'],['before it got dark','clause']]},
 {q:'“Sam hit the man with the umbrella.” Why is it unclear?',a:'The phrase could tell which man, or how Sam hit',o:[['It has no verb','clause'],['It has no preposition','noun']]},
 {q:'In “We met at the park”, what does at the park tell you?',a:'Where we met',o:[['Which park','which'],['Which person','which']]}];
return{SPOT,TAGWHY,DOGS,GROW,JOB,TWO,SORT,QS}})();
