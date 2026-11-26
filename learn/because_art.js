/* Data and drawings for flagbecause (answering why questions with because; English, Speaking & Listening, ages 4-5).
   Sources: DfE Development Matters (2021), ages 3-4 Communication and Language ('understand why questions, like: Why do
   you think the caterpillar got so fat?') and Reception ('connect one idea or action to another using a range of
   connectives'; 'use talk to ... explain how things work and why they might happen'); EYFS Statutory Framework (2024)
   ELG Speaking ('offer explanations for why things might happen'); Blank, Rose and Berlin (1978) levels of questioning
   (why questions ask the child to reason about what they can see). Slips it targets: answering a why question with a
   place or a thing; a 'because' that gives no reason ('because it is', 'because I said so'); the reason said the wrong
   way round (the result after because); a reason that does not fit the clues. */
const BEC=(()=>{
/* step 1: which answer fits a why question; k = kind of answer */
const ASK=[{q:'Why is the dog wet?',e:'\u{1F415}',s:'\u{1F4A6}',a:[['Because it jumped in the pond','why'],['In the garden','where'],['A red ball','what']]},
 {q:'Why is Sam yawning?',e:'\u{1F971}',s:'\u{1F319}',a:[['On the sofa','where'],['Because he went to bed late','why'],['His teddy','what']]},
 {q:'Why has Gran got an umbrella?',e:'\u{1F475}',s:'\u{1F327}\uFE0F',a:[['A blue one','what'],['At the bus stop','where'],['Because it is raining','why']]}];
const KIND_SAY={where:'That tells WHERE. A why question wants a reason. Listen for because.',what:'That tells WHAT. A why question wants a reason. Start with because.'};
/* step 2: drag the cause into the because gap; ok = index of the real cause */
const CAUSE=[{fx:'The ice cream melted',e:'\u{1F366}',c:[['the sun was hot','\u2600\uFE0F'],['it was yummy','\u{1F60B}'],['it was pink','\u{1F338}']],ok:0,
  no:['','Being yummy does not make ice cream melt. Heat does.','Its colour does not melt it. What made it warm?']},
 {fx:'The kite flew up high',e:'\u{1FA81}',c:[['it was Monday','\u{1F4C5}'],['the wind blew','\u{1F32C}\uFE0F'],['it had a tail','\u{1F9F5}']],ok:1,
  no:['The day does not lift a kite. What pushed it up?','','A tail helps it stay straight, but it does not lift it. What pushed it?']},
 {fx:'The tower fell down',e:'\u{1F9F1}',c:[['it was tall','\u{1F4CF}'],['it was red','\u{1F534}'],['the cat bumped it','\u{1F408}']],ok:2,
  no:['Being tall did not knock it. Something bumped it.','Colour does not knock a tower down. Who bumped it?','']},
 {fx:'The flower drooped',e:'\u{1F940}',c:[['it had no water','\u{1F4A7}'],['it was in a pot','\u{1FAB4}'],['a bee looked at it','\u{1F41D}']],ok:0,
  no:['','Lots of pot plants stand up tall. What did it need?','A bee looking cannot make a flower droop. What did it need?']}];
/* step 3: is it a real reason? q is the question; r 1 = real reason */
const SORTQ='Why is the floor wet?';
const SORT=[{t:'Because I spilled my drink',r:1,e:'\u{1F964}'},{t:'Because it is',r:0,e:'\u{1F937}'},{t:'Because the bath ran over',r:1,e:'\u{1F6C1}'},
 {t:'Because I said so',r:0,e:'\u{1F5E3}\uFE0F'},{t:'Because Dad mopped it',r:1,e:'\u{1F9F9}'},{t:'Because it just did',r:0,e:'\u{1F914}'}];
const SORT_WHY=['A real reason says what MADE the floor wet.','"Because it is" does not say what made it wet. That is not a reason.'];
/* step 4: right way round; fx = what happened, cz = the reason (goes after because) */
const ROUND=[{fx:'There is a puddle',cz:'it rained',e:['\u{1F327}\uFE0F','\u{1F4A7}'],silly:'"It rained because there is a puddle"? No! A puddle cannot make rain.'},
 {fx:'I am full',cz:'I ate my lunch',e:['\u{1F96A}','\u{1F60C}'],silly:'"I ate my lunch because I am full"? Being full comes after eating.'},
 {fx:'The snowman melted',cz:'the sun came out',e:['\u2600\uFE0F','\u{1F4A7}'],silly:'"The sun came out because the snowman melted"? A snowman cannot make the sun come out.'},
 {fx:'The baby is crying',cz:'she is hungry',e:['\u{1F37C}','\u{1F476}'],silly:'"She is hungry because the baby is crying"? Hunger comes first, then the crying.'}];
/* step 5: clue detective; tap the clue in the picture, then the reason fits it */
const CLUE=[{q:'Why might Mia be crying?',e:'\u{1F62D}',spots:[['\u{1FA79}','A plaster on her knee',1],['\u{1F333}','A tree',0],['\u{1F426}','A bird',0],['\u{1F6B2}','A bike',0]],
  a:'Mia might be crying because she hurt her knee.',no:'Look for something that shows she is hurt.'},
 {q:'Why might the dog be muddy?',e:'\u{1F415}',spots:[['\u2601\uFE0F','A cloud',0],['\u{1F43E}','Muddy paw prints from a puddle',1],['\u{1F33C}','A flower',0],['\u{1F9B4}','A bone',0]],
  a:'The dog might be muddy because it ran through the muddy puddle.',no:'Look for something that shows where the mud came from.'},
 {q:'Why might the cake be gone?',e:'\u{1F37D}\uFE0F',spots:[['\u{1F4DA}','A book',0],['\u{1F45F}','A shoe',0],['\u{1F9D4}','Crumbs on Dad\u2019s beard',1],['\u{1FA91}','A chair',0]],
  a:'The cake might be gone because Dad ate it. Look at the crumbs!',no:'Look for something that shows who ate it.'}];
const DESC=['A picture and a why question with three answer cards. Tap the answer that gives a reason.',
 'Something happened. Drag the picture that made it happen into the because gap, or tap a button.',
 'Why is the floor wet? Six answers. Drag each into Real reason or Not a reason, or tap a button.',
 'Two halves of a sentence. Tap the half that is the reason, so it goes after because.',
 'A picture with clues. Tap the clue that tells you why, and the reason appears.'];
const TXT=['A why question wants a reason. Start your answer with because.','After because, say what made it happen.',
 '"Because it is" is not a reason. A reason says what made it happen.','The reason goes after because: the puddle is there because it rained.',
 'Look for clues. They help you say why something might have happened.'];
const DONE=['Why wants a reason. Where tells a place and what tells a thing, but because tells why.',
 'The sun made the ice cream melt, the wind lifted the kite, the cat bumped the tower and no water made the flower droop.',
 'A real reason says what made it happen. "Because it is" and "because I said so" do not.',
 'First the reason happens, then the thing it makes. The reason goes after because.',
 'Clues helped you think why. Use what you can see, then say because.'];
const QS=[{q:'Why is the grass wet?',a:'Because it rained',o:[['In the park','where'],['The green grass','what']]},
 {q:'Ben says the window broke "because it did". Is that a reason?',a:'No, it does not say what broke it',o:[['Yes, it has because in it','non'],['Yes, it is a good reason','non']]},
 {q:'Which one is the right way round?',a:'I put on my coat because it was cold',o:[['It was cold because I put on my coat','flip'],['My coat because cold','flip']]},
 {q:'Why did the ice lolly drip?',a:'Because it got warm',o:[['Because it was orange','fit'],['Because it was on a stick','fit']]},
 {q:'Which word starts the answer to a why question?',a:'Because',o:[['Where','what'],['Yes','what']]},
 {q:'Muddy boots are by the door. Why might Sam\u2019s boots be muddy?',a:'He walked in the mud',o:[['He likes red','fit'],['It is Tuesday','fit']]},
 {q:'Which one is the right way round?',a:'The baby is asleep because she is tired',o:[['She is tired because the baby is asleep','flip'],['Tired because asleep the baby','flip']]},
 {q:'Mia says "Because I said so." Is that a reason?',a:'No, it does not say what made it happen',o:[['Yes, it starts with because','non'],['Yes, Mia is the boss','non']]}];
/* ---------- drawings ---------- */
const DARK_INK='#f1f5f9',INK='#0f172a',GOOD='#047857',BAD='#b91c1c',LINE='#64748b',BLUE='#1d4ed8',FONT='px system-ui,sans-serif';
function emo(g,ch,x,y,size){g.font=`${Math.round(size)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
function round(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const words=String(text).split(' '),rows=[];let line='';
 for(const w of words){const test=line?line+' '+w:w;if(line&&g.measureText(test).width>maxW){rows.push(line);line=w}else line=test}if(line)rows.push(line);return rows}
/* a speech bubble that holds the why question */
function bubble(g,r,text,dark){g.fillStyle=dark?'#1e3a5f':'#eff6ff';round(g,r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=BLUE;g.lineWidth=2;g.stroke();
 g.beginPath();g.moveTo(r.x+28,r.y+r.h);g.lineTo(r.x+20,r.y+r.h+14);g.lineTo(r.x+44,r.y+r.h);g.closePath();g.fillStyle=dark?'#1e3a5f':'#eff6ff';g.fill();
 const f=`800 18${FONT}`,rows=wrap(g,text,r.w-24,f);g.fillStyle=dark?DARK_INK:INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*22))}
/* a sentence strip: [what happened] because [gap] */
function strip(g,r,left,right,o){o=o||{};g.fillStyle=o.dark?'#0f172a':'#fffbeb';round(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=o.ok?GOOD:o.no?BAD:'#b45309';g.lineWidth=o.ok||o.no?4:2;g.stroke();
 const f=`800 17${FONT}`,txt=`${left} because ${right||'______'}.`,rows=wrap(g,txt,r.w-20,f);g.fillStyle=o.dark?DARK_INK:INK;g.textAlign='center';g.textBaseline='middle';
 rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*21))}
/* a big answer card with an optional picture on top */
function card(g,r,label,o){o=o||{};g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';round(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=o.no?BAD:o.ok?GOOD:o.sel?BLUE:LINE;g.lineWidth=o.no||o.ok||o.sel?4:1.8;g.stroke();
 const hasPic=!!o.pic,top=hasPic?r.y+r.h*.36:r.y+r.h/2;if(hasPic)emo(g,o.pic,r.x+r.w/2,r.y+r.h*.3,Math.min(r.h*.36,40));
 if(!label)return;let n=o.n||17,rows;for(;;){rows=wrap(g,label,r.w-14,`800 ${n}${FONT}`);if(rows.length*n*1.2<=(hasPic?r.h*.5:r.h-8)||n<=12)break;n--}
 g.font=`800 ${n}${FONT}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const cy=hasPic?r.y+r.h*.72:top;rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,cy+(i-(rows.length-1)/2)*n*1.2))}
/* the top banner: instruction, then the last feedback line in green or red */
function head(A,text,tone,note,bad){const g=A.ctx,dk=A.col.dark,sz=A.narrow?17:18,f=`800 ${sz}${FONT}`,rows=wrap(g,text,A.W-36,f),lh=sz*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?GOOD:tone==='no'?BAD:LINE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?DARK_INK:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(note){const f2=`700 ${sz-2}${FONT}`,r2=wrap(g,note,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':BAD):(dk?'#86efac':GOOD);r2.forEach((t,i)=>g.fillText(t,18,y+i*(sz-2)*1.3));y+=r2.length*(sz-2)*1.3+6}return y}
/* an arrow from the reason to what it made happen */
function arrow(g,x0,y,x1,dark){g.strokeStyle=dark?'#fbbf24':'#b45309';g.lineWidth=5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1-14,y);g.stroke();g.fillStyle=g.strokeStyle;g.beginPath();g.moveTo(x1,y);g.lineTo(x1-16,y-10);g.lineTo(x1-16,y+10);g.closePath();g.fill()}
return{ASK,KIND_SAY,CAUSE,SORTQ,SORT,SORT_WHY,ROUND,CLUE,DESC,TXT,DONE,QS,emo,round,wrap,bubble,strip,card,head,arrow,INK,DARK_INK}})();
