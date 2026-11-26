/* Data and drawings for flagpushtest (testing push and pull designs; Science, ages 5-6).
   Sources: NGSS K-PS2-2 'Analyze data to determine if a design solution works as intended to change the speed or
   direction of an object with a push or a pull' (clarification: a ramp to increase the speed of a ball, a structure
   that would cause an object such as a marble or ball to turn); K-2-ETS1-1/ETS1-3 (test and compare designs);
   NC Year 1-2 Working scientifically ('performing simple tests', 'gathering and recording data to help in answering
   questions'). Slips it targets: the hardest push is always best; one try proves a design works; a harder push can make
   a ball turn; moving the goal instead of changing the design; judging a design by its last try, not by counting all
   the results. */
const PTS=(()=>{
/* step 1: three pushes along a lane of 10 steps; the mat covers 6 to 8. at = where the ball stops */
const MAT=[6,8];
const PUSH=[{t:'Gentle push',ic:'\u{1F90F}',at:3.2,res:'short',say:'Too short. The ball stopped before the mat. It needs a bigger push.'},
 {t:'Medium push',ic:'\u270B',at:7,res:'in',say:'On the mat! A medium push was just right.'},
 {t:'Hard push',ic:'\u{1F4AA}',at:10.4,res:'far',say:'Too far! The ball rolled right past the mat. Harder is not always better.'}];
/* step 2: the same medium push tested 5 times; a bumpy floor makes try 3 stop short */
const TRIES=[7.1,6.6,5.4,7.4,6.9];
const VERDICT=[['Yes: it worked 4 out of 5 times',1],['No: it missed once, so it never works',0,'One miss does not mean it never works. It worked 4 times out of 5: most of the time.'],
 ['We cannot tell',0,'We can tell. Count the ticks: 4 out of 5 tries landed on the mat.']];
/* step 3: turn the ball. slots along the path; the goal sits above one slot */
const SLOTS=[3,5,7];
const TURNS=[{goal:1,say:'In! The wall turned the ball up into the goal.'},{goal:2,say:'In again! The wall has to be right under the goal.'}];
/* step 4: two designs, 5 tests each (1 = worked) */
const DES=[{n:'Low ramp',r:[1,0,0,0,1]},{n:'High ramp',r:[1,1,0,1,1]}];
const READ=[{q:'Which ramp worked more times? Tap it.',o:['Low ramp','High ramp'],a:1,no:['Count the ticks. The low ramp only has 2.','']},
 {q:'How many times did the high ramp work?',o:['3 times','4 times','5 times'],a:1,no:['Count again: tick, tick, cross, tick, tick.','','It missed once, so not all 5.']},
 {q:'The low ramp worked on its last try. Is it the better design?',o:['No: the high ramp worked more times','Yes: the last try counts most'],a:0,no:['','Every try counts, not just the last. The high ramp worked 4 times, the low ramp only 2.']}];
/* step 5: fix the design. ok = the right change; others carry a reply */
const FIX=[{p:'The ball stopped before the mat.',o:[['A bigger push',1],['Move the mat closer',0,'That changes the goal, not the design. Keep the mat. Change the push.'],['A smaller push',0,'A smaller push makes it stop even sooner.']],yes:'Test again: a bigger push gets it to the mat!'},
 {p:'The ball rolled past the mat.',o:[['A harder push',0,'Harder makes it roll even further.'],['A smaller push',1],['Make the mat longer',0,'That changes the goal. Change the push instead.']],yes:'Test again: a smaller push stops it on the mat!'},
 {p:'The ball went straight past the goal.',o:[['Push it harder',0,'A harder push still goes straight, just faster.'],['Put a wall in its way to turn it',1],['Move the goal',0,'The goal stays. Change the design so the ball turns.']],yes:'Test again: the wall turns it into the goal!'}];
const DESC=['A lane with a ball and a star mat. Tap a push and watch where the ball stops.',
 'The same medium push, tested 5 times. Tap Test, then say if the design works.',
 'Seen from above: the ball rolls right, the goal is up. Drag the wall onto a spot, or tap a spot.',
 'Results for two ramps, 5 tests each. Tap to answer.',
 'Three tests that went wrong. Tap the change that fixes each one.'];
const TXT=['A design is a plan to make the ball do a job: stop on the mat. Test it and see.','One try can be lucky or unlucky. Test it again and again, and record each try.',
 'A push makes the ball go faster. To make it turn, something must push it a new way, like a wall.','Results tell you which design works. Count all the ticks, not just one try.',
 'When a test goes wrong, change the design and test again. Do not move the goal.'];
const DONE=['A medium push stopped the ball on the mat. Too gentle was short, too hard was too far.','4 ticks out of 5: the design works most of the time.',
 'A wall in the right place turns the ball into the goal.','The high ramp worked 4 times, the low ramp only 2.','Change the design, then test again: that is how designers fix things.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Mia wants her toy car to stop on a mat. Which push should she try?',a:'Try pushes and test where it stops',o:[['Always the hardest push','hard'],['Push once and stop testing','once']]},
 {q:'Sam tests his ramp once and it works. What should he do?',a:'Test it more times',o:[['Say it always works','once'],['Move the goal','goal']]},
 {q:'A ball rolls straight. How can you make it turn?',a:'Put a wall or block in its way',o:[['Push it harder','turn'],['Push it more gently','turn']]},
 {q:'The ball stops short of the goal. What is a fair fix?',a:'Give it a bigger push',o:[['Move the goal closer','goal'],['Give it a smaller push','hard']]},
 {q:'Ramp A: \u2713\u2717\u2717\u2717\u2713. Ramp B: \u2713\u2713\u2717\u2713\u2713. Which works better?',a:'Ramp B',o:[['Ramp A, its last try worked','count'],['They are the same','count']]},
 {q:'A hard push sends the ball past the mat. What does that show?',a:'Harder is not always better',o:[['Hard pushes always win','hard'],['The mat is broken','goal']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function emo(g,ch,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
/* a big tappable button drawn on the canvas; st is 'ok', 'no', 'sel' or '' */
function btn(g,r,label,st,ic,size){g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';rr(g,r.x,r.y,r.w,r.h,14);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:2;g.stroke();if(ic)emo(g,ic,r.x+r.w/2,r.y+r.h*.33,Math.min(r.h*.38,34));
 let n=size||18,rows;do{rows=wrap(g,label,r.w-14,`800 ${n}${F}`);if(rows.length*n*1.2<=(ic?r.h*.48:r.h-8))break;n--}while(n>12);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const cy=ic?r.y+r.h*.74:r.y+r.h/2;rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,cy+(i-(rows.length-1)/2)*n*1.2))}
/* instruction strip plus the last reply under it; returns the y below */
function head(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?17:18,f=`800 ${s}${F}`,rows=wrap(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=wrap(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* side view of the lane: start pad, star mat, ball at u (0-10, more than 10 = off the end); returns the x of a unit */
function lane(A,y,h,u,trail){const g=A.ctx,dk=A.col.dark,L=40,R=A.W-24,X=v=>L+(R-L)*Math.min(v,10.6)/10.6;
 g.fillStyle=dk?'#1e293b':'#f5f5f4';rr(g,8,y,A.W-16,h,12);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.2;g.stroke();
 const fy=y+h*.72;g.fillStyle=dk?'#a16207':'#d6a85c';g.fillRect(L-20,fy,R-L+20,8);
 g.fillStyle=dk?'#166534':'#bbf7d0';g.fillRect(X(MAT[0]),fy-6,X(MAT[1])-X(MAT[0]),8);g.strokeStyle=OK;g.lineWidth=2;g.strokeRect(X(MAT[0]),fy-6,X(MAT[1])-X(MAT[0]),8);
 emo(g,'\u2B50',(X(MAT[0])+X(MAT[1]))/2,fy-h*.38,Math.min(30,h*.28));g.font=`700 13${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='top';g.fillText('mat',(X(MAT[0])+X(MAT[1]))/2,fy+12);g.fillText('start',X(0),fy+12);
 if(trail!=null){g.strokeStyle=dk?'#93c5fd':SEL;g.setLineDash([4,5]);g.lineWidth=2;g.beginPath();g.moveTo(X(0),fy-14);g.lineTo(X(trail),fy-14);g.stroke();g.setLineDash([])}
 const bx=X(u);g.fillStyle='#dc2626';g.beginPath();g.arc(bx,fy-12,12,0,7);g.fill();g.strokeStyle=dk?'#f8fafc':'#7f1d1d';g.lineWidth=2;g.stroke();return X}
/* top view for turning: the wall is drawn as / so a ball rolling right bounces up (angle in = angle out). Path along the bottom, three wall spots, goal above one spot. ball = {x,y} in units */
function floor(A,y,h,goal,wall,ball,held){const g=A.ctx,dk=A.col.dark,L=30,R=A.W-30,X=v=>L+(R-L)*v/10,py=y+h-40,top=y+18;const out={slots:[]};
 g.fillStyle=dk?'#1e293b':'#f8fafc';rr(g,8,y,A.W-16,h,12);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.2;g.stroke();
 g.fillStyle=dk?'#334155':'#e7e5e4';g.fillRect(L,py-16,R-L,32);
 const gx=X(SLOTS[goal]);g.fillStyle=dk?'#166534':'#bbf7d0';rr(g,gx-30,top,60,46,8);g.fill();g.strokeStyle=OK;g.lineWidth=3;g.stroke();emo(g,'\u{1F945}',gx,top+23,30);
 g.fillStyle=dk?'#334155':'#e7e5e4';g.fillRect(gx-16,top+46,32,py-16-top-46);
 SLOTS.forEach((s,i)=>{const r={i,x:X(s)-26,y:py-26,w:52,h:52};out.slots.push(r);g.strokeStyle=dk?'#cbd5e1':EDGE;g.setLineDash([5,4]);g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([]);
  g.font=`800 14${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='top';g.fillText('ABC'[i],X(s),py+30)});
 const wl=(cx,cy)=>{g.strokeStyle=dk?'#fb923c':'#7c2d12';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(cx-18,cy+18);g.lineTo(cx+18,cy-18);g.stroke();g.lineCap='butt'};
 if(wall!=null)wl(X(SLOTS[wall]),py);if(held)wl(held.x,held.y);
 if(ball){const bx=X(ball.x),by=ball.y==null?py:py-(py-top-23)*ball.y;g.fillStyle='#dc2626';g.beginPath();g.arc(bx,by,11,0,7);g.fill();g.strokeStyle=dk?'#f8fafc':'#7f1d1d';g.lineWidth=2;g.stroke()}
 emo(g,'\u270B',L-4,py,24);out.X=X;out.py=py;return out}
/* a results row of ticks and crosses */
function ticks(A,x,y,list,size){const g=A.ctx,dk=A.col.dark;list.forEach((v,i)=>{g.font=`900 ${size||22}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=v?(dk?'#86efac':OK):(dk?'#fca5a5':NO);g.fillText(v?'\u2713':'\u2717',x+i*(size||22)*1.3,y)})}
return{MAT,PUSH,TRIES,VERDICT,SLOTS,TURNS,DES,READ,FIX,DESC,TXT,DONE,QS,emo,rr,wrap,btn,head,lane,floor,ticks,INK,LIGHT,OK,NO}})();
