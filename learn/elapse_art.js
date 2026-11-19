/* Data for flagelapse (comparing time durations, ages 7–8). Sources: DfE National Curriculum 2013 Year 3 Measurement
   ("compare durations of events [for example to calculate the time taken by particular events or tasks]"; "tell and
   write the time from an analogue clock"); NCETM Year 3 ready-to-progress guidance on time intervals; Burny, Valcke and
   Desoete 2009 on children's clock-reading errors. Slips it targets: subtracting times as if an hour had 100 minutes
   (11:00 − 10:15 = 85), looking only at the hours (3:40 to 4:10 is "1 hour"), thinking the event that ends later must
   last longer, and writing an end time like 3:85. Times are minutes after 12 (t = hour × 60 + minutes), one half-day. */
const ELP=(()=>{
const HOPS=[{a:640,b:675},{a:170,b:205}];          /* 10:40 → 11:15, 2:50 → 3:25: hop to the o'clock, then on */
const CLOCKS=[{a:570,b:605,what:'Swimming lesson'},{a:465,b:495,what:'Walk to school'}];   /* 9:30 → 10:05, 7:45 → 8:15 */
const PAIRS=[{lo:120,hi:300,A:{n:'Film A',a:150,b:240},B:{n:'Film B',a:195,b:270},long:'A'},
 {lo:630,hi:720,A:{n:'Swim',a:650,b:695},B:{n:'Football',a:660,b:700},long:'A'}];
const ROBOT=[{a:615,b:660,said:'11.00 − 10.15 = 85, so 85 minutes',ok:false,fix:'An hour has 60 minutes, not 100. 10:15 to 11:00 is 45 minutes.'},
 {a:590,b:620,said:'10 minutes to 10:00, then 20 more: 30 minutes',ok:true,fix:'9:50 to 10:00 is 10 minutes, 10:00 to 10:20 is 20. 30 minutes.'},
 {a:220,b:250,said:'4 − 3 = 1, so 1 hour',ok:false,fix:'Look at the minutes too. 3:40 to 4:00 is 20, 4:00 to 4:10 is 10. Only 30 minutes.'},
 {a:75,b:135,said:'1:15 to 2:15 is 1 hour, 60 minutes',ok:true,fix:'The minute hand goes all the way round once. 1 hour is 60 minutes.'}];
const ENDS=[{a:225,len:40,what:'A TV show'},{a:410,len:25,what:'Bath time'}];   /* 3:45 + 40 min, 6:50 + 25 min */
const DESC=[
 'A time line from 10:40 to 11:15 marked every 5 minutes. Hop to the o\'clock first, then on to the finish time.',
 'A clock face showing 9:30. Each tap moves the minute hand on 5 minutes. Stop at 10:05.',
 'Two bars on a time line from 2:00 to 5:00: Film A and Film B. Tap a bar to measure it.',
 'A robot works out how long things take. Buttons: Right or Slip.',
 'A time line from 3:45 marked every 5 minutes. A show lasts 40 minutes. Hop to find when it ends.'];
const DONE=[
 '10:40 to 11:00 is 20 minutes, then 15 more: 35 minutes. 2:50 to 3:25 is 10 + 25 = 35 minutes. Hop to the o\'clock, then add the hops.',
 'Swimming took 35 minutes and the walk took 30. Count on 5 minutes for each number the minute hand passes.',
 'Film A lasts 90 minutes and Film B 75, so A is longer, even though B ends later. Swim (45) beats Football (40) the same way.',
 'Two slips: subtracting as if an hour were 100 minutes, and looking only at the hours.',
 '3:45 + 15 is 4:00, then 25 more is 4:25. 6:50 + 10 is 7:00, then 15 more is 7:15. There is no 3:85 on a clock.'];
const QS=[
 {q:'A lesson starts at 10:15 and ends at 11:00. How long is it?',a:'45 minutes',o:[['85 minutes','hundred'],['1 hour','hours']]},
 {q:'How long is it from 3:40 to 4:10?',a:'30 minutes',o:[['1 hour','hours'],['70 minutes','hundred']]},
 {q:'Film A: 2:30 to 4:00. Film B: 3:15 to 4:30. Which film is longer?',a:'Film A',o:[['Film B, it ends later','ends'],['They are the same','same']]},
 {q:'A show starts at 3:45 and lasts 40 minutes. When does it end?',a:'4:25',o:[['3:85','hundred'],['4:45','hours']]},
 {q:'Best first hop to find the time from 9:50 to 10:20?',a:'Hop to 10:00',o:[['Hop to 10:50','hours'],['Take 9.50 from 10.20','hundred']]},
 {q:'Swim: 10:50 to 11:35. Football: 11:00 to 11:40. Which is longer?',a:'Swim',o:[['Football, it ends later','ends'],['Football, it starts later','same']]}];
return{HOPS,CLOCKS,PAIRS,ROBOT,ENDS,DESC,DONE,QS}})();
