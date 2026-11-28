/* Data and drawings for flagmult10 (The multiples of 10; Mathematics, Number and place value, ages 6-7).
   Sources: Common Core 1.NBT.B.2a and 2c ('10 can be thought of as a bundle of ten ones, called a ten'; 'the numbers
   10, 20, 30, 40, 50, 60, 70, 80, 90 refer to one, two, three, four, five, six, seven, eight, or nine tens (and 0 ones)');
   National Curriculum in England (2013) Year 1 'count in multiples of twos, fives and tens' and Year 2 'recognise the
   place value of each digit in a two-digit number (tens, ones)'; NCETM Mastery PD Number, Place value (bundling straws,
   zero as a placeholder). Slips it targets: counting the sticks instead of the bundles (50 has '50 tens'); writing
   6 tens as 6 (dropping the placeholder 0); hearing sixty as sixteen (-ty and -teen); counting on by ones instead of
   tens (20, 21); and thinking the 0 in 90 means 'nothing at all'. */
const MTN=(()=>{
/* step 1: tie loose sticks into bundles of 10; step 2: put 6 bundles on the mat */
const LOOSE=30,BUILD=6;
/* step 3: write the number for the bundles with two digit boxes */
const ROUNDS=[4,7];
/* step 4: match each number word to its picture (t = tens, o = ones) */
const WORDS=[{w:'sixty',t:6,o:0},{w:'sixteen',t:1,o:6},{w:'forty',t:4,o:0},{w:'fourteen',t:1,o:4}];
const PICS=[{t:1,o:6},{t:6,o:0},{t:1,o:4},{t:4,o:0}];
const wordNo=(W,P)=>W.t===1?`${W.w[0].toUpperCase()+W.w.slice(1)} is a -teen number: 1 ten and ${W.o} ones, ${10+W.o}. This picture is ${P.t} tens and ${P.o} ones.`
 :`${W.w[0].toUpperCase()+W.w.slice(1)} ends in -ty, so it means ${W.t} tens: ${W.t*10}. This picture is ${P.t*10+P.o}.`;
/* step 5: jump along a track in tens. At each stop three tiles: the next ten and two slips */
const next=n=>{const t=n+10;return[[t,'ok'],[n+1,'ones'],[n===0?100:t/10,n===0?'big':'zero']]};
const DESC=['A pile of 30 loose sticks and a rubber band. Drag a stick into the band, or press Put a stick in the band. 10 sticks make a bundle called a ten.',
 'A mat and a tray with a bundle of 10 sticks and a single stick. Drag bundles onto the mat, or press the buttons, to show 60.',
 'Bundles of 10 and a number card with a Tens box and a Ones box. Drag a digit tile into each box, or tap a tile and then a box, to write the number.',
 'Four pictures of bundles and sticks and four number words. Drag each word onto its picture, or tap a word and then a picture.',
 'A number track from 0 to 100. A frog sits on 0. Tap the number the frog lands on when it jumps 10 more.'];
const TXT=['10 ones can be tied into 1 bundle. We call the bundle a ten. Count the bundles, not the sticks.',
 'Each bundle is 1 ten. 6 bundles is 6 tens. We write it as 60 and say sixty.',
 'The 0 sits in the ones place. It says no loose ones. Without it, 4 tens would read as 4.',
 'Number words that end in -ty mean tens. Sixty is 6 tens. Words that end in -teen have just 1 ten. Sixteen is 1 ten and 6 ones.',
 'Count in tens: 10, 20, 30. Each jump adds 1 ten. Only the tens digit goes up. The ones digit stays 0.'];
const DONE=['30 sticks make 3 bundles. 3 tens and 0 ones is 30.','6 tens and 0 ones is 60.',
 '4 tens is 40 and 7 tens is 70. The 0 keeps the tens digit in the tens place.','Sixty is 60 and forty is 40. Sixteen is 16 and fourteen is 14.',
 '10, 20, 30, 40, 50, 60, 70, 80, 90, 100. 10 tens make 100.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'What number is 8 tens and 0 ones?',a:'80',o:[['8','zero'],['18','teen']]},
 {q:'How many tens are in 50?',a:'5',o:[['50','count'],['0','place']]},
 {q:'Which number is sixty?',a:'60',o:[['16','teen'],['6','zero']]},
 {q:'Count in tens. 30, 40, 50, what comes next?',a:'60',o:[['51','ones'],['70','skip']]},
 {q:'Mia has 7 bundles of 10 straws. How many straws is that?',a:'70',o:[['17','teen'],['7','zero']]},
 {q:'In 90, what does the 0 tell you?',a:'There are no ones',o:[['There is nothing at all','none'],['There are no tens','place']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
const WOOD=['#d97706','#92400e'],BAND='#dc2626';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function tile(g,r,label,st,size,dk){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':(dk?'#f8fafc':'#ffffff');rr(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:2;g.stroke();
 let n=size||22,rows;do{rows=wrap(g,label,r.w-10,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-6)break;n--}while(n>12);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function banner(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?17:19,f=`800 ${s}${F}`,rows=wrap(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=wrap(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* one stick: w wide, h tall, top-left at x, y */
function stick(g,x,y,w,h,dk){g.fillStyle=WOOD[0];rr(g,x,y,w,h,w/2);g.fill();g.strokeStyle=dk?'#fde68a':WOOD[1];g.lineWidth=1.2;g.stroke()}
/* a bundle of 10 sticks tied with a red band, centred at cx, top at y */
function bundle(g,cx,y,w,h,dk){const s=w/10;for(let i=0;i<10;i++)stick(g,cx-w/2+i*s,y,s*.82,h,dk);
 g.fillStyle=BAND;g.fillRect(cx-w/2-2,y+h*.44,w+2,h*.12);g.strokeStyle=dk?'#fecaca':'#7f1d1d';g.lineWidth=1.2;g.strokeRect(cx-w/2-2,y+h*.44,w+2,h*.12)}
/* bundles and loose ones side by side inside a box r */
function group(g,r,t,o,dk){const bw=Math.min(34,(r.w-20-5*t)/(t+o*.4+.3)),bh=Math.min(r.h-12,bw*2.2);let x=r.x+8+bw/2;
 for(let i=0;i<t;i++){bundle(g,x,r.y+(r.h-bh)/2,bw,bh,dk);x+=bw+5}x+=4-bw/2;for(let i=0;i<o;i++){stick(g,x,r.y+(r.h-bh)/2,bw*.1+2,bh,dk);x+=bw*.4}}
function frog(g,x,y,s){g.fillStyle='#16a34a';g.beginPath();g.ellipse(x,y,s,s*.75,0,0,7);g.fill();g.fillStyle='#ffffff';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.45,y-s*.6,s*.32,0,7);g.fill()});
 g.fillStyle='#0f172a';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.45,y-s*.6,s*.15,0,7);g.fill()});g.strokeStyle='#14532d';g.lineWidth=2;g.beginPath();g.arc(x,y-s*.05,s*.4,.2,Math.PI-.2);g.stroke()}
return{LOOSE,BUILD,ROUNDS,WORDS,PICS,wordNo,next,DESC,TXT,DONE,QS,INK,LIGHT,OK,NO,EDGE,SEL,F,rr,wrap,tile,banner,stick,bundle,group,frog}})();
