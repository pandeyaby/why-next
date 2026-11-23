/* Data and pictures for flagsignrule (multiplying and dividing negative numbers; ages 11-13). Sources: DfE National
   Curriculum 2013 KS3 Mathematics ('use the four operations ... applied to integers ... both positive and negative');
   CCSS 7.NS.2a-c (products of signed numbers follow from the distributive property, (-1)(-1) = 1; integers can be
   divided when the divisor is not zero, and -(p/q) = (-p)/q = p/(-q)); Hart (ed.) 1981, Children's Understanding of
   Mathematics 11-16 (CSMS directed numbers); Vlassis 2004, 'Making sense of the minus sign or becoming flexible in
   negativity', Learning and Instruction 14: 469-484; Gallardo 2002, Educational Studies in Mathematics 49: 171-192.
   Slips it targets: 'two negatives make a positive' carried over to adding (-3 + -4 = 7); negative x negative =
   negative; a mixed-sign product made positive; the sign dropped when dividing; and counting negatives wrongly
   when there are three or more. */
const SIGNRULE=(()=>{
/* step 1: a x b as a jumps of b from 0; pick where it lands */
const JUMP=[{a:3,b:4,o:[12,-12,7]},{a:3,b:-4,o:[-12,12,-1]},{a:2,b:-5,o:[10,-10,-3]},{a:4,b:-3,o:[-7,-12,12]}];
/* step 2: keep the pattern going: a x (-3) for a = 3 .. -3 */
const PAT_B=-3,PAT_A=[3,2,1,0,-1,-2,-3],PAT_OPEN=4;
/* step 3: turn around. Drag the multiplier a (-4..4) so that a x b hits the target */
const TURN=[{b:4,t:-12},{b:-2,t:8},{b:-2,t:-6},{b:3,t:-9}];
/* step 4: the sign grid, filled one cell at a time with an example */
const GRID=[{a:3,b:2},{a:3,b:-2},{a:-3,b:2},{a:-3,b:-2}];
/* step 5: dividing undoes multiplying */
const DIV=[{n:-12,d:3,o:[-4,4,-36]},{n:12,d:-4,o:[3,-3,-48]},{n:-12,d:-3,o:[-4,4,36]},{n:-20,d:-5,o:[4,-4,-15]}];
/* step 6: count the negatives */
const CNT=[{f:[-1,-1,-1]},{f:[-2,3,-1]},{f:[-1,-2,-3,-1]},{f:[2,-5,1]},{f:[-2,-2,-2,-2,-1]}];
const DESC=['A number line from -12 to 12. Choose where the jumps land, then see the jumps drawn from 0.',
 'A table of times-by-negative-3 facts going down from 3 times. Choose the answer for the next row.',
 'A slider for the first number, from -4 to 4, and a number line with an arrow for the answer. Drag the slider, tap it, or use the buttons to hit the target.',
 'A two by two sign grid: positive or negative times positive or negative. Choose the sign for the highlighted cell.',
 'A division and the multiplication that checks it. Choose the answer.',
 'A row of numbers to multiply, with the negative ones in red. Choose whether the answer is positive or negative.'];
const TXT=['3 × 4 means 3 jumps of 4. So 3 × (−4) means 3 jumps of −4. Where do they land?','Follow the pattern down the table, past zero.','A negative first number turns the arrow round to face the other way.','Fill the sign grid. Each cell has an example.','Dividing undoes multiplying, so the signs follow the same rules.','Multiply several numbers: count the negatives.'];
const DONE=['A positive number of jumps of a negative number lands on the negative side: 3 × (−4) = −12.',
 'Each row goes up by 3, so past zero the answers are positive: (−1) × (−3) = 3, (−3) × (−3) = 9.',
 'Multiplying by a negative turns the answer round to the other side of zero. Same size, opposite sign.',
 'Same signs give a positive answer. Different signs give a negative answer.',
 'Same signs: positive. Different signs: negative. Check with multiplication: 3 × (−4) = −12, so −12 ÷ 3 = −4.',
 'Each pair of negatives makes a positive. An even number of negatives gives a positive answer, an odd number gives a negative.'];
const QS=[{q:'(−6) × (−4) = ?',a:'24',o:[['−24','negneg'],['−10','add']]},
 {q:'(−3) + (−4) = ?',a:'−7',o:[['7','addrule'],['12','times']]},
 {q:'5 × (−7) = ?',a:'−35',o:[['35','mixed'],['−2','add']]},
 {q:'(−18) ÷ 3 = ?',a:'−6',o:[['6','drop'],['−54','times']]},
 {q:'(−20) ÷ (−4) = ?',a:'5',o:[['−5','negneg'],['80','times']]},
 {q:'(−1) × (−1) × (−1) = ?',a:'−1',o:[['1','count'],['−3','add']]},
 {q:'(−2) × 3 × (−5) = ?',a:'30',o:[['−30','count'],['−4','add']]},
 {q:'Which one is positive?',a:'(−8) × (−2)',o:[['(−8) + (−2)','addrule'],['(−8) ÷ 2','mixed']]}];
const fmt=n=>n<0?'−'+(-n):String(n),br=n=>n<0?'('+fmt(n)+')':String(n);
function PEN(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',NEG='#b91c1c',POS='#1d4ed8',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.12);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK,negc=()=>dk()?'#fca5a5':NEG,posc=()=>dk()?'#93c5fd':POS;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of t.split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function head(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-30,font),lh=sz(15)*1.3,h=L.length*lh+12;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(6,6,A.W-12,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,15,12+i*lh));
  let y=6+h+5;if(note){const f2=`700 ${sz(14)}${F}`,L2=wrap(note,A.W-30,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,15,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+5}return y}
 function card(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3:1.5;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(t==null||t==='')return;let n=sz(o.n||16),L;
  for(;;){L=wrap(String(t),r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=10)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=o.col||INK;c.textAlign='center';c.textBaseline='middle';
  L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 /* a number line from lo to hi across the canvas at height y; returns x(n) */
 function line(y,lo,hi,step){const c=g(),x0=22,x1=A.W-22,X=n=>x0+(n-lo)/(hi-lo)*(x1-x0);c.strokeStyle=fg();c.lineWidth=2;c.beginPath();c.moveTo(x0-8,y);c.lineTo(x1+8,y);c.stroke();
  c.font=`700 ${sz(12)}${F}`;c.textAlign='center';c.textBaseline='top';for(let n=lo;n<=hi;n++){const big=n%step===0;c.lineWidth=n===0?3:1.5;c.beginPath();c.moveTo(X(n),y-(big?8:4));c.lineTo(X(n),y+(big?8:4));c.stroke();
   if(big){c.fillStyle=n<0?negc():n>0?posc():fg();c.fillText(fmt(n),X(n),y+11)}}return X}
 /* a jumps of size b from 0, drawn as hops above the line */
 function hops(X,y,a,b,col){const c=g();let at=0;c.strokeStyle=col;c.lineWidth=3;for(let i=0;i<Math.abs(a);i++){const s=a<0?-b:b,x0=X(at),x1=X(at+s),m=(x0+x1)/2,hh=Math.min(46,Math.abs(x1-x0)*.7);
  c.beginPath();c.moveTo(x0,y);c.quadraticCurveTo(m,y-hh*1.6,x1,y);c.stroke();c.beginPath();const d=Math.sign(x1-x0)||1;c.moveTo(x1,y);c.lineTo(x1-d*9,y-9);c.moveTo(x1,y);c.lineTo(x1-d*2,y-12);c.stroke();at+=s}
  c.fillStyle=col;c.beginPath();c.arc(X(at),y,7,0,7);c.fill();return at}
 function arrow(X,y,to,col){const c=g(),x0=X(0),x1=X(to);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=6;c.beginPath();c.moveTo(x0,y);c.lineTo(x1,y);c.stroke();if(to){const d=Math.sign(to);c.beginPath();c.moveTo(x1+d*10,y);c.lineTo(x1-d*6,y-10);c.lineTo(x1-d*6,y+10);c.closePath();c.fill()}}
 return{wrap,head,card,line,hops,arrow,sz,fg,dk,negc,posc,INK,OK,NO,RIM,F}}
return{JUMP,PAT_B,PAT_A,PAT_OPEN,TURN,GRID,DIV,CNT,DESC,TXT,DONE,QS,fmt,br,PEN}})();
