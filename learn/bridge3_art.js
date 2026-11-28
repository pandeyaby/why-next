/* Data and drawings for flagbridge3 (Mental addition and subtraction: a three-digit number and ones; Mathematics,
   Number - addition and subtraction, ages 7-8). Sources: National Curriculum in England (2013) Year 3 'add and subtract
   numbers mentally, including a three-digit number and ones'; NCETM Primary Mastery Professional Development, Spine 1
   addition and subtraction (bridging through ten: partition the ones so the first jump lands on the next multiple of ten); Common Core
   3.NBT.A.2 (add and subtract within 1000 using strategies based on place value). Slips it targets: writing the ones
   sum next to the other digits (346 + 7 = 3413); keeping the tens digit when the ones pass a ten (346 + 7 = 343);
   'smaller from bigger' in the ones when taking away (432 - 5 = 433); keeping the hundreds digit when the count passes
   a hundred (397 + 5 = 302); and counting the start number as the first jump (342 + 5 = 346). */
const BRG=(()=>{
/* jump steps: s = start, d = ones to add (negative = take away). A step that crosses a multiple of ten is done in two
   jumps: first to that multiple of ten (the bridge), then the rest. */
const JUMPS=[{s:342,d:5},{s:346,d:7},{s:432,d:-5},{s:397,d:5}];
const tenNext=(s,d)=>d>0?Math.floor(s/10)*10+10:Math.floor(s/10)*10-(s%10===0?10:0);
const bridgeOf=J=>Math.floor(J.s/10)===Math.floor((J.s+J.d)/10)?null:tenNext(J.s,J.d);
/* which digits change from start to answer: 'ones', 'tens' (tens changes, hundreds does not) or 'hund' */
const changes=(s,a)=>Math.floor(s/100)!==Math.floor(a/100)?'hund':Math.floor(s/10)!==Math.floor(a/10)?'tens':'ones';
/* step 5: sort sums by the digits that change */
const CARDS=[{s:254,d:3},{s:258,d:6},{s:495,d:8},{s:631,d:-4},{s:706,d:-2},{s:402,d:-5}];
const BINS=[{k:'ones',t:'Only the ones digit',say:'Only the ones digit changes.'},{k:'tens',t:'The tens digit too',say:'The tens digit changes too.'},{k:'hund',t:'The hundreds digit too',say:'The hundreds digit changes too.'}];
const sum=C=>`${C.s} ${C.d<0?'\u2212':'+'} ${Math.abs(C.d)}`;
const sortNo=(C,k)=>{const a=C.s+C.d,real=changes(C.s,a),ten=C.d>0?tenNext(C.s,C.d):(C.s%10===0?C.s:Math.floor(C.s/10)*10);
 if(real==='ones')return `${sum(C)} = ${a}. It does not pass ${ten}, so only the ones digit changes.`;
 if(real==='tens')return k==='ones'?`${sum(C)} = ${a}. It passes ${ten}, so the tens digit changes as well.`:`${sum(C)} = ${a}. It passes ${ten} but not a hundred, so the hundreds digit stays ${Math.floor(C.s/100)}.`;
 return `${sum(C)} = ${a}. It passes ${ten}, which is a hundred, so the hundreds digit changes too.`};
const DESC=['A number line from 340 to 349. A marker sits on 342. Drag the marker along the line, tap a number, or press a jump button to add 5.',
 'A number line from 344 to 355 with 350 marked. The marker is on 346. Jump to 350 first, then jump the ones that are left.',
 'A number line from 425 to 434 with 430 marked. The marker is on 432. Jump back to 430 first, then jump back the rest.',
 'A number line from 395 to 404 with 400 marked. The marker is on 397. Jump to 400, then jump the rest.',
 'Three boxes: only the ones digit changes, the tens digit changes too, the hundreds digit changes too. Six sum cards. Drag each card into a box, or tap a card and then a box.'];
const TXT=['When you add a few ones and you do not pass a ten, only the ones digit changes. The hundreds and tens stay the same.',
 'If the ones pass a ten, go to the ten first. 346 needs 4 to make 350. Split 7 into 4 and 3. Then 350 + 3 = 353.',
 'To take away, jump back to the ten first. 432 is 2 more than 430. Split 5 into 2 and 3. Then 430 \u2212 3 = 427.',
 'The next ten after 397 is 400. 397 + 3 = 400. Then add the 2 left: 402. Passing a hundred changes the hundreds digit.',
 'Ask: does the jump pass a ten? Does it pass a hundred? That tells you which digits change.'];
const DONE=['342 + 5 = 347. Only the ones digit changed.','346 + 4 = 350, and 350 + 3 = 353.','432 \u2212 2 = 430, and 430 \u2212 3 = 427.',
 '397 + 3 = 400, and 400 + 2 = 402.','All 6 sorted. Passing a ten changes the tens digit. Passing a hundred changes the hundreds digit.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'346 + 7 = ?',a:'353',o:[['343','tens'],['3413','join']]},
 {q:'432 \u2212 5 = ?',a:'427',o:[['433','flip'],['437','dir']]},
 {q:'397 + 5 = ?',a:'402',o:[['302','hund'],['3912','join']]},
 {q:'500 \u2212 3 = ?',a:'497',o:[['597','hund'],['503','dir']]},
 {q:'Ben starts on 342 and counts 343, 344, 345, 346, 347 to add 5. What is 342 + 5?',a:'347',o:[['346','off'],['352','place']]},
 {q:'To work out 268 + 5, which split jumps to the next ten first?',a:'268 + 2 + 3',o:[['268 + 5 + 0','split'],['268 + 3 + 2','split2']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif',TEN='#7c3aed';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,label,st,size,dk){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':(dk?'#f8fafc':'#ffffff');rr(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:2;g.stroke();
 let n=size||22,rows;do{rows=wrap(g,label,r.w-10,`800 ${n}${F}`);if(rows.length*n*1.2<=r.h-6)break;n--}while(n>12);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.2))}
function head(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?17:19,f=`800 ${s}${F}`,rows=wrap(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=wrap(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* three digit boxes (hundreds, tens, ones); digits that differ from 'was' are ringed */
function digits(g,cx,y,n,was,dk,sz){const d=String(n).padStart(3,'0').split(''),w0=String(was).padStart(3,'0').split(''),bw=sz,gap=8,x0=cx-1.5*bw-gap;
 ['H','T','O'].forEach((L,i)=>{const x=x0+i*(bw+gap),ch=was!=null&&d[i]!==w0[i];g.fillStyle=ch?(dk?'#3b0764':'#ede9fe'):(dk?'#1e293b':'#ffffff');rr(g,x,y,bw,bw*1.1,10);g.fill();
  g.strokeStyle=ch?TEN:EDGE;g.lineWidth=ch?3.5:1.5;g.stroke();g.font=`900 ${Math.round(bw*.62)}${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='middle';g.fillText(d[i],x+bw/2,y+bw*.58);
  g.font=`700 ${A0(bw)}${F}`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textBaseline='bottom';g.fillText(L,x+bw/2,y-2)})}
const A0=bw=>Math.max(12,Math.round(bw*.24));
/* a jump arc from value a to value b on a line at height ly; X maps value to x */
function arc(g,X,ly,a,b,col,lab,dk){const x0=X(a),x1=X(b),mx=(x0+x1)/2,r=Math.abs(x1-x0)/2,h=Math.min(46,16+r*.5);
 g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(x0,ly-4);g.quadraticCurveTo(mx,ly-4-h*2,x1,ly-4);g.stroke();
 const dir=b>a?1:-1;g.fillStyle=col;g.beginPath();g.moveTo(x1,ly-4);g.lineTo(x1-dir*9,ly-14);g.lineTo(x1-dir*2,ly-16);g.closePath();g.fill();
 if(lab){g.font=`900 15${F}`;const w=g.measureText(lab).width+12;g.fillStyle=dk?'#0f172a':'#ffffff';rr(g,mx-w/2,ly-4-h-12,w,22,8);g.fill();g.strokeStyle=col;g.lineWidth=1.5;g.stroke();
  g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='middle';g.fillText(lab,mx,ly-4-h-1)}}
/* the marker: a round counter standing on the line */
function marker(g,x,ly,dk){g.fillStyle='#ea580c';g.beginPath();g.arc(x,ly-15,12,0,7);g.fill();g.strokeStyle=dk?'#fed7aa':'#7c2d12';g.lineWidth=2;g.stroke();
 g.fillStyle='#7c2d12';g.beginPath();g.moveTo(x-6,ly-4);g.lineTo(x+6,ly-4);g.lineTo(x,ly+2);g.closePath();g.fill()}
return{JUMPS,bridgeOf,changes,CARDS,BINS,sum,sortNo,DESC,TXT,DONE,QS,INK,LIGHT,OK,NO,EDGE,SEL,F,TEN,rr,wrap,card,head,digits,arc,marker}})();
