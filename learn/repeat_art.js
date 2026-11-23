/* Data and pictures for flagrepeat (accurate measurement: repeat readings and anomalous results; ages 9-11). Sources:
   DfE National Curriculum in England: science programmes of study, upper key stage 2 working scientifically ('taking
   measurements, using a range of scientific equipment, with increasing accuracy and precision, taking repeat readings when
   appropriate') and key stage 3 ('evaluate data, showing awareness of potential sources of random and systematic error;
   identify further questions arising from their results'); ASE / Nuffield Foundation (2010), The Language of Measurement:
   terminology used in school science investigations (repeatable, precise = readings close together, accurate = close to
   the true value, anomaly = a value outside the expected spread); Allen (2014), Misconceptions in Primary Science (2nd ed.),
   Open University Press (children expect identical readings and see differences as failure). Slips it targets: expecting
   repeat readings to match exactly; one reading is enough; putting an anomaly into the mean; rubbing an anomaly out of the
   record; trusting spread-out results; thinking close readings must be accurate. */
const REPEAT=(()=>{
/* step 1: time a toy car down the same ramp three times (seconds) */
const RUNS=[2.4,2.6,2.5];
/* steps 2 and 3: repeat readings with one anomaly (index bad); the mean leaves it out */
const SETS=[{q:'Ball bounce height',u:'cm',v:[42,44,43,61],bad:3},{q:'Time for an ice cube to melt',u:'min',v:[12,14,6,13],bad:2},{q:'Water temperature after 5 minutes',u:'°C',v:[38,37,31,39],bad:2}];
/* step 4: which group's readings can you trust more? k = the group with the smaller range */
const PAIRS=[{q:'Toy car time (s)',a:[2.4,2.5,2.6],b:[2.0,2.9,2.5],k:0},{q:'Paper plane flight (cm)',a:[51,58,46],b:[52,53,52],k:1},{q:'Seeds sprouted in 1 week',a:[20,21,20],b:[15,24,21],k:0}];
/* step 5: good practice (0) or not (1)? */
const HAB=[{t:'Take at least 3 readings',z:0,why:'Three or more readings show the spread and let you spot an anomaly.'},
 {t:'Rub out a reading you do not like',z:1,why:'Keep every reading in the table. Circle an anomaly and say why you left it out.'},
 {t:'Repeat a reading that does not fit',z:0,why:'Measuring again shows whether the odd one was a slip.'},
 {t:'Measure once to save time',z:1,why:'One reading cannot show a slip. You would not know if it was an anomaly.'},
 {t:'Leave the anomaly out of the mean',z:0,why:'An anomaly pulls the mean away from the real value, so the mean uses the others.'},
 {t:'Change the numbers so they match',z:1,why:'Real readings vary a little. Changing them is making data up.'}];
const DESC=['A ramp with a toy car and a stopwatch. Tap the stopwatch, or press Time a run, to time the car. Each time is written in the table.',
 'A table of four repeat readings. Tap the reading that does not fit with the others: the anomaly.',
 'Four readings on cards and an Add up tray. Drag the readings that fit into the tray, or press their buttons, to find the mean.',
 'Two groups measured the same thing. Tap the group whose readings you can trust more: the closer together they are, the better.',
 'Something a scientist might do, and two boxes: Good practice and Not good practice. Drag the card to a box, or use the buttons.'];
const TXT=['Time the same run three times. Do the readings match?','An anomaly is a reading that does not fit the pattern of the others.','Find the mean of the repeat readings, leaving out the anomaly.','Readings close together are more repeatable. The range shows the spread.','Good habits for measuring.'];
const DONE=['The times were 2.4, 2.6 and 2.5 s. Repeat readings vary a little, often because of reaction time, so take at least 3.',
 'An anomaly sits far from the other repeat readings. It is often a slip, such as starting the stopwatch late.',
 'The mean is the total divided by how many readings you used. Leave the anomaly out, but keep it in your table.',
 'The range is the largest reading take away the smallest. A small range means the readings agree, so you can trust them more.',
 'Take at least 3 readings, repeat any that do not fit, keep every reading in the table and never change data to match.'];
const QS=[{q:'Mia timed the same car run 3 times and got 2.4, 2.6 and 2.5 s. What does that show?',a:'Readings vary a little: that is normal',o:[['Her stopwatch is broken','exact'],['Only the first one counts','once']]},
 {q:'Readings: 42, 44, 43 and 61 cm. What is the mean bounce height?',a:'43 cm',o:[['47.5 cm','all'],['61 cm','big']]},
 {q:'One reading does not fit the others. What should you do with it?',a:'Repeat it, leave it out of the mean and keep it in the table',o:[['Rub it out','erase'],['Put it in the mean anyway','all']]},
 {q:'Group A got 51, 58 and 46 cm. Group B got 52, 53 and 52 cm. Whose results can you trust more?',a:'Group B: small range',o:[['Group A: bigger numbers','spread'],['Both the same','spread']]},
 {q:'Why is one reading not enough?',a:'You cannot tell if it was a slip',o:[['One reading is always right','once'],['Repeat readings should all be the same','exact']]},
 {q:'Three readings are very close together, but the scale was not set to zero. Are they accurate?',a:'Not for sure: close together is not the same as correct',o:[['Yes: close readings are always correct','accprec'],['Yes: three readings is enough','once']]},
 {q:'Readings: 12, 14, 6 and 13 minutes. Which one is the anomaly?',a:'6 minutes',o:[['14 minutes','big'],['12 minutes','big']]}];
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function split(t,max,font){const c=g();c.font=font;const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&c.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
 function bar(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=split(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=split(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function tile(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(t==null||t==='')return;let n=sz(o.n||15),L;
  for(;;){L=split(t,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=10)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 /* a ramp with the toy car at the top (at=0) or the bottom (at=1) */
 function ramp(r,at){const c=g();c.fillStyle=dk()?'#a16207':'#d97706';c.beginPath();c.moveTo(r.x,r.y);c.lineTo(r.x+r.w,r.y+r.h);c.lineTo(r.x,r.y+r.h);c.closePath();c.fill();
  c.strokeStyle=dk()?'#fde68a':'#78350f';c.lineWidth=2;c.stroke();const t=at?0.86:0.14,cx=r.x+r.w*t,cy=r.y+r.h*t,ang=Math.atan2(r.h,r.w),s=Math.min(r.w,r.h)*.18;
  c.save();c.translate(cx,cy);c.rotate(ang);c.fillStyle='#dc2626';A.paint.rrect(-s,-s*.9,s*2,s*.7,s*.2);c.fill();c.fillStyle='#1e293b';[-s*.55,s*.55].forEach(x=>{c.beginPath();c.arc(x,-s*.15,s*.25,0,7);c.fill()});c.restore()}
 /* a stopwatch face showing a time in seconds */
 function watch(cx,cy,R,t,live){const c=g();c.fillStyle='#334155';c.fillRect(cx-R*.15,cy-R*1.25,R*.3,R*.3);c.beginPath();c.arc(cx,cy,R,0,7);c.fillStyle='#ffffff';c.fill();c.lineWidth=R*.12;c.strokeStyle=live?'#1d4ed8':'#334155';c.stroke();
  c.font=`800 ${Math.round(R*.42)}px ui-monospace,monospace`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';c.fillText(t==null?'0.0':t.toFixed(1),cx,cy-R*.05);c.font=`700 ${Math.round(R*.22)}${F}`;c.fillText('seconds',cx,cy+R*.4);
  return{x:cx-R,y:cy-R*1.25,w:2*R,h:2.25*R}}
 return{split,bar,tile,ramp,watch,sz,fg,dk,INK,OK,NO,RIM,F}}
return{RUNS,SETS,PAIRS,HAB,DESC,TXT,DONE,QS,PEN}})();
