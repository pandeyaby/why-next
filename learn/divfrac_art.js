/* Data for flagdivfrac (dividing a whole number by a unit fraction, ages 10–11). Sources: CCSS 5.NF.B.7b and 5.NF.B.7c
   ("interpret division of a whole number by a unit fraction, and compute such quotients", e.g. 4 ÷ (1/5) = 20 because
   20 × (1/5) = 4; solve real-world problems); DfE (2013) KS2 Year 6 fractions and KS3 number (four operations with
   fractions); NCETM Year 6 / Year 7 fractions materials ("how many ... fit into ..." quotitive division). Slips it
   targets (Fischbein et al. 1985; Graeber and Tirosh 1990): "division always makes smaller", dividing by the
   denominator (3 ÷ ½ read as 3 ÷ 2), multiplying by the fraction (3 × ½), adding the numbers, reading ½ ÷ 3 as
   3 ÷ ½, and thinking a bigger piece gives a bigger answer. */
const DIVFRAC=(()=>{
const NAME={2:'halves',3:'thirds',4:'quarters',5:'fifths',6:'sixths',8:'eighths'},ONE={2:'half',3:'third',4:'quarter',5:'fifth',6:'sixth',8:'eighth'};
const U={2:'½',3:'⅓',4:'¼',5:'⅕',6:'⅙',8:'⅛'};
/* 1. cut the wholes, then count: a ÷ 1/b; opts [value, tag] */
const CUT=[{a:3,b:2,opts:[['6','ok'],['1½','div'],['3','same']]},{a:2,b:4,opts:[['½','div'],['8','ok'],['6','add']]}];
const TOOLS=[2,3,4];
/* 2. check by multiplying: count n pieces of 1/b until n × 1/b = a */
const CHECK=[{a:4,b:5},{a:3,b:4}];
/* 3. stories: pick the number sentence */
const SENT=['3 ÷ ½','½ ÷ 3','3 ÷ 2','2 ÷ ⅓'];
const STORY=[{t:'A ribbon 3 m long is cut into pieces ½ m long. How many pieces?',a:0,r:'6 pieces: 2 halves in each metre, and 3 metres.'},
 {t:'3 friends share ½ a pizza equally. How much pizza does each friend get?',a:1,r:'⅙ of a pizza each: one half split 3 ways.'},
 {t:'2 friends share 3 pizzas equally. How much does each friend get?',a:2,r:'1½ pizzas each: 3 split into 2 equal shares.'},
 {t:'A scoop holds ⅓ of a cup. How many scoops fill 2 cups?',a:3,r:'6 scoops: 3 thirds in each cup, and 2 cups.'}];
const WHY={'0-1':'That puts the ½ first. The ribbon is 3 m, so 3 is what gets divided: how many ½ m pieces fit in 3 m?','0-2':'3 ÷ 2 cuts the ribbon into 2 pieces. Here each piece is ½ m long, so ask how many halves fit in 3.','0-3':'2 ÷ ⅓ has the wrong numbers. The ribbon is 3 m and each piece is ½ m, so it is 3 ÷ ½.',
 '1-0':'3 ÷ ½ asks how many halves fit in 3. Here one half pizza is split into 3 shares, so it is ½ ÷ 3.','1-2':'3 ÷ 2 shares 3 whole pizzas. There is only ½ a pizza here.','1-3':'2 ÷ ⅓ has the wrong numbers. Here ½ a pizza is shared by 3 friends: ½ ÷ 3.',
 '2-0':'No ½ pieces here. 3 pizzas are shared by 2 friends: 3 ÷ 2.','2-1':'There are 3 whole pizzas, not half a pizza. Share 3 between 2.','2-3':'2 ÷ ⅓ has the wrong numbers, and nothing is a third. 3 pizzas shared by 2 friends is 3 ÷ 2.',
 '3-0':'3 ÷ ½ has the wrong numbers. There are 2 cups and each scoop is ⅓ cup: 2 ÷ ⅓.','3-1':'Nothing is shared out here. You fit ⅓-cup scoops into 2 cups.','3-2':'3 ÷ 2 shares 3 things between 2. Here you ask how many ⅓-cup scoops fit into 2 cups.'};
/* 4. smaller pieces: tap from smallest answer to biggest */
const ORDER=[4,8,2];
/* 5. shortcut sums: a ÷ 1/b with option [value, tag] */
const FAST=[{a:5,b:3,opts:[['1⅔','div'],['15','ok'],['8','add']]},{a:4,b:6,opts:[['24','ok'],['⅔','div'],['10','add']]},{a:6,b:2,opts:[['3','div'],['8','add'],['12','ok']]}];
const FASTWHY={div:'That divides by the bottom number. Dividing by ½ is not dividing by 2: count how many pieces fit, which is more than the wholes.',add:'That adds the numbers. Each whole holds the same number of pieces, so multiply: wholes × pieces in one whole.'};
const TXT=['3 ÷ ½ asks: how many halves fit into 3? Cut each whole into halves, then count the pieces.',
 'Check a division with a multiplication. If 4 ÷ ⅕ = 20, then 20 fifths must make 4 wholes.',
 'Read the story first. Are you fitting pieces into an amount, or sharing an amount into equal shares?',
 'The smaller the piece, the more pieces fit. So dividing by a smaller unit fraction gives a bigger answer.',
 'Each whole holds b pieces of size 1/b. So a ÷ 1/b = a × b: wholes times pieces in each whole.'];
const DESC=['Bars show the wholes. Pick a cutter, then tap each whole to cut it. Then count the pieces.',
 'A number line in wholes, marked in small pieces. Drag the bar end, or step it with the buttons, until the pieces make the target.',
 'A story is shown. Tap the number sentence that matches it.',
 'Three sums, each sharing 2 wholes into different pieces. Tap them from the smallest answer to the biggest.',
 'A sum is shown. Tap the answer.'];
const DONE=['Dividing by a unit fraction counts pieces: 3 ÷ ½ = 6 and 2 ÷ ¼ = 8. The answers are bigger than the wholes.',
 '20 × ⅕ = 4, so 4 ÷ ⅕ = 20. And 12 × ¼ = 3, so 3 ÷ ¼ = 12. Multiplying undoes dividing.',
 'Fitting pieces into an amount is amount ÷ piece size. Sharing an amount is amount ÷ number of shares.',
 '2 ÷ ½ = 4, 2 ÷ ¼ = 8, 2 ÷ ⅛ = 16. Halve the piece and twice as many fit.',
 'a ÷ 1/b = a × b: 5 ÷ ⅓ = 15, 4 ÷ ⅙ = 24, 6 ÷ ½ = 12.'];
const QS=[{q:'4 ÷ ½ = ?',a:'8',o:[['2','div'],['4','smaller']]},
 {q:'3 ÷ ¼ = ?',a:'12',o:[['¾','mult'],['7','add']]},
 {q:'How many ⅓-cup scoops are in 2 cups of rice?',a:'6',o:[['⅔','mult'],['5','add']]},
 {q:'Which is bigger: 5 ÷ ½ or 5 ÷ ⅕?',a:'5 ÷ ⅕',o:[['5 ÷ ½','bigger'],['They are equal','same']]},
 {q:'Which multiplication checks 6 ÷ ⅓ = 18?',a:'18 × ⅓ = 6',o:[['6 × ⅓ = 2','check'],['18 × 3 = 54','check']]},
 {q:'A plank 2 m long is cut into pieces ¼ m long. How many pieces?',a:'8',o:[['½','div'],['6','add']]},
 {q:'Is ½ ÷ 3 the same as 3 ÷ ½?',a:'No: ½ ÷ 3 = ⅙ but 3 ÷ ½ = 6',o:[['Yes: it uses the same numbers','flip'],['Yes: both are 1½','mult']]}];
return{NAME,ONE,U,CUT,TOOLS,CHECK,SENT,STORY,WHY,ORDER,FAST,FASTWHY,TXT,DESC,DONE,QS}})();
