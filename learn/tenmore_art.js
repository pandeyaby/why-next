/* Data and drawings for flagtenmore (10 or 100 more or less; Mathematics, Place value, ages 7-8).
   Sources: National Curriculum in England (2013) Year 3 Number and place value 'find 10 or 100 more or less than a
   given number' and 'recognise the place value of each digit in a three-digit number (hundreds, tens, ones)'; Common
   Core 2.NBT.8 'mentally add 10 or 100 to a given number 100-900, and mentally subtract 10 or 100 from a given number
   100-900'; NCETM Mastery Professional Development, Number, Place value 1.21 and 1.24 (regrouping 10 tens as 1 hundred).
   Slips it targets: changing the ones digit instead of the tens (342 + 10 = 343); changing the wrong place (342 + 10 =
   442); not regrouping across a hundred (395 + 10 = 3105 or 305, 503 - 10 = 403); going the wrong way for 'less'; and
   believing that 'the digit that changed' always tells you the size of the change (129 to 130 is only 1 more). */
const TNM=(()=>{
const PL=['h','t','o'],NAME={h:'Hundreds',t:'Tens',o:'Ones'},BLOCK={h:'hundred flat',t:'ten rod',o:'one cube'},WORTH={h:100,t:10,o:1};
const val=s=>100*s.h+10*s.t+s.o;
/* steps 1-3: start numbers and targets */
const UP={h:3,t:4,o:2,goal:382},DOWN={h:8,t:7,o:5,goal:475},CROSS={h:3,t:8,o:6,goal:406};
/* step 4: the cross around 507. slot = which way from the middle, d = the change it needs */
const MID=507,SLOTS=[{k:'up',lab:'100 less',d:-100},{k:'left',lab:'10 less',d:-10},{k:'right',lab:'10 more',d:10},{k:'down',lab:'100 more',d:100}];
const TILES=[407,497,517,607,508,617,487];
const sizeName=d=>({1:'1 more',[-1]:'1 less',10:'10 more',[-10]:'10 less',100:'100 more',[-100]:'100 less'})[d]||(d>0?`${d} more`:`${-d} less`);
/* step 5: how big was the change? (z = 0: by 1, 1: by 10, 2: by 100) */
const BINS=['Changed by 1','Changed by 10','Changed by 100'];
const CARDS=[{a:253,b:263,z:1,no:'Only the tens digit went up, from 5 to 6. That is 10 more.'},
 {a:129,b:130,z:0,no:'The tens digit changed, but 129 + 1 = 130. 9 ones and 1 more make a new ten. It is only 1 more.'},
 {a:905,b:805,z:2,no:'The hundreds digit went down from 9 to 8. That is 100 less.'},
 {a:598,b:608,z:1,no:'The hundreds digit changed, but 598 + 10 = 608. 9 tens and 1 more ten make a new hundred. It is 10 more.'},
 {a:470,b:471,z:0,no:'Only the ones digit went up. That is 1 more.'},
 {a:640,b:540,z:2,no:'The hundreds digit went down from 6 to 5. That is 100 less.'}];
const DESC=['A place value chart shows 342 with hundred flats, ten rods and one cubes. Drag a block from the tray into its column, or use the buttons, to make 10 more each time.',
 'The chart shows 875. Drag a block out of its column into Take away, or tap a column, to make 100 less each time.',
 'The chart shows 386. Add ten rods. When the Tens column has 10 rods, swap them for 1 hundred flat.',
 'A cross with 507 in the middle and four gaps: 100 less above, 10 less on the left, 10 more on the right, 100 more below. Drag a number tile into each gap, or tap a tile and then a gap.',
 'Six cards show a number changing into another. Drag each card into Changed by 1, Changed by 10 or Changed by 100.'];
const TXT=['A ten rod is worth 10. Put one in the Tens column and only the tens digit goes up by 1.',
 'A hundred flat is worth 100. Take one away and only the hundreds digit goes down by 1.',
 'A column can hold at most 9. When the tens reach 10, swap 10 tens for 1 hundred.',
 '10 more or less changes the tens digit. 100 more or less changes the hundreds digit.',
 'Look at the size of the change, not just which digit moved. Crossing a ten or a hundred can change two digits.'];
const DONE=['342, 352, 362, 372, 382. Each ten rod made 10 more, and only the tens digit changed.','875, 775, 675, 575, 475. Each flat taken made 100 less.',
 '386, 396, 406. 10 tens became 1 hundred, so 396 + 10 = 406.','407 is 100 less, 497 is 10 less, 517 is 10 more and 607 is 100 more than 507.',
 '129 to 130 is 1 more and 598 to 608 is 10 more, even though two digits changed.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'What is 10 more than 342?',a:'352',o:[['343','ones'],['442','hund']]},
 {q:'What is 100 less than 640?',a:'540',o:[['740','dir'],['630','tens']]},
 {q:'What is 10 more than 395?',a:'405',o:[['3105','cross'],['396','ones']]},
 {q:'What is 10 less than 503?',a:'493',o:[['403','hund'],['513','dir']]},
 {q:'What is 100 more than 900?',a:'1000',o:[['910','tens'],['9100','cross']]},
 {q:'A jar has 284 beads. Sam puts in 10 more. How many beads now?',a:'294',o:[['285','ones'],['384','hund']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
const COL={h:['#2563eb','#1e3a8a'],t:['#16a34a','#14532d'],o:['#ea580c','#7c2d12']};
function round(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fit(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';round(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:1.8;g.stroke();
 let n=size||17,rows;do{rows=fit(g,label,r.w-12,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-8)break;n--}while(n>11);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function top(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?16:18,f=`800 ${s}${F}`,rows=fit(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');round(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=fit(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* base-ten blocks: u = the side of one cube in px */
function cube(g,x,y,u,dk){g.fillStyle=COL.o[0];g.fillRect(x,y,u,u);g.strokeStyle=dk?'#fed7aa':COL.o[1];g.lineWidth=1;g.strokeRect(x+.5,y+.5,u-1,u-1)}
function rod(g,x,y,u,dk,glow){g.fillStyle=COL.t[0];g.fillRect(x,y,u,10*u);g.strokeStyle=dk?'#bbf7d0':COL.t[1];g.lineWidth=1;for(let k=1;k<10;k++){g.beginPath();g.moveTo(x,y+k*u);g.lineTo(x+u,y+k*u);g.stroke()}
 g.lineWidth=glow?3:1.2;g.strokeStyle=glow?'#facc15':(dk?'#bbf7d0':COL.t[1]);g.strokeRect(x,y,u,10*u)}
function flat(g,x,y,s,dk){g.fillStyle=COL.h[0];g.fillRect(x,y,s,s);g.strokeStyle=dk?'#bfdbfe':COL.h[1];g.lineWidth=.8;const k=s/10;for(let i=1;i<10;i++){g.beginPath();g.moveTo(x+i*k,y);g.lineTo(x+i*k,y+s);g.moveTo(x,y+i*k);g.lineTo(x+s,y+i*k);g.stroke()}g.lineWidth=1.5;g.strokeRect(x,y,s,s)}
/* one block of a kind, centred at cx, cy, for the tray and for dragging */
function block(g,kind,cx,cy,u,dk){if(kind==='h'){const s=10*u*.42;flat(g,cx-s/2,cy-s/2,s,dk)}else if(kind==='t')rod(g,cx-u/2,cy-5*u,u,dk);else cube(g,cx-u,cy-u,2*u,dk)}
return{PL,NAME,BLOCK,WORTH,val,UP,DOWN,CROSS,MID,SLOTS,TILES,sizeName,BINS,CARDS,DESC,TXT,DONE,QS,COL,round,fit,card,top,cube,rod,flat,block,INK,LIGHT,OK,NO,EDGE,SEL}})();
