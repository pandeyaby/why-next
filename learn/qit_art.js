/* Data for flagqit (current as rate of flow of charge, ages 14–16). Sources: AQA GCSE Physics 8463, 4.2.1.3 ("Electric
   current is a flow of electrical charge. The size of the electric current is the rate of flow of electrical charge":
   Q = I t, charge in coulombs C, current in amperes A, time in seconds s; "the current is the same at any point in a single
   closed loop"); OCR Gateway J249 P3.1; BIPM SI Brochure (9th ed.): the coulomb is the charge carried by 1 A in 1 s, and
   the elementary charge is exactly 1.602176634 × 10⁻¹⁹ C, so 1 C is about 6.24 × 10¹⁸ electrons. Slips it targets:
   multiplying when dividing is needed (or the reverse); leaving time in minutes or hours; leaving current in mA; thinking
   a lamp uses up current; reading a steep charge–time line as a small current. */
const QIT=(()=>{
const COUL_PER_DOT=0.5,IMIN=0.5,IMAX=4,ISTEP=0.5,ELECTRONS_PER_C=1/1.602176634e-19;
/* scene 1: make this much charge pass the gate in a fixed time */
const COUNT={q:6,t:3};
/* scene 2: this much charge must pass; find currents that take each time */
const TIMED={q:12,want:[4,8]};
/* scene 3: unit traps, each wrong option names its slip */
const UNITS=[
 {q:'A lamp takes 0.5 A for 5 minutes. How much charge passes?',a:'150 C',o:['2.5 C','150 C','0.1 C'],why:{'2.5 C':'5 minutes is 300 s, not 5 s. Q = 0.5 × 300 = 150 C.','0.1 C':'Multiply, do not divide: Q = I × t = 0.5 × 300 = 150 C.'}},
 {q:'A sensor takes 200 mA for 2 minutes. How much charge passes?',a:'24 C',o:['400 C','24,000 C','24 C'],why:{'400 C':'Convert both: 200 mA = 0.2 A and 2 minutes = 120 s. Q = 0.2 × 120 = 24 C.','24,000 C':'200 mA is 0.2 A, not 200 A. Q = 0.2 × 120 = 24 C.'}},
 {q:'A heater takes 10 A. How long does it take for 3,000 C to pass?',a:'300 s',o:['300 s','30,000 s','0.003 s'],why:{'30,000 s':'Rearrange Q = I t to t = Q ÷ I. 3,000 ÷ 10 = 300 s, not 3,000 × 10.','0.003 s':'Divide charge by current, not current by charge: t = Q ÷ I = 3,000 ÷ 10 = 300 s.'}}];
/* scene 4: charge–time graph, 0–10 s and 0–40 C; draw the line for each current */
const GRAPH={tMax:10,qMax:40,want:[2,3.5]};
/* scene 5: four measuring points round one series loop (fraction of the way round the loop) */
const LOOP={amps:2,secs:5,spots:[{n:'A',f:.06},{n:'B',f:.3},{n:'C',f:.45},{n:'D',f:.7}]};
const DESC=[
 'Charge flows along the wire. Each dot is 0.5 C. Drag the current handle, then tap Run 3 s. The counter shows the charge that passes the gate.',
 'This time exactly 12 C must pass. Set a current and tap Run 12 C. The stopwatch shows how long it takes.',
 'Real numbers come in minutes and milliamps. Tap the right answer for each.',
 'A charge–time graph. Drag the end of the line up or down. The slope of the line is the current.',
 'One loop with a cell and a lamp. Drag the counting ring to each lettered point and read the current there.'];
const DONE=[
 '2 A for 3 s lets 6 C pass: Q = I × t.',
 '3 A takes 4 s and 1.5 A takes 8 s: half the current, twice the time.',
 'Change minutes to seconds and mA to A first, then use Q = I t.',
 'Charge per second is the slope: 2 A climbs 20 C in 10 s, 3.5 A climbs 35 C.',
 '2 A at every point: charge is not used up, so the current is the same all round a series loop.'];
const QS=[
 {q:'A charge of 30 C flows past a point in 15 s. What is the current?',a:'2 A',o:[['450 A','times'],['0.5 A','flip']]},
 {q:'A current of 0.4 A flows for 2 minutes. How much charge passes?',a:'48 C',o:[['0.8 C','mins'],['300 C','flip']]},
 {q:'In a series loop, how does the current after a lamp compare with the current before it?',a:'It is the same',o:[['It is smaller','used'],['It is bigger','used']]},
 {q:'On a charge–time graph, a steeper straight line shows…',a:'A bigger current',o:[['A longer time','graph'],['A smaller current','graph']]},
 {q:'A current of 250 mA flows for 20 s. How much charge passes?',a:'5 C',o:[['5,000 C','milli'],['0.08 C','flip']]},
 {q:'What does a current of 1 ampere mean?',a:'1 coulomb of charge passes a point each second',o:[['1 coulomb of charge is used up each second','used'],['Each coulomb is given 1 joule of energy','volt']]}];
/* challenge feedback for the slips the lab file does not hold */
const WHY={milli:'Change milliamps to amps first: 250 mA = 0.25 A, so Q = 0.25 × 20 = 5 C.',volt:'Energy per coulomb is the potential difference (volts). Current is charge per second.',graph:'The slope of a charge–time line is charge ÷ time, which is the current. Steeper means more charge each second.'};
return{COUL_PER_DOT,IMIN,IMAX,ISTEP,ELECTRONS_PER_C,COUNT,TIMED,UNITS,GRAPH,LOOP,DESC,DONE,QS,WHY}})();
