/* Data for the subtracting-multiples-of-10 lab (flag_subten.js; bundled in learn.js so the lab file stays small).
   Each sum is a multiple of 10 minus a multiple of 10 with a positive difference (CCSS 1.NBT.C.6, range 10–90). */
const SUBTENART=(()=>{
const TAKE=[[70,30],[80,50],[60,20]];
const LEAVE=[[80,30],[50,20],[90,40]];
const FACTS=[[90,40,[['9 − 4 = 5','ok'],['9 + 4 = 13','add'],['90 − 4 = 86','ones']]],[80,30,[['8 + 3 = 11','add'],['8 − 3 = 5','ok'],['80 − 3 = 77','ones']]],[60,40,[['60 − 4 = 56','ones'],['6 + 4 = 10','add'],['6 − 4 = 2','ok']]]];
const HOPS=[[90,60],[70,40],[100,30]];
const KIDS=[[[70,30],[['Ali',4,'Ali worked out 7 − 3 = 4 but forgot these are tens. 4 tens is 40.'],['Bea',40,''],['Cal',100,'Cal added 70 + 30. Taking away makes the number smaller.']]],
 [[60,20],[['Dev',80,'Dev added 60 + 20 instead of taking away.'],['Eli',50,'Eli took away only one ten. 20 is 2 tens, so take away 2 bundles.'],['Fay',40,'']]],
 [[90,50],[['Gus',40,''],['Hana',4,'Hana wrote the ones fact 9 − 5 = 4. It is 4 tens: 40.'],['Ivy',85,'Ivy took away 5 ones, not 5 tens. 50 is five tens.']]]];
const QZ=[['80 − 40 = ?','40',[['4','tensdrop'],['120','added']]],
 ['50 − 30 = ?','20',[['2','tensdrop'],['47','onesonly']]],
 ['9 − 6 = 3. So 90 − 60 = ?','30',[['3','tensdrop'],['150','added']]],
 ['70 − ? = 20','50',[['5','tensdrop'],['90','added']]],
 ['How many jumps of 10 back for 100 − 40?','4',[['40','jumps'],['6','jumpsleft']]],
 ['Which fact helps with 60 − 20?','6 − 2 = 4',[['6 + 2 = 8','addfact'],['60 − 2 = 58','onesonly']]]];
const WHY={tensdrop:'That is the ones fact. You took away tens, so the answer is tens: put the 0 back.',added:'That is adding. Taking away makes the number smaller.',onesonly:'Take away tens, not ones. 30 is 3 tens.',
 jumps:'Each jump is one ten. 40 is 4 tens, so 4 jumps.',jumpsleft:'6 jumps would land on 40. You jump back 4 tens and land on 60.',addfact:'You need a take-away fact. 6 tens − 2 tens = 4 tens.'};
return{TAKE,LEAVE,FACTS,HOPS,KIDS,QZ,WHY}})();
