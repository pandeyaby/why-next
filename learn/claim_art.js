/* Data and pictures for flagclaim (always, sometimes or never? testing a maths claim; ages 7-8). Sources: DfE National
   Curriculum in England: mathematics programmes of study (2013), aim 'reason mathematically by following a line of enquiry,
   conjecturing relationships and generalisations, and developing an argument, justification or proof'; Common Core
   Standards for Mathematical Practice MP3 'Construct viable arguments and critique the reasoning of others'; Bills, Bills,
   Watson and Mason (2004), Thinking Things Through (ATM), always / sometimes / never statements; Healy and Hoyles (2000),
   'A study of proof conceptions in algebra', JRME 31(4): 396-428 (pupils often take a few checked examples as proof);
   Stylianides (2007), 'Proof and proving in school mathematics', JRME 38(3): 289-321 (a counterexample disproves a
   general claim; a reason, such as pairing, covers every case); Brown and Burton (1978), 'Diagnostic models for procedural
   bugs in basic mathematical skills', Cognitive Science 2: 155-192 (smaller-from-larger subtraction bug, dropped carries).
   Slips it targets: testing with numbers the claim is not about; taking a few examples as proof; calling a counterexample
   'just an exception'; calling a claim 'never' after one counterexample; dropped carries; smaller-from-larger. */
const CLAIM=(()=>{
/* step 1: test 'odd + odd makes an even number' with your own pairs */
const NUMS=[1,2,3,4,5,6,7,8,9];
/* step 2: find the example that breaks each claim. k = index of the counterexample */
const BREAK=[{c:'Adding three numbers gives an odd answer.',ex:['1 + 1 + 1 = 3','3 + 5 + 7 = 15','1 + 3 + 5 = 9','2 + 2 + 2 = 6'],k:3},
 {c:'Adding two numbers always gives an odd answer.',ex:['2 + 3 = 5','4 + 1 = 5','3 + 3 = 6','6 + 5 = 11'],k:2},
 {c:'Adding always makes a number bigger.',ex:['4 + 3 = 7','10 + 5 = 15','6 + 0 = 6','7 + 1 = 8'],k:2}];
/* step 3: join two cube towers. a, b = the numbers; the answer is even when nothing is left over */
const JOIN=[{a:4,b:6},{a:4,b:5},{a:5,b:7}];
/* step 4: spot the slip. top, bot, op, wrong answer, right answer, bad column (0 hundreds, 1 tens, 2 ones) and why */
const SLIP=[{t:247,b:135,op:'+',w:372,r:382,col:1,why:'7 + 5 = 12, so 1 ten was carried. The tens should be 4 + 3 + 1 = 8, not 7.'},
 {t:463,b:275,op:'+',w:638,r:738,col:0,why:'6 tens + 7 tens = 13 tens, so 1 hundred was carried. The hundreds should be 4 + 2 + 1 = 7.'},
 {t:352,b:127,op:'−',w:235,r:225,col:2,why:'2 − 7 cannot be done, so take 1 ten: 12 − 7 = 5. Taking 2 from 7 instead is the slip.'}];
const COLS=['hundreds','tens','ones'];
/* step 5: always (0), sometimes (1) or never (2)? */
const ASN=[{t:'An odd number add 1 makes an even number.',z:0,why:'The one left over gets a partner, so it is always even.'},
 {t:'Odd + odd makes an odd number.',z:2,why:'The two left-over ones always make a pair, so the answer is never odd.'},
 {t:'Half of a number is a whole number.',z:1,why:'Half of 8 is 4, but half of 7 is 3 and a half. So only sometimes.'},
 {t:'Taking away makes a number smaller.',z:1,why:'9 − 4 = 5 is smaller, but 9 − 0 = 9 is not. So only sometimes.'},
 {t:'Adding 10 changes the ones digit.',z:2,why:'Adding 10 only changes the tens: 23 + 10 = 33. The ones never change.'},
 {t:'A number ending in 0 is in the 10 times table.',z:0,why:'Every number ending in 0 is a whole number of tens, so always.'}];
const BINS=['Always','Sometimes','Never'];
const DESC=['The claim: odd + odd makes an even number. Nine number tiles, 1 to 9. Tap two odd numbers to test the claim; each test is written below.',
 'A claim and four examples. Tap the example that breaks the claim: the counterexample.',
 'Two towers of cubes in pairs. An odd number has one cube left over at the top. Drag the right tower onto the left one, or press Join, then say if the total is even or odd.',
 'A worked sum with a mistake in it. Tap the column with the slip: hundreds, tens or ones.',
 'A maths claim and three boxes: Always, Sometimes and Never. Drag the claim to a box, or use the buttons.'];
const TXT=['A claim is a sentence that says something is true. Test it with examples that fit it.','One example that breaks a claim is a counterexample. Then the claim is not always true.','Why is odd + odd always even? Join the cube towers and look at the left-over cubes.','Spot the slip. Check each column of the sum.','Always, sometimes or never? Test, then decide.'];
const DONE=['Every test gave an even answer. That is good evidence, but examples cannot check every number. Step 3 finds the reason.',
 'One counterexample is enough: the claim is not always true. It can still be true sometimes.',
 'Even + even and odd + odd are always even: the left-over ones make a pair. Even + odd always leaves one over, so it is odd.',
 'Check each column: carried tens and hundreds must be added, and in take-away you cannot just swap the digits round.',
 'Always: no counterexample can exist, and you can say why. Sometimes: some examples work and some do not. Never: none work.'];
const QS=[{q:'Ella tried 5 examples of a claim and all of them worked. What can she say?',a:'It might be always true: she needs a reason why',o:[['It is always true','examples'],['It is never true','never']]},
 {q:'A claim worked for 9 examples but failed for 1. Is it always true?',a:'No: one counterexample shows it is not always true',o:[['Yes: 9 out of 10 is enough','exception'],['No: it is never true','never']]},
 {q:'"Half of a number is a whole number." Always, sometimes or never?',a:'Sometimes',o:[['Always','examples'],['Never','never']]},
 {q:'Why is odd + odd always even?',a:'The two left-over ones make a pair',o:[['Because 3 + 5 = 8','examples'],['Because odd numbers are big','myth']]},
 {q:'Sam wrote 247 + 135 = 372. What went wrong?',a:'He did not add the ten he carried',o:[['He added the ones wrong','wrongcol'],['Nothing: it is right','check']]},
 {q:'Mo wrote 352 − 127 = 235. What went wrong?',a:'In the ones he did 7 − 2, not 12 − 7',o:[['He forgot to carry a ten','wrongcol'],['Nothing: it is right','check']]},
 {q:'To test "odd + odd makes an even number", which pair is a fair test?',a:'3 + 7',o:[['2 + 4','cond'],['3 + 4','cond']]}];
/* canvas helpers */
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function lines(t,max,font){const c=g();c.font=font;const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&c.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
 /* the banner along the top, with the latest feedback under it; returns the y where the scene can start */
 function head(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=lines(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=lines(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 /* a card: white fill so dark ink always contrasts, red when wrong, green when right, blue when picked */
 function card(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(t==null||t==='')return;let n=sz(o.n||15),L;
  for(;;){L=lines(t,r.w-14,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-8||n<=10)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 /* a tower of cubes stacked in pairs (two columns); an odd number has one cube alone on top */
 function tower(x,yb,n,u,col,mark){const c=g(),pairs=Math.floor(n/2);for(let i=0;i<n;i++){const row=Math.floor(i/2),side=i%2,cx=x+side*u,cy=yb-(row+1)*u;
   c.fillStyle=(mark&&n%2&&i===n-1)?'#f59e0b':col;c.fillRect(cx+1,cy+1,u-2,u-2);c.strokeStyle='#1e293b';c.lineWidth=1.5;c.strokeRect(cx+1,cy+1,u-2,u-2)}
  return{x,y:yb-Math.ceil(n/2)*u,w:2*u,h:Math.ceil(n/2)*u,pairs,left:n%2}}
 /* a written column sum: top, bottom and the answer under a line, with three tappable columns */
 function sum(r,s,mark){const c=g(),cw=r.w/4,fs=Math.min(sz(30),r.h/4.2),rows=[String(s.t),String(s.b),String(s.w)],out=[];
  for(let k=0;k<3;k++){const q={k,x:r.x+cw*(k+1),y:r.y,w:cw,h:r.h};out.push(q);c.fillStyle=mark.bad===k?'#fee2e2':mark.ok===k?'#dcfce7':(dk()?'#1e293b':'#f8fafc');c.fillRect(q.x+2,q.y,q.w-4,q.h);
   c.strokeStyle=mark.bad===k?NO:mark.ok===k?OK:RIM;c.lineWidth=mark.bad===k||mark.ok===k?3:1;c.strokeRect(q.x+2,q.y,q.w-4,q.h)}
  c.font=`800 ${fs}px ui-monospace,monospace`;c.textAlign='center';c.textBaseline='middle';
  rows.forEach((d,j)=>{const y=r.y+r.h*(.2+j*.3);for(let k=0;k<3;k++){const q=out[k];c.fillStyle=(mark.bad===k||mark.ok===k)?INK:fg();c.fillText(d[k],q.x+q.w/2,y)}});
  c.fillStyle=fg();c.fillText(s.op,r.x+cw/2,r.y+r.h*.5);c.strokeStyle=fg();c.lineWidth=3;c.beginPath();c.moveTo(r.x+cw*.6,r.y+r.h*.65);c.lineTo(r.x+r.w,r.y+r.h*.65);c.stroke();
  c.font=`700 ${sz(12)}${F}`;c.fillStyle=fg();['H','T','O'].forEach((l,k)=>c.fillText(l,out[k].x+out[k].w/2,r.y+11));return out}
 return{lines,head,card,tower,sum,sz,fg,dk,INK,OK,NO,RIM,F}}
return{NUMS,BREAK,JOIN,SLIP,COLS,ASN,BINS,DESC,TXT,DONE,QS,PEN}})();
