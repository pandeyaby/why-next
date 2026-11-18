/* Flagship: Explaining Mathematical Reasoning (ages 6-7; NC aims "reason mathematically", Y2 "use the inverse to check").
   Make ten for 8 + 5, finish the stem sentence that explains it, check 9 + 6 = 15 with 15 − 6, find 7 + 8 a second way with a
   near double, and find the wrong step in three worked examples. Not flagshowwk (drawing a sum), flagcheck or flagjustify. */
(()=>{
VIS.reg('flagexplain',c=>{let A,bar,quiz,ask=-1,epoch=0;const st={};
const DARK='#111827',SHEET='#f8fafc',GOOD='#047857',BLUE='#2563eb',RED='#b91c1c',PEG=['#f97316','#0ea5e9'];
const SLIPS=[{t:'Sam: 7 + 6 = 12',l:['7 + 3 = 10','6 take away 3 leaves 2','10 + 2 = 12'],bad:1,fix:'6 take away 3 leaves 3, so 10 + 3 = 13.'},
 {t:'Zoe: 15 − 7 = 9',l:['7 is 5 and 1','15 − 5 = 10','10 − 1 = 9'],bad:0,fix:'7 is 5 and 2, not 5 and 1. So 10 − 2 = 8: 15 − 7 = 8.'},
 {t:'Max: 6 + 7 = 12',l:['6 + 6 = 12','7 is one more than 6','So 6 + 7 = 12'],bad:2,fix:'7 is one more than 6, so the answer is one more than 12: 13.'}];
const tab=()=>['ten','gap','inv','dbl','slip','chal'][A.step];
const pen=()=>A.col.dark?'#f1f5f9':DARK,clip=(v,lo,hi)=>Math.min(hi,Math.max(lo,v)),hitR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function narrate(s){c.say(s);A.cv.setAttribute('aria-label',s)}
/* a rounded sheet of paper with centred dark text (wraps to two lines when it must) */
function sheet(r,text,o){const g=A.ctx;o=o||{};g.fillStyle=o.bg||SHEET;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);g.fill();g.strokeStyle=o.edge||'#94a3b8';g.lineWidth=o.edge?3:1.5;g.stroke();
 if(!text)return;let px=o.px||(A.narrow?14:17);g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';
 const fit=()=>{g.font=`700 ${px}px system-ui`;return g.measureText(text).width<r.w-14};while(!fit()&&px>12)px--;
 if(fit())return g.fillText(text,r.x+r.w/2,r.y+r.h/2);const w=text.split(' '),h=Math.ceil(w.length/2);g.fillText(w.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h/2-px*.6);g.fillText(w.slice(h).join(' '),r.x+r.w/2,r.y+r.h/2+px*.6)}
const banner=(t,y,edge)=>{const w=Math.min(A.W-16,Math.max(160,t.length*(A.narrow?7.6:9.4)));sheet({x:(A.W-w)/2,y:y||8,w,h:A.narrow?34:38},t,{edge:edge||BLUE})};
function peg(x,y,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=DARK;g.lineWidth=1.2;g.stroke()}
/* ---- 1: make ten with a ten frame ---- */
function frames(){const n=A.narrow,s=Math.min(A.W/(n?6.4:12),A.H/(n?8:5)),x0=n?(A.W-5*s)/2:A.W*.08,y0=A.H*(n?.14:.2);return{s,x0,y0,cell:(f,i)=>({x:x0+(f&&!n?5.6*s:0)+(i%5)*s,y:y0+(f&&n?2.2*s:0)+Math.floor(i/5)*s,w:s,h:s})}}
const pileSpot=i=>{const F=frames(),s=F.s;return{x:A.narrow?A.W/2+(i-2)*s*1.1:A.W*.72+(i%3)*s*1.1,y:A.narrow?A.H*.76:A.H*.62+Math.floor(i/3)*s*1.1}};
function drawTen(){const g=A.ctx,F=frames();banner(st.moved<5?'8 + 5: make ten first':'8 + 5 = 13',8,st.moved>=5?GOOD:BLUE);
 for(let f=0;f<2;f++)for(let i=0;i<10;i++){const r=F.cell(f,i);g.strokeStyle=pen();g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h)}
 for(let i=0;i<8;i++){const r=F.cell(0,i);peg(r.x+r.w/2,r.y+r.h/2,F.s*.36,PEG[0])}
 for(let j=0;j<st.moved;j++){const r=j<2?F.cell(0,8+j):F.cell(1,j-2);peg(r.x+r.w/2,r.y+r.h/2,F.s*.36,PEG[1])}
 for(let j=st.moved;j<5;j++){const p=st.hold&&j===st.moved?st.hold:pileSpot(j);peg(p.x,p.y,F.s*.36,PEG[1])}
 if(st.moved>=2)sheet({x:10,y:A.H*(A.narrow?.88:.86),w:A.W-20,h:34},st.moved<5?'8 + 2 = 10':'8 + 2 = 10, then 10 + 3 = 13',{bg:'#dcfce7',edge:GOOD})}
function moveOne(){if(st.moved>=5)return;st.moved++;A.sound.pop();const m=st.moved;
 react(m<2?'One in. The frame needs one more to make ten.':m===2?'The frame is full: 8 + 2 = 10. 3 are left.':m<5?`${m-2} in the next frame.`:'8 + 2 = 10, and 3 more is 13. That is how I made ten.')}
/* ---- 2: stem sentence: fill the gaps in the explanation ---- */
const GAPS=[2,3,3,13],TILES=[3,13,2,5,12];
const tileR=()=>{const n=A.narrow,w=n?A.W*.17:A.W*.12,h=Math.max(50,A.H*.12),gap=(A.W-5*w)/6;return TILES.map((v,i)=>({v,x:gap+i*(w+gap),y:A.H*.8,w,h}))};
function drawGap(){const g=A.ctx,F={s:Math.min(A.W/16,A.H/10)};for(let i=0;i<10;i++){const x=A.W/2-4.5*F.s+(i%5)*F.s,y=A.H*.08+Math.floor(i/5)*F.s;g.strokeStyle=pen();g.lineWidth=2;g.strokeRect(x,y,F.s,F.s);peg(x+F.s/2,y+F.s/2,F.s*.35,PEG[i<8?0:1])}
 for(let i=0;i<3;i++)peg(A.W/2+1.4*F.s+i*F.s,A.H*.08+F.s,F.s*.35,PEG[1]);
 const gapT=i=>i<st.fill?String(GAPS[i]):i===st.fill?'[ ? ]':'[ ... ]',L3=[`I took ${gapT(0)} from the 5 to make 10.`,`Then ${gapT(1)} were left.`,`10 + ${gapT(2)} = ${gapT(3)}`];
 L3.forEach((t,i)=>sheet({x:10,y:A.H*(A.narrow?.3:.32)+i*A.H*.14,w:A.W-20,h:A.H*.12},t,{px:A.narrow?17:20,bg:'#fefce8',edge:i===[0,1,2,2][st.fill]&&st.fill<4?BLUE:null}));
 if(st.fill<4)tileR().forEach((r,i)=>sheet(r,String(r.v),{bg:st.oops===i?'#fee2e2':SHEET,edge:st.oops===i?RED:'#475569',px:22}))}
const GAPWHY=[{3:'8 + 3 is 11, not 10. 8 needs only 2 more to make 10.',5:'All 5 make 13, not 10. Only 2 fill the ten frame.'},{2:'The 2 went into the ten. 5 take away 2 leaves 3.',5:'Not all 5 are left. 2 went into the ten, so 3 are left.'},
 {2:'3 were left, so add 3 to the 10.',13:'13 is the answer. First say what you add to 10: the 3 left.'},{12:'10 + 3: count on 11, 12, 13. It is 13.',3:'3 is what you add. 10 + 3 makes 13.'}];
function fillGap(i){if(st.fill>3)return;const v=TILES[i],want=GAPS[st.fill];if(v!==want){st.oops=i;A.sound.miss();return react((GAPWHY[st.fill]||{})[v]||'Look at the ten frame and the 3 left over.')}
 st.oops=null;st.fill++;A.sound.pop();react(st.fill<4?`Yes, ${v}.`:'I took 2 from the 5 to make 10. Then 3 were left. 10 + 3 = 13.')}
/* ---- 3: check with the inverse: a 15-cube bar, cut 6 off the end ---- */
const bar15=()=>{const u=Math.min((A.W-30)/15,44),x=(A.W-15*u)/2;return{u,x,y:A.H*.42,h:Math.min(u*1.4,56)}};
function drawInv(){const g=A.ctx,B=bar15(),cut=st.cut;banner(15-cut===6?'15 − 6 = 9, so 9 + 6 = 15 is right':'Check 9 + 6 = 15: take 6 away from 15',8,15-cut===6&&st.let?GOOD:BLUE);
 for(let i=0;i<15;i++){const x=B.x+i*B.u,off=i>=cut;g.fillStyle=off?A.alpha('#94a3b8',.35):PEG[i<9?0:1];g.fillRect(x+1,B.y,B.u-2,B.h);g.strokeStyle=pen();g.lineWidth=1.5;g.strokeRect(x+1,B.y,B.u-2,B.h)}
 const dx=B.x+cut*B.u;g.fillStyle=RED;g.fillRect(dx-3,B.y-18,6,B.h+36);g.beginPath();g.arc(dx,B.y-22,12,0,7);g.fill();
 sheet({x:B.x,y:B.y+B.h+26,w:Math.max(84,cut*B.u),h:34},`left: ${cut}`,{px:15});if(cut<15)sheet({x:Math.min(dx,A.W-94),y:B.y+B.h+66,w:Math.max(84,(15-cut)*B.u),h:34},`taken: ${15-cut}`,{px:15,bg:'#fee2e2'})}
function cutAt(v,judge){st.cut=clip(Math.round(v),0,15);A.sound.tick();if(judge)return letGo();react(`${st.cut} left, ${15-st.cut} taken away.`)}
function letGo(){const t=15-st.cut;if(t===6){st.let=true;return react('15 − 6 = 9. That is the 9 we started with, so 9 + 6 = 15 is right.')}
 A.sound.miss();react(t<6?`Only ${t} taken. Take away 6, the number we added.`:`${t} taken. That is too many: take away just 6.`)}
/* ---- 4: a near double: 7 + 8 ---- */
const rowsD=()=>{const u=Math.min(A.W/11,46),x=A.W*.12;return{u,x,y1:A.H*.2,y2:A.H*.2+u*1.3,spare:{x:A.W-u*2.4,y:A.H*.2+u*3,w:u*1.8,h:u*1.4}}};
const ANS=[14,15,16],ansR=()=>{const w=A.narrow?A.W*.26:A.W*.2,h=Math.max(50,A.H*.12);return ANS.map((v,i)=>({x:(A.W-3*w)/4*(i+1)+w*i,y:A.H*.8,w,h}))};
function drawDbl(){const g=A.ctx,D=rowsD();banner(st.moved8?(st.dbl?'7 + 8 = 15':'7 + 7 = 14. Now add the 1 back.'):'7 + 8: make a double',8,st.dbl?GOOD:BLUE);
 const cube=(x,y,col)=>{g.fillStyle=col;g.fillRect(x+1,y,D.u-2,D.u);g.strokeStyle=DARK;g.lineWidth=1.2;g.strokeRect(x+1,y,D.u-2,D.u)};
 for(let i=0;i<7;i++)cube(D.x+i*D.u,D.y1,PEG[0]);for(let i=0;i<7;i++)cube(D.x+i*D.u,D.y2,PEG[1]);
 const p=st.grab||(st.moved8?{x:D.spare.x+D.u*.4,y:D.spare.y+D.u*.2}:{x:D.x+7*D.u,y:D.y2});g.strokeStyle=pen();g.setLineDash([5,4]);g.strokeRect(D.spare.x,D.spare.y,D.spare.w,D.spare.h);g.setLineDash([]);cube(p.x,p.y,PEG[1]);
 if(st.moved8){sheet({x:12,y:D.y2+D.u*1.9,w:A.narrow?A.W*.55:A.W*.4,h:34},'7 + 7 = 14',{bg:'#dcfce7',px:16});ansR().forEach((r,i)=>sheet(r,String(ANS[i]),{bg:st.oops===i?'#fee2e2':SHEET,edge:st.oops===i?RED:'#475569',px:22}))}}
function setAside(){if(st.moved8)return;st.moved8=true;st.grab=null;A.sound.pop();react('7 orange and 7 blue: a double. 7 + 7 = 14. One blue cube is set aside.')}
function pickSum(i){if(!st.moved8||st.dbl)return;const v=ANS[i];if(v!==15){st.oops=i;A.sound.miss();return react(v===14?'14 is 7 + 7. There is still 1 cube set aside: add it back.':'16 would be 2 more than 14. Only 1 cube was set aside.')}
 st.oops=null;st.dbl=true;A.sound.pop();react('7 + 7 = 14, and 1 more is 15. Making ten gives 15 too: 8 + 2 = 10, 10 + 5 = 15. Same answer.')}
/* ---- 5: spot the slip ---- */
const lines=()=>{const S=SLIPS[Math.min(st.round,2)],n=A.narrow,h=n?A.H*.13:A.H*.15;return S.l.map((t,i)=>({t,x:n?12:A.W*.12,y:A.H*.22+i*(h+10),w:n?A.W-24:A.W*.76,h}))};
function drawSlip(){if(st.round>2)return banner('All three slips found!',A.H*.4,GOOD);const S=SLIPS[st.round];banner(`${st.round+1} of 3. ${S.t}. Tap the wrong step.`,8,RED);
 lines().forEach((r,i)=>sheet(r,r.t,{bg:st.oops===i?'#fef3c7':SHEET,edge:st.oops===i?'#b45309':null,px:A.narrow?16:18}))}
function tapLine(i){if(st.round>2)return;const S=SLIPS[st.round];if(i!==S.bad){st.oops=i;A.sound.miss();return react(`"${S.l[i]}" is right. Check the next step.`)}
 st.oops=null;st.round++;A.sound.pop();react('Found it. '+S.fix+(st.round>2?' Checking each step finds the slip.':''))}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H);const t=tab();
 if(t==='chal'){banner('Challenge',A.H*.1);const Q=QS[ask%QS.length];if(Q)sheet({x:A.W*.12,y:A.H*.4,w:A.W*.76,h:A.H*.2},Q.pic,{px:A.narrow?17:22});return}
 ({ten:drawTen,gap:drawGap,inv:drawInv,dbl:drawDbl,slip:drawSlip})[t]()}
function wipe(){epoch++;Object.keys(st).forEach(k=>delete st[k]);Object.assign(st,{moved:0,fill:0,cut:15,round:0,oops:null,hold:null,grab:null,after:()=>{}})}
function react(s){narrate(s);A.redraw();buildBar();st.after()}
const finishWhen=(i,cond,line)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(line+A.reveal(i))};
function enter(i,say,cond,line){wipe();narrate(say);buildBar();st.after=finishWhen(i,cond,line)}
function replay(i,list,ms){steps[i].go();const e=epoch;list.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},A.reduced()?20*(j+1):(ms||400)*(j+1)))}
function buildBar(){if(!bar)return;bar.innerHTML='';const t=tab(),mk=(txt,fn,lab)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':lab||txt},bar,txt);b.onclick=fn};
 if(t==='ten'&&st.moved<5)mk('Move one counter',moveOne,'Move one counter into the ten frame');
 if(t==='gap'&&st.fill<4)TILES.forEach((v,i)=>mk(String(v),()=>fillGap(i),`Put ${v} in gap ${st.fill+1}`));
 if(t==='inv'&&!st.let){mk('◀ one more',()=>cutAt(st.cut-1),'Take one more cube away');mk('▶ one less',()=>cutAt(st.cut+1),'Take one fewer cube away');mk('Check',letGo,'Check the take-away')}
 if(t==='dbl'){if(!st.moved8)mk('Set the extra cube aside',setAside);else if(!st.dbl)ANS.forEach((v,i)=>mk(String(v),()=>pickSum(i),`7 + 8 is ${v}`))}
 if(t==='slip'&&st.round<3)SLIPS[st.round].l.forEach((l,i)=>mk(`Step ${i+1}`,()=>tapLine(i),`Step ${i+1} is wrong: ${l}`))}
/* canvas: drag counters, the cut line and the spare cube; tap tiles, steps and answers */
function down(p){const t=tab(),hit=L=>L.findIndex(r=>hitR(p,r));
 if(t==='ten'&&st.moved<5){const q=pileSpot(st.moved);if(Math.hypot(p.x-q.x,p.y-q.y)<frames().s){st.hold={x:p.x,y:p.y};return true}}
 if(t==='gap'){const i=hit(tileR());if(i>=0)fillGap(i)}
 if(t==='inv'&&!st.let){const B=bar15();if(p.y>B.y-50&&p.y<B.y+B.h+20){st.drag=true;cutAt((p.x-B.x)/B.u);return true}}
 if(t==='dbl'){const D=rowsD();if(!st.moved8&&Math.hypot(p.x-(D.x+7.5*D.u),p.y-(D.y2+D.u/2))<D.u*1.2){st.grab={x:p.x-D.u/2,y:p.y-D.u/2};return true}if(st.moved8){const i=hit(ansR());if(i>=0)pickSum(i)}}
 if(t==='slip'){const i=hit(lines());if(i>=0)tapLine(i)}return false}
function drag(p){if(st.hold){st.hold={x:p.x,y:p.y};A.redraw()}if(st.drag)cutAt((p.x-bar15().x)/bar15().u);if(st.grab){st.grab={x:p.x-rowsD().u/2,y:p.y-rowsD().u/2};A.redraw()}}
function drop(p){if(st.drag){st.drag=false;return letGo()}
 if(st.grab){const D=rowsD(),moved=Math.hypot(p.x-(D.x+7.5*D.u),p.y-(D.y2+D.u/2))>D.u*1.5;st.grab=null;if(moved)setAside();else react('Drag the extra blue cube away, so both rows have 7.');return}
 if(!st.hold)return;const F=frames(),r=st.moved<2?F.cell(0,8+st.moved):F.cell(1,st.moved-2);st.hold=null;
 if(Math.hypot(p.x-(r.x+r.w/2),p.y-(r.y+r.h/2))<F.s*1.6)moveOne();else react(st.moved<2?'Fill the first frame to make ten.':'Put it in the next frame.')}
const steps=[
{h:'Make ten first',p:'8 + 5. Drag the blue counters into the frame, or press the button. Fill the ten first, then put the rest in the next frame.',
 predict:{q:'How many of the 5 fill the ten frame?',opts:['2','3','5'],ans:0},task:'Move all 5 counters',
 show:()=>replay(0,[moveOne,moveOne,moveOne,moveOne,moveOne],350),
 go:()=>enter(0,'A ten frame with 8 orange counters, an empty frame, and 5 blue counters waiting.',()=>st.moved>=5,'8 + 2 = 10, then 10 + 3 = 13.')},
{h:'Say how you did it',p:'Explain 8 + 5 in words. Fill each gap in the sentence. Tap a number.',
 predict:{q:'A good explanation is…',opts:['just the answer, 13','each step, in order','"I just knew it"'],ans:1},task:'Fill all 4 gaps',
 show:()=>replay(1,[()=>fillGap(2),()=>fillGap(0),()=>fillGap(0),()=>fillGap(1)],450),
 go:()=>enter(1,'A sentence about 8 + 5 with 4 gaps, and number tiles 3, 13, 2, 5 and 12.',()=>st.fill>3,'Each step is said, so anyone can follow it.')},
{h:'Check it: take away',p:'Is 9 + 6 = 15 right? Check it the other way round. Drag the red line to take 6 cubes away from 15.',
 predict:{q:'To check 9 + 6 = 15, work out…',opts:['15 − 6','15 + 6','9 − 6'],ans:0},task:'Take 6 away from 15',
 show:()=>replay(2,[()=>cutAt(13),()=>cutAt(11),()=>cutAt(9,true)],400),
 go:()=>enter(2,'A bar of 15 cubes: 9 orange and 6 blue. A red cut line is at the end.',()=>st.let,'Take-away undoes adding: 15 − 6 = 9.')},
{h:'Another way: a double',p:'7 + 8. Drag the extra blue cube away so both rows match. Use the double, then add it back.',
 predict:{q:'7 + 7 = 14. So 7 + 8 is…',opts:['14','15','16'],ans:1},task:'Find 7 + 8 with a double',
 show:()=>replay(3,[setAside,()=>pickSum(1)],600),
 go:()=>enter(3,'A row of 7 orange cubes and a row of 8 blue cubes.',()=>st.dbl,'A near double and making ten both give 15.')},
{h:'Spot the slip',p:'Each child got the wrong answer. Check each step. Tap the step that is wrong.',
 predict:{q:'To find a mistake, you should…',opts:['check each step','guess a new answer','start again without looking'],ans:0},task:'Find all 3 slips',
 show:()=>replay(4,[()=>tapLine(1),()=>tapLine(0),()=>tapLine(2)],600),
 go:()=>enter(4,'A worked example: 7 + 6 = 12 in three steps.',()=>st.round>2,'Check each step, then fix it.')},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.after()});
const QS=[
 {pic:'9 + 4 = 13',q:'Mia says 9 + 4 = 13. How can she show she is right?',ans:'9 + 1 = 10, then 10 + 3 = 13',bad:[['say it louder','loud'],['write 13 again','again']]},
 {pic:'12 + 5 = 17',q:'Which take-away checks 12 + 5 = 17?',ans:'17 − 5 = 12',bad:[['17 + 5 = 22','plus'],['12 − 5 = 7','whole']]},
 {pic:'6 + 7',q:'Double 6 is 12. So what is 6 + 7?',ans:'13',bad:[['12','dbl'],['14','dbl7']]},
 {pic:'15 or 14?',q:'You work it out two ways and get 15 and 14. What should you do?',ans:'check both ways again',bad:[['pick the bigger one','big'],['pick the first one','first']]},
 {pic:'6 + 7',q:'Ava says: "Double 6 is 12, and 1 more is 13." Is that a good explanation?',ans:'yes, it shows each step',bad:[['no, only the answer counts','ans'],['no, she must use fingers','fing']]},
 {pic:'14 − 6',q:'Sam says: "14 − 4 = 10, then 10 − 2 = 8." Is he right?',ans:'yes, 14 − 6 = 8',bad:[['no, it is 10','stop'],['no, it is 20','add']]}];
function why(tag){let m='Check each step, then say what you did.';
 if(tag==='loud')m='Saying it louder does not show it. Show the steps: make ten, then add the rest.';
 if(tag==='again')m='Writing it again is not a reason. Show how you got it, like 9 + 1 = 10, then 10 + 3.';
 if(tag==='plus')m='Adding again makes it bigger. To undo + 5, take 5 away: 17 − 5 = 12.';
 if(tag==='whole')m='Start from the whole, 17, not from 12. 17 − 5 = 12 matches.';
 if(tag==='dbl')m='12 is 6 + 6. 7 is one more than 6, so 6 + 7 is one more: 13.';
 if(tag==='dbl7')m='14 is 7 + 7. Here only one number is 7, so it is 12 + 1 = 13.';
 if(tag==='big')m='Bigger is not more right. Two different answers mean one has a slip: check them.';
 if(tag==='first')m='The first try can have a slip too. Check both until they agree.';
 if(tag==='ans')m='An explanation shows how you know. Her steps show why it is 13.';
 if(tag==='fing')m='Any clear way is fine. Doubles and one more is a good, quick way.';
 if(tag==='stop')m='10 is only half way. He still takes away 2 more: 10 − 2 = 8.';
 if(tag==='add')m='This is take away, so the answer is less than 14. 14 − 6 = 8.';
 return m}
function pose(){ask++;const Q=QS[ask%QS.length],all=[[Q.ans,'ok'],...Q.bad],r=ask%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>grade(tag,Q.ans)});narrate('Challenge: '+Q.q);A.redraw()}
function grade(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';if(ok)A.win();else A.sound.miss();narrate(ok?'Yes: '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;bar.hidden=Q.step===5;buildBar()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Reasoning controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);wipe();A.gest({down,move:drag,up:drop});buildBar()}});
A.start()})})();
