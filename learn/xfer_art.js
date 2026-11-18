/* Data for the transferring skills lab (flag_xfer.js; bundled in the main learn.js so the lab file stays small).
   Built on transfer research: near and far transfer, hugging and bridging (Perkins & Salomon 1988), surface features vs
   deep structure (Chi, Feltovich & Glaser 1981; Gick & Holyoak 1983). SPOT: problems for the outfits table trick [text, fits, why].
   PAIRS: flavours × cones for the table. SORTS: [card, trick 0 = table of pairs, 1 = timeline, why]. WHERE: bridging rounds
   [skill, from, [[place, fits, why]]]. FIT: adding trick cards [problem, fits, why]. ROUTINE: the transfer questions in order. */
const XFERART={
SPOT:[['Ice creams: 3 flavours and 2 kinds of cone. How many different ice creams?',1,'Same trick: every flavour with every cone. A table finds them all.'],
 ['A story about getting dressed for school.',0,'It is about clothes, like the outfits, but nothing needs combining. Same topic, different problem.'],
 ['Sandwiches: 2 kinds of bread and 4 fillings. How many sandwiches?',1,'Same trick: every bread with every filling, so 2 × 4 = 8.'],
 ['Put the days of the week in order.',0,'This needs an order, not every pair. A table of pairs does not help.']],
FLAV:['Mint','Lemon','Berry'],CONE:['Wafer','Waffle'],
TRICKS:['Table of every pair','Timeline in order'],
SORTS:[['Pizza: 3 toppings and 2 crusts. How many pizzas?',0,'Every topping with every crust: a table of pairs.'],
 ['Making a pizza: what happens first, next and last?',1,'First, next, last: that is an order, so a timeline.'],
 ['Frog life cycle: egg, tadpole, froglet, frog.',1,'Stages that happen in order: a timeline.'],
 ['Frog game: 2 frog colours and 3 hats. How many different frogs?',0,'Every colour with every hat: a table of pairs.'],
 ['The Romans and the Vikings: who came to Britain first?',1,'Which came first is about order: a timeline.'],
 ['Team kit: 3 shirts and 2 pairs of socks. How many kits?',0,'Every shirt with every pair of socks: a table of pairs.']],
WHERE:[['Draw a diagram to see the problem','maths (bar models)',[['Science: show how water moves in the water cycle',1,'A diagram with arrows shows each move.'],['Remember 7 × 8 = 56',0,'That is a fact to recall. A drawing does not help you remember it quickly.'],
  ['English: draw a map of the story setting',1,'A map is a diagram. It helps you picture where things happen.'],['Spell the word "necessary"',0,'Spelling needs letter patterns, not a diagram.']]],
 ['Sort things into groups by a rule','science (sorting animals)',[['English: sort words by their ending, -tion or -sion',1,'The same trick: make a rule, then put each word in a group.'],['Run 100 m faster',0,'Running faster needs practice and training, not sorting.'],
  ['Maths: sort shapes by how many sides they have',1,'The same trick: the rule is the number of sides.'],['Tell a joke',0,'A joke needs timing, not a sorting rule.']]]],
FIT:[['Sam has 6 red pens and 4 blue pens. How many pens altogether?',1,'Two groups put together: add. 6 + 4 = 10.'],
 ['Sam had 6 pens. He gave 4 away. How many are left?',0,'Some are taken away, so adding does not fit. 6 − 4 = 2.'],
 ['A class has 12 girls and 13 boys. How many children?',1,'Two groups put together: add. 12 + 13 = 25.'],
 ['Tom is 9. Ana is 7. How much older is Tom?',0,'This compares two numbers. Find the difference: 9 − 7 = 2. Adding gives 16, which is wrong.']],
ROUTINE:['What is this problem really asking?','Have I seen a problem like this before?','What trick worked that time?','Does the trick fit here?','Try it, then check the answer.'],
BANK:[['Which problem uses the same trick as "2 tops and 3 shorts: how many outfits?"','3 drinks and 2 snacks: how many meal deals?',[['A poem about clothes','surface'],['Put the days of the week in order','timeline']]],
 ['Lily learned to sort animals in science. Where else can sorting help?','Sorting spelling words by their ending',[['Nowhere, it is a science skill','onesubject'],['Only with animals','samething']]],
 ['Tom is 10. Ana is 7. How much older is Tom? Max says, "Add: 17."','Adding does not fit: it is 3',[['Max is right','addfits'],['It is 10','pickone']]],
 ['Two problems are both about frogs. Do they need the same trick?','Not always: look at what they ask',[['Yes, same topic, same trick','surface'],['No, never','never']]],
 ['What should you ask first about a new problem?','What is it really asking?',[['What subject is it in?','subject'],['Which answer is quickest to guess?','guess']]],
 ['Mia used a timeline in history. Which new task could a timeline help?','The stages of a frog life cycle',[['Counting all the sandwich choices','table'],['Spelling a long word','spell']]]],
WHY:{surface:'That matches the topic, not the trick. Look at what the problem asks you to do.',timeline:'Putting things in order needs a timeline, not a table of pairs.',onesubject:'Skills are not stuck in one subject. Sorting by a rule works in English and maths too.',
 samething:'The trick works with anything you can sort by a rule, like words or shapes.',addfits:'"How much older" compares two numbers. Find the difference: 10 − 7 = 3.',pickone:'10 is Tom\'s age. The question asks how much older: 10 − 7 = 3.',
 never:'Sometimes they do. Check what each one asks, not what it is about.',subject:'The subject can fool you. First ask what the problem is really asking.',guess:'Guessing skips the thinking. First ask what it is really asking.',
 table:'Counting every choice needs a table of pairs, not a timeline.',spell:'Spelling needs letter patterns. A timeline is for things in order.'}};
