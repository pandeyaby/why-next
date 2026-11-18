/* Data for the worked-examples flagship (flagworked), ages 7–9. The example is Year 3 column addition with one
   regrouping (47 + 28 = 75). Reasons are matched to steps (self-explanation), three examples are checked for slips
   (a dropped carried ten, ones added into the tens, one fully correct), three faded examples remove more steps each
   time (completion problems), four word problems test structure against surface (same numbers but take away), and a
   fresh sum (38 + 45) where 75, the example's answer, is the copying trap. */
const WKX=(()=>{
const EX={q:'47 + 28',lines:['Ones: 7 + 8 = 15','Write 5 in the ones, carry 1 ten','Tens: 4 + 2 + 1 = 7','Answer: 75']};
const WHY=[[1,'15 ones is 1 ten and 5 ones, so the ten moves to the tens column.'],[3,'Check it: 47 + 28 is about 50 + 30 = 80, so 75 makes sense.'],
 [0,'Start with the ones, the smallest place value.'],[2,'The carried ten has to be added in with the other tens.']];
const SLIP=[{q:'36 + 27',lines:['Ones: 6 + 7 = 13','Write 3, carry 1 ten','Tens: 3 + 2 = 5','Answer: 53'],bad:2,why:'The carried ten was left out. Tens: 3 + 2 + 1 = 6, so the answer is 63.'},
 {q:'58 + 4',lines:['Ones: 8 + 4 = 12','Write 2, carry 1 ten','Tens: 5 + 4 + 1 = 10','Answer: 102'],bad:2,why:'The 4 is 4 ones, not 4 tens. It was used twice. Tens: 5 + 1 = 6, so the answer is 62.'},
 {q:'29 + 14',lines:['Ones: 9 + 4 = 13','Write 3, carry 1 ten','Tens: 2 + 1 + 1 = 4','Answer: 43'],bad:-1,why:'Every step is right: 9 + 4 = 13, carry the ten, 2 + 1 + 1 = 4 tens, 43.'}];
const FADE=[{q:'56 + 37',lines:['Ones: 6 + 7 = 13','Write 3, carry 1 ten','Tens: 5 + 3 + 1 = 9','Answer: ▢'],
  gaps:[[3,'93',[['83','That leaves out the carried ten. 5 + 3 + 1 = 9 tens, so 93.'],['813','13 was written whole. Only the 3 stays in the ones; the ten is carried.']]]]},
 {q:'45 + 38',lines:['Ones: 5 + 8 = ▢','Write 3, carry 1 ten','Tens: 4 + 3 + 1 = ▢','Answer: 83'],
  gaps:[[0,'13',[['3','5 + 8 is 13. The 3 is only the ones part of it.'],['12','Count on from 8: 9, 10, 11, 12, 13. So 5 + 8 = 13.']]],[2,'8',[['7','Add the carried ten too: 4 + 3 + 1 = 8.'],['9','4 + 3 = 7, and 1 carried ten makes 8, not 9.']]]]},
 {q:'67 + 25',lines:['Ones: 7 + 5 = ▢','Write ▢, carry 1 ten','Tens: 6 + 2 + 1 = ▢','Answer: ▢'],
  gaps:[[0,'12',[['11','Count on from 7: 8, 9, 10, 11, 12. So 7 + 5 = 12.'],['2','7 + 5 is 12. The 2 is only the ones part.']]],[1,'2',[['12','Only the ones digit stays. 12 is 1 ten and 2 ones, so write 2.'],['1','The 1 is the ten you carry. The 2 stays in the ones.']]],
   [2,'9',[['8','Do not forget the carried ten: 6 + 2 + 1 = 9.'],['10','6 + 2 = 8, and the carried ten makes 9 tens.']]],[3,'92',[['82','The carried ten is missing: 9 tens, so 92.'],['912','Put the digits in their places: 9 tens and 2 ones is 92.']]]]}];
const STORY='Sam has 47 stickers. He gets 28 more. How many now?';
const MATCH=[['🐚','Mia has 36 shells. She finds 25 more. How many now?',1,'Yes: add two 2-digit numbers, and 6 + 5 = 11 makes a new ten, just like the example.'],
 ['🏷️','Tom has 47 stickers. He gives away 28. How many are left?',0,'Same numbers, but he gives some away. That is take away, so the adding steps will not work.'],
 ['🚌','A bus has 18 people. 26 more get on. How many now?',1,'Yes: 18 + 26, and 8 + 6 = 14 makes a new ten. Same steps, new story.'],
 ['⚖️','Sam has 47 stickers. Ali has 28. How many more does Sam have?',0,'How many more means find the difference. That is take away, even with the same numbers.']];
const MINE={q:'38 + 45',parts:[['Ones: 8 + 5 =','13',[['3','8 + 5 is 13; 3 is just its ones digit.'],['12','Count on from 8: 9, 10, 11, 12, 13.']]],['Write in the ones, carry 1 ten:','3',[['13','Only the ones digit stays. 13 is 1 ten and 3 ones.'],['1','1 is the ten you carry. The 3 stays.']]],
 ['Tens: 3 + 4 + 1 =','8',[['7','Add the carried ten: 3 + 4 + 1 = 8.'],['9','3 + 4 = 7, plus 1 carried ten is 8.']]],['Answer:','83',[['75','75 is the worked example\'s answer. Copy the method, not the answer.'],['73','The carried ten is missing: 8 tens, so 83.']]]]};
const QS=[
 {q:'What is the best way to use a worked example?',a:'Explain why each step is done',o:[['Look only at the answer','skip'],['Read it fast once','passive']]},
 {q:'The example shows 47 + 28 = 75. Your sum is 39 + 26. What is your answer?',a:'65',o:[['75','copy'],['55','carry']]},
 {q:'A worked example says 36 + 27 = 53. What should you do?',a:'Check each step: it should be 63',o:[['Copy it, examples are always right','trust'],['Write 53 in my book','copy']]},
 {q:'The sticker example is 47 + 28, gets more. Which problem can it help with?',a:'Ben has 34 cars and gets 19 more',o:[['Ben has 47 cars and loses 28','surface'],['Ben has 28 cars. How many fewer than 47?','surface']]},
 {q:'You studied an example. What is a good next step?',a:'Try a similar one with fewer steps shown',o:[['Start a new kind of sum','any'],['Read the same example ten times','passive']]},
 {q:'In 58 + 27, the ones make 15. What goes in the ones column?',a:'5, and carry 1 ten',o:[['15','carry'],['1, and carry 5','any']]}];
return{EX,WHY,SLIP,FADE,STORY,MATCH,MINE,QS}})();
