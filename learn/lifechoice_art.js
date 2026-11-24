/* Data and drawings for flaglifechoice (Healthy lifestyle choices; ages 9-11; England NC Year 6 Animals including
   humans 'recognise the impact of diet, exercise, drugs and lifestyle on the way their bodies function').
   Sources: UK Chief Medical Officers' Physical Activity Guidelines 2019 (5-18 year olds: an average of at least
   60 minutes of moderate-to-vigorous activity a day across the week); NHS 'Exercise' talk test (moderate: you can
   talk but not sing; vigorous: you cannot say more than a few words); NHS 'Sugar: the facts' and Change4Life (free
   sugars: no more than 19 g a day at 4-6, 24 g at 7-10 and 30 g from 11; sugar in whole fruit and in milk is not free
   sugar; juice and smoothies at most 150 ml a day; a 330 ml can of cola has about 35 g); Oral Health Foundation
   (each time we have sugar, teeth are under acid attack for up to an hour, so how often matters more than how much);
   British Heart Foundation (regular exercise strengthens the heart so it pumps more blood with each beat and the
   resting heart rate falls); NHS and ASH (tobacco smoke carries carbon monoxide, which takes the place of oxygen in
   red blood cells (about 210 times more tightly than oxygen, Blumenthal 2001; smokers' blood 3-10% carbon monoxide haemoglobin, up to 15% in heavy smokers, RIVM), and tar, which clogs the lungs). Heart-rate numbers are example values for a 10-year-old. */
const LIFE=(()=>{
/* step 1: heart at work */
const REST=84,PEAK=120,CALM=100;
/* step 2: a trained heart, 4 fortnights of daily activity; beats a minute x millilitres a beat stays about 4.2 litres */
const TRAIN=[{hr:84,ml:50},{hr:82,ml:51},{hr:80,ml:53},{hr:79,ml:53},{hr:78,ml:54}];
/* step 3: activity cards, minutes, and whether they count (moderate or vigorous) */
const ACT=[{t:'Walk to school',m:15,ok:1,why:'Brisk walking: you can talk but not sing.'},
 {t:'Video game',m:40,ok:0,why:'Sitting still is not active time, even when the game is exciting.'},
 {t:'Playground tag',m:15,ok:1,why:'Running about makes you puff: that is vigorous.'},
 {t:'TV show',m:30,ok:0,why:'Watching TV is sitting time, not active time.'},
 {t:'Bike ride',m:20,ok:1,why:'Cycling makes your heart beat faster.'},
 {t:'Dancing',m:10,ok:1,why:'Dancing gets you out of breath.'}];
/* step 4: free sugar per item in grams; limit for ages 7-10 */
const LIMIT=24;
const FOOD=[{t:'Water',g:0},{t:'Can of cola',g:35},{t:'Apple',g:0,fruit:1},{t:'Chocolate bar',g:25},{t:'Orange juice, 150 ml',g:13},{t:'2 chocolate biscuits',g:10},{t:'Glass of milk',g:0,milk:1}];
/* step 5: an 8-slot school day for sweets */
const SLOTS=['9 am','10 am','11 am','Lunch','1 pm','2 pm','3 pm','4 pm'],LUNCH=3,SWEETS=4;
/* step 6: blood cells; in smoky air carbon monoxide takes 1 of the 10 seats (smokers 3-10%, RIVM) */
const CELLS=10,CO=[3];
const DESC=['A heart with its beats a minute and breaths a minute, and two big buttons: Run on the spot, and Sit and rest.',
 'A resting heart and a calendar of 8 weeks in 4 blocks of 2 weeks. Tap a block to add 2 weeks of being active every day.',
 'A day with active minutes so far, and six activity cards. Tap the ones that make you puff to reach 60 minutes.',
 'A sugar meter for the day, up to 24 grams, and seven food and drink cards. Choose 4 without going over.',
 'A school day in 8 time slots. Tap a slot to eat one of 4 sweets then, and watch how long teeth are under acid attack.',
 'Ten red blood cells, each with a seat for oxygen. Breathe clean air, then smoky air, and count the oxygen carried.'];
const TXT=['Muscles that work hard need more oxygen. Watch what your heart and lungs do about it.',
 'Being active most days changes the heart itself.',
 'Children need at least 60 active minutes a day on average. What counts?',
 'Free sugar is sugar added to food, plus the sugar in juice, honey and syrup. Age 7 to 10: no more than 24 g a day.',
 'Each time you have sugar, mouth germs make acid that attacks your teeth for up to an hour.',
 'Smoke carries carbon monoxide. It sits in the seats where oxygen should ride.'];
const DONE=['Your heart sped up to send more oxygen to your muscles, then slowed down again when you rested.',
 'After 8 active weeks each beat pumps more blood, so the heart needs fewer beats at rest: 84 dropped to 78.',
 '60 active minutes, built from short bursts. Sitting games and TV did not count.',
 'Four choices under 24 g. Water, milk and whole fruit add no free sugar.',
 'All 4 sweets at lunch: one acid attack of up to an hour, not four.',
 'Smoky air: carbon monoxide took 1 seat in 10 and would not let go, so less oxygen reached the body.'];
const QS=[{q:'What happens to your heart rate when you run?',a:'It goes up, to send more oxygen to the muscles',o:[['It goes down, to save energy','up'],['It stays the same','up']]},
 {q:'Someone is active every day for months. What happens to their resting heart rate?',a:'It goes down a little',o:[['It goes up, because the heart is worn out','worn'],['It stops changing at all','worn']]},
 {q:'Which of these counts towards your 60 active minutes?',a:'A 15-minute bike ride to the park',o:[['An hour of an exciting video game','sit'],['A long film at the cinema','sit']]},
 {q:'Do your 60 active minutes have to be done all in one go?',a:'No, short bursts add up',o:[['Yes, or none of it counts','once'],['Yes, and only in a PE lesson','once']]},
 {q:'Which has free sugar that counts towards your 24 g?',a:'A glass of orange juice',o:[['A whole apple','fruit'],['A glass of plain milk','fruit']]},
 {q:'A 330 ml can of cola has about 35 g of sugar. For a 9-year-old, that is…',a:'more than a whole day’s 24 g',o:[['fine, because it is a drink','juice'],['about a quarter of the day’s limit','juice']]},
 {q:'Four sweets: which plan is kinder to your teeth?',a:'Eat all four with lunch',o:[['One every hour, so less at a time','graze'],['One every two hours','graze']]},
 {q:'Smoking harms…',a:'the lungs, the heart and the blood',o:[['only the lungs','lungs'],['only people who smoke a lot','lungs']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function heart(g,x,y,s,col){g.save();g.translate(x,y);g.scale(s/100,s/100);g.beginPath();g.moveTo(0,30);
 g.bezierCurveTo(-55,-5,-45,-55,0,-28);g.bezierCurveTo(45,-55,55,-5,0,30);g.closePath();g.fillStyle=col||'#dc2626';g.fill();g.lineWidth=4;g.strokeStyle='#7f1d1d';g.stroke();g.restore()}
function lungs(g,x,y,s,fill){g.save();g.translate(x,y);g.fillStyle=fill?'#fca5a5':'#fecdd3';g.strokeStyle='#9f1239';g.lineWidth=2;
 [[-1],[1]].forEach(([k])=>{g.beginPath();g.ellipse(k*s*.28,s*.05,s*.22,s*.4,0,0,7);g.fill();g.stroke()});g.fillStyle='#9f1239';g.fillRect(-s*.03,-s*.5,s*.06,s*.35);g.restore()}
function cell(g,x,y,r,seat){g.beginPath();g.arc(x,y,r,0,7);g.fillStyle='#ef4444';g.fill();g.lineWidth=2;g.strokeStyle='#7f1d1d';g.stroke();
 g.beginPath();g.arc(x,y,r*.45,0,7);g.fillStyle='#fca5a5';g.fill();
 if(seat){g.beginPath();g.arc(x+r*.75,y-r*.75,r*.42,0,7);g.fillStyle=seat==='O'?'#38bdf8':'#475569';g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();
  g.font=`800 ${Math.round(r*.45)}${F}`;g.fillStyle=seat==='O'?INK:'#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(seat==='O'?'O₂':'CO',x+r*.75,y-r*.75)}}
function tooth(g,x,y,s,acid){g.save();g.translate(x,y);g.beginPath();g.moveTo(-s*.4,-s*.4);g.quadraticCurveTo(0,-s*.6,s*.4,-s*.4);g.lineTo(s*.32,s*.1);g.lineTo(s*.2,s*.5);g.lineTo(0,s*.15);g.lineTo(-s*.2,s*.5);g.lineTo(-s*.32,s*.1);g.closePath();
 g.fillStyle=acid?'#fef3c7':'#ffffff';g.fill();g.lineWidth=2;g.strokeStyle=acid?'#b45309':RIM;g.stroke();g.restore()}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=wrap(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#f1f5f9':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||15),L;for(;;){L=wrap(word,r.w-10,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-4||n<=11)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function meter(x,y,w,h,v,max,col,mark){const c=g();c.fillStyle=dk()?'#334155':'#e2e8f0';A.paint.rrect(x,y,w,h,h/2);c.fill();c.fillStyle=col;A.paint.rrect(x,y,Math.max(h,w*Math.min(1,v/max)),h,h/2);c.fill();
  if(mark!=null){const mx=x+w*mark/max;c.strokeStyle=fg();c.lineWidth=3;c.beginPath();c.moveTo(mx,y-4);c.lineTo(mx,y+h+4);c.stroke()}}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,card,meter,text,sz,fg,dk,INK,F}}
return{REST,PEAK,CALM,TRAIN,ACT,LIMIT,FOOD,SLOTS,LUNCH,SWEETS,CELLS,CO,DESC,TXT,DONE,QS,heart,lungs,cell,tooth,PEN}})();
