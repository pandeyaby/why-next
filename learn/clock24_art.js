/* Data for the 12-hour and 24-hour time lab (flag_24h.js; bundled in the main learn.js like teeth_art.js so the lab file stays small).
   Times are minutes after midnight. FIND: times to find on the day strip. SET: 12-hour times to write in 24-hour time.
   PAIRS: 24-hour cards to match; DECOY: wrong 12-hour cards [label, the card it tempts]. MIDS: cards for the midnight/midday sort. TRAINS: timetable questions. */
const C24ART={
FIND:[420,720,900,1260],
SET:[[980,'Afternoon hours add 12.'],[1265,'Evening is pm too: add 12.'],[705,'Morning hours stay the same.']],
PAIRS:[1170,495,785,1310],DECOY:[['9:30 pm',1170],['3:05 pm',785]],
MIDS:[15,735,50,760],
TRAINS:[{q:'You must be there by 5:30 pm. Tap the latest train that arrives in time.',rows:[[945,1005],[990,1040],[1010,1060],[1035,1085]],col:1,ans:1},
 {q:'Tap the first train that leaves after 7 pm.',rows:[[1035,1110],[1095,1150],[1150,1205],[1205,1265]],col:0,ans:2}],
bank:[['What is 3:45 pm in 24-hour time?','15:45',[['03:45','am'],['13:45','add10']]],
 ['What is 19:30 in 12-hour time?','7:30 pm',[['9:30 pm','drop1'],['7:30 am','ampm']]],
 ['What is 00:20 in 12-hour time?','12:20 am',[['12:20 pm','midday'],['0:20 pm','zero']]],
 ['What is 9:10 am in 24-hour time?','09:10',[['21:10','pmadd'],['9:10 pm','ampm']]],
 ['Which 24-hour time is midday?','12:00',[['00:00','midnight'],['24:00','noon24']]],
 ['A film starts at 20:15. Is that morning or evening?','Evening (8:15 pm)',[['Morning (8:15 am)','ampm'],['Afternoon (2:15 pm)','drop1']]]],
WHYM:{am:'03:45 is quarter to 4 in the morning. Afternoon times add 12: 3 + 12 = 15.',add10:'Adding 10 is a slip. Afternoon hours add 12, so 3 pm is 15:00.',
 drop1:'Do not just drop the first digit. Take away 12: 19 − 12 = 7.',ampm:'Hours from 12 to 23 are pm (after midday). Hours from 00 to 11 are am.',
 midday:'00 is the midnight hour, so 00:20 is 20 minutes after midnight: 12:20 am.',zero:'12-hour clocks never show 0. The hour after midnight is 12 am.',
 pmadd:'Morning (am) hours do not change. Only pm hours add 12. Write 9 as 09.',midnight:'00:00 is midnight, the start of the day. Midday is 12:00.',noon24:'24:00 is the end of the day (midnight). Midday is 12:00.'}};
