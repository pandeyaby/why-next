/* Data for flagdirnum (positive and negative numbers, ages 11–13). Sources: DfE (2013) KS3 mathematics programme of
   study ("order positive and negative integers"; "use the four operations, including with negative integers"); CCSS
   6.NS.5–6.NS.7 and 7.NS.1 (opposite directions from zero, p + q as a distance |q| from p in the direction of q's sign,
   p − q = p + (−q), distance between two numbers is the absolute value of their difference); NCETM Year 7 "Directed
   number" materials. Slips it targets: ordering negatives by their digits (−8 > −3), dropping the sign, treating
   4 + (−6) as 4 + 6, treating 3 − (−4) as 3 − 4, walking the wrong way for 5 − 8, and finding a gap across zero by
   subtracting the digits (7 − 5 instead of 7 + 5). */
const DIRNUM=(()=>{
const LO=-10,HI=10;
const PINS=[{v:-8,t:'A freezer is at −8 °C.'},{v:7,t:'A kite flies 7 m above the ground.'},{v:-3,t:'The car park is 3 floors below the ground: floor −3.'},{v:-6,t:'A diver swims 6 m below sea level.'}];
/* sums: start a, then op with n; answer r */
const ADD=[{a:-3,n:5,r:2},{a:4,n:-6,r:-2},{a:-2,n:-3,r:-5}];
const SUB=[{a:5,n:8,r:-3},{a:-2,n:4,r:-6},{a:3,n:-4,r:7}];
const TWINS={left:['6 − (−2)','6 + (−2)','−1 − (−5)','−4 − 3'],right:['6 + 2','6 − 2','−1 + 5','−4 + (−3)'],match:[0,1,2,3],
 why:['Taking away −2 moves right, the same as adding 2.','Adding −2 moves left, the same as taking away 2.','Taking away −5 moves right, the same as adding 5.','Taking away 3 moves left, the same as adding −3.']};
const GAPS=[{a:-7,b:5,t:'The temperature rises from −7 °C to 5 °C. How many degrees is the rise?',opts:[[12,'ok'],[2,'gap'],[-12,'neg']],u:'degrees'},
 {a:-4,b:6,t:'A lift goes from floor −4 up to floor 6. How many floors does it climb?',opts:[[10,'ok'],[2,'gap'],[6,'end']],u:'floors'},
 {a:-9,b:-2,t:'A bank balance goes from −£9 to −£2. How much money was paid in?',opts:[[7,'ok'],[11,'add'],[-7,'neg']],u:'pounds'}];
const GAPWHY={gap:'That subtracts the digits. Across zero, add the two parts: the steps up to zero, then the steps past it.',neg:'A rise or a climb is a distance, so it is positive. Count the steps between the two points.',
 end:'That is where it ends, not how far it went. Count every step from the start to the end.',add:'Both numbers are below zero, so you do not cross zero. Count the steps from −9 up to −2.'};
const TXT=['Numbers left of zero are negative, numbers right of zero are positive. The further left, the smaller the number, so −8 is less than −3.',
 'To add, start at the first number. Adding a positive number moves right. Adding a negative number moves left.',
 'Subtracting does the opposite of adding. Take away a positive: move left. Take away a negative: move right.',
 'Every subtraction has a twin addition that moves the same way: a − (−b) = a + b, and a + (−b) = a − b. Match the twins.',
 'The gap between two numbers is how many steps apart they are. When the gap crosses zero, count up to zero, then carry on.'];
const DESC=['A number line from −10 to 10 with a pin at 0. Drag the pin, or use the buttons, to place each number.',
 'A number line with a counter. Drag the counter to the answer, or step it with the buttons and press Check.',
 'A number line with a counter. Subtract: drag the counter to the answer, or step it with the buttons and press Check.',
 'Two columns of sums. Tap a sum on the left, then its twin on the right.',
 'A number line with two points marked. Choose how many steps apart they are.'];
const DONE=['Below zero is negative, and smaller the further left it goes: −8 °C is colder than −3 °C.',
 'Adding a positive number moves right; adding a negative number moves left, so 4 + (−6) = −2.',
 'Subtracting a positive moves left, and subtracting a negative moves right, so 3 − (−4) = 7.',
 'Taking away a negative is the same as adding a positive, and adding a negative is the same as taking away a positive.',
 'Across zero, add the two parts: from −7 to 5 is 7 + 5 = 12 steps.'];
const QS=[{q:'Which is colder: −9 °C or −4 °C?',a:'−9 °C',o:[['−4 °C','bigger'],['They are equally cold','sign']]},
 {q:'−5 + 8 = ?',a:'3',o:[['−13','dir'],['13','sign']]},
 {q:'2 + (−7) = ?',a:'−5',o:[['9','addneg'],['5','sign']]},
 {q:'4 − (−3) = ?',a:'7',o:[['1','subneg'],['−7','sign']]},
 {q:'−6 − 2 = ?',a:'−8',o:[['−4','flip'],['8','sign']]},
 {q:'The temperature goes from −6 °C to 4 °C. How many degrees did it rise?',a:'10',o:[['2','gap'],['−10','sign']]},
 {q:'Which list is in order, smallest first?',a:'−7, −2, 0, 3',o:[['−2, −7, 0, 3','bigger'],['0, −2, 3, −7','sign']]}];
return{LO,HI,PINS,ADD,SUB,TWINS,GAPS,GAPWHY,TXT,DESC,DONE,QS}})();
