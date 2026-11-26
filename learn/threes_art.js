/* Data and drawings for flagthrees (counting in 3s, forwards and backwards; Mathematics, Counting, ages 6-7).
   Sources: National Curriculum in England (2013) Year 2 Number and place value 'count in steps of 2, 3, and 5 from 0,
   and in tens from any number, forward and backward'; Year 3 'count from 0 in multiples of 4, 8, 50 and 100' builds on
   it; NCETM Mastery Professional Development, Number, Counting and Place Value 1.10 (skip counting as counting equal
   groups); Fuson (1988) Children's Counting and Concepts of Number on counting-on errors. Slips it targets: counting on
   in 1s instead of 3s; counting the start number as the first step of a hop (off by one); going up when counting back;
   thinking a number that ends in 3 (13, 23) is in the 3s count; and saying the number of groups instead of the total. */
const TRI=(()=>{
const TOP=30,STEP=3;
const inCount=n=>n>=0&&n<=TOP&&n%STEP===0;
/* step 3: gaps to fill. row = the line as shown (null = gap), dir = +1 forward or -1 back */
const LINES=[{dir:1,row:[3,6,null,12,null,18],fill:[9,15]},{dir:-1,row:[30,27,null,21,null,15],fill:[24,18]}];
const TILES=[9,10,15,14,24,20,18];
/* step 4: tricycles, 3 wheels each */
const TRIKES=6;
/* step 5: does the frog land on it? (1 = lands, 0 = hops over) and why */
const BINS=['Frog hops over it','Frog lands on it'];
const CARDS=[{n:12,z:1,no:'Count in 3s: 3, 6, 9, 12. The frog lands on 12.'},
 {n:13,z:0,no:'13 ends in 3, but the count goes 9, 12, 15. The frog hops over 13.'},
 {n:20,z:0,no:'The count goes 18, 21. The frog hops over 20.'},
 {n:21,z:1,no:'18 and 3 more is 21. The frog lands on 21.'},
 {n:23,z:0,no:'23 ends in 3, but the count goes 21, 24. The frog hops over 23.'},
 {n:27,z:1,no:'24 and 3 more is 27. The frog lands on 27.'}];
const DESC=['A number track from 0 to 30 with a frog on 0. Tap the stone where the frog lands after a hop of 3, or drag the frog there.',
 'The frog is on 30. Tap the stone where it lands after a hop of 3 back, or drag the frog there.',
 'Two lines of the 3s count with gaps. Drag a number tile into each gap, or tap a tile and then a gap.',
 'Six tricycles with 3 wheels each. Tap each tricycle to count its wheels in 3s.',
 'Six number cards. Drag each card into Frog lands on it or Frog hops over it.'];
const TXT=['Counting in 3s means hopping 3 each time: 0, 3, 6, 9. Count on 3 stones and land on the third.',
 'Counting back in 3s hops to smaller numbers: 30, 27, 24. Take 3 away each time.',
 'Each number in the line is 3 more than the one before, or 3 less when it counts back.',
 'Each tricycle has 3 wheels, so count the wheels in 3s. The last number you say is how many wheels.',
 'Only the numbers you say in the 3s count are landing stones. Ending in 3 does not make a number a 3s number.'];
const DONE=['0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. Ten hops of 3 reach 30.','30, 27, 24, 21, 18, 15, 12, 9, 6, 3, 0. Ten hops back reach 0.',
 'Every gap is 3 more than the number before it, or 3 less in the line that counts back.','3, 6, 9, 12, 15, 18. Six tricycles have 18 wheels.',
 '12, 21 and 27 are in the 3s count. 13, 20 and 23 are hopped over.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Count in 3s: 3, 6, 9, ... What comes next?',a:'12',o:[['10','ones'],['13','three']]},
 {q:'Count back in 3s: 21, 18, 15, ... What comes next?',a:'12',o:[['18','back'],['13','start']]},
 {q:'Count in 3s from 0. Which number do you say?',a:'24',o:[['23','three'],['20','ones']]},
 {q:'5 tricycles have 3 wheels each. How many wheels?',a:'15',o:[['5','groups'],['8','ones']]},
 {q:'The frog is on 9 and hops 3 more. Where does it land?',a:'12',o:[['11','start'],['6','back']]},
 {q:'Count back in 3s from 30. Which comes after 27?',a:'24',o:[['30','back'],['26','ones']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function icon(g,ch,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
function round(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fit(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';round(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:1.8;g.stroke();
 let n=size||17,rows;do{rows=fit(g,label,r.w-14,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-8)break;n--}while(n>11);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=fit(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=fit(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* one stepping stone with its number; st: '' plain, 'land' visited, 'here' frog is on it, 'no' wrong tap */
function stone(g,x,y,w,h,n,st,dk){g.fillStyle=st==='no'?'#fee2e2':st==='here'?'#fde68a':st==='land'?'#bbf7d0':(dk?'#334155':'#e2e8f0');round(g,x+2,y,w-4,h,10);g.fill();
 g.strokeStyle=st==='no'?NO:st==='here'?'#b45309':st==='land'?OK:EDGE;g.lineWidth=st?3:1.5;g.stroke();
 g.font=`800 ${Math.round(Math.min(22,w*.42))}${F}`;g.fillStyle=st||!dk?INK:LIGHT;g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),x+w/2,y+h/2)}
/* a hop arc from x0 to x1 above the stones, labelled +3 or -3 */
function hop(g,x0,x1,y,lab,dk){const mx=(x0+x1)/2,hgt=Math.min(46,Math.abs(x1-x0)*.5);g.strokeStyle=dk?'#93c5fd':SEL;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo(mx,y-hgt*2,x1,y);g.stroke();
 g.font=`800 14${F}`;g.fillStyle=dk?'#93c5fd':SEL;g.textAlign='center';g.textBaseline='bottom';g.fillText(lab,mx,y-hgt-2)}
/* a tricycle seen from the side: a big front wheel, two back wheels (the far one drawn higher and paler), a seat and handlebars */
function trike(g,cx,cy,s,col,dk){const wheel=(x,y,r,far)=>{g.fillStyle=far?(dk?'#94a3b8':'#6b7280'):(dk?'#e2e8f0':'#1f2937');g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=dk?'#334155':'#d1d5db';g.beginPath();g.arc(x,y,r*.38,0,7);g.fill()};
 wheel(cx-s*.12,cy-s*.1,s*.14,1);g.strokeStyle=col;g.lineWidth=Math.max(3,s*.08);g.lineCap='round';g.beginPath();g.moveTo(cx-s*.34,cy+s*.04);g.lineTo(cx-s*.14,cy-s*.08);g.moveTo(cx-s*.34,cy+s*.04);g.lineTo(cx+s*.28,cy+s*.04);
 g.moveTo(cx-s*.14,cy-s*.08);g.lineTo(cx-s*.14,cy-s*.2);g.moveTo(cx+s*.28,cy+s*.04);g.lineTo(cx+s*.18,cy-s*.32);g.lineTo(cx+s*.06,cy-s*.32);g.stroke();
 g.fillStyle=col;T0(g,cx-s*.24,cy-s*.26,s*.2,s*.07);wheel(cx-s*.36,cy+s*.08,s*.15,0);wheel(cx+s*.28,cy+s*.06,s*.2,0)}
function T0(g,x,y,w,h){round(g,x,y,w,h,h/2);g.fill()}
return{TOP,STEP,inCount,LINES,TILES,TRIKES,BINS,CARDS,DESC,TXT,DONE,QS,icon,round,fit,card,top,stone,hop,trike,INK,LIGHT,OK,NO,EDGE,SEL}})();
