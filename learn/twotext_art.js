/* Data for the combining-information lab (flag_twotext.js; bundled in the main learn.js so the lab file stays small).
   Two short texts on one topic (European hedgehogs). Facts checked against the People's Trust for Endangered Species
   and the British Hedgehog Preservation Society: nocturnal; eat beetles, caterpillars, worms and slugs; hibernate in a
   leaf nest, roughly November to March; travel about 1–2 km a night; a 13 cm × 13 cm gap in a fence lets them pass;
   an adult has between 5,000 and 7,000 spines (so Text A's 5,000 and Text B's 7,000 are both inside the range). */
const TWOTEXTART=(()=>{
const K={paper:'#fffdf8',ink:'#111827',soft:'#374151',a:'#1d4ed8',aBg:'#dbeafe',b:'#b45309',bBg:'#fef3c7',both:'#6d28d9',bothBg:'#ede9fe',
 yes:'#166534',yesBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',frame:'#94a3b8',card:'#ffffff'};
const TEXTA=['Text A: garden leaflet','Hedgehogs come out at night to hunt. They eat beetles, caterpillars and worms. In winter they hibernate in a nest of leaves. An adult has about 5,000 spines.'];
const TEXTB=['Text B: nature website','Hedgehogs are nocturnal. Slugs are a favourite food. They hibernate from about November to March. An adult has about 7,000 spines. A hedgehog can walk 2 km in a night, so a 13 cm hole in a fence helps.'];
/* sort facts: [card, short chip, 0 only A | 1 both | 2 only B, why] */
const SORT=[['Hedgehogs hunt at night.','night',1,'A says “come out at night” and B says “nocturnal”: the same fact in different words, so both.'],
 ['They eat beetles and caterpillars.','beetles',0,'Only Text A names beetles and caterpillars.'],
 ['They eat slugs.','slugs',2,'Only Text B mentions slugs.'],
 ['They hibernate in winter.','hibernate',1,'A says “in winter” and B gives winter months: both say they hibernate.'],
 ['Their winter nest is made of leaves.','leaf nest',0,'Only Text A says the nest is made of leaves.'],
 ['They hibernate from November to March.','Nov–Mar',2,'Text A only says “winter”. Only Text B gives the months.'],
 ['A hedgehog can walk 2 km in a night.','2 km',2,'Only Text B gives the distance.']];
/* which text answers: [question, 0 A | 1 B | 2 both, why] */
const ASK=[['What do hedgehogs eat?',2,'A lists beetles, caterpillars and worms, and B adds slugs. The full answer needs both.'],
 ['How far can a hedgehog walk in a night?',1,'Only Text B gives the distance: 2 km.'],
 ['What is the winter nest made of?',0,'Only Text A says the nest is made of leaves.'],
 ['How can a fence help hedgehogs?',1,'Only Text B mentions the 13 cm hole.'],
 ['When do hedgehogs hibernate, and in what?',2,'B gives the months and A gives the leaf nest. You need both.']];
/* the texts disagree: two stages, each [question, options (first right), why for each wrong] */
const CLASH=[['Text A: about 5,000 spines. Text B: about 7,000. What do you do?',['Check a third source','Use 5,000: I read it first','Add them: 12,000 spines'],
  ['Reading it first does not make it right. When texts disagree, check another source.','The two numbers are for one hedgehog, so adding them makes no sense.']],
 ['Third source, a wildlife trust: “An adult has between 5,000 and 7,000 spines.” Which sentence do you write?',['An adult has about 5,000 to 7,000 spines.','An adult has exactly 6,000 spines.','An adult has 7,000 spines, so Text A is wrong.'],
  ['No source says 6,000. Do not invent a middle number.','Both numbers are inside the range, so neither text is wrong.']]];
/* combined summary: [sentence, keep?, why] */
const SUM=[['Hedgehogs are nocturnal, so they hunt at night.',1,'Both texts say this, so it goes in once.'],
 ['They eat beetles, caterpillars, worms and slugs.',1,'This joins the food from Text A and Text B.'],
 ['Hedgehogs come out at night.',0,'That repeats the first sentence. Say each fact once.'],
 ['From about November to March, they hibernate in a nest of leaves.',1,'Months from B, leaf nest from A.'],
 ['Hedgehogs are the cutest animals in Britain.',0,'That is an opinion, and neither text says it.'],
 ['An adult has about 5,000 to 7,000 spines.',1,'The checked range covers both texts.'],
 ['A 13 cm hole in a fence lets them roam up to 2 km a night.',1,'Both details come from Text B.'],
 ['Hedgehogs can swim across rivers.',0,'Neither text says this. Combine only what the texts tell you.']];
/* linking words: [A says, B says, 0 both | 1 adds | 2 however, joined sentence] */
const LINKS=['Both texts say …','Text B adds …','However, Text B says …'];
const JOIN=[['come out at night','are nocturnal',0,'Both texts say hedgehogs are out at night.'],
 ['eat beetles, caterpillars and worms','slugs are a favourite food',1,'Text A lists beetles, caterpillars and worms, and Text B adds slugs.'],
 ['about 5,000 spines','about 7,000 spines',2,'Text A says 5,000 spines. However, Text B says 7,000.'],
 ['hibernate in winter','hibernate from November to March',1,'Both say they hibernate, and Text B adds the months.']];
const JOINWHY=['The words differ, but the fact is the same.','B gives something new that A did not say.','The numbers do not match, so the texts disagree.'];
/* challenge: [question, right, [[wrong, tag]...]] */
const QS=[['Text A: “Owls hunt at night.” Text B: “Owls are nocturnal.” How do they relate?','They say the same thing',[['They disagree','words'],['Text B adds a new fact','words']]],
 ['Text A says a bridge is 40 m long. Text B says 45 m. What should you do?','Check a third source',[['Use 40 m: I read it first','first'],['Write 85 m','add']]],
 ['You need everything foxes eat. Text A names mice. Text B names berries and worms. What do you use?','Both texts',[['Text A only','one'],['Text B only','one']]],
 ['Which sentence combines two texts well?','Bees make honey, and Text B adds that they make wax.',[['Bees make honey. Bees make honey.','repeat'],['Bees are the best insects.','opinion']]],
 ['Text A: “Ice melts at 0 °C.” Text B: “Salt makes ice melt below 0 °C.” What does Text B do?','It adds a detail',[['It disagrees with A','words'],['It repeats A','repeat']]],
 ['A summary says “Hedgehogs can fly.” Neither text says this. What is the slip?','It adds a fact from neither text',[['It repeats a fact','repeat'],['It uses only one text','one']]]];
return {K,TEXTA,TEXTB,SORT,ASK,CLASH,SUM,LINKS,JOIN,JOINWHY,QS}})();
