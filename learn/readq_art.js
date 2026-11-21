/* Data for flagreadq (what is this question asking me?, ages 7–9; EEF (2021) Metacognition and self-regulated learning,
   recommendation 2: explicitly teach planning, monitoring and evaluating; NC (2013) Mathematics Y2–Y3: solve problems
   with addition and subtraction, and with multiplication, including missing-number and one-step word problems).
   The habit taught: read the question twice, mark the words that say what to find (how many altogether, how many more,
   how many left, who, does she have enough), say the ask in your own words, then choose a method, and check that the
   answer is the kind of thing the question asked for. Slips it targets: adding every number you see, copying a
   number from the story as the answer, giving a number when it asks who or yes/no, and answering a different
   question from the one asked. */
const RDQ=(()=>{
/* scene 1: tokens of each question; ask = indexes of the words that say what to find; facts = number tokens */
const MARK=[
 {w:'Mia has 8 stickers. Sam has 5 stickers. How many more stickers does Mia have?',ask:[8,9,10],say:'how many more: the difference between 8 and 5'},
 {w:'There are 6 red cars and 7 blue cars. How many cars are there altogether?',ask:[9,10,14],say:'how many altogether: the total of 6 and 7'},
 {w:'Tom read 4 books. Ana read 9 books. Who read more books?',ask:[8,9,10],say:'who read more: the answer is a name, not a number'}];
/* scene 2: one story, four asks; m = the method that the ask needs */
const STORY='Ana has 9 shells. Tom has 4 shells.';
const SORT=[{q:'How many shells do they have altogether?',m:0,a:'9 + 4 = 13',w:'Altogether puts both lots together, so you add.'},
 {q:'How many more shells does Ana have than Tom?',m:1,a:'9 − 4 = 5',w:'How many more asks for the difference, so you take away. More does not always mean add.'},
 {q:'Ana gives 4 shells away. How many does she have left?',m:1,a:'9 − 4 = 5',w:'She gives some away, so fewer are left. Take away.'},
 {q:'Tom finds 9 more shells. How many does he have now?',m:0,a:'4 + 9 = 13',w:'Tom finds more, so his pile grows. Add.'}];
const BINS=['➕ Add','➖ Take away'];
/* scene 3: put the ask in my own words; good is the index of the right card, slip names what each wrong card gets wrong */
const SAY=[
 {q:'Sam had 10 sweets. He ate 3. How many does he have left?',o:['Find what is left when 3 go from 10','Find 10 and 3 put together','Find how many sweets he ate'],good:0,
  slip:['','That adds them, but the sweets were eaten, so there are fewer left.','The story already tells you he ate 3. The ask is how many are left.']},
 {q:'A box holds 5 eggs. How many eggs are in 2 boxes?',o:['Find 5 take away 2','Find how many boxes there are','Find 2 lots of 5 eggs'],good:2,
  slip:['Taking away makes fewer eggs, but 2 boxes hold more eggs than 1.','The story tells you there are 2 boxes. The ask is how many eggs.','']},
 {q:'Lily has 7p. A lolly costs 9p. Does she have enough?',o:['Find 7p and 9p put together','Check if 7p is enough to pay 9p','Find how many lollies she buys'],good:1,
  slip:['Adding gives 16p, but nobody has 16p. The ask is: is 7p enough?','','She can only buy one, if she has enough. The ask is: is 7p enough for 9p?']}];
/* scene 4: does my answer fit the ask? kind = what kind of answer each card is */
const FIT=[
 {q:'Tom read 4 books. Ana read 9 books. Who read more?',o:['13','Ana','5'],good:1,
  slip:['13 adds the books, but the ask is who. Who needs a name.','','5 is how many more, but the ask is who. Who needs a name.']},
 {q:'Lily has 7p. A lolly costs 9p. Does she have enough?',o:['16p','Yes','No, she needs 2p more'],good:2,
  slip:['16p adds the coins. The ask is yes or no: is 7p enough?','Check it: 7p is less than 9p, so it is not enough.','']},
 {q:'A cat has 4 legs. How many legs do 3 cats have?',o:['3 cats','12 legs','7 legs'],good:1,
  slip:['3 cats is a fact from the story. The ask is how many legs.','','7 adds 4 and 3. Each cat has 4 legs, so count 4, 8, 12.']}];
/* scene 5: change the ask, keep the story */
const ASKS=[{b:'altogether',q:'How many shells do they have altogether?',how:'Add: 9 + 4',a:'13 shells'},
 {b:'how many more',q:'How many more shells does Ana have than Tom?',how:'Find the difference: 9 − 4',a:'5 more shells'},
 {b:'who has fewer',q:'Who has fewer shells?',how:'Compare: 4 is less than 9',a:'Tom'},
 {b:'enough for 6?',q:'Does Tom have enough shells to give 6 away?',how:'Compare: is 4 at least 6?',a:'No, he needs 2 more'}];
const DESC=[
 'A word question, one word per tile. Tap the words that say what to find.',
 'The same story with four different questions. Two boxes: Add, and Take away.',
 'A question and three cards. Each card says what to find in other words. Tap the one that matches.',
 'A question and three answers. Tap the answer that fits what was asked.',
 'Ana has 9 shells and Tom has 4. Tap a button to change the question and see the answer change.'];
const DONE=[
 'The ask is the part that says what to find: how many more, how many altogether, or who. Mark it before you work.',
 'The numbers stayed 9 and 4, but the asks needed different methods. Read the ask before you pick a method.',
 'Saying the ask in your own words checks you know what to find before you start.',
 'Check the kind of answer: who wants a name, does she have enough wants yes or no, how many wants a number.',
 ''];
const QS=[
 {q:'Jo has 12 grapes. She eats 5. How many are left? What does it ask?',a:'How many grapes are left',o:[['How many grapes there were at first','fact'],['12 and 5 added together','add']]},
 {q:'Ravi has 6 cards. Ella has 2 cards. Who has more cards?',a:'Ravi',o:[['8','type'],['4','type']]},
 {q:'Max has 3 bags with 5 apples in each. How many apples?',a:'15 apples',o:[['8 apples','add'],['3 bags','fact']]},
 {q:'Bea has 10p. A pen costs 8p. Does she have enough?',a:'Yes, with 2p left',o:[['18p','add'],['No','check']]},
 {q:'There are 9 birds. 4 fly away. How many birds flew away?',a:'4 birds',o:[['5 birds','other'],['13 birds','add']]},
 {q:'Kim is 7. Her brother is 3 years older. How old is he?',a:'10',o:[['4','other'],['7','fact']]}];
return{MARK,STORY,SORT,BINS,SAY,FIT,ASKS,DESC,DONE,QS}})();
