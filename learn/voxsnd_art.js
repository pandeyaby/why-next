/* Data for flagvoxsnd (voice sounds, ages 3–4; Letters and Sounds Phase One, Aspect 3 "Voice sounds": distinguish
   between different vocal sounds and explore speech sounds with the voice; Development Matters 2021 Communication and
   Language 3–4 and Literacy 3–4 phonological awareness). Long sounds are continuants that can be held while the breath
   lasts (fricatives s, f, z, sh and nasals m, n); short sounds are stops (plosives t, p, k, b, d, g) that end at once
   and can only be said again, not stretched. z buzzes because the voice hums (voiced); s only hisses (voiceless).
   Loud and quiet (volume) is a different thing from high and low (pitch). Slips it targets: saying a short sound again
   and again and calling it long, mixing up loud with high or quiet with high, a voice that does not fit the place,
   matching s with a bee (no hum), and matching a long sound with a short, ticking thing. */
const VXS=(()=>{
/* 1. stretch it: long (can be held) or short (stops at once) */
const STRETCH=[{s:'sss',long:true,say:'sssssss, like a snake'},{s:'t',long:false,say:'t, like a dripping tap'},
 {s:'mmm',long:true,say:'mmmmmm, like yummy food'},{s:'p',long:false,say:'p, like a popping bubble'}];
/* 2. voice sounds that copy things; near = the slip a wrong thing shows */
const THINGS=['snake','bee','clock','car'];
const COPY=[{v:'sss',w:'snake',near:{bee:'hum',clock:'short',car:'thing'}},{v:'zzz',w:'bee',near:{snake:'hum',clock:'short',car:'thing'}},
 {v:'tick, tock',w:'clock',near:{snake:'short',bee:'short',car:'thing'}},{v:'brrrm',w:'car',near:{snake:'thing',bee:'thing',clock:'short'}}];
/* 3. a voice to fit the place: 0 whisper, 1 talking voice, 2 calling voice */
const VOL=['whisper','talking voice','calling voice'];
const PLACES=[{k:'baby',n:'The baby is asleep',v:0,why:'A whisper will not wake the baby.'},
 {k:'table',n:'Talk to a friend at the table',v:1,why:'Your friend is close, so a talking voice is just right.'},
 {k:'park',n:'Call a friend far away in the park',v:2,why:'Your friend is far away, so a big calling voice helps them hear.'}];
/* 4. high or low (pitch), whatever the volume: 0 high, 1 middle, 2 low */
const RUNG=['high','middle','low'];
const PITCH=[{k:'mouse',n:'A tiny mouse squeaks',p:0},{k:'bear',n:'A big bear growls',p:2},
 {k:'bear',n:'The bear growls very quietly',p:2,trap:'quiet'},{k:'mouse',n:'The mouse squeaks very loudly',p:0,trap:'loud'}];
/* 5. sound patterns: L = long block, S = short block */
const PATS=[{s:['sss','t','sss'],b:'LSL'},{s:['t','t','mmm'],b:'SSL'},{s:['fff','p','p'],b:'LSS'}];
/* live descriptions of each scene for screen readers */
const DESC=['A sound card with a stretch handle. Drag the handle to try to stretch the sound, then put it in the Long box or the Short box.',
 'A voice sound in a bubble and four things: a snake, a bee, a clock and a car. Give the sound to the thing it copies.',
 'A place and a voice slider from whisper to calling voice. Slide to the voice that fits, then tap Say it.',
 'A ladder with high at the top and low at the bottom. Drag the voice dot to how high or low the sound is.',
 'A grown-up says three sounds. Build the pattern with long bars and short dots.',
 'Challenge.'];
const DONE=['sss and mmm stretch for as long as your breath lasts. t and p stop at once.','You copied a snake, a bee, a clock and a car with your voice.',
 'A whisper for the sleeping baby, a talking voice at the table, a calling voice in the park.','Mice squeak high and bears growl low, loud or quiet.',
 'You built every pattern: long sounds are bars, short sounds are dots.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Which sound can you stretch for a long time?',a:'sss',o:[['t','repeat'],['p','repeat']]},
 {q:'Someone says t-t-t-t. Is t a long sound?',a:'No, t is short. It was said again and again',o:[['Yes, it went on for a long time','repeat'],['Yes, it was loud','volume']]},
 {q:'A tiny mouse squeaks loudly. High or low?',a:'High',o:[['Low, because it is loud','mixhigh'],['It is not high or low','nopitch']]},
 {q:'A big bear growls quietly. High or low?',a:'Low',o:[['High, because it is quiet','quiethigh'],['It is not high or low','nopitch']]},
 {q:'The baby is asleep. Which voice?',a:'A whisper',o:[['A calling voice','place'],['A talking voice','place']]},
 {q:'Which voice sound buzzes like a bee?',a:'zzz',o:[['sss','hum'],['t','short']]},
 {q:'Which voice sound goes with a clock?',a:'tick, tock',o:[['sss','thing'],['brrrm','thing']]}];
/* simple flat pictures for the lab, drawn with shapes (no character art) */
/* simple flat pictures, drawn with shapes (no character art) */
function pic(g,paint,k,x,y,s){g.save();g.translate(x,y);g.lineCap='round';g.lineJoin='round';const fillc=(col,f)=>{g.fillStyle=col;g.beginPath();f();g.fill()};
 if(k==='snake'){g.strokeStyle='#15803d';g.lineWidth=s*.18;g.beginPath();g.moveTo(-s*.5,s*.15);g.bezierCurveTo(-s*.3,-s*.35,-s*.05,s*.45,s*.15,0);g.bezierCurveTo(s*.25,-s*.2,s*.35,-s*.15,s*.42,-s*.1);g.stroke();fillc('#1f2937',()=>g.arc(s*.4,-s*.14,s*.04,0,7))}
 if(k==='bee'){fillc('#bfdbfe',()=>{g.ellipse(-s*.08,-s*.28,s*.16,s*.1,-.5,0,7);g.ellipse(s*.12,-s*.28,s*.16,s*.1,.5,0,7)});fillc('#facc15',()=>g.ellipse(0,0,s*.38,s*.24,0,0,7));
  g.fillStyle='#1f2937';[-.14,.06].forEach(d=>g.fillRect(s*d,-s*.22,s*.08,s*.44));}
 if(k==='clock'){fillc('#ffffff',()=>g.arc(0,0,s*.4,0,7));g.strokeStyle='#1f2937';g.lineWidth=s*.06;g.beginPath();g.arc(0,0,s*.4,0,7);g.stroke();g.beginPath();g.moveTo(0,0);g.lineTo(0,-s*.26);g.moveTo(0,0);g.lineTo(s*.18,s*.06);g.stroke()}
 if(k==='car'){fillc('#dc2626',()=>{paint.rrect(-s*.48,-s*.08,s*.96,s*.26,s*.06);paint.rrect(-s*.26,-s*.3,s*.5,s*.26,s*.08)});fillc('#bfdbfe',()=>g.rect(-s*.18,-s*.24,s*.34,s*.14));
  fillc('#1f2937',()=>{g.arc(-s*.26,s*.2,s*.12,0,7);g.moveTo(s*.38,s*.2);g.arc(s*.26,s*.2,s*.12,0,7)})}
 if(k==='mouse'){fillc('#9ca3af',()=>{g.arc(-s*.12,-s*.18,s*.1,0,7);g.moveTo(s*.2,-s*.18);g.arc(s*.1,-s*.18,s*.1,0,7)});fillc('#9ca3af',()=>g.ellipse(0,s*.02,s*.24,s*.18,0,0,7));fillc('#1f2937',()=>g.arc(s*.2,0,s*.03,0,7))}
 if(k==='bear'){fillc('#92400e',()=>{g.arc(-s*.28,-s*.3,s*.13,0,7);g.moveTo(s*.41,-s*.3);g.arc(s*.28,-s*.3,s*.13,0,7)});fillc('#92400e',()=>g.arc(0,0,s*.42,0,7));fillc('#fde68a',()=>g.ellipse(0,s*.12,s*.17,s*.12,0,0,7))}
 if(k==='baby'){g.strokeStyle='#1f2937';g.lineWidth=s*.05;g.strokeRect(-s*.45,-s*.15,s*.9,s*.4);for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*s*.12,-s*.15);g.lineTo(i*s*.12,s*.25);g.stroke()}
  fillc('#facc15',()=>{g.arc(s*.3,-s*.38,s*.12,0,7)});fillc('#ffffff',()=>g.arc(s*.36,-s*.42,s*.1,0,7))}
 if(k==='table'){fillc('#b45309',()=>{g.rect(-s*.45,-s*.05,s*.9,s*.08);g.rect(-s*.4,0,s*.06,s*.34);g.rect(s*.34,0,s*.06,s*.34)});fillc('#2563eb',()=>{g.rect(-s*.28,-s*.22,s*.14,s*.17);g.rect(s*.14,-s*.22,s*.14,s*.17)})}
 if(k==='park'){fillc('#166534',()=>g.arc(-s*.25,-s*.1,s*.22,0,7));fillc('#92400e',()=>g.rect(-s*.28,s*.1,s*.06,s*.22));g.strokeStyle='#1f2937';g.lineWidth=s*.05;g.setLineDash([s*.06,s*.06]);g.beginPath();g.moveTo(-s*.02,s*.1);g.lineTo(s*.4,s*.1);g.stroke();g.setLineDash([]);fillc('#1d4ed8',()=>g.arc(s*.44,-s*.02,s*.08,0,7))}
 g.restore()}
return{pic,STRETCH,THINGS,COPY,VOL,PLACES,RUNG,PITCH,PATS,DESC,DONE,QS}})();
